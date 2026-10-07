/* Teacher edition for Certified Kubernetes Application Developer (CKAD (Kubernetes v1.35 curriculum)): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("ckad", [
 {
  "t": "Writing Dockerfiles: base images, layers, multi-stage builds, ENTRYPOINT vs CMD",
  "objectives": [
   "Students will be able to explain how layer caching works and reorder a Dockerfile so dependency installs stay cached.",
   "Students will be able to compare a single-stage and a multi-stage Dockerfile in terms of image size and attack surface.",
   "Students will be able to predict the exact command a container runs from its ENTRYPOINT, CMD and run-time arguments.",
   "Students will be able to justify the exec form over the shell form for graceful shutdown in Kubernetes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question and take three or four answers. Write the guesses on the whiteboard and leave them up to revisit later."
   ],
   [
    15,
    "Teach",
    "Walk through the lesson's multi-stage Go Dockerfile line by line on the projector. Draw the layer stack as boxes on the whiteboard and cross out the boxes that rebuild when a source file changes, first in a badly ordered file and then in a well ordered one. Finish with a two-column table on the board: ENTRYPOINT set or not, CMD set or not, and what happens to run-time arguments."
   ],
   [
    15,
    "Activity",
    "Run the Dockerfile repair clinic described below in pairs. Circulate and ask each pair to say aloud which symptom each of their edits fixes."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up guesses and correct them together. Ask pairs to share which of the four symptoms they found hardest to trace to a line."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "An image has ENTRYPOINT [\"echo\"] and CMD [\"hello\"]. You run it with the argument goodbye. What appears on the screen, and why?",
  "activity": {
   "title": "Dockerfile repair clinic",
   "materials": "Printed copies of a deliberately flawed Dockerfile (one per pair), a printed symptom list, colored pens, projector for the answer key.",
   "steps": [
    "Hand each pair a flawed Dockerfile: full-size base image, `COPY . .` before the dependency install, a `RUN rm` of a large download in a separate step, build tools left in the final image, and `CMD python app.py` in shell form.",
    "Give them the symptom list: slow rebuilds after small edits, a huge image, a security finding about compilers in production, and Pods that take the full grace period to stop.",
    "Pairs mark each problem line with a colored pen, write the symptom number next to it, and rewrite the file on the back as a two-stage build in exec form.",
    "Each pair then writes three run commands for their fixed image (no arguments, one argument, an entrypoint override) and predicts what runs for each.",
    "Pairs swap sheets with a neighbor to check predictions, then compare against the answer key on the projector."
   ]
  },
  "discussion": [
   "When would you choose to set only CMD and no ENTRYPOINT, and what flexibility does that give users of your image?",
   "Smaller base images reduce vulnerabilities but can make debugging harder because there is no shell. How would you balance that trade-off for a team?"
  ],
  "exit": [
   [
    "Why does `COPY requirements.txt .` followed by `RUN pip install -r requirements.txt` belong before `COPY . .`?",
    "Layers are cached in order, so source edits only invalidate the later COPY and the dependency install is reused."
   ],
   [
    "An image has ENTRYPOINT [\"nginx\"] and CMD [\"-g\", \"daemon off;\"]. What runs if you pass `-t` at run time?",
    "`nginx -t`, because run-time arguments replace CMD and keep ENTRYPOINT."
   ],
   [
    "Name one benefit of a multi-stage build and one benefit of exec form.",
    "Multi-stage keeps build tools out of the final image (smaller, less attack surface); exec form lets the app receive SIGTERM directly for graceful shutdown."
   ]
  ],
  "differentiation": [
   "Support: give struggling students the ENTRYPOINT and CMD combination table as a printed card and let them fill in a blank Dockerfile template with labeled slots rather than writing from scratch.",
   "Extend: ask fast finishers to add a `.dockerignore` and a non-root `USER` to their fixed file and explain how each change affects build context size or runtime security."
  ]
 },
 {
  "t": "Building, tagging, saving and loading images with docker or podman (build, tag, save, load)",
  "objectives": [
   "Students will be able to build an image with a specific name and tag from a given build context and Dockerfile path.",
   "Students will be able to distinguish save and load from export and import and choose the correct pair for moving an image.",
   "Students will be able to explain image references, tags and digests, including the meaning of an omitted tag.",
   "Students will be able to apply imagePullPolicy correctly when running a locally loaded image in a cluster."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on the whiteboard in two columns: what students think is inside the file, and what they think is missing."
   ],
   [
    12,
    "Teach",
    "Project the build, tag, save and load command block and narrate each step. Draw an image reference on the board and label registry, repository, tag and digest. Then draw two boxes side by side, save versus export, and list what each keeps."
   ],
   [
    18,
    "Activity",
    "Run the command card relay described below in groups of three. Walk the room and ask each group to explain one ordering choice."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up columns. Ask groups which card tripped them up and why export looked tempting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in at the door."
   ]
  ],
  "warmup": "A colleague emails you a single tar file and says it is the new app image. What do you hope is inside that file, and what could be missing that would stop it from starting?",
  "activity": {
   "title": "Command card relay",
   "materials": "Printed command cards (build, tag, save, load, export, import, push, images, image inspect, history, kind load docker-image), printed task sheets, a whiteboard for each group's final sequence.",
   "steps": [
    "Give each group a shuffled deck of command cards and a task sheet such as: build from /opt/app as webapp:v2, add the tag webapp:stable, save to /opt/webapp.tar, then load it on a second host and run it in a kind cluster.",
    "Groups lay the cards in order, writing the exact flags and arguments on each card with a marker. Distractor cards (export, import, push) must be set aside with a one-line reason.",
    "Each group adds one verification command after the save step and one Pod spec line that makes the cluster use the loaded image.",
    "Groups rotate to the next table, read that group's sequence and add a sticky note on any step they would change.",
    "The teacher projects a model answer and each group scores its own sequence."
   ]
  },
  "discussion": [
   "Why might a team pin images by digest rather than by tag in production, and what do they give up?",
   "If Podman and Docker accept nearly the same commands, what reasons might an organization have for choosing one over the other?"
  ],
  "exit": [
   [
    "Write the command to build an image named api with tag 3.1 from the current directory.",
    "`docker build -t api:3.1 .` (or the same with podman)."
   ],
   [
    "Which command pair moves an image with its CMD and layers intact: save/load or export/import?",
    "save/load; export/import flattens a container filesystem and drops metadata."
   ],
   [
    "A Pod uses image `tool` with no tag and no imagePullPolicy, and the image exists only on the node. What happens?",
    "The tag defaults to latest, so the pull policy defaults to Always, the kubelet tries a registry and the Pod ends up in ErrImagePull or ImagePullBackOff."
   ]
  ],
  "differentiation": [
   "Support: give students a reference card that maps each task verb (build, rename, archive, restore) to its command and flags, and pair them with a partner who reads the task sheet aloud.",
   "Extend: ask fast finishers to compare the output of `docker image inspect` before and after an export and import round trip and list every field that was lost."
  ]
 },
 {
  "t": "How Pod `command` and `args` override the image ENTRYPOINT and CMD",
  "objectives": [
   "Students will be able to explain the mapping of command to ENTRYPOINT and args to CMD.",
   "Students will be able to predict the effective start command for all four combinations of command and args.",
   "Students will be able to apply `sh -c` correctly when a container needs shell features such as loops or `&&`.",
   "Students will be able to generate Pod YAML with kubectl run and identify whether words landed in command or args."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let students vote by raising hands for each option. Record the vote counts on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw a two-by-two grid on the board: command set or not, args set or not. Fill each cell with the resulting command line for an example image. Then show the busybox looper Pod on the projector and explain why sh -c is needed."
   ],
   [
    18,
    "Activity",
    "Run the predict-the-process card game described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Compare final answers with the warm-up vote. Ask pairs which card they got wrong first and what rule they misapplied."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on a half sheet of paper."
   ]
  ],
  "warmup": "An image has ENTRYPOINT [\"python\", \"app.py\"] and CMD [\"--debug\"]. A Pod sets `args: [\"--quiet\"]`. Does the app run with --debug, --quiet, or both?",
  "activity": {
   "title": "Predict the process",
   "materials": "Printed scenario cards (each shows an image's ENTRYPOINT and CMD and a Pod's command and args), answer sheets, projector for the reveal.",
   "steps": [
    "Give each pair a deck of about ten scenario cards covering all four combinations, plus cards with shell strings, `$(VAR)` references with and without a matching env entry, and kubectl run lines with and without --command.",
    "For each card, pairs write the exact command line the container will run, word by word, and mark whether it will start, exit quickly, or fail.",
    "For any card marked fail, pairs rewrite the Pod fields so the container does what the card's caption intends.",
    "Pairs swap answer sheets with another pair and mark disagreements with a sticky note.",
    "The teacher reveals answers on the projector, pausing on the cards with the most disagreement."
   ]
  },
  "discussion": [
   "Why do you think Kubernetes chose not to run command and args through a shell by default?",
   "When is it better to override args in a Pod, and when is it better to rebuild the image with a new CMD?"
  ],
  "exit": [
   [
    "Which Pod field replaces the image ENTRYPOINT?",
    "`command`."
   ],
   [
    "An image has ENTRYPOINT [\"ls\"] and CMD [\"/\"]. A Pod sets only `command: [\"echo\"]`. What runs?",
    "Just `echo`, with no arguments, because setting only command discards the image CMD."
   ],
   [
    "Rewrite `command: [\"date > /tmp/out\"]` so it works.",
    "`command: [\"sh\", \"-c\", \"date > /tmp/out\"]`, because redirection needs a shell."
   ]
  ],
  "differentiation": [
   "Support: provide a printed two-by-two grid with the rule for each cell and let students fill it in for each scenario card before writing the final command line.",
   "Extend: ask fast finishers to write a Pod that reads a port from a ConfigMap into env and passes it with `$(PORT)` in args, then explain what changes if they switch to `sh -c` with `$PORT`."
  ]
 },
 {
  "t": "Choosing a workload: Deployment, StatefulSet, DaemonSet, Job, CronJob, bare Pod",
  "objectives": [
   "Students will be able to describe the purpose of Deployments, StatefulSets, DaemonSets, Jobs, CronJobs and bare Pods.",
   "Students will be able to choose the correct workload for a scenario from its clue words.",
   "Students will be able to explain why a bare Pod is not replaced after deletion or node failure.",
   "Students will be able to convert a generated Deployment manifest into a DaemonSet or StatefulSet manifest."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to shout out what disappears and what comes back. Write their predictions on the board."
   ],
   [
    12,
    "Teach",
    "Draw six columns on the whiteboard, one per workload, and fill in three rows for each: identity, how many copies, when it stops. Show `kubectl get pods` output with random suffixes and ordinal names side by side on the projector."
   ],
   [
    18,
    "Activity",
    "Run the workload matchmaker card sort described below in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Ask each group to present the card they argued about most and how they settled it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A node running three Pods fails: one belongs to a Deployment, one to a DaemonSet, and one was created with kubectl run. Which of the three come back, and where?",
  "activity": {
   "title": "Workload matchmaker",
   "materials": "Printed scenario cards (about twelve), six workload header cards, sticky notes, whiteboard.",
   "steps": [
    "Lay the six workload header cards across a table or tape them to the whiteboard.",
    "Groups draw scenario cards such as \"web API, scale to 20 at peak\", \"Redis cluster with per-member data\", \"collect logs from every node\", \"run a schema migration once\", \"purge temp files hourly\", \"check that DNS works right now\".",
    "Groups place each card under a workload and write the clue word that decided it on a sticky note attached to the card.",
    "For two of their cards, groups write the kubectl command or the manifest change (such as kind and serviceName) they would use to create it.",
    "Groups rotate to another table, challenge any placement they disagree with, and the teacher resolves the challenges with the class."
   ]
  },
  "discussion": [
   "Some teams run databases outside Kubernetes even though StatefulSets exist. What reasons might they have?",
   "Why might a CronJob be better than a Deployment running a loop with sleep for periodic work?"
  ],
  "exit": [
   [
    "Which workload gives each replica a stable name like web-0 and its own volume?",
    "A StatefulSet."
   ],
   [
    "You need a cleanup task to run every night at 3 a.m. Which workload?",
    "A CronJob, which creates a Job on that schedule."
   ],
   [
    "Which two workloads have no kubectl create generator, and how do you build them quickly?",
    "StatefulSet and DaemonSet; generate a Deployment with --dry-run=client -o yaml and edit the kind and fields."
   ]
  ],
  "differentiation": [
   "Support: give students a one-question flowchart card (what happens if this Pod disappears?) with branches leading to each workload, and let them use it during the card sort.",
   "Extend: ask fast finishers to write a complete DaemonSet manifest from a generated Deployment and list every field they removed or changed, with a reason for each."
  ]
 },
 {
  "t": "Jobs: completions, parallelism, backoffLimit, activeDeadlineSeconds, restartPolicy Never/OnFailure",
  "objectives": [
   "Students will be able to explain completions, parallelism, backoffLimit and activeDeadlineSeconds, including their defaults.",
   "Students will be able to predict how many Pods run at once and how a Job ends given a set of field values.",
   "Students will be able to compare restartPolicy Never and OnFailure in terms of Pods created and logs available.",
   "Students will be able to write a Job manifest with each field at the correct nesting level."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and have students write a number on a sticky note. Reveal the spread of answers on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw a timeline on the board with lanes for parallel Pods. Simulate completions 6, parallelism 2 by drawing Pods appearing and finishing. Then add a failure, mark a retry, and draw a vertical deadline line to show activeDeadlineSeconds cutting the Job off."
   ],
   [
    18,
    "Activity",
    "Run the human Job controller simulation described below."
   ],
   [
    5,
    "Discuss",
    "Ask the class which limit ended each round and how the outcome would change with OnFailure instead of Never."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "A Job has completions 4 and parallelism 3. How many Pods run in the first wave, and how many in the second, if every Pod succeeds?",
  "activity": {
   "title": "Human Job controller",
   "materials": "Printed Job spec cards with different values, a six-sided die per group, sticky notes in two colors, a clock or phone timer, whiteboard.",
   "steps": [
    "Split into groups of four or five. One student is the Job controller, the others are Pods. The controller draws a Job spec card listing completions, parallelism, backoffLimit, activeDeadlineSeconds and restartPolicy.",
    "Each round lasts 20 seconds. The controller sends up to parallelism Pods to the board; each Pod rolls the die, and a 1 means failure. Successful Pods place a green sticky note, failed Pods a red one.",
    "With restartPolicy Never, a failed Pod sits down and a new student takes its place; with OnFailure, the same student rolls again and adds a tally mark for a restart.",
    "The controller stops the game when completions are reached, when failures exceed backoffLimit, or when the timer passes the deadline, and announces the Job's final status and reason.",
    "Groups record their outcome on the board and then play a second round with a different card."
   ]
  },
  "discussion": [
   "When would you prefer a short activeDeadlineSeconds over a high backoffLimit, and what risk does each guard against?",
   "Why might a team set ttlSecondsAfterFinished, and what do they lose by doing so?"
  ],
  "exit": [
   [
    "What are the defaults for completions, parallelism and backoffLimit?",
    "1, 1 and 6."
   ],
   [
    "A Job still has retries left but fails with DeadlineExceeded. Why?",
    "activeDeadlineSeconds passed, and the deadline takes precedence over backoffLimit."
   ],
   [
    "Where does restartPolicy go in a Job manifest, and which values are allowed?",
    "In spec.template.spec; Never or OnFailure."
   ]
  ],
  "differentiation": [
   "Support: give students a labeled Job manifest skeleton with blank boxes at each nesting level so they can place fields correctly before writing from scratch.",
   "Extend: ask fast finishers to explain how a work-queue Job (parallelism set, completions unset) decides it is complete, and sketch a scenario where it would be the better design."
  ]
 },
 {
  "t": "CronJobs: schedule syntax, concurrencyPolicy, history limits, running a job manually from a CronJob",
  "objectives": [
   "Students will be able to read and write five-field cron schedules, including steps, ranges and day-of-week values.",
   "Students will be able to compare the Allow, Forbid and Replace concurrency policies and choose one for a scenario.",
   "Students will be able to place CronJob, Job and Pod fields at the correct nesting level in a manifest.",
   "Students will be able to trigger a CronJob manually with kubectl create job --from and verify the result."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write the three warm-up schedules on the whiteboard and give students one minute to translate them into plain English on scrap paper."
   ],
   [
    12,
    "Teach",
    "Label the five cron fields above a sample expression on the board. Draw a timeline showing a 10-minute schedule with 15-minute runs, then redraw it three times for Allow, Forbid and Replace. Project the CronJob manifest and box the three nesting levels in different colors."
   ],
   [
    18,
    "Activity",
    "Run the cron translator and policy court activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to share one scenario where they chose Replace and defend it against a pair that chose Forbid."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Translate into plain English: `0 2 * * *`, `*/10 * * * *`, and `30 9 * * 1-5`.",
  "activity": {
   "title": "Cron translator and policy court",
   "materials": "Printed cards with cron expressions on one side and blank backs, printed scenario cards for concurrency, a printed CronJob manifest with fields cut into strips, tape, whiteboard.",
   "steps": [
    "Round one: pairs get eight cron cards (some written as expressions, some as English descriptions) and translate each to the other form on the back, then check against a neighbor pair.",
    "Round two: pairs read four scenario cards (overlapping backups, a cache refresh that sometimes hangs, independent hourly emails, a nightly report that must not double-write) and pick a concurrencyPolicy for each with a one-sentence reason.",
    "Round three: pairs receive the cut-up CronJob manifest strips (schedule, concurrencyPolicy, history limits, backoffLimit, restartPolicy, containers) and tape them into the correct nesting order on a sheet.",
    "Pairs finish by writing the exact command to run their CronJob once immediately and the command to see its logs.",
    "The teacher projects the answers and pairs score themselves."
   ]
  },
  "discussion": [
   "Why might a team prefer the timeZone field over writing schedules in Coordinated Universal Time (UTC) and converting in their heads?",
   "What are the trade-offs of setting both history limits to 0?"
  ],
  "exit": [
   [
    "Write a schedule that runs at 06:30 every weekday.",
    "`30 6 * * 1-5`."
   ],
   [
    "A run is due while the previous Job is still active and concurrencyPolicy is Forbid. What happens?",
    "The new run is skipped; the running Job continues."
   ],
   [
    "Write the command to run CronJob nightly once immediately as a Job named nightly-test.",
    "`kubectl create job nightly-test --from=cronjob/nightly`."
   ]
  ],
  "differentiation": [
   "Support: give students a printed cron field ruler showing the five positions and their ranges, and let them place each value under the ruler before translating.",
   "Extend: ask fast finishers to explain what startingDeadlineSeconds and suspend do, and design a CronJob that can be paused during a maintenance window without losing its history."
  ]
 },
 {
  "t": "Multi-container patterns: init containers, sidecars (including native sidecars with restartPolicy: Always), adapter and ambassador",
  "objectives": [
   "Students will be able to explain how init containers run in order before app containers and how failures appear in Pod status.",
   "Students will be able to compare a regular sidecar container with a native sidecar declared under initContainers with restartPolicy: Always.",
   "Students will be able to distinguish the adapter and ambassador patterns from a scenario description.",
   "Students will be able to use kubectl logs and exec with -c to troubleshoot a specific container in a multi-container Pod."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up question aloud and have students discuss with a neighbor for one minute, then take three answers."
   ],
   [
    12,
    "Teach",
    "Draw a Pod timeline on the whiteboard: init containers as sequential bars, the app as a long bar, a regular sidecar as a bar that never ends, and a native sidecar as a bar that starts early and ends just after the app. Project the native sidecar YAML and circle where restartPolicy: Always sits."
   ],
   [
    18,
    "Activity",
    "Run the Pod timeline role-play described below in groups of five."
   ],
   [
    5,
    "Discuss",
    "Ask each group what went wrong in the regular sidecar round and how the native sidecar round fixed it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Your Job's main container finished its work an hour ago, but the Job still says Running. The Pod has a second container that ships logs. What do you think is keeping the Job alive?",
  "activity": {
   "title": "Pod timeline role-play",
   "materials": "Name cards for each container role (two init containers, app, log shipper, adapter, ambassador), a printed script of events, whiteboard for the timeline, a timer.",
   "steps": [
    "Assign roles: init-1 (wait for database), init-2 (fetch config), app, log shipper. Extra students play adapter and ambassador in round three.",
    "Round one: the teacher calls out events. Init containers must stand, do their task, and sit before the next one stands; the app stands only when both have sat. A group member draws each container as a bar on the board timeline.",
    "Round two: the log shipper is a regular container. When the app sits down (Job done), the shipper stays standing, and the group notes that the Job cannot complete. Repeat with the shipper as a native sidecar that stands right after init-1 and sits automatically when the app sits.",
    "Round three: the teacher reads scenario cards (convert logs to a monitoring format, route database calls to the right shard). Students playing adapter or ambassador must claim the scenario that matches their role and explain why.",
    "Groups finish by writing the kubectl command they would use to read each container's logs, using -c."
   ]
  },
  "discussion": [
   "Why might a team prefer splitting a helper into a sidecar instead of adding the same tool to the main application image?",
   "What risks come with putting many sidecars in one Pod, for example for resource use or start-up time?"
  ],
  "exit": [
   [
    "Where do you declare a native sidecar, and which field makes it one?",
    "Under spec.initContainers, with restartPolicy: Always on that container."
   ],
   [
    "A Pod shows Init:1/3. What does that tell you?",
    "One of three init containers has finished; the app containers have not started yet."
   ],
   [
    "An app connects to localhost and a helper forwards traffic to a remote database cluster. Which pattern is this?",
    "Ambassador."
   ]
  ],
  "differentiation": [
   "Support: give students a printed timeline template with labeled rows (init, app, sidecar, native sidecar) so they only need to draw where each bar starts and stops.",
   "Extend: ask fast finishers to write a complete Pod manifest with an init container that waits for a Service name, a native sidecar that tails a shared log file, and the app, then predict the READY column value when healthy."
  ]
 },
 {
  "t": "Ephemeral volumes: emptyDir (including medium: Memory), configMap/secret/projected volumes",
  "objectives": [
   "Students will be able to explain the lifetime of ephemeral volumes compared with container restarts and Pod deletion.",
   "Students will be able to compare disk-backed and memory-backed emptyDir volumes and their effect on memory limits.",
   "Students will be able to write configMap, secret and projected volume definitions with the correct field names.",
   "Students will be able to diagnose a Pod stuck in ContainerCreating because of a missing ConfigMap or Secret."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students hold up one, two or three fingers for the answer they choose. Note the split on the board."
   ],
   [
    12,
    "Teach",
    "Draw a Pod box with two containers and a shared emptyDir in the middle. Show what survives a container restart and what is lost on Pod deletion. Project the volume YAML, circle `name` versus `secretName`, and then show the projected volume as one folder fed by arrows from four sources."
   ],
   [
    18,
    "Activity",
    "Run the volume spec detective activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Ask pairs which bug was hardest to spot and what check they would run in a real cluster to confirm it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A container writes a file to an emptyDir and then crashes and restarts. Is the file (1) gone, (2) still there, or (3) moved to another node?",
  "activity": {
   "title": "Volume spec detective",
   "materials": "Printed Pod specs with planted bugs (one set per pair), printed symptom cards, highlighters, projector for answers.",
   "steps": [
    "Give each pair five short Pod specs. Bugs include a secret volume using `name` instead of `secretName`, a memory-backed emptyDir with no room in the memory limit, a ConfigMap volume referring to a misspelled ConfigMap, a projected source listed that is not allowed, and an app expecting updates through env vars.",
    "Give each pair five symptom cards (OOMKilled, ContainerCreating with a not found event, validation error, stale config after update, rejected manifest) and have them match each symptom to a spec.",
    "Pairs highlight the faulty line and write the corrected YAML next to it.",
    "Pairs then write the kubectl command they would use to confirm each fix, such as describe pod, exec df -h, or exec ls -l.",
    "The teacher reveals answers on the projector and pairs score themselves."
   ]
  },
  "discussion": [
   "When is keeping a secret in a memory-backed volume worth the extra memory cost?",
   "Why might an application team prefer mounted config files over environment variables, and what do they give up?"
  ],
  "exit": [
   [
    "Which field names the Secret in a standalone secret volume?",
    "secretName."
   ],
   [
    "Why can a memory-backed emptyDir lead to an OOMKilled container?",
    "Its contents count toward the container's memory usage and limit."
   ],
   [
    "A Pod is stuck in ContainerCreating with a 'configmap not found' event. What is wrong?",
    "The volume references a ConfigMap that does not exist in the namespace; create it, fix the name, or mark it optional."
   ]
  ],
  "differentiation": [
   "Support: provide a printed field cheat card showing the four volume types side by side with their name fields highlighted, and let students use it during the detective activity.",
   "Extend: ask fast finishers to add a serviceAccountToken source with an audience and expirationSeconds to a projected volume and explain why short-lived tokens are safer than long-lived ones."
  ]
 },
 {
  "t": "Persistent storage: PersistentVolume, PersistentVolumeClaim, StorageClass, access modes, dynamic provisioning",
  "objectives": [
   "Students will be able to explain the roles of PersistentVolumes, PersistentVolumeClaims and StorageClasses and which are namespaced.",
   "Students will be able to compare the RWO, ROX, RWX and RWOP access modes and choose one for a scenario.",
   "Students will be able to diagnose why a PVC is Pending or will not bind to a specific PV.",
   "Students will be able to predict what happens to data under the Delete and Retain reclaim policies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers on the whiteboard. Leave them up for the discussion."
   ],
   [
    12,
    "Teach",
    "Draw three boxes on the board: Pod, PVC, PV, with a StorageClass box feeding the PV through a provisioner arrow. Label which are namespaced. Fill a small table for the four access modes, then show `kubectl get pv,pvc` output on the projector with Bound, Pending and Released rows."
   ],
   [
    18,
    "Activity",
    "Run the binding matchmaker activity described below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up answers and ask groups which mismatch was easiest to miss."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your Pod writes uploads to an emptyDir, and the Pod is deleted and recreated. Where did the files go, and what would you need for them to come back?",
  "activity": {
   "title": "Binding matchmaker",
   "materials": "Printed PV cards and PVC cards listing capacity, access modes and storageClassName, printed StorageClass cards with reclaimPolicy and volumeBindingMode, whiteboard, sticky notes.",
   "steps": [
    "Give each group six PV cards, six PVC cards and two StorageClass cards (one marked default, one using WaitForFirstConsumer).",
    "Groups try to bind each PVC to a PV or to a StorageClass for dynamic provisioning. Every pairing must match class, access mode and capacity.",
    "For each PVC that cannot bind, groups write the status it would show and the event message they expect from kubectl describe pvc.",
    "The teacher then calls out events (a PVC is deleted, a Pod is scheduled) and groups update the cards, moving PVs to Released or deleting them according to the reclaim policy.",
    "Groups compare final boards with a neighboring group and resolve differences with the teacher's answer key."
   ]
  },
  "discussion": [
   "Why do you think Kubernetes makes Pods reference claims rather than volumes directly?",
   "When would a team accept the extra cleanup work of a Retain reclaim policy?"
  ],
  "exit": [
   [
    "Which access mode lets Pods on many nodes write to the same volume?",
    "ReadWriteMany (RWX)."
   ],
   [
    "A PVC omits storageClassName. What class does it use?",
    "The cluster's default StorageClass."
   ],
   [
    "Name the three fields that must be compatible for a static PV and PVC to bind.",
    "storageClassName, access mode, and capacity (PV at least as large as the request)."
   ]
  ],
  "differentiation": [
   "Support: give students a binding checklist card with three boxes (class, mode, size) to tick for each PV and PVC pairing.",
   "Extend: ask fast finishers to write a PVC and a Pod that mounts it, then explain step by step what happens in a cluster with a WaitForFirstConsumer default class from apply to Bound."
  ]
 },
 {
  "t": "Mounting volumes with volumeMounts, mountPath, subPath and readOnly",
  "objectives": [
   "Students will be able to explain the relationship between Pod-level volumes and container-level volumeMounts.",
   "Students will be able to predict when a mountPath hides existing files and use subPath to avoid it.",
   "Students will be able to compare whole-volume and subPath mounts in terms of ConfigMap update behavior.",
   "Students will be able to apply readOnly mounts and writable emptyDirs to enforce least privilege."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up scenario and ask students to predict the result with a show of hands. Record the vote."
   ],
   [
    12,
    "Teach",
    "Draw a container's directory tree on the whiteboard, then lay a sticky note over a directory to show a mount hiding it. Replace the sticky note with a small one on a single file to show subPath. Project the nginx example and point at mountPath, subPath and readOnly in turn."
   ],
   [
    18,
    "Activity",
    "Run the mount map puzzle described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to explain the update-versus-neighbors trade-off in their own words and when they would pick each."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "An image has three files in /etc/app. You mount a ConfigMap with one key at /etc/app. How many files does the container see in /etc/app, and why?",
  "activity": {
   "title": "Mount map puzzle",
   "materials": "Printed directory trees of a container image, printed Pod specs with different volumeMounts, sticky notes in two sizes, colored pens.",
   "steps": [
    "Give each pair a printed directory tree for an image (for example nginx with several files in conf.d and html) and four Pod specs that mount volumes differently: whole directory, subPath file, readOnly, and a mount with a misspelled volume name.",
    "For each spec, pairs cover the tree with large sticky notes for whole-volume mounts and small ones for subPath mounts, then list exactly which files the container can see.",
    "Pairs mark which mounts will refresh when the ConfigMap is edited and which are writable by the container.",
    "Pairs rewrite one spec to make the container least-privileged: read-only config, readOnlyRootFilesystem, and an emptyDir only at /tmp.",
    "Pairs swap with another pair to check their maps, then the teacher reviews the misspelled-name spec and the validation error it causes."
   ]
  },
  "discussion": [
   "If subPath mounts do not refresh, why do so many teams still use them for config files?",
   "How does combining readOnly mounts with readOnlyRootFilesystem change what an attacker could do inside a compromised container?"
  ],
  "exit": [
   [
    "A volume is listed under spec.volumes but not under a container's volumeMounts. Can that container read it?",
    "No; each container must mount it explicitly."
   ],
   [
    "Write the volumeMounts entry that places the key app.conf from volume cfg at /etc/app/app.conf without hiding other files.",
    "`- name: cfg`, `mountPath: /etc/app/app.conf`, `subPath: app.conf`."
   ],
   [
    "Why might a ConfigMap edit not show up in a running container?",
    "The file is mounted with subPath, which does not receive updates, or the value is used as an environment variable; restart the Pod."
   ]
  ],
  "differentiation": [
   "Support: give students a two-row comparison card (whole mount versus subPath) listing hides neighbors and auto-updates for each, to use while solving the puzzle.",
   "Extend: ask fast finishers to use subPathExpr with the Pod name from the downward API so each replica writes logs to its own subdirectory of a shared volume."
  ]
 },
 {
  "t": "Deployments and ReplicaSets: how the Pod template, labels and selectors fit together",
  "objectives": [
   "Students will be able to describe the ownership chain from Deployment to ReplicaSet to Pod.",
   "Students will be able to explain the rule that a Deployment's selector must match its Pod template labels and that it is immutable in apps/v1.",
   "Students will be able to predict which changes create a new ReplicaSet and which only scale the existing one.",
   "Students will be able to trace how label selectors cause a Service or ReplicaSet to pick up Pods it does not own."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take quick answers. Write \"new ReplicaSet\" and \"same ReplicaSet\" columns on the board and sort the answers."
   ],
   [
    12,
    "Teach",
    "Draw the chain Deployment to ReplicaSet to Pods on the board, writing labels on each Pod. Project the Deployment YAML and draw arrows from selector to template labels. Then show `kubectl get deploy,rs,pods --show-labels` output and point out the pod-template-hash label."
   ],
   [
    18,
    "Activity",
    "Run the label matching game described below in groups of four."
   ],
   [
    5,
    "Discuss",
    "Ask groups to share the round that surprised them most, especially the stray Pod and the standalone ReplicaSet."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Which of these create a new ReplicaSet for a Deployment: changing the image, scaling to 10 replicas, adding an environment variable, or adding a label to the Deployment's top-level metadata?",
  "activity": {
   "title": "Label matching game",
   "materials": "Sticky notes as Pod labels, printed cards for a Deployment, ReplicaSets, a Service and a standalone ReplicaSet with their selectors, whiteboard.",
   "steps": [
    "Students wear or hold sticky notes with labels (for example app=web, pod-template-hash=abc, tier=frontend). Some students are bare Pods with only app=web.",
    "One student holds the ReplicaSet card with selector app=web plus pod-template-hash=abc and calls roll: only matching students stand. Another holds the Service card with selector app=web and calls roll; the group notes who receives traffic.",
    "The teacher announces a template change (new image). The group writes a new pod-template-hash on new sticky notes and simulates the new ReplicaSet scaling up while the old one scales down.",
    "In the last round, a student holds a standalone ReplicaSet card with selector app=web and replicas 3. The group decides which Pods it adopts and which it would delete.",
    "Each group writes a one-line rule for each round on the whiteboard."
   ]
  },
  "discussion": [
   "Why do you think Kubernetes made Deployment selectors immutable in apps/v1?",
   "What labeling conventions would you set for a team to avoid stray Pods receiving production traffic?"
  ],
  "exit": [
   [
    "Name the object a Deployment creates and the object that object creates.",
    "A ReplicaSet, which creates Pods."
   ],
   [
    "A Deployment's selector is app: api and its template labels are app: api, tier: back. Is this valid?",
    "Yes; the selector labels are a subset of the template labels."
   ],
   [
    "Does editing only the replicas field create a new ReplicaSet?",
    "No; only Pod template changes create a new ReplicaSet."
   ]
  ],
  "differentiation": [
   "Support: give students a printed diagram of the Deployment chain with blank label boxes to fill in, and let them check each selector match with a highlighter.",
   "Extend: ask fast finishers to rewrite a Deployment selector using matchExpressions with In and explain how it would select Pods from two template versions."
  ]
 },
 {
  "t": "Rolling updates: maxSurge, maxUnavailable, minReadySeconds; the Recreate strategy",
  "objectives": [
   "Students will be able to calculate the maximum Pod count and minimum available Pods from replicas, maxSurge and maxUnavailable, including rounding.",
   "Students will be able to explain how readiness and minReadySeconds control rollout progress and why a bad rollout stalls.",
   "Students will be able to compare RollingUpdate and Recreate and choose one for a scenario.",
   "Students will be able to write a strategy block and monitor a rollout with kubectl rollout status."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write the warm-up question on the board and give students one minute to calculate. Take answers and write them down without confirming."
   ],
   [
    12,
    "Teach",
    "Draw replicas as boxes on the whiteboard and animate a rollout with maxSurge 1, maxUnavailable 0 by erasing and adding boxes step by step. Repeat with maxSurge 0, maxUnavailable 1. Show the rounding rules with the 10-replica default example, then sketch a Recreate rollout with a visible gap."
   ],
   [
    18,
    "Activity",
    "Run the rollout board game described below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Ask groups which scenario cards pushed them to Recreate and whether any group disagreed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A Deployment has 8 replicas and uses the default 25% maxSurge and maxUnavailable. What is the most Pods that can exist during an update, and the fewest that must stay available?",
  "activity": {
   "title": "Rollout board game",
   "materials": "Printed grids or whiteboard space, two colors of sticky notes (old and new versions), printed scenario cards with replicas and strategy values, a die for random readiness failures.",
   "steps": [
    "Each group draws a scenario card, for example 4 replicas with maxSurge 1 and maxUnavailable 0, or 6 replicas with defaults, or Recreate.",
    "Groups lay out old-version sticky notes for the starting replicas and simulate the rollout one step at a time, never exceeding the maximum or dropping below the minimum available. A new Pod counts as available only after one full turn, representing minReadySeconds.",
    "On each new Pod, roll the die; a 1 means the readiness probe fails. Groups must show how the rollout stalls and how many old Pods keep serving.",
    "Groups record, for their scenario, the maximum Pod count, minimum available, and number of steps to finish, then write the strategy YAML.",
    "Groups swap scenario cards with another group and check each other's numbers."
   ]
  },
  "discussion": [
   "If spare capacity is tight, which setting would you relax first, maxSurge or maxUnavailable, and why?",
   "Why do you think Kubernetes does not roll back automatically when a rollout passes its progress deadline?"
  ],
  "exit": [
   [
    "With 4 replicas, maxSurge 1 and maxUnavailable 0, what are the maximum Pods and minimum available?",
    "Maximum 5, minimum available 4."
   ],
   [
    "What does minReadySeconds add to a rollout?",
    "A new Pod must stay ready for that many seconds before it counts as available, catching Pods that crash shortly after start."
   ],
   [
    "Which strategy guarantees old and new versions never run at the same time?",
    "Recreate."
   ]
  ],
  "differentiation": [
   "Support: give students a formula card (max Pods = replicas + surge rounded up; min available = replicas - unavailable rounded down) and a worked example to follow before the game.",
   "Extend: ask fast finishers to compare a rollout of 20 replicas with 10% versus 50% maxSurge and explain the trade-off between speed and spare capacity."
  ]
 },
 {
  "t": "Kubectl rollout status, history, undo (--to-revision), pause and resume; kubectl set image and scale",
  "objectives": [
   "Students will be able to update a Deployment's image with kubectl set image, naming the correct container.",
   "Students will be able to explain which changes create a new revision and which, such as scaling, do not.",
   "Students will be able to roll back to a chosen revision and predict the resulting revision number.",
   "Students will be able to use rollout pause and resume to combine several changes into one rollout."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question and take three or four answers. Note on the whiteboard any belief that rollback 'goes back in time', to revisit later."
   ],
   [
    15,
    "Teach",
    "Walk through set image, rollout status, history, undo, pause and resume. Draw a revision timeline on the whiteboard (1, 2, 3, 4) and show what happens to the list when you undo to 2: cross out 2 and write 5. Stress that scale does not add a box to the timeline."
   ],
   [
    15,
    "Activity",
    "Run the revision timeline card game in pairs. Circulate and ask pairs to justify each revision number aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect rollback limits to real incidents, especially ConfigMap changes that undo cannot reverse."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "Your team shipped a broken image ten minutes ago and also doubled the replica count last week. If you 'undo' the Deployment, what do you expect to change, and what do you expect to stay the same?",
  "activity": {
   "title": "Revision timeline card game",
   "materials": "Printed command cards (set image, scale, set env, rollout restart, rollout undo, undo --to-revision=N, pause, resume), a printed starting state per pair (revision list and replica count), pens and the whiteboard.",
   "steps": [
    "Give each pair a starting state: Deployment web on revision 3, replicas 4, with a three-line history showing the image for each revision.",
    "Pairs draw command cards one at a time and update a hand-drawn history table and replica count after each card, writing the new revision number or 'no new revision'.",
    "Include traps in the deck: a scale card, an undo while paused, and set image with the image name on the left side. Pairs must say what kubectl would do.",
    "After eight cards, pairs swap sheets with a neighbor and check each other's final revision list and replica count against the teacher's answer key on the projector.",
    "Each pair writes the real kubectl command for their two hardest cards, ready to share."
   ]
  },
  "discussion": [
   "Rollback does not restore ConfigMaps or Secrets. How would you design an application so that a bad configuration change can be reversed as easily as a bad image?",
   "When would you choose rollout restart over undo, and what is the risk of using restart during an incident?"
  ],
  "exit": [
   [
    "Write the command that changes the container `api` in Deployment `shop` to image `shop:2.0`.",
    "`kubectl set image deploy/shop api=shop:2.0`."
   ],
   [
    "A Deployment on revision 6 is undone to revision 3. What revision is it on now, and is revision 3 still listed?",
    "Revision 7, and revision 3 is no longer listed separately because its template was copied forward."
   ],
   [
    "Name one change that does not create a revision, and say why.",
    "Scaling with kubectl scale, because it changes spec.replicas and not the Pod template."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page command reference with each command labeled 'creates revision' or 'no revision', and have them work through the first four cards with the teacher before continuing in pairs.",
   "Extend: Ask fast finishers to write a short shell sequence that changes an image, waits with rollout status, and automatically runs rollout undo if status returns a non-zero exit code, then explain why the exit code matters."
  ]
 },
 {
  "t": "Blue/green deployments by switching a Service selector between two Deployments",
  "objectives": [
   "Students will be able to explain how a Service selector determines which Pods receive traffic.",
   "Students will be able to configure two Deployments and one Service so that only one version is live at a time.",
   "Students will be able to perform and verify a cut-over and a rollback by changing the Service selector.",
   "Students will be able to compare blue/green with a rolling update in terms of cost, speed and user experience."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers in two columns on the whiteboard: 'what users see' and 'what it costs'."
   ],
   [
    12,
    "Teach",
    "Draw two boxes of Pods labeled blue and green and one Service with an arrow. Show the selector YAML on the projector, then redraw the arrow after the patch. Point out the three label locations in a Deployment and circle the template labels."
   ],
   [
    18,
    "Activity",
    "Run the human Service role-play. Let each group perform the switch twice, once correctly and once with a planted mistake."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, linking shared database state to the limits of instant rollback."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually on sticky notes."
   ]
  ],
  "warmup": "If you had to release a new version of a ticket site with zero chance of customers seeing two versions at once, what would you be willing to pay for that guarantee?",
  "activity": {
   "title": "Human Service role-play",
   "materials": "Sticky notes in two colors (one per version), a printed Service card that holds a written selector, a printed set of request cards, and the whiteboard.",
   "steps": [
    "In groups of six to eight, four or more students become Pods and wear a sticky note with their labels, such as 'app: shop, version: blue' or 'app: shop, version: green'.",
    "One student is the Service and holds a card with the selector written on it. Another student is the client and hands request cards to the Service, which may give them only to Pods whose labels match every line of the selector.",
    "Run traffic with the selector set to blue, then have the group 'patch' the selector card to green and run traffic again. Record which Pods received requests each time.",
    "The teacher secretly plants a mistake in one round, such as a green Pod labeled 'ver: green' or a selector with only 'app: shop'. The group must spot it from where the requests went and state the kubectl command that would have revealed it.",
    "Each group writes the kubectl patch command for the switch and for the rollback on the whiteboard."
   ]
  },
  "discussion": [
   "Blue/green promises instant rollback. What kinds of changes, such as database migrations, could make rolling back to blue unsafe?",
   "When would the doubled resource cost of blue/green be worth it, and when would a rolling update or canary be the better choice?"
  ],
  "exit": [
   [
    "Which object do you change to move traffic from blue to green?",
    "The Service, by changing its selector to match the green Pods' version label."
   ],
   [
    "Where in a Deployment must the version label be placed so the Service can use it?",
    "In the Pod template labels, spec.template.metadata.labels, and also in the Deployment's selector."
   ],
   [
    "Give one advantage and one cost of blue/green compared with a rolling update.",
    "Advantage: an instant, all-at-once switch and rollback with no mixed versions. Cost: roughly double the resources while both versions run."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed pair of Deployment manifests and a Service with blanks only for the labels and selector, and have them fill the blanks before the role-play.",
   "Extend: Ask fast finishers to design a preview Service for green and write the exact sequence of kubectl commands, including verification with EndpointSlices, for a full release and an emergency rollback."
  ]
 },
 {
  "t": "Canary releases with two Deployments behind one Service, weighted by replica count",
  "objectives": [
   "Students will be able to build a canary from two Deployments and one Service using shared and track labels.",
   "Students will be able to calculate the replica counts needed for a target traffic percentage.",
   "Students will be able to explain why replica-weighted splits are approximate.",
   "Students will be able to contrast canary, blue/green and rolling update strategies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Write any percentages students suggest on the whiteboard to reuse in the activity."
   ],
   [
    12,
    "Teach",
    "Draw one Service over ten Pod circles, nine labeled stable and one canary. Show the two selector rules side by side: Deployment selectors narrow, Service selector broad. Work two percentage problems aloud."
   ],
   [
    18,
    "Activity",
    "Run the canary math and label sort. Pairs complete the worksheet, then check a neighbor's answers."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare strategies and talk about when replica weighting is not precise enough."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "If you could let only some customers try a new feature first, how would you choose how many, and what would you watch to decide whether to continue?",
  "activity": {
   "title": "Canary math and label sort",
   "materials": "A printed worksheet with six traffic scenarios, printed label cards (app: api, track: stable, track: canary, version: blue) and three blank selector boxes per pair, and pens.",
   "steps": [
    "Pairs place label cards into three boxes: the Service selector, the stable Deployment selector and the canary Deployment selector. The teacher checks each pair before they move on.",
    "Pairs solve the worksheet scenarios, such as '20 percent on the new version with 5 Pods total' and '25 percent with 8 Pods total', writing replica counts for each Deployment.",
    "For two scenarios, pairs write the kubectl scale commands that move from one split to the next while keeping the total steady.",
    "The teacher reveals one scenario where the Service selector wrongly includes track: stable. Pairs explain the symptom users would see and how EndpointSlices would show it.",
    "Pairs swap worksheets with a neighbor and mark them against the answer key on the projector."
   ]
  },
  "discussion": [
   "Why might a canary with only one replica give misleading results, and how would you decide when you have seen enough evidence to promote it?",
   "What signals, such as logs, restarts or latency, would you watch during a canary, and which kubectl commands give you each one?"
  ],
  "exit": [
   [
    "With 10 Pods total, how many canary replicas give about 30 percent canary traffic?",
    "Three canary and seven stable."
   ],
   [
    "Which labels go in the Service selector and which in each Deployment's selector?",
    "The Service selector has only the shared label such as app: api; each Deployment selector has the shared label plus its own track label."
   ],
   [
    "State one way a canary differs from blue/green.",
    "A canary serves both versions at once in proportion without changing the Service selector, while blue/green switches all traffic at once by changing the selector."
   ]
  ],
  "differentiation": [
   "Support: Provide a percentage table (1 of 4 is 25 percent, 1 of 5 is 20 percent, 1 of 10 is 10 percent) and let students do the label sort with the teacher before the math scenarios.",
   "Extend: Ask fast finishers to write complete manifests for a stable and canary Deployment plus the Service, then plan a four-step progression from 10 percent to 100 percent with the exact commands at each step."
  ]
 },
 {
  "t": "Helm basics: repositories, charts, releases; helm repo add/update, search, install, upgrade, rollback, uninstall, list",
  "objectives": [
   "Students will be able to distinguish a chart, a repository and a release.",
   "Students will be able to add and update a repository, search it, and install a chart as a named release in a chosen namespace.",
   "Students will be able to upgrade, inspect history, roll back and uninstall a release, predicting revision numbers.",
   "Students will be able to troubleshoot 'release not found' errors caused by namespace scope."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect examples of app stores or package managers students know and write them on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Map chart, repository and release onto the app store examples. Project the command block and walk through the life cycle from repo add to uninstall, drawing a revision list that grows on upgrade and rollback."
   ],
   [
    17,
    "Activity",
    "Run the Helm life cycle relay with printed command cards. Groups must order the cards and predict outputs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially comparing helm rollback with kubectl rollout undo."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "When you install an app on your phone, what pieces are involved: where does it come from, what gets installed, and how would you go back to an older version?",
  "activity": {
   "title": "Helm life cycle relay",
   "materials": "Printed command cards (repo add, repo update, search repo, install, list, list -A, upgrade, history, rollback, status, uninstall), printed 'output' cards with sample helm list and helm history tables, the whiteboard and markers.",
   "steps": [
    "Give each group of three or four a shuffled deck of command cards and a task card: install chart demo/web as release shop in namespace store, upgrade it twice, roll back to revision 1, then remove a release called old that lives in an unknown namespace.",
    "Groups lay the command cards in order and write the full command on each, including the -n flag where needed.",
    "After each upgrade or rollback card, groups draw what helm history would show, including revision numbers and statuses.",
    "The teacher hands each group an output card showing an empty helm list. Groups must decide which command card reveals the missing release and why.",
    "Groups present their sequence on the whiteboard, and the class checks revision numbers together."
   ]
  },
  "discussion": [
   "Helm rollback restores ConfigMaps and Services, while kubectl rollout undo restores only the Pod template. When would that difference matter during an incident?",
   "Since Helm uses your own RBAC permissions, what might happen when a teammate with fewer permissions tries to upgrade a release you installed?"
  ],
  "exit": [
   [
    "Write the command to install chart bitnami/redis as release cache in namespace data, creating the namespace if needed.",
    "`helm install cache bitnami/redis -n data --create-namespace`."
   ],
   [
    "A release is on revision 3 and you run helm rollback to revision 1. What revision number is created?",
    "Revision 4, which matches revision 1; revisions 1 to 3 remain in the history."
   ],
   [
    "helm list shows nothing, but you know a release exists. What command should you run next?",
    "`helm list -A`, adding `-a` to include failed or pending releases."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-column glossary card (chart, repository, release) with a real-world comparison for each, and let them complete the relay with a partially ordered deck.",
   "Extend: Ask fast finishers to explain where Helm stores release records, write the kubectl command that lists those Secrets, and predict what happens to the release if its namespace is deleted."
  ]
 },
 {
  "t": "Helm values: helm show values, --set and -f values.yaml, helm template, namespaces with -n and --create-namespace",
  "objectives": [
   "Students will be able to discover a chart's configurable keys with helm show values.",
   "Students will be able to override values with -f files and --set, and predict the result when they conflict.",
   "Students will be able to preview rendered manifests with helm template and verify installed values with helm get values.",
   "Students will be able to install into a new namespace and explain how values carry over on upgrade."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about pizza or phone defaults and draw three stacked layers on the whiteboard as answers come in."
   ],
   [
    13,
    "Teach",
    "Label the layers chart defaults, -f files and --set. Project a short values.yaml and show how a --set flag with dotted keys maps onto it. Demonstrate the upgrade trap with a before-and-after values table."
   ],
   [
    17,
    "Activity",
    "Run the values precedence puzzle in pairs using printed layer cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore silent failures and safe upgrade habits."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "When you order food with a few changes from the menu, how does the kitchen decide what to make if your written note and your spoken request disagree?",
  "activity": {
   "title": "Values precedence puzzle",
   "materials": "Printed cards showing a chart values.yaml excerpt, two -f override files, and several --set flags; a printed answer grid per pair; pens; the projector for the answer key.",
   "steps": [
    "Give each pair a scenario sheet listing the chart defaults, the files passed with -f in order, and the --set flags for an install.",
    "Pairs fill in the answer grid with the final value of each key, such as replicaCount, image.tag and service.type, and mark which layer won.",
    "Include a card with a misspelled key such as service.typ. Pairs must say what Helm does with it and how they would detect the problem.",
    "Pairs then work an upgrade scenario where only one --set is passed, and write the resulting values with and without --reuse-values.",
    "Pairs check their grids against the projected answer key and write the helm template command that would have proven each answer."
   ]
  },
  "discussion": [
   "Why might a tool choose to ignore unknown keys silently instead of failing, and what habits protect you from that choice?",
   "Would you rather keep overrides in values files under version control or type them as --set flags? What are the tradeoffs during an exam versus in a real team?"
  ],
  "exit": [
   [
    "Which command prints a chart's default values so you can find key names?",
    "`helm show values <chart>`."
   ],
   [
    "replicaCount is 1 in values.yaml, 3 in a -f file, and 4 in --set. What does the release use?",
    "4, because --set beats -f files, which beat chart defaults."
   ],
   [
    "How do you install chart ./app as release demo into namespace test, which does not exist yet?",
    "`helm install demo ./app -n test --create-namespace`."
   ]
  ],
  "differentiation": [
   "Support: Provide a color-coded layer diagram (gray for defaults, blue for -f files, green for --set) and let students solve the first scenario together with the teacher before working in pairs.",
   "Extend: Ask fast finishers to write two values files, base.yaml and prod.yaml, plus an install command using both, then predict and justify every final value, including a list item set with an index."
  ]
 },
 {
  "t": "Kustomize: kustomization.yaml, resources, namePrefix, namespace, commonLabels/labels, images, patches, configMapGenerator",
  "objectives": [
   "Students will be able to write a kustomization.yaml that lists resources and applies namespace, namePrefix and labels.",
   "Students will be able to change images with the images field and modify fields with strategic merge or JSON 6902 patches.",
   "Students will be able to explain how configMapGenerator's hash suffix triggers rollouts.",
   "Students will be able to explain why commonLabels can fail on existing Deployments and choose labels instead."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about keeping several copies of the same file. Collect stories of copies drifting apart."
   ],
   [
    13,
    "Teach",
    "Project the sample kustomization.yaml and annotate each field on the whiteboard with 'what it changes'. Show a Deployment before and after the build, highlighting the renamed ConfigMap reference and the hash suffix."
   ],
   [
    17,
    "Activity",
    "Run the 'predict the build' exercise. Pairs read a base manifest and a kustomization and write the output by hand."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about immutability and generated names."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever kept two or three copies of the same document for different audiences? What went wrong when you needed to fix a mistake in all of them?",
  "activity": {
   "title": "Predict the build",
   "materials": "Printed handouts with a base Deployment, Service and ConfigMap plus three different kustomization.yaml files, blank paper, pens, and student laptops with a browser for checking field names in the Kubernetes documentation if needed.",
   "steps": [
    "Pairs receive the base manifests and kustomization A (namespace, namePrefix, images). They hand-write the resulting Deployment and Service metadata, image and references.",
    "Pairs move to kustomization B, which adds a strategic merge patch for replicas and a configMapGenerator. They write the generated ConfigMap name as 'name-<hash>' and show where the Deployment's reference changes.",
    "Kustomization C uses commonLabels on a Deployment that already exists. Pairs predict what kubectl apply -k would report and rewrite it using labels with includeSelectors: false.",
    "The teacher projects the real kubectl kustomize output for A and B, and pairs mark their predictions.",
    "Each pair writes one sentence explaining the most surprising difference between their prediction and the real output."
   ]
  },
  "discussion": [
   "Why does Kubernetes make a Deployment's selector immutable, and how does that shape the way tools like Kustomize add labels?",
   "When would you want a generated ConfigMap without the hash suffix, and what do you give up?"
  ],
  "exit": [
   [
    "Which kustomization field sets the image tag of nginx to 1.27, and what does its name key match?",
    "The images field, with name: nginx and newTag: \"1.27\"; name matches the image name in the manifest, not the container name."
   ],
   [
    "What happens to a Deployment when a configMapGenerator literal it uses changes?",
    "The ConfigMap gets a new hashed name, the Deployment's reference is rewritten, and the Pod template change triggers a rollout."
   ],
   [
    "Why prefer labels with includeSelectors: false over commonLabels?",
    "commonLabels also edits selectors, which are immutable on existing Deployments, so the apply can fail."
   ]
  ],
  "differentiation": [
   "Support: Give students a field reference card listing each kustomization field with a one-line before-and-after example, and let them complete kustomization A with the teacher.",
   "Extend: Ask fast finishers to rewrite kustomization B's strategic merge patch as a JSON 6902 patch with op, path and value, and to add a target that applies it to every Deployment with the label tier: web."
  ]
 },
 {
  "t": "Applying overlays with kubectl apply -k and previewing with kubectl kustomize",
  "objectives": [
   "Students will be able to describe the base and overlay layout and write an overlay that references a base.",
   "Students will be able to preview an overlay with kubectl kustomize and compare it with the cluster using kubectl diff -k.",
   "Students will be able to apply and delete an overlay with the -k flag.",
   "Students will be able to diagnose path and missing namespace errors in an overlay."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch a house plan with two buyer change lists on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw the app, base and overlays directory tree. Show an overlay kustomization.yaml and trace the ../../base path with arrows. Present the four -k commands as a sequence: preview, diff, apply, delete."
   ],
   [
    18,
    "Activity",
    "Run the overlay troubleshooting stations. Groups rotate through four printed broken overlays."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about safe change practices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If three teams need almost the same building plan with small differences, how would you organize the plans so that a fix to the shared part reaches everyone?",
  "activity": {
   "title": "Overlay troubleshooting stations",
   "materials": "Four printed station cards, each showing a directory tree, an overlay kustomization.yaml and the error or output a student ran into; sticky notes; the whiteboard.",
   "steps": [
    "Set up four stations around the room: a wrong relative path (resources: [base]), -k pointed at the file instead of the directory, a missing namespace, and a teammate who used -f instead of -k.",
    "Groups spend about four minutes at each station, writing on a sticky note the cause of the problem and the exact corrected command or file line.",
    "At the last station, each group also writes the command they would run to preview and the one to see live differences before applying the fix.",
    "Groups stick their notes on the whiteboard under each station name, and the class compares answers.",
    "The teacher confirms the correct fix for each station and highlights any station where groups disagreed."
   ]
  },
  "discussion": [
   "Why might a team require a kubectl diff -k output in every change ticket, and what could it still fail to reveal?",
   "Should an overlay include its own Namespace manifest, or should namespaces be created separately? Argue one side."
  ],
  "exit": [
   [
    "Write the command that previews overlays/dev without touching the cluster.",
    "`kubectl kustomize overlays/dev`."
   ],
   [
    "An overlay lives at app/overlays/prod and the base at app/base. What path goes in the overlay's resources?",
    "../../base."
   ],
   [
    "Which command shows how applying overlays/prod would change the live cluster?",
    "`kubectl diff -k overlays/prod`."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled directory tree diagram with the relative paths already traced, and pair them with a partner for the first two stations.",
   "Extend: Ask fast finishers to design a three-level layout with a base, a shared 'cloud' overlay and dev and prod overlays on top of it, and write each kustomization.yaml with correct relative paths."
  ]
 },
 {
  "t": "API deprecations and removals: finding current apiVersions with kubectl api-resources, api-versions and explain",
  "objectives": [
   "Students will be able to read an apiVersion as a group and version and explain the alpha, beta and stable stages.",
   "Students will be able to use kubectl api-resources and api-versions to find the versions a cluster serves.",
   "Students will be able to use kubectl explain with dotted paths and --recursive to find correct field structure.",
   "Students will be able to fix a manifest that fails with 'no matches for kind' and validate it with a server-side dry run."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about outdated forms or software. Write 'deprecated' and 'removed' on the whiteboard and ask for the difference."
   ],
   [
    12,
    "Teach",
    "Break apiVersion into group and version on the whiteboard with examples (v1, apps/v1, batch/v1, networking.k8s.io/v1). Project sample output of api-resources, api-versions and explain, and model the four-step fix routine."
   ],
   [
    18,
    "Activity",
    "Run the error-message detective activity in pairs with printed broken manifests and command output."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on upgrade planning."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Think of a form, app or file format you used that suddenly stopped being accepted. How did you find out what replaced it?",
  "activity": {
   "title": "Error-message detective",
   "materials": "Printed cards, each with an old manifest excerpt and the error it produced, plus a printed 'cluster output' sheet with excerpts of kubectl api-resources, api-versions and explain; pens; the projector for answers.",
   "steps": [
    "Give each pair three case cards, such as an Ingress in extensions/v1beta1, a CronJob in batch/v1beta1 and a PodDisruptionBudget in policy/v1beta1.",
    "For each case, pairs use the cluster output sheet to find the served version, writing down which command and which line gave them the answer.",
    "Pairs write the exact kubectl explain command they would use to check whether the field structure changed for that kind.",
    "Pairs write the final validation command for each fixed file and explain why a server-side dry run is better than a client-side one.",
    "The teacher projects the answers, and pairs mark their cards and note any case where they chose the wrong command."
   ]
  },
  "discussion": [
   "Why might a team keep using a deprecated API version even after seeing warnings, and how could a team make sure warnings are acted on?",
   "Why is the cluster itself a better source of truth for API versions than a blog post or an old tutorial?"
  ],
  "exit": [
   [
    "Which command shows the API version and short name for CronJob on your cluster?",
    "`kubectl api-resources | grep -i cronjob`."
   ],
   [
    "A manifest fails with no matches for kind Ingress in version extensions/v1beta1. What does this mean?",
    "That group/version was removed; Ingress still exists under a newer version, networking.k8s.io/v1."
   ],
   [
    "Which command validates a fixed manifest against the live API server without creating anything?",
    "`kubectl apply --dry-run=server -f <file>`."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card that labels each part of an apiVersion and shows one example line of api-resources output with each column named, and let students work the first case with the teacher.",
   "Extend: Ask fast finishers to explain the difference between a deprecated and a removed version, then write a one-line shell command that scans a folder of manifests for apiVersion lines containing beta and lists the files."
  ]
 },
 {
  "t": "Updating manifests to supported API groups (networking.k8s.io/v1 Ingress, batch/v1 CronJob, autoscaling/v2 HPA)",
  "objectives": [
   "Students will be able to state the stable API versions for Ingress, CronJob and HorizontalPodAutoscaler.",
   "Students will be able to rewrite an old Ingress backend into the networking.k8s.io/v1 format with pathType and ingressClassName.",
   "Students will be able to express a resource-based autoscaling target in the autoscaling/v2 metrics format.",
   "Students will be able to generate current-version YAML with kubectl and validate it with a server-side dry run."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show an old Ingress snippet on the projector and ask students to guess which lines would break after an upgrade."
   ],
   [
    13,
    "Teach",
    "Compare old and new Ingress side by side on the whiteboard, drawing arrows from serviceName and servicePort to the nested service object. Do the same for the HPA target. Show that the CronJob comparison has only one changed line."
   ],
   [
    17,
    "Activity",
    "Run the manifest makeover in pairs with printed old manifests."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about generating versus hand-editing YAML."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here is an Ingress written years ago. Without looking anything up, which lines do you think would fail on a current cluster, and why?",
  "activity": {
   "title": "Manifest makeover",
   "materials": "Printed old manifests (an extensions/v1beta1 Ingress with an ingress.class annotation, a batch/v1beta1 CronJob and an autoscaling/v2beta1 HPA), colored pens, and student laptops with a browser for viewing the Kubernetes documentation if allowed.",
   "steps": [
    "Pairs mark each old manifest with colored pens: red for lines that must change, green for lines that stay the same.",
    "Pairs rewrite each manifest by hand in its current version, using the projected kubectl explain excerpts as the only reference.",
    "Pairs write the kubectl create or kubectl autoscale command that would generate a starting point for each file.",
    "Pairs swap rewrites with another pair, who checks pathType, the nested backend, ingressClassName and the HPA target structure against a printed checklist.",
    "The class reviews the CronJob together and confirms that the apiVersion line was the only required change."
   ]
  },
  "discussion": [
   "Is it safer to generate a fresh manifest with kubectl and copy settings into it, or to edit the old file? What can go wrong with each approach?",
   "Why might Kubernetes have chosen to make pathType required rather than keeping a default?"
  ],
  "exit": [
   [
    "Rewrite this old backend for networking.k8s.io/v1: serviceName: web, servicePort: 80.",
    "backend: service: name: web, port: number: 80."
   ],
   [
    "Which of Ingress, CronJob and HPA usually needs only an apiVersion change, and to what?",
    "CronJob, changed to batch/v1."
   ],
   [
    "Write the metrics entry for an autoscaling/v2 HPA targeting 60 percent average CPU utilization.",
    "type: Resource, resource: name: cpu, target: type: Utilization, averageUtilization: 60."
   ]
  ],
  "differentiation": [
   "Support: Provide a side-by-side template with the new structure already laid out and blanks for values, so students focus on mapping old values into new places.",
   "Extend: Ask fast finishers to add a second Ingress path using pathType Exact to a different Service and a memory metric to the HPA, and to explain how Prefix and Exact would treat a request for /api/v2."
  ]
 },
 {
  "t": "Liveness, readiness and startup probes; httpGet, tcpSocket, exec and grpc handlers; timing fields",
  "objectives": [
   "Students will be able to explain the question each of the liveness, readiness and startup probes answers.",
   "Students will be able to choose an appropriate handler (httpGet, tcpSocket, exec or grpc) for a given application.",
   "Students will be able to configure probe timing fields and calculate a startup probe's time budget.",
   "Students will be able to read probe configuration and failures in kubectl describe output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for 'how do you know someone is OK' on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Write the three probe questions on the whiteboard. Project the sample YAML and annotate each handler and timing field. Work two budget calculations aloud (period times failureThreshold)."
   ],
   [
    17,
    "Activity",
    "Run the probe design clinic in small groups with printed application profiles."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on choosing handlers and timing tradeoffs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you were checking on a friend who just had surgery, what different questions would you ask in the first hour versus the next day, and what would you do if the answer was bad?",
  "activity": {
   "title": "Probe design clinic",
   "materials": "Printed application profile cards (a slow Java web app, a TCP-only cache, a gRPC service, a minimal image with no shell, a batch worker with a status file), a printed probe worksheet, and the whiteboard.",
   "steps": [
    "Each group of three draws two application profile cards describing start-up time, protocols and what the team wants detected.",
    "Groups write the probe section of the container spec for each profile, choosing handlers and timing fields, and calculate the startup budget and liveness detection time.",
    "Groups trade worksheets with another group, who must find one weakness, such as an exec probe on a minimal image or an oversized initialDelaySeconds.",
    "The teacher projects a sample kubectl describe pod excerpt with probe lines and events. Groups identify which probe is configured how and what the events mean.",
    "Groups present one design and the critique it received."
   ]
  },
  "discussion": [
   "What should a /healthz endpoint actually check, and what should it avoid checking?",
   "What is the tradeoff between a short and a long periodSeconds for a liveness probe?"
  ],
  "exit": [
   [
    "Which probe holds off the others until the application has started?",
    "The startup probe."
   ],
   [
    "A startup probe has periodSeconds 10 and failureThreshold 18. How long may the app take to start?",
    "About 180 seconds."
   ],
   [
    "Which handler would you use for a service that only accepts raw TCP connections on port 5432?",
    "tcpSocket on port 5432."
   ]
  ],
  "differentiation": [
   "Support: Give students a fill-in probe template with handler choices listed and a small table of default timing values, and work the first profile together.",
   "Extend: Ask fast finishers to design probes for a container that serves HTTP on a named port, using the port name instead of the number, and to explain why successThreshold may be higher than 1 only on readiness probes."
  ]
 },
 {
  "t": "What each probe failure does: restart the container vs remove the Pod from Service endpoints",
  "objectives": [
   "Students will be able to state the consequence of a liveness, readiness and startup probe failure.",
   "Students will be able to diagnose which probe is failing from kubectl get pods, events and EndpointSlice output.",
   "Students will be able to explain how readiness protects users during a rolling update.",
   "Students will be able to justify placing dependency checks in readiness rather than liveness."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up scenario and take a quick hand vote on 'restart' versus 'stop sending traffic'."
   ],
   [
    12,
    "Teach",
    "Draw the outcome table on the whiteboard with three rows. Walk through events and kubectl get pods output for each failure. Tell the database failover story and ask where the dependency check belonged."
   ],
   [
    18,
    "Activity",
    "Run the symptom sort in pairs with printed output cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect probe design to outages."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your app's database goes offline for one minute. Would you rather Kubernetes restart all your app containers or stop sending them traffic for that minute? Why?",
  "activity": {
   "title": "Symptom sort",
   "materials": "Printed symptom cards, each showing a short kubectl get pods line, an events excerpt or an EndpointSlice listing; three labeled columns on the whiteboard (liveness, readiness, startup); tape or sticky notes.",
   "steps": [
    "Give each pair a set of eight to ten symptom cards, such as 'Running 0/1, 0 restarts', 'CrashLoopBackOff with liveness events', and 'restarts only during the first two minutes after deploy'.",
    "Pairs sort each card under the probe they believe is failing and write one sentence of evidence on the back.",
    "Pairs then pick two cards and write the configuration change that would fix the problem, such as moving a dependency check to readiness or adding a startup probe.",
    "Pairs place their cards on the whiteboard columns, and the teacher reviews any card that appears in more than one column.",
    "The class agrees on one diagnostic command for each column, such as kubectl get endpointslices for readiness."
   ]
  },
  "discussion": [
   "Why might restarting a container make an outage worse rather than better?",
   "Should every application have a readiness probe? What risks come from leaving it out?"
  ],
  "exit": [
   [
    "What happens when a readiness probe fails?",
    "The Pod is marked not ready and removed from Service endpoints; the container is not restarted."
   ],
   [
    "Pods show a climbing RESTARTS count and CrashLoopBackOff. Which probes could be responsible?",
    "The liveness probe or the startup probe, since both restart the container on failure."
   ],
   [
    "Where should a check of a shared database go, and why?",
    "In the readiness probe, so Pods leave rotation without restarting during a database outage."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-line rule card ('liveness restarts, readiness reroutes, startup restarts if start takes too long') and sort the first three symptom cards together as a group.",
   "Extend: Ask fast finishers to design probes for an API that depends on a database and a cache, explaining which checks go in liveness and readiness and how thresholds should differ between them."
  ]
 },
 {
  "t": "Kubectl get, describe, get events, top pod/node (metrics-server) for monitoring",
  "objectives": [
   "Students will be able to choose between kubectl get, describe, get events and top for a given monitoring question.",
   "Students will be able to filter and sort output with labels, field selectors and --sort-by.",
   "Students will be able to explain the dependency of kubectl top on metrics-server and interpret millicores and mebibytes.",
   "Students will be able to complete a scripted task such as writing the highest-CPU Pod name to a file."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the restaurant and collect answers. Write 'what, why, when, how much' on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Map each question to a command. Project sample output from each command and point at the columns and sections that matter most: STATUS and RESTARTS, Last State and Events, event types, and top's units."
   ],
   [
    18,
    "Activity",
    "Run the triage relay with printed command output cards and ticket cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on limits of each tool."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a restaurant manager wanted to know which tables are full, why one order is late, what happened in the last hour, and how much power each oven is using, would they ask the same person each time?",
  "activity": {
   "title": "Triage relay",
   "materials": "Printed ticket cards with short user complaints, printed output cards for kubectl get, describe, get events and top that match the tickets, the whiteboard, and markers.",
   "steps": [
    "Groups of three or four receive a ticket card, such as 'recommendations Pod missing' or 'search is slow', and a face-down stack of output cards.",
    "Before turning any output card over, the group must name the command they want and say what question it answers. The teacher hands them the matching output card only if the command fits.",
    "Groups continue until they can write the cause of the problem and the evidence line that proves it.",
    "For a 'slow' ticket, groups write the exact one-line command that writes the top CPU Pod's name to a file, including --no-headers.",
    "Each group presents its path through the commands on the whiteboard, and the class discusses which group reached the answer with the fewest steps."
   ]
  },
  "discussion": [
   "Events expire and top shows only the present. What kinds of questions can these commands not answer, and what would a team need to answer them?",
   "Why is describe often more useful than get -o yaml when troubleshooting, even though yaml shows more raw data?"
  ],
  "exit": [
   [
    "Which command would you use to find why a Pod is Pending?",
    "`kubectl describe pod <name>`, reading the Events section."
   ],
   [
    "kubectl top pod returns an error saying metrics are not available. What is the likely cause?",
    "metrics-server is not installed or not ready, so the Metrics API is unavailable."
   ],
   [
    "Write a command that lists warning events in the current namespace in time order.",
    "`kubectl get events --field-selector type=Warning --sort-by=.metadata.creationTimestamp`."
   ]
  ],
  "differentiation": [
   "Support: Give students a four-box card mapping 'what, why, when, how much' to get, describe, events and top, with one example command in each box, and let them complete the first ticket with the teacher.",
   "Extend: Ask fast finishers to write commands that find the node with the highest memory use, list all Pods on that node, and show the warning events for the Pod with the most restarts, then explain each pipe."
  ]
 },
 {
  "t": "Container logs: kubectl logs with -c, -f, --previous, --tail, --since, -l and deploy/<name>",
  "objectives": [
   "Students will be able to explain where `kubectl logs` output comes from and why apps should log to stdout and stderr.",
   "Students will be able to select the correct flags (-c, -f, --previous, --tail, --since) to retrieve specific log output from a Pod.",
   "Students will be able to compare `kubectl logs deploy/<name>` with `kubectl logs -l <selector>` and choose the right one for a multi-replica workload.",
   "Students will be able to save the log output that explains a crash to a file, as an exam task would require."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question and take three or four answers. Write the key idea on the board: logs come from stdout and stderr, captured on the node."
   ],
   [
    12,
    "Teach",
    "Walk through each flag with a short example on the projector: -c for multi-container Pods, --tail and --since for narrowing, -f for streaming, --previous for crashes, deploy/<name> versus -l. Stress that --previous is the first move for CrashLoopBackOff."
   ],
   [
    18,
    "Activity",
    "Run the \"Which command?\" card match in pairs. Circulate and ask each pair to justify one choice aloud, especially the deploy/<name> versus -l cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect logs to the wider troubleshooting flow of get, describe, logs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "Your app crashed and restarted thirty seconds ago. You run `kubectl logs` and see only a start-up message. Where do you think the crash message went, and how might you get it back?",
  "activity": {
   "title": "Which command? Log scenario card match",
   "materials": "Printed scenario cards and command cards (the teacher writes 8 of each), a whiteboard, and optionally student laptops with a browser to check flags in the kubectl reference.",
   "steps": [
    "Before class, write 8 scenario cards (for example: \"two-container Pod, need the proxy's logs\", \"CrashLoopBackOff, need the crash reason\", \"last 20 lines only\", \"all replicas of a Deployment, labeled\", \"init container failing\", \"stream live\", \"save last hour to a file\") and 8 matching command cards.",
    "In pairs, students shuffle both decks and match each scenario to the command that answers it, writing any missing flags on the command card.",
    "Each pair then swaps two cards with a neighboring pair and checks their matches, marking disagreements.",
    "The class reviews disagreements on the whiteboard, with the teacher explaining the deciding flag each time.",
    "As a final round, each pair writes one new scenario card of their own and challenges another pair to write the command."
   ]
  },
  "discussion": [
   "Why does Kubernetes expect containers to log to stdout and stderr rather than to files?",
   "If `kubectl logs` only keeps one previous instance, what does that mean for an app that has restarted 40 times since the first error?",
   "When would you choose a central logging system over `kubectl logs`, and what does that imply for how logs are collected on each node?"
  ],
  "exit": [
   [
    "A Pod has containers `web` and `sidecar`. How do you stream the sidecar's logs live?",
    "`kubectl logs <pod> -c sidecar -f`."
   ],
   [
    "A container is in CrashLoopBackOff. Which flag shows the error from the crash?",
    "`--previous` (or `-p`), which shows the last terminated instance."
   ],
   [
    "Why might `kubectl logs deploy/api` miss the error you are looking for?",
    "It shows only one Pod of the Deployment; the failing replica may be a different Pod. Use `-l` with the Deployment's labels."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page flag sheet with each flag, a plain-language meaning and one example, and let them use it during the card match.",
   "Extend: Ask fast finishers to write a single command that shows the last 10 minutes of logs from all containers in every Pod labeled `tier=backend`, with timestamps and Pod prefixes, and to explain what `--max-log-requests` limits."
  ]
 },
 {
  "t": "Reading Pod status: Pending, ImagePullBackOff, CrashLoopBackOff, OOMKilled, Completed, exit codes",
  "objectives": [
   "Students will be able to interpret the Pending, ImagePullBackOff, CrashLoopBackOff, OOMKilled and Completed statuses and name a likely cause for each.",
   "Students will be able to decode common exit codes (0, 1, 126, 127, 137, 143) and explain the 128 plus signal rule.",
   "Students will be able to choose the next diagnostic command (describe, logs --previous, or a resource check) for a given status.",
   "Students will be able to extract an exit code with jsonpath for an exam-style task."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a projected `kubectl get pods` listing with five different statuses and ask students to guess which ones are platform problems and which are application problems."
   ],
   [
    12,
    "Teach",
    "Go status by status, writing a two-column table on the whiteboard: status and next command. Then teach exit codes, deriving 137 and 143 from 128 plus the signal number."
   ],
   [
    18,
    "Activity",
    "Run the Pod triage desk role-play. Groups receive incident cards and must name the status meaning, the next command and the likely fix."
   ],
   [
    5,
    "Discuss",
    "Discuss which statuses can lead to CrashLoopBackOff and why exit code alone is not enough."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "Your Pod's status says Completed, but it is supposed to be a web server that runs all day. Is that good news or bad news, and why?",
  "activity": {
   "title": "Pod triage desk",
   "materials": "Printed incident cards prepared by the teacher (each with a short `kubectl get pods` line and a `describe` excerpt showing events or Last State), sticky notes, and a whiteboard.",
   "steps": [
    "Before class, write 8 incident cards, each with a status line and a short describe excerpt, for example exit code 127, 'manifest unknown', 'Insufficient memory', OOMKilled with 137, and a Deployment Pod showing Completed.",
    "Form groups of three: one \"on-call engineer\" reads the card aloud, one \"investigator\" names the next command, and one \"fixer\" proposes the fix. Rotate roles every card.",
    "Each group writes its diagnosis on a sticky note and places it on the whiteboard under the matching status column.",
    "The teacher reviews each column, correcting any notes where the next command or fix is wrong and asking the group to explain its reasoning.",
    "Close with a speed round: the teacher calls an exit code and groups shout the meaning."
   ]
  },
  "discussion": [
   "Why does Kubernetes back off between retries instead of retrying immediately, for both image pulls and crashing containers?",
   "Exit code 137 can come from two different situations. How would you tell them apart?",
   "Which of today's statuses would you expect to see during a normal rolling update, and which would worry you?"
  ],
  "exit": [
   [
    "A Pod is Pending and describe shows 'Insufficient memory'. What is the problem?",
    "No node has enough unreserved memory to satisfy the Pod's memory request, so it cannot be scheduled."
   ],
   [
    "What does exit code 143 mean?",
    "The process was stopped by SIGTERM (128 + 15), usually a normal graceful shutdown."
   ],
   [
    "A container is in CrashLoopBackOff. Which command shows the crash output?",
    "`kubectl logs <pod> --previous` (with `-c` if there are several containers)."
   ]
  ],
  "differentiation": [
   "Support: Provide a laminated decision map that links each status to its likely cause and next command, and let struggling students use it during the triage role-play before trying a card without it.",
   "Extend: Ask fast finishers to write the jsonpath that prints the restart count and last termination reason for every container in a Pod, and to explain how Init:CrashLoopBackOff differs from CrashLoopBackOff."
  ]
 },
 {
  "t": "Debugging: kubectl exec, kubectl debug (ephemeral containers and Pod copies), port-forward, temporary busybox Pods",
  "objectives": [
   "Students will be able to explain the purpose and limits of kubectl exec, kubectl debug, kubectl port-forward and temporary Pods.",
   "Students will be able to choose the correct debugging tool for a given troubleshooting question.",
   "Students will be able to write the commands to start an ephemeral debug container, a Pod copy, a port-forward and a self-deleting test Pod.",
   "Students will be able to compare testing from inside the cluster with testing from a workstation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas on the board. Steer toward the idea that where you test from changes what you learn."
   ],
   [
    12,
    "Teach",
    "Present the four tools with the command block on the projector. For each, state the question it answers and one limitation: exec needs tools, debug ephemeral containers cannot be removed, port-forward reaches one Pod, temporary Pods see cluster DNS."
   ],
   [
    18,
    "Activity",
    "Run \"Pick your tool\" pair troubleshooting with scenario cards. Pairs write the exact command and justify the choice."
   ],
   [
    5,
    "Discuss",
    "Discuss which tools change the cluster and which do not, and the security implications of exec and debug permissions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a slip of paper."
   ]
  ],
  "warmup": "If a website works when you open it on your own laptop but another server says it cannot reach it, what does that tell you about where you should test from?",
  "activity": {
   "title": "Pick your tool: pair troubleshooting",
   "materials": "Printed scenario cards made by the teacher, a projector showing the command block from the lesson, whiteboard, and student laptops with a browser to look up kubectl debug options in the official documentation if desired.",
   "steps": [
    "Before class, prepare 8 scenario cards such as \"distroless image, need to check localhost:8080\", \"Pod crashes instantly, want to open a shell in the same image\", \"check DNS for Service db\", \"test app from laptop without a Service\", \"read an environment variable in a running container\", \"prove a NetworkPolicy blocks unlabeled Pods\".",
    "Pairs draw a card, decide which of the four tools fits, and write the full command on the back of the card, including flags like --target, --copy-to, --rm and -T.",
    "Pairs swap cards with another pair, who must spot any missing flag or wrong tool and annotate it.",
    "The teacher calls up three pairs to write their commands on the whiteboard and the class critiques them, focusing on the order of ports in port-forward and the use of --.",
    "Finish by asking each pair to list one cleanup step their command needs, such as deleting a copy Pod."
   ]
  },
  "discussion": [
   "Should every developer have permission to use kubectl exec in production? What risks and benefits do you see?",
   "Why do you think ephemeral containers were designed so they cannot be removed or restarted?",
   "When would port-forward give you a misleading \"it works\" result?"
  ],
  "exit": [
   [
    "Which tool lets you inspect a running distroless container without restarting it?",
    "`kubectl debug` with an ephemeral container, for example `kubectl debug -it <pod> --image=busybox --target=<container>`."
   ],
   [
    "Write a command that runs a one-off busybox Pod to fetch the home page of Service `web` and deletes itself afterward.",
    "`kubectl run tmp --image=busybox --rm -it --restart=Never -- wget -qO- web`."
   ],
   [
    "In `kubectl port-forward pod/api 9000:8080`, which port is on your machine?",
    "9000 is local; 8080 is the container port in the Pod."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart (inside the container, tools missing or crashing, from my laptop, as another Pod) with the matching command template on each branch, and pair them with a confident partner for the first two cards.",
   "Extend: Ask fast finishers to explain what process namespace sharing with --target lets them see, and to design a test plan that uses three of the four tools to locate a fault between an Ingress, a Service and a Pod."
  ]
 },
 {
  "t": "Output tricks for fast troubleshooting: -o wide, -o yaml, jsonpath, --show-labels, --sort-by",
  "objectives": [
   "Students will be able to choose between -o wide, -o yaml, jsonpath, custom-columns and --sort-by for a given information request.",
   "Students will be able to write jsonpath expressions for single objects and for lists, including range for one item per line.",
   "Students will be able to explain why list jsonpath starts at .items while sort-by paths are relative to each item.",
   "Students will be able to produce exam-ready output files and verify them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a full `kubectl get pod -o yaml` excerpt and ask students to find the Pod IP and image by eye while you time them. Then show the one-line jsonpath."
   ],
   [
    12,
    "Teach",
    "Walk through -o wide, labels columns, -o yaml, jsonpath (single object, then list with .items, then range), sort-by and custom-columns, using the command block on the projector."
   ],
   [
    18,
    "Activity",
    "Run the \"Path finder\" exercise: pairs get a printed YAML object and write paths and commands for a list of requested fields."
   ],
   [
    5,
    "Discuss",
    "Discuss the .items versus per-item rule and the habit of verifying files with cat."
   ],
   [
    5,
    "Exit ticket",
    "Students write the three exit answers on sticky notes."
   ]
  ],
  "warmup": "If you had to copy a single value out of a 200-line document a dozen times in an hour, what tool or trick would you want? How might that apply to kubectl output?",
  "activity": {
   "title": "Path finder: writing jsonpath from YAML",
   "materials": "Printed copies of a Pod YAML and a short Pod List YAML (two items) prepared by the teacher, highlighters, a projector, and student laptops with a browser for anyone who wants to try an online JSONPath evaluator with the JSON version.",
   "steps": [
    "Hand each pair the printed Pod YAML and Pod List YAML and a list of 8 requested outputs, such as Pod IP, node name, image of the second container, all Pod names on one line, names one per line, and names sorted by creation time.",
    "Pairs highlight the path to each field on the printout, then write the full kubectl command, noting whether the source is a single object or a list.",
    "Pairs mark each command with S for single-object path, L for list path starting at .items, or R for relative per-item path (sort-by or custom-columns).",
    "The teacher reveals answers on the projector one at a time; pairs score themselves and correct mistakes in a different color.",
    "Each pair writes one tricky request for another pair, such as the Ready condition status using a filter, and swaps."
   ]
  },
  "discussion": [
   "Why does kubectl wrap a list of objects inside an `items` field, and how does that shape your expressions?",
   "When is custom-columns a better choice than jsonpath, and when is jsonpath better?",
   "What checks would you do on an output file before moving on to the next exam question?"
  ],
  "exit": [
   [
    "Write a command that prints only the IP of Pod `db`.",
    "`kubectl get pod db -o jsonpath='{.status.podIP}'`."
   ],
   [
    "Why does `kubectl get pods -o jsonpath='{.metadata.name}'` print nothing useful?",
    "The result is a List; names are under `.items[*].metadata.name`."
   ],
   [
    "How do you list Pods oldest first?",
    "`kubectl get pods --sort-by=.metadata.creationTimestamp`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a path cheat card that shows the top-level structure of a Pod (metadata, spec, status) and of a List (items), and let them trace paths with a finger on the printout before writing commands.",
   "Extend: Ask fast finishers to write a jsonpath with a filter that prints the status of the Ready condition for every Pod, one per line with the Pod name, and to reproduce the same view with custom-columns."
  ]
 },
 {
  "t": "Extending Kubernetes: CustomResourceDefinitions, custom resources and Operators; discovering them with kubectl get crd and api-resources",
  "objectives": [
   "Students will be able to explain the roles of a CRD, a custom resource, a controller and an Operator.",
   "Students will be able to read a CRD manifest and identify its group, versions, scope and names, and write a matching custom resource.",
   "Students will be able to discover installed extensions with kubectl get crd, api-resources and explain.",
   "Students will be able to diagnose a 'no matches for kind' error and describe the risk of deleting a CRD."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about phone apps and installers, then ask: if Kubernetes had no Backup type, how could a team add one?"
   ],
   [
    12,
    "Teach",
    "Project the CRD and custom resource YAML side by side. Draw arrows on the board from the CRD's group, version and kind to the custom resource's apiVersion and kind. Then explain controllers and Operators as a reconcile loop."
   ],
   [
    18,
    "Activity",
    "Run the \"Design a CRD\" whiteboard exercise in small groups, followed by a peer review."
   ],
   [
    5,
    "Discuss",
    "Discuss why Operators are useful for stateful applications and the risk of CRD deletion."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your phone came with a camera app, but you installed a separate app for scanning documents. What did installing it add to the phone, and what actually does the scanning?",
  "activity": {
   "title": "Design a CRD on the whiteboard",
   "materials": "Whiteboard or large paper and markers for each group, printed copies of the lesson's CRD manifest as a model, and a projector.",
   "steps": [
    "Assign each group a made-up application need, such as \"website uptime checks\", \"nightly report jobs\" or \"feature flags\", and give them the printed model CRD.",
    "Groups write a CRD for their type on the whiteboard, choosing a group, a plural, singular, kind and short name, a scope, and two schema fields with types, and check that the metadata name is plural.group.",
    "Groups then write one custom resource of their type underneath, with the correct apiVersion and kind.",
    "Groups rotate to another group's board and act as the API server: they mark any mismatch between CRD and resource, any wrong name format, or a field value that breaks the schema.",
    "Each group finishes by describing in two sentences what a controller for their type would watch and do."
   ]
  },
  "discussion": [
   "Why would a team rather write an Operator than a long runbook for operating a database?",
   "Who in an organization should be allowed to create or delete CRDs, and why?",
   "How is the controller for a custom resource similar to the Deployment controller you already know?"
  ],
  "exit": [
   [
    "What is the required metadata name for a CRD with plural `reports` in group `acme.io`?",
    "`reports.acme.io`."
   ],
   [
    "What apiVersion does a `Report` custom resource use if the CRD serves version v1?",
    "`acme.io/v1`."
   ],
   [
    "Which command shows a custom resource's short names and whether it is namespaced?",
    "`kubectl api-resources` (optionally with `--api-group=acme.io`)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a fill-in-the-blanks CRD template with the group, names and version lines highlighted, and a matching custom resource template, so they can focus on how the pieces link.",
   "Extend: Ask fast finishers to explain the purpose of the served and storage flags when a CRD has two versions, and to describe what a controller should do when a custom resource is deleted."
  ]
 },
 {
  "t": "Request flow: authentication, authorization (RBAC) and admission control (mutating and validating)",
  "objectives": [
   "Students will be able to list the stages of an API request in order: authentication, authorization, mutating admission, schema validation, validating admission, persistence.",
   "Students will be able to classify an error message by the stage that produced it (401, 403 RBAC, quota, Pod Security).",
   "Students will be able to explain why mutating admission runs before validating admission and give examples of each.",
   "Students will be able to locate admission rejections for Deployment Pods in ReplicaSet events."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about entering an office building and list the checks students name on the board."
   ],
   [
    12,
    "Teach",
    "Draw the request pipeline as six boxes on the whiteboard. For each box, give the question it answers, an example component and the error it produces. Explain why mutating comes before validating."
   ],
   [
    18,
    "Activity",
    "Run the \"Which gate stopped me?\" error sort. Groups place error message cards on a large drawing of the pipeline and propose the fix."
   ],
   [
    5,
    "Discuss",
    "Discuss the Deployment-ReplicaSet trap and why there is no User object."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "When you enter a secure office building, what checks happen between the front door and your desk? Which ones care who you are, and which care what you are carrying?",
  "activity": {
   "title": "Which gate stopped me? Error message sort",
   "materials": "A large drawing of the six-stage pipeline on the whiteboard or on chart paper, printed error message cards prepared by the teacher, tape or magnets, and sticky notes.",
   "steps": [
    "Before class, write 10 error or symptom cards, for example '401 Unauthorized', 'cannot create resource \"deployments\" in API group \"apps\"', 'exceeded quota: compute', 'violates PodSecurity \"restricted:latest\"', 'Pod has a sidecar nobody wrote', 'default limits appeared on a Pod'.",
    "Groups of three take turns drawing a card, reading it aloud and taping it under the pipeline stage that produced it.",
    "For each card, the group writes the fix on a sticky note next to it, such as \"fix kubeconfig\", \"add Role and RoleBinding\", \"lower requests or raise quota\", \"set runAsNonRoot\".",
    "The teacher walks the pipeline left to right, confirming or moving cards and asking the class to explain any moved card.",
    "As a final challenge, the teacher reads a Deployment with zero Pods scenario and groups must say which command to run first."
   ]
  },
  "discussion": [
   "Why might Kubernetes deliberately avoid having a User object and instead trust external identity systems?",
   "What are the benefits and risks of mutating webhooks that change objects silently?",
   "How would you explain to a new teammate why their `kubectl apply` succeeded but nothing is running?"
  ],
  "exit": [
   [
    "Put these in order: validating admission, authentication, mutating admission, authorization.",
    "Authentication, authorization, mutating admission, validating admission."
   ],
   [
    "An error reads 'pods \"api-1\" is forbidden: exceeded quota'. Which stage produced it?",
    "Validating admission, specifically the ResourceQuota admission controller."
   ],
   [
    "Where do you look when a Deployment's Pods are rejected by admission?",
    "In the ReplicaSet's events, with `kubectl describe rs` or `kubectl get events`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pipeline card with each stage's question (who, allowed, adjust, accept) and its typical error printed underneath, to keep in front of them during the sort.",
   "Extend: Ask fast finishers to research and explain how a ValidatingAdmissionPolicy differs from a validating webhook, and to describe what information an RBAC authorizer receives about a request to `kubectl logs`."
  ]
 },
 {
  "t": "RBAC objects: Role, ClusterRole, RoleBinding, ClusterRoleBinding; kubectl auth can-i with --as",
  "objectives": [
   "Students will be able to explain the difference between Role, ClusterRole, RoleBinding and ClusterRoleBinding and when to use each.",
   "Students will be able to write correct RBAC rules, including the core group as an empty string and subresources such as pods/log.",
   "Students will be able to create roles and bindings imperatively, including ServiceAccount subjects in namespace:name form.",
   "Students will be able to verify permissions with kubectl auth can-i using --as impersonation and apply least privilege."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the cluster-admin shortcut and take a quick vote on whether it is acceptable. Record the reasons on the board."
   ],
   [
    12,
    "Teach",
    "Build the four objects on the whiteboard as a two-by-two grid (defines permissions versus grants them, namespaced versus cluster). Show the command block and explain apiGroups, subresources, roleRef immutability and auth can-i --as."
   ],
   [
    18,
    "Activity",
    "Run the \"Least privilege design\" whiteboard challenge in pairs, then swap and audit another pair's design."
   ],
   [
    5,
    "Discuss",
    "Discuss which permissions are more dangerous than they look and why RBAC has no deny rules."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A build robot needs to update one app in one test environment. Someone suggests giving it full administrator access because that is quick. What could go wrong, and what would you do instead?",
  "activity": {
   "title": "Least privilege design",
   "materials": "Printed requirement cards made by the teacher, whiteboard space or chart paper per pair, markers, and a printed list of common API groups (core as \"\", apps, batch, networking.k8s.io).",
   "steps": [
    "Give each pair a requirement card, for example \"CI account in staging updates Deployments\", \"developer reads Pod logs in dev\", \"monitoring account lists Pods in three namespaces\", \"on-call group lists nodes\".",
    "Pairs decide which objects they need (Role or ClusterRole, RoleBinding or ClusterRoleBinding) and write the imperative kubectl commands, including verbs, resources with correct group, and subjects.",
    "Pairs write two `kubectl auth can-i --as` checks: one that should return yes and one that should return no.",
    "Pairs swap boards with another pair, who audit for excess privilege, missing subresources, wrong ServiceAccount format or an unnecessary ClusterRoleBinding, and write comments.",
    "The teacher reviews two or three designs with the class, highlighting the reusable ClusterRole plus RoleBindings pattern."
   ]
  },
  "discussion": [
   "RBAC has no deny rules. What are the advantages and disadvantages of that design?",
   "Why might `create` on Pods be considered a sensitive permission even if a user cannot read Secrets directly?",
   "When, if ever, is a ClusterRoleBinding the right choice for an application's ServiceAccount?"
  ],
  "exit": [
   [
    "Which object grants a ClusterRole's permissions in just one namespace?",
    "A RoleBinding in that namespace that references the ClusterRole."
   ],
   [
    "Write the flag that adds ServiceAccount `deployer` from namespace `ci` as a subject.",
    "`--serviceaccount=ci:deployer`."
   ],
   [
    "How do you check if user `ana` can create Jobs in namespace `batch-jobs`?",
    "`kubectl auth can-i create jobs -n batch-jobs --as=ana`."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in RBAC worksheet with blanks for apiGroups, resources, verbs and subjects, plus an API group lookup table, and walk struggling students through the first requirement card together.",
   "Extend: Ask fast finishers to write a Role that allows get on only the ConfigMap named `app-config` using resourceNames, and to explain why `list` cannot be meaningfully restricted by resourceNames."
  ]
 },
 {
  "t": "Resource requests and limits for CPU and memory; units (m, Mi, Gi); QoS classes",
  "objectives": [
   "Students will be able to explain how requests affect scheduling and how limits are enforced differently for CPU and memory.",
   "Students will be able to write resource settings with correct units (m, Mi, Gi) in YAML and with kubectl set resources.",
   "Students will be able to determine a Pod's QoS class from its containers' requests and limits.",
   "Students will be able to diagnose Pending (insufficient resources) and OOMKilled situations and choose an appropriate fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up restaurant question and connect \"booking a table\" to requests and \"the maximum the kitchen will serve you\" to limits."
   ],
   [
    12,
    "Teach",
    "Show the YAML on the projector. Explain scheduling with requests, throttling versus OOM kill, units with the 128m trap, and the three QoS rules. Write the eviction order on the board."
   ],
   [
    18,
    "Activity",
    "Run the \"QoS card sort\": groups classify printed Pod specs into Guaranteed, Burstable or BestEffort and predict behavior under pressure."
   ],
   [
    5,
    "Discuss",
    "Discuss the trade-off between generous and tight limits, and why removing limits is not a safety measure."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "At a busy restaurant, what is the difference between booking a table for four and being told the kitchen will serve your table at most six dishes? How might a computer system use both ideas?",
  "activity": {
   "title": "QoS card sort and pressure test",
   "materials": "Printed Pod spec cards made by the teacher (resources sections only, one to three containers each), three labeled zones on the whiteboard (Guaranteed, Burstable, BestEffort), and sticky notes.",
   "steps": [
    "Before class, prepare 10 Pod spec cards with varied resources, including traps such as requests equal to limits for CPU only, one container missing resources, a limit with no request, and memory written as 128m.",
    "Groups sort the cards into the three QoS zones on the whiteboard and write the reason on a sticky note attached to each card.",
    "The teacher announces \"memory pressure on the node\" and groups must order all the cards by eviction priority.",
    "The teacher then announces \"container exceeds its CPU limit\" and \"container exceeds its memory limit\" for two specific cards, and groups state the outcome of each.",
    "Groups fix any card with a unit error and convert one Burstable card into a Guaranteed one."
   ]
  },
  "discussion": [
   "Why might a team deliberately choose Burstable rather than Guaranteed for most workloads?",
   "What are the costs of setting requests much higher than actual usage?",
   "How would you decide on a memory limit for a new service you have never run in production?"
  ],
  "exit": [
   [
    "What happens to a container that exceeds its memory limit?",
    "It is killed by the kernel and shows OOMKilled, usually with exit code 137, then restarted per its restart policy."
   ],
   [
    "A Pod has one container with requests and limits of cpu 1 and memory 1Gi, all equal. What QoS class is it?",
    "Guaranteed."
   ],
   [
    "What is wrong with `memory: 512m`?",
    "Lowercase m means milli, so it requests 0.512 bytes; it should be `512Mi`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-question QoS flowchart (any resources at all? every container has CPU and memory requests and limits? requests equal limits?) and a unit conversion card to use during the sort.",
   "Extend: Ask fast finishers to explain the difference between node-pressure eviction and an OOM kill, and to calculate whether three Pods with given requests fit on a node with stated allocatable capacity."
  ]
 },
 {
  "t": "Namespace ResourceQuota and LimitRange defaults",
  "objectives": [
   "Students will be able to distinguish ResourceQuota (namespace totals) from LimitRange (per-object defaults and bounds).",
   "Students will be able to write a ResourceQuota and a LimitRange, using default and defaultRequest correctly.",
   "Students will be able to diagnose 'exceeded quota' and 'must specify' errors by checking ReplicaSet events and kubectl describe quota.",
   "Students will be able to explain how a LimitRange and a ResourceQuota interact during admission."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the shared kitchen warm-up question and sort student answers into \"total budget\" rules and \"per-person\" rules on the board."
   ],
   [
    12,
    "Teach",
    "Show both YAML examples on the projector. Explain compute and count quotas, the 'must specify' side effect, where to find errors for Deployments, LimitRange fields with the default versus defaultRequest trap, and the mutating-then-validating order."
   ],
   [
    18,
    "Activity",
    "Run the \"Namespace budget office\" simulation: groups play admission control and approve or reject Pod request cards against a quota and LimitRange."
   ],
   [
    5,
    "Discuss",
    "Discuss what happens to existing Pods when policies change, and who should own these objects."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In a shared office kitchen, what rules would you set so one person cannot use all the food, and so people who forget to order still get lunch?",
  "activity": {
   "title": "Namespace budget office",
   "materials": "A whiteboard showing a sample ResourceQuota (with Used and Hard columns) and a sample LimitRange, printed Pod request cards prepared by the teacher, and markers for updating the Used column.",
   "steps": [
    "Write a quota on the whiteboard (for example requests.cpu 2, limits.memory 4Gi, pods 5) with a Used column starting at zero, and a LimitRange with defaultRequest, default and max values.",
    "In groups, one student plays the LimitRange (fills in missing values on each card), one plays the ResourceQuota (adds to Used or rejects), and one plays the ReplicaSet (submits cards and records any error message).",
    "Groups process a stack of 8 Pod cards, including ones with no resources, one above max, and ones that would overflow the quota, writing the exact error message for each rejection.",
    "Run a second round with the LimitRange removed and compare which cards are now rejected with 'must specify'.",
    "Groups report which round admitted more Pods and explain why in one sentence."
   ]
  },
  "discussion": [
   "Why does Kubernetes reject Pods that omit a quota-limited value instead of simply ignoring them?",
   "If you were an administrator, would you set default limits close to typical usage or with generous headroom? Why?",
   "How would a developer find out about a quota before deploying, rather than after?"
  ],
  "exit": [
   [
    "A namespace quota limits limits.memory, and a Pod without memory limits is rejected. What is the simplest namespace-level fix?",
    "Add a LimitRange with a `default` memory limit so Pods receive one automatically."
   ],
   [
    "What does `kubectl describe quota` show?",
    "Each quota resource with its Used and Hard values."
   ],
   [
    "In a LimitRange, which field sets the default request?",
    "`defaultRequest`."
   ]
  ],
  "differentiation": [
   "Support: Provide a side-by-side comparison card (quota: totals for the namespace; LimitRange: defaults and bounds per container) with the two YAML examples annotated, and let students refer to it during the simulation.",
   "Extend: Ask fast finishers to design a quota and LimitRange for a namespace with 8 CPU and 16Gi memory shared by up to 20 Pods, choosing defaults so that 20 default Pods fit, and to explain what maxLimitRequestRatio would add."
  ]
 },
 {
  "t": "ConfigMaps: create from literals, files and env files; consume as env, envFrom and volumes",
  "objectives": [
   "Students will be able to create ConfigMaps from literals, files and env files and predict the resulting keys.",
   "Students will be able to configure a Pod to consume a ConfigMap through env with configMapKeyRef, envFrom, and a configMap volume.",
   "Students will be able to explain how ConfigMap updates reach running Pods for each consumption method.",
   "Students will be able to troubleshoot missing ConfigMap references and namespace mistakes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the recipe card warm-up question and draw out the idea of keeping settings separate from the program."
   ],
   [
    12,
    "Teach",
    "Demonstrate the three create methods on the projector, showing the resulting keys for --from-file versus --from-env-file. Then walk through the Pod YAML for env, envFrom and volumes, and explain update behavior and subPath."
   ],
   [
    18,
    "Activity",
    "Run the \"Predict the keys\" pair exercise with printed files and commands, followed by a Pod wiring challenge."
   ],
   [
    5,
    "Discuss",
    "Discuss when to choose env versus volume, and why secrets do not belong in ConfigMaps."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you wanted to change how salty a restaurant's soup is without reprinting the whole menu or cookbook, where would you keep the salt amount? How might software do the same?",
  "activity": {
   "title": "Predict the keys and wire the Pod",
   "materials": "Printed sample files (an app.env with KEY=value lines, a default.conf, a small directory listing) and printed kubectl create commands prepared by the teacher, plus a whiteboard and optionally student laptops with a browser to view the ConfigMap documentation.",
   "steps": [
    "Give each pair a sheet with 6 create commands using --from-literal, --from-file with and without a custom key, --from-file on a directory, and --from-env-file, along with the sample files.",
    "Pairs write the YAML `data:` section each command would produce, showing exact key names and values.",
    "The teacher reveals the answers on the projector; pairs mark mistakes, paying special attention to --from-file versus --from-env-file.",
    "Pairs then receive a requirement card (\"one variable named LEVEL from key LOG_LEVEL, all keys from app-env with prefix CFG_, nginx config as files in /etc/nginx/conf.d\") and write the container and volume YAML on the whiteboard.",
    "Finish with a scenario: the ConfigMap is edited. Pairs state, for each of their three consumption methods, whether the running Pod sees the change and what to do if not."
   ]
  },
  "discussion": [
   "When would you prefer mounting configuration as files over environment variables?",
   "What are the benefits and drawbacks of marking ConfigMaps immutable in production?",
   "How would you design a change process so that a configuration change triggers a controlled rollout?"
  ],
  "exit": [
   [
    "What keys does `kubectl create configmap c --from-env-file=a.env` create if a.env has lines X=1 and Y=2?",
    "Two keys, X with value 1 and Y with value 2."
   ],
   [
    "Which Pod field imports every key of a ConfigMap as environment variables?",
    "`envFrom` with `configMapRef`."
   ],
   [
    "After editing a ConfigMap consumed as env, how do you make a Deployment pick up the change?",
    "Restart the Pods, for example `kubectl rollout restart deploy/<name>`."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed YAML skeleton with the three consumption patterns labeled and color-coded, and let struggling students fill in names and keys rather than writing from scratch.",
   "Extend: Ask fast finishers to mount only one key of a ConfigMap at a custom file name using `items`, to explain why a subPath mount does not update, and to describe how an immutable ConfigMap change would be rolled out."
  ]
 },
 {
  "t": "Secrets: generic, docker-registry and tls types; base64 encoding vs encryption; secretKeyRef and volume mounts",
  "objectives": [
   "Students will be able to create generic, docker-registry and tls Secrets and state what each is used for.",
   "Students will be able to explain the difference between base64 encoding and encryption, and name the layers that actually protect Secrets.",
   "Students will be able to configure Pods to consume Secrets via secretKeyRef, envFrom, secret volumes and imagePullSecrets.",
   "Students will be able to decode a Secret value for an exam task and troubleshoot missing Secret references."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write a base64 string on the board and ask the warm-up question. Reveal the decoded text to make the point that encoding is not protection."
   ],
   [
    12,
    "Teach",
    "Cover the three Secret types with the command block, base64 versus encryption, stringData and echo -n, the protection layers, and the four ways Pods consume Secrets. Highlight secretName and imagePullSecrets."
   ],
   [
    18,
    "Activity",
    "Run the \"Secret handling review\" in groups: students audit printed manifests and Pod specs for mistakes and risky practices."
   ],
   [
    5,
    "Discuss",
    "Discuss why Pod creation rights matter for Secret security and where Secret manifests should live."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Here is a string: `cGFzc3dvcmQ=`. Is it encrypted? What would you need to read it, and how long do you think it would take?",
  "activity": {
   "title": "Secret handling review",
   "materials": "Printed manifest excerpts prepared by the teacher (Secrets, Pod specs and a short RBAC Role), red and green pens, a whiteboard, and student laptops with a browser for an offline-capable base64 decoder or a terminal if available.",
   "steps": [
    "Give each group a packet of 6 excerpts containing planted issues: a Secret committed with real-looking values in data, a volume using `name:` instead of `secretName:`, a value encoded with a trailing newline, registry credentials referenced with secretKeyRef, a Role granting list on secrets to a broad group, and a Pod referencing a Secret in another namespace.",
    "Groups mark each issue in red, explain the risk or failure in one sentence, and write the corrected version in green.",
    "Groups decode one provided base64 value to confirm it is readable, discussing what that means for the committed file.",
    "Each group presents one finding to the class while the teacher records the fixes on the whiteboard under \"breaks the Pod\" and \"weakens security\".",
    "Close by asking groups to rank the security issues from most to least serious and justify the top choice."
   ]
  },
  "discussion": [
   "If base64 is not protection, why do you think Kubernetes encodes Secret values at all?",
   "Who in your organization should be able to read Secrets in production, and how would RBAC enforce that?",
   "What are the trade-offs between environment variables and mounted files for credentials?"
  ],
  "exit": [
   [
    "Write a command that prints the decoded value of key `token` in Secret `api`.",
    "`kubectl get secret api -o jsonpath='{.data.token}' | base64 -d`."
   ],
   [
    "Which Pod field lets the kubelet use a docker-registry Secret?",
    "`spec.imagePullSecrets`."
   ],
   [
    "Name two things that actually protect Secrets in a cluster.",
    "RBAC restricting who can read them and encryption at rest configured by the administrator (also keeping manifests out of source control)."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card showing the three create commands, the four consumption snippets with secretName and imagePullSecrets highlighted, and a one-line definition of base64 versus encryption.",
   "Extend: Ask fast finishers to explain why create permission on Pods effectively grants read access to Secrets in a namespace, and to propose a combination of RBAC and process controls that limits that risk."
  ]
 },
 {
  "t": "ServiceAccounts: serviceAccountName, token projection, automountServiceAccountToken, kubectl create token",
  "objectives": [
   "Students will be able to explain what a ServiceAccount is and how Pods receive and use its token.",
   "Students will be able to create a ServiceAccount, assign it to a Pod or Deployment, and grant it permissions with RBAC.",
   "Students will be able to disable token automounting at the ServiceAccount or Pod level and predict which setting wins.",
   "Students will be able to issue short-lived tokens with kubectl create token and verify an account's access with kubectl auth can-i."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about staff badges for robots and list on the board what a badge should and should not allow."
   ],
   [
    12,
    "Teach",
    "Explain ServiceAccounts, the default account, serviceAccountName, the projected token files, bound token properties, automount precedence and kubectl create token, using the YAML on the projector."
   ],
   [
    18,
    "Activity",
    "Run the \"Identity audit\" exercise: groups review a table of workloads and design ServiceAccount, RBAC and automount settings for each."
   ],
   [
    5,
    "Discuss",
    "Discuss why long-lived tokens were phased out and what a leaked token allows."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a company issued security badges to its robots as well as its people, which robots should get a badge, what doors should it open, and how long should it last?",
  "activity": {
   "title": "Identity audit: who needs a token?",
   "materials": "A printed workload table prepared by the teacher (app name, namespace, what it does, whether it calls the Kubernetes API), a whiteboard, sticky notes, and markers.",
   "steps": [
    "Give each group a table of 6 workloads, for example a static website, a log shipper that reads Pod metadata, a CI deployer outside the cluster, a database, a ConfigMap sync tool, and a batch job.",
    "For each workload, groups decide whether it needs a token, and if so which ServiceAccount, Role verbs and resources it needs; they write the decisions on sticky notes.",
    "Groups write the kubectl commands or YAML for two of the workloads: one that needs API access (create sa, create role, create rolebinding, serviceAccountName) and one that does not (automountServiceAccountToken: false).",
    "For the external CI deployer, groups write the `kubectl create token` command with a sensible duration.",
    "Groups post their notes on the whiteboard; the teacher compares designs and asks groups to defend any ClusterRoleBinding or broad verbs."
   ]
  },
  "discussion": [
   "Why is a token that expires and is tied to a Pod safer than one stored in a long-lived Secret?",
   "What could an attacker do with a mounted token if the ServiceAccount had broad permissions?",
   "Should automountServiceAccountToken be false by default in your namespaces? What would break?"
  ],
  "exit": [
   [
    "A ServiceAccount sets automountServiceAccountToken: false, but the Pod sets it to true. Is the token mounted?",
    "Yes; the Pod-level setting takes precedence."
   ],
   [
    "How do you make Deployment `api` use ServiceAccount `api-sa`?",
    "Set `serviceAccountName: api-sa` in the Pod template, for example with `kubectl set serviceaccount deploy/api api-sa`."
   ],
   [
    "What is the username to use with --as for ServiceAccount `sync` in namespace `web`?",
    "`system:serviceaccount:web:sync`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a step card for the full flow (create sa, create role, create rolebinding, set serviceAccountName, auth can-i) and let them complete the audit for one workload with the teacher before working independently.",
   "Extend: Ask fast finishers to write a Pod spec with a projected volume containing a serviceAccountToken source with a custom audience and expiration, and to explain why an external service would want its own audience."
  ]
 },
 {
  "t": "SecurityContext at Pod and container level: runAsUser, runAsNonRoot, fsGroup, readOnlyRootFilesystem, allowPrivilegeEscalation",
  "objectives": [
   "Students will be able to explain why running containers as non-root with a read-only root filesystem reduces risk.",
   "Students will be able to place runAsUser, runAsGroup, runAsNonRoot, fsGroup, readOnlyRootFilesystem and allowPrivilegeEscalation at the correct Pod or container level.",
   "Students will be able to predict the effective setting when Pod-level and container-level values conflict.",
   "Students will be able to diagnose a CreateContainerConfigError caused by runAsNonRoot and verify security settings with kubectl exec."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers on the whiteboard. Steer toward the idea that a root container gives an attacker more to work with."
   ],
   [
    13,
    "Teach",
    "Project the example manifest. Walk through each field, drawing two boxes on the board labeled Pod and Container and writing each field in the right box. Explain the override rule and show the CreateContainerConfigError event text."
   ],
   [
    17,
    "Activity",
    "Run the \"Which level?\" card sort in small groups, then the broken manifest review. Circulate and ask groups to justify each placement."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the settings to real risks and to Pod Security Admission, which comes next."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "An attacker finds a bug in a web app running in a container. What can they do if the container runs as root with a writable filesystem, compared with running as an ordinary user with a read-only filesystem?",
  "activity": {
   "title": "Which level? Security context card sort and manifest repair",
   "materials": "Printed cards (one per field: runAsUser, runAsGroup, runAsNonRoot, fsGroup, readOnlyRootFilesystem, allowPrivilegeEscalation, capabilities, privileged), a whiteboard split into \"Pod only\", \"Container only\" and \"Either\", and a printed broken manifest per group.",
   "steps": [
    "Groups of three sort the field cards into the three whiteboard columns, placing each card on the board with a sticky note explaining why.",
    "The teacher reveals the correct placement and the class discusses any card that landed in the wrong column, especially fsGroup and readOnlyRootFilesystem.",
    "Each group receives a printed manifest with three planted problems: fsGroup on the container, runAsNonRoot with an image that uses a named user, and a read-only root filesystem with no writable /tmp.",
    "Groups mark each problem, write the corrected YAML on the sheet, and state the kubectl command they would use to verify each fix.",
    "Two groups swap sheets and check each other's corrections before the class reviews them together."
   ]
  },
  "discussion": [
   "Why might Kubernetes refuse to start a container rather than silently change its user when runAsNonRoot is set?",
   "What kinds of applications might struggle with a read-only root filesystem, and how would you help them?",
   "If every team in a company must follow these settings, who should enforce them, the developer or the platform?"
  ],
  "exit": [
   [
    "Which of these fields can only be set at the Pod level: fsGroup, runAsUser, readOnlyRootFilesystem?",
    "fsGroup."
   ],
   [
    "The Pod sets runAsUser 1000 and a container sets runAsUser 3000. Which UID does the container use?",
    "3000, because container-level values override Pod-level values."
   ],
   [
    "How would you prove a container cannot write to its root filesystem?",
    "Run `kubectl exec <pod> -- touch /test` and see it fail with 'Read-only file system'."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column reference card listing each field with its allowed level and a one-line meaning, and let them use it during the sort.",
   "Extend: Ask fast finishers to add a container that needs to bind port 80 as non-root to the repaired manifest and research which extra setting it would need."
  ]
 },
 {
  "t": "Linux capabilities (add/drop) and Pod Security Admission levels (privileged, baseline, restricted)",
  "objectives": [
   "Students will be able to explain what Linux capabilities are and write a container securityContext that drops ALL and adds only what is needed.",
   "Students will be able to compare the privileged, baseline and restricted Pod Security levels and the enforce, audit and warn modes.",
   "Students will be able to apply Pod Security Admission labels to a namespace with kubectl.",
   "Students will be able to locate and fix a PodSecurity violation that prevents a Deployment's Pods from being created."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board. Introduce capabilities as the \"keys on a key ring\" alternative to all-powerful root."
   ],
   [
    12,
    "Teach",
    "Show the hardened securityContext, then a table of the three levels and three modes. Demonstrate on the projector, or describe, a Deployment with 0 Pods and the ReplicaSet event that explains it."
   ],
   [
    18,
    "Activity",
    "Run the \"Admit or reject?\" judging activity in pairs. Circulate, asking pairs to name the exact field that causes each rejection."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore migration strategies and why warn is useful alongside enforce."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "If you could give a program only one of root's powers instead of all of them, which would a simple web server on port 80 actually need?",
  "activity": {
   "title": "Admit or reject? Pod Security judging panel",
   "materials": "Eight printed Pod snippet cards made by the teacher (varying runAsNonRoot, privileged, hostNetwork, hostPath, capabilities and seccompProfile), a whiteboard grid with columns for privileged, baseline and restricted, and sticky notes in two colors.",
   "steps": [
    "Pairs receive the eight Pod snippet cards and, for each card, decide whether it would be admitted under privileged, baseline and restricted enforcement.",
    "They mark each verdict on the whiteboard grid with a green sticky note for admit and a red one for reject, writing the deciding field on red notes.",
    "The teacher reviews the grid row by row, correcting any verdicts and explaining which rule each rejection breaks.",
    "Each pair picks two cards rejected under restricted and rewrites their securityContext so they would be admitted.",
    "Pairs swap rewrites with another pair, who check them against the restricted checklist before the class reviews one example together."
   ]
  },
  "discussion": [
   "Why do you think PSA checks Pods rather than Deployments, and what problems does that cause for developers?",
   "How would you move a busy namespace from no policy to restricted without breaking running applications?",
   "Which applications genuinely need the privileged level, and how should a cluster isolate them?"
  ],
  "exit": [
   [
    "Write the label that makes namespace `web` reject Pods violating restricted.",
    "`kubectl label namespace web pod-security.kubernetes.io/enforce=restricted`."
   ],
   [
    "Name three settings the restricted level requires that baseline does not.",
    "runAsNonRoot true, allowPrivilegeEscalation false, capabilities dropping ALL, and a RuntimeDefault or Localhost seccomp profile (any three)."
   ],
   [
    "A Deployment is created but no Pods appear in a restricted namespace. What command shows why?",
    "`kubectl describe rs <replicaset>` (or `kubectl get events`), which shows the PodSecurity violation."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page checklist of baseline and restricted requirements that students can tick off while judging each card.",
   "Extend: Ask fast finishers to design a migration plan for three namespaces using different enforce, warn and audit levels, and explain how the version label could prevent surprises after a cluster upgrade."
  ]
 },
 {
  "t": "Service types: ClusterIP, NodePort, LoadBalancer, ExternalName and headless (clusterIP: None)",
  "objectives": [
   "Students will be able to describe the purpose of a Service and how it provides a stable name in front of changing Pods.",
   "Students will be able to compare ClusterIP, NodePort, LoadBalancer, ExternalName and headless Services, including how the first three nest.",
   "Students will be able to choose the correct Service type for a given application requirement.",
   "Students will be able to read `kubectl get svc` output and explain the TYPE, CLUSTER-IP, EXTERNAL-IP and PORT(S) columns."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather ideas. Lead students to the need for a stable address in front of changing Pods."
   ],
   [
    12,
    "Teach",
    "Draw nested boxes on the whiteboard for ClusterIP inside NodePort inside LoadBalancer, then draw ExternalName and headless off to the side. Project sample `kubectl get svc` output and explain each column."
   ],
   [
    18,
    "Activity",
    "Run the \"Service matchmaker\" scenario activity in groups. Circulate and ask each group to defend one choice against the next-closest type."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare cost and exposure trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Pods get a new IP address every time they are replaced. If you were a client trying to call a set of Pods, what would you want Kubernetes to give you instead?",
  "activity": {
   "title": "Service matchmaker: pick the type",
   "materials": "Ten printed requirement cards written by the teacher (for example \"internal Redis cache\", \"partner API at an external host name\", \"Kafka-style cluster where members need individual names\", \"quick test from a laptop on a lab cluster\", \"public web store on a cloud cluster\"), five type cards per group, a whiteboard and a projector showing sample `kubectl get svc` output.",
   "steps": [
    "In groups of three or four, students place each requirement card under the Service type card that fits it best.",
    "For each match, the group writes on the card one reason and one risk if the wrong type were chosen.",
    "The teacher projects sample `kubectl get svc` output for each scenario and asks groups to identify the type from the columns alone.",
    "Groups compare their matches with a neighboring group and resolve disagreements, flagging any they cannot settle.",
    "The class reviews flagged cards on the whiteboard, with the teacher explaining the deciding detail."
   ]
  },
  "discussion": [
   "Why might a company prefer one Ingress over many LoadBalancer Services for HTTP apps?",
   "When would you accept the risks of a NodePort Service in a real environment?",
   "What happens to application configuration when a team moves a database from an external provider into the cluster, and how does ExternalName help?"
  ],
  "exit": [
   [
    "Which Service type would you use for an internal API that only other Pods call?",
    "ClusterIP, the default."
   ],
   [
    "A Service shows `80:30080/TCP` in PORT(S). What do the two numbers mean?",
    "80 is the Service port at the cluster IP and 30080 is the node port opened on every node."
   ],
   [
    "What makes a Service headless, and what does its DNS return?",
    "Setting clusterIP: None; DNS returns the IPs of the individual ready Pods."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page visual of the nested types with a single sentence per type, and pair them with a confident partner for the matchmaker activity.",
   "Extend: Ask fast finishers to write YAML for an ExternalName Service and a headless Service from the scenario cards, and explain why a StatefulSet needs the headless one."
  ]
 },
 {
  "t": "Selectors, port vs targetPort vs nodePort, named ports",
  "objectives": [
   "Students will be able to explain how a Service selector matches Pod labels within its namespace.",
   "Students will be able to distinguish port, targetPort and nodePort and trace a request through all three.",
   "Students will be able to configure a named port in a Pod and reference it from a Service.",
   "Students will be able to apply a troubleshooting order that separates selector problems from port problems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up scenario and take guesses. Write \"selector\" and \"ports\" as the two suspects on the board."
   ],
   [
    12,
    "Teach",
    "Draw the request path from client to node port to Service port to target port on the board. Show a named port example and the default rule for targetPort. Model the three-step troubleshooting order."
   ],
   [
    18,
    "Activity",
    "Run the \"Broken Service detective\" activity in pairs with printed Service and Pod snippets. Circulate and ask pairs which command would confirm each diagnosis."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce why named ports and clear labels reduce outages."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions and hand them in."
   ]
  ],
  "warmup": "A Service exists, the Pods are Running, but requests to the Service time out. List every reason you can think of. Which two categories do your reasons fall into?",
  "activity": {
   "title": "Broken Service detective",
   "materials": "Six printed case cards made by the teacher, each showing a Service YAML snippet, a Pod template snippet and a short symptom (for example \"no endpoints\" or \"endpoints present, connection refused\"), plus a whiteboard and markers.",
   "steps": [
    "Pairs receive the six case cards and, for each, decide whether the fault is in the selector, the targetPort, a missing port name, or the nodePort.",
    "For each case, pairs write the corrected line of YAML and the kubectl command that would confirm the diagnosis.",
    "The teacher calls on pairs to present one case each, drawing the request path on the whiteboard and marking where it breaks.",
    "Pairs then write their own broken case card with a hidden fault and trade it with another pair to solve.",
    "The class closes by listing the fingerprints: no endpoints means selector or readiness, refused connections mean targetPort or listen address."
   ]
  },
  "discussion": [
   "Why does Kubernetes default targetPort to port rather than to the container's declared port?",
   "How do named ports help when several teams own different Services pointing at the same Pods?",
   "What labeling conventions would make selector mistakes less likely in a large team?"
  ],
  "exit": [
   [
    "A Service has port 80 and targetPort 8080. Which port do clients use, and which port must the app listen on?",
    "Clients use 80; the app must listen on 8080."
   ],
   [
    "A Service has no endpoints. Is the problem more likely the selector or the targetPort?",
    "The selector (or Pod readiness); targetPort does not affect whether endpoints exist."
   ],
   [
    "How do you make a Service follow a container port named http?",
    "Set `targetPort: http` in the Service and declare `name: http` on the containerPort."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the request path with blanks for port, targetPort and nodePort, and let students fill it in before the detective cases.",
   "Extend: Ask fast finishers to design a two-port Service (HTTP and metrics) using named ports, and explain what DNS SRV records it would produce."
  ]
 },
 {
  "t": "EndpointSlices and why an empty endpoint list means the selector or readiness is wrong",
  "objectives": [
   "Students will be able to explain the relationship between a Service, its EndpointSlices and the Pods they list.",
   "Students will be able to list a Service's EndpointSlices and interpret their ready conditions.",
   "Students will be able to diagnose an empty endpoint list as either a selector mismatch or unready Pods.",
   "Students will be able to decide whether a Service problem lies before or after the endpoint check."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers. Introduce the idea that the Service is a description and the endpoint list is the reality."
   ],
   [
    12,
    "Teach",
    "Draw a Service box, an EndpointSlice box and three Pod boxes on the board with arrows. Show the commands and a sample describe output with Endpoints: <none>. Explain the two families of cause and the split with port and policy problems."
   ],
   [
    18,
    "Activity",
    "Run the \"Endpoint triage\" role-play in groups of three. Circulate and listen for students naming the exact next command."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect endpoints to readiness probes and rollouts."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A Service exists and its Pods are Running, but traffic goes nowhere. If you could ask Kubernetes one question to narrow down the cause, what would you ask?",
  "activity": {
   "title": "Endpoint triage role-play",
   "materials": "Printed scenario packets made by the teacher, each with a hidden \"cluster truth\" sheet (Service YAML, Pod labels, READY status and probe events) and a blank investigation log, plus a whiteboard.",
   "steps": [
    "In groups of three, one student plays the cluster and holds the truth sheet, one is the engineer and one is the note-taker.",
    "The engineer asks for the output of one kubectl command at a time, and the cluster student answers only from the truth sheet.",
    "The note-taker records each command and what it revealed, and the group stops when the engineer states the cause and fix.",
    "Groups rotate roles for a second and third scenario, including one where endpoints exist and the fault is the targetPort.",
    "The class compares how many commands each group needed and agrees on the shortest reliable order, written on the whiteboard."
   ]
  },
  "discussion": [
   "Why is it useful that the endpoint list is a separate object from the Service itself?",
   "How does a readiness probe protect users during a rollout, and what happens if the probe is too strict?",
   "When might a team deliberately create a Service with no selector?"
  ],
  "exit": [
   [
    "What two causes explain a Service with no ready endpoints?",
    "No Pods match the selector, or the matching Pods are not ready."
   ],
   [
    "Which label links an EndpointSlice to its Service?",
    "`kubernetes.io/service-name`."
   ],
   [
    "Endpoints list the expected Pods but connections fail. Name one place to look next.",
    "The targetPort, the app's listen address, or NetworkPolicies."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart with the first decision \"endpoints empty or not?\" and the two branches filled in, to use during the role-play.",
   "Extend: Ask fast finishers to write an EndpointSlice manifest for a selector-less Service pointing at an external IP and explain which fields it needs."
  ]
 },
 {
  "t": "Cluster DNS names: <service>.<namespace>.svc.cluster.local",
  "objectives": [
   "Students will be able to construct the fully qualified DNS name of any Service from its name, namespace and the cluster domain.",
   "Students will be able to explain how search domains and ndots in a Pod's resolv.conf affect name resolution.",
   "Students will be able to predict whether a short or partial Service name resolves from a given namespace.",
   "Students will be able to test DNS from a temporary Pod and decide whether a failure is a DNS problem or a connectivity problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about office phone extensions and connect it to namespaces."
   ],
   [
    12,
    "Teach",
    "Project a sample resolv.conf and walk through how the resolver expands web, web.shop and api.example.com. Write the FQDN pattern on the board and add the headless and StatefulSet forms."
   ],
   [
    18,
    "Activity",
    "Run the \"Will it resolve?\" lookup game in pairs, then each pair explains one tricky case to the class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to link DNS to NetworkPolicy and troubleshooting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "In an office phone system, why can you reach a colleague in your own department by dialing four digits, but need more digits for another department?",
  "activity": {
   "title": "Will it resolve? DNS lookup game",
   "materials": "Printed resolv.conf cards for Pods in three namespaces, a deck of 12 lookup cards made by the teacher (for example \"web from shop\", \"web from dev\", \"web.shop from dev\", \"db-0.db from shop\", \"api.example.com from dev\"), a whiteboard and markers.",
   "steps": [
    "Each pair draws a resolv.conf card showing which namespace their Pod lives in.",
    "The teacher reveals lookup cards one at a time, and pairs write down whether the name resolves from their Pod and the exact FQDN that succeeds.",
    "For each card, pairs also list the failed names the resolver tries first because of the search list and ndots.",
    "After all cards, pairs swap resolv.conf cards with another pair and re-answer three lookups to see how the namespace changes the outcome.",
    "The class writes the rules it discovered on the whiteboard, such as \"short names only work in the same namespace\"."
   ]
  },
  "discussion": [
   "Why might Kubernetes choose ndots:5 even though it creates extra lookups for external names?",
   "How would you design configuration so an application works in any namespace without code changes?",
   "What symptoms would you expect if the CoreDNS Pods stopped running, and how would you tell that apart from a wrong Service name?"
  ],
  "exit": [
   [
    "Write the FQDN for Service `cart` in namespace `store`.",
    "`cart.store.svc.cluster.local`."
   ],
   [
    "Does the short name `cart` resolve from a Pod in namespace `admin`? Why?",
    "No; the resolver tries cart.admin.svc.cluster.local first and that does not exist. Use cart.store."
   ],
   [
    "nslookup returns an IP for the Service but curl fails. Is DNS the problem?",
    "No; DNS works. Check endpoints, targetPort and NetworkPolicies."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a fill-in template for the FQDN pattern and a printed resolv.conf to annotate step by step during the game.",
   "Extend: Ask fast finishers to work out the SRV record name for a Service with two named ports and explain how a client could use it to discover port numbers."
  ]
 },
 {
  "t": "Kubectl expose, kubectl create service and kubectl port-forward",
  "objectives": [
   "Students will be able to create Services imperatively with kubectl expose and kubectl create service.",
   "Students will be able to explain why kubectl create service can produce a Service with no endpoints and how to avoid it.",
   "Students will be able to combine --dry-run=client -o yaml with manual edits to meet exact task requirements such as a fixed nodePort.",
   "Students will be able to use kubectl port-forward to test an application and describe its limits."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take answers. Write the three commands on the board as \"copy\", \"guess\" and \"tunnel\"."
   ],
   [
    12,
    "Teach",
    "Walk through each command on the projector with its key flags. Show the selector set by create service versus expose side by side, and model the dry-run edit for a fixed nodePort."
   ],
   [
    18,
    "Activity",
    "Run the \"Command relay\" race in teams, followed by a review of every answer. Circulate to check that teams verify endpoints in their answers."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh speed against correctness."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you had to create a Service in 30 seconds, would you rather write YAML or type a command? What could go wrong with a command that fills in details for you?",
  "activity": {
   "title": "Command relay: imperative Services",
   "materials": "Eight printed task cards written by the teacher (for example \"expose Deployment api, labels tier=back, NodePort 30200\", \"headless Service for StatefulSet db\", \"test the app from your laptop without a Service\"), a whiteboard divided into team columns, and markers. Student laptops with a browser are optional for checking the kubectl reference.",
   "steps": [
    "Split the class into teams of three and line them up facing the whiteboard.",
    "The teacher reads a task card aloud; the first member of each team writes the command, the second adds any needed YAML edit, and the third writes the verification command.",
    "Teams earn a point for each fully correct answer and lose it if their Service would have no endpoints.",
    "After all eight cards, the class reviews each answer, with the teacher highlighting where create service would have guessed the wrong selector.",
    "Teams finish by writing one rule of thumb each on the board, such as \"fixed nodePort means dry-run and edit\"."
   ]
  },
  "discussion": [
   "When is kubectl create service a reasonable choice despite its selector assumption?",
   "Why is port-forward safer than a NodePort for a quick database check, and what are its drawbacks?",
   "How would you make sure an imperative command did what you expected, every time, under exam pressure?"
  ],
  "exit": [
   [
    "What selector does `kubectl create service nodeport web --tcp=80:8080` set?",
    "`app=web`."
   ],
   [
    "How do you create a NodePort Service for Deployment `api` with nodePort 30200?",
    "`kubectl expose deploy api --type=NodePort --port=<port> --dry-run=client -o yaml`, add `nodePort: 30200`, then `kubectl apply -f`."
   ],
   [
    "Name one limitation of kubectl port-forward.",
    "It reaches a single Pod (no load balancing), listens on localhost by default and stops when you end the command or the Pod goes away."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page flag sheet for expose, create service and port-forward with one worked example each, and let students use it during the relay.",
   "Extend: Ask fast finishers to write a single dry-run pipeline that exposes a Deployment, changes the Service type and adds a nodePort, and to explain how they would verify the endpoints afterward."
  ]
 },
 {
  "t": "NetworkPolicy basics: podSelector, policyTypes, ingress and egress rules, default deny",
  "objectives": [
   "Students will be able to explain the default allow-all Pod network and why NetworkPolicies are needed.",
   "Students will be able to describe how podSelector and policyTypes isolate Pods and why policies are additive.",
   "Students will be able to write a default deny policy and a narrow allow policy for a given traffic flow.",
   "Students will be able to predict whether specific traffic is allowed given a set of policies, including the difference between ingress: [] and ingress: [{}]."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the flat Pod network on the board with arrows everywhere."
   ],
   [
    12,
    "Teach",
    "Explain isolation using the guest-list idea, then project the default deny and allow policies. Highlight the empty list versus empty rule difference and the targetPort rule."
   ],
   [
    18,
    "Activity",
    "Run the \"Traffic court\" activity in small groups using a printed namespace diagram and policy cards. Circulate and challenge groups to explain each verdict."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect policies to real-world audits and defense in depth."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If an attacker took over one Pod in your cluster, which other Pods could they reach by default? What would you want to change?",
  "activity": {
   "title": "Traffic court: allowed or blocked?",
   "materials": "A printed diagram of a namespace with four labeled Pods (frontend, api, db, batch), six printed policy cards made by the teacher, ten printed traffic request cards (for example \"frontend to api on 8080\", \"batch to db on 5432\"), and a whiteboard.",
   "steps": [
    "Groups start with no policies applied and agree that all ten traffic requests are allowed.",
    "The teacher announces which policy cards are now \"applied\" in rounds, beginning with a default deny for Ingress.",
    "After each round, groups rule on every traffic request, writing allowed or blocked and the policy that decides it.",
    "One round includes a policy with ingress: [{}] and another omits policyTypes, so groups must reason about those special cases.",
    "The class reviews contested verdicts on the whiteboard, and each group writes one allow policy that would fix a blocked but legitimate request."
   ]
  },
  "discussion": [
   "Why do you think Kubernetes designed NetworkPolicy with only allow rules and no deny rules?",
   "What are the risks of applying a default deny to a busy production namespace all at once, and how would you reduce them?",
   "How does NetworkPolicy fit alongside other protections such as authentication between services?"
  ],
  "exit": [
   [
    "A Pod is selected by no NetworkPolicy. What traffic can reach it?",
    "All traffic; it is non-isolated."
   ],
   [
    "What is the difference between ingress: [] and ingress: [{}]?",
    "ingress: [] allows nothing; ingress: [{}] has one empty rule that allows all sources on all ports."
   ],
   [
    "Write the key fields of a policy letting Pods labeled role=web reach Pods labeled role=api on TCP 3000.",
    "podSelector matchLabels role: api; policyTypes [Ingress]; ingress from podSelector matchLabels role: web; ports TCP 3000."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a policy template with the structure filled in and blanks for labels and ports, plus a reminder card that \"selected means isolated\".",
   "Extend: Ask fast finishers to write the full set of policies for frontend, api and db with both ingress and egress default deny, and list every flow they had to allow, including DNS."
  ]
 },
 {
  "t": "NetworkPolicy peers: podSelector, namespaceSelector, ipBlock; AND vs OR rule semantics; allowing DNS on egress",
  "objectives": [
   "Students will be able to describe the podSelector, namespaceSelector and ipBlock peer types and when to use each.",
   "Students will be able to distinguish AND from OR semantics in NetworkPolicy YAML based on list structure.",
   "Students will be able to write an egress policy that allows DNS to the cluster DNS Pods along with application traffic.",
   "Students will be able to diagnose a policy that is more permissive than intended or that breaks name resolution."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about guest lists and record the two readings on the board."
   ],
   [
    13,
    "Teach",
    "Project the AND and OR policies side by side and trace who gets in for each. Explain rule-level OR and from-ports AND. Show the DNS egress rule and explain why TCP 53 matters."
   ],
   [
    17,
    "Activity",
    "Run the \"One dash\" YAML review in pairs with printed policies. Circulate and ask pairs to state each policy in plain English."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why such small syntax differences carry big security consequences."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A guest list says \"people from Acme\" on one line and \"people on the security team\" on the next. Who gets in? Now imagine one line says \"people from Acme on the security team\". Who gets in now?",
  "activity": {
   "title": "One dash: NetworkPolicy YAML review",
   "materials": "Six printed NetworkPolicy excerpts made by the teacher (pairs of near-identical AND and OR versions, one egress policy missing DNS, one combining two sources and two ports in a single rule), a printed cluster map showing namespaces and Pod labels, highlighters and a whiteboard.",
   "steps": [
    "Pairs read each policy excerpt and highlight every dash in its from or to list.",
    "For each excerpt, pairs write a one-sentence plain-English description of exactly who may connect, using the cluster map to list the matching Pods.",
    "The teacher reveals the intended behavior for each policy, and pairs mark whether the YAML matches the intent.",
    "Pairs rewrite any policy that is too permissive or that breaks DNS, writing the corrected YAML on the sheet.",
    "Two pairs compare rewrites and the class reviews the most common correction on the whiteboard."
   ]
  },
  "discussion": [
   "Why do you think the NetworkPolicy designers made AND and OR depend on list structure, and what would you have done differently?",
   "How could a team catch an accidental OR in code review before it reaches production?",
   "When is it acceptable to allow DNS to any destination rather than only to the DNS Pods?"
  ],
  "exit": [
   [
    "A from list has one item containing both a namespaceSelector and a podSelector. Is that AND or OR?",
    "AND; traffic must come from matching Pods inside matching namespaces."
   ],
   [
    "Which ports and protocols must an egress policy allow for DNS?",
    "Port 53 over both UDP and TCP."
   ],
   [
    "Which label lets you select namespace `ops` by name?",
    "`kubernetes.io/metadata.name: ops`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a color-coded reference card showing one-dash and two-dash examples with their meanings written beside them, to use during the review.",
   "Extend: Ask fast finishers to write a single policy that allows ingress from Prometheus in monitoring on 9090 and from frontend Pods on 8080, with no cross-over, and egress to DNS and an external partner range using ipBlock with an except."
  ]
 },
 {
  "t": "NetworkPolicy needs a CNI plugin that enforces it (for example Calico or Cilium)",
  "objectives": [
   "Students will be able to explain that the Kubernetes API stores NetworkPolicies while the CNI plugin enforces them.",
   "Students will be able to identify the network plugin running in a cluster using kubectl.",
   "Students will be able to design a before-and-after traffic test that proves whether a policy is enforced.",
   "Students will be able to distinguish standard NetworkPolicy objects from plugin-specific custom resources."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about signs without a guard and take a few answers."
   ],
   [
    10,
    "Teach",
    "Draw the API server, the plugin agent on each node and the Pods on the board, with arrows showing that only the agent filters traffic. Show the commands for identifying the plugin and testing a policy."
   ],
   [
    20,
    "Activity",
    "Run the \"Is it enforced?\" investigation in groups using printed command outputs. Circulate and push groups to say what evidence would change their conclusion."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to place NetworkPolicy in a defense-in-depth strategy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If you posted a \"No entry\" sign on a door but nobody was there to enforce it, how would you find out whether the sign actually works?",
  "activity": {
   "title": "Is it enforced? Cluster investigation",
   "materials": "Four printed case files made by the teacher, each with sample output from `kubectl get daemonset -n kube-system`, `kubectl describe netpol` and before-and-after wget tests for a different cluster, plus a whiteboard verdict table.",
   "steps": [
    "Groups receive one case file each and identify which network plugin the cluster runs from the DaemonSet output.",
    "Groups compare the before and after traffic tests and decide whether the policy is enforced, not selecting the right Pods, or working correctly.",
    "Each group writes its verdict and the single piece of evidence that decided it in the whiteboard table.",
    "Groups rotate case files once and check the previous group's verdict, adding a sticky note if they disagree.",
    "The class reviews disagreements and agrees on a three-step checklist for proving enforcement."
   ]
  },
  "discussion": [
   "Why might Kubernetes leave enforcement to plugins rather than building it into the core?",
   "What risks arise if a team believes its policies are enforced when they are not?",
   "What other controls would you combine with NetworkPolicy to protect a sensitive database?"
  ],
  "exit": [
   [
    "What component actually enforces NetworkPolicy?",
    "The cluster's CNI network plugin, such as Calico or Cilium."
   ],
   [
    "A correct policy blocks nothing and kubectl shows no errors. What is the likely cause?",
    "The network plugin does not enforce NetworkPolicy."
   ],
   [
    "What two tests prove a policy is enforced?",
    "A connection that succeeds before the policy is applied and the same connection failing after it is applied."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple diagram showing the API server storing the policy and the plugin agent enforcing it, and a fill-in checklist for the investigation.",
   "Extend: Ask fast finishers to research one feature that Calico or Cilium custom policies offer beyond standard NetworkPolicy and explain why it is outside the CKAD objectives."
  ]
 },
 {
  "t": "Ingress resources: ingressClassName, host and path rules, pathType Prefix vs Exact, default backend, TLS secrets",
  "objectives": [
   "Students will be able to explain the role of an Ingress and how it differs from exposing each app with a LoadBalancer Service.",
   "Students will be able to write Ingress rules with hosts, paths, pathType, backends, a default backend and TLS.",
   "Students will be able to predict which backend receives a request given Exact and Prefix paths and the longest-match rule.",
   "Students will be able to generate an Ingress with kubectl create ingress, including Prefix paths and TLS."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about mail sorting and connect it to hosts and paths."
   ],
   [
    12,
    "Teach",
    "Project the example Ingress and walk through each field. Draw a table of sample URLs and show how Exact, Prefix and longest match decide the backend. Show the equivalent kubectl create ingress command."
   ],
   [
    18,
    "Activity",
    "Run the \"Route the request\" game in pairs with printed Ingress specs and URL cards. Circulate and ask pairs to justify tricky routes such as /apiv2."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh Ingress against multiple LoadBalancer Services."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A mailroom receives letters addressed to \"Billing\", \"Billing - Refunds\" and \"Billingsworth Ltd\". If the rule says \"anything for Billing goes to desk 3\", which letters should go to desk 3?",
  "activity": {
   "title": "Route the request",
   "materials": "Three printed Ingress specs made by the teacher (mixing Exact and Prefix paths, two hosts and a default backend), a deck of 15 URL cards such as \"shop.test/api\", \"shop.test/apiv2\", \"shop.test/api/\", \"blog.test/\" and \"unknown.test/\", and a whiteboard.",
   "steps": [
    "Pairs take one Ingress spec and the URL deck, and for each URL card write which backend receives the request.",
    "For each decision, pairs note the deciding rule: exact match, prefix element match, longest match or default backend.",
    "The teacher reads out the answers and pairs score themselves, discussing any URL they got wrong.",
    "Pairs then swap specs and write the kubectl create ingress command that would produce their new spec, including any TLS.",
    "The class closes by listing on the whiteboard the three URLs that caught the most pairs out and why."
   ]
  },
  "discussion": [
   "Why might a team prefer one Ingress with many rules over many LoadBalancer Services?",
   "When would you choose Exact over Prefix in a real application?",
   "What could go wrong if the TLS hosts in an Ingress do not match the rule hosts?"
  ],
  "exit": [
   [
    "Which backend gets `/api/v2` if paths are `/api` Exact to A and `/` Prefix to B?",
    "B, because Exact /api does not match /api/v2."
   ],
   [
    "What command creates the Secret an Ingress needs for TLS?",
    "`kubectl create secret tls <name> --cert=<cert file> --key=<key file>` in the Ingress's namespace."
   ],
   [
    "In kubectl create ingress, what does a trailing * on a path mean?",
    "The path uses pathType Prefix; without it, the path is Exact."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching flowchart (exact match, then longest prefix, then default backend) to follow for each URL card.",
   "Extend: Ask fast finishers to write an Ingress serving two hosts, one with TLS and a wildcard host, and to predict which certificate a client gets for a host not listed under tls."
  ]
 },
 {
  "t": "Ingress controllers (for example ingress-nginx) and testing with curl and Host headers",
  "objectives": [
   "Students will be able to explain the role of an Ingress controller and how IngressClass links an Ingress to it.",
   "Students will be able to find a controller's entry point and test Ingress rules with curl and a Host header.",
   "Students will be able to use curl --resolve to test an HTTPS Ingress and explain why SNI matters.",
   "Students will be able to interpret 404, 503 and timeout results to locate the failing layer."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the hotel receptionist and collect ideas about what information a request must carry."
   ],
   [
    12,
    "Teach",
    "Draw client, controller Service, controller Pods, backend Service and Pods on the board. Show the curl commands with Host and --resolve, then build a table of status codes and their meanings."
   ],
   [
    18,
    "Activity",
    "Run the \"Status code detective\" activity in pairs with printed curl outputs and cluster snippets. Circulate and ask pairs which single fix they would make."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce layered troubleshooting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You walk up to a hotel front desk that keeps a guest list for several parties. What do you need to tell the receptionist to be sent to the right room, and what happens if you say nothing?",
  "activity": {
   "title": "Status code detective",
   "materials": "Six printed case cards made by the teacher, each with a curl command and its output (404, 503, timeout, default certificate warning, success), plus matching snippets of `kubectl get ingress`, `kubectl get ingressclass` and `kubectl describe ingress`, and a whiteboard.",
   "steps": [
    "Pairs read each case card and decide which layer failed: no rule matched, backend unavailable, controller unreachable, or wrong certificate.",
    "For each case, pairs write the single change they would make and the command they would run to confirm it.",
    "The teacher reveals the cause of each case, and pairs mark their answers, discussing any misreads.",
    "Pairs write a corrected curl command for the case that used no Host header and for the HTTPS case, using --resolve with the address written without a scheme.",
    "The class builds a shared status-code cheat sheet on the whiteboard to keep for revision."
   ]
  },
  "discussion": [
   "Why might Kubernetes leave the choice of Ingress controller to each cluster rather than shipping one?",
   "What would you check first if every Ingress in a cluster suddenly returned timeouts?",
   "How does knowing the meaning of each status code save time compared with recreating resources?"
  ],
  "exit": [
   [
    "What does a 404 from the Ingress controller usually mean?",
    "The request reached the controller but no rule matched its host, path or class."
   ],
   [
    "Write a curl command that tests host `api.test` through a controller at 10.0.0.5.",
    "`curl -H 'Host: api.test' 10.0.0.5/`."
   ],
   [
    "What does an empty ADDRESS column on an Ingress suggest?",
    "No running controller is handling that Ingress's class."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-row table (404, 503, timeout) with the meaning and first check filled in, to use during the detective activity.",
   "Extend: Ask fast finishers to explain how they would mark an IngressClass as the cluster default and predict what happens to Ingresses with no class name before and after."
  ]
 }
]);
