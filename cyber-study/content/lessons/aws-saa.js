/* Lessons for AWS Certified Solutions Architect - Associate (SAA-C03): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("aws-saa", [
 {
  "t": "IAM users, groups, roles and policies: least privilege, identity-based vs resource-based policies and policy evaluation logic",
  "hook": "It is 9:40 on a Monday at Harbor Credit Union, and Priya, the new cloud engineer, opens a ticket from the loan team: their reporting app on EC2 suddenly gets AccessDenied when it reads the reports bucket. Nothing in the app changed. The role on the instance still has a policy that clearly says Allow `s3:GetObject`. Over the weekend, though, the security team rolled out a few new rules across the account, and nobody is quite sure which one matters. The loan officers need their numbers by noon. Priya stares at the Allow statement and wonders how something that plainly says yes can still end in no. Where does she even start looking?",
  "simple": "Think of AWS as a big building and IAM as the front desk that checks every request. A user is a named person or program with a long-lasting badge. A group is just a way to hand the same rules to many users at once. A role is a visitor pass: someone borrows it for a while and it expires on its own, so there is nothing permanent to lose. Policies are the written rules that say yes or no to specific actions on specific things. The desk follows a simple order: the answer starts as no, a written yes is needed to get in, and any written no anywhere wins over every yes. Least privilege means giving each badge only the doors it truly needs, the way a cleaner gets a key to the supply closet but not the safe.",
  "body": [
   "AWS Identity and Access Management (IAM) decides who can do what in an AWS account. Every API call, whether it comes from the console, the command line interface (CLI), a software development kit (SDK) or another AWS service, is checked by IAM before anything happens. Getting IAM right is the foundation of every secure architecture on the Solutions Architect Associate (SAA-C03) exam, and many questions that look like they are about S3, EC2 or Lambda are really asking whether you understand identities and policies. If you can explain why a request was allowed or denied, you can answer a surprising share of Domain 1, Design Secure Architectures.",
   "There are three kinds of identity to know, plus one special account. An IAM user is a long-term identity for one person or application, with an optional console password and optional access keys for the API. Those access keys never expire on their own, which is exactly why they are risky. An IAM group is a collection of users that share permissions; groups cannot sign in, cannot be nested inside other groups and cannot be named as a principal in a policy. An IAM role is an identity with no long-term credentials: a trusted principal (a user, an AWS service such as EC2 or Lambda, another account, or a federated user) assumes it and receives temporary credentials from AWS Security Token Service (STS). For workloads, roles are almost always the right answer, because there are no keys to leak or rotate. An EC2 instance gets a role through an instance profile, and a Lambda function gets one as its execution role. The account root user, created with the account, can do almost everything and should be locked away with multi-factor authentication (MFA) and used only for the few tasks that require it.",
   "Permissions come from policies, which are JSON documents made of statements. Each statement has an `Effect` (Allow or Deny), an `Action` (for example `s3:GetObject`), a `Resource` (an ARN, the Amazon Resource Name) and optional `Condition` blocks using keys such as `aws:SourceIp` or `aws:MultiFactorAuthPresent`. Least privilege means granting only the actions and resources a job needs, then widening only when there is a proven need. AWS managed policies are convenient starting points but are often broad; customer managed policies let you tighten scope and reuse the result across many identities; inline policies are embedded in one identity and deleted with it, which suits a strict one-to-one relationship. The policy below is a typical least-privilege example: one action, one bucket's objects, nothing else.",
   "```\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": [\"s3:GetObject\"],\n    \"Resource\": \"arn:aws:s3:::reports-bucket/*\"\n  }]\n}\n```",
   "Next, notice where a policy is attached, because that changes what it means. Identity-based policies attach to users, groups and roles and say what that identity can do. Resource-based policies attach to a resource, such as an S3 bucket policy, an SQS queue policy or a KMS key policy, and include a `Principal` element naming who may access it. Resource-based policies are how you grant another account access without that account assuming a role. A role's trust policy is itself a resource-based policy: it says who may assume the role, while the role's permissions policies say what the role can do once assumed. When you read a policy on the exam, first ask whether it has a `Principal`; if it does, it lives on a resource or is a trust policy.",
   "Policy evaluation follows a fixed logic, and memorizing it pays off. Every request starts as an implicit deny. AWS collects every applicable policy: service control policies (SCPs) from AWS Organizations, resource-based policies, permissions boundaries, session policies and identity-based policies. If any of them contains an explicit Deny that matches, the request is denied, full stop. Otherwise the request needs an Allow, and every guardrail layer that applies (SCPs, a permissions boundary, a session policy) must also allow it. Within one account, an Allow in either the identity policy or the resource policy is usually enough; across accounts, both the caller's identity policy and the resource policy must allow. A permissions boundary is a managed policy set on a user or role that caps the maximum permissions its identity policies can grant; it grants nothing by itself. Boundaries let developers create roles for their applications without being able to create a role more powerful than they are. The IAM policy simulator and IAM Access Analyzer help you test policies and find unintended external access, and Access Analyzer can also suggest a tighter policy based on the actions a role actually used.",
   "Consider a worked example. An application on EC2 needs to read one S3 bucket, and a developer suggests pasting an access key into a configuration file. Instead, the architect creates a role whose trust policy allows `ec2.amazonaws.com`, attaches a customer managed policy allowing only `s3:GetObject` on that bucket's objects, and attaches the role to the instance through an instance profile. The SDK on the instance finds temporary credentials automatically through the instance metadata service and refreshes them before they expire, so the code never handles a key at all. Later, security adds a bucket policy that explicitly denies all access unless the request uses TLS; the application still works because its requests are encrypted, and any plain HTTP request is refused regardless of the role's Allow. If the application had broken instead, the first place to look would be that new explicit Deny.",
   "Several mistakes come up again and again. People store access keys on instances or in code instead of using roles; think a permissions boundary or SCP grants access (they only limit it); forget that an explicit Deny beats any Allow; try to put a group in a policy's `Principal` element; and use the root user for daily work. Another trap is assuming an AWS managed policy is least privilege; it is a starting point you should narrow once you know what the workload actually calls.",
   "Finally, learn to read the exam's symptoms. Questions usually describe a symptom or a goal. 'Access denied despite an Allow' points to an explicit Deny, an SCP or a permissions boundary. 'Give an EC2 instance or Lambda function access to a service' points to an IAM role, never stored keys. 'Let developers create roles but cap what those roles can do' points to a permissions boundary, and 'grant another account access to a bucket without a role' points to a resource-based bucket policy. 'Find resources shared outside the account' points to IAM Access Analyzer."
  ],
  "analogy": "Policy evaluation works like a hotel key card system. The card opens nothing by default. The front desk programs it to open your room (an Allow). The building manager can declare a floor closed for repairs, and then no card opens it no matter what the desk programmed (an explicit Deny or SCP). A permissions boundary is like a card type that can only ever open guest floors, so even if the desk adds the penthouse, it still will not open. The analogy stops at roles: a role is not a person's card but a loaner card anyone trusted may borrow, and it expires by itself.",
  "terms": [
   [
    "IAM user",
    "A long-term identity for one person or application, with an optional password and optional access keys."
   ],
   [
    "IAM role",
    "An identity with permissions but no long-term credentials, assumed by a trusted principal to receive temporary credentials."
   ],
   [
    "IAM group",
    "A collection of IAM users that share attached policies; it cannot sign in, be nested or be a policy principal."
   ],
   [
    "Identity-based policy",
    "A policy attached to a user, group or role that states what that identity may do."
   ],
   [
    "Resource-based policy",
    "A policy attached to a resource, such as an S3 bucket policy, that names the principals allowed to access it."
   ],
   [
    "Trust policy",
    "The resource-based policy on a role that says which principals may assume it."
   ],
   [
    "Explicit deny",
    "A Deny statement that matches a request; it overrides any Allow in any policy."
   ],
   [
    "Permissions boundary",
    "A managed policy that sets the maximum permissions an IAM user or role can have, without granting any itself."
   ],
   [
    "Instance profile",
    "The container that passes an IAM role to an EC2 instance so software on it receives temporary credentials."
   ]
  ],
  "example": "A development team keeps asking the cloud team to create IAM roles for their Lambda functions. The cloud team lets them create roles themselves, but only if each new role has a permissions boundary attached that allows DynamoDB, S3 and CloudWatch Logs actions in the development account. A developer then creates a role with AdministratorAccess by mistake; because of the boundary, the function can still only use those three services, and an attempt to call IAM is denied.",
  "mistakes": [
   [
    "A permissions boundary or SCP gives an identity extra access.",
    "Both only cap permissions. The identity still needs an identity-based or resource-based Allow, and the effective permissions are the overlap."
   ],
   [
    "Putting an access key in a config file on EC2 is fine if the file is protected.",
    "Long-term keys can leak through backups, images and logs and must be rotated by hand. Attach a role through an instance profile so the SDK gets short-lived credentials automatically."
   ],
   [
    "You can grant a whole team access to a bucket by naming their IAM group as the Principal.",
    "Groups cannot be principals. Attach the policy to the group, or name users, roles or accounts in the bucket policy."
   ],
   [
    "An Allow in the identity policy always wins if it is specific enough.",
    "Specificity does not matter. Any matching explicit Deny in any applicable policy overrides every Allow."
   ]
  ],
  "tryit": [
   [
    "Coastal Freight's data team wants an external auditor's AWS account to read one S3 bucket of invoices. The auditor refuses to switch roles because their tooling cannot assume roles. Your manager suggests creating an IAM user with access keys for the auditor. What do you recommend?",
    "Add a bucket policy (a resource-based policy) that names the auditor's account or a specific principal in it, allowing only `s3:GetObject` and `s3:ListBucket` on that bucket. The auditor's own administrator must also allow those actions in their identity policy, because cross-account access needs both sides. This avoids long-term keys in your account entirely."
   ]
  ],
  "tip": "When a question asks why access is denied despite an Allow, look for an explicit Deny, an SCP or a permissions boundary. When it asks how to give an EC2 instance or Lambda function access, the answer is a role, never access keys stored on the instance.",
  "check": [
   [
    "A user's identity policy allows s3:DeleteObject, but the bucket policy explicitly denies it to that user. What happens?",
    "The request is denied. An explicit Deny in any applicable policy overrides every Allow."
   ],
   [
    "What does a permissions boundary do on its own?",
    "It grants nothing. It only limits the maximum permissions that the identity-based policies of that user or role can make effective."
   ],
   [
    "Can you nest an IAM group inside another group or name it as a principal?",
    "No. IAM groups cannot be nested and cannot be a principal in a policy; attach policies to the group or use roles instead."
   ],
   [
    "An account B user needs to read a bucket in account A without assuming a role. What must be true?",
    "Account A's bucket policy must allow the account B principal, and the user's identity policy in account B must also allow the S3 action, because cross-account access needs both sides."
   ]
  ]
 },
 {
  "t": "Multi-account security: AWS Organizations, service control policies, IAM Identity Center and cross-account roles",
  "hook": "You are three weeks into the job at Northwind Outfitters when the finance lead forwards you a surprise: a cloud bill with GPU instances running in a Region nobody uses. A developer in a sandbox account had admin rights, tested a tutorial, and forgot to shut it down. The CISO wants a guarantee that this cannot happen again in any of the company's forty accounts, even for administrators. Meanwhile, the help desk is drowning in requests to create IAM users in each account for new hires, and an outside monitoring vendor is asking for access too. One policy here, one there will not scale. How do you put guardrails over forty accounts at once?",
  "simple": "Big companies split their cloud into many separate accounts, like a company that rents separate offices for each team so a mess in one cannot spill into another. AWS Organizations is the landlord's office that groups those accounts, sends one combined bill, and posts building rules. A service control policy is a building rule such as 'no one may use these rooms', and it applies even to the boss of each office, though it never hands out keys by itself. IAM Identity Center is a single front door where employees sign in once and pick which office to visit. A cross-account role is a visitor pass one office issues so a program from another office can do a specific job, and an external ID is a secret word that proves the visitor really came for you.",
  "body": [
   "Large AWS customers rarely run everything in one account. Separate accounts give hard boundaries for security, billing and service quotas: a mistake or breach in a development account cannot touch production, and each team's spending is easy to see. AWS Organizations is the service that groups accounts together. One management account creates or invites member accounts, arranges them into organizational units (OUs) such as Security, Infrastructure, Production and Sandbox, and pays one consolidated bill, which also pools usage for volume discounts. The OU structure matters because policies attach to it, so a well-designed tree lets one change protect dozens of accounts.",
   "Service control policies (SCPs) are the guardrails. They are Organizations policies attached to the root, an OU or an account, and they define the maximum permissions available to IAM users and roles in the affected member accounts, including each account's root user. SCPs never grant permissions; an identity still needs an IAM policy that allows the action. Typical guardrails deny leaving the organization, deny disabling CloudTrail or GuardDuty, or deny any action outside approved Regions using the `aws:RequestedRegion` condition. SCPs attached higher in the tree are inherited, so an action must be allowed at every level from the root down to the account. SCPs do not affect the management account, which is one reason AWS recommends running no workloads there, and they do not restrict service-linked roles. A newer, related policy type, resource control policies (RCPs), sets maximum permissions on resources such as S3 buckets and KMS keys, which helps build a data perimeter that also applies to principals outside your organization.",
   "For people, AWS IAM Identity Center (the successor to AWS Single Sign-On) is the recommended way to sign in across many accounts. You connect an identity source, such as the built-in Identity Center directory, Active Directory, or an external identity provider (IdP) like Okta or Microsoft Entra ID, often with automatic user provisioning through the System for Cross-domain Identity Management (SCIM) standard. You then define permission sets. A permission set is a template of policies; when you assign a user or group a permission set on an account, Identity Center creates a matching role in that account. Users sign in once to the access portal, pick an account and role, and receive temporary credentials. There are no IAM users to create in each account, and when someone leaves, disabling them in the identity source removes access everywhere.",
   "For workloads and automation, cross-account access uses IAM roles. In the target account you create a role whose trust policy names the source account, or a specific role there, as the principal. In the source account, the calling identity needs permission for `sts:AssumeRole` on that role's ARN. Both sides must agree, which is a useful safety property: neither account can grant itself access alone. When a third party such as a monitoring vendor assumes a role in your account, you add an external ID condition to the trust policy to prevent the confused deputy problem, where the vendor is tricked into using its access to your account on behalf of another customer. The command below shows the call a script makes; the response contains temporary credentials for the session.",
   "```\naws sts assume-role \\\n  --role-arn arn:aws:iam::222233334444:role/AuditReadOnly \\\n  --role-session-name audit-run\n```",
   "Several other multi-account tools appear in questions. AWS Control Tower sets up and governs a landing zone: a recommended OU structure, a log archive account, an audit account, centralized CloudTrail and preventive and detective controls built from SCPs and AWS Config rules. Account Factory in Control Tower creates new accounts that already meet the baseline. AWS Resource Access Manager (RAM) shares resources such as VPC subnets, Transit Gateways or Route 53 Resolver rules across accounts, so a central networking team can own the network while application teams launch into it. Delegated administrator lets a member account, typically a security tooling account, run a service such as GuardDuty, Security Hub or AWS Config aggregation for the whole organization instead of the management account.",
   "Consider a worked example. A company must guarantee that no one in its workload accounts can create resources outside two approved Regions, and its auditors must read CloudTrail logs in every account. It uses Control Tower to create the landing zone, attaches an SCP to the Workloads OU that denies all actions when `aws:RequestedRegion` is not one of the two approved Regions, with exceptions for global services such as IAM, and assigns the auditors a read-only permission set through IAM Identity Center. Even an administrator in a member account cannot create an instance in a third Region, and the auditors never need separate IAM users. If the region-deny SCP had been forgotten for global services, IAM changes could break, which is why those exceptions matter.",
   "The common mistakes are predictable. Learners expect an SCP to grant access; forget that SCPs do not apply to the management account; create IAM users in every account for people instead of using Identity Center; and omit the external ID for third-party roles. Another is running workloads in the management account, where SCP guardrails cannot reach them.",
   "Exam questions often describe a governance goal, and the wording points to the service. 'Central guardrail across all accounts' or 'prevent even administrators from' points to an SCP. 'Single sign-on for employees across many accounts' points to IAM Identity Center. 'Application in account A must act in account B' points to a cross-account role with a trust policy, and 'third-party vendor access' adds an external ID. 'Quickly set up a governed multi-account environment' points to Control Tower, and 'share subnets or a Transit Gateway with other accounts' points to RAM."
  ],
  "analogy": "An SCP is like a building's fire code. The fire code does not give anyone a key to any room, but it can say no one may block the stairwell, and that applies to every tenant, including the tenant's own manager. Tenants still hand out their own keys (IAM policies) for everything else. The analogy breaks in one place the exam loves: the landlord's own office (the management account) is not covered by the code at all, so you keep nothing important there.",
  "terms": [
   [
    "AWS Organizations",
    "The service that groups AWS accounts for central management, policies and consolidated billing."
   ],
   [
    "Organizational unit (OU)",
    "A container of accounts inside AWS Organizations to which policies such as SCPs can be attached."
   ],
   [
    "Service control policy (SCP)",
    "An Organizations policy that sets the maximum permissions for identities in member accounts; it never grants access."
   ],
   [
    "IAM Identity Center",
    "The service for workforce single sign-on across many accounts, using permission sets and an identity source."
   ],
   [
    "Permission set",
    "An IAM Identity Center template of policies that becomes a role in each account it is assigned to."
   ],
   [
    "External ID",
    "A secret value required in a cross-account role's trust policy to protect against the confused deputy problem."
   ],
   [
    "AWS Control Tower",
    "A service that sets up and governs a multi-account landing zone with baseline accounts and controls."
   ]
  ],
  "example": "A payments company acquires a startup with 12 AWS accounts. It invites them into its organization, places them in a Workloads OU that inherits SCPs denying CloudTrail changes and unapproved Regions, connects IAM Identity Center to its corporate IdP so engineers sign in with their existing accounts, and makes the security account the delegated administrator for GuardDuty so findings from all 12 accounts arrive in one place.",
  "mistakes": [
   [
    "Attaching an SCP that allows S3 lets users in that account use S3.",
    "SCPs only filter. Users still need an IAM policy that allows S3; the SCP just makes S3 available to be granted."
   ],
   [
    "An SCP denying CloudTrail changes protects every account, including the management account.",
    "SCPs never apply to the management account, so keep workloads and day-to-day users out of it."
   ],
   [
    "For a vendor, a cross-account role trusting their account is enough.",
    "Add an external ID condition so the vendor cannot be tricked into using your role on behalf of another of its customers."
   ],
   [
    "Each account needs its own IAM users for engineers to log in.",
    "Use IAM Identity Center with permission sets so people sign in once and get temporary credentials in every assigned account."
   ]
  ],
  "tryit": [
   [
    "Bluefin Analytics has 25 accounts in one organization. Leadership wants to be sure nobody, even account administrators, can turn off GuardDuty, and the security team wants one place to see all GuardDuty findings without logging in to the management account. What two things do you set up?",
    "Attach an SCP at the root or relevant OUs that denies GuardDuty disable and delete actions (this applies to admins and root users in member accounts). Then designate the security tooling account as the GuardDuty delegated administrator so it enables and views findings for all member accounts, keeping the management account free of daily work."
   ]
  ],
  "tip": "SCPs filter, they do not grant, and they do not apply to the management account. If the question wants centralized sign-in for people across many accounts, choose IAM Identity Center; if it wants an application in account A to act in account B, choose a cross-account role.",
  "check": [
   [
    "An SCP allows only EC2 and S3 actions. A user in a member account has AdministratorAccess. Can the user create a DynamoDB table?",
    "No. The SCP sets the maximum available permissions, so actions outside EC2 and S3 are blocked regardless of the IAM policy."
   ],
   [
    "What two things are required for an identity in account A to assume a role in account B?",
    "The role in account B must trust account A (or that identity) in its trust policy, and the identity in account A must be allowed sts:AssumeRole on the role's ARN."
   ],
   [
    "Why should a vendor's cross-account role include an external ID condition?",
    "It prevents the confused deputy problem, where another customer of the vendor could trick the vendor into using its access to your account."
   ],
   [
    "Does an SCP restrict actions performed in the management account?",
    "No. SCPs do not affect the management account, which is why workloads should run in member accounts."
   ]
  ]
 },
 {
  "t": "Federation and temporary credentials: STS AssumeRole, SAML and OIDC federation, Cognito user pools vs identity pools",
  "hook": "At Pinecrest Fitness, the mobile team is days from launching a workout app, and Jordan, the back-end lead, has a whiteboard full of arrows. Customers must sign up with email or Apple, upload workout videos straight to S3, and call an API that only signed-in users may reach. Separately, the build pipeline still uses an access key that someone pasted into its settings two years ago, and an auditor just flagged it. A junior developer proposes creating an IAM user for every customer. Jordan knows that is wrong but has to explain why, and what to use instead, before the design review this afternoon. Which piece of AWS answers which part of this picture?",
  "simple": "Federation means letting people use a login they already have, like a work account or a Google account, instead of making a new AWS account for each of them. Behind the scenes, AWS hands out short-lived keys that stop working after a while, like a parking ticket that expires, so a stolen one is not useful for long. Big companies use a standard called SAML to connect their employee directory. Websites and build tools use a newer standard called OIDC that passes around signed tokens. For apps with lots of customers, Amazon Cognito has two parts: a user pool is the sign-up and sign-in desk that checks who you are, and an identity pool turns that proof into short-lived AWS keys so the app can talk to services like S3 directly.",
  "body": [
   "Federation lets people and applications use an identity they already have, such as a corporate login, a Google account or a token from a build system, to get AWS access instead of an IAM user. The engine underneath is AWS Security Token Service (STS), which issues temporary credentials: an access key ID, a secret access key and a session token, valid for a limited time that you configure on the role within allowed bounds. Because they expire on their own, temporary credentials are far safer than long-term access keys: a leaked set stops working shortly, and there is nothing to rotate. This is why so many exam answers steer away from IAM users and toward roles plus federation.",
   "The core STS calls are worth knowing by name, because the exam uses them as answer choices. `AssumeRole` is used by an IAM identity or AWS service to take on a role, including across accounts. `AssumeRoleWithSAML` exchanges a SAML 2.0 (Security Assertion Markup Language) assertion from a corporate identity provider (IdP), such as Active Directory Federation Services, for role credentials. `AssumeRoleWithWebIdentity` exchanges a token from an OpenID Connect (OIDC) provider; it is how continuous integration and delivery (CI/CD) systems such as GitHub Actions get AWS roles without stored keys, and how Kubernetes pods on Amazon EKS use IAM roles for service accounts. `GetSessionToken` returns temporary credentials for an IAM user, often after a multi-factor authentication (MFA) check. `GetFederationToken` is an older option for brokered federation.",
   "SAML federation is the traditional workforce pattern. An employee signs in to the company IdP, which posts a signed assertion listing the roles the user may use to the AWS sign-in endpoint; AWS validates the signature against the IdP metadata you registered in IAM and the user lands in the console with that role's permissions. Nobody in AWS ever stores the employee's password. Today IAM Identity Center wraps this pattern for multi-account organizations, and it is the preferred exam answer for workforce access.",
   "OIDC federation is the modern pattern for web identities and workloads. You register the provider in IAM, and the role's trust policy restricts which audience (`aud`) and subject (`sub`) values in the token may assume it, for example only one repository and branch. Those conditions are the whole security story: without them, any token from that provider, including one minted for somebody else's project, could assume your role. When you review a trust policy for a pipeline, check that the subject condition is narrow.",
   "Amazon Cognito serves customer-facing web and mobile apps and has two parts that the exam loves to contrast. A Cognito user pool is a user directory and sign-in service: sign-up, sign-in, MFA, password reset, account recovery and sign-in through social providers or SAML, returning JSON Web Tokens (JWTs). Those tokens can authorize calls to API Gateway through a Cognito authorizer, or an Application Load Balancer can authenticate users against the user pool. A Cognito identity pool (federated identities) exchanges a token, from a user pool or from a provider like Google or Apple, for temporary AWS credentials tied to an IAM role, so the app can call AWS services such as S3 or DynamoDB directly. Identity pools can also give limited guest access to unauthenticated users through a separate role.",
   "In short, user pools answer who is this user, and identity pools answer what AWS credentials this user gets. Many apps use both. Fine-grained access, such as letting each user read only their own folder in S3 or their own items in DynamoDB, uses policy variables like `${cognito-identity.amazonaws.com:sub}` in the identity pool role's policy, or the `dynamodb:LeadingKeys` condition. One role then serves millions of users safely, because the variable is replaced with each caller's own identity at request time.",
   "Consider a worked example. A mobile photo app lets customers sign in with email or Google through a Cognito user pool. The app trades the user pool's ID token at an identity pool for temporary credentials. The authenticated role allows `s3:PutObject` only on `photos/${cognito-identity.amazonaws.com:sub}/*`, so each user can write only to their own prefix. Separately, the company's build pipeline deploys the app's back end by calling `AssumeRoleWithWebIdentity` with its OIDC token; the deploy role's trust policy accepts only tokens whose subject names the main branch of one repository, so no long-term key sits in the pipeline settings.",
   "The common mistakes follow a pattern. Learners choose a user pool when the app must call AWS services directly (that needs an identity pool); create IAM users for millions of app customers; store access keys in a mobile app or CI system when federation is available; and trust an OIDC provider without restricting the audience and subject, which could let any token from that provider assume the role. Also remember that temporary credentials cannot be revoked one by one, but you can deny sessions issued before a time by adding a policy with the `aws:TokenIssueTime` condition, which the console's revoke sessions button does for you.",
   "Exam wording is usually clear once you know the map. 'Corporate directory', 'Active Directory' or 'SAML' for employees points to IAM Identity Center or `AssumeRoleWithSAML`. 'Mobile app users need to upload directly to S3' points to a Cognito identity pool. 'Sign-up and sign-in for app users', 'social login' or 'JWT to authorize API Gateway' points to a Cognito user pool. 'CI/CD without long-lived keys' points to OIDC and `AssumeRoleWithWebIdentity`, and 'temporary credentials' anywhere points to STS."
  ],
  "analogy": "A Cognito user pool is the ticket booth at a concert: it checks your ID and hands you a wristband (a JWT) that proves you bought a ticket. An identity pool is the bar inside that looks at your wristband and gives you a drink token (temporary AWS credentials) worth only certain drinks (the IAM role's permissions). You can have a booth without a bar if all you need is entry to the API. The analogy stops where wristbands last all night: AWS credentials expire much sooner and are refreshed by the app.",
  "terms": [
   [
    "AWS STS",
    "The Security Token Service, which issues temporary, expiring credentials for roles and federated users."
   ],
   [
    "Federation",
    "Granting AWS access to identities managed outside IAM, such as a corporate IdP or web identity provider."
   ],
   [
    "SAML 2.0",
    "An XML-based standard for exchanging signed authentication assertions, commonly used for workforce federation."
   ],
   [
    "OpenID Connect (OIDC)",
    "An identity layer on OAuth 2.0 whose signed tokens can be exchanged for AWS role credentials."
   ],
   [
    "AssumeRoleWithWebIdentity",
    "The STS operation that exchanges an OIDC token for a role's temporary credentials."
   ],
   [
    "Cognito user pool",
    "A managed user directory that handles sign-up and sign-in and returns JWTs."
   ],
   [
    "Cognito identity pool",
    "A service that exchanges identity tokens for temporary AWS credentials mapped to IAM roles."
   ]
  ],
  "example": "A fitness app has two million users. The team creates a Cognito user pool for sign-up with email and Apple sign-in, and protects its API Gateway endpoints with a Cognito user pool authorizer. For workout video uploads the app uses an identity pool, whose role allows writes only to each user's own S3 prefix, so large uploads go straight to S3 without passing through the API or needing any IAM users.",
  "mistakes": [
   [
    "A Cognito user pool lets the mobile app write directly to S3.",
    "A user pool only authenticates and returns JWTs. To call AWS services directly, exchange the token at an identity pool for temporary AWS credentials."
   ],
   [
    "Creating an IAM user per customer is acceptable for a small app.",
    "IAM users are for a small number of internal identities and have account limits. Customer identities belong in Cognito, which scales and issues temporary credentials."
   ],
   [
    "Registering an OIDC provider and trusting it in a role is enough for CI/CD.",
    "Without conditions on the token's audience and subject, other projects using the same provider might assume the role. Restrict both."
   ],
   [
    "You can revoke one specific set of temporary credentials directly.",
    "You cannot revoke them individually, but you can deny all sessions issued before a time with an aws:TokenIssueTime condition, which is what revoke sessions does."
   ]
  ],
  "tryit": [
   [
    "Maplewood Library is building a web app where patrons sign in with Google and then upload profile photos. Photos should go straight to S3, and each patron must only touch their own folder. The developer has set up a Cognito user pool with Google sign-in. What is still missing?",
    "A Cognito identity pool that accepts the user pool's tokens and maps signed-in users to an IAM role. That role's policy should allow `s3:PutObject` only on a prefix that uses the `${cognito-identity.amazonaws.com:sub}` variable, so each patron writes only to their own folder."
   ],
   [
    "A build pipeline deploys to AWS with an access key stored in its secrets settings. Security wants no long-lived keys. The pipeline platform can issue OIDC tokens. What do you change?",
    "Register the platform as an OIDC provider in IAM, create a deploy role whose trust policy accepts only tokens with the right audience and a subject matching the specific repository and branch, and have the pipeline call AssumeRoleWithWebIdentity. Then delete the access key."
   ]
  ],
  "tip": "If a mobile or web app needs its users to call AWS services directly, the answer involves a Cognito identity pool. If the question is only about sign-up and sign-in for app users, it is a user pool. Corporate users and SAML point to IAM Identity Center or AssumeRoleWithSAML.",
  "check": [
   [
    "Which STS operation does a CI/CD pipeline using an OIDC token call to get AWS credentials?",
    "AssumeRoleWithWebIdentity, which exchanges the OIDC token for a role's temporary credentials."
   ],
   [
    "An API Gateway API must accept only signed-in app users. Which Cognito component provides the authorizer?",
    "A Cognito user pool, whose JWTs API Gateway can validate with a Cognito user pool authorizer."
   ],
   [
    "Why are temporary credentials safer than IAM user access keys?",
    "They expire automatically after a limited time, so a leaked set has a short useful life and there is nothing long-lived to rotate."
   ],
   [
    "How do you restrict an OIDC federated role so only one repository's main branch can assume it?",
    "Add conditions in the role's trust policy on the token's audience and subject claims that match that repository and branch."
   ]
  ]
 },
 {
  "t": "VPC security layers: security groups vs network ACLs, public and private subnets, NAT gateways, bastion hosts vs Session Manager",
  "hook": "Your phone buzzes at 2:10 a.m. It is Sam from the night shift at Riverbend Health: the patching job on the private app servers has failed for the third night in a row, and an overnight security scan has flagged port 22 open to the whole internet on a lonely instance called bastion-old. Sam also noticed that someone added an allow rule to a network ACL last week and the replies from the patch servers seem to vanish. You open the VPC console and see route tables, security groups, NACLs, a NAT gateway in one Availability Zone, and a jump box nobody wants to own. Which of these layers is actually broken, and which should simply be removed?",
  "simple": "A VPC is your own private network inside AWS, cut into smaller sections called subnets. A subnet is 'public' only if its road map (route table) has a road to the internet's front door, called an internet gateway. Private subnets have no such road, so outsiders cannot start a conversation with them. If private servers need to reach out, for example to download updates, a NAT gateway acts like a mail room that sends letters out and passes replies back in, but never lets strangers walk in. Security groups are bouncers at each server's door who remember who left and let them back in. Network ACLs are guards at the subnet gate with a checklist who remember nothing. Session Manager lets admins open a command line on a server without opening any door at all.",
  "body": [
   "A virtual private cloud (VPC) is your own isolated network in an AWS Region, defined by an IPv4 CIDR (Classless Inter-Domain Routing) block such as `10.0.0.0/16`. You divide it into subnets, and each subnet lives in exactly one Availability Zone (AZ). Security in a VPC comes in layers: where a subnet can route, which firewalls sit in front of each resource, and how administrators reach machines. The exam expects you to design all three so that only the load balancer faces the internet and everything else stays private.",
   "Start with routing, because it decides what is public. What makes a subnet public is its route table, not its name. A public subnet has a route `0.0.0.0/0` pointing to an internet gateway, and instances there need a public or Elastic IP address to be reachable. A private subnet has no route to the internet gateway, so nothing on the internet can start a connection to it. Instances in private subnets often still need outbound internet access for patches and external APIs. A NAT (network address translation) gateway provides that: you place it in a public subnet with an Elastic IP, and the private subnet's route table sends `0.0.0.0/0` to it. It allows outbound connections and their replies but blocks inbound connections from the internet. A NAT gateway lives in one AZ, so for high availability you deploy one per AZ and route each private subnet to the gateway in its own AZ. NAT instances are the older self-managed alternative, and for IPv6 an egress-only internet gateway plays the same outbound-only role. The route table below is what you would expect to see on a private subnet.",
   "```\nPrivate subnet route table\nDestination     Target\n10.0.0.0/16     local\n0.0.0.0/0       nat-0abc (NAT gateway in the same AZ)\n```",
   "Two firewall layers then protect resources, and the exam tests their differences closely. Security groups attach to elastic network interfaces, and so to instances, load balancers, RDS databases and Lambda functions in a VPC. They are stateful, meaning return traffic is automatically allowed; they support only allow rules; and all rules are evaluated together. A rule's source can be another security group, which is the clean way to say only the web tier may reach the database tier, even as instances come and go in an Auto Scaling group and their IP addresses change. Network ACLs (NACLs) attach to subnets and are stateless, so you must explicitly allow return traffic on ephemeral ports (typically 1024-65535). They support both allow and deny rules and are evaluated in rule-number order, with the first match winning. Use a NACL deny when you need to block a specific IP range, because security groups cannot deny. Most designs leave NACLs fairly open and do the fine-grained work in security groups.",
   "Administrators still need a way to reach private instances. The classic answer is a bastion host: a hardened instance in a public subnet that allows SSH (Secure Shell) from known IP ranges, from which you hop to private instances. It works, but it needs patching, SSH key management and an open inbound port, and shared keys make it hard to know who did what. AWS Systems Manager Session Manager is the modern answer: the SSM Agent on the instance makes an outbound connection to Systems Manager, and you open a shell from the console or with `aws ssm start-session --target i-0123abcd`, with IAM controlling who may connect. There are no inbound ports and no SSH keys, and sessions can be logged to CloudWatch Logs or S3. The instance needs an instance profile with the `AmazonSSMManagedInstanceCore` permissions and a path to the Systems Manager endpoints, through a NAT gateway or interface endpoints. EC2 Instance Connect Endpoint is another keyless option for SSH into private instances.",
   "Consider a worked example. A three-tier app puts its Application Load Balancer (ALB) in public subnets in two AZs, its EC2 web servers and RDS database in private subnets, and a NAT gateway in each AZ. The ALB security group allows 443 from anywhere; the web security group allows 443 only from the ALB security group; the database security group allows 3306 only from the web security group. Operators use Session Manager, so no instance has port 22 open. When a scanner from one IP range floods the site, the team adds a NACL deny rule for that range on the public subnets, numbered lower than the allow rules so it is evaluated first. If they had numbered it higher, an earlier allow rule would match first and the deny would never be reached.",
   "The common mistakes are worth rehearsing. Learners call a subnet public just because instances have public IPs (the route to an internet gateway is what matters); forget that NACLs are stateless, which causes replies to be dropped; try to write a deny rule in a security group; place a single NAT gateway for all AZs, which becomes a single point of failure and adds cross-AZ data charges; and put the NAT gateway in a private subnet, where it has no route out. Opening SSH to `0.0.0.0/0` on a bastion is also a classic finding.",
   "Exam questions use consistent clue words. 'Stateful', 'allow only' or 'reference another tier' points to a security group. 'Stateless', 'deny a specific IP address' or 'rule order' points to a network ACL. 'Private instances need to download patches but must not be reachable from the internet' points to a NAT gateway, one per AZ for resilience. 'Shell access with no open inbound ports and no key management' points to Session Manager rather than a bastion host."
  ],
  "analogy": "A security group is like a hotel doorman who remembers faces: if you walked out, he lets you back in without checking the list. A network ACL is a toll booth that checks every car both ways against a numbered rulebook and stops at the first matching rule, with no memory of who drove out earlier. That is why NACLs need explicit rules for return traffic. The analogy stops at denial: the doorman can only wave approved guests in and has no way to turn away one specific person, while the toll booth can.",
  "terms": [
   [
    "Security group",
    "A stateful, allow-only virtual firewall attached to network interfaces."
   ],
   [
    "Network ACL",
    "A stateless subnet-level firewall with numbered allow and deny rules evaluated in order."
   ],
   [
    "Public subnet",
    "A subnet whose route table sends internet-bound traffic to an internet gateway."
   ],
   [
    "NAT gateway",
    "A managed service in a public subnet that lets private instances start outbound internet connections."
   ],
   [
    "Ephemeral ports",
    "The high-numbered temporary ports clients use for return traffic, which stateless NACLs must allow explicitly."
   ],
   [
    "Bastion host",
    "A hardened instance in a public subnet used as a jump point for SSH into private instances."
   ],
   [
    "Session Manager",
    "A Systems Manager feature that gives shell access to instances over an outbound agent connection, controlled by IAM."
   ]
  ],
  "example": "A company's audit finds port 22 open to the internet on a bastion host with shared SSH keys. The team installs the SSM Agent on all instances, attaches an instance profile with Systems Manager core permissions, adds interface endpoints for Systems Manager in the private subnets, logs every session to S3 and deletes the bastion. Engineers now connect with IAM-controlled sessions, and no security group anywhere allows inbound SSH.",
  "mistakes": [
   [
    "A subnet is public if its instances have public IP addresses.",
    "A subnet is public only if its route table sends 0.0.0.0/0 to an internet gateway. A public IP in a private subnet is still unreachable."
   ],
   [
    "You can block a single abusive IP with a security group deny rule.",
    "Security groups have only allow rules. Use a network ACL deny rule, numbered before the allow rules."
   ],
   [
    "One NAT gateway is enough for a highly available VPC.",
    "A NAT gateway lives in one AZ. If that AZ fails, every private subnet routed to it loses outbound access. Deploy one per AZ."
   ],
   [
    "Allowing inbound 443 on a NACL is enough for HTTPS to work.",
    "NACLs are stateless. You must also allow the outbound replies on ephemeral ports (and the reverse for connections the instance starts)."
   ]
  ],
  "tryit": [
   [
    "Oakridge Logistics runs private EC2 instances in two AZs that pull updates through a single NAT gateway in AZ-a. During an AZ-a outage, the instances in AZ-b also lose internet access. Finance also complains about cross-AZ data charges. What do you change?",
    "Add a NAT gateway in a public subnet in AZ-b and update the AZ-b private route table so its 0.0.0.0/0 route targets the local NAT gateway. Each AZ then has independent outbound access, and traffic no longer crosses AZs to reach the NAT gateway."
   ]
  ],
  "tip": "Stateful and allow-only means security group; stateless with deny rules and ordering means network ACL. When a question asks for shell access with no open inbound ports and no key management, choose Session Manager over a bastion host.",
  "check": [
   [
    "Outbound HTTPS from a private instance works through a NAT gateway, but replies are dropped. The security group is fine. What should you check?",
    "The subnet's network ACL. NACLs are stateless, so they need an inbound rule allowing return traffic on ephemeral ports."
   ],
   [
    "How do you make a NAT design survive the loss of one Availability Zone?",
    "Deploy a NAT gateway in each AZ and route each private subnet to the NAT gateway in its own AZ."
   ],
   [
    "You must block one abusive IP range from reaching a subnet. Security group or NACL?",
    "A network ACL deny rule, because security groups support only allow rules."
   ],
   [
    "What must an instance have to be managed with Session Manager?",
    "The SSM Agent, an instance profile with Systems Manager core permissions, and network access to the Systems Manager endpoints through NAT or interface endpoints."
   ]
  ]
 },
 {
  "t": "Private access to AWS services: gateway endpoints, interface endpoints (PrivateLink) and endpoint policies",
  "hook": "The monthly cost review at Cedar Valley Analytics is going badly. Line one on the bill is NAT gateway data processing, and it is bigger than the EC2 fleet itself. Elena, the data platform lead, explains that the nightly jobs pull terabytes from S3, and every byte flows from private subnets through the NAT gateway. The security team piles on: they want proof that the data buckets can only be reached from inside the company network, and the jobs also need Secrets Manager and SQS without touching the internet. Someone suggests just opening a public subnet. Elena thinks there is a cleaner way that is both cheaper and more private. What is it?",
  "simple": "AWS services like S3 normally live at public addresses on the internet. Private servers can reach them through a NAT gateway, but that is like driving out onto the public highway and paying a toll each time. VPC endpoints build a private side road from your network straight to the service, so traffic never leaves AWS. There are two kinds. A gateway endpoint is a free entry in your road map that works only for S3 and DynamoDB. An interface endpoint puts a small network card with a private address in your subnet that stands in for almost any AWS service, and it costs a little per hour. Endpoint policies act like a sign on the side road saying which destinations are allowed, for example only your company's buckets.",
  "body": [
   "Most AWS services, such as S3, DynamoDB, SQS and Secrets Manager, are reached through public service endpoints. A private instance can reach them through a NAT gateway, but then the traffic leaves your VPC's private address space, needs an internet path, and you pay NAT data processing charges. VPC endpoints let resources in your VPC reach AWS services privately, without an internet gateway, NAT device or public IP addresses, and the traffic stays on the AWS network. Many security and cost questions on the exam turn on choosing the right kind of endpoint, so the distinctions below are worth learning precisely.",
   "Gateway endpoints are the simpler kind, and they exist for exactly two services: Amazon S3 and Amazon DynamoDB. You create the endpoint and select route tables; AWS adds a route whose destination is the service's prefix list (a managed list of the service's IP ranges, shown as `pl-xxxxxxxx`) and whose target is the endpoint. Applications keep using the normal service hostname, and the route table does the rest. Gateway endpoints have no hourly or data charge. They only work for traffic that originates inside the VPC; they cannot be used from on-premises over VPN or Direct Connect, or from a peered VPC, because a route table entry cannot be followed from outside the VPC that owns it.",
   "Interface endpoints are powered by AWS PrivateLink and work differently. Each one places an elastic network interface with a private IP address in the subnets you choose, one per AZ for resilience, and a security group controls who can reach it. With private DNS enabled, the service's normal hostname, such as `secretsmanager.eu-west-1.amazonaws.com`, resolves to those private IPs inside the VPC, so applications need no code changes. Interface endpoints exist for most AWS services, including S3, and for your own or partner services published as endpoint services behind a Network Load Balancer. They are billed per hour per AZ plus per gigabyte processed. Because they are real IP addresses, they can be reached from on-premises networks over VPN or Direct Connect and from peered or Transit Gateway-connected VPCs.",
   "Endpoint policies add control on the network path. They are resource-based policies on the endpoint itself that limit what can be done through it. For example, an S3 gateway endpoint policy can allow access only to the company's own buckets, which helps stop data being copied to a personal bucket. The other side of the control is on the resource: a bucket policy can use the `aws:SourceVpce` condition to deny any request that did not come through a specific endpoint, or `aws:SourceVpc` for a specific VPC. Together, endpoint policies and resource policies form a data perimeter: trusted identities, accessing trusted resources, from expected networks. A bucket policy condition like the one below appears in many exam answers.",
   "```\n\"Condition\": {\n  \"StringNotEquals\": { \"aws:SourceVpce\": \"vpce-0a1b2c3d\" }\n}\n```",
   "PrivateLink also solves a networking problem: exposing one service to many consumer VPCs, even in other accounts, without peering whole networks and without worrying about overlapping CIDR ranges. The provider puts the service behind a Network Load Balancer and creates an endpoint service; each consumer creates an interface endpoint in its own VPC and sees only that endpoint, not the provider's network. Traffic flows one way, consumer to provider, which keeps the exposure small. The provider can require that it accepts each connection request before traffic flows.",
   "Consider a worked example. An analytics fleet in private subnets reads terabytes a day from S3 through a NAT gateway, and the NAT processing charges are high. The architect adds an S3 gateway endpoint to the private route tables, with an endpoint policy allowing only the company's data buckets. Traffic now stays on the AWS network, NAT charges for that traffic disappear, and a bucket policy denies requests not coming through the endpoint. The same fleet also calls Secrets Manager and SQS, so the architect adds interface endpoints for those two services in each AZ with private DNS enabled, and removes the NAT gateway once nothing else needs the internet.",
   "The common mistakes are mostly about scope. Learners expect a gateway endpoint to work from on-premises or a peered VPC; forget to associate the gateway endpoint with every private route table; create an interface endpoint in only one AZ; leave the endpoint's security group closed to the application on port 443; and assume an endpoint policy grants access by itself, when IAM and resource policies must still allow the call.",
   "Exam questions usually hinge on where the traffic comes from and which service it targets. 'S3 or DynamoDB from inside the VPC at the lowest cost' points to a gateway endpoint. 'Any other service privately', 'access from on-premises' or 'share a service with many VPCs or accounts with overlapping CIDRs' points to an interface endpoint and PrivateLink. 'Ensure the bucket can only be reached from our VPC' points to a bucket policy with `aws:SourceVpce` or `aws:SourceVpc`."
  ],
  "analogy": "A gateway endpoint is like a private shortcut drawn on your office building's floor map: anyone inside the building who follows the map takes the shortcut to S3, but a visitor from another building cannot use your map. An interface endpoint is like a service desk with its own phone extension installed on your floor: anyone who can dial that extension, including colleagues calling in from a branch office, can reach it. The analogy stops at price: the map shortcut is free, while the desk is billed for every hour it is staffed in each AZ and for data handled.",
  "terms": [
   [
    "VPC endpoint",
    "A private connection from a VPC to a supported AWS or partner service without using the internet."
   ],
   [
    "Gateway endpoint",
    "A route-table target that gives private, free access to S3 or DynamoDB from within a VPC."
   ],
   [
    "Interface endpoint",
    "A PrivateLink network interface with private IPs in your subnets that fronts an AWS or partner service."
   ],
   [
    "AWS PrivateLink",
    "The technology that exposes a service through interface endpoints in consumer VPCs without peering."
   ],
   [
    "Prefix list",
    "A managed set of IP ranges for a service, used as the destination of a gateway endpoint route."
   ],
   [
    "Endpoint policy",
    "A resource policy on a VPC endpoint that restricts which actions and resources can be reached through it."
   ],
   [
    "aws:SourceVpce",
    "A condition key that matches the ID of the VPC endpoint a request came through."
   ]
  ],
  "example": "A software company sells a monitoring service to 300 customers, many of whom use the same 10.0.0.0/16 range. Instead of VPC peering, which fails with overlapping CIDRs, it places the service behind a Network Load Balancer and publishes it as a PrivateLink endpoint service. Each customer creates an interface endpoint in its own VPC after the company accepts the connection request, and traffic reaches the service privately without either side exposing its network.",
  "mistakes": [
   [
    "A gateway endpoint for S3 can be used by on-premises servers over Direct Connect.",
    "Gateway endpoints only serve traffic that starts inside the VPC. On-premises access needs an S3 interface endpoint, whose private IPs are reachable over Direct Connect or VPN."
   ],
   [
    "Interface endpoints are the cheapest way to reach S3 from a VPC.",
    "Interface endpoints have hourly and per-gigabyte charges. For in-VPC traffic to S3 or DynamoDB, a gateway endpoint is free."
   ],
   [
    "An endpoint policy that allows a bucket grants access to it.",
    "Endpoint policies only limit what passes through. IAM and bucket policies must still allow the request."
   ],
   [
    "VPC peering is the best way to share one service with hundreds of customer VPCs.",
    "Peering exposes whole networks and fails with overlapping CIDRs. PrivateLink exposes only the service and tolerates overlapping ranges."
   ]
  ],
  "tryit": [
   [
    "Willow Bank has removed the NAT gateway from a private subnet to meet a no-internet rule. Its Lambda functions in that subnet now time out when calling SQS and when reading from DynamoDB. What do you add, and which kind for each service?",
    "Add a DynamoDB gateway endpoint associated with the subnet's route table (free, route-based). Add an SQS interface endpoint in each AZ the functions use, with private DNS enabled and a security group allowing HTTPS from the functions' security group. Both keep traffic on the AWS network with no internet path."
   ]
  ],
  "tip": "S3 or DynamoDB, from inside the VPC, lowest cost: gateway endpoint. Any other service, or access from on-premises, or sharing a service with other VPCs: interface endpoint (PrivateLink).",
  "check": [
   [
    "On-premises servers connected by Direct Connect need private access to S3. Can they use a gateway endpoint?",
    "No. Gateway endpoints only serve traffic originating in the VPC. Use an S3 interface endpoint, which has private IPs reachable over Direct Connect."
   ],
   [
    "How do you ensure a bucket is reachable only through a specific VPC endpoint?",
    "Add a bucket policy that denies requests when aws:SourceVpce does not equal that endpoint's ID."
   ],
   [
    "Which two services support gateway endpoints?",
    "Amazon S3 and Amazon DynamoDB; every other service uses interface endpoints."
   ],
   [
    "An app in a private subnet calls Secrets Manager and fails after the NAT gateway is removed. What fixes it without internet access?",
    "Create a Secrets Manager interface endpoint in the app's subnets with private DNS enabled and a security group allowing HTTPS from the app."
   ]
  ]
 },
 {
  "t": "Protecting the edge: AWS WAF, Shield Standard vs Shield Advanced, and CloudFront with origin access control",
  "hook": "It is the week before the big spring sale at Tidewater Outdoor, and the login page is under siege. Thousands of password attempts per minute come from a handful of IP addresses, a scraper is copying every product page, and the marketing team just learned that unpublished catalog photos can be downloaded straight from the S3 bucket behind the site. The CTO asks Marcus, the solutions architect, for a plan by tomorrow: stop the bots, survive a possible flood of attack traffic during the sale, and close the bucket without breaking the website. There are three AWS services in the edge toolbox with overlapping marketing. Which one handles which threat?",
  "simple": "The edge is the front door where your website meets the internet. CloudFront is a network of servers around the world that keeps copies of your site close to visitors and absorbs a lot of traffic before it ever reaches your own servers. AWS WAF is a filter that reads each web request and blocks the bad-looking ones, such as attempts to sneak database commands into a form, or one address sending far too many requests. AWS Shield protects against floods meant to knock you offline. The basic version is always on and free; the advanced version is paid and adds experts and refunds for attack-related costs. Origin access control locks the storage bucket so only CloudFront can read it, the way a stockroom only opens for the shop counter, not for customers walking in from the alley.",
  "body": [
   "The edge is where your application meets the internet, and it is the best place to stop bad traffic before it reaches your servers. AWS offers three services that work together there: AWS WAF for application-layer filtering, AWS Shield for distributed denial of service (DDoS) protection, and Amazon CloudFront, the content delivery network (CDN) that serves and filters traffic at a global network of edge locations. Understanding which layer each one covers lets you answer most edge-security questions quickly.",
   "AWS WAF is a web application firewall, and it works at the level of individual HTTP requests. You create a web access control list (web ACL) and associate it with a CloudFront distribution, an Application Load Balancer, an API Gateway REST API, an AppSync GraphQL API, a Cognito user pool or certain other supported services. It inspects HTTP(S) requests at layer 7 and applies rules in priority order: AWS managed rule groups for common threats such as SQL injection and cross-site scripting (XSS) and known bad inputs, IP set rules to block or allow address ranges, geographic match rules, regular expression and header matches, and rate-based rules that block a source sending too many requests in a time window. Rules can block, allow, count (to test safely) or present a CAPTCHA or challenge. WAF cannot be attached to a Network Load Balancer or directly to an EC2 instance, because those do not process HTTP requests in a way WAF can inspect.",
   "AWS Shield addresses a different threat: volume. Shield Standard is automatic and included for every AWS customer at no extra charge. It protects against the most common network and transport layer (layer 3 and 4) attacks, such as SYN floods and UDP reflection. Shield Advanced is a paid subscription for higher protection on specific resources: CloudFront distributions, Route 53 hosted zones, Global Accelerator accelerators, Elastic Load Balancers and Elastic IP addresses. It adds detection and mitigation tuned to your traffic, application-layer DDoS mitigation using WAF, near real-time attack visibility, access to the AWS Shield Response Team (SRT) during attacks, AWS WAF at no extra cost for protected resources, and cost protection that credits scaling charges caused by a DDoS attack.",
   "CloudFront itself is a strong defense because attack traffic is spread across many edge locations, and only cache misses reach your origin. But that protection only helps if users cannot go around it. To make sure users cannot skip CloudFront and hit an S3 origin directly, use origin access control (OAC). You enable OAC on the distribution, keep the bucket private with Block Public Access on, and add a bucket policy that allows `s3:GetObject` only when the principal is `cloudfront.amazonaws.com` and `aws:SourceArn` equals your distribution's ARN. OAC replaces the older origin access identity (OAI) and supports objects encrypted with SSE-KMS (server-side encryption with AWS Key Management Service keys). For custom origins such as an ALB, common patterns are to have CloudFront add a secret custom header that the ALB requires, and to allow only the CloudFront managed prefix list in the ALB's security group.",
   "It helps to think of the three services as a stack. Shield absorbs floods at the network and transport layers, CloudFront spreads load and hides the origin, and WAF reads each request and decides whether it looks malicious. A strong design uses all three: Shield Standard is already there, WAF is attached to the distribution, and the origin accepts traffic only from CloudFront. Shield Advanced is added when the business impact of downtime or the cost of an attack-driven scale-out justifies a subscription.",
   "Consider a worked example. A retail site sees bots hammering its login page and a scraper copying product pages. The team attaches a WAF web ACL to its CloudFront distribution with the AWS managed core rule set, a rate-based rule scoped to the `/login` path, and a geographic rule blocking countries where the company does not trade. It first runs the new rules in count mode for a day to check for false positives, then switches them to block. Because a major sale is coming, the company also subscribes to Shield Advanced, so the Shield Response Team can help during an attack and any scaling costs caused by one are credited. Product images live in a private S3 bucket that only the distribution can read through OAC.",
   "The common mistakes come from mixing up layers. Learners expect WAF to stop a volumetric layer 3 flood (that is Shield's job) or Shield to stop SQL injection (that is WAF's job); try to put WAF on a Network Load Balancer; leave an S3 origin public so users can bypass CloudFront and its WAF rules; and use the legacy OAI when a question stresses SSE-KMS support. Another trap is thinking Shield Standard must be enabled; it is always on.",
   "Exam questions use clear signals. 'SQL injection', 'cross-site scripting', 'block requests from certain countries' or 'limit requests per IP' points to AWS WAF. 'Large DDoS attack', 'expert support during an attack' or 'protect against unexpected scaling costs from an attack' points to Shield Advanced. 'Protection against common DDoS at no extra cost' is Shield Standard. 'Users must not access S3 content directly, only through CloudFront' points to origin access control with a private bucket."
  ],
  "analogy": "Picture a busy stadium. Shield is the crowd-control barrier system outside that keeps a stampede from crushing the gates. WAF is the ticket checker at each turnstile who looks at every person and turns away anyone with a fake ticket or who keeps trying to push through. CloudFront is the many entrances spread around the stadium so no single gate is overwhelmed. OAC is locking the loading dock so nobody slips in the back. The analogy stops at payment: the basic barriers (Shield Standard) come free with every stadium.",
  "terms": [
   [
    "AWS WAF",
    "A layer 7 web application firewall that filters HTTP(S) requests using rules in a web ACL."
   ],
   [
    "Web ACL",
    "The AWS WAF resource that holds rules and is associated with CloudFront, ALB, API Gateway and other supported resources."
   ],
   [
    "Rate-based rule",
    "A WAF rule that blocks source IPs exceeding a request count within a time window."
   ],
   [
    "Shield Standard",
    "Automatic, no-extra-cost protection for all AWS customers against common layer 3 and 4 DDoS attacks."
   ],
   [
    "Shield Advanced",
    "A paid DDoS protection tier with SRT support, advanced detection and DDoS cost protection."
   ],
   [
    "Origin access control (OAC)",
    "A CloudFront feature that signs requests to an S3 origin so the bucket can stay private and accept only that distribution."
   ]
  ],
  "example": "A news site's S3 bucket was public so CloudFront could read it, and researchers noticed they could download unpublished images straight from the bucket URL. The team enables origin access control on the distribution, turns on Block Public Access, and replaces the bucket policy with one that allows reads only from the CloudFront service principal for that distribution's ARN. Direct bucket requests now return access denied while the site keeps working.",
  "mistakes": [
   [
    "AWS WAF will stop a large SYN flood.",
    "SYN floods are layer 3 and 4 attacks handled by AWS Shield. WAF inspects layer 7 HTTP requests."
   ],
   [
    "Shield Advanced is needed to block SQL injection.",
    "SQL injection is an application-layer attack blocked by WAF rules, such as AWS managed rule groups."
   ],
   [
    "You can attach a WAF web ACL to a Network Load Balancer.",
    "WAF attaches to CloudFront, ALB, API Gateway REST APIs, AppSync, Cognito user pools and similar services, not NLBs or EC2 instances directly."
   ],
   [
    "The S3 origin must stay public so CloudFront can read it.",
    "With origin access control the bucket stays private and its policy allows only the CloudFront service principal for your distribution's ARN."
   ]
  ],
  "tryit": [
   [
    "Granite Games runs its API on an ALB behind CloudFront. Attackers have found the ALB's DNS name and are sending requests directly to it, bypassing the WAF rules on the distribution. How do you force all traffic through CloudFront?",
    "Restrict the ALB's security group to the CloudFront managed prefix list, and have CloudFront add a secret custom header that an ALB listener rule requires, returning an error for requests without it. Direct requests to the ALB are then dropped or rejected, and only traffic that passed the WAF rules at CloudFront reaches the targets."
   ]
  ],
  "tip": "SQL injection, cross-site scripting, rate limiting or geo blocking points to AWS WAF. Large DDoS with expert support and cost protection points to Shield Advanced. Keeping an S3 origin private behind CloudFront points to origin access control.",
  "check": [
   [
    "Can you attach AWS WAF to a Network Load Balancer?",
    "No. WAF works at layer 7 and attaches to CloudFront, ALB, API Gateway REST APIs, AppSync, Cognito user pools and similar services, not NLBs."
   ],
   [
    "Which Shield tier is enabled by default at no extra cost?",
    "Shield Standard, which protects all customers against common layer 3 and 4 DDoS attacks."
   ],
   [
    "What does a bucket policy for OAC check to allow CloudFront reads?",
    "That the principal is the CloudFront service and that aws:SourceArn matches the specific distribution's ARN."
   ],
   [
    "How can you test new WAF rules without blocking real users?",
    "Set the rules to count mode, review the matched requests in logs or metrics, then switch them to block."
   ]
  ]
 },
 {
  "t": "Encryption at rest with AWS KMS: AWS managed vs customer managed keys, key policies, envelope encryption and S3 SSE-S3, SSE-KMS and SSE-C",
  "hook": "Friday afternoon at Lakeshore Medical Group, Dana from compliance walks over with two questions from an auditor. First, can you prove exactly who used the keys that protect patient files last quarter? Second, if an account were compromised, could you cut off access to those files instantly, even for administrators? At the same time, the backup team reports that sharing encrypted database snapshots with the new backup account keeps failing with an error nobody understands. Everything is 'encrypted', but nobody can say with which keys, or who controls them. You pull up the KMS console and see a list of aliases starting with aws/. Is that good enough?",
  "simple": "Encryption at rest means scrambling stored data so it is useless without a key. AWS KMS is a vault that creates and guards those keys, and it writes down every time a key is used. Some keys are made and looked after by AWS for you; they are easy but you cannot change who may use them. Others you create yourself, so you write the rules, can share them with other accounts, and can switch them off in an emergency. Because big files are slow to send to the vault, AWS uses a two-key trick: a small 'data key' locks the file, and the vault's master key locks the data key, like putting a house key in a lockbox. S3 offers several flavors of this, from fully automatic to 'bring your own key'.",
  "body": [
   "AWS Key Management Service (KMS) creates and controls the keys used to encrypt data at rest across AWS services such as S3, EBS, RDS, DynamoDB and Secrets Manager. KMS key material never leaves the service unencrypted; KMS performs cryptographic operations inside validated hardware security modules (HSMs), and every use of a key is recorded in AWS CloudTrail. That CloudTrail record is what lets you answer an auditor's question about who used a key and when. The exam expects you to know which kind of key to choose, how access to keys is controlled, and which S3 encryption option fits a requirement.",
   "There are three ownership models, and the difference is how much control you get. AWS owned keys are used internally by services across many accounts, and you never see or manage them. AWS managed keys, with aliases like `aws/s3` or `aws/ebs`, are created in your account by a service the first time you use it; you can view them and audit their use in CloudTrail, but you cannot change their key policy, and AWS rotates them automatically. Customer managed keys are created by you: you control the key policy, grants and aliases, can enable automatic rotation, and can disable a key or schedule its deletion after a waiting period. Choose customer managed keys when you need your own access control, cross-account use, or the ability to cut off access instantly by disabling the key. If you need single-tenant HSMs under your exclusive control, AWS CloudHSM is the alternative.",
   "Access to a key is governed first by its key policy. Every KMS key has a key policy, a resource-based policy, and it is the primary access control. Unlike most resources, IAM policies alone cannot grant access to a KMS key unless the key policy allows it; the default key policy does this by giving the account principal access, which delegates to IAM. For cross-account use, the key policy must allow the other account, and that account's IAM policy must also allow the use. Grants provide temporary, programmatic permissions, often created by services such as EBS on your behalf. Separating key administrators (who manage the key) from key users (who encrypt and decrypt) is a common least-privilege pattern, so the person who can change a key's policy is not automatically able to read the data it protects.",
   "Envelope encryption explains how KMS handles large data. KMS can encrypt only small payloads directly (up to 4 KB), so services use envelope encryption. The service calls `GenerateDataKey` and receives a plaintext data key plus the same key encrypted under the KMS key. It encrypts the data locally with the plaintext data key, discards that key from memory, and stores the encrypted data key alongside the data. To decrypt, it sends the encrypted data key to KMS, gets the plaintext data key back and decrypts locally. Bulk data never travels to KMS, which keeps it fast, and control still rests with whoever may call `Decrypt` on the KMS key. Disable the KMS key and every encrypted data key becomes useless, which is why disabling is such a powerful emergency control.",
   "Amazon S3 offers several server-side encryption choices, and the exam asks you to match them to requirements. SSE-S3 uses keys managed entirely by S3 and is applied by default to new objects. SSE-KMS uses a KMS key, adding key policy control, CloudTrail records of key use, and the ability to disable the key; at high request rates, S3 Bucket Keys reduce the number of KMS calls and their cost. DSSE-KMS applies two layers of KMS-based encryption for workloads that require dual-layer encryption. SSE-C uses a key the customer supplies with every request over HTTPS; S3 uses it and discards it, so you must manage it and never lose it. Client-side encryption, where data is encrypted before upload, is the choice when AWS must never see plaintext.",
   "Consider a worked example. A healthcare company must prove who used the keys protecting patient files and must be able to revoke access instantly. It creates a customer managed KMS key, names only the application role as a key user in the key policy, sets the bucket's default encryption to SSE-KMS with an S3 Bucket Key, and adds a bucket policy that denies uploads not using that key. During an incident, the security team disables the key; every read of those objects fails immediately, even for administrators with full S3 permissions, until the key is re-enabled. Every decrypt attempt, successful or not, shows up in CloudTrail for the investigation.",
   "The common mistakes are mostly about control. Learners try to share an encrypted snapshot or bucket across accounts with an AWS managed key, whose policy you cannot edit; assume an IAM Allow is enough when the key policy does not permit it; schedule a key for deletion without realizing data encrypted under it becomes unrecoverable; choose SSE-C when the requirement is audit of key use; and forget that SSE-KMS adds KMS request costs and throttling risk that Bucket Keys reduce.",
   "Exam questions map cleanly to choices. 'Audit who used the key', 'control the key policy', 'disable the key' or 'cross-account encrypted sharing' points to a customer managed key and SSE-KMS. 'Customer must supply and hold the key' points to SSE-C. 'Simplest, no key management' points to SSE-S3. 'Encrypt large data with KMS' points to envelope encryption with `GenerateDataKey`, and 'dedicated, single-tenant HSM' points to CloudHSM."
  ],
  "analogy": "Envelope encryption is like a bank safe-deposit system. Each document goes in its own small lockbox with its own key (the data key). You do not carry those little keys around; instead, each one is sealed in an envelope that only the bank's master vault can open (the KMS key). To read a document, you ask the bank to open the envelope, and the bank logs every request. If the bank freezes the vault, every envelope stays sealed. The analogy stops at scale: real data keys are generated by KMS on demand, not stored in a physical vault.",
  "terms": [
   [
    "AWS KMS",
    "The managed service that creates, stores and controls encryption keys and logs their use in CloudTrail."
   ],
   [
    "AWS managed key",
    "A KMS key created in your account by an AWS service, auditable but with a key policy you cannot change."
   ],
   [
    "Customer managed key",
    "A KMS key you create and control, including its key policy, rotation, disabling and deletion."
   ],
   [
    "Key policy",
    "The resource-based policy on a KMS key that is the primary control over who can use and manage it."
   ],
   [
    "Envelope encryption",
    "Encrypting data with a data key, then encrypting that data key with a KMS key."
   ],
   [
    "SSE-KMS",
    "S3 server-side encryption using a KMS key, with auditable key use and key-policy control."
   ],
   [
    "SSE-C",
    "S3 server-side encryption with a key the customer supplies on every request and S3 does not store."
   ],
   [
    "S3 Bucket Key",
    "A bucket-level data key that reduces the number of KMS calls, and cost, for SSE-KMS."
   ]
  ],
  "example": "A company must copy encrypted RDS snapshots to a separate backup account. The snapshots were encrypted with the aws/rds AWS managed key, so sharing fails. The team creates a customer managed key whose key policy allows the backup account to use it, copies each snapshot while re-encrypting it with that key, and then shares the copies. In the backup account, an IAM policy lets the restore role use the shared key.",
  "mistakes": [
   [
    "An encrypted snapshot using the aws/ebs key can be shared by editing that key's policy.",
    "You cannot edit an AWS managed key's policy. Copy the snapshot, re-encrypt it with a customer managed key, allow the other account in that key's policy, then share."
   ],
   [
    "If IAM allows kms:Decrypt, the call will succeed.",
    "The key policy is the primary control. Unless it allows the account principal (delegating to IAM) or the specific role, IAM permissions alone do nothing."
   ],
   [
    "SSE-C is the right choice when auditors need to see who used the key.",
    "With SSE-C, AWS does not store or log use of your key in KMS. Audit of key use points to SSE-KMS with a customer managed key."
   ],
   [
    "Scheduling a key for deletion is a safe way to pause access.",
    "Once deleted, data encrypted under the key is unrecoverable. Disable the key to pause access; it can be re-enabled."
   ]
  ],
  "tryit": [
   [
    "Summit Insurance stores claim documents in S3 with SSE-KMS and a customer managed key. After launching a new mobile upload feature, requests start failing with KMS throttling errors and the KMS bill rises sharply. Security insists on keeping SSE-KMS. What do you change?",
    "Enable S3 Bucket Keys for the bucket. S3 then uses a bucket-level key derived from the KMS key to create data keys, which greatly reduces the number of requests to KMS, lowering cost and throttling while keeping the customer managed key, its key policy and CloudTrail auditing."
   ]
  ],
  "tip": "Audit of key usage, control of the key policy or the ability to disable the key: SSE-KMS with a customer managed key. The customer must supply and hold the key themselves: SSE-C. Simplest with no key management: SSE-S3.",
  "check": [
   [
    "Why can't you share an EBS snapshot encrypted with the aws/ebs AWS managed key with another account?",
    "Because you cannot edit an AWS managed key's policy to grant another account access. Re-encrypt with a customer managed key and share that key."
   ],
   [
    "What does GenerateDataKey return?",
    "A plaintext data key for local encryption and a copy of that data key encrypted under the KMS key, to be stored with the data."
   ],
   [
    "An IAM policy allows kms:Decrypt on a key, but calls are denied. What is the likely cause?",
    "The key policy does not allow the account principal or that role, and IAM cannot grant KMS access unless the key policy permits it."
   ],
   [
    "A workload using SSE-KMS makes many S3 requests and sees high KMS costs. What helps?",
    "Enable S3 Bucket Keys, which reduce the number of requests from S3 to KMS."
   ]
  ]
 },
 {
  "t": "Encryption in transit: ACM certificates, TLS on ALB and CloudFront, and enforcing HTTPS with aws:SecureTransport",
  "hook": "Monday morning at Brightwater Payments starts with two problems. Ana, the platform engineer, spent Sunday requesting a shiny new certificate for the company website in the Region where everything runs, but the CloudFront console refuses to list it. Meanwhile, an auditor preparing for a card-data review asks a pointed question: if traffic is encrypted to the load balancer, is it still encrypted from the load balancer to the servers, and can the storage bucket be read over plain HTTP? Ana is not sure. Nobody wants to install certificates by hand on dozens of servers again. Where should the certificate live, where should encryption end, and how do you force everyone to use it?",
  "simple": "Encryption in transit means scrambling data while it travels across a network, so anyone listening in sees nonsense. On the web this is TLS, the 'S' in HTTPS, and it needs a certificate that proves your site is really yours, like an ID card for a website. AWS Certificate Manager hands out these certificates for free for use with AWS services and renews them automatically. Usually a load balancer or CloudFront does the unscrambling, so your servers do not have to. If you want the trip from the load balancer to your servers scrambled too, you turn on HTTPS for that leg as well. To make a storage bucket refuse unscrambled requests, you write a rule that says no to any request that did not arrive over TLS.",
  "body": [
   "Encryption in transit protects data as it moves between clients and services, and between services themselves, so that anyone who can observe the network cannot read or alter it. On AWS that almost always means Transport Layer Security (TLS), the protocol behind HTTPS. To offer TLS you need an X.509 certificate for your domain, and AWS Certificate Manager (ACM) is the service that provides and manages them. The exam tests where certificates can live, where TLS is terminated, and how to force clients to use it.",
   "ACM removes most of the certificate busywork. It issues public certificates for use with integrated services at no extra charge, validates domain ownership by DNS (a CNAME record, which Route 53 can create for you) or by email, and renews them automatically as long as the DNS validation record stays in place. ACM certificates can be deployed to Elastic Load Balancing, Amazon CloudFront, API Gateway and other integrated services, and AWS manages the private key for you. The classic design, and the usual exam answer, is to terminate TLS on one of those integrated services rather than installing certificates on your own EC2 web servers. You can also import third-party certificates into ACM, but ACM does not renew imported ones, so you must track their expiry. ACM certificates are regional resources, with one important exception: a certificate used by CloudFront must be requested or imported in the US East (N. Virginia) Region, `us-east-1`. For internal names, AWS Private Certificate Authority issues private certificates.",
   "The common pattern is TLS termination at the load balancer. An Application Load Balancer (ALB) HTTPS listener uses an ACM certificate, decrypts traffic, applies routing rules and forwards to targets over HTTP or, when end-to-end encryption is required, re-encrypts over HTTPS to the targets. A security policy on the listener sets the allowed TLS versions and cipher suites, so you can require modern versions. Server Name Indication (SNI) lets one listener hold several certificates for different domains. An HTTP listener on port 80 can use a redirect action to send users to HTTPS on 443. A Network Load Balancer (NLB) can terminate TLS with a TLS listener, or pass TCP traffic through so the targets terminate it themselves when they must hold the certificate.",
   "CloudFront has two TLS legs, and each has its own setting. The viewer protocol policy controls the connection from users: allow all, redirect HTTP to HTTPS, or HTTPS only. The origin protocol policy controls CloudFront's connection to the origin: HTTP only, HTTPS only, or match viewer. For full end-to-end encryption you require HTTPS on both legs, and the origin's certificate must be valid for the origin's domain name. A design that encrypts only the viewer leg leaves traffic between CloudFront and the origin readable, which an auditor will notice.",
   "To enforce encryption on S3 and other services with resource policies, use the `aws:SecureTransport` condition key, which is true when a request arrived over TLS. There is no simple checkbox on the bucket; the control is a Deny statement like the one below. The same idea works in SQS and SNS policies. For databases, RDS supports TLS connections and a parameter can require them, such as `rds.force_ssl` for PostgreSQL or `require_secure_transport` for MySQL.",
   "```\n{\n  \"Effect\": \"Deny\",\n  \"Principal\": \"*\",\n  \"Action\": \"s3:*\",\n  \"Resource\": [\"arn:aws:s3:::example-bucket\", \"arn:aws:s3:::example-bucket/*\"],\n  \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"false\" } }\n}\n```",
   "Consider a worked example. A company serves its site through CloudFront with an ALB origin in eu-west-1. It requests an ACM certificate for `www.example.com` in us-east-1 for CloudFront and a second certificate in eu-west-1 for the ALB, validating both with DNS records in Route 53. It sets the viewer protocol policy to redirect HTTP to HTTPS and the origin protocol policy to HTTPS only, attaches a modern TLS security policy to the ALB listener, and adds a bucket policy with the deny statement above to its assets bucket. Traffic is now encrypted from the browser all the way to the load balancer, and nobody can read the bucket over plain HTTP. If the auditor also requires encryption to the instances, the ALB target group switches to HTTPS.",
   "The common mistakes are small but costly. Learners request the CloudFront certificate in the wrong Region; expect ACM to renew an imported certificate; assume TLS to the ALB means traffic to the targets is encrypted too; and look for an 'enforce HTTPS' checkbox on S3 instead of writing a bucket policy.",
   "Exam questions give clear signals. 'Certificate cannot be selected in CloudFront' points to us-east-1. 'Automatic renewal with minimal management' points to an ACM certificate on an integrated service. 'Reject unencrypted requests to a bucket, queue or topic' points to a Deny with `aws:SecureTransport` set to false. 'Multiple domains on one load balancer' points to SNI, and 'end-to-end encryption' means HTTPS from the load balancer or CloudFront to the targets as well."
  ],
  "analogy": "TLS termination at a load balancer is like a building's mail room that opens every sealed envelope to read the room number and deliver it. Inside the building, the mail room can carry the letter open on a cart (HTTP to targets) or reseal it in a new envelope before delivery (HTTPS to targets, end-to-end). ACM is the service that keeps the mail room's official seal current without you remembering renewal dates. The analogy stops at imported seals: ACM will not renew a certificate it did not issue.",
  "terms": [
   [
    "TLS",
    "Transport Layer Security, the protocol that encrypts and authenticates network connections such as HTTPS."
   ],
   [
    "AWS Certificate Manager (ACM)",
    "A service that issues, stores and automatically renews TLS certificates for integrated AWS services."
   ],
   [
    "TLS termination",
    "Decrypting TLS at a front-end component such as a load balancer before passing the request on."
   ],
   [
    "Server Name Indication (SNI)",
    "A TLS extension that lets one listener serve different certificates for different host names."
   ],
   [
    "Viewer protocol policy",
    "The CloudFront setting that controls whether viewers may use HTTP, are redirected to HTTPS or must use HTTPS."
   ],
   [
    "Origin protocol policy",
    "The CloudFront setting that controls whether CloudFront connects to the origin over HTTP, HTTPS or the viewer's protocol."
   ],
   [
    "aws:SecureTransport",
    "A condition key that is true when the request was sent over TLS."
   ]
  ],
  "example": "A payments team must show auditors that card data is encrypted everywhere in transit. It fronts the API with an ALB using an ACM certificate and a security policy allowing only modern TLS versions, re-encrypts traffic to the targets over HTTPS, sets `rds.force_ssl` on its PostgreSQL database, and adds aws:SecureTransport deny statements to its S3 bucket and SQS queue policies so any unencrypted request is refused and appears in CloudTrail.",
  "mistakes": [
   [
    "A certificate in the Region where the app runs can be used by CloudFront.",
    "CloudFront only uses ACM certificates from us-east-1. Request or import a separate certificate there."
   ],
   [
    "ACM renews every certificate it stores.",
    "ACM renews only certificates it issued, and only while validation stays in place. Imported certificates must be renewed and re-imported by you."
   ],
   [
    "HTTPS to the ALB means traffic is encrypted all the way to the servers.",
    "The ALB decrypts traffic. For end-to-end encryption, configure HTTPS from the ALB to the targets too."
   ],
   [
    "S3 has a bucket setting to force HTTPS.",
    "You enforce HTTPS with a bucket policy that denies requests where aws:SecureTransport is false."
   ]
  ],
  "tryit": [
   [
    "Aspen Learning hosts three sites, learn.example.com, shop.example.com and help.example.com, on one ALB. The team currently runs three ALBs only because each needs its own certificate, and wants to cut cost without dropping HTTPS. What do you recommend?",
    "Use one ALB with an HTTPS listener holding all three ACM certificates. SNI lets the listener present the right certificate for each host name, and host-based routing rules send each site to its target group. Add an HTTP listener that redirects to HTTPS."
   ]
  ],
  "tip": "A CloudFront certificate must be in us-east-1. Enforcing HTTPS on an S3 bucket is a bucket policy that denies requests where aws:SecureTransport is false, not a setting on the bucket.",
  "check": [
   [
    "You created an ACM certificate in eu-west-1 but cannot select it in CloudFront. Why?",
    "CloudFront only uses ACM certificates from us-east-1. Request or import the certificate there."
   ],
   [
    "How do you make an S3 bucket reject HTTP requests?",
    "Add a bucket policy that denies all S3 actions when aws:SecureTransport is false."
   ],
   [
    "An imported certificate in ACM expired and the site broke. Why did ACM not renew it?",
    "ACM only renews certificates it issued; imported certificates must be renewed and re-imported by you."
   ],
   [
    "How does one ALB listener serve certificates for three different domains?",
    "It holds multiple certificates and uses Server Name Indication to present the right one for each requested host name."
   ]
  ]
 },
 {
  "t": "Secrets management: Secrets Manager rotation vs Systems Manager Parameter Store SecureString",
  "hook": "A security scan at Fernhill Logistics finishes on a Tuesday afternoon, and the results land in your inbox with a red banner. The production database password is sitting in a `.env` file baked into a container image, and three Lambda functions hold a vendor API key in plain environment variables. The auditor's follow-up is blunt: the database password must change every 30 days with no downtime, and every read of a secret must be traceable. A teammate says, 'Just move everything into Parameter Store, it's free.' Another says Secrets Manager is the only real answer. Both have a point. Which one fits each secret, and why?",
  "simple": "Secrets are things like passwords and API keys that programs need to log in to other systems. Writing them into code or images is like taping your house key to the front door: anyone who sees the code sees the key. AWS offers two safe lockers. Secrets Manager is built for secrets and can change a password on a schedule by itself, updating both the database and the stored copy so apps keep working. Parameter Store is a tidy filing cabinet for settings, organized like folders, and can hold encrypted values too, but it does not change them for you. The rule of thumb: if something must be changed automatically, use Secrets Manager; if it is a setting or a secret that rarely changes and cost matters, Parameter Store is fine.",
  "body": [
   "Applications need database passwords, API keys and tokens. Hard-coding them in source code, Amazon Machine Images (AMIs), container images or environment files is a classic security failure: secrets end up in version control, logs and backups, anyone who can read the artifact can read the secret, and changing a secret means redeploying. The fix is to store secrets in a managed service, give each application's IAM role permission to read only its own secrets, and fetch them at runtime. AWS gives you two managed places to do this, and the exam asks you to pick between them.",
   "AWS Secrets Manager is built for secrets. It encrypts each secret with an AWS Key Management Service (KMS) key, controls access with IAM and resource policies, logs access in CloudTrail and, most importantly, rotates secrets automatically on a schedule. For Amazon RDS, Aurora, Redshift and DocumentDB it offers managed rotation: it changes the password in the database and in the secret together, so applications that fetch the secret at runtime keep working. For other secret types, rotation runs a Lambda function you provide or adapt from AWS templates. The rotation process uses staging labels such as `AWSCURRENT` and `AWSPENDING` so the new value is tested before it becomes current. Secrets Manager can also replicate secrets to other Regions for disaster recovery, and RDS can manage the master user password in Secrets Manager for you. It charges per secret per month and per API call.",
   "AWS Systems Manager Parameter Store is a different kind of tool: a hierarchical store for configuration data, with names such as `/prod/app/db-host`. Parameters come in three types: String, StringList and SecureString. A SecureString is encrypted with a KMS key, either the AWS managed `aws/ssm` key or a customer managed key. Standard parameters have no additional storage charge, and an advanced tier adds larger values and parameter policies such as expiration notifications. That makes Parameter Store attractive for configuration and simple secrets. However, Parameter Store has no built-in rotation; you would have to build it yourself with EventBridge and Lambda. The two commands below show how an application or operator reads a value from each service.",
   "```\naws ssm get-parameter --name /prod/app/api-key --with-decryption\naws secretsmanager get-secret-value --secret-id prod/app/db\n```",
   "So how do you choose? If the requirement mentions automatic rotation, especially of database credentials, or cross-Region replication of secrets, choose Secrets Manager. If it is general configuration, feature flags or secrets that rarely change, and cost matters, Parameter Store SecureString is fine. Both integrate with CloudFormation dynamic references, ECS task definitions, EKS and Lambda, so applications can load values at start-up without code that handles plaintext files. Parameter Store can even reference Secrets Manager secrets through the special `/aws/reference/secretsmanager/` path, so one API can read both. Whichever you choose, the application's role needs permission to read the secret and to use the KMS key that encrypts it.",
   "How an application reads secrets matters as much as where they live. Retrieve secrets at runtime and cache them briefly, for example with the AWS Parameters and Secrets Lambda Extension or a client-side caching library, rather than calling the API on every request, which adds latency, cost and throttling risk. At the same time, do not cache forever: after rotation the old value stops working, so the cache should expire or refresh when a login fails.",
   "Consider a worked example. A security audit requires that the production database password change every 30 days with no downtime, and it found the password in a `.env` file inside the container image. The team moves the credentials into Secrets Manager, enables managed rotation for the RDS database, and grants the ECS task role `secretsmanager:GetSecretValue` on that one secret. The task definition injects the secret as an environment variable at start-up, and the application reconnects with a fresh value when a login fails. Non-sensitive settings such as the database host name and feature flags go into Parameter Store as plain String parameters under `/prod/app/`.",
   "The common mistakes are easy to avoid once named. Learners store secrets in plain String parameters instead of SecureString; forget the KMS permission, so the role can read the parameter but not decrypt it; cache a secret forever so the application breaks after rotation; bake secrets into AMIs or images; and choose Parameter Store when the question explicitly requires automatic rotation. Another trap is assuming environment variables alone are secure storage; they are only a delivery mechanism.",
   "The exam's keyword is rotation. 'Automatically rotate database credentials', 'rotate without application changes' or 'replicate secrets to another Region' points to Secrets Manager. 'Store configuration values hierarchically', 'lowest cost' or 'secrets that do not need rotation' points to Parameter Store with SecureString. 'Remove hard-coded credentials from code' points to either service plus an IAM role that reads the value at runtime."
  ],
  "analogy": "Parameter Store is like a well-labeled filing cabinet with a few locked drawers: tidy, cheap and good for settings and the occasional secret, but you must swap the contents yourself. Secrets Manager is like a building's key management service that cuts a new key for the database door every month, swaps the lock at the same moment, and hands the new key to everyone authorized. The analogy stops at the door itself: for non-database secrets, Secrets Manager needs a rotation function you supply to know how to change the lock.",
  "terms": [
   [
    "Secrets Manager",
    "A managed service that stores, encrypts, audits and automatically rotates secrets."
   ],
   [
    "Parameter Store",
    "A Systems Manager feature for hierarchical configuration data and secrets, without built-in rotation."
   ],
   [
    "SecureString",
    "A Parameter Store parameter type whose value is encrypted with a KMS key."
   ],
   [
    "Rotation",
    "Periodically replacing a secret with a new value and updating every place that uses it."
   ],
   [
    "Managed rotation",
    "Secrets Manager rotation for supported databases that needs no custom Lambda code."
   ],
   [
    "Staging labels",
    "Labels such as AWSCURRENT and AWSPENDING that mark which version of a secret is active during rotation."
   ],
   [
    "Dynamic reference",
    "A CloudFormation template reference that resolves a parameter or secret value at deploy time."
   ]
  ],
  "example": "A company's Lambda functions each held a third-party API key in plain environment variables, visible to anyone with read access to the function configuration. The team stores the key as a Secrets Manager secret with a rotation Lambda that requests a new key from the vendor every quarter, grants each function's execution role read access to that secret only, and has the functions fetch and cache the value for a few minutes, so a rotation takes effect without redeployment.",
  "mistakes": [
   [
    "Parameter Store SecureString can rotate database passwords automatically.",
    "Parameter Store has no built-in rotation. Automatic rotation points to Secrets Manager."
   ],
   [
    "If a role can call ssm:GetParameter it can read a SecureString.",
    "Decrypting also needs permission to use the KMS key (kms:Decrypt) that encrypts the parameter."
   ],
   [
    "Putting a secret in an environment variable makes it secure.",
    "Environment variables are a delivery mechanism, visible to anyone who can read the configuration. Store the secret in a managed service and fetch it at runtime."
   ],
   [
    "Fetch the secret once at startup and keep it forever for speed.",
    "After rotation the old value stops working. Cache briefly and refresh periodically or on authentication failure."
   ]
  ],
  "tryit": [
   [
    "Redstone Media runs a production Aurora database in one Region and a warm standby in another for disaster recovery. The database password must rotate every 30 days, and the standby application must be able to read the current password if the primary Region fails. Which service and features do you use?",
    "Secrets Manager with managed rotation for Aurora and replication of the secret to the standby Region. Rotation keeps the database and secret in sync, and the replica secret lets the standby application read the current credentials locally during a failover. Parameter Store offers neither built-in rotation nor this replication."
   ]
  ],
  "tip": "The keyword is rotation. Automatic rotation of database credentials points to Secrets Manager; low-cost storage of configuration and static secrets points to Parameter Store SecureString.",
  "check": [
   [
    "Which service rotates RDS credentials automatically without custom code?",
    "AWS Secrets Manager, using managed rotation for RDS."
   ],
   [
    "What encrypts a SecureString parameter?",
    "An AWS KMS key, either the AWS managed aws/ssm key or a customer managed key."
   ],
   [
    "An application can call ssm:GetParameter but receives an error when decrypting a SecureString. What is missing?",
    "Permission to use the KMS key (kms:Decrypt) that encrypts the parameter."
   ],
   [
    "Why should applications not cache a rotated secret indefinitely?",
    "After rotation the old value stops working, so the application must refresh the secret periodically or on authentication failure."
   ]
  ]
 },
 {
  "t": "S3 data protection: Block Public Access, bucket policies, presigned URLs, versioning, MFA Delete and Object Lock modes",
  "hook": "At 6:15 a.m., Theo at Juniper Legal gets a call from the managing partner: a client says they received a link to a contract that is not theirs, and an IT contractor wants to switch off a setting called Block Public Access so documents are easier to share. At the same time, the firm's regulator requires that signed contracts be kept unchanged for seven years, and the backup team worries that ransomware could wipe the archive bucket if an admin key were stolen. Theo has a bucket full of sensitive files and a list of features with names like versioning, MFA Delete, governance and compliance. Which ones stop exposure, which ones stop loss, and which can nobody undo?",
  "simple": "Amazon S3 stores files, called objects, in containers called buckets. There are two big dangers: the wrong people seeing files, and files being deleted or changed. Block Public Access is a master switch that stops any bucket from being opened to the whole internet. Bucket policies are the written rules for who may get in. A presigned URL is a temporary link that lets one person grab one file for a short time, like a guest pass that expires. Versioning keeps every old copy, so a delete is just a sticky note saying 'gone' that you can peel off. Object Lock makes files unchangeable for a set time. In governance mode, specially permitted admins can override it; in compliance mode, nobody can, not even the account owner.",
  "body": [
   "Amazon S3 holds a large share of the world's cloud data, and misconfigured buckets are a well-known cause of breaches. S3 gives you layers of protection against two different threats: exposure, meaning the wrong people reading data, and loss, meaning data being deleted or overwritten by mistake, by a bug or by ransomware. The exam asks you to pick the right control for each threat, so it helps to sort every feature into one of those two groups as you read.",
   "For exposure, start with S3 Block Public Access. Its four settings block new public access control lists (ACLs), ignore existing public ACLs, block new public bucket policies and restrict access to buckets with public policies. It can be set at the account level and per bucket, and it overrides any policy or ACL that would make data public. New buckets have it on by default, and ACLs are disabled by default through the Object Ownership setting 'bucket owner enforced', so access is governed by policies alone. Keeping it on at the account level is the simplest way to prevent accidental public buckets, and turning it off to share one file is almost always the wrong answer.",
   "Bucket policies and presigned URLs give finer control. Bucket policies are resource-based JSON policies that grant or deny access to principals, including other accounts, with conditions such as `aws:SourceIp`, `aws:SourceVpce`, `aws:PrincipalOrgID` (only principals in your organization) or `aws:SecureTransport`. When someone outside your account needs temporary access to one object, use a presigned URL: a URL signed with the credentials of an identity that has access, valid until its expiry time. Anyone holding the URL can perform that one operation, such as GET to download or PUT to upload, without AWS credentials of their own. The URL cannot grant more than the signer's own permissions, and if it was signed with temporary credentials it stops working when they expire. The command below creates a link valid for 900 seconds.",
   "```\naws s3 presign s3://contracts-bucket/client-42/contract.pdf --expires-in 900\n```",
   "For loss, turn on versioning. With versioning, an overwrite creates a new version and a delete adds a delete marker, so earlier versions can be restored. Once enabled, versioning can be suspended but not turned off. Lifecycle rules can expire old noncurrent versions to control cost. MFA Delete adds a requirement for multi-factor authentication (MFA) to permanently delete a version or to change the versioning state; only the root user can enable it, using the CLI or API.",
   "For immutability, use S3 Object Lock, which provides write-once-read-many (WORM) protection on versioned buckets. Governance mode protects versions from deletion or overwrite during the retention period, but users with the `s3:BypassGovernanceRetention` permission can override it. Compliance mode cannot be shortened or removed by anyone, including the root user, until the retention period ends. A legal hold protects a version indefinitely, independent of any retention period, until someone with permission removes it. Choose governance mode when you want protection against accidents but need an escape hatch, and compliance mode when a regulation or ransomware threat means no one should have that escape hatch.",
   "Consider a worked example. A law firm must keep signed contracts unchanged for seven years to meet a regulation, and clients must be able to download their own documents without AWS accounts. It creates a bucket with Block Public Access on, versioning and Object Lock, and sets a default retention of seven years in compliance mode. The client portal generates presigned URLs that expire after 15 minutes for each download. When litigation starts on one matter, the firm places a legal hold on those contract versions so they stay protected even after the seven years pass, until the hold is removed.",
   "The common mistakes mix up the two threats. Learners turn off Block Public Access to share a file with one person, when a presigned URL would do; believe a delete in a versioned bucket destroys data (it only adds a marker); choose governance mode for a regulation that requires that no one can delete records; expect to enable MFA Delete from the console or as an IAM administrator; and forget that Object Lock requires versioning. Also, replication or versioning alone is not immutability; only Object Lock in compliance mode prevents even privileged users from deleting.",
   "Exam questions use signal words. 'Prevent any bucket in the account from ever becoming public' points to account-level Block Public Access. 'Temporary access to one object for a user without AWS credentials' points to a presigned URL. 'Recover from accidental overwrite or delete' points to versioning. 'WORM', 'regulatory retention' or 'nobody, including root, can delete' points to Object Lock compliance mode; 'administrators can override if needed' points to governance mode. 'Require MFA to permanently delete versions' points to MFA Delete."
  ],
  "analogy": "Versioning is like a document app's history: every save keeps the old draft, and deleting a file just moves it out of view, so you can roll back. Object Lock governance mode is a locked filing cabinet where the office manager holds a spare key. Compliance mode is a time-lock safe: once set, nobody, including the owner, can open it before the timer ends. The analogy stops at cost: unlike a free history panel, every kept S3 version is stored and billed until a lifecycle rule removes it.",
  "terms": [
   [
    "Block Public Access",
    "Account and bucket settings that override any ACL or policy that would make S3 data public."
   ],
   [
    "Presigned URL",
    "A time-limited URL signed with an authorized identity's credentials that grants one S3 operation on one object."
   ],
   [
    "Versioning",
    "An S3 bucket setting that keeps every version of an object so overwrites and deletes can be undone."
   ],
   [
    "Delete marker",
    "A placeholder version created when an object is deleted in a versioned bucket; removing it restores the object."
   ],
   [
    "MFA Delete",
    "A versioning option, enabled only by the root user, that requires MFA to permanently delete versions or change versioning."
   ],
   [
    "Object Lock compliance mode",
    "A WORM retention mode that nobody, including root, can shorten or remove before it expires."
   ],
   [
    "Object Lock governance mode",
    "A WORM retention mode that users with special bypass permission can override."
   ],
   [
    "Legal hold",
    "An Object Lock flag that prevents a version from being deleted until the hold is removed, with no expiry date."
   ]
  ],
  "example": "A ransomware actor steals an administrator's access keys and tries to delete and overwrite a company's backup files in S3. Because the backup bucket has versioning and Object Lock in compliance mode with a 30-day retention, the deletes only add markers and the overwrites create new versions, while the protected versions cannot be removed. The company rotates the keys and restores the previous versions within hours.",
  "mistakes": [
   [
    "To share one file with a partner, turn off Block Public Access for the bucket.",
    "That risks exposing everything. Generate a presigned URL for that one object with a short expiry."
   ],
   [
    "Deleting an object in a versioned bucket destroys it.",
    "The delete only adds a delete marker. Remove the marker or restore the previous version to recover it."
   ],
   [
    "Governance mode meets a rule that no one may delete records early.",
    "Users with s3:BypassGovernanceRetention can override governance mode. Only compliance mode stops everyone, including root."
   ],
   [
    "An IAM administrator can enable MFA Delete from the console.",
    "Only the root user can enable MFA Delete, and only through the CLI or API with an MFA device."
   ]
  ],
  "tryit": [
   [
    "Hollow Creek Clinic stores nightly backups in S3. Leadership fears an attacker with stolen admin keys could delete the backups, but the IT lead wants the ability to purge a corrupted backup early if the board approves. Which Object Lock mode do you recommend, and what else must be in place?",
    "Governance mode, with versioning enabled (required for Object Lock). Grant s3:BypassGovernanceRetention only to a tightly controlled break-glass role, not to everyday admins, so stolen admin keys cannot remove retention. If leadership later decides no one should ever override retention, switch new backups to compliance mode."
   ]
  ],
  "tip": "Governance mode can be bypassed by users with special permission; compliance mode cannot be bypassed by anyone. To give temporary access to one object without creating IAM users, choose a presigned URL.",
  "check": [
   [
    "A user deleted an object in a versioned bucket. How do you recover it?",
    "Delete the delete marker (or copy the previous version back). Versioning kept the earlier version; the delete only added a marker."
   ],
   [
    "Which Object Lock mode lets a privileged administrator remove retention early?",
    "Governance mode, for users with the s3:BypassGovernanceRetention permission. Compliance mode allows no one to do so."
   ],
   [
    "A presigned URL was generated with a user's credentials, but the user lacks s3:GetObject on that object. Will the URL work?",
    "No. A presigned URL can only grant what the signing identity is allowed to do."
   ],
   [
    "Who can enable MFA Delete on a bucket, and how?",
    "Only the bucket owner's root user, using the CLI or API with an MFA device."
   ]
  ]
 },
 {
  "t": "Detection and compliance services: CloudTrail, AWS Config rules, GuardDuty, Inspector, Macie and Security Hub",
  "hook": "It is 11:30 p.m. at Silverline Bank when Rosa on the security team gets an alert: an EC2 instance in a development account is talking to a domain linked to cryptocurrency mining. By morning, leadership wants answers. Who launched that instance, and from where? What did its security group look like yesterday versus now? Did the image have unpatched software? Is any customer data sitting in an S3 bucket nearby? And why did nobody see a single dashboard of all this sooner? Rosa knows AWS has a service for each question, but the names blur together at midnight. Which service answers which question?",
  "simple": "AWS has several watchdog services, and each one answers a single question. CloudTrail is the security camera log: who did what, and when. AWS Config is the before-and-after photo album of your settings, plus a checklist that flags anything out of policy. GuardDuty is the alarm system that watches activity and shouts when something looks like an attacker. Inspector is the inspector who checks your software for known weaknesses that need patching. Macie is the sniffer dog that finds sensitive personal data in S3 storage. Security Hub is the control room that gathers all their alerts on one screen. If you remember the one question each one answers, the names stop blurring together.",
  "body": [
   "AWS has several detective services with similar-sounding names, and exam questions often describe a need and ask which service meets it. The trick is to remember the one question each service answers. Together they cover auditing who did what, tracking how resources are configured, spotting threats, finding vulnerabilities, discovering sensitive data, and collecting all of those findings in one place so someone acts on them.",
   "AWS CloudTrail answers who did what, when and from where. It records API calls made in your account, whether from the console, CLI, SDKs or AWS services, including the identity, source IP address, time and parameters. Event history keeps 90 days of management events at no extra charge; a trail delivers events to an S3 bucket for long-term retention and can send them to CloudWatch Logs for metric filters and alarms. An organization trail covers every account in AWS Organizations. Data events, such as S3 object reads or Lambda invocations, are not logged by default and must be enabled, usually selectively because of volume. Log file integrity validation lets you prove the files were not altered, and CloudTrail Lake lets you query events with SQL.",
   "AWS Config answers what did this resource look like, and does it follow our rules. It records configuration changes to supported resources over time, so you can see the full history of a security group, for example, and the relationships between resources. Config rules evaluate resources against desired settings, such as S3 buckets must block public access or EBS volumes must be encrypted, using AWS managed rules or custom rules backed by Lambda or Guard policies. Non-compliant resources can be fixed automatically with remediation actions based on Systems Manager Automation documents. Conformance packs bundle rules for frameworks, and an aggregator shows compliance across accounts and Regions.",
   "Amazon GuardDuty answers is something malicious happening. It is a managed threat detection service that analyzes CloudTrail management events, VPC Flow Logs and DNS query logs, plus optional protection plans for S3 data events, EKS audit logs, runtime monitoring, RDS login activity and malware scanning, using threat intelligence and machine learning. You enable it with a click; no agents or log configuration are required for the foundational sources. Findings include cryptocurrency mining, communication with known malicious IPs and unusual API calls from unexpected locations.",
   "Two more services look inside your workloads and data. Amazon Inspector answers which of my workloads have software vulnerabilities or unintended network exposure, continuously scanning EC2 instances, container images in Amazon Elastic Container Registry (ECR) and Lambda functions for known Common Vulnerabilities and Exposures (CVEs). Amazon Macie answers where is sensitive data in S3, using machine learning and pattern matching to discover personally identifiable information (PII) and other sensitive data, and flags buckets that are public or unencrypted.",
   "AWS Security Hub ties it together. It aggregates findings from GuardDuty, Inspector, Macie, Config, IAM Access Analyzer and partner tools into one view in a standard format, and runs security standards checks such as the AWS Foundational Security Best Practices. Findings flow to Amazon EventBridge, where rules can trigger notifications or automated responses such as a Lambda function that isolates an instance. Amazon Detective, a related service, builds graphs from logs to help investigate the root cause of a finding. In a mature setup, these services are enabled across the organization with a security account as delegated administrator.",
   "Consider a worked example. After an incident, a security team uses CloudTrail to find which role deleted a security group rule and from which IP address, then uses AWS Config to see the rule set before and after the change. It enables a Config rule with automatic remediation so any security group opening SSH to `0.0.0.0/0` is corrected within minutes. GuardDuty, Inspector and Macie are enabled organization-wide with a security account as delegated administrator, and Security Hub aggregates their findings; an EventBridge rule sends high-severity findings to the on-call channel through Amazon Simple Notification Service (SNS).",
   "The common mistakes are mostly swaps between neighbors. Learners expect CloudTrail to show configuration history (that is Config) or Config to show who made the call (that is CloudTrail); expect GuardDuty to scan for software vulnerabilities (that is Inspector); expect Macie to scan databases or EBS volumes rather than S3; and assume S3 object-level reads appear in CloudTrail without enabling data events. Another trap is thinking Security Hub detects threats itself; it mainly aggregates and checks posture.",
   "Match the clue to the service. 'Who deleted', 'API history' or 'audit trail' points to CloudTrail. 'Configuration history', 'compliance with rules' or 'auto-remediate misconfiguration' points to Config. 'Malicious activity', 'compromised instance' or 'crypto mining' points to GuardDuty. 'Vulnerabilities', 'CVE' or 'patch status of container images' points to Inspector. 'PII in S3' points to Macie. 'Single dashboard of findings across accounts' points to Security Hub, and 'investigate root cause' points to Detective."
  ],
  "analogy": "Think of a large office building. CloudTrail is the badge-reader log showing who opened which door and when. Config is the facilities team's photo record of how each room was set up each day, with a checklist of rules like 'fire doors must stay closed'. GuardDuty is the alarm company watching for break-in patterns. Inspector is the building inspector checking for known structural defects. Macie is the auditor who finds confidential papers left in the wrong drawers. Security Hub is the front desk monitor showing every alert in one place. The analogy stops at Macie: it only looks in S3, not every drawer.",
  "terms": [
   [
    "CloudTrail",
    "The service that records API activity in AWS accounts for auditing and investigation."
   ],
   [
    "Data events",
    "High-volume CloudTrail events, such as S3 object reads and writes, that must be enabled explicitly."
   ],
   [
    "AWS Config",
    "The service that records resource configuration history and evaluates compliance with rules."
   ],
   [
    "GuardDuty",
    "A managed threat detection service that analyzes logs to find malicious or unauthorized activity."
   ],
   [
    "Inspector",
    "A service that continuously scans EC2, container images and Lambda functions for known vulnerabilities."
   ],
   [
    "Macie",
    "A service that discovers and classifies sensitive data such as PII in Amazon S3."
   ],
   [
    "Security Hub",
    "A service that aggregates security findings and runs best-practice checks across accounts."
   ],
   [
    "Detective",
    "A service that builds graphs from log data to help investigate the root cause of security findings."
   ]
  ],
  "example": "GuardDuty raises a finding that an EC2 instance is querying a domain associated with cryptocurrency mining. An EventBridge rule matching that finding type triggers a Lambda function that swaps the instance's security group for an isolation group and snapshots its volumes. Investigators then use Detective and CloudTrail to learn that an exposed access key launched the instance, and Inspector shows the image used had an unpatched vulnerability.",
  "mistakes": [
   [
    "CloudTrail shows what a security group looked like last week.",
    "CloudTrail records the API calls that changed it. Configuration history over time comes from AWS Config."
   ],
   [
    "GuardDuty will report unpatched software on EC2 instances.",
    "GuardDuty detects threats from activity logs. Software vulnerability scanning for CVEs is Amazon Inspector."
   ],
   [
    "CloudTrail logs every S3 object download by default.",
    "Object-level reads are data events, which must be enabled explicitly for the bucket."
   ],
   [
    "Security Hub is a threat detection engine.",
    "Security Hub mainly aggregates findings from other services and runs posture checks; GuardDuty does threat detection."
   ]
  ],
  "tryit": [
   [
    "Cobalt Retail must prove to auditors that no S3 bucket in any of its accounts allows public access, fix any that do within minutes, and show a single view of compliance across accounts and Regions. Which service and features do you use?",
    "AWS Config with a managed rule that checks S3 public access settings, an automatic remediation action using a Systems Manager Automation document to correct non-compliant buckets, and a Config aggregator for the cross-account, cross-Region compliance view. Security Hub can also surface these findings alongside others, but the rule evaluation and remediation come from Config."
   ],
   [
    "Overnight, an unknown principal created IAM access keys in a production account. The team needs to know which identity did it, from which IP address, and whether that activity looks like a known attack pattern. Which two services?",
    "CloudTrail shows the CreateAccessKey call with the calling identity, source IP and time. GuardDuty analyzes CloudTrail management events and would raise findings for unusual or malicious API activity, such as calls from unexpected locations."
   ]
  ],
  "tip": "API history: CloudTrail. Configuration history and compliance: Config. Threats: GuardDuty. Vulnerabilities: Inspector. Sensitive data in S3: Macie. Single pane of findings: Security Hub.",
  "check": [
   [
    "Which service would detect an EC2 instance communicating with a known command-and-control server?",
    "Amazon GuardDuty, which analyzes VPC Flow Logs and DNS logs against threat intelligence."
   ],
   [
    "You need to know every change made to a security group's rules over the last month and whether it meets policy. Which service?",
    "AWS Config, which records configuration history and evaluates compliance rules."
   ],
   [
    "Auditors ask who downloaded a specific S3 object last week, but CloudTrail shows nothing. Why?",
    "S3 object-level access is a data event, which CloudTrail does not log unless data events were enabled for that bucket."
   ],
   [
    "Which service scans container images in ECR for known CVEs?",
    "Amazon Inspector."
   ]
  ]
 },
 {
  "t": "Multi-AZ web tiers: Elastic Load Balancing (ALB vs NLB), Auto Scaling groups and ELB health checks",
  "hook": "It is 2:10 a.m. and your phone buzzes: the checkout page at Bluewater Outfitters is returning errors for about a third of customers. You open the console. All three web servers show green in the EC2 list, the operating systems are fine, and the Auto Scaling group reports everything healthy. Yet the load balancer's target group shows one instance failing its `/health` check over and over, and nothing is replacing it. Sam from the morning shift fixed the same thing last week by rebooting the box by hand. Why does the system think a broken server is healthy, and what setting would let it heal itself while you sleep?",
  "simple": "A busy website runs on several computers at once, spread across separate buildings so that one power cut does not take the whole site down. A load balancer is like a host at a restaurant door who sends each arriving guest to a free table, and stops seating people at a table that is broken. An Auto Scaling group is like a manager who keeps the right number of waiters on shift: it adds staff when it gets busy, sends some home when it is quiet, and replaces anyone who stops working. Health checks are how they both find out who is not working. The key point is that the manager should listen to the host, so a waiter who is standing there but not serving gets replaced.",
  "body": [
   "Each AWS Region contains several Availability Zones (AZs): one or more data centers with independent power, cooling and networking, connected to each other by low-latency links. A resilient web tier runs in at least two AZs, so the loss of one data center, or a whole AZ, does not take the application down. Three services make that practical. Elastic Load Balancing (ELB) spreads traffic across healthy targets, Amazon EC2 Auto Scaling keeps the right number of healthy Amazon Elastic Compute Cloud (EC2) instances running, and health checks tie the two together. This combination appears in a large share of SAA-C03 resilience questions, usually disguised as a story about an outage, a traffic spike or an instance that should have been replaced but was not.",
   "The first decision is which load balancer type fits. An Application Load Balancer (ALB) works at layer 7, the HTTP and HTTPS level, so it can read the request itself. It can route by host name, path, HTTP headers, query strings and source IP address, which means one ALB can send `/api/*` to one target group and `/images/*` to another. Targets can be EC2 instances, IP addresses (including containers) or AWS Lambda functions. It terminates Transport Layer Security (TLS) using a certificate, supports WebSockets and HTTP/2, can authenticate users through Amazon Cognito or an OpenID Connect (OIDC) provider before requests reach your code, and integrates with AWS WAF, the web application firewall.",
   "A Network Load Balancer (NLB) works at layer 4 with the Transmission Control Protocol (TCP), the User Datagram Protocol (UDP) and TLS. It does not look inside HTTP requests; it forwards connections. In exchange it handles very high throughput with very low latency, can preserve the client source IP address, and provides one static IP address per AZ, to which you can attach Elastic IP addresses. Choose the NLB for non-HTTP protocols, static IPs that partners can put in firewall allowlists, extreme performance, or to expose a service to other VPCs through AWS PrivateLink. A Gateway Load Balancer is a third type, used to insert third-party virtual appliances such as firewalls and intrusion detection systems into the traffic path transparently.",
   "Behind the load balancer sits an Auto Scaling group (ASG). It launches instances from a launch template across the subnets you choose, keeping the count between a minimum and a maximum around a desired capacity. It balances instances across AZs and, if an AZ fails, launches replacements in the remaining ones. Scaling policies change the desired capacity: target tracking keeps a metric near a value (for example average CPU at 50 percent or request count per target), step scaling reacts to Amazon CloudWatch alarm thresholds with different-sized adjustments, scheduled scaling handles known peaks such as a Monday-morning rush, and predictive scaling forecasts daily and weekly patterns and adds capacity ahead of them. Attaching the ASG to a load balancer target group registers new instances automatically and deregisters terminated ones, so nobody edits target lists by hand.",
   "Health checks decide what happens to a bad instance, and this is where many designs quietly fail. The load balancer runs its own health check, for example an HTTP GET on `/health` expecting a 200 response, and stops sending traffic to targets that fail it. The ASG, by default, uses only EC2 status checks, which catch hardware and operating system failures but not a crashed web server process. The instance keeps running, the ASG sees nothing wrong, and you are left paying for a server that serves no one while the remaining servers carry extra load. Enabling the ELB health check type on the ASG makes it also replace instances that the load balancer marks unhealthy. That setting is a frequent exam answer. A health check grace period gives new instances time to boot and warm up before checks count against them, and connection draining (called deregistration delay on target groups) lets in-flight requests finish before an instance is removed.",
   "```\naws autoscaling update-auto-scaling-group \\\n  --auto-scaling-group-name web-asg \\\n  --health-check-type ELB --health-check-grace-period 300\n```",
   "Consider a worked example. An online store runs an ALB in front of an ASG spanning three AZs, with a minimum of three instances and a target tracking policy on request count per target. A bad deployment makes the web server on one instance return errors while the operating system stays healthy. The ALB health check fails and traffic moves to the other two instances within a few check intervals. Because the ASG uses the ELB health check type, it terminates the broken instance and launches a fresh one from the launch template, which registers itself in the target group and starts receiving traffic once it passes its checks. Session data lives in Amazon ElastiCache, so customers on the failed instance stay logged in, and uploaded images are stored in Amazon S3 rather than on local disks, so nothing is lost when the instance disappears.",
   "Several design habits make this pattern work. Keep instances stateless, storing sessions in ElastiCache or Amazon DynamoDB and files in S3, so any instance can serve any user and scale-in never deletes data. Size the minimum capacity so that losing one AZ still leaves enough instances for normal load; with three AZs and a minimum of two, an AZ failure can leave a single instance carrying everything. Sticky sessions exist on the ALB, but they make scaling and failover less even, so treat them as a workaround rather than a design goal. And put health check endpoints on a path that genuinely exercises the application, not a static file that returns 200 even when the app is broken.",
   "Exam wording is predictable. 'Path-based', 'host-based' or 'route to microservices by URL' points to ALB. 'Static IP', 'UDP', 'TCP', 'millions of requests per second' or 'ultra-low latency' points to NLB. 'Third-party firewall appliances' points to Gateway Load Balancer. 'ASG is not replacing instances that the load balancer reports as unhealthy' points to the ELB health check type, and 'survive the loss of an AZ' points to instances spread across multiple AZs with enough minimum capacity."
  ],
  "analogy": "Think of a taxi rank at an airport. The dispatcher (the load balancer) sends each passenger to a waiting cab and skips any cab whose driver does not answer. The fleet manager (the Auto Scaling group) keeps enough cabs at the rank. If the manager only checks whether each cab's engine runs (EC2 status checks), a cab with a sleeping driver stays in the fleet forever. Tell the manager to trust the dispatcher's reports (the ELB health check type) and that cab gets swapped out. The analogy stops at routing: an ALB can also read where each passenger wants to go, while an NLB just hands them on quickly.",
  "terms": [
   [
    "Availability Zone",
    "One or more isolated data centers in a Region with independent power and networking."
   ],
   [
    "Application Load Balancer",
    "A layer 7 load balancer that routes HTTP and HTTPS requests by content such as path and host."
   ],
   [
    "Network Load Balancer",
    "A layer 4 load balancer for TCP, UDP and TLS with static IPs per AZ and very high performance."
   ],
   [
    "Gateway Load Balancer",
    "A load balancer that inserts third-party virtual appliances, such as firewalls, transparently into the traffic path."
   ],
   [
    "Auto Scaling group",
    "A set of EC2 instances launched from a template that EC2 Auto Scaling keeps at a desired, healthy count."
   ],
   [
    "Target tracking policy",
    "A scaling policy that adjusts capacity to keep a chosen metric near a target value."
   ],
   [
    "ELB health check type",
    "An Auto Scaling group setting that replaces instances the load balancer reports as unhealthy."
   ],
   [
    "Deregistration delay",
    "Connection draining: the time a target keeps serving in-flight requests after it is removed from a target group."
   ]
  ],
  "example": "A gaming company needs a lobby service that speaks a custom UDP protocol, and partner networks must allowlist its addresses. It deploys a Network Load Balancer with an Elastic IP in each of two AZs in front of an Auto Scaling group, and a separate Application Load Balancer for its HTTPS web store that routes `/store/*` and `/account/*` to different target groups. Each ASG uses target tracking and ELB health checks.",
  "mistakes": [
   [
    "Leaving the Auto Scaling group on its default health checks because 'the load balancer already checks health'.",
    "The load balancer only stops routing to a failed target; it does not terminate it. By default the ASG uses EC2 status checks, which miss a crashed application. Set the ASG health check type to ELB so it replaces those instances."
   ],
   [
    "Picking an ALB when the requirement mentions UDP or fixed IP addresses for allowlisting.",
    "ALBs handle HTTP and HTTPS and do not offer static IPs. An NLB supports TCP, UDP and TLS and gives one static IP per AZ, optionally Elastic IPs."
   ],
   [
    "Picking an NLB because it is 'faster' when the question asks for path-based or host-based routing.",
    "An NLB works at layer 4 and cannot inspect URLs or host headers. Content-based routing requires an ALB."
   ],
   [
    "Running all instances in one AZ, or setting the minimum so low that one AZ failure leaves too little capacity.",
    "Spread the ASG across at least two AZs and size the minimum so the surviving AZs can carry normal load on their own."
   ]
  ],
  "tryit": [
   [
    "Harborview Clinic runs a patient portal on an ALB in front of an ASG across two AZs with a minimum of two instances. After a code release, one instance starts returning HTTP 500 errors on every page, but its EC2 status checks pass. The ALB has stopped sending it traffic, so the remaining instance is overloaded, and three hours later the broken instance is still running. What one change fixes this, and what else would you review?",
    "Change the ASG's health check type to ELB, with a sensible grace period, so the ASG terminates instances the ALB marks unhealthy and launches replacements. Also review the minimum capacity: with two instances in two AZs, losing one leaves a single instance carrying all traffic, so a higher minimum or a target tracking policy would add headroom."
   ]
  ],
  "tip": "Path-based or host-based routing means ALB. Static IP, UDP or millions of requests per second with ultra-low latency means NLB. Third-party appliances in the path means Gateway Load Balancer. If an ASG is not replacing instances that the load balancer says are unhealthy, switch the ASG to the ELB health check type.",
  "check": [
   [
    "A game server uses UDP and clients must allowlist fixed IP addresses. Which load balancer fits?",
    "A Network Load Balancer, which supports UDP and gives a static IP address per AZ (optionally Elastic IPs)."
   ],
   [
    "Why should web servers behind an ASG not keep user sessions in local memory?",
    "Instances can be terminated or added at any time; keeping sessions in ElastiCache or DynamoDB lets any instance serve any user."
   ],
   [
    "By default, what health checks does an Auto Scaling group use?",
    "EC2 status checks only, which miss application failures unless the ELB health check type is enabled."
   ],
   [
    "Which scaling policy keeps average CPU near 50 percent with the least configuration?",
    "A target tracking scaling policy with a CPU utilization target of 50 percent."
   ],
   [
    "What does the health check grace period protect against?",
    "New instances being marked unhealthy and terminated before they finish booting and starting the application."
   ]
  ]
 },
 {
  "t": "Decoupling with Amazon SQS (standard vs FIFO, visibility timeout, dead-letter queues) and SNS fan-out",
  "hook": "Friday evening at Copperleaf Books, the flash sale goes live and orders pour in. Ten minutes later, Dana on the support desk sees the first angry email: a customer was charged twice for the same order. Then another. In the payment service logs you find the same order ID processed two, sometimes three times, each about thirty seconds apart. Meanwhile the shipping team says one strange order has been failing for an hour and keeps coming back. Nothing is down, yet everything feels wrong. What is the queue doing, and how do you make it deliver each order once and set aside the one that never works?",
  "simple": "Imagine a restaurant where waiters pin order slips on a rail instead of shouting them at the cooks. If the kitchen gets busy, slips just wait on the rail; nobody is turned away. That rail is a queue, and Amazon SQS is a managed version of it for programs. When a cook takes a slip, it is hidden from other cooks for a while. If the cook finishes, the slip is thrown away. If the cook takes too long, the slip reappears and someone else may cook it again, which is how duplicates happen. Slips that fail again and again go into a separate tray to be looked at later. Amazon SNS is like a loudspeaker announcement: one message, heard by everyone who signed up.",
  "body": [
   "Tightly coupled systems fail together. If a web tier calls an order processor directly and the processor slows down or crashes, the web tier backs up and users see errors too. Decoupling puts a durable buffer between components so each can scale, deploy and fail independently: the producer only needs the buffer to accept its message, not the consumer to be ready. Amazon Simple Queue Service (SQS) and Amazon Simple Notification Service (SNS) are the two classic building blocks, and the exam expects you to know how each behaves under failure, not just what it is called.",
   "SQS is a fully managed message queue. Producers send messages; consumers poll for them, process them and then delete them. Messages are stored redundantly across multiple Availability Zones (AZs) and kept for a configurable retention period, up to 14 days, so a consumer outage of hours or days loses nothing. A standard queue offers nearly unlimited throughput with at-least-once delivery and best-effort ordering, so consumers must tolerate duplicates and out-of-order messages. That means designing idempotent processing, for example by recording processed order IDs in a database and skipping any ID already seen. A FIFO (first in, first out) queue, whose name must end in `.fifo`, guarantees order within a message group and exactly-once processing within a deduplication interval, at lower throughput than standard queues. Message group IDs let different customers' messages be processed in parallel while each customer's messages stay in order.",
   "The visibility timeout is the setting that most often explains strange behavior. When a consumer receives a message, SQS hides it from other consumers for the visibility timeout. If the consumer deletes the message in time, it is gone. If the consumer crashes or takes too long, the message becomes visible again and another consumer retries it. That retry is a feature, because it means a crashed worker never loses work, but it becomes a bug when the timeout is shorter than normal processing time, since a healthy worker's message reappears and a second worker processes it too. Set the visibility timeout longer than your normal processing time; if processing sometimes runs long, the consumer can extend it with `ChangeMessageVisibility`.",
   "A few other queue settings appear in questions about cost and payload size. Long polling, with a receive wait time of up to 20 seconds, makes a receive call wait for messages to arrive instead of returning empty immediately, which reduces empty responses and cost compared with short polling. A delay queue postpones delivery of new messages for a set time. Very large payloads are usually stored in Amazon S3 with a pointer in the message, so the queue carries a small reference rather than the data itself.",
   "Some messages will never succeed, perhaps because they are malformed or reference data that does not exist. A dead-letter queue (DLQ) catches them. A redrive policy on the source queue says that after a message has been received a certain number of times (the `maxReceiveCount`), SQS moves it to the DLQ. That keeps poison messages from blocking work and wasting compute, and lets you inspect them, fix the bug, and redrive them back to the source queue later. A FIFO queue's DLQ must also be FIFO. Set an Amazon CloudWatch alarm on the DLQ's message count so someone notices, because a DLQ that silently fills up is just a slower way to lose orders.",
   "SNS works differently: it is a publish-subscribe service. Publishers send a message to a topic, and SNS pushes a copy to every subscriber: SQS queues, AWS Lambda functions, HTTP(S) endpoints, email, SMS text messages or mobile push. SNS itself does not store messages for later polling, so a subscriber that is down can miss a push unless retries and a DLQ are configured. The fan-out pattern combines the two services: publish once to an SNS topic with several SQS queues subscribed, and each downstream system gets its own durable copy to process at its own pace. Subscription filter policies let each subscriber receive only the messages it cares about. The queue's access policy must allow the topic to send to it, and SNS FIFO topics can fan out to SQS FIFO queues when order matters.",
   "Consider a worked example. When an order is placed, the web tier publishes one message to an SNS topic. Three SQS queues subscribe: payment, shipping and analytics, and the analytics subscription uses a filter policy to receive only orders above a certain value. During a flash sale the shipping service falls behind, but its messages wait safely in its queue while payment and analytics keep up. The shipping Auto Scaling group scales on the queue's `ApproximateNumberOfMessagesVisible` metric, adding workers as the backlog grows and removing them once it drains. One malformed order that fails five times moves to the shipping DLQ for investigation instead of blocking the queue, and the payment consumer records each processed order ID so a rare duplicate delivery never charges a customer twice.",
   "Exam questions give strong clues. 'Messages processed more than once' points to the visibility timeout or idempotency. 'Strict order' or 'no duplicates' points to FIFO. 'One event to several independent consumers' points to SNS fan-out to SQS. 'Failed messages must be isolated for later analysis' points to a dead-letter queue. 'Reduce empty receives and cost' points to long polling, and 'scale workers on backlog' points to Auto Scaling on queue depth."
  ],
  "analogy": "A coat check works like SQS. You hand over a coat (send a message) and walk away; the attendant (consumer) deals with it later. When an attendant picks up a ticket, they turn it face down for a few minutes (visibility timeout); if they wander off without finishing, it flips back up for someone else. A coat with a ticket nobody can read goes to a lost-and-found shelf (DLQ). SNS is the venue announcer who tells every room at once. The analogy breaks on ordering: a real coat check has no idea of strict order, which is what FIFO queues add.",
  "terms": [
   [
    "Standard queue",
    "An SQS queue type with very high throughput, at-least-once delivery and best-effort ordering."
   ],
   [
    "FIFO queue",
    "An SQS queue type that preserves order within a message group and prevents duplicates within a deduplication interval."
   ],
   [
    "Visibility timeout",
    "The period during which a received SQS message is hidden from other consumers while it is processed."
   ],
   [
    "Dead-letter queue",
    "A queue that receives messages that failed processing more times than the maxReceiveCount."
   ],
   [
    "Long polling",
    "An SQS receive mode that waits up to 20 seconds for messages, reducing empty responses."
   ],
   [
    "Fan-out",
    "Publishing a message once to an SNS topic so that many subscribers, often SQS queues, each receive a copy."
   ],
   [
    "Subscription filter policy",
    "An SNS setting that delivers to a subscriber only the messages whose attributes or content match."
   ],
   [
    "Idempotent processing",
    "Handling a message so that processing it twice has the same effect as processing it once."
   ]
  ],
  "example": "A video platform's upload service used to call the transcoder directly, and uploads failed whenever transcoding was slow. The team puts an SQS standard queue between them, sets the visibility timeout above the longest normal transcode time, adds a dead-letter queue with a maxReceiveCount of three, and scales transcoding instances on queue depth. Uploads now always succeed immediately, and the transcoders catch up after peaks.",
  "mistakes": [
   [
    "Duplicate processing means SQS is broken, so switch to FIFO.",
    "Usually the visibility timeout is shorter than processing time, so messages reappear before deletion. Raise the timeout (or extend it per message) and make processing idempotent; choose FIFO only when order or deduplication is a real requirement."
   ],
   [
    "A standard queue keeps messages in order.",
    "Standard queues offer best-effort ordering only. Strict order within a group requires a FIFO queue and message group IDs."
   ],
   [
    "Subscribe each service directly to SNS so all of them get the event.",
    "SNS pushes and does not store messages for polling, so a service that is down can miss them. Subscribe an SQS queue per service so each has a durable buffer."
   ],
   [
    "Choose FIFO for safety even when the requirement is maximum throughput.",
    "FIFO has lower throughput than standard queues. If order does not matter, a standard queue with idempotent consumers is the better fit."
   ]
  ],
  "tryit": [
   [
    "Maple Street Pharmacy sends prescription refill events to an SQS standard queue. A worker takes about two minutes to verify each refill with the insurer, and the queue's visibility timeout is 30 seconds. Some refills are submitted to insurers twice, and one refill with a corrupted patient ID has been retried hundreds of times over two days. What two changes would you make?",
    "Raise the visibility timeout above the normal two-minute processing time (and make submission idempotent by recording the refill ID), so healthy workers stop being duplicated. Add a dead-letter queue with a redrive policy and a modest maxReceiveCount, with a CloudWatch alarm on it, so the corrupted message is isolated for investigation instead of retrying until retention expires."
   ]
  ],
  "tip": "Messages processed twice usually means the visibility timeout is shorter than processing time. Strict order and no duplicates means FIFO. One event delivered to several independent consumers means SNS fan-out to SQS. Poison messages mean a dead-letter queue.",
  "check": [
   [
    "A consumer takes 90 seconds per message but the visibility timeout is 30 seconds. What happens?",
    "The message becomes visible again before it is deleted, so another consumer processes it too, producing duplicates. Raise the visibility timeout above the processing time."
   ],
   [
    "How do you stop one malformed message from being retried forever?",
    "Configure a dead-letter queue with a redrive policy and a maxReceiveCount."
   ],
   [
    "What must the name of a FIFO queue end with?",
    "The suffix .fifo."
   ],
   [
    "Why subscribe SQS queues to an SNS topic instead of subscribing the services directly?",
    "Each queue stores its own durable copy, so a slow or unavailable consumer can catch up later without losing messages."
   ],
   [
    "What reduces empty receive responses and their cost?",
    "Long polling, with a receive wait time of up to 20 seconds."
   ]
  ]
 },
 {
  "t": "Event-driven and serverless patterns: EventBridge, Lambda, Step Functions and API Gateway",
  "hook": "At Ridgeline Insurance, one small EC2 instance named `cron-box-01` has run every night for four years. It resizes claim photos, chains together six scripts that call each other, and emails a report at 6 a.m. Last night it ran out of disk space, the report never arrived, and nobody noticed until an adjuster asked Leo why the dashboard was empty. Leo's manager asks a simple question: why are we paying for and patching a server all day so that it can work for forty minutes a night? Leo suspects there is a better shape for this system. Which services would replace the box, and what would each one do?",
  "simple": "Serverless means you hand AWS a small piece of code or a set of instructions and AWS runs it only when something happens, like a photo being uploaded or a clock reaching midnight. You do not rent a computer that sits waiting. Lambda runs short pieces of code. API Gateway is the front door that lets apps on the internet call that code safely. EventBridge is a message router: it watches for events and sends each one to the right place. Step Functions is a checklist runner for jobs with many steps, retrying any step that fails. Picture a smart home: a motion sensor (the event) turns on a light (the code), and you never pay a person to stand by the switch.",
  "body": [
   "Serverless services run your code and route your events without you managing servers. They scale automatically, including down to zero, and you pay for use rather than for idle capacity. Event-driven design means components react to events, such as an object uploaded or an order placed, instead of calling each other directly, which keeps them loosely coupled: the producer of an event does not need to know who consumes it. On the exam, serverless is often the answer when a question stresses the least operational overhead, unpredictable or spiky traffic, or paying nothing when idle.",
   "AWS Lambda runs functions in response to events: an API request, a new object in Amazon Simple Storage Service (S3), a message in Amazon Simple Queue Service (SQS), a record in an Amazon DynamoDB stream or Amazon Kinesis stream, or a schedule. You choose the memory size, which also sets the CPU share, and a timeout of up to 15 minutes. Each function has an execution role in AWS Identity and Access Management (IAM) that grants its AWS permissions. Lambda scales by running more concurrent copies of the function. Reserved concurrency guarantees and caps capacity for one function, which also protects a downstream database from being overwhelmed, and provisioned concurrency keeps execution environments initialized to avoid cold-start latency. Asynchronous invocations can send failures to a destination or a dead-letter queue (DLQ) so nothing disappears silently.",
   "Lambda also has clear boundaries. It can run inside a virtual private cloud (VPC) to reach private resources such as an Amazon Relational Database Service (RDS) database, often through RDS Proxy, which pools connections so thousands of short-lived function copies do not exhaust the database's connection limit. Anything that runs longer than 15 minutes or needs a persistent process, such as a long video transcode or a server holding open sockets, belongs on containers, AWS Batch or Amazon Elastic Compute Cloud (EC2) instances instead. Recognizing that boundary is one of the most reliable points on the exam.",
   "Amazon API Gateway puts an HTTPS front door on your back ends, most often Lambda. REST APIs offer the richest features, such as API keys and usage plans, request validation, response caching and AWS WAF integration. HTTP APIs are simpler and lower cost, with JSON Web Token (JWT) authorizers built in. WebSocket APIs support two-way, long-lived connections such as chat. API Gateway handles authorization with IAM, Amazon Cognito user pools or Lambda authorizers, and throttling limits protect your back end from bursts. Edge-optimized endpoints use Amazon CloudFront; regional and private endpoints are also available. API Gateway has its own integration timeout, so slow work should be accepted quickly and handed off asynchronously.",
   "Amazon EventBridge is a serverless event bus. AWS services, your applications and software as a service (SaaS) partners send events to a bus; rules match events by pattern and route them to targets like Lambda, SQS, Amazon Simple Notification Service (SNS), Step Functions, API destinations or another account's bus. The pattern below matches any EC2 instance entering the stopped state. EventBridge Scheduler and scheduled rules replace cron servers, and archive and replay help recover from bugs by re-sending past events after a fix. Compared with SNS, EventBridge offers content-based filtering on any event field, many more target types and third-party event sources; SNS offers higher fan-out throughput and delivery to email, SMS and mobile push.",
   "```\n{\n  \"source\": [\"aws.ec2\"],\n  \"detail-type\": [\"EC2 Instance State-change Notification\"],\n  \"detail\": { \"state\": [\"stopped\"] }\n}\n```",
   "AWS Step Functions coordinates multi-step workflows as state machines defined in Amazon States Language. Each state can invoke Lambda or call many AWS services directly, with built-in retries, error catching, parallel branches, choices, maps over lists and waits. Because the workflow tracks state, your functions stay small and do not have to know what runs before or after them. Standard workflows can run for up to a year, record full execution history and suit long-running business processes, including waiting for human approval with a task token. Express workflows suit high-volume, short event processing where cost per execution matters more than a detailed history.",
   "Consider a worked example. An insurance claim app accepts uploads through API Gateway and Lambda. A Step Functions Standard workflow then extracts data, checks for fraud in parallel with a policy lookup, waits for an adjuster's approval, and pays out, retrying failed steps with backoff. An EventBridge rule notifies the audit team whenever a claim over a threshold is approved, without the payment code knowing the audit team exists. The common anti-patterns this avoids are Lambda functions that call each other synchronously, which multiplies cost and makes errors hard to handle, a cron EC2 instance kept running just to trigger tasks, and a Lambda function scaling without limit against a small database.",
   "Exam clues map neatly. 'Least operational overhead', 'scale to zero' or 'spiky traffic' points to Lambda and other serverless services. 'Orchestrate multiple steps with retries', 'human approval' or 'long-running workflow' points to Step Functions. 'React to events from AWS services or SaaS applications', 'filter on event content' or 'replace a cron server' points to EventBridge. 'Expose a REST endpoint with throttling, API keys or caching' points to API Gateway, and 'longer than 15 minutes' rules out Lambda."
  ],
  "analogy": "Think of a well-run film set. EventBridge is the assistant director with a radio, hearing every cue and telling the right crew member to act. Lambda crew members are day hires who show up only for a scene and leave, and no single scene may run longer than a fixed slot. Step Functions is the shooting script with each scene in order, retakes allowed, and a pause while the director approves. API Gateway is the studio gate that checks badges. The analogy stops at cost: real day hires get a minimum day rate, while Lambda bills only for the time and memory used.",
  "terms": [
   [
    "AWS Lambda",
    "A serverless compute service that runs functions in response to events, for up to 15 minutes per invocation."
   ],
   [
    "Reserved concurrency",
    "A Lambda setting that guarantees and caps the number of concurrent executions for one function."
   ],
   [
    "Provisioned concurrency",
    "Pre-initialized Lambda execution environments that remove cold-start latency."
   ],
   [
    "Amazon API Gateway",
    "A managed service for creating, securing and throttling REST, HTTP and WebSocket APIs."
   ],
   [
    "Amazon EventBridge",
    "A serverless event bus that routes events to targets based on pattern-matching rules."
   ],
   [
    "AWS Step Functions",
    "A service that orchestrates workflows as state machines with retries, branches and error handling."
   ],
   [
    "RDS Proxy",
    "A managed connection pool that sits between applications such as Lambda and an RDS or Aurora database."
   ]
  ],
  "example": "A startup ran a small EC2 instance whose only job was cron: every night it resized uploaded images and emailed a report. The team replaces it with an S3 event notification that triggers a Lambda function on each upload, and an EventBridge Scheduler schedule that starts a Step Functions workflow each night to build and email the report. The instance is deleted, costs drop to near zero on quiet days, and failed steps retry automatically.",
  "mistakes": [
   [
    "Lambda is serverless, so it suits any batch job.",
    "Each invocation is limited to 15 minutes. Longer jobs belong on AWS Batch, ECS on Fargate or EC2, or should be split into steps orchestrated by Step Functions."
   ],
   [
    "Chaining Lambda functions that call each other directly is a simple workflow.",
    "Synchronous chains pay for idle waiting, multiply failure points and make retries messy. Step Functions handles sequencing, retries, branches and waits."
   ],
   [
    "EventBridge and SNS are interchangeable.",
    "EventBridge offers rich content-based filtering, many target types and SaaS event sources. SNS offers higher fan-out throughput and delivery to email, SMS and mobile push. Pick by the stated requirement."
   ],
   [
    "Letting Lambda scale freely is always good.",
    "Unlimited concurrency can exhaust a small database's connections. Cap it with reserved concurrency, pool connections with RDS Proxy, or buffer work with SQS."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Library wants a mobile app endpoint where patrons renew books. Traffic is near zero overnight and spikes when overdue notices go out. Renewals must check the catalog, charge any fee and, for rare items, wait up to three days for a librarian's approval. Which services would you combine, and why not a single Lambda function?",
    "Use API Gateway in front of a Lambda function that accepts the request quickly, then start a Step Functions Standard workflow for the catalog check, fee charge and the human approval step using a task token. A single function cannot wait three days, because invocations stop at 15 minutes, and serverless scaling handles the overnight lull and the notice-day spike without idle servers."
   ]
  ],
  "tip": "Watch for time limits: a job longer than 15 minutes rules out Lambda. Orchestrating multiple steps with retries or human approval points to Step Functions; routing events from AWS services or SaaS apps by content points to EventBridge; throttling, API keys or caching on an endpoint points to API Gateway.",
  "check": [
   [
    "A nightly batch job runs for two hours. Is Lambda a good fit?",
    "No. Lambda invocations are limited to 15 minutes. Use AWS Batch, ECS on Fargate or EC2."
   ],
   [
    "Which service would run a Lambda function whenever any EC2 instance in the account stops?",
    "Amazon EventBridge, with a rule matching EC2 instance state-change events for the stopped state."
   ],
   [
    "A Lambda function overwhelms an RDS database during bursts. Name two fixes.",
    "Set reserved concurrency to cap parallel executions, and use RDS Proxy to pool connections (or buffer work through SQS)."
   ],
   [
    "Which API Gateway type supports two-way persistent connections for a chat app?",
    "A WebSocket API."
   ],
   [
    "Which Step Functions workflow type fits a process that waits days for human approval?",
    "A Standard workflow, which can run for up to a year and supports task tokens for callbacks."
   ]
  ]
 },
 {
  "t": "Containers on AWS: ECS vs EKS, and the Fargate vs EC2 launch types",
  "hook": "The architecture review at Tidewater Logistics is going sideways. Two teams both want to move to containers on AWS. Amara's team has six people, no Kubernetes experience, and a deadline in five weeks for a simple shipment-tracking API. Victor's team runs a large Kubernetes platform in the company data center, with custom operators and dozens of Helm charts, and needs GPUs for route-optimization models. The chief architect turns to you and asks for one container strategy for the whole company. Is one answer even right here, and which choices actually matter: the orchestrator, the servers underneath, or both?",
  "simple": "A container is like a lunchbox that holds a program plus everything it needs, so it works the same anywhere you open it. Running many lunchboxes needs a coordinator that decides where each one goes, restarts any that break, and connects them together. AWS offers two coordinators: ECS, which is AWS's own and simpler, and EKS, which runs the popular open-source Kubernetes system. Separately, you choose where the containers physically run: on servers you look after yourself (EC2), or on Fargate, where AWS looks after the servers and you only say how much power each container needs. It is like choosing a delivery company, then choosing whether to own the vans or rent space on theirs.",
  "body": [
   "Containers package an application with its dependencies so it runs the same way on a laptop, in testing and in production. They start in seconds and pack densely onto hosts, which makes them a natural fit for microservices. On AWS you make two separate choices, and the exam often tests them separately: an orchestrator, which schedules, restarts and connects containers, and a capacity model, which decides where they actually run. Container images are usually stored in Amazon Elastic Container Registry (ECR), a private registry integrated with AWS Identity and Access Management (IAM) that can scan images for vulnerabilities and replicate them across Regions and accounts.",
   "Amazon Elastic Container Service (ECS) is AWS's own orchestrator. You describe containers in a task definition: the image, CPU and memory, ports, environment variables, secrets from AWS Secrets Manager or Systems Manager Parameter Store, logging configuration and IAM roles. A task is a running instance of that definition. An ECS service keeps a desired number of tasks running, replaces failed ones, spreads them across Availability Zones (AZs), performs rolling deployments and registers tasks with a load balancer target group, typically behind an Application Load Balancer (ALB). ECS is simpler to learn and deeply integrated with AWS, which makes it a good answer when a question stresses minimal operational overhead and has no Kubernetes requirement.",
   "Amazon Elastic Kubernetes Service (EKS) runs the Kubernetes control plane for you across multiple AZs, patched and scaled by AWS. You use standard Kubernetes tools such as `kubectl`, Helm charts and YAML manifests, and the same workloads can run on other Kubernetes clusters. Choose EKS when an organization already uses Kubernetes, wants portability across clouds or on-premises (EKS Anywhere extends it to your own hardware), or depends on the Kubernetes ecosystem of operators and add-ons. Pods get AWS permissions through IAM roles for service accounts (IRSA) or EKS Pod Identity, rather than sharing the node's permissions, so one compromised pod cannot use another workload's access.",
   "Both orchestrators support two capacity models. With the EC2 launch type (in EKS, managed node groups or self-managed nodes), containers run on Amazon Elastic Compute Cloud (EC2) instances in your account. You choose instance types, patch or replace the hosts, and manage cluster capacity, often with capacity providers or Karpenter to scale nodes. That gives you control over graphics processing units (GPUs), specialized instance types, Reserved Instance, Savings Plans or Spot pricing, and host-level agents that must run on every node. With AWS Fargate there are no instances to manage: you specify CPU and memory per task or pod, AWS runs it on isolated capacity, and you pay for the resources requested while it runs. Fargate Spot and EC2 Spot Instances offer discounted, interruptible capacity for fault-tolerant tasks.",
   "It helps to think of the choice as a grid. ECS on Fargate is the least to operate: no Kubernetes and no servers. ECS on EC2 keeps the simple orchestrator but gives you host control and the pricing options of owned capacity. EKS on EC2 is the most flexible and the most work. EKS on Fargate removes node management for Kubernetes pods, with the same limits on host access that Fargate always has. Questions usually give one clue for the orchestrator and another for capacity, so answer each part on its own.",
   "Two ECS details show up often. The task execution role lets the ECS agent pull images from ECR, fetch secrets for injection and write logs to Amazon CloudWatch, while the task role gives the application code inside the container its AWS permissions. If the app cannot read an Amazon Simple Storage Service (S3) bucket, look at the task role; if the task will not even start because the image cannot be pulled, look at the execution role. And ECS services scale their task count with Service Auto Scaling on metrics such as CPU, memory or ALB request count per target, while the EC2 capacity underneath (if any) scales separately through a capacity provider.",
   "Consider a worked example. A startup wants to run a containerized API without managing servers or learning Kubernetes. It pushes images to ECR with scan on push enabled, defines an ECS service on Fargate across three AZs behind an ALB, gives the task role read access to one Amazon DynamoDB table, and sets Service Auto Scaling to target 60 percent CPU. A different team at the same company already runs a large Kubernetes platform on-premises with custom operators; it moves to EKS with managed node groups on GPU instances for its machine learning inference pods, keeping its manifests and Helm charts unchanged. Both answers are correct for their teams, which is exactly the kind of split the exam likes.",
   "Exam clues are consistent. 'Already uses Kubernetes', 'open source tooling' or 'portability across environments' points to EKS. 'Simplest AWS-native container orchestration' points to ECS. 'No servers to manage', 'least operational overhead' or 'pay only for task resources' points to Fargate. 'GPUs', 'control over the host', 'daemon agents on every node' or 'lowest cost for steady, dense workloads with Reserved pricing' points to the EC2 launch type. 'Application inside the container needs S3 access' points to the ECS task role."
  ],
  "analogy": "Running containers is like running a food delivery business. The orchestrator is your dispatch system: ECS is the one the city provides, simple and built for local roads; EKS is a popular franchise system you can take to any city. The capacity model is the vehicles: with EC2 you own the vans, choose special refrigerated ones (GPUs) and must service them; with Fargate you book space per delivery and never see a garage. The analogy stops at billing: Fargate charges for the CPU and memory you request per task, not per trip.",
  "terms": [
   [
    "Amazon ECR",
    "A private container image registry integrated with IAM that can scan images for vulnerabilities."
   ],
   [
    "Task definition",
    "The ECS blueprint describing a task's containers, resources, networking and IAM roles."
   ],
   [
    "ECS service",
    "An ECS construct that keeps a desired number of tasks running and integrates with load balancers."
   ],
   [
    "Amazon EKS",
    "A managed Kubernetes service that runs the control plane for you."
   ],
   [
    "AWS Fargate",
    "A serverless compute engine for containers that removes the need to manage EC2 hosts."
   ],
   [
    "ECS task role",
    "The IAM role whose permissions the application inside an ECS task uses."
   ],
   [
    "Task execution role",
    "The IAM role the ECS agent uses to pull images, fetch injected secrets and send logs."
   ],
   [
    "IRSA",
    "IAM roles for service accounts: a way to give an EKS pod its own IAM role instead of the node's role."
   ]
  ],
  "example": "A retailer runs a nightly inventory reconciliation job in a container that takes about 40 minutes, too long for Lambda. It schedules the job with EventBridge Scheduler to run an ECS task on Fargate Spot, because the job can simply restart if interrupted. The task role allows reading from S3 and writing to DynamoDB, and the execution role pulls the image from ECR and ships logs to CloudWatch. There are no servers to patch and the job costs only the minutes it runs.",
  "mistakes": [
   [
    "EKS is the 'enterprise' choice, so pick it whenever containers are mentioned.",
    "Without a Kubernetes requirement, ECS is simpler and is usually the answer when the question stresses minimal operational overhead."
   ],
   [
    "Fargate fits every container workload.",
    "Fargate does not give host-level access, so workloads needing GPUs, special host agents or a specific instance type need the EC2 launch type or node groups."
   ],
   [
    "The task execution role is what the application uses to call AWS services.",
    "The execution role is for the ECS agent (pull images, fetch secrets, send logs). Application code uses the task role."
   ],
   [
    "Using the EC2 launch type means AWS handles the hosts.",
    "With EC2 you still patch, replace and scale the container instances yourself, often with capacity providers or Karpenter."
   ]
  ],
  "tryit": [
   [
    "Silverline Health wants to run a containerized appointment-reminder service. The team has no Kubernetes skills, traffic is modest and uneven, and security requires that only this service can read the reminders DynamoDB table. The first deployment fails because the container cannot read the table, although the image pulls and logs work fine. Which orchestrator and capacity model fit, and which role should you fix?",
    "ECS on Fargate fits: no Kubernetes requirement and no hosts to manage for an uneven workload. Because the image pulls and logs work, the execution role is fine; grant DynamoDB read access on that one table to the task role, which the application code uses."
   ]
  ],
  "tip": "Existing Kubernetes skills or portability: EKS. Simplest AWS-native orchestration: ECS. No servers to manage: Fargate. Need GPUs, host-level control or Reserved pricing on hosts: EC2 launch type. App needs AWS access: task role; agent needs to pull images: execution role.",
  "check": [
   [
    "Which ECS role does application code use to read from DynamoDB?",
    "The task role. The task execution role is for the ECS agent to pull images, fetch secrets and send logs."
   ],
   [
    "What is the main operational difference between Fargate and the EC2 launch type?",
    "With Fargate AWS manages the underlying hosts; with EC2 you provision, patch and scale the container instances yourself."
   ],
   [
    "How should an EKS pod get permission to call S3 without sharing the node's role?",
    "Use IAM roles for service accounts or EKS Pod Identity to map a dedicated IAM role to the pod's service account."
   ],
   [
    "A fault-tolerant batch container should run as cheaply as possible without managing hosts. What fits?",
    "ECS tasks on Fargate Spot, which is discounted, interruptible Fargate capacity."
   ]
  ]
 },
 {
  "t": "Relational database resilience: RDS Multi-AZ, read replicas, Aurora replicas and Aurora Global Database",
  "hook": "It is the last day of the month at Northgate Learning, and two problems land on your desk within an hour. First, the finance team's reporting dashboard is making the course enrollment database crawl, and students are timing out at checkout. Second, the compliance officer, Mrs. Okafor, forwards a new rule: the platform must recover from the loss of an entire AWS Region within minutes, losing almost no data. A colleague says, 'Just turn on Multi-AZ, that fixes everything.' You are fairly sure it fixes neither problem. Which database feature solves slow reads, which solves a failed server, and which solves a lost Region?",
  "simple": "A database is where an app keeps its important records, like a school's filing cabinet. There are three different worries. What if the cabinet breaks? Keep an exact twin in the next building that takes over automatically; that is Multi-AZ. What if too many people want to read files at once? Make extra photocopies for readers, updated a moment later; those are read replicas. What if the whole city has a disaster? Keep a copy in another city that can take over quickly; that is a cross-Region copy such as Aurora Global Database. Each tool solves one worry. The twin in the next building does not help readers, and the photocopies do not take over by themselves in standard RDS.",
  "body": [
   "Amazon Relational Database Service (RDS) runs managed relational databases: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server and Db2, plus Amazon Aurora. AWS handles provisioning, patching, automated backups with point-in-time restore, and failover. The exam tests which feature solves availability, which solves read scaling, and which solves Regional disaster recovery, because they are easy to mix up and the wrong one often sounds reasonable. Keep three questions in mind for every scenario: what happens when the primary fails, where read traffic goes, and what happens when a whole Region fails.",
   "RDS Multi-AZ is for high availability. In the classic Multi-AZ DB instance deployment, RDS keeps a standby in another Availability Zone (AZ) with synchronous replication, so every committed write is on both copies before the application gets its acknowledgment. The standby does not serve reads; it exists only to take over. If the primary fails, its AZ has an outage, or during some maintenance, RDS fails over automatically by pointing the database endpoint's Domain Name System (DNS) name at the standby, usually within a minute or two, so applications reconnect to the same endpoint with no configuration change. Applications should retry connections, because existing connections drop during failover. The newer Multi-AZ DB cluster deployment, for MySQL and PostgreSQL, has two readable standbys in different AZs and typically faster failover.",
   "Read replicas are for read scaling. RDS copies changes asynchronously to one or more replicas, each with its own endpoint, so you direct reporting and read-heavy queries there, and your application must know which endpoint to use. Because replication is asynchronous, replicas can lag slightly behind the primary, so read-after-write queries, such as showing a user the profile they just saved, should go to the primary. Replicas can be in the same AZ, another AZ or another Region. A cross-Region replica also serves as a disaster recovery copy that you can manually promote to a standalone database. Promotion is not automatic, and it breaks replication, so the old primary and the promoted replica become separate databases. A replica can itself be Multi-AZ.",
   "Amazon Aurora, compatible with MySQL and PostgreSQL, has a different architecture that blurs some of these lines. The cluster volume stores six copies of your data across three AZs and heals itself, and up to 15 Aurora Replicas share that storage instead of each keeping its own copy, so replica lag is typically very low. The cluster endpoint always points to the writer; the reader endpoint load-balances connections across replicas. Replicas are also failover targets: if the writer fails, Aurora promotes a replica automatically, based on the priority tiers you set, and the cluster endpoint follows. So in Aurora, replicas give both read scaling and high availability. Aurora Serverless adds automatic capacity scaling for variable workloads, and Aurora Auto Scaling can add or remove replicas based on load.",
   "Aurora Global Database extends a cluster across Regions. One primary Region handles writes, and secondary Regions receive storage-level replication with typical lag under a second. Secondary clusters serve low-latency local reads for users near them and can be promoted during a Regional outage, giving a recovery point objective (RPO), the amount of data you might lose, of seconds and a recovery time objective (RTO), the time to restore service, of around a minute. A managed switchover moves the primary Region with no data loss for planned events such as a Regional rotation drill. That makes it the usual answer for a relational database that must survive a Regional failure with minimal data loss.",
   "A simple way to keep these straight is to ask what each copy is for. A classic Multi-AZ standby is for surviving failure and nothing else. A read replica is for reading and, if you choose, for manual disaster recovery. An Aurora Replica is for both reading and automatic failover inside one Region. A Global Database secondary is for reading near distant users and for surviving the loss of a Region. When a question lists several requirements at once, look for the single feature that covers them all.",
   "Consider a worked example. A reporting dashboard slows down the order database at month end. The team adds two read replicas and points the reporting tool at their endpoints, which fixes performance without touching the primary. Separately, it enables Multi-AZ on the primary so that a hardware failure causes an automatic failover instead of an outage. Later, a new business rule requires recovery from a Region failure within minutes with almost no data loss, and the team migrates to Aurora with a Global Database secondary in another Region, using the reader endpoint for reports.",
   "The exam's clue words are dependable. 'High availability', 'automatic failover' or 'survive an AZ failure' points to Multi-AZ. 'Read-heavy', 'reporting queries slow the database' or 'offload reads' points to read replicas. 'Both read scaling and fast automatic failover with up to 15 replicas' points to Aurora Replicas. 'Cross-Region disaster recovery with RPO of seconds' or 'low-latency global reads for a relational database' points to Aurora Global Database."
  ],
  "analogy": "Picture a hospital's main pharmacist. Multi-AZ is a fully briefed deputy in the next room who takes over the instant the pharmacist collapses, but never fills prescriptions while the main pharmacist is working. Read replicas are assistants at extra counters answering 'is this in stock' questions from a list updated every few moments, so their answers can be slightly behind. Aurora Replicas are assistants who also step up as the new head pharmacist automatically. Global Database is a sister hospital in another city with a near-live copy of the records. The analogy fails on speed: database replicas usually lag by far less than any human handover.",
  "terms": [
   [
    "Multi-AZ deployment",
    "An RDS configuration with a synchronously replicated standby in another AZ and automatic failover."
   ],
   [
    "Read replica",
    "An asynchronously replicated copy of a database used to offload reads; can be promoted manually."
   ],
   [
    "Replica lag",
    "The delay between a write on the primary and its appearance on an asynchronous replica."
   ],
   [
    "Aurora Replica",
    "A reader instance sharing the Aurora cluster volume that serves reads and is an automatic failover target."
   ],
   [
    "Reader endpoint",
    "An Aurora endpoint that load-balances read connections across the cluster's replicas."
   ],
   [
    "Cluster endpoint",
    "The Aurora endpoint that always points to the current writer instance."
   ],
   [
    "Aurora Global Database",
    "An Aurora configuration that replicates a cluster to secondary Regions with typically sub-second lag."
   ]
  ],
  "example": "An online learning company runs PostgreSQL on a single RDS instance. An AZ outage takes the site down for hours, and exam-week traffic makes queries slow. The team enables Multi-AZ for automatic failover, adds read replicas for the course catalog's read-heavy queries, and routes those queries through a separate reader connection string in the application. The next AZ disruption causes a failover of about a minute instead of an outage.",
  "mistakes": [
   [
    "Enable Multi-AZ to fix slow read queries.",
    "The classic Multi-AZ standby serves no reads; it only improves availability. Offload reads to read replicas (or use Aurora Replicas or a Multi-AZ DB cluster with readable standbys)."
   ],
   [
    "An RDS read replica takes over automatically when the primary fails.",
    "In RDS, promoting a read replica is a manual action that ends replication. Automatic failover comes from Multi-AZ, or from Aurora Replicas in Aurora."
   ],
   [
    "Send every query, including just-saved data, to the replicas.",
    "Replication to read replicas is asynchronous, so a user may not see a change they just made. Send read-after-write queries to the primary."
   ],
   [
    "Cross-Region read replicas are the best fit for an RPO of seconds and an RTO of about a minute.",
    "They can work for DR, but promotion is manual and slower. Aurora Global Database is designed for that requirement, with typical sub-second replication and fast promotion."
   ]
  ],
  "tryit": [
   [
    "Bayside Credit Union runs MySQL on RDS in one AZ. Members complain that the mobile app is slow every morning when branch reports run, and last quarter an AZ problem caused a two-hour outage. The budget allows changes within one Region only for now. What two changes would you make, and what would you tell the developers about where to send queries?",
    "Enable Multi-AZ so the database fails over automatically to a standby in another AZ, and add one or more read replicas for the branch reports. Tell developers to point reporting queries at the replica endpoints but keep writes and read-after-write queries on the primary endpoint, because replica data can lag slightly. Alternatively, migrating to Aurora would let Aurora Replicas provide both read scaling and automatic failover."
   ]
  ],
  "tip": "Multi-AZ equals availability, not performance; the classic standby cannot serve reads. Read replicas equal read performance, with asynchronous replication and manual promotion. Aurora Replicas give both. Cross-Region relational DR with RPO of seconds equals Aurora Global Database.",
  "check": [
   [
    "Can you send read queries to the standby in a classic RDS Multi-AZ instance deployment?",
    "No. The standby exists only for failover. Use read replicas (or a Multi-AZ DB cluster with readable standbys) for reads."
   ],
   [
    "What happens to an Aurora cluster when its writer instance fails?",
    "Aurora automatically promotes an Aurora Replica to be the new writer, and the cluster endpoint points to it."
   ],
   [
    "Is an RDS read replica promoted automatically when the primary fails?",
    "No. Promotion is a manual action that makes the replica a standalone database and ends replication."
   ],
   [
    "Why might a user not see an update right after saving it when reads go to a replica?",
    "Replication to read replicas is asynchronous, so a short lag can exist; read-after-write queries should go to the primary."
   ],
   [
    "How many copies of data does an Aurora cluster volume keep, and where?",
    "Six copies across three Availability Zones."
   ]
  ]
 },
 {
  "t": "DynamoDB resilience: global tables, point-in-time recovery and on-demand backups",
  "hook": "At 2:20 p.m. Jonah at Starfall Games deploys a hotfix to the player-inventory service. By 2:35 the support queue is flooded: players in Europe and North America report swords, skins and coins vanishing. The bug overwrote thousands of items. Someone in the incident channel says, 'No problem, the table is a global table in two Regions, just read from the other one.' You check the other Region. The damage is there too, every bit of it, replicated within seconds. The clock is running and players are posting screenshots. What actually lets you get the data back, and what was the global table really protecting you from?",
  "simple": "DynamoDB is a fast AWS database that already keeps copies of your data in several separate buildings in the same area, so one building failing does not lose anything. Two other worries remain. First, what if the whole area has a problem? Global tables keep live copies in other parts of the world that users can read and write. Second, what if someone deletes or ruins data by mistake? Copies do not help, because the mistake is copied too, like a typo you paste into every version of a document. For that you need backups you can rewind to, which is point-in-time recovery, or saved snapshots you keep for years, which are on-demand backups.",
  "body": [
   "Amazon DynamoDB is a fully managed, serverless key-value and document database that delivers consistent single-digit millisecond performance at almost any scale. Resilience is built in: every table's data is automatically replicated across multiple Availability Zones (AZs) in its Region, so you do not configure Multi-AZ as you do with Amazon Relational Database Service (RDS). What you do choose is how to handle two other risks: a whole-Region problem, and data being corrupted or deleted by people or bugs. Those two risks need different tools, and confusing them is the most common exam trap.",
   "Global tables handle Regional resilience and global latency. You add replica Regions to a table, and DynamoDB replicates changes among them, typically within a second or so. Every replica accepts reads and writes (active-active), so users in each Region get local latency and an application can keep running in another Region if one becomes unavailable. By default replication is asynchronous, and when the same item is written in two Regions at almost the same time, conflicts are resolved by last writer wins; a newer multi-Region strong consistency option exists for workloads that cannot accept that. Global tables use DynamoDB Streams to replicate changes.",
   "Designing around global tables takes a little care. Because each Region holds a full writable copy, pair global tables with Amazon Route 53 latency or failover routing so users reach the nearest healthy Region. Design the application so a user's writes normally go to one Region, for example the Region the user is routed to, which keeps conflicting writes rare. And remember what global tables do not do: they copy every change, good or bad, as quickly as they can.",
   "That is why replication does not protect you from bad writes. A mistaken delete or corrupt update replicates everywhere just as quickly as a correct one. For that you need backups. Point-in-time recovery (PITR), once enabled, keeps continuous backups and lets you restore the table to any second within its recovery window, which can be up to 35 days. On-demand backups are full backups you take manually or on a schedule and keep until you delete them, useful for long-term retention and compliance. Neither kind of backup consumes table capacity or affects performance, and both are taken without any downtime, so there is little reason not to enable PITR on every production table. PITR cannot recover changes from before it was turned on, so enabling it after an incident is too late for that incident.",
   "```\naws dynamodb update-continuous-backups --table-name Orders \\\n  --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true\n```",
   "Restores have rules you must plan around. Restores always create a new table; they never overwrite the existing one. After a restore, you must reconfigure some settings on the new table, such as auto scaling policies, AWS Identity and Access Management (IAM) policies, Amazon CloudWatch alarms, tags, Streams and Time to Live (TTL) settings, and either point your application at it or copy the correct items back. AWS Backup can also manage DynamoDB backups centrally, adding cross-Region and cross-account copies, lifecycle to cold storage and Vault Lock for immutability. You can also export a table to Amazon Simple Storage Service (S3) from PITR data for analytics without affecting the table. Two related features matter for recovery and auditing: DynamoDB Streams captures item-level changes for 24 hours, which AWS Lambda can process for audit trails, and TTL deletes expired items automatically, so TTL deletions are expected rather than an incident.",
   "Consider a worked example. A bug in a release overwrote thousands of customer profiles at 14:05. Because PITR was enabled, the team restored the table as of 14:04 to a new table, compared the two, and wrote a short script that copied the correct items back into the live table, so the application never changed its table name. The same table is a global table in two Regions so the customer app stays available if one Region has an outage, and a weekly on-demand backup is copied to a separate account by AWS Backup for long-term retention. Each tool covers a different risk, and together they cover the three the exam cares about.",
   "Exam wording separates the tools clearly. 'Multi-Region', 'active-active', 'low-latency reads and writes for global users' or 'survive a Regional outage' points to global tables. 'Restore to a specific second' or 'accidental delete or corruption in the last days' points to point-in-time recovery. 'Keep backups for years', 'compliance archive' or 'cross-account backup copies' points to on-demand backups or AWS Backup. 'Process every item change' points to DynamoDB Streams, and 'Multi-AZ for DynamoDB' is a distractor, because it is already built in."
  ],
  "analogy": "Global tables are like a shared online document open in several offices: everyone can edit their local view, and changes appear everywhere almost at once. That is great if one office loses power, but if someone deletes a paragraph, every office loses it. Point-in-time recovery is the document's version history, letting you rewind to the exact minute before the mistake. On-demand backups are printed copies filed away for years. The analogy stops at restores: DynamoDB restores never roll back the live table; they always create a new one.",
  "terms": [
   [
    "Global table",
    "A DynamoDB table replicated across multiple Regions, with every replica accepting reads and writes."
   ],
   [
    "Last writer wins",
    "The default conflict resolution rule in global tables where the most recent write to an item prevails."
   ],
   [
    "Point-in-time recovery (PITR)",
    "Continuous DynamoDB backups allowing restore to any second in the recovery window of up to 35 days."
   ],
   [
    "On-demand backup",
    "A full, manually created DynamoDB backup retained until you delete it."
   ],
   [
    "DynamoDB Streams",
    "A time-ordered log of item-level changes kept for 24 hours for processing by consumers such as Lambda."
   ],
   [
    "Time to Live (TTL)",
    "A DynamoDB feature that automatically deletes items after a timestamp attribute expires."
   ],
   [
    "AWS Backup",
    "A central service that can schedule DynamoDB backups and copy them across Regions and accounts."
   ]
  ],
  "example": "A mobile game stores player inventories in DynamoDB. Players in Europe and North America complained about latency, and an outage in one Region once stopped all play. The team converts the table into a global table with replicas in two Regions and routes players to the nearest Region with Route 53 latency routing. It also enables PITR, because a cheat exploit once corrupted items and replication spread the damage to every Region within seconds.",
  "mistakes": [
   [
    "Global tables protect against accidental deletion because another Region has a copy.",
    "Deletes and corrupt writes replicate to every Region within seconds. Recovery from mistakes needs PITR, on-demand backups or AWS Backup."
   ],
   [
    "A restore rolls the existing table back in place.",
    "Restores always create a new table. You reconfigure settings such as auto scaling, alarms, tags, Streams and TTL, then repoint the app or copy items back."
   ],
   [
    "Enable PITR after the incident and restore to before it.",
    "PITR only covers changes after it was enabled, within its recovery window. Turn it on before you need it."
   ],
   [
    "Configure Multi-AZ on a DynamoDB table for high availability.",
    "DynamoDB already replicates every table across multiple AZs in its Region. There is no Multi-AZ setting to add."
   ]
  ],
  "tryit": [
   [
    "Fernwood Pet Clinics stores appointment records in a DynamoDB table in one Region. Auditors require backups kept for seven years in a separate account, the business wants to undo accidental bulk edits from the last few days, and a new location overseas needs low-latency writes. Which three features would you use, and why does no single one cover everything?",
    "Use on-demand backups managed by AWS Backup with copies to another account for seven-year retention; enable point-in-time recovery to restore to the second before a bulk edit within its window of up to 35 days; and add a global table replica in a Region near the new location for local reads and writes. Global tables copy mistakes, PITR keeps only a limited window, and on-demand backups cannot restore to an arbitrary second, so each covers a different risk."
   ]
  ],
  "tip": "Replication is not backup: global tables copy mistakes too. For recovering from accidental deletion or corruption to an exact moment, choose point-in-time recovery; restores always go to a new table. For years of retention or cross-account copies, use on-demand backups with AWS Backup.",
  "check": [
   [
    "An engineer accidentally deleted items 10 minutes ago. The table is a global table in three Regions. Can another Region's replica help?",
    "No. The deletes replicated to every Region. Restore with point-in-time recovery or a backup instead."
   ],
   [
    "Does a DynamoDB restore overwrite the source table?",
    "No. Restores always create a new table, which you then configure and point the application at or copy items from."
   ],
   [
    "Do you need to configure Multi-AZ for a DynamoDB table?",
    "No. DynamoDB automatically replicates data across multiple AZs in its Region."
   ],
   [
    "Which option keeps DynamoDB backups for several years for compliance?",
    "On-demand backups, optionally managed and copied by AWS Backup, which are retained until deleted."
   ],
   [
    "How are simultaneous writes to the same item in two Regions resolved by default in a global table?",
    "Last writer wins."
   ]
  ]
 },
 {
  "t": "Route 53 routing policies and health checks: failover, weighted, latency, geolocation and multivalue",
  "hook": "Lumen Streaming has just signed a deal to show a film festival, but only to viewers in three countries. The same week, its US deployment goes down for twenty minutes and European viewers barely notice while American viewers stare at errors. Rosa, the product manager, wants two things by Monday: send everyone to the fastest healthy deployment, and make sure viewers outside the licensed countries see a polite 'not available here' page instead of the films. Your teammate suggests latency-based routing for both. You suspect that would quietly break the licensing deal. Which DNS routing choices would you make, and why do they behave so differently?",
  "simple": "When you type a website name, your device asks DNS, the internet's address book, which server address to use. Route 53 is AWS's version of that address book, but a smart one. It can give different people different answers: the closest server for speed, a backup server when the main one is broken, a certain share of people to a new version, or a server chosen by which country you are in. It also checks whether servers are healthy and stops handing out addresses that do not work. Think of a hotel front desk that sends guests to whichever entrance is open and nearest, and sends guests from certain places to a special lounge.",
  "body": [
   "Amazon Route 53 is AWS's Domain Name System (DNS) service. It registers domains, hosts public and private hosted zones, and answers DNS queries from a global network, backed by a 100 percent availability service level agreement (SLA). What makes it an architecture tool rather than just a phone book is its routing policies, which decide which answer a resolver gets, and its health checks, which remove unhealthy endpoints from those answers. Together they let you steer users between Availability Zones, Regions and even clouds or on-premises data centers.",
   "Records come in the usual DNS types, such as A (an IPv4 address), AAAA (an IPv6 address), CNAME (an alias to another name) and MX (mail servers), plus alias records, a Route 53 extension. An alias record points a name at an AWS resource, such as an Application Load Balancer (ALB), Amazon CloudFront distribution, Amazon API Gateway API, Amazon Simple Storage Service (S3) website endpoint or another record in the same zone, and works at the zone apex (for example `example.com` itself), which a CNAME cannot. Alias targets update automatically when the resource's IP addresses change, and queries to alias records pointing at AWS resources are not charged.",
   "Several routing policies cover simple and resilience cases. Simple routing returns one record set, with no health checks. Failover routing sets up active-passive: the primary record is returned while its health check passes; if it fails, Route 53 returns the secondary, which is often a static S3 website or a standby Region. Weighted routing splits traffic by relative weight, such as 90 and 10, useful for canary releases, blue/green deployments and gradual migrations; a weight of zero stops traffic to a record without deleting it. Multivalue answer routing returns up to eight healthy records at random, a simple form of client-side load balancing that is not a replacement for a load balancer.",
   "Other policies choose by where the user is or how fast their path is, and this is where exam distractors live. Latency-based routing returns the endpoint in the AWS Region with the lowest measured latency from the user's network, which is about speed, not borders. Geolocation routing answers based on the user's continent, country or US state, useful for localization, content rights and legal restrictions; add a default record for locations you do not match, or some users get no answer. Geoproximity routing, set up with traffic flow, routes by distance and lets you shift traffic toward or away from a location with a bias. IP-based routing chooses by the client's source network, expressed as Classless Inter-Domain Routing (CIDR) blocks, which suits cases where you know which networks your users come from.",
   "Health checks make routing resilient. They can monitor an endpoint by IP address or domain name over HTTP, HTTPS or TCP from checkers in several locations, optionally looking for a string in the response body. Calculated health checks combine other checks with AND and OR logic, and health checks can also follow an Amazon CloudWatch alarm, which is how you monitor resources in private subnets that the internet-based checkers cannot reach. For alias records pointing at AWS resources such as an ALB, you can instead set Evaluate target health, so Route 53 uses the resource's own health. Remember that DNS answers are cached by resolvers for the record's time to live (TTL), so failover is not instant; lower TTLs speed changes at the cost of more queries.",
   "```\nwww.example.com  A  ALIAS  alb-use1...  Latency: us-east-1   Health check: hc-use1\nwww.example.com  A  ALIAS  alb-euc1...  Latency: eu-central-1 Health check: hc-euc1\n```",
   "Consider a worked example. A company runs its app in two Regions. It uses latency-based alias records, like the two above, so European users reach the Frankfurt deployment and US users reach Virginia, with Evaluate target health on each ALB. When the Virginia deployment fails, Route 53 stops returning it and all users are sent to Frankfurt until it recovers, slowed only by resolvers holding cached answers until the TTL expires. For a separate video service with licensing limits, it uses geolocation routing so viewers in licensed countries reach the service and a default record returns a page explaining that the content is unavailable elsewhere. Policies can also be nested, for example failover between Regions with weighted records inside each.",
   "Exam clues map directly to policies. 'Restrict or localize content by country' points to geolocation. 'Best performance for users in many Regions' points to latency. 'Send 10 percent of traffic to the new version' points to weighted. 'Active-passive disaster recovery' or 'maintenance page when the site is down' points to failover. 'Return several healthy IPs' points to multivalue. 'Point the zone apex at an ALB or CloudFront' points to an alias record, and 'health check a private resource' points to a CloudWatch alarm-based health check."
  ],
  "analogy": "Route 53 is like a concierge answering 'where should I go?' at a large convention center. For speed, the concierge points you to the least crowded entrance (latency). For rules, the concierge checks your badge country and sends you to your national pavilion (geolocation), with a general hall for everyone else (default record). During a test, one visitor in ten goes to the new hall (weighted). The analogy breaks on caching: real visitors ask fresh each time, but DNS resolvers remember the last answer until the TTL expires.",
  "terms": [
   [
    "Hosted zone",
    "A Route 53 container for the DNS records of a domain, either public or private to VPCs."
   ],
   [
    "Alias record",
    "A Route 53 record that points to an AWS resource, works at the zone apex and has no query charge for AWS targets."
   ],
   [
    "Failover routing",
    "An active-passive policy returning the secondary record only when the primary's health check fails."
   ],
   [
    "Weighted routing",
    "A policy that splits DNS answers among records in proportion to assigned weights."
   ],
   [
    "Latency-based routing",
    "A policy that returns the endpoint in the Region with the lowest latency for the user."
   ],
   [
    "Geolocation routing",
    "A policy that returns answers based on the user's geographic location."
   ],
   [
    "Multivalue answer routing",
    "A policy that returns up to eight healthy records chosen at random."
   ],
   [
    "Evaluate target health",
    "An alias record setting that makes Route 53 use the target AWS resource's own health instead of a separate health check."
   ]
  ],
  "example": "An online retailer is migrating from an on-premises data center to AWS. It creates weighted records for `shop.example.com`: weight 95 to the data center's IP and 5 to the new ALB, each with a health check. Over two weeks it shifts the weights to 50/50 and then 0/100 while watching error rates, and it keeps a low TTL during the migration so each change takes effect quickly.",
  "mistakes": [
   [
    "Use latency-based routing to keep content inside licensed countries.",
    "Latency routing optimizes speed and can send a user across a border. Legal or content restrictions by location need geolocation routing, with a default record."
   ],
   [
    "Create a CNAME for the bare domain pointing at the ALB.",
    "DNS does not allow a CNAME at the zone apex. Use a Route 53 alias record, which also costs nothing to query for AWS targets."
   ],
   [
    "Configure failover routing without health checks.",
    "Failover depends on the primary's health status. Without a health check (or Evaluate target health), Route 53 never switches to the secondary."
   ],
   [
    "Expect failover to be instant.",
    "Resolvers cache answers for the record's TTL. Lower the TTL if faster changeover matters, accepting more queries."
   ]
  ],
  "tryit": [
   [
    "Quarry Hill Bank runs its online banking portal in one Region, with a static 'we will be right back' page hosted in S3. The portal's database sits in private subnets, and the team wants DNS to switch to the static page if the database becomes unhealthy, not just the web servers. How would you configure Route 53?",
    "Use failover routing: the primary record is an alias to the portal's ALB and the secondary is the S3 static website. Because the database is private, internet-based checkers cannot reach it, so create a CloudWatch alarm on a database health metric and a Route 53 health check based on that alarm, combined with a check on the ALB using a calculated health check if both must be healthy. Keep the TTL low so the switch takes effect quickly."
   ]
  ],
  "tip": "Content must be restricted or localized by country: geolocation, not latency. Best performance for users: latency. Canary or percentage split: weighted. Active-passive DR: failover. Several healthy IPs: multivalue. The zone apex pointing at an ALB: an alias record.",
  "check": [
   [
    "Why can't you use a CNAME for example.com pointing to an ALB?",
    "DNS does not allow a CNAME at the zone apex. Use a Route 53 alias record instead."
   ],
   [
    "How can Route 53 health-check a resource that has only a private IP?",
    "Create a CloudWatch alarm on a metric for the resource and base the Route 53 health check on that alarm."
   ],
   [
    "Users in an unlisted country get no DNS answer under geolocation routing. What is missing?",
    "A default geolocation record that answers for locations not matched by any other record."
   ],
   [
    "Failover routing is configured, but users keep reaching the failed primary for several minutes. Why?",
    "Resolvers cache the old answer for the record's TTL; a lower TTL shortens how long the stale answer is used."
   ],
   [
    "Which policy would you use to send 10 percent of users to a new version?",
    "Weighted routing, with weights such as 90 and 10."
   ]
  ]
 },
 {
  "t": "Disaster recovery strategies: backup and restore, pilot light, warm standby and multi-site active-active, matched to RPO and RTO",
  "hook": "The quarterly risk meeting at Granite State Mutual is about to start, and the chief financial officer, Mr. Delgado, has one slide: last year's cloud bill. Beside it, the head of operations has another: a proposal to run every system in two Regions at full size, just in case. Delgado asks you, the new architect, a direct question. 'Does the cafeteria menu system really need the same disaster plan as online payments?' Everyone turns to look. You know the answer is no, but you need a way to explain how much downtime and data loss each system can tolerate, and what each level of protection costs. How do you decide?",
  "simple": "Disaster recovery is the plan for getting a system working again after something big goes wrong, like a whole AWS area going offline. Two questions guide the plan. How much recent work can we afford to lose? That is the recovery point objective. How long can we be offline? That is the recovery time objective. Cheaper plans recover slowly; faster plans cost more because more is running all the time. Think of a spare house key. You could keep a copy of the key at a friend's house across town (slow but cheap), or keep a second fully furnished apartment with the lights on (instant but expensive). Most things fall somewhere in between.",
  "body": [
   "Disaster recovery (DR) is the plan for getting a workload running again after a major event, such as a Region-wide outage, widespread data corruption or a ransomware attack. It differs from high availability, which handles smaller failures like a lost instance or Availability Zone within a Region. Two numbers drive every DR decision. The recovery point objective (RPO) is how much data, measured in time, the business can afford to lose: an RPO of one hour means you can lose at most the last hour of changes. The recovery time objective (RTO) is how long the workload can be down before service is restored. Lower RPO and RTO cost more, so you match the strategy to the business need rather than always choosing the most resilient option.",
   "AWS describes four strategies, from cheapest and slowest to most expensive and fastest. Backup and restore keeps backups, such as Amazon Elastic Block Store (EBS) snapshots, Amazon Relational Database Service (RDS) snapshots, Amazon DynamoDB backups and Amazon Simple Storage Service (S3) copies, in the recovery Region. In a disaster you redeploy infrastructure, ideally from infrastructure as code (IaC) such as AWS CloudFormation, restore the data, and switch Domain Name System (DNS) records to the new environment. RPO is the time since the last backup and RTO is typically hours, because everything must be built and loaded before users return; cost is lowest because almost nothing runs in the recovery Region.",
   "Pilot light keeps the core data live in the recovery Region, for example a cross-Region database replica and S3 buckets with Cross-Region Replication, while application servers are switched off or not yet created. Amazon Machine Images (AMIs) and templates are ready. The name comes from a gas furnace's small flame that stays lit so the full burner can ignite quickly. In a disaster you promote the database, start or deploy the application tier, scale it up and switch DNS. RPO is minutes or seconds because data is replicating continuously; RTO is tens of minutes because servers still have to start.",
   "Warm standby runs a complete but scaled-down copy of the whole workload in the recovery Region, able to handle some traffic immediately. In a disaster you scale it to full size, promote the database if needed and shift traffic. RTO is minutes. Because the stack is already running, you can test it continuously with a small share of real traffic, which makes it more dependable than pilot light, where problems in the application tier may only surface during a disaster.",
   "Multi-site active-active runs full production in two or more Regions at the same time, with Amazon Route 53 or AWS Global Accelerator sending users to each and data replicated with services such as Amazon Aurora Global Database or DynamoDB global tables. Losing a Region means the others absorb its traffic; RPO and RTO approach zero, and cost and complexity are highest, because the application must cope with data written in more than one place. A variant called hot standby runs full capacity in the second Region but serves traffic only from the primary.",
   "The key distinction between pilot light and warm standby is whether the application tier is running. In pilot light only data services are live; in warm standby everything is live, just smaller. Between warm standby and active-active, the distinction is whether the second site serves production traffic at full scale all the time. Whatever you choose, test failover regularly with game days, automate the runbook, and check that service quotas and AMIs exist in the recovery Region. Remember too that replication alone does not protect against corruption or ransomware, because bad writes replicate too; you still need point-in-time backups, ideally immutable ones.",
   "Consider a worked example. An internal HR system can be down for a day and lose a few hours of data, so it uses backup and restore, with AWS Backup copying snapshots to a second Region every four hours and a CloudFormation template ready to rebuild the stack. The customer checkout system must be back in under 10 minutes with almost no data loss, so it runs a warm standby: an Aurora Global Database secondary that can be promoted, a small Auto Scaling group already serving a few percent of traffic through weighted Route 53 records, and a runbook that raises the group's capacity and shifts the weights. Each system's cost matches its business value, which is the point the exam wants you to make.",
   "Exam questions translate numbers and adjectives into strategies. 'Lowest cost' with 'RTO of hours' or 'a day' points to backup and restore. 'Core database replicated, servers off' or 'RTO of tens of minutes at low cost' points to pilot light. 'Scaled-down but fully functional copy' or 'RTO of minutes' points to warm standby. 'Near-zero RTO and RPO' or 'users served from multiple Regions at all times' points to multi-site active-active."
  ],
  "analogy": "Think of a theater company preparing for a lead actor falling ill. Backup and restore is having the script on file: you could hire and rehearse someone, but the show is dark for days. Pilot light is an understudy who knows the lines but has no costume or set ready. Warm standby is an understudy already performing a smaller role each night, ready to step up. Active-active is two full casts performing in two cities at once. The analogy stops at data: in DR, the script itself (your data) must also be copied continuously, or even the best understudy has nothing current to perform.",
  "mnemonic": "From cheapest and slowest to costliest and fastest: Backup and restore, Pilot light, Warm standby, Multi-site active-active. Remember 'Bring Pizza, Warm Muffins'.",
  "terms": [
   [
    "Disaster recovery",
    "The strategy and processes for restoring a workload after a major event such as a Regional outage."
   ],
   [
    "RPO",
    "Recovery point objective: the maximum acceptable data loss, measured as time before the disaster."
   ],
   [
    "RTO",
    "Recovery time objective: the maximum acceptable time to restore service after a disaster."
   ],
   [
    "Backup and restore",
    "The lowest-cost DR strategy, which restores data and rebuilds infrastructure only after a disaster."
   ],
   [
    "Pilot light",
    "A DR strategy that keeps data replicated in the recovery Region with the application tier off until needed."
   ],
   [
    "Warm standby",
    "A DR strategy that runs a scaled-down but fully functional copy of the workload in the recovery Region."
   ],
   [
    "Multi-site active-active",
    "A DR strategy that serves production traffic from multiple Regions at full scale simultaneously."
   ],
   [
    "Game day",
    "A planned exercise that simulates a failure to test recovery procedures and people."
   ]
  ],
  "example": "A regional bank's online banking must recover from a Region failure within 30 minutes with no more than a few seconds of data loss, but the budget rules out running two full stacks. The architect chooses pilot light: an Aurora Global Database secondary and replicated S3 buckets run in the second Region, while the application tier exists only as launch templates and CloudFormation stacks with an Auto Scaling group set to zero. A quarterly drill promotes the database, scales the group and switches Route 53 in about 20 minutes.",
  "mistakes": [
   [
    "Confusing RPO with RTO.",
    "RPO is data loss measured in time (how far back you restore). RTO is downtime (how long until service returns)."
   ],
   [
    "Calling a design pilot light when application servers are running at reduced size.",
    "If the full stack runs, even small, it is warm standby. Pilot light keeps only the data tier live."
   ],
   [
    "Choosing multi-site active-active for every workload to be safe.",
    "It has the highest cost and complexity. Match the strategy to each workload's RPO and RTO; many systems are fine with backup and restore."
   ],
   [
    "Assuming cross-Region replication is a complete DR plan.",
    "Corruption and ransomware replicate too. Keep point-in-time, preferably immutable, backups, and test failover so missing quotas, AMIs or permissions surface before a real disaster."
   ]
  ],
  "tryit": [
   [
    "Elmwood Hospital has three systems. The cafeteria menu can be down for a day and lose a day of changes. The appointment portal must return within about 30 minutes, losing no more than a minute of data, on a tight budget. The emergency department's patient tracker must keep working through a Regional outage with essentially no downtime. Which DR strategy fits each?",
    "Cafeteria menu: backup and restore, the cheapest, with RTO and RPO measured in hours. Appointment portal: pilot light, with the database replicating continuously (low RPO) and the application tier started during recovery (RTO in tens of minutes); warm standby would also meet it at higher cost. Patient tracker: multi-site active-active, because near-zero RTO and RPO justify full capacity in two Regions."
   ]
  ],
  "tip": "Match wording to strategy: lowest cost and hours of RTO is backup and restore; core database running but servers off is pilot light; scaled-down but fully working copy is warm standby; near-zero RTO and RPO is multi-site active-active.",
  "check": [
   [
    "A workload needs RTO under 15 minutes at moderate cost, with the whole stack able to take some traffic immediately. Which strategy?",
    "Warm standby: a scaled-down, fully running copy that you scale up during a disaster."
   ],
   [
    "What is the difference between RPO and RTO?",
    "RPO is how much data (in time) you can lose; RTO is how long the service can be down."
   ],
   [
    "What distinguishes pilot light from warm standby?",
    "In pilot light only the data tier runs in the recovery Region; in warm standby the whole stack runs at reduced capacity."
   ],
   [
    "Why is cross-Region replication alone not a complete DR plan against ransomware?",
    "Corrupted or encrypted data replicates too, so you also need point-in-time, preferably immutable, backups."
   ]
  ]
 },
 {
  "t": "Backup and replication: AWS Backup plans, S3 Cross-Region Replication, EBS snapshot and AMI copies, AWS Elastic Disaster Recovery",
  "hook": "The auditor from the state insurance board sits across from you at Cedar Valley Health with a short checklist. Show me daily backups of every production database and file system. Show me copies in a second Region. Show me that nobody, not even your administrators, can delete them early. Then she asks the hardest one: if your data center floods tonight, how fast are those twenty on-premises servers running again? Your team has a folder of hand-written scripts, a few snapshot schedules, and an S3 bucket someone set up to replicate last spring. Which AWS tools turn that patchwork into answers you can show her?",
  "simple": "Backing up means keeping extra copies of your data and machines somewhere safe so you can get them back. AWS Backup is like one manager who handles backups for many kinds of AWS storage at once, following a written schedule, and can lock copies so nobody can throw them away early. S3 replication automatically copies new files into another storage bucket, often far away. Snapshots are photos of a disk at a moment, and a machine image is a photo of a whole server you can copy to another area and start from. Elastic Disaster Recovery keeps a live mirror of your servers in AWS so you can switch to it quickly if your own building has a disaster.",
  "body": [
   "Every disaster recovery (DR) strategy depends on copies of data and machine images being in the right place at the right time. AWS gives you service-specific features, such as snapshots and replication, and a central service to manage backups across many services. The exam usually asks you to pick the option that meets a requirement with the least operational effort, so knowing what each tool covers, and what it does not, is the key skill here. Custom scripts are almost never the best answer when a managed feature already does the job.",
   "AWS Backup centralizes backups across many services, including Amazon Elastic Block Store (EBS), Amazon Elastic Compute Cloud (EC2), Amazon Relational Database Service (RDS), Amazon Aurora, Amazon DynamoDB, Amazon Elastic File System (EFS), Amazon FSx, Amazon Simple Storage Service (S3) and AWS Storage Gateway. A backup plan defines rules: how often to back up, the backup window, how long to keep recovery points, when to move them to cold storage, and whether to copy them to another Region or account. Resources are assigned to a plan by tags or resource IDs, so tagging a new database `backup=daily` is enough to protect it, with no one remembering to edit a script. Recovery points are stored in backup vaults, each encrypted with an AWS Key Management Service (KMS) key and protected by an access policy. AWS Backup Vault Lock can make a vault's retention immutable, protecting backups from deletion even by administrators, which matters for ransomware defense. With AWS Organizations, backup policies apply plans across accounts, and Backup Audit Manager reports on compliance.",
   "Amazon S3 Replication copies objects asynchronously to another bucket. Cross-Region Replication (CRR) sends them to a bucket in a different Region, for disaster recovery, compliance or lower latency; Same-Region Replication (SRR) is used for log aggregation or copies between accounts in the same Region. Both require versioning on the source and destination buckets and an AWS Identity and Access Management (IAM) role that S3 uses to replicate, and the destination can use a different storage class or owner. Replication applies to new objects written after the rule is created; existing objects need S3 Batch Replication. Delete markers are not replicated unless you enable it, and permanent deletions of specific versions are never replicated, which protects against malicious deletes. S3 Replication Time Control adds a predictable replication time backed by a service level agreement (SLA).",
   "EBS snapshots are incremental, point-in-time backups of volumes, stored durably by AWS: the first snapshot copies the used blocks and later ones store only changed blocks. You can copy a snapshot to another Region or share it with another account, and encrypt or re-encrypt it during the copy. Snapshots encrypted with the default AWS managed key cannot be shared with other accounts, so cross-account sharing needs a customer managed key whose policy grants the other account access. An Amazon Machine Image (AMI) captures an instance's root and data volume snapshots plus launch settings; AMIs are Regional, so to launch the same server in a recovery Region you copy the AMI there first.",
   "Automation keeps this from becoming a chore. Amazon Data Lifecycle Manager can automate snapshot and AMI creation, retention and cross-Region copies, and the Recycle Bin can recover snapshots or AMIs deleted by mistake within a retention period you set. The command below copies an AMI to a recovery Region and encrypts the copy.",
   "```\naws ec2 copy-image --source-region us-east-1 --source-image-id ami-0abc1234 \\\n  --region us-west-2 --name web-server-dr --encrypted\n```",
   "AWS Elastic Disaster Recovery (AWS DRS) handles whole servers rather than individual backups. It continuously replicates servers, whether physical, virtual or already in the cloud, at the block level into a low-cost staging area in an AWS Region, using a replication agent installed on each source server. During a disaster or a non-disruptive drill it launches full recovery instances within minutes, giving a recovery point objective (RPO) of seconds and a recovery time objective (RTO) of minutes for many workloads, without running full-size servers all the time. After the event it supports failing back to the original site.",
   "Consider a worked example. A company must keep daily backups of all production EBS volumes, RDS databases and EFS file systems for 35 days, with copies in a second Region that nobody can delete, and it must recover 20 on-premises application servers into AWS within an hour. It creates one AWS Backup plan with a copy rule to the other Region, assigns resources by the tag `env=prod`, and enables Vault Lock on the destination vault. It installs the DRS replication agent on the on-premises servers and runs a quarterly drill that launches recovery instances in an isolated virtual private cloud (VPC), so testing never touches production.",
   "Exam clues point clearly. 'Centralized', 'tag-based', 'across many services', 'cross-account backup copies' or 'immutable backups' points to AWS Backup and Vault Lock. 'Automatically copy new S3 objects to another Region' points to CRR, with versioning required. 'Replicate existing objects' points to Batch Replication. 'Same server in another Region' points to AMI copy, and 'continuous block-level replication of on-premises servers with RTO in minutes' points to Elastic Disaster Recovery."
  ],
  "analogy": "Think of protecting a family's important papers. AWS Backup is a filing service that collects documents from every room on a schedule, stores copies in a fireproof safe in another town, and can seal the safe so even you cannot empty it early (Vault Lock). S3 replication is a photocopier that copies each new letter as it arrives, but not the letters already in the drawer. An AMI is a full blueprint of a room you must mail to the other town before you can rebuild it there. Elastic Disaster Recovery is a furnished twin house kept dark but wired, ready to light up within minutes. The analogy stops at deletion: S3 never replicates permanent version deletions.",
  "terms": [
   [
    "AWS Backup",
    "A central service that schedules, retains and copies backups across many AWS services."
   ],
   [
    "Backup plan",
    "An AWS Backup policy defining backup frequency, retention, lifecycle and copy rules for assigned resources."
   ],
   [
    "Vault Lock",
    "An AWS Backup feature that makes a backup vault's retention settings immutable."
   ],
   [
    "Cross-Region Replication",
    "Asynchronous copying of S3 objects to a bucket in another Region; requires versioning on both buckets."
   ],
   [
    "S3 Batch Replication",
    "A feature that replicates objects that existed before a replication rule was created."
   ],
   [
    "EBS snapshot",
    "An incremental, point-in-time backup of an EBS volume that can be copied across Regions and accounts."
   ],
   [
    "AMI",
    "An Amazon Machine Image: a Regional template of snapshots and launch settings used to launch instances."
   ],
   [
    "AWS Elastic Disaster Recovery",
    "A service that continuously replicates servers to AWS and launches recovery instances on demand."
   ]
  ],
  "example": "A media company keeps finished videos in an S3 bucket in one Region and must have a copy in another Region within minutes of upload for a compliance audit. It enables versioning on both buckets, creates a CRR rule with Replication Time Control and an IAM role for S3, and runs a one-time S3 Batch Replication job for the videos uploaded before the rule existed. Replication metrics in CloudWatch alert the team if objects fall behind.",
  "mistakes": [
   [
    "A new CRR rule will copy everything already in the bucket.",
    "Replication rules apply to objects written after the rule exists. Use S3 Batch Replication for existing objects."
   ],
   [
    "Replication protects against deletion and corruption.",
    "Corrupt writes replicate, and replication is not a backup. Use versioning, S3 Object Lock or AWS Backup with Vault Lock for protection against deletion and ransomware."
   ],
   [
    "An AMI can be launched in any Region.",
    "AMIs are Regional. Copy the AMI to the recovery Region before you need it."
   ],
   [
    "Write custom Lambda scripts to snapshot volumes and databases on a schedule.",
    "AWS Backup already schedules, retains and copies backups across these services with tag-based assignment, with far less operational effort."
   ]
  ],
  "tryit": [
   [
    "Riverbend County runs 15 Windows and Linux servers in its own data center and a growing set of EBS volumes and RDS databases in AWS. The board wants AWS resources backed up nightly with copies in a second account that cannot be deleted early, and the on-premises servers recoverable in AWS within about an hour after a flood. Which services would you choose for each half, and why?",
    "For AWS resources, use one AWS Backup plan assigned by tag, with a copy rule to a vault in a second account and Vault Lock on that vault so retention is immutable. For the on-premises servers, use AWS Elastic Disaster Recovery, which continuously replicates them at the block level to a low-cost staging area and launches recovery instances within minutes, meeting the one-hour target without running full servers all the time."
   ]
  ],
  "tip": "Centralized, tag-based backup across services with cross-Region and cross-account copies: AWS Backup. Immutable backups: Vault Lock. Automatically copy new S3 objects to another Region: CRR (versioning required); old objects need Batch Replication. Continuous block-level replication of whole servers for DR: Elastic Disaster Recovery.",
  "check": [
   [
    "You created a CRR rule, but objects uploaded last year are not in the destination bucket. Why?",
    "Replication rules apply to new objects. Use S3 Batch Replication to copy existing objects."
   ],
   [
    "How do you launch the same EC2 image in another Region?",
    "Copy the AMI to that Region, since AMIs are Regional resources, then launch from the copy."
   ],
   [
    "Which feature prevents even administrators from deleting recovery points before their retention ends?",
    "AWS Backup Vault Lock on the backup vault."
   ],
   [
    "What must be enabled on both buckets before configuring S3 Cross-Region Replication?",
    "Versioning, on both the source and destination buckets."
   ],
   [
    "How are resources usually assigned to an AWS Backup plan so new resources are protected automatically?",
    "By tags, so any resource with the matching tag is included."
   ]
  ]
 },
 {
  "t": "Resilient hybrid networking: Site-to-Site VPN, Direct Connect with VPN backup, and Transit Gateway",
  "hook": "Monday, 7:40 a.m., at Ironbridge Manufacturing. The plant floor's inventory system in the company data center talks to a pricing service in AWS, and since 6 a.m. every lookup has timed out. Grace, the network engineer, traces it quickly: a construction crew cut the fiber to the building, and with it the single dedicated circuit to AWS. There was no backup path. The plant manager wants to know how a company with 40 VPCs and a nine-month-old cloud project could hang everything on one cable. You are asked to redesign the link before the board meeting on Friday. What does a resilient hybrid network look like, and which pieces are worth paying for?",
  "simple": "A company with its own offices and an AWS account needs a road between them. One kind of road is a VPN: a private, locked tunnel that travels over the ordinary internet. It is cheap and quick to set up, but its speed varies like traffic on a public highway. Another is Direct Connect: a dedicated private line, like a private railway, that is fast and steady but takes weeks to build. If you only have one road and it breaks, everything stops, so you add a second road as backup. Transit Gateway is like a central train station that connects many networks to each other, instead of building a separate track between every pair.",
  "body": [
   "Many companies keep data centers while moving workloads to AWS, so the network link between them becomes critical: if it fails, applications split across both sides stop working. There are two main connection types, an encrypted tunnel over the internet and a dedicated private circuit, and a hub service that ties many networks together. The exam asks you to balance speed of setup, cost, bandwidth, consistency and resilience, and often the right answer combines more than one.",
   "AWS Site-to-Site VPN, a virtual private network service, creates encrypted IPsec (Internet Protocol Security) tunnels over the internet between your on-premises customer gateway device and AWS, ending at a virtual private gateway attached to one virtual private cloud (VPC) or at a Transit Gateway. Each VPN connection includes two tunnels terminating on different AWS endpoints in different Availability Zones (AZs), so one tunnel can fail, or be taken down for maintenance, without losing connectivity; you should configure your device to use both. VPN is quick to set up and inexpensive, but throughput per tunnel is limited and latency varies with the internet path. Dynamic routing with the Border Gateway Protocol (BGP) enables automatic failover between tunnels, and accelerated VPN can use the AWS global network through AWS Global Accelerator for a more stable path.",
   "AWS Direct Connect is a dedicated private network connection from your premises, or a colocation facility, to an AWS Direct Connect location. It offers consistent latency and high bandwidth, with dedicated connections at speeds such as 1, 10 and 100 Gbps and hosted connections from partners at lower speeds. Setting up a new connection can take weeks because physical cross-connects are involved, so it is never the answer to 'we need connectivity by Friday'. Traffic is carried on virtual interfaces (VIFs): a private VIF reaches VPCs, a public VIF reaches AWS public services such as Amazon Simple Storage Service (S3) over the Direct Connect link, and a transit VIF reaches Transit Gateways through a Direct Connect gateway. Direct Connect is not encrypted by default; for encryption you can run an IPsec VPN over it or use MACsec (Media Access Control security) on supported dedicated connections.",
   "Resilience is where many designs fall short. One Direct Connect connection is a single point of failure: a cut fiber, a failed router or a problem at the Direct Connect location takes it down. For critical workloads, AWS recommends connections at more than one Direct Connect location, each terminating on separate devices, for maximum resilience. A cost-effective pattern is Direct Connect as primary with Site-to-Site VPN as backup: BGP prefers the Direct Connect path and fails over to the VPN if it goes down, accepting lower bandwidth and variable latency during the outage. Link aggregation groups (LAGs) bundle several connections at one location for more bandwidth, but they do not protect against the loss of that location.",
   "The third piece solves a scaling problem inside AWS. As VPC counts grow, meshes of VPC peering connections become unmanageable, because peering is not transitive and every pair needs its own connection: ten VPCs fully meshed already need 45 peering connections. AWS Transit Gateway is a regional hub that connects VPCs, VPN connections and Direct Connect gateways in a hub-and-spoke model, with its own route tables to control which attachments can talk to each other, for example keeping development VPCs away from production. Transit Gateways in different Regions can be peered, and they can be shared across accounts with AWS Resource Access Manager (RAM). Transit Gateway also supports equal-cost multipath (ECMP) routing across multiple VPN tunnels to increase total VPN bandwidth.",
   "Putting it together, think in layers. The hub decides who can talk to whom; the links decide how traffic leaves the building; and BGP decides which link is used at any moment. A virtual private gateway is fine for one VPC, but once several VPCs or accounts need on-premises access, a Transit Gateway with a Direct Connect gateway and a transit VIF scales far better. Then add a second path of whichever type the budget and recovery needs allow.",
   "Consider a worked example. A bank connects its data center to 40 VPCs in several accounts. It attaches all VPCs to a shared Transit Gateway, with separate route tables for production and non-production. It connects the data center through two Direct Connect connections at two different Direct Connect locations, using a transit VIF and a Direct Connect gateway, and keeps a Site-to-Site VPN to the Transit Gateway as a last-resort backup. BGP handles failover automatically, and MACsec encrypts the dedicated links to satisfy its regulator.",
   "Exam clues are consistent. 'Connectivity needed this week', 'lowest cost' or 'encrypted over the internet' points to Site-to-Site VPN. 'Consistent latency', 'high bandwidth' or 'large data transfers daily' points to Direct Connect. 'Most cost-effective resilience for Direct Connect' points to a VPN backup; 'maximum resilience' points to multiple connections at multiple locations. 'Many VPCs and on-premises networks with centralized routing' points to Transit Gateway, and 'A peers with B, B peers with C' is a reminder that peering is not transitive."
  ],
  "analogy": "Connecting an office to AWS is like connecting a town to a city. Site-to-Site VPN is an armored car on the public highway: secure, available today, but stuck in whatever traffic there is. Direct Connect is a private rail line: fast and predictable, but it takes weeks to lay track, and the cargo is not locked unless you add locks (IPsec or MACsec). Transit Gateway is the central station where every line meets. The analogy breaks on failover: real trains need a dispatcher to reroute them, while BGP switches paths automatically.",
  "terms": [
   [
    "Site-to-Site VPN",
    "An AWS service providing two encrypted IPsec tunnels over the internet between on-premises and AWS."
   ],
   [
    "Customer gateway",
    "The on-premises VPN device, or its AWS representation, at your end of a Site-to-Site VPN."
   ],
   [
    "Virtual private gateway",
    "The AWS-side VPN endpoint attached to a single VPC."
   ],
   [
    "AWS Direct Connect",
    "A dedicated private network connection between on-premises networks and AWS."
   ],
   [
    "Virtual interface (VIF)",
    "A logical connection on Direct Connect: private, public or transit."
   ],
   [
    "BGP",
    "Border Gateway Protocol, the dynamic routing protocol that advertises routes and enables automatic failover between paths."
   ],
   [
    "Transit Gateway",
    "A regional network hub that connects VPCs and on-premises networks with centralized routing."
   ],
   [
    "MACsec",
    "Media Access Control security: link-layer encryption available on supported dedicated Direct Connect connections."
   ]
  ],
  "example": "A manufacturer needs AWS connectivity for a new analytics project starting next week, but also wants a stable, high-bandwidth link for nightly transfers of several terabytes. It sets up a Site-to-Site VPN immediately to start the project, orders a Direct Connect connection, and when the circuit is live a few weeks later makes it the primary path with BGP, keeping the VPN as the automatic backup.",
  "mistakes": [
   [
    "Direct Connect can be ordered for a project starting in a few days.",
    "New Direct Connect connections can take weeks because physical cross-connects are involved. Start with Site-to-Site VPN and add Direct Connect later."
   ],
   [
    "Direct Connect traffic is private, so it is encrypted.",
    "It is not encrypted by default. Run an IPsec VPN over it or use MACsec on supported dedicated connections."
   ],
   [
    "Two connections at the same Direct Connect location, or a LAG, are fully resilient.",
    "They do not survive the loss of that location. Maximum resilience uses connections at more than one location on separate devices; the cost-effective option is a VPN backup."
   ],
   [
    "VPC A can reach VPC C through VPC B if A-B and B-C are peered.",
    "VPC peering is not transitive. Peer A and C directly or use a Transit Gateway."
   ]
  ],
  "tryit": [
   [
    "Saltmarsh Outfitters has one Direct Connect connection from its warehouse to AWS, used by 12 VPCs through separate private VIFs and virtual private gateways. Leadership wants protection against the circuit failing, at the lowest added cost, and wants to stop managing a dozen separate attachments. What would you recommend?",
    "Add a Site-to-Site VPN as a backup path, with BGP preferring Direct Connect and failing over to the VPN automatically; this is the most cost-effective resilience option. Consolidate the VPCs onto a Transit Gateway, reached through a Direct Connect gateway and a single transit VIF, with the VPN also attached to the Transit Gateway, so routing is centralized. If the business later needs maximum resilience, add a second Direct Connect connection at a different location."
   ]
  ],
  "tip": "Need connectivity this week or at low cost: Site-to-Site VPN. Consistent, high-bandwidth private link: Direct Connect, which takes longer to provision and is unencrypted by default. Cheapest resilient option for Direct Connect: add a VPN backup. Maximum resilience: multiple locations. Many VPCs plus on-premises: Transit Gateway.",
  "check": [
   [
    "VPC A peers with B, and B peers with C. Can A reach C through B?",
    "No. VPC peering is not transitive. Peer A and C directly or use a Transit Gateway."
   ],
   [
    "Is traffic over Direct Connect encrypted by default?",
    "No. Add an IPsec VPN over Direct Connect or use MACsec where supported if encryption is required."
   ],
   [
    "Why does each Site-to-Site VPN connection include two tunnels?",
    "They terminate on different AWS endpoints in different AZs, so connectivity survives the loss or maintenance of one tunnel."
   ],
   [
    "What gives maximum resilience for Direct Connect?",
    "Multiple connections at more than one Direct Connect location, terminating on separate devices."
   ],
   [
    "Which Direct Connect virtual interface type connects to a Transit Gateway?",
    "A transit VIF, through a Direct Connect gateway."
   ]
  ]
 },
 {
  "t": "Infrastructure as code and service quotas: CloudFormation, StackSets and planning for limits and throttling",
  "hook": "It is the first full DR drill at Orchard Lane Bank, and the runbook says the recovery Region should be serving customers in 30 minutes. At minute 12, Kenji's terminal fills with red: the Auto Scaling group cannot launch instances because the account has hit its vCPU quota in that Region. At minute 18, someone notices the recovery VPC was built by hand last year and its security groups no longer match production. At minute 25, a script hammering the EC2 API starts getting throttling errors. The infrastructure was supposed to be the easy part. What would have made this rebuild boring, repeatable and fast?",
  "simple": "Infrastructure as code means writing down your whole cloud setup, like servers, networks and databases, in a text file, the way a recipe lists every ingredient and step. AWS CloudFormation reads that recipe and builds everything the same way every time, so a copy in another region matches the original. StackSets let you cook the same recipe in many kitchens at once. Service quotas are limits AWS places on how much of something one account can use in one region, like a library card that lets you borrow only so many books. If your backup region's limit is too low, plan ahead and ask for more. Throttling is AWS saying 'slow down' when you ask too fast.",
  "body": [
   "Resilience is not only about redundant hardware. If a Region fails and your recovery environment has to be built by hand from memory, recovery will be slow and error-prone, and the rebuilt environment will not quite match production. Infrastructure as code (IaC) describes your environment in text files that can be versioned, reviewed and deployed repeatedly, which makes rebuilds fast and consistent and makes drift from the approved design visible. The same idea applies to capacity: a design that works in testing can still fail in production if it hits a service quota or application programming interface (API) rate limit.",
   "AWS CloudFormation is AWS's native IaC service. A template, written in JSON or YAML, declares resources such as virtual private clouds (VPCs), instances and databases, with parameters for inputs, mappings for lookups, conditions for optional resources and outputs to share values with other stacks. CloudFormation creates them as a stack, working out dependency order, and if creation fails it rolls back by default, deleting what it created so you are not left with half a stack. To update a stack, you submit a changed template; a change set previews what will be added, modified or replaced before you run it, which matters because some property changes replace a resource, such as a database.",
   "Several CloudFormation features protect running environments. Drift detection shows resources that were changed outside CloudFormation, such as a security group rule added by hand in the console. A `DeletionPolicy` of `Retain` or `Snapshot` protects data such as databases when a stack is deleted, and stack termination protection prevents accidental deletion of the stack itself. The AWS Cloud Development Kit (CDK) and AWS Serverless Application Model (SAM) let you write in programming languages or a serverless shorthand that produce CloudFormation templates, so the same protections apply. The snippet below shows a Multi-AZ PostgreSQL database that leaves a snapshot behind if its stack is deleted.",
   "```\nResources:\n  OrdersDb:\n    Type: AWS::RDS::DBInstance\n    DeletionPolicy: Snapshot\n    Properties:\n      Engine: postgres\n      MultiAZ: true\n```",
   "CloudFormation StackSets deploy one template to many accounts and Regions in a single operation. With service-managed permissions in AWS Organizations, StackSets can deploy automatically to every account in an organizational unit (OU), including accounts added later. This is the standard way to roll out baselines such as AWS Identity and Access Management (IAM) roles, AWS Config rules or logging to every account, or to prepare identical infrastructure in a disaster recovery (DR) Region. Deployment options control how many accounts are updated at once and how many failures are tolerated before the operation stops, so one bad change does not roll across the whole organization.",
   "Every AWS service has service quotas, formerly called limits, such as the number of VPCs per Region, running On-Demand instance vCPUs per Region, or requests per second to an API. Some are adjustable through the Service Quotas console or API, and some are fixed. Quotas are usually per account and per Region, so for resilience the key idea is planning: if you fail over to another Region, that Region's quotas must be high enough for your full production load, so request increases in advance, because approvals can take time. Amazon CloudWatch alarms on quota usage and AWS Trusted Advisor service limit checks help you spot approaching limits before they cause a failure.",
   "APIs also throttle. When you exceed a request rate, the service returns a throttling error, such as HTTP 429 or a `ThrottlingException`. Retrying immediately in a tight loop makes it worse, because every client hammers the service at once. Well-built clients retry with exponential backoff and jitter, waiting progressively longer with a random offset between attempts, which the AWS software development kits (SDKs) do automatically. Designs that fan out many calls should use queues to smooth bursts, caching to avoid repeated calls, and batch APIs where they exist.",
   "Consider a worked example. Before a DR test, an architect discovers that the recovery Region's quota for On-Demand instance vCPUs is far below what production uses, and that the Elastic IP quota is also too low. She requests increases through Service Quotas and adds CloudWatch alarms at 80 percent of each quota. She then uses a StackSet to deploy the networking and IAM baseline to the recovery Region in every workload account, so failover only requires deploying the application stacks from the same templates used in production. A rule that all changes go through templates, never the console, keeps drift away.",
   "Exam clues are direct. 'Deploy the same resources to many accounts or Regions' points to StackSets. 'Preview changes before updating' points to a change set. 'Resources changed outside the template' points to drift detection. 'Keep the database when the stack is deleted' points to `DeletionPolicy`. 'Failover Region cannot launch enough instances' points to requesting quota increases ahead of time, and 'ThrottlingException during bursts' points to exponential backoff with jitter, queues or caching."
  ],
  "analogy": "A CloudFormation template is like an architect's blueprint for a house: hand it to any builder and you get the same house, while a house built from memory never quite matches. A change set is the contractor's quote listing what will be torn down before any work starts. StackSets are a builder putting up the same house on many lots at once. Service quotas are the town's building permits: you need enough of them in the new town before you can build. The analogy stops at throttling: a busy builder just queues you, while an AWS API returns an error that your code must retry politely.",
  "terms": [
   [
    "Infrastructure as code (IaC)",
    "Defining infrastructure in versioned text files that tools deploy repeatably."
   ],
   [
    "CloudFormation stack",
    "A set of AWS resources created and managed together from one template."
   ],
   [
    "Change set",
    "A preview of the changes CloudFormation will make when updating a stack."
   ],
   [
    "Drift detection",
    "A CloudFormation feature that finds resources changed outside the stack's template."
   ],
   [
    "DeletionPolicy",
    "A resource attribute (such as Retain or Snapshot) that preserves data when a stack is deleted."
   ],
   [
    "StackSets",
    "A CloudFormation feature that deploys a template across multiple accounts and Regions."
   ],
   [
    "Service quota",
    "A per-account, per-Region limit on resources or request rates, some of which can be increased."
   ],
   [
    "Exponential backoff",
    "A retry strategy that waits progressively longer between attempts, usually with random jitter."
   ]
  ],
  "example": "A company's nightly job starts thousands of parallel Lambda functions that each call a DynamoDB API and a third-party service, and it fails with throttling errors. The team puts the work items on an SQS queue, sets reserved concurrency on the consumer function, uses batch write APIs, and relies on the SDK's exponential backoff with jitter. The job now finishes reliably, and a CloudWatch alarm warns if the account approaches its Lambda concurrency quota.",
  "mistakes": [
   [
    "Quick console fixes on stack-managed resources are harmless.",
    "They cause drift, and later stack updates can fail or overwrite them. Make changes in the template and use drift detection to find manual edits."
   ],
   [
    "Update a stack directly without previewing.",
    "Some property changes replace a resource, such as a database. Review a change set first, and set DeletionPolicy and termination protection on data stores."
   ],
   [
    "The DR Region has the same quotas as production.",
    "Quotas are per account and per Region. Request increases in the recovery Region in advance and alarm on usage."
   ],
   [
    "Retry throttled calls immediately until they succeed.",
    "Tight retry loops worsen throttling. Use exponential backoff with jitter (built into AWS SDKs), and smooth load with queues, caching or batch APIs."
   ]
  ],
  "tryit": [
   [
    "Hollow Creek Schools runs 30 AWS accounts in AWS Organizations, one per school. The district wants the same logging configuration and a read-only auditor IAM role in every account, including schools added next year, and the same networking baseline prepared in a second Region for DR. Today an engineer deploys templates account by account. What would you change, and what else should the DR plan include?",
    "Use CloudFormation StackSets with service-managed permissions targeting the organizational unit, so the baseline deploys to every current account and automatically to new ones, in both Regions, with deployment options limiting concurrent updates and failure tolerance. The DR plan should also review service quotas in the second Region and request increases ahead of time, with CloudWatch alarms on usage."
   ]
  ],
  "tip": "Deploy the same resources to many accounts or Regions: StackSets. Preview changes before updating: change set. Manual changes found: drift detection. Keep data on stack deletion: DeletionPolicy. DR plans must include quota increases in the recovery Region. Throttling errors are handled with retries using exponential backoff and jitter.",
  "check": [
   [
    "What does CloudFormation do by default if a resource fails during stack creation?",
    "It rolls back, deleting the resources it created for that stack."
   ],
   [
    "An application receives ThrottlingException errors during bursts. What are two good fixes?",
    "Retry with exponential backoff and jitter, and smooth or reduce the calls with a queue, caching or batching (or request a quota increase if adjustable)."
   ],
   [
    "How do you protect an RDS database from being deleted when its CloudFormation stack is deleted?",
    "Set a DeletionPolicy of Retain or Snapshot on the database resource."
   ],
   [
    "Why should DR planning include service quotas in the recovery Region?",
    "Quotas are per Region, so the recovery Region may not allow enough resources for full production load unless increases are requested in advance."
   ]
  ]
 },
 {
  "t": "EC2 instance families and placement groups (cluster, spread, partition), and enhanced networking with ENA and EFA",
  "hook": "Priya at Northgate Climate Lab has a deadline: the storm-season forecast model has to finish overnight, and last night's run took eleven hours instead of four. You pull up the cluster. Sixty-four instances, the right CPU count, plenty of memory, yet the job's own logs show nodes waiting on each other for most of every step. The instances were launched wherever capacity happened to be, some in one Availability Zone and some in another, all on default networking. Nothing is broken, exactly. So why is a fleet of powerful servers spending its night waiting, and which two settings would you change before tonight's run?",
  "simple": "Renting a cloud server is a bit like renting a car. You pick the kind of vehicle that fits the trip: a small hatchback for errands, a van for moving boxes, a sports car for speed. EC2 instance families work the same way: some are balanced, some have extra processing power, some have extra memory, some have fast local disks, and some have special chips for graphics or machine learning. Placement groups decide where your servers are parked. You can park them all side by side so they can talk quickly, park each one in a different garage so one fire cannot hit them all, or park them in separate rows so a group of them is protected together. Enhanced networking is like giving the cars a faster, private road to talk on.",
  "body": [
   "Amazon Elastic Compute Cloud (EC2) offers hundreds of instance types, but they fall into a handful of families, and the SAA-C03 exam expects you to match a workload to the right one. Choosing well matters twice: an instance that is too small hurts performance, and one that is the wrong shape wastes money, because you pay for CPU, memory or storage your application never uses. Alongside the instance type, two further choices shape performance for tightly connected fleets: where instances are physically placed, and how they are networked.",
   "The instance name encodes what you are getting. In `m7g.large`, `m` is the family, `7` the generation, `g` an attribute (here AWS Graviton, an Arm-based processor designed by AWS) and `large` the size. Other attribute letters you will see include `i` for Intel, `a` for AMD, `d` for local NVMe instance storage and `n` for extra network bandwidth. General purpose instances (M, and T for burstable) balance CPU, memory and networking and suit web servers and small databases. T instances earn CPU credits while idle and spend them in bursts; in unlimited mode they can burst beyond their credits for an extra charge. Compute optimized (C) suits batch processing, media encoding, gaming servers and scientific modeling. Memory optimized (R, X and others) suits in-memory databases, caches and real-time analytics. Storage optimized (I, D and others) has fast local instance storage for high random I/O or dense sequential workloads. Accelerated computing (P, G, Inf, Trn and others) adds graphics processing units (GPUs) or AWS machine learning chips.",
   "Right-sizing is the habit that ties the family choice to cost. Start from what the workload actually consumes: Amazon CloudWatch shows CPU utilization and network throughput for every instance, and AWS Compute Optimizer recommends smaller or different types when an instance is consistently underused. If a memory-hungry cache sits at 15 percent CPU on a compute optimized instance, you are paying for cores it never touches, and moving to a memory optimized type of a smaller size can cut the bill while improving performance. Graviton types often add savings, but only when the software and its compiled dependencies support Arm64.",
   "Placement groups influence where instances land in the physical infrastructure, and there are three strategies. A cluster placement group packs instances close together inside one Availability Zone (AZ) for the lowest latency and highest throughput between them, which suits tightly coupled high performance computing (HPC). The trade-off is correlated failure: a rack or AZ problem can hit many instances at once. A spread placement group puts each instance on distinct underlying hardware, with a limit of seven running instances per AZ per group, to minimize correlated failures for a small number of critical instances. A partition placement group divides instances into logical partitions, each on its own set of racks with separate network and power, so large distributed systems such as Hadoop, Cassandra and Kafka can place replicas in different failure domains. Instances can read their partition number from instance metadata so the application can make replica-aware decisions.",
   "You set placement when you launch. In the console, the launch wizard's advanced details let you pick an existing placement group, and for a partition group you can either let EC2 spread instances across partitions or name a specific partition. A partition group can have up to seven partitions per AZ, and unlike a cluster group it can span multiple AZs in the same Region. If EC2 cannot find enough capacity to honor the placement, the launch fails with an insufficient capacity error rather than quietly putting the instance somewhere else, which is why launching a cluster group all at once, with one instance type, matters.",
   "Networking performance depends on the instance type and on enhanced networking, which uses single root I/O virtualization (SR-IOV) to give higher bandwidth, higher packet rates and lower, more consistent latency than traditional virtualized networking. The Elastic Network Adapter (ENA) provides enhanced networking on current-generation instance types and is enabled in current AWS-provided Amazon Machine Images (AMIs). You can confirm it with `aws ec2 describe-instances --instance-ids i-0abc --query 'Reservations[].Instances[].EnaSupport'`. The Elastic Fabric Adapter (EFA) is a network device for HPC and machine learning that adds operating system bypass: applications using the Message Passing Interface (MPI) or the NVIDIA Collective Communications Library (NCCL) talk to the network hardware directly, skipping the kernel, for very low and predictable latency. EFA is available only on selected instance types, you attach it as the network interface type when launching, and it is usually combined with a cluster placement group.",
   "Consider a worked example. A research team runs a weather simulation across 64 instances that exchange data constantly using MPI. The architect chooses an HPC-oriented, compute-optimized instance type that supports EFA, creates a cluster placement group with `aws ec2 create-placement-group --group-name wx-sim --strategy cluster`, and launches all nodes into it in one AZ with an EFA interface. Because a cluster group concentrates risk, the job checkpoints its state regularly to Amazon FSx for Lustre, so a single hardware failure costs minutes of work instead of the whole run. Separately, the team's three license servers each run in a spread placement group so no two share hardware.",
   "Common mistakes: choosing a spread placement group for a large fleet (it is capped at seven running instances per AZ per group, so large replicated clusters belong in a partition group); assuming a cluster placement group spans AZs (it does not, so it offers no AZ-level resilience); treating ENA and EFA as the same thing (ENA is general enhanced networking; EFA adds OS bypass for MPI and NCCL); and picking a burstable T instance for a workload with constant high CPU, which exhausts credits and either throttles or incurs unlimited-mode charges. Another trap is launching mixed instance types into a cluster group; it is best to launch the whole group at once with the same type to reduce capacity errors.",
   "Exam questions usually describe the workload and ask for the placement or networking choice. 'Tightly coupled', 'lowest latency between nodes', 'HPC' or 'MPI' points to a cluster placement group plus EFA. 'A small number of critical instances that must not share hardware' points to a spread placement group. 'Hundreds of nodes for HDFS, Cassandra or Kafka, replicas on separate racks' points to a partition placement group. 'In-memory database' points to a memory optimized family, 'high random I/O on local disk' to storage optimized, and 'GPU training or inference' to accelerated computing. When a question mentions better price performance and Arm compatibility, think Graviton."
  ],
  "analogy": "Think of placement groups as seating plans for a wedding. A cluster group seats the whole band at one table so they can pass sheet music instantly, but one spilled drink soaks them all. A spread group puts each of the seven guests of honor at a different table so no single mishap reaches two of them. A partition group gives each extended family its own section with its own aisle, so trouble in one section stays there. The analogy stops at EFA: that is less about seating and more like giving the band a private intercom that skips the venue's switchboard.",
  "mnemonic": "Family letters: C is Compute, R is RAM (memory), I is I/O (storage optimized), M is Main (general purpose), T is Turbo-burst, and P and G carry GPUs for accelerated computing.",
  "terms": [
   [
    "Instance family",
    "A group of EC2 instance types optimized for a resource profile, such as general purpose, compute, memory, storage or accelerated computing."
   ],
   [
    "Cluster placement group",
    "Instances packed closely in one Availability Zone for low-latency, high-throughput networking between them."
   ],
   [
    "Spread placement group",
    "Each instance on distinct hardware, limited to seven running instances per AZ per group, to reduce correlated failures."
   ],
   [
    "Partition placement group",
    "Instances divided into partitions on separate racks, for large distributed and replicated systems."
   ],
   [
    "Elastic Network Adapter (ENA)",
    "The network interface that provides enhanced networking with high bandwidth and packet rates on current instance types."
   ],
   [
    "Elastic Fabric Adapter (EFA)",
    "A network interface with operating system bypass for tightly coupled HPC and machine learning workloads using MPI or NCCL."
   ],
   [
    "Burstable instance",
    "A T-family instance that accrues CPU credits when idle and spends them to burst above a baseline."
   ],
   [
    "Single root I/O virtualization (SR-IOV)",
    "A hardware virtualization method that gives an instance near-direct access to the network device, the basis of enhanced networking."
   ],
   [
    "Operating system bypass",
    "An EFA capability that lets MPI or NCCL applications reach the network hardware directly without going through the kernel."
   ]
  ],
  "example": "A research team runs a weather simulation across 64 instances that exchange data constantly using MPI. The architect chooses an HPC-oriented instance type with EFA, launches all nodes in a cluster placement group in one AZ, and checkpoints results to Amazon FSx for Lustre so a hardware failure does not lose the whole run. The team's Kafka cluster, by contrast, runs in a partition placement group so each broker's replicas sit on different racks.",
  "mistakes": [
   [
    "A spread placement group is the most resilient choice, so use it for every important fleet.",
    "Spread groups allow only seven running instances per AZ per group. For large replicated systems such as Kafka, Cassandra or HDFS, use a partition placement group, which isolates racks without that small cap."
   ],
   [
    "A cluster placement group across two AZs gives low latency and AZ resilience at once.",
    "A cluster placement group lives in a single AZ. It trades resilience for the lowest latency, so protect the job with checkpoints or a second copy elsewhere."
   ],
   [
    "ENA and EFA are two names for the same enhanced networking.",
    "ENA is general enhanced networking for current instance types. EFA adds operating system bypass for MPI and NCCL, works only on supported types, and is the HPC answer."
   ],
   [
    "A T instance is the cheapest option for any workload.",
    "Burstable T instances suit spiky, mostly idle workloads. Constant high CPU drains credits, which either throttles performance or adds unlimited-mode charges, so a fixed-performance M or C instance is often cheaper."
   ]
  ],
  "tryit": [
   [
    "Harbor Analytics runs a 12-node Apache Cassandra ring today and plans to grow to 90 nodes. The data team wants replicas never to share a rack, and the application should know which rack each node is on. A colleague suggests a spread placement group because it gives the most isolation. What do you recommend?",
    "A partition placement group. A spread group is capped at seven running instances per AZ per group, so it cannot hold 90 nodes in a sensible layout. A partition group isolates racks per partition, can span AZs, and exposes the partition number through instance metadata so Cassandra can place replicas in different failure domains."
   ],
   [
    "A genomics team asks for the fastest inter-node communication for an MPI job and is happy to keep all nodes in one AZ. They have picked a supported instance type. What two settings complete the design, and what should they add to manage risk?",
    "Launch the nodes into a cluster placement group and attach an Elastic Fabric Adapter as the network interface. Because the cluster group concentrates failure in one AZ, they should checkpoint progress regularly to durable shared storage so a hardware fault costs minutes, not the whole run."
   ]
  ],
  "tip": "Lowest latency between nodes: cluster. Maximum isolation for a few critical instances: spread (seven per AZ). Big replicated clusters like Kafka, Cassandra or HDFS: partition. MPI or OS bypass: EFA, not just ENA.",
  "check": [
   [
    "Which placement group is best for a Cassandra cluster of 30 nodes that must keep replicas on separate racks?",
    "A partition placement group, which puts each partition on its own racks and exposes the partition number to the application through metadata."
   ],
   [
    "What does the 'g' in m7g indicate?",
    "The instance uses an AWS Graviton (Arm-based) processor, so software must support the Arm64 architecture."
   ],
   [
    "Why is a spread placement group a poor fit for a 50-instance web fleet in two AZs?",
    "Spread groups allow only seven running instances per AZ per group, so they are meant for a few critical instances, not large fleets."
   ],
   [
    "An MPI application needs the lowest possible inter-node latency. Which two features should you combine?",
    "A cluster placement group in one AZ and the Elastic Fabric Adapter, whose OS bypass lets MPI reach the network hardware directly."
   ],
   [
    "A partition placement group can span multiple AZs. Can a cluster placement group?",
    "No. A cluster placement group is confined to one AZ; that is what gives it the lowest latency."
   ]
  ]
 },
 {
  "t": "EBS volume types and instance store: gp3 vs io2 Block Express vs st1 and sc1",
  "hook": "The finance team at Lakeshore Mutual runs month-end close tonight, and Diego, the database administrator, messages you at 9 p.m.: queries that took two seconds last month now take forty. The database server's CPU is barely working. You open the volume's monitoring tab and see the queue of waiting disk operations climbing steadily, and the volume is an old 200 GiB gp2 volume someone created three years ago. Meanwhile a reporting server down the hall is quietly paying for the most expensive storage tier to read log files once a week. Which volume belongs where, and can you fix tonight's problem without taking the database offline?",
  "simple": "A server needs somewhere to keep its files, just like a laptop needs a hard drive. On AWS, the main option is a virtual disk that plugs into your server over the network and keeps your data even if the server is switched off. These disks come in flavors. Fast solid state ones are good at lots of small, quick reads and writes, like a busy cashier handling many small purchases. Cheaper spinning-disk ones are good at reading big files from start to finish, like a truck moving one large load. There is also a scratch disk built into the server itself: very fast, but wiped when the server stops, like a whiteboard that gets erased when you leave the room.",
  "body": [
   "Amazon Elastic Block Store (EBS) provides network-attached block storage volumes for EC2, behaving like virtual hard disks. A volume lives in one Availability Zone (AZ), is replicated within that AZ to protect against a single hardware failure, persists independently of the instance and can be backed up with point-in-time snapshots stored in Amazon S3. Normally a volume attaches to one instance at a time; io1 and io2 volumes support Multi-Attach to several Nitro-based instances in the same AZ, for clustered applications that coordinate concurrent writes themselves. Because a volume is tied to one AZ, moving data to another AZ means creating a snapshot and restoring it there.",
   "EBS volume types split into solid state drive (SSD) volumes, measured mainly in input/output operations per second (IOPS), and hard disk drive (HDD) volumes, measured in throughput (MB/s). The general purpose SSD gp3 is the default choice for boot volumes and most workloads. Its key feature is that performance is independent of size: every gp3 volume gets a baseline of 3,000 IOPS and 125 MB/s, and you can provision more IOPS and throughput separately without buying more storage. The older gp2 ties IOPS to volume size (three IOPS per GiB) and uses burst credits for small volumes, which is why teams often over-provisioned gp2 capacity just to get performance, and why migrating gp2 to gp3 usually cuts cost or improves performance.",
   "Provisioned IOPS SSDs, io1 and io2, are for I/O-intensive databases that need sustained, consistent IOPS and low latency. io2 Block Express is the highest-performance EBS tier: sub-millisecond latency, much higher maximum IOPS and throughput per volume than gp3, and higher durability than the other volume types. New io2 volumes are created on Block Express. Choose it for large, mission-critical databases such as SAP HANA, Oracle or SQL Server when gp3's maximums or consistency are not enough. You set IOPS explicitly when you create the volume, for example `aws ec2 create-volume --volume-type io2 --size 500 --iops 20000 --availability-zone us-east-1a`.",
   "HDD volumes are optimized for large sequential reads and writes and cannot be boot volumes. Throughput optimized HDD (st1) suits big data, data warehouses, log processing and streaming workloads that read large files in order. Cold HDD (sc1) is the lowest-cost EBS option, for infrequently accessed, throughput-oriented data. Small random I/O on HDD volumes performs poorly, so never pick them for transactional databases. Instance store is different again: temporary block storage on disks physically attached to the host. It gives very high I/O performance and has no separate charge, but data is lost when the instance stops, hibernates or terminates, or if the underlying disk fails; it survives only a reboot. Use it for caches, buffers, scratch data, or data the application replicates across nodes. Only certain instance types include it, and you cannot detach it and attach it elsewhere.",
   "You rarely have to rebuild to change course, thanks to Elastic Volumes. On a current-generation instance you can increase a volume's size, change its type (for example from gp2 to gp3), or raise provisioned IOPS and throughput while the volume stays attached and in use. In the console this is the Modify volume action, and from the AWS Command Line Interface (CLI) it is `aws ec2 modify-volume --volume-id vol-0abc --volume-type gp3 --iops 6000`. After growing a volume you still extend the partition and file system inside the operating system. To spot a performance limit, look at Amazon CloudWatch: a rising `VolumeQueueLength` with low CPU suggests the volume, not the instance, is the bottleneck, and on gp2 a falling `BurstBalance` shows burst credits running out. Remember that the instance type also caps EBS bandwidth, so a fast volume on a small instance can still be throttled.",
   "Consider a worked example. A company runs a large Oracle database that needs very high, sustained IOPS with consistent sub-millisecond latency, so it uses io2 Block Express data volumes. Its web servers boot from gp3 volumes with the default 3,000 IOPS. A log analytics cluster that scans terabytes sequentially every night uses st1, and a set of rarely read historical extracts sits on sc1. A caching tier runs on storage optimized instances with NVMe instance store, because the cache can be rebuilt from the database if an instance is stopped. When the database team later needs more IOPS, they change the volume's provisioned IOPS in place with Elastic Volumes instead of migrating.",
   "Common mistakes: choosing st1 or sc1 for a boot volume or an online transaction processing (OLTP) database; assuming gp3 performance grows with size as gp2 did; thinking instance store data survives a stop and start (only a reboot); expecting an EBS volume to attach to an instance in another AZ; and paying for io2 when gp3 with extra provisioned IOPS would meet the requirement at lower cost. Another trap is forgetting that EBS encryption is set per volume, with snapshots of encrypted volumes also encrypted.",
   "Exam questions are usually worded around the access pattern and the budget. 'Boot volume', 'general purpose' or 'most cost-effective SSD' points to gp3. 'Highest IOPS', 'mission-critical database', 'sub-millisecond latency' or 'highest durability' points to io2 Block Express. 'Large sequential', 'big data', 'log processing' and 'throughput' point to st1; 'infrequently accessed' plus 'lowest cost' block storage points to sc1. 'Temporary', 'scratch', 'buffer', 'highest I/O' and 'data can be lost' point to instance store. 'Shared block volume for a clustered application in one AZ' points to io1 or io2 Multi-Attach."
  ],
  "analogy": "Choosing an EBS volume is like choosing a delivery service. gp3 is the regular courier that handles most parcels at a fair price, and you can pay for extra trucks without renting a bigger warehouse. io2 Block Express is the guaranteed overnight service for parcels that must arrive on time, every time. st1 and sc1 are freight trains: great for moving huge loads in one direction, hopeless for many small drop-offs. Instance store is the van parked at your door, fastest of all, but it is not yours to keep when you leave.",
  "terms": [
   [
    "gp3",
    "General purpose SSD with a baseline of 3,000 IOPS and 125 MB/s, where IOPS and throughput are provisioned independently of size."
   ],
   [
    "gp2",
    "The older general purpose SSD whose IOPS scale with volume size and use burst credits on small volumes."
   ],
   [
    "io2 Block Express",
    "The highest-performance EBS SSD for demanding databases, with sub-millisecond latency and higher durability."
   ],
   [
    "st1",
    "Throughput optimized HDD for large sequential workloads such as big data and logs; not bootable."
   ],
   [
    "sc1",
    "Cold HDD, the lowest-cost EBS volume, for infrequently accessed sequential data; not bootable."
   ],
   [
    "Instance store",
    "Temporary block storage physically attached to the host; data is lost on stop, hibernation, termination or disk failure."
   ],
   [
    "Multi-Attach",
    "An io1 and io2 feature that attaches one volume to several Nitro instances in the same AZ."
   ],
   [
    "Elastic Volumes",
    "An EBS feature that changes a volume's size, type, IOPS or throughput while it stays attached and in use."
   ],
   [
    "Snapshot",
    "A point-in-time, incremental backup of an EBS volume stored in Amazon S3, used to restore or copy a volume to another AZ or Region."
   ]
  ],
  "example": "A company runs a large Oracle database needing very high sustained IOPS and chooses io2 Block Express. Its web servers use gp3 boot volumes. A log analytics cluster reading terabytes sequentially uses st1, and archived monthly extracts that are rarely scanned sit on sc1. A caching layer uses NVMe instance store on storage optimized instances because the cache can be rebuilt if data is lost.",
  "mistakes": [
   [
    "st1 is cheaper than gp3, so use it for the boot volume or a busy transactional database to save money.",
    "st1 and sc1 cannot be boot volumes, and their HDD design handles small random I/O poorly. Use gp3 for boot volumes and an SSD type for transactional databases."
   ],
   [
    "To get more IOPS from gp3, make the volume bigger.",
    "gp3 performance is independent of size. You provision extra IOPS and throughput directly. Size-linked IOPS was the gp2 model."
   ],
   [
    "Instance store data is safe as long as you do not terminate the instance.",
    "Instance store survives a reboot only. Stopping, hibernating or terminating the instance, or a host disk failure, loses the data, so keep only rebuildable or replicated data there."
   ],
   [
    "The highest-performance answer is always io2 Block Express.",
    "If gp3 with additional provisioned IOPS meets the requirement, it is usually cheaper. Choose io2 Block Express for mission-critical databases that need sustained, consistent sub-millisecond latency, very high IOPS or higher durability."
   ]
  ],
  "tryit": [
   [
    "At Lakeshore Mutual, a 200 GiB gp2 data volume for a PostgreSQL database is out of burst credits every month-end. The team needs about 8,000 sustained IOPS during close and wants to avoid downtime and avoid buying storage it does not need. What change do you make?",
    "Use Elastic Volumes to change the volume to gp3 in place and provision the additional IOPS (and throughput if needed). gp3 decouples performance from size, so they keep 200 GiB and pay only for the extra IOPS, with no detach or rebuild. io2 would also work but costs more than the requirement justifies."
   ],
   [
    "A video transcoding job writes large temporary intermediate files, reads them once, and deletes them at the end of each job. If an instance fails, the job simply restarts. Which storage gives the highest I/O for those temporary files?",
    "Instance store on an instance type that includes it. The data is temporary and rebuildable, so losing it on stop or failure is acceptable, and local NVMe disks give very high I/O without a separate storage charge."
   ]
  ],
  "tip": "Default or boot volume: gp3. Highest sustained IOPS for critical databases: io2 Block Express. Big sequential throughput at low cost: st1; coldest and cheapest: sc1. Fastest temporary scratch space that may be lost: instance store.",
  "check": [
   [
    "You stop and start an instance. What happens to data on its instance store volume?",
    "It is lost. Instance store data survives only reboots, not stops, hibernation or termination."
   ],
   [
    "Why is gp3 often cheaper than gp2 for the same performance?",
    "gp3 lets you provision IOPS and throughput independently of size, so you no longer need to over-provision storage to get IOPS."
   ],
   [
    "Can an st1 volume be used as a boot volume for a Linux instance?",
    "No. HDD-backed st1 and sc1 volumes cannot be boot volumes; use an SSD type such as gp3."
   ],
   [
    "A clustered application in one AZ needs several instances to share one block volume. Which EBS option fits?",
    "An io1 or io2 volume with Multi-Attach enabled, attached to Nitro instances in the same AZ, with the application managing concurrent writes."
   ],
   [
    "How do you move an EBS volume's data to an instance in a different AZ?",
    "Create a snapshot of the volume and restore a new volume from it in the target AZ, then attach that volume."
   ]
  ]
 },
 {
  "t": "Shared file systems: Amazon EFS vs FSx for Windows File Server, FSx for Lustre and FSx for NetApp ONTAP",
  "hook": "Monday morning at Copperline Studios, and the help desk queue is full. The new Linux render farm cannot see the project files, the Windows editors say their mapped drive lost everyone's folder permissions over the weekend, and the machine learning team wants to train directly on two years of footage sitting in an S3 bucket. Each group was promised 'a shared drive in the cloud', and someone set up one file system for all three. Ana, the studio's only infrastructure engineer, asks you a simple question over coffee: is there one right answer here, or three?",
  "simple": "A shared file system is like a shared network folder at an office: many computers can open, edit and save the same files at the same time. The trouble is that computers speak different 'languages' for sharing files. Linux machines usually speak one language, called NFS, and Windows machines speak another, called SMB. Some jobs, like training artificial intelligence models or rendering movies, need files delivered extremely fast to hundreds of computers at once. AWS offers a different managed file service for each need: one for Linux, one for Windows, one for very high speed work, and one that speaks several languages at once. Picking the right one is mostly about asking who will use it and how.",
  "body": [
   "Amazon Elastic Block Store (EBS) volumes generally attach to one instance, and Amazon S3 is object storage accessed over HTTP APIs rather than as a mounted drive. When many servers need to read and write the same files through a normal file system interface, with directories, file locking and permissions, you need a shared file system. AWS offers Amazon Elastic File System (EFS) and the Amazon FSx family, and the exam decides between them by protocol, operating system and performance profile. Getting this right early saves painful migrations later, because applications are written to expect a particular protocol.",
   "Amazon EFS is a fully managed Network File System (NFS) for Linux workloads. Thousands of EC2 instances, containers and Lambda functions can mount it at the same time, across Availability Zones (AZs), through a mount target in each AZ. It grows and shrinks automatically with no capacity to provision, and you pay for the storage you use. Regional file systems store data redundantly across multiple AZs; One Zone file systems cost less for data that does not need that resilience. Lifecycle management moves rarely used files to the Infrequent Access and Archive storage classes. Throughput modes include elastic, which scales automatically with demand and is the usual default, and provisioned, for a fixed throughput level. On an instance you mount it with the EFS mount helper, for example `sudo mount -t efs -o tls fs-0123abcd:/ /mnt/shared`. EFS does not support Windows clients.",
   "Two EFS details show up often in practice. Access points give each application its own entry directory and enforced user and group identity, which keeps containers and AWS Lambda functions from wandering into each other's files. Encryption at rest is chosen when you create the file system, and the `tls` mount option shown above encrypts data in transit. If a mount simply hangs, the cause is almost always networking: there is no mount target in that AZ, or the mount target's security group does not allow inbound NFS on TCP port 2049 from the clients' security group. For moving existing data in, AWS DataSync can copy from on-premises NFS or SMB shares into EFS and the FSx file systems, preserving metadata and verifying the transfer.",
   "Amazon FSx for Windows File Server provides fully managed Windows file shares using the Server Message Block (SMB) protocol, integrated with Microsoft Active Directory so permissions use NTFS access control lists (ACLs). It supports Windows features such as Distributed File System (DFS) namespaces, shadow copies that let users restore previous versions, and data deduplication, and it offers Multi-AZ deployments for high availability. Choose it for Windows applications, user home directories, and SharePoint or SQL Server workloads that expect SMB shares.",
   "Amazon FSx for Lustre is a high-performance parallel file system for HPC, machine learning training, media rendering and financial modeling, delivering very high aggregate throughput with sub-millisecond latencies. It can link to an S3 bucket as a data repository, presenting objects as files, loading them lazily on first access and exporting results back to S3. Scratch deployments are for temporary, short-term processing with no data replication, so a failed server loses its data; persistent deployments replicate within an AZ for longer-running work. Amazon FSx for NetApp ONTAP runs NetApp's ONTAP file system as a managed service. It serves NFS, SMB and iSCSI (block storage over IP) at the same time, so Linux, Windows and macOS clients can share data, and it offers ONTAP features such as snapshots, SnapMirror replication, cloning, compression and deduplication. A fourth option, FSx for OpenZFS, suits workloads moving from ZFS or other Linux NFS file servers that need very low latency.",
   "Consider a worked example. A media company renders video frames on 500 Linux instances. Source assets live in S3, so the team creates an FSx for Lustre file system linked to the bucket; render nodes read assets as ordinary files at high throughput, and finished frames are exported back to S3 for long-term storage. Editors on Windows workstations use FSx for Windows File Server shares joined to the corporate Active Directory, so their existing group permissions keep working. The company's content management web servers, which run Linux across three AZs, share uploaded images on a Regional EFS file system. A subsidiary that already runs NetApp arrays on premises replicates to FSx for NetApp ONTAP with SnapMirror for disaster recovery.",
   "Common mistakes: choosing EFS for Windows servers (it is NFS for Linux); choosing FSx for Windows File Server for Linux HPC (it is SMB and not built for parallel throughput); using an FSx for Lustre scratch file system for data that must survive a failure; and forgetting that EFS needs a mount target in each AZ where clients run, with security groups that allow NFS traffic on port 2049. Another trap is picking S3 when the application needs POSIX file semantics such as file locking or in-place edits; S3 is objects, not a file system.",
   "Exam questions usually hand you the clue in the protocol or the operating system. 'Linux', 'NFS', 'POSIX', 'shared across AZs' or 'elastic, pay for what you use' points to EFS. 'Windows', 'SMB', 'Active Directory', 'NTFS permissions' or 'DFS' points to FSx for Windows File Server. 'HPC', 'machine learning training', 'parallel', 'hundreds of GB/s' or 'process data in S3 as files' points to FSx for Lustre. 'NetApp', 'multi-protocol', 'NFS and SMB and iSCSI together' or 'SnapMirror' points to FSx for NetApp ONTAP. 'Migrating ZFS' points to FSx for OpenZFS."
  ],
  "analogy": "Picture four kinds of shared kitchens. EFS is the open-plan kitchen where any number of Linux cooks can work at once and the room grows as more arrive. FSx for Windows File Server is the restaurant kitchen run by a head chef (Active Directory) who decides exactly who may touch which shelf. FSx for Lustre is the industrial production line, built to feed hundreds of stations at once from a giant pantry (S3). FSx for NetApp ONTAP is the kitchen whose staff speak several languages. The analogy breaks on cost and durability: Lustre scratch is a production line with no backup pantry.",
  "terms": [
   [
    "Amazon EFS",
    "A managed, elastic NFS file system for Linux that many instances across AZs can mount simultaneously."
   ],
   [
    "Mount target",
    "An EFS network endpoint in a subnet of each AZ through which clients mount the file system."
   ],
   [
    "FSx for Windows File Server",
    "A managed Windows file server using SMB with Active Directory integration and NTFS permissions."
   ],
   [
    "FSx for Lustre",
    "A managed high-performance parallel file system for HPC and ML, with optional S3 data repository integration."
   ],
   [
    "FSx for NetApp ONTAP",
    "A managed NetApp ONTAP file system supporting NFS, SMB and iSCSI with ONTAP data management features."
   ],
   [
    "Server Message Block (SMB)",
    "The file sharing protocol used by Windows clients and servers."
   ],
   [
    "Scratch vs persistent (Lustre)",
    "Scratch file systems do not replicate data and suit temporary jobs; persistent file systems replicate within an AZ."
   ],
   [
    "EFS access point",
    "An application-specific entry point into an EFS file system that enforces a root directory and a user and group identity."
   ],
   [
    "Network File System (NFS)",
    "The file sharing protocol used mainly by Linux and Unix clients, served by EFS on TCP port 2049."
   ]
  ],
  "example": "A media company renders video frames on 500 Linux instances. Source assets live in S3; an FSx for Lustre file system linked to the bucket gives render nodes fast file access and writes finished frames back to S3. Its editors on Windows workstations use FSx for Windows File Server shares joined to the corporate Active Directory, and its web servers in three AZs share uploaded images on EFS.",
  "mistakes": [
   [
    "EFS is the AWS shared file system, so it works for Windows servers too.",
    "EFS is NFS for Linux and does not support Windows clients. Windows workloads that need SMB and Active Directory permissions belong on FSx for Windows File Server."
   ],
   [
    "FSx for Windows File Server is fast enough for a Linux HPC cluster.",
    "It is an SMB file server built for Windows workloads, not a parallel file system. Linux HPC and machine learning that need very high aggregate throughput point to FSx for Lustre."
   ],
   [
    "A scratch FSx for Lustre file system is fine for data you must keep.",
    "Scratch deployments do not replicate data, so a failed server loses its data. Use persistent deployments, or export results to S3, for anything that must survive."
   ],
   [
    "S3 can replace a shared file system for any application.",
    "S3 is object storage accessed through APIs. Applications that need POSIX semantics such as file locking or in-place edits need a real file system such as EFS or FSx."
   ]
  ],
  "tryit": [
   [
    "Copperline Studios has three needs: 300 Linux render nodes that must read source assets stored in S3 at very high throughput, Windows editors who need a mapped drive with their existing Active Directory group permissions, and Linux web servers in three AZs that share uploaded thumbnails. Which file system fits each, and why?",
    "FSx for Lustre linked to the S3 bucket for the render nodes, since it presents objects as files at high parallel throughput. FSx for Windows File Server for the editors, because it uses SMB with Active Directory and NTFS permissions. A Regional EFS file system for the web servers, which mount it over NFS from every AZ and pay only for what they store."
   ],
   [
    "After adding a fourth AZ to an Auto Scaling group, new Linux instances there hang when mounting the existing EFS file system, while instances in the original AZs work. What do you check first?",
    "Whether the file system has a mount target in a subnet of the new AZ, and whether that mount target's security group allows inbound NFS on port 2049 from the new instances' security group. Without a mount target in the AZ, clients there cannot reach the file system efficiently."
   ]
  ],
  "tip": "Linux shared files: EFS. Windows or SMB with Active Directory: FSx for Windows File Server. HPC or ML throughput, especially with S3 data: FSx for Lustre. NetApp features or NFS plus SMB plus iSCSI together: FSx for NetApp ONTAP.",
  "check": [
   [
    "A Windows .NET application needs a shared drive with NTFS permissions from Active Directory. Which service?",
    "Amazon FSx for Windows File Server, which uses SMB and integrates with Active Directory."
   ],
   [
    "Which file system can present an S3 bucket's objects as files for a machine learning training job?",
    "Amazon FSx for Lustre, linked to the S3 bucket as a data repository."
   ],
   [
    "A company needs Linux and Windows clients to access the same data over NFS and SMB, and wants SnapMirror replication. Which service?",
    "Amazon FSx for NetApp ONTAP, which serves multiple protocols and supports ONTAP features such as SnapMirror."
   ],
   [
    "EC2 instances in a new AZ cannot mount an existing EFS file system. What is a likely cause?",
    "There is no mount target in that AZ, or its security group does not allow NFS traffic on port 2049."
   ],
   [
    "Which FSx option fits a company migrating from on-premises ZFS file servers?",
    "Amazon FSx for OpenZFS, built for workloads moving from ZFS or other Linux NFS file servers."
   ]
  ]
 },
 {
  "t": "S3 performance: prefixes, multipart upload, byte-range fetches and S3 Transfer Acceleration",
  "hook": "It is the last day of the festival, and the crew at Tidewater Films is trying to get 40 GB of raw footage from a hotel in another continent to the editing bucket back home. The upload has failed at 93 percent three times, and each retry starts from zero. Back at headquarters, Marcus is staring at a different problem: the ingest service that writes sensor files to the same account keeps logging `503 Slow Down` errors every morning at 6 a.m. Both teams are convinced S3 is 'too slow'. Is it, or are they just using it the wrong way?",
  "simple": "Amazon S3 is a giant online storage locker for files of any size. It can handle an enormous number of requests, but a few habits make it much faster. First, S3 counts traffic per 'folder path' in a file's name, so spreading files across many paths lets it handle more at once, like opening more checkout lanes. Second, a huge file can be cut into pieces that upload side by side, so if one piece fails you resend only that piece, not the whole thing. Third, you can download different chunks of one file at the same time. Fourth, people far away can send files to the nearest AWS entry point and let AWS's private network carry them the rest of the way, like using an express highway instead of back roads.",
  "body": [
   "Amazon Simple Storage Service (S3) scales to huge request rates automatically, but knowing how it scales lets you design around the limits instead of discovering them in production. S3 supports at least 3,500 PUT, COPY, POST or DELETE requests and 5,500 GET or HEAD requests per second per prefix in a bucket. A prefix is the part of the object key before the object name, such as `logs/2026/09/` in `logs/2026/09/app.log`. There is no limit on the number of prefixes, so spreading requests across many prefixes multiplies the achievable rate: ten prefixes can support roughly ten times the requests of one.",
   "S3 scales its internal partitions gradually as load grows. A sudden, very large burst against one prefix may briefly receive HTTP 503 Slow Down responses while S3 adapts. Clients should retry with exponential backoff, which the AWS SDKs do by default. Design matters too: key names that put a date first under one fixed prefix concentrate all of today's writes in one place, while including a meaningful high-cardinality component, such as a customer or device ID, in the prefix spreads them out.",
   "Large objects need a different approach. A single PUT can upload an object up to 5 GB, but multipart upload splits an object into parts that upload independently and in parallel, and S3 assembles them when you complete the upload. AWS recommends multipart upload for objects over about 100 MB, and it is required above 5 GB; exam questions have long quoted 5 TB as the maximum object size. If a part fails, only that part is retried, which matters on unreliable links. The AWS Command Line Interface (CLI) high-level command `aws s3 cp bigfile.mov s3://media-bucket/raw/` uses multipart upload automatically for large files. Incomplete multipart uploads keep their parts and are billed until completed or aborted, so a lifecycle rule to abort incomplete uploads after a few days is good practice.",
   "Downloads have a mirror feature: byte-range fetches. Using the HTTP `Range` header, a client requests a specific range of bytes, and several ranges can download in parallel for higher aggregate throughput. It also lets an application read only the part of a large file it needs, such as a file header or index, and a failed range can be retried alone. Distance matters as well. S3 Transfer Acceleration speeds up long-distance uploads and downloads by routing them through the nearest Amazon CloudFront edge location and then across the AWS backbone network to the bucket. You enable it on the bucket and use the distinct accelerate endpoint, `bucketname.s3-accelerate.amazonaws.com`, or `--endpoint-url` with the CLI. There is an additional per-GB charge, applied only when acceleration actually improves the transfer.",
   "Measuring comes before tuning. Amazon CloudWatch can publish optional S3 request metrics for a bucket or a filtered prefix, including request counts, `4xxErrors`, `5xxErrors` and first-byte latency, so you can see whether 503 responses cluster on one prefix at one time of day. S3 server access logs and AWS CloudTrail data events record individual requests if you need to find which client is sending the burst. For Transfer Acceleration, AWS provides a speed comparison tool that tests accelerated and non-accelerated transfers from your location, which helps you decide whether the extra charge is worth it before changing every client. Finally, check the client itself: the AWS SDKs and the CLI expose settings for multipart threshold, part size and the number of concurrent requests, and a single-threaded uploader will never use the bandwidth S3 can absorb.",
   "Consider a worked example. Film studios on three continents upload multi-gigabyte raw footage to a bucket in one Region, and uploads are slow and often fail near the end. The architect enables Transfer Acceleration on the bucket so long-distance hops ride the AWS backbone, and switches the upload tool to multipart upload with parallel parts, so each network failure retries one part instead of the entire file. A lifecycle rule aborts incomplete uploads after seven days. On the processing side, a transcoding service reads each file with parallel byte-range GET requests to saturate its network link, and output keys are spread across prefixes by studio and project.",
   "Common mistakes: believing S3 needs randomized key names (that was old advice; today you simply use more prefixes); uploading multi-gigabyte files with a single PUT and restarting the whole file on failure; forgetting that incomplete multipart uploads are billed; and choosing Transfer Acceleration for users who are already close to the bucket's Region, where it adds little. Another trap is tuning S3 when the real need is to serve popular content to many readers, where CloudFront caching is the better answer, or to query part of the data inside objects, where Amazon Athena avoids downloading whole files. For huge numbers of tiny files, batching them into larger objects reduces per-request overhead.",
   "Exam wording usually points straight at the feature. 'Global users uploading to a single bucket', 'long distances' or 'use the AWS backbone' points to S3 Transfer Acceleration. 'Large files', 'unreliable network', 'resume failed uploads' or 'objects larger than 5 GB' points to multipart upload. 'Download part of an object' or 'parallel downloads' points to byte-range fetches. '503 Slow Down' or 'higher request rate' points to spreading keys across more prefixes and retrying with backoff. 'Many users repeatedly reading the same objects' points to CloudFront."
  ],
  "analogy": "Think of S3 as a huge supermarket. Each prefix is a checkout lane with a speed limit; if everyone queues at one lane, people wait, so you open more lanes by spreading keys across prefixes. Multipart upload is splitting a giant shopping trip across several carts that check out in parallel, and if one cart's card is declined you redo only that cart. Transfer Acceleration is a shuttle bus from your neighborhood that drives on a private road to the store. The analogy stops at limits: S3 lanes scale up automatically over time, which no real supermarket does.",
  "terms": [
   [
    "Prefix",
    "The leading part of an S3 object key; request rate guidance applies per prefix."
   ],
   [
    "Multipart upload",
    "Uploading an object in independently transferred parts that S3 then assembles; required above 5 GB."
   ],
   [
    "Byte-range fetch",
    "Downloading a specific range of bytes of an object with the HTTP Range header, often in parallel."
   ],
   [
    "S3 Transfer Acceleration",
    "A bucket feature that routes transfers through CloudFront edge locations over the AWS backbone."
   ],
   [
    "503 Slow Down",
    "An S3 response indicating the request rate temporarily exceeds what the prefix can handle; clients should retry with backoff."
   ],
   [
    "Exponential backoff",
    "A retry strategy that waits progressively longer between attempts to let a service recover."
   ],
   [
    "Transfer Acceleration endpoint",
    "The distinct bucketname.s3-accelerate.amazonaws.com endpoint clients must use for accelerated transfers."
   ],
   [
    "Lifecycle rule to abort incomplete uploads",
    "An S3 lifecycle action that deletes parts of multipart uploads not completed within a set number of days."
   ]
  ],
  "example": "Film studios on three continents upload multi-gigabyte raw footage to a bucket in one Region, and uploads are slow and often fail. The architect enables S3 Transfer Acceleration, and the upload tool switches to multipart upload with parallel parts, so each failure only retries one part and the long-distance hops use the AWS backbone. A lifecycle rule aborts incomplete uploads after seven days so abandoned parts do not accumulate charges.",
  "mistakes": [
   [
    "S3 key names must be randomized, for example with hash prefixes, to get good performance.",
    "That was older guidance. Today request rates scale per prefix, so you add meaningful prefixes, such as a customer or device ID, to spread load. Random hashing is not required."
   ],
   [
    "A single PUT is fine for any file size if the network is good.",
    "A single PUT is limited to 5 GB, and a failure means starting over. Multipart upload is required above 5 GB, recommended from about 100 MB, and retries only failed parts."
   ],
   [
    "Transfer Acceleration speeds up every S3 transfer.",
    "It helps long-distance transfers by entering the AWS network at a nearby edge location. Clients close to the bucket's Region see little gain; you are charged only when it actually improves the transfer."
   ],
   [
    "Many users downloading the same popular objects is an S3 tuning problem.",
    "Repeated reads of the same content are best served by CloudFront caching at edge locations, which also reduces requests to S3."
   ]
  ],
  "tryit": [
   [
    "Tidewater Films' crews upload 20 to 60 GB files from hotels on three continents to a bucket in one Region. Uploads are slow and often fail late, forcing full restarts. The finance team also wonders why the S3 bill includes storage they cannot see in the bucket listing. What three changes do you recommend?",
    "Enable S3 Transfer Acceleration and have clients use the accelerate endpoint, so long-distance hops ride the AWS backbone. Use multipart upload with parallel parts so a failure retries only one part. Add a lifecycle rule that aborts incomplete multipart uploads after a few days, because abandoned parts are invisible in normal listings but still billed."
   ],
   [
    "An analytics service needs only the first 64 KB header of millions of large video files to extract metadata. Downloading whole files takes hours. What S3 feature solves this?",
    "Byte-range fetches. The service sends GET requests with an HTTP `Range` header for just the header bytes, transferring a tiny fraction of each object, and can run many in parallel."
   ]
  ],
  "tip": "Global users uploading to one bucket over long distances: Transfer Acceleration. Large files and unreliable networks: multipart upload. Faster parallel downloads or reading part of a file: byte-range fetches. Higher request rates: more prefixes.",
  "check": [
   [
    "An application writes 12,000 objects per second under one prefix and gets 503 errors. What design change helps?",
    "Spread the keys across multiple prefixes so the request rate per prefix stays within S3's per-prefix rates, and retry with exponential backoff."
   ],
   [
    "What is the largest object you can upload in a single PUT?",
    "5 GB. Larger objects require multipart upload, which AWS recommends from about 100 MB."
   ],
   [
    "Why add a lifecycle rule to abort incomplete multipart uploads?",
    "Parts of uploads that were never completed or aborted remain stored and billed, invisible in normal object listings."
   ],
   [
    "Users in the same Region as the bucket ask for Transfer Acceleration. Is it likely to help?",
    "Probably not much; it helps long-distance transfers by using nearby edge locations and the AWS backbone, and you pay extra only when it improves speed."
   ],
   [
    "Which endpoint must clients use to benefit from S3 Transfer Acceleration?",
    "The bucket's accelerate endpoint, bucketname.s3-accelerate.amazonaws.com, or the equivalent SDK or CLI setting; the normal endpoint is not accelerated."
   ]
  ]
 },
 {
  "t": "Caching: ElastiCache for Redis vs Memcached, DynamoDB Accelerator (DAX), lazy loading vs write-through",
  "hook": "Flash sale at Juniper Lane Books starts in ten minutes, and last time the product pages took six seconds to load because every visitor's request hit the database for the same 200 bestsellers. Lena, the lead developer, has added a cache, and the pages are fast in testing. Then a customer emails: the price she saw in her cart was yesterday's. Meanwhile the mobile team, whose data lives in DynamoDB, asks for 'the same speed-up' without rewriting their app, and the leaderboard team wants their rankings to survive a server failure. One word, cache, three different answers. Which ones, and how do you stop serving stale prices?",
  "simple": "A cache is a small, very fast storage spot for answers you have looked up recently, so you do not have to look them up again the slow way. Think of keeping your most used spices on the counter instead of walking to the pantry every time. AWS offers a few kinds. One is feature-rich and can keep a backup copy, so a broken server does not lose everything. Another is simpler and just stores keys and values as fast as possible. A third is built only for one AWS database, DynamoDB, and works with almost no code changes. You also decide when to fill the cache: only when someone asks for something, or every time the data changes.",
  "body": [
   "A cache keeps frequently read data in fast memory so that repeated requests do not hit a slower database. That lowers latency, often from milliseconds to microseconds, and reduces load and cost on the database, because fewer reads reach it and it can often be a smaller size. Caching works best for data that is read far more often than it changes, such as product catalogs, user profiles and session data. The exam asks two kinds of question: which cache service fits, and which caching strategy fits.",
   "Amazon ElastiCache is a managed in-memory cache. ElastiCache for Redis OSS, and Valkey, the open source engine derived from Redis that ElastiCache also supports, is feature-rich: advanced data structures such as sorted sets (ideal for leaderboards), hashes and lists; replication with automatic failover in Multi-AZ configurations; persistence with backups and restores; publish-subscribe (pub/sub) messaging; and cluster mode to shard data across nodes. Use it for session stores, leaderboards, rate limiting and any cache that must survive a node failure. ElastiCache for Memcached is simpler: a multi-threaded, pure key-value cache that scales out by adding nodes, with no replication, no persistence and no backups. Use it when you need a simple, horizontally scaled cache and losing cached data on node failure is acceptable. ElastiCache also offers a serverless option that scales capacity automatically.",
   "DynamoDB Accelerator (DAX) is an in-memory cache designed only for Amazon DynamoDB. It is API-compatible with DynamoDB, so an application switches from the DynamoDB client to the DAX client with minimal code changes, and read latency drops from single-digit milliseconds to microseconds for eventually consistent reads. DAX runs as a cluster inside your virtual private cloud (VPC). It is the answer when a question asks for microsecond reads on DynamoDB with little code change. It does not help write-heavy workloads, and strongly consistent reads pass straight through to DynamoDB.",
   "Two caching strategies appear often. Lazy loading, also called cache-aside, means the application checks the cache first; on a hit it returns the value, and on a miss it reads from the database and writes the result to the cache. Only requested data is cached and a failed cache node is not fatal, but a miss costs three trips and data can become stale. Write-through means the application writes to the cache every time it writes to the database, so cached data is always current, but every write pays extra latency and the cache fills with data that may never be read. Many designs combine both and add a time to live (TTL) on keys so stale data expires. The lazy loading pattern with a TTL looks like this in Python.",
   "```python\nv = cache.get(key)\nif v is None:\n    v = db.query(key)\n    cache.set(key, v, ex=300)  # 5-minute TTL\nreturn v\n```",
   "Once a cache is running, you judge it by numbers rather than feelings. ElastiCache publishes Amazon CloudWatch metrics such as `CacheHits`, `CacheMisses` and `Evictions`. A low hit ratio means most requests still reach the database, perhaps because keys are too specific or TTLs too short. Rising evictions mean the cache is full and is discarding items to make room, so either the nodes are too small or the cache holds data nobody reads, which is a common side effect of write-through without a TTL. Security matters as well: caches run inside your virtual private cloud, are reached through security groups, and Redis OSS and Valkey support encryption in transit and at rest plus authentication, which you should enable for session data or anything personal.",
   "Consider a worked example. A gaming company stores player profiles in DynamoDB and keeps its global leaderboard in ElastiCache for Redis OSS using a sorted set, where adding a score and reading the top 100 players are single fast commands. It enables Multi-AZ with a replica so the leaderboard survives a node failure. When profile reads spike during tournaments, it adds DAX in front of the profile table, changing only the client library. For its web session data it uses the same Redis cluster, so a user's session is not lost if one web server is replaced. Product descriptions are loaded lazily with a one-hour TTL, while player balances, which must always be current, are written through.",
   "Common mistakes: choosing Memcached when the question needs high availability, backups or sorted sets; expecting DAX to speed up writes or strongly consistent reads; adding a cache for data where every query is unique, which gives a poor hit ratio (a read replica may suit better); and forgetting TTLs, so lazy-loaded data stays stale indefinitely. Another trap is assuming a cache is a durable database; unless persistence and replication are configured, cached data can disappear. Caching also exists elsewhere: Amazon API Gateway can cache responses, and CloudFront caches content at the edge.",
   "Exam questions tend to follow recognizable clues. 'Leaderboard', 'sorted sets', 'pub/sub', 'persistence', 'Multi-AZ failover' or 'session store that must survive failure' points to ElastiCache for Redis OSS or Valkey. 'Simple', 'multi-threaded', 'key-value only' and 'data loss acceptable' points to Memcached. 'DynamoDB', 'microseconds' and 'minimal code changes' points to DAX. 'Cache must never be stale' points to write-through; 'only cache what is requested' or 'tolerates cache failure' points to lazy loading, with a TTL to limit staleness."
  ],
  "analogy": "Lazy loading is like a librarian who fetches a book from the basement only when someone asks, then keeps it on the front desk; the desk holds only popular books, but a book on the desk might be an old edition. Write-through is like a publisher that sends every new edition straight to the front desk the moment it prints; the desk is always current but fills with books nobody requests. A TTL is a sticky note saying 'return to the basement after an hour'. DAX is a front desk that only serves one particular library, DynamoDB.",
  "terms": [
   [
    "ElastiCache for Redis OSS",
    "A managed in-memory data store with rich data types, replication, persistence and Multi-AZ failover; Valkey is a compatible engine option."
   ],
   [
    "ElastiCache for Memcached",
    "A managed, multi-threaded key-value cache without replication or persistence."
   ],
   [
    "DAX",
    "DynamoDB Accelerator, an API-compatible in-memory cache for DynamoDB with microsecond read latency."
   ],
   [
    "Lazy loading",
    "A caching strategy that loads data into the cache only after a cache miss; also called cache-aside."
   ],
   [
    "Write-through",
    "A caching strategy that updates the cache whenever the database is written, keeping cached data current."
   ],
   [
    "Time to live (TTL)",
    "An expiry time on a cached item after which it is removed and reloaded on the next request."
   ],
   [
    "Cache hit ratio",
    "The share of requests served from the cache rather than the backing database."
   ],
   [
    "Eviction",
    "Removal of items from a full cache to make room for new ones, a sign the cache may be undersized or holding unneeded data."
   ],
   [
    "Cluster mode",
    "An ElastiCache for Redis OSS and Valkey setting that shards data across multiple node groups to scale beyond one node's memory."
   ]
  ],
  "example": "A gaming company stores player profiles in DynamoDB and its global leaderboard in ElastiCache for Redis OSS using a sorted set, with a Multi-AZ replica so the leaderboard survives a node failure. When profile reads spike during tournaments, it adds DAX in front of the table, changing only the client library, and read latency drops to microseconds without touching the table's capacity settings.",
  "mistakes": [
   [
    "Memcached is fine for a session store that must survive a node failure.",
    "Memcached has no replication or persistence, so a failed node loses its data. Use ElastiCache for Redis OSS or Valkey with replicas and Multi-AZ automatic failover."
   ],
   [
    "DAX speeds up DynamoDB writes and strongly consistent reads.",
    "DAX accelerates eventually consistent reads. Strongly consistent reads pass through to DynamoDB, and writes still go to the table, so write-heavy workloads gain little."
   ],
   [
    "Write-through means you never need a TTL.",
    "Write-through keeps updated items current, but the cache still fills with data that may never be read. A TTL limits staleness for lazy loading and clears unused items in both patterns."
   ],
   [
    "Adding a cache always helps database performance.",
    "A cache helps only when the same data is read repeatedly. If nearly every query is unique, the hit ratio stays low, and a read replica or better indexing may be the right fix."
   ]
  ],
  "tryit": [
   [
    "Juniper Lane Books caches product details with lazy loading and no expiry. After a price change in the database, customers keep seeing old prices for days. Product descriptions rarely change, but prices change several times a day and must be accurate in the cart. How do you redesign the caching?",
    "Add a TTL to lazily loaded items so stale entries expire, using a longer TTL for descriptions. For prices, use write-through, updating the cache whenever the database price changes, so reads are always current. Combining the strategies gives fast reads for everything and fresh data where accuracy matters."
   ],
   [
    "A mobile game stores player profiles in DynamoDB. During tournaments, eventually consistent profile reads spike and the team needs microsecond latency. They want to avoid rewriting their data access code or adding a separate caching layer they must keep in sync. What do you recommend?",
    "DynamoDB Accelerator (DAX). It is API-compatible with DynamoDB, so the app swaps to the DAX client with minimal changes, and eventually consistent reads drop to microseconds without the application managing cache population."
   ]
  ],
  "tip": "Leaderboards, pub/sub, persistence or high availability: Redis OSS or Valkey. Simplest multi-threaded key-value cache: Memcached. Microsecond reads for DynamoDB with minimal code change: DAX. Always-fresh cache at the cost of write latency: write-through.",
  "check": [
   [
    "Which caching strategy can serve stale data, and how do you limit it?",
    "Lazy loading, because the cache is only refreshed on a miss. Set a TTL on cached items so they expire and are reloaded."
   ],
   [
    "Would DAX help an application that mostly does strongly consistent reads?",
    "No. DAX passes strongly consistent reads through to DynamoDB; it accelerates eventually consistent reads."
   ],
   [
    "A session store must survive the loss of a cache node. Redis OSS or Memcached?",
    "ElastiCache for Redis OSS (or Valkey) with replication and Multi-AZ automatic failover; Memcached has no replication."
   ],
   [
    "What is the main drawback of write-through caching?",
    "Every write pays extra latency to update the cache, and the cache fills with data that may never be read."
   ],
   [
    "CloudWatch shows ElastiCache evictions climbing steadily. What does it suggest?",
    "The cache is full and discarding items; consider larger or more nodes, shorter TTLs, or caching less unneeded data."
   ]
  ]
 },
 {
  "t": "Content delivery and global networking: CloudFront caching and TTLs vs AWS Global Accelerator",
  "hook": "Two emails land in your inbox at Brightwater Media on the same morning. The first is from the web team: readers in Asia say the news site's photos take forever to load, and the origin servers in Virginia are straining under the same images requested millions of times. The second is from Kenji, who runs the company's new multiplayer quiz game: a large corporate customer's firewall team will only allow traffic to two fixed IP addresses, the game uses UDP, and they want failover between Regions in seconds. Both requests say 'make it faster for global users'. Should they get the same service?",
  "simple": "When users live far from your servers, every request has a long trip across the internet, which is slow and unpredictable. AWS has two ways to shorten the trip. The first, CloudFront, keeps copies of your files, such as pictures and web pages, in buildings near your users. When someone asks for a picture, the nearby building hands over its copy instead of fetching it from far away, like a local branch library lending a popular book. The second, Global Accelerator, does not keep copies at all. It gives your app two permanent addresses, lets users step onto AWS's private network at the nearest entrance, and then drives them on a fast private highway to whichever of your servers is healthy.",
  "body": [
   "Users far from your AWS Region experience latency simply because of distance and the many internet hops in between, and the public internet adds unpredictable congestion. AWS has two services that bring users onto the AWS global network close to where they are: Amazon CloudFront and AWS Global Accelerator. Both use AWS edge locations, both improve performance for distant users, and both integrate with AWS Shield for distributed denial of service (DDoS) protection, which is why telling them apart is a classic exam item.",
   "CloudFront is a content delivery network (CDN). It caches content at edge locations worldwide, so repeat requests are answered near the user without going back to the origin. Origins can be S3 buckets, Application Load Balancers (ALBs), EC2 instances, API Gateway or any HTTP server. Cache behaviors map URL path patterns, such as `/images/*` or `/api/*`, to origins and settings. For an S3 origin, origin access control (OAC) lets CloudFront read a private bucket so users cannot bypass the distribution. CloudFront also accelerates dynamic content over persistent connections, supports signed URLs and signed cookies for private content, and runs code at the edge with CloudFront Functions and Lambda@Edge.",
   "Caching is controlled by a cache policy. The policy defines the cache key, meaning which headers, cookies and query strings make a response unique, and the time to live (TTL) settings: minimum, default and maximum times an object stays cached. The origin can influence TTL with `Cache-Control` or `Expires` headers within those limits; for example `Cache-Control: max-age=86400` asks for one day. Including too many values in the cache key lowers the cache hit ratio, because otherwise identical responses are stored separately, so forward only what the origin really needs (an origin request policy can send extra values to the origin without adding them to the key). To remove content before it expires you can create an invalidation, such as `aws cloudfront create-invalidation --distribution-id E123 --paths '/css/*'`, but versioned file names such as `app.v2.js` are better, because a new name is a new cache key and old versions stay consistent.",
   "You can see caching at work directly. Every CloudFront response carries an `X-Cache` header reading `Hit from cloudfront` or `Miss from cloudfront`, and the distribution's reports in the console show the cache hit ratio over time, so a drop after a change to the cache policy is easy to spot. CloudFront also carries security features that often appear in the same exam questions: it integrates with AWS WAF to filter malicious requests at the edge, supports geographic restrictions to block or allow countries, and uses HTTPS between viewers and the edge and, if you configure it, between the edge and the origin. Amazon Route 53 can point your domain at the distribution with an alias record, so users keep a friendly name while CloudFront handles the rest.",
   "AWS Global Accelerator does not cache anything. It gives you two static anycast IP addresses announced from AWS edge locations. Users connect to the nearest edge, and traffic then travels over the AWS backbone to your endpoints, which can be Network Load Balancers (NLBs), ALBs, EC2 instances or Elastic IP addresses in one or more Regions. It works for any TCP or UDP traffic, not just HTTP. Health checks and traffic dials route users to healthy endpoints, failing over between Regions in seconds without waiting for DNS caches to expire, because the IP addresses clients use never change. Endpoint weights let you shift traffic gradually, which helps blue/green deployments.",
   "Consider a worked example. A news site puts CloudFront in front of an S3 bucket for images and an ALB for articles. Images get a one-day TTL, the homepage a 60-second TTL, and the cache key for articles includes only the `lang` query string, which raises the hit ratio sharply and cuts origin load. Its sister company runs a multiplayer game over UDP in three Regions. It uses Global Accelerator so players connect to two fixed IP addresses and are routed to the nearest healthy Region; when one Region has an outage, traffic moves to the next within seconds, and corporate customers who allowlist the two IP addresses need no firewall changes.",
   "Common mistakes: choosing CloudFront for UDP game traffic or for a requirement of fixed IP addresses (CloudFront uses changing edge IPs behind DNS names); choosing Global Accelerator for cacheable static files (it has no cache); relying on invalidations for every deployment instead of versioned file names; and forwarding all headers and cookies to the origin, which destroys the cache hit ratio. Another trap is confusing Global Accelerator with Route 53 latency routing: Route 53 answers DNS queries and depends on clients respecting TTLs, while Global Accelerator keeps the same IPs and moves traffic behind them.",
   "Exam wording is usually decisive. 'Cache', 'static content', 'images and video', 'reduce load on the origin' or 'TTL' points to CloudFront. 'Static IP addresses', 'allowlist', 'UDP', 'non-HTTP protocols such as MQTT or VoIP', 'deterministic, fast multi-Region failover' or 'no DNS caching delays' points to Global Accelerator. 'Users receive old content after a deployment' points to an invalidation or, better, versioned object names. 'Private S3 content only through the CDN' points to CloudFront with origin access control, plus signed URLs or cookies when access is per user."
  ],
  "analogy": "CloudFront is a chain of corner shops that stock copies of the most popular goods from the central warehouse, so most customers never travel to the warehouse; the TTL is the 'sell by' date before a shop checks for a fresher copy. Global Accelerator is a private toll road with two fixed on-ramps near every town: it carries your traffic, whatever it is, quickly to the nearest open warehouse, but it stocks nothing. The analogy stops at protocols: corner shops only sell HTTP goods, while the toll road carries any TCP or UDP vehicle.",
  "terms": [
   [
    "Edge location",
    "An AWS site close to users where CloudFront caches content and Global Accelerator accepts traffic."
   ],
   [
    "Cache key",
    "The combination of URL and selected headers, cookies and query strings that identifies a unique cached object."
   ],
   [
    "TTL",
    "Time to live: how long CloudFront keeps an object in cache before checking the origin again."
   ],
   [
    "Invalidation",
    "A CloudFront request to remove objects from edge caches before their TTL expires."
   ],
   [
    "Origin access control (OAC)",
    "A CloudFront feature that lets a distribution read a private S3 bucket so users cannot access the bucket directly."
   ],
   [
    "AWS Global Accelerator",
    "A service providing two static anycast IP addresses that route TCP and UDP traffic over the AWS backbone to healthy endpoints."
   ],
   [
    "Anycast IP",
    "An IP address announced from many locations at once, so each client reaches the nearest one."
   ],
   [
    "Cache policy",
    "CloudFront settings that define the cache key and the minimum, default and maximum TTL for a cache behavior."
   ],
   [
    "Traffic dial",
    "A Global Accelerator setting that controls the percentage of traffic sent to an endpoint group in a Region."
   ]
  ],
  "example": "A news site's images and articles are cached by CloudFront with a one-day TTL for images and a short TTL for the homepage, which cuts origin load dramatically. Its sister company runs a multiplayer game over UDP in three Regions and uses Global Accelerator, so players connect to two fixed IP addresses and are routed to the nearest healthy Region, failing over in seconds without DNS changes.",
  "mistakes": [
   [
    "CloudFront is the answer whenever users need fixed IP addresses to allowlist.",
    "A standard CloudFront distribution is reached through DNS names whose edge IP addresses can change. Two static anycast IP addresses for allowlisting is the signature of Global Accelerator."
   ],
   [
    "Global Accelerator will reduce origin load for static images.",
    "Global Accelerator has no cache; every request still reaches your endpoints. Reducing origin load for cacheable content is CloudFront's job."
   ],
   [
    "Forwarding all headers and cookies to the origin makes CloudFront more accurate with no downside.",
    "Every value in the cache key creates separate cached copies, so the hit ratio falls and origin load rises. Include only what the origin needs, and use an origin request policy to pass extra values without adding them to the key."
   ],
   [
    "Global Accelerator and Route 53 latency routing are interchangeable.",
    "Route 53 answers DNS queries, so failover depends on clients honoring DNS TTLs. Global Accelerator keeps the same IP addresses and shifts traffic behind them in seconds."
   ]
  ],
  "tryit": [
   [
    "Kenji's quiz game runs over UDP in two Regions. A corporate customer will open its firewall only to two fixed IP addresses, and the business wants players moved to the healthy Region within seconds if one Region fails, without waiting for DNS changes. Which service fits, and why not the other?",
    "AWS Global Accelerator. It provides two static anycast IP addresses, supports UDP, and fails over between endpoint groups using health checks without relying on DNS. CloudFront is designed for HTTP content and caching and does not carry arbitrary UDP game traffic."
   ],
   [
    "After a deployment, some Brightwater readers still receive the old `site.css` for hours, while others see the new one. The file name never changes between releases. What is the best long-term fix, and what is the quick fix?",
    "The quick fix is a CloudFront invalidation for `/site.css` or `/css/*`. The better long-term fix is versioned file names such as `site.v42.css`, because each release then has a new cache key, every user gets a consistent version, and no invalidation is needed."
   ]
  ],
  "tip": "Caching and HTTP content means CloudFront. Static IP addresses, UDP or other non-HTTP traffic, or instant regional failover without relying on DNS means Global Accelerator.",
  "check": [
   [
    "Customers must allowlist exactly two IP addresses for an API served from two Regions. Which service?",
    "AWS Global Accelerator, which provides two static anycast IP addresses for endpoints in multiple Regions."
   ],
   [
    "You deployed a new CSS file with the same name, but users still get the old one. What are two fixes?",
    "Create a CloudFront invalidation for the path, or use versioned file names so the new file has a new cache key."
   ],
   [
    "Why can adding every cookie to the cache key hurt performance?",
    "Each unique cookie combination creates a separate cached copy, lowering the cache hit ratio and sending more requests to the origin."
   ],
   [
    "Does Global Accelerator cache content at the edge?",
    "No. It routes TCP and UDP traffic over the AWS backbone to healthy endpoints; caching is CloudFront's job."
   ],
   [
    "Which response header shows whether a CloudFront request was served from the edge cache?",
    "The `X-Cache` header, which reads Hit from cloudfront or Miss from cloudfront."
   ]
  ]
 },
 {
  "t": "Choosing a database: RDS, Aurora, DynamoDB, Redshift, DocumentDB, Neptune, and RDS Proxy for connection pooling",
  "hook": "The architecture review at Fernhill Market starts in an hour, and the whiteboard is crowded. The checkout service runs on PostgreSQL and keeps crashing with 'too many connections' whenever a promotion launches its serverless functions. The analytics team wants five years of sales history queried without slowing checkout. The product team wants 'customers who bought this also bought' recommendations, and a newly acquired company brings a MongoDB application with it. Your manager, Tomas, has one request: 'Tell me which database each of these belongs in, and why we should not just put everything in one big relational database.' What do you say?",
  "simple": "Databases are like different kinds of storage furniture. A filing cabinet with labeled folders and cross-references (a relational database) is great when records relate to each other and every change must be exact, like bank transfers. A wall of numbered lockers (a key-value database) is perfect when you just need to grab one item by its number, very fast, millions of times a second. A warehouse built for counting and summarizing (a data warehouse) is best for big reports over years of history. A map of who knows whom (a graph database) answers questions about connections, like friends of friends. AWS offers each type as a managed service, and the trick is to match the furniture to how you will use it.",
  "body": [
   "AWS takes a purpose-built approach to databases: rather than forcing one database to do everything, you pick the engine that fits the data model and access pattern. A relational database is excellent at joins and transactions but awkward at massive key-value scale; a key-value store is the reverse. Exam questions usually give you clues, such as joins and transactions, key-value lookups at huge scale, analytics over years of data, JSON documents or relationships between entities, and expect you to map them to a service. Learning those clues is most of the work.",
   "Amazon Relational Database Service (RDS) runs familiar relational engines (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server and Db2) as managed services, handling patching, backups, Multi-AZ failover and read replicas. Choose it for structured data with SQL, joins and ACID (atomicity, consistency, isolation, durability) transactions, especially when an application already expects a specific engine or needs a commercial one such as Oracle or SQL Server. Amazon Aurora is AWS's cloud-native relational engine compatible with MySQL and PostgreSQL. Its distributed storage layer keeps six copies of data across three Availability Zones (AZs), it supports up to 15 low-lag read replicas with fast failover, and it offers options such as Aurora Serverless v2 and Aurora Global Database for cross-Region reads and disaster recovery. Choose Aurora when you want higher performance and availability than standard RDS with MySQL or PostgreSQL compatibility.",
   "Amazon DynamoDB is a serverless key-value and document NoSQL database with single-digit millisecond performance at any scale, no servers to manage, and features such as global tables for multi-Region active-active replication, DynamoDB Streams for change events and TTL for automatic expiry. Choose it for high-scale web, mobile, gaming and Internet of Things (IoT) workloads with known access patterns, and when a schema-flexible, serverless database is wanted. Amazon Redshift is a columnar data warehouse for online analytical processing (OLAP): complex SQL queries and aggregations over large historical datasets for business intelligence. It is not designed for high-volume, row-by-row online transaction processing (OLTP) updates.",
   "Amazon DocumentDB (with MongoDB compatibility) stores JSON documents and supports MongoDB APIs and drivers, so it is the answer for moving MongoDB workloads to a managed service with minimal code change. Amazon Neptune is a graph database for highly connected data such as social networks, recommendation engines, fraud rings and knowledge graphs, queried with Gremlin, openCypher or SPARQL. Other purpose-built engines you may see include Amazon Keyspaces (for Apache Cassandra), Amazon Timestream for time series data, Amazon MemoryDB as a durable Redis-compatible in-memory database, and Amazon OpenSearch Service for full-text search and log analytics.",
   "RDS Proxy sits between applications and RDS or Aurora and pools and shares database connections. It matters most for serverless designs: thousands of concurrent AWS Lambda functions can each open a connection and exhaust the database's connection limit, and opening connections is itself expensive. The proxy multiplexes many client connections onto fewer database connections, reduces failover time by keeping client connections open while the database fails over, and can enforce AWS Identity and Access Management (IAM) authentication with database credentials stored in AWS Secrets Manager. Applications simply change their connection endpoint to the proxy endpoint. RDS Proxy is not a cache and does not speed up individual queries.",
   "Moving to the right engine is usually a project, not a switch, and AWS provides tools for it. AWS Database Migration Service (DMS) copies data from a source database to a target with minimal downtime by doing a full load and then replicating ongoing changes until you cut over. When the source and target engines differ, for example Oracle to Aurora PostgreSQL, the AWS Schema Conversion Tool (SCT) or DMS schema conversion translates schemas and flags code that needs manual work. Exam questions sometimes combine these: 'migrate an on-premises Oracle database to a cheaper open source compatible engine with minimal downtime' suggests converting the schema, then using DMS with ongoing replication. Keep in mind that read replicas scale reads and Multi-AZ improves availability; neither fixes a connection storm, which is RDS Proxy's role.",
   "Consider a worked example. A startup's serverless API uses Lambda with Aurora PostgreSQL, and during traffic spikes the database runs out of connections and returns errors. Adding RDS Proxy lets thousands of function instances share a small pool of connections, and failovers become faster for the application. For its friend-recommendation feature, the team adds Neptune, because queries such as 'friends of friends who liked this item' are graph traversals that would need many expensive joins in SQL. Nightly sales reporting moves to Redshift so heavy aggregate queries no longer slow the transactional database, and the shopping cart, which needs simple key lookups at huge scale, moves to DynamoDB.",
   "Common mistakes: choosing Redshift for an OLTP application; choosing DynamoDB when the requirement stresses complex joins and ad hoc relational queries; choosing RDS read replicas to fix a connection-exhaustion problem (that is RDS Proxy's job); and choosing ElastiCache when durable storage of record is required. Another trap is picking RDS for Oracle when the question says the company wants to avoid commercial licensing; migrating to Aurora PostgreSQL may be the intended answer.",
   "Exam wording maps cleanly to engines. 'relationships', 'graph' or 'social network' is Neptune; 'MongoDB compatibility' is DocumentDB; 'data warehouse', 'OLAP' or 'petabyte analytics' is Redshift; 'key-value', 'any scale', 'serverless' or 'single-digit millisecond' is DynamoDB; 'MySQL or PostgreSQL compatible with higher performance and availability' is Aurora; 'too many connections from Lambda' is RDS Proxy."
  ],
  "analogy": "Choosing a database is like choosing a vehicle for a delivery business. A delivery van (RDS or Aurora) carries mixed loads with careful paperwork for every package. A fleet of scooters (DynamoDB) zips single small parcels anywhere, at any volume. A freight train (Redshift) moves enormous loads for analysis but is useless for quick single drops. A subway map (Neptune) is built for routes and connections. RDS Proxy is not a vehicle at all: it is the dispatcher who stops a thousand drivers from crowding the loading dock at once.",
  "terms": [
   [
    "OLTP vs OLAP",
    "Online transaction processing handles many small reads and writes; online analytical processing runs large aggregate queries over historical data."
   ],
   [
    "Amazon Aurora",
    "A MySQL- and PostgreSQL-compatible relational engine with distributed storage across three AZs and up to 15 read replicas."
   ],
   [
    "Amazon DynamoDB",
    "A serverless key-value and document NoSQL database with consistent single-digit millisecond performance at any scale."
   ],
   [
    "Amazon Redshift",
    "A managed columnar data warehouse for analytics over large datasets."
   ],
   [
    "Amazon DocumentDB",
    "A managed JSON document database compatible with MongoDB APIs and drivers."
   ],
   [
    "Amazon Neptune",
    "A managed graph database for data defined by relationships between entities."
   ],
   [
    "RDS Proxy",
    "A managed database proxy that pools connections to RDS and Aurora and speeds failover."
   ],
   [
    "ACID transactions",
    "Atomicity, consistency, isolation and durability: guarantees that a group of database changes succeeds or fails as a whole and stays correct."
   ],
   [
    "AWS Database Migration Service (DMS)",
    "A service that migrates data between databases with a full load and ongoing change replication to minimize downtime."
   ]
  ],
  "example": "A startup's serverless API uses Lambda with Aurora PostgreSQL, and during traffic spikes the database runs out of connections. Adding RDS Proxy lets thousands of function instances share a small pool of connections. For its friend-recommendation feature, the team adds Neptune, and for nightly sales reporting it loads data into Redshift so analytical queries no longer compete with customer transactions.",
  "mistakes": [
   [
    "Redshift is a fast database, so use it for an order-entry or checkout application.",
    "Redshift is a columnar OLAP warehouse optimized for large analytical queries. Many small inserts and updates belong in an OLTP database such as RDS, Aurora or DynamoDB."
   ],
   [
    "Add read replicas to fix 'too many connections' errors from Lambda.",
    "Read replicas spread read queries but each still has its own connection limit. RDS Proxy pools and shares connections so many functions use a small number of database connections."
   ],
   [
    "DynamoDB can replace any relational database.",
    "DynamoDB excels at known key-value access patterns at huge scale, but complex joins and ad hoc relational queries point to RDS or Aurora."
   ],
   [
    "RDS Proxy will make slow queries faster.",
    "RDS Proxy pools connections and speeds failover; it is not a cache and does not speed up individual queries. For read performance, consider caching, indexing or read replicas."
   ]
  ],
  "tryit": [
   [
    "Fernhill Market's checkout uses Lambda and Aurora PostgreSQL. During promotions, thousands of concurrent function instances cause connection errors, and each failover drops in-flight requests for too long. The team does not want to rewrite the application. What do you add, and what changes in the code?",
    "Add RDS Proxy in front of the Aurora cluster. It multiplexes many client connections onto a smaller pool of database connections and keeps client connections open during failover, shortening disruption. The only code change is pointing the connection string at the proxy endpoint, optionally with IAM authentication and credentials in Secrets Manager."
   ],
   [
    "The newly acquired company runs a self-managed MongoDB application and wants a managed AWS service with as few code changes as possible. Separately, the fraud team needs to find accounts linked through shared phone numbers and addresses several hops away. Which services fit each requirement?",
    "Amazon DocumentDB (with MongoDB compatibility) for the MongoDB application, because it supports MongoDB APIs and drivers. Amazon Neptune for the fraud team, because multi-hop relationship queries are graph traversals that would need many expensive joins in SQL."
   ]
  ],
  "tip": "Match clues to engines: relationships and graph traversal is Neptune; MongoDB compatibility is DocumentDB; analytics or data warehouse is Redshift; key-value at any scale with serverless operation is DynamoDB; too many connections from Lambda is RDS Proxy.",
  "check": [
   [
    "A company wants to move a self-managed MongoDB database to a managed AWS service with minimal code changes. Which service?",
    "Amazon DocumentDB (with MongoDB compatibility)."
   ],
   [
    "Lambda functions exhaust an RDS database's connections during bursts. What should you add?",
    "RDS Proxy, which pools and shares database connections among many clients."
   ],
   [
    "A fraud team needs to find rings of accounts linked through shared devices and addresses. Which database fits?",
    "Amazon Neptune, a graph database built for traversing relationships between entities."
   ],
   [
    "Why is Redshift a poor fit for an order-entry application?",
    "Redshift is a columnar OLAP warehouse optimized for large analytical queries, not many small transactional inserts and updates."
   ],
   [
    "What is the main difference between RDS read replicas and RDS Proxy?",
    "Read replicas add copies to scale read queries; RDS Proxy pools and shares connections and speeds failover, which is what fixes connection exhaustion."
   ]
  ]
 },
 {
  "t": "DynamoDB performance: partition key design, provisioned vs on-demand capacity, auto scaling and secondary indexes",
  "hook": "Election night at Civic Pulse, a small startup running a live voting app for a regional TV station. At 8:04 p.m. the dashboard turns red: write requests are being throttled. Ravi, the founder, doubles the table's write capacity. Nothing improves. You open the metrics and see something strange: the table as a whole is using less than a third of what it is paying for, yet votes for the two front-runners keep failing. Meanwhile the station's producer wants a new chart of votes by polling station, which nobody planned for. How can a table be idle and overloaded at the same time, and what do you change before the next update goes on air?",
  "simple": "DynamoDB is a very fast database that stores items in many separate drawers. It decides which drawer an item goes in by looking at one field called the partition key. If you choose a key that most items share, such as 'today's date', everything piles into one drawer and that drawer jams while the others sit empty. Good keys, like a customer ID, spread items evenly. You also choose how to pay: reserve a fixed amount of reading and writing power in advance (cheaper for steady traffic), or pay per request with no planning (easier for unpredictable traffic). Finally, indexes are like extra tables of contents that let you look items up by a different field.",
  "body": [
   "Amazon DynamoDB delivers consistent performance at any scale, but only if the table is designed for how it will be accessed. Unlike relational databases, where you normalize entities and write whatever queries you need later, in DynamoDB you design tables around your queries. The exam tests the pieces that make or break that design: the partition key, the capacity mode, auto scaling and secondary indexes.",
   "Every item has a primary key. A simple primary key is just a partition key; a composite primary key adds a sort key, so many items can share a partition key and be ordered by the sort key, such as orders for one customer sorted by date. DynamoDB hashes the partition key to decide which physical partition stores the item, and each partition has a throughput limit. If many requests go to the same partition key value, a hot partition forms and requests are throttled even though the table as a whole has spare capacity. Good partition keys have high cardinality and spread requests evenly, such as a user ID or order ID. Poor ones have few values or concentrate traffic, such as a status field or today's date. When one value is unavoidably hot, write sharding adds a random or calculated suffix to spread it. Adaptive capacity helps absorb some imbalance but does not fix a bad design.",
   "Capacity comes in two modes. Provisioned capacity sets read capacity units (RCUs) and write capacity units (WCUs). One RCU is one strongly consistent read per second, or two eventually consistent reads, of an item up to 4 KB; one WCU is one write per second of an item up to 1 KB. Item sizes round up, and transactional operations use twice the units. Provisioned mode suits predictable traffic and can use auto scaling, which adjusts capacity between a minimum and maximum to track a target utilization, and reserved capacity for further savings. On-demand mode charges per request with no capacity planning and accommodates traffic that ramps quickly, which suits new, unpredictable or spiky workloads. You can switch modes, with limits on how often.",
   "Capacity arithmetic is easier with a habit: round up first, then multiply. For reads, divide the item size by 4 KB and round up; for strongly consistent reads, multiply by the reads per second; for eventually consistent reads, halve the result and round up. For writes, divide the item size by 1 KB and round up, then multiply by writes per second. So 20 reads per second of 9 KB items need three 4 KB units each: 60 RCUs if strongly consistent, or 30 RCUs if eventually consistent. When throttling appears, Amazon CloudWatch shows it through metrics such as `ThrottledRequests` alongside consumed versus provisioned capacity, and CloudWatch Contributor Insights for DynamoDB can list the most accessed and most throttled keys, which is often the quickest way to prove a hot partition.",
   "Secondary indexes enable queries on attributes other than the primary key. A global secondary index (GSI) has its own partition key and optional sort key, can be created or deleted at any time, has its own capacity settings, and supports only eventually consistent reads. A local secondary index (LSI) shares the table's partition key but uses a different sort key, must be created with the table, and supports strongly consistent reads. Indexes project attributes from the table; projecting fewer attributes saves storage and write capacity. An under-provisioned GSI can throttle writes to the base table, so give GSIs enough write capacity. Finally, prefer `Query`, which reads items with one partition key value, over `Scan`, which reads the whole table and consumes capacity for every item it examines. For example: `aws dynamodb query --table-name Orders --key-condition-expression 'CustomerId = :c' --expression-attribute-values '{\":c\":{\"S\":\"C42\"}}'`.",
   "Consider a worked example. A voting app uses the candidate name as the partition key, and on election night the top two candidates' partitions are throttled while the rest of the table sits idle. The team changes writes to use keys like `candidateA#7`, with a random suffix from 1 to 10, and sums the ten shards when reading totals. Because election-night traffic is unpredictable and short-lived, it switches the table to on-demand mode. Later, the product team wants to look up votes by polling station, which is not part of the key, so the team adds a GSI with `StationId` as its partition key, projecting only the attributes the report needs.",
   "Common mistakes: choosing a low-cardinality partition key such as `status` or `country`; assuming more total capacity fixes a hot partition; forgetting that an LSI cannot be added after table creation; expecting strongly consistent reads from a GSI; using `Scan` in a request path where a `Query` or index would do; and miscounting capacity units by not rounding item sizes up. Another trap is forgetting that eventually consistent reads cost half as much, which can halve the RCUs a read-heavy workload needs.",
   "Exam questions are usually worded around symptoms. 'Throttling while overall capacity is unused' points to a hot partition and poor key design, fixed with a better key or write sharding. 'Unknown', 'unpredictable' or 'spiky' traffic points to on-demand; 'steady and predictable' points to provisioned with auto scaling. 'Need to query by a new attribute on an existing table' points to a GSI, because LSIs must be created with the table. 'Same partition key, different sort order, strongly consistent' points to an LSI. Capacity arithmetic questions expect you to round item size up to 4 KB for reads and 1 KB for writes."
  ],
  "analogy": "A DynamoDB table is a post office with many sorting windows, and the partition key decides which window handles each letter. If every letter is addressed to the same street, one clerk drowns while the rest wait, and hiring more clerks overall does not help that window. Write sharding is writing 'Main Street, door 1 to 10' so letters fan out across windows. A GSI is a second sorting system by a different field, run by its own staff. The analogy stops at adaptive capacity: real post offices cannot quietly lend capacity to a busy window.",
  "terms": [
   [
    "Partition key",
    "The key attribute DynamoDB hashes to distribute items across physical partitions."
   ],
   [
    "Sort key",
    "The second part of a composite primary key that orders items sharing a partition key."
   ],
   [
    "Hot partition",
    "A partition receiving a disproportionate share of traffic, causing throttling."
   ],
   [
    "Read capacity unit (RCU)",
    "One strongly consistent or two eventually consistent reads per second of an item up to 4 KB."
   ],
   [
    "Write capacity unit (WCU)",
    "One write per second of an item up to 1 KB."
   ],
   [
    "Global secondary index",
    "An index with a different partition key that can be added anytime and supports eventually consistent reads."
   ],
   [
    "On-demand capacity",
    "A DynamoDB billing mode charging per request with no capacity planning."
   ],
   [
    "Write sharding",
    "Adding a random or calculated suffix to a partition key value to spread writes for a hot value across partitions."
   ],
   [
    "Local secondary index (LSI)",
    "An index with the same partition key and a different sort key, created with the table, that supports strongly consistent reads."
   ]
  ],
  "example": "A voting app uses the candidate name as the partition key, and on election night the top two candidates' partitions are throttled. The team changes writes to use keys like candidateA#7, with a random suffix from 1 to 10, then sums the shards when reading. It also switches the table to on-demand mode because traffic is unpredictable, and adds a GSI keyed on polling station for a new report.",
  "mistakes": [
   [
    "Throttling means the table needs more total capacity.",
    "If throttling occurs while overall capacity is unused, the cause is a hot partition. More capacity does not fix it; a higher-cardinality key or write sharding does."
   ],
   [
    "You can add a local secondary index to an existing table when a new query appears.",
    "LSIs must be created with the table. For a new access pattern on an existing table, add a global secondary index."
   ],
   [
    "A GSI can serve strongly consistent reads like the base table.",
    "GSIs support only eventually consistent reads. If you need strong consistency on an alternate sort order with the same partition key, that is an LSI defined at table creation."
   ],
   [
    "A 3 KB item costs 0.75 RCU per strongly consistent read.",
    "Item sizes round up to the next 4 KB for reads and 1 KB for writes. A 3 KB strongly consistent read costs one RCU, and a 3 KB write costs three WCUs."
   ]
  ],
  "tryit": [
   [
    "Civic Pulse stores votes with the candidate name as the partition key. On election night, writes for the top two candidates are throttled while total consumed capacity stays low. Traffic is extremely spiky and lasts only a few hours each election. What two changes do you make?",
    "Shard the hot keys by appending a suffix, such as `candidateA#1` to `candidateA#10`, and sum the shards when reading totals, so writes spread across partitions. Switch the table to on-demand capacity, which handles unpredictable, short-lived spikes without capacity planning."
   ],
   [
    "A support team needs to look up orders by customer email address, which is not part of the Orders table's key. The table has been in production for a year and the lookups can tolerate slightly stale results. What do you add, and what should you watch for?",
    "Add a global secondary index with email as its partition key, projecting only the attributes the support screen needs. Because the lookups tolerate eventual consistency, a GSI fits. Give the GSI enough write capacity, since an under-provisioned GSI can throttle writes to the base table."
   ]
  ],
  "tip": "Throttling while total capacity is unused points to a hot partition and poor key design. Unknown or spiky traffic points to on-demand; steady, predictable traffic points to provisioned with auto scaling. Need a new query pattern after launch: add a GSI, because LSIs must be created with the table.",
  "check": [
   [
    "How many RCUs are needed for 10 strongly consistent reads per second of 6 KB items?",
    "20. Each 6 KB read rounds up to 8 KB, which is two 4 KB units, so 10 x 2 = 20 RCUs."
   ],
   [
    "You need to query an existing table by email address, which is not part of the key. What do you add?",
    "A global secondary index with email as its partition key, since LSIs can only be created with the table."
   ],
   [
    "How many WCUs are needed to write 5 items per second of 2.5 KB each?",
    "15. Each 2.5 KB write rounds up to 3 KB, which is three 1 KB units, so 5 x 3 = 15 WCUs."
   ],
   [
    "Why is `Scan` usually avoided in a high-traffic request path?",
    "It reads every item in the table and consumes capacity for all of them, while `Query` reads only items with one partition key value."
   ],
   [
    "How many RCUs do 20 eventually consistent reads per second of 9 KB items need?",
    "30. Each 9 KB read rounds up to 12 KB, three 4 KB units; 20 x 3 = 60 for strong consistency, halved to 30 for eventually consistent reads."
   ]
  ]
 },
 {
  "t": "Streaming ingestion: Kinesis Data Streams vs Amazon Data Firehose vs Amazon MSK",
  "hook": "At Rivermile Rides, the live map that shows passengers where their driver is has started lagging by almost a minute during the Friday evening rush. Elena on the platform team checks the ingestion pipeline and finds a mix of tools stitched together over two years: some data goes through one streaming service, some through another, and the payments team insists on keeping its own Kafka setup. The data science team, for their part, only wants tidy files in S3 every few minutes and does not care about the live map at all. Is one of these services wrong, or does each team simply need something different?",
  "simple": "Streaming data is information that never stops arriving, like a river of small messages: taps on an app, readings from sensors, lines in a log file. AWS gives you three main ways to catch that river. One is like a conveyor belt you control: messages wait on the belt for a while, several workers can each take what they need, and you can rewind to reread old messages. Another is like an automatic delivery truck: you pour data in, and it packages it and drops it in a storage bucket or database every few minutes, with nothing to manage. The third runs Apache Kafka, a popular open source streaming tool, for teams that already use it.",
  "body": [
   "Streaming data arrives continuously, such as clickstreams, application logs, Internet of Things (IoT) sensor readings or financial transactions, and often needs to be processed within seconds rather than in a nightly batch. AWS offers three main ingestion services. The exam distinguishes them by how much control you need, whether data must be replayed, whether you already use Apache Kafka, and where the data is going.",
   "Amazon Kinesis Data Streams is a real-time data stream that you read with your own consumers. Producers put records with a partition key, for example `aws kinesis put-record --stream-name rides --partition-key driver-812 --data <base64>`. Records with the same partition key go to the same shard, which preserves ordering within that key. In provisioned mode, each shard supports a fixed write rate (1 MB/s or 1,000 records per second) and read rate (2 MB/s shared by consumers), and you add shards to scale; in on-demand mode Kinesis manages capacity for you. Records are retained for 24 hours by default, extendable up to 365 days, so several consumers can read the same data independently and replay it after a bug fix.",
   "Consumers of Data Streams include AWS Lambda, applications built with the Kinesis Client Library (KCL), and Amazon Managed Service for Apache Flink for real-time analytics such as windowed aggregations and anomaly detection. Enhanced fan-out gives each registered consumer its own dedicated read throughput per shard, so adding consumers does not slow the others. Choose Data Streams for real-time custom processing, multiple independent consumers, per-key ordering and replay.",
   "Watching a stream's health tells you which fix to apply. On a provisioned data stream, producers that exceed a shard's write limit receive `ProvisionedThroughputExceededException`, and the CloudWatch metric `WriteProvisionedThroughputExceeded` counts those events. On the consumer side, `GetRecords.IteratorAgeMilliseconds` shows how far behind the newest record a consumer is reading; if it climbs steadily, consumers cannot keep up, so you add shards, give consumers enhanced fan-out, or speed up the processing code. Capacity planning is simple arithmetic: a producer sending 5 MB/s needs at least five shards for writes in provisioned mode, more if a few partition keys carry most of the traffic, while on-demand mode adjusts for you. Lambda consumers process each shard in batches, and their settings for batch size and parallelism affect how quickly the backlog drains.",
   "Amazon Data Firehose, formerly Kinesis Data Firehose, is the simplest way to load streaming data into storage and analytics destinations. It is fully managed and scales automatically with no shards to plan. It buffers incoming data by size or time and delivers it to Amazon S3, Amazon Redshift (by staging in S3 and issuing a `COPY`), Amazon OpenSearch Service, Splunk, HTTP endpoints and several partner services. It can transform records with a Lambda function, convert JSON to columnar Apache Parquet or ORC formats, partition data dynamically by a field and compress it. Because of buffering, delivery is near real time, typically seconds to minutes, and Firehose does not keep data for replay. Choose it when the requirement is load streaming data into S3, Redshift or OpenSearch with the least operational overhead.",
   "Amazon Managed Streaming for Apache Kafka (MSK) runs Apache Kafka clusters for you, handling broker provisioning, patching and replacement, and MSK Serverless removes capacity management altogether. Choose it when a company already uses Kafka, wants to keep Kafka APIs, client libraries, tools and Kafka Connect connectors, or needs Kafka-specific features such as long retention on topics or particular configuration. It offers more control than Kinesis, at the cost of needing Kafka knowledge.",
   "Consider a worked example. A ride-sharing company streams driver locations into Kinesis Data Streams, using the driver ID as the partition key so each driver's updates stay in order. A Lambda consumer updates the live map within a second, a Flink application detects areas where demand exceeds supply, and a Firehose delivery stream, reading from the same data stream as another consumer, writes compressed, date-partitioned Parquet files to S3 every few minutes for data scientists to query with Athena. The company's payments team, which already runs Kafka on premises with dozens of connectors, moves to MSK instead of rewriting its producers.",
   "Common mistakes: choosing Firehose when the question needs sub-second processing, custom consumers or replay; choosing Data Streams when the only need is to land data in S3 with no code; using a low-cardinality partition key so one shard becomes hot and throws `ProvisionedThroughputExceededException`; and choosing MSK for a new, simple workload with no Kafka requirement, which adds operational knowledge the team may not have. Another trap is thinking Firehose stores data; it only buffers briefly before delivery.",
   "Exam wording usually gives it away. 'Load into S3, Redshift, OpenSearch or Splunk', 'near real time', 'no administration', 'convert to Parquet' points to Amazon Data Firehose. 'Real time', 'custom processing', 'multiple consumers', 'ordering per key' or 'replay' points to Kinesis Data Streams. 'Existing Kafka', 'open source Kafka APIs' or 'Kafka Connect' points to Amazon MSK. 'Real-time analytics with SQL or Java on a stream' points to Managed Service for Apache Flink reading from Data Streams or MSK."
  ],
  "analogy": "Kinesis Data Streams is a recorded radio broadcast: many listeners tune in independently, each at their own pace, and the station keeps recordings so anyone can replay the last day or longer. Amazon Data Firehose is a mail service that collects your letters into bags and drops a bag at the destination every few minutes, with no recordings kept. Amazon MSK is a radio station built on the industry-standard Kafka equipment that your engineers already know how to operate. The analogy stops at ordering: Kinesis keeps order per partition key, not across the whole broadcast.",
  "terms": [
   [
    "Shard",
    "The unit of capacity in a provisioned Kinesis data stream, with fixed read and write throughput."
   ],
   [
    "Partition key (Kinesis)",
    "The value that determines which shard receives a record, preserving order per key."
   ],
   [
    "Retention period",
    "How long Kinesis Data Streams keeps records for reading and replay, 24 hours by default and extendable."
   ],
   [
    "Enhanced fan-out",
    "A Kinesis feature giving each registered consumer dedicated read throughput per shard."
   ],
   [
    "Amazon Data Firehose",
    "A fully managed service that buffers streaming data and delivers it to destinations like S3, Redshift and OpenSearch."
   ],
   [
    "Amazon MSK",
    "Amazon Managed Streaming for Apache Kafka, a managed Kafka service with a serverless option."
   ],
   [
    "Iterator age",
    "A Kinesis consumer metric showing how far behind the latest record a consumer is reading; a rising value means consumers are falling behind."
   ],
   [
    "Buffering hints",
    "Firehose size and time settings that decide how much data accumulates before each delivery to the destination."
   ]
  ],
  "example": "A ride-sharing company streams driver locations into Kinesis Data Streams. A Lambda consumer updates a live map within a second, a Flink application detects surge areas, and Firehose, reading the same stream, writes compressed Parquet files to S3 every few minutes for data scientists to query with Athena. The payments team, which already uses Kafka, moves its existing producers and connectors to Amazon MSK.",
  "mistakes": [
   [
    "Firehose is the right choice for sub-second processing and replaying data.",
    "Firehose buffers before delivery, so it is near real time, and it does not retain data for replay. Real-time custom processing and replay point to Kinesis Data Streams."
   ],
   [
    "Kinesis Data Streams is the simplest way to land streaming data in S3.",
    "Data Streams needs consumers you build or configure. If the only requirement is loading S3, Redshift or OpenSearch with no code, Firehose is simpler."
   ],
   [
    "Adding shards always fixes throughput errors.",
    "If a low-cardinality partition key sends most records to one shard, that shard stays hot. Use a well-distributed partition key as well as enough shards or on-demand mode."
   ],
   [
    "MSK is better than Kinesis because it is more powerful.",
    "MSK fits teams that already use Kafka or need Kafka APIs and features. For a new, simple workload with no Kafka requirement, it adds operational knowledge the team may not have."
   ]
  ],
  "tryit": [
   [
    "Rivermile Rides wants three things from driver location data: a live map updated within a second, a fraud check that can be re-run over the last three days after a bug fix, and hourly Parquet files in S3 for analysts. Which services and features do you combine?",
    "Ingest into Kinesis Data Streams with the driver ID as the partition key, and extend retention beyond 24 hours so the fraud check can replay three days. A Lambda or KCL consumer drives the live map, and a Firehose delivery stream reading from the data stream converts records to Parquet and delivers them to S3. Enhanced fan-out keeps the consumers from slowing each other."
   ],
   [
    "A security team needs high-volume application logs delivered to an OpenSearch domain and an S3 backup, with records enriched by a small transformation and no servers or shards to manage. Delivery within a couple of minutes is fine. Which service fits?",
    "Amazon Data Firehose. It is fully managed, scales automatically, can transform records with a Lambda function, and delivers to OpenSearch with S3 as a backup destination, which matches near-real-time loading with minimal operations."
   ]
  ],
  "tip": "Deliver to S3, Redshift or OpenSearch with no code and no capacity management: Firehose. Real-time custom consumers, ordering per key or replay: Kinesis Data Streams. Existing Kafka workloads or Kafka APIs: MSK.",
  "check": [
   [
    "Can Amazon Data Firehose replay data from yesterday to a new consumer?",
    "No. Firehose delivers and does not retain data for replay. Kinesis Data Streams retains records so consumers can re-read them."
   ],
   [
    "A Kinesis producer gets throughput exceeded errors on a provisioned stream. What are two fixes?",
    "Add shards (or switch to on-demand mode) and use a well-distributed partition key so records spread across shards."
   ],
   [
    "Five separate applications read the same stream and slow each other down. Which feature helps?",
    "Enhanced fan-out, which gives each registered consumer its own dedicated read throughput."
   ],
   [
    "A company runs Kafka on premises with many Kafka Connect connectors and wants a managed service. Which one?",
    "Amazon MSK, which keeps Kafka APIs, clients and connectors compatible."
   ],
   [
    "A Kinesis consumer's iterator age keeps rising. What does it mean?",
    "The consumer is falling behind the newest data; add shards, use enhanced fan-out, or speed up processing so it can catch up."
   ]
  ]
 },
 {
  "t": "Analytics services: Athena, AWS Glue, Lake Formation, EMR, Redshift Spectrum and QuickSight",
  "hook": "The quarterly business review at Saltmarsh Outfitters is on Thursday, and the chief financial officer wants answers from three years of sales files, clickstream logs and store data, all sitting in S3 as raw CSV and JSON. Wei, the lone data engineer, has a long list: the analysts want to run SQL without waiting for a cluster, finance must not see customer names or emails, the warehouse team wants to join old history with current Redshift tables, and executives want a dashboard, not a spreadsheet. Last month a single careless query scanned every file and cost more than the team's coffee budget. Which service handles which job?",
  "simple": "A data lake is a big, cheap storage area, usually Amazon S3, where a company dumps all its data files in their original form. On their own, those files are hard to use, like a garage full of unlabeled boxes. AWS has a set of tools that each do one job. One walks through the boxes and writes labels describing what is inside (a catalog). One lets you ask questions in SQL, the common database language, directly against the files. One acts as a security guard who decides which people may see which columns or rows. One rents a big group of computers for heavy processing. And one turns the answers into charts and dashboards for people who never write SQL.",
  "body": [
   "A data lake stores raw and processed data of every shape, usually in Amazon S3, and lets many tools analyze it without first copying it into a separate system. Because S3 is cheap, durable and effectively unlimited, you can keep years of history and decide later how to use it. AWS has a set of services that catalog, secure, process, query and visualize that data, and the exam expects you to know the job of each and which one answers a given requirement.",
   "AWS Glue is a serverless data integration service. Glue crawlers scan data in S3 and other sources, infer schemas and create or update tables in the AWS Glue Data Catalog, a central metadata repository that Athena, Redshift Spectrum and EMR all use. Glue jobs run extract, transform and load (ETL) code on serverless Apache Spark, for example converting CSV to Parquet and partitioning it by date, with job bookmarks so each run processes only new data. Glue also offers visual job authoring in Glue Studio and data quality rules that check data as it moves.",
   "Amazon Athena is a serverless interactive query service: you write standard SQL against data in S3, using tables defined in the Data Catalog, and pay for the amount of data each query scans. There are no clusters to manage. Because pricing is per scan, storing data in compressed, columnar formats such as Apache Parquet or ORC and partitioning it, for example by year, month and day, cuts both cost and query time. A query that filters on partition columns reads only matching folders:\n\n```sql\nSELECT srcaddr, SUM(bytes) FROM vpc_flow_logs\nWHERE year='2026' AND month='09'\nGROUP BY srcaddr ORDER BY 2 DESC LIMIT 10;\n```",
   "A few practical details make Athena behave the way the exam expects. Every query writes its results to an S3 location you choose, and workgroups let you separate teams, set that results location, and apply data usage controls that cancel queries scanning more than a set amount, a simple guard against runaway costs. When new partitions arrive, for example a new day's folder, the Data Catalog must learn about them, either by rerunning a Glue crawler, by running `MSCK REPAIR TABLE` for Hive-style folder names, or by using partition projection so Athena calculates partitions from a pattern. Athena can also run federated queries through connectors to sources outside S3, but for the SAA-C03 exam its signature is serverless SQL over data in S3, paid per data scanned.",
   "AWS Lake Formation builds on the Glue Data Catalog to set up and secure data lakes. Its key feature is centralized, fine-grained access control: grant a team access to specific databases, tables, columns or rows, and have those permissions enforced consistently across Athena, Redshift Spectrum, EMR and Glue, instead of managing complex S3 bucket policies. It is the answer when a question asks for column-level or row-level permissions on a data lake managed in one place, or for sharing data lake tables across accounts with governance.",
   "Amazon EMR runs big data frameworks such as Apache Spark, Hive, Presto, HBase and Flink on clusters of EC2 instances, on Amazon EKS, or with EMR Serverless. It suits large-scale processing, machine learning data preparation and workloads that need framework-level control or specific versions; clusters can use Spot Instances for task nodes to cut cost. Amazon Redshift Spectrum lets a Redshift cluster query data directly in S3 through external tables and join it with tables loaded in Redshift, so you keep hot data in the warehouse and cold history in the lake. Amazon QuickSight is the serverless business intelligence (BI) service for interactive dashboards and visualizations, connecting to Athena, Redshift, RDS, S3 and other sources, with per-user pricing and an in-memory engine called SPICE for fast dashboards.",
   "Consider a worked example. A retailer lands raw sales CSV files in S3 every hour. A Glue crawler catalogs them, and a scheduled Glue job converts them to partitioned Parquet in a curated prefix. Analysts run ad hoc SQL with Athena, and query costs drop sharply because each query now scans a fraction of the data. Finance analysts see only non-PII (personally identifiable information) columns through Lake Formation column permissions, while the fraud team sees everything. The data warehouse keeps the last year in Redshift and queries older years through Spectrum, and executives view QuickSight dashboards built on the same data.",
   "Common mistakes: choosing EMR for simple ad hoc SQL on S3 (Athena needs no cluster); choosing Athena for a heavy, constant BI workload better served by a warehouse; forgetting that Athena cost scales with data scanned, so raw uncompressed JSON is expensive; and using S3 bucket policies to try to achieve column-level security, which Lake Formation provides. Another trap is thinking a crawler transforms data; crawlers only discover schemas, while Glue jobs transform.",
   "Exam wording maps cleanly. 'Ad hoc SQL on S3', 'serverless', 'no infrastructure' or 'query CloudTrail or ALB logs' points to Athena. 'Discover schema', 'crawler', 'Data Catalog' or 'serverless ETL' points to Glue. 'Column-level or row-level permissions', 'centralized data lake governance' points to Lake Formation. 'Hadoop', 'Spark cluster', 'HBase' or 'control over the framework' points to EMR. 'Join warehouse tables with data in S3 without loading it' points to Redshift Spectrum. 'Dashboards' and 'BI visualizations' point to QuickSight."
  ],
  "analogy": "A data lake on S3 is a giant library warehouse. Glue crawlers are the cataloguers who write index cards describing each shelf, and Glue jobs are the binders who reorganize loose pages into neat volumes. Athena is the reading room where anyone can look things up and pays by the page read. Lake Formation is the librarian at the door checking which sections, and even which lines, each reader may see. EMR is a private study hall you rent for heavy research, Redshift Spectrum lets the warehouse's own reading room borrow from the stacks, and QuickSight turns findings into posters. The analogy stops at cost: libraries rarely charge per page.",
  "terms": [
   [
    "Data lake",
    "A central repository, usually on S3, that stores raw and processed data of any format for many analytics tools."
   ],
   [
    "AWS Glue Data Catalog",
    "A central metadata store of table definitions shared by Athena, EMR, Redshift Spectrum and Glue."
   ],
   [
    "Glue crawler",
    "A Glue component that scans data sources, infers schemas and creates or updates Data Catalog tables."
   ],
   [
    "Amazon Athena",
    "A serverless SQL query service for data in S3, priced per data scanned."
   ],
   [
    "AWS Lake Formation",
    "A service to build data lakes and manage fine-grained table, column and row access to them centrally."
   ],
   [
    "Redshift Spectrum",
    "A Redshift feature that queries data in S3 directly and joins it with warehouse tables."
   ],
   [
    "Amazon QuickSight",
    "A serverless business intelligence service for dashboards and visualizations."
   ],
   [
    "Athena workgroup",
    "A way to separate Athena users and queries, set a query results location, and apply data usage limits per query or workgroup."
   ],
   [
    "Columnar format",
    "A file layout such as Parquet or ORC that stores data by column, so queries read only the columns they need."
   ]
  ],
  "example": "A retailer lands raw sales CSV files in S3. A Glue crawler catalogs them and a Glue job converts them to partitioned Parquet. Analysts run ad hoc SQL with Athena, finance sees only non-PII columns through Lake Formation permissions, older years are queried from Redshift through Spectrum, and executives view QuickSight dashboards built on the same data.",
  "mistakes": [
   [
    "A Glue crawler converts CSV files to Parquet.",
    "Crawlers only discover schemas and update the Data Catalog. Glue jobs do the transformation, such as converting to partitioned Parquet."
   ],
   [
    "EMR is the best answer for occasional SQL queries on S3 data.",
    "EMR runs clusters you must size and manage. For ad hoc, serverless SQL over S3, Athena needs no infrastructure and charges per data scanned."
   ],
   [
    "S3 bucket policies can restrict analysts to certain columns of a table.",
    "Bucket policies work at the object level, not column or row level. Lake Formation provides fine-grained column and row permissions enforced across Athena, EMR, Glue and Redshift Spectrum."
   ],
   [
    "Athena costs the same no matter how the data is stored.",
    "Athena charges by data scanned, so raw uncompressed JSON is expensive. Compressed columnar formats and partitioning cut both cost and query time."
   ]
  ],
  "tryit": [
   [
    "Saltmarsh Outfitters' analysts query three years of raw JSON clickstream logs in S3 with Athena, and each query scans the whole dataset. Most queries filter on a single month and use only five of forty fields. What changes reduce cost the most, and which service performs them?",
    "Use a Glue ETL job to convert the JSON to a compressed columnar format such as Parquet and partition it by year and month, then update the Data Catalog. Queries filtering on month read only matching partitions, and the columnar format reads only the five needed fields, so data scanned and cost drop sharply. A workgroup data usage limit can guard against accidental full scans."
   ],
   [
    "Finance analysts must query the customer orders table but never see email or phone columns, while the fraud team sees everything, in both Athena and EMR. The data team wants to manage this in one place instead of copying data. What do you use?",
    "AWS Lake Formation. Grant finance column-level permissions that exclude the email and phone columns, and grant the fraud team full table access. Lake Formation enforces these permissions consistently across integrated services such as Athena and EMR, so there is one source of data and one place to manage access."
   ]
  ],
  "tip": "Ad hoc SQL on S3 with no servers: Athena. Discover schemas and ETL: Glue. Column or row-level permissions across analytics tools: Lake Formation. Hadoop or Spark clusters with control: EMR. Join Redshift tables with S3 data: Redshift Spectrum. Dashboards: QuickSight.",
  "check": [
   [
    "How can you reduce Athena query costs on a large log dataset?",
    "Convert the data to a compressed columnar format such as Parquet and partition it so queries scan less data."
   ],
   [
    "Which service creates tables in the Data Catalog by scanning data in S3?",
    "An AWS Glue crawler."
   ],
   [
    "Analysts must see all columns of a table except salary, enforced in both Athena and EMR. Which service?",
    "AWS Lake Formation, which grants column-level permissions enforced across integrated analytics services."
   ],
   [
    "A Redshift team wants to query five years of archived data in S3 without loading it. What do they use?",
    "Redshift Spectrum with external tables defined over the S3 data."
   ],
   [
    "New daily folders arrive in S3, but Athena queries do not return the new day's data. What is a likely cause?",
    "The Data Catalog does not know about the new partitions; rerun the crawler, run MSCK REPAIR TABLE, or use partition projection."
   ]
  ]
 },
 {
  "t": "EC2 Auto Scaling policies: target tracking, step, simple, scheduled and predictive scaling",
  "hook": "It is 9:02 a.m. on Monday at Kestrel Payroll Services, and the help desk phones are ringing: the timesheet app is crawling. You check the Auto Scaling group. It did respond, adding instances at 9:01, but each one takes eight minutes to boot and warm its caches, so relief will arrive around 9:10, just as the complaints peak. The same happened last Monday, and the one before. Down the hall, the report workers are idle at 10 percent CPU while 40,000 jobs wait in their queue. Hannah, the operations lead, asks you: if the traffic is this predictable, why is the fleet always late, and why does the other fleet not grow at all?",
  "simple": "An Auto Scaling group is like a manager who decides how many workers are on shift. Scaling policies are the rules the manager follows. One rule is like a thermostat: keep the workers about half busy, and add or remove people to stay there. Another reacts in steps: if things get a little busy add one person, if very busy add three. A schedule says 'bring in extra staff every weekday at 8 a.m.'. A forecasting rule studies past weeks and calls people in before the usual rush. Picking the right rule means the shop is neither empty and expensive nor packed and slow. For a pile of waiting jobs, it is better to count the pile than to watch how tired the workers look.",
  "body": [
   "An Auto Scaling group keeps a fleet of EC2 instances between a minimum and maximum size, replaces unhealthy instances, and uses scaling policies to decide when to change the desired capacity. Choosing the right policy lets you meet performance goals without paying for idle instances overnight or scrambling during a spike. The exam describes a traffic pattern, such as steady growth, sudden bursts, a known daily peak or a queue backlog, and asks which policy or combination fits.",
   "Target tracking scaling is the simplest and usually recommended choice. You choose a metric and a target value, such as average CPU utilization at 50 percent or Application Load Balancer (ALB) request count per target at 1,000, and Auto Scaling creates and manages the Amazon CloudWatch alarms for you, adding or removing capacity to keep the metric near the target, much like a thermostat. It scales out quickly and scales in more gradually to avoid flapping. From the command line it looks like this: `aws autoscaling put-scaling-policy --auto-scaling-group-name web-asg --policy-name cpu50 --policy-type TargetTrackingScaling --target-tracking-configuration file://cpu50.json`, where the JSON names `ASGAverageCPUUtilization` and a `TargetValue` of 50.",
   "Step scaling uses CloudWatch alarms you create and defines adjustments that vary with the size of the alarm breach: for example, add one instance when CPU is between 60 and 70 percent, and add three when it is above 85 percent. It responds proportionally and keeps responding to alarms while earlier scaling activities are in progress, relying on an instance warmup setting so new instances are not counted before they are ready. Simple scaling makes one adjustment per alarm and then waits for a cooldown period before responding again, so it reacts slowly to rapid changes; it is mostly legacy, and step or target tracking is preferred.",
   "Several timing settings decide how quickly a policy can act, and the console's Activity tab for the group shows their effect, listing each launch and termination with its cause. Target tracking creates CloudWatch alarms for you, named after the policy, and you should not edit or delete them, because the policy manages them. The default instance warmup tells Auto Scaling how long a new instance needs before its metrics count toward the group's average, which prevents the group from launching more instances while the first ones are still starting. The older cooldown period, used by simple scaling, blocks further simple scaling activity for a set time after each change. If instances take minutes to become useful, the fix is not a more aggressive policy but launching earlier, through scheduled or predictive scaling, or joining faster from a warm pool.",
   "Scheduled scaling changes minimum, maximum or desired capacity at specific times, once or on a recurring cron schedule. It suits known patterns, such as scaling up at 08:00 on weekdays before staff arrive, or before a planned marketing event. Predictive scaling uses machine learning on historical load, needing at least a day of data and working better with more, to forecast daily and weekly patterns and launch capacity ahead of expected demand. It helps applications with regular cycles and long instance initialization times, can run in forecast-only mode so you can evaluate it first, and is usually combined with target tracking to handle unexpected changes.",
   "Several supporting settings matter. A launch template defines the instance configuration: AMI, instance type, security groups and user data. Health checks can use EC2 status checks or, better for web tiers, the load balancer's health checks, so an instance that is running but failing requests is replaced. Warm pools keep pre-initialized instances stopped or running, ready to join quickly. Lifecycle hooks pause instances during launch or termination so you can run scripts, such as draining work or copying logs. Termination policies decide which instance goes first when scaling in, and instance scale-in protection can exempt specific instances. For queue-based workers, scale on a custom metric of backlog per instance, the queue length divided by the number of running instances, rather than on CPU.",
   "Consider a worked example. An internal payroll app is busy every weekday from 08:00 to 18:00 and idle at night. Instances take eight minutes to boot and load caches. The team uses scheduled scaling to raise the minimum at 07:45 and lower it at 18:30, adds target tracking on CPU at 50 percent to handle unusual spikes such as end-of-month processing, and configures a warm pool so extra instances join in seconds rather than minutes. A separate report generator reads jobs from an Amazon Simple Queue Service (SQS) queue; it scales on backlog per instance with a target of ten messages per instance, so the fleet grows when the queue grows even if CPU looks low.",
   "Common mistakes: choosing simple scaling when a question emphasizes fast, proportional response; scaling a queue worker fleet on CPU, which may never rise even as the backlog grows; expecting target tracking to launch capacity before a known peak (it reacts, it does not predict); relying on EC2 status checks alone so instances with broken applications stay in service; and setting a maximum size too low, so policies cannot add capacity when needed. Another trap is forgetting that the minimum capacity is what you always pay for, so a high minimum defeats cost savings.",
   "Exam wording usually points to one policy. 'Keep average CPU at 50 percent' or 'maintain a metric at a value' points to target tracking. 'Every Monday at 9', 'before a known event' or 'at a specific time' points to scheduled scaling. 'Recurring daily or weekly pattern' plus 'instances take a long time to start' points to predictive scaling. 'Different responses for different breach sizes' points to step scaling. 'SQS queue backlog' points to a custom backlog-per-instance metric with target tracking. 'Instances take too long to become ready' points to warm pools, and 'run a script before termination' points to lifecycle hooks."
  ],
  "analogy": "Target tracking is a home thermostat: set 50 percent CPU and it adds or removes heat to stay there. Step scaling is a thermostat with stages, firing one burner for a small chill and three for a deep freeze. Simple scaling is an old thermostat that, after each change, insists on waiting before it will touch anything again. Scheduled scaling is a timer that warms the house before you wake up, and predictive scaling is a smart thermostat that learns your routine. The analogy stops at queues: for SQS workers you should watch the pile of work, not the room temperature.",
  "terms": [
   [
    "Target tracking scaling",
    "A policy that adjusts capacity to keep a chosen metric near a target value."
   ],
   [
    "Step scaling",
    "A policy that makes larger adjustments for larger CloudWatch alarm breaches."
   ],
   [
    "Simple scaling",
    "A legacy policy making one adjustment per alarm, then waiting for a cooldown period."
   ],
   [
    "Scheduled scaling",
    "Changing Auto Scaling group capacity at set times for known load patterns."
   ],
   [
    "Predictive scaling",
    "Forecasting load from history with machine learning to add capacity before it is needed."
   ],
   [
    "Warm pool",
    "A set of pre-initialized instances kept ready to join an Auto Scaling group quickly."
   ],
   [
    "Lifecycle hook",
    "A pause during instance launch or termination that lets you run custom actions."
   ],
   [
    "Default instance warmup",
    "The time a new instance needs before its metrics are included in the Auto Scaling group's aggregated metrics."
   ],
   [
    "Backlog per instance",
    "Visible SQS messages divided by the number of running instances, used as a custom target tracking metric for queue workers."
   ],
   [
    "Cooldown period",
    "A wait after a simple scaling activity before another simple scaling activity can start."
   ]
  ],
  "example": "An internal payroll app is busy every weekday from 08:00 to 18:00 and idle at night. The team uses scheduled scaling to raise the minimum at 07:45 and lower it at 18:30, plus target tracking on CPU at 50 percent to handle unusual spikes such as end-of-month processing. A report worker fleet reading from SQS scales on backlog per instance, so it grows with the queue rather than with CPU.",
  "mistakes": [
   [
    "Target tracking will add capacity before a known daily peak.",
    "Target tracking reacts to the metric as it changes. To have capacity ready before a predictable peak, use scheduled or predictive scaling, often together with target tracking for surprises."
   ],
   [
    "Scaling queue workers on CPU utilization is good enough.",
    "Workers waiting on a queue may show low CPU while the backlog grows. Scale on backlog per instance, the visible messages divided by running instances, against a target."
   ],
   [
    "Simple scaling is the best choice for fast, proportional responses.",
    "Simple scaling makes one adjustment per alarm and waits for a cooldown. Step scaling or target tracking responds proportionally and keeps reacting during ongoing activities."
   ],
   [
    "EC2 status checks are enough to keep a web fleet healthy.",
    "Status checks only see whether the instance and host are working. Enable load balancer health checks on the group so instances that are running but failing requests are replaced."
   ]
  ],
  "tryit": [
   [
    "Kestrel Payroll's timesheet app has a sharp, consistent peak every weekday at 09:00, instances take eight minutes to become ready, and occasional unexpected spikes happen at month-end. The team currently uses only target tracking on CPU. What do you add, and why keep target tracking?",
    "Add predictive scaling (or scheduled scaling that raises capacity before 09:00) so instances launch ahead of the known peak, and consider a warm pool so extra instances join in seconds. Keep target tracking on CPU to handle unexpected month-end spikes that no forecast or schedule anticipates."
   ],
   [
    "A report worker fleet pulls jobs from an SQS queue. CPU stays near 10 percent even when 40,000 messages are waiting, so the group never scales out. Each instance can process about 50 messages per minute, and the business wants the backlog cleared within about 10 minutes. How should the group scale?",
    "Publish a custom metric for backlog per instance (visible messages divided by running instances) and use target tracking against a target of about 500, which is 50 messages per minute times 10 minutes. The fleet then grows as the queue grows, regardless of CPU, within the group's maximum size."
   ]
  ],
  "tip": "Keep a metric at a value: target tracking. Known times: scheduled. Recurring daily or weekly patterns with slow-starting instances: predictive. Different responses for different breach sizes: step. SQS worker fleets: scale on backlog per instance.",
  "check": [
   [
    "An application takes 10 minutes to boot and has a consistent daily traffic peak at 09:00. Which policy helps most?",
    "Predictive scaling (or scheduled scaling), so capacity launches before the peak rather than reacting after it starts."
   ],
   [
    "Why is simple scaling usually avoided today?",
    "It waits for a cooldown after each adjustment, so it reacts slowly; step or target tracking policies respond better."
   ],
   [
    "Worker instances process SQS messages, but CPU stays low while the queue grows. What metric should scaling use?",
    "Backlog per instance: the number of visible messages divided by running instances, tracked against a target."
   ],
   [
    "Instances are running but returning errors, and Auto Scaling does not replace them. What should you change?",
    "Use the load balancer's health checks for the Auto Scaling group so instances failing application checks are replaced."
   ],
   [
    "Which setting stops new instances' metrics from skewing the group average while they are still starting?",
    "The default instance warmup, which excludes new instances from aggregated metrics until they are ready."
   ]
  ]
 },
 {
  "t": "Data migration and hybrid storage: DataSync, Snow Family, Storage Gateway, Transfer Family, DMS and SCT",
  "hook": "It is Monday morning at Lakeside Regional Hospital, and Priya, the infrastructure lead, has three sticky notes on her monitor. The first says \"600 TB imaging archive to AWS, link is 200 Mbps.\" The second says \"Oracle billing database to Aurora PostgreSQL, downtime budget: one hour.\" The third says \"Lab partner still sends results by SFTP to a server nobody wants to patch.\" Her manager wants a migration plan by Friday, and every vendor slide she opens promises that one tool does everything. You are sitting across from her with a whiteboard marker. Which service belongs on which note, and how do you tell them apart before the plan goes to the board?",
  "simple": "Moving data to the cloud is a bit like moving house. If you only have a few boxes and the road is clear, you drive them over yourself. If you have a whole warehouse and the road is a narrow lane, you hire a moving truck instead. AWS has a tool for each situation. One copies files over the network (DataSync). One is a physical device AWS mails to you, you fill it and mail it back (the Snow Family). One lets your office keep using cloud storage as if it were a local drive (Storage Gateway). One gives business partners a familiar file upload address (Transfer Family). And one moves a live database while it keeps running (Database Migration Service), with a helper that translates the database's structure when the old and new database products are different (Schema Conversion Tool).",
  "body": [
   "Moving data into AWS, or keeping on-premises systems connected to AWS storage, is part of many architectures, and the SAA-C03 exam tests whether you can match the right tool to the situation. Four questions decide the answer. How much data is there? How fast and reliable is the network? Is the transfer one-time or ongoing? And is the data made of files, block volumes, tapes or databases? The scenario almost always states these facts, sometimes in a single clause, so the skill is reading for them and mapping each to a service rather than memorizing feature lists.",
   "Start with online file transfer. AWS DataSync moves files over the network between on-premises storage (Network File System (NFS), Server Message Block (SMB), Hadoop Distributed File System (HDFS) or self-managed object storage), other clouds and AWS storage services such as Amazon Simple Storage Service (S3), Amazon Elastic File System (EFS) and the Amazon FSx file systems. You deploy a DataSync agent near the source, create a source location and a destination location, and define a task that links them. The service then handles parallel transfer, encryption in transit, integrity verification, scheduling, bandwidth throttling and incremental copies of only the files that changed since the last run. In the console you would see each task execution with bytes transferred, files verified and any files skipped. DataSync is the answer for one-time or recurring file migrations over the network, including over AWS Direct Connect, and it is far simpler than writing your own copy scripts.",
   "When the network is too slow, ship the data instead. The AWS Snow Family provides rugged physical devices that AWS sends to you: you copy data onto them locally, ship them back, and AWS imports the contents into S3. Snowball Edge devices hold tens of terabytes each and add local compute for edge processing in disconnected locations such as ships, mines or field sites. A useful rule of thumb is that if moving the data over your available bandwidth would take more than about a week, consider Snow. The arithmetic is worth doing: 100 TB over a fully used 100 Mbps link takes roughly three months, and real links are rarely fully available. AWS has changed the Snow device lineup over time, so for a new project you would check which devices are currently offered; the concept of offline, physical transfer is what the exam tests.",
   "For ongoing hybrid use rather than a one-time move, use AWS Storage Gateway. It connects on-premises applications to AWS storage, running as a virtual machine or hardware appliance on site with a local cache so frequently used data is served at local speed. The gateway type is chosen by the interface the application expects. S3 File Gateway presents NFS or SMB shares whose files are stored as objects in S3. FSx File Gateway, which still appears in exam material although AWS has closed it to new customers, gives on-premises Windows users cached access to FSx for Windows File Server shares. Volume Gateway presents Internet Small Computer Systems Interface (iSCSI) block volumes backed by S3 with Amazon Elastic Block Store (EBS) snapshots, in cached mode (primary data in AWS, frequently used data cached locally) or stored mode (primary data kept locally and backed up asynchronously to AWS). Tape Gateway presents a virtual tape library so existing backup software can write to S3 and S3 Glacier storage classes instead of physical tapes, with no change to the backup jobs themselves.",
   "Two more services cover partner file exchange and databases. AWS Transfer Family provides managed Secure File Transfer Protocol (SFTP), File Transfer Protocol over SSL (FTPS), FTP and Applicability Statement 2 (AS2) endpoints that store files in S3 or EFS, so partners keep using their existing clients and scripts while you retire a self-managed server. AWS Database Migration Service (DMS) migrates databases with minimal downtime: a replication instance performs a full load and then change data capture (CDC), continuously applying ongoing changes so the target stays in sync while the source stays online, until you cut over. Homogeneous migrations, such as Oracle to Oracle, need only DMS or native tools. Heterogeneous migrations, such as Oracle to Aurora PostgreSQL, first need schema conversion: the AWS Schema Conversion Tool (SCT), or the newer DMS Schema Conversion, converts the schema, stored procedures and other code objects, and then DMS moves the data.",
   "A worked example ties these together. A hospital must move a 600 TB image archive but has only a 200 Mbps internet link, which would take many months, so it orders Snowball Edge devices for the bulk copy. Once the devices are loaded and shipped, it uses DataSync over the network to copy only the files changed since then. Its Oracle database moves to Aurora PostgreSQL using SCT for the schema and code and DMS with CDC for the data, so the application is down only for the final cutover. A laboratory partner that sends results by SFTP connects to a Transfer Family endpoint instead of an aging FTP server, and the backup team points its existing backup software at a Tape Gateway so it can retire its tape library.",
   "Several traps recur. Learners choose Snow for a modest amount of data on a fast network, when DataSync is simpler and faster. They choose DataSync when the requirement is ongoing low-latency local access, which is Storage Gateway. They use DMS alone for a heterogeneous migration without converting the schema first. They confuse Volume Gateway cached mode (primary data in AWS) with stored mode (primary data on premises). They build a custom SFTP server on Amazon EC2 when Transfer Family is managed. And they forget that DMS keeps the source database online during migration, which is exactly why it is the minimal-downtime answer.",
   "Exam wording tends to follow a pattern you can learn. 'Migrate or sync files online', 'schedule' or 'NFS or SMB to S3 or EFS' points to DataSync. 'Petabytes', 'limited bandwidth', 'weeks to transfer' or 'no connectivity' points to the Snow Family. 'On-premises applications need ongoing access to cloud storage with local caching' points to Storage Gateway, with the file, volume or tape type chosen by interface. 'Partners use SFTP' points to Transfer Family. 'Migrate a database with minimal downtime' points to DMS, plus SCT or DMS Schema Conversion when the source and target engines differ."
  ],
  "analogy": "Think of a household move. DataSync is driving your boxes over in your own car, trip after trip, which works when the road is open. Snow is hiring a moving truck when you own a warehouse and the road is a narrow lane. Storage Gateway is renting a storage unit but keeping a small closet at home for the things you use daily. DMS is moving a family that refuses to stop living in the house during the move: you copy everything, keep forwarding new mail, then hand over the keys in one short moment. The analogy stops at schema conversion: furniture does not need translating, but a database moving to a different engine does.",
  "mnemonic": "Storage Gateway types by interface: F-V-T, File, Volume, Tape. File for NFS or SMB shares, Volume for iSCSI block disks, Tape for backup software expecting a tape library.",
  "terms": [
   [
    "AWS DataSync",
    "An online data transfer service for moving files between on-premises storage, other clouds and AWS storage, with scheduling, verification and incremental copies."
   ],
   [
    "Snow Family",
    "Physical AWS devices used to move large amounts of data offline and to run compute at the edge."
   ],
   [
    "Storage Gateway",
    "A hybrid service giving on-premises applications file, volume or tape interfaces backed by AWS storage with local caching."
   ],
   [
    "Volume Gateway cached vs stored mode",
    "Cached keeps primary data in AWS with a local cache of hot data; stored keeps primary data on premises with asynchronous backups to AWS."
   ],
   [
    "Tape Gateway",
    "A Storage Gateway type that presents a virtual tape library to existing backup software, storing tapes in S3 and Glacier classes."
   ],
   [
    "AWS Transfer Family",
    "Managed SFTP, FTPS, FTP and AS2 endpoints that store files in S3 or EFS."
   ],
   [
    "Change data capture (CDC)",
    "Continuously replicating ongoing database changes from source to target after the initial load."
   ],
   [
    "AWS SCT",
    "The Schema Conversion Tool, which converts database schemas and code between different engines."
   ]
  ],
  "example": "A hospital moves a 600 TB image archive with only a 200 Mbps internet link, so it orders Snowball Edge devices for the bulk copy, then uses DataSync for the changes made since. Its Oracle database moves to Aurora PostgreSQL using SCT for the schema and DMS with CDC for the data, and a partner that sends files by SFTP connects to Transfer Family instead of an old FTP server.",
  "mistakes": [
   [
    "Ordering Snow devices for a few terabytes on a fast, mostly idle link.",
    "Snow adds shipping time and handling. If the network can move the data within days, DataSync is simpler and finishes sooner."
   ],
   [
    "Using DataSync so on-premises applications can keep reading cloud data at local speed.",
    "DataSync copies data; it does not present a cached local share. Ongoing low-latency hybrid access is Storage Gateway."
   ],
   [
    "Pointing DMS straight at an Oracle to Aurora PostgreSQL migration.",
    "Different engines need schema and code conversion first, with AWS SCT or DMS Schema Conversion. DMS then moves the data."
   ],
   [
    "Thinking Volume Gateway cached mode keeps the full dataset on premises.",
    "Cached mode keeps primary data in AWS and only hot data locally. Stored mode is the one that keeps the full dataset on premises."
   ]
  ],
  "tryit": [
   [
    "A design firm has 40 TB of project files on an SMB file server and a 1 Gbps Direct Connect link that is mostly idle at night. It wants the files in Amazon EFS within two weeks, with a final sync of changed files on cutover night. Which service fits, and why not Snow?",
    "AWS DataSync. At 1 Gbps, 40 TB moves in a matter of days, well within two weeks, and DataSync's incremental tasks make the cutover-night sync quick. Snow would add shipping time without saving any, and it does not import directly into EFS."
   ],
   [
    "A factory's existing backup software writes nightly to an aging physical tape library. Management wants to stop buying tapes but does not want to change the backup jobs. What do you recommend?",
    "Storage Gateway's Tape Gateway. It presents a virtual tape library to the same backup software, so jobs keep running unchanged while the virtual tapes are stored in S3 and archived to S3 Glacier storage classes."
   ]
  ],
  "tip": "Online file migration: DataSync. Huge data and limited bandwidth: Snow Family. Ongoing on-premises access to cloud storage: Storage Gateway (file, volume or tape). SFTP for partners: Transfer Family. Database move with minimal downtime: DMS, plus SCT when engines differ.",
  "check": [
   [
    "Which Storage Gateway type lets an existing backup application write to virtual tapes stored in AWS?",
    "Tape Gateway, which presents a virtual tape library backed by S3 and Glacier storage classes."
   ],
   [
    "Migrating SQL Server to Aurora MySQL: which tools are needed?",
    "A schema conversion tool (AWS SCT or DMS Schema Conversion) for the schema and code, then AWS DMS for the data, optionally with CDC."
   ],
   [
    "A company has 2 PB to move and a 100 Mbps link that is already busy. What should it use?",
    "The Snow Family, because transferring 2 PB over that link would take far too long; ship the data on devices instead."
   ],
   [
    "On-premises servers must keep using NFS shares, but files should be stored as objects in S3. Which service?",
    "Storage Gateway's S3 File Gateway, which presents NFS or SMB shares backed by S3 with a local cache."
   ],
   [
    "Why is DMS considered the minimal-downtime option for database migration?",
    "The source stays online during the full load and CDC keeps the target in sync, so the application only pauses for the final cutover."
   ]
  ]
 },
 {
  "t": "EC2 purchase options: On-Demand, Reserved Instances, Compute vs EC2 Instance Savings Plans, Spot, Dedicated Instances and Dedicated Hosts",
  "hook": "The finance director at Cobalt Ridge Outfitters forwards you the monthly AWS invoice with one line highlighted: EC2, up again. Every instance in the account is On-Demand. The web tier has run the same twenty servers for two years, a nightly analytics job hammers the fleet for four hours and then sits idle, a load test is booked for next month, and the legacy inventory system's vendor has just written to ask for a count of physical cores. \"Can we pay less without breaking anything?\" she asks. You know there are at least six ways to buy the same instance. Which one belongs to which workload?",
  "simple": "Buying EC2 is like paying for transport. On-Demand is a taxi: no commitment, you pay by the ride, and it is the most expensive per mile. Reserved Instances and Savings Plans are a yearly transit pass: you promise to keep using it for one or three years and get a big discount. Spot is a standby airline seat: very cheap, but the airline can bump you with a short warning, so only take it if being bumped is fine. Dedicated Instances and Dedicated Hosts are renting a whole car for yourself, which you only need when rules or software licenses say no one else may share it. The trick is to give each job the cheapest ride that still gets it there safely.",
  "body": [
   "The same EC2 instance can cost very different amounts depending on how you buy it, and the SAA-C03 exam treats this as a core cost-optimization skill. Cost-optimized architectures match each workload to the right purchase option: flexibility where the future is uncertain, commitment where usage is steady, spare capacity where work can be interrupted, and dedicated hardware only where licensing or compliance requires it. A typical question describes a workload and asks for the cheapest option that still meets the requirements, so read carefully for words like 'steady', 'interruptible', 'short-term' and 'licensed per core'.",
   "On-Demand is the baseline. On-Demand Instances are billed per second (for Linux and many other operating systems, with a one-minute minimum) or per hour, with no commitment and no upfront payment. They are the most flexible and the most expensive per hour, and they suit short-term, spiky or unpredictable workloads, development and testing, and anything you cannot interrupt but cannot yet forecast. When you need capacity guaranteed in a particular place, On-Demand Capacity Reservations let you reserve capacity in a specific Availability Zone (AZ) without a term commitment. You pay for the reservation whether or not instances run in it, and it can be combined with Savings Plans or Regional Reserved Instances so the reserved capacity is also discounted.",
   "For steady workloads, commit in exchange for discounts. Reserved Instances (RIs) are a one- or three-year commitment to a specific instance family, Region, operating system and tenancy, paid all upfront, partial upfront or no upfront. The more you pay upfront and the longer the term, the bigger the discount. Standard RIs give the largest discount; Convertible RIs can be exchanged for different instance families and other attributes, at a smaller discount. Scope matters too. A zonal RI also reserves capacity in one AZ, while a Regional RI does not reserve capacity but applies its discount across AZs and across sizes within the family, which is more flexible.",
   "Savings Plans are the newer, more flexible commitment model. Instead of committing to an instance configuration, you commit to a consistent amount of compute spend, measured in dollars per hour, for one or three years. A Compute Savings Plan applies automatically across instance families, sizes, Regions, operating systems and tenancy, and it also covers AWS Fargate and AWS Lambda usage. An EC2 Instance Savings Plan gives a deeper discount but is tied to one instance family in one Region, while staying flexible on size, operating system and AZ. Choose a Compute Savings Plan when you expect to change families or Regions or move to containers and serverless; choose an EC2 Instance Savings Plan for a stable family in one Region. AWS Cost Explorer recommends a commitment amount from your past usage, and usage above the commitment is simply billed On-Demand.",
   "Spot and dedicated options round out the list. Spot Instances use spare EC2 capacity at steep discounts, often up to 90 percent off On-Demand, but AWS can reclaim them with a two-minute warning. They suit fault-tolerant, flexible work: batch jobs, big data, continuous integration builds, rendering, and stateless web tiers with other capacity underneath. Never put a single critical database on Spot. Two options address isolation and licensing. Dedicated Instances run on hardware dedicated to your account, but you have no visibility or control over the physical server. Dedicated Hosts give you an entire physical server with visibility into sockets and cores and control over instance placement on it, which is what bring-your-own-license (BYOL) software licensed per socket or per core, such as some Windows Server, SQL Server or Oracle licenses, typically requires. Dedicated Hosts can be bought On-Demand or with reservations and Savings Plans.",
   "A worked example shows how these mix in one company. A business runs a steady baseline of 20 web servers all year, nightly analytics jobs that can restart from checkpoints, a two-week load test next month, and a legacy application licensed per physical core. It covers the web baseline with a Compute Savings Plan because it plans to move some services to Fargate next year, runs analytics on Spot Instances, runs the load test On-Demand because it is short and cannot be interrupted, and places the licensed application on a Dedicated Host so it can count cores for the license audit. No single option is right for the whole bill; the savings come from the mix.",
   "Several mistakes appear again and again. Learners choose Dedicated Instances for per-core licensing, when only Dedicated Hosts expose socket and core counts. Teams buy Reserved Instances or Savings Plans before right-sizing, which locks in waste for years. People choose Spot for work that cannot tolerate interruption, or an EC2 Instance Savings Plan when the scenario mentions moving to Lambda or Fargate. Many assume a Regional RI guarantees capacity, when only zonal RIs and Capacity Reservations do. And some think Savings Plans are bought per instance, when they are a dollar-per-hour spend commitment.",
   "Exam wording is usually decisive. 'Steady state', 'one or three years' or 'predictable' points to Savings Plans or RIs. 'Flexible across instance families, Regions, Fargate and Lambda' points to a Compute Savings Plan. 'Stateless', 'fault-tolerant', 'can be interrupted' or 'lowest cost' points to Spot. 'Short-term', 'unpredictable' or 'cannot be interrupted' points to On-Demand. 'Licensed per socket or per core', 'BYOL' or 'visibility into physical cores' points to Dedicated Hosts. 'Guarantee capacity in an AZ for an event without a long commitment' points to an On-Demand Capacity Reservation."
  ],
  "analogy": "Picture renting cars. On-Demand is the daily rental counter: walk up, pay full price, return whenever. A Savings Plan is a corporate account where you promise to spend a set amount per hour on rentals of any model at any branch in exchange for a discount. Spot is the lot's leftover cars at a deep discount that the company can recall with two minutes' notice. A Dedicated Host is leasing the whole garage so you can tell the insurer exactly how many bays you use. The analogy breaks on Spot pricing: there is no haggling or bidding; you simply pay the current Spot price.",
  "terms": [
   [
    "On-Demand Instance",
    "An instance billed per second or hour with no commitment."
   ],
   [
    "Reserved Instance",
    "A one- or three-year commitment to an instance configuration in exchange for a lower rate; Standard or Convertible, zonal or Regional."
   ],
   [
    "Compute Savings Plan",
    "A dollars-per-hour commitment that discounts EC2 across families and Regions, plus Fargate and Lambda."
   ],
   [
    "EC2 Instance Savings Plan",
    "A deeper-discount commitment tied to one instance family in one Region, flexible on size, OS and AZ."
   ],
   [
    "Spot Instance",
    "Spare EC2 capacity at a large discount that AWS can reclaim with a two-minute notice."
   ],
   [
    "Dedicated Instance",
    "An instance on hardware dedicated to one account, without visibility into or control of the physical server."
   ],
   [
    "Dedicated Host",
    "A physical server dedicated to you, with socket and core visibility for per-core or per-socket licensing."
   ],
   [
    "On-Demand Capacity Reservation",
    "Reserved EC2 capacity in a specific AZ without a term commitment, billed whether used or not."
   ]
  ],
  "example": "A company runs a steady baseline of web servers all year, nightly analytics jobs that can restart, and a legacy app licensed per physical core. It covers the web baseline with a Compute Savings Plan because it plans to move to Fargate next year, runs analytics on Spot Instances, and places the licensed app on a Dedicated Host so it can report socket and core counts to its software vendor.",
  "mistakes": [
   [
    "Dedicated Instances satisfy per-core or per-socket licensing.",
    "Dedicated Instances give isolation but no view of the physical server. Licenses counted by socket or core need Dedicated Hosts."
   ],
   [
    "A Regional Reserved Instance guarantees capacity.",
    "Only zonal RIs and On-Demand Capacity Reservations reserve capacity. A Regional RI gives a discount with flexibility across AZs and sizes."
   ],
   [
    "An EC2 Instance Savings Plan is the best choice for a team moving workloads to Fargate.",
    "It covers only EC2 in one family and Region. A Compute Savings Plan also applies to Fargate and Lambda."
   ],
   [
    "Buy commitments first, then tidy up instance sizes.",
    "Right-size first. A commitment sized to oversized instances locks in paying for waste for one or three years."
   ]
  ],
  "tryit": [
   [
    "A media company renders animation frames overnight. Each frame is an independent job, failed frames are simply re-queued, and the deadline is the next morning. The team wants the lowest possible compute cost. Which purchase option fits, and what should the design include?",
    "Spot Instances. The work is fault-tolerant and flexible, so the two-minute interruption notice only means a frame is retried. The design should re-queue interrupted jobs and spread requests across several instance types and AZs to reduce interruptions."
   ],
   [
    "A retailer expects a huge sale weekend in one AZ-sensitive application and must be sure capacity is available for those three days. It does not want any one- or three-year commitment. What do you recommend?",
    "An On-Demand Capacity Reservation in the required AZ for the event, cancelled afterward. It guarantees capacity without a term, unlike RIs or Savings Plans, which need one- or three-year commitments."
   ]
  ],
  "tip": "Steady and long-term: Savings Plans or RIs. Interruptible and flexible: Spot. Short, unpredictable and uninterruptible: On-Demand. Per-socket or per-core BYOL licensing: Dedicated Hosts, not Dedicated Instances. Flexibility across families, Regions or Fargate and Lambda: Compute Savings Plan.",
  "check": [
   [
    "Which commitment covers Lambda and Fargate usage as well as EC2?",
    "A Compute Savings Plan."
   ],
   [
    "A vendor license is priced per physical CPU socket. Which EC2 option lets you comply?",
    "Dedicated Hosts, which expose the physical server's sockets and cores."
   ],
   [
    "A company needs guaranteed capacity in one AZ for a three-day event and wants no long-term commitment. What should it use?",
    "An On-Demand Capacity Reservation in that AZ, cancelled after the event."
   ],
   [
    "Why might an EC2 Instance Savings Plan be the wrong choice for a team migrating to containers on Fargate?",
    "It applies only to EC2 usage in one instance family and Region; a Compute Savings Plan would also cover Fargate."
   ],
   [
    "What is the difference between a Standard and a Convertible Reserved Instance?",
    "Standard gives the largest discount but is fixed to its attributes; Convertible can be exchanged for other instance families at a smaller discount."
   ]
  ]
 },
 {
  "t": "Spot Instances in practice: interruption notices, mixed-instances Auto Scaling groups and allocation strategies",
  "hook": "At 3:10 a.m. the on-call phone buzzes for Marcus at Northwind Media. Half of the video transcoding fleet vanished in the same minute, and a client's overnight batch is now hours behind. The fleet runs entirely on Spot Instances, all the same instance type, all in one Availability Zone, because that combination was the cheapest when someone set it up last spring. Nobody noticed the warnings the instances received before they disappeared, and the half-finished videos are gone. Marcus still wants Spot prices; his manager wants no more 3 a.m. calls. Is there a way to keep the discount and stop the fleet from collapsing all at once?",
  "simple": "Spot Instances are spare computers that AWS rents out very cheaply, with one catch: when AWS needs a computer back, it gives you a two-minute warning and then takes it. The way to live with that is to avoid putting all your eggs in one basket. Ask for many kinds of computers in several locations, so that when AWS needs one kind back, the others keep working. Keep a few regular, never-taken computers as a safety floor. And design the work so it can be picked up again, like a to-do list where any unfinished task goes back on the list for someone else. Think of a restaurant that hires extra staff from a temp agency: fine, as long as there are a few permanent staff and every order is written on a ticket anyone can pick up.",
  "body": [
   "Spot Instances can cut compute costs dramatically, but only architectures that tolerate interruption benefit. A Spot Instance is ordinary EC2 capacity that AWS is not currently selling at On-Demand prices; when that capacity is needed back, your instance is interrupted. The SAA-C03 exam expects you to know how interruption works, how your workload is told about it, and how to design fleets that ride through it without users noticing. The rest of this lesson follows that order: the warning, the signals before the warning, diversification, allocation strategies and finally which workloads belong on Spot at all.",
   "First, the warning. When EC2 needs Spot capacity back, it sends a Spot Instance interruption notice two minutes before it stops, hibernates or terminates the instance; termination is the default behavior. The notice appears in the instance metadata service (IMDS) and as an Amazon EventBridge event, so either a script on the instance or an AWS Lambda function can react: deregister the instance from the load balancer, checkpoint work to Amazon S3, or finish the current job and stop pulling new ones. On the instance, a small agent can poll the metadata path `latest/meta-data/spot/instance-action` every few seconds, first requesting an IMDSv2 session token. The path returns 404 until a notice exists, then returns the action (stop, hibernate or terminate) and the time it will happen. Two minutes is short, so the reaction must be automated and quick.",
   "An earlier signal can buy more time. EC2 may send an EC2 instance rebalance recommendation when an instance is at elevated risk of interruption, often before the two-minute notice. The Amazon EC2 Auto Scaling Capacity Rebalancing feature can use that signal to launch a replacement instance before the interruption arrives, giving the old instance time to drain gracefully. Pricing is simpler than it once was. You pay the current Spot price, which changes gradually with long-term supply and demand; you do not bid. You can optionally set a maximum price, but leaving it at the default, which is the On-Demand price, avoids extra interruptions caused by a cap set too low.",
   "The key design principle is diversification. Spot capacity is managed in pools: each combination of instance type and Availability Zone (AZ) is a separate pool. If you ask for only one type in one AZ, a capacity squeeze in that one pool interrupts everything at once, which is exactly the 3 a.m. failure in the opening story. An Auto Scaling group with a mixed instances policy can combine On-Demand and Spot capacity and use many instance types across several AZs. You set an On-Demand base capacity, for example two instances that always run On-Demand, and an On-Demand percentage above base, with the rest on Spot. Attribute-based instance type selection lets you specify requirements such as vCPU and memory ranges instead of listing types by name, so suitable new instance types are picked up automatically and the number of pools you can draw from grows over time.",
   "Allocation strategies decide which pools Spot capacity comes from. Price-capacity-optimized, the strategy AWS recommends for most workloads, chooses pools with the most available capacity and then the lowest price among them, which lowers interruption rates while keeping cost low. Capacity-optimized chooses pools with the most available capacity, which suits workloads where an interruption is expensive, such as long jobs. Lowest-price chooses the cheapest pools and can bring higher interruption rates, because it ignores how much spare capacity each pool has. For the On-Demand portion of a mixed group, you choose lowest-price or prioritized ordering of instance types.",
   "Not every workload belongs on Spot. Good Spot workloads are stateless, checkpointed or queue-driven: containers on Amazon Elastic Container Service (ECS) or Amazon Elastic Kubernetes Service (EKS) with Spot capacity providers or node groups, Amazon EMR task nodes, continuous integration runners, and Amazon Simple Queue Service (SQS) workers, where an interrupted message simply becomes visible again for another worker after its visibility timeout. Poor fits include a single stateful database or a long job with no checkpoints, where an interruption loses work that cannot be recovered.",
   "A worked example pulls it together. A video transcoding service reads jobs from SQS and runs on an Auto Scaling group with two On-Demand instances as a base and the rest on Spot, across ten instance types in three AZs, using price-capacity-optimized allocation and Capacity Rebalancing. When an interruption notice arrives, an agent on the instance stops taking new jobs and uploads partial output to S3. Unfinished messages reappear in the queue after their visibility timeout and another worker picks them up, so no job is lost and the monthly compute bill drops by well over half. The common mistakes are the mirror image of this design: restricting a fleet to one instance type or one AZ, choosing lowest-price allocation for a workload that hates interruptions, running stateful or uncheckpointed work on Spot, ignoring the two-minute notice so in-flight work is lost, setting a low maximum price, and believing you still have to bid.",
   "Exam wording often signals the fix directly. 'Reduce Spot interruptions' points to diversifying instance types and AZs and using price-capacity-optimized or capacity-optimized allocation. 'Always keep some capacity' points to an On-Demand base in a mixed instances policy. 'React before the instance is reclaimed' points to the two-minute notice through instance metadata or EventBridge, or to rebalance recommendations with Capacity Rebalancing. 'Lowest cost for fault-tolerant, queue-based batch work' points to Spot workers reading from SQS."
  ],
  "analogy": "Imagine fishing with many lines in different spots on a lake rather than one line in one spot. If the fish leave one spot, the other lines still catch something. Each instance type in each AZ is a separate fishing spot, and price-capacity-optimized allocation is choosing the spots where fish are plentiful and the permit is cheap. The On-Demand base is the fish already in the cooler. Where the analogy stops: AWS tells you two minutes before a line goes slack, and a well-built system uses that warning to save its work.",
  "terms": [
   [
    "Spot interruption notice",
    "A two-minute warning, via instance metadata and EventBridge, that EC2 will reclaim a Spot Instance."
   ],
   [
    "Rebalance recommendation",
    "An early signal that a Spot Instance is at elevated risk of interruption."
   ],
   [
    "Capacity Rebalancing",
    "An Auto Scaling feature that launches replacement Spot capacity when a rebalance recommendation arrives."
   ],
   [
    "Spot capacity pool",
    "The spare capacity for one instance type in one Availability Zone."
   ],
   [
    "Mixed instances policy",
    "An Auto Scaling group setting combining multiple instance types and On-Demand and Spot purchase options."
   ],
   [
    "Price-capacity-optimized",
    "A Spot allocation strategy that favors pools with high available capacity and then low price; recommended for most workloads."
   ],
   [
    "On-Demand base capacity",
    "The number of instances in a mixed group that always run as On-Demand before Spot is used."
   ],
   [
    "Attribute-based instance type selection",
    "Choosing instance types by required attributes such as vCPU and memory instead of naming each type."
   ]
  ],
  "example": "A video transcoding service reads jobs from SQS and runs on an Auto Scaling group with two On-Demand instances as a base and the rest on Spot across 10 instance types in three AZs, using price-capacity-optimized allocation. When an interruption notice arrives, a small agent stops taking new jobs and uploads partial output; unfinished messages reappear in the queue for other workers.",
  "mistakes": [
   [
    "Picking the single cheapest instance type in one AZ to maximize savings.",
    "That puts the whole fleet in one Spot pool, so one capacity squeeze interrupts everything. Diversify across many types and AZs."
   ],
   [
    "Choosing lowest-price allocation for long, expensive jobs.",
    "Lowest-price ignores how much spare capacity a pool has, so it can land in pools with little headroom and higher interruption rates. Use price-capacity-optimized or capacity-optimized."
   ],
   [
    "Setting a low maximum Spot price as a safety net.",
    "A low cap causes interruptions whenever the Spot price rises past it. Leaving the default On-Demand price as the maximum avoids that."
   ],
   [
    "You must bid for Spot capacity.",
    "Spot is no longer an auction. You pay the current Spot price, which changes gradually with long-term supply and demand."
   ]
  ],
  "tryit": [
   [
    "A continuous integration system runs build agents on Spot. Builds take about eight minutes and are retried automatically if an agent disappears. Recently, many builds fail at once on busy afternoons. The Auto Scaling group uses one instance type in one AZ with lowest-price allocation. What two changes would you make first?",
    "Diversify the group across several instance types (or use attribute-based selection) and multiple AZs, and switch to price-capacity-optimized allocation. Together these spread the fleet across many pools and favor pools with spare capacity, so a single squeeze no longer interrupts most agents at once."
   ],
   [
    "A team's Spot workers process SQS messages. When an interruption notice arrives, some videos are half-processed and the work is lost. What should the worker do during the two-minute window?",
    "Stop receiving new messages, save partial output or a checkpoint to S3, and leave the in-flight message undeleted so it becomes visible again after the visibility timeout and another worker can resume it."
   ]
  ],
  "tip": "Reduce Spot interruptions by diversifying instance types and AZs and using price-capacity-optimized or capacity-optimized allocation. The warning is two minutes. Keep a small On-Demand base for capacity that must always exist.",
  "check": [
   [
    "How much warning does EC2 give before reclaiming a Spot Instance, and where does it appear?",
    "Two minutes, through the instance metadata service and an EventBridge event."
   ],
   [
    "Why does limiting a Spot fleet to one instance type in one AZ increase risk?",
    "All instances then share one Spot capacity pool, so a single capacity shortage can interrupt them all."
   ],
   [
    "Which allocation strategy does AWS recommend for most Spot workloads?",
    "Price-capacity-optimized, which picks pools with the most available capacity and then the lowest price."
   ],
   [
    "An Auto Scaling group must always keep at least three instances regardless of Spot availability. How do you configure it?",
    "Use a mixed instances policy with an On-Demand base capacity of three, and Spot for capacity above that."
   ],
   [
    "What does Capacity Rebalancing do with a rebalance recommendation?",
    "It launches a replacement instance proactively, before the interruption, so the at-risk instance can drain gracefully."
   ]
  ]
 },
 {
  "t": "Right-sizing compute: AWS Compute Optimizer, Graviton instances, and serverless vs always-on cost models",
  "hook": "Elena, the new cloud lead at Brightwater Insurance, opens the EC2 console on her first day and sorts the fleet by size. Forty `m5.2xlarge` instances, copied years ago from an on-premises server specification, average twelve percent CPU. An internal reporting tool runs on its own always-on instance and is used four times a day. The development environment runs every night and weekend while its developers sleep. The procurement team is ready to sign a three-year Savings Plan this week to \"lock in the savings.\" Elena has a feeling that signing now would be a mistake. What should happen first, and how does she prove it with data instead of a hunch?",
  "simple": "Right-sizing means paying for the size of computer you actually need, not the size someone guessed years ago. Imagine renting a moving truck to carry one sofa every day: it works, but a van would do the same job for much less. AWS has a tool, Compute Optimizer, that looks at how hard your servers really work and suggests smaller or better-fitting ones. AWS also makes its own chips, called Graviton, that often do the same work for less money, as long as your software can run on them. And for jobs that only run now and then, you can pay per use (serverless) instead of keeping a server switched on all day. The golden rule: shrink first, then sign any long-term discount deal.",
  "body": [
   "Right-sizing means matching resources to what a workload actually uses, and it is one of the most direct cost levers the SAA-C03 exam tests. Many instances are launched larger than needed, often copied from an on-premises server specification or chosen in a hurry, and never revisited. Because you pay for provisioned capacity whether or not it is used, right-sizing is often the fastest way to save money. It should come before buying Savings Plans or Reserved Instances, so you do not lock in discounts on waste for one or three years. This lesson covers the evidence (Compute Optimizer), a hardware lever (Graviton), a cost-model lever (serverless versus always-on) and the simplest lever of all, turning things off.",
   "Start with evidence. AWS Compute Optimizer analyzes Amazon CloudWatch utilization metrics, such as CPU, network, disk and, when the CloudWatch agent publishes it, memory, for Amazon EC2 instances, Auto Scaling groups, Amazon Elastic Block Store (EBS) volumes, AWS Lambda functions, Amazon Elastic Container Service (ECS) services on AWS Fargate and supported Amazon Relational Database Service (RDS) databases. It classifies each resource as over-provisioned, under-provisioned or optimized, and recommends specific instance types, volume configurations or Lambda memory sizes, with the projected performance risk and savings for each option. You opt in once, then view results in the console or with `aws compute-optimizer get-ec2-instance-recommendations`. A finding might read, in effect, over-provisioned: CPU and memory well below capacity, three alternative types listed with low, medium or high performance risk.",
   "Memory deserves special attention. EC2 does not collect memory metrics by default, because the hypervisor cannot see inside the guest operating system. Without memory data, a recommendation based only on CPU could shrink a memory-hungry application until it runs out of memory. Installing the CloudWatch agent to publish memory utilization makes memory-aware recommendations possible. Other tools overlap here: AWS Cost Explorer offers rightsizing recommendations, and AWS Trusted Advisor flags low-utilization instances. All of them depend on a representative window of data, so let metrics accumulate over normal business cycles before acting.",
   "Next, consider the processor. AWS Graviton processors are Arm-based chips designed by AWS. Graviton instance types, marked with a `g` in the name such as `m7g` or `c7g`, typically offer better price performance than comparable x86 instances for many workloads, along with lower energy use. The catch is compatibility: software must run on the Arm64 architecture. Interpreted and just-in-time (JIT) compiled languages such as Python, Node.js, Java and .NET usually move easily, and many container images are published for multiple architectures. Native binaries must be recompiled, and some commercial software may not yet support Arm, so test before switching. Graviton is also available for Lambda, Fargate, RDS, Amazon Aurora and Amazon ElastiCache, where switching is often just a configuration change and can be a quick win.",
   "The deeper choice is the cost model. An always-on EC2 instance or container costs the same whether it serves one request or a million, so it is efficient for steady, high utilization, especially when covered by Savings Plans. Serverless services such as Lambda, Fargate for short-lived tasks, Amazon DynamoDB on-demand and Aurora Serverless v2 charge for actual usage, so they are efficient for idle, spiky or unpredictable workloads, and they remove patching and capacity work as well. At very high, constant volumes a well-utilized fleet can become cheaper than per-request pricing, so the right answer depends on the traffic pattern rather than on a blanket rule. For Lambda, the memory setting also determines CPU, so right-sizing memory, which Compute Optimizer and the open source Lambda Power Tuning tool help with, can reduce both duration and cost.",
   "Also switch off what you do not need. Schedule development and test environments to stop outside working hours with the Instance Scheduler on AWS solution or Amazon EventBridge Scheduler rules; an environment used 50 hours a week is idle for most of the week's 168 hours. Delete unused Elastic IP addresses and idle load balancers, and tag resources with an owner so orphans can be traced and removed. Right-sizing is not a one-time project either: usage changes, so review recommendations regularly.",
   "A worked example shows the right order of operations. A company's fleet of 40 `m5.2xlarge` instances averages 12 percent CPU. Before acting, the team installs the CloudWatch agent so memory is visible, and after two weeks Compute Optimizer recommends `m7g.large` with low performance risk. The Java application runs unchanged on Arm after a multi-architecture container rebuild, and load tests confirm latency. Only then does the team cover the smaller fleet with a Savings Plan sized from Cost Explorer's recommendation. An internal reporting tool used a few times a day moves from an always-on instance to Lambda, and the development environment now stops every evening and weekend.",
   "The common mistakes follow from skipping steps. Teams buy commitments before right-sizing. They trust CPU-only data for memory-bound workloads, which can produce a recommendation that runs out of memory. They assume every application runs on Graviton without testing native dependencies. They move a steady, high-volume service to per-request pricing and pay more. They right-size once and never again. And they shrink below what peak demand needs, when Auto Scaling should handle peaks instead of every instance being sized for them. On the exam, 'recommend instance types based on utilization' or 'identify over-provisioned resources' points to Compute Optimizer; 'memory utilization not visible' points to the CloudWatch agent; 'better price performance' with 'minimal code changes' for Java, Python or Node.js points to Graviton; 'runs a few times a day' or 'idle most of the time' points to serverless; 'steady high utilization' points to right-sized instances with commitments; and 'development environments run all night' points to scheduled stop and start."
  ],
  "analogy": "Right-sizing is like adjusting a thermostat based on a week of actual temperature readings rather than on the setting the previous tenant left. Compute Optimizer is the thermometer log, the CloudWatch agent is adding a humidity sensor so you see the whole picture, and a Savings Plan is a fixed-price energy contract you should only sign after you know how much you really use. Where it stops: a thermostat change is instantly reversible, while a three-year commitment is not, which is exactly why the order matters.",
  "mnemonic": "Cost order of operations: MRC, Measure, Right-size, Commit. Measure with CloudWatch (including memory), right-size with Compute Optimizer and Graviton, then commit with Savings Plans.",
  "terms": [
   [
    "Right-sizing",
    "Adjusting resource types and sizes to match actual utilization and performance needs."
   ],
   [
    "AWS Compute Optimizer",
    "A service that uses utilization metrics to recommend optimal EC2, EBS, Lambda, ECS on Fargate, RDS and other configurations."
   ],
   [
    "AWS Graviton",
    "AWS-designed Arm-based processors offering strong price performance for compatible workloads."
   ],
   [
    "CloudWatch agent",
    "Software that publishes additional metrics such as memory utilization from instances to CloudWatch."
   ],
   [
    "Over-provisioned",
    "A resource whose capacity is well above what the workload uses, so it can be downsized."
   ],
   [
    "Instance Scheduler on AWS",
    "An AWS solution that starts and stops EC2 and RDS instances on defined schedules."
   ],
   [
    "Serverless cost model",
    "Paying per request or per unit of actual usage instead of for provisioned capacity that runs continuously."
   ]
  ],
  "example": "A company's fleet of 40 m5.2xlarge instances averages 12 percent CPU. Compute Optimizer, with memory data from the CloudWatch agent, recommends m7g.large. The Java application runs unchanged on Arm after a container rebuild, and the team then covers the smaller fleet with a Savings Plan. An internal tool used a few times a day moves from an always-on instance to Lambda.",
  "mistakes": [
   [
    "Buy the Savings Plan first, then right-size later.",
    "A commitment sized to oversized instances locks in waste for one or three years. Right-size first, then commit to the smaller footprint."
   ],
   [
    "CPU utilization alone is enough to downsize safely.",
    "EC2 does not report memory without the CloudWatch agent. A memory-bound workload can look idle on CPU and still need its RAM."
   ],
   [
    "Every application can move to Graviton with no testing.",
    "Graviton is Arm64. Interpreted and JIT languages usually move easily, but native binaries and some commercial software need recompiling or may not be supported."
   ],
   [
    "Serverless is always cheaper than instances.",
    "Per-request pricing wins for idle or spiky work. For steady, very high volume, a well-utilized fleet with commitments can be cheaper."
   ]
  ],
  "tryit": [
   [
    "A Node.js API runs on 12 `c5.xlarge` instances with steady traffic around the clock. Compute Optimizer shows them as optimized on size. The team wants better price performance without rewriting code. What do you suggest, and what must they verify?",
    "Test the API on Graviton instances of a similar size, such as the matching `c7g` type. Node.js usually runs on Arm64 without code changes, but they must verify that any native modules and the container image support Arm64 and load test before switching, then consider a Savings Plan for the steady fleet."
   ],
   [
    "An internal PDF generator runs on a dedicated `m5.large` instance around the clock but is called about 30 times a day, each call taking a few seconds. What cost model fits better?",
    "A serverless model such as Lambda. The workload is idle almost all the time, so paying per invocation removes the cost of thousands of idle hours each year and removes patching work."
   ]
  ],
  "tip": "Get recommendations from utilization data: Compute Optimizer. Better price performance with recompile-free languages: Graviton. Idle or spiky workloads favor serverless; steady high utilization favors provisioned capacity with commitments. Right-size before committing.",
  "check": [
   [
    "Why might Compute Optimizer give less accurate EC2 recommendations by default?",
    "EC2 does not report memory utilization without the CloudWatch agent, so memory-bound workloads can be misjudged."
   ],
   [
    "What must you check before moving an application to Graviton?",
    "That its code and dependencies support Arm64; native binaries and some libraries may need recompiling or replacing."
   ],
   [
    "Why should you right-size before buying a Savings Plan?",
    "A commitment sized to oversized instances locks in paying for waste for one or three years."
   ],
   [
    "A reporting job runs for two minutes four times a day on a dedicated instance. What cost model fits better?",
    "A serverless option such as Lambda, which charges only while the job runs instead of for idle hours."
   ],
   [
    "For Lambda, why does right-sizing memory affect cost beyond the memory price itself?",
    "Memory size also sets CPU allocation, so the right memory setting can shorten duration, and duration is part of what you pay for."
   ]
  ]
 },
 {
  "t": "S3 storage classes: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA and the three Glacier classes",
  "hook": "Dr. Okafor, the records officer at Pinecrest Medical Group, calls you with two demands that seem to pull in opposite directions. Radiologists must be able to open any scan from the last year instantly, because a patient may be on the table. But the group must also keep every image for ten years, and the storage bill has doubled since everything landed in one S3 bucket. \"Surely we are not paying top price to store scans nobody has opened since 2019,\" she says. S3 offers more than half a dozen storage classes with names that blur together. Which class fits each stage of a scan's life, and which choice would quietly lose data or lock a doctor out for twelve hours?",
  "simple": "Amazon S3 storage classes are like different places to keep your belongings. Your kitchen counter holds things you use every day: easy to reach, but space is pricey. A hall closet holds things you use now and then: cheaper, and still quick to grab, but there is a small charge each time you open it. A storage unit across town is cheaper still, but you must request a visit and wait. A deep archive warehouse is the cheapest of all, but getting something back can take most of a day. All of these places are equally safe from losing your things, except the budget closets that sit in only one building, which can be lost if that building burns down. You pick a spot based on how often and how fast you need each item.",
  "body": [
   "All Amazon Simple Storage Service (S3) storage classes are designed for the same very high durability, eleven nines (99.999999999 percent). The exception to keep in mind is the One Zone classes, which store data in a single Availability Zone (AZ) and so can lose data if that AZ is destroyed. What differs between classes is availability, retrieval speed, minimum storage duration, minimum billable object size, retrieval fees and storage price. Picking the class that fits the access pattern is one of the most common cost questions on the SAA-C03 exam, and the answer always comes from two facts in the scenario: how often the data is read and how fast it must be available when it is.",
   "Start with the classes for live data. S3 Standard is for frequently accessed data: low latency, high throughput, no retrieval fee and no minimum duration, which makes it the safe default and the right home for short-lived objects. S3 Standard-Infrequent Access (Standard-IA) is cheaper to store but charges a per-GB retrieval fee, has a 30-day minimum storage charge and a 128 KB minimum billable object size. It suits backups and older data that must still be available in milliseconds when requested. S3 One Zone-IA costs less than Standard-IA because it stores data in one AZ only; use it for data you can recreate, such as secondary backup copies or generated thumbnails, never for the only copy of something important. You set the class at upload, for example `aws s3 cp report.pdf s3://docs-bucket/ --storage-class STANDARD_IA`, or move objects later with lifecycle rules.",
   "When you cannot predict access, let S3 decide. S3 Intelligent-Tiering automatically moves each object between access tiers based on that object's own access pattern. Objects not accessed for 30 consecutive days move to an Infrequent Access tier, and after 90 days to an Archive Instant Access tier, all with millisecond access, and an object that is read moves back to the Frequent Access tier. Optional Archive Access and Deep Archive Access tiers, which you opt into, hold even colder data with asynchronous retrieval. There are no retrieval fees, only a small monthly monitoring and automation charge per object; objects smaller than 128 KB are not monitored and are always charged at the frequent access rate. It is the answer when access patterns are unknown, changing or different for each object.",
   "The three Glacier classes are for archives, and they differ mainly in how quickly you can read data back. S3 Glacier Instant Retrieval offers millisecond access for data accessed about once a quarter, with a 90-day minimum and higher retrieval fees than Standard-IA, so it is the cheapest class that is still instant. S3 Glacier Flexible Retrieval, formerly just S3 Glacier, is cheaper to store, but objects must be restored before use, with retrievals taking minutes (expedited) to hours (standard or bulk, where bulk retrievals are free), and a 90-day minimum. S3 Glacier Deep Archive is the lowest-cost storage in AWS, for data kept for years for compliance, with standard retrieval within 12 hours, bulk within 48 hours, and a 180-day minimum.",
   "Costs have more than one component, so compare the whole picture. Weigh storage cost against retrieval and request costs: a class with cheap storage but frequent retrievals can cost more than Standard. Remember that an object deleted or transitioned before its class's minimum duration is still billed for the remaining days, and that minimum billable object sizes make IA classes poor homes for millions of tiny files. These are the details that turn an apparently cheaper class into a more expensive one.",
   "A worked example walks one dataset through several classes. A hospital keeps imaging files that are read often for a month, occasionally for a year, and must be kept for ten years. New images go to S3 Standard. After 30 days a lifecycle rule moves them to Standard-IA, because doctors still open some of them and need them immediately. After a year they move to Glacier Instant Retrieval, since the rare lookup must still be instant, and after three years to Glacier Deep Archive for compliance-only retention, where a 12-hour wait is acceptable. A separate bucket of patient-portal thumbnails, which can be regenerated from the originals, uses One Zone-IA.",
   "Several mistakes appear in nearly every practice set. Learners choose One Zone-IA for the only copy of important data. They choose Glacier Flexible Retrieval or Deep Archive when the question says the data must be available immediately. They move millions of tiny objects to IA or Glacier classes, where per-object charges and minimum sizes can raise costs. They forget minimum storage durations, so short-lived data placed in IA costs more than it would in Standard. And they assume Intelligent-Tiering has retrieval fees, when it has none, only the per-object monitoring charge.",
   "Exam questions usually encode the access pattern in a phrase. 'Unknown', 'unpredictable' or 'changing access patterns' points to Intelligent-Tiering. 'Infrequently accessed but must be available immediately' points to Standard-IA, or to Glacier Instant Retrieval if access is about quarterly and cost matters most. 'Can be recreated' or 'secondary copy' plus lowest cost with millisecond access points to One Zone-IA. 'Archive, retrieval within minutes to hours' points to Glacier Flexible Retrieval. 'Retain for years for compliance, rarely or never read, retrieval within 12 or 48 hours acceptable, lowest cost' points to Glacier Deep Archive."
  ],
  "analogy": "Think of a library. New releases sit on the front shelf (Standard), older books go to the back stacks where a librarian charges a small fee to fetch them (Standard-IA), and rarely requested volumes go to an off-site depository you must request in advance (Glacier Flexible Retrieval) or to a vault in another state that takes a day or two (Deep Archive). Intelligent-Tiering is a librarian who moves each book based on how often it is borrowed. One Zone-IA is a cheaper back room in a single building, fine for photocopies but not for the only manuscript.",
  "mnemonic": "Minimum storage durations: 30, 90, 90, 180. Standard-IA and One Zone-IA 30 days, Glacier Instant and Flexible Retrieval 90 days, Deep Archive 180 days. Standard has none.",
  "terms": [
   [
    "S3 Standard",
    "The default class for frequently accessed data, with no retrieval fees or minimum duration."
   ],
   [
    "Standard-IA",
    "An S3 class for infrequently accessed data with millisecond access, retrieval fees, a 30-day minimum and a 128 KB minimum billable size."
   ],
   [
    "One Zone-IA",
    "A lower-cost infrequent-access class that stores data in a single Availability Zone."
   ],
   [
    "Intelligent-Tiering",
    "An S3 class that automatically moves objects between access tiers based on their usage, with no retrieval fees."
   ],
   [
    "Glacier Instant Retrieval",
    "An archive class with millisecond access for data read about once a quarter, with a 90-day minimum."
   ],
   [
    "Glacier Flexible Retrieval",
    "An archive class whose objects must be restored first, taking minutes to hours, with a 90-day minimum."
   ],
   [
    "Glacier Deep Archive",
    "The lowest-cost S3 class, for long-term archives retrieved within 12 to 48 hours, with a 180-day minimum."
   ],
   [
    "Minimum storage duration",
    "The shortest period an object is billed for in a class, even if it is deleted or moved sooner."
   ]
  ],
  "example": "A hospital keeps imaging files that are read often for a month, occasionally for a year, and must be kept for ten years. New images go to S3 Standard, move to Standard-IA after 30 days, to Glacier Instant Retrieval after a year because doctors may still need them quickly, and to Glacier Deep Archive after three years for compliance-only retention.",
  "mistakes": [
   [
    "One Zone-IA is fine for primary backups because S3 durability is eleven nines.",
    "One Zone classes keep data in one AZ, so the loss of that AZ can destroy the data. Use them only for data you can recreate."
   ],
   [
    "Glacier Flexible Retrieval works when data must be available immediately.",
    "Flexible Retrieval requires a restore that takes minutes to hours. For instant access to archive data, use Glacier Instant Retrieval."
   ],
   [
    "Moving everything to Standard-IA always saves money.",
    "Short-lived objects are billed for 30 days, tiny objects are billed as 128 KB, and frequent reads add retrieval fees. Standard can be cheaper."
   ],
   [
    "Intelligent-Tiering charges retrieval fees when objects warm up again.",
    "It has no retrieval fees, only a small monthly monitoring and automation charge per monitored object."
   ]
  ],
  "tryit": [
   [
    "A marketing team stores campaign assets in S3. Some files are used daily for a week and then never again; others are reopened unpredictably months later. Nobody can say in advance which files will be which. Which storage class do you recommend?",
    "S3 Intelligent-Tiering. Each object moves between tiers based on its own access, so the team does not have to predict usage, there are no retrieval fees when an old file is reopened, and the only extra cost is a small per-object monitoring charge."
   ],
   [
    "An insurer must keep closed claim files for seven years. Auditors request a file perhaps twice a year and accept delivery within two days. Which class is cheapest, and what is the catch?",
    "S3 Glacier Deep Archive, the lowest-cost class, with bulk retrieval within 48 hours that fits the two-day window. The catch is the 180-day minimum storage duration and the need to restore objects before they can be read."
   ]
  ],
  "tip": "Unknown or changing access: Intelligent-Tiering. Rarely read but must be instant: Standard-IA or Glacier Instant Retrieval. Recreatable data: One Zone-IA. Archive with hours of retrieval acceptable at the lowest price: Deep Archive.",
  "check": [
   [
    "Which S3 classes could lose data if one Availability Zone is destroyed?",
    "The One Zone classes, such as S3 One Zone-IA, because they store data in only one AZ."
   ],
   [
    "Data must be kept seven years and is almost never read; retrieval within 48 hours is acceptable. Which class is cheapest?",
    "S3 Glacier Deep Archive."
   ],
   [
    "Objects are read unpredictably, some daily and some never. Which class avoids guessing?",
    "S3 Intelligent-Tiering, which moves each object between tiers based on its own access, with no retrieval fees."
   ],
   [
    "You store files in Standard-IA and delete them after 10 days. How are you billed?",
    "For the 30-day minimum storage duration, so short-lived data is usually cheaper in S3 Standard."
   ],
   [
    "Archive data is read about once a quarter but must open in milliseconds. Which class is usually cheapest?",
    "S3 Glacier Instant Retrieval."
   ]
  ]
 },
 {
  "t": "S3 Lifecycle rules, S3 Storage Lens and Requester Pays",
  "hook": "Tomas runs the platform team at Copperleaf Logistics, and this quarter's finance review has a slide with his name on it: S3 is now the third-largest line on the bill. The odd part is that developers swear they delete old log files every month. He opens the logging bucket and sees versioning enabled, years of overwritten objects, and thousands of uploads that started and never finished. Meanwhile a university research group has asked to download a 200 TB shipment-tracking dataset his company publishes, and Copperleaf would be paying for every byte they pull. Where is the money really going, and how does he stop paying for data nobody wants and downloads he did not request?",
  "simple": "Data in S3 is like food in a fridge: fresh items are used often, older ones less, and some should be thrown out. Lifecycle rules are a set of instructions you give S3, like \"move anything older than 30 days to the cheaper shelf, and throw away leftovers after a year.\" S3 then does it automatically, forever. S3 Storage Lens is a dashboard that shows where your storage money goes across every account and bucket, like an energy monitor showing which appliance uses the most power. Requester Pays is a setting that says \"if you want to download my big dataset, you pay the delivery cost,\" while you keep paying to store it. Together they keep the bill tidy without anyone remembering to clean up by hand.",
  "body": [
   "Choosing a storage class once is not enough, because data cools over time: this week's logs are read constantly, last year's almost never. Amazon Simple Storage Service (S3) gives you three tools that the SAA-C03 exam pairs with cost questions. Lifecycle rules automate moving and deleting data as it ages. S3 Storage Lens provides analytics that show where storage money is going across the whole organization. Requester Pays is a billing option for sharing large datasets without paying for everyone else's downloads. This lesson takes them in that order.",
   "Lifecycle rules are configured on a bucket and apply to all objects, or to a subset filtered by prefix, object tags or object size. A rule has two kinds of actions. Transition actions move objects to a cheaper storage class a number of days after creation, for example to S3 Standard-Infrequent Access (Standard-IA) after 30 days and to S3 Glacier Flexible Retrieval after 90. Expiration actions delete objects after a period. On versioned buckets, separate noncurrent version actions transition or expire older versions, for example keep noncurrent versions for 30 days and then delete them, which stops old versions quietly growing the bill every time a file is overwritten or deleted. Rules can also remove expired object delete markers and abort incomplete multipart uploads after a set number of days, cleaning up the invisible parts that still incur storage charges.",
   "A lifecycle configuration is a small JSON document you apply with `aws s3api put-bucket-lifecycle-configuration --bucket app-logs --lifecycle-configuration file://rules.json`. A typical rule for logs looks like this.",
   "```json\n{\"Rules\": [{\"ID\": \"logs\", \"Status\": \"Enabled\",\n  \"Filter\": {\"Prefix\": \"logs/\"},\n  \"Transitions\": [{\"Days\": 30, \"StorageClass\": \"STANDARD_IA\"},\n                  {\"Days\": 90, \"StorageClass\": \"GLACIER\"}],\n  \"NoncurrentVersionExpiration\": {\"NoncurrentDays\": 30},\n  \"AbortIncompleteMultipartUpload\": {\"DaysAfterInitiation\": 7}}]}\n```",
   "Reading that rule line by line shows each idea in action. The filter limits it to objects under `logs/`. The transitions move current objects to Standard-IA at 30 days and to Glacier Flexible Retrieval, whose API name is still `GLACIER`, at 90 days. The noncurrent version expiration deletes old versions 30 days after they stop being current, and the multipart rule cleans up abandoned uploads after a week. You can check what a bucket currently has with `aws s3api get-bucket-lifecycle-configuration --bucket app-logs`.",
   "Transitions have rules of their own. They follow a one-way waterfall from warmer to colder classes; a lifecycle rule cannot move objects back to S3 Standard, which requires restoring or copying them. Some transitions have minimums: objects must be stored at least 30 days before a lifecycle transition to Standard-IA or One Zone-IA. Remember minimum storage durations and per-object transition charges too, so transitioning millions of tiny objects may cost more than it saves; by default, lifecycle rules do not transition objects smaller than 128 KB. When you cannot predict access patterns, S3 Intelligent-Tiering is often simpler than hand-tuned rules.",
   "S3 Storage Lens gives organization-wide visibility into storage usage and activity across accounts, Regions, buckets and prefixes. It highlights cost-efficiency opportunities, such as buckets without lifecycle rules, large amounts of noncurrent versions or incomplete multipart uploads, and data protection gaps, such as buckets without versioning or replication. Free metrics are included; advanced metrics and recommendations are a paid upgrade. Storage Lens is configured once, typically from the AWS Organizations management account or a delegated administrator account, and its dashboard is the fastest way to spot which buckets deserve a lifecycle rule. S3 Storage Class Analysis is a related but narrower per-bucket feature that observes access patterns to suggest when to transition data to Standard-IA.",
   "Requester Pays changes who pays for downloads. Normally the bucket owner pays for storage and for data transferred out of the bucket. With Requester Pays enabled, the requester pays the request and data transfer costs, while the owner still pays for storage. Requesters must be authenticated AWS identities and must acknowledge the charge, for example with `--request-payer requester` in the AWS Command Line Interface (CLI), so anonymous access is not possible. It suits sharing large datasets, such as research or genomic data, with other organizations that have their own AWS accounts.",
   "A worked example connects the three tools. A company finds with Storage Lens that one logging bucket holds hundreds of terabytes of noncurrent versions and abandoned multipart uploads. It adds a lifecycle rule that moves current logs to Standard-IA after 30 days and Glacier Flexible Retrieval after 90, expires noncurrent versions after 30 days and aborts incomplete uploads after seven days, and the bucket's monthly cost falls steeply. Storage Lens is then reviewed each month to confirm the savings and find the next bucket to tidy. Common mistakes mirror this story: forgetting noncurrent version rules on versioned buckets, expecting a lifecycle rule to move data back to a warmer class, transitioning short-lived or tiny objects into IA or Glacier classes, enabling Requester Pays on a bucket meant for anonymous public access, and confusing Storage Lens (organization-wide dashboard) with Storage Class Analysis (per-bucket access analysis).",
   "Exam wording is usually direct. 'Automatically move objects to cheaper storage as they age' or 'delete logs after a year' points to lifecycle rules. 'Old versions filling a versioned bucket' points to a noncurrent version expiration action. 'Organization-wide visibility of storage usage and cost-saving opportunities across accounts' points to S3 Storage Lens. 'Others downloading our large dataset should pay the transfer costs' points to Requester Pays, which requires authenticated requesters."
  ],
  "analogy": "A lifecycle rule is like an office records policy: papers stay on desks for a month, move to filing cabinets for a quarter, then go to off-site storage, and are shredded after the retention period. Noncurrent version rules are the policy for old drafts, which otherwise pile up behind every final copy. Storage Lens is the facilities manager's floor-by-floor report of who is using the most cabinet space. Where it stops: unlike a clerk, a lifecycle rule never carries boxes back from off-site storage on its own.",
  "terms": [
   [
    "Lifecycle rule",
    "A bucket configuration that transitions or expires objects automatically based on age and filters such as prefix, tag or size."
   ],
   [
    "Transition action",
    "A lifecycle action that moves objects to a colder storage class after a set number of days."
   ],
   [
    "Expiration action",
    "A lifecycle action that deletes objects, or noncurrent versions, after a set period."
   ],
   [
    "Noncurrent version",
    "An older version of an object in a versioned bucket, which lifecycle rules can transition or expire separately."
   ],
   [
    "Incomplete multipart upload",
    "Parts of an upload that was started but never completed; they incur storage charges until aborted."
   ],
   [
    "S3 Storage Lens",
    "An analytics dashboard providing organization-wide storage usage, activity and recommendations."
   ],
   [
    "Storage Class Analysis",
    "A per-bucket feature that analyzes access patterns to suggest when to transition data to Standard-IA."
   ],
   [
    "Requester Pays",
    "A bucket setting that makes authenticated requesters pay for requests and data transfer."
   ]
  ],
  "example": "A company finds with Storage Lens that one logging bucket holds hundreds of terabytes of noncurrent versions and abandoned multipart uploads. It adds a lifecycle rule that moves current logs to Standard-IA after 30 days and Glacier Flexible Retrieval after 90, expires noncurrent versions after 30 days and aborts incomplete multipart uploads after seven days.",
  "mistakes": [
   [
    "Deleting objects in a versioned bucket stops the storage charges.",
    "Deletion adds a delete marker and the old versions remain and keep costing money. Add a noncurrent version expiration action and clean up expired delete markers."
   ],
   [
    "A lifecycle rule can bring archived objects back to S3 Standard when they become popular.",
    "Lifecycle transitions only flow to colder classes. Moving data back requires a restore or copy operation."
   ],
   [
    "Requester Pays works for a public, anonymous download page.",
    "Requesters must be authenticated AWS identities that acknowledge the charge, so anonymous requests are rejected."
   ],
   [
    "Storage Lens and Storage Class Analysis are the same thing.",
    "Storage Lens is an organization-wide dashboard across accounts and buckets. Storage Class Analysis watches one bucket's access to suggest Standard-IA transitions."
   ]
  ],
  "tryit": [
   [
    "A data team uploads large files to S3 using multipart upload from unreliable field connections. Storage Lens shows several terabytes of incomplete multipart uploads in their bucket. Nobody can see these parts in the object listing. What do you add?",
    "A lifecycle rule with an abort incomplete multipart upload action, for example after seven days. The orphaned parts do not appear as objects but are still billed, and the rule removes them automatically."
   ],
   [
    "A genomics institute shares a 300 TB dataset with partner universities that each have AWS accounts. Download costs are rising every month and the institute wants partners to cover them while it keeps paying for storage. What should it enable?",
    "Requester Pays on the bucket. Partners make authenticated requests that acknowledge the charge and pay for requests and data transfer, while the institute continues to pay only for storage."
   ]
  ],
  "tip": "Old versions filling a versioned bucket: add a noncurrent version expiration rule. Organization-wide storage visibility: Storage Lens. Others downloading your large dataset should pay transfer costs: Requester Pays, which requires authenticated requesters.",
  "check": [
   [
    "Can a lifecycle rule move objects from Glacier Flexible Retrieval back to S3 Standard?",
    "No. Lifecycle transitions only move data to colder classes. Restoring or copying objects is a separate operation."
   ],
   [
    "Under Requester Pays, who pays for storing the data?",
    "The bucket owner still pays for storage; requesters pay for requests and data transfer."
   ],
   [
    "A versioned bucket's size keeps growing even though users delete files. What should you add?",
    "A lifecycle rule with a noncurrent version expiration action, plus removal of expired delete markers."
   ],
   [
    "Which tool shows storage usage and cost-efficiency recommendations across all accounts in an organization?",
    "S3 Storage Lens."
   ],
   [
    "How long must objects stay in their current class before a lifecycle transition to Standard-IA?",
    "At least 30 days."
   ]
  ]
 },
 {
  "t": "Cutting EBS and backup costs: gp2 to gp3, Data Lifecycle Manager, snapshot archive and unattached volumes",
  "hook": "It is the end of the quarter at Saltmarsh Analytics, and Jordan has been asked to find savings in EBS before the budget meeting on Thursday. The first query is unsettling: 300 gp2 volumes, 80 volumes attached to nothing at all, and five years of daily snapshots that nobody has ever deleted because \"you might need them.\" The production team is nervous; last time someone touched storage there was an outage. Jordan's manager wants real numbers without a maintenance window. Can storage costs fall sharply without stopping a single instance, and which of those snapshots can safely go?",
  "simple": "EBS volumes are the virtual hard drives attached to cloud servers, and snapshots are backup copies of them. You pay for the full size of each drive you create, even if it is empty or not plugged into anything, and you pay for every backup you keep. Saving money comes down to four habits. Switch older drives to a newer, cheaper type (gp3), which AWS lets you do while they keep running. Let a scheduler make backups and delete old ones automatically. Move backups you must keep for years but almost never use into a cheap archive. And find drives that are plugged into nothing, then remove them. It is like cancelling the storage units you forgot you were renting.",
  "body": [
   "Block storage and its backups are easy to forget, and they keep costing money every month whether anyone uses them or not. Amazon Elastic Block Store (EBS) volumes are billed for provisioned size (and, for some volume types, provisioned performance), not for the data actually written, and snapshots are billed for the data they store. A handful of habits typically removes a large share of EBS waste without affecting performance, and the SAA-C03 exam tests each of them: choosing the right volume type, automating snapshot retention, archiving long-term snapshots and finding orphaned volumes.",
   "Start with volume types, because this is often the easiest win. Many older environments still use gp2 volumes, where IOPS (input/output operations per second) scale with volume size, so teams often over-provisioned storage just to get the performance they needed. gp3 provides a baseline of 3,000 IOPS and 125 MB/s regardless of size, lets you buy more IOPS and throughput separately from capacity, and is priced lower per GB than gp2. That decoupling means you can size a volume for the data it holds and buy performance only if you need more than the baseline.",
   "Changing type does not require downtime. Elastic Volumes lets you change a volume from gp2 to gp3 while it stays attached and in use: `aws ec2 modify-volume --volume-id vol-0abc123 --volume-type gp3`. The volume moves through modification states, such as optimizing, while the instance keeps running. The same feature lets you grow volumes, change IOPS or throughput, or change types later. Volumes cannot be shrunk in place, though; shrinking means creating a smaller volume and copying the data across, so avoid over-allocating size in the first place.",
   "Next, snapshots. EBS snapshots are incremental: after the first full copy, each snapshot stores only the blocks changed since the previous one. When you delete an old snapshot, EBS keeps any blocks that later snapshots still need, so every remaining snapshot stays fully restorable and you can safely delete old ones. Costs grow when snapshots are never cleaned up. Amazon Data Lifecycle Manager (DLM) automates the creation, retention and deletion of EBS snapshots and EBS-backed Amazon Machine Images (AMIs) using policies that target volumes or instances by tag: for example, snapshot every 12 hours, keep 14 copies, and copy weekly snapshots to another Region for disaster recovery. AWS Backup can do this too, across many services at once, with central backup plans and vaults, which is the better fit when the scenario spans databases, file systems and volumes together.",
   "For snapshots you must keep for a long time but rarely restore, use the archive tier. EBS Snapshots Archive moves a snapshot to a much lower-cost tier, suited to month-end, year-end or compliance snapshots. Archived snapshots are stored as full snapshots rather than incremental ones, have a minimum archive period of 90 days, and must be restored to the standard tier before use, which can take up to 72 hours. So archive snapshots you keep for 90 days or longer and rarely need, and keep recent operational snapshots in the standard tier where restores are quick. Separately, the Recycle Bin can retain deleted snapshots and AMIs for a period you choose, guarding against accidental or malicious deletion.",
   "Finally, find orphans. Unattached EBS volumes, shown in the `available` state, are still billed in full. They often appear when instances are terminated while their data volumes were not set to delete on termination. You can list them with `aws ec2 describe-volumes --filters Name=status,Values=available`. AWS Cost Explorer, AWS Trusted Advisor's underutilized and idle volume checks, AWS Compute Optimizer and AWS Config rules help find them across accounts. Snapshot a volume if in doubt, then delete it. Also look for old AMIs whose backing snapshots are still stored, and for over-provisioned io1 or io2 IOPS that could move to gp3.",
   "A worked example shows the habits together. A cost review finds 300 gp2 volumes, 80 unattached volumes and five years of daily snapshots that nobody has pruned. The team converts the gp2 volumes to gp3 in place with Elastic Volumes during business hours with no outage, snapshots and deletes the unattached volumes after checking tags for owners, creates a DLM policy that keeps 14 daily snapshots for every volume tagged `Backup=daily`, deletes the old daily snapshots, and moves the required year-end snapshots to the archive tier. The monthly EBS bill drops substantially, and restores are now predictable.",
   "The common mistakes and exam cues line up neatly. Learners believe a gp2 to gp3 change requires downtime or a new volume; archive snapshots needed for quick restores or kept for under 90 days; think deleting an older incremental snapshot breaks newer ones; forget that detached volumes and AMI-backing snapshots keep costing money; expect Elastic Volumes to shrink a volume; and leave `DeleteOnTermination` off for data volumes on disposable instances, which is how orphans accumulate. On the exam, 'reduce EBS cost without downtime' or 'gp2 volumes' points to gp3 with Elastic Volumes; 'automate snapshot creation and retention by tag' points to Data Lifecycle Manager, or AWS Backup when several services are involved; 'long-term, rarely accessed snapshots at lowest cost' points to EBS Snapshots Archive; 'volumes in the available state' points to deleting unattached volumes; and 'protect against accidental snapshot deletion' points to Recycle Bin."
  ],
  "analogy": "Incremental snapshots work like a photo album where the first page is a full picture and each later page records only what changed. If you tear out an early page, AWS quietly copies whatever later pages still depend on, so every remaining page still shows the full scene. The archive tier is moving a finished album to a cheap warehouse: storage is cheap, but it is stored whole, and getting it back takes days. The analogy stops at billing: you pay only for unique changed blocks, not for each page as a full photo.",
  "terms": [
   [
    "gp3",
    "A general purpose SSD volume type with a 3,000 IOPS and 125 MB/s baseline at any size, with extra IOPS and throughput bought separately."
   ],
   [
    "Elastic Volumes",
    "An EBS feature to change volume type, size, IOPS or throughput while the volume is in use; it cannot shrink a volume."
   ],
   [
    "Incremental snapshot",
    "An EBS snapshot that stores only blocks changed since the previous snapshot."
   ],
   [
    "Data Lifecycle Manager",
    "A service that automates EBS snapshot and AMI creation, retention and cross-Region copies by tag-based policy."
   ],
   [
    "EBS Snapshots Archive",
    "A low-cost tier for rarely accessed snapshots with a 90-day minimum and restores taking up to 72 hours."
   ],
   [
    "Recycle Bin",
    "A feature that retains deleted snapshots and AMIs for a set period so they can be recovered."
   ],
   [
    "Unattached volume",
    "An EBS volume in the available state, not attached to any instance but still billed."
   ]
  ],
  "example": "A cost review finds 300 gp2 volumes, 80 unattached volumes and five years of daily snapshots. The team converts gp2 to gp3 in place with Elastic Volumes, snapshots and deletes the unattached volumes, creates a DLM policy that keeps 14 daily snapshots, and moves required year-end snapshots to the archive tier.",
  "mistakes": [
   [
    "Changing gp2 to gp3 needs a maintenance window and a new volume.",
    "Elastic Volumes changes the type in place while the volume stays attached and in use, with no downtime."
   ],
   [
    "Deleting the oldest snapshot will break the newer incremental ones.",
    "EBS keeps any blocks later snapshots still reference, so each remaining snapshot stays fully restorable."
   ],
   [
    "Archive every snapshot to save the most money.",
    "Archived snapshots have a 90-day minimum, are stored as full copies and take up to 72 hours to restore. Keep recent operational snapshots in the standard tier."
   ],
   [
    "A volume that is not attached to anything costs nothing.",
    "Unattached volumes in the available state are billed for their full provisioned size until deleted."
   ]
  ],
  "tryit": [
   [
    "A team must keep a snapshot of each production volume from the last day of every month for seven years for auditors. Restores are expected perhaps once a year and can wait a few days. Where should those monthly snapshots live, and what still stays in the standard tier?",
    "Move the month-end snapshots to EBS Snapshots Archive, which is far cheaper for long retention; the 90-day minimum and up to 72-hour restore are acceptable here. Keep the recent daily operational snapshots, managed by Data Lifecycle Manager, in the standard tier for fast restores."
   ],
   [
    "An application team uses io1 volumes provisioned with 3,000 IOPS each, and monitoring shows they rarely exceed 2,000 IOPS. What change could cut cost, and does it need downtime?",
    "Change the volumes to gp3 with Elastic Volumes. gp3's 3,000 IOPS baseline covers the workload without paying for provisioned io1 IOPS, and the change happens while the volumes remain in use."
   ]
  ],
  "tip": "gp2 to gp3 is a no-downtime change that usually saves money. Automating snapshot retention by tag: Data Lifecycle Manager. Long-term, rarely restored snapshots: Snapshots Archive. Unattached volumes still cost money.",
  "check": [
   [
    "Do you need to stop the instance to change a volume from gp2 to gp3?",
    "No. Elastic Volumes changes the type while the volume stays attached and in use."
   ],
   [
    "When is EBS Snapshots Archive a poor choice?",
    "For snapshots you may need to restore quickly or keep for less than 90 days, since restores take up to 72 hours and there is a 90-day minimum."
   ],
   [
    "If you delete the oldest of five incremental snapshots, can you still restore from the newest?",
    "Yes. EBS keeps any blocks that later snapshots still reference, so each remaining snapshot stays fully restorable."
   ],
   [
    "Why do unattached EBS volumes often appear after instances are terminated?",
    "Data volumes without delete-on-termination enabled stay behind in the available state and continue to be billed."
   ],
   [
    "What baseline performance does gp3 provide regardless of volume size?",
    "3,000 IOPS and 125 MB/s, with more IOPS and throughput purchasable separately."
   ]
  ]
 },
 {
  "t": "Database cost choices: DynamoDB on-demand vs provisioned, Aurora Serverless v2, reserved DB instances and stopping idle databases",
  "hook": "Ravi, the engineering manager at Fernhill Software, has a new rule from the CFO: database spend must fall by a third this year without slowing the product. You pull up the list. The production Aurora writer is busy every hour of every day. A reporting reader sits nearly idle except for three frantic days at month end. Twenty test databases run all night and every weekend. One database exists only for an annual audit and has run untouched for eleven months. A new feature's DynamoDB table launches next week, and nobody knows whether it will get ten users or ten thousand. Which of these should you commit to, which should scale, and which should simply stop?",
  "simple": "Databases cost money every hour they run, even when nobody is using them. Saving money comes down to three questions. Is the traffic steady or jumpy? If it is steady, promise to use a database for a year or more and get a discount, like a gym membership you know you will use. If it is jumpy or unknown, pick an option that grows and shrinks on its own and charges for what you use, like paying per gym class. Is anyone using it right now? If not, switch it off, like turning out the lights in an empty room. Amazon RDS lets you pause a database for up to seven days; after that it turns itself back on, so for long breaks you save a copy and delete it instead.",
  "body": [
   "Databases are often among the largest line items on an AWS bill because they run all the time, and because teams size them for peak load and then leave them. Cost optimization here comes down to three habits: match the capacity model to the traffic pattern, commit where usage is steady, and stop paying for databases nobody is using. The SAA-C03 exam presents a traffic description or an idle environment and asks for the most cost-effective option that still meets the requirement, so the skill is reading the pattern and matching it to a pricing model.",
   "For Amazon DynamoDB, the choice is between capacity modes. On-demand mode charges per read and write request, needs no capacity planning and absorbs sudden spikes, which makes it cost-effective for new applications, unpredictable traffic and tables that are idle much of the time. Provisioned mode charges per hour for the read capacity units (RCUs) and write capacity units (WCUs) you configure, whether you use them or not. With auto scaling tracking a target utilization, provisioned mode is usually cheaper for steady, predictable traffic, and reserved capacity reduces the price further for long-term commitments. A common path is to start on-demand, learn the traffic pattern from Amazon CloudWatch metrics such as consumed read and write capacity, and move stable tables to provisioned. Two other DynamoDB savings are the Standard-Infrequent Access (Standard-IA) table class, for tables whose storage cost dominates their throughput cost, and time to live (TTL), which deletes expired items without consuming write capacity.",
   "For relational workloads with variable demand, consider Aurora Serverless v2. It scales Amazon Aurora database capacity automatically in fine-grained increments measured in Aurora capacity units (ACUs), between a minimum and maximum you set, within seconds and without dropping connections. You pay for the capacity used each second. It suits variable, spiky or unpredictable workloads, development and test databases, and multi-tenant applications. A low minimum keeps idle cost small, and recent versions can pause automatically when idle if you set the minimum to zero, at the cost of a short resume delay when the next connection arrives. For consistently busy databases, provisioned Aurora instances with reserved pricing are usually cheaper. You can also mix provisioned and Serverless v2 instances in one cluster, for example a provisioned writer with serverless readers that scale for reporting peaks.",
   "For steady Amazon Relational Database Service (RDS) and Aurora usage, commit. Reserved DB Instances give a significant discount for a one- or three-year term, much like EC2 Reserved Instances. Size-flexible reservations apply across sizes within an instance family for many engines, so a reservation still helps after you resize within the family. Right-size first using CloudWatch metrics and AWS Compute Optimizer, and consider AWS Graviton-based DB instance classes for better price performance; for many engines that is a simple instance class change applied during a maintenance window.",
   "Finally, deal with idle databases. You can stop an RDS instance or an Aurora cluster for up to seven days at a time, for example with `aws rds stop-db-instance --db-instance-identifier test-db`. While it is stopped, you pay for storage and backups but not for instance hours. After seven days AWS automatically starts it again so it does not miss required maintenance, which surprises many teams. For longer idle periods, either automate stopping it again or take a final snapshot and delete the database, restoring from the snapshot when it is needed. For development and test environments, scheduling stops outside working hours with Amazon EventBridge Scheduler and AWS Lambda, or using Aurora Serverless v2 with a low minimum, avoids paying for nights and weekends.",
   "A worked example puts every habit to use. A software as a service (SaaS) company's production Aurora writer is busy around the clock at a steady level, so it buys reserved DB instances for it after confirming the size with a month of metrics. Its reporting reader only works hard at month end, so it becomes an Aurora Serverless v2 reader that scales up for a few days and sits near its minimum otherwise. Twenty test databases are stopped every evening and weekend by a scheduled Lambda function, and one used only for an annual audit is snapshotted and deleted. A new feature's DynamoDB table starts in on-demand mode and will be reviewed after three months of traffic data.",
   "Common mistakes are predictable once you know the patterns. Learners choose provisioned DynamoDB capacity for brand-new or highly spiky traffic, which either throttles requests or wastes capacity. Teams buy reserved DB instances before right-sizing. Many assume a stopped RDS instance stays stopped indefinitely. Some choose Aurora Serverless v2 for a database that is busy at a constant level all day, where provisioned plus reservations is cheaper. Others forget that storage and backups are still billed while an instance is stopped. And a frequent distractor suggests read replicas to reduce cost; replicas add instances and cost, and they exist for read performance and availability.",
   "Exam questions are usually worded around the traffic pattern. 'Unpredictable', 'spiky', 'new application' or 'idle most of the time' points to DynamoDB on-demand or Aurora Serverless v2. 'Steady', 'predictable' or 'runs 24/7 for years' points to provisioned capacity with reservations, or reserved DB instances. 'Only needed during business hours' points to scheduled stop and start. 'Needed one week per quarter' or 'idle for months' points to snapshot and delete, because a stopped database restarts automatically after seven days."
  ],
  "analogy": "Choosing a database pricing model is like choosing how to pay for electricity. A reserved DB instance is a fixed-rate annual contract, ideal for a factory running all day. On-demand DynamoDB and Aurora Serverless v2 are pay-per-kilowatt-hour plans, ideal for a holiday cottage used now and then. Stopping a database is flipping the main breaker, but the RDS breaker flips itself back on after seven days, so for a long absence you unplug the appliance entirely by snapshotting and deleting it.",
  "terms": [
   [
    "On-demand mode (DynamoDB)",
    "A capacity mode that bills per read and write request with no capacity planning."
   ],
   [
    "Provisioned mode (DynamoDB)",
    "A capacity mode that bills hourly for configured RCUs and WCUs, optionally with auto scaling."
   ],
   [
    "DynamoDB reserved capacity",
    "A commitment to provisioned DynamoDB capacity for a discounted rate."
   ],
   [
    "Aurora capacity unit (ACU)",
    "The unit of Aurora Serverless v2 capacity, combining memory with corresponding CPU and networking."
   ],
   [
    "Aurora Serverless v2",
    "An Aurora configuration that scales capacity automatically in fine-grained ACU increments between set limits."
   ],
   [
    "Reserved DB Instance",
    "A one- or three-year RDS or Aurora commitment that lowers the hourly instance price."
   ],
   [
    "Stopped DB instance",
    "An RDS instance not billed for instance hours, which restarts automatically after seven days."
   ],
   [
    "Time to live (TTL)",
    "A DynamoDB feature that deletes expired items automatically without consuming write capacity."
   ]
  ],
  "example": "A SaaS company's production Aurora writer is busy around the clock, so it buys reserved DB instances for it. Its reporting replica only works hard at month end, so it becomes an Aurora Serverless v2 reader. Twenty test databases are stopped every evening and weekend by a scheduled Lambda function, and a new feature's DynamoDB table starts in on-demand mode until its traffic pattern is known.",
  "mistakes": [
   [
    "Use provisioned DynamoDB capacity for a brand-new app to keep costs predictable.",
    "With unknown or spiky traffic, provisioned capacity either throttles or sits unused. Start on-demand, learn the pattern, then switch stable tables to provisioned."
   ],
   [
    "Stopping an RDS instance keeps it off until someone starts it.",
    "RDS automatically starts a stopped instance after seven days. For long idle periods, snapshot and delete, or automate re-stopping."
   ],
   [
    "Aurora Serverless v2 is always cheaper than provisioned Aurora.",
    "For a database busy at a constant level all day, provisioned instances with reservations are usually cheaper."
   ],
   [
    "Adding read replicas lowers database cost.",
    "Replicas are extra instances that add cost. They improve read performance and availability, not the bill."
   ]
  ],
  "tryit": [
   [
    "A ticketing company's DynamoDB table sees near-zero traffic most days and enormous bursts when concert tickets go on sale, with no fixed schedule. The team currently uses provisioned capacity sized for the peak. What should they change and why?",
    "Switch the table to on-demand mode. Provisioned capacity sized for rare peaks is paid for every hour while sitting idle, while on-demand charges per request and absorbs sudden bursts without capacity planning."
   ],
   [
    "A training environment uses an RDS PostgreSQL instance for a two-day course held once every quarter. The team stops the instance after each course, yet the bill shows it running for weeks at a time. What is happening, and what should they do?",
    "RDS automatically restarts a stopped instance after seven days, so it runs for most of the quarter. They should take a snapshot after each course, delete the instance, and restore from the snapshot before the next course."
   ]
  ],
  "tip": "Unpredictable or spiky: DynamoDB on-demand or Aurora Serverless v2. Steady and predictable: provisioned capacity with reservations. A stopped RDS database restarts after seven days, so for long idle periods snapshot and delete it.",
  "check": [
   [
    "A test database is needed only one week per quarter. What is the cheapest approach?",
    "Snapshot it and delete the instance, then restore from the snapshot when needed; a stopped instance would restart after seven days."
   ],
   [
    "When is DynamoDB provisioned capacity cheaper than on-demand?",
    "When traffic is steady and predictable, so provisioned capacity with auto scaling stays well utilized."
   ],
   [
    "What do you still pay for while an RDS instance is stopped?",
    "Storage and backups; instance hours are not billed while it is stopped."
   ],
   [
    "An Aurora cluster has a steady writer but a reader that is busy only at month end. What configuration saves money?",
    "Keep a provisioned, reserved writer and make the reader an Aurora Serverless v2 instance that scales with demand."
   ],
   [
    "Which DynamoDB feature removes expired items without consuming write capacity?",
    "Time to live (TTL)."
   ]
  ]
 },
 {
  "t": "Data transfer costs: inter-AZ, inter-Region and internet egress, NAT gateway charges vs gateway endpoints, and CloudFront",
  "hook": "The monthly bill for Granite Peak Games arrives, and Aisha in finance flags a line she has never noticed before: NAT gateway data processing, now larger than the cost of the EC2 instances behind it. The engineers are puzzled. Nothing new was deployed, and the batch jobs only read from S3, which is \"inside AWS anyway.\" At the same time, the marketing team's new trailer, served straight from an S3 bucket to players around the world, has pushed internet egress to a record. Aisha asks the question you will hear in every cost review: \"We are not paying for servers here. What exactly are we paying for?\"",
  "simple": "In AWS you often pay not just for the computers but for the roads your data travels on. Data coming in from the internet is usually free. Data going out to the internet costs money for every gigabyte. Data moving between buildings in the same city (Availability Zones) costs a little, and data moving between cities (Regions) costs more. A NAT gateway is like a toll booth that charges for every gigabyte passing through. A gateway endpoint is a free private side road straight to S3 or DynamoDB, so that traffic skips the toll booth. CloudFront is a network of local shops that keep copies of your content near customers, so fewer long trips are needed and each delivery is cheaper.",
  "body": [
   "Data transfer charges are the hidden cost in many AWS architectures, because they depend on the path traffic takes rather than on any single resource you can point to in the console. Prices vary by Region and change over time, so the SAA-C03 exam focuses on the pattern instead of the numbers: which flows are free, which cost a little and which cost the most, and how to redesign traffic paths to pay less without giving up resilience. Once you can trace a packet's route and name the charge at each hop, most data transfer questions become straightforward.",
   "Start with the basic directions. Data coming into AWS from the internet (ingress) is generally free. Data going out to the internet, called egress, is charged per GB, and it is often the largest transfer cost for public-facing applications. Traffic within the same Availability Zone (AZ) between resources using private IP addresses is generally free. Traffic between AZs in the same Region is charged per GB in each direction, so chatty designs that constantly cross AZs, such as an application tier in one AZ talking to a cache in another, add up quickly. Traffic between Regions is charged at a higher rate, for example for cross-Region replication or a service calling an API in another Region. Using public or Elastic IP addresses between instances can also incur charges that private addressing avoids.",
   "These charges are a reason to keep chatty components in the same AZ where availability allows, while still spreading independent copies across AZs for resilience. For example, an Auto Scaling group spread over three AZs, with a load balancer that keeps requests in-zone and read replicas in each AZ, keeps most traffic local while still surviving an AZ failure. Do not sacrifice Multi-AZ resilience just to save transfer costs; the exam expects you to balance both, and an answer that collapses everything into one AZ is almost always a trap.",
   "NAT gateways are a frequent source of surprise. A network address translation (NAT) gateway charges per hour and per GB processed, on top of any transfer charges. When private instances download large volumes from Amazon Simple Storage Service (S3) or Amazon DynamoDB through a NAT gateway, that processing charge can be substantial even though the traffic never leaves AWS. A gateway virtual private cloud (VPC) endpoint for S3 or DynamoDB has no charge and keeps that traffic off the NAT gateway, which is one of the most common cost fixes in exam scenarios. You add it to route tables, for example `aws ec2 create-vpc-endpoint --vpc-id vpc-0abc --service-name com.amazonaws.us-east-1.s3 --route-table-ids rtb-0def`; afterward the route table shows a prefix list entry for S3 pointing at the endpoint.",
   "Other services use a different kind of endpoint. Interface endpoints (AWS PrivateLink) for other AWS services cost per hour and per GB, but typically less per GB than NAT processing, and they improve security by keeping traffic on private addresses. Another NAT saving is to avoid cross-AZ NAT traffic by giving each AZ its own NAT gateway, which also removes a single point of failure. That is a case where the cheaper design and the more resilient design are the same design.",
   "Amazon CloudFront reduces egress costs as well as latency. Data transfer from AWS origins such as S3 or an Application Load Balancer to CloudFront edge locations is not charged, and CloudFront's rates for delivering to users are generally lower than direct internet egress from the origin, with price classes and savings bundles available. Caching also means the origin handles fewer requests, so you may need fewer instances. Serving a popular download or a global website directly from S3 or Amazon EC2 is usually more expensive than serving it through CloudFront. Other tactics include compressing data before sending, keeping processing in the same Region as the data, using AWS Direct Connect for large, steady on-premises transfers, where its data transfer out rates are lower than internet egress, and using S3 Requester Pays when others download your datasets.",
   "A worked example shows how to investigate. A company's bill shows high NAT gateway charges. VPC Flow Logs and AWS Cost Explorer grouped by usage type reveal that batch jobs in private subnets pull terabytes from S3 each night through a single NAT gateway in one AZ, so traffic from the other AZs also pays inter-AZ charges. Adding an S3 gateway endpoint to the private route tables removes both the NAT processing and the cross-AZ charges for that traffic. The same review moves product images from direct S3 downloads to CloudFront, lowering egress costs and speeding up the site, and adds a NAT gateway per AZ for the remaining internet-bound traffic.",
   "Common mistakes and exam cues complete the picture. Learners assume all traffic inside a Region is free, when inter-AZ traffic is not; assume a gateway endpoint exists for every service, when only S3 and DynamoDB have them; think CloudFront adds cost on top of S3 egress, when origin-to-edge transfer is free; route S3 traffic from private subnets through NAT by default; and collapse everything into one AZ to save pennies. Remember that inbound data is generally free, so the cost problem in a question is usually outbound or cross-AZ traffic. On the exam, 'high NAT gateway data processing charges' with S3 or DynamoDB traffic points to a gateway VPC endpoint; 'high internet egress for static or cacheable content' points to CloudFront; 'charges between instances in the same Region' points to inter-AZ transfer and co-locating chatty tiers; 'private access to other AWS services without NAT' points to interface endpoints; and 'large, steady transfers from on premises' points to Direct Connect."
  ],
  "analogy": "Think of data as delivery trucks. Driving into town is free, but every truck that leaves town pays a toll (egress), trucks crossing between neighborhoods pay a small fee (inter-AZ), and trucks going to another city pay more (inter-Region). The NAT gateway is a toll booth that charges per ton, even for trucks heading to the warehouse next door; a gateway endpoint is a free private lane to that warehouse. CloudFront is a set of local depots: the trip from the factory to a depot is free, and local deliveries are cheaper. The analogy stops at direction: inter-AZ fees apply each way.",
  "terms": [
   [
    "Egress",
    "Data leaving AWS to the internet, charged per GB."
   ],
   [
    "Ingress",
    "Data entering AWS from the internet, generally free."
   ],
   [
    "Inter-AZ transfer",
    "Traffic between Availability Zones in one Region, charged per GB in each direction."
   ],
   [
    "NAT gateway data processing",
    "A per-GB charge on all traffic passing through a NAT gateway, in addition to its hourly charge."
   ],
   [
    "Gateway VPC endpoint",
    "A free route-table target that gives private subnets access to S3 or DynamoDB without a NAT gateway."
   ],
   [
    "Interface endpoint",
    "A PrivateLink network interface in your subnets for private access to AWS services, billed hourly and per GB."
   ],
   [
    "Price class",
    "A CloudFront setting that limits which edge locations serve content, trading reach for cost."
   ]
  ],
  "example": "A company's bill shows high NAT gateway charges. Flow logs reveal that batch jobs in private subnets pull terabytes from S3 each night through the NAT gateway. Adding an S3 gateway endpoint removes those charges. The same review moves product images from direct S3 downloads to CloudFront, lowering egress costs and speeding up the site.",
  "mistakes": [
   [
    "Traffic between instances in the same Region is free.",
    "Only same-AZ traffic over private IPs is generally free. Traffic between AZs is charged per GB in each direction."
   ],
   [
    "Every AWS service has a free gateway endpoint.",
    "Only S3 and DynamoDB have gateway endpoints. Other services use interface endpoints, which are billed hourly and per GB."
   ],
   [
    "Putting CloudFront in front of S3 adds a second transfer charge.",
    "Transfer from AWS origins to CloudFront edge locations is free, and CloudFront delivery rates are generally lower than direct egress."
   ],
   [
    "Move everything into one AZ to eliminate transfer costs.",
    "That trades away resilience for small savings. Keep Multi-AZ, but keep chatty components local and use per-AZ NAT gateways and in-zone routing."
   ]
  ],
  "tryit": [
   [
    "A data science platform runs Spark jobs in private subnets across three AZs. They read 50 TB a month from DynamoDB tables and S3 buckets through a single NAT gateway in AZ a. The NAT gateway line on the bill is now larger than the compute line. What two charges are you seeing, and what is the fix?",
    "NAT gateway per-GB processing on all of that traffic, plus inter-AZ transfer for jobs in the other two AZs reaching the NAT gateway in AZ a. Add gateway VPC endpoints for S3 and DynamoDB to the private route tables, which removes both charges for that traffic at no cost."
   ],
   [
    "A software company serves 5 TB a month of installer downloads to customers worldwide directly from an S3 bucket in one Region. Downloads are often slow for overseas users. What change addresses both cost and speed?",
    "Serve the installers through a CloudFront distribution with the bucket as origin. Origin-to-edge transfer is free, CloudFront delivery rates are generally lower than direct S3 egress, and cached copies at edge locations make downloads faster for distant users."
   ]
  ],
  "tip": "High NAT gateway cost with S3 or DynamoDB traffic: add a gateway endpoint. High internet egress for static or cacheable content: put it behind CloudFront. Inbound data is free; cross-AZ and cross-Region traffic is not.",
  "check": [
   [
    "Is data transfer from S3 to CloudFront charged?",
    "No. Transfer from AWS origins to CloudFront edge locations is free; you pay CloudFront's delivery rates to viewers."
   ],
   [
    "Two EC2 instances in different AZs of the same Region exchange 10 TB per month. Is that free?",
    "No. Inter-AZ traffic is charged per GB in each direction."
   ],
   [
    "Which AWS services support gateway VPC endpoints?",
    "Only Amazon S3 and Amazon DynamoDB; other services use interface endpoints."
   ],
   [
    "Private instances in three AZs share one NAT gateway. What two costs does that create beyond the NAT hourly charge?",
    "NAT per-GB processing on all traffic, plus inter-AZ transfer for instances in the other two AZs; a NAT gateway per AZ avoids the latter."
   ],
   [
    "Which tool would you use to find which flows are driving a high data transfer bill?",
    "VPC Flow Logs to see the traffic paths, together with Cost Explorer grouped by usage type to see which charges are growing."
   ]
  ]
 },
 {
  "t": "Cost visibility tools: Cost Explorer, AWS Budgets, Cost and Usage Reports, cost allocation tags and Trusted Advisor",
  "hook": "Three messages land in your inbox at Bluefin Health Partners before lunch. The CFO writes, \"Why did last month's AWS bill jump, and which team caused it?\" The head of the sandbox program writes, \"Can we make sure no one spends more than their budget again, automatically?\" And the finance analyst writes, \"I need hourly, per-resource line items for chargeback, not a chart.\" You know AWS has a whole shelf of cost tools with overlapping names: Cost Explorer, Budgets, the Cost and Usage Report, Trusted Advisor, tags. Each message needs a different one. Which tool answers which question, and why did the team tags you added last spring not show up anywhere?",
  "simple": "AWS gives you several money tools, and each has one main job. Cost Explorer is like your bank's spending chart: it shows where money went and guesses where it is heading. AWS Budgets is like a low-balance alert: it warns you, or even takes action, before you overspend. The Cost and Usage Report is like a full itemized receipt for every single purchase, meant for spreadsheets and detailed reports. Cost allocation tags are labels you stick on resources, like writing a name on each lunch box, so costs can be sorted by team, but you must switch each label on in the billing settings first. Trusted Advisor is like a home inspector who walks through and lists things to fix, including wasted spending.",
  "body": [
   "You cannot optimize what you cannot see. AWS provides a set of tools to see where money goes, attribute it to teams, alert before overspending and find savings. They overlap a little, which is exactly why the SAA-C03 exam likes them: a question typically describes a need, such as alert, analyze, report in detail, attribute or recommend, and asks which tool fits. Learning the one verb each tool owns is the most reliable way to answer. Cost Explorer analyzes, Budgets alerts and acts, the Cost and Usage Report itemizes, tags attribute, and Trusted Advisor recommends.",
   "AWS Cost Explorer is the interactive tool for visualizing and analyzing costs and usage. You can view the last 13 months by default, with optional longer history, group and filter by service, linked account, Region, usage type or tag, and see forecasts of future spend. It also contains recommendations for Reserved Instance and Savings Plans purchases based on your usage, reports on their utilization and coverage, and rightsizing recommendations. Use it to answer questions like which service grew most last month or how well your commitments are being used. The same data is available programmatically, for example `aws ce get-cost-and-usage --time-period Start=2026-08-01,End=2026-09-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE`.",
   "AWS Budgets is for proactive alerting and control. You set custom budgets for cost, usage, reservation utilization or coverage, and Savings Plans utilization or coverage, and Budgets sends alerts by email or Amazon Simple Notification Service (SNS) when actual or forecasted amounts cross thresholds you choose. Budget actions go further, for example applying an AWS Identity and Access Management (IAM) policy or a service control policy (SCP) that prevents launching new resources, or stopping specific Amazon EC2 or Amazon RDS instances, when a budget is exceeded, either automatically or after approval. Budgets is the answer for alerting and enforcement; Cost Explorer is for analysis. A related service, AWS Cost Anomaly Detection, uses machine learning to spot unusual spending, such as a sudden jump in one service, and alerts you without any fixed thresholds.",
   "When finance needs every detail, use the Cost and Usage Report. The AWS Cost and Usage Report (CUR), now delivered through AWS Data Exports, is the most detailed billing data available: line items for each resource by hour or day, with pricing, reservation and Savings Plans details and tags, delivered as files to an Amazon Simple Storage Service (S3) bucket. It is designed to be queried with Amazon Athena, loaded into Amazon Redshift or visualized in Amazon QuickSight, and it is the answer when finance needs the most granular data for custom chargeback or showback reports.",
   "Cost allocation tags connect costs to owners. You tag resources with keys such as `CostCenter` or `Project`, then activate those tags as cost allocation tags in the Billing and Cost Management console. Only after activation do they appear in Cost Explorer and the CUR, and only for costs from then on; history is not retagged. AWS-generated tags such as `aws:createdBy` can also be activated. Tag policies in AWS Organizations help enforce consistent tag keys and values, so `Team`, `team` and `TEAM` do not split your reports three ways, and AWS Cost Categories group costs by rules, such as mapping accounts and tags to business units.",
   "AWS Trusted Advisor provides recommendations. It inspects your account and recommends improvements across cost optimization, performance, security, fault tolerance, service limits and operational excellence, such as idle load balancers, underutilized instances, unassociated Elastic IP addresses and overly open security groups. All customers get a core set of checks; the full set requires a Business Support plan or higher. Trusted Advisor tells you what to fix; it does not alert on budget thresholds or provide line-item billing data.",
   "A worked example combines the tools. A company wants each product team to see its own monthly spend and be warned early. It tags every resource with `Team`, enforces the key with a tag policy, and activates it as a cost allocation tag. It creates a budget per team filtered by the tag, with alerts to each team's SNS topic at 80 percent of forecast and a budget action that applies a deny policy for new instance launches in the sandbox account at 100 percent. Finance receives the Cost and Usage Report in S3 and queries it through Athena for monthly chargeback, while the platform team reviews Trusted Advisor and Cost Explorer's Savings Plans recommendations each quarter.",
   "Common mistakes and exam cues line up one to one. Learners expect tags to appear in billing tools without activation, or expect historical costs to be retagged afterward. They choose Cost Explorer when the requirement is an alert or automatic action, which is Budgets, or when finance needs hourly line items, which is the CUR. They assume every Trusted Advisor check is available on the Basic Support plan, and they confuse Budgets (thresholds you set) with Cost Anomaly Detection (learned normal patterns). On the exam, 'alert when spending is forecast to exceed' or 'stop resources when over budget' points to AWS Budgets; 'analyze trends', 'forecast', 'which service increased' or 'Savings Plans recommendations' points to Cost Explorer; 'most granular', 'hourly line items' or 'custom reports with Athena' points to the CUR; 'costs per team or project' points to activated cost allocation tags; 'unexpected spike without setting thresholds' points to Cost Anomaly Detection; and 'best-practice checks, idle resources, open security groups' points to Trusted Advisor."
  ],
  "analogy": "Think of household finances. Cost Explorer is the spending chart in your banking app, showing categories and trends. Budgets is the alert that texts you when you near your limit, and a budget action is the card freeze that kicks in automatically. The Cost and Usage Report is the full itemized statement exported to a spreadsheet. Cost allocation tags are the category labels, but your bank only sorts by a label after you turn it on, and it never relabels last year's purchases. Trusted Advisor is the financial advisor who points out the subscription you forgot to cancel.",
  "mnemonic": "One verb per tool: Explorer Explores, Budgets Barks (alerts and acts), CUR Counts every line, Tags Tell who owns it, Trusted Advisor Advises.",
  "terms": [
   [
    "Cost Explorer",
    "An interactive tool to analyze, visualize and forecast AWS costs and usage, with commitment and rightsizing recommendations."
   ],
   [
    "AWS Budgets",
    "A service that alerts, and can take actions, when costs or usage exceed or are forecast to exceed thresholds."
   ],
   [
    "Budget action",
    "An automatic or approved response to a budget threshold, such as applying a restrictive policy or stopping instances."
   ],
   [
    "Cost and Usage Report",
    "The most detailed AWS billing dataset, delivered to S3 through Data Exports for analysis with tools like Athena."
   ],
   [
    "Cost allocation tag",
    "A resource tag activated in billing so costs can be grouped and filtered by it, from activation onward."
   ],
   [
    "Cost Anomaly Detection",
    "A service that uses machine learning to detect and alert on unusual spending patterns."
   ],
   [
    "AWS Trusted Advisor",
    "A service that checks accounts against best practices for cost, performance, security, fault tolerance, service limits and operational excellence."
   ],
   [
    "Tag policy",
    "An AWS Organizations policy that standardizes tag keys and values across accounts."
   ]
  ],
  "example": "A company wants each product team to see its own monthly spend and be warned early. It tags every resource with Team, activates the tag as a cost allocation tag, creates a budget per team filtered by the tag with alerts at 80 percent of forecast, and gives finance the Cost and Usage Report in S3 queried through Athena for chargeback.",
  "mistakes": [
   [
    "Tagging resources is enough for tags to show up in Cost Explorer.",
    "Tags must be activated as cost allocation tags in the Billing and Cost Management console, and they apply only to costs from activation onward."
   ],
   [
    "Use Cost Explorer to stop instances when spending passes a limit.",
    "Cost Explorer analyzes and forecasts. Alerts and automatic responses are AWS Budgets with budget actions."
   ],
   [
    "Cost Explorer gives finance the most granular data for chargeback.",
    "The Cost and Usage Report provides hourly or daily line items per resource, delivered to S3 for Athena, Redshift or QuickSight."
   ],
   [
    "Budgets and Cost Anomaly Detection do the same job.",
    "Budgets fire on thresholds you set. Cost Anomaly Detection learns normal spending with machine learning and flags unusual changes without fixed thresholds."
   ]
  ],
  "tryit": [
   [
    "A university gives each research group a sandbox account with a fixed grant. When a group reaches its grant amount, no new EC2 instances should be launchable, but existing work should keep running until the group's lead reviews it. Which tool and feature do you use?",
    "AWS Budgets with a budget action. Set a cost budget per account and configure an action at 100 percent that applies an IAM policy or SCP denying new instance launches, optionally requiring approval, while leaving running instances alone."
   ],
   [
    "A finance team activated a Department cost allocation tag today and asks for a report of last year's spend by department. What do you tell them, and what can they do?",
    "Cost allocation tags only apply to costs from activation onward, so last year's costs will not be grouped by the new tag. For history, they can group by linked account if departments map to separate accounts, and from now on the tag will appear in Cost Explorer and the CUR."
   ]
  ],
  "tip": "Alert before overspending: Budgets. Analyze trends and get Savings Plans recommendations: Cost Explorer. Most granular data for custom reports: Cost and Usage Report. Costs per team or project: activate cost allocation tags. Best-practice checks: Trusted Advisor.",
  "check": [
   [
    "You tagged resources with Project six months ago, but the tag does not appear in Cost Explorer. Why?",
    "The tag has not been activated as a cost allocation tag in the Billing console; tags only show in cost tools after activation, and only going forward."
   ],
   [
    "Which tool can automatically stop instances when spending exceeds a threshold?",
    "AWS Budgets, using budget actions."
   ],
   [
    "Finance needs hourly, per-resource billing line items to build custom chargeback reports. Which tool?",
    "The AWS Cost and Usage Report, delivered to S3 through Data Exports and queried with Athena or similar tools."
   ],
   [
    "A developer wants to be alerted to unusual spending spikes without choosing fixed thresholds. Which service?",
    "AWS Cost Anomaly Detection, which learns normal spending patterns with machine learning."
   ],
   [
    "Which support plans unlock the full set of Trusted Advisor checks?",
    "Business Support or higher; all customers get only a core set of checks."
   ]
  ]
 },
 {
  "t": "Consolidated billing in AWS Organizations: volume discounts and sharing Reserved Instance and Savings Plans benefits",
  "hook": "Halvorsen Freight has twelve AWS accounts, and every one of them used to send its own invoice to a different credit card. Last month the company moved them all into one organization. Now Ingrid, the cloud finance lead, notices something odd in the bill: the development team's account shows a discount on its EC2 instances even though dev never bought a Reserved Instance. Production did. The development manager is delighted. The controller of a recently acquired subsidiary is not, and asks whether her unit's costs are being mixed with everyone else's. Is this a billing glitch, a feature, or something Ingrid should switch off for one account?",
  "simple": "Consolidated billing is like a family phone plan. Every family member keeps their own phone and their own usage list, but one person pays a single bill for everyone. Because the family is treated as one big customer, it can reach bulk discounts sooner than any one person could alone. And if one person prepaid for a bundle they are not fully using, the leftover can automatically cover a family member who needs it. In AWS, the account that pays is called the management account, and the leftover bundles are Reserved Instances and Savings Plans. If one family member must keep strictly separate finances, the bill payer can switch off sharing just for them.",
  "body": [
   "Consolidated billing is a built-in feature of AWS Organizations. The management account, historically called the payer account, receives one bill for all member accounts and pays it, while each account's charges remain visible separately. There is no extra charge for it, and it brings both administrative benefits, such as one payment method and one invoice, and financial benefits, which are what the SAA-C03 exam focuses on. Every organization has consolidated billing, whether it uses only the consolidated billing feature set or all features, such as service control policies (SCPs).",
   "The first financial benefit is volume pricing. Some services charge less per unit as usage grows, such as Amazon Simple Storage Service (S3) storage tiers and data transfer out. With consolidated billing, AWS treats all accounts in the organization as one customer for these tiers, so combined usage reaches cheaper tiers sooner than any single account would on its own. For example, if each of five accounts stores a modest amount in S3, their combined total may cross into a lower per-GB tier that none would reach alone. The saving appears automatically on the consolidated bill; nobody has to configure anything.",
   "The second benefit is sharing commitment discounts. Reserved Instances (RIs) and Savings Plans purchased in one account can apply to matching usage in any other account in the organization. For example, if the production account bought RIs for more `m6i` instances than it is currently running, the unused RI hours can discount matching `m6i` usage in a development account. Commitments apply first to usage in the account that bought them, and any remaining benefit then flows to other accounts. This sharing means a central team can buy commitments for the whole organization and maximize their utilization, since one account's quiet period can be filled by another's demand. It is exactly why the development account in the opening story saw a discount it never bought.",
   "Sharing is on by default, but it can be turned off. From the management account's billing preferences, under RI and Savings Plans discount sharing, you can disable sharing for specific accounts. When sharing is turned off for an account, that account's own purchases apply only to itself, and it does not receive discounts from purchases made in other accounts; the switch blocks both directions. Companies sometimes do this when business units must be billed strictly separately, for example after an acquisition, for a subsidiary with its own budget, or for regulatory reasons. Credits can be shared or restricted in a similar way. Member accounts cannot change this setting themselves.",
   "Consolidated billing combines with the cost tools covered earlier. AWS Cost Explorer and the Cost and Usage Report (CUR) in the management account show all member accounts, and you can filter or group by linked account, for example `aws ce get-cost-and-usage ... --group-by Type=DIMENSION,Key=LINKED_ACCOUNT`. AWS Budgets can track per-account budgets, and cost allocation tags are activated in the management account for the whole organization. Member accounts can be allowed to see their own cost data. Cost Explorer's Savings Plans and RI recommendations can also be calculated across the whole organization, which is how a central team sizes a shared commitment.",
   "The management account deserves special protection. It is responsible for paying all member account charges and controls organization-wide settings, including discount sharing and, with all features enabled, SCPs that apply to member accounts. That is why best practice is to restrict who can sign in to it, protect it with strong authentication, and run no workloads in it. A compromised or cluttered management account puts every member account at risk.",
   "A worked example shows the benefits together. A company with 12 accounts buys a Compute Savings Plan centrally in its management account, sized from Cost Explorer's organization-wide recommendation. On weekdays the commitment is consumed mostly by production workloads; on weekends, when production is quieter, the same commitment automatically discounts batch jobs in the analytics account, so utilization stays near 100 percent. Combined S3 storage across all accounts also lands in lower pricing tiers. A recently acquired subsidiary, which must be charged back exactly, has discount sharing turned off so it neither contributes to nor benefits from the shared commitments.",
   "Common mistakes and exam cues are easy to pair. Learners think each account must buy its own RIs to benefit, when sharing is automatic by default; think consolidated billing costs extra; assume discount sharing can be disabled from a member account, when it is controlled in the management account's billing preferences; run production workloads in the management account; forget that turning off sharing blocks both giving and receiving; and confuse consolidated billing with SCPs, when billing combines charges and SCPs restrict permissions. On the exam, 'single bill for multiple accounts' or 'one payment method' points to consolidated billing; 'combine usage to reach volume discounts' points to aggregated pricing tiers; 'unused Reserved Instances in one account, matching usage in another' points to RI and Savings Plans discount sharing; and 'one business unit must not share discounts' points to turning off sharing for that account in the management account's billing preferences."
  ],
  "analogy": "Consolidated billing works like a family phone plan with a shared data pool. One person pays one bill, each line's usage is still itemized, the family hits bulk pricing together, and unused prepaid data from one line covers another line automatically. If one relative insists on separate finances, the account holder can take that line out of the shared pool, and then it neither gives nor receives. The analogy stops at permissions: a phone plan's payer cannot restrict what apps you install, while SCPs in AWS Organizations are a separate feature that does restrict permissions.",
  "terms": [
   [
    "Consolidated billing",
    "An AWS Organizations feature that combines all member accounts' charges into one bill paid by the management account."
   ],
   [
    "Management account",
    "The account that creates the organization and pays for all member accounts; also called the payer account."
   ],
   [
    "Member account",
    "An AWS account in an organization whose charges roll up to the management account's bill."
   ],
   [
    "Volume pricing tier",
    "A lower per-unit price that applies once combined usage passes a threshold."
   ],
   [
    "Discount sharing",
    "Applying Reserved Instance and Savings Plans benefits across accounts in an organization; on by default."
   ],
   [
    "Linked account",
    "The billing term for a member account, used to filter and group costs in Cost Explorer and the CUR."
   ]
  ],
  "example": "A company with 12 accounts buys a Compute Savings Plan centrally in its management account. On weekdays it is used mostly by production workloads; on weekends, when production is quieter, the same commitment automatically discounts batch jobs in the analytics account. Combined S3 storage across accounts also lands in lower pricing tiers, and a subsidiary that must be billed separately has sharing turned off.",
  "mistakes": [
   [
    "Each account must buy its own Reserved Instances to get a discount.",
    "With consolidated billing, RI and Savings Plans benefits are shared across the organization by default, after first applying to the purchasing account."
   ],
   [
    "A member account can opt itself out of discount sharing.",
    "Sharing is controlled from the management account's billing preferences, not from member accounts."
   ],
   [
    "Turning off sharing for an account only stops it from giving discounts away.",
    "It blocks both directions: the account's purchases apply only to itself, and it receives no discounts from other accounts' purchases."
   ],
   [
    "Consolidated billing and SCPs are the same feature.",
    "Consolidated billing combines charges and pricing. SCPs restrict what identities in member accounts can do; they require all features to be enabled."
   ]
  ],
  "tryit": [
   [
    "A company's production account bought three-year RIs for a fleet that was later halved after an optimization project. The analytics account now runs the same instance family in the same Region on demand. The finance team asks whether they should sell the RIs. What do you tell them first?",
    "Check discount sharing. With consolidated billing and sharing enabled, the unused RI hours automatically apply to the analytics account's matching usage, so the commitment may already be fully used across the organization. Cost Explorer's RI utilization report will show whether any hours are still unused."
   ],
   [
    "A holding company must report one subsidiary's AWS costs exactly as they would be if it were independent, with no benefit from group purchases. All accounts are in one organization. What setting do you change, and where?",
    "Turn off RI and Savings Plans discount sharing for the subsidiary's accounts in the management account's billing preferences. Those accounts then use only their own commitments and receive no discounts from other accounts' purchases."
   ]
  ],
  "tip": "Reserved Instance and Savings Plans discounts are shared across accounts in an organization by default. If one account must not share or receive them, turn off sharing for that account in the management account's billing preferences.",
  "check": [
   [
    "An RI was bought in account A but account A no longer uses that instance type. Account B does. Does the RI still help?",
    "Yes, with consolidated billing and sharing enabled, the unused RI benefit applies to matching usage in account B."
   ],
   [
    "How does consolidated billing lower S3 storage prices?",
    "Usage across all accounts is combined for volume pricing tiers, so the organization reaches lower per-GB tiers sooner."
   ],
   [
    "Where do you turn off RI and Savings Plans discount sharing for one account?",
    "In the billing preferences of the management account, which controls sharing for member accounts."
   ],
   [
    "Why should the management account run no workloads?",
    "It pays for every member account and controls organization-wide settings, so it should be tightly protected and used only for administration."
   ],
   [
    "Does consolidated billing cost extra or require enabling all features in AWS Organizations?",
    "No. It is free and included in every organization, whether it uses only consolidated billing features or all features."
   ]
  ]
 }
], {"reviewed":"2026-10-06"});
