/* The signed-in person's profile: a display name, a short "about me", the certification they're working
   toward and study hours a week. Private to them: no other user or page can read it. */
import { bad } from "./util.js";
import { audit } from "./audit.js";
import { enabledProviders, cleanName, PROVIDERS } from "./oauth.js";
import CERTS from "./cert-meta.js";

export async function getProfile(env, user) {
  const u = await env.DB.prepare("SELECT email, created_at, display_name, bio, goal_cert, weekly_hours FROM users WHERE id = ?").bind(user.id).first();
  const ids = (await env.DB.prepare("SELECT provider, email, created_at, last_used_at FROM identities WHERE user_id = ? ORDER BY created_at").bind(user.id).all()).results || [];
  return {
    email: u.email, createdAt: u.created_at,
    displayName: u.display_name || "", bio: u.bio || "", goalCert: u.goal_cert || "", weeklyHours: u.weekly_hours || null,
    identities: ids.filter(i => PROVIDERS[i.provider]).map(i => ({ provider: i.provider, email: i.email, createdAt: i.created_at, lastUsedAt: i.last_used_at })),
    providers: enabledProviders(env)
  };
}

export async function updateProfile(env, request, user, body) {
  const displayName = body.displayName == null ? null : cleanName(body.displayName);
  const bio = body.bio == null ? "" : String(body.bio).replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim();
  if (bio.length > 280) throw bad("bio_too_long", "Keep “About me” to 280 characters.");
  const goalCert = body.goalCert ? String(body.goalCert) : null;
  if (goalCert && !Object.prototype.hasOwnProperty.call(CERTS, goalCert)) throw bad("unknown_cert", "Pick a certification from the list.");
  let weeklyHours = body.weeklyHours === "" || body.weeklyHours == null ? null : Number(body.weeklyHours);
  if (weeklyHours !== null && (!Number.isInteger(weeklyHours) || weeklyHours < 1 || weeklyHours > 80)) throw bad("bad_hours", "Study hours a week must be a whole number from 1 to 80.");
  await env.DB.prepare("UPDATE users SET display_name = ?, bio = ?, goal_cert = ?, weekly_hours = ? WHERE id = ?")
    .bind(displayName, bio || null, goalCert, weeklyHours, user.id).run();
  await audit(env, request, { actor: user.id, action: "profile.updated" });
  return getProfile(env, user);
}
