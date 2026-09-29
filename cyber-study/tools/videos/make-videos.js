#!/usr/bin/env node
/* Turns lessons into narrated MP4 videos with captions, from the same overview slides the site plays.
   For each lesson: render every slide at 1920x1080 with the site's own styles (Playwright), speak its narration
   with a text-to-speech voice (Piper by default: free, runs offline), and join them with ffmpeg. Also writes a
   WebVTT caption file per video and uploads.csv with titles and descriptions ready for YouTube.
   Setup and options: docs/VIDEOS.md.
   Usage: node tools/videos/make-videos.js <cert-id> [--lang en|es] [--only 1-5] [--voice <piper model>]
          [--tts "<command reading text on stdin and writing {out}>"] [--silent] [--out videos] */
const fs = require("fs"), path = require("path"), os = require("os");
const { spawnSync, execFileSync } = require("child_process");
const { chromium } = require("playwright");
const { serve } = require("../serve.js");

const ROOT = path.join(__dirname, "../..");
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf("--" + k); return i >= 0 ? args[i + 1] : d; };
const flag = k => args.includes("--" + k);
const cert = args.find(a => !a.startsWith("--") && !args[args.indexOf(a) - 1]?.startsWith("--"));
if (!cert || !/^[a-z0-9-]+$/.test(cert)) { console.error("Usage: node tools/videos/make-videos.js <cert-id> [--lang en|es] [--only 1-5] [--voice model] [--tts cmd] [--silent]"); process.exit(1); }
const LANG = opt("lang", "en") === "es" ? "es" : "en";
const OUT = path.resolve(opt("out", path.join(ROOT, "videos")), cert + (LANG === "es" ? "-es" : ""));
const VOICE = opt("voice", LANG === "es" ? "es_MX-claude-high" : "en_US-lessac-medium");
const SILENT = flag("silent"); // for testing the pipeline without a voice: timed silence instead of speech
const TTS = opt("tts", null);
const FFMPEG = process.env.FFMPEG || (() => { try { return require("ffmpeg-static"); } catch (e) { return "ffmpeg"; } })();
const FFPROBE = process.env.FFPROBE || FFMPEG.replace(/ffmpeg(\.exe)?$/, "ffprobe$1");
const only = (opt("only", "") || "").match(/^(\d+)(?:-(\d+))?$/);

const run = (cmd, a, input) => { const r = spawnSync(cmd, a, { input, encoding: input == null ? undefined : "utf8", maxBuffer: 1 << 26 }); if (r.status !== 0) throw new Error(`${cmd} ${a.slice(0, 4).join(" ")} failed: ${(r.stderr || "").toString().slice(-600)}`); return r; };
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const plain = h => h.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();

