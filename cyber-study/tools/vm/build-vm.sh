#!/bin/bash
# Builds the in-browser practice VM into public/vendor/vm/:
#   the v86 emulator (npm "v86", BSD-2-Clause), SeaBIOS (Ubuntu "seabios"), xterm.js (npm "@xterm/xterm", MIT),
#   a 32-bit Linux kernel built from Ubuntu's linux-source-6.8.0 with tools/vm/kernel-i386.config, and an
#   initramfs made from Ubuntu 24.04 i386 packages (systemd, OpenSSH, iptables, LVM, ...) plus tools/vm/overlay/.
# Run on Ubuntu 24.04 (amd64) as root:  bash tools/vm/build-vm.sh
# Needs: dpkg --add-architecture i386 && apt-get update
#        apt-get install gcc-multilib bc flex bison libelf-dev cpio seabios linux-source-6.8.0 openssl xz-utils nodejs npm
set -euo pipefail
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../.." && pwd)
OUT=$ROOT/public/vendor/vm; WORK=${WORK:-/tmp/studytocert-vm}
mkdir -p "$OUT" "$WORK"; cd "$WORK"

# 1. Kernel
if [ ! -f bzImage ] || [ "$HERE/kernel-i386.config" -nt bzImage ]; then
  [ -d linux-source-6.8.0 ] || tar xjf /usr/src/linux-source-6.8.0.tar.bz2
  cp "$HERE/kernel-i386.config" linux-source-6.8.0/.config
  make -C linux-source-6.8.0 ARCH=i386 olddefconfig >/dev/null
  make -C linux-source-6.8.0 ARCH=i386 -j"$(nproc)" bzImage >/dev/null
  cp linux-source-6.8.0/arch/x86/boot/bzImage bzImage
fi

# 2. Userland from Ubuntu i386 packages. The tools learners use; libraries come in automatically (no recommends).
TOP="systemd systemd-sysv dbus bash dash coreutils findutils grep sed gawk procps util-linux mount fdisk passwd login sudo less vim-tiny
 acl attr tar gzip bzip2 xz-utils zip unzip iproute2 iptables netcat-openbsd net-tools inetutils-ping inetutils-traceroute openssh-server openssh-client wget openssl
 cron lsof strace e2fsprogs xfsprogs dosfstools lvm2 parted gdisk udev bc jq diffutils psmisc hostname base-files debianutils libc-bin
 libpam-modules libpam-runtime libpam0g ncurses-base ncurses-bin busybox-static"
SKIP="init-system-helpers perl-base cdebconf libdebian-installer4 libnewt0.52 libslang2 libtextwrap1 dpkg install-info debconf
 libdb5.3t64 file libmagic1t64 libmagic-mgc systemd-timesyncd systemd-resolved networkd-dispatcher python3 python3-minimal systemd-dev tzdata ucf
 libicu74 python3.12 python3.12-minimal libpython3.12-minimal libpython3.12-stdlib libpython3-stdlib media-types"
ALL="readline-common libaudit-common libsemanage-common vim-common libpam-runtime ncurses-base cron-daemon-common
 dbus-system-bus-common dbus-session-bus-common libtirpc-common netbase sensible-utils"
PKGS=$(apt-cache depends --recurse --no-recommends --no-suggests --no-conflicts --no-breaks --no-replaces --no-enhances \
  $(for p in $TOP; do echo "$p:i386"; done) 2>/dev/null | grep -E '^[a-z0-9]' | sed 's/:i386$//' | sort -u)
