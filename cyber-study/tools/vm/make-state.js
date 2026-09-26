/* Boots the practice VM once (bzImage + initrd.img from tools/vm/build-vm.sh) and saves the running machine as
   public/vendor/vm/state.bin.zst, so learners start in seconds instead of waiting for Linux to boot.
   The page sets the hostname, IP address, clock and terminal size through the checker service after restoring.
   Usage: node tools/vm/make-state.js [work dir]   (needs the zstd command). The emulator settings here must
   match the ones in public/assets/vm.js (memory, disks, serial ports, network card). */
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const OUT = path.join(__dirname, "../../public/vendor/vm");
const WORK = process.argv[2] || process.env.WORK || "/tmp/studytocert-vm";
const { V86 } = require(path.join(OUT, "libv86.js"));
const CFG = require(path.join(OUT, "config.json"));
const file = p => { const b = fs.readFileSync(p); return { buffer: b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) }; };

const emu = new V86({
  wasm_path: path.join(OUT, "v86.wasm"), memory_size: CFG.memoryMB * 1024 * 1024, vga_memory_size: 2 * 1024 * 1024,
  bios: file(path.join(OUT, "seabios.bin")), vga_bios: file(path.join(OUT, "vgabios.bin")),
  bzimage: file(path.join(WORK, "bzImage")), initrd: file(path.join(WORK, "initrd.img")), cmdline: CFG.cmdline,
  hda: { buffer: new ArrayBuffer(CFG.diskMB * 1024 * 1024) }, hdb: { buffer: new ArrayBuffer(CFG.diskMB * 1024 * 1024) },
  uart1: true, net_device: { type: "virtio", relay_url: "inbrowser", id: 0 },
  autostart: true, disable_keyboard: true, disable_mouse: true, disable_speaker: true
});
let con = "", agent = "", t0 = Date.now();
const strip = s => s.replace(/\x1b\[[0-9;?]*[a-zA-Z]|\x1b\][^\x07]*\x07/g, "");
emu.add_listener("serial0-output-byte", b => { con += String.fromCharCode(b); });
emu.add_listener("serial1-output-byte", b => { agent += String.fromCharCode(b); });
const ask = (id, cmd) => new Promise(res => {
  emu.serial_send_bytes(1, Buffer.from(`${id} ${Buffer.from(cmd).toString("base64")}\n`));
  const t = setInterval(() => { const m = agent.match(new RegExp(`@@${id} (\\d+) (\\S*)`)); if (m) { clearInterval(t); res([+m[1], Buffer.from(m[2], "base64").toString()]); } }, 200);
});
const until = (f, ms) => new Promise((res, rej) => { const t = setInterval(() => { if (f()) { clearInterval(t); res(); } else if (Date.now() - t0 > ms) { clearInterval(t); rej(new Error("timeout; console tail: " + strip(con).slice(-400))); } }, 250); });

(async () => {
  await until(() => agent.includes("@@ready") && /student@lab:~\$ $/.test(strip(con).slice(-40)), 300000);
  console.log(`booted in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  await new Promise(r => setTimeout(r, 8000)); // let services settle
  const [rc, st] = await ask(1, "systemctl is-system-running; systemctl --failed --no-legend; sync; echo 3 > /proc/sys/vm/drop_caches");
  console.log("system:", st.trim());
  if (!/^running/.test(st)) throw new Error("system is not in the running state");
  emu.serial0_send("clear\n");
  await new Promise(r => setTimeout(r, 2000));
  const state = Buffer.from(await emu.save_state());
  const raw = path.join(WORK, "state.bin");
  fs.writeFileSync(raw, state);
  execFileSync("zstd", ["-19", "-q", "-f", "-T0", raw, "-o", path.join(OUT, "state.bin.zst")]);
  console.log(`state: ${(state.length / 1048576).toFixed(0)} MB raw, ${(fs.statSync(path.join(OUT, "state.bin.zst")).size / 1048576).toFixed(1)} MB compressed`);
  emu.destroy(); process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