// Seconds of audio in a WAV file (ffmpeg -i prints the duration).
function duration(file) {
  const r = spawnSync(FFMPEG, ["-hide_banner", "-i", file], { encoding: "utf8" });
  const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(r.stderr || ""); if (!m) throw new Error("couldn't read the length of " + file);
  return +m[1] * 3600 + +m[2] * 60 + +m[3];
}
// Narration for one slide to a WAV file.
function speak(text, wav) {
  if (SILENT) { const secs = Math.max(3, text.split(/\s+/).length / 2.6); run(FFMPEG, ["-y", "-loglevel", "error", "-f", "lavfi", "-i", "anullsrc=r=22050:cl=mono", "-t", secs.toFixed(2), wav]); return; }
  if (TTS) { run(process.platform === "win32" ? "cmd" : "sh", process.platform === "win32" ? ["/c", TTS.replace("{out}", wav)] : ["-c", TTS.replace("{out}", `'${wav}'`)], text); return; }
  run(process.env.PYTHON || (process.platform === "win32" ? "python" : "python3"), ["-m", "piper", "-m", VOICE, "--data-dir", path.join(ROOT, "tools/videos/voices"), "-f", wav, "--sentence-silence", "0.35"], text);
}
// Captions: split each slide's narration into short cues spread over its audio.
function vtt(parts) {
  const ts = s => { const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, x = (s % 60).toFixed(3).padStart(6, "0"); return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${x}`; };
  let t = 0, out = "WEBVTT\n\n", n = 1;
  for (const { text, secs } of parts) {
    const words = text.split(/\s+/), chunks = [];
    for (let i = 0; i < words.length; i += 12) chunks.push(words.slice(i, i + 12).join(" "));
    const per = secs / Math.max(1, chunks.length);
    chunks.forEach((c, i) => { out += `${n++}\n${ts(t + i * per)} --> ${ts(t + (i + 1) * per - 0.05)}\n${c}\n\n`; });
    t += secs;
  }
  return out;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "stc-video-"));
  const server = await serve(0), base = `http://localhost:${server.address().port}`;
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5, reducedMotion: "reduce", colorScheme: "light" });
  await page.goto(`${base}/`);
  await page.evaluate(l => localStorage.setItem("certhub:lang", l), LANG);
  await page.goto(`${base}/#${cert}.learn`); await page.reload();
  await page.waitForFunction(() => CertHub.certView && CertHub.certView.lessonTopics().length > 0, null, { timeout: 60000 });
  const meta = await page.evaluate(id => { const c = CertHub.certs[id]; return { name: c.name, short: c.short, exam: c.exam }; }, cert);
  let topics = await page.evaluate(() => CertHub.certView.lessonTopics());
  const pick = only ? topics.map((t, i) => [t, i + 1]).filter(([, n]) => n >= +only[1] && n <= +(only[2] || only[1])) : topics.map((t, i) => [t, i + 1]);
  console.log(`${meta.short} ${meta.exam}: ${pick.length} of ${topics.length} lessons -> ${path.relative(process.cwd(), OUT)}`);
  const rows = [["file", "title", "description", "tags"]];
  const origin = process.env.SITE_URL || "https://senayamyers27-art.github.io";

  for (const [topic, n] of pick) {
    const slides = await page.evaluate(t => CertHub.certView.slides(t).map(s => ({ h: s.h, say: s.say })), topic);
    const name = `${String(n).padStart(3, "0")}-${slug(topic)}`, parts = [], list = [];
    for (let i = 0; i < slides.length; i++) {
      // Draw the slide full screen with the site's styles, larger type for video.
      await page.evaluate(({ h, kicker }) => {
        document.body.innerHTML = `<div class="vid"><div class="ov-stage vid-stage"><div class="ov-slide">${h}</div></div><div class="vid-foot"><span>StudyToCert</span><span>${kicker}</span></div></div>`;
      }, { h: slides[i].h, kicker: `${meta.short} ${meta.exam}`.replace(/[<&>]/g, "") });
      await page.addStyleTag({ content: `body{margin:0;background:var(--bg)} .vid{width:1280px;height:720px;box-sizing:border-box;padding:40px 56px;display:flex;flex-direction:column;gap:18px}
        .vid-stage{flex:1;min-height:0;margin:0;padding:40px 56px;border-radius:24px} .vid .ov-kicker{font-size:22px} .vid .ov-title{font-size:52px} .vid .ov-lead{font-size:34px}
        .vid .ov-sub{font-size:22px} .vid .ov-list{font-size:30px} .vid .ov-terms dt{font-size:28px} .vid .ov-terms dd{font-size:24px} .vid .ov-fig svg{max-height:430px;width:100%}
        .vid-foot{display:flex;justify-content:space-between;font:600 18px system-ui,sans-serif;color:var(--muted)}` });
      const png = path.join(tmp, `${name}-${i}.png`), wav = path.join(tmp, `${name}-${i}.wav`), mp4 = path.join(tmp, `${name}-${i}.mp4`);
      await page.screenshot({ path: png });
      speak(slides[i].say, wav);
      const secs = duration(wav) + 0.6;
      run(FFMPEG, ["-y", "-loglevel", "error", "-loop", "1", "-framerate", "30", "-i", png, "-i", wav, "-af", "apad=pad_dur=0.6", "-t", secs.toFixed(2),
        "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-shortest", mp4]);
      parts.push({ text: slides[i].say, secs }); list.push(`file '${mp4.replace(/'/g, "'\\''")}'`);
    }
    const listFile = path.join(tmp, name + ".txt"); fs.writeFileSync(listFile, list.join("\n"));
    const out = path.join(OUT, name + ".mp4");
    run(FFMPEG, ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", "-movflags", "+faststart", out]);
    fs.writeFileSync(path.join(OUT, name + ".vtt"), vtt(parts));
    const title = plain(slides[0].h.replace(/^.*?<h2[^>]*>|<\/h2>.*$/gs, "")) || topic;
    const desc = `${meta.name} (${meta.exam}): ${title}. A short narrated overview. Read the full free lesson, take quizzes and track your progress: ${origin}/${cert}/lessons/`;
    rows.push([name + ".mp4", `${title} | ${meta.short} ${meta.exam}`.slice(0, 100), desc, [meta.short, meta.exam, "certification", "study"].join(",")]);
    console.log(`  ✓ ${name}.mp4 (${Math.round(parts.reduce((a, p) => a + p.secs, 0))} s, ${slides.length} slides)`);
  }
  fs.writeFileSync(path.join(OUT, "uploads.csv"), rows.map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n") + "\n");
  await browser.close(); server.close(); fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`Done. Captions (.vtt) and uploads.csv are next to the videos.`);
})().catch(e => { console.error(e.message || e); process.exit(1); });