# Architecture-independent packages download without the :i386 suffix.
PKGS=$(for p in $PKGS; do case " $SKIP $ALL " in *" $p "*) ;; *) a=$(apt-cache show "$p:i386" 2>/dev/null | awk '/^Architecture:/{print $2; exit}'); [ "$a" = all ] && echo "$p" || { [ -n "$a" ] && echo "$p:i386"; };; esac; done)
rm -rf debs rootfs && mkdir -p debs rootfs && chmod 777 debs
(cd debs && apt-get download $PKGS $ALL >/dev/null)
for d in debs/*.deb; do dpkg-deb -x "$d" rootfs; done
(cd debs && ls *.deb) > packages.txt
cd rootfs
# Merged /usr like a normal Ubuntu install.
for d in bin sbin lib; do if [ -d "$d" ] && [ ! -L "$d" ]; then mkdir -p "usr/$d"; cp -a "$d"/. "usr/$d"/; rm -rf "$d"; fi; ln -sfn "usr/$d" "$d"; done
# Trim documentation and translations; keep terminal definitions.
rm -rf usr/share/doc usr/share/man usr/share/info usr/share/locale usr/share/lintian usr/share/bug usr/share/bash-completion usr/lib/i386-linux-gnu/gconv \
  usr/share/vim/vim91/doc usr/share/vim/vim91/tutor usr/share/vim/vim91/spell usr/share/vim/vim91/lang usr/sbin/tc usr/sbin/arpd \
  usr/lib/i386-linux-gnu/security/pam_userdb.so usr/share/zsh usr/share/fish usr/sbin/xfs_scrub usr/sbin/xfs_scrub_all usr/lib/systemd/system/xfs_scrub* usr/lib/udev/hwdb.d etc/udev/hwdb.bin
# BusyBox fills in small tools Ubuntu doesn't ship for i386 (ping, httpd, nslookup, ...).
for a in $(usr/bin/busybox --list); do [ -e "usr/bin/$a" ] || [ -e "usr/sbin/$a" ] || ln -s busybox "usr/bin/$a"; done
rm -f usr/bin/init usr/bin/syslogd usr/bin/klogd   # systemd and journald do these
ln -sf vim.tiny usr/bin/vi; ln -sf vim.tiny usr/bin/vim; ln -sf gawk usr/bin/awk; ln -sf dash usr/bin/sh; ln -sf nc.openbsd usr/bin/nc; ln -sf nc.openbsd usr/bin/netcat
for t in iptables iptables-save iptables-restore ip6tables ip6tables-save ip6tables-restore; do ln -sf "xtables-nft-multi" "usr/sbin/$t"; done
ln -sf /usr/lib/systemd/systemd init
mkdir -p proc sys dev run tmp root home/student etc/skel var/log var/tmp var/spool/cron/crontabs var/backups mnt srv usr/local/bin usr/local/sbin usr/local/lib usr/local/share usr/local/etc usr/local/src
# Files that package install scripts would normally create.
cp usr/share/openssh/sshd_config etc/ssh/sshd_config; cp usr/share/base-files/profile etc/profile; cp usr/share/base-files/dot.profile root/.profile; cp usr/share/base-files/dot.bashrc root/.bashrc
cp -a "$HERE/overlay/." .
rm -f etc/update-motd.d/*   # just our own welcome text (/etc/motd)
chmod 440 etc/sudoers.d/student
sed -i 's|^SHELL=/bin/sh|SHELL=/bin/bash|' etc/default/useradd
# Same PATH for everyone as a normal Ubuntu install (/etc/environment), so admin tools are found.
sed -i 's|^ENV_PATH.*|ENV_PATH\tPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin|' etc/login.defs
# LVM without udev.
sed -i 's|^\(\s*\)# udev_sync = 1|\1udev_sync = 0|; s|^\(\s*\)# udev_rules = 1|\1udev_rules = 0|; s|^\(\s*\)# monitoring = 1|\1monitoring = 0|' etc/lvm/lvm.conf || true
# Accounts: root/root and student/student (sudo), plus the service accounts package scripts would add.
R=$(openssl passwd -6 -salt studytocertroot root); S=$(openssl passwd -6 -salt studytocertstud student)
cat > etc/passwd <<P
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
messagebus:x:100:101::/nonexistent:/usr/sbin/nologin
sshd:x:101:65534::/run/sshd:/usr/sbin/nologin
student:x:1000:1000:Student:/home/student:/bin/bash
P
cat > etc/group <<G
root:x:0:
daemon:x:1:
bin:x:2:
sys:x:3:
adm:x:4:student
tty:x:5:
disk:x:6:
utmp:x:43:
sudo:x:27:student
users:x:100:
messagebus:x:101:
crontab:x:102:
systemd-journal:x:103:
nogroup:x:65534:
student:x:1000:
G
printf 'root:%s:20000:0:99999:7:::\nstudent:%s:20000:0:99999:7:::\n' "$R" "$S" > etc/shadow
for u in daemon bin sys nobody messagebus sshd; do echo "$u:*:20000:0:99999:7:::" >> etc/shadow; done
sed 's/:.*//; s/$/:*::/' etc/group > etc/gshadow
chmod 640 etc/shadow etc/gshadow; chgrp 42 etc/shadow etc/gshadow 2>/dev/null || true
cp -a etc/skel/. home/student/ 2>/dev/null || true
touch home/student/.sudo_as_admin_successful   # skip Ubuntu's "man sudo_root" hint (no man pages here)
chown -R 1000:1000 home/student; chmod 750 home/student; chmod 700 root
chgrp 102 usr/bin/crontab && chmod 2755 usr/bin/crontab; chgrp 102 var/spool/cron/crontabs && chmod 1730 var/spool/cron/crontabs
mkdir -p run/sshd; chmod 755 run/sshd
# SSH host keys (the VM's own ssh-keygen, run in a chroot), a machine id, and the services to start.
mknod -m 666 dev/null c 1 3; chroot . /usr/bin/ssh-keygen -A >/dev/null; rm -f dev/null
openssl rand -hex 16 > etc/machine-id
W=etc/systemd/system
mkdir -p $W/multi-user.target.wants $W/sysinit.target.wants $W/sockets.target.wants $W/getty.target.wants
for u in ssh.service cron.service vm-agent.service; do ln -sf "/usr/lib/systemd/system/$u" "$W/multi-user.target.wants/$u" 2>/dev/null || true; done
ln -sf /etc/systemd/system/vm-agent.service $W/multi-user.target.wants/vm-agent.service
ln -sf /etc/systemd/system/vm-setup.service $W/sysinit.target.wants/vm-setup.service
ln -sf /usr/lib/systemd/system/dbus.socket $W/sockets.target.wants/dbus.socket
ln -sf /usr/lib/systemd/system/serial-getty@.service $W/getty.target.wants/serial-getty@ttyS0.service
# Units that don't apply inside a browser VM.
for u in systemd-remount-fs.service systemd-fsck-root.service systemd-firstboot.service systemd-modules-load.service kmod-static-nodes.service \
  systemd-binfmt.service sys-kernel-debug.mount sys-kernel-tracing.mount sys-kernel-config.mount sys-fs-fuse-connections.mount systemd-hwdb-update.service \
  ldconfig.service systemd-random-seed.service systemd-pcrphase.service systemd-pcrphase-sysinit.service systemd-tpm2-setup.service \
  systemd-tpm2-setup-early.service lvm2-monitor.service dm-event.socket dm-event.service lvm2-lvmpolld.socket getty@tty1.service \
  systemd-networkd.service systemd-networkd-wait-online.service systemd-networkd.socket e2scrub_reap.service e2scrub_all.timer \
  systemd-boot-update.service systemd-update-utmp.service systemd-update-utmp-runlevel.service apt-daily.timer fstrim.timer; do ln -sf /dev/null "$W/$u"; done
