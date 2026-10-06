# Backups, restore tests and owner alerts

## What is backed up

| Copy | Where | How far back | Readable by |
|---|---|---|---|
| D1 Time Travel | Cloudflare | Any minute in the last 30 days | Your Cloudflare account |
| Daily encrypted export | GitHub Actions artifact ("Study site API backup") | 35 days | Only the holder of your age private key |

Members-only lessons and teacher plans in R2 aren't backed up separately: every API deploy rebuilds and re-uploads them from the repository.

## One-time setup

1. On your own computer, install [age](https://github.com/FiloSottile/age) and run `age-keygen -o studytocert-backup.key`.
2. Copy the `age1…` public key it prints into the repository variable `STUDY_API_BACKUP_AGE_RECIPIENT` (Settings, Secrets and variables, Actions, Variables).
3. Keep `studytocert-backup.key` offline: a password manager, plus an encrypted USB stick. Without it nobody, including you, can read the backups.

## Test a restore (recommended every few months)

The "Study site API restore test" workflow loads a backup into a new, temporary database, counts the rows in the main tables, then deletes the temporary database. It never touches the live database.

Setup, once:
1. Settings, Environments, New environment, named `restore`. Add yourself as a required reviewer.
2. In that environment, add the secret `STUDY_API_BACKUP_AGE_KEY` with the whole contents of `studytocert-backup.key`.
3. Make sure the `CLOUDFLARE_API_TOKEN` secret has "D1: Edit" permission.

Then: Actions, "Study site API restore test", Run workflow (leave the run ID blank for the latest backup), approve the run when GitHub asks. The run summary shows the row counts.

If you'd rather never store the private key in GitHub, skip the workflow and restore on your own computer:

```sh
# download the backup artifact zip from the backup run, unzip it, then:
age -d -i studytocert-backup.key -o backup.sql backup.sql.age
npx wrangler d1 create cyber-cert-study-restore-test
npx wrangler d1 execute cyber-cert-study-restore-test --remote --file backup.sql
```

## A real restore

1. First try D1 Time Travel (Cloudflare dashboard, D1, the database, Time Travel): it restores to any minute in the last 30 days.
2. Otherwise, load the backup into a new database as above, check it, then change `database_id` in `api/wrangler.toml` to the new database and deploy. Keep the old database until you're sure.

## Owner emails

Sent to the addresses in `STUDY_API_ADMIN_EMAILS`, by the API's hourly job:

- **Error alert**: when the API has 5 or more unexpected errors in an hour (change it with the `ERROR_ALERT_MIN` variable in `api/wrangler.toml`), at most one email an hour. It lists the routes and error lines only: never request bodies, email addresses or IP addresses. Errors are kept 30 days.
- **Weekly summary**: Mondays at 14:00 UTC: new accounts, who studied, plans and failing payments, most studied certifications, classes, stories waiting for approval and the week's server errors.

Both need `STUDY_API_ADMIN_EMAILS` and the email key (`STUDY_API_EMAIL_KEY`) to be set.
