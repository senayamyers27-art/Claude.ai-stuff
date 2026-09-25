# Brief for new-track lab writers

Write labs in the site's lab format (see tools/check-data.js for the schema and existing
public/data/labs-*.js for depth and tone: id, title, track, level, minutes, cost, summary, realWorld,
youWillNeed, requires, safety, steps[{title, body, cmd?, check?}] (8-13 steps with real commands),
verify (3-4), deliverable, resume, interview, cleanup, links (https official docs only)).

- Free tools, the learner's own machines/VMs, free tiers or trials (with clear cost warnings and cleanup).
- Everything defensive or constructive; nothing that attacks systems you don't own.
- Build on existing labs via `requires` where natural (e.g. lab-home-lab, lab-linux-cli).
- Only create YOUR file (named in your task). Do NOT edit lab-map.js, frameworks.js or any other file.
- Instead, write your mapping to the JSON file named in your task:
  { "labRoles": { "<lab-id>": ["<role id>", ...1-3] },
    "labMap": { "<cert-id>": { "domains": { "<domainId>": ["<lab-id>", ...] } } } }
  Role ids: defensive, incident, forensics, threat, vuln, infra, netops, sysadmin, ssa, arch, securedev,
  assess, policy, ssm, privacy, techsupport (Technical Support), dba (Database Administration),
  testing (Systems Testing and Evaluation), entarch (Enterprise Architecture).
  Read each target cert's data file in public/data/<cert-id>.js to pick the right domain ids; if a cert's
  file doesn't exist yet, leave it out and list it in your reply.
- Check: `node tools/check-data.js` from cyber-study must show no ✗ lines for your lab ids
  (labs not yet linked or missing NICE roles are expected until I merge your mapping).
- No git commands.