find . -print0 | cpio --null -o -H newc --quiet | xz -9 --check=crc32 > ../initrd.img
cd ..

# 3. Emulator, BIOS and terminal
rm -rf npm && mkdir npm && (cd npm && npm pack v86@0.5.462 @xterm/xterm@5 >/dev/null && for f in *.tgz; do mkdir -p "${f%.tgz}" && tar xzf "$f" -C "${f%.tgz}"; done)
V=$(ls -d npm/v86-*/package); X=$(ls -d npm/xterm-xterm-*/package)
cp "$V/build/libv86.js" "$V/build/v86.wasm" "$OUT/"; cp "$V/LICENSE" "$OUT/LICENSE-v86.txt"
cp "$X/lib/xterm.js" "$X/css/xterm.css" "$OUT/"; cp "$X/LICENSE" "$OUT/LICENSE-xterm.txt"
cp /usr/share/seabios/bios.bin "$OUT/seabios.bin"; cp /usr/share/seabios/vgabios-stdvga.bin "$OUT/vgabios.bin"
rm -f "$OUT/bzImage" "$OUT/initrd.img"   # learners start from the saved state instead (step 4)
{ echo "Built $(date -u +%Y-%m-%d) by tools/vm/build-vm.sh"; echo "Kernel: Ubuntu linux-source-6.8.0 $(dpkg-query -W -f='${Version}' linux-source-6.8.0), config tools/vm/kernel-i386.config";
  echo "SeaBIOS: Ubuntu seabios $(dpkg-query -W -f='${Version}' seabios)"; echo "v86 $(node -p "require('./$V/package.json').version")  xterm.js $(node -p "require('./$X/package.json').version")"; echo "Ubuntu 24.04 i386 packages in the initramfs:"; sed 's/^/  /' packages.txt; } > "$OUT/SOURCES.txt"
cp "$HERE/NOTICE.txt" "$OUT/NOTICE.txt"
# 4. Boot once and save the running machine (public/vendor/vm/state.bin.zst).
node "$HERE/make-state.js" "$WORK"
ls -la "$OUT"
