/* Tests every graded VM lab (public/data/vmlabs.js) against the real VM: on a fresh VM each check must fail,
   and after a reference solution each check must pass. Usage: node tools/vm/test-labs.js [lab-id ...]
   Slow (about 20 s per lab), so it's not part of npm run check; run it after changing the VM or the labs. */
const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "../../public/vendor/vm");
const { V86 } = require(path.join(OUT, "libv86.js"));
const CFG = require(path.join(OUT, "config.json"));
global.CertHub = {}; require(path.join(__dirname, "../../public/data/vmlabs.js"));
const file = p => { const b = fs.readFileSync(p); return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength); };
const STATE = file(path.join(OUT, "state.bin.zst")), BIOS = file(path.join(OUT, "seabios.bin")), VGA = file(path.join(OUT, "vgabios.bin"));
const HOSTS = { lab: ["lab", "10.10.0.30/24", "1e"], server: ["server", "10.10.0.10/24", "0a"], client: ["client", "10.10.0.20/24", "14"] };

// Reference solutions (as root). "client:" / "server:" pick the machine in network labs.
const SOLVE = {
  "ssh-investigation": ["echo '203.0.113.45 deploy' > /root/incident/findings.txt; iptables -I INPUT -s 203.0.113.45 -j DROP; mkdir -p /etc/iptables; iptables-save > /etc/iptables/rules.v4; usermod -L deploy"],
  "ssh-hardening": ["printf 'PermitRootLogin no\\nMaxAuthTries 3\\nLoginGraceTime 30\\nX11Forwarding no\\n' > /etc/ssh/sshd_config.d/10-hardening.conf; sshd -t && systemctl reload ssh"],
  "file-integrity": ["echo /opt/app/bin/backup.sh > /root/incident/changed.txt; cp -p /opt/app/release/backup.sh /opt/app/bin/"],
  "sudo-audit": ["rm /etc/sudoers.d/90-temp; gpasswd -d intern sudo >/dev/null; usermod -L -e 1 contractor"],
  "permissions-audit": ["chmod u-s /usr/local/bin/findx; chown root:root /etc/app.conf; chmod 640 /etc/app.conf; chmod 1777 /srv/share"],
  persistence: ["echo 'sys-update-helper.service 4444' > /root/incident/listener.txt; systemctl disable --now sys-update-helper >/dev/null 2>&1; rm /etc/systemd/system/sys-update-helper.service; systemctl daemon-reload; crontab -l | grep -v sysupd | crontab -; rm -r /usr/local/lib/.sysupd; sleep 1"],
  "cron-review": ["echo /etc/cron.d/logrotate-helper > /root/incident/cron.txt; rm /etc/cron.d/logrotate-helper /usr/local/sbin/.cache-sync"],
  "web-log-review": ["echo '198.51.100.23 /download?file=../../../../etc/passwd' > /root/incident/web.txt; iptables -I INPUT -s 198.51.100.23 -j DROP; mkdir -p /etc/iptables; iptables-save > /etc/iptables/rules.v4"],
  "backdoor-account": ["echo sysadm > /root/incident/accounts.txt; userdel -f sysadm; sed -i '/unknown@203.0.113.45/d' /root/.ssh/authorized_keys"],
  "default-deny": ["iptables -A INPUT -i lo -j ACCEPT; iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT; iptables -A INPUT -p tcp --dport 22 -j ACCEPT; iptables -A INPUT -p icmp -j ACCEPT; iptables -P INPUT DROP; iptables-save > /etc/iptables/rules.v4"],
  "name-resolution": ["sed -i 's/^10.10.0.99 .*fileserver.*/10.10.0.30  fileserver.lab fileserver/' /etc/hosts; sed -i 's/^hosts:.*/hosts:          files dns/' /etc/nsswitch.conf"],
  "restore-backup": ["tar -xzpf /var/backups/data-weekly.tar.gz -C / srv/data/config.yml; tar -czpf /var/backups/data-new.tar.gz -C / srv/data"],
  users: ["groupadd devs; useradd -m -s /bin/bash -G devs alex; echo 'alex:Tr41n-ing!' | chpasswd; chage -M 90 alex"],
  "shared-dir": ["groupadd -f devs; mkdir -p /srv/projects; chown root:devs /srv/projects; chmod 2770 /srv/projects; touch /srv/projects/plan.txt; chmod 640 /srv/projects/plan.txt"],
  acl: ["useradd -m bob; echo 'Q3 numbers' > /srv/report.txt; chmod 600 /srv/report.txt; setfacl -m u:bob:r /srv/report.txt"],
  sudo: ["groupadd ops; useradd -m -G ops olivia; echo '%ops ALL=(root) NOPASSWD: /usr/bin/systemctl restart ssh' > /etc/sudoers.d/ops; chmod 440 /etc/sudoers.d/ops"],
  service: [`printf '#!/bin/bash\\nwhile true; do echo "heartbeat $(date)"; sleep 30; done\\n' > /usr/local/bin/heartbeat.sh; chmod +x /usr/local/bin/heartbeat.sh
printf '[Unit]\\nDescription=Heartbeat\\n[Service]\\nExecStart=/usr/local/bin/heartbeat.sh\\nRestart=on-failure\\n[Install]\\nWantedBy=multi-user.target\\n' > /etc/systemd/system/heartbeat.service
systemctl daemon-reload; systemctl enable --now heartbeat; sleep 3`],
  timer: [`mkdir -p /var/backups
printf '[Unit]\\nDescription=Back up /etc\\n[Service]\\nType=oneshot\\nExecStart=/usr/bin/tar -czf /var/backups/etc.tar.gz /etc\\n' > /etc/systemd/system/backup.service
printf '[Unit]\\nDescription=Back up /etc every 15 minutes\\n[Timer]\\nOnCalendar=*:0/15\\n[Install]\\nWantedBy=timers.target\\n' > /etc/systemd/system/backup.timer
systemctl daemon-reload; systemctl enable --now backup.timer; systemctl start backup.service`],
  cron: [`su - student -c "mkdir -p ~/tmp; printf '#!/bin/bash\\nfind /home/student/tmp -name \\"*.tmp\\" -mtime +7 -delete\\n' > ~/cleanup.sh; chmod +x ~/cleanup.sh; echo '30 2 * * * /home/student/cleanup.sh' | crontab -"`],
  lvm: [`pvcreate -q /dev/sda /dev/sdb; vgcreate -q vgdata /dev/sda /dev/sdb; lvcreate -q -n lvweb -L 60M vgdata; mkfs.ext4 -q /dev/vgdata/lvweb; mkdir -p /srv/web
mount /dev/vgdata/lvweb /srv/web; echo '/dev/vgdata/lvweb /srv/web ext4 defaults 0 2' >> /etc/fstab; lvextend -q -r -L 100M /dev/vgdata/lvweb`],
  partitions: [`parted -s /dev/sdb mklabel gpt mkpart data ext4 1MiB 41MiB mkpart swap linux-swap 41MiB 100%; sleep 1; mkfs.ext4 -q /dev/sdb1; mkswap -q /dev/sdb2 >/dev/null
mkdir -p /data; mount /dev/sdb1 /data; swapon /dev/sdb2
echo "UUID=$(blkid -o value -s UUID /dev/sdb1) /data ext4 defaults 0 2" >> /etc/fstab; echo "UUID=$(blkid -o value -s UUID /dev/sdb2) none swap sw 0 0" >> /etc/fstab`],
  journal: ["mkdir -p /var/log/journal /etc/systemd/journald.conf.d; printf '[Journal]\\nSystemMaxUse=50M\\n' > /etc/systemd/journald.conf.d/size.conf; systemctl restart systemd-journald; journalctl --flush; sleep 2"],
  processes: ["renice -n 15 -p $(pgrep -f '^datasync') >/dev/null; kill $(pgrep -f '^cleanup-old'); sleep 1"],
  firewall: [`iptables -A INPUT -i lo -j ACCEPT; iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT; iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT; iptables -P INPUT DROP; mkdir -p /etc/iptables; iptables-save > /etc/iptables/rules.v4`],
  "ssh-keys": ["client:su - student -c \"ssh-keygen -q -t ed25519 -N '' -f ~/.ssh/id_ed25519\"", "copykey", "server:echo 'PasswordAuthentication no' > /etc/ssh/sshd_config.d/50-keys-only.conf; systemctl reload ssh; sleep 1"],
  "web-service": [`server:mkdir -p /srv/www; echo 'Welcome to the StudyToCert server' > /srv/www/index.html
printf '[Unit]\\nDescription=Web\\n[Service]\\nExecStart=/usr/bin/busybox httpd -f -p 80 -h /srv/www\\n[Install]\\nWantedBy=multi-user.target\\n' > /etc/systemd/system/web.service
systemctl daemon-reload; systemctl enable --now web; sleep 1`],
  "firewall-pair": ["server:iptables -A INPUT -i lo -j ACCEPT; iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT; iptables -A INPUT -p tcp -s 10.10.0.20 --dport 22 -j ACCEPT; iptables -A INPUT -p icmp -j ACCEPT; iptables -P INPUT DROP"]
};

