/* Teacher edition for Certified Kubernetes Administrator (CKA (Kubernetes v1.35 curriculum)): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("cka", [
 {
  "t": "Control plane and node components: kube-apiserver, etcd, kube-scheduler, kube-controller-manager, kubelet, kube-proxy, container runtime",
  "objectives": [
   "Students will be able to describe the job of each control plane and node component and where it runs.",
   "Students will be able to distinguish components that run as static Pods from those that run as host services.",
   "Students will be able to map a failure symptom to the component most likely responsible.",
   "Students will be able to choose the right inspection tool (kubectl, systemctl, journalctl, crictl) for each component."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four guesses on the whiteboard without correcting them yet."
   ],
   [
    15,
    "Teach",
    "Draw the cluster on the whiteboard: control plane box with API server, etcd, scheduler, controller-manager; worker boxes with kubelet, runtime, kube-proxy. Trace a `kubectl create deployment` request through each component, drawing arrows only to and from the API server. Show `kubectl get pods -n kube-system` output on the projector and point out what is missing (kubelet, runtime)."
   ],
   [
    15,
    "Activity",
    "Run the symptom card sort described below in groups of three. Circulate and ask each group to justify one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Pick the two cards groups disagreed on most and settle them as a class, using the request-flow drawing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or sticky notes and hand them in."
   ]
  ],
  "warmup": "Your cluster's control plane node loses power for ten minutes. A customer is using an app whose Pods run on a worker node. Does the customer notice anything? What would you notice as the administrator?",
  "activity": {
   "title": "Symptom to component card sort",
   "materials": "Printed cards (one set per group): seven component cards and about ten symptom cards; whiteboard or table space; projector for the reference diagram.",
   "steps": [
    "Give each group the seven component cards (kube-apiserver, etcd, kube-scheduler, kube-controller-manager, kubelet, kube-proxy, container runtime) and lay them in a row.",
    "Hand out symptom cards such as \"kubectl: connection refused on 6443\", \"Pod Pending with no events\", \"scaling a Deployment does nothing\", \"one node NotReady\", \"Service IP times out but Pod IP works\", \"image pull never starts on one node\".",
    "Groups place each symptom under the component they would investigate first and write the first command they would run on the card.",
    "Groups swap tables, review another group's sort and mark any placement they disagree with using a sticky note.",
    "Reveal the answer key on the projector and have groups correct their own boards."
   ]
  },
  "discussion": [
   "Why do you think Kubernetes forces every component to go through the API server instead of letting them talk to etcd directly?",
   "What are the advantages and risks of running control plane components as static Pods rather than as systemd services?"
  ],
  "exit": [
   [
    "Which component writes `spec.nodeName` on a Pod, and which component then starts its containers?",
    "The kube-scheduler chooses the node and binds the Pod; the kubelet on that node starts the containers through the container runtime."
   ],
   [
    "You suspect the kubelet on node01 has failed. Name two commands you would run on node01.",
    "`systemctl status kubelet` and `journalctl -u kubelet` (crictl ps is also acceptable for checking the runtime)."
   ],
   [
    "A Deployment's replica count was raised but no new Pod objects exist. Which component is most likely at fault?",
    "The kube-controller-manager, because its ReplicaSet controller creates the Pod objects."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially filled request-flow diagram with blanks for component names, and let them use the restaurant analogy card while sorting symptoms.",
   "Extend: Ask fast finishers to predict, for each component, what still works and what breaks if it alone is down, then compare their predictions with the official component descriptions."
  ]
 },
 {
  "t": "Preparing hosts for kubeadm: containerd, matching systemd cgroup driver, swap, overlay and br_netfilter modules, ip_forward and bridge sysctls, required ports",
  "objectives": [
   "Students will be able to list the host preparation steps kubeadm expects and explain why each is needed.",
   "Students will be able to persist kernel modules and sysctls so they survive a reboot.",
   "Students will be able to identify a cgroup driver mismatch or swap problem from symptoms and logs.",
   "Students will be able to state which ports control plane and worker nodes need open."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers on the board under \"before the chefs arrive\"."
   ],
   [
    15,
    "Teach",
    "Walk through the preparation in order on the projector: runtime and SystemdCgroup, swap, modules, sysctls, ports, package holds. For each, say what breaks if it is skipped and show the verify command (lsmod, sysctl, swapon --show, grep)."
   ],
   [
    15,
    "Activity",
    "Run the broken-host diagnosis activity in pairs, described below."
   ],
   [
    5,
    "Discuss",
    "Have two pairs present a fix and ask the class whether it survives a reboot."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If you were handed a brand-new Linux server and told it will run hundreds of containers, what would you want to check or change on it before installing anything Kubernetes-specific?",
  "activity": {
   "title": "Diagnose the unprepared host",
   "materials": "Printed handouts with short command outputs (preflight errors, lsmod, sysctl, swapon --show, an excerpt of config.toml, /etc/fstab); pens; projector for the answer key.",
   "steps": [
    "Give each pair a handout describing one host, with four or five command outputs showing what is and is not configured.",
    "Pairs list every problem they can find and, for each one, write the command that fixes it now and the file that makes the fix persistent.",
    "Pairs mark which problems would be caught by kubeadm preflight and which would only appear later (for example a cgroup driver mismatch).",
    "Pairs swap handouts with a neighboring pair and check each other's answers.",
    "Review the answer key on the projector, highlighting the persistence step for each fix."
   ]
  },
  "discussion": [
   "Why might Kubernetes be strict about swap when ordinary Linux servers use it happily?",
   "What are the risks of leaving kubelet, kubeadm and kubectl unheld so the package manager can upgrade them?"
  ],
  "exit": [
   [
    "Which file and command make a sysctl change permanent?",
    "A file under /etc/sysctl.d/ applied with `sysctl --system`."
   ],
   [
    "What containerd setting must be true so it matches the kubelet's systemd cgroup driver?",
    "`SystemdCgroup = true` in the runc options of /etc/containerd/config.toml, followed by restarting containerd."
   ],
   [
    "Name two ports a worker node needs open.",
    "10250 for the kubelet API and the NodePort range 30000 to 32767."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist card listing the six preparation areas with one verify command each, and let students tick items off while working the handout.",
   "Extend: Ask fast finishers to write a single shell script outline that prepares a host idempotently and explain how they would verify each step without rebooting."
  ]
 },
 {
  "t": "Kubeadm init (pod network CIDR, control-plane endpoint), installing a CNI plugin, kubeadm join and bootstrap tokens",
  "objectives": [
   "Students will be able to explain what `kubeadm init` creates and why --pod-network-cidr and --control-plane-endpoint matter.",
   "Students will be able to explain why nodes are NotReady before a CNI plugin is installed.",
   "Students will be able to compare the roles of the bootstrap token and the discovery CA cert hash in `kubeadm join`.",
   "Students will be able to generate a fresh join command when a token has expired."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a projected `kubectl get nodes` output with one NotReady node right after init and ask the warm-up question."
   ],
   [
    15,
    "Teach",
    "Walk through init output section by section on the projector: certificates, kubeconfigs, static Pods, add-ons, join command. Explain the two key flags with a whiteboard diagram of non-overlapping node, Pod and Service ranges. Then explain token versus CA hash with the visitor badge analogy."
   ],
   [
    15,
    "Activity",
    "Run the join command role-play described below."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions and connect answers to the 24-hour token expiry."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A brand-new cluster reports its only node as NotReady and DNS Pods as Pending. Before you look anything up, what do you think the cluster might be waiting for?",
  "activity": {
   "title": "Join command role-play",
   "materials": "Index cards labeled Control Plane, New Node, Impostor and Auditor; printed sample join commands (one valid, one with an expired token, one with a wrong CA hash); whiteboard.",
   "steps": [
    "Split the class into groups of four and assign roles: Control Plane, New Node, Impostor and Auditor.",
    "The New Node presents a join command card; the Control Plane decides whether the token is valid and unexpired.",
    "The Impostor tries to pretend to be the control plane; the New Node checks the CA hash card to detect it.",
    "The Auditor records which check stopped each bad attempt and what command would fix it (for example `kubeadm token create --print-join-command`).",
    "Rotate roles twice, then each group writes on the whiteboard one sentence each for what the token proves and what the hash proves."
   ]
  },
  "discussion": [
   "Why might the designers have made bootstrap tokens expire after a day instead of lasting forever?",
   "What could go wrong in a real network if the Pod CIDR overlapped the office network?"
  ],
  "exit": [
   [
    "What should you do when a new cluster's node is NotReady and CoreDNS is Pending right after init?",
    "Install a CNI plugin; the node becomes Ready once its Pods run and its config is in /etc/cni/net.d/."
   ],
   [
    "What does `--discovery-token-ca-cert-hash` protect against?",
    "Joining an impostor control plane; it lets the node verify the cluster CA's public key."
   ],
   [
    "Which command gives a new, working join command?",
    "`kubeadm token create --print-join-command`."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram of a join command with each part (endpoint, token, hash) color-coded and a one-line description beside it.",
   "Extend: Ask fast finishers to sketch a network plan with node, Pod and Service ranges for a small lab and justify that none overlap."
  ]
 },
 {
  "t": "Static Pods and /etc/kubernetes/manifests; kubeadm certificates (check-expiration, renew) and kubeconfig files",
  "objectives": [
   "Students will be able to explain how the kubelet runs static Pods and why kubeadm uses them for the control plane.",
   "Students will be able to modify a control plane component safely by editing its manifest.",
   "Students will be able to check and renew kubeadm certificates and restart components to load them.",
   "Students will be able to describe the structure of a kubeconfig file and switch contexts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to vote on the cause."
   ],
   [
    15,
    "Teach",
    "Project the contents of /etc/kubernetes/manifests and a sample kube-apiserver.yaml. Explain staticPodPath, mirror Pods and safe editing. Then project sample `kubeadm certs check-expiration` output and explain one-year certificates, renewal and restarting static Pods. Finish with a projected kubeconfig, highlighting clusters, users and contexts."
   ],
   [
    15,
    "Activity",
    "Run the kubeconfig and manifest reading activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect certificate expiry to upgrade habits."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A cluster that worked perfectly for a year suddenly rejects every kubectl command, and nobody changed anything. What kinds of things in IT expire on their own after a fixed time?",
  "activity": {
   "title": "Read the node: manifests, certificates and kubeconfig",
   "materials": "Printed excerpts: a kubelet config.yaml with staticPodPath, a directory listing of /etc/kubernetes/manifests including a stray .bak file, a check-expiration table with one nearly expired certificate, and a kubeconfig with two contexts; highlighters.",
   "steps": [
    "Pairs find the staticPodPath and predict which Pods the listed files will create, flagging the stray backup file as a risk.",
    "Pairs read the check-expiration table, identify which certificates expire soonest, and write the renewal command plus the restart steps.",
    "Pairs highlight the clusters, users and contexts in the kubeconfig and write the command to switch to the second context.",
    "Each pair writes one \"never do this\" rule on a sticky note (for example, never edit the mirror Pod) and posts it on the board.",
    "The teacher reviews the posted rules and corrects any inaccurate ones with the class."
   ]
  },
  "discussion": [
   "Why might a one-year default certificate lifetime be a reasonable security choice even though it causes outages for neglected clusters?",
   "What habits or monitoring would you put in place so a team never hits the certificate anniversary outage?"
  ],
  "exit": [
   [
    "Where would you edit to add a flag to the kube-scheduler on a kubeadm cluster?",
    "/etc/kubernetes/manifests/kube-scheduler.yaml on the control plane node."
   ],
   [
    "Which command shows when kubeadm certificates expire?",
    "`kubeadm certs check-expiration`."
   ],
   [
    "After `kubeadm certs renew all`, what else must happen?",
    "Restart the control plane static Pods (for example, move manifests out and back) and recopy admin.conf to ~/.kube/config if needed."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled sample kubeconfig with clusters, users and contexts color-coded, plus the fridge note analogy card for static Pods.",
   "Extend: Ask fast finishers to explain why kubelet.conf is handled differently during renewal and how kubelet certificate rotation reduces risk."
  ]
 },
 {
  "t": "Cluster upgrades with kubeadm: one minor version at a time, upgrade plan/apply/node, drain, kubelet upgrade, uncordon, version skew",
  "objectives": [
   "Students will be able to explain the one-minor-at-a-time rule and the version skew policy.",
   "Students will be able to sequence a kubeadm upgrade of a control plane node and a worker node correctly.",
   "Students will be able to compare `kubeadm upgrade apply` with `kubeadm upgrade node`.",
   "Students will be able to verify an upgrade and diagnose a node that still reports the old version."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect proposed orders on the board."
   ],
   [
    15,
    "Teach",
    "Explain minor and patch versions with a number line on the whiteboard. State the skew rules and show why control plane goes first. Walk through the control plane command block on the projector line by line, then the worker sequence, stressing drain from the control plane and daemon-reload plus restart."
   ],
   [
    15,
    "Activity",
    "Run the upgrade sequence card sort described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore risk and rollback thinking."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You have to upgrade a cluster with one control plane node and three workers from 1.33 to 1.35. Without looking anything up, in what order would you touch the nodes and the versions?",
  "activity": {
   "title": "Upgrade sequence card sort",
   "materials": "Printed command cards (about 14, each with one step such as `kubeadm upgrade plan`, `kubectl drain node01 --ignore-daemonsets`, `systemctl daemon-reload`), plus labels saying \"run on cp1\", \"run on node01\" and \"run where kubectl works\"; tape or table space.",
   "steps": [
    "Give each group of three a shuffled set of command cards covering one control plane and one worker upgrade.",
    "Groups put the cards in order and tag each card with where it must be run.",
    "Insert two trap cards (`kubeadm upgrade apply` on node01, and upgrading the worker kubelet first); groups must identify and discard them with a reason.",
    "Groups compare their sequences with a neighbor group and resolve differences.",
    "The teacher reveals the reference order and asks each group to name the step most likely to be forgotten."
   ]
  },
  "discussion": [
   "Why do you think Kubernetes forbids skipping minor versions, when many desktop applications let you jump several versions at once?",
   "If a worker upgrade goes wrong halfway, what state is the node in and how would you protect workloads while you fix it?"
  ],
  "exit": [
   [
    "What is the correct path from 1.33 to 1.35?",
    "1.33 to 1.34, then 1.34 to 1.35, upgrading the control plane first at each step."
   ],
   [
    "Which kubeadm command do you run on a worker during an upgrade?",
    "`kubeadm upgrade node`."
   ],
   [
    "A node still shows the old version after the kubelet package upgrade. What was missed?",
    "`systemctl daemon-reload` and `systemctl restart kubelet`."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed sequence with the first and last steps filled in, and the \"Don't Upset Running Users\" card.",
   "Extend: Ask fast finishers to plan an upgrade of a three-node HA control plane plus five workers, noting where apply versus node runs and how to keep capacity during worker drains."
  ]
 },
 {
  "t": "Etcd backup and restore with etcdctl/etcdutl and the etcd PKI; pointing the etcd static Pod at a restored data directory",
  "objectives": [
   "Students will be able to take an etcd snapshot with etcdctl using the correct TLS flags from the etcd manifest.",
   "Students will be able to restore a snapshot with etcdutl into a new data directory.",
   "Students will be able to repoint the etcd static Pod at a restored directory by editing its hostPath volume.",
   "Students will be able to explain the security handling a snapshot file requires."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note answers about what a backup should and should not include."
   ],
   [
    15,
    "Teach",
    "Project an etcd.yaml manifest and highlight the four flags etcdctl needs, then the etcd-data volume. Walk through save, status, restore and the hostPath edit, explaining the difference between in-container paths and host paths with a whiteboard diagram."
   ],
   [
    15,
    "Activity",
    "Run the manifest detective activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore the cost of rolling back the whole cluster."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a whole Kubernetes cluster's configuration lives in one database, what would you want to know about that database before something goes wrong?",
  "activity": {
   "title": "Manifest detective: save and restore",
   "materials": "Printed copies of a realistic etcd.yaml manifest; highlighters; blank cards for writing commands; projector for the answer key.",
   "steps": [
    "Pairs highlight the client URL, trusted CA file, cert file and key file in the manifest.",
    "Using only the highlighted values, pairs write the complete `etcdctl snapshot save` command to /opt/backup/etcd.db on a card.",
    "Pairs write the `etcdutl snapshot restore` command into /var/lib/etcd-restored and mark exactly which line of the manifest they would change, explaining why it is the hostPath.",
    "Pairs list two checks they would run if kubectl is still failing two minutes after the change.",
    "Two pairs read their commands aloud and the class compares them with the projected answer key."
   ]
  },
  "discussion": [
   "A restore rolls back the entire cluster to the snapshot time. When would that be the wrong tool, and what alternatives might you consider?",
   "Where should snapshot files be stored, and who should be allowed to read them?"
  ],
  "exit": [
   [
    "Which three TLS flags does etcdctl need on a kubeadm cluster, and where do you find their values?",
    "--cacert, --cert and --key, with paths read from /etc/kubernetes/manifests/etcd.yaml."
   ],
   [
    "Write the command to restore /opt/snap.db into /var/lib/etcd-restored.",
    "`etcdutl snapshot restore /opt/snap.db --data-dir /var/lib/etcd-restored`."
   ],
   [
    "Which part of etcd.yaml decides which host directory etcd reads?",
    "The hostPath volume named etcd-data."
   ]
  ],
  "differentiation": [
   "Support: Give students a fill-in-the-blank command template for save and restore, with arrows showing which manifest flag fills each blank.",
   "Extend: Ask fast finishers to explain how a restore would differ on a three-member etcd cluster and why every member must be restored from the same snapshot."
  ]
 },
 {
  "t": "Highly available control planes: stacked vs external etcd, quorum, load balancer in front of API servers, --upload-certs and --certificate-key",
  "objectives": [
   "Students will be able to compare stacked and external etcd topologies and their trade-offs.",
   "Students will be able to calculate quorum and fault tolerance for a given number of etcd members.",
   "Students will be able to explain which control plane components are active/active and which use leader election.",
   "Students will be able to describe how --upload-certs and --certificate-key let control plane nodes join, including the expiry of uploaded certificates."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about three versus four and record the class vote."
   ],
   [
    12,
    "Teach",
    "Draw stacked and external topologies side by side on the whiteboard. Derive floor(n/2)+1 together and build a table for one to seven members. Add the load balancer and mark API servers active/active and scheduler and controller-manager active/passive."
   ],
   [
    18,
    "Activity",
    "Run the quorum vote role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare topologies for a small and a large organization."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your manager says, \"If three control plane nodes are good, four must be better.\" Do you agree? Vote and give one reason.",
  "activity": {
   "title": "Quorum vote role-play",
   "materials": "Sticky notes or cards labeled Member 1 to Member 7; a whiteboard table with columns for members, quorum and failures tolerated; a printed sheet of join command parts.",
   "steps": [
    "Ask five volunteers to stand as etcd members; the class proposes a write and members raise hands to vote.",
    "Ask members to sit down one at a time and have the class decide after each one whether the write can still commit; record results in the table.",
    "Repeat with three and four members and have students fill in the fault tolerance column, noticing that four tolerates the same as three.",
    "In pairs, students assemble the control plane join command from the printed parts, marking which part comes from --upload-certs and which from the bootstrap token.",
    "Close by asking pairs what they would do if the certificate key was more than two hours old."
   ]
  },
  "discussion": [
   "For a small team with limited hardware, would you choose stacked or external etcd, and what risk are you accepting?",
   "Why might the designers have chosen leader election for the scheduler instead of letting all schedulers work at once?"
  ],
  "exit": [
   [
    "How many failures can a three-member and a five-member etcd cluster tolerate?",
    "One and two respectively."
   ],
   [
    "Which control plane components use leader election?",
    "The kube-scheduler and kube-controller-manager."
   ],
   [
    "The certificate key from init has expired. What command gets a new one?",
    "`kubeadm init phase upload-certs --upload-certs`."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-built quorum table for one to five members with only the fault tolerance column blank, and the committee analogy card.",
   "Extend: Ask fast finishers to design a three-zone layout for five etcd members and explain how many zones can fail before quorum is lost."
  ]
 },
 {
  "t": "RBAC: Roles, ClusterRoles, RoleBindings, ClusterRoleBindings, aggregated and built-in roles, users via CertificateSigningRequests, kubectl auth can-i",
  "objectives": [
   "Students will be able to distinguish Roles, ClusterRoles, RoleBindings and ClusterRoleBindings by what they grant and where.",
   "Students will be able to create a namespaced permission set and bind it to a user or ServiceAccount.",
   "Students will be able to describe the steps to issue a user certificate through a CertificateSigningRequest.",
   "Students will be able to verify permissions with `kubectl auth can-i` and impersonation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas of how a building controls who goes where."
   ],
   [
    15,
    "Teach",
    "Draw a two-by-two grid on the whiteboard: rows for permission sets (Role, ClusterRole), columns for grants (RoleBinding, ClusterRoleBinding), and fill in the resulting scope. Project the imperative commands and the CSR flow. Demonstrate reading `kubectl auth can-i --list` output from a projected sample."
   ],
   [
    15,
    "Activity",
    "Run the access request role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect least privilege with built-in roles."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In a school building, how do you make sure a substitute teacher can open their classroom but not the principal's office or the server room? List the pieces of that system.",
  "activity": {
   "title": "Access request role-play",
   "materials": "Printed access request cards (for example \"Read Pods in qa only\", \"List nodes\", \"Deploy apps in shop but not change RBAC\", \"Read everything except Secrets in dev\"); blank cards for writing commands; whiteboard grid from the teach segment.",
   "steps": [
    "Pairs draw an access request card and decide which role object and which binding object meet it with least privilege.",
    "Pairs write the imperative kubectl create commands on a blank card, using a built-in ClusterRole where it fits.",
    "Pairs write two `kubectl auth can-i` commands that prove the request: one expected yes and one expected no.",
    "Pairs swap cards with another pair, who play the auditor and challenge any over-broad grant.",
    "The teacher reviews two or three cards on the projector and corrects scope errors as a class."
   ]
  },
  "discussion": [
   "Why might Kubernetes have chosen an additive-only model with no deny rules? What does that make easier and harder?",
   "When is binding a ClusterRole with a RoleBinding a better choice than writing a new Role in each namespace?"
  ],
  "exit": [
   [
    "A user needs read-only access to Pods in every namespace. Which objects do you create?",
    "A ClusterRole (or the built-in view) and a ClusterRoleBinding to that user."
   ],
   [
    "What part of a client certificate becomes the Kubernetes username?",
    "The common name (CN); O fields become groups."
   ],
   [
    "Write a command that checks whether user jane can delete Pods in namespace qa.",
    "`kubectl auth can-i delete pods -n qa --as=jane`."
   ]
  ],
  "differentiation": [
   "Support: Give students the completed two-by-two scope grid as a reference card and a fill-in template for the create role and create rolebinding commands.",
   "Extend: Ask fast finishers to design an aggregated ClusterRole label scheme so a new custom resource becomes readable by everyone bound to view."
  ]
 },
 {
  "t": "Node maintenance: cordon, drain, uncordon and PodDisruptionBudgets",
  "objectives": [
   "Students will be able to explain the difference between cordon, drain and uncordon.",
   "Students will be able to choose the right drain flags for DaemonSet Pods, emptyDir volumes and unmanaged Pods.",
   "Students will be able to create a PodDisruptionBudget and interpret its ALLOWED DISRUPTIONS value.",
   "Students will be able to diagnose a drain blocked by a PodDisruptionBudget and choose a safe resolution."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about closing a checkout lane or classroom."
   ],
   [
    15,
    "Teach",
    "Demonstrate on the projector, or with prepared output, the node status before and after cordon, drain and uncordon. Explain each drain flag with the problem it acknowledges. Introduce PDBs, write the minAvailable and maxUnavailable math on the board for 3 replicas, and show the ALLOWED DISRUPTIONS column."
   ],
   [
    15,
    "Activity",
    "Run the drain decision game described below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh availability against maintenance deadlines."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A grocery store wants to close one checkout lane to fix the scanner. What should happen to customers already in that lane, and what rule might stop the manager from closing it right now?",
  "activity": {
   "title": "Drain decision game",
   "materials": "Printed node cards listing the Pods on each node (with owner type, volumes and labels) and PDB cards with minAvailable or maxUnavailable values; whiteboard for scoring.",
   "steps": [
    "Each group receives a node card and the PDB cards for the applications on it.",
    "Groups write the exact drain command, choosing only the flags the Pods on that node require.",
    "For each application, groups compute the allowed disruptions and predict whether drain will complete or block.",
    "For any blocked case, groups propose a fix that respects the PDB (scaling up, waiting for readiness, negotiating the budget) and rank --disable-eviction as last resort.",
    "Groups present one node card; the teacher reveals the expected outcome and scores correct predictions on the board."
   ]
  },
  "discussion": [
   "Who should own a PodDisruptionBudget, the platform team or the application team, and why?",
   "When, if ever, is it acceptable to bypass a PodDisruptionBudget during maintenance?"
  ],
  "exit": [
   [
    "What does `kubectl get nodes` show for a cordoned node?",
    "SchedulingDisabled in the STATUS column, for example Ready,SchedulingDisabled."
   ],
   [
    "A drain fails because of an unmanaged Pod. Which flag is needed?",
    "--force."
   ],
   [
    "A Deployment has 3 replicas and a PDB with minAvailable 2. How many Pods can drain evict at once?",
    "One; allowed disruptions is 3 minus 2."
   ]
  ],
  "differentiation": [
   "Support: Give students a flag lookup card pairing each drain error message with the flag that resolves it, and work the first node card together.",
   "Extend: Ask fast finishers to compare a percentage-based PDB with a fixed number for a Deployment that autoscales between 2 and 10 replicas."
  ]
 },
 {
  "t": "Helm (repo add/update, upgrade --install, --version, values) and Kustomize (kubectl apply -k) for installing cluster components",
  "objectives": [
   "Students will be able to add and update a Helm repository and install a pinned chart version with custom values.",
   "Students will be able to explain the difference between a chart version and an app version.",
   "Students will be able to write a kustomization.yaml that sets a namespace and image tag and apply it with `kubectl apply -k`.",
   "Students will be able to choose between Helm and Kustomize for a given installation task."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort answers into \"installer\" and \"customize what I have\"."
   ],
   [
    15,
    "Teach",
    "On the projector, walk through repo add, repo update, search with --versions, show values and upgrade --install, pointing out chart versus app version columns. Then show a base folder and kustomization.yaml, and render it with `kubectl kustomize` output on screen. Finish with the decision rule for choosing a tool."
   ],
   [
    15,
    "Activity",
    "Run the tool choice and command writing activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on repeatability and change history."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you install software on your own computer, sometimes you run an installer with options and sometimes you tweak config files yourself. What are the pros and cons of each?",
  "activity": {
   "title": "Pick the tool, write the commands",
   "materials": "Printed task cards (for example \"install chart X at chart version Y in namespace Z with 2 replicas\", \"deploy plain YAML into monitoring with tag 2.1\", \"roll back a bad release\", \"make a prod overlay with 5 replicas\"); a printed excerpt of `helm search repo --versions` output; blank paper.",
   "steps": [
    "Pairs draw three task cards and decide Helm or Kustomize for each, writing one sentence of justification.",
    "For Helm tasks, pairs use the printed search output to pick the right chart version and write the full helm commands, including repo update and verification.",
    "For Kustomize tasks, pairs write the kustomization.yaml on paper and the preview and apply commands.",
    "Pairs exchange papers and check for the common slips: missing --create-namespace, app version used as --version, apply -f instead of apply -k.",
    "The teacher reviews one Helm and one Kustomize answer on the projector."
   ]
  },
  "discussion": [
   "How do `helm get values` and keeping kustomization.yaml in version control each help a team reproduce an installation months later?",
   "What risks come with installing a chart without pinning its version?"
  ],
  "exit": [
   [
    "Write a command that installs or upgrades release metrics from chart repo/metrics-server at chart version 3.2.0 into namespace kube-system.",
    "`helm upgrade --install metrics repo/metrics-server -n kube-system --version 3.2.0`."
   ],
   [
    "What does `--version` refer to in Helm?",
    "The chart version, not the application version."
   ],
   [
    "Which command applies a Kustomize directory named overlays/dev?",
    "`kubectl apply -k overlays/dev`."
   ]
  ],
  "differentiation": [
   "Support: Give students a command skeleton card for helm upgrade --install with labeled blanks for release, chart, namespace, version and values, and a sample kustomization.yaml to adapt.",
   "Extend: Ask fast finishers to design a base and two overlays (dev and prod) that differ in replicas, image tag and a label, and explain how they would preview each."
  ]
 },
 {
  "t": "Extension interfaces: CRI (containerd, CRI-O, crictl), CNI (Calico, Cilium, Flannel), CSI drivers",
  "objectives": [
   "Students will be able to explain the role of the CRI, CNI and CSI interfaces and name common implementations of each.",
   "Students will be able to use crictl commands to inspect containers, Pods and logs on a node when the API server is unavailable.",
   "Students will be able to classify a failure symptom as a runtime, network or storage plugin problem and name the first place to check.",
   "Students will be able to compare Calico, Cilium and Flannel, including which enforce NetworkPolicy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write three symptoms on the board: a container that never starts, a Pod stuck in ContainerCreating with a network event, and a PVC stuck Pending. Ask students which part of Kubernetes they think is responsible for each and collect guesses without correcting yet."
   ],
   [
    15,
    "Teach",
    "Explain that Kubernetes delegates to plugins through three interfaces. Draw the kubelet in the middle with three arrows: CRI to containerd or CRI-O, CNI to /etc/cni/net.d and /opt/cni/bin, CSI to a driver with controller and node parts. Show crictl ps -a, crictl logs and /etc/crictl.yaml, and contrast Calico, Cilium and Flannel on NetworkPolicy."
   ],
   [
    15,
    "Activity",
    "Run the symptom triage card sort in pairs (see activity). Circulate and ask each pair to justify one placement aloud using the event wording on the card."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up symptoms and let the class correct their original guesses. Use the discussion questions to connect plugin choice to policy enforcement."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Kubernetes never actually starts a container itself. If that is true, who does, and how would you check on it if kubectl stopped working?",
  "activity": {
   "title": "Which interface broke? Symptom triage card sort",
   "materials": "Printed cards (about 12) each showing a short event or log line, three labeled areas on the whiteboard (CRI, CNI, CSI), sticky notes for the 'first check' answer.",
   "steps": [
    "Prepare cards with realistic lines, such as 'failed to create pod sandbox: network plugin is not ready: cni config uninitialized', 'AttachVolume.Attach failed', 'kubelet: failed to connect to containerd.sock', 'waiting for a volume to be created by external provisioner'.",
    "Pairs sort each card into CRI, CNI or CSI and write on a sticky note the first command or directory they would check, such as crictl ps -a, /etc/cni/net.d or kubectl get csidrivers.",
    "Pairs place their cards on the whiteboard areas; the class reviews any card placed in different areas by different pairs.",
    "Finish with one twist card: 'NetworkPolicy applied, traffic still flows, cluster uses Flannel only'. Ask pairs to explain why this is a plugin choice issue rather than a broken policy."
   ]
  },
  "discussion": [
   "Why might the Kubernetes project prefer standard plugin interfaces over building networking and storage directly into its own code?",
   "If you were choosing a CNI plugin for a team that must isolate namespaces with NetworkPolicy, what questions would you ask first?"
  ],
  "exit": [
   [
    "Which tool lets you read a crashed container's logs on a node when the API server is down?",
    "crictl, for example crictl ps -a to find the ID and crictl logs <id>."
   ],
   [
    "A Pod is stuck in ContainerCreating with 'cni config uninitialized'. Which directory do you check on its node?",
    "/etc/cni/net.d, plus the CNI DaemonSet Pod on that node and binaries in /opt/cni/bin."
   ],
   [
    "Which of Calico, Cilium and Flannel does not enforce NetworkPolicy on its own?",
    "Flannel."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference that maps each interface to its typical symptoms, its node location and one command, and let them use it during the card sort.",
   "Extend: Ask fast finishers to sketch the two parts of a CSI driver (controller and node plugin), say which Kubernetes workload type each usually runs as, and explain which part fails when a volume provisions but will not mount."
  ]
 },
 {
  "t": "CustomResourceDefinitions, custom resources and operators (CRD plus controller)",
  "objectives": [
   "Students will be able to explain the difference between a CRD, a custom resource and a controller, and define an operator.",
   "Students will be able to read a CRD manifest and identify its group, names, scope, served versions and storage version.",
   "Students will be able to diagnose a 'no matches for kind' error using kubectl api-resources and correct the apiVersion or install order.",
   "Students will be able to describe the risks of deleting a CRD and of removing a controller before resources that carry finalizers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Steer toward the idea that Kubernetes ships with a fixed set of kinds, then ask how a product could add its own."
   ],
   [
    12,
    "Teach",
    "Project the backups.example.com CRD. Walk through metadata.name, group, names, scope and versions, highlighting served versus storage. Then show that a Backup object does nothing until a controller watches it, and define an operator as CRDs plus controller with operational knowledge."
   ],
   [
    18,
    "Activity",
    "Pairs work through the CRD detective worksheet (see activity), matching manifests to CRDs and spotting errors. Check in with each pair on the apiVersion questions."
   ],
   [
    5,
    "Discuss",
    "Discuss deletion order and finalizers using the discussion prompts, and ask a pair to explain why deleting a CRD is so dangerous."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "Kubernetes knows about Pods and Services. If a database vendor wanted you to type `kubectl get postgres`, what would have to change in the cluster?",
  "activity": {
   "title": "CRD detective: match, validate and fix",
   "materials": "Projector, printed handout with two CRD manifests and six short custom resource manifests (some with mistakes), pens, student laptops with a browser optional for reading the Kubernetes documentation.",
   "steps": [
    "Give pairs a handout with two CRDs, for example backups.example.com (v1 served and storage) and widgets.shop.io (v1 storage, v1beta1 served), and six custom resource manifests.",
    "For each custom resource, pairs decide whether the API server would accept it. If not, they write the error they expect (such as 'no matches for kind' or a schema validation failure) and the fix.",
    "Pairs then write the commands they would use to verify the install: kubectl get crd, kubectl api-resources --api-group=..., kubectl explain ...spec.",
    "As a final step, pairs order the uninstall of an operator whose resources have finalizers and justify the order on the back of the handout."
   ]
  },
  "discussion": [
   "Why might a project ship its CRDs in a separate file or Helm step from the controller?",
   "What could go wrong in a shared cluster if anyone with broad permissions can delete CRDs, and how would you limit that with RBAC?"
  ],
  "exit": [
   [
    "What is the correct metadata.name for a CRD with group example.com and plural backups?",
    "backups.example.com."
   ],
   [
    "A manifest fails with 'no matches for kind Backup'. Name two possible causes.",
    "The CRD is not installed, or the apiVersion does not match the CRD's group and a served version."
   ],
   [
    "What happens if you delete an operator's controller before deleting custom resources that carry its finalizer?",
    "Those resources get stuck in deletion because nothing removes the finalizer."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the CRD manifest with each field annotated in plain words, and let students check each custom resource against it one field at a time.",
   "Extend: Ask fast finishers to add a second version to the backups CRD, decide which version should be the storage version, and explain what the API server does with objects requested at the non-storage version."
  ]
 },
 {
  "t": "Deployments and ReplicaSets as self-healing primitives; rolling updates, rollout status, history, undo and restart",
  "objectives": [
   "Students will be able to explain how Deployments, ReplicaSets and Pods relate and how this provides self-healing.",
   "Students will be able to compare the RollingUpdate and Recreate strategies, including the roles of maxSurge, maxUnavailable and readiness.",
   "Students will be able to apply kubectl rollout status, history, undo, restart, pause and resume to manage a Deployment's revisions.",
   "Students will be able to identify which changes create a new revision and which do not."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Collect answers, then draw a single Pod on the board and erase it to show that nothing brings a bare Pod back."
   ],
   [
    15,
    "Teach",
    "Draw Deployment, ReplicaSet and Pods as nested boxes with matching name hashes. Animate a rolling update on the board: a new ReplicaSet grows while the old one shrinks, governed by maxSurge and maxUnavailable. Show the rollout command block and explain undo as scaling an old ReplicaSet back up."
   ],
   [
    15,
    "Activity",
    "Run the rolling update role-play (see activity), then repeat it with a broken image card."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare RollingUpdate and Recreate and talk about when a stalled rollout is good news."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "If a server running your only copy of an app catches fire, what should happen next, and who or what should make it happen?",
  "activity": {
   "title": "Human rolling update",
   "materials": "Sticky notes in two colors (old version and new version), a whiteboard drawn as three node boxes, a printed card set with commands (set image, rollout undo, rollout restart, scale) and one 'image does not exist' card.",
   "steps": [
    "Place three old-version sticky notes (Pods) on the node boxes. Set desired replicas to 4 for clarity, with maxSurge 1 and maxUnavailable 1, and write these on the board.",
    "A student acting as the Deployment controller draws a 'set image' card and moves notes step by step, adding new-version Pods and removing old ones while the class checks that the surge and unavailable limits are never broken.",
    "Repeat with the 'image does not exist' card: new Pods never become Ready, so the class must decide what the controller is allowed to remove. Students observe that old Pods stay and the rollout stalls.",
    "Finish by drawing the 'rollout undo' card and a 'scale' card, and ask the class which of them creates a new revision in rollout history."
   ]
  },
  "discussion": [
   "When would you deliberately choose the Recreate strategy despite the downtime?",
   "Why is it useful that Kubernetes keeps old ReplicaSets at zero replicas rather than deleting them?"
  ],
  "exit": [
   [
    "Which command returns a Deployment named api to revision 1?",
    "kubectl rollout undo deployment/api --to-revision=1."
   ],
   [
    "Does kubectl scale create a new revision? Why or why not?",
    "No. Only Pod template changes create a new ReplicaSet and revision; scaling changes the replica count only."
   ],
   [
    "Why does a broken image not take down an app using RollingUpdate?",
    "New Pods must become Ready before old ones are removed, so the rollout stalls and old Pods keep serving."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed timeline showing each step of a rolling update with Pod counts filled in for the first two steps, so they only have to complete the remaining steps.",
   "Extend: Ask fast finishers to calculate the maximum and minimum Pod counts during an update of a 10-replica Deployment with the default 25 percent settings, explaining how Kubernetes rounds surge up and unavailable down."
  ]
 },
 {
  "t": "DaemonSets and StatefulSets from an operator's point of view, including tolerations for control plane nodes",
  "objectives": [
   "Students will be able to explain when to use a DaemonSet, a StatefulSet or a Deployment.",
   "Students will be able to diagnose a DaemonSet that skips control plane nodes and add the correct toleration.",
   "Students will be able to predict StatefulSet Pod names, DNS names and PVC names, and describe ordered creation, scale-down and rolling update behavior.",
   "Students will be able to build a DaemonSet manifest from a dry-run Deployment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into 'one per machine', 'needs its own identity' and 'interchangeable' columns on the board."
   ],
   [
    15,
    "Teach",
    "Draw three nodes, one tainted as control plane. Place DaemonSet Pods and show the skipped node, then add the toleration. Next draw db-0, db-1, db-2 with their PVCs and DNS names, and walk through ordered creation, scale-down keeping PVCs and partitioned updates."
   ],
   [
    15,
    "Activity",
    "Run the 'which controller and why' scenario stations (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on why leftover PVCs are a feature and a cost."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Name one program that should run on every single server in a data center, and one that needs to remember who it is after a restart. What makes them different from a web server?",
  "activity": {
   "title": "Controller stations",
   "materials": "Four printed station cards placed around the room, a whiteboard, sticky notes, and student laptops with a browser for viewing the Kubernetes documentation if desired.",
   "steps": [
    "Station 1: A kubectl get ds output showing DESIRED 2 on three nodes, plus a node description with the control-plane taint. Groups write the missing toleration in YAML.",
    "Station 2: A StatefulSet named db with serviceName db in namespace prod and a volumeClaimTemplate named data. Groups list all Pod names, DNS names and PVC names for three replicas.",
    "Station 3: The same StatefulSet is scaled from 3 to 1 and back to 3. Groups describe which Pods are removed, what happens to their PVCs, and what happens on scale-up.",
    "Station 4: Groups write the dry-run command and the edits needed to turn a Deployment manifest into a DaemonSet. Rotate groups every few minutes and review answers together on the whiteboard."
   ]
  },
  "discussion": [
   "Why might Kubernetes keep StatefulSet PVCs after scale-down instead of deleting them, and what operational cost does that create?",
   "Should every DaemonSet tolerate the control plane taint? What are the risks of running extra agents on control plane nodes?"
  ],
  "exit": [
   [
    "A three-node cluster's DaemonSet shows DESIRED 2. What is the most likely cause on a kubeadm cluster?",
    "The control plane node's NoSchedule taint, which the DaemonSet's Pods do not tolerate."
   ],
   [
    "What is the PVC name for Pod db-2 if the volumeClaimTemplate is named data?",
    "data-db-2."
   ],
   [
    "In what order does a StatefulSet perform a rolling update?",
    "From the highest ordinal down to the lowest, one Pod at a time."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in table with columns for Pod name, DNS name and PVC name, with the first row completed, so students can follow the naming pattern.",
   "Extend: Ask fast finishers to compare the OrderedReady and Parallel Pod management policies and explain when a database team might choose each."
  ]
 },
 {
  "t": "ConfigMaps and Secrets: creation, env and volume consumption, immutable objects, restarting workloads after changes",
  "objectives": [
   "Students will be able to create ConfigMaps and Secrets imperatively from literals and files, and decode a Secret value.",
   "Students will be able to compare environment variable and volume consumption, including how each behaves when the source object changes.",
   "Students will be able to explain why base64 is not encryption and name the controls that actually protect Secrets.",
   "Students will be able to apply the correct fix for immutable objects, missing references and stale configuration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write a base64 string on the board and ask the warm-up question. Have a volunteer decode it using a browser-based tool or by reasoning, to show that encoding hides nothing."
   ],
   [
    15,
    "Teach",
    "Show the kubectl create commands and the Pod YAML. Draw two paths from a ConfigMap to a container: env (read once at start) and volume (refreshed, unless subPath). Cover immutable objects, optional references and the CreateContainerConfigError symptom."
   ],
   [
    15,
    "Activity",
    "Run the 'will it update?' prediction game (see activity) in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on Secret protection and on immutable objects in large clusters."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "If a password is stored as 'U3RyMG5nUGFzcw==', is it safe to post in a team chat? Why or why not?",
  "activity": {
   "title": "Will it update? Configuration prediction game",
   "materials": "Printed scenario cards (8 to 10) describing a Pod spec and a change, a whiteboard with columns 'updates live', 'needs restart' and 'Pod fails to start', sticky notes.",
   "steps": [
    "Give each group a stack of scenario cards, for example: 'ConfigMap consumed with envFrom, key changed', 'ConfigMap mounted as a volume, key changed', 'ConfigMap key mounted with subPath, key changed', 'env references a Secret that does not exist', 'immutable ConfigMap edited'.",
    "Groups place each card in a column and write on a sticky note what the administrator should do next, such as kubectl rollout restart or creating the missing Secret.",
    "The teacher reveals answers one card at a time, asking a group to justify its placement aloud before confirming.",
    "Groups finish by writing the exact kubectl command to create one of the objects from their cards and the command to decode a Secret value."
   ]
  },
  "discussion": [
   "If base64 offers no protection, why do you think Kubernetes encodes Secret values at all?",
   "What are the benefits and drawbacks of making all production ConfigMaps immutable and versioning them by name?"
  ],
  "exit": [
   [
    "A Deployment reads LOG_LEVEL from a ConfigMap via envFrom. After changing the ConfigMap, what command makes the Pods use the new value?",
    "kubectl rollout restart deployment/<name>."
   ],
   [
    "Name two controls that actually protect Secret data.",
    "RBAC limiting who can read Secrets, and encryption at rest on the API server."
   ],
   [
    "A Pod references a missing Secret key in env. What status do you expect, and how can the Pod start anyway?",
    "CreateContainerConfigError; mark the reference optional: true or create the key."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison sheet (env versus volume) with rows for 'read when', 'updates live', 'subPath effect' and 'how to apply changes', partially filled in.",
   "Extend: Ask fast finishers to describe how they would roll out a configuration change safely using an immutable, versioned ConfigMap, including how they would roll back."
  ]
 },
 {
  "t": "Resource requests and limits, LimitRange and ResourceQuota as admission controls",
  "objectives": [
   "Students will be able to explain how requests affect scheduling and how CPU and memory limits are enforced differently at runtime.",
   "Students will be able to determine a Pod's QoS class from its container resource settings.",
   "Students will be able to compare LimitRange and ResourceQuota and create a quota with kubectl.",
   "Students will be able to diagnose missing, Pending and OOMKilled Pods by choosing the right place to look."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers. Introduce the idea that Kubernetes schedules on promises (requests), not on what Pods actually use."
   ],
   [
    15,
    "Teach",
    "Draw a node as a box with allocatable capacity and stack request blocks inside it. Contrast throttling and OOM kills, walk through the three QoS classes, then layer LimitRange (per Pod) and ResourceQuota (per namespace) on top with the kubectl create quota example."
   ],
   [
    15,
    "Activity",
    "Run the 'admit, schedule or kill' scenario cards (see activity) in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why teams set requests too high or too low."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A node is using only 10 percent of its CPU, yet a new Pod will not schedule there. How could that be possible?",
  "activity": {
   "title": "Admit, schedule or kill",
   "materials": "Printed cards with short Pod specs, namespace policies and node capacities; a whiteboard with four columns: 'rejected at admission', 'Pending', 'running', 'OOMKilled or throttled'; markers.",
   "steps": [
    "Give each pair about eight cards. Each card combines a namespace policy (for example a quota on limits.memory, or a LimitRange with max memory 512Mi), a node's free allocatable capacity and a Pod's resources or runtime behavior.",
    "Pairs decide the outcome for each card and write the exact place they would find the evidence, such as kubectl describe rs, kubectl describe pod events or Last State: OOMKilled.",
    "Pairs also label each Pod card with its QoS class.",
    "Review as a class: for each column, one pair explains a card, and the teacher confirms or corrects with the rule from the lesson."
   ]
  },
  "discussion": [
   "What goes wrong in a shared cluster when teams set requests far higher than they need? What goes wrong when they set none?",
   "Why might an administrator always pair a ResourceQuota with a LimitRange?"
  ],
  "exit": [
   [
    "A container keeps restarting with Last State OOMKilled. Which setting is most likely too low?",
    "Its memory limit."
   ],
   [
    "Which QoS class does a Pod with no requests or limits on any container get, and when is it evicted?",
    "BestEffort; it is evicted first under node memory pressure."
   ],
   [
    "A Deployment shows 0/2 and no Pods exist. Where do you look first and what are you looking for?",
    "kubectl describe rs or namespace events, for quota or LimitRange rejection messages."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart: does the Pod exist? If not, check admission; if Pending, check requests against node capacity; if restarting, check Last State for OOMKilled.",
   "Extend: Ask fast finishers to design a LimitRange and ResourceQuota pair for a team namespace, explain each value, and predict what happens when the team tries to run one more Pod than the quota allows."
  ]
 },
 {
  "t": "Scheduling: nodeSelector, nodeName, node affinity (required vs preferred)",
  "objectives": [
   "Students will be able to compare nodeName, nodeSelector and node affinity, including how each behaves when no node fits.",
   "Students will be able to write a nodeSelector and a node affinity rule using In, NotIn, Exists and weights.",
   "Students will be able to evaluate which nodes satisfy a set of nodeSelectorTerms and matchExpressions using OR and AND logic.",
   "Students will be able to troubleshoot a Pending Pod caused by labels or affinity by reading events and node labels."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas on the board. Group answers into 'must', 'prefer' and 'force'."
   ],
   [
    15,
    "Teach",
    "Show the YAML block on the projector. Explain nodeName as bypassing the scheduler, nodeSelector as exact label matching, then required versus preferred affinity with weights. Draw the OR between terms and AND within a term as a simple logic diagram, and explain IgnoredDuringExecution."
   ],
   [
    15,
    "Activity",
    "Run the 'stand by your node' label-matching activity (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about when soft rules are better than hard ones."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "If you were the scheduler, what information would you want before deciding which server gets a new app? Which of those wishes should be strict, and which are just nice to have?",
  "activity": {
   "title": "Stand by your node",
   "materials": "Printed node cards listing labels (for example disktype=ssd, zone=zone-a, gpu=true), printed Pod rule cards with nodeSelector or affinity snippets, tape or a whiteboard area for each node.",
   "steps": [
    "Post five node cards around the room or on the whiteboard, each with a different set of labels.",
    "Hand each pair two Pod rule cards. Some use nodeSelector, some use required affinity with multiple terms, some add preferred terms with weights, and one uses nodeName for a node that is full.",
    "Pairs place each Pod card on every node it could legally run on, then mark the node the scheduler would most likely choose based on preferred weights. If no node fits, the card goes in a 'Pending' corner with the event message written on it.",
    "Review together, then change one node label (remove zone=zone-a) and ask whether Pods already placed there move. Students should answer no, citing IgnoredDuringExecution."
   ]
  },
  "discussion": [
   "When might a strict zone rule cause more harm than good during an outage? How would a preferred rule change that?",
   "Why does Kubernetes keep a field like nodeName at all, if it is rarely the right choice?"
  ],
  "exit": [
   [
    "A Pod's required affinity matches no node. What is its status, and what event do you expect?",
    "Pending, with an event saying nodes didn't match the Pod's node affinity/selector."
   ],
   [
    "Are multiple matchExpressions inside one nodeSelectorTerm ANDed or ORed?",
    "ANDed; separate nodeSelectorTerms are ORed."
   ],
   [
    "Which placement method skips the scheduler entirely?",
    "spec.nodeName."
   ]
  ],
  "differentiation": [
   "Support: Provide a truth-table worksheet where students tick each matchExpression per node before deciding whether the term, and then the Pod, matches.",
   "Extend: Ask fast finishers to rewrite a nodeSelector as an equivalent required node affinity, then add a preferred term that favors one zone with weight 80 and explain how scoring changes."
  ]
 },
 {
  "t": "Taints and tolerations: NoSchedule, PreferNoSchedule, NoExecute and tolerationSeconds",
  "objectives": [
   "Students will be able to apply and remove taints with kubectl and read taints from node descriptions.",
   "Students will be able to compare the NoSchedule, PreferNoSchedule and NoExecute effects on new and running Pods.",
   "Students will be able to write tolerations using Equal and Exists, and explain how tolerationSeconds controls eviction timing.",
   "Students will be able to design dedicated nodes by combining taints, tolerations and node affinity or nodeSelector."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. List student ideas for keeping visitors out of a room, and connect 'keep out sign' and 'badge' to taints and tolerations."
   ],
   [
    15,
    "Teach",
    "Show the taint commands and toleration YAML. Draw a node with Pods and apply each effect in turn, erasing Pods only for NoExecute. Explain Equal versus Exists, tolerationSeconds and the built-in not-ready and unreachable taints with their 300-second default tolerations."
   ],
   [
    15,
    "Activity",
    "Run the badge and door role-play (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on why a toleration alone is not enough for dedicated nodes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "How would you keep everyone except the kitchen staff out of a restaurant kitchen, without also forcing the kitchen staff to stay there all day?",
  "activity": {
   "title": "Badges and doors role-play",
   "materials": "Three paper signs for nodes with taints written on them (one NoSchedule, one PreferNoSchedule, one NoExecute), index cards as Pod badges listing tolerations, a whiteboard for recording outcomes.",
   "steps": [
    "Tape three node signs in different corners. Several students hold Pod cards; some list matching tolerations (Equal or Exists, some with tolerationSeconds), some list none.",
    "Phase 1, scheduling: the 'scheduler' student places each Pod. The class checks whether each placement respects the effects, noting that a Pod with a badge can still go to an untainted corner.",
    "Phase 2, change: the teacher adds a NoExecute taint to a corner that already has Pods. Students holding non-matching badges must leave; those with tolerationSeconds count down aloud before leaving.",
    "Phase 3, design: pairs write on the whiteboard the taint, label, toleration and nodeSelector needed to make one corner a dedicated node for a named workload."
   ]
  },
  "discussion": [
   "Why do you think Kubernetes waits about five minutes before evicting Pods from an unreachable node, rather than acting immediately?",
   "When would PreferNoSchedule be a better choice than NoSchedule?"
  ],
  "exit": [
   [
    "What command removes the taint dedicated=gpu:NoSchedule from node02?",
    "kubectl taint node node02 dedicated=gpu:NoSchedule- (with a trailing minus sign)."
   ],
   [
    "A Pod has a toleration for a NoSchedule taint on node02. Will it definitely run on node02? Why?",
    "No. A toleration only permits scheduling there; it needs nodeSelector or affinity to be steered to node02."
   ],
   [
    "What does tolerationSeconds: 60 do on a NoExecute toleration?",
    "It lets the Pod stay on the node for 60 seconds after the taint appears, then it is evicted."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching chart with the three effects as rows and columns for 'blocks new Pods' and 'evicts running Pods', to fill in before the role-play.",
   "Extend: Ask fast finishers to explain how a DaemonSet can run on every node including tainted ones, and to write the broadest possible toleration and discuss why it should be used sparingly."
  ]
 },
 {
  "t": "Pod affinity and anti-affinity with topologyKey; topologySpreadConstraints",
  "objectives": [
   "Students will be able to explain how topologyKey defines a topology domain and how changing it changes placement.",
   "Students will be able to compare Pod affinity, Pod anti-affinity and topologySpreadConstraints and choose the right one for a goal.",
   "Students will be able to predict Pod placement for a given maxSkew, number of domains and replica count.",
   "Students will be able to diagnose Pending Pods caused by required anti-affinity or DoNotSchedule spread constraints."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch a three-zone cluster. Let students propose where four replicas should go and why."
   ],
   [
    15,
    "Teach",
    "Show the affinity YAML and walk through how the scheduler groups nodes by topologyKey. Change hostname to zone on the slide and redraw the outcome. Then introduce topologySpreadConstraints with maxSkew and whenUnsatisfiable, working through the six-replica and seven-replica examples."
   ],
   [
    15,
    "Activity",
    "Run the 'deal the replicas' card placement exercise (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare strict separation with balanced spreading."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Your app runs in three data centers. If one data center goes dark, how many copies of your app would you want left, and how would you tell a computer to arrange that?",
  "activity": {
   "title": "Deal the replicas",
   "materials": "A whiteboard drawn as two or three zones, each with two or three node boxes; sticky notes as Pods; printed rule cards (anti-affinity hostname, anti-affinity zone, spread maxSkew 1 DoNotSchedule, spread maxSkew 1 ScheduleAnyway).",
   "steps": [
    "Split the class into groups and give each group one rule card and a replica count between 4 and 7.",
    "Each group places sticky-note Pods one at a time on the whiteboard cluster, following its rule. Any Pod that cannot be placed goes into a 'Pending' column with the event message the group expects.",
    "Groups present their final layout and the class verifies it, paying attention to whether the rule was hard or soft and what the topologyKey was.",
    "Finally, erase one node with Pods on it and ask whether the remaining layout still satisfies the rule, and whether Kubernetes will move anything. Students should conclude that rules apply only at scheduling time."
   ]
  },
  "discussion": [
   "When is strict anti-affinity worth the risk of Pending Pods, and when is a soft spread better?",
   "What could go wrong if some nodes in a cluster are missing the zone label used as a topologyKey?"
  ],
  "exit": [
   [
    "Required anti-affinity on app=web uses topologyKey kubernetes.io/hostname on a 3-node cluster. What happens to the fourth replica?",
    "It stays Pending because every node already has a matching Pod."
   ],
   [
    "With maxSkew 1 across three zones, how do seven replicas spread?",
    "3-2-2."
   ],
   [
    "What is the difference between DoNotSchedule and ScheduleAnyway?",
    "DoNotSchedule is a hard rule that leaves Pods Pending; ScheduleAnyway only influences scoring."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-drawn grid of zones and nodes with Pod counts, and ask them to calculate the skew for each layout before trying to place Pods themselves.",
   "Extend: Ask fast finishers to write a Pod spec with two spread constraints, one per zone and one per node, and predict the placement of nine replicas on a three-zone, six-node cluster."
  ]
 },
 {
  "t": "PriorityClasses and preemption",
  "objectives": [
   "Students will be able to create a PriorityClass with kubectl and reference it from a Pod or Deployment template.",
   "Students will be able to explain how priority orders the scheduling queue and how preemption selects and evicts victims.",
   "Students will be able to compare preemptionPolicy PreemptLowerPriority and Never, and describe globalDefault behavior.",
   "Students will be able to diagnose preemption events and admission failures caused by a missing PriorityClass."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of real-world priority systems such as emergency rooms and airline standby lists."
   ],
   [
    15,
    "Teach",
    "Show the kubectl create priorityclass command and Pod YAML. Draw a full node with low-priority Pods and walk through a high-priority Pod arriving: queue ordering, victim selection, graceful termination and nominatedNodeName. Cover globalDefault, built-in system classes, PDB best effort and preemptionPolicy Never."
   ],
   [
    15,
    "Activity",
    "Run the 'full cluster' preemption simulation (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about fairness and the risks of giving too many workloads high priority."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "An airplane is full and a crew member who must work the next flight needs a seat. Who should give up their seat, and who should never be asked to?",
  "activity": {
   "title": "Full cluster preemption simulation",
   "materials": "Whiteboard drawn as three nodes with fixed capacity units, sticky notes in three colors for Pods with different priorities (each labeled with its CPU request), printed arrival cards for new Pods with priority values and preemption policies.",
   "steps": [
    "Fill the whiteboard nodes completely with sticky-note Pods of mixed priorities, including some with priority 0 and one protected by a note saying 'PDB: minAvailable 1'.",
    "Pairs draw arrival cards in turn. For each arriving Pod, they decide whether it fits, whether preemption is allowed, which victims on which node the scheduler would choose, and what nominatedNodeName would show.",
    "Include tricky cards: a Pod with the same priority as everything on the node, a Pod with preemptionPolicy Never, and a Pod naming a PriorityClass that does not exist.",
    "Pairs record their decisions on the whiteboard, and the class reviews each one against the rules from the lesson."
   ]
  },
  "discussion": [
   "What happens to the value of priority if every team asks for the highest class? How should an administrator govern who can use which classes?",
   "Is it fair that preemption may violate a PodDisruptionBudget? When might that be the right trade-off?"
  ],
  "exit": [
   [
    "Write the command to create a PriorityClass named critical-api with value 50000.",
    "kubectl create priorityclass critical-api --value=50000."
   ],
   [
    "Can a Pod with priority 1000 preempt a Pod with priority 1000? Why?",
    "No. Only Pods with strictly lower priority can be preempted."
   ],
   [
    "A Deployment's Pods name a PriorityClass that does not exist. What do you observe?",
    "No Pods are created; the ReplicaSet events show the Pods were rejected at admission because the class was not found."
   ]
  ],
  "differentiation": [
   "Support: Provide a step-by-step checklist for each arrival card: does it fit, is preemption allowed, which Pods are strictly lower, which node needs the fewest victims.",
   "Extend: Ask fast finishers to design a set of three PriorityClasses for a company with customer-facing services, internal tools and batch jobs, including which one is globalDefault and which uses preemptionPolicy Never, and justify each choice."
  ]
 },
 {
  "t": "Workload autoscaling: HorizontalPodAutoscaler (kubectl autoscale, autoscaling/v2), metrics-server and CPU requests; awareness of VPA and Cluster Autoscaler",
  "objectives": [
   "Students will be able to create a CPU-based HorizontalPodAutoscaler both imperatively with kubectl autoscale and declaratively with the autoscaling/v2 API.",
   "Students will be able to explain how the HPA computes desired replicas from metrics-server data and container CPU requests.",
   "Students will be able to diagnose an HPA that shows <unknown> targets by checking metrics-server and Pod requests.",
   "Students will be able to distinguish the roles of the HPA, the Vertical Pod Autoscaler and the Cluster Autoscaler."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard, grouping them into 'more Pods', 'bigger Pods' and 'more nodes'."
   ],
   [
    12,
    "Teach",
    "Draw the HPA loop: metrics-server scrapes kubelets, the controller-manager reads metrics.k8s.io, divides usage by request, computes replicas and clamps to min and max. Work one calculation aloud (4 Pods at 100 percent, target 50 percent gives 8). Show the kubectl autoscale command and the autoscaling/v2 manifest on the projector, pointing out metrics and behavior."
   ],
   [
    18,
    "Activity",
    "Run the 'Blind autoscaler' troubleshooting cards in pairs (see activity). Circulate and ask each pair to say aloud which command output led to their conclusion."
   ],
   [
    5,
    "Discuss",
    "Bring the class together for the discussion questions, focusing on why scale-down is slow by default and when the VPA or Cluster Autoscaler is the better fit."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your web app is overloaded at lunchtime every day. List every way Kubernetes could help it cope, and say which part of the system each one changes.",
  "activity": {
   "title": "The blind autoscaler",
   "materials": "Printed cards (one set per pair) each showing a short scenario with outputs of kubectl get hpa, kubectl top pods, kubectl describe hpa and a Deployment YAML excerpt; whiteboard; optional student laptops with a browser to view the Kubernetes documentation page on HPA.",
   "steps": [
    "Give each pair four scenario cards: (A) no CPU request in the Deployment, (B) metrics-server Pod in CrashLoopBackOff with a TLS error in its logs, (C) HPA working but someone keeps running kubectl scale by hand, (D) Pods Pending because no node has room.",
    "Pairs write, for each card, the root cause, the single next command they would run and the fix (for example adding requests, adding --kubelet-insecure-tls in a lab, changing minReplicas, or noting that the Cluster Autoscaler is the right tool).",
    "Each pair then writes a complete autoscaling/v2 manifest for card A after the fix, targeting 60 percent CPU with 2 to 8 replicas and a 180-second scale-down stabilization window.",
    "Two pairs swap manifests and check each other's apiVersion, scaleTargetRef, metrics and behavior fields against the reference on the projector."
   ]
  },
  "discussion": [
   "Why might the designers have made scale-down slower than scale-up, and what would happen to users if it were the other way around?",
   "If you had to choose between setting accurate CPU requests and installing a VPA, which would you do first, and why?"
  ],
  "exit": [
   [
    "What does `<unknown>` in the TARGETS column of an HPA usually mean?",
    "metrics-server is missing or failing, or the target Pods have no request for the measured resource."
   ],
   [
    "Write the imperative command to autoscale Deployment web between 2 and 10 replicas at 50 percent CPU.",
    "kubectl autoscale deployment web --cpu-percent=50 --min=2 --max=10"
   ],
   [
    "Pods are Pending because no node has room. Which autoscaler addresses this?",
    "The Cluster Autoscaler, which adds nodes when Pods cannot be scheduled."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed HPA manifest with blanks for scaleTargetRef, minReplicas, maxReplicas and averageUtilization, plus a one-line formula card (desired = current x current metric / target).",
   "Extend: Ask fast finishers to add a second metric (memory AverageValue) and a scaleUp policy limiting growth to 4 Pods per minute, then explain which metric wins when they disagree."
  ]
 },
 {
  "t": "Static Pods vs scheduler-placed Pods; what happens when the scheduler is down",
  "objectives": [
   "Students will be able to describe the path a Pod takes through the scheduler and kubelet, and how static Pods bypass it.",
   "Students will be able to identify a mirror Pod and explain why it cannot be deleted or edited through the API.",
   "Students will be able to predict which Pods start and which stay Pending when the kube-scheduler is down.",
   "Students will be able to troubleshoot a broken scheduler static Pod using kubectl, crictl and the manifest file."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students vote with raised hands on each option before revealing nothing yet."
   ],
   [
    12,
    "Teach",
    "Draw two arrows on the whiteboard: API server to scheduler to kubelet for normal Pods, and manifest file to kubelet for static Pods, with a dotted arrow back to a mirror Pod in the API. Show the mirror Pod naming, ownerReferences and annotation in a printed kubectl get pod -o yaml excerpt. Then describe the scheduler-down scenario and ask students to predict outcomes before you confirm them."
   ],
   [
    18,
    "Activity",
    "Run the 'Who still starts' card sort and the log-reading task (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, steering toward the difference between 'no events' and 'FailedScheduling'."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If the component that decides where Pods run crashed right now, what would happen to Pods already running, to a Deployment you scale up, and to the control plane itself?",
  "activity": {
   "title": "Who still starts?",
   "materials": "Printed cards describing Pods (a Deployment replica, a DaemonSet Pod, a static Pod manifest, a Pod with nodeName set, a Pod with schedulerName my-scheduler, a Job Pod); printed excerpts of kubectl describe output and crictl logs from a broken scheduler; whiteboard divided into 'Starts' and 'Stays Pending'.",
   "steps": [
    "In groups of three, students sort the Pod cards into 'Starts' or 'Stays Pending' under the scenario 'the kube-scheduler is down', writing a one-line reason on each card.",
    "Groups repeat the sort for a second scenario: the scheduler is healthy, but no custom scheduler is installed.",
    "Each group reads a printed crictl logs excerpt showing an unknown flag error and writes the exact file they would edit and what they would change.",
    "Groups place their cards on the class whiteboard; the teacher reviews disagreements, especially the DaemonSet and nodeName cards."
   ]
  },
  "discussion": [
   "Why do you think kubeadm runs the control plane components as static Pods instead of as Deployments?",
   "Setting nodeName bypasses the scheduler. What risks does that create, and when is it still worth doing?"
  ],
  "exit": [
   [
    "Name two kinds of Pods that still start when the scheduler is down.",
    "Static Pods and Pods with spec.nodeName already set."
   ],
   [
    "How do you permanently remove a static Pod?",
    "Delete or move its manifest from the node's staticPodPath directory; deleting the mirror Pod with kubectl does not work."
   ],
   [
    "A Pod is Pending with no events. Give two possible causes.",
    "The kube-scheduler is not running, or the Pod's schedulerName names a scheduler that does not exist."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the two Pod paths for students to keep during the card sort, and pair them with a peer who has finished the warm-up confidently.",
   "Extend: Ask fast finishers to write a static Pod manifest for an nginx Pod, state the exact path where it would go on node01 and predict the mirror Pod's name."
  ]
 },
 {
  "t": "Kubernetes network model: one IP per Pod, NAT-free Pod-to-Pod traffic, the CNI plugin's role, Pod and Service CIDRs",
  "objectives": [
   "Students will be able to state the three requirements of the Kubernetes network model.",
   "Students will be able to explain the role of the CNI plugin and recognize the symptoms of a missing one.",
   "Students will be able to locate the Pod CIDR and Service CIDR on a kubeadm cluster and explain why they must not overlap with each other or the node network.",
   "Students will be able to distinguish Pod IPs from Service IPs when choosing a connectivity test."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question; collect answers and circle any that mention NAT or port mapping, which you will revisit."
   ],
   [
    12,
    "Teach",
    "Draw two nodes on the whiteboard, each with two Pods, a pause container and a veth pair, and an overlay tunnel between the nodes. Walk through the three rules, then the sandbox creation sequence: kubelet, runtime, CNI config in /etc/cni/net.d, plugin binary. Write the two CIDRs on the board and show where each is configured."
   ],
   [
    18,
    "Activity",
    "Run the 'Plan the address space' design exercise in small groups (see activity)."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, linking back to the NAT answers from the warm-up."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "On a laptop running Docker, containers often reach the outside world through port mapping and NAT. What problems might that cause if hundreds of services needed to call each other directly?",
  "activity": {
   "title": "Plan the address space",
   "materials": "Printed scenario sheets listing an office network (for example 10.0.0.0/16 for offices, 192.168.10.0/24 for the node subnet, a VPN range); whiteboard or large paper; markers; optional student laptops with a browser-based subnet calculator.",
   "steps": [
    "In groups of three, students read the scenario and choose a Pod CIDR and Service CIDR for a new cluster, writing down why neither overlaps with the existing ranges or each other.",
    "Groups write the exact kubeadm init flags they would use and name the file and flag where the Service CIDR would later be visible.",
    "The teacher hands each group a 'broken cluster' card (overlapping Pod CIDR, missing CNI, ping to a ClusterIP failing) and groups write the symptom they would expect and the first command they would run.",
    "Groups present one design and one broken-cluster diagnosis to the class in under a minute each."
   ]
  },
  "discussion": [
   "Why might the Kubernetes designers have chosen to define rules and leave implementation to plugins rather than ship one built-in network?",
   "What would an application lose if Pod-to-Pod traffic were NATed?"
  ],
  "exit": [
   [
    "State the three requirements of the Kubernetes network model.",
    "Every Pod has its own IP; Pods communicate with all other Pods without NAT; node agents can reach all Pods on their node."
   ],
   [
    "Nodes are NotReady and Pods are stuck in ContainerCreating after kubeadm init. What is missing?",
    "A working CNI network plugin."
   ],
   [
    "Which flag and file give the Service CIDR on a kubeadm cluster?",
    "--service-cluster-ip-range in /etc/kubernetes/manifests/kube-apiserver.yaml."
   ]
  ],
  "differentiation": [
   "Support: Provide a CIDR cheat sheet showing common prefix sizes and a worked example of checking two ranges for overlap.",
   "Extend: Ask fast finishers to compare native routing and VXLAN overlay for a cluster spanning two subnets, listing one advantage and one cost of each."
  ]
 },
 {
  "t": "Kube-proxy modes (iptables, IPVS, nftables) and how Service virtual IPs work",
  "objectives": [
   "Students will be able to explain how kube-proxy turns a Service ClusterIP into DNAT rules toward ready backend Pods.",
   "Students will be able to compare the iptables, IPVS and nftables modes and name the inspection tool for each.",
   "Students will be able to find and change kube-proxy's mode on a kubeadm cluster and apply the change.",
   "Students will be able to choose correct tests for Service reachability and isolate a node-specific kube-proxy failure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take quick answers; do not correct yet."
   ],
   [
    12,
    "Teach",
    "Project a printed iptables -t nat excerpt and trace one packet: KUBE-SERVICES to KUBE-SVC to KUBE-SEP and the DNAT target. Then show an ipvsadm -Ln excerpt and an nft table excerpt for the same Service. Show the kube-proxy ConfigMap mode field and the rollout restart command."
   ],
   [
    18,
    "Activity",
    "Run the 'Follow the packet' rule-tracing exercise in pairs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, revisiting the warm-up answers about ping."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If a Service's IP is not assigned to any network interface anywhere in the cluster, how can traffic sent to it reach a Pod?",
  "activity": {
   "title": "Follow the packet",
   "materials": "Printed excerpts (teacher-prepared) of iptables nat chains for a Service with three endpoints, ipvsadm -Ln output, an nft list table excerpt, a kube-proxy ConfigMap and kube-proxy logs with an error; highlighters; whiteboard.",
   "steps": [
    "Pairs receive the iptables excerpt and highlight the path a packet to the ClusterIP and port takes, writing the final Pod IP and port it could be rewritten to.",
    "Pairs calculate the approximate chance each endpoint is chosen from the probability values in the KUBE-SVC chain.",
    "Pairs match the ipvsadm and nft excerpts to the same Service and write which mode produced each.",
    "Pairs read the ConfigMap and log excerpt (mode set to an invalid value), write the fix and the command to apply it, and predict which nodes are affected."
   ]
  },
  "discussion": [
   "Why would a very large cluster benefit from IPVS or nftables over iptables mode?",
   "What are the trade-offs of replacing kube-proxy entirely with a CNI's eBPF data path?"
  ],
  "exit": [
   [
    "What does kube-proxy actually do to a packet addressed to a ClusterIP?",
    "Nothing directly; it programs kernel rules that DNAT the packet to a ready backend Pod IP and port."
   ],
   [
    "You changed mode in the kube-proxy ConfigMap. What else must you do?",
    "Restart the kube-proxy DaemonSet, for example kubectl -n kube-system rollout restart ds kube-proxy."
   ],
   [
    "How should you test whether a ClusterIP Service on port 80 works?",
    "Connect to the port, for example curl or nc -zv to ClusterIP:80 from a Pod; do not rely on ping."
   ]
  ],
  "differentiation": [
   "Support: Give students a color-coded legend for the iptables excerpt (matching rule, jump, DNAT target) and let them trace with a partner who narrates each step.",
   "Extend: Ask fast finishers to explain how NodePort traffic enters the iptables rules and what changes when the client and the chosen Pod are on different nodes."
  ]
 },
 {
  "t": "Service types: ClusterIP, NodePort (30000–32767), LoadBalancer (cloud controller or MetalLB), headless and ExternalName",
  "objectives": [
   "Students will be able to compare ClusterIP, NodePort, LoadBalancer, headless and ExternalName Services by reachability and mechanism.",
   "Students will be able to create ClusterIP and NodePort Services with kubectl expose and kubectl create service, setting port, targetPort and nodePort correctly.",
   "Students will be able to explain why a LoadBalancer Service stays pending on bare metal and what provides external IPs.",
   "Students will be able to choose the right Service type for a given application requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list answers on the board."
   ],
   [
    12,
    "Teach",
    "Draw nested boxes on the whiteboard: ClusterIP inside NodePort inside LoadBalancer, with headless and ExternalName drawn separately. Label port, targetPort and nodePort on a diagram of client, node and container. Show sample kubectl get svc -o wide output and decode each column."
   ],
   [
    18,
    "Activity",
    "Run the 'Pick the Service' matching game and the port-labeling task (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare headless and ExternalName with the proxied types."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your app runs as five Pods whose IPs change every time they restart. How could other apps, and people outside the cluster, reliably find it?",
  "activity": {
   "title": "Pick the Service",
   "materials": "Printed requirement cards (for example 'internal API for the frontend', 'lab app reachable from student laptops without extra add-ons', 'public app in a cloud', 'StatefulSet replicas reachable by name', 'alias for an external hosted database'); printed Service YAML with blanks for port, targetPort and nodePort; sticky notes.",
   "steps": [
    "In pairs, students match each requirement card to a Service type and write one sentence explaining the choice on a sticky note.",
    "Pairs fill in a blank Service YAML so clients connect on port 80, the container listens on 8080 and external users use node port 30080, then write the equivalent kubectl create service command.",
    "The teacher reveals a 'pending' scenario card (bare-metal cluster, LoadBalancer Service); pairs list two ways users can still reach the app and what to install for a real external IP.",
    "Pairs swap YAML sheets with another pair and check each other's port fields."
   ]
  },
  "discussion": [
   "Why is ExternalName described as 'only DNS', and what could go wrong with HTTPS when using it?",
   "When would you prefer a headless Service over a normal ClusterIP Service, even for a Deployment?"
  ],
  "exit": [
   [
    "Which Service type is the default, and who can reach it?",
    "ClusterIP, reachable only from inside the cluster."
   ],
   [
    "A Service shows 80:31234/TCP in PORT(S). What do the two numbers mean?",
    "80 is the Service port clients use on the ClusterIP; 31234 is the NodePort opened on every node."
   ],
   [
    "What does a headless Service have instead of a ClusterIP?",
    "clusterIP: None; DNS returns the ready Pods' IPs directly."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page diagram showing client, Service port, node port and container port with arrows, and let students annotate it during the YAML task.",
   "Extend: Ask fast finishers to describe what changes for a LoadBalancer Service when MetalLB is installed and how they would verify the external IP is serving traffic."
  ]
 },
 {
  "t": "EndpointSlices, Services without selectors, externalTrafficPolicy and sessionAffinity",
  "objectives": [
   "Students will be able to explain how the EndpointSlice controller connects a Service's selector to backend Pods and how readiness affects endpoints.",
   "Students will be able to create a selectorless Service with a manually written EndpointSlice to reach an external IP.",
   "Students will be able to compare externalTrafficPolicy Cluster and Local in terms of source IP, load spread and dropped traffic.",
   "Students will be able to describe sessionAffinity ClientIP, its default timeout and its limitations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers about why the app sees node IPs."
   ],
   [
    12,
    "Teach",
    "Draw the chain Service selector to EndpointSlice controller to EndpointSlice to kube-proxy. Show the selectorless Service and EndpointSlice YAML. Draw a three-node cluster with Pods on only two nodes and trace external traffic under Cluster and Local. Close with sessionAffinity and its NAT pitfall."
   ],
   [
    18,
    "Activity",
    "Run the 'Route the request' role-play and the YAML writing task (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh the trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A web app behind a NodePort Service logs every visitor as coming from 10.0.0.11, 10.0.0.12 or 10.0.0.13, which are the node IPs. Why might that happen?",
  "activity": {
   "title": "Route the request",
   "materials": "Printed cards labeled Node 1, Node 2, Node 3, Pod A, Pod B and Client; a printed policy card (Cluster or Local); string or a marker to draw paths on the whiteboard; blank paper for YAML.",
   "steps": [
    "Students act out a cluster: three node holders (Pods only on Nodes 1 and 2) and a client who sends a request card to Node 3. Under Cluster, Node 3 forwards it and writes its own address as the source; under Local, Node 3 must refuse it.",
    "Repeat with the client arriving at Node 1 under Local and note that the source address stays the client's.",
    "Repeat with sessionAffinity ClientIP: the same client sends three requests and the class tracks that they reach the same Pod, then two clients share one 'NAT gateway' card and both stick to one Pod.",
    "In pairs, students write a selectorless Service and matching EndpointSlice for an external API at 10.50.1.9 port 443, checking the label and port names against each other."
   ]
  },
  "discussion": [
   "When is losing the client source IP acceptable, and when is it a real problem?",
   "Why is sticking sessions by client IP a weaker approach than storing session state outside the Pods?"
  ],
  "exit": [
   [
    "A Service has an empty EndpointSlice. Name two things to check.",
    "That the selector matches the Pods' labels, and that the matching Pods are Ready."
   ],
   [
    "What two objects do you create to give an external IP a cluster Service name?",
    "A Service with ports and no selector, and an EndpointSlice labeled kubernetes.io/service-name=<service> with the external address and matching port names."
   ],
   [
    "Which externalTrafficPolicy preserves the client's source IP?",
    "Local."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison table template (Cluster versus Local) for students to complete during the role-play.",
   "Extend: Ask fast finishers to explain how internalTrafficPolicy Local could be used for a DaemonSet-based node agent and what happens when a node has no local endpoint."
  ]
 },
 {
  "t": "NetworkPolicies: default deny, ingress and egress rules, podSelector, namespaceSelector (kubernetes.io/metadata.name), ipBlock, ports",
  "objectives": [
   "Students will be able to write a default-deny NetworkPolicy for ingress, egress or both.",
   "Students will be able to build ingress and egress rules using podSelector, namespaceSelector with kubernetes.io/metadata.name, ipBlock and ports.",
   "Students will be able to distinguish ANDed and ORed peer selectors from the YAML structure.",
   "Students will be able to diagnose a policy that breaks DNS and test policies with temporary labeled Pods."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a quick poll."
   ],
   [
    12,
    "Teach",
    "Explain isolation by selection and the union rule using a simple diagram of three namespaces. Project the default-deny YAML and the AND example, then show the OR version with two dashes and ask the class to state the difference before you confirm it. Finish with the DNS egress rule."
   ],
   [
    18,
    "Activity",
    "Run the 'One dash or two' card sort and the policy-writing task (see activity)."
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
  "warmup": "In a brand-new cluster, can a Pod in the marketing namespace open a connection to a database Pod in the payments namespace? What would you need to change to stop it?",
  "activity": {
   "title": "One dash or two",
   "materials": "Printed cards with short ingress YAML fragments (some with one dash, some with two, some with ipBlock and except); printed namespace and Pod label diagram; blank paper; optional student laptops with a browser to view the Kubernetes documentation on NetworkPolicies.",
   "steps": [
    "In pairs, students read each YAML card and write in plain English exactly which sources it allows, then sort the cards into 'AND' and 'OR'.",
    "Pairs check their answers against the label diagram by listing which example Pods would be allowed for each card.",
    "Pairs write two policies for namespace payments: a default deny for Ingress and Egress, and an allow policy letting app=checkout in namespace shop reach app=db on TCP 5432, plus DNS egress for the db Pods.",
    "Pairs swap policies with another pair and look for missing DNS rules, wrong dash structure or missing policyTypes, then write the kubectl run command they would use to test one allowed and one denied path."
   ]
  },
  "discussion": [
   "Why might Kubernetes have chosen allow-only policies with a union rule instead of ordered allow and deny rules like a traditional firewall?",
   "What risks remain in a cluster whose CNI does not enforce NetworkPolicies, and how would you discover that?"
  ],
  "exit": [
   [
    "Write the spec of a policy that denies all ingress to every Pod in its namespace.",
    "podSelector: {} and policyTypes: [Ingress], with no ingress rules."
   ],
   [
    "Under one dash, a namespaceSelector for team=a and a podSelector for app=web appear together. Who is allowed?",
    "Only Pods labeled app=web in namespaces labeled team=a."
   ],
   [
    "After an Egress default deny, all lookups fail. What rule fixes DNS?",
    "An egress rule allowing UDP and TCP port 53 to the CoreDNS Pods, for example namespaceSelector {} with podSelector k8s-app: kube-dns."
   ]
  ],
  "differentiation": [
   "Support: Give students a template policy with labeled slots (spec.podSelector, policyTypes, from, ports) and a highlighted note showing the one-dash and two-dash forms side by side.",
   "Extend: Ask fast finishers to write an egress policy that allows HTTPS to 0.0.0.0/0 except the cluster's Pod CIDR and the cloud metadata address range, and explain why ipBlock is a poor fit for in-cluster Pods."
  ]
 },
 {
  "t": "Gateway API: GatewayClass, Gateway listeners and allowedRoutes, HTTPRoute parentRefs, matches and weighted backendRefs; installing the CRDs and a controller",
  "objectives": [
   "Students will be able to describe the roles of GatewayClass, Gateway and HTTPRoute and who owns each.",
   "Students will be able to write a Gateway listener with allowedRoutes and an HTTPRoute with parentRefs, path matches and weighted backendRefs.",
   "Students will be able to explain the two-sided attachment rule and when a ReferenceGrant is required.",
   "Students will be able to diagnose route problems from status conditions such as Accepted, Programmed, ResolvedRefs and NotAllowedByListeners."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the idea of separating roles."
   ],
   [
    12,
    "Teach",
    "Draw the three layers on the whiteboard with owners: infrastructure provider (GatewayClass), cluster operator (Gateway), developer (HTTPRoute). Explain the install steps: CRDs, then a controller. Project the Gateway and HTTPRoute YAML and trace parentRefs and allowedRoutes, then weights. Show a sample describe output with a NotAllowedByListeners condition."
   ],
   [
    18,
    "Activity",
    "Run the 'Route review board' role-play (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare with Ingress."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If five teams share one public entry point into a cluster, what could go wrong if every team could edit the entry point's whole configuration?",
  "activity": {
   "title": "Route review board",
   "materials": "Printed role cards (Platform team owning a Gateway in namespace infra, App team A in namespace shop, App team B in namespace blog, Namespace owner of assets); printed Gateway YAML with allowedRoutes set to Same; blank paper for HTTPRoute YAML; printed status-condition cards (Accepted, NotAllowedByListeners, ResolvedRefs False with BackendNotFound, RefNotPermitted).",
   "steps": [
    "In groups of four, each student takes a role. App teams write an HTTPRoute on paper for their path, including parentRefs with namespace and sectionName, and team A adds a 75 and 25 weighted canary.",
    "The Platform student reviews each route against the Gateway's allowedRoutes and hands back the status card the controller would set; the group decides what must change (for example from: Selector with a namespace label).",
    "Team B's route points at a Service in namespace assets; the Namespace owner decides whether to write a ReferenceGrant and drafts it.",
    "Groups summarize on the whiteboard which object each fix went into and which role had to make it."
   ]
  },
  "discussion": [
   "What does Gateway API gain by requiring both the route and the Gateway to agree on attachment, and what does it cost in convenience?",
   "Why might a team keep using Ingress today, and what would push them to move to Gateway API?"
  ],
  "exit": [
   [
    "Name the two things you install before you can use Gateway API on a cluster.",
    "The Gateway API CRDs and a controller implementation."
   ],
   [
    "An HTTPRoute in namespace shop references a Gateway in infra with default allowedRoutes. Will it attach?",
    "No; the default from: Same only allows routes in infra. Set from: All or a Selector matching shop."
   ],
   [
    "How do you send about 10 percent of /api traffic to api-v2?",
    "In the rule's backendRefs, list api-v1 with weight 90 and api-v2 with weight 10."
   ]
  ],
  "differentiation": [
   "Support: Provide an annotated HTTPRoute skeleton with arrows linking parentRefs to the Gateway's name, namespace and listener name.",
   "Extend: Ask fast finishers to add an HTTPS listener with a TLS certificate Secret and an HTTPRoute filter that redirects HTTP requests to HTTPS."
  ]
 },
 {
  "t": "Ingress controllers, IngressClass and the default class; Ingress rules, path types and TLS",
  "objectives": [
   "Students will be able to explain why an Ingress needs an installed controller and how IngressClass and the default class link Ingresses to controllers.",
   "Students will be able to write Ingress rules with hosts, paths and the correct pathType, and predict which backend serves a given URL.",
   "Students will be able to configure TLS on an Ingress using a kubernetes.io/tls Secret in the same namespace.",
   "Students will be able to troubleshoot an Ingress with an empty ADDRESS or unexpected routing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch answers as a flow on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw user, controller Service, controller Pods, Ingress object and backend Services. Explain IngressClass, spec.controller and the default annotation. Project the sample Ingress and walk through path matching for three URLs. Show kubectl create secret tls and the tls section."
   ],
   [
    18,
    "Activity",
    "Run the 'Where does this URL go' routing game and the broken Ingress review (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, linking to Gateway API."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A user types shop.example.com/api/orders into a browser. List every hop the request might take before it reaches a Pod in your cluster.",
  "activity": {
   "title": "Where does this URL go?",
   "materials": "Printed Ingress manifests (one with mixed Exact and Prefix paths, one without ingressClassName, one with a TLS Secret in the wrong namespace); a deck of printed URL cards; printed kubectl get ingressclass output; whiteboard.",
   "steps": [
    "In pairs, students draw URL cards and decide which Service each request reaches under the mixed-path Ingress, writing the matching rule and the reason (longest match, Exact versus Prefix, element-wise matching).",
    "The teacher reveals tricky cards such as /apiv2, /API and /api/ and pairs revise their answers.",
    "Pairs review the two broken manifests with the IngressClass output and write the fix for each (add ingressClassName or mark a default class; move or recreate the Secret in the Ingress namespace).",
    "Pairs write the kubectl create ingress command for a simple host with a Prefix path and TLS, then compare with a neighbor."
   ]
  },
  "discussion": [
   "Why do you think the Ingress API is feature-frozen, and what problems with controller-specific annotations did Gateway API try to solve?",
   "What could go wrong if two IngressClasses were both marked as default?"
  ],
  "exit": [
   [
    "An Ingress shows an empty ADDRESS. Give two likely causes.",
    "No Ingress controller is installed, or the Ingress has no ingressClassName and there is no default IngressClass (or the class names the wrong controller)."
   ],
   [
    "Does /docs with pathType Prefix match /docs/install? Does it match /docsite?",
    "Yes for /docs/install; no for /docsite, because Prefix matches whole path elements."
   ],
   [
    "Where must the TLS Secret for an Ingress live, and what type is it?",
    "In the same namespace as the Ingress, as type kubernetes.io/tls."
   ]
  ],
  "differentiation": [
   "Support: Give students a path-matching flowchart (does the host match, which paths match, longest wins, Exact beats Prefix on a tie) to use during the URL game.",
   "Extend: Ask fast finishers to translate the sample Ingress into a Gateway and HTTPRoute, noting which fields map directly and which need a different approach."
  ]
 },
 {
  "t": "CoreDNS: the coredns ConfigMap and Corefile, forwarding and stub zones, Service and Pod DNS records, dnsPolicy",
  "objectives": [
   "Students will be able to locate and edit the Corefile in the coredns ConfigMap and explain the role of its main plugins.",
   "Students will be able to add a stub zone and change upstream forwarders for cluster DNS.",
   "Students will be able to construct Service, headless, StatefulSet Pod and Pod DNS names and explain how search domains and ndots expand short names.",
   "Students will be able to choose the correct dnsPolicy for a Pod, including hostNetwork Pods and custom dnsConfig."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect guesses about what a Pod's resolv.conf contains."
   ],
   [
    12,
    "Teach",
    "Project a sample Pod resolv.conf and explain the nameserver, search list and ndots. Then project the Corefile and walk through each plugin, ending with the stub zone block. Write the record formats for Service, SRV, headless, StatefulSet Pod and Pod on the whiteboard. Summarize the four dnsPolicy values in a table."
   ],
   [
    18,
    "Activity",
    "Run the 'Name that record' relay and the Corefile edit task (see activity)."
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
  "warmup": "When a Pod connects to a Service using just the name web, how do you think it finds the right IP address?",
  "activity": {
   "title": "Name that record",
   "materials": "Printed scenario cards (Service api in shop, headless Service db with StatefulSet Pod db-1 in data, Pod IP 10.244.3.9 in dev, named port https on Service web, a hostNetwork Pod); a printed default Corefile; printed resolv.conf excerpt; whiteboard split into teams.",
   "steps": [
    "Teams take turns drawing a scenario card and writing the full DNS name (or the dnsPolicy needed) on the whiteboard; the class checks each answer against the formats.",
    "Each team receives a short name lookup (for example web.other from a Pod in namespace shop) and writes the sequence of names the resolver tries with the search list.",
    "In pairs, students edit the printed Corefile on paper to add a stub zone for corp.internal pointing to 10.0.0.53 and change upstream forwarding to two given resolvers.",
    "Pairs write the exact kubectl commands to edit the ConfigMap, apply the change and verify it from a temporary Pod."
   ]
  },
  "discussion": [
   "What are the trade-offs of ndots:5 for applications that mostly call external hostnames?",
   "Why might a team choose dnsPolicy None with dnsConfig instead of changing CoreDNS for everyone?"
  ],
  "exit": [
   [
    "What is the full DNS name of Service cache in namespace web?",
    "cache.web.svc.cluster.local"
   ],
   [
    "Where is CoreDNS configured on a kubeadm cluster, and what is the Service named?",
    "In the Corefile key of the coredns ConfigMap in kube-system; the Service is named kube-dns."
   ],
   [
    "Which dnsPolicy lets a hostNetwork Pod resolve cluster Services?",
    "ClusterFirstWithHostNet."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank card for each record format (<svc>.<ns>.svc.cluster.local and so on) that students can reference during the relay.",
   "Extend: Ask fast finishers to write a Pod spec with dnsPolicy None and a dnsConfig that uses a custom nameserver, search domain and ndots value, and explain when that would be preferable."
  ]
 },
 {
  "t": "Testing connectivity with temporary Pods (busybox, nicolaka/netshoot), nslookup, curl and nc",
  "objectives": [
   "Students will be able to create a temporary troubleshooting Pod with kubectl run using --rm, -it, --restart=Never, -n and -l.",
   "Students will be able to choose between busybox and nicolaka/netshoot and use the correct tool (wget, curl, nslookup, nc) in each.",
   "Students will be able to apply a layered test (DNS, Service, Pod IP) and name the likely fault from which layer fails.",
   "Students will be able to distinguish a connection timeout from a connection refused result and explain what each implies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four guesses on the whiteboard about where to start when two Pods cannot talk."
   ],
   [
    12,
    "Teach",
    "Project the kubectl run commands from the lesson and explain each flag. Draw the three layers (DNS, Service, Pod IP) as stacked boxes and walk through what a failure at each layer means. Compare busybox and netshoot tools in a two-column table."
   ],
   [
    18,
    "Activity",
    "Run the 'Layer Detective' card activity in pairs (see activity steps)."
   ],
   [
    6,
    "Discuss",
    "Pairs share one tricky card. Use the discussion questions to draw out the refused versus timeout difference and why test Pod labels matter."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on paper or a sticky note and hand them in."
   ]
  ],
  "warmup": "Your web Pods cannot reach the database Service. Before you touch any YAML, what is the very first thing you would test, and from where would you test it?",
  "activity": {
   "title": "Layer Detective",
   "materials": "Printed scenario cards (one scenario per card, about eight cards), whiteboard, sticky notes; optional student laptops with a browser-based Kubernetes playground if available.",
   "steps": [
    "Before class, write eight cards. Each card shows three short test outputs from a temporary Pod: the nslookup result, the Service test result (succeeded, refused or timed out) and the direct Pod IP test result. Include cases for a wrong selector, wrong targetPort, a NetworkPolicy drop, a broken DNS server, an app listening only on localhost and a correctly working path.",
    "Give each pair two cards. For each card, the pair writes on a sticky note which layer failed first, the most likely cause, and the next kubectl command they would run.",
    "Pairs then write the exact kubectl run command they would use to reproduce the test, including the namespace, labels, image and a timeout flag.",
    "Pairs swap cards with a neighboring pair and check each other's answers, marking any disagreements.",
    "The teacher reveals the intended answers and places the sticky notes on a whiteboard grid of layer versus cause."
   ]
  },
  "discussion": [
   "Why can a test Pod with the wrong labels give a false pass or a false failure when NetworkPolicies are in place?",
   "When would you prefer kubectl debug over starting a new temporary Pod?",
   "What does a quick 'connection refused' tell you that a slow timeout does not?"
  ],
  "exit": [
   [
    "Write the command to start a temporary busybox Pod in namespace web with label app=ui that runs nslookup kubernetes.default and is deleted afterwards.",
    "kubectl run t --rm -it --restart=Never --image=busybox -n web -l app=ui -- nslookup kubernetes.default"
   ],
   [
    "The Pod IP answers on port 8080 but the Service name returns connection refused. Name the most likely misconfiguration.",
    "The Service targetPort (or port) does not match the container's listening port, or the selector is pointing at the wrong Pods."
   ],
   [
    "You need curl but only busybox is available. What do you use instead?",
    "wget -qO- with -T for a timeout, for example wget -qO- -T 3 api:8080."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page flowchart with the three layers and the two failure types (refused, timeout) printed on it, and let them work through the first card with the teacher before working alone.",
   "Extend: Ask fast finishers to write a card of their own where the CNI is broken on one node only, and explain how testing from Pods on two different nodes would reveal it."
  ]
 },
 {
  "t": "Volumes vs PersistentVolumes; PV and PVC lifecycle (Available, Bound, Released) and binding rules",
  "objectives": [
   "Students will be able to explain the difference between Pod-level volumes such as emptyDir and PersistentVolumes with PersistentVolumeClaims.",
   "Students will be able to describe the PV phases Available, Bound, Released and Failed and what causes each transition.",
   "Students will be able to list the fields that must match for a PVC to bind to a PV.",
   "Students will be able to diagnose a Pending PVC by comparing PV and PVC specifications."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the whiteboard under 'gone' and 'kept'."
   ],
   [
    13,
    "Teach",
    "Draw the Pod, PVC and PV as three boxes and show how a Pod names a claim and a claim binds to a volume. Walk through the PV phases as a timeline, then list the five binding checks: class, access modes, capacity, volumeMode and selector."
   ],
   [
    17,
    "Activity",
    "Run the 'Match the Claim' card sort in groups of three (see activity steps)."
   ],
   [
    6,
    "Discuss",
    "Groups present one unmatched claim and explain why it stays Pending. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "A database container restarts and writes to /data. A minute later the Pod itself is deleted and recreated on another node. In each case, does the data survive if /data is an emptyDir?",
  "activity": {
   "title": "Match the Claim",
   "materials": "Printed PV cards (about eight, each listing name, capacity, access modes, storageClassName, volumeMode and labels), printed PVC cards (about six with the same fields plus an optional selector), whiteboard, sticky notes.",
   "steps": [
    "Give each group a deck of PV cards laid out face up as 'Available' and a stack of PVC cards.",
    "Groups process the PVC cards one at a time, binding each to a matching PV by placing the cards together. They must use the smallest PV that fits and may not bind one PV twice.",
    "For any PVC that cannot bind, the group writes on a sticky note which field blocked it and what change would fix it.",
    "The teacher then announces 'claim deleted' for two bound pairs. Groups move those PVs to a Released pile and decide, for each, what an administrator would need to do before it can be reused.",
    "Groups compare results with another group and resolve differences."
   ]
  },
  "discussion": [
   "Why might Kubernetes refuse to reuse a Released volume automatically, even though that seems inconvenient?",
   "When would you deliberately use spec.volumeName on a claim instead of letting the control plane choose?",
   "What risks come from binding a small claim to a much larger volume?"
  ],
  "exit": [
   [
    "List the four PV phases.",
    "Available, Bound, Released and Failed."
   ],
   [
    "Name four fields that must be compatible for a PVC to bind to a PV.",
    "Any four of: storageClassName, access modes, capacity at least the request, volumeMode, and the PVC's label selector."
   ],
   [
    "Is a PV cluster-scoped or namespaced, and is a PVC cluster-scoped or namespaced?",
    "A PV is cluster-scoped; a PVC is namespaced."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist card with the five binding fields that students tick through for each claim, and pair them with a peer who reads the PV values aloud.",
   "Extend: Ask fast finishers to write the YAML for a PVC that would bind only to one specific PV using a label selector, and to explain what happens if two PVs carry the same label."
  ]
 },
 {
  "t": "Access modes: ReadWriteOnce, ReadOnlyMany, ReadWriteMany, ReadWriteOncePod",
  "objectives": [
   "Students will be able to define ReadWriteOnce, ReadOnlyMany, ReadWriteMany and ReadWriteOncePod and give their abbreviations.",
   "Students will be able to explain why RWO is scoped to a node and predict a Multi-Attach error.",
   "Students will be able to choose the correct access mode and storage type for a described workload.",
   "Students will be able to explain the difference between an access mode and a readOnly mount."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Take a quick vote by show of hands and leave the answer open."
   ],
   [
    12,
    "Teach",
    "Draw two nodes on the whiteboard with Pods inside. Place a disk icon on one node to show RWO, then shared storage connected to both for RWX. Explain RWOP as a lock on one Pod. Show the YAML from the lesson and stress that accessModes is a list."
   ],
   [
    18,
    "Activity",
    "Run the 'Pick the Mode' scenario game in pairs (see activity steps)."
   ],
   [
    6,
    "Discuss",
    "Return to the warm-up vote and resolve it. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A claim uses ReadWriteOnce. Two Pods on the same node mount it. Will the second Pod start? Vote yes or no.",
  "activity": {
   "title": "Pick the Mode",
   "materials": "Printed workload cards (about ten short descriptions), four large cards labeled RWO, ROX, RWX and RWOP taped to the walls, whiteboard, sticky notes.",
   "steps": [
    "Before class, write ten workload cards, for example: a single database replica that must never run twice, a Deployment of web servers sharing uploads, a model file read by many Pods, a single-replica cache, and a StatefulSet with per-replica data.",
    "Read each card aloud. Pairs walk to, or point at, the wall card for the access mode they choose.",
    "Ask one pair per round to justify the choice in terms of nodes and Pods, and ask another pair what would go wrong with a different mode.",
    "For two of the cards, add a twist: the only StorageClass available is a cloud block disk. Pairs decide whether the workload must be redesigned, for example as a StatefulSet with per-replica claims.",
    "Record the final answers on the whiteboard as a reference table."
   ]
  },
  "discussion": [
   "Why can a cloud block disk not safely offer ReadWriteMany?",
   "When would a StatefulSet with per-replica RWO claims be better than one RWX claim shared by all replicas?",
   "If access modes do not enforce read-only mounts, what does?"
  ],
  "exit": [
   [
    "What does RWO restrict: Pods or nodes?",
    "Nodes. Several Pods on one node can share an RWO volume."
   ],
   [
    "A replica on a second node is stuck in ContainerCreating with a Multi-Attach error. What is the cause?",
    "The PVC is RWO and is already attached to a different node."
   ],
   [
    "Which access mode guarantees that only one Pod in the cluster can use the volume?",
    "ReadWriteOncePod."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card that pairs each mode with a picture: one node, many nodes reading, many nodes writing, and one Pod.",
   "Extend: Ask fast finishers to explain what happens during a rolling update of a single-replica Deployment that uses an RWO claim when the new Pod lands on a different node, and how they would avoid it."
  ]
 },
 {
  "t": "Reclaim policies: Retain and Delete (Recycle deprecated) and cleaning up Released PVs",
  "objectives": [
   "Students will be able to compare the Retain, Delete and Recycle reclaim policies and state which is deprecated.",
   "Students will be able to identify the default reclaim policy for manually created and dynamically provisioned PVs.",
   "Students will be able to make a Released PV Available again by handling its data and clearing claimRef.",
   "Students will be able to protect data on a dynamically provisioned volume by patching its reclaim policy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to predict what happens to the data."
   ],
   [
    12,
    "Teach",
    "Draw a flowchart starting from 'PVC deleted' with branches for Delete and Retain. Show the kubectl patch commands from the lesson on the projector and explain the protection finalizers."
   ],
   [
    18,
    "Activity",
    "Run the 'What Happens Next' role-play in groups of four (see activity steps)."
   ],
   [
    6,
    "Discuss",
    "Groups share their hardest round. Use the discussion questions to connect policy choices to real costs and risks."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You delete a claim for a volume that a StorageClass created automatically. Nobody set a reclaim policy. Where is the data now?",
  "activity": {
   "title": "What Happens Next",
   "materials": "Printed role cards (Cluster Admin, App Owner, Storage System, Auditor), printed event cards describing actions such as 'PVC deleted' or 'PV patched to Retain', whiteboard, sticky notes.",
   "steps": [
    "In each group of four, assign the roles. The Storage System student keeps a sticky note per disk showing whether it exists and whether it holds data.",
    "The teacher reads event cards one at a time, each naming a PV, its origin (manual or dynamic) and its current policy, for example 'Dynamic PV pvc-77, PVC deleted'.",
    "After each event, the Cluster Admin states the new PV phase, the Storage System updates the disk note, and the App Owner says whether the data can still be recovered.",
    "In the final rounds, the App Owner asks for a Released volume to be reused. The Cluster Admin must speak the exact steps and kubectl patch command, and the Auditor checks that the old data was dealt with first.",
    "Groups compare their disk notes with the teacher's answer key."
   ]
  },
  "discussion": [
   "Why do you think dynamically provisioned volumes default to Delete rather than Retain?",
   "What could go wrong, from a privacy point of view, if Released volumes were handed to new claims automatically?",
   "How would orphaned storage show up in an organization, and who would notice first?"
  ],
  "exit": [
   [
    "What is the default reclaim policy for a manually created PV, and for a dynamically provisioned one?",
    "Retain for manually created PVs; Delete for dynamic PVs unless the StorageClass sets otherwise."
   ],
   [
    "Which reclaim policy is deprecated?",
    "Recycle."
   ],
   [
    "Write the command to stop a dynamic PV named pvc-1234 from being deleted with its claim.",
    "kubectl patch pv pvc-1234 -p '{\"spec\":{\"persistentVolumeReclaimPolicy\":\"Retain\"}}'"
   ]
  ],
  "differentiation": [
   "Support: Give students a printed flowchart of 'PVC deleted' leading to each policy outcome, and let them trace each event card on it with a finger before answering.",
   "Extend: Ask fast finishers to explain how they would make a Released PV bind only to one specific new claim in another namespace by editing claimRef instead of clearing it."
  ]
 },
 {
  "t": "StorageClasses, provisioners and dynamic provisioning; the default StorageClass annotation",
  "objectives": [
   "Students will be able to describe the fields of a StorageClass and which of them cannot be changed after creation.",
   "Students will be able to explain how a provisioner dynamically creates a PV for a PVC.",
   "Students will be able to change the default StorageClass using the is-default-class annotation.",
   "Students will be able to predict the behavior of a PVC that omits storageClassName versus one that sets it to an empty string."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the ticket backlog and gather ideas for automating storage requests."
   ],
   [
    12,
    "Teach",
    "Project the StorageClass YAML and annotate each field. Draw the flow PVC created, provisioner sees it, volume created, PV bound. Write the two PVCs (omitted class versus empty string) side by side and ask students to predict each outcome."
   ],
   [
    18,
    "Activity",
    "Run the 'Storage Help Desk' paired troubleshooting exercise (see activity steps)."
   ],
   [
    6,
    "Discuss",
    "Pairs share how they diagnosed one ticket. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your team receives forty tickets a week asking for storage, and each takes a person an hour. What would you want Kubernetes to do instead?",
  "activity": {
   "title": "Storage Help Desk",
   "materials": "Printed ticket cards, each with a short PVC YAML, the output of kubectl get sc, and the event line from kubectl describe pvc; projector; whiteboard; sticky notes.",
   "steps": [
    "Before class, prepare about eight ticket cards covering: an empty-string class, no default class, two defaults, a misspelled class name, a provisioner whose Pods are crashing, a WaitForFirstConsumer claim with no Pod yet, and a healthy claim.",
    "Pairs take a ticket, decide whether there is a real problem, and write the root cause on a sticky note.",
    "For each real problem, pairs write the exact fix, such as a kubectl patch command for the annotation or a corrected YAML line.",
    "Pairs rotate tickets twice so each pair handles at least three.",
    "The teacher reviews the tickets on the projector and collects the fixes on the whiteboard."
   ]
  },
  "discussion": [
   "Why might an organization prefer several StorageClasses instead of one default class?",
   "What risks come from a default class whose reclaimPolicy is Delete?",
   "Why does Kubernetes make most StorageClass fields immutable?"
  ],
  "exit": [
   [
    "What annotation and value mark a StorageClass as the default?",
    "storageclass.kubernetes.io/is-default-class set to \"true\"."
   ],
   [
    "A PVC sets storageClassName to an empty string. Will the default class provision a volume for it?",
    "No. An empty string means no class; it only binds to PVs with no class."
   ],
   [
    "Name three fields of a StorageClass.",
    "Any three of provisioner, parameters, reclaimPolicy, volumeBindingMode, allowVolumeExpansion, mountOptions."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision tree card: does the PVC name a class, omit it or set it empty, and does a default exist. Let them trace each ticket on it.",
   "Extend: Ask fast finishers to write a complete StorageClass for local disks with no provisioner and explain why it should use WaitForFirstConsumer."
  ]
 },
 {
  "t": "VolumeBindingMode Immediate vs WaitForFirstConsumer",
  "objectives": [
   "Students will be able to compare Immediate and WaitForFirstConsumer binding and state which is the default.",
   "Students will be able to explain why topology-constrained storage such as local volumes needs WaitForFirstConsumer.",
   "Students will be able to distinguish an expected Pending PVC from a failed one using kubectl describe events.",
   "Students will be able to identify why spec.nodeName prevents delayed binding."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up and ask students to discuss in pairs for two minutes."
   ],
   [
    12,
    "Teach",
    "Draw three nodes, each with a local disk, and a Pod with a nodeSelector. Act out Immediate binding (disk chosen first, Pod cannot follow) and then WaitForFirstConsumer (node chosen first, disk follows). Show the StorageClass YAML and the 'waiting for first consumer' event."
   ],
   [
    18,
    "Activity",
    "Run the 'Scheduler and Storage' role-play (see activity steps)."
   ],
   [
    6,
    "Discuss",
    "Debrief the role-play using the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You book a hotel room before you know which city your meeting is in. What can go wrong, and how would you avoid it?",
  "activity": {
   "title": "Scheduler and Storage",
   "materials": "Sticky notes, three chairs labeled node01, node02 and node03 with a paper 'disk' on each, printed Pod cards listing constraints (nodeSelector, taint tolerations, CPU request), printed mode cards (Immediate, WaitForFirstConsumer).",
   "steps": [
    "Choose volunteers to play the Scheduler, the Volume Binder and a Pod. Other students observe and record outcomes on the whiteboard.",
    "Round 1 uses an Immediate card: the Volume Binder must pick a disk as soon as the claim is announced, before seeing the Pod card. Then the Scheduler tries to place the Pod. Observers record whether it can start.",
    "Round 2 uses a WaitForFirstConsumer card: the Scheduler reads the Pod card and picks a chair first, and the Volume Binder must then bind the disk on that chair.",
    "Round 3 introduces a Pod card with nodeName set. The Scheduler must sit out, and the class discusses why the Volume Binder never acts.",
    "Rotate volunteers and repeat with different Pod constraint cards."
   ]
  },
  "discussion": [
   "For which kinds of storage is Immediate binding perfectly safe?",
   "How would you explain to a developer that their Pending claim is not broken?",
   "Why does Kubernetes not simply move a bound volume to where the Pod can run?"
  ],
  "exit": [
   [
    "What is the default volumeBindingMode of a StorageClass?",
    "Immediate."
   ],
   [
    "A PVC is Pending with the event 'waiting for first consumer to be created before binding'. Is that a problem?",
    "No, it is expected for a WaitForFirstConsumer class until a Pod uses the claim."
   ],
   [
    "What Pod event suggests a volume was bound where the Pod cannot run?",
    "node(s) had volume node affinity conflict."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-row comparison card (Immediate and WaitForFirstConsumer) with columns for when binding happens, good for, and risk, and have students fill it in during the role-play.",
   "Extend: Ask fast finishers to describe how WaitForFirstConsumer helps zonal cloud disks in a cluster spread across three zones, and what happens if a Pod later moves to another zone."
  ]
 },
 {
  "t": "Volume expansion with allowVolumeExpansion",
  "objectives": [
   "Students will be able to explain the roles of allowVolumeExpansion and driver support in volume expansion.",
   "Students will be able to expand a PVC by editing spec.resources.requests.storage and verify the result.",
   "Students will be able to interpret the Resizing and FileSystemResizePending conditions.",
   "Students will be able to state the limits of expansion, including no shrinking and no expansion for hostPath or classless static PVs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for handling a full disk."
   ],
   [
    12,
    "Teach",
    "Show the expansion flow on the whiteboard: PVC edited, controller and driver grow the volume, kubelet grows the filesystem. Project the commands from the lesson and explain spec versus status. Contrast online and offline expansion."
   ],
   [
    18,
    "Activity",
    "Run the 'Grow It' log-reading exercise in pairs (see activity steps)."
   ],
   [
    6,
    "Discuss",
    "Pairs share one surprising case. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A database disk is almost full. Name two ways you could give it more space, and what each would cost you in downtime.",
  "activity": {
   "title": "Grow It",
   "materials": "Printed handouts with six short snapshots, each showing a StorageClass excerpt, a PVC spec and status excerpt, and the conditions or events from kubectl describe pvc; projector; whiteboard.",
   "steps": [
    "Before class, prepare snapshots covering: a class without allowVolumeExpansion, a successful online expansion, a FileSystemResizePending claim, an attempted shrink, a hostPath static PV, and a StatefulSet template edited without resizing the existing claims.",
    "Pairs read each snapshot and write down what state the expansion is in and why.",
    "For each snapshot, pairs write the next command or action, for example patching the class, restarting the Pod, or patching each StatefulSet PVC.",
    "Pairs join another pair to compare answers and agree on one response per snapshot.",
    "The teacher walks through the answers on the projector and highlights the difference between spec and status in each."
   ]
  },
  "discussion": [
   "Why do you think allowVolumeExpansion is a switch the administrator controls instead of always being on?",
   "What are the trade-offs of offline expansion for a production database?",
   "Why is shrinking a filesystem much riskier than growing one?"
  ],
  "exit": [
   [
    "Which object and field do you change to request a bigger volume?",
    "The PVC's spec.resources.requests.storage."
   ],
   [
    "What does the FileSystemResizePending condition mean?",
    "The backend volume was grown, and the filesystem will be resized when a Pod next mounts the volume."
   ],
   [
    "Which StorageClass field must be true for expansion to be allowed?",
    "allowVolumeExpansion."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-step checklist (class allows it, edit the PVC, watch status and conditions) to apply to each snapshot.",
   "Extend: Ask fast finishers to plan how they would expand all the claims of a five-replica StatefulSet and explain why changing volumeClaimTemplates alone does not work."
  ]
 },
 {
  "t": "Static PVs: hostPath for labs, local volumes with nodeAffinity, NFS",
  "objectives": [
   "Students will be able to compare hostPath, local and NFS PersistentVolumes and choose one for a given requirement.",
   "Students will be able to write a static PV manifest including capacity, access modes, storageClassName and backend fields.",
   "Students will be able to explain why local PVs require nodeAffinity and a WaitForFirstConsumer class.",
   "Students will be able to troubleshoot a static PV that will not bind or mount."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers as three storage locations on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Project the three manifests from the lesson side by side. Highlight the backend block in each, the nodeAffinity on the local PV and the server and path on NFS. Explain that capacity is a matching label, not a quota."
   ],
   [
    18,
    "Activity",
    "Run the 'Write the PV' paired build exercise (see activity steps)."
   ],
   [
    6,
    "Discuss",
    "Pairs share one mistake they caught in a partner's manifest. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Where could you keep files so that an app finds them after it moves to a different machine? Name as many options as you can.",
  "activity": {
   "title": "Write the PV",
   "materials": "Printed task cards with three requirements each, student laptops with a browser and any text editor (or paper), projector showing a blank PV template.",
   "steps": [
    "Give each pair a task card, for example: a 200Mi hostPath PV for a lab, a 50Gi local SSD on node03, and a 10Gi shared NFS export at 10.0.0.20:/exports/docs.",
    "Pairs write all three PV manifests from memory or from the documentation, choosing a storageClassName for each and the correct access modes.",
    "Pairs swap manifests with another pair, who review them against a checklist: no namespace on the PV, correct backend block, nodeAffinity present for local, sensible access modes.",
    "Each pair then writes one matching PVC for one of the PVs and explains why it will bind.",
    "The teacher shows model answers and discusses common errors found during review."
   ]
  },
  "discussion": [
   "Why are hostPath volumes considered a security concern in shared clusters?",
   "What happens to a workload using a local PV if its node fails permanently?",
   "When would you choose NFS over local disk despite lower performance?"
  ],
  "exit": [
   [
    "Which static volume type should be used for storage that many nodes must write at the same time?",
    "NFS (shared network storage), with ReadWriteMany."
   ],
   [
    "What happens if you create a local PV without nodeAffinity?",
    "The API server rejects it."
   ],
   [
    "Does a hostPath PV with capacity 1Gi stop a Pod from writing 5Gi?",
    "No, capacity is used for matching, not enforced."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blanks PV template with the common fields already present, so students focus on choosing the backend block and values.",
   "Extend: Ask fast finishers to write the StorageClass for their local PV and to explain what happens if they use Immediate binding instead."
  ]
 },
 {
  "t": "CSI drivers and StatefulSet volumeClaimTemplates with PVC retention",
  "objectives": [
   "Students will be able to identify the controller and node components of a CSI driver and the sidecars in each.",
   "Students will be able to use kubectl to inspect csidrivers, csinodes and volumeattachments.",
   "Students will be able to predict the PVC names created by a StatefulSet's volumeClaimTemplates.",
   "Students will be able to configure persistentVolumeClaimRetentionPolicy for a stated cleanup requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect guesses about why storage costs might grow after a load test."
   ],
   [
    12,
    "Teach",
    "Draw the CSI controller (with its sidecars) and the node DaemonSet across three nodes. Then project the StatefulSet YAML, show how claim names are formed, and walk through whenDeleted and whenScaled."
   ],
   [
    18,
    "Activity",
    "Run the 'Claim Ledger' scale simulation in small groups (see activity steps)."
   ],
   [
    6,
    "Discuss",
    "Groups compare ledgers and discuss the questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A StatefulSet is scaled from 10 replicas down to 3. How many storage claims do you think still exist afterwards, and why?",
  "activity": {
   "title": "Claim Ledger",
   "materials": "Sticky notes in two colors (one for Pods, one for PVCs), printed instruction cards with StatefulSet names, template names, retention policies and a sequence of scale and delete actions, whiteboard.",
   "steps": [
    "Each group receives an instruction card such as: StatefulSet db, template data, whenDeleted Retain, whenScaled Delete; actions: create with 3, scale to 5, scale to 2, delete StatefulSet.",
    "Groups place Pod and PVC sticky notes on a sheet for each step, writing the exact names, such as db-0 and data-db-0.",
    "At each step, groups remove the notes that the retention policy would delete and keep the others, recording the count of remaining PVCs.",
    "Groups trade cards with a different policy combination and repeat.",
    "The teacher reveals the expected final ledgers and asks one group to explain each difference."
   ]
  },
  "discussion": [
   "When would you want whenDeleted Delete in a real organization, and when would it be dangerous?",
   "Why does Kubernetes keep CSI drivers outside the core code base?",
   "How would you find out which node a CSI volume is attached to?"
  ],
  "exit": [
   [
    "What PVC does Pod web-0 of StatefulSet web get from a template named www?",
    "www-web-0."
   ],
   [
    "What are the default values of whenDeleted and whenScaled?",
    "Both Retain."
   ],
   [
    "Name one command to inspect CSI state in a cluster.",
    "kubectl get csidrivers, kubectl get csinodes or kubectl get volumeattachments."
   ]
  ],
  "differentiation": [
   "Support: Provide a naming formula strip (template - statefulset - ordinal) and a pre-filled first step of the ledger.",
   "Extend: Ask fast finishers to describe the troubleshooting path for a StatefulSet Pod stuck Pending whose PVC is waiting for an external provisioner, naming the Pods and containers whose logs they would read."
  ]
 },
 {
  "t": "Node problems: NotReady, kubelet status and journalctl -u kubelet, kubelet config and certificates, container runtime down, node conditions (DiskPressure, MemoryPressure)",
  "objectives": [
   "Students will be able to interpret node conditions, including the difference between Ready Unknown and Ready False.",
   "Students will be able to use systemctl and journalctl to diagnose a failing kubelet and container runtime.",
   "Students will be able to locate the kubelet configuration files and apply the daemon-reload and restart sequence after a fix.",
   "Students will be able to explain how DiskPressure and MemoryPressure lead to evictions and taints."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up prompt and ask students to list possible causes of a NotReady node on sticky notes."
   ],
   [
    12,
    "Teach",
    "Sort the warm-up sticky notes into four columns on the whiteboard: kubelet stopped, misconfigured, cannot reach or authenticate, runtime or network not ready. Project the command block from the lesson and explain each command and file. Contrast Ready Unknown with Ready False, then cover pressure conditions."
   ],
   [
    18,
    "Activity",
    "Run the 'Night Shift' pair troubleshooting exercise (see activity steps)."
   ],
   [
    6,
    "Discuss",
    "Pairs share their diagnosis for one case. Use the discussion questions."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A node in your cluster just turned NotReady. Write down as many possible causes as you can in two minutes.",
  "activity": {
   "title": "Night Shift",
   "materials": "Printed case packets (one per pair), each containing a kubectl describe node conditions excerpt, a systemctl status excerpt and about ten lines of journal output; projector; whiteboard.",
   "steps": [
    "Before class, write six case packets: a stopped and disabled kubelet, a typo in the config path in the drop-in, a wrong API server port in kubelet.conf, an expired client certificate with x509 errors, containerd stopped, and a node with DiskPressure from full logs.",
    "Each pair receives two packets. One student plays the on-call engineer who may only ask for one piece of evidence at a time; the other plays the node and hands over the matching excerpt.",
    "The engineer writes the diagnosis and the exact commands to fix it, including daemon-reload where needed, then the pair swaps roles for the second packet.",
    "Pairs post their diagnoses on the whiteboard under the four cause columns from the Teach segment.",
    "The teacher reviews the answers and points out the specific journal line that reveals each cause."
   ]
  },
  "discussion": [
   "Why is the Ready Unknown versus Ready False distinction worth checking before you SSH to the node?",
   "What could cause a kubelet client certificate to expire even though rotation normally handles it?",
   "Why does the kubelet taint a node under DiskPressure instead of only evicting Pods?"
  ],
  "exit": [
   [
    "Which two commands do you run first on a NotReady node?",
    "systemctl status kubelet and journalctl -u kubelet."
   ],
   [
    "What must you run after editing a kubelet systemd drop-in file, before restarting the kubelet?",
    "systemctl daemon-reload."
   ],
   [
    "A node shows Ready False and the journal says it cannot connect to the containerd socket. What is the likely fix?",
    "Start or restart containerd (and check its journal), or correct the runtime endpoint if it points to the wrong socket."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart card that starts at kubectl describe node and branches on Unknown, False and pressure conditions to the next command to run.",
   "Extend: Ask fast finishers to explain how they would check whether the kubelet's CA matches the cluster CA, and what other control plane symptoms an expired certificate might cause."
  ]
 },
 {
  "t": "Control plane problems: static Pod manifests, crictl ps/logs when the API server is down, scheduler and controller-manager symptoms, etcd health with etcdctl",
  "objectives": [
   "Students will be able to locate the static Pod manifests for each control plane component on a kubeadm cluster.",
   "Students will be able to use crictl and the kubelet journal to diagnose a control plane component when the API server is unavailable.",
   "Students will be able to identify a failed scheduler or controller-manager from workload symptoms.",
   "Students will be able to check etcd health with etcdctl using the correct certificate flags."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers on the whiteboard in two columns: 'needs the API server' and 'does not'."
   ],
   [
    15,
    "Teach",
    "Show the four manifest files and explain how the kubelet watches the directory. Walk through `crictl ps -a`, `crictl logs` and `journalctl -u kubelet` on the projector, stressing the missing-container versus crashing-container distinction. Then present the quiet failures: scheduler symptoms, controller-manager symptoms, and the etcdctl health command."
   ],
   [
    15,
    "Activity",
    "Run the broken manifest diagnosis activity in pairs. Circulate and ask each pair which file they would open first and why."
   ],
   [
    5,
    "Discuss",
    "Ask two pairs to present their diagnosis and discuss the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "kubectl suddenly answers 'connection refused' for every command. Which tools on the control plane node could still tell you what is wrong, given that kubectl itself depends on the thing that is broken?",
  "activity": {
   "title": "Broken manifest diagnosis",
   "materials": "Printed scenario cards with excerpts of crictl ps -a output, crictl logs lines, kubelet journal lines and kubectl get pods output; a projector showing a correct kube-apiserver.yaml for reference; whiteboard.",
   "steps": [
    "Give each pair four scenario cards: an API server failing on a misspelled certificate path, a manifest with a YAML indentation error (no container exists), a controller-manager with a wrong kubeconfig path, and a stopped scheduler.",
    "For each card, pairs write which component is broken, which evidence proves it and the exact command they would run next.",
    "Pairs then write the one-line fix (which file, which field) on the card.",
    "Pairs swap cards with a neighbor and check each other's reasoning against the reference manifest on the projector.",
    "The teacher reveals the answer key and asks pairs to note any card where they reached for kubectl when it could not work."
   ]
  },
  "discussion": [
   "Why do you think kubeadm runs the control plane as static Pods instead of ordinary Deployments?",
   "How would your troubleshooting change if you had no backup of the manifest you just broke?"
  ],
  "exit": [
   [
    "Where are the control plane static Pod manifests on a kubeadm cluster, and what watches that directory?",
    "/etc/kubernetes/manifests, watched by the kubelet on the control plane node."
   ],
   [
    "crictl ps -a shows no kube-apiserver container at all. Where do you look next?",
    "The kubelet journal (`journalctl -u kubelet`), because the manifest probably could not be parsed."
   ],
   [
    "New Pods are Pending with no events. Which component is most likely down?",
    "The kube-scheduler."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart card that starts with 'Does kubectl work?' and branches to crictl and journalctl or to kubectl get pods -n kube-system, so students can follow it step by step.",
   "Extend: Ask fast finishers to write the etcdctl endpoint status command with all certificate flags from memory and explain what each column in the table output would tell them."
  ]
 },
 {
  "t": "Pending Pods: FailedScheduling messages for resources, taints, affinity and unbound PVCs",
  "objectives": [
   "Students will be able to interpret each phrase of a FailedScheduling event and map it to a cause.",
   "Students will be able to explain why scheduling uses resource requests rather than actual usage.",
   "Students will be able to choose the correct fix for taint, cordon, affinity, resource and PVC scheduling failures.",
   "Students will be able to distinguish a scheduling failure from a node-side startup failure for a Pending Pod."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers; note how many students assume 'idle node means room'."
   ],
   [
    15,
    "Teach",
    "Project a full FailedScheduling message and decode it phrase by phrase, adding up the counts. Cover requests versus usage with describe node output, then taints and cordons, node affinity, pod anti-affinity, and the two PVC messages. Finish with 'no events' and 'node assigned but still Pending'."
   ],
   [
    15,
    "Activity",
    "Run the FailedScheduling decoder card activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Discuss the discussion questions, using one group's hardest card as the example."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "A dashboard shows a worker node at 20 percent CPU, yet a new Pod requesting 1 CPU will not schedule there. How could both facts be true?",
  "activity": {
   "title": "FailedScheduling decoder",
   "materials": "Printed cards, each with a FailedScheduling message, a short node list with labels, taints and allocatable resources, and the relevant part of the Pod spec; sticky notes; whiteboard.",
   "steps": [
    "Give each group six message cards covering Insufficient memory, untolerated taint, unschedulable nodes, node selector mismatch, anti-affinity with too many replicas, and an unbound PVC.",
    "For each card, the group checks that the counts add up to the total nodes and writes on a sticky note which node group each phrase refers to.",
    "The group writes the single most appropriate fix and one fix that would be wrong or risky, with a reason.",
    "Groups post their sticky notes on the whiteboard under each card number.",
    "The teacher reviews the board, highlighting any group that removed a control plane taint unnecessarily."
   ]
  },
  "discussion": [
   "When would lowering a Pod's requests be the wrong fix for Insufficient memory?",
   "Why might Kubernetes refuse to schedule a Pod until its PVC is bound, rather than starting it and waiting?"
  ],
  "exit": [
   [
    "What does 'Insufficient cpu' compare against: live usage or requests?",
    "Requests, compared with each node's allocatable capacity minus requests already placed there."
   ],
   [
    "How do you remove a taint key=value:NoSchedule from node01?",
    "`kubectl taint node node01 key=value:NoSchedule-`."
   ],
   [
    "A Pending Pod has a node assigned. Is this a scheduling problem?",
    "No. Scheduling succeeded; look at node-side events such as image pulls, mounts or sandbox creation."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference sheet that maps each FailedScheduling phrase to its cause and the command that confirms it, and let them work through the first card with the teacher.",
   "Extend: Ask fast finishers to write a Pod spec that would produce a given FailedScheduling message on the sample node list, then swap with a partner to decode it."
  ]
 },
 {
  "t": "Resource monitoring: metrics-server, kubectl top nodes/pods --sort-by, describe node allocated resources",
  "objectives": [
   "Students will be able to explain the difference between actual usage and resource reservations on a node.",
   "Students will be able to use kubectl top with --sort-by, --containers, -A and -l to find specific consumers.",
   "Students will be able to read Capacity, Allocatable and Allocated resources in kubectl describe node output.",
   "Students will be able to verify that metrics-server and the metrics.k8s.io API are healthy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers in two columns labelled 'meter' and 'bookings'."
   ],
   [
    12,
    "Teach",
    "Explain metrics-server and the metrics.k8s.io API. Demonstrate kubectl top flags on the projector. Then show a describe node excerpt and walk through Capacity, Allocatable and Allocated resources, highlighting overcommitted limits."
   ],
   [
    18,
    "Activity",
    "Run the two-views detective activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Your phone plan says you have 10 GB of data, and your usage meter says you have used 2 GB. If the carrier only let you add a new line based on the plan rather than the meter, how would that be like Kubernetes scheduling?",
  "activity": {
   "title": "Two-views detective",
   "materials": "Printed handouts with paired excerpts of kubectl top nodes, kubectl top pods and kubectl describe node output for three nodes; a projector; pens.",
   "steps": [
    "Give each pair the handout and three questions: which node can accept a Pod requesting 500m CPU, which Pod is most likely to be OOMKilled, and which node is at risk of evictions.",
    "Pairs answer each question and circle the exact numbers in the output that justify the answer.",
    "Pairs write the one-line command (with awk if needed) that would write the top memory Pod's name to /opt/answers/top.txt for the given output, noting the column position with and without -A.",
    "Two pairs compare answers; disagreements are written on the whiteboard.",
    "The teacher resolves the whiteboard disagreements using the meter-versus-bookings distinction."
   ]
  },
  "discussion": [
   "Why do you think Kubernetes schedules on requests rather than on live usage?",
   "What risks come from letting limits overcommit a node, and when is that acceptable?"
  ],
  "exit": [
   [
    "Which command shows the Pods using the most memory across all namespaces, largest first?",
    "`kubectl top pods -A --sort-by=memory`."
   ],
   [
    "Which section of kubectl describe node does the scheduler effectively use?",
    "Allocated resources (requests compared against Allocatable)."
   ],
   [
    "kubectl top fails with 'Metrics API not available'. Name two things to check.",
    "The metrics-server Deployment and Pod health or logs, and `kubectl get apiservice v1beta1.metrics.k8s.io` availability."
   ]
  ],
  "differentiation": [
   "Support: Provide a labelled copy of describe node output with Capacity, Allocatable and Allocated resources highlighted in different colors before students start the handout.",
   "Extend: Ask fast finishers to explain how a container hitting its CPU limit behaves differently from one hitting its memory limit, and which tool output would reveal each."
  ]
 },
 {
  "t": "Container output streams: kubectl logs options, stdout/stderr vs log files, /var/log/pods and /var/log/containers, sidecar log streaming",
  "objectives": [
   "Students will be able to explain why kubectl logs shows only stdout and stderr.",
   "Students will be able to choose kubectl logs flags (-c, --previous, --tail, --since, -l, --all-containers) for a given task.",
   "Students will be able to describe the node log locations under /var/log/pods and /var/log/containers.",
   "Students will be able to write a Pod spec with a streaming sidecar that exposes a file-based log."
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
    "Draw the path from app stdout to runtime to node file to kubelet to kubectl. Demonstrate each kubectl logs flag on the projector, emphasizing --previous and -c. Show the directory layout under /var/log/pods and the symlinks in /var/log/containers."
   ],
   [
    18,
    "Activity",
    "Run the sidecar build activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "An app has crashed and restarted three times. You run kubectl logs and see only two lines of normal startup output. Where did the error message go?",
  "activity": {
   "title": "Make the hidden log visible",
   "materials": "Student laptops with a browser and a text editor (or paper), a projected Pod spec for a file-only logging app, printed kubectl logs flag cards.",
   "steps": [
    "Show a Pod spec for an app that writes to /var/log/app/app.log and a kubectl logs command that returns nothing.",
    "Pairs add an emptyDir volume, mount it in the app container, and write a busybox sidecar that tails the file with tail -F.",
    "Pairs write the kubectl logs command, with -c, that would show the app's file log.",
    "Using the flag cards, pairs write commands for three mini-tasks: last 20 lines from the crashed instance, all containers for label app=web in the last hour, and saving one container's logs to a file.",
    "Pairs swap specs with another pair and check volume names and mount paths match in both containers."
   ]
  },
  "discussion": [
   "What are the trade-offs of a sidecar per log file compared with one sidecar for all files?",
   "Why do you think Kubernetes standardizes on stdout and stderr instead of collecting arbitrary files?"
  ],
  "exit": [
   [
    "Which flag shows the logs of the last crashed instance of a container?",
    "`--previous` (or -p)."
   ],
   [
    "What must the app container and the sidecar share for the streaming pattern to work?",
    "A volume, such as an emptyDir, mounted at the log directory in both containers."
   ],
   [
    "Name the two node directories that hold container logs.",
    "/var/log/pods (the actual files) and /var/log/containers (symlinks to them)."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed sidecar YAML with blanks for the volume name, mountPath and tail command.",
   "Extend: Ask fast finishers to rewrite the sidecar as a native sidecar in initContainers with restartPolicy: Always and explain when that is preferable."
  ]
 },
 {
  "t": "Events: kubectl get events with field selectors and sorting",
  "objectives": [
   "Students will be able to describe the fields of an event: type, reason, message and involvedObject.",
   "Students will be able to sort events chronologically with --sort-by.",
   "Students will be able to filter events with field selectors, including combined and negated conditions.",
   "Students will be able to interpret a sequence of events to identify a likely cause."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss briefly."
   ],
   [
    12,
    "Teach",
    "Show raw kubectl get events output on the projector and point out the unordered rows. Explain each event field, the one-hour TTL, sorting with --sort-by, field selectors with commas and !=, and the kubectl events alternative."
   ],
   [
    18,
    "Activity",
    "Run the event timeline activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Discuss the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "If your inbox had five hundred unread messages and you needed to find out why a delivery failed this morning, what filters would you apply first?",
  "activity": {
   "title": "Event timeline reconstruction",
   "materials": "Printed event cards (one event per card, with type, reason, object, message and time), shuffled; whiteboard; sticky notes.",
   "steps": [
    "Give each group a shuffled deck of about fifteen event cards from one namespace, mixing Normal events with a hidden failure story such as liveness probe failures leading to restarts.",
    "Groups first write the kubectl command (field selector plus sort) that would show only the relevant cards, then physically remove the cards that command would filter out.",
    "Groups arrange the remaining cards in time order and write a one-sentence root cause on a sticky note.",
    "Each group posts its sticky note and command on the whiteboard.",
    "The teacher compares commands across groups, highlighting correct use of commas, != and the sort field."
   ]
  },
  "discussion": [
   "What are the benefits and costs of the API server deleting events after an hour?",
   "When would you prefer kubectl describe over kubectl get events, and the reverse?"
  ],
  "exit": [
   [
    "Write a command to list Warning events in namespace app, sorted by creation time.",
    "`kubectl get events -n app --field-selector type=Warning --sort-by=.metadata.creationTimestamp`."
   ],
   [
    "What does a comma between two field selector conditions mean?",
    "Both conditions must match (AND)."
   ],
   [
    "Unhealthy events followed by Killing events on the same container suggest what?",
    "A failing liveness probe caused the kubelet to restart the container."
   ]
  ],
  "differentiation": [
   "Support: Give students a template card with the command skeleton `kubectl get events -n ___ --field-selector ___ --sort-by=___` to fill in.",
   "Extend: Ask fast finishers to write the equivalent kubectl events command for each of their queries and note any filter that cannot be expressed the same way."
  ]
 },
 {
  "t": "Service and networking problems: selectors, readiness and EndpointSlices, kube-proxy, cross-node CNI traffic, sandbox network errors",
  "objectives": [
   "Students will be able to trace the hops of a request from a client Pod to a backend Pod through a Service.",
   "Students will be able to diagnose empty endpoints caused by selector mismatches or failing readiness probes.",
   "Students will be able to distinguish targetPort, kube-proxy and CNI faults from their symptoms.",
   "Students will be able to identify where to look when Pods fail with pod sandbox network errors."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers as boxes along a line on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw the full request path: DNS, Service, kube-proxy rules, EndpointSlice, Pod, CNI between nodes. For each hop, show one command on the projector and the symptom its failure produces. End with the decision table."
   ],
   [
    18,
    "Activity",
    "Run the broken hop role-play in groups of five."
   ],
   [
    5,
    "Discuss",
    "Discuss the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "You mail a package and it never arrives. List every stop it passes through. How would you find out which stop lost it?",
  "activity": {
   "title": "Broken hop role-play",
   "materials": "Printed role cards (Client Pod, Service, kube-proxy, EndpointSlice, Backend Pod, CNI), printed fault cards known only to the teacher, a ball of paper as the 'packet', whiteboard.",
   "steps": [
    "Each group assigns students to roles and stands in a line representing the request path; extra students act as troubleshooters.",
    "The teacher secretly hands one role a fault card, for example 'selector typo: endpoint list is empty' or 'kube-proxy crashed on node 2'.",
    "Troubleshooters may ask any role one question per turn that maps to a real command (for example 'show me your endpoints' or 'show me your selector'), and the role answers from its card.",
    "The packet is passed along until it stops; troubleshooters name the broken hop, the evidence and the fix.",
    "Rotate roles and fault cards for two or three rounds, then record the symptom-to-hop findings on the whiteboard."
   ]
  },
  "discussion": [
   "Why might Kubernetes choose to withhold traffic from unready Pods rather than send it and let clients retry?",
   "How does the pattern of which clients fail help you narrow down the broken hop?"
  ],
  "exit": [
   [
    "A Service has no endpoints. Name the two most likely causes.",
    "The Service selector does not match the Pod labels, or the matching Pods are not ready."
   ],
   [
    "Endpoints exist but connections are refused. What do you check?",
    "That targetPort matches the port the container listens on, and that the application is listening."
   ],
   [
    "Pods stuck in ContainerCreating with 'Failed to create pod sandbox'. Which component is at fault?",
    "The CNI plugin on that node."
   ]
  ],
  "differentiation": [
   "Support: Give students the decision table as a printed card and have them match three short symptom descriptions to rows before the role-play.",
   "Extend: Ask fast finishers to design a fault card that produces a misleading symptom, such as a NetworkPolicy blocking traffic, and explain how they would tell it apart from a CNI failure."
  ]
 },
 {
  "t": "DNS problems: CoreDNS Pods and logs, loop detection with systemd-resolved, testing with a temporary Pod",
  "objectives": [
   "Students will be able to test cluster DNS from a temporary Pod and interpret nslookup and resolv.conf output.",
   "Students will be able to check CoreDNS Pods, logs, Service endpoints and ConfigMap.",
   "Students will be able to explain the systemd-resolved forwarding loop and apply the kubelet resolvConf fix.",
   "Students will be able to identify NetworkPolicy and dnsPolicy causes of DNS failures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers."
   ],
   [
    15,
    "Teach",
    "Demonstrate the temporary Pod test and walk through a correct resolv.conf. Show the CoreDNS inspection commands and a sample Corefile. Draw the loop on the whiteboard: node resolv.conf to kubelet to CoreDNS to 127.0.0.53 back to CoreDNS. Then cover the fix and the NetworkPolicy and dnsPolicy checks."
   ],
   [
    15,
    "Activity",
    "Run the DNS checklist triage activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Your phone can call numbers you dial directly, but searching contacts by name returns nothing. What could be broken, and how would you test each possibility?",
  "activity": {
   "title": "DNS checklist triage",
   "materials": "Printed evidence packets for four scenarios (nslookup output, resolv.conf, CoreDNS logs, kubectl get pods and endpoints output, a NetworkPolicy excerpt, a kubelet config excerpt); whiteboard.",
   "steps": [
    "Give each pair four evidence packets: a CoreDNS loop caused by resolvConf, a Corefile typo in forward, an egress NetworkPolicy missing port 53, and a hostNetwork Pod without ClusterFirstWithHostNet.",
    "Pairs write the order in which they would check the evidence, starting from the temporary Pod test.",
    "For each packet, pairs identify the root cause and write the exact fix, including the file or field to change.",
    "Pairs check whether their fix would also require a kubelet or CoreDNS restart and note it.",
    "Pairs present one scenario each to the class and the teacher confirms or corrects."
   ]
  },
  "discussion": [
   "Why is disabling the loop plugin a poor fix even though it stops the crashes?",
   "How does testing from a temporary Pod in different namespaces help you separate CoreDNS problems from policy problems?"
  ],
  "exit": [
   [
    "What command tests cluster DNS from a throwaway Pod?",
    "`kubectl run dns --rm -it --restart=Never --image=busybox -- nslookup kubernetes.default`."
   ],
   [
    "CoreDNS logs 'Loop detected'. Which kubelet setting do you check and what should it usually point to on systemd-resolved hosts?",
    "resolvConf in /var/lib/kubelet/config.yaml; it should usually point to /run/systemd/resolve/resolv.conf."
   ],
   [
    "What must an egress NetworkPolicy allow for DNS to work?",
    "UDP and TCP port 53 to the CoreDNS Pods."
   ]
  ],
  "differentiation": [
   "Support: Provide a numbered DNS checklist card (temp Pod test, CoreDNS Pods, endpoints, logs and Corefile, NetworkPolicy, dnsPolicy) for students to follow in order.",
   "Extend: Ask fast finishers to explain how ndots:5 affects lookups of external names and why that can generate extra queries."
  ]
 },
 {
  "t": "Cluster access problems: kubeconfig contexts, expired certificates, connection refused on 6443",
  "objectives": [
   "Students will be able to explain the structure of a kubeconfig and switch, inspect and modify contexts.",
   "Students will be able to map connection refused, x509, Unauthorized and Forbidden errors to the layer that failed.",
   "Students will be able to renew expired kubeadm certificates and restore admin access.",
   "Students will be able to choose the right next command for each access error."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers."
   ],
   [
    12,
    "Teach",
    "Project a sample kubeconfig and label clusters, users, contexts and current-context. Demonstrate the kubectl config commands. Then present each error message with the layer it points to, and walk through the kubeadm certificate renewal sequence."
   ],
   [
    18,
    "Activity",
    "Run the error message triage card sort in groups of three."
   ],
   [
    5,
    "Discuss",
    "Discuss the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "You arrive at your office and cannot get in. List every different reason that could happen, from the building being closed to your badge not opening a particular floor.",
  "activity": {
   "title": "Access error triage",
   "materials": "Printed error message cards (connection refused, timeout, x509 expired, x509 unknown authority, Unauthorized, Forbidden), printed 'layer' header cards, printed command cards, a projector with a sample kubeconfig.",
   "steps": [
    "Lay out layer header cards: network or address, API server process, certificates, authentication, authorization.",
    "Groups place each error message card under the layer it indicates.",
    "Groups then match a command card to each error, such as `kubectl config view --minify`, `ss -tlnp | grep 6443`, `kubeadm certs check-expiration`, `kubectl auth can-i`.",
    "Groups write the full renewal sequence for an expired kubeadm cluster in order on the whiteboard.",
    "The teacher reveals the answer key and discusses any card placed under the wrong layer."
   ]
  },
  "discussion": [
   "Why do you think kubeadm uses one-year certificates by default instead of much longer ones?",
   "What habits would prevent you from accidentally working on the wrong cluster in a real job?"
  ],
  "exit": [
   [
    "What does 'connection refused' on port 6443 tell you?",
    "Nothing is listening at that address: the API server is down or the kubeconfig points to the wrong host or port."
   ],
   [
    "After kubeadm certs renew all, what two further steps restore access?",
    "Restart the control plane static Pods and copy the renewed /etc/kubernetes/admin.conf to ~/.kube/config."
   ],
   [
    "A user gets Forbidden. Where do you look?",
    "RBAC roles and bindings, testing with kubectl auth can-i."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column reference card listing each error message and its layer, and have them use it during the card sort.",
   "Extend: Ask fast finishers to explain how merging two files in KUBECONFIG works and what happens when both define a context with the same name."
  ]
 },
 {
  "t": "Output handling for tasks: -o jsonpath, custom-columns, --sort-by, writing answers to files",
  "objectives": [
   "Students will be able to write jsonpath expressions, including range and filters, to extract fields from kubectl output.",
   "Students will be able to produce custom-columns tables with and without headers.",
   "Students will be able to sort output with --sort-by and select the first or last item.",
   "Students will be able to write exact answers to files and verify them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up output on the projector and ask the question."
   ],
   [
    12,
    "Teach",
    "Open a node's -o json on the projector and trace field paths with a pointer. Build three jsonpath commands live: all names on one line, range with newlines, and an InternalIP filter. Then show custom-columns, --sort-by with tail -1, -o name, quoting rules and kubectl explain --recursive."
   ],
   [
    18,
    "Activity",
    "Run the answer file challenge in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Here is the output of kubectl get pods -o wide. If a grader wants only the Pod names, one per line, what would you have to delete by hand, and what could go wrong?",
  "activity": {
   "title": "Answer file challenge",
   "materials": "Printed JSON excerpts of a PodList and a NodeList, printed task cards each stating an exact required output format, student laptops with a browser-based JSONPath tester or paper, whiteboard.",
   "steps": [
    "Give each pair the JSON excerpts and six task cards, such as 'Pod names space-separated', 'node name and InternalIP one per line', 'Pod namespace, name and node as a table without headers', and 'the most recently created Pod'.",
    "Pairs write the full kubectl command for each card, including the redirect to a file.",
    "Pairs predict the exact file contents for each command by reading the JSON excerpt, writing them under the command.",
    "Pairs swap with another pair, who check quoting, ascending sort order and whether the output format matches the card exactly.",
    "The teacher reviews the most common errors on the whiteboard."
   ]
  },
  "discussion": [
   "When is custom-columns a better choice than jsonpath, and when is jsonpath better?",
   "Why might an automated grader reject an answer that a human would accept?"
  ],
  "exit": [
   [
    "Write a jsonpath that prints every node name on its own line.",
    "`kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{\"\\n\"}{end}'`."
   ],
   [
    "--sort-by sorts in which direction, and how do you get the largest item?",
    "Ascending; pipe to tail -1 (or select the last item)."
   ],
   [
    "Why single-quote jsonpath expressions?",
    "So the shell does not interpret braces, brackets, asterisks or double quotes inside the expression."
   ]
  ],
  "differentiation": [
   "Support: Provide a jsonpath cheat card with the four patterns from the lesson and have students adapt them rather than write from scratch.",
   "Extend: Ask fast finishers to print each Pod's name followed by the names of all its containers on the same line using nested range."
  ]
 },
 {
  "t": "Stuck Terminating Pods on lost nodes and force deletion",
  "objectives": [
   "Students will be able to describe the normal Pod deletion sequence and why it stalls on a lost node.",
   "Students will be able to compare how Deployments and StatefulSets react to a lost node.",
   "Students will be able to decide when force deletion is safe and execute it correctly.",
   "Students will be able to apply the out-of-service taint and recognize finalizer-blocked deletions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers."
   ],
   [
    12,
    "Teach",
    "Draw the deletion handshake on the whiteboard: API server sets deletion timestamp, kubelet sends SIGTERM then SIGKILL, kubelet confirms, object removed. Cut the line to the kubelet and ask what happens. Contrast Deployments (unreachable taint, 300 seconds, replacement) with StatefulSets (at most one per identity). Show force deletion, the warning, the out-of-service taint and finalizers."
   ],
   [
    18,
    "Activity",
    "Run the force delete decision panel role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Discuss the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A coworker stops answering messages in the middle of editing a shared document. Would you let someone else start editing the same section right away? What would you want to know first?",
  "activity": {
   "title": "Force delete decision panel",
   "materials": "Printed scenario cards with node status, Pod status, controller type and a short note from the hardware team; role cards (on-call engineer, database owner, hardware contact, reviewer); whiteboard.",
   "steps": [
    "Give each group four scenarios: a powered-off node with a Deployment Pod, a powered-off node with a StatefulSet Pod, a node that answers ping but has a dead kubelet, and a Pod with an unremoved finalizer on a healthy node.",
    "For each scenario, the on-call engineer proposes an action, the database owner states the data risk and the hardware contact supplies the information on the card.",
    "The reviewer decides between waiting, force deletion, deleting the Node object, applying the out-of-service taint, or investigating a finalizer, and writes the exact command.",
    "Groups record their decisions on the whiteboard in a table of scenario, action and reason.",
    "The teacher compares tables and highlights the scenario where force deletion would be unsafe."
   ]
  },
  "discussion": [
   "Why is it acceptable for a Deployment to briefly run an extra copy when a StatefulSet must not?",
   "What evidence would you want before force-deleting a database Pod in production?"
  ],
  "exit": [
   [
    "Why does a StatefulSet Pod on a lost node not get replaced automatically?",
    "The StatefulSet guarantees at most one Pod per identity and waits until the old Pod object is gone, which cannot happen without kubelet confirmation."
   ],
   [
    "Write the command to force-delete Pod db-1.",
    "`kubectl delete pod db-1 --grace-period=0 --force`."
   ],
   [
    "What does the node.kubernetes.io/out-of-service taint do?",
    "It marks a shut-down node as out of service so its Pods are force-deleted and volumes detached, letting them move to healthy nodes."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision flowchart starting with 'Is the node confirmed powered off?' to use during the role-play.",
   "Extend: Ask fast finishers to explain what could go wrong if the out-of-service taint is applied to a node that is actually still running its workloads."
  ]
 }
]);
