# Lab library format

Hands-on labs live in `public/data/labs-*.js`. Each file calls `CertHub.registerLabs([...])`.
Study weeks link to labs by id, so one lab can serve several certifications.

The goal is real-world experience: every lab is something a junior analyst, network
engineer or GRC analyst actually does, done in your own home lab with free tools, and it
ends with a portfolio write-up and a resume bullet.

```js
CertHub.registerLabs([
  {
    id: "lab-wireshark-basics",          // stable, lowercase, starts with "lab-"
    title: "Capture and read network traffic with Wireshark",
    track: "Networking",                 // "Foundations" | "Networking" | "Blue team" | "GRC & architecture"
    level: "Beginner",                   // "Beginner" | "Intermediate" | "Advanced"
    minutes: 60,                         // realistic time for a first attempt
    cost: "Free",                        // or e.g. "Free (AWS free tier; set a $1 budget alert)"
    summary: "One or two plain sentences on what you'll do.",
    realWorld: "Where this shows up on the job, e.g. 'SOC analysts pull a PCAP when an alert fires…'",
    youWillNeed: ["Wireshark (wireshark.org)", "Your lab Ubuntu VM from lab-home-lab"],
    requires: ["lab-home-lab"],          // optional: lab ids to do first
    safety: "Only capture traffic on networks and devices you own.",   // optional but expected for anything that scans, captures or runs samples
    steps: [
      {
        title: "Install Wireshark",
        body: "What to do and why, in plain words. 1–4 sentences.",
        cmd: "sudo apt update && sudo apt install -y wireshark",   // optional; exact command(s), one per line
        check: "What you should see if it worked."                   // optional
      }
    ],
    verify: ["You can point to the SYN, SYN-ACK and ACK packets of one connection."],  // 3–5 proof checks
    deliverable: "What to save for the portfolio (screenshots, report, config) and how to write it up.",
    resume: "One past-tense resume bullet with a concrete result.",
    interview: ["An interview question this lab prepares you for — with a one-line answer."],  // 2–3
    cleanup: ["Revert the VM to its clean snapshot."],   // optional
    links: [{ label: "Wireshark User's Guide", url: "https://www.wireshark.org/docs/wsug_html_chunked/" }]  // official docs, https only
  }
]);
```

## Writing rules

- 8–15 steps per lab. Each step is one action a beginner can follow without guessing.
- Commands must be exact and current for Ubuntu 24.04 LTS, Windows 11 / Windows Server 2022
  evaluation VMs, Cisco Packet Tracer 8.x, Docker, or the tool's current release. When a
  version might differ, say how to find the right one instead of inventing a number.
- Defensive and educational. Anything that scans, captures traffic or runs samples happens
  only inside the learner's own isolated lab, and the lab says so in `safety`.
  No exploit code, no attacking systems you don't own, no live malware.
- Plain language, active voice, no filler. Explain *why* briefly where it builds understanding.
- `links` go to official documentation or well-known nonprofit sources (vendor docs, NIST,
  CISA, OWASP, MITRE), https only.
