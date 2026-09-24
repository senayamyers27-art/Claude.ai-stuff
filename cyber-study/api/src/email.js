/* Sends email through Resend's HTTP API when EMAIL_API_KEY is set.
   In development (APP_ENV=development) with no key, nothing is sent and the caller gets the
   link back instead, so the whole flow can be tested locally. */
import { HttpError } from "./util.js";

export async function sendEmail(env, { to, subject, text, html }) {
  if (!env.EMAIL_API_KEY) {
    if (env.APP_ENV === "development") return { devLink: true };
    throw new HttpError(503, "email_not_configured", "Sign-in email isn't set up yet.");
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.EMAIL_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.EMAIL_FROM, to: [to], subject, text, html })
  });
  if (!res.ok) throw new HttpError(502, "email_failed", "Couldn't send the email. Try again in a minute.");
  return { sent: true };
}
