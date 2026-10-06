/* Lessons for Microsoft Certified: Azure AI Cloud Developer Associate (AI-200 (replaced AZ-204)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("ai-200", [
 {
  "t": "Dockerfiles for Python apps: base images, multi-stage builds, non-root users, .dockerignore",
  "hook": "It is Monday morning at Lakeside Freight, and Jonah from the security team drops a scan report into your team channel. The new route-planning API image is 1.2 GB, it runs as root, and the scanner found a file called `.env` inside one of its layers, complete with a database password. Every commit also triggers a twelve-minute rebuild because every Python package reinstalls from scratch. Nobody wrote anything malicious. The Dockerfile simply grew one line at a time, and nobody stepped back to ask what actually ends up in the final image or who the process runs as. Your lead asks you to fix it before the image goes to Azure Container Apps on Friday. Where do you start, and which four changes give you the biggest win?",
  "simple": "A container image is a sealed lunchbox for your app: it holds your code plus everything the code needs to run, so it behaves the same on any machine. A Dockerfile is the written recipe for packing that lunchbox. Good recipes follow a few habits. Start from a small, plain base, like choosing a light container instead of a heavy one. Do your messy preparation in a separate kitchen, then pack only the finished food, which is what a multi-stage build does. Do not let the app run with full owner powers inside the box, so a burglar who gets in cannot do much. And keep a list of things that never go in the box, such as private notes and passwords. That list is the .dockerignore file.",
  "body": [
   "A Dockerfile is the recipe that turns your Python source code into a container image: a read-only, layered package holding an operating system userland, the Python runtime, your dependencies and your code. Every Azure container service in this exam runs images built this way, including Azure App Service, Azure Container Apps, Container Apps jobs and AKS (Azure Kubernetes Service). Because all of them start from the same image, a clean Dockerfile is the first skill the rest of the domain builds on, and mistakes made here follow the image into every environment.",
   "Start with the base image in the `FROM` line, because it decides most of the image size and most of the vulnerabilities a scanner will report. Official Python images come in several variants. The full Debian-based image is large but includes compilers and build tools. The `-slim` images drop most of those tools and are the usual choice for production. Alpine images are tiny, but they use musl instead of glibc as the C library, so many prebuilt Python wheels do not fit and packages must be compiled from source; in practice that often makes builds slower and the final image bigger than expected. Whatever you choose, pin a specific version tag, for example a Python minor version plus `-slim` such as `python:3.12-slim`, rather than `latest`. A pinned tag means a rebuild next month produces the same runtime you tested, not whatever happened to be newest.",
   "Next, think about layers and caching, because they decide how fast you rebuild. Each instruction such as `RUN`, `COPY` or `ADD` creates a layer, and Docker caches each layer. When an instruction and its inputs are unchanged, Docker reuses the cached layer; once one layer changes, every layer after it rebuilds. So order instructions from least to most frequently changing. Copy `requirements.txt` first, run `pip install --no-cache-dir -r requirements.txt`, and only then copy the rest of your code. A code-only change then reuses the cached dependency layer instead of reinstalling every package. In a build log you can see the difference: cached steps are marked as cached and finish instantly, while a badly ordered file reinstalls everything on each commit. The `--no-cache-dir` flag also keeps pip's download cache out of the layer.",
   "A multi-stage build is the main tool for keeping the final image small and clean. It uses more than one `FROM`. The first stage, often named `builder`, has compilers and headers and installs your dependencies into a virtual environment. The final stage starts again from a small runtime image and uses `COPY --from=builder` to bring over only the finished virtual environment and your code. Anything that lived only in the builder stage, such as build tools, caches, temporary files or credentials used to download private packages, never reaches the final image. That shrinks both the size and the attack surface, meaning the number of tools an attacker could use if they broke in. The example below shows the pattern.",
   "```dockerfile\nFROM python:3.12-slim AS builder\nWORKDIR /app\nRUN python -m venv /opt/venv\nENV PATH=/opt/venv/bin:$PATH\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nFROM python:3.12-slim\nRUN useradd --create-home appuser\nCOPY --from=builder /opt/venv /opt/venv\nENV PATH=/opt/venv/bin:$PATH\nWORKDIR /app\nCOPY . .\nUSER appuser\nEXPOSE 8000\nCMD [\"gunicorn\", \"-b\", \"0.0.0.0:8000\", \"app:app\"]\n```",
   "Look at who the process runs as, because by default a container process runs as root. If an attacker exploits a flaw in your app, root inside the container makes tampering with files, installing tools and attempting a container escape much easier. The fix is two lines: create an unprivileged user (here with `useradd`) and switch to it with `USER` before `CMD`, as in the example. Every later instruction and the running app then use that account. A related detail is the port. Non-root users cannot bind ports below 1024 without extra Linux capabilities, so the app listens on a high port such as 8000. You then tell the hosting service which port to use, for example the target port in Container Apps or the `WEBSITES_PORT` setting in App Service. `EXPOSE` documents the port but does not publish it by itself.",
   "Finally, control what gets sent to the build at all with `.dockerignore`. It works like `.gitignore` but for the build context, which is the set of files sent to the builder when you run a build. Files listed in `.dockerignore` are never sent. Typical entries are `.git`, `__pycache__`, local virtual environments such as `.venv`, test data, and especially `.env` files and local credential files. There are two reasons. First, speed: a smaller context uploads and builds faster, which matters most for remote builds that upload the context, such as `az acr build`. Second, secrecy: a broad `COPY . .` copies everything in the context into a layer, and anyone who can pull the image can extract that layer and read the file, even if a later instruction deletes it.",
   "Put together, these four habits answer most Dockerfile questions on the exam. A slim, pinned base image keeps builds predictable. Correct instruction order keeps rebuilds fast. A multi-stage build keeps compilers and build-time secrets out of the final image. A non-root `USER` limits damage if the app is compromised, and `.dockerignore` stops sensitive or bulky files from ever reaching the builder. When a question describes a symptom, map it to the habit: slow rebuilds point to layer order, a large image with build tools points to multi-stage builds, a leaked file points to `.dockerignore`, and a security finding about root points to `USER`."
  ],
  "analogy": "Think of a multi-stage build like a restaurant kitchen and the plate that goes to the table. The kitchen is full of knives, flour, scraps and the supplier's invoice. The diner receives only the finished dish. The builder stage is the kitchen; `COPY --from=builder` carries just the dish to the plate. The analogy stops at `.dockerignore`: that is not about the kitchen at all, it decides which ingredients are allowed through the back door in the first place.",
  "terms": [
   [
    "Base image",
    "The image named in FROM that your image builds on, such as a pinned slim Python image."
   ],
   [
    "Multi-stage build",
    "A Dockerfile with several FROM stages where the final stage copies only needed artifacts from earlier stages."
   ],
   [
    "Build context",
    "The set of files sent to the builder with a build; .dockerignore removes files from it."
   ],
   [
    "Layer cache",
    "Docker's reuse of unchanged instruction results, which makes instruction order matter for build speed."
   ],
   [
    "USER instruction",
    "Sets the user that later instructions and the running container use, so the app need not run as root."
   ],
   [
    ".dockerignore",
    "A file listing paths that are excluded from the build context and therefore can never be copied into the image."
   ]
  ],
  "example": "A team's FastAPI image was 1.1 GB and rebuilt all dependencies on every commit. They switched to a slim base, copied requirements.txt before the code, added a builder stage for compiled wheels and a .dockerignore excluding .git and .env. The final image dropped to a few hundred megabytes, rebuilds after code-only changes took seconds, and a security scan no longer flagged a leaked .env file.",
  "mistakes": [
   [
    "Deleting a secret file with a later RUN rm command removes it from the image.",
    "Each instruction is a separate layer. The file still exists in the earlier layer and can be extracted. Keep it out with .dockerignore, or use it only in a builder stage that is discarded."
   ],
   [
    "Alpine is always the best production base because it is the smallest.",
    "Alpine uses musl, so many Python wheels must be compiled from source, which can make builds slower and images larger. A slim Debian-based image is the usual Python choice."
   ],
   [
    "EXPOSE publishes the port, so the hosting service will find it automatically.",
    "EXPOSE only documents the port. You still configure the target port in Container Apps or WEBSITES_PORT in App Service."
   ],
   [
    "Using latest as the base tag keeps you patched, so it is the safest choice.",
    "It makes builds unpredictable because the base can change under you. Pin a version tag and rebuild deliberately, for example with ACR Tasks base image update triggers."
   ]
  ],
  "tryit": [
   [
    "Your Dockerfile copies the whole project with COPY . . and then runs pip install. Every commit, even a one-line code change, reinstalls all packages and takes ten minutes. Builds run in the cloud with az acr build, and the repository includes a large .git folder. What two changes speed this up most?",
    "Copy requirements.txt and run pip install before copying the rest of the code, so the dependency layer stays cached on code-only changes. Add a .dockerignore that excludes .git, virtual environments and test data, so az acr build uploads a much smaller context."
   ]
  ],
  "tip": "If a question asks how to keep compilers or secrets out of the final image, the answer is a multi-stage build; if it asks how to stop files from being sent to the build at all, the answer is .dockerignore.",
  "check": [
   [
    "Why should you copy requirements.txt and run pip install before copying the rest of the source code?",
    "Because layers are cached in order; code changes then reuse the cached dependency layer instead of reinstalling every package."
   ],
   [
    "What does a multi-stage build improve, and how?",
    "Image size and security: build tools live only in an earlier stage, and the final stage uses COPY --from to take just the built artifacts."
   ],
   [
    "Why run the app with a USER other than root?",
    "To limit what an attacker can do if the app is compromised; root in the container makes tampering and escape attempts easier."
   ],
   [
    "Which file keeps a local .env file from ever being sent to the builder?",
    ".dockerignore, because it removes listed files from the build context before any COPY instruction can see them."
   ]
  ]
 },
 {
  "t": "Azure Container Registry: Basic, Standard and Premium tiers; geo-replication and private endpoints on Premium",
  "hook": "Priya is the platform lead at Northwind Learning, and she has two messages waiting when she logs in. The first is from finance: why is there a cross-region data transfer line on the bill every time the European cluster scales out? The second is from the compliance officer, Marcus, who has read the new policy draft and wants to know whether the company's container registry can be reached from the public internet. Both questions lead to the same resource: one Standard-tier registry in East US that every environment in two regions pulls from. Priya suspects the answers are not about code at all but about which registry tier they bought. Which tier would answer both messages, and what would she need to turn on?",
  "simple": "A container registry is a private warehouse for your app packages, called images. Your build system drops new packages off, and the computers that run your app pick them up. Azure Container Registry comes in three sizes: Basic, Standard and Premium. All three store and hand out packages in the same way. Bigger sizes mostly give you more shelf space and faster loading docks. Only the largest size, Premium, adds two special features. First, it can keep copies of the warehouse in several cities while keeping one address, so each city picks up locally. Second, it can be connected only to your private road network and closed to the public street, which is what a private endpoint does.",
  "body": [
   "Azure Container Registry (ACR) is Azure's private registry for container images and other OCI (Open Container Initiative) artifacts such as Helm charts. Your build pipeline pushes images to it, and App Service, Container Apps and AKS (Azure Kubernetes Service) pull from it whenever they start or scale out. Keeping the registry in the same region as your compute makes those pulls fast and keeps the traffic on Microsoft's network, which matters both for start-up time and for data transfer charges.",
   "Every registry has a login server name of the form `myregistry.azurecr.io`, and image references build on it, as in `myregistry.azurecr.io/orders-api:1.4.2`. The part after the server name is the repository, and the part after the colon is the tag. You create a registry with `az acr create --resource-group rg --name myregistry --sku Basic`, where `--sku` is the tier. You sign your local Docker client in with `az acr login --name myregistry`, which uses your Microsoft Entra ID sign-in rather than a stored password. That is worth noticing: even the human path to the registry is identity-based, which sets up the managed identity pattern later in this domain.",
   "ACR has three service tiers, and the most important exam fact is what they share. All three support the same core features: pushing and pulling images, Microsoft Entra authentication, ACR Tasks for cloud builds, webhooks and repository-scoped permissions. So a question that only needs builds, webhooks or Entra sign-in does not require an upgrade. The tiers differ mainly in included storage, in throughput (how many concurrent pulls and pushes perform well) and in a set of advanced features. Basic is the cost-optimized entry point for learning and small workloads. Standard adds more storage and throughput and suits most production workloads. Premium has the highest storage and throughput and is the only tier with the enterprise features described next.",
   "Geo-replication is the first Premium-only feature, and it turns one registry into a multi-region registry. You add a replica with `az acr replication create --registry myregistry --location westeurope`. You still push once, to the same login server name. ACR copies the content to each replica, and clients are routed to the closest one. The benefits are faster and cheaper pulls for compute in several regions, because there is no cross-region egress on every pull, and continued pulls if one region has a problem. The lower-tier alternative is a separate registry per region, which means pushing several times, managing several login server names and keeping several deployment manifests in sync.",
   "Private endpoints, through Azure Private Link, are also Premium only. A private endpoint is a network interface that gives the registry a private IP address inside your virtual network (VNet). With a private DNS (Domain Name System) zone linked to the network, the normal login server name resolves to that private IP from inside the network, so your manifests do not change. You can then disable public network access so the registry cannot be reached from the internet at all. In a scenario this often appears as a compliance requirement: images must be pulled only over private networking.",
   "Premium also carries a few other features worth recognizing in answer choices. It supports firewall rules that allow only selected networks, customer-managed encryption keys stored in Azure Key Vault, and the highest throughput, which helps large clusters that pull many images at once during scale-out. If a requirement lists any of these, it is another signal for Premium. If the requirement is only about more storage or more pull performance for a single region, Standard may be enough.",
   "Changing tiers is simple and does not lose anything. `az acr update --name myregistry --sku Premium` upgrades in place without changing the login server or deleting images, and you can move down again later if you no longer use Premium-only features. That means a common pattern is to start on Basic in development, run production on Standard, and move to Premium only when a requirement such as multiple regions or private endpoints appears. On the exam, when a question asks for the least expensive tier that meets a requirement, check whether the requirement is truly Premium-only before choosing it. Words such as 'several regions with one name', 'private IP', 'no public access' or 'our own encryption key' are the Premium clues; words such as 'webhook', 'cloud build' or 'Entra sign-in' are not."
  ],
  "analogy": "Geo-replication is like a chain bakery with one phone number. You call the same number wherever you are, and the order is filled by the shop nearest to you, which was stocked from the central kitchen. Separate registries per region would be separate bakeries with different numbers. The analogy stops at writes: in ACR you push once to the shared name and replication copies the image to every replica for you.",
  "terms": [
   [
    "Login server",
    "The registry's DNS name, such as myregistry.azurecr.io, used as the prefix of every image reference."
   ],
   [
    "Geo-replication",
    "A Premium ACR feature that keeps copies of one registry in several regions behind a single login server."
   ],
   [
    "Private endpoint",
    "A network interface with a private IP in your VNet that connects privately to a service such as a Premium registry."
   ],
   [
    "Repository",
    "A named collection of related images in a registry, distinguished by tags and digests."
   ],
   [
    "Service tier (SKU)",
    "The registry level, Basic, Standard or Premium, which sets storage, throughput and access to advanced features."
   ]
  ],
  "example": "A retailer runs its API on Container Apps in East US and West Europe. With a Standard registry in East US, the European replicas pulled across the Atlantic on every scale-out. They upgraded the registry to Premium, added a West Europe replica and a private endpoint in each VNet, then turned off public network access. Pushes still go to one login server, and each region now pulls locally over a private IP.",
  "mistakes": [
   [
    "ACR Tasks or webhooks require Standard or Premium.",
    "All three tiers support ACR Tasks, webhooks, Entra authentication and repository-scoped permissions. Tiers differ mainly in storage, throughput and Premium-only features."
   ],
   [
    "Standard supports private endpoints because it is meant for production.",
    "Private endpoints, geo-replication, selected-network firewall rules and customer-managed keys are Premium only."
   ],
   [
    "Upgrading to Premium means creating a new registry and re-pushing images.",
    "az acr update --sku Premium changes the tier in place and keeps the login server and all content."
   ],
   [
    "With geo-replication you push to a regional name for each replica.",
    "You push once to the single login server; ACR replicates to each region and routes pulls to the closest replica."
   ]
  ],
  "tryit": [
   [
    "A startup runs one container app in a single region and needs automatic image builds on every commit plus a webhook that notifies its deployment tool. They want the cheapest tier that meets the need. Which tier should they choose?",
    "Basic. ACR Tasks and webhooks are available in all tiers, and nothing in the requirement needs Premium features or Standard's extra storage and throughput."
   ],
   [
    "A bank's policy says registries must not be reachable from the internet and images must be pulled only from inside its virtual networks. The current registry is Standard. What do you change?",
    "Upgrade to Premium in place, add a private endpoint in the VNet with a private DNS zone, then disable public network access."
   ]
  ],
  "tip": "Any requirement mentioning multiple regions from one registry name, private endpoints, or blocking public access points to Premium; Basic and Standard differ mainly in storage and throughput.",
  "check": [
   [
    "A company needs one registry that serves images to clusters in three regions with local pulls. Which tier and feature?",
    "Premium with geo-replication, because only Premium can replicate one registry to multiple regions behind a single login server."
   ],
   [
    "Can you upgrade a Basic registry to Premium without re-pushing images?",
    "Yes. az acr update --sku Premium changes the tier in place and keeps the login server and all content."
   ],
   [
    "Which ACR features are shared by all three tiers?",
    "Pushing and pulling images, Microsoft Entra authentication, ACR Tasks, webhooks and repository-scoped permissions."
   ]
  ]
 },
 {
  "t": "Build and push images with `az acr build` (quick tasks) and ACR Tasks triggered by commits, base-image updates or schedules",
  "hook": "At Cedar Valley Health, a vulnerability bulletin lands on a Thursday afternoon: the Python base image used by every one of the clinic's eight internal APIs has a patched release. Elena, the security analyst, wants every app image rebuilt on the new base by Monday. The developers are mid-sprint, half of them use locked-down laptops with no Docker installed, and nobody wants to open eight pull requests just to rebuild unchanged code. You are asked whether the registry itself can take care of this, today and every time it happens again. Can it rebuild images without anyone touching a laptop, and how would it know when to do so?",
  "simple": "Building a container image normally needs a special program running on your own computer. ACR Tasks lets Azure do the building for you in the cloud and put the finished image straight into your registry. You can ask for a single build right now, which is called a quick task. Or you can set up a saved task that builds automatically when something happens. There are three kinds of 'something': you push new code, the starter image your app is built on gets updated, or a clock says it is time. It is like a bakery that bakes when a new order arrives, when the flour supplier delivers a fresh batch, or every morning at 5 a.m.",
  "body": [
   "You do not need Docker installed locally to produce an image for Azure. ACR Tasks is a set of build features inside Azure Container Registry (ACR) that runs builds on Azure-managed compute and pushes the result straight into your registry. This matters on locked-down developer machines, in Azure Cloud Shell, and in CI (continuous integration) pipelines where you would rather not run a Docker daemon. It also means builds happen close to the registry, so the push step is fast.",
   "The simplest form is a quick task. `az acr build --registry myregistry --image orders-api:{{.Run.ID}} .` uploads the current directory, which is the build context filtered by `.dockerignore`, to ACR. ACR builds the Dockerfile there, streams the build log back to your terminal and pushes the image if the build succeeds. The final dot is the context path, just as in `docker build`. `{{.Run.ID}}` is a placeholder that ACR replaces with the unique run ID, which gives you a unique tag for every build without any scripting. You can add `--file` to point at a different Dockerfile and `--platform` to target another operating system or processor architecture.",
   "Quick tasks are one-off and manual: someone or something has to run the command. When you want builds to happen automatically, you create a saved task with `az acr task create`. A task stores the build definition (the context, the Dockerfile and the image name) together with one or more triggers. Its context is usually a Git repository, for example a GitHub repository URL with a branch after a `#`, plus a personal access token so ACR can read the repository and register a webhook that tells it about new commits. You can also run a saved task on demand with `az acr task run` and review history with `az acr task list-runs`.",
   "The three trigger types are worth memorizing, because scenario questions are mostly about matching wording to a trigger. A source code update trigger, often called a commit trigger, runs the task when a commit is pushed, or a pull request is opened, on the configured branch. A base image update trigger runs the task when the base image that your Dockerfile's `FROM` line depends on is updated, whether that base lives in ACR or in a public registry, so your app image automatically picks up operating system and runtime patches. A timer trigger runs the task on a schedule defined with a cron expression through `--schedule`, which is useful for nightly rebuilds or maintenance jobs.",
   "```bash\naz acr task create --registry myregistry --name build-orders \\\n  --image orders-api:{{.Run.ID}} \\\n  --context <git-repo-url>#main \\\n  --file Dockerfile --git-access-token $PAT\n\naz acr task run --registry myregistry --name build-orders\naz acr task list-runs --registry myregistry --output table\n```",
   "Base image update triggers are enabled by default when you create a task, and they are the feature most likely to appear in a scenario about keeping images patched without developer effort. ACR tracks the base image that each task's Dockerfile uses. When that base is updated, ACR queues a run of every dependent task, and each run produces a new image with a new unique tag. Your deployment pipeline or continuous deployment setting then picks up the new image. The developer does not commit anything; the patch flows in from the base.",
   "For more complex flows, a multi-step task defined in a YAML file and run with `az acr run` (or saved as a task) can build, test and push several images in sequence, with steps that depend on each other. Multi-step tasks are also how you run maintenance commands inside the registry, such as the `acr purge` cleanup command covered in the next lesson, often combined with a timer trigger.",
   "To choose correctly on the exam, read the scenario for its cause. If the event is a developer pushing code, choose a commit trigger. If the event is a patch to the operating system or runtime in the parent image, choose a base image update trigger. If the event is a time of day or a recurring window, choose a timer trigger with a cron expression. And if the scenario only needs a one-time build without a local Docker engine, the answer is simply `az acr build`. A single saved task can also combine triggers, for example a commit trigger on `main` plus the default base image update trigger, so the image is rebuilt both when your code changes and when its foundation does."
  ],
  "analogy": "A saved ACR task is like a coffee machine with three buttons wired to the outside world. One button is pressed when someone drops off new beans you ordered (a commit). One is pressed automatically when the milk supplier delivers a fresher batch (a base image update). One is pressed by a timer at 6 a.m. (a schedule). The quick task is you walking up and pressing brew once. The analogy stops at the result: every brew in ACR produces a new, separately labeled cup, never a refill of the old one.",
  "mnemonic": "Three ACR task triggers: 'Code, Base, Clock.' Code means a commit or pull request on the branch, Base means the FROM image was updated, Clock means a cron timer schedule.",
  "terms": [
   [
    "Quick task",
    "A one-off cloud build started with az acr build that uploads the context, builds in ACR and pushes the image."
   ],
   [
    "ACR task",
    "A saved build definition in a registry that runs automatically on triggers such as commits, base-image updates or a schedule."
   ],
   [
    "Base image update trigger",
    "An ACR Tasks trigger, on by default, that rebuilds your app image when the image in its FROM line is updated."
   ],
   [
    "Run ID",
    "The unique identifier of each ACR Tasks run, available as the {{.Run.ID}} placeholder for unique tags."
   ],
   [
    "Timer trigger",
    "An ACR Tasks trigger that runs a task on a cron schedule set with --schedule."
   ],
   [
    "Multi-step task",
    "A YAML-defined ACR task that runs several build, push or command steps in sequence, started with az acr run."
   ]
  ],
  "example": "A security team wants every app image rebuilt whenever the Python base image receives a security patch, without developers noticing. The platform team creates an ACR task per app with a commit trigger on main and the default base image update trigger. When a patched base image is published, ACR rebuilds each dependent app image and pushes a new unique tag, and the deployment pipeline picks it up.",
  "mistakes": [
   [
    "az acr build needs Docker installed on the developer machine.",
    "It uploads the context and builds on Azure-managed compute, so no local Docker engine is required."
   ],
   [
    "A timer trigger is the right way to pick up base image patches.",
    "A timer rebuilds blindly on a schedule. The base image update trigger rebuilds exactly when the parent image changes."
   ],
   [
    "Base image update triggers must be explicitly enabled on each task.",
    "They are enabled by default when you create a task."
   ],
   [
    "Using a fixed tag such as latest in az acr build is fine for tracking builds.",
    "{{.Run.ID}} gives each build a unique tag, which makes deployments repeatable and history clear."
   ]
  ],
  "tryit": [
   [
    "A data team wants their scoring image rebuilt every Sunday at 03:00 so it picks up a refreshed reference dataset baked in at build time. The code rarely changes and the base image is pinned. Which trigger fits, and how is it configured?",
    "A timer trigger, configured on az acr task create with --schedule and a cron expression for Sunday at 03:00. Commit and base image triggers would not fire, because neither the code nor the base changes."
   ]
  ],
  "tip": "Match the trigger to the wording: code pushed means a commit trigger, OS or runtime patches in the parent image mean a base image update trigger, and nightly or weekly means a timer trigger with a cron schedule.",
  "check": [
   [
    "What does az acr build do that docker build plus docker push do not?",
    "It uploads the build context and runs the build on Azure-managed compute, then pushes to ACR, so no local Docker engine is required."
   ],
   [
    "Which ACR Tasks trigger keeps an app image patched when its parent image changes?",
    "The base image update trigger, which rebuilds the image when the image in its FROM line is updated."
   ],
   [
    "What does the {{.Run.ID}} placeholder give you in an image tag?",
    "A unique tag for every run, because ACR replaces it with that run's unique ID."
   ]
  ]
 },
 {
  "t": "Tags vs digests, stable vs unique tags, and cleaning up old images with `az acr repository` and purge tasks",
  "hook": "At 4:40 p.m. on a Friday, the support queue at Bluepine Insurance lights up: about one in five customers sees an old quote page, the rest see the new one. Dev, the on-call engineer, checks the Container App and finds six replicas, all supposedly running `quotes-api:latest`. Four started this morning; two started an hour ago during a scale-out, right after someone pushed a new build that also took the `latest` tag. Same tag, two different images, and no record of which one was meant to be in production. Meanwhile, the registry bill has crept up every month because nothing is ever deleted. Can you name exactly what is running, and how would you keep the registry from growing forever?",
  "simple": "Every image in a registry can be named two ways. A tag is a friendly sticky label, like 'latest' or '1.4', and sticky labels can be peeled off and stuck on a different box. A digest is like the box's fingerprint, a long code calculated from its exact contents, so it can never point to a different box. If you tell your servers to use the box labeled 'latest' and someone moves the label, new servers grab a different box. That is why deployments should use labels that are used once and never moved, such as a build number. Those one-time labels pile up, so you also set up a regular cleanup that throws out old boxes nobody needs.",
  "body": [
   "Every image in a registry has two kinds of names, and the difference drives the whole lesson. A tag is a human-friendly, mutable label such as `orders-api:1.4` or `orders-api:latest`. A digest is a SHA-256 (Secure Hash Algorithm, 256-bit) hash of the image manifest, written like `orders-api@sha256:...`, and it is immutable: the same digest always refers to exactly the same bytes. A tag is a pointer that can be moved to a new image at any time; a digest can never change. When you push, the output shows both, and `az acr repository show-manifests` lists each digest with the tags currently pointing at it.",
   "Microsoft's guidance divides tags into stable tags and unique tags. A stable tag, such as `1.4` or `latest`, is meant to move. When you publish a patch, the `1.4` tag is re-pointed to the new image, so consumers who track `1.4` automatically get fixes. Stable tags suit base images and anything consumers want to follow for updates. A unique tag is assigned once and never reused, for example a build ID, a Git commit hash or a date-time stamp. Unique tags suit deployments, because a deployment that references `orders-api:20260914.3` will pull the same image on every node and every scale-out, even weeks later.",
   "Why does this matter in production? If you deploy with a stable tag, a new node or a new replica may pull a newer image than the ones already running. You end up with mixed versions behind one load balancer and no clear record of what shipped, which is exactly the situation in the opening scene. Deploying with a unique tag or a digest gives you repeatable deployments and simple rollbacks: you point the app back to the previous unique tag and every replica runs that image. For extra protection you can lock an image or tag against changes or deletion with `az acr repository update --write-enabled false`, which is useful for a release you must keep exactly as it is.",
   "Unique tags have a cost: they accumulate, and registry storage is billed, so you need a cleanup plan. The `az acr repository` commands inspect and delete content. `show-tags` lists tags, and adding `--orderby time_desc` sorts them newest first. `show-manifests` lists digests, including untagged ones. `untag` removes a tag while keeping the manifest. `delete --image repo:tag` or `delete --image repo@digest` deletes the manifest and every tag pointing to it, so deleting by tag can remove more than one name. There is also a subtle source of waste: when a stable tag moves, the old manifest becomes untagged, sometimes called dangling, and it still uses storage even though no tag names it.",
   "```bash\naz acr repository show-tags --name myregistry --repository orders-api --orderby time_desc --output table\naz acr repository delete --name myregistry --image orders-api:20260101.1 --yes\n\n# Scheduled cleanup: delete tags older than 30 days and untagged manifests, keep the newest 10\naz acr task create --registry myregistry --name nightly-purge \\\n  --cmd \"acr purge --filter 'orders-api:.*' --ago 30d --keep 10 --untagged\" \\\n  --schedule \"0 2 * * *\" --context /dev/null\n```",
   "For hands-off retention, use the `acr purge` command, which runs inside ACR Tasks rather than on your machine. `--filter` takes a repository name and a regular expression for the tags to consider, `--ago` sets the age threshold (for example `30d`), `--untagged` also removes dangling manifests, and `--keep` preserves a number of the most recent tags no matter how old they are. Always test first with `--dry-run`, which lists what would be deleted without deleting anything. Scheduling purge with a timer-triggered task, as in the example above, gives you automatic cleanup every night. The `--context /dev/null` argument tells ACR that the task needs no source code context, because it only runs a command.",
   "Premium registries offer one more option: a retention policy for untagged manifests, which automatically deletes dangling manifests after a set number of days. It handles only untagged content, so it complements purge rather than replacing it when you also want to trim old unique tags.",
   "Put the two halves together and you have a healthy registry lifecycle. Build pipelines push unique tags, and optionally also move a stable tag for humans or base-image consumers. Deployments reference unique tags or digests, so every replica runs the same bytes and rollbacks are a one-line change. Important releases can be locked with `--write-enabled false`. A scheduled purge task removes old unique tags and untagged manifests, keeping the newest few as a safety net. On the exam, consistency questions point to unique tags or digests, and cleanup questions point to `acr purge` in a scheduled ACR task."
  ],
  "analogy": "A tag is like a 'Today's Special' sign in a cafe: it is real, but tomorrow the same sign points at a different dish. A digest is the recipe card number, which always means exactly one dish. If a waiter takes orders by the sign, two tables can get different meals. The analogy stops at cleanup: old dishes do not linger in a kitchen, but old images do linger in a registry, untagged and still billed, until something deletes them.",
  "terms": [
   [
    "Tag",
    "A mutable, human-readable label that points to an image manifest and can be moved to a newer image."
   ],
   [
    "Digest",
    "An immutable SHA-256 identifier of an image manifest that always refers to exactly the same content."
   ],
   [
    "Stable tag",
    "A tag such as 1.4 or latest that is intentionally moved to newer images, suited to base images consumers track."
   ],
   [
    "Unique tag",
    "A tag used once and never reassigned, such as a build ID or commit hash, recommended for deployments."
   ],
   [
    "Untagged manifest",
    "An image whose tags have all been moved or removed; it still consumes storage until deleted."
   ],
   [
    "acr purge",
    "An ACR Tasks command that deletes tags and untagged manifests by filter and age, often run on a schedule."
   ]
  ],
  "example": "After a busy quarter, a team's registry held thousands of build-ID tags and its storage bill had grown steadily. They created a timer-triggered ACR task that runs acr purge nightly with --ago 30d --keep 10 --untagged, after first checking the output of a --dry-run. Deployments kept using unique tags, so production was never affected, and old images disappeared automatically.",
  "mistakes": [
   [
    "Removing a tag with untag frees the storage.",
    "untag removes only the name; the manifest remains and is billed until it is deleted, for example with acr purge --untagged."
   ],
   [
    "latest always means the newest image, so it is the safest deployment reference.",
    "latest is just a stable tag that moves when someone pushes it. Replicas can pull different images; use a unique tag or digest."
   ],
   [
    "Deleting by tag removes only that one tag.",
    "az acr repository delete --image repo:tag deletes the manifest and every tag pointing to it. Use untag to remove only the label."
   ],
   [
    "acr purge runs from your local Azure CLI like other az commands.",
    "acr purge runs inside ACR Tasks, either with az acr run or as a scheduled task, and should be tested with --dry-run first."
   ]
  ],
  "tryit": [
   [
    "A team must guarantee that a regulated release, payments-api:2026.09.01, can never be overwritten or removed, while still cleaning up everything else older than 60 days nightly. What two things do you set up?",
    "Lock the release with az acr repository update using --write-enabled false and --delete-enabled false on that image, and create a timer-triggered ACR task running acr purge with --ago 60d and --untagged, after checking a --dry-run. Locked images are not deleted by purge."
   ]
  ],
  "tip": "For a question about ensuring every replica runs exactly the same image, choose a unique tag or a digest, never latest; for automatic cleanup of old images, choose acr purge in a scheduled ACR task.",
  "check": [
   [
    "Why is latest a poor choice in a production deployment manifest?",
    "It is a stable tag that moves, so new replicas may pull a different image than running ones and rollbacks are unclear; unique tags or digests are repeatable."
   ],
   [
    "What happens to an image when its only tag is moved to a newer build?",
    "It becomes an untagged manifest that still uses storage until it is deleted, for example with acr purge --untagged."
   ],
   [
    "Which acr purge option shows what would be deleted without deleting anything?",
    "--dry-run, which lists the matching tags and manifests so you can verify the filter first."
   ]
  ]
 },
 {
  "t": "Pull images without passwords: managed identity with the AcrPull role instead of the admin user",
  "hook": "It is 2 a.m. and Maya on the night shift at Harbor Credit Union gets paged: the new loan-status Container App will not start. The log shows an image pull failure, unauthorized. An hour earlier, a security change disabled the registry's admin user, because an audit found its password pasted into three app settings and one old wiki page. The auditor's note is blunt: no shared registry passwords anywhere. Maya could re-enable the admin user and go back to bed, but that just reopens the finding. Somewhere there is a way for the app to prove who it is to the registry without anyone holding a password. What is it, and why does a brand-new app sometimes still fail on its very first pull?",
  "simple": "Before an app can download its image from a private registry, it has to prove it is allowed in. The old way is a shared username and password, like one office key copied for everybody: anyone with a copy can get in, and you cannot tell who did. The better way is a managed identity, which is like an employee badge that Azure prints for your app and quietly renews. You then give that badge one permission, called AcrPull, which means 'may download images' and nothing else. Nobody ever sees or types a password, so there is nothing to leak. You just have to make sure the badge exists and has its permission before the app tries the door for the first time.",
  "body": [
   "Every service that runs your container has to authenticate to your private registry before it can pull the image, every time it starts or scales out. There are several ways to do this, and the exam expects you to pick the one with no stored secrets: a managed identity granted the AcrPull role. To see why, it helps to look at the alternative first.",
   "The admin user is a single account per registry, with the registry name as its username and two passwords. It is disabled by default. When enabled, it has full push and pull rights to the entire registry, it is shared by everyone who knows the password, it cannot be scoped to one repository, and it cannot be traced back to one app in the logs. Microsoft positions it for quick tests only. If you see a solution that enables the admin user and stores its password in an app setting or pipeline variable, treat it as the wrong answer whenever a more secure option is offered.",
   "The recommended approach uses a managed identity. A managed identity is an identity in Microsoft Entra ID that Azure creates and manages for a resource, with credentials you never see and never rotate yourself. You enable a system-assigned or user-assigned identity on the pulling resource, then assign that identity the AcrPull role on the registry. AcrPull is a built-in Azure RBAC (role-based access control) role that allows reading images and nothing else, which is least privilege for a running app. AcrPush adds pushing and is meant for build agents and pipelines, not for apps that only run images.",
   "```bash\n# 1. identity and role\naz identity create -g rg -n app-pull-id\nACR_ID=$(az acr show -n myregistry --query id -o tsv)\nPRINCIPAL=$(az identity show -g rg -n app-pull-id --query principalId -o tsv)\naz role assignment create --assignee $PRINCIPAL --role AcrPull --scope $ACR_ID\n\n# 2. tell Container Apps to use it for this registry\naz containerapp registry set -n orders -g rg \\\n  --server myregistry.azurecr.io --identity <identity-resource-id>\n```",
   "Each compute service wires this up slightly differently, and you should recognize all three. In Container Apps you configure the registry with `az containerapp registry set` and `--identity`, passing a user-assigned identity resource ID or the word `system`. In App Service you set the site property `acrUseManagedIdentityCreds` to true, plus `acrUserManagedIdentityID` with the client ID when you use a user-assigned identity. In AKS (Azure Kubernetes Service), `az aks update --attach-acr myregistry` grants AcrPull to the cluster's kubelet identity for you, so pods pull without any `imagePullSecrets`.",
   "Why is user-assigned often preferred for image pulls? A system-assigned identity is tied to the resource's life cycle: it does not exist until the app is created, and it is deleted with the app. On a brand-new app that creates a chicken-and-egg problem, because the first revision tries to pull its image before you have had a chance to assign AcrPull to an identity that did not exist a moment ago. A user-assigned identity is a standalone resource. You create it, grant it AcrPull, and then attach it to the app at creation time, so the very first pull succeeds. One identity can also be shared by several apps that pull from the same registry.",
   "Timing matters even when everything is configured correctly. Role assignments can take a few minutes to propagate, so a pull failure immediately after `az role assignment create` may resolve itself on the next retry. When troubleshooting, check three things in order: is an identity attached to the app, does that exact identity (by principal ID) hold AcrPull on the registry or a parent scope, and is the app configured to use that identity for this registry's login server.",
   "Other options exist, such as a service principal with a client secret or repository-scoped tokens, and they can be useful in special cases like an external system that has no managed identity. But they all involve secrets you must store, protect and rotate. With a managed identity plus AcrPull, there is nothing to leak, access is least privilege, and every pull is tied to a specific identity in the logs. On the exam, read every answer choice for the words 'admin user', 'password' or 'secret'. When a managed identity option with AcrPull is also present, those choices are distractors, and the remaining question is usually only whether the scenario favors a user-assigned or a system-assigned identity."
  ],
  "analogy": "The admin user is like one master key hidden under the doormat: anyone who finds it can enter every room, and the logbook just says 'master key'. A managed identity with AcrPull is a personal badge that opens only the stockroom for reading. The analogy has a timing twist the exam likes: a system-assigned badge is printed only after the employee is hired, so on day one they may wait at the door, while a user-assigned badge can be printed and approved before they arrive.",
  "terms": [
   [
    "Admin user",
    "A registry-wide account with shared passwords and full push/pull rights; disabled by default and meant only for testing."
   ],
   [
    "AcrPull",
    "A built-in Azure RBAC role that grants permission to pull images from a registry and nothing more."
   ],
   [
    "AcrPush",
    "A built-in role that allows both pushing and pulling images, suited to build pipelines."
   ],
   [
    "Managed identity",
    "A Microsoft Entra identity for an Azure resource whose credentials Azure manages and rotates automatically."
   ],
   [
    "User-assigned identity",
    "A managed identity created as its own resource, which can be granted roles before being attached to one or more apps."
   ],
   [
    "Kubelet identity",
    "The managed identity AKS nodes use to pull images; az aks update --attach-acr grants it AcrPull."
   ]
  ],
  "example": "A Container App failed to start with an image pull error after an engineer disabled the registry's admin user. The fix was to create a user-assigned managed identity, grant it AcrPull on the registry, attach it to the app and run az containerapp registry set with that identity. The app pulled successfully, and no registry password remained anywhere in its configuration.",
  "mistakes": [
   [
    "Give the app AcrPush or Contributor so it definitely can pull.",
    "Least privilege means AcrPull only. AcrPush is for build agents, and Contributor manages the registry itself."
   ],
   [
    "Enabling the admin user and storing its password in Key Vault makes it secure enough.",
    "The account is still shared, registry-wide and untraceable to one app. A managed identity with AcrPull removes the secret entirely."
   ],
   [
    "System-assigned identity always works on a new app's first deployment.",
    "It does not exist until the app is created, so the first pull can fail before AcrPull is granted. Pre-create a user-assigned identity instead."
   ],
   [
    "A pull failure right after assigning AcrPull means the configuration is wrong.",
    "Role assignments can take a few minutes to propagate; retry before changing anything."
   ]
  ],
  "tryit": [
   [
    "Your team deploys twenty new Container Apps a week from a template, all pulling from one registry. Security forbids registry passwords, and deployments keep failing on the first revision with unauthorized pulls before succeeding later. What design fixes this?",
    "Create one user-assigned managed identity, grant it AcrPull on the registry once, and have the template attach it and set it as the registry identity at creation. The identity already has its role, so the first pull succeeds without any password."
   ]
  ],
  "tip": "When asked for the most secure or least-privilege way for an app to pull images, answer managed identity plus AcrPull; eliminate choices that enable the admin user or store a password.",
  "check": [
   [
    "Which role should a Container App's identity receive to pull images, and on which scope?",
    "AcrPull on the container registry (or a narrower scope), because it grants read-only image access."
   ],
   [
    "Why can a user-assigned identity be easier than system-assigned for a new app's first image pull?",
    "It exists before the app, so AcrPull can be granted in advance; a system-assigned identity only exists after the app is created."
   ],
   [
    "What does az aks update --attach-acr do?",
    "It assigns the AcrPull role on the registry to the cluster's kubelet managed identity, so nodes pull images without imagePullSecrets."
   ]
  ]
 },
 {
  "t": "App Service custom containers on Linux: WEBSITES_PORT, continuous deployment and deployment slots",
  "hook": "Tomas at Oakridge Books has a Flask image that works perfectly on his laptop. He deploys it as a custom container on Azure App Service, opens the URL and waits. And waits. The log stream fills with lines saying the container did not respond to HTTP pings on the expected port, followed by a restart, then the same lines again. His manager also wants to stop deploying straight into production on Friday evenings and asks for a way to test each new image on a real URL before customers see it, with an instant way back if something breaks. One setting fixes the restarts, and one App Service feature answers the manager. Which ones are they?",
  "simple": "Azure App Service is a managed home for websites. Normally it supplies the programming language for you, but you can also hand it your own container, a packaged app. App Service then sits in front of your container like a receptionist, taking visitors on the usual web doors and passing them to your app. The receptionist must know which inside room your app is in, which is the port number, and you tell it with a setting called WEBSITES_PORT. App Service can also fetch your newest package automatically whenever you publish one. And it can run a practice copy of your site, called a deployment slot, so you can test a new version and then swap it with the live one in a moment, or swap back.",
  "body": [
   "Azure App Service, often called Web Apps, can run your own container image on Linux instead of a built-in language runtime. You keep App Service's managed features, such as custom domains, TLS (Transport Layer Security) certificates, autoscale, built-in authentication and deployment slots, while controlling the whole runtime through your Dockerfile. You create one by choosing a container as the publish option and pointing it at an image, for example `az webapp create --plan myplan --name orders-web -g rg --container-image-name myregistry.azurecr.io/orders-api:20260914.3`. This is a good middle ground when you want a familiar web hosting model but need a runtime or system package the built-in stacks do not provide.",
   "The first thing to get right is the port. App Service's front end receives traffic on ports 80 and 443 and forwards it to your container, so it needs to know which port your app listens on inside the container. It tries to detect common ports, but the reliable way is the app setting `WEBSITES_PORT`. If your gunicorn process binds to 8000, set `WEBSITES_PORT=8000`. A mismatch is one of the most common causes of a container that starts but never passes the startup check, which appears in the logs as the container not responding to HTTP pings on the expected port, followed by a restart loop. Note that the Dockerfile's `EXPOSE` line does not fix this; App Service reads the app setting.",
   "A few related settings appear in troubleshooting scenarios. `WEBSITES_CONTAINER_START_TIME_LIMIT` gives slow-starting containers more time before App Service gives up, which helps apps that load a large model or warm a cache at startup. `WEBSITES_ENABLE_APP_SERVICE_STORAGE` controls whether the shared `/home` storage is mounted into the container, which matters if your app expects files to persist across restarts. To watch what happens, stream logs with `az webapp log tail` after enabling container logging.",
   "```bash\naz webapp config appsettings set -g rg -n orders-web --settings WEBSITES_PORT=8000\naz webapp log tail -g rg -n orders-web\n```",
   "Continuous deployment for containers means App Service pulls the image and restarts automatically when a new image is pushed. In the Deployment Center you turn on continuous deployment, and App Service exposes a webhook URL. With Azure Container Registry (ACR), the portal can create a registry webhook for you, so a push to the configured repository and tag makes App Service pull the new image. Because the trigger is a push to one specific tag, this pattern typically uses a stable tag per environment, such as `staging`. The alternative is a CI/CD (continuous integration and continuous delivery) pipeline in GitHub Actions or Azure Pipelines that pushes a unique tag and then updates the app's image reference. That gives a clearer history of exactly which image ran when, at the cost of a little more pipeline setup.",
   "Deployment slots answer the 'test before production' requirement. A slot is a live app with its own host name, such as `orders-web-staging`, that shares the App Service plan with production. Slots require the Standard tier or higher. You deploy a new image to the staging slot, warm it up and test it at its own URL, then swap. A swap exchanges the slots' content and most settings, and App Service warms up the source slot before it routes production traffic to it, so users see no downtime. If something is wrong after the swap, you swap back and the previous version returns just as quickly.",
   "Not every setting should move during a swap, and this is a favorite exam detail. Settings marked as deployment slot settings, often called sticky settings, stay with their slot. That is how staging keeps its own database connection string and production keeps its own, even though the code and image move between them. You can also route a percentage of production traffic to a slot, which lets a small share of real users try the new version before a full swap.",
   "Finally, pull authentication follows the previous lesson. Prefer a managed identity with the AcrPull role and the `acrUseManagedIdentityCreds` site setting rather than registry passwords. Remember that each slot is its own resource with its own identity and settings, so a staging slot needs its own identity configuration and its own AcrPull access, or it will fail to pull even though production works."
  ],
  "analogy": "Deployment slots are like a theater with a rehearsal stage behind the curtain. The new cast rehearses fully lit on the back stage, then the stages rotate and the audience sees the new show without an intermission. If it goes badly, you rotate back. Sticky settings are the props bolted to each stage that never rotate. The analogy stops at the house: both stages share the same building and power, just as slots share one App Service plan and its capacity.",
  "terms": [
   [
    "WEBSITES_PORT",
    "An App Service app setting that tells the platform which port the custom container listens on."
   ],
   [
    "Continuous deployment (containers)",
    "A setting that makes App Service pull and restart when a registry webhook reports a new image for the configured tag."
   ],
   [
    "Deployment slot",
    "A separate live instance of an app with its own host name that can be swapped with production; requires Standard tier or higher."
   ],
   [
    "Slot setting",
    "An app setting or connection string marked sticky so it stays with its slot during a swap."
   ],
   [
    "Swap",
    "An operation that exchanges the content and non-sticky settings of two slots after warming up the source slot."
   ]
  ],
  "example": "A Flask image works locally on port 5000, but on App Service the log shows the site failing to respond to pings and restarting. Setting WEBSITES_PORT=5000 fixes it. The team then adds a staging slot, enables continuous deployment on it from the registry's staging tag, tests each new image there, and swaps into production when checks pass.",
  "mistakes": [
   [
    "Adding EXPOSE 8000 to the Dockerfile tells App Service which port to use.",
    "EXPOSE is only documentation. App Service uses the WEBSITES_PORT app setting to know where to forward traffic."
   ],
   [
    "Deployment slots are available on every App Service tier.",
    "They require Standard tier or higher."
   ],
   [
    "A swap moves every setting, so staging's connection string will end up in production.",
    "Settings marked as deployment slot settings are sticky and stay with their slot; mark environment-specific values that way."
   ],
   [
    "Webhook-based continuous deployment works best with a unique tag per build.",
    "The webhook fires for a push to the configured tag, so this pattern uses a stable tag per environment; a pipeline that updates the image reference suits unique tags."
   ]
  ],
  "tryit": [
   [
    "A team's image loads a 2 GB model file at startup and App Service keeps restarting it, even though WEBSITES_PORT is correct and the app works locally after about four minutes. What do you change?",
    "Increase WEBSITES_CONTAINER_START_TIME_LIMIT so App Service waits long enough for the container to start responding, and consider loading the model lazily to shorten startup."
   ],
   [
    "A retailer wants each new image tested on a real URL, then promoted to production with no downtime and an instant rollback. The staging database must never be used by production. What do you configure?",
    "A staging deployment slot (Standard tier or higher), with the database connection string marked as a deployment slot setting. Deploy to staging, test, then swap; swap back to roll back."
   ]
  ],
  "tip": "If a custom container starts but App Service reports it is not responding on the expected port, the fix is the WEBSITES_PORT app setting, not a Dockerfile EXPOSE change.",
  "check": [
   [
    "Your container listens on 8080 and App Service keeps restarting it. What should you set?",
    "The app setting WEBSITES_PORT=8080 so the front end forwards traffic to the port the app actually listens on."
   ],
   [
    "What minimum tier do deployment slots need, and how do you keep a staging-only connection string from moving during a swap?",
    "Standard or higher; mark the connection string as a deployment slot setting so it sticks to its slot."
   ],
   [
    "How does webhook-based continuous deployment from ACR know to update the app?",
    "A registry webhook calls App Service's deployment webhook when the configured repository and tag receive a push, and App Service pulls and restarts."
   ]
  ]
 },
 {
  "t": "Azure Container Apps: environments, ingress (external vs internal), secrets and managed identity",
  "hook": "Rosa is reviewing a design for Fernhill Market's new online grocery service. There is a public storefront, a pricing API, an orders API and a worker that drains a queue. The first draft gives all four a public internet address, stores the database password as plain text in an environment variable, and uses a connection string for the queue. The security architect, Ben, leaves one comment on the diagram: 'Why can a stranger on the internet call the orders API directly?' Rosa knows Azure Container Apps can keep back-end services private, hide secrets and drop connection strings altogether. How should each of the four apps be exposed, and where should their secrets live?",
  "simple": "Azure Container Apps runs your containers for you without you managing servers. Apps are grouped into an environment, which is like an office building: apps inside can talk to each other easily and share the same mailroom for logs. Ingress is the front door setting. An external front door faces the street, so anyone can visit. An internal door only opens to people already inside the building. No door at all suits an app that only reads its inbox, like a queue worker. Secrets are passwords kept in a locked drawer and handed to the app when it starts, instead of being written on the wall. And a managed identity is an ID badge that lets the app open other Azure services without carrying any password.",
  "body": [
   "Azure Container Apps is a serverless container platform built on Kubernetes and open-source components such as KEDA (Kubernetes Event-driven Autoscaling), Envoy and Dapr (Distributed Application Runtime), without exposing the Kubernetes API to you. You deploy container images and describe scaling and networking; Azure runs and patches the underlying cluster. It fits APIs, background processors and microservices that need to scale, including all the way down to zero replicas, and it is the default choice in many exam scenarios when a team wants containers without operating Kubernetes.",
   "Every container app lives in a Container Apps environment, a secure boundary around a group of apps. Apps in the same environment share a virtual network and write logs to the same Log Analytics workspace, and they can call each other by app name. You create one with `az containerapp env create`, optionally inside your own virtual network (VNet) so apps can reach private resources. As a design rule, put apps that communicate or share a life cycle in one environment, and use separate environments when you need isolation, for example between production and test.",
   "Ingress controls how HTTP or TCP traffic reaches your app, and it has three useful states. With ingress disabled, the app receives no inbound traffic at all, which suits queue workers that only pull messages. With external ingress, the app gets a fully qualified domain name (FQDN) reachable from outside the environment, which means the public internet, or only the VNet when the environment is configured with an internal load balancer. With internal ingress, the app is reachable only from inside its environment, for example from other container apps, which is the usual setting for back-end services. Alongside the mode you set the target port your container listens on, the transport (HTTP/1, HTTP/2 or TCP) and whether insecure HTTP is allowed or redirected.",
   "```bash\naz containerapp create -n orders -g rg --environment prod-env \\\n  --image myregistry.azurecr.io/orders-api:20260914.3 \\\n  --ingress internal --target-port 8000 \\\n  --secrets db-pass=$DB_PASS \\\n  --env-vars DB_PASSWORD=secretref:db-pass \\\n  --user-assigned <identity-resource-id>\n```",
   "Secrets are the second half of the design. They are defined at the app level, not per revision, and are available to every revision. You reference them from environment variables with the `secretref:` prefix, as in `DB_PASSWORD=secretref:db-pass` above, or mount them as files in a volume. The value never appears in the container configuration itself. One behavior surprises people: changing a secret's value does not create a new revision or restart existing replicas. Running replicas keep the old value until you restart the revision or deploy a new one, so a rotation plan must include that step.",
   "Rather than storing the value directly in the app, a secret can be a Key Vault reference. Container Apps then reads the value from Azure Key Vault using a managed identity that has permission to read secrets, such as the Key Vault Secrets User role. The secret's source of truth stays in Key Vault, where access is audited and rotation is managed, and the container app only holds a pointer. In the portal or in the app's YAML you would see the secret listed with a Key Vault secret URL and the identity used to read it, rather than a value. The `secretref:` environment variable that consumes it looks exactly the same, so your Python code reads `os.environ['DB_PASSWORD']` whether the secret is stored in the app or in Key Vault.",
   "Container Apps supports both system-assigned and user-assigned managed identities, and one identity can serve several purposes. The same identity can pull images from Azure Container Registry with AcrPull, read Key Vault secrets, and call data services such as Azure Cosmos DB or Azure Service Bus through `DefaultAzureCredential` in your Python code. With role assignments on each service, the app needs no connection strings at all, which is the most secure answer in most scenarios.",
   "Keep two concerns separate, because exam questions often blend them. Inbound ingress decides who can reach the app. Outbound identity decides what the app can reach. Making the orders API internal does not change what it can access, and giving it a managed identity does not change who can call it. For the opening design, the storefront gets external ingress, the pricing and orders APIs get internal ingress, the queue worker gets no ingress, and each app uses a managed identity with Key Vault references instead of plain-text passwords."
  ],
  "analogy": "A Container Apps environment is like an office building. External ingress is the lobby door on the street, internal ingress is an inner office door that only opens for people already in the building, and no ingress is a back room with no door that just receives mail from the mailroom (a queue). The analogy stops at outbound access: a door controls who comes in, but what an app may open elsewhere depends on its badge, the managed identity.",
  "terms": [
   [
    "Container Apps environment",
    "A boundary that groups container apps sharing a virtual network and Log Analytics workspace."
   ],
   [
    "External ingress",
    "Ingress that exposes the app outside the environment, to the internet or, with an internal environment, to the VNet."
   ],
   [
    "Internal ingress",
    "Ingress that makes the app reachable only from within its environment."
   ],
   [
    "secretref",
    "The prefix used in a container app environment variable to take its value from an app-level secret."
   ],
   [
    "Key Vault reference",
    "A container app secret whose value is read from Azure Key Vault using a managed identity."
   ],
   [
    "Target port",
    "The port the container listens on, to which ingress forwards traffic."
   ]
  ],
  "example": "A shop runs a public web front end and a private orders API. Both are container apps in one environment: the front end has external ingress on port 8000, and the orders API has internal ingress, so only the front end can call it by name. Each app has a user-assigned identity with AcrPull and Key Vault Secrets User, and database passwords are Key Vault references surfaced through secretref environment variables.",
  "mistakes": [
   [
    "Updating a secret value automatically restarts the app with the new value.",
    "Secrets are application-scope; changing one does not create a revision or restart replicas. Restart or deploy a new revision."
   ],
   [
    "A queue worker needs internal ingress so it can receive messages.",
    "Workers pull from the queue outbound. They need no ingress at all."
   ],
   [
    "Internal ingress also limits which Azure services the app can call.",
    "Ingress controls inbound traffic only. Outbound access is controlled by identity, roles and networking."
   ],
   [
    "Secrets are defined separately on each revision.",
    "Secrets are defined at the app level and are shared by all revisions."
   ]
  ],
  "tryit": [
   [
    "A team rotates a database password stored as a Container Apps secret. Ten minutes later, the app still fails to connect, and logs show it is using the old password. Nothing else changed. What happened, and what is the fix?",
    "Changing a secret value does not restart existing replicas, so they still hold the old value. Restart the active revision (or deploy a new revision) so replicas read the new secret; better still, use a Key Vault reference and plan restarts into rotation."
   ]
  ],
  "tip": "Back-end services that only other apps in the environment should call use internal ingress; queue-only workers need no ingress at all. Also remember that updating a secret does not by itself restart replicas.",
  "check": [
   [
    "What do apps in the same Container Apps environment share?",
    "A virtual network boundary and a Log Analytics workspace, and they can reach each other directly."
   ],
   [
    "How does a container read an app-level secret as an environment variable?",
    "Set the variable's value to secretref:<secret-name>, which injects the secret at runtime."
   ],
   [
    "Which ingress setting suits a back-end API that only other apps in the same environment call?",
    "Internal ingress, which makes it reachable only from within the environment."
   ]
  ]
 },
 {
  "t": "Container Apps revisions: single vs multiple revision mode, traffic splitting and labels",
  "hook": "Amara leads the search team at Willowbrook Travel, and the new ranking model is ready. The product owner wants it shown to one in ten visitors first, with the rest staying on the current version, so the team can compare bookings for a day. QA wants a fixed web address where they can always reach the new version, even when it gets no public traffic. And operations wants a one-command way back if error rates jump. Last time someone deployed a new image, every user switched over at once. Amara deploys the new image again, and this time nothing changes for anyone. Was the deployment lost, or is there a setting she has not used yet?",
  "simple": "Every time you change what is inside a container app, such as the image or its settings, Azure Container Apps saves a new numbered version called a revision. Old revisions stay on the shelf, so you can go back. In the normal mode, only the newest revision runs, and it takes over as soon as it is healthy. In multiple revision mode, several versions can run at once and you decide how visitors are shared between them, for example 90 out of 100 to the old one and 10 to the new one. A label is like a name tag, such as 'green', that you stick on one version so testers always have the same web address to visit it.",
  "body": [
   "A revision is an immutable snapshot of a container app's version, and understanding what creates one is the foundation of this topic. Each time you change a revision-scope setting, Container Apps creates a new revision with a generated name such as `orders--abc123`, or with a suffix you choose such as `orders--v2`. Revision-scope changes are anything under the app's `template` section: the container image, environment variables, CPU and memory, scale rules and health probes. Application-scope changes, such as ingress settings, secret values and registry credentials, apply to all revisions at once and do not create a new revision. If a question asks why changing a secret did not produce a new revision, this is the reason.",
   "Revisions are what let you roll forward and back safely. After an update, the old revision still exists, so you can reactivate it or send traffic back to it without rebuilding anything. You can list them with `az containerapp revision list` and see which are active, how much traffic each receives and when each was created. How many revisions can be active at the same time depends on the app's revision mode, and there are two.",
   "In single revision mode, which is the default, only one revision is active. When you deploy a change, Container Apps starts the new revision and, once it is ready, meaning its replicas pass their health probes, it shifts all traffic to it and deactivates the old one. You get zero-downtime updates without any traffic management on your part. If the new revision never becomes healthy, the old one keeps serving. This mode suits most apps that simply move forward version by version.",
   "In multiple revision mode, several revisions can be active at the same time, and you decide how ingress traffic is split among them using percentage weights that add up to 100. That enables two classic release patterns. In a blue-green deployment, the new revision gets 0 percent until it is tested, then 100 percent, with the old revision kept ready for a quick switch back. In a canary release, you send a small share, such as 10 or 20 percent, to the new revision and watch errors and latency before increasing it. Traffic splitting requires ingress to be enabled, because ingress is the component that distributes requests. A queue worker with no ingress cannot split traffic this way.",
   "```bash\naz containerapp revision set-mode -n orders -g rg --mode multiple\naz containerapp update -n orders -g rg --image myregistry.azurecr.io/orders-api:20260920.1 --revision-suffix v2\naz containerapp ingress traffic set -n orders -g rg \\\n  --revision-weight orders--v1=80 orders--v2=20\naz containerapp revision label add -n orders -g rg --label blue --revision orders--v1\n```",
   "Labels give a revision a stable, predictable URL. When you attach a label such as `green` to a revision, Container Apps creates an address based on the app's fully qualified domain name (FQDN) with `---green` added to the app name segment, and that address follows whichever revision holds the label. Testers can always reach the candidate at the green URL, even when it receives 0 percent of the main traffic. Later you can move the label to another revision, or swap labels between two revisions, which is a neat way to run blue-green releases. You can also split traffic by label weights instead of by revision names, so your traffic rules do not need to change when generated revision names do.",
   "There is one trap that explains the opening scene. In multiple revision mode, a new revision does not automatically receive traffic unless the traffic configuration says so. If your rules pin weights to named revisions, a newly deployed revision gets 0 percent and users see no change. The fix is to update the weights, or to configure traffic with the `latestRevision` option so the newest revision receives a given share. Deactivated revisions stop running replicas and cost nothing for compute, but they remain available for reactivation, which is your safety net.",
   "To answer exam questions quickly, sort the requirement first. Simple forward-only updates with no traffic control point to single revision mode. Any mention of percentages, canary, blue-green, A/B testing or comparing versions side by side points to multiple revision mode with traffic weights. A requirement for a fixed URL to a specific version points to a label. And a question about whether a change creates a new revision depends on whether the setting lives in the template (it does) or at the application level (it does not)."
  ],
  "analogy": "Revisions work like editions of a printed timetable. Single revision mode is a station that posts only the latest edition and takes the old one down once the new one is up. Multiple revision mode is a station that posts two editions side by side and tells nine out of ten passengers to read the old one. A label is a sticker saying 'trial edition' that can move to any copy. The analogy stops at secrets: changing the station's door code (app-scope) does not print a new edition at all.",
  "terms": [
   [
    "Revision",
    "An immutable snapshot of a container app's revision-scope configuration, created whenever the template changes."
   ],
   [
    "Single revision mode",
    "The default mode where one revision is active and a new revision replaces the old one once ready."
   ],
   [
    "Multiple revision mode",
    "A mode that keeps several revisions active and splits ingress traffic among them by weight."
   ],
   [
    "Revision label",
    "A named pointer to a revision that gives it a stable URL independent of its generated name."
   ],
   [
    "Revision-scope change",
    "A change under the template, such as image, environment variables, resources, probes or scale rules, that creates a new revision."
   ],
   [
    "Application-scope change",
    "A change such as ingress, secret values or registry settings that applies to all revisions without creating a new one."
   ]
  ],
  "example": "A team wants to test a new recommendation model on 10 percent of users. They switch the orders app to multiple revision mode, deploy the new image as revision v2, set traffic to v1=90 and v2=10, and label v2 as canary so QA can hit it directly. After a day of healthy metrics they move traffic to v2=100 and deactivate v1.",
  "mistakes": [
   [
    "Changing a secret value or ingress setting creates a new revision.",
    "Those are application-scope. Only template changes such as image, environment variables, resources, probes and scale rules create revisions."
   ],
   [
    "Single revision mode can split traffic for a canary if you set weights.",
    "Traffic splitting requires multiple revision mode, plus ingress enabled."
   ],
   [
    "In multiple revision mode a new deployment automatically gets traffic.",
    "It receives traffic only if the traffic rules give it a weight, for example through latestRevision or an updated split."
   ],
   [
    "Deactivated revisions are deleted and cannot be restored.",
    "They stop running replicas but remain available to reactivate."
   ]
  ],
  "tryit": [
   [
    "A team deploys a new revision of a public API in multiple revision mode. They want QA to test it for two days with no customer traffic, then switch everyone over in one step, keeping the old version ready for a quick return. What do you configure?",
    "Keep the old revision at 100 percent and the new at 0 percent, attach a label such as green to the new revision so QA uses its stable URL, then set weights to 0 and 100 when approved. To roll back, set the old revision back to 100 percent."
   ]
  ],
  "tip": "Traffic splitting, blue-green and canary scenarios require multiple revision mode; changing a secret or ingress setting never creates a new revision because those are application-scope.",
  "check": [
   [
    "Which kinds of changes create a new revision?",
    "Revision-scope changes in the template, such as image, environment variables, resources and scale rules; app-scope changes like secrets or ingress do not."
   ],
   [
    "What does a label add to a revision?",
    "A stable URL that follows the label, so you can test a specific revision directly regardless of traffic weights."
   ],
   [
    "Why can a Container App without ingress not use traffic splitting?",
    "Traffic splitting is performed by ingress, so without ingress there are no requests to distribute among revisions."
   ]
  ]
 },
 {
  "t": "Container Apps scaling: HTTP rules, KEDA event rules (for example Service Bus queue length), min/max replicas and scale to zero",
  "hook": "The flash sale at Pinecrest Outdoor starts at noon. By 12:03, the order queue holds thousands of messages and the single worker replica is crawling through them while customers wait for confirmation emails. By 2 a.m. the same night, the queue is empty, yet the finance dashboard shows the worker running at full size all night. Kenji, the developer on call, opens the Container App's scale settings and finds a CPU rule with a minimum of one replica and a maximum of three. Something about those settings explains both the slow afternoon and the wasted night. What should the worker scale on, and how low and high should it be allowed to go?",
  "simple": "Scaling means running more or fewer copies of your app depending on how busy it is. Each copy is called a replica. Azure Container Apps watches a signal you choose and adds copies when the signal is high and removes them when it is low. The signal can be web visitors waiting, messages waiting in a queue, or how hard the computer is working. You also set a minimum and a maximum number of copies. If the minimum is zero, the app can switch off completely when there is nothing to do, so you stop paying for it, but the first visitor after a quiet spell waits a moment while it wakes up. It is like a shop that opens more checkout lanes when the line grows and closes them when it is empty.",
  "body": [
   "Container Apps scales horizontally: it adds or removes replicas, which are running copies of a revision, based on scale rules you define. Scaling is driven by KEDA (Kubernetes Event-driven Autoscaling), which can watch HTTP load, TCP connections, CPU or memory, and dozens of event sources such as queues and streams. Each revision has its own scale settings, because scale settings are part of the revision template, so changing a scale rule creates a new revision. When you look at an app in the portal or run `az containerapp show`, you will find the rules under the template's scale section.",
   "Two numbers bound everything: minimum replicas and maximum replicas. With a minimum of 0, the app can scale to zero when there is no traffic or no pending events, and on the consumption profile you pay nothing for running replicas while idle. The trade-off is a cold start: the first request or message after an idle period waits while a replica starts. With a minimum of 1 or more, the app is always warm and responds immediately. The maximum caps cost and protects downstream systems, such as a database, from being overwhelmed by too many concurrent workers. Choosing these two numbers is often the real answer to a scaling question.",
   "An HTTP scale rule adds replicas based on concurrent HTTP requests per replica. If you set the concurrent request target to 50 and 400 requests are in flight, KEDA aims for about eight replicas, always within your minimum and maximum. If you define no rule at all on an app with ingress enabled, a default HTTP rule applies. TCP rules work the same way but count concurrent connections, which suits non-HTTP protocols. Lower targets mean more replicas sooner and lower latency per request; higher targets mean fewer, busier replicas and lower cost. The right value depends on how many requests one replica can handle comfortably, which you learn from load testing rather than guessing.",
   "Event-driven rules, also called custom rules, use a KEDA scaler for a specific event source. For an Azure Service Bus queue, the `azure-servicebus` scaler reads the queue's message count and scales so that each replica handles roughly the target number of messages. The rule needs metadata, namely the namespace, the queue name and the target message count, and it needs authentication. That can be a secret holding a connection string, as in the example below, or preferably a managed identity with permission to read the queue, which removes the stored secret.",
   "```bash\naz containerapp update -n order-worker -g rg \\\n  --min-replicas 0 --max-replicas 20 \\\n  --scale-rule-name sb-queue --scale-rule-type azure-servicebus \\\n  --scale-rule-metadata queueName=orders namespace=shop-sb messageCount=20 \\\n  --scale-rule-auth connection=sb-connection-secret\n```",
   "CPU and memory rules scale on resource utilization, which feels natural but has a key limitation: they cannot scale to zero. A replica must be running to report CPU or memory use, so at zero replicas there is no metric to trigger a scale-out. If scale to zero matters, use HTTP or event rules. When several rules exist on one app, Container Apps scales to satisfy whichever rule asks for the most replicas. Scale-in is not instant; it happens after a cooldown period so that short dips in load do not cause thrashing, which is the wasteful cycle of adding and removing replicas over and over.",
   "Design your worker with scaling in mind. Messages should be processed idempotently, meaning that handling the same message twice has the same effect as handling it once, because a replica might be removed mid-work and another replica will pick up the message after its lock expires. Keep each unit of work short or checkpoint progress. In a lab you can watch this behavior: send a burst of messages to the queue, run `az containerapp replica list` repeatedly and see the replica count climb, then fall back to zero after the queue empties and the cooldown passes.",
   "Back to the opening scene, the fix becomes clear. The worker has no ingress and processes a queue, so an `azure-servicebus` rule is the right signal, not CPU. A minimum of 0 removes the overnight cost, and a higher maximum, chosen with the database's capacity in mind, lets it absorb the noon burst. On the exam, read the scenario for the signal (web requests, queue length or resource use), the cost goal (scale to zero or always warm) and any downstream limit that sets the maximum."
  ],
  "analogy": "Scaling rules are like a supermarket manager opening checkout lanes. An HTTP rule counts shoppers in line per lane, and a queue rule counts baskets waiting at the click-and-collect desk. Minimum and maximum are the fewest and most lanes the store can staff. A CPU rule is like watching how tired the cashiers look: useful, but when the store is closed there are no cashiers to watch, which is why CPU rules cannot wake an app from zero.",
  "terms": [
   [
    "Replica",
    "One running instance of a container app revision; scaling changes the replica count."
   ],
   [
    "KEDA",
    "Kubernetes Event-driven Autoscaling, the open-source engine behind Container Apps scale rules."
   ],
   [
    "Scale to zero",
    "Running zero replicas when idle, possible with a minimum of 0 and HTTP or event-driven rules."
   ],
   [
    "Scaler",
    "A KEDA component that reads a metric from an event source, such as Service Bus message count, to drive scaling."
   ],
   [
    "Cold start",
    "The delay for the first request or message after idle while a replica starts from zero."
   ],
   [
    "Idempotent processing",
    "Handling a message so that processing it more than once has the same effect as processing it once."
   ]
  ],
  "example": "An order worker has no ingress and processes a Service Bus queue. It is configured with min 0, max 20 and an azure-servicebus rule targeting 20 messages per replica. Overnight it runs no replicas and costs almost nothing; during a flash sale, 400 queued messages bring it to 20 replicas, and it returns to zero once the queue drains.",
  "mistakes": [
   [
    "A CPU rule with minimum 0 lets a worker scale to zero overnight.",
    "CPU must be measured from a running replica, so CPU and memory rules cannot scale to zero. Use an HTTP or event rule."
   ],
   [
    "Setting a high maximum is always safe because you only pay for what you use.",
    "The maximum also protects downstream systems; too many workers can overwhelm a database or API."
   ],
   [
    "messageCount is the total queue length at which scaling starts.",
    "It is the target number of messages per replica; KEDA divides queue length by it to choose a replica count."
   ],
   [
    "With several rules, the app uses the first rule listed.",
    "It scales to satisfy whichever rule needs the most replicas."
   ]
  ],
  "tryit": [
   [
    "A customer-facing API must respond in under 200 ms at all times, including first thing in the morning, but traffic varies widely through the day. Cost matters, but latency matters more. How do you set minimum replicas and the rule?",
    "Use an HTTP scale rule with a sensible concurrency target and a minimum of at least 1, so there is never a cold start; set the maximum based on budget and downstream capacity. Scale to zero would save money but adds cold-start delay."
   ]
  ],
  "tip": "If a scenario demands scale to zero, rule out CPU and memory scale rules; use an HTTP rule for web traffic or a KEDA event rule such as azure-servicebus for queue workers, with min replicas set to 0.",
  "check": [
   [
    "Why can't a CPU scale rule scale an app to zero?",
    "CPU usage must be measured from a running replica, so at zero replicas there is no metric to trigger a scale-out."
   ],
   [
    "What does the messageCount metadata in an azure-servicebus scale rule mean?",
    "The target number of queued messages per replica; KEDA adds replicas as the queue length grows beyond that ratio."
   ],
   [
    "What happens when an app has both an HTTP rule and a Service Bus rule?",
    "It scales to whichever rule requires the most replicas, within the minimum and maximum."
   ]
  ]
 },
 {
  "t": "Container Apps jobs: manual, scheduled and event-driven",
  "hook": "Lucia runs the document assistant at Granite Legal, a retrieval app that answers questions from case files. Every new upload has to be split, embedded and stored as vectors, and the whole index needs a consistency check each night. Right now a container app runs around the clock with a loop that sleeps for a minute, checks for work and sleeps again. It costs money even when nobody uploads anything, a crash halfway through a document leaves no record, and the nightly check is a timer inside the code that drifted by an hour when the clocks changed. The work clearly has a beginning and an end. Is a long-running app really the right shape for it?",
  "simple": "Some programs should run all the time, like a shop that stays open waiting for customers. Others should start, finish one task and stop, like a delivery driver who takes a parcel, delivers it and goes home. Azure Container Apps jobs are for the second kind. A job runs your container until the work is done and then stops, and each run is called an execution. You choose how a job starts: by hand when you ask for it, on a timetable such as 2 a.m. every night, or automatically when work appears, such as new messages waiting in a queue. When the container finishes, it reports 'done' or 'failed' with a simple number called an exit code.",
  "body": [
   "A container app is designed to run continuously, or to scale to zero and wake on demand, and to serve requests or process a stream. Some work, though, should run to completion and stop: a nightly report, a database migration, an embedding batch that processes new documents for a retrieval application. Container Apps jobs are built for that. A job runs containers that start, do a finite piece of work and exit, and each run is called an execution. You stop paying when the work is done, and every run has its own record with a status.",
   "Jobs live in the same Container Apps environment as your apps. They share its networking and its Log Analytics workspace, and they support the same image pulls from Azure Container Registry, the same secrets and the same managed identities. A job can therefore use `DefaultAzureCredential` to reach Azure Cosmos DB, Azure Storage or Azure OpenAI just like an app. The main difference between jobs is the trigger type, and there are three: Manual, Schedule and Event.",
   "A manual job runs only when you start it, with `az containerapp job start` or the REST API. Use it for on-demand tasks, such as running a database migration as one step of a release pipeline, or when another service decides exactly when the work should happen. Starting a manual job returns an execution name you can track.",
   "A scheduled job runs on a cron expression, for example `0 2 * * *` for 2:00 every day. Container Apps cron expressions use the standard five-field format (minute, hour, day of month, month, day of week) and are evaluated in UTC (Coordinated Universal Time), so plan for time zones and daylight saving changes. A job meant to run at 2:00 local time in a region that is five hours behind UTC needs an hour field of 7, and that offset can shift with daylight saving. Use scheduled jobs for nightly cleanups, periodic re-indexing and reports.",
   "An event-driven job uses KEDA (Kubernetes Event-driven Autoscaling) scale rules, just like container app scaling, but instead of adding long-running replicas it starts new executions when events are waiting. For example, with an `azure-servicebus` rule, the job checks the queue at each polling interval and starts executions to process the waiting messages. Each execution typically processes one or a few messages and exits. This suits heavy, independent work items such as rendering a video or embedding a large document, where each item deserves its own clean container and its own success or failure record.",
   "```bash\naz containerapp job create -n nightly-embed -g rg --environment prod-env \\\n  --trigger-type Schedule --cron-expression \"0 2 * * *\" \\\n  --replica-timeout 1800 --replica-retry-limit 2 \\\n  --parallelism 1 --replica-completion-count 1 \\\n  --image myregistry.azurecr.io/embedder:20260920.1\naz containerapp job execution list -n nightly-embed -g rg -o table\n```",
   "A few settings control each execution, and they appear in the command above. The replica timeout is the maximum run time in seconds; a replica still running at that point is stopped and treated as failed. The retry limit sets how many times a failed replica is retried. Parallelism sets how many replicas run at once within one execution, and the replica completion count sets how many replicas must succeed for the execution to count as succeeded. Together they let you, for example, split a batch across several replicas and require all of them to finish.",
   "How does a job know whether it succeeded? Through the container's exit code. An exit code of 0 means success; anything else means failure and may trigger a retry up to the retry limit. That means your Python script should exit with a non-zero code when it cannot finish, for example by letting an unhandled exception end the process or calling `sys.exit(1)`, rather than catching the error, logging it and exiting normally. Logs go to the environment's Log Analytics workspace, and `az containerapp job execution list` shows the status of each run.",
   "The decision rule is short. Choose a job when the work has a clear end; choose a container app when it listens continuously. Then pick the trigger: Manual for on-demand runs started by a person or a pipeline, Schedule for cron-based timing in UTC, and Event for queue-driven work that KEDA watches for you."
  ],
  "analogy": "A container app is a 24-hour diner with staff always on shift; a job is a catering crew hired for one event that packs up and leaves when the plates are cleared. A manual job is a crew you call when you need one, a scheduled job is a standing booking every night at 2:00, and an event-driven job is a crew that shows up whenever orders pile up. The analogy stops at the clock: the standing booking is always written in UTC, not your local time.",
  "terms": [
   [
    "Container Apps job",
    "A Container Apps resource that runs containers to completion rather than continuously."
   ],
   [
    "Execution",
    "A single run of a job, containing one or more replicas that must finish successfully."
   ],
   [
    "Trigger type",
    "How a job starts: Manual, Schedule (cron) or Event (KEDA scale rules)."
   ],
   [
    "Replica timeout",
    "The maximum number of seconds a job replica may run before it is stopped and treated as failed."
   ],
   [
    "Parallelism",
    "The number of job replicas that run at the same time within one execution."
   ],
   [
    "Exit code",
    "The number a container process returns when it ends; 0 signals success and non-zero signals failure."
   ]
  ],
  "example": "A RAG application must embed newly uploaded documents. Uploads place a message on a Service Bus queue, and an event-driven Container Apps job with an azure-servicebus rule starts an execution for pending messages. Each execution embeds one document, writes vectors to Cosmos DB and exits with code 0, while a separate scheduled job re-checks the whole index every night at 02:00 UTC.",
  "mistakes": [
   [
    "Scheduled job cron expressions run in the region's local time.",
    "They are evaluated in UTC, so convert local times and account for daylight saving."
   ],
   [
    "An event-driven job adds long-running replicas like a scaled container app.",
    "It starts new executions that process work and exit; it does not keep replicas running."
   ],
   [
    "Catching every exception and exiting normally keeps a job healthy.",
    "Exiting with code 0 marks the run as succeeded even if work failed. Exit non-zero so the platform records failure and retries."
   ],
   [
    "A queue worker that needs to scale to zero must be a job.",
    "A container app with an event rule and min 0 can also scale to zero. Choose a job when each unit of work should run to completion as its own execution."
   ]
  ],
  "tryit": [
   [
    "During each release, a team must run a schema migration exactly once before the new app revision goes live. The release pipeline already controls the order of steps. Which job trigger fits, and how does the pipeline know the migration worked?",
    "A manual job, started by the pipeline with az containerapp job start. The pipeline checks the execution status, which reflects the container's exit code: 0 means success, so it continues; non-zero means failure, so it stops the release."
   ],
   [
    "A report must be generated at 06:00 New York time every weekday. A colleague writes the cron expression 0 6 * * 1-5. What is wrong?",
    "Container Apps job cron expressions are evaluated in UTC, so 0 6 means 06:00 UTC, which is early morning in New York. Convert 06:00 local time to UTC and remember the offset changes with daylight saving."
   ]
  ],
  "tip": "Run-to-completion work points to Container Apps jobs: pick Manual for on-demand, Schedule for cron-based timing (UTC), and Event for queue-driven work handled by KEDA.",
  "check": [
   [
    "What distinguishes a Container Apps job from a container app?",
    "A job runs containers that finish and exit, tracked as executions, while an app runs continuously or scales on demand to serve traffic."
   ],
   [
    "How does a job execution report failure?",
    "The container exits with a non-zero exit code, which marks the replica failed and may trigger retries up to the retry limit."
   ],
   [
    "What do parallelism and replica completion count control in a job?",
    "Parallelism sets how many replicas run at once; replica completion count sets how many must succeed for the execution to succeed."
   ]
  ]
 },
 {
  "t": "AKS basics for developers: Deployment and Service manifests, `kubectl apply`, requests and limits, ConfigMaps and Secrets, attaching ACR",
  "hook": "Sam just joined the platform team at Riverside Energy, which runs its billing services on Azure Kubernetes Service. On day two, a teammate hands over a ticket: the new invoice service is stuck. `kubectl get pods` shows three pods in ImagePullBackOff. Once that is fixed, two pods start but keep restarting, and the status column says OOMKilled. A reviewer also flags that the database password sits in a Kubernetes Secret and asks, 'That is encrypted, right?' Sam has seen YAML before but never had to read it under pressure. Three problems, three different parts of the manifest and cluster setup. Where should Sam look for each one?",
  "simple": "Kubernetes is a system that keeps your containers running across a group of computers, and AKS is Azure's managed version of it. You do not give it step-by-step orders. Instead you write a description of what you want, in a file, such as 'keep three copies of my app running', and Kubernetes keeps it that way. A Deployment describes the copies; a Service gives them one stable address so others can reach them. For each container you say how much computer power it needs and the most it may use. Settings go in a ConfigMap, and passwords go in a Secret, which is only lightly disguised, not locked. Finally, you give the cluster permission to download images from your private registry.",
  "body": [
   "Azure Kubernetes Service (AKS) is a managed Kubernetes cluster: Azure runs the control plane, including the API server, and your workloads run on node pools of virtual machines. Compared with Azure Container Apps you get the full Kubernetes API and more control over networking, scheduling and add-ons, and you also take on more responsibility for upgrades, capacity and configuration. As a developer you mostly write YAML manifests that describe desired state and let Kubernetes make it so, continuously comparing what is running with what you asked for.",
   "Two objects do most of the work. A Deployment describes a set of identical pods, where a pod is one or more containers scheduled together on the same node. It declares the image, the number of replicas and a label selector. Kubernetes keeps that many pods running, replaces any that fail, and performs a rolling update when you change the image, starting new pods before removing old ones. A Service gives those pods a stable virtual IP address and DNS (Domain Name System) name and load-balances across them by matching labels, because pod IP addresses change every time a pod is replaced. Type `ClusterIP`, the default, is reachable only inside the cluster; type `LoadBalancer` gets an Azure load balancer with an external IP.",
   "```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: orders\nspec:\n  replicas: 3\n  selector:\n    matchLabels: { app: orders }\n  template:\n    metadata:\n      labels: { app: orders }\n    spec:\n      containers:\n      - name: orders\n        image: myregistry.azurecr.io/orders-api:20260920.1\n        ports: [{ containerPort: 8000 }]\n        envFrom: [{ configMapRef: { name: orders-config } }]\n        resources:\n          requests: { cpu: 250m, memory: 256Mi }\n          limits: { cpu: 500m, memory: 512Mi }\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: orders\nspec:\n  type: ClusterIP\n  selector: { app: orders }\n  ports: [{ port: 80, targetPort: 8000 }]\n```",
   "Read the manifest from the top. In the Deployment, the selector's `app: orders` must match the template's labels, or the Deployment cannot find its pods. The Service selects the same label and maps its `port: 80` to the container's `targetPort: 8000`, so other pods in the namespace reach it by the name `orders` on port 80 without knowing the container port. The `envFrom` entry loads every key from the `orders-config` ConfigMap as environment variables.",
   "Deploying is declarative. First get credentials for the cluster with `az aks get-credentials`, which writes a kubeconfig entry for `kubectl`. Then `kubectl apply -f orders.yaml` sends the manifest to the API server, creating objects that do not exist and updating those that do. Follow with `kubectl rollout status deployment/orders` to watch the rolling update, `kubectl get pods` to see pod status, and `kubectl describe pod <name>` to read events, which is where you see messages such as an unauthorized response from the registry or a failed scheduling attempt.",
   "Resource requests and limits are set per container and do different jobs. Requests are what the scheduler reserves for a container when choosing a node: a node is chosen only if it has that much unreserved CPU and memory. Limits are the maximum the container may use. A container that exceeds its memory limit is killed, which shows as OOMKilled (out of memory), and then restarted; one that exceeds its CPU limit is throttled, meaning slowed down, not killed. In the example, `250m` means a quarter of a CPU core and `256Mi` means 256 mebibytes. Setting requests too high wastes nodes, and setting none makes scheduling unpredictable and autoscaling inaccurate.",
   "Configuration and secrets are kept out of the image. ConfigMaps hold non-sensitive configuration as key-value pairs, such as feature flags or endpoint names; Secrets hold sensitive values such as passwords. Both can be injected as environment variables or mounted as files. The important exam point is that Kubernetes Secrets are only base64-encoded, and that encoding is not encryption: anyone who can read the Secret object can decode it in a second. Restrict access with Kubernetes RBAC (role-based access control), and consider the Azure Key Vault provider for the Secrets Store CSI (Container Storage Interface) Driver, which pulls secrets from Azure Key Vault and mounts them into pods so the source of truth stays in Key Vault.",
   "Finally, nodes need permission to pull from your private Azure Container Registry. Run `az aks update -n mycluster -g rg --attach-acr myregistry`, or pass `--attach-acr` when creating the cluster. This grants the AcrPull role to the cluster's kubelet managed identity, the identity the nodes use when pulling images, so no `imagePullSecrets` and no registry passwords are needed. If pods show ImagePullBackOff with an unauthorized error, a missing attachment is the first thing to check, followed by a typo in the image name or tag."
  ],
  "analogy": "Requests and limits work like booking a hotel conference room. The request is the number of seats you reserve, and the hotel only gives you a room that has that many free. The limit is the fire code: go over the memory capacity and security removes you (OOMKilled), but go over the CPU allowance and the hotel just slows the coffee service (throttling). The analogy stops at sharing: unused reserved seats in Kubernetes can still be borrowed by other containers up to their limits.",
  "terms": [
   [
    "Deployment",
    "A Kubernetes object that keeps a specified number of identical pods running and manages rolling updates."
   ],
   [
    "Service",
    "A Kubernetes object that gives a set of pods, selected by labels, a stable IP, DNS name and load balancing."
   ],
   [
    "Requests and limits",
    "Per-container CPU and memory settings: requests are reserved for scheduling, limits cap usage."
   ],
   [
    "ConfigMap",
    "A Kubernetes object that stores non-secret configuration data for pods."
   ],
   [
    "Kubernetes Secret",
    "An object for sensitive data that is base64-encoded, not encrypted by that encoding, and should be access-controlled."
   ],
   [
    "OOMKilled",
    "The status of a container stopped because it exceeded its memory limit."
   ],
   [
    "--attach-acr",
    "An az aks option that grants the kubelet identity AcrPull on a registry so nodes can pull images without passwords."
   ]
  ],
  "example": "Pods for a new service sit in ImagePullBackOff. kubectl describe pod shows an unauthorized error from the registry. The developer runs az aks update --attach-acr, which grants AcrPull to the kubelet identity; after the next retry the pods start. Later, pods restart with OOMKilled, so the team raises the memory limit after checking actual usage.",
  "mistakes": [
   [
    "Base64 encoding means Kubernetes Secrets are encrypted.",
    "Base64 is reversible encoding. Protect Secrets with RBAC, encryption at rest and the Key Vault provider for the Secrets Store CSI Driver."
   ],
   [
    "A container over its CPU limit is killed like one over its memory limit.",
    "Exceeding the CPU limit causes throttling; exceeding the memory limit causes an OOMKill."
   ],
   [
    "Requests cap how much a container can use.",
    "Requests are what the scheduler reserves; limits are the cap."
   ],
   [
    "Fix ImagePullBackOff by putting the ACR admin password in an imagePullSecret.",
    "Use az aks update --attach-acr to grant AcrPull to the kubelet identity, with no stored password."
   ]
  ],
  "tryit": [
   [
    "A team wants other services inside the cluster to call the payments API at a fixed name, but the API must not be reachable from the internet. The Deployment is already running three pods labeled app: payments. What do you add?",
    "A Service of type ClusterIP with selector app: payments, mapping a port such as 80 to the container's port. ClusterIP is reachable only inside the cluster and gives the pods a stable DNS name."
   ],
   [
    "Pods of a reporting service restart every few hours with OOMKilled, and monitoring shows memory climbing to the limit before each restart. CPU is fine. What do you look at first?",
    "Compare actual memory usage with the memory limit. Raise the limit (and request) if the workload genuinely needs more, or fix a memory leak; changing the CPU limit will not help."
   ]
  ],
  "tip": "Requests drive scheduling and limits enforce caps (memory over the limit is OOMKilled, CPU is throttled); ACR access for AKS is az aks update --attach-acr, not an admin password in an imagePullSecret.",
  "check": [
   [
    "What is the difference between a Deployment and a Service?",
    "A Deployment runs and updates the pods; a Service gives those pods a stable network endpoint and load-balances to them by label."
   ],
   [
    "Is a Kubernetes Secret encrypted by being base64-encoded?",
    "No. Base64 is only an encoding; protection comes from RBAC, encryption at rest or using Key Vault through the CSI driver."
   ],
   [
    "What is the difference between a ClusterIP and a LoadBalancer Service?",
    "ClusterIP is reachable only inside the cluster; LoadBalancer provisions an Azure load balancer with an external IP."
   ]
  ]
 },
 {
  "t": "Cosmos DB for NoSQL with the Python SDK (azure-cosmos): CosmosClient, create/upsert/read/delete items, parameterized queries",
  "hook": "It is Monday morning at Lakeside Outfitters, a fictional online gear shop, and Priya on the platform team is staring at a dashboard full of red. The order service is logging dozens of 409 Conflict errors, and a few customers have emails saying their order failed even though the warehouse already packed it. Overnight, the queue redelivered a batch of messages, and every repeat insert blew up. Meanwhile, a security reviewer has flagged a query built with an f-string from a search box. Two small coding choices are causing both problems. Which SDK methods and query style would have kept this service calm?",
  "simple": "Cosmos DB is a database that stores small JSON documents, a bit like a huge filing cabinet of index cards. Each card has a name (its id) and a drawer label (its partition key). The Python library, called azure-cosmos, gives you one main object, CosmosClient, that opens the cabinet. You make it once and keep using it. Then you can add a card (create), add or overwrite a card (upsert), fetch one card when you know its name and drawer (read), or throw a card away (delete). When you search, you hand the search words over separately instead of gluing them into the question, the same way a librarian writes your request on a form instead of letting you scribble on the catalog itself.",
  "body": [
   "Azure Cosmos DB for NoSQL is a globally distributed database that stores JSON documents called items. The resource model is a simple hierarchy: items live in containers, containers live in databases, and databases live in an account. Every item has an `id` and a value for the container's partition key, and together those two values uniquely identify the item. The same `id` can appear in two different partitions, which surprises people the first time they see it. In Python, you work with all of this through the `azure-cosmos` package, alongside `azure-identity` for authentication.",
   "Everything starts with `CosmosClient`. Create one per application and reuse it for the life of the process, because the client maintains connection pools and caches account and container metadata. Creating a new client for every request is a common performance mistake that shows up as slow first calls and wasted connections. For authentication, prefer Microsoft Entra ID: pass a credential such as `DefaultAzureCredential()`, which uses a managed identity when the code runs in Azure and your developer sign-in when it runs on your laptop. The identity also needs a Cosmos DB data plane role assignment, such as the built-in data contributor role, to read and write items. Account keys also work, but they are long-lived secrets that you would have to store, rotate and protect, so exam answers that remove secrets usually favor Entra ID with a managed identity.",
   "```python\nfrom azure.cosmos import CosmosClient\nfrom azure.identity import DefaultAzureCredential\n\nclient = CosmosClient(ACCOUNT_ENDPOINT, credential=DefaultAzureCredential())\ncontainer = client.get_database_client(\"shop\").get_container_client(\"orders\")\n\norder = {\"id\": \"o-1001\", \"customerId\": \"c-42\", \"total\": 59.90, \"status\": \"new\"}\ncontainer.create_item(order)          # fails with 409 Conflict if id+pk exists\norder[\"status\"] = \"paid\"\ncontainer.upsert_item(order)          # insert or replace\nitem = container.read_item(item=\"o-1001\", partition_key=\"c-42\")\ncontainer.delete_item(item=\"o-1001\", partition_key=\"c-42\")\n```",
   "The write methods look similar but behave differently, and the exam tests the differences. `create_item` inserts a new item and raises a conflict error (HTTP 409) if an item with the same id already exists in that partition. `replace_item` overwrites an existing item and fails with not found (HTTP 404) if it does not exist. `upsert_item` does either, inserting when the item is missing and replacing when it is present, which makes it the natural choice for idempotent processing where a message might arrive twice. `patch_item` changes specific fields, such as setting `status` or incrementing a counter, without sending the whole document, which saves bandwidth and avoids overwriting fields another writer just changed. `delete_item` removes an item and, like `read_item`, needs both the id and the partition key value.",
   "Reads deserve special attention. `read_item` takes the id and the partition key value and goes straight to the one item, with no query engine involved. This is called a point read, and it is the cheapest operation in Cosmos DB, costing about 1 Request Unit (RU) for a 1 KB item. If your code already knows an item's id and partition key, a point read always beats a query that filters on the id. A common distractor is a query like `SELECT * FROM c WHERE c.id = @id`, which returns the same item but costs more.",
   "When you do need a query, Cosmos DB for NoSQL uses a SQL-like language over JSON, where `c` is a conventional alias for each item in the container. Always pass user input as parameters rather than building the query string with concatenation or f-strings. Parameters prevent injection, because the value is never interpreted as part of the query text, and they let the service treat values consistently and reuse query plans. Each parameter is a dictionary with a `name` that starts with `@` and a `value`.",
   "```python\nitems = container.query_items(\n    query=\"SELECT c.id, c.total FROM c WHERE c.customerId = @cust AND c.total > @min\",\n    parameters=[{\"name\": \"@cust\", \"value\": \"c-42\"}, {\"name\": \"@min\", \"value\": 20}],\n    partition_key=\"c-42\")\nfor row in items:\n    print(row[\"id\"], row[\"total\"])\n```",
   "Supplying `partition_key` to `query_items` keeps the query inside a single logical partition, which is fast and predictable. Without it, you must pass `enable_cross_partition_query=True`, and the query fans out to every physical partition, costing more RUs as the container grows. The results come back as an iterable that pages through the data for you, so you can loop over it without loading everything into memory at once. You can confirm what an operation costs by checking the `x-ms-request-charge` response header that the SDK exposes after each call.",
   "Errors surface as `CosmosHttpResponseError` (from `azure.cosmos.exceptions`) with a `status_code` you can branch on: 404 when an item is not found, 409 on a duplicate create, 412 when an optimistic concurrency check on an ETag fails, and 429 when you exceed provisioned throughput. The SDK retries 429 responses automatically a limited number of times, honoring the retry-after hint, so persistent 429s mean you need more throughput or a better partition key, not more retry loops in your own code. Finally, for asyncio applications such as FastAPI services, the async client in `azure.cosmos.aio` offers the same operations with `await`, and it should also be created once and closed cleanly when the app shuts down."
  ],
  "analogy": "Think of Cosmos DB like a post office with millions of PO boxes. The partition key is the box number and the id is the name on the letter. A point read is walking straight to box 42 and pulling out the letter addressed to Ana: quick and cheap. A query without the partition key is asking the clerk to check every box in the building. The analogy stops working for writes: create_item, unlike a real mailbox, refuses a second letter with the same name in the same box.",
  "terms": [
   [
    "CosmosClient",
    "The azure-cosmos entry point that connects to an account; create one and reuse it for the app's lifetime."
   ],
   [
    "Upsert",
    "An operation that inserts an item if it does not exist or replaces it if it does."
   ],
   [
    "Point read",
    "Reading one item by id and partition key with read_item, the cheapest Cosmos DB operation (about 1 RU for 1 KB)."
   ],
   [
    "Parameterized query",
    "A query whose values are passed separately as @name parameters instead of string concatenation."
   ],
   [
    "CosmosHttpResponseError",
    "The SDK exception carrying an HTTP status code such as 404, 409, 412 or 429."
   ],
   [
    "Cross-partition query",
    "A query without a partition key that fans out to all partitions; requires enable_cross_partition_query=True in Python."
   ]
  ],
  "example": "An order service calls create_item for each incoming order and occasionally receives the same message twice from its queue, which raises 409 Conflict. The team switches to upsert_item, making processing idempotent, and replaces a string-built query with a parameterized one that includes the customer's partition key, cutting RU cost and closing an injection risk. They also move CosmosClient creation out of the request handler into app startup, which removes slow cold calls.",
  "mistakes": [
   [
    "Creating a new CosmosClient inside every request handler is fine because clients are lightweight.",
    "The client holds connection pools and metadata caches. Create one per application and reuse it; per-request clients waste connections and add latency."
   ],
   [
    "read_item only needs the item id.",
    "read_item and delete_item need both the id and the partition key value, because the same id can exist in different partitions."
   ],
   [
    "replace_item and upsert_item are interchangeable.",
    "replace_item fails with 404 if the item does not exist; upsert_item inserts it instead. Choose upsert for idempotent processing."
   ],
   [
    "A query filtering on c.id is just as efficient as read_item.",
    "Queries go through the query engine and cost more RUs. When you know id and partition key, a point read is cheapest."
   ]
  ],
  "tryit": [
   [
    "Your function processes payment events from a queue that guarantees at-least-once delivery. Each event should create or update a payment document keyed by payment id, with the customer id as partition key. Occasionally the same event arrives twice, and today the second attempt throws an exception and lands in the poison queue. Which SDK method should you call, and why?",
    "Use upsert_item. It inserts the document the first time and replaces it with identical content on a duplicate, so the handler becomes idempotent and no 409 Conflict is raised. create_item is what causes the current failures, and replace_item would fail with 404 on the first delivery."
   ],
   [
    "A teammate writes query_items with the query string built as an f-string that includes a product name typed by the user, and no partition key. The container is partitioned by /category, and the user always picks a category first. What two changes do you recommend?",
    "Pass the product name as an @parameter in the parameters list to prevent injection, and pass partition_key set to the chosen category so the query stays in one partition instead of fanning out with enable_cross_partition_query=True."
   ]
  ],
  "tip": "read_item always needs both item id and partition key; create_item fails on duplicates while upsert_item does not, replace_item fails if the item is missing, and cross-partition queries need enable_cross_partition_query=True.",
  "check": [
   [
    "Which method should you use for idempotent writes where a message might be processed twice?",
    "upsert_item, because it inserts or replaces without failing when the item already exists."
   ],
   [
    "Why use parameters in query_items instead of f-strings?",
    "Parameters prevent query injection and let the service treat values safely and consistently."
   ],
   [
    "What status code does create_item return when the id already exists in that partition?",
    "409 Conflict, surfaced in Python as a CosmosHttpResponseError with status_code 409."
   ]
  ]
 },
 {
  "t": "Partition key design: high cardinality, even spread, point reads; hierarchical partition keys",
  "hook": "At Northwind Chat, a fictional messaging startup, Leo is on call when a celebrity joins a public room and invites a million fans. Within minutes, the app logs a wall of HTTP 429 Too Many Requests errors, but only for that one room. The Azure portal says the container is using less than a third of its provisioned throughput. Everyone else's rooms are quiet and fine. Leo's manager asks the obvious question: how can the database be throttling when it has capacity to spare? The answer was decided months ago, in one line of code, when someone chose `/roomId` as the partition key.",
  "simple": "Cosmos DB splits your data into many piles so it can grow without limit. The partition key is the label that decides which pile each document goes into, like sorting mail by last name. A good label has lots of different values, so the piles stay small and evenly busy. A bad label, like 'country' when most customers live in one country, puts most of the mail in one pile, and the worker at that pile gets swamped while others sit idle. You pick the label when you create the container, and you cannot change it later without moving all the data. If one customer is so big their pile overflows, you can use a two- or three-part label, like last name plus first name, to split it further.",
  "body": [
   "Cosmos DB scales out by partitioning, and understanding the two kinds of partition is the key to every design question. Every item's partition key value places it in a logical partition, which is simply the set of all items that share that value. Cosmos DB then groups logical partitions onto physical partitions, the internal units that each have their own storage and their own share of the container's provisioned throughput. You never manage physical partitions directly; the service splits and moves them as data and throughput grow. What you control is the partition key path, such as `/customerId`, chosen when you create the container.",
   "That choice is permanent. The partition key cannot be changed on an existing container; to use a different key you create a new container and migrate the data into it, for example with the change feed or a container copy job. That makes the partition key the most important design decision in Cosmos DB, and it is why exam scenarios give you clues about data volume and access patterns and then ask which property to use.",
   "The first goal is high cardinality: many distinct values, so data and load can spread across many logical and physical partitions. A key like `/country` with a handful of values, or `/status` with three values such as new, paid and shipped, is poor, because all the items for one value must live together in one logical partition. A key like `/userId` or `/deviceId` with millions of values is usually good, because the service can distribute those values widely.",
   "The second goal is an even spread of both storage and requests. If one value is far busier than the others, its partition becomes a hot partition. Requests to it are throttled with HTTP 429 even though the container as a whole has spare throughput, because provisioned throughput is divided across physical partitions rather than pooled for whichever one is busiest. In Azure Monitor you would see this as high normalized RU consumption on one partition key range while the overall average looks low. Storage matters too: a single logical partition is limited to 20 GB, so any key where one value could collect unbounded data, such as a date used for all tenants or one huge tenant, is risky.",
   "The third goal is to choose a key your most frequent reads can supply. A point read with id and partition key costs about 1 Request Unit (RU) for a 1 KB item. A query that filters on the partition key stays inside one partition. A query without it fans out to every partition and costs more as the container grows. So look at your dominant access pattern. If the app nearly always loads data per user, `/userId` fits. If it loads one order at a time by order id and rarely queries across orders, making `/id` the partition key can be ideal, because every lookup becomes a point read and cardinality is as high as it can be.",
   "Sometimes no single property satisfies all three goals. A multitenant software as a service (SaaS) app partitioned by `/tenantId` gets efficient per-tenant queries, but it suffers when one large tenant exceeds 20 GB or dominates traffic. Hierarchical partition keys, also called subpartitioning, solve this by letting you define up to three levels, such as `/tenantId`, then `/userId`, then `/sessionId`. Data for one tenant can then span multiple physical partitions, while queries that filter on the tenant, a prefix of the hierarchy, are still routed only to the partitions that hold that tenant rather than to the whole container. In the Python SDK you declare this with a list of paths and `kind=\"MultiHash\"`, and point reads pass the full list of values.",
   "```python\nfrom azure.cosmos import PartitionKey\ndb.create_container(\n    id=\"events\",\n    partition_key=PartitionKey(path=[\"/tenantId\", \"/userId\"], kind=\"MultiHash\"))\ncontainer.read_item(item=\"e1\", partition_key=[\"contoso\", \"u-77\"])\n```",
   "An older workaround is a synthetic key: a property you compute by concatenating values, for example `tenantId-userId`, or by appending a random or calculated suffix to spread writes. It still works and you may see it in existing systems, but it pushes complexity into your application code, and queries by tenant alone can no longer be routed efficiently. Hierarchical partition keys are now the cleaner answer when a question mentions a large tenant exceeding the logical partition limit.",
   "When you read an exam scenario, test each candidate key against the three goals in order. Does it have many values? Will storage and traffic spread evenly, with no single value able to exceed 20 GB? Can the most common reads supply it? The key that passes all three is the answer, and if the obvious key fails only because one tenant is too large, reach for a hierarchical key."
  ],
  "analogy": "Picture a supermarket with many checkout lanes, where the store assigns shoppers to lanes by the first letter of their surname. If almost everyone is named Smith, one lane has a huge line while cashiers elsewhere stand idle, even though the store has plenty of total capacity. That is a hot partition. A hierarchical key is like splitting the S lane by first name too. The analogy breaks in one way: in Cosmos DB you cannot reassign the lanes later without rebuilding the store.",
  "mnemonic": "Good keys are C-S-R: Cardinality (many values), Spread (even storage and requests, nothing near 20 GB), Reads (your frequent queries can supply it).",
  "terms": [
   [
    "Logical partition",
    "All items sharing one partition key value; limited to 20 GB of storage."
   ],
   [
    "Physical partition",
    "An internal unit of storage and throughput that hosts many logical partitions; managed by the service."
   ],
   [
    "Cardinality",
    "The number of distinct values a partition key has; high cardinality spreads data and load."
   ],
   [
    "Hot partition",
    "A partition receiving a disproportionate share of requests, causing 429 throttling despite spare total throughput."
   ],
   [
    "Hierarchical partition key",
    "A partition key of up to three levels, such as tenant then user, that lets one top-level value span physical partitions."
   ],
   [
    "Synthetic partition key",
    "A computed property, such as a concatenation of values or a suffix, used as the partition key."
   ]
  ],
  "example": "A chat app partitioned messages by /roomId. One popular room caused 429 errors while other rooms were idle, and it was approaching the 20 GB logical partition limit. The team created a new container with a hierarchical key of /roomId then /userId and migrated with the change feed. Load spread out, and queries filtered by roomId still target only that room's partitions.",
  "mistakes": [
   [
    "You can edit the partition key path later in the container settings if it turns out to be wrong.",
    "The partition key cannot be changed in place. You create a new container with the new key and migrate the data."
   ],
   [
    "If you get 429 errors, the container needs more total RU/s.",
    "When total usage is low but one partition is saturated, the problem is a hot partition. Fix the key design; adding throughput spreads across partitions and may not help the hot one enough."
   ],
   [
    "Low-cardinality keys like /status are fine because queries by status are common.",
    "Few distinct values concentrate data and traffic into few logical partitions, risking hot partitions and the 20 GB limit."
   ],
   [
    "Hierarchical partition keys mean queries must always supply every level.",
    "Queries that supply a prefix, such as tenantId alone, are still routed efficiently to only the relevant partitions."
   ]
  ],
  "tryit": [
   [
    "An IoT platform stores telemetry from 2 million devices. Engineers proposed /deviceType (five values) so dashboards can query by type. Most reads, however, fetch the latest readings for one device by device id. Which partition key do you recommend?",
    "Use /deviceId. It has very high cardinality, spreads writes evenly across devices, and the dominant read pattern supplies it, so reads stay in one partition. /deviceType has only five values and would create hot partitions and hit the 20 GB logical limit quickly."
   ],
   [
    "A SaaS knowledge base uses /tenantId. One enterprise tenant now holds 25 GB of documents and generates most of the traffic, while small tenants are fine. Queries almost always filter by tenant and often by user. What should you do?",
    "Move to a new container with a hierarchical partition key such as /tenantId then /userId, migrating the data. The large tenant can then span physical partitions beyond 20 GB, and tenant-filtered queries are still routed efficiently."
   ]
  ],
  "tip": "The winning partition key has high cardinality, even request and storage distribution and appears in most queries; when one tenant outgrows 20 GB, think hierarchical partition keys.",
  "check": [
   [
    "Why is /status (new, paid, shipped) a poor partition key for orders?",
    "It has very low cardinality, so data and traffic concentrate in a few logical partitions, causing hot partitions and size limits."
   ],
   [
    "Can you change a container's partition key after creation?",
    "No. You must create a new container with the new key and migrate the data, for example with the change feed."
   ],
   [
    "How many levels can a hierarchical partition key have?",
    "Up to three, such as /tenantId, /userId and /sessionId."
   ]
  ]
 },
 {
  "t": "Request Units: point reads vs queries, indexing policy include/exclude paths, consistency levels and their RU cost",
  "hook": "The finance lead at Bluebird Learning, a fictional online tutoring company, forwards you the monthly Azure bill with one line highlighted: Cosmos DB costs have tripled since the team launched its new document search feature. Nobody added traffic on purpose. You open a sample response in the debugger and notice a header called `x-ms-request-charge` showing that saving one lesson document costs dozens of units, and reading one by id costs several more than it should. The account is also set to Strong consistency because someone thought stronger sounded safer. Where is the money actually going, and which settings can you change today?",
  "simple": "Cosmos DB charges for work in a single made-up currency called Request Units, or RUs. Reading one small document when you know exactly where it is costs about one RU, like grabbing a book from a shelf when you know its spot. Searching the whole library costs much more. Every time you save a document, Cosmos DB also updates its index, which is like a book's back-of-the-book index; if you index every word, every save takes longer and costs more. You can tell it to skip fields you never search. Finally, asking for the very freshest, most guaranteed-correct answer from every copy of your data (strong consistency) costs about double for reads, so only pay for it when you truly need it.",
  "body": [
   "Cosmos DB measures every operation in Request Units (RUs), a single currency that blends CPU, memory and input/output (I/O). Instead of sizing servers, you provision throughput as RU per second, either manual or autoscale, or you choose serverless mode and pay for the RUs you actually consume. If your requests exceed your provisioned RU/s in a given second, Cosmos DB rate-limits them with HTTP 429 and a retry-after hint, and the SDK waits and retries a limited number of times. Every response reports its cost in the `x-ms-request-charge` header. In the Python SDK you can read it from the last response headers on the client connection after each call, so you can measure rather than guess, and it is worth logging during development.",
   "The baseline for every comparison is a point read: reading one 1 KB item by id and partition key costs about 1 RU. Writes cost more than reads because the item must be stored, replicated and indexed, and bigger items cost more for both. Queries vary widely. Their cost grows with the number of items scanned, the size of the result, the complexity of filters and system functions, and whether the query spans partitions. A query that returns exactly one item can easily cost several times a point read of that same item, because it still passes through the query engine and index lookups. So the cheapest design reads by id and partition key wherever possible, and uses queries only when you genuinely need to search.",
   "The indexing policy is the biggest lever on write cost. By default, Cosmos DB indexes every property of every item, expressed as the include path `/*`. That default is friendly, because any filter you write later is fast, but it makes each write pay to update many index entries. If you never filter or sort on a large field, such as a long document body or an embedding array with hundreds of numbers, exclude that path. You can also reverse the approach: exclude `/*` and include only the specific paths you query, as in this policy.",
   "```json\n{\n  \"indexingMode\": \"consistent\",\n  \"includedPaths\": [ { \"path\": \"/customerId/?\" }, { \"path\": \"/status/?\" } ],\n  \"excludedPaths\": [ { \"path\": \"/*\" } ],\n  \"compositeIndexes\": [[ { \"path\": \"/status\" }, { \"path\": \"/orderDate\", \"order\": \"descending\" } ]]\n}\n```",
   "A few path rules are worth memorizing. A path ending in `/?` indexes a single scalar value, such as a string or number, at that location. A path ending in `/*` indexes everything below that point, including nested objects and array elements. Composite indexes list two or more paths with an order and support efficient ORDER BY on several properties, as well as some filters combined with sorting; without one, a multi-property ORDER BY query fails or becomes expensive. Setting `indexingMode` to `none` disables indexing entirely, which suits a pure key-value workload that only ever does point reads. Changing the indexing policy is allowed on an existing container; Cosmos DB transforms the index in the background.",
   "Consistency is the other cost lever, and it is set at the account level. The five levels, from strongest to weakest, are Strong, Bounded Staleness, Session, Consistent Prefix and Eventual. Strong guarantees every read sees the latest committed write. Bounded Staleness allows reads to lag by a configured number of versions or a time interval. Session, the default, guarantees that a client always reads its own writes and sees them in order, which fits most applications. Consistent Prefix guarantees reads never see writes out of order, and Eventual guarantees only that replicas converge over time.",
   "Those guarantees have a price. Strong and Bounded Staleness make reads cost roughly twice as many RUs as the weaker levels, because each read is served by a quorum of replicas rather than a single one. Strong also adds write latency in multi-region accounts, because writes must be acknowledged across regions. Session, Consistent Prefix and Eventual reads cost about the same as each other. You set the default level on the account, and a client can request a weaker level for its connection or for individual requests, but never a stronger one than the account default.",
   "When an exam question asks how to reduce RU consumption, look for these levers in order. First, replace queries by id with point reads. Second, include the partition key in query filters so queries stay in one partition. Third, exclude unqueried paths, especially large text fields and vectors, from the index to lower write cost. Fourth, relax consistency from Strong or Bounded Staleness to Session if the scenario allows it. Each of these changes reduces the charge you will see in `x-ms-request-charge`, and none of them requires buying more throughput."
  ],
  "analogy": "Request Units work like a taxi meter that charges for effort rather than distance. Being driven to a known address (a point read) is a short, cheap ride. Asking the driver to cruise every street looking for a house with a red door (a query) runs the meter much longer. Indexing every field is like insisting the driver update a map after every trip. The analogy breaks for consistency: paying double for Strong is less like a faster taxi and more like waiting for several drivers to agree on the route.",
  "mnemonic": "Consistency levels from strongest to weakest: Some Big Sharks Can Eat, for Strong, Bounded Staleness, Session, Consistent Prefix, Eventual.",
  "terms": [
   [
    "Request Unit (RU)",
    "The normalized cost unit for Cosmos DB operations; a 1 KB point read costs about 1 RU."
   ],
   [
    "x-ms-request-charge",
    "The response header reporting how many RUs an operation consumed."
   ],
   [
    "Indexing policy",
    "Container settings that choose which paths are indexed, the indexing mode and composite or vector indexes."
   ],
   [
    "Composite index",
    "An index over multiple properties with sort order, needed for efficient ORDER BY on several fields."
   ],
   [
    "Session consistency",
    "The default level, guaranteeing that a client reads its own writes within its session."
   ],
   [
    "HTTP 429",
    "The status returned when requests exceed provisioned throughput; clients should retry after the indicated delay."
   ]
  ],
  "example": "A document store saw high RU charges on every write. Checking x-ms-request-charge showed large inserts costing far more than expected because the default policy indexed a big text field and every element of a 1536-number embedding. Excluding those paths cut write cost sharply, and switching reads from a query by id to read_item brought read charges down to about 1 RU each. Relaxing the account from Strong to Session roughly halved the remaining read charges.",
  "mistakes": [
   [
    "A query that returns a single item costs the same as a point read.",
    "Queries go through the query engine and index lookups, so they usually cost several times a 1 KB point read. Use read_item when you know id and partition key."
   ],
   [
    "Indexing everything is free because it only affects reads.",
    "The default /* policy makes every write update index entries for every property. Excluding unqueried large paths lowers write RUs."
   ],
   [
    "A client can request Strong consistency even if the account default is Session.",
    "Clients can only relax consistency below the account default, never strengthen it."
   ],
   [
    "All consistency levels cost the same; only latency differs.",
    "Strong and Bounded Staleness reads cost roughly double because they use a quorum of replicas."
   ]
  ],
  "tryit": [
   [
    "A product catalog container stores items with a 20 KB marketing description that is displayed but never searched. Filters only use category and price, and the team sorts by price then rating. Writes are expensive and a sort by price and rating fails. What indexing changes do you make?",
    "Exclude /* (or at least /description/?) and include /category/? and /price/?, and add a composite index on price and rating with the needed sort orders. Writes stop paying for the large field, and the multi-property ORDER BY becomes efficient."
   ],
   [
    "A single-region analytics dashboard reads aggregated documents that are updated every few minutes. The account uses Strong consistency, and read RU charges are high. Users do not mind seeing data that is a minute old. What change reduces cost?",
    "Change the account default consistency to Session (or a weaker level), which roughly halves read RU cost compared with Strong. The scenario tolerates slightly stale data, so the stronger guarantee is not worth paying for."
   ]
  ],
  "tip": "Strong and Bounded Staleness reads cost about double; excluding unused paths lowers write RUs; a point read beats any query. Clients can relax consistency per request but cannot strengthen it beyond the account default.",
  "check": [
   [
    "How can you lower the RU cost of writes for items with a large text field that is never filtered?",
    "Exclude that path in the indexing policy so writes do not maintain index entries for it."
   ],
   [
    "Which consistency levels roughly double read RU cost?",
    "Strong and Bounded Staleness, because reads require a quorum of replicas."
   ],
   [
    "What does a path ending in /? index, compared with one ending in /*?",
    "/? indexes a single scalar value at that path; /* indexes everything beneath it."
   ]
  ]
 },
 {
  "t": "Cosmos DB vector search: container vector policy (path, data type, dimensions, distance function), vector indexes (flat, quantizedFlat, diskANN) and VectorDistance()",
  "hook": "Tomas at Riverbend Appliances, a fictional home-goods maker, is building a support assistant that answers questions from 40,000 pages of product manuals. His first prototype sends every manual chunk to a separate vector database, then joins the results back to product records in Cosmos DB, and the two systems keep drifting out of sync. A teammate asks why they cannot just keep the embeddings inside the same Cosmos DB items. Tomas tries, creates a container, inserts vectors and runs a similarity query, and it is slow and expensive. What did he forget to configure before he loaded a single item?",
  "simple": "An embedding is a long list of numbers that captures the meaning of a piece of text, so that texts with similar meanings get similar lists. Vector search means finding the stored lists closest to the list for your question. Cosmos DB can do this inside the same documents you already store. To make it work, you first tell the container where the numbers live in each document, what kind of numbers they are, how many there are, and how to measure closeness. Then you add a special vector index, like adding a map that groups similar items together so the database does not have to compare against everything. Finally you ask, in a query, for the five items closest to your question.",
  "body": [
   "Embedding models turn text or images into vectors: long arrays of numbers where items with similar meanings sit close together in a high-dimensional space. Vector search finds the stored items whose vectors are nearest to a query vector. Cosmos DB for NoSQL can store embeddings inside the same JSON items as your operational data and search them, so a retrieval-augmented generation (RAG) app does not need a separate vector database to keep in sync. The feature must be enabled on the account first, through the vector search capability for the NoSQL API, before containers can use vector policies.",
   "Vector search needs two pieces of configuration on the container, and both are exam favorites. The first is the container vector policy, also called the vector embedding policy, which describes each embedding property. It has four settings. The `path` says where the vector lives in each item, for example `/embedding`. The `dataType` sets the element type, such as `float32`, or smaller types like `int8` and `uint8` that save space when your model supports them. The `dimensions` value is the length of the array, which must match your embedding model's output length exactly. The `distanceFunction` is how closeness is measured: `cosine`, `dotproduct` or `euclidean`. Use the distance function your embedding model was designed for; cosine is the common default for text embeddings. The vector policy is set when you create the container, so plan it up front, including any second embedding path if you will store more than one kind of vector.",
   "The second piece is a vector index in the container's indexing policy, listed under `vectorIndexes` with the same path and a type. There are three types, and choosing among them is a scale and accuracy decision. `flat` does exact brute-force search over full-precision vectors. It gives perfect recall, meaning it always finds the true nearest neighbors, but it supports only a limited number of dimensions and gets expensive as data grows, so it fits small datasets or cases where exact results matter. `quantizedFlat` compresses vectors through quantization and still scans them, trading a little accuracy for lower cost and supporting larger dimensions. `diskANN` builds a graph-based approximate nearest neighbor (ANN) index developed by Microsoft Research, giving low latency and cost at large scale with high but not perfect recall.",
   "As a rule of thumb for scenario questions: small or exact needs point to flat, moderate size points to quantizedFlat, and large scale with many items and strict latency targets points to diskANN. Here is a complete configuration for a 1536-dimension text embedding with cosine distance and a diskANN index.",
   "```json\n\"vectorEmbeddingPolicy\": { \"vectorEmbeddings\": [\n  { \"path\": \"/embedding\", \"dataType\": \"float32\", \"dimensions\": 1536, \"distanceFunction\": \"cosine\" } ] },\n\"indexingPolicy\": {\n  \"includedPaths\": [ { \"path\": \"/*\" } ],\n  \"excludedPaths\": [ { \"path\": \"/embedding/*\" } ],\n  \"vectorIndexes\": [ { \"path\": \"/embedding\", \"type\": \"diskANN\" } ] }\n```",
   "Notice that the embedding path is excluded from the regular range index with `/embedding/*`. By default Cosmos DB would index every number in the array as an ordinary property, which would make every write expensive in Request Units (RUs) and add no value, because nobody filters on the 712th element of an embedding. The vector index handles similarity search on that path instead. Forgetting this exclusion is a common cause of surprisingly high write charges in vector workloads.",
   "You query with the system function `VectorDistance()`, which takes the item's vector property and a query vector and returns a similarity score. Combine it with `TOP` to limit results and `ORDER BY VectorDistance(...)` to get the k nearest items first. Because the query is ordinary NoSQL query language, you can add WHERE filters on metadata such as category, language or tenant in the same statement, which is one of the main advantages of keeping vectors next to operational data. Pass the query vector as a parameter, just like any other value.",
   "```python\nresults = container.query_items(\n    query=\"SELECT TOP 5 c.id, c.text, VectorDistance(c.embedding, @q) AS score \"\n          \"FROM c WHERE c.category = @cat ORDER BY VectorDistance(c.embedding, @q)\",\n    parameters=[{\"name\": \"@q\", \"value\": query_vector}, {\"name\": \"@cat\", \"value\": \"manuals\"}],\n    enable_cross_partition_query=True)\n```",
   "Always use `TOP` with vector queries so the engine does not score and return every item, which would waste RUs and time. For cosine and dot product, a higher score means more similar, and the ORDER BY on VectorDistance returns the most similar items first regardless of which distance function you chose. If the container is partitioned by a value you can supply, such as tenant, pass the partition key to keep the search inside one partition; otherwise enable cross-partition queries as in the example. Finally, remember that the dimension count is tied to the model: if you change embedding models, you will typically need a new container or a new vector path and a re-embedding job."
  ],
  "analogy": "Imagine a huge library where every book is placed on a map so that books on similar subjects sit near each other. The vector policy is the rule for where each book's map coordinates are written and how distance on the map is measured. A flat index is walking past every shelf to measure each book's distance: exact but slow in a big library. diskANN is a network of signposts that quickly leads you to the right neighborhood, though it can occasionally miss a book just around the corner.",
  "mnemonic": "Vector policy fields: Please Don't Disturb Dolphins, for Path, DataType, Dimensions, DistanceFunction.",
  "terms": [
   [
    "Embedding",
    "A fixed-length numeric vector produced by a model that represents the meaning of text or an image."
   ],
   [
    "Vector embedding policy",
    "Container setting that defines each vector path, data type, dimension count and distance function."
   ],
   [
    "flat index",
    "An exact, brute-force vector index with perfect recall, suited to small datasets and limited dimensions."
   ],
   [
    "quantizedFlat index",
    "A vector index that compresses vectors and scans them, lowering cost with a small accuracy trade-off."
   ],
   [
    "diskANN index",
    "A graph-based approximate nearest neighbor index designed for low latency at large scale."
   ],
   [
    "VectorDistance()",
    "The Cosmos DB query function that returns the similarity score between two vectors."
   ]
  ],
  "example": "A support chatbot stores product manual chunks in Cosmos DB with a 1536-dimension float32 embedding, cosine distance and a diskANN index, and excludes /embedding/* from range indexing. For each question it embeds the text and runs SELECT TOP 5 with VectorDistance and a WHERE filter on product line, then feeds the five chunks to the model.",
  "mistakes": [
   [
    "The dimensions value can be any number; Cosmos DB will pad or truncate vectors.",
    "Dimensions must match the embedding model's output length exactly, for example 1536 for a model that returns 1536 numbers."
   ],
   [
    "The vector index replaces the need to exclude the embedding from the range index.",
    "Both are needed: add the vector index and exclude the embedding path (for example /embedding/*) from the regular index to avoid expensive writes."
   ],
   [
    "diskANN always returns the exact nearest neighbors.",
    "diskANN is approximate with high but not perfect recall. flat is the exact option."
   ],
   [
    "You can pick any distance function and get the same results.",
    "Use the distance function the embedding model was designed for; cosine, dotproduct and euclidean can rank results differently for unnormalized vectors."
   ]
  ],
  "tryit": [
   [
    "A legal startup stores about 5,000 clause embeddings and must always return the exact nearest matches for compliance reasons. Latency is not critical and the data will not grow much. Which vector index type fits?",
    "flat. It performs exact brute-force search with perfect recall, and the dataset is small enough that scanning every vector is affordable, provided the dimension count is within flat's supported limit."
   ],
   [
    "A retailer plans to store tens of millions of product embeddings and needs low-latency similarity search for a shopping assistant. A small loss of recall is acceptable. Their prototype used flat and is getting slow and costly. What should they choose, and what else should they check in the indexing policy?",
    "Use a diskANN vector index, which is designed for large-scale, low-latency approximate search. Also confirm the embedding path is excluded from the regular range index so writes do not index every vector element."
   ]
  ],
  "tip": "Dimensions in the vector policy must match the embedding model output; choose flat for small exact search, quantizedFlat for mid-size and diskANN for large scale, and exclude the vector path from the regular index.",
  "check": [
   [
    "Which four properties describe a vector in the container vector policy?",
    "The path, the data type, the number of dimensions and the distance function (cosine, dotproduct or euclidean)."
   ],
   [
    "Why include TOP in a VectorDistance query?",
    "To limit the result to the k nearest items; without it the query would score and return far more items and cost more RUs."
   ],
   [
    "Why exclude /embedding/* from the range index?",
    "Indexing every element as an ordinary property makes writes expensive and adds no value; the vector index handles similarity search."
   ]
  ]
 },
 {
  "t": "Change feed: change feed processor with a lease container, Azure Functions Cosmos DB trigger, latest-version mode vs all versions and deletes",
  "hook": "Aisha maintains the internal knowledge assistant at Cedar Valley Health, a fictional clinic network. A nurse files a ticket: the assistant keeps quoting a medication guideline that was deleted from the knowledge base last week. Aisha checks the Azure Function that keeps the vector index in sync. It fires reliably whenever an article is created or edited, and the logs show it never once saw the deletion. A second function her colleague added for audit logging also seems to be missing about half the edits. Nothing is crashing, yet the system is quietly wrong. What is the change feed not telling these functions, and why?",
  "simple": "The change feed is a running list of what changed in a Cosmos DB container, like a security camera recording every time someone adds or edits a document. Instead of repeatedly asking 'anything new?', your code just watches the recording from where it last stopped. A helper, often an Azure Function, does the watching for you and keeps a bookmark in a separate container called the lease container, so it never loses its place. By default, the recording shows only the newest version of each document and does not show deletions, so people usually mark a document as deleted instead of removing it right away. A special mode can record deletions too, but it needs extra backup settings turned on.",
  "body": [
   "The change feed is a persistent, ordered record of changes to items in a Cosmos DB container. Instead of polling with queries such as 'give me everything modified since 10:05', your code reads what changed since it last looked, and Cosmos DB keeps track of the position for you. It is the backbone of event-driven patterns in this domain: updating a search or vector index when documents change, generating embeddings for new items, keeping a cache or a materialized view in sync, replicating data to another container, or triggering downstream workflows. One property matters for correctness: changes are ordered within each partition key value, but not across partitions, so do not assume a global order.",
   "The change feed has two modes, and the difference is a favorite exam topic. Latest version mode is the default. It delivers the latest version of each created or updated item. If an item changes several times between reads, you may see only its latest state rather than every intermediate edit, and deletes do not appear at all, because a deleted item simply has no latest version to deliver. The usual workaround is a soft delete: instead of deleting, set a flag such as `deleted: true`, which is an update the feed sees, and let a time to live (TTL) setting remove the item later. Your consumer sees the flagged update and removes the item from the search index or cache.",
   "All versions and deletes mode records every change, including intermediate versions and deletes, along with metadata about each operation such as whether it was a create, replace or delete. It is the right answer when a scenario requires an audit trail or must react to hard deletes. It has prerequisites: the account must use continuous backup, and you can only read changes that are within the continuous backup retention window. If a question mentions capturing deletes without changing application behavior, look for this mode and its continuous backup requirement.",
   "Reading the feed reliably at scale is harder than it sounds, because a container has many partitions and consumers can crash. The change feed processor is a library feature in the .NET and Java SDKs, and the same design is reused by Azure Functions, that solves this. It has four parts. The monitored container is the container whose changes you read. The lease container stores checkpoints, recording how far each partition range has been processed, and coordinates which instance owns which range. The compute instances are the hosts running the processor, each with a unique instance name. The delegate is your handler code that receives and processes each batch of changes.",
   "The lease container is what makes the processor resilient. When you add instances, leases are rebalanced so the work spreads out across them; if an instance fails, another takes over its leases and resumes from the last checkpoint. Because a batch can be redelivered if an instance fails after processing but before checkpointing, processing is at least once. Make handlers idempotent, for example by using upsert rather than create when writing results.",
   "For Python developers, the most common way to consume the change feed is the Azure Functions Cosmos DB trigger, which runs a change feed processor for you and scales it with the function app. You supply the connection setting name, the database, the monitored container and the lease container, and the function receives a list of changed documents. The `create_lease_container_if_not_exists` option creates the lease container on first run, which is convenient in development; in production many teams create it explicitly with a partition key of `/id`.",
   "```python\nimport azure.functions as func\napp = func.FunctionApp()\n\n@app.cosmos_db_trigger(arg_name=\"docs\", connection=\"CosmosConn\",\n    database_name=\"kb\", container_name=\"chunks\",\n    lease_container_name=\"leases\", create_lease_container_if_not_exists=True)\ndef embed_new_chunks(docs: func.DocumentList):\n    for d in docs:\n        if not d.get(\"embedding\"):\n            ...  # call embedding model, upsert vector\n```",
   "A common trap appears when several independent functions monitor the same container, such as one that generates embeddings and another that writes an audit log. Each needs its own lease state. Share one lease container but give each function a different lease prefix, or use separate lease containers. If two functions share the same leases, they compete for ownership as if they were instances of one processor, and each sees only part of the changes, which looks like randomly missing events.",
   "Finally, the Python SDK can read the feed directly with `container.query_items_change_feed()`, where you manage continuation tokens yourself and decide where to start, such as from the beginning or from now. This pull model gives full control and suits batch jobs or scripts, but you take on the checkpointing and scaling work that the processor and the Functions trigger would otherwise handle for you."
  ],
  "analogy": "The change feed is like a shared reading list with bookmarks. Each reader (a function) keeps a bookmark in the lease container so they can pick up where they stopped, even after a break. If two different book clubs try to share one bookmark, each club ends up skipping chapters the other read, which is why each needs its own prefix. The analogy stops working for deletes: in latest version mode, a torn-out page simply vanishes from the list rather than leaving a note.",
  "mnemonic": "Change feed processor parts: My Lazy Cat Dozes, for Monitored container, Lease container, Compute instances, Delegate.",
  "terms": [
   [
    "Change feed",
    "An ordered, persistent log of creates and updates (and, in one mode, deletes) to a Cosmos DB container."
   ],
   [
    "Change feed processor",
    "A library feature that reads the change feed across partitions with checkpointing, load balancing and failover."
   ],
   [
    "Lease container",
    "A container that stores change feed checkpoints and partition ownership for processors and Functions triggers."
   ],
   [
    "Latest version mode",
    "The default change feed mode that returns the latest state of changed items and does not include deletes."
   ],
   [
    "All versions and deletes mode",
    "A change feed mode that records every change, including deletes, and requires continuous backup."
   ],
   [
    "Soft delete",
    "Marking an item as deleted with a flag, so the feed sees an update, and removing it later with TTL."
   ]
  ],
  "example": "A knowledge base must keep its vectors current. A Python function with a Cosmos DB trigger listens to the chunks container, and for each new or edited chunk it calls the embedding model and upserts the vector. Deleted articles were not disappearing from search, so the team changed deletion to set deleted: true with a TTL, which the latest version mode feed delivers as an update. When a second audit function was added, they gave it its own lease prefix so both functions receive every change.",
  "mistakes": [
   [
    "The default change feed includes deletes.",
    "Latest version mode does not include deletes. Use a soft delete with TTL, or all versions and deletes mode, which requires continuous backup."
   ],
   [
    "Two functions can share the same lease container and settings without issues.",
    "They would compete for the same leases and each would see only part of the changes. Give each a different lease prefix or a separate lease container."
   ],
   [
    "The change feed guarantees a global order of all changes.",
    "Order is guaranteed only within a partition key value, not across partitions."
   ],
   [
    "Processing is exactly once, so handlers do not need to be idempotent.",
    "The processor delivers at least once; a batch can be redelivered after a failure, so handlers must tolerate duplicates."
   ]
  ],
  "tryit": [
   [
    "Your compliance team requires a record of every change to customer consent documents, including hard deletes made by an admin tool you cannot modify. The current Azure Function uses the default change feed mode. What do you change, and what must be true of the account?",
    "Switch to all versions and deletes mode, which records every intermediate change and deletes with operation metadata. The account must use continuous backup, and changes can only be read within the continuous backup retention window. Soft delete is not an option because the admin tool cannot be changed."
   ],
   [
    "A team has one function that embeds new documents. They add a second function on the same container to refresh a Redis cache, reusing the same lease container and settings. Afterward, both functions seem to miss roughly half the changes. What is wrong and how do you fix it?",
    "Both functions share the same lease documents, so they act like two instances of one processor and split the partitions between them. Give the second function a different lease prefix (or its own lease container) so each tracks its own checkpoints and receives every change."
   ]
  ],
  "tip": "Deletes are invisible in latest version mode; answer with soft delete plus TTL, or all versions and deletes mode (which needs continuous backup). Two functions on one container need separate lease prefixes or containers.",
  "check": [
   [
    "What is stored in the lease container?",
    "Checkpoints and ownership records that track how far each partition range has been processed and by which instance."
   ],
   [
    "How can you capture deletions if you must stay on latest version mode?",
    "Use a soft delete flag that the feed sees as an update, and remove the item later with TTL."
   ],
   [
    "Why must change feed handlers be idempotent?",
    "Delivery is at least once, so a batch may be processed again after an instance failure."
   ]
  ]
 },
 {
  "t": "Azure Database for PostgreSQL flexible server: allow-listing and enabling the vector (pgvector) extension",
  "hook": "Marcus at Pine Street Insurance, a fictional regional insurer, has a straightforward task on his sprint board: add semantic search to the claims database so adjusters can find similar past claims. He has done this on his own laptop a dozen times. He connects to the new Azure Database for PostgreSQL flexible server, types the familiar statement to enable pgvector, and gets an error saying the extension is not allow-listed. He is the server admin, so permissions should not be the problem. His standup is in twenty minutes. What does a managed server need from him before it will accept that one line?",
  "simple": "PostgreSQL is a popular database, and pgvector is an add-on that teaches it to store and search embeddings, the number lists that capture meaning. On your own computer you can switch on add-ons freely. Azure's managed PostgreSQL is more careful, like an apartment building that only lets you install appliances from an approved list. First you add the add-on to the approved list in a server setting called azure.extensions. Then, inside each database that needs it, you run one command to switch it on. Note that the add-on is named 'vector' inside the database, even though everyone calls the project pgvector.",
  "body": [
   "Azure Database for PostgreSQL flexible server is Azure's managed PostgreSQL service. Azure handles operating system and database patching, automated backups with point-in-time restore, optional zone-redundant high availability, and scaling of compute and storage, while you get standard PostgreSQL that works with psycopg, SQLAlchemy and every other PostgreSQL tool. That compatibility matters for AI work, because many applications already keep customers, orders, policies or claims in PostgreSQL. pgvector lets them add vector search to that same database instead of introducing a new system.",
   "pgvector is an open-source PostgreSQL extension that adds a `vector` data type, distance operators for comparing vectors, and approximate nearest neighbor (ANN) indexes. On a server you run yourself, you install the extension files and run `CREATE EXTENSION vector;` as a superuser. On a managed flexible server, you do not get superuser access, and there is an extra step that is exactly what the exam tests: extensions must be allow-listed before anyone can create them.",
   "Step one is allow-listing. Flexible server has a server parameter named `azure.extensions` that lists which extensions users are permitted to create. You add `VECTOR` to it in the Azure portal under Server parameters, with the Azure command-line interface (CLI), or in an infrastructure-as-code template. If you skip this step, `CREATE EXTENSION vector` fails with an error saying the extension is not allow-listed, no matter which role you connect as. The parameter holds a comma-separated list, so when you add VECTOR be careful to keep any extensions already listed; setting the value to only VECTOR removes the others from the allow list. A few extensions also need to be added to `shared_preload_libraries`, which requires a server restart, but pgvector does not, so allow-listing it takes effect without downtime.",
   "```bash\naz postgres flexible-server parameter set -g rg --server-name pg-ai \\\n  --name azure.extensions --value VECTOR\n# keep existing entries: use a comma-separated list, for example VECTOR,PG_TRGM\n```",
   "Step two is creating the extension in each database that will use it. Extensions in PostgreSQL are per database, not per server, so a server with an `app` database and a `reporting` database needs the statement run in each one that will store or query vectors. Connect to the target database with a role that has permission, which on flexible server means the server admin or a member of the `azure_pg_admin` role, and run the statement. Note that the extension's SQL name is `vector`, even though the project is called pgvector; `CREATE EXTENSION pgvector` fails because no extension by that name exists. You can verify the result, and see the installed version, by querying the `pg_extension` catalog.",
   "```sql\nCREATE EXTENSION IF NOT EXISTS vector;\nSELECT extname, extversion FROM pg_extension WHERE extname = 'vector';\n```",
   "Once the extension exists, the surrounding configuration determines whether your app can reach the server securely and whether vector queries perform well. For connectivity, flexible server offers public access protected by firewall rules, or private access through virtual network (VNet) integration or a private endpoint, which keeps traffic off the public internet. For authentication, flexible server supports Microsoft Entra ID, so your app's managed identity can request an access token with `DefaultAzureCredential` and present it as the password when connecting. That removes stored database passwords from your configuration, although an Entra administrator must first be set on the server and a database role mapped to the identity.",
   "Sizing matters for vector workloads. Approximate nearest neighbor indexes, especially HNSW (Hierarchical Navigable Small World), perform best when the index fits in memory, so choose a compute tier with enough RAM for your vectors and indexes. Building those indexes is memory-intensive too, and raising the `maintenance_work_mem` parameter for the session that builds them can shorten build times considerably.",
   "When you troubleshoot, read the error text carefully, because each failure points to a different step. An error saying the extension is not allow-listed means the server parameter is missing VECTOR. An error saying the extension is not available or does not exist usually means a typo, such as `pgvector` instead of `vector`. An error saying `type vector does not exist` when creating a table means you are connected to a database where the extension was never created. A permission error means the role you connected with is neither the server admin nor a member of `azure_pg_admin`.",
   "A related extension, `azure_ai`, lets SQL call Azure AI services directly, for example to create embeddings inside the database as rows are inserted or to call language services from a query. It follows the same allow-listing rule, which makes the pattern worth remembering as a general rule for any extension on flexible server: first allow-list it in `azure.extensions`, then run `CREATE EXTENSION` in each database that needs it."
  ],
  "analogy": "Think of flexible server as a managed apartment building. The building manager keeps an approved appliance list (azure.extensions); until a dishwasher is on that list, no tenant can install one, even the tenant with the most keys. Once it is approved, each apartment (database) still has to install its own dishwasher (CREATE EXTENSION). Approving it once for the building does not put one in every unit, which is the part people forget.",
  "terms": [
   [
    "Flexible server",
    "The deployment option of Azure Database for PostgreSQL that offers managed PostgreSQL with configurable compute, HA and networking."
   ],
   [
    "azure.extensions",
    "The server parameter that allow-lists which extensions may be created on a flexible server."
   ],
   [
    "pgvector",
    "An open-source PostgreSQL extension, created as vector, that adds a vector type, distance operators and ANN indexes."
   ],
   [
    "azure_pg_admin",
    "A role on flexible server whose members can perform administrative actions such as creating allow-listed extensions."
   ],
   [
    "shared_preload_libraries",
    "A server parameter for extensions that must load at startup; changing it requires a restart (not needed for pgvector)."
   ],
   [
    "azure_ai",
    "An extension that lets SQL call Azure AI services, such as generating embeddings; it must also be allow-listed."
   ]
  ],
  "example": "A developer runs CREATE EXTENSION vector on a new flexible server and receives an error that the extension is not allow-listed. They add VECTOR to the azure.extensions server parameter, keeping the existing PG_TRGM entry, reconnect to the app database and run the statement again, which succeeds. A colleague later finds the type missing in a second database and learns that extensions must be created in each database.",
  "mistakes": [
   [
    "As server admin, you can create any extension without further setup.",
    "On flexible server, the extension must first be allow-listed in the azure.extensions parameter, regardless of role."
   ],
   [
    "Running CREATE EXTENSION once makes it available in every database on the server.",
    "Extensions are per database; run CREATE EXTENSION vector in each database that needs it."
   ],
   [
    "The SQL statement is CREATE EXTENSION pgvector.",
    "The extension's SQL name is vector, so the statement is CREATE EXTENSION vector."
   ],
   [
    "Enabling pgvector requires adding it to shared_preload_libraries and restarting the server.",
    "pgvector only needs allow-listing in azure.extensions; no preload or restart is required."
   ]
  ],
  "tryit": [
   [
    "A DevOps engineer scripts the server setup with az postgres flexible-server parameter set --name azure.extensions --value VECTOR. Afterward, the application's fuzzy name search breaks with an error that pg_trgm is not allow-listed, although it worked yesterday. What happened, and how do you fix it?",
    "The command replaced the whole comma-separated list with only VECTOR, removing PG_TRGM from the allow list. Set the parameter to include both, for example VECTOR,PG_TRGM, keeping every extension already in use."
   ],
   [
    "Your team allow-listed VECTOR and created the extension in the app database. A new analytics database on the same server fails with 'type vector does not exist' when a data scientist creates a table. What step is missing?",
    "The extension has not been created in the analytics database. Connect to that database as the admin or an azure_pg_admin member and run CREATE EXTENSION IF NOT EXISTS vector; allow-listing is server-wide but extensions are per database."
   ]
  ],
  "tip": "Two steps in order: add VECTOR to the azure.extensions server parameter, then run CREATE EXTENSION vector in each database; the extension's SQL name is vector, not pgvector.",
  "check": [
   [
    "Why does CREATE EXTENSION vector fail on a new flexible server?",
    "The extension has not been allow-listed; add VECTOR to the azure.extensions server parameter first."
   ],
   [
    "Is an extension created once per server or once per database?",
    "Once per database; each database that uses vectors needs its own CREATE EXTENSION."
   ],
   [
    "Which role's members can create allow-listed extensions on flexible server?",
    "azure_pg_admin (including the server admin)."
   ]
  ]
 },
 {
  "t": "Pgvector: vector(n) columns, distance operators (<-> L2, <=> cosine, <#> inner product), HNSW vs IVFFlat indexes and tuning (m, ef_search, lists, probes)",
  "hook": "Grace runs the search team at Maple Leaf Libraries, a fictional public library network that lets patrons search 3 million book summaries by meaning. Yesterday she added an index to the embedding column to speed things up. This morning, the search page still takes four seconds, and when she runs EXPLAIN on the query, PostgreSQL shows a sequential scan, reading every single row. The index exists, it is valid, and the planner is simply ignoring it. Her colleague suggests buying a bigger server. Before anyone spends money, Grace looks closely at two small symbols: the one in the query and the one in the index definition. What does she find?",
  "simple": "Once pgvector is turned on, you add a column that holds a list of numbers of a fixed length, like a column for phone numbers that must all have ten digits. To find similar items, you sort by distance using a small symbol: one symbol measures straight-line distance, one measures the angle between lists (cosine), and one uses a multiplication score (inner product). Comparing against every row is exact but slow for big tables, so you add an index, a shortcut that checks only promising rows. There are two kinds: HNSW, like a network of signposts, and IVFFlat, like sorting books into bins first. The index only helps if it was built for the same symbol you use in the query.",
  "body": [
   "With the extension created, you store embeddings in a column of type `vector(n)`, where n is the number of dimensions your embedding model returns. Inserting a vector with a different length fails with an error, which protects you from accidentally mixing embeddings from two models in one column. A typical table keeps the chunk text, its metadata and its embedding together, so a single SQL query can filter on metadata and rank by similarity at the same time. That combination is one of the main reasons teams choose PostgreSQL for vector work.",
   "```sql\nCREATE TABLE chunks (\n  id bigserial PRIMARY KEY,\n  doc_id int, lang text, body text,\n  embedding vector(1536));\n\nSELECT id, body, embedding <=> $1 AS distance\nFROM chunks WHERE lang = 'en'\nORDER BY embedding <=> $1\nLIMIT 5;\n```",
   "pgvector defines three main distance operators, and you need to know which is which. `<->` is L2 distance, also called Euclidean distance, the straight-line distance between two points. `<=>` is cosine distance, which equals 1 minus cosine similarity, so smaller values mean more similar vectors. `<#>` is the negative inner product. It is negated on purpose: PostgreSQL index scans only work with ascending order, so by negating the inner product, sorting ascending by `<#>` returns the largest inner products, the most similar items, first. In every case the pattern is the same: ORDER BY the operator ascending and use LIMIT for top-k. For normalized embeddings, meaning vectors scaled to length 1 as many text embedding models produce, cosine and inner product give the same ranking, and inner product is slightly cheaper to compute.",
   "Without an index, the query does an exact scan of every row, computing the distance to each one. That is perfectly accurate, with 100 percent recall, but it slows down linearly as the table grows. pgvector offers two approximate nearest neighbor (ANN) index types that trade a little recall for much faster queries. Each index is built for one operator class, and that operator class must match the operator in your query: `vector_l2_ops` for `<->`, `vector_cosine_ops` for `<=>` and `vector_ip_ops` for `<#>`. If the operator does not match, the planner cannot use the index and silently falls back to a sequential scan, which is exactly the kind of bug that leads people to buy bigger servers for no reason.",
   "HNSW (Hierarchical Navigable Small World) builds a multi-layer graph in which each vector is linked to its near neighbors, with sparse upper layers for long jumps and dense lower layers for fine search. It has better speed and recall trade-offs than IVFFlat, can be created on an empty table and stays accurate as rows are added, because new vectors are inserted into the graph as they arrive. The costs are slower index builds and more memory. Its build parameters are `m`, the maximum number of connections per node, and `ef_construction`, the size of the candidate list used while building; larger values improve recall and cost build time and memory. At query time, `hnsw.ef_search` sets the size of the candidate list: raise it for better recall, lower it for speed.",
   "IVFFlat (inverted file with flat lists) takes a different approach. It clusters vectors into a number of `lists` and, at query time, searches only the lists whose centers are closest to the query vector. It builds faster and uses less memory than HNSW, but it should be created after the table has representative data, because the cluster centers are computed once at build time; building it on an empty or tiny table produces poor clusters and poor recall. The pgvector guidance for choosing lists is roughly rows divided by 1000 for up to a million rows, and the square root of rows beyond that. At query time, `ivfflat.probes` sets how many lists to search; more probes mean better recall and slower queries.",
   "```sql\nCREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);\nSET hnsw.ef_search = 100;\n-- or\nCREATE INDEX ON chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);\nSET ivfflat.probes = 10;\n```",
   "Both query-time settings, `hnsw.ef_search` and `ivfflat.probes`, can be set per session or per transaction with SET or SET LOCAL, so different parts of an application can choose different speed and recall trade-offs. Use `EXPLAIN ANALYZE` to confirm the index is actually used; you should see an index scan on your vector index rather than a sequential scan followed by a sort.",
   "One more behavior catches people out. With an approximate index, PostgreSQL first collects a candidate set from the index and then applies your WHERE filter. If the filter is restrictive, such as a rare language, many candidates are discarded and the query can return fewer than k rows. Raising ef_search or probes enlarges the candidate set and helps, and for very selective filters a partial index or a separate table per segment can work better."
  ],
  "analogy": "HNSW is like navigating a city with highway signs, then main roads, then side streets: you quickly zoom in on the right neighborhood. IVFFlat is like a library that sorted books into bins by topic once, then only searches the few bins closest to your request; if the bins were made before most books arrived, they are badly sorted. The analogy stops working for operator classes: there is no everyday equivalent of a map that becomes invisible when you measure distance the wrong way, but that is what a mismatched operator class does.",
  "mnemonic": "Dash for distance, equals for angle, hash for products: <-> is L2 (straight-line distance), <=> is cosine (angle), <#> is negative inner product.",
  "terms": [
   [
    "vector(n)",
    "The pgvector column type holding an embedding of exactly n dimensions."
   ],
   [
    "<=> operator",
    "pgvector's cosine distance operator; smaller values mean more similar vectors."
   ],
   [
    "<#> operator",
    "pgvector's negative inner product operator, negated so ascending order puts the most similar first."
   ],
   [
    "HNSW",
    "A graph-based ANN index with strong recall and speed, tuned with m, ef_construction and hnsw.ef_search."
   ],
   [
    "IVFFlat",
    "A cluster-based ANN index built after loading data, tuned with lists at build time and ivfflat.probes at query time."
   ],
   [
    "Operator class",
    "The index setting, such as vector_cosine_ops, that must match the distance operator used in queries."
   ]
  ],
  "example": "A search query was slow even after an index was created. EXPLAIN showed a sequential scan: the index used vector_l2_ops but the query ordered by <=>. Rebuilding the HNSW index with vector_cosine_ops made the planner use it. Recall on filtered queries was a little low, so they raised hnsw.ef_search for that session.",
  "mistakes": [
   [
    "Any vector index speeds up any distance operator.",
    "The index's operator class must match the query operator (vector_cosine_ops for <=>, vector_l2_ops for <->, vector_ip_ops for <#>), or the planner ignores it."
   ],
   [
    "For <#>, sort descending to get the highest similarity.",
    "<#> returns the negative inner product, so you still ORDER BY ascending; that puts the largest inner products first."
   ],
   [
    "Create the IVFFlat index first, then load the data.",
    "IVFFlat computes clusters at build time, so build it after loading representative data. HNSW is the one that works well on an empty table."
   ],
   [
    "Raising lists improves recall at query time.",
    "lists is a build-time setting for the number of clusters; at query time you raise ivfflat.probes to search more lists and improve recall."
   ]
  ],
  "tryit": [
   [
    "A team must launch with an empty table that will grow steadily from user uploads, and they want good recall without periodically rebuilding the index. Memory on the server is adequate. Which pgvector index type should they use?",
    "HNSW. It can be created on an empty table and stays accurate as rows are inserted, while IVFFlat needs representative data at build time and degrades if the data distribution changes significantly afterward."
   ],
   [
    "An IVFFlat index with lists = 1000 serves a product search. Users complain that obviously relevant products are sometimes missing from the top 10, though latency is well within budget. What do you adjust?",
    "Increase ivfflat.probes for the session or query so more lists are searched, improving recall at some cost in speed. Since latency has headroom, the trade-off is acceptable; lists itself is a build-time setting and would require rebuilding the index."
   ]
  ],
  "tip": "Match operator and operator class (<-> with vector_l2_ops, <=> with vector_cosine_ops, <#> with vector_ip_ops). Build IVFFlat after loading data; HNSW works on empty tables. ef_search and probes trade speed for recall.",
  "check": [
   [
    "Why is the inner product operator <#> negative?",
    "PostgreSQL index scans order ascending, so negating the inner product makes the most similar vectors sort first."
   ],
   [
    "Which parameter do you raise to improve recall for an IVFFlat index at query time?",
    "ivfflat.probes, which searches more lists at the cost of speed."
   ],
   [
    "What happens if you insert a 768-dimension vector into a vector(1536) column?",
    "The insert fails, because the column only accepts vectors of exactly 1536 dimensions."
   ]
  ]
 },
 {
  "t": "Retrieval-augmented generation: chunking, embedding, storing, top-k retrieval with metadata filters, adding results to the prompt",
  "hook": "Daniel works in HR technology at Summit Freight, a fictional logistics company with offices in four countries. The new HR assistant has been live for a week when an employee in Toronto asks how many weeks of parental leave she gets. The assistant answers confidently, quoting a policy, and the number is wrong: it came from the German office's handbook. Worse, a manager notices the assistant once summarized a document from a confidential executive folder. The language model itself is fine. The problem sits in how documents were split, labeled and fetched before the model ever saw them. Where in the pipeline did things go wrong?",
  "simple": "A chatbot model only knows what it learned during training, so it does not know your company's own documents, and it may guess. Retrieval-augmented generation, or RAG, means looking up the right pieces of your documents first and handing them to the model along with the question, like giving a student the relevant textbook pages before an open-book exam. To get there, you cut documents into small passages, turn each passage into a list of numbers that captures its meaning, and save them in a database. When someone asks a question, you turn the question into numbers too, find the few closest passages, keep only the ones that person is allowed to see, and paste them into the prompt with instructions to answer only from them.",
  "body": [
   "A large language model (LLM) only knows what was in its training data, and when asked about your private documents it may confidently invent answers, a behavior often called hallucination. Retrieval-augmented generation (RAG) fixes this by finding relevant passages from your own data at question time and putting them in the prompt, so the model answers from supplied facts rather than memory. RAG has two pipelines. The ingestion pipeline prepares your data ahead of time, and the query pipeline runs for every question. The data services from this domain, Cosmos DB, PostgreSQL with pgvector and Redis, sit in the middle as the vector store.",
   "Ingestion starts with chunking: splitting documents into passages small enough to embed and to fit several into a prompt, yet large enough to carry meaning on their own. Common strategies are fixed-size chunks measured in tokens with some overlap between neighbors, so a sentence cut at a boundary still appears whole in at least one chunk, or structure-aware splitting by headings, paragraphs or sentences, which keeps related ideas together. Chunk size is a trade-off. Chunks that are too big dilute the match, because one relevant sentence is buried in a lot of unrelated text, and they use up the context window. Chunks that are too small lose context, so a retrieved line may not make sense without its surrounding paragraph.",
   "Keep metadata with every chunk. At minimum, store the source document, title, section, language and date. Just as important is access information, such as the tenant, country or the groups allowed to read the document. Metadata is what later lets you filter retrieval, cite sources and enforce permissions, and it is much harder to add after the fact than at ingestion time.",
   "Next is embedding. Each chunk goes through an embedding model, which returns a fixed-length vector representing its meaning. Use the same model for documents and for queries; vectors from different models live in different spaces and are not comparable, so mixing them produces meaningless similarity scores. Record the model name and version with the data so you know when a model change requires re-embedding everything.",
   "Then comes storing: write the chunk text, its metadata and its vector to a vector-capable store, such as a Cosmos DB container with a vector policy, a PostgreSQL table with a `vector(n)` column, or a Redis index with a vector field. Keep the store current as source documents change, using the Cosmos DB change feed or an event-driven job, so the assistant never answers from a deleted or outdated policy.",
   "At query time, embed the user's question with the same model, then run top-k retrieval: fetch the k chunks whose vectors are nearest to the question vector, where k is typically small, such as 3 to 10. Apply metadata filters in the same query, for example the user's tenant, a product line or a language. Filters improve relevance, and they are essential for security: they ensure a user never retrieves chunks from documents they are not allowed to see. Enforce this in the retrieval query itself, not by asking the model to ignore certain text, because anything that reaches the prompt can leak into the answer. Some systems combine vector similarity with keyword search, called hybrid search, or rerank the top results with a second model to improve quality.",
   "```python\nq_vec = embed(question)\nhits = container.query_items(\n  \"SELECT TOP 5 c.text, c.source FROM c WHERE c.tenantId = @t \"\n  \"ORDER BY VectorDistance(c.embedding, @v)\",\n  parameters=[{\"name\": \"@t\", \"value\": tenant}, {\"name\": \"@v\", \"value\": q_vec}],\n  partition_key=tenant)\ncontext = \"\\n\\n\".join(f\"[{h['source']}] {h['text']}\" for h in hits)\nmessages = [\n  {\"role\": \"system\", \"content\": \"Answer only from the sources below. If the answer is not there, say so. Cite sources.\\n\\n\" + context},\n  {\"role\": \"user\", \"content\": question}]\n```",
   "Finally, add the results to the prompt. Place retrieved passages in a clearly delimited section, label each with its source, tell the model to answer only from them and to say when the answer is not present, and ask for citations so users can verify. Watch the model's context window: k times the chunk size, plus instructions, plus the conversation history, must fit, with room left for the answer.",
   "One last safety habit: treat retrieved text as data, not instructions. Documents may contain text that tries to steer the model, such as a line saying to ignore previous instructions, which is a form of prompt injection. Delimiting the context, keeping system instructions separate and limiting what the model can do with its output all reduce that risk. When a RAG answer is wrong, debug the pipeline in order: was the right chunk created, was it retrieved, and was it used?"
  ],
  "analogy": "RAG works like an open-book exam with a helpful librarian. Before the exam, the librarian cuts textbooks into index cards and labels each one by subject and which class may use it (chunking and metadata). During the exam, a student's question goes to the librarian, who pulls the five most relevant cards the student is allowed to see (top-k with filters). The student answers only from those cards. The analogy breaks in one place: a real student might notice a forged card, but a model may follow instructions hidden in a card.",
  "mnemonic": "RAG steps in order: Can Every Student Read Aloud? for Chunk, Embed, Store, Retrieve, Augment the prompt.",
  "terms": [
   [
    "RAG",
    "Retrieval-augmented generation: retrieving relevant data at query time and adding it to the model prompt to ground answers."
   ],
   [
    "Chunking",
    "Splitting source documents into passages, often with overlap, before embedding them."
   ],
   [
    "Top-k retrieval",
    "Returning the k items whose vectors are most similar to the query vector."
   ],
   [
    "Metadata filter",
    "A condition on chunk properties, such as tenant or language, applied alongside vector search."
   ],
   [
    "Grounding",
    "Constraining a model's answer to supplied source content, often with instructions and citations."
   ],
   [
    "Hybrid search",
    "Combining vector similarity with keyword search to improve retrieval relevance."
   ]
  ],
  "example": "An HR assistant answered a question about parental leave using another country's policy. The team added country and tenant metadata to every chunk, filtered retrieval on the user's country, lowered chunk size with a small overlap so policy sections stayed intact, and instructed the model to cite sources and say when no policy matched. Wrong-country answers stopped.",
  "mistakes": [
   [
    "You can embed documents with one model and questions with another, newer model.",
    "Vectors from different models are not comparable. Use the same embedding model for chunks and queries, and re-embed when you change models."
   ],
   [
    "Tell the model in the system prompt to ignore documents the user may not see.",
    "Enforce access with metadata filters in the retrieval query so unauthorized chunks never reach the prompt."
   ],
   [
    "Bigger chunks are always better because they contain more context.",
    "Oversized chunks dilute similarity matches and consume the context window; balance size and use overlap or structure-aware splitting."
   ],
   [
    "A larger k always improves answers.",
    "More chunks add noise and cost, and can overflow the context window; k is usually small, such as 3 to 10."
   ]
  ],
  "tryit": [
   [
    "A multitenant SaaS app stores all customers' support articles in one Cosmos DB container partitioned by tenantId. A developer's prototype retrieves the top 5 chunks across the whole container and adds a system message telling the model to use only the current tenant's content. What is the risk, and how should retrieval change?",
    "Other tenants' chunks can reach the prompt and leak into answers, because the model may not obey the instruction. Filter in the retrieval query with WHERE c.tenantId = @t and pass the tenant as the partition key, so only that tenant's chunks are ever retrieved."
   ],
   [
    "Users report that answers about warranty terms often miss the key condition, which appears in the sentence right after a chunk boundary. Chunks are fixed at 800 tokens with no overlap. What change helps most?",
    "Add overlap between adjacent chunks (or split on section and paragraph boundaries) so the condition appears in the same chunk as the sentence it qualifies. This improves the chance that a retrieved chunk contains the complete rule."
   ]
  ],
  "tip": "Use the same embedding model for chunks and queries; enforce access control with metadata filters at retrieval time, not by asking the model to ignore documents.",
  "check": [
   [
    "Why add overlap between adjacent chunks?",
    "So sentences or ideas cut at a chunk boundary still appear intact in at least one chunk, improving retrieval."
   ],
   [
    "Where should tenant isolation be enforced in a RAG app?",
    "In the retrieval query as a metadata filter (or partition), so other tenants' chunks never reach the prompt."
   ],
   [
    "What should the prompt instruct the model to do when the retrieved sources do not contain the answer?",
    "Say that the answer is not in the sources rather than guessing, and cite sources when it does answer."
   ]
  ]
 },
 {
  "t": "Azure Managed Redis: cache-aside pattern, TTL and invalidation, eviction policies",
  "hook": "It is the first morning of a big sale at Copperline Kitchenware, a fictional online store, and Sofia from the platform team is watching the product API. Pages load quickly thanks to the new Redis cache, until a merchandiser drops the price of a popular skillet and customers keep seeing the old price for several minutes. Some complain at checkout. An hour later a different alert fires: Redis memory is full, and the shopping-cart service, which stores carts in the same cache, starts losing carts. Sofia now has three questions to answer before lunch. Who refreshes the cache, when should entries expire, and what gets thrown out when memory runs out?",
  "simple": "A cache is a small, very fast memory that keeps copies of things you look up often, like keeping your most-used spices on the counter instead of in the basement pantry. Redis is a popular cache. In the cache-aside approach, your app checks the counter first; if the spice is not there, it fetches it from the pantry (the database), puts a copy on the counter and uses it. Each copy gets an expiry timer (TTL) so old copies do not stay forever. When the real data changes, the app throws away the copy so the next lookup gets the fresh one. And when the counter is full, an eviction policy decides which copies to clear away to make room.",
  "body": [
   "Redis is an in-memory data store that answers in well under a millisecond, which makes it the standard cache in front of slower databases and expensive AI model calls. Azure Managed Redis is Microsoft's current managed Redis offering, built on Redis Enterprise software. It offers tiers optimized for memory, a balance of memory and compute, or compute, plus clustering, high availability and optional modules such as search and JSON that you choose when you create the cache. From Python you connect with the `redis` package, also called redis-py, over Transport Layer Security (TLS), authenticating with an access key or, preferably, Microsoft Entra ID so no long-lived secret sits in your configuration.",
   "The most common caching pattern is cache-aside, also called lazy loading, and the key idea is that the application, not the cache, is in charge. On a read, the app checks the cache first. On a hit, it returns the cached value immediately. On a miss, it reads from the database, writes the result into the cache with an expiry, and returns it. The cache only ever holds data someone actually asked for, so memory is spent on popular items, and if the cache is flushed or restarted, the app keeps working, just more slowly until the cache warms up again. Redis does not talk to the database on its own in this pattern.",
   "```python\nimport json, redis\nr = redis.Redis(host=HOST, port=10000, ssl=True, password=KEY)\n\ndef get_product(pid):\n    key = f\"product:{pid}\"\n    cached = r.get(key)\n    if cached:\n        return json.loads(cached)\n    product = db_read_product(pid)\n    r.set(key, json.dumps(product), ex=300)   # TTL 300 seconds\n    return product\n\ndef update_product(pid, data):\n    db_write_product(pid, data)\n    r.delete(f\"product:{pid}\")                 # invalidate\n```",
   "Time to live (TTL) is how long a key lives before Redis removes it automatically. You set it with the `ex=` argument on SET, as in the example, or with the EXPIRE command on an existing key, and you check the remaining time with the TTL command, which returns -1 for a key with no expiry and -2 for a key that does not exist. A TTL bounds how stale cached data can be, and it frees memory without any cleanup code. Choosing the value is a trade-off: short TTLs mean fresher data and more database load, while long TTLs mean less load and older data. Adding a little random jitter to TTLs, for example 300 seconds plus or minus 30, avoids many keys expiring at the same moment and stampeding the database with simultaneous misses.",
   "TTL alone still allows stale reads until expiry, which is what Copperline's customers saw. Invalidation removes or updates the cached entry when the source data changes. With cache-aside, the usual approach is to write to the database first and then delete the cache key, so the next read misses and reloads fresh data. Deleting is safer than writing the new value into the cache, because it avoids races where two writers finish in a different order and an older value overwrites a newer one. When changes come from other systems that your code does not control, an event such as a Cosmos DB change feed notification or a message on a queue can drive the invalidation instead.",
   "When memory is full, the eviction policy decides what happens, and the policy names are a classic exam topic. `noeviction` evicts nothing and rejects new writes with an out-of-memory error. `allkeys-lru` evicts the least recently used keys from all keys, a good default for a pure cache where every entry can be rebuilt. `volatile-lru` evicts least recently used keys only among keys that have a TTL, which protects keys without an expiry. There are matching least frequently used (LFU) variants, `allkeys-lfu` and `volatile-lfu`, random variants, `allkeys-random` and `volatile-random`, and `volatile-ttl`, which evicts the keys closest to expiring first.",
   "The rule for choosing is simple once you see the naming pattern: allkeys policies may remove anything, and volatile policies only remove keys that have a TTL. If your cache holds only disposable data, an allkeys policy fits. If the same instance also holds data that must not disappear, such as shopping carts, use a volatile policy and give only the cache entries a TTL, leaving the important keys without expiry. Even better, keep critical data in a durable store and use Redis purely as a cache.",
   "Finally, monitor the cache so you can tune it. Watch the cache hit ratio, memory use, evicted keys and connected clients in Azure Monitor metrics. A low hit ratio suggests TTLs are too short or keys are too specific to be reused, frequent evictions suggest the cache is too small for the working set, and rising server load or latency suggests you need a larger tier or clustering."
  ],
  "analogy": "Cache-aside is like a kitchen counter in front of a basement pantry. You check the counter first; if the item is missing, you go downstairs, bring it up and leave it on the counter with a sticky note saying 'toss after five minutes' (TTL). When the pantry version changes, you throw out the counter copy (invalidation). When the counter is full, a house rule decides what to clear: anything you have not touched lately, or only items with a sticky note (volatile). Unlike a real kitchen, nobody else restocks the counter for you.",
  "terms": [
   [
    "Cache-aside",
    "A pattern where the app checks the cache, loads from the database on a miss and populates the cache itself."
   ],
   [
    "TTL",
    "Time to live: the number of seconds a key exists before Redis expires it automatically."
   ],
   [
    "Invalidation",
    "Removing or refreshing a cached entry when the underlying data changes."
   ],
   [
    "Eviction policy",
    "The rule Redis follows to free memory when full, such as allkeys-lru or volatile-lru."
   ],
   [
    "allkeys-lru",
    "Evicts the least recently used keys from among all keys; suited to a pure cache."
   ],
   [
    "volatile-lru",
    "Evicts the least recently used keys only among keys with a TTL, protecting keys without expiry."
   ]
  ],
  "example": "A product page API took 120 ms per request reading PostgreSQL. With cache-aside and a 5-minute TTL in Azure Managed Redis, repeated reads returned in a few milliseconds. When an admin changed a price, customers saw the old price for minutes, so the update path now deletes the product key right after the database write, and the next read reloads it.",
  "mistakes": [
   [
    "In cache-aside, Redis automatically loads missing data from the database.",
    "The application loads data on a miss and writes it into the cache; Redis does not fetch from the database."
   ],
   [
    "After a database update, write the new value into the cache for best freshness.",
    "Deleting the key is safer: it avoids races where an older value overwrites a newer one, and the next read reloads the current value."
   ],
   [
    "volatile-lru evicts from all keys when memory is full.",
    "volatile policies only evict keys that have a TTL; allkeys policies evict from every key."
   ],
   [
    "noeviction means data is never lost, so it is the safest choice for a cache.",
    "noeviction rejects new writes with errors when memory is full, which can break the application; a pure cache usually uses allkeys-lru."
   ]
  ],
  "tryit": [
   [
    "A single Azure Managed Redis instance holds two kinds of data: cached product details, which can always be reloaded, and user session tokens with no TTL, which must not be dropped. During peak traffic, memory fills up. Which eviction policy do you choose, and how do you set TTLs?",
    "Use volatile-lru (or another volatile policy) and give only the product cache entries a TTL. Redis will then evict only keys with an expiry, protecting the session tokens. allkeys-lru could evict sessions, and noeviction would reject writes."
   ],
   [
    "A news site caches every article for exactly 600 seconds. Every ten minutes, the database CPU spikes as hundreds of popular articles expire together. What simple change reduces the spikes?",
    "Add random jitter to each TTL, for example 600 seconds plus or minus 60, so keys expire at different times and misses are spread out instead of stampeding the database."
   ]
  ],
  "tip": "Know the policy names: allkeys-* evicts from every key, volatile-* only from keys with a TTL, and noeviction returns errors on writes when memory is full. In cache-aside, write the database, then delete the key.",
  "check": [
   [
    "In cache-aside, who loads data into the cache on a miss?",
    "The application: it reads the database, then writes the value into the cache with a TTL."
   ],
   [
    "Why delete the cache key after a database update instead of writing the new value?",
    "Deleting avoids races where a slower writer puts stale data back into the cache; the next read reloads the current value."
   ],
   [
    "What does the noeviction policy do when memory is full?",
    "It evicts nothing and returns errors for new writes."
   ]
  ]
 },
 {
  "t": "Redis vector indexes and semantic caching of model responses",
  "hook": "Kenji manages the help-desk assistant at Brightwater Utilities, a fictional power company. Every storm brings thousands of near-identical questions: 'Is there an outage on Elm Street?', 'Why is my power out?', 'When will electricity be back?'. Each one triggers a full model call, and the monthly model bill now rivals the call center's coffee budget times a hundred. His team already caches responses in Redis, but the hit rate is close to zero, because no two customers type the same words. Then a test goes badly: a looser fix returns a billing answer to an outage question. How can a cache match meaning instead of exact text, without answering the wrong question?",
  "simple": "A normal cache only helps when someone asks exactly the same thing, word for word. People rarely do. A semantic cache stores each question as a list of numbers that captures its meaning, along with the answer. When a new question arrives, it turns that question into numbers too and looks for the closest stored question. If it is close enough, it returns the saved answer immediately instead of paying the AI model to write a new one. Redis can do this search very quickly because it keeps everything in memory and has a vector search feature. The tricky part is deciding how close counts as 'close enough', so you do not hand someone an answer to a different question.",
  "body": [
   "Redis is not only a key-value cache. With the search module, known as RediSearch and offered as part of Redis Stack and as a module on Azure Managed Redis, Redis can index fields inside hashes or JSON documents, including text, tag, numeric and vector fields, and run K-nearest-neighbor (KNN) queries entirely in memory. That makes it attractive for latency-sensitive AI features. On Azure Managed Redis you choose modules when you create the cache rather than adding them later, so plan for search up front if you expect to need vector queries.",
   "You create an index with `FT.CREATE`. The command names the index, the data structure to index (`ON HASH` or `ON JSON`), the key prefix to watch, and a schema of fields. A vector field declares its algorithm, FLAT for exact search or HNSW for approximate search, followed by a count of the attribute arguments that come next, then the element type (such as FLOAT32), the dimension count, which must match the embedding model, and the distance metric (COSINE, L2 or IP for inner product). Once the index exists, every key written with that prefix is indexed automatically, with no separate indexing call in your code.",
   "```text\nFT.CREATE idx:cache ON HASH PREFIX 1 semcache: SCHEMA\n  prompt TEXT\n  model TAG\n  embedding VECTOR HNSW 6 TYPE FLOAT32 DIM 1536 DISTANCE_METRIC COSINE\n\nFT.SEARCH idx:cache \"(@model:{gpt-small})=>[KNN 3 @embedding $vec AS score]\"\n  PARAMS 2 vec <binary float32 bytes> SORTBY score DIALECT 2\n```",
   "In this example, the number 6 after HNSW counts the six tokens that follow: TYPE, FLOAT32, DIM, 1536, DISTANCE_METRIC and COSINE. The KNN query syntax combines a pre-filter in parentheses, here a TAG filter that matches only entries for one model, with a vector search clause after the `=>` arrow that asks for the 3 nearest neighbors on the `embedding` field. The `$vec` parameter carries the query vector as raw bytes, which in Python you produce with NumPy's `astype(np.float32).tobytes()`, and the byte layout must match the declared type. DIALECT 2 is required for this parameterized vector syntax. Results come back with the distance score aliased as `score`; for COSINE, a smaller distance means more similar, so sorting ascending puts the best match first.",
   "Semantic caching applies this capability to model calls. A normal cache only hits on exactly the same key, but users ask the same question in many phrasings, such as 'How do I reset my password?' and 'I forgot my password, what now?'. A semantic cache embeds each incoming prompt, searches the cache index for the nearest previous prompt and, if the distance is below a similarity threshold, returns the stored answer without calling the model at all. On a miss, the app calls the model as usual, then stores the prompt text, its embedding and the response under the indexed prefix, with a TTL (time to live).",
   "The benefit is lower latency and lower model cost for repetitive traffic such as FAQs and support bots: a cache hit costs one embedding call and one fast Redis query instead of a full generation. The risks need deliberate design. The similarity threshold is a trade-off. Set it too loose and different questions are treated as the same, so users get answers to something they did not ask. Set it too strict and the cache rarely hits, so you pay for embeddings and lookups without saving model calls. Teams tune it by replaying real prompts and checking which matches are genuinely equivalent.",
   "Scope matters as much as the threshold. Store filterable fields with each entry, such as model version, language, tenant or user, and apply them as pre-filters so one tenant's cached answer never reaches another and an answer generated by an old model or in another language is not reused. Do not cache responses that contain personal data or depend on the user's own context, such as account balances. Use TTLs so answers based on changing facts expire, and invalidate entries when the underlying documents change, for example by deleting keys tagged with a document id when that document is updated.",
   "Semantic caching complements retrieval-augmented generation (RAG) rather than replacing it. RAG grounds answers in your data, and the semantic cache avoids repeating the whole retrieval-and-generation path for questions that have effectively been answered already. A typical design checks the semantic cache first, falls back to RAG with a durable vector store on a miss, then writes the new answer back to the cache. Measure the result with the hit rate, the share of hits later judged wrong, and the model calls saved, and revisit the threshold whenever you change the embedding model, because distances from a new model are not comparable with the old ones."
  ],
  "analogy": "A semantic cache is like an experienced receptionist who remembers recent questions by their meaning, not their exact wording. When someone asks 'Where do I park?', she recalls that an hour ago she answered 'Is there visitor parking?' and repeats that answer. If she is too eager, she might answer 'Where is the park?' with parking directions, which is the loose-threshold problem. The analogy stops working for scope: unlike a receptionist, the cache will not notice it is talking to a different company's visitor unless you filter by tenant.",
  "terms": [
   [
    "FT.CREATE",
    "The Redis search command that defines an index over hashes or JSON keys, including vector fields."
   ],
   [
    "KNN query",
    "A Redis search query that returns the K nearest vectors to a supplied query vector."
   ],
   [
    "DIALECT 2",
    "The query dialect required for parameterized vector search syntax in Redis."
   ],
   [
    "Semantic cache",
    "A cache that returns stored model responses for prompts whose embeddings are similar enough to the new prompt."
   ],
   [
    "Similarity threshold",
    "The maximum distance at which a cached prompt is considered a match in a semantic cache."
   ],
   [
    "Pre-filter",
    "A TAG, text or numeric condition applied before the KNN vector search to scope results."
   ]
  ],
  "example": "A support bot receives thousands of password questions daily in slightly different words. The team adds a Redis semantic cache: each prompt is embedded and searched with KNN 1, filtered by language and model version, and cached answers with cosine distance under a tuned threshold are returned immediately. Model calls for common questions fell sharply, and entries expire after a day so policy changes flow through.",
  "mistakes": [
   [
    "A semantic cache hits only when the prompt text matches exactly.",
    "That describes a normal cache. A semantic cache compares embeddings and hits when meaning is similar enough, within a threshold."
   ],
   [
    "A looser similarity threshold is always better because it raises the hit rate.",
    "Too loose a threshold returns answers to different questions. The threshold is a trade-off between hit rate and correctness."
   ],
   [
    "With COSINE in Redis, a larger score means a better match.",
    "Redis returns cosine distance, so a smaller score means more similar; sort ascending."
   ],
   [
    "It is fine to cache every model response, including personalized ones, as long as there is a TTL.",
    "Responses with personal data or user-specific context must not be cached for others; scope entries by tenant or user and skip caching personal answers."
   ]
  ],
  "tryit": [
   [
    "A multitenant HR assistant adds a Redis semantic cache keyed only on the prompt embedding. A tester at Company A asks about vacation carryover and receives a cached answer describing Company B's policy. What design change fixes this?",
    "Store a tenant tag with each cache entry and apply it as a pre-filter in the KNN query, for example (@tenant:{companyA})=>[KNN 1 ...], so lookups only consider that tenant's cached answers. Also consider adding model version and language tags."
   ],
   [
    "After launching a semantic cache, the team sees a hit rate under 2 percent while model costs barely change. Logs show many near-duplicates with cosine distances just above the configured threshold, and manual review confirms they are the same questions. What should they adjust, and how should they validate it?",
    "Loosen the similarity threshold slightly so those near-duplicates count as matches, then validate by replaying a sample of real prompts and checking that the newly matched pairs truly ask the same thing, stopping before unrelated questions start matching."
   ]
  ],
  "tip": "Semantic caching matches meaning, not exact text, so the exam trade-off is the similarity threshold; always scope cache entries (tenant, model, language) and give them a TTL.",
  "check": [
   [
    "Besides the algorithm (FLAT or HNSW), which three settings does a Redis VECTOR field need?",
    "The element type, the number of dimensions and the distance metric, for example TYPE FLOAT32 DIM 1536 DISTANCE_METRIC COSINE."
   ],
   [
    "What happens if a semantic cache's similarity threshold is too loose?",
    "Different questions are treated as the same, so users receive cached answers that do not fit what they asked."
   ],
   [
    "What happens on a semantic cache miss?",
    "The app calls the model, then stores the prompt, its embedding and the response, with a TTL, for future matches."
   ]
  ]
 },
 {
  "t": "Choosing the store: Cosmos DB vs PostgreSQL + pgvector vs Redis for a given AI workload",
  "hook": "The architecture review at Harborview Travel, a fictional booking company, has stalled. Three engineers each champion a different store for the new trip-planning assistant. Ines wants Cosmos DB because travelers use the app on three continents. Raj wants PostgreSQL with pgvector because bookings, customers and loyalty points already live there. Wen wants Redis because the assistant must feel instant. All three can store vectors and run similarity search, so the arguments go in circles. The chief architect finally asks a different question: what does this workload need most, and could the right answer be more than one store?",
  "simple": "All three Azure services in this lesson can store embeddings and find similar ones, so you choose based on everything else about the job. Cosmos DB is like a giant, worldwide filing system for flexible documents that can grow almost without limit. PostgreSQL with pgvector is like a well-organized spreadsheet system with tables that link to each other, great when your AI search must connect to orders or customers. Redis is like the sticky notes on your desk: incredibly fast, but small and meant for things you can recreate. Many real apps use two of them together, such as PostgreSQL for the real records and Redis in front to remember recent answers.",
  "body": [
   "The exam likes scenario questions that describe an AI workload and ask which data service fits. All three services in this domain, Azure Cosmos DB for NoSQL, Azure Database for PostgreSQL flexible server with pgvector, and Azure Managed Redis, can store vectors and answer similarity queries. Because vector support is not the differentiator, the decision turns on everything else: the shape of the data, the scale and geographic spread, latency targets, durability, existing skills and systems, and how the vectors relate to the rest of the application. Read each scenario for those clues before you think about vectors at all.",
   "Choose Azure Cosmos DB for NoSQL when the application is already document-shaped and needs elastic, global scale. Its strengths are JSON items with flexible schemas, automatic partitioning for very large data and throughput, single-digit-millisecond point reads, multi-region replication with optional multi-region writes, a change feed for event-driven pipelines, and vector search on the same items as the operational data, with flat, quantizedFlat or diskANN indexes. Typical fits include chat history and agent memory stored per user, multitenant software as a service (SaaS) knowledge bases, product catalogs with embeddings, and apps whose users are spread across regions and need local reads.",
   "Cosmos DB has design responsibilities that come with that scale. Costs are measured in Request Units (RUs), so you must design partition keys and indexing policies carefully, and joins across containers are not available the way they are in a relational database, so related data is usually embedded in the same document or denormalized. When a scenario emphasizes schema flexibility, massive or unpredictable scale, global distribution or reacting to changes through the change feed, Cosmos DB is the strongest candidate.",
   "Choose Azure Database for PostgreSQL flexible server with pgvector when the data is relational or the team already runs PostgreSQL. Its strengths are SQL joins, transactions and constraints that span vectors and business tables, rich filtering with ordinary WHERE clauses, the very large PostgreSQL ecosystem of object-relational mappers (ORMs), migration tools and drivers, and familiar HNSW and IVFFlat indexes. Typical fits include adding semantic search to an existing line-of-business database, RAG (retrieval-augmented generation) over data that must be joined with orders, customers or permissions tables, and teams who prefer SQL. It scales up well with larger compute and supports read replicas for read-heavy workloads, but it does not partition data across regions automatically the way Cosmos DB does, so a requirement for multi-region writes points elsewhere.",
   "Choose Azure Managed Redis when speed matters most and the data is a cache or short-lived. Its strengths are in-memory storage with sub-millisecond latency, TTL (time to live) based expiry and eviction policies, and vector search through the search module. Typical fits include semantic caching of model responses, session state and conversation context for the current session, rate limiting, and hot subsets of embeddings that need the fastest possible lookup. Its weaknesses are cost and role: memory is expensive per gigabyte compared with disk-based stores, and although persistence options exist, Redis is usually not the system of record, the authoritative store you would restore from after a failure.",
   "Many real solutions combine these services rather than picking one. A common architecture keeps Cosmos DB or PostgreSQL as the durable vector store and source of truth, with Redis in front as a semantic cache for model responses and a cache-aside layer for hot reads. The change feed or an application event can invalidate Redis entries when source data changes. When a scenario mentions both durable knowledge that must be searched and a goal of reducing repeated model calls or latency, a combined design is often the best answer, and an option that moves everything into Redis or drops the cache is usually a distractor.",
   "A quick way to decide in an exam question is to find the dominant requirement. Global distribution, massive scale, schema flexibility or a change feed points to Cosmos DB. An existing PostgreSQL estate, SQL joins with relational tables, foreign keys or multi-table transactions points to PostgreSQL plus pgvector. Lowest latency, caching, TTL-based expiry or cutting repeated LLM (large language model) calls points to Redis. If two requirements conflict, ask which one the scenario says is mandatory, and which store could be added alongside to cover the other.",
   "Also watch for cost and operations hints. Redis holds everything in memory, so a huge, rarely queried archive of embeddings is not a Redis workload. Cosmos DB bills per RU, so an analytics-style workload that scans everything constantly may be cheaper elsewhere. PostgreSQL rewards teams who already know how to operate it, tune it and back it up. The best answer fits the data, the access pattern and the team, not just the vector feature."
  ],
  "analogy": "Choosing a store is like choosing where to keep things at home. Cosmos DB is a modular storage unit network with branches in many cities: it grows as you need and is close to wherever you are. PostgreSQL is a well-labeled filing cabinet where folders cross-reference each other, ideal when papers must be read together. Redis is the tray on your desk: everything there is within instant reach, but it is small and you would never keep your only copy of a passport in it.",
  "terms": [
   [
    "System of record",
    "The authoritative, durable store for data, as opposed to a cache that can be rebuilt."
   ],
   [
    "Operational data",
    "The live application data, such as orders or profiles, that vectors may be stored alongside."
   ],
   [
    "Global distribution",
    "Replicating a database across regions for local reads and writes, a core Cosmos DB feature."
   ],
   [
    "In-memory store",
    "A data store such as Redis that keeps data in RAM for very low latency at a higher cost per gigabyte."
   ],
   [
    "Denormalization",
    "Storing related data together in one document instead of joining tables, typical in Cosmos DB designs."
   ]
  ],
  "example": "A retailer already runs its catalog, orders and customer tables in PostgreSQL and wants semantic product search filtered by stock and customer region. PostgreSQL with pgvector fits because one SQL query can join embeddings with inventory. To cut model costs for its shopping assistant, it adds Azure Managed Redis as a semantic cache in front of the model rather than moving the catalog.",
  "mistakes": [
   [
    "Pick whichever service has the best vector search, since this is an AI workload.",
    "All three support vector search; decide on data shape, scale, latency, durability and existing systems."
   ],
   [
    "Redis is the best place for a large embedding archive because it is fastest.",
    "Redis keeps data in memory, which is costly per gigabyte, and it is usually a cache, not the system of record."
   ],
   [
    "PostgreSQL with pgvector is the answer whenever global, multi-region writes are required.",
    "Flexible server scales up and offers read replicas but does not distribute writes across regions automatically; Cosmos DB fits that requirement."
   ],
   [
    "Using two data stores is always a sign of a bad design.",
    "A durable store plus a Redis cache is a common, often correct pattern for reducing latency and repeated model calls."
   ]
  ],
  "tryit": [
   [
    "A global gaming company wants to store each player's chat history and agent memory with embeddings. Players are in North America, Europe and Asia, document shapes change often as features ship, and new features consume item changes to update leaderboards. Which store fits best?",
    "Azure Cosmos DB for NoSQL. Global distribution with local reads, flexible JSON schemas, per-user partitioning and the change feed all match the requirements, and vector search can run on the same items."
   ],
   [
    "An insurance company keeps policies, claims and customers in PostgreSQL. It wants a claims assistant that finds similar past claims, filters by the adjuster's region through a permissions table, and answers FAQs instantly during storms when the same questions repeat. What architecture do you recommend?",
    "Add pgvector to the existing PostgreSQL flexible server so similarity search can join claims with the permissions and region tables, and put Azure Managed Redis in front as a semantic cache for repeated FAQ answers. PostgreSQL stays the system of record; Redis cuts latency and model calls."
   ]
  ],
  "tip": "Pick by the dominant requirement: global scale or change feed means Cosmos DB, relational joins or existing PostgreSQL means pgvector, lowest latency or response caching means Redis; combinations are common and often correct.",
  "check": [
   [
    "An app must join vector search results with orders and enforce foreign keys. Which store fits best?",
    "Azure Database for PostgreSQL with pgvector, because it supports SQL joins, transactions and constraints alongside vectors."
   ],
   [
    "Why is Redis usually not the primary store for a large embedding archive?",
    "It keeps data in memory, which is costly per gigabyte, and it is typically used as a cache rather than the system of record."
   ],
   [
    "A scenario needs multi-region writes and a flexible document schema for agent memory. Which store?",
    "Azure Cosmos DB for NoSQL."
   ]
  ]
 },
 {
  "t": "Service Bus queues vs topics and subscriptions; Basic tier has no topics",
  "hook": "It is Monday morning at Lantern Outfitters, and Priya from finance is at your desk with a spreadsheet. Half of last week's orders never reached the billing system. The warehouse insists it shipped every one of them. You open the code and find the cause: last Friday someone added a billing consumer to the same Service Bus queue the warehouse service reads from. Both services are healthy, both are reading messages, and neither is throwing errors. So where did the missing orders go, and what should the design have used instead?",
  "simple": "Think of Service Bus as a post office for programs. One program drops off a message, and another picks it up later, even if it was busy or offline when the message arrived. A queue is like a single mailbox: each letter is taken out by exactly one person, so if two people share the mailbox, each gets only some of the letters. A topic is like a newsletter: every subscriber gets their own copy of each issue. Each subscription is a personal mailbox attached to the topic. The cheapest plan, called Basic, offers only the single-mailbox kind. If several programs each need every message, you need a topic, which means the Standard or Premium plan.",
  "body": [
   "Azure Service Bus is a fully managed enterprise message broker. Applications send messages to it and other applications receive them later, which decouples senders from receivers: the receiver can be offline, slow or scaled differently, and the message waits safely in durable storage until someone takes it. Service Bus is built for high-value messages, such as orders or payments, where each message must be processed reliably and not silently dropped. In Python you work with it through the `azure-servicebus` package, usually together with `azure-identity` for sign-in.",
   "Everything starts with a namespace. The namespace is the top-level resource you create in the portal or with the Azure CLI, and it has a fully qualified name ending in `servicebus.windows.net`, such as `shop-sb.servicebus.windows.net`. The namespace also fixes the pricing tier, which matters a great deal for this topic. Inside a namespace you create the entities that actually hold messages: queues and topics. Client code connects to the namespace and then names the entity it wants to send to or receive from.",
   "A queue is point-to-point messaging. Senders put messages in, and each message is delivered to exactly one receiver. Several receivers can read from the same queue, a pattern called competing consumers, which spreads load and lets you scale workers out when the backlog grows. However, any single message goes to only one of those receivers, never to all of them. Messages are stored durably and received in first-in, first-out order under normal conditions, and features such as sessions provide strict ordering when you need a guarantee. Use a queue when one kind of work must be done once, like processing an order, resizing an image or sending a single confirmation email.",
   "A topic is publish-subscribe messaging. Senders publish to the topic, and the topic has one or more subscriptions. Each subscription acts like its own virtual queue and gets a copy of every message that matches its filter rules. Receivers read from a subscription, not from the topic itself; there is no API for receiving directly from a topic. Use topics when several independent systems must react to the same event. An OrderPlaced message could go to a billing subscription, a shipping subscription and an analytics subscription, each processed separately and at its own pace. If analytics falls behind, billing is unaffected, because each subscription keeps its own backlog. Adding a new consumer means adding a subscription, without touching or redeploying the sender.",
   "The Python example below shows the shape of the code. The sender asks the client for a topic sender and sends a message with a subject. The receiver asks for a subscription receiver by naming both the topic and the subscription, receives a batch and completes each message so it is removed from that subscription only.",
   "```python\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\nfrom azure.identity import DefaultAzureCredential\n\nwith ServiceBusClient(\"shop-sb.servicebus.windows.net\", DefaultAzureCredential()) as client:\n    with client.get_topic_sender(topic_name=\"orders\") as sender:\n        sender.send_messages(ServiceBusMessage('{\"id\": 1001}', subject=\"OrderPlaced\"))\n    with client.get_subscription_receiver(\"orders\", \"billing\") as receiver:\n        for msg in receiver.receive_messages(max_message_count=10, max_wait_time=5):\n            print(str(msg))\n            receiver.complete_message(msg)\n```",
   "The tier decides what you can use, and the exam tests this directly. Basic supports queues only, with no topics and subscriptions, and it also lacks features such as sessions, transactions and duplicate detection. Standard adds topics and subscriptions and those advanced features, running on shared capacity with pay-per-operation pricing. Premium runs on dedicated resources for predictable performance and isolation, supports larger messages, virtual network integration and private endpoints, and offers higher availability options. If you try to create a topic in a Basic namespace, the portal simply does not offer it. A classic exam trap follows from this: a design with multiple independent consumers of each message cannot use the Basic tier, because Basic has no topics.",
   "Security is the last piece. For permissions, use Microsoft Entra ID and Azure role-based access control (RBAC). Grant the sending app the Azure Service Bus Data Sender role and the receiving app the Azure Service Bus Data Receiver role, scoped as narrowly as practical to the queue or topic, instead of distributing connection strings that embed shared access keys. With `DefaultAzureCredential`, the same code runs locally with your developer sign-in and in Azure with a managed identity, so no secret ever lives in configuration files.",
   "When you read an exam scenario, ask one question first: should each message be handled by one worker, or should every interested system see every message. One worker per message points to a queue. A copy for every consumer points to a topic with one subscription per consumer, and that immediately rules out the Basic tier."
  ],
  "analogy": "A queue is a deli counter with a ticket machine: each ticket is served by exactly one clerk, and adding clerks just serves customers faster. A topic is a radio station: every listener tuned in hears every broadcast, and each subscription is a separate radio with its own volume and pause button. The analogy stops working in one place: unlike radio, a subscription stores messages durably until its receiver gets to them, so a listener who was away does not miss the broadcast.",
  "terms": [
   [
    "Namespace",
    "The Service Bus container resource that holds queues and topics and defines the tier."
   ],
   [
    "Queue",
    "A point-to-point entity where each message is received by exactly one consumer."
   ],
   [
    "Topic",
    "A publish-subscribe entity where each matching subscription receives its own copy of a message."
   ],
   [
    "Subscription",
    "A named, queue-like view of a topic with its own filter rules and receivers."
   ],
   [
    "Competing consumers",
    "Multiple receivers reading from the same queue so work is spread among them."
   ],
   [
    "Tier",
    "The namespace pricing level (Basic, Standard or Premium) that decides available features; only Standard and Premium support topics."
   ]
  ],
  "example": "A startup built order processing on a Basic namespace queue. When finance and warehouse teams both needed every order, a second consumer on the queue only received half the orders, because each queue message goes to one receiver. They moved to a Standard namespace with an orders topic and separate billing and shipping subscriptions, so each system now gets every order.",
  "mistakes": [
   [
    "Adding a second receiver to a queue so both services get every message.",
    "A queue delivers each message to only one receiver. Two receivers split the messages between them (competing consumers). To give each service every message, use a topic with one subscription per service."
   ],
   [
    "Receiving directly from a topic.",
    "Receivers always read from a subscription. The topic only accepts published messages and fans copies out to its subscriptions."
   ],
   [
    "Choosing Basic tier to save money for a fan-out design.",
    "Basic has no topics or subscriptions, and also lacks sessions, transactions and duplicate detection. Fan-out requires Standard or Premium."
   ],
   [
    "Sharing the namespace connection string with every app.",
    "Prefer Microsoft Entra ID with the Azure Service Bus Data Sender and Data Receiver roles, scoped to the entity, so each app has only the rights it needs and no key to leak."
   ]
  ],
  "tryit": [
   [
    "Copperline Clinics runs an appointment service that emits a message each time a booking is made. The reminder service and the reporting service must both see every booking, and next quarter a billing service will join. The current namespace is on the Basic tier with a single queue. What do you change?",
    "Upgrade the namespace to Standard (or use Premium), create a bookings topic and give each consumer its own subscription. A queue would split bookings between consumers, and Basic does not support topics. Billing can be added later by creating one more subscription, without changing the sender."
   ]
  ],
  "tip": "One consumer per message means a queue; every consumer gets a copy means a topic with subscriptions, which requires Standard or Premium because Basic has no topics.",
  "check": [
   [
    "Two services must each receive every order message. What should you use?",
    "A topic with one subscription per service; a queue would deliver each message to only one of them."
   ],
   [
    "Which Service Bus tier cannot host topics?",
    "Basic; topics and subscriptions require Standard or Premium."
   ],
   [
    "Several worker instances read from one queue to clear a backlog faster. Does each worker see every message?",
    "No. This is the competing consumers pattern: each message goes to exactly one worker, which spreads the load."
   ]
  ]
 },
 {
  "t": "Receive modes: peek-lock (complete, abandon, dead-letter, defer) vs receive-and-delete; lock duration and lock renewal",
  "hook": "You are on call for Brightwater Library's digital archive when the alert fires at 2 a.m.: the document-embedding worker is logging lock lost errors, and the search index shows some books embedded twice. Nobody changed the code this week, but the new batch of scanned books is much longer than usual, and each one now takes about three minutes to process. The worker reads from a Service Bus queue in peek-lock mode. Why would slower processing cause duplicates and errors instead of just a longer queue, and what setting should you reach for first?",
  "simple": "When a program picks up a message, Service Bus has to decide when to throw that message away. There are two choices. In receive-and-delete, the message is thrown away the moment it is handed over, so if the program crashes halfway, the message is gone for good. In peek-lock, the message is put on hold for that program only, like a library book placed on reserve. The program does the work and then tells Service Bus the result: done, try again later, set aside, or send to the problem pile. If the program takes too long, the hold runs out and someone else may grab the same message. Long jobs must extend the hold while they work.",
  "body": [
   "When a receiver takes a message from a Service Bus queue or subscription, the broker has to decide when the message is really gone. Service Bus gives you two receive modes, and choosing between them decides whether messages can be lost if your code crashes. This choice is made by the receiver when it opens a connection, not by the queue, so two different apps could read the same queue in different modes.",
   "Receive-and-delete is the simple option. In this mode the broker marks the message as consumed the moment it hands it over. It is fast and needs only one round trip per message. But if the receiver crashes after receiving and before finishing the work, the message is lost, because there is nothing left on the broker to redeliver. This gives at-most-once processing: each message is handled once or not at all. It suits only data where losing an occasional message is acceptable, such as frequent telemetry samples where the next reading arrives seconds later anyway. In the Python SDK you request it with `receive_mode=ServiceBusReceiveMode.RECEIVE_AND_DELETE` when you create the receiver.",
   "Peek-lock mode is the default and is two-stage. Receiving locks the message so other receivers cannot see it, but the message stays in the queue. Your code processes it and then settles it with one of four actions. Complete removes the message: the work succeeded. Abandon releases the lock so the message becomes available again immediately, and its delivery count increases. Dead-letter moves the message to the dead-letter subqueue with a reason and description, for messages that can never succeed, such as malformed data. Defer sets the message aside in the queue; it will not be handed out by normal receives and can only be retrieved later by its sequence number, which is useful when a message arrives before another message it depends on. Your code must record that sequence number to fetch it later with `receive_deferred_messages`.",
   "The example below shows a typical peek-lock handler. Parsing errors are permanent, so the message is dead-lettered with a reason that operators will see later. Transient errors, such as a downstream service timing out, are abandoned so another attempt can succeed. Only after successful processing is the message completed.",
   "```python\nfrom azure.servicebus import ServiceBusClient, AutoLockRenewer\n\nrenewer = AutoLockRenewer(max_lock_renewal_duration=600)\nwith client.get_queue_receiver(\"orders\", auto_lock_renewer=renewer) as receiver:\n    for msg in receiver.receive_messages(max_message_count=5, max_wait_time=5):\n        try:\n            order = parse(msg)\n        except ValueError as e:\n            receiver.dead_letter_message(msg, reason=\"BadFormat\", error_description=str(e))\n            continue\n        try:\n            process(order)\n            receiver.complete_message(msg)\n        except TransientError:\n            receiver.abandon_message(msg)\n```",
   "Locks do not last forever. If your code does not settle a message before the lock expires, the lock lapses, the message becomes visible again and another receiver (or the same one) may process it. When the first receiver finally tries to complete it, settlement fails with a lock lost error, because it no longer holds the lock. This is why peek-lock gives at-least-once delivery rather than exactly-once, and why handlers should be idempotent: processing the same message twice must leave the system in the same state as processing it once, for example by using an upsert keyed on the order ID. The lock duration is a property of the queue or subscription, not of each message; the default is one minute and the maximum is five minutes.",
   "For work that takes longer than the lock duration, renew the lock. `receiver.renew_message_lock(msg)` extends it once, which you would have to call repeatedly in a long job. `AutoLockRenewer`, as in the example, keeps renewing in the background up to a maximum total duration you choose, such as ten minutes, and it can be attached to a receiver so every received message is covered. Raising the entity's lock duration toward five minutes also helps, but work that can exceed five minutes still needs renewal. The Azure Functions Service Bus trigger renews locks automatically and completes messages when the function succeeds or abandons them when it throws, behavior you can change in host.json, for example by turning off automatic completion and settling messages yourself.",
   "Delivery count ties these ideas together. Each time a message is delivered in peek-lock mode its delivery count increases, whether it was abandoned or its lock simply expired. When the count passes the queue's max delivery count, Service Bus dead-letters it automatically. That safety net is covered in the next lesson, but remember the link: a lock that keeps expiring on a slow job can push a perfectly good message into the dead-letter queue.",
   "For the exam, translate the scenario wording. Must not lose messages means peek-lock. Occasional loss acceptable and maximum speed means receive-and-delete. Lock lost errors or duplicate processing on long jobs mean lock renewal or a longer lock duration, plus idempotent handlers. A message that depends on one not yet arrived suggests defer."
  ],
  "analogy": "Peek-lock is like a coat check that gives you a timed ticket. The coat stays in the cloakroom while you hold the ticket, and you either collect it (complete), hand the ticket back (abandon), or report it damaged (dead-letter). If your ticket expires, staff may hand the coat to someone else. Receive-and-delete is like grabbing your coat with no ticket: quick, but if you drop it on the way out, nobody has a record. The analogy stops at defer, which is like asking staff to store the coat under a number only you know.",
  "mnemonic": "Peek-lock settlement options, CADD: Complete, Abandon, Dead-letter, Defer.",
  "terms": [
   [
    "Peek-lock",
    "The default receive mode that locks a message until the receiver completes, abandons, defers or dead-letters it."
   ],
   [
    "Receive-and-delete",
    "A receive mode that removes the message on delivery, giving at-most-once processing."
   ],
   [
    "Lock duration",
    "How long a received message stays locked to one receiver before becoming visible again; default one minute, maximum five."
   ],
   [
    "Defer",
    "Settling a message so it stays in the queue but can only be received again by its sequence number."
   ],
   [
    "AutoLockRenewer",
    "A Python SDK helper that renews message locks in the background during long processing."
   ],
   [
    "Idempotent handler",
    "Processing logic that produces the same result whether a message is handled once or several times, needed for at-least-once delivery."
   ]
  ],
  "example": "A PDF-embedding worker using peek-lock took about three minutes per document, and some documents were processed twice with lock lost errors on completion. The lock duration was one minute. The team added AutoLockRenewer with a ten-minute maximum and made the upsert idempotent; duplicates stopped and completions succeeded.",
  "mistakes": [
   [
    "Thinking receive-and-delete is safer because the message is removed right away.",
    "It is the risky option: the message is gone before processing finishes, so a crash loses it. Peek-lock keeps it until the receiver completes it."
   ],
   [
    "Believing defer and abandon do the same thing.",
    "Abandon makes the message immediately available to any receiver and increases its delivery count. Defer hides it from normal receives, and only a receive by sequence number can get it back."
   ],
   [
    "Setting the lock duration to 30 minutes for long jobs.",
    "The maximum lock duration is five minutes. Longer work must renew the lock, for example with AutoLockRenewer."
   ],
   [
    "Assuming peek-lock gives exactly-once processing.",
    "It gives at-least-once delivery. Lock expiry or crashes can cause redelivery, so handlers should be idempotent."
   ]
  ],
  "tryit": [
   [
    "Ridgeway Freight's invoice worker receives in peek-lock mode. Sometimes an invoice-adjustment message arrives before the original invoice message it refers to. The team does not want to dead-letter the adjustment or keep spinning on it. What settlement should they use, and what must the code remember?",
    "Defer the adjustment message and store its sequence number (for example with the invoice ID). When the original invoice is processed, fetch the deferred message by sequence number and process it. Abandon would just redeliver it right away and burn delivery attempts."
   ],
   [
    "A metrics collector reads a queue of CPU samples sent every second from thousands of servers. Throughput matters more than any single sample. Which receive mode fits?",
    "Receive-and-delete. Losing an occasional sample on a crash is acceptable, and it avoids the extra settlement round trip that peek-lock requires."
   ]
  ],
  "tip": "Messages must not be lost means peek-lock; lock lost errors on long jobs mean renew the lock (AutoLockRenewer) or raise the lock duration up to five minutes; abandon increments the delivery count.",
  "check": [
   [
    "Which receive mode risks losing messages if the consumer crashes, and why?",
    "Receive-and-delete, because the message is removed as soon as it is delivered, before processing finishes."
   ],
   [
    "What is the difference between abandon and defer?",
    "Abandon makes the message available again for normal receiving; defer keeps it aside so it can only be fetched by sequence number."
   ],
   [
    "A peek-lock receiver's processing takes about four minutes. The lock duration is one minute. What two changes help?",
    "Renew the lock during processing (for example AutoLockRenewer) and optionally raise the lock duration up to the five-minute maximum; also make the handler idempotent."
   ]
  ]
 },
 {
  "t": "Dead-letter queues: max delivery count, TTL expiry, reading the $DeadLetterQueue subqueue",
  "hook": "Marcus, the operations lead at Fernhill Pharmacy Group, forwards you a dashboard screenshot with one line: \"Why is this number 40 and climbing?\" The number is the dead-lettered message count on the prescriptions queue. The main queue looks healthy, the worker is running and no errors reached the help desk. Yet forty refill requests have quietly stepped out of the normal flow. Where exactly are those messages, how did they get there, and how do you get them processed without losing a single one?",
  "simple": "Sometimes a message cannot be delivered or keeps failing. Instead of throwing it away or letting it block everything else, Service Bus moves it to a side shelf called the dead-letter queue. Every queue and every subscription has its own side shelf automatically. Messages land there when they fail too many times, when they get too old (only if you turned that option on), or when your code decides they are broken. Nothing on the shelf gets processed or deleted on its own. Someone has to look at it, fix the cause and send the messages back. It is like a lost-and-found box: items stay there until a person deals with them.",
  "body": [
   "Every Service Bus queue and every topic subscription has a secondary subqueue called the dead-letter queue (DLQ). It holds messages that could not be delivered or processed, so they stop blocking or looping in the main queue but are not silently lost. You do not create it and cannot delete it; it always exists alongside its parent entity. Its path is the entity path followed by `/$DeadLetterQueue`, for example `orders/$DeadLetterQueue` for a queue or `orders/subscriptions/billing/$DeadLetterQueue` for a subscription. Note that a topic itself has no DLQ to read from; the dead-letter queues belong to its subscriptions.",
   "Messages reach the DLQ in three main ways, and each leaves a recognizable reason on the message. The first is exceeding max delivery count. In peek-lock mode, each time a message is delivered and not completed, because it was abandoned or its lock expired, its delivery count rises. When the count exceeds the entity's max delivery count (the default is 10), Service Bus moves the message to the DLQ and sets the dead-letter reason to `MaxDeliveryCountExceeded`. This protects you from poison messages, messages that fail every time and would otherwise loop forever, consuming worker time and possibly delaying healthy messages.",
   "The second way is expiry. Every message has a time to live (TTL), set on the message or inherited from the entity's default. When it expires, the message is simply dropped unless dead-lettering on message expiration is enabled on the queue or subscription. If it is enabled, the expired message moves to the DLQ with the reason `TTLExpiredException`. That setting is off by default, a common exam detail: a scenario that complains about expired messages disappearing without a trace is solved by enabling it. For subscriptions there is also a separate option to dead-letter messages when evaluating a filter throws an exception.",
   "Both automatic paths are controlled by settings on the entity, which you choose when you create a queue or subscription and can change later. In the Azure CLI, `az servicebus queue create` accepts `--max-delivery-count` to raise or lower the retry budget and `--enable-dead-lettering-on-message-expiration true` to keep expired messages. Lowering max delivery count makes poison messages surface sooner; raising it gives flaky downstream services more chances. Neither setting fixes the underlying bug, but together they decide how quickly a problem becomes visible in the DLQ instead of hiding in retries or vanishing.",
   "The third way is explicit dead-lettering by your own code: `receiver.dead_letter_message(msg, reason=..., error_description=...)`. Use it for messages you know cannot be processed, such as invalid JSON or a missing required field. Explicit dead-lettering is better than letting a bad message be retried until the count runs out, because it saves ten pointless attempts and records a precise, human-readable reason for whoever investigates.",
   "A DLQ needs an owner. Dead-lettered messages do not expire on their own and are not processed automatically, so you need an operational process. Alert on the dead-lettered message count metric in Azure Monitor, inspect the messages, fix the cause, then resubmit or discard them. In Python, you read the DLQ by requesting the dead-letter subqueue when you create a receiver, as shown below. Each message carries `dead_letter_reason`, `dead_letter_error_description` and its `delivery_count`, which together usually tell you what went wrong.",
   "```python\nfrom azure.servicebus import ServiceBusSubQueue\n\nwith client.get_queue_receiver(\"orders\", sub_queue=ServiceBusSubQueue.DEAD_LETTER) as dlq:\n    for msg in dlq.receive_messages(max_message_count=20, max_wait_time=5):\n        print(msg.sequence_number, msg.dead_letter_reason,\n              msg.dead_letter_error_description, msg.delivery_count)\n        # after fixing the cause: resend a copy to the main queue, then\n        dlq.complete_message(msg)\n```",
   "Resubmitting is a copy-then-complete operation. Create a new message with the same body and application properties, send it to the main queue and then complete the dead-lettered copy so it leaves the DLQ. Completing first and sending second risks losing the message if the send fails, so the order matters. The portal's Service Bus Explorer can also peek at and resend dead-lettered messages, which is handy in labs and small incidents. For topics, remember each subscription has its own DLQ, so a failing billing consumer fills only the billing subscription's DLQ and does not affect shipping.",
   "Putting it together for exam questions: a message that keeps failing ends up in the DLQ after more than max delivery count attempts; an expired message is dropped unless expiration dead-lettering is on; and nothing in the DLQ will move again until your code or an operator acts. If a question asks how to find out why messages failed, the answer is to read the dead-letter subqueue and examine the dead-letter reason and description."
  ],
  "analogy": "A dead-letter queue is the returns shelf behind a store counter. A package lands there if delivery failed too many times, if the customer wrote a bad address, or (only when the store opted in) if it sat unclaimed past its date. The shelf never empties itself, and each counter in the store has its own shelf. The analogy stops in one place: an unopted expired package in Service Bus is not placed on the shelf at all; it is discarded.",
  "mnemonic": "Three ways into the DLQ, ACE: Attempts exceeded (max delivery count), Code dead-letters it explicitly, Expired TTL (only when expiration dead-lettering is enabled).",
  "terms": [
   [
    "Dead-letter queue",
    "A built-in subqueue of each queue or subscription that holds messages that could not be delivered or processed."
   ],
   [
    "Max delivery count",
    "The number of delivery attempts after which Service Bus automatically dead-letters a message; default 10."
   ],
   [
    "Poison message",
    "A message that fails processing every time and would loop forever without dead-lettering."
   ],
   [
    "Dead-lettering on expiration",
    "An entity setting, off by default, that moves expired messages to the DLQ instead of dropping them."
   ],
   [
    "Dead-letter reason",
    "A property set on a dead-lettered message, such as MaxDeliveryCountExceeded or TTLExpiredException, explaining why it was moved."
   ]
  ],
  "example": "Operations notice an alert that the orders DLQ holds 40 messages. A script reading the DEAD_LETTER subqueue shows the reason MaxDeliveryCountExceeded for all of them, and the error descriptions point to a missing currency field sent by a new partner. After a code fix accepts the field, the team resends copies to the main queue and completes the dead-lettered originals.",
  "mistakes": [
   [
    "Assuming expired messages always go to the dead-letter queue.",
    "Dead-lettering on message expiration is off by default. Without it, expired messages are dropped."
   ],
   [
    "Expecting dead-lettered messages to be retried or cleaned up automatically.",
    "They stay in the DLQ indefinitely until a receiver settles them. You need monitoring and a resubmit process."
   ],
   [
    "Looking for one dead-letter queue on the topic.",
    "Each subscription has its own DLQ at topic/subscriptions/name/$DeadLetterQueue."
   ],
   [
    "Completing the dead-lettered message before resending it.",
    "Send the copy to the main queue first, then complete the DLQ message, so a failed send does not lose the data."
   ]
  ],
  "tryit": [
   [
    "Oakmont Transit sends ticket-purchase messages with a 30-minute TTL. Auditors notice that some purchases simply vanished during an outage, with no record in the DLQ. Max delivery count was never reached. What happened, and what do you change?",
    "The messages expired and were dropped, because dead-lettering on message expiration is off by default. Enable it on the queue (or subscriptions) so expired messages move to the DLQ with the reason TTLExpiredException and can be reviewed or resubmitted."
   ]
  ],
  "tip": "Expired messages are dropped, not dead-lettered, unless dead-lettering on message expiration is enabled; poison messages land in the DLQ after exceeding max delivery count (default 10).",
  "check": [
   [
    "What is the path of the dead-letter queue for a subscription named audit on topic events?",
    "events/subscriptions/audit/$DeadLetterQueue, since each subscription has its own dead-letter subqueue."
   ],
   [
    "Do messages in the DLQ expire or get retried automatically?",
    "No. They stay until you receive and settle them, so you need monitoring and a resubmit process."
   ],
   [
    "Which dead-letter reason indicates a poison message that failed repeatedly?",
    "MaxDeliveryCountExceeded, set when the delivery count exceeds the entity's max delivery count (default 10)."
   ]
  ]
 },
 {
  "t": "Sessions for ordered processing, duplicate detection, scheduled messages and subscription filters (SQL and correlation)",
  "hook": "Elena at Tidewater Home Goods opens a ticket that makes no sense at first: a customer received a shipping confirmation for an order that had not been paid for yet. Ten minutes later, a second ticket arrives from the same customer: they were charged twice. You check the logs. The payment message for that order was processed after the shipping message, and the payment service had retried a send after a network blip, so the broker received it twice. Two separate problems, one bad afternoon. Which Service Bus features would have prevented each of them?",
  "simple": "Service Bus has a few extra tools in its Standard and Premium plans. Sessions keep related messages in order: give every message about the same order the same label, and they will be handled one at a time, in the order they were sent. Duplicate detection stops repeats: if the same message, with the same ID, arrives twice within a set time, the second copy is quietly dropped. Scheduled messages wait until a chosen time before anyone can see them, like a letter you post today with a do-not-open-until date. Subscription filters decide which messages each subscriber gets, so a refunds team only sees refunds.",
  "body": [
   "Standard and Premium Service Bus add features that solve common messaging problems: strict ordering, accidental duplicates, delayed delivery and routing. Each maps cleanly to a scenario, so the most useful way to learn them is as problem-solution pairs. When an exam question describes a symptom, such as events processed out of order or duplicate charges after retries, your job is to name the feature that removes it.",
   "Sessions give ordered processing of related messages. You enable sessions (the requires session setting) when you create a queue or subscription; it cannot be switched on later for an existing entity. Every message must then carry a `session_id`, such as an order ID or customer ID, and a message without one is rejected. Service Bus guarantees first-in, first-out (FIFO) delivery within a session, and a receiver locks a whole session rather than a single message, so only one receiver processes a given session at a time. Meanwhile other receivers handle other sessions in parallel, so you still scale out across many orders or customers. Sessions also offer session state, a small stored value per session that a receiver can read and update to track progress through a multistep workflow, which helps if a receiver crashes and another one picks up the session.",
   "```python\nfrom azure.servicebus import NEXT_AVAILABLE_SESSION\nsender.send_messages(ServiceBusMessage(body, session_id=\"order-1001\"))\nwith client.get_queue_receiver(\"order-steps\", session_id=NEXT_AVAILABLE_SESSION) as r:\n    print(r.session.session_id)\n    for msg in r.receive_messages(max_wait_time=5):\n        r.complete_message(msg)\n```",
   "In the code above, the sender attaches `session_id=\"order-1001\"`, and the receiver asks for `NEXT_AVAILABLE_SESSION`, which gives it whichever session is free. You can also request a specific session ID when one worker must handle a particular customer. Sessions are also the building block for request-reply patterns, where a reply is sent with a session ID that matches the requester.",
   "Duplicate detection handles the case where a sender retries after a network error and the broker receives the same message twice. The sender cannot always tell whether its first attempt succeeded, so retrying is correct behavior, and the broker needs to absorb the repeat. When enabled on a queue or topic at creation, Service Bus remembers each `message_id` for a configurable duplicate detection history window and silently drops any later message with the same ID within that window. It only works if the sender sets a meaningful message ID derived from the business data, such as the order number or an event ID, rather than a random value generated fresh on each attempt. A random GUID created per send defeats the feature entirely, because the retry looks like a brand-new message. Like sessions, duplicate detection must be chosen when the entity is created. The history window defaults to ten minutes and can be lengthened; a longer window catches late retries but means the broker tracks more message IDs, which can reduce throughput.",
   "Scheduled messages are sent now but become visible only at a chosen time. Set `scheduled_enqueue_time_utc` on the message, or call `sender.schedule_messages(msg, when)`, which returns sequence numbers you can pass to `cancel_scheduled_messages` if plans change, for example when a customer cancels before a reminder fires. Use them for reminders, delayed retries or time-based workflows such as closing an unpaid cart after an hour. Scheduled enqueue time is available in Basic too, unlike the other features in this lesson.",
   "Subscription filters decide which topic messages each subscription receives. Every new subscription starts with a default rule, named `$Default`, that accepts all messages. A SQL filter uses a SQL-like condition over message properties, for example `region = 'EU' AND amount > 100`; it is flexible but costs more to evaluate. A correlation filter matches exact values of system properties (such as subject, correlation ID, message ID or content type) and user properties; it is simpler and more efficient, so prefer it when you only need equality matches. Rules can also include a SQL action that modifies message properties as they enter the subscription, such as adding a priority flag. A Boolean true or false filter accepts everything or nothing.",
   "```bash\naz servicebus topic subscription rule create -g rg --namespace-name shop-sb \\\n  --topic-name orders --subscription-name eu-large --name EuLarge \\\n  --filter-sql-expression \"region = 'EU' AND amount > 100\"\n```",
   "Remember to delete the default rule when you add your own filter, or the subscription will keep receiving every message: rules are combined so that a message is delivered if any rule matches, and the default rule matches everything. This is one of the most common real-world mistakes and a frequent exam distractor."
  ],
  "analogy": "Sessions are like checkout lanes reserved per family: one cashier handles all of a family's items in order while other cashiers serve other families at the same time. Duplicate detection is a bouncer with a short-term memory of names, turning away anyone who already entered recently, which only works if everyone gives their real name rather than a new nickname each time. Filters are the signs that steer shoppers to the right lane. Where it stops working: the bouncer's memory lasts only for the history window.",
  "terms": [
   [
    "Session",
    "A group of messages sharing a session ID that Service Bus delivers in order to one receiver at a time."
   ],
   [
    "Duplicate detection",
    "A queue or topic setting that drops messages whose message ID was already seen within a history window."
   ],
   [
    "Scheduled message",
    "A message that is accepted immediately but becomes available to receivers only at a specified UTC time."
   ],
   [
    "SQL filter",
    "A subscription rule using a SQL-like expression over message properties."
   ],
   [
    "Correlation filter",
    "A subscription rule that matches exact values of system or user properties, cheaper than a SQL filter."
   ],
   [
    "Default rule",
    "The $Default rule created on every new subscription that accepts all messages until you remove it."
   ],
   [
    "Session state",
    "A small value stored per session that receivers can read and update to track workflow progress."
   ]
  ],
  "example": "Order events for the same order occasionally ran out of sequence, shipping before payment. The team enabled sessions on the order-steps queue and used the order ID as session ID, which forced in-order processing per order. They also enabled duplicate detection keyed on an event ID because the upstream system retried sends, and used a correlation filter on subject to route refunds to a separate subscription.",
  "mistakes": [
   [
    "Using a random GUID per send as message_id and expecting duplicate detection to work.",
    "A retry would get a new GUID and look unique. The message ID must come from business data so a retry carries the same ID."
   ],
   [
    "Choosing a SQL filter for a simple exact match on subject.",
    "A correlation filter handles equality matches on system and user properties more efficiently. Use SQL filters when you need ranges, OR conditions or functions."
   ],
   [
    "Adding a filter rule and assuming the subscription now receives only matching messages.",
    "The $Default accept-all rule is still there. Delete it, or every message keeps arriving."
   ],
   [
    "Thinking sessions force a single receiver for the whole queue.",
    "Only one receiver holds a given session at a time; many receivers can process different sessions in parallel."
   ]
  ],
  "tryit": [
   [
    "Summit Learning publishes enrollment events to a topic. The compliance subscription must receive only events whose user property country equals CA, and a separate step must process each student's events strictly in order. Which features do you configure?",
    "Give the compliance subscription a correlation filter on the user property country = CA and delete its $Default rule. Enable sessions on the subscription that needs ordering and use the student ID as session_id, so each student's events are processed FIFO by one receiver at a time."
   ]
  ],
  "tip": "FIFO per customer or order means sessions; retried sends creating duplicates means duplicate detection with business message IDs; routing on exact property values prefers correlation filters over SQL filters.",
  "check": [
   [
    "What must a sender set for duplicate detection to work?",
    "A consistent message_id derived from the business data, so a retried send carries the same ID and is dropped."
   ],
   [
    "Why might a subscription with a new SQL filter still receive every message?",
    "The default rule that accepts all messages is still present; it must be removed."
   ],
   [
    "Events for one customer must be processed in exact order, but many customers should be processed in parallel. What do you enable?",
    "Sessions, with the customer ID as session_id; FIFO is guaranteed within each session and different sessions run in parallel."
   ]
  ]
 },
 {
  "t": "Event Grid: system and custom topics, event subscriptions, filters (event type, subject begins/ends with, advanced)",
  "hook": "At Northgate Legal Services, the new contract-search feature is supposed to embed every PDF that paralegals upload. Instead, your Azure Function bill doubled overnight and the logs are full of failures: the function is being triggered for scanned images, for files deleted from an archive container, and for log blobs written by a backup job. Jordan from the platform team asks whether you need to add a dozen if statements to the function. Is there a way to stop the unwanted events before they ever reach your code?",
  "simple": "Event Grid is a notification service. When something happens in Azure, such as a file being uploaded, Event Grid sends a short note about it to whoever asked to be told. The place notes come from is called a topic. Azure services have built-in topics, called system topics, and you can create your own custom topics for your app. An event subscription is your request to be notified, plus where to send the note, like a function or a web address. Filters narrow what you receive: only certain kinds of events, only files in one folder, or only files ending in .pdf. It is like setting email rules so only the messages you care about land in your inbox.",
  "body": [
   "Azure Event Grid is a fully managed event routing service built for reactive programming. When something happens, such as a blob being created, a resource group changing or a Key Vault secret nearing expiry, Event Grid pushes a small notification, called an event, to whoever subscribed. Events describe that something happened; they are not commands or large payloads, and the publisher does not care who handles them or whether anyone does. A typical event is a few kilobytes of JSON that says what changed and where, and the handler fetches the actual data, such as the blob, if it needs it.",
   "The source side of Event Grid is a topic, an endpoint where events are sent. System topics represent Azure services that publish events on their own: Blob Storage, Resource Groups, Key Vault, Container Registry, Service Bus and many more. You create a system topic, or the portal creates one for you when you add a subscription to a resource, and you never publish to it yourself. Custom topics are topics you create for your own applications; your code publishes events to their endpoint using an access key or Microsoft Entra authentication, for example with the `azure-eventgrid` Python package. Event domains group many custom topics under one endpoint for multitenant scenarios, such as one topic per customer of a software-as-a-service product.",
   "The consumer side is an event subscription, which connects a topic to an event handler and says which events to deliver. Handlers include webhooks (any HTTPS endpoint), Azure Functions, Service Bus queues and topics, Storage queues, Event Hubs and Logic Apps. A topic can have many subscriptions, each with its own filters and handler, so one storage account's events can drive a thumbnail function, an audit log and a notification workflow independently. Each delivery is independent: if the audit handler is down, the thumbnail function still receives its events, because Event Grid tracks delivery per subscription. Subscriptions can also be created at broader scopes, such as a resource group or an Azure subscription, to react to resource management events across many resources.",
   "Filters keep handlers from receiving events they do not care about, which saves cost and simplifies code. There are three kinds, and an event must pass all the filters configured on a subscription to be delivered.",
   "Event type filtering lists the event types to include, such as `Microsoft.Storage.BlobCreated` but not `Microsoft.Storage.BlobDeleted`. By default a subscription receives all event types the topic offers, so narrowing this list is usually the first step.",
   "Subject filtering matches the start or end of the event's subject, a path-like string set by the publisher. For Blob Storage the subject looks like `/blobServices/default/containers/uploads/blobs/report.pdf`. A subject begins with filter of `/blobServices/default/containers/uploads/` limits events to one container, or to a virtual folder if you extend the path with `blobs/folder/`. A subject ends with filter of `.pdf` limits events to PDF files. Each subscription takes one begins-with value and one ends-with value, and you can choose whether matching is case-sensitive.",
   "Advanced filters compare fields in the event data or envelope with operators such as NumberGreaterThan, StringContains, StringIn, BoolEquals and IsNotNull. The key is a path such as `data.contentLength` or `data.api`, and some operators accept several values, which count as OR within that one filter. Across separate advanced filters, all conditions must be true for an event to be delivered. The CLI example below combines all three filter types.",
   "```bash\naz eventgrid event-subscription create --name pdf-uploads \\\n  --source-resource-id $STORAGE_ID \\\n  --endpoint-type azurefunction --endpoint $FUNCTION_ID \\\n  --included-event-types Microsoft.Storage.BlobCreated \\\n  --subject-begins-with /blobServices/default/containers/uploads/ \\\n  --subject-ends-with .pdf \\\n  --advanced-filter data.contentLength NumberGreaterThan 0\n```",
   "Event Grid is push-based and scales without you managing capacity, with pricing per operation. Compare this with Service Bus, where receivers pull messages when they are ready. Event Grid is ideal for lightweight notifications fanned out to many handlers in near real time, while Service Bus is ideal for reliable, ordered processing of business messages. A common combination is an Event Grid subscription that delivers to a Service Bus queue, so a worker can process events at its own pace with peek-lock and dead-lettering.",
   "For the exam, remember the vocabulary: Azure services emit to system topics, your code publishes to custom topics, subscriptions connect a topic to a handler, and filters are set on the subscription, not on the topic. Container or folder scoping is a subject begins with filter, file extension scoping is a subject ends with filter, and anything about values inside the event data calls for an advanced filter."
  ],
  "analogy": "Event Grid works like a building's mailroom with forwarding rules. Each department (an Azure service) drops notices into its own pigeonhole (a system topic), and you can install your own pigeonhole for your app (a custom topic). Each forwarding rule (an event subscription) says which notices go to which desk, filtered by notice type, the address line's start or end, or details inside. The analogy stops at delivery: Event Grid actively carries the notice to the desk and retries if nobody answers, rather than waiting for you to collect it.",
  "terms": [
   [
    "System topic",
    "An Event Grid topic that represents events published automatically by an Azure service."
   ],
   [
    "Custom topic",
    "An Event Grid topic you create and publish your own application events to."
   ],
   [
    "Event subscription",
    "The configuration linking a topic to a handler, with filters deciding which events are delivered."
   ],
   [
    "Subject filter",
    "A filter matching the beginning or end of an event's subject path, such as a container or file extension."
   ],
   [
    "Advanced filter",
    "A filter on event data or envelope fields using operators like NumberGreaterThan or StringContains."
   ],
   [
    "Event handler",
    "The destination an event subscription delivers to, such as a webhook, Azure Function, Service Bus queue or Storage queue."
   ],
   [
    "Event domain",
    "An Event Grid resource that groups many custom topics under one endpoint for multitenant publishing."
   ]
  ],
  "example": "A document pipeline must embed only PDFs uploaded to the uploads container. An Event Grid subscription on the storage account's system topic filters on BlobCreated, subject begins with the uploads container path and subject ends with .pdf, and delivers to an Azure Function. Images uploaded to the same container and files in other containers never trigger the function.",
  "mistakes": [
   [
    "Publishing your own application events to a system topic.",
    "System topics carry only events emitted by Azure services. Your code publishes to a custom topic (or an event domain)."
   ],
   [
    "Using subject ends with to restrict events to one container.",
    "The container appears near the start of the subject, so use subject begins with /blobServices/default/containers/name/. Ends with is for extensions such as .pdf."
   ],
   [
    "Filtering out unwanted events inside the function code.",
    "That still invokes and bills the function for every event. Filter on the event subscription so unwanted events are never delivered."
   ],
   [
    "Thinking advanced filters are combined with OR.",
    "Separate advanced filters must all be true. Only multiple values within a single filter (such as StringIn) act as OR."
   ]
  ],
  "tryit": [
   [
    "Bayview Hospital's imaging team wants a Logic App to run only when a new file ending in .dcm lands in the scans container of a storage account, and only if the file is not empty. Deletions and other containers must be ignored. How do you configure the event subscription?",
    "Create an event subscription on the storage account's system topic with included event type Microsoft.Storage.BlobCreated, subject begins with /blobServices/default/containers/scans/, subject ends with .dcm, and an advanced filter data.contentLength NumberGreaterThan 0, with the Logic App as handler."
   ]
  ],
  "tip": "Azure services emit to system topics; your code publishes to custom topics. To filter by container or folder use subject begins with; to filter by file extension use subject ends with.",
  "check": [
   [
    "How do you limit a Blob Storage event subscription to one container?",
    "Use a subject begins with filter set to the container's path, /blobServices/default/containers/<name>/."
   ],
   [
    "What is the difference between a system topic and a custom topic?",
    "A system topic carries events emitted by an Azure service; a custom topic receives events your own application publishes."
   ],
   [
    "An app needs to react to blob uploads but ignore deletions. Which filter type handles this?",
    "An event type filter including Microsoft.Storage.BlobCreated and excluding BlobDeleted."
   ]
  ]
 },
 {
  "t": "Event Grid delivery: retry policy, event time-to-live, dead-lettering to Blob Storage, webhook validation, CloudEvents schema",
  "hook": "Thursday afternoon at Cedar Valley Insurance, a partner calls: their claims webhook was down from Tuesday morning until an hour ago, and they want every claim-status event they missed. You check the Event Grid subscription that feeds them. Events from the last day are still being retried, but anything older than that is simply gone, and there is no copy anywhere. Sam, your manager, asks the obvious questions: how long does Event Grid keep trying, why did it stop, and how do we make sure this never loses data again?",
  "simple": "Event Grid tries hard to deliver every event, but not forever. If the receiving app does not answer with a success message, Event Grid waits and tries again, leaving longer gaps each time. By default it gives up after 30 tries or 24 hours, whichever comes first. When it gives up, the event is thrown away, unless you told Event Grid to save failed events into a storage container, which is called dead-lettering. Before sending anything to a new web address, Event Grid also checks that you really own it, like a bank confirming a new payee. Events can be written in two formats: Event Grid's own, or CloudEvents, an open standard many tools understand.",
  "body": [
   "Event Grid delivers each event to each matching subscription at least once. If the handler does not acknowledge success, Event Grid retries. Understanding how delivery works helps you build handlers that neither lose events nor break under retries, and it explains several defaults the exam likes to test.",
   "Acknowledgment is simple: a handler signals success by returning an HTTP success status, such as 200 OK or 202 Accepted, within the delivery timeout. Anything else counts as a failure. Failures and timeouts trigger the retry policy: Event Grid waits and retries on an exponential backoff schedule with some randomization, so retry gaps grow from seconds to minutes to hours and many subscribers do not retry in lockstep. Some errors that retrying cannot fix, such as certain 400 Bad Request or 413 Request Entity Too Large responses, are not retried at all, because sending the same event again would fail the same way. Because an event may arrive more than once, for example when a handler processed it but its response was lost, handlers should be idempotent, typically by tracking the event `id` and skipping ones already handled.",
   "Each subscription's retry policy has two limits: maximum delivery attempts and event time-to-live (TTL) in minutes. By default Event Grid tries up to 30 times and keeps trying for up to 1,440 minutes (24 hours), whichever limit is reached first. You can lower either value. Lower the TTL when stale events are worthless after a few minutes, such as a price-change notification for a live dashboard. Lower the attempts when you want failures to surface quickly so an operator can react. These settings live on the event subscription, so two subscriptions to the same topic can have different policies.",
   "When either limit is reached, the event is dropped unless you configured dead-lettering. Dead-lettering sends undelivered events to a Blob Storage container you specify, as JSON files, so you can inspect and replay them later. The dead-lettered record includes the original event plus information about why delivery failed, such as the last error and the number of attempts. Event Grid needs permission to write to that container, typically granted through a managed identity on the topic with a Storage Blob Data Contributor role assignment on the storage account or container. Note the contrast with Service Bus: Event Grid dead-letters to Blob Storage, not to a built-in subqueue.",
   "The CLI command below shows a subscription with a tighter retry policy and a dead-letter container. Notice that the dead-letter endpoint is the storage account resource ID followed by the blob container path.",
   "```bash\naz eventgrid event-subscription create --name orders-hook \\\n  --source-resource-id $TOPIC_ID --endpoint $WEBHOOK_URL \\\n  --max-delivery-attempts 10 --event-ttl 120 \\\n  --deadletter-endpoint $STORAGE_ID/blobServices/default/containers/eg-deadletter\n```",
   "Webhook validation protects third parties. Before delivering to a webhook, Event Grid validates that you own the endpoint, so nobody can point a flood of events at someone else's service. With the Event Grid schema, it sends a `Microsoft.EventGrid.SubscriptionValidationEvent` whose data contains a `validationCode`. Your endpoint proves ownership in one of two ways. Synchronously, it returns the code in the response body as `validationResponse`, which is the usual approach for code you write. Manually, someone sends a GET request to the `validationUrl` included in the event within a limited time, which helps when you cannot change the endpoint's code. With the CloudEvents schema, validation instead uses the CloudEvents webhook abuse-protection handshake: an HTTP OPTIONS request with a `WebHook-Request-Origin` header, answered with a `WebHook-Allowed-Origin` header. Azure Functions, Logic Apps and other Azure handlers complete validation for you, so you only write this logic for custom webhooks.",
   "Finally, the event schema decides the shape of each event. Event Grid supports two. The Event Grid schema uses fields such as `id`, `topic`, `subject`, `eventType`, `eventTime`, `data` and `dataVersion`. CloudEvents v1.0 is an open, vendor-neutral specification from the CNCF (Cloud Native Computing Foundation), with fields such as `id`, `source`, `type`, `subject`, `time`, `specversion` and `data`. Notice the renamed fields: `eventType` becomes `type`, `eventTime` becomes `time`, and the publishing resource appears in `source`. Choose CloudEvents for interoperability across clouds and tools. You set the input schema on a custom topic when you create it and the delivery schema on each event subscription.",
   "In exam scenarios, look for these cues. Events lost after a long outage means configure dead-lettering to Blob Storage, and possibly review the TTL. A custom webhook subscription stuck in a failed validation state means the endpoint did not echo `validationCode` as `validationResponse` or handle the CloudEvents OPTIONS request. Interoperability or a multicloud requirement means CloudEvents."
  ],
  "analogy": "Event Grid delivery is like a courier with a package that needs a signature. If nobody answers, the courier returns later, waiting longer each time, but gives up after a set number of visits or days. Without instructions, an undeliverable package is discarded; with dead-lettering, it goes to a storage unit you named. Validation is the courier first calling to confirm you really live at that address. The analogy stops at duplicates: a real courier never delivers the same package twice, but Event Grid occasionally can.",
  "terms": [
   [
    "Retry policy",
    "Per-subscription limits on delivery attempts and event time-to-live that govern Event Grid retries."
   ],
   [
    "Event time-to-live",
    "The number of minutes Event Grid keeps retrying an event before giving up; default 1,440."
   ],
   [
    "Dead-letter destination",
    "A Blob Storage container where Event Grid writes events it could not deliver."
   ],
   [
    "Validation handshake",
    "The process by which a webhook proves it owns the endpoint before Event Grid delivers events."
   ],
   [
    "CloudEvents",
    "An open specification for describing event data in a common format across services and clouds."
   ],
   [
    "validationCode",
    "The value in a SubscriptionValidationEvent that a custom webhook returns as validationResponse to prove it owns the endpoint."
   ]
  ],
  "example": "A partner's webhook was down for two days. Events older than 24 hours were lost because the subscription had no dead-letter destination. The team configured dead-lettering to a storage container, reduced max delivery attempts for faster failure detection, and wrote a small replay tool that reads the dead-lettered JSON blobs and republishes them when the partner recovers.",
  "mistakes": [
   [
    "Assuming Event Grid keeps undelivered events somewhere by default.",
    "After 30 attempts or 1,440 minutes (whichever comes first), events are dropped unless dead-lettering to a Blob Storage container is configured."
   ],
   [
    "Expecting Event Grid dead-letters to appear in a $DeadLetterQueue subqueue.",
    "That is Service Bus. Event Grid writes dead-lettered events as JSON to a Blob Storage container you choose."
   ],
   [
    "Returning 200 OK with an empty body to the SubscriptionValidationEvent.",
    "Synchronous validation requires returning the validationCode in the body as validationResponse, or calling the validationUrl."
   ],
   [
    "Believing every failed delivery is retried.",
    "Errors that retrying cannot fix, such as certain 400 or 413 responses, are not retried."
   ]
  ],
  "tryit": [
   [
    "Willow Creek Utilities sends outage notifications through Event Grid to a text-message webhook. A notification older than 15 minutes is useless and confusing to customers, but failures must still be reviewable later. What do you set on the subscription?",
    "Set the event time-to-live to 15 minutes (and optionally fewer max delivery attempts) so stale notifications stop retrying, and configure a dead-letter destination in Blob Storage so undelivered events are kept for review rather than dropped."
   ]
  ],
  "tip": "Defaults to remember: 30 delivery attempts and 1,440 minutes TTL; undelivered events are dropped unless dead-lettering to Blob Storage is configured. A custom webhook must echo validationCode as validationResponse (or call validationUrl).",
  "check": [
   [
    "What happens to an event that exhausts its retries when no dead-letter destination is set?",
    "It is dropped; configure dead-lettering to a Blob Storage container to keep undelivered events."
   ],
   [
    "How does a custom webhook complete Event Grid schema validation synchronously?",
    "It responds to the SubscriptionValidationEvent with the validationCode returned as validationResponse in the body."
   ],
   [
    "In the CloudEvents schema, what field replaces eventType from the Event Grid schema?",
    "type; similarly eventTime becomes time, and the publisher appears in source."
   ]
  ]
 },
 {
  "t": "Picking Service Bus, Event Grid or Event Hubs for a scenario",
  "hook": "It is design review day at Meridian Wind Energy. On the whiteboard are three requirements: turbines send vibration readings every second for analytics, a maintenance function must run whenever an inspection photo is uploaded, and each completed repair must create exactly one invoice, in order per customer. Ava, the architect, has drawn a single Service Bus queue under all three. Leo argues for Event Grid everywhere because it is serverless. Someone else says Event Hubs can do it all. They turn to you. Which service actually fits each requirement, and how do you explain it in one sentence each?",
  "simple": "Azure has three services for passing information between programs, and they solve different problems. Service Bus is for important instructions that must be done reliably, like a to-do list where nothing can be skipped: create this order, charge this card. Event Grid is for quick announcements that something happened, like a doorbell: a file was uploaded, a setting changed. Event Hubs is for huge, nonstop streams of readings, like a firehose of sensor data that many teams want to study and even rewind. To choose, ask: is this a task someone must finish, a single announcement, or a constant stream?",
  "body": [
   "Azure has three messaging services that sound similar, and the exam regularly describes a scenario and asks which one fits. The key is to separate messages from events, and then discrete events from streams. Once you can classify what is flowing between the systems, the service choice usually follows directly.",
   "Start with messages versus events. A message is data the sender expects someone to act on: \"create this order\", \"charge this card\". The sender cares that it is processed, often exactly once in business terms, and possibly in order. An event is a notification that something happened: \"blob created\", \"secret near expiry\". The publisher has no expectation about who reacts, or whether anyone does. Events come in two flavors. Discrete events each report a single state change and are individually meaningful and actionable. Series events, often called telemetry streams, get their value from analyzing many events over time, like temperature readings every second, where any single reading matters little.",
   "Choose Azure Service Bus for high-value enterprise messaging. It offers durable queues and topics, peek-lock with complete, abandon and dead-letter, sessions for FIFO (first-in, first-out) ordering, duplicate detection, scheduled delivery, transactions and dead-letter queues. Receivers pull at their own pace, which makes it excellent for load leveling: a burst of orders at noon sits safely in the queue while workers drain it steadily. Typical scenarios are order processing, payment workflows, decoupling a web front end from back-end workers and smoothing out spikes of work. Keywords that point to it: ordered, transactional, guaranteed processing, dead-letter, sessions and competing consumers.",
   "Choose Azure Event Grid for reactive, discrete events. It pushes lightweight notifications to many subscribers with filtering by event type and subject, and it integrates natively with Azure services through system topics, so you can react to storage, Key Vault or resource changes without writing any polling code. It retries with backoff and can dead-letter to storage. Typical scenarios are running a function when a blob is uploaded, notifying when a resource changes, starting secret rotation when Key Vault reports near expiry and fanning out custom application events to several handlers. Keywords: react to, when something happens, Azure resource events, serverless, push and near real time.",
   "Choose Azure Event Hubs for big-data streaming. It ingests millions of events per second into partitions, which are ordered sequences that let many readers work in parallel. It retains events for a configurable period, so multiple consumer groups can read the same stream independently and replay it from an offset, which is how a data science team can reprocess yesterday's data without disturbing the live dashboard. It can automatically archive data to storage with Capture, and it exposes a Kafka-compatible endpoint, so existing Apache Kafka clients can send to it with configuration changes rather than rewrites. Typical scenarios are IoT telemetry, clickstreams, and application logs and metrics pipelines feeding Stream Analytics or a data lake. Keywords: telemetry, stream, high throughput, millions of events, partitions, replay, consumer groups and Kafka.",
   "Real designs often combine them, and the exam likes these combinations. A blob upload raises an Event Grid event, the subscription delivers it to a Service Bus queue, and a worker processes each document reliably with peek-lock and dead-lettering, at a pace the downstream AI service can handle. Or devices stream telemetry to Event Hubs, a stream processor detects anomalies and publishes discrete alert events to Event Grid, which notifies an on-call function. Each service handles the part of the problem it was built for.",
   "Watch for distractors. Event Grid does not give you ordered processing or sessions, so it is wrong whenever strict order per customer is required. Event Hubs does not have per-message completion or dead-lettering; consumers track their own position in each partition with checkpoints, so a failed record is not automatically set aside. Service Bus is not designed for millions of telemetry events per second or for long-term replay by many independent readers, because a completed message is gone. Storage queues also exist as a simple, low-cost queue with very large capacity, but they lack sessions, topics and duplicate detection, so they fit only basic work queues.",
   "A quick decision method helps under time pressure. First ask whether the sender needs the work done (Service Bus) or is just reporting a fact. If it is a fact, ask whether each event matters on its own (Event Grid) or only in aggregate at high volume (Event Hubs). Then check the scenario for ordering, transactions, replay or Azure resource integration keywords to confirm your choice."
  ],
  "analogy": "Service Bus is a restaurant's order ticket rail: each ticket must be cooked once, in sequence, and a ticket that cannot be made goes to a problem spike. Event Grid is the restaurant's doorbell: it rings to announce an arrival, and whoever is listening reacts. Event Hubs is the security camera recorder: it captures everything continuously, and several people can rewind and review the footage later. The analogy stops at scale: a camera records one feed, while Event Hubs splits its stream across partitions so many readers work in parallel.",
  "terms": [
   [
    "Discrete event",
    "An event reporting a single state change that is meaningful on its own, well suited to Event Grid."
   ],
   [
    "Event stream",
    "A continuous sequence of events, such as telemetry, analyzed in aggregate and suited to Event Hubs."
   ],
   [
    "Consumer group",
    "An independent view of an Event Hubs stream that lets several applications read it at their own positions."
   ],
   [
    "Load leveling",
    "Using a queue to absorb bursts so workers process at a steady rate, a Service Bus strength."
   ],
   [
    "Partition",
    "An ordered sequence of events within an Event Hub that allows parallel reading by consumers."
   ],
   [
    "Checkpoint",
    "A consumer's saved position in an Event Hubs partition, used to resume reading after a restart."
   ]
  ],
  "example": "A logistics firm needs three things: trucks send GPS readings every few seconds for a live map and analytics; a dispatch function must run when a delivery photo is uploaded to storage; and each confirmed delivery must bill the customer exactly once, in order per account. The answer is Event Hubs for GPS telemetry, Event Grid for the blob upload reaction, and a Service Bus queue with sessions for billing.",
  "mistakes": [
   [
    "Choosing Event Grid when the scenario requires ordered processing per customer.",
    "Event Grid has no sessions or ordering guarantee. Use Service Bus with sessions."
   ],
   [
    "Choosing Service Bus for millions of telemetry readings per second that several teams replay.",
    "Completed Service Bus messages are gone and it is not built for that throughput. Event Hubs retains streams for replay by multiple consumer groups."
   ],
   [
    "Expecting Event Hubs to dead-letter failed records.",
    "Event Hubs has no per-message completion or dead-letter queue; consumers manage position with checkpoints and must handle bad records themselves."
   ],
   [
    "Picking Storage queues for a fan-out or duplicate-sensitive design.",
    "Storage queues lack topics, sessions and duplicate detection. Use Service Bus topics for fan-out and duplicate detection."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Bank needs three things: run a function when a new Key Vault secret version is created; process loan applications reliably with dead-lettering of malformed ones; and ingest website clickstream data at very high volume for analytics teams who replay it daily. Assign a service to each.",
    "Event Grid for the Key Vault event (a discrete Azure resource event delivered to a function), Service Bus for loan applications (guaranteed processing with peek-lock and dead-letter queues), and Event Hubs for the clickstream (high-throughput stream with retention and consumer groups for replay)."
   ]
  ],
  "tip": "Map keywords: guaranteed, ordered, transactional business messages means Service Bus; react to Azure resource or discrete events means Event Grid; high-volume telemetry streams with replay means Event Hubs.",
  "check": [
   [
    "Millions of sensor readings per second must be ingested and replayed by two analytics teams. Which service?",
    "Event Hubs, because it ingests high-volume streams into partitions and supports multiple consumer groups with retention and replay."
   ],
   [
    "A workflow needs FIFO processing per customer and dead-lettering of failures. Which service?",
    "Service Bus with sessions, since it provides ordered delivery per session ID and dead-letter queues."
   ],
   [
    "A function must run whenever a file is uploaded to Blob Storage. Which service routes that notification?",
    "Event Grid, which pushes BlobCreated events from the storage account's system topic to the function."
   ]
  ]
 },
 {
  "t": "Azure Functions Python v2 model: function_app.py, decorators, triggers and input/output bindings",
  "hook": "Rosa, a new developer at Juniper Health Partners, messages you on her first week: \"I deployed the intake function and Azure says there are zero functions in the app. The tutorial I followed had a folder per function with a function.json file, but the project template gave me one file called function_app.py full of @ symbols. Which one is right, and why can't Azure see my function?\" You open her project and see the problem within a minute. What does a modern Python function app look like, and how do its pieces fit together?",
  "simple": "Azure Functions lets you run a small piece of code whenever something happens, without looking after a server. Every function has exactly one trigger, the thing that starts it, like a web request, a timer or a new file. It can also have bindings, which are shortcuts for reading data in or sending data out without writing connection code yourself. In the current Python style, called the v2 model, you write everything in one file named function_app.py and mark each function with decorators: short labels starting with @ placed just above the function, which tell Azure what starts it and what it connects to. It is like putting a shipping label on a box instead of filling in a separate form.",
  "body": [
   "Azure Functions runs small pieces of code in response to events without you managing servers. Each function has exactly one trigger, the event that starts it, such as an HTTP request, a timer or a queue message. Optionally it has bindings, which connect it declaratively to other services for input and output. Bindings remove boilerplate: instead of writing SDK code to open a client, authenticate, read a blob or send a queue message, you declare the binding and use a parameter. The runtime does the connecting, reading and writing around your code.",
   "The Python v2 programming model defines functions in code with decorators, rather than a separate `function.json` file per function as in the older v1 model. Mixing the two styles in one app is not supported, which is a common source of confusion when following older tutorials. A v2 project has a `function_app.py` file at its root that creates a `FunctionApp` object, conventionally named `app`, and each function is a Python function decorated with a trigger and any bindings. The supporting files are `host.json` for runtime settings, `local.settings.json` for local app settings and `requirements.txt`, which must include `azure-functions` along with any other packages your code imports.",
   "The sample below defines two functions in one file: an HTTP endpoint that writes to a storage queue, and a blob-triggered function that writes a processed copy to another container.",
   "```python\nimport azure.functions as func\nimport json, logging\n\napp = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)\n\n@app.route(route=\"orders\", methods=[\"POST\"])\n@app.queue_output(arg_name=\"outmsg\", queue_name=\"new-orders\", connection=\"AzureWebJobsStorage\")\ndef create_order(req: func.HttpRequest, outmsg: func.Out[str]) -> func.HttpResponse:\n    order = req.get_json()\n    outmsg.set(json.dumps(order))\n    return func.HttpResponse(\"accepted\", status_code=202)\n\n@app.blob_trigger(arg_name=\"blob\", path=\"uploads/{name}\", connection=\"DocsStorage\")\n@app.blob_output(arg_name=\"out\", path=\"processed/{name}.txt\", connection=\"DocsStorage\")\ndef extract(blob: func.InputStream, out: func.Out[str]):\n    logging.info(\"Processing %s\", blob.name)\n    out.set(blob.read().decode(\"utf-8\", errors=\"ignore\"))\n```",
   "Walk through it line by line. `func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)` creates the app and sets the default authorization level for HTTP functions. `@app.route` makes an HTTP trigger; `req` is a `func.HttpRequest`, and the return value becomes the HTTP response, here a 202 Accepted. `@app.queue_output` adds an output binding; the `arg_name` must match a parameter of type `func.Out[...]` exactly, and calling `.set()` writes the message when the function completes successfully. If the names do not match, indexing fails and the function does not load.",
   "The blob example shows a trigger with a path pattern. In `uploads/{name}`, `{name}` is a binding expression captured from the triggering blob's name and reused in the output path `processed/{name}.txt`, so the output file is named after the input with no extra code. The trigger parameter is a `func.InputStream`, which exposes the blob's name, length and a `read()` method. Input bindings, such as `@app.blob_input` or `@app.cosmos_db_input`, load data before your code runs, for example reading a configuration blob or looking up a document by an ID taken from the trigger. One trigger, any number of input and output bindings is the rule to remember.",
   "The `connection` argument is easy to misread. It is not a connection string. It is the name of an app setting, or a prefix for a group of settings, that holds the connection details. In the sample, `connection=\"DocsStorage\"` tells the runtime to look up the setting `DocsStorage`, or settings that start with `DocsStorage__` for an identity-based connection. This indirection lets you switch from a connection string to a managed identity, or point at a different account per environment, without code changes. `AzureWebJobsStorage` is the storage account the Functions host itself uses for its own bookkeeping, such as leases, keys and blob receipts.",
   "As apps grow, keeping every function in one file becomes unwieldy. Large apps can split functions across files with blueprints: create `bp = func.Blueprint()` in a module, decorate functions on `bp` exactly as you would on `app`, and register it in `function_app.py` with `app.register_functions(bp)`. Some triggers, such as the Service Bus trigger and Blob trigger, can also bind to SDK types for richer access, for example receiving a full SDK client object rather than bytes, when the matching extension package is installed.",
   "Troubleshooting usually starts with indexing. The host discovers functions by importing `function_app.py` at startup. Functions only appear if the file imports cleanly, so an import error, such as a package missing from `requirements.txt` or a syntax error, results in no functions being found, exactly as Rosa saw. Check the startup logs locally with `func start` or in Application Insights in Azure, fix the import and redeploy."
  ],
  "analogy": "The v2 model is like a recipe card with stickers. Each recipe (function) has one sticker saying what starts it, such as when the oven timer beeps (trigger), plus stickers for ingredients delivered to the counter (input bindings) and where the finished dish goes (output bindings). The kitchen staff (runtime) handle fetching and delivering. The analogy stops at the connection sticker: it names the pantry shelf where the address is written (an app setting), not the address itself.",
  "terms": [
   [
    "Trigger",
    "The event that starts a function; every function has exactly one."
   ],
   [
    "Binding",
    "A declarative connection to another service that supplies input data or writes output without SDK code."
   ],
   [
    "function_app.py",
    "The entry file of a Python v2 function app that creates FunctionApp and defines decorated functions."
   ],
   [
    "func.Out",
    "The parameter type for an output binding; calling set() provides the value to write."
   ],
   [
    "Blueprint",
    "A v2 model feature for defining functions in separate modules and registering them with the app."
   ],
   [
    "Binding expression",
    "A placeholder such as {name} in a binding path that is filled from trigger data at run time."
   ]
  ],
  "example": "A developer wants an HTTP endpoint that accepts orders and queues them for later processing. In function_app.py they add @app.route for POST /orders and @app.queue_output bound to the new-orders queue. The function body is three lines: read JSON, set the output, return 202. No storage SDK code is needed, and a second queue-triggered function processes the orders.",
  "mistakes": [
   [
    "Giving one function two triggers, such as HTTP and queue.",
    "Each function has exactly one trigger. Write two functions, which can share helper code, or use one trigger plus bindings."
   ],
   [
    "Putting a full connection string in the connection argument.",
    "The connection argument names an app setting (or prefix) that holds the details. This keeps secrets out of code and allows identity-based connections."
   ],
   [
    "Adding function.json files to a v2 project.",
    "The v2 model uses decorators in function_app.py instead of function.json, and the two models are not mixed in one app."
   ],
   [
    "Assuming a missing package only breaks one function.",
    "If function_app.py fails to import, the host finds no functions at all. Check requirements.txt and the startup logs."
   ]
  ],
  "tryit": [
   [
    "Hollis Robotics wants a function that runs when a JSON file lands in the incoming container, reads a matching settings document from Cosmos DB by an ID in the file name, and writes a result message to a storage queue. How many triggers and bindings does it need, and of what kind?",
    "One blob trigger on incoming/{name}, one Cosmos DB input binding to load the settings document, and one queue output binding set through a func.Out parameter. That is one trigger and two bindings, all declared with decorators in function_app.py."
   ]
  ],
  "tip": "In the v2 model, decorators in function_app.py replace function.json; the connection parameter names an app setting, not a literal connection string, and each function has one trigger but any number of bindings.",
  "check": [
   [
    "How many triggers can a single function have?",
    "Exactly one, though it can have multiple input and output bindings."
   ],
   [
    "What does the connection argument in a binding decorator contain?",
    "The name of an app setting (or setting prefix) that holds connection information, not the connection string itself."
   ],
   [
    "After deployment, a v2 Python app shows no functions. What is the most likely cause?",
    "function_app.py failed to import, for example because a package is missing from requirements.txt; check the startup logs."
   ]
  ]
 },
 {
  "t": "Common triggers: HTTP (auth levels), timer (six-field NCRONTAB), Service Bus, Cosmos DB, Blob, Event Grid",
  "hook": "Theo on the night shift at Granite Peak Logistics gets paged at 2:03 a.m.: the warehouse database is pegged at full CPU. The culprit is the nightly cleanup function, which was supposed to run once at 2:00. The logs show it has started 60 times in the last minute. Down the hall, a separate complaint waits in the queue: the document-intake function takes several minutes to notice new uploads. Both problems trace back to how a trigger was configured. What did the schedule actually say, and why is the blob trigger so slow?",
  "simple": "A trigger is what starts a function. Different triggers fit different jobs. An HTTP trigger turns your function into a web address that runs when called, and you can require a key to call it. A timer trigger runs on a schedule written in a six-part code where the first part is seconds. A Service Bus trigger runs for each business message in a queue. A Cosmos DB trigger runs when documents in a database change. A Blob trigger runs when a file is added, and an Event Grid trigger runs when Azure announces that something happened. Picking a trigger is like choosing what wakes you up: an alarm clock, a phone call or a knock at the door.",
  "body": [
   "Triggers decide when your code runs, and each one has a few settings the exam expects you to know cold. This lesson walks through the six most common triggers, the detail that matters most for each, and how to choose between them.",
   "The HTTP trigger turns a function into a web endpoint at a route under `/api/` by default, such as `/api/orders`. Its authorization level controls whether a key is required. `ANONYMOUS` needs no key. `FUNCTION` requires a function-specific key or a host key, passed in the `x-functions-key` header or the `code` query parameter. `ADMIN` requires the master key. Keys are shared secrets that identify a calling app, not a person, so they are not user authentication; for real users, put App Service Authentication (often called Easy Auth), Azure API Management or your own token validation in front. Locally, under Core Tools, keys are not enforced, so a missing key will not show up as an error until you deploy.",
   "The timer trigger runs on a schedule written in NCRONTAB, a six-field cron format: `{second} {minute} {hour} {day} {month} {day-of-week}`. The extra leading seconds field is the main difference from five-field Unix cron, and it is the favorite exam detail. `0 */5 * * * *` runs every five minutes, at second zero; `0 30 9 * * 1-5` runs at 9:30 on weekdays. An asterisk in the seconds field means every second, which is exactly the bug in the opening scene. Times are UTC by default. A timer function can set `run_on_startup`, which you should avoid in production because restarts and scale events trigger extra runs, and the runtime uses a singleton lock so only one instance runs each occurrence even when the app is scaled out. The `past_due` flag tells your code when a run is late, for example after downtime.",
   "```python\n@app.timer_trigger(schedule=\"0 0 2 * * *\", arg_name=\"timer\", run_on_startup=False)\ndef nightly(timer: func.TimerRequest):\n    if timer.past_due:\n        logging.warning(\"Running late\")\n\n@app.service_bus_queue_trigger(arg_name=\"msg\", queue_name=\"orders\", connection=\"ServiceBusConn\")\ndef handle_order(msg: func.ServiceBusMessage):\n    logging.info(msg.get_body().decode())\n\n@app.event_grid_trigger(arg_name=\"event\")\ndef on_event(event: func.EventGridEvent):\n    logging.info(\"%s %s\", event.event_type, event.subject)\n```",
   "The Service Bus trigger, declared with `service_bus_queue_trigger` or with `service_bus_topic_trigger` plus a subscription name, receives messages in peek-lock mode. If the function succeeds, the runtime completes the message; if it throws, the message is abandoned and retried until exceeding the max delivery count sends it to the dead-letter queue. The runtime renews locks during long executions, and host.json controls concurrency, such as how many messages each instance processes at once. Choose it for reliable business messages.",
   "The Cosmos DB trigger runs on a container's change feed, as covered in an earlier lesson. It needs a lease container to track progress across instances, delivers batches of changed documents, and does not see deletes in latest version mode, so soft deletes with a flag are the usual workaround. In the v2 model you name the database, the container and the connection setting on the decorator, and the function receives a list of changed documents, so your code should loop over the batch rather than assume a single item.",
   "The Blob trigger fires when a blob is added or updated in a container path. The classic implementation polls the container and scans logs, so it can take time to notice new blobs on consumption-style plans and with large containers, which explains the slow intake in the opening scene. The recommended approach for low latency and reliability is the Event Grid-based blob trigger, set with `source=\"EventGrid\"` in the v2 decorator and backed by an Event Grid subscription on the storage account. The Flex Consumption plan supports only this event-based form. Either way, blob receipts stored in the host storage account prevent processing the same blob twice.",
   "The Event Grid trigger receives events pushed by an Event Grid subscription that targets the function. The runtime handles the webhook validation handshake automatically, and you can filter at the subscription level, by event type and subject, so the function only runs for relevant events. Choose it to react to Azure resource events, such as Key Vault or resource group changes, or to events on your own custom topics.",
   "When choosing, map the scenario's wording to a trigger. Request and response means HTTP. A schedule means timer. Reliable business messages mean Service Bus. Database changes mean Cosmos DB. New files mean Blob, with the Event Grid source preferred. Azure resource events mean Event Grid."
  ],
  "analogy": "NCRONTAB is like a six-dial combination lock where the first dial is seconds. Most people know the five-dial version (Unix cron) and forget the extra dial, so their combination opens at the wrong moment. Set a dial to an asterisk and it matches every value, which on the seconds dial means the lock opens 60 times in one minute. The analogy stops in that a real lock opens once; a timer fires on every matching moment.",
  "mnemonic": "NCRONTAB field order, Some Mice Hide During March Days: Second, Minute, Hour, Day, Month, Day-of-week.",
  "terms": [
   [
    "Authorization level",
    "HTTP trigger setting (anonymous, function or admin) that decides which key, if any, a caller must supply."
   ],
   [
    "NCRONTAB",
    "The six-field cron format used by timer triggers, starting with a seconds field."
   ],
   [
    "Past due",
    "A timer flag indicating the scheduled run happened later than planned, for example after downtime."
   ],
   [
    "Event Grid-based blob trigger",
    "A blob trigger that uses Event Grid notifications instead of polling for lower latency."
   ],
   [
    "Function key",
    "A shared secret required by FUNCTION-level HTTP triggers, sent in the x-functions-key header or code query parameter."
   ],
   [
    "Blob receipt",
    "A record in the host storage account that marks a blob as processed so the Blob trigger does not run twice for it."
   ]
  ],
  "example": "A nightly cleanup meant to run once at 2:00 ran sixty times each night because a developer wrote * 0 2 * * *, where the * in the leading seconds field means every second of the 2:00 minute. Rewriting it as 0 0 2 * * * fixed the schedule. The same team moved a slow polling blob trigger to the Event Grid source and saw processing start within seconds of upload.",
  "mistakes": [
   [
    "Writing timer schedules in five-field Unix cron.",
    "Functions timers use six-field NCRONTAB with seconds first; 0 */5 * * * * means every five minutes."
   ],
   [
    "Treating FUNCTION auth level as user sign-in.",
    "Function keys identify a calling app, not a user. Use App Service Authentication, API Management or token validation for user authentication."
   ],
   [
    "Keeping a polling Blob trigger when uploads must be processed within seconds.",
    "Use the Event Grid-based blob trigger (source set to EventGrid), which is also the only blob trigger option on Flex Consumption."
   ],
   [
    "Expecting the Cosmos DB trigger to fire on deletes.",
    "In latest version mode the change feed does not include deletes; use a soft-delete flag or a TTL pattern."
   ]
  ],
  "tryit": [
   [
    "Ashford Schools needs a function that sends attendance reports every weekday at 7:45 a.m. UTC, and a second function that external partner systems call over HTTPS with a shared secret. Write the timer schedule and choose the HTTP auth level.",
    "Timer schedule 0 45 7 * * 1-5 (second, minute, hour, day, month, day-of-week). Use the FUNCTION authorization level so partners must send a function key in x-functions-key or code; add proper authentication in front if individual users must be identified."
   ]
  ],
  "tip": "Timer schedules have six fields with seconds first (0 */5 * * * * is every five minutes). FUNCTION auth needs a key in x-functions-key or code; it is not user authentication.",
  "check": [
   [
    "Write an NCRONTAB expression for every day at 06:15 UTC.",
    "0 15 6 * * *, with fields second, minute, hour, day, month and day-of-week."
   ],
   [
    "What happens to a Service Bus-triggered message when the function throws an exception?",
    "The message is abandoned and retried; after exceeding max delivery count it is moved to the dead-letter queue."
   ],
   [
    "Which blob trigger form does Flex Consumption support?",
    "Only the Event Grid-based blob trigger (source set to EventGrid), not the polling implementation."
   ]
  ]
 },
 {
  "t": "Hosting plans: Flex Consumption, Premium and Dedicated; cold starts, scale limits and VNet integration",
  "hook": "Monday, 8:05 a.m., at Silverleaf Credit Union. The first employee to open the internal loan-lookup tool waits almost ten seconds for a response, then calls the help desk. By 8:10 the tool is fast again. Meanwhile, the security team has a new rule: the function must reach the loan database only through a private endpoint, with no public access. Finance wants the bill to stay near zero overnight. Nadia, the team lead, asks you which Azure Functions hosting plan can satisfy all three. What causes that slow first request, and which plan fixes it without breaking the budget?",
  "simple": "A hosting plan is the deal you pick for where your functions run and how you pay. Flex Consumption is pay-as-you-go: it adds machines when work arrives and can shrink to none when idle, so it is cheap, but the first request after a quiet period can be slow while a machine starts up. That delay is called a cold start. You can pay to keep a few machines always ready. Premium always keeps some machines warm, so there is no cold start, but it never costs zero. Dedicated means running on servers you already rent for websites. All three can reach private networks. It is like choosing between a taxi, a car on standby or your own car.",
  "body": [
   "The hosting plan decides how your function app scales, how it is billed, what networking it can use and how long functions can run. The same code runs on any plan, but the choice shapes behavior in production, from the first request of the morning to how the app reaches a private database. Exam scenarios usually give you three or four requirements, such as no cold starts, private network access or lowest idle cost, and expect you to find the one plan that meets them all.",
   "Flex Consumption is the current recommended serverless plan for new apps, and it runs on Linux. It scales dynamically based on events, including down to zero, and bills for the execution time and memory of instances while they run, plus any always-ready instances you configure. Always-ready instances keep a chosen number of instances warm for specific functions or groups to reduce cold starts, and you pay a baseline for them even when idle. Flex Consumption scales per function: HTTP functions, blob functions and Durable Functions scale as groups, while other triggers scale individually, so a burst of queue messages does not force your HTTP functions to scale. It lets you choose the instance memory size and supports virtual network integration, which older consumption hosting lacked. The older Consumption plan still exists but is considered legacy for new Linux apps.",
   "Cold starts are the main tradeoff of serverless. A cold start is the delay when a request or event arrives and no instance is running: the platform must allocate an instance, start the Functions runtime, load your Python code and import its dependencies. Python apps with heavy libraries feel this most, because importing large packages takes time. Scale-to-zero plans save money but pay this latency after idle periods, which is what the first Monday user at the credit union experienced. Mitigations are always-ready or pre-warmed instances, a lighter dependency set with lazy imports inside the functions that need them, and plans that never scale to zero.",
   "The Premium plan, also called Elastic Premium, runs on pre-warmed, always-ready instances, so there is no cold start for the minimum instance count, and it still scales out elastically on events. It supports VNet (virtual network) integration, private endpoints, longer execution times and more powerful instances. It bills per core-second and memory of allocated instances, including the minimum always-ready ones, so it never costs zero even when idle. Choose it when you need no cold starts plus event-driven scale, or features the Flex plan lacks, such as Windows hosting.",
   "The Dedicated plan runs functions on an App Service plan you already pay for, alongside web apps if you like. Scaling is manual or via App Service autoscale rules rather than event-driven, so a sudden burst of queue messages will not add instances by itself. You should enable Always On so the host stays loaded and timer or queue triggers keep firing; without it, an idle app can unload and non-HTTP triggers may stop. Choose it when you have spare capacity in an existing App Service plan, need predictable fixed costs, or need long-running functions with full control. App Service Environment is the isolated, single-tenant variant for the strictest network isolation requirements.",
   "Scale limits and timeouts differ by plan. Every plan caps the maximum number of instances an app can scale to, and you can set a lower per-app maximum to protect downstream resources such as a database that can handle only so many connections. Execution timeouts also differ. On the legacy Consumption plan, functions are limited to a short maximum run time, five minutes by default and ten at most, while Flex Consumption, Premium and Dedicated support much longer or unbounded executions. The `functionTimeout` setting in host.json controls this within the plan's allowed range. HTTP-triggered functions are additionally limited by the load balancer's idle timeout of about 230 seconds regardless of plan, so long work should be handed off to a queue and the HTTP call should return 202 Accepted quickly.",
   "Networking is often the deciding requirement. VNet integration is outbound: it lets functions reach private resources, such as a database behind a private endpoint or a service restricted to a virtual network. It is available on Flex Consumption, Premium and Dedicated, but not on the legacy Consumption plan. Inbound private access is the other direction and uses private endpoints on the function app itself, so callers inside your network can reach it without a public endpoint.",
   "To decide quickly: scale to zero with optional warm instances and VNet support points to Flex Consumption; no cold start with elastic scale and full feature set points to Premium; an existing App Service plan or fixed cost points to Dedicated with Always On."
  ],
  "analogy": "Flex Consumption is like a ride-hailing app: you pay per trip, and at quiet hours you wait a bit for a car to arrive (a cold start), unless you pay extra to keep a driver parked outside (always-ready instances). Premium is a hired car with a driver always waiting, and more cars appear when needed, but you pay for the waiting driver all night. Dedicated is your own car: fixed cost, and it only goes faster if you buy another car. The analogy stops at networking: all three can reach private roads.",
  "terms": [
   [
    "Flex Consumption",
    "A Linux serverless Functions plan with event-driven scale to zero, per-function scaling, always-ready instances and VNet integration."
   ],
   [
    "Premium plan",
    "An elastic Functions plan with pre-warmed instances, no cold start for minimum instances, and VNet support."
   ],
   [
    "Dedicated plan",
    "Running functions on an App Service plan with manual or autoscale scaling and fixed cost."
   ],
   [
    "Cold start",
    "Startup latency when a function is invoked with no warm instance available."
   ],
   [
    "Always On",
    "An App Service setting that keeps a Dedicated-plan function app loaded so triggers keep firing."
   ],
   [
    "Always-ready instances",
    "Flex Consumption instances kept warm for chosen functions or groups to reduce cold starts, billed even when idle."
   ],
   [
    "VNet integration",
    "Outbound connectivity that lets a function app reach resources in or through an Azure virtual network."
   ]
  ],
  "example": "An internal API built on Functions must call a PostgreSQL server reachable only through a private endpoint, respond without cold-start delays during business hours, and cost little overnight. The team chooses Flex Consumption with VNet integration and a small number of always-ready instances for the HTTP functions. A separate app with nightly batch work runs on an existing App Service plan with Always On.",
  "mistakes": [
   [
    "Assuming any serverless plan avoids cold starts.",
    "Scale-to-zero plans have cold starts after idle periods. Use always-ready instances on Flex Consumption or pre-warmed instances on Premium."
   ],
   [
    "Choosing the legacy Consumption plan for a function that must reach a private database.",
    "Legacy Consumption lacks VNet integration. Flex Consumption, Premium and Dedicated support it."
   ],
   [
    "Running timer triggers on a Dedicated plan without Always On.",
    "The host can unload when idle and non-HTTP triggers may stop firing. Enable Always On."
   ],
   [
    "Expecting a long HTTP request to run for 20 minutes on Premium.",
    "HTTP requests are limited by the load balancer's idle timeout regardless of plan. Return 202 quickly and hand the work to a queue-triggered function."
   ]
  ],
  "tryit": [
   [
    "Lakeshore Analytics runs a nightly batch function that takes 40 minutes, and the company already has an App Service plan for its websites with plenty of unused capacity overnight. The function uses a timer trigger. Which plan and setting fit best?",
    "Dedicated (the existing App Service plan) with Always On enabled. It reuses paid capacity, supports long executions with functionTimeout set appropriately, and Always On keeps the timer trigger firing."
   ],
   [
    "A public API must answer without cold-start delays during business hours, scale with traffic, call a private endpoint, and cost little overnight. Which plan?",
    "Flex Consumption with VNet integration and a small number of always-ready instances for the HTTP functions; it scales on demand and has a low idle cost compared with Premium's always-billed minimum instances."
   ]
  ],
  "tip": "No cold start plus elastic scale points to Premium (or Flex with always-ready instances); already paying for an App Service plan points to Dedicated with Always On; private network access needs a plan with VNet integration.",
  "check": [
   [
    "Why must Always On be enabled for a Dedicated-plan function app with timer triggers?",
    "Without it the host can unload when idle, so timers and non-HTTP triggers may stop firing."
   ],
   [
    "Name two ways to reduce cold starts for a Python function app.",
    "Use always-ready instances (Flex) or pre-warmed instances (Premium), and trim or lazily import heavy dependencies."
   ],
   [
    "Which hosting plans support VNet integration?",
    "Flex Consumption, Premium and Dedicated; the legacy Consumption plan does not."
   ]
  ]
 },
 {
  "t": "Configuration and deployment: app settings, local.settings.json, host.json, identity-based connections, `func azure functionapp publish`",
  "hook": "It is Friday at Kestrel Travel, and the new booking processor works perfectly on Dana's laptop. She runs `func azure functionapp publish`, watches it succeed, and goes to get coffee. When she returns, the function app in Azure is throwing a missing-setting error and the Service Bus queue is filling up. Nothing in the code changed between her laptop and the cloud. Something in the configuration did not make the trip. Which file stayed behind, which one went with the code, and how should the app have connected to Service Bus in the first place?",
  "simple": "A function app needs settings, such as where its storage is and how to reach other services. In Azure these live in app settings, which work like labeled sticky notes your code can read. On your own computer, a file called local.settings.json plays the same role, but it stays on your computer and is not uploaded. A different file, host.json, holds rules for the whole app, like logging and timeouts, and it is uploaded with your code. Instead of storing passwords, the app can sign in with its own Azure identity. To publish, you run one command that packages and uploads your project. It is like packing for a trip: some things go in the suitcase, and some stay home.",
  "body": [
   "A function app reads its configuration from several places, and knowing which file does what prevents a lot of \"works locally, fails in Azure\" problems. The short version: app settings in Azure and `local.settings.json` on your machine hold per-environment values, `host.json` holds app-wide runtime behavior and travels with your code, and identity-based connections let you drop secrets entirely.",
   "App settings are the environment variables of the function app in Azure. They hold connection details, feature switches and required runtime settings such as `FUNCTIONS_WORKER_RUNTIME=python` and `AzureWebJobsStorage`. Your code reads them with `os.environ`, and bindings reference them by name through the `connection` argument. You manage them in the portal's Environment variables page or with `az functionapp config appsettings set`. Changing an app setting restarts the app so the new values take effect. Values can be Key Vault references, in the form `@Microsoft.KeyVault(SecretUri=...)` or with vault and secret names, so secrets live in Key Vault and the app reads them using its managed identity.",
   "`local.settings.json` plays the same role on your machine. Azure Functions Core Tools loads its `Values` section as environment variables when you run `func start`. It is for local development only: it is not deployed by default and should be listed in `.gitignore` because it often contains secrets. Using Azurite, the local storage emulator, you can set `AzureWebJobsStorage` to `UseDevelopmentStorage=true` and avoid a cloud storage account while developing. The example below shows a typical file that already uses an identity-based Service Bus connection.",
   "```json\n{\n  \"IsEncrypted\": false,\n  \"Values\": {\n    \"FUNCTIONS_WORKER_RUNTIME\": \"python\",\n    \"AzureWebJobsStorage\": \"UseDevelopmentStorage=true\",\n    \"ServiceBusConn__fullyQualifiedNamespace\": \"shop-sb.servicebus.windows.net\"\n  }\n}\n```",
   "`host.json` configures the Functions runtime for every function in the app, and it is deployed with your code. It holds logging levels and Application Insights sampling, extension settings (for example Service Bus concurrency or whether messages are completed automatically), the `functionTimeout`, retry settings and the extension bundle version that supplies non-HTTP bindings. A change to host.json affects all functions at once, so treat it like shared infrastructure. App settings can override host.json values when you need per-environment differences, using a naming convention that starts with `AzureFunctionsJobHost__` and follows the JSON path, such as `AzureFunctionsJobHost__logging__logLevel__default`. This is handy when production needs different logging than test without editing the deployed file.",
   "Identity-based connections replace connection strings with a managed identity, removing the most common secret from your configuration. Instead of an app setting called `ServiceBusConn` containing a connection string, you create settings that share the prefix, such as `ServiceBusConn__fullyQualifiedNamespace` for Service Bus, `DocsStorage__blobServiceUri` or `DocsStorage__accountName` for Storage, and `CosmosConn__accountEndpoint` for Cosmos DB. The double underscore separates the prefix from the property name. The runtime uses the app's system-assigned identity by default; for a user-assigned identity, add `__credential` set to `managedidentity` and `__clientId` with the identity's client ID. Then grant the identity the right data roles, such as Azure Service Bus Data Receiver for a queue trigger or Storage Blob Data Owner for the host storage account. A connection with the right settings but no role assignment fails with an authorization error, so the role is not optional. Locally, the same settings use your developer sign-in through the Azure credential chain, so you also need the role on your own account for local testing.",
   "Deployment with Core Tools is `func azure functionapp publish <APP_NAME>`. It packages the project, uploads it, and for Python triggers a remote build that installs `requirements.txt` for Linux, so packages with compiled components match the server rather than your laptop. Add `--publish-local-settings` if you want to push local values to Azure app settings; it prompts before overwriting existing values, and you should take care not to overwrite production settings with development ones. In continuous integration and delivery (CI/CD) you would use GitHub Actions or Azure Pipelines with the same zip-based deployment. After publishing, `func azure functionapp list-functions <APP_NAME>` confirms which functions were indexed; an empty list usually means an import error at startup.",
   "In exam scenarios, use these cues. A setting that exists locally but not in Azure means it was only in `local.settings.json`. A change that must apply to every function, such as logging level or Service Bus concurrency, belongs in `host.json`. Removing a connection string means a `__fullyQualifiedNamespace`, `__accountName` or similar setting plus an RBAC role for the managed identity."
  ],
  "analogy": "Think of a function app as a traveling performer. host.json is the show script, packed in the suitcase and identical at every venue. App settings are the venue's local details posted backstage, different in each city. local.settings.json is the rehearsal note taped to your home mirror: useful at home, but it never leaves the house. An identity-based connection is a backstage badge instead of a door key. The analogy stops at permissions: the badge works only after the venue (RBAC) adds your name to its list.",
  "terms": [
   [
    "App settings",
    "Environment variables for a function app in Azure, read by code and referenced by bindings."
   ],
   [
    "local.settings.json",
    "A local-only file whose Values section Core Tools loads as environment variables; not deployed by default."
   ],
   [
    "host.json",
    "An app-wide runtime configuration file for logging, extensions, timeouts and sampling, deployed with the code."
   ],
   [
    "Identity-based connection",
    "A binding connection defined by settings like Prefix__fullyQualifiedNamespace that authenticates with a managed identity."
   ],
   [
    "Key Vault reference",
    "An app setting value that points to a Key Vault secret so the app reads the secret at run time with its managed identity."
   ],
   [
    "Remote build",
    "The server-side installation of requirements.txt during Python deployment so packages are built for Linux."
   ]
  ],
  "example": "A function worked locally but failed in Azure with a missing setting error. The developer had added ServiceBusConn__fullyQualifiedNamespace only to local.settings.json, which is not published. They added the app setting in Azure, granted the function app's identity Azure Service Bus Data Receiver on the queue, redeployed with func azure functionapp publish and the trigger started processing.",
  "mistakes": [
   [
    "Assuming local.settings.json is deployed with the code.",
    "It is local-only and not published by default. Create the app settings in Azure, or publish them deliberately with --publish-local-settings."
   ],
   [
    "Putting per-environment secrets in host.json.",
    "host.json is deployed with the code and applies to the whole app. Secrets belong in app settings, preferably as Key Vault references or replaced by identity-based connections."
   ],
   [
    "Configuring ServiceBusConn__fullyQualifiedNamespace and expecting it to work immediately.",
    "The managed identity also needs a data role such as Azure Service Bus Data Receiver on the namespace or entity."
   ],
   [
    "Using a single underscore in identity-based setting names.",
    "The separator is a double underscore, as in ServiceBusConn__fullyQualifiedNamespace."
   ]
  ],
  "tryit": [
   [
    "Marlow Museums wants its blob-triggered function to stop using a storage connection string. The binding uses connection=\"ArchiveStorage\" and the app has a system-assigned managed identity. What settings and permissions do you add?",
    "Replace the ArchiveStorage connection string setting with ArchiveStorage__blobServiceUri (or ArchiveStorage__accountName) pointing to the account, and grant the function app's identity Storage Blob Data Owner on that account, plus Storage Queue Data Contributor, which the blob trigger uses for its poison-blob queue. No code changes are needed because the binding still references the same ArchiveStorage prefix."
   ]
  ],
  "tip": "local.settings.json is local-only and not deployed; host.json is app-wide runtime config and is deployed; identity-based connections use double-underscore settings such as __fullyQualifiedNamespace plus an RBAC role.",
  "check": [
   [
    "Where do you configure Service Bus concurrency or auto-complete behavior for all functions in an app?",
    "In host.json, under the Service Bus extension settings."
   ],
   [
    "Which app setting lets a Service Bus trigger connect with a managed identity instead of a connection string?",
    "A setting named <connection>__fullyQualifiedNamespace with the namespace host name, plus a data role on the namespace or entity."
   ],
   [
    "A setting works locally but the deployed app reports it missing. What is the likely cause?",
    "It was only in local.settings.json, which is not deployed; add it as an app setting in Azure."
   ]
  ]
 },
 {
  "t": "Managed identities: system-assigned vs user-assigned; DefaultAzureCredential in azure-identity",
  "hook": "It is 2 a.m. and your phone buzzes. The order API at Tidewater Outfitters is returning errors on every request. You open the logs and see the same line over and over: authentication failed for the database. Then you remember the sticky note from last quarter: the database password in the app settings was set to expire after ninety days. Nobody rotated it. Nobody even remembered it existed. As you scramble to reset it, a question nags at you. Why does this app need a password at all, when it already runs inside Azure, next to the very database it is calling? Is there a way for the app to prove who it is without anyone ever holding a secret?",
  "simple": "Apps need to prove who they are before Azure services will talk to them. The old way is to give the app a password and hope nobody leaks or forgets it. A managed identity is like Azure issuing your app its own staff badge. Azure makes the badge, renews it and keeps it safe, so no person ever sees a password. There are two kinds. A system-assigned identity is a badge printed for one app; when that app is removed, the badge is shredded. A user-assigned identity is a badge you create on its own and can hand to several apps, and it stays until you delete it. A badge alone opens no doors, though. You still have to tell each service which doors that badge may open. In Python, a helper called DefaultAzureCredential finds the right badge automatically, whether the code runs on your laptop or in Azure.",
  "body": [
   "Every application that calls another Azure service has to authenticate, and the traditional answer is a stored secret: a connection string, an access key or a client secret for a service principal. Each of those secrets is a liability. It can be committed to a repository by accident, copied into a chat message, left in a container image or allowed to expire without anyone noticing. A managed identity removes that liability. When you enable one, Azure creates an identity for your resource in Microsoft Entra ID (the identity service formerly called Azure Active Directory) and manages its credentials entirely on your behalf. Nobody sees or stores a password.",
   "Here is how it works at run time. Your code asks a local token endpoint provided by the hosting platform for an access token for a particular service. The platform knows which resource is asking, so it returns a token for that resource's identity. Your code then presents the token to any service that supports Microsoft Entra authentication, such as Key Vault, Azure Storage, Service Bus, Cosmos DB, Azure SQL Database and Azure Database for PostgreSQL. Tokens are short-lived and are renewed automatically, so there is nothing to rotate.",
   "There are two kinds of managed identity, and the exam expects you to pick the right one. A system-assigned identity is switched on for a single resource, such as a web app, a function app or a container app, and it shares that resource's lifecycle. It is created when you enable it on the resource and deleted when the resource is deleted. It belongs to exactly one resource and cannot be shared. Because of that simplicity, it is the natural choice when one resource needs its own permissions and nothing else. When the resource is deleted, the identity disappears and any role assignments that pointed to it stop working, leaving orphaned entries you should clean up.",
   "A user-assigned identity is a standalone Azure resource. You create it in a resource group, then attach it to one or more compute resources, and it lives until you delete it, regardless of what happens to the resources using it. Choose it in three common situations. First, when several resources should share the same permissions, for example ten container apps that all need AcrPull on the same registry; one identity with one role assignment beats ten identities with ten assignments. Second, when you need to grant roles before the compute resource exists, which avoids the chicken-and-egg problem on a first deployment where a container app cannot pull its image because its identity has not yet been granted access. Third, when resources are frequently deleted and recreated, so you do not want to redo role assignments every time. A single resource can have a system-assigned identity and several user-assigned identities at once.",
   "One point catches many learners: an identity by itself grants nothing. Enabling a managed identity only gives the resource a name in Microsoft Entra ID. You must still assign that identity the right Azure role-based access control (RBAC) roles, such as Key Vault Secrets User or Azure Service Bus Data Sender, at the right scope. If you skip this step, the token is issued successfully but the target service answers with 403 Forbidden.",
   "On the code side, the Python `azure-identity` package provides `DefaultAzureCredential`. It is a chained credential: it tries a series of authentication methods in order and uses the first that succeeds. It checks environment variables for a service principal first, then workload identity (used with Kubernetes), then managed identity, then developer tool sign-ins such as the Azure command-line interface (CLI), Azure PowerShell and the Azure Developer CLI. The practical result is that the same code uses your `az login` account on your laptop and the managed identity once deployed to Azure, with no code changes and no secrets in configuration.",
   "```python\nfrom azure.identity import DefaultAzureCredential, ManagedIdentityCredential\nfrom azure.keyvault.secrets import SecretClient\n\ncredential = DefaultAzureCredential()\n# for a user-assigned identity: set AZURE_CLIENT_ID in app settings, or\n# credential = ManagedIdentityCredential(client_id=\"<client-id>\")\nsecrets = SecretClient(vault_url=VAULT_URL, credential=credential)\ndb_password = secrets.get_secret(\"db-password\").value\n```",
   "User-assigned identities add one more detail. When a resource has a user-assigned identity, or more than one identity, the credential has to know which one to request a token for. Set the `AZURE_CLIENT_ID` environment variable to the identity's client ID, pass `managed_identity_client_id` to `DefaultAzureCredential`, or use `ManagedIdentityCredential(client_id=...)` directly. Forgetting this is one of the most common reasons an app with several identities fails to authenticate: the platform hands back a token for a different identity, one that has no roles on the target.",
   "Finally, some production habits. Some teams prefer a specific credential such as `ManagedIdentityCredential` in production, because it avoids unexpected fallbacks to other methods and makes failures clearer in the logs. Whichever you use, create the credential and the software development kit (SDK) clients once at startup and reuse them, because they cache tokens. Creating a new credential for every request wastes time and can lead to throttling by the token endpoint."
  ],
  "analogy": "A system-assigned identity is like a hotel key card printed for one guest's stay: it works only for that guest and is deactivated at checkout. A user-assigned identity is like a staff badge issued by the company: you can create it before the new employee's first day, and it keeps working no matter which desk they move to. In both cases the card only identifies you; the door permissions (role assignments) are programmed separately. The analogy stops at sharing: a user-assigned identity can be attached to many resources at once, which a real badge cannot.",
  "mnemonic": "DefaultAzureCredential tries sources in the order \"Every Worker Must Develop\": Environment variables, Workload identity, Managed identity, then Developer tool sign-ins (Azure CLI, Azure PowerShell, Azure Developer CLI).",
  "terms": [
   [
    "Managed identity",
    "An identity in Microsoft Entra ID that Azure creates for a resource and whose credentials Azure manages, so no secret is stored."
   ],
   [
    "System-assigned identity",
    "A managed identity tied to one resource's lifecycle and deleted with it."
   ],
   [
    "User-assigned identity",
    "A standalone managed identity resource that can be attached to many resources and outlives them."
   ],
   [
    "DefaultAzureCredential",
    "An azure-identity credential that tries environment, workload identity, managed identity and developer sign-ins in order."
   ],
   [
    "AZURE_CLIENT_ID",
    "The environment variable that tells azure-identity which user-assigned managed identity to use."
   ]
  ],
  "example": "A team runs twelve container apps that all read from the same Key Vault and pull from the same registry. Instead of enabling twelve system-assigned identities and making twenty-four role assignments, they create one user-assigned identity, grant it AcrPull and Key Vault Secrets User, attach it to each app and set AZURE_CLIENT_ID. Their Python code uses DefaultAzureCredential unchanged on laptops and in Azure.",
  "mistakes": [
   [
    "Enabling a managed identity is enough for the app to read Key Vault.",
    "The identity only proves who the app is. Without a role assignment such as Key Vault Secrets User on the vault or secret, the service returns 403 Forbidden."
   ],
   [
    "Choosing a system-assigned identity for many apps that need the same access.",
    "A system-assigned identity belongs to one resource and cannot be shared. When many resources need identical permissions, or roles must exist before deployment, use a user-assigned identity."
   ],
   [
    "Thinking a user-assigned identity is deleted when the app using it is deleted.",
    "A user-assigned identity is its own resource and lives until you delete it. Only system-assigned identities share the resource's lifecycle."
   ],
   [
    "Assuming DefaultAzureCredential will automatically pick the right user-assigned identity.",
    "When a resource has a user-assigned identity or several identities, set AZURE_CLIENT_ID or pass the client ID explicitly; otherwise the wrong identity may be used."
   ]
  ],
  "tryit": [
   [
    "Saltmarsh Analytics deploys a new container app through a pipeline. On the first deployment the app cannot pull its image from the registry, because its identity does not exist until the app is created, so AcrPull cannot be granted in advance. The team recreates the app often during testing. Which identity type should they use, and why?",
    "A user-assigned identity. They can create it first, grant it AcrPull on the registry, then reference it when the container app is created, which solves the first-deployment problem. Because it outlives the app, recreating the app does not require new role assignments."
   ],
   [
    "A function app has both a system-assigned identity and one user-assigned identity. Only the user-assigned identity has Key Vault Secrets User. The Python code uses DefaultAzureCredential with no extra settings and gets 403 Forbidden from Key Vault. What is the likely fix?",
    "Set AZURE_CLIENT_ID to the user-assigned identity's client ID (or pass managed_identity_client_id). Without it, the credential requests a token for the system-assigned identity, which has no role on the vault."
   ]
  ],
  "tip": "Shared across resources or created before the resource means user-assigned; lifecycle tied to a single resource means system-assigned. With a user-assigned identity, set AZURE_CLIENT_ID so DefaultAzureCredential picks the right one, and remember the identity still needs a role.",
  "check": [
   [
    "What happens to a system-assigned identity when its web app is deleted?",
    "It is deleted too, because it shares the resource's lifecycle; its role assignments stop working and remain as orphaned entries until you remove them."
   ],
   [
    "Why does the same DefaultAzureCredential code work locally and in Azure?",
    "It tries several credential sources in order; locally it finds your developer sign-in, and in Azure it finds the managed identity."
   ],
   [
    "An app's managed identity is enabled, but calls to Service Bus return 403. What is missing?",
    "A data-plane role assignment, such as Azure Service Bus Data Sender, for that identity at the right scope."
   ]
  ]
 },
 {
  "t": "Azure RBAC data-plane roles: Key Vault Secrets User, Service Bus Data Sender/Receiver, AcrPull, Cosmos DB built-in data roles",
  "hook": "Your ticket queue at Juniper Freight has one item marked urgent. Devon, a junior developer, writes: \"I gave the function app Owner on the Cosmos DB account. Owner. The highest role there is. And every query still returns 403 Forbidden. Is Azure broken?\" You open the account and confirm it: the function's managed identity is indeed Owner. You also know Devon is not wrong to be confused, because in most of Azure, Owner sounds like it should open every door. So why can the most powerful role on the resource not read a single item from it, and what should Devon have assigned instead?",
  "simple": "Azure has two kinds of permission. One kind lets you manage a thing: create it, resize it, delete it. The other kind lets you use what is inside it: read a password, send a message, download a container image, read a database record. Having the first kind does not give you the second. It is like being the building manager who can repaint the bank's lobby but still cannot open the customers' safe deposit boxes. Apps almost never need to manage resources. They need to use the data inside, so you give them small, specific data roles: read secrets, send messages, receive messages, pull images. For Cosmos DB, the database service, those data roles are handed out through a separate Cosmos DB command rather than the usual permissions page.",
  "body": [
   "Azure separates operations into two planes, and nearly every permission question on this topic starts there. The control plane, also called the management plane, manages the resources themselves: creating a Key Vault, changing a Service Bus tier, scaling a container registry or deleting a Cosmos DB account. Those requests go through Azure Resource Manager (ARM), the deployment and management layer for Azure. The data plane works with the data inside a resource: reading a secret, sending a message, pulling an image or querying items in a container.",
   "Roles such as Owner, Contributor and Reader are control-plane roles. They let you manage a resource, but for services that use Azure role-based access control (RBAC) for data access, they do not by themselves let you read or write the data. This is a deliberate safety design: the person who can resize a vault should not automatically be able to read every password in it. Applications rarely need control-plane rights at all. They need data-plane roles, assigned to their managed identity, following least privilege: the smallest role, at the narrowest scope, that lets the app do its job.",
   "Key Vault is the first service to know well. When a vault uses the Azure RBAC permission model, Key Vault Secrets User can read secret contents, which is exactly what an application needs. Key Vault Secrets Officer can also create, update and delete secrets, which suits a rotation process or an administrator. Key Vault Reader can see metadata, such as which secrets exist and their attributes, but not the secret values. Similar pairs exist for keys (Key Vault Crypto User and Key Vault Crypto Officer) and for certificates (Key Vault Certificates Officer), and Key Vault Administrator covers every data-plane operation in the vault.",
   "Service Bus follows a sender and receiver pattern. Azure Service Bus Data Sender allows sending to queues and topics. Azure Service Bus Data Receiver allows receiving from queues and subscriptions. Azure Service Bus Data Owner allows full data access, including management of entities. Assign at the narrowest useful scope: a single queue or topic rather than the whole namespace. A producer that only places orders on a queue needs only Sender, and a worker that only processes them needs only Receiver. If a worker also needs to forward results to another queue, it gets Sender on that second queue, not Owner on the namespace.",
   "Azure Container Registry (ACR) has two roles worth memorizing. AcrPull lets an identity pull images, and AcrPush lets it push and pull. Compute platforms such as Container Apps, App Service and Azure Kubernetes Service get AcrPull, because they only need to download images. Build pipelines that publish new images get AcrPush. Other services follow the same naming pattern: Storage has roles such as Storage Blob Data Reader and Storage Blob Data Contributor, and Event Hubs has Azure Event Hubs Data Sender and Data Receiver.",
   "Cosmos DB for NoSQL is different, and it is frequently tested. Its data-plane access uses Cosmos DB's own native role-based access control, with two built-in data roles. Cosmos DB Built-in Data Reader can read items, run queries and read metadata. Cosmos DB Built-in Data Contributor can create, read, update and delete items. These are not assigned through the portal's usual Access control (IAM) page. Instead you create a Cosmos DB SQL role assignment, for example with the Azure command-line interface (CLI). The scope can be the whole account, a single database or a single container, written as a path such as `/` for the account.",
   "```bash\nPRINCIPAL=$(az identity show -g rg -n app-id --query principalId -o tsv)\naz cosmosdb sql role assignment create -g rg --account-name shop-cosmos \\\n  --role-definition-name \"Cosmos DB Built-in Data Contributor\" \\\n  --principal-id $PRINCIPAL --scope \"/\"\n\naz role assignment create --assignee $PRINCIPAL \\\n  --role \"Azure Service Bus Data Receiver\" --scope $QUEUE_ID\n```",
   "Notice that the two commands in the example are different. The first uses `az cosmosdb sql role assignment create` for the Cosmos DB native role. The second uses the general `az role assignment create` for a standard Azure RBAC role on a Service Bus queue, identified by the queue's full resource ID.",
   "Once your apps authenticate with Microsoft Entra roles, take the next step and disable local, key-based authentication on services such as Cosmos DB, Service Bus and Storage. After that, a leaked key or connection string simply stops working. Finally, expect some delay. Role assignments can take several minutes to propagate, so a 403 Forbidden immediately after you assign a role may clear on its own. A 403 that persists usually means one of three things: the wrong role (a control-plane role instead of a data role), the wrong scope (a different queue or vault) or the wrong identity (for example, a system-assigned identity when the role was given to a user-assigned one)."
  ],
  "analogy": "Think of an office building. The control plane is the facilities key: it lets you repaint rooms, add walls or demolish the floor. The data plane is the key to the filing cabinets: it lets you read and write what is inside them. A facilities manager can rebuild the room but still cannot open the cabinets. Cosmos DB is the cabinet with its own separate locksmith: you request its keys through Cosmos DB's own role assignment process, not the building's front desk. The analogy has a limit: an Owner can grant themselves a data role, so control-plane power still needs careful protection.",
  "terms": [
   [
    "Control plane",
    "Operations that manage a resource itself, such as creating, configuring or deleting it, handled through Azure Resource Manager."
   ],
   [
    "Data plane",
    "Operations on the data inside a service, such as reading secrets or sending messages, as opposed to managing the resource."
   ],
   [
    "Key Vault Secrets User",
    "A built-in role that can read secret contents in an RBAC-enabled Key Vault."
   ],
   [
    "Azure Service Bus Data Sender",
    "A built-in role allowing an identity to send messages to queues and topics in its scope."
   ],
   [
    "AcrPull",
    "A built-in role that lets an identity pull images from an Azure Container Registry."
   ],
   [
    "Cosmos DB Built-in Data Contributor",
    "A Cosmos DB native data role that allows item reads and writes, assigned with Cosmos DB SQL role assignments."
   ]
  ],
  "example": "A developer gave a function app's identity Contributor on a Cosmos DB account, yet every query failed with 403 Forbidden. Contributor is a control-plane role. After running az cosmosdb sql role assignment create with Cosmos DB Built-in Data Contributor scoped to the account, queries succeeded, and the team then disabled key-based authentication on the account.",
  "mistakes": [
   [
    "Owner or Contributor on a resource lets the app read its data.",
    "Those are control-plane roles. For services using RBAC data access, the app needs a data-plane role such as Key Vault Secrets User, Azure Service Bus Data Receiver or a Cosmos DB built-in data role."
   ],
   [
    "Assigning Cosmos DB data roles on the Access control (IAM) page like any other role.",
    "Cosmos DB for NoSQL data roles are native Cosmos DB roles assigned with Cosmos DB SQL role assignments, for example az cosmosdb sql role assignment create."
   ],
   [
    "Giving an app Key Vault Secrets Officer or Service Bus Data Owner to be safe.",
    "Least privilege means the smallest role that works: Secrets User for reading secrets, Sender or Receiver for messaging. Officer and Owner roles add write or management power the app does not need."
   ],
   [
    "Treating a 403 right after a role assignment as proof the role is wrong.",
    "Role assignments can take several minutes to take effect. A 403 that persists points to the wrong role, scope or identity."
   ]
  ],
  "tryit": [
   [
    "At Oakridge Learning, an upload service writes enrollment messages to a Service Bus queue named enroll-in, and a grading worker reads from it. A container app hosts each service, and both images live in one Azure Container Registry. The security lead asks for least privilege. Which roles should each identity receive, and at what scope?",
    "The upload service identity gets Azure Service Bus Data Sender scoped to the enroll-in queue. The worker identity gets Azure Service Bus Data Receiver scoped to the same queue. Both identities (or a shared user-assigned identity) get AcrPull on the registry. None of them needs Owner, Contributor or Data Owner."
   ]
  ],
  "tip": "Contributor or Owner do not grant data access; pick the data role that matches the action (Secrets User to read secrets, Data Sender or Receiver for Service Bus, AcrPull for images) and remember Cosmos DB data roles are assigned with az cosmosdb sql role assignment.",
  "check": [
   [
    "An app must only read secrets from an RBAC-mode Key Vault. Which role?",
    "Key Vault Secrets User, which can read secret contents but not change them."
   ],
   [
    "Why might an identity with Contributor on a Cosmos DB account still get 403 on queries?",
    "Contributor is a control-plane role; data access needs a Cosmos DB data role such as Built-in Data Reader or Contributor."
   ],
   [
    "A build pipeline publishes images to a registry, and a container app runs them. Which ACR role does each need?",
    "The pipeline needs AcrPush to push images; the container app needs only AcrPull."
   ]
  ]
 },
 {
  "t": "Key Vault: secrets, keys and certificates, versions, soft delete and purge protection, RBAC vs access policies",
  "hook": "Friday, 4:40 p.m., at Brightwater Health Partners. A cleanup script you wrote to tidy up test resources has a bug, and it just deleted a secret named api-key from the production vault. Within minutes, the redeploy pipeline fails with a conflict error when it tries to recreate the secret. Your manager, Rosa, leans over your shoulder and asks the two questions that matter: \"Is it gone for good? And could someone do this on purpose?\" Your stomach drops. You need to know exactly what Key Vault does when something is deleted, and what would stop a deletion from becoming permanent.",
  "simple": "Azure Key Vault is a locked safe for an app's sensitive things. It holds three kinds of item. Secrets are small private values like passwords, which the app takes out and reads. Keys are used to lock and unlock data, but the safe does the locking for you so the key itself never leaves. Certificates are digital ID cards for websites, and the safe can renew them before they expire. Every time you change an item, the safe keeps the old copy as an earlier version. If something is deleted, it goes to a recycle bin for a while so you can bring it back. An extra lock called purge protection stops anyone, even an administrator, from emptying that bin early. Finally, you control who can open the safe with either an older list on the safe itself or Azure's standard permission system, which is the recommended choice.",
  "body": [
   "Azure Key Vault is a managed service for storing and controlling access to sensitive material, so that material never has to live in source code, configuration files or container images. Applications fetch what they need at run time, every access can be logged, and permissions are managed centrally. A vault holds three kinds of objects, and knowing which is which answers many exam questions.",
   "Secrets are arbitrary small values that you store and read back: passwords, connection strings, API (application programming interface) keys and tokens. The application retrieves the value itself and uses it. Keys are cryptographic keys, either RSA or elliptic curve, used for operations such as encrypt, decrypt, sign, verify, wrap and unwrap. With keys, Key Vault performs the operation for you, and private key material is not meant to leave the vault. The Premium tier protects keys with HSMs (hardware security modules), and Managed HSM is a separate single-tenant service for stricter compliance requirements. Certificates are X.509 certificates that Key Vault can create, import and track for expiry, and it can renew them automatically with integrated certificate authorities. Behind the scenes, each certificate has an associated key and secret.",
   "Every object is versioned. When you set a new value for a secret named `db-password`, Key Vault creates a new version with its own identifier and keeps the older versions. A request without a version returns the current, latest version; a request that includes a version identifier returns exactly that version. Versioning makes rotation safe and allows rollback if a new value turns out to be wrong. Objects can also carry attributes, including an activation date (not before), an expiration date, an enabled flag, tags and a content type that describes the value.",
   "```python\nsecrets = SecretClient(vault_url=VAULT_URL, credential=DefaultAzureCredential())\nsecrets.set_secret(\"db-password\", new_value, expires_on=expiry)\ncurrent = secrets.get_secret(\"db-password\")\nfor p in secrets.list_properties_of_secret_versions(\"db-password\"):\n    print(p.version, p.created_on, p.enabled)\n```",
   "Soft delete protects against accidental or malicious deletion, and it is now always enabled on vaults. When a vault or an object is deleted, it moves into a deleted state for a retention period that you choose between 7 and 90 days, with 90 as the default. During that window it can be recovered with all its versions intact. The name is also reserved while the object is in the deleted state, so creating a new secret with the same name fails with a conflict until you either recover or purge the old one. This explains many puzzling redeployment errors.",
   "Purging permanently deletes a soft-deleted object before its retention period ends. Purge protection, when enabled, blocks purging entirely until the retention period expires, even for administrators. That protects against an insider or a compromised account that deletes and then immediately purges critical material. Two details are worth memorizing: purge protection cannot be turned off once it is enabled, and it is often required by services that use Key Vault keys for encryption, such as customer-managed keys for storage or databases, because losing that key would make the data unreadable.",
   "Key Vault offers two authorization models for the data plane, and a vault uses one or the other according to its permission model setting. Vault access policies are the older model: a per-vault list of principals with permissions such as Get and List for secrets, keys and certificates. They cannot be scoped below the vault, so a principal allowed to get secrets can get every secret in it. They also have a well-known weakness: anyone with Contributor on the vault can edit the access policies and grant themselves data access. Azure role-based access control (RBAC) is the recommended model. Data-plane roles such as Key Vault Secrets User are assigned through Azure role assignments, can be scoped down to an individual secret, key or certificate, and are governed and audited like the rest of Azure access, including time-limited elevation through Privileged Identity Management.",
   "A few operational habits round out the picture. Send Key Vault diagnostic logs to a Log Analytics workspace so you can audit who read which secret and when. Restrict network access with the vault firewall or private endpoints so only expected networks can reach it. In your application, cache secrets for a reasonable time rather than reading them on every request, because Key Vault throttles requests at high rates and every extra call adds latency."
  ],
  "analogy": "Key Vault is like a bank. Secrets are items in a safe deposit box that you take out and use. Keys are like a notary who stamps documents for you without ever handing over the stamp. Certificates are passports the bank renews for you before they expire. Soft delete is the bank holding a closed box for a fixed period before it is destroyed, and purge protection is a rule that not even the branch manager can shred it early. Where the analogy breaks: a bank lets you reuse a box number right away, but Key Vault reserves the deleted name.",
  "terms": [
   [
    "Secret",
    "A small sensitive value, such as a password or connection string, that an app reads from Key Vault."
   ],
   [
    "Key",
    "A cryptographic key stored in Key Vault that performs operations inside the vault without exposing private material."
   ],
   [
    "Certificate",
    "An X.509 certificate that Key Vault can create, import, renew and track for expiry, backed by an associated key and secret."
   ],
   [
    "Soft delete",
    "Retention of deleted vaults and objects for 7 to 90 days so they can be recovered."
   ],
   [
    "Purge protection",
    "A setting that prevents permanent deletion until the retention period ends; it cannot be disabled once on."
   ],
   [
    "Access policy",
    "The legacy Key Vault authorization model granting per-vault permissions, as opposed to Azure RBAC."
   ]
  ],
  "example": "A script deleted a secret named api-key, and a redeployment that tried to recreate it failed with a conflict. Because soft delete reserves the name, the engineer recovered the deleted secret instead, restoring all versions. The team then enabled purge protection so no one could permanently destroy secrets before the retention period ended, and moved the vault to the RBAC permission model.",
  "mistakes": [
   [
    "Storing an encryption key as a secret so the app can download and use it.",
    "Use a Key Vault key. Key Vault performs encrypt, decrypt, sign and wrap operations inside the vault, so the private key material does not leave it."
   ],
   [
    "Believing purge protection can be switched off after a project ends.",
    "Once enabled, purge protection cannot be disabled. Deleted objects stay recoverable until the retention period expires."
   ],
   [
    "Assuming access policies can limit an app to one specific secret.",
    "Access policies apply to the whole vault. Only the Azure RBAC permission model can scope a role to an individual secret, key or certificate."
   ],
   [
    "Expecting a deleted secret's name to be free for immediate reuse.",
    "Soft delete reserves the name for the retention period. Recover or purge the old secret before creating a new one with the same name."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Insurance wants the claims app to read only the claims-db-password secret, not the other twenty secrets in the shared vault. The vault currently uses access policies, and three developers have Contributor on it. What change addresses both the scope problem and the self-granting risk?",
    "Switch the vault to the Azure RBAC permission model and assign Key Vault Secrets User to the claims app's identity scoped to that single secret. RBAC allows per-secret scope, and Contributor can no longer grant data access by editing access policies."
   ],
   [
    "A storage account will use a customer-managed key held in Key Vault. The security team is worried that a compromised admin account could delete and purge the key, making the data unreadable. Which vault setting addresses this?",
    "Enable purge protection (with soft delete, which is always on). Deleted keys then cannot be purged until the retention period ends, so they can always be recovered within that window."
   ]
  ],
  "tip": "Secrets are values you read, keys do crypto inside the vault, certificates are X.509 with lifecycle management. Purge protection cannot be disabled once enabled; RBAC allows per-secret scope, access policies do not.",
  "check": [
   [
    "Why might creating a secret with the name of a recently deleted secret fail?",
    "Soft delete keeps the deleted secret and reserves its name until it is recovered, purged or the retention period ends."
   ],
   [
    "Give one advantage of the Azure RBAC permission model over access policies.",
    "Roles can be scoped to individual secrets, keys or certificates, and access is governed centrally like other Azure permissions."
   ],
   [
    "What does a request for a secret return when no version is specified?",
    "The current, latest version of the secret."
   ]
  ]
 },
 {
  "t": "Secret rotation and Key Vault events (SecretNearExpiry) through Event Grid",
  "hook": "The quarterly audit at Cobalt Ridge Bank is in its second hour when the auditor, Mr. Okafor, slides a printout across the table. \"This storage account key,\" he says, \"was created three years ago. Your policy says sixty days. Who rotates it?\" Your colleague Ana admits it is on a wiki page somewhere, assigned to someone who left last spring. The key is still used by a legacy reporting app that cannot use managed identities. You promise a fix, and on the walk back to your desk you wonder: could the vault itself tell you when a secret is about to expire, and could that warning trigger the rotation without a human remembering?",
  "simple": "A password that never changes is risky, because the longer it lives, the more chances it has to leak. Rotation means swapping it for a new one on a schedule. People forget to do that, so we let computers do it. Key Vault can store an expiry date on each secret, like the date printed on a carton of milk. About a month before that date, Key Vault sends out a notice saying \"this one expires soon\". A delivery service called Event Grid carries that notice to a small program you write, often an Azure Function. The program makes a new password with the system that owns it, saves it in Key Vault with a fresh expiry date, and the cycle starts again. Apps that always ask for the latest copy pick up the new password automatically.",
  "body": [
   "Long-lived secrets are risky. The longer a password, access key or connection string stays valid, the more opportunities it has to leak through a log file, a screenshot or a former employee's laptop, and the longer an attacker can use it once it does. Rotation replaces a secret with a new value on a schedule and retires the old one. Done by hand, rotation is easily forgotten or postponed. Done by automation, it becomes routine. Key Vault supplies the building blocks for that automation: expiration dates, versions and events.",
   "Begin by setting an expiration date on every secret. The date does not by itself break anything; it records when the secret should be replaced and drives the events that follow. Key Vault publishes events about its objects to Azure Event Grid, the managed event-routing service, through a system topic for the vault. A system topic is an Event Grid topic that Azure creates to represent events from an Azure resource, so you do not build a publisher yourself.",
   "Three secret events matter most. `Microsoft.KeyVault.SecretNewVersionCreated` fires when a new version is added. `Microsoft.KeyVault.SecretNearExpiry` fires when the current version will expire soon; Key Vault raises it 30 days before the expiration date. `Microsoft.KeyVault.SecretExpired` fires when the secret has expired. Keys and certificates have matching events, such as `CertificateNearExpiry` and `KeyNearExpiry`, so the same pattern works across object types.",
   "The standard rotation pattern connects these pieces. Create an Event Grid subscription on the vault's system topic, filtered to the `SecretNearExpiry` event type, with an Azure Function as the handler. When an event arrives, the function reads the secret name from the event subject and data. It then generates or requests a new credential from the service that owns it, for example by regenerating a storage account key or resetting a database user's password. It writes the new value to Key Vault as a new version with a new expiration date, and consumers pick up the new value. Thirty days before that new date, the cycle repeats automatically.",
   "It helps to know what the event looks like when it arrives. Event Grid delivers a small JSON (JavaScript Object Notation) document. Its `eventType` field holds the event name, its `subject` holds the object name, and its `data` section includes fields such as `VaultName`, `ObjectType`, `ObjectName`, `Version` and the not-before and expiry times (`NBF` and `EXP`). Filtering the subscription to `SecretNearExpiry` means the function is not woken for unrelated events, and you can add subject filters if only some secrets should be rotated by this function. Event Grid retries delivery if the handler fails, so write the function to be idempotent: rotating the same secret twice should not break anything.",
   "```python\n@app.event_grid_trigger(arg_name=\"event\")\ndef rotate(event: func.EventGridEvent):\n    if event.event_type != \"Microsoft.KeyVault.SecretNearExpiry\":\n        return\n    name = event.get_json()[\"ObjectName\"]\n    new_value = regenerate_credential(name)          # call the owning service\n    secrets.set_secret(name, new_value,\n                       expires_on=datetime.now(timezone.utc) + timedelta(days=60))\n```",
   "Permissions follow least privilege. The rotation function's managed identity needs Key Vault Secrets Officer, because it writes new versions, plus whatever permission the owning service requires to reset the credential, such as the right to regenerate storage account keys. The applications that consume the secret need only Key Vault Secrets User, which lets them read but not change it.",
   "Rotating without downtime takes some care. For services that offer two keys, such as storage accounts, Cosmos DB account keys and Service Bus shared access keys, use the dual-credential approach. Apps use key 1 while you regenerate key 2; you store key 2 in Key Vault and let apps switch to it; on the next cycle you regenerate key 1. At no point is the key currently in use invalidated. For systems with a single credential, create the new credential before revoking the old one whenever the service allows it, so there is an overlap period.",
   "Rotation only helps if applications actually load the new value. Reference secrets without a version so the latest version is always used. Cache values for a limited time, and reload the secret when authentication fails, since a failure may simply mean the cached value is stale. Platform features can do this for you: Key Vault references in App Service refresh periodically, and Azure App Configuration can refresh settings when a sentinel key changes.",
   "Know what Key Vault automates natively. Keys have a built-in automatic rotation policy, and certificates can renew automatically with integrated certificate authorities. Secrets have no built-in generator, because Key Vault cannot know how to create a new password for an arbitrary service; they rely on this event-driven pattern. Best of all, where a service supports managed identities, remove the secret entirely so there is nothing to rotate."
  ],
  "analogy": "Secret rotation with SecretNearExpiry is like a car registration reminder. The registration has an expiry date, and a month before it the motor vehicle office mails you a notice. The mail carrier is Event Grid, and you are the Azure Function: you renew with the office that issues plates (the owning service), then file the new sticker (a new secret version). Having two cars on the driveway is like dual keys: you can take one in for renewal while still driving the other. The analogy stops at automation: the function acts immediately, while people often ignore reminders.",
  "terms": [
   [
    "Secret rotation",
    "Periodically replacing a secret with a new value and retiring the old one to limit exposure."
   ],
   [
    "SecretNearExpiry",
    "A Key Vault event published through Event Grid 30 days before a secret's expiration date."
   ],
   [
    "SecretNewVersionCreated",
    "A Key Vault event raised when a new version of a secret is created."
   ],
   [
    "System topic",
    "An Event Grid topic that represents events published by an Azure resource, such as a key vault."
   ],
   [
    "Dual-credential rotation",
    "Alternating between two valid keys so one can be regenerated while apps use the other."
   ]
  ],
  "example": "A storage account key used by a legacy app must rotate every 60 days. The team sets a 60-day expiry on the Key Vault secret and subscribes a function to SecretNearExpiry. Thirty days before expiry, the function regenerates the storage key the app is not using, saves it as a new secret version with a new expiry, and the app, which reads the latest version every hour, switches over without downtime.",
  "mistakes": [
   [
    "Key Vault rotates secrets automatically once an expiry date is set.",
    "An expiry date only records when to rotate and drives events. Secrets need your own handler, typically a function triggered by SecretNearExpiry; built-in auto-rotation applies to keys, and auto-renewal to certificates."
   ],
   [
    "Polling Key Vault on a timer or using a Service Bus queue to detect expiring secrets.",
    "Key Vault publishes SecretNearExpiry to Event Grid through the vault's system topic; subscribe a handler to that event instead of polling."
   ],
   [
    "Giving the rotation function Key Vault Secrets User.",
    "Secrets User can only read. The rotator writes new versions, so it needs Key Vault Secrets Officer; consumers keep Secrets User."
   ],
   [
    "Pinning app settings to a specific secret version.",
    "A pinned version never changes, so the app keeps the old value after rotation. Reference the unversioned secret so the latest version is used."
   ]
  ],
  "tryit": [
   [
    "Lakeview Logistics rotates a Cosmos DB account key every 90 days. Last time, the rotation function regenerated the primary key while every app was still using it, and orders failed for twenty minutes. How should the function change?",
    "Use dual-credential rotation. If apps use the primary key, regenerate the secondary key, store it as a new secret version and let apps switch. Regenerate the primary key only on the next cycle, after apps have moved off it, so the key in use is never invalidated."
   ]
  ],
  "tip": "SecretNearExpiry fires 30 days before expiration and reaches handlers through Event Grid; the rotator needs Secrets Officer, readers need Secrets User, and consumers should reference the unversioned secret to get new values.",
  "check": [
   [
    "Which service delivers Key Vault near-expiry notifications to your rotation function?",
    "Azure Event Grid, through a system topic for the vault and an event subscription filtered on SecretNearExpiry."
   ],
   [
    "Why use two keys when rotating storage account keys?",
    "Apps keep using one valid key while the other is regenerated, so rotation never invalidates the key in use."
   ],
   [
    "How many days before a secret's expiration date does Key Vault raise SecretNearExpiry?",
    "30 days."
   ]
  ]
 },
 {
  "t": "Key Vault references in App Service, Functions and Container Apps settings",
  "hook": "Monday at Meridian Pet Supply, and the new checkout site will not connect to its database. Kenji, who deployed it, pastes the error into the team chat: login failed for user, password incorrect. You open the app's environment variables to check, and instead of a password you see a long string of text that begins with @Microsoft.KeyVault. The app is literally trying to log in with that string as its password. Kenji swears the secret exists in the vault and the app has an identity. Something between the app setting and the vault is not connecting, and the release window closes in an hour. Where do you look first?",
  "simple": "Many apps read settings such as a database password from environment variables, which are like labeled notes the hosting platform hands to the app when it starts. Writing the real password on that note is risky. A Key Vault reference lets you write a pointer on the note instead, such as \"get the password from vault shop-kv, secret db-password\". When the app starts, the Azure platform follows the pointer, fetches the real value from Key Vault and hands it to the app. The app's code does not change at all. For this to work, the app needs an identity that Key Vault trusts and permission to read that secret. If something is wrong, the app receives the pointer text itself, which is a clear sign the lookup failed.",
  "body": [
   "Many applications read their configuration from environment variables, and rewriting them to call the Key Vault software development kit (SDK) may not be practical, especially for third-party or legacy code. Key Vault references solve this. They let the hosting platform fetch a secret from Key Vault and present it to your app as an ordinary app setting or secret. The value never appears in the app's configuration, in source control or in deployment templates; only a pointer to the secret does.",
   "In App Service and Azure Functions, you set an app setting's value to a special reference syntax instead of the secret itself. There are two forms. One names the vault and the secret, optionally with a version. The other gives the secret's full URI (uniform resource identifier), the address of the secret in the vault. Both are wrapped in `@Microsoft.KeyVault(...)`.",
   "```text\nDB_PASSWORD = @Microsoft.KeyVault(VaultName=shop-kv;SecretName=db-password)\nDB_PASSWORD = @Microsoft.KeyVault(VaultName=shop-kv;SecretName=db-password;SecretVersion=<version-id>)\nDB_PASSWORD = @Microsoft.KeyVault(SecretUri=<vault-uri>/secrets/db-password/)\n```",
   "Your Python code keeps calling `os.environ[\"DB_PASSWORD\"]` and receives the resolved secret value. Several things must be true for that to happen. The app needs a managed identity with read access to the secret: Key Vault Secrets User when the vault uses the role-based access control (RBAC) permission model, or a Get permission for secrets in an access policy. The vault must also be reachable from the app's network, which matters when the vault firewall is on or only private endpoints are allowed.",
   "Identity selection is a classic trap. By default, the platform resolves references with the app's system-assigned identity. To use a user-assigned identity instead, set the site's `keyVaultReferenceIdentity` property to that identity's resource ID. If you skip this, the platform tries the system-assigned identity, which may not exist or may have no role on the vault, and the reference fails.",
   "When a reference fails, the app receives the raw `@Microsoft.KeyVault(...)` text rather than the secret, which is exactly what happened in the opening scene. The portal shows a status next to each Key Vault reference in the app's configuration, and that status is the first place to look. Common causes are a missing role, the wrong identity, a firewall blocking access or a typo in the vault or secret name.",
   "Versioning controls how references behave during rotation. Without a version, a reference resolves to the latest version of the secret, and the platform refreshes it periodically (within about a day), when the configuration changes, or when the app restarts. A rotated secret is therefore picked up without anyone editing the setting. With a version, the reference is pinned and never changes until you update it. Functions can also use references for connection settings such as `AzureWebJobsStorage`, although identity-based connections, which avoid storing that connection string at all, are usually the better option.",
   "Azure Container Apps uses a slightly different model. Secrets are defined at the app level, and a secret can be a Key Vault reference: you give the Key Vault secret URI and the managed identity to use, either a user-assigned identity's resource ID or `system` for the system-assigned identity. Environment variables then point to that secret with `secretref:`, exactly as they would for any other Container Apps secret. Container Apps fetches the value from Key Vault. When the secret URI has no version, the latest version is used, and running replicas pick up changes after a restart or when a new revision is created.",
   "```bash\naz containerapp secret set -n orders -g rg \\\n  --secrets \"db-pass=keyvaultref:<key-vault-secret-uri>,identityref:<identity-resource-id>\"\naz containerapp update -n orders -g rg --set-env-vars DB_PASSWORD=secretref:db-pass\n```",
   "The big idea for the exam is simple: the code stays the same, the secret lives only in Key Vault, and a managed identity with a data-plane read role bridges the two. If you see the reference text instead of a value, check the identity, its role, the identity selection setting and the network path to the vault. Work through them in that order: confirm the app actually has the identity you expect, confirm that identity holds Key Vault Secrets User (or an access policy with Get) on the right vault, confirm `keyVaultReferenceIdentity` points to it when it is user-assigned, and finally confirm the vault's firewall or private endpoint allows traffic from the app. Remember that a new role assignment can take a few minutes to take effect, so recheck the reference status after a short wait before changing anything else."
  ],
  "analogy": "A Key Vault reference is like a coat check ticket. Instead of carrying your valuable coat around the party (storing the password in settings), you carry a ticket that says where it is. When you need the coat, the attendant (the platform) checks your ID (the managed identity) and fetches it. If the attendant does not recognize your ID, you are left holding only the ticket, which is the raw @Microsoft.KeyVault text. Where it differs: the platform fetches the coat ahead of time and refreshes it periodically rather than on every use.",
  "terms": [
   [
    "Key Vault reference",
    "An app setting or secret value that points to a Key Vault secret, which the platform resolves at runtime."
   ],
   [
    "@Microsoft.KeyVault(...)",
    "The reference syntax used in App Service and Functions app settings, with VaultName/SecretName or SecretUri."
   ],
   [
    "keyVaultReferenceIdentity",
    "The App Service site property that selects a user-assigned identity for resolving Key Vault references."
   ],
   [
    "keyvaultref",
    "The Container Apps secret syntax that sources a secret's value from a Key Vault secret URI with an identity."
   ],
   [
    "secretref",
    "The Container Apps syntax that sets an environment variable from an app-level secret."
   ]
  ],
  "example": "An App Service app showed the literal text @Microsoft.KeyVault(VaultName=shop-kv;SecretName=db-password) as its database password and failed to connect. The reference status in the portal said access was denied. The app used a user-assigned identity, but keyVaultReferenceIdentity was not set, so the platform tried the system-assigned one. Setting the property and granting Key Vault Secrets User fixed it.",
  "mistakes": [
   [
    "Changing application code to call the Key Vault SDK so App Service can use a vault secret.",
    "Key Vault references need no code changes. The platform resolves the reference and the app reads an ordinary environment variable."
   ],
   [
    "Assuming App Service automatically uses the app's user-assigned identity for references.",
    "References use the system-assigned identity by default. Set keyVaultReferenceIdentity to the user-assigned identity's resource ID."
   ],
   [
    "Including SecretVersion so the app always gets the newest value.",
    "A version pins the reference to that exact value. Omit the version to follow rotations."
   ],
   [
    "Using the @Microsoft.KeyVault syntax in Container Apps environment variables.",
    "Container Apps defines an app secret with keyvaultref and identityref, then sets the variable with secretref:<secret-name>."
   ]
  ],
  "tryit": [
   [
    "Riverbend Tutoring runs a container app named lessons that needs DB_PASSWORD from the secret db-password in vault tutor-kv. The app has a user-assigned identity called lessons-id with Key Vault Secrets User on the vault. The team rotates the password monthly. How should they configure the app?",
    "Create an app-level secret using keyvaultref with the unversioned secret URI and identityref set to the lessons-id resource ID, then set DB_PASSWORD=secretref:<that secret name>. Leaving out the version means the latest value is used; after rotation, a restart or new revision picks it up."
   ],
   [
    "An App Service app's Key Vault reference status shows an error, but the identity has Key Vault Secrets User and keyVaultReferenceIdentity is correct. The vault was recently restricted to private endpoints only. What is the likely cause?",
    "The app cannot reach the vault over the network. It needs a network path, such as virtual network integration with access to the vault's private endpoint, or the vault firewall must allow it."
   ]
  ],
  "tip": "If an app receives the raw @Microsoft.KeyVault text, the reference did not resolve: check the identity, its Secrets User role, keyVaultReferenceIdentity for user-assigned identities and vault networking. Omit the version to follow rotations.",
  "check": [
   [
    "What does an App Service app need for a Key Vault reference to resolve?",
    "A managed identity with read access to the secret (such as Key Vault Secrets User) and network access to the vault."
   ],
   [
    "How does a Container Apps environment variable use a Key Vault-backed secret?",
    "Define an app secret with keyvaultref and an identityref, then set the variable to secretref:<secret-name>."
   ],
   [
    "What changes when you add SecretVersion to a reference?",
    "The reference is pinned to that version and does not pick up new versions until you edit it."
   ]
  ]
 },
 {
  "t": "Azure App Configuration: key-values, labels, feature flags, Key Vault references, sentinel-key refresh and snapshots",
  "hook": "Black Friday morning at Larkspur Home Goods. Traffic is triple the usual, and the order service is drowning. Nadia, the lead engineer, wants to lower the batch size and raise the retry delay across fifteen container apps, right now. But those settings live in fifteen separate configurations, and changing them means fifteen redeployments while customers wait. Worse, last month someone changed half the settings, an app reloaded midway and ran for an hour with a mismatched set. You have one question for the team: what if every app read its settings from one place, picked up changes in a minute, and only ever loaded a complete, consistent set?",
  "simple": "Imagine a family whiteboard on the fridge that everyone checks for the day's plans, instead of each person keeping their own notes. Azure App Configuration is that whiteboard for apps. Settings such as \"maximum batch size = 50\" are stored once, and every app reads them. Labels let one setting have different values for different places, like testing and production. Feature flags are on and off switches for new features, so you can turn something on for a few users or turn it off instantly. Passwords do not go on the whiteboard; a note just says where in Key Vault to find them. When you change several settings, you flip one special switch last, and apps reload everything together. A snapshot is a photo of the whiteboard that never changes, handy for going back.",
  "body": [
   "Azure App Configuration is a managed service for centralizing application settings and feature flags. Without it, every app and every environment carries its own copies of settings in files or app settings, and those copies drift apart. With it, apps load settings at startup from one store and can refresh them at run time without redeploying. App Configuration complements Key Vault rather than replacing it: App Configuration holds ordinary settings, while secrets stay in Key Vault.",
   "Why not just use App Service app settings or Container Apps environment variables? Those work well for a single app, but each app keeps its own copy, changes usually require a restart or new revision, and there is no shared history of who changed what. App Configuration gives many apps one source of truth, a revision history for every key, filtering by key and label, and run-time refresh. Apps typically keep only one setting locally: the App Configuration endpoint. They authenticate to the store with Microsoft Entra ID through a managed identity, often using `DefaultAzureCredential`, so no connection string is needed.",
   "The basic item is a key-value. Keys are strings, often hierarchical with a separator such as `:` or `/`, for example `Orders:MaxBatchSize`. Labels add a second dimension: the same key can hold several values distinguished by label, such as `Dev`, `Test` and `Prod`, or release version numbers. An app selects the keys it needs with a key filter, such as `Orders:*`, and chooses a label filter for its environment. To fall back to defaults, an app loads the unlabeled keys first and then the environment's label, so labeled values override the unlabeled ones. Values can also carry a content type, such as JSON (JavaScript Object Notation), so a value can be parsed as structured data.",
   "Feature flags are special key-values, stored under the `.appconfig.featureflag/` key prefix, that turn features on or off at run time. A flag can be simply enabled or disabled, or it can use filters: a percentage filter for gradual rollout, a time window filter, or a targeting filter that enables the feature for specific users and groups. Feature management libraries evaluate the flags in your code. That lets you ship code dark, enable it for a small slice of users, widen the rollout as confidence grows and turn it off instantly if something goes wrong, all without a deployment.",
   "App Configuration can also hold Key Vault references. These are key-values whose content type marks them as pointers to a Key Vault secret URI (uniform resource identifier). App Configuration never reads the secret itself. Instead, the client provider in your app resolves the pointer by calling Key Vault with the app's own credential. The app's identity therefore needs two roles: App Configuration Data Reader on the store and Key Vault Secrets User on the secret. The result is one place to discover every setting while the secrets remain protected in Key Vault.",
   "```python\nfrom azure.appconfiguration.provider import load, SettingSelector, WatchKey\ncred = DefaultAzureCredential()\nconfig = load(endpoint=APPCONFIG_ENDPOINT, credential=cred,\n    selects=[SettingSelector(key_filter=\"Orders:*\", label_filter=\"Prod\")],\n    keyvault_credential=cred,\n    refresh_on=[WatchKey(\"Orders:Sentinel\")], refresh_interval=60,\n    feature_flag_enabled=True)\nbatch = config[\"Orders:MaxBatchSize\"]\nconfig.refresh()   # call periodically, e.g. per request; reloads only if the sentinel changed\n```",
   "Dynamic refresh needs a strategy. Watching many keys individually is inefficient, and it can load a half-updated set if an app checks in the middle of a multi-key change. The sentinel key pattern solves both problems. You watch a single key, such as `Orders:Sentinel`. When you finish updating a group of settings, you change the sentinel's value last. The provider checks the sentinel after the refresh interval has passed, and only when the sentinel has changed does it reload all the selected settings together. Your code calls `refresh()` regularly, for example once per request; the call is cheap until the interval passes. Refresh can also be driven by Event Grid events from App Configuration, for push-based updates instead of polling.",
   "Snapshots provide stability. A snapshot is an immutable, named, point-in-time copy of a set of key-values chosen by key and label filters. Once created, it never changes, so an app that loads a snapshot gets exactly the same configuration every time. This is valuable for safe deployments and rollbacks: deploy release 12 with snapshot `release-12`, and if something goes wrong, roll back to the code and the previous snapshot together.",
   "A few more features are worth recognizing. Point-in-time restore lets you return key-values to an earlier revision. Import and export move settings between stores and files. Geo-replicas add resiliency across regions. The service has several pricing tiers, including Free and Standard, with different quotas and features. For security, prefer Microsoft Entra authentication with the App Configuration Data Reader role over access keys, and consider disabling access keys entirely once all clients use identities."
  ],
  "analogy": "App Configuration is like a restaurant's central menu board. Labels are the lunch and dinner versions of the same dish with different prices. Feature flags are the specials you can add for some tables or wipe off instantly. Key Vault references are notes saying \"ask the manager for the safe code\" rather than writing it on the board. The sentinel key is the manager ringing a bell once the whole board is updated, so waiters reread it together. A snapshot is a printed menu from opening night that never changes. The analogy breaks on timing: apps reload on an interval, not instantly.",
  "terms": [
   [
    "Key-value",
    "The basic App Configuration item: a key, often hierarchical, with a value, optional label and content type."
   ],
   [
    "Label",
    "A value that distinguishes versions of the same key, commonly used for environments such as Dev and Prod."
   ],
   [
    "Feature flag",
    "A key-value that turns a feature on or off at runtime, optionally with filters like percentage or targeting."
   ],
   [
    "Sentinel key",
    "A single watched key whose change signals the app to reload all its configuration at once."
   ],
   [
    "Snapshot",
    "An immutable, named copy of selected key-values that always returns the same configuration."
   ]
  ],
  "example": "A team runs one set of container apps in three environments. They store all settings in App Configuration with Dev, Test and Prod labels, keep passwords as Key Vault references, and ship a new checkout flow behind a feature flag with a 10 percent rollout. When they change a batch of throttling settings, they update the sentinel key last, and every app reloads the new values within a minute without a restart.",
  "mistakes": [
   [
    "Storing database passwords directly as App Configuration values.",
    "Secrets belong in Key Vault. Store a Key Vault reference in App Configuration, and the provider resolves it with the app's identity."
   ],
   [
    "Expecting App Configuration Data Reader alone to resolve Key Vault references.",
    "App Configuration never reads the secret. The app's identity also needs Key Vault Secrets User on the secret."
   ],
   [
    "Updating the sentinel key first, then the other settings.",
    "Apps reload when the sentinel changes, so changing it first can load a partial set. Update the sentinel last."
   ],
   [
    "Using labels to turn a feature on for 10 percent of users.",
    "Labels separate values by environment or version. Gradual rollout and per-user targeting are feature flag filters."
   ]
  ],
  "tryit": [
   [
    "Foxglove Media wants each release to run with exactly the configuration it was tested with, even if someone edits Prod values later, and to roll back cleanly. Which App Configuration feature fits?",
    "Snapshots. Create an immutable snapshot such as release-12 from the tested key-values and have the release load it. Later edits to the live keys do not change the snapshot, and rollback means loading the previous snapshot with the previous code."
   ],
   [
    "A developer complains that App Configuration changes take effect only when the app restarts. The app calls load at startup with refresh_on configured for a sentinel key, but never calls refresh. What is wrong?",
    "The provider only checks for changes when the app calls refresh. The app should call config.refresh() regularly, for example per request; it reloads only after the refresh interval and only if the sentinel changed."
   ]
  ],
  "tip": "Environment-specific values mean labels; runtime on/off means feature flags; reload everything consistently means sentinel key; never-changing config for a release means snapshots. Secrets stay in Key Vault, referenced from App Configuration.",
  "check": [
   [
    "Why update the sentinel key last when changing several settings?",
    "The app reloads all settings only when the sentinel changes, so it picks up the complete, consistent set rather than a partial update."
   ],
   [
    "What permissions does an app need to resolve a Key Vault reference stored in App Configuration?",
    "Read access to App Configuration (App Configuration Data Reader) and to the secret in Key Vault (Key Vault Secrets User)."
   ],
   [
    "How does an app use unlabeled values as defaults and override them per environment?",
    "Load the unlabeled keys first, then the environment's label, so labeled values override the defaults."
   ]
  ]
 },
 {
  "t": "Application Insights with the Azure Monitor OpenTelemetry Distro for Python: connection strings, traces, spans, custom metrics",
  "hook": "The support lead at Quillfeather Books forwards you a complaint: the new \"ask a librarian\" assistant, a retrieval-augmented chatbot, sometimes takes twelve seconds to answer. You open Application Insights and find only a list of slow requests, each a single bar with no detail inside. Was it the search index? The model call? The database? Meanwhile the finance team wants to know how many model tokens the assistant burns per day, and nobody is counting. You have an afternoon. How do you make the app tell you, step by step, where its time goes and how much it uses, without rebuilding it?",
  "simple": "When an app is slow or broken, you need clues. Telemetry is the app's diary: a record of each request, each call it made to other services, each error and some useful numbers. Application Insights is the Azure service that collects and searches that diary. OpenTelemetry is a common, open language for writing it, so the same code works with many tools. For Python, Microsoft offers a ready-made package that sets everything up with one line. A connection string tells the app which Application Insights resource to send its diary to. A trace is the whole story of one request, and spans are its chapters, each with a start and end time. Custom metrics are counts you choose, like the number of tokens used.",
  "body": [
   "Application Insights is the application performance monitoring (APM) feature of Azure Monitor. It collects requests, dependencies (outbound calls your app makes), exceptions, logs and metrics from your application and stores them in a Log Analytics workspace, where you can search them, chart them and alert on them. For Python, Microsoft's recommended way to send this telemetry is the Azure Monitor OpenTelemetry Distro, published as the `azure-monitor-opentelemetry` package.",
   "OpenTelemetry is the open, vendor-neutral standard for telemetry. It defines an API (application programming interface) that your code and libraries use to produce traces, metrics and logs, plus SDKs (software development kits) and exporters that process the data and send it somewhere. Because it is a standard, instrumentation you add once is not tied to a single vendor. The Azure distro bundles the OpenTelemetry SDK, the Azure Monitor exporter and automatic instrumentation for popular libraries such as Flask, Django, FastAPI, requests, urllib and psycopg2, and it configures all of that with one function call.",
   "```python\nfrom azure.monitor.opentelemetry import configure_azure_monitor\nconfigure_azure_monitor()   # reads APPLICATIONINSIGHTS_CONNECTION_STRING\n\nfrom opentelemetry import trace, metrics\ntracer = trace.get_tracer(__name__)\nmeter = metrics.get_meter(__name__)\ntokens = meter.create_counter(\"llm_tokens\", unit=\"tokens\")\n\ndef answer(question):\n    with tracer.start_as_current_span(\"rag.answer\") as span:\n        span.set_attribute(\"rag.top_k\", 5)\n        result = call_model(question)\n        tokens.add(result.usage, {\"model\": \"chat-small\"})\n        return result\n```",
   "Your app finds its Application Insights resource through a connection string. The connection string contains the instrumentation key, which identifies the resource, and the ingestion endpoint for your region, which is where telemetry is sent. Set it in the `APPLICATIONINSIGHTS_CONNECTION_STRING` environment variable, which is the usual approach in App Service, Azure Functions and Container Apps, or pass `connection_string=` to `configure_azure_monitor`. Connection strings replace the older configuration that used the instrumentation key alone, which could not express the regional endpoint.",
   "Treat the connection string with sensible care, but understand what it is. It identifies where to send data; it is not a strong secret for reading data, because reading telemetry requires separate Azure permissions. For stricter control over who can send telemetry, you can require Microsoft Entra authentication for ingestion, so only identities you authorize can write to the resource. One placement rule matters in practice: call `configure_azure_monitor()` early, before importing or creating your web framework app, so the automatic instrumentations can hook into the libraries as they load. Calling it late is a common reason for missing request telemetry.",
   "Next come the core OpenTelemetry concepts. A trace is the whole journey of one operation, such as one user request, and it is made of spans. Each span is a timed unit of work with a name, a start and end time, attributes (key-value details such as `rag.top_k`), a status and a parent span. In the example, the `rag.answer` span wraps the model call, so the timeline shows how long the whole answer took and which child call dominated.",
   "Application Insights maps spans to its tables by span kind, and this mapping is heavily tested. Incoming server spans, such as an HTTP (Hypertext Transfer Protocol) request handled by Flask, become entries in the `requests` table. Outgoing client spans, such as HTTP calls, database queries and model calls, become `dependencies`. Internal spans you create yourself also appear as dependencies. Exceptions recorded on spans land in the `exceptions` table. Python `logging` output collected by the distro lands in the `traces` table. That last point confuses many people: in Application Insights, the table named traces holds log messages, not OpenTelemetry traces.",
   "Custom metrics use the OpenTelemetry metrics API. Counters record values that only increase, such as tokens used or documents indexed. Histograms record distributions, such as latency or the number of chunks retrieved, so you can see percentiles. Gauges record a current value, such as queue depth. Attributes attached to each measurement, like the model name, become dimensions you can split and filter by. Custom metrics show up in the `customMetrics` table and in metrics explorer, where you can chart them and build alerts on them.",
   "Choosing between metrics and spans comes down to volume and purpose. Prefer metrics for high-volume numbers that you aggregate, such as total tokens per hour, because they are pre-aggregated and cheap to store. Use span attributes or log messages for per-operation details that you want to inspect in a single request, such as which index was searched or how many results came back for one question."
  ],
  "analogy": "Think of a package delivery tracking page. The whole delivery is the trace. Each scan, from pickup to sorting center to truck to doorstep, is a span with a time stamp and a location, and you can see which leg took longest. Notes the driver writes along the way are your logs, which Application Insights confusingly files in the traces table. Custom metrics are the company's daily totals, like packages delivered per hour. The connection string is the address label telling the scanner which tracking system to report to. The analogy is loose on volume: metrics are aggregated, not stored as individual scans.",
  "mnemonic": "Map where telemetry lands with \"Servers Request, Clients Depend, Logs Trace, Meters Customize\": server spans go to requests, client spans to dependencies, logging output to traces, and meter measurements to customMetrics.",
  "terms": [
   [
    "Azure Monitor OpenTelemetry Distro",
    "The azure-monitor-opentelemetry package that configures OpenTelemetry to send Python telemetry to Application Insights."
   ],
   [
    "Connection string",
    "The setting that tells telemetry where to go, including the instrumentation key and ingestion endpoint."
   ],
   [
    "Trace",
    "The full record of one operation, such as one request, made up of related spans."
   ],
   [
    "Span",
    "A timed unit of work within a trace, with attributes, status and a parent span."
   ],
   [
    "Custom metric",
    "An application-defined measurement such as a counter or histogram, stored in the customMetrics table."
   ]
  ],
  "example": "A RAG API showed only slow requests in Application Insights with no detail. The developer called configure_azure_monitor at startup, wrapped retrieval and model calls in spans with attributes for top_k and model name, and added a token counter. The end-to-end view now shows that most latency is the model call, and a chart of tokens by model drives a cost alert.",
  "mistakes": [
   [
    "Looking for Python log messages in the dependencies or customEvents table.",
    "Logging output sent by the distro lands in the traces table. Server spans go to requests and client spans to dependencies."
   ],
   [
    "Configuring telemetry with only the instrumentation key.",
    "Use the connection string, which includes the instrumentation key and the regional ingestion endpoint, usually through APPLICATIONINSIGHTS_CONNECTION_STRING."
   ],
   [
    "Calling configure_azure_monitor after creating the Flask or FastAPI app.",
    "Call it early, before importing or creating the framework app, so automatic instrumentation can hook in; otherwise request telemetry may be missing."
   ],
   [
    "Recording every token count as a log message to chart usage later.",
    "High-volume numbers you aggregate belong in a custom metric, such as a counter with model as an attribute, which lands in customMetrics."
   ]
  ],
  "tryit": [
   [
    "Harborview Clinics wants to chart the 95th percentile number of documents retrieved per question, split by search index. A developer suggests writing a log line for each question with the count. What should they use instead, and where will the data appear?",
    "A histogram from the OpenTelemetry metrics API, recording the count with the index name as an attribute. Histograms capture distributions so percentiles can be charted, the attribute becomes a dimension, and the data appears in customMetrics and metrics explorer."
   ]
  ],
  "tip": "Set APPLICATIONINSIGHTS_CONNECTION_STRING and call configure_azure_monitor early. Remember the mapping: server spans go to requests, client spans to dependencies, logging output to traces and meter measurements to customMetrics.",
  "check": [
   [
    "Which Application Insights table holds Python logging messages sent by the distro?",
    "The traces table, despite the name; spans go to requests and dependencies."
   ],
   [
    "What does a connection string provide that an instrumentation key alone does not?",
    "The ingestion endpoint and other settings along with the key, so telemetry reaches the correct regional endpoint."
   ],
   [
    "Where does a span you create with start_as_current_span around a model call appear?",
    "In the dependencies table, because internal and client spans are recorded as dependencies."
   ]
  ]
 },
 {
  "t": "Distributed tracing across services, sampling and live metrics",
  "hook": "At 9:15 on a Tuesday, the help desk at Silverline Travel lights up: customers say booking confirmation is taking forever, but only sometimes. The booking flow touches five services: a web front end, a booking API, Cosmos DB, a Service Bus queue and a worker that calls a pricing model. Each team checks its own dashboard and declares its service healthy. Theo from the front-end team says it must be the API. The API team blames the worker. You are deploying a fix in an hour and need to watch it live. How do you follow one slow booking through every service and see exactly where the time went?",
  "simple": "Modern apps are like relay races: one service hands the request to the next, which hands it to the next. When the race is slow, you need to know which runner was slow. Distributed tracing gives every request a shared ID number, like a race bib, and each service writes that number on its notes and passes it along. Later you can line up all the notes with the same number and see the whole race on one timeline. Because busy apps produce enormous numbers of notes, sampling keeps only some complete races, chosen fairly, to save money. Live Metrics is a scoreboard that shows what is happening right now, second by second, which is handy while you release a change.",
  "body": [
   "Modern applications are chains of services. A front end calls an API, which reads Cosmos DB, sends a Service Bus message and calls a model endpoint, and a worker picks up the message seconds later. When a user reports a slow or failed request, you need to follow that one request across every hop, not look at five unrelated dashboards. Distributed tracing makes that possible by giving all the work for one operation a shared trace ID and linking each piece of work to its parent.",
   "The mechanism that makes it work is context propagation. OpenTelemetry uses the W3C (World Wide Web Consortium) Trace Context standard. When your instrumented app makes an outgoing HTTP (Hypertext Transfer Protocol) call, it adds a `traceparent` header containing the trace ID and the current span ID. The receiving service, also instrumented, reads the header and creates its own spans as children in the same trace. Messaging SDKs (software development kits), including those for Service Bus and Event Hubs, carry the same context in message properties, so a consumer's processing links back to the producer even when it happens much later.",
   "Propagation is only as strong as its weakest link. If one service in the chain is not instrumented, or a proxy strips the headers, the trace breaks into separate pieces: you see the front end's request and, separately, the worker's processing, with nothing connecting them. When traces look fragmented, check that every service uses OpenTelemetry instrumentation and that gateways forward the `traceparent` header.",
   "In Application Insights, the trace ID appears as `operation_Id` on every telemetry item, whether it is a request, dependency, exception or trace (log message). The `operation_ParentId` field links an item to its parent span. The portal's end-to-end transaction details view uses these fields to draw the whole tree as a timeline, so you can see which hop took the time or threw the error. The application map aggregates many traces into a diagram of components and the calls between them, showing failure rates and average durations on each connection.",
   "For the map to be useful, each service must identify itself. Give each service a distinct cloud role name, for example through the `OTEL_SERVICE_NAME` environment variable or OpenTelemetry resource attributes. Without distinct names, several services can collapse into one node, and the map stops telling you which component is unhealthy. The role name is stored in the `cloud_RoleName` field, which you can also use in queries.",
   "High-traffic apps can produce more telemetry than you want to pay for or analyze. Sampling keeps a representative subset. With the Azure Monitor OpenTelemetry Distro, you configure a sampling ratio, for example `configure_azure_monitor(sampling_ratio=0.1)` to keep about 10 percent, and newer versions also offer a rate-limited sampler that caps the number of traces per second. The key property is that sampling decisions are made per trace, not per item. A kept trace keeps all of its related spans across services, so you never see a request with half its dependencies missing.",
   "Sampling changes how you count. Application Insights records the sampling rate in the `itemCount` column: a stored item with an itemCount of 10 stands for about ten original items. Portal charts use itemCount automatically to estimate true totals. In your own KQL (Kusto Query Language) queries, use `sum(itemCount)` rather than `count()` when you need accurate counts on sampled data; `count()` counts only the stored rows and will undercount.",
   "Live Metrics shows a near-real-time stream of request rate, failure rate, dependency calls, exceptions, CPU (processor) usage and memory from each running instance, with a latency of about a second. It is not based on stored data and is not affected by sampling, so it is ideal while deploying a new revision or during an incident, when waiting minutes for ingestion is too slow. With the distro you enable it through a configuration option, and it can be secured with Microsoft Entra authentication.",
   "Put together, the practice looks like this: instrument every service, propagate context through HTTP and messaging, give each service a role name, sample thoughtfully, watch Live Metrics during rollouts, and use the end-to-end transaction view and the application map for investigations. A typical investigation flows from broad to narrow: start on the application map to see which connection is red or slow, open a sample of slow or failed operations for that component, pick one operation_Id and read its end-to-end timeline, then query the logs for that same operation_Id to see what the code reported along the way."
  ],
  "analogy": "Distributed tracing is like a hospital patient wristband. Every department, from the front desk to radiology to the lab, scans the same wristband number, so afterward you can line up every visit in order and see where the patient waited longest. If one department forgets to scan, the record has a gap. Sampling is like auditing only one patient in ten, but always the patient's whole visit, never just one department's part. Live Metrics is the waiting room display showing current queue lengths. The analogy has a limit: a trace also records parent and child relationships, not just order.",
  "terms": [
   [
    "Trace context",
    "The W3C standard for propagating trace and span IDs between services, carried in the traceparent header."
   ],
   [
    "operation_Id",
    "The Application Insights field holding the trace ID shared by all telemetry for one operation."
   ],
   [
    "Sampling",
    "Keeping only a portion of telemetry, decided per trace, to reduce cost while staying representative."
   ],
   [
    "itemCount",
    "The Application Insights column recording how many original items a sampled item represents."
   ],
   [
    "Live Metrics",
    "A near-real-time view of request, failure and resource metrics that is not affected by sampling."
   ],
   [
    "Application map",
    "An Application Insights view showing components and their dependencies with performance and failure data."
   ]
  ],
  "example": "Users report that checkout sometimes takes eight seconds. In the end-to-end transaction view for a slow operation_Id, the front end's request contains an API call whose child dependency on the model endpoint takes seven seconds, while Cosmos DB calls take milliseconds. The team adds a timeout and a cached fallback, watches Live Metrics while the new revision rolls out and sees latency drop immediately.",
  "mistakes": [
   [
    "Sampling drops individual spans at random, so traces show gaps.",
    "Sampling decides per trace. A kept trace keeps all related spans across services; a dropped trace is dropped entirely."
   ],
   [
    "Using count() in KQL to get total requests on sampled data.",
    "count() counts only stored rows. Use sum(itemCount) to estimate the true total."
   ],
   [
    "Waiting for log queries to confirm a rollout is healthy.",
    "Stored telemetry takes time to ingest. Live Metrics streams near-real-time data and is not affected by sampling, so use it during deployments."
   ],
   [
    "Leaving every service with the default role name.",
    "Without distinct cloud role names, services merge on the application map. Set OTEL_SERVICE_NAME or resource attributes per service."
   ]
  ],
  "tryit": [
   [
    "At Copperleaf Grocers, the end-to-end view shows the web front end's request and the order worker's processing as two unrelated operations with different operation_Id values, even though the worker processes a Service Bus message the API sent. All services export to the same Application Insights resource. What should the team check?",
    "Context propagation through the message. The producer and the worker must both be instrumented so the trace context travels in the Service Bus message properties and the worker's spans join the same trace. Also check that no custom code rebuilds the message without those properties."
   ],
   [
    "A dashboard query shows 1,000 failed requests yesterday, but the portal's failures chart shows about 10,000. The app uses a sampling ratio of 0.1. Which number is closer to reality, and how should the query change?",
    "The portal's figure, because it uses itemCount to estimate totals. Change the query from count() to sum(itemCount)."
   ]
  ],
  "tip": "The shared trace ID shows up as operation_Id; sampling is per trace and recorded in itemCount, so count with sum(itemCount); Live Metrics is real time and unaffected by sampling.",
  "check": [
   [
    "How does a downstream service know it belongs to the same trace as its caller?",
    "The caller propagates the traceparent header (or message properties) carrying the trace ID and parent span ID."
   ],
   [
    "Why use sum(itemCount) instead of count() in KQL on sampled telemetry?",
    "Each stored item represents itemCount original items, so summing it estimates the true total."
   ],
   [
    "Which view would you watch during a deployment to see failures within seconds?",
    "Live Metrics, which streams near-real-time data and is not affected by sampling."
   ]
  ]
 },
 {
  "t": "KQL: where, project, summarize, bin(), join and render against requests, dependencies, exceptions and traces",
  "hook": "Thirty minutes after the 3 p.m. release at Wildrose Ticketing, the error rate climbs. Your manager, Imani, pings you: \"Is it the release? Which endpoint? What error? I need something to show the incident call in ten minutes.\" Application Insights is full of data: thousands of requests, dependencies, exceptions and log lines. Scrolling through them one by one is hopeless. What you need is a few lines of query that filter to the last hour, connect each failed request to the exception it threw, count them by endpoint and draw a chart showing exactly when the trouble began. Can you write it before the call starts?",
  "simple": "KQL (Kusto Query Language) is how you ask questions of the telemetry stored by Application Insights. A query starts with a table, like a big spreadsheet of every request, and then passes it through a series of steps separated by a pipe symbol, like water flowing through filters. One step keeps only the rows you care about, such as the last hour. Another picks which columns to show. Another groups rows and counts them, for example failures per endpoint. A special helper chops time into equal slices, like five-minute buckets, so you can draw a line chart. You can also connect two tables using a shared ID, so each failed request is matched with its error. A final step turns the results into a chart.",
  "body": [
   "Kusto Query Language (KQL) is how you query Application Insights and Log Analytics data. A query starts with a table name and pipes rows through a sequence of operators, each separated by `|`, much like a Unix shell pipeline. Each operator takes the rows from the previous step, transforms them and passes the result on, so you read a query from top to bottom as a series of steps.",
   "Four Application Insights tables matter most. The `requests` table holds incoming calls to your app, with columns such as name, url, resultCode, success and duration. The `dependencies` table holds outgoing calls your app made, with target, type, success and duration. The `exceptions` table holds errors, with type, outerMessage and problemId. The `traces` table holds log messages, with message and severityLevel. All of them share `timestamp`, `operation_Id` and `cloud_RoleName`. In a workspace-based resource queried directly from Log Analytics, the same data appears in tables named AppRequests, AppDependencies, AppExceptions and AppTraces, with slightly different column names, such as TimeGenerated instead of timestamp.",
   "The `where` operator filters rows. Filter on time first, so the query scans less data and runs faster: `where timestamp > ago(1h)`. Combine conditions with `and` and `or`, and compare strings with `==`, `!=`, `contains`, `has` or `startswith`. The `has` operator matches whole terms and is usually faster than `contains`, which matches any substring. The `project` operator chooses and renames columns, much like SELECT in SQL (Structured Query Language), and `extend` adds calculated columns while keeping the existing ones.",
   "The `summarize` operator aggregates rows into groups, like GROUP BY in SQL. For example, `summarize count(), avg(duration), percentile(duration, 95) by name` returns one row per request name with its count, average duration and 95th percentile duration. The `bin()` function rounds values down into fixed-size buckets, and it is how you build time series: `summarize count() by bin(timestamp, 5m)` produces one row per five-minute interval. Other useful operators include `top`, `order by` (or its synonym `sort by`), `take` for a quick sample of rows, and `distinct` for unique values.",
   "```kusto\nrequests\n| where timestamp > ago(24h)\n| summarize total = sum(itemCount), failed = sumif(itemCount, success == false)\n    by bin(timestamp, 15m)\n| extend failureRate = 100.0 * failed / total\n| render timechart\n```",
   "Look at what that query does step by step. It starts with requests, keeps the last 24 hours, counts total and failed requests in 15-minute buckets using `sum(itemCount)` so sampled data is counted correctly, calculates a failure percentage with `extend`, and draws it as a line chart. Multiplying by `100.0` rather than `100` forces decimal arithmetic, so the percentage is not rounded down to a whole number.",
   "The `join` operator combines two tables on a common column, and `operation_Id` is the natural key for connecting a request with its exceptions or dependencies, because all telemetry for one operation shares it. Be careful with join kinds. The default join kind in KQL is `innerunique`, which deduplicates the left side before matching; specify `kind=inner` or `kind=leftouter` when you mean those behaviors. For performance, keep the left side small by filtering first, and project only the columns you need on each side.",
   "```kusto\nrequests\n| where timestamp > ago(1h) and success == false\n| project operation_Id, name, resultCode, duration\n| join kind=inner (\n    exceptions | where timestamp > ago(1h) | project operation_Id, type, outerMessage\n  ) on operation_Id\n| summarize count() by name, type\n| order by count_ desc\n```",
   "The `render` operator turns results into a chart in the portal: `timechart` for time series, plus `barchart`, `columnchart`, `piechart` and others. You can pin charts to dashboards or workbooks, and the same queries power log search alerts, covered in the next lesson. Notice the `count_` column in the previous query: when you use `count()` without naming the result, KQL calls the column `count_`.",
   "A practical habit for investigations: when you find one failing request, copy its operation_Id and query each table with `where operation_Id == \"...\"`. You will see everything that happened in that single transaction, including the dependencies it called, the exception it threw and the log messages written along the way, which often explain the failure in plain words. As you build any query, grow it one pipe at a time and run it after each step. Seeing the intermediate rows makes mistakes obvious, such as a filter that removes everything or a join that multiplies rows, and it is far easier than debugging a twenty-line query all at once."
  ],
  "analogy": "A KQL query is like an assembly line in a sorting warehouse. The table is the pile of parcels arriving at the start. `where` is the worker who throws out parcels you do not want, `project` is the one who removes all labels except the useful ones, `summarize` stacks parcels into labeled bins and counts them, `bin()` is a clock that groups parcels by the five-minute slot they arrived in, and `join` pairs each parcel with its matching invoice by order number. `render` is the manager's wall chart. Unlike a real line, nothing is physically removed from the stored table.",
  "terms": [
   [
    "KQL",
    "Kusto Query Language, the pipe-based query language for Log Analytics and Application Insights."
   ],
   [
    "where",
    "The KQL operator that filters rows by a condition, ideally on time first."
   ],
   [
    "project",
    "The KQL operator that selects and renames columns."
   ],
   [
    "summarize",
    "The KQL operator that aggregates rows into groups with functions such as count, avg and percentile."
   ],
   [
    "bin()",
    "A function that rounds values into fixed-size buckets, often used with timestamp to build time series."
   ],
   [
    "join",
    "An operator that combines rows from two tables on matching columns, such as operation_Id."
   ],
   [
    "render",
    "An operator that displays query results as a chart, for example a timechart."
   ]
  ],
  "example": "After a release, error rates rose. An engineer ran a query joining failed requests with exceptions on operation_Id, summarized by request name and exception type, and found that one endpoint threw a KeyError from a missing configuration setting. A timechart of failures by bin(timestamp, 5m) showed the spike started exactly at deployment time, confirming the cause.",
  "mistakes": [
   [
    "Searching the dependencies table for incoming calls to your API.",
    "Incoming calls are in requests. Dependencies are outgoing calls your app makes, such as database or HTTP calls."
   ],
   [
    "Assuming join in KQL behaves like a SQL inner join by default.",
    "The default kind is innerunique, which deduplicates the left side. Specify kind=inner or kind=leftouter when you need those behaviors."
   ],
   [
    "Using summarize count() by timestamp to build a time chart.",
    "Raw timestamps are almost all unique, giving one row per item. Use bin(timestamp, 5m) or another interval to group into buckets."
   ],
   [
    "Filtering on time at the end of the query.",
    "Put where timestamp > ago(...) first so less data is scanned and the query runs faster."
   ]
  ],
  "tryit": [
   [
    "At Maplestone Bank, the mobile API's 95th percentile latency seems higher this week. You want a line chart of the 95th percentile duration of requests, one point per hour, for the last seven days, split by request name. What query shape do you write?",
    "requests | where timestamp > ago(7d) | summarize percentile(duration, 95) by bin(timestamp, 1h), name | render timechart. Filtering on time comes first, summarize with bin builds the hourly series, the by name clause creates one line per endpoint, and render draws it."
   ],
   [
    "A colleague's query joins exceptions to requests and gets fewer rows than expected; several exceptions from the same request seem to vanish. The join has no kind specified and exceptions is on the left. What explains it?",
    "The default join kind, innerunique, deduplicates the left side on the join key, so repeated operation_Id values on the left collapse. Specify kind=inner, or put the smaller, filtered requests table on the left."
   ]
  ],
  "tip": "Know which table holds what (requests incoming, dependencies outgoing, exceptions errors, traces logs), use bin(timestamp, interval) inside summarize for time charts and join on operation_Id to correlate.",
  "check": [
   [
    "Write the KQL fragment that counts requests per 5-minute interval.",
    "requests | summarize count() by bin(timestamp, 5m), optionally followed by | render timechart."
   ],
   [
    "Which column would you join requests and exceptions on to correlate a failure with its error?",
    "operation_Id, the trace ID shared by all telemetry from the same operation."
   ],
   [
    "What is the difference between project and extend?",
    "project keeps only the columns you list (and can rename them); extend adds calculated columns while keeping the existing ones."
   ]
  ]
 },
 {
  "t": "Alerts: metric vs log search alerts and action groups",
  "hook": "On Monday morning at Thistle Grove Pharmacy, the overnight order backlog is enormous. The Service Bus dead-letter queue filled up at 1 a.m., and nobody knew until the store managers called at 7. There was a dashboard showing it, of course, but nobody watches dashboards at 1 a.m. Gabriel, the operations manager, asks you to make sure it never happens again: page the on-call engineer within minutes when the queue backs up, and email the team when the pharmacy assistant starts throwing throttling errors. He also wants the on-call phone number in one place, not copied into twenty rules. Which kind of alert fits each problem, and how do you wire up the notifications?",
  "simple": "An alert is a smoke detector for your app. It keeps checking something and makes noise when a rule is broken. Azure has two main kinds. A metric alert watches a single number, like how many messages are stuck in a queue, and reacts quickly when it crosses a line, then quiets down by itself when the number recovers. A log search alert runs a saved question against your logs every few minutes, such as \"how many times did this specific error appear?\", which lets it check things a single number cannot. It reacts a bit more slowly. Who gets told, and what automatic action runs, is kept in an action group: a reusable contact list plus a set of actions that many alerts can share, so you update a phone number once.",
  "body": [
   "Monitoring only helps if someone learns about problems quickly, and nobody watches dashboards all night. Azure Monitor alerts evaluate a condition on your telemetry and, when the condition is met, fire an alert that notifies people or starts automation. Every alert rule has three parts: the scope, which is the resource or resources to watch; the condition, which is the signal and the logic applied to it; and the actions, usually one or more action groups. Each rule also has a severity from 0 (critical) to 4 (verbose), which helps responders decide what to handle first and lets you route different severities differently.",
   "Metric alerts watch numeric platform or custom metrics. Examples include Service Bus active message count and dead-lettered message count, App Service HTTP 5xx count, Cosmos DB total requests with status code 429 (throttled), CPU (processor) percentage, or a custom metric your app emits. Metric alerts evaluate frequently with low latency, which makes them the best choice for fast notification on simple thresholds. Metrics are pre-aggregated numbers, so checking them is quick and cheap compared with running a query over raw logs.",
   "A metric alert condition can be static or dynamic. A static threshold is a fixed number, such as greater than 100 messages. A dynamic threshold uses machine learning to learn the metric's normal pattern, including daily and weekly cycles, and alerts on significant deviations; it suits metrics where a fixed number would be wrong at different times of day. Metric alerts can also split by dimensions, creating one alert per queue or per instance from a single rule. Finally, metric alerts are stateful: they fire once when the condition becomes true and resolve automatically when it clears, so responders are not flooded with repeat notifications.",
   "Log search alerts, formerly called log alerts, run a KQL (Kusto Query Language) query against a Log Analytics workspace or Application Insights on a schedule. You set how often the query runs (the frequency) and how much data it looks at each time (the lookback period, or window). The condition is based on the number of result rows or on a measured value in the results, optionally split by dimensions such as cloud role name. Use log search alerts when the condition needs logic that metrics cannot express: exceptions of a specific type, a join between requests and dependencies, a failure rate for one endpoint, or messages containing particular text.",
   "```kusto\nexceptions\n| where type == \"CosmosHttpResponseError\" and outerMessage has \"429\"\n| summarize count() by cloud_RoleName\n```",
   "The flexibility of log search alerts has costs. They have more latency than metric alerts, because data must first be ingested into the workspace and then the query must run on its schedule. They also cost more per rule than metric alerts. A good design uses metric alerts for anything a metric can express and saves log search alerts for conditions that genuinely need a query.",
   "An action group is a reusable collection of notification and action settings that many alert rules can share. Notifications include email, SMS (text message), push notifications to the Azure mobile app, voice calls, and email to Azure Resource Manager roles such as Owner. Actions include calling an Azure Function, a Logic App, a webhook (or a secure webhook that uses Microsoft Entra authentication), an Automation runbook, an Event Hub, or an ITSM (IT service management) connection that opens tickets. Because action groups are separate resources, you update the on-call email or phone number once and every rule that uses the group follows.",
   "Alert processing rules add another layer on top of fired alerts. They can suppress notifications during planned maintenance windows, so a scheduled restart does not page anyone, or add action groups to all alerts in a scope without editing each rule. Two other alert sources are worth recognizing: Application Insights smart detection, which flags unusual patterns such as a sudden rise in failures, and activity log alerts, which fire on control-plane events, such as a resource being deleted, or on service health events.",
   "Choosing between them on the exam comes down to a simple rule. A numeric resource metric with a threshold and the fastest response means a metric alert. Anything that needs a query over logs, such as specific exception types, joins or text matching, means a log search alert. Who gets notified and what automation runs is always configured in the action group, not in the rule itself."
  ],
  "analogy": "A metric alert is like a thermostat alarm: it watches one number, reacts within moments, and stops ringing on its own when the temperature returns to normal. A log search alert is like a security guard who reviews the camera footage every fifteen minutes looking for something specific, such as someone in a red jacket; more flexible, but always a little behind. The action group is the building's emergency call list posted by the phone: every alarm uses the same list, so you update a number once. The analogy breaks on dynamic thresholds, which learn normal patterns.",
  "mnemonic": "Every alert rule has three parts, in the order you configure them, \"Scope, Condition, Action\": what to watch, the logic that triggers it, and the action groups that respond.",
  "terms": [
   [
    "Metric alert",
    "An alert rule on a numeric metric with static or dynamic thresholds, evaluated frequently and resolving automatically."
   ],
   [
    "Log search alert",
    "An alert rule that runs a KQL query on a schedule and fires based on the results."
   ],
   [
    "Action group",
    "A reusable set of notifications and automated actions that alert rules trigger."
   ],
   [
    "Dynamic threshold",
    "A metric alert condition that learns normal behavior and fires on significant deviations."
   ],
   [
    "Alert processing rule",
    "A rule that suppresses or adds actions to fired alerts across a scope, for example during maintenance."
   ],
   [
    "Severity",
    "A level from 0 (critical) to 4 (verbose) assigned to an alert rule to indicate urgency."
   ]
  ],
  "example": "An operations team wants a page when the orders dead-letter queue grows and an email when the RAG API throws more than 20 throttling exceptions in 15 minutes. The first is a metric alert on Service Bus dead-lettered message count split by entity. The second is a log search alert running a KQL query every five minutes over a 15-minute window. Both use shared action groups for on-call and team email.",
  "mistakes": [
   [
    "Using a log search alert for a simple CPU or queue-length threshold.",
    "A metric alert is faster, cheaper and resolves automatically. Save log search alerts for conditions that need a query."
   ],
   [
    "Trying to alert on a specific exception type with a metric alert.",
    "Exception types and message text live in logs. Use a log search alert with a KQL query over exceptions."
   ],
   [
    "Entering email addresses and webhooks separately in every alert rule.",
    "Notifications and actions belong in reusable action groups, so one change updates every rule that uses them."
   ],
   [
    "Disabling alert rules during maintenance and hoping someone re-enables them.",
    "Use an alert processing rule to suppress notifications for the maintenance window without editing the rules."
   ]
  ],
  "tryit": [
   [
    "Bluefin Robotics wants to know within a few minutes when any of its 30 Service Bus queues has more than 500 active messages, with one alert per queue, and the alert should clear on its own once the backlog drains. What should they create?",
    "One metric alert on the active message count metric with a static threshold of 500, split by the entity name dimension so each queue gets its own alert. Metric alerts evaluate frequently, and they are stateful, so each alert resolves automatically when its queue drops below the threshold."
   ],
   [
    "The same team wants an alert when the word \"timeout\" appears in log messages from the payment service more than 10 times in 15 minutes, and they want it to open a ticket in their IT service management tool and page on-call. How should this be built?",
    "A log search alert with a KQL query over traces filtered to the payment service's cloud role name and messages containing timeout, running on a schedule with a 15-minute lookback and a threshold of 10. Attach an action group that includes the ITSM connection and the on-call notifications."
   ]
  ],
  "tip": "Threshold on a numeric metric with fastest detection means metric alert; conditions needing a query, joins or text matching mean log search alert; notifications and automation live in reusable action groups.",
  "check": [
   [
    "Which alert type would you use to alert when a specific exception type appears in logs?",
    "A log search alert, because it runs a KQL query over the exceptions data."
   ],
   [
    "Why define notifications in an action group rather than inside each alert rule?",
    "Action groups are reusable, so many rules share them and a change to recipients or actions is made in one place."
   ],
   [
    "What happens to a metric alert when the metric returns below the threshold?",
    "It resolves automatically, because metric alerts are stateful."
   ]
  ]
 },
 {
  "t": "Troubleshooting: App Service log stream, Container Apps console and system logs, Functions invocation logs",
  "hook": "It is the last hour of a practice lab for Northgate Community College's cloud course, and three teams are stuck at once. Team one's App Service container shows a generic error page. Team two's new container app revision says failed, and its console log is completely empty. Team three's function runs on schedule but writes nothing they can find. The instructor, Ms. Alvarez, walks over and asks each team the same question: \"Where are your logs?\" Nobody is sure. Each platform keeps its logs in a different place, and the clock is ticking. Where would you look first on each one?",
  "simple": "When an app breaks, logs are its own account of what happened, like a flight recorder. Each Azure hosting service keeps them in its own spot. App Service has a live log stream, but for a custom container you must first switch on log saving or you will see nothing from your app. Container Apps keeps two kinds of logs: console logs are what your own program prints, and system logs are what the Azure platform says while starting, pulling and scaling your app. If your app never started, the system logs explain why. Azure Functions lists every run of a function with whether it worked, how long it took and what it logged. A good habit is to check in order: did it start, did my code fail, did something it called fail, or was it a permission or setting?",
  "body": [
   "When something breaks, the first question is always where the logs are. Each compute platform in this exam has its own real-time and historical log sources, and knowing them saves time in labs and on the exam. The pattern is similar everywhere: a live stream for watching what happens right now, and a Log Analytics workspace or Application Insights for searching what happened earlier.",
   "For App Service, the log stream shows log output in real time in the portal or with `az webapp log tail`. For a custom container on Linux, container logs, meaning anything your app writes to stdout and stderr (standard output and standard error), are captured only when application logging to the file system is enabled under App Service logs. Turn it on with `az webapp log config --docker-container-logging filesystem`. The log stream then shows your app's output together with platform messages about container startup, such as image pulls and the startup probe waiting for the container to respond on its port. That is exactly where a wrong `WEBSITES_PORT` setting shows up: the platform waits for a response on one port while your app listens on another, and the container is eventually restarted.",
   "App Service has more tools for deeper digging. The Kudu advanced tools site gives access to log files and a console. The Diagnose and solve problems page shows container restart history and runs guided checks for common issues. For long-term queries, send diagnostic settings such as AppServiceConsoleLogs and AppServiceHTTPLogs to a Log Analytics workspace, where you can search them with KQL (Kusto Query Language).",
   "```bash\naz webapp log config -g rg -n orders-web --docker-container-logging filesystem\naz webapp log tail -g rg -n orders-web\n\naz containerapp logs show -g rg -n orders --type console --follow\naz containerapp logs show -g rg -n orders --type system\naz containerapp exec -g rg -n orders --command sh\n```",
   "Container Apps separates two log types, and the exam tests the difference. Console logs are your container's stdout and stderr: application errors, stack traces and print statements. System logs are generated by the platform: revision provisioning, image pull failures, probe failures, scaling events, secret or identity problems and container restarts. If a revision never becomes ready, look at system logs first, because your code may never have started and so the console log will be empty. If the app runs but returns errors, look at console logs.",
   "Both Container Apps log types stream live with `az containerapp logs show` (add `--follow` to keep streaming) or in the portal's Log stream page. Both are also stored in the environment's Log Analytics workspace, in the ContainerAppConsoleLogs_CL and ContainerAppSystemLogs_CL tables, where you query them with KQL. For interactive checks, `az containerapp exec` opens a shell in a running replica, so you can inspect files or test a network connection from inside. `az containerapp revision list` shows each revision's provisioning and running state. Container Apps jobs have the same logs plus an execution history for each run.",
   "For Azure Functions, the Invocations view on each function, found under Monitor in the portal, lists recent executions with success or failure, duration and the log lines written during that invocation. It is backed by Application Insights. Selecting an invocation shows its logs and any exception. For live output, the portal's log stream (which can use Application Insights Live Metrics or file system logs) and the Core Tools command `func azure functionapp logstream <APP_NAME>` stream logs as they happen. In Application Insights, function executions appear in the requests table, and your `logging` calls appear in the traces table with the invocation ID, so a KQL query can find every log line for one failed execution.",
   "Missing function logs have a few usual causes. The host.json file controls log levels by category. If expected logs are missing, check that the level for the `Function` category, or your own category, is not set higher than the messages you write; for example, a level of Warning hides Information messages. Also check that Application Insights sampling has not dropped them, and that the function app has its Application Insights connection string configured at all.",
   "Finally, a reliable troubleshooting flow ties it together. First check whether the platform started your code, using system logs and container startup messages. Next check whether your code failed, using console, invocation and exception logs. Then check whether a dependency failed, using the dependencies table in Application Insights. Finally check whether identity or configuration was the cause: 403 Forbidden errors, missing app settings or unresolved Key Vault references. Working in this order avoids hours spent reading application code when the image never even pulled."
  ],
  "analogy": "Troubleshooting Container Apps is like figuring out why a play did not go well. System logs are the stage manager's notes: the set did not arrive, the lights failed, the actor could not get through the stage door. Console logs are what the actors actually said on stage. If the curtain never opened, the actors' lines are empty, and only the stage manager's notes explain why. The Functions Invocations view is the program listing every performance with its reviews. The analogy is imperfect: real stage managers do not stream their notes live.",
  "mnemonic": "Check in order with the four Ps: Platform (did it start?), Program (did my code fail?), Partner (did a dependency fail?), Permissions (identity or configuration, such as 403s and unresolved Key Vault references).",
  "terms": [
   [
    "Log stream",
    "A real-time view of an app's log output in the portal or CLI."
   ],
   [
    "Console logs",
    "In Container Apps, the stdout and stderr output of your containers."
   ],
   [
    "System logs",
    "In Container Apps, platform-generated events such as provisioning, image pulls, probe failures and scaling."
   ],
   [
    "Invocations view",
    "The Functions monitoring page listing recent executions with status, duration and logs from Application Insights."
   ],
   [
    "host.json",
    "The Functions configuration file that, among other settings, controls log levels by category."
   ]
  ],
  "example": "A new Container Apps revision stays in a failed state. The console log is empty, so the engineer checks system logs, which show an image pull failure: unauthorized. The app's user-assigned identity had never been granted AcrPull. After the role assignment and a restart of the revision, the system logs show a successful pull and the console log shows the app starting on port 8000.",
  "mistakes": [
   [
    "Reading console logs first when a container app revision never becomes ready.",
    "If the container never started, the console log is empty. System logs record image pulls, provisioning and probe failures, so check them first."
   ],
   [
    "Expecting App Service log stream to show a custom container's output by default.",
    "Container stdout and stderr are captured only after application logging to the file system is enabled, for example with az webapp log config --docker-container-logging filesystem."
   ],
   [
    "Looking for function log messages in the dependencies or exceptions table.",
    "Function executions appear in requests, and logging calls appear in traces with the invocation ID."
   ],
   [
    "Assuming missing function logs mean the code did not run.",
    "Check the Invocations view and the host.json log levels; a level set too high, or sampling, can hide messages from a function that ran."
   ]
  ],
  "tryit": [
   [
    "Ashgrove Credit Union deploys a Python API as a custom Linux container on App Service. The site returns an error page, and after enabling file system logging the log stream shows the platform waiting for the container to respond on port 80, then restarting it. The app listens on port 8000. What is the fix?",
    "Set the WEBSITES_PORT app setting to 8000 so the platform sends traffic and startup probes to the port the app actually listens on. The platform messages in the log stream show the probe failing on the wrong port."
   ],
   [
    "A timer-triggered function shows successful executions in the Invocations view, but the developer's logging.info messages never appear. host.json sets the default log level to Warning. What explains it, and what should change?",
    "The Warning level filters out Information messages, so logging.info calls are dropped. Lower the log level for the Function category (or the developer's own category) to Information in host.json."
   ]
  ],
  "tip": "Container Apps: startup, pull, probe and scaling problems are in system logs; application errors are in console logs. App Service containers need file system logging enabled before log stream shows container output.",
  "check": [
   [
    "A container app revision never becomes ready and the console logs are empty. Where should you look?",
    "The system logs, which record provisioning, image pull and probe failures from the platform."
   ],
   [
    "Where can you see the logs from one specific failed execution of an Azure Function?",
    "In the function's Invocations view, backed by Application Insights, or by querying traces and requests for that invocation."
   ],
   [
    "Which Log Analytics tables hold Container Apps logs?",
    "ContainerAppConsoleLogs_CL for console output and ContainerAppSystemLogs_CL for platform events."
   ]
  ]
 }
], {"reviewed":"2026-10-06"});
