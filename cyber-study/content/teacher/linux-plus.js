/* Teacher edition for CompTIA Linux+ (XK0-006): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("linux-plus", [
 {
  "t": "Boot process: UEFI/BIOS, GRUB2, kernel, initramfs (dracut, mkinitramfs), systemd targets",
  "objectives": [
   "Students will be able to list the Linux boot stages in order and state the job of each stage.",
   "Students will be able to compare BIOS/MBR booting with UEFI/ESP booting, including how to tell which mode a system used.",
   "Students will be able to identify the correct tool to change kernel arguments, rebuild the initramfs or change the default systemd target.",
   "Students will be able to diagnose which boot stage failed from a described console symptom and choose the fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the whiteboard as a rough sequence. Say: 'By the end of class we will turn this guess into an exact order, and you will be able to tell from one screen where a boot broke.'"
   ],
   [
    15,
    "Teach",
    "Draw five boxes left to right: Firmware, GRUB2, Kernel, initramfs, systemd. Under each, write the files and tools: ESP and efibootmgr; /etc/default/grub, grub2-mkconfig, update-grub, grubby; vmlinuz; dracut, update-initramfs, lsinitrd; targets with get-default, set-default, isolate. Contrast BIOS/MBR with UEFI/ESP and show the /sys/firmware/efi test. Stress the two persistence traps: hand-editing grub.cfg and confusing isolate with set-default. Finish by contrasting rescue.target and emergency.target."
   ],
   [
    15,
    "Activity",
    "Run the 'Where Did It Stop?' card sort described below. Circulate and ask each pair to justify placements by naming the last stage that clearly succeeded."
   ],
   [
    5,
    "Discuss",
    "Review the two or three cards pairs disagreed on most. Ask one pair to explain each placement and fix. Use the discussion questions to connect stages to real maintenance work such as kernel updates."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "You press the power button on a Linux server and three minutes later see a login prompt. Write down every step you think happened in between, in order.",
  "activity": {
   "title": "Where Did It Stop?",
   "materials": "Printed symptom cards (about 12, each describing one console message or behavior), a printed strip of the five boot stages per pair, whiteboard and markers.",
   "steps": [
    "Before class, write symptom cards such as 'No bootable device found', 'GRUB menu appears, then Kernel panic: VFS unable to mount root', 'dracut:/# prompt after storage change', 'Emergency shell: give root password for maintenance after fstab edit', 'Server always boots to desktop but should boot to text', 'grub.cfg edit vanished after kernel update'.",
    "Give each pair the five-stage strip and the cards. Pairs place each card under the stage that failed or must be changed.",
    "For each card, pairs write the command or file that fixes it on the back (for example dracut -f, grub2-install, systemctl set-default multi-user.target, /etc/default/grub plus grub2-mkconfig).",
    "Pairs swap with a neighboring pair and check each other's placements, marking any they disagree with.",
    "The teacher reveals the answer key on the projector or whiteboard and pairs score themselves."
   ]
  },
  "discussion": [
   "Why do distributions keep an older kernel installed after an update, and how does that help when the initramfs is broken?",
   "When would you choose emergency.target over rescue.target, and what risks come with each?",
   "What does Secure Boot protect against, and why does it need a signed shim to boot Linux?"
  ],
  "exit": [
   [
    "List the five boot stages in order.",
    "Firmware (BIOS or UEFI), GRUB2 boot loader, kernel, initramfs, systemd (target)."
   ],
   [
    "You changed GRUB_CMDLINE_LINUX in /etc/default/grub on a RHEL server. What must you run next?",
    "grub2-mkconfig -o /boot/grub2/grub.cfg (or use grubby) so the generated configuration includes the change."
   ],
   [
    "A server shows a dracut emergency shell after a new storage controller was installed. Which stage failed and what is the fix?",
    "The initramfs stage; boot an older kernel or rescue media and rebuild the initramfs with dracut -f so it includes the controller driver."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed five-stage chart with the tools listed in a word bank, and have them match each tool to its stage before attempting the symptom cards.",
   "Extend: Ask fast finishers to compare the Red Hat and Debian commands for every stage in a two-column table, then write a one-paragraph recovery plan for a UEFI server whose ESP was accidentally reformatted."
  ]
 },
 {
  "t": "Filesystem Hierarchy Standard: /etc, /var, /usr, /opt, /home, /boot, /proc, /sys, /dev",
  "objectives": [
   "Students will be able to state the purpose of /etc, /var, /usr, /opt, /home, /boot, /proc, /sys and /dev.",
   "Students will be able to distinguish virtual filesystems (/proc, /sys, /dev) from on-disk directories.",
   "Students will be able to choose the correct directory for a given file type, such as a configuration file, a log or a vendor application.",
   "Students will be able to use the hierarchy to decide where to look first in a disk-space or configuration troubleshooting scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Collect answers and point out that Windows users often think in drive letters. Say: 'Linux has one tree, and every folder at the top has a job. Today we learn the jobs.'"
   ],
   [
    15,
    "Teach",
    "Draw the tree from / on the whiteboard. Add each directory with a one-line job and two example files. Color the virtual filesystems (/proc, /sys, /dev) differently and explain that the kernel creates them each boot. Cover /usr/local versus /usr/bin, /opt for vendor bundles, /root versus /, and /tmp versus /var/tmp. If a projector is available, show df -h and ls / from any Linux system or a free browser-based Linux terminal."
   ],
   [
    15,
    "Activity",
    "Run the 'Where Does It Live?' sticky-note sort described below. Walk around and challenge any note placed under the wrong directory by asking what the file does."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions. Ask students to connect directory choices to partitioning decisions and backups."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post it on the door as they leave."
   ]
  ],
  "warmup": "On a Windows PC you might find programs in C:\\Program Files and settings in the registry. Where do you think Linux keeps programs, settings and logs?",
  "activity": {
   "title": "Where Does It Live?",
   "materials": "Sticky notes with file names written on them (about 24), a whiteboard divided into columns labeled with the nine FHS directories plus /tmp and /usr/local, markers.",
   "steps": [
    "Before class, write file paths with the leading directory removed on sticky notes, for example 'sshd_config', 'access.log', 'vmlinuz-(kernel version)', 'cpuinfo', 'sda', 'null', 'alice's resume.pdf', 'vendorapp/bin/agent', 'a script you compiled', 'meminfo', 'mail spool'.",
    "Give each small group a handful of notes. Groups place each note under the column where it belongs.",
    "Each group explains two of its placements aloud, naming the rule (configuration, variable data, add-on package, virtual, and so on).",
    "The class reviews any disputed notes; the teacher confirms or corrects and moves notes as needed.",
    "Groups then answer: which three columns would you put on separate partitions on a busy server, and why?"
   ]
  },
  "discussion": [
   "Why do many servers give /var its own partition, and what happens to services when it fills?",
   "Why do you think /root lives on the root filesystem rather than under /home?",
   "How does knowing that /proc is virtual change how you troubleshoot disk usage?"
  ],
  "exit": [
   [
    "Which directory holds host-specific configuration files?",
    "/etc."
   ],
   [
    "Name one virtual filesystem and what it exposes.",
    "/proc exposes process and kernel information (or /sys exposes devices and drivers; /dev holds device files)."
   ],
   [
    "A log file has filled the disk. Which directory do you check first?",
    "/var, specifically /var/log."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page cheat sheet that pairs each directory with a picture and one example file, and let struggling students use it during the sticky-note sort.",
   "Extend: Ask fast finishers to research the usr merge and explain in writing why /bin and /usr/bin show the same files on modern distributions, then propose a partition plan for a mail server."
  ]
 },
 {
  "t": "Kernel modules and parameters: lsmod, modprobe, modinfo, /etc/modprobe.d, sysctl",
  "objectives": [
   "Students will be able to explain what a loadable kernel module is and why Linux uses them.",
   "Students will be able to select lsmod, modinfo, modprobe, modprobe -r, insmod or depmod for a described task.",
   "Students will be able to compare temporary and persistent changes for modules and sysctl parameters and name the file locations for each.",
   "Students will be able to write correct /etc/modprobe.d and /etc/sysctl.d entries for a given requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about phone apps and plug-ins. Connect answers to the idea that the kernel loads drivers only when needed."
   ],
   [
    15,
    "Teach",
    "Draw two columns on the whiteboard: 'Modules' and 'Kernel parameters'. Under Modules, write lsmod, modinfo, modprobe, modprobe -r, insmod/rmmod, depmod, then the persistence files /etc/modprobe.d (options, blacklist, install) and /etc/modules-load.d. Under Kernel parameters, write /proc/sys, sysctl, sysctl -w, /etc/sysctl.d and sysctl --system. Show the dotted name to path conversion with net.ipv4.ip_forward. Emphasize in red: command-line changes vanish at reboot."
   ],
   [
    15,
    "Activity",
    "Run the 'Now or Forever?' pair exercise described below. Circulate and ask pairs to say aloud whether each answer is temporary or persistent."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on why blacklisting is not a hard block and when the initramfs must be rebuilt."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "Your phone does not ship with every app ever made installed. Why not? What would happen to the phone if it did?",
  "activity": {
   "title": "Now or Forever?",
   "materials": "Printed requirement cards (about 10), blank paper, whiteboard, and optionally student laptops with a free browser-based Linux terminal to try lsmod and sysctl read-only commands.",
   "steps": [
    "Give each pair a stack of requirement cards such as 'Enable IP forwarding until the next reboot', 'Enable IP forwarding permanently', 'See which parameters the e1000e driver accepts', 'Stop the pcspkr module loading at boot', 'Load the bonding module every boot', 'Set debug=1 every time mymod loads'.",
    "For each card, pairs write the exact command or the file path and line they would use.",
    "Pairs label each answer 'Now' (temporary) or 'Forever' (persistent) and, for Forever answers, note any follow-up command such as sysctl --system or rebuilding the initramfs.",
    "Pairs trade sheets with another pair and mark any errors.",
    "The teacher projects or writes the answer key and the class discusses the most common mistake."
   ]
  },
  "discussion": [
   "Why might an administrator choose to blacklist a driver instead of uninstalling it?",
   "What risks come with removing a network driver module while connected over SSH (Secure Shell)?",
   "Why do you think Linux separates module options from kernel-wide sysctl parameters?"
  ],
  "exit": [
   [
    "Which command loads a module and its dependencies?",
    "modprobe modulename."
   ],
   [
    "Where do you put a persistent sysctl setting, and how do you apply it without rebooting?",
    "In a .conf file under /etc/sysctl.d/ (or /etc/sysctl.conf), applied with sysctl --system or sysctl -p file."
   ],
   [
    "What line in /etc/modprobe.d stops a module loading automatically?",
    "blacklist modulename."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column reference card (temporary versus persistent) with each command in the correct column, and have them complete only the first five requirement cards.",
   "Extend: Ask fast finishers to write a short procedure for safely changing a network driver parameter on a remote server, including how they would avoid losing access and how they would verify the new value under /sys/module."
  ]
 },
 {
  "t": "Files and directories: ls, find, cp, mv, hard vs symbolic links, file, stat",
  "objectives": [
   "Students will be able to interpret ls -l output, including file type characters and the link count.",
   "Students will be able to construct find commands that search by name, type, size, owner, age and permission.",
   "Students will be able to compare hard and symbolic links using the inode model and choose the right one for a requirement.",
   "Students will be able to use file and stat to determine real file type and atime, mtime and ctime."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about deleting a file without freeing space. Take guesses and leave them on the board to revisit at the end."
   ],
   [
    15,
    "Teach",
    "Project or draw an ls -l line and label every field. Write the type characters. Build three find commands live, adding one test at a time. Then draw the inode model: a box labeled 'inode 4012' with two name arrows (hard links) and a separate small box holding a path (symlink). Delete one arrow and ask what happens; delete the target and ask about the symlink. Finish with stat output and the three timestamps."
   ],
   [
    15,
    "Activity",
    "Run the 'Index Card Inodes' role-play described below, then have pairs write find commands for four short requirements."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up guesses and resolve them. Use the discussion questions to connect links to real tasks such as configuration management and backups."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "You delete a 40 GB folder on a server, but df shows exactly the same free space as before. Write down two reasons this could happen.",
  "activity": {
   "title": "Index Card Inodes",
   "materials": "Index cards or sticky notes, a few small boxes or folders to represent inodes, markers, whiteboard; optionally student laptops with a free browser-based Linux terminal.",
   "steps": [
    "Label two boxes as inodes (for example 'inode 501' holding a paper 'data' sheet). Students write file names on index cards and tape them to strings or simply hold them next to a box to show the directory entry.",
    "Create a hard link by having a second student hold another name card pointing to the same box. Ask the class for the link count, then remove one card and confirm the data survives.",
    "Create a symbolic link: a student holds a card that says 'see report.txt' rather than pointing at a box. Remove report.txt's card and ask where the symlink now leads.",
    "Try to 'hard link' to a box in another room (another filesystem) and discuss why the numbering makes that impossible.",
    "Pairs then write find commands for: files over 1 GB in /srv, files owned by bob in /home, .conf files under /etc, and SUID files anywhere, and check them against the teacher's key (or test them in a browser terminal)."
   ]
  },
  "discussion": [
   "When would a hard link be more useful than a symbolic link in real administration?",
   "Why might an attacker care about SUID files, and how does find help defenders audit them?",
   "What could go wrong with find -delete, and how would you test the command safely first?"
  ],
  "exit": [
   [
    "A link must point to a directory on another partition. Which kind of link do you use?",
    "A symbolic link (ln -s), because hard links cannot cross filesystems or normally point to directories."
   ],
   [
    "Write a find command that lists regular files under /var/log modified more than 30 days ago.",
    "find /var/log -type f -mtime +30."
   ],
   [
    "Which command shows when a file's permissions were last changed?",
    "stat filename, reading the Change (ctime) timestamp."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled ls -l diagram and a find 'recipe card' listing -name, -type, -size, -user, -mtime and -perm with one example each to copy from.",
   "Extend: Ask fast finishers to explain why a directory's link count in ls -l is always at least 2 and grows with each subdirectory, and to write a find command that uses -exec with {} + to compress logs older than 14 days."
  ]
 },
 {
  "t": "Storage: partitions (fdisk, gdisk, parted), lsblk, blkid, UUIDs, /etc/fstab options (nofail, noexec)",
  "objectives": [
   "Students will be able to compare MBR and GPT and choose the correct scheme for a given disk size and partition count.",
   "Students will be able to describe the steps to partition, format and persistently mount a new disk using fdisk, gdisk or parted, lsblk, blkid and partprobe.",
   "Students will be able to write a correct six-field /etc/fstab line using a UUID and appropriate options.",
   "Students will be able to explain the effect of nofail, noexec, nosuid, nodev and _netdev and diagnose a boot that stops in emergency mode because of fstab."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up scenario. Ask students what they think happened and record guesses. Say: 'One line in one file caused this. Today you will be able to find and fix it.'"
   ],
   [
    15,
    "Teach",
    "Draw a disk bar and split it into partitions. Compare MBR and GPT in a two-column table (partition limits, size limit, backup table). Show the fdisk keystrokes n, p, t, d, w, q and note that parted applies changes immediately. Project sample lsblk -f and blkid output and circle the UUID. Write a full fstab line and label the six fields with the mnemonic. Explain each option and finish with the safe test commands mount -a and findmnt --verify."
   ],
   [
    15,
    "Activity",
    "Run the 'Fix the fstab' pair exercise described below. Circulate and ask pairs to explain what each broken line would do at boot."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect options to security hardening and to reliability on servers with removable or network storage."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A technician removed an old backup disk from a server, and now the server boots into emergency mode even though its main disk is fine. What do you think the server was waiting for?",
  "activity": {
   "title": "Fix the fstab",
   "materials": "A printed handout with sample lsblk -f and blkid output and an /etc/fstab containing six flawed lines, pens, and a projector or whiteboard for the answer key.",
   "steps": [
    "Prepare a handout showing lsblk -f and blkid output for three disks, followed by an fstab with problems such as a /dev/sdc1 device name, a removable disk without nofail, an upload directory without noexec, a missing field, a pass value of 1 on a non-root filesystem, and a network share without _netdev.",
    "Pairs read the output and mark each fstab line as OK or broken, writing what would happen at boot.",
    "Pairs rewrite each broken line correctly using the UUIDs from the blkid output and appropriate options.",
    "Pairs list the commands they would run to test the new file before rebooting (systemctl daemon-reload, mount -a, findmnt --verify).",
    "The teacher reveals the corrected file and pairs compare, discussing any differences in option choices."
   ]
  },
  "discussion": [
   "When might you deliberately leave nofail off a filesystem, so that a missing disk does stop the boot?",
   "What kinds of directories on a server benefit from noexec, nosuid and nodev, and why?",
   "Why is parted's immediate-write behavior both convenient and risky?"
  ],
  "exit": [
   [
    "A disk is 5 TB and needs six partitions. MBR or GPT?",
    "GPT, because MBR is limited to about 2 TiB and four primary partitions."
   ],
   [
    "Write the fstab options that let boot continue if a disk is missing and block running programs from it.",
    "defaults,nofail,noexec (nosuid and nodev may also be added)."
   ],
   [
    "Which command shows the UUID of each filesystem?",
    "blkid (or lsblk -f)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled fstab template with the six field names printed above blank boxes and a short option glossary, and let them fix only the first three lines.",
   "Extend: Ask fast finishers to research how systemd converts fstab lines into mount units and write the steps to recover a server stuck in emergency mode because of a typo in fstab."
  ]
 },
 {
  "t": "LVM (pvcreate, vgextend, lvextend -r) and software RAID with mdadm",
  "objectives": [
   "Students will be able to explain the PV, VG and LV layers of LVM and the role of extents.",
   "Students will be able to sequence the commands to add a new disk's space to an existing logical volume and grow its filesystem.",
   "Students will be able to compare RAID 0, 1, 5, 6 and 10 by minimum disks, failures tolerated and purpose.",
   "Students will be able to use mdadm and /proc/mdstat to create, check and repair a software RAID array, and explain why RAID is not a backup."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about growing a full partition. Let students describe the painful plain-partition process, then say: 'LVM was invented to make this a one-minute job.'"
   ],
   [
    15,
    "Teach",
    "Draw three stacked layers: disks at the bottom labeled PV, a large bucket labeled VG, and smaller containers on top labeled LV with filesystems. Walk through pvcreate, vgcreate, lvcreate, then the grow path pvcreate, vgextend, lvextend -r, writing the mnemonic. Show what happens without -r. Then draw a RAID table with columns for level, minimum disks, failures tolerated and use. Show the mdadm create, status, save, fail, remove and add commands and what [UU] and [U_] mean in /proc/mdstat."
   ],
   [
    15,
    "Activity",
    "Run the 'Bucket and Mirrors' card sequence described below. Check that each group's command order is correct before they move to the RAID cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, steering toward the difference between availability (RAID) and recoverability (backups)."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A partition on a server is full, and the disk next to it is empty. Without any special tools, what would you have to do to give that partition more space?",
  "activity": {
   "title": "Bucket and Mirrors",
   "materials": "Printed command cards (one command per card), printed RAID scenario cards, whiteboard, markers.",
   "steps": [
    "Give each group of three a shuffled set of command cards: lsblk, pvcreate /dev/sdd, vgextend vgdb /dev/sdd, vgs, lvextend -r -L +50G /dev/vgdb/lvpg, df -h, plus two distractors such as lvextend without -r and vgcreate.",
    "Groups arrange the cards in the order needed to grow a full database volume online, setting aside the distractors and explaining why.",
    "Next, groups receive RAID scenario cards (for example 'two disks, must survive one failure', 'four disks, must survive any two failures', 'fastest scratch space, data can be lost') and write the RAID level and minimum disks for each.",
    "Groups receive a printed /proc/mdstat excerpt showing [U_] and write the mdadm commands to replace the failed member.",
    "Groups present one answer each while the teacher confirms on the board."
   ]
  },
  "discussion": [
   "If RAID already protects against disk failure, why do organizations still pay for backups?",
   "When would you choose RAID 10 over RAID 5 or RAID 6?",
   "What are the risks of shrinking a logical volume, and why does the order of shrinking the filesystem and the LV matter?"
  ],
  "exit": [
   [
    "List the three commands, in order, to add a new disk's space to an existing LV.",
    "pvcreate, vgextend, lvextend (with -r to grow the filesystem)."
   ],
   [
    "Which RAID level survives two disk failures and needs at least four disks?",
    "RAID 6."
   ],
   [
    "Which file shows software RAID rebuild progress?",
    "/proc/mdstat."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in LVM layer diagram and a RAID reference table, and have struggling students complete the command ordering with the diagram in front of them before attempting the RAID scenarios.",
   "Extend: Ask fast finishers to design storage for a small database server with four disks, choosing a RAID level and an LVM layout, and to write the full command sequence including saving mdadm.conf and adding the fstab entry by UUID."
  ]
 },
 {
  "t": "Filesystems: ext4, XFS, Btrfs; mkfs, mount, resize2fs, xfs_growfs; df and du",
  "objectives": [
   "Students will be able to compare ext4, XFS and Btrfs by default distribution, grow and shrink support, and key features.",
   "Students will be able to create, mount and unmount a filesystem with mkfs, mount and umount, and resolve a 'target is busy' error.",
   "Students will be able to select resize2fs or xfs_growfs with the correct argument after a volume is enlarged.",
   "Students will be able to use df, df -i and du to explain why a filesystem reports full, including open deleted files and inode exhaustion."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up puzzle about df and du disagreeing. Collect guesses and keep them on the board."
   ],
   [
    15,
    "Teach",
    "Draw a three-column comparison table for ext4, XFS and Btrfs: default on, journaling or copy-on-write, grow, shrink, repair tool, special features. Then show the lifecycle: lsblk, mkfs, mkdir, mount, findmnt, umount. Write resize2fs DEVICE and xfs_growfs MOUNTPOINT side by side in large letters. Finish with df -h, df -T, df -i and du -sh, and explain the two reasons df and du disagree."
   ],
   [
    15,
    "Activity",
    "Run the 'Disk Detective' case cards described below. Circulate and ask each group which tool's output led them to their conclusion."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up guesses and resolve them. Use the discussion questions about choosing a filesystem."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "df says a filesystem is 100 percent full, but du adds up all the files and finds only half that much. How could both tools be right?",
  "activity": {
   "title": "Disk Detective",
   "materials": "Printed case cards with short excerpts of df -hT, df -i, du and lsof +L1 output, pens, whiteboard for the answer key.",
   "steps": [
    "Prepare five case cards, for example: an XFS volume that must shrink; df full but du half with an lsof +L1 line showing a deleted log; df -h at 60 percent but df -i at 100 percent; an ext4 LV extended but df unchanged; umount reporting target is busy.",
    "Groups of three read each card, decide what is happening, and write the root cause in one sentence.",
    "For each card, groups write the exact command or procedure that fixes it (for example resize2fs /dev/vgdata/lvweb, restart the service holding the file, fuser -vm /data).",
    "Groups rotate cards with a neighboring group and check each other's answers, writing questions in the margin.",
    "The teacher reviews each case on the board, highlighting the argument difference between resize2fs and xfs_growfs."
   ]
  },
  "discussion": [
   "If you were building a server that might need to shrink a volume later, which filesystem would you avoid and why?",
   "What features of Btrfs might make it attractive for a desktop, and what would you want to learn before using it on a production server?",
   "Why is it dangerous to format a disk without checking lsblk first, and what habits prevent that mistake?"
  ],
  "exit": [
   [
    "Which filesystem is the RHEL default and cannot be shrunk?",
    "XFS."
   ],
   [
    "An ext4 LV was extended. Which command grows the filesystem, and what argument does it take?",
    "resize2fs with the device name, for example resize2fs /dev/vgdata/lvweb."
   ],
   [
    "Writes fail but df -h shows free space. Which command do you run next?",
    "df -i, to check for inode exhaustion."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the completed comparison table and a two-line reminder card ('resize2fs = device, xfs_growfs = mount point; df = per filesystem, du = per directory') to use during the case cards.",
   "Extend: Ask fast finishers to write the full procedure for moving an XFS filesystem to a smaller volume (back up, recreate, restore, update fstab by UUID) and to explain how Btrfs snapshots differ from LVM snapshots."
  ]
 },
 {
  "t": "Network configuration: ip, nmcli, netplan, hostnamectl, /etc/hosts, /etc/resolv.conf, nsswitch.conf",
  "objectives": [
   "Students will be able to distinguish runtime network changes made with ip from persistent changes made with nmcli or netplan.",
   "Students will be able to write nmcli commands and a netplan YAML file to configure a static address, gateway and DNS server.",
   "Students will be able to explain how /etc/hosts, /etc/resolv.conf and nsswitch.conf work together to resolve names.",
   "Students will be able to troubleshoot a name-resolution or reboot-persistence problem using ip, getent, dig and ss."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up scenario. Ask students to vote on whether the change would survive the reboot and to explain their vote."
   ],
   [
    15,
    "Teach",
    "Draw two boxes labeled 'Running now' and 'Saved for next boot'. Put ip commands in the first box and nmcli profiles, netplan YAML and hostnamectl in the second. Show an nmcli con mod plus con up sequence, then project the netplan YAML example and point out indentation and netplan try. Draw the name-resolution flow: application, nsswitch.conf, then /etc/hosts or DNS via resolv.conf. Contrast getent with dig."
   ],
   [
    15,
    "Activity",
    "Run the 'Help Desk Tickets' pair troubleshooting described below. Circulate and ask pairs which file or command proves their diagnosis."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially the risks of changing network settings remotely."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "An admin sets a server's new IP address with ip addr add on Friday. The server reboots for patching on Saturday. What address does it have on Monday, and why?",
  "activity": {
   "title": "Help Desk Tickets",
   "materials": "Printed ticket cards that include short excerpts of ip a, ip route, /etc/hosts, /etc/nsswitch.conf, /etc/resolv.conf, getent and dig output; a printed netplan file with an indentation error; pens.",
   "steps": [
    "Prepare five tickets, for example: address lost after reboot (history shows ip addr add); name resolves to an old IP (stale /etc/hosts line, nsswitch says files dns); resolv.conf edit keeps disappearing (NetworkManager-generated header); netplan apply fails (tab and misaligned key); no default route (ip route shows none).",
    "Pairs read each ticket and write the root cause in one sentence.",
    "Pairs write the persistent fix: the exact nmcli commands, a corrected netplan block, or the file change.",
    "Pairs add one verification command for each fix (ip a, ip route, getent hosts, ss -tulpn).",
    "Two or three pairs present a ticket each; the teacher confirms on the board and highlights the getent versus dig difference."
   ]
  },
  "discussion": [
   "What precautions should you take before changing the network settings of a server you can reach only remotely?",
   "Why might an organization still use /etc/hosts entries even when it runs DNS, and what risks does that create?",
   "Why do you think modern distributions generate /etc/resolv.conf instead of letting administrators edit it directly?"
  ],
  "exit": [
   [
    "Which tool's changes are lost at reboot: ip, nmcli or netplan?",
    "ip; nmcli profiles and netplan YAML are persistent."
   ],
   [
    "A hosts: line reads files dns. What is checked first when resolving a name?",
    "/etc/hosts, then DNS."
   ],
   [
    "Which command safely applies a netplan change on a remote server?",
    "netplan try, which rolls back automatically unless you confirm."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a 'Running now versus Saved' sorting sheet with each command already listed, and a diagram of the name-resolution flow to refer to while working the tickets.",
   "Extend: Ask fast finishers to write equivalent configurations for the same static address in nmcli and in netplan, then explain how they would add SSSD to nsswitch.conf for directory user lookups."
  ]
 },
 {
  "t": "Shell operations: redirection, pipes, environment variables, grep, sed, awk, cut, sort, uniq, tr",
  "objectives": [
   "Students will be able to explain stdin, stdout and stderr and use >, >>, <, 2>, 2>&1 and tee correctly.",
   "Students will be able to construct a pipeline using grep, cut, awk, sort, uniq and tr to answer a question about a text file.",
   "Students will be able to use sed to substitute text in place with a backup.",
   "Students will be able to explain the difference between a shell variable and an exported environment variable and where persistent settings belong."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up pipeline on the projector and ask students to predict its output. Collect predictions without correcting them yet."
   ],
   [
    15,
    "Teach",
    "Draw a process with three arrows labeled 0, 1 and 2. Demonstrate >, >>, 2>, 2>&1 and the ordering rule. Then build the top-five-IP pipeline one stage at a time on the board, writing a few sample lines of what each stage outputs. Introduce cut, tr and sed -i.bak with one example each. Finish with NAME=value versus export NAME and the startup files."
   ],
   [
    15,
    "Activity",
    "Run the 'Human Pipeline' role-play and follow-up challenge described below. Circulate during the challenge and ask students what the data looks like between each pipe."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up prediction and reveal the correct output. Use the discussion questions about quoting and safe editing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Predict the output: printf 'b\\na\\nb\\na\\n' | uniq -c. Then predict what changes if you add sort before uniq.",
  "activity": {
   "title": "Human Pipeline",
   "materials": "Printed strips of a short fake web log (about 15 lines with repeated client addresses), envelopes, role cards (awk, sort, uniq -c, sort -rn, head), whiteboard; optionally student laptops with a free browser-based Linux terminal.",
   "steps": [
    "Give five volunteers a role card each and line them up. The first volunteer receives the envelope of log strips.",
    "The 'awk' student keeps only the first field of each strip (tears or folds the rest away) and passes the stack on; 'sort' orders them; 'uniq -c' groups and writes counts; 'sort -rn' reorders by count; 'head' passes on only the top three.",
    "Repeat the run with 'sort' removed and let the class see why uniq -c gives wrong counts.",
    "In pairs, students write pipelines for three challenges on paper or in a browser terminal: list usernames from /etc/passwd whose shell is /bin/bash; count lines containing ERROR in a log, ignoring case; convert a file's contents to uppercase.",
    "Pairs compare answers with another pair and the teacher shows model solutions."
   ]
  },
  "discussion": [
   "Why do Linux tools favor small single-purpose programs connected by pipes rather than one large program?",
   "What can go wrong when you run sed -i on a configuration file, and what habits reduce that risk?",
   "When would you choose awk over cut, and when is cut simpler?"
  ],
  "exit": [
   [
    "Write a command that appends both output and errors of backup.sh to backup.log.",
    "backup.sh >> backup.log 2>&1 (or backup.sh &>> backup.log)."
   ],
   [
    "Why does sort usually come before uniq -c?",
    "uniq only collapses adjacent duplicate lines, so input must be sorted for counts to be correct."
   ],
   [
    "What command makes the variable APP_ENV visible to scripts you run from this shell?",
    "export APP_ENV (or export APP_ENV=value)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a 'pipeline recipe card' listing each tool with one example and a blank stage-by-stage worksheet where they write the expected output after every pipe.",
   "Extend: Ask fast finishers to write an awk one-liner that totals the bytes column of a web log per client address and prints the top five, then explain each part of the command."
  ]
 },
 {
  "t": "Backup and restore: tar, gzip/xz/bzip2, rsync, dd, cpio",
  "objectives": [
   "Students will be able to create, list and extract tar archives with gzip, bzip2 and xz compression using the correct option letters.",
   "Students will be able to compare gzip, bzip2 and xz by speed and compression ratio.",
   "Students will be able to construct rsync commands for mirroring, including the effect of the trailing slash, --delete and --dry-run.",
   "Students will be able to choose between tar, rsync, dd and cpio for a backup or restore scenario and explain why a mirror is not a history."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the corrupted mirror. Ask students to discuss with a neighbor for one minute, then share."
   ],
   [
    15,
    "Teach",
    "Draw a four-column table: tar, rsync, dd, cpio, with rows for what it copies, how it updates, a create command and a restore command. Write the tar letter grid (c, x, t and z, j, J) and the mnemonic. Compare the compressors with a simple 'faster versus smaller' arrow. Demonstrate the rsync trailing slash with two directory sketches. Stress lsblk before dd and the dry run before rsync --delete."
   ],
   [
    15,
    "Activity",
    "Run the 'Backup Plan Pitch' group activity described below. Circulate and challenge each group's restore story."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially why testing restores matters more than running backups."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A company mirrors its file server to a backup server every night. On Thursday they discover files were corrupted on Monday. Can the mirror save them? What kind of backup would?",
  "activity": {
   "title": "Backup Plan Pitch",
   "materials": "Printed scenario cards, sticky notes, whiteboard or chart paper and markers; optionally student laptops with a free browser-based Linux terminal to try tar commands on sample files.",
   "steps": [
    "Give each group of three or four a scenario card, for example: a small web server that must survive accidental deletions and slow-burn corruption; a laptop disk that is failing and must be imaged; a 2 TB file share with small daily changes; inspecting the contents of an initramfs image.",
    "Groups choose the tools (tar with a compressor, rsync, dd, cpio) and write the exact commands for both backup and restore on chart paper.",
    "Groups add a schedule (for example nightly rsync plus weekly dated tar.xz archive) and where the copies are stored.",
    "Each group pitches its plan in one minute; the class asks one 'what if' question (for example 'what if corruption started five days ago?').",
    "The teacher highlights correct option letters and any rsync trailing slash or dd if/of mistakes on the board."
   ]
  },
  "discussion": [
   "Why is an untested backup almost as risky as no backup at all?",
   "When would you accept slower compression (xz) to get smaller archives, and when would speed (gzip) matter more?",
   "What could happen if rsync --delete is run with the source and destination swapped, and how do you guard against it?"
  ],
  "exit": [
   [
    "Write the command to create a bzip2-compressed archive of /etc named etc.tar.bz2.",
    "tar -cjf etc.tar.bz2 /etc (adding -v is optional)."
   ],
   [
    "Which compressor usually gives the smallest output, and which is usually fastest?",
    "xz gives the smallest output; gzip is usually fastest."
   ],
   [
    "What does rsync -a --delete /src/ host:/dst/ do?",
    "Mirrors the contents of /src into /dst on host, preserving attributes and deleting files at the destination that no longer exist at the source."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a tar option grid and a tool-choice flowchart (files or raw disk, full copy or changes only) to use while working their scenario.",
   "Extend: Ask fast finishers to design a rotation that keeps seven daily, four weekly and three monthly archives using tar and cron, and to explain how they would verify each archive with tar -t and a test restore."
  ]
 },
 {
  "t": "Virtualization: KVM/QEMU, libvirt and virsh, virt-install, qcow2 vs raw images",
  "objectives": [
   "Students will be able to explain the roles of KVM, QEMU and libvirt in the Linux virtualization stack.",
   "Students will be able to choose the correct virsh command for start, graceful shutdown, forced power-off, autostart and removal of a guest.",
   "Students will be able to compare raw and qcow2 disk images and justify a choice for a given scenario.",
   "Students will be able to read a virt-install and qemu-img command and predict what it creates."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect two or three answers on the whiteboard, steering toward the difference between a VM with its own kernel and a container sharing the host kernel."
   ],
   [
    12,
    "Teach",
    "Draw the stack as three boxes (KVM in the kernel, QEMU as the device builder, libvirt and its tools on top). Walk through verifying vmx or svm in /proc/cpuinfo, the virsh lifecycle commands, and the raw versus qcow2 trade-off, stressing that destroy is not delete."
   ],
   [
    18,
    "Activity",
    "Run the 'Lifecycle relay' card activity described below, then have each group present one tricky card."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect overlays and snapshots to real lab and test workflows."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or a sticky note and hand them in."
   ]
  ],
  "warmup": "If you could run five separate servers on one physical machine, what problems would that solve, and what new problems might it create?",
  "activity": {
   "title": "Lifecycle relay: from bare host to cleaned-up guest",
   "materials": "Printed cards (one command or symptom per card), whiteboard, markers, sticky notes.",
   "steps": [
    "Prepare cards with commands and outputs: grep -E 'vmx|svm' /proc/cpuinfo, lsmod | grep kvm, qemu-img create -f qcow2 -b golden.qcow2 -F qcow2 t1.qcow2, virt-install ... --import, virsh list --all, virsh shutdown, virsh destroy, virsh autostart, virsh undefine, qemu-img info output, plus two distractor cards.",
    "In groups of three or four, students arrange the cards into the order an admin would use to build, run and remove a throwaway test guest, setting distractors aside.",
    "Each group annotates every card with a sticky note naming the layer it touches (KVM, QEMU, libvirt) and what would go wrong if that step were skipped.",
    "Give each group a twist card (for example, 'the guest OS is hung' or 'disk space is running out') and ask which card they would change or add.",
    "Groups compare orders on the whiteboard; the teacher resolves disagreements, highlighting destroy versus undefine and virtual versus actual size."
   ]
  },
  "discussion": [
   "When would you accept raw's simplicity over qcow2's snapshots and thin provisioning in a production environment?",
   "What risks come from many test guests sharing one golden backing image, and how would you manage updates to that base?",
   "How does managing guests through libvirt XML and virsh make virtualization easier to automate and audit?"
  ],
  "exit": [
   [
    "Which component uses CPU extensions to run guest code at near-native speed, and which supplies virtual devices?",
    "KVM uses the VT-x or AMD-V extensions; QEMU supplies the emulated or virtio devices."
   ],
   [
    "A guest's OS is frozen and virsh shutdown does nothing. What command powers it off, and does it delete the guest?",
    "virsh destroy forces it off; it does not delete anything. virsh undefine would remove the definition."
   ],
   [
    "Give one reason to choose qcow2 and one reason to choose raw.",
    "qcow2 for thin provisioning, snapshots and backing files; raw for maximum simplicity and performance."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column reference card (Layer, What it does, Example command) and let them complete the relay with it, focusing first on the five most common virsh commands.",
   "Extend: Ask fast finishers to write out the full command sequence to create a golden-image overlay, boot it with virt-install --import, snapshot it and clean it up, explaining which files remain afterward."
  ]
 },
 {
  "t": "Local accounts and groups: useradd, usermod -aG, userdel, groupadd, passwd, chage",
  "objectives": [
   "Students will be able to create, modify and delete local accounts and groups using useradd, usermod, userdel, groupadd and gpasswd.",
   "Students will be able to explain why usermod -G without -a removes existing supplementary groups.",
   "Students will be able to apply chage and passwd options to enforce password aging, force a change at next login and lock or expire an account.",
   "Students will be able to choose a complete offboarding sequence that blocks both password and key-based logins."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers, sorting them into 'create', 'change' and 'remove' columns on the board."
   ],
   [
    12,
    "Teach",
    "Walk through the Priya example command by command, then show the before-and-after output of id for usermod -G versus usermod -aG. Cover passwd -l versus account expiry and the main chage options."
   ],
   [
    18,
    "Activity",
    "Run the help-desk ticket role-play below in pairs."
   ],
   [
    5,
    "Discuss",
    "Debrief the hardest tickets and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A new employee starts tomorrow and another leaves today. List every account task you think an administrator must do for each person.",
  "activity": {
   "title": "Help-desk ticket queue",
   "materials": "Printed ticket cards (eight to ten), whiteboard, markers; optionally student laptops with a free browser-based Linux terminal.",
   "steps": [
    "Prepare tickets such as: 'New hire needs bash, home folder and devs group', 'User added to docker yesterday still cannot use it', 'Three users lost access after a group change', 'Force temporary password change at first login', 'Contractor leaves today; keep files for a week', 'Passwords must expire every 90 days with a 7-day warning'.",
    "In pairs, one student plays the requester and reads the ticket; the other writes the exact commands on the card and explains them aloud.",
    "Pairs swap roles after each ticket and the requester checks the answer against a projected answer key only after writing their own critique.",
    "For the 'lost access' ticket, pairs must identify the cause (usermod -G without -a) and write the commands to restore memberships using id output provided on the card.",
    "Collect two tricky tickets and solve them together on the whiteboard."
   ]
  },
  "discussion": [
   "Why might an organization prefer locking and expiring accounts first, rather than deleting them immediately when someone leaves?",
   "What risks arise if a deleted user's UID is later reused for a new employee?",
   "How would you check that your account procedures actually blocked every way to log in?"
  ],
  "exit": [
   [
    "Write the command to add user sam to the wheel group without removing his other groups.",
    "usermod -aG wheel sam"
   ],
   [
    "What does chage -d 0 alice do?",
    "Sets her last password change to day 0 so she must change her password at next login."
   ],
   [
    "Why does passwd -l alone not fully disable an account, and what else should you do?",
    "It blocks only passwords; key logins still work. Also expire the account (chage -E 0 or usermod -e 1) or set a nologin shell."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page option table (useradd -m -s -c -G, usermod -aG -L -e, userdel -r, chage -l -M -d -E) and let students use it during the ticket activity.",
   "Extend: Have fast finishers write a short shell loop that reads names from a file, creates each account with a home directory and a group, and forces a password change at first login."
  ]
 },
 {
  "t": "Account files: /etc/passwd, /etc/shadow, /etc/group, /etc/skel, /etc/login.defs",
  "objectives": [
   "Students will be able to identify each field in a line from /etc/passwd, /etc/shadow and /etc/group.",
   "Students will be able to explain why password hashes are stored in /etc/shadow rather than /etc/passwd.",
   "Students will be able to determine which file holds a given setting, including /etc/skel and /etc/login.defs defaults.",
   "Students will be able to audit account files for UID 0 accounts and empty passwords using awk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project one passwd line and ask students to guess what each colon-separated piece means before you explain anything."
   ],
   [
    12,
    "Teach",
    "Label each field of passwd, shadow and group on the whiteboard. Explain the shadow hash prefixes, the ! and * markers, and the 'defaults only at creation' rule for login.defs and skel. Show vipw and pwck."
   ],
   [
    18,
    "Activity",
    "Run the account-file audit below in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their most serious finding and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If anyone on a system can read the list of users, what information on that list should never be there, and why?",
  "activity": {
   "title": "Auditor's desk: find the findings",
   "materials": "Printed excerpts of fictional /etc/passwd, /etc/shadow and /etc/group files (12 to 15 lines each) with planted problems, highlighters, whiteboard.",
   "steps": [
    "Prepare excerpts containing planted issues: a second UID 0 account, an empty shadow hash, a service account with /bin/bash, a locked account (!), a user whose primary group is missing, and a supplementary member list.",
    "Groups of three highlight every field they can name and write the field name in the margin for at least one line in each file.",
    "Groups list every finding, rate it high, medium or low, and write the command or tool to fix it (passwd -l, usermod -u, usermod -s /sbin/nologin, vipw, pwck).",
    "Each group writes the awk one-liner that would have found its highest finding automatically.",
    "Groups compare findings on the board; the teacher confirms which ones are real problems and which are normal (such as x in passwd)."
   ]
  },
  "discussion": [
   "Why does Linux decide privileges by number instead of by name, and what does that mean for audits?",
   "When might hand-editing account files be justified, and what safeguards should you use?",
   "How would centralized accounts from LDAP or SSSD change what you see in the local files versus getent?"
  ],
  "exit": [
   [
    "In alice:x:1001:1001:Alice Ng:/home/alice:/bin/bash, which field is the login shell and which is the UID?",
    "Field 7, /bin/bash, is the shell; field 3, 1001, is the UID."
   ],
   [
    "Which file stores password hashes and aging data, and who can read it?",
    "/etc/shadow, readable only by root."
   ],
   [
    "You set PASS_MAX_DAYS 60 in /etc/login.defs. Which users are affected?",
    "Only accounts created afterward; existing users must be changed with chage -M."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled template line for each file with field numbers printed above each colon, and have them match the excerpt lines against it.",
   "Extend: Ask fast finishers to write awk commands that list users whose password maximum age is greater than 90 days and accounts with shells other than nologin among UIDs below 1000."
  ]
 },
 {
  "t": "Systemd units: systemctl start/stop/enable/mask, status output, drop-in overrides with systemctl edit",
  "objectives": [
   "Students will be able to distinguish start/stop from enable/disable and choose enable --now when both are needed.",
   "Students will be able to explain the difference in strength between stop, disable and mask.",
   "Students will be able to interpret the Loaded and Active lines and exit codes in systemctl status output.",
   "Students will be able to create a drop-in override with systemctl edit and explain why it survives package updates."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort answers into 'now' and 'at boot' columns on the board."
   ],
   [
    12,
    "Teach",
    "Project a systemctl status output and annotate the Loaded and Active lines. Draw the three unit file directories in precedence order. Demonstrate the drop-in concept with the Restart=on-failure example, including the empty ExecStart= rule and daemon-reload."
   ],
   [
    18,
    "Activity",
    "Run the status-output detective activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect drop-ins to configuration management and change control."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A service worked fine yesterday, but after this morning's reboot it is not running. List possible reasons.",
  "activity": {
   "title": "Status-output detective",
   "materials": "Printed systemctl status excerpts (six scenarios), outcome cards, whiteboard, markers.",
   "steps": [
    "Prepare six status excerpts: running but disabled; inactive and enabled; failed with status=203/EXEC; masked; failed with status=1/FAILURE and a journal hint; and running with a drop-in shown in the Drop-In line.",
    "Pairs read each excerpt and write, on the card, what the Loaded and Active lines say and what the admin likely did or forgot.",
    "For each scenario pairs write the exact command or commands to reach the stated goal, for example 'running now and at every boot' or 'never start again'.",
    "Pairs draft a drop-in file on paper for the crashing service, adding Restart=on-failure and RestartSec=5, and name its full path.",
    "Review as a class, projecting the correct answers and discussing any disagreement about disable versus mask."
   ]
  },
  "discussion": [
   "Why does systemd keep 'now' and 'at boot' as separate decisions, and when is that useful?",
   "What problems could arise if many administrators make manual edits under /usr/lib/systemd/system on shared servers?",
   "When would you choose systemctl edit --full over a small drop-in?"
  ],
  "exit": [
   [
    "Write one command that starts httpd now and enables it at boot.",
    "systemctl enable --now httpd"
   ],
   [
    "What does systemctl mask do that disable does not?",
    "It links the unit to /dev/null so it cannot start at all, even manually or as a dependency."
   ],
   [
    "Where does systemctl edit sshd save its override, and why is that better than editing the vendor file?",
    "/etc/systemd/system/sshd.service.d/override.conf; it overrides only listed settings and survives package updates."
   ]
  ],
  "differentiation": [
   "Support: Provide a 'strength ladder' card (stop, disable, mask) and a 'now versus boot' table, and have struggling students classify each command before the activity.",
   "Extend: Ask fast finishers to write a complete small .service unit for a script, including [Unit], [Service] with User= and Restart=, and [Install] with WantedBy=multi-user.target, and explain what enable will do with it."
  ]
 },
 {
  "t": "Scheduling: cron and crontab syntax, at, systemd timers (OnCalendar)",
  "objectives": [
   "Students will be able to read and write five-field crontab expressions, including lists, ranges and steps.",
   "Students will be able to choose between cron, at, batch and systemd timers for a given scheduling need.",
   "Students will be able to write an OnCalendar expression and explain the effect of Persistent=true.",
   "Students will be able to troubleshoot common cron failures such as PATH problems and missing user fields."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write two student examples of recurring and one-time tasks on the board."
   ],
   [
    12,
    "Teach",
    "Draw the five crontab fields with the mnemonic, decode three sample lines, then contrast user crontabs with /etc/cron.d. Introduce at and atq, then the .timer plus .service pairing with OnCalendar and Persistent=true."
   ],
   [
    18,
    "Activity",
    "Run the schedule translation race below in teams."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about choosing tools and logging."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name one task on a computer that should happen every night and one that should happen exactly once next week. Who should press the button?",
  "activity": {
   "title": "Schedule translation race",
   "materials": "Printed cards with plain-English schedules and cards with cron or OnCalendar expressions, whiteboard, sticky notes.",
   "steps": [
    "Prepare twelve cards: six plain-English needs (every 15 minutes; 02:30 weekdays; 03:15 on the 1st of each month; every fourth hour; once tonight at 23:00; daily but catch up after downtime) and six expressions, including two deliberately wrong ones.",
    "Teams of three match each need to an expression, or write a correct one on a sticky note when none fits or a card is wrong.",
    "For each match, teams state which tool is best (user crontab, /etc/cron.d, at, or a systemd timer) and why.",
    "Teams convert two of their cron answers into OnCalendar form and write the timer's [Timer] and [Install] sections.",
    "The teacher reveals answers; teams earn a point for each correct match and a bonus point for spotting each wrong card."
   ]
  },
  "discussion": [
   "What advantages do journal logging and dependencies give systemd timers over classic cron, and when is cron still the simpler choice?",
   "How would you make sure a failed scheduled job is noticed quickly rather than discovered weeks later?",
   "Why might an organization restrict who can create crontabs with cron.allow?"
  ],
  "exit": [
   [
    "When does 30 2 * * 1-5 run?",
    "At 02:30 Monday through Friday."
   ],
   [
    "Which tool runs a command once at a set time, and which command lists its pending jobs?",
    "at; atq lists pending jobs."
   ],
   [
    "What does Persistent=true do in a timer unit?",
    "If the system was off when the job was due, it runs the job at the next opportunity after boot."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a blank five-box crontab template labeled with field names and value ranges to fill in before translating each schedule.",
   "Extend: Ask fast finishers to explain how cron treats a line that restricts both day of month and day of week, and to write a timer that runs 10 minutes after boot and every hour after that using monotonic settings."
  ]
 },
 {
  "t": "Processes and jobs: ps, top, kill signals, nice/renice, bg/fg/jobs, nohup",
  "objectives": [
   "Students will be able to interpret ps and top output, including the STAT column, load average and wa.",
   "Students will be able to choose the appropriate signal (SIGTERM, SIGKILL, SIGHUP) for a given situation and send it with kill, pkill or killall.",
   "Students will be able to adjust process priority with nice and renice and explain the limits for ordinary users.",
   "Students will be able to use bg, fg, jobs and nohup to manage jobs and keep long tasks running after logout."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note answers about frozen programs and slow systems on the board."
   ],
   [
    12,
    "Teach",
    "Project sample ps aux and top output and annotate PID, PPID, STAT, NI and wa. Explain the signal escalation (15, then 9), SIGHUP for reload, nice ranges and the root-only rule, then demonstrate job control with Ctrl+Z, bg, fg and nohup."
   ],
   [
    18,
    "Activity",
    "Run the 'Server under pressure' role-play below."
   ],
   [
    5,
    "Discuss",
    "Debrief using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When a program freezes on your own computer, what do you do first, and what do you do if that does not work?",
  "activity": {
   "title": "Server under pressure",
   "materials": "Printed top and ps snapshots for five scenarios, role cards (admin, user, observer), whiteboard; optionally laptops with a free browser-based Linux terminal.",
   "steps": [
    "Prepare five scenarios: a CPU-hogging report job owned by another user; a daemon that needs to reread its config; a zombie under an application server; a process stuck in state D with high wa; and a long job that must survive logout.",
    "In groups of three, the 'user' describes the problem, the 'admin' reads the snapshot and states the exact command they would run, and the 'observer' checks it against the signal and nice rules on a reference card.",
    "Rotate roles for each scenario so everyone plays admin at least once.",
    "For each scenario, the group writes what could go wrong if they chose the most forceful option (for example, kill -9 on the report job).",
    "Groups share their answer to the state D scenario and the class agrees on why renice and kill do not help."
   ]
  },
  "discussion": [
   "Why do well-written programs handle SIGTERM, and what might be lost when they are killed with SIGKILL?",
   "When is renice a fair way to share a server, and when should a long job be moved or rescheduled instead?",
   "Why might a systemd unit be a better home for a long-running task than nohup?"
  ],
  "exit": [
   [
    "Which signal should you send first to stop a process, and what is its number?",
    "SIGTERM, signal 15 (the default for kill)."
   ],
   [
    "How do you lower the priority of running PID 3100 so others get more CPU?",
    "renice -n 10 -p 3100 (any positive increase in the nice value)."
   ],
   [
    "You pressed Ctrl+Z on a job. How do you resume it in the background?",
    "Run bg (or bg %1)."
   ]
  ],
  "differentiation": [
   "Support: Provide a signal card listing SIGHUP 1, SIGINT 2, SIGKILL 9, SIGTERM 15, SIGTSTP, SIGSTOP and SIGCONT with a plain description of each, plus a labeled top header.",
   "Extend: Ask fast finishers to explain why SIGKILL and SIGSTOP cannot be caught, and to compare nohup, disown, tmux and a systemd service for a nightly job."
  ]
 },
 {
  "t": "Package management: dnf/rpm, apt/dpkg, repositories, provides and file ownership queries",
  "objectives": [
   "Students will be able to distinguish low-level (rpm, dpkg) and high-level (dnf, apt) package tools and explain why dependency resolution matters.",
   "Students will be able to perform install, remove, update and list operations in both package families.",
   "Students will be able to choose between ownership queries (rpm -qf, dpkg -S) and provides queries (dnf provides, apt-file search).",
   "Students will be able to explain repository configuration and the security role of GPG signature checking."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to dependencies and trusted sources."
   ],
   [
    12,
    "Teach",
    "Build a two-column comparison on the board (RPM family, Debian family) with low-level and high-level rows. Emphasize apt update versus upgrade, rpm -qf versus dnf provides, rpm -V output flags, and gpgcheck."
   ],
   [
    18,
    "Activity",
    "Run the 'Translate the command' card sort below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about trust and change control."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you install an app on a phone, what checks happen behind the scenes that you never see?",
  "activity": {
   "title": "Translate the command: RPM family to Debian family",
   "materials": "Printed task cards and command cards for both families, whiteboard, tape or sticky notes.",
   "steps": [
    "Prepare task cards (install a package from a repository, list a package's files, find which package owns a file, find which package provides a missing command, verify package files, refresh lists, remove including config, undo the last transaction) and command cards for each family, plus a few distractors.",
    "Groups of three tape each task card on the board and place the matching RPM-family and Debian-family command cards beside it, leaving a gap where no equivalent exists.",
    "Groups write on a sticky note whether each command works on installed packages only or also searches repositories.",
    "Give each group a scenario card (missing dig command; suspect modified config; half-installed .deb) and have them write the command sequence they would use.",
    "Review the board as a class, focusing on ownership versus provides queries and why gpgcheck should stay enabled."
   ]
  },
  "discussion": [
   "Why is installing a package downloaded from an unknown website risky even if it appears to work?",
   "When might you choose dnf history undo, and what limits could stop it from fully restoring the previous state?",
   "How could rpm -V support an incident investigation or a compliance audit?"
  ],
  "exit": [
   [
    "Which command shows which installed package owns /etc/ssh/sshd_config on a RHEL system?",
    "rpm -qf /etc/ssh/sshd_config"
   ],
   [
    "What is the difference between apt update and apt upgrade?",
    "update refreshes package lists; upgrade installs newer versions of installed packages."
   ],
   [
    "Why use dnf install ./pkg.rpm instead of rpm -ivh pkg.rpm?",
    "dnf resolves and installs dependencies from repositories; rpm fails if dependencies are missing."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-filled comparison table with half the cells blank so they complete the missing equivalents during the card sort.",
   "Extend: Ask fast finishers to interpret a sample rpm -V output line (for example S.5....T. c /etc/named.conf) and explain each flag, then write a .repo file stanza with gpgcheck enabled."
  ]
 },
 {
  "t": "Source and language packages: make, pip, sandboxed packages (Flatpak, Snap)",
  "objectives": [
   "Students will be able to describe the ./configure, make, make install sequence and identify which step needs root.",
   "Students will be able to explain the maintenance and security trade-offs of source-built software compared with repository packages.",
   "Students will be able to use pip safely inside a Python virtual environment.",
   "Students will be able to compare Flatpak and Snap, including remotes, snapd, automatic refreshes and confinement modes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the methods students already know for installing software."
   ],
   [
    12,
    "Teach",
    "Walk through a source build on the board, marking prerequisites (build tools, -dev/-devel headers, checksum), the three steps and --prefix. Then cover pip with venv, the externally managed error, and a Flatpak versus Snap comparison."
   ],
   [
    18,
    "Activity",
    "Run the 'Right tool for the request' decision activity below."
   ],
   [
    5,
    "Discuss",
    "Discuss trade-offs using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Besides an app store, what other ways have you installed software on any device, and which ones worried you?",
  "activity": {
   "title": "Right tool for the request",
   "materials": "Printed request cards, a four-column chart on the whiteboard (Distribution package, Source build, pip in venv, Flatpak/Snap), sticky notes.",
   "steps": [
    "Prepare eight request cards, for example: a server daemon in the repositories; an agent available only as a tarball; a Python library for one project; a desktop app newer than the repositories offer; a server tool distributed as a snap; two projects needing different library versions.",
    "In pairs, students place each card in a column and write on a sticky note the exact commands they would run.",
    "For each placement, pairs write one maintenance consequence (who updates it, how it is removed).",
    "Pairs exchange charts with another pair and challenge any placement they disagree with, citing a trade-off.",
    "The teacher reviews the board, emphasizing distribution packages first, venv for pip and documentation for source builds."
   ]
  },
  "discussion": [
   "Why is 'distribution packages first' a sensible default for servers, and when is it worth breaking?",
   "What extra steps should you take to trust a source tarball downloaded from a project's site?",
   "What are the costs of every sandboxed app bundling its own libraries?"
  ],
  "exit": [
   [
    "List the three standard source build steps in order and mark the one that usually needs root.",
    "./configure, make, make install (make install needs root)."
   ],
   [
    "How do you install Python packages for one project without changing the system Python?",
    "Create a venv with python3 -m venv, activate it, and pip install inside it."
   ],
   [
    "Which service manages snaps, and which confinement mode gives the least isolation?",
    "snapd; classic confinement."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart card ('Is it in the repositories? Is it a Python library? Is it a desktop app?') to guide struggling students through each request.",
   "Extend: Ask fast finishers to describe how they would document and later remove a source-installed tool under /opt, and how a checksum or signature check fits into the process."
  ]
 },
 {
  "t": "Containers: podman/docker run, images, port publishing, volumes, logs, inspect",
  "objectives": [
   "Students will be able to explain how containers use namespaces and cgroups and how they differ from virtual machines.",
   "Students will be able to construct podman or docker run commands with -d, --name, -p, -v and -e and predict the result.",
   "Students will be able to choose logs, exec, inspect or port to troubleshoot a running container.",
   "Students will be able to compare Podman and Docker security models, including rootless containers and the docker group."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and draw a VM stack next to a container stack based on student answers."
   ],
   [
    12,
    "Teach",
    "Dissect a full podman run command on the board, labeling each option. Stress host:container order, the writable layer versus volumes, :Z on SELinux, and the Podman versus Docker security difference. Show what logs and inspect reveal."
   ],
   [
    18,
    "Activity",
    "Run the 'Read the run command' pair troubleshooting activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If an app works on a developer's laptop but breaks on the server, what might be different between the two machines?",
  "activity": {
   "title": "Read the run command",
   "materials": "Printed cards each showing a container run command plus a symptom, whiteboard, markers; optionally laptops with a free browser-based container playground.",
   "steps": [
    "Prepare six cards, for example: -p 80:8080 used rootless; data missing after recreate with no -v; bind mount permission denied on RHEL; clients use the container port instead of the host port; 'latest' tag changed behavior; a user added to the docker group.",
    "In pairs, one student reads the command and symptom aloud and the other explains what is happening, then they swap for the next card.",
    "For each card, pairs rewrite the run command or write the troubleshooting command (logs, exec, inspect, port) that would confirm the cause.",
    "Pairs mark on each card which side of every -p and -v mapping is host and which is container.",
    "The class reviews the two most-missed cards on the whiteboard."
   ]
  },
  "discussion": [
   "Why might an organization prefer rootless Podman on shared servers?",
   "What are the risks of using the latest tag in production, and what should be used instead?",
   "When would you choose a named volume over a bind mount, and vice versa?"
  ],
  "exit": [
   [
    "In podman run -d -p 9090:3000 app, which port do clients connect to on the host?",
    "9090; it forwards to port 3000 inside the container."
   ],
   [
    "What happens to data in a container's writable layer when the container is removed, and how do you prevent loss?",
    "It is deleted; use a named volume or bind mount with -v."
   ],
   [
    "Which command opens a shell inside a running container named web?",
    "podman exec -it web /bin/sh (or docker exec)."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of a run command with each option color-coded and a 'host:container' reminder strip for -p and -v.",
   "Extend: Ask fast finishers to write the commands to update a container to a new image tag while keeping its data, and to find its IP address and mounts with inspect."
  ]
 },
 {
  "t": "Container orchestration concepts: Kubernetes pods, deployments, services",
  "objectives": [
   "Students will be able to describe the roles of pods, deployments and services and how they relate through labels and selectors.",
   "Students will be able to explain declarative configuration and identify the main control plane and worker node components.",
   "Students will be able to choose the correct service type (ClusterIP, NodePort, LoadBalancer) or Ingress for an access requirement.",
   "Students will be able to apply kubectl commands to scale, update and roll back a deployment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas about what goes wrong when running many containers by hand."
   ],
   [
    12,
    "Teach",
    "Draw a cluster on the board: control plane (API server, etcd, scheduler, controllers) and worker nodes (kubelet, runtime, kube-proxy). Then layer a deployment, its pods and a service with matching labels. Walk through the YAML manifest and the scale, rollout status and rollout undo commands."
   ],
   [
    18,
    "Activity",
    "Run the 'Human cluster' role-play below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you ran an online store on 20 containers across 5 servers, what would you need to do by hand when one server failed?",
  "activity": {
   "title": "Human cluster",
   "materials": "Sticky notes or name cards labeled with pod names and labels, role cards (deployment controller, scheduler, service, client), whiteboard, markers.",
   "steps": [
    "Assign roles: three to four students are nodes, one is the deployment controller holding a card saying 'replicas: 3, app: web', one is the scheduler, one is the service with selector app: web, and the rest are clients.",
    "The controller asks the scheduler to place three pods; students write pod cards with label app: web and a made-up IP and stick them on node students.",
    "Clients send 'requests' only through the service student, who forwards each to any pod with a matching label.",
    "The teacher 'fails' a node; the controller notices fewer than three pods and creates a replacement with a new IP, while clients keep using the service unchanged.",
    "Run two more rounds: scale to five replicas, then introduce a pod with a mismatched label and ask the class why the service ignores it. Finish by sketching the YAML for the deployment and service on the board."
   ]
  },
  "discussion": [
   "Why does declarative configuration fit well with storing manifests in version control?",
   "What could go wrong if a team edits live cluster objects by hand instead of updating manifests?",
   "When is exposing a service outside the cluster appropriate, and how would you limit the risk?"
  ],
  "exit": [
   [
    "Which Kubernetes object keeps a set number of pods running and performs rolling updates?",
    "A deployment (through its ReplicaSet)."
   ],
   [
    "Why do clients use a service instead of pod IPs?",
    "Pods are replaced and get new IPs; a service provides a stable IP and DNS name that load-balances across matching pods."
   ],
   [
    "Which command scales deployment web to six replicas?",
    "kubectl scale deployment web --replicas=6"
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page diagram showing pod, deployment and service with arrows labeled 'creates', 'selects by label' and 'sends traffic to', and let them annotate it during the role-play.",
   "Extend: Ask fast finishers to write a ClusterIP service manifest that matches the lesson's deployment, and to explain how an Ingress would route a hostname to it."
  ]
 },
 {
  "t": "Logging: journalctl filters, rsyslog, logrotate",
  "objectives": [
   "Students will be able to write journalctl commands that filter by unit, boot, priority and time window.",
   "Students will be able to explain the difference between a volatile and a persistent journal and configure persistence.",
   "Students will be able to read and write rsyslog facility.priority selectors, including UDP versus TCP forwarding.",
   "Students will be able to build and dry-run a logrotate stanza that keeps a set number of compressed copies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a terminal screenshot where journalctl -b -1 returns no entries. Ask pairs to guess why the previous boot's logs are missing, and collect guesses on the board."
   ],
   [
    15,
    "Teach",
    "Walk through journald (fields, volatile vs persistent storage, key filters), then rsyslog selectors and forwarding, then logrotate directives. Write the priority order on the board and stress that a selector priority includes everything more severe."
   ],
   [
    15,
    "Activity",
    "Run the 'Log Detective' card activity below. Circulate and ask each pair to say aloud which logging system answers each card and why."
   ],
   [
    5,
    "Discuss",
    "Debrief the cards that caused disagreement, especially *.err, @ versus @@, and copytruncate versus postrotate."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your server crashed and rebooted overnight, but journalctl shows nothing before this morning. Give two possible reasons, and say where you would look next.",
  "activity": {
   "title": "Log Detective",
   "materials": "Printed cards (about 12) each describing an investigation need, such as 'errors from nginx since yesterday' or 'send auth logs reliably to a central server'; a printed sample logrotate stanza; whiteboard.",
   "steps": [
    "Pairs draw a card and decide whether journalctl, an rsyslog rule or logrotate solves it.",
    "They write the exact command or configuration line on the back of the card, for example journalctl -u nginx -p err --since yesterday.",
    "For logrotate cards, pairs annotate the printed stanza to meet the card's retention and size requirements.",
    "Pairs swap cards with another pair and check each other's answers against the lesson notes.",
    "Each pair posts its hardest card on the board for the class debrief."
   ]
  },
  "discussion": [
   "Why is shipping logs to a central server a security control and not just a convenience?",
   "When would you prefer copytruncate over a postrotate signal, and what is the trade-off?",
   "What questions can the structured journal answer more easily than grep over a text file?"
  ],
  "exit": [
   [
    "Write the command to show only error-or-worse messages from the sshd unit during the previous boot.",
    "journalctl -u sshd -b -1 -p err (requires a persistent journal)."
   ],
   [
    "In rsyslog, what is the difference between @loghost:514 and @@loghost:514?",
    "One @ forwards over UDP; two @@ forward over TCP, which is reliable."
   ],
   [
    "Which logrotate directive keeps ten old copies, and which command tests the configuration without changes?",
    "rotate 10; logrotate -d <config file>."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page cheat sheet mapping exam phrases ('previous boot', 'follow', 'kernel only', 'errors and worse') to journalctl flags, and let them complete cards using it.",
   "Extend: Ask fast finishers to write an rsyslog rule that sends only local3 messages of warning and above to a separate file, plus a logrotate stanza for that file that rotates at 50 MB and keeps eight compressed copies."
  ]
 },
 {
  "t": "Permissions: chmod symbolic and octal, chown, umask",
  "objectives": [
   "Students will be able to convert permissions between symbolic (rwxr-x---) and octal (750) notation in both directions.",
   "Students will be able to explain how r, w and x differ for files and directories, including why deletion depends on the directory.",
   "Students will be able to choose between chmod symbolic, chmod octal and chown to meet a stated requirement.",
   "Students will be able to calculate the default permissions produced by a given umask for files and directories."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project three ls -l lines and ask students to say, for each, who can read the file. Note any confusion about the first character and the order of triplets."
   ],
   [
    15,
    "Teach",
    "Explain the u/g/o check order, the r/w/x meanings for files versus directories, the 4-2-1 octal method, symbolic changes including capital X, chown forms, and umask as bit removal. Work two conversions and two umask calculations on the board."
   ],
   [
    15,
    "Activity",
    "Run the 'Permission Relay' activity. Teams race through conversion and scenario cards, and the teacher checks answers at each station."
   ],
   [
    5,
    "Discuss",
    "Discuss why chmod 777 is a dangerous fix and how namei -l helps find the real cause of permission denied."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually on paper."
   ]
  ],
  "warmup": "A file shows -rw-r----- and is owned by alice:finance. Can bob, who is in finance, edit it? Can carol, who is not, read it?",
  "activity": {
   "title": "Permission Relay",
   "materials": "Printed cards with ls -l strings, octal modes, umask values and short requirements; whiteboard divided into team columns; markers.",
   "steps": [
    "Split the class into teams of three and place a stack of face-down cards for each team.",
    "One student flips a card and converts it (symbolic to octal, octal to symbolic, or umask to file and directory results) on the team's whiteboard column.",
    "The next student must check the answer before flipping the next card; an error sends the card back to the bottom of the stack.",
    "Scenario cards ask for the exact command, for example 'make this tree group-writable without making data files executable'.",
    "The first team to clear its stack correctly wins; the class then reviews the hardest scenario card together."
   ]
  },
  "discussion": [
   "Why does Linux check owner, then group, then others and stop at the first match, and what surprising result can that cause?",
   "When is symbolic notation safer than octal, and when is octal clearer?",
   "Why might a stricter system-wide umask cause problems for shared team directories, and how would you handle that?"
  ],
  "exit": [
   [
    "Convert rw-r----- to octal and 755 to symbolic.",
    "640; rwxr-xr-x."
   ],
   [
    "A file is 644 but user dana gets permission denied. Name one likely cause outside the file itself.",
    "A parent directory lacks x for dana, so she cannot traverse the path."
   ],
   [
    "With umask 027, what are the permissions of a new file and a new directory?",
    "640 for files and 750 for directories."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed 4-2-1 grid where students tick r, w and x for each class and add the columns, and pair them with a partner for the first few relay cards.",
   "Extend: Ask fast finishers to explain why a umask of 033 gives 644 files but 744 directories, and to write a single chmod command that makes a project tree 770 for directories and 660 for files."
  ]
 },
 {
  "t": "Special permissions: SUID, SGID, sticky bit; ACLs with setfacl and getfacl",
  "objectives": [
   "Students will be able to identify SUID, SGID and sticky bits from ls -l output and octal modes, including capital S and T.",
   "Students will be able to select the correct special bit for a stated requirement and set it with chmod in octal or symbolic form.",
   "Students will be able to grant, remove and inherit access with setfacl and interpret getfacl output, including the mask.",
   "Students will be able to explain why SUID-root programs are a security risk and how to audit for them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show ls -ld /tmp and ls -l /usr/bin/passwd on the projector and ask students what the unusual letters might mean."
   ],
   [
    15,
    "Teach",
    "Explain each special bit with its octal value, letter and slot, then the leading-digit sum (3770). Introduce ACLs: setfacl -m, -x, -b, -d, getfacl, the mask and the trailing +. Highlight the SUID audit command and nosuid."
   ],
   [
    15,
    "Activity",
    "Run 'Fix the Share' below: groups read printed ls -l and getfacl excerpts and prescribe exact commands."
   ],
   [
    5,
    "Discuss",
    "Discuss the security trade-off of SUID and when an ACL is better than creating a new group."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on index cards."
   ]
  ],
  "warmup": "Anyone can write to /tmp, so why can't you delete another user's file there? Write your best guess in one sentence.",
  "activity": {
   "title": "Fix the Share",
   "materials": "Printed handouts with six short scenarios, each showing ls -l or getfacl output and a requirement; highlighters; whiteboard for answers.",
   "steps": [
    "In groups of three, students highlight the special-bit letters and any + or mask entries on each handout.",
    "For each scenario, the group writes the exact chmod or setfacl command that meets the requirement, such as 'auditor needs read-only access to existing and future files'.",
    "Groups predict what ls -ld or getfacl will show after their command, including any #effective comments.",
    "Two groups compare answers and resolve any disagreement using the lesson notes.",
    "The teacher reveals answers and asks one group per scenario to explain its reasoning aloud."
   ]
  },
  "discussion": [
   "Why do you think Linux ignores SUID on shell scripts?",
   "When would you add an ACL entry instead of creating a new group, and what are the maintenance risks of many ACLs?",
   "How would you build an ongoing process to notice a new SUID-root file appearing on a server?"
  ],
  "exit": [
   [
    "What does drwxrws--T tell you about this directory?",
    "SGID is set (s in the group slot) and the sticky bit is set but others lack execute (capital T)."
   ],
   [
    "Write the command to give the group auditors read access to report.pdf without changing owner or group.",
    "setfacl -m g:auditors:r report.pdf."
   ],
   [
    "Which octal mode gives a team directory rwx for owner and group, nothing for others, group inheritance and delete protection?",
    "3770."
   ]
  ],
  "differentiation": [
   "Support: Give students a laminated slot diagram showing where s, s and t appear and the values 4, 2 and 1, and let them work the first two scenarios with the teacher.",
   "Extend: Ask fast finishers to predict and explain how chmod 750 on a file with a named-user rwx ACL entry changes that user's effective permissions."
  ]
 },
 {
  "t": "SELinux: modes, contexts, restorecon, semanage, booleans, ausearch; AppArmor profiles and modes",
  "objectives": [
   "Students will be able to explain how MAC differs from DAC and why a correctly permissioned file can still be denied.",
   "Students will be able to identify SELinux modes and contexts using getenforce, sestatus, ls -Z and ps -eZ.",
   "Students will be able to choose between restorecon, semanage fcontext, semanage port and setsebool -P to resolve a described denial.",
   "Students will be able to compare SELinux enforcing/permissive with AppArmor enforce/complain and use aa-status."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the scenario: files are 644, Apache gets 403. Ask students to list everything they would check, then reveal that permissions are not the cause."
   ],
   [
    15,
    "Teach",
    "Cover DAC versus MAC, the three SELinux modes, the context format with emphasis on type, mv versus cp labeling, restorecon, semanage fcontext and port, booleans, AVC logs and ausearch, then AppArmor profiles and modes."
   ],
   [
    15,
    "Activity",
    "Run 'Read the AVC' below with printed log excerpts and fix cards."
   ],
   [
    5,
    "Discuss",
    "Discuss why disabling SELinux is tempting and why it is the wrong answer, and when audit2allow is appropriate."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions on paper."
   ]
  ],
  "warmup": "A web page returns 403 Forbidden, but the files are 644 and owned correctly. What else on a Linux system could be refusing access?",
  "activity": {
   "title": "Read the AVC",
   "materials": "Printed AVC denial excerpts and ls -Z outputs (teacher-made, five scenarios); a set of fix cards listing restorecon, semanage fcontext + restorecon, semanage port, setsebool -P, chcon and setenforce 0; projector.",
   "steps": [
    "Pairs receive one scenario sheet showing an AVC line with scontext, tcontext and tclass, plus ls -Z output.",
    "They underline the source type and target type and write one sentence describing what was denied.",
    "They choose the best fix card and write the full command, rejecting chcon and setenforce 0 with a reason.",
    "Pairs rotate scenario sheets twice so each pair solves three scenarios.",
    "The teacher projects each scenario and pairs vote on the fix before the answer is revealed."
   ]
  },
  "discussion": [
   "Why is a label-based model (SELinux) affected differently by moving files than a path-based model (AppArmor)?",
   "What risks come from generating a custom module with audit2allow from every denial you see?",
   "How would you explain to a manager why 'just turn it off' is not acceptable on a production web server?"
  ],
  "exit": [
   [
    "Files moved with mv into /var/www/html cause 403 errors. Which command fixes the labels?",
    "restorecon -Rv /var/www/html."
   ],
   [
    "How do you allow Apache to make outbound network connections permanently?",
    "setsebool -P httpd_can_network_connect on."
   ],
   [
    "Which AppArmor command lists loaded profiles and whether each is in enforce or complain mode?",
    "aa-status."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart (wrong label on a default path, custom path, non-standard port, optional behavior) that maps each symptom to one command, and let students use it during the activity.",
   "Extend: Ask fast finishers to explain step by step what happens to labels when SELinux is re-enabled after being disabled, and why /.autorelabel is needed."
  ]
 },
 {
  "t": "Firewalls: firewalld zones and --permanent, ufw, nftables/iptables basics",
  "objectives": [
   "Students will be able to explain firewalld zones and apply services, ports and rich rules with firewall-cmd.",
   "Students will be able to distinguish runtime from permanent firewalld changes and predict the effect of --reload.",
   "Students will be able to configure basic ufw policies and rules safely on a remote host.",
   "Students will be able to interpret iptables rule order, chain policy and the difference between DROP and REJECT, and identify nftables as the modern framework."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Tell the story of a rule that worked on Tuesday and vanished after Thursday's reboot. Ask students to propose explanations."
   ],
   [
    15,
    "Teach",
    "Explain netfilter and front ends, firewalld zones and services, runtime versus permanent with --reload, rich rules, ufw commands and the SSH-first rule, then iptables tables, chains, first-match order, DROP versus REJECT, and nftables."
   ],
   [
    15,
    "Activity",
    "Run 'Whiteboard and Binder' below: students simulate runtime and permanent firewalld state with sticky notes."
   ],
   [
    5,
    "Discuss",
    "Discuss why mixing firewall tools on one host causes trouble, and how to choose between DROP and REJECT."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "You open a port with a firewall command, test it successfully, and it stops working after a reboot. What might have happened?",
  "activity": {
   "title": "Whiteboard and Binder",
   "materials": "Whiteboard divided into 'Runtime' and 'Permanent' columns per group; two colors of sticky notes; printed command cards (firewall-cmd with and without --permanent, --reload, --runtime-to-permanent, reboot).",
   "steps": [
    "Each group of three gets a whiteboard section split into Runtime and Permanent columns and starts with 'ssh' in both.",
    "The teacher reads command cards one at a time; groups add, remove or copy sticky notes to show the resulting state.",
    "On --reload or reboot cards, groups must clear Runtime and recopy it from Permanent, noticing what is lost.",
    "After eight cards, groups compare their final boards with the teacher's answer key and explain any differences.",
    "As a final round, groups translate three requirements into ufw commands and order them safely for a remote host."
   ]
  },
  "discussion": [
   "Why does firewalld separate runtime and permanent configuration at all? What is the benefit of testing at runtime first?",
   "When might REJECT be preferable to DROP, and when might DROP be preferable?",
   "What could go wrong if both ufw and hand-written nftables rules are active on the same server?"
  ],
  "exit": [
   [
    "Write the two commands that permanently allow HTTPS in firewalld and make it active now.",
    "firewall-cmd --permanent --add-service=https and firewall-cmd --reload."
   ],
   [
    "What must you do before ufw enable on a remote server, and why?",
    "Allow SSH (ufw allow OpenSSH), or the default deny policy may cut off your session."
   ],
   [
    "An appended iptables ACCEPT rule has no effect. What is the most likely cause?",
    "An earlier rule in the chain already matches and drops or rejects the traffic, because the first match wins."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat sheet of firewalld and ufw commands for common tasks, and pair struggling students with a partner who reads the cards aloud during the activity.",
   "Extend: Ask fast finishers to write a firewalld rich rule that allows SSH only from 192.168.10.0/24 and to explain how they would confirm it in the output of firewall-cmd --list-all."
  ]
 },
 {
  "t": "SSH hardening: key-based auth, ssh-copy-id, sshd_config (PermitRootLogin, PasswordAuthentication)",
  "objectives": [
   "Students will be able to explain how key-based SSH authentication works and why the private key never leaves the client.",
   "Students will be able to deploy a public key with ssh-copy-id and set correct permissions on ~/.ssh and authorized_keys.",
   "Students will be able to configure PermitRootLogin, PasswordAuthentication and AllowUsers/AllowGroups and validate them with sshd -t and sshd -T.",
   "Students will be able to sequence hardening steps safely to avoid locking themselves out of a remote server."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a short excerpt of failed SSH password attempts (teacher-written, fictional addresses) and ask what is happening and how worried to be."
   ],
   [
    15,
    "Teach",
    "Explain key pairs and the challenge, ssh-keygen and ssh-copy-id, StrictModes permissions, key sshd_config directives, drop-ins and first-value-wins, sshd -t and -T, the second-terminal rule, and complementary controls."
   ],
   [
    15,
    "Activity",
    "Run 'Do Not Lock Yourself Out' below: groups order hardening step cards and review a flawed config."
   ],
   [
    5,
    "Discuss",
    "Discuss why changing the port is not real security and how host key verification defends against man-in-the-middle attacks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "If you could only make one change to protect a server that bots attack with passwords all day, what would it be, and what could go wrong if you made it carelessly?",
  "activity": {
   "title": "Do Not Lock Yourself Out",
   "materials": "Printed step cards (generate key, ssh-copy-id, test login in second terminal, test sudo, edit drop-in, sshd -t, reload, close old session); a printed flawed sshd_config excerpt and ls -la output with bad permissions.",
   "steps": [
    "Groups of three shuffle the step cards and arrange them in a safe order, marking the point of no return.",
    "The teacher presents one unsafe ordering; groups explain exactly when and why the admin gets locked out.",
    "Groups read the flawed config excerpt and ls -la output and circle every problem, such as a 777 home directory or PermitRootLogin yes.",
    "Each group writes a corrected drop-in file on paper and lists the verification commands they would run.",
    "Groups present one fix each while the class confirms or challenges it."
   ]
  },
  "discussion": [
   "Why is accountability better when admins log in as themselves and use sudo instead of logging in as root?",
   "What should an admin do when SSH warns that a server's host key has changed?",
   "Which complementary controls (fail2ban, firewall, MFA) would you add first for an internet-facing bastion host, and why?"
  ],
  "exit": [
   [
    "Which two sshd_config settings stop direct root logins and stop password logins?",
    "PermitRootLogin no and PasswordAuthentication no."
   ],
   [
    "What permissions should ~/.ssh and authorized_keys have?",
    "700 for ~/.ssh and 600 for authorized_keys, owned by the user."
   ],
   [
    "What must you confirm before disabling password authentication on a remote server?",
    "That key-based login (and sudo) works in a separate session, keeping the current session open."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-labeled diagram of the client and server showing where each key file lives and which file ssh-copy-id changes, and let them complete the step ordering with a partner.",
   "Extend: Ask fast finishers to write a Match block that allows password authentication only from one management subnet while keys remain required everywhere else, and explain how they would verify it with sshd -T."
  ]
 },
 {
  "t": "Privilege escalation: sudo, visudo, /etc/sudoers.d, su, polkit",
  "objectives": [
   "Students will be able to compare su, su -, sudo and sudo -i in terms of whose password is used and how actions are logged.",
   "Students will be able to read and write sudoers rules, including group rules with % and command-specific least-privilege rules.",
   "Students will be able to add rules safely with visudo and visudo -f in /etc/sudoers.d and avoid the naming pitfalls.",
   "Students will be able to identify risky sudo grants that allow shell escape and describe the role of polkit."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: five people share the root password and something broke at 3 a.m. How do you find out who did it? Collect answers and highlight the accountability gap."
   ],
   [
    15,
    "Teach",
    "Explain least privilege, su versus su -, sudo options, sudoers rule syntax and % groups, wheel and sudo groups, NOPASSWD, visudo and sudoers.d rules including the dot pitfall, shell-escape risks, and polkit with pkexec."
   ],
   [
    15,
    "Activity",
    "Run 'Rule Review Board' below: teams review printed sudoers rules and rewrite unsafe ones."
   ],
   [
    5,
    "Discuss",
    "Discuss when NOPASSWD is acceptable and why wheel membership should be reviewed regularly."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "Name one reason an organization might prefer sudo over sharing the root password with every administrator.",
  "activity": {
   "title": "Rule Review Board",
   "materials": "Printed cards each with one sudoers rule or drop-in filename (for example %dev ALL=(ALL) NOPASSWD: ALL, ops ALL=(root) /usr/bin/less /var/log/*, /etc/sudoers.d/db.conf); a printed requirements sheet; whiteboard.",
   "steps": [
    "Teams of three receive eight rule cards and the requirements sheet describing what each team actually needs.",
    "For each card, the team decides 'approve' or 'reject' and writes the reason, such as shell escape, overly broad ALL or an ignored filename.",
    "For each rejected card, the team writes a corrected least-privilege rule with full command paths and a valid drop-in name.",
    "Teams trade corrected rules with another team, which checks syntax using the rule format on the board.",
    "The teacher reviews the trickiest cards with the whole class."
   ]
  },
  "discussion": [
   "Why do you think sudo logs the working directory and full command, not just the fact that sudo was used?",
   "Is NOPASSWD ever appropriate? What compensating controls would you want?",
   "How does the dual meaning of 'privilege escalation' (admin tool and attack technique) change how you write sudo rules?"
  ],
  "exit": [
   [
    "Which command safely creates or edits a sudoers drop-in for the dba team?",
    "visudo -f /etc/sudoers.d/dba."
   ],
   [
    "Write a rule that lets members of the group webops restart nginx as root and nothing else.",
    "%webops ALL=(root) /usr/bin/systemctl restart nginx."
   ],
   [
    "A user runs su - and is asked for a password. Whose password is it?",
    "The target account's password (root's by default)."
   ]
  ],
  "differentiation": [
   "Support: Provide a color-coded breakdown of the rule format (who, where, as whom, what) and a short list of risky commands, and let students annotate the first three cards with the teacher.",
   "Extend: Ask fast finishers to rewrite a large sudoers policy using User_Alias and Cmnd_Alias, and to explain why sudoedit is safer than granting an editor."
  ]
 },
 {
  "t": "Authentication: PAM modules (pam_faillock, pam_pwquality), LDAP/SSSD, Kerberos, MFA",
  "objectives": [
   "Students will be able to describe the four PAM types and explain how required, requisite, sufficient and optional affect a stack.",
   "Students will be able to configure and troubleshoot account lockout with pam_faillock and password strength with pam_pwquality.",
   "Students will be able to explain how SSSD, LDAP and nsswitch provide centralized identities and diagnose a 'no such user' failure.",
   "Students will be able to explain Kerberos tickets and MFA factor types and connect clock skew to authentication failures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the three Monday-morning tickets from the lesson hook aloud and ask students to guess which component each involves."
   ],
   [
    15,
    "Teach",
    "Explain PAM files, types and control flags with a drawn stack, authselect, pam_pwquality and pam_faillock settings and commands, LDAP and SSSD with nsswitch, Kerberos tickets and clock sync, and MFA factor types."
   ],
   [
    15,
    "Activity",
    "Run 'Trace the Login' below: groups walk a login through a printed PAM stack and solve help-desk tickets."
   ],
   [
    5,
    "Discuss",
    "Discuss when unlocking an account is appropriate and what to check first."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "Name three different reasons someone might be unable to log in to a Linux server even though they are typing the correct password.",
  "activity": {
   "title": "Trace the Login",
   "materials": "Printed simplified PAM stack for sshd (auth and account lines with control flags); six printed help-desk ticket cards with short command outputs (faillock, id, systemctl status sssd, klist, chronyc tracking); sticky notes.",
   "steps": [
    "Groups of three use a sticky note as a 'login token' and move it line by line down the printed PAM stack for three given outcomes (module passes or fails).",
    "At each line they record whether the stack continues, stops with success or stops with failure, applying the control flag rules.",
    "Groups then draw ticket cards and identify the failing layer: PAM lockout, password policy, SSSD, nsswitch, Kerberos or clock.",
    "For each ticket they write the diagnostic command they would run next and the safe fix.",
    "Groups present one ticket each, and the class votes on whether the fix is safe and complete."
   ]
  },
  "discussion": [
   "Why does PAM let a required module fail without stopping the stack immediately? What does that hide from an attacker?",
   "What are the risks of SSSD caching credentials, and why is it still usually worth it?",
   "Why do both Kerberos and TOTP depend on accurate time, and how would you monitor for clock drift?"
  ],
  "exit": [
   [
    "Which PAM module locks accounts after repeated failures, and which command unlocks a user?",
    "pam_faillock; faillock --user <name> --reset."
   ],
   [
    "What is the difference between requisite and required?",
    "requisite fails the stack immediately; required records failure but lets the stack finish before denying."
   ],
   [
    "A directory user shows 'no such user' and sssd is not running because sssd.conf is mode 644. What is the fix?",
    "Set sssd.conf to mode 600 owned by root, then restart sssd."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page table mapping each symptom (locked out, weak password rejected, no such user, clock skew) to the component and command, and let students use it while tracing tickets.",
   "Extend: Ask fast finishers to explain how SSH AuthenticationMethods publickey,keyboard-interactive combines with a PAM TOTP module to produce MFA, and which factor types each part provides."
  ]
 },
 {
  "t": "Cryptography: hashing (sha256sum), GPG signatures, TLS certificates, LUKS disk encryption",
  "objectives": [
   "Students will be able to match hashing, digital signatures, TLS and LUKS to the guarantees of integrity, authenticity and confidentiality.",
   "Students will be able to verify a download using sha256sum -c and gpg --verify and explain why both are used.",
   "Students will be able to describe the certificate request process with a CSR and inspect a certificate's SAN and validity with openssl.",
   "Students will be able to outline the LUKS workflow with cryptsetup, including key slots and header backups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: you downloaded a file and its checksum from the same site, and they match. Are you sure the file is safe? Take a quick class vote and record the reasons."
   ],
   [
    15,
    "Teach",
    "Teach the three guarantees, then hashes and sha256sum -c, GPG signatures and fingerprint verification, TLS certificates with CSR, SAN, trust stores and openssl inspection, and the LUKS workflow with key slots and header backups."
   ],
   [
    15,
    "Activity",
    "Run 'Which Promise?' below: groups match scenarios to tools and inspect a printed certificate."
   ],
   [
    5,
    "Discuss",
    "Discuss what to do when a private key has been exposed and why LUKS does not protect a running system."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "Name something in daily life that proves a thing has not been changed, and something that proves who sent it. Are they the same thing?",
  "activity": {
   "title": "Which Promise?",
   "materials": "Printed scenario cards (about ten, such as 'stolen laptop', 'verify publisher of ISO', 'browser name mismatch warning'); a printed sample openssl x509 -text output (teacher-made, fictional names); three large sheets labeled Integrity, Authenticity, Confidentiality.",
   "steps": [
    "Groups of three sort scenario cards onto the Integrity, Authenticity and Confidentiality sheets, allowing a card to sit on two sheets if justified.",
    "For each card they write the specific tool and command, such as sha256sum -c, gpg --verify, openssl s_client or cryptsetup open.",
    "Groups then study the printed certificate output and answer: who issued it, when it expires and which names it is valid for.",
    "Each group identifies one problem the teacher planted in the certificate, such as a missing SAN entry, and proposes the fix.",
    "Groups present their sorting and justify any card placed on two sheets."
   ]
  },
  "discussion": [
   "Why do package managers check signatures automatically, and what would go wrong if they only checked hashes?",
   "A certificate shows as expired, but its dates look valid. What else could cause this?",
   "What procedures should an organization have for LUKS recovery passphrases and header backups?"
  ],
  "exit": [
   [
    "Which tool proves a file came from the publisher, and which only proves it was not corrupted?",
    "A GPG signature proves authenticity (and integrity); a hash such as sha256sum proves only integrity."
   ],
   [
    "What do you send to a CA to obtain a TLS certificate?",
    "A CSR, never the private key."
   ],
   [
    "Which command unlocks a LUKS partition /dev/sdc1 as /dev/mapper/vault?",
    "cryptsetup open /dev/sdc1 vault."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column reference card (guarantee, tool, example command) and let students consult it during the sorting activity, starting with the clearest scenarios.",
   "Extend: Ask fast finishers to write the full sequence of commands to create a LUKS volume on a spare partition, add a recovery passphrase, back up the header and mount it at boot through /etc/crypttab and /etc/fstab."
  ]
 },
 {
  "t": "OS hardening: disabling unused services, secure boot, patching, file integrity (AIDE)",
  "objectives": [
   "Students will be able to identify unnecessary listening services with ss -tulpn and remove, disable or mask them appropriately.",
   "Students will be able to explain what Secure Boot protects, how to check its state and how MOK enrollment allows third-party modules.",
   "Students will be able to describe a patching process that prioritizes security updates and confirms kernel updates with a reboot.",
   "Students will be able to initialize, check and update an AIDE baseline and explain why the database must be protected."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the auditor's four questions from the lesson hook and ask pairs to rate their confidence in answering each for a server they know."
   ],
   [
    15,
    "Teach",
    "Teach attack surface and defense in depth, then services (ss -tulpn, disable --now, mask, package removal), Secure Boot and MOK, patching with security-only updates and reboot checks, AIDE workflow and baseline protection, and extra hardening steps."
   ],
   [
    15,
    "Activity",
    "Run 'Audit the Server' below with printed command outputs."
   ],
   [
    5,
    "Discuss",
    "Discuss how to balance patch speed with testing, and why the AIDE database should not live only on the protected host."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions."
   ]
  ],
  "warmup": "If you could see only one command's output from a new server to judge how exposed it is, which command would you pick, and why?",
  "activity": {
   "title": "Audit the Server",
   "materials": "Printed packet for a fictional server: ss -tulpn output, systemctl list-unit-files excerpt, mokutil --sb-state output, needs-restarting -r output, uname -r and a short AIDE report (all teacher-made); a printed audit checklist; highlighters.",
   "steps": [
    "Groups of three act as auditors and work through the checklist using only the printed outputs.",
    "They highlight every listening service and decide keep, disable, mask or remove, writing the exact command for each.",
    "They determine from the outputs whether Secure Boot is on and whether the server is running the latest installed kernel.",
    "They read the AIDE report and classify each change as expected from patching or suspicious, citing evidence.",
    "Each group writes a three-line audit finding with a recommended fix and presents it to the class."
   ]
  },
  "discussion": [
   "Why is removing a package often better than disabling its service?",
   "What risks come with fully automatic patching on production servers, and how can they be reduced?",
   "An AIDE report flags a changed file you cannot explain. What are your first three steps?"
  ],
  "exit": [
   [
    "Which command stops a service now and prevents it starting at boot?",
    "systemctl disable --now <service>."
   ],
   [
    "A third-party driver will not load on a system with Secure Boot enabled. What is the correct fix?",
    "Sign the module with a key enrolled as a MOK rather than disabling Secure Boot."
   ],
   [
    "What must you do after applying legitimate patches on a system monitored by AIDE?",
    "Run aide --update, review the changes, and replace (and safely store) the baseline database."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card linking each checklist item to one command (ss -tulpn, systemctl, mokutil, needs-restarting, aide), and walk through the first checklist item together before groups continue.",
   "Extend: Ask fast finishers to draft a short hardening baseline for a new web server covering services, mount options for /tmp, firewall, SELinux mode, patch schedule and AIDE scheduling, and to explain how they would verify each item."
  ]
 },
 {
  "t": "Compliance and auditing: auditd, log review, vulnerability scanning, CIS benchmarks",
  "objectives": [
   "Students will be able to write a persistent auditd file watch with a key and explain each part of the rule.",
   "Students will be able to use ausearch and aureport to locate events by key, user and outcome, and explain the role of the auid.",
   "Students will be able to compare vulnerability scanning with benchmark compliance checking and name a tool for each.",
   "Students will be able to identify log review warning signs and justify forwarding logs to a central server."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the shared root password and collect three or four answers on the whiteboard without judging them."
   ],
   [
    12,
    "Teach",
    "Walk through the four pieces: auditd rules (auditctl versus rules.d and augenrules), the auid, ausearch and aureport options, then scanning with CVE and CVSS, CIS Level 1 and 2, and OpenSCAP. Project the sample audit event and circle uid and auid."
   ],
   [
    18,
    "Activity",
    "Run the Audit Evidence Desk activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups share which evidence would satisfy the auditor and where their first rule attempts fell short. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a sticky note or in a short online form."
   ]
  ],
  "warmup": "Four admins share the root password on a server, and someone edited the sudoers file last week. How could the system tell you which person it was?",
  "activity": {
   "title": "Audit Evidence Desk",
   "materials": "Projector, printed auditor request cards (one request per card), printed excerpts of audit.log events with uid and auid fields, whiteboard, student laptops with a browser for man page reference.",
   "steps": [
    "Give each group two auditor request cards, such as 'Prove changes to /etc/ssh/sshd_config are tracked' and 'List failed logins since Monday.'",
    "For each card, groups write the exact persistent audit rule or the ausearch or aureport command that would produce the evidence, including the file path where a persistent rule goes.",
    "Hand out the printed audit.log excerpt. Groups find the event that matches their rule, identify the uid and auid, and write one sentence naming the responsible person.",
    "Each group adds one scanning or benchmark item to its evidence pack: which tool it would run (a vulnerability scanner or OpenSCAP with a CIS profile) and what the report would show.",
    "Groups swap packs and play auditor for another group, marking any rule that would vanish at reboot or any event missing a key."
   ]
  },
  "discussion": [
   "Why might a team decide not to apply a CIS Level 2 recommendation, and how should that decision be recorded?",
   "What could an attacker who gains root on a server do to local logs, and how does central log forwarding change that?"
  ],
  "exit": [
   [
    "Write an audit rule that records writes and attribute changes to /etc/group with the key groups, and say where to put it so it survives reboot.",
    "-w /etc/group -p wa -k groups, placed in a file under /etc/audit/rules.d/ and loaded with augenrules --load."
   ],
   [
    "An event shows uid=0 and auid=1004. What does that tell you?",
    "The process ran as root, but the person who originally logged in was the user with ID 1004, for example after using sudo."
   ],
   [
    "Which tool would you use to check a server against a CIS profile and produce an HTML report?",
    "OpenSCAP, using oscap xccdf eval with the profile and --report."
   ]
  ],
  "differentiation": [
   "Support: Provide a rule template card with blanks for path, permissions and key, plus a one-line cheat sheet mapping auditctl, ausearch and aureport to manage, find and summarize.",
   "Extend: Ask fast finishers to write a syscall-based rule idea for tracking every use of a privileged command, explain why a key matters for it, and draft a monthly log review checklist."
  ]
 },
 {
  "t": "Bash scripting: shebang, variables, parameter expansion, quoting, exit codes and $?",
  "objectives": [
   "Students will be able to explain what the shebang does and compare running a script with ./, bash and source.",
   "Students will be able to predict the result of common parameter expansions such as ${var:-default}, ${file%.txt} and ${path##*/}.",
   "Students will be able to apply correct quoting to prevent word splitting and globbing in a script.",
   "Students will be able to use $? and exit codes to detect and report failures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and ask students to predict output before you reveal it. Note the split between people who expect one argument and those who expect two."
   ],
   [
    13,
    "Teach",
    "Demonstrate the shebang and the three ways to run a script, then variables, special parameters and parameter expansion with the keyboard memory aid for # and %. Finish with quoting and $?, showing how echo overwrites it."
   ],
   [
    17,
    "Activity",
    "Run Predict the Output in pairs with the printed script cards."
   ],
   [
    5,
    "Discuss",
    "Review the trickiest card as a class and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If file is set to 'Q3 report.xlsx', how many arguments does cp $file /backup pass to cp, and what does cp \"$file\" /backup pass?",
  "activity": {
   "title": "Predict the Output",
   "materials": "Printed cards, each with a three- to six-line script and a blank for predicted output; student laptops with a browser-based Linux terminal or a lab VM if available; whiteboard for scoring.",
   "steps": [
    "Pairs draw a card and write their predicted output and exit status without running anything.",
    "Cards cover a space around =, single versus double quotes, ${var:-default}, ${file%.*}, ${path##*/}, $? checked after an echo, and source versus ./.",
    "If a terminal is available, pairs run the script to check; otherwise the teacher reveals the answer.",
    "For each wrong prediction, pairs write one sentence explaining the rule they missed and a one-line fix.",
    "Pairs swap a corrected card with another pair, who verifies the fix."
   ]
  },
  "discussion": [
   "Why do experienced admins quote nearly every variable even when they know the value has no spaces today?",
   "When would you deliberately want a script to change your current shell, and what are the risks of using source?"
  ],
  "exit": [
   [
    "What does ${name:-guest} print if name is unset?",
    "guest, because :- substitutes the default when the variable is unset or empty."
   ],
   [
    "Why does name = web01 fail?",
    "The spaces make Bash run a command called name instead of assigning a variable."
   ],
   [
    "A command fails, then you run echo hi, then echo $?. What is printed last, and why?",
    "0, because $? now holds the exit status of the successful echo hi, not the failed command."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference card listing each special parameter and expansion with one worked example, and let them use it during the activity.",
   "Extend: Ask fast finishers to rewrite a fragile five-line script so it validates its argument with ${1:?usage message}, quotes every expansion and exits with meaningful codes."
  ]
 },
 {
  "t": "Bash control flow: if/test, case, for and while loops, functions, arrays",
  "objectives": [
   "Students will be able to choose the correct file, string and integer test operators for an if statement.",
   "Students will be able to write a case statement with alternatives and a default branch.",
   "Students will be able to compare for, while and until loops and explain the safe way to read a file line by line.",
   "Students will be able to use functions with local variables and indexed and associative arrays."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up script on the projector, ask for predictions, then reveal that a file named 90 appears. Ask why."
   ],
   [
    12,
    "Teach",
    "Cover if with [ ], [[ ]] and (( )), then case, then loops including while read, then functions with local and both array types. Write each closing keyword (fi, esac, done) on the board next to its opener."
   ],
   [
    18,
    "Activity",
    "Run Fix the Script in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share the bug that took longest to find. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "usage=95; if [ $usage > 90 ]; then echo high; fi. What do you expect, and what do you think actually happens?",
  "activity": {
   "title": "Fix the Script",
   "materials": "Printed broken scripts (one per pair, each with three planted bugs), colored pens, student laptops with a browser-based terminal or lab VM if available, whiteboard.",
   "steps": [
    "Give each pair a 12- to 15-line disk-check script containing bugs such as missing spaces in brackets, > used for numbers, a missing ;; in case, for line in $(cat file), and a function variable without local.",
    "Pairs circle each bug, name the rule it breaks and write the corrected line in the margin.",
    "If a terminal is available, pairs type the fixed version and run it against a sample hosts.txt using echo in place of ssh.",
    "Pairs add one improvement: an associative array mapping hostnames to thresholds, or a case option for quiet mode.",
    "Two pairs merge and compare fixes, agreeing on a final version to show the class."
   ]
  },
  "discussion": [
   "When would you choose [[ ]] over [ ], and when might portability to plain sh matter?",
   "How does using functions and local variables make a long admin script easier for a colleague to maintain?"
  ],
  "exit": [
   [
    "Write a test that is true when the variable count is greater than 10.",
    "[ \"$count\" -gt 10 ] or (( count > 10 ))."
   ],
   [
    "What is wrong with this line: case $1 in start) systemctl start app esac",
    "The branch is missing ;; and the variable should be quoted; the correct form ends the branch with ;; before esac."
   ],
   [
    "How do you append web03 to the array servers and then print how many elements it has?",
    "servers+=(web03) then echo \"${#servers[@]}\"."
   ]
  ],
  "differentiation": [
   "Support: Provide a syntax strip showing the skeleton of if, case, for, while and a function with each closing keyword highlighted, and pair struggling students with a partner who reads the script aloud.",
   "Extend: Ask fast finishers to add an until loop that retries an unreachable host three times with a sleep between attempts, and to report results from an associative array at the end."
  ]
 },
 {
  "t": "Safer scripts: set -euo pipefail, trap, input validation, shellcheck",
  "objectives": [
   "Students will be able to explain what set -e, set -u and set -o pipefail each catch and name the cases set -e ignores.",
   "Students will be able to use trap with EXIT and mktemp to guarantee cleanup of temporary files.",
   "Students will be able to apply input validation techniques including argument counts, allow-list patterns, quoting and --.",
   "Students will be able to interpret a ShellCheck warning and choose the right fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students where the script should have stopped. Collect answers on the board."
   ],
   [
    12,
    "Teach",
    "Present each strict-mode flag with a one-line demonstration of the failure it catches, then trap and mktemp, then the input validation checklist, then ShellCheck and bash -n. Stress the set -e exceptions."
   ],
   [
    18,
    "Activity",
    "Run Harden This Script in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups present one change and its justification. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A cron job runs rm -rf \"$BASE_DIR\"/cache/* and BASE_DIR is not set. What does Bash do by default, and what would you want it to do instead?",
  "activity": {
   "title": "Harden This Script",
   "materials": "Printed fragile scripts (about 12 lines each), printed sample ShellCheck output with codes such as SC2086, sticky notes, student laptops with a browser for looking up ShellCheck codes or running a lab terminal if available.",
   "steps": [
    "Each group receives a fragile script that takes a user-supplied path, writes to a fixed /tmp file, pipes grep into sort and deletes files.",
    "Groups list every risk they can find on sticky notes, one risk per note, and stick them next to the relevant line.",
    "For each risk, groups write the control that fixes it: a strict-mode flag, a trap with mktemp, a validation check, quoting with --, or an explicit PATH.",
    "Groups read the printed ShellCheck output for the original script and match each warning code to one of their sticky notes.",
    "Groups rewrite the top ten lines of the script as a hardened header and compare it with a neighboring group."
   ]
  },
  "discussion": [
   "Strict mode can make a script stop on harmless conditions such as grep finding nothing. How do you balance safety with scripts that do not fail unnecessarily?",
   "Why do scripts run from root's crontab need more care than scripts you run by hand?"
  ],
  "exit": [
   [
    "Which option makes a script stop when it references a variable that was never set?",
    "set -u (nounset)."
   ],
   [
    "Write the two lines that create a temporary file and make sure it is removed when the script exits.",
    "tmp=$(mktemp) and trap 'rm -f \"$tmp\"' EXIT."
   ],
   [
    "Why does set -e not stop a script when the command in an if condition fails?",
    "Failures in conditions are expected and handled by the if, so errexit deliberately ignores them."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching card set pairing each risk (failed command, unset variable, hidden pipeline failure, leftover temp file, dangerous input) with its control, and let students sort them before the main activity.",
   "Extend: Ask fast finishers to add an ERR trap that logs the failing line number and a dry-run option that prints destructive commands instead of running them."
  ]
 },
 {
  "t": "Python basics for admins: data types, sets and dicts, venv, pip, running scripts",
  "objectives": [
   "Students will be able to identify Python's basic data types and explain why type conversion is needed for input read from files.",
   "Students will be able to choose between a list, tuple, set and dict for a described admin task.",
   "Students will be able to create, activate and reproduce a virtual environment using venv, pip and requirements.txt.",
   "Students will be able to explain how to run a Python script directly and why subprocess.run should receive an argument list."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show two short lists of usernames with duplicates and ask students how they would find who is missing from the second list."
   ],
   [
    13,
    "Teach",
    "Introduce basic types and conversion, then the four collections with one admin example each, then the venv workflow step by step on the projector, ending with running scripts, the __main__ guard and safe subprocess use."
   ],
   [
    17,
    "Activity",
    "Run Pick the Container in pairs, followed by the venv sequencing cards."
   ],
   [
    5,
    "Discuss",
    "Pairs justify their trickiest choice. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Here are two lists of usernames from two servers, with some duplicates. How would you find every user on the first list who is missing from the second?",
  "activity": {
   "title": "Pick the Container",
   "materials": "Printed scenario cards, printed command cards for the venv workflow, whiteboard, student laptops with a browser-based Python interpreter if available.",
   "steps": [
    "Pairs receive eight scenario cards, such as 'deduplicate 5,000 log IP addresses', 'store a host and port pair that must not change', 'look up a server's owner by name' and 'keep job steps in order'.",
    "For each card, pairs write list, tuple, set or dict and one sentence of justification.",
    "If a browser Python interpreter is available, pairs write the one-line expression for two cards, such as sorted(set(a) - set(b)).",
    "Pairs then receive shuffled command cards (python3 -m venv .venv, source .venv/bin/activate, pip install requests, pip freeze > requirements.txt, deactivate, pip install -r requirements.txt) and put them in the order a colleague would use to build and then recreate the environment.",
    "Pairs compare answers with a neighboring pair and resolve any disagreements with the teacher."
   ]
  },
  "discussion": [
   "Why might a distribution refuse sudo pip install into the system Python, and who benefits from that rule?",
   "When would you still choose a Bash script over Python for an admin task?"
  ],
  "exit": [
   [
    "Which data type would you use to find users present on server A but not server B, and what expression gives the answer?",
    "A set; a - b gives the users in A that are not in B."
   ],
   [
    "List the commands to create a venv called .venv, activate it and install the package requests.",
    "python3 -m venv .venv, source .venv/bin/activate, pip install requests."
   ],
   [
    "Why does '22' + 1 fail in Python?",
    "It tries to add a string and an int; Python raises a TypeError instead of converting automatically, so use int('22') + 1."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page chart comparing list, tuple, set and dict on ordered, changeable and unique, with one admin example each, to use during the activity.",
   "Extend: Ask fast finishers to sketch a script that reads two getent passwd exports, builds sets of usernames, maps missing users to their shells in a dict and writes it with json.dump, including a try and except for a missing file."
  ]
 },
 {
  "t": "Git: clone, branch/switch, add, commit, merge, rebase, revert, pull requests",
  "objectives": [
   "Students will be able to describe the working tree, staging area and history, and use clone, add, commit, push, fetch and pull correctly.",
   "Students will be able to create and switch branches and compare merge with rebase.",
   "Students will be able to choose between git revert and git reset for a given situation and justify the choice.",
   "Students will be able to explain the pull request workflow and how it supports change control."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and take a quick hand vote on reset versus revert before teaching."
   ],
   [
    12,
    "Teach",
    "Draw the three areas on the whiteboard, then the commit chain with a branch pointer. Show fast-forward merge, merge commit and rebase as diagrams, then revert versus reset, then the pull request flow."
   ],
   [
    18,
    "Activity",
    "Run Human Git with sticky notes and the scenario cards."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up vote and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A bad commit is already on the shared main branch and three teammates have pulled it. Would you erase it from history or add a new commit that undoes it? Why?",
  "activity": {
   "title": "Human Git",
   "materials": "Sticky notes in two colors, whiteboard and markers, printed scenario cards, optional student laptops with a browser-based Git visualizer if available.",
   "steps": [
    "Draw a main line on the whiteboard and represent each commit as a sticky note with a short ID and message; one student holds a card labeled HEAD.",
    "Groups act out scenarios from cards: create a branch and add two commits, fast-forward merge, merge after main has moved (adding a two-parent merge commit), and rebase (replacing branch notes with new IDs on top of main).",
    "For the undo cards, one group performs a revert by adding a new note, while another performs a reset --hard by removing notes; the class notes which students holding 'clones' are now out of sync.",
    "Each group writes the exact Git command for every move it made next to the board.",
    "Finish with a pull request role-play: one student pushes a branch, two review it and approve or request changes before it is merged."
   ]
  },
  "discussion": [
   "Why might a team enforce branch protection that requires reviews and passing checks before merging to main?",
   "If a secret is committed and pushed, why is deleting it in a new commit not enough, and what should happen instead?"
  ],
  "exit": [
   [
    "Write the commands to stage the file chrony.conf and commit it with the message 'Use internal NTP'.",
    "git add chrony.conf then git commit -m 'Use internal NTP'."
   ],
   [
    "When is git rebase safe to use?",
    "On local commits that have not been pushed or shared, because it rewrites history with new commit IDs."
   ],
   [
    "A commit on main broke production. Which command undoes it safely, and why?",
    "git revert <commit>, because it adds a new commit that reverses the change without rewriting shared history."
   ]
  ],
  "differentiation": [
   "Support: Provide a command card grouped into 'adds to history' (commit, merge, revert) and 'rewrites history' (rebase, reset), with a one-line example for each, and let students keep it during the activity.",
   "Extend: Ask fast finishers to explain the difference between reset --soft, --mixed and --hard by acting each out on the board, and to describe how they would resolve a conflict during a rebase."
  ]
 },
 {
  "t": "Ansible: inventory, ad hoc commands, playbooks, idempotence, roles, ansible-vault",
  "objectives": [
   "Students will be able to read an inventory file and write host patterns that select groups, intersections and exclusions.",
   "Students will be able to compare ad hoc commands with playbooks and choose the right one for a task.",
   "Students will be able to explain idempotence and identify which tasks and modules are or are not idempotent.",
   "Students will be able to describe the purpose of handlers, roles and ansible-vault."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list students' concerns about editing 60 servers by hand on the board."
   ],
   [
    12,
    "Teach",
    "Show the INI inventory on the projector and host patterns, then ad hoc commands, then a short playbook with a template task and handler. Explain idempotence using ok versus changed output, then roles and vault."
   ],
   [
    18,
    "Activity",
    "Run Playbook Detective in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share which task they flagged as non-idempotent and how they fixed it. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You have to make the same configuration change on 60 servers by Monday. What could go wrong if you do it by hand, one server at a time?",
  "activity": {
   "title": "Playbook Detective",
   "materials": "Printed inventory file, printed 25-line playbook with planted issues, printed first-run and second-run output recaps, highlighters, student laptops with a browser for module documentation.",
   "steps": [
    "Pairs read the printed inventory and write host patterns for three requests: all web servers, hosts in both web and prod, and every host except the database group.",
    "Pairs read the playbook and highlight problems: a shell task that restarts nginx every run, a task needing root without become, a plain-text password variable and a command task without creates.",
    "For each problem, pairs write the fix: a handler with notify, -b or become: true, an ansible-vault encrypted variable, and a creates guard or a purpose-built module.",
    "Pairs compare the printed first-run and second-run recaps and explain which tasks show changed on the second run and why that proves the playbook is not yet idempotent.",
    "Pairs sketch the role directory layout the fixed playbook would move into."
   ]
  },
  "discussion": [
   "Why is it valuable that a second run of a playbook reports only ok, and how could a team use that on a schedule?",
   "What are the tradeoffs of an agentless tool like Ansible compared with a tool that keeps an agent running on every server?"
  ],
  "exit": [
   [
    "Write a host pattern that targets every host in the inventory except the db group.",
    "all:!db."
   ],
   [
    "What is a handler, and when does it run?",
    "A task that runs only when notified by a task that made a change, typically to restart or reload a service, once at the end of the play."
   ],
   [
    "Which command encrypts an existing file of variables so it can be stored in Git?",
    "ansible-vault encrypt <file>."
   ]
  ],
  "differentiation": [
   "Support: Provide a vocabulary card set (inventory, module, task, play, playbook, handler, role, vault) with definitions on the back, and have students match each to a highlighted line in the printed playbook before the main activity.",
   "Extend: Ask fast finishers to rewrite the playbook's sshd task using the template module with a validate parameter and a handler, and to explain how --check --diff --limit would be used before the real run."
  ]
 },
 {
  "t": "Puppet and other agent-based tools; OpenTofu/Terraform plan and apply",
  "objectives": [
   "Students will be able to explain the Puppet agent run cycle, including facts, Facter, catalogs and the default check-in interval.",
   "Students will be able to compare agent-based pull tools with agentless push tools such as Ansible.",
   "Students will be able to sequence the OpenTofu/Terraform workflow (init, validate, plan, apply, destroy) and interpret plan symbols.",
   "Students will be able to explain the purpose and protection of the state file and how drift is detected."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into 'building' and 'maintaining' columns on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw the Puppet agent cycle as a loop (facts up, catalog down, enforce, report). Contrast with Ansible push. Then walk through the OpenTofu workflow with the I Plan Ahead memory aid and project a sample plan output, explaining +, ~ and -. Close with state and drift."
   ],
   [
    18,
    "Activity",
    "Run Review the Plan in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups report what they would approve or reject. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Which is a different job: building a new server, or making sure an existing server keeps the right settings? Which tools have you heard of for each?",
  "activity": {
   "title": "Review the Plan",
   "materials": "Printed sample plan outputs (three versions with different add, change and destroy counts), printed pull request descriptions, printed Puppet run report excerpts, red and green pens.",
   "steps": [
    "Each group receives a pull request description and the matching plan output. Groups circle every +, ~ and - line and check whether each matches the description.",
    "Groups decide approve or reject and write one sentence of justification, naming any destroy line that should not be there and a likely cause such as a rename.",
    "Groups then read a Puppet run report excerpt showing a file restored after a manual edit and label the facts, catalog and enforcement steps.",
    "Groups sort a set of statement cards into Puppet, Ansible or OpenTofu/Terraform columns, such as 'agent pulls every 30 minutes', 'agentless over SSH' and 'state file with locking'.",
    "Groups swap their approve or reject decision with another group and defend it in two minutes."
   ]
  },
  "discussion": [
   "Why might a team use both OpenTofu and Ansible or Puppet in the same pipeline instead of choosing just one?",
   "What could go wrong if two engineers ran apply at the same time against the same state without locking?"
  ],
  "exit": [
   [
    "Put these in order: apply, init, plan.",
    "init, plan, apply."
   ],
   [
    "In a plan output, what does a line marked with a minus sign mean?",
    "That resource will be destroyed."
   ],
   [
    "How does a Puppet node learn its desired state?",
    "The agent sends facts gathered by Facter to the Puppet server, which compiles a catalog and sends it back for the agent to enforce."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column comparison chart (Puppet versus Ansible) and a workflow strip for OpenTofu with blank boxes to fill in during the teaching segment.",
   "Extend: Ask fast finishers to explain how a saved plan file (plan -out followed by apply with that file) improves change control, and how a moved block avoids destroying a renamed resource."
  ]
 },
 {
  "t": "CI/CD pipelines and GitOps concepts",
  "objectives": [
   "Students will be able to explain continuous integration and distinguish continuous delivery from continuous deployment.",
   "Students will be able to describe pipeline building blocks: stages, jobs, runners, triggers, artifacts and secret storage.",
   "Students will be able to compare rolling, blue-green and canary deployment strategies.",
   "Students will be able to explain how GitOps uses Git as the source of truth and a reconciling agent, and how rollback works."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario and ask students whether the agent that undid the fix is a bug or a feature."
   ],
   [
    12,
    "Teach",
    "Draw a pipeline on the whiteboard from commit to production with stages, jobs, runners and artifacts. Mark where the delivery gate sits and remove it to show deployment. Sketch rolling, blue-green and canary. Finish with the GitOps reconcile loop."
   ],
   [
    18,
    "Activity",
    "Run Build the Pipeline with sticky notes in groups of four."
   ],
   [
    5,
    "Discuss",
    "Groups compare pipelines and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "An engineer fixes a problem directly on a production cluster, and an automated system puts it back the way it was 20 minutes later. Is that system broken, or is it doing its job?",
  "activity": {
   "title": "Build the Pipeline",
   "materials": "Sticky notes in three colors, whiteboard or chart paper per group, printed scenario cards describing a team and its requirements, markers.",
   "steps": [
    "Each group draws a scenario card, such as 'Ansible repository, must lint every change, production needs manager approval' or 'Kubernetes apps, Git must be the source of truth'.",
    "Groups lay out stages and jobs left to right using sticky notes (one color for stages, one for jobs, one for gates and secrets), naming triggers and the artifact passed between stages.",
    "Groups mark whether their scenario calls for continuous delivery or deployment and place an approval gate only if needed.",
    "Groups choose and justify a deployment strategy (rolling, blue-green or canary) for their production stage.",
    "Groups with a GitOps card add the reconciling agent and draw the arrow showing the cluster pulling from Git, then explain how they would roll back."
   ]
  },
  "discussion": [
   "What does a team gain and lose by enforcing that nobody edits production by hand?",
   "Why should pipeline runners have only the permissions they need, and what could happen if a runner were compromised?"
  ],
  "exit": [
   [
    "Which practice automatically builds and tests every change merged to a shared branch?",
    "Continuous integration."
   ],
   [
    "Name the deployment strategy that switches all traffic between two identical environments.",
    "Blue-green deployment."
   ],
   [
    "In a GitOps workflow, how do you roll back a bad release?",
    "Revert the commit in Git; the reconciling agent applies the previous state to the live system."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled pipeline diagram template with blank boxes for stage, job, runner, artifact and gate, plus a definition card for each strategy.",
   "Extend: Ask fast finishers to add security checks to their pipeline (secret scanning, vulnerability scanning, least-privilege runner) and explain where each belongs and why."
  ]
 },
 {
  "t": "Responsible use of AI tools for scripting: review, testing, keeping secrets out of prompts",
  "objectives": [
   "Students will be able to explain why the administrator remains accountable for AI-generated code and describe common hallucination risks.",
   "Students will be able to apply a review and testing checklist (line-by-line review, linting, dry runs, lab testing, pull request review) to AI-generated scripts.",
   "Students will be able to identify sensitive data in a prompt and sanitize it with placeholders.",
   "Students will be able to describe the role of an acceptable use policy and safe secret handling in generated code."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick poll: who would run the script as is, who would test first, who would not use AI at all."
   ],
   [
    12,
    "Teach",
    "Cover accountability and hallucination, including invented package names. Walk through the review list of dangerous commands, the testing ladder (bash -n, ShellCheck, lab VM, pull request), then sanitization with a before and after example and the role of an acceptable use policy."
   ],
   [
    18,
    "Activity",
    "Run Sanitize and Review in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share the most dangerous item they found. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "An AI assistant hands you a 20-line cleanup script with a clear explanation. Your manager wants it run on the file server now. What would you check first?",
  "activity": {
   "title": "Sanitize and Review",
   "materials": "Printed draft prompts containing fake secrets and internal details (clearly marked as fictional), printed AI-generated script excerpts with planted problems, highlighters, sticky notes.",
   "steps": [
    "Pairs receive a draft prompt that includes a fake password, a fake API token, internal hostnames and a customer name. They highlight every sensitive item and rewrite the prompt with placeholders such as <API_TOKEN> and example.internal.",
    "Pairs then receive a generated script excerpt with planted problems: an unquoted variable in rm -rf, no check for an empty value, a nonexistent command option, a curl piped into bash and a hard-coded token.",
    "Pairs mark each problem on a sticky note and write the fix or the verification step, such as checking the man page or confirming a package in trusted repositories.",
    "Pairs write a five-step test plan for the fixed script, from bash -n and ShellCheck through a lab VM run with dummy data to pull request review.",
    "Pairs swap their sanitized prompt with another pair, who tries to find anything sensitive that was missed."
   ]
  },
  "discussion": [
   "Should teams record when an AI tool helped write code, and what would that information be useful for?",
   "How can AI assistants help you learn Linux faster without making you dependent on unverified answers?"
  ],
  "exit": [
   [
    "Rewrite this prompt fragment safely: 'curl -H \"Authorization: Bearer 9f8e7d...\" api.corp-internal.lan/users fails with 403'.",
    "Replace the token and hostname with placeholders, for example 'curl -H \"Authorization: Bearer <API_TOKEN>\" example.internal/users fails with 403'."
   ],
   [
    "List three checks to run before using an AI-generated Bash script in production.",
    "Any three of: line-by-line review, bash -n, ShellCheck, a test run in a lab VM with sample data, a dry-run mode, and pull request review through CI."
   ],
   [
    "An assistant suggests installing a package you cannot find in your distribution's repositories. What should you do?",
    "Do not install it; verify whether it exists in trusted repositories or the official index, because it may be a hallucinated name that an attacker could register."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist card with two sections, 'Before you prompt' (remove secrets, replace hostnames, use the approved tool) and 'Before you run' (read, lint, test in a lab, review), for students to follow during the activity.",
   "Extend: Ask fast finishers to add a --dry-run option and input validation to the fixed script, and to draft three rules for a team acceptable use policy on AI tools."
  ]
 },
 {
  "t": "Storage issues: full disks, inode exhaustion (df -i), deleted-but-open files (lsof +L1), fsck/xfs_repair",
  "objectives": [
   "Students will be able to distinguish a full filesystem, inode exhaustion and deleted-but-open files using df -h, df -i, du and lsof +L1.",
   "Students will be able to explain why df and du can disagree and how to release space held by a deleted file.",
   "Students will be able to choose the correct repair tool (fsck/e2fsck, xfs_repair, btrfs) and state that it runs on an unmounted filesystem.",
   "Students will be able to apply a safe cleanup plan that also fixes whatever filled the disk."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the error 'No space left on device' next to a df -h output showing 40 percent used. Ask pairs to list every reason they can think of for the contradiction."
   ],
   [
    15,
    "Teach",
    "Walk through the four causes in order: full blocks, inode exhaustion, deleted-but-open files, corruption. Show sample df -h, df -i and lsof +L1 output on the projector and point to the exact column that reveals each cause. Finish with the fsck versus xfs_repair rule and why the filesystem must be unmounted."
   ],
   [
    15,
    "Activity",
    "Run the 'Disk Detective' card activity described below."
   ],
   [
    5,
    "Discuss",
    "Ask groups which clue was most misleading and how they would prevent each incident with monitoring or logrotate."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "A server says 'No space left on device', but df -h shows the filesystem only 40 percent full. How many possible explanations can you name?",
  "activity": {
   "title": "Disk Detective",
   "materials": "Printed case cards (one incident per card with short df -h, df -i, du and lsof +L1 excerpts), whiteboard, markers.",
   "steps": [
    "Split the class into groups of three and give each group four case cards: a full /var from logs, inode exhaustion from session files, a deleted 20 GB log still held open, and an XFS volume with a dirty log after a crash.",
    "For each card, groups circle the line of output that proves the cause and write the next command they would run.",
    "Groups then write the fix and one prevention step (logrotate rule, cleanup job, monitoring on IUse%, UPS or disk health checks).",
    "Each group presents one card at the whiteboard while the others check whether the tool choice and order are safe."
   ]
  },
  "discussion": [
   "Why might a team prefer truncating a log through /proc over restarting a busy service, and what are the risks of doing so?",
   "How would you design monitoring so that inode exhaustion is caught before users notice?"
  ],
  "exit": [
   [
    "Which command confirms inode exhaustion?",
    "df -i, looking for 100 percent in the IUse% column."
   ],
   [
    "df shows / full but du adds up to far less. What command finds the cause?",
    "lsof +L1, which lists deleted files still held open; restart or signal the owning process to free the space."
   ],
   [
    "Which tool repairs XFS and what state must the filesystem be in?",
    "xfs_repair, on an unmounted filesystem."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page flowchart (writes fail, then df -h, then df -i, then compare du, then lsof +L1) to follow while working the cards.",
   "Extend: Ask fast finishers to explain how ext4 reserved blocks let root write when users cannot, and when tune2fs -m might be adjusted."
  ]
 },
 {
  "t": "Performance: load average, top/htop, vmstat, iostat, sar, free, OOM killer",
  "objectives": [
   "Students will be able to interpret load average relative to core count and explain why I/O waits raise load on Linux.",
   "Students will be able to read top, free, vmstat and iostat output to identify a CPU, memory or storage bottleneck.",
   "Students will be able to choose sar for historical analysis and locate OOM killer evidence in the kernel log.",
   "Students will be able to recommend an appropriate fix such as rescheduling I/O, renice, cgroup limits or adding memory."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show 'load average: 9.02, 7.80, 4.11' with no other context. Ask: is this server in trouble? Collect answers and note how many asked for the core count."
   ],
   [
    15,
    "Teach",
    "Explain load average, the top CPU fields (us, sy, ni, id, wa, st), the free columns with emphasis on available, vmstat r/b/si/so, iostat await and %util, sar history and the OOM killer. Show one real-looking output for each on the projector."
   ],
   [
    15,
    "Activity",
    "Run 'Name the Bottleneck' in pairs, as described below."
   ],
   [
    5,
    "Discuss",
    "Pairs share the snapshot they disagreed about most and how they resolved it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "A server shows a load average of 9. Is that bad? What one piece of information do you need before answering?",
  "activity": {
   "title": "Name the Bottleneck",
   "materials": "Printed snapshot cards with short top, free, vmstat and iostat excerpts (teacher-made), whiteboard with four columns labeled CPU, Memory, Storage, Hypervisor.",
   "steps": [
    "Give each pair six snapshot cards, each describing a slow server with tool output.",
    "Pairs decide the bottleneck for each card and tape or write it under the correct whiteboard column, noting the single number that convinced them.",
    "For each card, pairs write the next command they would run (iotop, ps sorted by memory, sar -d, dmesg) and one fix.",
    "The teacher reviews the board, asking the class to challenge any card placed in the wrong column."
   ]
  },
  "discussion": [
   "Why might a team set OOMScoreAdjust= on a database but not on a batch job?",
   "What would you need to have set up last month to answer 'why was the server slow at 3 a.m. yesterday'?"
  ],
  "exit": [
   [
    "On a 4-core server, top shows load 10, us 15 percent and wa 70 percent. What is the bottleneck?",
    "Storage I/O; processes are waiting on disk, so check iostat -xz and iotop."
   ],
   [
    "Which free column shows memory that applications can still use?",
    "available."
   ],
   [
    "Where do you confirm the OOM killer ended a process?",
    "In the kernel log with dmesg or journalctl -k, looking for 'Out of memory: Killed process'."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing what each field (us, wa, st, r, b, si, so, await, %util) means, and let students highlight the matching numbers on each snapshot.",
   "Extend: Have students explain how they would protect sshd from the OOM killer and limit a runaway service with a systemd drop-in using OOMScoreAdjust= and MemoryMax=."
  ]
 },
 {
  "t": "Networking: ping, ip route, ss, dig/resolvectl, traceroute/tracepath/mtr, tcpdump, nmap",
  "objectives": [
   "Students will be able to sequence network troubleshooting from link and address through gateway, routing, DNS and service port.",
   "Students will be able to select the correct tool (ip, ping, dig/resolvectl, traceroute/tracepath/mtr, ss, tcpdump, nmap) for a given question.",
   "Students will be able to interpret ss output to spot loopback-only binds and nmap results to distinguish closed from filtered.",
   "Students will be able to explain the ethical requirement to scan only authorized systems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: 'ping to 8.8.8.8 works but ping to example.com fails. Where would you look?' Take three answers."
   ],
   [
    12,
    "Teach",
    "Draw the bottom-up ladder on the whiteboard and attach each tool to its rung. Show example output for ip route, dig, ss -tulpn and an nmap result with open, closed and filtered ports."
   ],
   [
    18,
    "Activity",
    "Run the 'Ladder Relay' troubleshooting role-play described below."
   ],
   [
    5,
    "Discuss",
    "Debrief which rung each scenario failed on and which wrong guesses the class made first."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on index cards."
   ]
  ],
  "warmup": "ping 8.8.8.8 succeeds but ping example.com fails. Which layer of the problem do you investigate first, and why?",
  "activity": {
   "title": "Ladder Relay",
   "materials": "Whiteboard with the troubleshooting ladder drawn, printed scenario envelopes, each containing output strips for ip a, ip route, ping, dig, ss and nmap (teacher-made).",
   "steps": [
    "Form teams of four. One student is the 'user' who holds the scenario card describing the symptom, and the others are admins.",
    "Admins may request one tool at a time; the user hands over only that tool's output strip from the envelope.",
    "Teams must name the failing rung and the fix using as few tool requests as possible, recording each request in order.",
    "Teams compare their sequences; the teacher awards a point for the shortest correct path and discusses any unsafe or unauthorized steps such as scanning networks without permission."
   ]
  },
  "discussion": [
   "Why is ss -tulpn on the server often more decisive than any test from the client?",
   "When would you save a tcpdump capture to a file rather than read it live?"
  ],
  "exit": [
   [
    "Which command shows the default gateway?",
    "ip route, looking for the default via line."
   ],
   [
    "ss shows a service on 127.0.0.1:5000. Can remote clients reach it?",
    "No; it accepts only local connections. It must bind to a routable address or 0.0.0.0."
   ],
   [
    "Which tool best shows intermittent loss at a specific hop?",
    "mtr."
   ]
  ],
  "differentiation": [
   "Support: Give students a laminated ladder card with each rung, its question and its tool, so they can point to the next step during the relay.",
   "Extend: Ask fast finishers to write tcpdump filters for DNS traffic to one server and for SYN packets to port 443, and to explain what a run of unanswered SYNs implies."
  ]
 },
 {
  "t": "Boot problems: GRUB menu, previous kernels, emergency and rescue targets, fstab errors",
  "objectives": [
   "Students will be able to map a boot failure message to its stage: firmware, boot loader, kernel and initramfs, or systemd and mounts.",
   "Students will be able to boot into rescue.target or emergency.target from the GRUB menu and explain the difference.",
   "Students will be able to recover from an fstab error by remounting root read-write, correcting the entry and testing with findmnt --verify and mount -a.",
   "Students will be able to choose between booting a previous kernel, rebuilding an initramfs and reinstalling GRUB."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project four boot messages and ask students to guess which one they would least like to see at 3 a.m., and why."
   ],
   [
    15,
    "Teach",
    "Draw the four boot stages left to right. Under each, list typical messages and the recovery tool. Demonstrate the GRUB edit sequence (e, edit the linux line, Ctrl+X) with screenshots, then walk through the fstab recovery commands."
   ],
   [
    15,
    "Activity",
    "Groups complete the 'Boot Triage Board' sort described below."
   ],
   [
    5,
    "Discuss",
    "Ask which prevention steps (nofail, keeping old kernels, GRUB password, testing mount -a) would have avoided each failure."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on paper."
   ]
  ],
  "warmup": "Your server stops at a screen that says 'Give root password for maintenance'. What do you think happened, and what is the first command you would run after logging in?",
  "activity": {
   "title": "Boot Triage Board",
   "materials": "Whiteboard divided into four columns (Firmware, Boot loader, Kernel/initramfs, systemd/mounts), printed message cards and fix cards (teacher-made), tape or magnets.",
   "steps": [
    "Give each group a stack of message cards such as 'no bootable device', 'grub rescue>', 'Kernel panic - not syncing: VFS: Unable to mount root fs' and 'You are in emergency mode'.",
    "Groups place each message under the correct boot stage column.",
    "Groups then match a fix card to each message (chroot and grub-install, previous kernel or dracut, remount rw and edit fstab) and put the fix steps in the correct order.",
    "The teacher reviews the board, asking one group per column to justify their placement and order."
   ]
  },
  "discussion": [
   "Why do distributions keep several kernels installed, and what would you lose by removing old ones immediately?",
   "What are the security implications of anyone at the console being able to edit GRUB entries?"
  ],
  "exit": [
   [
    "What do you add to the GRUB linux line to boot once into rescue mode?",
    "systemd.unit=rescue.target."
   ],
   [
    "In emergency mode, which command makes the root filesystem writable?",
    "mount -o remount,rw /."
   ],
   [
    "A new kernel panics but the old one works. What is the quickest recovery?",
    "Select the previous kernel from the GRUB menu, then fix or remove the new kernel."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed checklist for fstab recovery (journalctl -xb, remount rw, blkid, edit, findmnt --verify, mount -a, reboot) that students tick off while sorting.",
   "Extend: Ask fast finishers to describe how they would repair a system with a damaged boot loader using rescue media, chroot and the regenerate command for both BIOS and UEFI systems."
  ]
 },
 {
  "t": "Service failures: systemctl status exit codes, journalctl, dependencies, port conflicts",
  "objectives": [
   "Students will be able to read systemctl status output and distinguish systemd-generated 200-range exit codes from application exit codes.",
   "Students will be able to use journalctl -u, application config tests and systemctl cat to locate the cause of a failure.",
   "Students will be able to explain Requires=, Wants=, After= and Before= and when daemon-reload and reset-failed are needed.",
   "Students will be able to diagnose a port conflict with ss or lsof and tell it apart from an SELinux port denial."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a systemctl status block with 'status=203/EXEC' and ask students to underline every clue they can find."
   ],
   [
    15,
    "Teach",
    "Explain the troubleshooting routine (status, logs, config test, dependencies, ports, permissions). Decode the Active line, Result values and common 200-range codes. Contrast dependency directives on the whiteboard and show the daemon-reload and reset-failed steps."
   ],
   [
    15,
    "Activity",
    "Pairs work through 'Status Screen Clinic' as described below."
   ],
   [
    5,
    "Discuss",
    "Pairs share which case was hardest and which single line of output solved it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "A service fails with status=203/EXEC. Before you look anything up, what do you guess went wrong: the program's code, or how systemd tried to launch it?",
  "activity": {
   "title": "Status Screen Clinic",
   "materials": "Printed case sheets, each with a systemctl status excerpt and a short journalctl excerpt (teacher-made); projector for review.",
   "steps": [
    "Give each pair five cases: 203/EXEC from a renamed binary, 217/USER, Address already in use, an SELinux bind denial on a custom port, and start-limit-hit after repeated crashes.",
    "Pairs highlight the decisive line and write a diagnosis in one sentence.",
    "Pairs write the exact fix commands in order, including daemon-reload or reset-failed where needed.",
    "The teacher projects each case and asks a different pair to present, while others check for missing steps."
   ]
  },
  "discussion": [
   "Why is restarting a failed service repeatedly without reading logs risky as well as slow?",
   "When would you choose Wants= over Requires= for a dependency?"
  ],
  "exit": [
   [
    "Which command shows a unit's journal messages since the current boot?",
    "journalctl -u name -b."
   ],
   [
    "A unit file was edited but systemd still uses old settings. What command is missing?",
    "systemctl daemon-reload."
   ],
   [
    "An error says 'Address already in use' on port 80. How do you find the process holding it?",
    "ss -tlpn | grep :80 or lsof -i :80."
   ]
  ],
  "differentiation": [
   "Support: Provide a decoder card listing the common systemd results and 200-range exit codes with one-line meanings.",
   "Extend: Ask fast finishers to write a drop-in that makes a service wait for network-online.target and restart on failure with a five-second delay, and explain each line."
  ]
 },
 {
  "t": "Security issues: SELinux denials, file permissions, SSH key permissions, locked accounts",
  "objectives": [
   "Students will be able to identify whether SELinux, file permissions, SSH key permissions or account status is causing an access failure.",
   "Students will be able to read an AVC denial and choose restorecon, semanage fcontext, semanage port or setsebool as the fix.",
   "Students will be able to state the required permissions for a home directory, ~/.ssh, authorized_keys and a private key.",
   "Students will be able to check account lockout and expiry with faillock, passwd -S and chage -l."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: 'A colleague fixes a 403 error with setenforce 0 and chmod -R 777. What did they break?' Collect answers on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Present the four controls. Decode an AVC record field by field, show namei -l for path permissions, list the SSH permission rules, and show sample faillock, passwd -S and chage -l output."
   ],
   [
    15,
    "Activity",
    "Groups run 'Which Lock Is Closed' as described below."
   ],
   [
    5,
    "Discuss",
    "Groups explain one case where the tempting fix would have created a vulnerability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on sticky notes."
   ]
  ],
  "warmup": "A colleague fixed a 403 error by running setenforce 0 and chmod -R 777 on the web root. The site works now. What did they break?",
  "activity": {
   "title": "Which Lock Is Closed",
   "materials": "Printed ticket cards with log excerpts (AVC lines, sshd 'bad ownership or modes' lines, faillock and chage output, namei -l output), four labeled envelopes or whiteboard zones: SELinux, Permissions, SSH, Account.",
   "steps": [
    "Give each group eight ticket cards describing user complaints with supporting output.",
    "Groups sort each card into the zone for the control that is blocking access.",
    "For each card, groups write the minimal fix command and one 'tempting but wrong' fix they rejected.",
    "The teacher reviews by reading a card aloud and asking a group to defend its zone and fix; the class votes on whether the fix is minimal."
   ]
  },
  "discussion": [
   "Why might unlocking an account immediately after many failed logins be a bad idea?",
   "What makes semanage plus restorecon more durable than chcon in a team environment?"
  ],
  "exit": [
   [
    "Which command shows recent SELinux denials?",
    "ausearch -m avc -ts recent (or sealert or journalctl -t setroubleshoot)."
   ],
   [
    "What permissions should ~/.ssh and authorized_keys have?",
    "700 for ~/.ssh and 600 for authorized_keys, owned by the user."
   ],
   [
    "Name a command that shows whether an account's password is locked.",
    "passwd -S <name> (or faillock --user <name> for failed-login lockouts)."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision tree that starts with getenforce and ausearch, then checks namei -l, then SSH logs, then account status.",
   "Extend: Ask fast finishers to write the semanage fcontext and restorecon commands for serving web content from /srv/site and to explain why the regular expression (/.*)? is needed."
  ]
 },
 {
  "t": "Hardware: dmesg, lspci, lsusb, smartctl, failing disks and RAID degradation",
  "objectives": [
   "Students will be able to use dmesg and journalctl -k to find hardware errors such as I/O errors and device resets.",
   "Students will be able to identify devices and their drivers with lspci -k and lsusb.",
   "Students will be able to interpret smartctl -H and -a output, including why trends matter more than a PASSED verdict.",
   "Students will be able to recognize a degraded array in /proc/mdstat and order the mdadm steps to replace a failed member."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a slide with three symptoms (random crashes, slow saves, filesystem errors) and ask whether each is more likely hardware or software, and what evidence would decide it."
   ],
   [
    15,
    "Teach",
    "Demonstrate dmesg -T and its error patterns, lspci -k and lsusb, then SMART attributes worth watching. Finish with /proc/mdstat states and the replacement sequence on the whiteboard."
   ],
   [
    15,
    "Activity",
    "Groups complete 'Failing Disk Runbook' as described below."
   ],
   [
    5,
    "Discuss",
    "Ask why alerts matter and what would have happened if the second disk had failed during the rebuild."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on index cards."
   ]
  ],
  "warmup": "A server has random filesystem errors. Before running any repair tool, what evidence would convince you it is a hardware problem?",
  "activity": {
   "title": "Failing Disk Runbook",
   "materials": "Printed evidence packets (dmesg excerpt with ATA errors, smartctl -a excerpt with rising pending sectors, /proc/mdstat showing [U_], mdadm --detail output), shuffled step cards for disk replacement, whiteboard.",
   "steps": [
    "Groups read the evidence packet and write a one-sentence diagnosis naming the failing disk and how they know.",
    "Groups put the shuffled step cards in the correct order: confirm backup, identify physical disk by serial, fail and remove, replace, copy partition table, add, monitor rebuild.",
    "Each group adds one prevention step to the runbook, such as enabling smartd or mdmonitor alerts.",
    "Groups swap runbooks and check another group's order, marking any step that could cause data loss."
   ]
  },
  "discussion": [
   "Why is a rebuild a risky time for the remaining disks, and how does that affect when you schedule it?",
   "What is the difference between RAID and backup, and which failures does each protect against?"
  ],
  "exit": [
   [
    "Which command shows the kernel driver used by each PCI device?",
    "lspci -k."
   ],
   [
    "What does [U_] in /proc/mdstat mean?",
    "The array is degraded; one member is working and one is missing or failed."
   ],
   [
    "Which command gives a quick overall SMART health verdict?",
    "smartctl -H /dev/<disk>."
   ]
  ],
  "differentiation": [
   "Support: Provide an annotated example of smartctl -a output with the key attributes highlighted and explained.",
   "Extend: Ask fast finishers to compare how many disk failures RAID 1, 5, 6 and 10 can survive and recommend a level for a file server with four disks."
  ]
 },
 {
  "t": "Time sync: chrony, timedatectl, clock skew effects on TLS and Kerberos",
  "objectives": [
   "Students will be able to check and configure time synchronization with timedatectl and chrony.",
   "Students will be able to interpret chronyc sources and chronyc tracking output to confirm a selected source and offset.",
   "Students will be able to explain how clock skew breaks TLS certificate validation, Kerberos authentication and TOTP codes.",
   "Students will be able to troubleshoot NTP failures, including firewall rules for UDP 123."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask everyone to compare their phone, laptop and the classroom clock. Discuss why they might differ and which one they would trust."
   ],
   [
    12,
    "Teach",
    "Explain system clock versus RTC, timedatectl fields, chrony.conf lines (server, pool, iburst, makestep, allow) and chronyc output symbols. Then explain skew effects on TLS, Kerberos and TOTP."
   ],
   [
    18,
    "Activity",
    "Groups play 'Clock Detective' as described below."
   ],
   [
    5,
    "Discuss",
    "Ask which symptom would most likely send an admin down the wrong path and how to avoid that."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions in writing."
   ]
  ],
  "warmup": "Your phone, your laptop and the classroom clock probably show slightly different times. Which one would you trust, and why does it matter to a server?",
  "activity": {
   "title": "Clock Detective",
   "materials": "Printed symptom cards (Kerberos 'Clock skew too great', 'certificate not yet valid', rejected MFA codes, out-of-order logs), printed timedatectl and chronyc outputs, whiteboard.",
   "steps": [
    "Give each group a set of symptom cards and the matching timedatectl and chronyc sources outputs for each affected machine.",
    "Groups decide which symptoms are caused by clock skew and explain the mechanism for each in one sentence.",
    "Groups read the chronyc output to find why synchronization failed (blocked UDP 123, unreachable servers, two time services) and write the fix commands.",
    "Each group presents one case; the class checks the explanation and the verification step (chronyc sources showing ^*, chronyc tracking offset)."
   ]
  },
  "discussion": [
   "Why does Kerberos deliberately reject requests with large clock differences?",
   "How could inaccurate clocks hurt a security investigation that relies on logs from many systems?"
  ],
  "exit": [
   [
    "Which port and protocol does NTP use?",
    "UDP port 123."
   ],
   [
    "What does ^* mean in chronyc sources?",
    "It marks the source chrony has currently selected."
   ],
   [
    "Why can a wrong clock cause a valid certificate to be rejected?",
    "Certificate validity dates are compared to the local clock, so the certificate appears expired or not yet valid."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled sample of timedatectl and chronyc sources output with each field explained in plain words.",
   "Extend: Ask fast finishers to design the chrony configuration for an isolated network with two internal time servers and explain iburst, makestep and allow."
  ]
 },
 {
  "t": "Package problems: broken dependencies, repository errors, held packages",
  "objectives": [
   "Students will be able to diagnose broken dependencies, interrupted installs, repository errors and held packages from error messages.",
   "Students will be able to apply safe repairs such as dpkg --configure -a, apt --fix-broken install, dnf history undo and rpm --rebuilddb.",
   "Students will be able to troubleshoot repository failures involving URLs, DNS, proxies, signing keys and the system clock.",
   "Students will be able to manage holds with apt-mark and dnf versionlock and explain why forcing installs or disabling gpgcheck is unsafe."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show three error messages (Could not get lock, NO_PUBKEY, kept back) and ask students to guess what each means."
   ],
   [
    15,
    "Teach",
    "Cover each problem family for both apt/dpkg and dnf/rpm, the safe fix and the unsafe shortcut. Show sample apt-cache policy, dnf history and dnf repolist output."
   ],
   [
    15,
    "Activity",
    "Pairs complete 'Safe Fix or Shortcut' as described below."
   ],
   [
    5,
    "Discuss",
    "Ask how forcing installs or disabling signature checks could create audit findings or security incidents."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on paper."
   ]
  ],
  "warmup": "You see 'Could not get lock /var/lib/dpkg/lock-frontend'. A forum says to delete the lock file. What could go wrong?",
  "activity": {
   "title": "Safe Fix or Shortcut",
   "materials": "Printed error cards for apt and dnf, printed fix cards (some safe, some unsafe shortcuts), two whiteboard columns labeled Safe and Shortcut.",
   "steps": [
    "Give each pair ten error cards and a deck of fix cards.",
    "Pairs match each error to a fix card, then place the fix under Safe or Shortcut on the whiteboard.",
    "For every Shortcut card, pairs write the safe alternative and the risk of the shortcut.",
    "The class reviews the board together, and the teacher highlights any card where both distros need different commands."
   ]
  },
  "discussion": [
   "Who should decide whether a held package can be released, and how would you record that decision?",
   "Why is mixing repositories from different releases so likely to cause dependency problems later?"
  ],
  "exit": [
   [
    "Which two commands repair an Ubuntu system after an interrupted install?",
    "dpkg --configure -a and apt --fix-broken install."
   ],
   [
    "How do you list held packages on Debian-family systems?",
    "apt-mark showhold."
   ],
   [
    "What is the correct response to a NO_PUBKEY error?",
    "Import the repository's correct signing key through the vendor's documented method and verify its fingerprint, not disable signature checks."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat sheet mapping each task to its apt/dpkg and dnf/rpm command.",
   "Extend: Ask fast finishers to explain how they would investigate a repository returning 404 for an older release and what moving to an archive mirror implies for security updates."
  ]
 },
 {
  "t": "Container problems: logs, port conflicts, image pulls, storage",
  "objectives": [
   "Students will be able to use podman ps -a, logs and inspect to determine why a container stopped, including interpreting exit code 137 and OOMKilled.",
   "Students will be able to diagnose port publishing problems, including host port conflicts, loopback binds and rootless low-port limits.",
   "Students will be able to troubleshoot image pull errors such as manifest unknown, unauthorized and short-name ambiguity.",
   "Students will be able to resolve container storage issues using system df, prune, volumes and the :Z option."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: 'A container exits with code 137. What number is 137 minus 128, and which signal is that?'"
   ],
   [
    15,
    "Teach",
    "Walk through the four failure families with example output: ps -a status, logs, inspect fields, port conflicts, pull errors and storage. Emphasize the order: state, logs, inspect, then network and storage."
   ],
   [
    15,
    "Activity",
    "Groups solve 'Container ER' cases as described below."
   ],
   [
    5,
    "Discuss",
    "Ask how these steps compare with troubleshooting a systemd service and what is different."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three questions on index cards."
   ]
  ],
  "warmup": "A container exits with code 137. What is 137 minus 128, which signal has that number, and who might have sent it?",
  "activity": {
   "title": "Container ER",
   "materials": "Printed triage cards with podman ps -a, podman logs and podman inspect excerpts and pull or run error messages (teacher-made); student laptops with a browser optional for looking up exit codes; whiteboard.",
   "steps": [
    "Give each group six patient cards: OOM kill (137), address already in use, manifest unknown, unauthorized pull, Permission denied on a bind mount, and a database losing data after updates.",
    "Groups triage each card: name the failure family, the decisive clue and the next command to run.",
    "Groups write the treatment, the exact fix command or option, and one prevention step such as pinning tags or using volumes.",
    "Groups rotate cards with a neighbor group to check treatments, then the teacher reviews the trickiest two with the whole class."
   ]
  },
  "discussion": [
   "Why is pinning an image to a tag or digest safer than using latest in production?",
   "What are the trade-offs between lowering the unprivileged port limit and publishing a high host port for rootless containers?"
  ],
  "exit": [
   [
    "What does exit code 137 usually mean for a container?",
    "It was killed with SIGKILL, often by the OOM killer or a memory limit."
   ],
   [
    "A pull fails with 'unauthorized'. What should you do?",
    "Log in to the registry with podman login and confirm you have access to the repository."
   ],
   [
    "What option fixes Permission denied on a bind mount on an SELinux host?",
    "Add :Z (or :z for shared content) to the -v option."
   ]
  ],
  "differentiation": [
   "Support: Provide a troubleshooting flowchart (ps -a, logs, inspect, then port, pull or storage branch) that students follow for each card.",
   "Extend: Ask fast finishers to explain how rootless UID mapping affects file ownership on a bind mount and how podman unshare helps fix it."
  ]
 }
]);
