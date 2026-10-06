/* Teacher edition for AWS Certified Solutions Architect – Associate (SAA-C03): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("aws-saa", [
 {
  "t": "IAM users, groups, roles and policies: least privilege, identity-based vs resource-based policies and policy evaluation logic",
  "objectives": [
   "Students will be able to distinguish IAM users, groups, roles and the root user and choose the right identity for a person or a workload.",
   "Students will be able to compare identity-based, resource-based and trust policies and identify each from its JSON.",
   "Students will be able to apply the IAM policy evaluation order to predict whether a request is allowed or denied.",
   "Students will be able to design a least-privilege role and explain when a permissions boundary is appropriate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Draw the identity types, then the policy types, then a flowchart of evaluation: implicit deny, explicit deny check, guardrails (SCP, boundary, session), then Allow. Say plainly: any explicit Deny ends the story."
   ],
   [
    18,
    "Activity",
    "Run the 'Allowed or Denied' card sort in pairs. Circulate and ask each pair to point to the exact line that decided each card."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up answers and fix them together using the flowchart. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door."
   ]
  ],
  "warmup": "An app's role has a policy that says Allow s3:GetObject on a bucket, yet the app gets AccessDenied. List every reason you can think of.",
  "activity": {
   "title": "Allowed or Denied: policy evaluation card sort",
   "materials": "Printed scenario cards (8 to 10), each showing a short identity policy, an optional bucket policy, and an optional SCP or boundary note; a whiteboard with the evaluation flowchart; sticky notes.",
   "steps": [
    "Give each pair a deck of scenario cards and two sticky notes labeled Allowed and Denied.",
    "For each card, pairs trace the flowchart and sort the card into a pile, writing the deciding statement on the card.",
    "Include tricky cards: an SCP that omits the service, a boundary that excludes the action, a cross-account case where only one side allows, and a Deny on aws:SecureTransport false.",
    "Pairs swap decks with a neighbor and check each other's sorting, flagging disagreements.",
    "The teacher resolves disagreements at the board, naming the evaluation step that decides each one."
   ]
  },
  "discussion": [
   "Why might an organization allow developers to create roles at all, and what risks does a permissions boundary manage?",
   "When would you choose an inline policy over a customer managed policy?",
   "How would you find out which actions a workload actually uses before tightening its policy?"
  ],
  "exit": [
   [
    "A role allows dynamodb:PutItem, but an SCP on its OU allows only S3 and EC2. Can it write to DynamoDB?",
    "No. The SCP caps available permissions, so the action is denied even though the role allows it."
   ],
   [
    "Which identity should an EC2 application use to read S3, and how does it get credentials?",
    "An IAM role attached through an instance profile; the SDK gets temporary STS credentials from the instance metadata service."
   ],
   [
    "How can you tell a resource-based policy from an identity-based one by reading it?",
    "A resource-based policy (including a trust policy) has a Principal element; an identity-based policy does not."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page flowchart with the evaluation steps numbered and have them start with cards that involve only one policy before adding SCPs or boundaries.",
   "Extend: Ask fast finishers to write a permissions boundary and a matching identity policy for a developer who may create Lambda roles limited to DynamoDB and CloudWatch Logs, then explain the effective permissions."
  ]
 },
 {
  "t": "Multi-account security: AWS Organizations, service control policies, IAM Identity Center and cross-account roles",
  "objectives": [
   "Students will be able to explain how AWS Organizations, OUs and SCP inheritance limit permissions in member accounts.",
   "Students will be able to compare IAM Identity Center and cross-account IAM roles and choose the right one for people versus workloads.",
   "Students will be able to describe the confused deputy problem and how an external ID prevents it.",
   "Students will be able to design an OU structure with guardrail SCPs for a given governance requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and have students list on sticky notes what controls they would want."
   ],
   [
    12,
    "Teach",
    "Draw an organization tree on the whiteboard: root, OUs, accounts. Show SCP inheritance with colored markers, then show Identity Center and a cross-account role with arrows. Stress that SCPs filter but never grant and skip the management account."
   ],
   [
    18,
    "Activity",
    "Groups design an OU tree and guardrails for the fictional company on poster paper, then present for two minutes each."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare designs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A company with 40 accounts wants to stop anyone, including account admins, from using unapproved Regions. Where would you put that rule, and why not in each account's IAM policies?",
  "activity": {
   "title": "Whiteboard a landing zone",
   "materials": "Whiteboard or poster paper, colored markers, printed requirement cards for a fictional company (Region limits, auditors, a sandbox team, a monitoring vendor, a shared network team).",
   "steps": [
    "Give each group of three or four a requirement card set for the fictional company Lakeside Media.",
    "Groups draw OUs and accounts, mark where each SCP attaches, and write the SCP's intent in one sentence.",
    "Groups add how employees sign in (Identity Center permission sets) and how the vendor gets access (role with external ID).",
    "Groups mark which account is delegated administrator for security services and which account runs no workloads.",
    "Each group presents; classmates check for a guardrail that was placed where it cannot apply, such as on the management account."
   ]
  },
  "discussion": [
   "What are the trade-offs of very many small accounts versus a few large ones?",
   "Why might a Region-deny SCP need exceptions for global services?",
   "How does centralizing sign-in through Identity Center change what happens when an employee leaves?"
  ],
  "exit": [
   [
    "A member account admin has AdministratorAccess, but an inherited SCP denies ec2:RunInstances outside two Regions. Can they launch in a third Region?",
    "No. The SCP caps permissions for everyone in member accounts, including admins and the root user."
   ],
   [
    "Engineers need to sign in once and reach 30 accounts with temporary credentials. Which service?",
    "IAM Identity Center with permission sets assigned to groups."
   ],
   [
    "What does an external ID in a vendor role's trust policy protect against?",
    "The confused deputy problem, where the vendor could be tricked into using its access to your account for another customer."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially drawn OU tree with blanks for where SCPs attach, and a word bank of services to place.",
   "Extend: Ask students to explain how a resource control policy differs from an SCP and to describe one data perimeter control they would add with it."
  ]
 },
 {
  "t": "Federation and temporary credentials: STS AssumeRole, SAML and OIDC federation, Cognito user pools vs identity pools",
  "objectives": [
   "Students will be able to explain how STS temporary credentials work and why they are safer than long-term access keys.",
   "Students will be able to match AssumeRole, AssumeRoleWithSAML and AssumeRoleWithWebIdentity to workforce, cross-account and CI/CD scenarios.",
   "Students will be able to compare Cognito user pools and identity pools and choose one or both for an app requirement.",
   "Students will be able to describe how trust policy conditions and policy variables restrict federated access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally answers on the board."
   ],
   [
    13,
    "Teach",
    "Draw three lanes on the whiteboard: employees (SAML, Identity Center), workloads and pipelines (OIDC, AssumeRoleWithWebIdentity), app customers (Cognito user pool then identity pool). Walk a token through each lane and show where STS issues credentials."
   ],
   [
    17,
    "Activity",
    "Run the 'Follow the token' role-play in groups of four, then rotate scenarios."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, focusing on why customers never become IAM users."
   ],
   [
    5,
    "Exit ticket",
    "Collect the three exit answers on index cards or sticky notes."
   ]
  ],
  "warmup": "A mobile app with a million users needs to upload files to S3. Should each user get an IAM user, an access key in the app, or something else? Vote and justify.",
  "activity": {
   "title": "Follow the token role-play",
   "materials": "Printed role cards (User, Identity provider, Cognito user pool, Cognito identity pool, STS, S3 or API Gateway), sticky notes to act as tokens and credentials, scenario cards.",
   "steps": [
    "Assign each student in a group a role card and give the User a scenario card, such as an employee signing in with the corporate directory or a mobile user uploading a photo.",
    "The User physically passes a sticky note token to the next role, and each role writes what it checks or adds (signature, audience, subject, role ARN, expiry).",
    "STS writes temporary credentials on a new sticky note with an expiry time, and the final service checks the role's permissions.",
    "Groups rotate to a new scenario: a CI/CD pipeline with an OIDC token whose subject is the wrong branch, and decide where the request fails.",
    "Each group reports one place where a missing condition or the wrong Cognito component would break security."
   ]
  },
  "discussion": [
   "Why might a company still choose SAML federation through Identity Center rather than letting employees use IAM users?",
   "What could go wrong if a role trusting an OIDC provider has no subject condition?",
   "When would an app need both a user pool and an identity pool, and when only one?"
  ],
  "exit": [
   [
    "A mobile app's users must call DynamoDB directly with access only to their own items. Which Cognito component and which policy feature?",
    "A Cognito identity pool, with a role policy using the dynamodb:LeadingKeys condition and the identity ID variable."
   ],
   [
    "Which STS operation exchanges a corporate SAML assertion for role credentials?",
    "AssumeRoleWithSAML."
   ],
   [
    "Name one advantage of temporary credentials over access keys.",
    "They expire automatically, so a leaked set is useful only briefly and there is nothing long-lived to rotate."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column chart, 'Who are you?' versus 'What AWS credentials do you get?', and have them place user pool, identity pool, IdP and STS in the right column before the role-play.",
   "Extend: Ask fast finishers to write the trust policy conditions (audience and subject) for a pipeline role in words, and explain how they would let a second branch deploy only to a staging account."
  ]
 },
 {
  "t": "VPC security layers: security groups vs network ACLs, public and private subnets, NAT gateways, bastion hosts vs Session Manager",
  "objectives": [
   "Students will be able to explain what makes a subnet public or private by reading its route table.",
   "Students will be able to compare security groups and network ACLs on statefulness, rule types, attachment point and evaluation order.",
   "Students will be able to design a highly available NAT gateway layout for a multi-AZ VPC.",
   "Students will be able to justify Session Manager over a bastion host for administrative access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project two route tables and ask which subnet is public. Take a quick hand vote."
   ],
   [
    12,
    "Teach",
    "Draw a two-AZ VPC: public and private subnets, internet gateway, one NAT gateway per AZ, ALB, web tier and database. Add security groups as circles around resources and NACLs as gates on subnet edges. Contrast stateful and stateless with a request-and-reply arrow."
   ],
   [
    18,
    "Activity",
    "Pairs troubleshoot the printed 'broken VPC' tickets, writing the fix for each."
   ],
   [
    5,
    "Discuss",
    "Discuss answers and the questions below."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Here are two route tables. One has 0.0.0.0/0 to igw-123, the other has 0.0.0.0/0 to nat-456. Which subnet is public, and can instances in the other one reach the internet?",
  "activity": {
   "title": "Pair troubleshooting: the broken VPC",
   "materials": "Printed ticket cards, each with a symptom plus excerpts of a route table, security group rules and NACL rules; whiteboard; markers.",
   "steps": [
    "Hand each pair five ticket cards, for example 'replies to outbound HTTPS are dropped', 'web servers cannot reach the database', 'NAT gateway placed in a private subnet', 'deny rule numbered after the allow rule', and 'bastion allows SSH from 0.0.0.0/0'.",
    "Pairs identify which layer is at fault (routing, security group, NACL, or access method) and write the minimal fix on the card.",
    "For each card, pairs also name the exam clue word that would point to that layer.",
    "Pairs join another pair and compare fixes, resolving any differences.",
    "The teacher reviews two or three cards at the board, redrawing the diagram with the fix applied."
   ]
  },
  "discussion": [
   "Why do many architects keep NACLs mostly open and rely on security groups for detail?",
   "What operational and audit benefits does Session Manager bring compared with a bastion host?",
   "When might a NAT gateway be replaced entirely by VPC endpoints?"
  ],
  "exit": [
   [
    "A database must accept traffic only from the web tier, whose instances scale in and out. How do you write the rule?",
    "A database security group rule allowing the database port with the web tier's security group as the source."
   ],
   [
    "Name two differences between a security group and a network ACL.",
    "Security groups are stateful and allow-only and attach to interfaces; NACLs are stateless, support allow and deny, are evaluated in number order, and attach to subnets."
   ],
   [
    "Where must a NAT gateway be placed, and how many for a two-AZ design?",
    "In a public subnet, one in each AZ, with each private subnet routing to the NAT gateway in its own AZ."
   ]
  ],
  "differentiation": [
   "Support: Provide a comparison table template with rows for attachment point, state, rule types and evaluation order, and have students fill it in before the tickets.",
   "Extend: Ask students to write a full NACL rule set (inbound and outbound) for a public subnet hosting an ALB on 443, including ephemeral ports and a deny for one IP range."
  ]
 },
 {
  "t": "Private access to AWS services: gateway endpoints, interface endpoints (PrivateLink) and endpoint policies",
  "objectives": [
   "Students will be able to compare gateway endpoints and interface endpoints on supported services, cost, reachability and configuration.",
   "Students will be able to choose the right endpoint type for in-VPC, on-premises and cross-account access scenarios.",
   "Students will be able to write the intent of an endpoint policy and a bucket policy using aws:SourceVpce to build a data perimeter.",
   "Students will be able to explain how PrivateLink shares a service across VPCs with overlapping CIDR ranges."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a mock bill line for NAT data processing and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Draw a VPC with a private subnet: one path through a NAT gateway to S3, one through a gateway endpoint (a route table entry), one through an interface endpoint (an ENI in the subnet). Add an on-premises site connected by Direct Connect and show which paths it can use."
   ],
   [
    18,
    "Activity",
    "Run the 'Pick the path' card sort in small groups, then have groups defend one tricky card."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions and correct misconceptions about gateway endpoint reach."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Private servers download a lot of data from S3 through a NAT gateway. What are two downsides of that path, one about cost and one about security?",
  "activity": {
   "title": "Pick the path card sort",
   "materials": "Printed scenario cards (service, source of traffic, constraints), three labeled zones on desks or the whiteboard: Gateway endpoint, Interface endpoint, NAT gateway or other.",
   "steps": [
    "Give each group about ten scenario cards, such as 'EC2 to DynamoDB, lowest cost', 'on-premises to S3 over VPN', 'Lambda to Secrets Manager with no internet', 'SaaS provider shares an API with 200 customer VPCs'.",
    "Groups place each card in a zone and write a one-line reason on it.",
    "For each S3 card, groups also write whether a bucket policy should use aws:SourceVpce or aws:SourceVpc.",
    "Groups rotate tables and challenge one placement made by another group.",
    "The teacher reviews the challenged cards and summarizes the rule: where the traffic comes from and which service it targets."
   ]
  },
  "discussion": [
   "Why does a gateway endpoint not work from a peered VPC, while an interface endpoint does?",
   "How do endpoint policies and bucket policies complement each other in a data perimeter?",
   "When might you keep a NAT gateway even after adding endpoints?"
  ],
  "exit": [
   [
    "Which endpoint type gives free private access to DynamoDB from inside a VPC?",
    "A gateway endpoint."
   ],
   [
    "An on-premises data center must reach Secrets Manager privately over Direct Connect. What do you use?",
    "A Secrets Manager interface endpoint (PrivateLink), whose private IPs are reachable over Direct Connect."
   ],
   [
    "How do you make a bucket refuse requests that do not come through your endpoint?",
    "A bucket policy Deny with a condition that aws:SourceVpce does not equal the endpoint ID."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision tree with two questions (Is it S3 or DynamoDB? Does traffic start inside this VPC?) to use while sorting.",
   "Extend: Ask students to design a PrivateLink offering for a fictional SaaS product, including the Network Load Balancer, connection acceptance and how consumers resolve the endpoint's DNS name."
  ]
 },
 {
  "t": "Protecting the edge: AWS WAF, Shield Standard vs Shield Advanced, and CloudFront with origin access control",
  "objectives": [
   "Students will be able to distinguish the threats handled by AWS WAF, Shield Standard and Shield Advanced.",
   "Students will be able to identify which resources a WAF web ACL can and cannot be associated with.",
   "Students will be able to explain how origin access control keeps an S3 origin private behind CloudFront.",
   "Students will be able to design an edge protection plan for a web application given a threat description."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read three short attack descriptions and have students guess which service stops each."
   ],
   [
    12,
    "Teach",
    "Draw the edge stack: internet, Shield (layers 3 and 4), CloudFront edge locations, WAF web ACL (layer 7), origin (S3 with OAC, or ALB with prefix list and header). Walk through Shield Standard versus Advanced features."
   ],
   [
    18,
    "Activity",
    "Groups role-play an attack-and-defend tabletop, with one student as attacker reading attack cards and others choosing defenses."
   ],
   [
    5,
    "Discuss",
    "Debrief the tabletop with the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Collect three exit answers."
   ]
  ],
  "warmup": "A login page gets 5,000 password attempts a minute from a few IPs, and separately a network flood of UDP packets hits the site. Are these the same kind of attack? Which AWS service would you reach for first for each?",
  "activity": {
   "title": "Edge defense tabletop",
   "materials": "Printed attack cards (SQL injection, UDP reflection flood, credential stuffing from a few IPs, scraping from one country, direct bucket access, direct ALB access), printed defense cards (WAF managed rules, rate-based rule, geo match, Shield Standard, Shield Advanced, OAC, CloudFront prefix list plus secret header), whiteboard.",
   "steps": [
    "Split the class into groups of four; one student per group is the attacker with the attack deck.",
    "The attacker plays one card at a time; defenders must play the defense card that stops it and say which layer it works at.",
    "If defenders play the wrong card, the attacker scores a point and explains why the defense fails.",
    "After all cards, each group writes a final architecture on the whiteboard for Tidewater Outdoor, including where the web ACL attaches.",
    "The class compares architectures and the teacher highlights any WAF placed on an unsupported resource."
   ]
  },
  "discussion": [
   "What business factors would justify paying for Shield Advanced?",
   "Why is count mode important before blocking with new WAF rules?",
   "What happens to your WAF protection if attackers can reach the origin directly?"
  ],
  "exit": [
   [
    "Which service blocks cross-site scripting attempts, and where can it be attached?",
    "AWS WAF, attached to CloudFront, an ALB, API Gateway REST APIs and other supported services."
   ],
   [
    "Name two features Shield Advanced adds over Shield Standard.",
    "Any two of: Shield Response Team access, DDoS cost protection, enhanced detection and visibility, application-layer mitigation with WAF, and WAF at no extra cost for protected resources."
   ],
   [
    "How do you keep an S3 origin private but still served by CloudFront?",
    "Enable origin access control, keep Block Public Access on, and allow s3:GetObject only for the CloudFront service principal with aws:SourceArn equal to the distribution's ARN."
   ]
  ],
  "differentiation": [
   "Support: Give students a layer chart (network and transport versus application) and have them place each attack card on it before choosing defenses.",
   "Extend: Ask students to draft, in plain words, a WAF web ACL with four rules in priority order for the retail site, including which rules start in count mode."
  ]
 },
 {
  "t": "Encryption at rest with AWS KMS: AWS managed vs customer managed keys, key policies, envelope encryption and S3 SSE-S3, SSE-KMS and SSE-C",
  "objectives": [
   "Students will be able to compare AWS owned, AWS managed and customer managed KMS keys and choose one for a requirement.",
   "Students will be able to explain why the key policy is the primary access control for a KMS key, including cross-account use.",
   "Students will be able to describe the steps of envelope encryption using GenerateDataKey and Decrypt.",
   "Students will be able to select SSE-S3, SSE-KMS, DSSE-KMS, SSE-C or client-side encryption for an S3 scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the auditor and collect answers."
   ],
   [
    12,
    "Teach",
    "Draw the three key ownership models as a control ladder. Then act out envelope encryption on the board with two colored boxes for data key and KMS key. Finish with a table of S3 encryption options and when each fits."
   ],
   [
    18,
    "Activity",
    "Pairs act out envelope encryption with physical envelopes, then solve the S3 encryption matching cards."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions below."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "An auditor asks you to prove who used the key that protects a bucket and to show you can cut off access instantly. Which S3 encryption setting gives you both, and why not the default?",
  "activity": {
   "title": "Envelopes and lockboxes",
   "materials": "Paper envelopes, index cards, sticky notes, a marker labeled 'KMS' held by one student per group, printed S3 requirement cards.",
   "steps": [
    "In groups of three, one student plays KMS, one plays an application, and one plays an auditor holding a log sheet.",
    "The application asks KMS for a data key; KMS writes a 'plaintext key' card and the same key sealed in an envelope, and the auditor logs the request.",
    "The application 'encrypts' a note with the plaintext key, tears up the plaintext card, and staples the sealed envelope to the note.",
    "To decrypt, the application hands the envelope back to KMS, which checks a printed key policy card before opening it; the auditor logs it. Then KMS is told the key is disabled and must refuse.",
    "Groups finish by matching six S3 requirement cards to SSE-S3, SSE-KMS, DSSE-KMS, SSE-C or client-side encryption, writing one reason each."
   ]
  },
  "discussion": [
   "Why might a company separate key administrators from key users?",
   "What risks come with SSE-C that do not exist with SSE-KMS?",
   "When is disabling a key a better incident response step than deleting objects?"
  ],
  "exit": [
   [
    "What must be true for an IAM role in another account to decrypt with your customer managed key?",
    "Your key policy must allow that account (or role), and that account's IAM policy must allow the KMS action."
   ],
   [
    "Why do services use envelope encryption instead of sending data to KMS?",
    "KMS encrypts only small payloads directly, and envelope encryption keeps bulk data local and fast while KMS controls the data key."
   ],
   [
    "The requirement says the customer must supply and hold the encryption key for S3. Which option?",
    "SSE-C."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page flow diagram of GenerateDataKey and Decrypt with blanks for students to label during the role-play.",
   "Extend: Ask students to explain how they would share RDS snapshots encrypted with aws/rds with a backup account, step by step, and what the backup account's IAM policy must contain."
  ]
 },
 {
  "t": "Encryption in transit: ACM certificates, TLS on ALB and CloudFront, and enforcing HTTPS with aws:SecureTransport",
  "objectives": [
   "Students will be able to explain how ACM issues, validates and renews certificates and its us-east-1 requirement for CloudFront.",
   "Students will be able to compare TLS termination at an ALB, NLB and CloudFront and describe what end-to-end encryption requires.",
   "Students will be able to write the intent of a bucket policy that enforces HTTPS with aws:SecureTransport.",
   "Students will be able to choose SNI, redirects and security policies to meet a given encryption-in-transit requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers as arrows on the board."
   ],
   [
    12,
    "Teach",
    "Draw browser, CloudFront, ALB, targets, RDS and S3. Label each hop as encrypted or not under different settings. Explain ACM validation and renewal, the us-east-1 rule, SNI and aws:SecureTransport."
   ],
   [
    18,
    "Activity",
    "Pairs mark up a printed architecture diagram, colouring each hop and writing the setting that encrypts it."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions below."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A browser connects over HTTPS to a load balancer, which forwards to servers over HTTP. Is the data encrypted in transit? Where exactly is it readable?",
  "activity": {
   "title": "Colour the hops",
   "materials": "Printed architecture diagrams (browser, CloudFront, ALB, EC2 targets, RDS, S3, SQS), two colours of highlighters or markers, printed configuration snippets.",
   "steps": [
    "Give each pair a diagram and a set of configuration snippets, such as viewer protocol policy allow-all, origin protocol policy HTTP only, ALB target group HTTP, and no bucket policy.",
    "Pairs colour each hop green if encrypted and red if not, based on the snippets.",
    "Pairs then rewrite each red hop's setting so it becomes green, naming the exact setting (origin protocol policy HTTPS only, target group HTTPS, rds.force_ssl, aws:SecureTransport Deny).",
    "Pairs note where each ACM certificate must be requested, including the one for CloudFront.",
    "Two pairs present their fixed diagram while the class checks for any hop left unencrypted."
   ]
  },
  "discussion": [
   "Why do most designs terminate TLS at a managed service instead of on each server?",
   "When would you choose an NLB passing TCP through to targets rather than terminating TLS?",
   "What are the operational risks of importing certificates into ACM?"
  ],
  "exit": [
   [
    "In which Region must an ACM certificate for CloudFront be requested?",
    "US East (N. Virginia), us-east-1."
   ],
   [
    "What two CloudFront settings must require HTTPS for end-to-end encryption?",
    "The viewer protocol policy (redirect to HTTPS or HTTPS only) and the origin protocol policy (HTTPS only)."
   ],
   [
    "Which condition key do you use in a Deny to reject unencrypted requests to S3 or SQS?",
    "aws:SecureTransport set to false."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist of hops with a yes or no column for encrypted and a word bank of settings to match to each hop.",
   "Extend: Ask students to design TLS for a service that must hold its own certificate on the targets, explaining why an NLB with TCP pass-through fits and how certificates would be managed there."
  ]
 },
 {
  "t": "Secrets management: Secrets Manager rotation vs Systems Manager Parameter Store SecureString",
  "objectives": [
   "Students will be able to explain why hard-coded secrets are a risk and describe the runtime retrieval pattern with IAM roles.",
   "Students will be able to compare Secrets Manager and Parameter Store on rotation, replication, encryption and cost.",
   "Students will be able to choose the right service for a given secret or configuration requirement.",
   "Students will be able to identify the IAM and KMS permissions an application needs to read an encrypted secret."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a fictional code snippet with a hard-coded password and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Build a two-column comparison on the whiteboard for Secrets Manager and Parameter Store. Walk through managed rotation and staging labels, then the IAM plus KMS permissions needed to read a value, and caching guidance."
   ],
   [
    18,
    "Activity",
    "Groups sort secret cards into the right service and write the IAM permissions for two of them."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions below."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "Here is a line of code with a database password in it. List every place this password might now be copied to, and what you would have to do to change it.",
  "activity": {
   "title": "Where does this secret live",
   "materials": "Printed cards describing secrets and settings (RDS master password with 30-day rotation, feature flag, vendor API key rotated quarterly, database host name, static license key, password needed in two Regions), two labeled zones on the whiteboard.",
   "steps": [
    "Give each group a deck of cards and have them place each card under Secrets Manager or Parameter Store, choosing String or SecureString where relevant.",
    "For each card, groups write a one-line reason using the keyword rotation, replication, configuration or cost.",
    "Groups pick two cards and write the permissions the application role needs, including the KMS permission.",
    "Groups describe how the application should cache the value and when it should refresh.",
    "The teacher reviews disputed cards and confirms the rule of thumb."
   ]
  },
  "discussion": [
   "Why is rotation without application changes only possible if apps fetch secrets at runtime?",
   "When might the cost of Secrets Manager not be justified?",
   "How would you detect that a secret was baked into an image before it reaches production?"
  ],
  "exit": [
   [
    "The requirement says database credentials must rotate automatically with no custom code. Which service?",
    "AWS Secrets Manager with managed rotation."
   ],
   [
    "Name the two permissions a role needs to read a SecureString encrypted with a customer managed key.",
    "ssm:GetParameter (or GetParameters) and kms:Decrypt on that key."
   ],
   [
    "Where should non-sensitive, hierarchical configuration such as a host name go at lowest cost?",
    "Parameter Store as a String parameter."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision flowchart beginning with 'Does it need automatic rotation or cross-Region replication?' to use while sorting cards.",
   "Extend: Ask students to describe how the AWSPENDING and AWSCURRENT labels move during a rotation and what an application sees at each step."
  ]
 },
 {
  "t": "S3 data protection: Block Public Access, bucket policies, presigned URLs, versioning, MFA Delete and Object Lock modes",
  "objectives": [
   "Students will be able to classify S3 controls as protecting against exposure or against loss.",
   "Students will be able to explain how presigned URLs grant temporary access and what limits them.",
   "Students will be able to compare versioning, MFA Delete, Object Lock governance mode, compliance mode and legal hold.",
   "Students will be able to select the right S3 data protection controls for a regulatory or ransomware scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and draw two columns on the board: Exposure and Loss."
   ],
   [
    12,
    "Teach",
    "Fill the two columns with Block Public Access, bucket policies, presigned URLs, versioning, MFA Delete and Object Lock. Act out a delete in a versioned bucket using stacked sticky notes, adding a delete marker on top and then removing it."
   ],
   [
    18,
    "Activity",
    "Groups run the 'Can you delete it' challenge with scenario cards and a simulated bucket of sticky notes."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions below."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name one way S3 data can be exposed and one way it can be lost. Which features do you already know for each?",
  "activity": {
   "title": "Can you delete it",
   "materials": "Sticky notes in two colours (object versions and delete markers), printed bucket configuration cards (versioning on or off, governance mode, compliance mode, legal hold, MFA Delete), printed actor cards (developer, admin with bypass permission, root user, attacker with stolen admin keys).",
   "steps": [
    "Each group builds a small 'bucket' of stacked sticky-note versions on a desk and draws a configuration card.",
    "Students draw an actor card and an action (delete, overwrite, permanently delete a version, shorten retention) and decide whether it succeeds under that configuration.",
    "If the action succeeds, students change the sticky-note stack to show the result, such as adding a delete marker or a new version.",
    "Groups record each outcome and the rule that decided it.",
    "The class compares results for the attacker card under governance versus compliance mode and summarizes which controls stop ransomware."
   ]
  },
  "discussion": [
   "Why might a company choose governance mode first and compliance mode later?",
   "What are the cost consequences of versioning, and how do lifecycle rules help?",
   "Why are presigned URLs safer than making an object public, and what still needs care?"
  ],
  "exit": [
   [
    "A partner without AWS credentials needs to download one file for the next hour. What do you give them?",
    "A presigned URL for that object with an expiry of about an hour, signed by an identity that can read it."
   ],
   [
    "Which control stops even the root user from deleting a protected object version before retention ends?",
    "S3 Object Lock in compliance mode."
   ],
   [
    "What happens when you delete an object in a versioned bucket?",
    "S3 adds a delete marker; earlier versions remain and can be restored by removing the marker."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card listing each feature with one sentence on what it stops and who can override it, to use during the challenge.",
   "Extend: Ask students to design a backup bucket for a regulated company that combines Block Public Access, versioning, Object Lock, lifecycle rules and replication, and explain how each part contributes."
  ]
 },
 {
  "t": "Detection and compliance services: CloudTrail, AWS Config rules, GuardDuty, Inspector, Macie and Security Hub",
  "objectives": [
   "Students will be able to state the single question answered by CloudTrail, Config, GuardDuty, Inspector, Macie, Security Hub and Detective.",
   "Students will be able to distinguish CloudTrail management events from data events and explain when data events must be enabled.",
   "Students will be able to design an automated detection and response flow using findings, EventBridge and remediation.",
   "Students will be able to select the correct detective service from an exam-style scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up incident and have students write the questions an investigator would ask."
   ],
   [
    12,
    "Teach",
    "Write each service on the board next to its one question. Walk through the incident timeline, adding which service answers each step, then draw findings flowing into Security Hub and EventBridge."
   ],
   [
    18,
    "Activity",
    "Groups run the incident investigation card game, assigning each clue to a service."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions below."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "An instance is suddenly talking to a crypto-mining domain. Write down three questions you would want answered, and guess which AWS service might answer each.",
  "activity": {
   "title": "Incident investigation card game",
   "materials": "Printed clue cards (log excerpts and requests such as 'who called DeleteSecurityGroup', 'rule set before and after', 'CVE in container image', 'PII found in bucket', 'DNS queries to known bad domain', 'single dashboard needed'), service name cards, a whiteboard timeline.",
   "steps": [
    "Give each group a shuffled deck of clue cards and one set of service cards.",
    "Groups match each clue to the service that answers it and place the pair on a timeline in investigation order.",
    "Include trap clues, such as an S3 object download with no CloudTrail record, and ask groups to explain why it is missing.",
    "Groups sketch an automated response: which finding triggers an EventBridge rule and what action runs.",
    "The teacher reveals the intended matches and discusses any group that matched GuardDuty to a vulnerability or Config to an API caller."
   ]
  },
  "discussion": [
   "Why do organizations use a delegated administrator account for these services?",
   "What are the trade-offs of enabling CloudTrail data events for every bucket?",
   "Which responses are safe to automate fully, and which should require a human?"
  ],
  "exit": [
   [
    "Which service records who made an API call and from which IP address?",
    "AWS CloudTrail."
   ],
   [
    "Which service finds PII in S3, and which finds CVEs in EC2 and container images?",
    "Amazon Macie for PII in S3; Amazon Inspector for CVEs."
   ],
   [
    "Which service aggregates findings from GuardDuty, Inspector, Macie and Config into one view?",
    "AWS Security Hub."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference strip listing each service with its one question, and let them use it during the card game.",
   "Extend: Ask students to design an organization-wide detection setup for 20 accounts, naming the delegated administrator, organization trail, Config aggregator and the EventBridge rules they would create."
  ]
 },
 {
  "t": "Multi-AZ web tiers: Elastic Load Balancing (ALB vs NLB), Auto Scaling groups and ELB health checks",
  "objectives": [
   "Students will be able to choose between an Application Load Balancer, Network Load Balancer and Gateway Load Balancer from stated requirements.",
   "Students will be able to explain why an Auto Scaling group needs the ELB health check type to replace instances with failed applications.",
   "Students will be able to compare target tracking, step, scheduled and predictive scaling policies.",
   "Students will be able to design a stateless multi-AZ web tier that survives the loss of one Availability Zone."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Draw a Region with three AZs, an ALB and an ASG. Walk through ALB vs NLB vs Gateway Load Balancer with clue words, then explain the two layers of health checks and what each one does when an instance fails."
   ],
   [
    15,
    "Activity",
    "Run the 'Outage Cards' activity in small groups. Circulate and ask each group to justify its load balancer choice by naming the clue word in the card."
   ],
   [
    8,
    "Discuss",
    "Groups share one tricky card each. Use the discussion questions to draw out statelessness, minimum capacity per AZ and sticky sessions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a sticky note and post them by the door."
   ]
  ],
  "warmup": "A load balancer has stopped sending traffic to a broken web server, but the server is still running a day later. Whose job was it to replace it, and why might it not have noticed?",
  "activity": {
   "title": "Outage Cards: pick the load balancer and fix the scaling",
   "materials": "Printed scenario cards (about 8 per group), whiteboard markers, sticky notes, projector showing an ALB and ASG diagram.",
   "steps": [
    "Before class, write 8 short scenario cards, such as 'partner must allowlist two IPs', 'route /api to containers', 'ASG does not replace instances with 500 errors', 'third-party firewall in the path', 'traffic doubles every weekday at 9 a.m.'.",
    "In groups of three or four, students sort each card into one of five columns on a desk or wall: ALB, NLB, Gateway Load Balancer, ASG health check fix, scaling policy choice.",
    "For each card, the group writes the clue word that decided it on a sticky note and attaches it.",
    "Each group picks one card and sketches the full design on the whiteboard, including AZs, minimum capacity and where session data lives.",
    "The teacher reveals the intended answers and groups correct their columns, noting any card they disagree with for discussion."
   ]
  },
  "discussion": [
   "What would you need to change in an application that keeps user sessions in local memory before it can sit behind an Auto Scaling group?",
   "When might sticky sessions still be acceptable, and what do they cost you during scale-in or failover?",
   "If a Region has three AZs, how would you choose the minimum capacity so one AZ failure does not overload the rest?"
  ],
  "exit": [
   [
    "An API must be reached at fixed IP addresses and uses TCP on a custom port. Which load balancer?",
    "A Network Load Balancer, which supports TCP and provides a static IP per AZ."
   ],
   [
    "An ASG keeps instances whose web server has crashed. What setting fixes it?",
    "Set the ASG health check type to ELB so instances failing the load balancer health check are replaced."
   ],
   [
    "Which scaling policy is best for a known daily spike at 8 a.m.?",
    "Scheduled scaling (predictive scaling is also reasonable for recurring patterns)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat card of clue words (ALB: path, host, HTTP; NLB: UDP, static IP, extreme performance) and have them underline the clue word in each scenario before choosing.",
   "Extend: Ask fast finishers to design the health check endpoint itself: what it should test, what it should not test (for example a shared database), and how its result interacts with the grace period and deregistration delay."
  ]
 },
 {
  "t": "Decoupling with Amazon SQS (standard vs FIFO, visibility timeout, dead-letter queues) and SNS fan-out",
  "objectives": [
   "Students will be able to explain how the SQS visibility timeout causes or prevents duplicate processing.",
   "Students will be able to compare SQS standard and FIFO queues and choose one from stated requirements.",
   "Students will be able to configure, in words, a dead-letter queue with a redrive policy and explain its purpose.",
   "Students will be able to design an SNS-to-SQS fan-out for several independent consumers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas about why a message might be processed twice."
   ],
   [
    12,
    "Teach",
    "Draw producer, queue and consumers. Explain receive, visibility timeout and delete as a timeline, then standard vs FIFO, DLQs, long polling and SNS fan-out with filter policies."
   ],
   [
    15,
    "Activity",
    "Run the 'Human Queue' role-play. Pause after each round to ask what went wrong and which setting would fix it."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to connect the role-play to idempotency, FIFO trade-offs and alarms on DLQs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You put a letter in a shared inbox tray for whoever is free. Someone picks it up, gets distracted, and puts it back an hour later. Meanwhile a colleague already handled it. How would you design the tray so that does not happen, without losing letters if someone goes home sick?",
  "activity": {
   "title": "Human Queue: visibility timeouts and dead letters",
   "materials": "Index cards written as messages (one deliberately unreadable), a timer or phone stopwatch, a box labeled Queue, a box labeled DLQ, whiteboard.",
   "steps": [
    "Choose one student as producer, three as consumers, and one as the queue keeper with the Queue box. Each consumer needs a set time to process a card (for example 20 seconds of writing a summary).",
    "Round 1: the queue keeper hides a card for only 10 seconds after handing it out, then puts it back in the box if not returned. Observe duplicates as two consumers end up with the same order.",
    "Round 2: raise the hidden time to 40 seconds and repeat. Students note that duplicates stop unless a consumer 'crashes' (put the card down and walk away).",
    "Round 3: include the unreadable card. After it has been handed out three times without success, the keeper moves it to the DLQ box.",
    "Round 4: the producer reads one event aloud as an SNS announcement, and three separate queue keepers each write it onto their own card, showing fan-out. The class records which SQS or SNS setting each round demonstrated."
   ]
  },
  "discussion": [
   "Why does a well-designed system still need idempotent consumers even with a correct visibility timeout?",
   "When would you pay the throughput cost of a FIFO queue, and when would you not?",
   "Who should be alerted when messages land in a dead-letter queue, and what should they do next?"
  ],
  "exit": [
   [
    "Processing takes 60 seconds and the visibility timeout is 20 seconds. What symptom appears and what is the fix?",
    "Messages are processed more than once; set the visibility timeout above 60 seconds or extend it during processing."
   ],
   [
    "Which queue type guarantees order within a group, and what suffix must its name use?",
    "A FIFO queue, whose name ends in .fifo."
   ],
   [
    "One order event must reach billing, shipping and analytics, each working at its own pace. What design?",
    "Publish to an SNS topic with an SQS queue per service subscribed (fan-out)."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed timeline strip (receive, hidden, delete or reappear) that students fill in with times for each scenario before deciding on the visibility timeout.",
   "Extend: Ask fast finishers to design ordering for a multi-customer system using FIFO message group IDs, and explain how to scale consumers on queue depth without breaking per-customer order."
  ]
 },
 {
  "t": "Event-driven and serverless patterns: EventBridge, Lambda, Step Functions and API Gateway",
  "objectives": [
   "Students will be able to identify when Lambda is and is not appropriate, including the 15-minute limit.",
   "Students will be able to compare EventBridge, SNS and Step Functions and choose among them from requirements.",
   "Students will be able to explain how reserved concurrency and RDS Proxy protect downstream databases.",
   "Students will be able to design a serverless replacement for a scheduled EC2 server."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the cron server on the whiteboard as students describe its jobs."
   ],
   [
    13,
    "Teach",
    "Introduce Lambda limits and concurrency, API Gateway API types, EventBridge rules and Scheduler, and Step Functions Standard vs Express. Project the EventBridge pattern from the lesson and read it aloud together."
   ],
   [
    15,
    "Activity",
    "Run 'Retire the Cron Box' in pairs. Visit pairs and ask which component handles retries and which handles schedules."
   ],
   [
    7,
    "Discuss",
    "Pairs present designs; use the discussion questions to surface anti-patterns."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A server runs all day but only does useful work for 40 minutes at night. List everything you pay for and maintain because of it.",
  "activity": {
   "title": "Retire the Cron Box",
   "materials": "Printed one-page description of a cron server with five jobs (one runs two hours, one waits for human approval, one runs on every upload), sticky notes in four colors, whiteboard.",
   "steps": [
    "Pairs read the job list and assign each job a color: Lambda, Step Functions, EventBridge (Scheduler or rule), or 'not serverless'.",
    "For each job, pairs write the trigger (schedule, S3 upload, API call, AWS event) and the target on the sticky note.",
    "Pairs draw the new architecture on paper with arrows from trigger to target, marking where retries and DLQs live.",
    "Pairs check each job against the 15-minute Lambda limit and move any long job to AWS Batch or ECS on Fargate.",
    "Two pairs swap diagrams and find one weakness in each other's design, such as unlimited concurrency against a database."
   ]
  },
  "discussion": [
   "Why is a chain of Lambda functions calling each other harder to operate than a Step Functions workflow?",
   "When might you still choose SNS over EventBridge for notifications?",
   "What new operational concerns appear when you move from one server to many small serverless pieces?"
  ],
  "exit": [
   [
    "A job runs 40 minutes. Why is Lambda unsuitable, and what could run it?",
    "Lambda stops at 15 minutes; use ECS on Fargate, AWS Batch or EC2."
   ],
   [
    "Which service replaces a cron server for triggering tasks on a schedule?",
    "Amazon EventBridge Scheduler (or an EventBridge scheduled rule)."
   ],
   [
    "How do you stop a bursty Lambda function from overwhelming a database?",
    "Cap it with reserved concurrency and pool connections with RDS Proxy, or buffer with SQS."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching card set with clue phrases ('longer than 15 minutes', 'human approval', 'filter on event content', 'API keys and throttling') to pair with services before starting the design.",
   "Extend: Ask fast finishers to add failure handling to their design: where asynchronous Lambda failures go, how Step Functions retries with backoff, and how EventBridge archive and replay would recover from a bug."
  ]
 },
 {
  "t": "Containers on AWS: ECS vs EKS, and the Fargate vs EC2 launch types",
  "objectives": [
   "Students will be able to distinguish the orchestrator choice (ECS or EKS) from the capacity choice (Fargate or EC2).",
   "Students will be able to select a container platform from requirements such as Kubernetes skills, GPUs or least operational overhead.",
   "Students will be able to explain the difference between the ECS task role and the task execution role.",
   "Students will be able to describe how ECS services and EKS pods scale and receive AWS permissions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record students' answers in two lists: 'who decides where' and 'what it runs on'."
   ],
   [
    12,
    "Teach",
    "Draw a two-by-two grid (ECS/EKS by Fargate/EC2) and fill each cell with when to choose it. Explain ECR, task definitions, services, then the two ECS roles with a failing-deployment story."
   ],
   [
    15,
    "Activity",
    "Run the 'Container Grid' card placement in groups. Prompt groups to name both clues in each card."
   ],
   [
    8,
    "Discuss",
    "Groups defend one disputed placement; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you were shipping boxes for a living, which two separate decisions would you make: who plans the routes, and what trucks carry the boxes? How might those map to running containers?",
  "activity": {
   "title": "Container Grid",
   "materials": "Whiteboard or large paper with a 2x2 grid labeled ECS/EKS and Fargate/EC2, 10 printed requirement cards per group, sticky notes.",
   "steps": [
    "Teacher prepares cards such as 'team already uses Helm charts', 'needs GPUs', 'least operational overhead, no Kubernetes', 'monitoring agent on every host', 'pay only while the task runs'.",
    "Groups place each card in one grid cell and write the orchestrator clue and capacity clue on a sticky note beside it.",
    "Teacher hands each group two 'access denied' cards describing a failing deployment; groups decide whether the task role or execution role needs the permission.",
    "Groups compare their grids with a neighboring group and resolve any differences by pointing to the clue words.",
    "Teacher reveals answers and highlights cards where both cells could be defended."
   ]
  },
  "discussion": [
   "What would make a company with no Kubernetes experience still choose EKS?",
   "When is the EC2 launch type cheaper than Fargate, and what operational work do you accept in return?",
   "Why is it safer to give each pod or task its own IAM role than to use a host's instance role?"
  ],
  "exit": [
   [
    "A team has no Kubernetes experience and wants no servers to manage. Which platform?",
    "Amazon ECS on AWS Fargate."
   ],
   [
    "A container cannot pull its image from ECR. Which role is missing permissions?",
    "The ECS task execution role."
   ],
   [
    "A workload needs GPUs and the team uses Kubernetes. Which platform?",
    "Amazon EKS with EC2 node groups (managed node groups) on GPU instances."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart card with two questions: 'Does the requirement mention Kubernetes or portability?' then 'Does it need GPUs, host agents or host control?' Students answer each before placing a card.",
   "Extend: Ask fast finishers to design scaling for an ECS service on EC2: how Service Auto Scaling changes task count while a capacity provider changes instance count, and what happens if one scales without the other."
  ]
 },
 {
  "t": "Relational database resilience: RDS Multi-AZ, read replicas, Aurora replicas and Aurora Global Database",
  "objectives": [
   "Students will be able to distinguish RDS Multi-AZ, read replicas, Aurora Replicas and Aurora Global Database by purpose.",
   "Students will be able to explain the effect of synchronous versus asynchronous replication on failover and replica lag.",
   "Students will be able to select the right relational resilience feature from availability, read scaling and Regional DR requirements.",
   "Students will be able to describe how Aurora endpoints route writes and reads."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and tally votes for each feature before teaching."
   ],
   [
    13,
    "Teach",
    "Draw three columns: availability, read scaling, Regional DR. Place each feature, explain synchronous vs asynchronous replication, manual vs automatic promotion, and Aurora's cluster and reader endpoints."
   ],
   [
    15,
    "Activity",
    "Run 'Three Worries' in groups with scenario cards. Ask each group to state which of the three questions each card answers."
   ],
   [
    7,
    "Discuss",
    "Revisit the warm-up votes and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Month-end reports are slowing down a production database. A teammate suggests enabling Multi-AZ. Vote: will it help, hurt or change nothing for performance? Be ready to say why.",
  "activity": {
   "title": "Three Worries: match the database feature",
   "materials": "Printed scenario cards (8 per group), three large labeled sheets (Server fails, Too many reads, Region fails), markers, projector with an Aurora cluster diagram.",
   "steps": [
    "Groups read each scenario card, for example 'reports slow checkout', 'AZ outage caused downtime', 'RPO of seconds across Regions', 'need reads and automatic failover with up to 15 readers'.",
    "Groups place each card on the sheet for the worry it describes, then write the feature that solves it on the card.",
    "For each card, groups note whether replication is synchronous or asynchronous and whether failover is automatic or manual.",
    "Teacher projects the Aurora diagram; groups label the cluster endpoint and reader endpoint and decide where each scenario's queries go.",
    "Groups swap one card with another group and check each other's answers against the clue words in the lesson."
   ]
  },
  "discussion": [
   "Why can't a synchronous standby in another Region be used for every database?",
   "What application changes are needed when you introduce read replicas?",
   "When would cross-Region read replicas still be a reasonable DR choice instead of Aurora Global Database?"
  ],
  "exit": [
   [
    "Which feature gives automatic failover in RDS without serving reads?",
    "Multi-AZ (classic DB instance deployment) with a synchronous standby."
   ],
   [
    "Why must read-after-write queries go to the primary when using read replicas?",
    "Replication is asynchronous, so replicas may lag behind recent writes."
   ],
   [
    "Which option meets a relational cross-Region DR requirement with an RPO of seconds?",
    "Aurora Global Database."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row table (Purpose, Replication type, Failover) to fill in for each feature before attempting the scenarios.",
   "Extend: Ask fast finishers to design a two-Region architecture for a global app using Aurora Global Database, including where writes go, how local reads are served and what the failover runbook would include."
  ]
 },
 {
  "t": "DynamoDB resilience: global tables, point-in-time recovery and on-demand backups",
  "objectives": [
   "Students will be able to explain why DynamoDB global tables provide Regional resilience but not protection from bad writes.",
   "Students will be able to compare point-in-time recovery, on-demand backups and AWS Backup for DynamoDB.",
   "Students will be able to describe what happens during and after a DynamoDB restore.",
   "Students will be able to choose the right DynamoDB resilience feature from a stated risk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let two or three students argue each side."
   ],
   [
    12,
    "Teach",
    "Draw one table in one Region spread across AZs, then add global table replicas. Introduce the two separate risks (Region failure, bad writes) and map PITR, on-demand backups, AWS Backup, Streams and TTL to them."
   ],
   [
    15,
    "Activity",
    "Run 'Incident Timeline' in pairs. Check that pairs remember restores create a new table."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to compare replication and backup."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your data is copied live to three Regions. Someone deletes it by mistake. Is it safe? Argue yes or no in one sentence.",
  "activity": {
   "title": "Incident Timeline",
   "materials": "Printed incident timeline handout (times of a bad deploy, detection and response), sticky notes, whiteboard, projector showing the PITR CLI command from the lesson.",
   "steps": [
    "Pairs read a timeline: PITR enabled last month, global table in two Regions, bad deploy at 14:05 overwrites items, detection at 14:30.",
    "Pairs mark on the timeline the restore point they would choose and explain why it is one minute before the bad deploy.",
    "Pairs list every step after the restore: new table name, settings to reconfigure (auto scaling, alarms, IAM, tags, Streams, TTL), and how to copy items back or repoint the app.",
    "Teacher changes one fact (PITR was never enabled, or the incident was 60 days ago) and pairs decide what can still be recovered and from where.",
    "Pairs write one sentence explaining which risk the global table covered in this story and which it did not."
   ]
  },
  "discussion": [
   "Why might a team copy restored items back into the live table instead of switching the app to the restored table?",
   "What could go wrong with last writer wins, and how does routing users to one Region reduce conflicts?",
   "Should every production DynamoDB table have PITR enabled? What are the arguments against?"
  ],
  "exit": [
   [
    "A global table spread a bad update to every Region. What recovers the data?",
    "Point-in-time recovery (or an earlier backup), restored to a new table."
   ],
   [
    "How long can PITR restore back to?",
    "Any second within its recovery window, up to 35 days."
   ],
   [
    "Which option fits backups kept for years in another account?",
    "On-demand backups managed by AWS Backup with cross-account copies."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column chart, 'Region outage' and 'Bad write', and have them place each feature in a column before the activity.",
   "Extend: Ask fast finishers to design an audit trail using DynamoDB Streams and Lambda, and explain how it would help locate the exact time of a bad write before a PITR restore."
  ]
 },
 {
  "t": "Route 53 routing policies and health checks: failover, weighted, latency, geolocation and multivalue",
  "objectives": [
   "Students will be able to match Route 53 routing policies to requirements such as performance, legal restriction, canary release and active-passive DR.",
   "Students will be able to explain why alias records are used at the zone apex.",
   "Students will be able to describe how health checks, including CloudWatch alarm-based checks, affect DNS answers.",
   "Students will be able to explain how TTL affects failover speed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board."
   ],
   [
    12,
    "Teach",
    "Present each routing policy with one clue phrase, then alias records, health checks and TTL. Project the latency record example and read it aloud."
   ],
   [
    15,
    "Activity",
    "Run the 'DNS Concierge' role-play in groups of four. Rotate who plays Route 53 each round."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions; revisit the warm-up list and correct it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "When you type a website name, who decides which server you reach? Could two people typing the same name get different answers? Why would a company want that?",
  "activity": {
   "title": "DNS Concierge",
   "materials": "Printed 'user' cards (location, time, which server is healthy), printed 'policy' cards, a whiteboard showing two Regions and a static backup site.",
   "steps": [
    "One student per group plays Route 53 and draws a policy card (failover, weighted 90/10, latency, geolocation with default, multivalue).",
    "Other students draw user cards and ask 'where is www.example.com?'; Route 53 must answer according to the policy and the health status shown on the board.",
    "The teacher marks one server unhealthy mid-round; Route 53 adjusts answers, and the group discusses users who still hold the old answer because of TTL.",
    "Groups rotate roles and repeat with a new policy card.",
    "Each group writes one requirement sentence per policy that would make it the best answer on the exam."
   ]
  },
  "discussion": [
   "Why is geolocation routing, not latency routing, the right tool for licensing restrictions?",
   "What are the trade-offs of setting a very low TTL during a migration?",
   "Why is multivalue answer routing not a replacement for a load balancer?"
  ],
  "exit": [
   [
    "Which routing policy restricts content by the user's country?",
    "Geolocation routing, with a default record for unmatched locations."
   ],
   [
    "How do you point the zone apex at an ALB?",
    "Use a Route 53 alias record."
   ],
   [
    "Why might users reach a failed primary for minutes after failover?",
    "Resolvers cache the previous answer until the record's TTL expires."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page table pairing each policy with a single clue phrase and a one-line example to use during the role-play.",
   "Extend: Ask fast finishers to design a nested policy: failover between two Regions where each Region uses weighted records for a canary release, and explain which health checks each level uses."
  ]
 },
 {
  "t": "Disaster recovery strategies: backup and restore, pilot light, warm standby and multi-site active-active, matched to RPO and RTO",
  "objectives": [
   "Students will be able to define RPO and RTO and explain how they drive DR cost.",
   "Students will be able to order and describe the four AWS DR strategies from cheapest to fastest.",
   "Students will be able to distinguish pilot light from warm standby and warm standby from active-active.",
   "Students will be able to select a DR strategy for a workload from its stated RPO, RTO and budget."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and collect answers about what 'down' and 'lost data' would cost each example system."
   ],
   [
    12,
    "Teach",
    "Draw a horizontal line from cheap/slow to expensive/fast and place the four strategies on it. For each, state what runs in the recovery Region, typical RPO and RTO, and the failover steps."
   ],
   [
    15,
    "Activity",
    "Run 'DR Budget Board' in groups. Ask groups to defend any workload placed at active-active."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, especially on testing and ransomware."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Name one app you use daily. If it went offline for a day, what would happen? If it lost the last hour of your data, what would happen? Which bothers you more?",
  "activity": {
   "title": "DR Budget Board",
   "materials": "Printed workload cards with RPO, RTO and business notes (8 per group), a long strip of paper or whiteboard line labeled with the four strategies, play-money tokens or sticky notes representing a fixed budget.",
   "steps": [
    "Each group receives a fixed budget of 20 tokens. Backup and restore costs 1, pilot light 2, warm standby 4, active-active 8 per workload.",
    "Groups place each workload card under the cheapest strategy that still meets its RPO and RTO.",
    "Groups total their tokens; if over budget, they must justify any upgrade or downgrade with the numbers on the card.",
    "For two of their workloads, groups write the failover runbook steps in order (for example promote database, scale group, switch DNS).",
    "The teacher announces a ransomware scenario; groups decide what extra protection each strategy needs beyond replication."
   ]
  },
  "discussion": [
   "Why might a business accept a long RTO but insist on a short RPO, or the reverse?",
   "What could go wrong in a pilot light failover that a warm standby would have exposed earlier?",
   "How often should a DR plan be tested, and who should take part?"
  ],
  "exit": [
   [
    "Define RPO and RTO.",
    "RPO is the maximum acceptable data loss measured in time; RTO is the maximum acceptable downtime."
   ],
   [
    "Which strategy keeps only the data tier running in the recovery Region?",
    "Pilot light."
   ],
   [
    "A workload needs near-zero RTO and RPO and serves users from several Regions. Which strategy?",
    "Multi-site active-active."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card listing, for each strategy, what is running in the recovery Region and a rough RTO band, to use while placing workload cards.",
   "Extend: Ask fast finishers to design the DNS and data layer for a warm standby, naming the Route 53 policy, the database replication service and the quota and AMI checks required in the recovery Region."
  ]
 },
 {
  "t": "Backup and replication: AWS Backup plans, S3 Cross-Region Replication, EBS snapshot and AMI copies, AWS Elastic Disaster Recovery",
  "objectives": [
   "Students will be able to describe how AWS Backup plans, vaults and Vault Lock provide centralized, immutable backups.",
   "Students will be able to explain the requirements and limits of S3 Cross-Region Replication, including versioning and existing objects.",
   "Students will be able to explain why AMIs and snapshots must be copied to a recovery Region.",
   "Students will be able to choose between AWS Backup, S3 replication, AMI copies and Elastic Disaster Recovery for a given requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and list student answers about where their own important files are backed up."
   ],
   [
    12,
    "Teach",
    "Walk through AWS Backup plans and vaults, then S3 CRR rules and limits, then snapshots and AMIs, then Elastic Disaster Recovery. Project the copy-image command and point out the source Region, target Region and encryption flag."
   ],
   [
    15,
    "Activity",
    "Run 'Audit Checklist' in groups. Ask each group which tool covers each auditor item."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to compare replication with backup."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Where are your photos backed up? If you deleted one by accident, would the backup still have it? What if the backup simply mirrors your phone?",
  "activity": {
   "title": "Audit Checklist",
   "materials": "Printed auditor checklist (8 requirements), printed tool cards (AWS Backup, Vault Lock, CRR, Batch Replication, AMI copy, Data Lifecycle Manager, Recycle Bin, Elastic Disaster Recovery), tape, whiteboard.",
   "steps": [
    "Groups read the auditor checklist, for example 'daily backups of all prod databases', 'copies in another Region', 'nobody can delete early', 'old S3 objects copied too', 'on-premises servers back within one hour'.",
    "Groups tape the matching tool card beside each requirement and write the configuration detail that makes it work (tag, copy rule, versioning, agent).",
    "Groups identify one requirement that two tools could satisfy and decide which has less operational effort.",
    "Teacher reveals a surprise finding: an AMI was never copied to the recovery Region. Groups add a fix and a way to automate it.",
    "Groups present their completed checklist in one minute each."
   ]
  },
  "discussion": [
   "Why is replication not a substitute for backups?",
   "What are the risks of an immutable vault, and how would you decide its retention period?",
   "When would Elastic Disaster Recovery be a better fit than rebuilding servers from AMIs?"
  ],
  "exit": [
   [
    "What must be enabled on both buckets for S3 CRR?",
    "Versioning."
   ],
   [
    "How do you protect backups from deletion even by administrators?",
    "Store them in an AWS Backup vault with Vault Lock enabled."
   ],
   [
    "Which service continuously replicates on-premises servers for recovery in AWS within minutes?",
    "AWS Elastic Disaster Recovery."
   ]
  ],
  "differentiation": [
   "Support: Provide a table with three columns (Protects what, Copies where, Key requirement) partly filled in for each tool, to complete before the activity.",
   "Extend: Ask fast finishers to design an organization-wide backup policy using AWS Organizations, including tag conventions, cross-account copies, Vault Lock and how Backup Audit Manager would report compliance."
  ]
 },
 {
  "t": "Resilient hybrid networking: Site-to-Site VPN, Direct Connect with VPN backup, and Transit Gateway",
  "objectives": [
   "Students will be able to compare Site-to-Site VPN and Direct Connect on setup time, cost, bandwidth, consistency and encryption.",
   "Students will be able to design Direct Connect resilience at the cost-effective and maximum levels.",
   "Students will be able to explain why VPC peering is not transitive and when Transit Gateway is the better choice.",
   "Students will be able to identify the role of BGP in automatic failover between hybrid links."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the company's single link on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Compare VPN and Direct Connect in a two-column table, explain VIF types, then draw resilience levels: single link, Direct Connect plus VPN, two locations. Finish with peering vs Transit Gateway."
   ],
   [
    15,
    "Activity",
    "Run 'Cut the Cable' whiteboard design in groups. The teacher 'cuts' links with an eraser and groups trace the new path."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions to weigh cost against resilience."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your office has one internet connection, and a backhoe cuts it. What stops working? What would you have needed to keep working, and what would it cost?",
  "activity": {
   "title": "Cut the Cable",
   "materials": "Whiteboard, colored markers (one color per link type), eraser, printed requirement cards (budget, deadline, number of VPCs, encryption need).",
   "steps": [
    "Each group draws a data center, a Direct Connect location, and AWS with several VPCs, then draws an initial design that meets its requirement card.",
    "The teacher erases one link at a time (a Direct Connect circuit, a whole Direct Connect location, one VPN tunnel); groups trace whether traffic still flows and which path BGP would choose.",
    "Groups revise their design after each cut and note the added cost in words (for example 'second location: higher cost').",
    "Groups replace any peering meshes with a Transit Gateway and label route tables separating production and non-production.",
    "Each group labels where encryption happens in its final design (IPsec or MACsec)."
   ]
  },
  "discussion": [
   "When is a VPN backup 'good enough' for a Direct Connect link, and when is it not?",
   "Why might a company still choose Direct Connect over a VPN even though it takes weeks to set up?",
   "What problems does Transit Gateway solve beyond the number of connections?"
  ],
  "exit": [
   [
    "A team needs encrypted connectivity to AWS within two days at low cost. What do you choose?",
    "AWS Site-to-Site VPN."
   ],
   [
    "What is the most cost-effective way to add resilience to a single Direct Connect connection?",
    "Add a Site-to-Site VPN as a backup path with BGP failover."
   ],
   [
    "Twenty VPCs and an on-premises network need centralized routing. Which service?",
    "AWS Transit Gateway."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn diagram with labeled boxes so struggling students only add links and arrows, plus a cue card listing the three resilience levels.",
   "Extend: Ask fast finishers to design increased VPN bandwidth using multiple tunnels with ECMP on a Transit Gateway, and explain when this could be preferred over waiting for Direct Connect."
  ]
 },
 {
  "t": "Infrastructure as code and service quotas: CloudFormation, StackSets and planning for limits and throttling",
  "objectives": [
   "Students will be able to explain how CloudFormation templates, change sets, drift detection and DeletionPolicy support repeatable, safe infrastructure.",
   "Students will be able to identify when StackSets are the right way to deploy across accounts and Regions.",
   "Students will be able to explain why service quotas must be planned in a recovery Region.",
   "Students will be able to recommend fixes for API throttling, including exponential backoff with jitter."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and record what students think could go wrong in a hand-built rebuild."
   ],
   [
    12,
    "Teach",
    "Project the CloudFormation snippet from the lesson and explain each line, then change sets, drift, DeletionPolicy and StackSets. Close with quotas per Region and throttling with backoff."
   ],
   [
    15,
    "Activity",
    "Run 'DR Drill Postmortem' in groups. Prompt groups to assign one feature to every failure."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to connect IaC habits to resilience."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you had to rebuild your company's whole AWS environment in another Region from memory tonight, what would you forget first?",
  "activity": {
   "title": "DR Drill Postmortem",
   "materials": "Printed drill log handout with timestamped failures (quota error, drifted security group, throttling errors, deleted database, inconsistent accounts), sticky notes, whiteboard, projector.",
   "steps": [
    "Groups read the drill log, which lists six failures with timestamps and error messages such as 'vCPU limit exceeded' and 'ThrottlingException'.",
    "For each failure, groups write on a sticky note the root cause and the AWS feature that would have prevented it (Service Quotas increase, drift detection, backoff with jitter, DeletionPolicy, StackSets, change set).",
    "Groups arrange the sticky notes on the whiteboard as a 'before the next drill' checklist in priority order.",
    "Each group writes one line of template YAML (in plain words or code) that would have prevented the database deletion.",
    "Groups compare checklists and agree on the top three actions for the whole class."
   ]
  },
  "discussion": [
   "What team habits are needed for infrastructure as code to stay accurate over time?",
   "Why might a company deliberately keep some quotas low in non-production accounts?",
   "How does exponential backoff with jitter help the service as well as the client?"
  ],
  "exit": [
   [
    "Which feature deploys one template to every account in an OU, including new ones?",
    "CloudFormation StackSets with service-managed permissions in AWS Organizations."
   ],
   [
    "How do you preview whether a stack update will replace a database?",
    "Create and review a change set before executing the update."
   ],
   [
    "The recovery Region cannot launch enough instances during failover. What should have been done?",
    "Request service quota increases in the recovery Region in advance and monitor usage with alarms."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching sheet pairing each failure message in the drill log with a short list of possible features, to narrow choices before the group discussion.",
   "Extend: Ask fast finishers to outline a StackSet rollout plan with deployment options (concurrent accounts, failure tolerance, Region order) and explain how they would roll back a bad baseline change."
  ]
 },
 {
  "t": "EC2 instance families and placement groups (cluster, spread, partition), and enhanced networking with ENA and EFA",
  "objectives": [
   "Students will be able to decode an EC2 instance type name and match a workload to the general purpose, compute, memory, storage or accelerated family.",
   "Students will be able to compare cluster, spread and partition placement groups, including the seven-instances-per-AZ limit on spread groups.",
   "Students will be able to explain the difference between ENA and EFA and identify when EFA is required.",
   "Students will be able to recommend a placement group and network option for an HPC, critical-instance or big data scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write `r7g.2xlarge` and `c6in.large` on the board. Ask pairs to guess what each letter and number means, then reveal the family, generation, attributes and size."
   ],
   [
    12,
    "Teach",
    "Walk through the five families with one workload each. Draw three diagrams of racks for cluster, spread and partition groups, marking the AZ boundary. Contrast ENA and EFA, stressing operating system bypass for MPI and NCCL."
   ],
   [
    18,
    "Activity",
    "Run the 'Seat the workload' card sort described below, then have each group defend one of its harder placements to the class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface the resilience trade-off of cluster groups and when cost beats raw performance."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your team has a choice: put all your servers in one room so they talk faster, or spread them across buildings so a fire cannot reach them all. When would you choose each?",
  "activity": {
   "title": "Seat the workload",
   "materials": "Printed scenario cards (about 12), a whiteboard divided into columns labeled Cluster, Spread, Partition and No placement group, and a second row labeled ENA and EFA; sticky notes and markers.",
   "steps": [
    "Prepare cards such as 'MPI weather model on 64 nodes', 'three license servers that must not share hardware', 'Kafka cluster of 60 brokers', 'web fleet of 40 instances behind a load balancer', 'GPU training job across 16 nodes' and 'in-memory cache on one node'.",
    "In groups of three, students place each card in a placement column and add a sticky note naming the instance family and whether ENA alone or EFA is needed.",
    "Each group must write one sentence justifying any card placed in Spread, checking it against the seven-instances-per-AZ limit.",
    "The teacher reviews the board, moving misplaced cards and asking the group to explain the correction aloud.",
    "Close by asking which cards were in a single AZ and what the team would do to protect those workloads."
   ]
  },
  "discussion": [
   "When is it acceptable to put a production workload in a single AZ cluster placement group, and what would you require alongside it?",
   "Graviton instances often cost less for the same work. What would you check before recommending a move from an Intel-based type?"
  ],
  "exit": [
   [
    "A 40-node HDFS cluster must keep replicas on different racks. Which placement group?",
    "A partition placement group, which puts each partition on separate racks and suits large replicated systems."
   ],
   [
    "What feature does EFA add beyond ENA?",
    "Operating system bypass, letting MPI or NCCL applications talk to the network hardware directly for very low, consistent latency."
   ],
   [
    "Which family fits an in-memory database, and which fits GPU training?",
    "Memory optimized (such as R or X) for the in-memory database, and accelerated computing (such as P or G) for GPU training."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference card listing each family letter with an everyday workload and a three-row table of the placement strategies with one keyword each (close, apart, sections) before the card sort.",
   "Extend: Ask fast finishers to design a two-tier system where an HPC job runs in a cluster group with EFA and a metadata database runs elsewhere, then explain how they would checkpoint and recover if the cluster's AZ failed."
  ]
 },
 {
  "t": "EBS volume types and instance store: gp3 vs io2 Block Express vs st1 and sc1",
  "objectives": [
   "Students will be able to distinguish SSD volume types measured in IOPS from HDD volume types measured in throughput.",
   "Students will be able to compare gp3, gp2, io2 Block Express, st1, sc1 and instance store by performance model, cost and durability.",
   "Students will be able to select the correct block storage for boot, database, sequential and temporary workloads.",
   "Students will be able to explain how to change a volume type or IOPS in place and how to move data across AZs with snapshots."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the board under 'many small jobs' and 'one big job'."
   ],
   [
    12,
    "Teach",
    "Present SSD versus HDD, then each volume type with one workload. Emphasize gp3's size-independent baseline, the non-bootable HDD types, Multi-Attach for io1 and io2, and that instance store survives only reboots."
   ],
   [
    18,
    "Activity",
    "Run the 'Volume matchmaker' exercise below in pairs, then have pairs swap and grade another pair's answers."
   ],
   [
    5,
    "Discuss",
    "Discuss when io2 is worth the cost and why instance store is still useful despite losing data."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Think of a cashier handling many tiny purchases and a truck moving one huge load. Which kinds of computer work look like each?",
  "activity": {
   "title": "Volume matchmaker",
   "materials": "A projector or printed handout with eight workload descriptions and a short excerpt of monitoring values (queue length, burst balance, CPU), plus a whiteboard for answers.",
   "steps": [
    "Show eight workloads, for example: Linux boot disk, Oracle database needing sustained very high IOPS, nightly log scan of terabytes, rarely read archive extracts, cache that can be rebuilt, clustered app sharing one volume in one AZ, small web server, and a gp2 volume out of burst credits.",
    "Pairs choose a volume type for each and write a one-line reason that names the deciding clue, such as 'sequential' or 'can be lost'.",
    "For the gp2 case, pairs read the monitoring excerpt and decide whether the bottleneck is the volume or the CPU, then propose an in-place fix with Elastic Volumes.",
    "Pairs swap sheets and mark each other's answers using the teacher's key projected on the board.",
    "The teacher highlights the most common wrong pick and asks a volunteer to explain why it fails."
   ]
  },
  "discussion": [
   "If gp3 can be provisioned with extra IOPS, what requirements would still push you to io2 Block Express?",
   "Why might a well-designed distributed database deliberately use instance store instead of EBS?"
  ],
  "exit": [
   [
    "Which volume types cannot be used as boot volumes?",
    "The HDD types, st1 and sc1."
   ],
   [
    "What happens to instance store data when the instance is stopped and started?",
    "It is lost; instance store survives only a reboot."
   ],
   [
    "A web server needs a boot volume at the lowest cost with solid baseline performance. Which type?",
    "gp3, which gives a 3,000 IOPS and 125 MB/s baseline regardless of size."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat sheet (SSD: gp3, io2 / HDD: st1, sc1) with one keyword per type and let struggling students use it during the matchmaker activity.",
   "Extend: Ask fast finishers to design storage for a three-tier app with a boot volume, a database, a log archive and a cache, then explain how they would back up each tier and restore the database into a second AZ."
  ]
 },
 {
  "t": "Shared file systems: Amazon EFS vs FSx for Windows File Server, FSx for Lustre and FSx for NetApp ONTAP",
  "objectives": [
   "Students will be able to identify the protocol and operating system served by EFS, FSx for Windows File Server, FSx for Lustre and FSx for NetApp ONTAP.",
   "Students will be able to select the right shared file system from scenario clues such as SMB, Active Directory, HPC, S3 integration or multi-protocol access.",
   "Students will be able to explain EFS mount targets, the port 2049 security group rule and the difference between Lustre scratch and persistent deployments.",
   "Students will be able to justify why S3 or EBS is not a substitute for a shared file system in a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers, steering toward the idea that Windows and Linux share files differently."
   ],
   [
    12,
    "Teach",
    "Present each service with its protocol, typical client and one signature feature. Draw an EFS diagram with a mount target in each AZ and a security group arrow labeled 2049."
   ],
   [
    18,
    "Activity",
    "Run the 'Help desk triage' role-play below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Discuss the open questions, focusing on when a migration should keep its existing protocol."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your office has Windows laptops and Linux servers that all need the same project folder. What could go wrong if you set up one shared drive without asking who will use it?",
  "activity": {
   "title": "Help desk triage",
   "materials": "Printed ticket cards (eight to ten) written as user complaints or requests, a whiteboard with five columns (EFS, FSx for Windows, FSx for Lustre, FSx for NetApp ONTAP, Not a file system), and markers.",
   "steps": [
    "Prepare tickets such as 'our Windows app needs NTFS permissions from AD', 'ML training must read S3 data as files fast', 'Linux web servers across AZs share uploads', 'we run NetApp on premises and need SnapMirror', 'new AZ instances cannot mount the share' and 'we want to store images served by URL'.",
    "In each group, one student reads a ticket as the user, one acts as the architect who chooses the service, and one acts as the reviewer who checks the choice against the protocol clue.",
    "Groups post each ticket in a column and write the deciding clue on a sticky note beside it.",
    "For the 'cannot mount' ticket, groups write the two most likely causes and the fix.",
    "The teacher walks the board, resolving disagreements and asking groups to explain any ticket placed under 'Not a file system'."
   ]
  },
  "discussion": [
   "When a company moves Windows file shares to AWS, why does keeping SMB and Active Directory permissions matter more than raw performance?",
   "FSx for Lustre can link to S3. When would you still keep data in S3 and only use Lustre temporarily?"
  ],
  "exit": [
   [
    "Which service gives Linux instances in several AZs a shared, elastic NFS file system?",
    "Amazon EFS, mounted through a mount target in each AZ."
   ],
   [
    "A Windows application needs SMB shares with Active Directory permissions. Which service?",
    "Amazon FSx for Windows File Server."
   ],
   [
    "What is the difference between FSx for Lustre scratch and persistent deployments?",
    "Scratch does not replicate data and suits temporary jobs; persistent replicates within an AZ for longer-running work."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision card with two questions to ask first, 'Which operating system?' and 'Is speed for hundreds of nodes the main need?', and let them use it during triage.",
   "Extend: Ask fast finishers to design storage for a company with Linux, Windows and macOS users sharing one data set plus a disaster recovery copy, then compare FSx for NetApp ONTAP with running separate EFS and FSx for Windows file systems."
  ]
 },
 {
  "t": "S3 performance: prefixes, multipart upload, byte-range fetches and S3 Transfer Acceleration",
  "objectives": [
   "Students will be able to state S3's per-prefix request rates and explain how spreading keys across prefixes increases throughput.",
   "Students will be able to explain when multipart upload is recommended or required and why incomplete uploads need a lifecycle rule.",
   "Students will be able to compare byte-range fetches, Transfer Acceleration and CloudFront for download and long-distance scenarios.",
   "Students will be able to diagnose a 503 Slow Down scenario and recommend a design and retry fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a failed large download and collect strategies people use at home."
   ],
   [
    12,
    "Teach",
    "Present per-prefix rates with a worked key example, then multipart upload, byte-range fetches and Transfer Acceleration. Show the CLI command and the accelerate endpoint on the projector."
   ],
   [
    18,
    "Activity",
    "Run the 'Fix the pipeline' scenario stations below in small groups."
   ],
   [
    5,
    "Discuss",
    "Discuss the open questions, especially when CloudFront beats S3 tuning."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are downloading a huge file at home and it fails at 95 percent. What would you wish the download tool could do instead of starting over?",
  "activity": {
   "title": "Fix the pipeline",
   "materials": "Four printed scenario sheets placed at stations around the room, each with a short log or metric excerpt; sticky notes and a whiteboard summary grid.",
   "steps": [
    "Station A shows an ingest service logging `503 Slow Down` for keys all starting with `2026-10-06/`. Groups redesign the key scheme and name the client retry behavior.",
    "Station B shows a 30 GB upload from another continent failing near the end. Groups choose features and explain the cost of abandoned parts.",
    "Station C shows a service that needs only the header of each large file. Groups pick the download feature and describe the HTTP header used.",
    "Station D shows thousands of users repeatedly downloading the same product images. Groups decide whether to tune S3 or add another service.",
    "Groups rotate every four minutes, posting one sticky note per station, then the teacher reviews each station's notes with the class."
   ]
  },
  "discussion": [
   "Why might AWS have changed its advice from random key prefixes to simply using more meaningful prefixes?",
   "How would you prove Transfer Acceleration is worth paying for before rolling it out to every office?"
  ],
  "exit": [
   [
    "What request rates does S3 support per prefix?",
    "At least 3,500 PUT, COPY, POST or DELETE and 5,500 GET or HEAD requests per second per prefix."
   ],
   [
    "Above what object size is multipart upload required?",
    "Above 5 GB, the maximum for a single PUT; it is recommended from about 100 MB."
   ],
   [
    "Users near the bucket's Region ask for Transfer Acceleration. Is it a good recommendation?",
    "Usually not; it helps long-distance transfers through edge locations and the AWS backbone, so nearby users gain little."
   ]
  ],
  "differentiation": [
   "Support: Give students a four-row table pairing each symptom (503 errors, failing large uploads, needing part of a file, distant users) with its feature, and have them fill in the reason column during the activity.",
   "Extend: Ask fast finishers to calculate how many prefixes an ingest service writing 20,000 objects per second would need at minimum, then design a key naming scheme that also keeps data easy to query by date."
  ]
 },
 {
  "t": "Caching: ElastiCache for Redis vs Memcached, DynamoDB Accelerator (DAX), lazy loading vs write-through",
  "objectives": [
   "Students will be able to compare ElastiCache for Redis OSS or Valkey with ElastiCache for Memcached on replication, persistence and data types.",
   "Students will be able to identify when DynamoDB Accelerator (DAX) is the correct caching answer and what it does not accelerate.",
   "Students will be able to contrast lazy loading and write-through caching and explain how a TTL limits stale data.",
   "Students will be able to apply a caching strategy to a scenario that mixes rarely changing and frequently changing data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers about things people keep close at hand."
   ],
   [
    12,
    "Teach",
    "Contrast Redis OSS or Valkey with Memcached in a two-column table, introduce DAX and its limits, then walk through the lazy loading code on the projector and compare it with write-through."
   ],
   [
    18,
    "Activity",
    "Run the 'Human cache' role-play below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect hit ratio and staleness to design choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What do you keep within arm's reach at your desk or in your kitchen, and what happens when the thing you keep close goes out of date?",
  "activity": {
   "title": "Human cache",
   "materials": "Index cards with key-value pairs (for example product names and prices), a whiteboard acting as the database, a small table at the front acting as the cache, and a timer.",
   "steps": [
    "Assign roles: one student is the database at the whiteboard (slow: must walk to the board to look things up), one is the cache at the front table, and several are application requests holding question cards.",
    "Round 1, lazy loading: requests ask the cache; on a miss the cache walks to the database, writes the answer on a card and keeps it. The class counts hits and misses.",
    "The teacher changes a price on the whiteboard. Requests ask again and the class notices the stale card. Add a TTL by having the cache discard cards after two minutes.",
    "Round 2, write-through: every time the teacher updates the board, the database student also updates the cache card. The class notes the extra work on each write and the unused cards that pile up.",
    "Groups summarize on the board which round had fresher data, which had fewer cards, and which service (Redis OSS, Memcached or DAX) they would pick if the cache table might 'break'."
   ]
  },
  "discussion": [
   "Which data in an online store would you lazy load, which would you write through, and which would you never cache at all?",
   "When would a read replica be a better answer than a cache?"
  ],
  "exit": [
   [
    "Which ElastiCache engine supports sorted sets, replication and Multi-AZ failover?",
    "ElastiCache for Redis OSS (or Valkey); Memcached does not."
   ],
   [
    "What is the main risk of lazy loading, and how do you limit it?",
    "Stale data, because the cache refreshes only on a miss; set a TTL so items expire and reload."
   ],
   [
    "Does DAX speed up strongly consistent reads?",
    "No. Strongly consistent reads pass through to DynamoDB; DAX accelerates eventually consistent reads."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart with three questions: 'Is the database DynamoDB?', 'Must the cache survive a node failure or use sorted sets?', and 'Is simple key-value enough?', leading to DAX, Redis OSS or Valkey, and Memcached.",
   "Extend: Ask fast finishers to write pseudocode for a write-through update path alongside the lazy loading read path, and explain what happens if the cache write succeeds but the database write fails."
  ]
 },
 {
  "t": "Content delivery and global networking: CloudFront caching and TTLs vs AWS Global Accelerator",
  "objectives": [
   "Students will be able to explain how CloudFront caching works, including cache keys, cache policies, TTLs and invalidations.",
   "Students will be able to describe how AWS Global Accelerator uses two static anycast IP addresses and the AWS backbone to route TCP and UDP traffic.",
   "Students will be able to choose between CloudFront and Global Accelerator from scenario clues such as caching, UDP, static IP addresses and fast multi-Region failover.",
   "Students will be able to recommend ways to raise a cache hit ratio and handle stale content after a deployment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the student answers as a map with a far-away warehouse and nearby shops."
   ],
   [
    12,
    "Teach",
    "Explain CloudFront edge caching, the cache key and TTL settings, OAC for private S3 buckets, and invalidations versus versioned names. Then explain Global Accelerator's static anycast IPs, traffic dials and fast failover, and contrast it with Route 53 latency routing."
   ],
   [
    18,
    "Activity",
    "Run the 'Edge or accelerator' scenario debate below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore combining both services."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a popular book is requested by thousands of people in another city, what are two ways a library could get it to them faster?",
  "activity": {
   "title": "Edge or accelerator",
   "materials": "Ten printed scenario cards, two signs reading CloudFront and Global Accelerator posted on opposite walls, and a whiteboard for recording the deciding clue.",
   "steps": [
    "Read a scenario aloud, for example 'UDP voice app needs two static IPs', 'images served to global readers', 'API in two Regions must fail over in seconds', 'private S3 videos only through the CDN', or 'readers see old CSS after a release'.",
    "Students walk to the wall of the service they choose. Two volunteers, one from each side, give a 30-second argument for their choice.",
    "The class names the single deciding clue, and the teacher writes it on the board under the correct service.",
    "For caching scenarios, pairs write one change that would raise the cache hit ratio, such as trimming the cache key or longer TTLs for static assets.",
    "Finish with a scenario where both services fit together, and ask students to draw the combined path from user to origin."
   ]
  },
  "discussion": [
   "When might a company use CloudFront and Global Accelerator together in one architecture?",
   "Why do versioned file names make deployments safer than invalidations?"
  ],
  "exit": [
   [
    "Which service provides two static anycast IP addresses and supports UDP?",
    "AWS Global Accelerator."
   ],
   [
    "Name two ways to make users get a new version of a cached file.",
    "Create a CloudFront invalidation for the path, or use versioned file names so the new file has a new cache key."
   ],
   [
    "Why does adding every cookie to the cache key lower performance?",
    "Each unique combination is cached separately, lowering the hit ratio and sending more requests to the origin."
   ]
  ],
  "differentiation": [
   "Support: Give students a keyword card with 'cache, TTL, static content, HTTP' on one side and 'static IP, UDP, allowlist, instant failover' on the other, and let them use it during the debate.",
   "Extend: Ask fast finishers to design a cache policy for a news site with articles in several languages and logged-in users, deciding which query strings, headers and cookies belong in the cache key and which only go to the origin."
  ]
 },
 {
  "t": "Choosing a database: RDS, Aurora, DynamoDB, Redshift, DocumentDB, Neptune, and RDS Proxy for connection pooling",
  "objectives": [
   "Students will be able to distinguish OLTP from OLAP workloads and map them to relational databases or Redshift.",
   "Students will be able to match scenario clues to RDS, Aurora, DynamoDB, Redshift, DocumentDB and Neptune.",
   "Students will be able to explain the problem RDS Proxy solves for serverless applications and what it does not do.",
   "Students will be able to justify a purpose-built database choice over a single general database for a multi-feature application."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for different kinds of storage furniture or containers."
   ],
   [
    12,
    "Teach",
    "Present each engine with its data model, a signature feature and one keyword clue. Draw a Lambda fleet hitting a database with and without RDS Proxy to show connection pooling."
   ],
   [
    18,
    "Activity",
    "Run the 'Database speed dating' card match below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about trade-offs of using several databases."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why don't we store kitchen knives, winter coats and important documents in the same kind of container? What does that suggest about storing data?",
  "activity": {
   "title": "Database speed dating",
   "materials": "Two sets of printed cards: requirement cards (about 12) and service cards (RDS, Aurora, DynamoDB, Redshift, DocumentDB, Neptune, RDS Proxy, ElastiCache), plus a whiteboard for tallying matches.",
   "steps": [
    "Prepare requirement cards such as 'shopping cart with key lookups at huge scale', 'nightly sales reports over five years', 'social graph friend recommendations', 'existing MongoDB app, minimal code change', 'Lambda exhausts database connections', 'MySQL compatible with higher availability and up to 15 replicas', and 'existing Oracle app that must stay on Oracle'.",
    "Half the class holds requirement cards and half holds service cards. Students pair up for one minute, decide if they are a match, and record the deciding clue.",
    "Students rotate partners for several rounds until each requirement has been matched.",
    "Pairs present any requirement they disagreed on, and the class votes before the teacher reveals the intended answer and reason.",
    "Close by listing the clues on the board as a quick-reference chart students photograph or copy."
   ]
  },
  "discussion": [
   "What are the operational costs of running several purpose-built databases instead of one, and when is that trade worth it?",
   "A company wants to leave commercial database licensing. What would you consider before recommending Aurora PostgreSQL?"
  ],
  "exit": [
   [
    "Which database fits analytics over petabytes of historical data?",
    "Amazon Redshift, a columnar data warehouse for OLAP."
   ],
   [
    "Lambda functions exhaust an RDS database's connections. What do you add?",
    "RDS Proxy, which pools and shares database connections."
   ],
   [
    "Which service suits highly connected data such as social networks or fraud rings?",
    "Amazon Neptune, a graph database."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page clue chart that pairs each service with two keywords (for example 'graph, relationships' for Neptune) and allow students to keep it during speed dating.",
   "Extend: Ask fast finishers to design the data layer for a ride-sharing app with trips, payments, driver locations, analytics and recommendations, choosing an engine for each and explaining how data moves between them."
  ]
 },
 {
  "t": "DynamoDB performance: partition key design, provisioned vs on-demand capacity, auto scaling and secondary indexes",
  "objectives": [
   "Students will be able to explain how partition key choice causes or prevents hot partitions and how write sharding helps.",
   "Students will be able to calculate RCUs and WCUs for given item sizes, request rates and consistency models.",
   "Students will be able to choose between provisioned capacity with auto scaling and on-demand capacity from a traffic description.",
   "Students will be able to compare global and local secondary indexes and select one for a new query requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about checkout lanes and connect it to how keys spread load."
   ],
   [
    12,
    "Teach",
    "Explain primary keys, partitions and hot keys with a drawing of partitions. Work two capacity examples on the board, then compare provisioned and on-demand and contrast GSI with LSI."
   ],
   [
    18,
    "Activity",
    "Run 'Design the table, then break it' in groups, including the capacity calculations."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare relational and DynamoDB design habits."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A store has ten checkout lanes, but every customer is told to use lane 3. What happens, and would opening more lanes help?",
  "activity": {
   "title": "Design the table, then break it",
   "materials": "Printed scenario sheets for three apps (a voting app, an online store's orders, an IoT sensor feed), sticky notes, calculators or student laptops, and a whiteboard.",
   "steps": [
    "Each group receives one scenario with expected queries and traffic, and proposes a partition key, an optional sort key and a capacity mode on a sticky note.",
    "Groups swap scenarios and act as 'attackers', looking for a traffic pattern that would create a hot partition with the other group's key.",
    "The original group responds with a fix, such as a higher-cardinality key or write sharding with a suffix.",
    "Each group calculates RCUs and WCUs for one given rate and item size from its scenario, showing the rounding step.",
    "The teacher presents a new query requirement for each scenario after launch, and groups decide whether a GSI or LSI is possible and justify it."
   ]
  },
  "discussion": [
   "Why does DynamoDB encourage you to design around queries first, when relational design usually starts from entities?",
   "When would provisioned capacity with auto scaling cost less than on-demand, and when would it be riskier?"
  ],
  "exit": [
   [
    "A table throttles while total capacity is mostly unused. What is the likely cause?",
    "A hot partition from a poorly distributed partition key; fix it with a better key or write sharding."
   ],
   [
    "How many WCUs are needed to write 4 items per second of 1.5 KB each?",
    "8. Each 1.5 KB write rounds up to 2 KB, two units, so 4 x 2 = 8 WCUs."
   ],
   [
    "You need a new query on an existing table by a non-key attribute. GSI or LSI?",
    "A GSI, because LSIs can only be created with the table."
   ]
  ],
  "differentiation": [
   "Support: Give students a capacity worksheet with the steps laid out (item size, divide by 4 or 1, round up, multiply, halve if eventually consistent) and two fully worked examples before they try the scenario numbers.",
   "Extend: Ask fast finishers to design a single-table layout for orders and customers with a composite key and one GSI that supports three different queries, explaining which query each key structure serves."
  ]
 },
 {
  "t": "Streaming ingestion: Kinesis Data Streams vs Amazon Data Firehose vs Amazon MSK",
  "objectives": [
   "Students will be able to describe how Kinesis Data Streams uses shards, partition keys and retention to support ordering, multiple consumers and replay.",
   "Students will be able to explain what Amazon Data Firehose does, including buffering, transformation and destinations, and why it cannot replay data.",
   "Students will be able to identify when Amazon MSK is the right choice based on existing Kafka use.",
   "Students will be able to design a streaming pipeline that combines these services for real-time and batch consumers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about live radio versus mail and record contrasts on the board."
   ],
   [
    12,
    "Teach",
    "Draw a Data Streams diagram with producers, shards and three consumers, explaining partition keys, retention and enhanced fan-out. Then show Firehose buffering into S3 and Redshift, and introduce MSK for Kafka users."
   ],
   [
    18,
    "Activity",
    "Run the 'Build the pipeline' whiteboard design below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare control and simplicity."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What is the difference between listening to a live radio show, listening to a recording later, and getting a weekly letter summarizing the news? Which would you want for traffic updates?",
  "activity": {
   "title": "Build the pipeline",
   "materials": "Whiteboard space for each group (or large paper), markers, and printed requirement cards for four companies: a ride-sharing app, a retail clickstream, an IoT factory, and a bank already running Kafka.",
   "steps": [
    "Each group draws a pipeline from producers to destinations for its company card, naming the ingestion service and every consumer.",
    "Groups annotate the diagram with the partition key choice, the retention setting and whether enhanced fan-out is needed.",
    "The teacher hands each group a 'curveball' card, such as 'analysts need Parquet files in S3', 'replay the last two days after a bug', or 'consumers are falling behind', and groups adjust the design.",
    "Groups do a two-minute gallery walk to review another group's pipeline and leave one sticky note with a question or improvement.",
    "The class reviews the most common curveball fixes together."
   ]
  },
  "discussion": [
   "When is the simplicity of Firehose worth giving up replay and sub-second processing?",
   "Why might a company with Kafka experience still choose Kinesis for a brand-new workload?"
  ],
  "exit": [
   [
    "Can Amazon Data Firehose replay yesterday's data to a new consumer?",
    "No. Firehose delivers without retaining data; Kinesis Data Streams retains records for replay."
   ],
   [
    "What decides which shard a Kinesis record goes to?",
    "Its partition key; records with the same key go to the same shard, preserving order per key."
   ],
   [
    "A company already runs Kafka with many Kafka Connect connectors. Which managed service?",
    "Amazon MSK."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column comparison sheet (control and replay, zero-admin delivery, Kafka compatibility) with one example per column for students to reference during the design activity.",
   "Extend: Ask fast finishers to size a provisioned Kinesis stream for a stated write rate and record count, then explain how partition key skew would change the shard count they need."
  ]
 },
 {
  "t": "Analytics services: Athena, AWS Glue, Lake Formation, EMR, Redshift Spectrum and QuickSight",
  "objectives": [
   "Students will be able to describe the role of AWS Glue crawlers, Glue jobs and the Data Catalog in a data lake.",
   "Students will be able to explain how Athena pricing works and apply Parquet and partitioning to reduce cost.",
   "Students will be able to select Lake Formation, EMR, Redshift Spectrum or QuickSight from scenario requirements.",
   "Students will be able to design a simple data lake pipeline from raw files to dashboards with appropriate governance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the unlabeled garage and list what you would need to make it useful."
   ],
   [
    12,
    "Teach",
    "Draw the data lake flow: raw S3, crawler, Data Catalog, Glue job to curated Parquet, then Athena, Lake Formation, EMR, Redshift Spectrum and QuickSight as consumers. Show the Athena SQL example and explain how partitions limit the scan."
   ],
   [
    18,
    "Activity",
    "Run the 'Assemble the data lake' role cards activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about governance and cost."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Imagine a garage full of hundreds of unlabeled boxes. What would you need to do before you could quickly answer 'how many winter coats do we own?'",
  "activity": {
   "title": "Assemble the data lake",
   "materials": "Printed role cards for each service (Glue crawler, Glue job, Data Catalog, Athena, Lake Formation, EMR, Redshift Spectrum, QuickSight), a whiteboard with an S3 bucket drawn on it, string or markers to draw arrows, and requirement cards.",
   "steps": [
    "Hand each student or pair one service role card describing what the service does.",
    "Read a requirement aloud, such as 'analysts want SQL on raw logs today', 'finance must not see PII columns', 'join five years of S3 history with Redshift tables', or 'executives want a dashboard'.",
    "Students holding the cards needed for that requirement come to the board and draw their part of the data flow, explaining their job in one sentence.",
    "After four requirements, the class reviews the complete diagram and identifies any service doing a job it cannot do, such as a crawler transforming data.",
    "End with a cost challenge: given a query that scans a full raw dataset, pairs propose two changes and estimate how much less data the query would read."
   ]
  },
  "discussion": [
   "Why might a company keep only the most recent year in Redshift and leave older years in S3?",
   "What risks appear if every team manages its own S3 bucket policies for the data lake instead of using central governance?"
  ],
  "exit": [
   [
    "Which service scans S3 data and creates tables in the Data Catalog?",
    "An AWS Glue crawler."
   ],
   [
    "Give two ways to reduce Athena query cost on a large dataset.",
    "Convert to a compressed columnar format such as Parquet, and partition the data so queries scan only relevant folders."
   ],
   [
    "Which service enforces column-level permissions across Athena and EMR?",
    "AWS Lake Formation."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-line 'job description' for each service on a reference card, and pair struggling students with a partner during the role card activity.",
   "Extend: Ask fast finishers to design partition keys and a file layout for a clickstream dataset queried mostly by date and country, and explain the trade-off between many small partitions and fewer large ones."
  ]
 },
 {
  "t": "EC2 Auto Scaling policies: target tracking, step, simple, scheduled and predictive scaling",
  "objectives": [
   "Students will be able to compare target tracking, step, simple, scheduled and predictive scaling policies.",
   "Students will be able to select a scaling policy or combination for a described traffic pattern.",
   "Students will be able to explain supporting settings including warm pools, lifecycle hooks, instance warmup and load balancer health checks.",
   "Students will be able to calculate a backlog-per-instance target for an SQS worker fleet."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about staffing a coffee shop and list strategies students suggest."
   ],
   [
    12,
    "Teach",
    "Present each policy with a graph of traffic and capacity over a day. Show the target tracking CLI command on the projector, then cover warm pools, lifecycle hooks, warmup and backlog per instance with a worked calculation."
   ],
   [
    18,
    "Activity",
    "Run 'Staff the shift' in groups using the traffic graphs below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore cost versus readiness."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You manage a coffee shop. How would you decide how many baristas to schedule for Monday morning, a surprise bus tour, and a slow Tuesday afternoon?",
  "activity": {
   "title": "Staff the shift",
   "materials": "Printed traffic graphs for five workloads (steady growth, sharp daily peak with slow-booting instances, unpredictable spikes, a planned product launch, and an SQS queue with low CPU), markers, and a whiteboard summary table.",
   "steps": [
    "Each group receives two or three graphs and a short description including instance boot time and business goals.",
    "Groups choose a scaling policy or combination for each graph and sketch on the graph where capacity would rise under their choice.",
    "For the SQS workload, groups calculate a backlog-per-instance target from a given processing rate and acceptable delay.",
    "Groups add one supporting setting per workload, such as a warm pool, lifecycle hook, load balancer health checks or a higher maximum size.",
    "Each group presents one graph; the class checks whether capacity arrives before or after demand and suggests improvements."
   ]
  },
  "discussion": [
   "A high minimum capacity guarantees readiness but costs money every hour. How would you decide the right minimum?",
   "When would you trust predictive scaling, and how could forecast-only mode help you decide?"
  ],
  "exit": [
   [
    "Which policy keeps average CPU near 50 percent by managing alarms for you?",
    "Target tracking scaling."
   ],
   [
    "Instances take 10 minutes to boot before a consistent 09:00 peak. Which policy helps most?",
    "Predictive scaling or scheduled scaling, so capacity launches before the peak."
   ],
   [
    "What metric should an SQS worker fleet scale on?",
    "Backlog per instance: visible messages divided by running instances, tracked against a target."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision table pairing each traffic clue (keep a metric steady, known time, recurring pattern with slow boot, breach size matters, queue backlog) with its policy, and let them use it during the activity.",
   "Extend: Ask fast finishers to design a combined configuration for an e-commerce site with predictive scaling, target tracking, a warm pool and a lifecycle hook for log copying, and explain how each part interacts during a flash sale."
  ]
 },
 {
  "t": "Data migration and hybrid storage: DataSync, Snow Family, Storage Gateway, Transfer Family, DMS and SCT",
  "objectives": [
   "Students will be able to select DataSync, the Snow Family, Storage Gateway, Transfer Family or DMS from the data size, bandwidth, duration and data type in a scenario.",
   "Students will be able to estimate transfer time for a dataset over a given link and decide when offline transfer is justified.",
   "Students will be able to compare the S3 File, Volume (cached and stored) and Tape Gateway types by the interface they present.",
   "Students will be able to explain why heterogeneous database migrations need schema conversion before DMS moves the data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write on the board: 100 TB, 100 Mbps link. Ask students to estimate how long the copy takes, then reveal roughly three months. Ask what they would do instead."
   ],
   [
    12,
    "Teach",
    "Introduce the four deciding questions (size, bandwidth, one-time or ongoing, data type). Walk through DataSync, Snow, the Storage Gateway types, Transfer Family, and DMS with SCT, drawing one box per service and writing its trigger phrase underneath."
   ],
   [
    18,
    "Activity",
    "Run the Migration Desk scenario sort described below. Circulate and ask each group which of the four questions decided each card."
   ],
   [
    5,
    "Discuss",
    "Groups share the card they argued about most. Draw out the DataSync versus Storage Gateway and cached versus stored distinctions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "You have 100 TB to move to AWS and a 100 Mbps internet link. Roughly how long will the copy take if the link is fully used, and would you still use the network?",
  "activity": {
   "title": "Migration Desk",
   "materials": "Printed scenario cards (12, each a short customer request), six labeled header cards (DataSync, Snow Family, Storage Gateway, Transfer Family, DMS, DMS plus SCT), whiteboard, markers.",
   "steps": [
    "Split the class into groups of three and give each group the header cards and a shuffled deck of scenario cards.",
    "Groups place each scenario under one header and write the deciding phrase from the card on a sticky note attached to it.",
    "For every Storage Gateway card, groups also write which type (S3 File, Volume cached, Volume stored, Tape) and why.",
    "Give two groups a twist card (for example, the network link is upgraded to 10 Gbps) and ask whether any placements change.",
    "Groups compare layouts with a neighboring group and resolve any disagreements before the class discussion."
   ]
  },
  "discussion": [
   "When would you combine Snow and DataSync in the same migration, and what does each one handle?",
   "What risks does a minimal-downtime database migration still carry at cutover, and how would you rehearse it?"
  ],
  "exit": [
   [
    "A company must move 1.5 PB with a busy 200 Mbps link. Which service family fits?",
    "The Snow Family, because the network transfer would take far too long."
   ],
   [
    "Which Volume Gateway mode keeps the primary copy of data on premises?",
    "Stored mode; cached mode keeps primary data in AWS with only hot data cached locally."
   ],
   [
    "Oracle to Aurora PostgreSQL with minimal downtime: which tools, in what order?",
    "AWS SCT or DMS Schema Conversion for the schema and code, then DMS full load plus CDC for the data until cutover."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page decision flow (Is it a database? Is it ongoing local access? Is the link too slow? Is it partner SFTP?) to use while sorting the cards.",
   "Extend: Ask fast finishers to calculate transfer times for three dataset sizes over 100 Mbps, 1 Gbps and 10 Gbps and draw the line where Snow becomes the better choice under the one-week rule."
  ]
 },
 {
  "t": "EC2 purchase options: On-Demand, Reserved Instances, Compute vs EC2 Instance Savings Plans, Spot, Dedicated Instances and Dedicated Hosts",
  "objectives": [
   "Students will be able to describe the billing model and best-fit workload for On-Demand, Reserved Instances, Savings Plans, Spot, Dedicated Instances and Dedicated Hosts.",
   "Students will be able to compare Compute Savings Plans with EC2 Instance Savings Plans and choose between them from a scenario.",
   "Students will be able to distinguish Dedicated Hosts from Dedicated Instances for licensing requirements.",
   "Students will be able to recommend a cost-optimized mix of purchase options for a multi-workload environment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you take the same trip every day for a year, would you pay per ride or buy a pass? What if you only travel once? Connect answers to On-Demand versus commitments."
   ],
   [
    12,
    "Teach",
    "Present the six options as a table on the board with columns for commitment, discount, interruption risk and best fit. Spend extra time on Compute versus EC2 Instance Savings Plans and on Dedicated Hosts versus Dedicated Instances."
   ],
   [
    18,
    "Activity",
    "Run the Purchase Option Auction described below. Groups defend their choices aloud as the teacher plays the finance director."
   ],
   [
    5,
    "Discuss",
    "Ask which workload was hardest to place and why. Highlight trap words such as 'cannot be interrupted' and 'per core'."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on index cards."
   ]
  ],
  "warmup": "You ride the same bus to work every day for a year, and once a year you take a taxi to the airport. Would you pay for both the same way? Why not?",
  "activity": {
   "title": "Purchase Option Auction",
   "materials": "Printed workload cards (10, each describing usage, duration, interruption tolerance and licensing), a printed option menu listing the six purchase options, whiteboard for a class tally.",
   "steps": [
    "Groups of three receive the workload cards and the option menu.",
    "For each workload, groups choose one purchase option and write a one-sentence justification that quotes the deciding phrase from the card.",
    "The teacher, playing the finance director, reads each card aloud; groups hold up their choice, and the teacher tallies results on the board.",
    "Where groups disagree, one member from each side argues for 30 seconds, then the class votes and the teacher confirms.",
    "Groups finish by drafting a combined plan for the three cards that describe a single company, mixing options as in the lesson's worked example."
   ]
  },
  "discussion": [
   "What business risks does a three-year commitment carry, and how do Compute Savings Plans reduce them?",
   "How would you explain to a manager why a cheaper Spot fleet might be the wrong choice for a particular workload?"
  ],
  "exit": [
   [
    "Which purchase option fits a stateless, fault-tolerant batch job at the lowest cost?",
    "Spot Instances."
   ],
   [
    "A team expects to move half its EC2 workloads to Lambda next year. Which commitment fits?",
    "A Compute Savings Plan, because it also applies to Lambda and Fargate."
   ],
   [
    "Why are Dedicated Hosts, not Dedicated Instances, used for per-socket licensing?",
    "Only Dedicated Hosts provide visibility into the physical server's sockets and cores."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-question decision card (Can it be interrupted? Is usage steady for a year or more?) and a short glossary to use during the activity.",
   "Extend: Ask fast finishers to design a plan for a company with a steady baseline, seasonal peaks and a BYOL database, explaining where Capacity Reservations, Savings Plans, Spot and Dedicated Hosts each apply."
  ]
 },
 {
  "t": "Spot Instances in practice: interruption notices, mixed-instances Auto Scaling groups and allocation strategies",
  "objectives": [
   "Students will be able to explain how the two-minute Spot interruption notice and rebalance recommendations are delivered and how a workload should react.",
   "Students will be able to compare price-capacity-optimized, capacity-optimized and lowest-price allocation strategies.",
   "Students will be able to configure, on paper, a mixed instances policy with an On-Demand base and diversified Spot capacity.",
   "Students will be able to judge whether a workload is a good or poor fit for Spot."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: a temp agency can recall any worker with two minutes' notice. How would you organize the kitchen so dinner service never stops? Collect ideas and save them for later."
   ],
   [
    12,
    "Teach",
    "Explain Spot pools as instance type plus AZ, the two-minute notice via IMDS and EventBridge, rebalance recommendations, and the three allocation strategies. Sketch a mixed instances Auto Scaling group with an On-Demand base on the board."
   ],
   [
    18,
    "Activity",
    "Run the Pool Shock simulation described below, with the teacher announcing capacity squeezes."
   ],
   [
    5,
    "Discuss",
    "Compare which group designs survived and why. Connect back to the warm-up kitchen ideas."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A temp agency gives you cheap kitchen staff but can recall any of them with two minutes' notice. How would you organize the kitchen so that dinner service never stops?",
  "activity": {
   "title": "Pool Shock",
   "materials": "Whiteboard grid with columns for three AZs and rows for six instance types (18 pools), sticky notes in two colors (On-Demand and Spot), printed event cards announcing capacity squeezes in specific pools.",
   "steps": [
    "Each group designs a 12-instance fleet by placing sticky notes on a copy of the grid, choosing an On-Demand base and where Spot capacity goes, and naming an allocation strategy.",
    "The teacher draws event cards one at a time (for example, all m-family pools in AZ b are reclaimed); groups remove affected Spot notes and record remaining capacity.",
    "After each event, groups describe in one sentence what their instances did during the two-minute notice.",
    "After five events, groups count surviving capacity and compare it with the minimum their workload card requires.",
    "Groups revise their design once and replay the same events to see the effect of diversification."
   ]
  },
  "discussion": [
   "Which workloads in your own experience could tolerate a two-minute interruption, and what would need to change to make others tolerant?",
   "When is the extra cost of capacity-optimized allocation worth it compared with price-capacity-optimized?"
  ],
  "exit": [
   [
    "Name two places where the Spot interruption notice can be detected.",
    "The instance metadata service and an Amazon EventBridge event."
   ],
   [
    "Which allocation strategy is recommended for most Spot workloads?",
    "Price-capacity-optimized."
   ],
   [
    "How do you guarantee a minimum of four instances in a mixed Spot and On-Demand group?",
    "Set the On-Demand base capacity to four in the mixed instances policy."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially filled grid with an example fleet and ask them only to choose the allocation strategy and On-Demand base, with a reference card listing what each strategy favors.",
   "Extend: Ask fast finishers to describe, in plain words, the logic of an on-instance agent that reacts to the interruption notice for an SQS worker, including what it does with in-flight messages."
  ]
 },
 {
  "t": "Right-sizing compute: AWS Compute Optimizer, Graviton instances, and serverless vs always-on cost models",
  "objectives": [
   "Students will be able to explain why right-sizing must precede Savings Plan or Reserved Instance purchases.",
   "Students will be able to interpret a Compute Optimizer finding and identify when the CloudWatch agent is needed for memory data.",
   "Students will be able to evaluate whether a workload is a good candidate for Graviton based on its language and dependencies.",
   "Students will be able to compare always-on and serverless cost models for a described traffic pattern."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a mock utilization chart averaging 12 percent CPU on a large instance. Ask: what would you do, and what information is missing? Steer toward memory."
   ],
   [
    12,
    "Teach",
    "Cover Compute Optimizer findings, the memory blind spot, Graviton compatibility, serverless versus always-on economics and scheduling. Write Measure, Right-size, Commit on the board as the order of operations."
   ],
   [
    18,
    "Activity",
    "Run the Fleet Review activity described below using printed finding cards."
   ],
   [
    5,
    "Discuss",
    "Groups share one recommendation they rejected and why. Emphasize testing and evidence over guesswork."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on index cards."
   ]
  ],
  "warmup": "A large server averages 12 percent CPU. Should you shrink it right away? What else would you want to know first?",
  "activity": {
   "title": "Fleet Review",
   "materials": "Printed resource cards (8), each listing an instance type, average and peak CPU, whether memory data exists, language or runtime, and usage hours per week; whiteboard; markers.",
   "steps": [
    "Groups of three receive the resource cards and a blank recommendation sheet.",
    "For each card, groups decide among: downsize, move to Graviton, move to serverless, schedule stop and start, install CloudWatch agent first, or leave as is.",
    "Groups must note one risk for every change they recommend, such as native dependencies or missing memory data.",
    "Groups rank their recommendations by expected savings and effort, then decide which ones must happen before any Savings Plan purchase.",
    "Each group presents its top two recommendations to the class in under a minute."
   ]
  },
  "discussion": [
   "Why do organizations so often leave oversized instances running, and what process would prevent it?",
   "At what point might a serverless workload become more expensive than a provisioned one, and how would you notice?"
  ],
  "exit": [
   [
    "What should come first: right-sizing or buying a Savings Plan?",
    "Right-sizing, so the commitment is not sized to wasted capacity."
   ],
   [
    "Why install the CloudWatch agent before trusting EC2 right-sizing recommendations?",
    "EC2 does not report memory by default, and memory-bound workloads could be under-sized."
   ],
   [
    "Which workloads usually move to Graviton most easily?",
    "Those written in interpreted or JIT-compiled languages such as Python, Node.js, Java and .NET, with multi-architecture container images."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart (Is memory data present? Is usage steady or idle? Is the runtime Arm-compatible?) and pair struggling students with a confident partner for the card review.",
   "Extend: Ask fast finishers to estimate the share of hours an environment used 50 hours a week is idle and to outline a schedule using EventBridge Scheduler or Instance Scheduler on AWS."
  ]
 },
 {
  "t": "S3 storage classes: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA and the three Glacier classes",
  "objectives": [
   "Students will be able to compare the S3 storage classes by availability, retrieval time, minimum duration and fees.",
   "Students will be able to select the most cost-effective storage class from an access-pattern description.",
   "Students will be able to explain the durability risk of One Zone classes and when that risk is acceptable.",
   "Students will be able to identify when minimum durations or object sizes make a cheaper-looking class more expensive."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students where at home they keep things used daily, monthly and once a decade, and what it costs to get each one. Map their answers onto a blank storage class line on the board."
   ],
   [
    12,
    "Teach",
    "Walk the classes from Standard to Deep Archive, filling a table with retrieval time, minimum duration and fee notes. Highlight One Zone durability risk and Intelligent-Tiering's lack of retrieval fees."
   ],
   [
    18,
    "Activity",
    "Run the Storage Class Match activity described below."
   ],
   [
    5,
    "Discuss",
    "Review the cards groups disagreed on, focusing on 'immediately' versus 'within hours' and recreatable data."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Think of things you keep at home that you use daily, monthly and once in ten years. Where do you keep each, and how long does it take to get it?",
  "activity": {
   "title": "Storage Class Match",
   "materials": "Printed dataset cards (12), each describing read frequency, required retrieval speed, retention period and whether the data can be recreated; a printed reference table of the eight classes; whiteboard.",
   "steps": [
    "Pairs receive the dataset cards and the reference table.",
    "Pairs assign each dataset a storage class and underline the phrase on the card that decided it.",
    "For each card, pairs note one cost trap that could apply (minimum duration, tiny objects, retrieval fees, single AZ).",
    "Pairs swap cards with another pair and challenge any assignment they disagree with.",
    "The teacher reveals the intended answers and the class discusses the three most-missed cards."
   ]
  },
  "discussion": [
   "How would you explain to a compliance officer that One Zone-IA is acceptable for some data but not other data?",
   "When might it be worth paying Intelligent-Tiering's monitoring charge instead of writing your own lifecycle rules?"
  ],
  "exit": [
   [
    "Which class gives millisecond access for archive data read about once a quarter?",
    "S3 Glacier Instant Retrieval."
   ],
   [
    "Why is One Zone-IA a poor choice for the only copy of customer records?",
    "It stores data in one AZ, so the loss of that AZ could destroy the data."
   ],
   [
    "What is the minimum storage duration for Glacier Deep Archive?",
    "180 days."
   ]
  ],
  "differentiation": [
   "Support: Give students a simplified three-question card (How often read? How fast needed? Can it be recreated?) and a color-coded table of the classes.",
   "Extend: Ask fast finishers to estimate whether 10 million 20 KB objects should move to Standard-IA, explaining the effect of the 128 KB minimum billable size."
  ]
 },
 {
  "t": "S3 Lifecycle rules, S3 Storage Lens and Requester Pays",
  "objectives": [
   "Students will be able to write or read a lifecycle rule that transitions current objects, expires noncurrent versions and aborts incomplete multipart uploads.",
   "Students will be able to explain the one-way nature and minimums of lifecycle transitions.",
   "Students will be able to distinguish S3 Storage Lens from Storage Class Analysis.",
   "Students will be able to describe who pays for what under Requester Pays and its authentication requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you delete a file in a versioned bucket, is it gone? Take a show of hands, then reveal the delete marker behavior."
   ],
   [
    12,
    "Teach",
    "Project the lifecycle JSON from the lesson and annotate each field. Explain the waterfall, the 30-day minimum before IA transitions, the 128 KB default, then Storage Lens versus Storage Class Analysis and Requester Pays."
   ],
   [
    18,
    "Activity",
    "Run the Bucket Cleanup Clinic described below."
   ],
   [
    5,
    "Discuss",
    "Groups share one rule they wrote and one setting they decided against, with reasons."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "A user deletes a file from a bucket with versioning turned on. Is the data gone, and are you still paying for it?",
  "activity": {
   "title": "Bucket Cleanup Clinic",
   "materials": "Printed bucket profile cards (5), each with a mock Storage Lens summary (size, noncurrent versions, incomplete uploads, access notes, sharing needs); blank lifecycle rule templates; projector showing the lesson's JSON example.",
   "steps": [
    "Groups of three receive two bucket profile cards and blank rule templates.",
    "For each bucket, groups fill in a lifecycle rule: filter, transitions with days and classes, noncurrent version expiration and multipart cleanup.",
    "Groups check each rule against the constraints: no transitions back to warmer classes, 30 days before IA, and the effect on tiny objects.",
    "For any card describing external downloaders, groups decide whether Requester Pays fits and note the authentication requirement.",
    "Groups trade templates with another group to review, then the teacher projects model answers."
   ]
  },
  "discussion": [
   "Who in an organization should own lifecycle policies, and how would Storage Lens help them hold teams accountable?",
   "What problems could Requester Pays cause for partners, and how would you communicate the change?"
  ],
  "exit": [
   [
    "Which lifecycle action stops old versions from growing a versioned bucket's bill?",
    "A noncurrent version expiration action."
   ],
   [
    "Under Requester Pays, what does the bucket owner still pay for?",
    "Storage."
   ],
   [
    "Which tool gives organization-wide storage visibility across accounts?",
    "S3 Storage Lens."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed lifecycle template with field names and example values so students only need to choose days and classes.",
   "Extend: Ask fast finishers to write a second rule that uses a tag filter so only objects tagged Retention=short expire after 90 days, and to explain how prefix and tag filters keep long-retention data out of a rule's scope."
  ]
 },
 {
  "t": "Cutting EBS and backup costs: gp2 to gp3, Data Lifecycle Manager, snapshot archive and unattached volumes",
  "objectives": [
   "Students will be able to explain why gp3 usually costs less than gp2 and how Elastic Volumes changes type without downtime.",
   "Students will be able to describe how incremental snapshots behave when older snapshots are deleted.",
   "Students will be able to choose between Data Lifecycle Manager, AWS Backup, Snapshots Archive and Recycle Bin for a described need.",
   "Students will be able to identify unattached volumes and explain how they arise."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you delete the first of five incremental backups, can you still restore the fifth? Record the class vote on the board."
   ],
   [
    12,
    "Teach",
    "Compare gp2 and gp3 performance models, demonstrate the modify-volume command on the projector, explain incremental snapshots with a block diagram, then cover DLM, AWS Backup, Snapshots Archive, Recycle Bin and orphaned volumes. Resolve the warm-up vote."
   ],
   [
    18,
    "Activity",
    "Run the EBS Bill Audit described below."
   ],
   [
    5,
    "Discuss",
    "Groups share their biggest saving and the change they considered too risky."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You have five incremental backups of a drive. If you delete the oldest one, can you still restore the newest? Why or why not?",
  "activity": {
   "title": "EBS Bill Audit",
   "materials": "Printed mock inventory sheet listing volumes (type, size, IOPS, state, tags) and snapshots (age, purpose, last restore), highlighters, whiteboard.",
   "steps": [
    "Pairs receive the inventory sheet and highlight every item that represents waste or risk.",
    "For each highlighted item, pairs write the action: convert to gp3, snapshot and delete, add to a DLM policy, archive, or enable Recycle Bin.",
    "Pairs mark which actions need downtime, and justify any they mark yes.",
    "Pairs draft one DLM policy in plain words: target tag, schedule, retention count and any cross-Region copy.",
    "Two pairs join to compare sheets, then share one disagreement with the class."
   ]
  },
  "discussion": [
   "What process would stop unattached volumes from accumulating in the first place?",
   "How would you decide which snapshots are safe to archive versus keep in the standard tier?"
  ],
  "exit": [
   [
    "Does converting a volume from gp2 to gp3 require stopping the instance?",
    "No, Elastic Volumes changes it while in use."
   ],
   [
    "Which service automates snapshot creation and retention by tag for EBS volumes?",
    "Amazon Data Lifecycle Manager."
   ],
   [
    "Name two constraints of EBS Snapshots Archive.",
    "A 90-day minimum archive period and restores that can take up to 72 hours."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card listing each tool with one sentence on its purpose, and a pre-highlighted inventory with three items to start from.",
   "Extend: Ask fast finishers to compare using DLM versus AWS Backup for a company that also needs RDS and EFS backups, and to justify a choice."
  ]
 },
 {
  "t": "Database cost choices: DynamoDB on-demand vs provisioned, Aurora Serverless v2, reserved DB instances and stopping idle databases",
  "objectives": [
   "Students will be able to choose between DynamoDB on-demand and provisioned capacity from a traffic description.",
   "Students will be able to explain how Aurora Serverless v2 scales and bills, and when provisioned Aurora with reservations is cheaper.",
   "Students will be able to describe the seven-day limit on stopped RDS instances and choose between stopping and snapshot-and-delete.",
   "Students will be able to recommend a cost-optimized mix of database options for a multi-database environment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: would you buy an annual gym membership, pay per class, or cancel entirely if you went every day, once a month, or once a year? Link each answer to a database pricing model."
   ],
   [
    12,
    "Teach",
    "Draw three traffic graphs (flat, spiky, mostly zero) on the board and map each to DynamoDB modes, Aurora Serverless v2, reserved DB instances and stop or delete. Stress the seven-day automatic restart and the read replica distractor."
   ],
   [
    18,
    "Activity",
    "Run the Database Budget Cut role-play described below."
   ],
   [
    5,
    "Discuss",
    "Groups share their final savings plan and the trade-off they argued about most."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "If you went to the gym every day, once a month, or once a year, would you buy an annual membership, pay per class, or not pay at all? Why?",
  "activity": {
   "title": "Database Budget Cut",
   "materials": "Printed role cards (CFO, application owner, database administrator), printed database profile cards (6) with traffic graphs and usage notes, whiteboard for the final plan.",
   "steps": [
    "Form groups of three and assign each student a role card with a priority (cost, performance or operations).",
    "Groups review the six database profiles and propose a pricing model or action for each: on-demand, provisioned with reservations, Aurora Serverless v2, scheduled stop, or snapshot and delete.",
    "Each role must challenge at least one proposal from its perspective, for example the application owner questioning a resume delay.",
    "Groups agree on a final plan and write each decision with its deciding traffic phrase on the board.",
    "The teacher reveals intended answers and highlights the seven-day restart and read replica traps."
   ]
  },
  "discussion": [
   "What data would you want before moving a DynamoDB table from on-demand to provisioned capacity?",
   "When might a short resume delay from an auto-paused Aurora Serverless v2 database be unacceptable?"
  ],
  "exit": [
   [
    "Which DynamoDB capacity mode fits a new application with unknown traffic?",
    "On-demand mode."
   ],
   [
    "What happens to a stopped RDS instance after seven days?",
    "AWS automatically starts it again."
   ],
   [
    "What is the cheapest approach for a database used one week per quarter?",
    "Snapshot and delete it, then restore from the snapshot when needed."
   ]
  ],
  "differentiation": [
   "Support: Provide the three traffic graph shapes with labels (flat, spiky, mostly idle) and a matching card for each pricing model so students sort before tackling full profiles.",
   "Extend: Ask fast finishers to design a cluster that mixes a provisioned writer with Serverless v2 readers and explain how they would set minimum and maximum ACUs for a month-end reporting peak."
  ]
 },
 {
  "t": "Data transfer costs: inter-AZ, inter-Region and internet egress, NAT gateway charges vs gateway endpoints, and CloudFront",
  "objectives": [
   "Students will be able to classify traffic flows as free, low-cost or higher-cost: ingress, same-AZ, inter-AZ, inter-Region and internet egress.",
   "Students will be able to explain NAT gateway processing charges and when a gateway VPC endpoint removes them.",
   "Students will be able to justify CloudFront as both a latency and an egress cost improvement.",
   "Students will be able to redesign a traffic path to reduce cost without giving up Multi-AZ resilience."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: which costs more, downloading a file from S3 into a private instance through a NAT gateway or through a gateway endpoint? Take a quick vote and leave it unresolved."
   ],
   [
    12,
    "Teach",
    "Draw a VPC with three AZs, a NAT gateway, S3, CloudFront and the internet. Label each arrow with its charge type, then resolve the warm-up. Cover per-AZ NAT gateways, interface endpoints and Direct Connect."
   ],
   [
    18,
    "Activity",
    "Run the Follow the Packet activity described below."
   ],
   [
    5,
    "Discuss",
    "Groups share the redesign that saved the most and any change they rejected because it hurt resilience."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "A private instance downloads 10 TB from S3 each month. Does it cost the same whether the traffic goes through a NAT gateway or a gateway endpoint? Vote and explain your guess.",
  "activity": {
   "title": "Follow the Packet",
   "materials": "Printed architecture diagrams (3) showing VPCs, AZs, NAT gateways, S3, CloudFront and users; colored markers; a printed legend of charge types (free, per GB, per GB each direction, per hour plus per GB).",
   "steps": [
    "Groups of three receive one architecture diagram and the legend.",
    "Groups trace each labeled flow and color each arrow by its charge type.",
    "Groups identify the two most expensive flows and propose a redesign for each (gateway endpoint, CloudFront, per-AZ NAT, co-location, Direct Connect).",
    "Groups check each redesign against the rule that Multi-AZ resilience must be kept and revise any that break it.",
    "Groups rotate diagrams once and review another group's annotations, adding sticky-note comments."
   ]
  },
  "discussion": [
   "Why do data transfer costs so often surprise teams, and how could tagging or Flow Logs make them visible earlier?",
   "Where is the line between saving on inter-AZ transfer and weakening availability?"
  ],
  "exit": [
   [
    "Which two services support gateway VPC endpoints?",
    "Amazon S3 and Amazon DynamoDB."
   ],
   [
    "Is transfer from an S3 origin to CloudFront edge locations charged?",
    "No, origin-to-edge transfer from AWS origins is free."
   ],
   [
    "Why deploy one NAT gateway per AZ?",
    "To avoid inter-AZ transfer charges for NAT traffic and remove a single point of failure."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-colored diagram with only two flows left to classify and a one-line explanation of each charge type.",
   "Extend: Ask fast finishers to compare a gateway endpoint, an interface endpoint and a NAT gateway for a workload calling both S3 and Amazon SQS, explaining which path each service's traffic should take."
  ]
 },
 {
  "t": "Cost visibility tools: Cost Explorer, AWS Budgets, Cost and Usage Reports, cost allocation tags and Trusted Advisor",
  "objectives": [
   "Students will be able to match Cost Explorer, AWS Budgets, the Cost and Usage Report, cost allocation tags, Cost Anomaly Detection and Trusted Advisor to the need each serves.",
   "Students will be able to explain the activation requirement and forward-only behavior of cost allocation tags.",
   "Students will be able to design a budget with alerts and a budget action for a sandbox account.",
   "Students will be able to distinguish threshold-based Budgets alerts from machine-learning-based anomaly detection."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read three short requests aloud (why did the bill jump, stop overspending, give me line items) and ask students to guess which tool each needs. Record guesses."
   ],
   [
    12,
    "Teach",
    "Introduce one verb per tool and fill a two-column board table (need, tool). Explain tag activation, budget actions, CUR through Data Exports with Athena, Cost Anomaly Detection and Trusted Advisor support plan limits."
   ],
   [
    18,
    "Activity",
    "Run the Help Desk for Finance role-play described below."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up guesses and discuss which requests were misrouted and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Three people email you: one asks why the bill jumped, one wants overspending stopped automatically, one wants every line item for a spreadsheet. Would you use the same AWS tool for all three?",
  "activity": {
   "title": "Help Desk for Finance",
   "materials": "Printed request tickets (12) written in business language, a printed tool menu, sticky notes, whiteboard divided into six tool columns.",
   "steps": [
    "Pairs take turns: one reads a ticket aloud as the requester, the other names the tool and explains the deciding words.",
    "Pairs place each ticket under the matching tool column on the whiteboard using sticky notes.",
    "For tickets that need two tools (for example, per-team alerts need tags plus Budgets), pairs write both and the order of setup.",
    "Each pair writes one budget specification in plain words: scope, amount, threshold percentages, notification target and any action.",
    "The class reviews the board, and the teacher corrects misplaced tickets with a short explanation."
   ]
  },
  "discussion": [
   "Who in an organization should receive budget alerts, and what should they be expected to do with them?",
   "What could go wrong if teams use inconsistent tag keys, and how would a tag policy help?"
  ],
  "exit": [
   [
    "Which tool sends an alert when spending is forecast to exceed a threshold?",
    "AWS Budgets."
   ],
   [
    "Why might a tag added months ago not appear in Cost Explorer?",
    "It has not been activated as a cost allocation tag; tags appear only after activation and only going forward."
   ],
   [
    "Which tool provides the most granular, hourly per-resource billing data?",
    "The Cost and Usage Report, delivered through Data Exports to S3."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching card set pairing each tool with its one verb and a sample request, so students sort before tackling the full tickets.",
   "Extend: Ask fast finishers to design a full cost governance setup for a ten-account organization, combining tag policies, Cost Categories, per-team budgets with actions and a monthly CUR query in Athena."
  ]
 },
 {
  "t": "Consolidated billing in AWS Organizations: volume discounts and sharing Reserved Instance and Savings Plans benefits",
  "objectives": [
   "Students will be able to describe the administrative and financial benefits of consolidated billing in AWS Organizations.",
   "Students will be able to explain how aggregated usage reaches volume pricing tiers sooner.",
   "Students will be able to trace how RI and Savings Plans benefits apply first to the purchasing account and then to other accounts.",
   "Students will be able to determine when and where to turn off discount sharing and predict its effect in both directions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: on a family phone plan, if one person has unused prepaid data, who benefits? Connect answers to shared commitments."
   ],
   [
    12,
    "Teach",
    "Draw a management account with four member accounts. Show combined S3 usage crossing a tier line, then walk RI hours from the purchasing account to others. Explain where sharing is turned off and that it blocks both directions. Close with protecting the management account."
   ],
   [
    18,
    "Activity",
    "Run the RI Hour Hand-off simulation described below."
   ],
   [
    5,
    "Discuss",
    "Groups explain where their RI hours ended up and what changed when sharing was turned off for one account."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "On a family phone plan, one person prepaid for more data than they use this month. Should their sister be able to use the leftover? Who decides?",
  "activity": {
   "title": "RI Hour Hand-off",
   "materials": "Printed account cards (5) showing purchased RI hours and actual matching usage per day, tokens or sticky notes representing RI hours, a whiteboard tally grid.",
   "steps": [
    "Groups of four each receive the five account cards and a pile of tokens equal to the total purchased RI hours.",
    "Groups first apply tokens to usage in the purchasing account, then pass leftover tokens to matching usage in other accounts, recording the results on the grid.",
    "The teacher announces that sharing is turned off for one account; groups redo the allocation and note that the account neither gives nor receives.",
    "Groups calculate the organization's RI utilization in both scenarios.",
    "Each group writes one sentence explaining to a subsidiary's controller what turning off sharing changes for her unit."
   ]
  },
  "discussion": [
   "What are the arguments for and against buying commitments centrally rather than letting each team buy its own?",
   "Why might a regulator or an acquired company require discount sharing to be turned off?"
  ],
  "exit": [
   [
    "Who pays the consolidated bill in AWS Organizations?",
    "The management account, formerly called the payer account."
   ],
   [
    "If sharing is turned off for an account, what two things change?",
    "Its own RI and Savings Plans benefits apply only to itself, and it receives no benefits from other accounts' purchases."
   ],
   [
    "Why does consolidated billing reach volume discounts sooner?",
    "AWS combines usage across all accounts, so the organization crosses lower-price tiers faster than any single account."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked allocation for two accounts before students attempt five, and a one-line rule card: purchaser first, then others, unless sharing is off.",
   "Extend: Ask fast finishers to recommend whether to buy a Compute Savings Plan centrally or per account for an organization with one subsidiary that must be billed separately, and justify the setting changes."
  ]
 }
]);
