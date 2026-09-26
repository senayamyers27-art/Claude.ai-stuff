#!/bin/bash
# Builds the in-browser practice VM into public/vendor/vm/:
#   the v86 emulator (npm "v86", BSD-2-Clause), SeaBIOS (Ubuntu "seabios"), xterm.js (npm "@xterm/xterm", MIT),
#   a 32-bit Linux kernel built from Ubuntu's linux-source-6.8.0 with tools/vm/kernel-i386.config, and an
#   initramfs made from Ubuntu 24.04 i386 packages plus tools/vm/overlay/.
# Run on Ubuntu 24.04 (amd64) as root:  bash tools/vm/build-vm.sh
# Needs: dpkg --add-architecture i386; apt-get install gcc-multilib bc flex bison libelf-dev cpio seabios linux-source-6.8.0 openssl
set -euo pipefail
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../.." && pwd)
OUT=$ROOT/public/vendor/vm; WORK=${WORK:-/tmp/studytocert-vm}
mkdir -p "$OUT" "$WORK"; cd "$WORK"

# 1. Kernel
if [ ! -f bzImage ]; then
  [ -d linux-source-6.8.0 ] || tar xjf /usr/src/linux-source-6.8.0.tar.bz2
  cp "$HERE/kernel-i386.config" linux-source-6.8.0/.config
  make -C linux-source-6.8.0 ARCH=i386 olddefconfig >/dev/null
  make -C linux-source-6.8.0 ARCH=i386 -j"$(nproc)" bzImage >/dev/null
  cp linux-source-6.8.0/arch/x86/boot/bzImage bzImage
fi

# 2. Userland from Ubuntu i386 packages
# The tools learners use; their libraries are pulled in automatically (i386, no recommends).
TOP="bash coreutils findutils grep sed gawk procps util-linux mount passwd login sudo less vim-tiny acl attr tar gzip bzip2 xz-utils
 iproute2 netcat-openbsd libpam-modules libpam-runtime libpam0g ncurses-base ncurses-bin diffutils psmisc hostname base-files debianutils
 libc-bin busybox-static"
SKIP="init-system-helpers perl-base cdebconf libdebian-installer4 libnewt0.52 libslang2 libtextwrap1 dpkg install-info debconf libdb5.3t64 file libmagic1t64 libmagic-mgc"
PKGS=$(apt-cache depends --recurse --no-recommends --no-suggests --no-conflicts --no-breaks --no-replaces --no-enhances \
  $(for p in $TOP; do echo "$p:i386"; done) 2>/dev/null | grep -E '^[a-z0-9]' | sed 's/:i386$//' | sort -u)