function boot(host) {
  const e = new V86({ wasm_path: path.join(OUT, "v86.wasm"), memory_size: CFG.memoryMB << 20, vga_memory_size: 2 << 20, bios: { buffer: BIOS }, vga_bios: { buffer: VGA },
    initial_state: { buffer: STATE.slice(0) }, hda: { buffer: new ArrayBuffer(CFG.diskMB << 20) }, hdb: { buffer: new ArrayBuffer(CFG.diskMB << 20) }, uart1: true,
    net_device: { type: "virtio", relay_url: "inbrowser", id: 0 }, autostart: true, disable_keyboard: true, disable_mouse: true, disable_speaker: true });
  const vm = { e, ag: "", n: 0 };
  e.add_listener("serial1-output-byte", b => { vm.ag += String.fromCharCode(b); });
  vm.run = cmd => new Promise((res, rej) => {
    const id = ++vm.n; e.serial_send_bytes(1, Buffer.from(`${id} ${Buffer.from(cmd).toString("base64")}\n`));
    const t0 = Date.now(), t = setInterval(() => { const m = vm.ag.match(new RegExp(`@@${id} (\\d+) (\\S*)`)); if (m) { clearInterval(t); res({ rc: +m[1], out: Buffer.from(m[2], "base64").toString() }); } else if (Date.now() - t0 > 150000) { clearInterval(t); rej(new Error("checker timeout")); } }, 100);
  });
  vm.ready = new Promise(r => e.add_listener("emulator-started", () => setTimeout(r, 300))).then(() => {
    const [name, ip, mac] = HOSTS[host];
    return vm.run(`date -s @${Math.floor(Date.now() / 1000)} >/dev/null; hostname ${name}; echo ${name} > /etc/hostname; sed -i 's/^127.0.1.1.*/127.0.1.1\\t${name}/' /etc/hosts; ip link set eth0 address 02:00:0a:0a:00:${mac}; ip addr add ${ip} dev eth0; ip link set eth0 up`);
  });
  return vm;
}

