/* Teacher edition for ISC2 Certified Cloud Security Professional (2026 outline (effective Aug 1, 2026)): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("ccsp", [
 {
  "t": "Cloud computing concepts: NIST definitions, essential characteristics and roles (customer, provider, partner, broker, regulator)",
  "objectives": [
   "Students will be able to name and define the five essential characteristics of cloud computing from NIST SP 800-145 and the multitenancy characteristic added by ISO/IEC 17788.",
   "Students will be able to judge whether a described service meets the definition of cloud computing by identifying which characteristics are present or missing.",
   "Students will be able to distinguish the roles of cloud service customer, provider, partner (auditor and broker) and regulator.",
   "Students will be able to explain why accountability for data remains with the customer and connect each characteristic to a security consequence."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Ask three students to share answers and write the features they mention on the board without judging them yet."
   ],
   [
    10,
    "Teach",
    "Walk through the five NIST characteristics and multitenancy, mapping the students' warm-up words onto the formal terms. Then draw the role diagram: customer, provider, partner (auditor, broker) and regulator, with arrows showing who answers to whom. Stress that accountability for data stays with the customer."
   ],
   [
    20,
    "Activity",
    "Run the 'Is it cloud?' card sort described below. Circulate and ask groups to justify each verdict using the characteristic names."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions to the whole class. Draw out the security consequence of each characteristic, such as the cost spike as an abuse signal."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note or in a shared form and hand them in."
   ]
  ],
  "warmup": "Your manager says, 'We moved to the cloud last year.' What would you expect to be different about how the team gets a new server or pays for it?",
  "activity": {
   "title": "Is it cloud? Card sort and role match",
   "materials": "Printed scenario cards (one set per group of three or four), sticky notes, whiteboard and markers.",
   "steps": [
    "Prepare eight scenario cards in advance, for example: a vendor racks dedicated servers and adds capacity by ticket in ten days; a team creates databases from a web console in minutes and is billed per hour; a firm aggregates three providers into one contract; an independent firm issues a report on a provider's controls; a banking regulator requests evidence of controls.",
    "Groups sort the service cards into 'meets the cloud definition' and 'does not', writing on a sticky note which characteristics are present and which are missing.",
    "Groups then label each remaining card with the role it describes: customer, provider, broker, auditor or regulator.",
    "Each group presents one card it found hard, and the class agrees or challenges the verdict using the exact characteristic or role names.",
    "Close by asking each group to name one security risk created by a characteristic on its cards."
   ]
  },
  "discussion": [
   "If a provider operates all the controls, why does a regulator still hold the customer accountable?",
   "How could measured service help a security team detect a compromised account?",
   "Which characteristic do you think creates the biggest security risk for customers, and why?"
  ],
  "exit": [
   [
    "Name the five NIST essential characteristics.",
    "On-demand self-service, broad network access, resource pooling, rapid elasticity and measured service."
   ],
   [
    "A service requires a ticket and two weeks to add a server. Which characteristics does it fail?",
    "On-demand self-service and rapid elasticity."
   ],
   [
    "Which partner negotiates and integrates services from several providers for a customer?",
    "A cloud service broker."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference card with each characteristic, a one-line definition and an everyday example, and let them sort only four scenario cards first.",
   "Extend: Ask fast finishers to compare NIST SP 800-145 with ISO/IEC 17788 and write a short paragraph explaining how multitenancy relates to resource pooling and what new risk it highlights."
  ]
 },
 {
  "t": "Cloud reference architecture: IaaS, PaaS, SaaS service models and cloud service capabilities",
  "objectives": [
   "Students will be able to describe IaaS, PaaS and SaaS and identify which layers of the technology stack the customer controls in each.",
   "Students will be able to map the ISO/IEC 17788 infrastructure, platform and application capability types to the matching service models.",
   "Students will be able to determine who is responsible for a given security task, such as patching or access control, in a named service model.",
   "Students will be able to explain why reduced control increases reliance on contracts, SLAs and assurance reports."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the pizza or dinner options and let pairs talk for two minutes before sharing."
   ],
   [
    10,
    "Teach",
    "Draw the stack on the board from data center up to data and users. Draw three vertical columns for IaaS, PaaS and SaaS and shade the provider part of each. Introduce the ISO/IEC 17788 capability type names beside each column."
   ],
   [
    20,
    "Activity",
    "Run the responsibility line activity described below, then review answers as a class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect less control with more reliance on contracts and evidence."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you could cook dinner yourself, buy a meal kit, or order delivery, which would give you the most control and which the most convenience? What would you still be responsible for in each case?",
  "activity": {
   "title": "Draw the line: responsibility stack",
   "materials": "Whiteboard, printed task cards (for example 'patch guest OS', 'replace failed disk', 'set MFA for users', 'configure database firewall', 'patch runtime', 'classify data'), sticky notes in two colors.",
   "steps": [
    "Draw three stacks on the board labeled IaaS, PaaS and SaaS, each with the layers data center, hardware, hypervisor, operating system, runtime, application, data and users.",
    "Give each group a set of task cards. Groups place each task on every stack where it applies, using one sticky color for provider and one for customer.",
    "Ask groups to circle any task they think is shared, such as identity and logging, and write why.",
    "Reveal the expected answers layer by layer, letting groups explain any disagreements.",
    "Finish by having each group write one sentence completing: 'As we move from IaaS to SaaS, the customer gives up ... and gains ...'."
   ]
  },
  "discussion": [
   "If you cannot inspect a PaaS provider's servers, how do you gain confidence that they are patched?",
   "Why might an organization choose IaaS even though it creates more security work?",
   "What kinds of SaaS incidents are still the customer's fault?"
  ],
  "exit": [
   [
    "Who patches the guest operating system in IaaS?",
    "The customer."
   ],
   [
    "Which ISO/IEC 17788 capability type corresponds to PaaS?",
    "The platform capability type."
   ],
   [
    "Give one responsibility the customer keeps in SaaS.",
    "Managing users and permissions, configuration settings such as sharing, or its data."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed stack diagram with the provider layers already shaded for IaaS so students only need to extend the pattern to PaaS and SaaS.",
   "Extend: Ask students to place a function-as-a-service offering and a managed AI model API on the stack and justify where the responsibility line falls."
  ]
 },
 {
  "t": "Cloud deployment models: public, private, community, hybrid and multi-cloud",
  "objectives": [
   "Students will be able to define public, private, community, hybrid and multi-cloud deployment models.",
   "Students will be able to distinguish hybrid cloud from multi-cloud and explain why a third-party-hosted cloud can still be private.",
   "Students will be able to recommend a deployment model for a business scenario and justify it using cost, control, compliance and isolation.",
   "Students will be able to explain portability, interoperability and vendor lock-in as factors in deployment decisions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the housing warm-up question and collect quick answers on the board."
   ],
   [
    10,
    "Teach",
    "Present each deployment model with a one-line definition, a typical user and its main risk. Draw a simple diagram for hybrid (two clouds joined) next to multi-cloud (two providers, both public) to make the contrast visible."
   ],
   [
    20,
    "Activity",
    "Run the consultant role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on lock-in and exit planning."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you needed somewhere to stay for a year, when would you choose a hotel, your own house, or a cabin shared with friends? What do you give up with each?",
  "activity": {
   "title": "Cloud consultants: pick the deployment model",
   "materials": "Printed client brief cards (one per group), whiteboard, markers, sticky notes.",
   "steps": [
    "Prepare four client brief cards, for example: a startup with no compliance rules and little cash; four hospitals under the same health regulations; a retailer that keeps payment systems in-house but needs extra capacity at holidays; a media company that wants to avoid depending on one provider.",
    "Each group reads its brief and chooses a deployment model, writing on sticky notes two benefits and two risks.",
    "Groups also write one question they would ask about data location, key ownership or exit terms before signing.",
    "Each group presents its recommendation in two minutes while another group plays a skeptical board member who asks one challenging question.",
    "The teacher confirms the expected model for each brief and highlights where hybrid and multi-cloud were confused."
   ]
  },
  "discussion": [
   "Why can a cloud hosted in a contractor's building still be private?",
   "How would you plan for leaving a provider before you ever sign the contract?",
   "When might the complexity of multi-cloud outweigh the benefit of avoiding lock-in?"
  ],
  "exit": [
   [
    "Several agencies with the same regulations want to share a cloud and its costs. Which model fits?",
    "A community cloud."
   ],
   [
    "A company uses two different public providers and nothing on premises. Is that hybrid or multi-cloud?",
    "Multi-cloud, because both are public clouds from different providers."
   ],
   [
    "What is vendor lock-in?",
    "Dependence on one provider's proprietary services or formats that makes leaving costly or difficult."
   ]
  ],
  "differentiation": [
   "Support: Give students a comparison table template with rows for each model and columns for who uses it, cost, control and main risk, and let them fill it in during the teach segment.",
   "Extend: Ask students to design an exit plan for a multi-cloud organization leaving one provider, listing the contract terms, data formats and steps that would make the move portable."
  ]
 },
 {
  "t": "Shared responsibility model across service models",
  "objectives": [
   "Students will be able to explain the difference between security of the cloud and security in the cloud.",
   "Students will be able to assign common security tasks to provider, customer or shared for IaaS, PaaS and SaaS.",
   "Students will be able to analyze an incident scenario and determine which side of the model failed.",
   "Students will be able to explain why accountability for data never transfers and how customers verify provider controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the storage unit warm-up and ask who is at fault in each case."
   ],
   [
    10,
    "Teach",
    "Present the of/in distinction, then a three-column chart showing how the line moves across IaaS, PaaS and SaaS. Highlight the three shared areas (identity, encryption, logging) and the two things that never transfer."
   ],
   [
    20,
    "Activity",
    "Run the incident courtroom activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce verification through audit reports."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You rent a storage unit. In one case thieves cut through the facility's fence; in another you left your unit unlocked. Who is responsible in each case, and why?",
  "activity": {
   "title": "Incident courtroom: whose side of the line?",
   "materials": "Printed incident cards (one per group), a projector or whiteboard showing the responsibility chart, sticky notes.",
   "steps": [
    "Prepare six short incident cards, such as a public storage bucket, an unpatched IaaS server, a hypervisor escape affecting several tenants, a SaaS folder shared with anyone with the link, a leaked access key in a code repository, and a data center power failure.",
    "Each group receives two cards and acts as a review panel, deciding whether the failure is provider, customer or shared, and naming the service model involved.",
    "Groups write a one-sentence verdict and one control that would have prevented the incident.",
    "Groups present verdicts; another group may object once per case with a reason based on the model.",
    "The teacher confirms each verdict and tallies how many incidents were customer-side to reinforce the lesson."
   ]
  },
  "discussion": [
   "Why do most cloud breaches occur on the customer side of the line?",
   "If a task appears nowhere in the contract or provider documentation, who should assume it is theirs?",
   "How can a customer trust controls it is never allowed to inspect?"
  ],
  "exit": [
   [
    "Who is responsible for the physical security of a public cloud data center?",
    "The provider."
   ],
   [
    "In PaaS, who is responsible for application code and data?",
    "The customer."
   ],
   [
    "Name one way a customer verifies the provider's controls.",
    "Reviewing a SOC 2 Type II report or ISO/IEC 27001 certification, backed by contract terms."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-filled chart with the provider rows completed so they focus only on customer and shared tasks.",
   "Extend: Ask students to build a RACI chart for a SaaS customer relationship management tool, including who is responsible, accountable, consulted and informed for access reviews, logging and data export."
  ]
 },
 {
  "t": "Related technologies: containers, serverless, edge computing, confidential computing, DevSecOps and quantum",
  "objectives": [
   "Students will be able to describe containers, serverless, edge computing, confidential computing, DevSecOps and quantum computing and why organizations adopt each.",
   "Students will be able to explain why container isolation is weaker than virtual machine isolation and list practices that reduce the risk.",
   "Students will be able to select confidential computing as the control for protecting data in use.",
   "Students will be able to explain the harvest-now-decrypt-later threat and why post-quantum planning starts today."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers on the board under the headings 'separate' and 'shared'."
   ],
   [
    10,
    "Teach",
    "Draw a virtual machine stack next to a container stack to show the shared kernel. Then give one minute each to serverless, edge, confidential computing, DevSecOps and quantum, naming the main risk and main control of each."
   ],
   [
    20,
    "Activity",
    "Run the technology risk stations activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, steering toward who patches what in each technology."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Would you rather live in a detached house or an apartment building? What do you share with neighbors in each, and what could a neighbor's problem do to you?",
  "activity": {
   "title": "Technology risk stations",
   "materials": "Six sheets of chart paper or whiteboard sections labeled containers, serverless, edge, confidential computing, DevSecOps and quantum; sticky notes; markers.",
   "steps": [
    "Set up six stations around the room, one per technology, each with a one-paragraph description the teacher prints in advance.",
    "Groups rotate every three minutes and add one sticky note per station: one risk or one control not already posted.",
    "After the rotation, each group returns to its starting station and sorts the notes into 'risk' and 'control', removing duplicates.",
    "Each group reports the single most important control for its station and explains which risk it addresses.",
    "The teacher corrects any misplaced notes, especially claims that serverless or confidential computing remove all customer duties."
   ]
  },
  "discussion": [
   "If serverless removes server patching, where does the customer's security work move?",
   "Why might a company accept weaker container isolation in exchange for speed, and what would it need to do to compensate?",
   "Which data in your organization would still need to be secret in fifteen years, and what does that mean for quantum planning?"
  ],
  "exit": [
   [
    "What single design fact explains why container isolation is weaker than virtual machine isolation?",
    "Containers share the host operating system kernel."
   ],
   [
    "Which technology protects data in use from the host operating system and hypervisor?",
    "Confidential computing with a hardware trusted execution environment."
   ],
   [
    "What is harvest now, decrypt later?",
    "Attackers store encrypted data today and decrypt it once quantum computers can break current public-key algorithms."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching card set pairing each technology with a one-line description and one risk, and let them complete the matching before the stations.",
   "Extend: Ask students to draft a short DevSecOps pipeline for a containerized app, listing which automated check runs at each stage and what failure would stop the build."
  ]
 },
 {
  "t": "AI and machine learning in the cloud: service types, use cases and security considerations",
  "objectives": [
   "Students will be able to map AI service offerings to the infrastructure, platform and application levels and the matching shared responsibilities.",
   "Students will be able to identify data poisoning, prompt injection, model inversion, membership inference and model extraction from a description.",
   "Students will be able to list the contract and data-use questions to ask before sending confidential data to a hosted model.",
   "Students will be able to recommend governance controls such as an AI inventory, least privilege for agents and logging."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers. Note on the board every place students say data might go."
   ],
   [
    10,
    "Teach",
    "Draw the three AI service levels beside IaaS, PaaS and SaaS. Then define the five AI attack types with a one-sentence everyday example each. Close with the governance controls and the two named frameworks."
   ],
   [
    20,
    "Activity",
    "Run the AI approval board role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect shadow AI with familiar shadow IT problems."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you paste a paragraph from a work document into a public AI chatbot, where might that text end up, and who could see it?",
  "activity": {
   "title": "AI approval board",
   "materials": "Printed request cards and attack cards made by the teacher, whiteboard, sticky notes.",
   "steps": [
    "Prepare four request cards, for example: marketing wants a public chatbot to draft posts; finance wants to train a fraud model on rented GPU instances; HR wants an AI feature in its SaaS tool to screen resumes; support wants an agent that can issue refunds.",
    "Groups act as an approval board for one card. They identify the service level, list three questions for the provider's terms and name two controls they would require.",
    "The teacher then hands each group an attack card describing a scenario, such as hidden text in an email or corrupted training records, and the group names the attack and the control that would have limited it.",
    "Groups present their decision as approve, approve with conditions or reject, with reasons.",
    "The class compares which conditions appeared most often and the teacher links them to data use terms, least privilege and logging."
   ]
  },
  "discussion": [
   "Why might staff turn to shadow AI, and how can a security team reduce it without simply banning everything?",
   "How does giving an AI agent access to tools change the impact of prompt injection?",
   "Who should be accountable when an AI system's output leads to a bad business decision?"
  ],
  "exit": [
   [
    "An attacker corrupts the records a model is trained on so it misclassifies fraud. What is the attack called?",
    "Data poisoning."
   ],
   [
    "Name two things to confirm in a provider's terms before sending confidential prompts.",
    "Whether prompts are stored or used for training, how long they are retained and in which region they are processed (any two)."
   ],
   [
    "Under shared responsibility, what does the customer still own when using a hosted LLM API?",
    "Its data, access decisions about who can call the model, and the business use of the output."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page table of the five AI attacks with a plain-language description and an example, and let students use it during the activity.",
   "Extend: Ask students to write a one-page acceptable-use policy for generative AI at a fictional company, covering approved tools, prohibited data and logging."
  ]
 },
 {
  "t": "Security concepts for cloud computing: cryptography and key management, identity, data and media sanitization, network security, virtualization security",
  "objectives": [
   "Students will be able to explain why key management, not encryption itself, is the hard part of cloud cryptography and compare provider-managed keys, customer-managed keys and HSMs.",
   "Students will be able to describe why IAM is called the new perimeter and list core identity controls.",
   "Students will be able to select crypto-shredding as the sanitization method for shared cloud storage and state its requirements.",
   "Students will be able to identify software-defined network controls and explain why the management plane needs the strongest protection."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt and let pairs discuss for two minutes before taking answers."
   ],
   [
    10,
    "Teach",
    "Cover the five building blocks in order: cryptography and keys, IAM, sanitization, network security and virtualization. For each, write on the board what the provider controls and what the customer chooses."
   ],
   [
    20,
    "Activity",
    "Run the building blocks case clinic described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare on-premises and cloud versions of each control."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your company must destroy old customer records, but they are stored on a computer you are not allowed to touch. What could you do so that nobody can ever read them again?",
  "activity": {
   "title": "Building blocks case clinic",
   "materials": "Printed case cards made by the teacher, whiteboard, markers, sticky notes.",
   "steps": [
    "Prepare five short case cards, for example: a company leaving a provider must sanitize its data; an auditor finds the encryption key stored in the same bucket as the data; a phished admin account has no MFA; a security group allows remote administration from any address; a regulator requires keys the provider cannot access.",
    "Pairs take two cards each and write the building block involved, the risk and the best control.",
    "Pairs swap cards with another pair and check each other's answers, writing one agreement or challenge on a sticky note.",
    "The teacher reviews each case with the class, emphasizing crypto-shredding requirements and key separation.",
    "Close by asking each pair which case they would fix first and why."
   ]
  },
  "discussion": [
   "What do you give up in convenience when you move from provider-managed keys to your own HSM?",
   "Why is a stolen access key often more dangerous in the cloud than a stolen office badge?",
   "How can a customer gain confidence that a provider destroys failed drives properly?"
  ],
  "exit": [
   [
    "What is crypto-shredding and what does it require?",
    "Destroying all copies of the key that encrypted data so the data is unrecoverable; the data must have been encrypted and every key copy, including backups, destroyed."
   ],
   [
    "Why is IAM called the new perimeter?",
    "Cloud resources are reachable from anywhere, so identity and permissions decide access rather than network location."
   ],
   [
    "What is the management plane and why protect it most?",
    "The console, APIs and tools that control cloud resources; compromise lets an attacker copy or delete whole environments."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column sheet with on-premises controls on the left (shredder, firewall, badge, server room key) to match with cloud equivalents on the right.",
   "Extend: Ask students to design a key management approach for a bank that must keep keys out of the provider's reach, explaining trade-offs in cost, availability and operations."
  ]
 },
 {
  "t": "Design principles of secure cloud computing: secure data lifecycle, cloud-based BC/DR, BIA, cost-benefit and security patterns",
  "objectives": [
   "Students will be able to list the six phases of the cloud secure data lifecycle in order and name a control for each.",
   "Students will be able to define BC, DR, BIA, RTO and RPO and distinguish RTO from RPO.",
   "Students will be able to evaluate whether a recovery design meets given RTO and RPO targets.",
   "Students will be able to identify hidden costs in a cloud cost-benefit analysis and explain the value of security patterns."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers about lost work and waiting time in two columns, later labeled RPO and RTO."
   ],
   [
    10,
    "Teach",
    "Draw the six-phase lifecycle as a loop and add one control per phase. Then define BC, DR and BIA, and use a timeline on the board with the disruption in the middle to show RPO to the left and RTO to the right. Finish with hidden cloud costs and two pattern examples."
   ],
   [
    20,
    "Activity",
    "Run the design review challenge described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on the provider as a disruption."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your laptop dies while you are writing an important report. What decides how much work you lose, and what decides how long until you can continue?",
  "activity": {
   "title": "Design review challenge",
   "materials": "Printed design scenario cards with stated RTO and RPO targets, whiteboard with a timeline template, markers.",
   "steps": [
    "Prepare four scenario cards, each stating a business process, its RTO and RPO from a BIA, and a proposed recovery design, for example nightly backups for a payments system with a ten-minute RPO.",
    "Groups decide whether each design meets, misses or greatly exceeds the targets and draw the RPO and RTO on the timeline template.",
    "Groups propose one change that fixes any miss or reduces cost where the design exceeds the need.",
    "Each group adds one data lifecycle control the scenario is missing, naming the phase.",
    "Groups present one scenario each while the class checks the reasoning against the RTO and RPO definitions."
   ]
  },
  "discussion": [
   "How would you plan recovery if the provider's whole region, or your account, became unavailable?",
   "Which hidden cloud costs are most often forgotten, and who in an organization should catch them?",
   "Why might an auditor prefer a design built from known security patterns?"
  ],
  "exit": [
   [
    "A process can lose at most ten minutes of data. Which objective is that?",
    "The recovery point objective (RPO)."
   ],
   [
    "In which lifecycle phase should data first be classified?",
    "Create."
   ],
   [
    "What is the difference between BC and DR?",
    "BC keeps critical business functions running during a disruption; DR restores IT systems and data afterwards."
   ]
  ],
  "differentiation": [
   "Support: Give students a timeline diagram with the disruption marked and blank RPO and RTO arrows to label, plus a lifecycle loop with phases filled in.",
   "Extend: Ask students to write a short cost-benefit comparison of warm standby in a second region versus restore-from-backup for a given RTO, listing the costs and risks of each."
  ]
 },
 {
  "t": "Evaluating cloud service providers: ISO/IEC 27017, CSA STAR, SOC 2, Common Criteria and FIPS 140-3",
  "objectives": [
   "Students will be able to describe what ISO/IEC 27001, 27017 and 27018, CSA STAR, SOC 2, Common Criteria and FIPS 140-3 each assess.",
   "Students will be able to distinguish SOC 2 Type I from Type II and STAR Level 1 from Level 2.",
   "Students will be able to select the appropriate assurance evidence for a stated customer concern.",
   "Students will be able to explain why the scope and date of a certificate or report must be checked."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about what makes evidence trustworthy."
   ],
   [
    10,
    "Teach",
    "Build a table on the board with columns for scheme, what it assesses, who assesses it and organization or product. Fill in each scheme, highlighting Type I versus Type II and Level 1 versus Level 2."
   ],
   [
    20,
    "Activity",
    "Run the evidence matching activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on scope and complementary user entity controls."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you were buying a used car and could not take it to your own mechanic, what documents would convince you it was safe? Which would you trust most, and why?",
  "activity": {
   "title": "Evidence matching: which document answers the question?",
   "materials": "Printed concern cards and evidence cards made by the teacher, a projector or whiteboard with the scheme table, sticky notes.",
   "steps": [
    "Prepare eight concern cards, for example 'we need proof controls worked over the past year', 'we process PII in a public cloud', 'the regulator requires validated cryptographic modules', 'we want a quick comparison of ten providers', and 'we need to know a firewall product was evaluated'.",
    "Prepare evidence cards for each scheme, including SOC 2 Type I, SOC 2 Type II, STAR Level 1 and Level 2, ISO/IEC 27001, 27017, 27018, Common Criteria and FIPS 140-3.",
    "Groups match each concern to the best evidence card and write a one-line reason on a sticky note.",
    "The teacher then reveals a twist card for each group, such as 'the certificate covers only one region', and groups decide what they would ask the provider next.",
    "Groups share their matches, and the class discusses any concern where two answers seemed possible."
   ]
  },
  "discussion": [
   "Why might a provider prefer to share a STAR Level 1 entry rather than a third-party report?",
   "What risks remain even when a provider has every certificate on this list?",
   "How do complementary user entity controls in a SOC 2 report connect to the shared responsibility model?"
  ],
  "exit": [
   [
    "Which SOC 2 report type tests operating effectiveness over a period?",
    "Type II."
   ],
   [
    "A product is rated EAL4. Which scheme is that, and what does it evaluate?",
    "Common Criteria (ISO/IEC 15408); it evaluates a specific product against a protection profile."
   ],
   [
    "Why must you check the scope of an ISO/IEC 27001 certificate?",
    "It may cover only certain services or locations, so it tells you nothing about services or regions outside that scope."
   ]
  ],
  "differentiation": [
   "Support: Give students the completed scheme table as a handout and have them match only four concern cards first.",
   "Extend: Ask students to draft a vendor assurance checklist for a hospital, listing which reports and certificates to request, what to check in each and which red flags would trigger follow-up."
  ]
 },
 {
  "t": "Cloud data concepts: cloud data lifecycle phases, data dispersion and data flows",
  "objectives": [
   "Students will be able to list and describe the six phases of the CSA cloud data lifecycle and pair each with a typical control.",
   "Students will be able to explain why classification belongs in the create phase and why modified data counts as create.",
   "Students will be able to describe data dispersion, erasure coding and bit splitting and their effect on availability, sanitization and jurisdiction.",
   "Students will be able to read or draw a simple data flow diagram and identify trust boundaries and legal concerns."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write each place the photo travels on the board as a rough flow."
   ],
   [
    10,
    "Teach",
    "Draw the six lifecycle phases with a control under each, stressing classification at create and modified data as create. Explain dispersion with erasure coding, then turn the warm-up flow into a data flow diagram with a trust boundary."
   ],
   [
    20,
    "Activity",
    "Run the data flow detective activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect stale diagrams with real exposure."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You take a photo on your phone and share it with a friend. List every place that photo might travel or be stored. Which of those places could be in another country?",
  "activity": {
   "title": "Data flow detective",
   "materials": "Printed one-page data flow diagram of a fictional company (made by the teacher), printed change description, colored pens, whiteboard.",
   "steps": [
    "Hand out a simple diagram showing a web app, a database, a backup service and a payroll SaaS, with arrows labeled by data type and region.",
    "Pairs mark every trust boundary in one color and every point where data is encrypted or decrypted in another.",
    "Hand out a change description: marketing has connected an analytics tool in another country that receives nightly customer exports. Pairs add the new flow to the diagram.",
    "For the new flow, pairs name the lifecycle phase involved, one missing control and one legal question to raise.",
    "Pairs compare diagrams with a neighboring pair and the teacher reviews the boundaries and legal concerns on the whiteboard."
   ]
  },
  "discussion": [
   "Why do data flow diagrams go out of date so quickly in cloud environments, and who should own keeping them current?",
   "When might data dispersion create a legal problem rather than solve a technical one?",
   "Which lifecycle phase do you think organizations protect least well, and why?"
  ],
  "exit": [
   [
    "List the six phases of the CSA cloud data lifecycle in order.",
    "Create, store, use, share, archive and destroy."
   ],
   [
    "An employee edits an existing customer record. Which phase is that in the CSA model?",
    "Create."
   ],
   [
    "Give one drawback of data dispersion.",
    "It complicates sanitization or makes jurisdiction harder to determine because fragments sit in several locations."
   ]
  ],
  "differentiation": [
   "Support: Provide a lifecycle card set with phases and controls on separate cards for students to match before the activity, and a partially labeled diagram.",
   "Extend: Ask students to design a process that keeps data flow diagrams current, including what triggers an update, who approves new flows and which tools could discover unlisted integrations."
  ]
 },
 {
  "t": "Cloud data storage architectures: storage types (ephemeral, raw, long-term, object, volume, database) and threats to storage",
  "objectives": [
   "Students will be able to define ephemeral, raw, volume, object, database and long-term storage and identify each from a description.",
   "Students will be able to match storage types to the IaaS, PaaS and SaaS service models.",
   "Students will be able to list major threats to cloud storage and pair each with a countermeasure.",
   "Students will be able to recommend a storage type and controls for a business requirement such as retention or ransomware resilience."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers, then hint that each matches a cloud storage type."
   ],
   [
    10,
    "Teach",
    "Draw a table of storage types with columns for persistence, access method and best use. Add a second table mapping storage to IaaS, PaaS and SaaS. Finish with the threats list and matching countermeasures."
   ],
   [
    20,
    "Activity",
    "Run the storage threat matching activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect public exposure and ransomware to real controls."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Where in your home do you keep things for an hour, for a year and for ten years? How does that change how quickly you can get them and how much space costs?",
  "activity": {
   "title": "Storage threat matching",
   "materials": "Printed requirement cards, threat cards and countermeasure cards made by the teacher; whiteboard; sticky notes.",
   "steps": [
    "Prepare six requirement cards, for example scratch files for a nightly job, a virtual disk for a database server, website images served worldwide, seven-year invoice retention, a managed customer database and documents in a SaaS tool.",
    "Groups assign the best storage type to each requirement and write the reason on a sticky note.",
    "Groups then draw two threat cards, such as a public bucket, ransomware, a leaked access key or data landing in the wrong region, and attach each to the requirement it most endangers.",
    "For each threat, groups select a countermeasure card and explain how it reduces the risk.",
    "The class reviews the answers together, and the teacher highlights the clue words that identify object and ephemeral storage on the exam."
   ]
  },
  "discussion": [
   "Why is object storage the type most often involved in accidental public exposure?",
   "How does keeping immutable backups in a separate account change an attacker's options during a ransomware incident?",
   "Who is responsible for storage security in SaaS, given that the customer never sees a disk or bucket?"
  ],
  "exit": [
   [
    "Data disappears when an instance is restarted. Which storage type was it on?",
    "Ephemeral storage."
   ],
   [
    "Which storage type uses buckets, metadata and API access?",
    "Object storage."
   ],
   [
    "Name two controls that protect cloud storage from ransomware.",
    "Versioning and immutable backups, plus least privilege and replication to a separate account (any two)."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card listing each storage type with a household comparison and one clue word, and let them match only three requirement cards first.",
   "Extend: Ask students to design a storage layout for a small company's web app, choosing types for application data, logs, backups and archives, and listing the access and resilience controls for each."
  ]
 },
 {
  "t": "Data security technologies: encryption and key management, hashing, data obfuscation (masking, anonymization), tokenization",
  "objectives": [
   "Students will be able to match encryption, hashing, masking, anonymization and tokenization to the security goal each one serves.",
   "Students will be able to compare static and dynamic masking and anonymization versus pseudonymization, including their privacy-law consequences.",
   "Students will be able to explain why tokenization reduces PCI DSS scope while encryption alone may not.",
   "Students will be able to identify the threat each encryption layer (storage, database, application, client-side) does and does not address."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without judging them. Say that by the end of class each answer will have a correct home."
   ],
   [
    15,
    "Teach",
    "Draw a four-column table: goal, technology, reversible?, typical use. Fill it row by row for encryption, hashing, masking, anonymization and tokenization. Then draw a stack (client, application, database, storage) and ask which attacker each encryption layer stops. Close with the coat check analogy for tokenization."
   ],
   [
    15,
    "Activity",
    "Run the goal-to-tool card sort described below in groups of three to four. Circulate and ask each group to defend one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface disagreements, especially pseudonymization versus anonymization and hashing card numbers."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "Your company stores customer card numbers in five systems. If you could apply only one technology to make the assessor's job smaller, which would you choose and why?",
  "activity": {
   "title": "Goal-to-tool card sort",
   "materials": "Printed scenario cards (12 per group), five header cards labeled Encryption, Hashing, Static masking, Dynamic masking, Tokenization, plus one labeled Anonymization; whiteboard for the debrief.",
   "steps": [
    "Give each group the header cards and a shuffled deck of scenario cards, for example: verify a backup file was not altered; show agents only the last four digits; build a test database from production; remove the order system from PCI DSS scope; share research data outside privacy law; store passwords; protect laptops if stolen.",
    "Groups place each scenario under the best header and write one sentence on the back explaining the goal it serves.",
    "Each group picks the card they argued about most and presents it; the class votes, and the teacher confirms the answer using the goal table.",
    "Finish by asking groups to find any scenario where two tools would be layered, such as tokenizing card numbers and encrypting the vault."
   ]
  },
  "discussion": [
   "Why do organizations often think they have anonymized data when they have only pseudonymized it, and what is the consequence?",
   "If the provider encrypts all storage by default, what threats still remain for the customer to handle?",
   "When would you accept the extra complexity of client-side encryption?"
  ],
  "exit": [
   [
    "Which technology is one-way and used to check integrity?",
    "Hashing, for example SHA-256; it cannot be reversed."
   ],
   [
    "Why does tokenization reduce PCI DSS scope?",
    "Systems handle only random tokens with no mathematical link to card numbers; real values stay in a separate vault, so those systems no longer store card data."
   ],
   [
    "Is data with names replaced by codes, where the clinic keeps the code list, anonymized?",
    "No, it is pseudonymized and remains personal data because it can be re-identified."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the four-goal table pre-filled with one example per row and let them sort only six cards, using the question 'do I need the original back?' as a first filter.",
   "Extend: Ask fast finishers to design the data protection layers for a payment platform end to end, naming where tokenization, encryption with keys in a hardware security module, masking and hashing each apply and which threat each stops."
  ]
 },
 {
  "t": "Data loss prevention (DLP) in the cloud",
  "objectives": [
   "Students will be able to describe the three DLP stages and the detection techniques used in discovery.",
   "Students will be able to compare network, endpoint, storage and API-based or CASB DLP and identify what each can and cannot see.",
   "Students will be able to recommend a DLP deployment for a cloud scenario involving remote users and SaaS.",
   "Students will be able to explain a sensible rollout sequence that limits false positives and respects employee privacy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. List student answers about where sensitive files leave a company, and circle the ones that never touch the office network."
   ],
   [
    12,
    "Teach",
    "Draw the three stages left to right. Under discovery, list pattern matching, fingerprinting, exact data matching and classifiers. Then draw a map with a home laptop, the office, a SaaS app and a storage bucket, and place each DLP type on the map, shading what it can see."
   ],
   [
    18,
    "Activity",
    "Run the 'Where would DLP catch it?' leak-path exercise below in pairs, then debrief on the whiteboard map."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on false positives and employee privacy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "Name three ways a confidential file could leave a company today without anyone in IT noticing. Which of those would pass through the office network?",
  "activity": {
   "title": "Where would DLP catch it?",
   "materials": "Printed leak-path cards (10 per pair), a printed table with columns for network, endpoint, storage and API/CASB DLP, the whiteboard map from the teach segment.",
   "steps": [
    "Give each pair ten leak-path cards, such as: remote employee uploads a customer list to a personal cloud drive; nurse creates a public link in the hospital SaaS file service; contractor copies files to a USB drive; analyst emails a spreadsheet to a personal address from the office; developer pastes card numbers into a chat app; old file share holds unclassified HR records.",
    "For each card, pairs mark which DLP types would detect it and what enforcement action fits (alert, warn, justify, block, quarantine, remove link, encrypt).",
    "Pairs flag any card that no DLP type catches and propose another control, such as access control or rights management.",
    "Debrief by placing three cards on the whiteboard map and asking pairs to justify their choices."
   ]
  },
  "discussion": [
   "How would you explain to employees why their uploads are being monitored, and who should be involved before monitoring starts?",
   "What happens to a DLP program if it produces so many false positives that the help desk is overwhelmed?",
   "Which leak paths are realistically beyond DLP, and what other controls cover them?"
  ],
  "exit": [
   [
    "What must happen before DLP can protect data effectively?",
    "Data discovery and classification, so DLP knows what sensitive data looks like and where it is."
   ],
   [
    "A remote employee uploads files directly from home to a SaaS app. Which DLP types can see this?",
    "Endpoint DLP on the managed laptop and API-based or inline CASB DLP; network DLP at the office edge cannot."
   ],
   [
    "Name one technique that reduces false positives.",
    "Exact data matching, checksum validation, keyword proximity, or tuning in monitor-only mode."
   ]
  ],
  "differentiation": [
   "Support: Provide a partly completed leak-path table with the network column filled in, and let students reason about the endpoint and API columns by asking 'does this data ever pass through the office?'.",
   "Extend: Ask fast finishers to write a one-page DLP rollout plan for a hospital, including classification inputs, the order of channels, monitor-only duration criteria, privacy consultation and metrics for success."
  ]
 },
 {
  "t": "Keys, secrets and certificates management: KMS, HSM, BYOK and HYOK",
  "objectives": [
   "Students will be able to explain how a KMS, HSMs and envelope encryption work together to protect data.",
   "Students will be able to compare provider-managed keys, customer-managed keys, BYOK and HYOK by control, cost and risk.",
   "Students will be able to recommend a key ownership option for a given regulatory scenario.",
   "Students will be able to describe sound practices for secrets and certificate lifecycle management."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally the answers. Point out that each answer maps to a real key ownership option the class will learn."
   ],
   [
    15,
    "Teach",
    "Draw envelope encryption step by step: data, DEK, encrypted DEK, KEK inside the KMS and HSM. Then draw a horizontal spectrum from provider-managed to HYOK and annotate each with who generates the key, where it lives and what breaks if the customer withdraws it. Finish with secrets and certificate lifecycles."
   ],
   [
    15,
    "Activity",
    "Run the 'Who holds the key?' role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore trade-offs and outages."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on an index card."
   ]
  ],
  "warmup": "If you stored your valuables in a bank, would you want the bank to keep a copy of the key, hold your copy, or never have one at all? What would you give up with each choice?",
  "activity": {
   "title": "Who holds the key?",
   "materials": "Printed role cards (customer, cloud provider, regulator, external key service), printed scenario cards, a few envelopes and slips of paper to act out envelope encryption, whiteboard.",
   "steps": [
    "Act out envelope encryption first: one student writes a 'message' (data), seals it in an envelope with a paper 'data key', and hands the data key to the 'KMS' student, who locks it in a second envelope. Show that decrypting requires asking the KMS.",
    "In groups of four with assigned roles, read a scenario card (for example: regulator says provider must never decrypt; startup wants simplicity; insurer must prove key origin; hospital needs single-tenant validated hardware).",
    "Each group chooses provider-managed, customer-managed, BYOK, HYOK or dedicated cloud HSM, and the 'provider' student must name one feature or risk the choice brings.",
    "Groups report to the class; the teacher records choices on the spectrum and corrects any BYOK and HYOK confusion."
   ]
  },
  "discussion": [
   "When does the outage risk of HYOK outweigh the control it gives?",
   "Why are long-lived secrets dangerous even when they are stored in a vault?",
   "Who in an organization should be allowed to delete a master key, and why should that be separated from who uses it?"
  ],
  "exit": [
   [
    "What is the key difference between BYOK and HYOK?",
    "BYOK imports the customer's key into the provider's KMS; HYOK keeps the key outside the provider, which must call out to use it."
   ],
   [
    "In envelope encryption, what does the master key in the KMS encrypt?",
    "The data encryption keys, not the bulk data itself."
   ],
   [
    "What must you do when a secret is found in a code repository?",
    "Revoke and rotate it, review logs for misuse, and move it to a secrets manager."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a four-row table with columns 'who generates', 'where it lives', 'can provider use it?', and fill in the provider-managed row together before they complete the rest.",
   "Extend: Ask fast finishers to design key management for a multinational company with data in three regions, choosing key ownership per data class and explaining rotation, logging and what happens if the external key service fails."
  ]
 },
 {
  "t": "Data discovery: structured, semi-structured and unstructured data, and data location",
  "objectives": [
   "Students will be able to classify examples of data as structured, semi-structured or unstructured and explain how each is discovered.",
   "Students will be able to compare metadata-based, label-based and content-based discovery approaches.",
   "Students will be able to identify data location and residency issues, including backups, replicas and remote access.",
   "Students will be able to explain why discovery must be continuous in cloud environments."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers. Ask how many copies of a single photo they think exist across their devices and cloud accounts."
   ],
   [
    12,
    "Teach",
    "Show three projected samples side by side: a database table, a JSON log record, and a scanned letter. Explain how a discovery tool would examine each. Then present the three discovery approaches and close with a world map sketch showing a primary copy, backup and replica in different regions."
   ],
   [
    18,
    "Activity",
    "Run the data sorting and location audit below in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about forgotten copies and residency."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Think of one photo on your phone. List every place a copy of it might exist right now. Which of those places are in another country?",
  "activity": {
   "title": "Data sort and location audit",
   "materials": "Printed data sample cards (a table excerpt, a JSON record, an XML snippet, a log line, an email, a scanned form image, an audio transcript note, a chat message), printed mini inventory sheet listing storage locations with regions, sticky notes.",
   "steps": [
    "Groups sort the sample cards into structured, semi-structured and unstructured piles and write on each card which discovery approach would work best and why.",
    "Groups receive an inventory sheet for a fictional company listing databases, buckets, backups, a test environment and an analytics export, each with a region. A rule card states customer data must stay in Region A.",
    "Groups mark every location that breaks the residency rule and every location likely to hold sensitive copies, using sticky notes for 'unknown, needs content scan'.",
    "Each group shares one surprising finding and one guardrail that would prevent it recurring."
   ]
  },
  "discussion": [
   "Why do sensitive copies end up in test environments and analytics exports, and who should own finding them?",
   "If administrators in another country can access data stored locally, is the data really resident? What would your regulator say?",
   "What are the costs of content-based scanning, and how would you decide what to scan first?"
  ],
  "exit": [
   [
    "Classify an XML file, a spreadsheet of scanned receipts, and a relational table.",
    "XML is semi-structured, scanned receipts are unstructured, and the relational table is structured."
   ],
   [
    "Which discovery approach inspects the actual data?",
    "Content-based discovery."
   ],
   [
    "Name two places beyond the production store that discovery must cover.",
    "Any two of backups, replicas, snapshots, exports, logs, test environments or AI training data sets."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-question flowchart for sorting data: does it have a fixed schema, does it have tags or keys, or neither, and let them sort cards with the flowchart beside them.",
   "Extend: Ask fast finishers to draft a continuous discovery design for a multi-cloud company, naming the triggers for scans, how results feed classification and DLP, and the guardrails for unapproved regions."
  ]
 },
 {
  "t": "Data classification: policies, data mapping and data labeling",
  "objectives": [
   "Students will be able to describe the contents of a data classification policy, including levels, criteria and handling rules.",
   "Students will be able to distinguish the roles of data owner and data custodian in classification decisions.",
   "Students will be able to explain how data mapping and machine-readable labels keep classification consistent across cloud systems.",
   "Students will be able to identify when reclassification is needed, including aggregation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up and note student categories on the board. Ask who in their household decides where important papers go."
   ],
   [
    12,
    "Teach",
    "Present a four-level scheme with criteria and handling rules in a projected table. Draw owner and custodian side by side with their duties. Then sketch a data flow from an order system to a warehouse to a dashboard and show where labels must be inherited."
   ],
   [
    18,
    "Activity",
    "Run the classification committee exercise below in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about roles and aggregation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Sort these into three piles: a restaurant menu, your monthly pay stub, your passport number. What made you put each where you did?",
  "activity": {
   "title": "Classification committee",
   "materials": "Printed data set cards (customer list, published press release, payroll file, product roadmap, anonymized survey, server logs with email addresses), a printed four-level policy sheet with criteria, sticky notes in four colors for labels, whiteboard.",
   "steps": [
    "Assign roles in each group: data owner, custodian, privacy officer and auditor.",
    "The owner proposes a level for each data set card using the policy criteria, the privacy officer may challenge, and the custodian writes the handling rules on the matching colored sticky note (storage, encryption, sharing, retention).",
    "The teacher announces two events: the product roadmap is now public, and the survey will be joined with the customer list. Groups decide on reclassification.",
    "The auditor in each group reports one decision and whether the right role made it."
   ]
  },
  "discussion": [
   "What goes wrong when engineers classify data by guessing from resource names?",
   "How would you persuade busy business managers to take ownership of classification decisions?",
   "How should an organization handle a resource that has no label at all?"
  ],
  "exit": [
   [
    "Which role decides a data set's classification?",
    "The data owner, a business role accountable for the data."
   ],
   [
    "Give one example of a machine-readable label and a tool that can act on it.",
    "A resource tag such as data-classification=restricted on a bucket, acted on by a policy engine, DLP or access rules."
   ],
   [
    "Why might combining two internal data sets require reclassification?",
    "Aggregation can reveal sensitive or personal information that neither set revealed alone."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-question shortcut for levels (would disclosure harm people or break a law? would it harm the business?) and pre-label two cards as worked examples.",
   "Extend: Ask fast finishers to write tag-based policy rules in plain language for three levels, for example what a restricted bucket must and must not allow, and how untagged resources are handled."
  ]
 },
 {
  "t": "Information rights management (IRM): objectives, provisioning, access models and tools",
  "objectives": [
   "Students will be able to explain how IRM combines encryption, policy and an online rights check to protect content wherever it travels.",
   "Students will be able to name and describe the IRM objectives: persistent protection, dynamic policy control, automatic expiration, continuous auditing and interoperability.",
   "Students will be able to evaluate provisioning and access model challenges for external partners and mobile users.",
   "Students will be able to distinguish when IRM, DLP or storage permissions is the right control."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather ideas for keeping control of something you have given away. Connect them to rentals, library books and streaming."
   ],
   [
    13,
    "Teach",
    "Draw the open-time flow: user opens file, client calls policy server, identity check, policy check, use license, decrypt with enforced rights. List the five objectives with a one-line example each. Then cover provisioning through the directory and federation, access models and limits."
   ],
   [
    17,
    "Activity",
    "Run the 'Locked letter' role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about partners and analog capture."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You lend a friend a book but want it back by Friday and do not want them to photocopy it. What could you do, and what could you not stop?",
  "activity": {
   "title": "Locked letter role-play",
   "materials": "Printed 'document' sheets in sealed envelopes, printed policy cards listing users and rights, name badges for roles (owner, policy server, internal user, partner user, departed user), a whiteboard timeline.",
   "steps": [
    "Assign roles. The owner writes a policy card: who may view, who may print, expiry date. The policy server holds the card.",
    "Users ask the policy server to open their envelope. The server checks the badge against the policy and either hands over a 'use license' slip listing allowed actions or refuses.",
    "The teacher announces events in turn: a researcher leaves the project, the expiry date passes, a partner user has no federated account, a user goes offline with a cached license. The policy server and owner respond, and the class notes on the timeline what each user can now do.",
    "Finally, a user who can view tries to 'photograph' the letter by copying it by hand. Discuss what IRM can and cannot do about that, and how a watermark would help trace the leak."
   ]
  },
  "discussion": [
   "Why might a company choose not to use IRM for everyday internal documents?",
   "How should rights be managed when the person who protected a document leaves the company?",
   "When is a visible watermark a useful complement to IRM?"
  ],
  "exit": [
   [
    "Which IRM objective lets the owner remove access to copies already distributed?",
    "Dynamic policy control."
   ],
   [
    "A file has already been emailed to a partner. Which control can still restrict it: DLP, storage permissions or IRM?",
    "IRM, because it enforces rights each time the file is opened."
   ],
   [
    "Give one limitation of IRM.",
    "It cannot stop analog capture, it needs compatible clients, partners need identities, or the policy server is a critical dependency."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching worksheet pairing each of the five IRM objectives with a plain-language example before the role-play, and let them keep it during the activity.",
   "Extend: Ask fast finishers to write an IRM rollout recommendation for a company that shares documents with fifty partner firms, covering identity federation, client or browser access, offline license duration, ownership recovery and how labels apply templates automatically."
  ]
 },
 {
  "t": "Data retention, deletion and archiving policies, including legal hold and crypto-shredding",
  "objectives": [
   "Students will be able to explain what a retention policy contains and how legal requirements and storage limitation shape it.",
   "Students will be able to describe archiving requirements, including key retention, format longevity and restore testing.",
   "Students will be able to justify crypto-shredding as the deletion method for public cloud data.",
   "Students will be able to apply legal hold rules, including when the duty to preserve begins and how it interacts with lifecycle rules."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list answers. Point out that both too long and too short carry risk."
   ],
   [
    13,
    "Teach",
    "Draw a timeline: create, active use, archive, end of retention, delete. Add the minimum (law) and maximum (privacy) markers. Explain crypto-shredding with a drawing of data copies all locked to one key. Then drop a large 'HOLD' card onto the timeline and explain that it freezes deletion."
   ],
   [
    17,
    "Activity",
    "Run the 'Records officer' scenario exercise below in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about conflicts between retention and privacy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "How long do you keep old receipts and bank statements? What could go wrong if you threw them away too early, or kept them forever?",
  "activity": {
   "title": "Records officer scenarios",
   "materials": "Printed scenario cards, a large printed timeline per group, a 'HOLD' sticky note per group, markers.",
   "steps": [
    "Groups receive four data categories (for example payroll records, chat messages, customer support recordings, website logs) with a stated legal minimum and a privacy note, and mark each on the timeline with archive and delete points.",
    "The teacher reads event cards one at a time: counsel anticipates a lawsuit involving support recordings; a customer asks for deletion of personal data; an archive restore test fails because the key was deleted; a contract ends and the customer wants proof of deletion.",
    "For each event, groups decide what to do, placing the HOLD note where needed and naming the deletion method.",
    "Groups compare decisions; the teacher highlights that holds override retention and that crypto-shredding requires exclusive key control."
   ]
  },
  "discussion": [
   "What should happen when a privacy law says delete but a records law says keep?",
   "Who should have the authority to place and release a legal hold, and why not the IT team?",
   "What risks come from keeping everything forever because storage is cheap?"
  ],
  "exit": [
   [
    "Data under legal hold has passed its retention period. What do you do?",
    "Preserve it until legal counsel releases the hold."
   ],
   [
    "What makes crypto-shredding effective?",
    "Destroying customer-controlled keys renders every copy of the encrypted data unreadable, including copies on provider media."
   ],
   [
    "Name two things an archiving policy must address.",
    "Any two of storage class, encryption and key retention, format longevity, retrieval time, integrity checks and restore testing."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page flowchart: is there a hold? if yes, preserve; if no, has retention ended? if yes, delete with crypto-shredding; if no, keep or archive. Let them use it during the scenarios.",
   "Extend: Ask fast finishers to design lifecycle rules for a SaaS collaboration platform that satisfy a seven-year financial retention rule, a privacy maximum for marketing data, and a legal hold process, explaining how they would prove compliance to an auditor."
  ]
 },
 {
  "t": "Auditability, traceability and accountability of data events",
  "objectives": [
   "Students will be able to define auditability, traceability, accountability and non-repudiation and explain how they relate.",
   "Students will be able to identify the cloud event sources needed to reconstruct a data incident, including logs that are off by default.",
   "Students will be able to explain why identity attribution, time synchronization and protected log storage are required for trustworthy evidence.",
   "Students will be able to recommend improvements to a weak logging design."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss how students would prove who ate the last slice of pizza in a shared office."
   ],
   [
    12,
    "Teach",
    "List the five questions (who, what, which data, when, from where) and map each to a log source. Project a sample log line and annotate its fields. Explain shared accounts, role assumption, NTP and the separate logging account."
   ],
   [
    18,
    "Activity",
    "Run the 'Reconstruct the incident' log-reading exercise below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about privacy of logs and review."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A file has leaked from a shared drive. What three pieces of information would you need to prove who leaked it?",
  "activity": {
   "title": "Reconstruct the incident",
   "materials": "Printed excerpts of fictional logs: identity provider sign-ins, storage access entries, key management entries and management plane changes, one set with a shared account and clock drift, one set designed well; highlighters; whiteboard timeline.",
   "steps": [
    "Pairs receive the weak log set and try to answer who downloaded a fictional customer file, when and from where, marking every gap: shared account names, timestamps that do not line up, missing object-level entries.",
    "Pairs then receive the improved log set with federated identities, synchronized timestamps and object-level logging, and build a timeline that answers all five questions.",
    "Each pair lists the design changes that made the second set usable and ranks them by importance.",
    "The class combines rankings on the whiteboard and discusses where the logs should be stored and who may read them."
   ]
  },
  "discussion": [
   "Logs often contain personal data. How do you balance keeping detailed logs with privacy obligations?",
   "How long should logs be retained, and what should drive that decision?",
   "What alerts would you build first if you had time for only three?"
  ],
  "exit": [
   [
    "Why do shared accounts break accountability?",
    "Logs show only the shared name, so no action can be attributed to a specific person, and non-repudiation fails."
   ],
   [
    "Name two cloud event sources useful for investigating a data download.",
    "Any two of data access logs, identity provider logs, key management logs, management plane logs, application logs or network flow logs."
   ],
   [
    "Where should logs be stored to be trustworthy evidence?",
    "In a separate, locked-down account or SIEM with immutable storage and integrity checks."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a template with five columns (who, what, which data, when, where) to fill in from the log excerpts, with the first row completed as an example.",
   "Extend: Ask fast finishers to design a logging architecture for a multi-account cloud organization, specifying sources to enable, the central logging account, immutability settings, retention, access controls and three alert rules."
  ]
 },
 {
  "t": "Protecting AI and ML data: training data integrity, data poisoning, model and prompt security",
  "objectives": [
   "Students will be able to explain data poisoning and backdoors and select integrity controls that prevent and detect them.",
   "Students will be able to describe privacy risks from training data, including memorization and membership inference, and appropriate minimization controls.",
   "Students will be able to apply classification and access control to models, embeddings and retrieval systems.",
   "Students will be able to recognize indirect prompt injection and recommend defensive controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about how a new hire learns. Link each answer to training data."
   ],
   [
    13,
    "Teach",
    "Draw an AI data pipeline left to right: sources, data lake, training, model registry, inference endpoint, retrieval store, user prompt. Mark where poisoning, privacy leakage, model theft and prompt injection enter, and under each write the familiar control that addresses it."
   ],
   [
    17,
    "Activity",
    "Run the 'Threat on the pipeline' card mapping exercise below in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about responsibility and untrusted content."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "If a new employee learned their job only from a binder of old cases, how could someone make them do the job badly without ever talking to them?",
  "activity": {
   "title": "Threat on the pipeline",
   "materials": "A large printed or whiteboard drawing of an AI data pipeline, printed threat cards (poisoning via shared data lake, backdoor trigger, memorized personal data, membership inference, stolen model weights, embeddings stored in an unapproved region, indirect prompt injection in an email, retrieval over-permission), printed control cards, tape.",
   "steps": [
    "Groups tape each threat card to the point on the pipeline where it enters.",
    "Groups then attach one or two control cards to each threat, such as least privilege writes, provenance, versioned hashes, validation, minimization, pseudonymization, registry signing, rate limiting, inherited classification, per-user retrieval permissions, output validation and logging.",
    "Each group labels each threat as an integrity, confidentiality or privacy issue.",
    "Groups present one threat and their controls; the teacher corrects any mismatch, especially encryption offered as a poisoning defense."
   ]
  },
  "discussion": [
   "Who in an organization should own the integrity of training data: the data scientists, the data owners or security?",
   "Why is it hard for a model to tell the difference between instructions and data it reads?",
   "Should a model trained on confidential data be classified as confidential itself? Why or why not?"
  ],
  "exit": [
   [
    "Which control helps detect that a training data set was altered?",
    "Versioned snapshots with hashes or signatures, compared before training."
   ],
   [
    "What is indirect prompt injection?",
    "Malicious instructions hidden in content the AI system reads, such as a document or web page, that cause it to act against the user's intent."
   ],
   [
    "How should a retrieval assistant be prevented from leaking restricted documents?",
    "Run retrieval with the requesting user's own permissions and apply source classification to the retrieval store."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat sheet linking each new AI asset (training set, model, embedding, prompt) to the familiar data asset it resembles and the controls already learned for it.",
   "Extend: Ask fast finishers to write a short security review checklist for a proposed retrieval-augmented assistant, covering data sources, classification inheritance, permissions, logging, output handling and residency."
  ]
 },
 {
  "t": "Cloud infrastructure components: physical environment, network and communications, compute, virtualization, storage and management plane",
  "objectives": [
   "Students will be able to identify the six cloud infrastructure components and describe the role of each.",
   "Students will be able to explain regions and availability zones and use them to design for facility failure.",
   "Students will be able to distinguish the SDN control plane from the data plane and explain the hypervisor's role in tenant isolation.",
   "Students will be able to justify why the management plane is the highest-value target and list controls that protect it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers on the board as a stack."
   ],
   [
    13,
    "Teach",
    "Draw the six components as a layered diagram from building to management plane. Add a map of one region with three zones. Explain control plane versus data plane with a traffic-officer-and-roads example, and show the hypervisor dividing a host into virtual machines. End by circling the management plane in red."
   ],
   [
    17,
    "Activity",
    "Run the 'Build the stack' layered whiteboard exercise below in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about trust and verification."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "When you save a photo to a cloud service, what physical things have to work for that photo to still be there tomorrow?",
  "activity": {
   "title": "Build the stack",
   "materials": "Whiteboard or large paper per group, sticky notes in six colors (one per component), printed failure and threat cards, markers.",
   "steps": [
    "Groups draw the six components as layers and place sticky notes with at least two real items on each layer, such as generators, switches, hypervisor, object storage, console and API.",
    "Groups mark each item as provider-controlled or customer-controlled for an infrastructure as a service (IaaS) deployment.",
    "The teacher deals failure and threat cards: a zone loses power, a hypervisor flaw is announced, a shared admin account is phished, a security group allows the whole internet. Groups place each card on the affected layer and write who responds and which control helps.",
    "Groups present one card; the class discusses which layer has the largest blast radius and why it is the management plane."
   ]
  },
  "discussion": [
   "If you can never see the provider's data center, what evidence would make you comfortable trusting it?",
   "Why might a single-zone deployment be acceptable for some workloads but not others?",
   "How does software-based tenant isolation change the risks compared with physically separate servers?"
  ],
  "exit": [
   [
    "What is the difference between a region and an availability zone?",
    "A region is a geographic area containing multiple availability zones; a zone is a physically separate facility with independent power and networking."
   ],
   [
    "In SDN, which plane decides where traffic goes?",
    "The control plane; the data plane forwards packets."
   ],
   [
    "Name two controls that protect the management plane.",
    "Any two of MFA, least privilege, separate administrative identities, restricting the highest-privilege account, and logging and alerting on API calls."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn six-layer template with one example item filled in per layer and a short glossary card for SDN, hypervisor and management plane.",
   "Extend: Ask fast finishers to design a resilient architecture for a patient portal across zones and regions, and list which audit evidence they would request from the provider for each infrastructure layer."
  ]
 },
 {
  "t": "Secure data center design: logical design, physical design, environmental design and tier levels",
  "objectives": [
   "Students will be able to describe the logical, physical and environmental elements of secure data center design.",
   "Students will be able to distinguish the four Uptime Institute tiers by their defining property.",
   "Students will be able to select an appropriate tier for a business scenario and justify the cost trade-off.",
   "Students will be able to identify physical and environmental weaknesses in a site description."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for keeping a building's lights on during a storm."
   ],
   [
    12,
    "Teach",
    "Draw three columns for logical, physical and environmental design and fill each with examples. Then draw the four tiers as a staircase, writing the defining word on each step and drawing one path versus multiple paths for power."
   ],
   [
    18,
    "Activity",
    "Run the 'Site visit' exercise below in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about matching tiers to needs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "If you had to keep a server running in your school building through a storm, a broken air conditioner and a curious visitor, what would you need?",
  "activity": {
   "title": "Site visit",
   "materials": "Printed site description sheets for three fictional data centers (each with deliberate strengths and weaknesses), printed tier definition cards, a scoring sheet, whiteboard.",
   "steps": [
    "Groups read the three site descriptions, which include details such as location near a river or airport, number of entrances, mantraps, carrier entry paths, UPS and generator arrangements, cooling paths and fire suppression type.",
    "Groups list strengths and weaknesses under logical, physical and environmental headings and assign each site a likely tier using the definition cards.",
    "The teacher reveals a client requirement card (for example, a system that can never be shut down for maintenance but has no second site) and groups choose a site and justify the trade-off in cost and risk.",
    "Groups present their choice; the teacher confirms tier assignments and highlights the Tier II and Tier III distinction."
   ]
  },
  "discussion": [
   "When is it reasonable to choose a lower-tier facility for an important system?",
   "Which physical security control would you prioritize if your budget allowed only one upgrade, and why?",
   "How does running applications across multiple sites change the tier you need for each site?"
  ],
  "exit": [
   [
    "Which tier first allows planned maintenance without downtime?",
    "Tier III, concurrently maintainable."
   ],
   [
    "Which tier withstands any single unplanned failure?",
    "Tier IV, fault tolerant."
   ],
   [
    "Name one physical and one environmental design control.",
    "Physical: mantraps, layered access, cameras, site away from hazards. Environmental: UPS and generators, redundant cooling, fire suppression, diverse carrier paths."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the tier staircase drawing with each step's key word and a one-line test question (does it have spares? multiple paths? survive sudden failure?) to apply to each site.",
   "Extend: Ask fast finishers to write a site selection memo comparing a Tier III single site with two Tier II sites in different regions for a bank, weighing cost, availability, residency and operational complexity."
  ]
 },
 {
  "t": "Analyzing risks to cloud infrastructure and platforms: virtualization risks, countermeasures and threats",
  "objectives": [
   "Students will be able to identify virtualization-specific risks, including VM escape, side-channel attacks, VM sprawl, exposed snapshots and dormant images.",
   "Students will be able to list broader cloud infrastructure threats and explain why misconfiguration is the most common cause of cloud breaches.",
   "Students will be able to assign countermeasures to the provider or the customer using the shared responsibility model.",
   "Students will be able to record a cloud risk in a risk register with a rating and a response of mitigate, transfer, avoid or accept."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question. Take three or four answers and write them on the board in two unlabeled columns: provider-side and customer-side. Reveal the column labels at the end."
   ],
   [
    12,
    "Teach",
    "Walk through the risk analysis steps, then the virtualization risks (VM escape, side channels, sprawl, snapshots, dormant images) and broader threats. For each, ask the class who fixes it. Emphasize that misconfiguration is the most common breach cause and that VM escape is rare but severe."
   ],
   [
    18,
    "Activity",
    "Run the risk register workshop described below. Circulate and challenge each group to justify the owner and response they chose."
   ],
   [
    5,
    "Discuss",
    "Ask groups to share one risk they chose to accept or transfer and defend it. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a sticky note or index card and hand them in."
   ]
  ],
  "warmup": "If you rented a virtual server from a cloud provider tomorrow, what are three things that could go wrong with it, and who do you think would be responsible for preventing each one?",
  "activity": {
   "title": "Larkspur Genomics risk register workshop",
   "materials": "Printed scenario sheet describing a fictional research company's cloud estate (412 VMs, unowned instances, a shared snapshot, an old image, a stale DNS record, root keys used daily); blank risk register template with columns for risk, asset, likelihood, impact, owner (provider or customer), response and control; whiteboard.",
   "steps": [
    "Put students in groups of three or four and hand out the scenario sheet and register template.",
    "Each group identifies at least five risks from the scenario, naming the asset and the threat for each.",
    "Groups rate likelihood and impact as low, medium or high and mark whether the provider or the customer owns the main countermeasure.",
    "For each risk, groups choose mitigate, transfer, avoid or accept and write one concrete control, such as owner tags with auto-stop, encrypted snapshots with sharing blocked, or rebuilding from a golden image.",
    "Each group posts its highest-rated risk on the whiteboard; the class compares and corrects any ownership errors."
   ]
  },
  "discussion": [
   "Why do you think misconfiguration causes more cloud breaches than hypervisor flaws, even though hypervisor flaws sound more dangerous?",
   "When is it reasonable for an organization to accept a cloud infrastructure risk rather than mitigate it?",
   "How would your risk register change if the provider suffered a region-wide outage?"
  ],
  "exit": [
   [
    "What is VM sprawl and name one control that limits it.",
    "Uncontrolled growth of VMs leaving unowned, unpatched systems; controls include mandatory owner tags, auto-stop of untagged instances and idle-resource reports."
   ],
   [
    "Who is mainly responsible for preventing VM escape in public IaaS, and who patches the guest operating system?",
    "The provider hardens and patches the hypervisor; the customer patches the guest operating system."
   ],
   [
    "List the four risk responses and give a cloud example of one.",
    "Mitigate, transfer, avoid, accept; for example, mitigating public storage exposure with CSPM and policy checks."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-filled register row as a model and a word bank of the five virtualization risks with one-line definitions, and let them work in pairs on three risks instead of five.",
   "Extend: Ask fast finishers to add a column for detection (what log or alert would show the risk occurring) and to explain how economic denial of service differs from traditional denial of service."
  ]
 },
 {
  "t": "Security controls: physical and environmental protection, system and communication protection, identification and authentication",
  "objectives": [
   "Students will be able to describe controls in the physical and environmental, system and communication protection, and identification and authentication families.",
   "Students will be able to assign each control to the provider or the customer in a public cloud deployment.",
   "Students will be able to explain how customers obtain assurance about provider controls, distinguishing SOC 2 Type I from Type II.",
   "Students will be able to recommend identity controls such as federation, phishing-resistant MFA and workload identities for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt. Collect answers aloud and list them on the board, then ask which of them a cloud customer could actually check in person."
   ],
   [
    12,
    "Teach",
    "Present the three control families with examples. Draw a two-column responsibility chart (provider, customer). Explain SOC 2 Type I versus Type II and ISO/IEC 27001 as assurance evidence. Close with identity: federation, phishing-resistant MFA, workload identities and short-lived tokens."
   ],
   [
    18,
    "Activity",
    "Run the control ownership card sort described below. Circulate and ask each group how the customer would prove the provider's controls work."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the families through defense in depth and audit logging."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Imagine you store your company's most sensitive files in a cloud provider's data center you will never visit. What would you want to know about that building, and how could you find out without going there?",
  "activity": {
   "title": "Who owns this control? Card sort",
   "materials": "Printed cards (about 20) each naming one control, such as 'badge access to data hall', 'fire suppression', 'TLS on customer web app', 'security group rules', 'tenant isolation', 'administrator MFA', 'workload identity for pipeline', 'drive destruction', 'administrator laptop encryption'; a whiteboard divided into a grid of three families by two owners (provider, customer); tape or sticky putty.",
   "steps": [
    "Form groups of three and give each group a full set of cards.",
    "Groups place each card in the correct family and owner cell on their desk grid, noting any card they think is shared.",
    "For every provider-owned card, the group writes on a sticky note what evidence the customer would request (for example SOC 2 Type II).",
    "Each group transfers three cards it debated most to the class whiteboard grid and explains its reasoning.",
    "The teacher reviews the board, correcting misplacements and highlighting shared controls such as encryption, where the provider offers the feature and the customer configures it."
   ]
  },
  "discussion": [
   "Why might a stolen administrator laptop be a bigger threat to a cloud environment than an intruder at the provider's data center fence?",
   "What makes a method of MFA phishing-resistant, and why does that matter most for administrators?",
   "How does audit logging connect the three control families into defense in depth?"
  ],
  "exit": [
   [
    "Which party implements physical and environmental controls in public cloud, and what evidence does the customer review?",
    "The provider; the customer reviews independent reports such as SOC 2 Type II and ISO/IEC 27001 certification."
   ],
   [
    "Give two examples of system and communication protection controls the customer configures.",
    "Examples: security group rules, network segmentation, TLS settings on its applications, VPN links, key usage."
   ],
   [
    "Why is a workload identity with short-lived tokens better than a stored access key?",
    "Tokens expire quickly and nothing static is stored to steal, which limits damage if credentials are exposed."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference sheet with one-line definitions of each family and pre-sort five cards with them before they continue alone.",
   "Extend: Ask fast finishers to map five of the cards to NIST SP 800-53 family codes (PE, SC, IA, AU) and explain which control in the scenario provides defense in depth if MFA fails."
  ]
 },
 {
  "t": "Securing the management plane and hypervisors: type 1 vs type 2, VM escape and isolation",
  "objectives": [
   "Students will be able to compare type 1 and type 2 hypervisors and justify why type 1 is used for multitenant clouds.",
   "Students will be able to explain VM escape and identify provider and customer options that strengthen isolation.",
   "Students will be able to design management plane protections, including root account handling, just-in-time access and break-glass accounts.",
   "Students will be able to explain why a compromised management plane defeats hypervisor isolation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question and take a quick show of hands, then ask two students to defend opposite answers."
   ],
   [
    12,
    "Teach",
    "Draw the two hypervisor stacks side by side on the board (hardware, hypervisor, guests versus hardware, host OS, hypervisor, guests). Explain isolation, VM escape and provider defenses, then dedicated hosts and confidential computing. Finish with the management plane and the root account rules."
   ],
   [
    18,
    "Activity",
    "Run the root account incident tabletop described below. Keep time for each inject."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, linking the incident back to why isolation did not help."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "Which would worry you more as a cloud customer: a flaw that lets another tenant break out of their virtual machine, or someone stealing your account's administrator password? Why?",
  "activity": {
   "title": "Root account incident tabletop",
   "materials": "Projector or whiteboard for three printed or displayed injects; role cards (incident lead, cloud administrator, security analyst, manager); blank sheet for a remediation plan.",
   "steps": [
    "Form groups of four and hand out role cards.",
    "Inject 1: show an alert that the root account signed in from an unknown location and that eight engineers share the root credentials. Groups decide immediate containment steps in five minutes.",
    "Inject 2: reveal that a new administrator user was created and logging was turned off in the production account. Groups decide what evidence they can still rely on and why protected, separate log storage matters.",
    "Inject 3: the identity provider is down during recovery. Groups decide how they would regain access and what break-glass controls should already have existed.",
    "Each group writes a five-point remediation plan covering root account storage, MFA, federated admin roles, just-in-time elevation and alerting, and presents one point to the class."
   ]
  },
  "discussion": [
   "Why does a stolen administrator identity make hypervisor isolation irrelevant?",
   "When would the extra cost of dedicated hosts or confidential computing be justified?",
   "How do you balance the need for emergency access with the risk of break-glass accounts?"
  ],
  "exit": [
   [
    "Which hypervisor type runs directly on hardware, and why is it preferred for multitenant clouds?",
    "Type 1 (bare metal); it has a smaller attack surface and better performance than a hosted type 2 hypervisor."
   ],
   [
    "What is VM escape and who provides the main defense in public cloud?",
    "Code in a VM breaking out to the hypervisor, host or other VMs; the provider hardens and patches the hypervisor."
   ],
   [
    "Name three controls for protecting the root or owner account.",
    "No daily use, strong hardware-based MFA, secure storage of credentials, and alerts on every sign-in."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of both hypervisor stacks and a checklist of management plane controls that students can tick while working through the tabletop.",
   "Extend: Ask fast finishers to explain how offloading networking and storage to dedicated hardware reduces hypervisor attack surface, and to draft an alert rule describing what event should page the security team."
  ]
 },
 {
  "t": "Network security in the cloud: virtual networks, security groups, microsegmentation, zero trust and VPNs",
  "objectives": [
   "Students will be able to design a virtual network with public, private and isolated subnets and explain the role of route tables, gateways and private endpoints.",
   "Students will be able to compare stateful security groups with stateless network ACLs and troubleshoot a rule that blocks return traffic.",
   "Students will be able to explain how microsegmentation and zero trust limit lateral movement.",
   "Students will be able to decide when a site-to-site VPN, ZTNA, WAF or DDoS protection is the appropriate control."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect two or three answers. Note on the board any words like 'inside' or 'trusted' to return to later."
   ],
   [
    12,
    "Teach",
    "Whiteboard a three-tier VPC with public, private and isolated subnets, a route table and an internet gateway. Explain security groups versus NACLs with the receptionist and turnstile analogy, then microsegmentation, zero trust principles, VPN versus ZTNA, WAF, DDoS protection and flow logs."
   ],
   [
    18,
    "Activity",
    "Run the 'draw and break it' design exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the design to zero trust."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If a visitor gets past the front desk of an office building, should they be able to walk into any room? How is that like a computer network?",
  "activity": {
   "title": "Draw it, then break it",
   "materials": "Whiteboard or large paper per group, markers, sticky notes in two colors, printed rule cards showing sample security group and NACL rules (some correct, some flawed).",
   "steps": [
    "In pairs or groups of three, students draw a VPC for a fictional online shop with a load balancer, application servers and a database, placing each in the right subnet type.",
    "Groups write security group rules on sticky notes, using security group references (for example, database allows the app tier group on the database port).",
    "The teacher hands each group two flawed rule cards: a NACL that allows inbound web traffic but not outbound ephemeral ports, and a security group that allows the database port from anywhere.",
    "Groups diagnose what breaks or what is exposed by each card and write the fix.",
    "Groups swap drawings with a neighbor, who plays attacker on a compromised web server and lists what it could reach; the original group then adds microsegmentation or zero trust controls to close the gaps."
   ]
  },
  "discussion": [
   "Why does a stateless filter need rules for both directions, and when is that extra control useful?",
   "What changes in a network design when you assume an attacker is already inside?",
   "When would an organization still choose a site-to-site VPN over other options?"
  ],
  "exit": [
   [
    "Which filter is stateful and attached to instances, and which is usually stateless and attached to subnets?",
    "Security groups are stateful at the instance level; network ACLs are usually stateless at the subnet level."
   ],
   [
    "Outbound requests from a subnet work, but replies never arrive. What is the likely cause?",
    "A stateless NACL missing a rule that allows the return traffic, typically on ephemeral ports."
   ],
   [
    "What does microsegmentation limit, and how does zero trust treat network location?",
    "It limits lateral movement; zero trust treats location as one signal and verifies identity and context for every request."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially drawn VPC template with subnets labeled and a short list of rule examples to copy and adapt.",
   "Extend: Ask fast finishers to add a private endpoint for storage and a WAF, and to write which flow log fields they would check to detect an attacker scanning from the compromised web server."
  ]
 },
 {
  "t": "Business continuity and disaster recovery in the cloud: strategy, RTO/RPO, plan creation and testing",
  "objectives": [
   "Students will be able to define RTO, RPO and MTD and explain the relationship between RTO and MTD.",
   "Students will be able to compare backup and restore, pilot light, warm standby and active-active strategies and select the least expensive one that meets given targets.",
   "Students will be able to order BC/DR test types from least to most disruptive and choose an appropriate test for a scenario.",
   "Students will be able to identify hidden dependencies such as identity, DNS and key management in a cloud DR plan."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect a few answers and write 'how long' and 'how much' on the board, introducing RTO and RPO informally."
   ],
   [
    12,
    "Teach",
    "Define BC versus DR, the three cloud scenarios, the four strategies on a cost and speed line, RTO, RPO and MTD with a timeline drawing. Explain dependencies and the five test types, sharing the two mnemonics."
   ],
   [
    18,
    "Activity",
    "Run the DR strategy matching exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on provider failure and dependencies."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If your phone died right now and could not be repaired, how long could you go without one, and how many of your recent photos or messages would you lose? What do your answers have in common with a company's computer systems?",
  "activity": {
   "title": "Pick the cheapest strategy that works",
   "materials": "Printed system cards (six fictional systems, each with an RTO, RPO, MTD and a short description), a printed strategy sheet with typical recovery characteristics for backup and restore, pilot light, warm standby and active-active, and sticky notes.",
   "steps": [
    "Form groups of three and hand out the system cards and strategy sheet.",
    "For each system, groups first check that the RTO does not exceed the MTD and flag any card where it does.",
    "Groups select the least expensive strategy that meets both RTO and RPO and write a one-sentence justification on a sticky note.",
    "Groups list at least two dependencies (identity, DNS, keys, third-party APIs) that would need their own recovery plan for one system.",
    "For their most critical system, groups choose which test type they would run next and explain the risk trade-off; the class compares answers."
   ]
  },
  "discussion": [
   "When is recovering to a different cloud provider worth the extra complexity?",
   "Why do you think so many DR plans fail on dependencies like DNS or identity rather than on the main application?",
   "How does cloud automation change how often a company can afford to test its DR plan?"
  ],
  "exit": [
   [
    "Define RTO and RPO in one sentence each.",
    "RTO is the maximum acceptable downtime before service is restored; RPO is the maximum acceptable data loss measured in time."
   ],
   [
    "A system has a four-hour RTO and a one-hour RPO. Is active-active required? Explain.",
    "Not necessarily; choose the cheapest strategy that meets the targets, such as pilot light or warm standby with frequent replication."
   ],
   [
    "List the five test types from least to most disruptive.",
    "Checklist, tabletop, simulation, parallel, full interruption."
   ]
  ],
  "differentiation": [
   "Support: Give students a timeline diagram showing the last backup, the disaster and the restore point with RPO and RTO labeled, and work through the first system card together.",
   "Extend: Ask fast finishers to design a DR approach for a system that must survive the failure of its entire cloud provider and list the data portability and contract issues involved."
  ]
 },
 {
  "t": "Audit mechanisms: log collection, correlation and packet capture in cloud environments",
  "objectives": [
   "Students will be able to identify the main cloud log sources and explain how availability differs across IaaS, PaaS and SaaS.",
   "Students will be able to describe principles of central log collection, including normalization, time synchronization, integrity and retention.",
   "Students will be able to correlate events from multiple log sources to detect a suspicious pattern.",
   "Students will be able to explain packet capture options and limits in the cloud, distinguishing traffic mirroring from flow logs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and let students answer in pairs for two minutes, then hear two answers."
   ],
   [
    10,
    "Teach",
    "Present the three audit mechanisms. Draw a table with IaaS, PaaS and SaaS columns and fill in which logs and capture options exist in each. Cover central collection principles and why correlation depends on identity, time and context."
   ],
   [
    20,
    "Activity",
    "Run the log correlation detective exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, linking findings back to contracts and logging design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Think of a time a store or app told you something happened on your account. What records would they need to prove exactly what happened, and when?",
  "activity": {
   "title": "Log correlation detective",
   "materials": "Printed excerpts from four fictional log sources (identity sign-ins, management plane audit log, storage access log, flow log) covering the same hour, with consistent usernames but one source using a different time zone; highlighters; whiteboard timeline.",
   "steps": [
    "Form groups of three and give each group all four log excerpts.",
    "Groups first normalize the times to one time zone and note why the mismatch mattered.",
    "Groups highlight events that relate to the same identity and build a combined timeline on paper.",
    "Groups identify the attack pattern (unfamiliar sign-in, new access key, mass download) and write the correlation rule that would have caught it.",
    "Groups list what evidence is missing, such as packet contents, and state which tool could provide it in IaaS and whether it would be available if the service were SaaS; the teacher builds the master timeline on the board."
   ]
  },
  "discussion": [
   "Why might a provider limit what logs and network data a SaaS customer can see?",
   "Who should be able to delete security logs, and why?",
   "How would you decide which high-volume logs are worth paying to keep for a year?"
  ],
  "exit": [
   [
    "Name three cloud log sources a customer should collect centrally.",
    "Examples: management plane audit logs, identity sign-in logs, storage or service access logs, flow logs, operating system and application logs."
   ],
   [
    "What is the difference between a flow log and a packet capture?",
    "A flow log records connection metadata only; a packet capture records the actual packets including payloads."
   ],
   [
    "How can a customer get packet-level visibility in IaaS?",
    "Using the provider's traffic mirroring on its own instance interfaces or capture agents on its own virtual machines."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a pre-built timeline with blanks to fill and a list of the fields to match (user, time, source address, action).",
   "Extend: Ask fast finishers to draft contract language covering log availability, retention, export and investigation support from a SaaS provider."
  ]
 },
 {
  "t": "Training and awareness for application security: cloud development basics and common pitfalls",
  "objectives": [
   "Students will be able to explain how cloud development differs from traditional development and why developers make security decisions constantly.",
   "Students will be able to identify common cloud development pitfalls, including hard-coded secrets, over-privileged identities, insecure defaults and weak tenant isolation.",
   "Students will be able to design a role-specific training approach that includes security champions.",
   "Students will be able to propose outcome-based measures for training effectiveness."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and gather answers on the board under 'tools' and 'people'."
   ],
   [
    12,
    "Teach",
    "Explain cloud development basics (API coupling, microservices, CI/CD, infrastructure as code), walk through the common pitfalls with a short example of each, then role-specific training, security champions and outcome metrics."
   ],
   [
    18,
    "Activity",
    "Run the pitfall spotting code review described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect pitfalls back to training design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If the same type of mistake keeps showing up in work from different people, is the best fix a better checking tool, better teaching, or both? Why?",
  "activity": {
   "title": "Pitfall spotting code review",
   "materials": "Printed one-page excerpts (pseudo-code and a short infrastructure template) containing planted pitfalls: a hard-coded access key, a function role with full administrator rights, a storage resource with public access, a tenant ID read from the request body, and missing logging; highlighters; a printed training plan template.",
   "steps": [
    "In pairs, students review the excerpts and highlight every pitfall they can find, labeling each with its name.",
    "For each pitfall, pairs write the safer approach (secrets manager or workload identity, least-privilege role, private access, tenant ID from the authenticated session, structured audit logging).",
    "Pairs join into groups of four and agree on which pitfalls are best addressed by training, by tooling or by both.",
    "Each group fills in a short training plan for one role (developer, architect or operations) with two topics and one outcome metric.",
    "Groups share their metric with the class; the teacher challenges any metric that measures attendance rather than outcomes."
   ]
  },
  "discussion": [
   "Why might a talented developer still hard-code a secret?",
   "What makes a security champion program succeed or fail?",
   "How could an organization tell whether its training is actually changing behavior?"
  ],
  "exit": [
   [
    "Name three common cloud development pitfalls.",
    "Examples: hard-coded secrets, over-privileged identities, insecure defaults, assuming perimeter protection, weak tenant isolation, insufficient logging."
   ],
   [
    "What is a security champion?",
    "A developer embedded in a team with extra security training who promotes secure practices and relays feedback to security."
   ],
   [
    "Give one good and one poor measure of training effectiveness.",
    "Good: a drop in repeat findings or leaked secrets. Poor: course completion rates alone."
   ]
  ],
  "differentiation": [
   "Support: Provide a pitfall checklist with definitions and a hint marking which section of the excerpt contains each pitfall.",
   "Extend: Ask fast finishers to write a short abuse case for the tenant isolation flaw and describe an automated test that would catch it in the pipeline."
  ]
 },
 {
  "t": "Secure software development lifecycle (SDLC): phases, methodologies and threat modeling (STRIDE, DREAD, PASTA, ATASM)",
  "objectives": [
   "Students will be able to map security activities to each SDLC phase from requirements through disposal.",
   "Students will be able to explain how waterfall, agile and DevOps change the frequency of security activities.",
   "Students will be able to apply STRIDE to a simple design and map each category to the property it violates.",
   "Students will be able to compare STRIDE, DREAD, PASTA and ATASM and choose the appropriate method for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take quick answers. Write the phases students name on the board in order."
   ],
   [
    12,
    "Teach",
    "Complete the SDLC phase list and add one security activity per phase. Explain methodology frequency. Teach STRIDE with the property mapping as a table, then contrast DREAD, PASTA (with the mnemonic) and ATASM."
   ],
   [
    18,
    "Activity",
    "Run the STRIDE whiteboard session described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare the methods."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you were building a house, at what point would you want someone to check whether a burglar could get in: when drawing the plans, while building, or after you move in? Why?",
  "activity": {
   "title": "STRIDE the upload service",
   "materials": "Whiteboard or large paper per group, markers, a printed simple data flow diagram of a fictional clinic file-upload service (user, web front end, upload function, cloud storage, audit database, identity provider) with trust boundaries marked, and six STRIDE cards per group.",
   "steps": [
    "Form groups of four and give each group the data flow diagram and STRIDE cards.",
    "Groups walk each element and data flow across a trust boundary through the six STRIDE categories and write any threat they find on a sticky note placed on the diagram.",
    "For each threat, groups write the violated property and one mitigation (for example, signed upload URLs for spoofing, audit logging for repudiation, encryption for information disclosure).",
    "Groups pick their top three threats and score them quickly with DREAD, then compare scores with another group to see how subjective the scores are.",
    "The teacher collects one threat per STRIDE category from the class and discusses which SDLC phase each mitigation belongs to."
   ]
  },
  "discussion": [
   "Why did two groups give the same threat different DREAD scores, and what does that say about the model?",
   "When would an organization prefer PASTA over STRIDE?",
   "How can a team doing daily deployments keep its threat model current?"
  ],
  "exit": [
   [
    "Name the six STRIDE categories.",
    "Spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege."
   ],
   [
    "Which property does elevation of privilege violate, and which does denial of service violate?",
    "Authorization; availability."
   ],
   [
    "Which method is risk-centric, has seven stages and starts from business objectives?",
    "PASTA."
   ]
  ],
  "differentiation": [
   "Support: Provide a STRIDE reference card listing each category, its property and an example threat, and let struggling groups focus on three diagram elements.",
   "Extend: Ask fast finishers to add cloud-specific elements to the diagram (management plane, workload identities, a third-party API) and identify threats at those new trust boundaries, noting which the provider mitigates."
  ]
 },
 {
  "t": "Common cloud vulnerabilities: OWASP Top 10 and SANS/CWE Top 25",
  "objectives": [
   "Students will be able to distinguish the OWASP Top 10 from the CWE Top 25 in purpose, scope and level of detail.",
   "Students will be able to recognize major OWASP categories, such as broken access control, injection and security misconfiguration, in short scenarios.",
   "Students will be able to explain why SSRF is especially dangerous in the cloud and name defenses against it.",
   "Students will be able to describe how these lists feed coding standards, testing and training without treating them as complete."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question and collect three or four guesses, writing them on the board."
   ],
   [
    12,
    "Teach",
    "Introduce both lists and their differences. Walk through the main OWASP categories with one-sentence examples, then sample CWE weaknesses. Draw the SSRF path from user to web server to metadata service to attacker, and add the defenses."
   ],
   [
    18,
    "Activity",
    "Run the vulnerability scenario card match described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, emphasizing the lists as starting points."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "What do you think is the most common way websites get broken into: clever hacking tools, or simple mistakes? What might those mistakes look like?",
  "activity": {
   "title": "Name that weakness",
   "materials": "Printed scenario cards (about 12) each describing a short incident, such as changing an ID in a URL, a public storage bucket, a preview feature fetching internal addresses, an outdated library, missing logs, an unsigned update; a printed sheet of OWASP category names; sticky notes.",
   "steps": [
    "Form groups of three and deal out the scenario cards.",
    "Groups match each card to the OWASP category that best fits and write the category on a sticky note attached to the card.",
    "For three cards of their choice, groups also name a specific CWE-style weakness behind the risk (for example, missing authorization or improper input validation).",
    "Groups write one prevention control per card, such as server-side authorization checks, private-by-default templates, URL allow lists or dependency scanning.",
    "The teacher reviews answers, spending extra time on the SSRF card and why the cloud metadata service raises its impact."
   ]
  },
  "discussion": [
   "Why do you think broken access control is so common even in mature organizations?",
   "If an application avoids every item on both lists, what kinds of flaws could it still have?",
   "How should a team use these lists without turning them into a checkbox exercise?"
  ],
  "exit": [
   [
    "In one sentence each, describe the OWASP Top 10 and the CWE Top 25.",
    "OWASP Top 10 is an awareness list of broad web application risk categories; CWE Top 25 is a ranked list of specific software weaknesses across all software."
   ],
   [
    "A user changes an order number in a URL and sees another customer's order. Which category is this?",
    "Broken access control."
   ],
   [
    "What does SSRF target in the cloud, and name one defense.",
    "The instance metadata service to steal temporary credentials; defenses include token-based metadata access, URL allow lists and least-privilege roles."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page glossary with each OWASP category and a short example, and let struggling groups work with six cards instead of twelve.",
   "Extend: Ask fast finishers to explain how the same weakness could be described by both lists and why CWE identifiers help scanners and reports stay consistent."
  ]
 },
 {
  "t": "Applying the SDLC in cloud: secure coding, ASVS and software configuration management",
  "objectives": [
   "Students will be able to describe core secure coding practices, including input validation, output encoding, parameterized queries and server-side authorization.",
   "Students will be able to explain the three ASVS verification levels and select an appropriate level for a described application.",
   "Students will be able to explain how ASVS makes application security measurable across the lifecycle.",
   "Students will be able to describe software configuration management controls and explain how they prevent and detect configuration drift in cloud environments."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and gather two or three answers."
   ],
   [
    12,
    "Teach",
    "Present secure coding practices with one example each. Introduce ASVS levels using a table with typical applications per level. Explain SCM controls: version control, protected branches, signed commits and artifacts, reproducible builds, configuration separate from code, and drift detection."
   ],
   [
    18,
    "Activity",
    "Run the ASVS level assignment and change control exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, connecting ASVS to board-level reporting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If your manager asked you to prove that an app you built is secure, what evidence would you show? What would make that evidence convincing?",
  "activity": {
   "title": "Set the bar, then guard the change",
   "materials": "Printed cards describing five fictional applications (a cafeteria menu site, an HR portal, a payment portal, a medical records API, a marketing blog) and a printed short ASVS level summary; a printed change log excerpt showing a mix of reviewed pipeline changes and one unreviewed console change; sticky notes.",
   "steps": [
    "In groups of three, students assign an ASVS level to each application card and write a one-line justification based on data sensitivity and business impact.",
    "Groups pick one application and list three secure coding practices from the lesson that its developers must follow, with a sentence explaining each.",
    "Groups read the change log excerpt and identify the change that bypassed SCM, explaining the risks (no review, no trace, drift, possible reversion).",
    "Groups write a short SCM policy of four rules covering version control, protected branches, signed artifacts and handling emergency console changes.",
    "Two groups present their level assignments; the class resolves any disagreements by focusing on data and impact."
   ]
  },
  "discussion": [
   "Why might an organization choose a lower ASVS level for some applications even if it could afford a higher one?",
   "How does signing commits and build artifacts help in a supply chain incident?",
   "What should happen after an emergency change is made directly in the console?"
  ],
  "exit": [
   [
    "What are the primary defenses against SQL injection and cross-site scripting?",
    "Parameterized queries for SQL injection; context-aware output encoding for cross-site scripting, both supported by input validation."
   ],
   [
    "Which ASVS level fits a portal that stores customer payment details, and why?",
    "At least Level 2, recommended for applications handling sensitive data; Level 3 if it is critical or handles high-value transactions."
   ],
   [
    "Name two SCM controls that prevent unauthorized changes to infrastructure as code.",
    "Examples: protected branches with required reviews, signed commits and artifacts, deploying only through the pipeline, drift detection with alerts."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a summary table of ASVS levels with an example application for each and a list of SCM controls to choose from.",
   "Extend: Ask fast finishers to map three ASVS-style requirements to automated pipeline tests and describe how a quarterly report could show progress to leadership."
  ]
 },
 {
  "t": "Cloud software assurance and validation: functional and non-functional testing, SAST, DAST, IAST, SCA, abuse cases",
  "objectives": [
   "Students will be able to distinguish functional, non-functional and abuse case testing and give a security example of each.",
   "Students will be able to compare SAST, DAST, IAST and SCA by what they examine, when they run and what they find.",
   "Students will be able to place security tests appropriately in a CI/CD pipeline with release thresholds.",
   "Students will be able to explain the purpose of an SBOM and the role of a provider's penetration testing policy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board as 'before running' and 'while running'."
   ],
   [
    12,
    "Teach",
    "Explain functional, non-functional and abuse case testing. Build a comparison table of SAST, DAST, IAST and SCA (what it examines, box type, when it runs, strengths, limits). Introduce the SBOM, pipeline placement and provider testing policies."
   ],
   [
    18,
    "Activity",
    "Run the pipeline design card sort described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to address tool limits and human testing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you wanted to know whether a car is safe, what could you learn by reading its design documents, and what could you only learn by driving it?",
  "activity": {
   "title": "Build the assurance pipeline",
   "materials": "Printed cards for pipeline stages (code editor, pull request, build, staging deploy, pre-release, production) and for test types (SAST, DAST, IAST, SCA, SBOM generation, load test, resilience test, abuse case tests, human penetration test); printed finding cards describing problems such as a vulnerable library, a SQL injection on line 42, missing security headers, autoscaling failure; whiteboard or large paper.",
   "steps": [
    "In groups of three or four, students lay out the pipeline stage cards in order on their desk or paper.",
    "Groups place each test type card at the stage where it fits best and note whether it should block a release for critical findings.",
    "The teacher hands out finding cards; groups decide which test type would have caught each finding and at which stage.",
    "Groups write two abuse cases for a fictional invoice API and decide where in the pipeline they would run as tests.",
    "Each group photographs or redraws its pipeline on the whiteboard; the class compares placements and discusses where the provider's penetration testing policy limits what can be tested."
   ]
  },
  "discussion": [
   "Why do organizations still pay for human penetration testers when they have automated tools?",
   "How can a team keep a pipeline that produces many findings from becoming a list everyone ignores?",
   "What can a SaaS customer do to gain assurance when it cannot test the provider's platform itself?"
  ],
  "exit": [
   [
    "Which tool finds a known vulnerability in an open-source dependency, and what document helps locate affected services?",
    "SCA; the software bill of materials (SBOM)."
   ],
   [
    "Compare SAST and DAST in one sentence.",
    "SAST analyzes code without running it early in development (white box); DAST tests the running application from outside later in the lifecycle (black box)."
   ],
   [
    "Give an example of an abuse case for a file upload feature.",
    "For example, a user uploads an extremely large or malformed file, or a file disguised with a misleading extension, to test size limits and file type validation."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed comparison table of the four tools and pair struggling students with a peer for the card sort.",
   "Extend: Ask fast finishers to explain how IAST coverage depends on functional test coverage and to propose release-blocking thresholds that balance speed and risk."
  ]
 },
 {
  "t": "Using verified secure software: approved APIs, supply chain management, third-party and open-source components",
  "objectives": [
   "Students will be able to list the criteria used to review and approve a third-party API.",
   "Students will be able to explain how an SBOM and software composition analysis support rapid response to component vulnerabilities.",
   "Students will be able to distinguish typosquatting from dependency confusion and name controls that prevent each.",
   "Students will be able to recommend at least four controls that protect a CI/CD build pipeline as a production system."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to estimate how much of a typical web application is code the team wrote versus code from others. Collect guesses on the board, then explain that third-party components often make up most of an application, which is why supply chain security matters."
   ],
   [
    15,
    "Teach",
    "Walk through four areas: approved APIs (review criteria and catalog), vendor supply chain (SBOMs, attestations, contracts), the build pipeline (pin, curated repository, signatures, provenance, SSDF and SLSA as frameworks), and open source and containers (SCA, licenses, maintenance, signed images). Define typosquatting and dependency confusion and draw how each reaches a build."
   ],
   [
    15,
    "Activity",
    "Run the 'Recall drill' activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share how long their response took and which missing control slowed them down most. Connect each gap to a control from the lesson."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a sticky note or index card."
   ]
  ],
  "warmup": "If a widely used free library your company depends on were found to contain malicious code tonight, how would you find out which of your applications use it?",
  "activity": {
   "title": "Recall drill: is the bad package in our apps?",
   "materials": "Printed one-page SBOM excerpts for three fictional applications (the teacher creates them, listing component names and versions), a printed 'advisory' card naming a compromised package and version range, a printed list of two proposed third-party APIs with short descriptions, whiteboard.",
   "steps": [
    "Give each group the three SBOM excerpts and the advisory card. Ask them to identify which applications contain an affected version and which do not, and to note how long it took.",
    "Hand out a second card describing an organization with no SBOMs and builds that pull the latest versions from public registries. Ask groups to list what they would have to do to answer the same question there.",
    "Give groups the two proposed APIs. Using the review criteria from the lesson, they decide approve, approve with conditions, or reject, and write one reason for each.",
    "Each group writes on the whiteboard the three pipeline controls they would implement first and why."
   ]
  },
  "discussion": [
   "Is it fair to hold an organization accountable for a vulnerability in open-source code it did not write? Why or why not?",
   "Where should the line be between developer speed and the time it takes to approve a new API or package?"
  ],
  "exit": [
   [
    "Name three things you would review before approving a third-party API.",
    "Any three of: authentication method, encryption in transit, data sent and returned, rate limits, logging, provider security posture, contract terms, impact if it changes or fails."
   ],
   [
    "What is the difference between typosquatting and dependency confusion?",
    "Typosquatting relies on a look-alike name that a developer mistypes; dependency confusion uses the exact name of an internal package on a public registry so a build fetches it instead of the internal one."
   ],
   [
    "Why is an SBOM valuable during a supply chain incident?",
    "It inventories every component and version per application, so you can quickly determine which systems include the affected component."
   ]
  ],
  "differentiation": [
   "Support: Provide a glossary card with SBOM, SCA, provenance, typosquatting and dependency confusion, and let struggling students work the SBOM lookup step with a partner before tackling the API review.",
   "Extend: Ask fast finishers to sketch a pipeline diagram that marks where each control (curated repository, pinning, scanning, signing, provenance, admission policy for signed images) is enforced, and to identify one remaining gap."
  ]
 },
 {
  "t": "Specifics of cloud application architecture: WAF, XML gateways, API gateways, database activity monitoring, cryptography, sandboxing, app virtualization",
  "objectives": [
   "Students will be able to describe what each supplemental component (WAF, XML gateway, API gateway, DAM, sandbox, application virtualization) inspects or controls.",
   "Students will be able to explain why a WAF is a compensating control rather than a fix.",
   "Students will be able to select the most appropriate component for a given application security scenario.",
   "Students will be able to place these components correctly on a cloud application architecture diagram."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a simple three-tier diagram (users, web tier, API tier, database) on the projector and ask students where an attacker might try to get in and where an insider might misuse access."
   ],
   [
    15,
    "Teach",
    "Introduce each component with what it sees and what it misses: WAF (layer 7 patterns, compensating control), XML/JSON gateway (schema validation, XXE, transform, sign, strip fields), API gateway (authentication, quotas, rate limits, routing, logging), DAM (behavior inside the database), cryptography (TLS, field encryption, signing, managed keys), sandboxing and application virtualization (containment)."
   ],
   [
    15,
    "Activity",
    "Run the 'Place the guard' activity in pairs or small groups."
   ],
   [
    5,
    "Discuss",
    "Review placements as a class, focusing on disagreements, and discuss scenarios where two components overlap."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a card."
   ]
  ],
  "warmup": "If a partner with a valid API key started downloading far more data than usual, which security control in a typical web architecture would notice first, if any?",
  "activity": {
   "title": "Place the guard",
   "materials": "Whiteboard or large paper with a blank architecture diagram (internet, web front end, partner API, internal XML service, database), sticky notes labeled WAF, XML gateway, API gateway, DAM, TLS, field encryption, sandbox and app virtualization, printed scenario cards.",
   "steps": [
    "Groups place each labeled sticky note where that component belongs on the diagram and write one sentence on the note about what it inspects.",
    "The teacher reads scenario cards one at a time (for example: injection attempt in a search box, partner exceeding quota, oversized XML message, DBA reading payroll at midnight, suspicious attachment, legacy app conflicting with a new library). Groups point to the component that would handle it.",
    "For each scenario, groups also name one thing the chosen component would not catch.",
    "Groups compare diagrams with a neighboring group and resolve any differences."
   ]
  },
  "discussion": [
   "If budget allowed only two of these components for a public-facing API, which would you choose and why?",
   "Why might an organization keep a WAF in place even after fixing a vulnerability in its code?"
  ],
  "exit": [
   [
    "Which component validates messages against a schema and can strip sensitive fields before they leave?",
    "An XML gateway (or its JSON equivalent)."
   ],
   [
    "Why is a WAF called a compensating control?",
    "It blocks attack patterns in traffic but leaves the underlying code vulnerability in place."
   ],
   [
    "A compromised service account is running valid but unusual queries. Which component is designed to detect this?",
    "Database activity monitoring (DAM)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat card ('sees' and 'misses') for each component to use during the placement activity.",
   "Extend: Ask fast finishers to design layered controls for a public file-upload feature, combining at least four components, and explain the order in which a request passes through them."
  ]
 },
 {
  "t": "Identity and access management solutions: federated identity, identity providers, SSO, MFA, CASB and secrets management",
  "objectives": [
   "Students will be able to describe the federation flow between a user, an identity provider and a service provider.",
   "Students will be able to compare SAML 2.0, OAuth 2.0 and OpenID Connect by purpose and token format.",
   "Students will be able to classify authentication methods by factor type and identify phishing-resistant MFA.",
   "Students will be able to explain how a CASB and a secrets manager address shadow IT and leaked credentials."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how many separate passwords they used yesterday and what happens to those accounts when someone leaves a job. Record answers on the board."
   ],
   [
    15,
    "Teach",
    "Draw the federation flow (user, application, IdP, signed assertion). Compare SAML, OAuth and OIDC in a three-column table. Cover MFA factor types and phishing resistance. Explain CASB modes (proxy and API) and secrets management, including workload identities."
   ],
   [
    15,
    "Activity",
    "Run the 'Federation role-play' activity."
   ],
   [
    5,
    "Discuss",
    "Debrief the role-play: what happened when the IdP disabled the departing user, and what would happen if the IdP were compromised."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When an employee leaves a company that uses fifty cloud applications, how could IT be confident every one of their accounts is disabled the same day?",
  "activity": {
   "title": "Federation role-play",
   "materials": "Printed role cards (User, Identity Provider, three Service Providers, Attacker, Secrets Manager), index cards to act as signed tokens, a marker to 'sign' tokens, a printed list of authentication methods for sorting.",
   "steps": [
    "Assign roles. The User asks a Service Provider for access; the Service Provider redirects them to the IdP; the IdP checks two different factors and hands over a signed index card token naming the user; the Service Provider checks the signature and grants access.",
    "Repeat for the other two Service Providers to show single sign-on. Then the IdP 'disables' the user, and the class observes that new tokens can no longer be issued for any application.",
    "The Attacker tries to obtain a token by presenting only a stolen password. The class discusses which factor stopped them and how a phishing-resistant key would also defeat a fake login page.",
    "Pairs sort the printed list of authentication methods into know, have and are, and mark which are phishing-resistant. Finish by having a Service Provider request a database password from the Secrets Manager, which logs the request and notes when it will rotate."
   ]
  },
  "discussion": [
   "Single sign-on makes the identity provider a single point of failure and a prime target. Is that trade-off worth it? How would you protect the IdP?",
   "Why do you think hard-coded secrets in code repositories remain such a common cause of cloud breaches?"
  ],
  "exit": [
   [
    "In a federated login, which party issues the signed assertion and which party trusts it?",
    "The identity provider issues it; the service provider (relying party) trusts and verifies it."
   ],
   [
    "Which standard adds authentication on top of OAuth 2.0?",
    "OpenID Connect."
   ],
   [
    "Name one capability of a CASB and one capability of a secrets manager.",
    "CASB: discover shadow IT, enforce access or DLP policies, detect risky behavior, check configurations. Secrets manager: encrypted storage, access control and logging, automatic rotation, runtime delivery."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-drawn federation flow with blanks to fill in (user, IdP, service provider, assertion) and the know-have-are table partially completed.",
   "Extend: Ask fast finishers to explain how a workload identity would replace the grading system's stored database password, and what logs an investigator could use to see which workloads accessed the database."
  ]
 },
 {
  "t": "Building and implementing physical and logical infrastructure: hardware security (TPM, HSM), virtualization toolsets and guest OS installation",
  "objectives": [
   "Students will be able to distinguish a TPM from an HSM and state a use case for each.",
   "Students will be able to explain secure boot, measured boot and attestation in plain terms.",
   "Students will be able to list controls that secure virtualization management toolsets and BMCs.",
   "Students will be able to describe a golden image lifecycle from build to retirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if someone replaced a server's firmware with a malicious version, how would you ever know? Collect ideas."
   ],
   [
    15,
    "Teach",
    "Explain the TPM (secure boot, measured boot, attestation, sealed keys, vTPM) versus the HSM (many keys, tamper resistance, root keys for key services). Cover BIOS/UEFI and BMC hardening, securing virtualization management toolsets, and the golden image lifecycle with CIS Benchmarks."
   ],
   [
    15,
    "Activity",
    "Run the 'Golden image pipeline' activity."
   ],
   [
    5,
    "Discuss",
    "Groups present their pipelines and the class identifies the weakest step in each."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you were building one hundred new servers this week, would you rather configure each by hand or copy one master template? What could go wrong with each approach?",
  "activity": {
   "title": "Golden image pipeline",
   "materials": "Printed step cards (Start from vendor base image, Apply patches, Apply CIS Benchmark settings, Install security and logging agents, Scan for vulnerabilities, Sign image, Publish to catalog, Enforce launch policy, Rebuild on schedule, Retire old image), plus distractor cards (Let engineers add tools after launch, Download community image, Skip scan to save time), whiteboard, markers.",
   "steps": [
    "Groups arrange the step cards in the correct order and discard the distractors, writing one reason for each discarded card.",
    "Groups add a column next to each step naming who is responsible and what evidence an auditor could see (for example, a scan report or a signed image hash).",
    "The teacher reveals a scenario: a critical vulnerability is announced in the base OS. Groups mark which steps run again and how fast.",
    "Each group adds two controls for the virtualization management console that the pipeline depends on (for example, MFA and logging to an immutable store)."
   ]
  },
  "discussion": [
   "Why do you think firmware and BMC security are often overlooked compared with operating system patching?",
   "How does the shared responsibility model change who builds golden images in IaaS versus PaaS?"
  ],
  "exit": [
   [
    "Which component would you use to prove a host booted approved software: TPM or HSM?",
    "The TPM, through measured boot and attestation."
   ],
   [
    "Name two controls for a virtualization management console.",
    "Any two: patching, small admin group with MFA, role-based permissions, isolated management network, logging of all actions."
   ],
   [
    "Why must golden images be rebuilt regularly?",
    "New vulnerabilities are disclosed after the image is built, so old images become unpatched; rebuilding keeps new instances current."
   ]
  ],
  "differentiation": [
   "Support: Provide a side-by-side TPM versus HSM comparison card and pre-group the image pipeline cards into three phases (build, verify, enforce) for students who need structure.",
   "Extend: Ask fast finishers to write a short policy statement that blocks unapproved images and explain how they would handle a legitimate urgent exception."
  ]
 },
 {
  "t": "Operating and maintaining physical and logical infrastructure: access controls for local and remote access, secure network configuration (VLAN, TLS, DHCP, DNSSEC, VPN)",
  "objectives": [
   "Students will be able to compare bastion hosts, managed session services and zero trust proxies for remote administration.",
   "Students will be able to describe the controls that should surround privileged remote access (MFA, just-in-time, PAM, session recording).",
   "Students will be able to explain the security purpose and limits of VLANs, TLS, DHCP protections, DNSSEC and VPNs.",
   "Students will be able to identify ongoing maintenance tasks that prevent configuration drift."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a short fictional log excerpt showing repeated failed SSH logins from many addresses and ask students what it tells them about the server."
   ],
   [
    15,
    "Teach",
    "Contrast local access (provider responsibility) with remote access. Draw three remote access patterns. Cover PAM, MFA and just-in-time access. Then walk through VLAN, TLS, DHCP and rogue DHCP, DNSSEC (integrity, not confidentiality) and VPN types. Close with maintenance tasks."
   ],
   [
    15,
    "Activity",
    "Run the 'Fix the network' activity."
   ],
   [
    5,
    "Discuss",
    "Groups share their top three fixes and justify the order."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why would a server that is never attacked successfully still be a problem if its SSH port shows thousands of failed logins every day?",
  "activity": {
   "title": "Fix the network",
   "materials": "Printed one-page 'environment description' for a fictional company listing issues (public RDP and SSH, shared admin passwords, a flat network with no segmentation, an expiring certificate, no DHCP snooping, unsigned DNS zone, old TLS versions enabled), sticky notes, whiteboard.",
   "steps": [
    "Groups read the description and write each problem on a sticky note.",
    "For each problem, they write the matching control from the lesson on a second note (for example, managed session service, PAM, VLAN or subnet segmentation, certificate renewal, DHCP snooping, DNSSEC, disable old TLS).",
    "Groups rank the fixes by risk and effort on a two-axis grid on the whiteboard.",
    "Each group writes one maintenance task that would stop the problem from returning."
   ]
  },
  "discussion": [
   "What are the trade-offs between a bastion host and a provider-managed session service?",
   "Why might DNSSEC adoption matter even though it does not encrypt anything?"
  ],
  "exit": [
   [
    "What security property does DNSSEC provide, and which does it not provide?",
    "It provides integrity and authenticity of DNS answers; it does not provide confidentiality."
   ],
   [
    "Name three controls that should surround privileged remote access.",
    "Any three: MFA, just-in-time access, approval workflow, PAM credential brokering, session recording, removal of standing access."
   ],
   [
    "What does DHCP snooping prevent?",
    "Rogue DHCP servers handing out malicious gateway or DNS settings, by allowing DHCP responses only from trusted ports."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching worksheet that pairs each network service (VLAN, TLS, DHCP, DNSSEC, VPN) with its purpose and one threat, for students to complete before the group activity.",
   "Extend: Ask fast finishers to design a just-in-time access workflow for production servers, including who approves, how long access lasts, what is recorded and how access is revoked."
  ]
 },
 {
  "t": "Hardening, patch management and infrastructure as code",
  "objectives": [
   "Students will be able to list common hardening steps and explain the role of baselines such as the CIS Benchmarks.",
   "Students will be able to sequence the patch management process and describe how to handle a patch that cannot be applied.",
   "Students will be able to explain who patches what in IaaS, PaaS and SaaS.",
   "Students will be able to explain how IaC, policy as code and drift detection improve security."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students why attackers so often succeed with vulnerabilities that already have patches available. Record reasons on the board."
   ],
   [
    15,
    "Teach",
    "Cover hardening steps and baselines, including cloud account-level settings. Walk through the patch process (inventory, monitor, prioritize, test, deploy, verify, document, exceptions). Show the shared responsibility split. Explain IaC, template scanning, policy as code, drift and immutable infrastructure."
   ],
   [
    15,
    "Activity",
    "Run the 'Review the template' activity."
   ],
   [
    5,
    "Discuss",
    "Groups share findings; discuss why catching the issue in a pull request is better than finding it in production."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If your test environment no longer matches production, what problems could that cause during patching?",
  "activity": {
   "title": "Review the template",
   "materials": "A printed or projected short, simplified IaC-style template written by the teacher (plain text describing a storage bucket with public access, a security group allowing a database port from anywhere, an unencrypted volume and a VM using an unapproved image), a printed patch-scenario card, red pens.",
   "steps": [
    "In pairs, students act as pull request reviewers and circle every insecure setting in the template, writing the secure alternative next to it.",
    "Pairs write one policy-as-code rule in plain English (for example, 'block any security group that allows the database port from 0.0.0.0/0') for each issue found.",
    "The teacher hands out the patch-scenario card (a critical patch that breaks a legacy app). Pairs write the exception record: risk, compensating controls, owner and remediation date.",
    "Pairs swap with another pair and check each other's work for anything missed."
   ]
  },
  "discussion": [
   "Is immutable infrastructure realistic for every workload? Which systems might be hard to treat this way?",
   "Who should have authority to approve a patch exception, and why?"
  ],
  "exit": [
   [
    "What should happen when a critical patch cannot be applied?",
    "A documented exception with compensating controls, an owner and a remediation date."
   ],
   [
    "In PaaS, who patches the runtime or database engine?",
    "The cloud provider."
   ],
   [
    "What is configuration drift?",
    "Differences between the running environment and its approved baseline or code, usually caused by manual changes."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a checklist of five insecure patterns to look for in the template, and a fill-in-the-blank patch process diagram.",
   "Extend: Ask fast finishers to describe how they would design drift detection and automatic remediation, and when auto-reverting a change could itself cause harm."
  ]
 },
 {
  "t": "Availability, clustering, performance and capacity monitoring, and backup and restore of the host and guest OS",
  "objectives": [
   "Students will be able to explain how clustering, HA and maintenance mode keep workloads available.",
   "Students will be able to identify the metrics, quotas and budgets that capacity monitoring should track in the cloud.",
   "Students will be able to apply the 3-2-1 rule, RPO and RTO to design a backup approach.",
   "Students will be able to justify why restore testing and backup isolation are essential."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to describe a time a backup or spare (phone backup, spare key, spare tire) failed them when needed. Link it to restore testing."
   ],
   [
    15,
    "Teach",
    "Cover clustering (HA, live migration, distributed scheduling, maintenance mode, spare capacity), customer equivalents (load balancers, auto scaling, availability zones), performance and capacity monitoring including quotas and budgets, and backup practice (snapshots, image and application-aware backups, 3-2-1, encryption, immutability, RPO, RTO, restore testing)."
   ],
   [
    15,
    "Activity",
    "Run the 'Backup plan challenge' activity."
   ],
   [
    5,
    "Discuss",
    "Compare group plans and discuss which would survive a ransomware attack that compromised production admin credentials."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone says it backs up automatically every night. How confident are you that you could restore everything on a new phone tomorrow? What would make you more confident?",
  "activity": {
   "title": "Backup plan challenge",
   "materials": "Printed system cards for three fictional workloads, each with an RPO, RTO and data sensitivity (for example, order database: RPO 15 minutes, RTO 2 hours; marketing site: RPO 24 hours, RTO 1 day; file share: RPO 4 hours, RTO 8 hours), a printed list of backup options, whiteboard.",
   "steps": [
    "Groups choose a backup method and frequency for each workload that meets its RPO, and a restore approach that meets its RTO.",
    "Groups apply the 3-2-1 rule to each plan, stating where each copy lives and how backups are protected from deletion.",
    "The teacher announces a scenario: an attacker has full admin access to the production account. Groups explain which copies survive and why.",
    "Each group writes a restore test schedule, including what will be measured and who signs off."
   ]
  },
  "discussion": [
   "Why might an organization skip restore tests even though everyone agrees they are important?",
   "How should a team balance the cost of spare cluster capacity against the risk of an outage?"
  ],
  "exit": [
   [
    "What does the 3-2-1 rule mean?",
    "Three copies of data, on two different media or services, with one copy off-site or isolated."
   ],
   [
    "Which objective determines backup frequency?",
    "The recovery point objective (RPO)."
   ],
   [
    "Why are service quotas a capacity concern in the cloud?",
    "Reaching a quota can block scaling or deployments and cause an outage."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked example for one workload showing how its RPO and RTO translate into backup frequency and restore method before groups tackle the others.",
   "Extend: Ask fast finishers to add monitoring alerts to their plan that would warn of an approaching quota, a failed backup job, or unusual CPU patterns suggesting cryptomining."
  ]
 },
 {
  "t": "Implementing operational controls and standards: ITIL and ISO/IEC 20000-1 processes (change, configuration, incident, problem, release, deployment)",
  "objectives": [
   "Students will be able to state the purpose of change, configuration, incident, problem, and release and deployment management.",
   "Students will be able to distinguish incident management from problem management and define a known error.",
   "Students will be able to classify changes as standard, normal or emergency and describe how each is approved.",
   "Students will be able to explain the difference between ITIL guidance and the ISO/IEC 20000-1 standard and how cloud providers share these processes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the opening scenario aloud (repeated certificate outages) and ask students what is going wrong beyond the expired certificates."
   ],
   [
    15,
    "Teach",
    "Introduce ITSM, ITIL versus ISO/IEC 20000-1. Explain each core process with a one-line purpose: change (types of change), configuration (CIs, CMDB), release and deployment, incident versus problem, known error. Close with how pipelines automate change control and how processes are shared with cloud providers."
   ],
   [
    15,
    "Activity",
    "Run the 'Which process owns it?' card sort."
   ],
   [
    5,
    "Discuss",
    "Review contested cards and discuss how a single event can touch several processes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If the same outage keeps happening and the team fixes it quickly every time, is the team doing a good job? Why or why not?",
  "activity": {
   "title": "Which process owns it?",
   "materials": "Printed cards each describing a situation (for example: restore email after a server crash; investigate why email crashed four times; approve a firewall rule change; record that a certificate depends on a load balancer; bundle three fixes into Friday's update with a rollback plan; apply an urgent hotfix during an outage; add a routine pre-approved scaling action), column headers for Change, Configuration, Release and Deployment, Incident, Problem, sticky notes.",
   "steps": [
    "Small groups sort each card under the process that owns it.",
    "For any card involving change, groups also label it standard, normal or emergency.",
    "Groups pick one card and trace how it would flow through two or more processes (for example, incident leads to problem, which leads to change).",
    "Groups write a one-sentence security role for each process on a sticky note and add it to the column."
   ]
  },
  "discussion": [
   "How can automated pipelines satisfy change management without slowing teams down?",
   "When a cloud provider has an outage, which of these processes are yours and which are the provider's?"
  ],
  "exit": [
   [
    "Which process aims to prevent incidents from recurring?",
    "Problem management."
   ],
   [
    "What two things must still happen with an emergency change after it is implemented?",
    "It must be documented and reviewed."
   ],
   [
    "How does a CMDB support change management?",
    "It shows configuration items and their relationships so the impact of a change can be assessed."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page process summary with each process's goal in one sentence and an example, for students to use during the card sort.",
   "Extend: Ask fast finishers to map each step of a pull-request-based deployment pipeline to the change and release management activities it replaces."
  ]
 },
 {
  "t": "Supporting digital forensics: forensic data collection methodologies, evidence management, chain of custody",
  "objectives": [
   "Students will be able to sequence the forensic process and the order of volatility.",
   "Students will be able to describe the correct first steps for preserving evidence from a compromised IaaS instance.",
   "Students will be able to explain how the cloud service model limits evidence collection and why contracts matter.",
   "Students will be able to complete a chain-of-custody record and explain the role of hashing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the opening scenario and ask students to vote: terminate the instance or not? Ask two students to defend each side."
   ],
   [
    15,
    "Teach",
    "Cover the forensic sequence and ISO/IEC 27037, the order of volatility, practical IaaS steps (isolate, capture memory, snapshot, export logs, hash, tag), service model limits and multitenancy, chain of custody contents, evidence storage, legal counsel and legal hold, and preparation."
   ],
   [
    15,
    "Activity",
    "Run the 'Chain of custody relay' activity."
   ],
   [
    5,
    "Discuss",
    "Review where chains broke during the relay and what an opposing lawyer could argue."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you were a defense lawyer, what questions would you ask to cast doubt on a screenshot presented as evidence?",
  "activity": {
   "title": "Chain of custody relay",
   "materials": "Envelopes as 'evidence items' each labeled with an item ID and a printed fake hash value, printed blank chain-of-custody forms (item ID, description, hash, date/time, released by, received by, purpose), printed order-of-volatility cards, a timer.",
   "steps": [
    "Groups first arrange the order-of-volatility cards (registers and cache, memory, processes and connections, temporary files, disk, archived logs) and the forensic process steps in order.",
    "Each group receives an evidence envelope and passes it through four roles (collector, transporter, storage custodian, analyst). Each hand-off must be recorded on the form, and the analyst must check that the hash matches.",
    "The teacher secretly instructs one student in some groups to skip a signature or alter the hash value on the envelope.",
    "Groups audit another group's form and identify any gaps or mismatches, then explain whether the evidence would still be trustworthy."
   ]
  },
  "discussion": [
   "How should an organization balance the need to restore service quickly with the need to preserve evidence?",
   "What should a cloud customer ask for in a contract to support future investigations?"
  ],
  "exit": [
   [
    "What is the first action for a compromised IaaS instance: terminate, reboot or isolate?",
    "Isolate it (for example with a restrictive security group) so volatile evidence is preserved."
   ],
   [
    "What does a hash recorded at acquisition prove?",
    "That the evidence has not been altered, when the hash is recomputed later and matches."
   ],
   [
    "Name three fields on a chain-of-custody record.",
    "Any three: item ID, description, hash, date and time, person releasing, person receiving, purpose, storage location."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-filled first row of the chain-of-custody form as a model and a labeled diagram of the order of volatility.",
   "Extend: Ask fast finishers to write a short preparation checklist for forensic readiness in a cloud account, covering logging, retention, agents, isolation groups and a forensic account."
  ]
 },
 {
  "t": "Communicating with relevant parties: customers, vendors, partners, regulators and other stakeholders",
  "objectives": [
   "Students will be able to identify the main stakeholder groups in cloud operations and what information each needs.",
   "Students will be able to explain why communication authority, contracts and legal deadlines govern incident messaging.",
   "Students will be able to describe what a communication plan contains.",
   "Students will be able to tailor an incident message for at least two different audiences."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to recall a time a company told them about an outage or breach. What did the message do well or badly?"
   ],
   [
    15,
    "Teach",
    "Walk through each stakeholder group: customers (SLAs, status pages, templates), vendors and providers (notices someone must act on, contractual notification), partners (escalation contacts), regulators (breach deadlines, GDPR example), other stakeholders (board, employees, law enforcement, insurers, media). Emphasize authority, consistency and need-to-know, and the elements of a communication plan."
   ],
   [
    15,
    "Activity",
    "Run the 'Same incident, four audiences' activity."
   ],
   [
    5,
    "Discuss",
    "Groups read their board and customer messages aloud; the class critiques tone, accuracy and authority."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a reporter called you directly about a security incident at your workplace, what should you say and to whom should you refer them?",
  "activity": {
   "title": "Same incident, four audiences",
   "materials": "A printed one-page incident fact sheet for a fictional SaaS company (what happened, which customer, what data, what is still unknown), printed audience cards (affected customer, board, all employees, media), a blank communication plan grid (stakeholder, message, sender, channel, timing), whiteboard.",
   "steps": [
    "Each group fills in the communication plan grid for at least six stakeholders, including the regulator, the cloud provider and the insurer.",
    "Each group draws two audience cards and writes a short message (under 120 words) for each, using only facts on the sheet and stating when the next update will come.",
    "Groups swap messages and check for over-sharing, speculation, technical jargon for non-technical audiences and missing next steps.",
    "The class lists on the whiteboard which roles in the company have authority to approve each message."
   ]
  },
  "discussion": [
   "Is it better to notify customers quickly with incomplete information or wait until facts are confirmed? Where is the balance?",
   "How can an organization make sure provider change notices are not lost in a shared inbox?"
  ],
  "exit": [
   [
    "Who should make public statements about a security incident?",
    "The designated communications and legal functions, not individual technical staff."
   ],
   [
    "Name three elements of a communication plan.",
    "Any three: stakeholder list, message content or templates, sender or authority, channel, timing, current contact lists."
   ],
   [
    "What does the board need after an incident?",
    "A concise summary of business impact, risk, actions taken and decisions required."
   ]
  ],
  "differentiation": [
   "Support: Provide a sentence-starter template for each audience message (what happened, what it means for you, what we are doing, what you should do, next update) for students who need structure.",
   "Extend: Ask fast finishers to add regulator and partner notifications to their plan and identify which items require legal review before release."
  ]
 },
 {
  "t": "Security operations: SOC, intelligent monitoring of security controls, log capture and analysis (SIEM), incident management and vulnerability assessments",
  "objectives": [
   "Students will be able to describe the role of a SOC and compare in-house, outsourced and hybrid models.",
   "Students will be able to explain what a SIEM and SOAR do and why alert tuning matters.",
   "Students will be able to sequence the NIST incident lifecycle and choose appropriate cloud containment actions.",
   "Students will be able to prioritize vulnerability findings using severity, exploitability and exposure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a fictional alert queue on the projector with many repetitive alerts and one 'logging disabled' alert. Ask students which they would open first and why."
   ],
   [
    15,
    "Teach",
    "Cover SOC models and tiers; intelligent monitoring of controls and CSPM; SIEM functions (collect, normalize, correlate, alert, retain) and SOAR playbooks; alert fatigue and tuning; the NIST lifecycle with cloud containment examples; vulnerability assessment types and prioritization; provider testing policies and SaaS limits."
   ],
   [
    15,
    "Activity",
    "Run the 'Triage the queue' activity."
   ],
   [
    5,
    "Discuss",
    "Groups explain their top three alerts and the containment steps they chose; discuss which rules they would tune."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you received four hundred alerts in one shift, how would you decide which ten to look at first?",
  "activity": {
   "title": "Triage the queue",
   "materials": "Printed alert cards for a fictional company (for example: backup job ran, logging disabled in production, new admin user created, failed login from known office, access key used from anonymizing network, security agent stopped reporting, CPU spike on many instances), a printed list of 10 vulnerability findings with severity, exposure and exploit notes, sticky notes, whiteboard.",
   "steps": [
    "Groups sort alert cards into high, medium, low and tune-or-suppress piles, writing a one-line reason for each high card.",
    "For the top two alerts, groups write the NIST lifecycle phase they are in and the first containment action they would take in the cloud.",
    "Groups rank the 10 vulnerability findings and pick the top three to fix, justifying each with severity, exploitability and exposure.",
    "Groups propose one SOAR playbook (trigger, automated actions, when a human is paged) and post it on the whiteboard."
   ]
  },
  "discussion": [
   "Which response actions are safe to fully automate, and which should always require a human decision?",
   "What are the advantages and risks of outsourcing a SOC to a managed security service provider?"
  ],
  "exit": [
   [
    "Name the four phases of the NIST incident response lifecycle.",
    "Preparation; detection and analysis; containment, eradication and recovery; post-incident activity."
   ],
   [
    "What is alert fatigue and how is it reduced?",
    "Desensitization from too many alerts, especially false positives; reduced by tuning thresholds, adding context, suppressing duplicates and retiring useless rules while keeping high-value detections."
   ],
   [
    "Why is an alert that audit logging was disabled high priority?",
    "Attackers often disable logging to hide activity, and it removes visibility; it signals possible compromise and a broken control."
   ]
  ],
  "differentiation": [
   "Support: Give students a triage checklist (Is it a control being disabled? Is a privileged identity involved? Is the source unusual? Is sensitive data touched?) to apply to each alert card.",
   "Extend: Ask fast finishers to write the correlation logic, in plain English, for a SIEM rule that detects a new access key followed by bulk storage listing from an unfamiliar network within 30 minutes."
  ]
 },
 {
  "t": "Using AI and ML in security operations: anomaly detection, automation and their limits",
  "objectives": [
   "Students will be able to explain how anomaly detection and UEBA build a baseline and flag deviations, and contrast this with signature-based detection.",
   "Students will be able to identify causes of false positives and false negatives in ML-based detection, including slow attackers and contaminated baselines.",
   "Students will be able to decide which automated response actions should run automatically and which require human approval.",
   "Students will be able to describe risks introduced by security AI, such as prompt injection, training data poisoning and data leakage, and a control for each."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers. Write 'what AI is good at' and 'where AI fails' as two columns on the board and sort the answers into them."
   ],
   [
    12,
    "Teach",
    "Explain baselines and anomaly scores using a simple drawing of one user's normal sign-in times with an outlier. Contrast signature and anomaly detection. Introduce UEBA, generative assistants and SOAR. Then cover the limits: false positives from legitimate change, false negatives from slow attackers, dirty baselines, confident errors and the AI attack surface. Close with human in the loop."
   ],
   [
    18,
    "Activity",
    "Run the 'Approve or automate' card sort described below. Circulate and ask each group to justify their placement of the two hardest cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions. Push students to name who is accountable when an automated action causes an outage."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "Your bank once blocked your card while you were traveling, even though every purchase was yours. Was the bank's system working correctly or not, and what does that tell you about automated detection?",
  "activity": {
   "title": "Approve or automate",
   "materials": "Printed cards (one set per group of three or four), whiteboard or sheet of paper divided into three zones labeled 'Run automatically', 'Human approves first' and 'Do not use AI here', markers.",
   "steps": [
    "Give each group a set of about 12 cards, each describing an AI or automation action, for example: tag a resource as suspicious, open a ticket, summarize an alert for the analyst, force a password reset, disable a long-lived access key, delete a storage bucket, isolate a production database server, send full incident logs to a public chatbot, write a detection query, email a customer about a breach.",
    "Groups place each card in one of the three zones and write a one-line reason on the back.",
    "Hand each group one 'twist' card, such as 'the alert was triggered by text an attacker can control' or 'the baseline was trained during an undetected compromise'. Groups decide which cards must move and why.",
    "Each group presents its two most debated cards. The teacher connects the reasoning to reversibility, impact, accountability and the AI attack surface."
   ]
  },
  "discussion": [
   "If an automated playbook shuts down a production service because of a false positive, who should be accountable, and what should change afterward?",
   "How would you know whether a security ML model is getting better or worse over time? What would you measure?",
   "Should incident data ever be sent to an external AI service? Under what conditions?"
  ],
  "exit": [
   [
    "Why can anomaly detection catch attacks that signature-based detection misses?",
    "It flags behavior that is unusual for the entity compared with its baseline, so it does not need a known pattern or signature."
   ],
   [
    "Give one reason an ML detection tool might miss a real attack.",
    "The attacker moves slowly within normal patterns, or the baseline was trained on data that already contained the attacker's activity."
   ],
   [
    "Which should require human approval: tagging a resource or deleting a storage bucket? Why?",
    "Deleting the bucket, because it is high impact and hard to reverse; tagging is low impact and can safely run automatically."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column reference sheet listing 'reversible, low impact' and 'destructive, high impact' examples before the card sort, and pair them with a peer who has operations experience.",
   "Extend: Ask fast finishers to draft a one-page governance checklist for a security AI tool, covering validation, accuracy metrics, permissions, logging, data handling and named accountability."
  ]
 },
 {
  "t": "Legal requirements and unique risks in the cloud: conflicting international law, eDiscovery (ISO/IEC 27050, CSA guidance) and forensic requirements",
  "objectives": [
   "Students will be able to explain how conflicting international laws, data localization and export controls create risk for cloud data.",
   "Students will be able to describe the eDiscovery process, the role of a legal hold and the purpose of ISO/IEC 27050.",
   "Students will be able to identify cloud-specific obstacles to eDiscovery and forensics and contractual measures that address them.",
   "Students will be able to distinguish criminal and civil law and explain the duty of care in a cloud data context."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and take a quick show of hands, then ask two students to explain their reasoning."
   ],
   [
    12,
    "Teach",
    "Draw a world map sketch with three boxes: customer, provider headquarters and data center, each in a different country. Use arrows to show which laws reach the data. Introduce localization, export controls, criminal versus civil law and the duty of care. Then walk through the eDiscovery steps, legal hold, ISO/IEC 27050 and the forensic chain of custody."
   ],
   [
    18,
    "Activity",
    "Run the 'Lawsuit drill' role-play described below. Keep time for each phase and prompt groups with questions when they stall."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, linking answers to contract terms students can name."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "If a company stores your photos in a data center in Ireland but the company is based in another country, whose courts can order it to hand them over? Vote: Ireland only, the other country only, or possibly both.",
  "activity": {
   "title": "Lawsuit drill",
   "materials": "Printed role cards (general counsel, cloud administrator, provider account manager, regulator), a printed one-page scenario describing a company's data spread across three cloud services in different countries, whiteboard, sticky notes.",
   "steps": [
    "Form groups of four and assign each student a role card. Hand out the scenario: a lawsuit has just been threatened and a foreign authority has requested customer records.",
    "Phase 1 (6 minutes): the group lists, on sticky notes, every location where relevant data may live and which laws could apply to each.",
    "Phase 2 (6 minutes): the general counsel and administrator agree on the first three preservation and collection actions; the provider account manager states what the contract allows or does not allow; the regulator asks one hard question about data location or government requests.",
    "Phase 3 (6 minutes): each group writes three contract clauses they wish they had negotiated in advance and posts them on the board. The teacher groups similar clauses and names the underlying concepts (legal hold, export formats, notification of government requests, customer-held keys, forensic cooperation)."
   ]
  },
  "discussion": [
   "Is it ever reasonable for a provider to refuse to tell a customer about a government request for its data? What should the contract say?",
   "How does customer-held encryption change the outcome when laws conflict, and what new risks does it create for the customer?",
   "Why might a court be skeptical of evidence collected from the cloud without documentation, even if the content is accurate?"
  ],
  "exit": [
   [
    "Give one way a customer can reduce the risk of conflicting international laws reaching its cloud data.",
    "Examples: choose and restrict storage regions, negotiate terms on government requests and notification, or encrypt data with keys the customer controls."
   ],
   [
    "What does a legal hold do, and when should it start?",
    "It suspends normal deletion so relevant information is preserved, starting as soon as litigation is reasonably anticipated."
   ],
   [
    "Why do forensic investigations in the cloud depend on planning before an incident?",
    "The customer must already have logging enabled and know what it can collect itself, and provider cooperation must be agreed in the contract because multitenancy and jurisdiction limit what the provider will release."
   ]
  ],
  "differentiation": [
   "Support: Provide a glossary card with jurisdiction, data localization, legal hold, chain of custody and duty of care defined in one sentence each, and let struggling students take the cloud administrator role, which is the most concrete.",
   "Extend: Ask fast finishers to write a short readiness checklist mapping each eDiscovery step to a capability they would verify in a SaaS provider before signing."
  ]
 },
 {
  "t": "Privacy issues: contractual vs regulated private data, country-specific laws (GDPR, HIPAA, GLBA), jurisdictional differences and privacy impact assessments",
  "objectives": [
   "Students will be able to distinguish contractual from regulated private data and explain why the distinction changes consequences.",
   "Students will be able to match the GDPR, HIPAA and GLBA to the data and organizations they cover and identify the controller and processor in a cloud scenario.",
   "Students will be able to explain how jurisdictional differences affect cloud data transfers, including the role of adequacy decisions and standard contractual clauses.",
   "Students will be able to outline the contents of a privacy impact assessment for a cloud service."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question. Collect answers and list the kinds of personal data students name on the board."
   ],
   [
    12,
    "Teach",
    "Contrast contractual and regulated data using the board list. Introduce PII, PHI and personal data. Cover GDPR scope, controller and processor, principles, rights and transfers; then the US sector model with HIPAA and GLBA. Finish with the PIA and DPIA and what goes into one."
   ],
   [
    18,
    "Activity",
    "Run the 'Which law, who is who' scenario stations described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on accountability and jurisdiction."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on index cards."
   ]
  ],
  "warmup": "List three apps you used this week. For each, what personal data about you does it hold, and do you know which country stores it?",
  "activity": {
   "title": "Which law, who is who",
   "materials": "Six printed scenario cards placed at stations around the room, a printed answer grid per student (columns: data type, contractual or regulated, applicable law, controller, processor, one PIA question), pens.",
   "steps": [
    "Prepare six short scenarios, for example: a US hospital using cloud storage for X-ray images; a Brazilian startup selling to French customers; a US bank using a SaaS customer service tool; an online shop storing card numbers; a Canadian charity using a US email service; a Japanese retailer analyzing loyalty data.",
    "Pairs rotate through the stations, spending about two and a half minutes at each and filling one row of the grid.",
    "At each station they also write one question they would ask in a privacy impact assessment for that scenario.",
    "Debrief by reviewing the two scenarios with the most disagreement, highlighting that card data under PCI DSS is contractual and that the customer remains controller in every case."
   ]
  },
  "discussion": [
   "Why might the United States have chosen a sector-based approach to privacy while the EU chose a comprehensive one? What are the trade-offs for a cloud customer?",
   "If a cloud provider's support engineers in another country can access data remotely, is that a data transfer? Why does it matter?",
   "What should happen if a privacy impact assessment finds a risk that cannot be reduced to an acceptable level?"
  ],
  "exit": [
   [
    "Give an example of contractual private data and one of regulated private data.",
    "Contractual: card data protected under PCI DSS or data covered by a customer agreement. Regulated: PHI under HIPAA or personal data under the GDPR."
   ],
   [
    "A US clinic stores patient records in a SaaS tool. Who is the controller, and what agreement must the provider sign?",
    "The clinic is the controller (and covered entity); the provider is the processor and business associate and must sign a business associate agreement."
   ],
   [
    "Name three things a PIA for a cloud service should describe.",
    "Examples: what data is collected and why, data flows and storage locations, access, retention, subprocessors, risks to individuals and mitigating measures."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page law summary card (GDPR, HIPAA, GLBA, PCI DSS) with who it covers and enforcement type, to use during the station activity.",
   "Extend: Ask fast finishers to draft a short DPIA outline for a high-risk scenario, such as a cloud AI tool that analyzes employee messages, and identify which GDPR principles are most at risk."
  ]
 },
 {
  "t": "Audit process, methodologies and adaptations for cloud: internal vs external audit, assurance challenges of virtualization, SOC reports, gap analysis, audit planning",
  "objectives": [
   "Students will be able to compare internal and external audit in terms of independence, reporting line and who relies on the results.",
   "Students will be able to select the appropriate SOC report (SOC 1, SOC 2, SOC 3; Type I or Type II) for a given assurance need.",
   "Students will be able to explain why virtualization changes audit methods and identify the CUECs a customer must operate.",
   "Students will be able to describe the purpose of a gap analysis and the elements of an audit plan for a cloud environment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and gather answers about how students decide to trust a restaurant, mechanic or website they cannot inspect."
   ],
   [
    12,
    "Teach",
    "Explain internal versus external audit and the right to audit. Draw a quick table of SOC 1, SOC 2 and SOC 3 against audience and detail, then add a Type I versus Type II timeline. Explain virtualization challenges and CUECs. Close with gap analysis and the elements of an audit plan."
   ],
   [
    18,
    "Activity",
    "Run the 'Read the report' excerpt analysis described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, emphasizing what remains the customer's responsibility."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "You cannot inspect a restaurant's kitchen before you eat there. What evidence do you rely on instead, and who produced it?",
  "activity": {
   "title": "Read the report",
   "materials": "A teacher-made, fictional two-page SOC 2 Type II excerpt (scope statement, report period, list of in-scope services, a carved-out subservice provider, one exception, a CUEC list), printed one per pair; highlighters; whiteboard.",
   "steps": [
    "Pairs receive the fictional excerpt and a list of five questions: Is the period current? Which trust services criteria are covered? Is the service we use in scope? What is carved out? What exception was found?",
    "Pairs highlight the evidence for each answer in the excerpt and write their answers in the margin.",
    "Each pair then picks three CUECs from the list and writes which team in their own (imaginary) company would own each one.",
    "The teacher leads a whole-class review, recording on the board the follow-up actions a customer should take, such as requesting a bridge letter or the subservice provider's own report."
   ]
  },
  "discussion": [
   "Why might regulators accept a provider's third-party report instead of insisting that every customer audit the provider?",
   "How would you audit a control on a server that existed for only ten minutes?",
   "When is a customer right to insist on a contractual right to audit despite the provider's reports?"
  ],
  "exit": [
   [
    "Which SOC report would you request to evaluate a provider's security controls over the past year?",
    "A SOC 2 Type II report covering a recent period and the services you use."
   ],
   [
    "What is the difference between internal and external audit?",
    "Internal audit is the organization's own function reporting to the board or audit committee; external audit is performed by an independent third party whose opinion outsiders rely on."
   ],
   [
    "Name two elements of an audit plan for a cloud environment.",
    "Examples: objectives, scope (services, regions, period and provider versus customer parts), criteria, methods, evidence, roles and schedule."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a SOC comparison card (report, audience, detail, Type I versus Type II) and pre-highlight the scope statement in their excerpt.",
   "Extend: Ask fast finishers to write a one-paragraph audit plan scope statement for a company running workloads in two cloud regions, stating which controls will rely on provider reports and which will be tested directly."
  ]
 },
 {
  "t": "Implications of cloud for enterprise risk management: data owner/controller vs custodian/processor, regulatory transparency, risk treatment",
  "objectives": [
   "Students will be able to distinguish the data owner/controller from the custodian/processor and assign these roles in a cloud scenario.",
   "Students will be able to explain why accountability cannot be transferred to a cloud provider, even when tasks and financial risk are.",
   "Students will be able to describe what regulatory transparency requires and how providers and customers support it.",
   "Students will be able to choose among mitigation, transfer, avoidance and acceptance for cloud risks and identify who should approve residual risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up statement aloud and ask students to stand on one side of the room if they agree and the other if they disagree. Ask one person from each side to explain."
   ],
   [
    12,
    "Teach",
    "Define ERM. Draw two columns, owner/controller and custodian/processor, and list duties under each. Explain delegation of tasks versus accountability. Cover regulatory transparency with examples of provider and customer evidence. Present the four treatments with cloud examples and define residual risk and risk appetite."
   ],
   [
    18,
    "Activity",
    "Run the 'Risk register workshop' described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, returning to the warm-up statement."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on index cards."
   ]
  ],
  "warmup": "Agree or disagree: 'If our cloud provider gets breached, it is their problem, not ours.'",
  "activity": {
   "title": "Risk register workshop",
   "materials": "A printed blank risk register template per group (columns: risk, owner, treatment, controls or mechanism, residual rating, approver, review date), six printed risk cards, markers, whiteboard.",
   "steps": [
    "Form groups of three or four. Give each group six risk cards for a fictional company moving HR records to SaaS, for example: provider outage, misconfigured sharing settings, provider subprocessor in an unexpected country, provider bankruptcy, regulator inquiry, insider at the provider.",
    "Groups fill one register row per card, choosing a treatment (mitigate, transfer, avoid or accept) and naming a realistic approver.",
    "For at least one risk, groups must combine two treatments, such as mitigation plus transfer, and state the residual risk that remains.",
    "Groups swap registers with another group, which marks any row that wrongly implies the provider becomes accountable or where acceptance lacks an appropriate approver. Debrief the most common corrections."
   ]
  },
  "discussion": [
   "Why do you think regulators insist that accountability stays with the controller even when processing is outsourced?",
   "What evidence would convince you that a provider is handling your data as promised?",
   "When might avoiding the cloud for a workload be the wrong decision, even for a cautious organization?"
  ],
  "exit": [
   [
    "In a SaaS arrangement, who is the owner/controller and who is the custodian/processor?",
    "The customer organization is owner/controller; the SaaS provider is custodian/processor."
   ],
   [
    "Does cyber insurance transfer accountability for a data breach? Explain.",
    "No. It transfers part of the financial impact; accountability, regulatory exposure and reputational harm stay with the organization."
   ],
   [
    "What must happen before a significant residual risk is accepted?",
    "It must be documented and approved by management with appropriate authority, within the organization's risk appetite, and recorded with a review date."
   ]
  ],
  "differentiation": [
   "Support: Provide a treatment cheat sheet with one cloud example per treatment and a list of typical approvers by risk level for struggling students to use during the workshop.",
   "Extend: Ask fast finishers to write a short memo to the board explaining residual risk for the HR SaaS move and recommending which risks the board itself should accept."
  ]
 },
 {
  "t": "Risk frameworks and metrics: ISO/IEC 31000, ENISA cloud risk guidance, NIST SP 800-37, and assessing a provider's risk management",
  "objectives": [
   "Students will be able to describe the purpose and main process of ISO/IEC 31000 and explain why it is not certifiable.",
   "Students will be able to list the seven NIST RMF steps in order and connect the RMF to FedRAMP.",
   "Students will be able to name cloud-specific risks from the ENISA assessment and classify them by category.",
   "Students will be able to distinguish KRIs from KPIs and identify evidence for assessing a provider's risk management."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of dashboard warnings students know from cars or apps."
   ],
   [
    12,
    "Teach",
    "Present the three frameworks side by side on the board with columns for purpose, scope, certifiable and typical user. Walk through the RMF steps with the mnemonic. Introduce ENISA categories with two examples each. Define KRI and KPI with cloud examples, then list evidence for assessing a provider."
   ],
   [
    18,
    "Activity",
    "Run the 'Framework match and metric build' activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, connecting answers to the provider evidence list."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Your car's dashboard has warning lights and a speedometer. Which of these tells you something is going wrong, and which tells you how well you are doing? Why do you need both?",
  "activity": {
   "title": "Framework match and metric build",
   "materials": "Printed purpose cards (eight to ten), three large labels on the whiteboard (ISO/IEC 31000, ENISA, NIST SP 800-37), sticky notes, markers.",
   "steps": [
    "Groups receive purpose cards such as 'a US agency needs to authorize a new cloud system', 'a charity wants to set up enterprise risk management for all risk types', 'a team wants a checklist of cloud-specific risks before migration', 'a provider seeks federal cloud authorization'. Groups place each card under the matching framework on the board.",
    "Groups then pick one ENISA risk (for example lock-in or management interface compromise) and write one KRI and one KPI that would help manage it on separate sticky notes, labeled clearly.",
    "Each group posts its metrics; the class checks whether each KRI truly signals rising exposure and each KPI measures performance, and whether each is specific and has an owner.",
    "Close by asking each group to name two pieces of evidence it would request from a provider to judge its handling of the chosen risk."
   ]
  },
  "discussion": [
   "Why might an organization use ISO/IEC 31000 at the enterprise level and the NIST RMF for individual systems at the same time?",
   "What makes a metric useless even if it is accurate?",
   "How often should a provider's risk management be reassessed, and what events should trigger an early review?"
  ],
  "exit": [
   [
    "Put the NIST RMF steps in order.",
    "Prepare, categorize, select, implement, assess, authorize, monitor."
   ],
   [
    "Give one KRI and one KPI for cloud security.",
    "KRI example: number of unencrypted storage buckets or overdue critical vulnerabilities. KPI example: mean time to respond or percentage of accounts with MFA."
   ],
   [
    "Name two pieces of evidence you would review to assess a provider's risk management.",
    "Examples: certification scope, SOC 2 Type II report and exceptions, CSA STAR entry, incident history, business continuity plans, financial stability, subprocessor management."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a framework comparison card and a list of example metrics to classify as KRI or KPI before they write their own.",
   "Extend: Ask fast finishers to map each ENISA category to at least one RMF step where that risk would be addressed, and present the mapping in one minute."
  ]
 },
 {
  "t": "Outsourcing and cloud contract design: business requirements (SLA, MSA, SOW), vendor management and supply chain management (ISO/IEC 27036)",
  "objectives": [
   "Students will be able to distinguish the purposes of an MSA, SOW and SLA in a cloud agreement.",
   "Students will be able to identify key security and exit terms that a cloud contract should contain.",
   "Students will be able to explain the ongoing activities of vendor management and how to prioritize vendors by criticality.",
   "Students will be able to describe supply chain risk in cloud services and the role of ISO/IEC 27036."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the promises students mention on the board."
   ],
   [
    10,
    "Teach",
    "Explain MSA, SOW and SLA with a simple nested diagram (MSA containing several SOWs, each with service levels). Go through key contract topics and exit terms. Explain vendor management and supply chain management, introducing ISO/IEC 27036."
   ],
   [
    20,
    "Activity",
    "Run the 'Contract red-line' activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, linking answers back to the red-line findings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Think of a phone or internet plan you or your family pays for. What did the company promise, and what happens if it breaks that promise?",
  "activity": {
   "title": "Contract red-line",
   "materials": "A teacher-written, fictional three-page cloud contract excerpt with deliberate gaps (vague data use, no breach notification timing, no exit terms, unlimited subprocessor changes, low liability cap), printed one per pair; red pens; a projector to show a checklist of key contract topics.",
   "steps": [
    "Pairs read the excerpt and label each clause as MSA, SOW or SLA content in the margin.",
    "Using the projected checklist, pairs mark missing or weak terms in red and write a proposed replacement clause for at least three of them, including one exit term.",
    "Pairs then list two questions they would ask about the provider's own suppliers.",
    "Two or three pairs present their strongest replacement clause; the class discusses whether a large public provider would likely accept it and what the customer could do if not."
   ]
  },
  "discussion": [
   "If a large provider will not change its standard terms, what options does a customer still have to manage risk?",
   "Why do service credits exist if they rarely cover real losses?",
   "How far down a provider's supply chain should a customer expect visibility?"
  ],
  "exit": [
   [
    "Match each document to its purpose: MSA, SOW, SLA.",
    "MSA: overall legal terms of the relationship. SOW: specific services, deliverables, schedule and cost. SLA: measurable service commitments and remedies."
   ],
   [
    "Name two exit terms a cloud contract should include.",
    "Examples: data export in an open format within a defined time, transition assistance, confirmed deletion of data including backups, defined costs."
   ],
   [
    "Give two activities of vendor management after signing.",
    "Examples: tracking SLA performance, reviewing updated assurance reports, reassessing risk, handling issues and planning renewal or exit."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the checklist of key contract topics as a printed handout and pre-mark one gap in their excerpt as a worked example.",
   "Extend: Ask fast finishers to design a vendor tiering scheme with three tiers, criteria for each and the review activities and frequency for each tier."
  ]
 },
 {
  "t": "Policies for cloud: organizational and functional policies, and cloud computing policies",
  "objectives": [
   "Students will be able to distinguish organizational policies, functional policies, standards and procedures.",
   "Students will be able to identify functional policies that need updating for cloud and explain what is missing.",
   "Students will be able to list the core elements of a cloud computing policy, including measures against shadow IT.",
   "Students will be able to explain how guardrails, policy as code and exception processes enforce and govern cloud policies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers, then ask which rules are enforced automatically."
   ],
   [
    10,
    "Teach",
    "Draw the policy pyramid: policy, standard, procedure, guideline. Give examples of organizational and functional policies. Explain why functional policies need cloud updates. Present the elements of a cloud computing policy and how guardrails and policy as code enforce them. Explain exceptions."
   ],
   [
    20,
    "Activity",
    "Run the 'Write the cloud policy' workshop described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "What are three rules at this school or your workplace? For each, is it enforced by people reminding you, or by something that physically or digitally prevents breaking it?",
  "activity": {
   "title": "Write the cloud policy",
   "materials": "A printed scenario about a fictional organization with shadow IT problems, a blank one-page cloud policy template with headings (purpose, scope, approval, permitted data, required controls, enforcement, exceptions, review), sticky notes, whiteboard.",
   "steps": [
    "Groups of three or four read the scenario and list the shadow IT and data handling problems on sticky notes.",
    "Groups draft a one-page cloud computing policy using the template, keeping statements at the policy level rather than technical settings.",
    "For three of their policy statements, groups write on separate sticky notes how the rule could be enforced automatically (guardrail, policy as code, identity rule or scanning) and post them on the board.",
    "Groups trade drafts; reviewers flag any statement that is really a standard or procedure and any missing element such as exceptions or review cycle. Debrief common flags."
   ]
  },
  "discussion": [
   "How can a cloud policy reduce shadow IT without slowing the organization down?",
   "What should happen when a provider's policy on staff access to customer data conflicts with your organization's policy?",
   "Which policy statements are hard or impossible to enforce automatically, and how would you handle them?"
  ],
  "exit": [
   [
    "Give an example of an organizational policy and a functional policy.",
    "Organizational: information security or acceptable use policy. Functional: incident response, encryption and key management, or access control policy."
   ],
   [
    "Name three elements of a cloud computing policy.",
    "Examples: who may approve and procure services, mandatory security and legal review, approved providers and regions, permitted data classifications by service model, required controls, exit plans."
   ],
   [
    "What makes a policy exception valid?",
    "It is documented, time-limited and approved by an authority who accepts the associated risk."
   ]
  ],
  "differentiation": [
   "Support: Provide a sorting sheet with sample statements to classify as policy, standard or procedure before groups write their own, and pair struggling students with a confident writer.",
   "Extend: Ask fast finishers to write pseudo-rules in plain language, such as 'deny storage creation if encryption is off', for two policy statements and note what data, such as tags, the rule would need."
  ]
 },
 {
  "t": "AI regulation and ethics in the cloud: regulatory requirements, bias, transparency and accountability",
  "objectives": [
   "Students will be able to describe the risk-based structure of the EU AI Act and identify examples of high-risk uses.",
   "Students will be able to explain how existing data protection and anti-discrimination laws apply to AI-supported decisions.",
   "Students will be able to identify sources of algorithmic bias, including proxy variables, and propose ways to test and mitigate it.",
   "Students will be able to list accountability measures for an AI system and explain why using a cloud AI service does not transfer accountability."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick answers, noting who students think is responsible."
   ],
   [
    12,
    "Teach",
    "Present the EU AI Act tiers with examples, then explain that existing laws also apply. Introduce ISO/IEC 42001 and the NIST AI RMF briefly. Explain bias and proxy variables with a simple example, then transparency, explainability, privacy, safety and the accountability measures, ending with contract questions for AI suppliers."
   ],
   [
    18,
    "Activity",
    "Run the 'AI governance board' role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A streaming app recommends a movie you hate. A bank's AI rejects your loan. Should these two AI systems face the same rules? Why or why not?",
  "activity": {
   "title": "AI governance board",
   "materials": "Printed use-case cards (four to six, such as resume screening, chatbot for store hours, loan pre-screening, hospital triage support, AI-generated marketing images, employee message monitoring), role cards (legal counsel, data scientist, affected-person advocate, business owner), a printed decision form per group, whiteboard.",
   "steps": [
    "Form groups of four with one role card each. Each group receives two use-case cards.",
    "For each use case, the group classifies its likely risk level, lists the laws and ethical concerns that apply and identifies possible proxy variables or bias sources.",
    "The group completes the decision form: approve, approve with conditions or reject, with at least three conditions (for example bias testing, human review, transparency notice, contract term on training data, named owner).",
    "Each group presents one decision; the affected-person advocate from another group may challenge it with one question. The teacher summarizes recurring conditions on the board."
   ]
  },
  "discussion": [
   "Is it possible for an AI system to be accurate overall and still unfair? How would you detect that?",
   "What makes human oversight meaningful rather than a formality?",
   "Should organizations tell people every time AI is involved in a decision about them? Where would you draw the line?"
  ],
  "exit": [
   [
    "Name the four risk levels of the EU AI Act.",
    "Unacceptable (prohibited), high-risk, limited risk with transparency duties, and minimal risk."
   ],
   [
    "Why might a model that never sees applicants' race still produce racially biased outcomes?",
    "Proxy variables such as postal code or other correlated inputs can carry the same information, and historical training data may reflect past discrimination."
   ],
   [
    "A company uses a cloud provider's AI to screen job applicants. Who is accountable for the screening decisions?",
    "The company using the AI; the provider's role does not transfer accountability for decisions about applicants."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference with the AI Act tiers, example uses and a list of common conditions to choose from during the role-play.",
   "Extend: Ask fast finishers to draft five questions for an AI supplier due diligence questionnaire covering training data use, bias testing, explainability, logging and incident notification."
  ]
 },
 {
  "t": "Specialized compliance requirements: PCI DSS, FedRAMP, HIPAA, NERC CIP and certification scope",
  "objectives": [
   "Students will be able to match PCI DSS, FedRAMP, HIPAA and NERC CIP to the data, sectors and enforcement mechanisms they cover.",
   "Students will be able to explain how compliance responsibilities are shared between provider and customer using a responsibility matrix.",
   "Students will be able to verify whether a provider's certification covers the specific services used for regulated data.",
   "Students will be able to propose scope reduction measures such as tokenization and outsourced payment pages."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect responses about what a certificate really proves."
   ],
   [
    12,
    "Teach",
    "Use a four-column table on the board for PCI DSS, FedRAMP, HIPAA and NERC CIP: who it applies to, basis or control set, enforcement and cloud notes. Explain responsibility matrices and scope reduction. Finish with the certification scope trap and the principle that the provider's certification never certifies the customer's use."
   ],
   [
    18,
    "Activity",
    "Run the 'Scope check' exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "A restaurant displays a health certificate in the window. Does that prove the meal you are about to eat is safe? What does it actually prove?",
  "activity": {
   "title": "Scope check",
   "materials": "A teacher-made, fictional provider 'services in scope' table (rows for about 15 services, columns for PCI DSS, FedRAMP Moderate, HIPAA BAA eligible, ISO/IEC 27001), printed or projected; four printed customer architecture cards each listing the services used and the data type; a simple printed responsibility matrix excerpt; pens.",
   "steps": [
    "Pairs receive one architecture card, for example a retailer's checkout, a federal agency's case system, a clinic's patient portal, or a utility's maintenance-scheduling app.",
    "Pairs identify which regime applies to their data, then check every service on their card against the scope table and circle any out-of-scope service.",
    "Using the responsibility matrix excerpt, pairs list three controls that remain the customer's responsibility even when all services are in scope.",
    "Pairs propose one change to reduce scope or fix a gap (such as tokenization or replacing an out-of-scope service) and share it with the class while the teacher records findings on the board."
   ]
  },
  "discussion": [
   "Why might a provider launch a new service before it is included in its compliance programs, and how should customers respond?",
   "Why do you think PCI DSS is enforced through contracts rather than law, and does that make it less important to follow?",
   "What makes moving grid operations systems to the cloud harder than moving a retailer's website?"
  ],
  "exit": [
   [
    "Which regime applies to US federal agencies' cloud services, and what control catalog is it based on?",
    "FedRAMP, based on NIST SP 800-53 through the NIST Risk Management Framework."
   ],
   [
    "A provider holds a PCI DSS attestation. Name two things the customer must still verify or do.",
    "Confirm each service used for card data is in the provider's scope, and implement and evidence its own controls (configurations, access, logging, keys) within the CDE."
   ],
   [
    "How does outsourcing payment pages to a compliant processor help a merchant?",
    "Card data stays out of the merchant's systems, shrinking the cardholder data environment and the PCI DSS requirements that apply."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a summary card for each regime with one sentence on scope and enforcement, and assign them the retailer architecture card, which is the most familiar.",
   "Extend: Ask fast finishers to draft a short internal procedure for approving a new cloud service for regulated data, including the scope checks and evidence the customer must collect."
  ]
 }
]);