ALL="readline-common libaudit-common libsemanage-common vim-common libpam-runtime ncurses-base"
PKGS=$(for p in $PKGS; do case " $SKIP $ALL " in *" $p "*) ;; *) apt-cache show "$p:i386" >/dev/null 2>&1 && echo "$p:i386";; esac; done)
rm -rf debs rootfs && mkdir -p debs rootfs && chmod 777 debs
(cd debs && apt-get download $PKGS $ALL >/dev/null)
for d in debs/*.deb; do dpkg-deb -x "$d" rootfs; done
(cd debs && ls *.deb) > packages.txt
cd rootfs
# Merged /usr like a normal Ubuntu install.
for d in bin sbin lib; do if [ -d "$d" ] && [ ! -L "$d" ]; then mkdir -p "usr/$d"; cp -a "$d"/. "usr/$d"/; rm -rf "$d"; fi; ln -sfn "usr/$d" "$d"; done
# Trim documentation and translations; keep terminal definitions.
rm -rf usr/share/doc usr/share/man usr/share/info usr/share/locale usr/share/lintian usr/share/bug usr/share/bash-completion usr/lib/i386-linux-gnu/gconv \
  usr/share/vim/vim91/doc usr/share/vim/vim91/tutor usr/share/vim/vim91/spell usr/share/vim/vim91/lang usr/sbin/tc usr/sbin/arpd usr/lib/i386-linux-gnu/security/pam_userdb.so
# BusyBox fills in the tools Ubuntu doesn't ship for i386 (init helpers, ping, cron, syslog, mke2fs, vi fallback...).
for a in $(usr/bin/busybox --list); do [ -e "usr/bin/$a" ] || [ -e "usr/sbin/$a" ] || ln -s busybox "usr/bin/$a"; done
ln -sf vim.tiny usr/bin/vi; ln -sf vim.tiny usr/bin/vim; ln -sf gawk usr/bin/awk
printf '#!/bin/sh\nexec /usr/bin/busybox mke2fs "$@"\n' > usr/sbin/mkfs.ext2; chmod 755 usr/sbin/mkfs.ext2   # the kernel supports ext2 only
sed -i 's|^SHELL=/bin/sh|SHELL=/bin/bash|' etc/default/useradd
# Same PATH for everyone as a normal Ubuntu install (/etc/environment), so admin tools are found.
sed -i 's|^ENV_PATH.*|ENV_PATH\tPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin|' etc/login.defs
mkdir -p proc sys dev run tmp root home/student etc/skel var/log var/tmp var/spool/cron/crontabs mnt
# Files that package install scripts would normally create.
cp usr/share/base-files/profile etc/profile; cp usr/share/base-files/dot.profile root/.profile; cp usr/share/base-files/dot.bashrc root/.bashrc
cp -a "$HERE/overlay/." .
chmod 440 etc/sudoers.d/student
chmod u+s usr/bin/busybox   # BusyBox crontab needs it; the VM is a throwaway sandbox and student has sudo anyway
# Accounts: root/root and student/student (sudo).
R=$(openssl passwd -6 -salt studytocertroot root); S=$(openssl passwd -6 -salt studytocertstud student)
cat > etc/passwd <<P
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
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
sudo:x:27:student
users:x:100:
nogroup:x:65534:
student:x:1000:
G
printf 'root:%s:20000:0:99999:7:::\nstudent:%s:20000:0:99999:7:::\ndaemon:*:20000:0:99999:7:::\nbin:*:20000:0:99999:7:::\nsys:*:20000:0:99999:7:::\nnobody:*:20000:0:99999:7:::\n' "$R" "$S" > etc/shadow
sed 's/:.*//; s/$/:*::/' etc/group > etc/gshadow
chmod 640 etc/shadow etc/gshadow
cp -a etc/skel/. home/student/ 2>/dev/null || true
touch home/student/.sudo_as_admin_successful   # skip Ubuntu's "man sudo_root" hint (no man pages here)
chown -R 1000:1000 home/student; chmod 750 home/student; chmod 700 root
find . -print0 | cpio --null -o -H newc --quiet | xz -9 --check=crc32 > ../initrd.img
cd ..

# 3. Emulator, BIOS and terminal
rm -rf npm && mkdir npm && (cd npm && npm pack v86@0.5.462 @xterm/xterm@5 >/dev/null && for f in *.tgz; do mkdir -p "${f%.tgz}" && tar xzf "$f" -C "${f%.tgz}"; done)
V=$(ls -d npm/v86-*/package); X=$(ls -d npm/xterm-xterm-*/package)
cp "$V/build/libv86.js" "$V/build/v86.wasm" "$V/LICENSE" "$OUT/"; mv "$OUT/LICENSE" "$OUT/LICENSE-v86.txt"
cp "$X/lib/xterm.js" "$X/css/xterm.css" "$OUT/"; cp "$X/LICENSE" "$OUT/LICENSE-xterm.txt"
cp /usr/share/seabios/bios.bin "$OUT/seabios.bin"; cp /usr/share/seabios/vgabios-stdvga.bin "$OUT/vgabios.bin"
cp bzImage initrd.img "$OUT/"
{ echo "Built $(date -u +%Y-%m-%d) by tools/vm/build-vm.sh"; echo "Kernel: Ubuntu linux-source-6.8.0 $(dpkg-query -W -f='${Version}' linux-source-6.8.0), config tools/vm/kernel-i386.config";
  echo "SeaBIOS: Ubuntu seabios $(dpkg-query -W -f='${Version}' seabios)"; echo "v86 $(node -p "require('./$V/package.json').version")  xterm.js $(node -p "require('./$X/package.json').version")"; echo "Ubuntu 24.04 i386 packages in the initramfs:"; sed 's/^/  /' packages.txt; } > "$OUT/SOURCES.txt"
cp "$HERE/NOTICE.txt" "$OUT/NOTICE.txt"
ls -la "$OUT"
