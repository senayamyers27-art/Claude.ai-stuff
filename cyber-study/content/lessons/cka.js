/* Lessons for Certified Kubernetes Administrator (CKA (Kubernetes v1.35 curriculum)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("cka", [
 {
  "t": "Control plane and node components: kube-apiserver, etcd, kube-scheduler, kube-controller-manager, kubelet, kube-proxy, container runtime",
  "hook": "It is 2 a.m. and Maya, the on-call platform engineer at Harbor Credit Union, gets paged: the mobile banking team pushed a release, scaled their Deployment from two replicas to six, and nothing happened. The old Pods are still serving traffic, so customers are fine for now, but the new Pods never appeared. Maya opens her laptop and types `kubectl get deploy`. The command works, so the API server is up. The Deployment says six desired, two ready. Somewhere between \"I want six\" and \"six are running\" a piece of the cluster has stopped doing its job. Which piece? Maya has a few minutes to decide where to look first, and guessing wrong means digging through the wrong logs while the release window closes.",
  "simple": "A Kubernetes cluster is a group of computers that run your apps in containers. Think of it as a restaurant. The control plane is the front office: it takes orders, writes them down and decides which cook handles each one. The worker nodes are the kitchen stations where the food is actually made. The API server is the order desk that everyone must go through. etcd is the order book where everything is written down. The scheduler decides which station gets each new order. The controller manager keeps checking that what was ordered matches what was served and fixes any gap. On each station, the kubelet is the station chef who follows the orders, the container runtime is the stove that does the cooking, and kube-proxy makes sure customers' requests reach the right station.",
  "body": [
   "A Kubernetes cluster is split into two roles. The control plane stores the desired state of everything in the cluster and makes decisions about it. The worker nodes actually run your containers. Almost every Certified Kubernetes Administrator (CKA) troubleshooting task comes down to knowing which component owns which job, so it is worth learning this map before anything else. When something breaks, the symptom almost always points at one specific component, and knowing the map tells you where to look.",
   "The kube-apiserver is the front door. Every client, from `kubectl` to the scheduler to the kubelet on each node, talks to the cluster only through the API server over HTTPS (on a kubeadm cluster, port 6443). For each request the API server authenticates the caller, checks authorization (usually RBAC, role-based access control), runs admission controllers that can reject or modify the request, validates the object and then persists it. It is the only component that talks to etcd directly. If the API server is down, `kubectl` fails with a message such as \"The connection to the server ... was refused\", and no component can read or change cluster state, although containers that are already running keep running.",
   "etcd is a distributed, strongly consistent key-value store that holds all cluster state: every Pod, Service, Secret and ConfigMap, plus nodes, roles and bindings. Nothing about the cluster's configuration lives anywhere else. If etcd is lost and you have no backup, the cluster's configuration is gone even if the containers keep running for a while. That is why etcd backup is its own exam objective. etcd serves clients on port 2379 and talks to its peers on 2380. On a kubeadm cluster it uses its own certificate authority under `/etc/kubernetes/pki/etcd`, and the API server connects to it as a client with mutual TLS (Transport Layer Security).",
   "The kube-scheduler watches for Pods that have no node assigned. For each one it filters out nodes that cannot run it (not enough CPU or memory to satisfy requests, a taint the Pod does not tolerate, a node selector or affinity rule that does not match) and then scores the remaining nodes, finally writing the chosen node name into the Pod's `spec.nodeName` through a binding. The scheduler does not start containers; it only makes the placement decision. When it cannot find a suitable node, the Pod stays Pending and `kubectl describe pod` shows a FailedScheduling event explaining why. When the scheduler itself is down, Pods stay Pending with no scheduling events at all, which is the telltale difference.",
   "The kube-controller-manager runs many control loops in one process: the ReplicaSet controller, Deployment controller, Node controller, Job controller, EndpointSlice controller, ServiceAccount controller and others. Each loop watches objects through the API server, compares desired state with actual state and acts to close the gap. The Deployment controller creates and updates ReplicaSets; the ReplicaSet controller creates Pod objects until the count matches. If this component is down, new Pods are not created for Deployments, scaling does nothing and dead nodes are not noticed, but existing Pods keep running. That is exactly the symptom in Maya's page: the desired count changed, yet no new Pod objects appeared.",
   "On every node, the kubelet is the agent that makes the node's share of desired state real. It watches the API server for Pods bound to its node, asks the container runtime to pull images and start containers, mounts volumes, runs liveness, readiness and startup probes, and reports Pod and node status back. It also sends heartbeats; if they stop, the Node controller eventually marks the node NotReady. The kubelet is a systemd service, not a Pod, so you inspect it with `systemctl status kubelet` and `journalctl -u kubelet`. The container runtime (containerd or CRI-O) does the low-level work of pulling images and creating containers, and the kubelet talks to it over the Container Runtime Interface (CRI). On the node you can query the runtime directly with `crictl ps` and `crictl logs`, which is invaluable when the API server is unreachable.",
   "kube-proxy runs on each node, usually as a DaemonSet, and programs packet-forwarding rules (iptables or IPVS, IP Virtual Server, depending on its mode) so that traffic sent to a Service's virtual IP reaches one of the Service's backing Pods. It does not carry the traffic itself; the kernel does, using the rules kube-proxy writes. Some CNI (Container Network Interface) plugins can replace kube-proxy entirely, but on a typical kubeadm cluster you will see `kube-proxy-xxxxx` Pods, one per node.",
   "Finally, notice where each piece runs. On a kubeadm cluster, the API server, etcd, scheduler and controller-manager run as static Pods defined by files in `/etc/kubernetes/manifests` on the control plane node, and they appear in the `kube-system` namespace with the node name as a suffix, for example `kube-scheduler-cp1`. You can list them with `kubectl get pods -n kube-system`. The kubelet and the container runtime are host services and never appear in that list. Keeping this split in mind tells you which tool to reach for: kubectl for anything that runs as a Pod, systemctl, journalctl and crictl for what runs on the host."
  ],
  "analogy": "The cluster works like an air traffic system. The API server is the control tower radio: every pilot and ground crew talks only through it. etcd is the official flight log. The scheduler assigns each departing plane to a runway, the controller manager keeps checking that the schedule matches reality, and the kubelet is the crew on each runway doing the work. The analogy stops at one point the exam cares about: in Kubernetes, planes already in the air (running containers) keep flying even if the tower goes silent.",
  "terms": [
   [
    "kube-apiserver",
    "The central REST API for the cluster; the only component that reads and writes etcd, and the one every other component talks to."
   ],
   [
    "etcd",
    "A consistent, distributed key-value store holding all cluster state, serving clients on port 2379 and peers on 2380."
   ],
   [
    "kube-scheduler",
    "Assigns unscheduled Pods to nodes by filtering and scoring candidate nodes, then binding the Pod to the winner."
   ],
   [
    "kube-controller-manager",
    "A single binary running many reconciliation loops such as the ReplicaSet, Deployment, Node and Job controllers."
   ],
   [
    "kubelet",
    "The node agent, run by systemd, that starts Pods via the container runtime, runs probes and reports status."
   ],
   [
    "kube-proxy",
    "The per-node component that programs Service virtual IP forwarding rules, usually deployed as a DaemonSet."
   ],
   [
    "Container runtime",
    "Software such as containerd or CRI-O that pulls images and runs containers, driven by the kubelet over the CRI."
   ]
  ],
  "example": "A learner scales a Deployment from 2 to 5 replicas and nothing happens: the ReplicaSet still shows 2. `kubectl get pods -n kube-system` shows the kube-controller-manager Pod in CrashLoopBackOff because of a typo in its static Pod manifest. Fixing the manifest in /etc/kubernetes/manifests brings the controller back and the three new Pods appear within seconds.",
  "mistakes": [
   [
    "The scheduler starts the containers on the chosen node.",
    "The scheduler only writes the node name into the Pod. The kubelet on that node then asks the container runtime to start the containers."
   ],
   [
    "The kubelet should appear in `kubectl get pods -n kube-system` like the other components.",
    "The kubelet is a systemd service on every node. Check it with `systemctl status kubelet` and `journalctl -u kubelet`, not kubectl."
   ],
   [
    "If the control plane goes down, every application in the cluster stops.",
    "Running containers keep running because the kubelet and runtime keep them alive. What stops is change: no scheduling, no scaling, no self-healing, no kubectl."
   ],
   [
    "kube-proxy is a proxy that every Service packet passes through.",
    "In its usual modes kube-proxy only programs kernel rules such as iptables; the kernel forwards the packets."
   ]
  ],
  "tryit": [
   [
    "You create a new Pod and it sits in Pending. `kubectl describe pod` shows no events at all, not even a FailedScheduling message. Other Pods created yesterday are running normally, and `kubectl get nodes` shows every node Ready. Which component do you check first?",
    "The kube-scheduler. A Pod with no node and no scheduling events means nothing is even attempting placement. Check `kubectl get pods -n kube-system` for the kube-scheduler Pod and, if it is crashing, inspect its manifest in /etc/kubernetes/manifests. A FailedScheduling event would instead mean the scheduler is working but found no suitable node."
   ],
   [
    "One worker, node02, shows NotReady while the others are fine. Pods on node02 are being marked for replacement after a while. You can still use kubectl normally. Where do you look?",
    "On node02 itself: SSH in and check `systemctl status kubelet` and `journalctl -u kubelet`, then the container runtime with `systemctl status containerd` and `crictl ps`. A single NotReady node points to that node's kubelet or runtime, not the control plane."
   ]
  ],
  "tip": "Match the symptom to the component: Pods stuck Pending with no events points to the scheduler; replicas not being created points to the controller-manager; kubectl refused on 6443 points to the API server; a single node NotReady points to its kubelet or runtime.",
  "check": [
   [
    "Which component is the only one that talks directly to etcd?",
    "The kube-apiserver. All other components read and write cluster state through the API server."
   ],
   [
    "Why can't you see the kubelet with `kubectl get pods -n kube-system`?",
    "The kubelet runs as a systemd service on the host, not as a Pod, so you check it with systemctl and journalctl."
   ],
   [
    "If the scheduler is stopped, what happens to a newly created Deployment's Pods?",
    "The ReplicaSet controller still creates the Pod objects, but they stay Pending because nothing assigns them a node."
   ],
   [
    "What does kube-proxy actually do for a Service?",
    "It programs forwarding rules on each node so traffic to the Service's virtual IP is sent to one of the backing Pods."
   ]
  ]
 },
 {
  "t": "Preparing hosts for kubeadm: containerd, matching systemd cgroup driver, swap, overlay and br_netfilter modules, ip_forward and bridge sysctls, required ports",
  "hook": "Devon has three fresh Linux virtual machines and a ticket from the lab manager at Pinecrest Community College: \"Stand up a Kubernetes cluster for the networking course by Friday.\" He installs kubeadm, types `kubeadm init`, and the screen fills with red: preflight errors about `ip_forward`, a container runtime that is not responding, and a warning about swap. He fixes the first one and tries again, and a different error appears. Even when init finally succeeds on a second try, Pods on the new node keep restarting for no obvious reason. kubeadm is supposed to make this easy. What did Devon skip before he ever typed `init`?",
  "simple": "Before a computer can join a Kubernetes cluster, it needs some setup, much like a new kitchen needs gas, water and electricity connected before the chefs arrive. First it needs a container runtime, the program that actually runs containers; containerd is the usual choice. The runtime and Kubernetes' node agent (the kubelet) must agree on how to divide up the computer's CPU and memory, so both are told to use the same method, called the systemd cgroup driver. Swap, which is using disk as extra memory, is normally turned off. Two kernel add-ons are switched on so container networking works, and the computer is told it may pass network traffic between its connections. Finally, certain network ports must be open so the machines can talk to each other.",
  "body": [
   "kubeadm bootstraps a cluster, but it assumes each host is already prepared: a container runtime installed, the kernel configured for container networking, and the kubelet able to manage resources. Its preflight checks run before `kubeadm init` and `kubeadm join` and will stop you if some of these are wrong, printing lines that begin with `[ERROR ...]`. The Certified Kubernetes Administrator (CKA) exam can ask you to fix a host that fails them, so it pays to know each requirement and why it exists rather than memorizing a script.",
   "Start with the container runtime. containerd is the most common choice. Install it, generate a default config with `containerd config default > /etc/containerd/config.toml`, and make sure the runc runtime options set `SystemdCgroup = true`. Control groups (cgroups) are the Linux feature that limits and accounts for CPU and memory per process, and a cgroup driver is the method used to create and manage them. On systemd-based distributions the kubelet uses the `systemd` cgroup driver by default when configured by kubeadm, and the runtime must use the same driver. If the kubelet and the runtime disagree, two managers are fighting over the same resource tree: Pods and even the node can become unstable, with containers restarting and kubelet log messages about cgroups. Restart containerd after editing the file with `systemctl restart containerd`, and enable it so it starts at boot.",
   "Next, swap. Historically the kubelet refused to start with swap enabled, because swapping makes memory limits and eviction decisions unpredictable. The standard preparation step is still to disable it: `swapoff -a` for the running system, and comment out swap lines in `/etc/fstab` so it stays off after a reboot. Forgetting the second step is a classic trap: everything works until the node restarts, and then the kubelet fails. Newer Kubernetes releases have added configurable swap support, but unless a task tells you otherwise, disabling swap is the safe expectation.",
   "Container networking needs two kernel modules. `overlay` supports the overlay filesystem that container images use, stacking read-only image layers under a writable container layer. `br_netfilter` makes traffic crossing a Linux bridge visible to iptables, which matters because many CNI (Container Network Interface) plugins connect Pods through a bridge and kube-proxy's Service rules live in iptables. Load the modules now with `modprobe` and persist them in a file under `/etc/modules-load.d/` so they load at boot. Then set sysctls so the kernel forwards packets between interfaces and passes bridged traffic through iptables. Persist these in a file under `/etc/sysctl.d/` and apply them with `sysctl --system`.",
   "```bash\ncat <<EOF | sudo tee /etc/modules-load.d/k8s.conf\noverlay\nbr_netfilter\nEOF\nsudo modprobe overlay && sudo modprobe br_netfilter\ncat <<EOF | sudo tee /etc/sysctl.d/k8s.conf\nnet.ipv4.ip_forward = 1\nnet.bridge.bridge-nf-call-iptables = 1\nnet.bridge.bridge-nf-call-ip6tables = 1\nEOF\nsudo sysctl --system\n```",
   "You can verify each step quickly. `lsmod | grep -e overlay -e br_netfilter` shows the loaded modules. `sysctl net.ipv4.ip_forward` should print `= 1`. `swapon --show` should print nothing. `grep SystemdCgroup /etc/containerd/config.toml` should show `true`. Note that the bridge sysctls only exist once `br_netfilter` is loaded, which is why the module step comes first; if `sysctl --system` complains that a `net.bridge` key is unknown, the module is missing.",
   "Finally, ports. Control plane nodes need 6443 (API server), 2379 and 2380 (etcd client and peer), 10250 (kubelet API), 10257 (controller-manager) and 10259 (scheduler) reachable as appropriate. Worker nodes need 10250 plus the NodePort range, 30000 to 32767 by default. Your CNI plugin may need its own ports as well, so check its documentation. If a host firewall is running, these are the ports to open; a blocked 6443 typically shows up as a join that times out while trying to reach the API server.",
   "The last step is installing the Kubernetes tools themselves. Install kubeadm, kubelet and kubectl at matching versions from the Kubernetes package repository and hold them so routine updates do not upgrade them by surprise, for example `apt-mark hold kubelet kubeadm kubectl` on Debian or Ubuntu. Enable the kubelet service. Do not worry that the kubelet restarts in a loop at this point: it is waiting for kubeadm to give it a configuration, and it settles once `init` or `join` runs. On the exam, if a host fails preflight, read each `[ERROR]` line literally: it names the exact file, module or port that is wrong, and fixing exactly that is usually all the task wants. Resist the urge to pass `--ignore-preflight-errors` unless the task explicitly allows it, because it hides real problems rather than solving them."
  ],
  "analogy": "Preparing a host is like getting a rental truck ready for a long move. You check the fuel (container runtime), make sure the truck and trailer use the same hitch (matching cgroup driver), remove the spare junk from the cab (swap off), connect the trailer lights so signals pass through (br_netfilter and forwarding), and confirm the route has open roads (ports). The analogy breaks in one place: a mismatched hitch would fail at once, but a mismatched cgroup driver often looks fine at first and causes trouble later.",
  "terms": [
   [
    "cgroup driver",
    "How the kubelet and runtime create control groups; both must use the same one, normally systemd."
   ],
   [
    "SystemdCgroup",
    "The containerd runc option that makes containerd use the systemd cgroup driver."
   ],
   [
    "br_netfilter",
    "A kernel module that lets iptables see traffic crossing a Linux bridge."
   ],
   [
    "overlay",
    "A kernel module providing the layered filesystem that container images use."
   ],
   [
    "net.ipv4.ip_forward",
    "The sysctl that allows the kernel to route packets between interfaces, required for Pod traffic."
   ],
   [
    "Preflight checks",
    "Tests kubeadm runs before init or join to catch host misconfiguration."
   ]
  ],
  "example": "`kubeadm init` fails preflight with a message that `/proc/sys/net/ipv4/ip_forward` contents are not set to 1. You add `net.ipv4.ip_forward = 1` to `/etc/sysctl.d/k8s.conf`, run `sysctl --system`, and rerun init, which now passes.",
  "mistakes": [
   [
    "Running `swapoff -a` is enough to disable swap for good.",
    "It only affects the running system. You must also comment out swap entries in /etc/fstab, or swap returns after a reboot."
   ],
   [
    "Setting sysctls with `sysctl -w` makes them permanent.",
    "`sysctl -w` changes only the running kernel. Persist settings in a file under /etc/sysctl.d/ and apply with `sysctl --system`."
   ],
   [
    "A cgroup driver mismatch will always make kubeadm init fail.",
    "It often does not. The install can succeed and the problem appears later as restarting Pods or kubelet errors, so check SystemdCgroup proactively."
   ],
   [
    "Workers need the same ports open as control plane nodes.",
    "Workers mainly need 10250 for the kubelet and the NodePort range 30000 to 32767; ports such as 2379, 2380, 10257 and 10259 belong to control plane components."
   ]
  ],
  "tryit": [
   [
    "A colleague prepared a node, and `kubeadm join` succeeded yesterday. After a scheduled reboot overnight, the node is NotReady and `journalctl -u kubelet` mentions swap. `swapon --show` lists a swap file. What happened and how do you fix it permanently?",
    "Swap was disabled with `swapoff -a` but not removed from /etc/fstab, so it came back at boot. Run `swapoff -a`, comment out the swap line in /etc/fstab, and restart the kubelet. The node should return to Ready."
   ],
   [
    "You run `sysctl --system` and see an error that `net.bridge.bridge-nf-call-iptables` is an unknown key. The ip_forward line applied fine. What is missing?",
    "The br_netfilter module is not loaded, and the net.bridge keys only exist once it is. Run `modprobe br_netfilter`, make sure it is listed in a file under /etc/modules-load.d/, and run `sysctl --system` again."
   ]
  ],
  "tip": "A cgroup driver mismatch does not always stop the install; it shows up later as flapping Pods or kubelet errors. Check `SystemdCgroup = true` in the containerd config and restart containerd whenever you touch it.",
  "check": [
   [
    "Which two kernel modules are loaded when preparing a kubeadm host, and why?",
    "overlay for the container image filesystem and br_netfilter so bridged Pod traffic passes through iptables."
   ],
   [
    "Where do you persist sysctl settings so they survive a reboot?",
    "In a file under /etc/sysctl.d/, applied with `sysctl --system`."
   ],
   [
    "What is the default NodePort range that must be open on nodes?",
    "30000 to 32767."
   ],
   [
    "Why must the kubelet and containerd use the same cgroup driver?",
    "Otherwise two managers handle the same cgroup tree differently, which leads to unstable Pods and nodes."
   ]
  ]
 },
 {
  "t": "Kubeadm init (pod network CIDR, control-plane endpoint), installing a CNI plugin, kubeadm join and bootstrap tokens",
  "hook": "Priya at Lakeside Logistics finally gets `kubeadm init` to finish on the first control plane node. She copies the admin kubeconfig, runs `kubectl get nodes`, and her stomach drops: the node says NotReady. The CoreDNS Pods sit in Pending. Did the install fail? She is tempted to run `kubeadm reset` and start over. Meanwhile, the worker nodes are waiting, and the join command she saved in a text file last week now fails with an authentication error. Two problems, both looking like disasters. Are either of them actually broken, or is the cluster just waiting for Priya to finish the job?",
  "simple": "Building a cluster with kubeadm happens in three moves. First, `kubeadm init` turns one machine into the cluster's brain, the control plane. You tell it which range of addresses your apps will use and, if you plan to add more brains later, a single shared address for reaching them. Second, you install a network add-on, called a CNI plugin, which is what lets apps on different machines talk to each other. Until it is installed, the cluster reports itself as not ready, which is normal. Third, other machines join with `kubeadm join`, using a temporary password called a bootstrap token, a bit like a visitor pass that expires after a day, plus a fingerprint that proves they are joining the real cluster.",
  "body": [
   "Once hosts are prepared, `kubeadm init` turns the first machine into a control plane node. It runs preflight checks, generates a certificate authority (CA) and the certificates every component needs, writes kubeconfig files to `/etc/kubernetes`, creates static Pod manifests for the API server, etcd, scheduler and controller-manager, starts them through the kubelet, and installs the CoreDNS and kube-proxy add-ons. At the end it prints two things you should save: the commands to set up your own kubeconfig, and a `kubeadm join` command for adding nodes.",
   "Two flags matter most. `--pod-network-cidr` tells the cluster which address range Pods will use. CIDR stands for Classless Inter-Domain Routing, the address/prefix notation such as `10.244.0.0/16`. The Pod range must match what your CNI plugin is configured to use and must not overlap your node network or the Service network (which kubeadm sets with `--service-cidr`, defaulting to `10.96.0.0/12`). For example, Flannel's default manifest expects `10.244.0.0/16`. If the ranges overlap, Pods may get addresses that collide with real hosts, and routing breaks in confusing ways.",
   "`--control-plane-endpoint` sets a stable DNS name or IP for the API server, usually a load balancer address or a DNS name you control. You must set it at init time if you ever want to add more control plane nodes, because it is baked into the API server certificate and into every kubeconfig file kubeadm writes. Changing it later means regenerating certificates and kubeconfigs, which is painful. Using a DNS name, even on a single-node lab, keeps that door open.",
   "```bash\nsudo kubeadm init --pod-network-cidr=10.244.0.0/16 \\\n  --control-plane-endpoint=k8s-api.lab.local:6443\nmkdir -p $HOME/.kube\nsudo cp /etc/kubernetes/admin.conf $HOME/.kube/config\nsudo chown $(id -u):$(id -g) $HOME/.kube/config\n```",
   "After init, `kubectl get nodes` shows the node as NotReady and the CoreDNS Pods stay Pending. That is expected: there is no Pod network yet. The kubelet reports the node NotReady with a condition message about the network plugin not being ready, because no CNI config exists. Install a CNI (Container Network Interface) plugin such as Calico, Cilium or Flannel, typically by applying its manifest with `kubectl apply -f` or installing its operator. When the CNI Pods are running and write their config into `/etc/cni/net.d/`, the node becomes Ready and CoreDNS starts. If the node stays NotReady after installing a CNI, check that its Pods are running in their namespace and that its configured Pod CIDR matches what you gave kubeadm.",
   "Worker nodes join with `kubeadm join`, using the command init printed at the end. It contains the API server endpoint, a bootstrap token and a `--discovery-token-ca-cert-hash`. The two security pieces solve different problems. The token lets the new kubelet authenticate just long enough to request its own client certificate through the TLS bootstrapping process; after that, the kubelet uses its certificate. The CA hash, a SHA-256 hash of the cluster CA's public key, lets the joining node verify it is talking to the real control plane and not an impostor. Together they give mutual trust: the cluster trusts the node because of the token, and the node trusts the cluster because of the hash.",
   "Bootstrap tokens expire, by default after 24 hours. That is a deliberate security choice: a leaked join command stops being useful after a day. If you need to add a node later, create a fresh token and full command with `kubeadm token create --print-join-command` on a control plane node. `kubeadm token list` shows existing tokens and their expiry, and `kubeadm token delete` removes one early. Tokens look like `abcdef.0123456789abcdef`, a six-character ID and a sixteen-character secret, and they are stored as Secrets in the `kube-system` namespace.",
   "To join an additional control plane node rather than a worker, you add `--control-plane` and a `--certificate-key` to the join command, which is covered in the high-availability lesson. After any join, confirm with `kubectl get nodes` from the control plane: the new node appears, becomes Ready once the CNI Pods start on it, and shows its kubelet version in the VERSION column. If a join hangs, the usual suspects are a blocked port 6443 between the node and the endpoint, an expired token, or a preflight failure on the new host, and the join output tells you which. If a join half-completes and you need to retry, run `kubeadm reset` on that node first so it starts from a clean state."
  ],
  "analogy": "Joining a node is like a new employee arriving at a secure office. The bootstrap token is a one-day visitor badge that gets them to the badge desk, where they receive a permanent ID card (the kubelet's certificate). The CA cert hash is the employee checking the building's official seal before handing over their personal details, so they know it is the real office. The analogy is imperfect in one way: a visitor badge can be reissued at any time with `kubeadm token create`, and nothing about the employee changes.",
  "terms": [
   [
    "--pod-network-cidr",
    "The IP range reserved for Pod addresses, which the CNI plugin allocates from; it must not overlap node or Service ranges."
   ],
   [
    "--control-plane-endpoint",
    "A shared, stable address for the API server, required for later HA expansion because it is written into certificates."
   ],
   [
    "CNI plugin",
    "The network add-on, such as Calico, Cilium or Flannel, that gives Pods addresses and connectivity; nodes are NotReady until one is installed."
   ],
   [
    "Bootstrap token",
    "A short-lived token, 24 hours by default, that lets a joining node authenticate to request its kubelet certificate."
   ],
   [
    "discovery-token-ca-cert-hash",
    "A hash of the cluster CA public key that the joining node uses to verify the control plane."
   ]
  ],
  "example": "Three days after building a lab cluster you add a third worker, but the saved join command fails with an authentication error. Running `kubeadm token create --print-join-command` on the control plane gives a new command with a valid token, and the node joins.",
  "mistakes": [
   [
    "NotReady nodes and Pending CoreDNS right after init mean the install failed and you should reset.",
    "This is normal until a CNI plugin is installed. Install the CNI and the node becomes Ready."
   ],
   [
    "You can pick any Pod CIDR at init and the CNI will adapt.",
    "The Pod CIDR must match the CNI plugin's configuration and must not overlap node or Service networks."
   ],
   [
    "The bootstrap token is the node's permanent credential.",
    "It is used only to bootstrap; the kubelet then gets its own client certificate. The token expires after 24 hours by default."
   ],
   [
    "The discovery hash is a password that lets the node into the cluster.",
    "The hash lets the node verify the cluster's identity. The token is what authenticates the node to the cluster."
   ]
  ],
  "tryit": [
   [
    "Your team will start with one control plane node for a pilot but expects to add two more within a year behind a load balancer. The DNS name `api.pilot.internal` already points at the single node. What should you include in `kubeadm init` today, and why?",
    "Use `--control-plane-endpoint=api.pilot.internal:6443`. The endpoint is written into certificates and kubeconfigs, so setting it now lets you later point the DNS name at a load balancer and join more control plane nodes without regenerating everything."
   ],
   [
    "You installed Flannel using its default manifest after running `kubeadm init --pod-network-cidr=192.168.0.0/16`. The Flannel Pods crash and the node stays NotReady. What is the likely cause?",
    "A CIDR mismatch: Flannel's default manifest expects 10.244.0.0/16. Either change the Flannel configuration to match 192.168.0.0/16 or rebuild with the matching Pod CIDR."
   ]
  ],
  "tip": "Nodes NotReady and CoreDNS Pending immediately after init almost always mean no CNI plugin is installed yet, not a broken cluster.",
  "check": [
   [
    "Why must --control-plane-endpoint be set at init time for a future HA cluster?",
    "It is written into certificates and kubeconfigs; changing it later means regenerating them."
   ],
   [
    "How do you get a working join command when the original token has expired?",
    "Run `kubeadm token create --print-join-command` on a control plane node."
   ],
   [
    "What directory does a CNI plugin write its configuration into on each node?",
    "/etc/cni/net.d/; once it is present and the CNI is running, the node can become Ready."
   ]
  ]
 },
 {
  "t": "Static Pods and /etc/kubernetes/manifests; kubeadm certificates (check-expiration, renew) and kubeconfig files",
  "hook": "On a quiet Tuesday, every `kubectl` command at Riverbend Health's internal cluster starts failing with an error about an expired certificate. Nothing was changed. Nobody deployed anything. The cluster was built exactly one year ago by a contractor who has since moved on, and it has never been upgraded. Sam, the systems administrator, SSHes to the control plane node and finds the API server container restarting. He tries `kubectl delete pod kube-apiserver-cp1 -n kube-system`, and it comes right back, still broken. How do you fix a control plane that you cannot manage through the API, and why did it all break on the anniversary?",
  "simple": "Most Pods in Kubernetes are created by asking the cluster's API, but a few special Pods are started straight from files on a machine's disk. These are called static Pods. The node agent, the kubelet, watches one folder; drop a Pod file in and it runs, remove the file and it stops. kubeadm uses this trick to run the cluster's own brain. The cluster also uses digital certificates, like ID cards with expiry dates, so its parts can prove who they are. kubeadm's ID cards last one year by default. When they expire, parts stop trusting each other. You check dates with one command and renew with another. Kubeconfig files are the wallets that hold these ID cards along with the cluster's address.",
  "body": [
   "A static Pod is a Pod the kubelet runs directly from a manifest file on disk, without the API server or scheduler being involved. The kubelet watches a directory, `/etc/kubernetes/manifests` on kubeadm clusters, set by `staticPodPath` in the kubelet config at `/var/lib/kubelet/config.yaml`. Put a Pod YAML file there and the kubelet starts it; delete the file and the kubelet stops it; edit the file and the kubelet recreates the Pod with the new spec. No scheduler decides where it runs: it runs on the node whose disk holds the file.",
   "kubeadm uses this to run the control plane itself: `etcd.yaml`, `kube-apiserver.yaml`, `kube-controller-manager.yaml` and `kube-scheduler.yaml` live in that directory. This solves a chicken-and-egg problem, because the API server cannot schedule itself and cannot be created through an API that does not exist yet. The kubelet also creates a read-only mirror Pod in the API so you can see static Pods with kubectl; their names end with the node name, like `kube-apiserver-cp1`. Deleting the mirror Pod with kubectl does nothing lasting, because the kubelet recreates it from the file, and editing it has no effect. To change a control plane component, for example adding an API server flag, edit the file on the node; the kubelet notices and recreates the Pod, usually within seconds.",
   "Because every YAML file in that directory is treated as a Pod, be careful with backups. A file such as `kube-apiserver.yaml.bak` saved in the same directory may be picked up as a second Pod definition and cause conflicts. Keep backup copies somewhere else, such as your home directory. If a manifest has a syntax error, the component simply never starts; with the API server down you cannot use kubectl, so you inspect the node directly with `crictl ps -a`, `crictl logs <container-id>` and `journalctl -u kubelet`.",
   "kubeadm also builds a private PKI (public key infrastructure) under `/etc/kubernetes/pki`: the cluster CA (certificate authority), the API server serving certificate, the API server's client certificates for talking to the kubelet and etcd, the front-proxy CA and client certificate, the service account signing key pair, and a separate etcd CA under `pki/etcd`. Certificates that kubeadm generates for components are valid for one year by default, while the CAs last much longer (ten years by default). That one-year lifetime explains the classic anniversary outage: a cluster that is never upgraded or renewed stops working twelve months after it was built.",
   "Check expiry with `kubeadm certs check-expiration`. It prints a table of each certificate and kubeconfig, its expiry date, the residual time and the CA that signed it. Renew with `kubeadm certs renew all`, or a single one such as `kubeadm certs renew apiserver`. Renewal reuses the existing CA, so nothing else needs to change trust. If you prefer to inspect a single file, `openssl x509 -in /etc/kubernetes/pki/apiserver.crt -noout -enddate` prints its expiry date directly, which is handy when kubeadm itself is unavailable or the certificate was issued another way.",
   "After renewing, the control plane static Pods must restart to load the new files. Restarting the kubelet alone does not restart the running containers. A common approach is to move the manifests out of the directory briefly (about 20 seconds, so the kubelet notices and stops the Pods) and then back so the kubelet starts them fresh. kubeadm also renews certificates automatically during `kubeadm upgrade apply`, which is one reason clusters upgraded regularly rarely hit expiry.",
   "```bash\nsudo kubeadm certs check-expiration\nsudo kubeadm certs renew all\nsudo mkdir -p /root/manifests-tmp\nsudo mv /etc/kubernetes/manifests/*.yaml /root/manifests-tmp/\n# wait about 20 seconds\nsudo mv /root/manifests-tmp/*.yaml /etc/kubernetes/manifests/\n```",
   "Kubeconfig files tie it together. A kubeconfig holds clusters (server URL and CA), users (credentials such as a client certificate) and contexts (a cluster plus a user plus an optional namespace), with a `current-context` selecting which one kubectl uses. `kubectl config get-contexts` lists them and `kubectl config use-context` switches, which matters on the exam where each task may name a context. kubeadm writes `admin.conf`, `super-admin.conf` in recent versions, `controller-manager.conf`, `scheduler.conf` and `kubelet.conf` in `/etc/kubernetes`. Most of these embed client certificates, so they are also renewed by `kubeadm certs renew`; `kubelet.conf` is the exception, because it points to the kubelet's own client certificate, which the kubelet rotates automatically. Your own `~/.kube/config` is usually a copy of admin.conf, so after renewing you may need to copy it again."
  ],
  "analogy": "A static Pod is like a sticky note on the fridge that says \"water the plants daily.\" The person living there (the kubelet) acts on it directly, with no manager approving it. A photo of that note posted on the family group chat is the mirror Pod: you can see it, but deleting the photo does not remove the note from the fridge. To change the instruction, you change the note itself. The analogy stops here: unlike a person, the kubelet reposts the photo automatically within seconds.",
  "terms": [
   [
    "Static Pod",
    "A Pod managed directly by a kubelet from a file in its staticPodPath, not by the API server or scheduler."
   ],
   [
    "staticPodPath",
    "The kubelet configuration field naming the directory it watches for static Pod manifests."
   ],
   [
    "Mirror Pod",
    "The read-only API object the kubelet creates so a static Pod is visible to kubectl."
   ],
   [
    "kubeadm certs check-expiration",
    "Lists each kubeadm-managed certificate and kubeconfig and when it expires."
   ],
   [
    "kubeadm certs renew",
    "Reissues kubeadm-managed certificates using the existing CA; components must restart to load them."
   ],
   [
    "Kubeconfig context",
    "A named combination of a cluster, a user and a default namespace."
   ]
  ],
  "example": "A task asks you to run an nginx Pod on node01 that survives even if the API server is down. You SSH to node01, confirm `staticPodPath` in `/var/lib/kubelet/config.yaml`, write a Pod manifest into that directory, and `kubectl get pods` shows `nginx-node01` a few seconds later.",
  "mistakes": [
   [
    "Deleting a static Pod's mirror with `kubectl delete pod` removes it.",
    "The kubelet recreates the mirror from the file on disk. Remove or edit the manifest file on the node instead."
   ],
   [
    "Saving a backup copy of a manifest in /etc/kubernetes/manifests is a safe habit.",
    "Every manifest file in that directory may be run as a Pod. Keep backups outside it."
   ],
   [
    "Restarting the kubelet makes control plane components load renewed certificates.",
    "Restarting the kubelet does not restart running containers. Restart the static Pods, for example by moving the manifests out and back."
   ],
   [
    "All kubeadm certificates, including the CA, expire after one year.",
    "Component and client certificates default to one year; the CAs default to a much longer lifetime."
   ]
  ],
  "tryit": [
   [
    "You must add an extra command-line flag to the API server on cp1. A teammate suggests `kubectl edit pod kube-apiserver-cp1 -n kube-system`. What do you do instead, and how do you confirm it worked?",
    "Edit /etc/kubernetes/manifests/kube-apiserver.yaml on cp1, after saving a backup outside that directory. The kubelet recreates the API server; wait for kubectl to respond again, then check the running container's command line with `kubectl describe pod kube-apiserver-cp1 -n kube-system` or `crictl inspect`. Editing the mirror Pod has no effect."
   ],
   [
    "`kubeadm certs check-expiration` shows the apiserver certificate expires in 5 days, while `kubelet.conf` is not listed with an embedded certificate. Your manager asks whether renewing will also fix the kubelet's credentials. How do you answer?",
    "Run `kubeadm certs renew all` and restart the control plane static Pods to fix the control plane certificates. The kubelet's client certificate is rotated automatically by the kubelet, so kubelet.conf normally needs no manual renewal."
   ]
  ],
  "tip": "To change a control plane flag, edit the manifest in /etc/kubernetes/manifests on that node, never the mirror Pod through kubectl. Keep a backup copy of the manifest outside that directory, because every YAML file inside it is treated as a Pod.",
  "check": [
   [
    "How do you find which directory a kubelet reads static Pods from?",
    "Look at `staticPodPath` in the kubelet config file, usually /var/lib/kubelet/config.yaml."
   ],
   [
    "What default lifetime do kubeadm-issued client certificates have, and how do you renew them?",
    "One year; run `kubeadm certs renew all` and restart the control plane components."
   ],
   [
    "What happens if you `kubectl delete` a static Pod's mirror Pod?",
    "The kubelet recreates the mirror Pod because the manifest file is still on disk."
   ],
   [
    "What three kinds of entries does a kubeconfig contain, and what ties them together?",
    "Clusters, users and contexts; a context pairs a cluster with a user and an optional namespace."
   ]
  ]
 },
 {
  "t": "Cluster upgrades with kubeadm: one minor version at a time, upgrade plan/apply/node, drain, kubelet upgrade, uncordon, version skew",
  "hook": "The security team at Northgate Insurance sends a memo: the production cluster is two minor versions behind and must be current by month end. Jordan, the newest administrator, is handed the task. The plan seems simple: upgrade the packages on every node and restart. But the senior engineer stops him. \"Which node first? Which version first? And what happens to the claims-processing Pods running on the worker while you restart its kubelet?\" Jordan realizes that upgrading in the wrong order could leave nodes that refuse to talk to the API server, or knock customer workloads offline. What is the safe sequence, and why does Kubernetes insist on it?",
  "simple": "Kubernetes gets new versions regularly, and upgrading a cluster is like renovating an apartment building while people still live in it. You must follow rules. First, you can only move up one main version at a time, like climbing stairs one step at a time instead of jumping. Second, you upgrade the building's management office (the control plane) before any apartment (worker node), because the apartments must never be newer than the office. For each apartment, you politely move the residents (the apps) to other apartments first, which is called draining. Then you upgrade it, restart its caretaker program (the kubelet), and mark it open for residents again, which is called uncordoning.",
  "body": [
   "Kubernetes releases a new minor version (the y in 1.y) regularly, and kubeadm supports upgrading only one minor version at a time. To go from 1.33 to 1.35 you upgrade to 1.34 first, then to 1.35. Patch versions within a minor (the z in 1.y.z) can be skipped, so moving from 1.34.1 to 1.35.2 is one step. The Certified Kubernetes Administrator (CKA) exam frequently gives you a cluster one minor behind and asks you to upgrade the control plane and a worker, often to an exact version, so read the version in the task carefully.",
   "Version skew rules explain the order. The version skew policy says the kubelet must never be newer than the API server, though it may lag it by a few minor versions. kubectl should be within one minor version of the API server, older or newer. In a highly available cluster, API servers may differ by at most one minor version during the upgrade. So you always upgrade the control plane first, then the nodes. If you upgraded a worker's kubelet first, it would be newer than the API server, which is unsupported and can break in subtle ways.",
   "On the first control plane node, upgrade the kubeadm package to the exact target version, then check the plan and apply it. `kubeadm upgrade plan` verifies the cluster can be upgraded, shows the current and available versions of each component, and changes nothing. `kubeadm upgrade apply v1.X.Y` upgrades the static Pod manifests for the API server, controller-manager, scheduler and etcd, upgrades CoreDNS and kube-proxy, and renews the control plane certificates. On additional control plane nodes you run `kubeadm upgrade node` instead of apply, because the cluster-wide pieces were already upgraded by apply.",
   "After the control plane components are upgraded, the node's own kubelet still runs the old version. Drain the node, upgrade the kubelet and kubectl packages, reload systemd and restart the kubelet, then uncordon it. Draining the control plane node matters too: it may run regular workloads, and even when it does not, draining keeps the steps identical everywhere and makes the restart safe. Notice the `apt-mark unhold` and `hold` around each install; the packages were held during installation precisely so that only a deliberate upgrade like this one changes them. The full sequence on a Debian or Ubuntu control plane node looks like this:",
   "```bash\n# control plane (Debian/Ubuntu, adjust version)\nsudo apt-mark unhold kubeadm && sudo apt-get install -y kubeadm='1.X.Y-*' && sudo apt-mark hold kubeadm\nsudo kubeadm upgrade plan\nsudo kubeadm upgrade apply v1.X.Y\nkubectl drain cp1 --ignore-daemonsets\nsudo apt-mark unhold kubelet kubectl && sudo apt-get install -y kubelet='1.X.Y-*' kubectl='1.X.Y-*' && sudo apt-mark hold kubelet kubectl\nsudo systemctl daemon-reload && sudo systemctl restart kubelet\nkubectl uncordon cp1\n```",
   "Each worker follows a similar pattern, one at a time so the cluster keeps enough capacity. From a machine with kubectl, drain the node so its Pods move elsewhere: `kubectl drain node01 --ignore-daemonsets` (add `--delete-emptydir-data` if Pods use emptyDir). On the worker, upgrade the kubeadm package and run `sudo kubeadm upgrade node`, which updates the local kubelet configuration. Then upgrade the kubelet and kubectl packages, run `systemctl daemon-reload` and restart the kubelet. Finally, back on the machine with kubectl, uncordon the node so it accepts Pods again. A common exam slip is running `kubectl drain` or `uncordon` from the worker itself, where no admin kubeconfig exists; run those from the control plane or your jump host.",
   "Note that Kubernetes package repositories are published per minor version, so moving to a new minor may require changing the repository definition on each node, for example the version in the repository line under `/etc/apt/sources.list.d/`, before the new packages appear. `apt-cache madison kubeadm` lists the versions the configured repository offers, which is a quick way to find the exact package string such as `1.X.Y-1.1`.",
   "Verify with `kubectl get nodes`: the VERSION column shows each kubelet's version, which is the easiest way to confirm a node really finished. If a node still shows the old version after you upgraded its packages, the kubelet was not restarted. `kubectl version` shows the client and server versions, and `kubeadm version` shows the kubeadm binary. Check that the node is Ready and no longer shows SchedulingDisabled before moving on to the next one."
  ],
  "analogy": "Upgrading a cluster is like updating a school's curriculum. The district office (control plane) adopts the new curriculum first, because teachers (kubelets) can still teach last year's material for a while, but a teacher cannot teach a curriculum the office has never heard of. Each classroom is emptied of students (drain), updated, and reopened (uncordon), one room at a time so classes continue elsewhere. The analogy stops on one point: Kubernetes also forbids skipping a grade, so you move one minor version per step.",
  "mnemonic": "For each node, think \"Don't Upset Running Users\": Drain the node, Upgrade (kubeadm, then kubelet and kubectl), Restart the kubelet after daemon-reload, Uncordon the node.",
  "terms": [
   [
    "kubeadm upgrade plan",
    "Checks upgradeability and lists target versions without changing anything."
   ],
   [
    "kubeadm upgrade apply",
    "Upgrades the first control plane node's components and cluster add-ons to a given version."
   ],
   [
    "kubeadm upgrade node",
    "Upgrades additional control plane nodes or updates a worker's kubelet config."
   ],
   [
    "Version skew policy",
    "Rules on how far component versions may differ; kubelets may never be newer than the API server."
   ],
   [
    "Minor version",
    "The middle number in 1.y.z; kubeadm upgrades must move one minor version at a time."
   ]
  ],
  "example": "Asked to upgrade the control plane and node01 to the next patch of the next minor, you upgrade kubeadm on cp1, run plan and apply, drain and upgrade the kubelet on cp1, uncordon it, then repeat drain, `kubeadm upgrade node`, kubelet upgrade and uncordon on node01. `kubectl get nodes` shows both at the new version.",
  "mistakes": [
   [
    "You can jump straight from 1.33 to 1.35 if you are careful.",
    "kubeadm supports one minor version per upgrade; go 1.33 to 1.34, then 1.34 to 1.35. Patch versions may be skipped."
   ],
   [
    "Upgrade the workers first so the control plane is untouched until last.",
    "The kubelet must never be newer than the API server, so the control plane always goes first."
   ],
   [
    "Run `kubeadm upgrade apply` on every node.",
    "Use `apply` only on the first control plane node; use `kubeadm upgrade node` on other control plane nodes and on workers."
   ],
   [
    "Installing the new kubelet package finishes the node upgrade.",
    "You must run `systemctl daemon-reload` and restart the kubelet, then uncordon; otherwise the node still reports the old version."
   ]
  ],
  "tryit": [
   [
    "A cluster runs 1.34.2 on all nodes. The task says: upgrade the control plane and node01 to 1.35.1. After running `kubeadm upgrade apply v1.35.1` on cp1, `kubectl get nodes` still shows cp1 at v1.34.2. Did the apply fail?",
    "Not necessarily. The VERSION column shows the kubelet version, and apply upgrades the control plane static Pods, not the kubelet. Drain cp1, upgrade the kubelet and kubectl packages to 1.35.1, run daemon-reload, restart the kubelet and uncordon. Then cp1 shows v1.35.1."
   ],
   [
    "On node01 you run `sudo apt-get install kubeadm='1.35.1-*'` and apt says no such version exists, although it worked on cp1 earlier. What should you check?",
    "The package repository definition on node01. Repositories are published per minor version, so node01 may still point at the 1.34 repository. Update its repository line, run `apt-get update`, and confirm the version with `apt-cache madison kubeadm`."
   ]
  ],
  "tip": "Upgrading the package is not enough: forgetting `systemctl daemon-reload && systemctl restart kubelet` leaves the node reporting the old version. Also remember `upgrade apply` only on the first control plane node and `upgrade node` everywhere else.",
  "check": [
   [
    "Can you upgrade directly from 1.33 to 1.35 with kubeadm?",
    "No; upgrade one minor at a time, 1.33 to 1.34, then 1.34 to 1.35."
   ],
   [
    "Why is the control plane upgraded before worker kubelets?",
    "The version skew policy forbids a kubelet newer than the API server."
   ],
   [
    "What does the VERSION column in `kubectl get nodes` report?",
    "Each node's kubelet version, which confirms whether the node's kubelet upgrade finished."
   ]
  ]
 },
 {
  "t": "Etcd backup and restore with etcdctl/etcdutl and the etcd PKI; pointing the etcd static Pod at a restored data directory",
  "hook": "Friday, 4:50 p.m., at Summit Credit Union. A contractor cleaning up test resources runs a delete command against the wrong context, and the `loans` namespace, with its Deployments, Services, ConfigMaps and Secrets, vanishes from production. The containers are already terminating. Alex, the cluster administrator, remembers that a nightly job writes an etcd snapshot to `/opt/backup`. That snapshot holds the entire cluster as it was at 2 a.m. But restoring it means stopping and repointing the database that every component depends on, with the whole team watching. Which tool does Alex use, which certificates does it need, and how does etcd end up reading the restored data instead of the damaged copy?",
  "simple": "etcd is the cluster's notebook: every app, setting and password the cluster knows about is written in it. Backing up etcd means taking a snapshot, a single file that is a copy of the notebook at that moment. Because the notebook is protected, the backup tool must show the right ID cards (certificates) to get in. Restoring works differently from copying a file back over the old one. You build a brand-new notebook in a new folder from the snapshot, then tell etcd to read from that new folder instead of the old one. A few moments later the cluster remembers everything exactly as it was when the snapshot was taken, including things that have been deleted since.",
  "body": [
   "Because etcd holds all cluster state, a snapshot of etcd is a backup of the cluster's configuration: every Deployment, Service, ConfigMap, Secret, role and binding. It is not a backup of application data stored in persistent volumes, which needs its own backup method. The Certified Kubernetes Administrator (CKA) exam regularly asks you to take a snapshot to a given path and later restore one. To do that confidently you need to know the two tools, the certificates and how to repoint the etcd static Pod.",
   "`etcdctl` is the client that talks to a running etcd over the network. On a kubeadm cluster etcd requires mutual TLS (Transport Layer Security): the server proves its identity to the client and the client must present a certificate signed by the etcd certificate authority (CA). So you pass three files from `/etc/kubernetes/pki/etcd`: the CA certificate, and a client certificate and key. The simplest way to find the right paths and endpoint is to read them from `/etc/kubernetes/manifests/etcd.yaml`, looking at `--listen-client-urls` or `--advertise-client-urls`, `--trusted-ca-file`, `--cert-file` and `--key-file`. The server certificate works as a client certificate in most kubeadm setups, and a dedicated `healthcheck-client` certificate is also present. If you omit any of the TLS flags, etcdctl typically hangs and then fails with a context deadline exceeded error, which is a strong hint that the certificates are missing rather than etcd being down.",
   "```bash\n# default endpoint is the local client port 2379; add --endpoints if etcd is elsewhere\nETCDCTL_API=3 etcdctl \\\n  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\\n  --cert=/etc/kubernetes/pki/etcd/server.crt \\\n  --key=/etc/kubernetes/pki/etcd/server.key \\\n  snapshot save /opt/backup/etcd.db\netcdutl snapshot status /opt/backup/etcd.db -w table\n```",
   "The `ETCDCTL_API=3` variable selects the version 3 API. Current etcdctl releases use version 3 by default, so it is harmless rather than required, but you will still see it in many exam-style instructions. After saving, check the file with `snapshot status`, which prints a hash, a revision number, the number of keys and the total size. A snapshot with a sensible key count and size is good evidence the backup worked; a zero-byte file means it did not.",
   "`etcdutl` is the offline utility that works on files directly. In current etcd releases, snapshot restore and status are done with etcdutl, and the older `etcdctl snapshot restore` is deprecated. A restore does not overwrite the running database; it builds a new data directory from the snapshot: `etcdutl snapshot restore /opt/backup/etcd.db --data-dir /var/lib/etcd-restored`. No TLS flags are needed because it does not contact a server. Restore into a directory that does not exist yet; if the target directory already exists, the restore refuses to proceed, which protects you from clobbering a live database by accident.",
   "Now point etcd at the restored data. Edit `/etc/kubernetes/manifests/etcd.yaml`. The data directory appears in two places: the `--data-dir` flag in the container command, which is a path inside the container, and the `hostPath` volume named `etcd-data`, which maps a directory on the node into the container. The simplest reliable change is to update the hostPath `path` to `/var/lib/etcd-restored` and leave the container's mount path and flag alone. etcd then sees the restored files at the same in-container path it always used. If you change the flag, you must also change the volume mount path to match.",
   "Save the file and the kubelet notices the change and recreates the etcd static Pod with the restored state. The API server loses its connection to etcd during the switch and may take a minute to reconnect, so `kubectl` can fail or hang briefly; that is normal. If it stays stuck, check on the node with `crictl ps -a` to see whether the etcd and kube-apiserver containers are running, and `crictl logs <container-id>` for errors such as permission problems on the new directory or a path typo in the manifest. Once kubectl responds, confirm the restore by looking for the objects that had been deleted.",
   "Treat snapshot files as highly sensitive: they contain every Secret in the cluster, unencrypted unless you enabled encryption at rest. Store them with restrictive file permissions, copy them off the node so a node failure does not take the backups with it, and test restores occasionally. A backup that has never been restored is only a hope. Also remember that a restore rolls the entire cluster back to the snapshot time, so anything created after the snapshot disappears; agree on that trade-off with application owners before restoring production."
  ],
  "analogy": "Restoring etcd is like recovering an old version of a document by opening the backup as a new file, then changing your desktop shortcut to point at that new file. The original document is untouched until you decide to delete it. In the manifest, the hostPath volume is the shortcut: change where it points and etcd opens the restored copy. The analogy stops working if you think of it as one document; etcd's restore rolls back the entire cluster at once, not just the part you lost.",
  "terms": [
   [
    "etcdctl",
    "The network client for a running etcd; used for snapshot save, member list and endpoint health."
   ],
   [
    "etcdutl",
    "The offline etcd utility for working with data files, including snapshot restore and status."
   ],
   [
    "Snapshot",
    "A point-in-time copy of the whole etcd keyspace saved to a single file."
   ],
   [
    "Data directory",
    "The on-disk location of the etcd database, set by --data-dir and mounted via a hostPath volume."
   ],
   [
    "etcd PKI",
    "The separate CA and certificates under /etc/kubernetes/pki/etcd used for etcd mutual TLS."
   ]
  ],
  "example": "After taking a snapshot to /opt/snap.db, a teammate deletes the `payments` namespace. You run `etcdutl snapshot restore /opt/snap.db --data-dir /var/lib/etcd-from-backup`, change the etcd-data hostPath in etcd.yaml to that directory, wait for etcd and the API server to restart, and `kubectl get ns` shows payments again.",
  "mistakes": [
   [
    "Snapshot restore writes the backup over the live etcd database.",
    "Restore creates a new data directory. You then point the etcd static Pod at it by editing its hostPath volume."
   ],
   [
    "etcdctl snapshot save needs no certificates when run on the control plane node.",
    "kubeadm's etcd requires mutual TLS. Pass --cacert, --cert and --key, copying the paths from etcd.yaml."
   ],
   [
    "Restore needs the same TLS flags as save.",
    "etcdutl snapshot restore works offline on files, so it needs no endpoint or TLS flags."
   ],
   [
    "Changing only the --data-dir flag in etcd.yaml is enough to use the restored data.",
    "The hostPath volume decides which node directory the container sees. Change the hostPath path, or change the flag and the mount path together."
   ]
  ],
  "tryit": [
   [
    "A task says: take a snapshot of etcd to /srv/data/etcd-snapshot.db. You run etcdctl with only `snapshot save /srv/data/etcd-snapshot.db` and after about a minute get a context deadline exceeded error. etcd is healthy according to `crictl ps`. What is wrong and how do you fix it?",
    "The TLS flags are missing, so the client cannot complete the handshake. Read the paths from /etc/kubernetes/manifests/etcd.yaml and rerun with --cacert, --cert and --key (and --endpoints if needed). Then verify the file with `etcdutl snapshot status`."
   ],
   [
    "You restored a snapshot into /var/lib/etcd-new and changed the etcd-data hostPath in etcd.yaml. Two minutes later kubectl still times out. What do you check, in order?",
    "On the node, run `crictl ps -a` to see whether etcd and kube-apiserver are running or restarting, then `crictl logs` on the etcd container for errors such as a wrong path or a permissions problem. Recheck the manifest for a typo in the hostPath and confirm /var/lib/etcd-new contains a `member` directory."
   ]
  ],
  "tip": "Snapshot save fails with a TLS or deadline error if you omit --cacert, --cert or --key; copy the paths straight from the etcd manifest instead of guessing. For restore, remember the hostPath volume is what actually decides which host directory etcd sees.",
  "check": [
   [
    "Does snapshot restore overwrite the running etcd database?",
    "No. It creates a new data directory; you then point etcd at it."
   ],
   [
    "Where can you look up the endpoint and certificate paths etcdctl needs?",
    "In the etcd static Pod manifest, /etc/kubernetes/manifests/etcd.yaml."
   ],
   [
    "Which tool is preferred for snapshot restore in current etcd releases?",
    "etcdutl, the offline utility; `etcdctl snapshot restore` is deprecated."
   ],
   [
    "Why must etcd snapshot files be protected carefully?",
    "They contain every Secret in the cluster, unencrypted unless encryption at rest is enabled."
   ]
  ]
 },
 {
  "t": "Highly available control planes: stacked vs external etcd, quorum, load balancer in front of API servers, --upload-certs and --certificate-key",
  "hook": "At Bayview Transit, the dispatch system runs on a Kubernetes cluster with a single control plane node. One morning that node's disk fails. The buses keep moving and the running dispatch Pods keep answering, but a crashed Pod is not replaced, nobody can deploy the urgent fix the vendor just sent, and every `kubectl` command times out. The incident review asks Riley, the platform lead, to make sure this never happens again. Riley proposes three control plane nodes behind a load balancer. A manager asks, \"Why three? Wouldn't four be even safer?\" How should Riley answer, and how do the extra nodes actually join?",
  "simple": "If a cluster has only one control plane, the brain, then losing that one machine means nobody can change anything, even though running apps keep going. High availability means running several control plane machines so the cluster survives losing one. The cluster's database, etcd, works by majority vote: more than half of its copies must agree before any change is saved. With three copies, two can still agree if one fails. With four, you still need three to agree, so you can still only lose one. That is why clusters use odd numbers. A load balancer sits in front of the machines, like a receptionist forwarding calls to whichever office is open, so users always use one address.",
  "body": [
   "A single control plane node is a single point of failure: if it dies, running Pods keep going but nothing can be changed, scheduled or healed, and kubectl stops working. A highly available (HA) control plane runs several control plane nodes so the cluster survives the loss of one. For the Certified Kubernetes Administrator (CKA) exam you need to understand the two topologies kubeadm supports, the quorum math behind etcd, why a load balancer is required, and the commands that let extra control plane nodes join.",
   "kubeadm supports two topologies. In a stacked topology, each control plane node runs its own etcd member next to the API server, scheduler and controller-manager, all as static Pods. It needs fewer machines and is what kubeadm sets up by default, but losing a node removes both a control plane instance and an etcd member at the same time. In an external etcd topology, etcd runs on its own dedicated hosts and the control plane nodes connect to it over the network. It decouples the two failure domains and lets you size and maintain etcd separately, at the cost of more machines and more setup: you give kubeadm the etcd endpoints and client certificates in a configuration file passed with `--config`.",
   "etcd uses the Raft consensus algorithm, which needs a quorum, a majority of members, to elect a leader and accept writes. Quorum for n members is floor(n/2) + 1. Three members have a quorum of two and tolerate one failure; five members have a quorum of three and tolerate two. Four members have a quorum of three and still tolerate only one, which is why etcd clusters use odd sizes: adding a fourth member adds cost and another machine that can fail without improving fault tolerance. If quorum is lost, etcd stops accepting writes and the API server cannot change anything, even if some members are healthy. More members also means each write must reach more machines, so very large etcd clusters are slower, which is why three or five is typical.",
   "The API servers are stateless and all active at once, so clients reach them through a load balancer (for example HAProxy with keepalived, or a cloud load balancer) listening on port 6443 and forwarding to every control plane node. That load balancer's address is what you pass as `--control-plane-endpoint` at init time, and it is written into every kubeconfig and into the API server certificate. The load balancer should health check the API servers, typically against their health endpoints, so it stops sending traffic to a node that has failed. Without a load balancer, clients would be configured with one API server address and would fail with it, which defeats the point of HA.",
   "The scheduler and controller-manager are different. They run on every control plane node, but they use leader election: instances compete for a lease object in the `kube-system` namespace, and only the holder of the lease does any work. The others wait and take over if the leader stops renewing its lease. So API servers are active/active, while the scheduler and controller-manager are active/passive. You can see which instance currently leads with `kubectl get lease -n kube-system`.",
   "Joining extra control plane nodes requires sharing the cluster's CA certificates and keys, the service-account signing keys, the front-proxy CA and, for stacked etcd, the etcd CA. kubeadm can do this for you. `kubeadm init --control-plane-endpoint=LB:6443 --upload-certs` encrypts those files, stores them in the `kubeadm-certs` Secret in kube-system, and prints a certificate key, the decryption key for that Secret. Other control plane nodes then join with the control plane variant of the join command.",
   "```bash\n# on the first control plane node\nsudo kubeadm init --control-plane-endpoint=k8s-api.lab.local:6443 \\\n  --upload-certs --pod-network-cidr=10.244.0.0/16\n# on each additional control plane node\nsudo kubeadm join k8s-api.lab.local:6443 --token <token> \\\n  --discovery-token-ca-cert-hash sha256:<hash> \\\n  --control-plane --certificate-key <key>\n```",
   "The uploaded certificates are deleted automatically after a short time, two hours by default, because the certificate key is effectively a key to the cluster's CA. If you add a control plane node later, re-upload them with `kubeadm init phase upload-certs --upload-certs`, which prints a new certificate key, and pair it with a fresh token from `kubeadm token create --print-join-command`. Without the key, the alternative is copying the certificate files to the new node manually before joining. Treat the certificate key like a password: anyone holding it and a valid token while the Secret exists could add a control plane node."
  ],
  "analogy": "etcd quorum works like a committee that can only pass decisions with a majority of its members present. A committee of three can still vote if one person is sick; a committee of four needs three present, so it also survives only one absence while paying for an extra seat. The load balancer is the front desk that sends visitors to any open office. The analogy stops working for the scheduler and controller-manager, which are not a committee at all: one leader acts while the others simply wait.",
  "terms": [
   [
    "Stacked etcd",
    "Topology where each control plane node also runs an etcd member."
   ],
   [
    "External etcd",
    "Topology where etcd runs on separate hosts from the control plane."
   ],
   [
    "Quorum",
    "A majority of etcd members, floor(n/2)+1, needed to commit writes."
   ],
   [
    "--upload-certs",
    "kubeadm init flag that encrypts control plane certificates into the kubeadm-certs Secret and prints a certificate key."
   ],
   [
    "--certificate-key",
    "The key used to decrypt control plane certificates uploaded by --upload-certs when joining as a control plane node."
   ],
   [
    "Leader election",
    "Mechanism that keeps only one scheduler and one controller-manager active across control plane nodes."
   ]
  ],
  "example": "A three-node stacked control plane loses cp2 to a disk failure. etcd still has two of three members, so quorum holds, the load balancer stops sending traffic to cp2's dead API server, and the scheduler leader on cp1 keeps placing Pods. The team rebuilds cp2 by generating a fresh certificate key and running join with --control-plane.",
  "mistakes": [
   [
    "Four etcd members tolerate more failures than three.",
    "Quorum for four is three, so four still tolerates only one failure. Use odd sizes such as three or five."
   ],
   [
    "All three schedulers in an HA cluster schedule Pods at the same time.",
    "The scheduler and controller-manager use leader election; only one instance of each is active. API servers are the active/active component."
   ],
   [
    "The certificate key from --upload-certs works indefinitely.",
    "The uploaded certificates are deleted after two hours by default. Regenerate with `kubeadm init phase upload-certs --upload-certs`."
   ],
   [
    "External etcd is always better than stacked.",
    "It isolates failures but needs more hosts and more setup. Stacked is simpler and is kubeadm's default."
   ]
  ],
  "tryit": [
   [
    "A five-member etcd cluster loses two members during a data center power issue. The next day a third member's disk fills up and it stops. Can the API server still create new Pods? Explain using quorum.",
    "No. Quorum for five members is three. With three members down, only two remain, which is below quorum, so etcd stops accepting writes and the API server cannot persist new objects. Restoring one member brings the count back to three and writes resume."
   ],
   [
    "Your cluster was built last month with `--upload-certs`. Today you must add a third control plane node. You have the old join command with the --control-plane and --certificate-key flags, but it fails while downloading certificates. What do you run?",
    "On an existing control plane node, run `kubeadm init phase upload-certs --upload-certs` to get a new certificate key and `kubeadm token create --print-join-command` for a fresh token and hash. Combine them with --control-plane and the new --certificate-key on the new node."
   ]
  ],
  "tip": "Know the quorum math cold: 3 members survive 1 failure, 5 survive 2, and adding a fourth member to three does not improve fault tolerance. Also remember that the scheduler and controller-manager are active/passive while API servers are active/active.",
  "check": [
   [
    "How many etcd member failures can a five-member cluster tolerate?",
    "Two, because quorum is three."
   ],
   [
    "What flag on kubeadm init shares certificates so other control plane nodes can join without copying files?",
    "--upload-certs, which prints the certificate key used with join --certificate-key."
   ],
   [
    "What is the main trade-off of external etcd versus stacked?",
    "Better failure isolation for more hosts and more setup complexity."
   ],
   [
    "Why does an HA control plane need a load balancer in front of the API servers?",
    "So clients use one stable address that keeps working when any single API server fails."
   ]
  ]
 },
 {
  "t": "RBAC: Roles, ClusterRoles, RoleBindings, ClusterRoleBindings, aggregated and built-in roles, users via CertificateSigningRequests, kubectl auth can-i",
  "hook": "A help-desk ticket lands in your queue at Cedar Valley Schools: \"New developer Jordan needs to see and restart Pods in the `grades` namespace. Nothing else.\" Your teammate's quick fix last month was to bind everyone to `cluster-admin`, and the auditor flagged it in red. This time you want it right. But Kubernetes has no \"create user\" button, and there are four different RBAC objects with confusingly similar names. Should you write a Role or a ClusterRole? A RoleBinding or a ClusterRoleBinding? And once it is done, how can you prove to the auditor that Jordan can restart Pods in `grades` but cannot read Secrets or touch the `payroll` namespace?",
  "simple": "RBAC, which stands for role-based access control, is how Kubernetes decides who may do what. It works like keys in a building. A role is a key ring: a list of doors (types of objects, such as Pods) and actions (like view or delete). A binding hands that key ring to a person, a group or an app. Some key rings work on only one floor, which Kubernetes calls a namespace; others work in the whole building. There are no \"no entry\" signs: people can only open doors their key rings include. Kubernetes does not keep a list of people. Instead, a person proves who they are with a certificate, a digital ID card signed by the cluster. You can test anyone's keys with `kubectl auth can-i`.",
  "body": [
   "Role-based access control (RBAC) decides what an authenticated identity may do. Authentication answers \"who are you\"; RBAC, as the authorizer, answers \"are you allowed to do this\". Permissions are always additive: there are no deny rules, so a user can do only what some role grants, and the effective permissions are the union of every role bound to the user and their groups. Each rule lists API groups, resources and verbs such as get, list, watch, create, update, patch and delete. Core resources such as Pods, Services and Secrets are in the core API group, written as an empty string `\"\"`, while Deployments live in the `apps` group.",
   "There are four objects, and the names map neatly onto two questions: what is allowed, and where. A Role grants permissions inside one namespace. A ClusterRole is cluster-wide: it can cover cluster-scoped resources such as nodes and PersistentVolumes, or be a reusable set of namespaced permissions. A RoleBinding grants a Role or a ClusterRole to subjects (users, groups or ServiceAccounts) within one namespace. A ClusterRoleBinding grants a ClusterRole across the whole cluster, in every namespace. Binding a ClusterRole with a RoleBinding is a common pattern: define \"read pods\" once and grant it per namespace. The binding's scope always wins: a RoleBinding that references a ClusterRole still grants access only in the RoleBinding's namespace.",
   "```bash\nkubectl create role pod-reader -n dev --verb=get,list,watch --resource=pods\nkubectl create rolebinding jane-read -n dev --role=pod-reader --user=jane\nkubectl create clusterrolebinding ci-view --clusterrole=view --serviceaccount=ci:deployer\nkubectl auth can-i list pods -n dev --as=jane\nkubectl auth can-i --list --as=system:serviceaccount:ci:deployer -n ci\n```",
   "These imperative commands are the fastest way to work on the exam, and adding `--dry-run=client -o yaml` shows the YAML they would create if you need to edit it. Note the format for ServiceAccounts in `kubectl create rolebinding`: `--serviceaccount=<namespace>:<name>`. A binding's `roleRef` cannot be changed after creation; to point a binding at a different role, delete and recreate it.",
   "Kubernetes ships built-in ClusterRoles: `cluster-admin` (everything), `admin` (most things in a namespace, including RBAC there), `edit` (read and write most objects, but not roles or bindings) and `view` (read-only, excluding Secrets). Granting `view` is a good default for read-only access precisely because Secrets are excluded. Several of these are aggregated ClusterRoles. An aggregated ClusterRole has an `aggregationRule` with label selectors, and the controller manager automatically merges in the rules of any ClusterRole carrying a matching label, such as `rbac.authorization.k8s.io/aggregate-to-view: \"true\"`. That is how a CRD (CustomResourceDefinition) installer can extend the view role to its new resources. Do not edit the rules of an aggregated ClusterRole directly: the controller overwrites them, so add a labeled ClusterRole instead.",
   "Kubernetes has no user objects. A normal user is simply whoever presents a client certificate signed by the cluster CA (certificate authority); the certificate's common name (CN) is the username and organization (O) fields are groups. To create one, generate a key and a certificate signing request with openssl (for example `-subj \"/CN=jane/O=dev\"`), wrap it in a CertificateSigningRequest object with `signerName: kubernetes.io/kube-apiserver-client` and `usages: [client auth]`, and put the base64-encoded CSR in `spec.request`, encoded on a single line. Then `kubectl certificate approve jane`, read the issued certificate from `.status.certificate`, decode it, and add it to a kubeconfig with `kubectl config set-credentials` and `set-context`.",
   "```bash\nopenssl genrsa -out jane.key 2048\nopenssl req -new -key jane.key -out jane.csr -subj \"/CN=jane/O=dev\"\n# create the CertificateSigningRequest object with spec.request set to: base64 -w0 jane.csr\nkubectl get csr\nkubectl certificate approve jane\nkubectl get csr jane -o jsonpath='{.status.certificate}' | base64 -d > jane.crt\nkubectl config set-credentials jane --client-key=jane.key --client-certificate=jane.crt --embed-certs\nkubectl config set-context jane --cluster=kubernetes --user=jane --namespace=dev\n```",
   "Verify with `kubectl auth can-i`. Using `--as` impersonates another identity, and `--as-group` adds groups, so you can prove a binding works without switching kubeconfigs. ServiceAccount identities are written as `system:serviceaccount:<namespace>:<name>` when impersonating. `kubectl auth can-i --list` prints everything an identity may do in a namespace, which is the clearest evidence to show an auditor. A certificate user who has a valid certificate but no bindings will authenticate fine and then receive Forbidden errors on every request, which is a useful way to tell authentication problems from authorization problems: Unauthorized (401) means the identity was not accepted, Forbidden (403) means it was accepted but not permitted."
  ],
  "analogy": "RBAC works like a hotel key card system. A Role is the list of doors a card type opens on one floor; a ClusterRole is a list that can apply to any floor, including the lobby and roof. A RoleBinding programs a guest's card for one floor, and a ClusterRoleBinding programs it for the whole building. Where the analogy stops: hotels sometimes post \"staff only\" signs that block even key holders, but RBAC has no deny rules, only doors you can open.",
  "mnemonic": "Built-in roles from most to least power: \"Captains Always Edit Voyages\" for cluster-admin, admin, edit, view.",
  "terms": [
   [
    "Role / ClusterRole",
    "Sets of permission rules, namespaced or cluster-wide respectively."
   ],
   [
    "RoleBinding / ClusterRoleBinding",
    "Objects that grant a role to users, groups or ServiceAccounts, in one namespace or cluster-wide."
   ],
   [
    "Aggregated ClusterRole",
    "A ClusterRole whose rules are automatically assembled from other ClusterRoles matching a label selector."
   ],
   [
    "CertificateSigningRequest",
    "An API object that asks a signer, such as the kube-apiserver-client signer, to issue a certificate."
   ],
   [
    "kubectl auth can-i",
    "Checks whether the current or an impersonated identity may perform a verb on a resource."
   ]
  ],
  "example": "A developer named Jane needs to view and delete Pods only in the `qa` namespace. You issue her a certificate through a CSR with CN=jane, create a Role with get, list and delete on pods in qa, bind it with a RoleBinding, and confirm with `kubectl auth can-i delete pods -n qa --as=jane` (yes) and `-n prod` (no).",
  "mistakes": [
   [
    "Binding a ClusterRole means the subject gets cluster-wide access.",
    "Scope comes from the binding. A RoleBinding to a ClusterRole grants access only in the RoleBinding's namespace; only a ClusterRoleBinding grants it everywhere."
   ],
   [
    "You can grant everything and then add a rule that denies Secrets.",
    "RBAC has no deny rules. Grant only the resources needed, or use a built-in role like view, which already excludes Secrets."
   ],
   [
    "You create users with `kubectl create user`.",
    "Kubernetes has no user objects. Users are identities from certificates (CN and O) or external authentication."
   ],
   [
    "The `view` ClusterRole can read Secrets because it is read-only.",
    "view deliberately excludes Secrets, since reading them could reveal credentials."
   ]
  ],
  "tryit": [
   [
    "A monitoring ServiceAccount named `scraper` in namespace `observability` must list Pods in every namespace and nothing else. A teammate suggests a Role in observability plus a RoleBinding. Will that work? What should you create?",
    "No; a Role and RoleBinding only grant access in one namespace. Create a ClusterRole with get, list and watch on pods, and a ClusterRoleBinding to `observability:scraper`. Verify with `kubectl auth can-i list pods -A --as=system:serviceaccount:observability:scraper`."
   ],
   [
    "After approving Jordan's CSR and setting up his kubeconfig, every command he runs returns Forbidden. His certificate is valid and his CN is `jordan`. What is the likely cause, and how do you confirm?",
    "Authentication works (Forbidden, not Unauthorized), so he lacks a binding. Run `kubectl auth can-i --list -n grades --as=jordan` and check RoleBindings in grades with `kubectl get rolebinding -n grades -o wide`. Create the missing Role and RoleBinding for user jordan."
   ]
  ],
  "tip": "A RoleBinding that references a ClusterRole still only grants access in the RoleBinding's namespace. Also remember ServiceAccount subjects are written as system:serviceaccount:<namespace>:<name> when impersonating.",
  "check": [
   [
    "Can RBAC express 'everything except Secrets'?",
    "Not with a deny rule; RBAC is additive only, so you must grant exactly the resources you want."
   ],
   [
    "What determines a certificate-based user's username and groups?",
    "The certificate's CN is the username and each O field is a group."
   ],
   [
    "How do you check whether ServiceAccount builder in namespace ci can create Deployments there?",
    "`kubectl auth can-i create deployments -n ci --as=system:serviceaccount:ci:builder`."
   ],
   [
    "Which signerName and usage does a CSR for a kubectl user need?",
    "signerName kubernetes.io/kube-apiserver-client with the usage client auth."
   ]
  ]
 },
 {
  "t": "Node maintenance: cordon, drain, uncordon and PodDisruptionBudgets",
  "hook": "It is Saturday maintenance night at Meadowbrook Hospital. Chris needs to patch the kernel on worker node02, which hosts part of the patient-portal application. The plan is to empty the node, reboot it and bring it back before Sunday's morning rush. Chris runs `kubectl drain node02` and it immediately errors about DaemonSet-managed Pods. He adds a flag, runs it again, and this time it just sits there, printing the same eviction message every few seconds. Is drain broken? Should he force it? Somewhere a rule written by the application team is deliberately standing in his way. What is it, and how does he respect it while still finishing the patch?",
  "simple": "Sometimes a computer in the cluster needs maintenance, like a software update or a new part. Kubernetes gives you three simple commands. Cordon puts up a \"closed for new customers\" sign: apps already running stay, but no new ones are sent there. Drain puts up the sign and then politely asks the running apps to move to other computers. Uncordon takes the sign down when you are done. Application owners can write a rule called a PodDisruptionBudget, which says something like \"always keep at least two copies of my app running.\" Drain obeys that rule, so it waits rather than moving an app if moving it would break the promise. That waiting can look like drain is stuck.",
  "body": [
   "Nodes need maintenance: kernel patches, kubelet upgrades, hardware swaps and reboots. Kubernetes gives you three commands to take a node out of service gracefully and bring it back, plus a policy object that lets application owners limit how much disruption maintenance can cause. The Certified Kubernetes Administrator (CKA) exam uses these constantly, both on their own and as part of cluster upgrades.",
   "`kubectl cordon node01` marks the node unschedulable. It sets `spec.unschedulable: true` on the Node object, which shows up as `Ready,SchedulingDisabled` in the STATUS column of `kubectl get nodes`. Existing Pods keep running; only new Pods are kept away, because the scheduler filters out unschedulable nodes. Use cordon when you want to stop new work landing on a node while you investigate it, for example when a disk is showing errors but has not failed yet.",
   "`kubectl drain node01` cordons the node and then evicts its Pods so their controllers recreate them elsewhere. A Deployment's ReplicaSet notices it is short a replica and creates a new Pod, which the scheduler places on another node. Drain refuses to proceed in some situations, and the flags that override those checks are exam material. DaemonSet Pods cannot be moved, because the DaemonSet would immediately recreate them on the same node, so you add `--ignore-daemonsets` to leave them in place. Pods using emptyDir volumes lose that data when evicted, so drain wants `--delete-emptydir-data` as an acknowledgement. Bare Pods not managed by any controller would be deleted forever with nothing to recreate them, so drain requires `--force` for them. Static Pods are managed by the kubelet from files on disk and are not evicted at all.",
   "When the work is done, `kubectl uncordon node01` makes the node schedulable again and removes SchedulingDisabled from its status. Note that uncordon does not move existing Pods back; Kubernetes does not rebalance automatically. New Pods, and Pods rescheduled for other reasons, will gradually use the node. If you need the load spread evenly right away, you would trigger a rollout, for example with `kubectl rollout restart deployment <name>`.",
   "Drain uses the Eviction API rather than plain deletion, and evictions respect PodDisruptionBudgets (PDBs). A PDB states how many Pods matching a label selector must stay up during voluntary disruptions such as drains: either `minAvailable` or `maxUnavailable`, as a number or a percentage. You set one of the two, not both. Kubernetes continually computes how many disruptions are currently allowed. If evicting a Pod would violate the budget, the API server refuses the eviction, and drain keeps retrying, which can look like drain hanging. That is the PDB protecting your application; it waits until replacement Pods become Ready elsewhere, which frees up budget for the next eviction.",
   "```bash\nkubectl create pdb web-pdb --selector=app=web --min-available=2\nkubectl get pdb   # ALLOWED DISRUPTIONS column\nkubectl drain node01 --ignore-daemonsets --delete-emptydir-data --timeout=120s\n```",
   "Reading `kubectl get pdb` output is the key diagnostic. It shows MIN AVAILABLE or MAX UNAVAILABLE and an ALLOWED DISRUPTIONS column. If ALLOWED DISRUPTIONS is 0, no voluntary eviction of those Pods will succeed until something changes: more replicas become Ready, the budget is loosened, or the Deployment is scaled up. The `--timeout` flag on drain makes it give up after a set time instead of retrying forever, which is useful in scripts. To see exactly which Pods are blocking, `kubectl get pods -o wide --field-selector spec.nodeName=node01` lists what is still running on the node, and `kubectl describe pdb <name>` shows the selector, the current healthy count and the desired healthy count, so you can tell whether the budget is simply waiting for a replacement Pod to become Ready or is configured so tightly that it can never allow an eviction.",
   "PDBs do not protect against involuntary disruptions such as a node crash, a kernel panic or a power failure; they only govern disruptions that go through the Eviction API. A PDB with minAvailable equal to the replica count means zero allowed disruptions, so drains will block forever. The same happens with a single-replica Deployment and minAvailable of 1. If you see `Cannot evict pod as it would violate the pod's disruption budget`, check `kubectl get pdb` and talk to the application owner before reaching for `--disable-eviction`, which makes drain delete Pods directly, bypasses PDBs and should be a deliberate last resort. Often the better fix is to scale the Deployment up temporarily so the budget has room."
  ],
  "analogy": "Draining a node is like closing one checkout lane at a grocery store. Cordon is turning on the \"lane closed\" light: customers already in line are served, but no new ones join. Drain asks those customers to move to other lanes. A PodDisruptionBudget is the store rule \"at least two lanes must stay open,\" so the manager will not close yours if that would leave only one. The analogy stops for crashes: if a register breaks suddenly, the rule cannot prevent it, just as PDBs ignore involuntary disruptions.",
  "terms": [
   [
    "Cordon",
    "Marks a node unschedulable without touching running Pods."
   ],
   [
    "Drain",
    "Cordons a node and evicts its Pods so they are rescheduled elsewhere."
   ],
   [
    "Uncordon",
    "Marks a node schedulable again; existing Pods are not moved back automatically."
   ],
   [
    "PodDisruptionBudget",
    "A policy limiting how many selected Pods can be down at once due to voluntary disruptions."
   ],
   [
    "Eviction API",
    "The API drain uses to remove Pods, which honors PodDisruptionBudgets."
   ]
  ],
  "example": "You drain node02 for a kernel update and the command pauses on a Pod from a 3-replica Deployment whose PDB requires minAvailable 3. `kubectl get pdb` shows 0 allowed disruptions. After agreeing with the app team, you change the PDB to minAvailable 2; the eviction succeeds, the Pod restarts on node03 and drain completes.",
  "mistakes": [
   [
    "Cordon moves Pods off the node.",
    "Cordon only blocks new scheduling. Drain is what evicts existing Pods."
   ],
   [
    "Uncordon moves the evicted Pods back to the node.",
    "Uncordon only allows scheduling again. Pods stay where they are until something reschedules them."
   ],
   [
    "A drain that keeps retrying is broken, so add --force.",
    "--force is for Pods without a controller. Retrying usually means a PDB is blocking eviction; check `kubectl get pdb`."
   ],
   [
    "PodDisruptionBudgets keep Pods alive when a node crashes.",
    "PDBs only limit voluntary disruptions through the Eviction API; they cannot prevent involuntary failures."
   ]
  ],
  "tryit": [
   [
    "You run `kubectl drain node03 --ignore-daemonsets` and drain stops with an error naming a Pod called `debug-shell` that is not managed by a ReplicationController, ReplicaSet, Job, DaemonSet or StatefulSet. The Pod's owner says it is a throwaway troubleshooting Pod. What do you do?",
    "Add `--force` so drain deletes the unmanaged Pod. The flag exists because such Pods will not be recreated anywhere, so drain wants explicit consent. Confirm the owner is fine losing it, then rerun drain with --force."
   ],
   [
    "An application runs 2 replicas with a PDB of maxUnavailable 0. You must drain the node hosting one replica tonight, and the app team is unreachable. What is the safest way to proceed without bypassing the PDB?",
    "Scaling up does not help here: maxUnavailable 0 means zero voluntary evictions are ever allowed, no matter how many replicas run. The only ways through are changing the PDB, which needs the app team's approval, or bypassing it with --disable-eviction. The safe choice is to postpone the drain or escalate for approval rather than overriding a protection the owners set deliberately."
   ]
  ],
  "tip": "The exam often wants `kubectl drain <node> --ignore-daemonsets` (plus --delete-emptydir-data if needed). If drain errors about DaemonSet-managed Pods, you forgot --ignore-daemonsets; if it complains about unmanaged Pods, it needs --force.",
  "check": [
   [
    "What is the difference between cordon and drain?",
    "Cordon only blocks new scheduling; drain also evicts the node's existing Pods."
   ],
   [
    "Why might kubectl drain appear to hang?",
    "An eviction would violate a PodDisruptionBudget, so drain keeps retrying until the budget allows it."
   ],
   [
    "Which drain flag is needed when a node runs DaemonSet Pods, and why?",
    "--ignore-daemonsets, because DaemonSet Pods would be recreated on the same node, so drain leaves them in place."
   ],
   [
    "Does a PodDisruptionBudget protect against a node losing power?",
    "No. PDBs only govern voluntary disruptions that use the Eviction API."
   ]
  ]
 },
 {
  "t": "Helm (repo add/update, upgrade --install, --version, values) and Kustomize (kubectl apply -k) for installing cluster components",
  "hook": "Taylor at Granite Ridge Bank has two tickets on the same morning. The first: install an ingress controller from the vendor's Helm chart, pinned to a specific chart version, with two replicas, in its own namespace. The second: deploy the team's in-house metrics app, which is just a folder of plain YAML, into a `monitoring` namespace with a newer image tag, without editing the original files the developers keep in Git. Last time someone installed a chart by hand they forgot which values they set, and nobody could reproduce it. Which tool fits each ticket, and how does Taylor make both installs repeatable so the next person gets exactly the same result?",
  "simple": "Installing software into Kubernetes usually means applying many configuration files at once. Two tools make this easier. Helm is like an app store with installers: a chart is a package with fill-in-the-blank templates and a list of default settings, and you change only the settings you care about, such as how many copies to run. Each install is called a release, and Helm remembers its history so you can roll back. Kustomize takes plain configuration files and applies a list of changes on top, like sticky notes saying \"put this in the monitoring area\" or \"use version 2.1\", without touching the originals. It is built into kubectl, so `kubectl apply -k` runs it.",
  "body": [
   "Many cluster components, such as ingress controllers, metrics-server, CNI (Container Network Interface) plugins and operators, are distributed as Helm charts or Kustomize bases. The Certified Kubernetes Administrator (CKA) exam expects you to install and configure them with both tools, so it is worth knowing the handful of commands that do most of the work and the small details, such as chart versus app versions, that trip people up.",
   "Helm is a package manager for Kubernetes. A chart is a templated bundle of manifests with a `values.yaml` file of defaults. Installing a chart renders the templates with your values and creates a release, a named instance tracked by Helm in the target namespace with its own revision history. First register a chart repository and refresh the local index: `helm repo add <name> <repo-url>` and `helm repo update`. Forgetting `repo update` is a common reason a version you know exists does not show up. `helm search repo <keyword>` finds charts, and `helm search repo <chart> --versions` lists chart versions alongside the app version each one ships.",
   "The most useful single command is `helm upgrade --install`: it installs the release if it does not exist and upgrades it if it does, which makes scripts and exam answers idempotent, meaning safe to run more than once. `--version` pins the chart version; this is the chart's own version, which may differ from the application's version shown in the APP VERSION column. `-n` picks the namespace and `--create-namespace` creates it if missing. Override values with `-f my-values.yaml` or `--set key=value`; later sources win over earlier ones, and `--set` takes precedence over values files.",
   "Before installing, look at what you can configure. `helm show values <chart>` prints the chart's default values, which tells you the exact key names, such as `controller.replicaCount`, so your `--set` actually matches something. A misspelled key is silently ignored, leaving the default in place, which is why checking the rendered result matters. `helm template` renders manifests locally without installing, and `helm get values <release>` shows the values a release was installed with, which solves the \"nobody remembers what we set\" problem.",
   "```bash\nhelm show values ingress-nginx/ingress-nginx > defaults.yaml\nhelm upgrade --install ingress ingress-nginx/ingress-nginx \\\n  -n ingress --create-namespace --version <chart-version> \\\n  --set controller.replicaCount=2\nhelm list -A\nhelm get values ingress -n ingress\nhelm history ingress -n ingress && helm rollback ingress 1 -n ingress\n```",
   "After installing, `helm list -A` shows releases in all namespaces with their status, revision, chart and app version. `helm history` lists each revision, and `helm rollback <release> <revision>` returns to an earlier one by creating a new revision with the old configuration. `helm uninstall <release> -n <namespace>` removes the release and the resources it created. Helm stores release information as Secrets in the release's namespace, which is why releases are namespaced and why `helm list` without `-A` only shows the current namespace. If an install fails halfway, `helm status <release> -n <namespace>` shows its state, and rerunning the same `helm upgrade --install` command after fixing the values is usually all you need.",
   "Kustomize takes a different approach: no templates, just plain YAML plus a `kustomization.yaml` that lists `resources` and applies transformations, such as setting a `namespace`, adding a `namePrefix` or `nameSuffix`, adding labels, changing `images` tags, applying `patches` or generating ConfigMaps and Secrets with `configMapGenerator` and `secretGenerator`. It is built into kubectl. `kubectl kustomize <dir>` prints the rendered result and `kubectl apply -k <dir>` applies it. Overlays, for example `overlays/prod`, reference a shared `base` in their resources list and patch only what differs per environment, such as replica counts or resource limits, so the base stays untouched.",
   "```yaml\n# kustomization.yaml\nresources:\n  - deployment.yaml\n  - service.yaml\nnamespace: monitoring\nimages:\n  - name: metrics-app\n    newTag: \"2.1\"\n```",
   "Choose Helm when a vendor ships a chart and you mainly need to set values; choose Kustomize when you have plain manifests and need repeatable edits. They can be combined, but for the exam just be fluent with each: inspect values before installing, pin versions, and verify with `helm list` or `kubectl get` afterwards. Also note that Kustomize's `namespace` field sets the namespace on resources but does not create the Namespace object unless you include one in the resources, so create it first or add a namespace manifest."
  ],
  "analogy": "Helm is like ordering a custom pizza from a menu: the chart is the recipe, values are your topping choices, and the release is the specific pizza delivered to your table, with a receipt you can reorder from. Kustomize is like taking a store-bought pizza and adding your own toppings before baking, leaving the original recipe unchanged. The analogy stops at rollback: Helm keeps every past order and can bring back an earlier one, while Kustomize keeps no history of its own and relies on your files, usually in version control.",
  "terms": [
   [
    "Chart",
    "A Helm package of templated Kubernetes manifests with default values."
   ],
   [
    "Release",
    "A named, installed instance of a chart in a namespace, with its own revision history."
   ],
   [
    "helm upgrade --install",
    "Installs a release if absent or upgrades it if present."
   ],
   [
    "Chart version",
    "The version of the chart package, pinned with --version; separate from the app version it deploys."
   ],
   [
    "kustomization.yaml",
    "The Kustomize file listing resources and transformations; applied with kubectl apply -k."
   ],
   [
    "Overlay",
    "A Kustomize directory that references a base and patches only the differences for one environment."
   ]
  ],
  "example": "A task asks you to install a chart at chart version 4.x into namespace `ingress` with two controller replicas. You run `helm repo update`, confirm the exact version with `helm search repo --versions`, then `helm upgrade --install` with --version, -n, --create-namespace and --set. `helm list -n ingress` shows the release deployed.",
  "mistakes": [
   [
    "`--version` sets the application version you want to run.",
    "--version pins the chart version. The app version is whatever that chart version ships; check both with `helm search repo --versions`."
   ],
   [
    "`helm list` with no flags shows every release in the cluster.",
    "It shows only the current namespace. Use `helm list -A` to see all namespaces."
   ],
   [
    "Kustomize edits the original YAML files in place.",
    "Kustomize renders a new output from the originals plus kustomization.yaml; the source files are untouched."
   ],
   [
    "`kubectl apply -f` on a directory with a kustomization.yaml runs Kustomize.",
    "You need `kubectl apply -k <dir>` (or `kubectl kustomize` to preview) for Kustomize to process the file."
   ]
  ],
  "tryit": [
   [
    "You run `helm upgrade --install web bitnami/nginx -n web --set replicaCount=3` and get an error that namespace web was not found. Later, `helm list` shows nothing even after the install succeeds. What two things went wrong?",
    "First, the namespace did not exist; add `--create-namespace` or create it beforehand. Second, `helm list` defaults to the current namespace, so the release in web is not shown; use `helm list -n web` or `helm list -A`."
   ],
   [
    "A base folder contains deployment.yaml for an app with image `shop:1.0`. You need a prod variant in namespace `shop-prod` using image tag 1.4 and 5 replicas, without changing the base. How do you structure it?",
    "Create overlays/prod/kustomization.yaml that lists the base under resources, sets `namespace: shop-prod`, uses `images` with name shop and newTag 1.4, and adds a patch setting replicas to 5. Preview with `kubectl kustomize overlays/prod` and apply with `kubectl apply -k overlays/prod`."
   ]
  ],
  "tip": "Helm releases are namespaced: `helm list` shows only the current namespace, so use `helm list -A` when a release seems missing. And --version refers to the chart version, not the app version.",
  "check": [
   [
    "Why prefer `helm upgrade --install` over `helm install` in automation?",
    "It succeeds whether or not the release already exists."
   ],
   [
    "How do you preview what a Kustomize directory will produce without applying it?",
    "Run `kubectl kustomize <dir>`."
   ],
   [
    "How do you find the correct key names to override in a chart?",
    "Run `helm show values <chart>` to print its default values file."
   ],
   [
    "Which command returns a Helm release to an earlier revision?",
    "`helm rollback <release> <revision> -n <namespace>`, after checking `helm history`."
   ]
  ]
 },
 {
  "t": "Extension interfaces: CRI (containerd, CRI-O, crictl), CNI (Calico, Cilium, Flannel), CSI drivers",
  "hook": "It is late on a Thursday and Rosa, the only platform engineer at Bluefield Veterinary Group, has three tickets open at once. The appointment app's new Pods on node02 have sat in ContainerCreating for twenty minutes. A developer says the database's PersistentVolumeClaim has been Pending since lunch. And on node03, `kubectl logs` just hangs. All three look like 'Kubernetes is broken', but Kubernetes itself never runs a container, wires a network or attaches a disk. It hands those jobs to plugins through three standard interfaces. If Rosa can tell which interface each symptom belongs to, she knows exactly which node, which directory and which tool to check first. Which plugin is failing behind each ticket?",
  "simple": "Kubernetes is like a building manager who never does the plumbing, wiring or locksmith work personally. Instead, there are three standard ways to call in a specialist. The container runtime is the specialist that actually starts and stops containers; Kubernetes talks to it through the Container Runtime Interface. The network plugin gives each app its own network address and connects it to the others; that is the Container Network Interface. The storage driver creates disks and plugs them into the right machine; that is the Container Storage Interface. Because each job has a standard 'phone line', you can swap one specialist for another without changing Kubernetes. When something breaks, the first question is simply: is this a running, networking or storage problem?",
  "body": [
   "Kubernetes is deliberately modest about what it does itself. It stores desired state, schedules Pods and runs controllers, but it does not run containers, wire networks or attach disks. Instead it defines standard interfaces and lets plugins do that work. Knowing the three interfaces, and where each one lives on a node, tells you where to look when something below the application programming interface (API) breaks. On the Certified Kubernetes Administrator (CKA) exam, this knowledge turns a vague symptom into a short list of things to check.",
   "The first interface is the Container Runtime Interface (CRI). It is a gRPC (a remote procedure call framework) API between the kubelet and a container runtime. When the kubelet decides a Pod should run, it asks the runtime over CRI to create a Pod sandbox, pull images and start containers. containerd and CRI-O are the common CRI runtimes. Docker Engine is no longer supported directly by the kubelet since dockershim was removed, so on a modern cluster you will almost always find containerd or CRI-O. The kubelet is pointed at the runtime's socket, such as `unix:///run/containerd/containerd.sock` for containerd or `unix:///var/run/crio/crio.sock` for CRI-O. If that socket is wrong or the runtime service is stopped, the kubelet cannot start anything and the node usually turns NotReady, so `systemctl status containerd` and `journalctl -u kubelet` are natural first checks.",
   "`crictl` is the CRI debugging tool, and it works even when the API server is down because it talks to the local runtime rather than to the cluster. That makes it your eyes on a node when kubectl cannot help, for example when a static Pod such as kube-apiserver keeps crashing. Configure its endpoint in `/etc/crictl.yaml` with a `runtime-endpoint:` line pointing at the runtime socket. Key commands are `crictl ps -a` (containers, including exited ones), `crictl pods`, `crictl images`, `crictl logs <container-id>`, `crictl inspect <id>` and `crictl rmi --prune` to remove unused images. Note that crictl works with container IDs, not Pod names, so you usually find the ID with `crictl ps -a | grep <name>` first. It is not meant for building images or creating long-lived workloads; it is an inspection and troubleshooting tool.",
   "The second interface is the Container Network Interface (CNI). It specifies how a runtime asks a plugin to give a Pod's network namespace an interface and an IP address, and how to clean up afterwards. The kubelet and runtime read network configuration from `/etc/cni/net.d/` and run plugin binaries from `/opt/cni/bin/`. If that configuration directory is empty or holds a broken file, Pods fail with sandbox network errors such as 'network plugin is not ready: cni config uninitialized', and nodes report NotReady. Most CNI plugins install themselves as a DaemonSet whose Pod on each node writes the config file and copies the binaries, which is why a crashing CNI agent on one node breaks networking only on that node.",
   "The exam expects you to recognize the main CNI plugins and their trade-offs. Calico offers routed networking, optionally using the Border Gateway Protocol (BGP) to share routes, or overlay modes, and it has full NetworkPolicy support. Cilium uses eBPF (extended Berkeley Packet Filter, programs that run safely inside the Linux kernel) for networking, policy and observability, and it can even replace kube-proxy. Flannel is a simple overlay, commonly using Virtual Extensible LAN (VXLAN), that is easy to install but does not enforce NetworkPolicies on its own. That last point matters: a NetworkPolicy object is accepted by the API server on any cluster, but it only has an effect if the CNI plugin enforces it.",
   "The third interface is the Container Storage Interface (CSI). It lets storage vendors ship drivers outside the Kubernetes codebase, so a new storage system does not need changes to Kubernetes itself. A CSI driver usually has two parts. The controller component runs as a Deployment or StatefulSet and creates, deletes, attaches and snapshots volumes, helped by sidecar containers such as the external provisioner and external attacher. The node component runs as a DaemonSet and mounts volumes on each node so containers can use them. You can list installed drivers with `kubectl get csidrivers` and see which drivers each node has registered with `kubectl get csinodes`. A StorageClass names its CSI driver in the `provisioner` field, so a typo there means no driver ever picks up the claim.",
   "Putting the three together gives you a quick triage map. CRI problems show up as containers that will not start at all, a node that goes NotReady, or kubelet logs complaining about the runtime; check the runtime service and use crictl. CNI problems show up as Pods stuck in ContainerCreating with network sandbox events, Pods that cannot reach each other, or a NotReady node after a fresh install; check `/etc/cni/net.d/`, `/opt/cni/bin/` and the CNI DaemonSet Pods. CSI problems show up as PersistentVolumeClaims (PVCs) stuck Pending, or Pods with FailedAttachVolume or FailedMount events; check the StorageClass provisioner, the driver's controller Pods and the node plugin on the affected node.",
   "A final operational habit ties these together: always read the events. `kubectl describe pod` tells you which stage failed, whether it was creating the sandbox (often CNI), pulling and starting containers (CRI) or mounting volumes (CSI). The event wording usually names the plugin or socket involved, which saves you from guessing and points you to the right node and directory."
  ],
  "analogy": "Think of Kubernetes as a general contractor who never picks up a tool. It hires a builder (the CRI runtime) to put up rooms, an electrician (the CNI plugin) to wire each room into the building's network, and a plumber (the CSI driver) to connect water tanks. Each trade follows a standard contract, so you can swap one electrician for another. The analogy stops where policy is concerned: some electricians (Flannel) wire rooms but will not install locks, so a NetworkPolicy you write is simply ignored.",
  "terms": [
   [
    "CRI",
    "Container Runtime Interface: the gRPC interface the kubelet uses to control container runtimes such as containerd and CRI-O."
   ],
   [
    "crictl",
    "A command-line client for CRI runtimes, used for node-level debugging; it works without the API server."
   ],
   [
    "CNI",
    "Container Network Interface: the specification and plugins that configure Pod network interfaces and IP addresses, with config in /etc/cni/net.d and binaries in /opt/cni/bin."
   ],
   [
    "CSI",
    "Container Storage Interface: the standard interface for out-of-tree storage drivers that provision, attach and mount volumes."
   ],
   [
    "CSIDriver / CSINode",
    "API objects that list installed CSI drivers and the drivers registered on each node."
   ],
   [
    "eBPF",
    "Extended Berkeley Packet Filter, a way to run safe programs in the Linux kernel; Cilium uses it for networking and policy."
   ]
  ],
  "example": "New Pods on node02 stay in ContainerCreating with an event saying the network plugin is not ready. On node02 you find `/etc/cni/net.d/` empty because the CNI DaemonSet Pod there is crashing. Fixing the DaemonSet's toleration lets it run, it writes the config, and the Pods start.",
  "mistakes": [
   [
    "Believing the kubelet still talks to Docker Engine directly, so `docker ps` is the way to inspect containers on a node.",
    "dockershim was removed, and kubelets use a CRI runtime such as containerd or CRI-O. Use `crictl ps -a` to inspect containers on the node."
   ],
   [
    "Assuming a NetworkPolicy works on every cluster because `kubectl apply` accepted it.",
    "The API server stores the object regardless. Enforcement comes from the CNI plugin; Flannel alone does not enforce NetworkPolicy, while Calico and Cilium do."
   ],
   [
    "Blaming the scheduler or the image when Pods are stuck in ContainerCreating with sandbox network errors.",
    "Sandbox network errors point to the CNI layer. Check `/etc/cni/net.d/`, `/opt/cni/bin/` and the CNI DaemonSet Pod on that node."
   ],
   [
    "Treating a PVC stuck Pending as a Pod problem.",
    "A Pending PVC is a storage provisioning issue. Check the StorageClass `provisioner` name against `kubectl get csidrivers` and look at the CSI controller Pods."
   ]
  ],
  "tryit": [
   [
    "The API server static Pod on cp1 keeps restarting, so every kubectl command times out. You need to see why the container exits. Which tool do you use, and roughly how?",
    "Use crictl on cp1, because it talks to the local runtime over the CRI socket and does not need the API server. Run `crictl ps -a | grep kube-apiserver` to find the exited container ID, then `crictl logs <id>` to read its error, which often points to a bad flag or path in the static Pod manifest."
   ],
   [
    "A team applies a NetworkPolicy that should block all ingress to their namespace, yet test Pods in other namespaces can still connect. The cluster uses Flannel as its only CNI plugin. What is the most likely explanation?",
    "Flannel does not enforce NetworkPolicy on its own, so the policy is stored but has no effect. The fix is a policy-enforcing CNI such as Calico or Cilium (or a combination that adds enforcement), not rewriting the policy."
   ]
  ],
  "tip": "If kubectl is unavailable, crictl is your eyes on the node. Remember Flannel alone does not enforce NetworkPolicy; a policy that seems ignored may simply have no enforcing CNI. Map symptoms quickly: containers will not start means CRI, ContainerCreating with network errors means CNI, PVC Pending or mount failures means CSI.",
  "check": [
   [
    "Which directories hold CNI configuration and plugin binaries on a node?",
    "/etc/cni/net.d for configuration and /opt/cni/bin for binaries."
   ],
   [
    "Why does crictl still work when the API server is down?",
    "It talks directly to the local container runtime over the CRI socket, not to the API server."
   ],
   [
    "Where does a StorageClass name the CSI driver that should provision its volumes?",
    "In its provisioner field, which must match an installed driver listed by kubectl get csidrivers."
   ]
  ]
 },
 {
  "t": "CustomResourceDefinitions, custom resources and operators (CRD plus controller)",
  "hook": "Jamal at Northwind Ferry Lines has been asked to install a certificate operator so the booking site's TLS certificates renew themselves. He copies a sample `Certificate` manifest from the team wiki, runs `kubectl apply`, and gets back a terse error: no matches for kind Certificate. Kubernetes has never heard of a Certificate. A colleague shrugs and says to 'just install the operator first', but which part is the operator: the YAML file full of schema definitions, the Deployment, or both? And a week later, when someone wants to tidy up by deleting 'that big CRD file', will the booking site's certificates quietly vanish with it?",
  "simple": "Out of the box, Kubernetes knows certain kinds of things, such as Pods, Services and Deployments. A CustomResourceDefinition, or CRD, teaches it a brand-new kind of thing, for example 'Backup'. After that, you can create Backup objects just like Pods, and Kubernetes stores them safely. But storing a Backup object does nothing on its own; it is like filling in a work order form and putting it in a tray. Something has to read the tray and do the work. That something is a controller, a small program that watches those objects and makes reality match them. A CRD plus its controller, packaged to run a specific application for you, is called an operator.",
  "body": [
   "The Kubernetes API is extensible, and CustomResourceDefinitions are the main way administrators extend it. A CustomResourceDefinition (CRD) teaches the API server about a new resource type. From then on you can create objects of that type, called custom resources, with kubectl, store them in etcd and protect them with role-based access control (RBAC), exactly like built-in objects. They show up in `kubectl get`, `kubectl describe` and `kubectl explain`, and they can be namespaced or cluster-wide.",
   "A CRD lives in the `apiextensions.k8s.io/v1` API group. Its name must be `<plural>.<group>`, for example `backups.example.com`; the API server rejects a CRD whose name does not match its spec. The spec declares the `group`, the `names` (plural, singular, kind and optional shortNames), the `scope` (Namespaced or Cluster) and one or more `versions`. Each version says whether it is `served` through the API, exactly one version is marked `storage: true` (the version written to etcd), and each has an OpenAPI v3 `schema` that the API server uses to validate objects. If a custom resource does not fit the schema, for example a number where a string is required, the API server rejects it at creation time.",
   "```yaml\napiVersion: apiextensions.k8s.io/v1\nkind: CustomResourceDefinition\nmetadata:\n  name: backups.example.com\nspec:\n  group: example.com\n  scope: Namespaced\n  names: {plural: backups, singular: backup, kind: Backup, shortNames: [bk]}\n  versions:\n  - name: v1\n    served: true\n    storage: true\n    schema:\n      openAPIV3Schema:\n        type: object\n        properties:\n          spec:\n            type: object\n            properties:\n              schedule: {type: string}\n```",
   "Once that CRD is applied, a custom resource of kind Backup uses `apiVersion: example.com/v1`, the group plus the version name. The shortName means `kubectl get bk` works as well as `kubectl get backups`. Because scope is Namespaced, each Backup lives in a namespace, and RBAC rules can grant access to the resource `backups` in the API group `example.com` just as they would for Pods in the core group.",
   "A custom resource by itself does nothing; it is just stored data. Behavior comes from a controller that watches those objects and acts on them, the same reconcile loop pattern that the built-in Deployment and ReplicaSet controllers use. A CRD plus a controller that encodes operational knowledge, such as how to deploy, back up, scale or upgrade a particular application, is called an operator. For example, a database operator might watch `Postgres` objects and create StatefulSets, Services and backup Jobs to match each one. The controller usually reports what it has done in the custom resource's `status` field, which is why `kubectl describe` on a custom resource can show progress and conditions.",
   "Operators are normally installed with Helm or by applying manifests, and the install has distinct parts: the CRDs, a namespace, a ServiceAccount with RBAC permissions, and the controller Deployment. Order matters. CRDs must exist before any custom resources that use them are applied, which is why many projects ship them as a separate file or install step. Check the result with `kubectl get crd`, `kubectl api-resources --api-group=example.com`, `kubectl explain backup.spec` and `kubectl get backups -A`. If the controller Pod is not running, custom resources can still be created but nothing happens to them, and their status stays empty.",
   "After applying a CRD, confirm the API server has accepted it before creating objects. `kubectl get crd backups.example.com -o yaml` shows status conditions such as NamesAccepted, meaning the plural, kind and short names do not clash with anything else, and Established, meaning the new endpoint is being served. Apply a custom resource in the same instant as its CRD and you may briefly see an error until Established is True, which is another reason install tools apply CRDs as a separate first step. It is also worth remembering that CRDs are cluster-scoped objects even when the resources they define are namespaced, so creating or deleting a CRD needs cluster-level RBAC permissions, while day-to-day work with namespaced custom resources can be granted per namespace with a Role.",
   "The most common exam error is 'no matches for kind'. It means the API server does not know that kind at the apiVersion you wrote. Either the CRD is not installed yet, or the object's apiVersion does not match the CRD's group and a served version. `kubectl api-resources` shows exactly which kinds, groups and short names the cluster knows, and comparing that output with the manifest usually reveals the mismatch in seconds.",
   "Be careful with deletions. Deleting a CRD deletes every custom resource of that type in the cluster, across all namespaces, so 'cleaning up' a CRD file can wipe real data. Also, if a controller adds finalizers to its custom resources and the controller is removed first, those resources can get stuck in deletion, showing a deletionTimestamp but never disappearing, because nothing is left to do the cleanup and remove the finalizer. The safe order when uninstalling an operator is to delete the custom resources first while the controller is still running, then the controller, then the CRDs."
  ],
  "analogy": "A CRD is like a city council adding a new permit type, say a 'street mural permit', to its official forms. Once the form exists, anyone allowed can file one and the clerk will check that every box is filled in correctly. But a filed form paints nothing. A crew (the controller) must read new permits and do the work. An operator is the permit type plus an expert crew that knows how to paint, repair and remove murals. Unlike real paperwork, abolishing the permit type (deleting the CRD) shreds every permit already filed.",
  "terms": [
   [
    "CustomResourceDefinition",
    "An object in apiextensions.k8s.io/v1 that registers a new resource type with the API server; its name is <plural>.<group>."
   ],
   [
    "Custom resource",
    "An instance of a type defined by a CRD, stored in etcd and managed with kubectl like any object."
   ],
   [
    "Storage version",
    "The one CRD version marked storage: true, which is the version persisted in etcd."
   ],
   [
    "Operator",
    "A controller plus CRDs that automates running a specific application."
   ],
   [
    "Finalizer",
    "A key on an object that blocks its deletion until a controller performs cleanup and removes it."
   ]
  ],
  "example": "A task says to install an operator and create a `Certificate` custom resource. You apply the operator's CRD manifest first, confirm with `kubectl get crd | grep cert`, install the controller, then create the resource. `kubectl describe certificate` shows the controller's status updates, proving it is reconciling.",
  "mistakes": [
   [
    "Thinking that creating a custom resource makes something happen by itself.",
    "A custom resource is only stored data. A controller must watch it and act; without the controller running, nothing changes and status stays empty."
   ],
   [
    "Naming a CRD after its kind, such as `Backup` or `backup.example.com`.",
    "The metadata.name must be the plural name plus the group, such as `backups.example.com`, matching spec.names.plural and spec.group."
   ],
   [
    "Assuming that deleting a CRD leaves existing custom resources untouched.",
    "Deleting a CRD deletes every custom resource of that type in the cluster. Remove custom resources deliberately first if you intend to uninstall."
   ],
   [
    "Fixing 'no matches for kind' by editing the controller Deployment.",
    "That error comes from the API server: the CRD is missing or the apiVersion does not match its group and a served version. Check with `kubectl api-resources`."
   ]
  ],
  "tryit": [
   [
    "You are uninstalling a backup operator. Its custom resources carry a finalizer that the controller removes after cleaning up external snapshots. A teammate plans to delete the controller Deployment first, then the Backup objects, then the CRD. What problem will they hit, and what order is better?",
    "With the controller gone, nothing removes the finalizer, so deleting the Backup objects leaves them stuck with a deletionTimestamp. Better order: delete the custom resources while the controller is running so it can clean up, then delete the controller, then the CRD."
   ],
   [
    "A CRD named `widgets.shop.io` defines version v1 with served: true and storage: true. A manifest uses `apiVersion: shop.io/v1beta1` and `kind: Widget`, and apply fails. Why?",
    "The apiVersion must combine the CRD's group with a served version. Only v1 is served, so the manifest should use `apiVersion: shop.io/v1`."
   ]
  ],
  "tip": "If `kubectl apply` says 'no matches for kind', the CRD is missing or its group/version does not match the object's apiVersion. Use `kubectl api-resources` to see exactly which kinds and groups the cluster knows, and `kubectl explain <kind>.spec` to see the fields its schema allows.",
  "check": [
   [
    "What must a CRD's metadata.name look like?",
    "The plural name followed by the group, such as backups.example.com."
   ],
   [
    "What turns a CRD into an operator?",
    "A controller that watches the custom resources and reconciles real resources to match them."
   ],
   [
    "What happens to existing custom resources if you delete their CRD?",
    "They are all deleted along with it."
   ],
   [
    "How many versions of a CRD can be marked storage: true?",
    "Exactly one; it is the version stored in etcd, while other versions may still be served."
   ]
  ]
 },
 {
  "t": "Deployments and ReplicaSets as self-healing primitives; rolling updates, rollout status, history, undo and restart",
  "hook": "Friday, 4:40 p.m. at Cedar Ridge Pharmacy. Theo pushes version 2.0 of the prescription-refill API with `kubectl set image`, then watches `kubectl rollout status` sit there, not finishing. One new Pod shows ImagePullBackOff. Customers are still refilling prescriptions, so something is keeping the old version alive, but Theo's manager is asking two questions at once: are we down, and how fast can we get back to what worked this morning? Theo knows there is a command that rolls back. He is less sure what it actually changes, whether it is safe, and why the site did not fall over in the first place. What is the Deployment doing behind the scenes?",
  "simple": "A Pod is one running copy of your app. If it dies, it is gone. So instead of creating Pods yourself, you tell Kubernetes 'I always want three copies of this app' by creating a Deployment. The Deployment uses a helper called a ReplicaSet whose only job is to keep the count right: if a copy disappears, it makes a new one. When you change the app, for example to a new version, the Deployment makes a new ReplicaSet and swaps copies over a few at a time, only removing old copies once new ones are ready. It is like replacing light bulbs in a hallway one at a time so the hall never goes dark. If the new version is bad, you can switch back to the old one with one command.",
  "body": [
   "You rarely create bare Pods in production, because a bare Pod that dies or whose node fails is simply gone; nothing recreates it. Instead you create a Deployment, which manages ReplicaSets, which manage Pods. This layering gives you two things the exam tests constantly: self-healing, so the right number of Pods keeps running, and controlled updates, so you can change versions without downtime and roll back when something goes wrong.",
   "A ReplicaSet keeps a set number of Pods matching a label selector running. Its controller continuously compares the desired count with the Pods it actually finds. If a Pod is deleted, is evicted, or is lost with its node, the ReplicaSet controller notices the count is short and creates a replacement from its Pod template. If there are too many, for example after you scale down, it deletes the extras. You can see this ownership with `kubectl get rs` and in each Pod's `ownerReferences`. Pod names reflect the chain: a Pod named `web-7c9f8d6b5-x2kqp` belongs to ReplicaSet `web-7c9f8d6b5`, which belongs to Deployment `web`.",
   "A Deployment sits above that. Each time you change the Deployment's Pod template, such as the image, environment variables or resources, it creates a new ReplicaSet with a new template hash and shifts Pods from the old ReplicaSet to the new one. Old ReplicaSets are kept at zero replicas as history, up to `revisionHistoryLimit`, and each one represents a revision you can return to. Changes outside the Pod template, such as the replica count, do not create a new revision.",
   "The default strategy is RollingUpdate, controlled by `maxSurge` (how many extra Pods may exist above the desired count during the update) and `maxUnavailable` (how many of the desired Pods may be missing), both defaulting to 25 percent. New Pods must become Ready, according to their readiness probe, before old ones are removed, so a broken image stalls the rollout rather than taking the whole app down. The alternative strategy, Recreate, deletes all old Pods before creating new ones. That causes downtime, but it guarantees two versions never run at the same time, which some applications with incompatible data formats require.",
   "```bash\nkubectl create deployment web --image=nginx:1.27 --replicas=3\nkubectl set image deployment/web nginx=nginx:1.28\nkubectl rollout status deployment/web\nkubectl rollout history deployment/web\nkubectl rollout history deployment/web --revision=2\nkubectl rollout undo deployment/web            # back to previous\nkubectl rollout undo deployment/web --to-revision=1\nkubectl rollout restart deployment/web\nkubectl scale deployment/web --replicas=5\n```",
   "Each rollout command has a specific job. `rollout status` waits and reports progress, which is useful for confirming a task is finished before you move on. `rollout history` lists revisions, and `--revision=N` shows the Pod template of one revision. The CHANGE-CAUSE column is filled from the `kubernetes.io/change-cause` annotation, which you can set with `kubectl annotate deployment/web kubernetes.io/change-cause='upgrade to 1.28'`. `rollout undo` rolls back to the previous revision or, with `--to-revision`, a specific one. Under the hood it copies that older template back into the Deployment, which really means scaling the older ReplicaSet back up and the current one down, using the same rolling process.",
   "`rollout restart` adds a timestamp annotation to the Pod template. Because the template changed, the Deployment performs a fresh rolling replacement of every Pod without changing anything else that matters. It is the standard way to make Pods pick up a changed ConfigMap or Secret consumed as environment variables, and to recover from a problem that only a fresh start fixes. `kubectl scale` changes only the replica count, so the ReplicaSet adds or removes Pods without starting a new revision.",
   "Two more controls round out the picture. You can `kubectl rollout pause` a Deployment, make several changes such as a new image and new resource limits, then `rollout resume` so they roll out together as one revision. And if a rollout cannot make progress within `progressDeadlineSeconds` (for example, because new Pods never become Ready), the Deployment's Progressing condition becomes False with the reason ProgressDeadlineExceeded, which `kubectl describe deployment` shows. Kubernetes does not roll back automatically when that happens; it is your signal to investigate and run `rollout undo` if needed.",
   "Labels tie the whole chain together, so they deserve care. The Deployment's `spec.selector` must match the labels in its Pod template, and in the `apps/v1` API the selector cannot be changed after creation. Each ReplicaSet also gets a `pod-template-hash` label, added automatically, so that the old and new ReplicaSets never fight over the same Pods during a rollout. If you create a bare Pod by hand that happens to carry matching labels, the ReplicaSet may count it toward its desired number, which is one more reason to avoid hand-made Pods with production labels.",
   "One last operational rule: never edit a ReplicaSet owned by a Deployment directly. The Deployment controller owns it and will overwrite or replace your change. Make every change on the Deployment and let it manage its ReplicaSets."
  ],
  "analogy": "A Deployment is like a theater's stage manager swapping in a new cast. The current cast is one ReplicaSet; the new cast is another. The manager sends new actors on stage a few at a time and only lets an old actor leave once the replacement is ready, so the show never stops. If the new actors keep forgetting lines, the manager calls the old cast, who are still waiting in the dressing room, back on stage. The analogy breaks slightly: Kubernetes keeps old casts as empty rosters (zero replicas), not as people standing by.",
  "terms": [
   [
    "ReplicaSet",
    "A controller that keeps a specified number of identical Pods matching a selector running."
   ],
   [
    "Deployment",
    "A controller that manages ReplicaSets to provide declarative rolling updates and rollbacks."
   ],
   [
    "maxSurge / maxUnavailable",
    "RollingUpdate settings for extra Pods allowed and Pods allowed to be missing during an update; both default to 25 percent."
   ],
   [
    "Recreate strategy",
    "Deletes all old Pods before creating new ones; causes downtime but never runs two versions together."
   ],
   [
    "revisionHistoryLimit",
    "How many old ReplicaSets a Deployment keeps for rollback."
   ],
   [
    "kubectl rollout restart",
    "Triggers a rolling replacement of all Pods by changing an annotation on the Pod template."
   ]
  ],
  "example": "After `kubectl set image deployment/api api=api:2.0`, `rollout status` hangs with one new Pod in ImagePullBackOff because the tag does not exist. Because RollingUpdate waits for readiness, the old Pods still serve traffic. `kubectl rollout undo deployment/api` returns to the previous ReplicaSet and the failed Pod is removed.",
  "mistakes": [
   [
    "Believing `kubectl scale` or editing replicas creates a new revision you can roll back to.",
    "Only changes to the Pod template create a new ReplicaSet and revision. Scaling just changes the count on the current ReplicaSet."
   ],
   [
    "Thinking a failed rolling update has already taken the app down, so Recreate would have been safer.",
    "RollingUpdate waits for new Pods to be Ready before removing old ones, so a bad image stalls the rollout while old Pods keep serving. Recreate is the strategy that causes downtime."
   ],
   [
    "Editing the ReplicaSet's image directly to fix a bad rollout.",
    "The Deployment owns its ReplicaSets and will override changes. Edit the Deployment or use `kubectl rollout undo`."
   ],
   [
    "Expecting Kubernetes to roll back automatically when progressDeadlineSeconds is exceeded.",
    "It only sets the Progressing condition to False. You decide whether to fix forward or run `rollout undo`."
   ]
  ],
  "tryit": [
   [
    "A Deployment called shop has gone through four revisions. Revision 2 is the last one the team trusts, and the current revision 4 has a bug. A teammate runs `kubectl rollout undo deployment/shop` and assumes they are now on revision 2. Are they?",
    "No. A plain undo goes back to the previous revision, which is 3. To return to revision 2, use `kubectl rollout undo deployment/shop --to-revision=2`, after checking it with `kubectl rollout history deployment/shop --revision=2`."
   ],
   [
    "You need to change both the image and the memory limit of a Deployment, and the team wants only one new revision and one rolling update. How do you do it with imperative commands?",
    "Run `kubectl rollout pause deployment/<name>`, make both changes (for example `kubectl set image` and `kubectl set resources`), then `kubectl rollout resume deployment/<name>`. The changes roll out together as a single revision."
   ]
  ],
  "tip": "Editing a Deployment's replica count does not create a new revision; only changes to the Pod template do. And never edit a ReplicaSet owned by a Deployment directly, because the Deployment will overwrite it. After any change, run `kubectl rollout status` to confirm the task actually finished.",
  "check": [
   [
    "What does kubectl rollout undo actually do under the hood?",
    "It sets the Deployment's Pod template back to an older revision, scaling that ReplicaSet up and the current one down."
   ],
   [
    "How do you force every Pod of a Deployment to be recreated without changing its spec meaningfully?",
    "`kubectl rollout restart deployment/<name>`."
   ],
   [
    "What are the default values of maxSurge and maxUnavailable?",
    "25 percent each."
   ]
  ]
 },
 {
  "t": "DaemonSets and StatefulSets from an operator's point of view, including tolerations for control plane nodes",
  "hook": "Monday morning at Granite Peak Outfitters, the security lead, Ines, sends Kenji a short message: 'Audit says logs from cp1 are missing for the whole weekend.' Kenji checks the log-shipping DaemonSet. It says DESIRED 2, CURRENT 2, READY 2, all healthy. But the cluster has three nodes. Nothing is crashing and nothing is in an error state; one node was simply never given a Pod. In the same week, the inventory team scaled their database StatefulSet down to one replica to save money and now wants to scale back up, nervously asking whether their data is gone. Two controllers, two very different promises. Why did cp1 get skipped, and what happens to the database's disks?",
  "simple": "Most apps are like interchangeable workers: any copy can do the job, and Kubernetes can put them anywhere. Two kinds of apps need something different. Some tools must run on every machine, like a security guard posted at each building entrance; a DaemonSet makes sure each machine gets exactly one copy. Other apps, like databases, need each copy to keep its own name and its own storage, the way each bank teller has their own drawer that nobody else uses. A StatefulSet gives each copy a fixed name such as db-0 and db-1 and its own disk that follows it around. Some machines, like the cluster's control computers, carry a 'keep out' sign, so a DaemonSet must be told it is allowed in.",
  "body": [
   "Deployments suit stateless, interchangeable Pods that can run anywhere and be replaced by any other copy. Two other controllers cover cases Deployments do not: DaemonSets, which run one Pod per node, and StatefulSets, which give Pods stable identities and storage. From an administrator's point of view, each has its own common failure, and the exam likes both.",
   "A DaemonSet ensures that every eligible node runs exactly one copy of a Pod. When a node joins the cluster, the DaemonSet adds a Pod to it; when a node is removed, that Pod goes with it. There is no replica count to set, because the number of Pods follows the number of eligible nodes. This is how node-level agents are deployed: kube-proxy, CNI agents, log shippers, monitoring exporters and Container Storage Interface (CSI) node plugins. You can limit a DaemonSet to some nodes with a nodeSelector or node affinity in its Pod template, for example only nodes labeled `gpu=true`. DaemonSets support the RollingUpdate update strategy, which is the default, and OnDelete, where a new Pod template takes effect only when you delete each old Pod yourself.",
   "The word 'eligible' is where the operator's work lies. Control plane nodes on kubeadm clusters carry the taint `node-role.kubernetes.io/control-plane:NoSchedule`. A DaemonSet whose Pods do not tolerate it will skip those nodes, so `kubectl get ds` shows fewer desired Pods than you have nodes, while still reporting everything as healthy. If an agent must also run on control plane nodes, such as a log shipper or a security monitor, add a toleration to the Pod template.",
   "```yaml\nspec:\n  template:\n    spec:\n      tolerations:\n      - key: node-role.kubernetes.io/control-plane\n        operator: Exists\n        effect: NoSchedule\n```",
   "The DaemonSet controller also adds some tolerations automatically, for example for not-ready, unreachable and resource pressure conditions, so node agents are not evicted when a node struggles; those agents are often what you need to diagnose the struggling node. There is no `kubectl create daemonset` shortcut. A quick exam trick is to run `kubectl create deployment agent --image=<image> --dry-run=client -o yaml > ds.yaml`, then change the kind to DaemonSet and remove `replicas` and `strategy` (and the empty `status`) before applying it.",
   "A StatefulSet manages Pods that need a stable identity. Pods are named with an ordinal, `db-0`, `db-1`, `db-2`, and by default they are created in order, each waiting for the previous one to be Running and Ready, and removed in reverse order. A StatefulSet requires a headless Service, one with `clusterIP: None`, named in its `serviceName` field. That Service gives each Pod a stable Domain Name System (DNS) name such as `db-0.db.prod.svc.cluster.local`, following the pattern pod-name, service name, namespace, `svc.cluster.local`. Clients and peers can therefore always reach a specific member, which databases use to find their primary or their replication partners.",
   "Storage is the other half of identity. A StatefulSet's `volumeClaimTemplates` create one PersistentVolumeClaim (PVC) per Pod, named after the template and the Pod, like `data-db-0`. If `db-0` is deleted or rescheduled to another node, its replacement has the same name and reattaches the same claim, so it finds the same data. This is fundamentally different from a Deployment, where all replicas share whatever volumes the template names.",
   "Operationally, scaling a StatefulSet down removes the highest ordinals first and, by default, leaves their PVCs in place, so data survives a later scale-up and `db-2` picks up `data-db-2` again. That also means storage is not freed automatically; you delete leftover PVCs yourself if you really want the data gone. Rolling updates proceed from the highest ordinal to the lowest, one Pod at a time, and a `partition` value under `updateStrategy.rollingUpdate` lets you update only ordinals at or above that number, a simple way to canary a new version on one member before the rest.",
   "Both controllers report rollout progress the same way Deployments do. `kubectl rollout status ds/<name>` and `kubectl rollout status sts/<name>` wait until every Pod runs the current template, and `kubectl rollout undo` works for both. For DaemonSets, read the `kubectl get ds` columns carefully: DESIRED is the number of eligible nodes, CURRENT is how many Pods exist, READY is how many pass readiness, UP-TO-DATE is how many run the latest template, and the NODE SELECTOR column reminds you whether the DaemonSet is restricted to labeled nodes. For StatefulSets, keeping PVCs on scale-down is the default behavior; newer Kubernetes releases add a `persistentVolumeClaimRetentionPolicy` field that can change what happens to claims when the StatefulSet is scaled or deleted, but unless someone has set it, expect the claims to remain.",
   "When a StatefulSet Pod will not start, check its PVC and the node its volume is tied to, because storage is the most common cause. A PVC stuck Pending, a volume bound to a zone where no node is available, or a node that still holds the volume attached can all leave a Pod Pending or ContainerCreating. Because Pods start in order by default, one stuck `db-0` also blocks `db-1` and `db-2` from being created, which is why a StatefulSet showing 0/3 often has only one real problem."
  ],
  "analogy": "A DaemonSet is like a fire extinguisher policy: every floor gets exactly one, added automatically when a new floor is built. Floors marked 'restricted' (tainted control plane nodes) are skipped unless the policy explicitly includes them. A StatefulSet is like numbered hotel rooms with personal safes: guest 0 always returns to room 0 and finds the same safe, even after checking out and back in. The analogy stops at cleanup: when the hotel closes rooms (scales down), the safes stay locked and full until someone deliberately removes them.",
  "terms": [
   [
    "DaemonSet",
    "A controller that runs one copy of a Pod on each eligible node, with RollingUpdate or OnDelete updates."
   ],
   [
    "StatefulSet",
    "A controller giving Pods stable ordinal names, stable DNS and per-Pod persistent storage."
   ],
   [
    "Headless Service",
    "A Service with clusterIP None that publishes individual Pod DNS records, required by StatefulSets."
   ],
   [
    "volumeClaimTemplates",
    "The StatefulSet field that creates one PVC per Pod, such as data-db-0."
   ],
   [
    "partition",
    "A StatefulSet rolling update setting that updates only Pods with an ordinal at or above the given number."
   ],
   [
    "Control plane taint",
    "node-role.kubernetes.io/control-plane:NoSchedule, which keeps ordinary Pods off control plane nodes."
   ]
  ],
  "example": "A log-shipping DaemonSet shows DESIRED 2 in a three-node cluster. The missing node is the control plane, which is tainted. Adding a toleration for node-role.kubernetes.io/control-plane with operator Exists raises DESIRED to 3 and a Pod appears on cp1.",
  "mistakes": [
   [
    "Expecting a DaemonSet with DESIRED lower than the node count to show errors or Pending Pods.",
    "Nodes the DaemonSet cannot run on are simply not counted. Compare node taints and labels with the Pod template's tolerations and nodeSelector."
   ],
   [
    "Believing scaling a StatefulSet down deletes the removed Pods' PVCs and data.",
    "By default the PVCs are kept, so scaling back up reattaches the same data. You must delete leftover PVCs yourself."
   ],
   [
    "Using a normal ClusterIP Service for a StatefulSet and expecting per-Pod DNS names.",
    "Per-Pod records such as db-0.db.prod.svc.cluster.local come from a headless Service (clusterIP: None) named in serviceName."
   ],
   [
    "Thinking StatefulSet rolling updates start with db-0.",
    "They go from the highest ordinal to the lowest, and partition limits updates to ordinals at or above a number."
   ]
  ],
  "tryit": [
   [
    "A StatefulSet named cache in namespace web has three replicas and shows 0/3 ready. Only cache-0 exists, stuck Pending, and its PVC data-cache-0 is also Pending. Why do cache-1 and cache-2 not exist at all, and where do you look first?",
    "With the default ordered Pod management, the controller waits for cache-0 to be Running and Ready before creating cache-1. The root cause is cache-0's unbound PVC, so check `kubectl describe pvc data-cache-0` and its StorageClass."
   ],
   [
    "Your team wants to test a new version of a five-member StatefulSet on just one Pod first. Which setting do you use, and which Pod gets the update?",
    "Set `updateStrategy.rollingUpdate.partition: 4`. Only ordinals at or above 4 are updated, so only the Pod ending in -4 gets the new version until you lower the partition."
   ]
  ],
  "tip": "When a DaemonSet has fewer Pods than nodes, compare node taints (`kubectl describe node | grep -i taint`) with the Pod template's tolerations and nodeSelector before anything else. For StatefulSets, a stuck Pod is usually a storage problem: describe its PVC.",
  "check": [
   [
    "What DNS name does Pod web-1 of a StatefulSet with serviceName web in namespace shop get?",
    "web-1.web.shop.svc.cluster.local."
   ],
   [
    "What happens to PVCs when you scale a StatefulSet down, by default?",
    "They are kept, so the data is reattached if you scale back up."
   ],
   [
    "How can you quickly produce a DaemonSet manifest when there is no kubectl create daemonset command?",
    "Generate a Deployment with --dry-run=client -o yaml, change kind to DaemonSet, and remove replicas and strategy."
   ]
  ]
 },
 {
  "t": "ConfigMaps and Secrets: creation, env and volume consumption, immutable objects, restarting workloads after changes",
  "hook": "At Maple Lane Credit Union, a developer named Farah opens a ticket at 9:15 a.m.: the loan portal is flooding the logs with debug messages and filling the disk. She already changed LOG_LEVEL from debug to info in the ConfigMap twenty minutes ago, and `kubectl get configmap` proves it. Yet the logs keep pouring in. Meanwhile, an auditor reviewing the same namespace asks why the database password is 'stored in plain text' in a Secret, and Farah insists Secrets are encrypted. You are the administrator on duty. One of these problems is about when containers read their settings; the other is about what a Secret really protects. Who is right, and how do you make the new setting take effect?",
  "simple": "Apps need settings, like which log level to use or which password opens the database. Instead of baking these into the app's image, Kubernetes stores them separately. A ConfigMap holds ordinary settings; a Secret holds sensitive ones like passwords. The app can receive them in two ways: as environment variables, which are read once when the app starts, like a note handed to a worker at the start of a shift, or as files in a folder, which Kubernetes can quietly update later, like a notice board someone refreshes. If you change a setting that was handed over as a note, the worker will not see it until they start a new shift, which in Kubernetes means restarting the Pods.",
  "body": [
   "ConfigMaps and Secrets separate configuration from container images, so the same image can run in development and production with different settings. A ConfigMap holds non-sensitive key-value data, such as feature flags, log levels or whole configuration files. A Secret holds sensitive values such as passwords, tokens and Transport Layer Security (TLS) keys. The important caveat is that Secret data is only base64-encoded, which is not encryption; anyone who can read the Secret object can decode it in one command. Protect Secrets with role-based access control (RBAC) that limits who can get or list them, and ideally with encryption at rest configured on the API server so the values are encrypted in etcd.",
   "You can create both objects imperatively from literals, files or env files, which is the fastest approach on the exam. Generic Secrets are the most common type. `tls` Secrets hold a certificate and key under the fixed keys `tls.crt` and `tls.key`. `docker-registry` Secrets hold image pull credentials that a Pod references in `imagePullSecrets`.",
   "```bash\nkubectl create configmap app-cfg --from-literal=MODE=prod --from-file=app.properties\nkubectl create secret generic db-cred --from-literal=user=app --from-literal=password='Str0ngPass'\nkubectl create secret tls web-tls --cert=tls.crt --key=tls.key\nkubectl get secret db-cred -o jsonpath='{.data.password}' | base64 -d\n```",
   "With `--from-file`, the file name becomes the key and the file's contents become the value, which is how you store a complete configuration file. With `--from-env-file`, each `KEY=value` line becomes its own key. The last command above shows why base64 is not protection: reading and decoding the password takes a single pipeline.",
   "Pods consume these objects in two ways. As environment variables, you either reference individual keys with `env[].valueFrom.configMapKeyRef` or `secretKeyRef`, or import every key at once with `envFrom`. As volumes, each key becomes a file in the mount directory, which suits configuration files and certificates; you can pick specific keys with `items` and set file permissions with `defaultMode`. The same object can be consumed both ways by different containers.",
   "```yaml\ncontainers:\n- name: app\n  image: myapp:1.0\n  envFrom:\n  - configMapRef: {name: app-cfg}\n  env:\n  - name: DB_PASSWORD\n    valueFrom: {secretKeyRef: {name: db-cred, key: password}}\n  volumeMounts:\n  - {name: cfg, mountPath: /etc/app, readOnly: true}\nvolumes:\n- name: cfg\n  configMap: {name: app-cfg}\n```",
   "Updates behave differently for each method, and this is a favorite exam distinction. Environment variables are read once when the container starts, so changing the ConfigMap does not affect a running container at all; `kubectl exec <pod> -- env` will keep showing the old value. Volume-mounted ConfigMaps and Secrets are refreshed by the kubelet after a short delay, though the application must re-read the file to notice the change. Volumes mounted with `subPath`, which place a single key at a specific file path, are never updated. The dependable way to apply a change for every method is `kubectl rollout restart deployment/<name>`, which replaces Pods gradually so each new container reads the current values.",
   "Setting `immutable: true` on a ConfigMap or Secret prevents changes to its data. It protects against accidental edits that could break many workloads at once, and it lets the kubelet stop watching the object for updates, which reduces API server load in large clusters. The setting cannot be undone. To change an immutable object you must delete and recreate it, or, more safely, create a new one with a new name such as `app-cfg-v2` and update the workload to reference it, which also triggers a rollout and gives you an easy rollback path.",
   "Inspecting these objects safely is part of the job. `kubectl describe secret db-cred` lists the keys and their sizes in bytes but not the values, which is a reasonable way to confirm a key exists without exposing it on screen. `kubectl get secret db-cred -o yaml` shows the base64 values, so treat that output as sensitive. When a ConfigMap built from files needs changing, a common pattern is to regenerate it with `kubectl create configmap app-cfg --from-file=app.properties --dry-run=client -o yaml | kubectl apply -f -`, which updates the existing object in place instead of failing because it already exists. On the node side, Secret volumes are backed by tmpfs, an in-memory filesystem, so the values are not written to the node disk by the kubelet.",
   "Finally, know the failure modes. If a Pod references a ConfigMap or Secret that does not exist, or a key that is missing, the Pod does not start. For environment variable references you typically see CreateContainerConfigError in `kubectl get pods`; for a missing volume source, the Pod stays in ContainerCreating with FailedMount events. Marking the reference `optional: true` lets the Pod start without it. Order matters too: create the ConfigMap or Secret first, then the workload, or expect a short period of errors until both exist."
  ],
  "analogy": "Environment variables are like a printed schedule handed to staff when they clock in: if the manager changes the schedule at noon, nobody already working sees it until their next shift. A volume-mounted ConfigMap is like a whiteboard in the break room that the manager updates; staff see the change, but only if they actually look at the board again. A subPath mount is a photocopy of one line from that board taped to a locker, which never changes. Restarting the Deployment is ending everyone's shift so they all clock in with the new schedule.",
  "terms": [
   [
    "ConfigMap",
    "An object holding non-confidential configuration as key-value pairs or whole files."
   ],
   [
    "Secret",
    "An object for sensitive data; values are base64-encoded, not encrypted, by default."
   ],
   [
    "envFrom",
    "Imports every key of a ConfigMap or Secret as environment variables."
   ],
   [
    "subPath",
    "A volume mount option that mounts a single key or path; such mounts never receive updates."
   ],
   [
    "Immutable ConfigMap/Secret",
    "An object with immutable: true whose data cannot be changed after creation."
   ],
   [
    "Encryption at rest",
    "API server configuration that encrypts Secret data before it is stored in etcd."
   ]
  ],
  "example": "You update the LOG_LEVEL key in a ConfigMap that a Deployment consumes through envFrom, but the logs are still verbose. Running `kubectl exec` and `env` shows the old value, because env vars are fixed at container start. `kubectl rollout restart deployment/api` brings the new value in.",
  "mistakes": [
   [
    "Believing Secrets are encrypted because their values look scrambled.",
    "They are base64-encoded, which anyone can decode. Real protection comes from RBAC and encryption at rest on the API server."
   ],
   [
    "Expecting a running Pod to pick up a changed ConfigMap that it reads through env or envFrom.",
    "Environment variables are set once at container start. Restart the workload, for example with `kubectl rollout restart`."
   ],
   [
    "Assuming every volume-mounted ConfigMap updates automatically.",
    "Normal volume mounts are refreshed after a delay, but subPath mounts never update, and the app must re-read the file anyway."
   ],
   [
    "Trying to edit an immutable ConfigMap and expecting a later 'mutable: true' edit to unlock it.",
    "immutable: true cannot be reversed. Delete and recreate it, or create a new ConfigMap and point the workload at it."
   ]
  ],
  "tryit": [
   [
    "A Pod mounts a ConfigMap key as `/etc/nginx/nginx.conf` using subPath. You update the ConfigMap and wait ten minutes, but the file inside the container is unchanged. A teammate wants to wait longer. What do you tell them?",
    "Waiting will not help: subPath mounts never receive ConfigMap updates. Restart the Pods, for example with `kubectl rollout restart deployment/<name>`, so new containers mount the current data."
   ],
   [
    "A new Pod shows CreateContainerConfigError. Its spec has an env entry with `secretKeyRef: {name: api-keys, key: token}`. What do you check, and what are two ways to fix it?",
    "Check that Secret api-keys exists in the Pod's namespace and has a key named token (`kubectl get secret api-keys -o yaml`). Fix it by creating the Secret or key, or, if the value is genuinely optional, set `optional: true` on the reference."
   ]
  ],
  "tip": "Env-var consumption never updates live; volume consumption does (except with subPath). If a task says 'make the Pods use the new value', restart the workload. For Secrets, remember that base64 is encoding only, and decode with `base64 -d` when a task asks you to read a value.",
  "check": [
   [
    "Is base64 in a Secret a form of encryption?",
    "No, it is only encoding; anyone who can read the Secret can decode it."
   ],
   [
    "What error might a Pod show when it references a missing ConfigMap key in env?",
    "CreateContainerConfigError, unless the reference is optional."
   ],
   [
    "How do you change data in an immutable ConfigMap?",
    "Delete and recreate it, or create a new ConfigMap and point the workload at it."
   ],
   [
    "Which mount style never receives ConfigMap updates?",
    "A volume mount that uses subPath."
   ]
  ]
 },
 {
  "t": "Resource requests and limits, LimitRange and ResourceQuota as admission controls",
  "hook": "The data team at Riverbend Public Library shares a Kubernetes cluster with the catalog search service. On Tuesday afternoon a new nightly-report Deployment lands in their namespace, and Andre, the administrator, gets two messages within a minute. The data team says their Deployment shows 0/3 ready, yet `kubectl get pods` shows no Pods at all, not even failing ones. The catalog team says their search Pods keep restarting with OOMKilled. Andre suspects both problems trace back to a few lines of YAML about CPU and memory, plus two namespace policies someone set up months ago. Where do the missing Pods go, and why is the kernel killing the search service?",
  "simple": "Every app in Kubernetes can say how much computer power it needs. A request is the amount it asks to have set aside, like booking a table for four at a restaurant; Kubernetes only seats the app on a machine that still has that much room booked free. A limit is the most it is ever allowed to use. If an app tries to use more processor time than its limit, it is slowed down. If it tries to use more memory than its limit, it is stopped and restarted. Administrators can also set rules for a whole team's area, called a namespace: default sizes and maximum sizes for each app (a LimitRange) and a total budget for the whole team (a ResourceQuota).",
  "body": [
   "Each container in a Pod can declare resource requests and limits for central processing unit (CPU) time and memory. These few numbers drive three separate things: where the scheduler places the Pod, how the node enforces usage at runtime, and which Quality of Service (QoS) class the Pod gets. On top of that, administrators enforce namespace policies on them with LimitRange and ResourceQuota, both of which act at admission time when objects are created.",
   "A request is what the scheduler reserves. A node is only chosen if the sum of the requests of Pods already there, plus the new Pod's requests, fits within the node's allocatable capacity, which is the node's total minus what is reserved for the operating system and Kubernetes daemons. Actual usage does not matter to the scheduler; a node can be nearly idle and still be 'full' if its requests are all booked. You can see this in `kubectl describe node` under 'Allocated resources', which lists requested and limited CPU and memory as percentages of allocatable.",
   "A limit is a ceiling enforced at runtime by the kernel's control groups. A container that exceeds its CPU limit is throttled: it keeps running but gets less CPU time, so it slows down. A container that exceeds its memory limit is killed by the kernel and shows the status OOMKilled (out of memory killed) in `kubectl describe pod` under Last State, usually followed by a restart and, if it keeps happening, CrashLoopBackOff. CPU is measured in cores or millicores, where `500m` is half a core and `1` is one full core. Memory is measured in bytes with suffixes like `Mi` (mebibytes) and `Gi` (gibibytes); note that `M` and `Mi` are different units.",
   "```yaml\nresources:\n  requests: {cpu: 250m, memory: 128Mi}\n  limits:   {cpu: 500m, memory: 256Mi}\n```",
   "Requests and limits also set a Pod's QoS class, which you can read in `kubectl describe pod` or in `status.qosClass`. Guaranteed means every container has requests equal to limits for both CPU and memory (if you set only limits, requests default to the same values, which also counts). Burstable means at least one request or limit is set, but the Pod does not meet the Guaranteed rule. BestEffort means no container sets any requests or limits at all. Under memory pressure, the kubelet evicts BestEffort Pods first, then Burstable Pods that are using more than their requests, and Guaranteed Pods last, so the QoS class is effectively a statement about which workloads you are willing to lose first.",
   "A LimitRange is a namespaced policy enforced at admission. It can set default requests and limits for containers that omit them (`defaultRequest` and `default`), and it can enforce a minimum, a maximum and a maximum limit-to-request ratio (`maxLimitRequestRatio`) per container or per Pod. It can also constrain PersistentVolumeClaim sizes. It applies only to Pods created after it exists; existing Pods are not changed. A Pod that violates the minimum or maximum is rejected with a clear error from the API server, such as 'maximum memory usage per Container is 512Mi, but limit is 1Gi'.",
   "A ResourceQuota caps total consumption in a namespace. It covers sums such as `requests.cpu`, `limits.memory` and `requests.storage`, and object counts such as `pods`, `services` or `persistentvolumeclaims`. Once a quota on compute resources exists, every new Pod in that namespace must specify those requests or limits, or be given defaults by a LimitRange, otherwise it is rejected. That is why LimitRange and ResourceQuota are so often deployed together: the quota sets the budget and the LimitRange makes sure every Pod declares what it will spend. Check usage with `kubectl describe quota -n <ns>`, which shows Used and Hard for each resource side by side.",
   "```bash\nkubectl create quota team-a --hard=requests.cpu=2,requests.memory=4Gi,pods=10 -n team-a\n```",
   "Because both are admission controls, their rejections happen at creation time, and the place you see them depends on who did the creating. If you create a Pod directly, kubectl prints the error immediately. When a Deployment's Pods are refused by a quota, the Deployment object itself is created fine, but its ReplicaSet controller cannot create Pods. You see the reason in `kubectl describe rs` or in namespace events (`kubectl get events -n <ns>`), with messages like 'exceeded quota' or 'failed quota: must specify limits.memory', not in `kubectl get pods`, which simply shows fewer Pods than expected.",
   "This gives you a clean troubleshooting split. Pods missing entirely usually means admission rejected them, so read ReplicaSet events and check quotas and LimitRanges. Pods that exist but sit in Pending usually means the scheduler could not find a node with enough unrequested capacity, and `kubectl describe pod` shows an event such as 'Insufficient cpu'. Pods that run but restart with OOMKilled have a memory limit too low for what the application actually uses."
  ],
  "analogy": "Requests are like reserving seats at a concert: the box office (the scheduler) sells a seat only if one is unreserved, whether or not ticket holders have arrived yet. Limits are the fire code for each person's space: go over on CPU and an usher slows you down, go over on memory and security removes you. A LimitRange is the venue's rule on how many seats one party may book, and a ResourceQuota is the total block of seats your company bought. The analogy falls short on eviction: concerts do not remove the cheapest ticket holders first when it gets crowded.",
  "terms": [
   [
    "Request",
    "The amount of CPU or memory reserved for a container and used for scheduling decisions."
   ],
   [
    "Limit",
    "The maximum CPU (throttled) or memory (OOM-killed) a container may use."
   ],
   [
    "Allocatable",
    "A node's capacity available to Pods after system and Kubernetes reservations; scheduling compares requests against it."
   ],
   [
    "LimitRange",
    "A namespaced admission policy for per-container or per-Pod defaults, minimums, maximums and limit-to-request ratios."
   ],
   [
    "ResourceQuota",
    "A namespaced cap on aggregate resource usage and object counts."
   ],
   [
    "QoS class",
    "Guaranteed, Burstable or BestEffort, derived from requests and limits and used for eviction order."
   ]
  ],
  "example": "A Deployment in namespace team-a shows 0/3 ready and no Pods at all. `kubectl describe rs` reports 'failed quota: must specify limits.memory'. Adding a LimitRange with default memory limits, or adding limits to the Pod template, lets the ReplicaSet create the Pods.",
  "mistakes": [
   [
    "Thinking the scheduler looks at actual CPU and memory usage when placing Pods.",
    "It only adds up requests and compares them with allocatable capacity. An idle node can still be full of requests."
   ],
   [
    "Believing exceeding a CPU limit kills the container.",
    "CPU over the limit is throttled. Only memory over the limit triggers an OOM kill."
   ],
   [
    "Expecting a new LimitRange to resize Pods that are already running.",
    "LimitRange works at admission, so it affects only Pods created after it exists."
   ],
   [
    "Looking for quota errors in `kubectl get pods` output.",
    "Rejected Pods never exist. Read `kubectl describe rs` or namespace events for 'exceeded quota' or 'must specify' messages."
   ]
  ],
  "tryit": [
   [
    "Namespace analytics has a ResourceQuota with `requests.cpu=4` and `limits.memory=8Gi`, and no LimitRange. A developer applies a Deployment whose container sets only `requests.cpu: 500m`. The Deployment exists but no Pods appear. What happened, and what are two fixes?",
    "The quota tracks limits.memory, so every new Pod must set a memory limit; this one does not and is rejected at admission. Fix it by adding a memory limit to the Pod template or by creating a LimitRange with a default memory limit, then let the ReplicaSet retry."
   ],
   [
    "A Pod has two containers. One sets requests and limits of 200m CPU and 256Mi memory, equal to each other. The other sets no resources at all. Which QoS class does the Pod get?",
    "Burstable. Guaranteed requires every container to have equal requests and limits for both CPU and memory, and BestEffort requires no container to set any. One container with settings and one without makes it Burstable."
   ]
  ],
  "tip": "Pods missing entirely usually means admission rejected them (quota or LimitRange), so look at ReplicaSet events. Pods existing but Pending usually means scheduling failed on insufficient requests. Restarts with OOMKilled mean the memory limit is too low.",
  "check": [
   [
    "What happens when a container exceeds its memory limit versus its CPU limit?",
    "Memory: it is OOM-killed. CPU: it is throttled but keeps running."
   ],
   [
    "Which QoS class does a Pod get when every container sets equal CPU and memory requests and limits?",
    "Guaranteed."
   ],
   [
    "Once a compute ResourceQuota exists in a namespace, what must every new Pod do?",
    "Specify the tracked requests or limits, or receive defaults from a LimitRange; otherwise it is rejected."
   ]
  ]
 },
 {
  "t": "Scheduling: nodeSelector, nodeName, node affinity (required vs preferred)",
  "hook": "Lin, a platform engineer at Sunport Transit Authority, is asked to move the route-planning service onto the two new nodes with solid-state drives, keep it inside two specific zones, and, if possible, land it on a machine with a graphics processor. She labels nothing, adds a nodeSelector, and applies the change. Ten minutes later the service's new Pod is still Pending, and the old one has already been removed. A coworker suggests just setting `nodeName` to force it onto a node. Another says to use affinity instead. Each option sounds like it would 'put the Pod there', but they behave very differently when the target node is full, missing or unlabeled. Which tool should Lin reach for, and why is her Pod stuck?",
  "simple": "Normally Kubernetes picks any machine with enough free room for your app. Sometimes you need to steer it. Labels are like sticky tags on machines, such as 'disk=ssd' or 'zone=a'. A nodeSelector says 'only use machines that have all of these tags'. Node affinity does the same job with more options: it can say 'must be in zone a or zone b' as a strict rule, or 'I would prefer a machine with a graphics card, but any machine is fine' as a soft wish. nodeName is the blunt option: it skips Kubernetes' decision-making entirely and says 'run on this exact machine', like writing a specific seat number on a ticket even if that seat is broken.",
  "body": [
   "By default the scheduler places a Pod on any node with enough unrequested resources that passes its other checks. Often you need more control: graphics processing units (GPUs) on some nodes, solid-state drives (SSDs) on others, or a workload that must stay in particular zones for latency or data-residency reasons. Kubernetes gives you several tools for this, ranging from blunt to expressive, and the exam expects you to know both how to write each one and what happens when its condition cannot be met.",
   "`nodeName` is the bluntest. Setting `spec.nodeName: node02` bypasses the scheduler entirely: the Pod is effectively already bound, and the kubelet on node02 simply runs it. Because the scheduler never evaluates the Pod, NoSchedule taints are not enforced for it and resource checks happen only at the kubelet, so there is no fallback if the node is missing or full. The Pod may fail with a status such as OutOfcpu rather than wait for space, and if node02 does not exist the Pod never runs and may eventually be cleaned up by the control plane. It is useful for tests, for debugging a single node, or when the scheduler itself is down, but not for normal workloads.",
   "`nodeSelector` is the simplest scheduler-aware method. It is a map of labels, and the Pod can only go to nodes that carry all of them, with exactly matching values. Label nodes first with `kubectl label node node02 disktype=ssd`, then add the selector to the Pod template. Well-known labels such as `kubernetes.io/hostname`, `kubernetes.io/os` and `topology.kubernetes.io/zone` are available too, set by the kubelet or the cloud provider. Check labels with `kubectl get nodes --show-labels`, or show one label as a column with `kubectl get nodes -L disktype`. To remove a label, use the key with a trailing minus sign: `kubectl label node node02 disktype-`.",
   "```yaml\nspec:\n  nodeSelector:\n    disktype: ssd\n  affinity:\n    nodeAffinity:\n      requiredDuringSchedulingIgnoredDuringExecution:\n        nodeSelectorTerms:\n        - matchExpressions:\n          - {key: topology.kubernetes.io/zone, operator: In, values: [zone-a, zone-b]}\n      preferredDuringSchedulingIgnoredDuringExecution:\n      - weight: 50\n        preference:\n          matchExpressions:\n          - {key: gpu, operator: Exists}\n```",
   "Node affinity is the expressive form, written under `spec.affinity.nodeAffinity`. Its operators are In, NotIn, Exists, DoesNotExist, Gt and Lt, so you can say 'any of these zones', 'not this hardware type', 'has a gpu label at all' or 'a numeric label greater than a value'. NotIn and DoesNotExist also give you a way to express anti-affinity toward certain nodes. The long field names are worth reading slowly, because they encode the behavior.",
   "The required variant, `requiredDuringSchedulingIgnoredDuringExecution`, is a hard rule: if no node matches, the Pod stays Pending, with an event like '0/3 nodes are available: 3 node(s) didn't match Pod's node affinity/selector'. The preferred variant, `preferredDuringSchedulingIgnoredDuringExecution`, is soft. Each term has a weight from 1 to 100, and for every node that passes the hard filters, the scheduler adds the weights of the preferred terms it matches to that node's score. The highest-scoring node usually wins, but if no node matches any preference the Pod is still placed elsewhere. Preferences change ranking; they never block scheduling.",
   "Two structural details are commonly tested. Multiple entries under `nodeSelectorTerms` are ORed, so a node matching any one term qualifies, while multiple `matchExpressions` within one term are ANDed, so a node must match all of them. And the 'IgnoredDuringExecution' part means rules are only checked at scheduling time: if you remove a label from a node later, Pods already running there stay put. If both nodeSelector and node affinity are set on the same Pod, both must be satisfied, which is a common reason a Pod that 'should match' stays Pending.",
   "When a Pod stays Pending because of placement rules, troubleshoot in a fixed order. Read the event with `kubectl describe pod` to confirm it is a selector or affinity mismatch rather than insufficient resources or a taint. Compare the Pod's selector and affinity terms with `kubectl get nodes --show-labels`, watching for typos, wrong values and case differences. Then decide whether to fix the label on the node or the rule in the Pod; on the exam, the task wording usually tells you which side you are expected to change.",
   "Finally, remember that affinity only attracts. To keep other workloads off special nodes, combine affinity with taints and tolerations: affinity pulls the right Pods toward the nodes, and taints push everyone else away. Neither mechanism alone gives you truly dedicated nodes."
  ],
  "analogy": "Picking a node is like booking a hotel. nodeName is showing up at room 212 with your bags and walking in without visiting the front desk; if the room is occupied or does not exist, you are stuck in the hallway. nodeSelector is telling the desk 'only a room with an ocean view and a balcony'. Required affinity is the same with more vocabulary ('floor 3 or 4, not near the elevator'). Preferred affinity is 'a late checkout would be nice', which the desk weighs but will not refuse you a room over.",
  "terms": [
   [
    "nodeName",
    "A Pod field that pins the Pod to a node directly, bypassing the scheduler and its checks."
   ],
   [
    "nodeSelector",
    "A simple label map a node must fully match for the Pod to be scheduled there."
   ],
   [
    "Required node affinity",
    "requiredDuringSchedulingIgnoredDuringExecution: a hard scheduling rule; the Pod stays Pending if no node satisfies it."
   ],
   [
    "Preferred node affinity",
    "preferredDuringSchedulingIgnoredDuringExecution: a weighted (1 to 100) soft rule that influences scoring but does not block scheduling."
   ],
   [
    "IgnoredDuringExecution",
    "Rules are checked only at scheduling time; later label changes do not move running Pods."
   ]
  ],
  "example": "A task asks you to run a Pod only on nodes labeled `tier=frontend`, but none are labeled. After adding the nodeSelector the Pod shows Pending with '0/3 nodes are available: 3 node(s) didn't match Pod's node affinity/selector'. `kubectl label node node01 tier=frontend` lets it schedule immediately.",
  "mistakes": [
   [
    "Using nodeName as a 'stronger nodeSelector' for production workloads.",
    "nodeName skips the scheduler, so there is no fallback, no resource-aware placement and no NoSchedule taint check. Use nodeSelector or affinity instead."
   ],
   [
    "Expecting preferred node affinity to keep a Pod Pending until a matching node appears.",
    "Preferred rules only add score. If nothing matches, the Pod runs on another eligible node."
   ],
   [
    "Reading several nodeSelectorTerms as all being required together.",
    "Terms are ORed; only the matchExpressions inside a single term are ANDed."
   ],
   [
    "Thinking that removing a node label evicts Pods placed there by required affinity.",
    "IgnoredDuringExecution means existing Pods stay; the rule applies only when a Pod is scheduled."
   ]
  ],
  "tryit": [
   [
    "A Pod has two nodeSelectorTerms: the first requires `disktype In [ssd]` and `zone In [zone-a]`; the second requires `gpu Exists`. node01 has disktype=ssd and zone=zone-b. node02 has gpu=true and nothing else. node03 has disktype=ssd and zone=zone-a. Which nodes can the Pod use?",
    "node02 and node03. Terms are ORed: node03 matches both expressions in the first term (ANDed), and node02 matches the second term. node01 fails the first term on zone and has no gpu label."
   ],
   [
    "The scheduler in a lab cluster is down, and you must get a single diagnostic Pod running on node03 right now. Which field do you use, and what is the trade-off?",
    "Set `spec.nodeName: node03`. The kubelet on node03 runs it without the scheduler. The trade-off is no fallback: if node03 lacks resources or is missing, the Pod fails or never runs, and NoSchedule taints are not checked."
   ]
  ],
  "tip": "Terms are ORed, expressions within a term are ANDed. A missing label with required affinity or nodeSelector means Pending forever, never a fallback. Read the Pending event first; 'didn't match Pod's node affinity/selector' points at labels, while 'Insufficient' points at requests.",
  "check": [
   [
    "Does removing a node label evict Pods that were scheduled there because of required node affinity?",
    "No. IgnoredDuringExecution means the rule is only evaluated at scheduling time."
   ],
   [
    "What happens to a Pod whose preferred node affinity matches no node?",
    "It is scheduled on another suitable node; preferences only affect scoring."
   ],
   [
    "If a Pod sets both nodeSelector and required node affinity, which must a node satisfy?",
    "Both of them."
   ]
  ]
 },
 {
  "t": "Taints and tolerations: NoSchedule, PreferNoSchedule, NoExecute and tolerationSeconds",
  "hook": "At Oakhaven Children's Hospital, the imaging team finally gets two expensive GPU nodes for its scan-analysis service. Within a day, Priya on the platform team sees the nodes are half full of unrelated web Pods and batch jobs, and the imaging Pods have nowhere to go. She taints the nodes, and the web Pods stop arriving, but the ones already there stay. A colleague suggests a stronger effect that clears the nodes immediately. Then, at 3 a.m., one of the general worker nodes loses power, and the night-shift engineer notices its Pods are not rescheduled for several minutes. Is that a bug, or a deliberate delay? Both stories come down to taints, tolerations and one small number.",
  "simple": "A taint is a 'keep out' sign that you put on a machine. Apps without permission stay away. A toleration is a permission slip an app carries that says 'I am allowed past that particular sign'. The slip lets the app in, but it does not make the app go there; it is permission, not directions. Signs come in three strengths: 'do not send new apps here', 'please avoid sending apps here if you can', and 'do not send new apps here, and everyone already inside without a slip must leave'. For the strongest sign, a slip can also say 'I may stay for this many seconds, then I leave', which Kubernetes uses to wait a few minutes before giving up on a machine that stopped responding.",
  "body": [
   "Node affinity lets a Pod choose nodes. Taints work the other way round: they let a node refuse Pods. A taint is a key, an optional value and an effect set on a node, written as `key=value:Effect`. Only Pods with a matching toleration can ignore it. The most important idea, and a favorite exam trap, is that a toleration does not attract a Pod to a node; it merely permits scheduling there. A Pod with a toleration for GPU nodes is still free to land on any untainted node.",
   "```bash\nkubectl taint node node02 dedicated=gpu:NoSchedule\nkubectl describe node node02 | grep -i taints\nkubectl taint node node02 dedicated=gpu:NoSchedule-   # trailing dash removes it\n```",
   "There are three effects, and they differ in what they do to new and existing Pods. `NoSchedule` stops new Pods without a matching toleration from being scheduled on the node; Pods already running there stay. `PreferNoSchedule` is a soft version: the scheduler tries to avoid the node but will still use it if nothing else fits. `NoExecute` affects running Pods as well: Pods without a matching toleration are evicted immediately, and new ones are not scheduled. When you add a NoExecute taint, expect to see Pods on that node terminate within seconds and be recreated elsewhere by their controllers, while bare Pods are simply gone.",
   "A toleration matches a taint when the keys and effects match and either `operator: Equal` is used with the same value, or `operator: Exists` is used, in which case no value is needed. If you omit the operator it defaults to Equal. A toleration with an empty effect matches all effects for that key, and a toleration with an empty key and operator Exists tolerates every taint, which is how some system DaemonSets manage to run on every node. For NoExecute taints, a toleration can include `tolerationSeconds`, which lets a Pod stay bound for that many seconds after the taint appears and then be evicted. Without tolerationSeconds, a matching NoExecute toleration lets the Pod stay indefinitely.",
   "```yaml\ntolerations:\n- key: dedicated\n  operator: Equal\n  value: gpu\n  effect: NoSchedule\n- key: node.kubernetes.io/unreachable\n  operator: Exists\n  effect: NoExecute\n  tolerationSeconds: 60\n```",
   "Kubernetes uses taints itself, and recognizing them speeds up troubleshooting. The node lifecycle controller adds `node.kubernetes.io/not-ready` and `node.kubernetes.io/unreachable` NoExecute taints when a node stops reporting healthy status. An admission plugin adds default tolerations of 300 seconds for these two taints to most Pods. That is why Pods on a failed node are evicted about five minutes later rather than instantly: Kubernetes gives a briefly disconnected node a chance to come back before rescheduling everything. You can shorten that window for a specific workload by setting your own toleration with a smaller tolerationSeconds, as in the example above.",
   "Other built-in taints describe node conditions. Pressure conditions add taints such as `node.kubernetes.io/disk-pressure` and `node.kubernetes.io/memory-pressure`, and cordoning a node with `kubectl cordon` adds `node.kubernetes.io/unschedulable`, which is why a drained node refuses new Pods. Control plane nodes on kubeadm clusters carry `node-role.kubernetes.io/control-plane:NoSchedule`, keeping ordinary workloads off them. When a Pod stays Pending, the scheduler event says so directly, for example '1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }', which tells you exactly which taint to look at.",
   "It helps to separate a NoExecute taint from node maintenance commands, because they look similar from the outside. `kubectl drain` first cordons the node, adding the unschedulable taint, and then evicts Pods through the Eviction API, which respects PodDisruptionBudgets; it refuses to continue while DaemonSet Pods are present unless you pass `--ignore-daemonsets`, which leaves them in place. A NoExecute taint, by contrast, evicts every non-tolerating Pod directly, without consulting PodDisruptionBudgets. For planned maintenance, drain is the gentler and more controlled tool; a NoExecute taint is better suited to permanently clearing a node of everything except specific tolerated workloads.",
   "Reading taints is a quick habit worth building. `kubectl describe node <name> | grep -i taints` shows them in a human-readable line, and `kubectl get nodes -o custom-columns=NAME:.metadata.name,TAINTS:.spec.taints` lists them for every node at once. When removing a taint, you must repeat the key, and usually the effect, followed by a minus sign; `kubectl taint node node02 dedicated-` removes every taint with that key.",
   "The usual pattern for dedicated nodes combines both mechanisms. Taint the nodes, for example `dedicated=gpu:NoSchedule`, so general workloads stay off. Then give the special workload a matching toleration plus a nodeSelector or node affinity on a node label such as `dedicated=gpu`, so it actually goes there. The taint keeps others out; the affinity pulls the right Pods in. Either half alone leaves a gap: affinity without a taint lets other Pods fill the nodes, and a toleration without affinity lets the special Pods drift onto ordinary nodes."
  ],
  "analogy": "A taint is like a staff-only sign on a door, and a toleration is a staff badge. The badge lets you through that door, but it does not order you to go there; you might spend the whole day in the public lobby. NoSchedule stops new visitors without badges, PreferNoSchedule is a polite 'please use another door', and NoExecute also escorts out anyone already inside without a badge. tolerationSeconds is a visitor pass that lets you finish your coffee for a set time before you must leave.",
  "terms": [
   [
    "Taint",
    "A key, value and effect on a node that repels Pods lacking a matching toleration."
   ],
   [
    "Toleration",
    "A Pod setting that allows, but does not force, scheduling on nodes with matching taints."
   ],
   [
    "NoSchedule / PreferNoSchedule",
    "Effects that block, or softly discourage, new non-tolerating Pods without affecting running ones."
   ],
   [
    "NoExecute",
    "A taint effect that evicts running non-tolerating Pods as well as blocking new ones."
   ],
   [
    "tolerationSeconds",
    "How long a Pod tolerating a NoExecute taint may stay before eviction."
   ],
   [
    "operator: Exists",
    "A toleration match on key (and effect) regardless of value; with an empty key it tolerates all taints."
   ]
  ],
  "example": "You taint node03 with `maintenance=true:NoExecute`. Every ordinary Pod on it is evicted within seconds and rescheduled elsewhere, while a monitoring DaemonSet Pod with a toleration for key maintenance and operator Exists keeps running there.",
  "mistakes": [
   [
    "Believing a toleration makes a Pod run on the tainted node.",
    "A toleration only permits it. Add a nodeSelector or node affinity to actually steer the Pod there."
   ],
   [
    "Expecting a new NoSchedule taint to remove Pods already on the node.",
    "NoSchedule affects only new scheduling. Only NoExecute evicts running Pods that lack a matching toleration."
   ],
   [
    "Assuming Pods on a dead node are rescheduled instantly.",
    "Default tolerations of 300 seconds for the not-ready and unreachable NoExecute taints mean eviction happens about five minutes later."
   ],
   [
    "Writing a toleration with operator Equal but leaving out the value for a taint that has one.",
    "Equal requires the value to match. Use the taint's value, or switch to operator: Exists to match any value."
   ]
  ],
  "tryit": [
   [
    "Node node04 has the taint `team=data:NoExecute`. A Pod on it has the toleration `{key: team, operator: Equal, value: data, effect: NoExecute, tolerationSeconds: 120}`. Two minutes after the taint was added, what happens to the Pod? What if tolerationSeconds were omitted?",
    "With tolerationSeconds 120 the Pod may stay for 120 seconds after the taint appears, so it is evicted at about the two-minute mark. If tolerationSeconds were omitted, the matching toleration would let it stay indefinitely."
   ],
   [
    "You must reserve node05 for a payments workload: no other Pods may be scheduled there, and the payments Pods must run only there. What do you configure?",
    "Taint node05 (for example `dedicated=payments:NoSchedule`), label it (for example `dedicated=payments`), and give the payments Pods a matching toleration plus a nodeSelector or required node affinity for that label. Add NoExecute instead if existing Pods must also be cleared."
   ]
  ],
  "tip": "A toleration alone will not put a Pod on the tainted node; pair it with nodeSelector or affinity. Removing a taint uses the same command with a trailing minus sign. When a Pod is Pending, the event names the untolerated taint, so read it before changing anything.",
  "check": [
   [
    "Which taint effect evicts Pods already running on the node?",
    "NoExecute."
   ],
   [
    "Why are Pods on a node that suddenly goes offline typically evicted after about five minutes?",
    "They receive default tolerations of 300 seconds for the not-ready and unreachable NoExecute taints."
   ],
   [
    "Which taint does kubectl cordon add to a node?",
    "node.kubernetes.io/unschedulable with the NoSchedule effect."
   ]
  ]
 },
 {
  "t": "Pod affinity and anti-affinity with topologyKey; topologySpreadConstraints",
  "hook": "Elena runs the platform team at Silverline Insurance, whose claims portal runs in a cluster spread across three zones. A post-incident review lands on her desk: last month a single zone outage took the portal down completely, because all four replicas had quietly ended up in the same zone. The fix seems obvious: tell Kubernetes to spread them out. Her teammate adds a strict 'never two replicas on the same node' rule, scales to five replicas on a four-node cluster, and one Pod sits Pending. Another teammate proposes a different setting called maxSkew. Both are trying to say 'not all in one place', but what counts as 'one place', and which rule bends when the cluster runs out of room?",
  "simple": "Sometimes where an app runs matters relative to other apps. You might want a web app to sit next to its cache so they talk quickly, or you might want copies of the same app kept apart so one broken machine or one broken data center does not take out all of them. Pod affinity means 'put me near Pods like that'; Pod anti-affinity means 'keep me away from Pods like that'. The key question is what 'near' means: the same machine, or the same zone, a group of machines in one location. Topology spread constraints are a fairer way to spread copies: instead of 'never together', they say 'keep the counts roughly even', like dealing cards evenly to players.",
  "body": [
   "Node affinity relates Pods to node labels. Pod affinity and anti-affinity relate Pods to other Pods. They let you express rules such as 'put this web Pod near a cache Pod' for low latency, or 'never put two replicas of the same database in the same zone' for resilience. Topology spread constraints solve a related problem, even distribution, with more precision. All three share one central idea: a topology domain.",
   "The key concept is `topologyKey`, a node label that defines what 'the same place' means. With `kubernetes.io/hostname`, every node has a unique value, so the same place means the same node. With `topology.kubernetes.io/zone`, nodes in one zone share a value, so the same place means the same zone. When evaluating a rule, the scheduler looks for Pods matching a `labelSelector`, in the Pod's own namespace by default, or in the namespaces listed in `namespaces` or selected by a `namespaceSelector`. It groups nodes by the value of the topology key and applies the rule to each group. A node without the topology key label is not part of any domain for that rule, which can surprise you on clusters where zone labels are missing.",
   "Pod affinity says: schedule into a topology domain that already has a matching Pod. Pod anti-affinity says: avoid domains that already have one. Both come in required and preferred forms, exactly like node affinity, with the same long names, `requiredDuringSchedulingIgnoredDuringExecution` and `preferredDuringSchedulingIgnoredDuringExecution`. Preferred terms carry a weight from 1 to 100 inside a `podAffinityTerm`. A classic pattern spreads replicas one per node with required anti-affinity on the Pod's own labels, so each new replica refuses any node that already runs one.",
   "```yaml\naffinity:\n  podAntiAffinity:\n    requiredDuringSchedulingIgnoredDuringExecution:\n    - labelSelector:\n        matchLabels: {app: web}\n      topologyKey: kubernetes.io/hostname\n  podAffinity:\n    preferredDuringSchedulingIgnoredDuringExecution:\n    - weight: 80\n      podAffinityTerm:\n        labelSelector:\n          matchLabels: {app: cache}\n        topologyKey: kubernetes.io/hostname\n```",
   "Read that example slowly. The anti-affinity term says no two Pods labeled `app: web` may share a node. The affinity term says the scheduler should prefer, with weight 80, nodes that already run a Pod labeled `app: cache`. Change the anti-affinity topologyKey to `topology.kubernetes.io/zone` and the meaning changes completely: now no two web Pods may share a zone, so a three-zone cluster can run only three of them.",
   "Required anti-affinity has a sharp edge. With one-per-node, a 4-replica Deployment on a 3-node cluster leaves the fourth Pod Pending, with an event saying node(s) didn't match pod anti-affinity rules. The same happens during a rolling update if surge Pods need a free node and none exists. Preferred anti-affinity avoids that by letting the scheduler double up when it must, but it gives no guarantee of separation. Inter-Pod affinity and anti-affinity are also relatively expensive for the scheduler to evaluate, and the Kubernetes documentation cautions against them in large clusters.",
   "`topologySpreadConstraints` is the more flexible tool for spreading, set at `spec.topologySpreadConstraints`. You name a `topologyKey`, a `labelSelector` for the Pods to count, and a `maxSkew`, the maximum allowed difference in the number of matching Pods between the most loaded and least loaded domains. `whenUnsatisfiable: DoNotSchedule` makes it a hard rule, so a Pod that would break the skew stays Pending. `ScheduleAnyway` makes it a scoring preference, so the scheduler favors nodes that reduce skew but will still place the Pod.",
   "```yaml\ntopologySpreadConstraints:\n- maxSkew: 1\n  topologyKey: topology.kubernetes.io/zone\n  whenUnsatisfiable: DoNotSchedule\n  labelSelector:\n    matchLabels: {app: web}\n```",
   "With maxSkew 1 across three zones, six replicas land two per zone, and seven land 3-2-2, which anti-affinity could not express: anti-affinity only knows 'zero or one per domain', while spread constraints allow any number as long as the counts stay balanced. You can list several constraints at once, for example one per zone and one per node, and the Pod must satisfy all of them. Remember that the labelSelector decides which Pods are counted, so it normally matches the workload's own labels; a selector that matches nothing makes every domain look empty.",
   "Like the other affinity rules, constraints are evaluated only at scheduling time. Later node failures, scale-downs or manual deletions can leave Pods unevenly spread until they are rescheduled, and Kubernetes does not move running Pods to fix skew. When a spread rule leaves a Pod Pending, `kubectl describe pod` shows an event such as 'node(s) didn't match pod topology spread constraints', which points you to the maxSkew and whenUnsatisfiable settings."
  ],
  "analogy": "Picture seating guests at a wedding. The topologyKey decides whether you are talking about chairs or tables. Anti-affinity on hostname is 'no two cousins in adjacent chairs'; on zone it is 'no two cousins at the same table', which runs out of tables fast. Pod affinity is 'seat the best man near the groom'. Topology spread is the planner who says 'keep each table's cousin count within one of the others', so seven cousins at three tables sit 3-2-2. The analogy breaks at the end of the night: Kubernetes never reshuffles seated guests.",
  "terms": [
   [
    "topologyKey",
    "A node label whose value defines a topology domain such as a node (kubernetes.io/hostname) or zone (topology.kubernetes.io/zone)."
   ],
   [
    "Pod affinity",
    "A rule placing a Pod in domains that already run Pods matching a selector."
   ],
   [
    "Pod anti-affinity",
    "A rule keeping a Pod away from domains that already run Pods matching a selector."
   ],
   [
    "topologySpreadConstraints",
    "Rules limiting how unevenly matching Pods are distributed across domains."
   ],
   [
    "maxSkew",
    "The maximum allowed difference in matching Pod counts between the most and least loaded domains."
   ],
   [
    "whenUnsatisfiable",
    "DoNotSchedule makes a spread constraint hard; ScheduleAnyway makes it a scoring preference."
   ]
  ],
  "example": "A 3-replica Deployment with required anti-affinity on `app: web` and topologyKey kubernetes.io/hostname places one Pod on each of three workers. When a colleague scales it to 4, the new Pod is Pending with a message that node(s) didn't match pod anti-affinity rules, which is the rule working as designed.",
  "mistakes": [
   [
    "Assuming anti-affinity with any topologyKey means 'one per node'.",
    "The topologyKey defines the domain. hostname means one per node; zone means one per zone, which allows far fewer replicas."
   ],
   [
    "Treating a Pending Pod under required anti-affinity as a scheduler bug.",
    "If replicas outnumber domains, extra replicas have nowhere legal to go. Add domains, reduce replicas, or use preferred anti-affinity or spread constraints."
   ],
   [
    "Believing maxSkew 1 means at most one Pod per domain.",
    "It limits the difference between domains, so 3-2-2 is allowed with maxSkew 1."
   ],
   [
    "Expecting Kubernetes to rebalance Pods when spread becomes uneven after a node failure.",
    "Constraints apply only at scheduling time; running Pods are not moved to fix skew."
   ]
  ],
  "tryit": [
   [
    "A cluster has two zones with three nodes each. A Deployment of five replicas uses required Pod anti-affinity on its own label with topologyKey topology.kubernetes.io/zone. How many replicas run, and what would you change to get five spread evenly?",
    "Only two run, one per zone; the other three stay Pending. Replace the anti-affinity with a topology spread constraint on the zone key with maxSkew 1 (giving 3-2), optionally plus anti-affinity or a spread constraint on hostname to separate Pods within each zone."
   ],
   [
    "A web Deployment should run on the same nodes as Pods labeled app=cache when possible, but must never be blocked if no cache Pod exists. Which rule do you write?",
    "Preferred Pod affinity with a labelSelector for app=cache, topologyKey kubernetes.io/hostname and a weight such as 80. Required affinity would leave web Pods Pending when no cache Pod exists."
   ]
  ],
  "tip": "Read the topologyKey carefully: hostname means per node, zone means per zone. The same selector with a different key gives completely different placement. For balanced counts across zones, reach for topologySpreadConstraints rather than anti-affinity.",
  "check": [
   [
    "What does maxSkew: 1 guarantee?",
    "No topology domain has more than one more matching Pod than the least-loaded domain."
   ],
   [
    "Why might required Pod anti-affinity leave Pods Pending?",
    "If there are more replicas than topology domains, extra replicas have no allowed place to go."
   ],
   [
    "Which whenUnsatisfiable value turns a spread constraint into a soft preference?",
    "ScheduleAnyway."
   ]
  ]
 },
 {
  "t": "PriorityClasses and preemption",
  "hook": "It is the last business day of the month at Harborview Utilities, and the billing team's nightly batch job has filled every node's CPU requests. At 7:02 a.m. the customer payments API needs a new replica to handle the morning rush, and the scheduler reports there is nowhere to put it. Two minutes later, Marcus on the operations team watches two batch Pods terminate on node02 without anyone touching them, and the payments Pod lands right where they were. The billing team is upset; the payments team is relieved. Marcus needs to explain to both of them what just happened, whether it was supposed to happen, and how to control it next time. Who decided the batch job should lose?",
  "simple": "When a cluster is full, Kubernetes has to decide whose app gets space first. A PriorityClass is a named ranking with a number: the higher the number, the more important the app. Apps say which ranking they belong to. When space is tight, more important apps go to the front of the line. If there is still no room, Kubernetes can remove some less important apps to make space, a bit like an airline bumping standby passengers to seat a pilot who must fly the next flight. This removal is called preemption. You can also create a ranking that lets apps jump the line but never bump anyone.",
  "body": [
   "When a cluster is full, which Pods should win? Without guidance, the scheduler treats every Pending Pod much the same, so a low-value batch job can hold resources that a customer-facing service urgently needs. PriorityClasses let you rank workloads so that important Pods are scheduled first and, if necessary, displace less important ones. On the exam you are expected to create PriorityClasses, attach them to Pods and explain how preemption behaves.",
   "A PriorityClass is a cluster-scoped object mapping a name to an integer `value`; higher numbers mean higher priority. Pods reference it through `spec.priorityClassName`, and the Priority admission controller resolves the name and copies the value into `spec.priority`. One PriorityClass may have `globalDefault: true`, which then applies to Pods that do not name one; without such a class, those Pods get priority 0. Kubernetes ships two built-in classes, `system-cluster-critical` and `system-node-critical`, with very high values, used by components like CoreDNS and CNI agents that the cluster cannot function without. Ordinary user classes should use much lower values, leaving those top values for system components.",
   "```bash\nkubectl create priorityclass high-priority --value=100000 --description='Customer-facing APIs'\nkubectl get priorityclass\n```",
   "```yaml\nspec:\n  priorityClassName: high-priority\n  containers:\n  - name: api\n    image: api:1.0\n```",
   "Because a PriorityClass is cluster-scoped, you never pass `-n` when creating it, and any namespace's Pods can reference it by name. In a Deployment, the field goes in the Pod template, at `spec.template.spec.priorityClassName`. Changing it there triggers a normal rolling update, since the Pod template changed. `kubectl get pods -o custom-columns=NAME:.metadata.name,PRIO:.spec.priority` quickly shows the resolved priority of each Pod.",
   "Two lifecycle details save confusion later. The `value` of an existing PriorityClass cannot be changed; to change it you delete and recreate the class. And because the number is copied into each Pod at admission, deleting or recreating a class does not change the priority of Pods that already exist. Only Pods created afterward pick up the new value, so after reworking classes you typically restart the affected workloads.",
   "Priority affects scheduling in two ways. First, the scheduling queue is ordered by priority, so higher-priority Pending Pods are tried before lower ones. Second, preemption: if a high-priority Pod cannot fit anywhere, the scheduler looks for a node where evicting one or more lower-priority Pods would make enough room. It then gracefully terminates those victims, giving them their normal termination grace period, and records the target node in the preemptor's `status.nominatedNodeName`. The preemptor is scheduled once space frees up, though it may end up on a different node if another one becomes available first. During that window, `kubectl get pod -o wide` shows the Pod still Pending with a NOMINATED NODE value.",
   "Preemption has limits worth knowing. It tries to respect PodDisruptionBudgets (PDBs), choosing victims that do not violate them when possible, but it may violate them if there is no other option, because a PDB is a best-effort constraint for preemption. It never considers Pods of equal or higher priority as victims, so two classes with the same value cannot preempt each other. And it only helps when removing lower-priority Pods would actually make the preemptor fit; if the Pod is blocked by a node selector, taint or affinity rule that no node satisfies, evicting Pods will not help and no preemption happens.",
   "You can make a class non-preempting with `preemptionPolicy: Never`. Pods in such a class still move ahead of lower-priority Pods in the scheduling queue, but they never evict others; they wait until space frees up naturally. This suits important batch work that should start as soon as possible without disrupting anything already running. The default policy is `PreemptLowerPriority`.",
   "Priority also plays a role outside the scheduler. When the kubelet evicts Pods under node resource pressure, it considers whether a Pod's usage exceeds its requests and then its priority, so lower-priority Pods that exceed requests tend to go first. Practically, when you see lower-priority Pods being terminated with a reason mentioning preemption, or a Pending Pod with a nominated node, check the Pods' priorities with the custom-columns command above, list the classes with `kubectl get priorityclass`, and read the events in the namespace. Finally, mind the admission step. If a Pod names a PriorityClass that does not exist, for example because of a typo, the Priority admission controller rejects the Pod at creation. For a Deployment, that means the Deployment exists but its ReplicaSet cannot create Pods, and the error appears in `kubectl describe rs` and namespace events rather than as a failing Pod."
  ],
  "analogy": "Think of a hospital emergency room. Each arriving patient gets a triage level (the PriorityClass value), and higher levels are seen first (queue ordering). If a critical patient arrives and every bed is taken, staff may move a stable, lower-triage patient to the waiting area to free a bed (preemption), but never someone at the same or higher level. A class with preemptionPolicy Never is a patient who jumps the line but waits for a bed to free up naturally. Unlike a hospital, Kubernetes does not bring the moved patient back; their controller must recreate them.",
  "terms": [
   [
    "PriorityClass",
    "A cluster-scoped object assigning an integer priority to Pods that reference it by name."
   ],
   [
    "Preemption",
    "The scheduler evicting lower-priority Pods to make room for a higher-priority Pending Pod."
   ],
   [
    "nominatedNodeName",
    "A Pod status field naming the node where preemption is freeing space for it."
   ],
   [
    "globalDefault",
    "A PriorityClass flag making it the default for Pods that name no class."
   ],
   [
    "preemptionPolicy: Never",
    "Gives a class queue priority without allowing it to evict other Pods; the default is PreemptLowerPriority."
   ],
   [
    "system-node-critical / system-cluster-critical",
    "Built-in, very high priority classes reserved for essential cluster components."
   ]
  ],
  "example": "A nightly batch job fills the cluster's CPU requests. When a payments API Pod with the `high-priority` class is created, it cannot fit, so the scheduler evicts two batch Pods with priority 0 on node02, sets nominatedNodeName to node02 and then schedules the API Pod there.",
  "mistakes": [
   [
    "Creating a PriorityClass with `-n <namespace>` and expecting it to apply only there.",
    "PriorityClass is cluster-scoped. Any Pod in any namespace can reference it by name."
   ],
   [
    "Believing a high-priority Pod can preempt Pods with the same priority.",
    "Only strictly lower-priority Pods are candidates for preemption."
   ],
   [
    "Thinking preemption always honors PodDisruptionBudgets.",
    "The scheduler tries to respect PDBs but may violate them when there is no other way to make room."
   ],
   [
    "Assuming preemptionPolicy: Never removes the class's priority entirely.",
    "Those Pods still move ahead in the scheduling queue; they just never evict other Pods."
   ]
  ],
  "tryit": [
   [
    "A cluster has PriorityClasses gold (value 1000) and silver (value 500), and no globalDefault. All nodes are full of Pods using silver and Pods with no class. A new Pod using gold cannot fit. Which Pods are possible preemption victims?",
    "Both the silver Pods (500) and the Pods with no class (priority 0) are lower than 1000, so both can be victims. The scheduler picks a node and a minimal set of victims, trying to avoid violating PDBs."
   ],
   [
    "The finance team wants its month-end reports to start before routine batch jobs whenever the cluster is busy, but they must never kill anything that is already running. How do you configure this?",
    "Create a PriorityClass with a value higher than the routine jobs' priority and `preemptionPolicy: Never`, and set `priorityClassName` in the report Pods' template. They move ahead in the queue but wait for free capacity instead of preempting."
   ]
  ],
  "tip": "PriorityClass is cluster-scoped and Pods reference it by name; a typo in priorityClassName makes the Pod creation fail at admission. Only lower-priority Pods can be preempted. A Pending Pod with a NOMINATED NODE value is waiting for its preemption victims to terminate.",
  "check": [
   [
    "What priority does a Pod get if it names no class and no globalDefault class exists?",
    "Zero."
   ],
   [
    "How can a class get scheduling-queue priority without evicting others?",
    "Set preemptionPolicy: Never on the PriorityClass."
   ],
   [
    "Which Pod status field shows the node where preemption is making room for a Pod?",
    "status.nominatedNodeName."
   ]
  ]
 },
 {
  "t": "Workload autoscaling: HorizontalPodAutoscaler (kubectl autoscale, autoscaling/v2), metrics-server and CPU requests; awareness of VPA and Cluster Autoscaler",
  "hook": "It is Monday morning at Lakeview Ticketing, and concert presale opens in twenty minutes. Priya, the platform admin, created an autoscaler for the checkout Deployment on Friday and went home feeling safe. Now she runs `kubectl get hpa` and the TARGETS column reads `<unknown>/50%`. Three checkout Pods are already at full CPU, response times are climbing, and the autoscaler is not adding a single replica. Marketing is asking whether the site will hold. Priya has a few minutes to work out why a perfectly valid HorizontalPodAutoscaler is blind, and what it needs to see again. What is missing?",
  "simple": "Autoscaling means letting the cluster add or remove copies of your app on its own as demand changes. The HorizontalPodAutoscaler (HPA) watches how busy your Pods are and changes how many copies run, between a minimum and a maximum you choose. To know how busy they are, it needs a small add-on called metrics-server that measures CPU and memory. It also needs to know what \"normal\" looks like, which is the CPU request you set on each container. Think of a coffee shop manager who opens more registers when lines get long: she needs to see the line (metrics-server) and know how long a line one register can handle (the request). Without either, she cannot decide anything.",
  "body": [
   "Autoscaling in Kubernetes happens at three levels, and the exam expects you to keep them apart. The HorizontalPodAutoscaler (HPA) changes the number of replicas of a workload. The Vertical Pod Autoscaler (VPA) changes the CPU and memory requests of each Pod. The Cluster Autoscaler changes the number of nodes in the cluster. The Certified Kubernetes Administrator (CKA) exam focuses on the HPA, which you may have to create and repair, and expects awareness of the other two so you can pick the right tool for a scenario.",
   "The HPA is a control loop, not a separate Pod you install. It runs inside the kube-controller-manager and, on a short interval (15 seconds by default), reads current metrics for the Pods of its target, which can be a Deployment, StatefulSet or ReplicaSet. It compares the observed value with your target and computes a desired replica count, roughly current replicas multiplied by current metric divided by target metric, rounded up and clamped between `minReplicas` and `maxReplicas`. For example, four Pods averaging 100 percent of their CPU request against a target of 50 percent gives a desired count of eight. A small tolerance stops it from reacting to tiny differences.",
   "CPU and memory metrics come from the Resource Metrics API (`metrics.k8s.io`), which is served by metrics-server. metrics-server collects usage from each kubelet and keeps only recent values in memory; it is not a monitoring system and keeps no history. kubeadm does not install it, so on an exam or lab cluster you may have to install it yourself, usually from its release manifest or Helm chart. In lab clusters whose kubelets use self-signed serving certificates, metrics-server commonly needs the `--kubelet-insecure-tls` argument before it can scrape them. That is acceptable for a lab but not for production, where the kubelet serving certificates should be properly signed. Confirm the pipeline works with `kubectl top nodes` and `kubectl top pods`; if those commands report that metrics are not available, the HPA cannot work either.",
   "Utilization targets are percentages of the Pod's requests, not of the node's capacity or the container's limit. If the containers have no CPU request, the HPA has nothing to divide by, cannot compute utilization and `kubectl get hpa` shows `<unknown>` in the TARGETS column. `kubectl describe hpa` then shows a condition such as `ScalingActive False` with a message about missing requests or failing to get metrics. This is one of the most common exam and real-world pitfalls. Note that every container in the Pod that the metric covers needs the request, including sidecars, or the calculation still fails.",
   "```bash\nkubectl autoscale deployment web --cpu-percent=50 --min=2 --max=10\nkubectl get hpa web\nkubectl describe hpa web   # conditions and scaling events\n```",
   "The imperative command above is the fastest way to create a CPU-based HPA under exam time pressure. When you need more control, such as memory targets, several metrics or custom scaling behavior, write the manifest using the `autoscaling/v2` API. `scaleTargetRef` names the workload, `metrics` lists what to watch, and `behavior` tunes how fast it scales.",
   "```yaml\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata: {name: web}\nspec:\n  scaleTargetRef: {apiVersion: apps/v1, kind: Deployment, name: web}\n  minReplicas: 2\n  maxReplicas: 10\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target: {type: Utilization, averageUtilization: 50}\n  behavior:\n    scaleDown:\n      stabilizationWindowSeconds: 120\n```",
   "The `autoscaling/v2` API brings several features worth recognizing. It supports multiple metrics, and when you list more than one, the HPA computes a replica count for each and picks the largest, so the busiest signal wins. It supports custom metrics (per-Pod values such as requests per second) and external metrics (values from outside the cluster, such as a queue length) through metrics adapters, which are separate add-ons. A target can be `Utilization` (percent of request), `AverageValue` (an absolute amount per Pod, such as 200m CPU) or `Value`. The `behavior` section tunes scale-up and scale-down rates and stabilization windows. By default scale-up reacts quickly, while scale-down is deliberately slow, using a stabilization window of five minutes, so a brief dip in traffic does not remove Pods that will be needed again a moment later. This prevents flapping, where replicas bounce up and down.",
   "A few operational details round out the picture. While an HPA manages a Deployment, avoid setting replicas by hand with `kubectl scale`, because the HPA will simply overwrite your value on its next pass; change `minReplicas` instead. Newly started Pods may briefly report misleading CPU while they warm up, and the controller accounts for Pods that are not yet ready. The scaling history is visible in the Events section of `kubectl describe hpa`, with messages such as \"New size: 6; reason: cpu resource utilization (percentage of request) above target\".",
   "The VPA is a separate add-on that recommends or applies new requests for Pods based on their observed usage. It can run in a recommendation-only mode, which is a safe way to learn sensible request values, or in modes that apply the new values to Pods. It should not control the same CPU or memory metric as an HPA on the same workload, because the two would fight: the VPA raises requests, which lowers utilization, which makes the HPA remove replicas. The Cluster Autoscaler, usually tied to a cloud provider's node groups, adds nodes when Pods are Pending because no node has room for their requests, and removes underused nodes when their Pods can fit elsewhere. Notice that it also depends on requests, because scheduling decisions are based on them. Both are outside kubeadm's default install, so on the exam you are far more likely to be asked to configure an HPA than to deploy either of these."
  ],
  "analogy": "An HPA is like a supermarket manager who opens extra checkout lanes when queues grow. She needs a camera on the queues (metrics-server) and a rule for how many shoppers one cashier should handle (the CPU request). Without the camera or the rule, she just stands there. The VPA is more like giving each cashier a faster scanner, and the Cluster Autoscaler is building more lanes into the store. The analogy stops at timing: the HPA closes lanes slowly on purpose, waiting several minutes before removing replicas.",
  "terms": [
   [
    "HorizontalPodAutoscaler",
    "A controller that adjusts a workload's replica count to meet a metric target."
   ],
   [
    "metrics-server",
    "An add-on that collects CPU and memory usage from kubelets and serves the Resource Metrics API."
   ],
   [
    "averageUtilization",
    "A target expressed as a percentage of the Pods' resource requests."
   ],
   [
    "Stabilization window",
    "A period over which the HPA considers past recommendations before scaling, used mainly to slow scale-down and prevent flapping."
   ],
   [
    "Vertical Pod Autoscaler",
    "An add-on that recommends or sets container requests based on observed usage."
   ],
   [
    "Cluster Autoscaler",
    "An add-on that adds or removes nodes based on Pending Pods and node utilization."
   ]
  ],
  "example": "An HPA created with `kubectl autoscale` shows TARGETS `<unknown>/50%`. `kubectl top pods` works, so metrics-server is fine; `kubectl get deploy web -o yaml` reveals no CPU request. Adding `requests: {cpu: 100m}` and letting the Pods roll makes the HPA report real utilization and scale.",
  "mistakes": [
   [
    "The HPA measures CPU as a percentage of the node's capacity or the container's limit.",
    "Utilization is a percentage of the container's CPU request. No request means the target shows `<unknown>`, regardless of limits."
   ],
   [
    "metrics-server comes with every kubeadm cluster.",
    "kubeadm does not install it. If `kubectl top` fails, install metrics-server before debugging the HPA itself."
   ],
   [
    "Running `kubectl scale deploy web --replicas=1` will hold the workload at one replica while an HPA exists.",
    "The HPA owns the replica count and overwrites manual changes on its next pass. Adjust minReplicas and maxReplicas on the HPA instead."
   ],
   [
    "The Cluster Autoscaler or VPA is the answer when a question asks for more Pods under load.",
    "More replicas of a workload is the HPA's job. The VPA resizes requests per Pod, and the Cluster Autoscaler adds nodes when Pods cannot be scheduled."
   ]
  ],
  "tryit": [
   [
    "You are asked to make Deployment `api` in namespace `shop` scale between 3 and 12 replicas at 70 percent CPU. After creating the HPA, `kubectl get hpa -n shop` shows `<unknown>/70%`, and `kubectl top pods -n shop` returns \"metrics not available yet\" for every Pod. The Pods do have CPU requests. What do you check next?",
    "Look at metrics-server, because `kubectl top` failing means the Resource Metrics API is not serving data. Check `kubectl -n kube-system get pods` for metrics-server and read its logs; a lab cluster often needs `--kubelet-insecure-tls`. The requests are already present, so they are not the cause this time."
   ],
   [
    "A team wants their batch workers to get more replicas when their queue grows, and also wants a VPA to manage CPU requests for the same workers automatically. What do you advise?",
    "Do not let the VPA and an HPA both act on CPU for the same workload, because they will work against each other. Scale on the queue length with an external metric in an autoscaling/v2 HPA, and run the VPA in recommendation-only mode, or let it manage resources that the HPA does not use."
   ]
  ],
  "tip": "`<unknown>` targets mean either metrics-server is missing or not working, or the Pods have no request for that resource. Check `kubectl top` first, then the requests.",
  "check": [
   [
    "Why does a CPU utilization HPA need CPU requests on the Pods?",
    "Utilization is calculated as a percentage of the requested CPU; with no request there is nothing to divide by."
   ],
   [
    "Which component serves the metrics the HPA uses for CPU and memory?",
    "metrics-server, via the Resource Metrics API."
   ],
   [
    "An autoscaling/v2 HPA lists a CPU metric that suggests 4 replicas and a memory metric that suggests 7. How many replicas does it choose?",
    "7, because with multiple metrics the HPA uses the largest computed replica count (still within maxReplicas)."
   ]
  ]
 },
 {
  "t": "Static Pods vs scheduler-placed Pods; what happens when the scheduler is down",
  "hook": "It is 2 a.m. at Northwind Freight, and Marcus on the night shift gets paged: the morning batch Deployment was scaled up an hour ago and not one new Pod has started. Every new Pod in the cluster sits in Pending. He runs `kubectl describe pod` expecting to see \"0/3 nodes are available\" and finds something stranger: no events at all. Yet the API server answers, existing Pods are serving traffic, and the etcd and controller-manager Pods look healthy. Something that normally works silently in the background has stopped. Which component is missing, and why is it still possible for some Pods to start?",
  "simple": "Most Pods get onto a machine in two steps: you ask for a Pod, and a component called the scheduler chooses which machine (node) should run it. Then the agent on that node, the kubelet, starts it. Static Pods skip the scheduler entirely. Their recipe is a file sitting in a folder on the node, and the kubelet starts them by itself, like an appliance with an auto-start switch. That is how the control plane's own parts start on a kubeadm cluster. If the scheduler breaks, Pods that need it wait forever without complaint, while static Pods and Pods already told which node to use keep starting normally.",
  "body": [
   "There are two ways a Pod reaches a node, and knowing both is essential for troubleshooting. Most Pods reach a node through the scheduler. The Pod is created in the API server with an empty `spec.nodeName`. The kube-scheduler watches for such unscheduled Pods, filters out nodes that cannot run the Pod (not enough requested CPU or memory, taints, affinity rules), scores the rest, and writes a binding that sets `spec.nodeName`. That node's kubelet sees a Pod assigned to it and starts the containers through the container runtime.",
   "Static Pods take a different path. The kubelet reads manifests from a local directory, its `staticPodPath`, set in the kubelet configuration file (on kubeadm clusters, `/var/lib/kubelet/config.yaml` points to `/etc/kubernetes/manifests`). For every manifest there, the kubelet starts the Pod itself, with no API server or scheduler involved. It then creates a mirror Pod in the API so that `kubectl get pods` can show it. This is how kubeadm runs the control plane: kube-apiserver, kube-controller-manager, kube-scheduler and etcd are all static Pods defined by files in that directory.",
   "The differences matter when you are fixing things. Scheduler-placed Pods are usually owned by controllers such as ReplicaSets, DaemonSets and Jobs, and can be managed fully through kubectl. Static Pods are owned by the node. They cannot be moved, scaled or truly deleted via the API: if you run `kubectl delete pod` on a mirror Pod, the kubelet simply recreates the mirror, and the real Pod keeps running. To stop a static Pod you remove or move its manifest file on that node; to change one you edit the file, and the kubelet notices and recreates the Pod. Static Pod specs also cannot refer to other API objects such as ConfigMaps, Secrets or ServiceAccounts in the normal way, and they exist only on the node that has the file.",
   "You can recognize a mirror Pod in three ways. Its name ends with a hyphen and the node name, such as `kube-scheduler-cp1` or `web-static-node01`. Its `metadata.ownerReferences` point to the Node object rather than a ReplicaSet. And it carries the `kubernetes.io/config.mirror` annotation. On the exam, a task such as \"create a static Pod on node01\" means writing a manifest into node01's static Pod directory (check the kubelet config to confirm the path), not running `kubectl apply`.",
   "Now consider the scheduler going down, for example because someone broke `/etc/kubernetes/manifests/kube-scheduler.yaml`. Running Pods are unaffected, because kubelets keep running what they already have. Controllers keep working too: a Deployment scaled up still gets new Pod objects created by its ReplicaSet. But those Pods stay Pending forever with an empty NODE column in `kubectl get pods -o wide` and, tellingly, no FailedScheduling events at all, because nothing is even trying to place them. DaemonSet Pods are placed by the default scheduler too, so new ones will also wait.",
   "Two kinds of Pods still start in that situation. Static Pods start, because the kubelet does not need the scheduler. Pods with `spec.nodeName` already set also start, because they are effectively pre-bound: the kubelet on that node sees a Pod assigned to it and runs it, bypassing the scheduler's checks. That is why setting nodeName is a way to run a Pod in an emergency, and why the control plane itself can come up without a scheduler. Be aware that a pre-bound Pod skips scheduling checks, so it can land on a node that lacks the resources it needs.",
   "```bash\nkubectl get pods -n kube-system | grep scheduler\nkubectl get pods --field-selector=status.phase=Pending -A\n# on the control plane node\nsudo crictl ps -a | grep scheduler\nsudo crictl logs <container-id>\nsudo vi /etc/kubernetes/manifests/kube-scheduler.yaml\n```",
   "To fix a broken scheduler, start by looking at its state. `kubectl get pods -n kube-system` may show `kube-scheduler-<node>` in CrashLoopBackOff or Error, or may not show it at all if the manifest is so broken that the kubelet cannot parse it. Read the container logs with `kubectl logs -n kube-system` if the mirror Pod exists, or with `crictl ps -a` and `crictl logs` on the control plane node if it does not; the kubelet's own log (`journalctl -u kubelet`) reports manifest parse errors. Correct the manifest; a wrong image tag, a misspelled flag or a wrong kubeconfig path are common culprits. Save the file and wait for the kubelet to restart the Pod. Pending Pods are then scheduled automatically within seconds; you do not need to recreate them.",
   "One more cause produces exactly the same symptom. Pods can request a different scheduler with `spec.schedulerName`. The default value is `default-scheduler`. If a Pod names a scheduler that does not exist or is not running, it stays Pending in exactly the same silent way, even though the default scheduler is healthy and other Pods schedule normally. So when only some Pods are silently Pending, check their schedulerName before you go looking at the control plane."
  ],
  "analogy": "Think of a restaurant. Normal orders go through the host (the scheduler), who decides which table and waiter get them. Static Pods are the staff meal the cook prepares every day from a recipe taped to the kitchen wall; no host is involved. A Pod with nodeName set is a reservation already written on a specific table. If the host goes home, walk-in guests wait at the door forever, but staff meals and pre-assigned tables still get served. Unlike a restaurant, nobody complains while waiting: there are no events.",
  "terms": [
   [
    "Binding",
    "The act of assigning a Pod to a node, recorded by setting spec.nodeName."
   ],
   [
    "Static Pod",
    "A Pod the kubelet starts directly from a manifest file in its staticPodPath, without the API server or scheduler."
   ],
   [
    "staticPodPath",
    "The kubelet configuration setting naming the directory of static Pod manifests, /etc/kubernetes/manifests on kubeadm clusters."
   ],
   [
    "Mirror Pod",
    "The API representation of a static Pod, owned by the Node and not editable."
   ],
   [
    "schedulerName",
    "A Pod field naming which scheduler should place it, default-scheduler by default."
   ]
  ],
  "example": "All new Pods in the cluster are Pending with no events. `kubectl get pods -n kube-system` shows kube-scheduler-cp1 in CrashLoopBackOff, and its logs complain about an unknown flag. Removing the bad flag from the manifest restarts the scheduler, and the backlog of Pending Pods is scheduled within seconds.",
  "mistakes": [
   [
    "Deleting a mirror Pod with kubectl stops the static Pod.",
    "The kubelet owns the static Pod and recreates the mirror. Remove or move the manifest file from the node's static Pod directory to stop it."
   ],
   [
    "If the scheduler is down, running Pods stop or restart.",
    "Running Pods are unaffected because the kubelet keeps them going. Only new Pods that need placement stay Pending."
   ],
   [
    "A Pending Pod always has a FailedScheduling event explaining why.",
    "FailedScheduling only appears when a scheduler tried and failed. No events at all points to a missing scheduler or a schedulerName that nothing serves."
   ],
   [
    "Static Pods are created with kubectl apply using a special flag.",
    "They are plain manifest files placed in the kubelet's staticPodPath on the target node; the API server only shows a read-only mirror."
   ]
  ],
  "tryit": [
   [
    "You must run a Pod named `diag` on node02 while the kube-scheduler is being repaired. You do not have SSH access to node02, only kubectl. What do you do?",
    "Create the Pod with `spec.nodeName: node02` set in its manifest. It is pre-bound, so node02's kubelet starts it without the scheduler. A static Pod would also work but needs file access on node02, which you do not have."
   ],
   [
    "Only Pods from one team's new Deployment are Pending with no events, while other teams' Pods schedule fine. The kube-scheduler Pod is Running. What should you check?",
    "The Pod template's `spec.schedulerName`. If it names a custom scheduler that is not installed or not running, its Pods wait silently while default-scheduler Pods are placed normally."
   ]
  ],
  "tip": "Pending with a FailedScheduling event means the scheduler ran and found no node. Pending with no events at all suggests the scheduler is not running or the Pod names a scheduler that does not exist.",
  "check": [
   [
    "Which Pods can still start while the scheduler is down?",
    "Static Pods and Pods with spec.nodeName already set."
   ],
   [
    "How can you tell a mirror Pod apart from a normal Pod?",
    "Its name ends in the node name, its owner reference is the Node, and it carries the config.mirror annotation."
   ],
   [
    "How do you find where a node's static Pod manifests live?",
    "Check staticPodPath in the kubelet configuration file, typically /var/lib/kubelet/config.yaml; kubeadm sets it to /etc/kubernetes/manifests."
   ]
  ]
 },
 {
  "t": "Kubernetes network model: one IP per Pod, NAT-free Pod-to-Pod traffic, the CNI plugin's role, Pod and Service CIDRs",
  "hook": "Elena has just finished building a three-node kubeadm cluster for Copperleaf Insurance's new claims portal. The nodes show NotReady, and every Pod except the control plane sits in ContainerCreating. She installs a network plugin, the nodes turn Ready, and she relaxes. Then the claims team reports that Pods on node02 cannot reach Pods on node01, and the office printer on the same subnet has started dropping jobs. Her notes say she chose 192.168.0.0/16 for Pods because it was in a tutorial. The nodes live on 192.168.1.0/24. What rule did she break, and who in the cluster actually enforces the rules?",
  "simple": "Kubernetes promises your apps a simple network. Every Pod gets its own address, like every apartment getting its own mailbox, and any Pod can send mail directly to any other Pod, even in another building, without the address being rewritten along the way. Kubernetes does not deliver that mail itself. A network plugin (called a CNI plugin) does the actual wiring. You also pick two address ranges when you build the cluster: one for Pods and one for Services, which are stable front doors to groups of Pods. These ranges must not overlap each other or the network your machines already use, or mail gets delivered to the wrong place.",
  "body": [
   "Kubernetes makes networking simple for applications by setting a few strict rules and leaving the implementation to a plugin. Understanding the rules helps you reason about any connectivity problem, because every network plugin, whatever its internals, must satisfy them.",
   "The model has three requirements. First, every Pod gets its own IP address, shared by all containers in the Pod. Second, every Pod can communicate with every other Pod on any node without network address translation (NAT), so the source IP a receiver sees is the sender's real Pod IP. Third, agents on a node, such as the kubelet, can reach all Pods on that node, which is how liveness and readiness probes work. Within a Pod, containers share one network namespace, so they talk to each other over `localhost` and must not try to listen on the same port. A small pause (sandbox) container is created first to hold that namespace open, which is why you may see `pause` containers in `crictl ps` output; the application containers join its namespace.",
   "Why does the model insist on no NAT? Because applications behave as if they were on a flat network. A database can log real client IPs, a NetworkPolicy can match on Pod addresses, and a service discovery system can hand out the address a Pod sees for itself and have it work everywhere. Traffic leaving the cluster to the internet is a different matter; it is commonly masqueraded to the node's address, but that is outside the Pod-to-Pod rule.",
   "Kubernetes itself does not implement these rules. The Container Network Interface (CNI) plugin does. CNI is a specification for how a container runtime asks a plugin to attach a container to a network. When the kubelet asks the runtime, such as containerd, to create a Pod sandbox, the runtime reads the CNI configuration from `/etc/cni/net.d/` and calls the plugin binary from `/opt/cni/bin/`. The plugin creates a virtual interface (often a veth pair) in the Pod's network namespace, assigns an IP from the node's range and sets up routes. Between nodes, the plugin either routes Pod traffic natively, for example by advertising Pod routes with the Border Gateway Protocol (BGP), or encapsulates it in an overlay such as VXLAN (Virtual Extensible LAN), which wraps Pod packets inside node-to-node packets. Popular plugins include Calico, Cilium and Flannel, each installed as Pods, usually a DaemonSet, after `kubeadm init`.",
   "Knowing that order of events explains the classic symptom of a missing or broken CNI. Without a working plugin, the runtime cannot finish creating sandboxes, so Pods are stuck in ContainerCreating with events such as \"failed to setup network for sandbox\", and the kubelet reports the node as NotReady with a message that the network plugin is not ready. CoreDNS Pods are usually the first ones you notice stuck, because they are the first non-host-network Pods a fresh cluster runs.",
   "Two address ranges must be planned before you build the cluster, and they must not overlap with each other or with your node network. The Pod CIDR is the range Pods draw from, set with `kubeadm init --pod-network-cidr` (it becomes the controller-manager's `--cluster-cidr`). With node IP address management (IPAM) in the controller-manager, each node gets a slice recorded in `node.spec.podCIDR`, though many CNIs manage their own allocation and may ignore that field. Your CNI's configuration must agree with the range you chose, which is why plugin install instructions often tell you which `--pod-network-cidr` to use or how to change theirs. The Service CIDR is the range for Service virtual IPs, set by the API server's `--service-cluster-ip-range`; kubeadm's default is `10.96.0.0/12`, which is why the `kubernetes` Service is often 10.96.0.1 and CoreDNS is often 10.96.0.10.",
   "```bash\nkubectl get pods -o wide                     # Pod IPs and nodes\nkubectl get nodes -o jsonpath='{.items[*].spec.podCIDR}'\ngrep service-cluster-ip-range /etc/kubernetes/manifests/kube-apiserver.yaml\nkubectl cluster-info dump | grep -m1 cluster-cidr\n```",
   "The commands above answer the most common exam questions about ranges. `kubectl get pods -o wide` shows each Pod's IP and node, so you can see whether IPs fall in the expected Pod CIDR. The jsonpath query shows per-node slices if node IPAM is in use. The grep against the API server's static Pod manifest gives the Service CIDR directly, and the cluster-info dump search finds the cluster CIDR the controller-manager was given. If you are asked what range a CNI uses, also look at its own configuration, for example its ConfigMap or custom resources.",
   "Service IPs are different from Pod IPs, and confusing them leads to wrong conclusions. No interface owns a Service IP; it exists only as forwarding rules programmed by kube-proxy (or a replacement such as Cilium) on every node. Pod IPs are real, routable addresses inside the cluster network, attached to real interfaces in Pod namespaces. Keep that distinction in mind when testing: pinging a Service IP often fails even when the Service works fine, while pinging a Pod IP should normally succeed unless a NetworkPolicy blocks it. When Pod-to-Pod traffic across nodes fails but same-node traffic works, suspect the CNI's inter-node path, such as blocked overlay ports in a firewall or overlapping ranges, rather than Services."
  ],
  "analogy": "Picture a city where every apartment (Pod) has its own street address, and the postal service (the CNI plugin) promises to deliver letters between any two apartments without relabeling the envelope, so the reply address is always genuine. Kubernetes is the city council that wrote that promise into law but hired a contractor to run the post office. A Service IP is more like a P.O. box number: no building sits at that address, the sorting office just redirects mail, which is why knocking on its door (ping) gets no answer.",
  "terms": [
   [
    "Pod CIDR",
    "The address range from which Pod IPs are allocated, set at cluster creation with --pod-network-cidr."
   ],
   [
    "Service CIDR",
    "The address range for Service ClusterIPs, set by --service-cluster-ip-range on the API server."
   ],
   [
    "CNI plugin",
    "A network plugin, called by the container runtime, that gives each Pod an interface and IP and connects Pods across nodes."
   ],
   [
    "Pause container",
    "The sandbox container that holds a Pod's shared network namespace."
   ],
   [
    "Overlay network",
    "An encapsulation (such as VXLAN) that carries Pod traffic between nodes over the node network."
   ]
  ],
  "example": "A new cluster was built with a Pod CIDR of 192.168.0.0/16 while the nodes themselves are on 192.168.1.0/24. Pods on different nodes cannot reach each other and some node traffic is misrouted. Rebuilding with a non-overlapping Pod CIDR such as 10.244.0.0/16 fixes it, showing why ranges must be planned first.",
  "mistakes": [
   [
    "Kubernetes itself assigns Pod IPs and routes traffic between nodes.",
    "The CNI plugin, called by the container runtime, creates interfaces, assigns IPs and connects nodes. Without one, Pods stay in ContainerCreating and nodes are NotReady."
   ],
   [
    "Pods on different nodes reach each other through NAT on the node.",
    "The model requires NAT-free Pod-to-Pod traffic; the receiver sees the sender's real Pod IP."
   ],
   [
    "The Service CIDR and Pod CIDR can be the same range to save addresses.",
    "They must not overlap each other or the node subnet. Service IPs are virtual rules, Pod IPs are real interfaces, and overlapping them breaks routing."
   ],
   [
    "A failed ping to a Service IP proves the Service is broken.",
    "Service IPs are only forwarding rules for specific ports. Test the port with curl or nc instead; ping a Pod IP to check basic reachability."
   ]
  ],
  "tryit": [
   [
    "After running `kubeadm init` and joining two workers, all nodes are NotReady and CoreDNS Pods are stuck in ContainerCreating. `kubectl describe pod` on a CoreDNS Pod mentions failing to set up the network for the sandbox. What is the most likely cause and fix?",
    "No CNI plugin is installed or it is misconfigured. Install a CNI (applying its manifest or Helm chart) whose Pod range matches the --pod-network-cidr you used; the nodes become Ready and the CoreDNS sandboxes are created."
   ],
   [
    "You are asked which address range Services use on an existing kubeadm cluster, and you have SSH access to the control plane node. Where do you look?",
    "In /etc/kubernetes/manifests/kube-apiserver.yaml, at the --service-cluster-ip-range flag. The Pod CIDR, by contrast, appears in the controller-manager's --cluster-cidr and the CNI configuration."
   ]
  ],
  "tip": "Remember which component owns which range: the Pod CIDR is used by the CNI and controller-manager, the Service CIDR by the API server and kube-proxy. They must not overlap each other or the node subnet.",
  "check": [
   [
    "Do Pods need NAT to talk to Pods on other nodes?",
    "No, the network model requires NAT-free Pod-to-Pod communication."
   ],
   [
    "Where do you find the Service CIDR on a kubeadm cluster?",
    "In the --service-cluster-ip-range flag of the kube-apiserver static Pod manifest."
   ],
   [
    "How do two containers in the same Pod talk to each other?",
    "Over localhost, because they share one network namespace held by the pause container; they must use different ports."
   ]
  ]
 },
 {
  "t": "Kube-proxy modes (iptables, IPVS, nftables) and how Service virtual IPs work",
  "hook": "Jamal at Riverbend Health gets a help-desk ticket on a quiet Thursday: \"Patient portal times out, but only sometimes.\" He runs `ping 10.96.44.12`, the portal Service's ClusterIP, and gets nothing back, from any node. Panic rises, until a colleague points out that the portal works fine from some Pods and fails from others. The pattern lines up with one worker, node02. Somewhere on that node, the machinery that turns a Service's virtual address into a real Pod address has stopped doing its job. What is that machinery, where does it keep its settings, and why was the ping never going to answer?",
  "simple": "A Service in Kubernetes has an address, but no computer actually owns that address. Instead, a helper called kube-proxy runs on every node and writes forwarding rules into the node's operating system: \"anything sent to this Service address and port, send it on to one of these Pods.\" It is like a call-forwarding service for a phone number that has no phone attached. kube-proxy can write those rules in different styles, called modes: iptables, IPVS or nftables. They all do the same job with different tools. Because only specific ports are forwarded, ping, which uses no port, gets no answer even when the Service works.",
  "body": [
   "A Service's ClusterIP is virtual, and that single fact explains most of this topic. No machine owns it and no process listens on it. Instead, kube-proxy, which runs on every node, watches Services and EndpointSlices through the API server and programs the node's kernel so that packets sent to ClusterIP:port are rewritten with destination NAT (DNAT) to one of the ready backend Pod IPs and target ports. Because every node has the same rules, a client Pod anywhere can reach any Service, and the rewrite happens on the client's own node before the packet ever leaves it.",
   "kube-proxy supports several modes on Linux, and you should be able to recognize each one's footprint on a node. They differ in which kernel framework holds the rules and how well they scale, not in what clients experience.",
   "In `iptables` mode, long the default, kube-proxy creates chains in the nat table. `KUBE-SERVICES` matches the ClusterIP and port and jumps to a per-Service `KUBE-SVC-...` chain. That chain picks a backend using random probability rules, so with three endpoints the first rule matches about a third of the time, the next half of the remainder, and so on. The chosen per-endpoint `KUBE-SEP-...` chain performs the actual DNAT to the Pod IP and port. NodePort traffic enters through a `KUBE-NODEPORTS` chain. This mode is reliable and well understood, but rules are evaluated sequentially and every update rewrites large rule sets, so very large clusters with many Services see slower updates and higher CPU use.",
   "In `ipvs` mode, kube-proxy uses the kernel's IP Virtual Server (IPVS) load balancer, which was built for exactly this job. It creates a dummy interface, `kube-ipvs0`, holding all the ClusterIPs, and defines an IPVS virtual server for each Service address and port with a real server for each backend Pod. IPVS uses hash tables, so lookups stay fast as the number of Services grows, and it offers several scheduling algorithms such as round robin and least connections. It needs the IPVS kernel modules to be loaded, and you inspect it with `ipvsadm -Ln`. Because the ClusterIPs sit on a local interface in this mode, some behaviors differ slightly from iptables mode.",
   "In `nftables` mode, kube-proxy programs the newer nftables framework, the successor to iptables in the Linux kernel. It aims to combine good performance at scale with the familiar rule-based model and is the direction the project is moving. Inspect it with `nft list table ip kube-proxy` (and `ip6 kube-proxy` for IPv6). Which modes are available, which is the default and which are recommended depend on your Kubernetes and kernel versions, so check the documentation for the version you run rather than memorizing a single answer.",
   "On kubeadm clusters, kube-proxy runs as a DaemonSet named `kube-proxy` in the kube-system namespace, so there is one Pod per node. It reads its configuration, a KubeProxyConfiguration object, from the `kube-proxy` ConfigMap. The `mode` field selects the mode; an empty string means the default for the platform. kube-proxy only reads this configuration at startup, so after editing the ConfigMap you must restart the DaemonSet so the Pods pick it up. A typo in the mode makes the Pods fail to start, which stops Service rule updates on those nodes.",
   "```bash\nkubectl -n kube-system get cm kube-proxy -o yaml | grep mode\nkubectl -n kube-system rollout restart ds kube-proxy\nkubectl -n kube-system logs ds/kube-proxy | head   # shows the proxier in use\nsudo iptables -t nat -L KUBE-SERVICES -n | grep <cluster-ip>\n```",
   "Those commands form a quick troubleshooting path. Read the configured mode from the ConfigMap, check the kube-proxy logs to see which proxier actually started (and any errors about missing kernel modules or invalid settings), and on the node, look for the Service's ClusterIP in the relevant rules: iptables chains, the IPVS table or the nftables table. If the ClusterIP is present but has no endpoint rules behind it, the Service has no ready endpoints, which is a selector or readiness problem rather than a kube-proxy problem. If the ClusterIP is missing on one node only, that node's kube-proxy is the suspect.",
   "Because the ClusterIP is only a DNAT rule for specific ports, `ping <ClusterIP>` usually fails even when the Service works: nothing translates or answers Internet Control Message Protocol (ICMP) echo requests to that address. Test with the Service's actual port instead, for example `curl <ClusterIP>:<port>` or `nc -zv <ClusterIP> <port>` from a Pod or node. Testing the DNS name, such as `curl web.shop.svc.cluster.local`, checks DNS and kube-proxy together.",
   "Finally, kube-proxy is not mandatory. Some CNIs, such as Cilium, can replace kube-proxy entirely with eBPF (extended Berkeley Packet Filter) programs loaded into the kernel. In that case there may be no kube-proxy DaemonSet at all and no KUBE- chains to find; the Service rules live in eBPF maps that you inspect with the CNI's own tools. If you are on an unfamiliar cluster and cannot find kube-proxy, check whether the CNI has taken over that role before assuming something is broken."
  ],
  "analogy": "A ClusterIP is like a company's main phone number that rings no desk. Each office (node) has a receptionist (kube-proxy) with a forwarding list: calls to that number on extension 80 go to one of these employees (Pods). iptables mode is a receptionist reading a long list top to bottom, IPVS is one using an indexed directory, and nftables is a newer, tidier directory format. The analogy breaks in one way: a real receptionist answers a hello, but a ClusterIP ignores ping because only specific extensions are forwarded.",
  "terms": [
   [
    "ClusterIP",
    "A virtual IP for a Service, implemented as forwarding rules rather than a real interface."
   ],
   [
    "kube-proxy",
    "A per-node agent, run as a DaemonSet on kubeadm clusters, that programs Service forwarding rules from Services and EndpointSlices."
   ],
   [
    "iptables mode",
    "kube-proxy mode that uses NAT chains (KUBE-SERVICES, KUBE-SVC, KUBE-SEP) to forward Service traffic."
   ],
   [
    "IPVS mode",
    "kube-proxy mode using the kernel's IP Virtual Server hash-based load balancer, inspected with ipvsadm."
   ],
   [
    "nftables mode",
    "kube-proxy mode that programs rules with the nftables framework, inspected with nft."
   ]
  ],
  "example": "A Service works from node01 but not from node02. On node02 the kube-proxy Pod is in CrashLoopBackOff after someone set `mode: ipvsx` in the ConfigMap. Fixing the typo and restarting the DaemonSet restores the rules on node02 and the Service answers from both nodes.",
  "mistakes": [
   [
    "kube-proxy is a proxy that receives each Service connection and relays it.",
    "In iptables, IPVS and nftables modes, kube-proxy only programs kernel rules; the kernel rewrites packets. kube-proxy is not in the data path."
   ],
   [
    "Editing the kube-proxy ConfigMap changes the mode immediately.",
    "kube-proxy reads its configuration at startup; restart the DaemonSet with kubectl rollout restart for the change to apply."
   ],
   [
    "If ping to a ClusterIP fails, the Service is down.",
    "ClusterIPs only forward specific ports, so ICMP gets no reply. Test the Service port with curl or nc."
   ],
   [
    "Every cluster must have a kube-proxy DaemonSet.",
    "Some CNIs, such as Cilium, can replace kube-proxy with eBPF; then there is no kube-proxy and no KUBE- chains."
   ]
  ],
  "tryit": [
   [
    "A colleague changed the kube-proxy ConfigMap to `mode: ipvs` an hour ago, but `ipvsadm -Ln` on the nodes shows an empty table and the iptables KUBE-SERVICES chain is still full. Services work. What happened, and what should you do?",
    "The kube-proxy Pods were never restarted, so they still run with the old iptables configuration. Run `kubectl -n kube-system rollout restart ds kube-proxy`, make sure the IPVS kernel modules are available, then check the logs to confirm the IPVS proxier started."
   ],
   [
    "A Service's ClusterIP appears in the KUBE-SERVICES chain on every node, but its KUBE-SVC chain has no KUBE-SEP entries and connections are rejected. Is kube-proxy broken?",
    "No. kube-proxy is programming the Service correctly, but there are no ready endpoints. Check the EndpointSlices, the Service selector against the Pod labels and the Pods' readiness."
   ]
  ],
  "tip": "Do not use ping to test a ClusterIP; test the port. If one node cannot reach Services while others can, suspect that node's kube-proxy Pod first.",
  "check": [
   [
    "Where is kube-proxy's mode configured on a kubeadm cluster?",
    "In the mode field of the kube-proxy ConfigMap in kube-system."
   ],
   [
    "Why does ping to a ClusterIP typically fail?",
    "The ClusterIP exists only as port-specific forwarding rules; nothing answers ICMP on it."
   ],
   [
    "Which command inspects Service rules in IPVS mode?",
    "ipvsadm -Ln, which lists IPVS virtual servers and their real servers (Pod backends)."
   ]
  ]
 },
 {
  "t": "Service types: ClusterIP, NodePort (30000–32767), LoadBalancer (cloud controller or MetalLB), headless and ExternalName",
  "hook": "Sofia runs the on-premises Kubernetes lab at Granite Valley College. A student team has deployed a voting app and created a LoadBalancer Service so classmates can reach it from their laptops. Ten minutes later, `kubectl get svc` still shows EXTERNAL-IP `<pending>`, and the team insists Kubernetes is broken. Meanwhile, another team's database StatefulSet needs each replica to be reachable by name, and a third wants Pods to call the college's hosted mail server using a cluster-style DNS name. Five Service types exist for reasons like these. Which one fits each team, and why is the first one still pending?",
  "simple": "Pods come and go, and their addresses change each time. A Service is a stable name and address in front of a group of Pods, like a shop's front counter that stays put while staff change shifts behind it. The Service type decides who can reach that counter. ClusterIP is for visitors already inside the building (the cluster). NodePort adds a door in the outside wall of every node. LoadBalancer adds a proper front entrance managed by an outside helper, such as a cloud provider. Headless gives out the staff members' direct numbers instead of a counter, and ExternalName is just a sign pointing to a different building.",
  "body": [
   "A Service gives a stable name and address to a changing set of Pods, selected by labels. Pods are replaced during rollouts, rescheduled when nodes fail and scaled up and down, and each new Pod gets a new IP. Clients should not track those addresses, so they talk to the Service instead. Its `type` decides who can reach it and how, and the main types build on each other like layers.",
   "ClusterIP is the default and the foundation. The Service gets a virtual IP from the Service CIDR that is reachable only inside the cluster, plus a DNS name such as `web.shop.svc.cluster.local`. Two port fields matter: `port` is what clients connect to on the Service, and `targetPort` is the container port, a number or a named port from the Pod spec, that traffic is forwarded to. If you leave out targetPort it defaults to the same value as port. Most internal communication, such as a frontend calling an API, uses ClusterIP Services.",
   "NodePort builds on ClusterIP: it keeps the ClusterIP and additionally opens the same port on every node, from the range 30000 to 32767 unless the API server's `--service-node-port-range` is changed. Clients outside the cluster reach any node's IP on that port, and kube-proxy forwards the traffic to a ready Pod, even if that Pod is on a different node. You can let Kubernetes choose the port or set `nodePort` explicitly; choosing one outside the range or already in use is rejected by the API server.",
   "LoadBalancer builds on NodePort and asks for an external load balancer to be provisioned in front of the nodes. In a cloud, the cloud-controller-manager sees the Service, creates a load balancer through the provider's API and writes its address into the Service status, where it appears in the EXTERNAL-IP column. On bare metal or in a lab, nothing does this unless you install something like MetalLB, which assigns addresses from a pool you configure and announces them on the local network. Without such a component, the Service's EXTERNAL-IP stays `<pending>` indefinitely, though its NodePort and ClusterIP still work. That is a missing add-on, not a broken Service.",
   "```bash\nkubectl expose deployment web --port=80 --target-port=8080 --name=web          # ClusterIP\nkubectl expose deployment web --port=80 --target-port=8080 --type=NodePort --name=web-np\nkubectl create service nodeport web2 --tcp=80:8080 --node-port=30080\nkubectl get svc -o wide\n```",
   "The output of `kubectl get svc -o wide` is worth reading carefully. The TYPE column shows the type, CLUSTER-IP the virtual IP, EXTERNAL-IP the load balancer address or `<none>` or `<pending>`, PORT(S) entries such as `80:30080/TCP` (Service port, then NodePort) and SELECTOR the labels it matches. Note that `kubectl create service` sets a selector of `app=<name>`, which may not match your Pods, while `kubectl expose` copies the real selector.",
   "A headless Service sets `clusterIP: None`. It gets no virtual IP and kube-proxy ignores it; instead, DNS returns the individual IPs of the ready Pods as A records. It is used when clients need to reach specific Pods or do their own load balancing, most notably by StatefulSets, whose Pods get stable names like `db-0.db.ns.svc.cluster.local` through the headless Service named in the StatefulSet's `serviceName`. A database client can then connect to the primary by name rather than to a random replica.",
   "An ExternalName Service has no selector and no proxying at all. It simply makes cluster DNS return a CNAME record pointing to an external hostname given in `spec.externalName`, for example to alias `db.prod.svc.cluster.local` to a managed database's DNS name. That lets applications use a consistent in-cluster name while the real endpoint lives elsewhere, and you can later switch it to a normal Service without changing clients. Because it is only DNS, ports are not remapped, and protocols that check hostnames, such as HTTPS with certificate validation, may be affected because the client asked for one name and reached a server certificate for another.",
   "When you create a Service with `kubectl expose`, it copies the selector from the resource you expose, which is the easiest way to get the labels right under time pressure. Whatever the type, a Service only sends traffic to Pods that match its selector and are Ready, so the first check for a silent Service is always `kubectl get endpointslices -l kubernetes.io/service-name=<svc>`. If the endpoint list is empty, compare the selector with `kubectl get pods --show-labels` and check readiness probes; if endpoints exist but connections are refused, check that targetPort matches the port the container actually listens on."
  ],
  "analogy": "Think of an office building. ClusterIP is an internal extension only reachable from desks inside. NodePort opens the same numbered side door on every wing of the building. LoadBalancer adds a staffed main entrance out front, but only if a security company (cloud controller or MetalLB) is hired; otherwise the entrance sign says \"pending\". Headless is a staff directory listing each person's direct line. ExternalName is a sign saying \"Accounts has moved to the building across the street.\" Unlike real doors, all three outer layers still include the inner extension.",
  "mnemonic": "The three layered types stack in order C, N, L: \"Cats Nap Lazily.\" ClusterIP is the base, NodePort adds a port on every node, and LoadBalancer adds an external balancer on top of the NodePort.",
  "terms": [
   [
    "ClusterIP",
    "The default Service type, reachable only inside the cluster through a virtual IP."
   ],
   [
    "NodePort",
    "A Service type that also opens a port in the 30000–32767 range on every node."
   ],
   [
    "LoadBalancer",
    "A Service type that requests an external load balancer from a cloud controller or MetalLB."
   ],
   [
    "Headless Service",
    "A Service with clusterIP None whose DNS name resolves to Pod IPs directly."
   ],
   [
    "ExternalName",
    "A Service that returns a DNS CNAME to an external hostname, with no proxying."
   ],
   [
    "targetPort",
    "The container port, by number or name, that a Service forwards traffic to."
   ]
  ],
  "example": "On a bare-metal kubeadm lab, a LoadBalancer Service stays at EXTERNAL-IP `<pending>`. You can still reach it through any node's IP and the assigned NodePort. Installing MetalLB with an address pool from the lab subnet gives it an external IP.",
  "mistakes": [
   [
    "EXTERNAL-IP pending means the LoadBalancer Service is broken and unusable.",
    "It means nothing provisions load balancers. The ClusterIP and NodePort still work; install a cloud controller integration or MetalLB for an external IP."
   ],
   [
    "A NodePort Service can use any port, such as 8080, on the nodes.",
    "NodePorts come from 30000–32767 by default, set by the API server's --service-node-port-range."
   ],
   [
    "port is the container's port and targetPort is the Service's port.",
    "It is the reverse: port is what clients connect to on the Service, targetPort is where the container listens."
   ],
   [
    "An ExternalName Service proxies traffic and can remap ports.",
    "It only returns a CNAME in DNS; there is no proxy, no selector and no port remapping."
   ]
  ],
  "tryit": [
   [
    "A StatefulSet named `kafka` needs each broker reachable at a stable per-Pod DNS name, and clients should not be load-balanced randomly across brokers. Which Service type do you create, and what must match?",
    "A headless Service (clusterIP: None) whose name matches the StatefulSet's serviceName. DNS then provides records like kafka-0.kafka.<ns>.svc.cluster.local pointing at each Pod."
   ],
   [
    "You exposed Deployment `shop` with `kubectl create service clusterip shop --tcp=80:8080`, but the Service has no endpoints. The Pods are labeled `app.kubernetes.io/name=shop` and are Ready. Why?",
    "kubectl create service set the selector app=shop, which does not match the Pods' labels. Recreate it with kubectl expose deployment shop --port=80 --target-port=8080, which copies the Deployment's selector, or edit the selector."
   ]
  ],
  "tip": "port is the Service's port, targetPort is the container's port, nodePort is the node's port. Mixing up port and targetPort is the most common cause of a Service that exists but refuses connections.",
  "check": [
   [
    "Why does a LoadBalancer Service show EXTERNAL-IP pending on a bare-metal cluster?",
    "Nothing is provisioning load balancers; you need a cloud controller or something like MetalLB."
   ],
   [
    "What does DNS return for a headless Service?",
    "The IP addresses of its ready Pods, instead of a single virtual IP."
   ],
   [
    "What is the default NodePort range and where is it configured?",
    "30000–32767, configurable with the kube-apiserver flag --service-node-port-range."
   ]
  ]
 },
 {
  "t": "EndpointSlices, Services without selectors, externalTrafficPolicy and sessionAffinity",
  "hook": "The security team at Bluefin Outfitters has a complaint: the storefront's rate limiter is useless, because every request in its logs comes from one of three addresses, the cluster's own nodes. At the same time, the app team wants the cluster's Pods to reach a legacy inventory database on a fixed IP using a normal Service name, and a customer support lead reports that shoppers lose their carts whenever they are bounced to a different backend. Kenji, the cluster admin, realizes these three tickets touch the same few Service fields. Which settings decide where traffic lands, and what does each one cost?",
  "simple": "A Service has a list of the Pods that should receive its traffic. Kubernetes keeps that list in objects called EndpointSlices, updated automatically from the Service's label selector, and only Pods that are ready count. If a Service has no selector, you can write the list yourself, which lets a Service point at something outside the cluster. Two settings tune delivery. externalTrafficPolicy decides whether outside traffic may hop to a Pod on another node (even spread, but the real visitor address is lost) or must stay on the node it arrived at (real address kept). sessionAffinity keeps one visitor going to the same Pod, like a regular customer always sent to the same cashier.",
  "body": [
   "A Service's selector is not what kube-proxy actually uses to route traffic, and knowing the real chain makes Service troubleshooting much faster. The EndpointSlice controller, part of the kube-controller-manager, evaluates each Service's selector, finds the matching Pods and writes their IPs, ports and readiness into EndpointSlice objects. kube-proxy, cluster DNS for headless Services, and ingress and Gateway controllers all consume those slices. EndpointSlices replaced the older Endpoints API, which could not scale to very large Services because one object held every address and had to be rewritten and redistributed to every node whenever any single Pod changed.",
   "Each EndpointSlice is labeled `kubernetes.io/service-name=<service>` and holds a limited number of endpoints (100 by default), so a large Service has several slices, and a change to one Pod only updates one small object. Each endpoint records its addresses, the node it runs on and its conditions: `ready`, `serving` and `terminating`. Pods that fail their readiness probe stay listed but with ready false, and kube-proxy stops sending them new traffic. Terminating Pods are marked as such so that proxies can finish existing connections gracefully. The slice also lists the port names and numbers, which must line up with the Service's port names.",
   "```bash\nkubectl get endpointslices -l kubernetes.io/service-name=web\nkubectl describe endpointslice <name>\n```",
   "In practice, `kubectl get endpointslices` gives a fast answer to \"does this Service have backends at all?\" An ENDPOINTS column of `<unset>` or an empty list means the selector matches no Ready Pods, so check labels with `kubectl get pods --show-labels` and readiness with `kubectl describe pod`. The describe output shows each endpoint's conditions, so you can see Pods that exist but are not ready.",
   "A Service without a selector gets no automatic EndpointSlices, because the controller has nothing to evaluate. That is useful for pointing a cluster Service at something outside the cluster, such as a database on a fixed IP, a service in another cluster or a set of virtual machines during a migration, while clients still use a normal Service DNS name and ClusterIP. You create the Service with ports but no selector, then create an EndpointSlice yourself with the service-name label, `addressType: IPv4`, the endpoint addresses and port names that match the Service's port names. Unlike an ExternalName Service, this works with IP addresses and goes through kube-proxy with port mapping.",
   "```yaml\napiVersion: discovery.k8s.io/v1\nkind: EndpointSlice\nmetadata:\n  name: legacy-db-1\n  labels: {kubernetes.io/service-name: legacy-db}\naddressType: IPv4\nports:\n- {name: pg, port: 5432, protocol: TCP}\nendpoints:\n- addresses: [\"10.20.0.15\"]\n```",
   "`externalTrafficPolicy` applies to NodePort and LoadBalancer Services and controls traffic arriving from outside the cluster. With `Cluster`, the default, any node accepts the traffic and may forward it to a Pod on another node. Load spreads evenly across all Pods, but the packet is source-NATed on that extra hop, so the source IP is replaced with the node's, and the application sees the wrong client address. With `Local`, a node only forwards to Pods on itself. The client's source IP is preserved and there is no extra hop, but nodes without a local Pod drop the traffic, so a client hitting such a node's NodePort directly gets no answer. Cloud load balancers use a health check node port (`healthCheckNodePort`) to detect which nodes have local Pods and avoid the others. Load can also be uneven: a node with one Pod and a node with five Pods may receive the same share from the load balancer.",
   "`internalTrafficPolicy` is the equivalent setting for traffic that originates inside the cluster. Set to `Local`, it makes Pods reach only endpoints on their own node, which is useful for node-local agents such as a logging or metrics collector run as a DaemonSet. If no local endpoint exists, the traffic is dropped rather than sent elsewhere.",
   "`sessionAffinity: ClientIP` makes kube-proxy send all connections from the same client IP to the same backend Pod, for a timeout set in `sessionAffinityConfig.clientIP.timeoutSeconds` (10800 seconds, three hours, by default). The default is `None`, which picks a backend per connection. Affinity is by IP only, not by cookie or user, so many clients behind one NAT gateway all stick to one Pod and can overload it, and a client whose IP changes loses its stickiness. It also does not survive the Pod going away. For durable sessions, applications should store session state outside the Pod, for example in a shared cache, and Layer 7 cookie affinity is a feature of ingress or Gateway controllers rather than the Service."
  ],
  "analogy": "externalTrafficPolicy is like a hotel with several entrances. With Cluster, any doorman lets you in and walks you to whichever free room exists in any wing, but signs the guest book with his own name, so the front desk never learns who you are. With Local, each doorman only admits guests to rooms in his own wing and lets you sign your own name, but if his wing is full or empty you are turned away. The analogy stops at load: real hotels redirect guests, while Local simply drops traffic at nodes without Pods.",
  "terms": [
   [
    "EndpointSlice",
    "An object listing a subset of a Service's backend addresses, ports and readiness conditions."
   ],
   [
    "Selectorless Service",
    "A Service without a selector whose EndpointSlices you manage manually."
   ],
   [
    "externalTrafficPolicy: Local",
    "Only node-local Pods receive external traffic, preserving the client source IP."
   ],
   [
    "internalTrafficPolicy: Local",
    "In-cluster clients reach only Service endpoints on their own node."
   ],
   [
    "sessionAffinity: ClientIP",
    "Routes a given client IP consistently to the same backend Pod, for three hours by default."
   ]
  ],
  "example": "A web application behind a NodePort Service logs every visitor as a node IP, breaking its rate limiting. Setting `externalTrafficPolicy: Local` preserves real client IPs. The team also runs the Pods as a DaemonSet so every node has a local endpoint and no traffic is dropped.",
  "mistakes": [
   [
    "kube-proxy reads the Service selector and finds Pods itself.",
    "The EndpointSlice controller evaluates the selector; kube-proxy and other consumers read the EndpointSlices."
   ],
   [
    "externalTrafficPolicy: Local spreads traffic more evenly.",
    "Cluster spreads load evenly; Local preserves the client source IP but drops traffic at nodes without local Pods and can be uneven."
   ],
   [
    "sessionAffinity: ClientIP keeps each user on the same Pod using cookies.",
    "It works only on client IP address, for a timeout of 10800 seconds by default; many users behind one NAT share one backend."
   ],
   [
    "A selectorless Service is the same as an ExternalName Service.",
    "A selectorless Service has a ClusterIP and uses EndpointSlices you write, with IPs and port mapping through kube-proxy; ExternalName is only a DNS CNAME."
   ]
  ],
  "tryit": [
   [
    "Your team needs `orders-db.shop.svc.cluster.local` to reach a PostgreSQL server at 10.30.4.20 port 5432 outside the cluster. The database has no DNS name. How do you build this?",
    "Create a Service named orders-db in namespace shop with a port (for example named pg, port 5432) and no selector, then create an EndpointSlice labeled kubernetes.io/service-name=orders-db with addressType IPv4, the address 10.30.4.20 and a matching port named pg. ExternalName will not work because there is no hostname to CNAME to."
   ],
   [
    "A LoadBalancer Service with externalTrafficPolicy Local runs 2 Pods on a 6-node cluster. Users report that some direct NodePort tests fail while traffic through the cloud load balancer works. Is this a bug?",
    "No. With Local, nodes without a local Pod drop external traffic. The cloud load balancer's health checks avoid those nodes, but direct NodePort tests against them fail. Test against nodes running the Pods, or use Cluster if source IP does not matter."
   ]
  ],
  "tip": "An empty EndpointSlice means the selector matches no Ready Pods; check labels and readiness before blaming kube-proxy. For externalTrafficPolicy, remember: Local preserves source IP, Cluster spreads load.",
  "check": [
   [
    "Which label links an EndpointSlice to its Service?",
    "kubernetes.io/service-name set to the Service's name."
   ],
   [
    "What is the trade-off of externalTrafficPolicy Local?",
    "It preserves client source IPs and avoids an extra hop, but nodes without local Pods cannot serve the traffic and load may be uneven."
   ],
   [
    "What is the default sessionAffinity timeout for ClientIP?",
    "10800 seconds (three hours), set in sessionAffinityConfig.clientIP.timeoutSeconds."
   ]
  ]
 },
 {
  "t": "NetworkPolicies: default deny, ingress and egress rules, podSelector, namespaceSelector (kubernetes.io/metadata.name), ipBlock, ports",
  "hook": "An auditor at Summit Mutual asks Rachel, the cluster admin, a simple question: \"Can the marketing website's Pods connect to the payments database?\" Rachel checks and the honest answer is yes, because nothing stops them. She writes a default-deny policy for the payments namespace that afternoon, applies it, and within a minute every payments Pod starts failing with \"could not resolve host\". The database is fine, the Pods are fine, and nothing obviously network-related is in the error. What did her policy block that she never intended to block, and how should she have written the allow rules?",
  "simple": "Out of the box, every Pod in a Kubernetes cluster can talk to every other Pod, like an office where every door is unlocked. A NetworkPolicy is a set of rules that locks doors for chosen Pods and then lists exactly who may come in (ingress) or which places they may go out to (egress). You pick Pods by their labels, pick allowed partners by labels, namespace or IP range, and optionally limit ports. Rules only ever allow things; there is no \"deny\" rule. The locks are installed by the network plugin, so if your plugin does not support policies, the rules are ignored without any error.",
  "body": [
   "By default, every Pod can talk to every other Pod in every namespace. NetworkPolicies let you restrict that, like a firewall defined with labels instead of IP addresses. They are enforced by the Container Network Interface (CNI) plugin, not by the API server, so a plugin without policy support (plain Flannel, for example) silently ignores them: the objects are accepted and stored, and nothing changes. Before debugging a policy that seems to have no effect, confirm the CNI enforces policies; Calico and Cilium do.",
   "A policy selects Pods with `spec.podSelector` in its own namespace; an empty selector `{}` means all Pods in that namespace. `policyTypes` lists Ingress, Egress or both. The key rule is isolation by selection: once a Pod is selected by any policy for a direction, only traffic explicitly allowed by some policy is permitted in that direction. Pods not selected by any policy remain fully open. Policies are additive allow-lists; there are no deny rules, and when several policies select the same Pod, their allowed traffic is combined as a union, so adding a policy can only open more paths, never close one that another policy allows.",
   "```yaml\n# default deny all ingress and egress in namespace app\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata: {name: default-deny, namespace: app}\nspec:\n  podSelector: {}\n  policyTypes: [Ingress, Egress]\n```",
   "The policy above is the standard starting point: it selects every Pod in namespace `app` for both directions and allows nothing, so all traffic in and out is blocked. You then add narrow policies that allow what each workload needs. If you leave out `policyTypes`, Kubernetes infers Ingress always and Egress only if the policy has egress rules, which is why explicit policyTypes are clearer.",
   "Rules list peers in `from` (for ingress) or `to` (for egress), plus optional `ports`. A peer can be one of three things. A `podSelector` alone selects Pods in the policy's own namespace. A `namespaceSelector` alone selects all Pods in namespaces whose labels match. An `ipBlock` with a `cidr` and optional `except` ranges selects addresses, typically for traffic to or from outside the cluster, because Pod IPs are ephemeral and should be matched with labels instead. Every namespace automatically carries the label `kubernetes.io/metadata.name=<name>`, so you can select a namespace by name without adding labels yourself.",
   "The single most tested detail is AND versus OR, and it comes down to YAML list items. A podSelector and a namespaceSelector in the same list item (one dash) mean both must match: Pods with that label in those namespaces. As two separate items (two dashes) they mean either: any Pod with that label in the policy's namespace, or any Pod at all in those namespaces. The difference is a single hyphen, and getting it wrong can open a namespace far wider than intended.",
   "```yaml\ningress:\n- from:\n  - namespaceSelector:\n      matchLabels: {kubernetes.io/metadata.name: frontend}\n    podSelector:            # same item: AND\n      matchLabels: {app: web}\n  ports:\n  - {protocol: TCP, port: 8080}\negress:\n- to:\n  - namespaceSelector: {}\n    podSelector: {matchLabels: {k8s-app: kube-dns}}\n  ports:\n  - {protocol: UDP, port: 53}\n  - {protocol: TCP, port: 53}\n```",
   "Read the excerpt above slowly. The ingress rule allows only Pods labeled `app=web` in the `frontend` namespace to reach the selected Pods, and only on TCP 8080. The egress rule allows DNS: an empty namespaceSelector means all namespaces, ANDed with the CoreDNS Pod label, on UDP and TCP port 53. Within one rule, the peers and the ports are also ANDed: traffic must come from an allowed peer and go to an allowed port.",
   "When you add an egress default deny, remember DNS. Without an egress rule allowing UDP and TCP port 53 to the CoreDNS Pods, name lookups fail, and it looks as if every connection is broken, with errors such as \"could not resolve host\" or \"bad address\" rather than timeouts to the real destination. Replies to allowed connections are permitted automatically, because enforcement is stateful; you do not need a matching egress rule for responses to allowed ingress. Ports can be numbers or named container ports, and `endPort` allows a numeric range such as 32000 to 32768.",
   "Test policies with a temporary Pod carrying the right labels in the right namespace, for example `kubectl run t --rm -it --image=busybox -l app=web -n frontend -- wget -qO- -T 2 api.app:8080`. Repeat the test from a Pod without the label, or from another namespace, to prove that the policy denies what it should. `kubectl describe networkpolicy` prints the selectors and rules in readable form, which is a good way to catch an AND that should have been an OR."
  ],
  "analogy": "A NetworkPolicy works like a guest list at a private party. As long as a venue has no list, anyone walks in. The moment a host posts any list for a room, only people named on some list get in, and lists from several hosts are combined. Nobody writes a \"banned\" list. The analogy breaks at the bouncer: in Kubernetes the bouncer is the CNI plugin, and if your plugin did not hire one, the list hangs on the door and is ignored.",
  "terms": [
   [
    "NetworkPolicy",
    "A namespaced object that allow-lists ingress and egress traffic for selected Pods."
   ],
   [
    "Default deny",
    "A policy selecting all Pods with no allow rules, blocking all traffic in the listed directions."
   ],
   [
    "podSelector",
    "Chooses Pods by label: in spec, the Pods the policy applies to; in a rule, peer Pods in the policy's namespace."
   ],
   [
    "namespaceSelector",
    "A peer selector matching all Pods in namespaces whose labels match."
   ],
   [
    "ipBlock",
    "A peer defined by a CIDR range, with optional exceptions."
   ],
   [
    "kubernetes.io/metadata.name",
    "A label set automatically on every namespace to its name, useful for selecting a namespace by name."
   ]
  ],
  "example": "After applying a default-deny policy for Egress in namespace `api`, every request fails with a name resolution error. Adding an egress rule allowing port 53 over UDP and TCP to Pods labeled k8s-app=kube-dns in any namespace restores DNS, and further rules then allow only the database port.",
  "mistakes": [
   [
    "NetworkPolicies can contain deny rules to block one specific source.",
    "Policies are allow-lists only. Block by selecting the Pod (which isolates it) and allowing only the sources you want; ipBlock except can carve ranges out of an allowed CIDR."
   ],
   [
    "namespaceSelector and podSelector under separate dashes mean Pods with that label in that namespace.",
    "Separate items are ORed. Put both under one dash to require both."
   ],
   [
    "A default deny on Egress only affects connections to other apps.",
    "It also blocks DNS lookups to CoreDNS. Add an egress rule for UDP and TCP port 53 to the kube-dns Pods."
   ],
   [
    "If kubectl apply accepts the policy, it is being enforced.",
    "Enforcement is done by the CNI. A plugin without policy support stores and ignores the object silently."
   ]
  ],
  "tryit": [
   [
    "Pods labeled `app=api` in namespace `shop` must accept traffic on TCP 8080 only from Pods labeled `role=frontend` in namespace `web`, and nothing else. Namespace `web` has no custom labels. Describe the ingress peer you write.",
    "One from item containing both a namespaceSelector matching kubernetes.io/metadata.name: web and a podSelector matching role: frontend under the same dash (AND), plus ports TCP 8080, in a policy whose spec.podSelector is app: api with policyTypes Ingress."
   ],
   [
    "After adding an Egress policy that allows the `orders` Pods to reach the database Pods on port 5432, the orders app logs \"could not translate host name\" for the database. The database is up. What do you add?",
    "An egress rule allowing UDP and TCP port 53 to the CoreDNS Pods (for example namespaceSelector {} with podSelector k8s-app: kube-dns). The Egress policy isolated the Pods, so DNS is now blocked."
   ]
  ],
  "tip": "Count the dashes: podSelector and namespaceSelector under one dash are ANDed, under separate dashes are ORed. And egress deny without a DNS exception breaks everything.",
  "check": [
   [
    "How do you select the namespace named monitoring without adding labels to it?",
    "Use a namespaceSelector matching kubernetes.io/metadata.name: monitoring."
   ],
   [
    "If no NetworkPolicy selects a Pod, what traffic is allowed to it?",
    "All traffic; isolation only begins once some policy selects the Pod for that direction."
   ],
   [
    "Two policies select the same Pod: one allows port 80 from app=a, the other allows port 443 from app=b. What is allowed?",
    "The union: port 80 from app=a and port 443 from app=b. Policies add allowances and never subtract."
   ]
  ]
 },
 {
  "t": "Gateway API: GatewayClass, Gateway listeners and allowedRoutes, HTTPRoute parentRefs, matches and weighted backendRefs; installing the CRDs and a controller",
  "hook": "At Oakridge Media, the platform team owns one shared entry point for the whole cluster, and three product teams want to publish their apps through it without filing tickets for every change. Tomas from the video team writes an HTTPRoute that sends ten percent of `/api` traffic to a new version, applies it, and waits. Nothing changes. `kubectl get httproute` shows his route exists, and the shared Gateway is healthy and serving other teams. The platform team says they did not block him on purpose. Somewhere between his route and their Gateway, an agreement is missing. Which side has to say yes, and where does the cluster tell you who said no?",
  "simple": "Gateway API is the modern way to let web traffic from outside into a Kubernetes cluster. It splits the job among people. A GatewayClass says which software (the controller) handles traffic, like choosing a brand of front door. A Gateway is the actual front door: which ports and hostnames it listens on, and which teams are allowed to attach their routes to it. An HTTPRoute is a team's set of directions: \"requests for this path go to this Service,\" optionally splitting traffic between versions by weight. None of this is built into Kubernetes; you install the definitions and a controller first, much like installing an app before using its features.",
  "body": [
   "Gateway API is the newer, role-oriented way to manage traffic entering the cluster, designed as the successor to Ingress. Ingress put everything, from listener ports to TLS to per-path routing, into one object owned by one person, and pushed advanced features into controller-specific annotations. Gateway API instead splits configuration into resources owned by different people: the infrastructure provider supplies a GatewayClass, the cluster operator creates Gateways, and application developers write routes in their own namespaces. Each role can change its part without touching the others.",
   "Gateway API is not built into Kubernetes; it ships as Custom Resource Definitions (CRDs). Getting it working takes two steps. First, install the CRDs, typically the standard channel manifest from a Gateway API release, which contains the stable resources such as GatewayClass, Gateway, HTTPRoute and ReferenceGrant (an experimental channel adds resources still under development). Second, install an implementation, a controller such as Envoy Gateway, NGINX Gateway Fabric, Istio, Cilium or Contour, each with its own install instructions, usually a manifest or Helm chart. Check the result with `kubectl get crd | grep gateway.networking.k8s.io` and `kubectl get gatewayclass`. A GatewayClass whose ACCEPTED column says True means a controller has claimed it.",
   "A GatewayClass is cluster-scoped and names the controller that implements it in `controllerName`, much like an IngressClass. Controllers usually create one for you on install. A Gateway is namespaced and requests a traffic entry point using a class via `gatewayClassName`. Its `listeners` each have a `name`, a `protocol` (HTTP, HTTPS, TLS, TCP and others depending on the implementation), a `port`, an optional `hostname` and, for HTTPS, a `tls` section referencing certificate Secrets. `allowedRoutes` controls which routes may attach: `namespaces.from` is Same (the default, meaning only routes in the Gateway's own namespace), All, or Selector with a label selector on namespaces, and `kinds` can limit which route types, such as HTTPRoute, are accepted.",
   "```yaml\napiVersion: gateway.networking.k8s.io/v1\nkind: Gateway\nmetadata: {name: web-gw, namespace: infra}\nspec:\n  gatewayClassName: example\n  listeners:\n  - name: http\n    protocol: HTTP\n    port: 80\n    allowedRoutes:\n      namespaces: {from: All}\n---\napiVersion: gateway.networking.k8s.io/v1\nkind: HTTPRoute\nmetadata: {name: shop, namespace: shop}\nspec:\n  parentRefs:\n  - {name: web-gw, namespace: infra, sectionName: http}\n  hostnames: [\"shop.example.com\"]\n  rules:\n  - matches:\n    - path: {type: PathPrefix, value: /api}\n    backendRefs:\n    - {name: api-v1, port: 8080, weight: 90}\n    - {name: api-v2, port: 8080, weight: 10}\n```",
   "An HTTPRoute attaches to a Gateway through `parentRefs`. Each parent reference gives the Gateway's name, its namespace if different from the route's, and optionally `sectionName` to pick one specific listener by name, such as only the HTTPS listener. `hostnames` filter requests by the Host header, and must be compatible with the listener's hostname if the listener sets one. Each rule has `matches`, which can test the path (Exact, PathPrefix or RegularExpression, where support for regular expressions depends on the implementation), headers, query parameters or the HTTP method. A rule can also carry optional `filters`, such as adding or removing request headers, redirecting (for example HTTP to HTTPS) or rewriting the URL, and it has `backendRefs` pointing at Services and ports.",
   "Weights on backendRefs split traffic proportionally, which makes canary releases simple and portable across implementations. With weights of 90 and 10, about ten percent of matching requests go to `api-v2`; changing them to 50 and 50 and then 0 and 100 completes a gradual rollout without touching the Gateway. A weight of 0 sends no traffic to that backend. Weights are relative, so 9 and 1 behaves the same as 90 and 10.",
   "Attachment requires agreement from both sides, and this is the most common source of confusion. The route must reference the Gateway in parentRefs, and the Gateway's listener allowedRoutes must permit the route's namespace and kind. If either side is missing, the route is not attached and receives no traffic, even though both objects exist. A backendRef to a Service in another namespace additionally needs a ReferenceGrant in the target namespace, created by the owner of that namespace, which permits HTTPRoutes from the route's namespace to reference its Services. This prevents a team from pointing traffic at another team's Services without permission.",
   "When something does not work, `kubectl describe` the Gateway and the HTTPRoute and read the status conditions, because Gateway API reports problems there instead of hiding them in controller logs. On the GatewayClass and Gateway, look for `Accepted` (the controller accepted the configuration) and `Programmed` (the data plane is configured and, often, an address is assigned in the ADDRESS column). On routes, each parent has its own status with `Accepted` and `ResolvedRefs` conditions. Reasons such as `NotAllowedByListeners` (allowedRoutes refused the route), `NoMatchingParent` (a wrong parentRef name or sectionName), `BackendNotFound` (a misspelled Service) or `RefNotPermitted` (a missing ReferenceGrant) explain most failures and point straight at the fix."
  ],
  "analogy": "Think of a shopping mall. The GatewayClass is the mall management company. The Gateway is a specific entrance with posted rules: which doors are open and which shops may put signs there. An HTTPRoute is a shop's sign saying \"electronics, this way, 90 percent to the main store and 10 percent to the pop-up\". The sign only goes up if the shop asks for that entrance and the entrance's rules allow that shop. Unlike a mall, the status conditions tell you exactly which side refused.",
  "terms": [
   [
    "GatewayClass",
    "A cluster-scoped resource naming the controller that implements Gateways of that class."
   ],
   [
    "Gateway",
    "A request for a traffic entry point with one or more listeners."
   ],
   [
    "Listener",
    "A Gateway entry defining a name, protocol, port, optional hostname, TLS and allowedRoutes."
   ],
   [
    "HTTPRoute",
    "Routing rules that attach to Gateway listeners via parentRefs and forward to backendRefs."
   ],
   [
    "allowedRoutes",
    "Listener setting controlling which namespaces and route kinds may attach."
   ],
   [
    "ReferenceGrant",
    "An object permitting cross-namespace references, such as a route to another namespace's Service."
   ]
  ],
  "example": "An HTTPRoute in namespace shop never receives traffic, and its status shows the parent did not accept it with reason NotAllowedByListeners. The Gateway in namespace infra uses the default allowedRoutes of Same. Changing the listener to `from: All` (or Selector with a label on shop) lets the route attach.",
  "mistakes": [
   [
    "Gateway API works out of the box on any Kubernetes cluster.",
    "You must install the Gateway API CRDs and a controller implementation; without a controller, Gateways are never Accepted or Programmed."
   ],
   [
    "A route that references a Gateway in parentRefs is always attached.",
    "The listener's allowedRoutes must also permit the route's namespace and kind. The default is Same, so routes in other namespaces are refused."
   ],
   [
    "Traffic splitting needs a service mesh or controller-specific annotations.",
    "HTTPRoute backendRefs support weights natively; for example 80 and 20 sends about 20 percent to the second backend."
   ],
   [
    "The Gateway names the controller in a controllerName field.",
    "controllerName is on the GatewayClass; the Gateway refers to the class with gatewayClassName."
   ]
  ],
  "tryit": [
   [
    "An HTTPRoute in namespace `blog` sends traffic to Service `media` in namespace `assets`. The route is attached to the Gateway, but its status shows ResolvedRefs False with reason RefNotPermitted. What is missing and who creates it?",
    "A ReferenceGrant in namespace assets that allows HTTPRoutes from namespace blog to reference Services. It must be created in the target namespace (assets), typically by its owner."
   ],
   [
    "A fresh cluster has the Gateway API CRDs installed. You create a Gateway with gatewayClassName `prod`, but it never shows an address and has no Accepted condition. `kubectl get gatewayclass` returns no resources. What is wrong?",
    "No GatewayClass named prod exists because no controller is installed (or it created a class with a different name). Install a Gateway API implementation, check the class name it creates and set gatewayClassName to match."
   ]
  ],
  "tip": "If a route is ignored, check both sides of attachment: parentRefs (including sectionName and namespace) and the listener's allowedRoutes. The status conditions tell you which side refused.",
  "check": [
   [
    "Which Gateway API resource names the controller implementation?",
    "The GatewayClass, via controllerName."
   ],
   [
    "How do you send roughly 20 percent of traffic to a new version with HTTPRoute?",
    "List both Services in backendRefs with weights such as 80 and 20."
   ],
   [
    "What is the default allowedRoutes namespaces setting on a listener, and what does it mean?",
    "from: Same, meaning only routes in the Gateway's own namespace can attach."
   ]
  ]
 },
 {
  "t": "Ingress controllers, IngressClass and the default class; Ingress rules, path types and TLS",
  "hook": "Hana joins Cedar Bank's platform team on a Tuesday, and her first ticket reads: \"New loans site created yesterday, still not reachable.\" She finds the Ingress object, and it looks perfect: the right host, a `/` path to the frontend, a `/api` path to the backend and a TLS section. But `kubectl get ingress` shows an empty ADDRESS column, the controller's logs never mention it, and browsing to `loans.cedar.example` returns the controller's default 404. The previous admin's note says \"just copy the old Ingress.\" What does a controller need before it will pick up an Ingress, and how will Hana know when it has?",
  "simple": "An Ingress is a set of directions for web traffic coming into the cluster: \"requests for this website name and this path go to that Service.\" On its own, it is only a written note. Something has to read it and act on it, and that is the Ingress controller, a web proxy running inside the cluster. A cluster can have more than one controller, so each Ingress says which one it is meant for by naming an IngressClass, or relies on the class marked as default. Paths can match exactly or by folder-like segments, and TLS settings let the controller serve HTTPS using a certificate you store in a Secret.",
  "body": [
   "An Ingress is an API object describing HTTP and HTTPS routing from outside the cluster to Services, by hostname and path. On its own it does nothing: the API server stores it and no traffic moves. An Ingress controller, a reverse proxy such as an NGINX-, HAProxy- or Traefik-based controller running as Pods, watches Ingress objects and configures itself to match. Kubernetes does not ship one, so installing a controller, usually with Helm or a manifest, is step one on any cluster. The controller itself must be reachable from outside, so it is exposed with a NodePort or LoadBalancer Service, and that Service's address is where users actually connect.",
   "Because a cluster can run several controllers, for example one for public traffic and one for internal tools, each Ingress names the one it wants through `spec.ingressClassName`, which refers to an IngressClass object. The IngressClass is cluster-scoped, and its `spec.controller` field identifies the controller implementation with a string the controller looks for. Controllers typically create their IngressClass during installation. `kubectl get ingressclass` lists the classes and their controllers.",
   "Default class handling explains many \"ignored Ingress\" tickets. An IngressClass annotated with `ingressclass.kubernetes.io/is-default-class: \"true\"` becomes the default, and Ingresses created without a class name are assigned to it automatically by an admission controller when they are created. If there is no default and no class name, the Ingress may be ignored by every controller, which is exactly the empty ADDRESS symptom. If more than one class is marked as default, new Ingresses without a class name are rejected, so mark exactly one. The older `kubernetes.io/ingress.class` annotation on the Ingress is deprecated in favor of the field, though you may still see it in older manifests.",
   "Each rule has an optional `host` and a list of `paths`, each with a `path`, a `pathType` and a `backend` that names a Service and a port (by number or name). There are three path types. `Exact` matches the URL path exactly and is case sensitive. `Prefix` matches by path elements split on `/`, so `/api` matches `/api` and `/api/v1` but not `/apiv1`; a trailing slash in the request or the path is ignored for matching. `ImplementationSpecific` leaves matching to the controller and its IngressClass. When several paths match a request, the longest matching path wins, and if two match with the same length, Exact beats Prefix. A rule without a host applies to all hostnames, and a `defaultBackend` catches requests that match no rule at all.",
   "```yaml\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata: {name: shop, namespace: shop}\nspec:\n  ingressClassName: nginx\n  tls:\n  - hosts: [shop.example.com]\n    secretName: shop-tls\n  rules:\n  - host: shop.example.com\n    http:\n      paths:\n      - path: /api\n        pathType: Prefix\n        backend:\n          service: {name: api, port: {number: 8080}}\n      - path: /\n        pathType: Prefix\n        backend:\n          service: {name: frontend, port: {number: 80}}\n```",
   "In the manifest above, a request for `shop.example.com/api/orders` matches both `/api` and `/`, and the longer `/api` wins, so it reaches the `api` Service on port 8080. A request for `shop.example.com/about` only matches `/` and goes to `frontend`. The backend Services must be in the same namespace as the Ingress; an Ingress cannot point directly at a Service in another namespace.",
   "TLS is configured with a `tls` section listing hosts and a `secretName` that points to a Secret of type `kubernetes.io/tls` in the same namespace as the Ingress. Create it with `kubectl create secret tls shop-tls --cert=tls.crt --key=tls.key`, which stores the certificate and private key under the keys `tls.crt` and `tls.key`. The controller then terminates TLS (Transport Layer Security) for those hosts, decrypting HTTPS at the proxy and forwarding to the backend, and many controllers redirect HTTP to HTTPS automatically for TLS hosts. The hosts in the tls section should match the rule hosts and the names in the certificate. You can create simple Ingresses imperatively, for example `kubectl create ingress shop --class=nginx --rule=\"shop.example.com/api*=api:8080,tls=shop-tls\"`, where a trailing `*` means Prefix and no asterisk means Exact.",
   "Controller-specific behavior, such as URL rewriting, timeouts or authentication, is configured with annotations whose names depend on the controller, so an annotation for one controller means nothing to another. The Ingress API is stable but feature-frozen; new capabilities are going into Gateway API instead. For troubleshooting, follow a fixed order. `kubectl get ingress` shows the CLASS and ADDRESS columns, and an empty ADDRESS usually means no controller adopted it. `kubectl describe ingress` shows the resolved backends with their endpoints and any events, including errors like a missing Service. The controller Pod's logs show configuration errors, such as a missing TLS Secret. Finally, test with the right Host header, for example `curl -H 'Host: shop.example.com' <controller-address>/api`, because requests by IP alone will not match host-based rules."
  ],
  "analogy": "An Ingress is like a mailroom instruction sheet: \"letters for Sales go to floor 3, letters for Sales/Contracts go to room 312.\" The Ingress controller is the mail clerk who reads the sheets and sorts. If the building has two clerks, each sheet must say which clerk it is for (the IngressClass), or go to the clerk marked as default. Prefix matching is by whole folder names, so \"Sales\" does not catch \"Salesforce\". The analogy stops at TLS: the clerk opens sealed envelopes using a key kept in the same department's safe.",
  "terms": [
   [
    "Ingress controller",
    "A proxy running in the cluster that implements Ingress objects."
   ],
   [
    "IngressClass",
    "A cluster-scoped object linking an Ingress to a specific controller through spec.controller."
   ],
   [
    "Default IngressClass",
    "The class annotated is-default-class true, used when an Ingress sets no ingressClassName."
   ],
   [
    "pathType",
    "Exact, Prefix (element-wise) or ImplementationSpecific path matching."
   ],
   [
    "TLS Secret",
    "A Secret of type kubernetes.io/tls holding tls.crt and tls.key, referenced by an Ingress in the same namespace."
   ]
  ],
  "example": "An Ingress created without ingressClassName has an empty ADDRESS and does not route. `kubectl get ingressclass` shows one class, nginx, with no default annotation. Either setting `ingressClassName: nginx` on the Ingress or annotating the class as default makes the controller adopt it.",
  "mistakes": [
   [
    "Creating an Ingress object is enough to expose an app.",
    "An Ingress controller must be installed and must claim the Ingress through its IngressClass; Kubernetes ships none."
   ],
   [
    "pathType Prefix with /app matches /application.",
    "Prefix matches whole path elements split on /, so /app matches /app and /app/x but not /application."
   ],
   [
    "The TLS Secret can live in any namespace, such as the controller's.",
    "The Secret named in tls.secretName must be in the same namespace as the Ingress."
   ],
   [
    "An Ingress backend can point at a Service in another namespace.",
    "Ingress backends reference Services in the Ingress's own namespace only."
   ]
  ],
  "tryit": [
   [
    "An Ingress has two paths for host app.example.com: `/` (Prefix) to `web` and `/admin` (Exact) to `admin`. A user requests `/admin/users`. Which Service receives it, and how would you change the Ingress if admin should get it?",
    "web receives it, because Exact /admin does not match /admin/users and only Prefix / matches. Change the /admin path to pathType Prefix so it matches /admin and everything below it; the longer path then wins."
   ],
   [
    "You need HTTPS for docs.example.com on an existing Ingress in namespace docs. You have docs.crt and docs.key files. What do you create and change?",
    "Run kubectl create secret tls docs-tls --cert=docs.crt --key=docs.key -n docs, then add a tls entry to the Ingress with hosts [docs.example.com] and secretName docs-tls. The Secret must be in namespace docs, the same as the Ingress."
   ]
  ],
  "tip": "Prefix matching is by path segment, not string prefix: /app matches /app/x but not /application. And the TLS Secret must live in the same namespace as the Ingress.",
  "check": [
   [
    "Does the path /shop with pathType Prefix match /shopping?",
    "No; Prefix matches whole path elements, so it matches /shop and /shop/... only."
   ],
   [
    "What makes an IngressClass the default?",
    "The annotation ingressclass.kubernetes.io/is-default-class set to \"true\"."
   ],
   [
    "Two paths, /api (Prefix) and / (Prefix), both match /api/v1. Which wins?",
    "/api, because the longest matching path takes precedence."
   ]
  ]
 },
 {
  "t": "CoreDNS: the coredns ConfigMap and Corefile, forwarding and stub zones, Service and Pod DNS records, dnsPolicy",
  "hook": "It is the last week of the quarter at Pinecrest Logistics, and the reporting Pods cannot reach `warehouse.corp.internal`, the on-premises database everyone else in the company uses daily. From a laptop, the name resolves instantly. From inside a Pod, `nslookup` says NXDOMAIN. Meanwhile, Diego on the platform team notices that a monitoring agent running with host networking cannot resolve any cluster Service names at all, while ordinary Pods can. Both tickets land in the same place: the cluster's DNS server, its configuration file, and a Pod setting most people never touch. Where do these lookups actually go, and how do you redirect them?",
  "simple": "DNS is the phone book that turns names into addresses. Inside a Kubernetes cluster, that phone book is a program called CoreDNS. It knows the names of all Services and Pods, and for any name it does not know, it asks an outside phone book instead. Its settings live in a single text file, the Corefile, stored in a ConfigMap. You can add a rule like \"for names ending in corp.internal, ask this company server.\" Each Pod also has a dnsPolicy that says which phone book it should use: the cluster's (the normal choice), the node's, or one you spell out yourself.",
  "body": [
   "CoreDNS is the cluster DNS server, and almost every Service call in a cluster starts with a lookup it answers. On kubeadm clusters it runs as the `coredns` Deployment in kube-system, usually with two replicas, exposed by a Service still named `kube-dns` for compatibility with the older DNS add-on. That Service usually sits at the tenth address of the Service CIDR (10.96.0.10 with kubeadm's default range). The kubelet's `clusterDNS` setting holds that address, and the kubelet writes it into every Pod's `/etc/resolv.conf` as the nameserver.",
   "Its configuration is the Corefile, stored under the key `Corefile` in the `coredns` ConfigMap in kube-system. The Corefile is made of server blocks. Each block starts with the zones it serves and a port, such as `.:53` for everything, followed by a chain of plugins in braces. A typical default block for the root zone includes `errors` (log errors), `health` and `ready` (endpoints for probes), the `kubernetes` plugin that answers for `cluster.local` and the reverse zones, `prometheus` metrics, `forward . /etc/resolv.conf` to send everything else to the upstream resolvers listed in the node's resolv.conf, `cache`, `loop` (detect forwarding loops), `reload` (watch for Corefile changes) and `loadbalance` (shuffle the order of A records).",
   "```\n.:53 {\n    errors\n    health\n    ready\n    kubernetes cluster.local in-addr.arpa ip6.arpa {\n       pods insecure\n       fallthrough in-addr.arpa ip6.arpa\n    }\n    forward . /etc/resolv.conf\n    cache 30\n    loop\n    reload\n    loadbalance\n}\ncorp.internal:53 {\n    forward . 10.0.0.53\n}\n```",
   "In the Corefile above, the `kubernetes` plugin answers any query in `cluster.local` from the cluster's Services and EndpointSlices, and `pods insecure` enables the Pod records described below. `fallthrough` passes reverse lookups it cannot answer to the next plugin. `cache 30` caches answers for up to 30 seconds. Because CoreDNS picks the most specific matching server block for each query, a lookup for `db.corp.internal` goes to the second block, and everything else goes to the first.",
   "To send a private domain to a specific DNS server, a so-called stub zone, add a separate server block for that zone with its own `forward`, as the `corp.internal` block above does. That is the fix for the hook's NXDOMAIN: the node's upstream resolvers do not know the private zone, so CoreDNS needs to be told where to ask. To change upstream resolvers for everything else, change the target of `forward .` from `/etc/resolv.conf` to explicit addresses. Edit with `kubectl -n kube-system edit cm coredns`; the `reload` plugin picks up the change after a short delay, or you can apply it at once with `kubectl -n kube-system rollout restart deploy coredns`. A syntax error leaves CoreDNS running the previous configuration or failing to start, so check `kubectl -n kube-system logs deploy/coredns` after any edit.",
   "Know the record formats, because exam tasks often ask you to resolve or write a fully qualified name. A normal Service gets an A (or AAAA for IPv6) record `<svc>.<ns>.svc.cluster.local` pointing to its ClusterIP, and SRV records for named ports, `_<port>._<proto>.<svc>.<ns>.svc.cluster.local`, which return the port number and the Service name. A headless Service's name resolves to its ready Pods' IPs, and StatefulSet Pods get stable names `<pod>.<svc>.<ns>.svc.cluster.local` through their headless Service. Pods also have records of the form `10-244-1-5.<ns>.pod.cluster.local`, their IP with dashes instead of dots. An ExternalName Service returns a CNAME to its external hostname.",
   "Short names work because of the search list. A Pod's resolv.conf includes the search domains `<ns>.svc.cluster.local svc.cluster.local cluster.local` and `options ndots:5`. Any name with fewer than five dots is tried with each search domain appended before being tried as-is. That is why a bare `web` works inside the same namespace (it becomes `web.<ns>.svc.cluster.local`) and `web.other` works across namespaces (it becomes `web.other.svc.cluster.local`). The cost is extra queries for external names, since `api.example.com` is first tried with each cluster suffix; writing a trailing dot, as in `api.example.com.`, skips the search list.",
   "A Pod's `dnsPolicy` controls which of this applies. `ClusterFirst`, the default for normal Pods, uses cluster DNS and lets CoreDNS forward other names upstream. `Default` inherits the node's resolv.conf, so cluster names do not resolve; despite its name, it is not the default. `ClusterFirstWithHostNet` is what Pods with `hostNetwork: true` need to still use cluster DNS, because host-network Pods otherwise fall back to the node's resolver, which is exactly Diego's monitoring agent problem. `None` ignores all of it and uses only the `dnsConfig` you supply, with `nameservers`, `searches` and `options`; dnsConfig can also add to the generated settings under the other policies.",
   "When DNS breaks, test from inside a Pod with a tool that includes nslookup or dig, for example `kubectl run dnstest --rm -it --image=busybox:1.36 -- nslookup kubernetes.default`. If that fails, check that the CoreDNS Pods are Running and Ready, that the kube-dns Service has endpoints, that the Pod's resolv.conf points at the kube-dns ClusterIP, and that no NetworkPolicy blocks port 53. Then read the CoreDNS logs for errors such as a forwarding loop or an unreachable upstream."
  ],
  "analogy": "CoreDNS is like a company receptionist with an internal staff directory. Ask for anyone inside (a Service or Pod name) and she answers from the directory. Ask for an outside company and she calls the public directory service for you (forward). A stub zone is a note on her desk: \"for anything at our partner corp.internal, call their own switchboard.\" dnsPolicy decides whether an employee goes through her (ClusterFirst) or dials outside directly (Default). The analogy stops at short names: she silently tries several department suffixes before giving up.",
  "terms": [
   [
    "Corefile",
    "CoreDNS's configuration, held in the coredns ConfigMap, made of server blocks and plugins."
   ],
   [
    "kubernetes plugin",
    "The CoreDNS plugin that answers cluster.local and reverse lookups from Services, EndpointSlices and Pods."
   ],
   [
    "forward plugin",
    "Sends queries CoreDNS is not authoritative for to upstream resolvers."
   ],
   [
    "Stub zone",
    "A server block that forwards a specific domain to designated DNS servers."
   ],
   [
    "ndots",
    "A resolv.conf option (5 in Pods) setting how many dots a name needs before it is tried as an absolute name first."
   ],
   [
    "dnsPolicy",
    "Pod setting choosing ClusterFirst, Default, ClusterFirstWithHostNet or None DNS behavior."
   ]
  ],
  "example": "Developers need `*.corp.internal` names to resolve from Pods, but the node resolvers do not know them. You add a `corp.internal:53 { forward . 10.0.0.53 }` block to the coredns ConfigMap, wait for reload, and `nslookup db.corp.internal` from a test Pod now returns the internal address.",
  "mistakes": [
   [
    "dnsPolicy Default is the default setting for Pods.",
    "ClusterFirst is the default. Default means inherit the node's resolv.conf, so cluster Service names do not resolve."
   ],
   [
    "The DNS Service is called coredns.",
    "The Deployment and ConfigMap are named coredns, but on kubeadm clusters the Service is still named kube-dns."
   ],
   [
    "To resolve a private domain, add it to the kubernetes plugin line in the main server block.",
    "The kubernetes plugin only answers for the cluster domain. Add a separate server block for the private zone with its own forward directive."
   ],
   [
    "A Pod with hostNetwork true uses cluster DNS automatically.",
    "It falls back to the node's resolver unless you set dnsPolicy ClusterFirstWithHostNet."
   ]
  ],
  "tryit": [
   [
    "A Pod in namespace `billing` needs to call Service `ledger` in namespace `finance` on port 8443. A developer used the name `ledger` and gets NXDOMAIN. What name should they use, and why did the short one fail?",
    "Use ledger.finance (or the full ledger.finance.svc.cluster.local). The short name ledger is expanded with the Pod's own namespace first, becoming ledger.billing.svc.cluster.local, which does not exist."
   ],
   [
    "Security requires all external lookups from the cluster to go through resolvers 10.1.1.10 and 10.1.1.11 instead of whatever the nodes use, without touching the nodes. What do you change?",
    "Edit the coredns ConfigMap and change the root block's forward line to forward . 10.1.1.10 10.1.1.11, then let reload pick it up or restart the coredns Deployment, and verify with an nslookup from a test Pod."
   ]
  ],
  "tip": "The Service is called kube-dns but the Pods and ConfigMap are called coredns. dnsPolicy Default is not the default; ClusterFirst is.",
  "check": [
   [
    "What is the fully qualified DNS name of Service api in namespace shop?",
    "api.shop.svc.cluster.local."
   ],
   [
    "Which dnsPolicy should a hostNetwork Pod use to resolve cluster Services?",
    "ClusterFirstWithHostNet."
   ],
   [
    "How do you forward a single private domain to a specific DNS server?",
    "Add a server block for that zone in the Corefile with its own forward directive."
   ],
   [
    "What DNS name does the Pod with IP 10.244.2.7 in namespace dev get?",
    "10-244-2-7.dev.pod.cluster.local, the IP with dashes, when Pod records are enabled."
   ]
  ]
 },
 {
  "t": "Testing connectivity with temporary Pods (busybox, nicolaka/netshoot), nslookup, curl and nc",
  "hook": "It is 2 a.m. and your phone buzzes. Leo, the on-call developer at Juniper Freight, writes that the shipping web front end in namespace `frontend` suddenly cannot talk to the pricing API in namespace `backend`. The Deployment looks healthy, every Pod is Running, and the dashboards are green. Leo has already restarted everything twice. You have a terminal, kubectl access and very little patience for guessing. Is it DNS, the Service, a NetworkPolicy, or the application itself? You could read YAML for an hour, or you could stand exactly where the failing client stands and ask the network a few precise questions. Which questions, from which Pod, and in what order?",
  "simple": "Inside a Kubernetes cluster, Pods talk to each other over a private network. When two Pods cannot talk, you need to test from inside that network, not from your laptop. The trick is to start a short-lived helper Pod, run a few test commands from it, and let it delete itself when you are done. Think of it like a plumber who opens a tap in the same apartment where the leak is reported, instead of checking from the street. You test in steps: first, can the name be looked up (like finding an address in a phone book)? Second, does the Service answer? Third, does a single Pod answer directly? Whichever step fails first tells you where the problem lives.",
  "body": [
   "Many CKA tasks end with 'verify that ...', and many troubleshooting tasks start with 'Pod A cannot reach Pod B'. The fastest and most honest tool for both is a throwaway Pod inside the cluster. It sees the network exactly as your workloads do: it uses the cluster DNS server, it goes through kube-proxy rules for Services, and it is subject to the same NetworkPolicies as any other Pod with its namespace and labels. Testing from the control plane node with `curl` tells you much less, because the node is not a Pod and NetworkPolicies do not apply to it in the same way.",
   "The core command is `kubectl run` with `--rm -it --restart=Never`. The `-it` flags attach an interactive terminal, `--restart=Never` makes kubectl create a bare Pod rather than something that would be restarted, and `--rm` deletes the Pod when you exit. Put the Pod in the right namespace with `-n`, and give it labels with `-l` if a NetworkPolicy decides access by label. Anything after `--` is the command to run, so you can open a shell or run a single test and get the result printed straight back.",
   "```bash\nkubectl run tmp --rm -it --restart=Never --image=busybox -- sh\nkubectl run tmp --rm -it --restart=Never --image=busybox -n frontend -l app=web -- \\\n  wget -qO- -T 3 api.backend:8080/health\nkubectl run dns --rm -it --restart=Never --image=busybox -- nslookup kubernetes.default\nkubectl run net --rm -it --restart=Never --image=nicolaka/netshoot -- bash\n```",
   "Choose the image to match the job. busybox is tiny and quick to pull. It includes `nslookup`, `wget`, `nc` and `ping`, but not `curl`, so use `wget -qO- <url>` for HTTP checks. nicolaka/netshoot is a much larger image packed with network tools: `curl`, `dig`, `nslookup`, `nc`, `tcpdump`, `ip`, `ss`, `traceroute` and more. Reach for it when you need detail, such as capturing packets or inspecting routes. Some exam environments may restrict which images can be pulled, so be comfortable with whatever image a task provides and know the busybox equivalents of the tools you like.",
   "Test in layers, so that a failure tells you something specific. Start with Domain Name System (DNS) resolution: `nslookup api.backend.svc.cluster.local` should return the Service's ClusterIP. If it fails or returns NXDOMAIN, stop and move to DNS troubleshooting, because nothing above it can work. Next test the Service: `nc -zv -w 3 api.backend 8080` or `curl -m 3 api.backend:8080` checks the port through kube-proxy. Then test one backend Pod directly by its IP address, taken from `kubectl get pods -o wide`, which bypasses the Service entirely.",
   "Reading the results across layers is where the diagnosis happens. If the Pod IP works but the Service does not, the network is fine and the Service is wrong: look at its selector, its `port` and `targetPort`, and its EndpointSlices with `kubectl get endpointslices -l kubernetes.io/service-name=api -n backend`. An empty endpoint list almost always means the selector does not match the Pod labels or the Pods are not Ready. If neither the Service nor the Pod IP works, suspect the application itself, a NetworkPolicy, or the Container Network Interface (CNI) plugin. Checking whether the application listens on the expected port from inside its own Pod separates the first case from the other two.",
   "Always use explicit timeouts: `-T` for busybox `wget`, `-m` for `curl`, and `-w` for `nc`. Without them, a blocked connection can hang for a long time, and on a timed exam those minutes matter. The type of failure is itself evidence. A timeout usually means packets are being dropped, typically by a NetworkPolicy, or cannot be routed. A 'connection refused' message means a host did answer but nothing is listening on that port, which points at a wrong `targetPort` or an application bound to the wrong port or to localhost only.",
   "Where you test from matters as much as what you test. If a NetworkPolicy in `backend` allows traffic only from Pods labeled `app=web` in namespace `frontend`, a test Pod in `default` with no labels will be blocked even when the real client would succeed, and a test from the wrong place can hide a real block. Mirror the real client's namespace and labels with `-n` and `-l` so your result reflects reality.",
   "You do not always need a new Pod. `kubectl exec -it <pod> -- sh` tests from an existing Pod, if its image contains a shell and tools; many minimal images do not. In that case attach an ephemeral debug container with `kubectl debug -it <pod> --image=busybox --target=<container>`. The debug container shares the Pod's network namespace, so it sees the same IP address and policies, and `--target` also lets it see the target container's processes. Finally, clean up anything you created without `--rm`, such as a test Pod started in the background, so you do not leave clutter that a grader might notice."
  ],
  "analogy": "Testing connectivity in layers is like tracing a missed package delivery. First check the address book entry is correct (DNS). Then check the building's front desk accepts packages for that suite (the Service). Then walk straight to the apartment door and knock (the Pod IP). If the door opens but the front desk turned you away, the desk's list is wrong. The analogy stops working for timeouts: a real front desk would tell you no, while a NetworkPolicy usually drops traffic silently.",
  "terms": [
   [
    "kubectl run --rm -it",
    "Creates an interactive temporary Pod that is deleted when the session ends; add --restart=Never for a bare Pod."
   ],
   [
    "busybox",
    "A minimal image with basic tools such as nslookup, wget and nc, but no curl."
   ],
   [
    "nicolaka/netshoot",
    "A troubleshooting image containing many networking tools including curl, dig, nc and tcpdump."
   ],
   [
    "Connection refused vs timeout",
    "Refused means a host answered but nothing listens on the port; a timeout usually means traffic is dropped or unroutable."
   ],
   [
    "kubectl debug",
    "Adds an ephemeral container to a running Pod that shares its network namespace, useful when the app image lacks tools."
   ],
   [
    "EndpointSlice",
    "An object listing the ready Pod IPs and ports behind a Service; empty slices mean the Service has no backends."
   ]
  ],
  "example": "Pods in namespace frontend cannot reach Service api in backend. From a temporary busybox Pod labeled like the frontend (`-n frontend -l app=web`), nslookup resolves the name to the ClusterIP, but `nc -zv -w 3 api.backend 8080` times out, and the same test against the Pod IP also times out. Because both layers time out rather than being refused, you check NetworkPolicies in backend and find a default deny with no rule allowing the frontend namespace. Adding an ingress rule with a namespaceSelector fixes it, and the same test now connects.",
  "mistakes": [
   [
    "Running curl inside a busybox Pod and concluding the network is broken when the command is not found.",
    "busybox does not include curl. Use `wget -qO- -T 3 <url>` in busybox, or switch to an image such as nicolaka/netshoot that has curl."
   ],
   [
    "Testing from a Pod in the default namespace with no labels and trusting the result.",
    "NetworkPolicies select by namespace and labels, so the test must mirror the real client. Use -n and -l to match the client, or your result may be wrong in either direction."
   ],
   [
    "Treating 'connection refused' and a timeout as the same failure.",
    "Refused means the packet reached a host but no process listens on that port, often a wrong targetPort. A timeout usually means a policy drop or routing problem."
   ],
   [
    "Testing from the node with curl and calling the Service healthy.",
    "The node is not a Pod, so it does not reproduce Pod DNS settings or the NetworkPolicies that apply to the client. Test from a Pod in the client's namespace."
   ]
  ],
  "tryit": [
   [
    "A user reports that Pods in namespace shop cannot reach Service cart on port 80. From a temporary busybox Pod in shop, `nslookup cart` returns a ClusterIP, `wget -qO- -T 3 cart` fails immediately with connection refused, and `wget -qO- -T 3 10.244.1.17:8080` against a cart Pod returns the expected page. What do you check next?",
    "The Pod answers on 8080 but the Service fails quickly with refused, so the network and the app are fine and the Service mapping is wrong. Check the Service's targetPort: it is probably 80 or another port instead of 8080. Fix targetPort to 8080 and retest through the Service."
   ],
   [
    "You must verify that a new NetworkPolicy lets only Pods labeled role=client in namespace api reach the db Service. Which two temporary Pod tests prove it?",
    "Run one test Pod in namespace api with `-l role=client` and confirm it connects with a timeout set, then run a second test Pod in api without that label and confirm it times out. Testing both the allowed and the denied case shows the policy does exactly what was asked."
   ]
  ],
  "tip": "Always test from a Pod with the same namespace and labels as the real client, or NetworkPolicy results will mislead you. Set a timeout on every test, and remember busybox has wget, not curl.",
  "check": [
   [
    "What flag combination creates a temporary interactive Pod that is removed on exit?",
    "`kubectl run <name> --rm -it --restart=Never --image=<image> -- <cmd>`; --rm deletes it when the session ends."
   ],
   [
    "If a Pod IP responds but its Service does not, where should you look?",
    "At the Service's selector, port and targetPort, and its EndpointSlices, because the network to the Pod clearly works."
   ],
   [
    "A test with nc -w 3 times out against both the Service and the Pod IP. What are the likely causes?",
    "Traffic is being dropped, most often by a NetworkPolicy, or there is a CNI or routing problem; a timeout rather than refused suggests nothing even answered."
   ]
  ]
 },
 {
  "t": "Volumes vs PersistentVolumes; PV and PVC lifecycle (Available, Bound, Released) and binding rules",
  "hook": "Priya, a developer at Larkspur Health Labs, opens a ticket on Monday morning: 'Our results database lost every record over the weekend.' The node was patched and rebooted on Saturday, the database Pod restarted cleanly, and it came back empty. You look at the manifest and see the data directory mounted from an `emptyDir`. Next to it is a PersistentVolume from an older project, sitting in a status called Released, and a new PersistentVolumeClaim stuck in Pending. Three storage words, three different behaviors. Which one should have held the data, why is the old volume refusing the new claim, and what has to match before Kubernetes will connect a claim to a volume?",
  "simple": "A container is like a whiteboard that gets wiped every time it restarts. If you want to keep something, you need storage that lives outside the container. Kubernetes splits this into two parts. A PersistentVolume is an actual piece of storage, like a storage unit that already exists. A PersistentVolumeClaim is a request for storage, like a form saying 'I need a unit of at least 5 square meters with a ground-floor door'. Kubernetes matches each request to one unit that fits, and that unit then belongs only to that request. When the request is cancelled, the unit is not automatically handed to the next person, because the old tenant's things may still be inside.",
  "body": [
   "A container's own filesystem is temporary. When a container restarts, anything it wrote to its own layers is gone, and when a Pod is deleted its containers go with it. Volumes solve that, and Kubernetes offers two levels of abstraction for them: volumes declared directly in a Pod, and PersistentVolumes that exist independently of any Pod. The CKA expects you to know when each applies and how the second kind is matched and tracked.",
   "A Pod-level volume is declared in `spec.volumes` and mounted into containers with `volumeMounts`. Some of these types live and die with the Pod. `emptyDir` is scratch space shared by the Pod's containers; it survives container restarts but is deleted when the Pod is removed from the node, so it is the wrong place for a database. Other types reference something that already exists outside the Pod, such as a `configMap`, a `secret`, a `hostPath` directory on the node or an NFS share. Putting those storage details straight into the Pod spec ties the workload to one environment, which is awkward for developers and not portable between clusters.",
   "PersistentVolumes (PVs) separate the supply of storage from the demand for it. A PV is a cluster-scoped object representing a real piece of storage, with a capacity, access modes, a reclaim policy and backend details. It is created either by an administrator (static provisioning) or automatically by a provisioner (dynamic provisioning). A PersistentVolumeClaim (PVC) is a namespaced request, which reads in effect as 'I need 5Gi, ReadWriteOnce, of class fast'. The Pod then uses a `persistentVolumeClaim` volume that names the claim, so the Pod spec does not care what storage sits behind it.",
   "```yaml\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata: {name: data, namespace: app}\nspec:\n  accessModes: [ReadWriteOnce]\n  storageClassName: manual\n  resources:\n    requests: {storage: 1Gi}\n---\n# in the Pod spec\nvolumes:\n- name: data\n  persistentVolumeClaim: {claimName: data}\n```",
   "A PV moves through a small set of phases, shown in the STATUS column of `kubectl get pv`. `Available` means it is free and not bound to any claim. `Bound` means it is exclusively bound to one PVC. The binding is one-to-one: a PV can never be shared by two claims, and if a 10Gi PV is bound to a 1Gi claim, the whole 10Gi goes to that claim and the claim reports 10Gi of capacity. `Released` means its PVC was deleted but the storage has not yet been reclaimed; it still records the old claim in `spec.claimRef`, so it cannot bind to a new claim automatically. `Failed` means automatic reclamation failed and an administrator needs to look.",
   "Claims have their own simpler status. A PVC is `Pending` until it binds and `Bound` afterwards. If a claim's PV disappears, the claim can show `Lost`. A Pod that uses a Pending claim also stays Pending, so a Pod stuck before scheduling is often a storage problem in disguise. When you see a Pending Pod, `kubectl describe pod` will mention an unbound PersistentVolumeClaim in its events, which is your cue to look at the claim rather than at node resources or taints.",
   "Binding only happens when the volume really fits the request. The control plane binds a PVC to a PV only when all of these match: the `storageClassName` is the same (an empty string matches only PVs that have no class), the PV supports every access mode the PVC requests, the PV's capacity is at least the requested size, the `volumeMode` (Filesystem or Block) matches, and any label `selector` on the PVC matches the PV's labels. Among several suitable PVs, Kubernetes prefers the smallest one that satisfies the request. If nothing matches and no provisioner can create a PV, the PVC stays Pending until a match appears.",
   "You can also force a specific pairing. Setting `spec.volumeName` on the PVC asks for one named PV, and setting `spec.claimRef` on a PV reserves it for one named claim. Both are useful in exam tasks that say 'bind this claim to that volume'. The other fields still have to be compatible, so a forced pairing with a mismatched class or access mode will still not bind.",
   "Checking the state is quick. `kubectl get pv,pvc -A` shows STATUS, CAPACITY, ACCESS MODES, STORAGECLASS and the CLAIM column, which tells you which namespace and claim own each PV. `kubectl describe pvc <name>` shows events explaining why a claim is not binding, and `kubectl get pv <name> -o yaml` reveals the `claimRef` that keeps a Released volume from being reused. Comparing the PVC and PV side by side, field by field, solves most binding questions in a minute."
  ],
  "analogy": "PVs and PVCs work like a self-storage facility. The units already exist (PVs), and customers fill in request forms (PVCs) listing size and type. Staff hand over one unit per form, and a large unit given to a small request is still a whole unit. When a customer leaves, the unit is marked Released, with the old name still on the door, until staff empty it or approve a new tenant. Unlike a real facility, Kubernetes never splits one unit between two forms.",
  "mnemonic": "PV phases in order: Always Book, Return, (rarely) Fail. Available, then Bound, then Released after the claim is deleted, and Failed only when reclamation goes wrong.",
  "terms": [
   [
    "PersistentVolume (PV)",
    "A cluster-scoped object representing a piece of storage and its properties."
   ],
   [
    "PersistentVolumeClaim (PVC)",
    "A namespaced request for storage that binds to exactly one matching PV."
   ],
   [
    "Released",
    "PV phase after its claim is deleted, before the storage is reclaimed or manually freed; it still holds the old claimRef."
   ],
   [
    "emptyDir",
    "A Pod-scoped scratch volume removed when the Pod leaves the node."
   ],
   [
    "claimRef",
    "The PV field recording which PVC it is, or was, bound to."
   ],
   [
    "volumeMode",
    "Whether a volume is presented as a mounted filesystem (Filesystem) or a raw device (Block); it must match for binding."
   ]
  ],
  "example": "A PVC asking for 2Gi ReadWriteOnce with storageClassName manual stays Pending. `kubectl describe pvc` shows no matching volume, and the only PV is 5Gi ReadWriteOnce but has storageClassName slow. Changing the PVC to class slow (or creating a PV with class manual) lets it bind, and `kubectl get pvc` then shows the full 5Gi capacity, because a binding hands over the whole PV.",
  "mistakes": [
   [
    "Using emptyDir for data that must survive a Pod being deleted or rescheduled.",
    "emptyDir lasts only as long as the Pod stays on that node. It survives container restarts, not Pod deletion. Use a PVC backed by a PV for durable data."
   ],
   [
    "Expecting a 10Gi PV to be shared by two 5Gi claims.",
    "Binding is exclusive and one-to-one. The first claim takes the whole PV, and the second needs its own PV."
   ],
   [
    "Thinking a Released PV is free because its claim is gone.",
    "Released PVs keep the old claimRef and possibly the old data. They do not bind automatically; an administrator must clean up and clear the claimRef or recreate the PV."
   ],
   [
    "Assuming storageClassName: \"\" and an omitted storageClassName mean the same thing.",
    "An explicit empty string means 'no class' and binds only to PVs without a class. Omitting the field lets the default StorageClass be applied if one exists."
   ]
  ],
  "tryit": [
   [
    "A PVC in namespace reports asks for 3Gi, ReadWriteMany, storageClassName nfs. Two PVs exist: pv-a is 5Gi ReadWriteOnce class nfs, and pv-b is 2Gi ReadWriteMany class nfs. Both are Available, and no provisioner exists for class nfs. What happens, and what single change would make it bind?",
    "The PVC stays Pending: pv-a fails on access mode and pv-b fails on capacity. Creating a PV of at least 3Gi with ReadWriteMany and class nfs (or lowering the request to 2Gi if the application allows it) would let it bind."
   ]
  ],
  "tip": "Pending PVCs are almost always a mismatch in storageClassName, access mode, size, volumeMode or selector. Compare the PVC and PV fields side by side with kubectl get -o yaml, and check events with kubectl describe pvc.",
  "check": [
   [
    "Can one PV be bound to two PVCs?",
    "No, PV-to-PVC binding is exclusive and one-to-one."
   ],
   [
    "Why won't a Released PV bind to a new PVC automatically?",
    "It still holds a claimRef to the deleted claim and may contain the previous claim's data."
   ],
   [
    "A 1Gi claim binds to a 5Gi PV. What capacity does the claim report?",
    "5Gi, because the entire PV is bound to the claim."
   ]
  ]
 },
 {
  "t": "Access modes: ReadWriteOnce, ReadOnlyMany, ReadWriteMany, ReadWriteOncePod",
  "hook": "Tomas runs the platform team at Bluegill Outfitters, and he has just scaled the image-resizing Deployment from one replica to three before a holiday sale. Two of the new Pods start on the same node as the first and run fine. The third lands on node02 and sits in ContainerCreating for ten minutes. `kubectl describe` shows a Multi-Attach error for the volume. Tomas is puzzled: the claim says ReadWriteOnce, and he assumed 'once' meant one Pod, so how did two extra Pods succeed at all? The sale starts in an hour. What does ReadWriteOnce actually promise, and which access mode should this workload have asked for?",
  "simple": "An access mode is a rule about how many places can use a piece of storage at the same time, and whether they can change it or only read it. Imagine a notebook. ReadWriteOnce is a notebook kept in one office: anyone in that office can write in it, but it cannot be in two offices at once. ReadOnlyMany is a printed book that many offices can read but nobody can write in. ReadWriteMany is a shared online document many offices can edit together, which needs special storage built for sharing. ReadWriteOncePod is a personal diary: exactly one person, anywhere, may use it. In Kubernetes, the 'office' is a node (a machine) and the 'person' is a Pod.",
  "body": [
   "Access modes describe how a volume can be mounted. They appear in both PersistentVolumes (PVs), where they state what the storage supports, and PersistentVolumeClaims (PVCs), where they state what the workload needs. A claim only binds to a volume that supports every mode it requests. There are four modes, each with a short form you will see in the ACCESS MODES column of kubectl output, and the exam often hinges on reading the exact words in them: node versus Pod, once versus many.",
   "ReadWriteOnce (RWO) means the volume can be mounted read-write by a single node. It is the most common mode and the one that typical block storage supports, such as a cloud disk or an Internet Small Computer Systems Interface (iSCSI) logical unit number (LUN). Pay attention to the word node. Several Pods on the same node can use an RWO volume at the same time, because the volume is attached once to that machine and the kubelet can mount it into more than one Pod. If a second Pod that needs the volume is scheduled onto a different node, it gets stuck in ContainerCreating, and its events show a Multi-Attach error saying the volume is already used by a Pod on another node.",
   "ReadOnlyMany (ROX) means many nodes can mount the volume read-only at the same time. It suits shared reference data, static website content or machine learning models that many Pods only read. ReadWriteMany (RWX) means many nodes can mount it read-write at the same time. That requires shared or network file storage designed for concurrent access, such as the Network File System (NFS), CephFS or a cloud file service. Ordinary block devices formatted with a regular filesystem cannot safely support RWX, because two machines writing the same filesystem without coordination would corrupt it. That is why a typical cloud disk StorageClass offers RWO but not RWX.",
   "ReadWriteOncePod (RWOP) restricts the volume to a single Pod in the whole cluster. It is useful when an application must be the only writer, for example to stop a second replica, or a leftover Pod during a rollout, from starting against the same data. It is supported only for Container Storage Interface (CSI) volumes, and it is enforced: a second Pod that uses the same claim will not start, and its events explain that the claim is already in use by another Pod.",
   "```yaml\nspec:\n  accessModes:\n  - ReadWriteOncePod\n  resources:\n    requests: {storage: 10Gi}\n```",
   "Several subtleties are tested. A PV can list several modes it supports, but a given volume is only mounted using one mode at a time, even if it supports many. Access modes are matching constraints used for binding and attach decisions, not a general write-protection mechanism. Claiming ROX does not by itself make the filesystem read-only inside the container. To mount read-only, set `readOnly: true` on the container's `volumeMount` or on the `persistentVolumeClaim` volume source in the Pod spec. Supported modes depend on the volume plugin or CSI driver, so check what the driver supports rather than assuming; a claim requesting a mode the provisioner cannot offer will stay Pending or fail to provision.",
   "Reading the output is straightforward once you know the abbreviations. In `kubectl get pv` and `kubectl get pvc`, the ACCESS MODES column shows RWO, ROX, RWX or RWOP. In YAML, `accessModes` is always a list, even when it contains one entry, which is a common typo in exam answers. When a Pod is stuck because of access modes, `kubectl describe pod` is the place to look: Multi-Attach errors for RWO across nodes, and in-use messages for RWOP.",
   "Choosing a mode starts with one question: where will the Pods run? One Pod only, which must never be duplicated, points to RWOP. One node, or a single replica that may restart, fits RWO. Many nodes all writing the same files needs RWX on shared storage. A Deployment with several replicas spread across nodes that all write the same data needs RWX. A StatefulSet usually takes a different approach and gives each replica its own RWO claim through volumeClaimTemplates, so no two replicas ever share one volume. That pattern is how most databases run, because the database software itself handles replication between replicas rather than relying on a shared disk. On the exam, underline the words in the question that describe placement, such as 'single Pod', 'one node' or 'all nodes', and map them directly to the mode."
  ],
  "analogy": "Think of a rental car. ReadWriteOnce is one car that can be in only one city at a time, though several passengers in that city can ride in it together. ReadOnlyMany is a published map anyone in any city can read. ReadWriteMany is a shared online booking calendar that branches in every city edit at once. ReadWriteOncePod is a car with exactly one named driver, no passengers. The analogy stops where it implies safety: access modes do not make a mount read-only; readOnly does that.",
  "terms": [
   [
    "ReadWriteOnce (RWO)",
    "Read-write by a single node; multiple Pods on that node may share it."
   ],
   [
    "ReadOnlyMany (ROX)",
    "Read-only by many nodes."
   ],
   [
    "ReadWriteMany (RWX)",
    "Read-write by many nodes at once, requiring shared file storage such as NFS."
   ],
   [
    "ReadWriteOncePod (RWOP)",
    "Read-write by exactly one Pod cluster-wide, supported for CSI volumes."
   ],
   [
    "Multi-Attach error",
    "A Pod event shown when an RWO volume is already attached to a different node."
   ],
   [
    "readOnly",
    "A volumeMount or volume source field that actually mounts the volume read-only for the container."
   ]
  ],
  "example": "A 3-replica Deployment shares one RWO PVC. The Pods on node01 run, but the replica scheduled on node02 is stuck in ContainerCreating with a Multi-Attach error. Switching to an NFS-backed RWX StorageClass so all replicas can write the same files, or converting to a StatefulSet with per-replica claims if each replica should own its data, resolves it.",
  "mistakes": [
   [
    "Believing ReadWriteOnce means only one Pod can use the volume.",
    "RWO limits the volume to one node. Several Pods on that node can share it. Use ReadWriteOncePod when only one Pod may ever use it."
   ],
   [
    "Requesting ReadWriteMany from a StorageClass backed by ordinary cloud block disks.",
    "Block disks with a normal filesystem cannot be safely written from several nodes, so the driver will not offer RWX. RWX needs shared file storage such as NFS, CephFS or a file service CSI driver."
   ],
   [
    "Assuming a ROX claim makes the data read-only inside the container.",
    "Access modes are matching and attach constraints. To enforce read-only, set readOnly: true on the volumeMount or the persistentVolumeClaim volume source."
   ],
   [
    "Writing accessModes: ReadWriteOnce as a plain string in YAML.",
    "accessModes is a list. Write it as accessModes: [ReadWriteOnce] or as a dash item, or the API rejects the manifest."
   ]
  ],
  "tryit": [
   [
    "A team runs a single-replica message-queue Pod whose data files would be corrupted if two copies ever ran at once, even briefly during a rollout. Their CSI driver supports all four access modes. Which mode should the claim request, and why not RWO?",
    "ReadWriteOncePod. RWO would still allow a second Pod on the same node, for example a new Pod created during a rolling update, to mount the volume at the same time. RWOP enforces a single Pod across the whole cluster."
   ],
   [
    "A web Deployment with six replicas across four nodes must serve the same uploaded images and let any replica save new uploads. What access mode and type of storage do you need?",
    "ReadWriteMany on shared file storage such as NFS or a file-service CSI driver, because many nodes must write the same files at the same time."
   ]
  ],
  "tip": "RWO is per node, not per Pod. If the question says only one Pod may ever use the volume, the answer is ReadWriteOncePod. If many nodes must write, the answer is ReadWriteMany on shared storage.",
  "check": [
   [
    "Can two Pods on the same node both mount an RWO volume read-write?",
    "Yes, RWO limits the volume to one node, not one Pod."
   ],
   [
    "Which access mode requires shared storage such as NFS?",
    "ReadWriteMany."
   ],
   [
    "Which access mode is supported only for CSI volumes and limits use to one Pod in the cluster?",
    "ReadWriteOncePod (RWOP)."
   ]
  ]
 },
 {
  "t": "Reclaim policies: Retain and Delete (Recycle deprecated) and cleaning up Released PVs",
  "hook": "At Copperline Insurance, Dana is cleaning up an old namespace on a Friday afternoon. She deletes the PersistentVolumeClaims for a retired reporting app, satisfied that the cluster looks tidier. On Monday, the finance team asks for last quarter's reports, which lived only on that volume. Dana checks the cluster. One volume, created by hand years ago, is still there with the files intact, marked Released. Another, created automatically by a StorageClass, has vanished along with the cloud disk behind it. Same command, two completely different outcomes. What decided the fate of each volume, and how can Dana reuse the one that survived?",
  "simple": "When you stop using a piece of storage in Kubernetes by deleting your claim, a setting on the storage decides what happens next. Think of returning a rented locker. With 'Delete', the locker and everything in it is thrown away. With 'Retain', the locker stays locked with your things still inside, and nobody else can use it until staff deal with it. Kubernetes picks 'Delete' for storage it created automatically and 'Retain' for storage an administrator created by hand. A third option, 'Recycle', used to wipe the locker and reopen it, but it is outdated and should not be used. If you want to keep data, switch the setting to Retain before deleting the claim.",
  "body": [
   "When a PersistentVolumeClaim (PVC) is deleted, the bound PersistentVolume's (PV's) `persistentVolumeReclaimPolicy` decides what happens to the PV object and to the underlying storage. This one field is the difference between a tidy cluster and lost data, or between safe data and a pile of orphaned disks nobody remembers paying for. The CKA expects you to know each policy, its default, and how to recover a volume after its claim is gone.",
   "`Delete` removes both the PV object and the backing storage asset, such as a cloud disk or a volume on a storage array, when the claim is deleted. It is the default for dynamically provisioned volumes. The value comes from the StorageClass's `reclaimPolicy` field, which itself defaults to Delete when it is not set. Delete keeps the cluster clean, because storage follows the life of the claim, but it offers no second chance for the data. Once the claim is deleted and the PV is gone, the data is gone too, unless the storage system has its own snapshots or backups.",
   "`Retain` keeps both the PV object and the data. After the claim is deleted, the PV moves to the `Released` phase and is not available for new claims. It still holds a `claimRef` pointing to the deleted claim, and it may contain the previous tenant's data, which is exactly why Kubernetes does not hand it to someone else automatically. Manually created PVs default to Retain. It is the safe choice for important data, because a human has to make a decision before anything is lost or reused.",
   "`Recycle` is deprecated. It used to scrub the volume with a basic delete of its contents and then make the PV Available again, and it only ever worked for some volume types such as NFS and hostPath. The recommended replacement is dynamic provisioning, which simply creates a fresh volume for each claim. Know that it exists, recognize it in older material, and do not choose it.",
   "Reusing a Released PV that has the Retain policy takes two deliberate steps. First decide what to do with its data: back it up, delete it from the storage, or intentionally keep it because the new claim should inherit it. Then remove the stale claim reference so the PV becomes Available again. You can do that by patching `spec.claimRef` to null, or by deleting the PV object and creating a new PV that points at the same storage. Either way, the next matching claim can bind.",
   "```bash\nkubectl get pv            # STATUS Released, CLAIM app/data\nkubectl patch pv pv-data -p '{\"spec\":{\"claimRef\":null}}'\nkubectl get pv pv-data    # STATUS Available\n# change the policy of an existing (for example dynamically provisioned) PV\nkubectl patch pv pvc-1234 -p '{\"spec\":{\"persistentVolumeReclaimPolicy\":\"Retain\"}}'\n```",
   "Changing the policy of an existing PV is allowed, and it is a common protective move. Dynamically provisioned PVs inherit Delete from their class, so before deleting or recreating a claim whose data you need, patch the PV to Retain as shown above. You can confirm the change in the RECLAIM POLICY column of `kubectl get pv`. Changing the StorageClass's own `reclaimPolicy` does not help with existing volumes, because that field is fixed after the class is created and only affects newly provisioned PVs.",
   "Two more details round out the picture. Deleting a PV object whose policy is Retain does not delete the storage asset. The disk, export or directory remains, and you must clean it up in the storage system yourself, or you will keep paying for it. Kubernetes also protects in-use objects. A PVC used by a running Pod gets the `kubernetes.io/pvc-protection` finalizer, and a PV bound to a PVC gets `kubernetes.io/pv-protection`. A delete request against such an object leaves it in Terminating until it is no longer in use, which is often why a PVC 'will not delete' during an exam task: some Pod is still using it.",
   "It helps to picture the whole sequence as it appears in kubectl output. Before deletion, `kubectl get pv` shows STATUS Bound and CLAIM `app/data`. Immediately after the claim is deleted, a Retain PV shows STATUS Released with the same CLAIM value still listed, while a Delete PV disappears from the list within moments as the provisioner removes the backing disk. If a Delete PV lingers with STATUS Failed, the storage system refused the deletion, and you need to check the provisioner's logs and clean up by hand.",
   "When answering exam questions, read carefully for the words that reveal the policy. 'The data must be preserved after the claim is removed' means Retain. 'Storage should be cleaned up automatically' means Delete. 'Dynamically provisioned' implies Delete unless the class says otherwise. And 'make the existing volume available to a new claim' means clearing the claimRef after dealing with the old data."
  ],
  "analogy": "Reclaim policies are like the rules for an apartment when a tenant moves out. Delete is a building that demolishes the unit when the lease ends. Retain keeps the unit locked, with the old tenant's furniture inside and their name still on the door, until the manager clears it and changes the nameplate (clearing claimRef). Recycle was a cleaning crew that emptied the unit and listed it again, a service the building no longer offers.",
  "terms": [
   [
    "persistentVolumeReclaimPolicy",
    "The PV field deciding what happens to the volume after its claim is deleted."
   ],
   [
    "Retain",
    "Keeps the PV and data after the claim is deleted; the PV becomes Released and needs manual action."
   ],
   [
    "Delete",
    "Removes the PV and its backing storage when the claim is deleted; the default for dynamic provisioning."
   ],
   [
    "Recycle",
    "A deprecated policy that scrubbed the volume and made it Available again."
   ],
   [
    "Protection finalizers",
    "kubernetes.io/pvc-protection and kubernetes.io/pv-protection, which keep in-use claims and bound volumes in Terminating until they are free."
   ]
  ],
  "example": "A team deletes a PVC for an old reporting app and later needs the data. Because the PV was manually created with Retain, it sits in Released with the files intact. You copy the data out, clear the claimRef with `kubectl patch pv pv-data -p '{\"spec\":{\"claimRef\":null}}'`, confirm the PV shows Available, and it binds to the new app's PVC.",
  "mistakes": [
   [
    "Assuming every PV defaults to Retain.",
    "Only manually created PVs default to Retain. Dynamically provisioned PVs take the StorageClass reclaimPolicy, which defaults to Delete."
   ],
   [
    "Expecting a Released PV to bind to the next matching claim on its own.",
    "It keeps the old claimRef and may hold old data. You must clean up and clear claimRef, or recreate the PV, before it becomes Available."
   ],
   [
    "Changing the StorageClass reclaimPolicy to protect an existing volume.",
    "That field cannot be changed on an existing class and would only affect new PVs anyway. Patch persistentVolumeReclaimPolicy on the PV itself."
   ],
   [
    "Believing that deleting a Retain PV object frees the disk.",
    "With Retain, deleting the PV object leaves the storage asset in place. Clean it up in the storage system."
   ]
  ],
  "tryit": [
   [
    "You are migrating an app to a new namespace. Its data is on a dynamically provisioned PV created by a StorageClass with no reclaimPolicy set. You must delete the old PVC and have a new PVC in the new namespace use the same data. Outline the steps in order.",
    "Patch the PV to persistentVolumeReclaimPolicy Retain first, because it defaults to Delete. Delete the old PVC; the PV becomes Released. Clear its claimRef (or set claimRef to the new namespace and claim name), then create the new PVC with matching class, size and access mode, optionally using spec.volumeName to target the PV."
   ]
  ],
  "tip": "Dynamic provisioning defaults to Delete. If the exam asks you to preserve data behind a dynamically provisioned claim, patch the PV to Retain before deleting the PVC.",
  "check": [
   [
    "What phase does a Retain PV enter after its claim is deleted?",
    "Released."
   ],
   [
    "How do you make a Released PV Available again?",
    "Clean up or keep the data as appropriate, then remove spec.claimRef, for example with kubectl patch, or recreate the PV."
   ],
   [
    "A PVC stays in Terminating after you delete it. What is the usual reason?",
    "A Pod is still using it, so the pvc-protection finalizer blocks deletion until the Pod is gone."
   ]
  ]
 },
 {
  "t": "StorageClasses, provisioners and dynamic provisioning; the default StorageClass annotation",
  "hook": "Ravi joins the infrastructure team at Northwind Kayak Rentals and inherits a cluster where developers file a ticket every time they need storage. An administrator then writes a PersistentVolume by hand, matches its size and class to the claim, and replies a day later. The backlog is forty tickets long. On the same cluster, a StorageClass named `standard` is marked default, while a faster class named `fast` sits unused. A developer's new claim omits the class entirely and gets slow disks, while another claim sets the class to an empty string and never binds at all. How can storage appear on demand, and why do those two nearly identical claims behave so differently?",
  "simple": "Creating storage by hand for every request is slow, like a restaurant where the chef has to buy groceries each time someone orders. A StorageClass is a menu item for storage, such as 'fast SSD' or 'cheap standard disk'. When an app asks for storage and names a menu item, a helper program called a provisioner creates the storage automatically, right then. One menu item can be marked as the house default: if the app's request does not name any item, it gets the default. But if the request explicitly says 'no item' by giving an empty name, Kubernetes will not use the default and only looks for storage that was created by hand with no class.",
  "body": [
   "Creating PersistentVolumes (PVs) by hand does not scale. With dynamic provisioning, a PersistentVolumeClaim (PVC) names a StorageClass, and a provisioner automatically creates a matching volume and PV the moment it is needed. This is how most real clusters handle storage, and the CKA expects you to read and write StorageClasses, change which one is the default, and diagnose claims that do not provision.",
   "A StorageClass is a cluster-scoped object describing a 'class' of storage, such as fast solid-state disks or cheaper standard disks. Its key fields are `provisioner`, which names the driver that creates volumes, usually a Container Storage Interface (CSI) driver name; `parameters`, which are driver-specific options such as disk type or replication; `reclaimPolicy`, which is Delete by default or Retain; `volumeBindingMode`, which is Immediate or WaitForFirstConsumer; `allowVolumeExpansion`; and optional `mountOptions`. Core fields such as the provisioner, parameters and reclaim policy cannot be changed after creation, so to change them you create a new class and point new claims at it.",
   "```yaml\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: fast\n  annotations:\n    storageclass.kubernetes.io/is-default-class: \"true\"\nprovisioner: example.csi.vendor.com\nparameters:\n  type: ssd\nreclaimPolicy: Delete\nvolumeBindingMode: WaitForFirstConsumer\nallowVolumeExpansion: true\n```",
   "The provisioner does the actual work. For a CSI driver, an external-provisioner sidecar running next to the driver's controller watches for PVCs that reference its class. When one appears, it calls the driver to create a volume in the storage system and then creates a PV that is already bound to the claim. Lab clusters often use a simple provisioner that carves directories out of node disks. Some classes use `provisioner: kubernetes.io/no-provisioner`, which means no dynamic provisioning at all: the class exists only so that claims and manually created PVs can be grouped and matched by name, and every PV for it must be created by hand.",
   "One StorageClass can be the default. It is marked with the annotation `storageclass.kubernetes.io/is-default-class: \"true\"` and shown as `(default)` next to its name in `kubectl get storageclass`. A PVC that omits `storageClassName` has the default class filled in by an admission controller when it is created. Recent Kubernetes versions also assign the default retroactively: a Pending claim with no class gets the default once one is set. If more than one class is marked default, recent versions pick the most recently created one, but you should avoid that ambiguity by leaving exactly one default.",
   "The difference between omitting the class and setting it to empty is tested often. A PVC that leaves out `storageClassName` means 'use the default'. A PVC that sets `storageClassName: \"\"` explicitly opts out of classes, so no provisioner will act on it and it will only bind to PVs that also have no class. If you see a claim with an empty class string stuck Pending while a perfectly good default class exists, that string is the reason.",
   "Why have several classes at all? Different workloads need different trade-offs. A database may need fast, replicated disks with a Retain policy so data is never removed by accident, while scratch space for batch jobs can use cheap disks with Delete. Classes let administrators offer those choices by name while developers simply pick one in their claim, without knowing anything about disk types, zones or driver parameters. Because a claim's class cannot be changed after it is created, picking the right class up front matters; moving data to another class later means creating a new claim and copying the data across.",
   "Changing the default is a two-step patch: remove or set to false the annotation on the old default, then set it to true on the new one. Annotation values are strings, so the quotes around \"true\" and \"false\" matter in YAML and JSON.",
   "```bash\nkubectl get sc\nkubectl patch sc standard -p '{\"metadata\":{\"annotations\":{\"storageclass.kubernetes.io/is-default-class\":\"false\"}}}'\nkubectl patch sc fast -p '{\"metadata\":{\"annotations\":{\"storageclass.kubernetes.io/is-default-class\":\"true\"}}}'\n```",
   "When a dynamic claim stays Pending, run `kubectl describe pvc` and read the events. A message like 'waiting for a volume to be created by external provisioner' means the class is set but the provisioner has not finished, so check that the provisioner's Pods are running and read their logs. The message 'no persistent volumes available for this claim and no storage class is set' means the claim has no class and no default exists. A message about waiting for the first consumer is normal for WaitForFirstConsumer classes and simply means no Pod uses the claim yet. A class name that does not exist at all also leaves the claim Pending, so check spelling with `kubectl get sc`."
  ],
  "analogy": "A StorageClass works like a coffee shop menu. Each item (class) tells the barista (provisioner) exactly how to make the drink, and you order by name. The house blend is the default: say 'a coffee' with no detail and you get it. But if you say 'nothing from the menu, please', the barista makes nothing and you wait for something already on the counter, which is what storageClassName \"\" does. Unlike a menu, recipes cannot be edited later; you add a new item instead.",
  "terms": [
   [
    "StorageClass",
    "A cluster-scoped description of a type of storage and how to provision it."
   ],
   [
    "Provisioner",
    "The component, usually a CSI driver, that creates volumes for a StorageClass."
   ],
   [
    "Dynamic provisioning",
    "Automatic creation of a PV when a PVC requests a StorageClass."
   ],
   [
    "Default StorageClass",
    "The class annotated storageclass.kubernetes.io/is-default-class: \"true\", applied to PVCs without storageClassName."
   ],
   [
    "kubernetes.io/no-provisioner",
    "A provisioner value meaning the class has no dynamic provisioning; PVs must be created manually."
   ],
   [
    "external-provisioner",
    "A CSI sidecar that watches PVCs for its driver's classes and creates volumes and PVs for them."
   ]
  ],
  "example": "A task says new PVCs without a class should use `fast` instead of `standard`. You set the default annotation on standard to \"false\" and add it with \"true\" on fast, then confirm `kubectl get sc` shows (default) only next to fast. A test PVC without storageClassName then gets class fast, and once it is used or provisioned a volume is created for it by fast's provisioner.",
  "mistakes": [
   [
    "Treating storageClassName: \"\" as 'use the default'.",
    "An empty string explicitly means no class, so it skips the default and binds only to PVs with no class. To use the default, omit the field."
   ],
   [
    "Editing a StorageClass's parameters or reclaimPolicy in place.",
    "Those fields are immutable after creation. Create a new class with the desired values and use it for new claims."
   ],
   [
    "Writing the default annotation as an unquoted boolean, is-default-class: true.",
    "Annotation values must be strings. Quote it: \"true\". Without quotes the YAML value is a boolean and the API rejects it."
   ],
   [
    "Leaving two classes marked default and assuming the old one still wins.",
    "Recent versions choose the most recently created default, which can surprise you. Keep exactly one class marked default."
   ]
  ],
  "tryit": [
   [
    "A developer's PVC with no storageClassName has been Pending for an hour. `kubectl get sc` lists two classes, neither marked (default). `kubectl describe pvc` says no persistent volumes are available and no storage class is set. What do you do, and what happens to the existing claim?",
    "Mark the appropriate class as default with the is-default-class \"true\" annotation. Recent versions assign the default retroactively to Pending claims without a class, so the existing claim picks it up and provisions; on older behavior you would recreate the claim."
   ],
   [
    "A claim names class fast and stays Pending with the event 'waiting for a volume to be created by external provisioner'. The class exists. Where do you look next?",
    "At the provisioner itself: find the CSI driver's controller Pods named in the class's provisioner field, check that they are Running, and read their logs, including the external-provisioner sidecar, for errors."
   ]
  ],
  "tip": "Omitting storageClassName means 'use the default'; setting it to an empty string means 'no class'. They behave very differently, and the exam likes to test exactly that.",
  "check": [
   [
    "What annotation makes a StorageClass the default?",
    "storageclass.kubernetes.io/is-default-class: \"true\"."
   ],
   [
    "What reclaim policy do dynamically provisioned PVs get if the StorageClass does not specify one?",
    "Delete."
   ],
   [
    "What does provisioner: kubernetes.io/no-provisioner mean?",
    "The class does not provision volumes dynamically; PVs for it must be created by hand."
   ]
  ]
 },
 {
  "t": "VolumeBindingMode Immediate vs WaitForFirstConsumer",
  "hook": "Mei is the only Kubernetes administrator at Fernwood Public Library, and she has just added fast local SSDs to three nodes for the catalog search index. She creates a claim, and it binds instantly to the disk on node03. Then she creates the Pod, which has a nodeSelector that only allows nodes with the label `tier=search`, and node03 does not have it. The Pod sits in Pending with a message about a volume node affinity conflict. Mei deletes everything and tries again with a different StorageClass, and this time the claim stubbornly stays Pending, which feels worse. Is that second Pending a new failure, or exactly what she wanted?",
  "simple": "Some storage can only be used from one place, like a disk inside one particular computer. If Kubernetes picks the disk first and the app later turns out to be unable to run on that computer, the two are stuck apart. The binding mode decides the order. 'Immediate' means pick the storage right away, as soon as it is requested. 'WaitForFirstConsumer' means wait until an app that needs the storage is actually being placed, choose a computer for the app first, and then pick storage on that same computer. It is like booking a hotel only after you know which city your meeting is in. While it waits, the request shows as Pending, and that is normal.",
  "body": [
   "A StorageClass's `volumeBindingMode` decides when a PersistentVolumeClaim (PVC) is bound to a volume and, for dynamic provisioning, when the volume is created. It sounds like a minor timing detail, but it matters whenever storage is tied to a topology, such as a cloud availability zone or a single node. Picking the wrong mode is a classic cause of Pods that never schedule, and the right mode produces a Pending claim that looks like a fault but is not.",
   "With `Immediate`, which is the default when the field is not set, binding and provisioning happen as soon as the PVC is created, before any Pod uses it. That works well for storage reachable from every node, such as an NFS export. For topology-constrained storage, though, the volume might be created in a zone, or selected on a node, where the Pod later cannot run. The Pod might need more CPU than that node has, carry a nodeSelector or node affinity that excludes it, or lack a toleration for a taint on it. The Pod then fails to schedule, and its events say that nodes had a volume node affinity conflict.",
   "With `WaitForFirstConsumer`, binding is delayed until a Pod that uses the PVC is created. The scheduler then chooses a node while considering all of the Pod's constraints together, including resource requests, affinity, taints and which nodes the storage can reach. Only after a node is chosen is the PersistentVolume (PV) provisioned in the right zone, or a matching static PV on that node selected and bound. Until then, `kubectl get pvc` shows Pending and `kubectl describe pvc` shows an event like 'waiting for first consumer to be created before binding'. That is normal behavior, not an error.",
   "```yaml\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata: {name: local-storage}\nprovisioner: kubernetes.io/no-provisioner\nvolumeBindingMode: WaitForFirstConsumer\n```",
   "Local volumes, which are disks or directories attached to one specific node, should always use a class with WaitForFirstConsumer. Otherwise a claim might bind to a local PV on node03 while the Pod's other constraints only allow node01, and the Pod would never schedule, because the PV's nodeAffinity pins any consumer to node03. The class above, with `kubernetes.io/no-provisioner`, is the standard pairing for local PVs created by hand. Many cloud Container Storage Interface (CSI) StorageClasses also use WaitForFirstConsumer, so that a disk is created in the same zone as the node the scheduler picked rather than in a random zone.",
   "There is one trap worth memorizing. Setting `spec.nodeName` directly on a Pod bypasses the scheduler entirely, and with it the logic that triggers delayed binding. The claim may then never bind, and the Pod waits forever. If you need to steer a Pod onto a node while using a WaitForFirstConsumer class, use a nodeSelector or node affinity instead, so the scheduler still runs and can trigger binding.",
   "When diagnosing, always check which mode the claim's class uses with `kubectl get sc`; the VOLUMEBINDINGMODE column shows it. A Pending PVC in a WaitForFirstConsumer class with no Pod using it is expected. A Pending PVC in an Immediate class means provisioning failed or no static PV matched, so read the events and the provisioner logs. A Pod that is Pending with 'node(s) had volume node affinity conflict' usually means a volume was bound somewhere the Pod cannot go, often because the class used Immediate for topology-bound storage. Fixing that means deleting and recreating the claim, after saving any data, with a WaitForFirstConsumer class, or relaxing the Pod's constraints so it can run where the volume is.",
   "The binding mode is part of the StorageClass and cannot be edited on an existing class, like most class fields. To change it, create a new class, or delete and recreate the class with the same name if no claims depend on its old behavior. Existing bound claims are not affected either way, because their binding has already happened.",
   "A quick way to remember the trade-off: Immediate optimizes for speed of binding and is safe when every node can reach the storage. WaitForFirstConsumer optimizes for correct placement and is the right choice whenever storage lives in only some places. On the exam, any mention of local volumes, zones or node-specific disks should make you think of WaitForFirstConsumer, and any 'why is this claim Pending' question should send you to check the class's binding mode before anything else."
  ],
  "analogy": "Immediate binding is like booking a hotel the moment a conference is announced, before you know which city it will be in; you may end up with a room in the wrong city. WaitForFirstConsumer is waiting until the venue is confirmed and then booking a hotel next to it. The waiting period feels like delay, but it is deliberate. Where the analogy stops: Kubernetes does not move a bound volume later, so a wrong early booking cannot be changed, only replaced.",
  "terms": [
   [
    "volumeBindingMode",
    "StorageClass field controlling when PVCs bind: Immediate or WaitForFirstConsumer."
   ],
   [
    "Immediate",
    "The default; binds or provisions as soon as the PVC is created, regardless of where Pods will run."
   ],
   [
    "WaitForFirstConsumer",
    "Delays binding until a Pod using the claim is scheduled, so storage matches the chosen node or zone."
   ],
   [
    "Volume node affinity conflict",
    "A scheduling failure where the Pod cannot run on any node the bound volume can reach."
   ],
   [
    "Topology-constrained storage",
    "Storage reachable only from some nodes or zones, such as local disks or zonal cloud disks."
   ]
  ],
  "example": "A learner creates a PVC in the local-storage class and panics when it stays Pending. `kubectl describe pvc` says it is waiting for the first consumer to be created before binding. Creating the Pod that uses it triggers scheduling to node02, the claim binds to node02's local PV, and the Pod starts.",
  "mistakes": [
   [
    "Treating a Pending PVC in a WaitForFirstConsumer class as broken.",
    "Pending with 'waiting for first consumer' is expected until a Pod uses the claim. Create the Pod and binding happens."
   ],
   [
    "Using spec.nodeName to place a Pod that uses a WaitForFirstConsumer claim.",
    "nodeName bypasses the scheduler, which is what triggers delayed binding, so the claim may never bind. Use a nodeSelector or node affinity."
   ],
   [
    "Believing WaitForFirstConsumer is the default.",
    "The default is Immediate. You must set WaitForFirstConsumer explicitly in the StorageClass."
   ],
   [
    "Using an Immediate class for local PVs.",
    "The claim may bind to a disk on a node where the Pod cannot run, causing a volume node affinity conflict. Local PVs need WaitForFirstConsumer."
   ]
  ],
  "tryit": [
   [
    "A Pod using a claim in class zonal-ssd is Pending with 'node(s) had volume node affinity conflict'. `kubectl get sc zonal-ssd` shows VOLUMEBINDINGMODE Immediate, and the PV lives in a zone where all nodes are tainted for another team. What is the root cause and the lasting fix?",
    "The Immediate class provisioned the disk before the Pod was scheduled, in a zone the Pod cannot use. The lasting fix is a StorageClass with WaitForFirstConsumer so future disks are created where the Pod is scheduled; for this Pod, save any data, recreate the claim in the new class, or adjust tolerations so the Pod can run in that zone."
   ]
  ],
  "tip": "Pending with 'waiting for first consumer' is the expected state until a Pod uses the claim. Do not set nodeName on such Pods, because it skips the scheduler that triggers binding.",
  "check": [
   [
    "Which binding mode should local volumes use, and why?",
    "WaitForFirstConsumer, so the PV is chosen only after the scheduler picks a node that satisfies all of the Pod's constraints."
   ],
   [
    "What is the default volumeBindingMode?",
    "Immediate."
   ],
   [
    "Why can setting spec.nodeName leave a WaitForFirstConsumer claim unbound?",
    "nodeName bypasses the scheduler, and the scheduler is what triggers delayed binding."
   ]
  ]
 },
 {
  "t": "Volume expansion with allowVolumeExpansion",
  "hook": "At 6:40 a.m. the monitoring channel at Saltmarsh Logistics lights up: the order database volume is 96 percent full and climbing. Jordan, on the early shift, remembers that copying a database to a bigger disk took most of a night last time. Someone suggests editing the PersistentVolume and typing a bigger number. Someone else says Kubernetes cannot grow disks at all. Jordan opens the StorageClass and sees a field called `allowVolumeExpansion`. Can the volume grow in place while the database keeps running, which object should actually be edited, and what will the claim's status show while it happens?",
  "simple": "Sometimes an app's storage fills up. Instead of moving everything to a new, bigger disk, Kubernetes can make the existing one bigger, as long as two things are true: the storage type supports growing, and the administrator has switched on permission for it in the StorageClass (the storage 'menu item'). You ask for more space by editing your request (the claim), not the storage itself. Kubernetes then grows the disk and then the filesystem on it, like adding an extension to a house and then moving the walls so the rooms actually get bigger. Some systems can do this while the app keeps running; others finish when the app restarts. You can only grow storage, never shrink it.",
  "body": [
   "Applications grow, and their volumes eventually fill up. Kubernetes lets you enlarge a PersistentVolumeClaim (PVC) in place, without copying data to a new volume, as long as the storage supports it and the administrator has allowed it. The CKA expects you to know where the permission lives, which object to edit, how to watch progress, and what cannot be done.",
   "Permission comes from the StorageClass field `allowVolumeExpansion: true`. Unlike most StorageClass fields, which are fixed after creation, this one can be changed on an existing class, for example with `kubectl patch sc fast -p '{\"allowVolumeExpansion\": true}'`. If it is false or missing, the API server rejects any attempt to increase a PVC's size, with an error saying that only dynamically provisioned PVCs can be resized and that the StorageClass must support resize. The underlying driver must also support expansion. The flag is a policy switch; it does not add a capability that the storage system does not have, and a driver without expansion support will leave the request unfulfilled.",
   "To expand, edit the claim, not the PersistentVolume (PV). Increase `spec.resources.requests.storage` on the PVC with `kubectl edit pvc data` or a patch. From there, the work is automatic. The resize controller, together with the Container Storage Interface (CSI) driver's external-resizer sidecar, asks the storage system to enlarge the backend volume and updates the PV's capacity. Finally the filesystem on the volume is grown by the kubelet on the node where it is mounted, because only that node can see the filesystem.",
   "```bash\nkubectl get sc fast -o jsonpath='{.allowVolumeExpansion}'\nkubectl patch pvc data -n app -p '{\"spec\":{\"resources\":{\"requests\":{\"storage\":\"20Gi\"}}}}'\nkubectl get pvc data -n app -w           # CAPACITY updates when done\nkubectl describe pvc data -n app          # conditions and events\n```",
   "Expansion happens in two stages, and you may see them in the PVC's conditions in `kubectl describe pvc`. First the controller resizes the volume itself, and the claim shows a `Resizing` condition. Then the filesystem must be grown to use the new space. Many CSI drivers support online expansion, growing the filesystem while the Pod keeps running, so the application never notices beyond the extra space. With drivers that only support offline expansion, the PVC shows a `FileSystemResizePending` condition and the filesystem is resized the next time a Pod mounts the volume, so you restart or recreate the Pod to finish the job.",
   "Learn to read spec and status separately. The PVC's `spec.resources.requests.storage` shows what you asked for immediately after the edit, while `status.capacity.storage`, the CAPACITY column in `kubectl get pvc`, only reflects the new size once the whole process has completed. If the two differ for a long time, the conditions and events in `kubectl describe pvc` explain why: a pending filesystem resize, a driver error, or a backend quota.",
   "Shrinking is not supported. Requesting a smaller size than the current capacity is rejected by the API server. If you accidentally request a much larger size than intended, or an expansion fails because the backend cannot provide the space, check your Kubernetes version's documentation on recovering from expansion failures. Recent versions allow a failed request to be lowered again, but never below the volume's current capacity, so this is a recovery path for mistakes, not a way to shrink.",
   "A few limits come up in questions. Statically created PVs with no StorageClass cannot be expanded through this mechanism, because there is no class to grant permission and usually no driver to do the work. A volume can only grow as far as its backend allows. hostPath volumes have no real size enforcement at all and do not support expansion; their capacity is only a label used for matching. And in a StatefulSet, editing the size in `volumeClaimTemplates` does not resize existing claims, so you expand each PVC individually.",
   "It is worth knowing why the filesystem step happens on the node. The storage system can make a block device larger, but the filesystem written on that device still describes the old size until something rewrites its metadata. Only the machine where the device is attached and mounted can do that safely, which is why the kubelet performs the last step and why a Pod restart can be needed with drivers that do not support growing a mounted filesystem. Inside the container, `df -h` on the mount path is the simplest proof that the application can actually use the new space.",
   "Putting it together, the exam routine is short. Check the class with `kubectl get sc <class> -o jsonpath='{.allowVolumeExpansion}'` and patch it to true if allowed. Patch the PVC to the new size. Watch `kubectl get pvc -w` until CAPACITY changes, and if it does not, describe the claim and look for FileSystemResizePending, which tells you a Pod restart is needed."
  ],
  "analogy": "Expanding a volume is like enlarging a rented storage unit by knocking through into the empty space next door. The building manager must allow it (allowVolumeExpansion), and the building must physically have the space (driver support). You ask at the front desk by updating your rental form (the PVC), not by tearing down walls yourself (the PV). Some buildings let you keep using the unit during the work; others need you to step out first. Nobody will make your unit smaller.",
  "terms": [
   [
    "allowVolumeExpansion",
    "StorageClass flag permitting PVCs of that class to be enlarged; it can be changed on an existing class."
   ],
   [
    "Online expansion",
    "Growing a volume's filesystem while the Pod using it keeps running."
   ],
   [
    "FileSystemResizePending",
    "A PVC condition indicating the filesystem will be resized when a Pod next mounts the volume."
   ],
   [
    "Resizing",
    "A PVC condition showing the backend volume is being enlarged by the controller and driver."
   ],
   [
    "external-resizer",
    "A CSI sidecar that handles volume expansion requests for its driver."
   ]
  ],
  "example": "A database PVC of 10Gi is 95 percent full. The class already has allowVolumeExpansion true, so you patch the PVC to 20Gi. `kubectl describe pvc` shows Resizing, then the CAPACITY column shows 20Gi, and `df -h` inside the Pod confirms the larger filesystem without a restart because the driver supports online expansion.",
  "mistakes": [
   [
    "Editing the PV's capacity to grow a volume.",
    "Expansion is requested on the PVC by raising spec.resources.requests.storage. The controller and driver update the PV."
   ],
   [
    "Assuming allowVolumeExpansion: true works for any storage.",
    "The flag only grants permission. The driver must support expansion, and static PVs without a class or hostPath volumes cannot be expanded this way."
   ],
   [
    "Concluding the resize failed because CAPACITY did not change right away.",
    "Status updates only when both stages finish. Check for FileSystemResizePending, which means a Pod restart will complete the resize."
   ],
   [
    "Trying to shrink a PVC after over-sizing it.",
    "Shrinking below current capacity is not supported. Plan sizes carefully; recovery features only help after a failed expansion."
   ]
  ],
  "tryit": [
   [
    "You patch a PVC from 5Gi to 8Gi. Ten minutes later `kubectl get pvc` still shows CAPACITY 5Gi, and `kubectl describe pvc` shows the condition FileSystemResizePending. The Pod using it is managed by a Deployment. What do you do?",
    "The backend volume has already been enlarged; only the filesystem resize is waiting for a fresh mount. Restart the Pod, for example with kubectl rollout restart deployment, and the kubelet grows the filesystem when it mounts the volume, after which CAPACITY shows 8Gi."
   ],
   [
    "A patch to grow a PVC is rejected immediately by the API server. The claim's class is standard. What is the first thing to check?",
    "Whether StorageClass standard has allowVolumeExpansion set to true. If it is missing or false, patch the class (if you are permitted) and retry the PVC change."
   ]
  ],
  "tip": "Expand the PVC, never the PV, and only upwards. If the edit is rejected, check allowVolumeExpansion on the claim's StorageClass first; if CAPACITY lags, look for FileSystemResizePending.",
  "check": [
   [
    "Which object do you edit to grow a volume?",
    "The PersistentVolumeClaim, by raising spec.resources.requests.storage."
   ],
   [
    "Can you reduce a PVC's size after expanding it?",
    "No, shrinking PVCs below their current capacity is not supported."
   ],
   [
    "Can allowVolumeExpansion be changed on an existing StorageClass?",
    "Yes, unlike fields such as provisioner, parameters and reclaimPolicy."
   ]
  ]
 },
 {
  "t": "Static PVs: hostPath for labs, local volumes with nodeAffinity, NFS",
  "hook": "Sam has just joined Redwood Valley Schools as their first platform engineer. The district's small on-premises cluster has no storage provisioner, three worker nodes with spare SSDs, and an old NFS server in the closet that holds years of shared lesson files. On Sam's first day, a test Pod's data mysteriously disappears after it moves from node01 to node02, because someone used hostPath. The principal wants the grade book on fast local disk and the lesson archive shared by every Pod. With no automation to lean on, Sam has to write PersistentVolumes by hand. Which volume type fits each need, and what does each manifest have to include?",
  "simple": "When Kubernetes cannot create storage automatically, an administrator writes a description of existing storage by hand. This is called a static PersistentVolume. There are three common kinds. hostPath uses a folder on whichever computer the app happens to run on, like leaving notes on a desk in a shared office; if you move desks, your notes stay behind. A local volume also uses a disk on one computer, but it tells Kubernetes which computer, so the app is always sent there. NFS is storage on a separate file server that every computer can reach over the network, like a shared drive, so many apps on different computers can use it together.",
  "body": [
   "Without a dynamic provisioner, an administrator creates PersistentVolumes (PVs) by hand, which is called static provisioning. Each PV describes storage that already exists: its size, its access modes, its class, its reclaim policy and where the storage actually lives. The CKA frequently asks you to write such a PV from a description, so know three common backends, what each is good for, and the exact fields each manifest needs.",
   "`hostPath` mounts a directory from the node's own filesystem. It is ideal for single-node labs and quick tests, and it appears often in exam tasks for that reason. It is poor for production. The data lives on whichever node the Pod lands on, so a rescheduled Pod on another node sees a different and probably empty directory. Giving Pods access to host paths is also a security risk, because a container could read or modify sensitive host files, which is why many clusters restrict hostPath through Pod Security admission. The optional `type` field controls checks on the path: `DirectoryOrCreate` creates the directory if it is missing, while `Directory` requires it to exist already, and other values cover files, sockets and devices.",
   "```yaml\napiVersion: v1\nkind: PersistentVolume\nmetadata: {name: pv-log}\nspec:\n  capacity: {storage: 1Gi}\n  accessModes: [ReadWriteOnce]\n  persistentVolumeReclaimPolicy: Retain\n  storageClassName: manual\n  hostPath: {path: /data/log, type: DirectoryOrCreate}\n```",
   "A `local` volume also uses a disk or directory on one node, but it does so in a way the scheduler understands. It requires `nodeAffinity` on the PV naming the node that holds the storage, so any Pod using the claim is scheduled to that node. The API server rejects a local PV without nodeAffinity. The path must already exist on the node; Kubernetes will not create it. Pair local PVs with a StorageClass that has `provisioner: kubernetes.io/no-provisioner` and `volumeBindingMode: WaitForFirstConsumer`, so binding waits until the Pod's placement is known and the claim does not bind to a disk on a node where the Pod cannot run.",
   "```yaml\nspec:\n  capacity: {storage: 50Gi}\n  accessModes: [ReadWriteOnce]\n  storageClassName: local-storage\n  local: {path: /mnt/disks/ssd1}\n  nodeAffinity:\n    required:\n      nodeSelectorTerms:\n      - matchExpressions:\n        - {key: kubernetes.io/hostname, operator: In, values: [node02]}\n```",
   "The usual nodeAffinity key is `kubernetes.io/hostname`, whose value is the node's name as shown by `kubectl get nodes`, but any node label works. If the node holding a local PV goes away, Pods using it cannot be rescheduled elsewhere, because the data really is on that one machine. That is the price of local disk performance, and applications that use local PVs usually replicate data themselves.",
   "The Network File System (NFS) provides network storage that any node can mount, so it supports ReadWriteMany as well as ReadWriteOnce and ReadOnlyMany. The PV specifies the `server` address and the exported `path`. Every node that may run the Pod needs the NFS client utilities installed; the package name depends on the Linux distribution. Without them, the mount fails and the Pod stays in ContainerCreating with a mount error in its events. For dynamic NFS provisioning, a CSI driver or an external NFS provisioner can be installed instead of writing PVs by hand.",
   "```yaml\nspec:\n  capacity: {storage: 5Gi}\n  accessModes: [ReadWriteMany]\n  storageClassName: nfs\n  nfs: {server: 10.0.0.20, path: /exports/shared}\n```",
   "Some rules apply to all static PVs. The claim must match on storageClassName and access mode and must request no more than the PV's capacity; `volumeMode` and any selector must match too. Capacity is a label for matching rather than a quota: a hostPath PV of 1Gi does not stop a Pod from writing more, and neither does an NFS PV, since the export's real size and quotas are managed on the server. Manually created PVs default to the Retain reclaim policy, so deleting the claim leaves the data and a Released PV behind. Finally, PVs are cluster-scoped, so do not put a namespace in their metadata, while the matching PVC lives in the application's namespace.",
   "Choosing among the three comes down to two questions: does the data need to survive the Pod moving to another node, and do several nodes need it at once? If neither matters and you are in a lab, hostPath is the quickest answer. If the data must stay with one fast disk and the Pod can be tied to that node, use a local PV. If Pods on different nodes must share the same files, or a Pod must be free to move, use NFS or another network storage backend. Exam tasks usually state the backend outright, but recognizing the reasoning helps when a question asks which option fits a scenario. An efficient exam workflow is to copy a PV example from the Kubernetes documentation, which you are allowed to use, adjust the name, capacity, access modes, class and backend fields to the task, apply it, and then run `kubectl get pv,pvc` to confirm both show Bound. If the claim stays Pending, compare the class, access modes and size first, because those are the usual culprits."
  ],
  "analogy": "The three static PV types are like three ways to store files at a company. hostPath is a desk drawer: handy, but it belongs to whichever desk you sit at today. A local volume is an assigned locker with your name on it, so you are always sent to that locker's room. NFS is a shared network drive anyone can open from any desk. The analogy stops at sizes: a label saying '1Gi' on a hostPath drawer does not stop it from overflowing.",
  "terms": [
   [
    "Static provisioning",
    "Creating PV objects manually for storage that already exists."
   ],
   [
    "hostPath",
    "A volume type mounting a directory from the node's filesystem; suitable for labs only."
   ],
   [
    "local volume",
    "A PV for node-attached storage that requires nodeAffinity to pin Pods to that node."
   ],
   [
    "NFS volume",
    "Network file storage identified by server and path, usable read-write from many nodes."
   ],
   [
    "nodeAffinity (on a PV)",
    "Rules naming which nodes can access the volume; required for local PVs."
   ]
  ],
  "example": "A task asks for a PV named pv-analytics of 100Mi, ReadWriteMany, hostPath /pv/data-analytics, to be used by an existing PVC. You check the PVC's storageClassName, write the PV manifest with the same class, apply it, and `kubectl get pv,pvc` shows both Bound. ReadWriteMany is accepted on hostPath here because the lab is effectively single node; it would not give real sharing across nodes.",
  "mistakes": [
   [
    "Creating a local PV without nodeAffinity.",
    "The API server rejects it. A local PV must name the node that holds the storage through spec.nodeAffinity."
   ],
   [
    "Expecting hostPath data to follow a Pod to another node.",
    "hostPath reads the directory on whichever node the Pod runs on. Another node has its own, separate directory."
   ],
   [
    "Assuming a PV's capacity limits how much a Pod can write.",
    "For static PVs like hostPath and NFS, capacity is used for matching, not enforced as a quota."
   ],
   [
    "Forgetting the NFS client utilities on worker nodes.",
    "Without them the kubelet cannot mount the export, and the Pod is stuck in ContainerCreating with a mount error."
   ]
  ],
  "tryit": [
   [
    "You must give a database fast storage from an SSD mounted at /mnt/disks/ssd1 on node02, and the database Pod must always run where its data is. No provisioner is installed. Which volume type and which supporting objects do you create?",
    "Create a local PV with path /mnt/disks/ssd1 and nodeAffinity for kubernetes.io/hostname In node02, a StorageClass with provisioner kubernetes.io/no-provisioner and volumeBindingMode WaitForFirstConsumer, and a PVC in that class. Pods using the claim are then scheduled to node02 automatically."
   ],
   [
    "A Pod using an NFS PV is stuck in ContainerCreating on node03 only, and its events show a mount failure, while Pods on node01 using the same PV run fine. What do you check?",
    "Whether the NFS client utilities are installed on node03, and whether node03 can reach the NFS server over the network. The PV itself is fine because other nodes mount it."
   ]
  ],
  "tip": "A local PV without nodeAffinity is rejected by the API server. hostPath data stays on one node, so if the Pod moves, its data does not. NFS needs client tools on every node.",
  "check": [
   [
    "What field is required on a local PV that hostPath does not need?",
    "nodeAffinity, identifying the node that holds the storage."
   ],
   [
    "What must be installed on nodes to mount NFS PVs?",
    "The NFS client utilities for the node's operating system."
   ],
   [
    "What reclaim policy does a manually created PV get by default?",
    "Retain."
   ]
  ]
 },
 {
  "t": "CSI drivers and StatefulSet volumeClaimTemplates with PVC retention",
  "hook": "The finance team at Pinecrest Credit Union forwards you a storage bill that has quietly doubled. You dig in and find dozens of PersistentVolumeClaims named things like `data-ledger-7` through `data-ledger-19`, left over from a load test weeks ago when someone scaled a StatefulSet up to twenty replicas and back down to five. Nobody deleted anything, yet nothing was cleaned up either. Meanwhile, a new database replica is stuck Pending, and a colleague wonders aloud whether the storage driver is even running. How do StatefulSets create their claims, why did these ones outlive their Pods, and how do you check the health of the driver that provides them?",
  "simple": "Kubernetes does not know how to talk to every brand of storage by itself. Instead, each storage vendor provides a plug-in called a CSI driver, a bit like a printer driver on a laptop. Part of the driver runs once for the whole cluster to create and attach disks, and part runs on every machine to connect disks to apps. A StatefulSet is a way to run apps like databases, where each copy needs its own disk. You give it a template, and it creates a separate storage request for each copy, named after the copy. By default those requests are kept even when copies are removed, to protect data, which is safe but can leave unused storage behind unless you change that setting.",
  "body": [
   "The Container Storage Interface (CSI) is how modern Kubernetes storage works. Instead of storage code being built into Kubernetes itself, vendors ship drivers that the cluster installs like any other workload, using Deployments, StatefulSets and DaemonSets. As an administrator you should be able to recognize a driver's parts, check whether it is healthy, and see how StatefulSets use the storage it provides.",
   "A CSI driver usually has two components. The controller component is a Deployment or StatefulSet running the driver plus helper sidecar containers: external-provisioner creates volumes for PersistentVolumeClaims (PVCs), external-attacher attaches volumes to nodes, external-resizer handles expansion, and external-snapshotter handles snapshots. The node component is a DaemonSet, so it runs on every node, with the driver and a node-driver-registrar sidecar that registers the driver with that node's kubelet. The node component performs the actual mounts into Pods, which is why a Pod stuck in ContainerCreating with a CSI mount error often points to a failing node plugin Pod on that particular node.",
   "Several objects let you inspect a driver. `kubectl get csidrivers` lists the drivers installed in the cluster. `kubectl get csinodes` shows which drivers are registered on each node, so a node missing a driver stands out. `kubectl get volumeattachments` shows which volumes are attached to which nodes. A StorageClass refers to the driver by its name in the `provisioner` field, so the class and the CSIDriver name must match. Volume snapshots use the `VolumeSnapshot`, `VolumeSnapshotContent` and `VolumeSnapshotClass` custom resources plus a snapshot controller, which are not part of core Kubernetes and must be installed separately.",
   "StatefulSets use this storage through `volumeClaimTemplates`. Instead of one PVC shared by all replicas, each Pod gets its own PVC created from the template, named `<template-name>-<statefulset-name>-<ordinal>`, such as `data-db-0`. Each claim is then dynamically provisioned through the StorageClass named in the template. When `db-1` is deleted or rescheduled to another node, its replacement reattaches `data-db-1`, keeping the Pod's stable identity and its data together. That pairing is the main reason to use a StatefulSet for databases.",
   "```yaml\napiVersion: apps/v1\nkind: StatefulSet\nmetadata: {name: db}\nspec:\n  serviceName: db\n  replicas: 3\n  selector: {matchLabels: {app: db}}\n  persistentVolumeClaimRetentionPolicy:\n    whenDeleted: Retain\n    whenScaled: Delete\n  template:\n    metadata: {labels: {app: db}}\n    spec:\n      containers:\n      - name: db\n        image: postgres:16\n        volumeMounts: [{name: data, mountPath: /var/lib/postgresql/data}]\n  volumeClaimTemplates:\n  - metadata: {name: data}\n    spec:\n      accessModes: [ReadWriteOnce]\n      storageClassName: fast\n      resources: {requests: {storage: 10Gi}}\n```",
   "By default, PVCs created from volumeClaimTemplates are never deleted automatically, whether you scale down or delete the StatefulSet. This protects data, since a scale-down followed by a scale-up reattaches the same claims, but it leaves claims and their storage costs behind. The `persistentVolumeClaimRetentionPolicy` field changes that with two settings. `whenDeleted` applies when the StatefulSet itself is deleted. `whenScaled` applies to Pods removed by scaling down, which are always the highest ordinals first. Each can be `Retain`, the default, or `Delete`. With Delete, the PVCs are removed, and then each PersistentVolume (PV) follows its own reclaim policy, which for dynamically provisioned volumes is usually Delete as well, so the data is gone.",
   "The example manifest above shows a sensible combination: keep all claims if someone deletes the whole StatefulSet by mistake (`whenDeleted: Retain`), but clean up the claims of replicas removed by scaling down (`whenScaled: Delete`). The reverse combination, or Delete for both, suits throwaway test environments where cost matters more than data.",
   "Before relying on the retention policy, remember what it does not do. It never deletes claims that were created by hand and mounted into the StatefulSet's Pod template as ordinary volumes, only claims created from volumeClaimTemplates. It also does not override a PV's reclaim policy: if the PVs use Retain, deleting the claims still leaves Released PVs and their disks behind for an administrator to clean up.",
   "Keep in mind that volumeClaimTemplates are largely fixed after creation. Changing the template's size does not resize the existing PVCs. To grow them, expand each PVC individually, provided the StorageClass allows expansion. New replicas created later use whatever template the StatefulSet has.",
   "Troubleshooting follows the chain from Pod to claim to driver. A StatefulSet Pod stuck Pending often points to its PVC, so check `kubectl get pvc` for that ordinal and run `kubectl describe pvc` for provisioner or topology errors. If the claim is waiting on an external provisioner, find the driver's controller Pods with `kubectl get pods -A` and read the external-provisioner sidecar's logs with `kubectl logs <pod> -c <container>`. If the claim is Bound but the Pod is stuck in ContainerCreating, look at the node plugin Pod on that node and at `kubectl get volumeattachments`. Remember too that StatefulSet Pods start in order by default, so a stuck `db-0` will block `db-1` and `db-2` from being created."
  ],
  "analogy": "A CSI driver is like a staffing agency for storage. The agency's head office (controller component) takes orders, creates disks and assigns them to buildings. A receptionist placed in every building (node DaemonSet) actually hands disks to the people working there. A StatefulSet is a team where every member gets a named locker that waits for them even if they are away. Where the analogy stops: unclaimed lockers are never emptied unless the retention policy says so.",
  "terms": [
   [
    "CSI driver",
    "A vendor storage plugin, split into controller and per-node components, that implements the Container Storage Interface."
   ],
   [
    "volumeClaimTemplates",
    "StatefulSet field that creates one PVC per Pod ordinal, named template-statefulset-ordinal."
   ],
   [
    "persistentVolumeClaimRetentionPolicy",
    "StatefulSet setting with whenDeleted and whenScaled, each Retain (default) or Delete."
   ],
   [
    "VolumeAttachment",
    "An object recording that a CSI volume is attached to a particular node."
   ],
   [
    "CSINode",
    "An object listing which CSI drivers are registered on a node."
   ],
   [
    "node-driver-registrar",
    "The sidecar in the node DaemonSet that registers the CSI driver with the kubelet."
   ]
  ],
  "example": "After scaling a test StatefulSet named web from 5 to 2 replicas, `kubectl get pvc` still lists data-web-2 to data-web-4, consuming storage. Setting `whenScaled: Delete` in the retention policy means future scale-downs clean up claims automatically, and the three leftover PVCs are deleted manually after confirming the data is not needed.",
  "mistakes": [
   [
    "Expecting deleting a StatefulSet to delete its PVCs.",
    "The default retention policy is Retain for both whenDeleted and whenScaled, so claims and data remain. Set Delete explicitly if you want cleanup."
   ],
   [
    "Editing the storage size in volumeClaimTemplates to grow existing replicas.",
    "Template changes do not resize existing PVCs. Expand each PVC individually, if the class allows expansion."
   ],
   [
    "Naming the claim statefulset-template-ordinal, such as db-data-0.",
    "The order is template name, then StatefulSet name, then ordinal: data-db-0."
   ],
   [
    "Assuming VolumeSnapshots work out of the box.",
    "The snapshot CRDs and snapshot controller must be installed separately, and the CSI driver must support snapshots."
   ]
  ],
  "tryit": [
   [
    "StatefulSet cache with template name store has replicas 3. You scale it to 1, then back to 3, without any retention policy set. What happens to the claims, and does cache-2 get its old data back?",
    "With the default Retain, store-cache-1 and store-cache-2 are kept when scaling down. Scaling back up recreates Pods cache-1 and cache-2, which reattach the same claims, so cache-2 gets its old data back."
   ],
   [
    "A newly scheduled StatefulSet Pod on node04 is stuck in ContainerCreating with a CSI mount error, while replicas on other nodes are fine. Its PVC is Bound. What do you check first?",
    "The CSI node plugin on node04: whether its DaemonSet Pod is running there, its logs, and whether `kubectl get csinodes` shows the driver registered on node04."
   ]
  ],
  "tip": "Default retention is Retain for both whenDeleted and whenScaled, so deleting a StatefulSet does not delete its data. PVC names follow template-statefulset-ordinal.",
  "check": [
   [
    "What is the PVC name for Pod cache-2 of StatefulSet cache with template name store?",
    "store-cache-2."
   ],
   [
    "Which CSI component runs on every node and performs mounts?",
    "The node plugin, typically a DaemonSet with the driver and node-driver-registrar."
   ],
   [
    "Which retention setting controls PVCs removed when a StatefulSet is scaled down?",
    "persistentVolumeClaimRetentionPolicy.whenScaled."
   ]
  ]
 },
 {
  "t": "Node problems: NotReady, kubelet status and journalctl -u kubelet, kubelet config and certificates, container runtime down, node conditions (DiskPressure, MemoryPressure)",
  "hook": "Just after midnight, the pager at Marigold Grocery Delivery goes off: node01 is NotReady, and the checkout Pods that lived there are being rescheduled onto nodes that are already busy. Aisha, on the night shift, runs `kubectl get nodes` and sees the STATUS column but not much else. Was the node patched and the kubelet left stopped? Did someone edit a config file and leave a typo? Has a certificate expired, did the container runtime crash, or is the disk simply full? Each cause needs a different fix, and guessing wastes the precious minutes before morning orders spike. Where should Aisha look first, and how can a node's own conditions tell her which story is true?",
  "simple": "Every machine (node) in a Kubernetes cluster runs a small agent called the kubelet. The kubelet's job is to start containers on that machine and to keep telling the cluster's control center, 'I am here and healthy'. If those check-ins stop, or the kubelet reports a problem, the node is marked NotReady and no new work is sent to it. Think of a store manager who phones head office every few minutes: if the calls stop, head office assumes the store is closed. To fix it, you visit the store, check whether the manager is at work (the kubelet service), read the manager's notes (its logs), and look for problems like a broken phone line, a wrong phone number, or a storeroom that is completely full.",
  "body": [
   "Troubleshooting is the largest domain of the CKA, and a node showing NotReady is a classic task. A node's status is reported by its kubelet, the agent that runs on every node, starts Pods through the container runtime and regularly reports node health to the API server. So a NotReady node almost always means one of four things: the kubelet is stopped, it is misconfigured, it cannot reach or authenticate to the API server, or it is running but reports that its container runtime or network is not ready.",
   "Start from the outside, with commands that work from anywhere. `kubectl get nodes` shows which node is NotReady, and `kubectl describe node node01` explains why. Its Conditions section lists `Ready`, `MemoryPressure`, `DiskPressure`, `PIDPressure` and, with some Container Network Interface (CNI) plugins, `NetworkUnavailable`, each with a status, a reason and a message. The distinction between two Ready values is the most useful clue. If Ready is `Unknown` and the message says the kubelet stopped posting node status, the kubelet is not talking to the API server at all: it is stopped, crashing, misconfigured or cannot connect. If Ready is `False`, the kubelet is running and connected but reports a problem, such as the container runtime being down or the network plugin not initialized.",
   "Next, connect to the node with Secure Shell (SSH) and check the kubelet service. On kubeadm clusters the kubelet runs as a systemd unit, not as a Pod, so `kubectl logs` cannot help here. `systemctl status kubelet` tells you whether it is active, failed or stopped, and shows the last few log lines. `journalctl -u kubelet` shows the full story; add `-f` to follow it live, or `--no-pager | tail -50` to see the latest errors. If the service is simply stopped or disabled, perhaps after maintenance, `systemctl enable --now kubelet` starts it and makes sure it starts after the next reboot.",
   "```bash\nsudo systemctl status kubelet\nsudo journalctl -u kubelet --no-pager | tail -50\nsudo systemctl status containerd\nsudo crictl info | head\ncat /var/lib/kubelet/config.yaml\nsystemctl cat kubelet            # unit and drop-ins, including kubeadm flags\ncat /var/lib/kubelet/kubeadm-flags.env\n```",
   "Configuration breakages usually live in a few files, and the journal normally names the one at fault. `/var/lib/kubelet/config.yaml` is the KubeletConfiguration, holding settings such as the cgroup driver, the static Pod path, the cluster Domain Name System (DNS) address and certificate rotation. `/etc/kubernetes/kubelet.conf` is the kubelet's kubeconfig, including the API server address and the client certificate to use. The systemd drop-in, which you can view along with the unit itself using `systemctl cat kubelet`, and `/var/lib/kubelet/kubeadm-flags.env` add command-line flags such as the container runtime endpoint. A wrong path, port, binary location or typo in any of these shows up clearly in the journal, for example as a file that cannot be loaded or a connection refused to the wrong API server port. After fixing, run `systemctl daemon-reload` if you edited a unit or drop-in file, then `systemctl restart kubelet`, and watch `kubectl get nodes` until the node returns to Ready.",
   "Certificates matter too. The kubelet authenticates to the API server with a client certificate, typically `/var/lib/kubelet/pki/kubelet-client-current.pem`, which is normally rotated automatically before it expires. If it has expired, if rotation was disabled, or if the cluster's certificate authority (CA) does not match the one the kubelet trusts, the journal shows x509 errors or 'Unauthorized' responses, and the node goes Unknown. Check the expiry date with `openssl x509 -noout -enddate -in <file>` and compare the CA data in `kubelet.conf` with the cluster's CA.",
   "If the kubelet runs but the container runtime is down, the journal complains that it cannot connect to the containerd socket, and the node usually shows Ready False with a message about the runtime. Check `systemctl status containerd`, start or restart it, and read its own journal with `journalctl -u containerd` if it fails again. `crictl info` and `crictl ps` confirm that the runtime is answering. A runtime endpoint flag that points to the wrong socket produces similar errors even when containerd is healthy, so read the exact path in the message.",
   "Pressure conditions are different: the kubelet is healthy, but the node is running out of something. They come from the kubelet's eviction thresholds. DiskPressure appears when the node's root filesystem or image filesystem runs low on space or inodes. The kubelet first garbage-collects unused images and dead containers, then may evict Pods, and the node receives a `node.kubernetes.io/disk-pressure` taint so the scheduler keeps new Pods away. MemoryPressure similarly triggers evictions, starting with Pods whose usage exceeds their requests, and PIDPressure does the same when process IDs run short. Free up space, memory or processes, for example by removing large log files or stopping runaway workloads, and the condition clears on its own once usage falls below the threshold.",
   "Putting it together gives a reliable routine. Describe the node and read the Ready status and message. Unknown means go to the node and check the kubelet service, its journal, its config files and its certificates. False means read the message, which usually names the runtime or the network. A pressure condition means look at disk, memory or processes on the node. In every case, `systemctl status kubelet` and `journalctl -u kubelet` are your first two commands once you are on the node."
  ],
  "analogy": "A node is like a branch office whose manager (the kubelet) phones head office (the API server) on a schedule. No calls at all means head office marks the branch Unknown: the manager is absent, has the wrong number, or their badge (certificate) no longer works. Calls saying 'the delivery van is broken' (runtime down) mark it False. Calls saying 'the storeroom is full' are pressure conditions. The analogy stops where the kubelet also evicts Pods by itself; managers rarely send staff home automatically.",
  "terms": [
   [
    "NotReady",
    "Node status when the Ready condition is False or Unknown."
   ],
   [
    "journalctl -u kubelet",
    "Shows the kubelet service's logs, the primary source for node-level errors."
   ],
   [
    "Node conditions",
    "Status flags such as Ready, MemoryPressure, DiskPressure and PIDPressure reported by the kubelet."
   ],
   [
    "KubeletConfiguration",
    "The kubelet's config file, typically /var/lib/kubelet/config.yaml."
   ],
   [
    "kubelet.conf",
    "The kubelet's kubeconfig at /etc/kubernetes/kubelet.conf, holding the API server address and credentials."
   ],
   [
    "disk-pressure taint",
    "node.kubernetes.io/disk-pressure, added to a node under DiskPressure so new Pods are not scheduled there."
   ]
  ],
  "example": "node01 is NotReady with status Unknown. On the node, `systemctl status kubelet` shows it failed; the journal says the config file cannot be loaded because the path in the drop-in points to /var/lib/kubelet/confg.yaml. Correcting the typo, running `systemctl daemon-reload` and restarting the kubelet brings node01 back to Ready within a minute.",
  "mistakes": [
   [
    "Running kubectl logs to read the kubelet's logs.",
    "On kubeadm clusters the kubelet is a systemd service, not a Pod. Use journalctl -u kubelet on the node."
   ],
   [
    "Treating Ready Unknown and Ready False as the same problem.",
    "Unknown means the kubelet stopped reporting entirely; False means it reports a specific problem such as the runtime or network not being ready. They lead to different checks."
   ],
   [
    "Editing the kubelet drop-in and only running systemctl restart kubelet.",
    "systemd caches unit files. Run systemctl daemon-reload after editing a unit or drop-in, then restart the kubelet."
   ],
   [
    "Restarting the kubelet repeatedly when the journal shows containerd socket errors.",
    "The kubelet is fine; the runtime is down or the endpoint is wrong. Check and start containerd, and verify the runtime endpoint path."
   ]
  ],
  "tryit": [
   [
    "node02 is NotReady. `kubectl describe node node02` shows Ready False with a message that the container runtime is down. On the node, `systemctl status kubelet` shows active (running). What do you check and do next?",
    "The kubelet is running and reporting, so focus on the runtime: run systemctl status containerd, start or restart it, and check journalctl -u containerd if it fails. Then confirm with crictl info and watch the node return to Ready."
   ],
   [
    "A node shows Ready True but DiskPressure True, and new Pods avoid it. `df -h` shows the root filesystem almost full because of old application log files in /var/log. What happens after you remove them?",
    "Once free space rises above the eviction threshold, the kubelet clears the DiskPressure condition and removes the disk-pressure taint, so the scheduler can place Pods there again. No kubelet restart is required."
   ]
  ],
  "tip": "Ready Unknown means the kubelet has stopped reporting; Ready False means it reports a problem. In both cases, `systemctl status kubelet` and `journalctl -u kubelet` on the node are your first two commands.",
  "check": [
   [
    "Which command shows the kubelet's systemd unit together with its drop-in files?",
    "`systemctl cat kubelet`."
   ],
   [
    "What does a DiskPressure condition cause the kubelet to do?",
    "Garbage-collect images and containers, evict Pods if needed, and taint the node so new Pods stay away."
   ],
   [
    "The journal shows x509 certificate errors and the node is Unknown. What do you check?",
    "The kubelet client certificate's expiry (for example with openssl x509 -noout -enddate) and whether its CA matches the cluster's CA."
   ]
  ]
 },
 {
  "t": "Control plane problems: static Pod manifests, crictl ps/logs when the API server is down, scheduler and controller-manager symptoms, etcd health with etcdctl",
  "hook": "It is 6:40 a.m. at Lakeside Freight, and Jonah has just opened his terminal to start the day. Every kubectl command answers the same way: 'The connection to the server 10.0.0.10:6443 was refused.' Last night a teammate rotated a certificate on the control plane node and left a note saying 'done, all good.' The delivery tracking app still answers customers, because its Pods are already running, but nobody can deploy, scale or even look at the cluster. Jonah cannot run `kubectl logs` against a cluster that will not talk to him. So how do you read the logs of the API server when the API server itself is the thing that is broken?",
  "simple": "The brain of a Kubernetes cluster is a handful of programs: the API server (the front desk every command goes through), etcd (the database that remembers everything), the scheduler (which picks a machine for each new app copy) and the controller manager (which keeps fixing differences between what you asked for and what exists). On most exam clusters these programs are started from small recipe files in one folder on the main machine. If someone makes a typo in a recipe, that program stops working. When the front desk is down, you cannot ask the cluster anything, so you walk into the back room instead: you log in to the machine and ask the container engine directly what is running and why it crashed. It is like checking the kitchen yourself when the waiter stops answering.",
  "body": [
   "On a cluster built with kubeadm, the four control plane components run as static Pods. Their definitions live as YAML files in `/etc/kubernetes/manifests` on the control plane node: `kube-apiserver.yaml`, `etcd.yaml`, `kube-scheduler.yaml` and `kube-controller-manager.yaml`. The kubelet on that node watches the directory and starts, restarts or stops a Pod whenever a file appears, changes or disappears, without involving the API server at all. That design is what lets the control plane bootstrap itself, and it also explains most control plane breakages in the Certified Kubernetes Administrator (CKA) exam: someone edits a manifest and introduces a typo in a flag, a wrong certificate path, a wrong port, an image tag that does not exist or a YAML indentation error. Your job is to work out which component is broken and read its logs, even when kubectl does not work.",
   "Start by recognizing that the API server is down. kubectl fails with 'connection refused' on port 6443, or it hangs and times out. Because `kubectl logs` asks the API server for logs, it is useless here. Instead, connect to the control plane node with ssh and talk to the container runtime directly using crictl, the Container Runtime Interface (CRI) command-line tool. `crictl ps -a` lists every container on the node, including exited ones; a component that keeps crashing shows an Exited state and an ATTEMPT count that keeps rising each time the kubelet restarts it. `crictl logs <container-id>` then prints the reason it exited, which is usually a single clear line near the end.",
   "```bash\nsudo crictl ps -a | grep -E 'apiserver|etcd|scheduler|controller'\nsudo crictl logs <container-id> 2>&1 | tail -20\nsudo journalctl -u kubelet | grep -i manifest | tail\nsudo ls /var/log/pods/ | grep kube-apiserver\n```",
   "There is an important difference between a crashing container and a missing one. If `crictl ps -a` shows no kube-apiserver container at all, the kubelet could not even turn the manifest into a Pod, usually because the YAML does not parse. In that case the container runtime has nothing to tell you, and the evidence is in the kubelet's own journal: `journalctl -u kubelet` will mention the static Pod file and the parsing error. Container logs also survive on disk under `/var/log/pods/` and, as symlinks, under `/var/log/containers/`, so you can `cat` or `tail` them directly if crictl is awkward.",
   "The API server fails in a few typical ways. It cannot reach etcd because `--etcd-servers` has the wrong URL or port, or because one of the etcd client certificate flags (`--etcd-cafile`, `--etcd-certfile`, `--etcd-keyfile`) points to the wrong file. A certificate or key file named in a flag does not exist, often from a misspelled filename under `/etc/kubernetes/pki`. Or a flag itself is misspelled, which the binary rejects as an unknown flag. After you fix the manifest, be patient. The kubelet has to notice the change, stop the old container and start a new one, and the API server can take a minute or so to become ready. Running kubectl repeatedly every few seconds is fine; editing the file again in a panic often is not.",
   "The scheduler and controller-manager fail more quietly, because kubectl still works and nothing announces the problem. You recognize them by symptoms. When the scheduler is down, new Pods stay Pending with no node assigned and, tellingly, no FailedScheduling events, because no scheduler is even trying. When the controller-manager is down, scaling a Deployment does not create Pods, a new Deployment gets no ReplicaSet, EndpointSlices are not updated when Pods change, and failed nodes are not marked or cleaned up. Check with `kubectl get pods -n kube-system`, `kubectl describe pod` on the component for its crash reason, and `kubectl logs -n kube-system kube-controller-manager-<node>`. Common breakages are a wrong kubeconfig path (the scheduler uses `/etc/kubernetes/scheduler.conf` and the controller-manager uses `/etc/kubernetes/controller-manager.conf`) or a bad command name in the manifest's `command` list.",
   "etcd needs its own health check. etcdctl uses the same certificate flags you use for snapshots. `endpoint health` reports whether a member responds, `endpoint status -w table` shows the leader, database size and raft index, and `member list` shows the members of the cluster. If etcd's data directory or its hostPath volume is wrong, etcd may start with an empty database or fail outright, and the API server either loses all its objects or cannot start. An API server log full of etcd connection errors is your cue to check etcd first.",
   "```bash\nsudo ETCDCTL_API=3 etcdctl --cacert=/etc/kubernetes/pki/etcd/ca.crt \\\n  --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key \\\n  endpoint health\n```",
   "One habit protects you from making things worse. Before editing any manifest, copy it to a backup location outside the manifests directory, for example `/root/kube-apiserver.yaml.bak`. A copy left inside `/etc/kubernetes/manifests` would be read by the kubelet and started as a second static Pod, which creates fresh confusion. With a backup in a safe place, you can always compare your edited file against the original with `diff` and spot the line that changed."
  ],
  "analogy": "Think of the manifests directory as a stack of recipe cards taped to a kitchen wall, and the kubelet as a cook who rereads the wall constantly and cooks whatever is on it. Normally you place orders through the front desk (the API server). When the front desk is closed, you walk into the kitchen and ask the cook directly (crictl) or read the cook's notebook (the kubelet journal). The analogy stops at one point the exam cares about: any card on the wall gets cooked, so a spare copy taped there becomes a second dish.",
  "mnemonic": "The four static Pod manifests on a kubeadm control plane: 'Every API Server Counts' for etcd, kube-apiserver, kube-scheduler and kube-controller-manager. If one is misbehaving, its YAML file in /etc/kubernetes/manifests is the first suspect.",
  "terms": [
   [
    "Static Pod",
    "A Pod the kubelet starts directly from a manifest file on its node, without the API server; kubeadm uses them for the control plane."
   ],
   [
    "crictl ps -a",
    "Lists all containers on a node from the runtime, including exited ones, with their attempt counts."
   ],
   [
    "crictl logs",
    "Reads a container's logs directly from the runtime, useful when the API server is down."
   ],
   [
    "etcdctl endpoint health",
    "Checks whether an etcd member is responding."
   ],
   [
    "/var/log/pods",
    "On-disk directory where the kubelet stores container log files per Pod."
   ]
  ],
  "example": "After a colleague changed the API server's certificate paths, kubectl reports connection refused. `crictl ps -a` shows the kube-apiserver container exiting repeatedly, and `crictl logs` says a file under /etc/kubernetes/pki does not exist because of a misspelled filename. Correcting the path in kube-apiserver.yaml brings the API back about a minute later.",
  "mistakes": [
   [
    "Using `kubectl logs` or `kubectl describe` to debug a down API server.",
    "Both commands go through the API server, so they cannot work. Use `crictl ps -a`, `crictl logs` and the files under /var/log/pods on the control plane node."
   ],
   [
    "Assuming the scheduler is broken whenever a Pod is Pending.",
    "A FailedScheduling event means the scheduler is working and rejecting nodes. Only a Pending Pod with no events at all points at a missing scheduler."
   ],
   [
    "Saving a backup copy of a manifest in /etc/kubernetes/manifests.",
    "The kubelet starts every manifest in that directory, so the backup becomes a second static Pod. Keep backups elsewhere."
   ],
   [
    "Blaming the controller-manager for Pods that do not start on a node.",
    "The controller-manager creates Pod objects. If Pod objects exist but stay Pending or ContainerCreating, look at the scheduler, the kubelet or the node instead."
   ]
  ],
  "tryit": [
   [
    "kubectl works, but after you scale Deployment web from 2 to 5 replicas, `kubectl get rs` still shows 2 desired and no new Pods appear. New bare Pods you create directly do get scheduled and start. Which component do you investigate, and with what command?",
    "The controller-manager: the ReplicaSet controller is not updating the ReplicaSet or creating Pods, while the scheduler and kubelet clearly work. Run `kubectl get pods -n kube-system` and `kubectl logs -n kube-system kube-controller-manager-<node>` or describe it to find, for example, a wrong kubeconfig path in its manifest."
   ],
   [
    "kubectl reports connection refused. On the control plane node, `crictl ps -a | grep apiserver` returns nothing at all. What do you check next?",
    "No container means the kubelet could not create the static Pod, typically because the manifest has a YAML error. Check `journalctl -u kubelet` for errors about kube-apiserver.yaml and fix the syntax."
   ]
  ],
  "tip": "No container at all in crictl ps -a means the manifest could not be parsed (check the kubelet journal); a crashing container means the component started but rejected its configuration (check crictl logs).",
  "check": [
   [
    "How do you read the API server's logs when kubectl cannot connect?",
    "On the control plane node, find its container with `crictl ps -a` and run `crictl logs <id>`, or read the files under /var/log/pods."
   ],
   [
    "What symptom suggests the controller-manager is down?",
    "Deployments or ReplicaSets do not create or replace Pods even though the API server works."
   ],
   [
    "What symptom suggests the scheduler is down?",
    "New Pods stay Pending with no node and no FailedScheduling events."
   ]
  ]
 },
 {
  "t": "Pending Pods: FailedScheduling messages for resources, taints, affinity and unbound PVCs",
  "hook": "Priya, the platform engineer at Riverbend Clinics, gets a message from the appointments team: 'Our new reporting Pod has been Pending for twenty minutes. Is the cluster full?' A quick look at Grafana shows the worker nodes idling at 25 percent CPU. Nothing looks full. She runs `kubectl describe pod reports-0` and scrolls to the bottom, where one long line sits in the Events: '0/4 nodes are available: 1 node(s) had untolerated taint, 2 Insufficient memory, 1 node(s) didn't match Pod's node affinity/selector.' Three different reasons, four nodes, one Pod. Which of these is actually the one to fix, and how can memory be 'insufficient' on nodes that look nearly idle?",
  "simple": "Before a Pod can run, Kubernetes has to pick a machine for it. The part that picks is called the scheduler. It goes through every machine and crosses off the ones that do not fit: not enough reserved room, a 'keep out' sign the Pod is not allowed past, the wrong label, or storage that is not ready. If every machine gets crossed off, the Pod waits in a state called Pending, and the scheduler writes a note explaining why each machine was rejected. Reading that note is like reading a rejection letter from every apartment you applied for: one says 'no pets', two say 'too small', one says 'wrong neighborhood'. Each reason needs a different fix, and the note tells you exactly which.",
  "body": [
   "A Pod in the `Pending` phase has either not been placed on a node yet, or has been placed but its containers have not started. The first case is a scheduling problem, and the Certified Kubernetes Administrator (CKA) exam tests it often because the fix is almost always written in plain text. When the scheduler cannot place a Pod, it records a `FailedScheduling` event. Run `kubectl describe pod <name>` and read the Events section at the bottom; the message usually tells you exactly what to change.",
   "The message is a summary across every node, and learning to read it is the core skill. It looks like this: `0/4 nodes are available: 1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }, 2 Insufficient cpu, 1 node(s) didn't match Pod's node affinity/selector.` Each phrase names a filter that ruled some nodes out, and the counts add up to the total number of nodes. You may also see a second part about preemption, stating whether evicting lower-priority Pods could make room. Do not stop at the first phrase: in this example, the control plane node is excluded by design and probably should stay that way, so the real fixes concern the other three nodes.",
   "`Insufficient cpu` or `Insufficient memory` means the Pod's resource requests do not fit into any remaining node's unreserved allocatable capacity. The key word is requests. The scheduler adds up the requests of all Pods already on a node and compares that total with the node's allocatable resources; it ignores how much CPU or memory is actually being used. That is why a node can look idle in a monitoring dashboard and still be full as far as scheduling is concerned. Compare the Pod's requests with the Allocated resources section of `kubectl describe node`. Fixes are to lower unrealistic requests, free capacity by scaling something else down, or add nodes. Note that a ResourceQuota problem looks different: the API server refuses to create the Pod at all, so there is no Pending Pod to describe, and the error appears on the ReplicaSet or in the create command instead.",
   "`had untolerated taint {key: value}` means a node carries a taint the Pod does not tolerate. Decide which side is wrong. If the Pod really belongs on that node, add a matching toleration to the Pod spec. If the taint should not be there, remove it with `kubectl taint node <node> key=value:Effect-`, where the trailing minus means remove. A related phrase, `node(s) were unschedulable`, means the node is cordoned, which sets `spec.unschedulable: true`; run `kubectl uncordon <node>` if maintenance is finished.",
   "`didn't match Pod's node affinity/selector` means no remaining node carries the labels the Pod requires through `nodeSelector` or required node affinity. Compare `kubectl get nodes --show-labels` with the Pod spec, and fix whichever side has the typo or the missing label. Inter-Pod rules produce `didn't match pod affinity rules` or `didn't match pod anti-affinity rules`; a classic case is a Deployment with more replicas than nodes and a required one-per-node anti-affinity rule, where the extra replicas can never be placed. `didn't match pod topology spread constraints` is the equivalent message for spread rules with `whenUnsatisfiable: DoNotSchedule`.",
   "Storage problems have their own phrases. `pod has unbound immediate PersistentVolumeClaims` means a PersistentVolumeClaim (PVC) the Pod uses is still Pending, so the scheduler will not place the Pod yet. Describe the PVC next to see why: no PersistentVolume (PV) matches the requested size, access mode or storage class, the class name is misspelled, or the dynamic provisioner is failing. `node(s) had volume node affinity conflict` means the PVC is bound to a volume that can only be attached on certain nodes, typically a local volume or a zonal disk, and the Pod cannot run on any of those nodes.",
   "```bash\nkubectl get pods --field-selector=status.phase=Pending -A\nkubectl describe pod web-7d9 | sed -n '/Events/,$p'\nkubectl get events -n app --field-selector reason=FailedScheduling\nkubectl describe node worker1 | grep -A8 'Allocated resources'\n```",
   "Two special cases round out the picture. If a Pending Pod has no events at all, the scheduler is probably not running, or the Pod names a `schedulerName` that no scheduler answers to. Check the kube-system namespace and the Pod spec. And if the Pod already has a node assigned (`kubectl get pod -o wide` shows a NODE value) but is still Pending, scheduling succeeded and the problem is on that node: an image pull, a volume mount or the Container Network Interface (CNI) plugin. Those causes appear in the same events list with reasons such as ErrImagePull, FailedMount or FailedCreatePodSandBox, so the method is the same: describe the Pod and read every event."
  ],
  "analogy": "The scheduler is like a wedding planner seating a late guest. One table is reserved for family only (a taint), two tables already have all their seats promised even if some guests have not arrived (requests, not actual usage), and one table is in the wrong section for the guest's ticket (node affinity). The rejection note lists every table and why. Where the analogy breaks: the planner never looks at who is actually sitting down, only at promised seats, which is exactly how requests work.",
  "terms": [
   [
    "FailedScheduling",
    "Event reason recorded when the scheduler cannot find a suitable node for a Pod."
   ],
   [
    "Insufficient cpu/memory",
    "Scheduler message meaning the Pod's requests exceed every node's unreserved allocatable capacity."
   ],
   [
    "Untolerated taint",
    "Scheduler message meaning a node's taint has no matching toleration on the Pod."
   ],
   [
    "Unbound immediate PersistentVolumeClaims",
    "Scheduler message meaning a PVC the Pod needs is not yet bound to a volume."
   ],
   [
    "Volume node affinity conflict",
    "Scheduler message meaning the Pod's bound volume can only be used on nodes the Pod cannot run on."
   ]
  ],
  "example": "A Pod is Pending with '0/3 nodes are available: 1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }, 2 Insufficient memory.' The Pod requests 8Gi but workers have 4Gi allocatable. Reducing the request to a realistic 1Gi lets it schedule on a worker, and the control plane taint is left in place.",
  "mistakes": [
   [
    "Concluding a node has room because its live CPU and memory usage are low.",
    "The scheduler counts requests, not usage. Check Allocated resources in kubectl describe node to see how much is already reserved."
   ],
   [
    "Removing the control plane taint to fix any Pending Pod.",
    "The control plane taint is usually intended. Read the other phrases in the message and fix the nodes that should accept the Pod."
   ],
   [
    "Looking for a Pending Pod when a ResourceQuota is exceeded.",
    "Quota violations are rejected at creation, so no Pod exists. The error shows on the ReplicaSet events or the create command."
   ],
   [
    "Treating 'unbound immediate PersistentVolumeClaims' as a scheduler bug.",
    "The scheduler is waiting for storage. Describe the PVC to find the binding problem, such as a wrong storage class or no matching PV."
   ]
  ],
  "tryit": [
   [
    "A Deployment with 4 replicas has a required podAntiAffinity rule on kubernetes.io/hostname so that no two replicas share a node. The cluster has 3 schedulable workers. One replica stays Pending with 'didn't match pod anti-affinity rules'. What are your options?",
    "The fourth replica can never fit because each worker already holds one. Either reduce replicas to 3, add a fourth worker, or change the rule to preferred anti-affinity so the scheduler may place two replicas together when it has to."
   ],
   [
    "A Pod is Pending with '0/3 nodes are available: 3 node(s) were unschedulable.' The nodes were patched last night. What happened and what do you run?",
    "All three nodes are still cordoned from maintenance. Confirm with `kubectl get nodes` (SchedulingDisabled) and run `kubectl uncordon` on each node that is ready for work."
   ]
  ],
  "tip": "Read the whole FailedScheduling message: the counts tell you why each group of nodes was rejected, and the fix differs for each. Remember the scheduler uses requests, not live usage.",
  "check": [
   [
    "What does 'node(s) were unschedulable' mean in a FailedScheduling event?",
    "Those nodes are cordoned (spec.unschedulable is true)."
   ],
   [
    "A Pod is Pending with 'pod has unbound immediate PersistentVolumeClaims'. What do you check next?",
    "Describe the PVC to see why it is not binding: class, access mode, size or provisioner problems."
   ],
   [
    "A Pending Pod shows no events at all. What does that suggest?",
    "No scheduler is handling it: the scheduler is down or the Pod names a schedulerName nobody serves."
   ]
  ]
 },
 {
  "t": "Resource monitoring: metrics-server, kubectl top nodes/pods --sort-by, describe node allocated resources",
  "hook": "On Monday morning at Cedar Valley Schools, Tomas gets two tickets that seem to contradict each other. The first says, 'The grading service keeps restarting, I think it is running out of memory.' The second says, 'New Pods will not start on worker2, but worker2 is barely doing anything.' He opens a terminal and types `kubectl top nodes`. worker2 shows 30 percent CPU. Then he runs `kubectl describe node worker2` and sees CPU requests at 96 percent. Two commands, two very different numbers for the same machine. Which one is telling the truth, and which one should he trust for each ticket?",
  "simple": "A cluster has two kinds of numbers about CPU and memory. One is what apps are really using right now, like the reading on your electricity meter. The other is what apps have booked in advance, like seats reserved at a theater. The command `kubectl top` shows the meter reading; it needs a small helper program called metrics-server to collect those readings. The command `kubectl describe node` shows the bookings. Kubernetes decides where new apps can go based on bookings, not on the meter. So a machine can be quiet on the meter but fully booked, and new apps will not fit. And an app that uses much more than it booked can run a machine short of memory.",
  "body": [
   "Two kinds of numbers describe a cluster's resources, and the Certified Kubernetes Administrator (CKA) exam checks whether you know which is which. The first is actual usage: how much CPU and memory containers are consuming right now. It comes from metrics-server and is shown by `kubectl top`. The second is reservations: how much each Pod has requested and what limits it has. Those come from Pod specs and are shown by `kubectl describe node`. Most confusing resource questions become simple once you ask which of the two views the question is really about.",
   "metrics-server is a small cluster add-on, normally a Deployment in kube-system. It periodically collects usage figures from each kubelet's resource metrics endpoint and serves them through the `metrics.k8s.io` API, which is an aggregated API registered with the API server. It keeps only the latest values in memory. It is not a monitoring system with history or alerting; that is the job of tools such as Prometheus. If metrics-server is not installed or not healthy, `kubectl top` fails with an error saying metrics are not available. Check it with `kubectl get deploy metrics-server -n kube-system`, look at its logs, and run `kubectl get apiservice v1beta1.metrics.k8s.io`, whose AVAILABLE column should read True. A common lab cause of failure is that metrics-server cannot verify the kubelets' serving certificates.",
   "```bash\nkubectl top nodes\nkubectl top nodes --sort-by=memory\nkubectl top pods -A --sort-by=cpu\nkubectl top pods -n app --containers\nkubectl top pods -l app=web --sort-by=memory --no-headers | head -1\n```",
   "`kubectl top nodes` shows CPU in millicores (for example `250m`, a quarter of a core) and memory in units such as Mi, each with a percentage of the node's allocatable capacity. `kubectl top pods` shows usage per Pod. `--containers` breaks it down by container, `-A` covers all namespaces, `-l` filters by label, and `--sort-by=cpu` or `--sort-by=memory` puts the largest consumer first. Note that this `--sort-by` accepts only those two words, unlike the JSONPath `--sort-by` of `kubectl get`.",
   "A classic exam task reads: find the Pod with a given label that uses the most CPU and write its name to a file. Sort, take the first line, extract the name and redirect it. For example, `kubectl top pods -l app=web --sort-by=cpu --no-headers | head -1 | awk '{print $1}' > /opt/answers/top.txt`. Watch the columns: with `-A`, the first column is the namespace and the name moves to column 2. Always `cat` the file to confirm that it contains only the name.",
   "The other view comes from `kubectl describe node <name>`. It shows `Capacity`, the total resources on the machine, and `Allocatable`, what is left for Pods after the operating system and kubelet reservations are subtracted. Below that is a table of non-terminated Pods with their CPU and memory requests and limits, and an `Allocated resources` summary that totals those requests and limits as percentages of allocatable. This summary is what the scheduler cares about. Limits can add up to more than 100 percent, which is called overcommitment and is allowed. Requests of scheduled Pods cannot exceed allocatable, because the scheduler would not have placed them.",
   "```bash\nkubectl describe node worker2 | grep -A10 'Allocated resources'\nkubectl get node worker2 -o jsonpath='{.status.allocatable}'\n```",
   "Comparing the two views explains many puzzles. A node can show 30 percent CPU in top yet refuse new Pods, because its requests already total 95 percent of allocatable; the fix is about requests, not about load. The opposite also happens. A node whose requests are low can be under real memory pressure if its Pods use far more than they request, and the kubelet may start evicting Pods when available memory falls below its eviction threshold. At the container level, a Pod whose memory usage in top keeps creeping toward its memory limit is a candidate for OOMKilled restarts, because the kernel kills a container that exceeds its memory limit. CPU behaves differently: a container that hits its CPU limit is throttled and slows down rather than being killed.",
   "For troubleshooting, use the views together. When Pods will not schedule, read Allocated resources. When a node is struggling or Pods are being evicted, read top and the node conditions such as MemoryPressure. When a single container restarts with OOMKilled, compare its usage in `kubectl top pods --containers` with its limit in the Pod spec, and either raise the limit or fix the application's memory use."
  ],
  "analogy": "A node is like a restaurant with a reservation book. `kubectl describe node` is the book: it shows how many seats are promised. `kubectl top` is a look around the dining room: how many people are actually eating. The host (the scheduler) only checks the book, so a half-empty room can still turn walk-ins away. The analogy falls short on limits: a diner who eats past their memory limit gets removed, while one who exceeds a CPU limit is just served more slowly.",
  "terms": [
   [
    "metrics-server",
    "Cluster add-on that collects current CPU and memory usage from kubelets and serves it through the metrics.k8s.io API."
   ],
   [
    "kubectl top",
    "Shows current CPU and memory usage of nodes or Pods using metrics-server."
   ],
   [
    "Allocatable",
    "Node resources available for Pods after system reservations, used by the scheduler."
   ],
   [
    "Allocated resources",
    "The describe node summary of total requests and limits of Pods on the node."
   ],
   [
    "Overcommitment",
    "When the sum of limits on a node exceeds its allocatable capacity."
   ]
  ],
  "example": "A task asks: 'Write the name of the Pod with label app=batch that uses the most memory to /opt/answers/top.txt.' You run `kubectl top pods -A -l app=batch --sort-by=memory --no-headers | head -1`, note the name in column 2 (because -A adds a namespace column), write it to the file with echo, then cat it to confirm.",
  "mistakes": [
   [
    "Using kubectl top to explain why a Pod will not schedule.",
    "Scheduling is based on requests. The Allocated resources section of kubectl describe node is the right evidence."
   ],
   [
    "Thinking metrics-server stores history you can query for last week.",
    "It keeps only recent values in memory. Historical data needs a monitoring system such as Prometheus."
   ],
   [
    "Passing a JSONPath to kubectl top --sort-by.",
    "kubectl top accepts only cpu or memory. The JSONPath --sort-by belongs to kubectl get."
   ],
   [
    "Believing limits on a node can never add up to more than 100 percent.",
    "Limits can be overcommitted. Only requests are bounded by allocatable for scheduled Pods."
   ]
  ],
  "tryit": [
   [
    "`kubectl top pods` returns 'error: Metrics API not available'. Other kubectl commands work. What do you check, in order?",
    "Check that the metrics-server Deployment exists and its Pod is Running in kube-system, read its logs for errors such as kubelet certificate verification failures, and confirm `kubectl get apiservice v1beta1.metrics.k8s.io` shows Available True."
   ],
   [
    "Node worker3 shows memory requests of 40 percent in describe node, but kubectl top shows 92 percent memory used, and Pods are being evicted. What is going on?",
    "Pods are using far more memory than they request, so the scheduler keeps placing work there while real memory runs out and the kubelet evicts Pods. Raise requests to match real usage (and set limits) so the scheduler's view matches reality."
   ]
  ],
  "tip": "kubectl top shows real usage; describe node shows requests and limits. Scheduling decisions are based on requests, so 'low usage but Pods won't schedule' is a requests problem.",
  "check": [
   [
    "Where would you look to see why the scheduler thinks a node is full?",
    "The Allocated resources section of `kubectl describe node`, which shows the sum of requests against allocatable."
   ],
   [
    "What does kubectl top depend on?",
    "A working metrics-server serving the metrics.k8s.io API."
   ],
   [
    "What is the difference between Capacity and Allocatable?",
    "Capacity is the machine's total; Allocatable is what remains for Pods after system and kubelet reservations."
   ]
  ]
 },
 {
  "t": "Container output streams: kubectl logs options, stdout/stderr vs log files, /var/log/pods and /var/log/containers, sidecar log streaming",
  "hook": "At Northgate Library Services, the old catalog search app has just been moved into Kubernetes, and by 9 a.m. it is throwing errors for patrons. Elena, the administrator on duty, runs `kubectl logs catalog-5f7` and gets back nothing. Not an error, just an empty screen. The developers insist the app logs every request; they can see the log file when they run it on their laptops. Meanwhile the Pod's restart count has climbed to 4. Elena has two puzzles at once: where is the app writing its logs, and why does a crashing container show no output when she asks for it?",
  "simple": "Programs can 'talk' in two main ways: they can print messages to the screen, or they can write them into a file. Kubernetes is built to collect the first kind. Whatever a container prints to its screen output (called stdout, and its error output, stderr) is saved on the machine, and `kubectl logs` shows it to you. If an app only writes to a file hidden inside its own container, kubectl cannot see it. The fix is a small helper container that sits next to the app, reads that file and prints it to the screen, so Kubernetes can collect it. It is like a translator who reads a letter out loud so everyone in the room can hear it.",
  "body": [
   "Kubernetes logging is built on one convention: containers should write their logs to standard output (stdout) and standard error (stderr). The container runtime captures both streams and writes them to files on the node, and `kubectl logs` asks the kubelet on that node to read those files back through the API server. This has a big consequence for the Certified Kubernetes Administrator (CKA) exam: anything an application writes to a file inside its own container filesystem is invisible to `kubectl logs`. An empty result usually means the app is logging somewhere else, not that it is silent.",
   "`kubectl logs` has a set of options you should be able to use without looking them up. `-c <container>` picks one container in a multi-container Pod; without it, kubectl uses the Pod's default container or tells you to choose. `--all-containers` shows all of them. `-p` or `--previous` shows the logs of the previous, terminated instance of a container. That flag is essential for CrashLoopBackOff, because the current instance has just started and may have printed nothing yet, while the instance that crashed holds the error you need. `-f` follows the stream live, `--tail=50` limits output to the last lines, `--since=15m` limits by time and `--timestamps` adds a time to each line. You can also select by label with `-l app=web`, or point at a controller with `deploy/web`, which picks one of its Pods.",
   "```bash\nkubectl logs web-6c9 -c app --tail=100\nkubectl logs web-6c9 --previous\nkubectl logs -l app=web --all-containers --since=1h\nkubectl logs deploy/web -f\nkubectl logs web-6c9 -c app > /opt/answers/web.log\n```",
   "Exam tasks often say 'save the logs of container X to a file'. Redirect with `>`, make sure you named the right container with `-c`, and check the file afterwards with `cat` or `wc -l`. If the task asks for lines matching a word, pipe through `grep` before redirecting.",
   "It helps to know where these logs live on the node. The kubelet and the runtime store them under `/var/log/pods/<namespace>_<pod-name>_<pod-uid>/<container-name>/`, with numbered files such as `0.log` and `1.log` for successive restarts of the container. A second directory, `/var/log/containers/`, holds symlinks named `<pod>_<namespace>_<container>-<container-id>.log` that point at those files. Node-level log collectors usually tail this second directory because every container's log is in one flat place. These files are rotated by the kubelet based on size and number of files, so very old output is eventually lost, and they are removed when the Pod is deleted. When the API server is down, reading these files directly or running `crictl logs` is how you see the control plane's own logs.",
   "Some applications can only write to files, perhaps because they are older software you cannot change. The standard answer is the streaming sidecar pattern. You add a second container to the Pod that mounts the same `emptyDir` volume as the application, so both see the same log directory. The sidecar simply runs `tail -F` on the file and writes it to its own stdout. Now `kubectl logs <pod> -c log-streamer` shows the application's messages, and any cluster log collector picks them up like any other container log.",
   "```yaml\nvolumes:\n- name: logs\n  emptyDir: {}\ncontainers:\n- name: app\n  image: legacy-app:1.0\n  volumeMounts: [{name: logs, mountPath: /var/log/app}]\n- name: log-streamer\n  image: busybox\n  args: [/bin/sh, -c, 'tail -n+1 -F /var/log/app/app.log']\n  volumeMounts: [{name: logs, mountPath: /var/log/app}]\n```",
   "A few details make this work reliably. Use `-F` rather than `-f` so `tail` keeps following when the file is rotated or created late. Use one streamer container per log file if the app writes several, for example an access log and an error log, so each stream stays separate and you can read them with different `-c` names. Kubernetes also supports native sidecar containers, declared in `initContainers` with `restartPolicy: Always`. They start before the main containers and keep running alongside them, which suits log shippers that must be ready before the app writes its first line. Either form is acceptable when a task simply asks you to make a file's contents visible through kubectl logs.",
   "To sum up the decision: if `kubectl logs` is empty, check whether you picked the right container and whether you need `--previous`; if the app writes to a file, add a sidecar; and if kubectl itself cannot reach the cluster, go to the node and read `/var/log/pods` or use `crictl logs`."
  ],
  "analogy": "Think of stdout as a loudspeaker in each container and the kubelet as a recorder that tapes every loudspeaker in the building. kubectl logs plays back the tape. An app that writes to a file is someone keeping a private diary in a closed room: the recorder hears nothing. A streaming sidecar is a colleague who reads the diary aloud into the loudspeaker. The analogy breaks slightly with --previous: the recorder keeps the tape of the last session even after the speaker has restarted, but not forever.",
  "terms": [
   [
    "stdout and stderr",
    "A process's standard output and standard error streams, which the container runtime captures as logs."
   ],
   [
    "kubectl logs --previous",
    "Shows logs from the last terminated instance of a container."
   ],
   [
    "/var/log/pods",
    "Node directory holding container log files organized by namespace, Pod name and UID."
   ],
   [
    "/var/log/containers",
    "Node directory of symlinks to container log files, commonly tailed by log agents."
   ],
   [
    "Streaming sidecar",
    "A helper container that reads an application's log file from a shared volume and writes it to stdout."
   ]
  ],
  "example": "A legacy app writes only to /var/log/app/app.log, so `kubectl logs` shows nothing. You add a busybox sidecar sharing an emptyDir at that path and running `tail -F` on the file. `kubectl logs legacy -c log-streamer` now shows the application's messages.",
  "mistakes": [
   [
    "Reading the current logs of a CrashLoopBackOff container and concluding it printed no error.",
    "The current instance has barely started. Use `kubectl logs <pod> --previous` to see the output of the instance that crashed."
   ],
   [
    "Expecting kubectl logs to show files the app writes inside the container.",
    "kubectl logs only shows stdout and stderr. Files need a sidecar or must be read with kubectl exec."
   ],
   [
    "Forgetting -c in a multi-container Pod and saving the wrong container's logs to the answer file.",
    "Always name the container the task asks for, and check the file contents afterwards."
   ],
   [
    "Assuming node log files are kept forever.",
    "The kubelet rotates them by size and count, and they are removed with the Pod, so logs are not a long-term archive."
   ]
  ],
  "tryit": [
   [
    "A Pod has containers app and proxy. A task asks you to save the last 50 lines of the app container's logs to /opt/answers/app.log. You run `kubectl logs web --tail=50 > /opt/answers/app.log` and kubectl prints a message about choosing a container. What went wrong and what is the right command?",
    "Without -c, kubectl used the default container or asked you to choose, so the file may contain the wrong container's output or be empty. Run `kubectl logs web -c app --tail=50 > /opt/answers/app.log` and cat the file to confirm."
   ],
   [
    "The API server is down and you need the scheduler's recent output. Where can you read it without kubectl?",
    "On the control plane node, read the files under /var/log/pods/kube-system_kube-scheduler-<node>_<uid>/kube-scheduler/ or follow the symlink in /var/log/containers, or use `crictl ps -a` and `crictl logs`."
   ]
  ],
  "tip": "For a CrashLoopBackOff, the useful output is almost always in `kubectl logs <pod> --previous`. For multi-container Pods, always specify -c.",
  "check": [
   [
    "Why can't kubectl logs show a log file an app writes inside its container?",
    "kubectl logs only returns what the container writes to stdout and stderr, which the runtime captures."
   ],
   [
    "How can you make such a file visible to kubectl logs without changing the app?",
    "Add a sidecar that shares the log directory through a volume and tails the file to its own stdout."
   ],
   [
    "What is in /var/log/containers?",
    "Symlinks to the container log files stored under /var/log/pods."
   ]
  ]
 },
 {
  "t": "Events: kubectl get events with field selectors and sorting",
  "hook": "It is 7:15 a.m. at Pinecrest Insurance, and Marcus finds a note from the night team: 'Several app Pods restarted around 3 a.m. No idea why.' The Pods look healthy now. He runs `kubectl get events -n claims` and is hit with two hundred lines of Scheduled, Pulled, Created and Started, in an order that does not seem to follow the clock at all. Somewhere in that pile is the reason the Pods restarted. He has a standup in ten minutes and needs one clear sentence for his manager. How do you cut two hundred lines of noise down to the five that matter?",
  "simple": "Kubernetes keeps a short diary of things that happen in the cluster. Each entry is called an event: 'Pod placed on a machine', 'image downloaded', 'health check failed', 'disk could not be attached'. Events are marked as Normal or Warning. They are very useful for finding out why something broke, but there are a lot of them, they are not shown in time order unless you ask, and they are thrown away after about an hour. So you learn two tricks: sort them by time, and filter them, for example showing only warnings or only entries about one Pod. It is like searching your email for messages from one sender, newest last, instead of scrolling through everything.",
  "body": [
   "Events are short records that Kubernetes components create when something notable happens. The scheduler records that it assigned a Pod to a node, the kubelet records that it pulled an image or that a probe failed, the attach and detach controller records that a volume could not be attached, and the node controller records that a node became NotReady. Events are often the fastest way to learn why something is not working, which is why the Certified Kubernetes Administrator (CKA) exam expects you to query them quickly. `kubectl describe` already shows the events for one object at the bottom of its output; `kubectl get events` lets you search across many objects.",
   "Every event has the same structure. Its `type` is either Normal or Warning. Its `reason` is a short CamelCase code such as Scheduled, Pulled, Created, Started, FailedScheduling, BackOff, Unhealthy, FailedMount or Killing. Its `message` is the human-readable explanation. The `involvedObject` identifies what the event is about, with kind, name and namespace. The event also records the component that reported it, a count of how many times it occurred, and timestamps for first and last occurrence. Events are namespaced objects stored in etcd, and they are kept only for a limited time, controlled by the API server's `--event-ttl` setting, which defaults to one hour. That makes them excellent for recent problems and useless for history.",
   "`kubectl get events` lists events in the current namespace, and `-A` lists all namespaces. The default order is not guaranteed to be chronological, which is what confused Marcus, so sort explicitly. Sorting by `.metadata.creationTimestamp` or by `.lastTimestamp` puts the newest events at the bottom, right above your prompt where you can read them. `-w` watches for new events as they arrive, which is handy while you reproduce a problem in another terminal.",
   "```bash\nkubectl get events -n app --sort-by=.metadata.creationTimestamp\nkubectl get events -A --field-selector type=Warning\nkubectl get events -n app --field-selector involvedObject.name=web-6c9\nkubectl get events -A --field-selector reason=FailedScheduling\nkubectl get events -n app --field-selector involvedObject.kind=Node,type=Warning\n```",
   "Field selectors filter on the server side, so only matching events come back. For events, useful fields include `type`, `reason`, `involvedObject.kind`, `involvedObject.name` and `involvedObject.namespace`. Combine several with commas, which means all conditions must be true (a logical AND). Use `!=` to exclude, for example `type!=Normal`. Field selectors differ from label selectors in an important way: you can only use the specific fields each resource type supports, and an unsupported field gives an error. Events happen to support a useful set, which is why they are such a good fit for field selectors.",
   "Sorting and filtering combine naturally. `kubectl get events -n claims --field-selector type=Warning --sort-by=.lastTimestamp` would have given Marcus a short, time-ordered list of warnings. Reading such a list is a skill of its own: look for a sequence. For example, a run of Unhealthy events from a liveness probe followed by Killing events on the same container tells you the kubelet restarted the container because its liveness probe failed. FailedMount followed by a long gap points to storage. BackOff with a pull-related message points to an image name or registry problem.",
   "Newer kubectl versions also include a dedicated `kubectl events` command. It sorts chronologically by default and has convenient flags such as `--for pod/web-6c9` to show events for one object and `--types=Warning` to filter by type. Both approaches are valid in the exam; use whichever you can type correctly under pressure.",
   "```bash\nkubectl events -n app --for pod/web-6c9\nkubectl events -A --types=Warning\n```",
   "It also helps to know which reasons point where, because the same handful appear in most exam scenarios. FailedScheduling comes from the scheduler and means no node fits the Pod. ErrImagePull and BackOff with a pull message come from the kubelet and mean the image name, tag or registry access is wrong. Unhealthy means a liveness, readiness or startup probe failed, and Killing means the kubelet stopped a container, often right after a liveness failure. FailedMount and FailedAttachVolume point to storage, and FailedCreatePodSandBox points to the network plugin on that node. NodeNotReady on a Node object tells you the kubelet stopped reporting. Recognizing the reason at a glance tells you which component to question next, which saves minutes in a timed exam.",
   "Events also appear in exam answers. A task might ask you to write all Warning events in a namespace, sorted by time, to a file. Redirect the sorted, filtered output with `>` and `cat` the file to check it. And remember the time limit: if you are investigating something that happened many hours ago, the events will already be gone, and you need container logs or a log system instead."
  ],
  "analogy": "Events are like the notifications on your phone's lock screen: short, timestamped, from many different apps, and cleared automatically after a while. Scrolling them all is slow; filtering by app (a field selector on involvedObject or reason) and showing only alerts (type=Warning) gets you to the point. The analogy stops at ordering: your phone sorts by time automatically, while kubectl get events does not unless you add --sort-by.",
  "terms": [
   [
    "Event",
    "A namespaced record of something that happened to an object, with type, reason and message."
   ],
   [
    "involvedObject",
    "The object an event refers to; a common field-selector target."
   ],
   [
    "--field-selector",
    "Server-side filtering on supported object fields such as type or reason."
   ],
   [
    "--sort-by",
    "Sorts kubectl output by a JSONPath field, such as .metadata.creationTimestamp."
   ],
   [
    "Event TTL",
    "How long the API server keeps events before deleting them, one hour by default."
   ]
  ],
  "example": "Several Pods restarted overnight. `kubectl get events -n app --field-selector type=Warning --sort-by=.lastTimestamp` shows a series of Unhealthy events for liveness probes followed by Killing events on the same containers, pointing to a probe that is too aggressive.",
  "mistakes": [
   [
    "Assuming kubectl get events lists events in time order.",
    "The order is not guaranteed. Add --sort-by=.metadata.creationTimestamp or .lastTimestamp, or use kubectl events."
   ],
   [
    "Expecting events from yesterday to still be there.",
    "Events expire after the API server's event TTL, one hour by default. Use logs for older problems."
   ],
   [
    "Using a label selector (-l) to find events about a Pod.",
    "Events are linked to objects through involvedObject fields, so use --field-selector involvedObject.name=<pod>."
   ],
   [
    "Thinking commas in a field selector mean OR.",
    "Commas combine conditions with AND; every condition must match."
   ]
  ],
  "tryit": [
   [
    "A task says: 'Write all Warning events in namespace shop, oldest first, to /opt/answers/warn.txt.' What single command do you run, and how do you verify it?",
    "`kubectl get events -n shop --field-selector type=Warning --sort-by=.metadata.creationTimestamp > /opt/answers/warn.txt`, then `cat /opt/answers/warn.txt` to confirm it contains only Warning events in order."
   ],
   [
    "You want to see only events about node worker2 that are not Normal, across the cluster. What field selector do you use?",
    "`kubectl get events -A --field-selector involvedObject.kind=Node,involvedObject.name=worker2,type!=Normal`. The commas combine the conditions with AND."
   ]
  ],
  "tip": "Events are not sorted by time by default and expire after about an hour; add --sort-by and filter with --field-selector type=Warning to cut the noise quickly.",
  "check": [
   [
    "How do you list only Warning events across all namespaces?",
    "`kubectl get events -A --field-selector type=Warning`."
   ],
   [
    "Why might events for a problem from yesterday be missing?",
    "Events are retained only for a limited time, one hour by default."
   ],
   [
    "How do you show events for one Pod named web-6c9?",
    "`kubectl get events --field-selector involvedObject.name=web-6c9` or `kubectl events --for pod/web-6c9`."
   ]
  ]
 },
 {
  "t": "Service and networking problems: selectors, readiness and EndpointSlices, kube-proxy, cross-node CNI traffic, sandbox network errors",
  "hook": "At Bayview Credit Union, the online banking front end suddenly shows 'Service unavailable' for about a third of customers. Aisha, the platform engineer on call, checks the obvious things: the backend Pods are Running, the Service exists, nobody changed the code. Requests from some front-end Pods succeed instantly, while others time out. A colleague suggests restarting everything. Aisha resists, because restarting would erase the evidence. She knows a request travels through several hops between a client Pod and a backend Pod, and that only one of them is broken. Which hop is it, and how can she find it without guessing?",
  "simple": "When one app in Kubernetes talks to another, the message takes a route with several stops. First the app looks up a name. Then it reaches a Service, which is like a front desk phone number that forwards calls to one of several workers. The Service needs a list of workers that are ready to take calls. Each machine has a helper (kube-proxy) that sets up the forwarding, and a network plugin carries the message between machines. If any stop is broken, the call fails. Troubleshooting is like tracing a lost package: check each stop on the route in order, and the one where the package stops moving is the problem.",
  "body": [
   "Network problems in Kubernetes feel mysterious until you follow the path a request takes. A client Pod looks up a name in the Domain Name System (DNS), gets the Service's virtual IP, and sends traffic to it. Rules programmed by kube-proxy on the client's node translate that virtual IP to one backend Pod IP chosen from the Service's EndpointSlices. The Container Network Interface (CNI) plugin then carries the packet to the backend, possibly on another node. Check each hop in order, and the faulty one usually becomes obvious. This lesson covers everything after DNS; DNS has its own lesson.",
   "Start with the Service and its endpoints, because an empty endpoint list is the most common fault. `kubectl get endpointslices -l kubernetes.io/service-name=web` should list backend IPs, and `kubectl describe svc web` shows them on its Endpoints line. If the list is empty, compare the Service's selector with the Pods' labels: `kubectl get svc web -o jsonpath='{.spec.selector}'` against `kubectl get pods --show-labels`. A single typo, such as `app: web` in the Service and `app: webapp` on the Pods, leaves the Service with no backends and every request fails. If the Pods do match but appear in the EndpointSlice as not ready, their readiness probe is failing; `kubectl describe pod` shows the probe errors in its events. Kubernetes deliberately withholds traffic from Pods that are not ready, so this is the system working as designed, and the fix is the probe or the application.",
   "Next check ports. The Service's `port` is what clients connect to, and its `targetPort` must match the port the container actually listens on. If `targetPort` is wrong, endpoints exist but connections are refused. A good test is to bypass the Service: start a temporary Pod with `kubectl run tmp --rm -it --image=busybox --restart=Never -- sh` and try `wget -qO- <pod-ip>:<container-port>`. If the Pod IP works but the Service name or ClusterIP does not, the problem is in the Service definition or in kube-proxy. If the Pod IP fails too, the problem is the application or the network.",
   "If Services fail only from certain nodes, look at kube-proxy on those nodes. It runs as a DaemonSet, so there should be one Pod per node: `kubectl get pods -n kube-system -o wide -l k8s-app=kube-proxy`. Read the logs of the Pod on the failing node. A crashing kube-proxy, a broken kube-proxy ConfigMap, or missing kernel support for the chosen proxy mode leaves that node without Service rules, so Pods on that node cannot reach any ClusterIP while Pods elsewhere work fine. That pattern, failures that follow the client's node, matches Aisha's situation.",
   "```bash\nkubectl describe svc web\nkubectl get endpointslices -l kubernetes.io/service-name=web -o wide\nkubectl get pods -l app=web -o wide\nkubectl logs -n kube-system -l k8s-app=kube-proxy --tail=20\nkubectl get pods -n kube-system -o wide | grep -Ei 'calico|cilium|flannel'\n```",
   "Cross-node problems point to the CNI. If Pods on the same node can reach each other but Pods on different nodes cannot, the overlay or routing between nodes is broken. Typical causes are a CNI agent Pod that is down on one node, a firewall between nodes that blocks the encapsulation or routing protocol the CNI uses (for example Flannel's VXLAN traffic over UDP, or Calico's Border Gateway Protocol (BGP) sessions on TCP port 179), or a Pod network CIDR that overlaps the node network so packets are routed to the wrong place. Testing Pod-IP-to-Pod-IP between two specific nodes, using `-o wide` to see where each Pod runs, isolates this quickly.",
   "Finally, sandbox errors appear before containers even start. Every Pod first gets a sandbox: a network namespace held open by a small pause container, wired up by the CNI plugin. If Pods stay in ContainerCreating with events such as 'Failed to create pod sandbox' and a message that the network plugin is not ready or failed to set up the network, the CNI on that node is not working. Check that `/etc/cni/net.d/` contains a configuration file, that `/opt/cni/bin/` has the plugin binaries, that the CNI agent Pod on that node is running, and whether the plugin has run out of IP addresses in the node's Pod range. A node whose CNI is not installed at all is also reported as NotReady, with a condition message about the network plugin.",
   "Put together, the path gives you a quick decision table. No endpoints means a selector or readiness problem. Endpoints present but connection refused means targetPort or the application. Works from some nodes but not others means kube-proxy on the failing nodes. Same-node traffic works but cross-node traffic does not means the CNI's inter-node network. Pods stuck in ContainerCreating with sandbox errors means the CNI on that node."
  ],
  "analogy": "A Service is like a company's main phone number. The receptionist (kube-proxy, one per building) forwards each call to an employee on the staff list (the EndpointSlice), but only employees marked as available (ready). The phone lines between buildings are the CNI. If the staff list is empty, every call fails; if one building's receptionist is out, only calls from that building fail; if the lines between buildings are cut, calls work within a building but not across. The analogy stops at kube-proxy: it does not handle each call itself, it programs forwarding rules in advance.",
  "mnemonic": "Trace a Service request with 'Some People Prefer Coffee': Selector and readiness (endpoints), Port (targetPort), Proxy (kube-proxy on the client's node), CNI (cross-node network and sandboxes).",
  "terms": [
   [
    "EndpointSlice",
    "An object listing the IPs, ports and readiness of a Service's backend Pods."
   ],
   [
    "Empty EndpointSlice",
    "A Service with no backends, usually from a selector mismatch or unready Pods."
   ],
   [
    "Readiness probe",
    "A check that decides whether a Pod receives Service traffic."
   ],
   [
    "targetPort",
    "The container port a Service forwards traffic to; it must match where the app listens."
   ],
   [
    "Pod sandbox",
    "The Pod's network namespace and pause container, set up via the CNI before containers start."
   ]
  ],
  "example": "Service api returns connection refused. Its EndpointSlice lists three ready Pod IPs on port 80, but the containers listen on 8080. Changing the Service's targetPort to 8080 fixes it, which a direct test to PodIP:8080 had already hinted at.",
  "mistakes": [
   [
    "Restarting kube-proxy when the Service has no endpoints.",
    "kube-proxy can only forward to endpoints that exist. An empty EndpointSlice means a selector mismatch or unready Pods; fix those first."
   ],
   [
    "Assuming a Pod not in the endpoints is a bug.",
    "Unready Pods are withheld on purpose. Check the readiness probe and the application."
   ],
   [
    "Setting the Service port to the container port and leaving targetPort wrong.",
    "Clients use port; the container must listen on targetPort. A wrong targetPort gives connection refused even with endpoints."
   ],
   [
    "Blaming the CNI for every connectivity failure.",
    "CNI problems show a pattern: cross-node failures or sandbox errors. Same-node failures with empty endpoints are Service configuration problems."
   ]
  ],
  "tryit": [
   [
    "Pods on worker1 can reach Service orders by name and ClusterIP. Pods on worker2 cannot reach any ClusterIP, though they can reach other Pods directly by Pod IP. What do you check first?",
    "kube-proxy on worker2. Direct Pod IP traffic works, so the CNI is fine, but Service rules are missing on that node. Find its kube-proxy Pod with `kubectl get pods -n kube-system -o wide -l k8s-app=kube-proxy` and read its logs."
   ],
   [
    "A new Deployment's Pods all sit in ContainerCreating on worker3 with 'Failed to create pod sandbox: network plugin not ready'. Pods on other nodes are fine. What do you inspect on worker3?",
    "The CNI on worker3: the CNI agent Pod on that node, the config in /etc/cni/net.d/, the binaries in /opt/cni/bin/, and whether the node's Pod IP range is exhausted."
   ]
  ],
  "tip": "Empty endpoints means selector or readiness; endpoints present but refused means targetPort or the app; works on one node but not another means kube-proxy or the CNI on that node.",
  "check": [
   [
    "What is the first thing to check when a Service has no endpoints?",
    "Whether its selector matches the labels of Ready Pods."
   ],
   [
    "Pods on the same node can talk, but not across nodes. What is the likely culprit?",
    "The CNI's inter-node networking: a failing agent, blocked overlay or routing traffic, or overlapping CIDRs."
   ],
   [
    "How do you tell whether a problem is in the Service or the application?",
    "Test the Pod IP and container port directly from a temporary Pod; if that works but the Service does not, the Service or kube-proxy is at fault."
   ]
  ]
 },
 {
  "t": "DNS problems: CoreDNS Pods and logs, loop detection with systemd-resolved, testing with a temporary Pod",
  "hook": "At Summit Outdoor Gear, the warehouse team rebuilt a worker node overnight. By morning the order service is logging 'no such host: inventory.shop.svc.cluster.local' every few seconds, and checkout is failing for some customers. Sam, the administrator on duty, runs `kubectl get pods -n kube-system` and sees one CoreDNS Pod in CrashLoopBackOff with eleven restarts. The other one is fine but overloaded. Nobody touched CoreDNS. Nobody changed its configuration. So why would a perfectly ordinary node rebuild make the cluster's name service crash over and over?",
  "simple": "Apps find each other by name, like 'inventory', the way you find a friend by name in your phone's contacts. In Kubernetes, a program called CoreDNS is the contacts list: you give it a name, it gives back an address. If CoreDNS is broken, apps cannot find each other even though they are all running. To troubleshoot, you start a small throwaway Pod and ask it to look up a name. Then you check whether CoreDNS is running and read its messages. One famous problem is a loop: CoreDNS is told to ask a helper for unknown names, but the 'helper' turns out to be itself, so the question goes round and round. CoreDNS notices and shuts itself down rather than spin forever.",
  "body": [
   "When applications report errors such as 'could not resolve host' or 'no such host', the cause is usually one of a small set: CoreDNS is not running, its Service has no endpoints, its configuration is wrong, a NetworkPolicy blocks port 53, or the Pod's own DNS settings are unusual. The Certified Kubernetes Administrator (CKA) exam rewards working through these in order rather than guessing, so treat this lesson as a checklist.",
   "First, reproduce the problem from a temporary Pod, because that tells you whether DNS is broken for everyone or only for one application. `kubectl run dns --rm -it --restart=Never --image=busybox -- nslookup kubernetes.default` should return the ClusterIP of the `kubernetes` Service in the default namespace. Then try the failing name, both the short form and the fully qualified domain name, such as `api.shop.svc.cluster.local`, and also an external name to test upstream forwarding. Inspect the Pod's `/etc/resolv.conf` with `cat`: it should list the kube-dns Service IP as the nameserver, the cluster search domains such as `<namespace>.svc.cluster.local svc.cluster.local cluster.local`, and `options ndots:5`. If the fully qualified name works but the short one does not, look at the search list and the namespace you are querying from.",
   "Next, check CoreDNS itself. Its Pods run as a Deployment in kube-system and carry the label `k8s-app=kube-dns`, a name kept for compatibility with the older kube-dns add-on. The Service is also still called `kube-dns`.",
   "```bash\nkubectl get pods -n kube-system -l k8s-app=kube-dns -o wide\nkubectl logs -n kube-system -l k8s-app=kube-dns --tail=30\nkubectl get svc kube-dns -n kube-system\nkubectl get endpointslices -n kube-system -l kubernetes.io/service-name=kube-dns\nkubectl get cm coredns -n kube-system -o yaml\n```",
   "Read the results like this. If the CoreDNS Pods are Pending right after a cluster was created, no CNI plugin is installed yet, so the Pods cannot get network sandboxes. If they are Running but the Service has no endpoints, look at readiness and at the Service's selector. If the logs show errors, read the Corefile in the `coredns` ConfigMap; a typo or a bad `forward` target is common after someone edits it. CoreDNS uses the `reload` plugin to pick up ConfigMap changes automatically after a short delay, or you can run `kubectl rollout restart deployment coredns -n kube-system` to apply them immediately.",
   "A well-known failure is a forwarding loop. The CoreDNS `loop` plugin sends a probe query at startup. If that query comes back to CoreDNS itself, it logs a message that a loop was detected and exits, so the Pods go into CrashLoopBackOff. The typical cause is systemd-resolved on the node. On such hosts, the node's `/etc/resolv.conf` points to a local stub resolver at `127.0.0.53`. The kubelet hands that file to CoreDNS as its resolv.conf, and the default Corefile line `forward . /etc/resolv.conf` then sends unknown queries to 127.0.0.53. Inside the CoreDNS Pod, that address is the Pod's own loopback, not the node's resolver, so the query arrives back at CoreDNS. That is exactly what Sam's rebuilt node produced.",
   "The fix is to give the kubelet the real upstream resolver list instead of the stub. On systemd-resolved hosts that file is usually `/run/systemd/resolve/resolv.conf`. Set `resolvConf` to that path in the kubelet configuration file, `/var/lib/kubelet/config.yaml` on kubeadm clusters, restart the kubelet with `systemctl restart kubelet`, and then delete or restart the CoreDNS Pods so they pick up the corrected file. kubeadm normally detects systemd-resolved and sets this for you, so the problem usually appears when someone changed it or a node was built by hand. An alternative is to point `forward` at explicit upstream resolver IPs in the Corefile. Removing the loop plugin only hides the symptom: CoreDNS would stay up but every external lookup would still loop and fail.",
   "```bash\ngrep resolvConf /var/lib/kubelet/config.yaml\ncat /run/systemd/resolve/resolv.conf\nsudo systemctl restart kubelet\nkubectl rollout restart deployment coredns -n kube-system\n```",
   "Two other checks finish the list. If a namespace has an egress NetworkPolicy, it must explicitly allow traffic to the CoreDNS Pods on both UDP and TCP port 53, or every lookup from that namespace times out while Pods elsewhere resolve fine. And a Pod's `dnsPolicy` matters: the default for Pods is `ClusterFirst`, which uses CoreDNS. A Pod with `dnsPolicy: Default` inherits the node's resolver settings instead and will not resolve cluster names by design, and a Pod with `hostNetwork: true` needs `dnsPolicy: ClusterFirstWithHostNet` to use cluster DNS."
  ],
  "analogy": "Imagine a receptionist who is told, 'If you do not know a number, call the main operator.' Normally the operator is in another building. But on a rebuilt node, the instruction sheet says 'call extension 53 on this floor', and on this floor extension 53 is the receptionist's own desk phone. Each unknown call rings straight back to the receptionist. CoreDNS's loop plugin is the receptionist noticing and walking out rather than answering their own calls forever. The analogy ends here: the real fix is a better instruction sheet (the kubelet's resolvConf), not removing the receptionist's ability to notice.",
  "terms": [
   [
    "CoreDNS",
    "The cluster DNS server that answers name lookups for Services and Pods and forwards other queries upstream."
   ],
   [
    "loop plugin",
    "CoreDNS plugin that detects forwarding loops and stops CoreDNS if one is found."
   ],
   [
    "systemd-resolved stub",
    "A local resolver at 127.0.0.53 that causes loops if CoreDNS forwards to it."
   ],
   [
    "resolvConf",
    "Kubelet setting naming the resolv.conf file passed to Pods using the Default policy and to CoreDNS."
   ],
   [
    "k8s-app=kube-dns",
    "The label selecting CoreDNS Pods and the kube-dns Service's backends."
   ]
  ],
  "example": "After a node rebuild, CoreDNS Pods on that node crash, and their logs report a loop detected for the root zone. The kubelet config's resolvConf had been changed to /etc/resolv.conf, which points at 127.0.0.53. Setting it back to /run/systemd/resolve/resolv.conf, restarting the kubelet and deleting the CoreDNS Pods fixes resolution.",
  "mistakes": [
   [
    "Removing the loop plugin from the Corefile to stop the crashes.",
    "That hides the symptom but queries still loop and fail. Fix the kubelet's resolvConf or forward to real upstream IPs."
   ],
   [
    "Searching for Pods labelled app=coredns.",
    "CoreDNS Pods use the label k8s-app=kube-dns, and the Service is named kube-dns, for compatibility."
   ],
   [
    "Allowing only UDP port 53 in an egress NetworkPolicy.",
    "DNS also uses TCP, for example for large responses. Allow both UDP and TCP port 53 to the CoreDNS Pods."
   ],
   [
    "Expecting a hostNetwork Pod to resolve Service names by default.",
    "It needs dnsPolicy: ClusterFirstWithHostNet; otherwise it uses the node's resolver."
   ]
  ],
  "tryit": [
   [
    "From a temporary busybox Pod in namespace shop, `nslookup kubernetes.default` works, but lookups from Pods in namespace billing all time out. CoreDNS is healthy. What do you check?",
    "Look for an egress NetworkPolicy in billing that does not allow UDP and TCP port 53 to the CoreDNS Pods in kube-system. DNS works elsewhere, so CoreDNS itself is fine."
   ],
   [
    "CoreDNS Pods are Running, but `kubectl get endpointslices -n kube-system -l kubernetes.io/service-name=kube-dns` shows no ready endpoints, and lookups fail. What is the next step?",
    "Describe the CoreDNS Pods to see why they are not ready, such as a failing readiness probe from a Corefile error, and read their logs; also confirm the kube-dns Service selector still matches k8s-app=kube-dns."
   ]
  ],
  "tip": "CoreDNS in CrashLoopBackOff with a 'Loop detected' log line is the systemd-resolved stub problem; fix the kubelet's resolvConf or the forward target, not the loop plugin.",
  "check": [
   [
    "What label finds the CoreDNS Pods?",
    "k8s-app=kube-dns in the kube-system namespace."
   ],
   [
    "Why does forwarding to 127.0.0.53 cause a loop inside CoreDNS?",
    "Inside the CoreDNS Pod, 127.0.0.53 is local to the Pod, so queries go back to CoreDNS itself instead of the node's resolver."
   ],
   [
    "What should a normal Pod's /etc/resolv.conf contain?",
    "The kube-dns Service IP as nameserver, the cluster search domains and options ndots:5."
   ]
  ]
 },
 {
  "t": "Cluster access problems: kubeconfig contexts, expired certificates, connection refused on 6443",
  "hook": "Rosa runs the training lab at Fairview Technical College. Exactly one year after she built the lab cluster with kubeadm, her first command of the morning fails: 'Unable to connect to the server: x509: certificate has expired or is not yet valid.' Twenty students arrive in an hour. Her teaching assistant tries from his laptop and gets a different error, 'connection refused', because his kubeconfig still points to the old IP of a control plane node that was replaced in the spring. Two people, two errors, one cluster. Which error is about which layer, and what does Rosa fix first?",
  "simple": "To talk to a Kubernetes cluster, the kubectl tool reads a settings file called a kubeconfig. It is like a keyring: each entry says which cluster (the address), which user (your ID card) and an optional default folder (namespace). A context is a saved combination of these. If kubectl uses the wrong context, you work on the wrong cluster. When access fails, the error message tells you which part broke. 'Connection refused' means nobody answered at that address. 'Certificate expired' means an ID card is out of date. 'Unauthorized' means the cluster does not accept your ID. 'Forbidden' means it knows who you are but you are not allowed to do that action. Each one has a different fix.",
  "body": [
   "Before you can fix anything, you need to reach the right cluster. The Certified Kubernetes Administrator (CKA) exam uses several clusters, and each task tells you which context to use. Access problems are also a troubleshooting topic in their own right, and the error messages are precise enough that you can usually tell exactly which layer failed without guessing.",
   "kubectl finds its configuration in one of three places: the file given with `--kubeconfig`, the files listed in the `KUBECONFIG` environment variable (merged together), or `~/.kube/config` by default. A kubeconfig contains three lists, clusters (an API server address plus the certificate authority (CA) data used to trust it), users (credentials such as a client certificate and key, or a token) and contexts (each one a named combination of a cluster, a user and optionally a default namespace), plus a `current-context` that kubectl uses when you do not specify one.",
   "```bash\nkubectl config get-contexts\nkubectl config current-context\nkubectl config use-context prod-admin@prod\nkubectl config set-context --current --namespace=app\nkubectl config view --minify          # only the active context\nkubectl --kubeconfig /etc/kubernetes/admin.conf get nodes\n```",
   "In the exam, run the `use-context` command given at the top of each task before anything else, even if you think you are already on that cluster. Working on the wrong cluster is one of the easiest ways to lose points, because a perfectly correct answer ends up somewhere the grader does not look. Setting a default namespace with `set-context --current --namespace` saves typing, but remember you changed it.",
   "The error messages map neatly to layers. 'connection refused' on port 6443 means nothing is listening at that address. Either the API server is down, the kubeconfig has the wrong host or port, or you are on a machine that cannot reach it. Check the `server:` line of the active cluster with `kubectl config view --minify`. Then, on the control plane node, use `crictl ps -a | grep kube-apiserver` and its logs, or `ss -tlnp | grep 6443` to see whether any process listens on that port. A timeout rather than a refusal usually suggests a firewall in the way or an IP address where no machine answers.",
   "'x509: certificate has expired or is not yet valid' means a certificate in the chain is outside its validity period. If only your client certificate in the kubeconfig expired, you need a new kubeconfig. If the API server's own certificates expired, every client fails. kubeadm issues most cluster certificates with a one-year lifetime, and upgrading the cluster with kubeadm renews them, so a lab cluster that was never upgraded is the classic victim. On kubeadm clusters, run `kubeadm certs check-expiration` to see each certificate's expiry, then `kubeadm certs renew all`. Renewal writes new files but running components do not reload them by themselves, so restart the control plane static Pods, for example by moving their manifests out of `/etc/kubernetes/manifests` and back after the kubelet has stopped them. Finally copy the refreshed `/etc/kubernetes/admin.conf` to `~/.kube/config`, because it embeds a renewed client certificate. The 'not yet valid' variant can also mean the node's clock is wrong, so check the time as well.",
   "```bash\nsudo kubeadm certs check-expiration\nsudo kubeadm certs renew all\nsudo cp /etc/kubernetes/admin.conf ~/.kube/config\nkubectl get nodes\n```",
   "A different x509 message, 'certificate signed by unknown authority', means the CA data in your kubeconfig does not match the CA that signed the API server's certificate. The usual cause is a kubeconfig copied from another cluster, or a cluster rebuilt with a new CA while old kubeconfigs remain in use. The fix is a kubeconfig with the correct CA data for that cluster.",
   "Finally, distinguish the two authentication and authorization failures. 'Unauthorized', an HTTP 401 response, is an authentication failure: the server does not accept your credentials at all, for example a revoked or malformed token, or a client certificate signed by a different CA. 'Forbidden', an HTTP 403 response, is an authorization failure: the server knows exactly who you are, but role-based access control (RBAC) does not permit the action. The error message names the user, verb and resource, which is your starting point. For Forbidden, inspect roles and bindings and test with `kubectl auth can-i <verb> <resource> --as <user>`. For Unauthorized, look at the credentials in the kubeconfig, not at RBAC."
  ],
  "analogy": "Reaching the API server is like entering a secure office building. 'Connection refused' is a locked door with nobody behind it, or you went to the wrong address. An expired certificate is a badge past its date, or the building's own badge reader showing an expired license. 'Unknown authority' is a badge issued by a different company. 'Unauthorized' is the guard not accepting your badge at all. 'Forbidden' is the guard recognizing you but your badge not opening that floor. The analogy holds well; just remember a kubeconfig can hold badges for several buildings, and the context picks which one you use.",
  "terms": [
   [
    "Context",
    "A kubeconfig entry combining a cluster, a user and an optional namespace."
   ],
   [
    "KUBECONFIG",
    "Environment variable listing kubeconfig files for kubectl to merge."
   ],
   [
    "kubectl config view --minify",
    "Shows only the configuration of the current context, including its server address."
   ],
   [
    "Unauthorized vs Forbidden",
    "401 means authentication failed; 403 means authenticated but not permitted by RBAC."
   ],
   [
    "kubeadm certs renew",
    "Command that renews kubeadm-managed certificates, including those embedded in kubeconfigs."
   ]
  ],
  "example": "One morning every kubectl command fails with an x509 expired error on a lab cluster built a year ago and never upgraded. `kubeadm certs check-expiration` shows everything expired yesterday. You run `kubeadm certs renew all`, restart the control plane Pods by moving the manifests out and back, copy admin.conf to ~/.kube/config and access returns.",
  "mistakes": [
   [
    "Skipping the use-context command because you think you are already on the right cluster.",
    "Tasks are graded on the cluster named in the task. Run the given use-context command every time."
   ],
   [
    "Debugging RBAC roles when the error says Unauthorized.",
    "Unauthorized (401) means the credentials were rejected. Check the kubeconfig's token or certificate; RBAC applies only after authentication succeeds."
   ],
   [
    "Running kubeadm certs renew all and expecting access to return immediately.",
    "Control plane components must be restarted to load the new certificates, and the admin kubeconfig must be copied again."
   ],
   [
    "Treating connection refused as a certificate problem.",
    "Refused means nothing is listening at that address. Check the server line and whether the API server is running."
   ]
  ],
  "tryit": [
   [
    "A colleague says, 'kubectl get pods says Forbidden: User jane cannot list resource pods in namespace dev.' She asks you to regenerate her certificate. Is that the right fix?",
    "No. Forbidden means authentication worked and the cluster knows she is jane; RBAC denies the action. Check with `kubectl auth can-i list pods -n dev --as jane` and add or fix a Role and RoleBinding if she should have access."
   ],
   [
    "After copying a kubeconfig from the staging cluster's jump host to production, kubectl reports 'x509: certificate signed by unknown authority'. What is wrong?",
    "The kubeconfig's CA data belongs to the staging cluster, so kubectl cannot trust production's API server certificate. Use a kubeconfig generated for production, such as one built from its admin.conf."
   ]
  ],
  "tip": "Refused means nothing is listening (API server down or wrong address); x509 means certificates; Unauthorized means credentials; Forbidden means RBAC. The error tells you which layer to fix.",
  "check": [
   [
    "How do you see only the details of the currently active context?",
    "`kubectl config view --minify`."
   ],
   [
    "What is the difference between an Unauthorized and a Forbidden response?",
    "Unauthorized is failed authentication; Forbidden means the identity is known but RBAC denies the action."
   ],
   [
    "Which command lists the expiry dates of kubeadm-managed certificates?",
    "`kubeadm certs check-expiration`."
   ]
  ]
 },
 {
  "t": "Output handling for tasks: -o jsonpath, custom-columns, --sort-by, writing answers to files",
  "hook": "Dev is ninety minutes into a practice CKA session at Oakridge Community College's study group. The task reads: 'Write the names of all nodes and their InternalIP addresses, one pair per line, to /opt/answers/nodes.txt.' He runs `kubectl get nodes -o wide`, copies the output into the file by hand, trims a few columns and moves on. At the end, the grader marks it wrong. The IPs were right. The names were right. But the file had a header row and extra columns he forgot to delete. How do you make kubectl print exactly the answer, nothing more, so the grader cannot disagree?",
  "simple": "Many exam tasks ask you to save an answer in a file, and a computer checks that file. It wants exactly what was asked, like a name or a short list, with nothing extra. Instead of copying and editing output by hand, you can tell kubectl to print only the parts you want. Behind the scenes, every Kubernetes object is a structured document, like a form with fields and sub-fields. Options such as jsonpath and custom-columns let you point to the exact fields to print, a bit like telling a librarian 'just give me the title and author of every book on this shelf', instead of carrying the whole shelf home.",
  "body": [
   "Many Certified Kubernetes Administrator (CKA) tasks end with 'write the result to /opt/answers/...'. The grader reads that file, so its content must be exactly what was asked, often a name, a list or a number. kubectl's output options let you extract precisely the right data without editing by hand, which is faster and removes a whole class of small mistakes.",
   "Start with JSONPath, a small query language for picking fields out of the JSON representation of objects. First look at the structure with `kubectl get pod web -o json` or `-o yaml`, so you know the real field names and nesting. Then write a path beginning at the root, written as a leading dot. When you get a list of objects, the objects live under `.items`, and `.items[*]` means 'every item'. The `range` and `end` keywords loop over a list so you can print one item per line, adding a newline with `{\"\\n\"}` or a tab with `{\"\\t\"}`. Filters written as `?(@.field==\"value\")` select array elements by a condition, which is how you pick the InternalIP out of a node's list of addresses.",
   "```bash\nkubectl get pods -o jsonpath='{.items[*].metadata.name}'\nkubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.status.nodeInfo.kubeletVersion}{\"\\n\"}{end}'\nkubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type==\"InternalIP\")].address}'\nkubectl get secret db -o jsonpath='{.data.password}' | base64 -d\n```",
   "Notice the difference between the first two commands. `.items[*].metadata.name` prints all names on one line separated by spaces, while the `range` form prints one per line. Tasks often care which one you use, so read the wording carefully. The last command shows another common need: Secret values are base64-encoded, so you extract the field and pipe it through `base64 -d` to get the readable value.",
   "Custom columns are the second tool. They produce a table with headings you choose, each column defined as `NAME:<path>` where the path is JSONPath without the surrounding braces. Add `--no-headers` if the task wants only the values. Custom columns are often easier than jsonpath when you need several fields per object, because you do not have to manage tabs and newlines yourself.",
   "```bash\nkubectl get pods -A -o custom-columns=NS:.metadata.namespace,NAME:.metadata.name,NODE:.spec.nodeName\nkubectl get pv --sort-by=.spec.capacity.storage\nkubectl get pods --sort-by=.metadata.creationTimestamp -o name\nkubectl get pods -A --sort-by='.status.containerStatuses[0].restartCount'\n```",
   "Sorting is the third tool. `--sort-by` takes a JSONPath expression (the braces are optional) and sorts in ascending order. Combine it with `tail -1` to pick the newest, largest or most restarted object, or with `head -1` for the oldest or smallest. Two related output modes are worth knowing: `-o name` prints identifiers such as `pod/web-6c9`, including the resource type prefix, and `-o wide` adds columns such as Pod IP and node. Keep one exception in mind: `kubectl top` has its own `--sort-by` that accepts only `cpu` or `memory`, not a JSONPath.",
   "Writing the answer file is where points are won or lost. Use a plain redirect, `> /opt/answers/file.txt`, and then `cat` the file to confirm its contents. Check the details the task specifies: names only or a full table, one per line or space-separated, with or without headers, and with or without the `pod/` prefix that `-o name` adds. Create the directory with `mkdir -p` if it does not exist. Quoting matters too: wrap jsonpath expressions in single quotes so the shell does not interpret the braces, brackets, asterisks or double quotes inside them. A missing quote is the most common reason a correct-looking jsonpath returns an error.",
   "A worked example ties these together. Suppose a task asks for the name of the most recently created Pod in namespace web, with no prefix. You would run `kubectl get pods -n web --sort-by=.metadata.creationTimestamp --no-headers | tail -1 | awk '{print $1}' > /opt/answers/newest.txt` and then `cat /opt/answers/newest.txt`. Each part does one job: the sort puts the newest last, `--no-headers` stops the header row from becoming the answer when the list is short, `tail -1` keeps the last line, and `awk` keeps only the name column. Building commands from small, checkable pieces like this is easier than writing one perfect jsonpath under time pressure.",
   "When you are unsure of a field path, you do not need to leave the terminal. `kubectl explain pod.spec.containers --recursive` prints the whole field tree under a path, and `kubectl explain pod.status.containerStatuses` describes one level with its types. Combine that with a quick look at `-o yaml` for a real object, and you can build almost any query in a minute or two."
  ],
  "analogy": "An object's JSON is like a large filing cabinet: drawers (top-level fields), folders inside drawers, pages inside folders. JSONPath is a set of directions such as 'every drawer, folder metadata, page name'. range and end are you walking along the cabinets and reading one page aloud per cabinet. custom-columns is a pre-printed form with labeled columns you fill in from each cabinet. The analogy weakens with filters: ?() is like saying 'only the page whose type says InternalIP', which a real filing clerk would need extra instructions for.",
  "terms": [
   [
    "-o jsonpath",
    "Output mode that prints values selected by a JSONPath template."
   ],
   [
    "range ... end",
    "JSONPath construct for iterating over a list, commonly used to print one item per line."
   ],
   [
    "-o custom-columns",
    "Output mode that prints a table with user-defined column names and JSONPath values."
   ],
   [
    "--sort-by",
    "Sorts list output by a JSONPath field, in ascending order."
   ],
   [
    "-o name",
    "Output mode that prints resource identifiers such as pod/web-6c9."
   ]
  ],
  "example": "A task asks for the names of all nodes and their internal IPs, one pair per line, in /opt/answers/nodes.txt. You write a jsonpath range over .items printing the name, a tab and the InternalIP address filter, redirect it to the file, and cat it to confirm three lines.",
  "mistakes": [
   [
    "Copying kubectl table output into the answer file and editing it by hand.",
    "Manual edits leave headers or extra columns. Use jsonpath, custom-columns with --no-headers, or -o name to print exactly what is asked."
   ],
   [
    "Using double quotes around a jsonpath expression.",
    "The shell may interpret characters inside. Single-quote the whole expression and use double quotes only inside it."
   ],
   [
    "Expecting --sort-by to sort descending.",
    "It sorts ascending. Use tail -1 for the largest or newest item."
   ],
   [
    "Leaving the pod/ prefix from -o name when the task wants bare names.",
    "Use jsonpath on .metadata.name, or strip the prefix, when only names are wanted."
   ]
  ],
  "tryit": [
   [
    "A task asks for the name of the Pod in namespace web with the highest restart count, written to /opt/answers/restarts.txt with no prefix. What command do you use?",
    "`kubectl get pods -n web --sort-by='.status.containerStatuses[0].restartCount' --no-headers | tail -1 | awk '{print $1}' > /opt/answers/restarts.txt`, then cat the file. Sorting is ascending, so the last line has the most restarts, and awk keeps only the name column without any prefix."
   ],
   [
    "You need a table of every PersistentVolume's name and capacity, without headers, smallest first. What do you run?",
    "`kubectl get pv --sort-by=.spec.capacity.storage -o custom-columns=NAME:.metadata.name,CAP:.spec.capacity.storage --no-headers`."
   ]
  ],
  "tip": "Single-quote jsonpath expressions, check the object structure with -o yaml before writing the path, and always cat the answer file afterwards.",
  "check": [
   [
    "How do you print each Pod name on its own line with jsonpath?",
    "`kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{\"\\n\"}{end}'`."
   ],
   [
    "How do you sort PersistentVolumes by capacity?",
    "`kubectl get pv --sort-by=.spec.capacity.storage`."
   ],
   [
    "Which flag removes the header row from custom-columns output?",
    "`--no-headers`."
   ]
  ]
 },
 {
  "t": "Stuck Terminating Pods on lost nodes and force deletion",
  "hook": "At 11 p.m., a power strip fails in a server rack at Harborline Shipping, and worker node node03 goes dark. Leah, on call, watches the cluster respond. The web Deployment's Pods come back on other nodes after about five minutes, exactly as she hoped. But the message queue, a StatefulSet, still shows `mq-2` as Terminating on node03, and no new `mq-2` appears anywhere. Orders are starting to back up. A colleague in the chat says, 'Just force delete it.' Leah's finger hovers over the keyboard. Is that safe, and why didn't Kubernetes simply replace the Pod on its own?",
  "simple": "When you delete a Pod, Kubernetes politely asks the machine running it to stop it, and waits for the machine to say 'done'. If that machine has lost power or its network, the 'done' message never comes, so the Pod stays marked as 'Terminating' forever. Kubernetes waits on purpose: it cannot tell whether the machine is truly dead or just cut off but still running the Pod. If it started a replacement too early, two copies might write to the same data at once. You can force the deletion, but only once you are sure the machine is really off. It is like not reassigning someone's desk until you are certain they have actually left the building.",
  "body": [
   "Deleting a Pod is normally a conversation between the control plane and a node. The API server marks the Pod with a deletion timestamp and a grace period, 30 seconds by default. The kubelet on the Pod's node sees this, sends the containers SIGTERM so they can shut down cleanly, sends SIGKILL to anything still running when the grace period ends, and then confirms. Only after that confirmation is the Pod object removed from the API. If the node is powered off, partitioned from the network or its kubelet is dead, no confirmation ever comes, and the Pod stays in `Terminating` indefinitely. The Certified Kubernetes Administrator (CKA) exam expects you to understand why, and when it is safe to intervene.",
   "This behavior is deliberate. The control plane cannot tell a dead node from a node that is merely unreachable but still running the Pod. Removing the Pod object too early could allow a replacement to start while the original is still running and writing to the same data. How much that matters depends on the controller. For Deployments, a brief overlap is usually tolerable, so the system moves on. When a node stops reporting, the node controller marks it NotReady or Unknown and adds the `node.kubernetes.io/unreachable` taint. Pods tolerate that taint for 300 seconds by default, after which they are evicted, and the ReplicaSet creates replacement Pods elsewhere even though the old ones may still show as Terminating.",
   "For StatefulSets, an overlap is not tolerable. A StatefulSet guarantees at most one Pod per identity, so it will not create a new `db-1` until the old `db-1` object is really gone. On a lost node that object never goes away by itself, so a StatefulSet Pod there stays down until someone acts. That is the situation in which force deletion, or a better alternative, becomes your job.",
   "When you are certain the node is truly dead, or that its workloads have stopped, you can force-delete the Pod. This removes the object from the API immediately, without waiting for the kubelet to confirm anything.",
   "```bash\nkubectl get pods -o wide | grep Terminating\nkubectl get node node03            # NotReady / Unknown\nkubectl delete pod db-1 --grace-period=0 --force\n```",
   "kubectl prints a warning that immediate deletion does not wait for confirmation that the running resource has been terminated. That warning is the whole risk in one sentence. If the node comes back with the container still running, you briefly have two copies of the same identity. For a database or a message queue, that can mean split-brain, where two members each believe they own the data, or outright corruption. Force deletion is therefore a decision you make after checking, for example by confirming with the people who manage the hardware or the virtual machine that the node is powered off. It is not a routine cleanup step.",
   "Safer, broader options exist. If you have confirmed the machine is gone for good, deleting the Node object with `kubectl delete node node03` lets the Pod garbage collector remove all Pods bound to that node. For a node that was shut down without being drained, Kubernetes supports the out-of-service taint, `node.kubernetes.io/out-of-service`, for example with value `nodeshutdown` and effect `NoExecute`. Applying it tells the control plane the node is really out of service. Pods on it without a matching toleration are then force-deleted and their volume attachments are detached, so StatefulSet Pods and their persistent volumes can move to healthy nodes. Remove the taint once the node has been recovered, or it will keep evicting Pods.",
   "```bash\nkubectl taint node node03 node.kubernetes.io/out-of-service=nodeshutdown:NoExecute\n# after node03 is repaired and back:\nkubectl taint node node03 node.kubernetes.io/out-of-service=nodeshutdown:NoExecute-\n```",
   "Sometimes a Pod, or any other object, is stuck in Terminating for a different reason: a finalizer that no controller is going to remove. Finalizers are keys in `metadata.finalizers` that block deletion until the controller responsible for them finishes some cleanup and removes the key. Check with `kubectl get pod x -o jsonpath='{.metadata.finalizers}'`. Removing finalizers with `kubectl patch` forces the deletion through, but it skips whatever cleanup they guarded, such as releasing an external resource. Understand which controller owns the finalizer before you remove it, and prefer fixing that controller.",
   "A short decision order keeps you safe. First, confirm whether the node is really down, using its status, the infrastructure team or the console of the virtual machine. Second, check which controller owns the stuck Pod: a Deployment will recover on its own, while a StatefulSet needs you. Third, choose the narrowest tool that fits: force-delete a single Pod, apply the out-of-service taint for a node that was shut down, or delete the Node object for a machine that will never return."
  ],
  "analogy": "A Pod on a lost node is like a hotel guest who stopped answering the phone. The hotel will not give the room key to someone else until it knows the guest has left, because two people sharing one room causes trouble. For a regular room (a Deployment Pod), the hotel opens a different room for the new guest after a short wait. For a numbered suite with a single key (a StatefulSet identity), it must wait. Force deletion is the manager declaring the room empty without checking. The analogy stops working at volumes: in Kubernetes, the storage also has to be detached before the new Pod can use it.",
  "terms": [
   [
    "Terminating",
    "Pod state shown when a deletion timestamp is set but deletion has not been confirmed."
   ],
   [
    "Force deletion",
    "Removing a Pod object immediately with --grace-period=0 --force, without kubelet confirmation."
   ],
   [
    "out-of-service taint",
    "A node taint marking a node as shut down so its Pods and volume attachments are cleaned up."
   ],
   [
    "Grace period",
    "Time allowed between SIGTERM and SIGKILL for a container to shut down, 30 seconds by default."
   ],
   [
    "Finalizer",
    "A metadata key that blocks an object's deletion until its controller completes cleanup and removes it."
   ]
  ],
  "example": "node03 lost power. The Deployment's Pods were recreated elsewhere after about five minutes, but StatefulSet Pod mq-2 is still Terminating on node03 and no replacement appears. After confirming with the data center team that node03 is off, you force-delete mq-2; the StatefulSet recreates it on node01 and it reattaches its volume once the old attachment is cleaned up.",
  "mistakes": [
   [
    "Force-deleting Terminating Pods as a routine cleanup step.",
    "If the node is still running the container, force deletion can create two copies of the same identity. Confirm the node is really down first."
   ],
   [
    "Expecting a StatefulSet to replace a Pod on a lost node automatically, like a Deployment.",
    "StatefulSets guarantee at most one Pod per identity, so they wait until the old Pod object is truly gone."
   ],
   [
    "Leaving the out-of-service taint on a node after it is repaired.",
    "The taint keeps evicting Pods without a matching toleration. Remove it once the node is back."
   ],
   [
    "Assuming every stuck Terminating object is caused by a dead node.",
    "A finalizer that no controller removes also blocks deletion. Check metadata.finalizers and the owning controller."
   ]
  ],
  "tryit": [
   [
    "Node worker5 shows NotReady. Pod cache-0 from a StatefulSet has been Terminating on it for twenty minutes. Monitoring shows worker5 still answers ping, but its kubelet is not posting status. Should you force-delete cache-0?",
    "Not yet. A node that answers ping may still be running the container, so force deletion could create two cache-0 instances. Investigate the kubelet on worker5 (for example systemctl status kubelet). If the kubelet can be fixed, deletion will complete normally; force-delete only after confirming the container is stopped or the node is powered off."
   ],
   [
    "A namespace's Pod web-1 is Terminating on a healthy Ready node, and kubectl get pod web-1 -o jsonpath='{.metadata.finalizers}' shows a custom finalizer. What is happening?",
    "The Pod is waiting for a controller to remove its finalizer. Find which controller owns that finalizer and why it is not finishing; removing the finalizer by patch forces deletion but skips its cleanup."
   ]
  ],
  "tip": "StatefulSet Pods on a lost node are not replaced automatically; force deletion (or the out-of-service taint) is the fix, but only after confirming the node is really down.",
  "check": [
   [
    "Why does Kubernetes leave a Pod Terminating on an unreachable node rather than deleting it?",
    "It cannot confirm the containers stopped, and deleting too early could let a second copy run at the same time."
   ],
   [
    "What command force-deletes a Pod?",
    "`kubectl delete pod <name> --grace-period=0 --force`."
   ],
   [
    "How long do Pods tolerate the unreachable taint by default before eviction?",
    "300 seconds."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