(async () => {
  const only = process.argv.slice(2), labs = CertHub.vmLabs.labs.filter(l => !only.length || only.includes(l.id));
  let bad = 0;
  for (const lab of labs) {
    const t0 = Date.now(), vms = lab.mode === "network" ? { server: boot("server"), client: boot("client") } : { lab: boot("lab") };
    await Promise.all(Object.values(vms).map(v => v.ready));
    const on = c => vms[c.vm || (lab.mode === "network" ? "server" : "lab")];
    if (lab.setup) await vms[lab.mode === "network" ? "server" : "lab"].run(lab.setup);
    const results = async () => { const r = []; for (const c of lab.checks) r.push((await on(c).run(c.cmd)).rc === 0); return r; };
    const before = await results();
    for (const step of SOLVE[lab.id] || []) {
      if (step === "copykey") { const k = (await vms.client.run("cat /home/student/.ssh/id_ed25519.pub")).out.trim(); await vms.server.run(`install -d -m 700 -o student -g student /home/student/.ssh; echo '${k}' >> /home/student/.ssh/authorized_keys; chown student:student /home/student/.ssh/authorized_keys; chmod 600 /home/student/.ssh/authorized_keys`); continue; }
      const m = step.match(/^(server|client):([\s\S]*)$/), r = await (m ? vms[m[1]] : Object.values(vms)[0]).run(m ? m[2] : step);
      if (r.rc !== 0 && r.out) console.log(`   (solution output: ${r.out.trim().slice(0, 300)})`);
    }
    const after = await results();
    const problems = lab.checks.map((c, i) => [c, before[i], after[i]]).filter(([c, b, a]) => (b && !c.keep) || !a);
    console.log(`${problems.length ? "✗" : "✓"} ${lab.id} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
    for (const [c, b, a] of problems) { bad++; console.log(`   ${b ? "passes before the work" : "fails after the solution"}: ${c.label}`); if (!a) console.log("     " + (await on(c).run(c.cmd)).out.trim().slice(0, 300)); }
    if (problems.length && process.env.DEBUG) console.log((await Object.values(vms)[0].run(process.env.DEBUG)).out);
    Object.values(vms).forEach(v => v.e.destroy());
  }
  console.log(bad ? `${bad} check problem(s).` : "All lab checks behave.");
  process.exit(bad ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
