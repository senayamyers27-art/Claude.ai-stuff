/* Lessons for Certified Kubernetes Application Developer (CKAD (Kubernetes v1.35 curriculum)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("ckad", [
 {
  "t": "Writing Dockerfiles: base images, layers, multi-stage builds, ENTRYPOINT vs CMD",
  "hook": "You join the platform team at Lantern Freight on a Monday, and the first ticket in your queue is from Priya on the routing team: \"Every tiny code change takes four minutes to build, and our image is 1.2 GB. Security also flagged a compiler in production.\" She attaches the Dockerfile. It starts from a full language image, copies the whole repository first, installs dependencies after that, and ends with `CMD python app.py` in shell form. Kubernetes also reports that the Pods take thirty seconds to stop on every rollout. Four separate complaints, one short text file. Which lines would you change first, and why would each change fix a different symptom?",
  "simple": "A container image is like a sealed lunchbox that holds your program and everything it needs to run. A Dockerfile is the written recipe for packing that lunchbox, one step per line. Each step that adds files makes a new layer, like stacking sheets of paper. The builder remembers sheets it already made, so if the early steps have not changed, it reuses them instead of redoing the work. That is why the order of steps matters. A multi-stage build is like cooking in a messy kitchen and then putting only the finished meal in the lunchbox, leaving the pots behind. Finally, two lines say what runs when the box is opened: ENTRYPOINT is the program that always runs, and CMD is the default extra instructions you can easily swap out.",
  "body": [
   "A container image is a packaged filesystem plus metadata that says how to start your application. A Dockerfile is the recipe for building it: a plain text file of instructions that the builder runs from top to bottom. The Certified Kubernetes Application Developer (CKAD) exam sits in the Application Design and Build domain here, and it expects you to read, fix and write short Dockerfiles. That means knowing what each common instruction does, how the result is stored, and what command the finished container will actually run.",
   "Every Dockerfile starts from a base image with `FROM`, for example `FROM python:3.12-slim` or `FROM alpine`. The base supplies the operating system files and often a language runtime. Smaller bases such as slim, alpine or distroless images mean faster pulls on every node and fewer installed packages that could contain vulnerabilities, which is why security scanners so often recommend them. After `FROM` you typically see a predictable set of instructions. `WORKDIR` sets the working directory for the following steps and for the running container. `COPY` brings in files from the build context. `RUN` executes build commands such as installing dependencies. `ENV` sets environment variables that persist into the container. `EXPOSE` documents a listening port, but it does not publish or open anything by itself. `USER` switches away from root so the application runs with fewer privileges.",
   "Layers are the next idea to understand, because they explain both build speed and image size. Instructions that change the filesystem, mainly `RUN`, `COPY` and `ADD`, each create a new read-only layer stacked on top of the previous ones. Layers are cached: if an instruction and everything before it are unchanged, the builder reuses the cached layer instead of running it again, and you see that step reported as cached in the build output. The cache is ordered, so once one step changes, every step after it must run again. That is why you copy the dependency manifest (such as `requirements.txt` or `package.json`) and install dependencies before copying the rest of your source code. Editing a source file then invalidates only the later layers, and the slow dependency install is reused. Layers also explain a surprise about size: deleting a file in a later layer does not shrink the image, because the earlier layer still contains it. To keep a temporary file out of the image, create and remove it in the same `RUN` step, or use a separate build stage.",
   "A multi-stage build solves the size and attack-surface problem more cleanly. It uses more than one `FROM` in the same file. The first stage, often named with `AS build`, has compilers and build tools. The final stage starts from a small runtime image and copies only the finished artifact with `COPY --from=build`. Build tools, source code and caches never reach the image you ship, which makes it smaller, faster to pull, and gives an attacker fewer tools to work with if the container is ever compromised. Only the last stage becomes the output image unless you choose a different target.",
   "```dockerfile\nFROM golang:1.22 AS build\nWORKDIR /src\nCOPY go.mod ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /app\n\nFROM alpine\nCOPY --from=build /app /app\nUSER 1000\nENTRYPOINT [\"/app\"]\nCMD [\"--port\", \"8080\"]\n```",
   "Read the example from the top. The build stage downloads modules before copying the source, so module downloads stay cached across code edits. The final stage starts fresh from alpine, takes only the compiled `/app` binary, switches to user 1000, and sets the start command. Nothing from the Go toolchain ends up in the shipped image.",
   "`ENTRYPOINT` and `CMD` together define that start command, and exam questions love to ask what actually runs. `ENTRYPOINT` is the executable that always runs. `CMD` supplies default arguments that are easy to override. When both are present, the container runs ENTRYPOINT followed by CMD, so the example above runs `/app --port 8080`. If you run the image with extra arguments, such as `docker run myimage --port 9090`, they replace CMD but keep ENTRYPOINT, giving `/app --port 9090`. If only CMD is set, it is the whole command, and any arguments you pass replace it entirely. Replacing ENTRYPOINT itself needs an explicit override such as `docker run --entrypoint`, or, in Kubernetes, the Pod's `command` field.",
   "Finally, the form you write these in matters for clean shutdowns. Prefer the exec form, a JSON array like `[\"/app\"]`, over the shell form `ENTRYPOINT /app`. The exec form runs your program directly as process 1 (PID 1, the first process in the container), so it receives signals such as SIGTERM when Kubernetes stops the Pod and can finish requests and exit gracefully. The shell form wraps the program in `/bin/sh -c`, and the shell may not forward signals. Kubernetes then waits out the termination grace period and kills the container forcibly, which shows up as slow rollouts and dropped connections. When you inspect a finished image, `docker image inspect` shows the configured Entrypoint and Cmd, which is a quick way to confirm what will run."
  ],
  "analogy": "Think of ENTRYPOINT and CMD like a coffee machine with a fixed brewer and a default cup size button. The brewer (ENTRYPOINT) always runs. The default size (CMD) is what you get if you press nothing, but pressing a different size at run time swaps only the size, not the brewer. Swapping the brewer itself takes deliberate effort, like the --entrypoint flag or the Pod command field. The analogy stops working with shell form: a real machine has no hidden middleman, but shell form inserts /bin/sh between you and the brewer.",
  "terms": [
   [
    "Base image",
    "The image named in FROM that supplies the starting filesystem and runtime for your build."
   ],
   [
    "Layer",
    "A cached, read-only filesystem change produced by an instruction such as RUN or COPY."
   ],
   [
    "Build cache",
    "Reuse of earlier layers when an instruction and everything before it are unchanged."
   ],
   [
    "Multi-stage build",
    "A Dockerfile with several FROM stages where only selected artifacts are copied into the final image."
   ],
   [
    "ENTRYPOINT",
    "The fixed executable the container runs at start."
   ],
   [
    "CMD",
    "Default arguments (or a default command if there is no ENTRYPOINT) that are replaced by arguments given at run time."
   ],
   [
    "Exec form",
    "The JSON array form of ENTRYPOINT or CMD, which runs the program directly as PID 1 so it receives signals."
   ]
  ],
  "example": "A team's Python image took four minutes to rebuild after every code change. They moved `COPY requirements.txt .` and `RUN pip install -r requirements.txt` above `COPY . .`, so the dependency layer stayed cached, and rebuilds dropped to seconds. Switching to a multi-stage build also cut the final image size by more than half, and changing `CMD python app.py` to `CMD [\"python\", \"app.py\"]` let the app receive SIGTERM and shut down promptly during rollouts.",
  "mistakes": [
   [
    "Deleting a large file with a later RUN step makes the image smaller.",
    "The earlier layer still holds the file, so the image stays the same size. Remove temporary files in the same RUN step that created them, or use a multi-stage build."
   ],
   [
    "Arguments passed at run time are appended after CMD.",
    "They replace CMD entirely. ENTRYPOINT stays, and the new arguments take the place of the old CMD."
   ],
   [
    "EXPOSE opens or publishes the port.",
    "EXPOSE only documents which port the app listens on. Publishing happens at run time, and in Kubernetes traffic reaches the Pod through Services, not EXPOSE."
   ],
   [
    "Shell form and exec form behave the same.",
    "Shell form runs the program under /bin/sh -c, which may not pass SIGTERM along, so Pods stop slowly. Exec form runs the program as PID 1 and receives signals directly."
   ]
  ],
  "tryit": [
   [
    "A Dockerfile ends with `ENTRYPOINT [\"python\", \"worker.py\"]` and `CMD [\"--queue\", \"default\"]`. A colleague runs the image with the extra arguments `--queue urgent --verbose`. Another colleague wants to open a shell in the image instead. What runs in each case?",
    "The first runs `python worker.py --queue urgent --verbose`, because run-time arguments replace CMD and ENTRYPOINT stays. Passing `sh` as an argument would only give `python worker.py sh`, so the second colleague must override the entrypoint itself, for example with `--entrypoint sh` in Docker or the `command` field in a Pod."
   ],
   [
    "Your Node.js Dockerfile is `FROM node:20`, `COPY . .`, `RUN npm ci`, `CMD [\"node\", \"server.js\"]`. Every edit to a single source file triggers a full dependency install. What two-line change fixes it?",
    "Copy only the manifests first and install, then copy the rest: `COPY package.json package-lock.json ./` and `RUN npm ci` above `COPY . .`. Source edits then invalidate only the final COPY layer, and the dependency layer comes from cache."
   ]
  ],
  "tip": "Remember the combination rule: ENTRYPOINT plus CMD run together, and run-time arguments replace only CMD. Questions often ask what command a container actually runs, so write it out word by word before answering.",
  "check": [
   [
    "Why should you copy the dependency file and install packages before copying the rest of the source?",
    "Because layers are cached in order; code changes then invalidate only the later layers, so the slow dependency install is reused from cache."
   ],
   [
    "An image has ENTRYPOINT [\"ping\"] and CMD [\"localhost\"]. What runs if you start it with the argument example.com?",
    "`ping example.com`, because run-time arguments replace CMD while ENTRYPOINT stays."
   ],
   [
    "What does a multi-stage build achieve?",
    "It keeps build tools and intermediate files out of the final image, making it smaller and reducing attack surface."
   ],
   [
    "Why prefer `ENTRYPOINT [\"/app\"]` over `ENTRYPOINT /app`?",
    "The exec form runs /app as PID 1 so it receives SIGTERM directly; the shell form runs it under /bin/sh -c, which may not forward signals, causing slow forced shutdowns."
   ]
  ]
 },
 {
  "t": "Building, tagging, saving and loading images with docker or podman (build, tag, save, load)",
  "hook": "It is late Thursday at Copperline Labs, and Dev is preparing a demo cluster for a customer site that has no internet access at all. He has built the new release image on his laptop, and the instructions from the customer are short: bring a single file, load it onto the host, run it. He reaches for `docker export` because the name sounds right, copies the tar to a USB drive, and heads home. On Friday morning the customer's engineer loads it, starts it, and the container exits immediately with no command to run. Dev had the right image and the wrong command. What should that file have contained, and how would he have caught it before leaving?",
  "simple": "Building an image is like baking a cake from a recipe: the tool reads your Dockerfile and produces a finished image. A tag is a sticky label on the cake box, such as \"birthday-v2\". You can stick several labels on the same box without baking a second cake. Saving an image writes the whole box, with every layer and its instructions for serving, into one file you can carry on a USB drive. Loading reads that file back on another machine. There is a lookalike pair of commands, export and import, that only copies the crumbs from a container that already ran. It leaves out the instructions for how to start it, so it is usually the wrong choice when someone asks you to move an image.",
  "body": [
   "Once you have a Dockerfile, you turn it into an image with a container engine. Docker and Podman accept almost identical commands, so on the Certified Kubernetes Application Developer (CKAD) exam you can usually type the same thing with either tool, swapping only the first word. Podman runs without a central background daemon and can run rootless, meaning as an ordinary user, but for building, tagging and moving images the workflow is the same. This lesson walks through that workflow in the order you would use it.",
   "Building comes first. `docker build -t myapp:1.0 .` builds an image. The `-t` flag gives it a name and tag, and the final `.` is the build context: the directory whose files are sent to the builder and can be referenced by `COPY` and `ADD`. Files outside the context are invisible to the build, which is why `COPY ../secrets .` fails. If the Dockerfile has another name or location, point to it with `-f path/to/Dockerfile` while keeping the context where it is. A `.dockerignore` file in the context root keeps large or sensitive files, such as `.git`, local `node_modules` or credentials, out of the build, which both speeds up the build and stops secrets from slipping into a layer.",
   "Naming is the next thing to get exactly right, because exam tasks check the name and tag precisely. An image reference has the form `registry/repository:tag`, for example `registry.example.com/team/myapp:1.0`. If you omit the registry, Docker Hub is assumed. If you omit the tag, `latest` is assumed, which is just a default label and does not mean newest. A tag is a movable label pointing to an image. The immutable identity is the content digest, written `myapp@sha256:...`, which changes if a single byte of the image changes. `docker tag myapp:1.0 registry.example.com/team/myapp:1.0` adds a second name to the same image without copying anything, which you do before `docker push` to a registry. Running `docker images` afterward shows both names with the same IMAGE ID, proving they point to one image.",
   "Sometimes there is no registry, for example on an air-gapped host or in an exam task that asks you to export an image to a file. `docker save -o myapp.tar myapp:1.0` writes the image, with all its layers, tags and configuration, to a tar archive. `docker load -i myapp.tar` imports it on another machine, and the image reappears with its original name and tag. Podman supports the same `save` and `load` commands, and can also save in OCI (Open Container Initiative, the vendor-neutral image standard) format with `--format oci-archive`. Do not confuse these with `docker export` and `docker import`. Those work on a container's flattened filesystem, so they lose the layer history and metadata such as ENTRYPOINT, CMD, environment variables and exposed ports. An imported image therefore often has no start command at all.",
   "```bash\ndocker build -t myapp:1.0 .\ndocker tag myapp:1.0 myapp:latest\ndocker images | grep myapp\ndocker save -o /tmp/myapp.tar myapp:1.0\ndocker load -i /tmp/myapp.tar\n```",
   "Getting a locally built image into a local cluster is a separate step, because cluster nodes do not see the images stored on your workstation. With kind (Kubernetes in Docker) you run `kind load docker-image myapp:1.0`. With minikube you can use `minikube image load myapp:1.0`. Both copy the image into the node's container runtime. Then, in the Pod spec, set `imagePullPolicy: IfNotPresent` or `Never` so the kubelet, the agent on each node, uses the loaded image instead of trying to pull it from a registry. Watch out for the default: for an image tagged `latest`, or with no tag, the default pull policy is `Always`, which fails with `ErrImagePull` and then `ImagePullBackOff` if the image exists only locally. For any other tag the default is `IfNotPresent`, which is one more reason to give images specific version tags.",
   "Inspection commands help you confirm your work before you hand it off. `docker images` (or `podman images`) lists images with their repository, tag, ID and size. `docker image inspect myapp:1.0` prints the configured Entrypoint, Cmd, environment and exposed ports, so you can verify that the start command survived. `docker history myapp:1.0` shows each layer, the instruction that created it, and its size, which is a quick way to spot an unexpectedly large step.",
   "Put together, a typical exam-style task reads like a checklist: build from a given directory with a given name and tag, perhaps add a second tag, then save to an exact path. Read the path and tag twice, use `save` rather than `export`, and finish with `ls -lh` on the archive so you know the file exists and has a sensible size."
  ],
  "analogy": "Saving versus exporting is like the difference between shipping a boxed board game and shipping a photo of a game in progress. The boxed game (save) has every piece, the rule book, and the label on the lid, so the receiver can set it up properly. The photo (export) shows where the pieces happen to sit, but the rules for how to start are missing. The comparison is loose in one way: an exported filesystem is still usable if you supply the start command yourself, while a photo is not playable at all.",
  "terms": [
   [
    "Build context",
    "The directory sent to the builder whose files COPY and ADD can reach."
   ],
   [
    ".dockerignore",
    "A file in the build context listing paths to exclude from the build."
   ],
   [
    "Tag",
    "A human-readable, movable label such as 1.0 that points to an image."
   ],
   [
    "Digest",
    "The immutable sha256 content hash that uniquely identifies an image."
   ],
   [
    "docker save / load",
    "Commands that export images with all layers and metadata to a tar archive and import them again."
   ],
   [
    "docker export / import",
    "Commands that work on a container's flattened filesystem and drop image history and metadata such as CMD."
   ],
   [
    "imagePullPolicy",
    "Pod field (Always, IfNotPresent or Never) that controls when the kubelet pulls an image from a registry."
   ]
  ],
  "example": "An exam-style task says: build the image from /opt/app with the name webapp and tag v2, then save it to /opt/webapp-v2.tar. You run `podman build -t webapp:v2 /opt/app` followed by `podman save -o /opt/webapp-v2.tar webapp:v2`, then verify with `ls -lh /opt/webapp-v2.tar` and, if time allows, `podman image inspect webapp:v2` to confirm the start command.",
  "mistakes": [
   [
    "Using `docker export` when a task asks you to save an image to a tar file.",
    "Export copies a container's flat filesystem and loses CMD, ENTRYPOINT and layer history. Use `docker save -o file.tar name:tag`."
   ],
   [
    "Thinking `latest` means the newest build.",
    "It is only the default tag name when none is given. It points wherever someone last tagged it, and it also changes the default pull policy to Always."
   ],
   [
    "Believing `docker tag` creates a copy of the image.",
    "Tag only adds another name for the same image ID; no data is duplicated."
   ],
   [
    "Assuming a cluster can use images built on your laptop automatically.",
    "Nodes have their own image stores. Load the image into the cluster (for example with kind load docker-image) and set imagePullPolicy to IfNotPresent or Never."
   ]
  ],
  "tryit": [
   [
    "You built `report:dev` with Docker, ran `kind load docker-image report:dev`, and deployed a Pod with no imagePullPolicy set. It runs fine. A teammate repeats the steps with an image called `report` and no tag, and their Pod shows ImagePullBackOff. What is different, and what are two ways to fix it?",
    "With no tag the image is `report:latest`, and the default pull policy for latest is Always, so the kubelet tries a registry and fails. Fix it by giving the image a specific tag such as `report:dev`, or by setting `imagePullPolicy: IfNotPresent` (or Never) in the container spec."
   ]
  ],
  "tip": "Tasks that ask for an image archive want `save` (image with layers and metadata), not `export` (a container's flat filesystem). Read the exact name, tag and output path twice, and verify the file exists before moving on.",
  "check": [
   [
    "What does the trailing dot in `docker build -t app:1 .` mean?",
    "It sets the build context to the current directory, which is sent to the builder and is what COPY can read from."
   ],
   [
    "You loaded an image called app:latest into kind but the Pod shows ErrImagePull. Why?",
    "For a latest tag the default imagePullPolicy is Always, so the kubelet tries a registry; set imagePullPolicy to IfNotPresent or Never, or use a specific tag."
   ],
   [
    "Does `docker tag` copy the image?",
    "No, it only adds another name pointing to the same image content."
   ],
   [
    "Which command shows the layers of an image and their sizes?",
    "`docker history <image>` (or `podman history`)."
   ]
  ]
 },
 {
  "t": "How Pod `command` and `args` override the image ENTRYPOINT and CMD",
  "hook": "Rosa on the payments team at Bluefield Mutual needs a quick debug version of the reconciliation service. She does not want to rebuild the image, so she edits the Pod spec and adds `command: [\"--log-level=debug\"]`. The Pod goes straight into CrashLoopBackOff with an error saying the executable was not found. She tries again with `command: [\"python app.py --log-level=debug\"]` and gets the same kind of error, with a strange-looking file name in it. The image works perfectly with no overrides. Two lines of YAML, two failures, and a standup in ten minutes. Which field should she have used, and why did the second attempt fail even though the words look right?",
  "simple": "Every container image comes with a built-in plan for what to run when it starts: a main program and some default settings for it. Kubernetes lets you change that plan in the Pod without rebuilding the image. There are two knobs. The `command` knob swaps the main program. The `args` knob swaps only the default settings. Think of a music player: `command` changes which app opens, while `args` changes which playlist it plays. One more surprise: Kubernetes passes your words straight to the program, with no terminal in the middle. So tricks you use in a terminal, like joining two commands with `&&`, only work if you start a shell yourself and hand it the whole line.",
  "body": [
   "Kubernetes lets you change how a container starts without rebuilding its image. In a container spec, the `command` field overrides the image's ENTRYPOINT and the `args` field overrides the image's CMD. The naming is confusing, because Docker's CMD is Kubernetes' args, not Kubernetes' command. It is worth memorizing the mapping until it is automatic: command = ENTRYPOINT, args = CMD. Almost every exam question on this topic comes down to applying that mapping carefully.",
   "There are four combinations, and each produces a predictable result. If you set neither field, the image's ENTRYPOINT and CMD run as built. If you set only `args`, the image's ENTRYPOINT runs with your args instead of the image CMD; this is the gentle option for changing flags. If you set only `command`, your command runs and the image's CMD is ignored completely. It is not appended, which surprises many people. If you set both, your command runs with your args and both image defaults are ignored. A good habit is to write out the final command line as a single string before you apply the YAML, so you can see whether it makes sense.",
   "Both fields are arrays of strings, and Kubernetes does not run them through a shell. Each array element becomes exactly one argument passed to the program. That means `command: [\"echo $HOME\"]` does not work the way it would in a terminal: there is no shell to split the string into words or expand the variable, so the runtime looks for an executable whose name is literally `echo $HOME`. The same applies to pipes, `&&`, loops, redirection with `>` and wildcards. When you need any shell feature, call a shell explicitly and give it the whole script as one string. The usual pattern is `command: [\"sh\", \"-c\"]` with the script in `args`, or everything in one array.",
   "```yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: looper\nspec:\n  containers:\n  - name: app\n    image: busybox\n    command: [\"sh\", \"-c\"]\n    args: [\"while true; do date; sleep 5; done\"]\n```",
   "In the example, `sh` is the executable, `-c` tells it to read a script from the next argument, and the args array supplies that script as a single string. The shell then handles the loop, the semicolons and the `sleep`. Because the loop never ends, the container keeps running, which is what you want for a Pod that should stay up.",
   "Kubernetes does expand its own variable syntax `$(VAR_NAME)` inside command and args, using environment variables defined in the container's `env` list (including values pulled from ConfigMaps or Secrets with `valueFrom`). So `args: [\"--port=$(PORT)\"]` works if `PORT` is set in `env`. If the variable does not exist, the text is left exactly as written, which can produce confusing errors. To write a literal `$(...)`, escape it as `$$(...)`. Remember the difference: `$(PORT)` is expanded by Kubernetes before the process starts, while `$PORT` is only expanded if a shell is involved.",
   "The fastest way to produce this YAML on the exam is imperative generation, then a quick review. `kubectl run looper --image=busybox --dry-run=client -o yaml -- sh -c 'while true; do date; sleep 5; done'` puts everything after `--` into `args`. Adding `--command` changes that: `kubectl run t --image=busybox --command -- sleep 3600` puts the words into `command` instead. Both are valid for busybox, because its image has no ENTRYPOINT, so args alone become the whole command. For an image that does have an ENTRYPOINT, the difference matters a great deal. Redirect the output to a file, open it, and check which field your words landed in before you apply it.",
   "When debugging, `kubectl describe pod` shows the effective Command and Args for each container, and `kubectl get pod <name> -o yaml` shows exactly what you wrote. A container that exits immediately with a Completed or CrashLoopBackOff status is often a sign that the override replaced a long-running server command with something that finishes, that a shell string was passed without `sh -c`, or that flags were put into `command` when they belonged in `args`. Messages such as `exec: \"--log-level=debug\": executable file not found` in the Pod events point straight at that last mistake. The fix is almost always small: move the flags into `args`, wrap a shell string in `sh -c`, or restore a long-running command, then delete and recreate the Pod, because most fields of a running Pod, including command and args, cannot be edited in place."
  ],
  "analogy": "Picture a theater with a lead actor (ENTRYPOINT) and a default script (CMD). In Kubernetes, `args` hands the same actor a new script, while `command` replaces the actor entirely, and the new actor does not inherit the old script. The analogy stops at the shell: an actor understands a full sentence, but a container without `sh -c` receives each array item as a separate word and cannot interpret pipes or variables.",
  "terms": [
   [
    "command",
    "Container field that replaces the image ENTRYPOINT."
   ],
   [
    "args",
    "Container field that replaces the image CMD."
   ],
   [
    "$(VAR) expansion",
    "Kubernetes substitution of container environment variables inside command and args, done without a shell."
   ],
   [
    "sh -c",
    "Shell invocation that runs a single string as a script, enabling pipes, loops and variables."
   ],
   [
    "--command flag",
    "kubectl run option that puts the words after -- into command instead of args."
   ]
  ],
  "example": "An image's ENTRYPOINT is `nginx` with CMD `-g daemon off;`. A task asks you to start it with an extra error log setting. Setting only `args: [\"-g\", \"daemon off;\", \"-e\", \"stderr\"]` keeps the nginx entrypoint and replaces just the default arguments, with no need to rebuild the image. Setting `command: [\"-e\", \"stderr\"]` instead would try to run a program named `-e` and fail.",
  "mistakes": [
   [
    "Putting new flags in `command` to change how the app runs.",
    "`command` replaces the executable, so the flags are treated as a program name. Put flags in `args` to keep the image ENTRYPOINT."
   ],
   [
    "Expecting `command` to keep the image CMD and append it.",
    "When only `command` is set, the image CMD is discarded entirely. Supply any arguments yourself in `args`."
   ],
   [
    "Writing `command: [\"echo hi && sleep 10\"]` as if it were a terminal line.",
    "There is no shell, so the whole string is treated as one program name. Use `[\"sh\", \"-c\", \"echo hi && sleep 10\"]`."
   ],
   [
    "Assuming `$VAR` is expanded in args.",
    "Only Kubernetes' `$(VAR)` syntax is expanded without a shell. `$VAR` needs `sh -c` to be expanded."
   ]
  ],
  "tryit": [
   [
    "An image has ENTRYPOINT [\"/server\"] and CMD [\"--port\", \"8080\"]. A task asks you to run it on port 9090 with the environment variable MODE passed as a flag, `--mode=<value>`, where MODE is set in the container's env list. Write the minimal override.",
    "Set only args: `args: [\"--port\", \"9090\", \"--mode=$(MODE)\"]`. The image ENTRYPOINT `/server` stays, the default CMD is replaced, and Kubernetes expands `$(MODE)` from env without needing a shell."
   ],
   [
    "A colleague generated a Pod with `kubectl run fetch --image=tools/fetch -- curl -s web` and it fails. The team's internal tools/fetch image has ENTRYPOINT [\"curl\"]. What actually runs, and how should the command be written?",
    "The words after -- land in args, so the container runs `curl curl -s web`, treating the second curl as a URL. Either drop the duplicate (`-- -s web`) so args follow the curl entrypoint, or add `--command` so `curl -s web` replaces the entrypoint."
   ]
  ],
  "tip": "Setting only `command` discards the image CMD rather than appending it. And `--command` on kubectl run decides whether the words after `--` land in command or args, so always check the generated YAML.",
  "check": [
   [
    "Which Kubernetes field overrides a Dockerfile CMD?",
    "`args`. The `command` field overrides ENTRYPOINT."
   ],
   [
    "Why does `command: [\"echo hello && sleep 10\"]` fail?",
    "Kubernetes runs it without a shell, so it looks for a program literally named with that whole string; use `[\"sh\", \"-c\", \"echo hello && sleep 10\"]`."
   ],
   [
    "What does `kubectl run p --image=busybox -- sleep 60` set?",
    "It sets `args: [sleep, 60]`. The busybox image has no ENTRYPOINT, so those args become the whole command that runs."
   ],
   [
    "What happens to `$(LEVEL)` in args if LEVEL is not defined in the container's env?",
    "It is left as the literal text `$(LEVEL)`, because Kubernetes only substitutes variables that exist."
   ]
  ]
 },
 {
  "t": "Choosing a workload: Deployment, StatefulSet, DaemonSet, Job, CronJob, bare Pod",
  "hook": "At Juniper Grove Outfitters, a node in the cluster dies during the Saturday sale. Most of the storefront recovers on its own within a minute. But the promotions service, which Tomas launched last month with a quick `kubectl run`, is simply gone, and so is the discount banner customers were promised. Meanwhile the database replicas restarted with new random names and the application cannot find its primary, and the log collector never appeared on the replacement node. Three different failures, one root cause: each piece of work was wrapped in the wrong kind of object, or in none at all. How do you decide which controller each workload belongs in?",
  "simple": "Kubernetes runs your programs in Pods, which are small boxes holding one or more containers. On their own, Pods are fragile: if one disappears, nothing brings it back. So you hand Pods to a manager, called a controller, that keeps checking and fixing things. Different managers suit different jobs. A Deployment is like a staffing agency for identical cashiers: any one can be replaced by another. A StatefulSet is for workers with name badges who must keep their own lockers. A DaemonSet puts exactly one security guard on every floor of the building. A Job is a contractor who finishes one task and leaves, and a CronJob books that contractor on a schedule, such as every night at 2 a.m.",
  "body": [
   "A Pod is the smallest deployable unit in Kubernetes: one or more containers that share a network namespace, so they reach each other on `localhost`, and can share volumes. You rarely create Pods directly for real workloads, because a bare Pod is not replaced if it is deleted or its node fails. Instead you create a workload controller, which holds a Pod template and continually works to make the actual state of the cluster match the state you asked for. Choosing the right controller is a core Certified Kubernetes Application Developer (CKAD) skill, and exam questions usually hide the answer in a few clue words.",
   "A Deployment runs a set of interchangeable, stateless replicas, such as a web front end or an Application Programming Interface (API) server. It manages ReplicaSets for you and supports rolling updates and rollbacks, so you can change the image and Kubernetes swaps Pods gradually. Any Pod can be killed and replaced by another identical one with a new random name, because no Pod holds anything the others lack. This is the default choice for most applications. In `kubectl get pods` you see names like `web-7d9c6b8f5-x2kqp`, where the random suffix is a hint that identity does not matter.",
   "A StatefulSet is for replicas that need a stable identity. Its Pods get predictable, ordinal names such as `db-0`, `db-1` and `db-2`, start in order and stop in reverse order by default, and each can get its own PersistentVolumeClaim through `volumeClaimTemplates`, so `db-1` always reattaches to the same storage after a restart. It normally works with a headless Service (one with `clusterIP: None`) named in the StatefulSet's `serviceName`, which gives each Pod a stable Domain Name System (DNS) name like `db-0.db.default.svc.cluster.local`. Use it for databases, message queues and clustered systems where members must be told apart and must keep their own data.",
   "A DaemonSet runs one copy of a Pod on every node, or on every node that matches a node selector or affinity rule. As nodes join the cluster they automatically get the Pod, and when nodes leave, their copies are cleaned up. Typical uses are node-level agents: log collectors that read files from each host, monitoring exporters, and network or storage plugins. You do not set a replica count, because the number of eligible nodes decides it. If you see a requirement such as \"one per node\" or \"on every node, including new ones\", the answer is a DaemonSet.",
   "Jobs and CronJobs cover work that is meant to finish. A Job runs Pods until a task completes successfully, then stops creating new ones. It is for batch work such as a database migration, a report or a data import, and it retries failed Pods up to a limit. A CronJob creates Jobs on a repeating schedule, like the Unix cron utility, for nightly backups or hourly cleanups. Jobs and CronJobs must use `restartPolicy: Never` or `OnFailure` in their Pod template, never `Always`, because a Pod that always restarts would never be seen as finished.",
   "A bare Pod still has a place. It is fine for quick, disposable things: a temporary busybox Pod to test DNS resolution, a one-off `curl` against a Service, or an interactive debugging session that you delete when you are done. For anything that should keep running, survive a node failure or be scaled, wrap it in a controller.",
   "```bash\nkubectl create deployment web --image=nginx --replicas=3\nkubectl create job migrate --image=busybox -- echo done\nkubectl create cronjob tidy --image=busybox --schedule=\"0 * * * *\" -- echo tidy\nkubectl run tmp --image=busybox --rm -it --restart=Never -- sh\n```",
   "Notice that kubectl has `create` generators for Deployments, Jobs and CronJobs, but not for StatefulSets or DaemonSets. For those, a common exam technique is to generate a Deployment with `--dry-run=client -o yaml`, save it to a file, change the `kind`, and remove fields that do not apply. A DaemonSet has no `replicas` or `strategy` field of the Deployment kind (it has its own `updateStrategy`). A StatefulSet normally sets `serviceName` to its headless Service and may add `volumeClaimTemplates`. Delete the `status: {}` and empty `resources: {}` lines while you are there to keep the file tidy, then apply it and check the result with `kubectl get ds,sts`.",
   "When you read a scenario, translate it into one question: what happens if this Pod disappears? If any replacement will do, use a Deployment. If the replacement must have the same name and data, use a StatefulSet. If the Pod must exist on each node, use a DaemonSet. If the work ends and should not restart, use a Job, and if it repeats on a clock, use a CronJob."
  ],
  "analogy": "Think of a hotel. Deployment Pods are interchangeable front-desk staff: if one goes home, any trained clerk can cover. StatefulSet Pods are guests with fixed room numbers and their own luggage that stays in their room. A DaemonSet is one fire warden per floor, added automatically when a new floor opens. A Job is a painter hired to finish one hallway, and a CronJob is the cleaning crew booked every night. The analogy ends with scaling: hotels hire slowly, while a Deployment can add replicas in seconds.",
  "terms": [
   [
    "Deployment",
    "Controller for stateless, interchangeable replicas with rolling updates and rollback."
   ],
   [
    "StatefulSet",
    "Controller giving each replica a stable name, ordered start-up and its own persistent storage."
   ],
   [
    "Headless Service",
    "A Service with clusterIP: None that gives each StatefulSet Pod its own stable DNS name."
   ],
   [
    "DaemonSet",
    "Controller that runs one Pod per eligible node."
   ],
   [
    "Job / CronJob",
    "Controllers for run-to-completion work, once or on a schedule."
   ],
   [
    "Bare Pod",
    "A Pod created directly, with no controller to replace it if it is deleted or its node fails."
   ]
  ],
  "example": "A shop runs its storefront as a Deployment with five replicas, its PostgreSQL cluster as a StatefulSet with per-replica volumes, a log shipper as a DaemonSet on every node, and a nightly sales report as a CronJob. When a developer needs to check whether the storefront Service resolves, they start a throwaway busybox Pod with `--rm -it --restart=Never` and let it delete itself afterward.",
  "mistakes": [
   [
    "Choosing a Deployment with a PersistentVolumeClaim for a clustered database.",
    "All replicas would share one claim and get random names. Databases that need per-member identity and storage belong in a StatefulSet with volumeClaimTemplates."
   ],
   [
    "Using a Deployment with replicas equal to the node count to run an agent on every node.",
    "Replicas can land on the same node and new nodes are not covered. A DaemonSet guarantees one Pod per eligible node automatically."
   ],
   [
    "Setting restartPolicy: Always on a Job's Pod template.",
    "Jobs only accept Never or OnFailure; Always would prevent the Pod from ever counting as completed."
   ],
   [
    "Believing a bare Pod restarts somewhere else if its node fails.",
    "The kubelet can restart containers inside an existing Pod, but nothing recreates a deleted Pod or moves it off a dead node without a controller."
   ]
  ],
  "tryit": [
   [
    "A team has four pieces of work: a REST API that must scale with traffic, a Kafka-style broker cluster where each member keeps its own log on disk, a security scanner that must inspect every node's filesystem, and a one-time script that backfills old records. Which workload fits each?",
    "API: Deployment (stateless, scalable). Broker cluster: StatefulSet (stable identity and per-member storage, with a headless Service). Scanner: DaemonSet (one per node, including new nodes). Backfill script: Job (runs to completion once)."
   ],
   [
    "The exam asks you to create a DaemonSet named node-agent with image busybox that runs `sleep 3600`, and kubectl has no `create daemonset`. What is the fastest route?",
    "Run `kubectl create deployment node-agent --image=busybox --dry-run=client -o yaml -- sleep 3600 > ds.yaml`, change `kind: Deployment` to `kind: DaemonSet`, delete `replicas` and `strategy` (and `status`), then `kubectl apply -f ds.yaml` and verify with `kubectl get ds`."
   ]
  ],
  "tip": "Look for the clue words: 'one per node' means DaemonSet, 'stable identity or ordered' means StatefulSet, 'runs to completion' means Job, 'on a schedule' means CronJob, and 'scalable stateless app' means Deployment.",
  "check": [
   [
    "Which workload should run a node monitoring agent on every node, including new ones?",
    "A DaemonSet, because it schedules one Pod per eligible node automatically."
   ],
   [
    "Why is a bare Pod a poor choice for a long-running service?",
    "Nothing recreates it if it is deleted or its node fails; a controller such as a Deployment would replace it."
   ],
   [
    "What restartPolicy values are valid for a Job's Pods?",
    "Never or OnFailure; Always is not allowed for Jobs."
   ],
   [
    "What gives StatefulSet Pods stable per-Pod DNS names?",
    "A headless Service (clusterIP: None) referenced by the StatefulSet's serviceName."
   ]
  ]
 },
 {
  "t": "Jobs: completions, parallelism, backoffLimit, activeDeadlineSeconds, restartPolicy Never/OnFailure",
  "hook": "Every month-end at Silver Pine Insurance, a batch Job recalculates premiums for 12 regional files. Last month, Aisha on the data team watched it run one file at a time for three hours, then fail on file nine because a flaky network call exhausted its retries, and nobody could find the logs from the earlier failed attempts. This month her manager has two demands: finish in under an hour without overwhelming the cluster, and never let it run past the overnight window. Aisha opens the Job manifest. Somewhere in five short fields lies the answer to speed, retries, time limits and visible logs. Which values would you set?",
  "simple": "A Job is Kubernetes' way of running a task that should finish, such as processing a batch of files, rather than a server that runs forever. You tell the Job how many successful runs you need (completions) and how many can work at the same time (parallelism), like saying \"I need 12 pizzas made, and I have 3 ovens.\" You also set how many times to retry when something fails (backoffLimit) and a total time limit for the whole thing (activeDeadlineSeconds), like a kitchen that closes at midnight no matter what. Finally, you choose whether a failed attempt gets a fresh worker each time (Never) or the same worker tries again (OnFailure).",
  "body": [
   "A Job creates one or more Pods and tracks how many finish successfully. When the required number of successes is reached, the Job is marked complete and no new Pods are started. Completed Pods are kept, showing Completed status, so you can read their logs afterward, until the Job is deleted or removed automatically by `ttlSecondsAfterFinished` if you set it. The fields that control this behavior are few, but the Certified Kubernetes Application Developer (CKAD) exam expects you to know what each does, its default, and how they interact.",
   "Start with the two fields that shape the work. `completions` is how many successful Pod runs the Job needs; it defaults to 1. `parallelism` is how many Pods may run at the same time; it also defaults to 1. With `completions: 6` and `parallelism: 2`, the Job runs two Pods at a time until six have succeeded, so you see waves of two in `kubectl get pods`. The controller never starts more Pods than are still needed, so near the end you may see only one running. If you set parallelism but leave completions unset, you get a work-queue style Job: the Pods coordinate among themselves, for example by pulling items from a queue, and the Job completes once at least one Pod succeeds and all Pods have finished.",
   "Next come the two fields that limit failure. `backoffLimit` is the number of retries before the Job is marked Failed; the default is 6. Failed Pods are retried with an increasing delay, known as exponential back-off, so a dependency that is briefly down gets time to recover. `activeDeadlineSeconds` is a hard time limit for the whole Job, counted from when it starts. Once it passes, Kubernetes terminates the running Pods and marks the Job Failed with the reason `DeadlineExceeded`. The deadline takes precedence over backoffLimit, so a Job can fail on time even if it still had retries left. In `kubectl describe job` you will see a condition with reason `BackoffLimitExceeded` or `DeadlineExceeded`, which tells you which limit stopped it.",
   "The Pod template's `restartPolicy` must be `Never` or `OnFailure`, and the choice changes what you see while troubleshooting. With `Never`, a failed container leaves a failed Pod behind and the Job controller creates a brand-new Pod for each retry, so `kubectl get pods` shows several Pods with Error status and you can inspect each one's logs separately. With `OnFailure`, the kubelet restarts the container inside the same Pod, so you see one Pod with a rising RESTARTS count. Earlier attempts' logs are then harder to reach; `kubectl logs --previous` shows only the last terminated container. Choose Never when you want an easy audit trail of every attempt.",
   "```yaml\napiVersion: batch/v1\nkind: Job\nmetadata:\n  name: crunch\nspec:\n  completions: 6\n  parallelism: 2\n  backoffLimit: 3\n  activeDeadlineSeconds: 120\n  template:\n    spec:\n      restartPolicy: Never\n      containers:\n      - name: worker\n        image: busybox\n        command: [\"sh\", \"-c\", \"echo working; sleep 5\"]\n```",
   "Notice where each field lives in that manifest. `completions`, `parallelism`, `backoffLimit` and `activeDeadlineSeconds` sit in the Job's own `spec`, while `restartPolicy` sits in the Pod template's `spec`, one level deeper. Putting restartPolicy at the Job level, or the Job fields inside the template, is a common reason a manifest is rejected or silently ignored. If you are unsure, `kubectl explain job.spec` lists the valid fields at that level.",
   "To build a Job quickly, generate a starting point with `kubectl create job crunch --image=busybox --dry-run=client -o yaml -- sh -c 'echo working; sleep 5' > job.yaml`, then add the extra fields by hand. The generator sets `restartPolicy: Never` for you. Watch progress with `kubectl get job crunch`, whose COMPLETIONS column shows something like `4/6`, and `kubectl get pods -w` to see Pods appear and finish. The Job adds a `job-name=crunch` label to its Pods, so `kubectl logs -l job-name=crunch` gathers their output in one command, which is handy when there are several.",
   "Finally, remember that a Job's Pod template cannot be changed after creation, and most behavior fields are fixed too. If you need different settings, delete the Job (which also deletes its Pods by default) and create it again from your edited file. On the exam, keeping the YAML file you generated makes this a ten-second fix rather than a rewrite."
  ],
  "analogy": "Picture a bakery order for six cakes with two ovens. Completions is the six cakes, parallelism is the two ovens, backoffLimit is how many burnt cakes the baker tolerates before giving up, and activeDeadlineSeconds is closing time, which ends the order even if retries remain. restartPolicy Never means a burnt cake goes on the counter and a fresh tin is used; OnFailure means scraping the same tin and trying again. The analogy stops at work queues, where the cakes decide among themselves when the order is done.",
  "terms": [
   [
    "completions",
    "Number of successful Pod runs required for the Job to finish (default 1)."
   ],
   [
    "parallelism",
    "Maximum number of the Job's Pods running at once (default 1)."
   ],
   [
    "backoffLimit",
    "Number of retries before the Job is marked Failed (default 6)."
   ],
   [
    "activeDeadlineSeconds",
    "Maximum run time for the whole Job, after which its Pods are stopped and it fails with DeadlineExceeded."
   ],
   [
    "ttlSecondsAfterFinished",
    "Optional field that deletes a finished Job and its Pods after the given number of seconds."
   ],
   [
    "job-name label",
    "Label the Job controller adds to its Pods, useful for selecting their logs."
   ]
  ],
  "example": "A thumbnail generator must process 20 batches but the cluster can only spare capacity for four at once. The team sets `completions: 20`, `parallelism: 4`, `backoffLimit: 4` and `activeDeadlineSeconds: 1800`, with `restartPolicy: Never` so each failed attempt leaves its own Pod and logs. The work finishes in waves of four and never runs past half an hour.",
  "mistakes": [
   [
    "Thinking parallelism is the total number of Pods the Job will create.",
    "Parallelism only caps how many run at once. Completions sets how many must succeed, and retries can add more Pods on top."
   ],
   [
    "Assuming a Job always uses all its backoffLimit retries before failing.",
    "activeDeadlineSeconds takes precedence. When the deadline passes, the Job fails with DeadlineExceeded even if retries remain."
   ],
   [
    "Putting restartPolicy in the Job spec next to completions.",
    "restartPolicy belongs in the Pod template spec (spec.template.spec), and it must be Never or OnFailure."
   ],
   [
    "Editing a running Job's image with kubectl edit to fix it.",
    "The Pod template is immutable after creation. Delete the Job and recreate it from an updated manifest."
   ]
  ],
  "tryit": [
   [
    "A Job must process 9 files, run no more than 3 Pods at a time, give up after 2 retries, and never run longer than 10 minutes. The team also wants every failed attempt's logs kept in its own Pod. Which values do you set?",
    "completions: 9, parallelism: 3, backoffLimit: 2, activeDeadlineSeconds: 600, and restartPolicy: Never in the Pod template, so each retry creates a new Pod whose logs stay available."
   ],
   [
    "`kubectl get pods` shows one Pod for your Job with RESTARTS 5 and status CrashLoopBackOff, and you cannot see the first error message. What restartPolicy is in use, and how would you change the setup to keep every attempt's logs?",
    "OnFailure, because the same Pod restarts its container. Switch the template to restartPolicy: Never (by recreating the Job) so each failure leaves a separate Pod you can run kubectl logs against."
   ]
  ],
  "tip": "Know the defaults (completions 1, parallelism 1, backoffLimit 6) and that activeDeadlineSeconds wins over backoffLimit. Also remember Never gives new Pods on retry while OnFailure restarts the same Pod.",
  "check": [
   [
    "A Job has completions 5 and parallelism 2. What is the most Pods running at once?",
    "Two; parallelism caps concurrent Pods while the Job works toward five successes."
   ],
   [
    "A Job fails with reason DeadlineExceeded. Which field caused it?",
    "activeDeadlineSeconds, the overall time limit for the Job."
   ],
   [
    "How do retries differ between restartPolicy Never and OnFailure?",
    "Never creates a new Pod for each retry; OnFailure restarts the container within the same Pod."
   ],
   [
    "How can you view the logs of all Pods belonging to a Job named crunch at once?",
    "`kubectl logs -l job-name=crunch`, using the label the Job adds to its Pods."
   ]
  ]
 },
 {
  "t": "CronJobs: schedule syntax, concurrencyPolicy, history limits, running a job manually from a CronJob",
  "hook": "Owen runs the reporting platform at Maple Street Clinics. A CronJob builds the appointment summary every ten minutes, and on busy Mondays each run takes about fifteen. This morning the dashboard shows duplicate rows, the database is locked, and `kubectl get jobs` lists a pile of overlapping runs. To make it worse, a teammate changed the schedule last night to `0 */2 * * *` thinking it meant \"every two minutes\", and nobody can test the fix without waiting for the next scheduled run. Owen needs to stop the overlap, fix the schedule, keep only a little history, and prove it works right now. Which fields and commands get him there?",
  "simple": "A CronJob is an alarm clock for tasks. You give it a time pattern, and each time the alarm rings it starts a Job, which runs your task until it finishes. The time pattern has five slots: minute, hour, day of the month, month, and day of the week, with a star meaning \"any\". You also decide what happens if the alarm rings while the last task is still running: let both run, skip the new one, or stop the old one and start fresh. You can choose how many old finished runs to keep around for checking later. And you do not have to wait for the alarm: you can press a \"run now\" button that starts the same task immediately.",
  "body": [
   "A CronJob creates a Job on a repeating schedule. It lives in the `batch/v1` Application Programming Interface (API) group, and its spec wraps a `jobTemplate`, which in turn wraps the familiar Pod template. So a CronJob manifest has three nested levels: CronJob spec, Job spec, Pod spec. Knowing which field lives at which level is half the battle on the Certified Kubernetes Application Developer (CKAD) exam, because a field placed one level too high or too low is either rejected or ignored.",
   "The `schedule` field uses standard five-field cron syntax: minute, hour, day of month, month, day of week. A star means every value, a step like `*/5` means every fifth value, a range like `1-5` covers several values, and a comma list like `1,15` picks specific ones. So `*/5 * * * *` means every five minutes, `0 2 * * *` means 02:00 every day, `0 */2 * * *` means on the hour every two hours, and `30 9 * * 1-5` means 09:30 Monday to Friday (day of week 0 is Sunday). Schedules are evaluated in the time zone of the kube-controller-manager unless you set the optional `timeZone` field with a time zone name such as `America/New_York`. Put quotes around the schedule in YAML and on the command line so the shell does not expand the asterisks as file wildcards and the YAML parser does not misread them.",
   "`concurrencyPolicy` decides what happens when a new run is due while the previous Job is still running. `Allow`, the default, lets them overlap, so slow runs can stack up. `Forbid` skips the new run entirely and waits for the next scheduled time. `Replace` cancels the running Job and starts the new one in its place. Choose Forbid for work that must not run twice at once, such as a backup writing to the same file or a report writing to the same table. Choose Replace when only the freshest run matters, such as a cache refresh where an old, stuck run is worthless.",
   "Several more fields tune history and timing. `successfulJobsHistoryLimit` (default 3) and `failedJobsHistoryLimit` (default 1) control how many finished Jobs, and their Pods, are kept so you can inspect them with `kubectl logs`. Setting a limit to 0 removes finished Jobs straight away, which keeps the namespace tidy but leaves nothing to debug. `startingDeadlineSeconds` sets how late a missed run may still start, for example after the controller was briefly unavailable; if the controller cannot start it within that window, the run is skipped and counted as missed. `suspend: true` pauses future runs without deleting the CronJob or its history, and setting it back to false resumes the schedule.",
   "```yaml\napiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: backup\nspec:\n  schedule: \"0 2 * * *\"\n  concurrencyPolicy: Forbid\n  successfulJobsHistoryLimit: 2\n  failedJobsHistoryLimit: 1\n  jobTemplate:\n    spec:\n      backoffLimit: 2\n      template:\n        spec:\n          restartPolicy: OnFailure\n          containers:\n          - name: backup\n            image: busybox\n            command: [\"sh\", \"-c\", \"echo backing up\"]\n```",
   "Trace the levels in that example. `schedule`, `concurrencyPolicy` and the history limits belong to the CronJob spec. `backoffLimit` belongs to the Job spec inside `jobTemplate`. `restartPolicy` and `containers` belong to the Pod spec inside `template`. If you ever lose track, `kubectl explain cronjob.spec.jobTemplate.spec.template.spec` walks you down to the innermost level.",
   "Generate the skeleton quickly with `kubectl create cronjob backup --image=busybox --schedule=\"0 2 * * *\" --dry-run=client -o yaml -- sh -c 'echo backing up'`, save it to a file, and add the extra fields. To test it without waiting for the schedule, create a Job from its template: `kubectl create job backup-manual --from=cronjob/backup`. That Job runs immediately using exactly the same spec, so if it succeeds you know the scheduled runs will behave the same way. This is the standard way to prove a CronJob works, both at work and in exam tasks that ask you to \"trigger\" or \"run\" a CronJob once.",
   "Check what has happened with `kubectl get cronjob backup`, which shows SCHEDULE, SUSPEND, ACTIVE and LAST SCHEDULE columns, then `kubectl get jobs` to see the Jobs it created (their names start with the CronJob name followed by a number), and `kubectl describe cronjob backup`, whose events list each Job it created, each one it deleted to honor the history limits, and any missed schedules. Reading those events is usually the fastest way to tell whether a problem is the schedule, the concurrency policy, or the task itself."
  ],
  "analogy": "A CronJob is like a recurring calendar invite for a meeting room. The schedule is the recurrence rule, the jobTemplate is the meeting agenda copied into each instance, and concurrencyPolicy decides what happens if last week's meeting is still running when this week's starts: share the room (Allow), cancel the new one (Forbid), or end the old one (Replace). Creating a Job from the CronJob is calling an ad hoc meeting with the same agenda. The analogy stops at history limits: calendars keep every past meeting, while CronJobs delete old Jobs beyond the limit.",
  "mnemonic": "The five cron fields in order: \"Mighty Hawks Dive Mostly Westward\" for Minute, Hour, Day of month, Month, Weekday (day of week).",
  "terms": [
   [
    "schedule",
    "Five-field cron expression: minute, hour, day of month, month, day of week."
   ],
   [
    "concurrencyPolicy",
    "Allow, Forbid or Replace: what to do if a run is due while the previous one is still active."
   ],
   [
    "History limits",
    "successfulJobsHistoryLimit (default 3) and failedJobsHistoryLimit (default 1), the number of finished Jobs kept."
   ],
   [
    "startingDeadlineSeconds",
    "How late a missed run may still start before it is skipped."
   ],
   [
    "suspend",
    "Boolean that pauses future runs without deleting the CronJob."
   ],
   [
    "jobTemplate",
    "The Job specification that the CronJob stamps out for each run."
   ]
  ],
  "example": "A report CronJob scheduled every 10 minutes sometimes takes 15 minutes, causing two copies to fight over the same output table. Setting `concurrencyPolicy: Forbid` makes the controller skip a run while one is active, `successfulJobsHistoryLimit: 1` keeps the namespace tidy, and `kubectl create job report-test --from=cronjob/report` lets the developer test changes on demand instead of waiting for the next slot.",
  "mistakes": [
   [
    "Reading `0 */2 * * *` as every two minutes.",
    "The step is in the hour field, so it runs at minute 0 every two hours. Every two minutes is `*/2 * * * *`."
   ],
   [
    "Believing Forbid queues the skipped run until the current one finishes.",
    "Forbid skips that run entirely; the next attempt is the next scheduled time."
   ],
   [
    "Putting restartPolicy or backoffLimit directly under the CronJob spec.",
    "backoffLimit belongs in jobTemplate.spec and restartPolicy in jobTemplate.spec.template.spec."
   ],
   [
    "Trying `kubectl run` or editing the schedule to test a CronJob now.",
    "Use `kubectl create job <name> --from=cronjob/<cronjob>`, which runs the exact same template immediately without touching the schedule."
   ]
  ],
  "tryit": [
   [
    "A cache-warming CronJob runs every 5 minutes. Occasionally a run hangs for 20 minutes, and when that happens the team wants the stale run killed so a fresh one can start. They also want to keep only the last successful Job but the last three failed ones. Which settings do you choose?",
    "concurrencyPolicy: Replace (cancel the running Job and start the new one), successfulJobsHistoryLimit: 1, failedJobsHistoryLimit: 3, and schedule: \"*/5 * * * *\"."
   ],
   [
    "A task says: create a CronJob named audit that runs at 23:45 every Sunday, then run it once immediately to check it. What do you type?",
    "`kubectl create cronjob audit --image=<image> --schedule=\"45 23 * * 0\" -- <command>` and then `kubectl create job audit-now --from=cronjob/audit`, followed by `kubectl get jobs` and `kubectl logs job/audit-now` to confirm."
   ]
  ],
  "tip": "The command to trigger a CronJob by hand is `kubectl create job <new-name> --from=cronjob/<cronjob-name>`. Also remember that restartPolicy sits in the innermost Pod template, two levels below the schedule.",
  "check": [
   [
    "What does the schedule `*/15 * * * *` mean?",
    "Run every 15 minutes."
   ],
   [
    "Which concurrencyPolicy stops the old Job and starts the new one?",
    "Replace. Forbid skips the new run and Allow runs both."
   ],
   [
    "How do you run a CronJob's work immediately?",
    "Create a Job from it: `kubectl create job <name> --from=cronjob/<cronjob>`."
   ],
   [
    "What are the default history limits for successful and failed Jobs?",
    "successfulJobsHistoryLimit 3 and failedJobsHistoryLimit 1."
   ]
  ]
 },
 {
  "t": "Multi-container patterns: init containers, sidecars (including native sidecars with restartPolicy: Always), adapter and ambassador",
  "hook": "Kenji maintains a legacy billing app at Riverbend Utilities that writes logs only to a file and crashes if the database is not reachable at start-up. He moved it into a Kubernetes Job for the nightly invoice run, added a second container to ship the log file, and went home. At 6 a.m. the Job still shows Running, hours after the invoices finished, because the log shipper never exits. On some nights the app also crashes before the database Service is ready. His team lead asks for a fix that keeps the app image unchanged. Which helper containers should Kenji add, where in the Pod spec do they go, and how does Kubernetes know when to stop them?",
  "simple": "A Pod can hold more than one container, a bit like a food truck with a main cook and a few helpers who share the same truck and supplies. Some helpers do a job before the cook starts and then leave, such as unlocking the truck or stocking ingredients. These are init containers. Other helpers stay the whole shift beside the cook, such as someone taking orders or sweeping up. These are sidecars. A newer kind of sidecar starts before the cook and leaves right after the cook finishes, so the truck can close on time. Two special sidecar jobs have names: an adapter translates the cook's output into a standard format, and an ambassador handles trips to outside suppliers for the cook.",
  "body": [
   "A Pod can hold several containers. They share the same network namespace, so they reach each other on `localhost`, and they can share volumes, so one container can write files that another reads. That makes it natural to split helper duties into separate containers instead of stuffing them into your application image, which keeps each image small and focused and lets different teams own different parts. The Certified Kubernetes Application Developer (CKAD) curriculum expects you to know the patterns built on this idea: init containers, sidecars, adapters and ambassadors, and how to troubleshoot them.",
   "Init containers come first, in both the spec and the timeline. They are listed under `spec.initContainers`. They run one at a time, in the listed order, before any regular container starts, and each must exit successfully before the next begins. If one fails, the kubelet retries it according to the Pod's restartPolicy, and the Pod's status shows values such as `Init:0/2` (none of two finished), `Init:Error` or `Init:CrashLoopBackOff`. Use them to wait for a dependency, for example looping on `nslookup db-service` until the Service's Domain Name System (DNS) name resolves, to download or render configuration into a shared emptyDir, or to fix permissions on a volume. Because they finish before the app starts, they can contain tools you do not want in the main image, such as a Git client or a templating utility.",
   "A sidecar is a helper that runs alongside the main container for the Pod's whole life: shipping logs, refreshing certificates, or syncing files from a Git repository. The traditional way is to add a second entry under `containers`. The drawback is that Kubernetes treats all regular containers as equals. Start-up order is not guaranteed, so the app may write log lines before the shipper is ready. Worse, in a Job the Pod only completes when every regular container exits, so a sidecar that runs forever keeps the Pod, and the Job, running long after the real work is done.",
   "Native sidecars fix this. You declare the helper under `initContainers` but give that container its own `restartPolicy: Always`. Kubernetes starts it in init order, but does not wait for it to exit before moving on; it only waits for it to start. It keeps the sidecar running, restarting it if it dies, while the main containers run, and stops it after they finish. That means a log shipper is up before your app writes its first line, and a Job completes normally when the main container exits. In `kubectl get pods`, the READY column counts native sidecars along with the main containers, so a Pod with one app container and one native sidecar shows `2/2` when healthy.",
   "```yaml\nspec:\n  initContainers:\n  - name: log-shipper\n    image: busybox\n    restartPolicy: Always\n    command: [\"sh\", \"-c\", \"tail -F /var/log/app/app.log\"]\n    volumeMounts:\n    - {name: logs, mountPath: /var/log/app}\n  containers:\n  - name: app\n    image: busybox\n    command: [\"sh\", \"-c\", \"while true; do date >> /var/log/app/app.log; sleep 2; done\"]\n    volumeMounts:\n    - {name: logs, mountPath: /var/log/app}\n  volumes:\n  - name: logs\n    emptyDir: {}\n```",
   "In that example, the shared `logs` emptyDir is the bridge. The app appends lines to a file; the native sidecar tails the same file to its own standard output, where `kubectl logs` and the cluster's log collector can read it. Note that `restartPolicy: Always` here is set on the individual init container, not on the Pod, which is what turns an ordinary init container into a native sidecar.",
   "Adapters and ambassadors are sidecars named for the job they do. An adapter container transforms the main container's output into a standard form, for example converting an application's custom log format or status page into a format a monitoring system understands, so the monitoring side can treat every app the same way. An ambassador container is a local proxy that represents an outside service: the app connects to `localhost:6379`, and the ambassador forwards to the right Redis endpoint, handling discovery, Transport Layer Security (TLS) or sharding so the app code stays simple. A simple way to remember the difference: adapters change what goes out, while ambassadors broker connections to the outside.",
   "Troubleshooting multi-container Pods mostly means naming the container. Add `-c` to target one: `kubectl logs mypod -c log-shipper` or `kubectl exec -it mypod -c app -- sh`. Without `-c`, kubectl picks a default container and tells you so. `kubectl describe pod` lists init containers and regular containers in separate sections, each with its state, exit code and restart count. If a Pod is stuck in an `Init:` status, the regular containers have not even started yet, so look at the init container logs first."
  ],
  "analogy": "Think of a theater production. Init containers are the stage crew who build the set before the doors open and then leave. A regular sidecar is a lighting operator who stays all night but does not know when the show ends, so the theater cannot close. A native sidecar is an usher who arrives before the actors, stays through the show, and leaves when the final bow is done. An adapter is the translator turning the script into subtitles; an ambassador is the agent handling calls to outside venues. The analogy ends at restarts: a crashed usher is replaced instantly.",
  "terms": [
   [
    "Init container",
    "A container that runs to completion, in order, before the app containers start."
   ],
   [
    "Sidecar",
    "A helper container that runs alongside the main container for the Pod's lifetime."
   ],
   [
    "Native sidecar",
    "An init container with its own restartPolicy: Always, started before and stopped after the main containers."
   ],
   [
    "Adapter",
    "A helper that converts the main container's output to a standard format."
   ],
   [
    "Ambassador",
    "A helper that proxies the app's connections to external services via localhost."
   ],
   [
    "-c flag",
    "kubectl option that selects which container in a Pod a logs or exec command targets."
   ]
  ],
  "example": "A legacy app writes logs only to a file. The team adds a native sidecar that tails the file from a shared emptyDir to standard output, so `kubectl logs pod -c log-shipper` works and the cluster's log collector picks it up, and an init container that loops until the database Service name resolves before the app starts. When the app is run as a nightly Job, the Job now completes on time because the native sidecar is stopped after the app exits.",
  "mistakes": [
   [
    "Setting restartPolicy: Always at the Pod level to create a native sidecar.",
    "The native sidecar setting is restartPolicy: Always on the individual container inside initContainers. The Pod-level restartPolicy is a separate field."
   ],
   [
    "Thinking init containers run in parallel.",
    "They run one at a time in the listed order, each finishing successfully before the next starts (native sidecars only need to start)."
   ],
   [
    "Using a regular sidecar container in a Job and expecting the Job to finish.",
    "The Pod completes only when all regular containers exit, so a never-ending sidecar keeps the Job running. Use a native sidecar."
   ],
   [
    "Mixing up adapter and ambassador.",
    "An adapter reformats the app's outgoing data; an ambassador proxies the app's outbound connections to external services."
   ]
  ],
  "tryit": [
   [
    "A Pod shows status `Init:CrashLoopBackOff`. It has an init container named wait-db and an app container named api. A teammate runs `kubectl logs mypod` and gets an error about the container not being ready. What should you run, and what is the likely cause?",
    "Run `kubectl logs mypod -c wait-db` (and `kubectl describe pod mypod`). The init container is failing repeatedly, so the api container never started; a common cause is that the database Service name is wrong or does not exist, so the wait script exits with an error."
   ],
   [
    "Your app needs to talk to a sharded cache cluster, but its code only supports connecting to one host on localhost. You cannot change the code. Which pattern fits, and why not an adapter?",
    "An ambassador: a helper container listens on localhost and routes each request to the right shard. An adapter reformats the app's output for consumers, which does not solve outbound connection routing."
   ]
  ],
  "tip": "If a Pod is stuck in `Init:` status, the problem is an init container: check it with `kubectl logs <pod> -c <init-name>`. A native sidecar lives under initContainers but has restartPolicy: Always on the container itself.",
  "check": [
   [
    "In what order do init containers run relative to each other and the app?",
    "One at a time in the listed order, each finishing successfully before the next, and all before the app containers start (native sidecars start and keep running)."
   ],
   [
    "Why are native sidecars better than a regular second container in a Job?",
    "They are stopped automatically after the main container exits, so the Job can complete instead of hanging on a still-running helper."
   ],
   [
    "What is the difference between an adapter and an ambassador?",
    "An adapter reformats outgoing data from the app; an ambassador proxies the app's connections to outside services."
   ],
   [
    "How do two containers in the same Pod usually exchange files?",
    "By mounting the same volume, often an emptyDir, at a path in each container."
   ]
  ]
 },
 {
  "t": "Ephemeral volumes: emptyDir (including medium: Memory), configMap/secret/projected volumes",
  "hook": "Lucia supports an image-resizing service at Ridgeway Print Co. Overnight the Pods were evicted twice for using too much memory, even though the code has not changed. The only recent edit was a teammate switching the scratch emptyDir to `medium: Memory` \"for speed\". The same Pods also stopped starting in the staging namespace, stuck in ContainerCreating, after someone renamed a Secret. And the app team wants the ConfigMap, the database password and the Pod's own labels all under one directory, because the app only reads `/etc/app`. Three tickets, one Pod spec. What do each of these volume types really do, and which setting caused which problem?",
  "simple": "Containers forget everything when they restart, like a whiteboard wiped clean. Volumes are storage you attach to a Pod so files can survive container restarts or be shared between containers. Ephemeral volumes last only as long as the Pod itself. An emptyDir is an empty shared folder created when the Pod starts, like a shared scratch desk. You can make it live in memory instead of on disk, which is faster but uses up the Pod's memory allowance. ConfigMap and Secret volumes turn stored settings and passwords into files, one file per setting. A projected volume is a single folder that combines several of those sources, like one binder holding pages from several notebooks.",
  "body": [
   "A container's own writable filesystem is thrown away whenever the container restarts. Volumes give containers storage that is declared at Pod level under `spec.volumes` and attached to each container with `volumeMounts`. Ephemeral volumes live exactly as long as the Pod: they survive container restarts within the Pod but are deleted when the Pod is removed. They are the right tool for scratch space, for sharing files between containers, and for delivering configuration, and the Certified Kubernetes Application Developer (CKAD) exam expects you to write all four common kinds from memory.",
   "`emptyDir` is the simplest. It starts empty when the Pod is assigned to a node and is shared by every container in the Pod that mounts it, which is how init containers and sidecars pass files to the main container. By default it is stored on the node's disk. Setting `medium: Memory` backs it with tmpfs, a filesystem held in Random Access Memory (RAM). That makes it very fast and means the data is never written to disk, which suits scratch space or sensitive temporary files. The trade-off is that the data counts toward the container's memory usage and limit, so a busy memory-backed emptyDir can push a Pod into being out-of-memory killed or evicted. Set `sizeLimit` to cap either kind; a Pod that exceeds the limit can be evicted.",
   "```yaml\nvolumes:\n- name: cache\n  emptyDir:\n    medium: Memory\n    sizeLimit: 64Mi\n- name: settings\n  configMap:\n    name: app-config\n- name: creds\n  secret:\n    secretName: db-secret\n    defaultMode: 0400\n```",
   "ConfigMap and Secret volumes turn stored key-value data into files. A `configMap` volume presents each key of a ConfigMap as a file whose name is the key and whose content is the value, so a key named `app.properties` becomes `/etc/config/app.properties`. A `secret` volume does the same for a Secret, with the values decoded from base64 and stored in tmpfs on the node rather than on disk. Note the field names differ: `configMap.name` but `secret.secretName`, a detail that catches people under time pressure. You can choose particular keys and rename the files with `items` (each with a `key` and a `path`), and set file permissions with `defaultMode`, such as `0400` for read-only by the owner. If you update the ConfigMap or Secret, the mounted files are refreshed after a short delay, unlike environment variables, which are read only at container start. Files mounted with `subPath` do not receive these updates.",
   "A `projected` volume merges several sources into one directory. The sources you need to know are `configMap`, `secret`, `downwardAPI` and `serviceAccountToken`. The downward API source exposes Pod metadata such as labels, annotations or the namespace as files. The service account token source mounts a short-lived token with a chosen audience and expiry, which the kubelet rotates automatically, useful when an app must prove its identity to another service. Projected volumes help when an app expects all its configuration under one path. Inside `projected.sources`, the secret source uses `name`, not `secretName`, so the two spellings differ between a standalone secret volume and a projected one.",
   "```yaml\n- name: all-in-one\n  projected:\n    sources:\n    - configMap:\n        name: app-config\n    - secret:\n        name: db-secret\n    - downwardAPI:\n        items:\n        - path: labels\n          fieldRef:\n            fieldPath: metadata.labels\n```",
   "References matter for start-up. If a ConfigMap or Secret named by a volume does not exist, the Pod cannot mount it and stays in ContainerCreating, and `kubectl describe pod` shows an event such as `MountVolume.SetUp failed ... not found`. You can mark a source `optional: true` if the Pod should start without it. This is the usual explanation when a Pod suddenly stops starting after someone renames or deletes a configuration object.",
   "Choosing between these types comes down to what the data is and who writes it. If containers create the data at run time and it can vanish with the Pod, use an emptyDir, disk-backed by default and memory-backed only when speed or keeping data off disk justifies the memory cost. If the data is configuration you manage as a Kubernetes object, use a configMap or secret volume. If the app needs several of those, plus Pod metadata or an identity token, in a single directory, use a projected volume. None of these survive Pod deletion; for that you need persistent storage, covered separately.",
   "In a lab, verify your work from inside the container. `kubectl exec pod -- ls -l /etc/config` shows one file per key with the permissions you set, and `kubectl exec pod -- df -h /cache` shows the filesystem type and size; a Memory-backed emptyDir appears as tmpfs. `kubectl explain pod.spec.volumes.projected.sources` lists every allowed source if you forget one during the exam."
  ],
  "analogy": "An emptyDir is a shared whiteboard in a meeting room: everyone in the room (the Pod's containers) can write on it, it survives someone stepping out and back (a container restart), and it is wiped when the meeting ends (the Pod is deleted). medium: Memory is writing on a whiteboard that takes space from your personal desk allowance. ConfigMap and Secret volumes are printed handouts, one page per key. A projected volume is one folder holding handouts from several sources. The analogy breaks for updates: handouts usually stay fixed, but mounted ConfigMaps refresh themselves.",
  "terms": [
   [
    "emptyDir",
    "A Pod-lifetime scratch volume, empty at start and shared by the Pod's containers."
   ],
   [
    "medium: Memory",
    "Makes an emptyDir a RAM-backed tmpfs that counts toward memory usage."
   ],
   [
    "sizeLimit",
    "Cap on an emptyDir's size; exceeding it can get the Pod evicted."
   ],
   [
    "configMap / secret volume",
    "Volumes that present each key as a file; the secret volume uses secretName."
   ],
   [
    "Projected volume",
    "A volume that combines configMap, secret, downwardAPI and serviceAccountToken sources in one directory."
   ],
   [
    "Ephemeral volume",
    "Storage whose lifetime is tied to the Pod and is deleted with it."
   ]
  ],
  "example": "An image-processing Pod uses a 256Mi Memory-backed emptyDir as scratch space for fast temporary files, with the container's memory limit raised to leave room for it. It mounts its settings from a ConfigMap at /etc/app, and mounts TLS (Transport Layer Security) keys from a Secret with mode 0400, all declared in the Pod spec.",
  "mistakes": [
   [
    "Assuming a memory-backed emptyDir is free extra space.",
    "Its contents count against the container's memory usage and limit, so filling it can cause an out-of-memory kill or eviction."
   ],
   [
    "Writing `secret: name: db-secret` in a standalone secret volume.",
    "A standalone secret volume uses `secretName`. Only configMap volumes and projected sources use `name`."
   ],
   [
    "Expecting environment variables from a ConfigMap to update when the ConfigMap changes.",
    "Env vars are read at container start. Mounted ConfigMap files (without subPath) refresh after a short delay; env vars need a restart."
   ],
   [
    "Thinking an emptyDir is lost when its container crashes and restarts.",
    "An emptyDir survives container restarts. It is deleted only when the Pod is removed from the node."
   ]
  ],
  "tryit": [
   [
    "An app must read its config file, its API key from a Secret, and the Pod's namespace, and it only looks in one directory, /etc/app. You must not change the app. Which volume type do you use and what sources does it list?",
    "A projected volume mounted at /etc/app with three sources: configMap (name of the ConfigMap), secret (name of the Secret, using `name`), and downwardAPI with an item whose fieldRef is metadata.namespace."
   ],
   [
    "A Pod stays in ContainerCreating. `kubectl describe pod` shows `MountVolume.SetUp failed for volume \"creds\": secret \"db-secret\" not found`. The Secret was renamed to db-credentials yesterday. What are two ways to fix it?",
    "Update the Pod's volume to `secretName: db-credentials` (recreating the Pod, or updating its Deployment), or recreate a Secret named db-secret. If the app can run without it, `optional: true` would also let the Pod start."
   ]
  ],
  "tip": "Secret volumes use `secretName`, not `name`, and projected sources use `name` for both. Also remember env vars do not update when a ConfigMap changes, but mounted files (without subPath) do.",
  "check": [
   [
    "What happens to an emptyDir when its container restarts, and when the Pod is deleted?",
    "It survives a container restart but is deleted with the Pod."
   ],
   [
    "What trade-off comes with `medium: Memory`?",
    "It is fast and not written to disk, but its contents use RAM and count against the container's memory limit."
   ],
   [
    "Name the source types a projected volume can combine.",
    "configMap, secret, downwardAPI and serviceAccountToken."
   ],
   [
    "How do you mount only one key of a ConfigMap under a custom file name?",
    "Use `items` with the key and a `path` for the file name in the configMap volume."
   ]
  ]
 },
 {
  "t": "Persistent storage: PersistentVolume, PersistentVolumeClaim, StorageClass, access modes, dynamic provisioning",
  "hook": "Grace is the only developer on call at Northwind Animal Shelter's small adoption portal when the uploads Pod restarts and every photo volunteers posted that week disappears. The Pod had used an emptyDir. She writes a PersistentVolumeClaim, applies it, and it sits in Pending. Meanwhile her colleague hand-wrote a PersistentVolume that looks perfect, yet the claim will not bind to it. Then someone asks whether deleting the claim later will delete the photos too. Grace has three questions and one morning: why is the claim Pending, why will it not bind to the volume sitting right there, and what happens to the data when the claim goes away?",
  "simple": "Some data must outlive any single Pod, such as uploaded photos or database files. Kubernetes handles this like renting a storage unit. The storage unit itself is a PersistentVolume: real disk space somewhere. Your rental request is a PersistentVolumeClaim: \"I need 5 gigabytes that one machine can write to.\" Kubernetes matches your request to a suitable unit, and your Pod then uses the request by name, not the unit directly. A StorageClass is like a menu of storage types, such as fast or cheap, and with dynamic provisioning the storage company builds a new unit for you automatically when you ask, instead of you waiting for someone to set one up by hand.",
  "body": [
   "Some data must outlive any single Pod: database files, user uploads, anything you cannot lose on a restart or reschedule. Kubernetes separates the storage itself from the request for storage, so developers can ask for space in plain terms without knowing the details of the disk behind it, and cluster administrators can change storage back ends without rewriting application manifests. The Certified Kubernetes Application Developer (CKAD) exam focuses on the developer side: writing claims, mounting them, and figuring out why one will not bind.",
   "Two objects form the core of the model. A PersistentVolume (PV) is a piece of storage in the cluster, such as a cloud disk, a Network File System (NFS) export or a local path, represented as a cluster-scoped object. A PersistentVolumeClaim (PVC) is a namespaced request, for example \"I need 5Gi with ReadWriteOnce access from the standard class\". Kubernetes binds a claim to a PV that satisfies its size, access mode and storage class, and the binding is one-to-one: one claim, one volume. The PV may be larger than requested, and the claim then gets the whole PV. The Pod references the claim by name in its volumes section, never the PV directly, which keeps Pod specs portable between clusters.",
   "```yaml\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: data\nspec:\n  accessModes: [\"ReadWriteOnce\"]\n  resources:\n    requests:\n      storage: 1Gi\n  storageClassName: standard\n---\n# in the Pod spec\nvolumes:\n- name: data\n  persistentVolumeClaim:\n    claimName: data\n```",
   "Access modes describe how the volume can be mounted, and they are a frequent source of exam distractors. ReadWriteOnce (RWO) allows read-write mounting by a single node; several Pods on that same node can share it. ReadOnlyMany (ROX) allows read-only mounting by many nodes. ReadWriteMany (RWX) allows read-write mounting by many nodes and needs storage that supports it, such as NFS; many block-storage disks do not. ReadWriteOncePod (RWOP) restricts read-write access to a single Pod across the whole cluster. A claim only binds to a PV that offers the requested mode, and the mode is about what the storage permits, not a lock enforced on every write.",
   "A StorageClass describes a kind of storage, with a `provisioner` that knows how to create it and `parameters` such as disk type. With dynamic provisioning, you create a PVC that names a StorageClass, and the provisioner automatically creates a matching PV and binds it, so nobody has to pre-create volumes. If the PVC omits `storageClassName`, the cluster's default StorageClass is used, marked with `(default)` in `kubectl get storageclass`. Setting `storageClassName: \"\"` explicitly asks for no class, so only a pre-created PV without a class can bind. Static provisioning, by contrast, means an administrator creates PVs by hand in advance, and claims bind to whichever existing PV matches.",
   "Two StorageClass and PV settings shape the lifecycle. The `reclaimPolicy` says what happens to the PV when its claim is deleted: `Delete` removes the underlying storage, which is the usual default for dynamically provisioned volumes, and `Retain` keeps the PV and its data for manual recovery, leaving it in Released status so it will not bind to a new claim automatically. Some classes use `volumeBindingMode: WaitForFirstConsumer`, which delays provisioning until a Pod that uses the claim is scheduled, so the volume is created in the same zone as the node. Until then the PVC shows Pending, which is normal and not an error; the alternative mode, `Immediate`, provisions as soon as the claim is created.",
   "Troubleshooting starts with `kubectl get pv,pvc`. Look at STATUS: Bound is good, Pending means no matching PV or no working provisioner, and Released means a Retain volume whose claim was deleted. `kubectl describe pvc data` explains why, with events such as `no persistent volumes available for this claim and no storage class is set` or `waiting for first consumer to be created before binding`. A common exam mistake is a mismatch between a hand-written PV and PVC: different `storageClassName` values, an access mode the PV does not offer, or a PV smaller than the request. Compare the three fields side by side and the cause usually jumps out.",
   "Finally, remember that the data's lifetime is tied to the claim, not to Pods. Deleting and recreating a Pod that mounts the same PVC brings the same files back, which is exactly the behavior missing from emptyDir. Deleting the PVC is what triggers the reclaim policy, so treat that command with care in any environment with real data."
  ],
  "analogy": "A PV is a storage unit in a warehouse, a PVC is your rental agreement, and the Pod shows the agreement at the gate rather than knowing the unit number. A StorageClass is the warehouse's menu of unit types, and dynamic provisioning is the warehouse building a unit the moment you sign. The reclaim policy decides whether the unit is emptied (Delete) or locked with your things inside (Retain) when the agreement ends. The analogy is loose on access modes: RWO limits which node can mount the storage, not how many people walk in.",
  "terms": [
   [
    "PersistentVolume (PV)",
    "A cluster-scoped object representing a piece of real storage."
   ],
   [
    "PersistentVolumeClaim (PVC)",
    "A namespaced request for storage that binds one-to-one to a matching PV."
   ],
   [
    "StorageClass",
    "A named type of storage with a provisioner used for dynamic provisioning."
   ],
   [
    "Access mode",
    "RWO, ROX, RWX or RWOP: how many nodes or Pods may mount the volume and whether they can write."
   ],
   [
    "Reclaim policy",
    "Delete or Retain: what happens to a PV's storage after its claim is deleted."
   ],
   [
    "WaitForFirstConsumer",
    "Volume binding mode that delays provisioning until a Pod using the claim is scheduled."
   ]
  ],
  "example": "In minikube, a developer creates a 1Gi RWO PVC with no storageClassName. The default StorageClass provisions a PV automatically, the claim shows Bound, and after deleting and recreating the Pod the files written to the mount are still there. When the developer later deletes the PVC, the PV disappears too, because the class's reclaim policy is Delete.",
  "mistakes": [
   [
    "Pointing the Pod's volume at a PV name.",
    "Pods reference claims with persistentVolumeClaim.claimName. The PV is bound to the claim behind the scenes."
   ],
   [
    "Believing ReadWriteOnce means only one Pod can use the volume.",
    "RWO limits read-write mounting to one node; several Pods on that node can share it. ReadWriteOncePod is the single-Pod mode."
   ],
   [
    "Treating a Pending PVC as always broken.",
    "With WaitForFirstConsumer, a claim stays Pending until a Pod that uses it is scheduled. Check the events before changing anything."
   ],
   [
    "Thinking `storageClassName: \"\"` and omitting the field are the same.",
    "Omitting it uses the default StorageClass; an empty string explicitly asks for no class, so only a classless PV can bind."
   ]
  ],
  "tryit": [
   [
    "An administrator created a PV with capacity 2Gi, accessModes ReadWriteMany and storageClassName manual. Your PVC requests 1Gi, ReadWriteOnce, with no storageClassName, and the cluster has a default class called standard. The PVC never binds to that PV. Why, and what would you change?",
    "With no storageClassName, the PVC gets the default class standard, which does not match manual, and the access mode RWO is not offered by a PV that lists only RWX. Set `storageClassName: manual` and request `ReadWriteMany` (the 2Gi capacity already covers 1Gi)."
   ],
   [
    "Your team stores invoices on a dynamically provisioned volume. Finance asks that the data survive even if someone accidentally deletes the PVC. Which setting addresses this, and what extra step would recovery need?",
    "Use a StorageClass (or PV) with reclaimPolicy Retain. After the claim is deleted the PV moves to Released with the data intact, and an administrator must manually clean up its claim reference or create a new PV pointing at the same storage before a new claim can use it."
   ]
  ],
  "tip": "Pods reference PVCs, not PVs. For a static PV and PVC to bind, storageClassName, access mode and capacity (PV at least as large as the request) must all be compatible.",
  "check": [
   [
    "Which object is namespaced: PV or PVC?",
    "The PVC is namespaced; the PV is cluster-scoped."
   ],
   [
    "What does ReadWriteOnce actually restrict?",
    "Read-write mounting to a single node; Pods on that same node can share it. ReadWriteOncePod restricts it to one Pod."
   ],
   [
    "A PVC is Pending and its StorageClass uses WaitForFirstConsumer. Is something broken?",
    "Not necessarily; provisioning waits until a Pod that uses the claim is scheduled."
   ],
   [
    "What happens to a dynamically provisioned PV with reclaimPolicy Delete when its PVC is deleted?",
    "The PV and its underlying storage are deleted."
   ]
  ]
 },
 {
  "t": "Mounting volumes with volumeMounts, mountPath, subPath and readOnly",
  "hook": "Marcus at Cedar Hollow Library wants to change one setting in the catalog site's nginx config. He creates a ConfigMap with a new `default.conf`, mounts it at `/etc/nginx/conf.d`, and rolls out the change. The site comes back up, but the separate gzip and caching settings that lived in other files in that folder have vanished, and page loads are suddenly slower. He fixes it with a single-file mount, and that works, until a week later he edits the ConfigMap and nothing changes in the running Pods. A security reviewer then asks why the web server can write to its own config at all. What do mountPath, subPath and readOnly actually do?",
  "simple": "Declaring a volume in a Pod is like having a box of files in the building. To use it, each container must say where to put that box inside its own filing cabinet: that place is the mount path. If you put the box in a drawer that already holds papers, the box covers them up and you can no longer see the old papers. A subPath lets you take just one file out of the box and slip it into the drawer next to the existing papers instead. The catch is that this single file is a copy that does not get later changes. Marking a mount read-only is like putting the files behind glass: the container can read them but cannot change them.",
  "body": [
   "Declaring a volume under `spec.volumes` only makes it available to the Pod. Each container that needs it must also list it under its own `volumeMounts`, linking the volume's `name` to a `mountPath` inside that container. Containers that do not list a volume cannot see it at all. Two containers can mount the same volume at different paths, which is how a sidecar and an application share files. This two-part structure, Pod-level volumes and container-level mounts, is something the Certified Kubernetes Application Developer (CKAD) exam tests constantly, often by giving you a Pod with one half missing.",
   "The details of each mount matter. The `name` in `volumeMounts` must match a name under `volumes` exactly; a typo gets the Pod rejected with a validation error such as `volumeMounts[0].name: Not found`. The `mountPath` must be an absolute path. If the directory already exists in the image, the volume hides its original contents for as long as it is mounted, because the mount sits on top of the directory rather than merging with it. Mounting a ConfigMap at `/etc` would hide everything else in `/etc`, including files the operating system needs, a classic mistake that can stop a container from working at all.",
   "`subPath` is the tool for avoiding that hiding problem. It mounts a single file or subdirectory from within the volume instead of the whole volume. You can place one config file into an existing directory without covering its neighbors, by setting `mountPath` to the full file path and `subPath` to the key or file name inside the volume. It also lets several containers, or several mounts, use different subdirectories of one volume, for example one PersistentVolumeClaim holding both `html/` and `logs/`. `subPathExpr` does the same but can include environment variables in the form `$(VAR_NAME)`, for example to create a per-Pod directory using the Pod name exposed through the downward API.",
   "```yaml\ncontainers:\n- name: web\n  image: nginx\n  volumeMounts:\n  - name: site-config\n    mountPath: /etc/nginx/conf.d/default.conf\n    subPath: default.conf\n    readOnly: true\n  - name: content\n    mountPath: /usr/share/nginx/html\nvolumes:\n- name: site-config\n  configMap:\n    name: nginx-conf\n- name: content\n  persistentVolumeClaim:\n    claimName: web-content\n```",
   "Read the example carefully. The `site-config` mount targets a file path, not a directory, and `subPath: default.conf` picks the `default.conf` key from the ConfigMap. The rest of `/etc/nginx/conf.d` in the image stays visible. The `content` mount places the whole PersistentVolumeClaim at the nginx document root, replacing the default welcome page with the team's content, which is the intended effect there.",
   "Be aware of a trade-off with subPath. Files mounted through `subPath` from a ConfigMap or Secret do not receive updates when the source object changes, because the kubelet sets them up once when the container starts. To pick up changes, the Pod must be restarted, for example with `kubectl rollout restart deployment/web`. Whole-volume mounts are refreshed automatically after a short delay, so if live updates matter more than neighboring files, mount the ConfigMap to its own empty directory and point the application at that directory instead.",
   "`readOnly: true` on a mount prevents the container from writing to that volume at that path, even if the underlying storage is writable. Attempts to write fail with a read-only file system error. It is a simple way to apply least privilege: a web server that only serves content, or an app that only reads credentials, should not be able to change them, so a compromised process cannot tamper with them. It also pairs well with `readOnlyRootFilesystem: true` in the container's security context, where the whole image filesystem is locked and you mount writable emptyDirs only at the paths that genuinely need writes, such as `/tmp` or a cache directory.",
   "To check what is mounted, use `kubectl describe pod`, whose Mounts section for each container lists every path, the volume behind it, and `(ro)` or `(rw)`. You can also look from inside with `kubectl exec pod -c web -- ls -la /etc/nginx/conf.d`. If you forget a field during the exam, `kubectl explain pod.spec.containers.volumeMounts` lists all of them, including `subPath`, `subPathExpr` and `readOnly`, with short descriptions. A quick mental checklist for any mount question is: does the volume exist under spec.volumes, does the container list it by the exact same name, will the mountPath hide files the app needs, does the app need live updates, and should this container be allowed to write here."
  ],
  "analogy": "Mounting a volume at a path is like laying a rug over a section of floor: whatever was on the floor there is still underneath, but you cannot see or reach it while the rug is down. subPath is placing one floor tile into an existing pattern instead of covering the whole area, though that tile will not change if the factory later updates the design. readOnly is covering the rug with glass. The analogy stops at sharing: a real rug sits in one room, while one volume can appear in several containers at once.",
  "terms": [
   [
    "volumeMounts",
    "Per-container list linking a Pod volume to a path inside that container."
   ],
   [
    "mountPath",
    "The absolute path in the container where the volume appears, hiding anything already there."
   ],
   [
    "subPath",
    "Mounts a single file or subdirectory of a volume instead of its whole root; does not receive ConfigMap or Secret updates."
   ],
   [
    "subPathExpr",
    "Like subPath, but can include $(VAR) environment variable references."
   ],
   [
    "readOnly",
    "Mount option that blocks writes from that container to the volume."
   ],
   [
    "readOnlyRootFilesystem",
    "Security context setting that makes the container image filesystem read-only."
   ]
  ],
  "example": "A team needs a custom nginx config but mounting the ConfigMap at /etc/nginx/conf.d wiped out other included files. Using `mountPath: /etc/nginx/conf.d/default.conf` with `subPath: default.conf` and `readOnly: true` replaced just the one file and made it tamper-proof. They documented that config edits now need `kubectl rollout restart` because subPath mounts do not refresh.",
  "mistakes": [
   [
    "Assuming a volume mount merges with the files already in the directory.",
    "The mount hides the existing directory contents. Use subPath to add a single file without covering its neighbors."
   ],
   [
    "Expecting a subPath-mounted ConfigMap file to update when the ConfigMap changes.",
    "subPath mounts are set up once at container start. Restart the Pod, or mount the whole ConfigMap to its own directory for automatic refresh."
   ],
   [
    "Declaring a volume under spec.volumes and assuming every container can see it.",
    "Only containers that list the volume in their own volumeMounts can access it."
   ],
   [
    "Thinking readOnly: true changes the storage or affects other containers.",
    "It only blocks writes from that container at that mount. Another container can mount the same volume read-write."
   ]
  ],
  "tryit": [
   [
    "An app reads `/app/config/settings.yaml`, but the image also ships `/app/config/defaults.yaml`, which it needs. You have a ConfigMap `app-settings` with a key `settings.yaml`. The team also wants config edits to take effect without restarts. Can you satisfy both, and what would you do?",
    "Not with one mount. A subPath mount at /app/config/settings.yaml keeps defaults.yaml visible but will not refresh. If live updates matter, mount the ConfigMap at its own directory such as /app/live-config and point the app there if it supports a config path; otherwise use subPath and plan a `kubectl rollout restart` after each edit."
   ],
   [
    "A container runs with readOnlyRootFilesystem: true and crashes with `Read-only file system` when writing to /tmp. What is the least-privilege fix?",
    "Add an emptyDir volume and mount it at /tmp in that container. The root filesystem stays read-only, and only /tmp is writable."
   ]
  ],
  "tip": "A volume needs both halves: an entry in spec.volumes and a matching volumeMounts entry in each container. subPath mounts do not auto-update from ConfigMaps or Secrets.",
  "check": [
   [
    "Why might mounting a ConfigMap at /etc/app break an application?",
    "The mount hides everything already in /etc/app in the image; use subPath to mount a single file instead."
   ],
   [
    "What does readOnly: true on a volumeMount do?",
    "It prevents that container from writing to the volume at that path."
   ],
   [
    "Can two containers in one Pod mount the same volume at different paths?",
    "Yes; each lists it under its own volumeMounts with its own mountPath."
   ],
   [
    "Where does kubectl show whether a mount is read-only?",
    "In the Mounts section of `kubectl describe pod`, marked (ro) or (rw)."
   ]
  ]
 },
 {
  "t": "Deployments and ReplicaSets: how the Pod template, labels and selectors fit together",
  "hook": "On a quiet Tuesday at Ironwood Bicycle Co-op, Sam applies a hand-written Deployment for the inventory service and gets an error: `selector does not match template labels`. He fixes it, then tries to rename the selector label from `app: inv` to `app: inventory` and is refused again, this time with a message about the field being immutable. Later he notices a stray debugging Pod he created by hand is receiving real customer traffic through the Service. Three surprises in one afternoon, and all of them come from the same small set of labels. How do the Deployment, its ReplicaSets, the Pod template and the selector fit together, and which of them actually decides where traffic goes?",
  "simple": "A Deployment is a manager that keeps the right number of copies of your app running. It does not handle the copies directly. It hires a supervisor, called a ReplicaSet, whose only job is to keep exactly the requested number of identical Pods alive. The Deployment gives the supervisor a template, like a cookie cutter, for making each Pod. Every Pod gets name tags called labels, such as `app: web`. The selector is the rule the supervisor uses to recognize its own Pods by those tags. If the tags on the cookie cutter do not match the rule, the supervisor could never find its own Pods, so Kubernetes refuses the setup. Other objects, like Services, also find Pods by their tags.",
  "body": [
   "A Deployment is the standard way to run a stateless app, and it works through a chain of objects rather than managing Pods directly. It creates a ReplicaSet, and the ReplicaSet keeps the requested number of Pod replicas running, creating new Pods when some die and deleting extras when there are too many. The Deployment's own job is to manage ReplicaSets over time, creating new ones and scaling old ones down, which is what makes rolling updates and rollbacks possible. The Certified Kubernetes Application Developer (CKAD) exam expects you to understand this chain and the labels that hold it together.",
   "Three parts of the Deployment spec work together. `replicas` is how many Pods you want; it defaults to 1 if omitted. `template` is the Pod template: the metadata, including labels, and the Pod spec every replica is made from. `selector` tells the controller which Pods belong to it, using `matchLabels` for simple equality or `matchExpressions` for set-based rules such as `In` and `NotIn`.",
   "```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\n  labels:\n    app: web\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n        tier: frontend\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.27\n```",
   "The rule connecting them is that the selector must match the template's labels; the Application Programming Interface (API) server rejects a Deployment where it does not, with an error saying the selector does not match template labels. The template can carry extra labels, like `tier: frontend` above, that the selector ignores, so the selector's labels need only be a subset of the template's. In `apps/v1` the selector is immutable after creation, so choose it carefully; changing it means deleting and recreating the Deployment. The labels in the Deployment's own top-level `metadata` are just labels on the Deployment object, useful for finding it with `kubectl get deploy -l`, and they do not affect which Pods are selected.",
   "Changes to the template drive new ReplicaSets. When you change anything in the Pod template, such as the image, an environment variable, a resource request or a label, the Deployment computes a hash of the template and creates a new ReplicaSet named after the Deployment plus that hash, for example `web-7d9c6b8f5`. It then scales the new ReplicaSet up and the old one down according to the update strategy. Old ReplicaSets remain at zero replicas as revision history for rollback, up to `revisionHistoryLimit` (default 10). Changing only `replicas`, whether by editing or with `kubectl scale`, does not create a new ReplicaSet; it just scales the current one, because the template is unchanged.",
   "Pod names and labels reveal the chain. Pods get names built from the ReplicaSet name plus a random suffix, such as `web-7d9c6b8f5-x2kqp`, and an extra `pod-template-hash` label whose value matches the ReplicaSet's hash. That label keeps ReplicaSets of the same Deployment from claiming each other's Pods. You can see the whole chain with `kubectl get deploy,rs,pods -l app=web`, and `kubectl describe rs web-7d9c6b8f5` shows a `Controlled By: Deployment/web` line; each Pod's describe output likewise shows it is controlled by the ReplicaSet.",
   "Selectors also connect other objects, which is where surprises come from. A Service with `selector: app: web` sends traffic to every Pod carrying that label, regardless of who created it. If you create a bare Pod with the label `app: web`, the Service will send it traffic too, even though the Deployment does not manage it. The Deployment's ReplicaSets will not adopt it, because they also select on `pod-template-hash`. A standalone ReplicaSet with a plain `app: web` selector, however, would adopt such a Pod and then delete one Pod to keep its count right. Understanding this label link explains many puzzling outages and is a good reason to give debugging Pods distinct labels.",
   "On the exam, avoid typing this structure by hand when you can. `kubectl create deployment web --image=nginx:1.27 --replicas=3 --dry-run=client -o yaml` produces a manifest with a matching selector and template label (`app: web`) automatically. Save it to a file, add any extra template labels or containers you need, and apply it. If you edit labels, change the template labels freely but leave the selector alone, and confirm with `kubectl get pods --show-labels` afterward. A final habit worth building is checking ownership before deleting anything: deleting a Pod owned by a ReplicaSet just causes a replacement to appear, while deleting the Deployment removes its ReplicaSets and Pods together."
  ],
  "analogy": "Think of a school. The Deployment is the principal, the ReplicaSet is a homeroom teacher keeping exactly 30 students in the room, the Pod template is the enrollment form every new student is created from, and the selector is the roll-call list matched against students' name badges (labels). If the form issues badges that the roll call never mentions, the teacher could never take attendance, so enrollment is refused. A Service is the cafeteria serving anyone with the right badge, enrolled or not. The analogy stops at revisions: a principal does not keep empty old classrooms for rollback.",
  "terms": [
   [
    "ReplicaSet",
    "Controller that keeps a set number of identical Pods running; normally managed by a Deployment."
   ],
   [
    "Pod template",
    "The Pod metadata and spec inside a controller from which every replica is created."
   ],
   [
    "Label selector",
    "A query on labels, such as matchLabels app: web, that decides which Pods an object manages or targets."
   ],
   [
    "pod-template-hash",
    "Label added by the Deployment to tell Pods of different ReplicaSets apart."
   ],
   [
    "revisionHistoryLimit",
    "Number of old ReplicaSets kept for rollback (default 10)."
   ]
  ],
  "example": "A developer edits the image in a Deployment. `kubectl get rs` then shows two ReplicaSets: the new one scaling from 0 to 3 and the old one from 3 to 0. After the rollout the old ReplicaSet stays at 0 replicas, ready to be used if they run `kubectl rollout undo`. Later they scale to five replicas, and `kubectl get rs` still shows only those two ReplicaSets, because scaling does not change the template.",
  "mistakes": [
   [
    "Thinking the Deployment's top-level metadata labels decide which Pods it manages.",
    "Only spec.selector does that, and it must match spec.template.metadata.labels. Top-level labels just tag the Deployment object."
   ],
   [
    "Believing scaling creates a new ReplicaSet.",
    "Only Pod template changes create a new ReplicaSet. Scaling adjusts the replica count of the current one."
   ],
   [
    "Editing the selector of an existing apps/v1 Deployment.",
    "The selector is immutable. Delete and recreate the Deployment if it must change."
   ],
   [
    "Assuming a Service only sends traffic to Pods owned by a Deployment.",
    "A Service selects any Pod with matching labels, including bare Pods created by hand."
   ]
  ],
  "tryit": [
   [
    "A Deployment has selector `app: shop` and template labels `app: shop, version: v1`. You change the template label to `version: v2` and apply. Then you try to change the selector to `app: shop, version: v2`. What happens in each step?",
    "The first change is valid: the selector (app: shop) is still a subset of the template labels, and because the template changed, a new ReplicaSet is created and rolled out. The second change is rejected, because the selector is immutable in apps/v1."
   ],
   [
    "A teammate runs `kubectl run debug --image=nginx --labels=app=web` in a namespace where a Deployment and Service both use `app: web`. Users start seeing default nginx pages occasionally. Why, and what is the fix?",
    "The Service selects any Pod labeled app=web, so it load-balances some requests to the debug Pod. The Deployment does not adopt it because its ReplicaSets also require pod-template-hash. Delete the debug Pod or relabel it, for example with `kubectl label pod debug app=debug --overwrite`."
   ]
  ],
  "tip": "If `kubectl apply` fails with 'selector does not match template labels', make spec.selector.matchLabels a subset of spec.template.metadata.labels. The selector cannot be changed later in apps/v1.",
  "check": [
   [
    "What object does a Deployment create directly?",
    "A ReplicaSet, which in turn creates the Pods."
   ],
   [
    "Does scaling a Deployment from 3 to 5 replicas create a new ReplicaSet?",
    "No; only changes to the Pod template create a new ReplicaSet. Scaling adjusts the current one."
   ],
   [
    "What must be true about a Deployment's selector and template labels?",
    "Every label in the selector must appear with the same value in the template's labels."
   ],
   [
    "Why do a Deployment's ReplicaSets not adopt a hand-made Pod that has the same app label?",
    "Their selectors also require the pod-template-hash label, which the hand-made Pod lacks."
   ]
  ]
 },
 {
  "t": "Rolling updates: maxSurge, maxUnavailable, minReadySeconds; the Recreate strategy",
  "hook": "Nadia leads the checkout team at Harborview Grocers, and Friday's release must ship during business hours. Last time, the default rollout briefly dropped capacity and the checkout page slowed for a few minutes. This time the cluster is nearly full, so she cannot add many extra Pods, and the new version sometimes crashes ten seconds after it reports ready. Meanwhile the warehouse team needs the opposite: their old and new versions must never run together because both write to one volume. Two teams, two very different requirements, and one `strategy` block to get right. What numbers would you choose for each?",
  "simple": "When you update an app in Kubernetes, the old copies have to be swapped for new ones. A rolling update swaps them a few at a time, so the app keeps working, like replacing the boards of a bridge while people keep walking across. Two settings control the pace. maxSurge says how many extra copies you may add above normal during the swap, like borrowing a few extra workers. maxUnavailable says how many copies may be missing at once. minReadySeconds makes each new copy prove it stays healthy for a while before it counts. The other option, Recreate, closes the bridge, removes every old board, then lays all the new ones: there is a short outage, but old and new never mix.",
  "body": [
   "When you change a Deployment's Pod template, the controller has to replace old Pods with new ones, and the `strategy` field controls how. The default, `RollingUpdate`, replaces Pods gradually so the app keeps serving during the change. The alternative, `Recreate`, deletes all old Pods first and only then creates new ones. The Certified Kubernetes Application Developer (CKAD) exam asks you to configure both and to do the arithmetic that shows how many Pods exist at each moment of a rollout.",
   "Two settings shape a rolling update. `maxSurge` is how many Pods above the desired replica count may exist during the update. `maxUnavailable` is how many Pods below the desired count may be unavailable. Each can be an absolute number or a percentage of replicas, and both default to 25%. Percentages are rounded in a specific way: surge rounds up and unavailable rounds down, which errs on the side of keeping capacity. They cannot both be zero, because then the controller could neither add a new Pod nor remove an old one, and the rollout could never make progress.",
   "```yaml\nspec:\n  replicas: 4\n  minReadySeconds: 10\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n```",
   "Walk through the example step by step. With 4 replicas, maxSurge 1 and maxUnavailable 0, the controller may run at most 5 Pods and must keep at least 4 available at all times. It creates one new Pod, waits until it is available, removes one old Pod, and repeats until all four are new. This is the safest zero-downtime setting, but it needs spare cluster capacity for the extra Pod; if the scheduler cannot place it, the new Pod stays Pending and the rollout waits. The opposite extreme, maxSurge 0 and maxUnavailable 1, uses no extra capacity but runs one Pod short during the update. With the defaults and 10 replicas, surge is 25% of 10, or 2.5, rounded up to 3, so up to 13 Pods may exist; unavailable is 2.5 rounded down to 2, so at least 8 must stay available.",
   "Availability depends on readiness, which is why probes matter so much during rollouts. A new Pod counts as available once its readiness probe passes and it has stayed ready for `minReadySeconds`, which defaults to 0. Raising minReadySeconds slows the rollout slightly but catches Pods that start and then crash a few seconds later, before the old Pods they replace are removed. If new Pods never become ready, the rollout stalls instead of taking down the old version, which is a key safety property of rolling updates: the old ReplicaSet keeps enough Pods to honor maxUnavailable. `progressDeadlineSeconds` (default 600) marks such a stuck rollout as failed in its status, with a condition reason of `ProgressDeadlineExceeded`; it does not roll back automatically, so you must run `kubectl rollout undo` or fix the template yourself.",
   "`Recreate` takes a much simpler approach. It has no surge or unavailable settings. All old Pods are terminated, and once they are gone the new ReplicaSet is scaled up. This causes downtime between the old Pods terminating and the new ones becoming ready, but it guarantees that two versions never run at once. Choose it when versions cannot coexist, for example when both would write to the same ReadWriteOnce volume, when the app holds an exclusive lock, or when a database schema change makes the old code incompatible with the new data. In `kubectl get pods` during a Recreate rollout you see all old Pods in Terminating, a moment with no Pods for the new version yet, and then new Pods moving through ContainerCreating to Running, which is exactly the downtime window you accepted.",
   "```yaml\nspec:\n  strategy:\n    type: Recreate\n```",
   "Switching between strategies has one trap. If you switch from RollingUpdate to Recreate by editing an existing Deployment, remove the `rollingUpdate` block too, or the Application Programming Interface (API) server rejects the change with an error saying rollingUpdate may not be specified when the strategy type is Recreate. You can also set the values imperatively with `kubectl patch` or edit them with `kubectl edit deploy/web`. Watch a rollout in action with `kubectl rollout status deploy/web`, which reports progress until it finishes or fails, and `kubectl get rs -w`, which shows the new ReplicaSet's count rising as the old one falls. `kubectl describe deploy web` lists the strategy, the current surge and unavailable values, and scaling events."
  ],
  "analogy": "Imagine replacing the chairs in a busy restaurant during service. maxSurge is how many extra chairs you can squeeze in temporarily; maxUnavailable is how many tables you can leave without chairs. minReadySeconds is making sure each new chair holds a guest for a while before you haul the old one away. Recreate is closing the restaurant, clearing every chair, and reopening with new ones. The analogy stops at stalls: a restaurant would keep swapping regardless, while Kubernetes pauses the swap if new chairs keep breaking.",
  "terms": [
   [
    "RollingUpdate",
    "Default Deployment strategy that replaces Pods gradually while the app keeps serving."
   ],
   [
    "maxSurge",
    "How many Pods above the desired count may exist during an update (default 25%, rounded up)."
   ],
   [
    "maxUnavailable",
    "How many Pods below the desired count may be unavailable during an update (default 25%, rounded down)."
   ],
   [
    "minReadySeconds",
    "How long a new Pod must stay ready before it counts as available (default 0)."
   ],
   [
    "progressDeadlineSeconds",
    "Time after which a stalled rollout is marked failed (default 600); it does not roll back."
   ],
   [
    "Recreate",
    "Strategy that terminates all old Pods before creating new ones, causing brief downtime."
   ]
  ],
  "example": "A payments API with 10 replicas must never drop below full capacity. The team sets maxUnavailable 0, maxSurge 2 and minReadySeconds 15, so the rollout adds two new Pods at a time and retires old ones only after the new ones have stayed healthy for 15 seconds. When a bad image crashes on start-up, the rollout stalls with all ten old Pods still serving, and the team runs `kubectl rollout undo`.",
  "mistakes": [
   [
    "Rounding both percentages the same way.",
    "maxSurge rounds up and maxUnavailable rounds down. With 10 replicas and 25%, surge is 3 and unavailable is 2."
   ],
   [
    "Setting maxSurge 0 and maxUnavailable 0 for maximum safety.",
    "Both cannot be zero; the controller could never add or remove a Pod, so the API server rejects it."
   ],
   [
    "Believing a failed rollout rolls back automatically after progressDeadlineSeconds.",
    "It is only marked failed in the Deployment status. You must run kubectl rollout undo or fix the template."
   ],
   [
    "Choosing RollingUpdate with maxSurge 0 to keep two versions from running together.",
    "Rolling updates always mix versions for a while. Only Recreate guarantees old and new never run at once."
   ]
  ],
  "tryit": [
   [
    "A Deployment has 8 replicas and the cluster has room for exactly one extra Pod. The team wants no loss of capacity and wants to catch Pods that crash within 20 seconds of becoming ready. What strategy settings do you choose, and what are the most and fewest available Pods during the rollout?",
    "RollingUpdate with maxSurge 1, maxUnavailable 0 and minReadySeconds 20 (or slightly more). At most 9 Pods exist and at least 8 stay available throughout."
   ],
   [
    "A Deployment with 6 replicas uses the default strategy. Midway through a rollout, all new Pods fail their readiness probe. How many old Pods are still serving, and what happens next?",
    "maxUnavailable 25% of 6 is 1.5, rounded down to 1, so at least 5 Pods stay available; the old ReplicaSet keeps those running. The rollout stalls, and after progressDeadlineSeconds (600 by default) it is marked failed, but nothing rolls back until you run `kubectl rollout undo`."
   ]
  ],
  "tip": "Do the arithmetic: max Pods = replicas + maxSurge (rounded up), minimum available = replicas - maxUnavailable (rounded down). Pick Recreate when a task says old and new versions must never run together.",
  "check": [
   [
    "With 10 replicas and the default strategy, how many Pods may exist at most during an update?",
    "13: maxSurge 25% of 10 is 2.5, rounded up to 3."
   ],
   [
    "Why would you choose the Recreate strategy?",
    "When two versions cannot run at the same time, accepting brief downtime."
   ],
   [
    "What happens if the new Pods never become ready during a rolling update?",
    "The rollout stalls and old Pods keep serving; after progressDeadlineSeconds it is reported as failed, but it is not rolled back automatically."
   ],
   [
    "What must you remove when changing a Deployment's strategy from RollingUpdate to Recreate?",
    "The rollingUpdate block; it is not allowed with type Recreate."
   ]
  ]
 },
 {
  "t": "Kubectl rollout status, history, undo (--to-revision), pause and resume; kubectl set image and scale",
  "hook": "It is 2:10 a.m. and your phone buzzes: checkout errors at Juniper Outfitters have jumped from almost none to one in five. The dashboard shows the spike began nine minutes ago, right when Leo on the payments team pushed a new image for the `checkout` Deployment before logging off. You open a terminal. The Pods are Running, the logs show a null pointer error in the new code, and customers are abandoning carts. You know the last version was fine, but you are not sure which revision number it was, and Leo also scaled the Deployment from 4 to 8 replicas earlier in the evening. Which commands bring the good version back in under a minute, and what will they leave unchanged?",
  "simple": "A Deployment keeps a short diary of every version of your app's recipe it has run. Each time you change the recipe, for example by switching to a newer image, it writes a new numbered page and slowly swaps old copies of the app for new ones. A few kubectl commands let you work with that diary. One changes the image, one watches the swap until it finishes, one lists the pages, and one goes back to an earlier page if the new version is broken. Changing how many copies run does not add a page, because the recipe itself did not change. Think of a restaurant changing a dish recipe versus simply cooking more plates of the same dish.",
  "body": [
   "A Deployment records a revision every time its Pod template changes, and kubectl gives you a small, fast set of commands to drive and inspect those revisions. A revision is a numbered snapshot of the template: the containers, images, environment variables, probes and labels inside `spec.template`. Behind the scenes each revision corresponds to a ReplicaSet, and old ReplicaSets are kept scaled to zero so that you can return to them. These commands are short to type and appear constantly in exam tasks, so it pays to know them by heart and to know exactly what each one does and does not change.",
   "The quickest way to change an image is `kubectl set image deployment/web nginx=nginx:1.27`. This edits the image of the container named `nginx` inside the Deployment `web`, which changes the Pod template and starts a rolling update. The part before the equals sign is the container name, not the image name. If the container is actually called `web-server`, kubectl answers with an error saying the container was not found, and nothing changes. You can set several containers in one command by listing more `name=image` pairs, which produces a single revision rather than one per container.",
   "Scaling is different because it does not touch the template. `kubectl scale deployment/web --replicas=5` changes only `spec.replicas`, so the existing ReplicaSet simply gains or loses Pods and no new revision appears in the history. A related command, `kubectl rollout restart deployment/web`, triggers a fresh rollout with an otherwise identical spec. It works by adding a timestamp annotation, `kubectl.kubernetes.io/restartedAt`, to the Pod template, which counts as a template change. That makes it useful when Pods need to pick up a changed ConfigMap or Secret that they consume as environment variables, since those values are only read when a container starts.",
   "Watching progress is the job of `kubectl rollout status deployment/web`. It waits and prints lines such as `Waiting for deployment \"web\" rollout to finish: 2 of 4 updated replicas are available...` until it reports `successfully rolled out`, or it fails when the Deployment exceeds its progress deadline. It returns a non-zero exit code on failure, which makes it handy in scripts. To see the past, `kubectl rollout history deployment/web` lists the revisions, and adding `--revision=3` prints the full Pod template stored for revision 3, so you can confirm which image it used before you roll back to it.",
   "The CHANGE-CAUSE column in the history output is filled from the `kubernetes.io/change-cause` annotation on the Deployment. If nobody set it, the column shows `<none>`, which is why histories are often hard to read. Set it yourself right after a change with `kubectl annotate deployment/web kubernetes.io/change-cause=\"upgrade to 1.27\"`. The old `--record` flag did this automatically but is deprecated, so do not rely on it. The number of old revisions kept is controlled by the Deployment's `revisionHistoryLimit` field, which defaults to 10.",
   "```bash\nkubectl set image deploy/web nginx=nginx:1.27\nkubectl rollout status deploy/web\nkubectl rollout history deploy/web\nkubectl rollout history deploy/web --revision=2\nkubectl rollout undo deploy/web\nkubectl rollout undo deploy/web --to-revision=1\n```",
   "Rolling back uses `kubectl rollout undo deployment/web`, which returns to the previous revision, while `--to-revision=N` picks a specific one. It helps to understand how undo works, because the exam likes to ask about the resulting numbers. Undo copies the chosen old template forward and applies it as the newest change. The restored template therefore gets a new, higher revision number, and its old number disappears from the list because the same template cannot appear twice. If you are on revision 4 and undo to revision 2, you end up on revision 5, and revision 2 is no longer listed separately. Rollback only affects the Pod template. It does not undo replica count changes, and it does not restore the contents of ConfigMaps or Secrets that the Pods read.",
   "Pausing lets you batch changes. `kubectl rollout pause deployment/web` tells the Deployment controller to stop acting on template changes. While it is paused you can make several edits, for example `kubectl set image` followed by `kubectl set resources` and `kubectl set env`, and none of them starts a rollout. `kubectl rollout resume deployment/web` then rolls everything out together as a single new revision. Scaling still works while paused, because scaling is not a template change. One restriction matters: you cannot undo a paused Deployment, and kubectl tells you to resume it first.",
   "These commands accept the short form `deploy/web`, and several of them work on other workload types as well. Status, history, undo and restart work on DaemonSets and StatefulSets, while pause and resume are for Deployments. After any change, confirm the outcome rather than assuming it. `kubectl get deploy web -o wide` shows the current images and selector, `kubectl get rs -l app=web` shows which ReplicaSet now owns the Pods, and `kubectl describe deploy web` lists events such as `Scaled up replica set web-7d9c5 to 4` and `Scaled down replica set web-5f8b6 to 0`, which tell the story of each rollout step."
  ],
  "analogy": "Think of a shared document with version history. Editing the text creates a new version, and restoring an old version does not erase history: the editor copies the old text forward as the newest version. Changing the zoom level or how many people are viewing does not create a version at all, just as scaling does not create a revision. The comparison stops at storage: a Deployment keeps only a limited number of old revisions, set by revisionHistoryLimit, and older ones are gone for good.",
  "terms": [
   [
    "Revision",
    "A numbered version of a Deployment's Pod template, backed by a ReplicaSet and kept for rollback."
   ],
   [
    "kubectl set image",
    "Changes a named container's image in a workload's Pod template, which starts a rolling update."
   ],
   [
    "rollout undo",
    "Returns the Deployment to the previous or a chosen revision by reapplying its template as a new revision."
   ],
   [
    "rollout pause / resume",
    "Temporarily stops and restarts rollouts so several template changes can be applied as one."
   ],
   [
    "change-cause",
    "The kubernetes.io/change-cause annotation shown in the CHANGE-CAUSE column of rollout history."
   ],
   [
    "revisionHistoryLimit",
    "Deployment field setting how many old ReplicaSets are kept for rollback; the default is 10."
   ]
  ],
  "example": "After `kubectl set image deploy/api api=api:2.1`, error rates spike. The on-call developer runs `kubectl rollout history deploy/api`, checks `kubectl rollout history deploy/api --revision=4` to confirm it used `api:2.0`, then runs `kubectl rollout undo deploy/api --to-revision=4` and watches `kubectl rollout status deploy/api` until it reports success. The history now shows the restored template as revision 6.",
  "mistakes": [
   [
    "Writing the image name on the left side of `kubectl set image`, as in `nginx:1.26=nginx:1.27`.",
    "The left side is the container name from the Pod spec. Look it up with `kubectl get deploy web -o jsonpath='{.spec.template.spec.containers[*].name}'`."
   ],
   [
    "Believing that `kubectl scale` creates a new revision that can be undone.",
    "Scaling changes only spec.replicas, not the Pod template, so no revision is created and rollout undo will not reverse it. Scale back explicitly."
   ],
   [
    "Expecting the rolled-back Deployment to keep the old revision number.",
    "Undo copies the old template forward as a new, higher revision, and the old number disappears from the history list."
   ],
   [
    "Thinking rollout undo also restores an edited ConfigMap.",
    "Undo only reapplies the Pod template. ConfigMaps, Secrets and replica counts stay as they are now."
   ]
  ],
  "tryit": [
   [
    "You need to change the `app` container image to `shop:3.0`, raise its memory limit, and add an environment variable `MODE=blue`, and the task says the Deployment `shop` must go through exactly one new rollout. Running three `kubectl set` commands would normally create three rollouts. How do you meet the requirement?",
    "Run `kubectl rollout pause deploy/shop`, then make the three changes with `kubectl set image`, `kubectl set resources` and `kubectl set env`, then `kubectl rollout resume deploy/shop`. The paused controller ignores the edits until resume, which rolls them out together as one revision. Confirm with `kubectl rollout history deploy/shop`."
   ],
   [
    "A Deployment is on revision 7. Revision 5 used image `api:1.4`, and revision 6 used `api:1.5`. A teammate asks you to restore `api:1.4` and then tell them the new revision number. What do you run and what do you report?",
    "Check with `kubectl rollout history deploy/api --revision=5`, then run `kubectl rollout undo deploy/api --to-revision=5`. Report revision 8: the revision 5 template is copied forward with a new number, and 5 no longer appears separately."
   ]
  ],
  "tip": "In `kubectl set image`, the left side is the container name. If you are unsure, read it with `kubectl get deploy web -o jsonpath='{.spec.template.spec.containers[*].name}'`, and remember that only template changes create revisions.",
  "check": [
   [
    "Does `kubectl scale` create a new rollout revision?",
    "No. Only Pod template changes create revisions, and scaling changes only the replica count."
   ],
   [
    "After undoing to revision 2 from revision 4, what revision number is the Deployment on?",
    "Revision 5. The old template is copied forward with a new number, and revision 2 no longer appears separately."
   ],
   [
    "Why pause a Deployment?",
    "To batch several template changes into a single rollout instead of one rollout per change."
   ],
   [
    "What must you do before running `kubectl rollout undo` on a paused Deployment?",
    "Resume it with `kubectl rollout resume`, because undo is refused while the Deployment is paused."
   ]
  ]
 },
 {
  "t": "Blue/green deployments by switching a Service selector between two Deployments",
  "hook": "Friday, 4:45 p.m. at Marlow Theater Tickets, and the box office for a sold-out tour opens at 9 a.m. Monday. Priya has a new seat-map service ready, but the last rolling update left customers seeing two different versions for twenty minutes, and half of them got a checkout page that did not match their seat map. Her manager's rule is simple: on Monday, every user sees the old version or the new version, never a mix, and if anything breaks, the old version must be back within seconds. Kubernetes has no built-in 'blue/green' object. With only two Deployments and one Service, how do you give her manager that guarantee?",
  "simple": "Blue/green is like having two identical stages in a theater. The audience watches the blue stage while the crew sets up and rehearses the new show on the green stage behind a curtain. When the new show is ready, you turn all the seats to face the green stage at once. If the new show goes wrong, you turn the seats back to blue, which is still set up. In Kubernetes, the two stages are two full copies of your app, and the turning seats are a Service, the stable address users connect to. The Service picks which copy gets traffic using labels, which are simple name tags such as version: blue or version: green.",
  "body": [
   "A blue/green deployment runs two complete versions of an application side by side. Blue is the live version receiving traffic, and green is the new version, fully started and tested but not yet serving users. When you are satisfied with green, you switch all traffic to it at once, and if something goes wrong, you switch back just as quickly. Kubernetes has no special object for this pattern. You build it from two ordinary Deployments and one Service, and the whole technique depends on understanding how a Service chooses its Pods.",
   "The trick is labels. A Service sends traffic to every ready Pod whose labels match all of the key-value pairs in its `selector`. Both Deployments give their Pods a shared application label such as `app: shop`, and they differ in a version label, for example `version: blue` and `version: green`. The Service's selector includes both labels, so at any moment it matches only one color. Nothing about the Deployments needs to change during the switch; only the Service's selector does.",
   "```yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: shop\nspec:\n  selector:\n    app: shop\n    version: blue\n  ports:\n  - port: 80\n    targetPort: 8080\n```",
   "The labels must be on the Pod template. A Deployment has its own `metadata.labels`, a `spec.selector.matchLabels`, and `spec.template.metadata.labels`. Only the last one ends up on the Pods, and a Service matches Pods, not Deployments. Each Deployment's own selector must also include the version label, so that `shop-blue` and `shop-green` each manage only their own Pods. If both Deployments selected just `app: shop`, their ReplicaSets would fight over each other's Pods.",
   "The process has four steps. First, deploy `shop-green` with the new image and `version: green` labels, at full size, while blue keeps serving. Second, test green directly without exposing it to users, for example through a temporary second Service such as `shop-preview` that selects `version: green`, or with `kubectl port-forward deploy/shop-green 8080:8080` and a request to the forwarded port. Third, switch the live Service by changing its selector: `kubectl patch service shop -p '{\"spec\":{\"selector\":{\"app\":\"shop\",\"version\":\"green\"}}}'` or `kubectl edit service shop`. Traffic moves as soon as the endpoints update, typically within a few seconds. Before the switch, run `kubectl rollout status deploy/shop-green` and check that every green Pod shows `1/1` in the READY column, because a Service only routes to ready Pods and a half-started green fleet would receive the full load of users the instant the selector changes. Finally, keep blue running for a while as your rollback path, then scale it to zero or delete it once you trust green.",
   "Verify the switch rather than assuming it worked. `kubectl get endpointslices -l kubernetes.io/service-name=shop` lists the Pod Internet Protocol (IP) addresses currently behind the Service, and `kubectl describe service shop` shows the selector and endpoints in one place. Compare those addresses with `kubectl get pods -l version=green -o wide`; they should match exactly. If the endpoint list is empty after the switch, the selector probably does not match the green Pod labels, often because of a typo or a label that was put on the Deployment metadata instead of the template.",
   "Compared with a rolling update, blue/green gives an instant, all-at-once cut-over, so users never see a mix of versions, and it gives an equally instant rollback, since the old Pods are still running and warm. The costs are real, though. You need roughly double the resources during the switch, because both versions run at full size. Both versions must also work with the same database and other shared state, so a schema change that the old version cannot read breaks your rollback path. Existing long-lived connections may continue to reach the old Pods until they close, which is another reason to keep blue alive briefly after switching.",
   "Exam tasks on this topic tend to be short and precise: create a green Deployment from an existing blue one, then point a Service at it. A quick approach is `kubectl get deploy shop-blue -o yaml > green.yaml`, edit the name, the version labels in both the selector and the template, and the image, remove the status and system fields, and apply it. Common mistakes are forgetting to add the distinguishing label to the Pod template, and making the Service selector so broad, just `app: shop`, that it matches both colors at once and silently becomes a fifty-fifty split."
  ],
  "analogy": "Picture a railway junction with two parallel tracks. A full train waits on each track, and a single switch lever decides which train the station platform connects to. Throwing the lever moves every passenger at once, and throwing it back is just as fast. The Service selector is that lever. The comparison breaks down for passengers already on board: long-lived connections can stay with the old Pods until they close, which a train switch would not allow.",
  "terms": [
   [
    "Blue/green deployment",
    "Running old and new versions at full size side by side and switching all traffic between them at once."
   ],
   [
    "Service selector",
    "The label query that decides which ready Pods receive a Service's traffic; every listed label must match."
   ],
   [
    "Cut-over",
    "The moment traffic moves from the old version to the new one."
   ],
   [
    "Pod template labels",
    "Labels under spec.template.metadata.labels, the only Deployment labels that appear on the Pods themselves."
   ],
   [
    "EndpointSlice",
    "An object listing the addresses of the Pods currently backing a Service, used to verify where traffic goes."
   ]
  ],
  "example": "A ticketing site deploys `tickets-green` alongside `tickets-blue`, tests it through `kubectl port-forward deploy/tickets-green 8080:8080`, then patches the `tickets` Service selector to `version: green`. `kubectl get endpointslices -l kubernetes.io/service-name=tickets` shows only green Pod addresses. When a bug appears ten minutes later, they patch the selector back to blue, restoring the old version within seconds.",
  "mistakes": [
   [
    "Putting the version label only in the Deployment's top-level metadata.",
    "Services match Pods, so the label must be in spec.template.metadata.labels, and also in the Deployment's selector so each Deployment owns only its own Pods."
   ],
   [
    "Using a Service selector of just `app: shop`.",
    "That matches both colors, so traffic splits across blue and green and there is no clean cut-over. Include the version label in the selector."
   ],
   [
    "Switching by running kubectl set image on the blue Deployment.",
    "That is a rolling update, which mixes versions during the change. Blue/green leaves both Deployments untouched and changes only the Service selector."
   ],
   [
    "Deleting blue immediately after the switch.",
    "Blue is the rollback path and may still hold long-lived connections. Keep it running until green has proven itself, then scale it down."
   ]
  ],
  "tryit": [
   [
    "You patch the `shop` Service selector to `version: green`, and the site immediately starts returning connection errors. `kubectl get pods -l app=shop --show-labels` shows the green Pods with labels `app=shop,ver=green`. What happened, and what is the fastest safe fix?",
    "The selector asks for `version: green`, but the Pods carry `ver=green`, so the Service has no endpoints. The fastest safe fix is to patch the selector back to `version: blue` to restore service, then correct the green Deployment's template and selector labels (or recreate it) before switching again."
   ],
   [
    "Your cluster is nearly full, and the green Deployment would need as many Pods as blue. A colleague suggests running green at one replica, switching the Service, and then scaling green up. Is that still a blue/green release, and what is the risk?",
    "It keeps the selector switch, but all traffic would hit one green Pod at the moment of cut-over, which may overload it and cause errors. Blue/green relies on green being at full size before the switch. If resources are too tight, a canary or a rolling update is a better fit."
   ]
  ],
  "tip": "The switch happens in the Service, not in the Deployments. Make sure the version label is on the Pod template, that the Service selector includes it, and confirm with the EndpointSlices that the addresses belong to the intended color.",
  "check": [
   [
    "What single change moves traffic from blue to green?",
    "Updating the Service's selector to match the green Pods' version label."
   ],
   [
    "How do you roll back a blue/green release?",
    "Switch the Service selector back to the blue label, provided the blue Deployment is still running."
   ],
   [
    "What is the main resource cost of blue/green?",
    "Both versions run at full size at the same time during the switch."
   ],
   [
    "How can you test green before any users reach it?",
    "Through a temporary preview Service that selects version: green, or with kubectl port-forward to the green Deployment."
   ]
  ]
 },
 {
  "t": "Canary releases with two Deployments behind one Service, weighted by replica count",
  "hook": "The search team at Bramble Books has rewritten its ranking code, and Tomas swears it is faster. The last time a big change went out to everyone at once, a memory leak took the whole catalog offline during a Saturday sale, and nobody wants to repeat that. Your lead asks for something more careful: let about one in ten real customers use the new version for a day, watch the error rate, and grow it only if it behaves. There is no service mesh in this cluster and no fancy ingress controller, just Deployments and Services. How do you send roughly ten percent of real traffic to new code using nothing but replica counts and labels?",
  "simple": "A canary release means letting a few real users try a new version first, so that if it is broken only a few people notice. The name comes from miners who carried canaries underground as an early warning of bad air. In Kubernetes you run two copies of your app side by side: many copies of the old version and a few copies of the new one. One Service, the stable address users connect to, spreads visitors across all of them evenly. So if 9 copies are old and 1 is new, about 1 visitor in 10 gets the new version. It is like a bakery putting one tray of a new cookie among nine trays of the usual ones and watching how customers react.",
  "body": [
   "A canary release sends a small share of real traffic to a new version before rolling it out to everyone. If the canary behaves well, you gradually give it more traffic, and if it misbehaves, only a few users were affected and you remove it. The name comes from the canaries that miners once carried to warn them of bad air. On the exam and in plain Kubernetes, a canary is not a special object. It is a pattern built from objects you already know, and the traffic split is controlled by counting Pods.",
   "Without a service mesh or special ingress features, you build a canary from two Deployments and one Service. Both Deployments label their Pods with a shared label, such as `app: api`, plus a track label such as `track: stable` or `track: canary`. The Service selects only on the shared label, so it load-balances across every ready Pod from both Deployments. The track label exists so that each Deployment manages only its own Pods and so that you can target one group with commands such as `kubectl logs -l track=canary`.",
   "```yaml\n# Service selects both tracks\nspec:\n  selector:\n    app: api\n---\n# api-stable: replicas: 9, labels app: api, track: stable, image api:1.0\n# api-canary: replicas: 1, labels app: api, track: canary, image api:1.1\n```",
   "Each Deployment's own `spec.selector` must include the track label as well as the shared one. If both Deployments selected only `app: api`, each ReplicaSet would count the other Deployment's Pods as its own and the replica numbers would behave unpredictably. So the rule is: the Deployment selectors are narrow (shared label plus track), and the Service selector is broad (shared label only). Remember that these labels must sit in the Pod template, `spec.template.metadata.labels`, because that is where Pods get their labels.",
   "The split follows the replica counts because a ClusterIP Service spreads connections roughly evenly across its ready endpoints. With 9 stable Pods and 1 canary Pod, about 10 percent of connections reach the canary. The formula is canary replicas divided by total replicas. To move to about 25 percent, you could run 3 stable and 1 canary, or 6 stable and 2 canary. The split is approximate. It is decided per connection rather than per request, so clients that keep connections open for a long time, such as those using Hypertext Transfer Protocol (HTTP) keep-alive, can skew it, and small numbers of Pods make it lumpy. If you need exact percentages, or routing by user or header, that is a job for a service mesh or an ingress controller with weighting features, which goes beyond this pattern.",
   "A typical progression looks like this. Deploy the canary with one replica, then watch its logs, error responses and latency, for example with `kubectl logs -l track=canary --tail=50` and `kubectl get pods -l track=canary` to check for restarts. If it looks healthy, scale it up with `kubectl scale deploy api-canary --replicas=3` while scaling stable down with `kubectl scale deploy api-stable --replicas=7`, which keeps the total at 10 and moves the split to about 30 percent. When you are confident, update the stable Deployment to the new image with `kubectl set image` and delete the canary. To abort, delete the canary or scale it to zero, and the Service immediately stops sending it traffic because its Pods leave the endpoints.",
   "It helps to place canaries next to the other strategies. The key difference from blue/green is that users see both versions at once, in proportion, and the Service selector never changes. Blue/green flips everyone at once by editing the selector. The difference from a plain rolling update is control. A rolling update moves through the whole fleet automatically, governed by `maxSurge` and `maxUnavailable`, and you only get to pause or undo. A canary lets you hold at a small percentage for as long as you want, gather evidence, and decide.",
   "Exam tasks tend to give you numbers. When a task asks for 20 percent of traffic on the new version with a total of 5 Pods, the answer is 4 stable and 1 canary, both carrying the label the Service selects. A fast way to create the canary is to export the stable Deployment with `kubectl get deploy api-stable -o yaml`, change the name, the track label in both the selector and the template, the image and the replica count, then apply it. Finish by checking `kubectl get endpointslices -l kubernetes.io/service-name=api`: all five Pod addresses should appear, and `kubectl get pods -l app=api -L track` shows which track each Pod belongs to."
  ],
  "analogy": "Imagine a call center with ten agents answering one shared phone number, calls handed out in turn. If one agent is a new hire trying a new script, about one call in ten reaches them, and you can listen in before training everyone. Replace more agents with new hires and their share grows. The analogy stops at precision: Kubernetes balances connections, not individual calls, so a caller who stays on the line for an hour keeps the same agent and the real split can drift.",
  "terms": [
   [
    "Canary release",
    "Sending a small share of real traffic to a new version to test it with real users before a full rollout."
   ],
   [
    "Track label",
    "A label such as track: canary that tells the two Deployments' Pods apart without affecting the Service."
   ],
   [
    "Replica weighting",
    "Using the ratio of Pod counts to approximate a traffic split behind one Service."
   ],
   [
    "Promotion",
    "Moving the canary's version into the stable Deployment, then removing the canary."
   ],
   [
    "ClusterIP Service",
    "The default Service type, giving one stable internal address that spreads connections across ready Pods."
   ]
  ],
  "example": "A search team runs `search-stable` with 8 replicas and adds `search-canary` with 2 replicas of the new ranking code, both labeled `app: search` and told apart by `track`. Roughly 20 percent of queries hit the canary. After a day of normal error rates and no restarts, they run `kubectl set image deploy/search-stable search=search:2.0` and `kubectl delete deploy search-canary`.",
  "mistakes": [
   [
    "Including `track: stable` in the Service selector.",
    "Then the Service matches only stable Pods and the canary receives no traffic. The Service selector must contain only the shared label."
   ],
   [
    "Leaving the track label out of each Deployment's selector.",
    "Both Deployments would claim each other's Pods. Each Deployment selector needs the shared label plus its own track label."
   ],
   [
    "Expecting an exact 10 percent split per request.",
    "Replica weighting is approximate and per connection. Exact or header-based splits need a service mesh or a weighting-capable ingress."
   ],
   [
    "Confusing canary with blue/green.",
    "A canary runs both versions at once in proportion with an unchanged selector; blue/green switches everyone at once by changing the selector."
   ]
  ],
  "tryit": [
   [
    "A task says: Service `pay` must keep a total of 8 Pods, with 25 percent of traffic on image `pay:2.0`. Deployment `pay-stable` currently has 8 replicas of `pay:1.0`. What do you create and change?",
    "Create `pay-canary` with 2 replicas of `pay:2.0`, labeled with the shared label the Service selects plus `track: canary`, and scale `pay-stable` to 6. Two out of eight is 25 percent. Verify that eight addresses appear in the Service's EndpointSlices."
   ],
   [
    "One hour into a canary, `kubectl get pods -l track=canary` shows RESTARTS climbing, and support tickets mention timeouts. The stable Pods look fine. What is your next step, and why is it low risk?",
    "Scale `api-canary` to zero or delete it. Its Pods leave the Service endpoints and all traffic returns to the stable Pods, which were never changed. Only the users who hit the canary were affected, which is the point of the pattern. Then examine the canary's logs and events."
   ]
  ],
  "tip": "Percent to canary equals canary replicas divided by total replicas. The Service selector must match a label shared by both Deployments and must not include the track label, while each Deployment's selector must include it.",
  "check": [
   [
    "A Service fronts 3 stable Pods and 1 canary Pod. Roughly what share of traffic reaches the canary?",
    "About 25 percent, because traffic is spread across all four ready endpoints."
   ],
   [
    "Why must the Service selector not include `track: stable`?",
    "Then it would match only stable Pods, and the canary would receive no traffic."
   ],
   [
    "How do you quickly abort a canary?",
    "Scale the canary Deployment to zero or delete it; its Pods leave the Service endpoints."
   ],
   [
    "Why is the traffic split only approximate?",
    "The Service balances connections, not requests, so long-lived connections and small Pod counts can skew the ratio."
   ]
  ]
 },
 {
  "t": "Helm basics: repositories, charts, releases; helm repo add/update, search, install, upgrade, rollback, uninstall, list",
  "hook": "On your second day at Fernhill Analytics, Sam from the data team messages you: \"Can you put the metrics dashboard chart into the `reporting` namespace? And someone installed an old copy called `legacy-dash` months ago, nobody knows where. Please get rid of it.\" You type `helm list`, and the output is empty. Did someone already delete everything, or are you just looking in the wrong place? Your terminal is open, the chart lives in a public repository you have never added, and the exam timer in your head is running. Which Helm commands take you from nothing to a clean, verified install, and how do you find a release that seems invisible?",
  "simple": "Helm is an app store for Kubernetes. Instead of writing and applying many configuration files yourself, you install a ready-made package called a chart. A chart is like a recipe kit: it includes the instructions and sensible default settings. A repository is the shop shelf where charts are kept, and you first tell Helm where the shelf is. A release is one dish you actually cooked from the kit, with a name you choose, and you can cook the same kit several times under different names. Helm remembers each change to a release, so you can go back to an earlier version, much like the undo history in a word processor.",
  "body": [
   "Helm is a package manager for Kubernetes. Instead of applying dozens of YAML (YAML Ain't Markup Language) manifest files by hand, you install a chart, a package of templated manifests with default settings, and Helm renders the templates and applies the result for you. Modern Helm, from version 3 onward, runs entirely as a client. There is no server component in the cluster. Helm talks to the Kubernetes application programming interface (API) using your kubeconfig, exactly as kubectl does, and stores release records as Secrets in the release's namespace. Because of that, your role-based access control (RBAC) permissions apply: if you cannot create Deployments in a namespace with kubectl, Helm cannot either.",
   "Three words matter, and the exam expects you to keep them apart. A chart is the package: a directory or a `.tgz` archive containing `Chart.yaml` with the chart's name and version, a `values.yaml` file of defaults, and a `templates/` folder of manifests with placeholders. A repository is a server that hosts an index of charts, so that Helm can list and download them. A release is one installed instance of a chart in a cluster, with a name you choose. You can install the same chart many times as different releases, for example `web-staging` and `web-prod`, and each release has its own revision history.",
   "Repositories are registered on your machine, not in the cluster. `helm repo add bitnami <repo-url>` adds one under a short local name, `helm repo update` refreshes the cached chart index, and `helm repo list` shows which repositories you have. Run `helm repo update` before searching or installing so you see the latest chart versions; a stale cache is a common reason a version you expect is missing. `helm search repo nginx` searches your added repositories, and `helm search repo nginx --versions` lists every available chart version with its app version. `helm search hub` searches a public catalog of charts instead of your local repositories.",
   "```bash\nhelm repo add bitnami <repo-url>\nhelm repo update\nhelm search repo bitnami/nginx\nhelm install web bitnami/nginx -n web --create-namespace\nhelm list -n web\nhelm upgrade web bitnami/nginx -n web --set replicaCount=3\nhelm history web -n web\nhelm rollback web 1 -n web\nhelm uninstall web -n web\n```",
   "Installing and changing releases follows a simple life cycle. `helm install <release> <chart>` creates revision 1, for example `helm install web bitnami/nginx`. Pin a specific chart version with `--version` so that you get exactly what the task asks for rather than whatever is newest. `helm upgrade <release> <chart>` applies a new chart version or new values and creates the next revision, and `helm upgrade --install` installs the release if it does not exist yet, which is convenient in scripts. If an install or upgrade fails, the release is still recorded with a failed status, which you can see in its history.",
   "History and rollback work much like Deployment rollouts. `helm history <release>` lists revisions with their status, chart version and description, such as `deployed`, `superseded` or `failed`. `helm rollback <release> <revision>` returns to an earlier revision, and the rollback is recorded as a new revision rather than erasing the later ones. If you are on revision 3 and roll back to 1, the history shows revision 4 with a description like `Rollback to 1`. Leave out the revision number to go back one step. Unlike `kubectl rollout undo`, a Helm rollback restores everything the chart manages, including ConfigMaps and Services, because it reapplies the full set of rendered manifests from that revision.",
   "Listing and inspecting releases is where namespaces catch people out. `helm list` shows releases in the current namespace only. Add `-n <ns>` to look in a specific namespace, `-A` to look across all namespaces, and `-a` to include releases in failed or pending states, which are hidden by default. `helm status <release>` shows the release state, its last deployment time and the chart's notes, which often contain connection instructions. `helm uninstall <release>` deletes the release's resources and its history. Helm commands are namespace-scoped like kubectl, so a release installed with `-n web` is invisible to `helm list` run in `default`. That is the most common source of 'release not found' errors, and `helm list -A` is the fix.",
   "After any Helm operation, confirm the result with ordinary kubectl. `kubectl get all -n web` shows the Deployments, ReplicaSets, Pods and Services the chart created. Helm-managed objects carry labels such as `app.kubernetes.io/managed-by=Helm` and an `app.kubernetes.io/instance` label holding the release name, so `kubectl get pods -l app.kubernetes.io/instance=web -n web` narrows the list to one release. Release records themselves appear as Secrets named like `sh.helm.release.v1.web.v1`, which explains why deleting the namespace also removes Helm's memory of the release."
  ],
  "analogy": "A chart is like a flat-pack furniture kit with assembly instructions and default options, a repository is the store catalog that lists the kits, and a release is one assembled piece in a particular room, labeled with its own name. You can build the same kit in two rooms. The analogy stops at undo: Helm keeps a numbered history for each release and can rebuild an earlier version, which no furniture store will do for you.",
  "terms": [
   [
    "Chart",
    "A Helm package of templated Kubernetes manifests plus default values, with Chart.yaml metadata."
   ],
   [
    "Repository",
    "A server hosting an index of charts, registered locally with helm repo add."
   ],
   [
    "Release",
    "A named, installed instance of a chart in a namespace, with its own revision history."
   ],
   [
    "helm rollback",
    "Returns a release to an earlier revision, recorded as a new revision."
   ],
   [
    "helm upgrade --install",
    "Upgrades a release if it exists or installs it if it does not."
   ],
   [
    "helm list -A",
    "Lists releases across all namespaces; add -a to include failed or pending releases."
   ]
  ],
  "example": "An exam task asks you to install the chart bitnami/apache as release `site` in namespace `web-team`, then remove an older release called `legacy`. You run `helm repo update`, `helm install site bitnami/apache -n web-team --create-namespace`, find the old one with `helm list -A`, which shows it in `marketing`, and remove it with `helm uninstall legacy -n marketing`. `kubectl get all -n web-team` confirms the new Pods are running.",
  "mistakes": [
   [
    "Running `helm list`, seeing nothing, and concluding the release does not exist.",
    "helm list shows only the current namespace and only deployed releases. Use `helm list -A`, and add `-a` to see failed or pending ones."
   ],
   [
    "Using 'chart' and 'release' interchangeably.",
    "The chart is the package; the release is one named installation of it. helm uninstall takes a release name, not a chart name."
   ],
   [
    "Believing helm rollback deletes the later revisions.",
    "Rollback creates a new revision that matches the chosen one; the later revisions remain in the history."
   ],
   [
    "Thinking Helm needs a component running in the cluster.",
    "Modern Helm is client-only; the old in-cluster server component was removed in Helm 3. It uses your kubeconfig and your RBAC permissions, and stores release records as Secrets."
   ]
  ],
  "tryit": [
   [
    "You run `helm upgrade api ./api-chart` from the default namespace and get 'has no deployed releases'. A colleague is sure `api` was installed last week. What do you check, and what is the likely fix?",
    "Run `helm list -A` (and `-a` if needed) to find where `api` lives. It is probably in another namespace, so repeat the upgrade with `-n <that-namespace>`. If it appears only as failed, inspect `helm history api -n <ns>` before deciding to roll back or reinstall."
   ],
   [
    "A release `shop` is on revision 4 after a bad upgrade. Revision 2 was the last good one. Your manager asks what the history will look like after you fix it. What do you run and what do you tell them?",
    "Run `helm rollback shop 2 -n <ns>`. The history will show revisions 1 to 4 still present, plus a new revision 5 with a description like 'Rollback to 2', marked deployed."
   ]
  ],
  "tip": "Always pass the right `-n` namespace to helm list, upgrade, rollback and uninstall, and use `helm list -A` when you do not know where a release lives. Run `helm repo update` before searching or installing.",
  "check": [
   [
    "What is the difference between a chart and a release?",
    "A chart is the package; a release is a named installation of that chart in a cluster."
   ],
   [
    "Which command refreshes your local copy of repository indexes?",
    "`helm repo update`."
   ],
   [
    "How do you roll the release `api` back to revision 2?",
    "`helm rollback api 2` (with `-n` for its namespace), which creates a new revision matching revision 2."
   ],
   [
    "Where does modern Helm store release records?",
    "As Secrets in the release's namespace, written through the Kubernetes API with your credentials."
   ]
  ]
 },
 {
  "t": "Helm values: helm show values, --set and -f values.yaml, helm template, namespaces with -n and --create-namespace",
  "hook": "Nadia at Cobalt Ridge Health asks you to install the team's internal API chart into a new `staging` namespace with a NodePort Service and two replicas, so the QA testers can reach it. You run the install with `--set service.typ=NodePort`, it succeeds without a single warning, and twenty minutes later QA reports that the Service is still ClusterIP. Then a teammate upgrades the release to bump the image tag, and suddenly the replica count drops back to one. Nothing errored, yet two of your settings have quietly disappeared. How do you find the right keys before installing, prove what a chart will render, and keep your overrides from vanishing on upgrade?",
  "simple": "A Helm chart comes with a settings sheet called values, like the default options on a new phone. You can change those options when you install the chart without editing the chart itself. You can hand Helm a small file listing only the settings you want to change, or type single settings on the command line. If the same setting appears in both places, the command line wins. Before changing anything, you can print the full list of settings to see their exact names, because a misspelled setting is simply ignored. You can also ask Helm to show you the finished configuration files without installing anything, like a print preview before you print.",
  "body": [
   "Charts are customized through values. A chart's `values.yaml` file holds the defaults, and its templates read them with expressions such as `{{ .Values.replicaCount }}` or `{{ .Values.service.type }}`. When Helm renders the chart, it merges your overrides on top of those defaults and fills in the templates. You never need to edit the chart itself to change its behavior, which means you can upgrade to a newer chart version later and keep your settings in a separate, small file.",
   "Start by finding out what can be set. `helm show values bitnami/nginx` prints the chart's default values file, comments included, and redirecting it with `> values.yaml` gives you an editable copy. `helm show chart` prints the chart metadata from `Chart.yaml`, such as its version and app version, and `helm show readme` prints its documentation, which often explains each value. For a release that is already installed, `helm get values <release>` shows the values you supplied, and adding `--all` includes the computed defaults, so you can see the full picture of what the release is really using.",
   "There are two ways to override values. The first is `-f my-values.yaml`, also written `--values`, which supplies a YAML (YAML Ain't Markup Language) file containing only the keys you want to change. You can pass several files, and later files override earlier ones, which makes a common pattern possible: a shared base file plus a small file per environment. The second is `--set key=value`, which sets individual values on the command line using dots for nesting, as in `--set service.type=NodePort` or `--set image.tag=1.27`. Lists use indexes, such as `--set ingress.hosts[0].name=shop.local`, and commas separate multiple pairs in one flag, as in `--set replicaCount=2,service.type=NodePort`.",
   "Precedence decides what happens when the same key is set more than once. The chart's own `values.yaml` is the lowest layer. Files given with `-f` override it, in order, with the last file winning. Values given with `--set` take priority over `-f` files, and among several `--set` flags the last one wins. A related flag, `--set-string`, forces a value to be treated as a string, which matters for things like a tag of `1.10` that would otherwise be read as a number.",
   "```bash\nhelm show values bitnami/nginx > values.yaml\n# edit values.yaml, keeping only what you change\nhelm install web bitnami/nginx -f values.yaml --set replicaCount=2 \\\n  -n shop --create-namespace\nhelm get values web -n shop\n```",
   "Rendering without installing is the job of `helm template <release> <chart>`. It renders the manifests locally and prints them to standard output without contacting the cluster or creating a release. Use it to check what your values actually produce, for example `helm template web bitnami/nginx -f values.yaml | grep -A3 'kind: Service'` to confirm the Service type. You can also save the output and apply it with kubectl, though then Helm will not track it as a release, so you lose upgrade and rollback. `helm install --dry-run` is similar but goes through the install process, including checks against the cluster, and prints what would be created without creating it.",
   "Namespaces follow the kubectl pattern. `-n shop`, or `--namespace shop`, chooses where the release record and its resources go. If the namespace does not exist, the install fails with an error saying the namespace was not found, unless you add `--create-namespace`. Every later command on that release, including `upgrade`, `rollback`, `uninstall`, `status` and `get values`, needs the same `-n`, because Helm looks for the release record only in the namespace you name.",
   "Upgrades deserve special care because of how values carry over. By default, `helm upgrade` with no values flags reuses the previous release's values. But once you pass any `--set` or `-f`, Helm starts from the chart defaults plus what you pass in this command, so an override you gave at install time can silently disappear. That is exactly how a replica count can fall back to the default after an unrelated image change. `--reuse-values` merges your new overrides onto the old ones, and `--reset-values` goes back to the chart defaults. The safest habit is to keep all overrides in a values file and pass it on every upgrade, then check the outcome with `helm get values`.",
   "Finally, remember that Helm does not validate your keys against the chart. A misspelled key such as `service.typ` is stored in the release values but no template reads it, so nothing changes and no warning appears. The defense is to copy key paths from `helm show values` and verify the result with `helm template` before installing, or with `helm get values` and `kubectl get` afterward."
  ],
  "analogy": "Values work like ordering a pizza. The menu lists a default pizza, which is values.yaml. Handing over a written note of changes is the -f file, and telling the cashier a last-minute change is --set, which beats the note if they disagree. Ordering an unknown topping by a wrong name gets you no error, just a plain pizza. Where it stops: on a repeat order, Helm may forget your earlier note if you hand over a new one, unless you ask it to reuse the old one.",
  "mnemonic": "For precedence, lowest to highest, think 'Default, File, Set': the chart's values.yaml, then -f files in order, then --set flags. The later and more specific source wins.",
  "terms": [
   [
    "values.yaml",
    "The chart's default configuration file, read by its templates through .Values."
   ],
   [
    "--set",
    "Command-line override of individual values using dotted keys; it beats -f files."
   ],
   [
    "-f / --values",
    "Supplies a YAML file of value overrides; can be repeated, with later files winning."
   ],
   [
    "helm template",
    "Renders chart manifests locally without contacting the cluster or creating a release."
   ],
   [
    "helm get values",
    "Shows the values supplied to an installed release; --all adds the computed defaults."
   ],
   [
    "--reuse-values",
    "On upgrade, merges new overrides onto the previous release's values instead of starting from chart defaults."
   ]
  ],
  "example": "To install a chart with a NodePort Service in a new namespace, a developer runs `helm show values ./api-chart | grep -A3 service:` to find the key name, then `helm install api ./api-chart -n staging --create-namespace --set service.type=NodePort`, and confirms with `kubectl get svc -n staging`, which shows TYPE NodePort.",
  "mistakes": [
   [
    "Assuming Helm will warn about a misspelled value key.",
    "Unknown keys are silently ignored. Copy key paths from helm show values and verify with helm template or helm get values."
   ],
   [
    "Believing a -f file overrides --set when both set the same key.",
    "--set has higher priority than -f files. The order is chart defaults, then -f files, then --set."
   ],
   [
    "Running helm upgrade with one new --set and expecting all earlier overrides to stay.",
    "Passing any values flag makes Helm start from chart defaults plus the new values. Pass the full values file again or use --reuse-values."
   ],
   [
    "Thinking helm template installs a release.",
    "helm template only prints rendered YAML locally; nothing is created and Helm keeps no release record."
   ]
  ],
  "tryit": [
   [
    "You must install chart `./web` as release `site` in namespace `promo`, which does not exist yet, with 3 replicas and image tag `2.4`. The chart's defaults are replicaCount 1 and image.tag latest. Write the command and say how you would prove the values took effect before and after installing.",
    "`helm install site ./web -n promo --create-namespace --set replicaCount=3,image.tag=2.4`. Before installing, run the same values through `helm template site ./web --set replicaCount=3,image.tag=2.4` and check the replicas and image lines. Afterward, `helm get values site -n promo` and `kubectl get deploy -n promo -o wide` confirm them."
   ],
   [
    "A release was installed with `-f prod.yaml`, which sets replicaCount to 5. A teammate ran `helm upgrade shop ./shop -n shop --set image.tag=1.9`, and replicas dropped to 1. Why, and how should the upgrade have been written?",
    "Because a values flag was passed, Helm started from chart defaults plus only the new --set, dropping prod.yaml's settings. The upgrade should pass `-f prod.yaml --set image.tag=1.9`, or use `--reuse-values --set image.tag=1.9`."
   ]
  ],
  "tip": "Find the exact key path with `helm show values` before using --set. A wrong key is silently ignored, so verify with `helm template` before installing or `helm get values` after.",
  "check": [
   [
    "If a value is set both in a -f file and with --set, which wins?",
    "The --set value."
   ],
   [
    "Which command renders a chart's manifests without touching the cluster?",
    "`helm template`."
   ],
   [
    "An install into namespace `qa` fails because the namespace is missing. What flag fixes it?",
    "`--create-namespace` together with `-n qa`."
   ],
   [
    "Which command shows the values an installed release is using, including defaults?",
    "`helm get values <release> --all`, with -n for its namespace."
   ]
  ]
 },
 {
  "t": "Kustomize: kustomization.yaml, resources, namePrefix, namespace, commonLabels/labels, images, patches, configMapGenerator",
  "hook": "At Willow Creek Transit, the trip-planner team keeps three nearly identical copies of the same YAML files, one each for dev, staging and production. Last week Omar fixed a probe in dev and staging but forgot production, and riders saw errors for an hour. Your lead wants one set of manifests, with each environment described only by what differs: its namespace, a name prefix, an image tag, a replica count, a couple of config values. No templating language, no new tool to install on the bastion host, just plain YAML. Which few lines in a single file can rename, relabel, retag and reconfigure everything without touching the originals, and which of those lines could break a live Deployment?",
  "simple": "Kustomize is a way to reuse the same Kubernetes files for different situations without copying them. You keep your normal files untouched and write one extra file, called kustomization.yaml, that lists those files and the changes to apply on top: put everything in this namespace, add this word to the front of every name, use this image version, change this one setting. It is like keeping one master recipe and clipping a note to it that says 'for the party version, double the sugar and use a bigger pan'. The original recipe never changes, and the note is easy to read. Kustomize is built into kubectl, so there is nothing extra to install.",
  "body": [
   "Kustomize customizes plain Kubernetes YAML (YAML Ain't Markup Language) without templates. You keep ordinary manifests that could be applied on their own, and you describe the changes to make on top of them in a file named `kustomization.yaml`. Kustomize reads that file, loads the listed manifests, applies the transformations, and outputs the final YAML. It is built into kubectl, so no extra tool is needed on the exam: `kubectl kustomize <dir>` prints the result and `kubectl apply -k <dir>` applies it. This lesson covers the fields inside the file; the next covers organizing bases and overlays.",
   "The `resources` field is the starting point. It lists the manifest files, or other directories that contain their own `kustomization.yaml`, to include in the build. Paths are relative to the kustomization file. Every transformer field then modifies everything in that list. `namespace` sets the namespace on every namespaced resource, overriding whatever the manifests say, while leaving cluster-scoped objects alone. `namePrefix` and `nameSuffix` add text to every resource name, and Kustomize is smart about references: if it renames a ConfigMap from `web-config` to `prod-web-config`, it also updates the Deployment that mounts it and an Ingress backend that points at a renamed Service.",
   "Labels need more care because of selectors. `commonLabels` adds labels to every resource and also to selectors and Pod templates. That sounds convenient, but a Deployment's `spec.selector` is immutable after creation, so applying a new common label to an existing Deployment fails with a field is immutable error. `commonLabels` is deprecated in favor of `labels`, a list of entries, each with `pairs` of keys and values and an `includeSelectors` flag. With `includeSelectors: false`, which is the default for `labels`, only metadata is labeled and selectors are left untouched. Setting `includeTemplates: true` also labels Pod templates without touching selectors. `commonAnnotations` adds annotations to every resource in the same spirit.",
   "```yaml\napiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n- deployment.yaml\n- service.yaml\nnamespace: shop\nnamePrefix: prod-\nlabels:\n- pairs:\n    env: prod\n  includeSelectors: false\nimages:\n- name: nginx\n  newTag: \"1.27\"\npatches:\n- path: replicas-patch.yaml\n  target:\n    kind: Deployment\n    name: web\nconfigMapGenerator:\n- name: web-config\n  literals:\n  - LOG_LEVEL=info\n```",
   "The `images` field changes container images without editing the Deployment. Each entry matches on `name`, which is the image name as written in the manifest, such as `nginx`, not the container name. It then sets `newName` to swap the repository, `newTag` to change the tag, or `digest` to pin an exact image digest. Quote tags that look like numbers, such as `\"1.27\"`, so YAML does not read them as decimals and drop a trailing zero.",
   "The `patches` field applies partial changes to selected resources. A patch can be a strategic merge patch, a small YAML fragment that looks like the resource but contains only the identifying fields and the fields you want to change, for example a Deployment named `web` with just `spec.replicas: 6`. Or it can be a JSON (JavaScript Object Notation) 6902 patch, a list of explicit operations with `op`, `path` and `value`, such as `op: replace`, `path: /spec/replicas`, `value: 6`. Each entry gives the patch inline with `patch:` or from a file with `path:`, and can use `target` to select resources by kind, name, label selector or annotation, so one patch can apply to many objects.",
   "Generators create objects for you. `configMapGenerator` builds ConfigMaps from `literals` (key=value pairs), `files` (each file becomes a key), or `envs` (an env file of key=value lines). `secretGenerator` does the same for Secrets, encoding the values for you. By default the generated name gets a hash of the content appended, such as `web-config-5g7k2m9b4t`, and Kustomize rewrites every reference to it in Deployments and other workloads. When the content changes, the hash and therefore the name change, so Deployments that reference it get a new Pod template and roll out automatically. That solves the common problem of Pods not noticing a changed ConfigMap. Set `generatorOptions` with `disableNameSuffixHash: true` if you need a fixed name, accepting that changes will no longer trigger rollouts.",
   "You will also meet older field names. Kustomizations written a few years ago may use `patchesStrategicMerge` and `patchesJson6902`. These still work but are deprecated in favor of the single `patches` field, which handles both patch types. If you meet them in an exam task, you can keep them as they are or convert them; either produces the same output. Whatever you change, preview the result with `kubectl kustomize <dir>` before applying, and look at the names, namespace, labels and images in the output."
  ],
  "analogy": "Kustomize is like a photo editor that never alters the original picture. The original manifests are the photo, and kustomization.yaml is the list of saved edits: crop, rename, apply a filter, swap one color. You can open the same photo with different edit lists for different uses. The comparison stops at labels: some edits, such as adding labels to selectors with commonLabels, collide with fields Kubernetes refuses to change on a live Deployment.",
  "terms": [
   [
    "kustomization.yaml",
    "The file that lists resources and the transformations Kustomize applies to them."
   ],
   [
    "namePrefix",
    "Text added to the start of every resource name, with references to those names updated."
   ],
   [
    "labels / commonLabels",
    "Fields that add labels to all resources; commonLabels also changes selectors and is deprecated."
   ],
   [
    "images",
    "Transformer that changes an image's name, tag or digest, matching on the image name in the manifest."
   ],
   [
    "patches",
    "Partial changes, strategic merge or JSON 6902, applied to resources chosen by target."
   ],
   [
    "configMapGenerator",
    "Creates ConfigMaps from literals, files or env files, with a content hash appended to the name."
   ]
  ],
  "example": "A team keeps one Deployment and Service in a base folder. For production they add a kustomization with `namespace: prod`, `namePrefix: prod-`, an `images` entry setting the tag to `\"2.3\"`, a patch raising replicas to 6, and a `configMapGenerator` with `LOG_LEVEL=warn`, without copying or editing the original YAML. `kubectl kustomize` shows `prod-web` in namespace `prod` mounting `prod-web-config-<hash>`.",
  "mistakes": [
   [
    "Setting `images.name` to the container name.",
    "images matches the image name as written in the manifest, such as nginx, not the container's name field."
   ],
   [
    "Using commonLabels on a kustomization for Deployments that already exist.",
    "commonLabels also changes selectors, which are immutable on Deployments, so the apply fails. Use labels with includeSelectors: false."
   ],
   [
    "Hard-coding the generated ConfigMap name, such as web-config, in a command or another manifest outside the build.",
    "Generated names carry a content hash suffix. Look them up with kubectl get cm, and let Kustomize rewrite references inside the build."
   ],
   [
    "Thinking Kustomize needs a separate install or a templating syntax.",
    "It is built into kubectl (kubectl kustomize, kubectl apply -k) and works on plain YAML with no placeholders."
   ]
  ],
  "tryit": [
   [
    "A task asks you to make every resource in `/opt/web` go to namespace `qa`, get a `qa-` prefix, and use image `nginx:1.27` instead of `nginx:1.25`, without editing deployment.yaml. The Deployment's container is named `frontend`. What goes in kustomization.yaml?",
    "List the manifests under `resources`, then add `namespace: qa`, `namePrefix: qa-`, and an `images` entry with `name: nginx` and `newTag: \"1.27\"`. The images name is the image, nginx, not the container name frontend. Preview with `kubectl kustomize /opt/web`."
   ],
   [
    "Your team edits a literal in `configMapGenerator`, applies the kustomization, and is surprised that all Pods restart. A teammate wants to add `disableNameSuffixHash: true` to stop this. What do you tell them?",
    "The restart is the hash suffix doing its job: new content means a new ConfigMap name, so the Deployment's Pod template changes and the Pods pick up the new values. Disabling the hash keeps a fixed name, but then Pods using the values as environment variables will not see changes until they are restarted by hand."
   ]
  ],
  "tip": "The `images` name matches the image as written in the manifest, not the container name. Generated ConfigMaps have a hash suffix, so look them up with `kubectl get cm` rather than guessing the name, and prefer `labels` over the deprecated `commonLabels`.",
  "check": [
   [
    "What does `namespace: dev` in kustomization.yaml do?",
    "It sets the namespace of every namespaced resource in the build to dev."
   ],
   [
    "Why does configMapGenerator add a hash suffix to the name?",
    "So a content change produces a new name, updating references and triggering a rollout of Pods that use it."
   ],
   [
    "What risk does commonLabels carry for existing Deployments?",
    "It also adds labels to selectors, and Deployment selectors are immutable, so applying it to an existing Deployment can fail."
   ],
   [
    "Name the two kinds of patch the patches field accepts.",
    "Strategic merge patches, which look like a partial resource, and JSON 6902 patches, which list op, path and value."
   ]
  ]
 },
 {
  "t": "Applying overlays with kubectl apply -k and previewing with kubectl kustomize",
  "hook": "It is Wednesday afternoon at Lark Valley Credit Union, and a change ticket lands in your queue: promote the loan-calculator app to staging using the existing Kustomize layout in `/opt/loans`. The folder has a `base` directory and an `overlays` directory with `dev`, `staging` and `prod` inside. Last month someone on the team ran `kubectl apply -f` against the base by mistake and created unprefixed objects in the default namespace that took a day to untangle. This time your manager wants to see exactly what will be created before anything touches the cluster, and wants a one-line way to remove it all if the test goes badly. Which commands give you a safe preview, a precise diff, and a clean apply and cleanup?",
  "simple": "Think of a base as a standard house plan and overlays as small lists of changes for each buyer: one wants a bigger kitchen, another a different paint color. The base plan stays the same, and each overlay says 'start from the standard plan, then change these things'. In Kubernetes, the base folder holds the shared configuration files, and each overlay folder holds a small file that points back to the base and adds what is different for dev, staging or production. Before building anything you can ask kubectl to print the final plan, like a print preview. When you are happy, one command builds it, and another command takes it all down again.",
  "body": [
   "Kustomize projects are usually organized as a base and one or more overlays. The base is a directory holding the shared manifests and a `kustomization.yaml` that lists them under `resources`. Each overlay is another directory with its own `kustomization.yaml` that points at the base under `resources` and adds environment-specific changes: a namespace, a name prefix, more replicas, a different image tag, extra ConfigMap values. The base never needs to know which overlays exist, so you can add a new environment by adding a folder, without touching the shared files. This separation is the main reason teams adopt Kustomize.",
   "```text\napp/\n  base/\n    deployment.yaml\n    service.yaml\n    kustomization.yaml     # resources: [deployment.yaml, service.yaml]\n  overlays/\n    dev/\n      kustomization.yaml   # resources: [../../base], namespace: dev\n    prod/\n      kustomization.yaml   # resources: [../../base], namespace: prod, patches...\n      replicas.yaml\n```",
   "An overlay's file is typically short. A production overlay might contain `resources: [../../base]`, `namespace: prod`, `namePrefix: prod-`, an `images` entry with a new tag, and a `patches` entry that points at `replicas.yaml`, a strategic merge patch setting `spec.replicas: 6` on the Deployment named `web`. Note that the patch refers to the base name, `web`, not the prefixed name; Kustomize matches patches against the resources as they come from the base and then applies the prefix. Overlays can also stack, with one overlay listing another as its resource, though for the exam a single layer is usual.",
   "Before applying anything, preview the result. `kubectl kustomize overlays/prod` builds the overlay and prints the final YAML (YAML Ain't Markup Language) to standard output without contacting the cluster. The standalone `kustomize build overlays/prod` command does the same if the separate tool is installed, but you cannot count on it being present, so prefer the kubectl form. Read the output to confirm the namespace, names, labels and images match what the task asked for. Piping it through `grep` is a quick check, for example `kubectl kustomize overlays/prod | grep -E 'namespace|image:|name:'`, and redirecting it to a file lets you read it calmly or keep it as evidence.",
   "To apply the overlay, use the `-k` flag instead of `-f`: `kubectl apply -k overlays/prod`. kubectl builds the kustomization in memory and applies the result, printing a line for each object, such as `deployment.apps/prod-web created` or `service/prod-web unchanged`. The argument is always a directory containing a `kustomization.yaml`, not the file itself; pointing `-k` at the file produces an error. The same flag works with other commands. `kubectl delete -k overlays/prod` removes everything the overlay creates, `kubectl diff -k overlays/prod` shows what would change against the live cluster in a unified diff format, and `kubectl get -k overlays/prod` lists the resulting objects with their current state.",
   "```bash\nkubectl kustomize overlays/prod          # preview only\nkubectl diff -k overlays/prod            # compare with the cluster\nkubectl apply -k overlays/prod           # create or update\nkubectl get deploy -n prod\nkubectl delete -k overlays/prod          # clean up\n```",
   "The three ways to look before you leap answer different questions. `kubectl kustomize` answers 'What will the YAML be?' and works with no cluster at all. `kubectl diff -k` answers 'What will change in the cluster?' by sending the built objects to the API (application programming interface) server for a server-side dry run and comparing them with the live objects; lines starting with a minus sign are being removed and lines with a plus sign are being added. `kubectl apply -k --dry-run=server` validates the whole build against the API server without saving anything, which catches errors such as a misspelled field or a missing namespace.",
   "Most errors come from paths and namespaces. Paths in `resources` are relative to the kustomization file that lists them, which is why an overlay two levels down usually writes `../../base`. An error such as 'accumulating resources ... must resolve to a file or a kustomization directory' means a path is wrong, so count the directory levels again. Another common failure is applying an overlay that sets `namespace: prod` when that namespace does not exist, which fails with a namespace not found error. Either create it first with `kubectl create namespace prod`, or include a Namespace manifest in the overlay's resources so the build creates it.",
   "One more detail concerns versions. The Kustomize version built into kubectl may lag behind the standalone tool, so very new fields might not be recognized and could produce an unknown field error. For the exam, stick with the core fields, which kubectl handles well: `resources`, `namespace`, `namePrefix`, `labels`, `images`, `patches` and the generators. After applying, verify with ordinary commands such as `kubectl get deploy,svc,cm -n prod` and `kubectl rollout status deploy/prod-web -n prod`, remembering to use the prefixed names."
  ],
  "analogy": "A base and its overlays work like a master slide template and the individual presentations built from it. The template holds the shared layout, and each presentation changes only the title, colors and a few slides. Previewing with kubectl kustomize is like exporting a PDF to check before presenting, and kubectl diff -k is like comparing that export with the version already on the shared screen. The analogy stops at deletion: kubectl delete -k removes every object the overlay builds, not just the pieces that differ from the base.",
  "terms": [
   [
    "Base",
    "A kustomization directory holding shared manifests that overlays build upon."
   ],
   [
    "Overlay",
    "A kustomization that references a base and adds environment-specific changes."
   ],
   [
    "kubectl apply -k",
    "Builds the kustomization in a directory and applies the result to the cluster."
   ],
   [
    "kubectl kustomize",
    "Builds a kustomization and prints the resulting YAML without applying it."
   ],
   [
    "kubectl diff -k",
    "Builds a kustomization and shows how it differs from the live objects in the cluster."
   ],
   [
    "kubectl delete -k",
    "Deletes every object that the kustomization in a directory would create."
   ]
  ],
  "example": "A task gives you `/opt/app` with `base` and `overlays/staging`. You run `kubectl kustomize /opt/app/overlays/staging` and notice the image tag is still old, fix the `images` entry in the overlay, preview again, run `kubectl diff -k /opt/app/overlays/staging` to see only the Deployment changing, then run `kubectl apply -k /opt/app/overlays/staging` and confirm with `kubectl get pods -n staging`.",
  "mistakes": [
   [
    "Passing the file path, as in `kubectl apply -k overlays/prod/kustomization.yaml`.",
    "-k takes a directory that contains kustomization.yaml, so the command is kubectl apply -k overlays/prod."
   ],
   [
    "Running `kubectl apply -f` on the overlay or base directory.",
    "-f applies the raw files without the Kustomize transformations, so prefixes, namespaces and patches are lost. Use -k."
   ],
   [
    "Writing `resources: [base]` in an overlay two levels below the app folder.",
    "Paths are relative to the kustomization file, so the overlay needs ../../base. A wrong path gives an 'accumulating resources' error."
   ],
   [
    "Assuming kubectl kustomize changes the cluster.",
    "It only prints the built YAML. Nothing is created until you run kubectl apply -k."
   ]
  ],
  "tryit": [
   [
    "You run `kubectl apply -k overlays/qa` and get an error saying namespace \"qa\" not found. The overlay sets `namespace: qa`. The task says the overlay should be self-contained so it works on any cluster. What do you change?",
    "Add a Namespace manifest named qa, for example namespace.yaml, to the overlay's resources list, so the build creates the namespace along with everything else. Creating it by hand with kubectl create namespace would work once but would not make the overlay self-contained."
   ],
   [
    "Before a production change, your manager asks for proof of exactly which live fields will change, not just the final YAML. Which command do you run, and why is kubectl kustomize alone not enough?",
    "Run `kubectl diff -k overlays/prod`. kubectl kustomize shows the desired YAML but not how it compares with what is running; diff performs a server-side comparison and shows only the lines that would change."
   ]
  ],
  "tip": "`-k` takes a directory, not a file, and `kubectl kustomize` (no apply) is the safe preview. Use `kubectl diff -k` to see exactly what will change, and remember that resources paths are relative to the kustomization file.",
  "check": [
   [
    "How do you see an overlay's final YAML without changing the cluster?",
    "`kubectl kustomize <overlay-dir>` (or `kustomize build <overlay-dir>` if the standalone tool is installed)."
   ],
   [
    "What does an overlay's resources list usually point at?",
    "The base directory, via a relative path such as ../../base."
   ],
   [
    "How do you remove everything an overlay created?",
    "`kubectl delete -k <overlay-dir>`."
   ],
   [
    "What does an 'accumulating resources ... must resolve to a file or a kustomization directory' error usually mean?",
    "A path in resources is wrong, often the relative path from the overlay to the base."
   ]
  ]
 },
 {
  "t": "API deprecations and removals: finding current apiVersions with kubectl api-resources, api-versions and explain",
  "hook": "The platform team at Saltmarsh Logistics has just upgraded the staging cluster, and by 9 a.m. your team's deploy pipeline is red. The error reads: `no matches for kind \"PodDisruptionBudget\" in version \"policy/v1beta1\"`. Grace, who wrote the manifest three years ago, has since moved teams. The object type clearly still exists, because other teams have PodDisruptionBudgets running, so why does the cluster suddenly claim not to know it? You have no browser on the jump host, only kubectl. How do you find out which API versions this particular cluster serves, and how do you work out the correct field structure for the new version without guessing?",
  "simple": "Every Kubernetes configuration file starts by saying which version of the rules it follows, much like a form that says 'use the 2024 edition of this form'. Over time, Kubernetes retires old editions of these rules. When an edition is retired, the cluster stops accepting forms written for it, even though the kind of form still exists in a newer edition. kubectl can tell you which editions your cluster accepts today and can show you the exact layout of each form, field by field. So when an old file stops working, you look up the current edition, update the version line, and check whether any fields moved.",
  "body": [
   "Every Kubernetes object has an `apiVersion`, which names an API (application programming interface) group and a version. Deployments use `apps/v1`, where `apps` is the group and `v1` the version, and Jobs use `batch/v1`. Core objects such as Pods, Services, ConfigMaps and Secrets belong to the core group, which has no name, so their apiVersion is written simply as `v1`. Together with `kind`, the apiVersion tells the API server exactly which schema to use when it reads your manifest.",
   "APIs mature through stages. An alpha version, such as `v1alpha1`, is experimental, may be disabled by default, and can change or vanish without notice. A beta version, such as `v1beta1`, is more complete but can still change. A stable version, such as `v1`, also called generally available (GA), is the one to use for anything you need to keep. Beta and alpha versions are eventually deprecated and then removed from the API server. After removal, a manifest that still uses the old version fails to apply, even though the object type itself still exists under a newer version. That is why the error message says 'no matches for kind' rather than 'unknown kind'.",
   "Kubernetes publishes a deprecation policy so that these removals are predictable. Stable versions are not removed within a major version of Kubernetes, while beta versions are deprecated with advance notice and removed in a later release. When you send a request using a deprecated version, the API server returns a warning, and kubectl prints it in your terminal, for example `Warning: <group/version> <Kind> is deprecated in v1.xx+, unavailable in v1.yy+; use <new group/version> <Kind>`. Treat those warnings as a to-do list, because the next cluster upgrade may turn each of them into a failed deploy.",
   "Three kubectl commands tell you what the cluster you are connected to actually serves, which matters more than any documentation page because clusters differ. `kubectl api-resources` lists every resource type with its short names, API version, whether it is namespaced, and its kind. Filter it with grep: `kubectl api-resources | grep -i cronjob` shows a line like `cronjobs  cj  batch/v1  true  CronJob`. `kubectl api-resources --api-group=networking.k8s.io` lists one group, and `--namespaced=false` lists cluster-scoped types. `kubectl api-versions` lists every group/version pair the server offers, one per line, so `kubectl api-versions | grep autoscaling` shows which HorizontalPodAutoscaler (HPA) versions exist on this cluster.",
   "```bash\nkubectl api-resources | grep -iE 'ingress|cronjob|horizontal'\nkubectl api-versions | grep -E 'batch|networking|autoscaling'\nkubectl explain ingress\nkubectl explain ingress.spec.rules.http.paths --recursive\nkubectl explain hpa --api-version=autoscaling/v2\n```",
   "Once you know the version, `kubectl explain <resource>` shows the built-in documentation for that type. Its output starts with the GROUP and VERSION it is describing, which is the server's preferred version, followed by a description and a list of fields with their types. You can drill down field by field with dots, such as `kubectl explain deployment.spec.strategy` or `kubectl explain pod.spec.containers.livenessProbe`. Adding `--recursive` prints the whole field tree below that point, which is an excellent way to find the correct YAML (YAML Ain't Markup Language) structure during the exam without leaving the terminal. `--api-version` lets you explain a specific version when more than one is served, for example to compare the old and new layout.",
   "A practical routine handles most broken manifests. Suppose a file fails with 'no matches for kind \"Ingress\" in version \"extensions/v1beta1\"'. First, find the current version with `kubectl api-resources | grep -i ingress`, which shows `networking.k8s.io/v1`. Second, update the `apiVersion` line. Third, run `kubectl explain` on the parts whose structure changed, such as `kubectl explain ingress.spec.rules.http.paths.backend --recursive`, and fix the fields to match. Finally, run `kubectl apply --dry-run=server -f file.yaml`, which sends the manifest to the live API server for full validation without creating anything. A client-side dry run is weaker here, because only the server knows which versions and fields it really accepts.",
   "There is also a `kubectl convert` plugin that rewrites manifests to newer versions automatically. It is a separate download and not part of kubectl by default, so do not rely on it being installed in an exam environment. The commands in this lesson are always available, and with practice the whole routine takes a minute or two. It also pays to check charts and Kustomize bases you depend on, since an old apiVersion buried in a template fails in exactly the same way."
  ],
  "analogy": "API versions are like editions of a paper tax form. The type of form, say the annual return, keeps existing, but the government retires old editions and stops accepting them, even if your answers were correct. kubectl api-versions is the list of editions the office currently accepts, and kubectl explain is the instruction booklet for one edition. The comparison stops at warnings: Kubernetes tells you in advance, every time you submit a deprecated edition, which a tax office rarely does.",
  "terms": [
   [
    "apiVersion",
    "The API group and version of an object, such as apps/v1; core objects use just v1."
   ],
   [
    "Deprecation",
    "An API version is marked for future removal; it still works but produces warnings."
   ],
   [
    "Removal",
    "The API server stops serving a version, so manifests using it fail with 'no matches for kind'."
   ],
   [
    "kubectl api-resources",
    "Lists resource types with short names, API version, namespaced flag and kind."
   ],
   [
    "kubectl api-versions",
    "Lists every group/version pair the API server currently serves."
   ],
   [
    "kubectl explain",
    "Shows documentation and field structure for a resource type and version, with --recursive for the full tree."
   ]
  ],
  "example": "A developer inherits an old chart that sets `apiVersion: policy/v1beta1` on a PodDisruptionBudget. Applying it fails with 'no matches for kind'. `kubectl api-resources | grep -i disruption` shows `policy/v1`, so they update the apiVersion, check the fields with `kubectl explain pdb.spec`, and validate with `kubectl apply --dry-run=server -f pdb.yaml` before applying for real.",
  "mistakes": [
   [
    "Reading 'no matches for kind' as proof that the object type no longer exists.",
    "It usually means that particular group/version was removed. The kind still exists under a newer version, which api-resources will show."
   ],
   [
    "Ignoring deprecation warnings because the apply succeeded.",
    "Deprecated versions still work today but will be removed in a later release. Update the manifest before the next upgrade breaks it."
   ],
   [
    "Writing `core/v1` as the apiVersion of a Pod or ConfigMap.",
    "The core group has no name, so core objects use just v1."
   ],
   [
    "Relying on kubectl convert during the exam.",
    "It is a separate plugin that may not be installed. Use api-resources, explain and a server-side dry run instead."
   ]
  ],
  "tryit": [
   [
    "A manifest for a HorizontalPodAutoscaler uses `autoscaling/v2beta2`, and the cluster rejects it. You are not sure whether this cluster serves `autoscaling/v2`. What do you run, in what order, to fix and validate the file?",
    "Run `kubectl api-versions | grep autoscaling` (or `kubectl api-resources | grep -i horizontal`) to see the served versions. Change apiVersion to autoscaling/v2, check the metric structure with `kubectl explain hpa.spec.metrics --api-version=autoscaling/v2 --recursive`, then validate with `kubectl apply --dry-run=server -f hpa.yaml`."
   ],
   [
    "A teammate says client-side dry runs are enough to test version updates because they are faster. A manifest passes `--dry-run=client` but fails on the real apply. What explains this, and what should the team use instead?",
    "A client-side dry run does not check against the API server's served versions or full schema, so a removed version or wrong field can slip through. Use `--dry-run=server`, which validates against the live API server without saving anything."
   ]
  ],
  "tip": "'no matches for kind X in version Y' almost always means the API version was removed. `kubectl api-resources | grep -i <kind>` gives the right one in seconds, and `kubectl explain <kind>.<field> --recursive` gives the structure.",
  "check": [
   [
    "Which command lists every group/version the API server serves?",
    "`kubectl api-versions`."
   ],
   [
    "How can you see the YAML field structure of an Ingress rule without a browser?",
    "`kubectl explain ingress.spec.rules --recursive`."
   ],
   [
    "What does a deprecation warning from kubectl mean?",
    "The API version still works now but is scheduled for removal, so the manifest should be moved to the newer version."
   ],
   [
    "What is the apiVersion of a ConfigMap, and why?",
    "v1, because ConfigMaps belong to the core group, which has no group name."
   ]
  ]
 },
 {
  "t": "Updating manifests to supported API groups (networking.k8s.io/v1 Ingress, batch/v1 CronJob, autoscaling/v2 HPA)",
  "hook": "The night before a cluster upgrade at Quarry Lane Pharmacy, Ben runs a quick check and finds three files still on old API versions: the storefront Ingress, the nightly inventory CronJob and the checkout autoscaler. He changes the three `apiVersion` lines, runs a server-side dry run, and gets two errors back: the Ingress says `serviceName` is an unknown field and a path is missing `pathType`, and the autoscaler complains about `targetAverageUtilization`. Only the CronJob passes. It is 11 p.m., the upgrade window opens at midnight, and you are the reviewer. Why did one file need a one-line change while the other two need restructuring, and what should each finished manifest look like?",
  "simple": "When Kubernetes retires an old version of a configuration format, sometimes only the version label changes, and sometimes the layout inside changes too. It is like a new edition of a paper form: some editions just print a new year at the top, while others move boxes around and add a required box. Three examples come up often. The Ingress format, which routes web traffic into the cluster, moved its fields around and added a required box. The CronJob format, which runs tasks on a schedule, mostly just changed its label. The autoscaler format, which adds or removes copies of your app based on load, reorganized how you describe its target. Knowing which kind of change you face saves a lot of trial and error.",
  "body": [
   "Changing `apiVersion` is sometimes all you need, but often the field structure changed as well, and the API (application programming interface) server will reject fields it no longer knows. The exam likes three examples, each with a stable version you should use today: Ingress in `networking.k8s.io/v1`, CronJob in `batch/v1` and HorizontalPodAutoscaler (HPA) in `autoscaling/v2`. Learning what changed in each one gives you a pattern for handling any other migration: update the version, compare the structure, fix the fields, validate on the server.",
   "Ingress moved from `extensions/v1beta1` and `networking.k8s.io/v1beta1` to `networking.k8s.io/v1`, and the backend format changed. The old flat `serviceName` and `servicePort` fields became a nested `service` object with a `name` and a `port`, and the port is itself an object holding either `number` (such as 80) or `name` (such as `http`). Each path now requires a `pathType` of `Prefix`, `Exact` or `ImplementationSpecific`. `Prefix` matches the path and anything below it split on slashes, `Exact` matches only that exact path, and `ImplementationSpecific` leaves matching to the Ingress controller. The old `kubernetes.io/ingress.class` annotation is replaced by the `ingressClassName` field in the spec, which names an IngressClass object. A default backend, if you use one, moved from `spec.backend` to `spec.defaultBackend`.",
   "```yaml\n# old (removed)\n#   backend:\n#     serviceName: web\n#     servicePort: 80\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: web\nspec:\n  ingressClassName: nginx\n  rules:\n  - host: shop.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web\n            port:\n              number: 80\n```",
   "CronJob moved from `batch/v1beta1` to `batch/v1`, and here the structure is essentially unchanged. `schedule`, `concurrencyPolicy`, `suspend`, `startingDeadlineSeconds`, `jobTemplate`, `successfulJobsHistoryLimit` and `failedJobsHistoryLimit` all keep the same names and positions. Usually you only change the apiVersion line, and you can optionally use newer fields such as `timeZone`, which lets the schedule run in a named time zone instead of the controller's local time. This is the case where a one-line change really is enough, and the exam may test that you do not overcomplicate it.",
   "HorizontalPodAutoscaler moved from `autoscaling/v2beta1` and `autoscaling/v2beta2` to `autoscaling/v2`. Be careful with `autoscaling/v1`: it still exists, but it only supports a CPU (central processing unit) target through a single `targetCPUUtilizationPercentage` field, so it cannot express memory or custom metrics. In v2, metrics are a list, and a resource metric is nested. Each entry has `type: Resource`, then `resource.name: cpu` or `memory`, and `resource.target` with `type: Utilization` and `averageUtilization`, or `type: AverageValue` with `averageValue`. The v2beta1 style `targetAverageUtilization` field no longer exists, which is exactly the error the hook describes. Version 2 also offers a `behavior` section for tuning how quickly the HPA scales up and down. Remember that a Utilization target is a percentage of the containers' resource requests, so the target Deployment's containers must declare a CPU request; without one, `kubectl describe hpa` reports that it failed to get CPU utilization and the HPA cannot scale.",
   "```yaml\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata:\n  name: web\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: web\n  minReplicas: 2\n  maxReplicas: 10\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target:\n        type: Utilization\n        averageUtilization: 70\n```",
   "A fast, reliable method is to generate fresh YAML (YAML Ain't Markup Language) with the current version rather than hand-editing old structure. `kubectl create ingress web --rule=\"shop.example.com/*=web:80\" --dry-run=client -o yaml` produces a v1 Ingress, where the trailing `*` makes the path a Prefix match and leaving it off makes it Exact. `kubectl create cronjob report --image=busybox --schedule=\"0 2 * * *\" --dry-run=client -o yaml -- /bin/sh -c 'date'` produces a batch/v1 CronJob. `kubectl autoscale deploy web --min=2 --max=10 --cpu-percent=70 --dry-run=client -o yaml` produces an HPA you can compare with; check the apiVersion it prints and the flag names in `kubectl autoscale --help`, since these have changed across kubectl releases. Then copy the remaining settings from the old file into the generated one.",
   "Whichever way you build the new file, check and validate it. `kubectl explain ingress.spec.rules.http.paths.backend --recursive` and `kubectl explain hpa.spec.metrics --recursive` show the exact current structure. Finish with `kubectl apply --dry-run=server -f file.yaml`, which validates against the live API server without saving anything and reports unknown or missing fields by name. After applying for real, `kubectl describe ingress web` should list the backend as `web:80`, and `kubectl get hpa web` should show a TARGETS column such as `cpu: 12%/70%` once metrics arrive."
  ],
  "analogy": "Migrating these manifests is like moving to a new home. For the CronJob, you just update your address on the mailbox; everything inside stays where it was. For the Ingress and the HPA, the new house has a different floor plan, so the furniture must be rearranged: the backend's two loose fields go into one nested cabinet, and every path gets a required label. The comparison stops at checking: kubectl explain is a floor plan you can always consult, which real moves rarely provide.",
  "terms": [
   [
    "networking.k8s.io/v1",
    "Stable API group/version for Ingress, IngressClass and NetworkPolicy."
   ],
   [
    "pathType",
    "Required Ingress path field in v1: Prefix, Exact or ImplementationSpecific."
   ],
   [
    "ingressClassName",
    "Ingress v1 spec field naming the IngressClass, replacing the old kubernetes.io/ingress.class annotation."
   ],
   [
    "autoscaling/v2",
    "Stable HPA version with a metrics list supporting resource, pods, object and external metrics."
   ],
   [
    "batch/v1",
    "Stable group/version for Job and CronJob."
   ],
   [
    "averageUtilization",
    "HPA v2 target value, as a percentage of the Pods' requests, used with target type Utilization."
   ]
  ],
  "example": "An old Ingress with `serviceName: api` and `servicePort: 8080` fails to apply. The developer changes the apiVersion to networking.k8s.io/v1, rewrites the backend as `service: {name: api, port: {number: 8080}}`, adds `pathType: Prefix`, replaces the class annotation with `ingressClassName: nginx`, and the server-side dry run passes.",
  "mistakes": [
   [
    "Changing only the apiVersion of an old Ingress.",
    "v1 also requires the nested service backend with port.number or port.name and a pathType on every path."
   ],
   [
    "Restructuring a CronJob's spec when moving it to batch/v1.",
    "The CronJob structure is essentially unchanged; usually the apiVersion line is the only edit needed."
   ],
   [
    "Using autoscaling/v1 for a memory-based autoscaler.",
    "autoscaling/v1 supports only a CPU target through targetCPUUtilizationPercentage. Memory and other metrics need autoscaling/v2."
   ],
   [
    "Keeping targetAverageUtilization in a v2 HPA.",
    "In v2 the target is nested: resource.target with type Utilization and averageUtilization."
   ]
  ],
  "tryit": [
   [
    "You must expose Service `docs` on port name `http` at host `docs.example.com`, path `/guide` and everything under it, using the IngressClass `public`. The old manifest uses `extensions/v1beta1` with `serviceName` and `servicePort: http`. What are the key lines of the new manifest?",
    "Use `apiVersion: networking.k8s.io/v1`, `spec.ingressClassName: public`, a rule for host docs.example.com with path `/guide` and `pathType: Prefix`, and a backend of `service: {name: docs, port: {name: http}}`. Prefix covers everything under /guide, and port.name is used because the old file referred to a named port."
   ],
   [
    "A team wants its HPA to keep average memory use near 75 percent of requests, but the existing file is autoscaling/v1. A teammate proposes adding a memory field to the v1 spec. What do you advise?",
    "autoscaling/v1 has no way to express memory. Rewrite it as autoscaling/v2 with a metrics entry of type Resource, resource name memory, and target type Utilization with averageUtilization 75, then validate with a server-side dry run."
   ]
  ],
  "tip": "For Ingress, changing only the apiVersion is not enough: fix the backend format, add pathType and use ingressClassName. For CronJob, the apiVersion change is usually all that is needed. For HPA, nest the target under metrics.",
  "check": [
   [
    "What replaced `serviceName` and `servicePort` in a v1 Ingress backend?",
    "A nested `service` object with `name` and `port.number` or `port.name`."
   ],
   [
    "How is a 70% CPU target expressed in autoscaling/v2?",
    "In metrics: type Resource, resource name cpu, target type Utilization with averageUtilization 70."
   ],
   [
    "What is the stable apiVersion for CronJob?",
    "batch/v1."
   ],
   [
    "Which field replaces the kubernetes.io/ingress.class annotation?",
    "spec.ingressClassName."
   ]
  ]
 },
 {
  "t": "Liveness, readiness and startup probes; httpGet, tcpSocket, exec and grpc handlers; timing fields",
  "hook": "At Oakline Insurance, the new quotes service takes about ninety seconds to load its pricing tables when it starts. Every time Hana deploys it, the Pods restart again and again and never become ready, and `kubectl get pods` shows the RESTARTS count climbing past six. Her liveness probe checks `/healthz` every ten seconds and gives up after three failures, so the kubelet kills each container about thirty seconds into its ninety-second warm-up. A colleague suggests setting `initialDelaySeconds: 120` and moving on. That would stop the restarts, but it would also leave a truly hung container running for two minutes after every start. Is there a better way to tell Kubernetes 'be patient while I start, then watch me closely'?",
  "simple": "A probe is a regular health check that Kubernetes runs on your app, like a nurse checking a patient's pulse. There are three kinds, each asking a different question. The liveness check asks 'Are you still working, or should I restart you?' The readiness check asks 'Can you take visitors right now?' The startup check asks 'Have you finished waking up yet?' and holds off the other two until the answer is yes, so a slow starter is not mistaken for a broken one. Each check can be done by loading a web page, knocking on a network port, running a small command inside the app, or asking a standard health question. Timing settings control how often to check and how many misses count as a failure.",
  "body": [
   "A running process is not necessarily a healthy one. It might be deadlocked, still loading data, or unable to reach its database, and the container would still look Running to Kubernetes. Probes solve this by letting the kubelet, the agent on each node, check a container regularly and act on the result. Kubernetes has three kinds of probe, each answering a different question, and a container can have any combination of them. If you configure none, Kubernetes assumes the container is healthy and ready as soon as its process starts.",
   "Each probe answers its own question. A liveness probe asks, 'Is this container still working, or should it be restarted?' A readiness probe asks, 'Should this container receive traffic right now?' A startup probe asks, 'Has this slow-starting container finished starting yet?' While a startup probe is configured and has not yet succeeded, the liveness and readiness probes are held off, so a slow start is not mistaken for a hang. Once the startup probe succeeds, it stops running for the rest of the container's life and the other probes take over. The consequences of each probe failing are covered in the next lesson; here the focus is on how to configure them.",
   "Each probe uses exactly one handler, the mechanism that performs the check. `httpGet` sends a Hypertext Transfer Protocol (HTTP) GET request to a `path` and `port`, optionally with a `scheme` of `HTTPS` (HTTP over an encrypted connection) and custom `httpHeaders`; any status code from 200 to 399 counts as success. `tcpSocket` succeeds if a Transmission Control Protocol (TCP) connection to the port can be opened, which proves something is listening but not that it answers correctly. `exec` runs a command inside the container, such as `cat /tmp/healthy` or a small check script, and exit code 0 means success. `grpc` calls the standard gRPC health checking service on a port, for applications built on the gRPC remote procedure call framework that implement that service. The `port` can be a number or the name of a container port, such as `http`.",
   "Choose the lightest handler that genuinely reflects health. An HTTP health endpoint such as `/healthz` is common for web applications, because the application itself decides what healthy means. A TCP check suits plain network services such as a database or cache that do not speak HTTP. An exec probe is flexible but starts a process inside the container on every check, which costs more and depends on the command existing in the image. Keep handlers fast, because a probe that takes longer than its timeout counts as a failure.",
   "```yaml\ncontainers:\n- name: api\n  image: api:1.0\n  ports:\n  - containerPort: 8080\n  startupProbe:\n    httpGet: {path: /healthz, port: 8080}\n    failureThreshold: 30\n    periodSeconds: 10\n  livenessProbe:\n    httpGet: {path: /healthz, port: 8080}\n    periodSeconds: 10\n    failureThreshold: 3\n  readinessProbe:\n    tcpSocket: {port: 8080}\n    initialDelaySeconds: 5\n    periodSeconds: 5\n```",
   "Timing fields are shared by all three probe types. `initialDelaySeconds`, default 0, waits after the container starts before the first check. `periodSeconds`, default 10, is how often to probe. `timeoutSeconds`, default 1, is how long to wait for an answer before counting the attempt as failed. `failureThreshold`, default 3, is how many consecutive failures count as the probe failing. `successThreshold`, default 1, is how many consecutive successes are needed after a failure before the probe counts as passing again; it must be 1 for liveness and startup probes, and only readiness probes may use a higher value. With the defaults, a liveness probe detects a hung container after roughly 30 seconds: three failed checks, ten seconds apart.",
   "A startup probe gives a slow application a time budget of `failureThreshold` multiplied by `periodSeconds`. In the example, 30 failures at 10-second intervals allow up to 300 seconds to start before the kubelet gives up and restarts the container. This is better than a large `initialDelaySeconds` on the liveness probe for two reasons. Checks begin as soon as the application might be up, so a fast start is detected quickly. And once startup succeeds, the liveness probe can stay strict, catching a hang within seconds rather than waiting out a long delay every time.",
   "Probe configuration and results are easy to inspect. `kubectl describe pod <name>` shows Liveness, Readiness and Startup lines under each container, where a Liveness line names the handler, port and path followed by `delay=0s timeout=1s period=10s #success=1 #failure=3`, which is a quick way to confirm your YAML took effect. The Events section records failures, for example `Liveness probe failed: HTTP probe failed with statuscode: 500` or `Readiness probe failed: dial tcp 10.1.2.3:8080: connect: connection refused`. The READY column of `kubectl get pods` reflects readiness, and the RESTARTS column rises when liveness or startup probes fail. To find the exact field names quickly, use `kubectl explain pod.spec.containers.livenessProbe`."
  ],
  "analogy": "Probes are like the checks a hospital makes on a patient. The startup probe is the recovery room after surgery: staff give the patient time to wake up and do not raise alarms for slow responses. The liveness probe is the heart monitor, and a flat line triggers resuscitation, a restart. The readiness probe is the question 'Can this patient have visitors?', and a no simply keeps visitors away. The comparison stops at restarts: a Kubernetes restart replaces the container entirely, and nothing is remembered in memory.",
  "mnemonic": "Default timings in field order, 'I P T F S': initialDelaySeconds 0, periodSeconds 10, timeoutSeconds 1, failureThreshold 3, successThreshold 1. Read the numbers as 0, 10, 1, 3, 1.",
  "terms": [
   [
    "Liveness probe",
    "Checks whether a container should be restarted."
   ],
   [
    "Readiness probe",
    "Checks whether a container should receive Service traffic."
   ],
   [
    "Startup probe",
    "Checks whether a slow container has started, holding off the other probes until it has."
   ],
   [
    "Probe handler",
    "The check method: httpGet, tcpSocket, exec or grpc."
   ],
   [
    "failureThreshold",
    "Consecutive failures needed before the probe is considered failed (default 3)."
   ],
   [
    "successThreshold",
    "Consecutive successes needed after a failure (default 1; must be 1 for liveness and startup)."
   ]
  ],
  "example": "A Java service takes up to two minutes to warm up, and its liveness probe kept killing it at 30 seconds. Adding a startup probe on `/healthz` with `periodSeconds: 10` and `failureThreshold: 15` gives it 150 seconds to start, after which the normal liveness probe with a 1-second timeout takes over. `kubectl get pods` now shows 0 restarts after each deploy.",
  "mistakes": [
   [
    "Fixing a slow-starting app with a very large initialDelaySeconds on the liveness probe.",
    "That delays hang detection after every start. A startup probe gives a start-up budget and lets liveness stay strict afterward."
   ],
   [
    "Believing an httpGet probe needs exactly status 200.",
    "Any status from 200 to 399 counts as success; 400 and above, or no response within the timeout, is a failure."
   ],
   [
    "Setting successThreshold: 2 on a liveness probe.",
    "successThreshold must be 1 for liveness and startup probes; only readiness probes may use a higher value."
   ],
   [
    "Assuming a tcpSocket probe proves the app works correctly.",
    "It only proves a connection can be opened. Use an httpGet or exec check when you need the application itself to report health."
   ]
  ],
  "tryit": [
   [
    "A cache service listens on TCP port 6379 and has no HTTP endpoint. It can take up to 60 seconds to load its data at startup. After that, the team wants a hang detected within about 15 seconds. Which probes and values would you configure?",
    "Use tcpSocket on port 6379 for both a startup and a liveness probe. For startup, periodSeconds 5 with failureThreshold 12 gives a 60-second budget. For liveness, periodSeconds 5 with failureThreshold 3 detects a hang after about 15 seconds."
   ],
   [
    "A Deployment has a readiness probe with `exec: {command: [\"cat\", \"/tmp/ready\"]}`. The Pods never become ready, and the events say the probe failed with an executable file not found error. The image is a minimal image without shell utilities. What is wrong, and what would you change?",
    "The exec handler runs the command inside the container, and `cat` does not exist in the minimal image, so every check fails. Switch to a handler that does not depend on tools in the image, such as httpGet on the application's health endpoint or tcpSocket on its port."
   ]
  ],
  "tip": "Know the defaults: period 10s, timeout 1s, failureThreshold 3, successThreshold 1, initialDelay 0. For slow starters, the preferred answer is a startup probe sized as failureThreshold times periodSeconds, not a huge initialDelaySeconds.",
  "check": [
   [
    "Which HTTP status codes count as success for an httpGet probe?",
    "Any code from 200 up to 399."
   ],
   [
    "How long does a startup probe with periodSeconds 5 and failureThreshold 12 allow?",
    "About 60 seconds (5 x 12) before the container is restarted."
   ],
   [
    "What happens to liveness and readiness probes while a startup probe has not yet succeeded?",
    "They are not run; they start only after the startup probe succeeds."
   ],
   [
    "Which four handlers can a probe use?",
    "httpGet, tcpSocket, exec and grpc."
   ]
  ]
 },
 {
  "t": "What each probe failure does: restart the container vs remove the Pod from Service endpoints",
  "hook": "At 3:40 a.m. the shared database at Tidewater Rail goes into a planned failover that takes ninety seconds. Within a minute, all twelve Pods of the booking API restart at once, then restart again, and by the time the database is back the Pods are stuck in CrashLoopBackOff with growing delays between attempts. Booking is down for twenty minutes instead of ninety seconds. In the morning review, Dev points at the manifest: the liveness probe calls `/health/deep`, which queries the database. Someone asks the obvious question: if the database was the problem, why did Kubernetes keep killing healthy application containers? What should each probe have done when the database disappeared?",
  "simple": "Kubernetes reacts very differently depending on which health check fails. If the liveness check fails, Kubernetes decides the app is stuck and restarts it, like turning a frozen computer off and on again. If the readiness check fails, nothing is restarted; Kubernetes just stops sending new visitors to that copy until it says it is ready again, like a shop putting up a 'back in five minutes' sign. If the startup check runs out of time, the app is restarted, because it never finished starting. Choosing the right check matters. If a shared database goes down, restarting every app copy does not fix the database; it is better to pause visitors with the readiness check.",
  "body": [
   "The three probe types differ most in what happens when they fail. Mixing them up leads either to needless restarts that make an outage worse, or to traffic being sent to Pods that cannot handle it. The exam tests these consequences directly, often by describing symptoms such as a rising restart count or a Service with no endpoints and asking which probe is responsible. This lesson walks through each failure, then turns the consequences into design rules and troubleshooting clues.",
   "A liveness failure restarts the container. When a liveness probe fails `failureThreshold` times in a row, the kubelet kills the container and restarts it according to the Pod's `restartPolicy`, which is `Always` for Pods managed by a Deployment. The Pod itself stays on the same node with the same name and IP (Internet Protocol) address; only the container inside is replaced, and the RESTARTS count in `kubectl get pods` goes up by one. If liveness keeps failing, the kubelet waits longer between each restart, an exponential back-off, and the Pod shows the CrashLoopBackOff status. The events tell the story: `Liveness probe failed: HTTP probe failed with statuscode: 503` followed by `Container api failed liveness probe, will be restarted`.",
   "A readiness failure removes the Pod from rotation without restarting anything. When a readiness probe fails, the kubelet marks the container not ready, the Pod's Ready condition becomes False, and the READY column shows `0/1`. The Pod's address is then marked not ready in the Service's EndpointSlices, so Services, and Ingresses that route through them, stop sending it new traffic. When the probe passes again, the Pod is automatically marked ready and receives traffic once more. Unlike the startup probe, readiness keeps running for the whole life of the container, so it can take a Pod out of rotation temporarily at any time, for example while it is overloaded, rebuilding a cache or waiting for a dependency to return.",
   "A startup failure behaves like a liveness failure. When a startup probe fails `failureThreshold` times, the container is killed and restarted, and the restart count rises. Until the startup probe succeeds, the container is also not ready, so it receives no traffic during its start-up period. The table below summarizes the three outcomes.",
   "```text\nProbe      On failure                      Pod leaves Service?  Container restarted?\nstartup    kill + restart after threshold  yes (not ready yet)  yes\nliveness   kill + restart after threshold  (while restarting)   yes\nreadiness  mark not ready                  yes                  no\n```",
   "Readiness also drives rollouts, which is one of its most valuable effects. A Deployment counts a new Pod as available only when it is ready, so during a rolling update the controller will not remove more old Pods than `maxUnavailable` allows until the new ones pass readiness. If the new version fails its readiness probe, the rollout stalls, the old Pods keep serving users, and `kubectl rollout status` eventually reports that the progress deadline was exceeded. A failing readiness probe therefore protects users from a broken version. The flip side is that a Pod with no readiness probe is considered ready as soon as its containers start, so it can receive traffic before the application is actually able to answer.",
   "Design guidance follows directly from these consequences. Make liveness checks simple and local, testing only whether this process is alive and able to respond, for example an endpoint that returns 200 without calling anything else. If liveness depends on a shared database, a database outage makes every Pod fail liveness and restart at once, which adds restart storms and back-off delays to the outage without fixing anything, exactly as in the hook. Put dependency checks in readiness instead, so Pods step out of rotation without restarting and return the moment the dependency recovers. Give liveness a slightly more forgiving threshold than readiness, so a brief slowdown takes a Pod out of rotation before it ever triggers a restart.",
   "When troubleshooting, let the symptoms point to the probe. A rising RESTARTS count, events mentioning `failed liveness probe` or a CrashLoopBackOff status point to liveness or startup failures. Pods that show Running but `0/1` ready with zero restarts, and a Service whose EndpointSlices list no ready addresses, point to readiness. Use `kubectl describe pod <name>` to read the probe settings and failure events, `kubectl get endpointslices -l kubernetes.io/service-name=<svc>` to see which addresses are ready, and `kubectl logs <pod> --previous` to read the output of the container instance that was killed before the latest restart."
  ],
  "analogy": "Think of a restaurant kitchen. A liveness failure is a cook who has collapsed: the manager sends them home and calls in a replacement, which is a restart. A readiness failure is a cook who is swamped or waiting for a delivery: the manager simply stops sending them new orders until they catch up, and nobody is replaced. The comparison stops at speed: a replaced Kubernetes container starts from scratch, losing anything held in memory, so a restart is never a cheap way to wait out a slow supplier.",
  "terms": [
   [
    "Restart",
    "The liveness/startup failure action: the kubelet kills the container and starts it again in the same Pod."
   ],
   [
    "Not ready",
    "The readiness failure state: the Pod stays running but is removed from Service endpoints."
   ],
   [
    "Ready condition",
    "Pod status condition shown in the READY column that decides whether the Pod receives Service traffic."
   ],
   [
    "CrashLoopBackOff",
    "Status shown when a container keeps failing and the kubelet waits progressively longer between restarts."
   ],
   [
    "Available",
    "A Deployment's term for a ready Pod; rollouts proceed only as new Pods become available."
   ]
  ],
  "example": "During a cache rebuild an API Pod's readiness endpoint returns 503 for a minute. `kubectl get pods` shows it as Running 0/1, the Service routes around it, and when the rebuild finishes it returns to 1/1 with zero restarts. Had the same check been used for liveness, the Pod would have been restarted mid-rebuild, starting the rebuild over.",
  "mistakes": [
   [
    "Thinking a failed readiness probe restarts the container.",
    "Readiness never restarts anything. It marks the Pod not ready and removes it from Service endpoints until the probe passes again."
   ],
   [
    "Putting a database check in the liveness probe to 'catch more problems'.",
    "A database outage would restart every Pod at once without fixing the database. Put dependency checks in readiness."
   ],
   [
    "Believing a liveness failure reschedules the Pod to another node.",
    "Only the container is restarted; the Pod keeps its name, node and IP address."
   ],
   [
    "Assuming a Pod without a readiness probe never receives traffic.",
    "With no readiness probe, the Pod is considered ready as soon as its containers start, possibly before the app can answer."
   ]
  ],
  "tryit": [
   [
    "After a new release, `kubectl get pods` shows three new Pods as Running, READY 0/1, RESTARTS 0, while the old Pods are still 1/1. `kubectl rollout status` is stuck waiting. Users report no errors. What is happening, and is it a problem for users?",
    "The new Pods are failing their readiness probe, so the Deployment does not count them as available and the rolling update stalls, leaving the old Pods serving. Users are protected, which is why they see no errors. Investigate the new version with kubectl describe pod and logs, then fix it or run kubectl rollout undo."
   ],
   [
    "A payment Pod's RESTARTS count climbs every few minutes, and the events show `failed liveness probe, will be restarted` each time the payment provider's API is slow. The liveness probe calls the provider. What change do you recommend?",
    "Make the liveness probe local, checking only that the process responds, and move the provider check into the readiness probe. Then a slow provider takes Pods out of rotation temporarily instead of restarting them."
   ]
  ],
  "tip": "Liveness fails: container restarts. Readiness fails: Pod leaves the Service but keeps running. If a question mentions restarts climbing, think liveness or startup; if it mentions no traffic but no restarts, think readiness.",
  "check": [
   [
    "A Pod shows Running, READY 0/1 and 0 restarts. Which probe is failing?",
    "The readiness probe; readiness failures do not restart the container."
   ],
   [
    "Why should a liveness probe not check a shared database?",
    "A database outage would make every Pod fail liveness and restart at once, causing more disruption without fixing anything."
   ],
   [
    "What does a failed startup probe do after its threshold?",
    "It kills and restarts the container, like a liveness failure."
   ],
   [
    "How does a failing readiness probe affect a rolling update?",
    "New Pods never become available, so the rollout stalls and the old Pods keep serving traffic."
   ]
  ]
 },
 {
  "t": "Kubectl get, describe, get events, top pod/node (metrics-server) for monitoring",
  "hook": "Monday, 10:15 a.m. at Pinecrest Library Services, and a help-desk ticket from Rosa reads: \"The catalog search is slow and sometimes the new recommendations Pod is missing.\" You open a terminal. `kubectl get pods` shows one Pod Running, one Pending for twelve minutes, and one with 4 restarts. That tells you what is happening, but not why the Pending Pod will not start, why the other keeps restarting, or which Pod is eating the CPU. You have four kubectl commands at your fingertips and a habit of reaching for the wrong one first. Which command answers which question, and in what order should you use them to close this ticket quickly?",
  "simple": "Checking on apps in Kubernetes is like checking on a busy restaurant. A quick look around the room tells you what is going on: which tables are full and which are empty. That is `kubectl get`. Asking the manager about one table tells you why something is wrong, such as an order that never arrived. That is `kubectl describe`. Reading the kitchen's logbook tells you what happened recently, in time order. That is the events list. Finally, a meter on the wall shows how much gas and electricity each oven is using right now. That is `kubectl top`, and it only works if the meter, an add-on called metrics-server, has been installed.",
  "body": [
   "Monitoring an application in Kubernetes starts with four kubectl commands, and each answers a different question. `get` tells you what exists and what state it is in, `describe` tells you why it is in that state, events tell you what has happened recently, and `top` tells you how much CPU (central processing unit) and memory something is using right now. Knowing which to reach for first saves minutes on every exam task and turns troubleshooting from guesswork into a short routine.",
   "`kubectl get` answers 'What exists and what state is it in?' It prints a one-line summary per object. For Pods that means NAME, READY (ready containers out of total), STATUS such as Running, Pending, CrashLoopBackOff or Completed, RESTARTS and AGE. Combine types with commas, as in `kubectl get deploy,rs,pods,svc`, filter by label with `-l app=web`, look across all namespaces with `-A`, and watch changes live with `-w`. Adding `-o wide` shows extra columns such as the Pod's IP (Internet Protocol) address and node, and `-o yaml` shows the full stored object. `kubectl get all` shows the common workload and Service types in a namespace, but not ConfigMaps, Secrets, PersistentVolumeClaims or Ingresses, so do not mistake its output for a complete inventory.",
   "`kubectl describe` answers 'Why is it in that state?' It shows a full, human-readable view of one object, including related information that `get` leaves out: container states and last termination reasons, exit codes, probe settings, mounted volumes, the node, resource requests and limits, and, crucially, the Events section at the bottom. For a Pod stuck in Pending, describe shows scheduling failures such as `0/3 nodes are available: 3 Insufficient cpu`. For a container that keeps restarting, it shows `Last State: Terminated` with a reason such as `OOMKilled`, meaning out of memory, or `Error` and an exit code. For a Service it shows the selector and endpoints, and for a Deployment its rollout conditions and scaling events.",
   "`kubectl get events` answers 'What has happened recently in this namespace?' Events are short-lived records created by controllers, the scheduler and the kubelet: scheduling decisions, image pulls, probe failures, OOM kills and back-offs. They are kept for only a limited time, an hour by default on many clusters, so check them soon after a problem. By default they are not listed in time order, so sort them with `kubectl get events --sort-by=.metadata.creationTimestamp`. Show only problems with `--field-selector type=Warning`, or narrow to one object with `--field-selector involvedObject.name=web-5d8f7`. `kubectl events` is a newer command with similar output that sorts by time and offers `--for pod/web-5d8f7` to focus on one object.",
   "```bash\nkubectl get pods -o wide -w\nkubectl describe pod web-5d8f7\nkubectl get events -A --field-selector type=Warning\nkubectl get events --sort-by=.metadata.creationTimestamp\nkubectl top node\nkubectl top pod -A --sort-by=memory\nkubectl top pod web-5d8f7 --containers\n```",
   "`kubectl top` answers 'How much CPU and memory is it using right now?' It needs the metrics-server add-on, which collects resource usage from each kubelet and serves it through the Metrics API (application programming interface). Without it you get an error saying metrics are not available; in minikube you enable it with `minikube addons enable metrics-server`, and right after installation it can take a minute before data appears. `kubectl top node` shows usage per node, `kubectl top pod` per Pod, `--containers` breaks a Pod down by container, and `--sort-by=cpu` or `--sort-by=memory` orders the list from highest to lowest.",
   "Read `top` output with its limits in mind. The numbers are recent samples, not history, so they cannot tell you what happened an hour ago. CPU is shown in millicores, where `250m` means a quarter of one CPU core, and memory in mebibytes, such as `128Mi`. Compare these with the requests and limits that `describe` shows: a container using close to its memory limit is at risk of being OOMKilled, and one using far less than its request is reserving capacity it does not need. The same Metrics API feeds the HorizontalPodAutoscaler, so if `kubectl top` fails, CPU-based autoscaling is failing too.",
   "Put together, the commands form a routine. Start with `get` to find what looks wrong, use `describe` on that object to learn why, check events for the wider timeline, and use `top` when the question is about load or resource usage. A classic exam task is 'find the Pod using the most CPU in namespace X and write its name to a file': `kubectl top pod -n X --sort-by=cpu --no-headers | head -1 | awk '{print $1}' > /path/file`. Check the file with `cat` afterward, because a stray header line or the wrong namespace is an easy way to lose the points."
  ],
  "analogy": "These commands work like a building's facilities desk. get is the floor plan with a status light on each room. describe is the detailed maintenance file for one room, with its recent incident notes. Events are the front desk's logbook for the whole building, which is cleared every so often. top is the live electricity meter, and it only works if the meter has been installed. The comparison stops at history: the meter shows only the present moment, with no record of yesterday's usage.",
  "terms": [
   [
    "kubectl get",
    "One-line summaries of objects and their state, with options for labels, namespaces, wide output and watching."
   ],
   [
    "kubectl describe",
    "Detailed view of one object including related status and recent events."
   ],
   [
    "Event",
    "A short-lived record of something that happened to an object, such as a scheduling failure or image pull."
   ],
   [
    "metrics-server",
    "Cluster add-on that collects CPU and memory usage from kubelets for kubectl top and the HPA."
   ],
   [
    "kubectl top",
    "Shows current CPU and memory usage of nodes or Pods from the Metrics API."
   ],
   [
    "Millicore",
    "One thousandth of a CPU core, written with m, so 500m is half a core."
   ]
  ],
  "example": "A Pod has been Pending for five minutes. `kubectl get pod` only says Pending, but `kubectl describe pod` shows the event '0/3 nodes are available: 3 Insufficient memory', which leads the developer to lower the Pod's memory request. A second Pod with rising restarts shows `Last State: Terminated, Reason: OOMKilled`, and `kubectl top pod --containers` confirms it sits near its memory limit.",
  "mistakes": [
   [
    "Treating `kubectl get all` as a full list of everything in a namespace.",
    "It omits ConfigMaps, Secrets, PersistentVolumeClaims, Ingresses and more. Name the types you need explicitly."
   ],
   [
    "Expecting kubectl top to work on any cluster.",
    "It needs metrics-server serving the Metrics API. An error saying metrics are not available usually means it is missing or not ready."
   ],
   [
    "Looking for yesterday's events.",
    "Events expire after a limited time, often an hour, so they suit recent problems. Older history needs logs or a monitoring system."
   ],
   [
    "Reading kubectl get events output as already sorted by time.",
    "Use --sort-by=.metadata.creationTimestamp, or kubectl events, to read them in order."
   ]
  ],
  "tryit": [
   [
    "A task says: in namespace `shop`, write the name of the Pod using the most memory to `/opt/top-mem.txt`. Your first attempt writes the word NAME to the file. What went wrong, and what is the correct command?",
    "The header line was included. Use `kubectl top pod -n shop --sort-by=memory --no-headers | head -1 | awk '{print $1}' > /opt/top-mem.txt`, then `cat` the file to confirm it holds one Pod name."
   ],
   [
    "A Pod named `report-7c9` shows STATUS CrashLoopBackOff and 6 restarts. You have only a few minutes. Which two commands do you run first, and what are you looking for in each?",
    "Run `kubectl describe pod report-7c9` and read Last State (the reason, such as OOMKilled or Error, and the exit code) plus the Events section for probe failures. Then run `kubectl logs report-7c9 --previous` to see the output of the crashed container instance."
   ]
  ],
  "tip": "`get` tells you what, `describe` and events tell you why, `top` tells you how much. If `kubectl top` errors, metrics-server is missing or not ready yet, and remember to sort events by creationTimestamp.",
  "check": [
   [
    "Which command shows why a Pod is stuck in Pending?",
    "`kubectl describe pod <name>` (its Events section), or `kubectl get events`."
   ],
   [
    "What does `kubectl top` depend on?",
    "The metrics-server add-on providing the Metrics API."
   ],
   [
    "How do you list recent events in time order?",
    "`kubectl get events --sort-by=.metadata.creationTimestamp`."
   ],
   [
    "How do you list only warning events across all namespaces?",
    "`kubectl get events -A --field-selector type=Warning`."
   ]
  ]
 },
 {
  "t": "Container logs: kubectl logs with -c, -f, --previous, --tail, --since, -l and deploy/<name>",
  "hook": "It is 2 a.m. and your phone buzzes. The checkout service at Harbor Outfitters is down, and the on-call dashboard shows the `api` Pod restarting every few minutes. You run `kubectl logs api-7c9` and get a single cheerful start-up banner, nothing else. The Pod has three containers, the crash happened thirty seconds ago, and the container you are looking at is brand new. Somewhere the real error message exists, a stack trace or a missing setting, but it is not in front of you. Which flag do you reach for first, and how do you make sure you are reading the right container, from the right moment, without scrolling through ten thousand lines?",
  "simple": "Programs inside containers print messages as they run, like a diary of what they are doing. Kubernetes saves that diary for you, and `kubectl logs` lets you read it. Because a Pod can hold several containers, you sometimes have to say which container's diary you want. You can also ask for only the last few lines, only the last ten minutes, or to keep watching as new lines appear. The most useful trick is asking for the diary of the previous run: if a program crashed and was restarted, the new run's diary is nearly empty, but the old one explains the crash. Think of a night guard's notebook: when the morning shift reads only today's fresh page, they miss what happened at 3 a.m.",
  "body": [
   "Start with where logs come from. Containers are expected to write their logs to standard output (stdout) and standard error (stderr). The container runtime on each node captures those two streams into files, and when you run `kubectl logs`, the API server asks the kubelet on that node to read them back to you. This design has a direct consequence: if an application writes only to a file inside the container, such as `/var/log/app.log`, `kubectl logs` shows nothing at all. That is one reason for the sidecar pattern, where a small helper container tails the log file and prints it to its own stdout so the platform can collect it.",
   "The basic form is `kubectl logs <pod>`. When the Pod has only one container, that is all you need. When it has more than one, you must say which one with `-c <container>`. If you leave it out, kubectl uses the default container named by the `kubectl.kubernetes.io/default-container` annotation, or asks you to choose by listing the container names. `--all-containers` prints every container's logs, including init containers. You can also reach a single init container directly by name, for example `kubectl logs mypod -c init-db`, which is how you find out why a Pod is stuck in `Init:CrashLoopBackOff`.",
   "Next come the flags that control how much you see. `-f` (follow) streams new lines as they arrive until you press Ctrl-C, much like `tail -f` on a Linux file. `--tail=50` shows only the last 50 lines, which is valuable for chatty applications that have written thousands of lines since start-up. `--since=10m` or `--since=1h` limits output to a recent time window, and `--timestamps` prefixes each line with the time it was written, which helps when you are lining up an error with an alert. These combine freely: `kubectl logs web-5d8f7 --since=5m -f` shows the last five minutes and then keeps streaming.",
   "The flag that matters most during an incident is `--previous`, or `-p`. It shows the logs of the previous instance of a container, the one that crashed or was restarted. This is essential for CrashLoopBackOff. The current container may have started a second ago and printed only a banner, while the crash reason, such as a stack trace or a line saying 'config file not found', is in the previous instance. Only the most recent terminated instance is kept, so if you wait through several more restarts you still see just the last crash, not the first. Pair `--previous` with the Last State section of `kubectl describe pod`, which gives the exit code and reason.",
   "```bash\nkubectl logs web-5d8f7 -c app --tail=100\nkubectl logs web-5d8f7 -c app --previous\nkubectl logs -f deploy/web\nkubectl logs -l app=web --all-containers --prefix --since=15m\nkubectl logs job/migrate\n```",
   "You do not always need the exact Pod name. You can name a controller instead: `kubectl logs deploy/web` or `kubectl logs job/migrate` picks one Pod that belongs to it, which saves you from copying generated names such as `web-5d8f7c9b4-xk2lp`. The catch is that it shows only one Pod. If a Deployment has five replicas and only one is failing, `deploy/web` may well show you a healthy one. To read logs from many Pods at once, use a label selector: `kubectl logs -l app=web`. With `-l`, kubectl shows a limited number of recent lines per Pod by default and follows only a limited number of Pods concurrently, controlled by `--max-log-requests`. Adding `--prefix` labels each line with its Pod and container name, so you can tell which replica said what.",
   "Finally, remember what logs are not. They live on the node and disappear when the Pod is deleted, when the node rotates the files, or when the node itself goes away. `kubectl logs` is for recent troubleshooting, not long-term storage or auditing. Production clusters run a log collector, often as a DaemonSet with one agent per node, that ships logs to a central store. On the CKAD (Certified Kubernetes Application Developer) exam, a common task is to save logs to a specific path, for example `kubectl logs mypod -c app > /opt/logs/app.log`. Always confirm the Pod's namespace with `-n`, confirm the container name with `-c`, and run `cat` on the file afterward to be sure it is not empty.",
   "A useful habit ties all of this together. When a Pod misbehaves, read `kubectl get pods` to see the status and restart count, use `describe` for events and Last State, then use `logs` with `-c` and, if the restart count is above zero, `--previous`. That sequence answers most application failures in under a minute."
  ],
  "analogy": "Think of `kubectl logs` as reading a shop's security camera recorder. `-c` picks which camera, `--since` and `--tail` jump to a recent stretch of footage, and `-f` switches to the live feed. `--previous` is rewinding to yesterday's tape, the one that recorded the break-in, because today's tape started after the alarm reset. The analogy stops working in one place: the recorder keeps only one old tape per camera, and it is erased entirely when the shop (the Pod) is torn down.",
  "terms": [
   [
    "-c",
    "Selects which container's logs to show in a multi-container Pod."
   ],
   [
    "--previous (-p)",
    "Shows logs from the last terminated instance of the container, the key to diagnosing crashes."
   ],
   [
    "-f",
    "Follows the log stream, printing new lines as they are written until interrupted."
   ],
   [
    "--tail / --since",
    "Limit output to the last N lines or to a recent time window such as 10m or 1h."
   ],
   [
    "-l",
    "Selects Pods by label to show logs from several Pods at once; pair with --prefix to see which Pod wrote each line."
   ],
   [
    "deploy/<name>",
    "Names a controller instead of a Pod; kubectl shows logs from one Pod that belongs to it."
   ]
  ],
  "example": "A Pod is in CrashLoopBackOff and `kubectl logs api-7c9` prints only a start-up banner. Running `kubectl logs api-7c9 --previous` shows the real error from the crashed instance: 'DATABASE_URL is not set', pointing to a missing environment variable in the Deployment's Pod template.",
  "mistakes": [
   [
    "`kubectl logs deploy/web` shows logs from every replica.",
    "It picks a single Pod belonging to the Deployment. To see all replicas, use a label selector such as `-l app=web` with `--prefix`."
   ],
   [
    "The current container's logs will show why it crashed.",
    "After a restart the current instance is new and often has little output. The crash reason is in the previous instance, reached with `--previous`."
   ],
   [
    "An empty `kubectl logs` output means the app is not logging anything.",
    "It may be logging to a file inside the container rather than stdout or stderr, or you may be reading the wrong container in a multi-container Pod. Check `-c` and how the app is configured to log."
   ],
   [
    "Logs are kept after the Pod is deleted.",
    "Logs live on the node and are removed with the Pod. Long-term retention requires a log collector, usually a DaemonSet."
   ]
  ],
  "tryit": [
   [
    "A Pod named `orders-6b7` has two containers, `app` and `proxy`, and shows 4 restarts. The task says to save the error that caused the most recent crash of the `app` container to `/opt/crash.log`. What command do you run?",
    "`kubectl logs orders-6b7 -c app --previous > /opt/crash.log`. You need `-c app` because the Pod has two containers, and `--previous` because the error belongs to the instance that crashed, not the one currently starting. Then run `cat /opt/crash.log` to confirm it holds the error."
   ],
   [
    "A Deployment `web` has four replicas. Users report intermittent errors, and you want to see the last 15 minutes of logs from all replicas, labeled by Pod. Which command fits?",
    "`kubectl logs -l app=web --since=15m --prefix` (using the Deployment's actual Pod label). `kubectl logs deploy/web` would show only one Pod, which might be a healthy one."
   ]
  ],
  "tip": "For crashing containers, reach for `--previous` first. For multi-container Pods, `-c` is required to get the right container. For many replicas, use `-l` with `--prefix`, not `deploy/<name>`.",
  "check": [
   [
    "How do you see why the last instance of a container crashed?",
    "`kubectl logs <pod> -c <container> --previous`, because the crash output belongs to the terminated instance."
   ],
   [
    "What does `kubectl logs deploy/web` show?",
    "Logs from one Pod belonging to the Deployment, not all of them."
   ],
   [
    "How do you show only log lines from the last 30 minutes?",
    "Add `--since=30m`."
   ],
   [
    "Why might `kubectl logs` show nothing for an app that is clearly writing logs?",
    "The app may write to a file inside the container instead of stdout or stderr, or you are reading a different container in the Pod."
   ]
  ]
 },
 {
  "t": "Reading Pod status: Pending, ImagePullBackOff, CrashLoopBackOff, OOMKilled, Completed, exit codes",
  "hook": "Priya, a developer at Lakeside Ticketing, has just pushed a release. She runs `kubectl get pods` and sees a column of trouble: one Pod says Pending, another ImagePullBackOff, a third CrashLoopBackOff with 6 restarts, and a fourth, which should be a long-running web server, says Completed. Her team lead messages: \"What's broken and what's the fix?\" Each of those words is a clue pointing to a different layer, the scheduler, the registry, the application or the container's memory. Priya has five minutes before the release call. How does she turn a wall of status words and exit codes into the next command to type?",
  "simple": "When you ask Kubernetes for a list of Pods, each one gets a short status word, a bit like the status line on a package tracking page: \"waiting for a truck\", \"address problem\", \"delivered\". Pending means the Pod is waiting to start, often because there is no room for it yet. ImagePullBackOff means Kubernetes cannot download the program it is supposed to run. CrashLoopBackOff means the program starts and then keeps falling over. OOMKilled means it used more memory than it was allowed, so it was stopped. Completed means it finished its job and stopped on purpose. When a program stops, it also leaves a number called an exit code. Zero means \"all good\", and certain other numbers point to specific problems, such as a command that does not exist.",
  "body": [
   "The STATUS column of `kubectl get pods` is a compact summary of two things: the Pod's phase (Pending, Running, Succeeded, Failed or Unknown) and the state of its containers. It is a starting point, not a diagnosis, but learning to read it tells you where to look next and saves a lot of guessing. Each status word points to a different stage in a Pod's life: being scheduled onto a node, pulling its image, starting the process, and running or exiting.",
   "Pending means the Pod was accepted by the API server but its containers are not running yet. There are two broad reasons. Either it has not been scheduled at all, because no node has enough unreserved CPU or memory, a nodeSelector or taint rules out every node, or it waits on an unbound PersistentVolumeClaim (PVC). Or it has been scheduled and is still pulling images or setting up volumes. `kubectl describe pod` tells you which: look for a FailedScheduling event such as '0/3 nodes are available: 3 Insufficient memory', or a ContainerCreating state with events about volumes. A missing ConfigMap or Secret referenced by the Pod typically shows as ContainerCreating (for volumes) or CreateContainerConfigError (for environment variables).",
   "ErrImagePull, followed by ImagePullBackOff, means the kubelet cannot pull the container image. Common causes are a typo in the image name or tag, a private registry used without `imagePullSecrets`, or no network path to the registry. The word BackOff means Kubernetes is waiting longer and longer between retries rather than hammering the registry. The event text in `describe` tells you which problem you have: 'manifest unknown' or 'not found' points to a wrong name or tag, while 'unauthorized' or 'pull access denied' points to missing credentials.",
   "CrashLoopBackOff means the container starts, exits, is restarted and exits again, with growing delays between attempts. Here the container itself is the problem, not the platform. The application may error on start-up, the `command` may be wrong, a required file or environment variable may be missing, or a liveness probe may keep killing it. Check `kubectl logs --previous` for the output of the crashed instance and the Last State section of `kubectl describe pod`, which shows the termination reason and exit code. The RESTARTS column climbing alongside it confirms the loop.",
   "OOMKilled means the container used more memory than its limit, so the kernel's out-of-memory (OOM) killer stopped it. It appears as the termination reason in Last State, usually with exit code 137, and often leads to CrashLoopBackOff as the kubelet keeps restarting it. The fix is to raise the memory limit or reduce the application's memory use; adding CPU will not help. Completed means all containers exited with code 0. That is the normal, healthy end state for Job Pods. For a Deployment Pod, which should run forever, it means the main process finished when it should have stayed in the foreground. Because a Deployment's restartPolicy is Always, the kubelet restarts it, and it soon shows CrashLoopBackOff even though nothing technically failed.",
   "Exit codes tell you how a process ended, and the exam expects you to recognize a handful. 0 is success. 1, or another small number, is a general application error, so read the logs. 126 means the command was found but could not be executed, often a permission problem such as a script without the execute bit. 127 means command not found, typically a typo in `command` or a binary missing from a slim image. Codes above 128 mean the process was killed by a signal, and the code is 128 plus the signal number. 137 is 128 + 9, SIGKILL, used by the OOM killer or after a forced termination when the grace period runs out. 143 is 128 + 15, SIGTERM, which is a normal graceful stop, for example during a rolling update.",
   "```bash\nkubectl get pods\nkubectl describe pod api-7c9 | grep -A5 'Last State'\nkubectl get pod api-7c9 -o jsonpath='{.status.containerStatuses[0].lastState.terminated.exitCode}'\n```",
   "Putting this together gives you a quick decision map. Pending and ImagePullBackOff are platform-side problems you diagnose with `describe` and its events. CrashLoopBackOff is an application-side problem you diagnose with `logs --previous` and Last State. OOMKilled points straight at the memory limit. Completed on a Deployment points at the command. The jsonpath query above is handy when a task asks you to write an exit code to a file, because it extracts the exact number without any surrounding text."
  ],
  "analogy": "Reading Pod status is like a car that will not get you to work. Pending is \"no parking space at the garage yet\" (no room on a node). ImagePullBackOff is \"the parts never arrived from the supplier\" (the image cannot be fetched). CrashLoopBackOff is \"the engine starts, then stalls, again and again\" (the app itself fails). OOMKilled is \"the fuse blew because too much current was drawn\" (memory over limit). The analogy is loose on exit codes: think of them as the error code the mechanic's scanner reads afterward.",
  "terms": [
   [
    "Pending",
    "Pod accepted but containers not running yet, often unscheduled or still creating containers and volumes."
   ],
   [
    "ImagePullBackOff",
    "The image cannot be pulled and Kubernetes is backing off between retries."
   ],
   [
    "CrashLoopBackOff",
    "The container keeps exiting after start and is restarted with increasing delays."
   ],
   [
    "OOMKilled",
    "The container was killed for exceeding its memory limit, usually with exit code 137."
   ],
   [
    "CreateContainerConfigError",
    "The container cannot be created because referenced configuration, such as a ConfigMap or Secret key used in env, is missing."
   ],
   [
    "Exit code 128+n",
    "A process killed by signal n, such as 137 for SIGKILL or 143 for SIGTERM."
   ]
  ],
  "example": "A new Pod shows ImagePullBackOff. `kubectl describe pod` shows 'failed to pull image \"ngnix:1.27\": not found'. The image name was misspelled; after fixing it with `kubectl set image` the Pod starts. Another Pod in the same app shows OOMKilled with exit code 137 in Last State, so its memory limit is raised from 128Mi to 256Mi.",
  "mistakes": [
   [
    "CrashLoopBackOff means Kubernetes or the node is broken.",
    "It means the container keeps exiting. The cause is almost always in the application, its command or its configuration; read `logs --previous` and Last State."
   ],
   [
    "Exit code 137 always means out of memory.",
    "137 means SIGKILL. OOMKilled is the most common cause, but a container killed after its termination grace period also exits with 137. Check the Reason field."
   ],
   [
    "Completed is an error status.",
    "For a Job Pod it is the expected success state. It is only a problem for long-running workloads such as Deployment Pods, whose process should never finish."
   ],
   [
    "Pending always means a lack of resources.",
    "Pending also covers unsatisfied nodeSelectors, taints, unbound PVCs and Pods still creating containers. `describe` events tell you which."
   ]
  ],
  "tryit": [
   [
    "A Pod in a Deployment shows CrashLoopBackOff. `kubectl describe pod` shows Last State: Terminated, Reason: Error, Exit Code: 127. The image was recently switched to a smaller base image. What is the most likely problem, and what do you check?",
    "Exit code 127 means command not found. The slimmer image probably lacks the binary or shell named in `command` or the entrypoint. Check the container's `command` and `args` against what the image contains, for example by testing with `kubectl debug` or comparing with the old image."
   ],
   [
    "A Pod has been Pending for five minutes. `describe` shows: '0/4 nodes are available: 4 Insufficient cpu.' The Pod requests 6 CPU cores and each node has 4. What do you change?",
    "The request is larger than any node can supply, so the scheduler can never place it. Lower the CPU request to a value a node can fit (or add larger nodes). Raising the limit would not help, because scheduling uses requests."
   ]
  ],
  "tip": "Map status to the next command: Pending and ImagePullBackOff lead to `describe`, CrashLoopBackOff leads to `logs --previous`, and OOMKilled leads to the memory limit. Remember 127 is command not found, 137 is SIGKILL and 143 is SIGTERM.",
  "check": [
   [
    "What does exit code 127 usually mean?",
    "Command not found: a wrong command or a binary missing from the image."
   ],
   [
    "A container shows OOMKilled with exit code 137. What caused it?",
    "It exceeded its memory limit and was killed with SIGKILL (128 + 9)."
   ],
   [
    "A Deployment's Pod shows Completed and keeps restarting. What is likely wrong?",
    "Its command runs to completion instead of staying in the foreground; with restartPolicy Always the kubelet keeps restarting the container, which soon shows CrashLoopBackOff."
   ],
   [
    "A Pod shows ImagePullBackOff and the event says 'unauthorized'. What is the likely fix?",
    "Provide registry credentials, usually a docker-registry Secret referenced in `imagePullSecrets`."
   ]
  ]
 },
 {
  "t": "Debugging: kubectl exec, kubectl debug (ephemeral containers and Pod copies), port-forward, temporary busybox Pods",
  "hook": "Marcus maintains the payments API at Fernwood Bank, and a ticket has just landed: \"Service returns 502 for some customers since this morning.\" The logs show a vague 'upstream connect error'. He tries `kubectl exec -it api-6f4 -- sh` and gets back an error that there is no shell in the image; the team switched to a distroless base last sprint. He wants to know three things: can the app reach the database from inside its own Pod, does the Service answer from elsewhere in the cluster, and does the API respond if he hits it from his laptop? Each question needs a different tool. Which one, and why?",
  "simple": "Sometimes reading the logs is not enough, and you need to look around inside the app's environment, like a plumber who has to open the wall to see the pipes. Kubernetes gives you four ways in. You can run a command inside the running app (\"exec\"). If the app's container has no tools at all, you can attach a temporary helper container full of tools next to it (\"debug\"). You can open a private tunnel from your own computer straight to the app (\"port-forward\"), so you can test it as if it were running locally. Or you can start a small throwaway Pod inside the cluster and test things from there, seeing the network exactly as other apps see it. Choosing the right one depends on the question you are asking.",
  "body": [
   "Logs and events do not always explain a problem. Sometimes you need to get inside the Pod's environment, test the network from within the cluster, or reach an application directly from your own terminal. kubectl gives you four tools for this: `exec`, `debug`, `port-forward` and temporary Pods started with `kubectl run`. Each answers a different question, and picking the right one quickly is a skill the CKAD exam rewards.",
   "`kubectl exec` runs a command inside a running container. `kubectl exec web-5d8f7 -- cat /etc/nginx/nginx.conf` runs one command and returns. `kubectl exec -it web-5d8f7 -c app -- sh` opens an interactive shell, where `-i` keeps standard input open and `-t` allocates a terminal (TTY). Everything after `--` is the command to run, so kubectl does not confuse your command's flags with its own. Use exec to check files, environment variables (`env`), mounted volumes and connectivity from the app's point of view. It has two firm requirements: the container must be running, and the image must actually contain the tool you call. Minimal and distroless images often have no shell, no `ls` and no `wget` at all, and exec simply fails with an 'executable file not found' message.",
   "`kubectl debug` handles those cases in two ways. The first is an ephemeral container: `kubectl debug -it web-5d8f7 --image=busybox --target=app` adds a temporary container to the running Pod without restarting it. That container shares the Pod's network namespace, so `localhost` means the same thing as it does for the app, and with `--target` it also shares the process namespace of the named container, so you can see its processes with `ps`. Ephemeral containers cannot be removed or restarted once added, and they have no ports, probes or resource guarantees; they exist purely for troubleshooting. The second way is a copy: `kubectl debug web-5d8f7 -it --copy-to=web-debug --container=app -- sh` creates a new Pod based on the original and lets you change its command or image. That is useful when the original crashes immediately and you want to start the same container with a shell instead of the failing entrypoint. Delete the copy when you are finished, since it is a normal Pod that keeps running.",
   "```bash\nkubectl exec -it web-5d8f7 -c app -- sh\nkubectl debug -it web-5d8f7 --image=busybox --target=app\nkubectl debug web-5d8f7 -it --copy-to=web-debug --container=app -- sh\nkubectl port-forward pod/web-5d8f7 8080:80\nkubectl port-forward svc/web 8080:80\nkubectl run tmp --image=busybox --rm -it --restart=Never -- sh\n```",
   "`kubectl port-forward` opens a tunnel from a port on your machine, through the API server, to a Pod. `kubectl port-forward pod/web-5d8f7 8080:80` makes `curl localhost:8080` on your terminal reach port 80 in the Pod. The order is always local port first, then remote port. You can target `svc/web` or `deploy/web` instead of a Pod, but kubectl still resolves that to a single Pod behind it; it does not load-balance across replicas, and it does not exercise the Service's networking path. Port-forward runs in the foreground until you stop it with Ctrl-C; add `&` in a shell to background it while you test. It is ideal for checking an application without creating a Service or Ingress, and it does not change anything in the cluster.",
   "A temporary Pod tests things from inside the cluster network, exactly as another Pod would see them. `kubectl run tmp --image=busybox --rm -it --restart=Never -- sh` gives you a shell in a fresh Pod that is deleted when you exit, thanks to `--rm`. `--restart=Never` makes kubectl create a bare Pod rather than something that restarts. From that shell, `wget -qO- web.default.svc.cluster.local` tests a Service by its full Domain Name System (DNS) name, and `nslookup web` tests that DNS resolves at all. For a single check you can skip the shell: `kubectl run tmp --image=busybox --rm -it --restart=Never -- wget -qO- -T 2 web:80` prints the result and cleans up, with `-T 2` setting a two-second timeout so a blocked connection fails quickly. This is the fastest way to confirm that a NetworkPolicy blocks or allows traffic, because the test Pod can carry whatever labels you need. Images such as `curlimages/curl` or `nicolaka/netshoot` are alternatives when you need more tools than busybox offers.",
   "A simple rule picks the tool for you. If the question is about what happens inside the app's own container, use exec. If the tools are missing or the container keeps crashing, use debug. If you want to reach the app from your laptop, use port-forward. If you want to see the app as another Pod would, through Services, DNS and network policies, use a temporary Pod. In Marcus's case, that means an ephemeral busybox container to test the database from inside the Pod, a temporary Pod to test the Service, and port-forward to test from his terminal."
  ],
  "analogy": "Picture an apartment with a leak. `exec` is knocking and asking the tenant to check under their own sink, which only works if they own a flashlight. `debug` with an ephemeral container is sending in a plumber with a full toolbox to stand beside the tenant. `port-forward` is a private phone line from your office straight into one apartment. A temporary Pod is renting the flat next door to see what the neighbors hear. The analogy breaks slightly: the plumber, once inside, cannot be asked to leave until the apartment (Pod) is gone.",
  "terms": [
   [
    "kubectl exec",
    "Runs a command, or an interactive shell with -it, inside a running container that has the needed tool."
   ],
   [
    "Ephemeral container",
    "A temporary debugging container added to a running Pod by kubectl debug; it shares the Pod's network and cannot be removed or restarted."
   ],
   [
    "--target",
    "kubectl debug option that shares the process namespace of a named container so you can see its processes."
   ],
   [
    "kubectl debug --copy-to",
    "Creates a modified copy of a Pod, for example with a different command, for troubleshooting."
   ],
   [
    "kubectl port-forward",
    "Tunnels a local port to a port on one Pod through the API server."
   ],
   [
    "--rm -it --restart=Never",
    "kubectl run flags that create an interactive, bare Pod which is deleted when you exit."
   ]
  ],
  "example": "A distroless Go service returns errors but has no shell for exec. The developer runs `kubectl debug -it api-6f4 --image=busybox --target=api`, then uses `wget` from the ephemeral container to confirm the app answers on localhost:8080 but cannot resolve the database hostname, which points to a DNS configuration issue rather than a code bug.",
  "mistakes": [
   [
    "`kubectl port-forward svc/web` load-balances across all Pods behind the Service.",
    "It picks one Pod and tunnels to it. It does not test Service load balancing or the Service's cluster IP path."
   ],
   [
    "`kubectl exec` works on any container.",
    "The container must be running and the image must contain the command you call. Distroless or crashing containers need `kubectl debug` instead."
   ],
   [
    "You can remove an ephemeral container when you are done.",
    "Ephemeral containers cannot be removed or restarted; they disappear only when the Pod is deleted. A `--copy-to` debug Pod, by contrast, must be deleted by you."
   ],
   [
    "Testing a Service with curl from your terminal shows what other Pods see.",
    "Your terminal is outside the cluster network. Use a temporary Pod to test DNS, Services and NetworkPolicy behavior from inside."
   ]
  ],
  "tryit": [
   [
    "A Pod crashes within one second of starting, so `kubectl exec` never succeeds. You suspect the entrypoint script has a bug and want to start the same image with a shell to inspect it. What do you run?",
    "`kubectl debug <pod> -it --copy-to=<pod>-debug --container=<name> -- sh`. A copy lets you replace the failing command with a shell while keeping the same image and settings. An ephemeral container would not help much because the target container keeps dying. Delete the copy afterward."
   ],
   [
    "A NetworkPolicy should allow only Pods labeled `role=frontend` to reach Service `api` on port 80. How do you prove it from the command line?",
    "Run two one-off Pods: `kubectl run t1 --image=busybox --rm -it --restart=Never -l role=frontend -- wget -qO- -T 2 api:80` should succeed, and the same command without the label should time out. The temporary Pods see the policy exactly as real Pods would."
   ]
  ],
  "tip": "Remember `--rm -it --restart=Never` for throwaway test Pods, put `--` before the command in exec and run, and remember that port-forward to a Service still reaches only one Pod.",
  "check": [
   [
    "What can you do when a container image has no shell?",
    "Use `kubectl debug` to add an ephemeral container with tools such as busybox, sharing the Pod's network and optionally its process namespace with `--target`."
   ],
   [
    "What does `kubectl port-forward svc/web 8080:80` do?",
    "Forwards local port 8080 to port 80 of one Pod selected by the Service."
   ],
   [
    "Why test a Service from a temporary busybox Pod rather than your terminal?",
    "It sees the cluster network and DNS as other Pods do, including NetworkPolicy effects."
   ],
   [
    "In `kubectl exec -it web -- ls /data`, what does `--` do?",
    "It separates kubectl's own flags from the command to run inside the container."
   ]
  ]
 },
 {
  "t": "Output tricks for fast troubleshooting: -o wide, -o yaml, jsonpath, --show-labels, --sort-by",
  "hook": "You are forty minutes into the exam at your desk at home, with a Lakeview Logistics scenario on screen: \"Write the names of all Pods in namespace `ops`, sorted by creation time, one per line, to /opt/pods.txt.\" Then: \"Save the IP address of Pod `cache-0` to /opt/ip.txt.\" Each is worth a few points, and each could eat five minutes if you scroll through YAML and copy text by hand, or take twenty seconds if you know the right output flag. Every second you save goes toward the hard multi-step questions at the end. What is the quickest way to make kubectl hand you exactly one field, in exactly the shape the grader expects?",
  "simple": "When you ask Kubernetes for information, it normally gives you a short table. But every object actually holds a lot more detail, like a library record that has the title on the front card and dozens of facts behind it. kubectl lets you change how the answer is printed. You can ask for a wider table with a few extra columns, the complete record, or just one specific fact pulled out of the record. You can also sort the list, for example oldest first, or build your own small table with only the columns you care about. These tricks matter because many exam tasks say \"save this exact value to a file\", and the faster you can pull out just that value, the more time you have left.",
  "body": [
   "Many CKAD tasks end with \"write the result to a file\". The grader checks the file's contents, so it rewards exact output, not a screen you read by eye. The quicker you can pull exactly the right field out of the API, the more time you have for the hard tasks. kubectl's output options are the tools for that, and a handful of them cover almost every case.",
   "Start with the quick views. `-o wide` adds extra columns to the normal table: for Pods, the Pod IP (Internet Protocol) address, the node and the nominated node; for Deployments, the container names, images and selector; for Services, the selector. It is the fastest way to see which node a Pod landed on or which image a Deployment runs. `--show-labels` adds a LABELS column with every label, and `-L app,tier` adds one column per named label, which is tidier when Pods carry many labels. Combined with `-l` to filter by label, these make selector problems easy to spot, such as a Service whose selector says `app=web` while the Pods are labeled `app=webapp`.",
   "`-o yaml` prints the full object as stored by the API server, including its status and every defaulted field. Use it to see exactly what is running, and as a starting point for new manifests: `kubectl get deploy web -o yaml > web.yaml`. Before reusing such a file, remove server-managed fields such as `status`, `uid`, `resourceVersion`, `creationTimestamp` and `managedFields`. Combined with `--dry-run=client`, `-o yaml` also generates new manifests from imperative commands without creating anything, for example `kubectl create deployment web --image=nginx --dry-run=client -o yaml > web.yaml`. `-o json` gives the same data in JSON (JavaScript Object Notation), which is what jsonpath expressions walk.",
   "`-o jsonpath='{...}'` extracts specific fields. The expression walks the object from the top: `{.metadata.name}`, `{.spec.containers[0].image}`, `{.status.podIP}`. When you `get` a list, such as all Pods, the result is wrapped in a List object, so you start from `.items`: `{.items[*].metadata.name}` prints every name on one line separated by spaces. `[*]` means all elements, `[0]` means the first, and filters look like `[?(@.type==\"Ready\")]`. For one item per line, use a range: `{range .items[*]}{.metadata.name}{\"\\n\"}{end}`. Always wrap the expression in single quotes so the shell does not interpret the braces, brackets or dollar signs.",
   "```bash\nkubectl get pods -o wide --show-labels\nkubectl get pods -L app,version\nkubectl get pod web-5d8f7 -o jsonpath='{.status.podIP}'\nkubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}'\nkubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.status.phase}{\"\\n\"}{end}'\nkubectl get pods --sort-by=.metadata.creationTimestamp\nkubectl get pods --sort-by='.status.containerStatuses[0].restartCount'\nkubectl get pods -o custom-columns=NAME:.metadata.name,NODE:.spec.nodeName\n```",
   "Sorting and custom tables round out the set. `--sort-by` orders the list by any field, written as a JSONPath expression relative to each item, so there is no `.items` at the front. You can sort by creation time, restart count, name or any other field. `-o custom-columns=` builds your own table with header names and field paths, such as `NAME:.metadata.name,NODE:.spec.nodeName`; for several fields it is often clearer than jsonpath. `-o name` prints just `pod/web-5d8f7` style names, handy in shell loops, and `--no-headers` drops the header row when a task wants only the values. Note that custom-columns paths are also relative to each item. These options combine with filters you already know: `kubectl get pods -l app=web -n shop -o name` lists only matching Pods, and `kubectl get pods --field-selector=status.phase=Running -o name` keeps only running ones. Combining a filter, a sort and an output format in one command is usually quicker than piping text through `grep` and `awk`, and less likely to pick up a stray line.",
   "When you do not know the path to a field, do not guess. Run `-o yaml` once, find the field, and write the path from the top of the object, adding an index wherever you pass through a list. `kubectl explain pod.spec.containers` shows the structure and field names, even for fields that are currently empty. Then test the expression on screen before redirecting it to a file.",
   "Finally, verify. After writing `> /opt/pods.txt`, run `cat /opt/pods.txt` and check that it has the right number of lines, no header unless one was requested, and no stray quotes. A jsonpath that prints nothing usually means a wrong path, such as forgetting `.items` on a list, or a typo in a field name, since jsonpath silently returns empty for fields that do not exist. Small habits like this protect points you have already earned."
  ],
  "analogy": "Think of a Kubernetes object as a large filing cabinet drawer. `-o wide` is reading the folder tabs plus a sticky note or two. `-o yaml` is pulling out the whole folder. jsonpath is a precise address, \"third drawer, folder called spec, second page, line image\", that hands you exactly one sheet. `--sort-by` rearranges the folders before you read them. The analogy stops at lists: when you ask for many objects, they arrive inside a box called `items`, so jsonpath must open that box first, while sort-by already works inside it.",
  "terms": [
   [
    "-o wide",
    "Adds extra columns such as Pod IP, node, container images and selector."
   ],
   [
    "-o yaml",
    "Prints the complete object, including status and defaulted fields."
   ],
   [
    "jsonpath",
    "Output template that extracts specific fields from the object tree, starting at .items for lists."
   ],
   [
    "--sort-by",
    "Orders list output by a field given as a JSONPath expression relative to each item."
   ],
   [
    "custom-columns",
    "Output format that builds a table from header names and field paths."
   ],
   [
    "--show-labels / -L",
    "Add a column showing all labels, or one column per named label key."
   ]
  ],
  "example": "A task asks for the names of all Pods in namespace `ops`, sorted by age, one per line, saved to /opt/pods.txt. You run `kubectl get pods -n ops --sort-by=.metadata.creationTimestamp -o custom-columns=NAME:.metadata.name --no-headers > /opt/pods.txt` and check it with `cat`.",
  "mistakes": [
   [
    "Using `{.metadata.name}` with `kubectl get pods` to list all names.",
    "A list result is wrapped in `items`. Use `{.items[*].metadata.name}`, or a range for one per line."
   ],
   [
    "Writing `--sort-by=.items[*].metadata.creationTimestamp`.",
    "Sort paths are relative to each item. Use `--sort-by=.metadata.creationTimestamp`."
   ],
   [
    "Leaving jsonpath unquoted or in double quotes.",
    "The shell may mangle braces, brackets and `\\n`. Wrap the whole expression in single quotes."
   ],
   [
    "Copying `-o yaml` output straight into a new manifest.",
    "It contains server-managed fields such as status, uid and resourceVersion that should be removed before applying it as a new object."
   ]
  ],
  "tryit": [
   [
    "A task asks: \"Write the image of every container in Pod `multi` to /opt/images.txt, one per line.\" The Pod has three containers. What command do you use?",
    "`kubectl get pod multi -o jsonpath='{range .spec.containers[*]}{.image}{\"\\n\"}{end}' > /opt/images.txt`. It is a single Pod, so there is no `.items`; the range iterates the containers list and adds a newline after each image. Check with `cat`."
   ],
   [
    "You need to find which Pod in namespace `web` has restarted the most. What is the fastest approach?",
    "`kubectl get pods -n web --sort-by='.status.containerStatuses[0].restartCount'`. The Pod at the bottom of the list has the highest restart count for its first container. For multi-container Pods, also check other containers with `describe` or a custom-columns view."
   ]
  ],
  "tip": "For `kubectl get pods` (a list) jsonpath starts at `.items`, but `--sort-by` and custom-columns paths are relative to each item. Always single-quote jsonpath expressions and `cat` the file you wrote.",
  "check": [
   [
    "Which flag quickly shows the node each Pod is running on?",
    "`-o wide`."
   ],
   [
    "Write a jsonpath to print the image of the first container of Pod web.",
    "`kubectl get pod web -o jsonpath='{.spec.containers[0].image}'`."
   ],
   [
    "How do you list Pods ordered by restart count?",
    "`kubectl get pods --sort-by='.status.containerStatuses[0].restartCount'`."
   ],
   [
    "How do you print only Pod names with no header row, using custom-columns?",
    "`kubectl get pods -o custom-columns=NAME:.metadata.name --no-headers`."
   ]
  ]
 },
 {
  "t": "Extending Kubernetes: CustomResourceDefinitions, custom resources and Operators; discovering them with kubectl get crd and api-resources",
  "hook": "On your first morning on the platform team at Ridgeway Health, a colleague drops a note in chat: \"Our database clusters are run by an Operator now. Just create a `Backup` for the billing database before tonight's migration.\" You run `kubectl get backup` and wonder whether that is even a real resource. It is not in any Kubernetes tutorial you have read, and nobody has told you its API group, its fields or whether it lives in a namespace. Yet kubectl seems to know about it. Where did this type come from, how do you find out what fields it accepts, and what actually takes the backup once you have created the object?",
  "simple": "Kubernetes comes with a set of built-in object types, such as Pods and Services, a bit like a phone that ships with some built-in apps. But you can add new types, the way you install a new app. A CustomResourceDefinition is the installer: it teaches Kubernetes a new kind of object, such as \"Backup\" or \"Certificate\". After that, you can create and list those objects with the same kubectl commands you already know. On its own, though, a new type is just a form that gets filed away. Something has to read the form and do the work. That worker is called a controller, and a controller packaged together with its new types to run a particular application, such as a database, is called an Operator.",
  "body": [
   "Kubernetes ships with built-in types such as Pods, Services and Deployments, but its API (application programming interface) is designed to be extended. A CustomResourceDefinition (CRD) adds a new resource type to the API server. Once a CRD exists, you can create, list, edit and delete objects of that type with kubectl exactly like built-in objects, with the same RBAC (Role-Based Access Control) rules, the same `-o yaml` output and the same `apply` workflow. Objects of the new type are called custom resources. The CKAD exam expects you to understand this extension model, discover what extensions a cluster has, and work with custom resources, not to write controllers.",
   "A CRD declares four main things about the new type. Its API `group`, such as `example.com`, keeps it from colliding with other types. Its `versions` list each version, such as `v1`, with an OpenAPI v3 schema that validates fields, plus `served` (whether the API offers this version) and `storage` (which version is saved in etcd; exactly one must be true). Its `scope` is either Namespaced or Cluster. Its `names` give the kind, plural, singular and optional short names. The CRD's own metadata name must be `<plural>.<group>`, for example `backups.example.com`; the API server rejects a CRD whose name does not match.",
   "```yaml\napiVersion: apiextensions.k8s.io/v1\nkind: CustomResourceDefinition\nmetadata:\n  name: backups.example.com\nspec:\n  group: example.com\n  scope: Namespaced\n  names:\n    plural: backups\n    singular: backup\n    kind: Backup\n    shortNames: [bk]\n  versions:\n  - name: v1\n    served: true\n    storage: true\n    schema:\n      openAPIV3Schema:\n        type: object\n        properties:\n          spec:\n            type: object\n            properties:\n              schedule: {type: string}\n              retainDays: {type: integer}\n---\napiVersion: example.com/v1\nkind: Backup\nmetadata:\n  name: nightly\nspec:\n  schedule: \"0 1 * * *\"\n  retainDays: 7\n```",
   "Notice how the custom resource at the bottom refers back to the CRD. Its `apiVersion` is `<group>/<version>`, here `example.com/v1`, and its `kind` is the CRD's kind, `Backup`. Because the CRD defines a schema, the API server validates the object: if you write `retainDays: \"seven\"`, the request is rejected because the schema expects an integer. That validation is one of the reasons CRDs feel like native types. Custom resources also get the usual metadata, so labels, annotations, namespaces and label selectors all work on them, and RBAC rules can grant verbs on them by naming the CRD's group and plural, such as resource `backups` in API group `example.com`.",
   "A CRD on its own only stores data, though. Creating a `Backup` object writes a record into etcd and nothing else happens. Something has to act on it. That is a controller: a program, usually running as a Deployment in the cluster, that watches objects of a type and works continuously to make the real world match their spec. This watch-and-reconcile loop is the same pattern the built-in Deployment and ReplicaSet controllers use. An Operator is a controller plus CRDs that together encode the operational knowledge for a particular application, such as how to deploy, back up, upgrade or fail over a database. You declare `kind: PostgresCluster` with three replicas, and the Operator creates the StatefulSets, Services, Secrets and backup jobs for you, then keeps watching and repairing them.",
   "Discovering what extensions exist is a common way to start an exam task. `kubectl get crd`, short for `customresourcedefinitions`, lists all CRDs with their creation times. `kubectl api-resources --api-group=example.com` shows the resource names, short names, API version, kind and whether each is namespaced. `kubectl explain backup.spec` works for CRDs that define a schema and shows the fields and their types. Then use the plural, singular or short name as you would for any resource: `kubectl get backups -A`, `kubectl get bk nightly -o yaml`, `kubectl describe backup nightly`.",
   "```bash\nkubectl get crd\nkubectl get crd backups.example.com -o yaml\nkubectl api-resources | grep example.com\nkubectl get backups -n prod\nkubectl apply -f nightly-backup.yaml\n```",
   "Two cautions complete the picture. First, deleting a CRD deletes every custom resource of that type across the cluster, so treat CRD deletion with great care; it is not the same as deleting one object. Second, order matters when installing. If you apply a custom resource before its CRD exists, you get the error 'no matches for kind \"Backup\" in version \"example.com/v1\"'. The fix is to install the CRD first, which is often done for you as part of an Operator's Helm chart or installation manifest, and only then create your custom resources. If you see that error on the exam, check `kubectl get crd` before anything else."
  ],
  "analogy": "A CRD is like a city adding a new permit form, say a \"street party permit\", to its official list. Once the form exists, anyone can fill one in and file it at the counter, and the clerk checks that every box is filled correctly. But filing the form does not close the street. A separate department, the controller, reads new permits and sends out the barriers. An Operator is that department plus its forms. Where the analogy stops: tearing up the form type (deleting the CRD) instantly shreds every permit ever filed on it.",
  "terms": [
   [
    "CustomResourceDefinition (CRD)",
    "An object that registers a new resource type, with its group, versions, schema, scope and names, with the Kubernetes API."
   ],
   [
    "Custom resource",
    "An object of a type defined by a CRD, managed with kubectl like built-in objects."
   ],
   [
    "Controller",
    "A program that watches objects and acts to make actual state match their spec, in a reconcile loop."
   ],
   [
    "Operator",
    "A controller plus CRDs that automate running a specific application, such as a database."
   ],
   [
    "kubectl api-resources",
    "Lists every resource type the API server knows, with short names, API group and whether it is namespaced."
   ]
  ],
  "example": "A platform team installs a certificate Operator. `kubectl get crd | grep cert` shows new types such as Certificate and Issuer. A developer then writes a short `kind: Certificate` manifest for their app's hostname, and the Operator's controller obtains the certificate and stores it in a Secret the Ingress uses.",
  "mistakes": [
   [
    "Creating a CRD makes something happen automatically.",
    "A CRD only adds a type and stores objects. A controller or Operator must be running to act on those objects."
   ],
   [
    "The CRD name can be anything, like `backup-crd`.",
    "It must be `<plural>.<group>`, for example `backups.example.com`."
   ],
   [
    "A custom resource uses `apiVersion: apiextensions.k8s.io/v1`.",
    "That is the CRD's own apiVersion. The custom resource uses `<group>/<version>`, such as `example.com/v1`."
   ],
   [
    "Deleting a CRD leaves existing custom resources in place.",
    "Deleting the CRD deletes all custom resources of that type."
   ]
  ],
  "tryit": [
   [
    "You are told a cluster has a custom resource for message queues, but nobody remembers its name or group. The task asks you to list all queue objects in namespace `orders` and save the output to a file. How do you proceed?",
    "Start with `kubectl get crd` or `kubectl api-resources | grep -i queue` to find the exact resource name, group and whether it is namespaced. Then run `kubectl get <plural> -n orders > /path/file` using the plural or short name you found, and check the file with `cat`."
   ],
   [
    "You apply `my-widget.yaml` and get 'no matches for kind \"Widget\" in version \"tools.example.com/v1\"'. A colleague suggests changing the apiVersion to `v1`. What is the real fix?",
    "The error means the API server does not know that kind and version, usually because the CRD is not installed or uses a different version. Check `kubectl get crd` and `kubectl api-resources --api-group=tools.example.com`; install the CRD (or correct the version) and then reapply. Changing to `v1` would point at the core group, which has no Widget kind."
   ]
  ],
  "tip": "The CRD name is `<plural>.<group>`, and custom resources use `apiVersion: <group>/<version>`. `kubectl api-resources` tells you the exact plural and short names to use, and `kubectl explain` shows the fields when a schema exists.",
  "check": [
   [
    "What happens if you apply a custom resource whose CRD is not installed?",
    "The API server rejects it with a 'no matches for kind' error."
   ],
   [
    "What makes an Operator more than a CRD?",
    "A controller that watches the custom resources and performs the actions to realize them."
   ],
   [
    "How do you list all CRDs in a cluster?",
    "`kubectl get crd`."
   ],
   [
    "What happens to existing custom resources when their CRD is deleted?",
    "They are deleted along with it."
   ]
  ]
 },
 {
  "t": "Request flow: authentication, authorization (RBAC) and admission control (mutating and validating)",
  "hook": "Jordan, a developer at Pinecrest Insurance, deploys a new release and waits. The Deployment says 0/3 ready, and `kubectl get pods` shows nothing at all. No errors appeared when Jordan ran `kubectl apply`. A teammate tries to help and gets a different message entirely: 'User \"sam\" cannot list resource \"pods\" in API group \"\" in the namespace \"claims\"'. Meanwhile, the one Pod that did start last week has a sidecar container nobody remembers writing. Three puzzles, three different gates inside the API server. If you know the order those gates run in, every one of these messages tells you exactly where to look. What are the gates?",
  "simple": "Every request to Kubernetes, whether from a person or a program, goes through the same security checkpoint, like entering an office building. First the guard checks your ID badge: who are you? That is authentication. Next the guard checks whether your badge opens this particular floor: are you allowed to do this? That is authorization. Finally, for anything you are dropping off or changing, a receptionist inspects it. They might add a missing label to your package (that is mutating) and then decide whether it follows building rules (that is validating). Only after passing all three is your request accepted and saved. If something fails, the error message tells you which checkpoint stopped you.",
  "body": [
   "Every change in Kubernetes goes through the API server. kubectl, controllers, the kubelet and your own applications all send it HTTPS requests. Before a request can create or change an object, it passes through three gates in a fixed order: authentication, authorization and admission control. Knowing the order is more than theory; it lets you read an error message and know immediately which gate refused you and what kind of fix is needed.",
   "Authentication answers the question \"Who are you?\" The API server tries its configured authenticators in turn. Common ones are client certificates (typical in administrators' kubeconfig files), bearer tokens (including the ServiceAccount tokens that Pods use) and external identity providers through OpenID Connect (OIDC). Kubernetes has no User object: a human user is just a name and a list of groups asserted by a credential the cluster trusts. ServiceAccounts, in contrast, are real namespaced objects and appear to the API server as `system:serviceaccount:<namespace>:<name>`. If no authenticator accepts the request, it fails with 401 Unauthorized. When you are not sure which identity your kubeconfig presents, `kubectl auth whoami` shows who the API server thinks you are.",
   "Authorization answers \"Are you allowed to do this?\" The API server describes the request as attributes: a verb (get, list, watch, create, update, patch, delete), a resource and optional subresource such as `pods/log`, an API group, a namespace and sometimes an object name. The configured authorizers, usually Node and RBAC (Role-Based Access Control), then decide. RBAC is purely additive: there are no deny rules, and anything not explicitly allowed by some Role or ClusterRole binding is denied. A refusal returns 403 Forbidden with a precise message, such as `User \"jane\" cannot list resource \"pods\" in API group \"\" in the namespace \"prod\"`. The empty quotes there mean the core API group.",
   "Admission control answers \"Is this particular object acceptable, and should it be adjusted?\" It applies only to requests that create, update or delete objects (and to some connect operations such as exec), not to reads like get, list or watch. Mutating admission runs first and may change the object. The ServiceAccount admission controller fills in the `default` ServiceAccount when none is named, LimitRanger adds default requests and limits from a namespace's LimitRange, and mutating webhooks can inject sidecar containers or labels. The object is then validated against its schema. Validating admission runs next and can only accept or reject, never change. ResourceQuota rejects objects that would exceed a namespace quota, Pod Security Admission rejects Pods that break the namespace's security level, and ValidatingAdmissionPolicies or validating webhooks enforce custom organizational rules. If everything passes, the object is stored in etcd.",
   "```text\nkubectl -> API server\n  1. Authentication   (who?)          fail -> 401 Unauthorized\n  2. Authorization    (allowed?)      fail -> 403 Forbidden\n  3. Mutating admission (adjust)\n  4. Schema validation\n  5. Validating admission (accept?)   fail -> error naming the policy or quota\n  6. Persist to etcd\n```",
   "The reason mutating runs before validating is simple: validators should check the final object, including any defaults or sidecars that mutators added. If the order were reversed, a mutator could add something that breaks a rule after the rule had already been checked.",
   "Reading errors with this model in mind is a practical exam skill. 'forbidden: User ... cannot create resource' is authorization, fixed with an RBAC Role and binding. 'forbidden: exceeded quota' comes from the ResourceQuota admission controller and is fixed by lowering requests or raising the quota. 'violates PodSecurity \"restricted:latest\"' comes from Pod Security Admission and is fixed in the Pod's securityContext, for example by running as non-root and dropping capabilities. A Pod that gained resources or a sidecar you did not write was modified by mutating admission, which is expected behavior rather than a bug. Notice that two of these messages contain the word \"forbidden\"; the text after it tells you which gate you hit.",
   "One trap catches many people. With a Deployment, you create the Deployment, which passes admission, and the ReplicaSet controller then creates the Pods. If admission rejects those Pods, your `kubectl apply` already succeeded, so you see no error. The rejection appears in the ReplicaSet's events, not the Deployment's, so check `kubectl describe rs` or `kubectl get events` when a Deployment shows zero Pods. That is exactly what happened to Jordan."
  ],
  "analogy": "The API server is an airport. Authentication is the passport check: it establishes who you are. Authorization is the boarding pass check: you may board this flight, not that one. Mutating admission is the agent who tags your bag and adds a priority sticker. Validating admission is the security scanner that can only let the bag through or stop it. The analogy has a limit: in Kubernetes, simply looking at the departures board (a read) skips the bag checks entirely, because admission only applies to changes.",
  "mnemonic": "\"Who, May, Modify, Validate\": Who are you (authentication), May you (authorization), Modify (mutating admission), Validate (validating admission), then store in etcd.",
  "terms": [
   [
    "Authentication",
    "Establishing who is making the request; failure returns 401 Unauthorized."
   ],
   [
    "Authorization",
    "Deciding whether the identity may perform the verb on the resource; failure returns 403 Forbidden."
   ],
   [
    "RBAC",
    "The usual authorizer; purely additive, with no deny rules, so anything not granted is refused."
   ],
   [
    "Mutating admission",
    "Admission step that can modify an object, such as adding defaults or sidecars, before it is stored."
   ],
   [
    "Validating admission",
    "Admission step that accepts or rejects an object without changing it, such as ResourceQuota or Pod Security Admission."
   ]
  ],
  "example": "A Deployment shows 0/3 ready and no Pods exist. `kubectl describe rs` shows 'pods \"web-...\" is forbidden: exceeded quota: compute, requested: limits.memory=512Mi'. The request passed authentication and RBAC, but the validating ResourceQuota admission controller rejected the Pods.",
  "mistakes": [
   [
    "Every 'forbidden' error is an RBAC problem.",
    "403 'cannot ... resource' is RBAC, but quota and Pod Security rejections also say forbidden. Read the rest of the message to identify the gate."
   ],
   [
    "Admission control checks reads such as `kubectl get`.",
    "Admission applies to create, update and delete (and some connect) requests, not to get, list or watch."
   ],
   [
    "You can write an RBAC rule to deny one specific action.",
    "RBAC has no deny rules. You restrict access by not granting it."
   ],
   [
    "If `kubectl apply` of a Deployment succeeds, its Pods were admitted.",
    "The Pods are created later by the ReplicaSet controller and can be rejected then; look at ReplicaSet events."
   ]
  ],
  "tryit": [
   [
    "A developer runs `kubectl get pods -n billing` and receives '401 Unauthorized'. Her colleague says to ask an admin for a RoleBinding. Is that the right fix?",
    "No. 401 means authentication failed: the API server did not recognize her credentials at all, perhaps an expired token or wrong kubeconfig. RBAC is checked only after authentication succeeds. She should fix her credentials, then check `kubectl auth whoami`."
   ],
   [
    "After applying a Deployment, its Pods start but each has an extra container named `log-agent` and resource limits nobody wrote. Should you treat this as a security incident?",
    "Not necessarily. This is the typical effect of mutating admission: a LimitRange supplies default limits and a mutating webhook can inject a sidecar. Confirm by checking the namespace's LimitRange and the cluster's mutating webhook configuration with your platform team."
   ]
  ],
  "tip": "Order: authentication, authorization, mutating admission, validation, validating admission. 401 means identity, 403 with 'cannot' means RBAC, and quota or PodSecurity messages mean admission. For Deployments, check ReplicaSet events.",
  "check": [
   [
    "Which stage returns 401 Unauthorized?",
    "Authentication, when no authenticator accepts the credentials."
   ],
   [
    "Does admission control run on `kubectl get`?",
    "No; admission applies to create, update and delete requests, not reads."
   ],
   [
    "Which runs first, mutating or validating admission, and why?",
    "Mutating, so that validating controllers check the final, modified object."
   ],
   [
    "How is a human user represented in Kubernetes?",
    "Not as an object; as a name and groups asserted by a trusted credential such as a certificate or OIDC token."
   ]
  ]
 },
 {
  "t": "RBAC objects: Role, ClusterRole, RoleBinding, ClusterRoleBinding; kubectl auth can-i with --as",
  "hook": "The continuous integration (CI) pipeline at Bluewater Freight just failed with 'forbidden: User \"system:serviceaccount:staging:ci\" cannot patch resource \"deployments\" in API group \"apps\"'. Your manager wants it fixed in ten minutes, and a teammate offers a shortcut: \"Just bind it to cluster-admin, that always works.\" It would work. It would also let the pipeline read every Secret in production and delete any namespace. You know there is a narrower answer that grants exactly what the pipeline needs and nothing more, and a way to prove it works before anyone reruns the build. Which objects do you create, in which namespace, and how do you test them without borrowing the pipeline's token?",
  "simple": "RBAC is how Kubernetes decides who may do what. It works like a set of job descriptions and job assignments. A Role is a job description: \"may read Pods and view their logs\". A RoleBinding is an assignment: \"Jane and the CI robot have that job in the dev area\". Roles only ever add permissions; there is no \"forbidden\" list, so anything not written in some job description is simply not allowed. Each Role works inside one namespace, which is like one department. A ClusterRole is a job description that is not tied to any department, and a ClusterRoleBinding hands it out across the whole company. There is also a handy command to ask \"could Jane do this?\" without logging in as Jane.",
  "body": [
   "Role-Based Access Control (RBAC) grants permissions through two kinds of objects: roles, which list the actions that are allowed, and bindings, which give those roles to users, groups or ServiceAccounts. Permissions are only ever added. There is no way to write a deny rule, so the effective permissions of an identity are the union of everything granted to it by every binding that names it or one of its groups. If nothing grants an action, it is refused with 403 Forbidden.",
   "A Role holds rules that apply within one namespace. Each rule lists `apiGroups`, `resources` and `verbs`. The core group, which holds Pods, Services, ConfigMaps, Secrets and ServiceAccounts, is written as the empty string `\"\"`. Deployments, ReplicaSets and StatefulSets are in `apps`; Jobs and CronJobs are in `batch`; Ingresses and NetworkPolicies are in `networking.k8s.io`. Resources are written as lowercase plurals, and subresources use a slash, such as `pods/log` to read logs or `pods/exec` to exec into containers. Verbs include `get`, `list`, `watch`, `create`, `update`, `patch`, `delete` and the wildcard `*`. You can restrict a rule to specific named objects with `resourceNames`, for example allowing `get` on only the ConfigMap called `app-config`.",
   "A ClusterRole has the same structure as a Role but is not namespaced. It serves three purposes: granting access to cluster-scoped resources such as nodes, namespaces or PersistentVolumes; granting access to non-resource URLs such as `/healthz`; and acting as a reusable set of permissions that many namespaces can share. Kubernetes ships ready-made ClusterRoles such as `view` (read most namespaced objects, excluding Secrets), `edit` (read and write most objects) and `admin` (full control within a namespace, including RBAC there), along with `cluster-admin` for everything.",
   "Bindings connect roles to subjects. A RoleBinding grants a Role, or a ClusterRole, to subjects within one namespace, the binding's own namespace. Binding a ClusterRole with a RoleBinding is a common and useful pattern: define `pod-reader` once as a ClusterRole, then grant it namespace by namespace with RoleBindings, and each grant stays limited to its namespace. A ClusterRoleBinding grants a ClusterRole across all namespaces and for cluster-scoped resources. Note that a RoleBinding can only reference a Role in its own namespace. Also, a binding's `roleRef` is immutable after creation; to switch a binding to a different role, delete it and create it again.",
   "```bash\nkubectl create role pod-reader -n dev --verb=get,list,watch --resource=pods,pods/log\nkubectl create rolebinding ci-reads-pods -n dev --role=pod-reader \\\n  --serviceaccount=dev:ci-bot --user=jane\nkubectl create clusterrole node-viewer --verb=get,list --resource=nodes\nkubectl create clusterrolebinding ops-nodes --clusterrole=node-viewer --group=ops\n```",
   "Subjects come in three kinds: `User`, `Group` and `ServiceAccount`. Users and groups are names asserted by the cluster's authentication, while ServiceAccounts are real objects. On the command line, `--serviceaccount` takes `namespace:name`, and forgetting the namespace part is a frequent source of mistakes. Inside YAML, a ServiceAccount subject needs its own `namespace` field, which can differ from the binding's namespace. The imperative `create role` and `create rolebinding` commands are the fastest way to get correct YAML on the exam; add `--dry-run=client -o yaml` if you need a file.",
   "Test permissions without switching credentials by using impersonation. `kubectl auth can-i create deployments -n dev` checks your own identity and prints yes or no. `kubectl auth can-i list pods -n dev --as=jane` checks as a user, and `--as=system:serviceaccount:dev:ci-bot` checks as a ServiceAccount, using its full name. `kubectl auth can-i --list -n dev --as=system:serviceaccount:dev:ci-bot` lists everything that account may do in that namespace. Impersonation itself requires that you are allowed the `impersonate` verb, which cluster administrators normally are. If can-i says yes but the application still fails, check that the Pod really runs as that ServiceAccount and in the namespace you tested. Testing both the positive case (yes in the right namespace) and the negative case (no elsewhere) is good practice and quick to do.",
   "Finally, follow least privilege. Grant only the verbs and resources an application actually needs, in the namespace where it runs, and prefer RoleBindings over ClusterRoleBindings. Be careful with permissions that look harmless but are not: `get` or `list` on Secrets reveals their contents, `create` on Pods can indirectly expose anything a Pod can mount or any ServiceAccount it can run as, and `pods/exec` gives a shell inside running workloads. For the Bluewater pipeline, that means a Role in `staging` with get, list, create, update and patch on `deployments` in `apps`, bound to the `ci` ServiceAccount, not cluster-admin."
  ],
  "analogy": "RBAC works like a hotel key card system. A Role is a list of doors on one floor; a ClusterRole is a list of doors that could apply to any floor, or to shared areas like the gym. A RoleBinding programs a guest's card for that list on one floor only; a ClusterRoleBinding programs it for every floor. Cards only open doors; there is no \"lock this door against this guest\" setting. Where the analogy stops: a card's program (roleRef) cannot be edited, so you issue a new binding instead.",
  "terms": [
   [
    "Role",
    "Namespaced set of allowed verbs on resources in specific API groups."
   ],
   [
    "ClusterRole",
    "Non-namespaced set of permissions, usable cluster-wide or bound per namespace."
   ],
   [
    "RoleBinding",
    "Grants a Role or ClusterRole to subjects within one namespace."
   ],
   [
    "ClusterRoleBinding",
    "Grants a ClusterRole to subjects across the whole cluster, including cluster-scoped resources."
   ],
   [
    "roleRef",
    "The role a binding points to; it cannot be changed after the binding is created."
   ],
   [
    "kubectl auth can-i --as",
    "Checks whether a user or ServiceAccount may perform an action, using impersonation."
   ]
  ],
  "example": "A CI ServiceAccount must deploy to `staging` only. You create a Role allowing get, list, create, update and patch on deployments in the `apps` group, bind it with a RoleBinding in `staging`, then confirm with `kubectl auth can-i create deployments -n staging --as=system:serviceaccount:staging:ci` (yes) and the same check for `-n prod` (no).",
  "mistakes": [
   [
    "Pods belong to the `v1` or `core` API group in a Role rule.",
    "The core group is written as an empty string, `apiGroups: [\"\"]`."
   ],
   [
    "Binding a ClusterRole means cluster-wide access.",
    "Only a ClusterRoleBinding gives cluster-wide access. A ClusterRole referenced by a RoleBinding grants access only in that binding's namespace."
   ],
   [
    "`--serviceaccount=ci-bot` is enough.",
    "The flag needs `namespace:name`, such as `--serviceaccount=dev:ci-bot`."
   ],
   [
    "You can edit a RoleBinding to point at a different Role.",
    "`roleRef` is immutable. Delete and recreate the binding."
   ]
  ],
  "tryit": [
   [
    "A monitoring app in namespace `mon` runs as ServiceAccount `scraper`. It must read Pods in namespaces `web` and `api` only, and you want to avoid duplicating rules. What do you create?",
    "One ClusterRole, for example `pod-reader` with get, list and watch on pods, and two RoleBindings, one in `web` and one in `api`, each binding that ClusterRole to subject ServiceAccount `scraper` in namespace `mon`. The ClusterRole is reusable, and the RoleBindings keep access limited to the two namespaces. Verify with `kubectl auth can-i list pods -n web --as=system:serviceaccount:mon:scraper`."
   ],
   [
    "A developer asks for permission to view logs of Pods in `dev`. You grant get and list on `pods`, but `kubectl logs` still returns forbidden. Why?",
    "Reading logs uses the `pods/log` subresource, which must be granted separately. Add `pods/log` with the `get` verb to the rule."
   ]
  ],
  "tip": "Core resources use apiGroups [\"\"], and --serviceaccount takes namespace:name. A ClusterRole bound by a RoleBinding only grants access in that binding's namespace. Test with `auth can-i --as` in both the allowed and a forbidden namespace.",
  "check": [
   [
    "What API group do you list in a Role rule for Pods?",
    "The core group, written as an empty string \"\"."
   ],
   [
    "What access does a RoleBinding to the ClusterRole `view` give?",
    "Read access to the covered resources only in the RoleBinding's namespace."
   ],
   [
    "How do you check whether ServiceAccount `bot` in namespace `qa` can delete Pods there?",
    "`kubectl auth can-i delete pods -n qa --as=system:serviceaccount:qa:bot`."
   ],
   [
    "Can you write an RBAC rule that denies a user access to Secrets?",
    "No. RBAC has no deny rules; you prevent access by not granting it."
   ]
  ]
 },
 {
  "t": "Resource requests and limits for CPU and memory; units (m, Mi, Gi); QoS classes",
  "hook": "Alicia runs the reporting service at Cedar Valley Schools. Every night at 1 a.m. the report worker dies, restarts and dies again, and by morning teachers see half-finished dashboards. `kubectl describe pod` says OOMKilled, exit code 137. A teammate suggests \"just give it more CPU\". Another says to remove the limits completely so it can never be killed. A third points out that a different Pod on the same node never seems to get evicted when memory runs low, and wonders what makes it special. Three suggestions, and only some of them are right. What do requests and limits actually do, and how do they decide who survives when a node runs short?",
  "simple": "Each container can say how much computer power it needs and the most it is allowed to use. The \"need\" number is called a request: Kubernetes reserves that much for you, like booking a table at a restaurant. The \"most\" number is called a limit: a ceiling you cannot go above. Processing power (CPU) and memory behave differently at the ceiling. If you hit the CPU ceiling, your program just runs slower, like being stuck in traffic. If you go over the memory ceiling, your program is stopped and restarted. Kubernetes also sorts Pods into three priority groups based on these numbers. When a machine runs low on memory, Pods in the lowest group are removed first and the best-planned Pods are removed last.",
  "body": [
   "Each container can declare how much CPU (central processing unit) and memory it needs and the most it may use. These numbers drive two different mechanisms: scheduling, which decides where a Pod runs, and enforcement, which controls what happens while it runs. Getting them right keeps your app from being starved, killed or crowding out its neighbors, and the CKAD exam regularly asks you to set them or diagnose the results.",
   "A request is the amount reserved for the container. The scheduler places a Pod only on a node whose unreserved allocatable capacity covers the sum of its containers' requests. If no node fits, the Pod stays Pending with an 'Insufficient cpu' or 'Insufficient memory' event in `kubectl describe pod`. Requests do not cap usage; a container can use more than it requested if the node has spare capacity. A limit is the maximum. The two resources react differently when a container reaches its limit. CPU is compressible: a container at its CPU limit is throttled, meaning it gets fewer CPU time slices and runs slower, but it keeps running. Memory is not compressible: a container that tries to exceed its memory limit is killed by the kernel and shows OOMKilled, usually with exit code 137. That is why adding CPU never fixes an out-of-memory (OOM) kill.",
   "Units matter and are a common trap. CPU is measured in cores: `1` is one core, `500m` (500 millicores) is half a core, and `0.1` equals `100m`. Memory is measured in bytes with suffixes. `Mi` and `Gi` are binary units (mebibytes and gibibytes, based on powers of 1024), while `M` and `G` are decimal (powers of 1000), so `128Mi` is slightly more than `128M`. A classic mistake is writing `128m` for memory. Lowercase `m` means milli, so that asks for 0.128 bytes, which is never what you want and is easy to miss when reading YAML quickly.",
   "```yaml\ncontainers:\n- name: api\n  image: api:1.0\n  resources:\n    requests:\n      cpu: 250m\n      memory: 128Mi\n    limits:\n      cpu: 500m\n      memory: 256Mi\n```",
   "A few defaulting and tooling rules are worth knowing. If you set a limit but no request for a resource, Kubernetes sets the request equal to the limit. If a namespace has a LimitRange, it may fill in defaults for containers that specify nothing. You can set resources imperatively on an existing workload: `kubectl set resources deploy/api -c api --requests=cpu=250m,memory=128Mi --limits=cpu=500m,memory=256Mi`, which triggers a rollout. `kubectl run` no longer has `--requests` or `--limits` flags, so generate YAML with `--dry-run=client -o yaml` and add a `resources` block by hand.",
   "From these settings, Kubernetes assigns each Pod a Quality of Service (QoS) class, shown in `kubectl describe pod` and stored at `.status.qosClass`. Guaranteed requires that every container in the Pod has both CPU and memory requests and limits, and that requests equal limits. Burstable applies when at least one container has a CPU or memory request or limit, but the Pod does not meet the Guaranteed rule. BestEffort applies when no container has any requests or limits at all. The class is calculated across all containers, so one container without settings can drop a Pod from Guaranteed to Burstable.",
   "The QoS class matters when a node runs short of memory. The kubelet then evicts Pods to protect the node: BestEffort Pods first, then Burstable Pods that are using more than their requests, and Guaranteed Pods last. This node-pressure eviction is different from an OOM kill. An OOM kill hits one container that crossed its own limit; eviction removes whole Pods because the node as a whole is low. Removing limits entirely, as Alicia's teammate suggested, does not make a Pod safer. It makes it more likely to be evicted under pressure, and it can let one Pod starve others on the node.",
   "Finally, compare settings with reality. `kubectl top pod --containers` shows current CPU and memory usage per container, provided the metrics server is installed. Requests far above real usage waste cluster capacity, because the scheduler reserves room that nobody uses. Limits close to real usage risk OOM kills and CPU throttling during peaks. A sensible starting point is a request near typical usage and a memory limit with headroom for spikes. In Alicia's case, the fix is to raise the memory limit, and probably the request, after looking at actual usage, not to add CPU."
  ],
  "analogy": "Requests and limits are like a shared office. The request is the desk you booked: the office manager will not seat you in a room without a free desk for you. The limit is the room's capacity for you. If you are slow because the printer queue is full (CPU), you just wait longer. If you bring more boxes than the room can hold (memory), building security removes you. QoS is the evacuation order when the building is overcrowded. The analogy breaks a little: unlike a desk, a request does not stop you from borrowing empty space next to it.",
  "terms": [
   [
    "Request",
    "Resources reserved for a container and used by the scheduler for placement; it does not cap usage."
   ],
   [
    "Limit",
    "Maximum resources a container may use; CPU over the limit is throttled and memory over the limit is killed."
   ],
   [
    "Millicore (m)",
    "One thousandth of a CPU core; 500m is half a core."
   ],
   [
    "Mi / Gi",
    "Binary memory units based on powers of 1024; M and G are decimal."
   ],
   [
    "QoS class",
    "Guaranteed, Burstable or BestEffort, derived from requests and limits and used for eviction order."
   ],
   [
    "OOMKilled",
    "Termination reason when a container exceeds its memory limit, usually with exit code 137."
   ]
  ],
  "example": "A worker Pod keeps restarting with OOMKilled. `kubectl top pod --containers` shows it settling at about 300Mi while its limit is 256Mi. Raising the memory limit to 512Mi and the request to 320Mi stops the kills, and the Pod stays Burstable.",
  "mistakes": [
   [
    "A container that exceeds its CPU limit is killed.",
    "CPU is compressible, so it is throttled and keeps running. Only exceeding the memory limit gets a container killed."
   ],
   [
    "Writing `memory: 256m` sets 256 megabytes.",
    "Lowercase m means milli. Use `256Mi` (or `256M`) for memory."
   ],
   [
    "Setting requests and limits on CPU only makes a Pod Guaranteed.",
    "Guaranteed requires CPU and memory requests and limits, equal to each other, in every container."
   ],
   [
    "Removing limits protects a Pod from being stopped.",
    "Without requests or limits the Pod is BestEffort and is the first to be evicted under node memory pressure."
   ]
  ],
  "tryit": [
   [
    "A Pod has two containers. Container A has requests and limits of cpu 500m and memory 256Mi, with requests equal to limits. Container B has no resources section. What QoS class is the Pod, and how would you make it Guaranteed?",
    "Burstable, because not every container meets the Guaranteed rule. To make it Guaranteed, give container B CPU and memory requests and limits with requests equal to limits as well."
   ],
   [
    "A new Deployment's Pods stay Pending with '0/3 nodes are available: 3 Insufficient memory'. Each node has about 4Gi allocatable and the Pod requests 6Gi with a limit of 8Gi. What do you change?",
    "Lower the memory request so a node can fit it (or add larger nodes). Scheduling uses requests, so reducing only the limit would not help unless it also lowers a defaulted request."
   ]
  ],
  "tip": "Guaranteed needs requests equal to limits for both CPU and memory in every container. CPU over limit means throttling; memory over limit means OOMKilled. Use Mi and Gi for memory, never lowercase m.",
  "check": [
   [
    "What happens when a container exceeds its CPU limit, and its memory limit?",
    "CPU: it is throttled. Memory: it is killed (OOMKilled)."
   ],
   [
    "A Pod's only container has requests cpu 100m and memory 64Mi with no limits. What QoS class is it?",
    "Burstable."
   ],
   [
    "How much CPU is 1500m?",
    "One and a half cores."
   ],
   [
    "Which QoS class is evicted first when a node runs low on memory?",
    "BestEffort."
   ]
  ]
 },
 {
  "t": "Namespace ResourceQuota and LimitRange defaults",
  "hook": "Monday morning at Northgate Media, the platform team rolled out a new policy over the weekend: each product team's namespace now has a budget. By 9 a.m. the video team is in your chat. Their Deployment update applied without a single error, yet the new version has zero Pods, and `kubectl get deploy` just shows 0/3 available. Nobody changed the image or the code. Somewhere a rule is quietly turning their Pods away, and the message explaining why is not where they are looking. Where is that message hiding, what rule is it enforcing, and what is the one extra object that would let their Pods in without anyone editing every manifest by hand?",
  "simple": "When many teams share one Kubernetes cluster, administrators need a way to stop any single team from using everything. A ResourceQuota is a budget for a namespace, the team's area: \"this team may use at most this much processing power, this much memory, and this many Pods in total.\" A LimitRange is a set of house rules for each individual container in that area: \"if you do not say how much you need, we will assume this amount; and nobody may ask for more than that amount.\" Think of a shared office kitchen: the quota is the total grocery budget for the floor, and the LimitRange is the rule that everyone gets a standard lunch portion unless they order something specific.",
  "body": [
   "Namespaces are often shared by teams or environments, so administrators need ways to stop one namespace from consuming the whole cluster and to make sure every Pod has sensible resource settings. ResourceQuota and LimitRange are the two tools for this. Both are enforced by admission control when objects are created or updated, which is why their effects show up as rejected requests or silently added values rather than as running processes.",
   "A ResourceQuota caps the total consumption of a namespace. Compute quotas include `requests.cpu`, `requests.memory`, `limits.cpu` and `limits.memory`, each summed over all non-terminal Pods in the namespace, so completed Job Pods do not count. Object count quotas include `pods`, `services`, `configmaps`, `secrets` and `persistentvolumeclaims`, plus the general form `count/<resource>.<group>`, such as `count/deployments.apps` or `count/jobs.batch`. Storage quotas cover `requests.storage`, the total storage requested by PersistentVolumeClaims (PVCs). When a new object would push any total over its hard value, the API server rejects it with an 'exceeded quota' error that names the quota and the resource, for example 'exceeded quota: compute, requested: limits.memory=512Mi, used: limits.memory=7680Mi, limited: limits.memory=8Gi'.",
   "```yaml\napiVersion: v1\nkind: ResourceQuota\nmetadata:\n  name: compute\n  namespace: team-a\nspec:\n  hard:\n    requests.cpu: \"2\"\n    requests.memory: 4Gi\n    limits.cpu: \"4\"\n    limits.memory: 8Gi\n    pods: \"10\"\n```",
   "There is an important side effect that catches many people. Once a quota limits a compute value such as `requests.cpu` or `limits.memory`, every new Pod in that namespace must specify that value, or it is rejected with a message like 'must specify limits.memory'. The quota system cannot count a value that is not there, so it refuses the Pod. With a Deployment, you will not see this error on the Deployment itself, because the Deployment object was accepted. The ReplicaSet fails to create Pods, and `kubectl describe rs` or `kubectl get events` shows why. To see how close a namespace is to its limits, run `kubectl describe quota -n team-a`, which lists each resource with its current Used and Hard values side by side.",
   "A LimitRange sets per-object defaults and bounds within a namespace. For `type: Container`, `defaultRequest` is the request applied when a container specifies none, `default` is the limit applied when it specifies none, and `min` and `max` bound what a container may set; a container asking for more than `max` is rejected. `maxLimitRequestRatio` caps how far a limit may exceed its request, for example a ratio of 2 means a limit may be at most twice the request. Other types apply to whole Pods (bounding the sum across their containers) or to PersistentVolumeClaims (bounding storage size). The naming is a frequent exam trap: `default` sets the limit, not the request.",
   "```yaml\napiVersion: v1\nkind: LimitRange\nmetadata:\n  name: defaults\n  namespace: team-a\nspec:\n  limits:\n  - type: Container\n    defaultRequest:\n      cpu: 100m\n      memory: 128Mi\n    default:\n      cpu: 500m\n      memory: 256Mi\n    max:\n      cpu: \"1\"\n      memory: 1Gi\n```",
   "The two objects work well together. The LimitRange fills in missing values during mutating admission, and then the ResourceQuota check runs during validating admission against the completed Pod. As a result, Pods that forget their resources still satisfy the quota's requirement and are counted against the budget, instead of being rejected. This pairing is the standard fix for the 'must specify' error and is exactly what the Northgate video team needed.",
   "Timing matters as well. LimitRange and quota changes apply only to objects created afterward. Existing Pods keep their values until they are recreated, for example by `kubectl rollout restart`, and a new quota does not evict Pods already running over it; it only blocks new ones. For creation, `kubectl create quota compute -n team-a --hard=requests.cpu=2,pods=10` builds a quota imperatively. LimitRanges have no create generator, so you write YAML, ideally by copying from the documentation. Inspect them with `kubectl describe limitrange -n team-a`, which shows the defaults and bounds in a readable table.",
   "A short troubleshooting routine ties this together on the exam. When a Deployment in a namespace shows fewer ready Pods than desired, run `kubectl get events -n <ns> --sort-by=.lastTimestamp` or `kubectl describe rs -n <ns>` and look for 'exceeded quota' or 'must specify'. Then run `kubectl describe quota -n <ns>` to see which resource is exhausted and `kubectl describe limitrange -n <ns>` to see what defaults exist. From there the fix is usually one of three things: add or adjust a LimitRange default, lower the requests in the Pod template, or, with the administrator's agreement, raise the quota. Quotas can also be narrowed with scopes, for example counting only BestEffort or only NotBestEffort Pods, but the core idea stays the same."
  ],
  "analogy": "A ResourceQuota is a household's monthly budget: the bank declines any purchase that would take the total over it, and it refuses a receipt with no amount on it because it cannot add it up. A LimitRange is the house rule that \"if you do not say what you want for dinner, you get the standard plate, and nobody orders more than two mains\". The standard plate is what lets unlabeled orders through the budget check. Where it stops working: changing the house rules does not alter meals already served, only future orders.",
  "terms": [
   [
    "ResourceQuota",
    "Namespace-wide cap on total resource usage, such as requests.cpu or limits.memory, and on object counts."
   ],
   [
    "LimitRange",
    "Namespace policy that sets default and minimum or maximum resources per container, Pod or PVC."
   ],
   [
    "defaultRequest / default",
    "LimitRange fields giving the request and the limit applied when a container omits them."
   ],
   [
    "count/<resource>.<group>",
    "Quota key that limits how many objects of a type may exist in the namespace, such as count/deployments.apps."
   ],
   [
    "kubectl describe quota",
    "Shows each quota resource with its Used and Hard values."
   ]
  ],
  "example": "After a ResourceQuota on limits.memory is added to `team-a`, a Deployment stops creating Pods. `kubectl describe rs` shows 'must specify limits.memory'. Adding a LimitRange with `default: memory: 256Mi` supplies the missing limit, and new Pods are admitted and counted against the quota.",
  "mistakes": [
   [
    "The quota error will show on the Deployment.",
    "The Deployment is accepted; its ReplicaSet fails to create Pods. Look at `kubectl describe rs` or `kubectl get events`."
   ],
   [
    "In a LimitRange, `default` sets the default request.",
    "`default` sets the default limit; `defaultRequest` sets the default request."
   ],
   [
    "Adding a quota stops or evicts Pods already over it.",
    "Quotas are checked at admission, so they only affect new or updated objects. Existing Pods keep running."
   ],
   [
    "A ResourceQuota and a LimitRange do the same thing.",
    "A quota caps the namespace total; a LimitRange sets per-container or per-Pod defaults and bounds."
   ]
  ],
  "tryit": [
   [
    "Namespace `analytics` has a ResourceQuota with `requests.cpu: \"4\"`. A developer's new Job never starts, and `kubectl get events -n analytics` shows 'failed quota: compute: must specify requests.cpu'. The developer does not want to edit every Job manifest. What do you recommend?",
    "Create a LimitRange in `analytics` with a `type: Container` entry that sets `defaultRequest.cpu` (and ideally defaults for the other quota-limited values). New Pods without requests then receive the default during admission and pass the quota check."
   ],
   [
    "`kubectl describe quota -n shop` shows `pods 10/10`. A Deployment scale-up from 8 to 12 replicas only reaches 10 Pods. What is happening, and what are the options?",
    "The object count quota allows only 10 Pods in the namespace, so the ReplicaSet cannot create more. Options are to raise the `pods` value in the quota (with the administrator's agreement), delete unused Pods or workloads, or accept fewer replicas."
   ]
  ],
  "tip": "A compute quota forces every new Pod to declare that resource; a LimitRange default is the usual fix. Quota errors for Deployments show up on the ReplicaSet, not the Deployment. In a LimitRange, `default` is the limit and `defaultRequest` is the request.",
  "check": [
   [
    "Where do you see why a Deployment's Pods are not being created under a quota?",
    "In the ReplicaSet's events (`kubectl describe rs`) or `kubectl get events`."
   ],
   [
    "Which LimitRange field sets the limit for containers that do not specify one?",
    "`default`; `defaultRequest` sets the request."
   ],
   [
    "Does changing a LimitRange update existing Pods?",
    "No; it applies only to Pods created after the change."
   ],
   [
    "How do you create a quota limiting a namespace to 5 Pods imperatively?",
    "`kubectl create quota <name> -n <ns> --hard=pods=5`."
   ]
  ]
 },
 {
  "t": "ConfigMaps: create from literals, files and env files; consume as env, envFrom and volumes",
  "hook": "Tess, a developer at Maplewood Pharmacy, needs to turn on debug logging in staging to chase an intermittent bug in the prescription service. The logging level lives in a ConfigMap. She edits it, checks that the new value is saved, and waits. An hour later the service is still logging at info level, and her colleague insists the change \"never works in Kubernetes\". Meanwhile, the nginx config file mounted from another ConfigMap did pick up its change on its own. Same kind of object, two different behaviors. Why did one change land and the other not, and what is the one command that would have finished Tess's job in seconds?",
  "simple": "A ConfigMap is a place to keep an app's settings outside the app itself, like a recipe card kept separate from the cookbook so you can change the amount of salt without reprinting the book. It holds simple name-and-value pairs, such as `LOG_LEVEL=info`. You can fill it from values you type, from whole files, or from a file of `NAME=value` lines. The app can read the settings in two ways: as environment variables, which are like notes handed to the app when it starts, or as files placed in a folder inside the container. The difference matters: notes handed over at start-up do not change until the app restarts, while files can be refreshed while it runs. ConfigMaps are for ordinary settings, not passwords.",
  "body": [
   "A ConfigMap stores non-secret configuration as key-value pairs, separate from the container image. That separation is the point: the same image can run in development, staging and production with different settings, and you can change configuration without rebuilding or re-pushing the image. Values are plain text and are shown to anyone who can read the object, so passwords, tokens and keys belong in a Secret instead.",
   "There are three imperative ways to create a ConfigMap, and the exam tests the differences. `--from-literal=KEY=value` adds one key-value pair per flag, and you can repeat the flag. `--from-file=path` adds a key named after the file, with the entire file contents as the value; `--from-file=mykey=path` lets you choose the key name instead, and pointing `--from-file` at a directory adds one key per file in it. `--from-env-file=path` reads a file of `KEY=value` lines and turns each line into its own key, ignoring blank lines and comments. The difference between the last two is a favorite exam trap: `--from-file=app.env` produces a single key named `app.env` holding the whole file as one value, while `--from-env-file=app.env` produces one key per line.",
   "```bash\nkubectl create configmap app-config --from-literal=LOG_LEVEL=info --from-literal=MODE=prod\nkubectl create configmap nginx-conf --from-file=default.conf\nkubectl create configmap app-env --from-env-file=app.env\nkubectl get configmap app-config -o yaml\n```",
   "Pods consume ConfigMaps in three ways. To set a single environment variable, use `env` with `valueFrom.configMapKeyRef`, naming the ConfigMap and the key; the variable name can differ from the key, which is useful when an app expects a name like `LEVEL` but your ConfigMap uses `LOG_LEVEL`. To import every key as an environment variable at once, use `envFrom` with `configMapRef`, optionally adding a `prefix` such as `CFG_` to avoid clashes. Keys that are not valid variable names are skipped and reported in an event, though recent Kubernetes versions accept almost any printable characters in names, so this is now rare. To expose keys as files, mount a `configMap` volume, where each key becomes a file under the mount path and the file's contents are the key's value. You can also pick specific keys with `items` to control which files appear and what they are called.",
   "```yaml\ncontainers:\n- name: app\n  image: app:1.0\n  env:\n  - name: LEVEL\n    valueFrom:\n      configMapKeyRef:\n        name: app-config\n        key: LOG_LEVEL\n  envFrom:\n  - configMapRef:\n      name: app-env\n    prefix: CFG_\n  volumeMounts:\n  - name: conf\n    mountPath: /etc/nginx/conf.d\nvolumes:\n- name: conf\n  configMap:\n    name: nginx-conf\n```",
   "Updates behave differently depending on how the ConfigMap is consumed, and this explains Tess's puzzle. Environment variables are read only when the container starts. If you change the ConfigMap, running containers keep the old values until they are restarted, for example with `kubectl rollout restart deploy/app`, which replaces Pods gradually. Mounted files, in contrast, are updated automatically after a short delay, because the kubelet periodically syncs the volume. There are two caveats: files mounted with `subPath` are never updated, and the application itself must notice the changed file and reload it, which some apps do and others do not.",
   "Availability and namespaces matter too. A ConfigMap must exist in the same namespace as the Pod that uses it; there is no cross-namespace reference. If a referenced ConfigMap or key is missing, the Pod fails to start with CreateContainerConfigError (for env references) or waits in ContainerCreating (for volumes), and `kubectl describe pod` names the missing object. Mark a reference `optional: true` if the Pod should start without it. Setting `immutable: true` on a ConfigMap prevents accidental edits and reduces load on the API server, because kubelets no longer need to watch it for changes; to change an immutable ConfigMap, you create a new one with a different name and point the workload at it.",
   "Keep ConfigMaps small and focused. The data in a single ConfigMap cannot exceed 1 MiB, so large files belong in a volume or an image, and binary content goes in the separate `binaryData` field rather than `data`. Splitting configuration into a few purpose-specific ConfigMaps, such as one for logging and one for feature flags, also makes changes easier to review and restart independently.",
   "On the exam, a fast workflow is to create the ConfigMap imperatively, generate the Pod or Deployment YAML with `--dry-run=client -o yaml`, and add the `env`, `envFrom` or volume section by hand. Afterward, confirm the result with `kubectl exec <pod> -- env` or by listing the mounted directory with `kubectl exec <pod> -- ls /etc/nginx/conf.d`."
  ],
  "analogy": "Environment variables from a ConfigMap are like a printed briefing handed to a pilot before takeoff: if headquarters changes the plan mid-flight, the pilot still holds the old sheet until the next flight (a restart). A ConfigMap volume is like a tablet in the cockpit that syncs updates automatically, though the pilot still has to look at it (the app must reload). The analogy stops at subPath: a file mounted with subPath behaves like a page torn out of the tablet, and it never updates.",
  "terms": [
   [
    "ConfigMap",
    "An object holding non-secret configuration as key-value pairs, used by Pods in the same namespace."
   ],
   [
    "--from-file",
    "Creates one key per file, named after the file (or a chosen name), holding the whole file as its value."
   ],
   [
    "--from-env-file",
    "Creates one ConfigMap key per KEY=value line in a file."
   ],
   [
    "configMapKeyRef",
    "Sets one environment variable from one ConfigMap key."
   ],
   [
    "envFrom",
    "Imports all keys of a ConfigMap or Secret as environment variables, optionally with a prefix."
   ],
   [
    "immutable",
    "ConfigMap setting that blocks edits; changes require a new ConfigMap."
   ]
  ],
  "example": "A team keeps `LOG_LEVEL` and `FEATURE_X` in a ConfigMap loaded with envFrom. To enable debug logging in staging, they edit the ConfigMap and run `kubectl rollout restart deploy/api`, because environment variables are only read at container start.",
  "mistakes": [
   [
    "`--from-file=app.env` creates one key per line.",
    "It creates a single key named `app.env` holding the whole file. Use `--from-env-file` for one key per line."
   ],
   [
    "Editing a ConfigMap updates environment variables in running Pods.",
    "Environment variables are fixed at container start. Restart the Pods, for example with `kubectl rollout restart`."
   ],
   [
    "A Pod can use a ConfigMap from another namespace.",
    "ConfigMaps must be in the Pod's own namespace."
   ],
   [
    "Mounted ConfigMap files always update.",
    "Files mounted with `subPath` do not update, and the app must reload changed files itself."
   ]
  ],
  "tryit": [
   [
    "A file `db.properties` contains three lines: `host=db`, `port=5432`, `name=orders`. The task asks for a ConfigMap `db-config` in which each line becomes its own key, and a Pod that exposes all of them as environment variables with the prefix `DB_`. What do you do?",
    "Create it with `kubectl create configmap db-config --from-env-file=db.properties`, then in the container add `envFrom: - configMapRef: {name: db-config}` with `prefix: DB_`. The Pod then sees `DB_host`, `DB_port` and `DB_name`. Using `--from-file` would have produced one key holding all three lines."
   ],
   [
    "A Pod is stuck with CreateContainerConfigError right after deployment. Its spec uses `configMapKeyRef` to key `timeout` in ConfigMap `api-settings`. The ConfigMap exists. What do you check next?",
    "Check that the ConfigMap is in the same namespace as the Pod and that it actually has a key named exactly `timeout` (keys are case-sensitive), using `kubectl get cm api-settings -n <ns> -o yaml`. `kubectl describe pod` will name the missing key or ConfigMap."
   ]
  ],
  "tip": "--from-file=app.env makes one key holding the whole file; --from-env-file=app.env makes one key per line. Env values do not update until the Pod restarts, while mounted files update unless they use subPath.",
  "check": [
   [
    "How do you set the variable DB_HOST from key `host` in ConfigMap `db`?",
    "An env entry named DB_HOST with valueFrom.configMapKeyRef name db and key host."
   ],
   [
    "You updated a ConfigMap used via envFrom. Why do Pods still see old values?",
    "Environment variables are set at container start; the Pods must be restarted."
   ],
   [
    "What does mounting a ConfigMap as a volume produce?",
    "One file per key under the mount path, containing the key's value."
   ],
   [
    "What status does a Pod show if an env-referenced ConfigMap key is missing?",
    "CreateContainerConfigError."
   ]
  ]
 },
 {
  "t": "Secrets: generic, docker-registry and tls types; base64 encoding vs encryption; secretKeyRef and volume mounts",
  "hook": "During a security review at Willow Creek Credit Union, the auditor scrolls through your Git repository and stops at a file called `db-secret.yaml`. \"This is your database password, committed in plain sight,\" she says. Your teammate protests: \"It's a Kubernetes Secret, it's encrypted, look, it's just random characters.\" The auditor copies one value, runs a single decoding command on her laptop, and reads the password aloud. The room goes quiet. What exactly is a Secret, what protects it and what does not, and how should the app have received that password in the first place?",
  "simple": "A Secret is a Kubernetes object for sensitive information, such as passwords, keys and login details for private image stores. Apps read Secrets the same way they read ordinary settings: as environment variables or as files. The surprising part is that the values are not locked, only written in a different alphabet called base64. That is like writing a note in pig Latin: it looks scrambled, but anyone who knows the trick can read it in seconds. The real protection comes from elsewhere: rules about who is allowed to look at Secrets, the cluster storing them encrypted on disk if an administrator turns that on, and keeping Secret files out of shared code repositories.",
  "body": [
   "A Secret holds sensitive data such as passwords, API (application programming interface) tokens, TLS (Transport Layer Security) keys and container registry credentials. It is used much like a ConfigMap, with the same patterns for environment variables and volumes, but Kubernetes handles it more carefully in several ways. Secrets can be restricted separately with RBAC (Role-Based Access Control), so a team can read ConfigMaps without reading Secrets. Kubelets only receive the Secrets needed by Pods scheduled on their own node. And Secret volumes are backed by tmpfs, an in-memory file system on the node, rather than written to the node's disk.",
   "kubectl creates three kinds of Secret, and the exam expects you to know each. `kubectl create secret generic` makes an Opaque Secret from `--from-literal`, `--from-file` or `--from-env-file`, exactly as for ConfigMaps. `kubectl create secret docker-registry regcred --docker-server=... --docker-username=... --docker-password=...` makes a Secret of type `kubernetes.io/dockerconfigjson`, which a Pod lists under `imagePullSecrets` so the kubelet can pull images from a private registry. `kubectl create secret tls web-tls --cert=tls.crt --key=tls.key` makes a `kubernetes.io/tls` Secret with exactly two keys, `tls.crt` and `tls.key`, which Ingresses reference to serve HTTPS. The type helps tools and the API server check that the right keys are present.",
   "```bash\nkubectl create secret generic db-cred --from-literal=username=app --from-literal=password='S3cure-pw'\nkubectl get secret db-cred -o jsonpath='{.data.password}' | base64 -d\nkubectl create secret tls web-tls --cert=tls.crt --key=tls.key\n```",
   "The single most important fact about Secrets is that values in the `data` field are base64-encoded, not encrypted. Base64 is a reversible encoding that lets binary data travel safely as text; it has no key, and anyone who can read the Secret can decode it with `base64 -d`. That is exactly what the auditor did. When writing a Secret manifest by hand, you either encode values yourself with `echo -n 'value' | base64`, where `-n` stops echo from adding a trailing newline that would become part of the password, or you put plain text in the `stringData` field, which the API server encodes into `data` for you. Neither option makes the file safe to commit.",
   "Real protection comes from other layers working together. RBAC limits who may `get`, `list` or `watch` Secrets, and those verbs should be granted sparingly, since `list` returns every Secret's contents in a namespace. Encryption at rest, configured by the cluster administrator on the API server, makes etcd store Secrets encrypted, so a stolen database backup does not reveal them. Keeping Secret manifests out of source control, or storing only encrypted forms produced by an external tool, prevents the problem the auditor found. Remember too that anyone who can create a Pod in a namespace can mount any Secret in that namespace, so Pod creation rights are effectively Secret read rights.",
   "Pods use Secrets in the same three ways as ConfigMaps. `env` with `valueFrom.secretKeyRef` sets one variable from one key. `envFrom` with `secretRef` imports all keys as variables. A `secret` volume mounts each key as a file; note that the volume field is `secretName`, not `name` as with ConfigMap volumes, which is a common typo. Files are generally preferred over environment variables for sensitive values. Environment variables are easier to leak through logs, crash dumps, debugging output or child processes, and they never change while the container runs, whereas mounted Secret files update when the Secret changes (unless mounted with `subPath`). The `defaultMode` field, such as `0400`, sets file permissions so only the owner can read them.",
   "```yaml\nenv:\n- name: DB_PASSWORD\n  valueFrom:\n    secretKeyRef:\n      name: db-cred\n      key: password\nvolumeMounts:\n- name: tls\n  mountPath: /etc/tls\n  readOnly: true\n# pod-level\nvolumes:\n- name: tls\n  secret:\n    secretName: web-tls\n    defaultMode: 0400\nimagePullSecrets:\n- name: regcred\n```",
   "Troubleshooting follows the ConfigMap pattern. A missing Secret or key referenced in `env` produces CreateContainerConfigError, and a missing Secret volume leaves the Pod in ContainerCreating; `kubectl describe pod` names what is missing. Secrets are namespaced and must live in the Pod's namespace, so a Secret created in `default` cannot be used by a Pod in `prod`. A wrong or missing `imagePullSecrets` entry shows up differently, as ImagePullBackOff with an 'unauthorized' message, because the problem is the image pull rather than container configuration. Like ConfigMaps, Secrets can be marked `immutable: true` to prevent accidental changes. A quick rule for choosing between the two objects: if a value would cause harm when posted in a team chat, such as a password, token or private key, it belongs in a Secret; everything else, such as log levels and feature flags, belongs in a ConfigMap."
  ],
  "analogy": "Base64 is like writing a password in mirror writing on a sticky note: it looks odd at a glance, but anyone who holds it up to a mirror reads it instantly. The real security is the locked drawer the note sits in (RBAC), the safe the drawer is kept in overnight (encryption at rest), and not photocopying the note for the shared noticeboard (keeping it out of Git). The analogy stops at one point: a person allowed to create Pods can effectively open the drawer, so access to Pods matters too.",
  "terms": [
   [
    "Opaque",
    "Default Secret type for arbitrary user data, created with kubectl create secret generic."
   ],
   [
    "kubernetes.io/dockerconfigjson",
    "Secret type holding registry credentials, used via imagePullSecrets."
   ],
   [
    "kubernetes.io/tls",
    "Secret type holding tls.crt and tls.key for certificates, often referenced by Ingresses."
   ],
   [
    "Base64",
    "Reversible text encoding used for Secret data; it provides no confidentiality."
   ],
   [
    "stringData",
    "Secret field that accepts plain text, which the API server encodes into data."
   ],
   [
    "secretKeyRef",
    "Sets one environment variable from one key of a Secret."
   ]
  ],
  "example": "A developer is asked to read the password in Secret `db-cred` and save it to a file. `kubectl get secret db-cred -o jsonpath='{.data.password}' | base64 -d > /opt/pw.txt` decodes it in one step, which also shows why RBAC on Secrets matters: anyone with get permission can do the same.",
  "mistakes": [
   [
    "Secrets are encrypted because the values look scrambled.",
    "They are only base64-encoded. Encryption at rest must be configured by an administrator, and RBAC controls who can read them."
   ],
   [
    "A Secret volume uses `name:` like a ConfigMap volume.",
    "The Secret volume source uses `secretName:`."
   ],
   [
    "`echo 'pass' | base64` is the right way to encode a value.",
    "Without `-n`, echo adds a newline that becomes part of the value. Use `echo -n`, or use `stringData`."
   ],
   [
    "A docker-registry Secret is used with secretKeyRef.",
    "Registry credentials are referenced in the Pod's `imagePullSecrets` list so the kubelet can authenticate pulls."
   ]
  ],
  "tryit": [
   [
    "A Pod must pull its image from a private registry and also needs a database password. A teammate puts both the registry credentials and the password in one generic Secret and references it with envFrom. Why will the image pull still fail, and what is the correct setup?",
    "The kubelet pulls images before the container starts and only uses Secrets listed in `imagePullSecrets` of type `kubernetes.io/dockerconfigjson`. Create a registry Secret with `kubectl create secret docker-registry`, list it under `spec.imagePullSecrets`, and keep the password in a separate generic Secret consumed through secretKeyRef or a volume."
   ],
   [
    "Your app reads its API token from an environment variable. Security asks you to reduce leak risk and allow token rotation without restarting. What do you change?",
    "Mount the Secret as a volume (without subPath) with a restrictive `defaultMode` and have the app read the token from the file. Files are less likely to leak through logs or child processes, and mounted Secret files update when the Secret changes, as long as the app rereads them."
   ]
  ],
  "tip": "Base64 is encoding, not encryption. Know the three create types (generic, docker-registry, tls), that secret volumes use `secretName`, and that `echo -n` avoids encoding a trailing newline.",
  "check": [
   [
    "Is data in a Secret encrypted by default?",
    "No, it is only base64-encoded in the API; encryption at rest must be configured by the administrator, and RBAC controls access."
   ],
   [
    "What keys does a tls Secret contain?",
    "`tls.crt` and `tls.key`."
   ],
   [
    "How does a Pod use a docker-registry Secret?",
    "By listing it under `spec.imagePullSecrets` so the kubelet can authenticate to the registry."
   ],
   [
    "Why are mounted files often preferred over environment variables for Secrets?",
    "Environment variables leak more easily through logs, dumps and child processes, and they do not update; mounted files can be permission-restricted and update when the Secret changes."
   ]
  ]
 },
 {
  "t": "ServiceAccounts: serviceAccountName, token projection, automountServiceAccountToken, kubectl create token",
  "hook": "A penetration test report lands on your desk at Silverline Travel. The testers found a small flaw in the public booking website, got a shell inside its container, and then read a file at `/var/run/secrets/kubernetes.io/serviceaccount/token`. With that token they listed Pods across the namespace. The booking site never talks to the Kubernetes API at all, so why did it carry a credential for it? Your lead asks you to fix it properly: give the one app that does need API access its own narrowly scoped identity, strip tokens from the apps that do not, and show how to hand a short-lived token to an external tool. Where do you start?",
  "simple": "People log in to Kubernetes with their own accounts. Apps running inside the cluster need an identity too, and that identity is called a ServiceAccount. Think of it as a staff badge issued to a program rather than a person. By default, each Pod is handed a badge automatically and finds it as a file inside the container. Today's badges expire on their own and are refreshed, which is safer than old badges that lasted forever. Many apps never need to talk to Kubernetes, so for them carrying a badge is pure risk: if someone breaks into the app, they can use it. You can switch the automatic badge off, give each app its own badge with only the permissions it needs, and print a short-lived badge for tools outside the cluster.",
  "body": [
   "Humans authenticate to the API server with their own credentials; applications running in Pods use ServiceAccounts. A ServiceAccount is a namespaced object that gives a Pod an identity, which RBAC (Role-Based Access Control) can then grant permissions to. Every namespace automatically has one called `default`, and a Pod that does not name a ServiceAccount runs as that one. The `default` account normally has no special permissions, which is why an app that suddenly needs to list ConfigMaps gets 403 Forbidden until someone grants access to an appropriate identity.",
   "Create a dedicated account with `kubectl create serviceaccount ci-bot -n dev` (the short resource name is `sa`) and assign it in the Pod template with `spec.serviceAccountName: ci-bot`. The field is set when the Pod is created and cannot be changed on a running Pod. For a Deployment, change the Pod template and let it roll out, or use `kubectl set serviceaccount deploy/app ci-bot`, which edits the template for you. The ServiceAccount must exist in the Pod's namespace, or the Pod is rejected at admission with an error saying the service account was not found. In RBAC bindings and in `kubectl auth can-i --as`, the account's full name is `system:serviceaccount:dev:ci-bot`. The older Pod field `serviceAccount` is deprecated; use `serviceAccountName`.",
   "By default the kubelet gives each Pod a token for its ServiceAccount through a projected volume, mounted at `/var/run/secrets/kubernetes.io/serviceaccount`. The directory contains three files: `token`, a signed JSON Web Token (JWT); `ca.crt`, the certificate authority bundle used to verify the API server's certificate; and `namespace`, the Pod's namespace. Kubernetes client libraries find these files automatically, which is how in-cluster tools authenticate without any configuration. Current tokens are bound tokens: they carry an audience, expire after a limited time, are tied to the specific Pod so they become invalid when it is deleted, and are refreshed by the kubelet before they expire. Older clusters automatically created long-lived tokens stored in Secrets for every ServiceAccount; that no longer happens, which greatly reduces the damage a leaked token can do.",
   "Most applications never talk to the Kubernetes API, and for them the token is an unnecessary risk. If an attacker compromises the container, as in the Silverline test, they can use the token with whatever permissions the account has. Turn mounting off with `automountServiceAccountToken: false`, either on the ServiceAccount, which affects every Pod that uses it, or in the Pod spec, which affects just that Pod. If both are set, the Pod's setting wins, so a single Pod can opt back in with `true` even when its ServiceAccount opts out.",
   "```yaml\napiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: web\n  namespace: shop\nautomountServiceAccountToken: false\n---\n# Pod spec excerpt\nspec:\n  serviceAccountName: web\n  automountServiceAccountToken: false\n```",
   "When a tool outside the cluster needs a token, request a short-lived one rather than digging one out of a Pod. `kubectl create token ci-bot -n dev` prints a token for that account, and `--duration=1h` or `--audience=<aud>` adjust its lifetime and intended audience. You can use it as a bearer token to test exactly what the account can do. If you truly need a long-lived token, for example for a legacy system that cannot refresh credentials, you can create a Secret of type `kubernetes.io/service-account-token` with an annotation naming the account, and the control plane fills in the token. Short-lived tokens remain the safer default because a leaked one stops working on its own.",
   "You can also project a token with a custom audience and expiry into a Pod yourself, using a `serviceAccountToken` source in a projected volume. This is useful when an external service, such as a secrets store or a cloud identity system, is configured to trust tokens issued by the cluster for a specific audience. The kubelet rotates these tokens too. A ServiceAccount can also list `imagePullSecrets`; Pods that run as that account then receive those registry credentials automatically, which saves repeating the same `imagePullSecrets` entry in every Pod template in a namespace.",
   "Putting it together gives a least-privilege recipe. Give each application that calls the API its own ServiceAccount, bind only the Role it needs, and verify with `kubectl auth can-i ... --as=system:serviceaccount:<ns>:<name>`. Disable token mounting for everything else. To check what a running Pod uses, run `kubectl get pod app -o jsonpath='{.spec.serviceAccountName}'`, and confirm whether a token is present with `kubectl exec app -- ls /var/run/secrets/kubernetes.io/serviceaccount`; with automounting disabled, that directory does not exist."
  ],
  "analogy": "A ServiceAccount is like a staff badge issued to a vending machine technician robot rather than a person. Modern badges expire every few hours and the front desk (the kubelet) quietly swaps in a fresh one, so a lost badge soon becomes useless. Turning off automount is deciding the coffee machine does not need a badge at all, since it never enters the server room. Where the analogy stops: the badge does nothing by itself; the doors it opens are decided separately by RBAC bindings.",
  "terms": [
   [
    "ServiceAccount",
    "A namespaced identity for processes running in Pods; every namespace has a `default` one."
   ],
   [
    "serviceAccountName",
    "Pod spec field choosing which ServiceAccount the Pod runs as; it cannot be changed on a running Pod."
   ],
   [
    "Bound (projected) token",
    "A short-lived, audience-scoped token tied to a Pod and refreshed by the kubelet."
   ],
   [
    "automountServiceAccountToken",
    "Setting on a ServiceAccount or Pod that controls whether the token is mounted; the Pod setting wins."
   ],
   [
    "kubectl create token",
    "Command that issues a short-lived token for a ServiceAccount, with optional --duration and --audience."
   ],
   [
    "system:serviceaccount:<ns>:<name>",
    "The username a ServiceAccount presents to the API server, used in --as and audit logs."
   ]
  ],
  "example": "A Pod that lists ConfigMaps gets 403 errors. It runs as `default`, which has no permissions. The developer creates ServiceAccount `config-reader`, binds a Role allowing get and list on configmaps, sets `serviceAccountName: config-reader` in the Deployment, and verifies with `kubectl auth can-i list configmaps --as=system:serviceaccount:app:config-reader -n app`.",
  "mistakes": [
   [
    "You can change a running Pod's ServiceAccount with kubectl edit.",
    "`serviceAccountName` is fixed at creation. Change the Deployment's template (or use `kubectl set serviceaccount`) so new Pods are created with it."
   ],
   [
    "If the ServiceAccount sets automount to false, no Pod using it can get a token.",
    "The Pod-level `automountServiceAccountToken` overrides the ServiceAccount's setting."
   ],
   [
    "Creating a ServiceAccount automatically creates a long-lived token Secret.",
    "Current Kubernetes versions do not. Use `kubectl create token` for short-lived tokens, or create a service-account-token Secret explicitly if truly required."
   ],
   [
    "Giving an app its own ServiceAccount grants it permissions.",
    "A new ServiceAccount has no permissions until a Role or ClusterRole is bound to it."
   ]
  ],
  "tryit": [
   [
    "A Deployment `frontend` in namespace `web` serves static pages and never calls the Kubernetes API. It currently runs as `default` with a mounted token. Another Deployment in the same namespace, `sync`, must read ConfigMaps. How do you secure both?",
    "For `frontend`, set `automountServiceAccountToken: false` in its Pod template (or on a dedicated ServiceAccount it uses). For `sync`, create a ServiceAccount such as `sync-sa`, bind a Role with get and list on configmaps in `web`, set `serviceAccountName: sync-sa` in its template, and verify with `kubectl auth can-i list configmaps -n web --as=system:serviceaccount:web:sync-sa`."
   ],
   [
    "A CI system outside the cluster needs to run `kubectl apply` as ServiceAccount `deployer` in namespace `ci` for a one-hour job. What is the safest way to give it a credential?",
    "Issue a short-lived token with `kubectl create token deployer -n ci --duration=1h` and pass it to the CI job as a protected variable. It expires automatically, unlike a long-lived service-account-token Secret. The account still needs an appropriate RoleBinding."
   ]
  ],
  "tip": "The Pod field is `serviceAccountName` (older `serviceAccount` is deprecated), the Pod-level automount setting overrides the ServiceAccount's, and you cannot change a running Pod's ServiceAccount. Use `kubectl create token` for short-lived tokens.",
  "check": [
   [
    "Which ServiceAccount does a Pod use if none is specified?",
    "The `default` ServiceAccount in its namespace."
   ],
   [
    "Where is the ServiceAccount token mounted in a container?",
    "/var/run/secrets/kubernetes.io/serviceaccount, as the file token alongside ca.crt and namespace."
   ],
   [
    "Why set automountServiceAccountToken to false?",
    "Apps that do not call the Kubernetes API do not need a token, and removing it limits what an attacker could do after compromising the container."
   ],
   [
    "How do you get a short-lived token for ServiceAccount `bot` in namespace `ops`?",
    "`kubectl create token bot -n ops`, optionally with `--duration`."
   ]
  ]
 },
 {
  "t": "SecurityContext at Pod and container level: runAsUser, runAsNonRoot, fsGroup, readOnlyRootFilesystem, allowPrivilegeEscalation",
  "hook": "Priya is reviewing a release for Lantern Insurance's claims portal when the security team forwards a scan report. The `claims-api` container runs as root, can write anywhere in its own filesystem, and could gain extra privileges through a setuid binary left in the base image. Nobody meant for it to be that way; it is simply what happens when a Pod spec says nothing about privilege. The release is tomorrow, and the platform team will not admit the Pod until it runs as an unprivileged user, cannot change its own binaries, and can still write uploaded files to its volume. Which fields go where, at the Pod or at the container, and how do you prove they worked?",
  "simple": "A container is just a program running on a shared computer. By default many programs run as root, the all-powerful administrator account. If an attacker breaks into a program running as root, they get a lot of power. A security context is a short list of settings in your Pod file that says \"run this program as an ordinary user, do not let it become more powerful, and do not let it change its own files.\" Some settings apply to the whole Pod, and some only to one container. Think of a hotel: the Pod-level settings are the rules for the whole floor, and the container settings are the rules for one room, which win if they disagree.",
  "body": [
   "Start with why this matters. Containers are ordinary processes sharing the node's Linux kernel, so the privileges they run with have real consequences. If an attacker exploits a bug in your app, a container running as root with a writable filesystem gives them far more to work with than one running as an unprivileged user with a read-only filesystem. They could replace binaries, download tools, or try to escalate further toward the node. The `securityContext` field lets you declare, in the manifest, exactly how much privilege each container gets, so the hardening travels with the workload instead of depending on someone remembering to do it.",
   "There are two levels, and knowing which field lives where is a favorite exam test. `spec.securityContext` on the Pod applies to all containers in the Pod and also holds Pod-only settings. `spec.containers[].securityContext` applies to one container and overrides the Pod-level value wherever both set the same field. So if the Pod says `runAsUser: 1000` and one container says `runAsUser: 2000`, that container runs as 2000 while the others run as 1000. Some fields exist only at one level, and putting them at the wrong level means the API server rejects the manifest as an unknown field, or the setting simply never applies.",
   "The identity fields come first. `runAsUser` sets the numeric user ID (UID) the container's processes run as, and `runAsGroup` sets the primary group ID (GID). `runAsNonRoot: true` asks the kubelet to verify that the container will not run as UID 0. If the image's configured user is root and no `runAsUser` overrides it, the kubelet refuses to start the container, and `kubectl get pod` shows the status `CreateContainerConfigError`. `kubectl describe pod` then shows an event such as 'container has runAsNonRoot and image will run as root'. There is a subtle second case: if the image names its user by name, such as `USER appuser` in the Dockerfile, rather than by number, the kubelet cannot verify that the name is not root and also refuses to start it. The fix in both cases is to set a numeric `runAsUser`. All three of these fields can be set at either level.",
   "`fsGroup` is Pod-level only. It adds a supplementary group ID to every container's processes, and when supported volumes are mounted, such as a PersistentVolumeClaim (PVC) or an emptyDir, Kubernetes makes their files group-owned by that ID with group write permission. That lets a non-root process write to the volume. It is the usual fix when a container running as UID 1000 logs 'permission denied' writing to its data directory. Because it touches volume ownership and every container, it has no container-level equivalent.",
   "Two important fields are container-level only. `readOnlyRootFilesystem: true` makes the container's own root filesystem read-only. Malware or an attacker cannot modify binaries or drop new tools, and the application cannot accidentally write to places it should not. Applications that need scratch space, such as a temporary directory or a cache, get an emptyDir volume mounted at that path, for example `/tmp`, which stays writable. `allowPrivilegeEscalation: false` prevents a process from gaining more privileges than its parent process, for example by running a setuid binary such as `sudo` or `su`. Under the hood it sets the Linux `no_new_privs` flag on the container's processes. Note that privilege escalation is always allowed when a container is privileged or has the `SYS_ADMIN` capability, so these settings work together.",
   "Here is a complete example that combines both levels. The Pod sets the identity and the volume group for everyone; the container locks down its own filesystem and escalation; and an emptyDir gives the app a writable `/tmp`.",
   "```yaml\nspec:\n  securityContext:\n    runAsUser: 1000\n    runAsGroup: 3000\n    fsGroup: 2000\n    runAsNonRoot: true\n  containers:\n  - name: app\n    image: app:1.0\n    securityContext:\n      readOnlyRootFilesystem: true\n      allowPrivilegeEscalation: false\n    volumeMounts:\n    - {name: tmp, mountPath: /tmp}\n  volumes:\n  - name: tmp\n    emptyDir: {}\n```",
   "Always verify from inside the container rather than trusting the YAML. `kubectl exec app -- id` should print `uid=1000 gid=3000` with 2000 among the supplementary groups. `kubectl exec app -- touch /test` should fail with 'Read-only file system', while `kubectl exec app -- touch /tmp/test` succeeds. If the Pod never starts, read the events in `kubectl describe pod`; a `CreateContainerConfigError` almost always points to `runAsNonRoot` and the image user. To check what a running Pod actually received, `kubectl get pod app -o yaml` shows the merged spec.",
   "Other container fields you will meet alongside these are `privileged` (gives the container nearly full access to the host; avoid it for applications), `capabilities` (adding or dropping individual root powers) and `seccompProfile` (limiting which system calls the process may make). Those are covered with Pod Security Admission, which checks many of these same fields. A good habit for the exam is to remember the split: `fsGroup` lives only on the Pod; `readOnlyRootFilesystem`, `allowPrivilegeEscalation`, `capabilities` and `privileged` live only on containers; and the identity fields can go on either, with the container winning."
  ],
  "analogy": "Think of an office building. The Pod-level security context is the badge policy for the whole floor: everyone on it works as \"staff, badge 1000\", and everyone shares access to the team storage room (fsGroup). The container-level context is the rule for one desk: this desk's drawers are locked shut (read-only root filesystem) and nobody at it may borrow a manager's key (no privilege escalation). If the desk rule and floor rule disagree, the desk rule wins. The analogy stops at storage: fsGroup has no desk-level version.",
  "terms": [
   [
    "runAsUser",
    "Numeric user ID (UID) the container's processes run as; Pod or container level."
   ],
   [
    "runAsGroup",
    "Numeric primary group ID for the container's processes; Pod or container level."
   ],
   [
    "runAsNonRoot",
    "When true, the kubelet refuses to start a container that would run as UID 0 or whose user it cannot verify as non-root."
   ],
   [
    "fsGroup",
    "Pod-level-only supplementary group applied to all containers and to the ownership of supported volumes."
   ],
   [
    "readOnlyRootFilesystem",
    "Container-level-only setting that makes the container's root filesystem read-only."
   ],
   [
    "allowPrivilegeEscalation",
    "Container-level-only setting that, when false, sets no_new_privs so processes cannot gain more privileges than their parent."
   ],
   [
    "CreateContainerConfigError",
    "Pod status shown when the kubelet cannot create a container from its configuration, for example a runAsNonRoot violation."
   ]
  ],
  "example": "A task asks for a Pod that runs as user 1000, writes only to /data on a PVC, and cannot modify its own filesystem. You set `runAsUser: 1000` and `fsGroup: 1000` in the Pod-level securityContext, set `readOnlyRootFilesystem: true` and `allowPrivilegeEscalation: false` on the container, and confirm with `kubectl exec <pod> -- id`, a successful `touch /data/x` and a failed `touch /x`.",
  "mistakes": [
   [
    "Putting fsGroup in the container's securityContext",
    "fsGroup exists only at the Pod level, because it affects volume ownership for every container. Move it to spec.securityContext."
   ],
   [
    "Assuming the Pod-level value always wins",
    "It is the reverse. The container-level value overrides the Pod-level value for the same field."
   ],
   [
    "Thinking runAsNonRoot changes the user the container runs as",
    "It only checks. It does not pick a user; if the image runs as root or a named user, the container fails with CreateContainerConfigError until you set a numeric runAsUser."
   ],
   [
    "Expecting readOnlyRootFilesystem to break every app",
    "Apps that need to write scratch files keep working if you mount an emptyDir at the path they write to, such as /tmp, while the rest stays read-only."
   ]
  ],
  "tryit": [
   [
    "Your new Pod uses an image whose Dockerfile ends with `USER node`. The Pod spec sets `runAsNonRoot: true` and nothing else in the security context. The Pod shows CreateContainerConfigError. What is the smallest change that lets it start while staying non-root?",
    "Add a numeric runAsUser, for example `runAsUser: 1000`, at the Pod or container level. The kubelet cannot verify that a user given by name is not root, so it refuses; a numeric UID that is not 0 satisfies the check."
   ],
   [
    "A container running as UID 1000 gets 'permission denied' writing to /data, which is a mounted PVC. The image is fine and the user is correct. Which single field do you add, and at which level?",
    "Add `fsGroup` with a suitable group ID, such as 1000, in the Pod-level securityContext. Kubernetes makes the supported volume group-owned by that ID and adds the group to the process, so it can write."
   ]
  ],
  "tip": "fsGroup is Pod-level only; readOnlyRootFilesystem, allowPrivilegeEscalation, capabilities and privileged are container-level only. runAsUser, runAsGroup and runAsNonRoot can go at either level, and container values override Pod values. Verify with `kubectl exec -- id` and a test write.",
  "check": [
   [
    "A Pod sets runAsUser 1000 and one container sets runAsUser 2000. What UID does that container use?",
    "2000, because container-level settings override Pod-level ones for the same field."
   ],
   [
    "Why does a container with runAsNonRoot: true fail with CreateContainerConfigError?",
    "Its image runs as root, or as a user given by name, and no numeric runAsUser overrides it, so the kubelet cannot confirm it is non-root and refuses to start it."
   ],
   [
    "Where do you set fsGroup?",
    "Only in the Pod-level securityContext."
   ],
   [
    "How can an app with readOnlyRootFilesystem: true still write temporary files?",
    "Mount a writable volume, such as an emptyDir, at the directory it writes to, for example /tmp."
   ]
  ]
 },
 {
  "t": "Linux capabilities (add/drop) and Pod Security Admission levels (privileged, baseline, restricted)",
  "hook": "Marcus deploys the new reporting service at Cedar Ridge Health into the `payments` namespace, and `kubectl apply` returns a cheerful \"deployment.apps/reports created\". Ten minutes later the dashboard still shows zero ready Pods. There is no CrashLoopBackOff, no failing probe, not even a Pending Pod to describe. The namespace was locked down last week by the platform team, and something in the Pod template has quietly broken a rule nobody told Marcus about. Where does the real error hide when a Deployment exists but its Pods never appear, and what exactly does the platform expect a well-behaved container to declare?",
  "simple": "On Linux, the root user can do everything. Capabilities split that power into small named permissions, like \"may use low port numbers\" or \"may change network settings\", so a program can get just the one it needs instead of everything. Pod Security Admission is a gatekeeper built into Kubernetes. A namespace gets a label that says how strict to be: privileged (anything goes), baseline (block the obviously dangerous things) or restricted (follow the full safety checklist). When you create a Pod, the gatekeeper checks its settings against that level and can reject it, log it or just warn you. It is like a building that lets visitors in with no check, with a quick bag check, or only after a full security screening.",
  "body": [
   "Start with capabilities. Traditionally on Linux, root could do everything and other users almost nothing. Capabilities split root's power into smaller named privileges. Common examples are `NET_BIND_SERVICE` (bind to ports below 1024), `NET_ADMIN` (change network settings such as interfaces and routes), `CHOWN` (change file ownership) and `SYS_ADMIN` (a very broad set of administrative actions, often described as nearly as powerful as root). Container runtimes give containers a default subset of capabilities, which is smaller than full root but still more than most applications need, and you can adjust that set per container.",
   "You adjust them in `securityContext.capabilities`, which exists at the container level only. You list capabilities to `add` and to `drop`, written without the `CAP_` prefix that Linux documentation uses, so `NET_BIND_SERVICE`, not `CAP_NET_BIND_SERVICE`. The recommended pattern is to drop everything and add back only what is needed. A web server that must listen on port 80 while running as a non-root user needs only `NET_BIND_SERVICE`. Avoid `privileged: true`, which grants all capabilities and access to the host's devices, and be very cautious with broad capabilities such as `SYS_ADMIN`. A hardened container security context looks like this:",
   "```yaml\nsecurityContext:\n  runAsNonRoot: true\n  allowPrivilegeEscalation: false\n  capabilities:\n    drop: [\"ALL\"]\n    add: [\"NET_BIND_SERVICE\"]\n  seccompProfile:\n    type: RuntimeDefault\n```",
   "The `seccompProfile` here uses secure computing mode (seccomp) to limit which system calls the process may make; `RuntimeDefault` applies the container runtime's default filter. It can be set at Pod or container level, and the restricted level below requires it.",
   "Next, who checks these settings. Pod Security Admission (PSA) is the built-in admission controller that enforces the Pod Security Standards namespace by namespace. An admission controller runs inside the API server after authentication and authorization and can accept or reject an object before it is stored. PSA defines three levels, from least to most strict. Privileged is unrestricted and meant for trusted system workloads such as network plugins. Baseline blocks known privilege escalations while staying easy to adopt: no privileged containers, no host namespaces (`hostNetwork`, `hostPID`, `hostIPC`), no `hostPath` volumes, no host ports, and no added capabilities beyond a small default-like set. Restricted follows current hardening best practice: everything in baseline plus `runAsNonRoot: true`, `allowPrivilegeEscalation: false`, capabilities that drop `ALL` (with only `NET_BIND_SERVICE` allowed to be added back), a seccomp profile of `RuntimeDefault` or `Localhost`, and only a limited list of volume types such as configMap, secret, emptyDir, projected, downwardAPI and persistentVolumeClaim.",
   "You apply levels with namespace labels, one label per mode. The `enforce` mode rejects violating Pods. The `audit` mode allows them but records the violation in the API server's audit log. The `warn` mode allows them but returns a warning message to the user running kubectl. You can combine modes with different levels, which is a common migration path: enforce baseline today while warning about restricted, so teams see what they need to fix next. An optional `-version` label, such as `pod-security.kubernetes.io/enforce-version`, pins the standard to a specific Kubernetes minor version, or to `latest`.",
   "```bash\nkubectl label namespace shop \\\n  pod-security.kubernetes.io/enforce=baseline \\\n  pod-security.kubernetes.io/warn=restricted\n```",
   "Now the trap from the opening scene. Enforcement applies to Pods, not to Deployments or other workload objects. If a Deployment's Pod template violates an enforced level, the Deployment is created successfully, and so is its ReplicaSet, but the ReplicaSet cannot create any Pods. The error, such as 'violates PodSecurity \"restricted:latest\": allowPrivilegeEscalation != false', appears in `kubectl describe rs <name>` and in `kubectl get events`, not on the Deployment's own status line. The warn and audit modes do check workload templates, so if the namespace also has a warn label you see the warning immediately when applying the Deployment. That early warning is a strong reason to set warn alongside enforce.",
   "Two final details complete the picture. Labeling a namespace does not remove Pods that are already running there; kubectl warns you about existing violations and new Pods are then blocked. And the fix is always in the Pod's securityContext and spec, not in the Deployment's metadata. The error message lists every field that needs to change, so read it carefully, add the missing settings to the Pod template, and the ReplicaSet will create Pods on its next attempt. For the exam, remember that a Deployment showing 0 ready replicas with no Pods at all is the signal to describe the ReplicaSet."
  ],
  "analogy": "Pod Security Admission is like the entry desk of an office building with three possible policies: wave everyone through (privileged), check bags for obvious weapons (baseline), or run a full screening that also checks your badge and what you are carrying (restricted). The enforce, warn and audit modes are whether the guard turns you away, tells you about the problem but lets you in, or quietly writes it in a logbook. Capabilities are the individual keys on your key ring. The analogy breaks for Deployments: the guard checks each Pod as it arrives, not the Deployment that sent it.",
  "mnemonic": "Levels from least to most strict: \"Please Be Restrictive\" for Privileged, Baseline, Restricted.",
  "terms": [
   [
    "Capability",
    "A named slice of root privilege, such as NET_BIND_SERVICE, that can be added to or dropped from a container; written without the CAP_ prefix."
   ],
   [
    "seccompProfile",
    "Setting that limits which system calls a container may make; RuntimeDefault uses the container runtime's default filter."
   ],
   [
    "Pod Security Admission (PSA)",
    "Built-in admission controller that enforces the Pod Security Standards through namespace labels."
   ],
   [
    "Privileged level",
    "Unrestricted Pod Security level for trusted system workloads."
   ],
   [
    "Baseline level",
    "Pod Security level that blocks known privilege escalations such as privileged containers, host namespaces and hostPath volumes."
   ],
   [
    "Restricted level",
    "Strictest Pod Security level, requiring non-root, no privilege escalation, dropping ALL capabilities and a RuntimeDefault or Localhost seccomp profile."
   ],
   [
    "enforce / audit / warn",
    "PSA modes that reject violating Pods, record them in the audit log, or return a warning to the user."
   ]
  ],
  "example": "The `payments` namespace is labeled `pod-security.kubernetes.io/enforce=restricted`. A new Deployment shows 0 ready Pods and `kubectl get pods` shows none. `kubectl describe rs` lists missing runAsNonRoot, allowPrivilegeEscalation, capabilities and seccompProfile settings. Adding `runAsNonRoot: true`, `allowPrivilegeEscalation: false`, `capabilities: drop: [\"ALL\"]` and `seccompProfile: type: RuntimeDefault` to the Pod template lets the ReplicaSet create Pods.",
  "mistakes": [
   [
    "Writing capabilities as CAP_NET_BIND_SERVICE",
    "In Kubernetes manifests capabilities are written without the CAP_ prefix, for example NET_BIND_SERVICE."
   ],
   [
    "Looking for the PSA error on the Deployment",
    "The Deployment and ReplicaSet are created; Pod creation is what fails. Look in `kubectl describe rs` and the namespace events."
   ],
   [
    "Believing that labeling a namespace evicts existing violating Pods",
    "Running Pods keep running. PSA only checks new Pods, though kubectl warns about existing violations when you add the label."
   ],
   [
    "Thinking warn mode blocks anything",
    "Warn only returns a message to the user; only enforce rejects Pods. Audit only records the violation."
   ]
  ],
  "tryit": [
   [
    "A namespace has `enforce=baseline` and `warn=restricted`. You apply a Deployment whose containers run as root but are not privileged and use no host namespaces. What happens?",
    "The Deployment is created and its Pods run, because baseline does not require non-root. kubectl shows a warning that the Pods would violate restricted, for example because runAsNonRoot and allowPrivilegeEscalation are not set. That warning is a to-do list for moving to restricted."
   ],
   [
    "A web container must listen on port 80 as UID 1000 in a namespace enforcing restricted. Which capability settings do you use?",
    "Drop ALL and add only NET_BIND_SERVICE in the container's securityContext.capabilities, along with runAsNonRoot, allowPrivilegeEscalation false and a RuntimeDefault seccomp profile. Restricted allows NET_BIND_SERVICE as the only added capability."
   ]
  ],
  "tip": "Capabilities are container-level only and written without CAP_. PSA errors for Deployments appear on the ReplicaSet and in events. Restricted requires drop ALL, runAsNonRoot true, allowPrivilegeEscalation false and a RuntimeDefault or Localhost seccomp profile.",
  "check": [
   [
    "Which capability lets a non-root process bind to port 80?",
    "NET_BIND_SERVICE."
   ],
   [
    "What label makes a namespace reject Pods that fail the baseline level?",
    "`pod-security.kubernetes.io/enforce=baseline`."
   ],
   [
    "What is the difference between PSA's warn and enforce modes?",
    "Warn admits violating Pods but returns a warning to the user; enforce rejects them."
   ],
   [
    "A Deployment in a restricted namespace has 0 Pods. Where do you find the reason?",
    "In `kubectl describe rs` for its ReplicaSet, or in the namespace events, which show the PodSecurity violation."
   ]
  ]
 },
 {
  "t": "Service types: ClusterIP, NodePort, LoadBalancer, ExternalName and headless (clusterIP: None)",
  "hook": "Jonah is on his first week at Bluefin Logistics, and his ticket reads: \"Make the tracking API reachable from outside, keep the database internal, point the app at the partner's hosted geocoder, and give each replica of the message queue its own stable name.\" He opens the Service documentation and finds five options that all sound plausible. Pick the wrong one and the database ends up exposed on every node, or the public API sits forever at `<pending>`, or the queue replicas cannot find each other. Which Service type fits each of those four jobs, and how do they relate to one another?",
  "simple": "Pods in Kubernetes are like temporary workers: they come and go, and each new one gets a different address. A Service gives a group of Pods one permanent name and address, like a company's main phone number that forwards to whoever is on shift. The Service type decides who can call that number. ClusterIP means only callers inside the cluster. NodePort also opens a door on every machine in the cluster. LoadBalancer asks the cloud for a public front door. ExternalName is just a nickname for an address outside the cluster. Headless skips the main number and hands out each worker's direct line.",
  "body": [
   "Start with the problem Services solve. Pods are disposable. A Deployment replaces them during rollouts, after crashes and when nodes fail, and each new Pod gets a new IP address. Clients cannot keep up with that. A Service gives a stable name and a stable virtual IP address in front of a changing set of Pods, chosen by a label selector, and it spreads connections across the ready Pods. The Service's `type` field decides who can reach it, and the types build on each other in a way that is easy to remember once you see it.",
   "ClusterIP is the default type, used when you do not set `type` at all. The Service gets a virtual IP, called the cluster IP, that is reachable only from inside the cluster, plus a DNS name such as `orders.shop.svc.cluster.local`. kube-proxy, or the network plugin in some clusters, runs on each node and programs packet-forwarding rules so that traffic sent to that IP and port is forwarded to one of the ready Pods. No process actually listens on the cluster IP; it exists only in those rules. Use ClusterIP for internal back ends: databases, internal APIs, caches, anything that other Pods call but outsiders should not.",
   "NodePort builds on ClusterIP. The Service still gets a cluster IP, and in addition the same port is opened on every node, chosen by default from the range 30000 to 32767 unless you set `nodePort` yourself. Traffic arriving at any node's IP on that port reaches the Service, even if no matching Pod runs on that particular node, because kube-proxy forwards it across the cluster. NodePort is simple and handy for labs and testing, for example `curl <node-ip>:30080`, but it exposes an unusual high port and a node's address directly to clients, so production traffic usually arrives another way.",
   "LoadBalancer builds on NodePort. Kubernetes asks the cloud provider, or a load balancer add-on in bare-metal clusters, to create an external load balancer that forwards to the Service's node ports. When it is ready, its address appears in the EXTERNAL-IP column of `kubectl get svc`. In a local cluster such as kind or minikube without such an integration, the column stays `<pending>` indefinitely; minikube offers `minikube tunnel` to fill it in. Each LoadBalancer Service usually means a separate cloud load balancer with its own cost, which is one reason HTTP applications are often exposed through a single Ingress instead of many LoadBalancer Services.",
   "ExternalName is different. It has no selector and no Pods behind it. It maps a Service name to an external DNS name by making cluster DNS return a CNAME record. Setting `externalName: db.example.com` makes `db.<namespace>.svc.cluster.local` resolve to `db.example.com`. That lets in-cluster code use a stable internal name while the real target lives elsewhere, and you can later replace it with a normal Service without changing application configuration. No proxying, no load balancing and no port mapping happen; the client connects directly to whatever the external name resolves to.",
   "A headless Service sets `clusterIP: None`. There is no virtual IP and kube-proxy does no load balancing. Instead, DNS returns the IP addresses of the individual ready Pods, and the client chooses which one to talk to. StatefulSets use headless Services so that each Pod gets its own stable DNS name, such as `db-0.db.prod.svc.cluster.local`, which clustered databases and message queues need so members can find specific peers. Headless Services still use a selector, and you can tell them apart in `kubectl get svc` because the CLUSTER-IP column shows `None`.",
   "Here is a NodePort Service. The `port` is what clients use at the cluster IP, `targetPort` is where the container listens, and `nodePort` is the port opened on every node.",
   "```yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: web\nspec:\n  type: NodePort\n  selector:\n    app: web\n  ports:\n  - port: 80\n    targetPort: 8080\n    nodePort: 30080\n```",
   "Finally, reading and changing Services. `kubectl get svc` shows TYPE, CLUSTER-IP, EXTERNAL-IP and PORT(S), where a NodePort appears as `80:30080/TCP`, meaning Service port 80 mapped to node port 30080. The type of an existing Service can be changed with `kubectl edit svc web` or a patch such as `kubectl patch svc web -p '{\"spec\":{\"type\":\"NodePort\"}}'`. For exam questions, remember the nesting: a LoadBalancer includes a NodePort, which includes a ClusterIP, while ExternalName and headless are the two odd ones out with no virtual IP and no proxying."
  ],
  "analogy": "Think of a company phone system. ClusterIP is an internal extension that only works from desk phones inside the building. NodePort adds a direct-dial number on every branch office's switchboard. LoadBalancer hires a receptionist service with a public number that forwards to those switchboards. ExternalName is a speed-dial entry that simply redirects you to an outside company's number. Headless gives you the staff directory so you call a person directly. The analogy stops at DNS: ExternalName works purely through a DNS alias, with no call forwarding at all.",
  "mnemonic": "The nesting from inside out: \"Cats Nap Long\" for ClusterIP inside NodePort inside LoadBalancer.",
  "terms": [
   [
    "ClusterIP",
    "Default Service type with an internal virtual IP reachable only inside the cluster."
   ],
   [
    "NodePort",
    "Service type that adds a port, by default from 30000 to 32767, opened on every node."
   ],
   [
    "LoadBalancer",
    "Service type that provisions an external load balancer through the cloud provider or an add-on; builds on NodePort."
   ],
   [
    "ExternalName",
    "Service type that returns a DNS CNAME to an external host name, with no selector and no proxying."
   ],
   [
    "Headless Service",
    "Service with clusterIP: None whose DNS name returns the individual ready Pod IPs."
   ],
   [
    "kube-proxy",
    "Node component that programs forwarding rules so traffic to a Service IP reaches backend Pods."
   ]
  ],
  "example": "An app uses a ClusterIP Service `orders` for its internal API, a LoadBalancer Service for its public gateway, an ExternalName Service `payments` pointing to a partner's host name so code can call `payments` like any other Service, and a headless Service `queue` for its three-replica StatefulSet so members reach each other as `queue-0.queue`, `queue-1.queue` and `queue-2.queue`.",
  "mistakes": [
   [
    "Choosing NodePort to keep a database internal",
    "NodePort opens a port on every node. An internal database should use ClusterIP, the default."
   ],
   [
    "Expecting a LoadBalancer Service to get an external IP in any cluster",
    "It needs a cloud provider integration or a load balancer add-on. Without one, EXTERNAL-IP stays pending."
   ],
   [
    "Thinking ExternalName proxies traffic or remaps ports",
    "It only returns a DNS CNAME. Clients connect straight to the external host on whatever port they use."
   ],
   [
    "Assuming a headless Service load-balances through a virtual IP",
    "With clusterIP: None there is no virtual IP; DNS returns each ready Pod's IP and the client picks."
   ]
  ],
  "tryit": [
   [
    "Your team runs a kind cluster for testing. You create a LoadBalancer Service and the EXTERNAL-IP shows `<pending>` for an hour. A teammate says the Service is broken. Can you still reach the app, and how?",
    "Yes. A LoadBalancer Service also has a NodePort and a ClusterIP, so you can connect to any node's IP on the assigned node port, shown in PORT(S) as `80:3xxxx/TCP`. The pending address only means nothing is provisioning an external load balancer."
   ],
   [
    "Application code in your cluster must call a managed database at a provider's host name, and you want to switch to an in-cluster database later without changing the app's configuration. Which Service type do you use now?",
    "An ExternalName Service, for example named `db`, with `externalName` set to the provider's host name. The app calls `db`; later you replace it with a ClusterIP Service of the same name that selects in-cluster Pods."
   ]
  ],
  "tip": "Each type builds on the previous one: LoadBalancer includes a NodePort, which includes a ClusterIP. ExternalName and headless are the odd ones out, with no virtual IP and no proxying. A LoadBalancer stuck at pending is still reachable through its node port.",
  "check": [
   [
    "What is the default Service type?",
    "ClusterIP."
   ],
   [
    "A LoadBalancer Service in a local kind cluster shows EXTERNAL-IP <pending>. Why?",
    "There is no cloud provider or load balancer add-on to provision an external address."
   ],
   [
    "What does DNS return for a headless Service?",
    "The IP addresses of the individual ready Pods instead of a single virtual IP."
   ],
   [
    "What does an ExternalName Service's DNS name resolve to?",
    "A CNAME record pointing to the external host name in its externalName field."
   ]
  ]
 },
 {
  "t": "Selectors, port vs targetPort vs nodePort, named ports",
  "hook": "At Willow Bank's internal tools team, Dana gets a message from a developer: \"The api Service is up, the Pods are Running, but every request to api:80 just times out.\" Dana runs `kubectl get svc api` and sees a cluster IP. She runs `kubectl get pods` and sees three healthy replicas. Everything looks fine, yet nothing gets through. Somewhere between the client's request and the process inside the container, a number does not line up, or a label does not match. Which of the Service's numbers is the culprit, and how do you tell a port problem from a selector problem in under a minute?",
  "simple": "A Service has two jobs: find the right Pods, and send traffic to the right door on each Pod. It finds Pods using labels, like name tags; any Pod wearing all the tags the Service asks for is included. Then it uses port numbers. The \"port\" is the door number clients knock on at the Service. The \"targetPort\" is the door number on the Pod where the program is actually listening. The \"nodePort\" is an extra door on every machine, used only by some Service types. If the Service sends visitors to door 80 but the program sits behind door 3000, nobody answers. Naming a port, like \"http\", is like labeling a door so you do not have to remember its number.",
  "body": [
   "Two things decide whether a Service works. Its selector must match the right Pods, and its port numbers must line up with where the application actually listens. Most Service bugs on the exam are one or the other, and each has a distinct fingerprint, so it pays to understand both pieces precisely.",
   "Start with the selector. It is a set of labels written as a simple map, such as `app: web` and `tier: front`. The Service targets every Pod in its own namespace whose labels include all of those key-value pairs; extra labels on the Pod do not matter, but a missing or different one excludes it. The Service matches Pod labels, not Deployment labels, so always check the Pod template's `metadata.labels`, not the Deployment's own metadata. The Service selector is equality-only; the richer `matchLabels` and `matchExpressions` syntax that Deployments and NetworkPolicies use is not available in a Service. Compare the two sides with `kubectl describe svc web | grep Selector` and `kubectl get pods --show-labels`, or test the selector directly with `kubectl get pods -l app=web,tier=front`.",
   "Next come the ports. Each entry in a Service's `ports` list can carry up to three numbers. `port` is the port the Service itself listens on, at its cluster IP and DNS name; clients connect to `web:80`. `targetPort` is the port on the Pods that traffic is forwarded to, which must be where the container process actually listens. If you omit `targetPort`, it defaults to the same value as `port`, which is a common source of bugs when the app listens somewhere else. `nodePort` applies only to NodePort and LoadBalancer Services and is the port opened on every node; leave it out and one is assigned from the node port range, by default 30000 to 32767. The flow for a NodePort Service looks like this:",
   "```text\nclient -> <node-ip>:30080 (nodePort)\n       -> <service-ip>:80   (port)\n       -> <pod-ip>:8080     (targetPort, the containerPort)\n```",
   "Named ports add flexibility. A container can name its ports in the Pod spec, for example `name: http` with `containerPort: 8080`. A Service can then use `targetPort: http` instead of a number. This decouples the Service from the number: if a new image version listens on 9090 under the same name, the Service keeps working without edits, and different Pods behind one Service can even use different numbers during a migration. Port names must be lowercase and short, using letters, digits and hyphens. Note that `containerPort` itself is mostly informational: a container listening on a port it did not declare still receives traffic sent to a numeric targetPort, but a named targetPort only resolves if that name is declared in the container spec.",
   "```yaml\n# Pod template\ncontainers:\n- name: app\n  image: app:1.0\n  ports:\n  - name: http\n    containerPort: 8080\n---\n# Service\nspec:\n  selector:\n    app: web\n  ports:\n  - name: web\n    protocol: TCP\n    port: 80\n    targetPort: http\n```",
   "A few rules about the `ports` list round this out. When a Service exposes more than one port, each port entry must have a `name`, so that EndpointSlices and DNS SRV records can tell them apart. `protocol` defaults to TCP; UDP and SCTP (Stream Control Transmission Protocol) are also supported, for example UDP on port 53 for DNS. The same port number can appear twice if the protocols differ.",
   "It also helps to know where each number shows up in kubectl output, because exam tasks often hand you a broken Service and expect you to read it quickly. In `kubectl get svc`, the PORT(S) column shows the Service port, followed by the node port for NodePort Services, as in `80:30080/TCP`; the targetPort is not shown there. `kubectl describe svc web` lists Port, TargetPort, NodePort and Endpoints on separate lines, which makes it the best single view. The Endpoints line shows Pod IPs with the resolved target port, such as `10.244.1.7:8080`, so a named targetPort that resolved correctly appears as a number there.",
   "Finally, a reliable troubleshooting order. First check endpoints with `kubectl get endpointslices -l kubernetes.io/service-name=web` or the Endpoints line of `kubectl describe svc web`. If there are none, the selector or Pod readiness is wrong, and ports are irrelevant for now. If endpoints exist, note the port shown there, then test that port directly on a Pod IP from a temporary Pod, for example `kubectl run t --image=busybox --rm -it --restart=Never -- wget -qO- -T 2 10.244.1.7:8080`. If that fails with 'connection refused', the targetPort is wrong or the app is listening only on 127.0.0.1. If it succeeds, test through the Service name and port. This order isolates the fault in three commands, which matters under exam time pressure."
  ],
  "analogy": "Picture an apartment building. The Service selector is the doorman's guest list: anyone wearing all the right name tags gets counted as a resident. The `port` is the building's street number that visitors use. The `targetPort` is the apartment number where the resident actually lives, and if the doorman sends visitors to apartment 80 when the resident is in 3000, nobody answers. A named port is a nameplate on the door, so the doorman can say \"go to Smith\" even after Smith moves to a different apartment. The analogy stops at nodePort, which is like a side entrance on every building in the complex.",
  "terms": [
   [
    "selector",
    "Equality-based label map; the Service targets Pods in its namespace whose labels include every pair."
   ],
   [
    "port",
    "The port the Service listens on at its cluster IP and DNS name."
   ],
   [
    "targetPort",
    "The Pod port traffic is forwarded to; defaults to port and may be a named port."
   ],
   [
    "nodePort",
    "The port opened on every node for NodePort and LoadBalancer Services."
   ],
   [
    "Named port",
    "A containerPort with a name that a Service can reference as its targetPort."
   ],
   [
    "protocol",
    "TCP by default; UDP and SCTP are also supported per port entry."
   ]
  ],
  "example": "Requests to `api:80` time out even though endpoints exist. Checking the Pods shows the app listens on 3000, while the Service has `targetPort: 80` because it was omitted and defaulted to port. Changing targetPort to 3000, or naming the container port `http` and using `targetPort: http`, fixes it, confirmed with a wget from a temporary Pod.",
  "mistakes": [
   [
    "Matching the Service selector to the Deployment's labels",
    "The Service selects Pods. Copy the labels from the Pod template, not from the Deployment's own metadata."
   ],
   [
    "Assuming targetPort defaults to the containerPort",
    "If omitted, targetPort equals the Service port, not the container's declared port. Set it explicitly when they differ."
   ],
   [
    "Using matchLabels or matchExpressions in a Service selector",
    "Service selectors are a plain equality map; matchLabels and matchExpressions belong to Deployments, ReplicaSets and NetworkPolicies."
   ],
   [
    "Thinking clients connect to the targetPort",
    "Clients call the Service port, such as web:80. The targetPort is only used between the Service and the Pods."
   ]
  ],
  "tryit": [
   [
    "A Service `shop` has `port: 80`, no targetPort and selector `app: shop`. The Pods are labeled `app: shop` and listen on 8080. Endpoints exist, but `wget shop` from a test Pod gets 'connection refused'. What do you change?",
    "Set `targetPort: 8080`, or name the container port and reference it. Endpoints exist, so the selector is fine; without targetPort, traffic goes to Pod port 80, where nothing listens."
   ],
   [
    "You plan to change your app's listening port from 8080 to 9090 in the next release, and three Services point at it. How can you avoid editing all three Services?",
    "Name the container port, for example `http`, and set each Service's targetPort to `http`. When the new release declares `name: http` with `containerPort: 9090`, the Services follow the name automatically."
   ]
  ],
  "tip": "port is what clients call, targetPort is where the Pod listens, nodePort is on the nodes. Endpoints present but connections refused points to targetPort; no endpoints points to the selector or readiness. Multi-port Services need a name on every port.",
  "check": [
   [
    "If targetPort is omitted, what value does it take?",
    "The same value as port."
   ],
   [
    "Why use a named targetPort?",
    "The Service follows the container's port name, so the Pod's port number can change without editing the Service."
   ],
   [
    "Does a Service select Pods by the Deployment's labels or the Pods' labels?",
    "The Pods' labels, as set in the Pod template."
   ],
   [
    "A Service exposes ports 80 and 443. What must each port entry have?",
    "A name, because multi-port Services require every port to be named."
   ]
  ]
 },
 {
  "t": "EndpointSlices and why an empty endpoint list means the selector or readiness is wrong",
  "hook": "The checkout team at Maple Street Grocers relabeled their Pods during a cleanup sprint, and now the storefront spins forever when customers press Pay. Tomás is on call. The `orders` Pods are Running, the Service exists, DNS resolves, and yet a curl from a test Pod just hangs. He could start reading application logs, checking network policies, or restarting things at random. Or he could run one command that tells him which half of the problem to look at. What does that command show, and why does an empty answer narrow the cause down to just two possibilities?",
  "simple": "A Service is like a sign that says \"orders are handled here\". It does not hold the actual list of Pods. That list lives in separate records called EndpointSlices, which Kubernetes keeps up to date automatically. Each record lists the address of every matching Pod and whether it is ready to work. The machines in the cluster read those records to decide where to send traffic. If the list is empty, there are only two reasons: no Pod is wearing the labels the Service is looking for, or the matching Pods are not ready yet. It is like a restaurant host checking the staff roster: if no waiters are listed as on shift, either nobody with that job showed up, or they are still getting ready.",
  "body": [
   "Start with what a Service really is. A Service is only a description: a name, a selector and some ports. The actual list of Pod addresses behind it is kept in separate objects called EndpointSlices, maintained by the EndpointSlice controller in the control plane. kube-proxy and other networking components on every node watch EndpointSlices to know where to forward traffic for each Service. So when a Service \"does not work\", looking at its EndpointSlices is the fastest way to find out why, because they show exactly what the cluster believes the backends are.",
   "Here is how the list gets built. For every Service with a selector, the controller finds the Pods in the same namespace whose labels match, and records for each one its IP address, the target port and conditions such as `ready`, `serving` and `terminating`. Each slice carries the label `kubernetes.io/service-name=<service>`, which is how you find the slices for a given Service. Large Services are split across several slices, by default around a hundred endpoints each, so a change to one Pod does not require rewriting one enormous object. That scaling problem is why EndpointSlices replaced the older single Endpoints object. You may still see Endpoints in `kubectl describe svc` and `kubectl get endpoints`, but EndpointSlices are the current mechanism.",
   "```bash\nkubectl get endpointslices -l kubernetes.io/service-name=web\nkubectl describe endpointslice web-abc12\nkubectl describe svc web          # Endpoints: line\nkubectl get pods -l app=web -o wide --show-labels\n```",
   "Readiness is the next piece. Only ready Pods receive traffic. A Pod that matches the selector but fails its readiness probe, or is still starting, is listed in the slice with `ready: false`, and kube-proxy does not send traffic to it. In `kubectl describe svc`, the Endpoints line shows only ready addresses, so a Service whose Pods all match but none are ready shows `Endpoints: <none>` or an empty list. This gives a powerful conclusion: if a Service shows no ready endpoints, there are only two families of cause.",
   "The first family is that the selector matches nothing. The Service's selector has a typo, uses a different label value (`app: Web` versus `app: web`, since labels are case-sensitive), includes an extra label the Pods do not carry, or the Pods are in another namespace, since a Service only selects Pods in its own namespace. Compare the Selector line from `kubectl describe svc web` with `kubectl get pods --show-labels`, and test the selector directly: `kubectl get pods -l app=web`. If that returns nothing, the selector is wrong or the Pods are mislabeled. Fix whichever side is wrong; usually the Service is edited, because changing the Pod template triggers a rollout.",
   "The second family is that the Pods match but are not ready. `kubectl get pods` shows `0/1` in the READY column. `kubectl describe pod` shows readiness probe failures in its events, such as 'Readiness probe failed: HTTP probe failed with statuscode: 503', or the Pods are crashing or stuck Pending. Fix the probe, the application or the scheduling problem, and the endpoints fill in automatically within seconds; you never edit EndpointSlices for a selector-based Service yourself.",
   "Two special cases are worth knowing. A Service without a selector never gets automatic endpoints. You, or another controller, must create EndpointSlices by hand with the right service-name label, which is how a Service can point at a database outside the cluster at a fixed IP address. ExternalName Services have no endpoints at all by design, because they work purely through DNS.",
   "It is worth knowing what a healthy slice looks like, so an unhealthy one stands out. `kubectl get endpointslices -l kubernetes.io/service-name=web` prints columns for NAME, ADDRESSTYPE (usually IPv4), PORTS and ENDPOINTS. A working Service shows a port such as `8080` and a list of Pod IPs. A Service with no matching Pods shows `<unset>` in the ENDPOINTS column. `kubectl describe endpointslice` goes further and prints each endpoint with its conditions, so you can see at a glance that, say, two addresses are `Ready: true` and one is `Ready: false`, along with the node and Pod each address belongs to.",
   "Finally, the other half of the split. If endpoints exist and list the expected Pod IPs and ports, but connections still fail, the problem is somewhere else: a wrong targetPort, so traffic arrives on a port where nothing listens; the application listening only on 127.0.0.1 instead of all interfaces; or a NetworkPolicy blocking the traffic. The endpoint check therefore splits the problem space in half with one command. That is why experienced engineers, and well-prepared exam candidates, check endpoints before anything else when a Service misbehaves."
  ],
  "analogy": "A Service is the \"Orders\" sign above a restaurant counter, and the EndpointSlice is the shift roster pinned behind it listing which staff are on duty and whether they have clocked in. If the roster is empty, either no one with the \"orders\" job title works here today (a selector mismatch), or they have arrived but not clocked in yet (not ready). If the roster is full but customers still are not served, look elsewhere, perhaps at the wrong counter window (targetPort). The analogy stops in one way: the roster updates itself; you never write names on it for a selector-based Service.",
  "terms": [
   [
    "EndpointSlice",
    "An object listing the addresses, ports and conditions of the Pods backing a Service."
   ],
   [
    "EndpointSlice controller",
    "Control plane component that keeps EndpointSlices in sync with the Pods matching each Service's selector."
   ],
   [
    "kubernetes.io/service-name",
    "Label linking an EndpointSlice to its Service."
   ],
   [
    "Ready condition",
    "Endpoint flag showing whether a backend Pod should receive traffic, driven by its readiness."
   ],
   [
    "Endpoints (legacy)",
    "The older single-object list of Service backends, replaced by EndpointSlices for scalability."
   ]
  ],
  "example": "After a relabel, `curl orders` from a test Pod hangs. `kubectl describe svc orders` shows `Endpoints: <none>`. `kubectl get pods --show-labels` reveals that the Pods now carry `app: order-svc` while the Service still selects `app: orders`. Updating the Service selector restores three endpoints and the requests succeed.",
  "mistakes": [
   [
    "Editing EndpointSlices by hand to fix a selector-based Service",
    "The controller owns them and rewrites them. Fix the selector, the Pod labels or the readiness problem instead."
   ],
   [
    "Assuming a matching Pod always receives traffic",
    "Only ready Pods get traffic. A matching Pod that fails its readiness probe is listed as not ready and skipped."
   ],
   [
    "Blaming the targetPort when endpoints are empty",
    "targetPort does not affect whether endpoints exist. Empty endpoints mean a selector mismatch or unready Pods."
   ],
   [
    "Expecting a Service to select Pods in another namespace",
    "A Service only selects Pods in its own namespace. Pods elsewhere never appear in its endpoints."
   ]
  ],
  "tryit": [
   [
    "A Service `api` shows endpoints for two of its three Pods. The third Pod has the same labels and is Running but shows 0/1 READY. Users report no errors. Is anything broken, and what do you check?",
    "Traffic flows to the two ready Pods, so users see no errors, but one replica is not serving. Check `kubectl describe pod` for that Pod's readiness probe failures; it will be added to the endpoints automatically once it passes."
   ],
   [
    "You create a Service with no selector to reach a legacy database at a fixed IP outside the cluster. Connections fail and `kubectl describe svc` shows no endpoints. Why, and what is missing?",
    "Services without selectors never get automatic endpoints. You must create an EndpointSlice yourself with the label `kubernetes.io/service-name` set to the Service name, listing the database IP and port."
   ]
  ],
  "tip": "Empty endpoints means one of two things: no Pod matches the selector, or matching Pods are not ready. Check `kubectl get pods -l <selector>` and the READY column. Endpoints present but connections failing means targetPort, listen address or NetworkPolicy.",
  "check": [
   [
    "How do you list the EndpointSlices for Service `web`?",
    "`kubectl get endpointslices -l kubernetes.io/service-name=web`."
   ],
   [
    "Pods match the selector but the Service has no ready endpoints. What is likely wrong?",
    "The Pods are not ready: failing readiness probes, crashing or still starting."
   ],
   [
    "Endpoints look correct but connections still fail. Name one likely cause.",
    "A wrong targetPort, the app listening only on localhost, or a NetworkPolicy blocking traffic."
   ],
   [
    "Why does a Service without a selector have no endpoints?",
    "The controller only builds endpoints from selectors; without one, you must create EndpointSlices manually."
   ]
  ]
 },
 {
  "t": "Cluster DNS names: <service>.<namespace>.svc.cluster.local",
  "hook": "At Northwind Ferries, the booking frontend lives in namespace `web` and the seat inventory service lives in namespace `inventory`. Aisha deploys a new frontend build that sends its API requests to the host `catalog`, and every request fails with 'name not resolved'. On her laptop's local setup it worked fine, because everything ran in one namespace. The Service exists, its endpoints are healthy, and a colleague in the inventory namespace can reach `catalog` without trouble. Why does the same short name work for one Pod and fail for another, and what name should the frontend actually use?",
  "simple": "Inside a Kubernetes cluster there is a phone book, called cluster DNS, that turns Service names into addresses. Every Service gets a full name made of its own name, its namespace, and a fixed ending, like `web.shop.svc.cluster.local`. Pods can usually use a shorter name because their phone book automatically tries adding their own namespace to the end. That is handy, but it means a short name like `web` only finds Services in the same namespace. To reach a Service in another namespace you add the namespace, like `web.shop`. It works like an office phone system where you can dial a short extension for your own department but must add a department code to reach a different one.",
  "body": [
   "Start with where cluster DNS comes from. Kubernetes runs a DNS server, normally CoreDNS, as Pods in the `kube-system` namespace, behind a Service that is usually still called `kube-dns` for historical reasons. The kubelet writes every Pod's `/etc/resolv.conf` so that it uses that Service's IP as its name server. As a result, applications find Services by name instead of by IP address, and those names keep working when Pods are replaced and even when a Service is deleted and recreated with a new cluster IP.",
   "The naming pattern is fixed and worth memorizing. Every Service gets a DNS name of the form `<service>.<namespace>.svc.<cluster-domain>`. The cluster domain is `cluster.local` by default, though administrators can change it when building the cluster. A Service `web` in namespace `shop` is therefore `web.shop.svc.cluster.local`, and that name resolves to the Service's cluster IP. For a headless Service, the same name returns the IPs of its ready Pods instead, and Pods in a StatefulSet get individual names such as `db-0.db.shop.svc.cluster.local`, made of the Pod name, then the headless Service name, then the namespace.",
   "You rarely need to type the full name, thanks to search domains. A Pod in namespace `shop` has a resolv.conf like this:",
   "```text\nnameserver 10.96.0.10\nsearch shop.svc.cluster.local svc.cluster.local cluster.local\noptions ndots:5\n```",
   "When the Pod looks up a short name, the resolver tries appending each search domain in turn until one works. So from inside `shop`, plain `web` is tried as `web.shop.svc.cluster.local` first and resolves. From a Pod in another namespace, say `dev`, the first search domain is `dev.svc.cluster.local`, so `web` alone becomes `web.dev.svc.cluster.local`, which does not exist, and the lookup fails. To cross namespaces, use `web.shop`, which matches through the second search domain (`web.shop` plus `svc.cluster.local`), or the full name. This is the most common DNS trap in Kubernetes: short names only work within the same namespace, and the error message never says \"wrong namespace\", only that the name cannot be resolved.",
   "The `ndots:5` option explains some puzzling lookups. It means a name with fewer than five dots is first tried with each search domain appended, before being tried exactly as written. That is why an external name like `api.example.com`, which has only two dots, generates a few failed internal lookups, such as `api.example.com.shop.svc.cluster.local`, before the resolver finally tries it as-is and succeeds. Adding a trailing dot, as in `api.example.com.`, marks a name as fully qualified and skips the search list entirely, which can reduce DNS load for applications that call external hosts very often. Individual Pods can also override these settings through the `dnsConfig` and `dnsPolicy` fields of the Pod spec, but the defaults described here are what you should expect in the exam unless a task says otherwise.",
   "There are more record types for specialized use. Services get SRV records for each named port, in the form `_<port-name>._<protocol>.<service>.<namespace>.svc.cluster.local`, which some clients use to discover port numbers as well as addresses. For example, a Service `web` in `shop` with a TCP port named `http` has the SRV record `_http._tcp.web.shop.svc.cluster.local`. Pods themselves can also be looked up by an IP-based name, such as `10-244-1-5.shop.pod.cluster.local` for a Pod with IP 10.244.1.5, but applications should normally use Service names, because Pod IPs change.",
   "Testing DNS is quick and is a skill the exam rewards. Start a temporary Pod with lookup tools and query the name: `kubectl run dns --image=busybox --rm -it --restart=Never -- nslookup web.shop`. If the answer is 'can't resolve', the Service name or namespace is wrong, or DNS itself is broken; check that the DNS Pods are running with `kubectl get pods -n kube-system -l k8s-app=kube-dns`. If you get an IP address back but your connection still fails, DNS is fine and the problem lies with endpoints, the targetPort or a NetworkPolicy. You can also run `kubectl exec <pod> -- cat /etc/resolv.conf` to confirm which search domains a particular Pod is using.",
   "One last connection to networking rules. NetworkPolicies that restrict egress must explicitly allow DNS traffic, on UDP and TCP port 53, to the cluster DNS Pods. Without that rule, every name lookup from the restricted Pods fails, and the symptom looks exactly like a naming mistake even though the name is correct. When a 'name not resolved' error appears right after someone adds an egress policy, suspect the policy before the name."
  ],
  "analogy": "Cluster DNS is like an office phone system. Each department is a namespace, and every person has a full number made of the company code, department code and extension. When you dial just an extension, the system assumes you mean your own department, which is what search domains do. To reach someone in Accounting from Sales, you must add Accounting's department code, which is the namespace. The analogy stops at the ndots rule: unlike a phone system, the resolver also tries your own department's code on outside numbers first, causing a few wasted lookups.",
  "terms": [
   [
    "CoreDNS",
    "The DNS server that normally provides cluster DNS for Services and Pods, running in kube-system behind the kube-dns Service."
   ],
   [
    "Service FQDN",
    "The fully qualified Service name <service>.<namespace>.svc.cluster.local."
   ],
   [
    "Cluster domain",
    "The DNS suffix for the cluster, cluster.local by default."
   ],
   [
    "Search domains",
    "Suffixes in a Pod's resolv.conf that let short names like web resolve within its own namespace."
   ],
   [
    "ndots",
    "Resolver option setting how many dots a name needs before it is tried as written first; Kubernetes sets 5."
   ],
   [
    "SRV record",
    "DNS record that publishes a named port's number and target, such as _http._tcp.web.shop.svc.cluster.local."
   ]
  ],
  "example": "A frontend Pod in namespace `web` calls the host `catalog` and gets 'name not resolved'. The catalog Service lives in namespace `inventory`. Changing the setting to `catalog.inventory` (or `catalog.inventory.svc.cluster.local`) fixes it, confirmed with `nslookup catalog.inventory` from a busybox Pod in the `web` namespace.",
  "mistakes": [
   [
    "Expecting a short Service name to work from any namespace",
    "Short names resolve only within the caller's namespace. Use at least <service>.<namespace> across namespaces."
   ],
   [
    "Writing the name as <namespace>.<service>",
    "The order is service first, then namespace: web.shop, not shop.web."
   ],
   [
    "Assuming a resolved name means the Service works",
    "DNS only maps the name to an IP. Connections can still fail because of missing endpoints, a wrong targetPort or a NetworkPolicy."
   ],
   [
    "Forgetting DNS when writing an egress NetworkPolicy",
    "An egress policy that does not allow port 53 to the DNS Pods breaks every name lookup, which looks like a naming error."
   ]
  ],
  "tryit": [
   [
    "A Pod in namespace `dev` runs `nslookup api.prod` and gets an IP, but `nslookup api` fails. The team insists the Service exists. Is something broken?",
    "No. The Service exists in `prod`. From `dev`, the short name `api` is tried as api.dev.svc.cluster.local first, which does not exist. Use api.prod or the full name."
   ],
   [
    "An app makes thousands of calls per minute to an external API host and DNS traffic in the cluster is high. Looking at resolv.conf you see `ndots:5`. What simple change in the app's configuration reduces wasted lookups?",
    "Use the external host name with a trailing dot, such as `api.example.com.`, so it is treated as fully qualified and the search domains are skipped."
   ]
  ],
  "tip": "A short Service name only resolves from the same namespace. Across namespaces, use at least `<service>.<namespace>`. Test with `nslookup` from a temporary busybox Pod, and if resolution fails right after an egress policy appears, check that DNS on port 53 is allowed.",
  "check": [
   [
    "What is the full DNS name of Service `api` in namespace `prod`?",
    "`api.prod.svc.cluster.local` (with the default cluster domain)."
   ],
   [
    "Why does `api` fail to resolve from a Pod in namespace `dev`?",
    "The search domains append dev's namespace first, so it looks for api.dev.svc.cluster.local, which does not exist."
   ],
   [
    "What does DNS return for a headless Service name?",
    "The IPs of its ready Pods rather than a cluster IP."
   ],
   [
    "What DNS name does Pod `db-0` of a StatefulSet get with headless Service `db` in namespace `shop`?",
    "`db-0.db.shop.svc.cluster.local`."
   ]
  ]
 },
 {
  "t": "Kubectl expose, kubectl create service and kubectl port-forward",
  "hook": "You are twelve minutes into a timed practice exam set by your study group at Granite Peak College. The task reads: \"Expose Deployment `shop` on NodePort 30100, Service port 80, container port 8000.\" You type a quick `kubectl create service nodeport shop --tcp=80:8000 --node-port=30100`, see \"service/shop created\", and move on feeling efficient. At the end, the grader marks it wrong: the Service has no endpoints. The command ran without a single error. What did it quietly assume about your Pods, and which command would have copied the right selector for you?",
  "simple": "Writing a Service file by hand is slow, so kubectl has shortcuts. `kubectl expose` looks at something that already exists, like a Deployment, and copies its labels so the new Service finds the right Pods automatically. `kubectl create service` builds a Service from scratch, but it guesses the labels by assuming your Pods are tagged `app` equals the Service name, which is often wrong. `kubectl port-forward` is different: it creates nothing in the cluster and simply opens a private tunnel from your own computer to one Pod, like a temporary extension cord you unplug when done. Use expose to wire things up properly, and port-forward to peek at an app quickly.",
  "body": [
   "Start with why these commands matter. Writing Service YAML by hand is slow and error-prone under exam time pressure, and a single wrong label leaves a Service with no endpoints. kubectl offers two imperative generators for Services, plus a third command for reaching Pods without a Service at all. Knowing exactly what each one assumes saves time and avoids a classic selector trap.",
   "`kubectl expose` creates a Service for an existing resource and copies its selector for you. `kubectl expose deployment web --port=80 --target-port=8080` creates a ClusterIP Service named `web` whose selector is the Deployment's own selector, so it matches the Deployment's Pods by construction. Add `--type=NodePort` or `--type=LoadBalancer` to change the type, `--name=web-svc` to choose a different name, and `--protocol=UDP` if needed. You can expose a Deployment, ReplicaSet, ReplicationController, Pod or another Service. Exposing a Pod requires that it has labels, since they become the selector; Pods created with `kubectl run` get a `run=<name>` label automatically, so they can be exposed straight away. If you omit `--target-port`, it defaults to the value of `--port`; if you omit `--port`, kubectl uses the container port declared in the resource, and fails if there is none.",
   "```bash\nkubectl expose deploy web --port=80 --target-port=8080 --type=NodePort --name=web-np\nkubectl expose pod db --port=5432\nkubectl run cache --image=redis --port=6379 --expose\nkubectl create service clusterip api --tcp=80:8080\nkubectl create service nodeport api --tcp=80:8080 --node-port=30080\nkubectl create service externalname partner --external-name=api.partner.example\n```",
   "`kubectl create service <type> <name>` builds a Service from scratch with the subcommands `clusterip`, `nodeport`, `loadbalancer` and `externalname`. The flag `--tcp=80:8080` means Service port 80 and targetPort 8080; you can repeat it for several ports. Here is the trap from the opening scene: `create service` cannot read another object's labels, so it sets the selector to `app=<service-name>`. That works only if your Pods happen to carry exactly that label. If they are labeled differently, for example `tier=front`, the Service has no endpoints and nothing warns you. Either use `expose`, or generate YAML with `--dry-run=client -o yaml`, fix the selector, and apply it. `kubectl create service clusterip headless --clusterip=\"None\"` creates a headless Service, and `nodeport` is the only `create service` subcommand that accepts `--node-port`.",
   "There is also a combined shortcut. `kubectl run cache --image=redis --port=6379 --expose` creates a Pod and a ClusterIP Service for it in one command, with the Service selecting the Pod's automatic `run=cache` label. It is handy for quick test back ends, such as a cache or a simple web server you want other Pods to call by name.",
   "The third command is quite different. `kubectl port-forward` does not create any object in the cluster. It opens a tunnel from your machine, through the API server and the kubelet, to one Pod. `kubectl port-forward svc/web 8080:80` listens on local port 8080 and forwards to port 80 of the Service, which kubectl translates into the targetPort of a single Pod chosen from the Service's backends. It does not load-balance: every connection through that tunnel goes to the same Pod, and if that Pod is deleted the forward stops. You can also target `pod/<name>` or `deploy/<name>`. By default it listens on localhost only, unless you pass `--address 0.0.0.0`, and it runs in the foreground until you press Ctrl-C. Use it to test an app quickly, or to reach a database from local tools, without exposing anything to the network. While it runs, `curl localhost:8080` on your machine reaches the Pod.",
   "A useful exam pattern combines these commands. Because `expose` has no flag for a specific node port, when a task demands an exact nodePort you generate YAML with `kubectl expose ... --type=NodePort --dry-run=client -o yaml > svc.yaml`, add `nodePort: 30100` under the port entry, and apply the file. That way you get the correct selector from `expose` and the exact port the task requires, in well under a minute. The same dry-run habit works for any field the imperative flags do not cover, such as adding a second named port, setting `sessionAffinity`, or adding labels to the Service itself. Generating the skeleton with a command and finishing it in an editor is usually faster and safer than typing a whole manifest from memory, and it keeps the selector correct.",
   "After using any of these, verify rather than assume. `kubectl get svc web-np -o wide` shows the SELECTOR column. `kubectl get endpointslices -l kubernetes.io/service-name=web-np` shows whether Pods were matched. Finally, a request from a temporary Pod, such as `kubectl run t --image=busybox --rm -it --restart=Never -- wget -qO- -T 2 web-np`, or a curl through your port-forward, confirms the application actually answers on the expected port."
  ],
  "analogy": "`kubectl expose` is like asking a receptionist to set up a phone line for an existing team: they look up the team's roster and route calls to exactly those people. `kubectl create service` is like ordering a phone line by name only; the phone company assumes the team is called whatever you named the line, and if it is not, calls ring nowhere. `kubectl port-forward` is a private walkie-talkie to one person: no line is installed, nobody else can use it, and it stops working the moment you put it down.",
  "terms": [
   [
    "kubectl expose",
    "Creates a Service for an existing resource, copying its selector."
   ],
   [
    "kubectl create service",
    "Creates a Service of a given type from scratch, with the selector set to app=<name>."
   ],
   [
    "--tcp=port:targetPort",
    "Flag for create service that sets the Service port and target port."
   ],
   [
    "--dry-run=client -o yaml",
    "Prints the object kubectl would create without creating it, so you can edit and apply it."
   ],
   [
    "kubectl port-forward",
    "Temporary tunnel from a local port, through the API server, to one Pod; creates no Service."
   ]
  ],
  "example": "A task says: expose Deployment `shop` (Pod labels `tier=front`) on NodePort 30100, port 80 to container port 8000. `kubectl create service nodeport shop --tcp=80:8000 --node-port=30100` would select `app=shop` and match nothing, so you run `kubectl expose deploy shop --type=NodePort --port=80 --target-port=8000 --dry-run=client -o yaml > svc.yaml`, add `nodePort: 30100`, and apply it.",
  "mistakes": [
   [
    "Assuming kubectl create service finds the right Pods",
    "It always sets the selector to app=<service-name>. If the Pods use other labels, the Service has no endpoints."
   ],
   [
    "Expecting kubectl expose to accept a specific node port",
    "expose has no nodePort flag. Generate YAML with --dry-run=client -o yaml and add nodePort before applying."
   ],
   [
    "Thinking port-forward to a Service load-balances",
    "It connects to a single Pod chosen from the Service and keeps using that Pod."
   ],
   [
    "Believing port-forward exposes the app to other users",
    "It creates no cluster object and listens on localhost by default, so only you can use it while it runs."
   ]
  ],
  "tryit": [
   [
    "A Pod `db` was created with `kubectl run db --image=postgres`. You need a ClusterIP Service named `db` on port 5432. Which command do you use, and why does it work without adding labels?",
    "`kubectl expose pod db --port=5432`. Pods made with kubectl run get the label run=db automatically, and expose copies that as the selector."
   ],
   [
    "A developer needs to inspect a database inside the cluster from a desktop tool for ten minutes, and the security team forbids new NodePort or LoadBalancer Services. What do you suggest?",
    "`kubectl port-forward svc/db 5432:5432` (or to the Pod). It tunnels through the API server to one Pod, listens only on localhost, and creates nothing in the cluster, so stopping it removes all access."
   ]
  ],
  "tip": "`expose` copies the real selector; `create service` assumes app=<name>. `expose` has no flag for a specific nodePort, so generate YAML with `--dry-run=client -o yaml` and add it. Always check endpoints after creating a Service.",
  "check": [
   [
    "What selector does `kubectl create service clusterip api --tcp=80:8080` set?",
    "`app=api`."
   ],
   [
    "How do you expose Deployment `web` as a NodePort Service on port 80 forwarding to 8080?",
    "`kubectl expose deploy web --type=NodePort --port=80 --target-port=8080`."
   ],
   [
    "Does port-forward to a Service load-balance across all Pods?",
    "No, it connects to a single Pod behind the Service."
   ],
   [
    "What does `kubectl run cache --image=redis --port=6379 --expose` create?",
    "A Pod named cache and a ClusterIP Service named cache on port 6379 that selects it."
   ]
  ]
 },
 {
  "t": "NetworkPolicy basics: podSelector, policyTypes, ingress and egress rules, default deny",
  "hook": "An internal audit at Riverbend Credit Union asks a simple question: \"If someone compromised the public-facing frontend Pod, could they connect straight to the member database?\" Elena, the lead developer, tests it from a throwaway Pod and her stomach drops. Every Pod in the `shop` namespace can reach every other Pod, on every port, and so can Pods in other namespaces. Nothing is misconfigured; that is simply the Kubernetes default. The auditor wants an answer by Friday. How do you turn an open network into one where only the traffic you name is allowed, without writing a single deny rule?",
  "simple": "By default, every Pod in Kubernetes can talk to every other Pod, like an office where every door is unlocked. A NetworkPolicy is a set of rules that locks some doors and lists who may still come in or go out. You pick which Pods the rules protect using their labels. The moment a Pod is covered by a policy, everything not on the guest list is blocked for the direction the policy covers: incoming, outgoing or both. Policies only ever add names to guest lists; there is no \"block this person\" rule. A \"default deny\" policy covers every Pod and lists nobody, so all doors lock, and then you add small policies that let in only the traffic you need.",
  "body": [
   "Start with the default. Every Pod in a Kubernetes cluster can talk to every other Pod, in every namespace, on every port. That flat network makes things easy to build, but it means a single compromised Pod can reach databases and internal APIs it has no business touching, which security teams call lateral movement. A NetworkPolicy is a namespaced object, in the API group `networking.k8s.io/v1`, that restricts which traffic is allowed to and from selected Pods. It acts like a firewall defined by labels rather than by IP addresses, so it keeps working as Pods come and go.",
   "The structure has a few key fields. `spec.podSelector` chooses the Pods in the policy's own namespace that the policy applies to. An empty selector, written `podSelector: {}`, selects every Pod in the namespace. `policyTypes` lists `Ingress` (traffic coming into the selected Pods), `Egress` (traffic leaving them) or both. `ingress` rules list allowed sources under `from` and allowed ports under `ports`; `egress` rules list allowed destinations under `to` and allowed ports. A rule allows traffic only if it matches both its peers and its ports.",
   "The key idea is isolation, and it is the part most people get wrong at first. A Pod that no policy selects is non-isolated and accepts everything, exactly as before. As soon as a policy that includes `Ingress` in its policyTypes selects a Pod, that Pod becomes isolated for ingress, and only traffic that some policy's ingress rules allow gets in. Egress works the same way, independently. Policies are additive: there are no deny rules, and if several policies select the same Pod, the allowed traffic is the union of everything they allow. The order in which you create them does not matter. Replies to allowed connections are permitted automatically, because enforcement tracks connections, so you never write rules for return traffic.",
   "A default deny policy is the recommended starting point. It selects all Pods and allows nothing. With `policyTypes: [Ingress]` and no ingress rules, all incoming traffic to Pods in the namespace is blocked. Adding `Egress` blocks outgoing traffic too. You then add narrow allow policies on top, one per legitimate traffic flow, which documents your application's real communication paths as a side effect. The example below shows a default deny for both directions, then an allow policy letting the frontend reach the API on port 8080.",
   "```yaml\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny\n  namespace: shop\nspec:\n  podSelector: {}\n  policyTypes: [\"Ingress\", \"Egress\"]\n---\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: api-from-frontend\n  namespace: shop\nspec:\n  podSelector:\n    matchLabels:\n      app: api\n  policyTypes: [\"Ingress\"]\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: frontend\n    ports:\n    - protocol: TCP\n      port: 8080\n```",
   "Note what this pair does not yet allow. Because the default deny also isolates egress, the frontend Pods cannot send to the API until an egress policy on the frontend permits it, and no Pod can look up DNS names. With both directions denied, a connection needs an egress allowance on the sender and an ingress allowance on the receiver.",
   "Watch the difference between an empty rule list and a rule that is empty, because it flips the meaning completely. `ingress: []`, or no ingress field at all while Ingress is in policyTypes, allows nothing. `ingress: [{}]`, a single rule with no `from` and no `ports`, matches all sources on all ports, so it allows everything. If you omit `policyTypes` entirely, Ingress is always assumed, and Egress is added only if the policy has an egress section. Writing policyTypes explicitly avoids surprises.",
   "Ports in rules are the Pod's ports, the targetPort, not the Service port, because policies act on Pod-to-Pod traffic after the Service has translated the address. If a Service maps port 80 to targetPort 8080, the policy must allow 8080. You can use named ports too. Policies are inspected with `kubectl get networkpolicy` (short name `netpol`) and `kubectl describe netpol api-from-frontend`, which prints the selected Pods and each allowed source in plain language.",
   "Finally, test rather than trust. Start temporary Pods carrying the right labels and try real connections: `kubectl run t --image=busybox --rm -it --restart=Never -l app=frontend -n shop -- wget -qO- -T 2 api:8080`. Repeat without the label and expect a timeout. A short timeout flag keeps blocked tests from hanging. Remember that an egress default deny also blocks DNS, so name lookups fail until you allow port 53, which the next lesson covers in detail."
  ],
  "analogy": "Think of an apartment building where every door starts unlocked. A NetworkPolicy is a guest list taped to some doors. Once a door has any guest list for visitors, only people on some list may enter, and if several lists are taped up, anyone on any of them gets in. There is no \"banned\" list. A default deny is a blank guest list on every door. The analogy stops at replies: in Kubernetes, once a visitor is allowed in, the answer going back out is allowed automatically.",
  "terms": [
   [
    "NetworkPolicy",
    "Namespaced object that restricts traffic to and from selected Pods using labels."
   ],
   [
    "podSelector",
    "Chooses the Pods a policy applies to; {} selects all Pods in the policy's namespace."
   ],
   [
    "policyTypes",
    "Ingress, Egress or both: the directions the policy isolates."
   ],
   [
    "Isolated Pod",
    "A Pod selected by a policy for a direction, which then allows only traffic some policy explicitly permits."
   ],
   [
    "Default deny",
    "A policy selecting all Pods with no allow rules, blocking all traffic in the listed directions."
   ],
   [
    "Additive policies",
    "Allowances from all policies selecting a Pod are combined; there are no deny rules."
   ]
  ],
  "example": "A team applies a default-deny ingress policy to `shop`, then an allow policy letting Pods labeled `app: frontend` reach `app: api` on TCP 8080, and another letting `app: api` reach `app: db` on 5432. A test Pod without the frontend label now times out when calling the API, while a test Pod labeled `app: frontend` gets a response.",
  "mistakes": [
   [
    "Writing a policy to \"deny\" one source",
    "NetworkPolicy has no deny rules. Being selected isolates the Pod; then you list only what is allowed."
   ],
   [
    "Treating ingress: [{}] as deny all",
    "A single empty rule matches every source and port, so it allows all traffic. No rules at all is what denies."
   ],
   [
    "Allowing the Service port instead of the Pod port",
    "Policies see Pod traffic after Service translation, so allow the targetPort, such as 8080, not the Service port 80."
   ],
   [
    "Expecting the latest policy to override earlier ones",
    "Policies are unordered and additive. The allowed traffic is the union of all policies that select the Pod."
   ]
  ],
  "tryit": [
   [
    "Namespace `shop` has a default-deny policy for Ingress only. The frontend Pods can still download updates from the internet, but nothing can reach the API. A teammate expected outbound traffic to be blocked too. Why is it not?",
    "The policy lists only Ingress in policyTypes, so Pods are isolated for incoming traffic only. Egress stays open until a policy with Egress in its policyTypes selects the Pods."
   ],
   [
    "You need the `db` Pods to accept connections only from `app: api` Pods on port 5432, and every other Pod in the namespace should stay unrestricted. What do you create?",
    "One policy with podSelector app: db, policyTypes Ingress, and an ingress rule allowing from podSelector app: api on TCP 5432. Only db Pods become isolated; others remain non-isolated because no policy selects them."
   ]
  ],
  "tip": "Policies only add allowances; being selected is what isolates. `podSelector: {}` means all Pods, while `ingress: [{}]` means allow all, the opposite of no rules. Allow the Pod's port, not the Service port, and test with labeled temporary Pods.",
  "check": [
   [
    "What happens to a Pod that no NetworkPolicy selects?",
    "It is non-isolated and accepts all traffic."
   ],
   [
    "Write the spec for a default deny of all ingress in a namespace.",
    "`podSelector: {}` with `policyTypes: [Ingress]` and no ingress rules."
   ],
   [
    "Two policies select the same Pod, each allowing a different source. What is allowed?",
    "Both sources; policies are additive and their allowances are combined."
   ],
   [
    "A Service maps port 80 to targetPort 8080. Which port should the NetworkPolicy allow?",
    "8080, the Pod's port, because policies act after Service translation."
   ]
  ]
 },
 {
  "t": "NetworkPolicy peers: podSelector, namespaceSelector, ipBlock; AND vs OR rule semantics; allowing DNS on egress",
  "hook": "A security reviewer at Juniper Health Partners flags a NetworkPolicy in a pull request with a short note: \"This lets far more in than you think.\" The policy was meant to let only the Prometheus Pods in the `monitoring` namespace scrape the patient-records API. It looks right at a glance, with both a namespace selector and a Pod selector. Meanwhile, Sam on the same team adds an egress policy to the API and suddenly every database call fails with 'name not resolved', even though the database rule is clearly there. One stray dash and one forgotten port are behind both problems. Which ones?",
  "simple": "A NetworkPolicy's guest list can describe visitors in three ways: by Pod labels (\"anyone wearing an app=monitor badge here\"), by namespace labels (\"anyone from the ops department\") or by network address range (\"anyone from this block of outside addresses\"). How you write them changes the meaning. Two descriptions in the same entry mean both must be true: \"from the ops department AND wearing a monitor badge\". Two separate entries mean either is enough. Also, once you limit outgoing traffic, Pods cannot reach the cluster's phone book (DNS) unless you allow it, so every name lookup fails. It is like locking the office's outgoing calls and forgetting to allow calls to directory assistance.",
  "body": [
   "Inside a `from` list (for ingress) or a `to` list (for egress), each entry is a peer describing who may connect, or who may be connected to. There are three kinds of peer, and the way you combine them in YAML changes the meaning dramatically. This is one of the most heavily tested details of NetworkPolicy, because a small indentation change produces a valid policy that does something very different.",
   "The three peer types each have a clear job. A `podSelector` peer on its own matches Pods with those labels in the policy's own namespace. A `namespaceSelector` peer on its own matches all Pods in any namespace whose labels match. Every namespace carries an automatic, immutable label `kubernetes.io/metadata.name=<name>`, so you can select a namespace by its name without asking anyone to add labels. An empty namespace selector, `namespaceSelector: {}`, matches all namespaces. An `ipBlock` peer matches IP address ranges in CIDR (Classless Inter-Domain Routing) notation, such as `203.0.113.0/24`, with optional `except` ranges carved out. It is meant for traffic from or to outside the cluster, since Pod IPs change constantly and should be matched with selectors instead.",
   "Now the critical rule. Peers written as separate list items, each starting with its own dash, are ORed: traffic from any of them is allowed. A `namespaceSelector` and a `podSelector` written in the same list item, one dash with two keys beneath it, are ANDed: the traffic must come from Pods with those labels that are also inside matching namespaces. Compare these two policies carefully:",
   "```yaml\n# AND: Pods labeled app=monitor in namespaces labeled team=ops\ningress:\n- from:\n  - namespaceSelector:\n      matchLabels: {team: ops}\n    podSelector:\n      matchLabels: {app: monitor}\n---\n# OR: any Pod in team=ops namespaces, OR app=monitor Pods in this namespace\ningress:\n- from:\n  - namespaceSelector:\n      matchLabels: {team: ops}\n  - podSelector:\n      matchLabels: {app: monitor}\n```",
   "The difference is a single dash, and the OR version is often far more permissive than intended: it admits every Pod in every ops namespace, plus any Pod in your own namespace that someone labels `app: monitor`. The same logic applies at the next level up. Within one rule, `from` and `ports` are ANDed, meaning these sources on these ports. Separate rules in the `ingress` list are ORed, each one granting its own allowance. So \"monitoring may reach 9090, and frontend may reach 8080\" needs two rules, not one rule with two peers and two ports, which would also let monitoring reach 8080 and frontend reach 9090.",
   "Egress policies need special care for DNS. Once a Pod is isolated for egress, it cannot reach the cluster DNS Pods unless a rule allows it, so every lookup of a Service name fails, and applications report 'name resolution' or 'unknown host' errors that look unrelated to the policy. The connection to the database might be allowed perfectly; the Pod simply never learns the database's IP. Allow UDP and TCP port 53 to the DNS Pods in `kube-system`. TCP matters because larger DNS responses fall back to TCP. Here is an egress section that allows DNS and the database:",
   "```yaml\negress:\n- to:\n  - namespaceSelector:\n      matchLabels:\n        kubernetes.io/metadata.name: kube-system\n    podSelector:\n      matchLabels:\n        k8s-app: kube-dns\n  ports:\n  - {protocol: UDP, port: 53}\n  - {protocol: TCP, port: 53}\n- to:\n  - podSelector:\n      matchLabels: {app: db}\n  ports:\n  - {protocol: TCP, port: 5432}\n```",
   "Notice that the DNS rule uses the AND form, one dash with both selectors, so it allows only the DNS Pods in kube-system, not every Pod there. A simpler, broader variant allows port 53 to any destination by leaving out `to` in that rule entirely; that is quicker to type and acceptable in many exam tasks, though less precise. Before relying on labels, check the actual DNS Pod labels with `kubectl get pods -n kube-system --show-labels`; `k8s-app=kube-dns` is common, even for CoreDNS, but not guaranteed in every distribution.",
   "The `ipBlock` peer has a few practical notes. Use it for external ranges such as a partner's network or a corporate VPN (virtual private network) range. Because traffic may be translated by load balancers or node-level address rewriting before it reaches a Pod, the source IP a policy sees for external clients depends on the cluster setup, so test ipBlock rules rather than assuming. An egress rule with `ipBlock: {cidr: 0.0.0.0/0, except: [10.0.0.0/8]}` is a common way to allow the internet while excluding internal ranges.",
   "Finally, verify with temporary Pods carrying the policy's labels. From a Pod labeled like the protected application, run `nslookup db` to confirm DNS works and `wget -qO- -T 2 db:5432` or a similar connection test to confirm the allowed path. Then try a destination that should be blocked and expect a timeout. Testing both the allowed and the denied case is the only way to catch an accidental OR."
  ],
  "analogy": "Think of an event's guest list. One line reading \"employees of Acme who are also on the security team\" is an AND: both facts must be true. Two lines, \"employees of Acme\" and \"members of the security team\", are an OR: either gets you in, which admits far more people. In YAML, one dash is one line on the list. DNS is the coat check at the door: if your egress rules forget it, guests can be allowed into the party but can never find the room. The analogy stops at ipBlock, which is more like checking a street address than a badge.",
  "terms": [
   [
    "podSelector peer",
    "Matches Pods with given labels in the policy's own namespace."
   ],
   [
    "namespaceSelector",
    "Peer that matches Pods in namespaces with the given labels; {} matches all namespaces."
   ],
   [
    "ipBlock",
    "Peer that matches a CIDR range, with optional except ranges, usually for traffic outside the cluster."
   ],
   [
    "AND semantics",
    "namespaceSelector and podSelector in the same peer item must both match."
   ],
   [
    "OR semantics",
    "Separate peer items, or separate rules, each allow traffic independently."
   ],
   [
    "kubernetes.io/metadata.name",
    "Automatic namespace label holding the namespace's name."
   ]
  ],
  "example": "A policy meant to let only the Prometheus Pods in `monitoring` scrape an app used two dashes, so every Pod in `monitoring` and every Pod labeled `app: prometheus` in the app's own namespace could connect. Merging the selectors into one item with a single dash restricted it to Prometheus Pods in `monitoring` only.",
  "mistakes": [
   [
    "Putting namespaceSelector and podSelector under separate dashes to mean \"these Pods in that namespace\"",
    "Separate dashes mean OR. For \"these Pods in that namespace\", put both selectors in the same list item."
   ],
   [
    "Allowing only UDP 53 for DNS",
    "DNS can fall back to TCP for larger responses. Allow both UDP and TCP on port 53."
   ],
   [
    "Combining two sources and two ports in one rule to mean \"source A on port 1, source B on port 2\"",
    "Within a rule, any listed source can use any listed port. Use separate rules for separate source-port pairs."
   ],
   [
    "Selecting a namespace with a label you assume exists, like name: payments",
    "Only kubernetes.io/metadata.name is added automatically. Use it, or check the namespace's labels first."
   ]
  ],
  "tryit": [
   [
    "An API Pod has egress default deny plus a rule allowing TCP 5432 to `app: db` Pods. Logs show 'could not translate host name \"db\"'. Your teammate says the database rule must be wrong. What do you check and add?",
    "The database rule is fine; the Pod cannot reach DNS. Add an egress rule allowing UDP and TCP port 53 to the DNS Pods in kube-system (or to any destination on port 53), then retest with nslookup db."
   ],
   [
    "You must allow ingress only from Pods labeled `app: scraper` in namespace `metrics`. You write a from list with two items: one namespaceSelector for metrics and one podSelector for app: scraper. Is this correct?",
    "No. Two items are ORed, admitting all Pods in metrics plus scraper Pods in your own namespace. Put the namespaceSelector (kubernetes.io/metadata.name: metrics) and the podSelector in a single item so both must match."
   ]
  ],
  "tip": "One dash with both selectors means AND; two dashes means OR. Within a rule, from and ports are ANDed; separate rules are ORed. After adding an egress policy, always allow port 53 over UDP and TCP for DNS.",
  "check": [
   [
    "How do you select namespace `payments` by name in a namespaceSelector?",
    "matchLabels `kubernetes.io/metadata.name: payments`."
   ],
   [
    "An egress policy allows traffic to the db Pods, but the app cannot connect to `db` by name. Why?",
    "DNS lookups are blocked; add an egress rule allowing port 53 UDP and TCP to the cluster DNS Pods."
   ],
   [
    "Within one ingress rule, how do `from` and `ports` combine?",
    "They are ANDed: traffic must come from a listed source and target a listed port."
   ],
   [
    "What is ipBlock mainly used for?",
    "Matching IP ranges outside the cluster, since Pod IPs change and should be matched with selectors."
   ]
  ]
 },
 {
  "t": "NetworkPolicy needs a CNI plugin that enforces it (for example Calico or Cilium)",
  "hook": "Kenji spends Saturday preparing for his CKAD exam in a home lab. He writes a careful default-deny policy for the `shop` namespace, applies it, and gets \"networkpolicy.networking.k8s.io/default-deny created\". Then he runs a test Pod and calls the API, expecting a timeout. The request succeeds instantly. He rewrites the policy three times, checks every label, even compares it line by line with the official documentation. Every version is accepted, and every version blocks nothing. There is no error, no warning, no event. Is his YAML wrong, or is something underneath the cluster simply not listening?",
  "simple": "Kubernetes lets you write network rules, but it does not enforce them itself. It hands that job to a networking add-on called a CNI plugin, the piece of software that connects Pods to the network. Some plugins, like Calico and Cilium, read your rules and actually block traffic. Others only provide basic connectivity and ignore the rules completely. The tricky part is that Kubernetes accepts your rules either way, with no error. It is like posting a \"No entry\" sign in a building with no security guard: the sign is up, but nobody stops anyone. The only way to know is to test whether traffic is really blocked.",
  "body": [
   "Start with a division of labor that surprises many people. Kubernetes defines the NetworkPolicy API, but it does not enforce it. The API server validates a policy's structure and stores it like any other object, and that is all. Enforcement is the job of the cluster's network plugin, which implements the Container Network Interface (CNI), the standard way Kubernetes asks a plugin to wire up Pod networking: giving each Pod an IP address, connecting it to the cluster network and, if the plugin supports it, filtering traffic. If the plugin does not support NetworkPolicy, your policies exist but have no effect, and all traffic keeps flowing exactly as before.",
   "Plugins differ in how they enforce policy. Calico and Cilium are widely used plugins that do enforce NetworkPolicy. Calico typically programs rules in the Linux kernel's packet filtering, using iptables or nftables, or uses eBPF (extended Berkeley Packet Filter), which lets small verified programs run inside the kernel. Cilium is built around eBPF programs attached in the kernel. Both work the same way at a high level: an agent on every node watches NetworkPolicy objects and Pod labels through the API server, translates them into filtering rules, and updates those rules as Pods start, stop and change labels. Some plugins, particularly simple ones focused only on connectivity such as a basic Flannel setup, do not enforce policies on their own. Some local cluster tools start with such a plugin by default, so check before trusting any test result.",
   "The absence of an error is what makes this topic important. `kubectl apply` succeeds, `kubectl get netpol` lists the policy, `kubectl describe networkpolicy` shows the rules and the selected Pods in plain language, and yet a connection you meant to block still works. There is no condition, status field or event on the policy that says \"not enforced\", because the API server has no idea which plugin is running or what it supports. The only real proof is a traffic test.",
   "```bash\n# which network plugin is running?\nkubectl get pods -n kube-system -o wide | grep -Ei 'calico|cilium|flannel|weave'\nkubectl get daemonset -n kube-system\n# test: apply a default deny, then try to connect\nkubectl run t --image=busybox --rm -it --restart=Never -n shop -- wget -qO- -T 2 api:8080\n```",
   "Network plugins usually run as a DaemonSet in `kube-system`, one agent Pod per node, so listing DaemonSets there is a quick way to identify the plugin. A good test always has two halves: confirm the connection works before applying the policy, so you know the app and Service are healthy, then confirm it fails after. If it works both times, either the policy does not select the Pods you think, or the plugin is not enforcing. Checking that `kubectl describe netpol` lists the expected Pod selector separates those two cases.",
   "Choose your practice environment with this in mind. minikube can start with Calico using `minikube start --cni=calico`, or with Cilium using `--cni=cilium`. kind can be created with its default network plugin disabled in its cluster configuration and Calico or Cilium installed afterwards. Managed cloud clusters often need network policy enforcement turned on or a supporting plugin selected when the cluster is created. The CKAD exam environment is provided with a working setup, so there you focus on writing correct policies. In your own lab, however, an unenforcing plugin can make you believe a wrong policy is right, or a right policy is wrong, which wastes study time and builds false confidence.",
   "It also helps to understand the layering of policy APIs. NetworkPolicy is part of the core Kubernetes API, `networking.k8s.io/v1`, and is portable across every enforcing plugin, so a policy written for a Calico cluster behaves the same on a Cilium cluster. Calico and Cilium also offer their own custom resources with extra features, such as explicit deny rules, cluster-wide policies, rule ordering, or rules based on DNS names or application-layer protocols such as HTTP methods and paths. Those are custom resource definitions (CRDs) specific to one plugin and are not part of the CKAD objectives. If a task says NetworkPolicy, write the standard object.",
   "Finally, keep NetworkPolicy in perspective from a security point of view. It is defense in depth: it limits how far an attacker can move sideways after compromising one Pod and documents which services are meant to talk to each other. It complements, rather than replaces, authentication and encryption between services, because it works on IP addresses, ports and labels, not on verified identities. A well-run cluster uses an enforcing plugin, default-deny policies, narrow allow rules and service-level authentication together."
  ],
  "analogy": "NetworkPolicy is a set of rules posted on the doors of a building, and the CNI plugin is the security guard who reads them. With Calico or Cilium on duty, the guard checks every visitor against the posted rules. With a plugin that does not enforce policy, the signs are posted, the building manager happily accepts new ones, but no guard ever looks at them. The analogy holds well for exam purposes; where it stops is that a real building manager might notice there is no guard, while the API server never does.",
  "terms": [
   [
    "CNI (Container Network Interface)",
    "The standard interface Kubernetes uses to have a plugin set up Pod networking."
   ],
   [
    "Network plugin",
    "The CNI implementation that provides Pod networking and, if supported, enforces NetworkPolicy."
   ],
   [
    "Calico / Cilium",
    "Widely used network plugins that enforce NetworkPolicy."
   ],
   [
    "eBPF",
    "Linux kernel technology for running small verified programs, used by some plugins to filter traffic."
   ],
   [
    "DaemonSet",
    "Workload that runs one Pod per node; network plugin agents commonly run this way in kube-system."
   ]
  ],
  "example": "A developer applies a default-deny policy in a practice cluster running a basic Flannel network and is puzzled when requests still succeed. `kubectl get daemonset -n kube-system` shows only Flannel and kube-proxy. Recreating the cluster with `minikube start --cni=calico` makes the same policy block traffic as expected.",
  "mistakes": [
   [
    "Assuming the API server rejects policies it cannot enforce",
    "The API server only validates and stores policies. It does not know which plugin runs, so unenforced policies are accepted silently."
   ],
   [
    "Concluding a policy is wrong because traffic still flows",
    "First confirm the plugin enforces NetworkPolicy and that the policy selects the intended Pods; the YAML may be correct."
   ],
   [
    "Using plugin-specific CRDs when a task asks for a NetworkPolicy",
    "Calico and Cilium custom resources are not part of the CKAD objectives. Write the standard networking.k8s.io/v1 NetworkPolicy."
   ],
   [
    "Treating NetworkPolicy as a replacement for authentication",
    "It filters by labels, IPs and ports. It reduces lateral movement but does not verify identities or encrypt traffic."
   ]
  ],
  "tryit": [
   [
    "You join a team running a self-managed cluster. They have dozens of NetworkPolicies, and an audit asks whether the policies actually work. Nobody remembers which network plugin was installed. What do you do first, and what counts as proof?",
    "Identify the plugin with `kubectl get daemonset -n kube-system` or by listing kube-system Pods, then run a real traffic test: a connection that a policy should block, from a temporary Pod, must time out. Only a failed blocked connection proves enforcement."
   ],
   [
    "In your minikube lab, a correct default-deny policy blocks nothing. You started the cluster with default settings. What is the quickest fix for your study environment?",
    "Recreate the cluster with an enforcing plugin, for example `minikube start --cni=calico`, then reapply the policy and repeat the before and after traffic test."
   ]
  ],
  "tip": "If an exam-style question asks why a correct NetworkPolicy has no effect, the answer is that the cluster's CNI plugin does not enforce NetworkPolicy. Always test traffic before and after applying a policy.",
  "check": [
   [
    "Does the API server reject NetworkPolicies when the network plugin cannot enforce them?",
    "No; they are stored normally but have no effect."
   ],
   [
    "Name two plugins that enforce NetworkPolicy.",
    "Calico and Cilium."
   ],
   [
    "How do you verify that a policy is enforced?",
    "Test real traffic, for example with wget from a temporary Pod, before and after applying the policy."
   ],
   [
    "Where do network plugin agents usually run?",
    "As a DaemonSet in the kube-system namespace, one Pod per node."
   ]
  ]
 },
 {
  "t": "Ingress resources: ingressClassName, host and path rules, pathType Prefix vs Exact, default backend, TLS secrets",
  "hook": "Zara is launching the new storefront for Copperleaf Books. Marketing wants `shop.copperleaf.test/api` to reach the API team's Service, everything else under the same host to reach the web frontend, and anything unrecognized to land on a friendly fallback page. Security wants HTTPS with the certificate already stored in the cluster. She could create three LoadBalancer Services and three public addresses, or one Ingress with a handful of rules. But the first test sends `/apiv2/status` to the wrong place, and `/api/` returns a 404 that nobody expected. Which pathType did she choose, and how does matching really work?",
  "simple": "An Ingress is a set of directions for web traffic coming into the cluster. It says things like \"requests for this website name and this page path go to this Service.\" One Ingress can route many paths and names, so you do not need a separate public address for every app. The Ingress itself is just a list of rules; a separate program called an Ingress controller reads the list and does the routing. You can match a path exactly (\"only /login\") or as a prefix (\"/api and everything under it\"). You can also set a fallback for anything unmatched, and attach a certificate so visitors get HTTPS. It is like a mailroom sorting chart: name and floor decide which desk gets each letter.",
  "body": [
   "Start with what an Ingress is for. An Ingress describes how HTTP and HTTPS traffic from outside the cluster should reach Services inside it, using host names and URL paths. One Ingress, served by one external entry point, can route `shop.example.com/api` to one Service and `shop.example.com/` to another, and can serve several host names at once. That saves the cost and complexity of a separate LoadBalancer Service per application. The Ingress object, in the API group `networking.k8s.io/v1`, is only a set of rules; an Ingress controller reads them and does the actual routing, which the next lesson covers.",
   "The first field picks the controller. `spec.ingressClassName` names the IngressClass, and therefore the controller, that should handle this Ingress. If it is omitted, the cluster's default IngressClass is used if one is marked as default; otherwise the Ingress may be ignored by every controller and simply never work. List the available classes with `kubectl get ingressclass`, and copy the exact name into your Ingress.",
   "Rules come next. `spec.rules` is a list. Each rule may have a `host`, such as `shop.example.com`; without one, the rule applies to requests for any host. Hosts can use a single leading wildcard, such as `*.example.com`, which matches exactly one extra label, so `a.example.com` matches but `a.b.example.com` does not. Each rule contains `http.paths`, and each path entry has a `path`, a `pathType` and a `backend` naming a Service and a port, by number or by name. The backend Service must be in the same namespace as the Ingress; an Ingress cannot route directly to Services in other namespaces.",
   "```yaml\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: shop\nspec:\n  ingressClassName: nginx\n  tls:\n  - hosts: [\"shop.example.com\"]\n    secretName: shop-tls\n  defaultBackend:\n    service:\n      name: fallback\n      port: {number: 80}\n  rules:\n  - host: shop.example.com\n    http:\n      paths:\n      - path: /api\n        pathType: Prefix\n        backend:\n          service:\n            name: api\n            port: {number: 8080}\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web\n            port: {number: 80}\n```",
   "The `pathType` field decides how paths match, and it is required for every path. `Exact` matches the URL path exactly and is case-sensitive: `/api` matches only `/api`, not `/api/` and not `/api/v1`. `Prefix` matches by path elements split on `/`: `/api` matches `/api`, `/api/` and `/api/v1`, but not `/apiv2`, because `apiv2` is a different element, not a continuation of `api`. A Prefix path of `/` matches every request. `ImplementationSpecific` leaves matching to the controller, so behavior can differ between controllers; avoid it when a task specifies Exact or Prefix. When several paths match a request, the longest matching path wins, and if an Exact and a Prefix path are equally long, Exact is preferred. That is why `/api` with Prefix and `/` with Prefix can safely coexist: a request for `/api/users` matches both, and the longer `/api` wins.",
   "Two more fields complete the picture. `spec.defaultBackend` handles requests that match no rule at all, for example an unknown host or a path no rule covers. Without it, the controller returns its own default response, commonly a 404 page. To serve HTTPS, list the host names under `spec.tls` together with a `secretName` pointing to a Secret of type `kubernetes.io/tls` in the same namespace. You create that Secret from a certificate and key file with `kubectl create secret tls shop-tls --cert=tls.crt --key=tls.key`; it stores them under the keys `tls.crt` and `tls.key`. The controller terminates TLS (Transport Layer Security) with that certificate and forwards plain HTTP to the Service, unless it is configured to re-encrypt. The hosts in the tls section should match the hosts in your rules, or clients receive the controller's default certificate instead.",
   "Generating Ingresses imperatively saves a lot of indentation. `kubectl create ingress shop --class=nginx --rule=\"shop.example.com/api*=api:8080\" --rule=\"shop.example.com/*=web:80\" --default-backend=fallback:80` builds the same routing as the YAML above. A trailing `*` in the rule's path means Prefix; without it, the path is Exact. Adding `,tls=shop-tls` to a rule enables TLS for that host using the named Secret. Add `--dry-run=client -o yaml` to review or adjust before applying, for example to add annotations.",
   "Finally, verify. `kubectl get ingress` shows the CLASS, HOSTS, ADDRESS and PORTS columns, where PORTS shows `80, 443` once TLS is configured. `kubectl describe ingress shop` lists each host and path with its backend Service and that Service's endpoints, so an empty endpoint list or a misspelled Service name stands out immediately. Testing requests through the controller is covered in the next lesson."
  ],
  "analogy": "An Ingress is like a mailroom sorting chart for a large office building. The host is the company name on the envelope, the path is the department line, and the backend is the desk that receives it. Exact means \"only letters addressed precisely to Billing\", while Prefix means \"Billing and any sub-team of Billing\", though not \"Billingsworth Ltd\". The default backend is the \"unknown recipient\" tray. The analogy stops at the controller: the chart does nothing until a mail clerk, the Ingress controller, actually reads and follows it.",
  "terms": [
   [
    "Ingress",
    "An object defining host- and path-based HTTP(S) routing rules to Services in the same namespace."
   ],
   [
    "ingressClassName",
    "Field selecting which IngressClass, and therefore which controller, implements the Ingress."
   ],
   [
    "pathType Prefix",
    "Matches the path and anything below it, element by element split on /."
   ],
   [
    "pathType Exact",
    "Matches only the exact, case-sensitive URL path."
   ],
   [
    "defaultBackend",
    "Service that receives requests matching no rule."
   ],
   [
    "TLS Secret",
    "A Secret of type kubernetes.io/tls holding tls.crt and tls.key, referenced by an Ingress's tls section."
   ]
  ],
  "example": "A task asks you to route `app.local/v1` exactly to Service `v1-svc` and everything under `app.local/` to `web`. You create one Ingress with an Exact path `/v1` to v1-svc:80 and a Prefix path `/` to web:80, so `/v1` goes to v1-svc while `/v1/users` falls through to web.",
  "mistakes": [
   [
    "Expecting Prefix /api to match /apiv2",
    "Prefix matches whole path elements. /api matches /api and /api/v1 but not /apiv2."
   ],
   [
    "Expecting Exact /api to match /api/",
    "Exact matches one path only; a trailing slash makes a different path. Use Prefix if subpaths should match."
   ],
   [
    "Pointing a backend at a Service in another namespace",
    "Ingress backends must be Services in the Ingress's own namespace."
   ],
   [
    "Creating the TLS Secret in a different namespace or as a generic Secret",
    "The tls secretName must refer to a kubernetes.io/tls Secret in the same namespace, created with kubectl create secret tls."
   ]
  ],
  "tryit": [
   [
    "An Ingress has two paths for host `store.test`: `/` with Prefix to `web` and `/checkout` with Exact to `pay`. A customer's request for `/checkout/confirm` reaches `web` instead of `pay`. Is the Ingress broken?",
    "No, it behaves as written. Exact `/checkout` matches only `/checkout`, so `/checkout/confirm` falls back to the Prefix `/` rule. Change the checkout path to Prefix if subpaths should go to pay."
   ],
   [
    "You must serve `docs.test` over HTTPS with a certificate and key you have as files. Which two objects or fields do you need?",
    "A TLS Secret created with `kubectl create secret tls docs-tls --cert=<file> --key=<file>` in the Ingress's namespace, and an Ingress tls entry listing host docs.test with secretName docs-tls (or `,tls=docs-tls` on the kubectl create ingress rule)."
   ]
  ],
  "tip": "Prefix matches whole path segments (`/api` does not match `/apiv2`); Exact matches one path only. The longest matching path wins. In `kubectl create ingress`, a trailing `*` means Prefix. Backends and the TLS Secret must be in the Ingress's namespace.",
  "check": [
   [
    "Does a Prefix path `/foo` match `/foo/bar`? Does it match `/foobar`?",
    "It matches `/foo/bar` but not `/foobar`, because matching is by path element."
   ],
   [
    "What does an Ingress's tls section reference?",
    "The hosts to serve over HTTPS and a kubernetes.io/tls Secret, in the same namespace, holding the certificate and key."
   ],
   [
    "What handles requests that match no Ingress rule?",
    "The defaultBackend if set, otherwise the controller's own default (often a 404)."
   ],
   [
    "Paths `/` and `/api` are both Prefix. Which handles `/api/orders`?",
    "`/api`, because the longest matching path wins."
   ]
  ]
 },
 {
  "t": "Ingress controllers (for example ingress-nginx) and testing with curl and Host headers",
  "hook": "It is late on a Thursday at Silverline Outdoor Gear, and Ruth has just applied the Ingress for the new trail-map site. She points curl at the cluster's entry address and gets a plain 404 page. She checks the YAML: the host is `maps.silverline.test`, the path is `/` with Prefix, the backend Service has three healthy endpoints. A teammate suggests deleting and recreating everything. Before she does, Ruth wonders what that 404 is really telling her, and whether the problem is in the cluster at all, or in the request she sent. How do you test an Ingress when the host name it expects does not even exist in DNS yet?",
  "simple": "An Ingress is only a list of directions. A separate program, the Ingress controller, reads those directions and actually forwards the web traffic, a bit like a receptionist following a seating chart. Kubernetes does not include one by default, so someone has to install it. To test it, you use curl, a command-line tool that sends web requests. Because the Ingress routes by website name and that name may not exist in DNS yet, you send the request to the controller's address and tell it which name you mean by adding a Host header. The kind of error you get back tells you where the problem is: no matching rule, no healthy app behind the rule, or not reaching the controller at all.",
  "body": [
   "Start with the missing piece. An Ingress object does nothing on its own. An Ingress controller is the component that watches Ingress resources through the API server and configures a reverse proxy, a server that accepts client requests and forwards them to the right backend, to route traffic accordingly. Kubernetes does not ship a controller in its core; the cluster needs one installed. If none is running, Ingresses are accepted and stored but no traffic is routed, and the ADDRESS column of `kubectl get ingress` stays empty, which is the first clue to look for.",
   "ingress-nginx has long been the most widely used example. The Kubernetes project has announced its retirement, with maintenance ending in March 2026, so new clusters should pick another controller; the concepts and testing steps below are the same for any controller. ingress-nginx runs the NGINX web server as Pods, typically in a namespace named `ingress-nginx`, and exposes them through a Service, often of type NodePort or LoadBalancer. Other controllers include Traefik, HAProxy-based controllers, cloud provider controllers and Envoy-based ones. Each controller registers an IngressClass; the class's `spec.controller` field identifies which controller implements it, and an Ingress picks a class with `ingressClassName`. An IngressClass can be marked as the cluster default with the annotation `ingressclass.kubernetes.io/is-default-class: \"true\"`, so Ingresses without a class name use it.",
   "Practice labs make installation simple. minikube provides a controller with `minikube addons enable ingress`, and kind clusters can install ingress-nginx or another controller from its project's manifests, with port mappings set in the kind cluster configuration so the host can reach it. Confirm the controller is running with `kubectl get pods -n ingress-nginx` (or the namespace your controller uses) and that its class exists with `kubectl get ingressclass`.",
   "Testing is mostly done with curl, and the Host header is the key idea. Routing depends on the host name in each request, but in a lab you usually have no DNS record for a test host such as `shop.example.com`. So you send the request to the controller's address and set the HTTP `Host` header yourself, which is exactly what a browser would send if DNS pointed the name there. First find the entry point: the EXTERNAL-IP of the controller's LoadBalancer Service, or a node IP plus the NodePort of the controller's Service. Then send requests that carry the host name the rule expects.",
   "```bash\nkubectl get svc -n ingress-nginx\nkubectl get ingress shop            # ADDRESS, HOSTS, PORTS\ncurl -H 'Host: shop.example.com' 192.168.49.2/api/health\ncurl -H 'Host: shop.example.com' 192.168.49.2:30080/\n```",
   "HTTPS needs a slightly different technique. Use `curl -k --resolve shop.example.com:443:192.168.49.2` followed by the HTTPS address of shop.example.com. The `--resolve host:port:ip` option tells curl to use a given IP address for a host name and port, which is better than a Host header for HTTPS because curl then also sends the right name during the TLS handshake as SNI (Server Name Indication). The controller uses SNI to pick the right certificate, so a Host header alone often gets you the controller's default certificate. `-k` skips certificate verification, which is acceptable for self-signed test certificates and nowhere else, and `-v` shows the request headers, response headers and certificate details. Adding the name to `/etc/hosts` on your machine is another option that works for both HTTP and HTTPS.",
   "Reading the results is where the real troubleshooting happens, because each failure points to a different layer. A 404 from the controller, often an NGINX-branded page for ingress-nginx, means the request reached the controller but no rule matched. Usually that is a wrong host, a path or pathType that does not match the URL, or an Ingress that names a class this controller does not handle. A 503 or 502 means a rule matched but the backend failed: the Service has no ready endpoints, or the Ingress points at the wrong Service port. A connection timeout or 'connection refused' means you are not reaching the controller at all, so check the address, the NodePort and whether the controller Pods are running.",
   "Two commands finish the investigation. `kubectl describe ingress shop` lists each host and path with its backend Service and that Service's endpoints, and shows events from the controller, such as a successful sync. The controller's own logs, for example `kubectl logs -n ingress-nginx deploy/ingress-nginx-controller`, show each request it handled with its host, path, status code and chosen backend, which settles arguments quickly. For the exam, remember the pattern: set the Host header when testing by IP, then read the status code to decide whether to fix the rule, the backend or the network path."
  ],
  "analogy": "The Ingress controller is a hotel receptionist and the Ingress is the guest list taped to the desk. If you walk up and say only \"I am here\", the receptionist cannot find you on the list and turns you away, like a 404. Say \"I am here for the Wilson party\" (the Host header) and you are directed to the right room. If the room is locked and empty, that is a 503. If you cannot even find the hotel, that is a timeout. The analogy stops at HTTPS, where the name must be given before you reach the desk, which is what --resolve and SNI handle.",
  "terms": [
   [
    "Ingress controller",
    "The component that watches Ingress objects and runs the reverse proxy that routes traffic."
   ],
   [
    "IngressClass",
    "Object identifying a controller that Ingresses select with ingressClassName; one can be marked as the cluster default."
   ],
   [
    "Host header",
    "HTTP header naming the requested host, which Ingress host rules match on."
   ],
   [
    "curl --resolve",
    "Makes curl connect to a chosen IP for a host name and port, keeping the correct name for TLS."
   ],
   [
    "SNI (Server Name Indication)",
    "The host name a client sends during the TLS handshake so the server can choose the right certificate."
   ]
  ],
  "example": "After creating an Ingress for `shop.local`, `curl 192.168.49.2` returns a 404. Repeating it with `curl -H 'Host: shop.local' 192.168.49.2` returns the shop page: the controller was fine all along, but it routes by host and the first request carried the IP address as its host.",
  "mistakes": [
   [
    "Assuming Kubernetes includes an Ingress controller",
    "The core project ships none. Without an installed controller, Ingresses are stored but nothing routes and ADDRESS stays empty."
   ],
   [
    "Reading a 404 from the controller as \"the app is down\"",
    "A controller 404 means no rule matched the host, path or class. A 503 or 502 is what points at the backend."
   ],
   [
    "Curling the controller's IP without a Host header",
    "The request carries the IP as its host, so host-based rules do not match. Add -H 'Host: <name>' or use --resolve."
   ],
   [
    "Using only a Host header to test HTTPS certificates",
    "The certificate is chosen from SNI during the handshake. Use --resolve so curl sends the right name for TLS."
   ]
  ],
  "tryit": [
   [
    "A request with the correct Host header returns 503 from the controller. `kubectl describe ingress` shows the backend `web:80` with no endpoints listed. What do you check next?",
    "The rule matched, so look at the backend Service. Check `kubectl get endpointslices -l kubernetes.io/service-name=web` and the Pods' READY column; fix the selector or readiness problem, or the Service port if it does not match the Ingress backend port."
   ],
   [
    "Your Ingress has `ingressClassName: traefik`, but the only controller installed is ingress-nginx with class `nginx`. Requests with the correct Host header get 404. Why, and how do you fix it?",
    "No controller handles the traefik class, so ingress-nginx ignores this Ingress and returns its default 404. Change ingressClassName to nginx, or install a controller for the traefik class."
   ]
  ],
  "tip": "404 from the controller means no rule matched (host, path or class); 503 means the rule matched but the Service has no ready endpoints. Always set the Host header when testing by IP, and use --resolve for HTTPS.",
  "check": [
   [
    "An Ingress shows no ADDRESS and nothing routes. What is the most likely cause?",
    "No Ingress controller for its class is running (or the Ingress names a class no controller handles)."
   ],
   [
    "Why add a Host header when curling the controller's IP?",
    "Ingress rules match on host name, and curling an IP sends the IP as the host, so no host rule matches."
   ],
   [
    "A request through the Ingress returns 503. Where do you look next?",
    "At the backend Service's endpoints and port; the rule matched but no ready backend is available."
   ],
   [
    "Why is --resolve better than a Host header for testing HTTPS?",
    "It also sends the correct name as SNI during the TLS handshake, so the controller presents the right certificate."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
