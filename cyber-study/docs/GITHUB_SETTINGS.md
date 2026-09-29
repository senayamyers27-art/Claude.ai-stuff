# GitHub security settings

The workflows in `.github/workflows/` check the code, but several protections are account and repository settings that only you can switch on. Each one below says where it is and why it matters. The weekly OpenSSF Scorecard run (**Security → Code scanning**) shows what is still missing.

## 1. Your GitHub account

1. **Two-factor sign-in with a passkey or security key.** **Settings → Password and authentication**. Passkeys and security keys can't be phished; text-message codes can. Save the recovery codes somewhere offline.
2. **Review access now and then.** In **Settings → Sessions**, **SSH and GPG keys**, **Applications** and **Developer settings → Personal access tokens**, remove anything you don't recognize or no longer use.
3. **Tokens:** use fine-grained tokens only, limited to the one repository they're for, with an expiry date. `PAGES_DEPLOY_TOKEN` needs only **Contents: Read and write** on `senayamyers27-art.github.io`.

## 2. Protect the main branch (`Claude.ai-stuff`)

**Settings → Rules → Rulesets → New ruleset → New branch ruleset**, named "main", enforcement **Active**, target **Include default branch**:

- **Restrict deletions** and **Block force pushes**: nobody, including a stolen token, can rewrite or delete `main`'s history.
- **Require a pull request before merging**, with required approvals **0** (you work alone, and GitHub doesn't let you approve your own pull requests). This still makes every change go through a pull request and its checks.
- **Require status checks to pass**: add `check` (Study site CI), `analyze` (CodeQL) and `gitleaks` (Secret Scan). Pull requests then can't merge while any of them is failing or still running. Study site CI runs only when `cyber-study/` or a study-site workflow changes; if you ever open a pull request that touches neither, it will wait for `check`, and you can merge it with the bypass below.
- **Require linear history**: fits the squash merges used here.
- **Bypass list:** leave it empty, or add only **Repository admin** "for pull requests only", as a way out for emergencies.

Do the same for `senayamyers27-art.github.io` with just **Restrict deletions** and **Block force pushes**: the publish step pushes directly, so it can't require pull requests.

## 3. Security features (`Claude.ai-stuff`)

**Settings → Advanced Security** (called **Code security** on some accounts):

- **Private vulnerability reporting: Enable.** The site's `security.txt` and Security page send researchers to `…/security/advisories/new`, which only works when this is on.
- **Dependency graph, Dependabot alerts and Dependabot security updates: Enable.** `.github/dependabot.yml` already keeps the pinned actions and npm tools up to date; security updates open fixes for known vulnerabilities right away.
- **Secret scanning and Push protection: Enable.** Push protection refuses a push that contains a recognizable API key or token, before it becomes public. (The Secret Scan workflow runs gitleaks as a second check.)
- **Code scanning:** keep the existing CodeQL workflow ("advanced setup"). OpenSSF Scorecard results appear here too.

## 4. GitHub Actions (`Claude.ai-stuff`)

**Settings → Actions → General**:

- **Actions permissions:** choose **Allow enterprise, and select non-enterprise, actions and reusable workflows**, tick **Allow actions created by GitHub**, and allow exactly these others:
  `gitleaks/gitleaks-action@*, ossf/scorecard-action@*, zaproxy/action-baseline@*`
  Then a compromised or typo-squatted action can't run, even if a workflow names it.
- **Require actions to be pinned to a full-length commit SHA** (when the option is shown): every workflow here already pins actions this way, and this makes GitHub enforce it.
- **Fork pull request workflows:** **Require approval for all external contributors**.
- **Workflow permissions:** **Read repository contents and packages permissions**, and untick **Allow GitHub Actions to create and approve pull requests**. The workflows ask for anything more themselves, one job at a time.

## 5. Secrets

**Settings → Secrets and variables → Actions**. Each secret is optional; the workflow that uses it does nothing until it exists.

| Secret | Used by | Minimum access |
|---|---|---|
| `PAGES_DEPLOY_TOKEN` | Study site to GitHub Pages | Fine-grained token: Contents read and write on `senayamyers27-art.github.io` only |
| `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | Study site deploy | Account → Cloudflare Pages → Edit |
| `CLOUDFLARE_ZONE_TOKEN`, `CLOUDFLARE_ZONE_ID` | Study site Cloudflare settings | Zone Settings Edit, Zone Read (and Zone Edit for DNSSEC), this zone only |
| `STUDY_API_*`, `STRIPE_*`, `TURNSTILE_SECRET_KEY` | Study site API deploy | See `PRO_LAUNCH.md` |
| `STUDY_API_BACKUP_AGE_RECIPIENT` (a variable, not a secret) | Study site API backup | An `age` public key; the private key stays offline with you |

**Keep the API's secrets in an environment.** Create **Settings → Environments → `study-api-production`** with **Deployment branches: `main` only** (and yourself as a required reviewer if you want to approve each deploy), and put the Cloudflare, Stripe and email secrets there instead of in the repository-wide list. Only the deploy job can then read them, and only for code already on `main`.

Give every token an expiry date and replace it before then. If a token might have leaked, revoke it first, then create a new one.

## 6. Notifications

- **Watch → Custom → Security alerts** on both repositories, so Dependabot and code scanning alerts reach you.
- **Settings → Notifications → Actions:** keep "Send notifications for failed workflows only" on. The integrity monitor, vulnerability check, ZAP scan and live check all report by failing, so a failure email is the alert. See `INCIDENT_RESPONSE.md` for what to do.

## 7. The private Pro repository

`cyber-study-pro` must stay **Private**. Give it the same branch ruleset (deletions and force pushes blocked), and don't add collaborators unless they need it.
