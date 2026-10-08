/* Lessons for CompTIA Linux+ (XK0-006): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("linux-plus", [
 {
  "t": "Boot process: UEFI/BIOS, GRUB2, kernel, initramfs (dracut, mkinitramfs), systemd targets",
  "hook": "It is 6:40 a.m. at Lakeshore Freight, and the warehouse scanners cannot reach their inventory server. Dev, the overnight admin, rebooted it after a storage upgrade, and now the remote console shows a blinking prompt that says `dracut:/#` and something about a root device that cannot be found. The trucks start loading at 8:00. Dev wants to reinstall the operating system, but you notice something important on the screen: the boot menu appeared, a kernel started, and only then did things go wrong. That means several stages of the boot worked perfectly. Which stage actually failed, and what single command could put the server back in service before the first truck backs up to the dock?",
  "simple": "When you press the power button, a computer does not jump straight to the login screen. It goes through a relay race. First the built-in chip on the motherboard (the firmware) wakes up and finds the disk. It hands off to a small program called the boot loader, which shows a menu and loads the core of Linux, the kernel. The kernel then uses a tiny starter kit kept in memory, the initramfs, to find and open the main disk. Finally a manager program called systemd starts all the services and decides whether you get a desktop or a plain text screen. It is like starting a car: the key turns on the electrics, the starter motor spins the engine, and then the engine runs on its own. If you know which runner dropped the baton, you know what to fix.",
  "body": [
   "Every time a Linux machine powers on, it walks through a predictable chain of hand-offs: firmware, boot loader, kernel, initial RAM (random access memory) filesystem, and finally the init system. Each stage has one job and then passes control to the next. Knowing that order lets you work out where a broken boot stopped and which tool fixes it, and that is exactly how Linux+ questions are framed: they describe what you see on the screen and ask what to change. The skill to build is reading a symptom and placing it on the chain.",
   "The firmware comes first. Older machines use BIOS (Basic Input/Output System), which reads the first sector of the boot disk, the MBR (Master Boot Record), and runs the small piece of boot code stored there. Modern machines use UEFI (Unified Extensible Firmware Interface), which instead reads an ESP (EFI System Partition), a small partition formatted with FAT (File Allocation Table) usually mounted at `/boot/efi`, and runs an EFI executable such as `grubx64.efi` or `shimx64.efi`. UEFI keeps its list of boot entries in firmware variables, which you can view with `efibootmgr -v`; that list is why a UEFI system can boot several operating systems without any boot sector at all. UEFI also supports Secure Boot, where the firmware only runs boot loaders signed with trusted keys; the signed shim is what lets distributions boot under Secure Boot. To check which mode you booted in, look for the `/sys/firmware/efi` directory: if it exists, you booted with UEFI, and if it is missing, you booted in legacy BIOS mode.",
   "Next is the boot loader, almost always GRUB2 (GRand Unified Bootloader version 2). GRUB shows the menu of kernels, loads the chosen kernel image (for example `/boot/vmlinuz-...`) and the matching initramfs into memory, and passes the kernel its command line, such as `root=UUID=...`, `ro` and `quiet`. You never edit the generated `grub.cfg` directly, because the next kernel update regenerates it and silently throws your change away. Instead, you change `/etc/default/grub` (for example `GRUB_TIMEOUT` or `GRUB_CMDLINE_LINUX`) and regenerate the file with `grub2-mkconfig -o /boot/grub2/grub.cfg` on Red Hat-family systems or `update-grub` (a wrapper for `grub-mkconfig`) on Debian-family systems. The `grubby` tool on RHEL-like (Red Hat Enterprise Linux-like) systems edits kernel arguments per entry, for example `grubby --update-kernel=ALL --args=\"console=ttyS0\"`, and `grubby --default-kernel` shows which entry boots by default. If the boot loader itself is damaged, `grub2-install` (or `grub-install`) writes it back to the disk or the ESP.",
   "The kernel then initializes the hardware it has built-in drivers for, but it often cannot yet read the real root filesystem, because the driver for the disk controller, LVM (Logical Volume Manager), RAID (Redundant Array of Independent Disks) or LUKS (Linux Unified Key Setup) encryption lives in a module stored on that very filesystem. The initramfs (initial RAM filesystem) solves this chicken-and-egg problem: it is a compressed archive unpacked into memory that contains just enough modules and scripts to find, unlock and mount the real root, then switch to it. It is rebuilt with `dracut` on Red Hat, Fedora and SUSE (`dracut -f` regenerates the image for the running kernel) and with `mkinitramfs` or, more commonly, `update-initramfs -u` on Debian and Ubuntu. Rebuild it after adding a storage driver, changing encryption or changing root-device settings, and make sure you build it for the kernel version you will actually boot. `lsinitrd` (dracut) and `lsinitramfs` (Debian) list what an image contains, which is the quickest way to prove a driver is inside.",
   "Once root is mounted, the kernel starts PID 1 (process ID 1), which on current distributions is systemd. systemd brings the system to a target, a named group of units that replaces the old SysV runlevels. Common ones are `multi-user.target` (text-mode server, like runlevel 3), `graphical.target` (desktop, like runlevel 5), `rescue.target` (single-user with basic services and local filesystems mounted) and `emergency.target` (almost nothing, root mounted read-only). See the default with `systemctl get-default`, change it with `systemctl set-default multi-user.target`, and switch the running system with `systemctl isolate rescue.target`. For a one-time change at boot, press `e` at the GRUB menu, add `systemd.unit=rescue.target` (or `emergency.target`) to the line starting with `linux`, then press Ctrl+X. That edit is not saved, which makes it a safe way to recover a system. After booting, `systemd-analyze` reports total startup time and `systemd-analyze blame` shows which units slowed startup the most.",
   "Consider a worked example. A server fails to boot after its root filesystem is moved onto a new RAID controller, and it drops to a dracut emergency shell saying it cannot find the root device. The firmware and GRUB clearly worked, because the kernel ran, so the problem sits at the initramfs stage. You reboot, pick an older kernel entry from the GRUB menu, confirm the controller's module with `lsmod`, and run `dracut -f` to rebuild the initramfs with the new driver. You check with `lsinitrd | grep` and the module name, reboot, and the root filesystem is found normally. Nothing was reinstalled; one stage was repaired.",
   "A few habits prevent most boot trouble. Do not edit `grub.cfg` by hand, and always regenerate after changing `/etc/default/grub`. Keep `rescue.target` and `emergency.target` straight: rescue mounts local filesystems and starts a few services, while emergency gives you only a shell on a read-only root, which is what you want when `/etc/fstab` itself is broken. Rebuild the initramfs for the right kernel version, keep at least one older kernel installed as a fallback, and remember that a UEFI system has no MBR boot code to repair, because its boot loader lives on the ESP.",
   "Exam questions usually give a symptom and ask for the stage or the command. 'No boot menu, firmware cannot find a boot device' points to firmware settings, the ESP or reinstalling GRUB. 'Kernel panic: unable to mount root' or 'dracut emergency shell' points to the initramfs or the `root=` argument. 'Change kernel arguments permanently' points to `/etc/default/grub` plus `grub2-mkconfig`, or `grubby`. 'Boot to text mode from now on' is `systemctl set-default multi-user.target`, while 'once, to reset a password or fix fstab' points to editing the kernel line at the GRUB menu. A boot that gets past the kernel and stops at an emergency shell asking for the root password usually means a failed mount or unit, so check `journalctl -xb` and `/etc/fstab`."
  ],
  "analogy": "Booting is like a relay race with five runners: firmware, GRUB, kernel, initramfs and systemd. Each runner carries the baton a short distance and hands it on. If the race stops, you do not retrain the whole team; you find the last runner who still had the baton. The initramfs is the odd one: it is like a runner who carries a spare key so the next runner can open the stadium gate. The analogy stops working in one way: GRUB loads the kernel and initramfs together, so those two runners actually leave the line at the same moment.",
  "mnemonic": "Boot order, \"Fine Grapes Keep It Sweet\": Firmware (BIOS or UEFI), GRUB2, Kernel, Initramfs, systemd (targets).",
  "terms": [
   [
    "BIOS / MBR",
    "Basic Input/Output System, legacy firmware that runs boot code from the Master Boot Record in the first sector of the disk."
   ],
   [
    "UEFI",
    "Unified Extensible Firmware Interface: modern firmware that boots EFI executables from an EFI System Partition and supports Secure Boot."
   ],
   [
    "ESP",
    "EFI System Partition: a small FAT partition, usually mounted at /boot/efi, that holds UEFI boot loaders."
   ],
   [
    "GRUB2",
    "The standard Linux boot loader; configured through /etc/default/grub and a generated grub.cfg."
   ],
   [
    "initramfs",
    "A compressed temporary root filesystem loaded into RAM that contains the drivers and scripts needed to mount the real root filesystem."
   ],
   [
    "dracut / mkinitramfs",
    "Tools that build the initramfs image: dracut on Red Hat-family and SUSE, mkinitramfs/update-initramfs on Debian-family."
   ],
   [
    "systemd target",
    "A unit that groups other units into a system state, such as multi-user.target or graphical.target, replacing SysV runlevels."
   ],
   [
    "Secure Boot",
    "A UEFI feature that only runs boot loaders and kernels signed with trusted keys."
   ]
  ],
  "example": "After moving a server's root filesystem onto a new RAID controller, it fails to boot and drops to a dracut emergency shell saying it cannot find the root device. You boot an older kernel entry from the GRUB menu, confirm the controller's module name with lsmod, then run dracut -f to rebuild the initramfs so it includes the new driver. lsinitrd confirms the module is inside, and the next boot finds the root filesystem normally.",
  "mistakes": [
   [
    "Editing /boot/grub2/grub.cfg directly to add a kernel argument.",
    "grub.cfg is generated and is overwritten at the next kernel update or grub2-mkconfig run. Change /etc/default/grub and regenerate, or use grubby."
   ],
   [
    "Choosing rescue.target to repair a broken /etc/fstab.",
    "rescue.target tries to mount local filesystems, so a bad fstab entry can still block it. emergency.target gives a shell with root mounted read-only and nothing else, which is the safer choice; remount root read-write to fix the file."
   ],
   [
    "Reinstalling GRUB when the screen shows a dracut emergency shell.",
    "If you reached dracut, firmware, GRUB and the kernel all worked. The fault is in the initramfs contents or the root= argument, so rebuild the initramfs or fix the kernel command line."
   ],
   [
    "Assuming systemctl isolate changes the default for next boot.",
    "isolate switches the running system only. systemctl set-default changes the persistent default target."
   ]
  ],
  "tryit": [
   [
    "A RHEL server must send its console output to a serial port on every boot so the data center's console server can capture it. A junior admin added console=ttyS0 to the linux line in grub.cfg last week, and it worked until yesterday's kernel update. What should you do so the setting survives future updates?",
    "Add console=ttyS0 to GRUB_CMDLINE_LINUX in /etc/default/grub and run grub2-mkconfig -o /boot/grub2/grub.cfg, or run grubby --update-kernel=ALL --args=\"console=ttyS0\". The kernel update regenerated grub.cfg from /etc/default/grub, which did not contain the argument, so the hand edit was lost."
   ],
   [
    "You need to reset a forgotten root password on a test VM (virtual machine) that you can reach only through its virtual console. You do not want to change how the machine boots afterward. Which approach fits?",
    "At the GRUB menu press e, add a one-time argument such as systemd.unit=emergency.target (or rd.break on Red Hat-family systems) to the linux line and press Ctrl+X. The edit is not saved, so the next normal boot is unchanged. Remount root read-write, set the password, and on SELinux systems arrange a relabel before rebooting."
   ]
  ],
  "tip": "Map the symptom to the stage: no GRUB menu points to firmware or the boot loader, a 'cannot find root' error or dracut shell points to the initramfs or root= argument, and a boot that stops at an emergency shell after the kernel loads usually points to systemd units or /etc/fstab.",
  "check": [
   [
    "You edited GRUB_CMDLINE_LINUX in /etc/default/grub on a RHEL system, but the change has no effect after reboot. What step was missed?",
    "Regenerating the GRUB configuration with grub2-mkconfig -o /boot/grub2/grub.cfg (or using grubby); /etc/default/grub is only read when the config is rebuilt."
   ],
   [
    "Why does Linux need an initramfs at all?",
    "Because the drivers needed to reach the root filesystem (storage controller, LVM, RAID, LUKS) may be modules stored on that filesystem; the initramfs carries them in RAM so the real root can be mounted."
   ],
   [
    "Which command makes a server boot to a text console by default from now on?",
    "systemctl set-default multi-user.target, which changes the default target persistently."
   ],
   [
    "How can you tell whether a running system booted in UEFI or legacy BIOS mode?",
    "Check whether /sys/firmware/efi exists; it is present only when the system booted through UEFI."
   ],
   [
    "On Ubuntu, which command rebuilds the initramfs for the current kernel?",
    "update-initramfs -u, the Debian-family front end to mkinitramfs; on Red Hat-family systems the equivalent is dracut -f."
   ]
  ]
 },
 {
  "t": "Filesystem Hierarchy Standard: /etc, /var, /usr, /opt, /home, /boot, /proc, /sys, /dev",
  "hook": "Your first week at Cedar Valley Clinic, and a ticket lands from Rosa in billing: the patient portal stopped accepting uploaded insurance cards an hour ago. You have never logged into this server before. There is no documentation, the previous admin left last month, and the portal vendor will not answer until morning. You open a terminal and stare at a single `/` and a dozen directories with three-letter names. You could start searching the whole disk at random, or you could use the map that almost every Linux system shares. Where would uploads, logs and the portal's settings most likely live, and which directory would you check first?",
  "simple": "Linux keeps everything in one big upside-down tree of folders that starts at a single slash, `/`, called root. There are no drive letters like C: or D:. Instead, each top-level folder has a set job, and almost every Linux system follows the same plan. Settings live in `/etc`. Things that grow, like logs, live in `/var`. Installed programs live in `/usr`. People's personal files live in `/home`. The files needed to start the computer live in `/boot`. A few folders, like `/proc` and `/sys`, are not real files at all; they are live windows into what the computer is doing right now. It is like a well-organized kitchen where every home puts spoons in the same drawer, so a visiting cook can find them without asking.",
  "body": [
   "Linux has one directory tree that starts at `/` (root), and every disk, partition and virtual filesystem is attached somewhere in it. There are no drive letters. The FHS (Filesystem Hierarchy Standard) describes what belongs where. Because nearly every distribution follows it, knowing the layout tells you where to look for a configuration file, a log or a device on any system you log into, and it helps you plan which directories deserve their own partitions. On the exam, many questions are really asking 'which directory?', so learn each one's purpose rather than memorizing paths one by one.",
   "Start with configuration and changing data. `/etc` holds host-specific configuration, almost all of it plain text: `/etc/fstab`, `/etc/passwd`, `/etc/ssh/sshd_config`, `/etc/hosts`. If you want to change how something behaves on this particular machine, the file is probably under `/etc`, which also makes it the most important directory to back up. Many services read drop-in directories such as `/etc/sysctl.d/` or `/etc/sudoers.d/`, so local changes live in their own small files that package updates leave alone. `/var` holds variable data that grows while the system runs: logs in `/var/log`, mail and print spools in `/var/spool`, package caches in `/var/cache`, and application state such as databases and container storage in `/var/lib`. A full `/var` is a classic cause of failing services, because programs suddenly cannot write logs or data, which is why servers often give it a separate partition.",
   "Installed software lives in `/usr` and `/opt`. `/usr` contains the bulk of installed, read-only programs and data shared by users: programs in `/usr/bin`, system administration programs in `/usr/sbin`, libraries in `/usr/lib` and `/usr/lib64`, and documentation and man pages in `/usr/share`. Software you compile yourself traditionally goes under `/usr/local` so the package manager never overwrites it. On most modern distributions `/bin`, `/sbin` and `/lib` are symbolic links into `/usr`, a change known as the 'usr merge', so `/bin/ls` and `/usr/bin/ls` are the same file. `/opt` is for add-on software packages that install as a self-contained bundle, such as a vendor application in `/opt/vendorapp` with its own `bin` and `lib` inside, which keeps it from mixing with distribution files.",
   "Users and the boot files have their own places. `/home` holds users' personal directories, such as `/home/alice`, while the root user's home is `/root`, kept on the root filesystem so it is available even when `/home` fails to mount. `/boot` holds what the boot loader needs: kernel images (`vmlinuz-*`), initramfs images, and the configuration for GRUB (GRand Unified Bootloader); on UEFI (Unified Extensible Firmware Interface) systems the EFI System Partition is mounted beneath it at `/boot/efi`. If `/boot` fills up with old kernels, updates can fail partway through, so it is worth watching.",
   "Several smaller directories round out the map. `/tmp` is for temporary files; it is often cleared at boot and is sometimes a tmpfs held in RAM (random access memory). `/var/tmp` is for temporary files that must survive a reboot. `/mnt` is for temporary manual mounts, `/media` for removable media that the desktop mounts automatically, `/srv` for data served by the system (such as a website's files), and `/run` for runtime data like PID (process ID) files and sockets, which lives in RAM and is rebuilt every boot.",
   "Three directories are virtual: they are not on disk at all but are generated by the kernel each boot. `/proc` is the process filesystem: each running process has a numbered directory such as `/proc/1234` containing its command line, environment and open files, and files like `/proc/cpuinfo`, `/proc/meminfo` and `/proc/sys/...` expose kernel information and tunable parameters. `/sys` (sysfs) presents a structured view of devices, drivers and kernel objects, and it is where udev and tools like `lsblk` get their data. `/dev` contains device files, managed by udev, that represent hardware and pseudo-devices: `/dev/sda` and `/dev/nvme0n1` for disks, `/dev/null` to discard output, `/dev/zero` for a stream of zero bytes, and `/dev/urandom` for random bytes. Running `df -h /proc` shows it uses no disk space, which is a quick way to prove the point.",
   "Consider a worked example. A web server stops accepting uploads. You run `df -h` and see the filesystem mounted at `/var` is 100 percent full. `du -sh /var/* | sort -h` points to `/var/log`, and a second `du` shows one application's debug log has grown to many gigabytes. You rotate and compress the log, lower the logging level in the application's configuration under `/etc`, and uploads work again. Knowing the hierarchy took you straight to the right place instead of searching the whole disk.",
   "Watch for a few classic slips. Do not put locally compiled programs in `/usr/bin`, where a package update can overwrite them; use `/usr/local/bin`. Do not try to free space by deleting files in `/proc`, which take no space and cannot be removed. Do not store data that must survive a reboot in `/tmp` or `/run`. Do not confuse `/root`, root's home, with `/`, the root of the tree. When in doubt, `man hier` or `man file-hierarchy` documents the layout for your own system.",
   "Exam questions usually give a file type and ask where it lives, or describe a symptom and ask which directory to check. 'Configuration for this host' means `/etc`. 'Logs, spools, growing data' means `/var`. 'Third-party self-contained application' means `/opt`. 'Kernel images and initramfs' means `/boot`. 'View CPU (central processing unit), memory or process details' or 'kernel tunables' point to `/proc`, 'device and driver attributes' point to `/sys`, and 'device files such as disks or /dev/null' point to `/dev`."
  ],
  "analogy": "Think of the FHS as the floor plan of a standard office building. `/etc` is the policy binder at the front desk, `/var` is the mailroom that fills up all day, `/usr` is the shared library of reference books, `/opt` is a rented suite where one outside company keeps all its own equipment, and `/home` is the row of personal desks. `/proc` and `/sys` are the live status screens in the lobby: they show what is happening right now but are not filing cabinets, so you cannot clear space by throwing them out.",
  "terms": [
   [
    "FHS",
    "Filesystem Hierarchy Standard: the convention that defines the purpose of top-level Linux directories."
   ],
   [
    "/etc",
    "The directory for host-specific configuration files."
   ],
   [
    "/var",
    "The directory for variable data such as logs, spools, caches and application state."
   ],
   [
    "/usr/local",
    "The area reserved for locally installed software that the package manager will not touch."
   ],
   [
    "/opt",
    "The directory for self-contained add-on software packages, such as vendor applications."
   ],
   [
    "/proc",
    "A virtual filesystem exposing process and kernel information, including tunables under /proc/sys."
   ],
   [
    "/sys",
    "Sysfs, a virtual filesystem exposing devices, drivers and kernel objects."
   ],
   [
    "/dev",
    "The directory of device files, such as /dev/sda and /dev/null, maintained by udev."
   ]
  ],
  "example": "A web server stops accepting uploads. You run df -h and see that the filesystem mounted at /var is 100 percent full. du -sh /var/* points to /var/log, where an application's debug log has grown to many gigabytes. Rotating and compressing that log frees space, you lower the application's log level in its file under /etc, and uploads work again.",
  "mistakes": [
   [
    "Installing a self-compiled tool into /usr/bin.",
    "/usr/bin belongs to the package manager and can be overwritten by updates. Locally built software goes in /usr/local (for example /usr/local/bin)."
   ],
   [
    "Deleting large-looking files in /proc to free disk space.",
    "/proc is a virtual filesystem generated by the kernel; its files use no disk space and cannot be removed. Look in /var, /home or /tmp instead."
   ],
   [
    "Treating /root and / as the same thing.",
    "/ is the top of the whole tree; /root is just the root user's home directory, kept on the root filesystem so it is available even if /home fails to mount."
   ],
   [
    "Saving data that must survive a reboot in /tmp.",
    "/tmp is often cleared at boot and may live in RAM. Use /var/tmp for temporary data that must persist across reboots."
   ]
  ],
  "tryit": [
   [
    "A vendor delivers a monitoring agent as a tarball containing its own bin, lib and etc folders, and their documentation says not to mix its libraries with the system's. Your teammate suggests extracting it into /usr so it is on the PATH automatically. Where should it go, and why?",
    "Into /opt, for example /opt/monagent. The FHS reserves /opt for self-contained add-on packages, which keeps vendor files separate from distribution-managed files in /usr. You can add /opt/monagent/bin to the PATH or create a symlink in /usr/local/bin."
   ],
   [
    "Users report that a database server's service keeps crashing with 'cannot write' errors, but df -h shows the root filesystem at 40 percent. Which other mounted filesystem would you check first, and what would you look for?",
    "/var, if it is a separate partition, because databases keep their data in /var/lib and write logs to /var/log. If df -h shows /var at 100 percent, use du to find the largest subdirectory, such as an oversized log in /var/log."
   ]
  ],
  "tip": "Remember that /proc and /sys take no disk space and are rebuilt every boot; exam questions about viewing CPU, memory or kernel parameters usually point to /proc, while device and driver details point to /sys.",
  "check": [
   [
    "Where would you expect to find a program you compiled from source yourself, and why?",
    "Under /usr/local (for example /usr/local/bin), because that area is reserved for locally installed software the package manager will not overwrite."
   ],
   [
    "Which directory holds kernel images and initramfs files?",
    "/boot, which the boot loader reads before the rest of the system is available."
   ],
   [
    "What is /dev/null used for?",
    "It is a device file that discards anything written to it, commonly used to throw away unwanted command output."
   ],
   [
    "A vendor ships an application as a self-contained bundle with its own bin and lib folders. Where does the FHS say it belongs?",
    "/opt, for example /opt/vendorapp, which is intended for add-on software packages."
   ],
   [
    "Which file would you read to see the CPU model and core count?",
    "/proc/cpuinfo, a virtual file the kernel generates with processor details."
   ]
  ]
 },
 {
  "t": "Kernel modules and parameters: lsmod, modprobe, modinfo, /etc/modprobe.d, sysctl",
  "hook": "Tuesday evening at Pinecrest Library District, and Omar from facilities has finally wired the new branch network. Your job is simple on paper: turn a spare Linux virtual machine into a router between the staff subnet and the catalog subnet. You add the second interface, set the addresses, and ping from one side to the other. Nothing gets through. Both interfaces are up, the routes look right, and the firewall is open. Then you remember that the Linux kernel, by default, refuses to forward packets between interfaces at all. There is a switch for that, and a different switch for the network card driver that keeps dropping under load. Where do those switches live, and how do you make sure they are still set after tonight's reboot?",
  "simple": "The kernel is the core of Linux, the part that talks directly to the hardware. Instead of packing every possible driver into it, Linux keeps most drivers as add-on pieces called modules, which can be plugged in or pulled out while the computer runs, a bit like apps on a phone. Some commands list the modules that are loaded, show details about one, or load one. Separately, the kernel has hundreds of settings, such as whether it should pass network traffic from one connection to another. You can flip those settings with a tool called `sysctl`. The catch is that most of these changes are forgotten when the machine restarts, unless you also write them into a small settings file, just like a sticky note fades unless you copy it into your planner.",
  "body": [
   "The Linux kernel is modular. Instead of building every driver into one huge image, most drivers and features ship as loadable kernel modules, files ending in `.ko` (sometimes compressed, such as `.ko.xz`) stored under `/lib/modules/$(uname -r)/`. The kernel, helped by udev, loads a module automatically when matching hardware appears, and an administrator can load, unload, inspect and configure modules without rebooting. This keeps the kernel small and lets one kernel image run on very different hardware. The Linux+ objectives expect you to inspect modules, load and remove them correctly, make settings persistent, and tell module options apart from kernel runtime parameters.",
   "Two commands handle inspection. `lsmod` lists the modules currently loaded, with their size and a 'Used by' column showing how many users each has and which other modules depend on it; it simply formats the contents of `/proc/modules`. `modinfo name` shows details about a module file: its path, description, license, author, dependencies and, importantly, the parameters it accepts, each listed on a `parm:` line. That parameter list is how you learn which options you can set. Once a module is loaded, its current parameter values usually appear as small files under `/sys/module/name/parameters/`, which you can read with `cat`.",
   "`modprobe` is the smart tool for loading and removing modules. `modprobe name` loads the module and any modules it depends on, using the dependency map `modules.dep` built by `depmod`. `modprobe -r name` removes it along with unused dependencies, and it refuses if the module is in use. You can pass parameters on the command line, as in `modprobe name option=value`. The older `insmod` and `rmmod` commands load or remove a single module file by path and do not resolve dependencies, which is why `modprobe` is preferred; `insmod` fails with 'Unknown symbol' errors when a dependency is missing. Run `depmod -a` after manually adding a module file so `modprobe` can find it.",
   "Persistent module configuration lives in files under `/etc/modprobe.d/` ending in `.conf`. An `options` line sets parameters every time the module loads (`options mymodule debug=1`), and a `blacklist` line stops automatic loading by alias (`blacklist nouveau`). Blacklisting does not stop an explicit `modprobe` or loading as a dependency; to block that too, admins add `install name /bin/false`, which makes any load attempt run a command that does nothing. To load a module at every boot, list its name on its own line in a file under `/etc/modules-load.d/`, which systemd reads during startup. If the module is loaded early in boot from the initramfs, rebuild the initramfs afterwards (with `dracut -f` or `update-initramfs -u`) so the change is included.",
   "Kernel parameters are a separate idea: tunable runtime settings of the kernel itself, exposed as files under `/proc/sys`. The `sysctl` command reads and writes them using dotted names that mirror the path, so `net.ipv4.ip_forward` is `/proc/sys/net/ipv4/ip_forward`. `sysctl -a` lists all of them, `sysctl net.ipv4.ip_forward` shows one, and `sysctl -w net.ipv4.ip_forward=1` changes it immediately, but only until reboot. To make it persistent, put the setting in a file under `/etc/sysctl.d/` (or in `/etc/sysctl.conf`) and apply it with `sysctl --system` or `sysctl -p file`. Boot-time kernel arguments, by contrast, go on the GRUB (GRand Unified Bootloader) command line, so there are three different places to know: module options, runtime tunables and boot arguments.",
   "```\n# /etc/modprobe.d/local.conf\noptions e1000e InterruptThrottleRate=3000\nblacklist nouveau\n\n# /etc/sysctl.d/90-router.conf\nnet.ipv4.ip_forward = 1\nvm.swappiness = 10\n```",
   "Consider a worked example. You are turning a Linux VM (virtual machine) into a router between two subnets. `sysctl net.ipv4.ip_forward` returns 0, so you run `sysctl -w net.ipv4.ip_forward=1` to test and confirm traffic flows between the subnets. Then you create `/etc/sysctl.d/90-router.conf` containing `net.ipv4.ip_forward = 1` and run `sysctl --system` so the setting survives reboots. Later the same host gets a new network card whose driver needs a lower interrupt rate. You read the accepted options with `modinfo e1000e`, test with `modprobe -r e1000e && modprobe e1000e InterruptThrottleRate=3000` from the console (not over that interface, which would cut your session), check `/sys/module/e1000e/parameters/`, and then add an `options` line in `/etc/modprobe.d/` so it applies at every load.",
   "A handful of errors cause most trouble here. People expect `modprobe` or `sysctl -w` changes to persist, think `blacklist` blocks every way of loading a module, use `insmod` and wonder why a dependency is missing, or edit `/proc/sys` files directly and forget that those edits also vanish at reboot. Another trap is removing a module that a running device depends on: `modprobe -r` refuses while the 'Used by' count is above zero, which is a safety feature, not a bug. Finally, remember to rebuild the initramfs when the module in question is loaded before the root filesystem is mounted.",
   "Exam questions tend to be worded around the need. 'Show loaded drivers' is `lsmod`. 'What parameters does this driver accept' is `modinfo`. 'Load a driver and its dependencies' is `modprobe`. 'Prevent a driver loading automatically' is a blacklist in `/etc/modprobe.d`. 'Load at boot' is `/etc/modules-load.d`. 'Change a kernel tunable such as IP (Internet Protocol) forwarding or swappiness, persistently' is a file in `/etc/sysctl.d` applied with `sysctl --system`."
  ],
  "analogy": "Kernel modules are like attachments for a power drill: you click on the sanding pad when you need it and pop it off afterward, and the drill itself stays the same. modprobe is the helper who also fetches the adapter an attachment needs. sysctl settings are the drill's own speed dial. Both reset when the drill goes back in its case, unless you write the setup on the label inside the lid, which is what /etc/modprobe.d and /etc/sysctl.d are. The analogy stops at blacklisting: a blacklist only stops automatic loading, not someone who deliberately clicks the attachment on.",
  "terms": [
   [
    "Kernel module",
    "A loadable piece of kernel code (.ko file), such as a driver, that can be inserted or removed while the system runs."
   ],
   [
    "lsmod",
    "Lists loaded modules, their size and what uses them, formatted from /proc/modules."
   ],
   [
    "modprobe",
    "Loads or removes (-r) a module together with its dependencies, reading options from /etc/modprobe.d."
   ],
   [
    "modinfo",
    "Displays a module's file path, description, dependencies and supported parameters."
   ],
   [
    "depmod",
    "Builds the modules.dep dependency map that modprobe uses to load dependencies."
   ],
   [
    "Blacklist",
    "A modprobe.d directive that prevents a module from being loaded automatically by its alias."
   ],
   [
    "sysctl",
    "A tool to view and set kernel runtime parameters under /proc/sys; persistent values go in /etc/sysctl.d/*.conf."
   ]
  ],
  "example": "You are turning a Linux VM into a router between two subnets. sysctl net.ipv4.ip_forward returns 0, so you run sysctl -w net.ipv4.ip_forward=1 to test, confirm traffic flows, then create /etc/sysctl.d/90-router.conf containing net.ipv4.ip_forward = 1 and run sysctl --system so the setting survives reboots.",
  "mistakes": [
   [
    "Picking insmod to load a driver that depends on other modules.",
    "insmod loads one file by path and ignores dependencies, so it fails with unknown symbol errors. modprobe loads by name and pulls in dependencies from modules.dep."
   ],
   [
    "Believing 'blacklist name' guarantees the module can never load.",
    "A blacklist only stops automatic loading by alias. An explicit modprobe or a dependency can still load it; add 'install name /bin/false' to block those too."
   ],
   [
    "Using sysctl -w and assuming the change is permanent.",
    "sysctl -w and direct writes to /proc/sys last only until reboot. Put the setting in a file under /etc/sysctl.d/ and apply it with sysctl --system."
   ],
   [
    "Confusing module options with sysctl parameters.",
    "Module parameters belong to one driver and go on an options line in /etc/modprobe.d; sysctl keys are kernel-wide tunables under /proc/sys stored in /etc/sysctl.d."
   ]
  ],
  "tryit": [
   [
    "A workstation with a discrete graphics card keeps loading the open-source nouveau driver, which conflicts with the vendor driver the user needs. The nouveau module is included in the initramfs. You add 'blacklist nouveau' to /etc/modprobe.d/blacklist-nouveau.conf and reboot, but lsmod still shows nouveau. What step was missed?",
    "Rebuilding the initramfs (dracut -f or update-initramfs -u). The module loads from the initramfs before the root filesystem and its /etc/modprobe.d files are available, so the blacklist must be copied into the new image."
   ],
   [
    "A database vendor recommends lowering vm.swappiness to 10. You must apply it now without a reboot and make it survive future reboots. Which two actions do you take?",
    "Create a file such as /etc/sysctl.d/90-db.conf containing vm.swappiness = 10, then run sysctl --system (or sysctl -p /etc/sysctl.d/90-db.conf) to apply it immediately. The file provides persistence and the command applies it now."
   ]
  ],
  "tip": "Watch for the persistence trap: modprobe and sysctl -w changes vanish at reboot; persistence comes from /etc/modprobe.d or /etc/modules-load.d for modules and /etc/sysctl.d for kernel parameters.",
  "check": [
   [
    "What is the difference between insmod and modprobe?",
    "insmod loads a single module file and does not handle dependencies; modprobe loads by name and automatically loads required dependencies."
   ],
   [
    "How do you permanently stop the nouveau driver from loading automatically?",
    "Add 'blacklist nouveau' to a .conf file in /etc/modprobe.d/ and rebuild the initramfs if the module is loaded early in boot."
   ],
   [
    "Which file path corresponds to the sysctl key vm.swappiness?",
    "/proc/sys/vm/swappiness, because sysctl names replace the slashes after /proc/sys with dots."
   ],
   [
    "You added a line to /etc/sysctl.d/99-local.conf. How do you apply it without rebooting?",
    "Run sysctl --system (or sysctl -p /etc/sysctl.d/99-local.conf), which reads the configuration files and applies their values."
   ],
   [
    "Which command shows the parameters a module accepts?",
    "modinfo modulename, which lists each supported parameter on a parm: line."
   ]
  ]
 },
 {
  "t": "Files and directories: ls, find, cp, mv, hard vs symbolic links, file, stat",
  "hook": "The shared drive at Bramble & Hart Architects is at 98 percent, and Nadia, the office manager, needs room for a client's 3D models by noon. You track down a 40 GB folder of old renders that nobody has opened in a year, confirm with the project lead, and delete it. Then you run `df` again. The number has not moved at all. Nadia is watching over your shoulder, a little less confident in you than she was five minutes ago. The files are gone from the folder, so where did the space go? The answer lives in how Linux names files underneath, and in a handful of commands you will use every single day.",
  "simple": "Most of an admin's day is finding files, looking at them, copying them and moving them around. `ls` lists what is in a folder, `find` searches for files by name, size, owner or age, `cp` copies and `mv` moves or renames. Under the hood, every file is really a numbered record on the disk, and the name you see is just a label pointing at that record. A hard link is a second label on the same record, so the file stays alive until every label is removed. A symbolic link is more like a shortcut note that says 'go look over there'; if the real file moves, the note points to nothing. It is like a library book with two catalog cards versus a sticky note saying which shelf it was on.",
  "body": [
   "Most day-to-day administration comes down to finding, inspecting, copying and moving files. These commands appear everywhere on the exam, often inside a larger scenario about disk space, permissions or troubleshooting, so it pays to know their most useful options by heart and to understand the inode model underneath them. Once you see that names and data are separate things, several confusing behaviors, such as deleted files that still use space, start to make sense.",
   "`ls` lists directory contents. `ls -l` gives the long format: type and permissions, link count, owner, group, size, modification time and name. `-a` shows hidden 'dot' files, `-h` prints human-readable sizes, `-t` sorts by modification time, `-r` reverses the order, `-R` recurses, `-d` lists a directory itself rather than its contents, `-i` shows inode numbers and `-Z` shows SELinux (Security-Enhanced Linux) contexts. The first character of the long listing tells you the type: `-` regular file, `d` directory, `l` symbolic link, `b` block device, `c` character device, `p` named pipe, `s` socket. So a line beginning `lrwxrwxrwx` is a symlink, and the number after the permissions is how many hard links point to that inode.",
   "`find` searches a tree by almost any attribute and can act on the results. Examples: `find /etc -name '*.conf'` (quote wildcards so the shell does not expand them first; `-iname` ignores case), `find / -type f -size +100M` for big files, `find /home -user alice`, `find /var/log -mtime +30` for files modified more than 30 days ago, and `find / -perm -4000` for SUID (set user ID) files, a common security audit. Add `-exec cmd {} \\;` to run a command on each match, or `-exec cmd {} +` to pass many matches to one command at once, and `-delete` to remove matches, carefully and ideally after a dry run that only prints. `locate` is faster but searches a prebuilt database updated by `updatedb`, so it can miss files created since the last update.",
   "Copying and moving follow a few rules. `cp src dest` copies; `-r` copies directories recursively, `-p` preserves mode, ownership and timestamps, `-a` (archive) copies recursively while preserving everything including links, and `-i` prompts before overwriting. `mv` moves or renames; within the same filesystem it only rewrites the directory entry, so it is instant even for huge files, while across filesystems it must copy and then delete. `rm -r` removes directories, `rmdir` removes only empty ones, `mkdir -p` creates parent directories as needed, and `touch` creates an empty file or updates timestamps.",
   "Links are a favorite exam topic. Every file's data and metadata are described by an inode, and a directory entry is just a name pointing to an inode. A hard link (`ln target linkname`) is a second name for the same inode: both names are equal, the link count in `ls -l` goes up, and the data survives until the last name is removed. Because inode numbers are only unique within one filesystem, hard links cannot cross filesystems, and they normally cannot point to directories. A symbolic (soft) link (`ln -s target linkname`) is a small separate file with its own inode containing a path. It can cross filesystems and point to directories, but if the target is deleted or moved, the symlink breaks and is called 'dangling'. `readlink -f` shows where a symlink finally resolves, and `ls -li` lets you compare inode numbers to spot hard links.",
   "Two commands tell you what a file really is. `file name` identifies content by examining it rather than trusting the extension, for example reporting that `report.pdf` is really ASCII (American Standard Code for Information Interchange) text or that a binary is an ELF (Executable and Linkable Format) executable. `stat name` shows full inode metadata: size, blocks, inode number, link count, permissions in octal and symbolic form, owner, and the timestamps: access (atime), modify (mtime, contents changed) and change (ctime, metadata such as permissions changed). Many systems also report a birth time. Because `ls -l` shows only mtime by default, `stat` is the tool to reach for when you need to know when permissions or ownership last changed.",
   "Consider a worked example. A disk alert fires on a file server. You run `find /srv -type f -size +1G -mtime +180 -exec ls -lh {} +` to list large files untouched for six months and confirm with their owners. You delete one, but `df` shows no space freed; `stat` on another name reveals the link count was 2, so a hard link elsewhere still references the same data. Finding it with `find /srv -samefile` and the remaining path, then removing it, frees the space. If space still does not return, `lsof +L1` would show a process holding a deleted file open.",
   "A few habits avoid the usual slips. Quote wildcards in `find -name`, so the shell does not expand them first. Use `cp -a` rather than `cp -r` when ownership and timestamps must be kept. Create relative symlinks from the right directory, or use absolute targets, so they do not point nowhere. Remember that deleting a name does not free space while another hard link or an open process still holds the inode, and that ctime means change time for metadata, not creation time.",
   "Exam questions are usually worded as a requirement. 'Must work across partitions or point to a directory' means a symbolic link. 'Data must stay accessible after the original name is deleted' means a hard link. 'Determine the real type of a file regardless of extension' is `file`. 'Show inode number, link count and all timestamps' is `stat`. 'Search by size, owner, age or permission' is `find`, and 'fast name lookup that missed a new file' hints that the `locate` database needs `updatedb`."
  ],
  "analogy": "Picture a warehouse where each box (the inode and its data) has a number, and the front office keeps index cards with names pointing to box numbers. A hard link is a second index card pointing to the same box; the box is only thrown out when the last card is torn up. A symbolic link is a card that says 'see the card named Q3-report', so if that card is torn up, yours leads nowhere. The analogy also explains why hard links cannot cross filesystems: each warehouse numbers its own boxes.",
  "terms": [
   [
    "Inode",
    "The on-disk structure holding a file's metadata and pointers to its data; directory entries map names to inode numbers."
   ],
   [
    "Hard link",
    "An additional directory entry for the same inode; cannot cross filesystems and survives deletion of the other names."
   ],
   [
    "Symbolic link",
    "A separate file that stores a path to a target; can cross filesystems but breaks if the target is removed."
   ],
   [
    "mtime vs ctime",
    "mtime changes when file contents change; ctime changes when metadata such as permissions or ownership changes."
   ],
   [
    "find -exec",
    "A find action that runs a command on each matched file, with {} replaced by the file name."
   ],
   [
    "locate",
    "A fast file-name search that uses a database built by updatedb, so it can miss recently created files."
   ],
   [
    "file",
    "Identifies a file's real content type by inspecting its data rather than its extension."
   ]
  ],
  "example": "A disk alert fires on a file server. You run find /srv -type f -size +1G -mtime +180 -exec ls -lh {} \\; to list large files untouched for six months, confirm with the owners, then archive them. Along the way, stat on one file shows a link count of 2, telling you a hard link elsewhere still references the same data, so deleting one name alone would not free the space.",
  "mistakes": [
   [
    "Thinking ctime is the file's creation time.",
    "ctime is the change time, updated when metadata such as permissions, owner or link count changes. Creation is the separate birth time some filesystems report in stat."
   ],
   [
    "Choosing a hard link to point at a file on another partition.",
    "Hard links reference inode numbers, which are only unique within one filesystem. Use a symbolic link to cross filesystems or to point at a directory."
   ],
   [
    "Expecting rm on one name to free disk space immediately.",
    "Space is released only when the inode's link count reaches zero and no process holds the file open. Check the link count with stat and open files with lsof +L1."
   ],
   [
    "Running find / -name *.log without quotes.",
    "The shell may expand *.log against the current directory before find runs, giving wrong results or an error. Quote the pattern: find / -name '*.log'."
   ]
  ],
  "tryit": [
   [
    "An application expects its configuration at /etc/app/app.conf, but your team wants the real file kept in /srv/config/app.conf on a separate data partition so it is included in that partition's backups. The application must always see the current version. Which kind of link do you create, and how?",
    "A symbolic link, because the two paths are on different filesystems and hard links cannot cross filesystems: ln -s /srv/config/app.conf /etc/app/app.conf. Verify with ls -l or readlink -f /etc/app/app.conf."
   ],
   [
    "A security auditor asks when the permissions on /etc/shadow were last changed. ls -l shows a date from three months ago. Is that the answer, and what would you run?",
    "No. ls -l shows mtime, which only changes when contents change. Run stat /etc/shadow and read the Change (ctime) timestamp, which records metadata changes such as permissions or ownership."
   ]
  ],
  "tip": "If a question says the link must work across partitions or to a directory, the answer is a symbolic link; if it says the data must remain accessible after the original name is deleted, the answer is a hard link.",
  "check": [
   [
    "What happens to a symbolic link when its target file is deleted?",
    "It becomes a dangling link that points to a path that no longer exists, so accessing it fails."
   ],
   [
    "Which find command lists regular files in /var larger than 500 MB?",
    "find /var -type f -size +500M, where -type f limits results to regular files and +500M means larger than 500 MiB."
   ],
   [
    "Why is mv of a 50 GB file within one filesystem almost instant?",
    "Because it only changes the directory entry pointing to the inode; the data blocks do not move."
   ],
   [
    "Which cp option copies a directory tree while preserving ownership, permissions, timestamps and symlinks?",
    "cp -a (archive), which is recursive and preserves all attributes and links."
   ],
   [
    "A newly created file does not appear in locate results. Why, and how do you fix it?",
    "locate searches a database that has not been refreshed since the file was created; run updatedb (or use find)."
   ]
  ]
 },
 {
  "t": "Storage: partitions (fdisk, gdisk, parted), lsblk, blkid, UUIDs, /etc/fstab options (nofail, noexec)",
  "hook": "Saturday morning, and the file server at Northgate Community College will not come back after a hardware swap. Kofi, the facilities tech, pulled an old backup drive and slid in a new data disk, exactly as the work order said. Now the console shows 'You are in emergency mode' and waits for a root password. Nothing on the server's main disk was touched. Students need the course-materials share for Monday's exams. You log in and open `/etc/fstab`, and the line for the backup drive says `/dev/sdc1`, while `lsblk` shows that `/dev/sdc` is now the brand-new, empty disk. Why did removing one optional drive stop the whole server from booting, and how do you write the line so it never happens again?",
  "simple": "A new disk is like an empty plot of land. Before you can store anything, you mark out sections (partitions), put a filing system on each one (format it), and tell Linux which folder each section should appear under (mount it). There are two styles of marking out sections: an old one called MBR that works for smaller disks, and a modern one called GPT for large disks. Linux gives each disk a nickname such as `/dev/sdb`, but nicknames can shuffle when you add or remove disks, so it is safer to refer to each section by its permanent serial number, called a UUID. A file named `/etc/fstab` lists what to attach at startup, with options like 'do not panic if this disk is missing' (`nofail`) or 'never run programs from here' (`noexec`).",
  "body": [
   "Before a disk can hold files, it is normally divided into partitions, each of which gets a filesystem and a mount point. Linux+ expects you to identify disks, create partitions with the right tool for the partition table type, and mount them reliably at boot. The workflow is always the same: identify the disk, partition it, create a filesystem, find its identifier, add it to `/etc/fstab`, and test. Skipping the identify and test steps is where most real outages come from.",
   "There are two partition table formats. MBR (Master Boot Record) is the legacy format: it supports up to four primary partitions (or three plus an extended partition containing logical ones) and disks up to about 2 TiB (tebibytes) with common 512-byte sectors. GPT (GUID Partition Table, where GUID means Globally Unique Identifier) is the modern format used with UEFI (Unified Extensible Firmware Interface): it supports far larger disks, many partitions (128 by default), and keeps a backup copy of the table at the end of the disk, so a damaged primary table can be recovered.",
   "Three tools create partitions. `fdisk` is an interactive tool that today handles both MBR and GPT; `gdisk` is a GPT-focused tool with a similar interface; `parted` handles both and can also be scripted, as in `parted /dev/sdb mklabel gpt` and `parted /dev/sdb mkpart data xfs 1MiB 100%`. Inside fdisk, `n` creates, `p` prints, `t` changes type, `d` deletes and `w` writes; nothing changes on disk until you write, and `q` quits without saving. parted, by contrast, applies changes immediately with no final write step, so double-check the device before each command. Afterwards, `partprobe` asks the kernel to reread the table so the new partition appears without a reboot.",
   "Next, identify what you have. `lsblk` shows block devices as a tree: disks, their partitions, LVM (Logical Volume Manager) volumes and RAID (Redundant Array of Independent Disks) arrays, with size, type and mount point. `lsblk -f` adds filesystem type, label and UUID. `blkid` prints the attributes of each block device, especially its UUID (Universally Unique Identifier) and filesystem TYPE, for example `/dev/sdc1: UUID=\"3f2a...\" TYPE=\"xfs\"`. Device names such as `/dev/sdb1` can change when disks are added or controllers reorder them, but a filesystem's UUID stays the same, which is why you should mount by UUID (or LABEL) rather than by device name. The symbolic links under `/dev/disk/by-uuid/` show the same mapping.",
   "`/etc/fstab` lists filesystems to mount at boot. Each line has six fields: device, mount point, filesystem type, options, dump flag (usually 0) and fsck pass order (1 for root, 2 for others, 0 to skip). Options matter for reliability and security. `defaults` means rw, suid, dev, exec, auto, nouser and async. `nofail` lets boot continue if the device is missing; without it, a missing device can drop the system to emergency mode. `noexec` prevents running binaries from that filesystem, a common hardening step for `/tmp` or upload directories. `nosuid` ignores SUID and SGID (set user ID and set group ID) bits, `nodev` ignores device files, `ro` mounts read-only, and `_netdev` marks network filesystems so they wait for the network. On systemd systems each line becomes a mount unit, so after editing run `systemctl daemon-reload`.",
   "```\n# device                                   mount    type  options                  dump pass\nUUID=3f2a9c1e-7b4d-4e7a-9d2c-1a2b3c4d5e6f  /backup  xfs   defaults,nofail,noexec   0    2\ntmpfs                                      /tmp     tmpfs defaults,nosuid,nodev    0    0\n```",
   "Consider a worked example. You add a 4 TB disk to a server for backups. `lsblk` shows it as `/dev/sdc` with no partitions. Because it is larger than 2 TiB you create a GPT label and one partition with parted, format it with `mkfs.xfs /dev/sdc1`, get its UUID from `blkid`, and add the `/backup` line shown above. You run `systemctl daemon-reload`, then `mount -a` and `findmnt --verify`, which report no errors, and `df -h /backup` shows the space. Because of `nofail`, the server still boots if the disk is ever removed, and because of `noexec`, nothing copied into the backup area can be run directly from it. Months later a colleague adds a second disk, the device names shift so the backup disk becomes `/dev/sdd`, and the mount still works because fstab refers to the UUID, not the name.",
   "Avoid the usual traps: using `/dev/sdX` names in fstab; forgetting `nofail` on removable or network disks; choosing MBR for a disk over 2 TiB; rebooting to test an fstab edit instead of running `mount -a` first, where a typo shows up as an error message rather than an unbootable server; and forgetting `partprobe`, so the kernel does not see the new partition. If a bad fstab line does stop a boot, the emergency shell lets you remount root read-write with `mount -o remount,rw /` and correct the file.",
   "Exam questions are usually symptom-based. 'Server hung in emergency mode after a disk was removed or renamed' points to an fstab entry by device name without `nofail`; the fix is `UUID=` plus `nofail`. 'Prevent users running programs from /tmp' is `noexec`. 'Disk larger than 2 TiB' or 'more than four partitions' means GPT. 'Identify the UUID or filesystem type' is `blkid` or `lsblk -f`, and 'verify fstab safely' is `mount -a` or `findmnt --verify`."
  ],
  "analogy": "Device names like /dev/sdb are like seat numbers in a classroom: if a new student arrives or one leaves, everyone may shift seats. A UUID is like each student's ID number, which never changes no matter where they sit. If your attendance sheet (fstab) says 'whoever is in seat 3', you will mark the wrong person after a reshuffle; if it says 'student 4471', you always find the right one. nofail is the note that says 'if 4471 is absent, carry on with class anyway'.",
  "mnemonic": "fstab fields in order, \"Don't Make Toast Over Dirty Pans\": Device, Mount point, Type, Options, Dump, Pass.",
  "terms": [
   [
    "GPT",
    "GUID Partition Table: modern partition scheme supporting very large disks, many partitions and a backup table."
   ],
   [
    "MBR",
    "Master Boot Record: legacy partition scheme limited to four primary partitions and roughly 2 TiB disks."
   ],
   [
    "UUID",
    "A unique identifier stored in a filesystem, used in /etc/fstab so mounts do not depend on device names."
   ],
   [
    "lsblk / blkid",
    "lsblk shows block devices as a tree (add -f for filesystems and UUIDs); blkid prints UUID, label and type for each device."
   ],
   [
    "partprobe",
    "Asks the kernel to reread a disk's partition table so changes take effect without a reboot."
   ],
   [
    "nofail",
    "An fstab option that lets boot continue if the device is not present."
   ],
   [
    "noexec",
    "An fstab option that prevents executing binaries stored on that filesystem."
   ]
  ],
  "example": "You add a 4 TB disk to a server for backups. You create a GPT label and one partition with parted, format it with mkfs.xfs, get its UUID from blkid, and add UUID=... /backup xfs defaults,nofail,noexec 0 2 to /etc/fstab. Running mount -a mounts it without errors, and nofail ensures that if the disk is ever removed the server still boots.",
  "mistakes": [
   [
    "Thinking fdisk can only create MBR partitions, so gdisk is required for GPT.",
    "Modern fdisk handles both MBR and GPT. gdisk is GPT-focused and parted handles both and can be scripted; any of them can be a correct answer depending on the wording."
   ],
   [
    "Expecting parted to wait for a final write command like fdisk.",
    "parted applies each change immediately. fdisk keeps changes in memory until you press w, and q quits without saving."
   ],
   [
    "Testing a new fstab line by rebooting.",
    "A mistake then shows up as an unbootable server. Run mount -a or findmnt --verify first, which report errors while you still have a working shell."
   ],
   [
    "Using noexec on /backup and assuming it also blocks SUID programs and device files.",
    "noexec only blocks direct execution. nosuid ignores SUID/SGID bits and nodev ignores device files; hardening usually combines all three."
   ]
  ],
  "tryit": [
   [
    "A web application lets customers upload images into /srv/uploads, which is its own partition. The security team wants to make sure that even if someone uploads a script or binary, it cannot be run from that location, and that the server still boots if the upload disk fails. Which fstab options do you add to that line?",
    "noexec to block direct execution of binaries from the filesystem, plus nofail so a missing or failed disk does not stop the boot. Many admins also add nosuid and nodev for defense in depth, and they reference the filesystem by UUID."
   ],
   [
    "You partitioned /dev/sdb with fdisk and pressed w, but lsblk does not show /dev/sdb1, and mkfs.ext4 /dev/sdb1 says the device does not exist. The server cannot be rebooted during business hours. What do you run?",
    "partprobe /dev/sdb (or partprobe), which tells the kernel to reread the partition table so /dev/sdb1 appears without a reboot. Then confirm with lsblk before formatting."
   ]
  ],
  "tip": "If a scenario asks why a server hung in emergency mode after a disk was removed or renamed, suspect an fstab entry by device name without nofail; the fix is to use UUID= and add nofail where appropriate.",
  "check": [
   [
    "Which partitioning scheme should you use for a 6 TB disk, and why?",
    "GPT, because MBR cannot address disks beyond about 2 TiB with 512-byte sectors."
   ],
   [
    "What does the last field in an /etc/fstab line control?",
    "The fsck pass order at boot: 1 for the root filesystem, 2 for other filesystems, 0 to skip checking."
   ],
   [
    "How do you find the UUID of /dev/sdc1?",
    "Run blkid /dev/sdc1 or lsblk -f, both of which read the identifier stored in the filesystem."
   ],
   [
    "You created a partition with fdisk but it does not appear in lsblk. What should you run?",
    "partprobe (or partprobe /dev/sdX), so the kernel rereads the partition table without a reboot."
   ],
   [
    "Why should fstab refer to UUID= rather than /dev/sdb1?",
    "Device names can change when disks are added, removed or reordered, but a filesystem's UUID stays the same, so the right filesystem is always mounted."
   ]
  ]
 },
 {
  "t": "LVM (pvcreate, vgextend, lvextend -r) and software RAID with mdadm",
  "hook": "It is month-end close at Silverline Credit Union, and the accounting database volume just crossed 95 percent. Hannah from finance has three hours of reconciliation left, and if the volume fills, the database stops writing and everyone starts over tomorrow. On a server with plain partitions, growing that volume would mean a maintenance window, a backup, repartitioning and a restore. But this server was built with LVM on top of a software RAID mirror. Your manager asks a simple question on the call: can you give the database 50 more gigabytes right now, without stopping it, and without putting the data at risk if a disk fails tonight? What is the exact order of commands, and what is the one flag people forget?",
  "simple": "LVM (Logical Volume Manager) lets you treat several disks as one big bucket of space and then pour out flexible portions as needed. If a portion runs low, you can add another disk to the bucket and pour more in, often while everything keeps running. RAID (Redundant Array of Independent Disks) is a different idea: it combines disks so that losing one does not lose your data, or so reads and writes are faster. A mirror, for example, writes everything to two disks at once, like keeping two identical notebooks. The two are often used together: RAID underneath for safety, LVM on top for flexibility. Neither one is a backup, though. If you delete a file, RAID faithfully deletes it from both notebooks.",
  "body": [
   "Plain partitions are rigid: growing one usually means repartitioning and moving data. LVM (Logical Volume Manager) adds a flexible layer between disks and filesystems so you can pool space from several disks, grow volumes online and take snapshots. Software RAID (Redundant Array of Independent Disks) with `mdadm` combines disks for redundancy or speed without a hardware controller. Both are core Linux+ storage skills, and they are often used together, so it helps to keep their jobs separate in your head: LVM is about flexibility, RAID is about surviving disk failure or adding speed.",
   "LVM has three layers. A PV (physical volume) is a disk or partition initialized for LVM with `pvcreate /dev/sdb`. A VG (volume group) pools one or more PVs into a single store of space: `vgcreate vgdata /dev/sdb`. An LV (logical volume) is carved from a VG and behaves like a partition: `lvcreate -n lvweb -L 20G vgdata` creates `/dev/vgdata/lvweb` (also reachable as `/dev/mapper/vgdata-lvweb`). You then put a filesystem on the LV and mount it as usual. The display commands `pvs`, `vgs` and `lvs` give one-line summaries, with `vgs` showing a VFree column for unallocated space, while `pvdisplay`, `vgdisplay` and `lvdisplay` give detail. Internally, space is handed out in fixed-size chunks called extents, which is why `-l` takes a count of extents or a percentage and `-L` takes a size.",
   "Growing storage is where LVM shines. If the VG has free space, `lvextend -L +10G /dev/vgdata/lvweb` adds 10 GiB to the LV, and `lvextend -l +100%FREE` uses all remaining space. The `-r` (`--resizefs`) option also grows the filesystem in the same step, calling the right tool for ext4 or XFS. Without `-r`, you must grow the filesystem yourself with `resize2fs` or `xfs_growfs`, or the extra space stays unused and `df` still shows the old size. If the VG is out of space, add a disk: `pvcreate /dev/sdc`, then `vgextend vgdata /dev/sdc`, then extend the LV. The order matters because each layer can only use what the layer beneath it provides.",
   "Shrinking and snapshots need more care. ext4 can be shrunk only while unmounted, and XFS cannot be shrunk at all, so always shrink the filesystem before the LV, never the reverse. LVM snapshots (`lvcreate -s -n snap -L 5G /dev/vgdata/lvweb`) capture a point-in-time view, useful for taking a consistent backup of a busy volume, but they are not backups themselves because they live on the same disks and fail along with them. A snapshot also needs enough space to hold changes made while it exists.",
   "Software RAID is built with `mdadm`, which creates `/dev/md` devices. Know the levels: RAID 0 stripes data across disks for speed with no redundancy, so losing any disk loses the array; RAID 1 mirrors data and survives one disk failure; RAID 5 stripes with distributed parity, needs at least three disks and survives one failure; RAID 6 uses double parity, needs at least four disks and survives two failures; RAID 10 stripes across mirrored pairs, needs at least four disks, and gives speed plus redundancy. The block below creates a mirror, checks its status, saves the array definition so it assembles consistently at boot, and replaces a disk: mark it failed, remove it, then add the new one and watch the rebuild in `/proc/mdstat` or with `mdadm --detail /dev/md0`. RAID and LVM are often stacked: RAID provides redundancy underneath, and LVM provides flexible volumes on top, so a PV might be `/dev/md0`.",
   "```\nmdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb1 /dev/sdc1\ncat /proc/mdstat\nmdadm --detail --scan >> /etc/mdadm.conf    # /etc/mdadm/mdadm.conf on Debian\nmdadm /dev/md0 --fail /dev/sdc1 --remove /dev/sdc1\nmdadm /dev/md0 --add /dev/sdd1\n```",
   "Consider a worked example. The `/var/lib/pgsql` volume on a database server is at 95 percent. `vgs` shows no free space in the volume group, so you attach a new virtual disk and confirm with `lsblk` that it is `/dev/sdd`. You run `pvcreate /dev/sdd` and `vgextend vgdb /dev/sdd`, and `vgs` now shows free space. Then `lvextend -r -L +50G /dev/vgdb/lvpg` extends the LV and grows its XFS filesystem online. `df -h` confirms the new size, and the database never stops. In `/proc/mdstat`, a healthy two-disk mirror shows `[UU]`; if one member fails you would see `[U_]`, the cue to replace that disk.",
   "Several errors come up again and again: running `lvextend` without `-r` and then wondering why `df` shows the old size; trying to extend an LV before adding the new PV to the VG; attempting to shrink XFS; forgetting to save the array to `mdadm.conf`, so it comes up under a different name such as `/dev/md127` after reboot; and treating RAID or snapshots as backups. RAID protects against disk failure, not against deletion, corruption or ransomware, because a mistake is written to every disk instantly.",
   "Exam questions tend to test order and levels. 'Add a new disk's space to an existing volume' means pvcreate, then vgextend, then lvextend. 'LV extended but df unchanged' means the filesystem was not resized. 'Mirror', 'survive one failure with two disks' means RAID 1; 'parity, at least three disks' means RAID 5; 'survive two failures' means RAID 6; 'fastest, no redundancy' means RAID 0. 'Check rebuild progress' is `cat /proc/mdstat`."
  ],
  "analogy": "LVM works like a shared family bank account. Each paycheck deposited is a physical volume, the joint account is the volume group, and each envelope of money set aside for rent or groceries is a logical volume. When groceries run short, you deposit another paycheck (pvcreate and vgextend) and move more into that envelope (lvextend). RAID is more like keeping a photocopy of every receipt: it saves you if one copy is lost, but if you tear up the original by mistake, you tear up the copy at the same moment.",
  "mnemonic": "Growing LVM goes bottom up, \"Please Visit Later\": PV (pvcreate), VG (vgextend), LV (lvextend -r).",
  "terms": [
   [
    "PV / VG / LV",
    "Physical volume (a disk prepared for LVM), volume group (a pool of PVs) and logical volume (a usable volume carved from the pool)."
   ],
   [
    "Extent",
    "The fixed-size unit of space LVM allocates from a volume group to logical volumes."
   ],
   [
    "lvextend -r",
    "Extends a logical volume and resizes its filesystem in the same command."
   ],
   [
    "vgextend",
    "Adds a new physical volume to an existing volume group to increase its free space."
   ],
   [
    "LVM snapshot",
    "A point-in-time view of a logical volume, useful for consistent backups but stored on the same disks."
   ],
   [
    "mdadm",
    "The Linux tool for creating, monitoring and managing software RAID arrays (/dev/mdN)."
   ],
   [
    "/proc/mdstat",
    "A kernel status file showing each software RAID array, its members and any rebuild progress."
   ],
   [
    "RAID 5",
    "Striping with distributed parity across at least three disks, surviving the loss of one disk."
   ]
  ],
  "example": "The /var/lib/pgsql volume on a database server is at 95 percent. vgs shows no free space in the volume group, so you attach a new virtual disk, run pvcreate /dev/sdd and vgextend vgdb /dev/sdd, then lvextend -r -L +50G /dev/vgdb/lvpg. The XFS filesystem grows online, df -h confirms the new size, and the database never stops.",
  "mistakes": [
   [
    "Running lvextend and expecting df to show the new size immediately.",
    "lvextend alone enlarges only the block device. Add -r, or grow the filesystem with resize2fs (ext4) or xfs_growfs (XFS)."
   ],
   [
    "Running vgextend on a brand-new disk before pvcreate.",
    "A disk must be initialized as a physical volume first. The order is pvcreate, vgextend, lvextend."
   ],
   [
    "Choosing RAID 5 for an array of two disks.",
    "RAID 5 needs at least three disks. With two disks, RAID 1 (mirror) is the redundant choice; RAID 0 gives speed with no redundancy."
   ],
   [
    "Treating a RAID 1 mirror or an LVM snapshot as the backup.",
    "Both live on the same system, and deletions or corruption are copied instantly. Real backups are separate copies, ideally stored elsewhere."
   ]
  ],
  "tryit": [
   [
    "A file server has four identical disks. The owner wants the array to keep running even if any two disks fail at the same time, and accepts losing some capacity to parity. Speed is less important than surviving failures. Which RAID level fits, and what is the minimum number of disks?",
    "RAID 6, which uses double parity and survives any two disk failures; it needs at least four disks. RAID 10 also uses four disks but survives two failures only if they are in different mirrored pairs, and RAID 5 survives only one."
   ],
   [
    "After a reboot, a server's software RAID mirror appears as /dev/md127 instead of /dev/md0, and the fstab entry that referenced /dev/md0 fails. The array itself is healthy. What was likely missed when the array was built, and what should you do?",
    "The array definition was never saved to mdadm.conf, so it was auto-assembled under a different name. Run mdadm --detail --scan and append the result to /etc/mdadm.conf (or /etc/mdadm/mdadm.conf on Debian), rebuild the initramfs if the array is needed early in boot, and mount by UUID in fstab."
   ]
  ],
  "tip": "If an LV was extended but df still shows the old size, the filesystem was not resized; the fix is resize2fs (ext4) or xfs_growfs (XFS), or using lvextend -r next time.",
  "check": [
   [
    "Put these in order to add a new disk's space to an existing LV: lvextend, pvcreate, vgextend.",
    "pvcreate the disk, vgextend the volume group with it, then lvextend the logical volume (with -r to grow the filesystem)."
   ],
   [
    "Which RAID level needs at least three disks and survives one disk failure using parity?",
    "RAID 5, which spreads parity across all members so any single disk can be rebuilt."
   ],
   [
    "How do you check whether a software RAID array is rebuilding?",
    "cat /proc/mdstat or mdadm --detail /dev/mdN, both of which show state and recovery progress."
   ],
   [
    "Why is a RAID 1 mirror not a substitute for backups?",
    "Because deletions, corruption and ransomware are written to both disks at once; RAID only protects against hardware failure."
   ],
   [
    "Which command shows how much free space remains in each volume group?",
    "vgs (the VFree column) or vgdisplay for more detail."
   ]
  ]
 },
 {
  "t": "Filesystems: ext4, XFS, Btrfs; mkfs, mount, resize2fs, xfs_growfs; df and du",
  "hook": "At Marigold Design Studio, the render farm's `/var` filesystem alarm has gone off for the third night in a row. Tomasz, the junior admin, has already deleted every old log he could find. `df -h` still insists `/var` is 100 percent full, while `du -sh /var` swears it is only using about half. Two tools, two different answers, and the overnight renders fail at 1 a.m. if nothing changes. Meanwhile, the art director wants the project volume made smaller so the space can go to a new client, and nobody has checked which filesystem it uses. Which tool is telling the truth about `/var`, and is the shrink request even possible?",
  "simple": "A filesystem is the system a disk uses to keep track of where each file's pieces are stored, a bit like the table of contents and page numbers in a book. Linux+ focuses on three kinds. ext4 is the long-time, all-round choice. XFS is fast with big files and is the default on Red Hat systems, but it can only grow, never shrink. Btrfs has extras built in, such as snapshots that save a picture of your files at a moment in time. You create a filesystem with `mkfs`, attach it to a folder with `mount`, and grow it with a tool that matches its type. To see how full things are, `df` reports per disk, like a fuel gauge, and `du` adds up what each folder uses, like checking which suitcase is heaviest.",
  "body": [
   "A filesystem is the on-disk structure that organizes data into files and directories, tracks free space and stores metadata such as permissions and timestamps. Linux supports many, but Linux+ focuses on three: ext4, XFS and Btrfs. You need to know how to create each, mount it, grow it, check it, and measure how full it is, and just as importantly you need to know which operations each one does not support, because exam distractors are often built from those gaps.",
   "ext4 (fourth extended filesystem) is the long-standing default on Debian and Ubuntu. It is a journaling filesystem, meaning it records pending metadata changes in a journal so it can recover quickly and consistently after a crash or power loss. It can be grown while mounted and shrunk while unmounted, it is tuned with `tune2fs`, and it is checked with `e2fsck` (via `fsck`) while unmounted. XFS is the default on RHEL (Red Hat Enterprise Linux) and its relatives. It is also journaling, performs very well with large files and parallel I/O (input/output), and can be grown online, but it cannot be shrunk. It is repaired with `xfs_repair`. Btrfs (B-tree filesystem) is a copy-on-write filesystem, meaning it writes changed data to new blocks instead of overwriting old ones. That design gives it built-in features: subvolumes, snapshots, checksums on data and metadata, compression, and its own multi-device RAID (Redundant Array of Independent Disks) modes. It is the default on some distributions, such as openSUSE and Fedora desktop editions, and is managed with the `btrfs` command, for example `btrfs subvolume snapshot` or `btrfs filesystem usage`.",
   "You create a filesystem with `mkfs`, which is a front end for type-specific tools: `mkfs.ext4 /dev/vgdata/lvweb`, `mkfs.xfs /dev/sdb1`, `mkfs.btrfs /dev/sdc`, or `mkfs -t ext4 ...`. Adding `-L name` sets a label. Formatting destroys what was on the device, so double-check the target with `lsblk` first. `mount /dev/sdb1 /data` attaches a filesystem to a directory, and `umount /data` detaches it (note the spelling, with no first 'n'). `mount -o remount,ro /data` changes options on the fly, and `mount` or `findmnt` with no arguments shows what is mounted. A mount point must exist, and anything already in that directory is hidden while the mount is active. If umount says 'target is busy', a process is using files there; `lsof +D /data` or `fuser -vm /data` shows which one.",
   "Growing is two steps when the underlying device grows: enlarge the partition or LV (logical volume), then grow the filesystem to fill it. For ext4 use `resize2fs /dev/vgdata/lvweb`, which takes the device name. For XFS use `xfs_growfs /data`, which takes the mount point, because XFS must be mounted to grow. For Btrfs use `btrfs filesystem resize max /data`. `lvextend -r` runs the right tool for you, which is why it is the safest habit on LVM (Logical Volume Manager) systems.",
   "Measuring space uses two complementary tools. `df` reports space per mounted filesystem: `df -h` for human-readable sizes, `df -T` to add the type, and `df -i` for inode usage. A filesystem can be 'full' with free blocks left if it runs out of inodes, which happens with millions of tiny files such as cache or session files. `du` reports how much space files and directories consume: `du -sh /var/log` for a total, `du -h --max-depth=1 /var | sort -h` to find the largest subdirectory. When the two disagree, for example `df` says full but `du` cannot find the files, the usual causes are deleted files still held open by a process, or data hidden underneath a mount point.",
   "Consider a worked example. A developer asks for more room in `/srv/app`, an XFS filesystem on LVM. `df -hT /srv/app` confirms the type and usage. You run `lvextend -L +20G /dev/vgapp/lvsrv`, then `xfs_growfs /srv/app`, and `df -h` shows the extra 20 GiB, all without unmounting or restarting the application. A week later `/var` reports 100 percent but `du` finds far less. `lsof +L1` lists a deleted 15 GB log file still held open by a service, and restarting that service releases the space. In both cases, knowing what each tool measures took you straight to the answer.",
   "Several traps recur. Passing a mount point to `resize2fs` or a device to `xfs_growfs` is a favorite way for a question to test the difference. Trying to shrink XFS will not work; you must back up, recreate the filesystem smaller and restore. Running `fsck` on a mounted filesystem can corrupt it. Formatting the wrong device happens when you skip `lsblk`. Mounting over a directory that already holds data can make it look as if the data vanished, when it is only hidden. And inode exhaustion fools people when `df -h` shows free space but writes fail with 'No space left on device'.",
   "Exam questions tend to be phrased as needs. 'Default on RHEL, grow online, cannot shrink' is XFS. 'Copy-on-write, subvolumes, snapshots, checksums' is Btrfs. 'Can be shrunk offline' is ext4. 'Grow after lvextend' points to `resize2fs` (ext4) or `xfs_growfs` (XFS). 'Which filesystem is full' is `df`; 'which directory is using the space' is `du`. 'Target is busy' points to `lsof` or `fuser`."
  ],
  "analogy": "df and du are like a parking garage's two ways of counting. df is the sign at the entrance that counts occupied spaces on each level. du is an attendant walking the rows and adding up the cars they can see. Usually they agree. When the sign says full but the attendant counts fewer cars, a car is probably parked under a tarp: a deleted file a process still holds open. The analogy stops at inodes: a garage can also run out of parking tickets (inodes) while empty spaces remain.",
  "terms": [
   [
    "Journaling",
    "A technique where a filesystem logs pending metadata changes so it can recover consistently after a crash."
   ],
   [
    "ext4",
    "A journaling filesystem, default on Debian and Ubuntu, that can grow online and shrink while unmounted."
   ],
   [
    "XFS",
    "A high-performance journaling filesystem, default on RHEL, that can grow online but cannot shrink."
   ],
   [
    "Btrfs",
    "A copy-on-write filesystem with subvolumes, snapshots, checksums and integrated multi-device support."
   ],
   [
    "resize2fs",
    "Grows or shrinks an ext2/3/4 filesystem to fit its device; takes the device name."
   ],
   [
    "xfs_growfs",
    "Grows a mounted XFS filesystem, specified by its mount point."
   ],
   [
    "df vs du",
    "df reports free and used space per filesystem; du totals the space used by files and directories."
   ],
   [
    "Inode exhaustion",
    "A filesystem running out of inodes, so no new files can be created even though free blocks remain; seen with df -i."
   ]
  ],
  "example": "A developer asks for more room in /srv/app, an XFS filesystem on LVM. You run lvextend -L +20G /dev/vgapp/lvsrv, then xfs_growfs /srv/app, and df -h /srv/app now shows the extra 20 GiB, all without unmounting or restarting the application. The developer never notices a pause.",
  "mistakes": [
   [
    "Planning to shrink an XFS volume with xfs_growfs or lvreduce.",
    "XFS cannot be shrunk at all. The only path is back up, recreate the filesystem at the smaller size and restore. ext4 can be shrunk, but only while unmounted."
   ],
   [
    "Running resize2fs /data or xfs_growfs /dev/sdb1.",
    "resize2fs takes the device (for example /dev/vgdata/lvweb); xfs_growfs takes the mount point (for example /data) because XFS must be mounted to grow."
   ],
   [
    "Running fsck on a mounted filesystem to fix errors quickly.",
    "Checking a mounted filesystem can corrupt it. Unmount it first, or check the root filesystem from rescue mode or at boot."
   ],
   [
    "Assuming 'No space left on device' always means df -h will show 100 percent.",
    "The filesystem may have run out of inodes while blocks remain free. Check df -i."
   ]
  ],
  "tryit": [
   [
    "A mail server stores each message as a small separate file. Users suddenly cannot receive mail, and logs show 'No space left on device', yet df -h shows the mail filesystem at 60 percent used. What do you check, and what does it tell you?",
    "Run df -i. If inode usage is at 100 percent, the filesystem has run out of inodes because of the huge number of small files, even though data blocks remain. Clean up old messages or temporary files, or plan a filesystem created with more inodes."
   ],
   [
    "You need to unmount /data to run a filesystem check, but umount reports 'target is busy'. Nobody will admit to using it. What do you run, and why?",
    "fuser -vm /data or lsof +D /data, which list the processes holding files open on that filesystem. Stop or move those processes (a shell whose current directory is inside /data counts), then unmount and check."
   ]
  ],
  "tip": "Exam items love the XFS shrink trap: XFS cannot be reduced in size, so shrinking requires backing up, recreating the filesystem smaller and restoring.",
  "check": [
   [
    "Which command grows an XFS filesystem mounted at /data after its LV was extended?",
    "xfs_growfs /data, which takes the mount point because XFS must be mounted to grow."
   ],
   [
    "df shows /home at 100 percent, but du -sh /home reports far less. Name one likely cause.",
    "A deleted file is still held open by a running process, so its space is not released until the process closes it or is restarted."
   ],
   [
    "Which filesystem among ext4, XFS and Btrfs provides built-in snapshots and data checksums?",
    "Btrfs, whose copy-on-write design makes snapshots and checksums part of the filesystem."
   ],
   [
    "Writes fail with 'No space left on device' but df -h shows free space. What should you check?",
    "df -i, because the filesystem may have run out of inodes from a very large number of small files."
   ],
   [
    "Which command creates an ext4 filesystem labeled web on /dev/sdb1?",
    "mkfs.ext4 -L web /dev/sdb1 (or mkfs -t ext4 -L web /dev/sdb1)."
   ]
  ]
 },
 {
  "t": "Network configuration: ip, nmcli, netplan, hostnamectl, /etc/hosts, /etc/resolv.conf, nsswitch.conf",
  "hook": "Monday, 7:15 a.m., at Harborview Medical Supply, and the order system cannot reach its database. On Friday evening, Leah from the night team moved the database server to a new static address with a quick `ip addr add` and tested it: everything worked. Over the weekend the server rebooted for patches, and now it is back on its old address, the application servers cannot find it, and one of them still resolves the database name to an address that has not existed for a year. Two separate problems, both caused by not knowing which settings stick and which files the system actually consults. How do you make an address survive a reboot, and why would one server ignore DNS?",
  "simple": "For a computer to talk on a network, it needs an address, a route out (usually called the gateway), a name, and a way to turn names like `db01` into numbers. Linux has tools that change these settings right now, and other tools that save them so they come back after a restart. The `ip` command is like writing on a whiteboard: quick, but wiped when the power goes off. Tools such as `nmcli` or Ubuntu's netplan are like writing in the official logbook: the settings return after every restart. For names, Linux can check a local list (`/etc/hosts`) or ask a DNS server, which is like a phone directory. A file called `nsswitch.conf` decides which one to check first, a bit like deciding whether to check your own contacts before calling directory assistance.",
  "body": [
   "A Linux server is only useful if it can talk on the network, so Linux+ expects you to view and change addresses, routes, hostnames and name resolution with the tools found on current distributions. The key idea is that some commands change the running state only, while others write persistent configuration. Mixing them up is the most common cause of a server that works until its next reboot, so for every tool in this lesson, ask yourself whether its change survives a restart.",
   "The `ip` command from the iproute2 package replaced older tools such as `ifconfig`, `route` and `arp`. `ip addr show` (or `ip a`) lists interfaces and addresses, `ip link set eth0 up` enables an interface, `ip addr add 192.168.10.5/24 dev eth0` adds an IP (Internet Protocol) address, `ip route show` displays the routing table, `ip route add default via 192.168.10.1` sets a default gateway, and `ip neigh` shows the ARP (Address Resolution Protocol) neighbor cache. Changes made with `ip` take effect immediately but are lost at reboot, which makes `ip` ideal for testing and troubleshooting rather than configuration. `ss -tulpn` complements it by listing listening TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) sockets along with the process that owns each one.",
   "For persistent settings, most RHEL-family (Red Hat Enterprise Linux) and many desktop systems use NetworkManager, controlled with `nmcli`. NetworkManager stores connection profiles, separate from device names, and one device can have several profiles. Useful commands: `nmcli device status`, `nmcli connection show`, and a static address change such as `nmcli con mod eth0 ipv4.addresses 192.168.10.5/24 ipv4.gateway 192.168.10.1 ipv4.dns 192.168.10.53 ipv4.method manual`, followed by `nmcli con up eth0` to apply. `nmcli con mod` only edits the saved profile; nothing changes on the wire until you bring the connection up again or reapply it. `nmtui` offers a text menu for the same tasks.",
   "Ubuntu uses netplan: you describe interfaces in YAML (YAML Ain't Markup Language) files under `/etc/netplan/`, and netplan renders them for a backend, either systemd-networkd or NetworkManager. After editing, `netplan try` applies the change and rolls it back automatically unless you confirm, which protects you from locking yourself out of a remote server; `netplan apply` applies it directly. YAML is indentation-sensitive and does not allow tabs, so a stray tab or misaligned key is a common error. The example below gives an interface a static address, a default route and a DNS server.",
   "```\nnetwork:\n  version: 2\n  ethernets:\n    ens3:\n      addresses: [10.0.5.20/24]\n      routes:\n        - to: default\n          via: 10.0.5.1\n      nameservers:\n        addresses: [10.0.5.53]\n```",
   "Names come next. `hostnamectl` shows and sets the hostname, writing `/etc/hostname`: `hostnamectl set-hostname web01.example.com`. `/etc/hosts` maps names to IP addresses locally, useful for small labs or overrides, for example `192.168.10.20 db01`. `/etc/resolv.conf` lists DNS (Domain Name System) servers as `nameserver` lines and a `search` domain list. On many systems this file is generated by NetworkManager or systemd-resolved, so edit the connection profile rather than the file, or your change will be overwritten. `/etc/nsswitch.conf` (Name Service Switch) decides the order in which sources are consulted: `hosts: files dns` means check `/etc/hosts` first, then DNS. The same file controls user (`passwd:`) and group lookups, which is how SSSD (System Security Services Daemon) or LDAP (Lightweight Directory Access Protocol) accounts are wired in. `getent hosts name` follows nsswitch, exactly as applications do, while `dig` queries DNS directly and ignores `/etc/hosts`.",
   "Consider a worked example. A RHEL server must move to a static address. Working over its console, not SSH (Secure Shell), you run `nmcli con mod ens192 ipv4.method manual ipv4.addresses 10.0.5.20/24 ipv4.gateway 10.0.5.1 ipv4.dns 10.0.5.53`, then `nmcli con up ens192`. `ip a` confirms the address, `ip route` shows the default route, and `getent hosts intranet.example.com` resolves. One internal name still points to an old address; `dig` returns the right answer, so you check `/etc/hosts`, find a stale entry, and remove it. A final reboot during the maintenance window proves the settings persist.",
   "Several slips recur. People use `ip addr add` and expect it to survive reboot, hand-edit a generated `/etc/resolv.conf`, test name resolution only with `dig` and miss a hosts-file override, leave tabs in netplan YAML, or change the address of the interface they are connected through without a rollback plan such as `netplan try`. Another frequent slip is forgetting the prefix length, for example giving `10.0.5.20` with no `/24`, which can produce an unexpected netmask.",
   "Exam questions usually ask which change persists or which file controls a behavior. 'Survives reboot' rules out `ip`; the answer is an `nmcli` profile, netplan YAML or the distribution's configuration files. 'Name resolves differently from DNS' points to `/etc/hosts` and `nsswitch.conf` order. 'Set the hostname permanently' is `hostnamectl set-hostname`. 'Safely apply network changes remotely on Ubuntu' is `netplan try`. 'Show routing table' is `ip route`, and 'which service is listening on a port' is `ss -tulpn`."
  ],
  "analogy": "Name resolution works like finding a phone number. /etc/hosts is the short list of numbers taped to your own desk, DNS is the company directory you call, and nsswitch.conf is your habit of checking the desk list first. If someone left an old number taped to your desk, you will keep dialing it no matter how correct the directory is. dig is like calling the directory directly, which is why it can give the right answer while your applications, which check the desk first, still get the wrong one.",
  "terms": [
   [
    "iproute2 (ip)",
    "The modern suite for viewing and changing interfaces, addresses, routes and neighbors; changes are not persistent."
   ],
   [
    "nmcli",
    "Command-line client for NetworkManager that manages persistent connection profiles."
   ],
   [
    "netplan",
    "Ubuntu's YAML-based network configuration system that renders settings for systemd-networkd or NetworkManager."
   ],
   [
    "hostnamectl",
    "systemd tool that shows and permanently sets the system hostname."
   ],
   [
    "/etc/hosts",
    "A local file mapping host names to IP addresses, often consulted before DNS."
   ],
   [
    "/etc/resolv.conf",
    "Lists DNS nameservers and search domains used by the system resolver."
   ],
   [
    "nsswitch.conf",
    "Defines the order of lookup sources (files, dns, sss and others) for hosts, users, groups and more."
   ],
   [
    "getent",
    "Looks up entries such as hosts or users through nsswitch.conf, the same way applications do."
   ]
  ],
  "example": "A RHEL server must move to a static address. Working over its console, you run nmcli con mod ens192 ipv4.method manual ipv4.addresses 10.0.5.20/24 ipv4.gateway 10.0.5.1 ipv4.dns 10.0.5.53, then nmcli con up ens192. ip a confirms the address, ip route shows the default route, and getent hosts intranet.example.com resolves correctly.",
  "mistakes": [
   [
    "Choosing ip addr add as the way to set a permanent static address.",
    "ip changes only the running state and is lost at reboot. Persistent addresses come from an nmcli profile, netplan YAML or the distribution's configuration files."
   ],
   [
    "Editing /etc/resolv.conf by hand on a NetworkManager or systemd-resolved system.",
    "The file is regenerated and your change disappears. Set DNS servers in the connection profile (for example ipv4.dns with nmcli) or in netplan."
   ],
   [
    "Using dig to prove that applications will resolve a name correctly.",
    "dig queries DNS directly and ignores /etc/hosts and nsswitch.conf. getent hosts follows the same lookup order applications use."
   ],
   [
    "Running nmcli con mod and expecting the address to change immediately.",
    "con mod edits the saved profile only. Run nmcli con up (or reapply) to activate the change."
   ]
  ],
  "tryit": [
   [
    "You must change the IP address of an Ubuntu cloud server that you can reach only over SSH, through the very interface you are changing. A mistake would lock you out and require a support ticket. You have already edited the YAML file in /etc/netplan. How do you apply it?",
    "Run netplan try. It applies the new configuration and automatically rolls it back after a timeout unless you confirm, so if the change cuts your SSH session, the old settings return. Once you confirm connectivity, accept the change."
   ],
   [
    "A Linux app server reaches the payroll host at an old address, while every other server reaches the new one. dig payroll.example.com returns the new, correct address on the app server itself. What do you check, and why?",
    "/etc/hosts for a stale payroll entry, and the hosts: line in /etc/nsswitch.conf. If nsswitch says files before dns, the local hosts entry overrides DNS for applications, while dig bypasses it. Remove the stale entry and confirm with getent hosts payroll.example.com."
   ]
  ],
  "tip": "If a question asks which change survives a reboot, ip addr add is the wrong answer; persistent changes come from nmcli connection profiles, netplan YAML or the distribution's configuration files.",
  "check": [
   [
    "A name resolves to an unexpected IP even though DNS is correct. What two files should you check?",
    "/etc/hosts, which may contain an override, and /etc/nsswitch.conf, which controls whether files are checked before DNS."
   ],
   [
    "Why is netplan try safer than netplan apply on a remote server?",
    "netplan try reverts the configuration automatically if you do not confirm within the timeout, so a mistake cannot permanently lock you out."
   ],
   [
    "Which command permanently sets the hostname to app02?",
    "hostnamectl set-hostname app02, which updates /etc/hostname and the running hostname."
   ],
   [
    "Which command shows the routing table, including the default gateway?",
    "ip route show (or ip r), which lists routes such as 'default via 10.0.5.1 dev ens192'."
   ],
   [
    "Which command lists listening ports and the processes that own them?",
    "ss -tulpn, showing TCP and UDP listening sockets with numeric ports and process names."
   ]
  ]
 },
 {
  "t": "Shell operations: redirection, pipes, environment variables, grep, sed, awk, cut, sort, uniq, tr",
  "hook": "Thursday afternoon at Riverbend Public Schools, and Grace from the security office needs an answer before the board meeting at 4:00: which ten addresses hit the student portal's login page most often last night, and how many times each? The web log is two million lines long. You could open it in an editor and scroll until the end of the school year, or you could chain together four or five tiny commands that each do one simple job and get the answer in seconds. A teammate already tried, and his command printed every address with a count of 1. Something in his pipeline was in the wrong order. Can you spot what, and build one that works?",
  "simple": "The Linux command line works like an assembly line. Each small tool does one job on lines of text, such as find the lines containing a word (`grep`), pull out one column (`cut` or `awk`), put lines in order (`sort`), count repeats (`uniq -c`) or swap characters (`tr`). A pipe, the `|` symbol, hands the output of one tool to the next. Arrows like `>` send the final result into a file instead of the screen. Environment variables are named settings, such as where to look for programs, that programs can read. It is like a kitchen line: one cook chops, the next fries, the next plates, and the order matters, because you cannot plate food before it is cooked.",
  "body": [
   "The Linux shell's real power comes from combining small tools. Each program reads text, transforms it and writes text, and redirection and pipes connect them into a pipeline. Linux+ performance-based questions often ask you to build or interpret one of these one-liners, so read them left to right and ask what each stage receives and what it passes on. Once that habit forms, even long pipelines become a series of simple steps.",
   "Every process has three standard streams: stdin (standard input, file descriptor 0), stdout (standard output, 1) and stderr (standard error, 2). `>` redirects stdout to a file, overwriting it; `>>` appends; `<` feeds a file to stdin. `2>` redirects errors, `2>/dev/null` discards them, and `&>` or `> file 2>&1` sends both output and errors to the same file. Order matters: `cmd > out 2>&1` works, because stdout is pointed at the file first and stderr then copies that destination, while `cmd 2>&1 > out` sends errors to the terminal. A pipe `|` connects one command's stdout to the next command's stdin (stderr is not piped unless you redirect it), and `tee file` copies the stream to a file while passing it on. A here-document (`<<EOF`) feeds inline text as input until a line containing only `EOF`.",
   "Environment variables carry settings to programs. `NAME=value` sets a shell variable; `export NAME` makes it an environment variable inherited by child processes such as scripts you run. `echo $PATH` shows the colon-separated directory search list for commands, `env` or `printenv` lists the environment, and `unset NAME` removes a variable. Persistent settings go in startup files: `~/.bashrc` for interactive shells, `~/.bash_profile` or `~/.profile` for login shells, and `/etc/profile` or `/etc/profile.d/*.sh` for everyone. After editing, `source ~/.bashrc` loads the change into the current shell without logging out.",
   "The filtering tools each have a specialty. `grep` searches for patterns: `-i` ignores case, `-v` inverts the match, `-r` recurses, `-n` shows line numbers, `-c` counts matching lines, `-E` enables extended regular expressions, and `-w` matches whole words. `cut` extracts fields or columns: `cut -d: -f1 /etc/passwd` prints usernames. `sort` orders lines (`-n` numeric, `-r` reverse, `-k2` by field 2, `-h` human sizes, `-u` unique), and `uniq` collapses adjacent duplicates, which is why it almost always follows `sort`; `uniq -c` counts them. `tr` translates or deletes characters from stdin only: `tr 'a-z' 'A-Z'` uppercases, `tr -d '\\r'` strips Windows carriage returns, `tr -s ' '` squeezes repeated spaces.",
   "`sed` is a stream editor. The most common use is substitution: `sed 's/old/new/g' file` prints the file with every match replaced, and `sed -i 's/old/new/g' file` edits it in place (add a suffix, as in `-i.bak`, to keep a backup). Without `g`, only the first match on each line changes. `sed -n '5,10p'` prints lines 5 to 10, and `sed '/^#/d'` deletes comment lines. `awk` processes records field by field, splitting on whitespace by default: `awk '{print $1}'` prints the first field, `awk -F: '$3 >= 1000 {print $1}' /etc/passwd` lists regular users, and `awk '{sum += $5} END {print sum}'` totals a column. The pipeline below answers the classic question of which clients appear most often in a web log.",
   "```bash\n# top five client addresses in a web log\nawk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -5\n```",
   "Consider a worked example. You need a list of every account that uses bash as its shell. `grep '/bin/bash$' /etc/passwd` finds the lines (the `$` anchors the match to the end of the line), `| cut -d: -f1` keeps only the usernames, and `| sort` orders them. Adding `> bash-users.txt 2>/dev/null` saves the list while discarding any errors. The same result comes from `awk -F: '$7 == \"/bin/bash\" {print $1}' /etc/passwd | sort`, which shows how awk can replace a grep and cut pair, since it both filters and prints a field.",
   "A few mistakes appear constantly: piping unsorted data into `uniq`; writing `2>&1` before the file redirection; using `>` when you meant `>>` and wiping a log; forgetting `export`, so a child script cannot see a variable; passing a file name to `tr`, which reads only stdin, so use `tr ... < file`; and running `sed -i` on a configuration file without a backup. Also watch quoting: single quotes stop the shell expanding `$1` inside an awk program, while double quotes let the shell substitute its own variables first, which silently breaks the script.",
   "Exam questions often show a pipeline and ask for its output, or describe a goal and ask which tool fits. 'Replace text in a file' is `sed`. 'Print a column or do arithmetic on fields' is `awk`. 'Extract a delimited field' is `cut -d -f`. 'Count occurrences' is `sort | uniq -c`. 'Change case or delete characters' is `tr`. 'Save output and still see it' is `tee`. 'Discard errors' is `2>/dev/null`, and 'make a variable visible to child processes' is `export`."
  ],
  "analogy": "A pipeline is a bucket brigade. Each person takes the bucket from the one before, does one thing to it, and passes it on; nobody sees the whole river. Redirection decides where the last bucket is poured: > empties it into a fresh barrel, >> adds to the barrel already there. stderr is a separate gutter running beside the line, which is why errors still splash onto your screen unless you redirect that gutter too with 2>.",
  "terms": [
   [
    "File descriptor",
    "A number identifying an open stream: 0 is stdin, 1 is stdout and 2 is stderr."
   ],
   [
    "Pipe",
    "The | operator that sends one command's standard output to another command's standard input."
   ],
   [
    "Redirection",
    "Operators such as >, >>, < and 2> that connect a command's streams to files instead of the terminal."
   ],
   [
    "export",
    "Marks a shell variable so it is passed to child processes as an environment variable."
   ],
   [
    "tee",
    "Copies its standard input to a file and to standard output at the same time."
   ],
   [
    "sed",
    "A stream editor used mainly for search-and-replace and line filtering; -i edits files in place."
   ],
   [
    "awk",
    "A pattern-scanning language that splits lines into fields ($1, $2 ...) for filtering and reporting."
   ],
   [
    "uniq",
    "Collapses adjacent duplicate lines; -c prefixes each with a count, so input is usually sorted first."
   ]
  ],
  "example": "You need a list of every account that uses bash as its shell. Running grep '/bin/bash$' /etc/passwd | cut -d: -f1 | sort prints the usernames alphabetically, and adding > bash-users.txt 2>/dev/null saves the list while discarding any errors. You attach the file to an access review ticket.",
  "mistakes": [
   [
    "Picking awk '{print $1}' log | uniq -c | sort -rn to count repeats.",
    "uniq only merges adjacent duplicates, so unsorted input gives many counts of 1. Sort first: awk '{print $1}' log | sort | uniq -c | sort -rn."
   ],
   [
    "Writing cmd 2>&1 > file to capture both streams.",
    "Redirections are processed left to right, so stderr is copied to the terminal before stdout moves to the file. Use cmd > file 2>&1 or cmd &> file."
   ],
   [
    "Running tr 'a-z' 'A-Z' names.txt.",
    "tr does not take file names; it reads only stdin. Use tr 'a-z' 'A-Z' < names.txt or pipe into it."
   ],
   [
    "Assuming a variable set with NAME=value is visible inside a script you then run.",
    "Without export it is only a shell variable. Run export NAME (or export NAME=value) so child processes inherit it."
   ]
  ],
  "tryit": [
   [
    "A nightly job runs /opt/scripts/report.sh. You want its normal output appended to /var/log/report.log so earlier nights are kept, its error messages appended to the same file, and nothing printed to the screen. One teammate suggests report.sh > /var/log/report.log 2>&1. Is that right?",
    "Not quite: > overwrites the log every night. Use report.sh >> /var/log/report.log 2>&1 (or &>> in bash). The >> appends, and 2>&1 placed after the file redirection sends errors to the same file."
   ],
   [
    "You must change every occurrence of the old server name dbold to dbnew in /etc/app/app.conf, keep a copy of the original in case of trouble, and do it in one command. What do you run?",
    "sed -i.bak 's/dbold/dbnew/g' /etc/app/app.conf. The -i edits in place, the .bak suffix saves the original as app.conf.bak, and g replaces every match on each line rather than only the first."
   ]
  ],
  "tip": "uniq only removes adjacent duplicates, so answers that pipe unsorted data into uniq -c are usually wrong; look for sort before uniq.",
  "check": [
   [
    "How do you send both stdout and stderr of a backup script to backup.log, appending?",
    "backup.sh >> backup.log 2>&1 (or backup.sh &>> backup.log in bash); the 2>&1 must come after the file redirection."
   ],
   [
    "What does sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config do?",
    "It edits the file in place, replacing the first occurrence on each line of 'PermitRootLogin yes' with 'PermitRootLogin no'."
   ],
   [
    "Which command prints only the first field of /etc/group using a colon delimiter?",
    "cut -d: -f1 /etc/group (or awk -F: '{print $1}' /etc/group)."
   ],
   [
    "A variable set in your shell is empty inside a script you run. What was missing?",
    "export; without it the variable is a shell variable only and is not passed to child processes."
   ],
   [
    "Which command saves a command's output to a file while still showing it on the screen?",
    "tee, for example cmd | tee output.txt (tee -a to append)."
   ]
  ]
 },
 {
  "t": "Backup and restore: tar, gzip/xz/bzip2, rsync, dd, cpio",
  "hook": "Wednesday, 9:30 a.m., at Juniper Valley Veterinary Group. Elena, the practice manager, calls: the appointment system shows strange gaps, and a spreadsheet of vaccine records will not open. Digging in, you find that a faulty sync script has been quietly corrupting files since Saturday. Good news: there is a nightly backup. Bad news: it is an exact mirror, refreshed every night at 2:00 a.m., and it now holds the same corrupted files, faithfully copied four nights in a row. Somewhere on the backup server there might also be weekly archives, if whoever set this up thought ahead. What is the difference between a mirror and an archive, and which tool gets Elena's records back?",
  "simple": "A backup is a spare copy of your files you can use if the originals are lost or damaged. Linux has a few classic tools for this. `tar` bundles many files into one package, like packing a moving box, and can squeeze it smaller with a compressor such as gzip, bzip2 or xz. `rsync` keeps a second copy up to date by sending only what changed, like updating a photocopy page by page instead of recopying the whole book. `dd` copies an entire disk exactly, every byte, like photographing a whole bookshelf rather than individual books. `cpio` is an older packer that takes a list of files to pack. The big lesson: a copy that updates every night also copies mistakes, so you need older copies too.",
  "body": [
   "Backups are only useful if you can restore from them, so it helps to understand what each tool captures and how to get the data back. Linux+ tests the classic command-line tools and their key options, and expects you to pick the right one for a scenario: an archive of files, an efficient mirror, a raw disk image, or a file list piped from `find`. Think of each tool by what it copies (files or raw blocks), how it updates (all at once or only changes), and how you restore from it.",
   "`tar` (tape archive) bundles files and directories into a single archive while preserving paths, permissions and ownership. The core modes are `-c` create, `-x` extract and `-t` list contents, with `-f` naming the archive file and `-v` for verbose output. Compression is added with a flag: `-z` for gzip (`.tar.gz` or `.tgz`), `-j` for bzip2 (`.tar.bz2`) and `-J` for xz (`.tar.xz`). So `tar -czvf etc-backup.tar.gz /etc` creates a compressed backup, `tar -tzf etc-backup.tar.gz` lists it, and `tar -xzvf etc-backup.tar.gz -C /restore` extracts into a chosen directory. When you extract as root, tar restores stored permissions and ownership by default; an ordinary user can add `-p` to keep stored permissions instead of applying their umask. tar strips the leading `/` from paths, so extraction lands relative to the current directory or the `-C` target, which protects you from overwriting live files by accident.",
   "The compressors also work alone on single files. `gzip file` produces `file.gz` and removes the original; `gunzip` or `gzip -d` reverses it. `bzip2` usually compresses smaller but slower, and `xz` usually gives the smallest output at the cost of more CPU (central processing unit) time and memory. Each has a matching tool to read compressed text without extracting: `zcat`, `bzcat`, `xzcat`, which is handy for searching rotated logs. The general trade-off to remember is gzip fastest, xz smallest. None of them bundles multiple files, which is why they pair with tar.",
   "`rsync` synchronizes files between directories or hosts, copying only what changed, which makes it ideal for repeated backups of large trees. `rsync -av /srv/ backup01:/backups/srv/` copies in archive mode (recursive, preserving permissions, times, links, owner and group) over SSH (Secure Shell). `--delete` removes files at the destination that no longer exist at the source, making an exact mirror, and `-n` (`--dry-run`) shows what would happen without changing anything. A trailing slash on the source means 'copy the contents of this directory' rather than the directory itself, a detail that often appears on exams: `rsync -a /data/ dest/` fills `dest` with the contents, while `rsync -a /data dest/` creates `dest/data`.",
   "`dd` copies raw blocks, ignoring filesystems entirely. `dd if=/dev/sda of=/backup/sda.img bs=4M status=progress` images a whole disk, and swapping `if` (input file) and `of` (output file) restores it. It is also used to write installation images to USB (Universal Serial Bus) drives and to back up a boot sector with `bs=512 count=1`. Because it overwrites the output device without asking, confirm device names with `lsblk` first. Images of mounted, changing filesystems may be inconsistent, so image unmounted or snapshotted devices.",
   "`cpio` (copy in, copy out) is an older archiver that reads the list of files to archive from stdin, so it pairs naturally with `find`: `find /etc | cpio -ov > etc.cpio` creates an archive and `cpio -idv < etc.cpio` extracts it, with `-d` creating directories as needed. You still meet it because initramfs images and RPM (RPM Package Manager) package payloads use cpio format, so knowing it helps when you need to look inside one.",
   "Consider a worked example. Each night a cron job runs `rsync -a --delete /var/www/ backup01:/backups/www/` so the backup server holds an exact mirror, and once a week `tar -cJf /archive/www-$(date +%F).tar.xz /var/www` creates a compressed point-in-time archive. When a developer deletes a directory by mistake, you restore it from last night's rsync copy within minutes. When corruption is discovered that started four days ago, the mirror has already copied the damage, so you list the older weekly archive with `tar -tJf`, extract it with `tar -xJf ... -C /restore` and copy back only the affected files.",
   "Common slips include mixing up the tar letters, such as using `-z` on an xz file; forgetting `-f`, so tar tries a tape device; omitting or adding the rsync trailing slash and nesting a directory one level too deep; running `rsync --delete` in the wrong direction and mirroring an empty source over a good backup (a dry run with `-n` prevents this); swapping `if` and `of` in `dd`; and never testing restores. Keep more than one copy, store at least one away from the original system, and remember that a mirror alone is not history.",
   "Exam questions pair a need with a tool. 'Bundle a directory into one compressed file' is `tar` with `-z`, `-j` or `-J`. 'Smallest file' points to xz; 'fastest' points to gzip. 'Copy only changes', 'mirror to a remote host' is `rsync`. 'Bit-for-bit disk image' or 'write an installation image to USB' is `dd`. 'Archive the file list produced by find' or 'initramfs format' is `cpio`. 'List contents without extracting' is `tar -t`."
  ],
  "analogy": "An rsync mirror is like a live security camera feed: it always shows exactly what the room looks like right now. A dated tar archive is like a photograph taken every Sunday. If someone spills paint on Tuesday, the live feed shows the spill instantly and cannot show you the room before it; only Sunday's photo can. dd is like photographing the whole building, walls and wiring included, rather than the furniture. The analogy stops at rsync's speed: unlike a camera, rsync only sends the parts that changed since last time.",
  "mnemonic": "tar compression letters: little z for gzip, little j for bzip2, big J for xz, the biggest squeeze. Modes: c create, x extract, t table of contents (list).",
  "terms": [
   [
    "tar",
    "Archiving tool that bundles files while preserving metadata; -c create, -x extract, -t list, -f file, with -z/-j/-J for gzip/bzip2/xz."
   ],
   [
    "gzip / bzip2 / xz",
    "Single-file compressors; gzip is usually fastest, xz usually produces the smallest output, bzip2 sits between."
   ],
   [
    "rsync",
    "Incremental file synchronization tool that transfers only differences, locally or over SSH."
   ],
   [
    "rsync --delete",
    "Removes files from the destination that no longer exist at the source, producing an exact mirror."
   ],
   [
    "dd",
    "Block-level copy tool used for disk images and writing raw devices; if= input, of= output."
   ],
   [
    "cpio",
    "Archiver that takes file lists on stdin, commonly paired with find; used in initramfs and RPM payloads."
   ],
   [
    "xz",
    "A compressor that usually achieves higher compression than gzip or bzip2 at the cost of speed."
   ]
  ],
  "example": "Each night a cron job runs rsync -a --delete /var/www/ backup01:/backups/www/ so the backup server holds an exact mirror, and once a week tar -cJf /archive/www-$(date +%F).tar.xz /var/www creates a compressed point-in-time archive. When a developer deletes a directory by mistake, you restore it from last night's rsync copy within minutes.",
  "mistakes": [
   [
    "Using tar -xzf on a file ending in .tar.xz.",
    "-z means gzip. For xz use -J (tar -xJf); for bzip2 use -j. Modern GNU tar can often detect compression on extract, but exam questions test the correct letter."
   ],
   [
    "Treating a nightly rsync --delete mirror as complete protection.",
    "A mirror copies deletions and corruption on its next run. Keep dated archives or versioned backups so you can restore from before the problem began."
   ],
   [
    "Thinking gzip alone can back up a whole directory.",
    "gzip, bzip2 and xz compress single files. Bundle the directory with tar first, or use tar's -z, -j or -J flags."
   ],
   [
    "Running dd if=/dev/sdb of=/dev/sda without checking lsblk.",
    "dd overwrites the output device without confirmation. Swapping if and of, or choosing the wrong disk, destroys data. Confirm devices with lsblk and read the command twice."
   ]
  ],
  "tryit": [
   [
    "You must copy /home/projects to backup02 every hour. The tree is 300 GB, but only a few hundred megabytes change each day. The copy at backup02 should match the source exactly, including removing files users have deleted. You want to see the effect before the first real run. What command do you use?",
    "rsync -av --delete -n /home/projects/ backup02:/backups/projects/ first, as a dry run, then the same command without -n. rsync transfers only changes, -a preserves attributes, --delete removes files deleted at the source, and the trailing slash copies the contents rather than nesting a projects directory."
   ],
   [
    "A technician needs a bit-for-bit image of a failing USB drive, /dev/sdc, for later analysis, saved as a file on /mnt/evidence. The drive's filesystem may be damaged, so file-level tools may miss data. Which tool and command fit?",
    "dd, because it copies raw blocks regardless of the filesystem: dd if=/dev/sdc of=/mnt/evidence/usb.img bs=4M status=progress. Confirm with lsblk that /dev/sdc is the USB drive and that if and of are not swapped."
   ]
  ],
  "tip": "Match the tar letters carefully: z is gzip, j is bzip2, J is xz; and c, x and t are create, extract and list.",
  "check": [
   [
    "Which command lists the contents of backup.tar.bz2 without extracting it?",
    "tar -tjf backup.tar.bz2, where t lists, j handles bzip2 and f names the file."
   ],
   [
    "What is the difference between rsync -a /data/ dest/ and rsync -a /data dest/?",
    "With the trailing slash the contents of /data are copied into dest; without it the directory data itself is created inside dest."
   ],
   [
    "Why is dd risky, and how do you reduce the risk?",
    "It overwrites the output device without confirmation; verify device names with lsblk and double-check if= and of= before running it."
   ],
   [
    "Why keep dated tar archives when you already have a nightly rsync mirror?",
    "Because a mirror copies deletions and corruption on the next run; dated archives let you restore from a point before the problem began."
   ],
   [
    "Which archiver reads its list of files from standard input and is often paired with find?",
    "cpio, for example find /etc | cpio -ov > etc.cpio."
   ]
  ]
 },
 {
  "t": "Virtualization: KVM/QEMU, libvirt and virsh, virt-install, qcow2 vs raw images",
  "hook": "It is Monday morning at Lakeview Logistics, and Dana from the test team needs five fresh servers by lunch to try a database upgrade. You have one powerful Linux host and no budget for more hardware. You remember the last admin built VMs by hand through a graphical tool and left behind a folder of 40 GB disk files nobody dares to delete. This time you want something you can script, repeat and clean up in minutes. Which layers do you need, which commands create and remove a guest, and which disk format will keep five copies of the same system from eating the whole drive?",
  "simple": "Virtualization means one real computer pretends to be several separate computers. Each pretend computer, called a virtual machine, runs its own full operating system. On Linux, three pieces work together. KVM is part of the Linux kernel and uses special features in the processor to run guests quickly. QEMU builds the pretend hardware, like a fake disk and network card. libvirt is the manager you talk to, using the `virsh` command to start, stop and list machines. Each virtual machine stores its hard drive as a file. A raw file is a simple copy of the whole disk. A qcow2 file only grows as data is added and can save snapshots. Think of renting apartments in one building: same building, separate locked units.",
  "body": [
   "Virtualization lets one physical host run several isolated operating systems, called guests or VMs (virtual machines). On Linux the standard open-source stack is KVM, QEMU and libvirt. Linux+ expects you to know what each layer does, manage guests from the command line and choose a disk image format. It also helps to keep the difference from containers clear: a VM runs its own kernel on virtual hardware, while a container shares the host kernel. Picture a single lab server running a web guest, a database guest and a test guest side by side, each convinced it owns a whole machine with its own disks, network card and kernel. Making that illusion fast, manageable and easy to tear down is what the tools in this lesson are for.",
   "KVM (Kernel-based Virtual Machine) is a set of kernel modules (`kvm` plus `kvm_intel` or `kvm_amd`) that turns Linux into a type 1 hypervisor by using the processor's (CPU's, central processing unit's) hardware virtualization extensions, Intel VT-x or AMD-V. You can check for support with `grep -E 'vmx|svm' /proc/cpuinfo` and confirm the modules with `lsmod | grep kvm`; if the extensions are disabled in firmware, KVM cannot run and `/dev/kvm` will be missing. QEMU (Quick Emulator) provides the rest of the virtual machine: emulated or paravirtualized devices such as disks, network cards and graphics. With KVM underneath, QEMU runs guest code directly on the CPU at near-native speed. Paravirtualized virtio drivers for disk and network give the best guest performance because the guest knows it is virtualized and skips slow hardware emulation.",
   "libvirt is a management layer with a daemon (`libvirtd`, or modular daemons such as `virtqemud` on newer systems) and API that controls QEMU/KVM and other hypervisors consistently. It stores each guest's configuration as XML, manages virtual networks such as the default NAT (Network Address Translation) network on bridge `virbr0`, and manages storage pools, commonly `/var/lib/libvirt/images`. Tools on top include `virsh` (command line), `virt-manager` (graphical) and `virt-install` (guest creation). A bridged network, by contrast with NAT, puts guests directly on the physical LAN (local area network) with their own addresses. Useful `virsh` commands: `virsh list --all` shows running and stopped guests, `virsh start web01`, `virsh shutdown web01` (a graceful ACPI, Advanced Configuration and Power Interface, shutdown request the guest must honor), `virsh destroy web01` (an immediate power-off that does not delete anything, despite the name), `virsh reboot`, `virsh autostart web01` to start with the host, `virsh dumpxml web01` to view the configuration, `virsh edit web01` to change it safely, and `virsh console web01` for a serial console. `virsh undefine` removes the guest's definition, and `virsh snapshot-create-as` creates snapshots. `virt-install` creates a guest in one command, for example `virt-install --name web01 --memory 2048 --vcpus 2 --disk size=20 --cdrom /isos/installer.iso --os-variant <variant> --network network=default`; `osinfo-query os` lists valid variant names, and `--import` boots an existing disk instead of installing.",
   "Disk images come in two main formats. Raw is a plain byte-for-byte image: simple, fast and portable, but without features; it may be allocated fully or as a sparse file. qcow2 (QEMU copy-on-write version 2) is thin-provisioned so it grows as data is written, and supports internal snapshots, backing files (a thin overlay on a shared base image) and compression, with a small performance cost. Choose qcow2 for flexibility and snapshots; choose raw when maximum simplicity or performance matters. You can see the difference at any time: `qemu-img info` reports both the virtual size the guest believes it has and the disk size actually consumed on the host, and `qemu-img convert` moves a disk between formats when your needs change.",
   "```\nqemu-img create -f qcow2 disk.qcow2 20G\nqemu-img info disk.qcow2          # format, virtual size, actual size\nqemu-img convert -f raw -O qcow2 in.img out.qcow2\nqemu-img create -f qcow2 -b golden.qcow2 -F qcow2 test01.qcow2\n```",
   "Consider a worked example. You need a throwaway test VM based on a golden image. The last command above creates `test01.qcow2`, a small overlay that stores only changes while `golden.qcow2` stays untouched. `virt-install --name test01 --memory 2048 --vcpus 2 --disk test01.qcow2 --import --os-variant <variant>` defines and boots it, and `virsh list --all` shows it running. When testing ends, `virsh destroy test01` forces it off and `virsh undefine test01` removes the definition; deleting the overlay file reclaims the space.",
   "Common mistakes: reading `virsh destroy` as 'delete'; expecting `virsh shutdown` to work on a guest with no ACPI support or a hung OS; forgetting to enable VT-x or AMD-V in firmware; modifying a backing image that overlays depend on, which corrupts them; and assuming a thin qcow2 image's virtual size is the space it currently uses (check `qemu-img info`).",
   "Exam questions tend to map words to layers and commands. 'Kernel module that uses CPU extensions' is KVM. 'Emulates devices' is QEMU. 'Manage guests from the command line' is `virsh`; 'create a guest in one command' is `virt-install`. 'Force off' is `destroy`, 'remove definition' is `undefine`, 'start with host' is `autostart`. 'Thin provisioning, snapshots, backing file' points to qcow2; 'simplest, best raw performance' points to raw. 'Fastest guest disk and network' points to virtio."
  ],
  "analogy": "Think of the host as an apartment building. KVM is the building's structure and utilities that let each unit run efficiently, QEMU is the fittings inside each unit (doors, sinks, wiring), and libvirt with virsh is the property manager's office that hands out keys and records who lives where. A qcow2 overlay is like a tenant who only adds their own furniture to a furnished unit. The analogy breaks at destroy: evicting the tenant (virsh destroy) does not demolish the unit; removing it from the books is virsh undefine.",
  "terms": [
   [
    "KVM",
    "Kernel-based Virtual Machine: kernel modules that use CPU virtualization extensions to make Linux a hypervisor."
   ],
   [
    "QEMU",
    "The emulator that supplies virtual hardware and, with KVM, runs guests at near-native speed."
   ],
   [
    "libvirt / virsh",
    "A management API and daemon for hypervisors, and its command-line client for controlling guests."
   ],
   [
    "qcow2",
    "A thin-provisioned QEMU disk format supporting snapshots, backing files and compression."
   ],
   [
    "Raw image",
    "A plain byte-for-byte disk image with no metadata features, valued for simplicity and performance."
   ],
   [
    "virtio",
    "Paravirtualized device drivers that give guests fast disk and network I/O."
   ],
   [
    "Backing file",
    "A read-only base image that a qcow2 overlay refers to, storing only the overlay's changes."
   ]
  ],
  "example": "You need a throwaway test VM based on a golden image. qemu-img create -f qcow2 -b golden.qcow2 -F qcow2 test01.qcow2 creates a small overlay that only stores changes, virt-install --import boots it, and when testing ends virsh destroy and virsh undefine remove it while the golden image stays untouched.",
  "mistakes": [
   [
    "virsh destroy deletes the virtual machine.",
    "It only forces the guest off, like pulling the power cord. The definition and disk survive. virsh undefine removes the definition, and deleting the disk file reclaims space."
   ],
   [
    "KVM and QEMU are competing hypervisors, so you choose one.",
    "They work together: KVM is the kernel module that uses CPU extensions to run guest code natively, and QEMU supplies the virtual devices. libvirt manages both."
   ],
   [
    "A 20 GB qcow2 image always uses 20 GB on disk.",
    "qcow2 is thin-provisioned, so the virtual size is what the guest sees, while actual usage grows as data is written. qemu-img info shows both."
   ],
   [
    "It is safe to patch the golden image while overlays use it.",
    "Overlays store only differences from the backing file, so changing the base corrupts them. Build a new golden image and new overlays instead."
   ]
  ],
  "tryit": [
   [
    "You run virt-install on a new host and it fails, and /dev/kvm does not exist. lsmod | grep kvm shows nothing, and grep -E 'vmx|svm' /proc/cpuinfo returns no output, although the processor model is recent. What is the most likely cause and fix?",
    "Hardware virtualization (Intel VT-x or AMD-V) is disabled in the firmware, so the CPU flags are hidden and the KVM modules cannot load. Enable it in the firmware setup, reboot, confirm the vmx or svm flag appears, and the kvm and kvm_intel or kvm_amd modules will load and create /dev/kvm."
   ],
   [
    "You need ten short-lived test guests that all start from the same patched base system, and disk space on the host is tight. Should you copy a raw image ten times or use qcow2 overlays?",
    "Use qcow2 overlays with the base as a read-only backing file (qemu-img create -f qcow2 -b golden.qcow2 -F qcow2 testNN.qcow2). Each overlay stores only its own changes, so ten guests cost little more than one, while ten raw copies would each take the full size."
   ]
  ],
  "tip": "virsh destroy only forces a guest off, like pulling the power cord; it does not delete the VM. Removing the definition is virsh undefine.",
  "check": [
   [
    "How can you verify that a host CPU supports hardware virtualization?",
    "Look for the vmx (Intel) or svm (AMD) flag in /proc/cpuinfo, for example with grep -E 'vmx|svm' /proc/cpuinfo."
   ],
   [
    "Which disk format supports snapshots and thin provisioning: raw or qcow2?",
    "qcow2, whose copy-on-write design allocates space as data is written and supports snapshots and backing files."
   ],
   [
    "Which virsh command makes a guest start automatically when the host boots?",
    "virsh autostart <guest>, which marks the guest to be started by libvirt at host boot."
   ],
   [
    "What is the difference between virsh shutdown and virsh destroy?",
    "shutdown asks the guest OS to power off gracefully; destroy immediately cuts power to the guest without deleting it."
   ],
   [
    "Which libvirt network do guests use by default, and what does it do?",
    "The default NAT network on bridge virbr0, which gives guests outbound access through the host's address; a bridged network instead puts guests directly on the physical LAN."
   ]
  ]
 },
 {
  "t": "Local accounts and groups: useradd, usermod -aG, userdel, groupadd, passwd, chage",
  "hook": "At Harbor Credit Union, Marcus from the help desk forwards a ticket at 4:45 p.m.: the new developer, Priya, can log in but cannot run containers, and a second ticket says three longtime staff suddenly lost access to the shared finance folder. Looking at your shell history, you see that earlier today a teammate ran a usermod command to give Priya the docker group. The command looked harmless. Why would adding one person to one group lock other people out of a folder, and what single letter would have prevented it?",
  "simple": "A user account is a name the computer knows, with a password, a home folder and a list of groups. A group is like a club: being in the club gives you access to the club's files. `useradd` creates an account, `passwd` sets the password, `usermod` changes an account, and `userdel` removes it. `groupadd` makes a new group. `chage` controls when a password must be changed or when an account expires. The trickiest part: when you add someone to a club with `usermod`, you must use `-aG` (append to groups). Plain `-G` throws away their old club list and keeps only the new one. It is like updating a guest list by tearing it up instead of adding a name.",
  "body": [
   "Every process on Linux runs as some user, and access to files and commands follows from that user and its groups. Creating and maintaining local accounts is basic administration work and a steady source of Linux+ questions, especially around options that are easy to mix up. These commands all edit the account files for you, which is safer than editing them by hand. Behind the scenes, `useradd` adds lines to `/etc/passwd` and `/etc/shadow` and, on distributions that use private user groups, creates a matching group in `/etc/group`; the next lesson covers those files in detail. For now, focus on what each command and option changes, and on which options silently replace data instead of adding to it.",
   "`useradd` creates an account. Useful options: `-m` creates the home directory (copying files from `/etc/skel`), `-d` sets a custom home path, `-s /bin/bash` sets the login shell, `-c 'Full Name'` sets the comment field, historically called GECOS (General Electric Comprehensive Operating System), `-u` sets a specific UID (user ID), `-g` sets the primary group and `-G` sets supplementary groups. Whether the home directory is created by default depends on `/etc/login.defs` (`CREATE_HOME`), which differs between distributions, so passing `-m` is the safe habit. Debian-family systems also have `adduser`, a friendlier interactive wrapper. System accounts for services are created with `useradd -r`, which gives them a UID from the system range and, typically, no home directory; pair it with `-s /sbin/nologin` so nobody can log in as the service.",
   "`passwd alice` sets or changes a user's password; run by a normal user, `passwd` changes their own. `passwd -l` locks an account by prefixing the stored hash with `!`, `passwd -u` unlocks it, and `passwd -S` shows status. Locking the password does not block SSH (Secure Shell) key logins; to fully disable an account, also expire it (`usermod -e 1` or `chage -E 0`) or set its shell to `/sbin/nologin`. `usermod` changes an existing account. The most tested detail is group membership: `usermod -aG wheel alice` appends alice to the wheel group. Without `-a`, `-G` replaces the full list of supplementary groups, silently removing her from any group not listed. Other options: `-s` changes the shell, `-L`/`-U` lock and unlock, `-l` renames the login, `-d /new/home -m` moves the home directory, and `-e YYYY-MM-DD` sets an account expiry date.",
   "`userdel alice` removes the account but leaves her files; `userdel -r alice` also removes the home directory and mail spool. Before deleting, consider finding files she owns elsewhere with `find / -user alice`, since leftover files will show a bare UID and could be inherited by a future user who receives that UID. Groups are managed with `groupadd devs`, `groupmod -n` to rename, `groupdel` to delete, and `gpasswd -a user group` or `gpasswd -d user group` to add or remove members. Each user has one primary group (given to new files) and any number of supplementary groups (used for access). Group changes take effect at the user's next login; `id alice` or `groups alice` confirms membership, and `newgrp` can switch the primary group in the current shell. `chage` manages password aging. `chage -l alice` lists the policy, `-M 90` sets maximum days between changes, `-m 1` minimum days, `-W 7` warning days, `-I` inactive days after expiry before the account is disabled, `-E 2026-12-31` an account expiration date, and `-d 0` forces a password change at next login, which is common when handing a new user a temporary password.",
   "```\nuseradd -m -s /bin/bash -c 'Priya Shah' -G devs priya\npasswd priya\nchage -d 0 priya\nusermod -aG docker priya\nid priya\n```",
   "Consider a worked example. A new developer, Priya, starts today. You run the commands above: create the account with a home directory, bash shell, comment and the devs group; set a temporary password; and force her to change it at first login with `chage -d 0`. A month later she needs container access, so `usermod -aG docker priya` appends the group, `id priya` confirms it, and you remind her to log out and back in. When a contractor leaves, you lock the account with `usermod -L -e 1 contractor` right away and delete it with `userdel -r` after their files are archived.",
   "Common mistakes: using `usermod -G` without `-a` and wiping existing memberships; expecting a group change to apply in an already open session; assuming `passwd -l` stops SSH key logins; running `userdel -r` before archiving needed files; and forgetting `-m`, so the user logs in to no home directory.",
   "On the exam, 'add to a group without affecting existing memberships' means `-aG`; 'force a password change at next login' means `chage -d 0`; 'remove the user and home directory' means `userdel -r`; 'set account to expire on a date' means `chage -E` or `usermod -e`; and 'user still cannot use the new group' means they must log in again."
  ],
  "analogy": "Group membership is like a key ring. usermod -aG docker priya slides one more key onto Priya's ring. usermod -G docker priya takes away the whole ring and hands back a ring holding only the docker key. Also, keys only work once you walk back through the front door: a user must log in again before new groups apply. The analogy stops at the primary group, which is less a key and more the name stamped on every file the user creates.",
  "terms": [
   [
    "UID / GID",
    "Numeric user and group identifiers the kernel actually uses for ownership and permission checks."
   ],
   [
    "Primary group",
    "The group assigned to a user in /etc/passwd and given to files the user creates."
   ],
   [
    "Supplementary group",
    "Additional groups a user belongs to, listed in /etc/group, that grant extra access."
   ],
   [
    "usermod -aG",
    "Appends a user to supplementary groups without removing existing memberships."
   ],
   [
    "chage",
    "Command that views and sets password aging and account expiry for a user."
   ],
   [
    "System account",
    "A low-privilege account created with useradd -r for running a service, usually with no login shell."
   ]
  ],
  "example": "A new developer, Priya, starts today. You run useradd -m -s /bin/bash -c 'Priya Shah' -G devs priya, set a temporary password with passwd priya, and force her to change it at first login with chage -d 0 priya. A month later she needs container access, so you run usermod -aG docker priya and remind her to log out and back in.",
  "mistakes": [
   [
    "usermod -G groupname user adds the user to that group.",
    "Without -a, -G replaces the entire supplementary group list, removing the user from every group not named. Use usermod -aG to append."
   ],
   [
    "passwd -l fully disables an account.",
    "It locks only password authentication. SSH key logins still work. Also expire the account (chage -E 0 or usermod -e 1) or set the shell to /sbin/nologin."
   ],
   [
    "A new group applies immediately in the user's open shell.",
    "Group membership is read at login. The user must log out and back in (or start a new login session, or use newgrp) before id shows it in that session."
   ],
   [
    "userdel removes everything belonging to the user.",
    "Plain userdel leaves the home directory and files. userdel -r removes the home directory and mail spool, but files elsewhere remain, so search with find / -user first."
   ]
  ],
  "tryit": [
   [
    "A contractor's engagement ends today at noon, but their project files must be archived by the team lead next week before anything is deleted. The contractor uses SSH keys, not a password. What do you run now, and what do you run next week?",
    "Now, lock and expire the account so no login method works: usermod -L -e 1 contractor (or chage -E 0), optionally setting the shell to /sbin/nologin. Locking alone would not stop key logins. Next week, after the archive is done, run userdel -r contractor and check for leftover files with find / -user contractor."
   ],
   [
    "You must create an account for a backup service that should never be used for interactive login and needs no home directory. Which useradd options fit?",
    "useradd -r -s /sbin/nologin backupsvc. The -r flag gives a UID from the system range and typically no home directory, and the nologin shell blocks interactive logins."
   ]
  ],
  "tip": "The classic trap is usermod -G without -a: it replaces all supplementary groups. When a question says 'add to a group without affecting existing memberships', the answer includes -aG.",
  "check": [
   [
    "What does chage -d 0 bob do?",
    "It sets bob's last password change date to 0, forcing him to change his password at the next login."
   ],
   [
    "Which command removes user carol and her home directory?",
    "userdel -r carol, since plain userdel leaves the home directory and mail spool behind."
   ],
   [
    "After usermod -aG sudo dave, dave still cannot use sudo in his current session. Why?",
    "Group membership is read at login, so he must log out and back in (or start a new login session) for the new group to apply."
   ],
   [
    "Why does passwd -l alone not fully disable an account?",
    "It only locks password authentication; SSH key logins still work unless the account is also expired or given a nologin shell."
   ],
   [
    "Which chage option sets the maximum number of days between password changes?",
    "chage -M, for example chage -M 90 alice; chage -l alice lists the current aging policy."
   ]
  ]
 },
 {
  "t": "Account files: /etc/passwd, /etc/shadow, /etc/group, /etc/skel, /etc/login.defs",
  "hook": "An auditor from the state examiners' office sits across from you at Riverbend Medical Group and slides over a printout. One line is circled: `backup:x:0:0:Backup Operator:/var/backup:/bin/bash`. 'Your policy says only one account has administrator rights,' she says. 'Can you explain this one?' Your team lead insists it is just the backup account and is harmless because it is not named root. You have five minutes before she moves on to the next finding. What does that third field mean, and is your team lead right?",
  "simple": "Linux keeps its list of users and groups in a few plain text files. Each line is one record, and colons separate the pieces of information. `/etc/passwd` lists every user: name, ID number, main group, home folder and the program they get at login. Anyone can read it, so the secret password scrambles live in `/etc/shadow`, which only the administrator can read. `/etc/group` lists groups and who belongs to them. `/etc/skel` is a folder of starter files copied into each new user's home folder. `/etc/login.defs` holds default settings used when new accounts are made. Think of a school: a public class roster, a locked file of locker codes, club lists, a welcome packet and the school rulebook.",
  "body": [
   "The account commands you learned all read and write a handful of plain-text files. Knowing their formats lets you audit accounts quickly, spot misconfigurations and answer exam questions that show you a raw line and ask what it means. Each file is colon-separated, one record per line, which makes them easy to query with `cut`, `awk` and `grep`. `/etc/passwd` holds one line per account with seven fields: username, password placeholder, UID (user ID), GID (group ID, the primary group), GECOS (General Electric Comprehensive Operating System, a historical name for the comment) field, home directory and login shell. For example, `alice:x:1001:1001:Alice Ng:/home/alice:/bin/bash`. The `x` means the real password hash is stored in `/etc/shadow`. The file must be world-readable, because many programs map UIDs to names, which is exactly why hashes were moved out of it. UID 0 is root; system accounts use low UIDs, and regular users start at a threshold set in `/etc/login.defs` (commonly 1000). A shell of `/sbin/nologin` or `/usr/sbin/nologin` prevents interactive logins for service accounts.",
   "`/etc/shadow` stores password hashes and aging data, readable only by root. Its nine fields are: username, hashed password, date of last change (in days since January 1, 1970), minimum days, maximum days, warning days, inactive days, account expiration date and a reserved field. The hash field begins with an identifier of the algorithm, such as `$6$` for SHA-512 (Secure Hash Algorithm, 512-bit) crypt or `$y$` for yescrypt, followed by the salt and hash. A leading `!` or `*` means the password is locked or no password login is possible, and an empty field means no password at all, which is a serious security finding. The aging fields are what `chage` edits.",
   "`/etc/group` has four fields: group name, password placeholder, GID and a comma-separated list of supplementary members, for example `devs:x:1050:alice,priya`. A user's primary group is not usually listed here; it comes from the GID field in `/etc/passwd`. `/etc/gshadow` holds group passwords and administrators and is rarely used directly. Edit these files through commands whenever possible. If you must edit by hand, use `vipw` for passwd and `vigr` for group (with `-s` for the shadow versions), which lock the files and check syntax; `pwck` and `grpck` verify consistency. `getent passwd alice` queries accounts through the name service switch (configured in `/etc/nsswitch.conf`), so it also shows users from LDAP (Lightweight Directory Access Protocol) or SSSD (System Security Services Daemon) that are not in the local files.",
   "`/etc/skel` is the skeleton directory: its contents, typically `.bashrc`, `.bash_profile` and similar dot files, are copied into each new home directory created with `useradd -m`. Put default settings for new users there, knowing that existing users will not receive later changes. `/etc/login.defs` sets site-wide defaults for account tools: UID and GID ranges (`UID_MIN`, `UID_MAX`), default password aging (`PASS_MAX_DAYS`, `PASS_MIN_DAYS`, `PASS_WARN_AGE`), whether to create home directories, the default umask for new homes and the hashing method (`ENCRYPT_METHOD`). These defaults apply when accounts are created, so changing `PASS_MAX_DAYS` does not alter existing users; use `chage` for those. `useradd -D` shows other creation defaults stored in `/etc/default/useradd`. A quick way to see what a new account would receive is `ls -la /etc/skel`, and a quick way to see the current aging defaults is `grep ^PASS /etc/login.defs`.",
   "```\nawk -F: '$3 == 0 {print $1}' /etc/passwd        # accounts with UID 0\nawk -F: '$2 == \"\" {print $1}' /etc/shadow        # empty passwords (run as root)\nawk -F: '$3 >= 1000 {print $1, $7}' /etc/passwd  # regular users and shells\n```",
   "Consider a worked example. During an audit you run the first command above and find a second account, 'backup', with UID 0, which gives it full root privileges regardless of its name. The second command, run as root, reveals a test account with an empty password field. You lock the test account, change the backup account to its own unprivileged UID after checking what depends on it, and confirm with `pwck` that the files are consistent.",
   "Common mistakes: assuming only the account named root has root power (UID 0 is what counts); expecting changes to `/etc/login.defs` or `/etc/skel` to reach existing users; looking for supplementary members in `/etc/passwd`, or for a primary group in `/etc/group`; editing the files with a plain editor while a user tool is also writing them; and misreading `x` as a locked password when it only means 'see shadow'.",
   "Exam questions often show a raw line and ask about one field, or ask which file holds a setting. Count the colons carefully: field 3 of passwd is UID, field 4 is primary GID, field 7 is the shell. 'Hash', 'last change', 'expiry' point to `/etc/shadow`. 'Supplementary members' point to `/etc/group`. 'Default files for new users' is `/etc/skel`. 'Default UID range or password aging for new accounts' is `/etc/login.defs`. 'Safely edit passwd by hand' is `vipw`."
  ],
  "analogy": "Think of /etc/passwd as a building's public directory in the lobby: anyone can see names and suite numbers. /etc/shadow is the security office's locked cabinet of key codes and expiry dates. /etc/group is the list of who belongs to each department, /etc/skel is the welcome kit placed in every new office, and /etc/login.defs is the policy binder used when new offices are set up. The analogy breaks on power: in Linux, rights come from the number (UID 0), not the name on the door.",
  "mnemonic": "The seven /etc/passwd fields in order: Uncle Xavier Usually Gets Good Home Shells, for Username, x (placeholder), UID, GID, GECOS, Home directory, Shell.",
  "terms": [
   [
    "/etc/passwd",
    "World-readable account database with seven fields: name, x, UID, GID, GECOS, home and shell."
   ],
   [
    "/etc/shadow",
    "Root-only file holding password hashes and password aging and expiry fields."
   ],
   [
    "/etc/group",
    "Group database listing group name, GID and supplementary members."
   ],
   [
    "/etc/skel",
    "Template directory whose files are copied into new users' home directories."
   ],
   [
    "/etc/login.defs",
    "Configuration of defaults for account tools, such as UID ranges and password aging."
   ],
   [
    "vipw / vigr",
    "Tools that lock and safely edit the passwd and group files (and their shadow versions with -s)."
   ]
  ],
  "example": "During an audit you run awk -F: '$3 == 0 {print $1}' /etc/passwd and find a second account, 'backup', with UID 0, which gives it full root privileges. You also run awk -F: '$2 == \"\" {print $1}' /etc/shadow as root to catch accounts with empty passwords. Both findings go into the remediation report.",
  "mistakes": [
   [
    "Only the account named root has full privileges.",
    "The kernel checks the number, not the name. Any account with UID 0 has root power, so a second UID 0 account is a serious finding."
   ],
   [
    "An x in the password field of /etc/passwd means the account is locked.",
    "x only means the real hash is stored in /etc/shadow. A locked password shows `!` or `*` at the start of the shadow hash field."
   ],
   [
    "Changing /etc/login.defs or /etc/skel updates existing users.",
    "Both only apply when accounts are created. Use chage for existing users' aging and copy files manually if existing homes need them."
   ],
   [
    "A user's primary group is listed as a member in /etc/group.",
    "The primary group comes from the GID field in /etc/passwd. The member list in /etc/group usually shows only supplementary members."
   ]
  ],
  "tryit": [
   [
    "You must correct a typo in a user's home directory path, and the useradd tools are temporarily unavailable on a recovery system. Another admin suggests opening /etc/passwd in nano. What should you do instead, and how do you verify the result?",
    "Use vipw, which locks /etc/passwd while you edit and checks syntax so a concurrent tool cannot corrupt it (vipw -s for shadow). Afterward run pwck to check consistency between passwd and shadow."
   ],
   [
    "A shadow line reads: carol::19700:0:99999:7::. What security problem does it show, and what do you do?",
    "The second field, the hash, is empty, so carol has no password at all. Lock the account or set a password immediately (passwd -l carol or passwd carol), then investigate how it happened."
   ]
  ],
  "tip": "Remember which file holds what: hashes and aging live in /etc/shadow, supplementary group members live in /etc/group, and defaults for new accounts come from /etc/login.defs and /etc/skel.",
  "check": [
   [
    "In the line bob:x:1002:100::/home/bob:/sbin/nologin, what does the last field mean?",
    "bob's login shell is nologin, so he cannot log in interactively; this is typical of service accounts."
   ],
   [
    "You changed PASS_MAX_DAYS in /etc/login.defs. Why do existing users still have the old maximum?",
    "login.defs only supplies defaults when accounts are created; existing users must be updated with chage -M."
   ],
   [
    "Why are password hashes in /etc/shadow instead of /etc/passwd?",
    "/etc/passwd must be world-readable, so hashes were moved to root-only /etc/shadow to prevent offline cracking by ordinary users."
   ],
   [
    "What does a hash field beginning with ! in /etc/shadow indicate?",
    "The password is locked, so password logins are refused until the account is unlocked."
   ],
   [
    "In the passwd line dev:x:1005:1050::/home/dev:/bin/bash, what is the primary GID?",
    "1050, the fourth field; the third field, 1005, is the UID."
   ]
  ]
 },
 {
  "t": "Systemd units: systemctl start/stop/enable/mask, status output, drop-in overrides with systemctl edit",
  "hook": "It is 2:10 a.m. and your phone buzzes: the order API at Northgate Outfitters is down again. You log in, run `systemctl start api`, and the service comes back. Last month the same thing happened after a kernel patch reboot, and the month before a teammate fixed a crash by editing the unit file under /usr/lib, only for a package update to quietly undo the fix. You are tired of being the restart button. How do you make the service survive reboots, restart itself after crashes and keep your changes through the next update?",
  "simple": "systemd is the program that starts and looks after background services on most modern Linux systems. Each thing it manages is called a unit, such as a web server service. You control units with `systemctl`. `start` and `stop` act right now. `enable` and `disable` decide whether the service starts automatically when the computer boots. These are separate, so a service can be running now but not set to start at boot. `mask` is the strongest block: the service cannot be started at all until you unmask it. `systemctl status` tells you whether it is running and shows recent log lines. To change settings safely, `systemctl edit` saves your changes in a small separate file so updates do not erase them, like a sticky note on a recipe instead of rewriting the cookbook.",
  "body": [
   "systemd manages almost everything that runs on a modern Linux system through units. A unit is a configuration object of a certain type, named by suffix: `.service` for daemons, `.socket` for socket activation, `.timer` for scheduled jobs, `.mount` for mounts, `.target` for groups of units, and more. `systemctl` is the tool you use to control them, and learning to separate 'now' from 'at boot' is the key to most exam questions.",
   "The basic lifecycle commands act on the running system: `systemctl start httpd`, `stop`, `restart` (stop then start), and `reload` (ask the service to reread its config without stopping, if it supports that). Boot-time behavior is separate: `systemctl enable httpd` creates symlinks, based on the `WantedBy=` line in the unit's `[Install]` section, so the unit starts at boot, and `disable` removes them. The two are independent, which is why `systemctl enable --now httpd` exists to do both at once. `systemctl is-active` and `is-enabled` answer each question in scripts. `mask` goes further than disable: `systemctl mask httpd` links the unit file to `/dev/null`, so it cannot be started at all, manually or as a dependency of another unit, until you `unmask` it. Use it when a service must never run, for example to stop a conflicting service being pulled in. To see boot-time settings for every installed unit at once, `systemctl list-unit-files --type=service` shows each one with a state such as enabled, disabled, static (no `[Install]` section, so it only runs when something else pulls it in) or masked.",
   "`systemctl status httpd` is your first diagnostic. It shows the Loaded line (unit file path, and whether it is enabled, disabled or masked), the Active line (active (running), inactive (dead) or failed, with a timestamp), the main PID (process ID), the cgroup (control group) of processes, and the last few journal lines. A failed unit also shows the exit code or signal, such as `status=203/EXEC` meaning the executable could not be run. `systemctl --failed` lists all failed units, `systemctl list-units --type=service` lists active services, and `journalctl -u httpd` shows the full log for the unit. Unit files live in three places, in order of precedence: `/etc/systemd/system/` (administrator), `/run/systemd/system/` (runtime), and `/usr/lib/systemd/system/` or `/lib/systemd/system/` (installed by packages). Never edit package-supplied files directly, because updates overwrite them. Instead create a drop-in override with `systemctl edit httpd`, which opens an editor and saves your changes to `/etc/systemd/system/httpd.service.d/override.conf`. Only the settings you list are overridden.",
   "```ini\n[Service]\nRestart=on-failure\nRestartSec=5\nLimitNOFILE=65536\n```",
   "`systemctl edit --full httpd` copies the whole unit to `/etc` for complete replacement, and `systemctl cat httpd` shows the unit plus all drop-ins. One subtlety: list-type settings like `ExecStart=` must first be cleared with an empty `ExecStart=` line before a new value is set in a drop-in, or systemd complains about multiple values. After editing unit files by hand, run `systemctl daemon-reload` so systemd rereads them; `systemctl edit` does this for you. A typical service section contains `ExecStart=`, `User=` and `Restart=`, and the `[Install]` section with `WantedBy=multi-user.target` is what `enable` uses.",
   "Consider a worked example. An internal API service crashes occasionally and stays down. `systemctl status api` shows 'failed' with `status=1/FAILURE`, and `journalctl -u api` shows the crash. Instead of editing the vendor's unit in `/usr/lib/systemd/system`, you run `systemctl edit api.service`, add the `Restart=on-failure` and `RestartSec=5` lines shown above, save, and run `systemctl restart api`. `systemctl cat api.service` now shows the override, and the next crash triggers an automatic restart. Because the override lives in `/etc`, the next package update of the API leaves your fix in place.",
   "Common mistakes: running `start` and assuming the service will return after reboot (you also need `enable`); using `disable` when a dependency keeps pulling the unit in (use `mask`); editing files under `/usr/lib/systemd/system`, which updates overwrite; forgetting `daemon-reload` after manual edits; and overriding `ExecStart=` without clearing it first. A quieter trap is `reload` versus `restart`: reload keeps the process running and only rereads configuration, so it will not pick up a new binary after an upgrade, and not every service supports it. When unsure, `systemctl reload-or-restart` tries a reload first and falls back to a restart.",
   "Exam questions are usually phrased as outcomes. 'Running now but not after reboot' means `enable`. 'Start now and at boot' means `enable --now`. 'Must never start, even as a dependency' means `mask`. 'Change a setting without touching the vendor file' means `systemctl edit` and a drop-in in `/etc/systemd/system/<unit>.d/`. 'Edited a unit file but nothing changed' means `daemon-reload`. 'status=203/EXEC' points to a wrong path or missing execute permission on the program."
  ],
  "analogy": "A service is like a store's opening routine. start is unlocking the doors today; enable is putting the store on the regular schedule so a manager opens it every morning. disable takes it off the schedule, but anyone with a key can still open it. mask is welding the doors shut until someone removes the weld with unmask. A drop-in override is a sticky note on the head office's procedures binder: the binder can be reprinted by head office, but your note stays on top. The analogy stops at daemon-reload: systemd must be told to reread the binder after manual edits.",
  "terms": [
   [
    "Unit",
    "A systemd configuration object such as a .service, .socket, .timer, .mount or .target."
   ],
   [
    "enable vs start",
    "enable configures a unit to start at boot; start runs it now. Neither implies the other."
   ],
   [
    "mask",
    "Links a unit to /dev/null so it cannot be started manually or as a dependency."
   ],
   [
    "Drop-in override",
    "A .conf file in /etc/systemd/system/<unit>.d/ that overrides selected settings of a unit."
   ],
   [
    "daemon-reload",
    "Tells systemd to reread unit files after they change on disk."
   ],
   [
    "WantedBy=",
    "An [Install] setting naming the target that should pull the unit in when it is enabled."
   ]
  ],
  "example": "An internal API service crashes occasionally and stays down. Instead of editing the vendor's unit in /usr/lib/systemd/system, you run systemctl edit api.service, add Restart=on-failure and RestartSec=5 under [Service], save, and restart the service. systemctl cat api.service now shows the override, and the next crash triggers an automatic restart.",
  "mistakes": [
   [
    "systemctl start makes a service come back after reboot.",
    "start affects only the running system. enable creates the boot-time links; enable --now does both."
   ],
   [
    "disable prevents a service from ever running.",
    "disable removes boot links, but the unit can still start manually or as a dependency. mask links it to /dev/null so it cannot start at all."
   ],
   [
    "The right fix is to edit the unit file in /usr/lib/systemd/system.",
    "Package updates overwrite that directory. Use systemctl edit to create a drop-in in /etc/systemd/system/<unit>.d/, which takes precedence and survives updates."
   ],
   [
    "Changes to a unit file take effect as soon as you save.",
    "After manual edits run systemctl daemon-reload, then restart the unit. systemctl edit performs the reload for you."
   ]
  ],
  "tryit": [
   [
    "A new monitoring service fails right after start. systemctl status shows 'Active: failed' and 'status=203/EXEC'. The unit's ExecStart= points to /opt/mon/bin/agentd. What do you check first?",
    "203/EXEC means systemd could not execute the program, so check that /opt/mon/bin/agentd exists at that exact path and has execute permission (ls -l). Fix the path in a drop-in or the file's permissions, run daemon-reload if you edited by hand, and start the unit again."
   ],
   [
    "A legacy firewall service keeps getting started at boot because another unit lists it as a dependency, even though you disabled it. You need it never to run. What do you do?",
    "systemctl mask legacy-fw.service (and stop it). Masking links the unit to /dev/null so neither a user nor a dependency can start it; disable only removes its own boot links."
   ]
  ],
  "tip": "Know the difference in strength: stop affects now, disable affects boot, and mask blocks the unit entirely until unmasked.",
  "check": [
   [
    "A service runs now but is not running after reboot. Which command fixes that?",
    "systemctl enable <service> (or enable --now to also start it), because start alone does not affect boot."
   ],
   [
    "Where does systemctl edit nginx save its changes?",
    "In /etc/systemd/system/nginx.service.d/override.conf, a drop-in that overrides only the settings you list."
   ],
   [
    "What must you run after manually editing a unit file in /etc/systemd/system?",
    "systemctl daemon-reload, then restart the unit if needed, so systemd rereads the changed file."
   ],
   [
    "Which is stronger, disable or mask, and why?",
    "mask, because it links the unit to /dev/null so it cannot start at all, even manually or as a dependency; disable only removes boot-time links."
   ],
   [
    "In a drop-in, how do you replace a unit's ExecStart= command?",
    "Add an empty ExecStart= line first to clear the original value, then a new ExecStart= line with the replacement command."
   ]
  ]
 },
 {
  "t": "Scheduling: cron and crontab syntax, at, systemd timers (OnCalendar)",
  "hook": "At Pine Hollow Library, the nightly backup of the catalog database was supposed to run at 2:30 a.m. on weeknights. On Friday morning, Ravi the branch manager asks you to restore a record deleted Wednesday, and you discover the most recent backup is from last month. The script works perfectly when you run it by hand. The crontab line looks right at a glance. Was the schedule wrong, did the job run and fail silently, or was the server off when it was due? How would you even tell, and which scheduler would have made the answer obvious?",
  "simple": "Scheduling means telling the computer to run a task later without you being there. cron runs tasks again and again on a schedule, like every night at 2:30. You write a cron schedule as five numbers or stars: minute, hour, day of the month, month and day of the week, then the command. A star means 'every'. at runs a task just once at a set time, like an alarm you set for tonight only. systemd timers are a newer way to run repeating tasks. They keep a record of what happened in the system log and can run a missed job as soon as the computer is turned back on. Think of cron as a weekly class timetable, at as a one-time reminder, and timers as a timetable with an attendance log.",
  "body": [
   "Administrators automate recurring and one-off jobs so that backups, cleanups and reports happen without anyone logged in. Linux offers three mechanisms: cron for recurring jobs, at for single future jobs, and systemd timers as the modern alternative to cron. The exam checks that you can read and write their time expressions and that you know where each kind of job is defined. A crontab line has five time fields followed by the command: minute (0-59), hour (0-23), day of month (1-31), month (1-12) and day of week (0-7, where 0 and 7 are both Sunday). An asterisk means every value, a comma separates a list (`1,15`), a hyphen gives a range (`1-5`), and a slash gives a step (`*/10` means every tenth value). So `30 2 * * 1-5 /usr/local/bin/backup.sh` runs at 02:30 Monday through Friday, and `*/15 * * * *` runs every 15 minutes. Shortcuts such as `@reboot`, `@daily` and `@hourly` also exist.",
   "Users manage their own table with `crontab -e` (edit), `crontab -l` (list) and `crontab -r` (remove all, so be careful); root can use `crontab -u alice -e`. System-wide jobs go in `/etc/crontab` or files in `/etc/cron.d/`, which have an extra sixth field naming the user to run as. Scripts dropped into `/etc/cron.hourly`, `cron.daily`, `cron.weekly` and `cron.monthly` run on those schedules. Access can be restricted with `/etc/cron.allow` and `/etc/cron.deny`: if the allow file exists, only users listed in it may use crontab. Cron runs jobs with a minimal environment and a short `PATH`, so use full paths to commands and redirect output to a log, or the job may fail silently.",
   "`at` runs a command once at a set time. `at 22:00` or `at now + 30 minutes` opens a prompt where you type commands and finish with Ctrl+D. `atq` lists pending jobs, `atrm` removes one by number, and the `atd` service must be running. `batch` is similar but waits until system load is low. Access is controlled with `/etc/at.allow` and `/etc/at.deny`.",
   "systemd timers pair a `.timer` unit with a `.service` unit of the same name. The timer decides when; the service defines what runs. `OnCalendar=` sets wall-clock schedules using the form `DayOfWeek Year-Month-Day Hour:Minute:Second`, for example `OnCalendar=Mon..Fri *-*-* 02:30:00`, or shortcuts like `daily` and `weekly`. Monotonic timers use relative times such as `OnBootSec=10min` or `OnUnitActiveSec=1h`. `Persistent=true` runs a missed job at the next boot if the machine was off when it was due. Test an expression with `systemd-analyze calendar 'Mon..Fri 02:30'`. Enable the timer, not the service, with `systemctl enable --now backup.timer`, and list timers with `systemctl list-timers`. Advantages over cron include logging in the journal, dependency handling and resource controls. If a machine is not always on, anacron is the traditional cron companion that runs the daily, weekly and monthly jobs it missed while powered off, which is the cron-world equivalent of a timer's `Persistent=true`.",
   "```ini\n# /etc/systemd/system/backup.timer\n[Timer]\nOnCalendar=*-*-* 02:30:00\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n```",
   "Consider a worked example. Your log cleanup needs to run at 03:15 on the first day of every month. In a user crontab that is `15 3 1 * * /usr/local/bin/cleanup.sh >> /var/log/cleanup.log 2>&1`; in `/etc/cron.d/cleanup` the same line needs `root` between the time fields and the command. As a systemd timer you create `cleanup.service` with `ExecStart=/usr/local/bin/cleanup.sh` and `cleanup.timer` with `OnCalendar=*-*-01 03:15:00` and `Persistent=true`, so if the server is down on the first the job runs as soon as it boots. `systemctl list-timers` shows the next run, and `journalctl -u cleanup` shows the output.",
   "Common mistakes: forgetting the user field in `/etc/cron.d` files, or adding one in a user crontab; relying on `PATH` inside cron; enabling the `.service` instead of the `.timer`; misreading `*/5` in the hour field as 'every five minutes'; running `crontab -r` when you meant `-e` (they sit next to each other on the keyboard); and expecting an `at` job to run when `atd` is stopped. Finally, remember that when both day-of-month and day-of-week are restricted, cron runs the job when either one matches, not only when both do.",
   "Exam questions usually show a schedule and ask when it runs, or give a need and ask for the tool. Read the fields left to right: minute, hour, day of month, month, day of week. 'Recurring' points to cron or a timer; 'once, at a set time' points to `at`; 'when load is low' points to `batch`. 'Catch up after downtime' points to `Persistent=true` (or anacron). 'Which timers will fire next' is `systemctl list-timers`, and 'restrict who may schedule jobs' is `cron.allow` or `cron.deny`."
  ],
  "analogy": "Cron is like a wall calendar with recurring entries: every weekday at 02:30, do the backup. at is a sticky note for one specific moment. A systemd timer is a calendar entry linked to a written procedure (the .service) and a logbook (the journal), with a rule that if you were away when it was due, you do it as soon as you return (Persistent=true). The analogy breaks on cron's day rule: if both day of month and day of week are set, cron fires when either matches, unlike most calendar apps.",
  "mnemonic": "Crontab field order: My Horse Drinks Muddy Water, for Minute, Hour, Day of month, Month, Weekday (day of week), then the command.",
  "terms": [
   [
    "crontab",
    "A per-user table of scheduled jobs, edited with crontab -e, using five time fields plus a command."
   ],
   [
    "at",
    "Schedules a command to run once at a future time; managed with atq and atrm and run by atd."
   ],
   [
    "systemd timer",
    "A .timer unit that activates a matching .service unit on a schedule."
   ],
   [
    "OnCalendar",
    "A timer setting that defines wall-clock schedules, such as Mon..Fri *-*-* 02:30:00."
   ],
   [
    "Persistent=true",
    "A timer option that runs a missed job at the next opportunity after downtime."
   ],
   [
    "cron.allow / cron.deny",
    "Files that control which users may create crontabs; if cron.allow exists, only listed users may."
   ]
  ],
  "example": "Your log cleanup needs to run at 03:15 on the first day of every month. In cron that is 15 3 1 * * /usr/local/bin/cleanup.sh. The same job as a systemd timer uses OnCalendar=*-*-01 03:15:00 with Persistent=true, so if the server is down on the first, the job runs as soon as it boots.",
  "mistakes": [
   [
    "*/5 in the hour field means every five minutes.",
    "The field position decides the unit. */5 in the hour field means every fifth hour; every five minutes is */5 in the first (minute) field."
   ],
   [
    "/etc/cron.d files use the same five-field format as a user crontab.",
    "System crontabs (/etc/crontab and /etc/cron.d) add a sixth field naming the user to run as, between the time fields and the command."
   ],
   [
    "To activate a systemd timer, you enable the .service.",
    "Enable the .timer (systemctl enable --now backup.timer). The timer then activates the matching .service on schedule."
   ],
   [
    "If a cron job works by hand, it will work from cron.",
    "Cron uses a minimal environment and short PATH, so use full command paths and redirect output to a log to capture errors."
   ]
  ],
  "tryit": [
   [
    "A laptop-based kiosk must clear its cache every day at 01:00, but it is often powered off overnight and turned on around 08:00. Staff complain the cleanup almost never happens. Which scheduling approach fixes this, and how?",
    "Use a systemd timer with OnCalendar=*-*-* 01:00:00 and Persistent=true, enabled with systemctl enable --now cleanup.timer. When the machine boots after missing the 01:00 run, the timer triggers the job right away. (anacron is the cron-world alternative.)"
   ],
   [
    "You need to reboot a server once at 23:00 tonight for a patch, with no recurring schedule. Which tool do you use and what must be running?",
    "Use at, for example echo 'systemctl reboot' | at 23:00, and confirm the atd service is running. atq lists the job and atrm removes it if plans change."
   ]
  ],
  "tip": "Count the fields: a user crontab has five time fields before the command, but /etc/crontab and /etc/cron.d files add a username as the sixth field.",
  "check": [
   [
    "What schedule does 0 */4 * * * describe?",
    "At minute 0 of every fourth hour: 00:00, 04:00, 08:00, 12:00, 16:00 and 20:00 every day."
   ],
   [
    "Which command shows all active systemd timers and when they will next run?",
    "systemctl list-timers, which lists each timer with its last and next trigger times."
   ],
   [
    "How do you schedule a one-time reboot at 23:00 tonight?",
    "echo 'systemctl reboot' | at 23:00 (or use at 23:00 and type the command), with atd running."
   ],
   [
    "A cron job works when you run it by hand but fails from cron. What is a likely cause?",
    "Cron's minimal environment and short PATH; use full paths to commands and redirect output to a log to see the error."
   ],
   [
    "Which command tests what times an OnCalendar expression will match?",
    "systemd-analyze calendar, for example systemd-analyze calendar 'Mon..Fri 02:30', which shows the normalized form and next elapse time."
   ]
  ]
 },
 {
  "t": "Processes and jobs: ps, top, kill signals, nice/renice, bg/fg/jobs, nohup",
  "hook": "It is the last day of the quarter at Cedar Ridge Analytics, and the shared reporting server has slowed to a crawl. Jonah in finance messages you: his dashboards time out, and someone's report job has been running since 6 a.m. You SSH in and see the load average climbing. You could kill the job, but it belongs to Aisha, whose quarterly report is due tonight, and she started it from her laptop over a hotel Wi-Fi connection that keeps dropping. How do you keep the server responsive without destroying her work, and how should she have started the job in the first place?",
  "simple": "A process is a program that is currently running. Each one has an ID number called a PID. `ps` takes a snapshot list of processes, and `top` shows a live, updating list sorted by who is using the most processor time. To stop a process you send it a signal with `kill`. The normal signal politely asks it to finish and clean up. `kill -9` forces it to stop right away with no cleanup. A nice value decides how polite a process is about sharing the processor: a higher number means it lets others go first. Job control lets you pause a program with Ctrl+Z and continue it in the background with `bg`. `nohup` keeps a program running after you log out, like leaving a slow cooker on when you leave the house.",
  "body": [
   "A process is a running instance of a program, identified by a PID (process ID) and owned by a user. Every process except PID 1 has a parent, recorded as its PPID (parent process ID). Monitoring and controlling processes is how you deal with runaway programs, prioritize work and keep long tasks running. Linux+ questions often give you `ps` or `top` output and ask what to do next. Most questions come down to two resources, the CPU (central processing unit) and memory, and to how politely or forcefully you ask a process to stop. Keep in mind that the shell features here, such as `&`, `bg` and `fg`, apply to jobs you started from the current terminal, while `ps`, `kill` and `renice` work on any process you have permission to touch.",
   "`ps` takes a snapshot. `ps aux` (BSD style) shows every process with user, PID, %CPU, %MEM, VSZ (virtual memory size) and RSS (resident set size, the physical memory in use), TTY, state, start time and command; `ps -ef` (System V style) shows UID, PID, PPID and command. `ps -ef --forest` or `pstree` shows parent-child relationships. The STAT column shows state: R running, S sleeping, D uninterruptible sleep (usually waiting on I/O, input/output), T stopped and Z zombie, a finished process whose parent has not collected its exit status. `pgrep nginx` finds PIDs by name, and `pgrep -f` matches the full command line. `top` gives a live view sorted by CPU. Its header shows uptime, load average, task counts, CPU breakdown (including `wa` for I/O wait) and memory. Inside top, press `M` to sort by memory, `P` for CPU, `k` to kill a PID, `r` to renice and `q` to quit. `htop` is a friendlier alternative when installed.",
   "Signals are messages sent to processes. `kill PID` sends SIGTERM (15), a polite request to exit that lets the program clean up. `kill -9 PID` sends SIGKILL (9), which the process cannot catch or ignore; use it only when SIGTERM fails, because data may be lost. `kill -HUP PID` sends SIGHUP (1), which many daemons interpret as 'reload your configuration'. SIGINT (2) is what Ctrl+C sends, SIGTSTP is what Ctrl+Z sends to pause a job, SIGSTOP pauses unconditionally, and SIGCONT resumes. `killall name` and `pkill pattern` signal by name, and `kill -l` lists all signals.",
   "Scheduling priority is set by the nice value, from -20 (highest priority) to 19 (lowest), default 0. `nice -n 10 command` starts a program with lower priority; `renice -n 5 -p PID` changes a running one. Ordinary users can only make their processes nicer (raise the number); only root can lower it to raise priority. The PR and NI columns in top show the effect. Nice affects CPU scheduling only, so it will not help a process that is slow because it waits on disk.",
   "Job control manages processes started from your shell. Append `&` to run a command in the background. Ctrl+Z suspends the foreground job, `bg` resumes it in the background, `fg` brings it back to the foreground, and `jobs` lists jobs with numbers you can reference as `%1`. Background jobs still belong to your terminal, so logging out sends them SIGHUP and they usually die. `nohup command &` makes the process ignore SIGHUP and writes output to `nohup.out`, so it survives logout. `disown` removes a job from the shell's table, and tools like `tmux` or `screen`, or running the task as a systemd unit, are more robust alternatives for long jobs.",
   "Consider a worked example. A report script started over SSH is hogging CPU and will take hours. `top` shows it at the top of the list with NI 0, so you find its PID with `pgrep -f report.py` and lower its priority with `renice -n 15 -p 4821`, and interactive users stop noticing it. Next time you start it as `nohup nice -n 15 ./report.py &` so it runs politely and survives your logout. Later, a stuck backup process ignores `kill 5120`; after checking it is not in state D, you send `kill -9 5120` and it ends. A zombie listed under an application server cannot be killed at all, so you restart the parent, which reaps it.",
   "Common mistakes: reaching for `kill -9` first instead of SIGTERM, which skips cleanup and can corrupt files; trying to kill a zombie instead of dealing with its parent; expecting a user to be able to set a negative nice value; confusing a stopped job (T, after Ctrl+Z) with a background job that is running; and starting a long task with `&` alone over SSH, then losing it at logout. Also note that a process in state D usually cannot be killed even with SIGKILL until its I/O completes, which points to a storage or network filesystem problem.",
   "Exam questions usually give a need and ask for the signal or command. 'Graceful stop' is SIGTERM (15); 'cannot be ignored' is SIGKILL (9); 'reload configuration' is SIGHUP (1). 'Lower priority of a running process' is `renice`; 'start with lower priority' is `nice`. 'Suspended job should continue in the background' is `bg`. 'Keep running after logout' is `nohup` (or tmux, screen, a systemd unit). 'Show parent-child tree' is `pstree` or `ps -ef --forest`, and 'high wa in top' points to I/O wait rather than CPU."
  ],
  "analogy": "Think of the CPU as a single checkout lane and processes as shoppers. The nice value is how willing a shopper is to let others go ahead: 19 is extremely polite, -20 pushes to the front, and only the store manager (root) can let someone cut in. SIGTERM is announcing the store is closing so shoppers finish up; SIGKILL is security escorting someone out mid-purchase. A zombie is a receipt nobody has picked up, which only the parent can collect. The analogy stops at state D: that shopper is stuck waiting for the stockroom (I/O), and no amount of pushing moves them.",
  "terms": [
   [
    "PID / PPID",
    "Process ID and parent process ID, used to identify processes and their relationships."
   ],
   [
    "SIGTERM vs SIGKILL",
    "SIGTERM (15) asks a process to exit cleanly; SIGKILL (9) forces termination and cannot be caught."
   ],
   [
    "SIGHUP",
    "Signal 1, sent on terminal hangup and used by many daemons as a request to reload configuration."
   ],
   [
    "Nice value",
    "A priority adjustment from -20 (most favored) to 19 (least favored); only root can lower it."
   ],
   [
    "Zombie process",
    "A terminated process whose exit status has not yet been collected by its parent, shown with state Z."
   ],
   [
    "nohup",
    "Runs a command immune to hangup signals so it keeps running after the user logs out."
   ]
  ],
  "example": "A report script started over SSH is hogging CPU and will take hours. You find its PID with pgrep -f report.py, lower its priority with renice -n 15 -p 4821 so interactive users are not affected, and next time you start it as nohup nice -n 15 ./report.py & so it survives your logout.",
  "mistakes": [
   [
    "kill -9 is the normal way to stop a misbehaving process.",
    "Start with SIGTERM (kill PID), which lets the program save data and clean up. Use SIGKILL only if SIGTERM fails, because it skips cleanup and can corrupt files."
   ],
   [
    "You can kill a zombie process with kill -9.",
    "A zombie has already exited; only its exit status remains. The parent must reap it, so fix or restart the parent process."
   ],
   [
    "Any user can raise their process priority with a negative nice value.",
    "Ordinary users can only increase the nice value (lower priority). Only root can set a negative value or decrease an existing one."
   ],
   [
    "A job started with & keeps running after you log out.",
    "Background jobs still belong to your terminal and usually receive SIGHUP at logout. Use nohup, disown, tmux, screen or a systemd unit to survive logout."
   ]
  ],
  "tryit": [
   [
    "top shows overall CPU usage low, but the wa value is high and several processes sit in state D. Users say the system feels frozen. A colleague wants to renice the busy processes. Is that the right move?",
    "No. High wa and D-state processes mean the system is waiting on input/output, usually storage or a network filesystem, not on CPU. Nice affects only CPU scheduling, and even SIGKILL may not end D-state processes until their I/O completes. Investigate the disk or network storage instead."
   ],
   [
    "You started a large archive command in the foreground over SSH and realize it will take two hours. You do not want to restart it. What sequence keeps it running and frees your terminal?",
    "Press Ctrl+Z to suspend it, run bg to resume it in the background, then disown it (for example disown %1) so the shell does not send it SIGHUP at logout. Next time, start such jobs with nohup or inside tmux or screen."
   ]
  ],
  "tip": "The correct escalation is SIGTERM first, SIGKILL only if the process ignores it; and a zombie cannot be killed at all, since it is already dead, so you deal with its parent.",
  "check": [
   [
    "Which signal do many daemons treat as a request to reload their configuration?",
    "SIGHUP (signal 1), sent with kill -HUP <PID> or kill -1 <PID>."
   ],
   [
    "You pressed Ctrl+Z on a long copy. How do you let it continue in the background?",
    "Run bg (or bg %1) to resume the stopped job in the background."
   ],
   [
    "Can a regular user run renice -n -5 on their own process?",
    "No; only root can decrease a nice value (raise priority). Users can only increase it."
   ],
   [
    "What does state Z in ps output mean, and how do you clear it?",
    "It is a zombie, a finished process whose parent has not collected its exit status; you fix or restart the parent so it reaps the child."
   ],
   [
    "Which command shows processes as a parent-child tree?",
    "pstree, or ps -ef --forest, which display each process under its parent."
   ]
  ]
 },
 {
  "t": "Package management: dnf/rpm, apt/dpkg, repositories, provides and file ownership queries",
  "hook": "A ticket lands in your queue at Bluewater Port Authority: 'Need dig on cargo-db02 to troubleshoot DNS. Also, someone changed named.conf and nobody admits it.' The server is a minimal install, so dig is missing, and you are not even sure which package contains it. Meanwhile, the change on the configuration file worries your security lead. A junior admin suggests downloading an RPM from a random website and installing it with rpm -i. You can feel that is wrong, but what are the right commands to find the package that provides a tool, and to prove whether a packaged file has been modified?",
  "simple": "Software on Linux usually comes in packages, which are bundles of files plus a label saying what they need to work. Red Hat-style systems use RPM packages, and Debian or Ubuntu systems use .deb packages. Each family has a basic tool that handles one package file (`rpm` or `dpkg`) and a smarter tool that downloads from trusted online stores called repositories and fetches anything else needed (`dnf` or `apt`). You can also ask questions: which package put this file here, and which package would give me this command. It is like an app store on your phone: the store finds the app and everything it needs, and it can tell you which app a file belongs to.",
  "body": [
   "Linux software is installed as packages: archives that contain files plus metadata such as version, dependencies and install scripts. Two families dominate. Red Hat, Fedora, Rocky, Alma and SUSE use RPM (RPM Package Manager) packages, and Debian and Ubuntu use .deb packages. Each family has a low-level tool that works on individual package files and a high-level tool that talks to repositories and resolves dependencies. (SUSE's high-level tool is `zypper`, but the RPM queries are the same.)",
   "On RPM systems, `rpm` is the low-level tool. `rpm -ivh file.rpm` installs, `rpm -Uvh` upgrades, `rpm -e name` erases, `rpm -qa` lists all installed packages, `rpm -qi name` shows info, `rpm -ql name` lists a package's files, `rpm -qf /path/file` tells you which package owns a file, and `rpm -V name` verifies installed files against the package database, reporting changed sizes, permissions or checksums. rpm does not fetch dependencies, which is why `dnf` (the successor to yum) is used day to day: `dnf install`, `dnf remove`, `dnf update` (or `upgrade`), `dnf search`, `dnf info`, `dnf list installed` and `dnf history` (with `dnf history undo` to reverse a transaction). `dnf install ./pkg.rpm` installs a local file while still resolving its dependencies.",
   "On Debian systems, `dpkg` is the low-level tool: `dpkg -i file.deb` installs, `dpkg -r` removes (`-P` purges including config files), `dpkg -l` lists packages, `dpkg -L name` lists a package's files, and `dpkg -S /path/file` finds the owning package. `apt` is the high-level tool: `apt update` refreshes the package lists (it does not upgrade anything), `apt upgrade` installs newer versions, `apt full-upgrade` also allows removals to resolve dependency changes, and `apt install`, `apt remove`, `apt purge`, `apt autoremove`, `apt search` and `apt show` do what their names say. The older `apt-get` and `apt-cache` commands still work and are common in scripts because their output is stable. If a `dpkg -i` leaves dependencies missing, `apt install -f` fixes them. To preview what would change before committing to it, `dnf check-update` and `apt list --upgradable` list pending updates without installing anything.",
   "Repositories are the servers that hold packages and their metadata. On RPM systems they are defined in `.repo` files under `/etc/yum.repos.d/`, with lines such as `baseurl=`, `enabled=1` and `gpgcheck=1`; `dnf repolist` shows them and `dnf config-manager` can add or enable them. On Debian systems they are listed in `/etc/apt/sources.list` and files under `/etc/apt/sources.list.d/` (newer releases use a deb822 `.sources` format). Packages are signed with GPG (GNU Privacy Guard) keys, and leaving signature checking enabled is an important security control against tampered software.",
   "Two query types are heavily tested. A file ownership query asks which installed package a file came from: `rpm -qf /etc/ssh/sshd_config` or `dpkg -S /usr/bin/ssh`. A provides query asks which package, installed or not, would supply a file or command: `dnf provides '*/bin/dig'` (or `dnf whatprovides`) on RPM systems, and `apt-file search bin/dig` on Debian systems after installing `apt-file` and running `apt-file update`. Use the first to investigate an existing file and the second to find what to install.",
   "Consider a worked example. A minimal Rocky Linux server lacks the `dig` command. `dnf provides '*/bin/dig'` shows it comes from the bind-utils package, so you run `dnf install bind-utils`. Later, while auditing a changed configuration file, `rpm -qf /etc/named.conf` shows it belongs to the bind package, and `rpm -V bind` reports that its checksum and modification time differ from the original, flagged with `5` and `T` and marked `c` as a config file. That tells you someone edited it, so you compare it with the backup before the next change window.",
   "Common mistakes: thinking `apt update` installs updates (it only refreshes lists); using `rpm -ivh` or `dpkg -i` and then fighting missing dependencies by hand; confusing `rpm -qf` (which package owns this installed file) with `dnf provides` (which package would supply it); disabling `gpgcheck` to get past a key error instead of importing the correct key; mixing repositories from different distribution releases; and forgetting that `dpkg -r` keeps configuration files while `dpkg -P` or `apt purge` removes them.",
   "Exam questions often hinge on the family and the query type. 'Which package owns this file' is `rpm -qf` or `dpkg -S`. 'Which package do I install to get this command' is `dnf provides` or `apt-file search`. 'List files in an installed package' is `rpm -ql` or `dpkg -L`. 'Verify files have not changed' is `rpm -V`. 'Refresh package lists' is `apt update`; 'reverse the last transaction' is `dnf history undo`. 'Where are repositories defined' is `/etc/yum.repos.d/` or `/etc/apt/sources.list.d/`."
  ],
  "analogy": "The low-level tools (rpm, dpkg) are like a delivery driver who brings exactly the one box you ordered but will not fetch the batteries it needs. The high-level tools (dnf, apt) are the store that checks the box's requirements and sends everything together from a trusted warehouse (the repository), with sealed packaging (GPG signatures). rpm -qf is asking 'which box did this item come out of?', while dnf provides is asking the store's catalog 'which box would contain this item?' The analogy stops at verification: rpm -V can compare every item to its original packing list.",
  "terms": [
   [
    "rpm / dpkg",
    "Low-level package tools that install and query individual package files without resolving dependencies."
   ],
   [
    "dnf / apt",
    "High-level package managers that download from repositories and resolve dependencies."
   ],
   [
    "Repository",
    "A server or location holding packages and signed metadata, configured in /etc/yum.repos.d or /etc/apt/sources.list(.d)."
   ],
   [
    "rpm -qf / dpkg -S",
    "Queries that report which installed package owns a given file."
   ],
   [
    "dnf provides",
    "Searches repositories for the package that supplies a given file or command."
   ],
   [
    "rpm -V",
    "Verifies installed package files against the package database and reports changes."
   ],
   [
    "gpgcheck",
    "A repository setting that requires valid GPG signatures on packages before installation."
   ]
  ],
  "example": "A minimal Rocky Linux server lacks the dig command. dnf provides '*/bin/dig' shows it comes from the bind-utils package, so you run dnf install bind-utils. Later, while auditing a changed config file, rpm -qf /etc/named.conf shows it belongs to the bind package and rpm -V bind reports that its checksum differs from the original.",
  "mistakes": [
   [
    "apt update installs the latest versions of packages.",
    "apt update only refreshes the package lists from repositories. apt upgrade (or full-upgrade) actually installs newer versions."
   ],
   [
    "rpm -qf finds which package to install to get a missing command.",
    "rpm -qf and dpkg -S query only installed packages. To find a package that would provide a missing file, use dnf provides or apt-file search."
   ],
   [
    "If a repository key error blocks installation, set gpgcheck=0.",
    "Disabling signature checks removes protection against tampered packages. Import the correct vendor key instead and keep gpgcheck=1."
   ],
   [
    "dpkg -r removes everything a package installed.",
    "dpkg -r keeps configuration files. dpkg -P or apt purge also removes them."
   ]
  ],
  "tryit": [
   [
    "After a routine dnf update on a RHEL-family server, an internal application fails to start. The update installed about 40 packages in one transaction an hour ago, and you need service back quickly while you investigate. What can you do?",
    "Run dnf history to find the transaction ID, then dnf history undo <ID> to reverse that transaction, restoring the previous package versions where they are still available. Then investigate the specific package that broke the application before updating again."
   ],
   [
    "On an Ubuntu server you installed a .deb file with dpkg -i and it reports unmet dependencies, leaving the package half-configured. What is the quickest fix?",
    "Run apt install -f (fix broken), which downloads and installs the missing dependencies from the repositories and finishes configuring the package. Next time, use apt install ./file.deb so dependencies are resolved from the start."
   ]
  ],
  "tip": "apt update only refreshes package lists; apt upgrade actually installs newer versions. Many wrong answers confuse the two.",
  "check": [
   [
    "Which command shows which package installed /usr/bin/curl on Ubuntu?",
    "dpkg -S /usr/bin/curl, which searches the installed package database for the file."
   ],
   [
    "Why would you use dnf install ./pkg.rpm rather than rpm -ivh pkg.rpm?",
    "dnf resolves and installs any dependencies from the configured repositories, while rpm fails if dependencies are missing."
   ],
   [
    "What does gpgcheck=1 in a .repo file do?",
    "It requires packages from that repository to have valid GPG signatures before they are installed."
   ],
   [
    "On a RHEL system, how do you find which package would provide the semanage command?",
    "dnf provides '*/semanage' (or dnf whatprovides), which searches repository metadata even for packages not installed."
   ],
   [
    "Where are repositories defined on RHEL-family and Debian-family systems?",
    "In .repo files under /etc/yum.repos.d/ on RHEL-family systems, and in /etc/apt/sources.list and /etc/apt/sources.list.d/ on Debian-family systems."
   ]
  ]
 },
 {
  "t": "Source and language packages: make, pip, sandboxed packages (Flatpak, Snap)",
  "hook": "At Willow Creek Community College, the research lab asks you for three things before Monday: a monitoring agent that only ships as source code, a Python library for a professor's data scripts, and a newer image editor than the one in the repositories. Your colleague Tomas has already tried running sudo pip install on the shared server, and now a system tool throws import errors. You want each request done in a way you can maintain and undo later. Which installation method fits each request, and how do you avoid repeating Tomas's mistake?",
  "simple": "Most Linux software comes from your distribution's official package store, but sometimes you need something else. Building from source means downloading the program's recipe and cooking it yourself: `./configure` checks you have the ingredients, `make` cooks it, and `make install` puts it on the shelf. The system will not track or update it for you. Language tools like `pip` install add-ons for one programming language; using a virtual environment keeps those add-ons in a private box so you do not break the system. Flatpak and Snap are self-contained packages that bring their own supplies and run in a sandbox, like a meal kit that includes everything needed, so it works the same in many kitchens.",
  "body": [
   "Not all software arrives through your distribution's repositories. Sometimes you build from source, install a library with a language package manager, or use a sandboxed universal package. Each approach has trade-offs in updates, security and tidiness, and Linux+ expects you to know how each works and when to prefer it. The general rule is to use distribution packages first and reach for the others only when you need something the repositories do not offer.",
   "Building from source typically follows three steps. First, `./configure` (generated by GNU Autotools) checks for compilers and libraries and writes a Makefile; options such as `--prefix=/usr/local` choose the install location. Second, `make` reads the Makefile and compiles the code. Third, `make install`, usually run with sudo, copies the results into place. You need build tools first, installed as a group: `dnf groupinstall 'Development Tools'` on RHEL-family (Red Hat Enterprise Linux family) systems or `apt install build-essential` on Debian-family systems, plus the `-devel` or `-dev` header packages for any libraries the software uses. Projects may use other build systems such as CMake or Meson, but the idea is the same.",
   "The drawback is that the package manager knows nothing about software installed this way: no automatic security updates, no clean uninstall (some projects offer `make uninstall`), and possible conflicts with packaged files. Installing under `/usr/local` or `/opt` limits the damage, and verifying the source's checksum (for example with `sha256sum`) or signature before building protects against tampered downloads. Run `./configure` and `make` as a normal user; only `make install` needs root.",
   "Language ecosystems have their own managers: `pip` for Python, `npm` for JavaScript, `gem` for Ruby, `cargo` for Rust. With pip, `pip install requests` installs a package, `pip install -r requirements.txt` installs a pinned list, `pip list` and `pip show` inspect, `pip freeze` prints installed versions in requirements format, and `pip uninstall` removes. Installing into the system Python with sudo can break tools the operating system depends on, and many current distributions now refuse this by marking the system environment as externally managed. The safe practice is a virtual environment: `python3 -m venv venv`, `source venv/bin/activate`, then pip installs only into that project. `pip install --user` is an alternative for per-user tools.",
   "Sandboxed universal packages bundle an application with its dependencies so one package runs on many distributions, isolated from the rest of the system. Flatpak is aimed mainly at desktop applications. It installs from remotes such as Flathub: `flatpak remote-add`, `flatpak install flathub <app-id>`, `flatpak run <app-id>`, `flatpak update`, and permissions can be adjusted with `flatpak override`. Snap, developed by Canonical and standard on Ubuntu, runs as the `snapd` service and handles both desktop and server software: `snap install name`, `snap list`, `snap refresh` (snaps also refresh automatically), `snap remove`. Snaps run under confinement modes, with `strict` confining the app and `classic` giving it normal system access. The trade-off is larger disk use and a separate update channel, in exchange for newer versions and isolation. Snaps are published through the Snap Store in channels such as stable, candidate, beta and edge, and `snap install --channel=` chooses which track you follow, while Flatpak applications share runtimes that are installed and updated alongside them.",
   "Consider a worked example. A monitoring agent is only available as source. You install build-essential and the needed `-dev` headers, check the tarball's published checksum with `sha256sum`, then run `./configure --prefix=/opt/agent` and `make` as your own user, and `sudo make install`. You record the version and install path in the team's documentation, because dnf and apt will not track it or patch it. For the agent's Python helper scripts, you create a virtual environment with `python3 -m venv /opt/agent/venv` and `pip install -r requirements.txt` inside it, leaving the system Python untouched. A colleague's desktop needs a newer image editor than the repositories offer, so you install it with Flatpak from Flathub.",
   "Common mistakes: running `make install` before `./configure` has succeeded; forgetting the `-dev` or `-devel` headers, so configure fails with a missing library; running `sudo pip install` into the system Python; assuming source-installed software gets security updates; and assuming snaps and flatpaks share the system's libraries, when in fact each bundles its own and updates separately. Another trap is thinking `classic` confinement is more secure; it is the least confined mode.",
   "Exam questions tend to name the order or the manager. 'Build order' is `./configure`, `make`, `make install`. 'Choose install location' is `--prefix`. 'Compiler and build tools missing' points to Development Tools or build-essential. 'Isolate Python dependencies per project' is a venv. 'Error: externally managed environment' means use a venv or the distribution package. 'Desktop app from Flathub' is Flatpak; 'snapd', 'channels', 'confinement', 'automatic refresh' point to Snap."
  ],
  "analogy": "Distribution packages are meals from the school cafeteria: inspected, consistent and replaced when there is a recall. Building from source is cooking at home from a recipe: you control everything, but nobody tells you about a recall, so you must track it yourself. A Python virtual environment is a separate lunchbox for one project so its ingredients do not mix with the shared fridge. Flatpaks and snaps are sealed meal kits with their own ingredients and containers. The analogy stops at confinement: a classic snap is a kit with the seal removed, with ordinary access to the kitchen.",
  "terms": [
   [
    "make",
    "A build tool that reads a Makefile and runs the steps to compile software; make install copies it into place."
   ],
   [
    "./configure",
    "A script that checks build dependencies and generates a Makefile, often with --prefix to set the install path."
   ],
   [
    "pip",
    "Python's package installer, best used inside a virtual environment."
   ],
   [
    "Virtual environment",
    "An isolated Python environment created with python3 -m venv so project packages do not affect the system."
   ],
   [
    "Flatpak",
    "A sandboxed universal packaging format mainly for desktop apps, commonly installed from Flathub."
   ],
   [
    "Snap",
    "Canonical's sandboxed package format managed by snapd, with automatic refreshes and confinement modes."
   ]
  ],
  "example": "A monitoring agent is only available as source. You install build-essential and the needed -dev headers, run ./configure --prefix=/opt/agent, make and sudo make install, then document the install because dnf and apt will not track it. For its Python helper scripts, you create a venv under /opt/agent and pip install the requirements there instead of into the system Python.",
  "mistakes": [
   [
    "Run every source build step with sudo.",
    "Run ./configure and make as a normal user. Only make install, which copies files into system locations, normally needs root."
   ],
   [
    "sudo pip install is the standard way to add Python libraries on a server.",
    "It can break tools the operating system depends on, and many distributions now refuse it as an externally managed environment. Use a virtual environment, pip install --user, or the distribution package."
   ],
   [
    "Software installed with make install receives security updates like other packages.",
    "The package manager does not know about it, so you must track versions and patch it yourself. Document the version and install path."
   ],
   [
    "Classic snap confinement is the most secure option.",
    "Classic gives the snap normal system access, so it is the least confined. Strict confinement isolates the application."
   ]
  ],
  "tryit": [
   [
    "You run ./configure for a tool and it stops with an error saying a required library's headers cannot be found, even though the library itself is installed. What is missing, and how do you fix it?",
    "The development headers package is missing. Install the library's -devel package (RHEL family) or -dev package (Debian family), plus the Development Tools group or build-essential if compilers are also missing, then rerun ./configure."
   ],
   [
    "A data team needs a specific older version of a Python library for one project, while another project on the same server needs the newest version. How do you satisfy both?",
    "Create a separate virtual environment for each project (python3 -m venv), activate each in turn, and pip install the required version from that project's requirements file. Each environment keeps its own libraries, and the system Python stays untouched."
   ]
  ],
  "tip": "The standard source build order is ./configure, make, make install; only the last step normally needs root.",
  "check": [
   [
    "Why is software installed with make install harder to maintain than a repository package?",
    "The package manager does not track it, so it receives no automatic updates and has no clean, recorded uninstall."
   ],
   [
    "What is the safest way to install Python libraries for one project without affecting the system?",
    "Create a virtual environment with python3 -m venv, activate it, and pip install inside it."
   ],
   [
    "Which service must be running for Snap packages to work?",
    "snapd, the daemon that installs, mounts, confines and refreshes snaps."
   ],
   [
    "What does ./configure --prefix=/opt/tool change?",
    "It sets the install location, so make install places the files under /opt/tool instead of the default /usr/local."
   ],
   [
    "Which pip command records installed versions in requirements format?",
    "pip freeze, whose output can be saved to requirements.txt and reinstalled with pip install -r requirements.txt."
   ]
  ]
 },
 {
  "t": "Containers: podman/docker run, images, port publishing, volumes, logs, inspect",
  "hook": "At Maple Street Credit Union, Jenna from the web team spun up a containerized status page last week. This morning, after she removed and recreated the container to pick up a new image, every customer notice she had written is gone. Meanwhile, the security team flags that three developers were added to the docker group so they could skip sudo. Jenna asks you two questions over coffee: where did her data go, and is that docker group thing really a problem? You also need to show her how to publish the page on port 8080. What do you tell her?",
  "simple": "A container is a way to run a program in its own sealed space while sharing the computer's core (the kernel). It starts fast because it does not boot a whole separate operating system. An image is a read-only template, and a container is a running copy of it. To let people reach a program inside a container, you publish a port: `-p 8080:80` means 'visitors knock on the host's door 8080 and get sent to the container's door 80'. Anything saved inside the container vanishes when you delete it, unless you store it in a volume, which is storage kept outside. Commands like `logs` and `inspect` help you see what is happening. Think of a food truck: the image is the truck design, the container is a truck in service.",
  "body": [
   "A container is a process, or group of processes, that runs isolated from the rest of the system while sharing the host's kernel. Isolation comes from kernel namespaces (separate views of processes, network, mounts and hostnames) and cgroups (control groups, which limit CPU and memory). Because there is no guest operating system to boot, containers start in seconds and use far fewer resources than virtual machines. Linux+ expects you to run and manage them with Docker or Podman.",
   "Docker uses a background daemon, `dockerd`, that runs containers on your behalf, and membership in the `docker` group is effectively root-equivalent. Podman, the default on RHEL-family (Red Hat Enterprise Linux family) systems, is daemonless and can run rootless containers as an ordinary user, reducing risk. Their command-line syntax is almost identical, so `podman run` and `docker run` accept the same common options. An image is a read-only template built in layers, identified by a name and tag such as `registry.example.com/team/web:1.4`; if no tag is given, `latest` is assumed. `podman pull nginx` downloads an image from a registry, `podman images` lists local images, `podman rmi` removes one, and `podman build -t myapp:1.0 .` builds one from a Containerfile or Dockerfile. A container is a running (or stopped) instance of an image with a thin writable layer on top; `podman ps` lists running containers and `podman ps -a` includes stopped ones.",
   "`podman run` creates and starts a container. Key options: `-d` runs it detached in the background, `--name web` names it, `-it` gives an interactive terminal, `--rm` deletes it on exit, and `-e KEY=value` sets environment variables. Port publishing uses `-p hostport:containerport`, so `-p 8080:80` makes the container's port 80 reachable on the host's port 8080. Without `-p`, services inside the container are not reachable from outside the host. Rootless containers cannot bind host ports below 1024 by default. You can publish several ports by repeating `-p`, and a mapping such as `-p 127.0.0.1:8080:80` limits access to the host itself, which is a simple way to keep a test service off the network.",
   "Anything written inside a container's writable layer disappears when the container is removed. For persistent data use volumes: `-v webdata:/usr/share/nginx/html` uses a named volume managed by the engine (`podman volume ls`), while `-v /srv/site:/usr/share/nginx/html:Z` bind-mounts a host directory. On SELinux (Security-Enhanced Linux) systems the `:Z` (private) or `:z` (shared) suffix relabels the directory so the container may access it; without it you get permission denied errors. For troubleshooting, `podman logs web` shows what the container wrote to stdout and stderr (`-f` follows), `podman exec -it web /bin/sh` opens a shell inside a running container, `podman inspect web` prints detailed JSON (JavaScript Object Notation) about configuration, mounts, network settings and state, and `podman port web` shows published ports. `podman stop`, `start`, `restart` and `rm` manage the lifecycle, and `podman stats` shows live resource use.",
   "```bash\npodman run -d --name web -p 8080:80 -v webdata:/usr/share/nginx/html nginx:stable\npodman ps\npodman logs -f web\npodman inspect web\n```",
   "Consider a worked example. A team needs a quick internal wiki. As a regular user you run `podman run -d --name wiki -p 8081:3000 -v wikidata:/data <image>:<tag>`, so colleagues reach it on host port 8081 while the application listens on 3000 inside. When a colleague reports errors, `podman logs wiki` shows a missing setting, which you pass with `-e` when recreating the container. When the image is updated, you pull the new tag, remove the container and recreate it, and the pages survive because they live in the `wikidata` volume. `podman inspect wiki` confirms the mount and the published port.",
   "Common mistakes: reading `-p` backwards (it is always host first, container second); storing data only in the writable layer and losing it on `podman rm`; forgetting `:Z` on a bind mount under SELinux; relying on the `latest` tag in production, which can change without notice; adding users to the `docker` group without realizing it grants root-equivalent access; and confusing `podman exec` (run a command in an existing container) with `podman run` (create a new one).",
   "Exam questions often show a run command and ask how to reach the service or where data goes. 'Clients connect to host port X' means the left side of `-p`. 'Data lost after container removed' means a volume was missing. 'Permission denied on a bind mount on RHEL' points to the `:Z` label. 'See what the app printed' is `logs`; 'detailed JSON configuration' is `inspect`; 'open a shell inside' is `exec -it`. 'Daemonless and rootless' describes Podman; 'central daemon, docker group is root-equivalent' describes Docker."
  ],
  "analogy": "An image is a printed form template; a container is a photocopy you are writing on. When you throw the copy away, your notes go with it, unless you wrote them in a separate notebook (a volume) that you clip to each new copy. Port publishing is the front desk forwarding calls: callers dial the building's extension 8080, and the desk forwards them to room 80 inside. The analogy stops at isolation: the photocopies all share the same building's foundation (the host kernel), which is the key difference from virtual machines.",
  "terms": [
   [
    "Image",
    "A read-only, layered template (name:tag) from which containers are created."
   ],
   [
    "Container",
    "An isolated process running from an image with its own writable layer, sharing the host kernel."
   ],
   [
    "Namespaces and cgroups",
    "Kernel features that give containers isolated views of the system and limit their resource use."
   ],
   [
    "Port publishing",
    "The -p host:container option that maps a host port to a port inside the container."
   ],
   [
    "Volume",
    "Persistent storage managed by the container engine or bind-mounted from the host, surviving container removal."
   ],
   [
    "Rootless container",
    "A container run by an unprivileged user, as Podman supports, limiting the impact of a compromise."
   ]
  ],
  "example": "A team needs a quick internal wiki. You run podman run -d --name wiki -p 8081:3000 -v wikidata:/data <image>:<tag> as a regular user. Colleagues reach it on port 8081; when the image is updated, you remove the container and recreate it from the new image, and the pages survive because they live in the wikidata volume.",
  "mistakes": [
   [
    "In -p 8080:80, the container listens on 8080.",
    "The format is host:container. Clients connect to host port 8080, which forwards to port 80 inside the container."
   ],
   [
    "Data written inside a container persists when the container is recreated.",
    "It lives in the container's writable layer and is deleted with podman rm. Store persistent data in a named volume or bind mount."
   ],
   [
    "Adding users to the docker group is a safe alternative to sudo.",
    "Docker group members can control the root-run daemon, which is effectively root access. Podman's rootless mode is a lower-risk option."
   ],
   [
    "podman run and podman exec do the same thing.",
    "run creates and starts a new container from an image; exec runs a command inside an existing, running container."
   ]
  ],
  "tryit": [
   [
    "On a RHEL host, you start a web container with -v /srv/site:/usr/share/nginx/html. The container runs, but every page returns a permission error, and the files have correct ordinary permissions. What is the likely cause and fix?",
    "SELinux is blocking access because the host directory lacks a label the container may use. Recreate the container with -v /srv/site:/usr/share/nginx/html:Z (private) or :z (shared) so Podman relabels the directory."
   ],
   [
    "A developer runs a rootless Podman container with -p 80:8080 and it fails to start, while -p 8080:8080 works. Why?",
    "Rootless containers cannot bind host ports below 1024 by default. Publish a high host port such as 8080, or place a reverse proxy or system-level configuration in front if port 80 is required."
   ]
  ],
  "tip": "Read -p mappings as host:container. A question showing -p 8443:443 means clients connect to the host on 8443 to reach the container's 443.",
  "check": [
   [
    "What happens to data written inside a container without a volume when the container is removed?",
    "It is lost, because it lives only in the container's writable layer."
   ],
   [
    "Which command shows a container's IP address, mounts and environment in detail?",
    "podman inspect <container> (or docker inspect), which prints the full configuration and state as JSON."
   ],
   [
    "Name one security advantage Podman has over a default Docker setup.",
    "It is daemonless and can run containers rootless as an ordinary user, whereas Docker group membership effectively grants root."
   ],
   [
    "A bind-mounted directory gives permission denied inside a container on a RHEL host. What is the likely fix?",
    "Add :Z (or :z) to the -v option so the directory is relabeled with an SELinux context the container may use."
   ],
   [
    "Which command follows a container's output as it is written?",
    "podman logs -f <container> (or docker logs -f), which streams stdout and stderr."
   ]
  ]
 },
 {
  "t": "Container orchestration concepts: Kubernetes pods, deployments, services",
  "hook": "It is the first morning of the holiday sale at Summit Trail Outfitters, and traffic triples by 9 a.m. Your colleague Leo has been running the shop's web containers by hand on two servers, and at 9:20 one server dies. Leo restarts the containers on the other server, but customers' browsers still point at the old addresses, and the new version he deployed an hour ago is throwing errors. The team lead says next year the store moves to Kubernetes. Which Kubernetes objects would have replaced the lost containers, kept customers on a stable address and rolled back the bad version?",
  "simple": "When you have many containers on many computers, keeping them all running by hand is hard. Kubernetes is a system that does this for you. You write down what you want, such as 'three copies of the web app', and Kubernetes keeps making it true. A pod is the smallest piece: one or more containers that share an address. A deployment says which app version to run and how many copies, replaces pods that fail and updates them gradually. A service gives the pods one steady address and spreads visitors across them, because pods come and go and get new addresses. It is like a restaurant: cooks (pods) change shifts, the manager (deployment) keeps enough cooks on duty, and the phone number (service) never changes.",
  "body": [
   "Running a few containers by hand works for one host, but production applications need many containers across many machines, restarted when they fail, scaled with demand and updated without downtime. Container orchestration automates this, and Kubernetes (often written K8s) is the dominant orchestrator. Linux+ tests the core concepts rather than deep cluster administration: what each object does, how they relate, and which one you change to get a result.",
   "A Kubernetes cluster has a control plane and worker nodes. The control plane includes the API (application programming interface) server (everything talks to it), etcd (a key-value store holding cluster state), the scheduler (chooses which node runs each workload) and controller managers (keep reality matching the desired state). Each worker node runs a kubelet agent, a container runtime such as containerd or CRI-O, and kube-proxy for service networking. You interact with the cluster through `kubectl`. Kubernetes is declarative: you describe the desired state in YAML (YAML Ain't Markup Language) manifests and apply them with `kubectl apply -f file.yaml`, and controllers continually work to make the cluster match. This differs from imperatively running commands one at a time, and it is why Kubernetes pairs well with Git-based workflows where manifests are reviewed and versioned.",
   "The pod is the smallest deployable unit: one or more containers that share a network namespace (one IP, Internet Protocol, address, so they talk over localhost) and can share volumes. Most pods hold a single application container, sometimes with a helper 'sidecar' such as a log shipper. Pods are disposable; when one dies, it is replaced by a new pod with a new IP, not repaired. You rarely create pods directly. A deployment declares which image to run and how many replicas you want. It manages a ReplicaSet that keeps that number of pods running, replacing failed ones automatically. Changing the image triggers a rolling update that replaces pods gradually, `kubectl rollout status` watches it, and `kubectl rollout undo` rolls back. `kubectl scale deployment web --replicas=5` changes the count.",
   "Because pod IPs change, clients need a stable address. A service provides one: a fixed virtual IP and DNS (Domain Name System) name that load-balances across all pods matching a label selector, such as `app: web`. Service types include ClusterIP (reachable only inside the cluster, the default), NodePort (opens a port on every node) and LoadBalancer (asks the cloud provider for an external load balancer). An Ingress can route HTTP (Hypertext Transfer Protocol) traffic by hostname or path to services. Other objects you should recognize: namespaces divide a cluster into logical areas, ConfigMaps hold configuration and Secrets hold sensitive values (base64-encoded by default, which is not encryption), and PersistentVolumeClaims request storage that outlives pods. Everyday commands include `kubectl get pods`, `kubectl describe pod name`, `kubectl logs name` and `kubectl exec -it name -- sh`, which mirror the container commands you already know. Labels are simple key-value tags attached to objects, and selectors are how deployments and services find the pods they own; if the labels on the pod template do not match, the link silently breaks.",
   "```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3\n  selector:\n    matchLabels: {app: web}\n  template:\n    metadata:\n      labels: {app: web}\n    spec:\n      containers:\n        - name: web\n          image: registry.example.com/shop/web:2.1\n          ports: [{containerPort: 8080}]\n```",
   "Consider a worked example. An online store runs its web tier as the deployment above, with three replicas behind a ClusterIP service named `web` whose selector is `app: web`, fronted by an Ingress for the store's hostname. When a node fails, the ReplicaSet schedules replacement pods on healthy nodes, and because clients use the service name rather than pod IPs, customers notice nothing. For a sale, you scale to six replicas; when a new image misbehaves, `kubectl rollout undo deployment/web` restores the previous version.",
   "Common mistakes: creating bare pods for an application and wondering why they are not replaced after a failure; pointing clients at pod IPs; a service whose selector does not match the pods' labels, so it has no endpoints; exposing an internal service as NodePort or LoadBalancer when ClusterIP is enough; treating base64-encoded Secrets as encrypted; and editing live objects by hand so the cluster drifts from the manifests in version control.",
   "Exam questions usually ask which object provides a behavior. 'Smallest unit, containers share an IP' is a pod. 'Keep N copies running', 'rolling update', 'rollback' is a deployment. 'Stable IP or DNS name, load balancing across pods' is a service; 'reachable only inside the cluster' is ClusterIP. 'Route by hostname or path' is an Ingress. 'Non-secret settings' is a ConfigMap; 'passwords or tokens' is a Secret. 'Command-line client' is `kubectl`, and 'desired state in YAML' describes declarative configuration."
  ],
  "analogy": "A Kubernetes deployment is like a staffing agency told to keep three cashiers on the floor. If one goes home sick, the agency sends a replacement, who has a different name and badge (a new pod IP). Customers do not ask for cashiers by name; they line up at the checkout sign (the service), which directs them to whoever is working. The analogy stops at pods: unlike a person, a failed pod is never healed, only replaced, and a pod can hold more than one container sharing the same badge.",
  "terms": [
   [
    "Pod",
    "The smallest Kubernetes unit: one or more containers sharing an IP address and volumes."
   ],
   [
    "Deployment",
    "An object that declares an image and replica count, maintains that many pods and performs rolling updates."
   ],
   [
    "Service",
    "A stable virtual IP and DNS name that load-balances traffic to pods selected by labels."
   ],
   [
    "kubectl",
    "The command-line client that talks to the Kubernetes API server."
   ],
   [
    "Declarative configuration",
    "Describing desired state in manifests and letting controllers reconcile the cluster to match it."
   ],
   [
    "Secret",
    "A Kubernetes object for sensitive values, base64-encoded by default rather than encrypted."
   ]
  ],
  "example": "An online store runs its web tier as a deployment with three replicas behind a ClusterIP service named web, fronted by an Ingress. When a node fails, the deployment's ReplicaSet schedules replacement pods on healthy nodes, and because clients use the service name rather than pod IPs, customers notice nothing.",
  "mistakes": [
   [
    "Create pods directly for a production application.",
    "Bare pods are not replaced if they fail. Use a deployment, which manages a ReplicaSet that keeps the desired number of pods running."
   ],
   [
    "Clients should connect to pod IP addresses.",
    "Pods are disposable and get new IPs when replaced. Clients should use a service's stable virtual IP or DNS name."
   ],
   [
    "Kubernetes Secrets are encrypted by default.",
    "By default their values are only base64-encoded. Access control and encryption at rest must be configured separately."
   ],
   [
    "Every service should be NodePort or LoadBalancer so it is reachable.",
    "ClusterIP, the default, is enough for internal services and limits exposure. Use NodePort, LoadBalancer or an Ingress only for traffic from outside the cluster."
   ]
  ],
  "tryit": [
   [
    "You create a service named api with selector app: api, but requests to it time out. kubectl get pods shows three healthy pods labeled app: api-v2, and kubectl describe service api shows no endpoints. What is wrong?",
    "The service selector does not match the pods' labels, so it has no endpoints to send traffic to. Change the selector to app: api-v2, or relabel the pod template to app: api, and the service will pick up the pods."
   ],
   [
    "After a rolling update to a new image, error rates jump and you need the previous version back immediately while the team investigates. Which object and command do you use?",
    "Roll back the deployment with kubectl rollout undo deployment/<name>, which returns to the previous ReplicaSet, and watch progress with kubectl rollout status. Then fix the manifest in version control so the cluster does not drift."
   ]
  ],
  "tip": "Keep the three roles straight: a pod runs containers, a deployment keeps the right number of pods running and updates them, and a service gives them a stable network address.",
  "check": [
   [
    "Why should clients connect to a service instead of directly to a pod's IP?",
    "Pods are replaced frequently and get new IPs; a service provides a stable IP and DNS name that tracks the current pods."
   ],
   [
    "Which object would you change to run more copies of an application?",
    "The deployment's replica count, for example with kubectl scale deployment <name> --replicas=N."
   ],
   [
    "Are Kubernetes Secrets encrypted by default?",
    "No; by default their values are only base64-encoded, so access control and encryption at rest must be configured separately."
   ],
   [
    "A new image version causes errors after a rolling update. How do you return to the previous version?",
    "kubectl rollout undo deployment/<name>, which rolls the deployment back to its previous ReplicaSet."
   ],
   [
    "What is the difference between a ConfigMap and a Secret?",
    "A ConfigMap holds non-sensitive configuration; a Secret holds sensitive values such as passwords or tokens, base64-encoded by default and protected with access controls."
   ]
  ]
 },
 {
  "t": "Logging: journalctl filters, rsyslog, logrotate",
  "hook": "It is 6:40 a.m. and the payments server at Harbor Credit Union rebooted itself sometime overnight. Priya, the on-call admin, logs in and runs `journalctl -u payments -b -1`, hoping to see what happened right before the crash. The terminal answers with nothing at all: no entries for the previous boot. Meanwhile a disk alert is flashing because one text log under `/var/log` has quietly grown for weeks. Her manager wants a root cause by nine. Where did last night's evidence go, why is the disk full, and which of the two logging systems on this box should she have been looking at in the first place?",
  "simple": "A log is a diary the computer keeps about itself: what started, what failed, who logged in. Linux usually keeps two diaries at once. One is the systemd journal, a searchable database you read with the `journalctl` command, a bit like a spreadsheet you can filter by service, time or seriousness. The other is rsyslog, which writes ordinary text files in the `/var/log` folder and can also send copies to another computer for safekeeping. Because diaries keep growing, a helper called logrotate acts like a librarian who boxes up old pages, squeezes them smaller and throws away the oldest boxes. Picture a store that keeps its receipts in a searchable app and also in paper folders, with someone archiving the folders every night.",
  "body": [
   "Logs are your record of what happened on a system, and they are the first place to look when something breaks or looks suspicious. Modern Linux distributions run two logging systems side by side: the systemd journal and rsyslog, with logrotate keeping file-based logs under control. Knowing which one holds what, and how to filter quickly, turns a long search into a one-line command. systemd-journald collects messages from the kernel, early boot, each service's standard output and standard error, and the classic syslog interface, and stores them in a structured binary journal. Every entry carries fields such as the unit name, PID (process ID), UID (user ID) and priority, which is why the journal can answer precise questions that grep over a text file cannot.",
   "Where the journal lives decides whether it survives a reboot. On many distributions the journal is kept only in memory under `/run/log/journal` unless the directory `/var/log/journal` exists or `Storage=persistent` is set in `/etc/systemd/journald.conf`. With the default `Storage=auto`, journald writes to disk only if that directory is present. Without persistence, every log from before the last reboot is gone, which is exactly the trap in a 'what happened before the crash' investigation. Size is managed separately: `journalctl --disk-usage` shows how much space the journal uses, `journalctl --vacuum-size=500M` or `--vacuum-time=2weeks` trims old entries, and `SystemMaxUse=` in journald.conf caps it permanently. After editing journald.conf, restart `systemd-journald` for the change to apply.",
   "`journalctl` reads the journal, and its filters are heavily tested. `-u sshd` shows one unit, `-b` the current boot, `-b -1` the previous boot and `--list-boots` lists every boot the journal knows about. `-p err` shows messages of priority err and everything more severe, `-k` shows kernel messages only, `-f` follows new entries like `tail -f`, `-e` jumps to the end, and `-n 50` shows the last 50 lines. `--since '2026-09-24 10:00' --until '1 hour ago'` selects a time window, and words like `today` and `yesterday` work too. You can also match fields directly: `_PID=1234` or `_UID=1001`. `-o json-pretty` reveals all the fields of each entry, and `-x` adds explanatory catalog text where available. Filters combine, so `journalctl -u nginx -p warning --since today` is a typical real-world query.",
   "rsyslog is the traditional syslog daemon. It writes plain text files under `/var/log`, such as `/var/log/messages` (RHEL family) or `/var/log/syslog` (Debian family) for general messages and `/var/log/secure` or `/var/log/auth.log` for authentication, depending on the distribution. Its rules in `/etc/rsyslog.conf` and `/etc/rsyslog.d/*.conf` use a selector made of facility.priority followed by an action, usually a file path. Facilities name the source: `auth`, `authpriv`, `cron`, `daemon`, `kern`, `mail` and the custom `local0` to `local7`. Priorities from lowest to highest severity are debug, info, notice, warning, err, crit, alert and emerg. A priority in a selector means that level and everything more severe, so `*.err` means err and above from every facility, while `authpriv.* /var/log/secure` sends all authpriv messages to one file. If you truly want only one level, rsyslog uses `=`, as in `*.=err`.",
   "rsyslog also forwards logs. `*.* @server:514` sends everything over UDP (User Datagram Protocol) and `*.* @@server:514` uses TCP (Transmission Control Protocol), which is more reliable because lost packets are retransmitted. Central logging is an important security control: attackers who compromise a host often try to erase local logs, but copies already shipped to a log server stay intact. After changing rules, restart rsyslog and test with `logger -p local0.warning 'test message'`, then confirm the line appears in the expected file and on the central server.",
   "logrotate prevents text logs from filling the disk. It runs daily from cron or a systemd timer and reads `/etc/logrotate.conf` plus per-application files in `/etc/logrotate.d/`. Common directives are `daily` or `weekly`, `rotate 7` (keep seven old copies, deleting anything older), `compress` and `delaycompress` (leave the most recent rotated copy uncompressed for one cycle), `missingok` (no error if the log is absent), `notifempty` (skip empty logs), `size 100M` (rotate when the file reaches a size), `create 0640 root adm` for the new file's mode and owner, and a `postrotate` ... `endscript` block that signals the service to reopen its log. `copytruncate` copies the file and then truncates the original in place, for programs that cannot reopen their log; it is simpler but can lose a few lines written during the copy. Test a configuration with `logrotate -d` (debug mode, no changes made) and force a rotation with `logrotate -f`.",
   "```\n/var/log/payments/*.log {\n    daily\n    rotate 14\n    compress\n    delaycompress\n    missingok\n    notifempty\n    create 0640 payments adm\n    postrotate\n        systemctl kill -s HUP payments.service\n    endscript\n}\n```",
   "Consider a worked example. A payments service crashed overnight and the server rebooted. `journalctl -u payments -b -1 -p err` shows the errors from the previous boot, but only because you earlier created `/var/log/journal` to make the journal persistent. You confirm that rsyslog forwarded the same messages to the central server with `*.* @@logs.example.com:514`, which matters because the local disk was nearly full: the service's text log had grown for weeks with nothing rotating it. You add the logrotate stanza above, check it with `logrotate -d /etc/logrotate.d/payments`, and the next morning see compressed older copies with only fourteen kept. The `postrotate` HUP makes the service open a fresh file instead of writing into the renamed one.",
   "Watch for the common mistakes. People expect `journalctl -b -1` to work when the journal is volatile; write `@` when TCP forwarding was required; read `*.err` as 'only err' when it means err and everything more severe; forget the `postrotate` signal, so a service keeps writing to the rotated file and the new one stays empty; and edit logrotate files without a dry run.",
   "On the exam, 'previous boot' is `-b -1`, 'follow live' is `-f`, 'one service' is `-u`, 'errors and worse' is `-p err`, 'kernel only' is `-k`, 'two @' is TCP, 'keep N copies' is `rotate N`, 'program cannot reopen its log' is `copytruncate`, and 'logs lost after reboot' points to persistent journal storage. 'Structured, binary, per-unit queries' describes the journal, while 'plain text files under /var/log' and 'forward to a central server by facility' describe rsyslog."
  ],
  "analogy": "Think of the journal as a searchable security-camera system and rsyslog as a paper logbook at the front desk. The camera system lets you jump to one door, one hour or one alarm level instantly, but if it records only to temporary memory, a power cut wipes yesterday's footage, which is the volatile-journal trap. The paper logbook is simple, readable by anyone, and you can fax copies to headquarters (forwarding). logrotate is the clerk who boxes old logbook pages. The analogy stops at format: the journal is binary and must be read with journalctl, not opened like a text file.",
  "mnemonic": "Syslog priorities from most to least severe: Every Alley Cat Eats Watery Noodles In Dishes, for emerg, alert, crit, err, warning, notice, info, debug. A selector like `*.err` catches err and every cat to its left.",
  "terms": [
   [
    "systemd-journald",
    "The systemd logging service that stores structured, binary log data queried with journalctl."
   ],
   [
    "rsyslog",
    "A syslog daemon that routes messages by facility and priority to text files or remote servers."
   ],
   [
    "Facility and priority",
    "Syslog categories for the message source (auth, cron, kern, local0...) and severity (debug through emerg)."
   ],
   [
    "logrotate",
    "A utility that rotates, compresses and prunes log files according to rules in /etc/logrotate.conf and /etc/logrotate.d."
   ],
   [
    "Persistent journal",
    "Journal storage under /var/log/journal that survives reboots, enabled by creating that directory or setting Storage=persistent."
   ],
   [
    "logger",
    "A command that writes a test message into the system log with a chosen facility and priority."
   ],
   [
    "copytruncate",
    "A logrotate directive that copies a log and truncates the original, for programs that cannot reopen their log file."
   ]
  ],
  "example": "A service crashed overnight and the server rebooted. journalctl -u payments -b -1 -p err shows errors from the previous boot, but only because you earlier created /var/log/journal to make the journal persistent. You also confirm that rsyslog forwarded the same messages to the central log server with @@logs.example.com:514, then add a logrotate stanza so the service's text log can no longer fill the disk.",
  "mistakes": [
   [
    "Running `journalctl -b -1` and concluding the server never logged anything before the reboot.",
    "If the journal is volatile (only under /run/log/journal), previous boots are simply not kept. Create /var/log/journal or set Storage=persistent so future boots are preserved."
   ],
   [
    "Reading `*.err` in rsyslog as 'only error messages'.",
    "A priority in a selector means that level and everything more severe (crit, alert, emerg). Use `*.=err` for exactly one level."
   ],
   [
    "Picking `@server:514` when the requirement says reliable or TCP forwarding.",
    "One @ is UDP and two @@ is TCP. TCP retransmits lost data, so it is the reliable choice."
   ],
   [
    "Assuming logrotate alone is enough and skipping postrotate or copytruncate.",
    "Many daemons keep writing to the old, renamed file until signaled. Add a postrotate signal, or use copytruncate if the program cannot reopen its log."
   ]
  ],
  "tryit": [
   [
    "You manage an Ubuntu web server. Security wants every authentication message copied to the central log host `siem01` reliably, and the local `/var/log/app/api.log` must be rotated when it reaches 200 MB, keeping five compressed copies. The app cannot reopen its log file on a signal. What do you configure?",
    "In an rsyslog drop-in, add `auth,authpriv.* @@siem01:514` (two @ for TCP, the reliable option) and restart rsyslog, then test with `logger -p auth.info 'test'`. In /etc/logrotate.d/api, use `size 200M`, `rotate 5`, `compress` and `copytruncate`, because the app cannot reopen its file. Check it with `logrotate -d` before relying on it."
   ],
   [
    "A developer asks why `journalctl -u worker` shows only today's entries even though the service has run for a month, and the server reboots nightly. What do you check and change?",
    "Check whether /var/log/journal exists or Storage= is set in journald.conf. The journal is probably volatile under /run/log/journal, so each nightly reboot discards it. Create /var/log/journal (or set Storage=persistent), restart systemd-journald, and use `--list-boots` later to confirm multiple boots are retained."
   ]
  ],
  "tip": "In rsyslog forwarding, one @ means UDP and two @@ mean TCP; in journalctl, -b -1 means the previous boot, which only works with a persistent journal.",
  "check": [
   [
    "Which journalctl command follows new messages from the sshd unit in real time?",
    "journalctl -u sshd -f, where -u selects the unit and -f follows new entries."
   ],
   [
    "Why might journalctl -b -1 return nothing on a fresh install?",
    "The journal may be stored only in memory (/run/log/journal); without persistent storage, logs from previous boots are lost."
   ],
   [
    "What does rotate 4 combined with weekly do in a logrotate stanza?",
    "Rotates the log once a week and keeps four old copies, deleting older ones."
   ],
   [
    "Which rsyslog selector matches error messages and anything more severe from all facilities?",
    "*.err, because a priority in a selector means that level and every higher severity."
   ],
   [
    "How do you safely test a new logrotate file without rotating anything?",
    "logrotate -d /etc/logrotate.d/<name>, which runs in debug mode and makes no changes."
   ]
  ]
 },
 {
  "t": "Permissions: chmod symbolic and octal, chown, umask",
  "hook": "A ticket lands in your queue at Cedar Valley Clinic: 'Nobody on the billing team can open the new shared folder, and the contractor somehow can.' You open a terminal on the file server and run `ls -l /srv/billing`. The strings look like a code: `drwxrwx---`, `-rw-r--r--`, `-rwxrwxrwx`. Someone tried to 'fix' an earlier complaint with `chmod -R 777`, then someone else reversed part of it. You have twenty minutes before the billing run starts. Can you read those nine letters, translate them to numbers, and set them right without making every invoice file executable or visible to the whole building?",
  "simple": "Every file on Linux has an owner, a group it belongs to, and a short list of who may do what. There are three kinds of people: the owner, members of the file's group, and everyone else. For each kind there are three switches: read (look at it), write (change it) and execute (run it as a program, or for a folder, step inside it). Those nine switches can be written as letters, like `rwxr-x---`, or as three digits, where read counts 4, write counts 2 and execute counts 1, so `750` means owner 7 (all), group 5 (read and run), others 0 (nothing). It is like an office keycard system: the owner's card opens everything, team cards open some doors, visitors get none.",
  "body": [
   "Linux file permissions decide who can read, change or run each file. Every file has an owner (user), a group owner, and three sets of permission bits for user (u), group (g) and others (o). The kernel checks them in a fixed order: if you are the owner, only the user bits apply; otherwise, if you are a member of the file's group, only the group bits apply; otherwise the others bits apply. The first matching class wins, so an owner with fewer rights than the group is still limited to the owner bits. Getting these right is the foundation of Linux security, and the exam expects you to convert between notations quickly and predict the result of a change.",
   "Start by reading `ls -l` output. In a string such as `-rwxr-x---`, the first character is the file type (`-` for a regular file, `d` for a directory, `l` for a symbolic link) and the next nine characters are three triplets: user `rwx`, group `r-x`, others `---`. For files, r allows reading contents, w allows modifying contents and x allows executing the file as a program. For directories the meanings differ, and this is where many people slip: r allows listing the names inside, w allows creating, deleting and renaming entries (together with x), and x allows entering the directory and accessing files inside it by name. That means deleting a file depends on write permission on the directory, not on the file itself.",
   "Octal notation assigns r=4, w=2 and x=1 and adds them within each triplet: rwx=7, rw-=6, r-x=5, r--=4 and ---=0. So `chmod 755 script.sh` gives rwxr-xr-x, `chmod 640 app.conf` gives rw-r-----, and `chmod 600 ~/.ssh/id_ed25519` gives rw-------, the mode SSH expects for a private key. Octal always sets all nine bits at once, which makes it ideal when a requirement states the exact final permissions. Converting backward is the same arithmetic in reverse: 6 is 4+2, so read and write; 5 is 4+1, so read and execute.",
   "Symbolic notation changes specific bits and leaves the rest alone, which is safer when you only want to adjust one thing. `chmod u+x script.sh` adds execute for the owner, `chmod g-w file` removes group write, `chmod o=r file` sets others to exactly read, `chmod a+r file` adds read for all three classes, and `chmod ug=rw,o= file` sets several classes in one command. `-R` applies a change recursively. With `-R`, capital `X` adds execute only to directories and to files that already have execute for someone, which lets you make a tree traversable without turning every data file into a program: `chmod -R u=rwX,g=rX,o= /srv/data`.",
   "Ownership is changed with `chown`, and only root can give files away to another user. `chown alice file` changes the owner, `chown alice:devs file` changes owner and group together, `chown :devs file` changes only the group (as does `chgrp devs file`), and `chown -R` recurses through a directory tree. An ordinary owner may change a file's group only to a group they belong to. Ownership and mode work together: a careful `chmod 770` is useless if the group owner is the wrong group.",
   "umask sets default permissions for newly created files by masking bits off. Files start from 666 (programs do not get execute by default) and directories from 777, and the bits set in the umask are removed. A umask of 022 gives files 644 and directories 755; a umask of 027 gives 640 and 750; 077 gives 600 and 700. Run `umask` to see the current value (`umask -S` shows it symbolically, such as `u=rwx,g=rx,o=`) and `umask 027` to change it for the current shell session. System-wide defaults come from `/etc/login.defs`, `/etc/profile` or shell startup files, and systemd services can set `UMask=` in their unit file. A stricter umask is a simple hardening step for servers that hold sensitive data.",
   "When a user is denied access, check permissions along the whole path, not just the file. Every parent directory needs x for the user to reach the file, so a 644 file inside a 700 directory owned by someone else is unreachable. `namei -l /path/to/file` lists the owner, group and mode of each path component in one view, which makes the missing x easy to spot. Remember also that group membership changes take effect at the next login, so a user just added to a group may need to log out and back in, or run `newgrp`, before access works.",
   "Consider a worked example. A shared project directory must be readable and writable by the devs group but invisible to everyone else. You run `chown -R root:devs /srv/project` and `chmod -R u=rwX,g=rwX,o= /srv/project`, so directories become 770 and files 660 without data files gaining execute. You set `umask 007` in the team's shell profile so new files are created as 660 and directories as 770. When a developer outside the group reports 'permission denied', `namei -l /srv/project/notes.txt` shows that is exactly what should happen. A new team member added to devs can read the files after logging in again.",
   "Common mistakes: using `chmod -R 777` to 'fix' access, which lets anyone change or replace files; running `chmod -R 755` on data and making every file executable (use `X`); forgetting that deleting a file needs write on the directory; checking only the file and ignoring the x bit on a parent directory; and computing umask by subtracting digits. Subtraction happens to work for common values but fails when bits do not overlap. The safe method is to think of it as removing bits: 666 with 033 removed gives 644, not 633, because the execute bits being 'removed' were never there.",
   "Exam questions usually give one notation and ask for the other, or give a umask and ask for the result. Convert each triplet separately: 750 is rwxr-x---, 644 is rw-r--r--. 'Add execute for owner only, change nothing else' is symbolic `u+x`. 'Set exact permissions' fits octal. 'Change owner and group together' is `chown user:group`. 'New files should be 640' means umask 027. 'Cannot open a 644 file' points to a parent directory missing x."
  ],
  "analogy": "Picture an apartment building. The file is an apartment, the directory is the hallway. Owner, group and others are the tenant, the tenant's family and the public. Read is looking through the window, write is rearranging furniture, execute is using the appliances. For a hallway, x is the right to walk down it and w is the right to add or remove apartment doors, which is why you can 'demolish' an apartment you cannot enter if you control the hallway. The analogy stops at umask, which is more like a building rule that removes certain keys from every new lock before it is installed.",
  "terms": [
   [
    "Octal permissions",
    "Numeric notation where r=4, w=2, x=1 are summed for user, group and others, such as 750."
   ],
   [
    "Symbolic permissions",
    "Notation using u, g, o, a with +, - or = and r, w, x to change specific bits."
   ],
   [
    "Execute on a directory",
    "Permission to enter a directory and access its contents by name."
   ],
   [
    "Capital X",
    "A symbolic chmod bit that adds execute only to directories and files already executable by someone."
   ],
   [
    "chown",
    "Changes a file's owner and/or group owner, for example chown alice:devs file."
   ],
   [
    "umask",
    "A mask of permission bits removed from the defaults (666 files, 777 directories) when new files are created."
   ],
   [
    "namei -l",
    "Shows the owner, group and mode of every component of a path, used to find a missing directory x bit."
   ]
  ],
  "example": "A shared project directory must be readable and writable by the devs group but invisible to everyone else. You run chown -R root:devs /srv/project and chmod -R u=rwX,g=rwX,o= /srv/project, then set umask 007 in the team's shell profile so new files are created as 660 and directories as 770.",
  "mistakes": [
   [
    "Using `chmod -R 777` to fix a 'permission denied' complaint.",
    "It gives every user write access, so anyone can alter or replace files. Find the real cause (wrong group, missing directory x, user not in group) and grant only what is needed."
   ],
   [
    "Believing you need write permission on a file to delete it.",
    "Deletion changes the directory, so it requires write and execute on the containing directory. The file's own bits do not matter (unless the sticky bit is set)."
   ],
   [
    "Computing umask results by subtracting digits, so 666 minus 033 equals 633.",
    "umask removes bits. 666 has no execute bits to remove, so 666 with 033 masked gives 644."
   ],
   [
    "Applying `chmod -R 755` to a data tree to make it browsable.",
    "That makes every data file executable. Use `chmod -R u=rwX,g=rX,o=rX` so only directories (and existing programs) get x."
   ]
  ],
  "tryit": [
   [
    "An auditor's script must read `/data/reports/q3.csv`, which is `-rw-r--r--` and owned by root. The script runs as user `audit` and fails with permission denied. `/data` is `drwxr-xr-x` and `/data/reports` is `drwxr-----` owned by root:finance. What is wrong and what is the least-privilege fix?",
    "The file is readable by others, but `/data/reports` gives others no x (or r), so `audit` cannot traverse into the directory. Even the finance group has only r there, not x. A tight fix is `chmod o+x /data/reports`, which lets others open files they already know the name of without letting them list the directory; alternatively add `audit` to finance and run `chmod g+x /data/reports`. Confirm with `namei -l /data/reports/q3.csv`."
   ],
   [
    "A web server team wants new files they create to be readable by their group but not by anyone else, and new directories to be enterable by the group. Which umask fits, and what will a new file and directory look like?",
    "umask 027. Files start at 666 and lose group write and all others bits, giving 640 (rw-r-----). Directories start at 777 and become 750 (rwxr-x---)."
   ]
  ],
  "tip": "Compute umask results by removing the umask bits from 666 for files and 777 for directories; a umask of 027 yields 640 files and 750 directories.",
  "check": [
   [
    "What permissions does chmod 750 give in symbolic form?",
    "rwxr-x---: owner read/write/execute, group read/execute, others nothing."
   ],
   [
    "A user can read a file's permissions but gets permission denied opening it, even though the file is 644. What might be wrong?",
    "A parent directory lacks execute (x) permission for that user, so the path cannot be traversed."
   ],
   [
    "With a umask of 077, what permissions does a new file get?",
    "600 (rw-------), because all group and others bits are removed from the 666 default."
   ],
   [
    "A user without write permission on a file can still delete it. Why?",
    "Deleting is controlled by write and execute permission on the containing directory, not by the file's own permissions."
   ],
   [
    "Which command adds execute for the owner without changing any other bits?",
    "chmod u+x file, because symbolic notation changes only the named bits."
   ]
  ]
 },
 {
  "t": "Special permissions: SUID, SGID, sticky bit; ACLs with setfacl and getfacl",
  "hook": "Monday morning at Northwind Freight, two complaints arrive within minutes. The accounting team says files in their shared folder keep ending up owned by each person's private group, so colleagues cannot edit them, and yesterday someone deleted a teammate's spreadsheet by accident. Then the security lead forwards an audit finding: an old copy of a backup tool in `/usr/local/bin` shows `-rwsr-xr-x` and is owned by root. Finally, an outside auditor needs read-only access to one subfolder, and the owner and group must not change. Three different problems, three small letters and one extra tool. Which bit, or which ACL entry, fixes each one?",
  "simple": "Normal Linux permissions only have three slots: owner, group and everyone else. Sometimes that is not enough, so Linux adds a few special switches. SUID lets a program run with its owner's powers, the way a valet uses your car key just for parking. SGID on a folder makes every new file join the folder's team automatically. The sticky bit on a shared folder means you can only delete your own things, like a shared fridge where you may only throw out your own leftovers. When you need to give one extra person access without changing the owner or group, an ACL (access control list) adds a named entry, like adding one guest to a door list.",
  "body": [
   "Beyond the basic rwx bits, Linux has three special permission bits and optional ACLs (access control lists). They solve real problems, such as letting users change their own password or share a directory safely, but they also create risk if misused, so the exam covers both their use and their security implications. Each special bit appears as a letter in one of the three execute positions of `ls -l`, and each has an octal value that goes in a fourth, leading digit of the mode.",
   "SUID (set user ID), octal 4000, applies to executables: the program runs with the privileges of the file's owner rather than the user who launched it. The classic example is `/usr/bin/passwd`, owned by root, which must update `/etc/shadow` on behalf of ordinary users who cannot write that file themselves. In `ls -l` it appears as an `s` in the user execute position: `-rwsr-xr-x`. A capital `S` means the bit is set but execute is not, which is usually a mistake. Because a flawed SUID-root program can let an attacker gain root, administrators audit them regularly with `find / -perm -4000 -type f 2>/dev/null`, compare the list with a known-good baseline, and remove the bit with `chmod u-s` from anything that does not need it. Many systems also mount user-writable filesystems such as `/tmp` or removable media with `nosuid`, so a SUID file placed there is ignored. Linux ignores SUID on interpreted shell scripts, so it is only meaningful on compiled programs.",
   "SGID (set group ID), octal 2000, has two uses. On an executable it runs the program with the file's group. On a directory, which is the more common use, new files created inside inherit the directory's group instead of the creator's primary group, and new subdirectories inherit the SGID bit too, so a team directory stays consistently group-owned. It shows as `s` in the group execute position: `drwxrws---`. SGID does not retroactively change existing files; after setting it you may still need `chgrp -R` on what is already there.",
   "The sticky bit, octal 1000, applies to directories: users may only delete or rename files they own (or the directory owner or root can), even if the directory is world-writable. `/tmp` is the standard example, shown as `t` in the others execute position: `drwxrwxrwt`, and a capital `T` again means the underlying execute bit is missing. Set the special bits with a leading octal digit or symbolically: `chmod 4755 /usr/local/bin/tool` or `chmod u+s`, `chmod 2770 /srv/team` or `chmod g+s`, `chmod 1777 /shared/drop` or `chmod +t`. The leading digit adds up like the others, so a team share that also needs delete protection combines SGID (2) and sticky (1) as 3770.",
   "ACLs extend the owner/group/others model when you need to grant access to specific additional users or groups. `setfacl -m u:bob:rw report.txt` gives bob read and write; `setfacl -m g:auditors:r report.txt` adds a group; `setfacl -x u:bob report.txt` removes one entry and `setfacl -b` removes all extended entries. `-R` applies a change recursively. Default ACLs on a directory, set with `setfacl -d -m g:devs:rwx /srv/project` (or with a `d:` prefix in the entry), are inherited by new files and subdirectories created inside, but they do not change existing files. `getfacl file` displays every entry, including the mask, which caps the effective permissions of named users, named groups and the owning group. When the mask is narrower than an entry, getfacl prints a comment such as `#effective:r--` beside it. A `+` at the end of the permission string in `ls -l`, such as `-rw-rw-r--+`, tells you an ACL is present, and in that case the group triplet shown by ls reflects the mask. ACLs are supported by ext4, XFS and Btrfs on modern systems, and copying tools need options such as `cp -a` or `rsync -A` to preserve them.",
   "```\n$ getfacl /srv/finance/reports\n# file: srv/finance/reports\n# owner: root\n# group: finance\n# flags: -st\nuser::rwx\nuser:auditor:r-x\ngroup::rwx\nmask::rwx\nother::---\ndefault:user:auditor:r-x\n```",
   "Consider a worked example. The finance team shares `/srv/finance`. You set `chown root:finance` and `chmod 3770`, so files inherit the finance group (SGID) and members cannot delete each other's files (sticky). An external auditor needs read-only access to one subfolder, so you run `setfacl -R -m u:auditor:rX /srv/finance/reports` for existing files and `setfacl -d -m u:auditor:rX /srv/finance/reports` for future ones, then verify with `getfacl`, whose output looks like the block above. The `flags: -st` line shows SGID and sticky are set (the three positions are SUID, SGID and sticky), and the `default:` line proves new files will carry the auditor's entry.",
   "Common mistakes: seeing capital `S` or `T` and assuming the bit works normally (execute is missing); leaving unneeded SUID-root programs in place; setting SGID on a directory and expecting existing files to change group (only new files inherit); forgetting that a restrictive ACL mask can silently reduce a named user's rights, which `getfacl` reports as `#effective:`; running `chmod g-w` on a file with ACLs and accidentally narrowing the mask for every named entry; and copying files with plain `cp`, losing their ACLs.",
   "Exam questions usually show a permission string or octal mode and ask what it does. 's' in the user slot is SUID; 's' in the group slot is SGID; 't' at the end is sticky; a trailing `+` means ACLs. 'Users must not delete each other's files in a shared directory' is the sticky bit. 'New files should belong to the team group' is SGID on the directory. 'Program must run with its owner's rights' is SUID. 'Give one extra user access without changing owner or group' is `setfacl -m`, and 'new files should inherit that access' is a default ACL. 'Find SUID programs during an audit' is `find / -perm -4000`."
  ],
  "analogy": "Think of a shared office. SUID is a staff badge clipped to a machine: anyone who presses its button acts with the badge owner's authority, which is why a faulty machine wearing the manager's badge is dangerous. SGID on a directory is a team stamp that marks every new folder dropped in the cabinet as 'Accounting'. The sticky bit is a rule on the shared shelf: anyone may add boxes, but only the box's owner may remove it. An ACL is a guest list taped to the door naming extra people. The comparison stops at the ACL mask, which is more like a ceiling on every guest's badge level.",
  "mnemonic": "Special bits in leading-digit order, 4-2-1, read left to right like the u-g-o slots: SUID 4 in the user slot, SGID 2 in the group slot, Sticky 1 in the others slot. 'User, Group, Others; 4, 2, 1; s, s, t.'",
  "terms": [
   [
    "SUID",
    "Special bit (4000) that makes an executable run with its owner's privileges; shown as s in the user execute slot."
   ],
   [
    "SGID",
    "Special bit (2000) that runs a program with the file's group or makes new files in a directory inherit its group."
   ],
   [
    "Sticky bit",
    "Directory bit (1000) that allows only a file's owner, the directory owner or root to delete or rename it."
   ],
   [
    "ACL",
    "Access control list: extra per-user or per-group permission entries managed with setfacl and getfacl."
   ],
   [
    "Default ACL",
    "An ACL on a directory that new files and subdirectories inherit when they are created."
   ],
   [
    "ACL mask",
    "The ACL entry that limits the maximum effective permissions for named users, named groups and the owning group."
   ],
   [
    "nosuid",
    "A mount option that makes the kernel ignore SUID and SGID bits on a filesystem."
   ]
  ],
  "example": "The finance team shares /srv/finance. You set chown root:finance and chmod 3770 so files inherit the finance group (SGID) and members cannot delete each other's files (sticky). An external auditor needs read-only access to one subfolder, so you run setfacl -R -m u:auditor:rX /srv/finance/reports and setfacl -d -m u:auditor:rX on it for future files, verifying with getfacl.",
  "mistakes": [
   [
    "Choosing SUID when the requirement is 'new files in this directory should belong to the team group'.",
    "SUID affects executables. Group inheritance on a directory is SGID (chmod g+s or the leading digit 2)."
   ],
   [
    "Assuming `-rwSr--r--` means the program runs with its owner's rights.",
    "Capital S means SUID is set but the owner execute bit is missing, so nothing runs. It is usually a configuration error."
   ],
   [
    "Expecting a default ACL or SGID to fix existing files.",
    "Both apply only to files created afterward. Use setfacl -R -m or chgrp -R for what already exists."
   ],
   [
    "Thinking a named ACL entry of rwx always grants rwx.",
    "The mask caps effective rights. If the mask is r-x, getfacl shows #effective:r-x and the user cannot write."
   ]
  ],
  "tryit": [
   [
    "A shared drop folder `/srv/upload` must let every local user create files, prevent users from deleting each other's files, and make every new file belong to the `uploads` group. The directory is owned by root:uploads. Which mode do you set, and how do you verify it?",
    "chmod 3777 /srv/upload (or 3770 if only the uploads group should write). The leading 3 is SGID (2) plus sticky (1). `ls -ld /srv/upload` should show `drwxrwsrwt`, with s in the group slot and t at the end."
   ],
   [
    "During a quarterly audit, `find / -perm -4000 -type f` lists `/opt/legacy/bin/report` owned by root, which nobody remembers installing and which no process uses. What should you do?",
    "Treat it as a risk: a SUID-root program can lead to privilege escalation if it has a flaw. Confirm with the application owner, then remove the bit with `chmod u-s` (or remove the package), record the change, and consider mounting application or user-writable areas with nosuid."
   ]
  ],
  "tip": "Map the letters to positions: s in the user slot is SUID, s in the group slot is SGID, t in the others slot is the sticky bit; a + after the permissions means ACLs exist.",
  "check": [
   [
    "Which command finds all SUID files on the system?",
    "find / -perm -4000 -type f 2>/dev/null, where -4000 matches any file with the SUID bit set."
   ],
   [
    "What octal mode gives a directory rwx for owner and group, nothing for others, and SGID?",
    "2770, where the leading 2 is SGID and 770 gives rwx to owner and group."
   ],
   [
    "How do you give user maria read access to plan.txt without changing its owner or group?",
    "setfacl -m u:maria:r plan.txt, which adds a named-user ACL entry."
   ],
   [
    "What does a capital S in the user execute position of ls -l mean?",
    "The SUID bit is set but the owner's execute bit is not, so the setting has no useful effect and is usually a mistake."
   ],
   [
    "How can you tell from ls -l that a file has an ACL?",
    "A + appears after the nine permission characters, for example -rw-rw-r--+."
   ]
  ]
 },
 {
  "t": "SELinux: modes, contexts, restorecon, semanage, booleans, ausearch; AppArmor profiles and modes",
  "hook": "Late Friday at Bluepine Library, Marcus finishes moving the new events website into `/var/www/html` and reloads the page. 403 Forbidden. He checks `ls -l`: the files are 644, owned correctly, the directory is 755. He restarts Apache. Still 403. A colleague in chat suggests the classic shortcut: 'Just run setenforce 0 and go home.' It would work instantly, and it would also switch off the layer that keeps a hacked web server from reading the rest of the system. Marcus has perfect Unix permissions and a denial anyway. What is actually blocking Apache, and how does he fix it while leaving the protection on?",
  "simple": "Normal Linux permissions are like a homeowner deciding who gets a key. SELinux and AppArmor add a building security guard with a rulebook that even the homeowner cannot override. The rulebook says what each program is allowed to touch: the web server may read web files and nothing else, for example. If someone breaks into the web server, the guard still stops it from wandering into other rooms. SELinux works by putting a label on every file and program and checking whether the labels are allowed to meet. AppArmor works from a list of file paths each program may use. A file can have a perfect key and still be stopped by the guard if its label is wrong.",
  "body": [
   "Standard permissions are DAC (discretionary access control): the owner decides who gets access. SELinux (Security-Enhanced Linux) and AppArmor add MAC (mandatory access control): a system-wide policy limits what each program may do regardless of file ownership, so a compromised web server cannot read files outside what its policy allows. Both checks must pass, so a file can have perfect permissions and still be denied. That is the signature of every MAC exam question: the Unix permissions look correct and access still fails. RHEL-family systems use SELinux; Ubuntu and Debian use AppArmor, which SUSE also used for years, although newer SUSE releases default to SELinux.",
   "SELinux has three modes. Enforcing applies the policy and blocks violations. Permissive allows everything but logs what would have been denied, which is useful for troubleshooting because it tells you whether SELinux is the cause. Disabled turns SELinux off entirely. `getenforce` shows the mode, `sestatus` gives more detail (mode, policy name, configured mode), and `setenforce 0` or `setenforce 1` switches between permissive and enforcing until the next reboot. The persistent setting is `SELINUX=` in `/etc/selinux/config`, which takes effect at boot. Switching from disabled back to enabled requires a full filesystem relabel, for example by creating `/.autorelabel` and rebooting, because files created while SELinux was off have no labels. Disabling SELinux to make a problem go away is the wrong answer on the exam and in practice.",
   "Every process and file has a context in the form user:role:type:level, for example `system_u:object_r:httpd_sys_content_t:s0`. In the default targeted policy the type is what matters: the Apache process runs in the `httpd_t` domain and may read files labeled `httpd_sys_content_t`. View contexts with `ls -Z` for files, `ps -eZ` for processes and `id -Z` for your own shell. Labels are the most common problem. A file created in a home directory and then moved with `mv` keeps its old label, such as `user_home_t`, so the web server is denied access, whereas `cp` creates a new file that takes the destination's default label. `restorecon -Rv /var/www/html` resets files to the default labels defined by policy and prints each change. `chcon -t type file` changes a label directly, but it is temporary: a relabel or restorecon will undo it.",
   "Policy itself can be adjusted with `semanage`. To define a new default label for a custom path, use `semanage fcontext -a -t httpd_sys_content_t '/srv/web(/.*)?'` and then run `restorecon -Rv /srv/web`; the first command records the rule, the second applies it to existing files. `semanage port -a -t http_port_t -p tcp 8081` allows a service to listen on a non-standard port, and `semanage port -l` lists port labels. Booleans are on/off switches for optional policy behavior. `getsebool -a` lists them (filter with grep, such as `getsebool -a | grep httpd`), and `setsebool -P httpd_can_network_connect on` lets Apache make outbound network connections; `-P` makes the change persistent across reboots.",
   "Finding the cause means reading denials. SELinux logs them as AVC (access vector cache) messages in `/var/log/audit/audit.log`, written by auditd. A typical line includes `avc: denied { read }`, the source context (`scontext=...httpd_t`), the target context (`tcontext=...user_home_t`) and the class (`tclass=file`). `ausearch -m avc -ts recent` finds recent denials, `sealert` (from the setroubleshoot package) explains them in plain language and often suggests the exact fix, and `audit2why` interprets why a denial happened. `audit2allow` can generate a custom policy module from denials, but prefer fixing labels, ports or booleans first, because a hastily generated module can allow far more than intended.",
   "AppArmor takes a different approach, confining programs with path-based profiles stored in `/etc/apparmor.d/`. Each profile runs in enforce mode (violations blocked and logged) or complain mode (violations only logged). `aa-status` lists loaded profiles and their modes, `aa-enforce` and `aa-complain` switch a profile, `aa-disable` turns one off, and `apparmor_parser -r` reloads a profile after editing. Denials appear in the kernel log or audit log with `apparmor=\"DENIED\"` and the profile and path involved. The key design difference is that SELinux labels objects and decides by type, while AppArmor decides by file path, so moving a file changes how AppArmor sees it but not its SELinux label.",
   "Consider a worked example. After moving a new site into `/var/www/html` with `mv`, visitors get 403 Forbidden. Permissions look fine, so you suspect MAC. `getenforce` says Enforcing, `ls -Z` shows the files labeled `user_home_t`, and `ausearch -m avc -ts recent` shows `httpd_t` denied read access to them. Running `restorecon -Rv /var/www/html` relabels them `httpd_sys_content_t` and the site loads, with SELinux still enforcing. Next week the application must call an external API; the AVC log shows a denied network connection, and `setsebool -P httpd_can_network_connect on` fixes it without writing any custom policy.",
   "Common mistakes: disabling SELinux or leaving it permissive permanently instead of fixing the cause; using `chcon` for a permanent fix, which a relabel later undoes; forgetting `-P` on `setsebool`, so the boolean resets at reboot; running `semanage fcontext` but not `restorecon`, so existing files keep their old labels; editing `/etc/selinux/config` and expecting the mode to change without a reboot; moving a service to a new port without `semanage port`; and editing an AppArmor profile without reloading it.",
   "Exam questions usually describe a denial with correct Unix permissions. 'Files moved into the web root, 403 errors' points to `restorecon`. 'Custom content path, make the label permanent' is `semanage fcontext` plus `restorecon`. 'Service on a non-standard port' is `semanage port -a`. 'Allow optional behavior persistently' is `setsebool -P`. 'Find denials' is `ausearch -m avc`. 'Log but do not block' is permissive (SELinux) or complain (AppArmor). 'List AppArmor profiles and modes' is `aa-status`."
  ],
  "analogy": "SELinux is like a concert venue where every person gets a colored wristband and every door has a sign saying which colors may enter. The web server wears an 'httpd' band and the web files must carry a matching sticker. Moving a box of files with `mv` keeps its old 'home' sticker, so the guard refuses, and `restorecon` re-stickers the box according to the venue map. AppArmor is a guest list written by room address instead of wristbands. The analogy stops at booleans, which are like pre-approved exceptions the venue manager can flip on without redrawing the map.",
  "mnemonic": "SELinux context fields in order, user:role:type:level: 'Use Real Type Labels', and remember the T in the middle is the one the targeted policy checks.",
  "terms": [
   [
    "MAC",
    "Mandatory access control: a system-enforced policy that restricts programs regardless of file ownership."
   ],
   [
    "SELinux context",
    "The user:role:type:level label on files and processes; the type drives most targeted-policy decisions."
   ],
   [
    "restorecon",
    "Resets file SELinux labels to the defaults defined in policy."
   ],
   [
    "semanage fcontext",
    "Defines a persistent default SELinux label for a path pattern, applied by restorecon."
   ],
   [
    "SELinux boolean",
    "A policy switch toggled with setsebool (-P for persistent) to allow optional behaviors."
   ],
   [
    "AVC denial",
    "An access vector cache message in the audit log recording an action SELinux blocked or would block."
   ],
   [
    "AppArmor profile",
    "A path-based policy for one program, running in enforce or complain mode."
   ],
   [
    "Permissive mode",
    "SELinux mode that logs would-be denials without blocking them; used temporarily for troubleshooting."
   ]
  ],
  "example": "After moving a new site into /var/www/html with mv, visitors get 403 Forbidden. ls -Z shows the files labeled user_home_t, and ausearch -m avc -ts recent shows httpd_t denied read access. Running restorecon -Rv /var/www/html relabels them httpd_sys_content_t and the site loads, with SELinux still enforcing.",
  "mistakes": [
   [
    "Choosing 'set SELinux to disabled' or 'setenforce 0' as the fix for a denial.",
    "That removes the protection rather than fixing the cause. Use permissive only briefly to confirm SELinux is involved, then fix labels, ports or booleans and stay enforcing."
   ],
   [
    "Using `chcon -t httpd_sys_content_t` as the permanent fix for a custom web directory.",
    "chcon is undone by the next relabel or restorecon. Use `semanage fcontext -a` to record the rule, then `restorecon` to apply it."
   ],
   [
    "Running `setsebool httpd_can_network_connect on` and assuming it is done.",
    "Without -P the boolean reverts at reboot. Use setsebool -P."
   ],
   [
    "Thinking AppArmor complain mode blocks violations but with extra logging.",
    "Complain mode only logs. Enforce mode blocks and logs. Complain is the AppArmor counterpart to SELinux permissive."
   ]
  ],
  "tryit": [
   [
    "A RHEL server must run a web application on TCP port 8443 from content stored in `/data/site`. Apache fails to start with a permission error on the port, and after you work around that, pages return 403. File permissions are correct and SELinux is enforcing. What two fixes do you apply?",
    "For the port: `semanage port -a -t http_port_t -p tcp 8443` (check first with `semanage port -l | grep http`). For the content: `semanage fcontext -a -t httpd_sys_content_t '/data/site(/.*)?'` followed by `restorecon -Rv /data/site`. Also open the port in the firewall. SELinux stays enforcing."
   ],
   [
    "On an Ubuntu host, a newly tightened AppArmor profile for a database is breaking nightly backups, and you are not yet sure which paths it needs. How do you gather information without leaving the database unconfined?",
    "Put just that profile in complain mode with `aa-complain` so violations are logged but not blocked, run the backup, read the resulting entries in the kernel or audit log (in complain mode they are marked `apparmor=\"ALLOWED\"` rather than DENIED), update the profile, reload it with `apparmor_parser -r`, and return it to enforce with `aa-enforce`. Confirm with `aa-status`."
   ]
  ],
  "tip": "The best-practice answer is almost never 'disable SELinux'; look for restorecon, semanage fcontext, semanage port or setsebool -P instead, and use permissive mode only temporarily to confirm SELinux is the cause.",
  "check": [
   [
    "Which SELinux mode logs denials without blocking them?",
    "Permissive, which records AVC messages but allows the actions, making it useful for troubleshooting."
   ],
   [
    "You serve web content from /srv/web. How do you make its correct label permanent?",
    "semanage fcontext -a -t httpd_sys_content_t '/srv/web(/.*)?' followed by restorecon -Rv /srv/web."
   ],
   [
    "What is the AppArmor equivalent of SELinux permissive mode for a single profile?",
    "Complain mode, set with aa-complain, which logs violations without blocking them."
   ],
   [
    "Why does a file moved with mv cause SELinux denials while a copied file does not?",
    "mv keeps the file's original label, while cp creates a new file that inherits the destination directory's default label."
   ],
   [
    "Which command lists recent SELinux denials from the audit log?",
    "ausearch -m avc -ts recent."
   ]
  ]
 },
 {
  "t": "Firewalls: firewalld zones and --permanent, ufw, nftables/iptables basics",
  "hook": "On Tuesday, Elena at Lakeshore Logistics opens HTTPS on a new RHEL web server with `firewall-cmd --add-service=https`, tests it from her laptop, and closes the ticket. On Thursday the server reboots for patching, and the customer portal goes dark. Monitoring shows the web service running fine, yet every connection times out. At the same moment, a colleague on an Ubuntu box is about to type `ufw enable` over an SSH session with no rules yet defined. Two admins, two firewalls, two mistakes that look nothing alike but come from the same idea. What did Elena's command actually change, and what is her colleague about to do to himself?",
  "simple": "A host firewall is a doorman for one computer. Network traffic arrives at numbered doors called ports, such as 443 for secure websites or 22 for remote login. The firewall checks each visitor against a list of rules and lets in only what is allowed. Linux has several ways to write that list: firewalld on Red Hat-style systems, ufw on Ubuntu, and the lower-level nftables and iptables that the others are built on. The biggest gotcha is memory. In firewalld, a quick change is like telling the doorman something verbally: he remembers until the end of his shift, then forgets. Writing it into the rulebook, with `--permanent`, makes it stick, but he only reads the rulebook when asked to reload.",
  "body": [
   "A host firewall filters network traffic entering and leaving a Linux system, so only the services you intend are reachable. In the kernel, packet filtering is done by netfilter; the tools you type commands into are front ends that write netfilter rules. Linux+ covers firewalld (RHEL family), ufw (Ubuntu) and the lower-level nftables and iptables. A host firewall complements, rather than replaces, network firewalls, and it is part of the defense-in-depth approach the exam expects: even if a network rule is wrong, the host still refuses traffic it was not told to accept.",
   "firewalld organizes rules into zones, each representing a trust level: `drop`, `block`, `public`, `external`, `internal`, `dmz`, `work`, `home` and `trusted`. Each network interface or source address is assigned to one zone, and that zone's allowed services and ports apply to its traffic; `drop` silently discards everything not explicitly allowed, while `trusted` accepts everything. `public` is a common default. Key commands use `firewall-cmd`: `--get-default-zone`, `--get-active-zones`, `--list-all` (shows the current zone's services, ports and interfaces), `--add-service=https`, `--add-port=8080/tcp`, `--remove-service`, and `--zone=internal --change-interface=eth1`. Services are predefined names that map to ports, like `ssh` for 22/tcp; `firewall-cmd --get-services` lists them. Rich rules give finer control, such as allowing a service only from one subnet or logging a match.",
   "The crucial distinction is runtime versus permanent configuration. By default, `firewall-cmd --add-service=http` changes only the running firewall, which is lost at reload or reboot. Adding `--permanent` writes the change to configuration but does not apply it to the running firewall until `firewall-cmd --reload`. The usual pattern is either to run the command twice (once with and once without `--permanent`) or to make it permanent and then reload. If you tested changes at runtime and are happy with them, `--runtime-to-permanent` saves them all at once. Note that `--reload` discards any runtime-only changes you have not saved, so reloading can also take something away.",
   "ufw (Uncomplicated Firewall) is Ubuntu's simpler front end. `ufw status verbose` shows state, default policies and rules, `ufw default deny incoming` and `ufw default allow outgoing` set policies, `ufw allow 22/tcp` or `ufw allow OpenSSH` opens SSH (OpenSSH is an application profile), `ufw allow from 10.0.0.0/24 to any port 5432` restricts by source, and `ufw deny` and `ufw delete allow 80/tcp` block or remove rules. `ufw status numbered` shows rule numbers so you can delete by number. Finally `ufw enable` turns it on and makes it start at boot. Always allow SSH before enabling ufw on a remote machine, or you will lock yourself out. ufw rules are persistent automatically, so there is no runtime-versus-permanent split to remember.",
   "iptables is the traditional rule tool, organized as tables (filter, nat, mangle) containing chains (INPUT, OUTPUT, FORWARD, PREROUTING, POSTROUTING). INPUT handles traffic to the host itself, OUTPUT traffic it sends, and FORWARD traffic it routes for others. Rules are evaluated top to bottom and the first match decides the target (ACCEPT, DROP, REJECT); unmatched packets follow the chain's default policy. DROP silently discards a packet, so the client waits until it times out, while REJECT sends back an error, so the client fails fast. `iptables -L -n -v` lists rules with counters, `iptables -A INPUT -p tcp --dport 22 -j ACCEPT` appends a rule at the bottom and `-I` inserts at the top. Rules are not persistent without saving, via `iptables-save` (restored with `iptables-restore`) or a persistence package.",
   "nftables is the modern replacement, with one tool, `nft`, a cleaner syntax and IPv4 and IPv6 handled together in the `inet` family, so you no longer maintain separate iptables and ip6tables rule sets. `nft list ruleset` shows everything at once, and rules are persisted in a configuration file loaded at boot. On current distributions, firewalld uses nftables as its backend and the `iptables` command often translates to nftables underneath. Pick one management tool per host; mixing firewalld, ufw and hand-written rules leads to confusing conflicts where one tool silently overrides another.",
   "```\nfirewall-cmd --permanent --add-service=https\nfirewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address=10.0.20.0/24 service name=postgresql accept'\nfirewall-cmd --reload\nfirewall-cmd --list-all\n```",
   "Consider a worked example. A new RHEL web server must accept HTTPS from anywhere and PostgreSQL only from the application subnet. You run the commands above: open HTTPS permanently, add a rich rule allowing PostgreSQL only from 10.0.20.0/24, reload, and confirm with `--list-all`, which shows `https` under services and the rich rule underneath. From an application server the database connects; from a laptop on another subnet it times out, which is what you want. On an Ubuntu utility host you do the equivalent with `ufw allow OpenSSH`, `ufw allow 443/tcp` and `ufw enable`, and check with `ufw status verbose`.",
   "Common mistakes: adding a firewalld rule without `--permanent` and losing it at reboot; adding it with `--permanent` and forgetting `--reload`; enabling ufw before allowing SSH on a remote host; appending an iptables ACCEPT rule after a rule that already drops the traffic (order matters); and running two firewall managers at once. On the exam, 'works now but gone after reboot' means `--permanent` was missing; 'permanent rule has no effect yet' means reload; 'trust level bound to an interface' is a zone; 'one tool for IPv4 and IPv6 together' is nftables with `nft list ruleset`; and 'simple Ubuntu front end' is ufw. 'Silently discard' is DROP, while 'send an error back' is REJECT."
  ],
  "analogy": "firewalld's runtime and permanent settings are like a whiteboard and a printed policy binder in a security office. A runtime change is written on the whiteboard: it takes effect immediately but gets wiped when the shift changes (reload or reboot). A permanent change goes into the binder, but guards keep following the whiteboard until someone says 'reload', at which point the whiteboard is wiped and rewritten from the binder. ufw is a smaller office where every change goes straight into the binder and the whiteboard at once. The analogy stops at iptables ordering, which is more like a checklist read from the top where the first matching line wins.",
  "terms": [
   [
    "netfilter",
    "The Linux kernel framework that performs packet filtering and NAT, configured by firewall tools."
   ],
   [
    "firewalld zone",
    "A named trust level with its own allowed services and ports, bound to interfaces or source addresses."
   ],
   [
    "--permanent",
    "firewall-cmd option that saves a change to configuration; it takes effect after --reload."
   ],
   [
    "Rich rule",
    "A firewalld rule with finer conditions, such as allowing a service only from a specific source subnet."
   ],
   [
    "ufw",
    "Uncomplicated Firewall, Ubuntu's simplified front end with persistent rules."
   ],
   [
    "nftables",
    "The modern netfilter rule framework managed with nft, replacing iptables and handling IPv4 and IPv6 together."
   ],
   [
    "DROP vs REJECT",
    "DROP silently discards a packet; REJECT discards it and returns an error to the sender."
   ],
   [
    "Chain policy",
    "The default action applied to packets that match no rule in an iptables or nftables chain."
   ]
  ],
  "example": "A new RHEL web server must accept HTTPS from anywhere and PostgreSQL only from the app subnet. You run firewall-cmd --permanent --add-service=https and firewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address=10.0.20.0/24 service name=postgresql accept', then firewall-cmd --reload, and confirm with firewall-cmd --list-all.",
  "mistakes": [
   [
    "Believing `firewall-cmd --add-service=https` is saved because it worked when tested.",
    "Without --permanent the change is runtime only and disappears at reload or reboot. Add --permanent and reload, or use --runtime-to-permanent."
   ],
   [
    "Adding a rule with `--permanent` and expecting it to work immediately.",
    "Permanent changes go to configuration only. Run firewall-cmd --reload to load them into the running firewall."
   ],
   [
    "Running `ufw enable` first and adding the SSH rule afterward on a remote server.",
    "Enabling with a default deny policy can cut off your session. Allow OpenSSH or 22/tcp first, then enable."
   ],
   [
    "Choosing DROP when the requirement is that clients should get an immediate refusal.",
    "DROP silently discards, so clients wait and time out. REJECT returns an error so clients fail fast."
   ]
  ],
  "tryit": [
   [
    "An internal monitoring server on RHEL runs a metrics agent that must accept connections on 9100/tcp only from 10.5.0.0/16, and the change must survive reboots. A colleague already ran a runtime-only rule that opened 9100/tcp to everyone while testing. What do you run?",
    "Add the restricted rule permanently: `firewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address=10.5.0.0/16 port port=9100 protocol=tcp accept'`, then `firewall-cmd --reload`. The reload also discards the colleague's unsaved runtime rule that opened the port to everyone. Verify with `firewall-cmd --list-all`."
   ],
   [
    "On a server managed with plain iptables, you append `iptables -A INPUT -p tcp --dport 443 -j ACCEPT`, but HTTPS still fails. `iptables -L -n --line-numbers` shows rule 3 is `DROP all -- 0.0.0.0/0`. What is happening and how do you fix it?",
    "Rules are matched top to bottom, so the DROP at line 3 catches HTTPS before your appended rule at the bottom. Insert the rule above it, for example `iptables -I INPUT 3 -p tcp --dport 443 -j ACCEPT`, then save the rules so they persist."
   ]
  ],
  "tip": "If a firewalld rule works now but disappears after reboot, it was added without --permanent; if a --permanent rule has no effect yet, the firewall was not reloaded.",
  "check": [
   [
    "How do you permanently open port 8443/tcp in firewalld's default zone and apply it immediately?",
    "firewall-cmd --permanent --add-port=8443/tcp followed by firewall-cmd --reload."
   ],
   [
    "What should you do before running ufw enable on a remote server?",
    "Allow SSH (for example ufw allow OpenSSH or ufw allow 22/tcp) so the connection is not blocked."
   ],
   [
    "Which command shows the full nftables configuration?",
    "nft list ruleset, which prints every table, chain and rule."
   ],
   [
    "Why might an iptables ACCEPT rule appended with -A have no effect?",
    "Rules are evaluated in order, so an earlier rule that drops or rejects the traffic matches first; insert the rule with -I or reorder."
   ],
   [
    "Which firewalld command shows the services, ports and interfaces of the current zone?",
    "firewall-cmd --list-all."
   ]
  ]
 },
 {
  "t": "SSH hardening: key-based auth, ssh-copy-id, sshd_config (PermitRootLogin, PasswordAuthentication)",
  "hook": "Day one at Juniper Ridge Analytics, and Tomas is handed a freshly built cloud VM. Before he has even installed the application, `journalctl -u sshd` scrolls with thousands of lines: 'Failed password for root from ...', one after another, from addresses all over the world. Nobody targeted this company; bots simply knock on every open port 22. His team lead says, 'Lock it down before lunch, and do not lock yourself out, because the console access is broken.' Tomas knows the settings he wants to change. What he is less sure of is the order. Which change, made one step too early, would leave him staring at a dead terminal?",
  "simple": "SSH is the tool administrators use to log in to servers remotely and type commands. By default many servers accept a username and password, and robots on the internet try millions of guesses. Hardening SSH means switching to keys instead. A key pair is like a padlock and its only key: you put the padlock (public key) on the server, and keep the key (private key) on your own computer. The server lets you in only if you can prove you hold the matching key, and the key itself never travels over the network. Once keys work, you turn passwords off, block direct logins as the all-powerful root user, and test everything before closing your current session.",
  "body": [
   "SSH (Secure Shell) is how you administer almost every Linux server, which makes it one of the most attacked services on the internet. Automated bots constantly try common usernames and passwords against any address with port 22 open, and the authentication log of a new public server fills with failures within hours. Hardening SSH means replacing passwords with keys, restricting who can log in and how, and keeping the daemon configuration tight. Because a mistake here can lock you out of a remote machine, the order in which you make changes matters as much as the changes themselves.",
   "Key-based authentication uses a key pair. The private key stays on your workstation, ideally protected by a passphrase; the public key is placed on the server in `~/.ssh/authorized_keys` of the account you log into. During login, the server challenges the client to prove it holds the private key, and the private key itself is never sent over the network. Keys are far harder to guess than passwords and cannot be phished or reused across sites in the same way. Generate a pair with `ssh-keygen -t ed25519` (Ed25519 is the modern default; RSA with a large key size is also common), which creates `~/.ssh/id_ed25519` and `~/.ssh/id_ed25519.pub`. Only the `.pub` file ever leaves your machine; if someone asks you to send them your private key, the answer is no.",
   "Getting the key onto the server is the job of `ssh-copy-id user@server`, which appends your public key to the server's authorized_keys and sets sensible permissions, using your password one last time. Permissions matter: sshd's StrictModes check refuses keys if `~/.ssh`, `authorized_keys` or the home directory is writable by group or others, and the log then mentions bad ownership or modes. Use 700 for `~/.ssh` and 600 for `authorized_keys` and for private keys on the client. `ssh-agent` with `ssh-add` holds a decrypted key in memory so you type the passphrase once per session. Client-side settings such as host aliases, usernames, ports and key files go in `~/.ssh/config`, so `ssh web01` can expand to a full command with the right user, port and identity file.",
   "The server daemon is configured in `/etc/ssh/sshd_config`, and many distributions also read drop-in files from `/etc/ssh/sshd_config.d/`. For most keywords sshd uses the first value it finds, which is why drop-ins included near the top of the main file can override later lines. `PermitRootLogin no` stops direct root logins so admins log in as themselves and use sudo, which improves accountability; `prohibit-password` allows root only with keys and is a common default. `PasswordAuthentication no` disables passwords entirely once keys work, which defeats password brute-force attacks; `KbdInteractiveAuthentication no` closes the related keyboard-interactive path. `PubkeyAuthentication yes` keeps keys enabled.",
   "Several more directives narrow the attack surface. `AllowUsers` or `AllowGroups` restrict logins to named accounts, `MaxAuthTries` limits authentication attempts per connection, `LoginGraceTime` shortens the window an unauthenticated connection may stay open, and `X11Forwarding no` disables a feature most servers do not need. `Match` blocks apply settings only to certain users, groups or addresses. Changing `Port` reduces log noise but is not real security; on SELinux systems a new port also needs `semanage port -a -t ssh_port_t -p tcp <port>`, plus a firewall rule, or sshd will fail to bind or be unreachable.",
   "Apply changes safely. Run `sshd -t` to test the syntax (`sshd -T` prints the effective settings after all files and defaults are merged), then `systemctl reload sshd` (the unit is `ssh` on Debian-family systems). Keep your current session open and test a new login in a second terminal before logging out; existing sessions survive a reload, so if something is wrong you can still fix it. Add complementary controls: fail2ban bans addresses that repeatedly fail authentication by watching logs, firewall rules can restrict SSH to management networks, and MFA (multi-factor authentication) can be added through PAM (Pluggable Authentication Modules). Review `/var/log/secure`, `/var/log/auth.log` or `journalctl -u sshd` for failed logins. Finally, verify server host keys when you first connect; the fingerprint prompt protects you against man-in-the-middle attacks, and `~/.ssh/known_hosts` records keys you have accepted. A sudden 'host key has changed' warning deserves investigation, not a reflexive delete.",
   "Consider a worked example. A new cloud VM shows thousands of failed root password attempts in its authentication log. On your laptop you run `ssh-keygen -t ed25519` and set a passphrase, then `ssh-copy-id admin@vm`. In a second terminal you confirm `ssh admin@vm` logs in without a password prompt and that `sudo -v` works. Only then do you create `/etc/ssh/sshd_config.d/50-hardening.conf` containing `PermitRootLogin no`, `PasswordAuthentication no` and `AllowGroups sshadmins`, run `sshd -t`, confirm with `sshd -T | grep -i passwordauthentication`, and reload the service. A fresh login still works, and the bots now fail immediately because the server no longer offers password authentication at all.",
   "Common mistakes: disabling PasswordAuthentication before confirming key login works, which locks you out; loosening permissions with `chmod 777` on a home directory, which silently breaks key login; editing the file but forgetting to reload sshd; forgetting that a drop-in file or a `Match` block can override the main file, so check with `sshd -T`; copying the private key to the server instead of the public key; and treating a changed port as a security control rather than noise reduction.",
   "Exam questions usually describe a goal or a symptom. 'Prevent brute-force password guessing' points to key-based authentication plus `PasswordAuthentication no`. 'Administrators must be individually accountable' or 'stop direct root login' points to `PermitRootLogin no` with sudo. 'Copy a public key to a server' is `ssh-copy-id`. 'Key login falls back to a password prompt' or 'bad ownership or modes' points to permissions on the home directory, `~/.ssh` or authorized_keys. 'Check configuration before restarting' is `sshd -t`, and 'limit which users can connect' is `AllowUsers` or `AllowGroups`."
  ],
  "analogy": "Key-based login is like a bank vault that keeps a mold of your key's shape (the public key) and asks you to turn your real key in a test lock while it watches. You prove you hold the key without ever handing it over, so nobody at the counter can copy it. Passwords are more like telling the guard a secret word, which can be overheard or guessed. The analogy breaks down slightly with the passphrase: it is a second lock on your own key ring, protecting the private key if your laptop is stolen, and the server never sees it.",
  "terms": [
   [
    "Key-based authentication",
    "Logging in by proving possession of a private key whose public half is listed in the server's authorized_keys file."
   ],
   [
    "ssh-copy-id",
    "A helper that appends your public key to a remote account's authorized_keys and sets correct permissions."
   ],
   [
    "PermitRootLogin",
    "The sshd_config setting that controls whether root may log in directly over SSH (no, prohibit-password or yes)."
   ],
   [
    "PasswordAuthentication",
    "The sshd_config setting that enables or disables password logins; set to no once keys work."
   ],
   [
    "StrictModes",
    "An sshd check that refuses keys when the home directory, ~/.ssh or authorized_keys are writable by other users."
   ],
   [
    "sshd -t",
    "Tests sshd configuration syntax without restarting the daemon; sshd -T prints the effective settings."
   ],
   [
    "known_hosts",
    "The client file recording server host keys you have accepted, used to detect man-in-the-middle attacks."
   ],
   [
    "fail2ban",
    "A tool that watches logs and temporarily bans addresses with repeated authentication failures."
   ]
  ],
  "example": "A new cloud VM shows thousands of failed root password attempts in its auth log. You create a key with ssh-keygen -t ed25519, run ssh-copy-id admin@vm, confirm key login and sudo work in a second terminal, then set PermitRootLogin no and PasswordAuthentication no in a file under /etc/ssh/sshd_config.d/, run sshd -t and reload sshd. The brute-force attempts now fail immediately, and every admin action is logged under a named account.",
  "mistakes": [
   [
    "Setting PasswordAuthentication no first, then copying keys.",
    "Once passwords are off, ssh-copy-id cannot use your password to install the key, and you may be locked out. Install and test keys first, keep a session open, then disable passwords."
   ],
   [
    "Removing or scrambling root's password to 'stop root logging in over SSH'.",
    "The correct control is PermitRootLogin no in sshd_config, which keeps root usable locally and via sudo while blocking direct SSH logins."
   ],
   [
    "Assuming key login fails because the key is wrong, when the log says bad ownership or modes.",
    "StrictModes rejects keys if the home directory, ~/.ssh (700) or authorized_keys (600) is writable by others. Fix permissions and ownership."
   ],
   [
    "Treating a non-standard SSH port as a strong security control.",
    "It only cuts automated log noise. Real protection comes from keys, disabled passwords, AllowGroups, firewall restrictions and fail2ban."
   ]
  ],
  "tryit": [
   [
    "You edited `/etc/ssh/sshd_config` to set `PasswordAuthentication no`, ran `sshd -t` with no errors and reloaded sshd, yet a test shows password logins still work. The server has a directory `/etc/ssh/sshd_config.d/` containing a cloud-image file. What is the likely cause and how do you confirm it?",
    "A drop-in file (for example one setting PasswordAuthentication yes) is included before your line, and sshd uses the first value it reads, so it wins. Run `sshd -T | grep -i passwordauthentication` to see the effective value, then fix or override it in the drop-in directory, test with sshd -t, and reload."
   ],
   [
    "Only members of the `ops` group should be able to SSH into a bastion host, and root must never log in directly. Key logins already work for the ops team. Which settings do you add, and what is your safe procedure?",
    "Add `AllowGroups ops`, `PermitRootLogin no` and `PasswordAuthentication no` (in a drop-in), run `sshd -t`, reload sshd, and test a new login as an ops user in a second terminal while keeping the current session open. Confirm a non-ops account is refused."
   ]
  ],
  "tip": "Order matters in hardening: confirm key-based login works before disabling PasswordAuthentication, and keep an existing session open while testing. 'Stop root logging in directly' is PermitRootLogin no, not removing root's password.",
  "check": [
   [
    "Key login fails and the server log mentions bad ownership or modes. What should you check?",
    "That ~/.ssh is 700, authorized_keys is 600, and the home directory is not writable by group or others, all owned by the user, because StrictModes refuses keys otherwise."
   ],
   [
    "Why is PermitRootLogin no considered good practice?",
    "It removes root as a direct target and forces admins to log in as individuals and elevate with sudo, which is logged and accountable."
   ],
   [
    "Which command checks sshd_config syntax before reloading?",
    "sshd -t, which reports errors without touching the running daemon (sshd -T shows the effective settings)."
   ],
   [
    "What should you verify before setting PasswordAuthentication no on a remote server?",
    "That key-based login works in a separate session, so disabling passwords does not lock you out."
   ],
   [
    "Which file on the server lists the public keys allowed to log in to an account?",
    "~/.ssh/authorized_keys in that account's home directory."
   ]
  ]
 },
 {
  "t": "Privilege escalation: sudo, visudo, /etc/sudoers.d, su, polkit",
  "hook": "At Riverbend Utilities, the web operations team keeps asking Dev, the senior admin, for the root password so they can restart nginx after deployments. Five people already know it, and last month nobody could say who had stopped the database at 3 a.m., because every log line simply said 'root'. Dev wants each person to restart nginx themselves, with their own name in the logs, and nothing more. He also remembers the time a colleague saved a typo into `/etc/sudoers` with a regular editor and no one on the team could use sudo afterward. How does he grant exactly one power, safely, without handing over the keys to everything?",
  "simple": "On Linux, the root account can do anything, which makes it dangerous to use all day. Instead, people log in with normal accounts and borrow extra power only for specific tasks. `su` lets you become another user, usually root, but you must know that user's password, like borrowing someone's house keys. `sudo` is more like a building manager who checks a list: 'Alice may unlock the boiler room, nothing else.' You use your own password, and every request is written in a logbook under your name. The list lives in the sudoers file, which you edit with a careful tool called `visudo` so a typo cannot break it. polkit is a similar permission checker that desktop and system tools use behind the scenes.",
  "body": [
   "Logging in as root for daily work is risky: every typo runs with full power, and actions are not tied to a person. Instead, administrators use normal accounts and elevate privileges only when needed, following the principle of least privilege, which says each person or process should have only the access its task requires. Linux+ tests the tools for this and calls it privilege escalation. In security reports the same phrase also describes an attacker gaining more rights than intended, often by abusing a badly written sudo rule, so the two meanings are closely linked: every rule you write is either a controlled path to privilege or an accidental one.",
   "`su` (substitute user) switches to another account, root by default, and asks for the target account's password. `su -` (or `su -l`) starts a full login shell with the target's environment, home directory and PATH, which is usually what you want; plain `su` keeps much of your current environment, which can lead to confusing results when commands resolve differently. `su - alice` becomes alice, and `su -c 'command'` runs one command and returns. The drawbacks are that everyone who needs root must know the root password, password changes must be shared with everyone, and actions are logged as root rather than as the person who ran them.",
   "`sudo` lets permitted users run commands as root, or as another user, using their own password, and it logs each command. `sudo command` runs one command, `sudo -i` opens a root login shell, `sudo -u postgres psql` runs a command as another user, `sudo -l` lists what you are allowed to run, and `sudo -k` forgets cached credentials, which are otherwise remembered for a short time after a successful prompt so you are not asked repeatedly. Commands appear in the authentication log (`/var/log/secure` or `/var/log/auth.log`) or the journal under the caller's name, along with the working directory and the exact command line, which is exactly the accountability that shared root passwords lack.",
   "Rules live in `/etc/sudoers`, and you should edit it only with `visudo`, which locks the file against simultaneous edits and checks syntax before saving; a broken sudoers file can lock every admin out of sudo. The rule format is `who where=(as_whom) what`: `alice ALL=(ALL) ALL` lets alice run anything as anyone on any host. A `%` means a group: `%wheel ALL=(ALL) ALL` on RHEL-family systems and `%sudo ALL=(ALL:ALL) ALL` on Debian-family systems give members full rights, which is why adding a user to wheel or sudo makes them an administrator. The `NOPASSWD:` tag skips the password prompt, which is convenient for automation but weakens security. Least privilege means granting specific commands with full paths: `%webops ALL=(root) /usr/bin/systemctl restart nginx`. Aliases such as `User_Alias`, `Host_Alias` and `Cmnd_Alias` keep large policies readable.",
   "Rather than editing the main file, drop separate files into `/etc/sudoers.d/`, which the main file includes, and edit each with `visudo -f /etc/sudoers.d/webops`. Check everything with `visudo -c`. This keeps changes modular and friendly to configuration management tools, because each team or application gets its own file. Files there are ignored if their names contain a dot or end with `~`, and they should be mode 0440. Be careful which commands you grant: allowing an editor, a pager, a shell, or tools like `find`, `tar` or `less` can let a user break out to a full root shell, because those programs can launch other commands. A writable script called via sudo lets whoever can edit it run anything, and wildcards in command arguments can match far more than intended.",
   "polkit (formerly PolicyKit) is a separate framework that authorizes unprivileged processes to perform specific privileged actions through system services. It is what decides whether a desktop user may manage network connections or mount a disk, and what prompts for admin authentication when an ordinary user runs `systemctl restart` or `timedatectl set-time`. Rules are JavaScript files in `/etc/polkit-1/rules.d/`, and `pkexec` runs a program as another user under polkit control, much as sudo does under sudoers. Keep polkit patched, since serious vulnerabilities have been found in it over the years.",
   "Consider a worked example. The web operations team needs to restart nginx but must not have full root. You run `visudo -f /etc/sudoers.d/webops` and add `%webops ALL=(root) /usr/bin/systemctl restart nginx, /usr/bin/systemctl reload nginx`. `visudo` accepts the syntax, and you confirm the file is mode 0440 with `ls -l`. A team member runs `sudo -l` and sees exactly those two commands. When she tries `sudo systemctl stop sshd`, sudo refuses with a message that she is not allowed to run it and logs the attempt, while her permitted restarts appear in the journal under her own name.",
   "Common mistakes: editing `/etc/sudoers` with a normal editor and saving a syntax error; naming a drop-in file `webops.conf`, which sudo silently ignores because of the dot; granting `ALL` when a short command list would do; granting editors or shells that allow escape to root; using relative command paths; confusing `su -` (target password) with `sudo -i` (your password); and adding users to wheel or sudo casually without realizing it makes them full administrators.",
   "Exam questions often give a requirement and ask for the tool. 'Safely edit sudoers' is `visudo`, and 'add a rule without touching the main file' is `/etc/sudoers.d/` with `visudo -f`. 'See which commands you may run' is `sudo -l`. 'Switch to root with a full login environment' is `su -` or `sudo -i`. 'Users must not know the root password' and 'actions must be logged per user' point to sudo over su. 'A desktop application asks for admin authentication to change a system setting' points to polkit."
  ],
  "analogy": "su is like borrowing the master key to the whole building: you need the owner to tell you the key's code, and the door log only ever shows 'master key used'. sudo is a front desk with a list: you show your own badge, the clerk checks whether your name is allowed to open that particular door, opens it for you and writes your name in the ledger. visudo is the clerk who refuses to file a list with a typo in it. The analogy stops at shell escapes: if the list lets you take a tool into the room that can open other doors, the list is effectively 'everything'.",
  "terms": [
   [
    "sudo",
    "Runs a command as root or another user after checking sudoers rules, using the caller's own password and logging the command."
   ],
   [
    "visudo",
    "Edits sudoers files with locking and syntax checking so a mistake cannot break sudo."
   ],
   [
    "/etc/sudoers.d",
    "A directory of drop-in sudoers files, each edited with visudo -f and ignored if the name contains a dot or ends in ~."
   ],
   [
    "su -",
    "Switches to another user, root by default, with a full login environment, using the target account's password."
   ],
   [
    "wheel / sudo group",
    "Groups granted full sudo rights on RHEL-family and Debian-family systems respectively."
   ],
   [
    "NOPASSWD",
    "A sudoers tag that lets a rule run without a password prompt, useful for automation but weaker."
   ],
   [
    "polkit",
    "A framework that authorizes unprivileged processes to perform specific privileged actions through system services, using rules in /etc/polkit-1/rules.d/."
   ],
   [
    "Least privilege",
    "Granting each user or process only the access its task requires."
   ]
  ],
  "example": "The web operations team needs to restart nginx but should not have full root. You run visudo -f /etc/sudoers.d/webops and add %webops ALL=(root) /usr/bin/systemctl restart nginx, /usr/bin/systemctl reload nginx. A team member runs sudo -l to confirm the allowed commands, a blocked attempt to stop sshd is refused and logged, and each permitted restart appears in the logs under her own name.",
  "mistakes": [
   [
    "Thinking `sudo -i` asks for the root password like `su -`.",
    "sudo always asks for the caller's own password (unless NOPASSWD), and is allowed only if sudoers permits it. su - asks for the target account's password."
   ],
   [
    "Naming a drop-in `/etc/sudoers.d/webops.conf` and wondering why it has no effect.",
    "sudo ignores files in sudoers.d whose names contain a dot or end in ~. Name it webops and validate with visudo -c."
   ],
   [
    "Granting `sudo vim /etc/nginx/nginx.conf` as a 'safe, narrow' rule.",
    "Editors, pagers and many utilities can spawn a shell running as root. Use sudoedit for file editing, or grant a specific non-interactive command."
   ],
   [
    "Adding a contractor to the wheel group so they can restart one service.",
    "On RHEL-family systems wheel usually grants full sudo rights. Write a specific rule in sudoers.d instead."
   ]
  ],
  "tryit": [
   [
    "A backup script running as user `backup` must run `/usr/bin/rsync` as root from cron, with no one present to type a password. Security wants nothing else allowed. How do you write the rule, and what is the main risk to watch?",
    "Create `/etc/sudoers.d/backup` with `visudo -f` containing `backup ALL=(root) NOPASSWD: /usr/bin/rsync` (ideally with fixed arguments). NOPASSWD is justified because cron cannot answer a prompt. The risk is that rsync options can be abused to write arbitrary files as root, so restrict arguments where possible, protect the backup account's credentials, and keep the file mode 0440."
   ],
   [
    "A junior admin says, 'I added myself to sudoers by editing the file in nano, and now sudo prints a parse error for everyone.' You still have a root console session. What do you do, and how do you prevent it next time?",
    "From the root session, run `visudo` (or `visudo -c` to locate the error), fix the syntax and save; visudo will refuse to save until it is valid. Going forward, require visudo or visudo -f for every change and prefer drop-in files so a mistake affects one small file."
   ]
  ],
  "tip": "Always choose visudo (or visudo -f for a drop-in) over editing sudoers with a normal editor, and remember that % in sudoers means a group. su needs the target's password; sudo needs your own.",
  "check": [
   [
    "What is the difference between su - and sudo -i?",
    "su - requires the target (root) password; sudo -i uses the caller's own password, is permitted by sudoers rules and is logged under the caller's name."
   ],
   [
    "What does %wheel ALL=(ALL) ALL mean?",
    "Members of the wheel group may run any command as any user on any host."
   ],
   [
    "Why is granting sudo access to vim risky?",
    "An editor can spawn a shell, so a user could escape to a full root shell rather than just editing files."
   ],
   [
    "A new file /etc/sudoers.d/ops.conf has no effect. Why?",
    "sudo ignores files in sudoers.d whose names contain a dot; rename it to ops and check it with visudo -c."
   ],
   [
    "Which command shows a user which sudo commands they are allowed to run?",
    "sudo -l."
   ]
  ]
 },
 {
  "t": "Authentication: PAM modules (pam_faillock, pam_pwquality), LDAP/SSSD, Kerberos, MFA",
  "hook": "Monday, 8:05 a.m., at Silver Pine Insurance. Three tickets arrive at once. Jordan Lee cannot log in to the claims server and swears she typed her password correctly. On another host, `id rbanks` replies 'no such user' even though Rachel Banks has worked there for years and her account lives in the company directory. And a third server rejects every Kerberos login with a message about clock skew. You are on the help desk rotation. Each ticket looks like a different mystery, but they all run through the same few layers of Linux authentication. Which layer is failing in each case, and what is the safe fix?",
  "simple": "When you log in, Linux has to answer one question: are you really who you say you are? Instead of every program checking passwords its own way, they all hand the job to PAM, a set of plug-in checkers. One plug-in can lock your account after too many wrong guesses, another can insist that new passwords are long enough. In big organizations, user accounts are stored in one central phone book (a directory reached through LDAP), and a helper called SSSD looks people up there and remembers them if the network drops. Kerberos is like a festival wristband: you prove yourself once and then show the band at each tent. MFA means needing two different kinds of proof, such as a password plus a code from your phone.",
  "body": [
   "Authentication proves who a user is. On Linux, programs such as login, sshd and sudo do not implement password checks themselves; they delegate to PAM (Pluggable Authentication Modules). PAM lets administrators change how authentication works, add password rules or plug in a directory service without modifying or recompiling each program. Understanding PAM stacks, the common modules and how central directories fit in explains most of the login behavior you will troubleshoot, from lockouts to 'no such user' errors.",
   "Each PAM-aware service has a file in `/etc/pam.d/`, such as `sshd` or `sudo`, often including shared files like `system-auth` and `password-auth` (RHEL family) or `common-auth` and `common-password` (Debian family). Each line has a type, a control flag and a module, plus optional arguments. The four types are `auth`, which verifies identity; `account`, which checks whether the account may log in now (expired, locked, outside allowed hours); `password`, which handles password changes; and `session`, which sets up or tears down the session, such as mounting a home directory or applying limits. Control flags decide how results combine. `required` must succeed but the stack keeps running, so the user does not learn which module failed. `requisite` must succeed and fails immediately if not. `sufficient` ends the stack with success if it passes and nothing required failed earlier. `optional` rarely affects the outcome. On RHEL-family systems, use `authselect` rather than editing the shared files by hand, because it regenerates them and would overwrite manual edits.",
   "Two modules appear constantly on the exam. `pam_pwquality` enforces password strength when passwords change. Settings in `/etc/security/pwquality.conf` include `minlen` (minimum length), `minclass` (number of different character classes required), credits such as `dcredit` and `ucredit` for digits and uppercase letters, and `dictcheck` to reject dictionary words. `pam_faillock` locks an account after repeated failed logins, a defense against brute-force guessing. It is configured in `/etc/security/faillock.conf` with `deny` (failures allowed before locking), `unlock_time` (seconds until automatic unlock) and `fail_interval` (the window in which failures are counted). `faillock --user alice` shows her recorded failures, with times and sources, and `faillock --user alice --reset` unlocks her. Older systems used `pam_tally2` for the same purpose. Other modules include `pam_limits` (resource limits from `/etc/security/limits.conf`) and `pam_access` (who may log in from where).",
   "In organizations, accounts usually live centrally. LDAP (Lightweight Directory Access Protocol) is the protocol for directory services that store users and groups, such as OpenLDAP, 389 Directory Server, FreeIPA and Microsoft Active Directory. Use LDAPS or StartTLS so credentials are encrypted in transit. SSSD (System Security Services Daemon) connects Linux to these directories: it retrieves identities, authenticates users, caches credentials so logins keep working when the directory is unreachable, and integrates with PAM and with nsswitch, the name service switch, through a line such as `passwd: files sss` in `/etc/nsswitch.conf`. Configuration lives in `/etc/sssd/sssd.conf`, which must be owned by root and mode 600, or SSSD refuses to start. `realm join` can join a domain and configure SSSD in one step, and `getent passwd user` or `id user` confirms that directory users resolve.",
   "Kerberos provides single sign-on with tickets instead of sending passwords to every service. A user authenticates to the KDC (Key Distribution Center) and receives a TGT (ticket-granting ticket), then presents it to request service tickets for individual services such as file shares or SSH. `kinit` obtains a ticket, `klist` lists tickets and their expiry times, `kdestroy` removes them, and `/etc/krb5.conf` defines realms and KDCs. Kerberos is sensitive to clock differences because tickets carry timestamps, so time synchronization with chrony or another NTP (Network Time Protocol) client is essential.",
   "MFA (multi-factor authentication) requires two or more different factor types: something you know (a password), something you have (a phone app or hardware key) and something you are (a fingerprint). Two passwords are still one factor. On Linux, MFA is usually added through a PAM module that checks TOTP (time-based one-time password) codes or hardware security keys, or through the SSH setting `AuthenticationMethods publickey,keyboard-interactive`, which requires both a key and a code. Like Kerberos, TOTP depends on accurate clocks, because the code is derived from the current time.",
   "Consider a worked example. A user reports she cannot log in after a weekend. `faillock --user jlee` shows ten failures from an unknown IP address overnight, which pam_faillock correctly blocked. You confirm her identity through the help desk process, run `faillock --user jlee --reset`, have her change her password (which pam_pwquality checks against the policy), and pass the source address to the security team. Separately, a directory user on another host shows `id: no such user`; `systemctl status sssd` reveals the daemon failed because someone made `sssd.conf` world-readable, and fixing the mode to 600 and restarting SSSD restores lookups. On a third host, `chronyc tracking` shows the clock is minutes off, which explains the Kerberos clock skew errors.",
   "Common mistakes: hand-editing files that authselect manages, so changes vanish; confusing `required` and `requisite`; unlocking an account without asking why it locked; leaving `sssd.conf` with loose permissions, which stops SSSD from starting; using plain LDAP without TLS; forgetting that Kerberos and TOTP both fail when clocks drift; and assuming pam_pwquality affects existing passwords, when it only checks new ones.",
   "Exam wording gives strong clues. 'Lock accounts after failed attempts' is pam_faillock, and 'enforce password length or complexity' is pam_pwquality. 'Is the account expired or allowed now' is the `account` type. 'Linux clients authenticate against Active Directory and cache credentials' points to SSSD. 'Tickets', 'KDC', 'TGT' or 'single sign-on' point to Kerberos, and 'clock skew too great' points to time sync. 'Something you have plus something you know' is MFA."
  ],
  "analogy": "A PAM stack is like airport security with several checkpoints in a row. The `auth` desk checks your passport, `account` checks that your ticket is valid for today, `password` is the counter where you renew documents, and `session` is the gate that sets you up for boarding. A `requisite` checkpoint turns you away on the spot; a `required` one marks your file and lets you walk to the end before refusing you, so you cannot tell which desk said no. The analogy stops at `sufficient`, which is like a fast-track pass that can wave you straight through, but only if nobody earlier flagged you.",
  "mnemonic": "The four PAM types in the order they are usually met during a login and password change: 'Always Ask Permission Sincerely', for auth, account, password, session.",
  "terms": [
   [
    "PAM",
    "Pluggable Authentication Modules, the framework through which Linux programs delegate authentication, account checks, password changes and session setup."
   ],
   [
    "Control flag",
    "The PAM keyword (required, requisite, sufficient, optional) that decides how a module's result affects the stack."
   ],
   [
    "pam_faillock",
    "A PAM module that locks an account after a set number of failed logins; managed with the faillock command."
   ],
   [
    "pam_pwquality",
    "A PAM module that enforces password strength rules from /etc/security/pwquality.conf when passwords change."
   ],
   [
    "SSSD",
    "The System Security Services Daemon, which connects Linux to LDAP, FreeIPA or Active Directory and caches identities and credentials."
   ],
   [
    "Kerberos TGT",
    "A ticket-granting ticket issued by the KDC after login, used to obtain service tickets without re-entering a password."
   ],
   [
    "MFA",
    "Multi-factor authentication, requiring two or more different factor types such as a password and a TOTP code."
   ],
   [
    "authselect",
    "The RHEL-family tool that generates and manages the shared PAM and nsswitch configuration files."
   ]
  ],
  "example": "A user reports that she cannot log in after a weekend. faillock --user jlee shows ten failures from an unknown IP address overnight, which pam_faillock correctly blocked. You confirm her identity, reset with faillock --user jlee --reset, have her change her password, and pass the source IP to the security team so it can be blocked and investigated.",
  "mistakes": [
   [
    "Choosing pam_pwquality when the requirement is to lock accounts after repeated failures.",
    "pam_pwquality checks the strength of new passwords. Lockout after failures is pam_faillock, managed with the faillock command."
   ],
   [
    "Thinking `required` and `requisite` behave the same.",
    "Both must succeed, but requisite fails immediately, while required records the failure and lets the rest of the stack run before denying access."
   ],
   [
    "Calling a password plus a security question 'multi-factor'.",
    "Both are something you know, so it is a single factor. MFA needs different types, such as a password plus a TOTP code or hardware key."
   ],
   [
    "Editing /etc/pam.d/system-auth directly on a RHEL system and expecting the change to last.",
    "authselect regenerates those files and will overwrite manual edits. Use authselect profiles and features instead."
   ]
  ],
  "tryit": [
   [
    "After joining a RHEL server to Active Directory, domain users can log in on Monday, but on Tuesday morning the network link to the domain controllers is down and some users still log in while others cannot. What explains the difference, and which component is responsible?",
    "SSSD caches identities and credentials. Users who logged in recently have cached credentials and can still authenticate offline; users who never logged in to that server have nothing cached and fail. Check `systemctl status sssd` and the SSSD logs, and restore connectivity to the domain controllers."
   ],
   [
    "Policy says accounts must lock after five failed logins within 15 minutes and unlock automatically after 20 minutes, and new passwords must be at least 14 characters. Which modules and files do you configure?",
    "pam_faillock in /etc/security/faillock.conf with deny=5, fail_interval=900 and unlock_time=1200; and pam_pwquality in /etc/security/pwquality.conf with minlen=14. On RHEL-family systems, enable faillock through authselect (for example its with-faillock feature) rather than hand-editing the PAM files."
   ]
  ],
  "tip": "Remember the PAM control flags: requisite fails immediately, required fails at the end of the stack, and sufficient can end the stack early with success. Lockouts are pam_faillock; complexity is pam_pwquality.",
  "check": [
   [
    "Which PAM module type checks whether an account is expired or allowed to log in right now?",
    "account, which runs after identity is verified by the auth type."
   ],
   [
    "How do you unlock a user locked by pam_faillock?",
    "faillock --user <name> --reset, ideally after checking why the failures happened."
   ],
   [
    "What does SSSD add beyond basic LDAP lookups?",
    "It integrates identity and authentication with PAM and nsswitch, supports Kerberos and Active Directory, and caches credentials for offline logins."
   ],
   [
    "Why can Kerberos logins fail on a host whose clock is ten minutes off?",
    "Kerberos tickets carry timestamps, and the KDC rejects requests when clocks differ by more than the allowed skew, typically about five minutes."
   ],
   [
    "Which command obtains a Kerberos ticket, and which lists current tickets?",
    "kinit obtains a ticket; klist lists tickets and their expiry times."
   ]
  ]
 },
 {
  "t": "Cryptography: hashing (sha256sum), GPG signatures, TLS certificates, LUKS disk encryption",
  "hook": "At Copperfield Health, Aisha is about to install a new operating system image on twenty servers. She downloaded the ISO and the checksum file from the same mirror, and the checksum matches. Her manager asks one question: 'How do you know the mirror itself was not tampered with?' Meanwhile, the web team's certificate expires on Friday, someone has emailed a private key file to a vendor 'so they can make the certificate', and a field laptop holding patient records goes missing from a car. Four very different worries, all answered by cryptography. Which tool proves what, and which of those situations is already a problem?",
  "simple": "Cryptography gives you three useful promises. Integrity means nothing was changed: a hash is like a fingerprint of a file, and if one letter changes, the fingerprint changes completely. Authenticity means it came from who you think: a digital signature is like a wax seal that only the sender's private stamp can make, but anyone can check. Confidentiality means only the right people can read it: encryption scrambles data so it is useless without the key. TLS protects data while it travels across a network, like a sealed armored truck. LUKS protects data sitting on a disk, like a safe, so a stolen laptop reveals nothing. Each tool keeps a different promise, and picking the right one is half the battle.",
  "body": [
   "Cryptography gives Linux administrators three practical guarantees: integrity (the data was not changed), authenticity (it came from who you think) and confidentiality (only authorized parties can read it). Linux+ focuses on everyday tools that provide them: hashes for integrity, signatures for authenticity, TLS for data in transit and LUKS for data at rest. Knowing which tool gives which guarantee answers many exam questions on its own, and it also prevents a common real-world error, which is assuming one control provides a guarantee it does not.",
   "A hash function turns any input into a fixed-length digest. The same input always gives the same digest, and any change, even one bit, gives a completely different one. Hashes are one-way: you cannot recover the input from the digest, and unlike encryption there is no key to reverse it. `sha256sum file.iso` prints the SHA-256 digest; compare it with the value the publisher lists. `sha256sum -c SHA256SUMS` checks every file listed in a checksum file and prints OK or FAILED for each, and `--ignore-missing` skips listed files you did not download. MD5 and SHA-1 are considered broken for security because collisions (two inputs with the same digest) can be produced, though you may still see them used as simple corruption checks. A hash only proves integrity if you got the expected value from a trusted source; if an attacker controls the website, they can replace both the file and its checksum.",
   "GPG (GNU Privacy Guard) adds authenticity with public-key signatures. A publisher signs a file or checksum list with their private key; anyone with the matching public key can verify it, and nobody without the private key can forge it. `gpg --import key.asc` imports a key, `gpg --fingerprint` shows its fingerprint, `gpg --verify file.sig file` checks a detached signature, `gpg --detach-sign file` creates one, and `gpg --encrypt -r recipient` and `gpg --decrypt` handle file encryption. Package managers use the same idea: dnf and apt verify repository signatures with imported keys, so a tampered package is rejected. Always verify a key's fingerprint through a trusted channel before trusting it, because a signature from an attacker's key is still a valid signature, just from the wrong person.",
   "TLS (Transport Layer Security) encrypts network connections such as HTTPS. The server presents an X.509 certificate that binds its public key to its name and is signed by a CA (certificate authority). Clients trust the certificate if it chains to a root CA in their trust store, the name they connected to matches an entry in the SAN (Subject Alternative Name), and it is within its validity dates and not revoked. To obtain one, `openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr` creates a private key and a CSR (certificate signing request); only the CSR goes to the CA. `openssl x509 -in cert.pem -noout -text` shows details such as issuer, SAN entries and validity dates (`-noout -dates` shows just the dates), and `openssl s_client -connect host:443` tests a live server and shows the chain it presents.",
   "Certificates also need care after they are issued. Self-signed certificates are fine for labs but trigger warnings elsewhere, because no trusted CA vouches for them. Internal CA certificates are added to the system trust store and activated with `update-ca-trust` (RHEL family) or `update-ca-certificates` (Debian family). Keep private keys readable only by the service account and root, typically mode 600 or 640 with a dedicated group, and never email or paste them anywhere. A key that has been exposed must be treated as compromised: generate a new key, request a new certificate and revoke the old one.",
   "LUKS (Linux Unified Key Setup) encrypts entire block devices, protecting data at rest if a disk or laptop is stolen. `cryptsetup luksFormat /dev/sdb1` initializes encryption and destroys existing data, `cryptsetup open /dev/sdb1 securedata` unlocks it as `/dev/mapper/securedata`, you then create a filesystem on that mapper device and mount it, and `cryptsetup close securedata` locks it again after unmounting. LUKS supports multiple key slots, so you can add a recovery passphrase with `cryptsetup luksAddKey` and inspect slots with `cryptsetup luksDump`. `/etc/crypttab` lists devices to unlock at boot, and the initramfs handles an encrypted root filesystem. Back up the header with `cryptsetup luksHeaderBackup`, since a damaged header makes the data unrecoverable even with the right passphrase. LUKS does not protect data on a running, unlocked system: once the volume is open, a network attacker sees plain files like anyone else.",
   "Consider a worked example. Before installing a downloaded ISO, you import the distribution's signing key and compare its fingerprint with one published through a separate trusted channel. You run `gpg --verify SHA256SUMS.sig SHA256SUMS`, which reports a good signature, then `sha256sum -c SHA256SUMS --ignore-missing`, which reports the ISO as OK. Both checks passing means the image is authentic and uncorrupted. Later, a laptop that will hold customer data gets a LUKS-encrypted data partition with a second key slot holding a recovery passphrase stored in the company vault, and you save a header backup offline.",
   "Common mistakes: treating a checksum from the same website as proof of authenticity; confusing hashing (one-way) with encryption (reversible with a key); sending the private key to a CA instead of a CSR; forgetting the SAN when a certificate's name does not match; running `luksFormat` on a device that holds data; assuming LUKS protects a mounted, running server from a network attacker; and making private key files world-readable.",
   "Exam wording maps to guarantees. 'Verify a download was not corrupted' is a hash such as `sha256sum`. 'Verify who published it' is a GPG signature. 'Encrypt data in transit' or 'HTTPS certificate' is TLS, and 'request a certificate from a CA' is a CSR. 'Protect data if a laptop is stolen' or 'encrypt a whole partition' is LUKS with `cryptsetup`. 'Certificate not trusted' points to the chain or trust store, while 'certificate expired' may be a real expiry or a wrong clock."
  ],
  "analogy": "Imagine mailing a document. A hash is a photo of each page you send separately: the recipient can see whether anything changed, but if a thief swaps both the document and the photo, nobody can tell. A GPG signature is a wax seal pressed with your personal ring: anyone with a picture of your ring can check it, and only you can make it. TLS is the armored courier van, protecting the trip. LUKS is the locked filing cabinet at the destination. The analogy stops at the cabinet: once you unlock it to work, anyone standing in the room can read the files.",
  "terms": [
   [
    "Hash",
    "A fixed-length, one-way digest of data that changes completely if the data changes; used to check integrity."
   ],
   [
    "GPG signature",
    "A value made with a private key that anyone with the matching public key can verify, proving integrity and authenticity."
   ],
   [
    "X.509 certificate",
    "A CA-signed document binding a public key to a name, used by TLS servers."
   ],
   [
    "CSR",
    "A certificate signing request containing a public key and identity details, sent to a CA to be signed."
   ],
   [
    "SAN",
    "Subject Alternative Name, the certificate field listing the host names the certificate is valid for."
   ],
   [
    "LUKS",
    "Linux Unified Key Setup, the standard format for full block-device encryption managed with cryptsetup."
   ],
   [
    "Key slot",
    "One of several LUKS entries that can each unlock the same volume with a different passphrase or key file."
   ],
   [
    "Trust store",
    "The set of root CA certificates a system trusts, updated with update-ca-trust or update-ca-certificates."
   ]
  ],
  "example": "Before installing a downloaded ISO, you import the distribution's signing key, verify its fingerprint against the one published through a separate trusted channel, run gpg --verify SHA256SUMS.sig SHA256SUMS, and then sha256sum -c SHA256SUMS --ignore-missing. Both checks pass, so you know the image is authentic and uncorrupted before it goes anywhere near your servers.",
  "mistakes": [
   [
    "Believing a matching SHA-256 checksum from the download site proves the file is genuine.",
    "It proves the file matches that checksum. If the site is compromised, both can be replaced. A GPG signature from a verified key proves authenticity."
   ],
   [
    "Calling hashing a form of encryption.",
    "Encryption is reversible with a key; a hash is one-way with no key. Hashes give integrity, not confidentiality."
   ],
   [
    "Sending the private key to the CA to 'get a certificate made'.",
    "You send a CSR, which contains only the public key and identity details. The private key never leaves the server; if it does, treat it as compromised."
   ],
   [
    "Assuming LUKS protects a running web server from remote attackers.",
    "LUKS protects data at rest. Once unlocked and mounted, files are readable to any process with permission, so you still need patching, permissions and MAC."
   ]
  ],
  "tryit": [
   [
    "Users report a browser warning for `portal.example.internal`. `openssl x509 -in portal.pem -noout -text` shows the certificate is valid for another three months, issued by your internal CA, with SAN entries `portal.example.com` and `intranet.example.com`. What is wrong and what do you do?",
    "The name users connect to is not in the SAN, so the name check fails even though dates and issuer are fine. Generate a new CSR that includes `portal.example.internal` as a SAN, have the internal CA sign it, install it, and confirm with `openssl s_client -connect portal.example.internal:443`."
   ],
   [
    "A contractor's laptop with a LUKS-encrypted data partition comes back from repair, and the contractor has forgotten the passphrase. IT had added a second passphrase in another key slot and stored it in the company vault. What happens, and what should IT do next?",
    "IT unlocks the volume with the recovery passphrase from the vault (`cryptsetup open`), since any valid key slot unlocks the volume. Then they set a new user passphrase with `cryptsetup luksAddKey`, remove the forgotten one if appropriate with `luksRemoveKey` or `luksKillSlot`, and confirm the header backup is current."
   ]
  ],
  "tip": "A checksum proves integrity only; a signature proves integrity and authenticity. Encryption (LUKS for data at rest, TLS for data in transit) is what provides confidentiality.",
  "check": [
   [
    "Why is verifying a GPG signature stronger than comparing a SHA-256 checksum from the same website?",
    "If the site is compromised, an attacker can change both file and checksum, but cannot forge a valid signature without the publisher's private key."
   ],
   [
    "Which openssl command shows a certificate's expiration date and SAN entries?",
    "openssl x509 -in cert.pem -noout -text (or -noout -dates for just the dates)."
   ],
   [
    "Which command unlocks a LUKS device so it can be mounted?",
    "cryptsetup open <device> <name>, which creates /dev/mapper/<name>."
   ],
   [
    "What do you send to a certificate authority to obtain a certificate?",
    "A CSR created with openssl req, never the private key, which stays on the server."
   ],
   [
    "Why should you back up a LUKS header?",
    "If the header is damaged, the volume cannot be unlocked even with the correct passphrase; cryptsetup luksHeaderBackup saves a copy."
   ]
  ]
 },
 {
  "t": "OS hardening: disabling unused services, secure boot, patching, file integrity (AIDE)",
  "hook": "An auditor from the state regulator sits across from Nora, the Linux lead at Granite Ridge Savings, and slides a checklist over. 'For your mail relay: which network services are listening and why? Can unsigned code run before the kernel loads? When were security patches last applied, and did the kernel update actually take effect? If someone replaced a binary in /usr/bin last night, how would you know?' Nora has good answers for two of the four. The audit report is due Friday. What does a defensible hardening baseline look like, and how does she prove each layer is really in place?",
  "simple": "Hardening a computer is like securing a house before you move in. First you lock or brick up doors you never use: on a server, those doors are network services, so you turn off and remove anything the server does not need. Secure Boot is like checking the ID of everyone who enters before the house even wakes up, so only trusted startup software runs. Patching is fixing broken locks as soon as the manufacturer announces a flaw. File integrity monitoring, with a tool called AIDE, is like photographing every room and comparing tomorrow's photos to today's, so you notice if something was moved. No single step stops every burglar, so you do all of them together.",
  "body": [
   "Hardening means reducing a system's attack surface: removing what is not needed, locking down what remains, keeping software current and watching for unauthorized change. No single control stops every attack, so hardening layers several independent defenses, an approach called defense in depth. If an attacker gets past one layer, such as an unpatched service, another layer, such as file integrity monitoring, should still notice. The four areas in this lesson, services, boot integrity, patching and file integrity monitoring, are the core of most hardening checklists and of the questions an auditor will ask.",
   "Start with services. Every listening network service is a possible entry point, so run only what the server's role requires. `ss -tulpn` lists listening TCP and UDP ports with the owning process, for example a line showing `LISTEN 0.0.0.0:631` owned by `cupsd`, which a server rarely needs. `systemctl list-unit-files --state=enabled` shows what starts at boot. For anything unnecessary, `systemctl disable --now name` stops it and prevents it starting at boot, and `systemctl mask name` links the unit to `/dev/null` so it cannot be started even manually or as a dependency of another unit. Better still, remove unneeded packages with dnf or apt so there is nothing left to patch or misconfigure. Replace legacy cleartext protocols such as Telnet, rsh and plain FTP with SSH and SFTP, because cleartext protocols expose credentials to anyone watching the network. Minimal installation images make this easier from the start.",
   "Secure Boot is a UEFI (Unified Extensible Firmware Interface) feature that verifies digital signatures on boot components so only trusted code runs before the operating system. Most distributions use a small signed shim loader that then verifies GRUB and the kernel, and the kernel can in turn require signed modules. This chain defends against bootkits and rootkits that tamper with early boot, where they would otherwise be invisible to tools running inside the operating system. `mokutil --sb-state` shows whether Secure Boot is enabled. Third-party kernel modules, such as some drivers, must be signed with a key enrolled as a MOK (Machine Owner Key) or they will not load. Protect firmware settings and GRUB with passwords so someone at the console cannot easily disable Secure Boot or change boot parameters to boot into a root shell.",
   "Patching fixes known vulnerabilities, and unpatched software is one of the most common ways systems are compromised. Apply updates regularly with `dnf upgrade` or `apt update && apt upgrade`, prioritizing security updates: on RHEL-family systems `dnf updateinfo list --security` shows pending security advisories and `dnf upgrade --security` applies only those. Automate where appropriate with dnf-automatic or unattended-upgrades. Kernel updates need a reboot to take effect unless you use a live patching service, and `needs-restarting -r` (RHEL family) or the file `/var/run/reboot-required` (Debian family) tells you when one is due; `uname -r` confirms which kernel is actually running. Long-running services also keep using old library versions in memory until they restart. Test updates on non-production systems first, schedule maintenance windows and keep a rollback plan, such as snapshots or `dnf history undo`.",
   "File integrity monitoring detects unauthorized changes to important files, a common sign of intrusion, because attackers often replace binaries or edit configuration to keep access. AIDE (Advanced Intrusion Detection Environment) builds a database of file attributes and hashes, such as permissions, ownership, size, timestamps and checksums, then compares later scans against it. Configuration is in `/etc/aide.conf` or `/etc/aide/aide.conf`, where rules choose which directories to watch and which attributes to check. Typical use: `aide --init` creates a new database, you move it into place as the reference (for example renaming `aide.db.new.gz` to `aide.db.gz`), then `aide --check` reports added, removed and changed files, usually from a daily timer or cron job that mails or logs the report. After legitimate changes such as patching, run `aide --update` and replace the database. Keep a copy offline or on read-only media, since an attacker with root could otherwise alter the database to hide changes.",
   "Hardening goes beyond these four areas, and exam questions sometimes list the extras. Common steps include strict SSH settings, a host firewall, SELinux or AppArmor in enforcing mode, the `noexec`, `nosuid` and `nodev` mount options on `/tmp` and other user-writable filesystems, safe sysctl network settings such as disabling IP forwarding on hosts that are not routers, strong password and lockout policy through PAM, and centralized logging so evidence survives on another host. Many organizations start from a published benchmark and automate it with configuration management so every server matches the same baseline.",
   "Consider a worked example. Hardening a new mail relay, you run `ss -tulpn` and find cups and an old rpcbind listener. You disable and remove both packages, apply security updates with `dnf upgrade --security`, and reboot into the new kernel after `needs-restarting -r` says a reboot is required. `mokutil --sb-state` reports Secure Boot enabled. You then initialize AIDE, install the database, copy it to read-only storage and schedule a nightly `aide --check`. A week later the report flags a changed binary in `/usr/bin` with no matching package update, and you open an incident.",
   "Common mistakes: stopping a service with `systemctl stop` but leaving it enabled, so it returns at the next boot; disabling Secure Boot permanently to load one unsigned driver instead of enrolling a MOK; installing patches without rebooting for a kernel fix; never updating the AIDE baseline after patching, so real changes hide among hundreds of expected ones; and storing the AIDE database only on the host it protects.",
   "Exam questions use recognizable clues. 'Reduce attack surface' points to removing or disabling unused services and packages. 'Prevent a service from being started, even as a dependency' is `mask`. 'Only signed boot loaders and kernels' is Secure Boot, and 'a third-party driver will not load with Secure Boot on' points to MOK signing. 'Detect unauthorized changes to system files' is AIDE or file integrity monitoring. 'Apply only security fixes' is `dnf upgrade --security`, and 'patched but still running the old kernel' means a reboot is needed."
  ],
  "analogy": "Think of a server as a museum after closing. Disabling services is bricking up side doors nobody uses; masking a service is welding the door shut so even staff cannot open it by accident. Secure Boot is the guard who checks the badge of every night-shift worker before the building's alarms even switch on. Patching is replacing locks the manufacturer has recalled. AIDE is the curator's photo of every display case, compared each morning. The analogy stops at AIDE's limits: it tells you something changed, not who changed it or whether it was malicious, so a human still investigates.",
  "terms": [
   [
    "Attack surface",
    "The total set of services, software and interfaces an attacker could try to exploit."
   ],
   [
    "systemctl mask",
    "Links a unit to /dev/null so it cannot be started manually or as a dependency until unmasked."
   ],
   [
    "Secure Boot",
    "A UEFI feature that allows only signed boot loaders, kernels and modules to run."
   ],
   [
    "MOK",
    "Machine Owner Key, a locally enrolled key used to sign kernels or modules so they load under Secure Boot."
   ],
   [
    "AIDE",
    "Advanced Intrusion Detection Environment, a file integrity tool that compares files against a stored baseline of hashes and attributes."
   ],
   [
    "Patch management",
    "The process of finding, testing, applying and verifying software updates, prioritizing security fixes."
   ],
   [
    "Defense in depth",
    "Layering several independent controls so the failure of one does not expose the system."
   ],
   [
    "ss -tulpn",
    "Lists listening TCP and UDP sockets numerically with the owning process."
   ]
  ],
  "example": "Hardening a new mail relay, you run ss -tulpn and find cups and an old rpcbind listener. You disable and remove both packages, apply all security updates with dnf upgrade --security and reboot into the new kernel, confirm mokutil --sb-state reports Secure Boot enabled, and initialize AIDE so a nightly check will flag unexpected changes under /etc and /usr/bin.",
  "mistakes": [
   [
    "Using `systemctl stop` to 'disable' an unneeded service.",
    "stop only ends the running process; the unit still starts at the next boot. Use systemctl disable --now, or mask it, or better, remove the package."
   ],
   [
    "Turning off Secure Boot so a vendor driver will load.",
    "That removes protection for every boot component. Sign the module and enroll the key as a MOK so it loads with Secure Boot still enabled."
   ],
   [
    "Assuming `dnf upgrade` applied the kernel fix because the package installed successfully.",
    "The old kernel keeps running until reboot. Check with needs-restarting -r or uname -r and reboot in a maintenance window."
   ],
   [
    "Running AIDE checks for months without updating the baseline after patching.",
    "Every patched file appears as changed, so real intrusions hide in the noise. Run aide --update after verified changes and store the new database safely."
   ]
  ],
  "tryit": [
   [
    "A file server runs NFS, and `ss -tulpn` also shows `avahi-daemon` and `cupsd` listening. Policy says only required services may run, and another admin warns that some other unit may pull avahi in as a dependency. What do you do with each service?",
    "Keep the NFS services, which match the role. For avahi and cups, run `systemctl disable --now` and then `systemctl mask avahi-daemon` so no dependency can start it again; if the packages are not needed, remove them so there is nothing to patch. Confirm with `ss -tulpn` and `systemctl list-unit-files --state=enabled`."
   ],
   [
    "Overnight, AIDE reports changes to 340 files under `/usr`, including `/usr/bin/sshd`. Your patch log shows `dnf upgrade --security` ran yesterday and updated openssh among other packages. How do you decide whether this is an incident?",
    "Compare the changed files with what the update installed: `rpm -V` on the packages, or the dnf history for yesterday's transaction, shows whether files match the packages' recorded checksums. If every change maps to a legitimate update, run aide --update and store the new baseline offline. Any change not explained by a package, such as a binary that fails rpm -V, is treated as a possible intrusion."
   ]
  ],
  "tip": "After legitimate updates, the AIDE baseline must be updated, or every patched binary shows up as a change and real intrusions hide in the noise. disable stops startup at boot; mask blocks the unit entirely.",
  "check": [
   [
    "Which command lists listening ports and the processes that own them?",
    "ss -tulpn."
   ],
   [
    "What threat does Secure Boot mainly defend against?",
    "Tampered or malicious boot loaders, kernels and early boot code such as bootkits and rootkits."
   ],
   [
    "What does aide --check compare?",
    "The current state of monitored files (hashes, permissions, ownership, sizes) against the stored baseline database."
   ],
   [
    "What is the difference between systemctl disable and systemctl mask?",
    "disable stops a unit starting at boot but it can still be started manually or by a dependency; mask prevents it from being started at all."
   ],
   [
    "How can you tell whether a RHEL-family server needs a reboot after updates?",
    "needs-restarting -r reports whether a reboot is required, for example after a kernel update."
   ]
  ]
 },
 {
  "t": "Compliance and auditing: auditd, log review, vulnerability scanning, CIS benchmarks",
  "hook": "It is Tuesday morning at Ridgeview Medical Billing, and an external auditor named Paul is sitting across from you with a laptop and a checklist. His first question is polite but pointed: \"Show me who changed the sudo rules on your claims server in the last ninety days, and show me that the server meets your hardening standard.\" You know the sudoers file was edited at least twice. You also know that both edits were made as root, and the shared root password has been typed by four different people. If the only record says \"root did it,\" Paul will write a finding. What would you need to have set up in advance so that you could put a real person's name next to every change and hand him proof of compliance in minutes?",
  "simple": "Compliance means following a set of rules, and auditing means keeping proof that you followed them. Think of a restaurant health inspection. The health code says how food must be stored, a thermometer log on the fridge door proves it stayed cold every day, and the inspector checks both. On a Linux server, a checklist called a benchmark says how the system should be set up. A recording service called auditd writes down important events, such as someone editing the file that controls administrator rights, along with the real person behind it. A scanner looks for known weak spots, such as old software with published flaws. You review the records regularly, fix problems, and keep reports so you can show an inspector that the rules were followed all along, not just on the day they visited.",
  "body": [
   "Compliance means proving that systems meet a defined standard, whether that standard is an internal policy, an industry framework or a government regulation. Auditing supplies the evidence: records of who did what and when, and proof that the configuration matches the standard. As a Linux administrator you configure the tools that collect this evidence, respond to what they find and produce reports for auditors. Four pieces work together here. auditd records events, log review turns those records into findings, vulnerability scanning finds known weaknesses, and benchmarks define what a good configuration looks like. If any one piece is missing, the story you tell an auditor has a gap.",
   "The Linux audit system records security-relevant events at the kernel level, which makes it hard for a user process to slip past it. The `auditd` daemon writes events to `/var/log/audit/audit.log`. Rules can be added at runtime with `auditctl`, but rules added that way disappear at reboot. To make them persistent, place them in files under `/etc/audit/rules.d/`, which `augenrules --load` compiles into the active rule set and loads. File watches record access to important files: `-w /etc/passwd -p wa -k identity` logs writes and attribute changes to /etc/passwd and tags each event with the key identity. The permission letters are r (read), w (write), x (execute) and a (attribute change). Syscall rules record system calls instead, such as every execution of a privileged command. `auditctl -l` lists the loaded rules and `auditctl -s` shows the daemon's status, including whether auditing is enabled.",
   "The single most useful field in an audit event is the auid (audit user ID). It is set when a person logs in and is preserved even after they run sudo or su, so an action performed as root still carries the identity of the human who started the session. In a raw log line you will see something like `uid=0` next to `auid=1001`, meaning the process ran as root but was launched by the user with ID 1001. This is what makes actions traceable to a person and answers the auditor's question of who, not merely which account.",
   "Searching and summarizing audit data uses `ausearch` and `aureport` rather than grep, because audit records span multiple lines and use numeric codes. `ausearch -k identity` finds events with that key, `ausearch -m USER_LOGIN --success no` finds failed logins, `ausearch -ua 1001` finds events tied to a user, `-ts today` limits the time range and `-i` interprets numeric values such as user IDs and syscall numbers into readable names. For overviews, `aureport --summary` gives totals, `aureport --auth` reports authentication attempts and `aureport --failed` lists failed events. SELinux (Security-Enhanced Linux) denials also appear in the audit log as AVC (access vector cache) records, so the same tools help when troubleshooting a blocked service.",
   "Log review is only effective if it is regular and focused, because nobody reads every line. Watch for repeated failed logins, logins at odd hours or from unusual sources, new accounts or sudoers changes, services started or stopped unexpectedly, and gaps in the logs, which may indicate tampering. Several commands help: `journalctl` queries the systemd journal, `last` shows successful logins from wtmp, `lastb` shows failed logins from btmp, `lastlog` shows each account's most recent login and `who` shows who is logged in now. Forwarding logs to a central server or SIEM (security information and event management) system with rsyslog or the journal's remote tools protects them from local tampering, because an intruder who gains root on one host cannot quietly edit copies stored elsewhere. Central collection also allows correlation across hosts, such as spotting the same source address failing on twenty servers.",
   "Vulnerability scanning finds known weaknesses before attackers do. Network scanners such as OpenVAS/Greenbone probe hosts for vulnerable services and misconfigurations. Authenticated (credentialed) scans log in to the host and inspect installed packages and settings directly, so they give more accurate results than unauthenticated scans, which can only guess from network responses. Findings reference CVE (Common Vulnerabilities and Exposures) identifiers and are rated with CVSS (Common Vulnerability Scoring System) scores. Remediate by priority, patching or mitigating, then rescan to confirm the fix worked. Only scan systems you are authorized to test, and get that authorization in writing.",
   "Benchmarks define the target configuration. CIS (Center for Internet Security) Benchmarks are consensus configuration guides for specific operating systems and applications, grouped into Level 1 (a practical baseline with little operational impact) and Level 2 (stricter defense in depth that may affect functionality). DISA STIGs (Security Technical Implementation Guides) serve a similar role for US defense systems. OpenSCAP automates checking: `oscap xccdf eval --profile <profile> --report report.html <datastream>` evaluates a system against a SCAP (Security Content Automation Protocol) profile and produces an HTML report listing each rule as pass or fail, and many findings can be remediated automatically. Lynis performs broader hardening audits and suggests improvements.",
   "Consider a worked example. An auditor asks for proof that changes to sudo rules are tracked. You create `/etc/audit/rules.d/sudo.rules` containing `-w /etc/sudoers -p wa -k sudoers` and `-w /etc/sudoers.d/ -p wa -k sudoers`, then run `augenrules --load` and confirm with `auditctl -l`. You make a harmless test change with `visudo` and show the auditor the event from `ausearch -k sudoers -i`, which names your auid even though the edit ran as root. You also attach an OpenSCAP report against the CIS profile, listing two failed checks with a remediation date and one documented exception approved by the security team. Common mistakes to avoid include adding rules with `auditctl` only, so they vanish at reboot; watching files without a key, which makes events hard to find; reviewing logs only after an incident; running a single scan and calling the system compliant, when compliance is continuous; applying every Level 2 recommendation without testing, which can break applications; and scanning networks without authorization. Remember that audit logs only help if they are protected and retained.",
   "Exam questions tie clue words to tools. 'Track who modified a file' is an auditd watch with `-w` and `-p wa`. 'Find audit events by key' is `ausearch -k`, and 'summary report of authentication events' is `aureport --auth`. 'Actions after sudo still traced to the person' is the auid. 'Rules survive a reboot' means `/etc/audit/rules.d/` and `augenrules`. 'Known vulnerabilities with CVE numbers' is a vulnerability scanner. 'Consensus secure configuration guide' is a CIS Benchmark, and 'automated compliance evaluation with an HTML report' is OpenSCAP."
  ],
  "analogy": "auditd is like the badge reader and camera system in an office building. Everyone may share one master key (root), but the badge reader still logs which employee badged in at the front door, and that name follows them through every room they enter, just as the auid follows a user through sudo. The camera footage is only useful if someone reviews it and if it is stored somewhere an intruder cannot erase, which is why logs are forwarded off the host. The analogy stops where a camera records everything: auditd records only what your rules tell it to watch.",
  "terms": [
   [
    "auditd",
    "The Linux audit daemon that records kernel-level security events to /var/log/audit/audit.log."
   ],
   [
    "auditctl / augenrules",
    "auditctl manages rules at runtime; augenrules --load compiles persistent rules from /etc/audit/rules.d/ and loads them."
   ],
   [
    "Audit rule key (-k)",
    "A label attached to audit rules so related events can be found with ausearch -k."
   ],
   [
    "auid",
    "The audit user ID, the original login identity kept even after sudo or su."
   ],
   [
    "ausearch / aureport",
    "Tools that search audit logs for specific events and produce summary reports."
   ],
   [
    "CVE / CVSS",
    "Standard identifiers for known vulnerabilities and the scoring system used to rate their severity."
   ],
   [
    "CIS Benchmark",
    "A consensus-based, prioritized secure configuration guide for a specific operating system or application, with Level 1 and Level 2 profiles."
   ],
   [
    "OpenSCAP",
    "A tool that evaluates and can remediate systems against SCAP compliance profiles and produces reports."
   ]
  ],
  "example": "An auditor asks for proof that changes to sudo rules are tracked. You add -w /etc/sudoers -p wa -k sudoers and -w /etc/sudoers.d/ -p wa -k sudoers to /etc/audit/rules.d/sudo.rules, load them with augenrules --load, make a test change with visudo, and show the resulting event, including your auid, from ausearch -k sudoers -i.",
  "mistakes": [
   [
    "Adding a watch with auditctl is enough to meet the requirement.",
    "Rules added with auditctl live only in memory and are lost at reboot. Put them in a file under /etc/audit/rules.d/ and load them with augenrules --load."
   ],
   [
    "If the edit was made as root, the audit log can only say root did it.",
    "The auid field keeps the original login identity through sudo and su, so the event still names the person who logged in."
   ],
   [
    "One clean vulnerability scan means the server is compliant.",
    "Compliance is continuous. New CVEs appear and configurations drift, so scans and benchmark checks must be repeated on a schedule."
   ],
   [
    "Apply every CIS Level 2 recommendation immediately for maximum security.",
    "Level 2 controls are stricter and can break applications. Start from Level 1, test Level 2 items, and document approved exceptions."
   ]
  ],
  "tryit": [
   [
    "Your manager wants alerts whenever anyone reads the database credentials file /opt/app/db.conf, not just when it changes. A colleague proposes -w /opt/app/db.conf -p wa -k dbcreds. Will that rule catch reads, and what would you change?",
    "No. The p option lists which access types to log, and wa covers only writes and attribute changes. Use -p r (or -p rwa to catch changes too), keep the key so ausearch -k dbcreds finds events, and put the rule in /etc/audit/rules.d/ so it survives reboots."
   ],
   [
    "A scanner report shows 40 findings on a web server, each with a CVE number and a CVSS score. You have one maintenance window this week. How do you decide what to fix first, and how do you prove the fixes worked?",
    "Prioritize by severity and exposure, starting with high CVSS scores on services reachable from the network. Patch or mitigate those in the window, then rescan, preferably with an authenticated scan, to confirm the findings are gone and record the rest with planned dates."
   ]
  ],
  "tip": "Know the audit tool trio: auditctl manages rules, ausearch finds specific events, and aureport produces summaries. Persistent rules belong in /etc/audit/rules.d/, not only in auditctl.",
  "check": [
   [
    "What does the audit rule -w /etc/shadow -p wa -k shadow do?",
    "Watches /etc/shadow and logs any write or attribute change, tagging events with the key shadow."
   ],
   [
    "Why is the auid field valuable in investigations?",
    "It records the original login user, so actions performed after sudo or su can still be traced to a person."
   ],
   [
    "What is the purpose of a CIS Benchmark?",
    "To provide a consensus, prioritized set of secure configuration recommendations to harden and audit a specific system."
   ],
   [
    "Why does an authenticated vulnerability scan give better results than an unauthenticated one?",
    "It logs in and inspects installed packages and settings directly, instead of guessing from network responses."
   ],
   [
    "Which command produces a summary report of authentication attempts from the audit log?",
    "aureport --auth."
   ]
  ]
 },
 {
  "t": "Bash scripting: shebang, variables, parameter expansion, quoting, exit codes and $?",
  "hook": "At 1:15 a.m. your phone buzzes. The nightly backup job at Cedar Valley Library failed again, but the cron log only says `cp: cannot stat 'Q3': No such file or directory` and `cp: cannot stat 'report.xlsx': No such file or directory`. Nobody has a file called Q3. Worse, the script reported success to the monitoring system, so the last three nights of \"green\" backups may be incomplete. Priya, who wrote the script, swears it worked in testing. You open it and see a dozen lines: a shebang, a few variables, a copy command and an echo at the end. Somewhere in those lines, a single missing pair of quotes and a misplaced status check are hiding. Can you spot them before morning?",
  "simple": "A Bash script is a to-do list for the computer, written in the same commands you would type by hand. The first line tells Linux which program should read the list. Variables are labeled boxes that hold values, like a box named `name` holding the word web01. Quotes tell the shell how to treat what is inside: double quotes keep a phrase with spaces together as one item, while single quotes mean \"take this exactly as written.\" Every command also reports back with a number when it finishes, called the exit code. Zero means it worked, anything else means something went wrong. It is like a delivery driver who texts back \"0\" for delivered and another number for a problem. The script can read that number and decide what to do next.",
  "body": [
   "A Bash script is a text file of shell commands run in sequence, letting you automate anything you can type. Linux+ performance-based questions often show a short script and ask what it prints or why it fails, so the core syntax needs to be solid. Most script bugs come from a handful of details: how the script is started, how variables are assigned and expanded, how quoting works, and how success and failure are reported. Master those and most exam scripts become easy to read.",
   "The first line is the shebang, which tells the kernel which interpreter should run the file: `#!/bin/bash`, or `#!/usr/bin/env bash` to find bash wherever it sits in the PATH. Make the script executable with `chmod +x script.sh` and run it as `./script.sh`; alternatively, `bash script.sh` runs it without execute permission because you are starting the interpreter yourself. Running it with `source script.sh` (or `. script.sh`) executes it in the current shell, so variables and directory changes it makes remain afterwards. A script started normally runs in a child process and cannot change its parent's environment, which is why a script that runs `cd /srv` leaves your own prompt where it was. Lines beginning with `#` are comments. A file saved with Windows line endings breaks the shebang, because the kernel looks for an interpreter whose name ends in an invisible carriage return.",
   "Variables are assigned with no spaces around the equals sign: `name=web01`. Writing `name = web01` runs a command called name with two arguments instead, producing 'command not found'. Read a value with `$name` or `${name}`; braces are needed when text follows, as in `${name}_backup`, otherwise Bash looks for a variable called name_backup. Command substitution captures output: `today=$(date +%F)`. Arithmetic uses `$(( ))`: `count=$((count + 1))`. `read -p 'Name: ' user` reads input from the keyboard, and `export VAR` makes a variable visible to child processes.",
   "Special parameters give a script information about how it was called. `$0` is the script name, `$1`, `$2` and so on are positional arguments, `$#` is the number of arguments, `$@` is all arguments as separate words, `$$` is the script's PID (process ID) and `$?` is the exit status of the last command. Parameter expansion transforms variables without calling external tools. `${var:-default}` substitutes a default if var is unset or empty, `${var:=default}` also assigns it, and `${var:?message}` exits with an error if it is unset. `${#var}` gives the length. `${file%.txt}` removes the shortest matching suffix, `%%` removes the longest, `${path##*/}` removes the longest prefix up to the last slash (like basename), and `${var/old/new}` replaces the first match.",
   "Quoting controls how the shell treats special characters. Double quotes allow variable and command expansion but prevent word splitting and globbing: `\"$file\"` stays one argument even if it contains spaces or an asterisk. Single quotes make everything literal: `'$HOME'` prints the five characters rather than your home directory. A backslash escapes a single character. The rule of thumb is to double-quote every expansion, `\"$var\"` and `\"$@\"`, unless you specifically want splitting. Every command returns an exit status from 0 to 255: 0 means success and anything else failure, with meanings defined by the program. `$?` holds the status of the most recent command, so check it immediately, because the next command, even an `echo` or a test, overwrites it. A script sets its own status with `exit 0` or `exit 1`, and that is what cron or a monitoring tool sees. `&&` and `||` use exit codes: `mkdir /backup && cp file /backup` copies only if mkdir succeeded, and `ping -c1 host || echo down` prints only on failure.",
   "```bash\n#!/bin/bash\ntarget=\"${1:-/var/log}\"\nsize=$(du -sh \"$target\" 2>/dev/null)\nstatus=$?\nif [ \"$status\" -ne 0 ]; then\n  echo \"cannot read $target (exit $status)\" >&2\n  exit 1\nfi\necho \"$target uses ${size%%[[:space:]]*}\"\n```",
   "Consider a worked example. The script above takes a directory as its first argument and falls back to `/var/log` through `${1:-/var/log}`. It captures `du` output with command substitution, saves `$?` straight away into `status` so the value is not lost, and exits with 1 and a message on standard error if `du` failed. Finally `${size%%[[:space:]]*}` strips everything from the first whitespace onward, leaving just the size figure. Run as `./dusize.sh /srv/My Files`, the script would receive only `/srv/My` as `$1` and report that it cannot read it, because the unquoted argument splits into two words before the script ever sees it; `./dusize.sh \"/srv/My Files\"` works, and inside the script the quoted `\"$target\"` keeps the name intact.",
   "Common mistakes cluster around the same details. People put spaces around `=` in assignments, leave variables unquoted so they split on spaces or expand wildcards, and check `$?` after an `echo` rather than after the command they care about. They use `source` when they meant to run a separate process, or the reverse. They confuse `%` (suffix) with `#` (prefix) in parameter expansion, single-quote a string that needs a variable expanded, forget to make the script executable, or save it with a Windows line ending.",
   "Exam questions often show code and ask for output or the bug. 'Variable keeps its value after the script ends' points to `source`. 'Command not found' on an assignment line means spaces around `=`. 'File names with spaces break the script' means missing double quotes. 'Default value if no argument given' is `${1:-default}`. 'Strip an extension' is `%`, and 'strip a leading path' is `##*/`. 'Status of the previous command' is `$?`, and 'number of arguments' is `$#`."
  ],
  "analogy": "Quoting is like putting items in a shipping box. Double quotes are a box with a window: everything inside travels together as one package, but the shell can still look through the window and swap `$name` for its value. Single quotes are a sealed box: nothing inside is touched, so `$HOME` arrives as five literal characters. No quotes is loose items on a conveyor belt, where a space splits them apart and an asterisk gets swapped for every matching file. The analogy breaks down slightly with backslashes, which escape one character rather than boxing a whole phrase.",
  "mnemonic": "On a US keyboard, # (Shift+3) sits to the left of $ (Shift+4) and % (Shift+5) sits to the right. So # trims from the left (the start) and % trims from the right (the end) of the value.",
  "terms": [
   [
    "Shebang",
    "The #! first line that names the interpreter the kernel should use to run a script."
   ],
   [
    "Positional parameters",
    "The script's arguments, available as $1, $2 and so on, with $# as the count and $@ as the full list."
   ],
   [
    "Parameter expansion",
    "Shell syntax such as ${var:-default} or ${file%.txt} that substitutes or transforms variable values."
   ],
   [
    "Command substitution",
    "$(command), which replaces itself with the command's output."
   ],
   [
    "Exit status ($?)",
    "The 0 to 255 code a command returns, where 0 means success; $? holds the most recent one."
   ],
   [
    "source",
    "Runs a script in the current shell so its variables and directory changes persist."
   ],
   [
    "Word splitting",
    "The shell's habit of breaking unquoted expansions into separate arguments at spaces, prevented by double quotes."
   ]
  ],
  "example": "A backup script fails on a file named 'Q3 report.xlsx'. The line cp $file /backup split the name into two arguments. Changing it to cp \"$file\" /backup fixes it, and adding if [ $? -ne 0 ]; then echo 'copy failed' >&2; exit 1; fi right after the copy makes the failure visible in the cron job's logs instead of silently continuing.",
  "mistakes": [
   [
    "Writing count = 5 assigns 5 to count.",
    "Spaces around = make Bash run a command named count with arguments = and 5. Assignments must be count=5 with no spaces."
   ],
   [
    "echo '$USER' prints your username.",
    "Single quotes prevent all expansion, so it prints the literal text $USER. Use double quotes, echo \"$USER\", to expand it."
   ],
   [
    "You can check $? a few lines after the command, as long as nothing failed in between.",
    "Every command, including a successful echo, overwrites $?. Save it to a variable or test it on the very next line."
   ],
   [
    "Running ./setenv.sh will set variables in your current shell.",
    "A normally started script runs in a child process whose variables vanish when it exits. Use source setenv.sh or . setenv.sh."
   ]
  ],
  "tryit": [
   [
    "A script contains path=/var/log/nginx/access.log and then echo ${path##*/} and echo ${path%/*}. Your teammate thinks both lines print access.log. What does each actually print?",
    "The first prints access.log, because ##*/ removes the longest prefix ending in a slash. The second prints /var/log/nginx, because %/* removes the shortest suffix starting with a slash, which works like dirname."
   ],
   [
    "A monitoring check calls your script and treats any non-zero exit as an outage. The script's last line is echo \"done\", placed after a curl command that sometimes fails. The dashboard never shows failures. Why, and how do you fix it?",
    "The script's exit status is that of its last command, the echo, which always succeeds, so it exits 0. Capture curl's status right after it runs, or use curl ... || exit 1, and end with an explicit exit code that reflects the result."
   ]
  ],
  "tip": "Look for spaces around = in assignments and unquoted variables; both are common deliberate errors in exam script questions. % trims from the end, # trims from the start.",
  "check": [
   [
    "What does ${filename%.log} produce if filename is app.log?",
    "app, because % removes the shortest matching suffix pattern .log."
   ],
   [
    "What is the difference between echo '$HOME' and echo \"$HOME\"?",
    "Single quotes print the literal text $HOME; double quotes expand it to the home directory path."
   ],
   [
    "Why must you check $? immediately after the command you care about?",
    "Because every command, including echo or test, overwrites $? with its own exit status."
   ],
   [
    "A script sets a variable, but it is empty in your shell after ./script.sh finishes. Why?",
    "The script ran in a child process; run it with source script.sh (or . script.sh) to keep its variables in the current shell."
   ],
   [
    "What does $# hold inside a script run as ./deploy.sh web01 \"blue green\"?",
    "2, because the quoted \"blue green\" is a single argument."
   ]
  ]
 },
 {
  "t": "Bash control flow: if/test, case, for and while loops, functions, arrays",
  "hook": "Monday, 7:30 a.m., at Northgate Logistics. Jonas, the team lead, drops a ticket in your queue: \"Every morning someone logs in to all 40 servers one by one to check disk space. Automate it so we only see the servers that need attention.\" You open a blank file and realize the job has several parts. You need to keep a list of hosts, visit each one, compare a number against a threshold, warn only when it is too high, and maybe accept an option for a quiet mode. Your first draft uses `[ $usage > 90 ]`, and when you run it, nothing is printed, but a mysterious new file named `90` appears in your directory. What went wrong, and which Bash constructs turn this chore into a ten-line tool?",
  "simple": "Control flow is how a script makes choices and repeats work, much like a recipe. \"If the dough is sticky, add flour\" is a decision. \"For each of the six eggs, crack it into the bowl\" is a loop that repeats an action for every item. \"Stir until smooth\" is a loop that keeps going while something is still true. A function is a mini-recipe you name once, such as \"make the sauce,\" and reuse whenever you need it. An array is a shopping list stored under one name, so you can walk through every item in order. In Bash, these pieces let one script check forty servers, handle different options, and only speak up when something needs attention, instead of you typing the same commands forty times.",
  "body": [
   "Control flow lets a script make decisions and repeat work. With conditions, loops and functions you can turn a list of commands into a tool that handles many hosts, files or users. The exam expects you to read these constructs, predict what they do and spot errors in them, so pay attention to exact syntax, especially spaces and closing keywords. Bash is strict about both, and a missing space is enough to turn a test into a 'command not found' error.",
   "`if` runs a command and branches on its exit status: zero means true. Most often the command is a test. `[ ... ]` (the `test` command) and Bash's `[[ ... ]]` evaluate expressions, and the spaces inside the brackets are required because `[` is really a command name. File tests include `-e` exists, `-f` regular file, `-d` directory, `-r`, `-w` and `-x` for readable, writable and executable, and `-s` non-empty. String tests include `-z` empty, `-n` non-empty, `=` or `==` equal, and `!=` not equal. Integer comparisons use `-eq`, `-ne`, `-lt`, `-le`, `-gt` and `-ge`, not `<` or `>`, which in single brackets are redirections. That is why `[ $usage > 90 ]` silently creates a file named 90 and the test itself succeeds. `[[ ]]` adds pattern matching (`[[ $host == web* ]]`), regular expressions with `=~`, `&&` and `||` inside, and safer handling of unquoted variables. `(( ))` evaluates arithmetic: `(( count > 5 ))`, where `>` really does mean greater than. The full structure is `if ...; then ...; elif ...; then ...; else ...; fi`.",
   "`case` matches one value against patterns, which is cleaner than a long if/elif chain, especially for command-line options. Each pattern ends with `)`, each block ends with `;;`, `|` separates alternatives, `*` is the catch-all default, and the statement ends with `esac`, which is case spelled backward, just as `fi` closes `if`.",
   "```bash\ncase \"$1\" in\n  start|up)   systemctl start app ;;\n  stop)       systemctl stop app ;;\n  *)          echo \"usage: $0 {start|stop}\" >&2; exit 2 ;;\nesac\n```",
   "Loops repeat work. `for` iterates over a list: `for host in web01 web02 db01; do ssh \"$host\" uptime; done`, over files with a glob (`for f in /var/log/*.log; do ...; done`), over arguments with `for arg in \"$@\"`, or C-style with `for ((i=1; i<=5; i++))`. Brace expansion `{1..10}` generates sequences. `while` repeats as long as a command succeeds, and `until` repeats until it succeeds, which suits waiting for a service to come up. The safest way to process a file line by line is `while IFS= read -r line; do ...; done < file`. Setting IFS (the internal field separator) to empty keeps leading spaces and `-r` keeps backslashes, whereas `for line in $(cat file)` splits on every space and expands wildcards. `break` exits a loop and `continue` skips to the next iteration.",
   "Functions group reusable code: `backup() { local src=\"$1\"; tar -czf \"/backup/$(basename \"$src\").tgz\" \"$src\"; }`, called like a command: `backup /etc`. Inside a function, `$1` and friends are the function's own arguments, not the script's. Declare variables with `local` so they do not leak into or overwrite global variables. `return n` sets the function's exit status, which `if` can test; to return data, echo it and capture it with `$(...)`. Functions must be defined before they are called, so they usually sit near the top of the script.",
   "Arrays hold lists. Indexed arrays look like `servers=(web01 web02 db01)`, where `${servers[0]}` is the first element, `\"${servers[@]}\"` expands to all elements as separate words, `${#servers[@]}` gives the count, and `servers+=(cache01)` appends. `mapfile -t hosts < hosts.txt` reads a file into an array, one line per element, with `-t` stripping the newlines. Associative arrays need `declare -A`: `declare -A port=([ssh]=22 [https]=443)`, then `${port[ssh]}`, and `${!port[@]}` lists the keys. Arrays are Bash features and are not available in plain POSIX sh, so a script using them needs a bash shebang.",
   "Consider a worked example. You need to check disk usage on every server in a list. The script reads hosts with `mapfile -t hosts < hosts.txt` and loops with `for h in \"${hosts[@]}\"`. A function `check_disk()` declares `local host=\"$1\"`, runs `ssh \"$host\" df --output=pcent /` and strips the percent sign, then uses `if (( usage > 90 ))` to print a warning. A `case` on `$1` lets the same script accept `report` or `quiet`, and a `while` loop with `sleep` could rerun the check until every host responds. Common mistakes to watch for include `[$x -eq 1]` without spaces, which fails; `[ $a > $b ]`, which creates a file named after `$b`; forgetting `fi`, `done` or `esac`; using `=` for numbers where `-eq` is needed; forgetting `;;` in case; leaving `\"${arr[@]}\"` unquoted; and omitting `local`, so function variables overwrite globals.",
   "Exam questions test exact syntax. 'Check that a file exists and is a regular file' is `[ -f file ]`, and 'is a directory' is `-d`. 'Compare numbers' means `-eq`, `-lt` or `-gt`, or `(( ))`. 'Many possible values of one variable' suggests `case`. 'Read a file line by line safely' is `while IFS= read -r line`. 'Number of elements' is `${#array[@]}`, 'key-value pairs' needs `declare -A`, and 'keep a function variable private' is `local`."
  ],
  "analogy": "A `case` statement works like a mailroom sorting shelf. Each envelope (the value) is checked against labeled slots from top to bottom: \"start or up,\" \"stop,\" and finally a catch-all bin marked with an asterisk for anything else. The envelope goes into the first slot that matches and the clerk stops looking, which is what `;;` signals. Where the analogy stops: Bash slot labels are patterns, so `web*` matches many different envelopes, and order matters because the first match wins.",
  "terms": [
   [
    "test / [ ]",
    "The command that evaluates file, string and integer expressions and returns 0 for true."
   ],
   [
    "[[ ]]",
    "Bash's extended test with pattern matching, =~ regular expressions and safer handling of unquoted variables."
   ],
   [
    "(( ))",
    "Arithmetic evaluation in which < and > are numeric comparisons."
   ],
   [
    "case",
    "A statement that matches one value against patterns, with ;; ending each branch and esac ending the block."
   ],
   [
    "while read loop",
    "while IFS= read -r line; do ...; done < file, the safe way to process a file line by line."
   ],
   [
    "local",
    "Declares a variable visible only inside the current function."
   ],
   [
    "Associative array",
    "A Bash array indexed by strings, created with declare -A."
   ]
  ],
  "example": "You need to check disk usage on every server in a list. A script reads hosts into an array with mapfile -t hosts < hosts.txt, loops with for h in \"${hosts[@]}\", runs a function check_disk \"$h\" that uses ssh and df, and uses if (( usage > 90 )) to print a warning only for hosts above 90 percent, so the morning report shows just the servers that need attention.",
  "mistakes": [
   [
    "[ $usage > 90 ] compares two numbers.",
    "Inside single brackets, > is output redirection, so it creates a file named 90 and the test succeeds. Use [ \"$usage\" -gt 90 ] or (( usage > 90 ))."
   ],
   [
    "[ \"$a\" = \"$b\" ] is the right way to compare two integers.",
    "= compares strings, so 05 and 5 are different. Use -eq for numeric equality."
   ],
   [
    "for line in $(cat hosts.txt) reads the file one line at a time.",
    "It splits on any whitespace and expands wildcards. Use while IFS= read -r line; do ...; done < hosts.txt."
   ],
   [
    "A variable set inside a function stays private to that function.",
    "Bash variables are global by default. Declare them with local to keep them inside the function."
   ]
  ],
  "tryit": [
   [
    "Your script must accept start, stop, restart or status as its first argument and print a usage message for anything else. A colleague has written a seven-branch if/elif chain with string comparisons. Which construct would you suggest, and how does it handle the unexpected value?",
    "A case statement on \"$1\", with one pattern per action (alternatives joined with |), each branch ending in ;;, and a final *) branch that prints usage to standard error and exits non-zero. It is shorter, easier to read and has an explicit default."
   ],
   [
    "A function count_users() sets total=0 and counts lines, and the main script also uses a variable named total for something else. After calling the function, the main script's total is wrong. What happened, and what is the fix?",
    "Without local, the function's total is the same global variable and overwrote the script's value. Declare local total=0 inside the function, and return the result by echoing it and capturing it with $(count_users)."
   ]
  ],
  "tip": "Numbers compare with -eq, -lt and -gt inside [ ], while = and != compare strings; using > in single brackets silently creates a file instead of comparing.",
  "check": [
   [
    "Which test checks that /etc/app.conf exists and is a regular file?",
    "[ -f /etc/app.conf ]."
   ],
   [
    "Why is while IFS= read -r line; do ... done < file preferred to for line in $(cat file)?",
    "It reads whole lines intact, while the for loop splits on whitespace and expands globs."
   ],
   [
    "How do you print the number of elements in the array users?",
    "echo \"${#users[@]}\"."
   ],
   [
    "What ends each branch of a case statement, and what ends the whole statement?",
    "Each branch ends with ;; and the statement ends with esac."
   ],
   [
    "How do you list the keys of an associative array named port?",
    "\"${!port[@]}\", after declaring it with declare -A port."
   ]
  ]
 },
 {
  "t": "Safer scripts: set -euo pipefail, trap, input validation, shellcheck",
  "hook": "It is 3:05 a.m. at Bayside Community College, and the nightly cleanup job is about to run. Its key line is `rm -rf \"$BASE_DIR\"/cache/*`. On the server where it was tested, BASE_DIR is set in a profile file. Tonight it runs from root's crontab on a new server, where nobody set BASE_DIR at all. Bash does not complain. It quietly treats the empty variable as nothing and starts deleting whatever is in `/cache`. Luckily, that directory holds only a backup copy, and Elena, the admin on call, notices the alert by morning. In the incident review, someone asks the obvious question: how do you make a script stop and refuse to run when something is wrong, instead of cheerfully carrying on?",
  "simple": "Bash is very forgiving by default. If one step fails, it shrugs and moves to the next. If you misspell a variable name, it pretends the variable is empty. That is like a kitchen helper who keeps cooking after dropping the eggs on the floor. Safer scripting means telling Bash to stop as soon as something goes wrong, to refuse to use variables that were never filled in, and to notice failures hidden in the middle of a chain of commands. You also set up a \"clean up when you leave\" rule, so temporary files are always removed, and you check every input before trusting it, the way a pharmacist checks a prescription before filling it. A free checker called ShellCheck reads your script and points out common slip-ups before you ever run it.",
  "body": [
   "By default Bash is forgiving. If a command fails, the script carries on, an unset variable quietly becomes an empty string, and a failure early in a pipeline is ignored. That tolerance turns small mistakes into big damage, such as a script that runs `rm -rf \"$dir/\"*` when `dir` was never set and ends up working on the root of the filesystem. Defensive scripting habits prevent this, and Linux+ expects you to recognize them in code and choose the right one for a described problem.",
   "Strict mode is the first layer. `set -e` (errexit) makes the script exit when a command fails, unless the failure is part of a condition such as an `if` test or a command followed by `||`. `set -u` (nounset) treats references to unset variables as errors, catching typos and missing arguments; the script stops with a message such as 'BASE_DIR: unbound variable'. `set -o pipefail` makes a pipeline return the status of the last command that failed rather than only the final command, so `grep pattern missing.txt | sort` reports failure even though `sort` succeeded. Combined, `set -euo pipefail` near the top is a common starting point. It is not magic: some commands legitimately return non-zero, such as grep returning 1 when it finds no matches, so handle those with `|| true` or an explicit check. Two debugging aids round this out: `set -x` prints each command before running it, and `bash -n script.sh` checks syntax without running anything.",
   "`trap` runs a command when the script receives a signal or exits. `trap cleanup EXIT` calls a cleanup function however the script ends, whether it finishes normally, stops under `set -e` or calls `exit`, which makes it ideal for removing temporary files or releasing lock files. `trap 'echo interrupted; exit 130' INT TERM` handles Ctrl+C and termination requests, and `trap '...' ERR` can log the line that failed. Create temporary files safely with `mktemp`, which picks a unique, unpredictable name, rather than fixed names like `/tmp/data`. Another user could pre-create a fixed name or turn it into a symlink pointing at a file you would then overwrite with your own privileges.",
   "```bash\n#!/usr/bin/env bash\nset -euo pipefail\ntmp=$(mktemp)\ntrap 'rm -f \"$tmp\"' EXIT\n[[ $# -eq 1 ]] || { echo \"usage: $0 <username>\" >&2; exit 2; }\nuser=$1\n[[ $user =~ ^[a-z_][a-z0-9_-]{0,31}$ ]] || { echo \"invalid username\" >&2; exit 2; }\ngetent passwd \"$user\" > \"$tmp\"\n```",
   "Input validation treats every argument, environment variable and file line as untrusted. Check the argument count with `$#`, match values against an allow-list or strict regular expression, confirm that files exist and that directories are what you expect, and refuse dangerous values such as an empty path or `/`. Quote every expansion so input cannot split into extra arguments or expand wildcards, and use `--` before user-supplied names so one beginning with a dash is not treated as an option (`rm -- \"$file\"`). Never pass input to `eval` or build commands as strings, because that invites command injection, where text like `; rm -rf /` hidden in an input value becomes a second command. Scripts run with sudo or from cron as root deserve extra care: use absolute paths or set PATH explicitly at the top, because cron provides a minimal environment and a writable directory early in PATH could let someone substitute their own program.",
   "ShellCheck is a static analysis tool that reads a script without running it and warns about common bugs: unquoted variables, `[ $a == $b ]` errors, unreachable code and portability problems. Run `shellcheck script.sh` and fix or consciously suppress each finding. Warnings have codes such as SC2086, which asks you to double-quote to prevent globbing and word splitting, and each code has a documented explanation you can look up. Many teams run ShellCheck in CI (continuous integration) pipelines so problems are caught before scripts reach servers, and a failing check blocks the change until someone fixes it.",
   "Consider a worked example. The script above requires exactly one argument and prints usage with exit code 2 otherwise. It checks the username against a strict pattern, so input such as `alice; rm -rf /` is rejected before it is used anywhere. `mktemp` creates a unique temporary file and the EXIT trap removes it whether the script succeeds, fails under `set -e`, or is interrupted. If `getent` finds no such user it returns 2, and strict mode stops the script there rather than continuing with an empty file. Running `shellcheck` on it reports no warnings. Common mistakes to avoid include assuming `set -e` catches failures inside `if` conditions or before `||`, which it deliberately ignores; forgetting that `grep` returning 1 for no match will abort a strict script; using fixed temp file names in /tmp; validating input but then using it unquoted; relying on the caller's PATH in a root cron job; and silencing every ShellCheck warning instead of understanding it.",
   "Exam questions describe a risk and ask for the control. 'Script continued after a command failed' is `set -e`. 'Typo in a variable name went unnoticed' or 'unset variable' is `set -u`. 'Failure in the middle of a pipeline was ignored' is `pipefail`. 'Always remove temporary files, even on error or Ctrl+C' is `trap ... EXIT` with `mktemp`. 'Find quoting and common bugs before running' is ShellCheck, 'check syntax only' is `bash -n`, and 'show each command as it runs' is `set -x`."
  ],
  "analogy": "Strict mode is like the safety features on a table saw. `set -e` is the stop switch that kills the blade the moment something jams. `set -u` is the guard that will not let the saw start if a required part is missing. `pipefail` is a sensor along the whole cutting path, not just at the end. `trap ... EXIT` is the dust collector that always runs when you switch off. The analogy has a limit for the exam: `set -e` deliberately does not trip inside an `if` test or before `||`, because there you said you expected possible failure.",
  "terms": [
   [
    "set -e",
    "Exits the script when a command fails outside a condition or || list."
   ],
   [
    "set -u",
    "Treats use of an unset variable as an error that stops the script."
   ],
   [
    "pipefail",
    "Makes a pipeline's exit status reflect the last failing command rather than only the final one."
   ],
   [
    "trap",
    "Registers a command to run on a signal or on EXIT, commonly used for cleanup."
   ],
   [
    "mktemp",
    "Creates a uniquely named temporary file or directory safely."
   ],
   [
    "Input validation",
    "Checking arguments and data against expected formats or allow-lists before using them."
   ],
   [
    "ShellCheck",
    "A static analysis tool that reports common shell script bugs with codes such as SC2086."
   ],
   [
    "bash -n / set -x",
    "bash -n checks syntax without running; set -x prints each command as it executes for debugging."
   ]
  ],
  "example": "A cleanup script contained rm -rf \"$BASE_DIR\"/cache/*. When run from cron, BASE_DIR was not set, so it targeted /cache. After a near miss, the team adds set -euo pipefail so the unset variable aborts the script, validates that BASE_DIR is a non-empty existing directory, adds a trap to remove temp files, and runs shellcheck in CI on every change.",
  "mistakes": [
   [
    "set -e will stop the script if the command in if grep -q error log; then fails.",
    "set -e deliberately ignores failures in if conditions, while tests and commands before || or &&, because those failures are expected and handled."
   ],
   [
    "Without pipefail, a pipeline fails if any command in it fails.",
    "Without pipefail, only the last command's status counts, so false | true returns 0. pipefail reports the failure."
   ],
   [
    "Writing temporary data to /tmp/myscript.tmp is fine because it is only temporary.",
    "A predictable name can be pre-created or symlinked by another user. Use mktemp and remove the file with an EXIT trap."
   ],
   [
    "Validating input once means you can use the variable unquoted afterwards.",
    "Quoting is still needed so the value stays one argument and wildcards are not expanded; validation and quoting work together."
   ]
  ],
  "tryit": [
   [
    "A strict-mode script runs count=$(grep -c ERROR app.log) and then prints the count. On days with no errors, the script exits silently before printing anything, and the cron job is marked failed. What is happening, and what are two ways to fix it?",
    "grep returns exit status 1 when it finds no matches, and set -e treats that as a failure and stops the script. Either append || true to that command so a zero count is accepted, or test explicitly, for example with an if around the grep, and handle the no-match case."
   ],
   [
    "A teammate's script takes a directory name from the first argument and runs rm -rf $1/* to clear it. It will be run with sudo by the help desk. List the changes you would require before approving it.",
    "Add set -euo pipefail, check that exactly one argument was given, refuse empty values and /, confirm with [ -d ] that the target is an existing directory inside an allowed path, quote the expansion as rm -rf -- \"$1\"/*, set PATH or use absolute paths, and run ShellCheck before merging."
   ]
  ],
  "tip": "Know what each strict-mode flag catches: -e failed commands, -u unset variables, and pipefail failures hidden inside pipelines. set -e does not fire inside if conditions or before ||.",
  "check": [
   [
    "Without pipefail, what exit status does false | true return?",
    "0, because only the last command's status (true) counts."
   ],
   [
    "How do you guarantee a temporary file is deleted when a script exits, even on error?",
    "Create it with mktemp and register trap 'rm -f \"$tmp\"' EXIT (or a cleanup function)."
   ],
   [
    "What does ShellCheck warning SC2086 usually ask you to do?",
    "Double-quote a variable expansion to prevent word splitting and globbing."
   ],
   [
    "Why should you write rm -- \"$file\" rather than rm $file for user-supplied names?",
    "Quoting keeps the name as one argument, and -- stops a name beginning with a dash from being read as an option."
   ],
   [
    "Which command checks a script for syntax errors without running any of it?",
    "bash -n script.sh."
   ]
  ]
 },
 {
  "t": "Python basics for admins: data types, sets and dicts, venv, pip, running scripts",
  "hook": "Hollis County Water is moving its file shares to a new server this weekend, and on Thursday afternoon Marcus, the project manager, asks you a simple question: \"Which user accounts exist on the old server but not on the new one?\" You have two exported lists of about 800 accounts each, with duplicates, in no particular order. You start a Bash pipeline with sort, uniq and comm, and it works, sort of, until he adds, \"And for each missing account, tell me its login shell and write it as JSON for the migration ticket.\" The pipeline is getting ugly. A colleague says this is a ten-line Python script. Which Python data types make the comparison almost trivial, and how do you run it without breaking the server's own Python?",
  "simple": "Python is a programming language many admins use when a job gets too fiddly for shell commands. It has different kinds of containers for data. A list is like a numbered queue of people: order matters and the same name can appear twice. A set is like a guest list at a party: each name appears once, and you can easily ask who is on one list but not the other. A dictionary is like a phone book: you look up a name and get a value, such as a phone number. A virtual environment is a private toolbox for one project, so the extra tools you install for it do not get mixed up with the tools the operating system itself relies on. pip is the command that fetches those extra tools.",
  "body": [
   "Bash is ideal for gluing commands together, but once a task involves structured data, APIs (application programming interfaces) or more complex logic, Python is usually easier to write and maintain. Linux+ expects admin-level Python: reading basic code, choosing the right data type, managing packages in isolated environments and running scripts correctly. You do not need to be a developer, but you should be able to look at a short script and predict what it does.",
   "Python's basic types are `int` (whole numbers), `float` (decimals), `str` (text, in single or double quotes), `bool` (`True` or `False`, capitalized) and `None` (no value). Variables are created by assignment and are dynamically typed, so `port = 22` makes an int and the type comes from the value, not a declaration. Convert with `int('22')`, `str(22)` and `float()`. `'22' + 1` raises a TypeError because Python will not mix strings and numbers silently, which matters when you read numbers from a file, since everything read from text starts as a string. f-strings format text: `f'{host} uses port {port}'`. Indentation, conventionally four spaces, defines code blocks, so inconsistent indentation is a syntax error rather than a style issue.",
   "Collections are where Python shines. A list is an ordered, changeable sequence: `hosts = ['web01', 'web02']`, with `hosts.append('db01')`, `hosts[0]` for the first item and slicing like `hosts[1:]` for everything after it. A tuple is ordered but unchangeable: `('10.0.0.1', 22)`, useful for fixed records such as an address and port pair. A set is an unordered collection of unique items, ideal for removing duplicates and comparing groups: `set(ips)` deduplicates, and `a - b` (difference), `a & b` (intersection) and `a | b` (union) answer questions like which users exist on server A but not B. Membership tests with `in` are fast on sets, even with many thousands of items.",
   "A dictionary (dict) maps keys to values: `ports = {'ssh': 22, 'https': 443}`. Read a value with `ports['ssh']`, or use `ports.get('ftp', 0)` to avoid a KeyError when a key is missing, since `get` returns the default you supply. Loop over pairs with `for name, num in ports.items():`. JSON (JavaScript Object Notation) data from APIs maps naturally onto dicts and lists through the `json` module, with `json.load` to read and `json.dump` to write, which is why dicts appear in almost every automation script that talks to a web service.",
   "Control flow reads like Bash with colons and indentation: `if`, `elif` and `else`, `for item in collection:`, `while condition:`, and functions defined with `def name(args):` and `return`. Handle errors with `try:` and `except FileNotFoundError:` rather than letting a script crash with a traceback. Useful standard library modules include `os` and `pathlib` (files and paths), `subprocess` (run commands, preferably with an argument list rather than `shell=True` to avoid injection), `sys` (arguments in `sys.argv`, exit codes with `sys.exit(1)`), `json`, `re` (regular expressions), `logging` and `argparse` (command-line options).",
   "A virtual environment isolates a project's packages from the system Python and from other projects. `python3 -m venv .venv` creates one, `source .venv/bin/activate` activates it (your prompt changes to show the environment name), and `deactivate` leaves it. While it is active, `pip install requests` installs into the venv only. `pip freeze > requirements.txt` records exact versions and `pip install -r requirements.txt` recreates them elsewhere. Installing packages into the system Python with sudo pip can break distribution tools that depend on it, which is why many distributions now refuse it with an 'externally managed environment' message and point you to a venv or the distribution's own packages. Run a script with `python3 script.py`, or add a shebang `#!/usr/bin/env python3`, make it executable and run `./script.py`. For a venv-specific script, point the shebang or command at `.venv/bin/python`, which works even when the venv is not activated, such as from cron. The guard `if __name__ == '__main__':` runs main code only when the file is executed directly, not when imported, and `python3 -m module` runs a module as a script.",
   "Consider a worked example. You must find accounts present on the old file server but missing on the new one. You save `getent passwd` output from each server, then write a script that reads each file, splits each line on `:`, and builds two sets of usernames. `print(sorted(old - new))` lists the missing accounts in order. You build a dict mapping each missing user to their shell for the migration report, and use `json.dump` to write it for the ticket. The script lives in a venv with its one dependency recorded in `requirements.txt`, so a colleague can recreate the same environment. Common mistakes to avoid include mixing tabs and spaces; using a list when you need uniqueness, then deduplicating by hand; indexing a dict with a missing key instead of using `.get()`; installing packages globally with sudo pip; forgetting to activate the venv, so the script cannot find a module (`ModuleNotFoundError`); building shell commands as strings with `shell=True` from untrusted input; and comparing a string read from a file with an int without converting it.",
   "Exam questions map needs to types and tools. 'Remove duplicates' or 'which items are in A but not B' is a set. 'Look up a value by name' is a dict. 'Ordered collection that must not change' is a tuple. 'Isolate project dependencies' is `python3 -m venv`, and 'reproduce installed versions' is `pip freeze` with `requirements.txt`. 'Run a system command safely' is `subprocess.run` with a list. 'Code runs only when executed directly' is the `__name__ == '__main__'` guard."
  ],
  "analogy": "A virtual environment is like giving each project its own labeled toolbox instead of everyone grabbing from the building's shared tool wall. If one project needs an older wrench, it keeps it in its own box, and nobody swaps out the wrench the building maintenance crew (the operating system's own tools) depends on. requirements.txt is the packing list taped inside the lid, so a colleague can fill an identical box. The analogy stops in one place: the venv still uses the system's Python interpreter version it was created with, so it is not a separate copy of everything.",
  "terms": [
   [
    "list vs tuple",
    "Both are ordered sequences; lists can be changed, tuples cannot."
   ],
   [
    "set",
    "An unordered collection of unique items supporting union, intersection and difference."
   ],
   [
    "dict",
    "A mapping of keys to values, read with d[key] or d.get(key, default)."
   ],
   [
    "venv",
    "A Python virtual environment that isolates a project's installed packages from the system Python."
   ],
   [
    "pip",
    "The Python package installer, used inside a venv to install libraries."
   ],
   [
    "requirements.txt",
    "A file listing exact package versions so an environment can be recreated with pip install -r."
   ],
   [
    "subprocess.run",
    "The standard way to run an external command from Python, safest when given an argument list."
   ]
  ],
  "example": "You must find accounts present on the old file server but missing on the new one. A short Python script reads usernames from each server's getent passwd output into two sets and prints sorted(old - new). Running it from a venv with its dependencies pinned in requirements.txt lets a colleague rerun the same check next month without touching the system Python.",
  "mistakes": [
   [
    "Use a list and loop over it to remove duplicates.",
    "A set removes duplicates automatically with set(items) and makes comparisons like old - new a single expression."
   ],
   [
    "sudo pip install is the quickest way to make a library available.",
    "It can overwrite packages the distribution's own tools rely on. Create a venv with python3 -m venv and install there, or use the distribution's package."
   ],
   [
    "port = input('Port: ') followed by if port > 1024: works.",
    "input and file reads return strings, so compare after converting with int(port)."
   ],
   [
    "subprocess.run('ping -c1 ' + host, shell=True) is fine for admin scripts.",
    "Building a command string for the shell lets special characters in host inject commands. Pass a list such as ['ping', '-c1', host] without shell=True."
   ]
  ],
  "tryit": [
   [
    "You need a script that maps each of 300 hostnames to its owner's email address and lets you quickly look up the owner of any given host. Your colleague suggests two parallel lists, one of hosts and one of emails. Which data type would you choose instead, and why?",
    "A dict with hostnames as keys and emails as values. Lookups by name are direct with owners[host] or owners.get(host), there is no risk of the two lists falling out of alignment, and it converts directly to JSON for reports."
   ],
   [
    "A script works when you run it by hand in your terminal but fails from cron with ModuleNotFoundError: No module named 'requests'. You installed requests into a venv in the project folder. What is the likely cause, and how do you fix it?",
    "Cron uses the system python3, not the activated venv, so the package is not visible. Point the cron entry or the script's shebang at the venv's interpreter, for example /opt/tool/.venv/bin/python script.py."
   ]
  ],
  "tip": "Pick the data type by need: a set for uniqueness and comparisons, a dict for key-value lookups, a list when order and duplicates matter, and a tuple for fixed records. Use a venv, not sudo pip.",
  "check": [
   [
    "Which Python type automatically removes duplicate IP addresses from a list?",
    "A set, for example set(ip_list)."
   ],
   [
    "How do you create and activate a virtual environment named .venv?",
    "python3 -m venv .venv then source .venv/bin/activate."
   ],
   [
    "Why use subprocess.run(['ls', path]) instead of subprocess.run('ls ' + path, shell=True)?",
    "Passing an argument list avoids the shell, so special characters in path cannot inject extra commands."
   ],
   [
    "ports['ftp'] raises an error but ports.get('ftp', 0) does not. Why?",
    "Indexing a missing key raises KeyError, while get returns the supplied default when the key is absent."
   ],
   [
    "How do you record the exact package versions installed in a venv so someone else can recreate it?",
    "pip freeze > requirements.txt, then they run pip install -r requirements.txt in their own venv."
   ]
  ]
 },
 {
  "t": "Git: clone, branch/switch, add, commit, merge, rebase, revert, pull requests",
  "hook": "At 9:10 a.m. the help desk at Summit Ridge Credit Union lights up: nobody can resolve internal hostnames. Within minutes the team traces it to last night's change to the shared Ansible repository, a commit by Sam that pushed a broken resolver template to every server. Sam is on a flight. Someone suggests running `git reset --hard` to the commit before Sam's and force-pushing, because \"that makes it like it never happened.\" Another colleague, Lin, winces. Three other people have already pulled main this morning, and two of them have built new work on top of it. You need DNS fixed in the next ten minutes without wrecking anyone else's copy of the repository. Which Git command undoes the damage safely, and why is the first suggestion so dangerous?",
  "simple": "Git is a time machine for files. Every time you save a meaningful step, called a commit, Git takes a snapshot you can return to later. Before taking the snapshot, you choose which changes go into it, like placing items on a table before photographing them. A branch is a separate track where you can try changes without disturbing the main version, like drafting a letter on scrap paper before copying it neatly. When the draft is ready, you combine it back into the main version. If something goes wrong after everyone has a copy, the polite fix is to add a new snapshot that undoes the bad one, rather than tearing pages out of the shared history. A pull request is asking teammates to look over your draft before it joins the main copy.",
  "body": [
   "Git is a distributed version control system: every copy of a repository contains the full history, and you record changes as commits. Admins use Git for scripts, configuration management code, infrastructure definitions and documentation, and it underpins GitOps and CI/CD (continuous integration and continuous delivery). Linux+ expects everyday Git fluency: getting a repository, recording changes, working on branches, combining work and undoing mistakes safely. The distinction that matters most on the exam is between commands that add to history and commands that rewrite it.",
   "Git has three areas: the working tree (your files), the staging area or index (changes prepared for the next commit) and the repository history. `git clone <url>` copies a remote repository, including its full history, and sets up a remote named `origin`. `git init` starts a new repository in the current directory. `git status` shows what changed and what is staged, and `git diff` shows unstaged changes, while `git diff --staged` shows staged ones. Set your identity once with `git config --global user.name 'Your Name'` and `git config --global user.email`, because every commit records an author.",
   "Recording work follows a rhythm. `git add file` stages changes, `git add -p` lets you stage only parts of a file, and `git commit -m 'message'` records the staged snapshot. Write messages that explain why the change was made, since the diff already shows what changed. `git log --oneline --graph` shows history compactly. `git push` sends commits to the remote and `git pull` fetches and integrates remote changes; `git fetch` only downloads without changing your branch, so you can inspect incoming work first. A `.gitignore` file lists files Git should not track, such as build output or local secrets.",
   "Branches are lightweight pointers that let you work in isolation. `git branch` lists them, `git branch feature-x` creates one, and `git switch feature-x` moves to it; `git switch -c feature-x` does both at once. The older `git checkout` does the same and more, so `git checkout -b feature-x` is equivalent. Keep the main branch stable and do your work in short-lived feature branches that are merged once reviewed.",
   "There are two ways to combine branches. `git merge feature-x`, run from main, joins the histories. If main has not moved since the branch was created, Git performs a fast-forward and simply moves the pointer; otherwise it creates a merge commit with two parents. `git rebase main`, run from the feature branch, replays your commits on top of the latest main, producing a linear history but with new commit IDs. Because rebasing rewrites history, never rebase commits others have already pulled. Either approach can produce conflicts when both sides changed the same lines. Git marks them with `<<<<<<<`, `=======` and `>>>>>>>` in the file; you edit to the correct result, `git add` it, and continue with `git commit` or `git rebase --continue`. `git merge --abort` or `git rebase --abort` returns you to where you started.",
   "Undoing changes also comes in two styles. `git revert <commit>` creates a new commit that reverses an earlier one, safe for shared branches because history is preserved and nobody's copy is invalidated. `git reset` moves the branch pointer backward: `--soft` keeps the changes staged, `--mixed` (the default) keeps them unstaged, and `--hard` discards them. Reset rewrites history and belongs to local, unpushed work. For files, `git restore file` discards uncommitted edits, `git restore --staged file` unstages it, and `git stash` temporarily shelves work in progress so you can switch tasks.",
   "A pull request (called a merge request on some platforms) is not a Git command but a hosting-platform workflow. You push a branch and ask for it to be merged. Teammates review the diff and comment, automated checks run, and once approved the branch is merged. Branch protection rules can require reviews and passing checks before anything reaches main, bringing formal change control to infrastructure code.",
   "Consider a worked example. You clone the team's Ansible repository, run `git switch -c fix-ntp`, edit the chrony template and run `git add -p` to stage only the relevant lines. `git commit -m 'Use internal NTP pool for chrony'` records it, and `git push -u origin fix-ntp` publishes the branch. You open a pull request; the pipeline lints the playbook and a colleague approves, so the branch is merged. The next day a different commit on main turns out to break DNS settings on every server. Rather than rewriting shared history with reset, you run `git revert <commit-id>` and push, and the pipeline reapplies the corrected configuration. Both the mistake and its reversal remain visible in `git log` for the review. Common mistakes include committing secrets, which stay in history even after a later commit deletes them; forgetting to stage a file; running `git reset --hard` or rebasing on a shared branch and force-pushing, which breaks everyone else's copy; confusing `fetch` with `pull`; leaving conflict markers in a file; and working directly on main.",
   "Exam wording is usually direct. 'Copy a remote repository' is `git clone`. 'Prepare changes for the next commit' is `git add` and the staging area. 'Create and move to a branch' is `git switch -c` or `git checkout -b`. 'Linear history' points to rebase, and 'preserve both histories with a merge commit' to merge. 'Undo a pushed commit safely' is `git revert`, while 'discard local commits' is `git reset`. 'Download without changing the working branch' is `git fetch`. 'Peer review before merging' is a pull request."
  ],
  "analogy": "Think of a shared team logbook written in pen. `git revert` is adding a new entry that says \"the entry on page 12 was wrong; here is the correction.\" Everyone's photocopy of the logbook still lines up, and the record of the mistake stays honest. `git reset --hard` with a force push is tearing out page 12 and renumbering the rest, which leaves everyone holding copies that no longer match. Rebase is similar to rewriting your own draft pages neatly before they go into the logbook, which is fine only while nobody else has copied them.",
  "terms": [
   [
    "Commit",
    "A recorded snapshot of staged changes with an author, message and unique ID."
   ],
   [
    "Staging area",
    "The index where changes are prepared with git add before being committed."
   ],
   [
    "Branch",
    "A movable pointer to a line of commits, used to work on changes in isolation."
   ],
   [
    "merge vs rebase",
    "merge joins histories, possibly with a merge commit; rebase replays commits onto a new base for a linear history with new IDs."
   ],
   [
    "git revert",
    "Creates a new commit that undoes an earlier one without rewriting history."
   ],
   [
    "git reset",
    "Moves the branch pointer to an earlier commit, rewriting local history; --hard also discards changes."
   ],
   [
    "git fetch vs git pull",
    "fetch downloads remote changes only; pull fetches and then integrates them into the current branch."
   ],
   [
    "Pull request",
    "A hosting-platform request to review and merge a pushed branch, often gated by checks and approvals."
   ]
  ],
  "example": "A colleague's commit to the shared Ansible repository broke DNS settings on all servers. Rather than rewriting shared history with reset, you run git revert <commit-id>, push the fix, and the pipeline reapplies the corrected configuration. The mistake and its reversal both stay visible in git log for the post-incident review.",
  "mistakes": [
   [
    "git reset --hard is the right way to undo a bad commit on main.",
    "On a shared branch, reset plus a force push rewrites history others have pulled. Use git revert, which adds a new undoing commit."
   ],
   [
    "git fetch updates the files in my working branch.",
    "fetch only downloads remote commits. git pull, or a merge or rebase after fetch, integrates them."
   ],
   [
    "Deleting a committed password in a later commit removes it.",
    "The secret remains in history and in every clone. Rotate the credential and keep secrets out of the repository in the first place."
   ],
   [
    "Rebase and merge produce the same result, so it does not matter which you use on shared work.",
    "Rebase creates new commit IDs and rewrites history; use it only on local, unpublished commits. Merge preserves existing history."
   ]
  ],
  "tryit": [
   [
    "You have been working on a local branch for two days and have not pushed it. Main has moved on with several commits from teammates, and your lead prefers a clean, linear history in pull requests. Should you merge main into your branch or rebase onto main, and is it safe?",
    "Rebase your branch onto main with git rebase main. Because your commits have not been pushed or shared, rewriting them is safe, and the result is a linear history that is easy to review. Resolve any conflicts, git add the files, and run git rebase --continue."
   ],
   [
    "You edited three files, but only one belongs in the next commit. The other two contain half-finished experiments you want to keep for later. How do you commit just the one file and set the others aside?",
    "Stage only the wanted file with git add file (or git add -p for part of a file) and commit it. Then shelve the remaining edits with git stash, restoring them later with git stash pop."
   ]
  ],
  "tip": "For shared branches, choose revert over reset and merge over rebase; history-rewriting commands belong only on local, unpublished work.",
  "check": [
   [
    "Which command creates and switches to a new branch named fix-dns?",
    "git switch -c fix-dns (or git checkout -b fix-dns)."
   ],
   [
    "What is the difference between git fetch and git pull?",
    "fetch downloads remote changes without altering your branch; pull fetches and then merges or rebases them into your current branch."
   ],
   [
    "How do you record only the staged changes with a message?",
    "git commit -m 'message'."
   ],
   [
    "Why is git revert preferred to git reset for a commit already pushed to main?",
    "revert adds a new commit and keeps shared history intact, while reset rewrites history that others have already pulled."
   ],
   [
    "What do the markers <<<<<<<, ======= and >>>>>>> in a file mean?",
    "A merge or rebase conflict; you edit the file to the correct content, remove the markers, git add it and continue."
   ]
  ]
 },
 {
  "t": "Ansible: inventory, ad hoc commands, playbooks, idempotence, roles, ansible-vault",
  "hook": "Friday at 4 p.m., the security team at Pinewood Health Network sends a directive: disable SSH password logins on all 60 Linux servers before Monday. Nadia, the other admin, starts opening terminal tabs and editing sshd_config by hand. By server 12 she has made two typos, and one server refused new connections until she fixed it from the console. You suggest a different approach: describe the desired sshd_config once, test it against one host, and push it to all 60 in a single run. Nadia is skeptical. \"And if we run it again next week, will it restart sshd on everything again and break something?\" How does a tool that needs nothing installed on the servers make this change consistent, repeatable and safe to run twice?",
  "simple": "Ansible is a remote-control system for many computers at once. You keep a list of your servers, grouped by job, like a class roster sorted into teams. Then you write down how each server should look, such as \"this package installed, this setting off,\" in a plain text recipe called a playbook. Ansible connects to each server over SSH, the same secure connection admins already use, checks how things are, and changes only what does not match. If you run the same recipe again and everything is already correct, it changes nothing, like a thermostat that only turns on the heat when the room is too cold. Passwords used in the recipe can be locked in an encrypted file so they are never stored as plain text.",
  "body": [
   "Ansible is an agentless configuration management and automation tool. A control node connects to managed hosts over SSH (or WinRM, Windows Remote Management, for Windows), pushes small programs called modules, runs them and removes them. Nothing needs to be installed on managed Linux hosts except SSH and Python, which makes Ansible easy to adopt on existing servers. Linux+ uses it as the main example of automated configuration, so learn its vocabulary: inventory, module, task, play, playbook, handler, role and vault.",
   "The inventory lists the hosts Ansible manages and groups them. It can be written in INI or YAML format, for example `/etc/ansible/hosts` or a project `inventory` file. Groups let you target many hosts at once, and the special group `all` includes every host. Host patterns select targets precisely: `web:db` means hosts in either group, `web:&prod` means hosts in both, and `all:!db` means everything except db. Variables can be set per host, per group, or in `group_vars/` and `host_vars/` directories next to the inventory. Dynamic inventories query clouds or CMDBs (configuration management databases) for the current list of hosts. `ansible-inventory --graph` shows the structure, and `ansible.cfg` sets defaults such as the inventory path and remote user.",
   "```ini\n[web]\nweb01.example.com\nweb02.example.com\n\n[db]\ndb01.example.com ansible_user=admin\n```",
   "Ad hoc commands run a single module for quick tasks. `ansible all -m ping` tests connectivity; it is an Ansible module check over SSH that confirms login and Python, not an ICMP (Internet Control Message Protocol) ping. `ansible web -m ansible.builtin.dnf -a 'name=nginx state=present' -b` installs a package with privilege escalation, where `-b` means become, usually through sudo. `ansible db -a 'uptime'` uses the command module by default. `ansible-doc dnf` shows any module's options and examples, which is the fastest way to check a parameter name.",
   "Playbooks are YAML files describing desired state as plays and tasks. Each play targets a host pattern, and each task calls a module with parameters. Handlers are tasks that run only when notified by a change, such as reloading a service after its configuration file changes, and they run once at the end of the play even if several tasks notify them. Run a playbook with `ansible-playbook site.yml`. `--check` does a dry run, `--diff` shows file changes line by line, `--syntax-check` validates the YAML and structure, and `--limit web01` restricts targets. Output reports each task per host as ok (already correct), changed or failed, followed by a recap line per host with the totals.",
   "Idempotence is the key idea: running the same playbook again should change nothing if the system is already in the desired state. Modules like `dnf`, `apt`, `copy`, `template`, `user`, `service` and `lineinfile` check the current state first and act only if needed, so a second run reports ok. The `command` and `shell` modules are not idempotent by themselves, because they simply run whatever you give them every time, so prefer purpose-built modules or add guards such as `creates:` or `removes:`. Idempotence is what makes it safe to rerun a playbook on a schedule to correct drift.",
   "Roles package reusable automation into a standard directory structure: `tasks/`, `handlers/`, `templates/` (Jinja2 templates), `files/`, `vars/`, `defaults/` and `meta/`. `ansible-galaxy init myrole` creates the skeleton, and collections bundle roles and modules for reuse. A playbook applies roles with a `roles:` list. Secrets such as passwords and API keys should never sit in plain text in a repository. `ansible-vault create`, `edit`, `encrypt`, `decrypt` and `view` manage files encrypted with AES (Advanced Encryption Standard), `--ask-vault-pass` or `--vault-password-file` supplies the key at run time, and `ansible-vault encrypt_string` encrypts a single value to paste into a variables file.",
   "Consider a worked example. To roll out a hardened sshd_config to 60 servers, you create a role with `ansible-galaxy init sshd_hardening`. Its task uses the `template` module to render `sshd_config.j2` with `validate: sshd -t -f %s`, so a bad file is never installed, and notifies a handler named `reload sshd`. You run `ansible-playbook site.yml --check --diff --limit web01` first, review the diff, then run it for all hosts. The first run reports changed on every host and the handler fires; a second run reports only ok, proving idempotence. The shared admin password used by another task lives in a vault-encrypted `group_vars/all/vault.yml`. Common mistakes include using `shell` for everything, which makes playbooks non-idempotent; YAML indentation errors, caught by `--syntax-check` or `ansible-lint`; restarting services on every run instead of using handlers; forgetting `-b` when a task needs root; committing unencrypted secrets or the vault password file; expecting `ansible -m ping` to test ICMP; and targeting `all` when you meant one group.",
   "Exam questions use clear signals. 'Agentless, uses SSH' is Ansible. 'List of managed hosts and groups' is the inventory. 'One-off task across many servers' is an ad hoc command. 'Running twice makes no further changes' is idempotence. 'Run only when a configuration file changes' is a handler. 'Reusable structure of tasks, templates and defaults' is a role. 'Encrypt a password used by a playbook' is `ansible-vault`. 'Preview changes without applying' is `--check`."
  ],
  "analogy": "An idempotent playbook is like a checklist a hotel housekeeper uses: \"towels: two on the rack; bed: made; minibar: full.\" In a room that is already perfect, she checks each line and touches nothing. In a messy room, she fixes only what is wrong. A `shell` task is more like an instruction that says \"add two towels,\" which piles up extra towels every visit. Handlers are the note \"if you changed the sheets, tell the front desk,\" sent once, not after every item. Where it stops: Ansible only manages what you listed, so anything not on the checklist can still drift.",
  "terms": [
   [
    "Inventory",
    "The list of managed hosts and groups, in INI or YAML, optionally with host and group variables."
   ],
   [
    "Module",
    "A small unit of work, such as dnf or copy, that Ansible pushes to a host and runs."
   ],
   [
    "Ad hoc command",
    "A single module run from the command line against a host pattern, such as ansible all -m ping."
   ],
   [
    "Playbook",
    "A YAML file of plays and tasks describing the desired state of target hosts."
   ],
   [
    "Handler",
    "A task that runs only when notified by a change, typically to restart or reload a service."
   ],
   [
    "Idempotence",
    "The property that repeating an operation leaves an already-correct system unchanged."
   ],
   [
    "Role",
    "A reusable, standard directory structure of tasks, handlers, templates, files, variables and defaults."
   ],
   [
    "ansible-vault",
    "The tool that encrypts files or strings containing secrets for use in playbooks."
   ]
  ],
  "example": "To roll out a hardened sshd_config to 60 servers, you write a role with a template task that notifies a 'reload sshd' handler. The first ansible-playbook run reports changed on every host; a second run reports only ok, proving idempotence. The shared admin password used by one task is stored in a vault-encrypted group_vars file and supplied with --ask-vault-pass.",
  "mistakes": [
   [
    "ansible all -m ping failing means the hosts are down, and succeeding means ICMP is allowed.",
    "The ping module tests SSH login and Python on the host, not ICMP. A host can block ICMP and still pass, or answer ICMP and fail because of SSH or Python problems."
   ],
   [
    "Ansible needs an agent installed on each managed Linux server.",
    "Ansible is agentless. Managed Linux hosts need only SSH and Python; modules are pushed and removed for each run."
   ],
   [
    "Using shell: systemctl restart nginx as a task is fine for applying config changes.",
    "It restarts on every run and is not idempotent. Use a handler notified by the template or copy task so the restart happens only when the file changes."
   ],
   [
    "Storing the database password in group_vars is safe because the repository is private.",
    "Plain-text secrets can leak through clones, backups or access changes. Encrypt them with ansible-vault and keep the vault password out of the repository."
   ]
  ],
  "tryit": [
   [
    "You need to install the chrony package on hosts that are in both the web group and the prod group, right now, without writing a playbook. Which command would you run?",
    "An ad hoc command with an intersection pattern and privilege escalation, for example ansible 'web:&prod' -m ansible.builtin.dnf -a 'name=chrony state=present' -b. The :& pattern selects hosts in both groups, and -b uses become because installing requires root."
   ],
   [
    "A playbook task uses the command module to run a script that creates /opt/app/initialized when it finishes. Every run reports changed, and the script sometimes fails when run twice. How would you make the task idempotent?",
    "Add creates: /opt/app/initialized to the task so Ansible skips it when the file already exists, or replace the script with purpose-built modules that check state first. The task will then report ok on later runs."
   ]
  ],
  "tip": "Ansible is agentless and push-based over SSH; when a question contrasts it with Puppet or Chef, that difference is usually the point. command and shell are not idempotent unless guarded.",
  "check": [
   [
    "What does ansible web -m ping actually test?",
    "That Ansible can connect to hosts in the web group over SSH and run a module with Python; it is not an ICMP ping."
   ],
   [
    "Why are the command and shell modules considered non-idempotent?",
    "They run every time regardless of current state, unless guarded with options such as creates or removes."
   ],
   [
    "How should a database password used in a playbook be stored?",
    "Encrypted with ansible-vault, and decrypted at run time with a vault password."
   ],
   [
    "How do you preview what a playbook would change without changing anything?",
    "Run ansible-playbook with --check, adding --diff to see file content changes."
   ],
   [
    "Which command creates the standard directory skeleton for a new role named nginx?",
    "ansible-galaxy init nginx."
   ]
  ]
 },
 {
  "t": "Puppet and other agent-based tools; OpenTofu/Terraform plan and apply",
  "hook": "Wednesday, 2 p.m., change review at Lakeview Transit Authority. Omar's pull request renames a block in the infrastructure code that manages the load balancer and its DNS records. It looks like a tidy cleanup. The pipeline has posted the output of `tofu plan` as a comment, and most reviewers skim past it. Grace scrolls down and stops at one line marked with a minus sign: the production DNS record for the ticketing site is scheduled to be destroyed and recreated. Meanwhile, on the web servers, someone edited `/etc/motd` by hand an hour ago, and it has already quietly changed back. Two tools, two very different models. What is each one doing behind the scenes, and what should happen before anyone types apply?",
  "simple": "There are two related jobs in automation. The first is building the house: creating the servers, networks and cloud resources themselves. Tools like OpenTofu and Terraform do this from a written description, and they always show you a preview, called a plan, before they make changes, like an architect's drawing you approve before construction starts. The second job is keeping each house tidy inside: the right software installed and the right settings in place. Puppet does this with a small helper program, an agent, living on every server. Every so often the agent phones the main server, asks \"how should I look?\", and fixes anything that has drifted, a bit like a cleaning service that visits on a schedule whether or not anyone calls.",
  "body": [
   "Configuration management and infrastructure provisioning are related but different jobs. Configuration management tools keep the software and settings inside existing servers correct. IaC (infrastructure as code) provisioning tools create the servers, networks and cloud resources themselves. Linux+ expects you to know examples of each, how they operate, and which model a scenario describes, so focus on three contrasts: agent versus agentless, push versus pull, and preview versus apply.",
   "Puppet is a classic agent-based configuration management tool. A Puppet agent runs on each managed node and periodically, by default every 30 minutes, contacts a Puppet server (historically called the master). At the start of a run the agent sends facts about the node, gathered by a tool called Facter, such as its operating system, hostname and IP addresses. The server uses those facts to compile a catalog describing that node's desired state and sends it back. The agent then enforces the catalog and reports the results. This pull model means nodes correct drift automatically on each run, even if nobody launches a job.",
   "Puppet code is written in a declarative DSL (domain-specific language) in manifests (`.pp` files) grouped into modules. You describe resources such as `package`, `file`, `service` and `user` and the state they should be in, rather than the steps to get there. Agents and the server authenticate each other with certificates, so a new node's certificate must be signed before it receives catalogs. `puppet agent -t` triggers a run immediately and shows what changed, and `--noop` shows what would change without enforcing it, which is Puppet's equivalent of a dry run.",
   "Other tools follow similar patterns. Chef is another agent-based tool, using Ruby-based recipes grouped into cookbooks. SaltStack (Salt) uses minions that connect to a master, though it can also run agentless over SSH. Compared with Ansible, agent-based tools need software installed and maintained on every node and a central server, but they scale well and enforce state continuously. Ansible is agentless and push-based: nothing runs until you execute a playbook.",
   "Terraform, from HashiCorp, and OpenTofu, an open-source fork maintained under the Linux Foundation, are declarative IaC provisioning tools that share the same language and workflow. You describe resources such as virtual machines, networks, DNS records and load balancers in HCL (HashiCorp Configuration Language) files ending in `.tf`. Providers are plug-ins that talk to specific platforms, such as a cloud provider or a hypervisor, and variables and outputs make configurations reusable. The workflow uses a few commands, `tofu` for OpenTofu and `terraform` for Terraform. `init` downloads providers and prepares the working directory. `fmt` and `validate` tidy and check the code. `plan` compares the configuration with the recorded state and real infrastructure and shows what will be created (+), changed in place (~) or destroyed (-), without changing anything. `apply` performs the changes, prompting for confirmation unless auto-approved, and `destroy` removes everything the configuration manages. Saving a plan with `plan -out=tfplan` and then running `apply tfplan` guarantees that what is applied is exactly what was reviewed.",
   "Both tools keep a state file that maps configuration to real resource IDs. State can contain sensitive values, so teams store it in a secured remote backend with locking to prevent two people applying at once, rather than committing it to Git. Changes made outside the tool create drift, which the next plan will reveal and try to reverse. In practice the tools combine: OpenTofu or Terraform provisions the VMs and network, then Ansible or Puppet configures the operating system and applications inside them, with all the code stored in Git and run through a pipeline.",
   "Consider a worked example. Before a change to the load balancer configuration, a pipeline runs `tofu plan -out=tfplan`, which shows one resource to change and, unexpectedly, one to destroy. A reviewer notices that a renamed resource block would delete and recreate the production DNS record. She fixes the code with a `moved` block so the existing resource is kept under its new name, the new plan shows only the intended change, and `tofu apply tfplan` applies exactly what was reviewed. Meanwhile, Puppet agents on the new web servers pull their catalogs every half hour, and when someone edits `/etc/motd` by hand, the next run quietly restores it. Common mistakes include running apply without reading the plan, especially destroy lines; committing state files that contain secrets; editing cloud resources by hand and being surprised when the next apply reverts them; confusing Puppet's server-compiled catalog with Ansible's pushed modules; assuming an agent-based tool needs someone to launch each run; and thinking provisioning tools replace configuration management, when they usually work together.",
   "Exam wording separates the models. 'Agent checks in periodically and corrects drift' is Puppet or another agent-based pull tool. 'Facts' and 'catalog' are Puppet terms. 'Agentless over SSH' is Ansible. 'Provision cloud infrastructure declaratively' is OpenTofu or Terraform. 'Preview changes' is `plan`, 'make the changes' is `apply`, and 'download providers' is `init`. 'Maps code to real resources and needs locking' is the state file."
  ],
  "analogy": "The plan and apply workflow is like a contractor's estimate. Before any work starts, the contractor walks through your house, compares it with the blueprint and hands you a list: add one window, repaint the hall, and remove the back porch. That last line is your chance to say \"wait, why?\" before a crew shows up with sledgehammers. apply is signing the estimate. The state file is the contractor's record of what they built. The analogy stops at Puppet: there, the cleaning crew returns on its own every half hour without asking for a signature.",
  "mnemonic": "I Plan Ahead: Init, Plan, Apply. That is the core OpenTofu/Terraform order: init downloads providers, plan previews the changes, and apply makes them.",
  "terms": [
   [
    "Agent-based configuration management",
    "A model where software on each node pulls and enforces its configuration from a central server."
   ],
   [
    "Puppet catalog",
    "The compiled description of a node's desired state that the Puppet server sends to the agent."
   ],
   [
    "Facter",
    "The Puppet tool that gathers facts about a node, such as OS and IP addresses."
   ],
   [
    "Manifest",
    "A Puppet code file with the .pp extension that declares resources and their desired state."
   ],
   [
    "Infrastructure as code",
    "Defining servers, networks and other resources in version-controlled declarative files."
   ],
   [
    "plan",
    "The OpenTofu/Terraform command that previews creations, changes and destructions without applying them."
   ],
   [
    "State file",
    "The record mapping configuration to real resource IDs, kept in a secured, locked backend."
   ],
   [
    "Drift",
    "Differences between the declared configuration and the real system, often caused by manual changes."
   ]
  ],
  "example": "Before a change to the load balancer configuration, a pipeline runs tofu plan, which shows one resource to change and, unexpectedly, one to destroy. A reviewer catches that a renamed resource would delete the production database's DNS record, fixes the code to move the resource in state instead, and only then approves tofu apply.",
  "mistakes": [
   [
    "Puppet, like Ansible, pushes changes only when an admin runs a job.",
    "Puppet agents pull their catalogs on a schedule, by default every 30 minutes, and enforce state automatically. Ansible is the push-based, run-on-demand tool."
   ],
   [
    "tofu plan makes the changes, and apply just confirms them.",
    "plan only previews. apply makes the changes, and running apply on a saved plan file applies exactly what was reviewed."
   ],
   [
    "The state file is just a cache, so committing it to Git is convenient.",
    "State can contain secrets and needs locking for team use. Store it in a secured remote backend, not in the repository."
   ],
   [
    "Once OpenTofu builds the servers, you no longer need configuration management.",
    "Provisioning creates the resources; tools like Ansible or Puppet still configure the operating system and applications inside them. They usually work together."
   ]
  ],
  "tryit": [
   [
    "A plan output shows 3 to add, 1 to change and 2 to destroy, but the pull request description says it only adds a firewall rule. The pipeline is set to auto-approve on merge. What should the reviewer do?",
    "Stop the merge and investigate the destroy and change lines before anything is applied. Find out why existing resources would be replaced, for example a rename or a changed attribute that forces replacement, fix the code (a moved block for a rename), rerun plan until it shows only the intended change, then apply the saved plan."
   ],
   [
    "Your organization wants every server to correct unauthorized configuration changes automatically within an hour, even if no admin is online. Would an agent-based tool like Puppet or an agentless tool like Ansible run manually fit that requirement better, and why?",
    "Puppet fits naturally, because its agents check in on a schedule, by default every 30 minutes, and enforce the catalog without anyone launching a run. Ansible could achieve something similar only if you schedule playbook runs yourself, for example from a pipeline or timer."
   ]
  ],
  "tip": "Distinguish the models: Puppet is agent-based and pull; Ansible is agentless and push; OpenTofu/Terraform provision infrastructure, where plan previews and apply makes changes.",
  "check": [
   [
    "What does a Puppet agent send to the server at the start of a run?",
    "Facts about the node collected by Facter, which the server uses to compile the node's catalog."
   ],
   [
    "Which OpenTofu/Terraform command shows proposed changes without making them?",
    "plan."
   ],
   [
    "Why should the state file not be committed to a public Git repository?",
    "It may contain sensitive data such as passwords or keys and needs locking for safe team use; it belongs in a secured remote backend."
   ],
   [
    "What happens on the next Puppet run after someone edits a managed file by hand?",
    "The agent detects the drift from the catalog and restores the declared content automatically."
   ],
   [
    "Which OpenTofu/Terraform command downloads providers and prepares a working directory?",
    "init."
   ]
  ]
 },
 {
  "t": "CI/CD pipelines and GitOps concepts",
  "hook": "Thursday, 5:40 p.m., at Brightwater Online Grocery, and evening order traffic is climbing. Theo, an on-call engineer, sees the checkout service struggling and scales it from three replicas to five directly in the cluster. It works, and he goes to dinner. Twenty minutes later, the replica count is back to three and checkout is slow again. Theo is sure someone undid his fix. Nobody did, at least no person. The team runs GitOps, and an automated agent compared the cluster with the Git repository, saw a difference and restored what Git says. Theo's lead, Ana, asks him to try again, this time with a pull request. Why would a team deliberately build a system that reverses a working fix, and how does that make production safer?",
  "simple": "A CI/CD pipeline is an automatic assembly line for changes. Every time someone suggests a change to code or configuration, the line runs a series of checks, like a factory testing each part before it goes into a car. If a check fails, the change is stopped before it reaches real users. When everything passes, the change is packaged and ready to release, either after a person approves it or automatically. GitOps takes this one step further: the Git repository becomes the official description of how everything should look, and a robot constantly compares the real systems with that description and fixes any difference. It is like a stage manager with a seating chart who quietly moves anyone back to their assigned seat.",
  "body": [
   "Once scripts, configuration and infrastructure live in Git, you can automate how changes are tested and delivered. CI/CD (continuous integration and continuous delivery or deployment) pipelines do this, and GitOps extends the idea so that Git becomes the single source of truth for what should be running. Linux+ covers the concepts and vocabulary rather than any one product, so learn what each stage is for and how the pieces fit together.",
   "Continuous integration means people merge small changes into a shared branch frequently, and every change triggers an automated build and test run. For admin code that might include linting shell scripts with ShellCheck, running `ansible-lint` or `yamllint`, running `tofu validate` and `plan`, building container images, running unit tests, and scanning for vulnerabilities or accidentally committed secrets. Problems are caught within minutes of being introduced, when they are cheapest to fix and the author still remembers the change, and a failing check blocks the merge. Small, frequent merges also keep conflicts small, compared with branches that drift apart for weeks.",
   "Continuous delivery means every change that passes the pipeline is packaged and ready to release, with a human approval gate before production. Continuous deployment goes one step further and releases automatically when all checks pass, with no manual gate. Deployments usually progress through environments such as development, staging and production. They also use strategies that limit risk. Rolling updates replace instances gradually, so some capacity always stays up. Blue-green deployments run two identical environments and switch traffic from the old one (blue) to the new one (green), so switching back is quick. Canary releases send a small share of traffic to the new version first and widen it only if metrics look healthy. Every pipeline should also make rollback easy.",
   "A pipeline is defined as code, usually a YAML file in the repository, such as a GitLab CI file, a GitHub Actions workflow or a Jenkinsfile. It is made of stages, such as build, test and deploy, that contain jobs. Jobs run on runners or agents, often inside containers so every run starts from a clean, known environment. Jobs are triggered by events such as a push, a pull request or a schedule, and they produce artifacts, such as a package or container image, that are passed to later stages so the exact thing that was tested is what gets deployed. Secrets like deployment keys are stored in the CI system's protected variables or a secrets manager, never in the repository, and runners should have only the permissions they need, because a compromised runner with broad rights is a direct path into production.",
   "GitOps applies these ideas to operations. The desired state, for example Kubernetes manifests or infrastructure definitions, is declared in a Git repository. Changes are made only by pull requests, which gives review, approval and a complete audit trail of who changed what and why. An automated agent, such as Argo CD or Flux in Kubernetes, continuously compares the live system with the repository and reconciles any difference. In this pull-based model, the cluster fetches its configuration rather than a pipeline pushing credentials into it, so fewer systems hold powerful production credentials.",
   "The benefits of GitOps are consistency, traceability and fast recovery. Rolling back is as simple as reverting a commit, and drift from manual changes is detected and undone. The discipline is that nobody edits production by hand; if it is not in Git, it does not exist. Emergency changes still go through Git, just with a faster review path, because a manual fix made directly in the cluster will be reverted by the reconciler, as Theo discovered.",
   "Consider a worked example. A team manages its Kubernetes applications with GitOps. An engineer opens a pull request raising a deployment's replica count from three to five. The CI pipeline validates the YAML, runs policy checks and posts the results on the pull request; a colleague approves and it is merged. Argo CD notices the new commit and scales the deployment. Later, someone edits the replica count by hand in the cluster during a busy afternoon; Argo CD flags the application as out of sync and restores the Git version. When a later release misbehaves, the team reverts its commit, and the cluster returns to the previous state within minutes. Common mistakes include confusing continuous delivery (manual gate) with continuous deployment (automatic); storing credentials in pipeline YAML; giving runners broad administrative rights; making emergency fixes directly on servers in a GitOps setup, which the reconciler will undo; skipping tests to make a pipeline faster; and treating CI as a build server only, rather than a quality gate that runs on every change.",
   "Exam wording maps cleanly. 'Automatically test every commit' is continuous integration. 'Ready to release, but a person approves production' is continuous delivery, and 'released automatically after tests pass' is continuous deployment. 'Git is the source of truth and an agent reconciles the cluster' is GitOps. 'Roll back' in GitOps means reverting the commit. 'Small percentage of users get the new version first' is canary, and 'switch between two identical environments' is blue-green."
  ],
  "analogy": "GitOps works like a building thermostat. The setting on the wall (the Git repository) is the declared temperature, and the system keeps measuring the room (the cluster) and heating or cooling until it matches. If someone props a window open, the thermostat does not argue; it simply works to bring the room back to the setting. To change the temperature for good, you change the setting, which is the pull request. The analogy stops in one way: a GitOps change also leaves a reviewed record of who changed the setting and why.",
  "terms": [
   [
    "Continuous integration",
    "Merging small changes frequently, with each change automatically built and tested."
   ],
   [
    "Continuous delivery vs deployment",
    "Delivery keeps every passing change releasable behind a manual approval; deployment releases automatically."
   ],
   [
    "Pipeline",
    "A version-controlled definition of stages and jobs that build, test and deploy changes."
   ],
   [
    "Runner",
    "The machine or container that executes pipeline jobs."
   ],
   [
    "Artifact",
    "An output of a pipeline job, such as a package or container image, passed to later stages."
   ],
   [
    "GitOps",
    "Operating systems by declaring desired state in Git and having an agent reconcile the live environment to it."
   ],
   [
    "Canary release",
    "Sending a small share of traffic to a new version before rolling it out fully."
   ],
   [
    "Blue-green deployment",
    "Running two identical environments and switching traffic from the old one to the new one, allowing quick switch-back."
   ],
   [
    "Drift",
    "A difference between the live system and the declared state, usually from manual changes."
   ]
  ],
  "example": "A team manages its Kubernetes applications with GitOps. An engineer opens a pull request raising a deployment's replica count; the CI pipeline validates the YAML and runs policy checks, a colleague approves, and after the merge Argo CD notices the new commit and scales the deployment. When someone later edits the replica count by hand in the cluster, Argo CD flags the drift and restores the Git version.",
  "mistakes": [
   [
    "Continuous delivery and continuous deployment are two names for the same thing.",
    "Delivery keeps every passing change ready but waits for a human approval before production; deployment releases automatically once checks pass."
   ],
   [
    "In a GitOps setup, the fastest rollback is to fix the setting directly on the cluster.",
    "The reconciler will restore whatever Git says. Roll back by reverting the commit in Git, which the agent then applies."
   ],
   [
    "Putting the deployment key in the pipeline YAML is fine because the repository is private.",
    "Anything in the repository is visible to everyone with access and stays in history. Store secrets in the CI system's protected variables or a secrets manager."
   ],
   [
    "Blue-green and canary are the same strategy.",
    "Blue-green switches all traffic between two full environments; canary sends a small share of traffic to the new version first and widens it gradually."
   ]
  ],
  "tryit": [
   [
    "A company wants every change to its web application to be built, tested and packaged automatically, but its compliance policy requires a change manager to approve each production release. Which practice fits: continuous delivery or continuous deployment?",
    "Continuous delivery. The pipeline still builds, tests and packages every change so it is always ready to release, but a manual approval gate before production satisfies the policy. Continuous deployment would release automatically with no human gate."
   ],
   [
    "Your team is rolling out a new version of a payment service and wants to limit the impact if it has a bug. Monitoring can compare error rates between versions. Which deployment strategy would you suggest, and how would it proceed?",
    "A canary release. Send a small share of traffic to the new version, compare its error rates and latency with the old version, and increase traffic in steps only if metrics stay healthy; otherwise route all traffic back to the old version."
   ]
  ],
  "tip": "In GitOps the rollback answer is almost always 'revert the commit in Git', not 'fix it directly on the server or cluster'. Delivery has a human gate; deployment does not.",
  "check": [
   [
    "What is the difference between continuous delivery and continuous deployment?",
    "Continuous delivery requires a manual approval before production releases; continuous deployment releases automatically once checks pass."
   ],
   [
    "In GitOps, what is the source of truth for the desired state?",
    "The Git repository; changes are made through pull requests and reconciled by an automated agent."
   ],
   [
    "Where should a pipeline's deployment credentials be kept?",
    "In the CI system's protected secret variables or a secrets manager, never committed to the repository."
   ],
   [
    "Which deployment strategy sends a small portion of traffic to a new version first?",
    "A canary release, which limits impact if the new version misbehaves."
   ],
   [
    "Why does a GitOps agent undo a manual change made directly in the cluster?",
    "It continuously reconciles the live state to the state declared in Git, so any difference is treated as drift and corrected."
   ]
  ]
 },
 {
  "t": "Responsible use of AI tools for scripting: review, testing, keeping secrets out of prompts",
  "hook": "It is late Friday at Fairmont Public Schools, and Rosa has been asked to clean up home directories for staff who left last year. She opens an AI assistant, pastes in the error from her half-finished script along with the whole config file \"for context,\" and gets back a tidy, confident script in seconds. It even explains itself. She is about to run it with sudo on the file server when a colleague, Dev, glances over. \"Did you just paste the LDAP bind password into that chat?\" he asks. \"And what happens in that loop if the username list has a blank line?\" Rosa looks again at `rm -rf /home/$user`. The script looks right. What does responsible use of a tool like this actually require?",
  "simple": "AI assistants can write scripts quickly, but they are like a very fast, eager new hire who sometimes makes things up with total confidence. You would not let a new hire run commands on important servers without checking their work, and the same goes here. Before you run anything an AI wrote, read every line until you understand it, try it first on a practice machine that does not matter, and have a teammate review it. Also be careful what you tell the assistant. Anything you type into an outside service may be stored somewhere you do not control, so never paste passwords, keys or private customer information. Replace them with stand-ins like `<PASSWORD>`, the way you would black out an account number before sharing a bank statement.",
  "body": [
   "AI assistants can draft a Bash script, explain an unfamiliar awk one-liner or suggest an Ansible task in seconds. Used well, they save time and help you learn. Used carelessly, they can introduce subtle bugs, security holes or data leaks into systems you are responsible for. The current Linux+ objectives recognize this, so expect questions about using these tools responsibly: reviewing output, testing it safely and protecting sensitive data.",
   "Start from the right mindset: you remain accountable for every command you run, whoever or whatever wrote it. AI-generated code can look confident and still be wrong, a problem often called hallucination. Common issues include options that do not exist or behave differently on your distribution, outdated syntax, missing error handling, unquoted variables, commands that assume a different package manager, and references to packages or modules that do not exist at all. A plausible but invented package name is a particular risk, because an attacker could publish a malicious package under that name and wait for people to install it. The safe stance is a human in the loop: a person reviews and approves AI output before it is used.",
   "Review generated code line by line before running it. Make sure you understand what each command does, check unfamiliar options in the man page or with `--help`, and look closely at anything destructive or privileged: `rm -rf`, `dd`, `mkfs`, `chmod -R 777`, disabling SELinux or the firewall, piping a download straight into a shell, or broad sudo rules. Ask whether the approach follows your organization's standards for logging, paths and naming. If the explanation and the code disagree, trust neither until you have checked, because the explanation is generated separately and may describe what the code was meant to do rather than what it does.",
   "Test before production. Run scripts through `bash -n` and ShellCheck, Ansible through `ansible-lint` and `--check --diff`, and OpenTofu or Terraform through `validate` and `plan`. Execute in a disposable VM (virtual machine), container or lab environment first, with sample data, and test failure cases as well as the happy path: an empty input, a missing file, a name with spaces. Commit the code to Git and send it through the same pull request review and CI (continuous integration) pipeline as human-written code, so another person and automated checks see it too. Note in the commit or review that an AI tool assisted if your organization's policy asks for that.",
   "Keep secrets and sensitive data out of prompts. Anything you paste into an external AI service may be stored, logged or reviewed outside your control, depending on the provider and its terms. Never include passwords, private keys, API (application programming interface) tokens, session cookies, `/etc/shadow` contents, customer data or personal information. Be careful with less obvious details too: internal hostnames and IP addresses, full configuration files, and logs that contain usernames or tokens. Replace them with placeholders such as `<API_TOKEN>` or `example.internal`, a step called sanitization, and strip real values from error messages before sharing them. If a secret does slip into a prompt, treat it as exposed and rotate it.",
   "Organizational rules and good coding habits finish the picture. Use your organization's approved AI tool if one exists, and follow its AUP (acceptable use policy), which typically states which tools are allowed and what data may be shared with them. Protect generated code like any other: read secrets at run time from environment variables, vault-encrypted files or a secrets manager rather than hard-coding them, and grant scripts only the privileges they need. Before installing any package an assistant suggests, confirm that it exists in your distribution's trusted repositories or the official package index and that it is the project you expect.",
   "Consider a worked example. An admin asks an AI assistant for a script to purge home directories of users who left more than 90 days ago. Before asking, she replaces real usernames, hostnames and the directory server address with placeholders. The draft loops over a list and runs `rm -rf /home/$user` with an unquoted variable and no check that the variable is set, so an empty value would target `/home/` itself. She adds `set -euo pipefail`, quoting, validation that each name matches the username pattern, and a `--dry-run` mode that only prints what would be removed. ShellCheck is clean, a test on a lab VM with dummy accounts behaves correctly, and she submits it through a pull request where a colleague reviews it. Common mistakes include pasting a full config file with credentials to ask why it fails; running output directly as root because it looks right; installing a suggested package without confirming it exists in trusted repositories; skipping tests because the assistant explained the code confidently; hard-coding a token the assistant placed in an example; and assuming the tool knows your distribution, versions or internal standards.",
   "Exam questions on this topic reward caution. 'Best practice before running AI-generated code' is review, lint and test in a non-production environment, then normal code review. 'What should not be included in a prompt' is credentials, keys, personal data and sensitive internal details. 'Suggested package cannot be found in official repositories' points to verifying rather than installing from an unknown source. 'Who is responsible for the result' is the administrator who runs it."
  ],
  "analogy": "Treat an AI assistant like a recipe you found on a stranger's blog. It might be excellent, but you still read it through before cooking, notice if it calls for an ingredient that does not exist, try it at home before serving it at a wedding, and you would never mail the stranger your house keys to ask about the oven. The analogy stops in one place: a bad recipe ruins dinner, while an unreviewed root script can delete data across many servers in seconds, so the checks must be stricter.",
  "terms": [
   [
    "Human in the loop",
    "A person reviews and approves AI output before it is used or run."
   ],
   [
    "Hallucination",
    "Confident but incorrect AI output, such as a nonexistent option or package."
   ],
   [
    "Prompt data leakage",
    "Sensitive information exposed by pasting it into an external AI service."
   ],
   [
    "Sanitization",
    "Replacing secrets and identifying details with placeholders before sharing text."
   ],
   [
    "Acceptable use policy",
    "An organization's rules for how tools such as AI assistants may be used and with what data."
   ],
   [
    "Dry run",
    "A mode that shows what a script or tool would do without making changes."
   ]
  ],
  "example": "An admin asks an AI assistant for a script to purge old user home directories. Before asking, she replaces real usernames and hostnames with placeholders. The draft uses rm -rf with an unquoted variable and no check that the variable is set. She adds set -euo pipefail, quoting and a dry-run mode, runs ShellCheck and tests on a lab VM, then submits it through a pull request for review.",
  "mistakes": [
   [
    "If the AI explains the script clearly, it must be correct.",
    "The explanation can describe what the code was meant to do rather than what it does. Read the code itself, check options in the man page and test it."
   ],
   [
    "Pasting the full configuration file helps the AI give a better answer, so it is worth it.",
    "Config files often contain passwords, tokens and internal addresses. Share only the relevant lines with secrets and identifying details replaced by placeholders."
   ],
   [
    "If the assistant suggests installing a package, it must exist and be safe.",
    "Assistants can invent plausible package names, which attackers may register. Confirm the package exists in trusted repositories and is the expected project before installing."
   ],
   [
    "The AI tool is responsible if its script causes an outage.",
    "The administrator who runs the code is accountable. AI output must be verified like any untrusted code."
   ]
  ],
  "tryit": [
   [
    "You want help debugging a failing curl call to an internal API. The error output includes the full request with an Authorization header containing a live token, the internal hostname and a customer ID. What do you do before asking an AI assistant, and what if you had already pasted it?",
    "Sanitize first: replace the token with <API_TOKEN>, the hostname with example.internal and the customer ID with a dummy value, and include only the lines needed to show the error. If the live token was already pasted into an external service, treat it as exposed, revoke or rotate it, and follow your organization's reporting process."
   ],
   [
    "An assistant gives you an Ansible playbook that opens a firewall port and adds a sudo rule. It looks reasonable, and your manager wants it applied to all servers today. What steps would you take before it touches production?",
    "Read each task and confirm what it changes, especially the sudo rule's scope. Run ansible-lint and --syntax-check, then --check --diff against a lab or single non-production host, fix anything overly broad, commit it to Git and send it through pull request review and the CI pipeline before running it with a limited rollout."
   ]
  ],
  "tip": "When a question asks for the best practice with AI-generated scripts, pick the answer that combines review, testing in a non-production environment and keeping credentials out of prompts, not the one that runs the output directly.",
  "check": [
   [
    "Name three kinds of data you should never paste into an external AI prompt.",
    "Any of: passwords, private keys, API tokens, /etc/shadow contents, customer or personal data, or sensitive internal hostnames and IPs."
   ],
   [
    "What should you do before running an AI-generated script on production servers?",
    "Review it line by line, lint it (for example with ShellCheck), test it in a lab or staging environment and send it through normal code review."
   ],
   [
    "Why can a suggested but nonexistent package name be dangerous?",
    "An attacker could register a malicious package under that name, so installing it without verification could compromise the system."
   ],
   [
    "Who is accountable for a command generated by an AI assistant and run on a server?",
    "The administrator who runs it; the tool's output must be verified like any untrusted code."
   ],
   [
    "What is sanitization in the context of AI prompts?",
    "Replacing secrets and identifying details, such as tokens, hostnames and usernames, with placeholders before sharing text."
   ]
  ]
 },
 {
  "t": "Storage issues: full disks, inode exhaustion (df -i), deleted-but-open files (lsof +L1), fsck/xfs_repair",
  "hook": "Your phone buzzes at 6:40 a.m. The order system at Juniper Outdoor Supply has stopped accepting new orders, and the application log ends with the same line repeated hundreds of times: No space left on device. Priya, the developer on call, already ran `df -h` and swears the disk has plenty of room. Meanwhile a second server in the same rack shows its root filesystem at 100 percent, yet nobody can find the files that are filling it. Two machines, one error message, and two completely different causes. Which commands will tell you what is really going on before the morning rush begins?",
  "simple": "A Linux filesystem is like a library. It needs shelf space for the books themselves, and it needs index cards in the catalog, one card per book. You can run out of either. If the shelves are full, df -h shows 100 percent. If the index cards run out, df -i shows 100 percent even though shelves are empty, and no new files can be made. A third trap is a deleted file that a program is still reading: the name is gone, but the space is not freed until the program lets go. Finally, if the catalog itself gets scrambled after a crash, a repair tool fixes it, but only while the library is closed, meaning the filesystem is unmounted.",
  "body": [
   "Storage problems are among the most common Linux incidents: services fail to start, logs stop being written, databases crash and users cannot save work. The symptoms often look alike, usually the error 'No space left on device', so you need a systematic way to find the real cause. Four situations cover most cases: a filesystem that is genuinely full, one that has run out of inodes, space held by deleted files that are still open, and a corrupted filesystem that needs repair.",
   "Start with `df -h` to see which filesystem is full. Then drill down with `du`: `du -xh --max-depth=1 /var | sort -h` lists the largest directories on that filesystem only (`-x` stays on one filesystem). `find /var -xdev -type f -size +500M` finds large files. Common culprits are runaway logs, core dumps, old kernels in `/boot`, package caches (`dnf clean all`, `apt clean`), container images and volumes, and forgotten backups. `journalctl --disk-usage` and `journalctl --vacuum-size=500M` manage the journal. Remember that ext4 reserves a percentage of blocks for root by default (adjustable with `tune2fs -m`), so a filesystem can be full for users while root can still write.",
   "Inode exhaustion is the classic trick question. Each file uses one inode, the structure that stores its metadata, and on ext4 the number of inodes is fixed when the filesystem is created. If millions of tiny files, such as session files or mail queue entries, use up every inode, you get 'No space left on device' even though `df -h` shows plenty of free space. `df -i` shows inode usage; at 100 percent `IUse%` you have found the cause. Find the directories with the most files, for example with `du --inodes -x /var | sort -n | tail` or a `find ... | uniq -c` count, then delete or archive the unneeded files and fix whatever creates them. XFS allocates inodes dynamically, so it is less prone to this.",
   "Deleted-but-open files explain why `df` and `du` disagree. When you delete a file that a process still has open, the name disappears, so `du` no longer counts it, but the kernel keeps the data blocks until the last process closes the file, so `df` still shows the space used. This often happens when someone deletes a huge log instead of rotating it. `lsof +L1` lists open files whose link count is below one, meaning deleted; `lsof | grep deleted` works too. The fix is to restart or reload the process holding it, or have it reopen its logs. In an emergency, truncating the file through `/proc/<PID>/fd/<N>` (PID is the process ID and N the file descriptor number) frees space, but restarting the service is the clean solution. Use `logrotate` or truncate with `> file` or `truncate -s 0 file` instead of `rm` for active logs.",
   "It helps to know what the evidence looks like on screen. In `df -h` output the columns are Size, Used, Avail, Use% and Mounted on, and a full filesystem shows 100% in Use%. In `df -i` the matching columns are Inodes, IUsed, IFree and IUse%, so the same mount can read 40% in one view and 100% in the other. When you run `lsof +L1`, each line names the COMMAND and PID holding the file, the file descriptor (FD), the SIZE/OFF column showing how big the hidden file has grown, an NLINK of 0 and a NAME that ends in `(deleted)`. That combination tells you exactly which service to restart. If you truly cannot restart it right away, truncating the descriptor, for example with `: > /proc/1234/fd/7`, releases the blocks while the process keeps running, but treat that as a bridge until a proper restart and log rotation are in place.",
   "Filesystem corruption, after a crash, power loss or failing disk, is repaired with check tools that must run on unmounted filesystems (or the root filesystem at boot or from rescue media) to avoid causing more damage. For ext2/3/4, `fsck /dev/sdb1` calls `e2fsck`; `-y` answers yes to fixes, `-n` checks without changing anything, and `-f` forces a check. The sixth fstab field controls boot-time checks. For XFS, `fsck.xfs` does nothing useful; use `xfs_repair /dev/sdb1` on the unmounted device, with `-n` for a read-only check. If it complains about a dirty log, mounting and cleanly unmounting replays the log; `xfs_repair -L` zeroes the log but can lose recent changes, so it is a last resort. Btrfs uses `btrfs scrub` and `btrfs check`. Check disk health too (SMART, or Self-Monitoring, Analysis and Reporting Technology, data and kernel messages), because corruption may be a symptom of failing hardware.",
   "Consider a worked example. A mail server reports 'No space left on device', but `df -h` shows `/var` only 40 percent used. `df -i` shows `/var` at 100 percent inode use, and `du --inodes -x /var | sort -n | tail` points to a spool directory holding millions of tiny stale files left by a stuck job. You fix the job and remove the stale entries, and inode use drops to 12 percent. A week later a different server shows `/` at 100 percent while `du -xsh /` adds up to far less; `lsof +L1` reveals a 20 GB application log that someone deleted while the application kept writing to it. Restarting the service releases the space immediately, and you add a logrotate rule.",
   "Common mistakes: trusting `df -h` alone and missing inode exhaustion; deleting an active log with `rm` and expecting space back; running `fsck` on a mounted filesystem; running `fsck` against XFS, or reaching for `xfs_repair -L` before trying to mount and replay the log; forgetting the `-x` option so `du` wanders into other mounts; and clearing space without finding and fixing whatever filled it.",
   "Exam questions pair symptoms with tools. 'No space left, but df shows free space' means inodes and `df -i`. 'df says full but du cannot find the data' or 'deleted a file but space not freed' means `lsof +L1` and restarting the process. 'Repair ext4' is `fsck` or `e2fsck` on an unmounted device, and 'repair XFS' is `xfs_repair`. 'Find the biggest directories' is `du` piped to `sort -h`."
  ],
  "analogy": "Think of a parking garage with a fixed number of numbered parking tickets. The garage can have empty spaces but no tickets left, so no car can enter: that is inode exhaustion. A deleted-but-open file is a car that was removed from the garage's records while its driver is still sitting in it, so the space stays taken until the driver leaves. The analogy stops at XFS, which can print new tickets on demand, so inode exhaustion is far less likely there than on ext4.",
  "terms": [
   [
    "Inode",
    "The on-disk structure holding a file's metadata; each file needs one."
   ],
   [
    "Inode exhaustion",
    "Running out of inodes so no new files can be created even though free blocks remain."
   ],
   [
    "Deleted-but-open file",
    "A deleted file whose data stays allocated because a process still holds it open."
   ],
   [
    "lsof +L1",
    "Lists open files with a link count below one, meaning they have been deleted."
   ],
   [
    "fsck / e2fsck",
    "Checks and repairs ext2/3/4 filesystems; run on unmounted devices."
   ],
   [
    "xfs_repair",
    "Checks and repairs XFS filesystems on an unmounted device; -L zeroes the log as a last resort."
   ],
   [
    "Reserved blocks",
    "The share of an ext4 filesystem kept for root, adjustable with tune2fs -m."
   ],
   [
    "df -i",
    "Shows inode usage per filesystem, with IUse% revealing inode exhaustion."
   ]
  ],
  "example": "A mail server reports 'No space left on device' but df -h shows 40 percent used. df -i shows /var at 100 percent inode use, and counting files reveals millions of stale entries in a spool directory from a stuck job. After fixing the job and clearing the old entries, inode use drops and mail flows again.",
  "mistakes": [
   [
    "df -h shows free space, so the disk cannot be the cause of 'No space left on device'.",
    "That error also appears when every inode is used. Always check df -i; at 100 percent IUse% you cannot create files even with free blocks."
   ],
   [
    "Deleting a huge active log with rm frees the space immediately.",
    "If a process still has the file open, the blocks stay allocated until it closes the file. Use logrotate or truncate the file, and restart or signal the process if it was already deleted (find it with lsof +L1)."
   ],
   [
    "fsck works for every filesystem type, including XFS.",
    "fsck.xfs does nothing useful. XFS is checked and repaired with xfs_repair on the unmounted device, with -n for a read-only check."
   ],
   [
    "xfs_repair -L is the first thing to try when XFS complains about its log.",
    "Mount and cleanly unmount first so the log replays. -L zeroes the log and can lose recent changes, so it is a last resort."
   ]
  ],
  "tryit": [
   [
    "A web server reports 'No space left on device' when PHP tries to save a session. df -h shows /var at 35 percent, and df -i shows /var at 100 percent IUse%. A colleague suggests extending the logical volume. What do you do instead?",
    "Find where the inodes went, for example with du --inodes -x /var | sort -n | tail, which will likely reveal millions of stale session files. Delete or archive them and fix the cleanup job that should remove old sessions. Adding blocks does not help an ext4 filesystem that has run out of inodes, because its inode count is fixed at creation."
   ],
   [
    "After a power loss, an ext4 data volume /dev/sdb1 mounted at /data shows errors in dmesg. Users are still connected. What is the safe order of operations?",
    "Stop the services using /data, unmount it, then run fsck (or fsck -n first to see what it would change, then e2fsck -y to fix). Also check SMART data and the kernel log in case the disk itself is failing. Running fsck while /data is mounted can cause more corruption."
   ]
  ],
  "tip": "If df -h shows free space but writes fail, think inodes (df -i). If df shows full but du cannot find the data, think deleted-but-open files (lsof +L1).",
  "check": [
   [
    "Which command confirms inode exhaustion?",
    "df -i, which shows inode usage (IUse%) for each filesystem."
   ],
   [
    "You deleted a 20 GB log but df still shows the space used. Why, and what fixes it?",
    "The logging process still holds the deleted file open; restart or signal that process so it closes the file, which frees the space."
   ],
   [
    "Which tool repairs a corrupted XFS filesystem, and in what state must it be?",
    "xfs_repair, run on the unmounted device."
   ],
   [
    "Why should you not run fsck on a mounted filesystem?",
    "The kernel is still changing the filesystem, so repairs can conflict with live writes and cause more corruption."
   ]
  ]
 },
 {
  "t": "Performance: load average, top/htop, vmstat, iostat, sar, free, OOM killer",
  "hook": "It is Monday at 9:15 a.m. at Brightwater Insurance, and the claims portal is crawling. Ticket after ticket arrives: pages take thirty seconds to load. Dev, the junior admin, logs in and sees a load average of 11 and immediately wants to order more CPUs. You notice the server has eight cores and that top shows the processors mostly idle. Something is clearly struggling, but is it the processors, the memory, the disks, or a noisy neighbor on the hypervisor? Before anyone spends money, you need to read the numbers correctly. Which tool tells you what is really waiting?",
  "simple": "A slow server is like a busy kitchen. Orders pile up when the cooks are too few (CPU), when the counter space is full and plates must be stacked in the back room (memory and swap), or when everyone is waiting on one slow oven (the disk). Load average counts how many orders are being cooked or waiting, so you compare it with the number of cooks. top shows who is busy right now, free shows how much counter space is truly available, vmstat and iostat show waiting for memory or disks, and sar keeps a diary so you can look at yesterday. When the kitchen runs completely out of room, the kernel's OOM killer throws out one big order to save the rest.",
  "body": [
   "When users say a server is slow, you need to find which resource is the bottleneck: CPU (central processing unit), memory, disk I/O (input/output) or something else. The approach is to observe first, identify the constrained resource, then find the process responsible. Each tool below answers part of that question, and exam scenarios usually give you tool output and ask what it means.",
   "Load average appears in `uptime`, `top` and `/proc/loadavg` as three numbers: the averages over 1, 5 and 15 minutes. On Linux it counts processes that are running or waiting for a CPU, plus those in uninterruptible sleep (usually waiting on disk or network storage). Interpret it relative to the number of CPU cores, shown by `nproc`: a load of 4 on a 4-core machine means roughly fully busy, while 12 on the same machine means work is queuing. Comparing the three values tells you whether load is rising or falling. A high load with low CPU use usually points to I/O waits.",
   "`top` shows a live summary and per-process usage. In the CPU line, `us` is user time, `sy` system (kernel) time, `ni` time for niced processes, `id` idle, `wa` time waiting on I/O and `st` time stolen by the hypervisor on virtual machines. Sort by memory with `M` and CPU with `P`, and press `1` to show each CPU separately. `htop` presents the same data with colored per-core bars, easier scrolling and tree views. `free -h` shows memory. Linux uses spare RAM (random access memory) for page cache to speed up disk access, so low free memory is normal; the important column is available, an estimate of memory that can be given to applications without swapping. Heavy swap use means real memory pressure.",
   "Reading `free -h` correctly prevents many false alarms. The Mem line has columns for total, used, free, shared, buff/cache and available, and the Swap line shows total, used and free swap. A server with 32 GB of memory might show only 600 MB free but 20 GB in buff/cache and 22 GB available, which is perfectly healthy because the kernel releases cache as soon as applications need it. The warning signs are a small available figure, swap used growing over time, and non-zero swap activity in `vmstat`. A practical triage order is to start with `uptime` for the trend, `top` or `htop` for the busiest processes and the CPU breakdown, `free` for memory, then `vmstat` and `iostat` to confirm whether the pressure is memory or storage, and finally `sar` to see whether the pattern is new or recurring.",
   "`vmstat 2` prints a line every two seconds: `r` is the run queue (processes waiting for CPU), `b` processes blocked on I/O, `si` and `so` swap in and out, `bi` and `bo` blocks read and written, and CPU percentages including `wa`. Sustained non-zero si and so indicate memory pressure; high `wa` with many `b` suggests a storage bottleneck. `iostat -xz 2`, from the sysstat package, shows per-device statistics: operations and throughput, average wait time (`await`) and `%util`, how busy the device is. A disk near 100 percent utilization with rising await is saturated, and `iotop` shows which processes are doing the I/O. `sar`, also from sysstat, collects data periodically in the background so you can look at history: `sar -u` for CPU, `sar -r` for memory, `sar -b` or `sar -d` for I/O, `sar -n DEV` for network, and `sar -f` to read a specific day's file. That is invaluable when the problem happened overnight.",
   "When memory and swap are exhausted, the kernel's OOM (out-of-memory) killer chooses a process to kill to keep the system alive, based on a badness score that favors large memory users. You will see messages such as 'Out of memory: Killed process 1234 (java)' in `dmesg` or `journalctl -k`. Each process's score is in `/proc/<PID>/oom_score`, and `oom_score_adj` (from -1000 to 1000) biases the choice, so critical services can be protected (systemd units use `OOMScoreAdjust=`). The real fixes are adding memory, fixing leaks, limiting services with cgroup settings such as `MemoryMax=`, or tuning the application. For CPU-heavy jobs, `nice` and `renice` lower priority so interactive work stays responsive.",
   "Consider a worked example. A 4-core database server shows a load average of 9, but `top` reports only 20 percent user CPU and 60 percent `wa`. `vmstat 2` shows several processes in the `b` column and no swapping, so memory is not the problem. `iostat -xz 2` shows the data disk at 99 percent util with high await, and `iotop` points to a nightly backup reading the same disk during business hours after a schedule change. Rescheduling the backup and taking it from a snapshot brings load back under 3. Checking `sar -d` for the previous week confirms the pattern started on the day the schedule changed.",
   "Common mistakes: reading load average without knowing the core count; assuming high load always means high CPU; panicking at low free memory when available is healthy; ignoring `st` on virtual machines, where the host is overcommitted; killing the process the OOM killer chose without asking why memory ran out; and forgetting that sar only has history if the sysstat collection was enabled beforehand.",
   "Exam questions pair output with meaning. 'High load, low CPU, high wa' means I/O bottleneck, so reach for `iostat` or `iotop`. 'Non-zero si/so' means memory pressure. 'Low free, high available' is normal caching. 'What happened last night' is `sar`. 'Process killed, kernel log mentions out of memory' is the OOM killer, found with `dmesg` or `journalctl -k`. 'High st' means CPU stolen by the hypervisor."
  ],
  "analogy": "Load average is like the line at a bank with several tellers. Ten people in line means little if there are ten tellers, and a lot if there are two. On Linux, though, the line also includes people standing at the counter waiting for a document from the back office, which is a process waiting on disk. That is why a long line with idle tellers points to the back office, meaning storage, rather than to too few tellers.",
  "mnemonic": "In top's CPU line, think 'Users Sit Nicely Idle, Waiting, Stolen' for us, sy, ni, id, wa and st, in order (top also shows hi and si between wa and st).",
  "terms": [
   [
    "Load average",
    "The 1, 5 and 15 minute averages of runnable plus uninterruptible processes, read relative to core count."
   ],
   [
    "I/O wait (wa)",
    "CPU time spent idle while waiting for disk or network I/O to complete."
   ],
   [
    "Available memory",
    "The estimate in free of memory that can be given to applications without swapping."
   ],
   [
    "vmstat",
    "Reports run queue, blocked processes, swap activity, I/O and CPU in periodic samples."
   ],
   [
    "iostat",
    "Reports per-device I/O rates, await and %util; part of sysstat."
   ],
   [
    "sar",
    "The sysstat tool that records and reports historical CPU, memory, I/O and network data."
   ],
   [
    "OOM killer",
    "The kernel mechanism that kills a process to free memory when RAM and swap are exhausted."
   ],
   [
    "Steal time (st)",
    "CPU time a virtual machine wanted but the hypervisor gave to other guests."
   ]
  ],
  "example": "A 4-core database server shows a load average of 9 but top reports only 20 percent user CPU and 60 percent wa. iostat -xz 2 shows the data disk at 99 percent util with high await, and iotop points to a nightly backup reading the same disk. Rescheduling the backup and moving it to a snapshot brings load back under 3.",
  "mistakes": [
   [
    "A load average of 8 always means the CPUs are overloaded.",
    "It depends on the core count from nproc, and Linux load also counts processes in uninterruptible sleep waiting on I/O. Check us and wa in top: high load with high wa is a storage bottleneck."
   ],
   [
    "Very little free memory in free -h means the server is out of memory.",
    "Linux fills spare memory with page cache. The available column is what matters; low available plus swap activity (si/so in vmstat) indicates real pressure."
   ],
   [
    "The fix for an OOM kill is to restart the process the kernel killed.",
    "Restarting without finding why memory ran out invites a repeat. Look for leaks, growth or limits, then add memory, set cgroup limits such as MemoryMax=, or protect critical services with OOMScoreAdjust=."
   ],
   [
    "sar can always show what happened last night.",
    "sar only reports history if sysstat data collection was enabled before the problem occurred."
   ]
  ],
  "tryit": [
   [
    "A virtual machine running a build server feels sluggish. top shows load 3.5 on 4 vCPUs, us at 30 percent, id at 10 percent and st at 45 percent. iostat shows disks mostly idle. What is the likely cause and who should you talk to?",
    "A high st (steal) value means the hypervisor is giving this VM's CPU time to other guests, so the host is overcommitted. Tuning inside the guest will not fix it; raise it with the virtualization team to rebalance or move the VM."
   ],
   [
    "A Java service disappears every few days. Its log simply stops, with no error. What do you check and what might you find?",
    "Check the kernel log with dmesg -T or journalctl -k for 'Out of memory: Killed process ... (java)'. If present, the OOM killer chose it as the largest memory user; investigate heap settings or leaks and consider a MemoryMax= limit or more memory."
   ]
  ],
  "tip": "A high load average does not automatically mean high CPU; check wa and iostat, because processes stuck waiting on I/O also count toward load on Linux.",
  "check": [
   [
    "Load average is 8.0 on a 2-core server. What does that suggest?",
    "Demand far exceeds capacity: on average about four times as many tasks want to run (or are waiting on I/O) as there are cores."
   ],
   [
    "free -h shows little free memory but a large available value. Is this a problem?",
    "Usually not; Linux uses spare memory for cache, and available shows memory that can still be handed to applications."
   ],
   [
    "Where do you find evidence that the OOM killer ended a process?",
    "In the kernel log, via dmesg or journalctl -k, with an 'Out of memory: Killed process' message."
   ],
   [
    "Which tool lets you see CPU and disk usage from yesterday afternoon?",
    "sar from sysstat, reading the stored data file with sar -f, provided collection was enabled."
   ],
   [
    "vmstat shows non-zero si and so values for several minutes. What does that indicate?",
    "Sustained swapping in and out, meaning real memory pressure."
   ]
  ]
 },
 {
  "t": "Networking: ping, ip route, ss, dig/resolvectl, traceroute/tracepath/mtr, tcpdump, nmap",
  "hook": "Halfway through a Thursday afternoon, the help desk at Cedar Valley Clinic forwards a ticket from Marcus in billing: the new scheduling API is down. Two developers have already blamed the firewall, the network team has blamed DNS, and someone is drafting an email about rebooting the core switch. You pull up a terminal on a client machine. You have a handful of tools, each of which answers exactly one question about the path between that client and the server. Used in the right order, they can settle the argument in five minutes. Where do you start?",
  "simple": "Troubleshooting a network is like finding out why a letter never arrived. First, does your own mailbox work (is the network card up with an address)? Can you reach the local post office (the gateway)? Can mail reach the other city at all (a remote address)? Do you have the right street address for the name on the envelope (DNS turns names into numbers)? Finally, is someone actually home to open the letter (is the service listening on its port)? ping, ip route, dig, traceroute, ss, tcpdump and nmap each check one of these steps, so you test them in order instead of guessing.",
  "body": [
   "Network troubleshooting goes fastest when you work through the layers in order: is the interface up with the right IP (Internet Protocol) address, can you reach the gateway, does routing work, does name resolution work, and is the service actually listening and allowed through? Each tool below answers one of those questions, and knowing which tool answers which question is what the exam tests.",
   "Start locally with `ip a` (addresses and link state) and `ip route` (routing table). The line beginning `default via` is the default gateway; without it, only directly connected networks are reachable. `ip route get 8.8.8.8` shows exactly which route and interface a packet to that address would use. Then `ping` tests reachability with ICMP (Internet Control Message Protocol) echo: `ping -c 4 192.168.1.1` for the gateway, then a remote IP, then a hostname. If an IP works but a name fails, the problem is DNS (Domain Name System). Many firewalls block ICMP, so a failed ping does not prove a host is down.",
   "Name resolution is tested with `dig`: `dig example.com` shows the answer, the TTL and which server replied, `dig @8.8.8.8 example.com` asks a specific server, `dig -x 203.0.113.10` performs a reverse lookup, `dig MX example.com` asks for mail records and `+short` trims output. `nslookup` and `host` are simpler alternatives. On systems using systemd-resolved, `resolvectl status` shows the DNS servers per interface, `resolvectl query name` resolves through the system resolver, and `resolvectl flush-caches` clears its cache. `getent hosts name` follows `/etc/nsswitch.conf`, so it includes `/etc/hosts`, which `dig` ignores.",
   "Path tools show where packets stop. `traceroute host` lists each router hop using increasing TTL (time to live) values; `traceroute -T -p 443` uses TCP (Transmission Control Protocol) to get through firewalls that block the defaults. `tracepath` does a similar job without root privileges and reports path MTU (maximum transmission unit). `mtr host` combines ping and traceroute in a continuously updating view with loss and latency per hop, which is excellent for intermittent problems. Asterisks for a hop can simply mean that router does not reply, so look at whether loss continues to the end.",
   "`ss` shows sockets and replaced the older `netstat`. `ss -tulpn` lists listening TCP and UDP (User Datagram Protocol) ports with numeric addresses and the owning process; `ss -tan` shows all TCP connections with their states, such as ESTABLISHED or TIME-WAIT. A service listening on `127.0.0.1:8080` accepts only local connections, whereas `0.0.0.0:8080` or `*:8080` listens on all interfaces, a very common reason a service is unreachable from other hosts. `tcpdump` captures packets: `tcpdump -i eth0 -nn port 53` shows DNS traffic without resolving names, `host 10.0.0.5` filters by address, and `-w capture.pcap` saves to a file for Wireshark. Requests leaving with no replies, or TCP resets, quickly separate local from remote problems. `nmap` scans for open, closed or filtered ports: `nmap -p 22,80,443 server` checks specific ports and `nmap -sV` identifies service versions. Scanning from another host shows what the network really allows through. Only scan systems you own or are authorized to test.",
   "Knowing what healthy output looks like makes the abnormal stand out. A typical `ss -tlpn` line reads something like `LISTEN 0 511 127.0.0.1:8080 0.0.0.0:* users:((\"node\",pid=2211,fd=19))`: the state, the queue sizes, the local address and port, the peer pattern and the owning process with its PID (process ID). The local address column is where loopback binds hide. In `tcpdump -nn` output, each TCP packet shows its flags in brackets: `[S]` is a SYN starting a connection, `[S.]` is the SYN-ACK reply, `[.]` is an acknowledgment and `[R.]` is a reset. A string of `[S]` packets with no reply suggests the packets are being dropped on the way, often by a firewall, while an immediate `[R.]` means the host answered but nothing was listening on that port. Those two patterns map neatly to nmap's filtered and closed results.",
   "Consider a worked example. Users cannot reach a new API (application programming interface) on port 8080. From a client, `ping api01` and `dig api01.example.com` both work, so addressing, routing and DNS are fine. `nmap -p 8080 api01` reports the port closed rather than filtered, which suggests nothing is listening on the network side rather than a firewall drop. On the server, `ss -tlpn` shows the process listening on `127.0.0.1:8080` only. Changing the application's bind address to `0.0.0.0` and adding a firewalld rule with `firewall-cmd --add-port=8080/tcp --permanent` and `firewall-cmd --reload` solves it, and `tcpdump -nn port 8080` confirms completed handshakes.",
   "Common mistakes: concluding a host is down because ping fails; testing DNS with `dig` and forgetting that the application may use `/etc/hosts` through nsswitch; reading one asterisk hop in traceroute as the fault; overlooking a loopback bind address; using `netstat` habits on systems where only `ss` is installed; and running nmap against networks you are not authorized to scan.",
   "Exam wording maps to tools. 'Show the default gateway' is `ip route`. 'IP works but name fails' means DNS, so `dig`, `resolvectl` or `/etc/resolv.conf`. 'Which process is listening on a port' is `ss -tulpn`. 'Where along the path do packets stop' is `traceroute`, `tracepath` or `mtr`, with mtr for intermittent loss. 'Capture packets for analysis' is `tcpdump`. 'Which ports are open from outside' is `nmap`. 'Closed' means reachable but nothing listening; 'filtered' usually means a firewall."
  ],
  "analogy": "nmap results are like knocking on apartment doors. 'Open' is someone answering. 'Closed' is a voice through the door saying nobody by that name lives here: the building let you in, but no service is listening. 'Filtered' is a security guard who stops you in the lobby and says nothing, so you never learn whether anyone is home. The analogy weakens because some firewalls actively reject connections, which can look closed, so confirm on the server with ss.",
  "mnemonic": "Work bottom-up with 'Lazy Geese Rarely Need Ports': Link and address (ip a), Gateway (ping the default via), Remote IP, Name resolution (dig, resolvectl), then the service Port (ss, nmap).",
  "terms": [
   [
    "Default route",
    "The route used for destinations with no more specific entry, shown as default via in ip route."
   ],
   [
    "ss",
    "The socket statistics tool that lists listening ports, connections and owning processes."
   ],
   [
    "dig",
    "A DNS query tool that shows answers, TTLs and the responding server."
   ],
   [
    "resolvectl",
    "The client for systemd-resolved, showing per-link DNS servers and resolving names through the system resolver."
   ],
   [
    "mtr",
    "A tool combining ping and traceroute to show per-hop loss and latency continuously."
   ],
   [
    "tcpdump",
    "A command-line packet capture tool with filters, able to save pcap files."
   ],
   [
    "nmap",
    "A port scanner that reports open, closed and filtered ports and can identify services."
   ],
   [
    "getent hosts",
    "Resolves a name the way applications do, following nsswitch.conf and including /etc/hosts."
   ]
  ],
  "example": "Users cannot reach a new API on port 8080. ping and dig both work, and nmap -p 8080 from a client shows the port closed. On the server, ss -tlpn shows the process listening on 127.0.0.1:8080 only. Changing the application's bind address to 0.0.0.0 and adding a firewalld rule for 8080/tcp solves it.",
  "mistakes": [
   [
    "If ping fails, the host is down.",
    "Many firewalls block ICMP. Test the actual service port (nmap, or a TCP connection) before concluding the host is unreachable."
   ],
   [
    "dig shows the right answer, so name resolution is fine for every application.",
    "dig queries DNS servers directly and ignores /etc/hosts. Applications follow /etc/nsswitch.conf, so use getent hosts or resolvectl query to see what they actually get."
   ],
   [
    "A row of asterisks at one traceroute hop shows where the fault is.",
    "Many routers simply do not answer probes. The fault is where loss begins and continues to the destination; mtr makes this clearer."
   ],
   [
    "A service shown in ss -tlpn is reachable from other hosts.",
    "Only if it listens on a routable address or 0.0.0.0/*. A bind to 127.0.0.1 accepts local connections only, and the firewall must also allow the port."
   ]
  ],
  "tryit": [
   [
    "Users report that a reporting site loads slowly and sometimes times out, but only in the afternoon. A single traceroute in the morning looked normal. Which tool do you use and why?",
    "Run mtr to the site during the afternoon. It probes every hop continuously and shows loss and latency per hop over time, which reveals intermittent congestion that one traceroute snapshot misses."
   ],
   [
    "A server can ping 10.0.20.1 but cannot ping its database at 10.0.30.15 on another subnet. ip route shows only a route for 10.0.20.0/24 and no default via line. What is wrong?",
    "There is no default gateway or route for 10.0.30.0/24, so only the directly connected network is reachable. Add the correct default route (or a specific route) in the network configuration and confirm with ip route get 10.0.30.15."
   ]
  ],
  "tip": "Work bottom-up: link and IP, gateway, remote IP, DNS name, then the service port. If IPs work but names fail, focus on DNS and nsswitch rather than routing.",
  "check": [
   [
    "ping 8.8.8.8 succeeds but ping example.com fails. Where is the problem likely to be?",
    "In name resolution: DNS server settings, /etc/resolv.conf, systemd-resolved or nsswitch.conf."
   ],
   [
    "Which command lists listening TCP and UDP ports with process names?",
    "ss -tulpn."
   ],
   [
    "What does a service bound to 127.0.0.1 mean for remote clients?",
    "It only accepts connections from the local host, so remote clients cannot connect."
   ],
   [
    "Which tool best shows intermittent packet loss at a particular hop?",
    "mtr, which repeatedly probes every hop and shows loss and latency per hop over time."
   ],
   [
    "nmap reports a port as filtered. What does that usually mean?",
    "A firewall is dropping the probes, so nmap cannot tell whether a service is listening."
   ]
  ]
 },
 {
  "t": "Boot problems: GRUB menu, previous kernels, emergency and rescue targets, fstab errors",
  "hook": "At 11:20 p.m. the maintenance window at Northgate Logistics is supposed to be over. Ana finished swapping the storage on the warehouse database server, typed reboot, and walked away to get coffee. When she comes back the console reads 'You are in emergency mode' and asks for the root password. On the next rack, a server patched the same evening shows a kernel panic before systemd even starts. The trucks begin loading at 5 a.m., and both machines need to be running by then. Each message points to a different boot stage. Do you know which stage each one belongs to, and how to get in?",
  "simple": "Starting a Linux computer is like a relay race with four runners. The firmware hands off to the boot loader (GRUB, the menu that picks what to start), which hands off to the kernel and a small starter kit of drivers called the initramfs, which hands off to systemd, which mounts disks and starts services. When the race stops, the message on screen tells you which runner dropped the baton. A bad new kernel? Pick an older one from the GRUB menu. A wrong disk entry in /etc/fstab, the list of disks to mount? You land in emergency mode, fix the line, and reboot. Special rescue and emergency modes give you a simple root shell for repairs.",
  "body": [
   "A system that will not boot is stressful, but most failures fall into a few categories. Match what you see on the console to the boot stage (firmware, boot loader, kernel and initramfs, then systemd and mounts), and use the recovery path for that stage. Linux+ scenarios usually describe the message on screen and ask for the next step, so learn the messages as well as the fixes.",
   "If you get no boot loader at all, or a message such as 'no bootable device', the problem is before Linux starts: wrong firmware boot order, a missing or damaged EFI (Extensible Firmware Interface) System Partition or MBR (master boot record) boot code, or a failed disk. Boot from installation or rescue media, mount the installed system, `chroot` into it, and reinstall the boot loader with `grub2-install` or `grub-install` on BIOS (Basic Input/Output System) systems (on UEFI, or Unified Extensible Firmware Interface, systems, reinstalling the shim and GRUB (GRand Unified Bootloader) packages or fixing entries with `efibootmgr` is common), then regenerate the configuration with `grub2-mkconfig -o` or `update-grub`. If GRUB loads but drops to a `grub>` or `grub rescue>` prompt, it cannot find its configuration or modules, often after a partition change.",
   "The GRUB menu is your main recovery tool. If it is hidden, hold Shift (BIOS) or press Esc (UEFI) during boot to show it. A kernel update that causes a panic or missing driver can usually be bypassed by choosing a previous kernel entry, since distributions keep several installed kernels for exactly this reason. Once booted, you can make the working kernel the default (for example with `grubby --set-default` on RHEL, or Red Hat Enterprise Linux, family systems), remove the bad kernel, or rebuild its initramfs with `dracut -f --kver <version>` (or `update-initramfs -u` on Debian-family systems) if the image was incomplete. 'Kernel panic - not syncing: VFS: Unable to mount root fs' points to a wrong `root=` argument or an initramfs missing storage drivers.",
   "To change boot behavior once, press `e` on a menu entry, edit the line beginning with `linux`, and press Ctrl+X. Adding `systemd.unit=rescue.target` gives a single-user root shell with local filesystems mounted and minimal services; it asks for the root password. `systemd.unit=emergency.target` is more minimal: the root filesystem is mounted read-only and almost nothing else starts, useful when rescue mode itself fails. To regain access when the root password is lost, you can add `rd.break` (RHEL-family, stopping in the initramfs) or `init=/bin/bash`, remount the root filesystem read-write, reset the password, and on SELinux (Security-Enhanced Linux) systems create `/.autorelabel` so labels are fixed on the next boot. Protect GRUB with a password so others cannot do the same.",
   "Errors in `/etc/fstab` are one of the most common boot failures. A typo in a UUID (universally unique identifier), a device that no longer exists or a wrong filesystem type makes systemd wait for the device, time out, and drop you into emergency mode with a message such as 'Give root password for maintenance'. Log in, run `journalctl -xb` to see which mount failed, then `mount -o remount,rw /` so you can edit, fix or comment out the bad line, and confirm with `findmnt --verify` and `mount -a` before rebooting. Adding `nofail` to non-essential mounts prevents a missing disk from stopping the boot. After recovery, review `journalctl -b -1` for the failed boot and use `systemd-analyze blame` to see which units slow the boot.",
   "Permanent boot changes belong in configuration files, not in the generated menu. Settings such as the menu timeout (`GRUB_TIMEOUT`) and kernel arguments applied to every entry (`GRUB_CMDLINE_LINUX`) live in `/etc/default/grub`, and you regenerate `grub.cfg` with `grub2-mkconfig -o` followed by your distribution's path, or with `update-grub` on Debian-family systems. On a running system, `systemctl get-default` shows which target boots normally, `systemctl set-default multi-user.target` changes it, and `systemctl isolate rescue.target` switches into rescue mode without a reboot. Keeping one-time GRUB edits for emergencies and these commands for planned changes means you always know which behavior will survive the next reboot.",
   "Consider a worked example. After a storage migration, a server boots to 'You are in emergency mode'. You enter the root password, and `journalctl -xb` shows a timeout waiting for `dev-disk-by\\x2duuid-...device`, a UUID that no longer exists. You run `mount -o remount,rw /`, find the new UUID with `blkid /dev/sdc1`, replace the old value in `/etc/fstab`, and add `nofail` because the volume holds only archives. `findmnt --verify` reports no errors and `mount -a` mounts it, so you reboot, and the server comes up normally.",
   "Common mistakes: reinstalling the operating system when choosing the previous kernel would have worked; editing fstab in emergency mode without remounting root read-write; rebooting without testing with `mount -a`, only to land back in emergency mode; forgetting `/.autorelabel` after a password reset on an SELinux system, which can block logins; confusing rescue (more services, local filesystems mounted) with emergency (read-only root, almost nothing); and editing `grub.cfg` directly instead of `/etc/default/grub` plus regeneration.",
   "Exam clues are specific. 'No bootable device' or 'grub rescue>' is a boot loader problem, fixed from rescue media with chroot and grub-install. 'Kernel panic after an update' means boot the previous kernel. 'Unable to mount root fs' points to `root=` or the initramfs. 'Emergency mode after adding a disk' means `/etc/fstab`. 'Boot once into single-user mode' is `systemd.unit=rescue.target` at the GRUB prompt. 'Read-only root, minimal environment' is emergency.target."
  ],
  "analogy": "Rescue and emergency targets are like two levels of a building's emergency mode. Rescue mode is the building with lights on in your office and the hallway, but the elevators and cafeteria closed: local filesystems mounted, very few services. Emergency mode is a flashlight in the lobby: the root filesystem is read-only and almost nothing else runs. You use the flashlight only when even the hallway lights will not come on, such as a broken fstab entry.",
  "mnemonic": "Boot stages in order: 'Fresh Bread Keeps Simply' for Firmware, Boot loader (GRUB), Kernel plus initramfs, then Systemd and mounts. Match the failure message to the stage.",
  "terms": [
   [
    "GRUB rescue prompt",
    "A minimal GRUB shell shown when the boot loader cannot find its configuration or modules."
   ],
   [
    "Previous kernel",
    "An older installed kernel selectable from the GRUB menu, used when a new one fails."
   ],
   [
    "initramfs",
    "The initial RAM filesystem with drivers and tools needed to mount the real root filesystem."
   ],
   [
    "rescue.target",
    "A single-user systemd target with local filesystems mounted and minimal services."
   ],
   [
    "emergency.target",
    "The most minimal systemd target, with root mounted read-only and almost nothing else started."
   ],
   [
    "chroot",
    "Runs commands with a different directory as root, used to repair an installed system from rescue media."
   ],
   [
    "nofail",
    "An fstab option that lets boot continue if that filesystem cannot be mounted."
   ],
   [
    "/etc/default/grub",
    "The file holding persistent GRUB settings, applied by regenerating grub.cfg."
   ]
  ],
  "example": "After a storage migration, a server boots to 'You are in emergency mode'. journalctl -xb shows a timeout waiting for a device with a UUID that no longer exists. You run mount -o remount,rw /, replace the old UUID in /etc/fstab with the new one from blkid, test with mount -a, and reboot successfully.",
  "mistakes": [
   [
    "Emergency mode after adding a disk means the operating system must be reinstalled.",
    "It almost always means a bad /etc/fstab line. Read journalctl -xb, remount root read-write, fix or comment out the entry, test with findmnt --verify and mount -a, then reboot."
   ],
   [
    "You can edit /etc/fstab immediately in emergency mode.",
    "The root filesystem is read-only there. Run mount -o remount,rw / first."
   ],
   [
    "Rescue mode and emergency mode are the same thing.",
    "rescue.target mounts local filesystems and starts minimal services; emergency.target mounts root read-only and starts almost nothing."
   ],
   [
    "To change kernel parameters permanently, edit grub.cfg directly.",
    "grub.cfg is generated. Edit /etc/default/grub (or use grubby on RHEL-family systems) and regenerate the configuration."
   ]
  ],
  "tryit": [
   [
    "After a routine update, a server panics with 'VFS: Unable to mount root fs' on the newest kernel. The GRUB menu still lists the previous kernel. What do you do tonight, and what do you fix tomorrow?",
    "Tonight, select the previous kernel from the GRUB menu so the server boots, and make it the default if needed. Tomorrow, rebuild the new kernel's initramfs (dracut -f --kver <version> or update-initramfs -u) or correct the root= argument, then test the new kernel in a maintenance window."
   ],
   [
    "A contractor left, and nobody knows the root password of a RHEL-family server that has SELinux enforcing. You have console access and authorization. What is the recovery approach and the step people forget?",
    "Interrupt boot at GRUB, add rd.break to the linux line, remount the root filesystem read-write, change the password, and create /.autorelabel so SELinux relabels files at the next boot. Forgetting the relabel can leave the password file mislabeled and block logins. Afterward, set a GRUB password."
   ]
  ],
  "tip": "Emergency mode right after a storage change almost always means /etc/fstab; a kernel panic right after an update usually means booting the previous kernel from GRUB.",
  "check": [
   [
    "How do you boot once into rescue mode without changing any files?",
    "Press e at the GRUB menu, add systemd.unit=rescue.target to the linux line, and boot with Ctrl+X."
   ],
   [
    "In emergency mode the root filesystem is read-only. How do you make it writable to fix /etc/fstab?",
    "mount -o remount,rw /."
   ],
   [
    "A new kernel panics at boot but the old one worked. What is the quickest recovery?",
    "Select the previous kernel from the GRUB menu, then set it as default or fix the new kernel's initramfs."
   ],
   [
    "What should you run before rebooting after editing /etc/fstab?",
    "findmnt --verify and mount -a, to confirm every entry is valid and mounts without errors."
   ],
   [
    "Which fstab option lets the boot continue if a non-essential disk is missing?",
    "nofail."
   ]
  ]
 },
 {
  "t": "Service failures: systemctl status exit codes, journalctl, dependencies, port conflicts",
  "hook": "The monthly patch window at Silverline Credit Union ends at 2 a.m., and the member portal will not come back. Jordan, the admin who applied the updates, has restarted httpd six times and is about to start a seventh. Each time the console prints the same terse 'Job for httpd.service failed'. A second internal service on the same box is failing too, with a cryptic status number in the 200s. The call center opens at 8 a.m., and members will want to check their balances. The answer is already sitting in two commands nobody has read carefully. What do they say?",
  "simple": "When a program that should run in the background (a service) will not start, Linux keeps notes about why. systemctl status gives a short report card: is it running, did it fail, and what number did it return when it stopped. journalctl shows the service's diary of messages. Numbers in the 200s mean systemd could not even launch the program, for example because the file path was wrong. Small numbers like 1 mean the program started and complained about something itself. Other common causes are a service that needs another one to start first, or two programs both trying to use the same network port, like two cars trying to park in one space.",
  "body": [
   "When a service will not start or keeps dying, the answer is almost always in its status and logs. A consistent routine resolves most failures quickly: read the status, then the logs, then test the configuration, then check dependencies, ports, permissions and resources. Linux+ questions often show a fragment of `systemctl status` output and ask what it means, so learn to read it precisely.",
   "`systemctl status name` is step one. The Active line shows states such as `active (running)`, `inactive (dead)`, `activating (auto-restart)` or `failed`, with a `Result:` such as `exit-code`, `signal`, `timeout` or `start-limit-hit`. The process line shows how the main process ended, for example `code=exited, status=1/FAILURE`. Exit statuses from 200 upward are set by systemd itself and point to setup problems before the program even ran: `203/EXEC` means the executable in `ExecStart=` was missing, not executable or had a bad interpreter; `217/USER` means the `User=` account does not exist; `200/CHDIR` a bad working directory; `226/NAMESPACE` a problem setting up sandboxing paths. A status of 1 or 2 is usually the application reporting its own error, and `signal=SEGV` or `signal=KILL` means a signal ended it, possibly the OOM (out-of-memory) killer. `start-limit-hit` means systemd stopped retrying after too many restarts in a short time; fix the cause, then `systemctl reset-failed name`.",
   "Next, read the logs. `journalctl -u name -b` shows the unit's messages from this boot, `-e` jumps to the end, `-x` adds explanations and `-f` follows while you restart it in another terminal. Many applications also write their own logs under `/var/log/<app>/`. Configuration syntax errors are the most frequent cause, so use the application's own checker before restarting: `nginx -t`, `apachectl configtest`, `sshd -t`, `named-checkconf`, `postfix check` and similar.",
   "Dependencies matter because units start in an order defined by `Requires=`, `Wants=`, `After=` and `Before=`. `Requires=` and `Wants=` pull other units in (hard and soft), while `After=` and `Before=` only set ordering. If a required unit fails, the dependent unit fails too with 'Dependency failed'. `systemctl list-dependencies name` shows the tree and `--reverse` shows what depends on it. A service that needs the network or a mount should declare `After=network-online.target` and `Wants=network-online.target`, or `RequiresMountsFor=/data`. A masked unit reports that it is masked and cannot start until unmasked. After editing unit files, or adding a drop-in with `systemctl edit name`, run `systemctl daemon-reload`.",
   "Restart behavior explains many confusing status screens. A unit with `Restart=on-failure` and `RestartSec=5` will show `activating (auto-restart)` between attempts, so it can look alive in one snapshot and dead in the next. systemd counts those attempts against `StartLimitBurst=` within `StartLimitIntervalSec=`, both set in the `[Unit]` section, and when the limit is reached the result becomes `start-limit-hit` and systemd stops trying. To see exactly what systemd is running, use `systemctl cat name`, which prints the unit file plus every drop-in in order, and `systemctl show name -p ExecStart -p User` to see the effective values. `systemd-analyze verify name.service` catches unit file syntax problems before you restart. These commands keep you from editing the wrong file, a frequent cause of changes that seem to be ignored.",
   "Port conflicts cause errors such as 'Address already in use' or 'bind() failed'. Only one process can listen on a given address and port. `ss -tlpn 'sport = :80'` or `ss -tlpn | grep :80` identifies which process holds the port; `lsof -i :80` also works. Resolve it by stopping or disabling the other service, or moving one to a different port. On SELinux (Security-Enhanced Linux) systems a non-standard port also needs a label with `semanage port`, or the bind is denied even when nothing else is listening; if the error says 'Permission denied', check `ausearch -m avc` for AVC (access vector cache) denials. Also check permissions and resources: the service user must be able to read its config and write its data, log and PID (process ID) directories, the disk must not be full, and required environment files must exist.",
   "Consider a worked example. After an upgrade, httpd fails. `systemctl status httpd` shows `failed` with `status=1/FAILURE`, so the program itself ran and reported an error. `journalctl -u httpd -b -e` shows 'Address already in use: AH00072: make_sock: could not bind to address [::]:80'. `ss -tlpn | grep :80` shows nginx, installed as a dependency of a monitoring tool, listening on port 80. You run `systemctl disable --now nginx`, confirm `apachectl configtest` reports Syntax OK, and start httpd successfully. A second service on the same host fails with `203/EXEC`; its unit points to `/opt/app/bin/start`, which the upgrade renamed, so you fix `ExecStart=` in a drop-in and run `daemon-reload`.",
   "Common mistakes: restarting a service repeatedly without reading the logs; editing a unit file and forgetting `daemon-reload`; confusing `After=` with `Requires=`; treating a 200-range code as an application bug instead of a unit file problem; disabling SELinux to fix a port bind instead of labeling the port; and forgetting `reset-failed` after start-limit-hit, so the service still refuses to start.",
   "Exam wording is consistent. 'status=203/EXEC' means check the ExecStart path and permissions. '217/USER' means the User= account is missing. 'Address already in use' means another process has the port, found with `ss -tlpn` or `lsof -i`. 'Changes to the unit file are ignored' means `daemon-reload`. 'Start only after the network is up' is `After=` with `Wants=network-online.target`. 'Show logs for one service since boot' is `journalctl -u name -b`."
  ],
  "analogy": "Exit codes are like the difference between a restaurant that never opened and one that opened and then closed early. A 200-range code means the doors never unlocked: the manager (systemd) could not find the key, the staff account did not exist, or the building address was wrong. A small code like 1 means the restaurant opened and the chef walked out with a complaint written in the logbook (journal). You fix the first with the unit file and the second with the application's configuration.",
  "terms": [
   [
    "203/EXEC",
    "A systemd exit status meaning the ExecStart program could not be executed."
   ],
   [
    "start-limit-hit",
    "A result meaning systemd stopped restarting a unit after too many failures in a short period."
   ],
   [
    "Requires= / After=",
    "Requires pulls in a hard dependency; After only orders startup and pulls nothing in."
   ],
   [
    "daemon-reload",
    "systemctl daemon-reload, which makes systemd reread changed unit files."
   ],
   [
    "Address already in use",
    "The bind error when another process already listens on the requested address and port."
   ],
   [
    "Config test",
    "An application's own syntax checker, such as nginx -t or apachectl configtest, run before restarting."
   ],
   [
    "systemctl reset-failed",
    "Clears a unit's failed state and start-limit counter so it can be started again."
   ]
  ],
  "example": "After an upgrade, httpd fails with 'Address already in use: AH00072: make_sock: could not bind to address [::]:80'. ss -tlpn | grep :80 shows nginx, installed as a dependency of a monitoring tool, listening on port 80. You disable and stop nginx with systemctl disable --now nginx, then start httpd successfully.",
  "mistakes": [
   [
    "status=203/EXEC means the application has a bug.",
    "Codes from 200 upward come from systemd before the program runs. 203/EXEC means the ExecStart path is missing, not executable or has a bad interpreter; fix the unit file or the file on disk."
   ],
   [
    "After= makes sure the other unit is started.",
    "After= only orders startup. Requires= or Wants= pulls the other unit in; they are usually combined, such as Wants= plus After=network-online.target."
   ],
   [
    "Editing a unit file takes effect on the next restart automatically.",
    "systemd caches unit files. Run systemctl daemon-reload after editing (systemctl edit runs it for you when you save a drop-in)."
   ],
   [
    "Disable SELinux when a service on a custom port says Permission denied.",
    "Label the port with semanage port -a -t <type> -p tcp <port> after confirming the AVC denial with ausearch -m avc."
   ]
  ],
  "tryit": [
   [
    "A custom service fails, and systemctl status shows 'Result: start-limit-hit'. The journal from a few minutes earlier shows 'status=217/USER'. A colleague keeps running systemctl start and nothing happens. What is wrong and what is the order of fixes?",
    "217/USER means the account named in User= does not exist. Create the account or correct User= in a drop-in, run systemctl daemon-reload, then systemctl reset-failed name so systemd will try again, and start it. Without reset-failed the start limit keeps blocking it."
   ],
   [
    "nginx fails to start after you change its listen port to 8443. journalctl shows 'bind() to 0.0.0.0:8443 failed (13: Permission denied)', and ss -tlpn shows nothing on 8443. What is the likely cause on a RHEL-family host?",
    "Permission denied with nothing else listening points to SELinux rather than a port conflict. Confirm with ausearch -m avc, then label the port, for example semanage port -a -t http_port_t -p tcp 8443, and start nginx. If the error had been 'Address already in use', ss -tlpn would show the other process."
   ]
  ],
  "tip": "Exit codes in the 200s come from systemd before the program runs, so check the unit file (paths, User=, directories); small codes like 1 usually mean the application itself reported an error in its logs.",
  "check": [
   [
    "A unit fails with status=203/EXEC. What should you check first?",
    "The ExecStart path: that the file exists, is executable, and has a valid shebang or interpreter."
   ],
   [
    "How do you find which process is already using TCP port 443?",
    "ss -tlpn | grep :443 (or lsof -i :443)."
   ],
   [
    "What is the difference between Requires= and After=?",
    "Requires= pulls in another unit as a hard dependency (combined with After=, the unit will not start if that one fails); After= only orders startup and does not pull anything in by itself."
   ],
   [
    "You edited a unit file but systemctl still uses the old settings. What did you forget?",
    "systemctl daemon-reload, which makes systemd reread unit files."
   ],
   [
    "What does status=217/USER mean?",
    "The account named in the unit's User= setting does not exist."
   ]
  ]
 },
 {
  "t": "Security issues: SELinux denials, file permissions, SSH key permissions, locked accounts",
  "hook": "Monday morning at Pinecrest Community College starts with three tickets in a row. The new course catalog page returns 403 Forbidden even though the files look readable. Elena, a developer, says her SSH key suddenly stopped working after a server restore. And the registrar, Mr. Okafor, insists his password is correct, but the system will not let him in. A coworker suggests the quick fix: turn off SELinux, chmod everything to 777, and reset every password. That would make the tickets disappear and open three new security holes. Which control is actually saying no in each case, and what is the smallest correct fix?",
  "simple": "Linux has several locks on its doors, and when something stops working it is often because one of those locks is doing its job. Normal file permissions decide who can read or change a file. SELinux is an extra guard that checks labels, like name badges, on both programs and files, so a web server cannot read a file wearing a home-folder badge. SSH refuses keys stored in folders that other people could change. Accounts can be locked after too many wrong passwords or expire on a set date. The skill is to find which lock is closed and adjust only that one, instead of removing all the locks.",
  "body": [
   "Many 'it just stopped working' tickets are really security controls doing their job: SELinux (Security-Enhanced Linux) blocking an unexpected access, permissions that are too tight or too loose, SSH (Secure Shell) refusing a key, or an account locked after failed logins. The skill is to identify which control is responsible and fix the configuration without weakening security. Exam answers that switch a control off are almost always wrong; answers that make the smallest correct change are right.",
   "SELinux denials often surface as 'Permission denied' or HTTP (Hypertext Transfer Protocol) 403 errors even though normal permissions look correct. First confirm SELinux is involved: `getenforce` shows the mode, and `ausearch -m avc -ts recent` (or `journalctl -t setroubleshoot`, or `sealert -a /var/log/audit/audit.log`) shows AVC (access vector cache) denials naming the source process type, the target file type and the operation. `ls -Z` shows file labels and `ps -eZ` shows process labels.",
   "Reading one AVC record carefully usually gives you the fix. A typical line looks like `type=AVC msg=audit(1712345678.123:456): avc: denied { read } for pid=1432 comm=\"httpd\" name=\"index.html\" scontext=system_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:user_home_t:s0 tclass=file permissive=0`. The braces hold the operation that was blocked, `comm` names the program, `scontext` is the process's label with its type `httpd_t`, `tcontext` is the target's label with its type `user_home_t`, and `tclass` says the target is a file. Here a web server process is trying to read a file still labeled as home directory content, which is the classic sign of files moved with `mv`. `permissive=0` confirms the access was actually blocked rather than only logged. Piping the record through `audit2why` explains the reason in plain language and often suggests a boolean when one applies.",
   "The usual SELinux causes and fixes are: wrong file labels after `mv` or restoring files (fix with `restorecon -Rv path`); content in a non-standard location (add a rule with `semanage fcontext -a -t httpd_sys_content_t '/srv/web(/.*)?'`, then restorecon); a service on a non-standard port (`semanage port -a -t http_port_t -p tcp 8081`); or an optional behavior that needs a boolean (`setsebool -P httpd_can_network_connect on`). Setting permissive mode briefly with `setenforce 0` can confirm SELinux is the cause, but switch back with `setenforce 1` and fix the policy issue rather than leaving it off. `chcon` changes a label temporarily, but a relabel undoes it, so semanage plus restorecon is the durable fix.",
   "File permission problems follow the rules from earlier lessons. The process's user needs read on files, and execute on every directory in the path; check with `namei -l /full/path` and `ls -l`, and see which user a service runs as with `ps -o user= -p PID` or the unit's `User=` setting. Check group membership with `id user`, ACLs (access control lists) with `getfacl`, and mount options like `noexec` with `findmnt`. The fix is the minimal change needed, such as adjusting group ownership or adding an ACL, never `chmod 777`. Also watch for the reverse: world-writable scripts run by root, private keys readable by others, or configuration files containing passwords.",
   "SSH key authentication fails quietly when permissions are loose, because sshd's StrictModes check refuses keys that other users could have tampered with. On the server, the home directory must not be group- or world-writable, `~/.ssh` should be 700, and `~/.ssh/authorized_keys` 600, all owned by the user. On the client, the private key must be 600, or ssh refuses it with 'UNPROTECTED PRIVATE KEY FILE'. An authorized_keys file created in an unusual way may need `restorecon -Rv ~/.ssh`. Diagnose with `ssh -v user@host` on the client and `journalctl -u sshd` (or `/var/log/secure` or `auth.log`) on the server, where 'Authentication refused: bad ownership or modes' points straight to the cause. Locked or expired accounts produce failures that look like wrong passwords: `faillock --user name` shows lockouts (reset with `--reset`), `passwd -S name` shows a locked password (`LK` or `L`), `chage -l name` shows expiry dates, the shell in `/etc/passwd` might be `nologin`, and for directory accounts check SSSD (System Security Services Daemon) and `id name`.",
   "Consider a worked example. After a home directory restore, a developer's SSH key login fails and falls back to a password prompt. `ssh -v` shows the key offered and rejected. On the server, `journalctl -u sshd` shows 'Authentication refused: bad ownership or modes for directory /home/dev'. The restore left the home directory group-writable, and `ls -Z` shows `~/.ssh` carrying a generic label. You run `chmod 755 /home/dev`, `chmod 700 /home/dev/.ssh`, `chmod 600 /home/dev/.ssh/authorized_keys` and `restorecon -Rv /home/dev/.ssh`, and key login works. The same week, a web server returns 403 for content moved from a home directory to `/srv/web`; `ausearch -m avc` shows `user_home_t` labels, and a semanage fcontext rule plus restorecon fixes it without touching enforcing mode.",
   "Common mistakes: disabling SELinux or leaving it permissive; using `chcon` as a permanent fix; running `chmod 777` to make an error disappear; fixing file permissions but forgetting execute on a parent directory; loosening `~/.ssh` permissions in an attempt to help; unlocking an account without checking whether the failures were an attack; and checking only the password when the account has expired or has a `nologin` shell.",
   "Exam questions reward identifying the control. 'Permission denied but permissions look fine on RHEL (Red Hat Enterprise Linux)' means SELinux, so check `ausearch -m avc` and fix with restorecon, semanage or a boolean. 'Files moved into the web root now return 403' is a labeling issue fixed by restorecon. 'Key rejected, bad ownership or modes' is StrictModes. 'UNPROTECTED PRIVATE KEY FILE' is the client key needing 600. 'Account locked after failed attempts' is faillock, and 'password expired' is chage."
  ],
  "analogy": "SELinux labels work like color-coded wristbands at a concert. Your ticket (normal permissions) may say you can enter the building, but the guard at the backstage door checks the wristband color too. If you moved to a new section without getting a new wristband, the guard turns you away even with a valid ticket. restorecon hands out the correct wristband for where you now are. Where the analogy stops: SELinux checks the program's band and the file's band together against policy, not just one person.",
  "terms": [
   [
    "AVC denial",
    "An SELinux access vector cache message recording a blocked access, found with ausearch -m avc."
   ],
   [
    "restorecon",
    "Resets SELinux file labels to the values defined by policy."
   ],
   [
    "semanage fcontext",
    "Adds a persistent SELinux labeling rule for a path, applied with restorecon."
   ],
   [
    "SELinux boolean",
    "An on/off policy switch such as httpd_can_network_connect, set persistently with setsebool -P."
   ],
   [
    "StrictModes",
    "The sshd check that refuses keys when home, ~/.ssh or authorized_keys permissions are too open."
   ],
   [
    "namei -l",
    "Shows permissions for every component of a path, revealing a missing execute bit on a parent directory."
   ],
   [
    "passwd -S",
    "Shows an account's password status, including whether it is locked."
   ],
   [
    "faillock",
    "Shows and resets account lockouts caused by repeated failed logins."
   ]
  ],
  "example": "After a home directory restore, a developer's SSH key login fails and falls back to a password prompt. journalctl -u sshd shows 'Authentication refused: bad ownership or modes for directory /home/dev'. The restore left the home directory group-writable. chmod 755 /home/dev, chmod 700 ~/.ssh, chmod 600 ~/.ssh/authorized_keys and restorecon -Rv /home/dev/.ssh restore key login.",
  "mistakes": [
   [
    "Disable SELinux or set it to permissive to fix a denial.",
    "Permissive mode can briefly confirm SELinux is involved, but the fix is restorecon, a semanage fcontext or port rule, or a boolean. Return to enforcing with setenforce 1."
   ],
   [
    "chcon is the right way to fix a file label permanently.",
    "chcon changes are lost on a relabel. Add a rule with semanage fcontext and apply it with restorecon."
   ],
   [
    "Loosening ~/.ssh permissions helps SSH read the key.",
    "The opposite: sshd's StrictModes refuses keys if home is group- or world-writable, ~/.ssh is not 700 or authorized_keys is not 600."
   ],
   [
    "If a password stops working, the user forgot it.",
    "Check faillock --user, passwd -S, chage -l and the login shell in /etc/passwd first; the account may be locked, expired or set to nologin."
   ]
  ],
  "tryit": [
   [
    "A web application must call an external payment API, but every outbound connection from httpd fails with 'Permission denied' on a RHEL-family server. File permissions are not involved. ausearch -m avc shows httpd_t denied name_connect. What is the minimal fix?",
    "This is an optional behavior controlled by an SELinux boolean. Run setsebool -P httpd_can_network_connect on (the -P makes it survive reboots). Do not disable SELinux; the boolean grants only the needed capability."
   ],
   [
    "A developer copies their private key to a new laptop and ssh prints 'UNPROTECTED PRIVATE KEY FILE' and ignores it. ls -l shows -rw-r--r--. What do you tell them?",
    "The client refuses private keys that others can read. Run chmod 600 on the key file (and keep ~/.ssh at 700). This is a client-side check, separate from the server's StrictModes."
   ]
  ],
  "tip": "When access fails but permissions look fine on an SELinux system, check ausearch -m avc before touching chmod; the fix is usually restorecon, semanage or a boolean, never disabling SELinux.",
  "check": [
   [
    "What permissions should ~/.ssh and ~/.ssh/authorized_keys have for key login to work reliably?",
    "~/.ssh 700 and authorized_keys 600, owned by the user, with a home directory not writable by group or others."
   ],
   [
    "A user says their password suddenly stopped working. Name three commands to check account status.",
    "faillock --user <name>, passwd -S <name> and chage -l <name> (also check the shell in /etc/passwd)."
   ],
   [
    "Why is chmod 777 a poor fix for a permission denied error?",
    "It grants everyone full access, creating a security hole instead of granting only the minimum access the process needs."
   ],
   [
    "Web content moved with mv returns 403, and ausearch shows an AVC denial. What is the likely fix?",
    "restorecon -Rv on the content (adding a semanage fcontext rule first if it is a non-standard location), because mv kept the old SELinux label."
   ]
  ]
 },
 {
  "t": "Hardware: dmesg, lspci, lsusb, smartctl, failing disks and RAID degradation",
  "hook": "The file server at Redwood Architecture has been acting strangely all week. Saving large drawings sometimes takes a minute, and on Wednesday the XFS filesystem logged an error that nobody understood. Tomas, the office's part-time admin, has already run a filesystem check twice and is ready to blame the latest update. You suspect something more physical. The server has two disks in a software mirror, and nobody remembers setting up alerts for it. If one disk is already gone and the other is struggling, years of client projects are at risk. What evidence will confirm it, and what do you do first?",
  "simple": "Computers can tell you when their parts are sick, if you know where to look. The kernel keeps a running diary of hardware events, read with dmesg, where disk errors and devices plugging in show up. lspci and lsusb list the parts that are connected and which drivers run them. Disks keep their own health records, called SMART, read with smartctl. When two disks copy each other in a RAID mirror and one dies, the computer keeps working on the remaining disk, but there is no spare copy anymore. That state is called degraded, and you should replace the bad disk before the other one fails.",
  "body": [
   "Hardware problems often masquerade as software bugs: random crashes, filesystem errors, slow I/O or devices that disappear. Linux gives you good visibility into hardware through kernel messages and inventory tools, and Linux+ expects you to use them to confirm or rule out a hardware fault before spending hours on configuration. The workflow is to read the kernel's view, identify the device and driver, check the device's own health data, and then protect data if a disk is failing.",
   "The kernel ring buffer records hardware detection, driver messages and errors. `dmesg` prints it, `dmesg -T` shows human-readable timestamps, `dmesg -w` follows new messages, and `dmesg --level=err,warn` filters by severity; `journalctl -k` shows the same messages from the journal, including previous boots with `-b -1`. Look for I/O errors (`blk_update_request: I/O error`, `Buffer I/O error`), ATA (Advanced Technology Attachment) or NVMe (Non-Volatile Memory Express) resets and timeouts, 'Medium Error' messages, filesystem errors from ext4 or XFS, machine check exceptions reporting CPU (central processing unit) or memory faults, and USB (Universal Serial Bus) devices repeatedly connecting and disconnecting. Reading dmesg right after plugging in a device shows the name it received, such as `sdb`.",
   "Inventory tools identify hardware and drivers. `lspci` lists PCI (Peripheral Component Interconnect) devices such as network cards, storage controllers and GPUs (graphics processing units); `lspci -k` shows the kernel driver in use for each, which is the quickest way to spot a device with no driver, and `-nn` adds vendor and device IDs. `lsusb` lists USB devices, with `-t` for a tree and `-v` for detail. Related tools include `lscpu` for CPU details, `lsblk` for block devices, `lshw` or `dmidecode` for a full inventory including memory modules and firmware, `lsmem` for memory, `lsmod` and `modprobe` for loaded and loadable drivers, and `sensors` for temperatures if lm-sensors is installed.",
   "Disks report their own health through SMART (Self-Monitoring, Analysis and Reporting Technology). The `smartctl` tool from smartmontools reads it: `smartctl -H /dev/sda` gives an overall PASSED or FAILED verdict, `smartctl -a /dev/sda` shows all attributes and the error log, and `smartctl -t short /dev/sda` or `-t long` runs a self-test whose results appear later in `-a` output. Warning signs include growing reallocated, pending or offline-uncorrectable sector counts on hard drives, and media errors or low available spare on NVMe drives. A PASSED verdict does not guarantee health, so trends in these counters matter more. The `smartd` service monitors drives continuously and sends alerts.",
   "In software RAID (redundant array of independent disks), a failing disk leads to a degraded array: it keeps working using the remaining disks, but it has lost redundancy, so another failure could lose data. `cat /proc/mdstat` shows member status, where `[UU]` means both mirror members are up and `[U_]` means one is missing, and `mdadm --detail /dev/md0` reports the state as clean, degraded or recovering and lists faulty devices. Configure `mdadm --monitor` or the mdmonitor service to send alerts. To replace a disk: `mdadm /dev/md0 --fail /dev/sdb1 --remove /dev/sdb1`, physically swap the drive, copy the partition layout (for example `sfdisk -d /dev/sda | sfdisk /dev/sdb`, or `sgdisk` for GPT, the GUID Partition Table that uses globally unique identifiers), then `mdadm /dev/md0 --add /dev/sdb1` and watch the rebuild in /proc/mdstat. Hardware RAID controllers use the vendor's utility instead. During a rebuild the remaining disks are heavily loaded, another reason to keep current backups.",
   "How much risk a degraded array carries depends on its RAID level. RAID 0 stripes data with no redundancy, so losing one disk loses the array. RAID 1 mirrors data and survives the loss of one member of a two-disk mirror. RAID 5 survives one failed disk, and RAID 6 survives two, while RAID 10 survives one failure per mirrored pair. A healthy two-disk mirror in `/proc/mdstat` looks like `md0 : active raid1 sdb1[1] sda1[0]` followed by a line ending in `[2/2] [UU]`; a degraded one shows `[2/1] [U_]`, and a failed member is marked with `(F)`. Because names like `sdb` can change between boots, confirm which physical drive to pull by its serial number, shown by `smartctl -i` or the links in `/dev/disk/by-id/`, before anyone opens the chassis.",
   "Consider a worked example. A file server logs occasional XFS errors, and users report slow saves. `dmesg -T --level=err` shows repeated ATA errors and resets on `sdc`. `smartctl -a /dev/sdc` reports a pending sector count that has risen since last week's check, and `cat /proc/mdstat` shows `md1` as `[U_]`, meaning the kernel already kicked the failing partition out of the mirror. You confirm the latest backup, run `mdadm /dev/md1 --remove /dev/sdc1` (it is already marked faulty), replace the drive, copy the partition table from the healthy disk, add the new partition, and watch the rebuild until the array shows `[UU]`. Then you run `xfs_repair -n` during a maintenance window to confirm the filesystem is clean.",
   "Common mistakes: chasing filesystem errors with repair tools while ignoring the disk that causes them; trusting a PASSED SMART verdict while sector counts climb; not noticing a degraded array because no alerts were configured; removing the healthy member instead of the failed one; forgetting to copy the partition layout before adding the new disk; and treating RAID as a backup, which it is not, since deletions and corruption are mirrored too.",
   "Exam questions pair clues with commands. 'Which driver is a network card using' is `lspci -k`. 'Is a USB device detected' is `lsusb` plus `dmesg`. 'Kernel messages with readable timestamps' is `dmesg -T`. 'Disk health verdict' is `smartctl -H`, and 'full attributes and error log' is `smartctl -a`. '[U_] in /proc/mdstat' means degraded. 'Replace a failed member' is `mdadm --fail`, `--remove`, then `--add`."
  ],
  "analogy": "A degraded RAID mirror is like a twin-engine plane that has lost one engine. It still flies and passengers may not notice, but there is no margin left: losing the second engine is a crash. Replacing the failed disk is landing to fix the engine, and the rebuild is the period where the healthy engine is working hardest. The analogy stops in one way: unlike a plane, RAID does not protect you from pilot error, since deleted or corrupted files are copied to both disks, so you still need backups.",
  "terms": [
   [
    "dmesg",
    "Prints the kernel ring buffer of hardware detection, driver and error messages."
   ],
   [
    "lspci -k",
    "Lists PCI devices together with the kernel driver in use for each."
   ],
   [
    "lsusb",
    "Lists USB devices, with -t for a tree view."
   ],
   [
    "SMART",
    "Self-Monitoring, Analysis and Reporting Technology, the health data disks keep about themselves, read with smartctl."
   ],
   [
    "Reallocated sectors",
    "Bad sectors a disk has remapped to spares; a rising count signals a failing drive."
   ],
   [
    "Degraded array",
    "A RAID array still serving data after losing a member, but without redundancy."
   ],
   [
    "mdadm",
    "The tool for creating, monitoring and repairing Linux software RAID arrays."
   ],
   [
    "/proc/mdstat",
    "The kernel file showing software RAID arrays, their members and status such as [UU] or [U_]."
   ]
  ],
  "example": "A file server logs occasional XFS errors. dmesg -T shows repeated ATA errors on sdc, smartctl -a /dev/sdc reports a rising pending sector count, and /proc/mdstat shows md1 as [U_]. You fail and remove sdc1 from the array, replace the drive, copy the partition table, add the new partition, and monitor the rebuild until the array shows [UU].",
  "mistakes": [
   [
    "Repeated filesystem errors mean you should keep running fsck or xfs_repair.",
    "Check dmesg and SMART first. Filesystem errors are often a symptom of a failing disk, and repair tools cannot fix bad hardware."
   ],
   [
    "smartctl -H says PASSED, so the disk is healthy.",
    "The verdict only fails at vendor thresholds. Rising reallocated, pending or uncorrectable counts (or NVMe media errors) show deterioration earlier."
   ],
   [
    "A RAID 1 mirror means backups are unnecessary.",
    "RAID protects against disk failure only. Deletions, ransomware and corruption are mirrored instantly, so backups are still required."
   ],
   [
    "Pull the disk named sdb because mdadm said sdb1 failed.",
    "Device names can change. Confirm the physical drive by serial number with smartctl -i or /dev/disk/by-id before removing it, or you may pull the healthy member."
   ]
  ],
  "tryit": [
   [
    "A new 10 GbE network card is installed, but ip link does not show a new interface. What do you check, and with which commands?",
    "Run lspci -k to confirm the card is detected and see whether a kernel driver is in use. If no driver line appears, look in dmesg for firmware or driver errors and load or install the right module with modprobe. lspci -nn gives the vendor and device IDs to find the correct driver."
   ],
   [
    "cat /proc/mdstat shows md0 as [2/1] [U_] with sdb1 marked (F). The disk has been replaced with an identical model. List the steps to restore redundancy.",
    "Remove the failed member if still listed (mdadm /dev/md0 --remove /dev/sdb1), copy the partition layout from the healthy disk (sfdisk -d /dev/sda | sfdisk /dev/sdb, or sgdisk for GPT), add the new partition with mdadm /dev/md0 --add /dev/sdb1, and watch /proc/mdstat until it shows [UU]. Confirm backups are current before starting, and make sure mdmonitor alerts are configured."
   ]
  ],
  "tip": "An array showing [U_] in /proc/mdstat is degraded: it still works, but the failed member must be replaced before another disk fails. RAID is not a backup.",
  "check": [
   [
    "Which command shows which kernel driver a network card is using?",
    "lspci -k."
   ],
   [
    "How do you get a quick overall health verdict for /dev/nvme0n1?",
    "smartctl -H /dev/nvme0n1."
   ],
   [
    "What does [U_] mean in /proc/mdstat?",
    "The array is degraded: one member is up and one is missing or failed."
   ],
   [
    "Why is a PASSED SMART verdict not enough on its own?",
    "The overall verdict only fails at thresholds; rising reallocated or pending sector counts can show a disk is deteriorating well before then."
   ],
   [
    "Which command lists USB devices as a tree?",
    "lsusb -t."
   ]
  ]
 },
 {
  "t": "Time sync: chrony, timedatectl, clock skew effects on TLS and Kerberos",
  "hook": "It is 8:05 a.m. at Lakeshore Medical Group, and the front desk staff on one workstation cannot log in. The domain accounts work everywhere else. Then the same machine's package manager complains that a perfectly valid certificate is not yet valid, and Fatima, the practice manager, adds that her authenticator app codes keep getting rejected on that system too. Three different errors from three different services, all on one Linux machine, all starting this week. Before anyone reinstalls SSSD or calls the certificate vendor, one quick command might explain all of them. What is the common thread?",
  "simple": "Computers need to agree on the time, the way people meeting for coffee need their watches to match. Linux keeps time with a running clock and a small battery-powered clock for when it is off. A program called chrony checks trusted time servers on the internet or your network and gently corrects the clock. timedatectl shows whether that is working. If the clock drifts too far, things that rely on timestamps start failing: website certificates look expired, domain logins using Kerberos are refused, and the six-digit codes from authenticator apps stop matching. So when several unrelated security errors appear on one machine, check its clock first.",
  "body": [
   "Accurate time sounds like a nicety, but many systems depend on it. Log correlation across servers, scheduled jobs, certificate validation, authentication protocols, distributed databases and backups all break in confusing ways when clocks disagree. Linux+ expects you to configure time synchronization, verify that it is working, and recognize the symptoms of clock skew, which often show up as security or authentication errors rather than obvious time problems.",
   "Linux has two clocks: the system clock maintained by the kernel while running, and the hardware clock, also called the RTC (real-time clock), which keeps time while the machine is off. `timedatectl` shows both, along with the time zone and whether synchronization is active ('System clock synchronized: yes' and 'NTP service: active'). Use `timedatectl set-timezone America/Chicago` to change the zone (`timedatectl list-timezones` lists them), `timedatectl set-ntp true` to enable automatic synchronization, and `timedatectl set-time` only when NTP is off. Servers commonly keep the RTC in UTC (Coordinated Universal Time). `hwclock --systohc` copies the system time to the hardware clock and `hwclock --show` reads it.",
   "NTP (Network Time Protocol) keeps the system clock accurate by querying time servers over UDP (User Datagram Protocol) port 123. On most current distributions the NTP implementation is chrony, whose daemon is `chronyd` and whose configuration is `/etc/chrony.conf` or `/etc/chrony/chrony.conf`. `server ntp1.example.com iburst` adds a server, and `iburst` speeds up initial synchronization; `pool` lines use a set of servers from a pool; `makestep 1.0 3` allows the clock to jump instead of slewing gradually when it is more than one second off during the first three updates; and `allow 10.0.0.0/8` lets chrony serve time to other hosts. Some systems use the simpler `systemd-timesyncd` client instead; only one time service should run at a time.",
   "Verify with `chronyc`: `chronyc sources -v` lists servers, where `^*` marks the currently selected source, `^+` an acceptable alternative and `^?` an unreachable one; `chronyc tracking` shows the current offset from true time, stratum and frequency error; `chronyc makestep` forces an immediate correction. If no source is reachable, check the firewall for outbound UDP 123, DNS resolution of the server names, and whether the servers are healthy. Virtual machines can drift noticeably after being paused or migrated, so they need synchronization too.",
   "The columns of `chronyc sources` tell a story once you know them. Each line starts with a mode and state, such as `^*`, then the server name or address, its stratum, the polling interval, a Reach value, the time since the last good sample (LastRx) and the measured offset. Reach is an octal record of the last eight polls, so 377 means all eight succeeded and 0 means none did. A server stuck at Reach 0 with `^?` is unreachable, which usually points to a firewall, DNS or the server itself. It also helps to know how chrony corrects time. By default it slews the clock, speeding it up or slowing it down slightly until it matches, because jumping time backward can confuse applications and logs. Stepping happens only when `makestep` allows it or when you run `chronyc makestep` yourself.",
   "Clock skew effects are exam favorites. TLS (Transport Layer Security) certificates have 'not before' and 'not after' validity dates, so a client whose clock is wrong may reject a valid certificate as expired or not yet valid, causing HTTPS (secure web), package repository and API (application programming interface) failures. Kerberos tickets carry timestamps to prevent replay attacks, and by default the KDC (Key Distribution Center) rejects requests if client and server clocks differ by more than about five minutes, producing 'Clock skew too great' errors and failed domain logins through SSSD (System Security Services Daemon). TOTP (time-based one-time password) codes used for MFA (multifactor authentication) also fail when the clock is off. Skewed clocks also make logs from different hosts impossible to line up during an investigation, and can make cron jobs and timers run at unexpected times. So when you see certificate errors on only one machine, Kerberos or Active Directory failures, or rejected MFA codes, check the time first.",
   "Consider a worked example. Users on one Linux workstation cannot log in with their Active Directory accounts, and the SSSD logs mention clock skew. `timedatectl` shows 'System clock synchronized: no' and the clock is eight minutes behind. `chronyc sources -v` shows every server as `^?`, unreachable. You find that a new firewall rule blocks outbound UDP 123. After allowing it, `chronyc sources` shows `^*` next to a server within a minute, `chronyc makestep` corrects the clock at once, and `chronyc tracking` reports an offset of a few milliseconds. Domain logins work again, and the same fix clears an earlier 'certificate not yet valid' error from the package manager.",
   "Common mistakes: setting the time by hand with `date` while NTP is broken, which drifts again; running chronyd and systemd-timesyncd together; confusing the time zone with the clock being wrong, since a wrong zone changes display, not UTC; forgetting the firewall rule for UDP 123; troubleshooting Kerberos or certificates for hours before checking the clock; and assuming virtual machines inherit perfect time from the host.",
   "Exam wording gives clear clues. 'Is the clock synchronized' is `timedatectl` or `chronyc tracking`. 'Which server is selected' is `chronyc sources`, looking for `^*`. 'Change the time zone' is `timedatectl set-timezone`. 'Clock skew too great' is Kerberos needing time sync. 'Certificate not yet valid on one host only' points to that host's clock. 'NTP port' is UDP 123, and 'speed up initial sync' is `iburst`."
  ],
  "analogy": "A Kerberos ticket is like a dated concert wristband that is only valid for the evening it is issued. If the gate attendant's watch says it is tomorrow, or the issuer's says it was yesterday, a perfectly good band is rejected. TLS certificates are similar, with printed start and end dates checked against your own watch. The analogy stops with the size of the margin: Kerberos tolerates only a few minutes of disagreement by default, while certificate dates usually span months, so certificates fail only when a clock is badly wrong.",
  "terms": [
   [
    "NTP",
    "Network Time Protocol, which synchronizes clocks with time servers over UDP port 123."
   ],
   [
    "chrony",
    "The common Linux NTP implementation, with chronyd as the daemon and chronyc as the client."
   ],
   [
    "timedatectl",
    "Shows and sets system time, time zone and whether NTP synchronization is enabled."
   ],
   [
    "RTC",
    "The real-time (hardware) clock that keeps time while the system is powered off."
   ],
   [
    "Stratum",
    "An NTP server's distance from a reference clock; lower numbers are closer."
   ],
   [
    "Clock skew",
    "The difference between clocks on different systems, which breaks time-sensitive protocols."
   ],
   [
    "chronyc sources",
    "Lists configured time sources; ^* marks the selected one, ^? an unreachable one."
   ]
  ],
  "example": "Users on one Linux workstation cannot log in with their Active Directory accounts, and the SSSD logs mention clock skew. timedatectl shows 'System clock synchronized: no', and chronyc sources shows every server as unreachable because a new firewall rule blocks outbound UDP 123. After allowing it, chronyc makestep corrects the clock and domain logins work again.",
  "mistakes": [
   [
    "Fix a drifting clock by setting it with date.",
    "Without working synchronization the clock drifts again. Fix NTP (firewall for UDP 123, reachable servers, chronyd running) and let chrony correct it, using chronyc makestep for a large jump."
   ],
   [
    "A wrong time zone and a wrong clock are the same problem.",
    "The zone changes only how time is displayed; the underlying UTC time can still be correct. Kerberos and TLS care about the actual time."
   ],
   [
    "Running both chronyd and systemd-timesyncd adds redundancy.",
    "Only one time service should run; two will fight over the clock."
   ],
   [
    "Virtual machines get perfect time from the host, so they do not need NTP.",
    "VMs can drift, especially after being paused or migrated, so they need synchronization too."
   ]
  ],
  "tryit": [
   [
    "A new server's chronyc sources output shows three pool servers, each with ^? and Reach 0. DNS resolves the names fine. What is the most likely cause and how do you verify the fix?",
    "Outbound UDP 123 is probably blocked by a host or network firewall. Allow it, then watch chronyc sources until one server shows ^* and Reach climbs, and confirm the offset with chronyc tracking."
   ],
   [
    "You manage twenty internal servers that cannot reach the internet. How can they still keep accurate, consistent time?",
    "Configure one or two internal hosts with chrony to sync from an approved upstream source and add an allow line (for example allow 10.0.0.0/8) so they serve time. Point the other servers at them with server lines and iburst, and permit UDP 123 between them."
   ]
  ],
  "tip": "Certificate 'not yet valid' errors on a single host, Kerberos 'clock skew too great' messages and rejected MFA codes are all classic signs of a wrong system clock.",
  "check": [
   [
    "Which command shows whether the system clock is currently synchronized?",
    "timedatectl (look for 'System clock synchronized: yes'), or chronyc tracking for details."
   ],
   [
    "What does ^* mean in chronyc sources output?",
    "It marks the time source chrony has currently selected for synchronization."
   ],
   [
    "Why can a wrong clock break HTTPS connections?",
    "Certificate validity dates are checked against the local clock, so a valid certificate may appear expired or not yet valid."
   ],
   [
    "Which port and protocol must a firewall allow for NTP?",
    "UDP port 123."
   ],
   [
    "Which command changes the system time zone?",
    "timedatectl set-timezone <Region/City>, after finding the name with timedatectl list-timezones."
   ]
  ]
 },
 {
  "t": "Package problems: broken dependencies, repository errors, held packages",
  "hook": "The quarterly patch report is due Friday at Harborview Credit Union, and Sam, the junior admin, is stuck. On an Ubuntu server, a dozen packages have been 'kept back' for months. On a RHEL-family server, dnf refuses to download anything. And a third machine lost power halfway through an install and now every apt command complains. A forum post suggests the shortcuts: force the install, delete the lock files, turn off signature checking. They would make the errors vanish and could leave the servers broken or trusting anything. The auditors will read this report. What does each error really mean, and what is the safe fix?",
  "simple": "A package manager is like an app store for Linux that also makes sure each app gets the parts it needs. Problems come in a few kinds. Sometimes the parts do not fit together (broken dependencies), often because packages came from mismatched sources. Sometimes an install was interrupted and left half done. Sometimes the store itself cannot be reached, or its security signature cannot be checked. And sometimes a package is held on purpose so it will not update. Each has a safe fix, such as finishing the interrupted install or importing the correct signing key, and a risky shortcut, such as forcing the install or turning off signature checks.",
  "body": [
   "Package managers are reliable, but updates and installs can still fail. The most common problems are unresolvable dependencies, interrupted operations, repository errors and packages deliberately held back. Reading the error carefully usually tells you which of these you are dealing with, and each has a safe fix and a tempting unsafe one. Linux+ expects you to know both families: dnf and rpm (the RPM Package Manager) on RHEL, or Red Hat Enterprise Linux, family systems, apt and dpkg on Debian-family systems.",
   "Broken dependencies happen when a package needs a version of a library or another package that is not available or conflicts with something installed. Causes include mixing repositories for different distribution releases, installing individual packages manually with `rpm -i` or `dpkg -i`, third-party repositories that replace base packages, and interrupted installs. On Debian-family systems, `apt --fix-broken install` (or `apt-get -f install`) tries to complete or repair a half-finished installation, and `apt-cache policy name` shows available versions and which repository each comes from. On RPM systems, dnf reports conflicts clearly; `dnf check` finds problems in the installed set, `dnf repoquery --requires name` or `rpm -qR name` shows what a package needs, and `--allowerasing` (letting dnf remove conflicting packages) or `--best` change the solver's behavior. Read carefully before accepting removals. Avoid forcing installs with `rpm --nodeps` or `dpkg --force-depends`, which leave the system inconsistent.",
   "Interrupted package operations leave locks behind or leave the database mid-change. `dpkg --configure -a` finishes configuring packages left unconfigured by an interruption. apt reports 'Could not get lock /var/lib/dpkg/lock-frontend' when another apt process, often an automatic update, is still running; wait for it or find it with `ps`, rather than deleting lock files while it runs. If the RPM database is damaged, `rpm --rebuilddb` can rebuild it, and `dnf history` shows recent transactions with `dnf history undo <id>` to roll one back.",
   "Repository errors appear as failures to download metadata or packages. A 404 means the repository URL (web address) or release name is wrong, or the release reached end of life and moved to an archive. 'Failed to download metadata for repo' or 'Temporary failure resolving' points to DNS (Domain Name System), proxy or network problems, including a missing proxy setting. GPG (GNU Privacy Guard) errors such as 'NO_PUBKEY' or 'public key not installed' mean the repository's signing key has not been imported or has rotated. TLS (Transport Layer Security) certificate errors can be caused by a wrong system clock. Check the repository files in `/etc/yum.repos.d/` or `/etc/apt/sources.list.d/`, test the URL with `curl -I`, confirm DNS and proxy settings, and import the correct key through the vendor's documented method, verifying its fingerprint. Clear stale metadata with `dnf clean all` and `dnf makecache`, or refresh with `apt update`. Disabling GPG checking to make an error go away is a security risk and the wrong fix.",
   "A few inspection commands make repository and version questions concrete. `dnf repolist` shows which repositories are enabled, and `dnf repolist all` includes disabled ones; you can skip a broken repository for one command with `--disablerepo=name`, or set `enabled=0` in its `.repo` file while you fix it. On Debian-family systems, `apt-cache policy name` prints an Installed line, a Candidate line and a version table with the repository and priority for each version, so you can see at a glance why apt chose one version over another or why the candidate is older than you expected. When dnf proposes a transaction, it lists packages to install, upgrade and remove before asking for confirmation; read the Removing section closely, especially when you have added `--allowerasing`, because that is where an important package can quietly disappear.",
   "Held packages are deliberately prevented from upgrading, often to protect a kernel or application version others depend on. On Debian-family systems, `apt-mark hold name` holds a package, `apt-mark showhold` lists holds and `apt-mark unhold name` releases one; apt reports 'The following packages have been kept back' for holds and for upgrades that would need new dependencies, which `apt full-upgrade` or an explicit `apt install name` can resolve. On RPM systems, the versionlock plug-in (`dnf versionlock add name`, `dnf versionlock list`, `dnf versionlock delete name`) does the same, and `exclude=` lines in `/etc/dnf/dnf.conf` or a `.repo` file hide packages from updates entirely. When a package will not update, check for holds, versionlocks and excludes, and ask why they were set before removing them.",
   "Consider a worked example. An Ubuntu server's nightly update reports that several packages were kept back. `apt-mark showhold` lists the kernel packages, held months ago during a driver issue that the change log shows has since been fixed. After confirming with the team, you run `apt-mark unhold` on them, apply the updates and schedule a reboot. On a RHEL-family server the same night, `dnf upgrade` fails with 'Failed to download metadata for repo'. `curl -I` against the baseurl shows a proxy error, and you find the new proxy address was never added to `/etc/dnf/dnf.conf`. Adding `proxy=` there, then `dnf clean all` and `dnf makecache`, fixes it without touching gpgcheck.",
   "Common mistakes: forcing an install with `--nodeps` or `--force-depends`; deleting apt lock files while another process is running; setting `gpgcheck=0` or trusting unsigned repositories to silence key errors; mixing repositories from different releases; accepting a dnf transaction that removes important packages without reading it; removing someone else's hold without asking why; and forgetting that a wrong clock can cause repository TLS errors.",
   "Exam wording maps to fixes. 'Interrupted install on Debian or Ubuntu' is `dpkg --configure -a` then `apt --fix-broken install`. 'Could not get lock' means another package process is running. 'NO_PUBKEY' means import the correct, verified key. '404 for an old release' means the repository moved or reached end of life. 'Kept back' points to holds or new dependencies. 'Prevent a package from updating' is `apt-mark hold` or `dnf versionlock`."
  ],
  "analogy": "Repository signing keys work like the tamper-evident seal on a medicine bottle. The seal proves the contents came from the manufacturer and were not swapped. A NO_PUBKEY error is the pharmacy telling you it does not recognize this seal yet, so you get the manufacturer's real seal pattern and compare it. Turning off gpgcheck is like accepting any bottle, sealed or not. The analogy stops because you must verify the key's fingerprint through the vendor's documented channel, not just trust a key that arrives alongside the packages.",
  "terms": [
   [
    "Dependency conflict",
    "A situation where required package versions cannot all be satisfied together."
   ],
   [
    "apt --fix-broken install",
    "Attempts to complete or repair broken dependencies on Debian-family systems."
   ],
   [
    "dpkg --configure -a",
    "Finishes configuring packages left half-installed by an interruption."
   ],
   [
    "NO_PUBKEY",
    "An apt error meaning the repository's signing key is not installed."
   ],
   [
    "apt-mark hold",
    "Prevents a package from being upgraded on Debian-family systems."
   ],
   [
    "dnf versionlock",
    "A dnf plug-in that locks packages at their current version."
   ],
   [
    "dnf history undo",
    "Rolls back a recorded dnf transaction."
   ],
   [
    "apt-cache policy",
    "Shows installed and candidate versions of a package and which repository each comes from."
   ]
  ],
  "example": "An Ubuntu server's nightly update reports that several packages were kept back. apt-mark showhold lists the kernel packages, held months ago during a driver issue that has since been fixed. After confirming with the team, you run apt-mark unhold on them, apply the updates and schedule a reboot into the new kernel.",
  "mistakes": [
   [
    "Use rpm --nodeps or dpkg --force-depends to get past a dependency error.",
    "Forcing installs leaves the system inconsistent. Resolve the dependency with the package manager, fix mixed repositories, or use apt --fix-broken install."
   ],
   [
    "Delete the apt lock file when you see 'Could not get lock'.",
    "Another apt or dpkg process, often an automatic update, is running. Wait for it or identify it with ps; deleting locks during a run can corrupt the package database."
   ],
   [
    "Set gpgcheck=0 to get past a key error.",
    "That disables signature verification. Import the correct key through the vendor's documented method and verify its fingerprint."
   ],
   [
    "'Kept back' always means the package is held.",
    "It can also mean the upgrade needs new dependencies. Check apt-mark showhold; if no hold exists, apt full-upgrade or an explicit apt install can resolve it."
   ]
  ],
  "tryit": [
   [
    "A RHEL-family server will not update httpd even though a newer version is in the repository. dnf upgrade httpd reports nothing to do. What three places do you check?",
    "Check dnf versionlock list for a lock, exclude= lines in /etc/dnf/dnf.conf, and exclude= lines in the relevant .repo file. Find out why the lock or exclude was set before removing it."
   ],
   [
    "After a weekend update, dnf history shows transaction 42 upgraded a library that broke an in-house application. The vendor fix is a week away. What can you do safely?",
    "Review dnf history info 42, then roll it back with dnf history undo 42 if the older versions are still available. Consider a versionlock so the library is not upgraded again until the vendor fix arrives, and document the reason."
   ]
  ],
  "tip": "Repository GPG errors are fixed by importing the correct, verified key, not by setting gpgcheck=0 or trusting unsigned repositories. 'Kept back' means look for holds or new dependencies.",
  "check": [
   [
    "An install was interrupted by a power loss on Ubuntu. Which two commands help repair the package state?",
    "dpkg --configure -a and apt --fix-broken install."
   ],
   [
    "How do you list held packages on a Debian-family system?",
    "apt-mark showhold."
   ],
   [
    "dnf fails with 'Failed to download metadata for repo'. Name two things to check.",
    "Any two of: the baseurl or mirror URL in the .repo file, DNS and network or proxy access, the system clock for TLS errors, and whether the release has moved to an archive."
   ],
   [
    "Why is rpm -i --nodeps a poor fix for a dependency error?",
    "It installs the package without what it needs, leaving the system inconsistent and likely to fail later."
   ],
   [
    "How do you stop a package from being upgraded on a RHEL-family system?",
    "dnf versionlock add <name> (or an exclude= line in dnf.conf or a .repo file)."
   ]
  ]
 },
 {
  "t": "Container problems: logs, port conflicts, image pulls, storage",
  "hook": "Friday at 4:30 p.m., the deployment at Meadowbrook Foods goes out, and within minutes the inventory API container is restarting every few seconds. Kai, who wrote the release notes, swears nothing changed except the version tag. Meanwhile a teammate's new container refuses to start because its port is supposedly in use, another host cannot pull the image at all, and someone notices the server's disk is at 94 percent. The warehouse scanners depend on that API all weekend. Each problem leaves a clear fingerprint if you know where to look. Which commands reveal them, and in what order?",
  "simple": "A container is like a sealed lunchbox holding a program and everything it needs. When one fails, you troubleshoot it much like any other service. First, see whether it is running or stopped and what code it ended with. Then read what the program printed, its logs. Common problems are: the program crashed or ran out of its memory allowance, two things tried to use the same network door (port) on the computer, the box could not be downloaded from its warehouse (the registry) because of a wrong name or missing login, or disk space and folder permissions were wrong. Each problem has a telltale message that points to the fix.",
  "body": [
   "Containers fail in characteristic ways: the application inside crashes, the port cannot be published, the image cannot be pulled, or storage is missing, full or inaccessible. The commands from the containers lesson become your troubleshooting toolkit, and the process mirrors ordinary service troubleshooting: check state, read logs, inspect configuration, then look at the network and storage around the container. Examples here use Podman, but the same subcommands work with Docker.",
   "Start by finding the container's state. `podman ps -a` (or `docker ps -a`) includes stopped containers and shows their status, such as `Exited (1) 2 minutes ago` or a restart loop. `podman logs name` shows what the application printed before it stopped, which is usually the answer: a missing environment variable, a configuration error or a failed database connection. `podman inspect name` shows the exit code, the OOMKilled flag, the command, environment, mounts and restart policy. An exit code of 137 means the process was killed with SIGKILL (128 + 9), often by the OOM (out-of-memory) killer or a memory limit, while 139 indicates a segmentation fault. `podman events` shows lifecycle events, and `podman exec -it name sh` lets you look inside a running container. If a container exits immediately, check that its main command does not simply finish, or run the image interactively with a shell to inspect it.",
   "Port conflicts show up as errors like 'address already in use' when you publish with `-p`. Only one process can bind a host port, so check with `ss -tlpn | grep :8080` for host services and `podman ps` for other containers already publishing it, then choose another host port or stop the conflicting service. If the container runs but is unreachable, check `podman port name` to confirm the mapping, confirm the application inside listens on 0.0.0.0 rather than 127.0.0.1 within the container, and check the host firewall. Rootless Podman cannot bind host ports below 1024 by default, which produces a permission error rather than a conflict.",
   "Image pull failures come from several causes. 'manifest unknown' or 'not found' means a wrong image name or tag; 'unauthorized' or 'denied' means you need to log in with `podman login registry` or lack access to a private repository; 'toomanyrequests' indicates a registry rate limit; and timeouts, DNS (Domain Name System) failures or TLS (Transport Layer Security) certificate errors point to network, proxy or clock problems. Short names without a registry may be resolved against a list in `/etc/containers/registries.conf`, so use fully qualified names like `registry.example.com/team/app:1.4` to be explicit and avoid pulling a lookalike image. Pinning a specific tag or digest instead of `latest` also prevents surprises.",
   "Storage problems come in two forms. Space: images, stopped containers, volumes and build cache consume disk under `/var/lib/containers` (Podman as root), `~/.local/share/containers` (rootless Podman) or `/var/lib/docker`. `podman system df` summarizes usage, and `podman image prune`, `podman container prune`, `podman volume prune` and `podman system prune` reclaim it; be careful, because pruning volumes deletes data. Access: a bind mount that gives 'Permission denied' inside the container usually means SELinux (Security-Enhanced Linux) labels (add `:Z` for a private label or `:z` for a shared one to the `-v` option) or UID (user ID) mismatches, especially in rootless mode where container UIDs map to subordinate UIDs on the host; `podman unshare` helps adjust ownership. Data written inside a container without a volume vanishes when the container is removed, a common cause of lost data after an image update.",
   "A few extra commands sharpen the picture. `podman logs --tail 50 name` limits output to recent lines, and `-f` follows them while you reproduce a problem. Go template filters pull single values out of inspect, for example `podman inspect name --format '{{.State.ExitCode}}'` or `--format '{{.HostConfig.Memory}}'`, which is quicker than scrolling through the full JSON (JavaScript Object Notation) document. Containers that must talk to each other by name should share a user-defined network, which `podman network ls` and `podman network inspect` reveal; containers on different networks cannot reach each other, which looks like an application connection error in the logs. Finally, the rootless low-port limit comes from the kernel setting `net.ipv4.ip_unprivileged_port_start`; changing it is a system-wide decision, so publishing a higher host port such as 8080 is usually the better choice.",
   "Consider a worked example. A containerized API (application programming interface) keeps restarting. `podman ps -a` shows `Exited (137)`, and `podman inspect api --format '{{.State.OOMKilled}}'` prints true. `podman logs api` shows normal startup messages that simply stop, consistent with a hard kill rather than an application error. The container was started with `--memory 256m`, but the new release needs more. You recreate it with `--memory 512m`, and it stays up. The next day a teammate's new container fails with 'address already in use' on port 8080; `podman ps` shows the old API version still publishing 8080, so they stop it and the new container starts.",
   "Common mistakes: restarting a crashing container repeatedly without reading `podman logs`; treating exit 137 as an application bug rather than a kill; binding the app to 127.0.0.1 inside the container; using unqualified image names; running `system prune --volumes` and losing data; disabling SELinux instead of using `:Z`; and storing data in the container's writable layer instead of a volume.",
   "Exam questions follow patterns. 'Container exits immediately' means check `podman logs`. 'Exit code 137' or 'OOMKilled true' means memory. 'address already in use' means a host port conflict, found with `ss` or `podman ps`. 'manifest unknown' means a wrong name or tag, and 'unauthorized' means `podman login`. 'Disk filling with images' is `podman system df` and prune. 'Permission denied on a bind mount on RHEL' is `:Z`. 'Rootless cannot use port 80' is the privileged port limit."
  ],
  "analogy": "A container's writable layer is like writing notes on a hotel room whiteboard. It works while you stay, but when you check out (remove the container) the room is wiped for the next guest. A volume is like keeping your notes in your own notebook that you carry from room to room. That is why data written without a volume disappears after you replace the container with a new image. The analogy stops with stopped containers: unlike a hotel, a merely stopped container keeps its writable layer until you remove it.",
  "terms": [
   [
    "Exit code 137",
    "A container exit caused by SIGKILL (128 + 9), often from the OOM killer or a memory limit."
   ],
   [
    "podman ps -a",
    "Lists all containers, including stopped ones, with their status."
   ],
   [
    "podman inspect",
    "Shows detailed container configuration and state, including exit code, OOMKilled, mounts and ports."
   ],
   [
    "registries.conf",
    "The file that defines registries and how short image names are resolved."
   ],
   [
    "podman system df",
    "Summarizes disk space used by images, containers and volumes."
   ],
   [
    "Z volume option",
    "The :Z or :z suffix on -v that relabels a bind mount for SELinux container access."
   ],
   [
    "Rootless container",
    "A container run by an unprivileged user, with UIDs mapped to subordinate IDs on the host."
   ],
   [
    "podman logs",
    "Shows what a container's main process wrote to standard output and error, the first stop for crashes."
   ]
  ],
  "example": "A containerized API keeps restarting. podman ps -a shows Exited (137), and podman inspect shows OOMKilled true. The container had --memory 256m but the new release needs more. Raising the limit to 512m and redeploying stops the restarts, and podman logs now shows the service starting normally.",
  "mistakes": [
   [
    "Exit code 137 means the application has a bug.",
    "137 is 128 + 9, meaning SIGKILL. Check podman inspect for OOMKilled true; the usual fix is raising the memory limit or reducing memory use."
   ],
   [
    "If the container is running and the port is published, it must be reachable.",
    "The application inside must listen on 0.0.0.0, not 127.0.0.1, and the host firewall must allow the port. Check podman port name and ss on the host."
   ],
   [
    "Disable SELinux to fix Permission denied on a bind mount.",
    "Add :Z (private) or :z (shared) to the -v option so the content is relabeled for container access."
   ],
   [
    "podman system prune is always safe to run.",
    "Pruning removes stopped containers and unused images, and with volumes included it deletes data. Check podman system df and what you are removing first."
   ]
  ],
  "tryit": [
   [
    "A rootless container running a database loses all its data each time you update to a new image. The run command has no -v option. What is happening and how do you fix it?",
    "Data is being written to the container's writable layer, which is discarded when the container is removed and recreated. Create a named volume or bind mount for the data directory (for example -v dbdata:/var/lib/data, adding :Z for bind mounts on SELinux hosts) so data survives image updates."
   ],
   [
    "A pull of a short image name works on your laptop but on a server pulls a different image with the same name from another registry. Why, and what is the fix?",
    "Short names are resolved using the unqualified search registries in /etc/containers/registries.conf, which differ between hosts. Use fully qualified names such as registry.example.com/team/app:1.4, ideally pinned to a tag or digest, to remove the ambiguity."
   ]
  ],
  "tip": "Check logs first, then inspect: podman logs explains most application crashes, and podman inspect reveals exit codes, OOM kills, mounts and port mappings.",
  "check": [
   [
    "A container exits with code 137. What is the most likely cause?",
    "It was killed with SIGKILL, often because it exceeded its memory limit or was chosen by the OOM killer."
   ],
   [
    "podman run -p 80:8080 fails as a regular user with a permission error. Why?",
    "Rootless containers cannot bind host ports below 1024 by default; use a higher host port or adjust the system setting."
   ],
   [
    "A bind-mounted directory gives Permission denied inside a container on a RHEL host. What is a common fix?",
    "Add :Z (or :z) to the volume option so the directory is relabeled for container access under SELinux."
   ],
   [
    "A pull fails with 'manifest unknown'. What should you check?",
    "The image name and tag, since the registry has no image matching that reference; a fully qualified name avoids ambiguity."
   ],
   [
    "How do you see how much disk space images, containers and volumes use?",
    "podman system df (or docker system df)."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
