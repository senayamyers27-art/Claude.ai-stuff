# Narrated lesson videos

`tools/videos/make-videos.js` turns lessons into narrated MP4 videos with captions. It uses the same overview slides the site plays with "▶ Watch the overview", rendered at 1920×1080, and a free text-to-speech voice (Piper) that runs on your computer. You get:

- **Videos:** one MP4 per lesson, about 2 minutes each.
- **Captions:** a `.vtt` file per video.
- **Upload sheet:** `uploads.csv` with titles, descriptions and tags ready for YouTube.

Nothing is uploaded anywhere automatically.

## 1. Install the tools (once)

| Tool | Why | How |
|---|---|---|
| Node.js 20+ | runs the script | already needed for this repo |
| The repo's packages | Playwright draws the slides | `cd cyber-study && npm ci && npx playwright install chromium` |
| ffmpeg | joins slides and audio into video | Windows: `winget install Gyan.FFmpeg` · Mac: `brew install ffmpeg` · Linux: `sudo apt install ffmpeg` |
| Python 3.9+ and Piper | the narrator voice | `pip install piper-tts` |

## 2. Download a voice (once per language)

From `cyber-study/`:

```
python3 -m piper.download_voices --data-dir tools/videos/voices en_US-lessac-medium
python3 -m piper.download_voices --data-dir tools/videos/voices es_MX-claude-high
```

- **Other voices:** listen to samples at https://rhasspy.github.io/piper-samples/ and pass the one you pick with `--voice`.
- **Where the voices go:** the files land in `tools/videos/voices/`, which git ignores.
- **Windows:** use `python` instead of `python3`.

## 3. Make videos

```
node tools/videos/make-videos.js security-plus --only 1-5     # the first five lessons
node tools/videos/make-videos.js security-plus                 # every lesson
node tools/videos/make-videos.js security-plus --lang es       # Spanish lessons, Spanish voice
```

- **Where they go:** `cyber-study/videos/<cert>/` (git ignores this folder).
- **Time:** about 2 minutes of video per lesson, taking roughly 20–40 seconds each to make on a laptop.
- **Other options:**
  - `--voice <name>`: a different Piper voice.
  - `--tts "<command>"`: any other text-to-speech command that reads text on stdin and writes `{out}` (for example a paid cloud voice's command-line tool).
  - `--silent`: test the pipeline without a voice.
  - `--out <folder>`: write the videos somewhere else.
  - The environment variables `FFMPEG` and `PYTHON` point to those programs if they aren't on your PATH.

## 4. Upload to YouTube

1. **Create a channel.** Make a YouTube channel for StudyToCert, or use yours.
2. **Upload.** In **YouTube Studio → Create → Upload videos**, drop in the MP4s.
3. **Fill in the details.** For each video, copy the title and description from `uploads.csv`.
4. **Add captions.** Go to **Subtitles → Add language → Upload file → With timing** and choose the matching `.vtt`. This makes the videos accessible and searchable.
5. **Make a playlist.** Create one per certification (for example "Security+ SY0-701 lessons") and add the videos in order.
6. **Before uploading a lot,** watch a couple of videos and listen for mispronounced acronyms. Most voices read "SIEM" or "IAM" oddly. Tell Claude which words to fix, and it can add a pronunciation list.

## 5. Show the videos on the site

Send Claude the video links (or paste `uploads.csv` with a column of YouTube links). Claude adds them to `public/data/videos.js`. Each lesson then gets a "▶ Watch on YouTube" link next to the overview button. It's a plain link rather than an embedded player, so the site stays free of third-party cookies and needs no change to its security policy.
