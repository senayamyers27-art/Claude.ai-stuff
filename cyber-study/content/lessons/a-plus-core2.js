/* Lessons for CompTIA A+ Core 2 (220-1202): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("a-plus-core2", [
 {
  "t": "OS types and purposes: Windows, macOS, Linux, ChromeOS, iOS/iPadOS, Android; vendor life cycles and end-of-life",
  "hook": "It is Monday morning at Lakeview Family Clinic, and you are the only technician on site. The office manager, Rosa, has three requests waiting: the new receptionist wants a cheap laptop that \"just runs the browser,\" a nurse asks why her Android phone still has not received the update her friend's phone got last month, and the auditor visiting on Thursday has flagged the old PC in the back office with a note that says \"vendor support ended.\" The PC still boots and the scheduling program still opens, so Rosa asks the obvious question: if it works, why is it a problem? Before you answer, you need a clear picture of which operating system fits which job, and what a vendor's life cycle really promises.",
  "simple": "An operating system is the main program that makes a computer or phone usable. It sits between the hardware and your apps, the way a restaurant's front-of-house staff sits between the kitchen and the diners: you order through them, not by walking into the kitchen. Different devices run different operating systems. Windows is common on office PCs, macOS runs only on Apple computers, Linux runs most web servers, ChromeOS runs low-cost Chromebooks, and phones run iOS or Android. Apps are built for one system, so a program for Windows will not simply install on an iPhone. Every system also has a support period. When it ends, the device keeps working, but the maker stops sending security fixes, a bit like a car model whose parts are no longer made.",
  "body": [
   "An operating system (OS) is the software layer that sits between the hardware and the programs you run. It manages memory, schedules work on the central processing unit (CPU), talks to devices through drivers, stores files and enforces who is allowed to do what. Applications never talk to the hardware directly; they ask the OS. As a support technician you will meet several operating systems every week, and the CompTIA A+ Core 2 exam expects you to know what each one is for, who makes it, what hardware it runs on and how it is kept up to date and supported.",
   "Desktop and laptop operating systems come first. Microsoft Windows dominates business desktops because of its huge software catalog and its tight integration with Active Directory domains and Group Policy, which let an organization manage thousands of PCs centrally. Apple macOS runs only on Apple Mac hardware and is popular with creative and development teams; because Apple controls both the hardware and the software, driver problems are rare. Linux is a family of open-source distributions (Ubuntu, Fedora, Debian, Red Hat Enterprise Linux and many more) built on the Linux kernel. It runs most web servers, many network appliances and plenty of developer workstations, and it is usually free to use. ChromeOS, from Google, is a lightweight, browser-centered OS on Chromebooks. It is inexpensive to manage, keeps most data in the cloud, updates itself and is very common in schools.",
   "Mobile operating systems are the second group. Apple iOS runs on iPhone and iPadOS on iPad; both are closed ecosystems, and apps normally come only from the App Store after Apple reviews them. Google Android is based on the Linux kernel and is licensed to many phone makers, who each add their own customizations and decide how long to support each model. That diversity is why Android update timing varies by manufacturer and sometimes by carrier, while Apple ships each update to all of its supported devices at the same time. Android also allows apps from sources other than the Google Play Store, a practice called sideloading, which adds flexibility and risk in equal measure.",
   "Every vendor publishes a life cycle for its products, and this is where many real support decisions come from. During mainstream support the product receives new features, bug fixes and security patches. Some vendors then offer an extended period with security fixes only, sometimes as a paid program. At end-of-life (EOL), often called end of support, the vendor stops issuing patches entirely. The software keeps working, but every newly discovered vulnerability stays open forever, the vendor stops helping with problems, and new applications and drivers gradually stop supporting it. Compliance frameworks usually forbid running EOL software on systems that handle sensitive data, which is exactly why an auditor flags it. Mobile devices reach EOL when the vendor stops shipping OS updates to that model, which often happens while the hardware still works perfectly well.",
   "The distinctions the exam tests are mostly about fit and compatibility. Software is written for a particular OS, so a Windows application will not run natively on macOS, and an Android application package (APK) will not install on an iPhone. The right OS therefore depends on the software the user needs. Choose Windows when the user needs line-of-business Windows applications or domain management, macOS for Apple-centered creative workflows, Linux for servers and appliances, ChromeOS for low-cost, web-based fleets such as classrooms, and iOS or Android for phones and tablets.",
   "Know the update channels too, because a question may describe one and expect you to name the OS. Windows uses Windows Update. macOS uses Software Update in System Settings. Linux distributions use their package managers, such as `apt` or `dnf`. ChromeOS downloads updates automatically in the background and applies them at the next restart. Phones and tablets receive over-the-air (OTA) updates delivered wirelessly. When you check whether a device is still supported, you compare its OS version against the vendor's published life cycle, not against how well it seems to run.",
   "Consider a worked example. A clinic runs a reception PC on an OS version that has just reached end of support, and it hosts an old scheduling program that the vendor never updated. You cannot simply leave it, because new vulnerabilities will never be patched. First you check whether the scheduling vendor offers a supported version on a current OS; if so, you budget, test and schedule the migration. If the program truly cannot move, you isolate the PC on its own network segment, block internet access, restrict who can sign in, document the accepted risk and set a date to replace it. Isolation reduces the risk; it does not remove it.",
   "Several misunderstandings come up again and again. People believe EOL means the OS stops booting, when it keeps working and simply stops being patched. They assume every Android phone gets updates at the same time as Google's own devices. They think ChromeOS runs traditional Windows desktop software natively, which it does not. They forget that a phone model can reach EOL while it still looks new. Another trap is treating Linux as a single product: it is a kernel shared by many distributions, each with its own support schedule and package manager.",
   "Exam questions usually describe a need and ask which OS or action fits. \"Inexpensive devices for students that mostly use web apps\" points to ChromeOS. \"Runs only on Apple hardware\" is macOS. \"Open source, runs most web servers\" is Linux. \"Updates depend on the manufacturer and carrier\" is Android. \"The vendor no longer releases security patches\" means end-of-life, and the answer is to upgrade, replace or, if neither is possible, isolate the system and document the risk."
  ],
  "analogy": "Think of an operating system's life cycle like a car model's warranty and parts program. While the model is current, the maker fixes defects and issues recalls. Later, only safety recalls are handled. Eventually the maker stops making parts altogether. The car still drives, but the next time a dangerous flaw is found, nobody will fix it. The analogy stops working in one way: a car's flaw usually needs someone physically nearby, while an unpatched computer can be attacked by anyone on the network, which is why EOL systems must be isolated or replaced.",
  "terms": [
   [
    "Operating system (OS)",
    "The software that manages hardware resources and provides services to applications and users."
   ],
   [
    "Distribution (distro)",
    "A packaged version of Linux that combines the Linux kernel with tools, a package manager and default software."
   ],
   [
    "ChromeOS",
    "Google's lightweight, browser-centered operating system for Chromebooks that updates itself automatically."
   ],
   [
    "Sideloading",
    "Installing an app from a source other than the platform's official store, which Android allows and iOS normally does not."
   ],
   [
    "Over-the-air (OTA) update",
    "An operating system update delivered wirelessly to a mobile device."
   ],
   [
    "Life cycle",
    "The vendor's published timeline of support phases for a product, from release to retirement."
   ],
   [
    "End-of-life (EOL)",
    "The point after which a vendor stops providing patches and support for a product."
   ],
   [
    "Extended support",
    "A later support phase, sometimes paid, in which only security fixes are provided."
   ]
  ],
  "example": "A school district replaces aging Windows laptops in its classrooms with Chromebooks. Students work almost entirely in web-based office apps, the devices update themselves overnight, and teachers can wipe and reassign a lost device through the management console. The district keeps a small lab of Windows PCs for one design program that has no web version.",
  "mistakes": [
   [
    "End-of-life means the operating system will stop working on a certain date.",
    "The system keeps running after EOL. What stops is vendor support: no more security patches or fixes, so newly found vulnerabilities stay open. The right response is to upgrade, replace or isolate."
   ],
   [
    "All Android phones get a new Android version on the same day.",
    "Android is licensed to many manufacturers who customize it and decide when, or whether, to ship updates to each model, sometimes with carrier testing in between. Apple, which controls its own hardware, ships updates to all supported devices at once."
   ],
   [
    "A Chromebook can run any Windows program because it has a web browser.",
    "ChromeOS does not run traditional Windows desktop applications natively. It is the right choice when users work mainly in web apps, not when they need a Windows-only program."
   ],
   [
    "Linux is one product with one support schedule.",
    "Linux is a kernel shared by many distributions, such as Ubuntu and Red Hat Enterprise Linux, and each distribution has its own release and support schedule and its own package manager."
   ]
  ],
  "tryit": [
   [
    "Harbor Credit Union's loan office has an old PC running an OS that reached end of support last year. It runs a check-imaging program whose vendor went out of business, and no replacement is budgeted until next quarter. The branch manager asks you to \"just leave it alone until then.\" What should you do in the meantime?",
    "Do not simply leave it. Isolate the PC: place it on a restricted network segment, block internet access, limit sign-in to the few staff who need it, and turn off services it does not need. Then document the risk, get the manager to formally accept it, and record the replacement date. Isolation lowers the chance of compromise while the long-term fix, replacement, is arranged."
   ],
   [
    "A design agency hires a video editor whose main program is available only for macOS. The office standard is Windows laptops, and the purchasing manager suggests buying a powerful Windows laptop instead. What do you recommend?",
    "Recommend a Mac. Applications are written for a specific operating system, and a macOS-only program will not install natively on Windows no matter how powerful the hardware is. The software the user must run decides the OS."
   ]
  ],
  "tip": "End-of-life does not mean the OS stops working; it means no more security patches. Answers about EOL systems point to upgrading or replacing them, or isolating them if they cannot be replaced.",
  "check": [
   [
    "A user needs to run a Windows-only accounting program. Can you give them an iPad instead of a laptop?",
    "Not for native use, because applications are written for a specific OS and a Windows desktop program will not install on iPadOS."
   ],
   [
    "Why do different Android phones receive the same Android update at different times?",
    "Android is licensed to many manufacturers who customize it and decide when, or whether, to ship updates to each model, sometimes with carrier involvement."
   ],
   [
    "What changes when an OS reaches end-of-life?",
    "The vendor stops releasing patches and support, so new vulnerabilities remain unfixed even though the system still runs."
   ],
   [
    "A legacy EOL system cannot be upgraded. What is the best mitigation?",
    "Isolate it on a restricted network segment, limit who can reach it, document the accepted risk and plan its replacement."
   ],
   [
    "Which operating system is the usual fit for low-cost classroom devices that mostly use web apps?",
    "ChromeOS, because Chromebooks are inexpensive, update themselves and are easy to manage centrally."
   ]
  ]
 },
 {
  "t": "File systems: NTFS, ReFS, FAT32, exFAT, ext4, XFS, APFS and their limits",
  "hook": "A help-desk ticket lands in your queue at Brightwater Media: \"Brand-new 128 GB USB drive says file too large. It's EMPTY.\" Devon, a video editor, needs to carry a 12 GB project file home tonight, and his deadline is tomorrow morning. He has already tried two more drives from the same pack, and every one gives the same message. He is convinced the batch is faulty and wants you to order a different brand. You have a hunch the drives are fine and the real culprit is something printed nowhere on the packaging. What is actually stopping a 12 GB file from landing on an empty 128 GB drive?",
  "simple": "A file system is the way a drive keeps track of what is stored on it, like the filing method in an office cabinet: how folders are labeled, where each page goes and who is allowed to open which drawer. When you format a drive, you pick a filing method. Each one has its own rules. Some are understood by almost every device but cannot hold very big single files. Others hold huge files and can lock files to certain people, but only some computers can read them. FAT32, for example, works almost everywhere but refuses any single file larger than 4 GB. So if a large video will not copy to an empty drive, the drive is often fine; it is simply using a filing method with a size rule the video breaks.",
  "body": [
   "A file system is the set of rules an operating system uses to organize data on a storage device: how files are named, where their pieces live on the disk, what metadata (dates, owners, permissions) is kept and how free space is tracked. When you format a drive you choose a file system, and that choice decides which operating systems can read and write it, how large individual files can be and which security features, such as permissions and encryption, are available. Choosing the wrong one is behind many \"why can't I copy this file\" tickets, and the A+ exam expects you to match the file system to the job.",
   "NTFS (New Technology File System) is the standard for Windows system drives. It supports file and folder permissions, encryption with EFS (Encrypting File System), compression, disk quotas and journaling, which records pending changes so the volume can recover cleanly after a crash or power loss. Its file and volume size limits are so large that they never matter for normal work. macOS can read NTFS but cannot write to it by default, and Linux support varies by distribution, so NTFS is a poor choice for a drive that must be shared with a Mac. When you open a Windows drive's Properties and see the Security tab with user and group permissions, that is NTFS at work.",
   "ReFS (Resilient File System) is a newer Microsoft file system designed for data integrity and very large volumes. It uses checksums to detect corruption and can repair damaged data automatically when paired with Storage Spaces mirroring, which keeps more than one copy of the data across disks. It is aimed at servers, storage pools and virtual machine storage, and it lacks some NTFS features, so you do not normally install Windows onto it. Think of ReFS as the choice for resilient data storage rather than for a boot drive.",
   "The FAT family trades features for compatibility. FAT32 (File Allocation Table, 32-bit) is old, simple and readable by almost everything: Windows, macOS, Linux, cameras, game consoles and car stereos. Its famous limit is a maximum file size of 4 GB (minus one byte), and Windows's built-in formatting tools have traditionally offered FAT32 only for volumes up to 32 GB. It has no permissions and no journaling. exFAT (Extended FAT) was created for flash media: it removes the 4 GB file limit, supports very large volumes and is readable and writable by modern Windows and macOS, which makes it the usual choice for large USB drives and SD cards shared between those systems. Like FAT32, it has no permissions or journaling, so pulling the drive out mid-copy is riskier than on a journaled volume.",
   "The other operating systems have their own defaults. On Linux, ext4 (fourth extended file system) is the common default; it is journaled and supports Linux permissions and large files. XFS is a high-performance journaled file system, the default on Red Hat Enterprise Linux and its relatives, and it is well suited to large files and parallel workloads. Windows cannot read either natively. APFS (Apple File System) is the default for macOS, iOS and iPadOS. It is optimized for solid-state drives (SSDs) and supports snapshots, space sharing between volumes in one container and strong built-in encryption. Older Macs used HFS+ (Mac OS Extended). Windows cannot read APFS without third-party tools.",
   "Consider a worked example. A video editor tries to copy a 12 GB project file from a Windows PC to a brand-new 128 GB USB drive and gets \"The file is too large for the destination file system,\" even though the drive is empty. You open the drive's Properties and see File system: FAT32. Because the editor also uses a Mac at home, NTFS would be awkward, since the Mac could read but not write it. You back up anything on the drive, reformat it as exFAT, and the copy succeeds on both computers. Formatting erases the drive, so always copy data off first and confirm you have selected the right drive letter.",
   "Several mistakes repeat. People think \"file too large\" means the drive is full, when it usually means FAT32's per-file limit. They choose NTFS for a drive that a Mac must write to. They assume exFAT has permissions or journaling like NTFS, which it does not. They expect Windows to open an ext4 or APFS drive without extra software. Remember too that the 32 GB figure is a limit of Windows's formatting tools for FAT32, while the 4 GB figure is a limit of the file system itself, so a FAT32 drive formatted elsewhere can be larger than 32 GB but still cannot hold a 5 GB file.",
   "Exam questions match the file system to the job, so learn the pairs. Windows boot drive or a need for permissions and EFS: NTFS. Large-file flash drive shared between Windows and Mac: exFAT. Maximum compatibility with old devices and small files: FAT32. Linux server: ext4 or XFS. Mac or iPhone: APFS. Resilient Windows storage pool with automatic integrity checking: ReFS. Clue words such as \"journaling,\" \"permissions,\" \"checksums,\" \"snapshots\" and \"4 GB\" point straight at the answer."
  ],
  "analogy": "Picture file systems as different shipping containers at a port. FAT32 is the standard small crate every truck, ship and warehouse in the world can handle, but nothing longer than a certain size fits inside. exFAT is a bigger crate that most modern trucks accept. NTFS is a locked, insured container with a manifest and access list, but some ports cannot open it. The analogy stops working on one point: a full crate and a too-long item are different problems, and on a drive \"file too large\" is the too-long item, not a full crate.",
  "terms": [
   [
    "File system",
    "The structure an operating system uses to name, store, locate and protect files on a volume."
   ],
   [
    "NTFS",
    "The Windows default file system, with permissions, EFS encryption, compression, quotas and journaling."
   ],
   [
    "ReFS",
    "Microsoft's Resilient File System, which uses checksums and self-repair for large, integrity-focused storage."
   ],
   [
    "FAT32",
    "A widely compatible legacy file system with a 4 GB maximum file size and no permissions."
   ],
   [
    "exFAT",
    "A flash-oriented file system without FAT32's 4 GB file limit, readable and writable by Windows and macOS."
   ],
   [
    "ext4 and XFS",
    "Journaled Linux file systems; ext4 is a common default and XFS is the Red Hat default for high performance."
   ],
   [
    "APFS",
    "Apple File System, the SSD-optimized default for macOS, iOS and iPadOS with snapshots and encryption."
   ],
   [
    "Journaling",
    "Recording pending changes in a log so a file system can recover consistently after a crash."
   ]
  ],
  "example": "A photographer's camera card, formatted FAT32, stops recording long 4K video clips at the same point every time. The camera splits or stops files at 4 GB. Switching to a card formatted exFAT, which the camera supports, lets it record long single clips that her Windows laptop and Mac can both open.",
  "mistakes": [
   [
    "\"File too large for the destination\" means the drive is out of space.",
    "On a drive with plenty of free space, this message almost always means FAT32's 4 GB per-file limit. Reformat (after backing up) as exFAT for Windows and Mac sharing, or NTFS for Windows only."
   ],
   [
    "NTFS is the best choice for any external drive because it has the most features.",
    "macOS can read NTFS but cannot write to it by default. For a drive shared between Windows and Mac, exFAT is the practical choice."
   ],
   [
    "exFAT is just a newer NTFS, so it has permissions and journaling.",
    "exFAT is a FAT-family file system built for flash media. It removes the 4 GB limit but has no file permissions and no journaling."
   ],
   [
    "ReFS is the modern replacement you should install Windows onto.",
    "ReFS is designed for resilient data storage such as storage pools and virtual machine files. Windows system drives normally use NTFS."
   ]
  ],
  "tryit": [
   [
    "Tidewater Public Library wants a USB drive that librarians can plug into the Windows desktops at the front desk and into a Mac in the media lab. They will move recorded talks that are often 6 to 10 GB each. A volunteer has already formatted the drive as NTFS. What do you recommend and why?",
    "Back up the drive and reformat it as exFAT. NTFS lets the Windows PCs write, but the Mac can only read it by default, so files recorded on the Mac could not be saved to it. FAT32 would work on both but cannot hold files over 4 GB. exFAT is readable and writable on both systems and has no 4 GB file limit."
   ],
   [
    "A Linux administrator asks which file system to use for a new Red Hat Enterprise Linux data volume that will hold very large media files accessed by many processes at once. Which is the best fit?",
    "XFS, the default on Red Hat Enterprise Linux, is a high-performance journaled file system well suited to large files and parallel workloads. ext4 would also work on Linux, but XFS matches the description and the platform default."
   ]
  ],
  "tip": "\"File too large\" on a drive with plenty of free space almost always means FAT32 and its 4 GB per-file limit. Reformat as exFAT for Windows and Mac sharing, or NTFS for Windows only.",
  "check": [
   [
    "Which file system should you choose for a USB drive that must carry 10 GB files between Windows and macOS?",
    "exFAT, because it removes FAT32's 4 GB file limit and both operating systems can read and write it."
   ],
   [
    "Which Windows file system supports EFS encryption and NTFS permissions on a boot drive?",
    "NTFS, the standard Windows system drive file system."
   ],
   [
    "What is the default file system on current Macs and iPhones?",
    "APFS, the Apple File System, which is optimized for SSDs and supports snapshots and encryption."
   ],
   [
    "What feature helps a file system recover cleanly after a sudden power loss?",
    "Journaling, which logs pending changes so the volume can be brought back to a consistent state."
   ],
   [
    "Which Microsoft file system uses checksums to detect and repair corruption in storage pools?",
    "ReFS, the Resilient File System."
   ]
  ]
 },
 {
  "t": "Installations and upgrades: boot methods (USB, PXE, ISO), clean vs in-place vs image deployment vs repair install, GPT vs MBR, third-party drivers",
  "hook": "Forty boxed desktops are stacked against the wall at Northgate Insurance, and the new office opens Monday. Your manager, Priya, wants every one built with Windows, the office suite, antivirus and company settings, all identical. Meanwhile, an agent named Luis is at your desk with a laptop that keeps throwing system errors; he needs it fixed today, and he cannot lose the specialized quoting app that took IT a week to configure. Then a third problem: the new 4 TB backup disk you just installed shows only about 2 TB. Three very different jobs, one afternoon. Which installation method fits each, and how do you avoid wiping something you should have kept?",
  "simple": "Installing an operating system is a bit like moving into a home. First you need a way in: a USB stick, a disc image file or the network. Then you decide how to move in. A clean install is like emptying the house completely and starting fresh. An in-place upgrade is like renovating while your furniture stays. A repair install fixes the plumbing without touching your belongings. Image deployment is like building forty identical homes from one approved blueprint. Finally, the disk needs a layout, called a partition style. The older style, MBR, cannot use space beyond about 2 TB, while the newer style, GPT, handles much larger disks. Choosing well saves time and protects people's files.",
  "body": [
   "Installing an operating system involves three big decisions: how the computer will boot the installer, what kind of installation you will perform and how the disk will be partitioned. The A+ exam describes a situation, such as fifty new laptops, a failing Windows install or a new 4 TB disk, and asks which method fits. Getting these choices right saves hours and protects the user's data, and getting them wrong can erase a person's work in seconds.",
   "Start with getting the computer to boot the installer. The most common method is a bootable USB flash drive created from the vendor's installation media. An ISO file is a single-file image of an optical disc; you can burn it to DVD, write it to USB with a tool, mount it in Windows by double-clicking it, or attach it directly to a virtual machine. PXE (Preboot Execution Environment, pronounced \"pixie\") lets a computer boot from the network: the network card requests an address from DHCP (Dynamic Host Configuration Protocol), is pointed at a deployment server and downloads a small boot image. PXE is how organizations image dozens of machines without carrying USB sticks around, and it must be enabled in firmware. Other options include an internal recovery partition, an external drive or a network share. You select the boot device in the UEFI (Unified Extensible Firmware Interface) or BIOS (Basic Input/Output System) settings, or from a one-time boot menu offered at power-on.",
   "Next, choose the installation type, because each one treats existing data differently. A clean install wipes the target partition and installs a fresh OS; it removes old problems but also removes applications and data, so back up first. An in-place upgrade installs a newer version over the existing one and keeps files, settings and most apps; it is convenient but can carry existing problems forward. Image deployment copies a prepared, standardized image (OS plus apps plus settings) onto many machines, often over PXE or from a deployment server, which gives every user an identical, tested build. A repair install, also called an in-place repair, reinstalls the same Windows version over itself to replace damaged system files while keeping data and apps. You may also meet a recovery partition reset, a remote network installation and multiboot, where two operating systems live on separate partitions and you choose one at startup.",
   "Before installing, the disk needs a partition style. MBR (Master Boot Record) is the legacy scheme: it supports up to four primary partitions (or three plus an extended partition holding logical drives) and disks up to about 2 TB. GPT (GUID Partition Table, where GUID means globally unique identifier) is the modern scheme used with UEFI firmware. It supports far larger disks, Windows allows up to 128 partitions on it, and it stores a backup copy of the partition table at the end of the disk for resilience. Windows 11 requires UEFI with Secure Boot capability, which in practice means a GPT system disk. If a 4 TB disk shows only about 2 TB usable in Disk Management, it was initialized as MBR.",
   "Sometimes the installer cannot see the drive at all, and the screen asking where to install Windows is empty. That usually means the storage controller, for example a RAID (redundant array of independent disks) controller or certain NVMe (Non-Volatile Memory Express) controllers, needs a third-party driver that is not on the installation media. Setup offers a Load driver option so you can supply the driver from a USB stick. The same idea applies after installation: download chipset, graphics and network drivers from the manufacturer if Windows Update does not supply suitable ones.",
   "Preparation matters as much as the install itself. Before any upgrade, check hardware requirements, application compatibility, free disk space and, above all, a verified backup that you have actually tested by opening a few files. Confirm that you have license keys and any vendor installers for line-of-business applications, and note any drivers the machine uses that might not be on the new media. A few minutes of checking prevents the worst outcome in this topic, which is discovering after a clean install that nobody saved the user's data.",
   "Consider a worked example. A company receives forty identical desktops and wants each one built with Windows, the office suite, antivirus and company settings. Installing each by hand from USB would take days and produce slightly different results. Instead, the technician builds and tests one reference machine, captures it as an image, enables network boot in firmware on the new desktops and uses PXE to deploy the image to all forty. Separately, one existing laptop has corrupted system files but the user's apps must stay, so that laptop gets a repair install rather than a clean one.",
   "Some mistakes show up constantly: choosing a clean install when the user must keep files and apps, forgetting to back up before any installation, confusing an ISO (a file) with PXE (a network boot method), initializing a large disk as MBR and losing the space above 2 TB, and assuming a missing disk in setup means the disk is dead when it simply needs a storage driver. Also remember that an in-place upgrade keeps problems as well as data.",
   "Exam wording gives the answer away. \"Keep files and applications while moving to a newer version\" means in-place upgrade. \"Fix damaged system files but keep everything\" means repair install. \"Start fresh\" or \"remove all traces of the old system\" means clean install. \"Many identical machines\" means image deployment. \"Boot over the network\" or \"no USB ports available\" means PXE. \"Disk larger than 2 TB,\" \"more than four partitions\" or \"UEFI and Secure Boot\" means GPT. \"Setup does not see the drive\" means load a third-party storage driver."
  ],
  "analogy": "Choosing an installation type is like dealing with a kitchen. A clean install is a full demolition: everything goes, including the problems. An in-place upgrade is a remodel with the cupboards still full, so you keep your things and also any mice living behind them. A repair install replaces broken pipes without touching your dishes. Image deployment is a builder fitting forty identical kitchens from one tested plan. The analogy stops working with backups: in a real remodel you can see what you are throwing out, while a clean install erases data silently, so back up first.",
  "terms": [
   [
    "ISO file",
    "A single-file image of an optical disc that can be mounted, burned or written to USB."
   ],
   [
    "PXE",
    "Preboot Execution Environment, which lets a network card boot a computer from a deployment server."
   ],
   [
    "Clean install",
    "Installing a fresh OS on a wiped partition, removing previous apps, settings and data."
   ],
   [
    "In-place upgrade",
    "Installing a newer OS version over the existing one while keeping files, settings and most apps."
   ],
   [
    "Image deployment",
    "Copying a standardized, pre-built OS image to many computers."
   ],
   [
    "Repair install",
    "Reinstalling the same OS version over itself to fix system files while keeping data and apps."
   ],
   [
    "MBR",
    "Legacy partition style limited to about 2 TB disks and four primary partitions."
   ],
   [
    "GPT",
    "Modern partition style used with UEFI that supports very large disks and many partitions."
   ]
  ],
  "example": "A technician installs Windows on a workstation with a hardware RAID controller, but setup shows no drives. She downloads the controller's storage driver from the manufacturer on another PC, copies it to a USB stick, chooses Load driver in setup and browses to it. The RAID volume appears, she creates GPT partitions and the installation proceeds.",
  "mistakes": [
   [
    "A clean install is always the safest choice because it fixes everything.",
    "A clean install removes apps, settings and data. When the user must keep them, choose an in-place upgrade (moving to a newer version) or a repair install (fixing the same version)."
   ],
   [
    "ISO and PXE are two names for the same thing.",
    "An ISO is a disc image file you mount, burn or write to USB. PXE is a method of booting a computer over the network from a deployment server."
   ],
   [
    "If Windows setup shows no disks, the drive has failed.",
    "More often the storage controller (such as RAID or some NVMe controllers) needs a third-party driver. Use Load driver in setup to supply it from removable media."
   ],
   [
    "An in-place upgrade gives you a fresh, problem-free system.",
    "An in-place upgrade keeps files and apps, but it also carries existing problems forward. Only a clean install truly starts fresh."
   ]
  ],
  "tryit": [
   [
    "At Cedar Valley Dental, the front-desk PC shows frequent system file errors. It runs the current Windows version, and the practice-management software installed on it took the vendor a full day to configure. The office manager asks you to fix the errors without having the vendor come back. Which installation type do you choose?",
    "A repair install. It reinstalls the same Windows version over itself, replacing damaged system files while keeping data, settings and installed applications. A clean install would remove the practice-management software, and an in-place upgrade is for moving to a newer version, which is not what is needed. Back up first anyway."
   ],
   [
    "You install a new 6 TB data disk in a UEFI workstation. Disk Management asks you to initialize it. Which partition style do you choose and why?",
    "GPT. MBR can address only about 2 TB, so roughly two-thirds of the disk would be unusable. GPT supports much larger disks, many partitions and keeps a backup copy of the partition table."
   ]
  ],
  "tip": "Match keywords: keep files and apps means in-place upgrade or repair install; start fresh means clean install; many identical machines means image deployment; network boot means PXE; disks over 2 TB need GPT.",
  "check": [
   [
    "A user wants to move to a newer Windows version and keep all programs and files. Which installation type fits?",
    "An in-place upgrade, because it installs over the existing OS and preserves files, settings and most apps."
   ],
   [
    "A new 4 TB disk shows only about 2 TB of usable space. Why?",
    "It was initialized with MBR, which cannot address beyond about 2 TB; converting to GPT (after backing up) fixes it."
   ],
   [
    "Windows setup does not list any disks on a server with a RAID controller. What should you do?",
    "Use Load driver to supply the controller's third-party storage driver from removable media."
   ],
   [
    "Which boot method lets you image many PCs without removable media?",
    "PXE, which boots the computers from a deployment server over the network."
   ],
   [
    "Which installation type should you avoid when the user's files and applications must be kept?",
    "A clean install, because it wipes the partition and removes apps, settings and data."
   ]
  ]
 },
 {
  "t": "Windows 10/11 editions (Home, Pro, Enterprise, Education) and which features each has: BitLocker, domain join, Group Policy, Remote Desktop host",
  "hook": "Your first week at Pinecrest Accounting, and a new hire, Jordan, arrives with a laptop the office manager bought at a retail store on the way in. Your job is simple on paper: join it to the firm's domain, apply the standard policies and turn on BitLocker before Jordan touches a client file. You open the settings to join the domain and the option is simply not there. You type `gpedit.msc` in the Run box and Windows says it cannot find it. The office manager asks whether the laptop is broken and whether she should take it back. Before you answer, take a look at which edition of Windows came on the box.",
  "simple": "Windows comes in different versions called editions, a bit like a car model sold in basic and premium trims. The engine is the same, but some features only come with the higher trim. Windows Home is the basic trim for personal use. Windows Pro adds the features businesses need: joining a company network so one central account works on every PC, central settings control, full-disk encryption called BitLocker, and letting other people connect in to the PC remotely. Enterprise and Education are bigger packages for large organizations and schools. If a Home laptop is missing a business feature, you usually do not need a new laptop or a wipe; you can buy an upgrade key and switch it to Pro while keeping all the files.",
  "body": [
   "Microsoft sells Windows 10 and Windows 11 in several editions. They share the same core, but business features are switched on only in the higher editions. The A+ exam often describes a need, such as \"the laptop must join the company domain\" or \"the drive must be encrypted with BitLocker,\" and asks which edition supports it or what to do when the current edition cannot. Memorizing the dividing line between Home and Pro answers most of these questions, because that is where the business features begin.",
   "Windows Home is aimed at consumers. It cannot join an Active Directory domain, does not include the Local Group Policy Editor (`gpedit.msc`), cannot act as a Remote Desktop host (it can still connect out to other computers with the Remote Desktop client), and does not include full BitLocker management. Many Home devices offer a simpler Device encryption feature when the hardware supports it, but that is not the same as full BitLocker with its management options and BitLocker To Go for removable drives. Home is fine for personal use and typically signs in with a Microsoft account. When you see a missing domain option or a \"cannot find gpedit.msc\" message, the edition is the first thing to check.",
   "Windows Pro adds what a small business needs. It supports domain join (Active Directory and Microsoft Entra ID, formerly Azure Active Directory), Group Policy, BitLocker and BitLocker To Go, the ability to host incoming Remote Desktop connections, Hyper-V virtualization and business update management. Pro is the minimum edition for most corporate desktops. If a user on Home needs one of these features, you can upgrade the edition in place by entering a Pro product key or buying the upgrade, without reinstalling or losing data.",
   "Windows Enterprise is licensed to organizations through volume licensing or subscriptions. It includes everything in Pro plus advanced security and management features aimed at large fleets, such as additional application control, credential protection and deployment options. Windows Education is essentially Enterprise-level functionality licensed to schools and universities. For exam purposes, treat Enterprise and Education as \"everything Pro has, and more,\" and remember they are not sold as retail boxes to individual consumers.",
   "Here is the summary to memorize. BitLocker: Pro, Enterprise, Education, not Home. Domain join: Pro, Enterprise, Education, not Home. Group Policy Editor: Pro, Enterprise, Education, not Home. Remote Desktop host: Pro, Enterprise, Education, not Home. Every edition can use the Remote Desktop client to connect out to another computer. The distinction between being a Remote Desktop client and a Remote Desktop host is a favorite exam trap: Home can connect to a Pro machine, but nobody can connect in to a Home machine with Remote Desktop.",
   "Consider a worked example. A small accounting firm buys a laptop from a retail store for a new hire, and it arrives with Windows Home. When you try to join it to the firm's domain, the option is not available, and the firm's policy also requires BitLocker. Rather than wiping the machine, you open Settings, go to System and then Activation, and upgrade the edition to Pro with a purchased key. After a restart, the laptop can join the domain, receive Group Policy and have BitLocker enabled, with the user's files intact. The whole fix takes minutes instead of the hours a reinstall would.",
   "Hardware requirements and support dates also come up. Windows 11 requires, among other things, a TPM (Trusted Platform Module) 2.0 chip, UEFI (Unified Extensible Firmware Interface) firmware with Secure Boot capability and a supported processor. Windows 10 reached end of support in October 2025, so organizations still running it need to upgrade or enroll in extended security updates. You can check the current edition and version with `winver` or in Settings under System and About, which shows a line such as \"Edition: Windows 11 Home.\"",
   "A handful of mistakes are common. People assume Device encryption on Home is the same as BitLocker with its full management tools. They reinstall Windows to change edition when an in-place key upgrade works and keeps the data. They forget that Home can still use the Remote Desktop client to reach other machines. They assume Enterprise can be bought off the shelf for a single home PC. Another trap is blaming the network or firewall when Remote Desktop into a Home PC fails, when the real cause is the edition.",
   "Exam questions usually give a symptom on a Home machine. \"The option to join a domain is missing,\" \"`gpedit.msc` cannot be found,\" \"BitLocker is not available in Control Panel\" or \"colleagues cannot connect to this PC with Remote Desktop\" all lead to the same answer: upgrade to Pro or higher. \"Large organization, volume licensing, advanced security\" suggests Enterprise, and \"school or university licensing\" suggests Education. If the question asks what Windows 11 needs that older PCs may lack, look for TPM 2.0 and Secure Boot."
  ],
  "analogy": "Windows editions work like a phone plan with feature tiers on the same network. The basic plan makes calls and browses, but hotspot sharing and international roaming are locked. You do not buy a new phone to get them; you change the plan and the phone keeps all your photos. That is the Home-to-Pro key upgrade. The analogy stops working for the Remote Desktop rule: on Home you can still call out to other PCs with the client, but nobody can call in, which is the host feature only Pro and above unlock.",
  "mnemonic": "Home is missing the \"Big Dogs Get Remotes\" features: BitLocker, Domain join, Group Policy Editor, Remote Desktop host. Pro, Enterprise and Education have all four.",
  "terms": [
   [
    "Windows Home",
    "The consumer edition, without domain join, Group Policy Editor, BitLocker management or Remote Desktop host."
   ],
   [
    "Windows Pro",
    "The business edition that adds domain join, Group Policy, BitLocker, Remote Desktop host and Hyper-V."
   ],
   [
    "Windows Enterprise",
    "The volume-licensed edition for organizations with Pro features plus advanced security and management."
   ],
   [
    "Windows Education",
    "Enterprise-level features licensed for schools and universities."
   ],
   [
    "Domain join",
    "Adding a computer to a directory such as Active Directory so it uses central accounts and policies."
   ],
   [
    "Remote Desktop host",
    "A computer that accepts incoming Remote Desktop connections, available in Pro and higher."
   ],
   [
    "Device encryption",
    "A simplified encryption feature on some Home devices with supported hardware, not equivalent to full BitLocker management."
   ],
   [
    "TPM 2.0",
    "A hardware security chip that stores keys, required by Windows 11 and used by BitLocker."
   ]
  ],
  "example": "A remote worker asks the help desk to connect to her home PC with Remote Desktop from the office, but the connection fails every time. The help desk finds the home PC runs Windows Home, which can only be a Remote Desktop client. They suggest a supported remote support tool for now and explain that hosting Remote Desktop requires upgrading that PC to Pro.",
  "mistakes": [
   [
    "To get Pro features on a Home laptop, you must wipe it and reinstall Windows Pro.",
    "You can upgrade the edition in place from Settings, System, Activation by entering a Pro product key or buying the upgrade. Files and apps stay."
   ],
   [
    "Windows Home cannot use Remote Desktop at all.",
    "Every edition includes the Remote Desktop client to connect out. Home only lacks the ability to host incoming Remote Desktop sessions."
   ],
   [
    "Device encryption on Home is the same thing as BitLocker.",
    "Device encryption is a simplified feature available on some Home hardware. Full BitLocker, with its management options and BitLocker To Go, requires Pro or higher."
   ],
   [
    "Remote Desktop into a Home PC fails, so the firewall must be blocking it.",
    "Before troubleshooting the network, check the edition. A Home PC cannot be a Remote Desktop host no matter how the firewall is set."
   ]
  ],
  "tryit": [
   [
    "Maplewood Veterinary Clinic's practice manager wants to work from home by connecting into her office PC with Remote Desktop. The office PC is a retail model running Windows Home, and her home laptop runs Windows Pro. The connection never succeeds. What is the cause and the fix?",
    "The office PC is the one that must accept incoming connections, so it must be a Remote Desktop host, which Home cannot be. Upgrade the office PC to Pro (or higher) with a key, then enable Remote Desktop on it. Her home laptop's edition does not matter, because every edition includes the client."
   ],
   [
    "A school district is choosing licensing for 2,000 student and staff PCs and wants Enterprise-level security and management features. Which edition is designed for this?",
    "Windows Education, which provides Enterprise-level functionality licensed for schools and universities."
   ]
  ],
  "tip": "If a question mentions domain join, gpedit.msc, BitLocker or accepting Remote Desktop connections on a Home machine, the answer is an edition upgrade to Pro or higher, not a reinstall.",
  "check": [
   [
    "A Windows Home laptop must join the company domain. What is the simplest fix?",
    "Upgrade the edition to Pro with a product key; Home cannot join a domain, and the upgrade does not require reinstalling."
   ],
   [
    "Can a Windows Home PC connect to another computer using Remote Desktop?",
    "Yes, every edition includes the Remote Desktop client; Home only lacks the ability to host incoming sessions."
   ],
   [
    "Which editions include BitLocker?",
    "Pro, Enterprise and Education; Home does not include full BitLocker."
   ],
   [
    "Which hardware components are commonly missing on older PCs that cannot run Windows 11?",
    "A TPM 2.0 chip, UEFI firmware with Secure Boot capability or a supported processor."
   ],
   [
    "How can you quickly confirm which Windows edition a PC is running?",
    "Run winver, or open Settings, System, About and read the Edition line."
   ]
  ]
 },
 {
  "t": "Windows tools: Task Manager, MMC snap-ins (Event Viewer, Disk Management, Task Scheduler, Device Manager, Certificate Manager, Local Users and Groups, Performance Monitor, Group Policy Editor), msinfo32, Resource Monitor, System Configuration, Registry Editor, Disk Cleanup",
  "hook": "Ticket 4471 at Riverside Property Management reads: \"PC slow since last week, crashed twice yesterday, can't delete my budget spreadsheet because 'it's open in another program,' and I need the BIOS version for the vendor.\" Hannah, the property manager who sent it, is standing at your desk with her coffee. You open Task Manager and everything looks calm right now. The crash happened yesterday, the locked file is invisible, and the vendor wants a firmware detail you would rather not reboot to find. Windows has a separate built-in tool for each of these questions. Which one do you open first, and which would waste your time?",
  "simple": "Windows comes with a toolbox of built-in programs, and each tool answers one kind of question. Task Manager shows what is happening on the PC right now, like a car's dashboard. Event Viewer is more like a flight recorder: it keeps a log of errors that already happened. Device Manager looks after the hardware and its drivers, the small programs that let Windows talk to devices. Disk Management handles how drives are divided up. Performance Monitor records how busy the PC is over hours or days. The skill is picking the right tool for the question. If you want to know why something crashed last night, the dashboard will not help; you need the recorder.",
  "body": [
   "Windows includes a toolbox of graphical utilities, and the exam gives you a symptom or a task and asks which tool to open. Learning each tool's purpose and its run command pays off twice: you answer questions quickly, and in real support work you can launch most of them from the Run box (Windows key + R) or a command prompt without hunting through menus. Think of each tool as the answer to a specific question a technician asks.",
   "Task Manager (`taskmgr`, or Ctrl+Shift+Esc) is the first stop for a slow or frozen PC. It shows running processes and their CPU (central processing unit), memory, disk and network use; lets you end unresponsive tasks; shows live performance graphs; lists startup apps with their impact so you can disable them; and shows services and signed-in users. Resource Monitor (`resmon`) goes deeper, showing exactly which process is using which file, network connection or disk. That is how you find the program that has a file locked: on the CPU tab, you search Associated Handles for the file name. System Configuration (`msconfig`) controls boot options, such as booting into Safe Mode next time, and lets you hide Microsoft services and disable the rest for clean-boot troubleshooting. System Information (`msinfo32`) gives a read-only report of hardware, drivers, BIOS (Basic Input/Output System) or UEFI (Unified Extensible Firmware Interface) version and system resources, useful when you need model details without opening the case or rebooting.",
   "The Microsoft Management Console (MMC, `mmc`) is a container for administrative tools called snap-ins. You can build a custom console with the ones you use most, and many are also available directly by their own command. Event Viewer (`eventvwr.msc`) shows the Application, Security and System logs, where you look up errors, warnings and audit events by time, source and event ID. Disk Management (`diskmgmt.msc`) initializes disks, creates, extends, shrinks and formats partitions, and assigns drive letters. Task Scheduler (`taskschd.msc`) runs programs or scripts on a schedule or on triggers such as sign-in or startup. Device Manager (`devmgmt.msc`) shows hardware, lets you update, roll back, disable or uninstall drivers, and flags problem devices with a yellow warning icon.",
   "More snap-ins round out the list. Certificate Manager (`certmgr.msc` for the current user, `certlm.msc` for the local computer) views, imports and exports digital certificates. Local Users and Groups (`lusrmgr.msc`) creates local accounts and manages group memberships, and it is not available in Home editions. Performance Monitor (`perfmon`) records counters such as processor time or available memory over time, and can create data collector sets and baselines for later comparison. The Local Group Policy Editor (`gpedit.msc`, Pro and above) configures policies on a single machine.",
   "Two more tools deal with settings and space. The Registry Editor (`regedit`) edits the registry, the hierarchical database of Windows and application settings organized into hives such as HKEY_LOCAL_MACHINE and HKEY_CURRENT_USER. Mistakes there can make Windows unbootable, so export the key before you change it, which gives you a .reg file you can double-click to restore. Disk Cleanup (`cleanmgr`) removes temporary files, Recycle Bin contents, old update files and other clutter; the newer Storage settings page in Settings offers similar options.",
   "The distinctions the exam likes are real-time versus over time, and viewing versus changing. Task Manager shows what is happening now; Performance Monitor records trends over hours or days. Task Manager tells you a process is busy; Resource Monitor tells you which file or connection it is using. `msinfo32` reports configuration but changes nothing, while `msconfig` changes boot and startup behavior. Device Manager deals with drivers and devices, while Disk Management deals with partitions and volumes. Event Viewer is the place for anything that already happened.",
   "Consider a worked example. A user reports that her PC became slow and crashes about once a day since last week. You open Task Manager and see nothing unusual at the moment, so you check Event Viewer's System log and find repeated errors from a display driver starting on the day a new driver was installed. In Device Manager you open the display adapter's properties and, on the Driver tab, choose Roll Back Driver. To confirm the fix, you create a Performance Monitor data collector set to log processor and memory counters for the next few days, and you check Event Viewer again at the end of the week.",
   "Some mistakes recur. People use Task Manager to investigate a problem that happened last night, when Event Viewer holds the history. They edit the registry without exporting the key first. They look for `lusrmgr.msc` or `gpedit.msc` on a Home edition, where those tools are not included. They confuse `msconfig` with `msinfo32`, or use Disk Management to fix a driver problem. Also remember that a startup program is disabled from Task Manager's Startup tab (or Settings, Apps, Startup) in current Windows, not from `msconfig`, whose Startup tab now simply points you to Task Manager.",
   "Exam questions are easiest if you map clue to tool. \"What is using the CPU right now?\" Task Manager. \"Which process has this file open?\" Resource Monitor. \"What error happened last night?\" Event Viewer. \"Why is this device not working, or roll back a driver?\" Device Manager. \"Run a script every Monday?\" Task Scheduler. \"Track memory use over a week or build a baseline?\" Performance Monitor. \"Add, shrink or extend a partition?\" Disk Management. \"Boot into Safe Mode next restart?\" System Configuration. \"Find the BIOS version without rebooting?\" System Information."
  ],
  "analogy": "Think of the Windows tools as the instruments in a hospital. Task Manager is the bedside monitor showing heart rate right now. Performance Monitor is a 48-hour heart recorder that catches patterns over days. Event Viewer is the patient's chart, recording what already happened. Device Manager is the specialist for individual organs, and the Registry Editor is surgery: powerful and risky, so you prepare (export the key) first. The analogy breaks down in one place: a real chart is written by people, while Event Viewer is written automatically by Windows and applications.",
  "terms": [
   [
    "Task Manager",
    "Real-time view of processes, performance, startup apps, services and users, opened with Ctrl+Shift+Esc."
   ],
   [
    "Microsoft Management Console (MMC)",
    "A framework that hosts administrative snap-ins such as Event Viewer and Device Manager."
   ],
   [
    "Event Viewer",
    "The snap-in that displays Application, Security and System logs for troubleshooting past events."
   ],
   [
    "Performance Monitor",
    "A tool that logs performance counters over time to build baselines and find trends."
   ],
   [
    "Resource Monitor",
    "A detailed view of which processes are using specific files, disk, network and memory resources."
   ],
   [
    "System Configuration (msconfig)",
    "A tool for changing boot options such as Safe Mode and disabling services for clean-boot troubleshooting."
   ],
   [
    "System Information (msinfo32)",
    "A read-only report of hardware, firmware version, drivers and system resources."
   ],
   [
    "Registry",
    "The hierarchical database of Windows and application settings, edited with regedit."
   ]
  ],
  "example": "A user cannot delete a spreadsheet because Windows says it is open in another program, yet nothing is visible on screen. The technician opens Resource Monitor, searches the CPU tab's associated handles for the file name, finds a hung background process holding it, ends that process and deletes the file.",
  "mistakes": [
   [
    "Task Manager is the tool for finding out why the PC crashed last night.",
    "Task Manager shows only what is happening now. Past errors are recorded in Event Viewer's System and Application logs."
   ],
   [
    "msconfig and msinfo32 are the same kind of tool.",
    "msinfo32 (System Information) is a read-only report. msconfig (System Configuration) changes boot options such as Safe Mode and service selection for clean booting."
   ],
   [
    "Performance Monitor and Task Manager both show the same thing, so either works for a week-long trend.",
    "Task Manager is real-time. Performance Monitor logs counters over time with data collector sets, which is what you need for baselines and trends."
   ],
   [
    "You can just edit a registry value and change it back if it goes wrong.",
    "A bad registry change can stop Windows from booting, leaving no easy way back in. Export the key first so you have a .reg file to restore."
   ]
  ],
  "tryit": [
   [
    "At Summit Legal, the backup script on a file server must run every night at 11 p.m., but the paralegal who runs it manually keeps forgetting. She also asks how you will know if it ran successfully. Which two tools would you use?",
    "Use Task Scheduler (taskschd.msc) to create a task that runs the script daily at 11 p.m., ideally under a dedicated account. To confirm it ran, check the task's Last Run Result and history in Task Scheduler, and look in Event Viewer for related events or errors."
   ],
   [
    "A user's new USB headset is not working. In one tool you see the device listed with a yellow warning triangle. Which tool are you in, and what are your options?",
    "Device Manager. From the device's properties you can update the driver, roll back to the previous driver, disable and re-enable the device, or uninstall it and let Windows reinstall the driver on the next scan or restart."
   ]
  ],
  "tip": "Task Manager shows real-time use while Performance Monitor records data over time. lusrmgr.msc and gpedit.msc are not available on Windows Home, and Event Viewer is the tool for what already happened.",
  "check": [
   [
    "Which tool would you use to see errors logged overnight?",
    "Event Viewer, which records Application, Security and System events with timestamps."
   ],
   [
    "You need to track memory usage over a full week. Which tool fits?",
    "Performance Monitor, because it can log counters over time with a data collector set."
   ],
   [
    "Which tool lets you configure the next restart to boot into Safe Mode?",
    "System Configuration (msconfig), on its Boot tab."
   ],
   [
    "What should you do before changing a registry key?",
    "Export or back up the key so you can restore it if the change causes problems."
   ],
   [
    "Which tool shows the BIOS or UEFI version without restarting the PC?",
    "System Information (msinfo32)."
   ]
  ]
 },
 {
  "t": "Command-line tools: cd, dir, md, rmdir, robocopy, xcopy, diskpart, format, chkdsk, sfc, DISM, gpupdate, gpresult, net use, net user, whoami, winver, shutdown, ipconfig, ping, tracert, pathping, nslookup, netstat, hostname",
  "hook": "It is 7:40 a.m. at Coastal Freight, twenty minutes before the dispatch team logs in, and the phone is already ringing. Sam in dispatch says the intranet will not load by name, though he swears the internet works. The new drive-mapping policy you pushed yesterday has not reached his PC either, and a laptop on the next desk has been throwing odd system errors since last night's update. You could click through a dozen windows, or you could open one elevated command prompt and type a handful of short commands. Which commands get you answers fastest, and which pairs are easy to mix up under pressure?",
  "simple": "The command line is a text window where you type short instructions instead of clicking through menus. It is like ordering at a counter by name instead of browsing every aisle: faster once you know the names. Some commands move around folders, some copy files, some check and repair Windows, and some test the network. For example, `ipconfig` shows your computer's network address, `ping` checks whether another computer answers, and `sfc /scannow` scans Windows for damaged system files and fixes them. Many commands need administrator rights, so you open the window with Run as administrator. Adding `/?` after any command shows its help, so you never have to memorize every option.",
  "body": [
   "The Windows command line (Command Prompt, `cmd`, or PowerShell, which runs most of the same commands) is faster than the graphical interface for many tasks and is essential for scripting and remote work. Some commands need an elevated prompt: right-click Command Prompt or Terminal and choose Run as administrator, and the window title will show Administrator. Add `/?` to any command to see its help, for example `robocopy /?`. The exam lists these commands and expects you to know what each does and which switch performs a common task.",
   "Start with file and folder navigation. `cd` changes directory (`cd ..` goes up one level, `cd \\` goes to the root of the drive). `dir` lists a folder's contents (`dir /a` includes hidden and system files). `md` (or `mkdir`) makes a directory and `rmdir` (or `rd`) removes one; `rmdir /s` removes it with all its contents. `xcopy` copies files and directory trees (`/s` for subfolders, `/e` including empty ones). `robocopy` (Robust File Copy) is the more powerful replacement: it can resume after interruptions, retry, preserve permissions and timestamps, and mirror folders with `/mir`, which makes it the choice for migrations and large backups. Be careful with `/mir`, because it also deletes files at the destination that no longer exist at the source.",
   "Disk tools come next, and they deserve respect because several have no undo. `diskpart` is an interactive partitioning tool: you `list disk`, `select disk 1`, then `clean`, `create partition primary`, `format` and so on. It acts immediately, so confirm the disk number twice by checking sizes in the `list disk` output. `format` prepares a volume with a file system, for example `format E: /fs:NTFS`. `chkdsk` checks a volume for file system errors; `chkdsk /f` fixes them and `chkdsk /r` also locates bad sectors and recovers readable data. If the volume is in use, such as the system drive, chkdsk offers to run at the next restart.",
   "System repair tools work as a pair. `sfc /scannow` (System File Checker) scans protected Windows files and replaces corrupted ones from a local cache called the component store. `DISM` (Deployment Image Servicing and Management) repairs that underlying Windows image, commonly with `DISM /Online /Cleanup-Image /RestoreHealth`. Run DISM when sfc reports corrupt files it cannot fix, restart if asked, then run sfc again so it can now use a healthy source. Both need an elevated prompt.",
   "Policy and account commands are next. `gpupdate` refreshes Group Policy (`gpupdate /force` reapplies all policies, not just changed ones). `gpresult /r` shows which policies were applied to the current user and computer. `net use` maps or disconnects network drives, as in `net use S: \\\\server\\share`. `net user` lists, creates or changes local accounts, for example `net user alice /add`, or `net user alice /domain` to query a domain account. `whoami` shows the signed-in account (`whoami /groups` shows memberships). `winver` opens a window with the Windows version and build. `shutdown /s /t 0` shuts down now, `/r` restarts and `/a` aborts a pending shutdown.",
   "The networking commands are the ones you will type most often. `ipconfig` shows IP (Internet Protocol) settings; `/all` adds the MAC (media access control) address and the DHCP (Dynamic Host Configuration Protocol) and DNS (Domain Name System) servers, `/release` and `/renew` get a new DHCP lease, and `/flushdns` clears the local DNS cache. `ping` tests reachability with ICMP (Internet Control Message Protocol) echo requests. `tracert` lists each router hop to a destination. `pathping` combines both, measuring packet loss at each hop over a period. `nslookup` queries DNS to check name resolution. `netstat` lists connections and listening ports (`-a` all, `-n` numeric, `-b` owning program, which needs elevation). `hostname` prints the computer's name.",
   "```\nipconfig /all\nping 8.8.8.8\nnslookup intranet.example.com\nsfc /scannow\nrobocopy C:\\Data D:\\Backup /mir\n```",
   "Consider a worked example. A user cannot reach the intranet by name. You run `ipconfig /all` and see a valid address and DNS server. `ping` to the intranet server's IP address succeeds, but `nslookup intranet.example.com` fails, so the network path is fine and the problem is name resolution. After the DNS team fixes the record, you run `ipconfig /flushdns` so the PC stops using its cached failure, and the page loads. Working from the bottom up (address, then reachability, then names) keeps you from guessing.",
   "Several mistakes catch people out: running `sfc` or `DISM` from a non-elevated prompt, confusing `gpupdate` (apply) with `gpresult` (report), expecting `tracert` to show loss statistics, which is `pathping`'s job, using `format` when the disk needs partitioning in `diskpart` first, and forgetting that `rmdir /s` and `diskpart clean` have no Recycle Bin.",
   "Exam questions pair a task with a command. \"Copy a folder and resume after network drops, keeping permissions\" is `robocopy`. \"Corrupted system files\" is `sfc /scannow`, and \"sfc could not repair them\" is DISM. \"Policy changes have not applied yet\" is `gpupdate /force`; \"which policies applied?\" is `gpresult`. \"Map a drive letter to a share\" is `net use`. \"Which account am I using?\" is `whoami`. \"Find where packets are being lost along the path\" is `pathping`. \"Which ports is this PC listening on?\" is `netstat`."
  ],
  "analogy": "sfc and DISM work like a mechanic and a parts warehouse. sfc is the mechanic who swaps out broken parts in your car using spares from the warehouse. If the warehouse itself has damaged stock, the mechanic keeps fitting bad parts and gives up. DISM restocks the warehouse with good parts, and then the mechanic can finish the job. That is why the order is sfc, then DISM if sfc fails, then sfc again. The analogy stops at timing: both tools run on the same PC in minutes, not across town.",
  "terms": [
   [
    "robocopy",
    "Robust File Copy, a resilient copy tool that retries, resumes, preserves permissions and can mirror folders."
   ],
   [
    "diskpart",
    "An interactive command-line tool for managing disks, partitions and volumes with no undo."
   ],
   [
    "chkdsk",
    "Checks a volume for file system errors; /f fixes errors and /r also finds bad sectors."
   ],
   [
    "sfc",
    "System File Checker, which scans and repairs protected Windows system files."
   ],
   [
    "DISM",
    "Deployment Image Servicing and Management, which repairs the Windows component store that sfc relies on."
   ],
   [
    "gpupdate and gpresult",
    "gpupdate applies Group Policy now; gpresult reports which policies were applied."
   ],
   [
    "nslookup",
    "A tool that queries DNS servers to test name resolution."
   ],
   [
    "pathping",
    "Combines ping and tracert to measure latency and packet loss at each hop over time."
   ],
   [
    "Elevated prompt",
    "A command window opened with Run as administrator, required for system-level commands such as sfc and DISM."
   ]
  ],
  "example": "After a failed update, Windows shows odd errors and `sfc /scannow` reports it found corrupt files it could not repair. The technician runs `DISM /Online /Cleanup-Image /RestoreHealth` from an elevated prompt to repair the component store, restarts, then runs `sfc /scannow` again, which now repairs the remaining files successfully.",
  "mistakes": [
   [
    "gpupdate and gpresult do the same thing.",
    "gpupdate applies (refreshes) Group Policy now, and /force reapplies all of it. gpresult only reports which policies were applied; it changes nothing."
   ],
   [
    "tracert shows where packets are being lost.",
    "tracert lists the hops along the path. pathping adds per-hop latency and packet loss statistics measured over a period, so it is the tool for finding loss."
   ],
   [
    "If sfc cannot fix files, you must reinstall Windows.",
    "Run DISM /Online /Cleanup-Image /RestoreHealth to repair the component store first, then run sfc /scannow again."
   ],
   [
    "xcopy is the best choice for a large migration over an unreliable link.",
    "robocopy is built for that: it retries, resumes, preserves permissions and timestamps, and can mirror folders. Use /mir carefully, because it deletes destination files missing from the source."
   ]
  ],
  "tryit": [
   [
    "At Granite Ridge Schools, a teacher's laptop received a new Group Policy that maps the curriculum share, but the drive has not appeared an hour later. The teacher is signed in and on the school network. What two commands would you run, and in what order?",
    "First run gpupdate /force to reapply all policies immediately (signing out and back in may be needed for some user settings). Then run gpresult /r to confirm the curriculum policy now appears in the applied list. If it does not appear, the problem is likely the policy's scope or filtering rather than timing."
   ],
   [
    "A user can browse websites, but your remote monitoring tool says an unexpected program on her PC is listening for incoming connections. Which command shows listening ports and the program that owns each one?",
    "netstat with -a (all connections and listening ports), -n (numeric addresses) and -b (owning program), for example netstat -anb, run from an elevated prompt because -b requires administrator rights."
   ]
  ],
  "tip": "Know the pairs: sfc repairs system files and DISM repairs the image sfc uses; gpupdate applies policy and gpresult reports it; tracert shows the path and pathping adds per-hop loss statistics.",
  "check": [
   [
    "sfc /scannow reports corrupt files it cannot fix. What should you run next?",
    "DISM /Online /Cleanup-Image /RestoreHealth to repair the image, then run sfc /scannow again."
   ],
   [
    "Which command shows the MAC address and DNS servers of each adapter?",
    "ipconfig /all."
   ],
   [
    "How do you force all Group Policy settings to reapply immediately?",
    "Run gpupdate /force."
   ],
   [
    "Which command copies a large folder tree with retries and can mirror the source to the destination?",
    "robocopy, for example with the /mir switch."
   ],
   [
    "A user can ping a server's IP address but not reach it by name. Which command tests name resolution?",
    "nslookup, which queries DNS for the name."
   ]
  ]
 },
 {
  "t": "Settings and Control Panel: Accounts, Privacy, Update and Security, Apps, Power Options (sleep, hibernate, fast startup), Display, Devices",
  "hook": "Three messages arrive at the Oakridge Design help desk before lunch. Elena's laptop is always dead when she opens it after a flight, even though she closed it at full charge. Marcus says his new video-call app shows a black square instead of his face, yet the built-in Camera app works fine. And Wei installed a driver update yesterday, shut down as instructed, and the problem is still there this morning. None of these is a hardware fault. Each one lives in a specific corner of Settings or Control Panel. Where do you send each person, and why does \"Shut down\" not always mean what users think it means?",
  "simple": "Windows has two places to change how the computer behaves. The newer one is the Settings app, and the older one is Control Panel. They are like two remote controls for the same TV: the newer one has most buttons, but a few still live only on the old one. Settings is grouped into areas such as Accounts (how you sign in), Privacy (which apps may use your camera or microphone), Windows Update, Apps, Display and Devices. Power options matter a lot. Sleep pauses the computer but keeps using a little battery. Hibernate saves your work to the drive and turns off fully, so it uses no power. Shut down with fast startup is not a complete restart, so sometimes only Restart clears a problem.",
  "body": [
   "Windows has two configuration interfaces. The modern Settings app (Windows key + I) is where Microsoft adds new options, and the classic Control Panel (`control`) still hosts many older applets. Over time more features move from Control Panel into Settings, so you should be comfortable finding a setting in either place, and in Windows 11 many Control Panel links simply open the matching Settings page. The exam names the categories, so learn what lives in each and which symptom sends you there.",
   "Accounts is where users manage their sign-in. Here you switch between a local account and a Microsoft account, choose sign-in options such as a PIN (personal identification number), Windows Hello face or fingerprint and security keys, add family members or other users, and connect a work or school account. The Control Panel equivalent is User Accounts, which also lets you change an account type between Standard and Administrator and manage stored credentials through Credential Manager. When a user keeps getting prompted for an old password to a file share, Credential Manager is often where the stale credential lives.",
   "Privacy (called Privacy and security in Windows 11) controls what apps can access: location, camera, microphone, contacts, diagnostic data and the advertising ID. Each permission has a main switch and per-app switches, plus a separate toggle that allows desktop apps to use the device. If a video-call app cannot see the webcam even though the driver is fine, check the camera permission here before touching drivers.",
   "Update and Security in Windows 10 is split in Windows 11 into Windows Update and Privacy and security, with some items under System. It covers Windows Update, including pausing updates, active hours (the period when Windows avoids automatic restarts) and optional driver updates, as well as Windows Security, backup, troubleshooters, recovery options such as Reset this PC and Advanced startup, and activation. If a user complains that their PC restarted for updates in the middle of a presentation, setting active hours is the usual answer.",
   "Apps lists installed programs so you can uninstall, modify or repair them, set default apps (which browser opens web links, which app opens .pdf files), manage startup apps and add optional features. The Control Panel equivalent is Programs and Features, which also has Turn Windows features on or off for items such as Hyper-V or the Telnet client. Display handles resolution, scaling, orientation, refresh rate, multiple monitors (duplicate or extend) and night light. Devices (Bluetooth and devices in Windows 11) covers pairing Bluetooth accessories, printers and scanners, mouse and touchpad settings, AutoPlay and USB (Universal Serial Bus). Other Control Panel items include Internet Options (proxy and browser security zones), Sound, Mail, Network and Sharing Center, Windows Defender Firewall, File Explorer Options (show hidden files and file extensions) and Indexing Options.",
   "Power Options control how the computer saves energy, and the exam tests the differences carefully. Sleep keeps the session in RAM (random access memory) using a trickle of power, so it resumes in seconds, but a laptop battery slowly drains and a desktop loses unsaved work if power fails. Hibernate writes the contents of RAM to a file on disk (`hiberfil.sys`) and powers off completely; it resumes more slowly than sleep but uses no power and survives a dead battery. Fast startup is a hybrid: when you choose Shut down, Windows signs you out and then hibernates just the kernel session, so the next boot is quicker. Because the kernel is not fully restarted, some driver or update problems are cleared only by choosing Restart, which bypasses fast startup. In Power Options you can also configure what the power button and lid do, choose or customize power plans, and find the fast startup checkbox under Choose what the power buttons do.",
   "Consider a worked example. A traveler complains that her laptop is always dead when she opens it after a long flight, even though she closed the lid at full charge. The lid is set to sleep, and sleep keeps drawing power to hold RAM. You open Power Options, set closing the lid on battery to hibernate, and explain that resume will take a little longer but the battery and her open documents will survive. Later that week, a desktop driver update \"does not take effect\" after she shuts down each night; you explain fast startup and have her choose Restart, which loads the new driver.",
   "Watch for these common mistakes: expecting Shut down to fully reset the kernel when fast startup is on, confusing sleep (RAM, low power) with hibernate (disk, no power), troubleshooting a webcam driver when the Privacy camera toggle is blocking the app, looking only in Control Panel for settings that have moved to Settings, and changing a user's account type to Administrator to fix a permission problem that the principle of least privilege says should be solved another way.",
   "Exam wording maps to categories. \"App cannot use the microphone\" is Privacy. \"Pause updates or set active hours\" is Windows Update. \"Change which program opens a file type\" is Apps and default apps. \"Laptop battery drains while closed\" or \"resume with no power used\" is hibernate in Power Options. \"Shut down does not clear a problem but Restart does\" is fast startup. \"Second monitor shows the same image instead of extending the desktop\" is Display. \"Pair a Bluetooth headset\" is Devices."
  ],
  "analogy": "Sleep is like pausing a movie with the TV still on: you resume instantly, but the set keeps drawing power. Hibernate is like writing down the exact minute, switching everything off at the wall and picking up from your note later: slower to resume, no power used. Fast startup is like switching off but leaving the cable box half-awake so the next start is quicker. The catch, and where the analogy matters for the exam, is that the half-awake box keeps its glitches, so a full Restart is what clears them.",
  "terms": [
   [
    "Settings app",
    "The modern Windows configuration interface, opened with Windows key + I."
   ],
   [
    "Control Panel",
    "The classic Windows configuration interface containing applets such as Programs and Features and Power Options."
   ],
   [
    "Sleep",
    "A low-power state that keeps the session in RAM for very fast resume but still uses power."
   ],
   [
    "Hibernate",
    "Saves RAM contents to hiberfil.sys on disk and powers off fully, resuming more slowly with no power used."
   ],
   [
    "Fast startup",
    "A shutdown mode that hibernates the kernel session to speed the next boot; Restart bypasses it."
   ],
   [
    "Default apps",
    "Settings that decide which application opens each file type or link type."
   ],
   [
    "Active hours",
    "The period when Windows Update avoids automatically restarting the device."
   ],
   [
    "Credential Manager",
    "The Control Panel applet that stores saved Windows and web credentials, useful for clearing stale passwords."
   ]
  ],
  "example": "A user's new video-conferencing app shows a black screen instead of her webcam, but the camera works in the built-in Camera app. The technician opens Settings, Privacy and security, Camera, and finds that desktop apps are not allowed to use the camera. After turning that permission on, the conferencing app shows her video.",
  "mistakes": [
   [
    "Shut down always fully restarts Windows, so it clears the same problems as Restart.",
    "With fast startup on, Shut down hibernates the kernel session. Restart performs a full kernel reload, which is why it clears some driver and update problems that Shut down does not."
   ],
   [
    "Sleep and hibernate both use no power.",
    "Sleep keeps the session in RAM and keeps drawing a small amount of power. Hibernate saves RAM to hiberfil.sys on disk and powers off completely."
   ],
   [
    "If an app cannot use the camera, reinstall the camera driver.",
    "When the camera works in another app, the driver is fine. Check Settings, Privacy and security, Camera, including the setting that lets desktop apps access the camera."
   ],
   [
    "The fix for a user who cannot change a setting is to make them an administrator.",
    "Least privilege means users should have only the rights they need. Solve the specific problem, for example by having an administrator make the change, rather than granting permanent admin rights."
   ]
  ],
  "tryit": [
   [
    "At Willow Creek Realty, an agent's laptop restarted for updates in the middle of a client video call, and she lost her place in a contract. She works from 8 a.m. to 6 p.m. and wants this never to happen during work again. What setting do you change and where?",
    "In Settings, Windows Update, set active hours to cover her working day (for example 8 a.m. to 6 p.m.), so Windows avoids automatic restarts in that window. You can also show her how to pause updates briefly before an important meeting. Updates still install, just outside her working hours."
   ],
   [
    "A user plugs a second monitor into his laptop, but it shows exactly the same image as the laptop screen, and he wants to drag windows across to it. Where do you fix this?",
    "In Settings, System, Display (or with Windows key + P), change the multiple displays option from Duplicate to Extend. Extend treats the second monitor as additional desktop space."
   ]
  ],
  "tip": "If a driver fix or update does not seem to take effect after Shut down, remember fast startup: choose Restart instead. Sleep keeps data in RAM and uses power; hibernate saves to disk and uses none.",
  "check": [
   [
    "Which power state saves the session to disk and uses no power while off?",
    "Hibernate, which writes memory to hiberfil.sys and powers down completely."
   ],
   [
    "Why might Restart fix a problem that Shut down does not?",
    "With fast startup, Shut down hibernates the kernel session, while Restart performs a full kernel reload."
   ],
   [
    "An app cannot access the microphone although the device works elsewhere. Where do you check?",
    "The Privacy (Privacy and security) microphone permissions in Settings."
   ],
   [
    "Where do you change which program opens .pdf files?",
    "In Settings under Apps, Default apps."
   ],
   [
    "Which setting stops Windows Update from restarting a PC during a user's working day?",
    "Active hours, under Windows Update in Settings."
   ]
  ]
 },
 {
  "t": "Windows networking: workgroup vs domain, mapped drives and shares, firewall exceptions, static vs DHCP addressing, VPN and proxy settings, public vs private network profiles, metered connections",
  "hook": "Aisha starts her first day at Bayside Architects, a small firm with no server, just a dozen PCs and a shared printer. By 10 a.m. she messages you: websites load fine, but she cannot see the office printer or the projects share, and her colleagues cannot see her laptop either. Down the hall, the receptionist reports that the label printer \"moved\" again and nobody can print to it. And a remote partner says he can browse the web at home but cannot open the finance folder. Three network complaints, three different causes, none of them a broken cable. How do you tell which setting is behind each one?",
  "simple": "Computers on a network need a few things set correctly. They need an address, which they usually get automatically from a service called DHCP, the way a hotel front desk hands each guest a room number. A printer is better with a fixed address so people can always find it. Windows also labels each network as Public, for untrusted places like cafés, or Private, for trusted places like home or a small office. On Public, your PC hides itself and does not share files. Offices can be organized as a workgroup, where each PC keeps its own user accounts, or a domain, where one central server holds everyone's account. A VPN is a private, encrypted tunnel from home into the office network.",
  "body": [
   "Windows networking questions ask how computers are organized, how users reach shared files, and why one PC cannot connect when others can. The concepts are simple once you see what each setting controls, and most real tickets come down to one of a handful of settings: the workgroup or domain arrangement, sharing and mapped drives, the firewall and network profile, IP (Internet Protocol) addressing, and VPN or proxy configuration.",
   "Windows computers can be organized in two ways. In a workgroup, every computer is a peer that keeps its own local user accounts, so a user needs an account on each machine they want to access. Workgroups suit small offices with a handful of computers and no server. In a domain, a server running Active Directory Domain Services (a domain controller) holds a central database of users, computers and policies. Users sign in once with a domain account from any joined computer, and administrators apply Group Policy to everyone. Joining a domain needs Windows Pro or higher. HomeGroup was an older home-sharing feature and is no longer present in current Windows.",
   "Sharing files is the next piece. To share a folder, open its Properties, use the Sharing tab (Advanced Sharing) to set a share name and share permissions, and remember that NTFS (New Technology File System) permissions on the Security tab also apply. Over the network, both sets apply and the more restrictive result wins. Users reach the share through a UNC (Universal Naming Convention) path such as `\\\\fileserver\\sales`. Mapping a drive assigns a letter to that path so it looks like a local drive: in File Explorer choose Map network drive and tick Reconnect at sign-in to make it persistent, or use `net use S: \\\\fileserver\\sales /persistent:yes`. A share name ending in `$` is hidden from browsing, and Windows creates administrative shares such as `C$` and `ADMIN$` for administrators.",
   "Windows Defender Firewall blocks unsolicited inbound traffic by default. When an application or service must accept connections, you create an exception: allow an app through the firewall in the basic interface, or create an inbound rule for a specific program, port and protocol in Windows Defender Firewall with Advanced Security (`wf.msc`). Rules can apply to specific network profiles, and each connection is given one. Public is for untrusted places like coffee shops; it turns off network discovery and file sharing and applies stricter rules. Private is for trusted home or small-office networks; it lets the computer be discovered and share files and printers. Domain is applied automatically when the computer can reach its domain controller. You can see and change a connection's profile in Settings, Network and internet, under the properties of the Wi-Fi or Ethernet connection.",
   "IP addressing can be dynamic or static. With DHCP (Dynamic Host Configuration Protocol), the computer receives its IP address, subnet mask, default gateway and DNS (Domain Name System) servers automatically, which is right for most clients. A static address is typed in by hand under the adapter's IPv4 properties and suits servers, printers and network devices that must never change address. If a DHCP client shows an address starting with 169.254, it is an APIPA (Automatic Private IP Addressing) address, meaning no DHCP server answered; the PC can usually talk only to other APIPA devices on the same segment. You can also set an alternate configuration used when DHCP is unavailable, which helps laptops that move between an office and a site with fixed addressing.",
   "Remote access and web settings come next. A VPN (virtual private network) creates an encrypted tunnel across an untrusted network to a remote network; add one under Settings, Network and internet, VPN, or install the vendor's client. A proxy server forwards web requests on the user's behalf for filtering, logging or caching; configure it under Network and internet, Proxy, either automatically with a setup script or manually with an address and port. A wrong proxy setting is a common reason why one PC cannot browse while others can. Finally, a metered connection tells Windows that data costs money, as on a mobile hotspot, so it limits background downloads such as some updates and sync.",
   "Consider a worked example. A new employee's laptop can reach websites but cannot see the office printer or the file server's shares, and colleagues cannot see it either. `ipconfig` shows a normal address from the office DHCP scope, so addressing is fine. In Settings you find the office Wi-Fi was marked Public when she first joined, which disables network discovery and file sharing. You change the profile to Private, since the office is a trusted network without a domain, and the printer and shares appear. You then map the sales share to `S:` with reconnect at sign-in.",
   "Typical mistakes include treating a 169.254 address as a working network, giving a printer a DHCP address and then losing it when the lease changes, marking a café network Private, opening a firewall port for all profiles when only the domain profile needs it, confusing a VPN (an encrypted tunnel to a network) with a proxy (a relay for web requests), and forgetting that share permissions and NTFS permissions both apply over the network.",
   "Exam questions use clear clue words. \"Central accounts and policies\" means domain; \"each PC has its own accounts\" means workgroup. \"Address starts with 169.254\" means DHCP failed. \"Printer must always keep the same address\" means static IP. \"Cannot see other computers on a trusted network\" means the profile is Public. \"Only this PC cannot browse; others can\" suggests a bad proxy setting. \"Avoid large downloads on a phone hotspot\" means metered connection. \"Access company resources securely from home\" means VPN."
  ],
  "analogy": "Network profiles work like how you behave in different places. At home (Private), you leave the front door unlocked for family and let neighbors know you are in. At a busy train station (Public), you keep your bag zipped and do not announce yourself. At the office (Domain), building security sets the rules for you. The analogy stops working in one way: Windows does not sense where it is on its own for Public versus Private; it uses the choice made when you first joined the network, which is why a trusted office can wrongly end up as Public.",
  "terms": [
   [
    "Workgroup",
    "A peer-to-peer arrangement where each Windows computer keeps its own local accounts."
   ],
   [
    "Domain",
    "A centrally managed network where a domain controller provides accounts, authentication and Group Policy."
   ],
   [
    "UNC path",
    "A network path in the form \\\\server\\share used to reach shared resources."
   ],
   [
    "Mapped drive",
    "A drive letter assigned to a network share so it appears like a local drive."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing, which assigns a 169.254.x.x address when no DHCP server responds."
   ],
   [
    "Network profile",
    "The Public, Private or Domain category that sets discovery, sharing and firewall behavior for a connection."
   ],
   [
    "Proxy server",
    "A server that forwards web requests on a client's behalf for filtering, logging or caching."
   ],
   [
    "Metered connection",
    "A setting that tells Windows data is limited or costly so it reduces background downloads."
   ]
  ],
  "example": "A remote accountant can browse the web at home but cannot open the finance share. She has not connected the company VPN, so her laptop has no route to the internal server. Once the VPN connects, `\\\\fileserver\\finance` opens and her mapped drive reconnects, because the traffic now travels through the encrypted tunnel into the office network.",
  "mistakes": [
   [
    "A 169.254.x.x address means the PC is connected and working.",
    "It is an APIPA address, assigned when no DHCP server answered. Check the cable or Wi-Fi association, the DHCP server and then run ipconfig /release and /renew."
   ],
   [
    "A VPN and a proxy do the same job.",
    "A VPN creates an encrypted tunnel into a remote network so you can reach internal resources. A proxy relays web requests for filtering, logging or caching and does not give you access to the internal network."
   ],
   [
    "Mark every network Private so file sharing always works.",
    "Private enables discovery and sharing, which is right only on trusted networks. Untrusted networks such as cafés and hotels should be Public."
   ],
   [
    "If share permissions allow Full Control, the user can do anything to the files.",
    "NTFS permissions also apply over the network, and the more restrictive of the two wins. A user with Full Control on the share but Read in NTFS can only read."
   ]
  ],
  "tryit": [
   [
    "At Hillside Print Shop, the large-format printer gets its address from DHCP. About once a month, nobody can print to it, and the fix has been to reinstall the printer on every PC. What should you change and why?",
    "Give the printer a static IP address (or a DHCP reservation, if the router supports it) outside the dynamic pool, and point the PCs at that address. When the printer's DHCP lease changes, its address can change, and the PCs keep sending jobs to the old address. A fixed address ends the monthly breakage."
   ],
   [
    "A sales rep is about to download a large software update while tethered to his phone's hotspot on a limited data plan. He wants Windows to stop large background downloads whenever he uses the hotspot. What setting does this?",
    "Mark the hotspot connection as a metered connection in its Wi-Fi properties in Settings. Windows then limits background downloads such as some updates and sync on that connection."
   ]
  ],
  "tip": "A 169.254.x.x address means DHCP failed, not that the network is fine. The Public profile blocks discovery and sharing; Private allows it on trusted networks.",
  "check": [
   [
    "A PC shows the address 169.254.12.7. What does that tell you?",
    "It is an APIPA address, so the PC could not reach a DHCP server."
   ],
   [
    "Why might a laptop on a trusted office network not see shared printers?",
    "The network may be set to the Public profile, which turns off network discovery and file sharing."
   ],
   [
    "Which command maps drive S: to a share persistently?",
    "net use S: \\\\server\\share /persistent:yes."
   ],
   [
    "What is the main difference between a workgroup and a domain?",
    "A workgroup has separate local accounts on each PC, while a domain uses central accounts and policies on a domain controller."
   ],
   [
    "Only one PC in an office cannot browse the web while all others can, and its IP settings look normal. What setting should you check?",
    "Its proxy settings, under Network and internet, Proxy, since a wrong proxy address stops that PC from browsing."
   ]
  ]
 },
 {
  "t": "MacOS: installing and removing apps (.dmg, .pkg, .app, App Store), System Settings, Time Machine, FileVault, Keychain, Spotlight, Mission Control, Terminal, Disk Utility, Force Quit",
  "hook": "Studio Fern, a small branding agency, has just switched its designers to Macs, and you are the Windows technician who now supports them. On Tuesday, Noor's design app freezes forty minutes before a client presentation, and she has never seen a Mac without a Task Manager. On Wednesday, Theo says a new font tool he installed \"vanished\" after he restarted. On Thursday, the owner asks whether the laptops are encrypted and backed up, because a competitor's employee left one in a taxi last month. You know how to answer all of this on Windows. What are the Mac equivalents, and where do Mac habits differ in ways that catch Windows people out?",
  "simple": "A Mac does most of the same jobs as a Windows PC, but the tools have different names. Apps usually come from the App Store, or as a .dmg file, which opens like a virtual USB stick: you drag the app into the Applications folder and then eject it. If an app freezes, Force Quit closes it, like End task on Windows. Time Machine is the built-in backup that keeps older versions of your files on an external drive. FileVault scrambles the whole drive so a stolen laptop is unreadable without the password or recovery key. Keychain remembers your passwords. Spotlight is the quick search you open with Command and Space. Learning these names is mostly translating what you already know.",
  "body": [
   "Support technicians increasingly meet Macs, and the exam checks that you can do everyday tasks on them and map them to what you already know from Windows. Start with software, because installing and removing apps is the most common Mac request. The simplest source is the App Store, which installs, updates and removes vetted apps tied to the user's Apple ID. Outside the store, apps usually arrive as a .dmg (disk image) file: double-click it to mount it like a virtual drive, drag the .app into the Applications folder, then eject the image. A .app is actually a folder-like bundle containing the program and its resources, which is why it can be dragged around as one item. A .pkg is an installer package that runs a step-by-step wizard and can place files in several system locations; it is used when an app needs drivers, background services or components beyond a single bundle.",
   "Removing apps is usually easy. Drag the .app from Applications to the Trash, or in Launchpad hold an App Store app until it jiggles and click the delete button. Apps installed from a .pkg may leave components behind, so check whether the vendor provides an uninstaller. Gatekeeper, a built-in macOS protection, checks that downloaded apps are signed and notarized by identified developers and warns before opening anything else. If a user sees a warning that an app cannot be opened because the developer cannot be verified, that is Gatekeeper doing its job, and the safe response is to confirm the app's source rather than simply bypass the warning.",
   "System Settings (named System Preferences before macOS Ventura) is the Mac's control panel: users and groups, network, displays, privacy and security, printers, software updates and so on. Time Machine is the built-in backup tool. Point it at an external drive or a supported network destination and it keeps hourly, daily and weekly backups, letting you restore single files or the whole Mac. FileVault is full-disk encryption. Turn it on in Privacy and Security, and store the recovery key safely, because without it or an authorized user's password the data cannot be recovered by anyone, including you.",
   "Several tools help with daily work. Keychain is the macOS password manager: Keychain Access stores website and Wi-Fi passwords, certificates and secure notes, and iCloud Keychain syncs passwords across the user's Apple devices. Repeated password prompts after a password change are often a keychain issue, because the keychain is still locked with the old password. Spotlight (Command + Space) searches files, apps, settings and more, and is the quickest way to launch anything. Mission Control shows all open windows and virtual desktops (Spaces) so you can switch between them; you open it with a trackpad swipe or its keyboard key. Other items worth knowing include the Dock, Finder, iCloud, trackpad gestures, and Remote Disc for using another computer's optical drive.",
   "The remaining tools cover the command line, storage and frozen apps. Terminal gives a Unix command-line shell (zsh by default in current versions), where Linux-style commands such as `ls`, `cd`, `sudo` and `ps` work. Disk Utility manages drives: erase and format with APFS (Apple File System), Mac OS Extended, exFAT or FAT, partition, create disk images, and run First Aid to check and repair a volume. Force Quit ends a frozen app; press Command + Option + Esc, or choose it from the Apple menu. Activity Monitor is the Mac's equivalent of Task Manager, showing CPU (central processing unit), memory, energy, disk and network use per process.",
   "A mapping table helps Windows technicians most. Activity Monitor is Task Manager, Force Quit is End task, FileVault is BitLocker, Time Machine is File History or Windows backup, Disk Utility is Disk Management plus chkdsk, Spotlight is Windows search, System Settings is the Settings app, and Keychain is Credential Manager. When an exam question describes a Mac task in Windows terms, translate it and the answer usually follows.",
   "Consider a worked example. A designer's Mac freezes in one app and she has an important deadline. You press Command + Option + Esc, select the frozen app and choose Force Quit, which returns control without restarting. She then mentions that her external drive shows errors, so you open Disk Utility, select the volume and run First Aid. Finally you notice she has no backups, so you connect a spare external drive, enable Time Machine and confirm FileVault is on with the recovery key stored in the company's records.",
   "A few mistakes are especially common: running the app directly from the mounted .dmg instead of copying it to Applications, so it disappears when the image is ejected; expecting dragging an app to the Trash to remove every component a .pkg installed; turning on FileVault without saving the recovery key; confusing Keychain (passwords) with FileVault (disk encryption); and looking for Task Manager instead of Activity Monitor. Another trap is treating Time Machine as optional, when it is the simplest way to protect a Mac user's files.",
   "Exam questions typically describe a Mac task in plain words. \"Drag the application into the Applications folder\" describes installing from a .dmg. \"An installer wizard that places files in system locations\" is a .pkg. \"Encrypt the entire disk\" is FileVault. \"Restore last Tuesday's version of a file\" is Time Machine. \"Saved passwords and certificates\" is Keychain. \"Find and launch anything quickly\" is Spotlight. \"See all open windows and desktops\" is Mission Control. \"Repair a volume\" is Disk Utility First Aid. \"App is unresponsive\" is Force Quit."
  ],
  "analogy": "Installing from a .dmg is like receiving furniture in a delivery van. The van (the mounted disk image) arrives, you carry the sofa (the .app) into your living room (the Applications folder), and the van drives away when you eject it. If you sit on the sofa while it is still in the van, it leaves with the van, which is exactly what happens when people run an app from the mounted image. A .pkg is more like an installer crew that also runs wiring through your walls, which is why removing it can leave pieces behind.",
  "terms": [
   [
    ".dmg",
    "A macOS disk image file that mounts like a drive and usually contains an app to drag into Applications."
   ],
   [
    ".pkg",
    "A macOS installer package that runs a wizard and can install components in several system locations."
   ],
   [
    ".app",
    "A macOS application bundle: a folder-like package containing the program and its resources."
   ],
   [
    "Gatekeeper",
    "The macOS protection that checks downloaded apps are signed and notarized and warns before opening others."
   ],
   [
    "Time Machine",
    "The built-in macOS backup tool that keeps hourly, daily and weekly versions on an external or network drive."
   ],
   [
    "FileVault",
    "macOS full-disk encryption, protected by the user's password and a recovery key."
   ],
   [
    "Keychain",
    "The macOS password manager that stores passwords, certificates and secure notes."
   ],
   [
    "Spotlight",
    "The macOS system-wide search, opened with Command + Space."
   ],
   [
    "Disk Utility",
    "The macOS tool for erasing, formatting, partitioning and repairing drives with First Aid."
   ],
   [
    "Force Quit",
    "Ends an unresponsive macOS app, opened with Command + Option + Esc."
   ]
  ],
  "example": "After changing her network password, a Mac user keeps getting prompts to unlock the login keychain and to re-enter her Wi-Fi password. The technician explains that the keychain still uses her old password, opens Keychain Access and updates the keychain password so the stored credentials match and the prompts stop.",
  "mistakes": [
   [
    "You can run an app straight from the opened .dmg window.",
    "The .dmg is a temporary mounted image. Drag the .app into the Applications folder first; otherwise the app disappears when the image is ejected or the Mac restarts."
   ],
   [
    "Dragging any app to the Trash removes it completely.",
    "That works for most .app bundles, but software installed from a .pkg may have placed components in system locations. Use the vendor's uninstaller when one is provided."
   ],
   [
    "Keychain and FileVault both encrypt the disk.",
    "Keychain stores passwords, certificates and secure notes. FileVault encrypts the entire disk."
   ],
   [
    "Turning on FileVault is enough on its own.",
    "Store the recovery key safely. Without it or an authorized user's password, the encrypted data cannot be recovered."
   ]
  ],
  "tryit": [
   [
    "At Lantern Bookkeeping, a Mac user accidentally saved over a client spreadsheet this morning and needs the version from yesterday afternoon. An external drive is always plugged into her Mac, and you see a clock icon in the menu bar. What do you do?",
    "Use Time Machine. The menu bar icon and the external drive indicate Time Machine is backing up. Open the folder containing the spreadsheet, enter Time Machine, browse back to yesterday afternoon, select the file and click Restore (you can keep both versions if asked). Time Machine keeps hourly, daily and weekly versions, so a version from yesterday should be available."
   ],
   [
    "A user downloads a utility from a website and macOS refuses to open it, warning that the developer cannot be verified. He asks you how to switch the warning off permanently. How do you respond?",
    "Explain that this is Gatekeeper protecting the Mac by checking that apps are signed and notarized. Do not disable it. Confirm where the app came from: if possible, get it from the App Store or the developer's official source. Only open it after you have verified it is legitimate and approved by the organization."
   ]
  ],
  "tip": "Map Mac tools to Windows equivalents: Activity Monitor is Task Manager, Force Quit is End task, FileVault is BitLocker, Time Machine is backup, Disk Utility is Disk Management plus chkdsk, Spotlight is search.",
  "check": [
   [
    "How do you install a typical app delivered as a .dmg?",
    "Open the .dmg to mount it, drag the .app into the Applications folder, then eject the image."
   ],
   [
    "Which macOS feature provides full-disk encryption?",
    "FileVault, enabled in Privacy and Security, with the recovery key stored safely."
   ],
   [
    "What key combination opens the Force Quit window?",
    "Command + Option + Esc."
   ],
   [
    "A user needs yesterday's version of a document on a Mac. Which tool restores it?",
    "Time Machine, which keeps versioned backups on an external or network destination."
   ],
   [
    "What is the macOS equivalent of Windows Task Manager?",
    "Activity Monitor, which shows CPU, memory, energy, disk and network use per process."
   ]
  ]
 },
 {
  "t": "Linux: file and permission commands (ls, cp, mv, rm, chmod, chown, sudo, su), package managers (apt, dnf), ip, df, top, ps, grep, find, man, key files (/etc/passwd, /etc/shadow, /etc/hosts, /etc/fstab, /etc/resolv.conf)",
  "hook": "At Elm Street Community Health, the patient-portal web server runs Ubuntu, and the Linux administrator is on vacation. At 9 a.m. the front desk calls: the new appointment page shows \"403 Forbidden\" instead of the form. Kofi, the developer who uploaded it, says he copied the file correctly and suggests running `chmod 777` on everything \"just to be safe.\" You have a remote shell open and a blinking cursor. You know the page exists; the question is who is allowed to read it. What do the permission letters on that file really mean, and why is Kofi's quick fix a bad idea?",
  "simple": "Linux is an operating system you usually control by typing commands. Everything lives in one big folder tree starting at `/`, with no C: or D: drives. Every file has an owner, a group and everyone else, and each of those can be allowed to read, write or run the file. Think of a shared office document with three permission levels: the author, the team and the whole company. The `chmod` command changes those permissions, and `chown` changes who owns the file. Because the top account, called root, can do anything, people use `sudo` to borrow root powers for one command. Software is installed with a package manager, like an app store you use from the keyboard.",
  "body": [
   "Linux is managed mostly from a shell such as bash. Commands are case-sensitive, paths use forward slashes and there are no drive letters: everything hangs off the root directory `/`, and other disks are mounted into that tree at folders such as `/mnt/data`. When in doubt, read the manual page with `man`, as in `man chmod`, and press q to quit. The A+ exam expects you to recognize the core commands, read a permission string and know which configuration file does what.",
   "Working with files uses a small set of commands. `ls` lists a directory (`ls -l` shows permissions, owner, size and date; `ls -a` includes hidden dotfiles whose names start with a period). `cp` copies (`cp -r` for directories), `mv` moves or renames, and `rm` deletes (`rm -r` deletes a directory tree). There is no Recycle Bin at the shell, so `rm` is permanent. `pwd` prints the current directory and `cd` changes it. `grep` searches text for a pattern, as in `grep error /var/log/syslog`, and is often combined with pipes: `ps aux | grep ssh`. `find` searches the file system by name, size or date, for example `find /home -name '*.pdf'`.",
   "Permissions are shown by `ls -l` as a string such as `-rwxr-x---`. The first character is the type (`-` for a file, `d` for a directory), then three sets of read (r), write (w) and execute (x) for the owner (user), the group and others. `chmod` changes them, either symbolically (`chmod g+w file`) or in octal, where r=4, w=2 and x=1 are added together. So `chmod 750 script.sh` gives the owner rwx (7), the group r-x (5) and others nothing (0). `chown` changes ownership, for example `chown alice:staff report.txt`, which sets the owner to alice and the group to staff.",
   "Elevation deserves care. Running as the root superuser for daily work is risky, because one typo can damage the whole system. Administrators therefore use `sudo` to run a single command with elevated rights: it asks for the user's own password, checks that the user is allowed and logs the action. `su` switches to another user, by default root, and requires that account's password. On many systems the root account has no usable password at all, so `sudo` is the normal route to administrative tasks.",
   "Software is installed with a package manager, which downloads from trusted repositories, verifies packages and resolves dependencies, so you do not hunt for installers on websites. Debian and Ubuntu use `apt`: `sudo apt update` refreshes the package list, then `sudo apt upgrade` or `sudo apt install nginx`. Red Hat, Fedora and related distributions use `dnf` (the successor to yum): `sudo dnf install nginx`, `sudo dnf upgrade`. System and network information comes from a few more commands. `ip addr` (or `ip a`) shows interfaces and addresses, and `ip route` shows the routing table; `ip` replaces the older `ifconfig`. `df -h` shows free space per mounted file system in human-readable units. `top` is a live, updating view of processes and CPU (central processing unit) and memory use, and `ps aux` gives a snapshot list of all processes.",
   "Finally, know these configuration files. `/etc/passwd` lists user accounts (name, user ID, home directory and login shell) and is readable by everyone; despite its name it no longer holds passwords. `/etc/shadow` stores the hashed passwords and password-aging data and is readable only by root. `/etc/hosts` maps hostnames to IP (Internet Protocol) addresses locally and is normally checked before DNS (Domain Name System). `/etc/fstab` lists file systems to mount at boot and where. `/etc/resolv.conf` lists the DNS servers the system uses.",
   "```\nls -l /var/www\nsudo chmod 644 index.html\nsudo chown www-data:www-data index.html\nsudo apt update && sudo apt install htop\ndf -h\n```",
   "Consider a worked example. A web page on an Ubuntu server returns \"permission denied.\" You run `ls -l` and see the file is `-rw-------` owned by root, so the web server account cannot read it. You run `sudo chown www-data:www-data index.html` and `sudo chmod 644 index.html`, giving the owner read and write and everyone else read only. The page loads, and nobody but the owner can change it.",
   "Some mistakes are classic: using `chmod 777` to \"fix\" access, which lets anyone modify the file; confusing `su` (switch user, needs the target's password) with `sudo` (one command, your own password); expecting `apt` on a Red Hat system; thinking `/etc/passwd` holds password hashes; and running `rm -r` without checking the path.",
   "Exam questions test recognition. \"Show free disk space\" is `df`. \"Live view of processes\" is `top`; \"snapshot of processes\" is `ps`. \"Search inside files for text\" is `grep`; \"locate files by name\" is `find`. \"Change permissions\" is `chmod`; \"change owner\" is `chown`. \"Install software on Ubuntu\" is `apt`; \"on Fedora or Red Hat\" is `dnf`. \"Where are password hashes?\" is `/etc/shadow`. \"Which DNS servers?\" is `/etc/resolv.conf`. \"Mount a drive at every boot\" is `/etc/fstab`. Octal digits decode as 7 rwx, 6 rw-, 5 r-x and 4 r--."
  ],
  "analogy": "Linux permissions work like keys to a shared apartment's rooms. Each file has three key rings: one for the owner, one for housemates (the group) and one for visitors (others). Each ring can hold a read key, a write key and an execute key. chmod changes which keys are on each ring, and chown hands the apartment's deed to someone else. sudo is like borrowing the landlord's master key for one errand, with your name written in the log. chmod 777 is leaving every key under the doormat. The analogy stops at directories, where execute means permission to enter.",
  "mnemonic": "Octal permissions add up 4-2-1 in r-w-x order: Read 4, Write 2, eXecute 1. So 7 = 4+2+1 (rwx), 6 = 4+2 (rw-), 5 = 4+1 (r-x), 4 = read only.",
  "terms": [
   [
    "chmod",
    "Changes file permissions using symbolic notation or octal numbers such as 750."
   ],
   [
    "chown",
    "Changes the owner and group of a file or directory."
   ],
   [
    "sudo",
    "Runs a single command with elevated privileges using the user's own password, with logging."
   ],
   [
    "su",
    "Switches to another user account, root by default, using that account's password."
   ],
   [
    "Package manager",
    "A tool such as apt or dnf that installs and updates software from repositories and resolves dependencies."
   ],
   [
    "/etc/passwd",
    "The world-readable file listing user accounts, user IDs, home directories and login shells, not password hashes."
   ],
   [
    "/etc/shadow",
    "The root-only file that stores hashed passwords and password-aging information."
   ],
   [
    "/etc/fstab",
    "The file listing file systems to mount automatically at boot."
   ],
   [
    "/etc/resolv.conf",
    "The file listing the DNS servers a Linux system uses."
   ]
  ],
  "example": "A Linux workstation cannot resolve internal names, while other machines can. The technician runs `ip addr` to confirm an address, pings the gateway successfully, then checks `/etc/resolv.conf` and finds it points to a retired DNS server. After correcting the network configuration so the right DNS server is used, name resolution works.",
  "mistakes": [
   [
    "chmod 777 is a safe way to fix any permission problem.",
    "777 gives read, write and execute to everyone, so any user or compromised service can modify the file. Grant only what is needed, for example 644 for a web page with the correct owner set by chown."
   ],
   [
    "su and sudo are the same thing.",
    "sudo runs one command with elevated rights using your own password and logs it. su switches to another account, root by default, and needs that account's password."
   ],
   [
    "Password hashes are stored in /etc/passwd.",
    "/etc/passwd lists accounts and is readable by everyone. The hashes are in /etc/shadow, which only root can read."
   ],
   [
    "apt works on every Linux distribution.",
    "apt is for Debian and Ubuntu. Red Hat, Fedora and related distributions use dnf."
   ]
  ],
  "tryit": [
   [
    "At Juniper Farms Co-op, a Linux file server's backup disk is mounted by hand every time the server restarts, and twice the nightly backup failed because someone forgot. The disk is always connected. Which file do you edit so it mounts automatically, and what precaution do you take?",
    "Edit /etc/fstab to add an entry for the backup disk with its mount point and file system type, so it mounts at every boot. Back up /etc/fstab first and test the new entry (for example with sudo mount -a) before restarting, because a bad fstab entry can stop the server from booting normally."
   ],
   [
    "You run ls -l on a script and see -rwxr-xr--. Who can run it?",
    "The owner (rwx) and members of the group (r-x) can execute it. Others have only read (r--), so they can view it but not run it. In octal, this is 754."
   ]
  ],
  "tip": "Octal permissions come up often: 7 = rwx, 6 = rw-, 5 = r-x, 4 = r--. Also remember that /etc/passwd holds accounts but /etc/shadow holds the password hashes.",
  "check": [
   [
    "What permissions does chmod 640 give?",
    "Owner read and write, group read, others no access."
   ],
   [
    "Which command installs a package on Ubuntu?",
    "sudo apt install followed by the package name, usually after sudo apt update."
   ],
   [
    "Which file stores hashed user passwords on Linux?",
    "/etc/shadow, which only root can read."
   ],
   [
    "What is the difference between sudo and su?",
    "sudo runs one command with elevated rights using your own password; su switches to another account, root by default, using that account's password."
   ],
   [
    "Which command shows free space on each mounted file system in readable units?",
    "df -h."
   ]
  ]
 },
 {
  "t": "Installing applications: 32- vs 64-bit, RAM/CPU/GPU/storage requirements, distribution methods (ISO, download, image) and business impact",
  "hook": "Ironwood Engineering has bought a new 3D modeling package, and the partners want it on all twenty workstations by Monday. Gabriel, an eager junior drafter, has already found a download link on a forum that promises a faster install, and he has tried it on the oldest PC in the office, where the installer refuses to start. Meanwhile, the office manager reminds you that last year's software rollout rebooted every PC at 2 p.m. on a deadline day. Installing software looks like clicking Next a few times. What should you check before anyone clicks Install, and who besides the user could this change affect?",
  "simple": "Before installing a program, a technician makes sure it will actually work and will not cause trouble. First, the computer must be the right type: programs come in 32-bit and 64-bit versions, and a 64-bit program cannot run on a 32-bit system. Second, the computer must meet the program's needs for memory, processor, graphics and disk space, the way a recipe needs certain ingredients and a big enough oven. Third, the program should come from a trusted source, not a random website. Finally, think about everyone else: will the install slow the network, need a restart during work hours, or require more licenses? Checking these first prevents most failed installs.",
  "body": [
   "Installing software looks simple, but a technician's job is to make sure it will actually run, fits the hardware, is licensed and does not disrupt the business. Before you click Install, you check compatibility and requirements, choose a trustworthy distribution method and think about who else the change will affect. The A+ exam presents a failed or risky installation and asks what should have been checked.",
   "Start with architecture, because it is the most common reason an installer refuses to run. A 32-bit (x86) application can address a limited amount of memory, about 4 GB, while a 64-bit (x64) application can use far more. A 64-bit Windows OS runs both 64-bit apps and most 32-bit apps, using a compatibility layer and keeping 32-bit programs in the `C:\\Program Files (x86)` folder, while 64-bit programs go in `C:\\Program Files`. A 32-bit OS cannot run 64-bit applications at all, and 64-bit drivers are required on a 64-bit OS. Windows 11 is available only in 64-bit versions. ARM-based devices use a different instruction set, so check that the software offers an ARM version or is supported under emulation. You can see the OS type in Settings, System, About, on the line \"System type,\" which reads something like \"64-bit operating system, x64-based processor.\"",
   "Next, compare the published system requirements with the machine. RAM (random access memory): an app that needs more memory than is free will page to disk and become sluggish, with the disk light constantly busy. CPU (central processing unit): check the required speed, number of cores and any required instruction features. GPU (graphics processing unit): graphics-heavy software such as CAD (computer-aided design), video editing or games may need a dedicated graphics card, a minimum amount of video RAM (VRAM) or support for a particular graphics API (application programming interface). Storage: check free space for the installation and its data, and whether the app expects an SSD (solid-state drive) for acceptable performance.",
   "Requirements go beyond hardware. Check the supported OS versions, any required frameworks or runtimes, external hardware tokens or peripherals, and whether the user needs administrator rights to install. Vendors often list both minimum and recommended requirements; the minimum lets the software start, while the recommended level is what makes it pleasant to use for real work.",
   "Software can be distributed in several ways. Downloads from the vendor's website or an app store are common for individual installs; always use trusted sources and verify the file's hash when the vendor publishes one, which confirms the file was not corrupted or tampered with. An ISO file is a disc image that you mount (double-click in Windows) or burn, often used for large suites and OS media. In organizations, applications are frequently built into a standard OS image or pushed by management tools, so hundreds of machines get the same tested version without technicians visiting each desk. Physical media such as USB drives are still used in some environments, especially where networks are isolated.",
   "Finally, consider business impact, which the exam divides into device, network, operation and business. On the device, a new installation can hurt performance or stability, conflict with existing software or change file associations. On the network, large downloads or updates can consume bandwidth, and new software may open ports. For operations, an install may need a reboot during working hours or cause downtime for a line-of-business system. For the business, every user needs a valid license, support must be arranged, and unapproved software can break compliance. That is why organizations test software first, schedule deployments, follow change management and document which version is installed where.",
   "Consider a worked example. An engineering firm wants to roll out a new 3D modeling package to twenty workstations. You check the requirements and find it needs a 64-bit OS, a dedicated GPU with a stated minimum of VRAM and more RAM than five of the older machines have. Those five get upgrades or replacements first. The vendor supplies an ISO, so you test the install on one machine, package it for the management tool, schedule the push for after hours to avoid saturating the office connection, and confirm there are twenty licenses before anyone launches it.",
   "Watch for these mistakes: assuming a 64-bit installer will work on a 32-bit OS, checking only CPU speed and ignoring GPU or VRAM requirements, downloading installers from unofficial mirrors, installing during business hours without warning when a reboot is required, and forgetting licensing, which is a business impact even if the software runs perfectly. Another trap is thinking an app runs as 64-bit just because the computer has a 64-bit processor; the OS installed is what matters.",
   "Exam questions give clues. \"Installer will not run on an older PC\" suggests a 32-bit OS with a 64-bit app. \"App is extremely slow and the disk is constantly busy\" suggests insufficient RAM. \"Video editing software displays errors or will not start\" points to GPU or VRAM requirements. \"Deploy the same version to hundreds of machines\" points to an image or management tool. \"Verify the download has not been tampered with\" means compare its hash. \"Consider licenses, downtime and bandwidth\" is business impact."
  ],
  "analogy": "Think of 32-bit and 64-bit like train track gauges. A 64-bit operating system is a station built with a converter that accepts both narrow-gauge (32-bit) and wide-gauge (64-bit) trains, parking the narrow ones on a separate platform, Program Files (x86). A 32-bit operating system has only narrow track, so a wide 64-bit train simply cannot pull in, no matter how good the engine is. The analogy stops working for hardware: a powerful 64-bit processor running a 32-bit OS is still a narrow-track station, because the OS sets the gauge.",
  "mnemonic": "Business impact has four areas: \"Don't Neglect Our Business\" for Device, Network, Operation, Business.",
  "terms": [
   [
    "32-bit (x86)",
    "An architecture whose applications can address about 4 GB of memory; runs on 32-bit and most 64-bit systems."
   ],
   [
    "64-bit (x64)",
    "An architecture that can address far more memory and requires a 64-bit operating system."
   ],
   [
    "System requirements",
    "The vendor's minimum and recommended OS, CPU, RAM, GPU and storage needed to run software."
   ],
   [
    "VRAM",
    "Video RAM on a graphics card, required in minimum amounts by graphics-heavy applications."
   ],
   [
    "ISO file",
    "A disc image used to distribute large software suites or operating systems."
   ],
   [
    "Hash verification",
    "Comparing a downloaded file's hash with the vendor's published value to confirm it is unaltered."
   ],
   [
    "Business impact",
    "The effect of an installation on devices, the network, operations and licensing or compliance."
   ]
  ],
  "example": "A charity volunteer downloads a donor-management program onto an old office PC, and the installer immediately fails. The technician checks System Information and finds a 32-bit edition of Windows, while the program is 64-bit only. Because the hardware supports 64-bit, they plan a clean 64-bit OS installation after backing up data, then install the program successfully.",
  "mistakes": [
   [
    "A 64-bit processor means the computer can run 64-bit software.",
    "The operating system decides. A 64-bit CPU running a 32-bit OS cannot run 64-bit applications. Check System type in Settings, System, About."
   ],
   [
    "If the CPU meets the requirement, the software will run well.",
    "Graphics-heavy software also needs a suitable GPU and enough VRAM, and every app needs enough RAM and storage. Check all of the requirements, not just CPU speed."
   ],
   [
    "Any download link that offers the right file name is fine.",
    "Use the vendor's site, an official store or the organization's management tool, and compare the file's hash with the vendor's published value when one is provided."
   ],
   [
    "If the software installs and runs, the job is done.",
    "Business impact includes licenses for every user, downtime from reboots, bandwidth for large deployments and compliance. These must be planned even when the install itself works."
   ]
  ],
  "tryit": [
   [
    "Birchwood Dental's office manager wants a new imaging viewer installed on all 12 front-office PCs today at 1 p.m. The installer is 3 GB, the vendor notes that a restart is required, and the office has a modest internet connection shared with the card terminals. What do you recommend?",
    "Do not push it at 1 p.m. Test on one PC first, then schedule the deployment after hours. Download the installer once and distribute it locally (or through the management tool) instead of 12 separate downloads that would saturate the connection the card terminals rely on. Warn users about the restart, confirm there are 12 licenses and follow the change management process."
   ],
   [
    "A user's new photo editor is painfully slow. Task Manager shows memory almost fully used and the disk constantly busy while the editor is open. The CPU sits at 20 percent. What requirement was most likely missed?",
    "RAM. When an application needs more memory than is available, Windows pages to disk, so the disk stays busy and everything slows down while the CPU is mostly idle. Adding memory, or closing other programs, addresses it."
   ]
  ],
  "tip": "A 64-bit OS runs 32-bit apps, but a 32-bit OS cannot run 64-bit apps. If an installer refuses to run on an older machine, check whether the OS is 32-bit before blaming the software.",
  "check": [
   [
    "Where does 64-bit Windows install 32-bit programs?",
    "In C:\\Program Files (x86), while 64-bit programs go in C:\\Program Files."
   ],
   [
    "A graphics program starts but renders very poorly on a laptop with integrated graphics. What requirement was likely missed?",
    "The GPU or VRAM requirement, which may call for a dedicated graphics card."
   ],
   [
    "Why should you verify a downloaded installer's hash?",
    "To confirm the file matches what the vendor published and was not corrupted or tampered with."
   ],
   [
    "Name two business impacts to consider before a large deployment.",
    "Examples include licensing for every user, reboots or downtime, network bandwidth use and compatibility with existing software."
   ],
   [
    "Can a 32-bit edition of Windows run a 64-bit application?",
    "No. A 32-bit OS cannot run 64-bit applications, even if the processor is 64-bit capable."
   ]
  ]
 },
 {
  "t": "Cloud productivity tools: email, synced storage, collaboration suites, account setup and licensing",
  "hook": "It is Monday morning at Cedar Ridge Dental, and Priya, the new office manager, is sitting at a fresh laptop with a sticky note of passwords. She can sign in to the web portal, but there is no inbox, the office apps refuse to activate, and the shared patient-scheduling folder is nowhere to be seen. Meanwhile, Tom from the front desk calls to say a spreadsheet he deleted on Friday has vanished from his phone and his home computer too. Two tickets, one hour, and the dentist wants everyone working by nine. Where do you look first, and why did a single delete reach every one of Tom's devices?",
  "simple": "Many companies no longer keep their own email and file servers in a back room. Instead they rent them from a big provider over the internet, which people call the cloud. Each worker gets an account, and a license (a paid seat) that switches on the apps they are allowed to use. Their files are kept in online storage and copied to every device they sign in on, so the same folder appears on the laptop, the phone and the web. Think of a shared family photo album that updates on everyone's phone: add a picture and everyone sees it, but delete one and it disappears for everyone too. That is why syncing is handy but is not the same as keeping a safe backup copy.",
  "body": [
   "Most organizations now run their everyday productivity software as cloud services, such as Microsoft 365 or Google Workspace. Instead of installing a mail server and a file server on site, the company subscribes to hosted email, file storage, calendars and collaboration apps, and the provider runs, patches and backs up the servers. This shifts the technician's work away from maintaining hardware and toward managing accounts, devices and settings. As a support technician, you will set up accounts, connect devices, fix sync problems, manage sharing and assign licenses. The exam focuses on how these services behave and what commonly goes wrong, rather than on any one vendor's menus.",
   "Email is usually the first service a new user needs. A cloud mailbox can be reached through a web browser, a desktop client such as Outlook, or a mobile mail app. Modern cloud email uses the provider's own protocols or Exchange-style synchronization, which keep mail, calendar and contacts in step across every device. Some clients instead use IMAP (Internet Message Access Protocol) for receiving, which leaves mail on the server and syncs folders, and SMTP (Simple Mail Transfer Protocol) for sending. The older POP3 (Post Office Protocol version 3) downloads mail to one device and usually removes it from the server, so it is rarely appropriate for business: messages read on the laptop never show up on the phone. Most cloud accounts now require modern authentication with multifactor sign-in, so older clients that only understand a username and password may fail to connect even when the password is correct.",
   "Synced storage is the second pillar. Services such as OneDrive, Google Drive, Dropbox and iCloud Drive keep a copy of files in the cloud and synchronize them to each signed-in device. Files-on-demand features show every file in the folder but download the content only when the user opens it, which saves local disk space on laptops with small SSDs (solid-state drives). Typical support issues are easy to recognize once you know them: a sync conflict when two people edit the same file offline, which often produces a duplicate copy with the device name added; sync paused because the storage quota is full; and files that will not upload because their names contain characters the service does not allow or their paths are too long.",
   "The most important idea in this topic is that sync is not the same as backup. Sync faithfully copies every change, including the bad ones. If a user deletes a file, the deletion syncs everywhere. If ransomware encrypts a synced folder, the encrypted copies replace the good ones on every device within minutes. Recovery therefore relies on the service's version history, its recycle bin, and a real backup that is kept separately and is not overwritten by ordinary sync. When a user says a file vanished from all of their devices at once, the fix is to restore from version history or the recycle bin, not to troubleshoot the sync client.",
   "Collaboration suites combine documents, spreadsheets and presentations that several people can edit at the same time in a browser, along with chat, video meetings and shared team spaces. Real-time co-authoring removes the old problem of emailed attachments with conflicting edits, because everyone works on the single copy stored in the cloud and can see each other's cursors. Sharing permissions matter a great deal here. A link set to 'anyone with the link' can expose data to outsiders if it is forwarded, so organizations usually restrict sharing to internal users or named people, and many apply DLP (data loss prevention) rules that warn or block when sensitive content such as card numbers is shared externally.",
   "Account setup generally happens in an administrator console. The usual sequence is to create the user, add them to the right groups so they inherit access to shared mailboxes and team files, assign a license, enforce MFA (multifactor authentication), and let the user complete sign-in on their devices. Deprovisioning at offboarding is just as important: disable sign-in, transfer or retain their mailbox and files according to the retention policy, and then reclaim the license so the organization stops paying for it. Licensing is typically per user and subscription-based, billed monthly or yearly, and different plans include different apps, storage amounts and features. A license tied to a user usually allows installation on a set number of that user's devices, while shared or device-based licensing exists for kiosks and shared PCs.",
   "Consider a worked example. A new sales hire can sign in to the web portal but has no mailbox, and the desktop office apps say they cannot be activated. You open the admin console and see that the account exists but no license is assigned. You assign the plan that includes email and desktop apps; after a short wait, the mailbox is created and activation succeeds. You also confirm that MFA is enrolled, add her to the sales group so she sees the team's shared files, and set her synced storage to files-on-demand because her laptop has a small SSD. Notice that rebuilding her Outlook profile would have wasted time, because the client was never the problem.",
   "Several mistakes come up again and again: treating synced storage as a backup; using POP3 for a user with several devices; forgetting to reclaim licenses when staff leave, which wastes money; sharing folders with 'anyone with the link' for convenience; and troubleshooting Outlook profiles when the real problem is a missing license. Another trap is disabling a departing user's account and deleting it before arranging retention of their mailbox and files as policy requires.",
   "Exam questions use recognizable clues. 'User has no mailbox' or 'cannot activate office apps' points to license assignment. 'Deleted file vanished from every device' shows that sync replicates deletions, so restore from version history or the recycle bin. 'Mail is only on one device' suggests POP3; IMAP or Exchange-style sync fixes it. 'Two people editing the same document at once' is co-authoring in a collaboration suite. 'Sync stopped' often means the quota is full or a file name is invalid. 'Employee left' means disable sign-in, retain data and reclaim the license."
  ],
  "analogy": "Synced storage is like a set of walkie-talkies tuned to the same channel. Whatever one person says is heard on every handset instantly, which is wonderful for keeping everyone current. But if someone shouts the wrong thing, everyone hears that too, and there is no taking it back from the handsets themselves. A backup is the recording kept in a locked drawer. The analogy stops short in one way: most cloud services do keep a version history, which acts like a short recording, but it is limited and is not a substitute for a separate backup.",
  "terms": [
   [
    "Cloud productivity suite",
    "A subscription service providing hosted email, storage, office apps and collaboration tools, such as Microsoft 365 or Google Workspace."
   ],
   [
    "IMAP",
    "Internet Message Access Protocol, which keeps mail on the server and syncs folders across devices."
   ],
   [
    "POP3",
    "Post Office Protocol version 3, which downloads mail to a single device and usually removes it from the server."
   ],
   [
    "SMTP",
    "Simple Mail Transfer Protocol, used to send email."
   ],
   [
    "Synced storage",
    "A cloud service that keeps files synchronized across a user's devices, such as OneDrive or Google Drive."
   ],
   [
    "Files-on-demand",
    "A sync feature that lists all files but downloads content only when the file is opened."
   ],
   [
    "Co-authoring",
    "Several people editing the same cloud-stored document at the same time."
   ],
   [
    "License assignment",
    "Allocating a subscription plan to a user so they receive the included apps and services."
   ],
   [
    "Deprovisioning",
    "Disabling a departing user's access, handling their data per policy and reclaiming their license."
   ]
  ],
  "example": "Ransomware on a user's laptop encrypts his synced project folder, and within minutes the encrypted copies replace the originals on his other devices. Because the organization's cloud storage keeps version history, the technician cleans the laptop, then restores the folder to the version from before the infection, and reminds the team that sync is not a backup.",
  "mistakes": [
   [
    "Synced cloud storage means my files are backed up.",
    "Sync copies deletions, corruption and ransomware encryption to every device. Use version history, the recycle bin and a separate backup for recovery."
   ],
   [
    "A user with no mailbox needs a rebuilt Outlook profile.",
    "If the account has no license that includes email, there is no mailbox to connect to. Check license assignment in the admin console first."
   ],
   [
    "POP3 is fine because it still delivers mail.",
    "POP3 downloads mail to one device, so other devices never see those messages. IMAP or Exchange-style sync keeps every device in step."
   ],
   [
    "When someone leaves, just delete the account to free the license.",
    "Deleting first can destroy mail and files the organization must keep. Disable sign-in, retain or transfer data per policy, then reclaim the license."
   ]
  ],
  "tryit": [
   [
    "A marketing team shares a campaign folder using an 'anyone with the link' setting so an outside designer can reach it. Weeks later, the link appears in a public forum post. The folder contains unreleased pricing. The manager asks you how to set things up so outside partners can still collaborate. What do you recommend?",
    "Remove the open link and share the folder only with named external accounts, or invite the designer as a guest, with the least access needed and an expiration date if available. Restrict tenant sharing defaults to internal or named people, and consider a DLP rule that flags sensitive pricing data shared externally. This keeps collaboration while making access traceable and revocable."
   ],
   [
    "A remote employee's laptop shows a red icon on the sync client, and new files have not uploaded for two days. Her storage page shows 100 percent used. What is the likely cause and fix?",
    "The storage quota is full, so sync has paused. Free space by emptying the cloud recycle bin or removing large unneeded files, or assign a plan with more storage, then confirm the client resumes. Files-on-demand saves local disk space but does not reduce the cloud quota."
   ]
  ],
  "tip": "Cloud sync replicates deletions and ransomware-encrypted files too, so it is not a backup. If a user has no mailbox or cannot activate office apps, check license assignment first.",
  "check": [
   [
    "Why is synced cloud storage not a replacement for backup?",
    "Deletions, corruption and ransomware encryption sync to every device, so you need version history and separate backups."
   ],
   [
    "A user reads mail on a laptop but it never appears on her phone. Which protocol is likely in use?",
    "POP3, which downloads mail to one device; IMAP or Exchange-style sync keeps devices in step."
   ],
   [
    "What should happen to a cloud account when an employee leaves?",
    "Disable sign-in, retain or transfer data according to policy, and reclaim the license."
   ],
   [
    "A new user can sign in but has no mailbox. What do you check first?",
    "Whether a license that includes email has been assigned to the account."
   ]
  ]
 },
 {
  "t": "Physical security: access control vestibules, badge readers, video surveillance, alarm systems, locks, guards, bollards, fences",
  "hook": "You are reviewing camera footage at Lakeshore Logistics after a laptop and a network switch went missing over the weekend. The clip is almost boring: on Friday at 5:40 p.m., an employee badges through the side door, holds it politely for a man carrying a coffee tray, and walks on. The man drifts down the hallway, finds the wiring closet propped open for ventilation, and leaves twenty minutes later with a backpack that looks heavier. The badge system logged one entry. The camera recorded everything but stopped nothing. Your manager asks the obvious question: which control should have stopped him, and where?",
  "simple": "Physical security means protecting buildings, rooms and equipment from people who should not be there. It matters for computers because anyone who can touch a machine can steal it or plug something into it, no matter how good the passwords are. Good protection works in layers, like the layers of an onion: a fence around the site, a locked front door that opens only with an ID card, a guard at the desk, and locks on the rooms with the important equipment. Some tools stop people (fences, locks), and some tools notice and record what happened (cameras, alarms). Think of your home: the front door lock keeps people out, while a doorbell camera mostly tells you who came by.",
  "body": [
   "Physical security protects people, buildings and equipment from unauthorized physical access. It matters to IT because anyone who can touch a computer or server can steal it, plug in a malicious device, or boot it from their own media and bypass many software controls. Strong passwords and encryption help, but they are much weaker when an intruder can simply carry the server out of the building. Good physical security therefore uses several layers, so an intruder must defeat one barrier after another, and a failure in one layer is caught by the next. This idea is called defense in depth, and it is the frame for every question in this topic.",
   "The outer layer keeps vehicles and people at a distance. Fences mark the boundary and slow intruders; taller fences topped with barbed or razor wire deter more determined ones. Bollards are short, sturdy posts, often concrete or steel, placed in front of entrances or along walkways to stop vehicles from being driven into a building while still letting pedestrians walk between them. Lighting helps guards and cameras see and discourages intruders, and signage warns off casual trespassers. These controls are mostly deterrent and preventive: they make an attack harder and less attractive before anyone reaches a door.",
   "At the building entrance, access is controlled and recorded. Badge readers read an ID card, often using RFID (radio-frequency identification) or a smart card, and unlock the door only for authorized badges while logging who entered and when. Key fobs work the same way. Biometric readers check fingerprints, palms or faces. Because each badge is tied to one person, a lost or departed employee's badge can be revoked in the access system without changing any locks, and the log shows a time-stamped entry such as 'Badge 4471, J. Ortiz, Door 2 East, granted'. The weakness is that one valid badge can open the door for two people.",
   "An access control vestibule, formerly called a mantrap, closes that gap. It is a small space with two doors where only one can be open at a time. A person enters, the first door closes behind them, and only after authentication does the second door open. If someone tries to follow, the second door will not release. The vestibule stops tailgating, where an unauthorized person slips in behind someone who badged in, and its close cousin piggybacking, where the insider knowingly lets them through. Vestibules are often paired with a guard who watches the space.",
   "Security guards add human judgment that no device provides. They check IDs, sign in visitors, issue visitor badges, escort guests and respond to alarms. Many sites keep an access list of who is allowed in and a visitor log so there is a record of who was on site. Locks come in many forms: traditional keyed locks, cipher (keypad) locks that need a code, electronic locks tied to the badge system, and biometric locks. Inside the building, server rooms, network closets and even individual racks and cabinets should be locked. Cable locks secure laptops to desks, and privacy screens stop onlookers from reading displays. Remember that a keyed lock cannot tell you who opened it, while an electronic lock can.",
   "Detection and monitoring complete the picture. Video surveillance, using CCTV (closed-circuit television) or networked IP (Internet Protocol) cameras, deters wrongdoing when visible, records evidence and lets guards watch several areas at once. Alarm systems use door contacts, glass-break sensors and motion detectors to alert guards or a monitoring company when something happens after hours. Motion sensors can also switch on lights. Magnetometers (metal detectors) screen people at some high-security sites. The key exam distinction is between preventive controls such as fences, bollards, locks and vestibules, which stop access, and detective controls such as cameras and alarms, which notice and record it. Visible cameras also have a deterrent effect, but they do not physically block anyone.",
   "Consider a worked example. A company discovers that a stranger followed an employee through the badge-controlled front door and wandered into an unlocked network closet. The review recommends layers rather than a single fix: an access control vestibule at the main entrance to stop tailgating, a guard at reception to sign in and escort visitors, a badge reader with logging on the network closet door, cameras covering the entrance and the closet corridor, and a door alarm on the closet after hours. Staff also receive training to politely challenge people without visible badges, because the human layer is where this incident began.",
   "Common mistakes include thinking bollards stop people, when they stop vehicles; relying on cameras to prevent entry, when they mainly detect and record; assuming a badge reader alone prevents tailgating, since one valid badge can let two people through; leaving the server room secure but the wiring closet unlocked; and forgetting the human layer of guards and trained staff. Another trap is treating a keyed lock as auditable; only electronic systems log who opened a door and when.",
   "Exam questions match the control to the threat. 'Prevent a vehicle from being driven into the lobby' is bollards. 'Stop tailgating' or 'only one person may pass at a time' is an access control vestibule, often with guards. 'Know who entered the room and when' is badge readers with logging. 'After-hours break-ins' or 'evidence of who took the equipment' is alarms and video surveillance. 'Laptops stolen from desks' is cable locks. 'Mark the perimeter' is fencing. 'Verify visitors' identity and escort them' is guards."
  ],
  "analogy": "Think of an airport. Concrete barriers outside the terminal keep cars from reaching the doors (bollards). The boarding pass check is a badge reader. The jet bridge, where you move through one checkpoint at a time, works like a vestibule. Officers make judgment calls no machine can (guards), and cameras watch everything for later review. The analogy has a limit: airports screen everyone at the same checkpoint, while an office spreads its layers across the fence line, the front door and individual rooms such as the wiring closet.",
  "terms": [
   [
    "Defense in depth",
    "Using several layers of security controls so that one failure does not expose everything."
   ],
   [
    "Access control vestibule",
    "A two-door entry space that allows only one door open at a time, preventing tailgating. Formerly called a mantrap."
   ],
   [
    "Badge reader",
    "A device that reads an ID card or fob, unlocks for authorized users and logs entries."
   ],
   [
    "Bollard",
    "A short, sturdy post that blocks vehicles while allowing pedestrians to pass."
   ],
   [
    "Video surveillance",
    "Cameras that deter, monitor and record activity for evidence."
   ],
   [
    "Alarm system",
    "Sensors such as door contacts, glass-break and motion detectors that alert when triggered."
   ],
   [
    "Tailgating",
    "Following an authorized person through a secured entrance without authenticating."
   ],
   [
    "Preventive vs detective control",
    "Preventive controls stop an event, such as locks; detective controls notice and record it, such as cameras."
   ]
  ],
  "example": "A data center places concrete bollards in front of its glass lobby, surrounds the site with a tall fence, and requires staff to pass a guard desk and then an access control vestibule with a badge and fingerprint. Inside, each customer's rack is locked, and cameras record every aisle so any access can be reviewed later.",
  "mistakes": [
   [
    "Bollards keep intruders out of the building.",
    "Bollards block vehicles, not people. Pedestrians walk between them by design. Use fences, locks and vestibules to control people."
   ],
   [
    "Cameras prevent unauthorized entry.",
    "Cameras are mainly detective: they record and alert. Visible cameras deter some people, but they never physically stop anyone."
   ],
   [
    "A badge reader on the front door stops tailgating.",
    "One valid badge can let two people through. An access control vestibule, often with a guard, is the control that stops tailgating."
   ],
   [
    "A keyed lock on the server room tells you who went in.",
    "Keyed locks keep no record. Badge readers and other electronic locks log who opened the door and when, and badges can be revoked individually."
   ]
  ],
  "tryit": [
   [
    "A small clinic keeps its server in a closet with a keyed lock. Six staff members have keys, two former employees never returned theirs, and nobody knows who was in the closet when a cable was unplugged last week. The office manager has a modest budget and asks for one change. What do you recommend?",
    "Replace the keyed lock with a badge reader or electronic lock tied to individual credentials. It solves both problems at once: former employees' badges can be revoked without rekeying, and every entry is logged with a name and time. A camera on the closet door is a good second step for evidence, but it would not prevent entry on its own."
   ]
  ],
  "tip": "Bollards stop vehicles, not people. Access control vestibules stop tailgating. Video surveillance mainly detects and records rather than prevents, although visible cameras also deter.",
  "check": [
   [
    "Which control is designed to stop tailgating at an entrance?",
    "An access control vestibule, which lets only one authenticated person through at a time."
   ],
   [
    "What threat do bollards address?",
    "Vehicles being driven into buildings or pedestrian areas."
   ],
   [
    "Why are badge readers preferred over keyed locks for sensitive rooms?",
    "They can be revoked per person and log who entered and when."
   ],
   [
    "Is video surveillance primarily preventive or detective?",
    "Detective, since it records and alerts, though visible cameras also have a deterrent effect."
   ]
  ]
 },
 {
  "t": "Logical security: least privilege, zero trust, MFA methods (authenticator apps, SMS, hardware tokens, email), SSO, MDM, DLP, IAM, directory services, access control lists",
  "hook": "It is 11:48 p.m., and Dana, a payroll specialist at Willow Creek Credit Union, is brushing her teeth when her phone buzzes. A sign-in approval request. Then another. Then six more in a row, each asking her to tap Approve. She did not try to sign in to anything. Half asleep, she is tempted to tap just to make it stop. The next morning she forwards a screenshot to you at the help desk with a single line: 'Is this normal?' What does that flood of prompts tell you about her password, and what should the credit union change so one tired tap cannot open everything?",
  "simple": "Logical security is about the invisible locks inside computers: who is allowed to sign in, and what they are allowed to do once they are in. A few big ideas carry most of the weight. Give each person only the access their job needs, the way a hotel key card opens only your room. Do not trust anyone just because they are inside the building; check every time. Ask for more than a password, such as a code from your phone, so a stolen password alone is not enough. Let people sign in once and reach all their work apps, but protect that one sign-in carefully. Finally, use tools that manage company phones and that watch for private data, like card numbers, leaving the company by mistake.",
  "body": [
   "Logical security uses software and configuration, rather than locks and walls, to control who can use systems and data. Its starting principle is least privilege: give each user, service and device only the access it needs to do its job, and no more. A receptionist does not need administrator rights; a backup service account does not need to log on interactively. Least privilege limits the damage from mistakes, malware and stolen accounts, because whatever runs under an account can do only what that account can do. A help-desk technician, for example, should use a standard account for email and a separate, elevated account only when a task requires it.",
   "Zero trust takes this further. Traditional networks trusted anything inside the firewall, so one compromised laptop could reach almost everything. A zero trust model assumes no user or device is trusted by default, wherever it is. Every request is authenticated, authorized and checked against conditions, such as whether the device is managed and patched and whether the sign-in location is normal, before access is granted, and access is granted per resource rather than to the whole network. 'Never trust, always verify' is the usual summary. Zero trust is an approach, not a single product: it combines identity, device health and per-resource authorization.",
   "Authentication proves identity, and MFA (multifactor authentication) requires two or more different factor types: something you know (password, PIN), something you have (phone, token, smart card) and something you are (fingerprint, face). Two passwords, or a password plus a security question, are still single-factor, because both are something you know. Common MFA methods, roughly from strongest to weakest, are these. Hardware tokens and security keys are physical devices that generate codes or perform cryptographic sign-in; those built on modern standards are strongly phishing-resistant. Authenticator apps generate TOTP (time-based one-time password) codes or approve push notifications on a phone. SMS (Short Message Service) text codes are convenient but vulnerable to SIM (subscriber identity module) swapping and interception. Email codes are only as secure as the mailbox that receives them. Any MFA is far better than a password alone.",
   "Push approvals bring their own risk. In an MFA fatigue attack, someone who already has a user's password triggers sign-in after sign-in, hoping the user taps Approve to make the prompts stop. A burst of unexpected prompts is therefore a strong sign that the password is compromised. Defenses include number matching, where the user must type a number shown on the sign-in screen, showing the sign-in location in the prompt, and training users to deny and report.",
   "SSO (single sign-on) lets a user authenticate once and then reach many applications without signing in again, using trust between an identity provider and each application. SSO improves the user experience, reduces password reuse and lets administrators disable one account to cut off everything, but it makes that one account very valuable, so SSO should always be paired with MFA. IAM (identity and access management) is the overall discipline of creating identities, assigning roles and permissions, reviewing access and removing it when people change jobs or leave. It relies on directory services, central databases of users, groups and computers such as Microsoft Active Directory, which other systems use for authentication and lookups.",
   "ACLs (access control lists) are the lists attached to resources, such as files, folders, printers or network devices, that state which users or groups are allowed or denied which actions. On a file server, an ACL might grant the Accounting group Modify and the Sales group Read. On a router or firewall, an ACL permits or blocks traffic by address, protocol and port, for example allowing TCP (Transmission Control Protocol) port 443 to a web server and denying everything else.",
   "Two more tools protect data on endpoints. MDM (mobile device management) enrolls phones, tablets and laptops so the organization can enforce passcodes and encryption, push apps and settings, and remotely lock or wipe devices. DLP (data loss prevention) inspects email, files, cloud storage and endpoints for sensitive content such as card numbers or health records and blocks or alerts when it is about to leave the organization improperly. A simple way to keep them apart: MDM manages the device, DLP watches the data.",
   "Consider a worked example. A company's staff sign in to a dozen separate cloud apps, each with its own password, and several reused passwords were exposed in a breach elsewhere. You recommend SSO through the company directory so there is one strong identity per person, enforced MFA using an authenticator app, with hardware security keys for administrators, and conditional access that allows sign-in only from MDM-enrolled devices. During offboarding, disabling one directory account now removes access to every app at once, and a DLP policy flags attempts to email customer card numbers outside the company.",
   "Common mistakes include counting a password plus a PIN as MFA; assuming SMS codes are as strong as a hardware key; thinking SSO removes the need for MFA; confusing MDM with DLP; and giving everyone administrator rights to reduce help-desk tickets, which breaks least privilege. Exam questions use clear cues. 'Only the access needed for the job' is least privilege. 'Never trust, always verify, regardless of location' is zero trust. 'Sign in once, reach many apps' is SSO. 'Remotely wipe a lost phone or enforce a passcode' is MDM. 'Block emails containing credit card numbers' is DLP. 'Central database of users and groups' is a directory service. 'Permissions list on a folder' or 'router rule allowing port 443' is an ACL. 'Weakest MFA method listed' is usually SMS or email."
  ],
  "analogy": "Zero trust works like a hospital where every door has a badge reader. Walking through the main entrance does not let you into the pharmacy, the operating rooms or the records office; each door checks your badge again and decides based on your role and the time. A traditional network is like a building where getting past reception opens every room. The comparison breaks down in one place: zero trust also checks the health of your device, which has no real equivalent for a person walking down a hallway.",
  "terms": [
   [
    "Least privilege",
    "Granting users and services only the minimum access required for their tasks."
   ],
   [
    "Zero trust",
    "A model where no user or device is trusted by default and every access request is verified."
   ],
   [
    "Multifactor authentication (MFA)",
    "Authentication using two or more different factor types: something you know, have and are."
   ],
   [
    "Single sign-on (SSO)",
    "Authenticating once to an identity provider to access many applications."
   ],
   [
    "Identity and access management (IAM)",
    "The discipline of creating identities, assigning access, reviewing it and removing it."
   ],
   [
    "Directory service",
    "A central database of users, groups and computers, such as Active Directory, used for authentication."
   ],
   [
    "Access control list (ACL)",
    "A list of permissions or rules stating who or what traffic is allowed or denied."
   ],
   [
    "Mobile device management (MDM)",
    "Central enrollment and control of devices to enforce policy and remotely lock or wipe them."
   ],
   [
    "Data loss prevention (DLP)",
    "Tools that detect and block sensitive data from leaving the organization improperly."
   ],
   [
    "MFA fatigue",
    "An attack that floods a user with push approval requests hoping they approve one."
   ]
  ],
  "example": "An employee receives a burst of MFA push notifications late at night that she did not request. She denies them and reports it. The security team realizes her password was stolen, resets it, switches her to number-matching push approvals and reminds staff that unexpected MFA prompts mean someone else has their password.",
  "mistakes": [
   [
    "A password plus a PIN or security question is MFA.",
    "Both are something you know, so it is single-factor. MFA needs different factor types, such as a password plus a phone or a fingerprint."
   ],
   [
    "SMS codes are as strong as a hardware security key.",
    "SMS codes can be intercepted or stolen through SIM swapping. Hardware keys built on modern standards are phishing-resistant and are the strongest listed option."
   ],
   [
    "With SSO in place, MFA is no longer needed.",
    "SSO concentrates access in one account, which makes that account more valuable to attackers. SSO should always be paired with MFA."
   ],
   [
    "MDM and DLP do the same job.",
    "MDM manages devices, such as passcodes and remote wipe. DLP inspects content and blocks sensitive data from leaving."
   ]
  ],
  "tryit": [
   [
    "A small accounting firm gives every employee local administrator rights because it cuts down on install requests. Last month one employee opened a malicious attachment, and the malware installed a service and disabled antivirus. The owner asks what single principle would have limited the damage. What do you tell her?",
    "Least privilege. If the employee had worked in a standard account, the malware would have run with standard rights and could not have installed a system service or turned off protection without an elevation prompt. Approved software can be deployed centrally or installed by IT using a separate admin account."
   ],
   [
    "A company wants to let employees reach the payroll app from home, but only from company laptops that are encrypted and up to date. Which combination of ideas and tools from this lesson fits?",
    "Zero trust with conditional access: verify the user with SSO plus MFA, and check device health through MDM enrollment and compliance before granting access to that one app. Access is granted per resource and per request, not because the user is on a trusted network."
   ]
  ],
  "tip": "A password plus a PIN is still single-factor, because both are something you know. Of the listed MFA methods, SMS and email codes are the weakest and hardware tokens the strongest.",
  "check": [
   [
    "Does a password and a security question count as MFA?",
    "No, both are something you know, so it is single-factor authentication."
   ],
   [
    "What is the main risk of SSO, and how is it reduced?",
    "One compromised account opens many apps, so SSO is paired with MFA."
   ],
   [
    "Which technology would block an email containing customer credit card numbers from leaving the company?",
    "Data loss prevention (DLP)."
   ],
   [
    "What principle says a help-desk technician should not have domain administrator rights for daily work?",
    "Least privilege, which grants only the access a role needs."
   ],
   [
    "A user gets many push approval prompts she did not request. What does this indicate?",
    "Someone likely has her password and is attempting an MFA fatigue attack; she should deny, report and have the password reset."
   ]
  ]
 },
 {
  "t": "Windows security: Microsoft Defender Antivirus and Firewall, users and groups, NTFS vs share permissions, inheritance, UAC, BitLocker and BitLocker To Go, EFS, Windows Hello, run as administrator",
  "hook": "A ticket lands in your queue at Pinegrove Engineering: 'Sales can open the Finance folder. How?' The share was set up years ago with Everyone: Full Control, and nobody remembers why. Ten minutes later a second ticket arrives from the CFO, Marcus, whose laptop was left on a train last night. He wants to know whether the quarterly projections on it are now in someone else's hands. Two very different problems, both answered by features already built into Windows. Which permission actually wins when a share and a folder disagree, and what would have to be true for Marcus to sleep tonight?",
  "simple": "Windows comes with its own security tools, and a technician's job is to switch them on and set them up correctly. There is a built-in virus scanner and a firewall that controls what network traffic is allowed. People are sorted into groups, and you give rights to the group rather than to each person. When folders are shared over the network, two sets of rules apply, and the stricter one always wins, like a club where both the doorman and the room host must say yes. Encryption scrambles a whole drive or single files so a stolen laptop is useless to a thief. Finally, Windows asks for permission before big system changes, and lets you sign in with a face, fingerprint or a PIN tied to that one computer.",
  "body": [
   "Windows includes a set of built-in security features that you will configure and troubleshoot constantly. Microsoft Defender Antivirus provides real-time protection against malware, cloud-delivered protection and scheduled or on-demand scans. You manage it in the Windows Security app, where you can check that definitions are current, run a quick, full or offline scan, and review quarantined items. If a third-party antivirus is installed, Defender typically steps aside so the two do not conflict. Windows Defender Firewall filters inbound and outbound traffic per network profile (domain, private and public), which is why a laptop can be relaxed on the office domain and strict on café Wi-Fi. You can allow apps and open ports in the basic settings and create detailed rules in the Windows Defender Firewall with Advanced Security console.",
   "Accounts are organized into users and groups. Built-in groups include Administrators, with full control of the computer; Users, the standard users who can run programs but not change system-wide settings; Guests, for the Guest account, which is disabled by default; and Power Users, kept only for legacy compatibility. Assign permissions to groups rather than individuals so access stays easy to manage as people join and leave. Day to day, people should use standard accounts, which applies least privilege at the desktop.",
   "UAC (User Account Control) enforces that habit. Even an administrator runs with standard rights until an action needs elevation. UAC then shows a consent prompt to an administrator, or asks a standard user to enter administrator credentials. That pause stops malware from silently making system-wide changes, such as installing services or editing protected registry keys. 'Run as administrator', chosen by right-clicking a program, starts just that one program elevated, which is the safe way to run an admin tool without signing in as an administrator for the whole session. Disabling UAC to stop the prompts removes a key protection and is never the right answer.",
   "Folders on a network have two kinds of permission. Share permissions (Full Control, Change and Read) apply only when the folder is accessed over the network. NTFS (New Technology File System) permissions (Full Control, Modify, Read and Execute, List folder contents, Read and Write) apply both locally and over the network. When both apply, Windows calculates each set separately and the most restrictive result wins. Within each set, permissions from multiple groups add up, but an explicit Deny overrides Allow. A user who signs in locally at the server is governed by NTFS alone, because share permissions do not apply to local access.",
   "By default NTFS permissions are inherited: a new file or subfolder takes the permissions of its parent, which keeps large folder trees consistent. You can disable inheritance on a folder, in the Advanced Security Settings, to set explicit permissions instead. Moving and copying behave differently. When you move a file within the same NTFS volume, it keeps its permissions. When you copy it, or move it to a different volume, it is created fresh at the destination and inherits the destination folder's permissions. This is a common source of both accidental exposure and puzzling 'access denied' tickets.",
   "Encryption protects data at rest. BitLocker encrypts an entire volume, normally using the computer's TPM (Trusted Platform Module) chip to protect the key, so a stolen drive is unreadable in another machine. You must store the recovery key safely, for example in the organization's directory or the user's Microsoft account, because hardware changes or firmware updates can trigger a recovery prompt. BitLocker To Go applies the same protection to removable drives such as USB sticks, typically unlocked with a password. EFS (Encrypting File System) encrypts individual files and folders on NTFS and ties them to the user's certificate, so other users on the same PC cannot open them; losing that certificate can mean losing the files. Full BitLocker management and EFS need Pro or higher editions of Windows.",
   "Windows Hello provides passwordless sign-in with a PIN, fingerprint or facial recognition. The Windows Hello PIN is tied to that specific device's hardware, so a stolen PIN is useless on any other machine, unlike a password that works anywhere. Together with MFA (multifactor authentication), it is Microsoft's preferred way to sign in.",
   "Consider a worked example. A folder `D:\\Finance` is shared with the share permission Everyone: Full Control, while its NTFS permissions give the Accounting group Modify and the Sales group Read. When a sales user opens it over the network, the share allows Full Control but NTFS allows Read, so the effective permission is Read. If you later add a Deny Write entry for a contractor in Accounting, that Deny wins over the group's Allow. A manager then copies a report from `D:\\Finance` to `D:\\Public`; because it was copied, it takes on Public's permissions, which could expose it.",
   "Common mistakes include adding up share and NTFS permissions instead of taking the most restrictive; forgetting that Deny overrides Allow; assuming moved and copied files behave the same; disabling UAC; turning on BitLocker without backing up the recovery key; and confusing BitLocker (whole volume) with EFS (individual files per user). Exam questions cue these features clearly. 'Laptop stolen, protect the whole drive' is BitLocker. 'Encrypt a USB stick' is BitLocker To Go. 'Encrypt one user's files so others on the PC cannot read them' is EFS. 'Prompt before system changes' is UAC. 'Sign in with face or a device-bound PIN' is Windows Hello. 'Effective permission over the network' means take the most restrictive of share and NTFS. 'File copied to another folder has different permissions' means it inherited the destination's permissions."
  ],
  "analogy": "Share and NTFS permissions work like a concert with two checkpoints. The gate at the stadium (share permissions) decides whether you get into the venue from outside, and your seat ticket (NTFS permissions) decides which section you may sit in. You end up limited by whichever is stricter: a full-access gate pass with a balcony ticket still puts you in the balcony. The analogy has a limit: staff who are already inside the building, like a user signed in at the server, skip the gate entirely and only the seat ticket applies.",
  "terms": [
   [
    "Microsoft Defender Antivirus",
    "Built-in Windows anti-malware with real-time, cloud-delivered and scheduled scanning."
   ],
   [
    "Windows Defender Firewall",
    "Built-in firewall that filters inbound and outbound traffic per network profile: domain, private and public."
   ],
   [
    "User Account Control (UAC)",
    "A feature that runs users with standard rights and prompts before elevating for system changes."
   ],
   [
    "Share permissions",
    "Full Control, Change and Read permissions that apply only to network access to a shared folder."
   ],
   [
    "NTFS permissions",
    "File and folder permissions that apply both locally and over the network."
   ],
   [
    "Inheritance",
    "Child files and folders automatically receiving the permissions of their parent folder."
   ],
   [
    "BitLocker",
    "Full-volume encryption for Windows, usually protected by the TPM and a recovery key."
   ],
   [
    "BitLocker To Go",
    "BitLocker encryption for removable drives such as USB flash drives."
   ],
   [
    "EFS",
    "Encrypting File System, which encrypts individual NTFS files tied to a user's certificate."
   ],
   [
    "Windows Hello",
    "Device-bound sign-in using a PIN, fingerprint or facial recognition."
   ]
  ],
  "example": "An auditor finds that a laptop containing payroll data was left in a taxi. Because the laptop had BitLocker enabled with the recovery key escrowed in the company directory, the IT team documents that the data was encrypted at rest, and the incident is recorded as a lost device rather than a data breach.",
  "mistakes": [
   [
    "Share Full Control plus NTFS Read gives Full Control over the network.",
    "Windows applies the most restrictive of the two sets, so the effective network permission is Read."
   ],
   [
    "Copying and moving a file keep the same permissions.",
    "A move within the same NTFS volume keeps permissions. A copy, or a move to another volume, inherits the destination folder's permissions."
   ],
   [
    "Turning off UAC fixes annoying prompts safely.",
    "UAC is what stops malware and users from silently making system-wide changes. Use 'Run as administrator' for specific tools instead."
   ],
   [
    "EFS and BitLocker are interchangeable.",
    "BitLocker encrypts the whole volume to protect against theft. EFS encrypts individual files for one user so other users on the same PC cannot read them."
   ]
  ],
  "tryit": [
   [
    "A shared folder on a file server has the share permission Read for the Marketing group. NTFS gives Marketing Modify. A marketing user complains she can edit files when she signs in directly at the server console but not when she connects from her desk. Why?",
    "Over the network both sets apply and the most restrictive wins, so she gets Read. At the server console only NTFS applies, so she gets Modify. If she should edit over the network, raise the share permission to Change, or set the share broadly and control access with NTFS."
   ],
   [
    "A field engineer carries project drawings on a USB stick between client sites and his laptop. His manager worries about the stick being lost. Which built-in feature fits, and what must the engineer keep safe?",
    "BitLocker To Go, which encrypts the removable drive and is typically unlocked with a password. He must keep the password and the recovery key stored safely, because without them the data cannot be recovered."
   ]
  ],
  "tip": "For combined share and NTFS permissions, take the most restrictive. Copying a file inherits the destination's permissions; moving within the same volume keeps the original permissions.",
  "check": [
   [
    "Share permission is Read and NTFS permission is Modify. What is the effective network permission?",
    "Read, because the most restrictive of the two sets applies."
   ],
   [
    "What happens to NTFS permissions when a file is moved within the same volume?",
    "It keeps its original permissions."
   ],
   [
    "Which feature encrypts a USB flash drive?",
    "BitLocker To Go."
   ],
   [
    "Why should users not disable UAC?",
    "UAC prompts before elevation, preventing malware and users from silently making system-wide changes."
   ],
   [
    "Why is a Windows Hello PIN considered safer than a password?",
    "It is bound to that device's hardware, so a stolen PIN cannot be used on another machine."
   ]
  ]
 },
 {
  "t": "Wireless security: WPA2 vs WPA3, AES vs TKIP, RADIUS, TACACS+, Kerberos, multifactor",
  "hook": "At Bayview Architecture, the Wi-Fi password is printed on a laminated card taped to the break-room fridge. It has not changed in four years. Contractors know it, two former employees know it, and last week someone in the parking lot was seen with a laptop open on the hood of a car. The office manager, Elena, asks you to 'make the Wi-Fi secure' without forcing everyone to learn a new password every month. The router menu offers WPA2, WPA3, AES, TKIP and a box labeled RADIUS server. Which choices actually solve Elena's problem, and which only look like they do?",
  "simple": "Wi-Fi signals travel through walls, so anyone nearby can try to join or listen in. Wireless security does two jobs: deciding who may join, and scrambling the traffic so eavesdroppers cannot read it. WPA2 and WPA3 are the rule books, and WPA3 is the newer, stronger one. AES is the strong scrambling method; TKIP is an old, weak one you should never pick. At home, everyone shares one Wi-Fi password. In a business, each person signs in with their own work username, checked by a central server called RADIUS, so when someone leaves you just turn off their account. It is like giving each employee their own key card instead of one shared front door key that everyone, including former staff, still has.",
  "body": [
   "Wireless networks broadcast through walls, so anyone nearby can try to join or listen. Wireless security protocols provide two things: authentication, which decides who may join, and encryption, which keeps traffic private. The original WEP (Wired Equivalent Privacy) and the first WPA (Wi-Fi Protected Access) are broken and should never be used. The A+ exam asks you to pick the strongest option a device supports and to recognize which authentication protocol fits which job.",
   "WPA2 has been the standard for many years. It uses AES (Advanced Encryption Standard) through CCMP (Counter Mode with Cipher Block Chaining Message Authentication Code Protocol) for strong encryption. WPA2-Personal, also called PSK (pre-shared key), uses one passphrase for everyone, so anyone who knows the passphrase can join, and a captured connection handshake can be attacked offline by guessing weak passphrases. A long, random passphrase raises the cost of that guessing, but it does nothing about the people who already know it.",
   "WPA3 is the current standard. WPA3-Personal replaces the pre-shared key handshake with SAE (Simultaneous Authentication of Equals), which resists offline password guessing and provides forward secrecy, so recording traffic now and learning the password later does not decrypt it. WPA3 also requires Protected Management Frames, which help prevent attackers from forcing devices off the network with forged disconnect messages. Many access points offer a mixed WPA2/WPA3 transition mode so older devices can still connect; it is useful for compatibility but is not as strong as WPA3-only.",
   "AES versus TKIP is a separate choice. TKIP (Temporal Key Integrity Protocol) was a stopgap used with the original WPA to patch WEP's weaknesses on old hardware. It is deprecated and weak. AES is strong and is the one you should select. If a router offers 'WPA2-PSK (AES)' versus 'WPA/WPA2 (TKIP)', choose AES; selecting TKIP can also limit speeds on newer Wi-Fi standards. In short, the protocol (WPA2 or WPA3) and the cipher (AES or TKIP) are separate settings, and the right answer is the newest protocol the devices support, with AES.",
   "Businesses use the Enterprise modes, WPA2-Enterprise or WPA3-Enterprise, which authenticate each user individually through 802.1X instead of a shared password. The access point passes the login to an authentication server, usually a RADIUS (Remote Authentication Dial-In User Service) server, which checks credentials against a directory such as Active Directory. Each user has their own credentials, so a departing employee is simply disabled instead of changing the Wi-Fi password for everyone, and logs show which account connected. RADIUS is an open standard, uses UDP (User Datagram Protocol) and encrypts only the password in its packets. It is common for Wi-Fi, VPN (virtual private network) and network access for end users.",
   "TACACS+ (Terminal Access Controller Access-Control System Plus) is another AAA (authentication, authorization and accounting) protocol, originally from Cisco. It uses TCP (Transmission Control Protocol), encrypts the entire payload and separates authentication, authorization and accounting into distinct functions. That separation is why it is typically used to control administrator access to network devices such as routers and switches, with per-command authorization and detailed logging of what each engineer typed.",
   "Kerberos is the ticket-based authentication protocol used by Active Directory domains. A user authenticates once to the KDC (Key Distribution Center) and receives a ticket, then uses it to request service tickets for file shares, printers and other resources without resending the password. This supports single sign-on within the domain. Kerberos depends on reasonably synchronized clocks, because tickets carry timestamps, so a large time difference between a PC and the domain controller causes sign-in failures. MFA (multifactor authentication) can protect wireless and remote access too, for example certificates on managed devices plus user credentials, or RADIUS integrated with an MFA service for VPN sign-ins.",
   "Consider a worked example. A growing office uses WPA2-Personal with one passphrase that has been shared with staff, contractors and former employees for years. You replace it with WPA3-Enterprise where devices support it, with a WPA2/WPA3 transition mode for a few older laptops, and point the access points at a RADIUS server that checks Active Directory accounts. Staff now sign in with their own credentials, and when a contractor leaves, disabling their account removes Wi-Fi access immediately. Network engineers, meanwhile, authenticate to switches through TACACS+ so each command they run is authorized and logged.",
   "Common mistakes include choosing TKIP because it appears alongside WPA2 in a menu; believing a long WPA2-Personal passphrase solves the problem of former staff still knowing it; confusing RADIUS with TACACS+; forgetting that Kerberos needs synchronized time; and assuming transition mode is as strong as WPA3-only. Exam questions use these clue words. 'Strongest encryption for a home router' is WPA3 with AES, or WPA2 with AES if WPA3 is unavailable. 'Resists offline dictionary attacks' or 'SAE' is WPA3-Personal. 'Each user signs in to Wi-Fi with their own domain credentials' is Enterprise mode with 802.1X and RADIUS. 'Administrator access to routers with per-command authorization' or 'encrypts the entire packet, uses TCP' is TACACS+. 'Tickets' or 'Key Distribution Center' is Kerberos. 'Legacy, deprecated cipher' is TKIP."
  ],
  "analogy": "WPA2-Personal is like an apartment building where every resident shares one front door code. It works until someone moves out and still remembers it. Enterprise mode with RADIUS is like giving each resident a personal key card checked against the building's tenant list; when someone leaves, the manager deactivates just that card. The analogy stops working on the encryption side: the door code or card decides who gets in, while AES separately scrambles what is said inside, and that cipher choice is made independently.",
  "mnemonic": "TACACS+ is the protocol of T's: TCP transport, Total payload encryption, and Tight per-command control of network devices. RADIUS, by contrast, rides on UDP, encrypts only the password and serves end users joining Wi-Fi or VPN.",
  "terms": [
   [
    "WPA2",
    "Wi-Fi security standard using AES-CCMP, in Personal (pre-shared key) or Enterprise (802.1X) modes."
   ],
   [
    "WPA3",
    "The current Wi-Fi security standard, using SAE in Personal mode and requiring Protected Management Frames."
   ],
   [
    "SAE",
    "Simultaneous Authentication of Equals, the WPA3-Personal handshake that resists offline password guessing."
   ],
   [
    "AES",
    "Advanced Encryption Standard, the strong cipher used by WPA2 and WPA3."
   ],
   [
    "TKIP",
    "Temporal Key Integrity Protocol, a deprecated cipher from the original WPA."
   ],
   [
    "RADIUS",
    "An open AAA protocol over UDP, commonly used for Wi-Fi, VPN and network access authentication."
   ],
   [
    "TACACS+",
    "A Cisco-originated AAA protocol over TCP that encrypts the whole payload, used for device administration."
   ],
   [
    "Kerberos",
    "The ticket-based authentication protocol used in Active Directory domains for single sign-on."
   ],
   [
    "802.1X",
    "Port-based network access control that passes authentication to a server such as RADIUS."
   ]
  ],
  "example": "A home user's older router offers WEP, WPA-TKIP and WPA2-AES. Her new laptop supports WPA3, but the router does not. The technician selects WPA2 with AES, sets a long unique passphrase and updates the router firmware, then recommends replacing the router with one that supports WPA3 at the next opportunity.",
  "mistakes": [
   [
    "WPA2 with TKIP is a good choice because it says WPA2.",
    "The cipher matters separately from the protocol. TKIP is deprecated and weak; always choose AES."
   ],
   [
    "A longer WPA2-Personal passphrase fixes the problem of former staff knowing it.",
    "Length resists guessing but does not remove knowledge. Per-user authentication with Enterprise mode and RADIUS lets you disable individuals."
   ],
   [
    "RADIUS and TACACS+ are interchangeable.",
    "RADIUS uses UDP, encrypts only the password and is typical for end-user network access. TACACS+ uses TCP, encrypts everything and is typical for administrator access to network devices."
   ],
   [
    "WPA2/WPA3 transition mode gives full WPA3 protection.",
    "Transition mode exists for compatibility with older devices and is not as strong as WPA3-only."
   ]
  ],
  "tryit": [
   [
    "A PC in a branch office suddenly cannot sign in to the domain, showing an error that the user cannot be authenticated, while other PCs work fine. You notice the PC's clock is several hours off after a CMOS battery failure. What is the likely cause?",
    "Kerberos depends on synchronized time, and the large clock difference makes its tickets invalid. Correct the time, sync it with the domain's time source and replace the CMOS battery so the problem does not return."
   ],
   [
    "A network team wants engineers to sign in to routers and switches with their own accounts, limit which commands junior staff may run and keep a record of every command. Which protocol fits best?",
    "TACACS+, because it separates authentication, authorization and accounting, supports per-command authorization and logging, uses TCP and encrypts the entire payload."
   ]
  ],
  "tip": "RADIUS uses UDP, encrypts only the password and is common for Wi-Fi and VPN users. TACACS+ uses TCP, encrypts everything and is common for admin access to network devices. Always choose AES over TKIP and WPA3 over WPA2 when available.",
  "check": [
   [
    "Which Wi-Fi feature in WPA3-Personal resists offline password guessing?",
    "SAE, Simultaneous Authentication of Equals, which replaces the pre-shared key handshake."
   ],
   [
    "A router offers WPA2 with TKIP or with AES. Which should you choose and why?",
    "AES, because TKIP is deprecated and weak while AES provides strong encryption."
   ],
   [
    "Which protocol would you use to authenticate administrators to switches with per-command authorization?",
    "TACACS+, which uses TCP, encrypts the full payload and separates AAA functions."
   ],
   [
    "Why might Kerberos sign-ins fail on a PC whose clock is badly wrong?",
    "Kerberos tickets depend on synchronized time, so a large clock difference causes authentication to fail."
   ]
  ]
 },
 {
  "t": "Malware: virus, trojan, rootkit, ransomware, keylogger, spyware, adware, cryptominer, boot sector virus, stalkerware, fileless malware; tools such as anti-malware, recovery console, EDR/MDR/XDR, email security gateways",
  "hook": "Three tickets arrive at the Northfield Community College help desk before lunch. The library's checkout PCs run hot with fans roaring even when nobody is using them. A professor says her browser home page keeps changing to a shopping site and pop-ups cover her lecture slides. And a student worker, Jordan, quietly asks whether someone could be reading his texts, because his ex keeps mentioning places he has been. Three different complaints, possibly three different kinds of malware, each calling for a different response. How do you tell them apart from the symptoms alone, and which tools do you reach for?",
  "simple": "Malware is any program built to cause harm. The exam wants you to name the type from what it does, the way a doctor names an illness from the symptoms. Some types spread by hiding inside other files. Some pretend to be useful apps. Some hide so deeply that the computer cannot see them. Some lock your files and demand money. Others quietly watch you, record your typing, show endless ads or secretly use your computer's power to earn digital money for someone else. To fight them, you use antivirus software, special start-up tools that clean the computer while the malware is asleep, and services that watch company computers for strange behavior. Think of it like pests in a house: you need to know whether you have ants, mice or termites before you pick the right treatment.",
  "body": [
   "Malware is any software designed to harm a system or its user, and the exam expects you to identify each type from its behavior or symptoms, then choose the right tool to deal with it. It helps to group malware by how it spreads, how it hides and what it does. Start with how it spreads. A virus attaches itself to a legitimate program or file and spreads when that host is run or shared; it needs human action to spread. A boot sector virus infects the boot sector or MBR (master boot record), so it loads before the OS (operating system) and before the antivirus software, which makes it hard to remove from within Windows. A trojan pretends to be useful software, such as a free game, a 'PDF converter' or a cracked application, but carries a hidden malicious function, often opening a backdoor for the attacker. Trojans do not replicate on their own.",
   "Some malware focuses on hiding. A rootkit modifies the operating system or firmware at a deep level so it can conceal files, processes and network connections from the OS and from security tools, giving attackers persistent, privileged access. A telltale sign is a threat that antivirus removes but that returns after every reboot, while Task Manager looks clean. Fileless malware avoids writing a traditional executable to disk; it lives in memory and abuses legitimate built-in tools such as PowerShell or WMI (Windows Management Instrumentation). Because there is no malicious file to match against a signature, detection depends on behavior, such as PowerShell launched by a document and reaching out to an unfamiliar address.",
   "Other malware is defined by what it does. Ransomware encrypts the victim's files, or threatens to publish stolen data, and demands payment; you typically see renamed files with unfamiliar extensions and a ransom note in each folder. Good offline or immutable backups are the main defense. A keylogger records keystrokes to steal passwords and messages; it may be software or a small hardware device plugged in between the keyboard and the PC. Spyware secretly gathers information about the user's activity. Stalkerware is spyware installed on someone's phone or computer, often by a partner or acquaintance, to track their location, messages and calls. Adware floods the user with advertisements and may change browser settings such as the home page or search engine. A cryptominer uses the victim's CPU (central processing unit) or GPU (graphics processing unit) to mine cryptocurrency, showing up as high resource use, heat, fan noise and battery drain with no matching user activity.",
   "Defenses come in layers. Anti-malware (antivirus) software scans files and behavior, must be kept updated and should run in real time. When malware prevents normal repair, you can use a recovery console or recovery environment, such as the Windows Recovery Environment or bootable offline scanners, to scan and repair while the infected OS is not running. This is particularly useful against rootkits and boot sector viruses, because they cannot hide or defend themselves when they are not loaded. Prevention also includes patching, least privilege, user training, disabling AutoRun, application allow-listing and reliable backups.",
   "Organizations add more advanced tools. EDR (endpoint detection and response) continuously records endpoint activity, detects suspicious behavior, and lets responders investigate and isolate a device from the network with a click. MDR (managed detection and response) is a service in which an outside security team monitors and responds using such tools on the organization's behalf, which suits organizations with no in-house team watching around the clock. XDR (extended detection and response) correlates data from endpoints, email, network, identity and cloud into one view, so a phishing email, the sign-in that followed and the process it launched appear as one incident. An email security gateway filters inbound and outbound mail, blocking spam, phishing, malicious attachments and dangerous links before they reach inboxes, since email is one of the most common ways malware arrives.",
   "Consider a worked example. Several laptops in a small firm run hot and slow, with fans at full speed even when idle, and Task Manager shows an unfamiliar process using most of the CPU. The pattern points to a cryptominer. The EDR console shows it arrived through a trojanized 'free PDF converter' downloaded from an unofficial site. The team isolates the laptops from the network using EDR, removes the malware following the standard removal procedure, blocks the site, and adds application allow-listing so unapproved installers cannot run.",
   "Common mistakes include calling every infection a virus; assuming a trojan spreads itself like a worm; trying to clean a rootkit from inside the running infected OS instead of from recovery or bootable media; relying on signature scanning alone against fileless malware; and treating synced cloud storage as protection against ransomware. Another trap is confusing EDR, which is a tool on endpoints, MDR, which is a managed service, and XDR, which is correlation across many data sources.",
   "Exam questions describe symptoms. 'Files renamed and encrypted with a ransom note' is ransomware. 'High CPU and fan noise with no user activity' is a cryptominer. 'Pop-ups and changed home page' is adware. 'Partner can see my location and messages' is stalkerware. 'Passwords stolen by recording typing' is a keylogger. 'Loads before the OS' is a boot sector virus or rootkit, which calls for scanning from recovery or bootable media. 'Lives only in memory using PowerShell' is fileless. 'Outside team monitors our endpoints' is MDR. 'Block malicious attachments before they reach users' is an email security gateway."
  ],
  "analogy": "A rootkit is like a burglar who has also taken over the building's security office. When you check the camera monitors, he has looped the footage so every hallway looks empty. Asking the security office whether anyone is inside will always get the answer no. The only reliable check is to come in from outside, with your own equipment, while he is not at the controls, which is what booting from recovery or offline scanning media does. Where the analogy stops: some rootkits live in firmware, which survives even a disk wipe, so reflashing firmware may be needed.",
  "terms": [
   [
    "Virus",
    "Malware that attaches to a host file or program and spreads when that host is run or shared."
   ],
   [
    "Boot sector virus",
    "Malware that infects the boot sector or master boot record so it loads before the OS."
   ],
   [
    "Trojan",
    "Malware disguised as legitimate software that carries a hidden malicious function and does not self-replicate."
   ],
   [
    "Rootkit",
    "Malware that hides deep in the OS or firmware to conceal itself and keep privileged access."
   ],
   [
    "Ransomware",
    "Malware that encrypts or steals data and demands payment."
   ],
   [
    "Stalkerware",
    "Spyware placed on a person's device, often by someone they know, to track location, messages and calls."
   ],
   [
    "Fileless malware",
    "Malware that runs in memory and abuses built-in tools instead of installing executable files."
   ],
   [
    "Cryptominer",
    "Malware that uses a victim's CPU or GPU to mine cryptocurrency."
   ],
   [
    "EDR / MDR / XDR",
    "Endpoint detection and response tool; managed detection and response service; extended detection and response across many data sources."
   ],
   [
    "Email security gateway",
    "A filter that blocks spam, phishing and malicious attachments before they reach mailboxes."
   ]
  ],
  "example": "A user reports that antivirus keeps finding and removing the same threat after every reboot, and the Task Manager process list looks clean. The technician suspects a rootkit, boots the PC from a trusted offline scanning image so the infected OS is not running, and the scan finds and removes the hidden component the live scans could not see.",
  "mistakes": [
   [
    "Every infection is a virus.",
    "Virus is one specific type that attaches to host files. Name the type by behavior: trojans disguise themselves, ransomware encrypts, cryptominers consume CPU, and so on."
   ],
   [
    "A trojan spreads by itself across the network.",
    "Trojans rely on the user installing them and do not self-replicate. Self-spreading malware that needs no user action is a worm."
   ],
   [
    "Run a full scan from Windows to remove a rootkit.",
    "A rootkit hides from the running OS and its tools. Scan from the recovery environment or bootable offline media while the infected OS is not running."
   ],
   [
    "EDR, MDR and XDR are three names for the same product.",
    "EDR is the endpoint tool, MDR is an outside team providing monitoring and response as a service, and XDR correlates data across endpoints, email, network, identity and cloud."
   ]
  ],
  "tryit": [
   [
    "A volunteer at a nonprofit says her phone battery drains fast, and her former partner seems to know where she goes and what she texts. She has not installed anything new that she remembers. The device is personal, not company-owned. What type of malware is suspected, and how should you respond?",
    "Stalkerware. Treat it with care for her safety: explain that removing it may alert the person who installed it, suggest she contact a trusted advocate or support service before acting, review installed apps and device admin permissions, change account passwords from a different, trusted device, and consider a full reset with updated OS. Document what you find in case she needs it."
   ],
   [
    "A finance PC shows no unusual files, and a signature scan finds nothing, but EDR alerts that a spreadsheet macro launched PowerShell, which then connected to an unknown external address. What kind of threat is this, and why did the scan miss it?",
    "Likely fileless malware. It ran in memory using a built-in tool, so there was no malicious file for signature scanning to match. Behavior-based detection in EDR caught it; the next steps are to isolate the PC and follow the malware removal procedure."
   ]
  ],
  "tip": "Match the symptom: encrypted files with a ransom note mean ransomware; unexplained high CPU means a cryptominer; malware loading before the OS means a boot sector virus or rootkit, which calls for scanning from recovery or bootable media.",
  "check": [
   [
    "How does a trojan differ from a virus?",
    "A trojan disguises itself as useful software and does not self-replicate, while a virus attaches to host files and spreads when they are run or shared."
   ],
   [
    "Why are rootkits often removed using bootable media?",
    "The rootkit hides from the running OS, so scanning while that OS is not running lets tools see and remove it."
   ],
   [
    "Which service provides an outside team to monitor and respond to endpoint threats?",
    "MDR, managed detection and response."
   ],
   [
    "What is the main defense against losing data to ransomware?",
    "Tested offline or immutable backups, supported by patching, anti-malware and user training."
   ]
  ]
 },
 {
  "t": "Social engineering and threats: phishing, vishing, smishing, QR code phishing, whaling, impersonation, tailgating, shoulder surfing, dumpster diving, evil twin, DoS/DDoS, zero-day, on-path, brute force, insider threat, SQL injection, XSS, BEC, supply chain",
  "hook": "It is Thursday afternoon at Maple Street Property Management, and Ana in accounts payable gets a polite email from a long-time landscaping supplier. It mentions last month's invoice by number, thanks her for the quick payments, and asks that this month's payment go to a new bank account because they have switched banks. It is marked urgent because their payroll is due Friday. Everything looks right: the logo, the signature, the tone. Ana's cursor hovers over the payment portal. Down the hall, someone in a high-visibility vest is asking reception for the key to the network closet. What should Ana do next, and what should reception say?",
  "simple": "Social engineering means tricking people instead of breaking computers. Attackers pretend to be someone you trust, such as your bank, your boss or the help desk, and they try to rush or scare you into clicking a link, sharing a password or sending money. The trick can come by email (phishing), phone call (vishing), text message (smishing) or a QR code you scan. Some attacks are physical, like following you through a locked door or peeking at your screen. Others are technical, like fake Wi-Fi networks or floods of traffic that knock a website offline. The best defense is simple: slow down, and check through a different channel. If your boss emails asking for gift cards, call your boss on a number you already know before doing anything.",
  "body": [
   "Social engineering manipulates people rather than technology, exploiting trust, urgency, fear, curiosity and the wish to be helpful. It is often the easiest way into an organization, so the best defenses are training, verification procedures and a culture where it is safe to say no or to double-check. The exam lists many threat names; your job is to recognize each from a short description and pick the control that reduces it. Grouping them by channel and target makes the list much easier to manage.",
   "Phishing uses fraudulent emails that imitate trusted senders to trick recipients into clicking a malicious link, opening an attachment or entering credentials on a fake sign-in page. Spear phishing targets specific people using personal details, such as their manager's name or a recent project. Whaling is phishing aimed at senior executives, who have more authority and access. Vishing (voice phishing) uses phone calls, often pretending to be the help desk or a bank. Smishing uses SMS (Short Message Service) text messages, such as a fake parcel delay notice. QR code phishing, sometimes called quishing, hides a malicious link in a QR (quick response) code on a poster, parking meter or email, bypassing link filters because the user scans it with a personal phone. Impersonation means pretending to be someone else, such as a technician, delivery driver or executive, to gain access or information.",
   "BEC (business email compromise) is a costly variant. Attackers take over or spoof an executive's or supplier's email account and ask staff to wire money, buy gift cards or change bank details. Because the message may come from a genuine, compromised account, technical filters often miss it. The defense is procedural: verify payment changes out of band by calling a known number already on file, never one in the email.",
   "Physical techniques target the building. Tailgating is following someone through a secure door without authenticating; piggybacking is the same with the insider's knowledge or help. Shoulder surfing is watching someone type a PIN or read their screen. Dumpster diving is searching trash for documents, notes and discarded media. Shredding, privacy screens, clean desk habits and access control vestibules counter them.",
   "Network and technical threats appear too. An evil twin is a rogue Wi-Fi access point that copies a legitimate network's name, such as a café's, to lure users so the attacker can intercept traffic. An on-path attack, formerly called man-in-the-middle, places the attacker between two parties to read or alter their communication; an evil twin is one way to get on-path. A DoS (denial of service) attack overwhelms a service so legitimate users cannot reach it; a DDoS (distributed denial of service) uses many compromised machines, a botnet, at once. DoS attacks target availability, not data theft. A brute force attack tries many passwords until one works; dictionary attacks and credential stuffing, which reuses passwords leaked from other sites, are related. Defenses include account lockout, rate limiting, strong unique passwords and MFA (multifactor authentication).",
   "A zero-day is a vulnerability unknown to the vendor or lacking a patch, so defenders have had 'zero days' to fix it; behavior-based detection and layered defenses help until a patch arrives. An insider threat comes from a current or former employee, contractor or partner who misuses their access, deliberately or carelessly; least privilege, monitoring and prompt offboarding reduce the risk. A supply chain attack compromises a trusted vendor, software update or hardware component to reach that vendor's customers, which is why software should come from verified sources and vendors are assessed before they are trusted.",
   "Two web application attacks round out the list. SQL (Structured Query Language) injection happens when an application builds database queries directly from user input, letting an attacker alter the query to read or change data; the defense is input validation and parameterized queries. XSS (cross-site scripting) happens when a site includes untrusted input in its pages so a malicious script runs in other visitors' browsers; the defense is input validation and output encoding. As a technician you mostly recognize these and report them to developers rather than fix the code yourself.",
   "Consider a worked example. An accounts clerk receives an email that appears to come from a regular supplier, saying their bank has changed and the next invoice should be paid to a new account. The message is polite, references a real invoice number and asks for quick action. Following policy, the clerk does not reply to the email but phones the supplier on the number already in the vendor file. The supplier confirms nothing changed; their mailbox had been compromised. This was BEC, stopped by out-of-band verification, and the incident is reported so other staff are warned.",
   "Common mistakes include mixing up the channels (vishing is voice, smishing is SMS); calling any fake Wi-Fi network an on-path attack when the specific term is evil twin; assuming DoS steals data; thinking a zero-day means an attack that happened today; believing insider threats are always malicious; and treating SQL injection and XSS as the same, when SQL injection targets the database and XSS runs script in other users' browsers. Exam wording maps directly to terms. 'Email to many users' is phishing; 'to the CEO' is whaling; 'phone call from the help desk' is vishing; 'text message' is smishing; 'scan this code' is QR code phishing. 'Followed an employee through the door' is tailgating. 'Watched her type the PIN' is shoulder surfing. 'Wi-Fi with the same name as the café' is an evil twin. 'Many systems flood a website' is DDoS. 'No patch exists yet' is zero-day. 'Change our bank details' is BEC. 'Compromised vendor update' is supply chain."
  ],
  "analogy": "Social engineering is like a con artist at a hotel front desk. He does not pick the lock on room 412; he walks up looking tired, says he lost his key card, mentions the guest's name he overheard in the lobby, and the helpful clerk makes him a new card. The lock worked perfectly, and the person was the way in. The fix is a procedure, such as checking ID against the booking, not a stronger lock. The comparison does not cover the technical items on this list, like DDoS or SQL injection, which attack systems directly rather than people.",
  "terms": [
   [
    "Phishing",
    "Fraudulent messages impersonating trusted senders to steal credentials or deliver malware."
   ],
   [
    "Spear phishing and whaling",
    "Phishing targeted at specific people, and phishing aimed at senior executives."
   ],
   [
    "Vishing and smishing",
    "Social engineering by voice call and by SMS text message respectively."
   ],
   [
    "QR code phishing",
    "A malicious link hidden in a QR code so users open it on a phone, bypassing email link filters."
   ],
   [
    "Business email compromise (BEC)",
    "Using a compromised or spoofed business email account to trick staff into payments or data release."
   ],
   [
    "Evil twin",
    "A rogue access point imitating a legitimate Wi-Fi network to intercept traffic."
   ],
   [
    "On-path attack",
    "An attacker positioned between two parties to intercept or alter communication."
   ],
   [
    "Zero-day",
    "A vulnerability with no available patch because the vendor has had no time to fix it."
   ],
   [
    "Supply chain attack",
    "Compromising a trusted supplier or its products to reach that supplier's customers."
   ],
   [
    "SQL injection and XSS",
    "Web attacks that alter database queries through user input, and that run malicious script in other users' browsers."
   ]
  ],
  "example": "A person in a high-visibility vest carrying a ladder arrives at reception saying he must fix the building's Wi-Fi and asks to be let into the network closet. The receptionist asks him to wait, checks the facilities schedule, finds no work order and calls the facilities manager, who knows nothing about it. The visitor leaves before security arrives; it was an impersonation attempt.",
  "mistakes": [
   [
    "Vishing is phishing by text message.",
    "Vishing is voice, by phone call. Smishing is SMS text. Phishing is email, and QR code phishing uses a scanned code."
   ],
   [
    "Any fake Wi-Fi hotspot is called an on-path attack.",
    "A rogue access point copying a real network name is specifically an evil twin. It can be used to get on-path, but the exam wants the specific term."
   ],
   [
    "A DoS attack steals data.",
    "DoS and DDoS attack availability by overwhelming a service. They do not, by themselves, read or steal data."
   ],
   [
    "A zero-day is an attack that happened today.",
    "Zero-day means the vulnerability has no patch yet because the vendor has had zero days to fix it."
   ]
  ],
  "tryit": [
   [
    "A help-desk technician gets a call from someone claiming to be the regional VP, traveling and locked out before a big presentation. The caller sounds stressed, knows the VP's assistant's name and asks for an immediate password reset with the temporary password read over the phone. What should the technician do?",
    "Treat it as possible vishing and impersonation. Follow the identity verification procedure: call back on the number in the directory, or verify through the VP's manager or an approved method, and deliver any temporary password through an approved channel. Urgency and authority are classic pressure tactics, so politely refuse to skip steps."
   ],
   [
    "Several staff report that the office's internal web portal search box returns odd results, and a developer finds that typing certain characters into it displays database records that should be hidden. Which attack does this indicate, and who fixes it?",
    "SQL injection, because user input is altering the database query. The technician reports it to the developers, who fix it with input validation and parameterized queries."
   ]
  ],
  "tip": "Know the channels: phishing is email, vishing is voice, smishing is SMS, QR code phishing is a scanned code and whaling targets executives. An evil twin is a fake Wi-Fi network; an on-path attack is interception between two parties.",
  "check": [
   [
    "An attacker texts employees a link claiming their parcel is delayed. What is this called?",
    "Smishing, phishing delivered by SMS text message."
   ],
   [
    "What is the best defense against a request to change a supplier's bank details by email?",
    "Verify out of band by calling the supplier on a known, previously recorded number."
   ],
   [
    "Many compromised computers flood a web server so customers cannot reach it. Name the attack.",
    "A distributed denial of service (DDoS) attack."
   ],
   [
    "Which defense prevents SQL injection in an application?",
    "Input validation combined with parameterized queries."
   ],
   [
    "A trusted vendor's software update is altered to include malware, infecting its customers. What type of attack is this?",
    "A supply chain attack."
   ]
  ]
 },
 {
  "t": "The seven-step malware removal procedure, in order",
  "hook": "Rosa, a bookkeeper at Hillside Veterinary Clinic, calls you in a panic. Her browser keeps jumping to strange shopping sites, the antivirus icon has vanished from the taskbar, and a coworker helpfully suggests she 'just run System Restore to last week.' Another coworker wants to plug in a USB stick to copy her files off first, just in case. Both suggestions sound reasonable, and both could make things worse. You have a ticket open, a worried user on the line and a small office network where every PC shares the same file server. What do you do first, what do you do second, and why does the order matter so much?",
  "simple": "When a computer gets a virus or other malware, technicians follow seven steps in a set order, like a recipe. First, make sure it really is malware. Second, cut the computer off from the network so the infection cannot spread. Third, switch off System Restore, a Windows feature that saves snapshots, because those snapshots might contain the malware. Fourth, update the cleaning tools and remove the malware. Fifth, set up regular scans and install updates. Sixth, turn System Restore back on and take a fresh, clean snapshot. Seventh, teach the user how it happened so it does not happen again. It is like treating a sick person in a shared house: confirm the illness, keep them in their own room, throw out contaminated items, treat them, then explain how to avoid catching it again.",
  "body": [
   "CompTIA publishes a best-practice procedure for removing malware, and the A+ exam expects you to know the seven steps in order and to pick the next step in a scenario. The order is not arbitrary: each step protects the network, the evidence or the repair from what comes after it. If you understand why each step sits where it does, you will not need to rely on memorization alone, and you will recognize distractor answers that put a sensible action in the wrong place.",
   "Step 1: Investigate and verify malware symptoms. Before acting, confirm that the problem really is malware and not a hardware fault, a failing update or a misconfiguration. Look for pop-ups, browser redirects, unknown processes in Task Manager, disabled security tools, renamed or encrypted files, unusual network activity, certificate warnings and security alerts. A browser that redirects because of a bad proxy setting, for example, needs a configuration fix, not malware removal. Verifying first avoids wiping restore points or reimaging a machine that never needed it.",
   "Step 2: Quarantine the infected systems. Disconnect the machine from the network by unplugging Ethernet and turning off Wi-Fi, so the malware cannot spread to other PCs or file shares, contact a command server or send data out. Also stop using removable media with it, since USB drives can carry the infection to the next computer. Quarantine comes immediately after verification because every minute connected gives the malware more opportunity to spread.",
   "Step 3: Disable System Restore in Windows. Restore points can contain copies of the malware, and the anti-malware tool may be unable to clean them because they are protected system files. If you leave System Restore on, a later restore could reinfect the machine. Disabling it deletes the existing restore points, which is why it happens only after you have confirmed and isolated the infection, not before: you do not want to throw away good restore points on a machine that turns out not to be infected.",
   "Step 4: Remediate the infected systems. First, update the anti-malware software's definitions and scan engine, because a scanner with old definitions may not recognize the threat. Since the PC is quarantined, you may download updates on a clean machine and bring them over on clean media, or briefly allow only the update. Then scan and remove, using techniques that fit the infection: scanning in Safe Mode, where fewer programs and drivers load, or booting into a preinstallation environment such as Windows PE (Preinstallation Environment), the Windows Recovery Environment or a vendor's bootable rescue media, so the malware is not running while it is removed. If the infection cannot be removed confidently, reimage the system from a known-good image and restore data from clean backups. Reimaging is a valid remediation choice, but it belongs here in step 4.",
   "Step 5: Schedule scans and run updates. Configure regular automatic scans, make sure real-time protection is on, and install operating system and application updates so the vulnerability that allowed the infection is closed. Step 6: Enable System Restore and create a restore point in Windows. Now that the system is clean, turn System Restore back on and create a new, clean restore point to fall back on in future. Doing this any earlier would save an infected snapshot. Step 7: Educate the end user. Explain how the infection likely happened, such as an email attachment, a fake download or a malicious browser extension, and how to avoid it. Point them to the acceptable use policy and to how to report suspicious activity. Throughout the process, document what you found and did in the ticket.",
   "Consider a worked example. A user calls because her browser keeps redirecting to strange shopping sites and her antivirus icon has disappeared. You check and confirm symptoms consistent with malware rather than a proxy misconfiguration (step 1). You unplug her Ethernet cable and turn off Wi-Fi (step 2), then disable System Restore (step 3). On a clean PC you download the latest definitions, copy them over, boot into Safe Mode and run a full scan, which removes an adware bundle and a malicious extension (step 4). You reconnect, install pending updates and schedule weekly scans (step 5), re-enable System Restore and create a restore point (step 6), and explain to her how the free 'video downloader' she installed carried the malware (step 7).",
   "Common mistakes include disabling System Restore before quarantining, which gives the malware more time to spread; scanning with out-of-date definitions; re-enabling System Restore before the system is confirmed clean, which saves an infected snapshot; skipping user education, which invites the same infection next week; and forgetting to document. Another trap is jumping straight to reimaging without verifying the symptoms.",
   "Exam questions almost always ask for the next step or the first step. 'You have confirmed malware; what next?' is quarantine. 'The system is isolated; what next?' is disable System Restore. 'Before scanning, what should you do?' is update the anti-malware software. 'The system is clean and updated; what next?' is enable System Restore and create a restore point. 'What is the final step?' is educate the end user."
  ],
  "analogy": "Think of a kitchen with a contaminated batch of food. First you confirm it really is spoiled (investigate). You move it away from everything else so nothing touches it (quarantine). You throw out the leftovers saved from that batch, because reheating them later would make people sick again (disable System Restore). You clean the kitchen with fresh supplies (remediate), set up a regular cleaning schedule (scan and update), restock the fridge with fresh, safe leftovers (new restore point) and show the cook what went wrong (educate). The analogy is loose on step 3: restore points are not always infected, but you cannot trust them.",
  "mnemonic": "I Quietly Disable Rogue Software, Enabling Education: Investigate and verify, Quarantine, Disable System Restore, Remediate (update then scan), Schedule scans and run updates, Enable System Restore and create a restore point, Educate the end user.",
  "terms": [
   [
    "Investigate and verify",
    "Step 1: confirm symptoms are caused by malware before taking action."
   ],
   [
    "Quarantine",
    "Step 2: isolate the infected system from networks and shared media to stop spread."
   ],
   [
    "System Restore",
    "A Windows feature that saves restore points, which can harbor malware and so is disabled during cleanup."
   ],
   [
    "Remediation",
    "Step 4: update anti-malware, then scan and remove using Safe Mode or a preinstallation environment, or reimage."
   ],
   [
    "Preinstallation environment",
    "A minimal boot environment such as Windows PE used to scan while the infected OS is not running."
   ],
   [
    "Restore point",
    "A snapshot of system files and settings that Windows can roll back to."
   ],
   [
    "End-user education",
    "Step 7: teaching the user how the infection happened and how to avoid it."
   ]
  ],
  "example": "A technician confirms a user's PC is infected and immediately disconnects it from the network. A colleague suggests running System Restore to 'go back to before the infection'. The technician explains that restore points may contain the malware, disables System Restore, remediates with updated tools from Safe Mode, and only later creates a fresh restore point once the system is clean.",
  "mistakes": [
   [
    "Disable System Restore first, then quarantine.",
    "Quarantine comes first, right after verification, so the malware cannot spread while you work. System Restore is disabled in step 3."
   ],
   [
    "Run the scan right away with whatever definitions are installed.",
    "Updating the anti-malware definitions and engine is the first part of step 4. Old definitions may miss the threat."
   ],
   [
    "Turn System Restore back on as soon as the scan finishes.",
    "Scheduling scans and running updates (step 5) comes first, and System Restore is re-enabled in step 6 only once the system is confirmed clean."
   ],
   [
    "Reimaging skips the procedure.",
    "Reimaging is a remediation technique within step 4. You still verify, quarantine and disable System Restore before it, and update, create a restore point and educate after."
   ]
  ],
  "tryit": [
   [
    "You have verified that a PC is infected and unplugged its network cable. The user's manager walks over and insists you run System Restore to last Monday, since that is when the problem started. What do you do next, and how do you explain it?",
    "Disable System Restore, which is step 3. Explain that restore points may contain the malware and that the anti-malware tool may not be able to clean them, so restoring could bring the infection back. You will remediate with updated tools and create a fresh restore point once the system is clean."
   ],
   [
    "A technician finishes removing malware from Safe Mode, reconnects the PC, installs all pending OS and app updates, and sets a weekly full scan. What are the remaining steps, in order?",
    "Step 6: enable System Restore and create a new restore point. Step 7: educate the end user about how the infection happened and how to avoid it, and document everything in the ticket."
   ]
  ],
  "tip": "Most questions ask for the next step. Quarantine comes before disabling System Restore; updating the anti-malware software comes before scanning; re-enabling System Restore comes after the system is clean; educating the user is last.",
  "check": [
   [
    "What is the first step in the malware removal procedure?",
    "Investigate and verify malware symptoms."
   ],
   [
    "Why is System Restore disabled before remediation?",
    "Restore points may contain the malware and could reinfect the system if used later."
   ],
   [
    "What should you do immediately before scanning an infected PC?",
    "Update the anti-malware software's definitions and engine."
   ],
   [
    "Which step comes directly after scheduling scans and running updates?",
    "Enable System Restore and create a new restore point."
   ],
   [
    "What is the final step?",
    "Educate the end user, with the whole process documented in the ticket."
   ]
  ]
 },
 {
  "t": "Workstation hardening: data-at-rest encryption, password policy, end-user best practices (screensaver locks, logging off), account management, disable AutoRun/AutoPlay, disable guest account",
  "hook": "The outside compliance auditor arrives at Greenleaf Law Group at 9 a.m. sharp, and by 9:20 she has a list. A paralegal's PC sits unlocked with a client file open while he gets coffee. A partner's laptop has no disk encryption. The Guest account is enabled on the reception computer. Three former interns still have active accounts. And a USB stick labeled 'Photos' is sitting in a drawer, waiting for someone curious to plug it in. The managing partner looks at you and asks, 'How fast can we fix all of this, and what exactly do we change?' Where do you start?",
  "simple": "Hardening a computer means closing the doors and windows that attackers could use. You switch off features nobody needs and tighten the ones people do use. A few habits and settings do most of the work. Scramble the hard drive so a stolen laptop is useless to a thief. Require strong passwords and lock the account after too many wrong guesses. Make the screen lock itself when someone walks away. Give people normal accounts instead of administrator power, and close accounts as soon as people leave. Turn off the Guest account, which lets anyone in without a password. Stop the computer from automatically running things when a USB stick is plugged in. It is like locking up a house: shut the windows, lock the doors, and do not leave a spare key under the mat.",
  "body": [
   "Hardening means reducing a system's attack surface: turning off what is not needed, locking down what is, and making the remaining features as secure as possible. Workstations are a prime target because users sit at them all day, open email, browse the web and plug in devices, so the A+ exam covers a standard hardening checklist. Each item answers a specific risk, and exam questions usually describe the risk and ask for the matching control. Learning the pairs, risk and control, is the fastest way through this topic.",
   "Data-at-rest encryption protects information stored on the disk if a laptop is lost or stolen or a drive is removed. On Windows this is usually BitLocker for full-volume encryption or EFS (Encrypting File System) for individual files; on macOS it is FileVault. Without encryption, anyone can remove the drive, connect it to another computer and read everything, regardless of the Windows password, because the sign-in screen only protects the running OS (operating system). Store recovery keys centrally, for example in the organization's directory, so a forgotten password or hardware change does not lock the owner out of their own data.",
   "A password policy sets rules for passwords, usually enforced by Group Policy or a device-management tool. It can include minimum length, which matters more than complexity for resisting guessing; complexity requirements that mix character types; password history to stop reuse; expiration where policy requires it; and account lockout after a number of failed attempts to slow brute-force guessing. Set the lockout threshold sensibly, because one that is too low locks out users who simply mistype. Current guidance favors long passphrases, screening against known-breached passwords and MFA (multifactor authentication) over frequent forced changes, which tend to produce predictable passwords such as a season and a year. Also set BIOS (basic input/output system) or UEFI (Unified Extensible Firmware Interface) passwords so no one can change boot settings or boot from USB without authorization.",
   "End-user best practices matter just as much as settings. Configure a screensaver or screen lock that activates after a short idle period and requires a password to resume; a screensaver with no password only hides the screen until someone moves the mouse. Teach users to lock the screen manually whenever they walk away, using Windows key + L on Windows or Control + Command + Q on a Mac, and to log off at the end of the day. Encourage them to keep sensitive paperwork off desks, use privacy screens in public and never write passwords on sticky notes.",
   "Account management applies least privilege. Users work with standard accounts and use a separate administrator account only when needed. Restrict sign-in times where appropriate, disable accounts promptly when people leave, remove unused accounts, change default passwords, rename or disable the built-in Administrator account where policy allows, and set expiration dates for temporary staff and contractors so their access ends automatically. Disable the Guest account: it lets anyone use the machine without their own credentials. It is disabled by default in current Windows, but you should check that it stays that way, especially on shared or reception PCs.",
   "Finally, disable AutoRun and AutoPlay. AutoRun could once launch a program automatically when a CD or USB drive was inserted, which malware abused to spread from stick to stick. AutoPlay is the related feature that asks, or decides, what to do with new media, such as opening a folder or importing photos. Modern Windows no longer honors AutoRun from USB drives, but hardening guides still call for turning AutoPlay off, in Settings under Bluetooth and devices, AutoPlay, or through Group Policy, so inserted media never triggers actions without the user choosing. Other hardening steps include removing unneeded software and services, keeping the OS and apps patched and running up-to-date anti-malware.",
   "Consider a worked example. A law firm asks you to harden twenty laptops before a compliance audit. You enable BitLocker with recovery keys stored in the directory, apply a Group Policy password policy with a long minimum length and account lockout, set the screen to lock after a few minutes of inactivity, confirm the Guest account is disabled, turn off AutoPlay for all drives, remove local administrator rights from everyday accounts and set a UEFI password. You document each setting so the auditor can verify it, disable the accounts of former interns, and brief staff on locking their screens.",
   "Common mistakes include assuming a Windows password protects data on a removed drive; forcing frequent password changes while ignoring length and MFA; setting a lockout threshold so low that users lock themselves out constantly; giving users administrator rights 'just to be safe'; forgetting to disable accounts of people who have left; and thinking AutoRun is the same as AutoPlay. Exam questions use risk-based wording. 'Lost or stolen laptop' points to data-at-rest encryption. 'Users leave desks unattended' points to screen lock timeouts and logging off. 'Repeated password guessing' points to account lockout. 'Malware spreads from USB sticks' points to disabling AutoRun and AutoPlay. 'Anyone can sign in without an account' points to disabling the Guest account. 'Temporary contractor' points to account expiration. 'Someone booted the PC from USB' points to a BIOS/UEFI password and boot order restrictions."
  ],
  "analogy": "Hardening a workstation is like preparing a rental car before handing it to a customer. You lock the glove box that holds the spare key (UEFI password), make sure the doors lock automatically when the driver walks away (screen lock), give the driver a key that cannot open the trunk where the company equipment is stored (standard account), and remove the valet key someone left in the cup holder (Guest account). Where it falls short: a car has no equivalent to encryption, which keeps the contents useless even after a thief drives the whole thing away.",
  "terms": [
   [
    "Hardening",
    "Reducing a system's attack surface by removing, disabling and securing features."
   ],
   [
    "Data-at-rest encryption",
    "Encrypting stored data, for example with BitLocker or FileVault, so a stolen drive is unreadable."
   ],
   [
    "Password policy",
    "Rules for password length, complexity, history, expiration and lockout, often enforced by Group Policy."
   ],
   [
    "Account lockout",
    "Temporarily disabling an account after a set number of failed sign-in attempts."
   ],
   [
    "Screen lock timeout",
    "Automatically locking the session after a period of inactivity, requiring a password to resume."
   ],
   [
    "AutoRun and AutoPlay",
    "Features that launch or prompt actions when media is inserted; hardening disables them."
   ],
   [
    "Guest account",
    "A built-in account allowing access without personal credentials, which should remain disabled."
   ],
   [
    "Account expiration",
    "A set end date on an account, used for temporary staff so access ends automatically."
   ]
  ],
  "example": "During a walk-through, a security officer finds a finance clerk's PC unlocked with a payroll spreadsheet open while the clerk is at lunch. The IT team sets a Group Policy screen lock after a short idle period with a password required to resume, and reminds staff to press Windows key + L whenever they leave their desk.",
  "mistakes": [
   [
    "A strong Windows password protects data if the laptop is stolen.",
    "The password only protects the running OS. A thief can remove the drive and read it elsewhere. Data-at-rest encryption such as BitLocker protects the data."
   ],
   [
    "Forcing password changes every few weeks is the best policy.",
    "Frequent forced changes lead to predictable passwords. Current guidance favors long passphrases, breached-password screening and MFA, with account lockout to slow guessing."
   ],
   [
    "A screensaver is a security control.",
    "Only a screen lock that requires a password to resume protects the session. A screensaver alone just hides the screen."
   ],
   [
    "AutoRun and AutoPlay are the same thing, and modern Windows needs no action.",
    "AutoRun launched programs from media; AutoPlay decides or asks what to do with new media. Hardening still disables AutoPlay so inserted media never triggers actions."
   ]
  ],
  "tryit": [
   [
    "A temporary accountant joins for a three-month tax season. Last year, a temp's account stayed active for eight months after they left, and nobody noticed. How would you set up this year's account to avoid that?",
    "Create a standard (non-administrator) account with an expiration date set to the end of the contract, so access ends automatically, and restrict sign-in hours if appropriate. Add an offboarding check to confirm it is disabled on the last day."
   ],
   [
    "A security walk-through finds that someone booted a reception PC from a USB stick after hours and copied files. The PC has a strong Windows password. Which hardening controls address this?",
    "Set a BIOS/UEFI password and restrict the boot order so the PC cannot boot from USB without authorization, and enable data-at-rest encryption so files cannot be read even if the OS is bypassed."
   ]
  ],
  "tip": "Lost or stolen laptop questions point to data-at-rest encryption. 'Users leave desks unattended' points to screen lock timeouts. 'Malware spreads from USB sticks' points to disabling AutoRun and AutoPlay.",
  "check": [
   [
    "Why does a Windows sign-in password not protect data on a stolen hard drive?",
    "The drive can be read in another computer; only data-at-rest encryption such as BitLocker protects it."
   ],
   [
    "Which password policy setting slows brute-force guessing?",
    "Account lockout after a set number of failed attempts."
   ],
   [
    "What keyboard shortcut locks a Windows workstation?",
    "Windows key + L."
   ],
   [
    "Why disable AutoPlay?",
    "So inserted media cannot automatically trigger actions, reducing the spread of malware from removable drives."
   ],
   [
    "Which account setting ensures a contractor's access ends automatically?",
    "An account expiration date."
   ]
  ]
 },
 {
  "t": "Mobile device security: screen locks, remote wipe, locator apps, OS updates, device encryption, remote backup, MDM, BYOD vs corporate-owned",
  "hook": "It is 6:15 p.m. when Keisha, a regional sales manager for Summit Outdoor Supply, calls the help desk from a borrowed phone. Her own phone, her personal one, is somewhere in the back of a rideshare across town. It holds her company email, the customer pricing sheet and the authenticator app she uses to sign in. She also has three years of family photos on it, and she is very clear that she does not want them erased. The company lets staff use their own phones for work. What can you do from your desk in the next hour, and what are you allowed to do to a phone the company does not own?",
  "simple": "Phones and tablets hold a lot of private information, and they are easy to lose. Mobile security keeps a lost phone from turning into a leak. Start with a screen lock, like a PIN or fingerprint, which also switches on the phone's built-in scrambling of its storage. Keep the phone updated so known holes get fixed. If it goes missing, a locator app can show where it is, make it ring or lock it, and as a last resort you can erase it from far away. Backups in the cloud mean erasing it does not lose your stuff. Companies use management software to set these rules on work phones. If the phone belongs to the worker, the company should only erase its own work apps and data, never the person's photos.",
  "body": [
   "Phones and tablets carry email, files, authenticator apps and company chat, and they are easily lost or stolen. Mobile security aims to keep a lost device from becoming a data breach, to keep devices free of malware and to let the organization manage devices it does not physically control. The exam tests which control fits each scenario and how ownership changes what you are allowed to do, so pay attention to who owns the device in every question.",
   "The first control is the screen lock. Options include a PIN, a passcode or password, a pattern (swipe) lock, fingerprint and facial recognition. Biometrics are convenient, but a strong PIN or passcode remains the fallback and the root of the protection, since the device asks for it after a restart or after several failed biometric attempts. Devices can be configured to erase themselves or impose increasing delays after a number of failed attempts, which defeats guessing. A short auto-lock timeout matters too, because an unlocked phone left on a table bypasses every other control.",
   "Device encryption protects data at rest. Modern iOS and Android devices encrypt storage by default when a screen lock is set, and the encryption key is tied to the lock, so a weak or missing lock weakens the protection. That relationship is worth remembering: the screen lock is not just a door, it is part of the key. Keep the OS (operating system) updated, because updates patch vulnerabilities that attackers use. Devices that no longer receive updates, end-of-life models, should be replaced for business use even if they still work. App updates matter as well, and apps should come from the official stores rather than side-loaded installation files.",
   "If a device is lost, locator apps such as Find My on Apple devices and Google's Find Hub (formerly Find My Device) on Android show its location, play a sound, lock it and display a contact message on the lock screen. If the device cannot be recovered, remote wipe erases it so the data cannot be read. Remote wipe only works if the feature was enabled beforehand and the device can reach the network to receive the command. Remote backup, such as iCloud, Google backup or the organization's cloud services, means that wiping a device does not mean losing the data. Activation lock ties the device to the owner's account so a thief cannot reset and reuse it.",
   "MDM (mobile device management) lets an organization enforce all of this centrally: require passcodes and encryption, push Wi-Fi, email and VPN (virtual private network) settings, install or block apps, enforce minimum OS versions, and lock or wipe devices remotely. MAM (mobile application management) focuses on managing just the company's apps and data rather than the whole device. Compliance checks often run before a device may reach corporate resources, so a jailbroken or rooted phone, or one running an out-of-date OS, can be blocked from company email until it is fixed.",
   "Ownership models shape what is appropriate. With BYOD (bring your own device), employees use personal phones for work. It saves the company money, but the company must respect privacy, so it typically manages only a separate work profile or container and performs a selective wipe that removes corporate apps and data only. With corporate-owned devices, the organization can manage fully, including full wipes. Variants include COPE (corporate-owned, personally enabled), where the company owns the device but allows some personal use, and CYOD (choose your own device), where employees pick from an approved list. An acceptable use policy should spell out the rules for each model, including what the company can see and erase.",
   "Consider a worked example. A sales manager leaves her personal phone, enrolled under the company's BYOD program, in a taxi. She reports it within the hour. The help desk uses the locator to confirm it is moving across town, locks it with a message, and when it is not recovered by the end of the day, issues a selective wipe through MDM that removes the work profile, company email and files while leaving her personal photos untouched. Because her work data lives in cloud services, nothing is lost, and her replacement phone is enrolled the next morning.",
   "Common mistakes include assuming remote wipe can be switched on after the device is lost; performing a full wipe on an employee's personal BYOD phone; relying on biometrics alone without a strong fallback passcode; keeping end-of-life phones in service because they still work; allowing jailbroken or rooted devices to connect to company email; and confusing a locator app, which finds the device, with remote backup, which protects the data. Exam wording gives the answer. 'Prevent data access on a lost phone' is remote wipe, with screen lock and encryption as the first line. 'Find a misplaced tablet' is a locator app. 'Enforce passcodes on all company phones' is MDM. 'Employees use personal phones; protect company data without touching personal data' is a work profile with selective wipe under BYOD. 'Phone no longer receives updates' means replace it. 'Keep data after a wipe' is remote backup. 'Company buys phones but allows personal use' is COPE."
  ],
  "analogy": "A BYOD phone with a work profile is like an employee's own car with a locked company toolbox bolted in the trunk. The company can lock, inspect or remove its toolbox whenever it needs to, but it has no right to empty the glove box or sell the car. A corporate-owned phone is a company van: the company can strip it down completely. The analogy is imperfect in one way: on a phone, the company's management software can still see some device details, such as OS version and whether it is jailbroken, to decide whether the toolbox may be used.",
  "terms": [
   [
    "Screen lock",
    "A PIN, passcode, pattern or biometric required to unlock a mobile device."
   ],
   [
    "Remote wipe",
    "Erasing a device's data remotely, which must be configured before loss."
   ],
   [
    "Locator app",
    "A service that shows a lost device's location and can lock it or play a sound."
   ],
   [
    "Device encryption",
    "Encryption of mobile storage tied to the screen lock to protect data at rest."
   ],
   [
    "Remote backup",
    "Copying device data to cloud services so it survives loss or a wipe."
   ],
   [
    "Mobile device management (MDM)",
    "Central tools to enforce policy, configure, lock and wipe mobile devices."
   ],
   [
    "BYOD",
    "Bring your own device, where employees use personal devices for work, usually with a separate work profile."
   ],
   [
    "Selective wipe",
    "Removing only corporate apps and data from a device while leaving personal data intact."
   ],
   [
    "COPE and CYOD",
    "Corporate-owned, personally enabled devices; and choose your own device from an approved list."
   ]
  ],
  "example": "A company notices an employee's phone has not installed OS updates for months because the model reached end of support. MDM compliance marks it non-compliant and blocks its access to company email. The employee receives a supported phone under the CYOD program, enrolls it in MDM and regains access the same day.",
  "mistakes": [
   [
    "You can turn on remote wipe after the phone is lost.",
    "Remote wipe requires the device to be enrolled or the feature enabled beforehand, and the device must reach the network to receive the command."
   ],
   [
    "For a lost BYOD phone, do a full wipe to be safe.",
    "A full wipe destroys the employee's personal data on a device the company does not own. Use a selective wipe of the work profile, apps and data."
   ],
   [
    "Fingerprint unlock alone is enough protection.",
    "Biometrics rely on a PIN or passcode as the fallback, and encryption is tied to that lock. A weak fallback weakens the whole device."
   ],
   [
    "A locator app protects the data on a lost phone.",
    "A locator finds, rings or locks the device. Remote wipe protects the data, and remote backup preserves it."
   ]
  ],
  "tryit": [
   [
    "A company is choosing between giving staff company phones and letting them use their own. Leadership wants to be able to fully erase devices if needed, control which apps are installed, but still let staff use the phones for personal calls and messages. Which model fits?",
    "COPE, corporate-owned, personally enabled. The company owns and fully manages the device, including full wipes and app control, while allowing some personal use under the acceptable use policy."
   ],
   [
    "An MDM report shows a technician's phone is jailbroken, and it still has access to company email. What should happen, and why?",
    "The compliance policy should mark it non-compliant and block access to corporate resources until it is restored to a supported, non-jailbroken state. Jailbreaking removes OS protections, which puts company data at risk."
   ]
  ],
  "tip": "For BYOD, the answer is usually a work profile plus a selective wipe of corporate data, not a full wipe of the employee's personal phone. Remote wipe only works if it was set up before the device was lost.",
  "check": [
   [
    "Why must remote wipe be configured before a device is lost?",
    "The device must already be enrolled and able to receive the wipe command; it cannot be set up afterward."
   ],
   [
    "On a BYOD phone, what type of wipe protects company data while respecting privacy?",
    "A selective wipe that removes only the work profile, apps and data."
   ],
   [
    "What is the relationship between a phone's screen lock and its encryption?",
    "Encryption is enabled and keyed to the lock, so a strong lock makes encryption effective."
   ],
   [
    "Which tool enforces passcode and OS version requirements across company phones?",
    "Mobile device management (MDM)."
   ]
  ]
 },
 {
  "t": "Data destruction: shredding, drilling, degaussing, incineration; erasing/wiping vs low-level vs standard format; certificates of destruction",
  "hook": "Owen, the facilities lead at Riverbend Family Health, wheels a cart into the IT room stacked with forty retired desktops, a box of backup tapes and a bin of old USB sticks. He has a quote from a recycler and a deadline: the storage room is being converted into an exam room on Monday. 'Can't we just format them?' he asks. 'Or I heard you can wave a big magnet over them.' Some of these drives held patient records. Some of the newer laptops in the corner are going to a local school. What does each pile need, and how will you prove later that it was done?",
  "simple": "When an old computer or drive is thrown away or given away, the information on it must not go with it. Deleting files or doing a quick format is like tearing the table of contents out of a book: the pages are still there for anyone who looks. There are two safe paths. If the drive will be used again, you wipe it by writing over every part of it, so nothing old remains. If the information is very sensitive or the drive is worthless, you destroy it: shred it, drill holes in it, burn it, or use a powerful magnet on old-style spinning drives. Magnets do nothing to newer flash drives. When a company hires someone to destroy drives, it gets a certificate as proof.",
  "body": [
   "When storage devices leave service, the data on them must not leave with them. Deleting files or even formatting a drive does not reliably remove data, and freely available recovery tools can often retrieve it. Organizations therefore choose between sanitizing a device so it can be reused, donated or resold, and physically destroying it so it can never be read. The right choice depends on how sensitive the data is, whether the device has any reuse value, what kind of media it is and what regulations apply. Keep those questions in mind, because exam scenarios almost always hinge on one of them.",
   "Physical destruction methods come first. Shredding feeds drives, tapes, optical discs or paper into an industrial shredder that cuts them into small pieces, and it is thorough for every media type. Drilling puts holes through a hard disk's platters, which quickly makes the drive unusable, although fragments of platter between the holes could in theory still hold data, so it is less thorough than shredding. For SSDs (solid-state drives), the memory chips themselves must be destroyed, since data lives in those chips rather than on platters. Incineration burns media completely and is often used for paper and highly sensitive items. Pulverizing and crushing are related methods.",
   "Degaussing exposes magnetic media, meaning hard disk platters and tapes, to a very strong magnetic field that scrambles the stored data. It usually also destroys the drive's servo information, the factory-written tracking data the heads need, so the drive cannot be reused afterward. Degaussing does not work on SSDs, flash drives or optical discs, because they do not store data magnetically. This is one of the most frequently tested facts in the topic: whenever a question mentions an SSD, a USB flash drive or a memory card, degaussing is the wrong answer.",
   "Sanitizing for reuse is the other path. Erasing or wiping software overwrites every addressable location on the drive, often with zeros or random data, so previous data cannot be read; good tools verify the result and produce a report. For SSDs, use the manufacturer's secure erase command or the drive's built-in sanitize feature, because wear leveling, which spreads writes across spare cells, means ordinary overwriting may miss some cells. Self-encrypting drives can be sanitized by cryptographic erase, which destroys the encryption key so the remaining data is unreadable. Choose sanitizing when the device will be reused inside the organization, donated or returned at the end of a lease.",
   "Know how formats differ. A standard format, such as a quick format in Windows, creates a new empty file system and marks the space as free, but the old data remains on the disk until it is overwritten and can be recovered with common tools. A full format in modern Windows also writes zeros across the volume, which is better, but it is not a formal, verified sanitization process. A low-level format originally meant rewriting the drive's physical sector structure at the factory; modern drives cannot be truly low-level formatted by users, and what tools call a low-level format today is really a manufacturer's zero-fill utility. For the exam, remember that standard formats leave data recoverable, while wiping or low-level formatting with drive tools makes recovery much harder.",
   "Documentation closes the loop. Many organizations use a third-party destruction vendor, which should provide a certificate of destruction listing the devices, often by serial number, the method used and the date. This document proves the organization met its legal and regulatory obligations and completes the asset's life-cycle record in the inventory system. Some organizations also require a staff member to witness on-site destruction for the most sensitive media.",
   "Consider a worked example. A hospital retires 200 desktops. The hard drives held patient records, so policy requires destruction. The hospital hires a certified vendor that shreds the drives on site while a staff member watches, then issues a certificate of destruction listing every serial number. Meanwhile, twenty newer laptops with SSDs will be donated to a school, so technicians run each drive's manufacturer secure erase utility, verify the result and record it in the asset system before the laptops leave the building. Nobody degausses the SSDs, because it would not erase them.",
   "Common mistakes include degaussing an SSD or USB stick and assuming the data is gone; treating a quick format as sanitization; relying on ordinary overwriting for SSDs; drilling a drive holding highly sensitive data when policy requires shredding; failing to get a certificate of destruction from a vendor, which leaves no proof that obligations were met; and destroying drives that could have been securely wiped and reused when policy allows reuse. Exam questions hinge on reuse and media type. 'The drive will be reused or donated' points to wiping or secure erase. 'The data must never be recoverable' points to shredding or incineration. 'Magnetic tapes and hard disks, quickly' suggests degaussing, but 'SSD' or 'flash' rules it out. 'Files were recovered after formatting' means a standard format was used. 'Proof that a vendor destroyed the drives' is a certificate of destruction."
  ],
  "analogy": "A standard format is like removing the index cards from a library's card catalog while leaving every book on the shelves: the library looks empty, but anyone willing to walk the aisles can still read everything. Wiping is like pasting blank pages over every page of every book, so the shelves can be reused. Shredding or burning is like hauling the books away and pulping them. The analogy has a gap for SSDs: their hidden spare cells are like a back storeroom the paste crew never visits, which is why SSDs need the drive's own secure erase command.",
  "terms": [
   [
    "Shredding",
    "Mechanically cutting media into small pieces so it cannot be read or reassembled."
   ],
   [
    "Degaussing",
    "Using a strong magnetic field to erase magnetic media; ineffective on SSDs, flash and optical discs."
   ],
   [
    "Drilling",
    "Boring holes through drive platters to make a drive unusable, less thorough than shredding."
   ],
   [
    "Incineration",
    "Burning media completely, often for paper and highly sensitive material."
   ],
   [
    "Wiping",
    "Overwriting all addressable storage so previous data cannot be recovered, allowing reuse."
   ],
   [
    "Standard format",
    "Creating a new empty file system without removing old data, which remains recoverable."
   ],
   [
    "Low-level format",
    "Originally a factory rewrite of sector structure; today usually a manufacturer zero-fill utility."
   ],
   [
    "Secure erase",
    "A drive's built-in command, important for SSDs, that sanitizes all cells including those hidden by wear leveling."
   ],
   [
    "Certificate of destruction",
    "A vendor's document recording which devices were destroyed, how and when."
   ]
  ],
  "example": "A small business sells old office PCs online after quick-formatting the drives. A buyer runs a free recovery tool and finds customer invoices. The business changes its process: drives from future sales are wiped with a verified overwrite or secure erase, and drives that held payment data are shredded by a vendor that issues certificates of destruction.",
  "mistakes": [
   [
    "Degaussing erases any drive, including SSDs and USB sticks.",
    "Degaussing only affects magnetic media such as hard disks and tapes. Flash storage needs secure erase, sanitize commands or physical destruction."
   ],
   [
    "A quick format makes a drive safe to sell.",
    "A standard format only creates a new file system; the old data stays until overwritten and is easy to recover. Wipe or secure erase before reuse."
   ],
   [
    "Overwriting an SSD with zeros is enough.",
    "Wear leveling can leave data in cells the operating system cannot address. Use the manufacturer's secure erase or sanitize feature, or cryptographic erase on self-encrypting drives."
   ],
   [
    "A vendor's word that drives were destroyed is enough for compliance.",
    "Obtain a certificate of destruction listing the devices, method and date, so the organization can prove it met its obligations."
   ]
  ],
  "tryit": [
   [
    "A company's lease on 50 laptops with SSDs ends next month, and the leasing company expects the laptops back in working order. The drives held HR records. A colleague suggests renting a degausser. What do you recommend?",
    "Do not degauss: it would not erase the SSDs, and the laptops must be returned working. Run the manufacturer's secure erase or sanitize command on each SSD, or cryptographic erase if the drives are self-encrypting, verify the results and record each serial number in the asset system before return."
   ],
   [
    "A records office is disposing of a box of old backup tapes and a stack of hard drives from a decommissioned server that stored tax records. Nothing will be reused. What methods fit, and what document should you insist on?",
    "Physical destruction: degaussing is suitable for the magnetic tapes and hard drives, followed by shredding for certainty, or shredding or incineration directly. If a vendor does it, insist on a certificate of destruction listing serial numbers, method and date."
   ]
  ],
  "tip": "Degaussing does nothing to SSDs or flash media, and a quick or standard format does not remove data. If the drive must be reused, wipe it; if it must never be readable again, physically destroy it and get a certificate.",
  "check": [
   [
    "Why is degaussing ineffective on an SSD?",
    "SSDs store data in flash memory rather than magnetically, so a magnetic field does not erase them."
   ],
   [
    "A drive is quick-formatted and sold. Can the data be recovered?",
    "Yes, a standard format only creates a new file system and leaves the old data until it is overwritten."
   ],
   [
    "Which method lets a hard drive be safely reused?",
    "Wiping, meaning overwriting all data with a verified tool, or a manufacturer secure erase."
   ],
   [
    "What does a certificate of destruction provide?",
    "Documented proof of which devices were destroyed, by what method and when, for compliance records."
   ]
  ]
 },
 {
  "t": "SOHO router hardening: default passwords, firmware updates, disabling WPS and UPnP, content filtering, port forwarding, DHCP reservations, guest networks",
  "hook": "It is Monday morning at Pine Street Dental, a four-chair practice you support on contract. The office manager forwards an odd message: the camera recorder in the back room was streaming to an unknown address over the weekend. You walk to the closet and find the router exactly as the installer left it three years ago, factory admin password, WPS light glowing, UPnP switched on, and patients in the waiting room using the same Wi-Fi as the X-ray workstation. Nothing about it is broken. Everything about it is open. Where do you start, and which of these settings actually let the stranger in?",
  "simple": "A small office router is like the front door, mailroom and reception desk of a building rolled into one box. It decides who gets in from the internet, hands out addresses to every device inside, and runs the Wi-Fi. When it arrives, it is set up to be easy, not safe: the admin password is printed in the manual, and features that let gadgets open doors by themselves are turned on. Hardening means changing those defaults. You set a new admin password, install updates, switch off the shortcut features, open only the specific doors you truly need, and give visitors their own separate Wi-Fi so they never wander into the office's private rooms. Think of giving guests a waiting room instead of a key to the whole building.",
  "body": [
   "A SOHO (small office/home office) router usually combines several devices in one box: a router, a small switch, a wireless access point, a basic firewall and a DHCP (Dynamic Host Configuration Protocol) server that hands out IP (Internet Protocol) addresses. Out of the box it is configured for easy installation, not for security. Anyone who knows the model can guess its default settings, and features that make setup painless also make attacks easier. Hardening the router is therefore one of the first jobs a technician does in a small office, because every computer, printer and phone behind it depends on it.",
   "Start with access to the router itself. Change the default administrator username and password first, since default credentials are printed in manuals, published online and tried automatically by attackers and botnets. Disable remote management from the internet (sometimes called WAN-side, or wide area network side, administration) so the admin page is reachable only from inside the network, and use the HTTPS (Hypertext Transfer Protocol Secure) management option if the router offers it. Change the default SSID (service set identifier, the Wi-Fi network name) if it reveals the brand or model, and set WPA3 (Wi-Fi Protected Access 3), or WPA2 with AES (Advanced Encryption Standard) where older devices require it, with a long passphrase. Hiding the SSID by disabling its broadcast is listed as an option, but it only hides the name from casual view; scanning tools still detect the network, so it is not real protection. Place the router in a secure location where visitors cannot press its reset button, and adjust transmit power and channel so the signal does not spread far beyond the premises.",
   "Next, update the firmware. Firmware is the router's built-in operating system, and vendors release updates to fix security flaws. In the admin page you will usually find a Firmware Update or Administration section showing the current version and a button to check for a newer one. Check it, or download the file from the vendor's support site for that exact model and hardware revision, and enable automatic updates if available. Avoid interrupting power during the update. Plan to replace any router the vendor no longer supports, because an end-of-life router with a known flaw stays vulnerable forever, no matter how good its other settings are.",
   "Then disable features that trade security for convenience. WPS (Wi-Fi Protected Setup) lets devices join by pushing a button or entering an eight-digit PIN (personal identification number). The PIN method has a design weakness that lets it be guessed quickly, after which the attacker can learn the Wi-Fi passphrase, so turn WPS off entirely rather than relying on the push-button method. UPnP (Universal Plug and Play) lets devices and applications automatically open ports on the router with no approval. Game consoles and some cameras like it, but malware can use the same feature to expose internal systems to the internet, so disable it unless a documented need exists. If you see port mappings in the router's UPnP table that no one created, that is your clue.",
   "Then control traffic in and out. Port forwarding sends traffic arriving on a specific external port to one internal IP address and port, for example so a vendor can reach a network video recorder for support. Forward only what is needed, to the exact device, and remove unused rules. Because the rule points at an internal IP, that device needs an address that never changes: either a DHCP reservation, which ties an IP address to the device's MAC (media access control) address, or a static IP set outside the DHCP pool. Without that, the device can receive a different address after a reboot or power outage and the rule quietly points at the wrong machine. A screened subnet (formerly called a DMZ, or demilitarized zone) places an internet-facing device in a separate zone, which is safer than forwarding many ports to the main LAN (local area network).",
   "Filtering adds another layer. Content filtering blocks categories of websites, such as gambling, adult content or known malware sites, or specific domains; on many SOHO routers it appears under Parental Controls or Security. IP filtering allows or blocks specific addresses. MAC filtering exists too, letting only listed hardware addresses join, but MAC addresses are easy to spoof, so treat it as a weak control that adds administrative work without stopping a determined attacker.",
   "Finally, separate visitors and gadgets. A guest network gives visitors internet access on its own SSID and network segment, isolated from office computers, printers and file shares. Enable it only when needed, give it its own passphrase that you can change often, and turn on client isolation if offered so guest devices cannot see each other either. Many offices also put smart TVs, cameras and other IoT (Internet of Things) devices on a separate network so a compromised gadget cannot reach work computers. If the office does not need guest access, disable the guest network entirely, since an unused feature is one more thing to secure.",
   "Consider a worked example. A small accounting firm's router still uses its factory admin password, WPS and UPnP are enabled, and visitors get the main Wi-Fi passphrase. The firm also needs remote access to its network video recorder. You update the firmware, set a unique admin password, disable remote management, WPS and UPnP, and switch to WPA3 with WPA2 fallback. You create a DHCP reservation for the video recorder and forward only its single required port to that reserved address. You set up an isolated guest SSID for clients, enable a content filter category for known malware sites, and record every change in the ticket.",
   "Exam questions usually give a scenario and ask for the first or best step. 'New router, what should you do first' points to changing the default admin password. 'A port forward stops working after a power outage' points to a missing DHCP reservation or static IP. 'Malware opened ports on the router without anyone configuring them' points to UPnP. 'A PIN-based setup feature can be brute-forced' points to WPS. 'Visitors need internet but must not reach internal resources' points to a guest network, and 'block gambling or known malicious sites' points to content filtering."
  ],
  "analogy": "Think of the router as a building's reception desk. Changing the default password is changing the master key the builder handed to every contractor. UPnP is like letting any tenant prop open a side door without telling security, and WPS is a keypad with a code short enough to guess. Port forwarding is a specific delivery door that leads to one office, which only works if that office never changes room number, hence the DHCP reservation. The analogy stops at the guest network: a real waiting room is a physical space, while a guest network is a logical segment that the router itself must enforce.",
  "terms": [
   [
    "SOHO router",
    "An all-in-one device combining routing, switching, wireless access, firewall and DHCP for a small office or home."
   ],
   [
    "WPS (Wi-Fi Protected Setup)",
    "A convenience feature for joining Wi-Fi by button or PIN whose PIN method can be guessed quickly, so it should be disabled."
   ],
   [
    "UPnP (Universal Plug and Play)",
    "A feature that lets devices open router ports automatically without approval, which malware can abuse."
   ],
   [
    "Port forwarding",
    "A rule that sends traffic arriving on an external port to a specific internal IP address and port."
   ],
   [
    "DHCP reservation",
    "A setting that always gives the same IP address to a device identified by its MAC address."
   ],
   [
    "Content filtering",
    "Blocking websites by category or domain at the router or another filtering device."
   ],
   [
    "Guest network",
    "A separate SSID and network segment that gives visitors internet access without reaching internal resources."
   ],
   [
    "Screened subnet",
    "A separate network zone, formerly called a DMZ, for devices that must be reachable from the internet."
   ],
   [
    "Firmware",
    "The built-in software that runs the router, updated by the vendor to fix bugs and security flaws."
   ]
  ],
  "example": "A dental office's router has WPS on, UPnP on and the default admin password, and patients use the staff Wi-Fi. A technician updates the firmware, changes the admin password, disables WPS, UPnP and remote administration, reserves an address for the imaging server, forwards only the one port its vendor needs for support, and creates an isolated guest SSID for the waiting room.",
  "mistakes": [
   [
    "Hiding the SSID and enabling MAC filtering makes the Wi-Fi secure.",
    "Hidden networks are still detected by scanning tools, and MAC addresses are easy to spoof. Real protection comes from WPA3 or WPA2 with AES and a strong passphrase."
   ],
   [
    "The WPS push button is harmless, so WPS can stay on.",
    "The exam treats WPS as a feature to disable. The PIN method can be brute-forced, and many routers keep it active alongside the button, so turn WPS off completely."
   ],
   [
    "A port forward to a device's current IP address is enough.",
    "If the device gets its address from the DHCP pool, it may receive a different one after a reboot and the rule breaks. Pair the forward with a DHCP reservation or a static IP outside the pool."
   ],
   [
    "Updating firmware once during setup is sufficient.",
    "Vulnerabilities are found throughout a router's life. Check for updates regularly or enable automatic updates, and replace routers the vendor no longer supports."
   ]
  ],
  "tryit": [
   [
    "A home-based bookkeeper says her router's admin page shows several port mappings for addresses she does not recognize, and she never created any forwarding rules. Her antivirus recently flagged a program on her laptop. Which router feature most likely created the mappings, and what should you do?",
    "UPnP, which lets software open ports automatically without approval. Disable UPnP, remove the mappings, clean the infected laptop, change the router admin password and update the firmware."
   ],
   [
    "A law office wants clients in the lobby to have Wi-Fi, but the partners worry about clients seeing the shared file server. What should you configure?",
    "A guest network on its own SSID and passphrase, isolated from the office LAN, with client isolation enabled if available. Clients get internet access only and cannot reach the file server or printers."
   ]
  ],
  "tip": "The first hardening step for any SOHO router is changing the default admin password. Port forwarding needs a stable internal address, so pair it with a DHCP reservation or static IP. Ports opening by themselves means UPnP; a guessable setup PIN means WPS.",
  "check": [
   [
    "What is the first thing you should change on a newly installed SOHO router?",
    "The default administrator password, because default credentials are publicly known and tried automatically by attackers."
   ],
   [
    "A port-forwarding rule to a security camera stops working after the router reboots. What is the likely fix?",
    "Give the camera a DHCP reservation or a static IP outside the pool, because it received a different dynamic address and the rule now points to the wrong device."
   ],
   [
    "Why should UPnP usually be disabled?",
    "It lets any device or program on the network open ports on the router without approval, and malware can use it to expose internal systems."
   ],
   [
    "How does a guest network protect an office?",
    "It gives visitors internet access on a separate SSID and segment, so their devices cannot reach office computers, printers or shares."
   ],
   [
    "A manager wants to stop staff from reaching gambling sites. Which router feature fits?",
    "Content filtering, which blocks websites by category or domain."
   ]
  ]
 },
 {
  "t": "Browser security: trusted sources and hash checks, extensions, password managers, certificates, pop-up blockers, clearing cache, private browsing, profile sync",
  "hook": "Devon, a new hire at Lakeside Realty, opens a ticket before lunch: every search he types now lands on a search page he has never seen, crowded with ads. Yesterday he needed to convert a PDF, clicked the first big green Download button he found, and accepted whatever the installer offered. His browser is signed in to his personal account, which also syncs to his home laptop and his phone. You sit down at his desk and open the browser menu. Somewhere in here is the thing that changed his searches. Will removing it be enough, or has it already followed him home?",
  "simple": "Your web browser is like a wallet you carry everywhere online. It holds your saved passwords, keeps you signed in to sites, and can copy all of that to your other devices. Browser security is about keeping that wallet safe. Download programs only from the real maker, and check a file's fingerprint (called a hash) when the maker publishes one. Add only the extensions you truly need, because some can read every page you open. Let a password manager create a different strong password for every site. Treat the padlock as 'this connection is private', not 'this site is honest'. And know that private browsing only keeps your history off that one computer; it does not make you invisible, just like closing your curtains does not hide your car in the driveway.",
  "body": [
   "The web browser is where users meet most online threats, from fake downloads and malicious extensions to phishing pages. It holds saved passwords, session cookies and synced data, so securing it protects much more than web surfing. As a technician you will install and configure browsers, clean up problems and advise users, and the exam expects you to know what each browser security feature does and, just as important, what it does not do.",
   "Start with where software comes from. Install browsers, extensions and applications only from trusted sources: the vendor's official site or an official app or extension store. Avoid download mirrors and ads styled as download buttons, which often bundle adware or install extra toolbars unless the user unticks small boxes during setup. When a vendor publishes a hash, such as a SHA-256 (Secure Hash Algorithm, 256-bit) value, compute the hash of your downloaded file and compare. A hash is a fixed-length fingerprint of the file's contents; change one byte and the hash changes completely. Matching hashes show the file was not altered or corrupted in transit; a mismatch means do not install it. On Windows you can use `certutil -hashfile file.iso SHA256` or PowerShell's `Get-FileHash file.iso`, and on Linux or macOS `sha256sum` or `shasum -a 256`.",
   "Extensions (also called add-ons or plug-ins) add features, but many can read and change every page you visit. When you add one, the browser shows the permissions it wants, such as 'read and change all your data on all websites'. A malicious extension, or a legitimate one that was sold to a new owner and updated with bad code, can steal data, inject ads or redirect searches. Install only extensions you need, from the official store and reputable developers, review the permissions they request, and remove unused ones. Organizations can allow-list approved extensions and block the rest through group policy or MDM (mobile device management) tools.",
   "Password managers generate and store a unique, strong password for every site and fill it automatically. This defeats password reuse, where one breached site exposes every account that shares the password. They also help against phishing, because a manager matches the saved entry to the exact domain and will not auto-fill on a look-alike domain; if the manager stays silent on a 'bank' login page, that is a warning sign. Browsers include built-in managers, and standalone managers work across browsers and devices. Protect either with a strong master password and MFA (multifactor authentication).",
   "Certificates make HTTPS (Hypertext Transfer Protocol Secure) work. A site presents a digital certificate issued by a trusted certificate authority (CA). The browser checks that it is valid, unexpired, issued for the site's name and chains to a trusted root certificate stored on the device, then sets up an encrypted connection and shows a padlock or similar indicator. The padlock means the connection is encrypted to that domain, not that the site is honest; phishing sites can obtain valid certificates too. Certificate warnings, such as an expired certificate, a name mismatch or an untrusted issuer, should never be clicked through casually, because they may signal an on-path attack where someone is intercepting traffic. Organizations may install their own internal CA certificate on managed devices so internal sites are trusted.",
   "Several features handle everyday privacy and nuisance. Pop-up blockers stop sites from opening unwanted windows, often ads or scams, and you can allow pop-ups for specific trusted sites, such as a bank's statement viewer, rather than turning the blocker off everywhere. Clearing the cache and cookies removes stored website data; it fixes many display and sign-in problems and removes tracking data, but it also signs the user out of sites and erases saved site preferences. Private browsing (called Incognito or InPrivate in different browsers) does not keep history, cookies or form data after the window closes, which suits shared computers. It does not hide activity from the network, the employer, the ISP (internet service provider) or the sites visited, and it offers no malware protection.",
   "Profile sync signs the browser into an account so bookmarks, passwords, history, extensions and settings follow the user to other devices. It is convenient, but it spreads saved passwords and extensions everywhere, including a bad extension, so protect the sync account with MFA and keep personal and work profiles separate on corporate devices. Finally, keep the browser itself updated. Browsers patch serious vulnerabilities often, and most update automatically if they are allowed to restart; a browser that has shown an 'update pending' badge for weeks is a risk.",
   "Consider a worked example. A user's searches keep landing on an unfamiliar search engine full of ads. You open the extension manager and find a 'PDF converter' add-on installed from a pop-up, with permission to read and change data on all sites. You remove it, reset the default search engine and home page, clear the cache and check that the extension does not return through sync, removing it from the synced account if it does. You then show the user how to install extensions only from the official store and check the permissions before clicking Add.",
   "Exam questions tend to use clear clue words. 'Verify a downloaded file has not been altered' points to comparing hashes. 'Unique strong password for every site' points to a password manager. 'Shared computer, leave no history' points to private browsing. 'Bookmarks and passwords on every device' points to profile sync. 'Site displays fine after clearing stored data' points to clearing the cache, and 'untrusted issuer' or 'name mismatch' points to a certificate problem."
  ],
  "analogy": "Private browsing is like borrowing a hotel notepad and tearing off your page when you leave: the next guest cannot read what you wrote, but the hotel staff saw you come in and the people you called know you called. A hash check is like comparing a package's tamper seal number with the one printed on the order confirmation. Where the hotel analogy stops: tearing off the page does not protect you if the pen itself was bugged, just as private mode gives no protection from malware already on the PC.",
  "terms": [
   [
    "Hash check",
    "Comparing a computed hash of a downloaded file with the vendor's published value to confirm the file was not altered."
   ],
   [
    "Browser extension",
    "An add-on that extends browser features and may be able to read and change the pages you visit."
   ],
   [
    "Password manager",
    "A tool that generates, stores and auto-fills unique strong passwords and will not fill them on look-alike domains."
   ],
   [
    "Certificate authority (CA)",
    "A trusted organization that issues digital certificates binding a public key to a domain name."
   ],
   [
    "Pop-up blocker",
    "A browser feature that stops sites from opening unwanted new windows, with exceptions for trusted sites."
   ],
   [
    "Private browsing",
    "A mode that does not keep history, cookies or form data after the window closes, without hiding activity from networks or sites."
   ],
   [
    "Profile sync",
    "Signing the browser into an account so bookmarks, passwords, extensions and settings follow the user across devices."
   ]
  ],
  "example": "A new hire downloads a free video player from an ad-filled mirror site, and the next day the browser shows ads on every page. The technician removes the bundled adware and two extensions it added, then reinstalls the player from the vendor's site after comparing its SHA-256 hash with the published value. They also turn on the browser's built-in password manager with MFA on the sync account.",
  "mistakes": [
   [
    "Private browsing makes the user anonymous and safe from malware.",
    "It only avoids saving history, cookies and form data on that device. The network, employer, ISP and websites can still see activity, and malware is not blocked."
   ],
   [
    "A padlock means the site is legitimate and safe.",
    "It means the connection is encrypted to the named domain. Phishing sites can have valid certificates, so check the domain itself."
   ],
   [
    "If one site needs pop-ups, disable the pop-up blocker.",
    "Add an exception for that trusted site and leave the blocker on for everything else."
   ],
   [
    "Clearing the cache is a harmless first step with no side effects.",
    "It also clears cookies if selected, which signs the user out of sites and removes saved preferences. Warn the user before doing it."
   ]
  ],
  "tryit": [
   [
    "A finance team member downloads a disk image of an open-source tool from a mirror because the main site is slow. The vendor's page lists a SHA-256 value. Her computed hash differs in the last few characters. She says it is probably close enough. What do you tell her?",
    "Do not install it. Any difference in a hash means the file is not identical to what the vendor published, whether from corruption or tampering. Delete it, download from the official source, and compare again."
   ],
   [
    "A sales manager wants his work laptop's browser to have the same bookmarks, passwords and extensions as his home computer, so he plans to sign in with his personal browser account. What is the concern and the better approach?",
    "Syncing a personal profile brings personal extensions and passwords onto a corporate device and can carry work data home. Use a separate work profile with a work account, protected with MFA, and keep the personal profile off the corporate laptop."
   ]
  ],
  "tip": "Private browsing only avoids saving history, cookies and form data on the local device; it is not anonymity or malware protection. A valid padlock proves encryption to a named domain, not that the site is trustworthy.",
  "check": [
   [
    "How do you confirm that a downloaded installer matches what the vendor published?",
    "Compute its hash, for example with Get-FileHash or certutil, and compare it to the vendor's published hash; a match shows it was not altered."
   ],
   [
    "A user wants no browsing history left on a library computer. What should they use, and what does it not protect against?",
    "Private browsing; it does not hide activity from the network or sites and does not protect against malware."
   ],
   [
    "Why does a password manager help against phishing?",
    "It fills passwords only on the exact domain they were saved for, so it will not fill them on a look-alike phishing site."
   ],
   [
    "What is a side effect of clearing the browser cache and cookies?",
    "The user is signed out of websites and loses saved site preferences, although display and sign-in problems are often fixed."
   ]
  ]
 },
 {
  "t": "Windows symptoms: blue screen (BSOD), degraded performance, boot problems, frequent shutdowns, services not starting, application crashes, low memory warnings, USB controller resource warnings, system instability, no OS found, slow profile load, time drift",
  "hook": "Your ticket queue at Riverbend Community College looks like a symptom catalog this morning. A lab PC shows a blue screen every afternoon. A professor's laptop says no operating system was found. The registrar's office reports that three people cannot sign in to the domain and something about the time is wrong. A media workstation complains that the USB controller is out of resources. Each user believes their problem is unique and urgent. You have one coffee and a few hours. Which of these point to hardware, which to software, and which can you solve before the coffee goes cold?",
  "simple": "When a Windows computer misbehaves, what you see is a clue, the way a cough or a fever is a clue for a doctor. A blue error screen usually means a bad driver (the small program that runs a piece of hardware), failing memory or overheating. A computer that suddenly turns off with no error is often too hot or has a weak power supply. 'No operating system found' often just means a USB stick was left plugged in and the computer tried to start from it. A clock that is wrong every morning usually means the tiny battery on the motherboard has died. Learning which clue points to which cause lets you fix things faster, like knowing a flat tire, not the engine, is why the car pulls to one side.",
  "body": [
   "Troubleshooting starts with recognizing a symptom and knowing what it usually points to. The exam describes what a user sees and asks for the most likely cause or the best next step, so you need a mental map from each symptom to its common causes. Before jumping to fixes, ask three questions every time: what changed recently, does it affect one user or many, and is it more likely hardware or software? These questions narrow the list quickly and are part of the first step of the CompTIA troubleshooting methodology, identifying the problem.",
   "A blue screen of death (BSOD), also called a stop error, means Windows hit a fatal error and halted to protect data. The screen shows a stop code, such as IRQL_NOT_LESS_OR_EQUAL, sometimes with the name of the driver file involved, and Windows writes a memory dump file for later analysis. Common causes are faulty or incompatible drivers, failing RAM (random access memory), overheating, disk errors and recent hardware or software changes. Write down the stop code, check Event Viewer and Reliability Monitor, and think about what changed. System instability, meaning random freezes, restarts and odd errors without a clear pattern, has the same list of suspects plus malware and power problems.",
   "Performance symptoms come next. Degraded performance, where the PC is simply slow, often comes from too many startup programs, a nearly full disk, too little RAM for the workload, a failing drive, malware, background updates or thermal throttling, where the CPU (central processing unit) slows itself down to stay cool. Low memory warnings mean the system is running out of RAM and virtual memory; a program with a memory leak, too many open applications or a small paging file can cause them. In Task Manager you would see memory use near 100 percent and one process growing steadily over hours if a leak is to blame.",
   "Software that will not run has its own pattern. Application crashes come from bugs, corrupt installations, missing dependencies, incompatible versions or damaged user settings, and they are usually logged as Application Error events. Services not starting usually trace to a disabled service, a failed dependency, wrong service account credentials or corrupt files; the Services console (`services.msc`) shows the startup type and dependencies, and the System log in Event Viewer shows the reason the service failed.",
   "Boot problems deserve special care. 'No OS found' (or 'Operating system not found') means the firmware found no bootable disk. Check the boot order in UEFI (Unified Extensible Firmware Interface) or BIOS (Basic Input/Output System) settings, look for a USB stick or disc left attached, confirm the drive is detected at all, and consider damaged boot records or boot configuration. 'Bootmgr is missing' and similar messages point to damaged boot files, which Startup Repair can often fix. Frequent shutdowns, where the PC powers off suddenly with no BSOD, point strongly to overheating (dust, a failed fan, dried thermal paste) or a failing power supply, rather than software, because the hardware is protecting itself or simply losing power.",
   "Sign-in delays are often about the network rather than the PC. A slow profile load, a long wait at the Welcome screen, often comes from a large or corrupt roaming profile, slow connections to mapped drives or logon scripts, or a corrupt local profile. A badly corrupt profile may cause Windows to sign the user in with a temporary profile, with a message that the user cannot access their files, and changes made in that session are lost at sign-out.",
   "Two symptoms are easy to forget. USB controller resource warnings appear when too many devices share one USB controller and it runs out of resources, such as endpoints or bandwidth. Moving devices to ports on a different controller, removing a hub, or updating chipset drivers usually fixes it. Time drift means the system clock is wrong or slowly wanders. Causes include a failing CMOS (complementary metal-oxide semiconductor) battery, which shows as time resetting after the PC loses power, a wrong time zone, and failure to sync with a time source using NTP (Network Time Protocol) or, in a domain, the domain controller. Time matters: Kerberos authentication fails when clocks differ too much, and certificate checks can fail, so drift often shows up as sign-in or HTTPS errors rather than as a complaint about the clock.",
   "Consider a worked example. A workstation shows a BSOD every afternoon, and the stop code names a network driver file. You open Reliability Monitor and see the crashes began the day after a new network adapter driver was installed. The pattern, a specific driver and a recent change, tells you the cause is almost certainly the driver, not RAM or heat. You roll back the driver in Device Manager, the crashes stop, and you record the driver version in the ticket so it is not redeployed.",
   "Exam questions map clue words to causes. 'Stop error after installing a new driver' points to the driver. 'Shuts down without warning, especially under load' points to overheating or the power supply. 'Clock is wrong every morning after unplugging' points to the CMOS battery. 'Cannot log on to the domain and the time is off' points to time drift and Kerberos. 'Operating system not found with a flash drive attached' points to boot order. 'Not enough USB controller resources' points to redistributing devices across controllers, and 'user gets a temporary profile' points to a corrupt profile."
  ],
  "analogy": "Symptom matching works like a car's dashboard. A blue screen is the engine warning light with a code you can look up. A sudden power-off with no message is the car stalling on a hot day: the problem is usually cooling or fuel (power supply), not the radio (software). A clock that resets overnight is a car that forgets its radio presets every time the battery is disconnected. The analogy stops at diagnosis: Windows gives you far richer logs than a dashboard, so always read the stop code and Event Viewer rather than guessing from the light alone.",
  "terms": [
   [
    "BSOD (stop error)",
    "A Windows fatal error screen that halts the system and shows a stop code, often caused by drivers, RAM or heat."
   ],
   [
    "Stop code",
    "The identifier on a blue screen that names the kind of fatal error and helps locate the cause."
   ],
   [
    "Memory leak",
    "A program fault where memory is allocated but never released, gradually exhausting RAM."
   ],
   [
    "No OS found",
    "A boot error meaning firmware could not find a bootable operating system on the devices in the boot order."
   ],
   [
    "USB controller resource warning",
    "A message that a USB controller has run out of endpoints or bandwidth because too many devices share it."
   ],
   [
    "Time drift",
    "A system clock that is wrong or gradually wanders, which can break Kerberos authentication and certificate checks."
   ],
   [
    "CMOS battery",
    "The small motherboard battery that keeps firmware settings and the real-time clock while the PC is unplugged."
   ],
   [
    "Temporary profile",
    "A fallback profile Windows loads when the user's profile cannot be read; changes are lost at sign-out."
   ]
  ],
  "example": "Several users in one office cannot sign in to the domain, and they see an error about the time. Their PCs show clocks eight minutes behind the domain controller. The technician finds that a recent group policy change broke time synchronization, fixes the policy, forces a resync, and sign-ins succeed because Kerberos tolerates only a small clock difference.",
  "mistakes": [
   [
    "Reinstall Windows as soon as a BSOD appears.",
    "Read the stop code and check what changed first. Most stop errors trace to a driver, RAM or heat, and a rollback or hardware test fixes them in minutes."
   ],
   [
    "Sudden power-offs with no error screen are a software bug.",
    "Without a stop error, think hardware protection or power loss: overheating from dust or a failed fan, or a failing power supply."
   ],
   [
    "'No OS found' means the hard drive has failed.",
    "Check the boot order and remove any USB drive or disc first. Then confirm the drive is detected before assuming failure."
   ],
   [
    "A clock that resets after unplugging needs a time-sync fix in Windows.",
    "Time that resets after power loss points to a failing CMOS battery. Sync settings explain slow drift, not a full reset."
   ]
  ],
  "tryit": [
   [
    "A video editor plugs a capture card, two external drives, a webcam and a keyboard into a hub connected to the front ports of her PC. Windows shows a message that there are not enough USB controller resources, and the webcam stops working. What do you suggest?",
    "The devices are sharing one controller and exhausting its endpoints or bandwidth. Move some devices, such as the drives, directly to rear ports on a different controller, remove the hub if possible, and update chipset drivers."
   ],
   [
    "A user at a branch office waits several minutes at the Welcome screen every morning. Other users on the same PC sign in quickly. His profile is a roaming profile, and he keeps large video files on his desktop. What is the likely cause?",
    "A large roaming profile that must copy over the network at each sign-in. Move the large files out of the profile (for example to a network share or redirected folder), and check for slow mapped drives or logon scripts."
   ]
  ],
  "tip": "Unexpected shutdowns without a BSOD usually mean heat or power. 'No OS found' often means boot order or a USB drive left attached. A clock that resets after power loss means the CMOS battery, and domain sign-in failures with a wrong clock mean time drift.",
  "check": [
   [
    "A PC powers off suddenly several times a day with no blue screen. What are the most likely causes?",
    "Overheating or a failing power supply, because sudden power-offs without a stop error usually come from hardware protection or power loss."
   ],
   [
    "A computer reports that no operating system was found after a user left a flash drive in. What should you check first?",
    "The boot order and any attached USB drives, because the firmware may be trying to boot from the flash drive."
   ],
   [
    "Why can time drift cause domain sign-in failures?",
    "Kerberos authentication requires client and domain controller clocks to be close, so a large difference makes tickets invalid."
   ],
   [
    "What does a USB controller resource warning mean, and how is it usually fixed?",
    "Too many devices share one controller's resources; move some devices to ports on another controller or remove a hub."
   ],
   [
    "Low memory warnings appear after a PC has been on for a day, and one program's memory use keeps climbing. What is the likely cause?",
    "A memory leak in that program; restarting it gives temporary relief, and updating or replacing it is the fix."
   ]
  ]
 },
 {
  "t": "Windows fixes: reboot, restart services, uninstall/reinstall/update apps, add resources, verify requirements, sfc and DISM, repair Windows, System Restore, reimage, roll back updates, rebuild the user profile",
  "hook": "At Cedar Grove Insurance, Priya's Start menu stopped opening this morning, and search does nothing. Your newest teammate, eager to help, already has a USB stick with the company image in hand. 'Faster to wipe it,' he says. Priya looks worried; she has a week of unsaved client notes on her desktop. You notice that when the receptionist signs in to the same PC, everything works perfectly. A reimage would take most of the day and might lose those notes. Is there a fix that takes twenty minutes instead, and how do you know which one fits?",
  "simple": "Fixing Windows is like treating an illness: start with the gentlest treatment that matches the problem, and only move to surgery if you must. First try turning it off and on again (a restart). If one program misbehaves, update it, repair it, or reinstall it. If Windows' own files are damaged, built-in tools can scan and replace them. If trouble started right after an update or a new driver, undo that change. If only one person's account is broken, give that person a fresh account profile and copy their files over. Wiping the whole computer and starting fresh (reimaging) is the last resort, like rebuilding a house because one room had a leaky tap. Always save the person's files before anything risky.",
  "body": [
   "Once you have identified a probable cause, you need to choose a fix. The guiding rule is to try the least disruptive fix that addresses the cause, then escalate to more drastic options only if needed. A reboot costs the user a minute; a reimage can cost a day. Before anything that could lose data, back up the user's files, and document every step in the ticket so the next technician knows what was tried. This matches the CompTIA troubleshooting methodology: establish a plan of action, implement it, verify full functionality, and document findings.",
   "Start simple. A reboot clears memory, restarts services and completes pending updates, and it fixes a surprising number of problems. Choose Restart rather than Shut down, because with fast startup enabled a shutdown saves the kernel session to disk instead of fully reloading it. If one service has stopped, restart it in the Services console (`services.msc`) or Task Manager's Services tab, check its startup type and dependencies, and read the System log for the reason it failed. A service set to Disabled will not start no matter how often you click Start, and a service that depends on another stopped service will fail until the dependency runs.",
   "For a misbehaving application, follow a short ladder. Update it first, since the vendor may already have fixed the bug. Then try the Repair or Reset option in Settings > Apps > Installed apps, under the app's advanced options; Repair keeps data, while Reset clears the app's data. Then uninstall and reinstall it to replace damaged files and settings. Some problems are really capacity or compatibility. If the system lacks capacity, add resources: more RAM (random access memory) for low-memory warnings, a larger or faster drive for a full disk, or a larger paging file. Before blaming Windows, verify requirements: confirm the application, driver or OS version meets the vendor's stated requirements for CPU (central processing unit), RAM, storage, OS edition and 32-bit or 64-bit architecture. An app that needs more than the hardware offers will never run well no matter how often you reinstall it.",
   "For corrupted system files, use the built-in repair tools from an elevated (Run as administrator) prompt. `sfc /scannow` (System File Checker) scans protected system files and replaces damaged ones from the local component store, and reports whether it found and fixed problems. If sfc reports it could not fix everything, the component store itself may be damaged, so run DISM (Deployment Image Servicing and Management) with /RestoreHealth to repair it, usually by downloading good copies from Windows Update, then run sfc again so it can use the repaired store.",
   "```\nsfc /scannow\nDISM /Online /Cleanup-Image /RestoreHealth\nsfc /scannow\n```",
   "If Windows is badly damaged, repair Windows itself. Use Startup Repair from the Windows Recovery Environment (WinRE) for boot problems, or perform an in-place repair install (running Windows setup over the existing installation, choosing to keep files and apps) that reinstalls Windows while keeping applications and personal data.",
   "When problems began after a change, undo the change. System Restore returns system files, drivers, registry settings and installed programs to a restore point without touching personal documents, so it will not recover a deleted file. Roll back a driver in Device Manager from the device's Driver tab. Roll back updates by uninstalling a recent quality update from Settings > Windows Update > Update history > Uninstall updates, or by going back to the previous feature version within the allowed period; pause updates while you wait for a vendor fix so the same update does not reinstall overnight.",
   "For problems that affect only one user, such as settings not saving, a temporary profile, or apps crashing only for that person, rebuild the user profile. Back up the user's data, sign in as another administrator, rename or remove the damaged profile folder under C:\\Users and its entry under the ProfileList registry key, have the user sign in to create a fresh profile, then copy their data back. When the system is heavily damaged, infected beyond confidence, or would take longer to fix than to rebuild, reimage it with the standard image or use Reset this PC, which can keep or remove personal files.",
   "Consider a worked example. After a monthly update, a line-of-business app crashes on start for every user on one PC model. Reliability Monitor shows the crashes began the morning after the update installed, and other models without the update are fine. You uninstall that specific update from Update history, pause updates on those machines, confirm the app works, and report the conflict to the vendor. You did not reinstall the app or reimage, because the evidence pointed to the update.",
   "Exam questions reward order and matching. 'Only one user affected' points to rebuilding the profile. 'Problem began after an update' points to rolling back the update. 'sfc cannot repair files' points to DISM. 'Undo recent driver and program changes but keep documents' points to System Restore, and 'malware cannot be removed with confidence' points to reimaging. 'App needs more memory than the PC has' points to adding resources or verifying requirements, not reinstalling."
  ],
  "analogy": "sfc and DISM work like a mechanic and a parts warehouse. sfc is the mechanic who swaps damaged parts for good ones taken from the warehouse shelf (the component store). If the warehouse shelf holds broken parts too, the mechanic cannot finish, so DISM restocks the warehouse first, and then the mechanic tries again. The analogy stops with personal files: neither tool touches documents, just as a mechanic does not repack the luggage in your trunk.",
  "terms": [
   [
    "sfc /scannow",
    "The System File Checker command that scans and repairs protected Windows system files from the component store."
   ],
   [
    "DISM",
    "Deployment Image Servicing and Management, used with /RestoreHealth to repair the component store that sfc depends on."
   ],
   [
    "System Restore",
    "A feature that returns system files, drivers, registry and programs to an earlier restore point without changing personal files."
   ],
   [
    "In-place repair install",
    "Running Windows setup over the existing installation to replace system files while keeping apps and data."
   ],
   [
    "Reimage",
    "Wiping a computer and reinstalling a standard operating system image, the most thorough and disruptive fix."
   ],
   [
    "Rebuilding a user profile",
    "Replacing a corrupt Windows user profile with a fresh one and copying the user's data back."
   ],
   [
    "Roll back",
    "Reverting a driver or update to the previous version when the new one causes problems."
   ]
  ],
  "example": "A user's Start menu and search stop working, but only on her account; another user on the same PC has no problem. The technician backs up her documents and desktop, renames her profile folder, removes its ProfileList registry entry, has her sign in to generate a new profile, and copies her data back. Everything works, and the ticket notes the profile corruption as the cause.",
  "mistakes": [
   [
    "Reimaging first is the quickest reliable fix.",
    "It is the most disruptive option and risks data loss. Try fixes that match the cause first; reimage when the system is heavily damaged or infected beyond confidence."
   ],
   [
    "Run DISM and you are done.",
    "DISM repairs the component store; sfc then needs to run again to repair system files using that store."
   ],
   [
    "System Restore can recover a deleted document.",
    "System Restore changes system files, drivers, registry settings and programs, not personal files. Use backups or File History for documents."
   ],
   [
    "A problem on one account means Windows is broken.",
    "If other users on the same PC are fine, the problem follows the profile. Back up the data and rebuild that user's profile."
   ]
  ],
  "tryit": [
   [
    "A design firm's CAD application runs slowly and shows low memory warnings on one older workstation. You have reinstalled it twice. The vendor lists a minimum of more RAM than the workstation has installed. What is your next step?",
    "Stop reinstalling. Verify requirements and add resources: the PC does not meet the app's memory requirement, so install more RAM (or move the user to a machine that meets the requirements)."
   ],
   [
    "After a new graphics driver is pushed overnight, three PCs show display flicker and occasional crashes, while PCs that missed the push are fine. What fix is most appropriate?",
    "Roll back the graphics driver in Device Manager on the affected PCs, since the evidence ties the problem to the recent driver change, and hold the driver from deployment until the vendor fixes it."
   ]
  ],
  "tip": "Pick the least invasive fix that matches the cause: restart before reinstall, update or repair the app before repairing Windows, sfc then DISM then sfc, System Restore before reimage. If only one user has the problem, suspect the profile.",
  "check": [
   [
    "sfc /scannow reports that some files could not be repaired. What should you run next?",
    "DISM /Online /Cleanup-Image /RestoreHealth to repair the component store, then run sfc /scannow again."
   ],
   [
    "Does System Restore bring back a document the user deleted yesterday?",
    "No. System Restore changes system files, drivers, registry and programs, not personal files."
   ],
   [
    "An app crashes for one user but works for others on the same PC. What fix is most likely?",
    "Rebuild that user's profile, after backing up their data, because the problem follows the profile."
   ],
   [
    "When is reimaging the right choice?",
    "When the system is heavily damaged or infected beyond confidence, or when a rebuild is faster than further troubleshooting, after data is backed up."
   ],
   [
    "Why choose Restart instead of Shut down when troubleshooting?",
    "With fast startup enabled, Shut down saves the kernel session instead of fully reloading it; Restart performs a full reload."
   ]
  ]
 },
 {
  "t": "Using Event Viewer, Reliability Monitor, Task Manager and Safe Mode / Windows Recovery Environment to find root causes",
  "hook": "Marcus, the night supervisor at Northgate Logistics, leaves you a voicemail: the dispatch laptop restarted itself again during his shift, the fourth time this week. No blue screen, no error message, just black and then the sign-in screen. The day shift says it is fine for them. You could reinstall Windows and hope, or replace the laptop and hope. Windows has been quietly writing down everything that happened, though, and you know where to look. Which tool will tell you whether this is a bad update, a failing driver, or something else entirely?",
  "simple": "Windows keeps a diary of what goes wrong, and a few built-in tools let you read it. Event Viewer is the detailed diary, with entries for errors, warnings and sign-ins. Reliability Monitor is a calendar that shows crashes and software installs side by side, so you can spot what changed right before trouble started. Task Manager shows what is happening right now, like a live heart-rate monitor. Safe Mode starts Windows with only the bare essentials, which helps you tell whether an add-on program is causing trouble. The Windows Recovery Environment is a small repair kit that loads when Windows itself will not start. Picking the right tool is like a doctor choosing between a patient's chart, a live monitor and the emergency room.",
  "body": [
   "Guessing wastes time. Windows records a great deal about what goes wrong, and a handful of built-in tools let you trace a symptom back to its root cause instead of treating it again and again. Each tool answers a different question, so the skill the exam tests is choosing the right one for the situation: what is happening now, what was logged, what changed, and what to do when Windows will not start normally.",
   "Event Viewer (`eventvwr.msc`) is the central log reader. The main Windows logs are Application (events from programs), System (events from Windows components and drivers, such as service failures, disk errors and unexpected shutdowns) and Security (audited events such as successful and failed sign-ins). Setup and Forwarded Events also exist, and Applications and Services Logs hold detailed logs for individual components. Each event has a level (Information, Warning, Error, Critical), a date and time, a source and an Event ID. Rather than scrolling through thousands of entries, use Filter Current Log to show only Error and Critical events from the hour the problem occurred, then look up the source and Event ID in vendor documentation. Custom views save useful filters for next time.",
   "Reliability Monitor answers a different question. You open it by searching for 'reliability history', or through Control Panel > Security and Maintenance. It shows a day-by-day stability chart, and each day lists application failures, Windows failures, miscellaneous failures, warnings, and informational events such as software installs and successful updates. Because it places crashes next to installs on a single timeline, it is the fastest way to answer 'what changed right before this started?' Click any event to see its details, and use the link to view technical details when you need the faulting module or error code.",
   "Task Manager (Ctrl+Shift+Esc) shows what is happening right now. The Processes tab shows which program is using CPU (central processing unit), memory, disk or network; the Performance tab shows whether RAM (random access memory), disk or CPU is saturated; the Startup apps tab lists programs that load at sign-in with their impact; and the Services tab shows running services. Resource Monitor, opened from the Performance tab, breaks down disk and network use per process, which helps when Task Manager shows the disk at 100 percent but you need to know which files are being hit. Task Manager has no history, though: it cannot tell you what happened yesterday.",
   "When Windows is too unstable to troubleshoot normally, Safe Mode starts it with a minimal set of drivers and services. If a problem disappears in Safe Mode, the cause is probably a third-party driver, startup program or service, and you can remove or disable it from there. Safe Mode with Networking adds network drivers so you can download tools or updates, and Safe Mode with Command Prompt gives a command shell. You reach Safe Mode through WinRE's Startup Settings, or by setting Safe boot on the Boot tab of `msconfig`; remember to clear that setting afterward, or the PC will keep booting into Safe Mode.",
   "The Windows Recovery Environment (WinRE) is a small recovery operating system. It loads automatically after repeated failed boots, and you can reach it from Settings > System > Recovery > Advanced startup, by holding Shift while choosing Restart, or by booting installation media. Under Troubleshoot > Advanced options it offers Startup Repair, Startup Settings (including Safe Mode), System Restore, Uninstall Updates, System Image Recovery, UEFI (Unified Extensible Firmware Interface) Firmware Settings and a Command Prompt for tools such as `chkdsk`, `sfc` and boot-repair commands like `bootrec`. Together these let you fix a machine that never reaches the desktop, often in minutes instead of a reinstall.",
   "The tools work best together. A typical investigation starts in Reliability Monitor to find when the trouble began and what changed, moves to Event Viewer for the exact error and Event ID around that time, uses Task Manager if the problem is happening live, and falls back to Safe Mode or WinRE when Windows cannot run normally. Note each finding in the ticket as you go, since the Event ID and timestamps are evidence the next technician can use.",
   "Consider a worked example. A laptop restarts on its own a few times a week. You open Reliability Monitor and see 'Windows was not properly shut down' on those days, with no application failures or installs just before. In Event Viewer's System log you find a Kernel-Power critical event (Event ID 41) each time, which means the system lost power or stopped responding without a clean shutdown; there is no BSOD (blue screen of death) recorded. The laptop's vents are clogged with dust. You clean the cooling system, monitor temperatures under load, and the unexpected restarts stop.",
   "Exam questions pair the need with the tool. 'Which process is using all the CPU right now' points to Task Manager. 'Failed sign-in attempts' points to the Security log in Event Viewer. 'A service failed to start at boot' points to the System log. 'Crashes began sometime last week; what changed' points to Reliability Monitor. 'Problem disappears when only essential drivers load' points to Safe Mode and a third-party driver or startup item. 'PC will not reach the desktop' points to WinRE and Startup Repair."
  ],
  "analogy": "Think of a hospital. Task Manager is the bedside monitor showing heart rate right now. Event Viewer is the detailed medical chart with every note the staff wrote. Reliability Monitor is the timeline on the whiteboard that shows 'new medication started Tuesday, symptoms began Wednesday'. Safe Mode is taking the patient off all optional medications to see if symptoms stop, and WinRE is the emergency room for a patient who cannot walk in on their own. The analogy stops in one place: unlike a chart, the Security log records only what auditing is configured to capture.",
  "terms": [
   [
    "Event Viewer",
    "The Windows log reader showing Application, System, Security and other logs with levels, sources and Event IDs."
   ],
   [
    "Event ID",
    "A number that identifies a specific type of logged event and can be looked up in documentation."
   ],
   [
    "Reliability Monitor",
    "A timeline of failures, warnings and installs used to find what changed before a problem began."
   ],
   [
    "Task Manager",
    "A tool showing current processes, performance, startup apps and services."
   ],
   [
    "Resource Monitor",
    "A detailed view of per-process CPU, memory, disk and network activity, opened from Task Manager."
   ],
   [
    "Safe Mode",
    "A startup mode that loads only essential drivers and services to isolate third-party causes."
   ],
   [
    "Windows Recovery Environment (WinRE)",
    "A recovery OS offering Startup Repair, Safe Mode access, System Restore, uninstalling updates and a command prompt."
   ]
  ],
  "example": "A PC became very slow this morning. Task Manager's Processes tab shows a backup agent using nearly all disk activity. Reliability Monitor shows that agent was updated overnight, and Event Viewer's Application log shows it retrying a failed job every minute. The technician fixes the job's destination path, the agent calms down, and performance returns.",
  "mistakes": [
   [
    "Driver and service failures are in the Application log.",
    "They are recorded in the System log. The Application log holds events from programs."
   ],
   [
    "The Security log will show why the PC crashed.",
    "The Security log holds audited events such as sign-ins. Crashes and unexpected shutdowns appear in the System log and Reliability Monitor."
   ],
   [
    "Task Manager can show what slowed the PC down yesterday.",
    "Task Manager shows only the present. Use Reliability Monitor or Event Viewer for past events."
   ],
   [
    "After using msconfig Safe boot, the PC will return to normal by itself.",
    "The Safe boot setting persists. Clear it in msconfig or the PC keeps starting in Safe Mode."
   ]
  ],
  "tryit": [
   [
    "A receptionist says her PC has been crashing in a reservations app 'for a while, maybe since last week'. She cannot remember any changes. You have ten minutes before her next appointment. Which tool do you open first and why?",
    "Reliability Monitor, because it shows application failures and installs on the same day-by-day timeline, so you can see when the crashes began and whether an update or install happened just before."
   ],
   [
    "A PC freezes shortly after sign-in every time, too fast to troubleshoot. In Safe Mode it runs normally for an hour. What does this suggest, and what do you do next?",
    "A third-party driver, startup program or service is likely the cause, since Safe Mode loads only essentials. From Safe Mode, disable recently added startup items and services or roll back a recent driver, then restart normally to test, one change at a time."
   ]
  ],
  "tip": "Use the right tool for the question: 'what is slow right now' is Task Manager, 'what errors were logged' is Event Viewer, 'what changed before this started' is Reliability Monitor, and 'Windows will not boot' is WinRE.",
  "check": [
   [
    "Which Event Viewer log records failed sign-in attempts, and which records a driver or service failure?",
    "The Security log records audited sign-ins; the System log records driver and service failures."
   ],
   [
    "What does it tell you if a problem disappears in Safe Mode?",
    "The cause is probably a third-party driver, startup program or service, because Safe Mode loads only essential components."
   ],
   [
    "Which tool best shows that a crash started right after a software install?",
    "Reliability Monitor, because it shows failures and installs on the same day-by-day timeline."
   ],
   [
    "Name two ways to reach the Windows Recovery Environment.",
    "Hold Shift while choosing Restart, use Settings > System > Recovery > Advanced startup, boot from installation media, or let it load after repeated failed boots."
   ]
  ]
 },
 {
  "t": "Mobile OS and app issues: app fails to launch, close or update; slow response; poor battery life; random reboots; Bluetooth, Wi-Fi and NFC connectivity; screen won't autorotate",
  "hook": "It is Friday afternoon at Bayview Home Health, and the field nurses are calling in one after another. Rosa's charting app will not open. Kenji's phone dies by lunch. Amara's tablet will not turn sideways to show the medication chart, and Luis cannot pay for parking with his phone anymore. Each of them asks the same thing: should I just reset it? A factory reset would wipe their offline notes and take an hour each to set back up. Most of these problems have a two-minute fix, if you know where to look first. Which one do you try for each?",
  "simple": "Fixing a phone or tablet usually means climbing a ladder from the gentlest step to the most drastic. First close the app and open it again. Then restart the device. Then update the app and the phone's system. Then clear the app's temporary files, or reinstall it. Only at the very top, after saving everything, do you erase the device completely (a factory reset). Many problems are simple settings: a screen that will not turn sideways often has rotation lock switched on, and a headset that will not connect may still be linked to another phone. Battery drain usually comes from one hungry app, which the battery screen will name. It is like checking whether a lamp is plugged in before calling an electrician.",
  "body": [
   "Mobile troubleshooting follows the same method as PC troubleshooting, but the tools are simpler and the fixes follow a predictable ladder. From least to most disruptive: close and reopen the app, restart the device, update the app and the operating system, clear the app's cache or data, reinstall the app, reset network settings, and as a last resort back up and factory reset. Knowing that ladder lets you pick the right next step for each symptom, which is exactly what exam questions ask. Always ask what changed, such as a new app, an OS update or a new accessory, before climbing.",
   "When an app fails to launch or keeps crashing, force-stop it and try again, then restart the device. Check that both the app and the OS are up to date, because apps often break on outdated OS versions or before the developer supports a new one. On Android you can clear the app's cache and, if needed, its data from the app's page in Settings > Apps; clearing the cache removes temporary files only, while clearing data resets the app to a fresh state and may sign the user out. On iOS you can offload the app (remove it but keep its documents and data) and reinstall it, or delete and reinstall it. Check storage too, since many apps fail or refuse to update when the device is nearly full.",
   "An app that fails to close is usually frozen; swipe it away in the app switcher or restart the device. Apps that fail to update usually point to low storage, a poor connection, an app store account or payment problem, or an OS version the new release no longer supports. The store will often show a message such as 'insufficient storage' or 'requires a newer version of the operating system', which tells you which cause you are dealing with.",
   "Performance and power problems have their own usual suspects. Slow response usually comes from low storage, too many apps running, an outdated OS, or an overheating device that throttles its processor. Freeing space, closing apps, updating and restarting are the standard fixes. Poor battery life comes from high screen brightness, apps running in the background, weak cellular signal (the radio works harder to stay connected), location services, and an aging battery. Check the battery usage screen to see which apps consume the most, restrict their background activity or location access, and check battery health, because lithium-ion batteries lose capacity over time. A swollen battery is a safety hazard, not a battery-life issue: stop using and charging the device and send it for service.",
   "Random reboots may be caused by faulty apps, OS bugs fixed in updates, overheating, a failing battery or hardware faults. Update everything, look for a recently installed app, and check whether the reboots happen while charging or under heavy load. If they persist, back up and reset, or send the device for repair.",
   "For connectivity problems, check the obvious first: airplane mode is off and the right radio is on. For Wi-Fi, confirm the device is in range, forget the network and rejoin it with the correct password, and restart the access point if many devices are affected. For Bluetooth, confirm the accessory is charged and in pairing mode, unpair (forget) it and pair again, and make sure it is not still connected to another phone or laptop, since many accessories connect to only one device at a time. For NFC (near-field communication), which powers contactless payments and tap-to-pair, confirm NFC is enabled, the payment app is set as the default, and the phone is held very close to the reader, since NFC works only over a few centimeters and thick or metal cases interfere.",
   "When many connectivity features misbehave at once, reset network settings. This clears saved Wi-Fi networks, Bluetooth pairings and VPN (virtual private network) settings and fixes many stubborn issues, but the user must re-enter Wi-Fi passwords and pair accessories again afterward, so warn them first.",
   "When the screen won't autorotate, check that rotation lock (portrait orientation lock) is off in the control center or quick settings panel. Some apps and home screens do not rotate by design, so test in an app that should rotate, such as the browser or video player. If rotation still fails, restart the device; a persistent failure may point to a faulty accelerometer or gyroscope, the sensors that detect orientation.",
   "Consider a worked example. A user says her phone's battery barely lasts until lunch since last week. You open the battery usage screen and see a newly installed fitness app using most of the power in the background, with location access set to 'always'. You change its location access to 'only while using the app' and restrict its background activity. Battery life returns to normal the next day, and you did not need to reset anything, because the evidence pointed to one app.",
   "Exam questions use clear clue words. 'Screen will not rotate' points to rotation lock first. 'App will not update' points to storage, connectivity or OS compatibility. 'Battery drains fast after installing an app' points to background activity and the battery usage screen. 'Bluetooth headset will not connect' points to unpairing and re-pairing. 'Contactless payment fails' points to NFC being disabled or the default payment app, and 'many connectivity problems at once' points to resetting network settings."
  ],
  "analogy": "The mobile fix ladder is like dealing with a jammed office printer. First you cancel the job and try again (force stop), then you turn the printer off and on (restart), then you install the latest driver (update), then you clear the queue (clear cache), then you reinstall the printer (reinstall app), and only after that do you call for a replacement (factory reset). The analogy stops at data: clearing an app's data is more like wiping the printer's saved settings, so the user has to set things up again.",
  "terms": [
   [
    "Force stop",
    "Ending an app's process completely so it can be relaunched from a clean state."
   ],
   [
    "Clear cache",
    "Removing an app's temporary files without deleting the user's account or settings."
   ],
   [
    "Clear data",
    "Resetting an app to its freshly installed state, removing its settings and sign-in."
   ],
   [
    "Offload app",
    "An iOS option that removes an app but keeps its documents and data for reinstallation."
   ],
   [
    "Reset network settings",
    "Clearing saved Wi-Fi networks, Bluetooth pairings and VPN settings to fix stubborn connectivity problems."
   ],
   [
    "NFC (near-field communication)",
    "Very short-range wireless used for contactless payments and tap-to-pair."
   ],
   [
    "Rotation lock",
    "A setting that keeps the screen in portrait orientation regardless of how the device is held."
   ],
   [
    "Accelerometer",
    "A sensor that detects movement and orientation, used for autorotation."
   ]
  ],
  "example": "A sales rep's phone will not connect to his car's hands-free system after he bought a new phone. The technician finds the car still remembers the old phone as its active device. They remove the old pairing in the car, delete the car from the new phone's Bluetooth list, put the car in pairing mode and pair again, and calls now route through the car speakers.",
  "mistakes": [
   [
    "Factory reset is the fastest way to fix most phone problems.",
    "It erases everything and should be the last step after a backup. Most app and connectivity issues are fixed by restarting, updating, clearing cache or re-pairing."
   ],
   [
    "Clearing app data is the same as clearing the cache.",
    "Clearing the cache removes temporary files only. Clearing data resets the app completely, including settings and sign-in."
   ],
   [
    "A screen that will not rotate needs a sensor replacement.",
    "Check rotation lock first, and test in an app that is designed to rotate. Suspect the accelerometer only if those checks fail."
   ],
   [
    "A swollen battery just means poor battery life.",
    "A swollen lithium-ion battery is a safety hazard. Stop using and charging the device and send it for service."
   ]
  ],
  "tryit": [
   [
    "A field technician's phone keeps saying an app update failed. He has 400 MB of free space, the app is 1 GB, and his Wi-Fi works fine. His OS is current. What is the most likely cause and the fix?",
    "Insufficient storage. Free space by removing unused apps, offloading apps or moving photos to cloud or a computer, then retry the update."
   ],
   [
    "A manager's phone suddenly cannot join the office Wi-Fi, will not pair with her earbuds, and her VPN app fails to connect. Coworkers have no problems. Restarting did not help. What is a reasonable next step and what should you warn her about?",
    "Reset network settings on her phone, since several connectivity features fail together on one device. Warn her that saved Wi-Fi networks, Bluetooth pairings and VPN settings will be removed, so she will need to re-enter passwords and pair again."
   ]
  ],
  "tip": "Screen will not rotate: check rotation lock first. App will not update: check storage and OS compatibility. Bluetooth accessory will not connect: unpair and re-pair. Factory reset is always the last step, after a backup.",
  "check": [
   [
    "A user's screen will not rotate in any app. What is the first thing to check?",
    "Whether rotation lock is enabled in the control center or quick settings panel."
   ],
   [
    "An app will not install its latest update. Name two likely causes.",
    "Insufficient storage, a poor connection, an app store account problem, or an OS version the new release no longer supports."
   ],
   [
    "What is the downside of resetting network settings on a phone?",
    "It removes saved Wi-Fi networks, Bluetooth pairings and VPN settings, so the user must re-enter passwords and pair again."
   ],
   [
    "A phone battery is visibly swollen. What should you do?",
    "Stop using and charging the device and send it for service, because a swollen lithium-ion battery is a safety hazard."
   ],
   [
    "Contactless payment fails at every store, though the card works. What do you check?",
    "That NFC is enabled, the payment app is the default, and the phone is held close to the reader without a thick or metal case."
   ]
  ]
 },
 {
  "t": "Mobile security issues: unofficial app stores, jailbreaking and rooting, sideloaded APKs, high network traffic, data-limit alerts, sluggish response, fake security warnings, unexpected app behavior, leaked personal files",
  "hook": "Halfway through the month, Jordan from the warehouse team at Summit Outdoor Supply forwards you a text from the carrier: the company phone has used its entire data allowance. Jordan swears nothing has changed, just the usual email and scanner app. The phone also runs warm in his pocket and the battery barely lasts the shift. When you ask about new apps, he mentions a free video app a friend sent him as a download link, since it was not in the store. You hold the phone. Is this just a busy month, or is something on it talking to someone else?",
  "simple": "Phones stay safe mainly because of two guards. The first is the official app store, which checks apps before letting people download them. The second is a wall inside the phone that keeps each app in its own room so it cannot snoop on the others. Most phone security problems start when someone gets around one of those guards: downloading apps from unofficial stores or random websites, or 'jailbreaking' or 'rooting' the phone to remove the wall. Warning signs include using far more data than usual, a hot and slow phone, scary pop-ups saying the phone is infected, and apps acting on their own. It is like a house where someone propped the front door open: the strange noises inside are the symptoms, the open door is the cause.",
  "body": [
   "Mobile devices are protected mainly by two things: official app stores that screen apps before publishing them, and an operating system sandbox that keeps each app isolated from other apps and from the system. Most mobile security problems begin when a user weakens one of those protections. This topic splits naturally into causes (what weakened the device) and symptoms (what you notice when something is wrong), and the exam expects you to tell them apart and choose the right response.",
   "Start with the causes. Unofficial app stores, meaning third-party marketplaces, do not vet apps the way official stores do, and many host repackaged copies of popular apps with malware added. Sideloading means installing an app from outside the official store. On Android this usually means downloading an APK (Android Package) file and allowing installs from unknown sources; sideloaded APKs skip store screening and are a common way to deliver spyware, stalkerware and banking trojans. The phone usually shows a warning when the user grants a browser or file manager permission to install unknown apps, and that warning is worth taking seriously.",
   "Jailbreaking (on iOS) and rooting (on Android) remove the manufacturer's restrictions and grant full administrative control. That also removes the security model that keeps apps isolated, so any app granted elevated rights can reach other apps' data. Jailbroken or rooted devices may not receive or install official OS updates normally, may void warranties, and cause MDM (mobile device management) systems to flag the device as noncompliant and block it from company email or apps. Organizations normally forbid unofficial stores, sideloading, jailbreaking and rooting on devices that access company data.",
   "Now the symptoms. High network traffic and data-limit alerts when the user has not changed their habits can mean malware is sending data out, downloading ads or taking part in a botnet. Sluggish response, overheating and fast battery drain can mean hidden processes such as cryptominers or spyware. Fake security warnings, pop-ups claiming 'your phone is infected' and urging the user to install a cleaner app or call a number, are scareware; the real mobile OS does not warn users that way. Unexpected app behavior includes apps opening on their own, apps the user did not install, changed settings, new permissions, or strange messages sent from the user's accounts. Leaked personal files, such as photos, messages or documents appearing online or used for extortion, indicate stolen data, often through a malicious app with excessive permissions or a compromised cloud account.",
   "Each symptom has innocent explanations too, so verify before acting. A data alert may come from a new streaming habit or automatic photo backup over cellular, and sluggishness may just be a full device. Check the data usage screen to see which app used the traffic, check the battery screen to see which app is busy, and ask what changed. An app you do not recognize at the top of both lists is strong evidence; a familiar streaming app is probably just streaming.",
   "When the evidence points to malware, respond calmly and in order. Disconnect the device from networks if active data theft is suspected. Review installed apps, especially recently installed ones and any with device administrator or accessibility privileges, which malware abuses to control the screen and resist removal; revoke those privileges, then remove anything unrecognized. Review app permissions, update the OS, and run a reputable mobile security scan. If the device is jailbroken or rooted, or symptoms persist, back up personal data only (not apps, which could reinstall the malware), factory reset, and restore that personal data.",
   "Accounts need attention too. Change passwords for accounts used on the device from a clean device, enable MFA (multifactor authentication), and check cloud accounts for unknown sessions or connected devices. If stalkerware is suspected, be aware the person who installed it may notice its removal, and involve appropriate support with care for the user's safety. Prevention is simpler than cleanup: official stores only, prompt OS updates, MDM policies that block unknown sources and detect jailbreaks, and periodic permission reviews.",
   "Consider a worked example. An employee's phone triggers a data-limit alert halfway through the month, and the battery drains quickly. The data usage screen shows a 'free' video app using gigabytes in the background. It was installed from a website as an APK and has permissions for SMS (text messages), contacts and accessibility services. You disconnect the phone, back up the employee's photos and contacts, factory reset it, restore the personal data, have the employee change passwords from a clean computer, and enable an MDM policy that blocks installs from unknown sources.",
   "Exam questions use strong clue words. 'Installed from outside the store' or 'APK from a website' points to sideloading. 'Bypassed manufacturer restrictions for full control' points to jailbreaking (iOS) or rooting (Android). 'Data-limit alert with no change in use' points to malware sending traffic. 'Pop-up says the phone is infected and to install a cleaner' points to a fake security warning. 'The best fix for a compromised or jailbroken phone' is usually backing up personal data and a factory reset."
  ],
  "analogy": "A phone is like an apartment building with a doorman (the app store) who checks every visitor, and locked apartments (the sandbox) so tenants cannot walk into each other's homes. Sideloading lets visitors in through the loading dock, past the doorman. Jailbreaking or rooting hands out a master key that opens every apartment. High data use and a hot phone are the strange noises neighbors report afterward. The analogy stops at cleanup: in a building you evict one bad tenant, but on a compromised phone the safest fix is often to reset the whole building and move back only the personal belongings.",
  "terms": [
   [
    "Sideloading",
    "Installing an app from outside the official app store, bypassing its security screening."
   ],
   [
    "APK (Android Package)",
    "The file format used to distribute and install Android apps."
   ],
   [
    "Jailbreaking",
    "Removing Apple's iOS restrictions to gain full control, which weakens the security model."
   ],
   [
    "Rooting",
    "Gaining full administrative (root) access on Android, which removes built-in protections."
   ],
   [
    "Unofficial app store",
    "A third-party marketplace that does not screen apps as thoroughly as official stores."
   ],
   [
    "Scareware",
    "Fake security warnings designed to frighten users into installing malware, paying or calling a scammer."
   ],
   [
    "Stalkerware",
    "Hidden monitoring software installed to track a person's location, messages or activity without consent."
   ],
   [
    "Sandbox",
    "The operating system boundary that isolates each app from other apps and from the system."
   ]
  ],
  "example": "A user reports that her phone keeps showing full-screen ads even on the home screen and that she received a 'virus detected' pop-up. The technician finds a flashlight app from a third-party store with device administrator rights. They remove its admin rights, uninstall it, update the OS, change the user's account passwords from a clean PC, and enable a policy that allows only the official store.",
  "mistakes": [
   [
    "Battery drain and rooting are both symptoms of malware.",
    "Rooting is a cause that weakens the device; battery drain is a symptom. Exam questions often test this distinction."
   ],
   [
    "After a factory reset, restore the full backup to get everything back.",
    "A full backup may include the malicious app. Restore personal data only and reinstall apps from the official store."
   ],
   [
    "Tap the 'clean now' button on the virus warning to be safe.",
    "That pop-up is scareware. Close it without tapping, and do not install anything or call any number it shows."
   ],
   [
    "iPhones cannot get malware, so iOS users are safe.",
    "A jailbroken iPhone has lost much of its protection, and any device can be phished or have its cloud account compromised."
   ]
  ],
  "tryit": [
   [
    "A college student worker's Android phone shows an unfamiliar app in Settings with device administrator rights and accessibility access. The phone sends text messages she did not write. The app has no icon on the home screen. What do you do first, and in what order?",
    "Disconnect the phone from networks, then revoke the app's device administrator and accessibility privileges so it can be removed, uninstall it, update the OS and scan. Change her account passwords from a clean device and enable MFA. If anything persists, back up personal data only and factory reset."
   ],
   [
    "An employee asks if he can root his company Android phone to install a custom launcher. The company uses MDM. What do you tell him?",
    "No. Rooting removes the security model that isolates apps, can stop official updates, and the MDM system will flag the phone as noncompliant and likely block company email and apps. Use launchers available in the official store if policy allows."
   ]
  ],
  "tip": "Jailbreaking, rooting, unofficial stores and sideloading are causes; high data use, battery drain, fake warnings and strange app behavior are symptoms. The usual remedy for a compromised or jailbroken device is backing up personal data and a factory reset.",
  "check": [
   [
    "What is the difference between jailbreaking and rooting?",
    "Jailbreaking removes restrictions on iOS; rooting gains full administrative access on Android. Both weaken the security model."
   ],
   [
    "A phone shows a data-limit alert although the user's habits have not changed. What might it indicate?",
    "Malware sending data out or downloading content in the background; check data usage per app to confirm."
   ],
   [
    "Why should you restore only personal data, not apps, after resetting a compromised phone?",
    "Restoring apps from the backup could reinstall the malicious app and bring the infection back."
   ],
   [
    "A pop-up says the phone is infected and offers a cleaner app. What is it and what should the user do?",
    "It is a fake security warning (scareware); close it without tapping and do not install anything or call any number."
   ],
   [
    "Why should passwords be changed from a different device after a phone compromise?",
    "Malware on the phone could capture the new passwords as they are typed."
   ]
  ]
 },
 {
  "t": "PC security issues: unable to reach the network, fake antivirus alerts, altered or missing system files, unwanted OS notifications, failed OS updates",
  "hook": "At Maple Ridge Veterinary Clinic, the front-desk PC has been acting strange for two days. Kayla can read the news and order supplies, but the antivirus says it cannot update, and the security vendor's website just times out. This morning a window appeared claiming forty-seven infections and offering to remove them for a fee, with a phone number for 'priority support'. Kayla almost called. You arrive, and the first thing you notice is that Windows Update has failed six times in a row. Each problem looks small on its own. Together, what are they telling you?",
  "simple": "Some computer problems are not ordinary glitches but clues that harmful software, called malware, is on the machine. Malware often tries to protect itself by blocking the things that could remove it: security websites, antivirus updates and Windows updates. So if most websites work but security sites do not, or both the antivirus and Windows Update keep failing, be suspicious. Pop-ups that pretend to be antivirus and ask for money or a phone call are fake. When you see these signs, follow a set cleanup procedure instead of just fixing the one symptom, like a doctor treating an infection rather than only handing out cough drops.",
  "body": [
   "Some symptoms on a Windows PC are strong signs of malware rather than ordinary faults. The exam expects you to recognize them, rule out the everyday explanations, and then respond with the malware removal procedure instead of simply patching over the symptom. Malware often damages the very things that would help you remove it, such as network access to security sites, update services and system files, so these symptoms are clues about what it is trying to protect itself from.",
   "Being unable to reach the network, or reaching only some sites, can be caused by malware. Some malware changes the DNS (Domain Name System) server settings on the adapter, edits the `hosts` file at `C:\\Windows\\System32\\drivers\\etc\\hosts` to redirect or block security sites, sets a rogue proxy, or disables network adapters so the machine cannot be updated or cleaned. A classic sign is that general browsing works but antivirus vendors' sites and Windows Update do not. Of course, rule out ordinary network faults first: check cabling, Wi-Fi, IP (Internet Protocol) configuration with `ipconfig /all`, and whether other users are affected. Then compare DNS, proxy and hosts settings with a known-good machine.",
   "Fake antivirus alerts, also called rogue antivirus or scareware, look like security software reporting dozens of infections and demanding payment for a 'full version', or urging the user to call a support number. They may be a pop-up from a website or a program actually installed on the machine. Genuine alerts come from the security product the organization uses, which you can confirm in Windows Security or the managed antivirus console. Never pay and never call; treat the PC as possibly infected and investigate.",
   "Unwanted OS notifications appear in the Windows notification area, often because the user clicked 'Allow' when a website asked to send notifications. The site then delivers ads or fake warnings that look like system messages, and the notification usually names the browser and the website as its source. Remove that site's notification permission in the browser settings and check for adware.",
   "Altered or missing system files, such as renamed or deleted files in System32, changed permissions, or unfamiliar executables in system folders, may result from malware tampering with the OS or hiding itself, often causing errors or crashes. Run `sfc /scannow` (System File Checker) to detect and repair changed protected files, scan with updated anti-malware tools, and consider reimaging if the system's integrity cannot be trusted. Also watch for changed file extensions and files encrypted by ransomware.",
   "Failed OS updates, where Windows Update keeps failing or the security software cannot update its definitions, are another classic sign, because malware tries to keep the machine vulnerable by stopping or breaking update services. Low disk space, corrupted update components and network problems cause failures too, so check those first, but if Windows Update and the antivirus both fail, suspect malware.",
   "When several of these signs appear together, along with others such as a disabled antivirus or firewall, security settings that revert after you fix them, unknown user accounts or new startup items, follow CompTIA's seven-step malware removal procedure. First, investigate and verify malware symptoms. Second, quarantine the infected system by disconnecting it from the network. Third, disable System Restore in Windows so infected restore points are not reused. Fourth, remediate by updating anti-malware software and scanning, using Safe Mode or a preinstallation environment if needed. Fifth, schedule scans and run updates. Sixth, enable System Restore and create a new restore point. Seventh, educate the end user. The order matters on the exam, especially that quarantine comes right after verification.",
   "Consider a worked example. A user reports that their antivirus says it cannot update and that the vendor's website will not load, although news and shopping sites work. You open the hosts file and find entries pointing the antivirus vendor's domains and Microsoft's update domains to `127.0.0.1`, the local loopback address, which silently blocks them. Recognizing malware tampering, you disconnect the PC, disable System Restore, scan from bootable rescue media, clean the hosts file, update and rescan, then re-enable System Restore, create a restore point and explain to the user how the infection likely arrived.",
   "Exam questions use recognizable patterns. 'Only security websites are unreachable' points to hosts file, DNS or proxy tampering by malware. 'Pop-up demands payment to remove detected threats' points to rogue antivirus. 'Security software and Windows Update both fail' points to malware. 'Notifications with ads appear in the Windows corner after visiting a site' points to browser notification permissions. 'What should be done first' is usually verifying the symptoms; 'what should be done next after confirming malware' is quarantine."
  ],
  "analogy": "Malware that blocks security sites and updates is like a burglar who, once inside, cuts the alarm wires and unplugs the phone so you cannot call for help. Seeing that the phone line only fails when you dial the police, while calls to friends go through, tells you someone tampered with it on purpose. The analogy stops at the fix: you do not just reconnect the phone line (clean the hosts file); you find and remove the burglar, using the full removal procedure.",
  "mnemonic": "I Quietly Destroy Really Sneaky Evil Executables: Investigate and verify, Quarantine, Disable System Restore, Remediate, Schedule scans and run updates, Enable System Restore and create a restore point, Educate the end user.",
  "terms": [
   [
    "Rogue antivirus",
    "Fake security software that reports invented infections to extort payment or install malware."
   ],
   [
    "Hosts file",
    "A local file that maps names to IP addresses before DNS is used, which malware can edit to redirect or block sites."
   ],
   [
    "Rogue proxy",
    "An unauthorized proxy setting that routes the PC's web traffic through a server controlled by an attacker."
   ],
   [
    "System File Checker (sfc)",
    "A Windows tool that scans protected system files and repairs altered or missing ones."
   ],
   [
    "Quarantine",
    "Isolating an infected system from the network so malware cannot spread or communicate."
   ],
   [
    "Malware removal procedure",
    "CompTIA's seven ordered steps from verifying symptoms through educating the user."
   ],
   [
    "Loopback address",
    "127.0.0.1, an address that points back to the local machine; malware uses it in the hosts file to block domains."
   ]
  ],
  "example": "A PC's Windows Security page shows real-time protection turned off, and each time the technician turns it on, it switches off again within minutes. Windows Update also fails with generic errors. Rather than repeatedly re-enabling protection, the technician treats this as malware, disconnects the PC, disables System Restore, and cleans it from a preinstallation environment before updating and rescanning.",
  "mistakes": [
   [
    "Fixing the hosts file or DNS setting solves the problem.",
    "Those changes are symptoms. Unless the malware that made them is removed, it will make them again. Follow the malware removal procedure."
   ],
   [
    "Calling the number in the antivirus pop-up is a safe way to check.",
    "The number belongs to scammers. Real alerts come from Windows Security or the managed antivirus. Never call or pay."
   ],
   [
    "Every failed Windows update means malware.",
    "Low disk space, corrupted update components and network problems also cause failures. Suspect malware when updates and antivirus both fail or other signs appear."
   ],
   [
    "Leave System Restore on during cleanup in case something goes wrong.",
    "CompTIA's procedure disables it so infected restore points are removed, then re-enables it and creates a clean restore point after remediation."
   ]
  ],
  "tryit": [
   [
    "A bookkeeper's PC can browse most sites, but Windows Update and the antivirus vendor's site fail. A coworker's PC on the same network reaches both. The bookkeeper's adapter shows DNS servers you do not recognize. What do you conclude and what is your next step?",
    "The pattern suggests malware changed the DNS settings to block security sites. Having verified the symptoms, the next step is to quarantine the PC by disconnecting it from the network, then continue the malware removal procedure."
   ],
   [
    "A user says ads keep appearing as Windows notifications in the corner of the screen, labeled with a browser name and a recipe website. Antivirus scans are clean and updates work. What is the likely cause and fix?",
    "The user allowed that website to send notifications. Remove the site's notification permission in the browser settings and check for adware or unwanted extensions."
   ]
  ],
  "tip": "When security software and Windows Update both fail, or only security sites are unreachable, suspect malware. Real Windows security alerts come from Windows Security or the managed antivirus, never from a browser pop-up with a phone number.",
  "check": [
   [
    "Why might malware edit the hosts file?",
    "To redirect or block specific domains, such as antivirus and update sites, so the PC cannot be cleaned or patched."
   ],
   [
    "What are the first two steps of the CompTIA malware removal procedure?",
    "Investigate and verify malware symptoms, then quarantine the infected system."
   ],
   [
    "Why is System Restore disabled during malware removal?",
    "So restore points that may contain the malware are removed and cannot reinfect the system later."
   ],
   [
    "Ads appear as Windows notifications after a user visited a website. What is the likely cause and fix?",
    "The user allowed the site to send notifications; remove its notification permission in the browser settings and check for adware."
   ],
   [
    "What is the last step of the malware removal procedure?",
    "Educate the end user about how the infection happened and how to avoid it."
   ]
  ]
 },
 {
  "t": "Browser security issues: random pop-ups, certificate warnings, redirection, degraded browser performance",
  "hook": "On Tuesday morning at Willow Creek Library, Ellen, the branch manager, calls the help desk. Every secure website on her office PC shows a red warning page: the bank, the email portal, even the library's own catalog. Her coworker at the next desk has no problems. Ellen is nervous; she read that warnings like this can mean someone is spying on the connection, and she wonders if the library has been hacked. You look at her screen, and before opening a single setting you notice something small in the corner of the taskbar. Could the answer really be that simple?",
  "simple": "The web browser is often the first place a person notices trouble. Four signs are worth knowing. Pop-ups that appear everywhere usually mean unwanted software or a bad browser add-on. Security warnings about a website's certificate (its online ID card) can mean the site has a problem, the computer's clock is wrong, or someone is listening in. Being sent to a different website than you typed means something changed where the browser looks up addresses. A browser that crawls may have too many tabs or a sneaky add-on using the computer's power. Like a sore throat, each sign can be harmless or serious, so you check the simple explanation first and then dig deeper.",
  "body": [
   "The browser is where users most often notice that something is wrong. The exam covers four browser symptoms: random pop-ups, certificate warnings, redirection and degraded browser performance. Each can have an innocent explanation, but each is also a classic sign of adware, a malicious extension or other malware. Your job is to tell the harmless cause from the security problem, fix it, and educate the user so it does not happen again.",
   "Random pop-ups that appear even on trusted sites, or when no website is open, are a strong sign of adware, a malicious extension, or site notifications the user allowed. Check the browser's extensions and remove anything unknown, review which sites are allowed to send notifications, make sure the pop-up blocker is on, check installed programs for adware, and run an anti-malware scan. If a pop-up claims the computer is infected and shows a phone number, it is a tech support scam. Close the browser, using Task Manager to end it if the page blocks closing, and never call the number or allow remote access.",
   "Certificate warnings appear when the browser cannot validate a site's certificate, and the warning page usually names the reason, such as an expired certificate, a name mismatch or an untrusted issuer. Harmless causes include an expired certificate on that one site, a name mismatch (the certificate was issued for a different name), and a wrong date and time on the PC; a clock that is years off makes nearly every certificate look expired or not yet valid. Security-relevant causes include an on-path attack, where someone intercepts traffic with their own certificate, often on untrusted public Wi-Fi or through a malicious proxy, and malware that installed a rogue root certificate so interception looks trusted.",
   "The number of affected sites is your best clue. If many sites show warnings, check the system clock first, then the proxy settings and the certificate store (`certmgr.msc`) for unknown root certificates in Trusted Root Certification Authorities. If only one site shows a warning, the problem is probably that site's certificate, or interception on that one connection. Users should never click through a warning on a site where they enter credentials.",
   "Redirection means the browser goes somewhere other than where the user asked: searches go through an unfamiliar search engine, or typing a bank's address leads to a look-alike page. Causes include a hijacked home page or search provider set by a malicious extension or program, a modified hosts file, altered DNS (Domain Name System) settings on the PC or the router, or a malicious proxy. Fix it by removing the offending extension or program, resetting the browser's settings, checking the hosts file, DNS and proxy configuration, and scanning for malware. If every device on the network is redirected, look at the router's DNS settings rather than one PC, since a change there affects everything that uses it.",
   "Degraded browser performance, where the browser becomes slow, freezes or uses a lot of memory and CPU (central processing unit), may come from too many open tabs or extensions, a bloated cache, an outdated browser, or malicious scripts such as in-browser cryptomining. Use the browser's own task manager (available in Chromium-based browsers with Shift+Esc) to find the tab or extension using resources, disable extensions one at a time, clear the cache, update the browser, and reset it to defaults if needed. A single tab using most of the CPU on a site that should be idle is a red flag for a mining script.",
   "Whichever symptom you start with, check every installed browser, not just the default one, because adware often installs extensions in all of them. When any of these symptoms point to malware, handle the machine with the malware removal procedure rather than fixing only the browser.",
   "Consider a worked example. A user reports certificate warnings on nearly every HTTPS (Hypertext Transfer Protocol Secure) site since this morning. You notice the taskbar clock shows a date several years in the past. Because one wrong setting explains every warning, you check the time before anything else: you correct the date, enable automatic time sync, and the warnings disappear. Because the clock may have reset after a power loss, you log a follow-up to check the CMOS (complementary metal-oxide semiconductor) battery. Had the clock been correct, your next checks would have been the proxy settings and unknown root certificates.",
   "Exam questions tend to follow patterns. 'Warnings on every HTTPS site' points to the system date and time first, then an intercepting proxy or rogue root certificate. 'Warning on one site only' points to that site's certificate or interception on that connection. 'Search results go through an unknown search engine' points to a browser hijacker extension. 'Pop-up says call support to remove a virus' points to a scam. 'Browser slow with high CPU on one tab' points to a malicious or heavy script, found with the browser's task manager."
  ],
  "analogy": "A certificate is like a photo ID that a website shows at the door. If every visitor's ID looks expired to the guard, the problem is probably the guard's calendar, not the visitors, which is the wrong-clock case. If one visitor's ID shows a different name, that visitor deserves suspicion. If someone has replaced the guard's list of trusted ID issuers with a forged one, fake IDs pass without complaint, which is the rogue root certificate case. The analogy stops in that last case: there the browser shows no warning at all, so you must check the certificate store yourself.",
  "terms": [
   [
    "Adware",
    "Unwanted software that displays advertising, often through pop-ups, injected ads or redirected searches."
   ],
   [
    "Browser hijacker",
    "Software or an extension that changes the home page, search engine or new tab page without consent."
   ],
   [
    "Certificate warning",
    "A browser message that a site's certificate is expired, mismatched or from an untrusted issuer."
   ],
   [
    "On-path attack",
    "An attack where someone intercepts traffic between two parties, formerly called man-in-the-middle."
   ],
   [
    "Rogue root certificate",
    "An unauthorized certificate authority certificate installed so that intercepted traffic appears trusted."
   ],
   [
    "Cryptomining script",
    "Code that uses the visitor's CPU to mine cryptocurrency, slowing the browser."
   ],
   [
    "Tech support scam",
    "A fake alert urging the user to call a number or allow remote access to fix a non-existent problem."
   ]
  ],
  "example": "Every PC in a small office suddenly sends users to a look-alike banking site, while phones on mobile data reach the real site. The technician checks the router and finds its DNS servers changed to unknown addresses and its admin password still at the default. They reset the router's DNS to the ISP's servers, change the admin password, update the firmware and clear DNS caches on the PCs.",
  "mistakes": [
   [
    "Certificate warnings on every site mean all those websites are broken.",
    "When nearly every site warns, the common factor is the PC. Check the date and time first, then proxy settings and the root certificate store."
   ],
   [
    "Clicking through a certificate warning is fine if you know the site.",
    "On a login page, a warning may signal interception. Do not enter credentials; investigate the cause instead."
   ],
   [
    "Removing the hijacker extension fixes everything.",
    "Hijackers also change the home page and search engine and may have installed in other browsers. Reset browser settings and check every installed browser."
   ],
   [
    "A slow browser always means a slow network.",
    "Check the browser's task manager first. One extension or tab running a heavy script can consume the CPU even on a fast connection."
   ]
  ],
  "tryit": [
   [
    "A remote worker connects to a coffee shop's Wi-Fi and gets a certificate warning only when opening the company webmail. At home, webmail works with no warning, and her PC clock is correct. What do you suspect, and what should she do?",
    "Possible interception on the untrusted network (an on-path attack), since the warning appears only on that connection and the clock is fine. She should not proceed or enter credentials; disconnect and use a trusted connection or the company VPN, and report it."
   ],
   [
    "A user says his browser freezes for seconds at a time, and the fan roars whenever one particular streaming site is open, even when paused. Other sites are fine. How do you find the cause?",
    "Open the browser's built-in task manager (Shift+Esc in Chromium-based browsers) and check CPU use per tab and extension. A tab or extension using heavy CPU while idle suggests a cryptomining or heavy script; close the tab, remove any suspicious extension, clear the cache and scan."
   ]
  ],
  "tip": "Certificate errors on every site usually mean a wrong system clock, or an intercepting proxy or rogue root certificate. A warning on just one site usually means that site's certificate has a problem, or that connection is being intercepted.",
  "check": [
   [
    "A user sees certificate warnings on almost every HTTPS website. What do you check first?",
    "The system date and time, because a wrong clock makes valid certificates appear expired or not yet valid."
   ],
   [
    "A user's searches are sent through an unfamiliar search engine. What is the likely cause?",
    "A browser hijacker, usually a malicious extension or program that changed the search provider."
   ],
   [
    "How can you find which tab or extension is slowing the browser?",
    "Use the browser's built-in task manager to see CPU and memory use per tab and extension."
   ],
   [
    "All devices on a network are redirected to fake sites. Where should you look?",
    "At the router's DNS settings, since a change there affects every device that uses it."
   ],
   [
    "A pop-up says the computer is infected and to call a support number. What should the user do?",
    "Close the browser, using Task Manager if needed, and never call the number or allow remote access; it is a tech support scam."
   ]
  ]
 },
 {
  "t": "Checking and repairing startup items, scheduled tasks, browser extensions and proxy settings after an infection",
  "hook": "Two days ago you cleaned adware off Tomas's laptop at Granite Peak Engineering. The scan came back clean, the ads stopped, and you closed the ticket feeling good. This morning the ticket is open again. 'The ads are back,' Tomas writes, 'right after I turned the laptop on.' The same shopping site opens by itself at sign-in, and his searches go through a strange engine again. The malware file you deleted is still gone. So what brought everything back, and where is it hiding that your scan did not look?",
  "simple": "Some harmful programs leave a spare key under the doormat before you throw them out. They set up small instructions that bring them back after a restart, such as an entry that launches at sign-in, a scheduled job that runs every half hour, or a browser add-on that reinstalls itself. They may also change settings, like sending all web traffic through a stranger's server (a proxy). So after removing the main program, you check every place things can start automatically, every browser's add-ons, and the network settings. It is like getting rid of weeds: pulling the leaves is not enough if the roots are still in the ground.",
  "body": [
   "Removing the malware file is not always enough. Many infections set up persistence, meaning mechanisms that relaunch the malware or restore its changes after a reboot or after you delete the main file. Others change settings, such as the proxy or the browser's search engine, that keep causing harm even after the program is gone. After remediation, you need to check the common persistence locations and the settings malware likes to change, or the problem will quietly return.",
   "Start with startup items. Task Manager's Startup apps tab lists programs that launch at sign-in, with their publisher and startup impact; disable anything unknown or suspicious, and look it up if unsure. An entry with no publisher, a random name or a path into a temporary folder deserves a closer look. Programs can also start from the Startup folders (type `shell:startup` for the current user or `shell:common startup` for all users in the Run box) and from the registry Run keys, such as `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` and the matching key under `HKEY_LOCAL_MACHINE`. Review the Services console (`services.msc`) for unfamiliar services set to start automatically, especially ones with odd names or no description. Tools such as Microsoft's Sysinternals Autoruns show every autostart location in one list, which saves a lot of clicking.",
   "Next, scheduled tasks. Malware frequently creates a task in Task Scheduler (`taskschd.msc`) that runs at logon, at startup or every few minutes to reinstall itself or launch a script. Browse the Task Scheduler Library and its subfolders, look for tasks with random or look-alike names (a task named to resemble a legitimate updater is a favorite trick), and open each unfamiliar task's Actions tab to see what program or script it runs, along with the Triggers tab to see when. Note the details in the ticket, then disable or delete malicious tasks. A task that runs a script from a user's temporary folder or AppData is a common red flag.",
   "Then browser extensions and settings. Open the extension or add-on manager in every installed browser, not just the default one, and remove anything the user did not intentionally install. Then check the home page, startup pages, new tab page and default search engine, because hijackers change them. If settings keep coming back, check whether a policy has been applied; browsers show a 'managed by your organization' notice when policies are set, and some malware installs its own browser policies. Also remember profile sync: if the browser is signed in, a removed extension can be restored from the account, so remove it there too. Resetting the browser to defaults removes most leftovers. Clear the cache and cookies, and remove unexpected notification permissions.",
   "Finally, proxy and name resolution settings. Malware may set a proxy so all web traffic passes through the attacker's server, or so security sites fail to load. Check Settings > Network and internet > Proxy and the legacy Internet Options > Connections > LAN settings; unless the organization uses a proxy, the automatic setup script and manual proxy server options should be off. Check the system proxy used by Windows services with `netsh winhttp show proxy`, which should normally report direct access unless your organization configures one. Then check the DNS (Domain Name System) server settings on the network adapter and the hosts file for redirect entries.",
   "```\nshell:startup\ntaskschd.msc\nnetsh winhttp show proxy\nnotepad C:\\Windows\\System32\\drivers\\etc\\hosts\n```",
   "Work methodically and confirm the result. After cleaning each location, reboot at least twice and watch whether anything returns, since some persistence triggers only at logon or on a timer. Run a full scan with updated definitions, and document every item removed, with its name and path, so another technician can recognize the same infection elsewhere. If persistence keeps returning despite careful cleanup, the safest course is to reimage the system from a known-good image rather than keep chasing it.",
   "Consider a worked example. After removing adware, a technician finds the ads return after each reboot. Task Scheduler shows a task named to resemble a browser updater that runs a script from AppData every 30 minutes, and the browser still lists an unknown extension that sync keeps restoring. You delete the task, remove the extension, sign the browser out of sync and clear the synced extension from the account, reset the browser, and reboot twice to confirm nothing reappears. You finish with a full scan using updated definitions and document each item removed.",
   "Exam questions often describe the aftermath of a cleanup. 'The malware returns after every reboot' points to persistence such as a scheduled task, a Run key or a service. 'Web traffic still misbehaves after removal' points to proxy, DNS or hosts settings, and 'browser home page keeps changing back' points to an extension, sync or a browser policy. When a question asks what to do after all cleanup attempts fail and the infection keeps returning, the answer is to reimage the system from a known-good image."
  ],
  "analogy": "Persistence is like a houseguest you asked to leave who secretly copied your key, set a timer on the garage door, and left their forwarding address on your mail. Showing them out (deleting the malware file) does not stop them coming back. You have to change the locks (startup items and Run keys), cancel the timer (scheduled tasks), and fix the mail forwarding (proxy, DNS and hosts settings). The analogy stops at one point: with a computer, if you cannot find every copied key, you can rebuild the house from a clean blueprint by reimaging.",
  "terms": [
   [
    "Persistence",
    "A mechanism that lets malware survive reboots or removal attempts, such as a scheduled task or startup entry."
   ],
   [
    "Run key",
    "A registry location whose entries launch programs automatically when a user signs in."
   ],
   [
    "Startup folder",
    "A folder, opened with shell:startup, whose shortcuts run at sign-in."
   ],
   [
    "Task Scheduler",
    "The Windows tool that runs programs on triggers such as logon, startup or a timer."
   ],
   [
    "Autoruns",
    "A Sysinternals tool that lists every autostart location on a Windows system in one view."
   ],
   [
    "Proxy setting",
    "A configuration that routes web traffic through an intermediate server, which malware may set to intercept traffic."
   ],
   [
    "netsh winhttp show proxy",
    "A command that displays the system-wide proxy used by Windows services."
   ]
  ],
  "example": "A user's browser keeps opening a shopping site at sign-in, even after an anti-malware scan reported the PC clean. The technician opens Autoruns and finds a Run key entry launching the browser with that address, plus a scheduled task that recreates the entry daily. Removing both and resetting the browser stops the behavior, and the ticket lists each item for future reference.",
  "mistakes": [
   [
    "Once the malware file is deleted, the job is done.",
    "A scheduled task, Run key or service may download or relaunch it. Check persistence locations and reboot to confirm."
   ],
   [
    "Task Manager's Startup apps tab shows everything that starts automatically.",
    "It misses services, scheduled tasks and some registry entries. Check those too, or use Autoruns to see every location at once."
   ],
   [
    "Cleaning the default browser is enough.",
    "Adware often installs in every browser, and profile sync can restore a removed extension. Check all browsers and the synced account."
   ],
   [
    "Turning off the proxy in browser settings fixes all proxy tampering.",
    "Windows services use the separate WinHTTP proxy, and the hosts file and adapter DNS can also redirect traffic. Check all of them."
   ]
  ],
  "tryit": [
   [
    "After a cleanup, a PC is fine all morning, but every afternoon around 2 p.m. a pop-up program reappears. Startup apps shows nothing unusual, and the user did not sign out. Where do you look, and what do you check?",
    "Task Scheduler, because a timed trigger explains reappearance without a reboot or sign-in. Look for tasks with unfamiliar or look-alike names, and check each task's Triggers and Actions tabs for a daily trigger running a program or script from AppData or a temp folder. Delete it and document it."
   ],
   [
    "A user's web browsing works, but the antivirus cannot download updates, and Windows Update fails. Browser proxy settings are off. What command should you run, and why?",
    "Run netsh winhttp show proxy. Windows services such as update agents use the WinHTTP proxy, which can be set separately from the browser's proxy. If it points to an unknown server, reset it (netsh winhttp reset proxy), then check DNS and the hosts file too."
   ]
  ],
  "tip": "If malware keeps coming back after removal, look for persistence: Startup apps, Run keys, services and especially scheduled tasks. If web traffic still misbehaves, check the proxy, DNS and hosts file.",
  "check": [
   [
    "Adware returns after every reboot even though its files were deleted. What should you check?",
    "Persistence locations: scheduled tasks, Run registry keys, Startup folders, services and browser extensions."
   ],
   [
    "How can you see the system-wide proxy used by Windows services?",
    "Run netsh winhttp show proxy from a command prompt."
   ],
   [
    "Why check every browser, not only the default one?",
    "Malware often installs extensions or changes settings in all installed browsers, and an untouched one can reinfect or keep redirecting."
   ],
   [
    "What might cause a removed extension to reappear?",
    "Browser profile sync restoring it from the account, or a browser policy or scheduled task reinstalling it."
   ],
   [
    "What should you do if the infection keeps returning after thorough cleanup?",
    "Reimage the system from a known-good image after backing up the user's data."
   ]
  ]
 },
 {
  "t": "Ticketing systems: user and device information, descriptions, categories, severity, escalation levels, clear progress notes and resolutions",
  "hook": "You start the evening shift at Harborview Medical Group's help desk and pick up a ticket handed over from days. The description reads, in full: 'Printer broken. User upset.' No name of the user, no printer, no location, no error, no notes about what was tried. You call the main number and spend twenty minutes finding the right person, who sighs and says she already explained everything to someone at noon, and they already restarted the printer twice. You find yourself repeating the same tests. How could one well-written ticket have saved both of you an hour?",
  "simple": "A ticketing system is the help desk's shared notebook. Every problem someone reports gets its own page, called a ticket, and that page follows the problem until it is solved. A good ticket says who has the problem and how to reach them, which device is involved, exactly what is going wrong, how serious it is, and what has been tried so far. If the problem is too hard or needs special access, the ticket is passed up to a more experienced team, called escalation. When it is fixed, the ticket records what caused it and how it was fixed. It works like a relay baton: whoever picks it up should be able to keep running without going back to the start.",
  "body": [
   "A ticketing system, also called a help desk or ITSM (IT service management) system, records every request and incident from the moment it is reported until it is closed. Tickets make sure nothing is forgotten, let work be handed from one technician to another, measure performance against SLAs (service level agreements), and build a searchable history that helps solve future problems. Writing a good ticket is a skill, and the A+ exam tests it directly through scenario questions about what belongs in a ticket and when to escalate.",
   "Every ticket starts with who and what. User information includes the person's name, contact details, department, location and preferred way to be reached, so anyone picking up the ticket can contact them without hunting. Device information identifies the affected asset: asset tag or hostname, make and model, OS version and any related systems or peripherals. Linking the ticket to the asset record in the inventory makes patterns visible, such as the same laptop failing three times in a month, which may justify replacing it rather than repairing it again.",
   "The description explains the problem in specific, factual terms: what the user was doing, what happened, exact error messages or codes, when it started, whether it happens every time, who else is affected, and what has already been tried. 'Outlook shows error 0x800CCC0E when sending since 9:00; receiving works; webmail works' lets the next technician start troubleshooting immediately. 'Email broken' does not. Screenshots help, and so does the user's own description in their words. The description is also the first step of the troubleshooting methodology, identifying the problem, written down.",
   "Categories group tickets by type, such as hardware, software, network, account or access request, often with subcategories such as hardware > printer. Accurate categories route tickets to the right team automatically and produce useful reports, for example showing that printer tickets doubled after a driver change. A miscategorized ticket can sit in the wrong team's queue for hours, so take a moment to choose correctly.",
   "Severity describes how serious the impact is, and many systems combine impact (how many people or how critical a system) with urgency (how quickly it gets worse) to set a priority. A single user's cosmetic issue is low; one user unable to work is medium or high; an outage affecting a department, a critical system down or a security incident is critical. Priority drives the response and resolution targets in the SLA. It should rise when impact grows, for example when several users report the same problem, not because one caller is louder or more senior.",
   "Escalation levels describe who handles what. Tier 1, the first line or service desk, handles common issues such as password resets, basic troubleshooting and known fixes from the knowledge base. Tier 2 handles deeper technical problems and desk-side support. Tier 3 includes specialists and engineers, and some organizations escalate further to vendors. Escalate when a problem is beyond your skill or permissions, when it exceeds the time allowed at your tier, or when its severity demands it. When you escalate, include everything you found, so the next person does not repeat your tests or call the user with the same questions.",
   "Progress notes record each action, finding and communication in time order: who you contacted, what you tested, what you changed and what the result was. A good note reads like '10:42 Called user, confirmed error persists after restart. Tested with second account: same error. Suspect server side.' Write notes so another technician, or the user, could understand them later, in plain professional language without blame or opinions, remembering that users can often read their own tickets.",
   "When the ticket is closed, the resolution states the root cause if known, the fix applied, and confirmation that the user verified the problem is solved. Closing without that confirmation risks the problem coming back as a new ticket with no link to the history. A good resolution note can become a knowledge base article, saving time the next time the problem appears.",
   "Consider a worked example. A Tier 1 technician receives a ticket that a sales rep's laptop cannot connect to the VPN (virtual private network). They record the laptop's asset tag and OS version, the exact error code and the time it started, confirm the internet connection works and the user's password is valid, and note each test. Two other remote users report the same error that hour, so they raise the priority because impact has grown. The error points to a certificate problem on the VPN server, so they escalate to Tier 2 with all notes attached. The network team renews the server certificate, the users confirm they can connect, and the resolution records the cause and fix.",
   "Exam questions follow recognizable patterns. 'The next technician had to start over' points to missing progress notes, 'many users affected' raises severity, 'beyond your permissions or skills' points to escalation, and 'what should the resolution include' points to root cause, fix and user verification."
  ],
  "analogy": "A ticket is like a patient's chart in a hospital. The front page says who the patient is and how to reach family (user information), which room and bed (device information), and the symptoms in specific terms (description). Triage sets severity. Notes from each nurse and doctor are timestamped so the next shift picks up without repeating tests (progress notes). A referral to a specialist is escalation, and the discharge summary is the resolution. The analogy stops at priority: in IT, impact on the business, such as how many people cannot work, drives priority as much as how bad one person's problem is.",
  "terms": [
   [
    "Ticketing system",
    "Software that records, routes and tracks support requests and incidents from report to resolution."
   ],
   [
    "Category",
    "A classification of a ticket by type, such as hardware or network, used for routing and reporting."
   ],
   [
    "Severity",
    "A measure of how serious a problem's impact is on users and the business."
   ],
   [
    "Priority",
    "The order in which tickets are handled, usually set from impact and urgency."
   ],
   [
    "Escalation",
    "Passing a ticket to a higher tier or specialist when it exceeds the current technician's skill, authority or time limit."
   ],
   [
    "Progress notes",
    "Time-ordered records of actions, findings and communications on a ticket."
   ],
   [
    "Resolution",
    "The closing note stating the cause, the fix applied and the user's confirmation."
   ],
   [
    "SLA (service level agreement)",
    "An agreement that sets response and resolution targets, often by priority."
   ]
  ],
  "example": "A help desk receives three tickets in ten minutes saying the shared accounting drive is unavailable. The technician links them to one parent incident, categorizes it as network storage, raises it to high priority because a whole department cannot work, records the exact error and affected paths, and escalates to the storage team with all findings so no one repeats the same checks.",
  "mistakes": [
   [
    "A short description such as 'PC not working' is fine because the technician can call the user.",
    "Vague descriptions force the next person to start over. Record what happened, exact errors, when it started, who is affected and what was tried."
   ],
   [
    "Priority should be highest for whoever is most upset or most senior.",
    "Priority comes from impact and urgency, such as how many people are affected and how critical the system is, not from volume or job title."
   ],
   [
    "Escalate quickly and let the next tier figure it out.",
    "Escalation should include all notes and tests so far. Escalating without notes wastes time and makes the user repeat themselves."
   ],
   [
    "Close the ticket as soon as the fix is applied.",
    "Confirm with the user that the problem is solved first, and record root cause and fix in the resolution."
   ]
  ],
  "tryit": [
   [
    "You are Tier 1. A user's laptop cannot open a finance application because it needs a database permission only the database team can grant. You have confirmed the user's account and network are fine. What do you do?",
    "Escalate to the team that can grant the permission (a higher tier or the database team), because it exceeds your permissions. Include user and device information, the exact error, and the tests you completed so they do not repeat them, and let the user know who has the ticket."
   ],
   [
    "A technician's note on a ticket reads: 'User clearly broke the laptop again. Fixed it.' What is wrong with this note, and how should it be rewritten?",
    "It blames the user, gives no facts and no detail on the fix. Rewrite it factually, for example: 'Screen hinge cracked; user reports laptop was dropped. Replaced hinge assembly, tested display at all angles, user confirmed working.'"
   ]
  ],
  "tip": "Good ticket notes are specific, factual and complete enough that someone else could continue the work. Severity and priority rise with the number of people affected and the business impact, not with how loudly someone complains.",
  "check": [
   [
    "What should a ticket description include?",
    "What the user was doing, what happened, exact error messages, when it started, how often it happens, who is affected and what has been tried."
   ],
   [
    "When should a Tier 1 technician escalate a ticket?",
    "When the problem exceeds their skills, permissions or allowed time, or its severity requires a higher tier."
   ],
   [
    "Why link tickets to device information such as the asset tag?",
    "It identifies the affected equipment and reveals patterns, such as repeated failures on the same device."
   ],
   [
    "What belongs in a ticket's resolution?",
    "The root cause if known, the fix applied, and confirmation that the user verified the problem is solved."
   ],
   [
    "Three users report the same outage within ten minutes. How should this affect the ticket?",
    "Raise its severity or priority because the impact has grown, and link the reports to one parent incident."
   ]
  ]
 },
 {
  "t": "Asset management: inventory lists, CMDB, asset tags and IDs, procurement life cycle, warranty and licensing, assigned users",
  "hook": "It is Monday morning at Harbor Credit Union, and the security team forwards you an alert: an unknown laptop has been talking to the internal file server all weekend. You open the asset system to find its owner, and there is no record of it at all. Meanwhile, Priya from accounting has a ticket open because her laptop screen cracked, and your manager wants to know whether to buy a new one or claim it under warranty. An auditor is also due next month to count software licenses. Three different problems, and every one of them comes down to the same question: does anyone actually know what the credit union owns, who has it, and what it depends on?",
  "simple": "Asset management is keeping an accurate list of all the computers, phones, printers and software a company owns. For each item, the list notes what it is, its serial number, where it is, who is using it, when it was bought and when its warranty ends. Each device gets a sticker with a company ID number so it can be scanned and looked up quickly. A more advanced list, called a CMDB, also records how things connect, such as which server runs the payroll program. Think of it like a home inventory you would make for insurance: if you know what you own and where the receipts are, fixing or replacing things is much easier, and nothing goes missing without someone noticing.",
  "body": [
   "Asset management means knowing what IT equipment and software an organization owns, where it is, who uses it, what it cost, and when it must be replaced. It sounds like bookkeeping, but it underpins security and support. You cannot patch or protect devices you do not know about, you waste money on licenses nobody uses, you pay for repairs that warranties would cover, and audits become painful. As a technician you will tag new equipment, update records when things move, and look up assets when working tickets, so the quality of the records depends partly on you.",
   "The foundation is the inventory list. It is a record of every asset with fields such as asset ID, type, manufacturer, model, serial number, location, purchase date, cost, assigned user, status (in use, in storage, in repair, retired) and warranty end date. Small organizations may use a spreadsheet, but most use an asset management tool that discovers devices on the network automatically and pulls hardware and software details, such as installed RAM, disk size and application versions, from an installed agent. Automatic discovery has a security benefit as well: an unknown device that appears on the network shows up as an unmatched entry, which is exactly the kind of thing the security team wants to investigate.",
   "A CMDB (configuration management database) goes further than an inventory. It stores configuration items (CIs), which can be hardware, software, services and documentation, together with their relationships: this server hosts that application, which depends on this database and supports the payroll service. Those relationships let you assess the impact of a change or an outage before it happens, which is why CMDBs are central to change management and incident management. A simple way to keep them apart is that an inventory answers 'what do we have', while a CMDB also answers 'what depends on what'.",
   "Physical assets are identified with asset tags. Each device gets a label carrying a unique asset ID, often as a barcode, QR code or RFID (radio-frequency identification) tag, attached to the device and recorded in the inventory. Scanning the tag pulls up the record instantly, which speeds up audits and ties help desk tickets to a specific device rather than to a vague description like 'the laptop on the third floor'. Tags also help recover lost or stolen equipment and discourage theft. The asset ID is the organization's own identifier and is different from the manufacturer's serial number, although good records hold both, because the vendor needs the serial number for warranty claims while internal systems use the asset ID.",
   "The procurement life cycle follows an asset from start to finish. It begins with identifying a need and approving the purchase, then ordering from an approved vendor, receiving and tagging the equipment, configuring and deploying it, supporting and maintaining it through repairs and upgrades, and finally retiring it. Retirement means securely wiping or destroying data, removing the device from service, and recycling or disposing of it properly, with records such as a certificate of destruction. Planning replacements around warranty and end-of-life dates avoids surprise failures and systems that no longer receive vendor support or security updates.",
   "Warranty and licensing records save money and keep the organization compliant. Warranty records hold start and end dates, the support level, and service tags or serial numbers, and they tell you whether a failed part is repaired at no cost. Software licenses must be tracked against actual installations, so the organization stays within its license agreements, avoids audit penalties and stops paying for unused seats. Subscription renewal dates matter too, because a lapsed subscription can switch off a service people rely on. A common audit finding is more installations than purchased seats, which is a licensing problem even if every copy came from a legitimate installer.",
   "Finally, record the assigned user, the person responsible for each device. This supports accountability and makes onboarding and offboarding smoother, since you know exactly which laptop, phone and badge to collect when someone leaves. It also helps the security team contact the right person when a device raises an alert. Keep the record current whenever devices move between people; a stale assigned-user field is one of the most common ways asset records drift away from reality.",
   "Consider a worked example. A laptop's screen fails. You scan its asset tag, and the inventory shows it is still under the manufacturer's next-business-day warranty and assigned to a user in the finance team. Instead of buying a replacement screen, you open a warranty claim with the serial number, assign a loaner laptop to the user in the asset system, and add the repair to the asset's history. Two months later, the history shows this model's screens failing repeatedly, which informs the next procurement decision.",
   "Exam questions follow recognizable patterns. 'Relationships and dependencies between systems' points to a CMDB, 'barcode label with a unique ID' points to an asset tag, 'is this repair covered' points to warranty records, 'more installations than purchased seats' points to license tracking, and 'who has this laptop' points to the assigned user field. Questions about what happens to old equipment point to the retirement stage of the procurement life cycle, with data sanitization and documentation."
  ],
  "analogy": "An inventory is like a list of every appliance in your house with its receipt and warranty card. A CMDB is more like the house's wiring diagram added to that list: it shows that the kitchen outlets, the fridge and the garage door opener all share one circuit, so you know what goes dark if you flip that breaker. The analogy stops working at scale: a real CMDB also tracks software, services and documents as items, not just physical things.",
  "terms": [
   [
    "Inventory list",
    "A record of every asset with details such as ID, model, serial number, location, status, warranty date and assigned user."
   ],
   [
    "CMDB (configuration management database)",
    "A database of configuration items and the relationships and dependencies between them."
   ],
   [
    "Configuration item (CI)",
    "Any component tracked in a CMDB, such as a server, application, service or document."
   ],
   [
    "Asset tag",
    "A label with a unique organizational ID, often a barcode, QR code or RFID tag, attached to equipment."
   ],
   [
    "Procurement life cycle",
    "The stages of an asset from purchase request through deployment, maintenance and disposal."
   ],
   [
    "Software license compliance",
    "Ensuring the number and type of installations match what the license agreements allow."
   ],
   [
    "Assigned user",
    "The person recorded as responsible for a specific asset."
   ]
  ],
  "example": "Before a planned server upgrade, the change team checks the CMDB and discovers that the server also hosts a small reporting database used by the sales dashboard. Because the relationship was recorded, they schedule the change outside sales reporting hours and notify the dashboard owner, avoiding an outage nobody had anticipated.",
  "mistakes": [
   [
    "Treating an inventory and a CMDB as the same thing.",
    "An inventory lists what you own; a CMDB also records relationships and dependencies between configuration items, which is what makes impact analysis possible."
   ],
   [
    "Assuming the asset tag number is the serial number.",
    "The asset ID is the organization's own identifier; the serial number comes from the manufacturer. Records hold both, and warranty claims use the serial number."
   ],
   [
    "Tracking only hardware.",
    "Software licenses and subscriptions must be tracked against installations too, or the organization risks audit penalties and pays for unused seats."
   ],
   [
    "Throwing out retired equipment once it is unplugged.",
    "Retirement includes wiping or destroying data, updating the inventory, and disposing through proper channels with records such as a certificate of destruction."
   ]
  ],
  "tryit": [
   [
    "Tomas, a sales rep at a fictional distributor, resigns on Thursday. His manager asks IT to 'collect his stuff' but cannot remember whether he had a tablet as well as a laptop. The help desk has an asset management tool with an assigned-user field for every device. What should the technician do first, and why?",
    "Search the asset system by assigned user to list every device recorded against Tomas (laptop, tablet, phone, badge). That record, not anyone's memory, drives the offboarding collection. After collecting the devices, update their status and assigned user so the records stay accurate."
   ],
   [
    "An auditor finds a design application installed on 40 PCs, but purchasing records show 25 licenses. The installers were downloaded from the vendor's real website. Is there a problem?",
    "Yes. Compliance depends on installations matching purchased licenses, not on where the installer came from. Fifteen installations are unlicensed, so the organization must either remove them or buy more seats, and should start tracking licenses against installations."
   ]
  ],
  "tip": "An inventory tells you what you own; a CMDB also tells you how items relate and depend on each other. Asset records should include the assigned user, warranty dates and license information, and the asset tag ID is the organization's own identifier, not the serial number.",
  "check": [
   [
    "What does a CMDB record that a simple inventory does not?",
    "The relationships and dependencies between configuration items, such as which services depend on which servers."
   ],
   [
    "Why record the assigned user for each device?",
    "For accountability, easier offboarding and equipment collection, and so security teams can contact the right person."
   ],
   [
    "What happens at the end of the procurement life cycle?",
    "The asset is retired: data is wiped or destroyed, it is removed from inventory, and it is recycled or disposed of with records."
   ],
   [
    "Why track software licenses against installations?",
    "To stay compliant with license agreements, avoid audit penalties and avoid paying for unused seats."
   ]
  ]
 },
 {
  "t": "Documentation types: acceptable use policy, incident reports, SOPs, onboarding and offboarding checklists, SLAs, knowledge base articles",
  "hook": "You are on the help desk at Pinewood Medical Group when a security analyst walks over holding a printout. A contractor whose project ended five weeks ago signed in to the VPN last night. Nobody can say who was supposed to disable the account. Then a second problem lands: the printer vendor missed its promised response time again, and the office manager wants to know what the contract actually says. And the new technician beside you just spent an hour solving a printer queue issue that you fixed twice last month. Four separate headaches, and each one points to a document that either did not exist or was not used. Which document should have prevented each one?",
  "simple": "IT teams write things down so work is done the same way every time and nothing depends on one person's memory. Different documents do different jobs. An acceptable use policy lists the rules for using company computers. An incident report records what happened when something went wrong. A standard operating procedure is a step-by-step recipe for a routine task. Onboarding and offboarding checklists make sure new people get the right access and leaving people lose it. A service level agreement is a written promise about how fast help will arrive. A knowledge base article saves the fix for a common problem so anyone can reuse it. It is like a household with house rules on the fridge, a recipe book, and a note of which repair company promised to come within a day.",
  "body": [
   "IT support relies on written documentation so that work is consistent, rules are clear, and knowledge does not live only in one person's head. When a technician leaves or is on vacation, good documents let someone else carry on without guessing. The exam expects you to know what each common document is for and to pick the right one for a scenario, so focus on purpose: rules, records, procedures, promises or solutions. If you can name which of those five jobs a scenario describes, you can usually name the document.",
   "An acceptable use policy (AUP) sets the rules. It tells users what they may and may not do with the organization's systems, networks, email and data. Typical rules include no installing unapproved software, no personal file-sharing services, no accessing inappropriate content, protecting passwords, and acknowledging that activity may be monitored. Users usually sign or acknowledge the AUP when hired and periodically afterward, which gives the organization a clear basis for enforcing the rules if someone breaks them. Related policies include password, remote access and BYOD (bring your own device) policies, each covering a narrower area in more detail.",
   "An incident report is a record. It documents a security or service incident: what happened, when and how it was detected, which systems and data were affected, who was involved, what actions were taken, and the outcome. It supports investigation, lessons learned, insurance claims and legal needs, and may be required by regulation. Write it factually and promptly, while details are fresh, with times taken from logs where possible. Avoid speculation or blame; 'the account was used from an unfamiliar address at 02:14' is useful, while 'the contractor was obviously stealing data' is not.",
   "A standard operating procedure (SOP) is a procedure. It gives step-by-step instructions for performing a routine task the same way every time, such as setting up a new workstation, running a backup, or installing a custom software package. SOPs reduce errors, make training easier, and help show compliance, because an auditor can see both the written procedure and evidence that it was followed. An SOP is different from a policy: the AUP says what users may do, while an SOP says how staff carry out a task.",
   "Onboarding and offboarding checklists make sure nothing is missed when people join, change roles or leave. Onboarding covers creating accounts, assigning group memberships and licenses, issuing hardware and badges, setting up MFA (multifactor authentication), and providing the AUP and security training. Offboarding covers disabling accounts promptly, ideally at the moment of departure, revoking access and badges, collecting equipment, transferring or retaining data according to policy, reclaiming licenses, and changing any shared credentials the person knew. Missed offboarding steps are a common source of insider risk and of dormant accounts that attackers later abuse, which is why a checklist beats memory every time.",
   "A service level agreement (SLA) is a promise. It is a formal agreement that defines the expected level of service between a provider and a customer, whether that is an outside vendor or the internal IT department serving the business. It typically states response and resolution times by priority, availability targets, support hours, how performance is measured and what happens if targets are missed. Tickets are measured against the SLA, which is why setting the correct priority on a ticket matters: a misclassified critical issue can quietly breach the agreement.",
   "A knowledge base (KB) article is a reusable solution. It documents the fix for a known problem or a how-to guide, either internally for technicians or externally for user self-service. A good article has a searchable title, the symptoms the user sees (including exact error messages), the cause, and the step-by-step fix. Writing one after solving a new problem saves time the next time it appears and lets Tier 1 staff resolve issues without escalating.",
   "Consider a worked example. A contractor's project ends on Friday, but a month later a review finds their VPN account still active and recently used. Nobody followed the offboarding checklist, because HR never told IT the end date. The team disables the account, writes an incident report documenting what was accessed and when, and updates the offboarding SOP so HR automatically notifies IT of every departure date. They also add a KB article for technicians on how to verify an account is fully deprovisioned. Notice that one event touched four document types, each doing its own job.",
   "Exam questions usually describe a need and ask which document fits. 'Users must agree not to install personal software' points to the AUP. 'Step-by-step instructions so every technician images laptops the same way' points to an SOP. 'The vendor must respond to critical issues within a set time' points to an SLA. 'Record of what happened during the breach' points to an incident report. 'Former employee still has access' points to offboarding, and 'users can fix a common problem themselves' points to a knowledge base article."
  ],
  "analogy": "Think of a restaurant. The posted house rules for customers are the AUP. The recipe card every cook follows is the SOP. The written note after a kitchen fire is the incident report. The supplier contract promising produce by 6 a.m. is the SLA. The tip sheet taped by the fryer explaining how to clear its usual jam is a KB article. The opening and closing shift lists are the onboarding and offboarding checklists. The comparison weakens on one point: an SLA can also exist inside one organization, between IT and the business.",
  "mnemonic": "Match purpose to document with 'Rules, Records, Recipes, Promises, Fixes': Rules = AUP, Records = incident report, Recipes = SOP, Promises = SLA, Fixes = KB article. Checklists cover people joining and leaving.",
  "terms": [
   [
    "Acceptable use policy (AUP)",
    "A policy stating what users may and may not do with an organization's systems and data."
   ],
   [
    "Incident report",
    "A factual record of an incident: what happened, when, what was affected and what actions were taken."
   ],
   [
    "Standard operating procedure (SOP)",
    "Step-by-step instructions for performing a routine task consistently."
   ],
   [
    "Onboarding checklist",
    "A list of steps for setting up a new user's accounts, access, equipment and training."
   ],
   [
    "Offboarding checklist",
    "A list of steps for removing a departing user's access, recovering equipment and handling their data."
   ],
   [
    "Service level agreement (SLA)",
    "A formal agreement defining service targets such as response times and availability."
   ],
   [
    "Knowledge base (KB) article",
    "A documented solution or how-to guide for technicians or end users."
   ]
  ],
  "example": "A help desk notices it resets the same printer queue several times a week. A technician documents the symptom, cause and fix in a KB article and publishes a user-facing version with simple steps. Tickets for the problem drop sharply, and the remaining ones are solved faster because Tier 1 follows the article instead of escalating.",
  "mistakes": [
   [
    "Picking SOP when the question describes rules users must agree to.",
    "Rules for user behavior belong in a policy such as the AUP. An SOP tells staff how to perform a task step by step."
   ],
   [
    "Thinking an SLA is an internal how-to document.",
    "An SLA is an agreed service commitment, with targets like response time and availability, between a provider and a customer."
   ],
   [
    "Writing the incident report after things calm down, from memory.",
    "Incident reports should be written promptly and factually, using log times, before details are lost."
   ],
   [
    "Treating a KB article and an SOP as interchangeable.",
    "An SOP standardizes a routine task; a KB article captures the fix for a known problem or a how-to so it can be reused."
   ]
  ],
  "tryit": [
   [
    "At a fictional law firm, new hires sometimes start without email access, and one departed paralegal still had a building badge three weeks after leaving. HR sends IT an email about each change, but some emails get missed. Which documents would fix both problems, and what should they include?",
    "Onboarding and offboarding checklists, ideally triggered automatically by HR. Onboarding lists accounts, groups, licenses, hardware, MFA, AUP and training; offboarding lists disabling accounts at departure, revoking badges and access, collecting equipment, handling data and reclaiming licenses. A checklist makes the steps repeatable rather than memory-based."
   ]
  ],
  "tip": "Rules for users: AUP. Step-by-step routine task: SOP. Promised response or uptime: SLA. Record of what happened: incident report. Reusable fix: knowledge base article. Access removed at departure: offboarding checklist.",
  "check": [
   [
    "Which document tells employees they may not use company email for personal business?",
    "The acceptable use policy (AUP)."
   ],
   [
    "A vendor must restore service within four hours for critical tickets. Where is this defined?",
    "In the service level agreement (SLA)."
   ],
   [
    "Why is prompt offboarding important for security?",
    "Accounts and access left active after someone leaves can be misused by the former user or by attackers."
   ],
   [
    "What is the difference between an SOP and a KB article?",
    "An SOP gives standard steps for a routine task; a KB article documents the solution to a known problem or a how-to for reuse."
   ]
  ]
 },
 {
  "t": "Change management: request forms, purpose and scope, risk analysis, change advisory board approval, sandbox testing, rollback and backup plans, end-user acceptance",
  "hook": "It is 7:40 on a Tuesday morning at Lakeshore Logistics, and the phones will not stop. Nobody in the warehouse can print shipping labels. You trace it back fast: last night a well-meaning colleague pushed a new printer driver to every PC in the company because it fixed duplex printing on his floor. He did not test it on the warehouse label printers, did not tell anyone, and did not keep the old driver package handy. Trucks are idling at the dock. The fix itself will take minutes once you find the old driver, but the real question your manager is going to ask is a different one: how did a change this big happen with nobody reviewing it?",
  "simple": "Change management is the set of steps an IT team follows before changing anything important, so changes do not cause surprise problems. First someone fills out a request saying what they want to change, why, and what it will affect. Then they think about what could go wrong. They test the change somewhere safe that is not used by real people. They plan how to undo it if it fails, and they back things up. A group of managers and system owners approves it. After the change, the people who use the system confirm it works for them, and everything is written down. It is like planning a kitchen remodel: you get a plan approved, check where the pipes are, and know how to turn the water back on before you start knocking down walls.",
  "body": [
   "Many IT outages are caused not by attacks or hardware failures but by well-intended changes made without planning: a firewall rule, a patch, a new driver pushed to every PC. Change management is the formal process for proposing, reviewing, approving, implementing and documenting changes to systems, so they happen in a controlled way with minimal disruption and a clear record. As a technician you will submit change requests, carry out approved changes, and be expected to follow the process even when a change seems small. Small changes are exactly the ones people skip the process for, and they cause a surprising share of outages.",
   "Every change starts with a request form, often called a change request. It describes the change, its purpose (the business reason, such as fixing a vulnerability or supporting a new application) and its scope (which systems, sites, users and services are affected, and how many devices). It also proposes a date and time, usually inside an agreed maintenance window, names who will perform the work, and names the change owner, the person accountable for the change. Finally it classifies the change type: standard changes are pre-approved, routine and low risk, such as a routine password policy update; normal changes need review and approval; and emergency changes are urgent, approved rapidly and documented afterward.",
   "A risk analysis estimates what could go wrong and how badly. It weighs the likelihood of failure, the impact on users and the business, and the risk of not making the change at all, since leaving a known vulnerability unpatched is also a risk. Risk is often rated low, medium or high, and higher-risk changes need more testing, more approvers and tighter scheduling. The CMDB (configuration management database) helps identify dependencies that could be affected, such as an application nobody remembered runs on the server being upgraded.",
   "The change advisory board (CAB) provides approval. It is a group of stakeholders, such as IT managers, system owners, security and business representatives, that reviews normal changes and approves them, rejects them or asks for more information. The CAB checks that the plan is sound, that the timing does not collide with other changes or busy business periods like month-end close, and that affected people will be told. The CAB approves the work; technicians implement it. Keeping those roles separate is part of what makes the process trustworthy.",
   "Before touching production, test the change in a sandbox, an isolated environment that mirrors production closely, where mistakes cannot harm real users or data. Testing confirms the change works and reveals side effects, such as a driver that breaks one printer model or a patch that conflicts with a line-of-business application. The closer the sandbox matches production, the more its results mean.",
   "Every change also needs a backup plan and a rollback plan, and they are not the same thing. Take backups, configuration exports or snapshots before starting, so data and settings can be recovered. Then document exactly how to return the system to its previous state if the change fails or causes problems, including who decides to roll back and at what point, for example 'if the VPN is not passing traffic 30 minutes into the window, restore the previous firmware'. A backup saves the data; a rollback plan describes the steps back. A rollback plan that has never been tested may fail when you need it most.",
   "After implementation, confirm success through end-user acceptance: the business owner or representative users verify that the system works as they need it to and sign off. A technical check that the service is running is not the same as users confirming they can do their jobs. Then update documentation and the CMDB, record the outcome in the change record and close it. Changes made outside this process are unauthorized changes; they cause outages, weaken security and make incidents hard to investigate, because nobody knows what was altered. A useful sequence to remember is request, purpose and scope, risk analysis, backup and rollback planning, sandbox testing, CAB approval, implementation, end-user acceptance and documentation.",
   "Consider a worked example. The network team wants to upgrade firewall firmware to fix a security flaw. The request describes the purpose, the three affected sites and a Saturday night window. The risk analysis notes that remote access depends on the firewall, so an outage would stop all remote staff. They test the firmware on a lab firewall, export the current configuration and keep the old firmware image as the rollback path. The CAB approves. The upgrade succeeds, remote users confirm on Monday that the VPN works, and the change is closed with updated documentation.",
   "Exam questions usually ask which step was missing or comes next. 'A change broke an application nobody considered' points to risk analysis or scope. 'The failed change could not be undone' points to the rollback plan. 'Test without affecting users' points to a sandbox. 'Who approves' points to the CAB. 'Users confirm the system meets their needs after the change' points to end-user acceptance, and 'why and what is affected' points to the purpose and scope on the request form."
  ],
  "analogy": "Change management works like a flight plan. The pilot files where they are going and why (request, purpose and scope), checks weather and fuel (risk analysis), practices tricky maneuvers in a simulator (sandbox), gets clearance from the tower (CAB approval), and always knows the alternate airport if something goes wrong (rollback plan). Passengers saying they arrived where they meant to go is end-user acceptance. The analogy breaks in one place: emergency changes can be approved quickly and documented afterward, while pilots rarely get to file the plan after landing.",
  "terms": [
   [
    "Change request",
    "A form describing a proposed change, its purpose, scope, schedule, owner and risk."
   ],
   [
    "Scope",
    "The systems, users, locations and services a change will affect."
   ],
   [
    "Risk analysis",
    "An assessment of the likelihood and impact of a change failing, and of not making it."
   ],
   [
    "Change advisory board (CAB)",
    "A group of stakeholders that reviews and approves or rejects normal changes."
   ],
   [
    "Sandbox",
    "An isolated test environment that mirrors production so changes can be tested safely."
   ],
   [
    "Rollback plan",
    "Documented steps to return a system to its previous state if a change fails."
   ],
   [
    "End-user acceptance",
    "Confirmation by users or the business owner that the changed system meets their needs."
   ],
   [
    "Standard, normal and emergency changes",
    "Pre-approved routine changes, changes that need CAB review, and urgent changes approved quickly and documented afterward."
   ]
  ],
  "example": "A technician wants to push a new printer driver to all 300 office PCs. The change request states the purpose (fixing duplex printing), the scope (all PCs and four printer models) and a rollback plan (redeploy the previous driver package). Sandbox testing reveals the new driver breaks label printing in the warehouse, so the scope is narrowed to office floors, and the CAB approves the revised change.",
  "mistakes": [
   [
    "Believing a backup is the same as a rollback plan.",
    "A backup preserves data and settings; a rollback plan documents the steps and the decision point for returning the system to its previous state."
   ],
   [
    "Thinking the CAB performs the change.",
    "The CAB reviews and approves or rejects changes; technicians implement them."
   ],
   [
    "Skipping end-user acceptance because monitoring shows the service is up.",
    "A running service does not prove users can do their work. Users or the business owner must confirm and sign off."
   ],
   [
    "Assuming emergency changes skip documentation.",
    "Emergency changes are approved rapidly, but they are still documented and reviewed afterward."
   ]
  ],
  "tryit": [
   [
    "At a fictional hospital billing office, a technician needs to apply a database patch that fixes a published vulnerability. The billing team runs month-end invoicing in three days. The technician has tested the patch in a sandbox and taken a full backup. The CAB meets tomorrow. What should the technician do next, and what will the CAB likely weigh?",
    "Submit or finalize the change request with purpose, scope, risk analysis, rollback plan and proposed window, and present it to the CAB rather than patching now. The CAB will weigh the risk of the vulnerability against the risk of disrupting month-end invoicing and will likely schedule the change outside that busy period, with a documented rollback decision point."
   ],
   [
    "A change to a file server finishes at 11 p.m. The technician confirms the server is online and closes the change record. On Monday, the accounting team cannot open a key shared spreadsheet. Which step was skipped?",
    "End-user acceptance. Representative users or the business owner should have confirmed the system met their needs before the change was closed."
   ]
  ],
  "tip": "Test changes in a sandbox and get CAB approval before implementation; every change needs a rollback plan and backups. End-user acceptance comes after implementation, and emergency changes are still documented afterward.",
  "check": [
   [
    "What is the purpose of sandbox testing?",
    "To confirm a change works and reveal side effects in an isolated environment without harming production users or data."
   ],
   [
    "Who approves normal changes?",
    "The change advisory board (CAB), made up of IT, security, system owner and business stakeholders."
   ],
   [
    "How does a rollback plan differ from a backup?",
    "A backup preserves data and settings; a rollback plan documents the steps and decision point for returning the system to its previous state."
   ],
   [
    "When does end-user acceptance happen, and what does it confirm?",
    "After implementation; users or the business owner confirm the changed system meets their needs."
   ]
  ]
 },
 {
  "t": "Backup and recovery: full, incremental, differential and synthetic backups; testing restores; on-site vs off-site; 3-2-1 rule; grandfather-father-son rotation",
  "hook": "Thursday, 6:15 a.m. Your phone buzzes: the file server at Cedar Ridge Architects will not boot, and the partners have a client presentation at nine. You drive in, confirm the disk array is dead, and open the backup console. Sunday's full backup is there, followed by Monday, Tuesday and Wednesday night jobs. Then you notice Tuesday's job shows a warning you never looked at. Your stomach drops. How many backup sets do you actually need to bring the server back, does a bad Tuesday ruin everything, and if the building had flooded instead, would any copy have survived at all?",
  "simple": "A backup is a spare copy of your files kept so you can get them back if something breaks, gets deleted or is locked by ransomware. A full backup copies everything. An incremental backup copies only what changed since the last backup of any kind, so it is quick, but getting everything back means using the full backup plus every incremental since. A differential copies everything changed since the last full backup, so you need just the full and the newest differential. Keep copies in more than one place, including one far away, and practice restoring so you know the copies really work. It is like keeping photos on your phone, on a laptop, and on a drive at a relative's house: if your house floods, the far copy is still safe.",
  "body": [
   "Backups are the last line of defense against hardware failure, accidental deletion, ransomware and disasters. A backup strategy decides what to back up, how often, where to keep copies, how long to keep them and how quickly you can restore. The exam focuses on three areas: the backup types and what each needs for a restore, where copies are stored, and rotation schemes that balance history against media and storage use. If you understand what each backup type copies, the restore requirements follow logically.",
   "A full backup copies all selected data every time. It is the simplest to restore, since you need only one backup set, but it takes the most time and storage, and it puts the heaviest load on the server and network while it runs. Traditional Windows backup software tracks changes with the archive bit, a file attribute that is set whenever a file is created or modified. A full backup copies everything and clears the archive bit, marking every file as backed up.",
   "Incremental and differential backups copy only changes, but they define 'changes' differently. An incremental backup copies only data changed since the last backup of any type, full or incremental, and clears the archive bit. Incrementals are fast and small, but a restore needs the last full backup plus every incremental since, applied in order, and one damaged incremental breaks the chain after it. A differential backup copies everything changed since the last full backup and does not clear the archive bit, so each differential grows larger as the week goes on. A restore needs only the last full plus the latest differential. Modern tools often track changes with their own databases or snapshots rather than the archive bit, but the restore logic is the same, and that logic is what the exam tests.",
   "A synthetic full backup is built by the backup system from an earlier full backup plus the incrementals since, combined on the backup storage rather than read again from the source. It gives you a fresh full backup, and therefore fast restores, without the load of a real full backup on production systems and the network. It is useful when the full backup window is too short or the link to a remote site is slow.",
   "A backup you have never restored is only a hope. Testing restores regularly, by restoring files or whole systems to a test location, verifies that the data is complete, the media is readable, the process is documented and the time needed meets recovery goals. Organizations define an RPO (recovery point objective), the maximum acceptable data loss measured in time, which drives backup frequency, and an RTO (recovery time objective), how quickly service must return, which drives the restore method. A nightly backup means up to a day of lost work, so a team with a one-hour RPO needs something more frequent. Also back up the right things: user data, databases, system state and configuration, not just files on one drive. A green 'job succeeded' line in a console proves the job ran, not that the data can be restored.",
   "Where copies live matters. On-site backups, such as a local backup appliance or NAS (network-attached storage), restore quickly but can be destroyed by the same fire, flood, theft or ransomware that hits the primary data. Off-site backups, at another location or in the cloud, survive local disasters but usually restore more slowly. The 3-2-1 rule combines both: keep at least 3 copies of data (the original plus two backups), on 2 different types of media or storage, with 1 copy off-site. Many organizations also keep one copy offline or immutable, meaning it cannot be changed or deleted for a set period, so ransomware cannot encrypt or delete it.",
   "The GFS (grandfather-father-son) rotation scheme balances history against media use. Son backups are daily, often incremental or differential, and are reused each week. Father backups are weekly fulls kept for about a month. Grandfather backups are monthly fulls kept longer, often a year, and typically stored off-site. GFS lets you restore from yesterday, several weeks ago or months ago with a manageable number of media sets, which matters when someone discovers a file was corrupted long before anyone noticed.",
   "Consider a worked example. A company runs a full backup on Sunday night and incrementals Monday through Friday nights. A server fails Thursday morning. To restore, you need Sunday's full backup plus Monday's, Tuesday's and Wednesday's incrementals, applied in that order; if Tuesday's is damaged, anything changed after Monday may be lost. If the company used differentials instead, you would need only Sunday's full and Wednesday's differential. Either way, data created Thursday morning before the failure is lost, which is why RPO decides backup frequency. Two other traps are worth naming: a synced cloud folder is not a backup, because deletions and encryption sync too, and RAID (redundant array of independent disks) is not a backup, because it protects only against a disk failure and copies deletions and corruption instantly.",
   "Exam questions use predictable clues. 'Fastest daily backup' points to incremental. 'Fewest sets needed to restore after a full' points to differential. 'Fresh full without reading all data from production' points to synthetic full. 'Fire destroyed the server room and the backups' points to missing off-site copies. 'Three copies, two media, one off-site' is the 3-2-1 rule, and 'daily, weekly and monthly sets' is GFS."
  ],
  "analogy": "Imagine keeping a diary. A full backup is photocopying the whole diary. An incremental is copying only the pages written since your last copy of any kind, so rebuilding the diary means stacking the full copy and every small packet in order. A differential is copying every page written since the last full photocopy, so each packet gets thicker, but you only ever need the full copy and the newest packet. The analogy stops working for synthetic fulls: there, the copy shop assembles a fresh complete copy from the packets it already holds, without borrowing your diary again.",
  "mnemonic": "GFS by age: Son is Daily, Father is Weekly, Grandfather is Monthly. The older the generation, the longer the backup is kept. For 3-2-1, say 'three copies, two media, one away'.",
  "terms": [
   [
    "Full backup",
    "A copy of all selected data, simplest to restore but the slowest and largest to create."
   ],
   [
    "Incremental backup",
    "A copy of data changed since the last backup of any type; restore needs the full plus every incremental."
   ],
   [
    "Differential backup",
    "A copy of data changed since the last full backup; restore needs the full plus the latest differential."
   ],
   [
    "Synthetic full backup",
    "A full backup assembled on backup storage from a previous full and later incrementals."
   ],
   [
    "Archive bit",
    "A file attribute set when a file changes; full and incremental backups clear it, differentials do not."
   ],
   [
    "3-2-1 rule",
    "Keep three copies of data on two types of media with one copy off-site."
   ],
   [
    "Grandfather-father-son (GFS)",
    "A rotation scheme using daily, weekly and monthly backup sets kept for increasing lengths of time."
   ],
   [
    "RPO and RTO",
    "Recovery point objective is the acceptable data loss; recovery time objective is how quickly service must return."
   ]
  ],
  "example": "Ransomware encrypts a small firm's file server and the backup NAS on the same network. Because the firm follows the 3-2-1 rule, it also has a weekly copy in immutable cloud storage and last month's grandfather set in a safe off-site. The technician restores from the cloud copy after confirming it is clean, losing only a few days of work that is rebuilt from email attachments.",
  "mistakes": [
   [
    "Saying a differential restore needs every differential since the full.",
    "Each differential already contains all changes since the last full, so you need only the full plus the most recent differential. Needing every set in order describes incrementals."
   ],
   [
    "Treating a synced cloud folder as a backup.",
    "Sync copies deletions and ransomware encryption to every location. A backup keeps independent point-in-time copies."
   ],
   [
    "Believing RAID replaces backups.",
    "RAID keeps a system running through a disk failure but instantly mirrors deletions and corruption, and does nothing against fire or theft."
   ],
   [
    "Trusting backups because the job reports success.",
    "Only a test restore proves the data is complete, readable and restorable within the RTO."
   ]
  ],
  "tryit": [
   [
    "A fictional dental clinic runs a full backup every Sunday and differentials every other night. All backups go to a NAS in the same closet as the server. A pipe bursts Friday morning and soaks the closet. What could the clinic have restored before the flood, and what does the flood reveal about its strategy?",
    "Before the flood, a restore would need Sunday's full plus Thursday night's differential. The flood shows the clinic broke the 3-2-1 rule: every copy was on-site in the same room. It needs at least one off-site copy, such as cloud or a rotated drive, and ideally one immutable or offline."
   ],
   [
    "A manager wants a fresh full backup every week for fast restores, but the full job takes so long it runs into business hours and slows the server. Incrementals already run nightly. What backup type solves this?",
    "A synthetic full backup. The backup system builds a new full from the last full plus the incrementals on backup storage, so production is not read again."
   ]
  ],
  "tip": "Incremental: fastest backups, slowest restore (full plus every incremental). Differential: backups grow each day, restore needs only the full plus the latest differential. Untested backups cannot be trusted, and RAID is not a backup.",
  "check": [
   [
    "A full backup runs Sunday and differentials run nightly. The server fails Friday morning. What do you need to restore?",
    "Sunday's full backup and Thursday night's differential."
   ],
   [
    "What does the 3-2-1 rule require?",
    "Three copies of data, on two different types of media or storage, with one copy off-site."
   ],
   [
    "What is the advantage of a synthetic full backup?",
    "It creates a fresh full backup on backup storage without reading all data from production systems again."
   ],
   [
    "Why must restores be tested?",
    "To prove backups are complete, readable and restorable within the required recovery time, rather than assuming they work."
   ]
  ]
 },
 {
  "t": "Safety: ESD straps and mats, grounding, power handling, lifting technique, electrical fire safety, PPE",
  "hook": "It is your second week at Bayview Community College's IT shop. Marcus, a student worker, has a desktop open on the carpeted floor of a dry winter office, sliding new RAM into place in his wool sweater with no wrist strap. Across the room, someone has unscrewed a power supply to 'just replace the fan'. A pallet with a heavy UPS is waiting by the door, and the supervisor asks you to get it into the server rack before lunch. Then a burning smell drifts from a surge-damaged PC in the corner, and the only extinguisher in sight is a water can. How many of these situations could hurt a person, and which could quietly destroy a part?",
  "simple": "Fixing computers involves electricity, heavy boxes, sharp edges and messy chemicals, so technicians follow safety rules. Static electricity, the tiny shock you feel after walking on carpet, can damage computer parts, so you wear a strap on your wrist that connects you to the computer's metal frame. Always unplug a computer before opening it. Never open a power supply, because parts inside can hold a dangerous shock even when unplugged. Lift heavy things with your legs, not your back. Never throw water on an electrical fire, because water carries electricity; use the right fire extinguisher instead. Wear safety glasses, gloves or a mask when the job calls for it. It is like cooking: you use oven mitts, keep water away from hot oil, and turn off the stove before cleaning it.",
  "body": [
   "Technicians work with electricity, heavy equipment, sharp metal and chemicals, so safety procedures protect both you and the equipment you repair. The A+ exam tests standard practices, and scenario questions often ask what to do first or which precaution fits a task. A good mental rule is that personal safety comes first, then protecting the equipment, then getting the job done. When two answers look reasonable, the one that protects a person beats the one that protects a part.",
   "ESD (electrostatic discharge) is the sudden flow of static electricity between two objects at different electrical potentials, like the small shock you feel after walking across carpet. A discharge far too small to feel can still damage or weaken chips on motherboards, RAM and expansion cards, sometimes causing failures that appear weeks later and are hard to trace back to the repair. To prevent it, wear an ESD wrist strap connected to a grounding point or to unpainted metal on the computer chassis, work on a grounded ESD mat, and keep components in antistatic bags until you install them. Handle cards and memory by their edges rather than touching contacts or chips. If no strap is available, touch unpainted metal on the case frequently to equalize your charge, called self-grounding. Low humidity increases static buildup, so take extra care in dry conditions, and avoid working on carpet in synthetic clothing.",
   "Grounding, also called earthing, matters for electrical safety. Equipment connects to earth ground through the third prong of the power plug, so that if a fault occurs, current flows to ground instead of through a person. Never remove the ground prong or use adapters that defeat it. Equipment grounding and ESD protection are different things, though. An ESD strap contains a resistor so static bleeds away slowly and safely, and it is meant for low-voltage components. Never wear an ESD strap while working on high-voltage equipment such as power supplies or monitors with internal high voltage, because it would give current a path through your body.",
   "Power handling starts with turning off and unplugging equipment before opening it, and then pressing the power button to drain residual power. Power supplies, CRT (cathode-ray tube) monitors and some printers contain capacitors that can hold a dangerous charge even when unplugged, so never open a power supply unit; replace it as a whole. Follow general electrical safety: do not overload circuits or daisy-chain power strips, keep liquids away, and inspect cords for damage such as cracked insulation or bent prongs. In larger facilities, lockout/tagout procedures lock a circuit off and label it so nobody re-energizes it while you work. Also remove jewelry such as rings and bracelets, which can catch on parts or conduct electricity.",
   "Lifting technique prevents many back injuries from servers, UPS (uninterruptible power supply) units and printers. Bend at the knees and hips, not the waist; keep your back straight; hold the load close to your body; lift with your legs; and avoid twisting while carrying, turning your feet instead. Get help or use a cart for heavy or awkward items. Organizations often set a weight above which two people or lifting equipment are required, so follow local policy rather than guessing.",
   "Electrical fire safety starts with never using water on an electrical fire, because water conducts electricity. Use a Class C extinguisher in the United States (Class E in some other regions), or a multipurpose ABC or carbon dioxide (CO2) extinguisher rated for electrical fires. If it is safe, cut power to the equipment. Know where extinguishers and exits are and how to raise the alarm, and leave if the fire is not small and contained. No piece of hardware is worth an injury.",
   "PPE (personal protective equipment) matches the hazard. Wear safety glasses when cutting cable, working with springs or using compressed air; gloves for sharp metal edges inside cases or when handling toner; and an air filter mask when cleaning dusty equipment or dealing with toner spills. Good cable management prevents trip hazards, and keeping walkways clear protects coworkers as well as you.",
   "Consider a worked example. You are installing RAM in a desktop. You place the PC on an ESD mat, clip the wrist strap to bare metal on the chassis, unplug the power cord, and press the power button to drain residual charge. The new modules stay in their antistatic bag until the moment of installation, and you handle them by the edges. Later that day you need to replace the same PC's power supply: you do not open the old unit, you simply swap the whole assembly. Common mistakes in this area include opening a power supply to replace a fan, wearing an ESD strap on high-voltage equipment, clipping a strap to painted metal, which does not conduct well, lifting with the back, and grabbing a water extinguisher for a burning PC.",
   "Exam questions follow recognizable patterns. 'Protect components from static' points to an ESD strap and mat, 'no strap available' points to touching unpainted metal, 'electrical fire' points to a Class C or CO2 extinguisher, 'heavy UPS to a rack' points to lifting with the legs or getting help, and 'cleaning a toner spill' points to a mask and a toner vacuum."
  ],
  "analogy": "An ESD strap is like a slow drain in a bathtub. Static charge is water that has built up on you, and the strap's resistor lets it trickle away gently instead of all rushing out at once through a delicate chip. Where the analogy matters for the exam: a slow drain is fine for a bathtub, but if you open a dam (a power supply's high voltage), connecting yourself to ground just makes you part of the flow, which is why you never wear the strap on high-voltage gear.",
  "terms": [
   [
    "ESD (electrostatic discharge)",
    "A sudden flow of static electricity that can damage electronic components without being felt."
   ],
   [
    "ESD wrist strap",
    "A strap with a resistor that connects you to ground so static bleeds away safely while working on components."
   ],
   [
    "ESD mat",
    "A grounded work surface that keeps components and tools at the same potential."
   ],
   [
    "Antistatic bag",
    "Packaging that shields components from static charges during storage and transport."
   ],
   [
    "Grounding",
    "Connecting equipment to earth so fault current flows to ground instead of through a person."
   ],
   [
    "Class C fire",
    "In the US, a fire involving energized electrical equipment, fought with non-conductive agents such as CO2."
   ],
   [
    "Lockout/tagout",
    "A procedure that locks a circuit off and labels it so nobody re-energizes it during work."
   ],
   [
    "PPE (personal protective equipment)",
    "Gear such as safety glasses, gloves and masks that protects the wearer from hazards."
   ]
  ],
  "example": "A technician is asked to clean out a dusty server closet and replace a failed server power supply. They wear a mask and safety glasses while using compressed air, get a colleague to help lift the server out of the rack, swap the power supply as a whole unit without opening it, and note that the closet's extinguisher is a CO2 unit suitable for electrical fires.",
  "mistakes": [
   [
    "Opening a power supply to replace its fan or a part.",
    "Power supplies contain capacitors that can hold a dangerous charge after unplugging. Replace the whole unit."
   ],
   [
    "Wearing an ESD strap for every job, including high-voltage work.",
    "The strap gives current a path to ground through your body. Use it on low-voltage components only."
   ],
   [
    "Clipping the strap to any metal surface, painted or not.",
    "Paint insulates. Clip to unpainted chassis metal or a proper grounding point."
   ],
   [
    "Choosing a water extinguisher because it is nearby.",
    "Water conducts electricity. Use a Class C (US), CO2 or multipurpose ABC extinguisher rated for electrical fires."
   ]
  ],
  "tryit": [
   [
    "At a fictional insurance office, you must replace a graphics card in a user's PC. Your ESD strap was left in another building, the office is carpeted, and the heating has made the air very dry. What should you do to protect the card?",
    "Unplug the PC and press the power button to drain residual power, work on a hard surface or ESD mat if possible, keep the card in its antistatic bag until installing it, touch unpainted chassis metal often to self-ground, and handle the card by its edges. Low humidity and carpet raise the risk, so take extra care."
   ],
   [
    "A small server room's UPS needs to go onto the bottom of a rack. It is heavy and awkward, and your coworker is at lunch. A cart is available. What is the safe choice?",
    "Use the cart to move it and wait for help to lift it, following the organization's lifting policy. When lifting, bend at the knees, keep your back straight, hold it close and avoid twisting."
   ]
  ],
  "tip": "Never use water on an electrical fire, never open a power supply, and never wear an ESD strap when working on high-voltage equipment. Lift with your legs, not your back, and touch unpainted metal if no strap is available.",
  "check": [
   [
    "Why should you never wear an ESD strap while working inside a power supply or high-voltage device?",
    "The strap provides a path to ground through your body, which could let dangerous current flow through you."
   ],
   [
    "What type of extinguisher should be used on a burning computer?",
    "A Class C (electrical) extinguisher, such as CO2 or a multipurpose ABC unit, never water."
   ],
   [
    "How can you reduce ESD risk if no wrist strap is available?",
    "Touch unpainted metal on the case frequently to equalize your charge, and handle components by their edges."
   ],
   [
    "What is the correct technique for lifting a heavy UPS?",
    "Bend at the knees, keep your back straight, hold it close, lift with your legs, avoid twisting, and get help or a cart if it is too heavy."
   ]
  ]
 },
 {
  "t": "Environment: safety data sheets, battery and toner disposal, temperature and humidity, ventilation, UPS and surge suppressors",
  "hook": "The storm rolls into Fairhaven Public Library just after 3 p.m. The lights flicker twice, then the building goes dark for twenty minutes. When power returns, the circulation desk PCs have lost their open work, and one will not boot. The catalog server in the back closet, though, shut itself down neatly and comes up without a complaint. While checking the closet, you find it hot enough to feel through your shoes, a box of swollen laptop batteries on the floor, and a spilled toner cartridge that someone tried to clean with the office vacuum. Your supervisor asks for a short report. Why did one machine survive the outage gracefully, and what else in that closet is a hazard waiting to happen?",
  "simple": "Computers need the right surroundings to stay healthy, and some of their parts are hazardous. Every chemical product, like printer toner or cleaning spray, comes with a safety data sheet that explains how to handle it, what to do if it spills, and how to throw it away. Batteries, toner cartridges and old electronics must be recycled, never tossed in the trash. Equipment likes cool, clean air and moderate humidity: too dry causes static shocks, too damp causes rust. A surge protector blocks sudden power spikes, while a UPS has a battery that keeps things running for a few minutes when the power goes out, giving time to shut down safely. It is like a home with smoke alarms and a flashlight drawer: you plan for problems before they happen.",
  "body": [
   "Environmental controls protect three things: people, equipment and the wider environment. Technicians handle hazardous materials such as toner and batteries, dispose of electronic waste that is often regulated by law, and keep equipment running in safe conditions with clean power. The exam expects you to know where to find handling information, how to dispose of common IT waste, what conditions equipment needs, and which power protection device fits which problem.",
   "The safety data sheet (SDS) is your first reference for any hazardous product. Formerly called a material safety data sheet (MSDS), it is provided by the manufacturer for products containing hazardous substances, such as toner, cleaning solvents, thermal paste and batteries. It lists the ingredients and hazards, safe handling and storage, required protective equipment, first-aid measures, what to do about spills and fires, and disposal considerations. When you are unsure how to handle or dispose of something, or someone has been exposed to it, consult the SDS. Organizations keep SDS documents where workers can reach them, in a binder or an online library, and following them is often a workplace safety requirement.",
   "Never put IT equipment or its consumables in regular trash. Batteries, especially lithium-ion, nickel-based and lead-acid types, contain materials that are toxic or can start fires, so take them to approved battery recycling programs. Tape or bag the terminals of loose lithium batteries so they cannot short against each other, and handle swollen or damaged lithium-ion batteries carefully, storing them in a fire-safe container until they can be recycled. Old computers, monitors (CRTs, or cathode-ray tubes, contain lead), phones and printers are e-waste and must go to certified recyclers after data has been destroyed. Local government regulations always take precedence over general guidance, so if a local rule and a general recommendation conflict, follow the local rule.",
   "Toner needs particular care. Used cartridges should go back to the manufacturer's recycling program or to a recycler. Clean toner spills with a toner vacuum designed to capture fine particles; an ordinary vacuum can blow the powder back into the air through its filter, and the fine dust can even ignite. Wear a mask, and use cold water, not hot, to wash toner off skin or clothes, since heat melts toner and sets it into fabric.",
   "Temperature and humidity affect reliability. Heat shortens component life and causes throttling and unexpected shutdowns, so keep equipment rooms cool and within the manufacturer's specified operating range. Humidity that is too low increases static electricity and ESD (electrostatic discharge) risk, while humidity that is too high causes condensation and corrosion. Server rooms therefore monitor both and use climate control, often with alerts when readings drift. When moving equipment from a cold vehicle into a warm room, let it acclimate before powering it on, so condensation can evaporate. Protect equipment from dust and airborne particles with enclosures or filters, and clean it with compressed air or an electronics-safe vacuum.",
   "Ventilation matters for both people and equipment. Keep vents clear, do not block airflow around computers, and do not stack devices on top of each other. Rooms with laser printers or chemicals should be well ventilated. Servers usually draw cool air in the front and exhaust hot air out the back, which is the basis for hot aisle and cold aisle layouts in server rooms: rows of racks face each other so intakes share a cool aisle and exhausts share a hot one, keeping hot exhaust from being pulled back in.",
   "Power problems damage hardware and data, and the protection devices are not interchangeable. A surge suppressor (surge protector) diverts voltage spikes away from equipment; its rating in joules indicates how much energy it can absorb, and its protection wears down after absorbing surges. A plain power strip only adds outlets and offers no protection. A UPS (uninterruptible power supply) contains a battery that keeps equipment running through short outages, sags (brownouts) and fluctuations, giving time for a clean shutdown or for a generator to start. Many UPS units connect to the computer by USB or network so it can shut down automatically when the battery runs low. Size a UPS for the load and the runtime you need, and test and replace its batteries periodically. Never plug a laser printer into a small UPS, because its fuser draws large bursts of power.",
   "Consider a worked example. During a storm, the power in a small office flickers several times and then fails for twenty minutes. The file server is connected to a UPS, keeps running through the flickers, and when the outage continues it receives a low-battery signal over USB and shuts down cleanly. The desktop PCs on ordinary power strips lose unsaved work, and one has a corrupted document. You recommend small UPS units for key workstations and replacing the power strips with surge suppressors. Typical mistakes this office had made include believing a power strip protects equipment and expecting a surge suppressor to keep equipment running during an outage.",
   "Exam questions follow recognizable patterns: 'how to handle or dispose of a chemical' points to the SDS, 'keep the server running long enough to shut down cleanly' points to a UPS, 'protect against spikes from lightning' points to a surge suppressor, 'static problems in winter' points to low humidity, and 'disposal rules conflict' points to following local government regulations."
  ],
  "analogy": "Think of power protection as weather gear. A power strip is an umbrella stand: it gives you more places to put things but keeps nothing dry. A surge suppressor is a lightning rod: it takes a sudden strike and steers it away, but it cannot help when the power simply stops. A UPS is a backup generator on a timer: when the power disappears it keeps the lights on long enough to close up properly. Where the analogy breaks: a surge suppressor wears out as it absorbs surges, and a real lightning rod does not.",
  "terms": [
   [
    "Safety data sheet (SDS)",
    "A manufacturer's document describing a product's hazards, safe handling, first aid, spill response and disposal."
   ],
   [
    "E-waste",
    "Discarded electronic equipment that must be recycled through certified channels because it contains hazardous materials."
   ],
   [
    "Toner vacuum",
    "A vacuum with fine filtering designed to safely collect toner particles."
   ],
   [
    "Surge suppressor",
    "A device that diverts voltage spikes away from connected equipment, rated in joules."
   ],
   [
    "UPS (uninterruptible power supply)",
    "A battery-backed device that keeps equipment powered through outages and sags long enough for a clean shutdown."
   ],
   [
    "Brownout (sag)",
    "A temporary drop in voltage below normal levels."
   ],
   [
    "Hot aisle / cold aisle",
    "A server room layout where equipment intakes face a cool aisle and exhausts face a hot aisle."
   ]
  ],
  "example": "A technician finds a pile of old laptops, loose lithium batteries and used toner cartridges in a storage room. They check the SDS for the batteries, tape the terminals and place them in a recycling container, return the cartridges through the manufacturer's program, and send the laptops to a certified e-waste recycler after the drives are wiped, recording each item for the asset records.",
  "mistakes": [
   [
    "Thinking a power strip protects equipment.",
    "A power strip only adds outlets. Spike protection needs a surge suppressor, and outage protection needs a UPS."
   ],
   [
    "Expecting a surge suppressor to keep a server running during a blackout.",
    "Only a UPS has a battery to carry equipment through outages and sags."
   ],
   [
    "Using a regular vacuum on a toner spill.",
    "It can blow fine toner into the air, and the dust can ignite. Use a toner vacuum and a mask."
   ],
   [
    "Following general disposal advice when a local regulation says otherwise.",
    "Local government regulations take precedence for disposal of batteries, CRTs and other e-waste."
   ]
  ],
  "tryit": [
   [
    "A fictional veterinary clinic's server shuts off hard whenever lightning storms cause brief outages, and the database has been corrupted twice. The server sits on a basic power strip. The owner asks whether a better surge protector will fix it. What do you recommend, and why?",
    "A UPS sized for the server's load, connected by USB or network so the server shuts down automatically on low battery. A surge suppressor would help with spikes but cannot keep the server running through an outage; the corruption comes from losing power without a clean shutdown."
   ],
   [
    "A technician unpacks a new laptop that just came in from a delivery van on a freezing morning and wants to power it on immediately for a user waiting at the desk. What should they do?",
    "Let it acclimate to room temperature before powering on, so any condensation can evaporate. Moisture on components can cause shorts or corrosion."
   ]
  ],
  "tip": "To learn how to handle or dispose of a chemical, consult its SDS. A UPS keeps power on during outages; a surge suppressor only protects against spikes; a power strip protects against nothing. Local regulations override general disposal advice.",
  "check": [
   [
    "Where do you find instructions for handling a toner spill or disposing of a cleaning solvent?",
    "In the product's safety data sheet (SDS)."
   ],
   [
    "Why should you not use a regular vacuum on a toner spill?",
    "It can spread the fine particles into the air and the toner dust can ignite; use a toner vacuum and a mask."
   ],
   [
    "What is the difference between a surge suppressor and a UPS?",
    "A surge suppressor diverts voltage spikes; a UPS also uses a battery to keep equipment running through outages and sags."
   ],
   [
    "What problem does very low humidity cause for IT equipment?",
    "It increases static buildup and the risk of electrostatic discharge damaging components."
   ]
  ]
 },
 {
  "t": "Prohibited content and privacy: incident response and chain of custody, licensing (EULA, DRM, open source vs commercial, personal vs corporate), PII, PCI DSS, GDPR, PHI, data retention",
  "hook": "You are halfway through replacing a failing drive in a laptop at Riverbend Outfitters when you open a folder to confirm the data copied. It is full of spreadsheets, and the first one shows hundreds of customer names beside full credit card numbers. Company policy forbids storing card data on laptops. The laptop's owner, a regional manager, is due back from lunch in ten minutes and is known for being impatient. Your cursor is hovering over the next file. Do you keep looking to see how bad it is, delete the folder to protect customers, call the manager over to explain, or do something else entirely?",
  "simple": "Technicians often see private information while fixing computers. If you find something forbidden or illegal, do not dig further, delete it, or confront the person. Stop, tell the right person (usually your manager or the security team), leave the device as it is, and write down what you saw and did. If it might become evidence, every person who handles it signs a log so nobody can claim it was tampered with. This topic also covers software licenses, the rules for how you may use a program, and special kinds of data, like personal details, health records and credit card numbers, that laws and standards protect. It is like finding a lost wallet: you do not go through it or keep the cash; you hand it to the right person and note where you found it.",
  "body": [
   "Technicians see a lot of other people's data. Sometimes you come across prohibited content or activity on a device, such as illegal material, stolen data or clear policy violations, and sometimes you simply handle regulated data during routine work. Handling both correctly protects the users, the organization and any later investigation. This topic combines three areas the exam tests: responding to prohibited content, software licensing, and the types of regulated data and how long to keep them.",
   "When you find prohibited content, the first response is to identify what you have found without browsing further than needed. Then report it through proper channels, usually your manager or the security team, according to company policy. Next, preserve the data or device: do not delete anything, copy it around, or keep using the device, because changes can destroy evidence, including timestamps that investigators rely on. Document everything: what you saw, when, where, and every action you took, written as plain facts. Do not confront the user or investigate on your own; that is the responsibility of those you reported to, and a confrontation can lead to evidence being destroyed.",
   "If the matter could involve law enforcement or court proceedings, maintain chain of custody. This is a written record of everyone who handled the evidence, when, and what they did with it, from collection to presentation. Evidence is sealed, labeled and signed over each time it changes hands, typically on a form listing date, time, the names of the person releasing and receiving it, and the purpose of the transfer. A gap in the chain can make evidence inadmissible, because no one can prove it was not altered.",
   "Licensing is a compliance area too. An EULA (end-user license agreement) is the contract a user accepts to install software; you do not own the software, only a license to use it under its terms. DRM (digital rights management) is technology that enforces licensing by restricting copying, sharing or use of software, music and video. Commercial (proprietary) software is sold or subscribed under restrictive licenses, and its source code is not shared. Open-source software makes its source code available and allows use, modification and sharing, but its licenses still have conditions that must be followed, such as keeping notices or sharing modifications. Personal licenses are for an individual, often limited to non-commercial use, while corporate (business or enterprise) licenses cover organizational use, often counted by users, devices or cores. Using a personally licensed copy at work may violate the EULA, so track licenses and report unlicensed software.",
   "Regulated data needs special care, and the exam expects you to match each type to its rules. PII (personally identifiable information) is any data that identifies a person, such as a name with a birth date, government ID number, address or personal email. PHI (protected health information) is health information linked to an individual, protected in the United States under HIPAA (Health Insurance Portability and Accountability Act). PCI DSS (Payment Card Industry Data Security Standard) is an industry standard, not a law, that organizations storing, processing or transmitting payment card data must follow, covering encryption, access control and network security. GDPR (General Data Protection Regulation) is the European Union regulation that protects personal data of people in the EU, requiring lawful processing, data minimization, breach notification and individual rights such as access and erasure. It applies to organizations anywhere in the world that process such data, not only to companies based in Europe.",
   "Data retention policies define how long each kind of data must be kept to meet legal, regulatory and business needs, and when it must be securely destroyed. Keeping data too briefly can break laws or lose records needed for audits; keeping it too long increases breach exposure and legal risk, since data that no longer exists cannot be stolen. Follow the policy, destroy data securely at the end of its retention period, and never destroy data that is under a legal hold, which suspends normal deletion because of litigation or investigation.",
   "Consider a worked example. While repairing an employee's laptop, you notice a folder of spreadsheets containing customer credit card numbers, which policy forbids storing on laptops. You stop, open nothing further, note the folder path and time, and report it to your manager and the security team. At their direction you power the laptop off, seal and label it, and hand it over with a signed chain-of-custody form. Because the data is cardholder data, the security team treats it as a possible PCI DSS issue. Notice the common mistakes you avoided: deleting the content to 'clean up', browsing to see how much there was, confronting the user, and leaving gaps in the custody record.",
   "Exam questions use clear clue words. 'Found illegal content on a user's PC, what first' points to reporting through proper channels and preserving evidence, not deleting or confronting. 'Documented handling of evidence' points to chain of custody. 'Credit card numbers' points to PCI DSS, 'medical records' to PHI, 'EU citizens' data' to GDPR, and 'name and birth date' to PII. 'Technology restricting copying of media' points to DRM, and 'how long to keep email' points to the data retention policy."
  ],
  "analogy": "Chain of custody is like the signed delivery log for a valuable package. Every courier who touches it signs and notes the time, so if the box arrives damaged, you can see exactly who had it and when. If one handoff is missing from the log, nobody can prove the package was not opened in between, and the recipient may refuse it. In court, evidence with a missing handoff can be refused the same way. The analogy stops short in one way: evidence must also not be altered by the handlers themselves, which is why you do not keep using the device.",
  "mnemonic": "Prohibited content order: 'I Really Protect Data': Identify, Report through proper channels, Preserve the data or device, Document everything (and keep chain of custody if it may become evidence).",
  "terms": [
   [
    "Chain of custody",
    "A documented record of everyone who handled evidence, when and what they did, preserving its integrity."
   ],
   [
    "EULA (end-user license agreement)",
    "The contract defining the terms under which software may be used."
   ],
   [
    "DRM (digital rights management)",
    "Technology that restricts copying and use of digital content to enforce licensing."
   ],
   [
    "Open-source license",
    "A license that makes source code available and permits use, modification and sharing under stated conditions."
   ],
   [
    "PII (personally identifiable information)",
    "Any data that can identify a specific person."
   ],
   [
    "PHI (protected health information)",
    "Health information linked to an individual, protected in the US under HIPAA."
   ],
   [
    "PCI DSS",
    "The Payment Card Industry Data Security Standard for protecting payment card data."
   ],
   [
    "GDPR",
    "The EU General Data Protection Regulation governing personal data of people in the EU."
   ],
   [
    "Legal hold",
    "An instruction that suspends normal data deletion because of litigation or investigation."
   ]
  ],
  "example": "A small business discovers that several employees installed a personally licensed photo editor on work PCs. The IT technician documents the installations, explains that the personal license forbids commercial use, removes the software, and arranges corporate licenses through procurement, updating the asset records so future audits show compliance.",
  "mistakes": [
   [
    "Deleting prohibited content to protect people or 'clean up'.",
    "Deletion destroys evidence. Report through proper channels, preserve the device unchanged and document what you saw."
   ],
   [
    "Calling PCI DSS a law.",
    "PCI DSS is an industry standard that organizations handling payment card data must follow, enforced through card-industry agreements rather than legislation."
   ],
   [
    "Assuming open-source software has no license obligations.",
    "Open-source licenses permit use and modification but still carry conditions, such as keeping notices or sharing modifications."
   ],
   [
    "Thinking GDPR applies only to European companies.",
    "GDPR applies to any organization, anywhere, that processes personal data of people in the EU."
   ]
  ],
  "tryit": [
   [
    "A technician at a fictional accounting firm is told by a manager to delete all email older than one year to free up storage. The technician remembers a recent notice from the legal department about a lawsuit involving the firm's former client. What should the technician do before deleting anything?",
    "Check with legal or follow the data retention policy before deleting. If any of the email is under a legal hold, it must not be destroyed, regardless of age or storage pressure. Retention rules and legal holds override convenience."
   ],
   [
    "During a routine repair at a fictional clinic, you notice a desktop folder named with patient names containing lab results. The clinic is in the United States. What type of data is this, and what law applies?",
    "It is PHI, protected health information, because it links health data to identifiable patients. In the United States it is protected under HIPAA, so it must be handled under the clinic's privacy and security policies and not read, copied or discussed."
   ]
  ],
  "tip": "Order for prohibited content: identify, report through proper channels, preserve evidence and document. PCI DSS covers card data, PHI is health data, GDPR is EU personal data, and PII is any identifying data. Never delete data under legal hold.",
  "check": [
   [
    "You find prohibited material on a PC during a repair. What should you do?",
    "Stop, report it through proper channels, preserve the device without altering it, and document what you saw and did."
   ],
   [
    "Why is chain of custody important?",
    "It proves who handled evidence and that it was not altered, so it remains admissible."
   ],
   [
    "Which standard applies to a company that stores customer credit card numbers?",
    "PCI DSS, an industry standard for protecting payment card data."
   ],
   [
    "What is the risk of keeping data longer than the retention policy requires?",
    "It increases exposure in a breach and legal risk, while providing no business value."
   ]
  ]
 },
 {
  "t": "Professionalism: punctuality, active listening, avoiding jargon, handling difficult customers, confidentiality, setting expectations and following up",
  "hook": "Your 10 a.m. appointment is with Dana Ortiz, the operations director at Summit Freight, and traffic has you stuck on the highway at 9:40. When you finally arrive, she is standing at her desk with her arms crossed. 'This laptop never works,' she says, 'and IT is useless.' Her screen shows an open payroll spreadsheet, your phone is buzzing with a text from a friend, and the fix is probably a driver update you could explain in three acronyms. Every technician in your shop could fix this laptop. The question is whether Dana will ever want you back, and that depends on what you do in the next five minutes.",
  "simple": "Being professional means treating the people you help with respect, so they trust you. Be on time, and if you will be late, call before the appointment. Put your phone away. Listen to the whole problem without interrupting, then repeat it back in your own words so the person knows you understood. Use plain words instead of tech terms. If someone is upset, stay calm, do not argue, and focus on fixing the problem. Do not read private things you see on their screen or desk. Tell them what you will do and how long it will take, and check back later to make sure the fix worked. It is like a good doctor's visit: the doctor listens, explains in normal words, keeps your information private and calls to see how you are doing.",
  "body": [
   "Technical skill solves problems, but professionalism decides whether customers trust you and whether they call you again. IT support is a customer-facing job, whether the customer is a paying client or a coworker down the hall, and CompTIA includes communication and professional conduct in the exam. Scenario questions often present several technically correct actions and ask for the most professional one, so you need to recognize good conduct as well as practice it.",
   "Punctuality and presence come first. Arrive on time for appointments, and if you will be late, contact the customer before the appointment time, apologize and give a new estimate. Dress appropriately for the environment, whether that is formal or business casual. While with a customer, avoid distractions: no personal calls, texting, social media or side conversations with coworkers unless it is an urgent work matter. Keep a positive attitude, project confidence, and use proper language, avoiding slang and anything that could be offensive. These details seem small, but customers notice them before they notice your technical skill.",
   "Active listening is how you get the real problem. It means giving full attention, letting the customer finish without interrupting, taking notes, and then restating the problem in your own words to confirm you understood: 'So the laptop drops Wi-Fi only in the meeting rooms, starting this week?' Ask open-ended questions such as 'What were you doing when this happened?' to gather information, then closed-ended questions such as 'Does it happen on every website?' to narrow things down. Restating also shows the customer they were heard, which often calms a tense conversation on its own.",
   "Avoiding jargon keeps the customer included. Skip acronyms and technical slang, and explain in plain language suited to the customer's level without talking down to them. 'The network card driver' can become 'the software that lets your laptop talk to Wi-Fi'. If a customer is technical and uses the terms themselves, you can match their level, but the default is plain words.",
   "Handling difficult customers takes patience. Stay calm, and do not argue, become defensive or take it personally; the frustration is usually about the lost time, not about you. Do not minimize their problem or blame them, even if they caused it, and never post about customers or their experiences on social media. Let them explain, acknowledge their frustration, restate the issue to show you understand, and focus on what you can do next. If the situation escalates beyond what you can resolve, involve your supervisor. Respect cultural differences, use appropriate titles and names, and treat everyone with the same courtesy.",
   "Confidentiality is part of professionalism. While working, you may see private files, email, screens, and documents on desks and printers. Do not read, copy or discuss them, and ask the user to close sensitive material if you need to work on the screen. Do not ask for passwords when another approach exists; if you must have one, have the user enter it or change it afterward. Respect customers' property too: their equipment, workspace and belongings.",
   "Setting expectations and following up close the loop. Tell the customer what you are going to do, how long it will likely take, and what options exist, including costs where relevant, so they can make informed decisions. If a repair cannot be completed, offer alternatives such as a loaner, escalation or replacement, and update the customer as soon as a timeline slips rather than after. When the work is done, explain what was fixed in plain words, provide documentation of the services performed, and verify the customer is satisfied. Follow up later to confirm the fix held, and handle any disputes through the organization's formal process, documenting everything in the ticket.",
   "Consider a worked example. A frustrated manager says her laptop 'never works' and that IT is useless. You listen without interrupting, acknowledge that losing time before a deadline is stressful, and restate the problem: the laptop drops Wi-Fi in meeting rooms. You explain the plan in plain words, estimate thirty minutes, update the wireless driver, and demonstrate that it stays connected in a meeting room. Two days later you check in to confirm the problem is gone, and you note the follow-up in the ticket. Compare that with the common mistakes: taking a personal call mid-visit, interrupting to jump to a solution, arguing about whose fault it was, commenting on files seen on the screen, and promising a time you cannot meet.",
   "Exam questions follow recognizable patterns. Choose the answer that is calm, respectful, keeps the customer informed and avoids distractions. 'Customer is angry' points to listening and acknowledging, not arguing. 'Will be late' points to calling ahead. 'Sensitive document on screen' points to not reading it and asking the user to close it. 'Repair takes longer than expected' points to updating the customer with options. When two answers both seem polite, prefer the one that communicates proactively and documents the outcome."
  ],
  "analogy": "Active listening works like a waiter reading an order back. The waiter lets you finish, writes it down, and repeats 'one soup, no onions, dressing on the side' before walking away. If something was misheard, it gets caught at the table instead of in the kitchen. Restating a customer's problem does the same thing for a repair. The comparison has one limit: a customer often does not know the real cause, so you also ask follow-up questions, which a waiter rarely needs to do.",
  "terms": [
   [
    "Active listening",
    "Giving full attention, not interrupting, taking notes and restating the problem to confirm understanding."
   ],
   [
    "Open-ended question",
    "A question that invites a detailed answer, used to gather information."
   ],
   [
    "Closed-ended question",
    "A question with a short or yes/no answer, used to narrow down a problem."
   ],
   [
    "Jargon",
    "Technical terms and acronyms that a non-technical customer may not understand."
   ],
   [
    "Confidentiality",
    "Protecting customers' private information and not reading, copying or discussing it."
   ],
   [
    "Setting expectations",
    "Telling the customer what will be done, how long it will take and what options and costs exist."
   ],
   [
    "Follow-up",
    "Contacting the customer after the work to confirm the problem stays solved."
   ]
  ],
  "example": "A technician running late to a home office appointment calls the customer twenty minutes before the scheduled time, apologizes and gives a new arrival time. On site, they avoid their phone, explain the fix without acronyms, cover the customer's open banking page before taking control, and follow up by email two days later to confirm the printer still works.",
  "mistakes": [
   [
    "Explaining to an angry customer why the problem was really their fault.",
    "Blaming or arguing escalates the situation. Listen, acknowledge the frustration, restate the issue and focus on the fix."
   ],
   [
    "Calling after the appointment time to say you were delayed.",
    "Contact the customer before the appointment time, apologize and give a new estimate."
   ],
   [
    "Asking the user to tell you their password so you can test later.",
    "Avoid learning passwords. Have the user type it, or have it changed afterward if you must use it."
   ],
   [
    "Considering the job done once the fix works.",
    "Professional service includes explaining the fix, documenting it, verifying satisfaction and following up."
   ]
  ],
  "tryit": [
   [
    "At a fictional architecture firm, you discover the user's failing hard drive needs a part that will not arrive for three days. The user has a client presentation tomorrow and is visibly anxious. You could say nothing until the part arrives. What is the professional approach?",
    "Set expectations now: explain the delay in plain words, offer alternatives such as a loaner laptop or moving files to another device for tomorrow, give the expected repair date, document the plan in the ticket, and update the user if the timeline changes. Proactive communication with options is the professional choice."
   ],
   [
    "While remoting into a user's PC to fix a printer, a chat window pops up with a personal message from the user's family member. What should you do?",
    "Do not read or comment on it. Ask the user to close or minimize personal windows before you continue, and keep the session focused on the printer."
   ]
  ],
  "tip": "When in doubt on professionalism questions, choose the answer that is calm, respectful, keeps the customer informed and avoids distractions. Never argue, blame the user, post about customers or look through their private data.",
  "check": [
   [
    "You will be 30 minutes late to an appointment. What should you do?",
    "Contact the customer before the appointment time, apologize and give a new estimated arrival time."
   ],
   [
    "What is the purpose of restating the customer's problem in your own words?",
    "It confirms you understood correctly and shows the customer you were listening."
   ],
   [
    "A customer becomes angry and blames IT. What is the professional response?",
    "Stay calm, listen without arguing, acknowledge their frustration, restate the issue and focus on the solution, escalating to a supervisor if needed."
   ],
   [
    "You see a confidential document open on a user's screen while working. What should you do?",
    "Do not read it; ask the user to close or save it before you continue."
   ]
  ]
 },
 {
  "t": "Scripting basics: .bat, .ps1, .vbs, .sh, .js, .py; use cases (automation, restarts, drive mapping, installs, backups, updates) and risks",
  "hook": "It is Friday afternoon at Northgate School District, and Jordan, the newest technician, proudly announces he has written a PowerShell script to clean temporary files on all 200 lab PCs. He tested it once, on his own laptop, and it worked perfectly. He is about to push it out through the management console as an administrator. Meanwhile, the front office forwards a strange email attachment named invoice.vbs that a teacher almost opened. Scripts are about to save someone a weekend of clicking, or wreck a weekend of somebody else's. What do you need to know, right now, to tell which one is about to happen?",
  "simple": "A script is a text file with a list of computer commands that run one after another, like a recipe the computer follows. Technicians use scripts to do the same job on many computers at once, such as connecting network drives, installing programs, restarting machines or making backups. Different script types have different file endings: .bat and .ps1 and .vbs are for Windows, .sh is for Linux and Mac, and .py (Python) and .js (JavaScript) work on many systems. Scripts are powerful, so a mistake can break many computers quickly, and criminals sometimes hide harmful scripts in email attachments. Always test a script on one machine first and never run one you do not trust. It is like a recipe card: great for cooking the same dish every time, but one wrong measurement repeats in every batch.",
  "body": [
   "A script is a plain-text file of commands that an interpreter runs in order. Unlike a compiled program, you can open a script in a text editor, read it, and change it. Scripts let technicians automate repetitive tasks, apply the same configuration to many machines and avoid manual mistakes that creep in when someone clicks through the same steps for the fiftieth time. The A+ exam does not expect you to write complex code, but it does expect you to recognize common script types by their extension, know what they are used for, recognize basic building blocks, and understand the risks.",
   "Start with the Windows script types. `.bat` is a Windows batch file run by the Command Prompt interpreter (cmd.exe); it uses classic commands such as `net use`, `copy` and `robocopy`. `.ps1` is a PowerShell script, the modern and far more powerful Windows scripting language, able to manage almost every part of Windows and many cloud services; PowerShell's execution policy controls whether scripts may run. `.vbs` is VBScript, an older Windows scripting language run by Windows Script Host; Microsoft has deprecated it, but it still appears in legacy logon scripts and in malware, which is why an unexpected `.vbs` email attachment deserves suspicion.",
   "The other script types are cross-platform or non-Windows. `.sh` is a shell script for Linux and macOS, run by bash or another shell, and usually starts with a line naming its interpreter, such as `#!/bin/bash`. `.js` is JavaScript, used in web browsers and on servers through Node.js, and on Windows also runnable by Windows Script Host. `.py` is Python, a cross-platform, general-purpose language popular for automation and data tasks. A quick way to sort them: `.bat`, `.ps1` and `.vbs` are Windows; `.sh` is Linux and macOS; `.py` and `.js` run on many platforms.",
   "Next, recognize the building blocks. Variables are named storage for values, such as a username or file path. Comments are notes the interpreter ignores: `REM` or `::` in batch files, `#` in PowerShell, bash and Python, an apostrophe in VBScript and `//` in JavaScript. Loops repeat actions, for example once for each computer in a list, and conditional statements (`if`) run code only when something is true, such as only if a folder exists. Data types include strings (text), integers (whole numbers) and Boolean values (true or false). Reading a short script and naming these parts is a realistic exam task.",
   "Scripts earn their place through common use cases: basic automation of repetitive tasks; restarting machines or services on a schedule; remapping network drives at logon; installing applications silently across many computers; initiating updates; running backups and copying files with tools such as robocopy or rsync; gathering information such as installed software or free disk space; and remote administration of many devices at once. Scripts are often deployed through Group Policy, an RMM (remote monitoring and management) tool or a scheduled task. The short batch logon script below maps two shared drives; `%USERNAME%` is a variable that Windows fills in with the signed-in user's name.",
   "```\nREM map-drives.bat: map shared drives at logon\nnet use S: \\\\fileserver\\sales /persistent:yes\nnet use H: \\\\fileserver\\home\\%USERNAME%\n```",
   "Scripts carry real risks. A script runs with the permissions of whoever runs it, so a mistake in a script run as administrator can delete data or misconfigure hundreds of machines at once. Test scripts in a sandbox or on a single representative test machine before deploying them widely. Scripts from the internet may contain malware, and attackers commonly use PowerShell, VBScript and JavaScript files as email attachments or for fileless attacks, so review scripts before running them, keep execution policies and application controls in place, and digitally sign trusted scripts. The exam's risk list includes unintentionally introducing malware, inadvertently changing system settings, and browser or system crashes caused by mishandling resources, such as a loop that never ends and consumes all memory. Never hard-code passwords in scripts; use a secure credential store.",
   "Consider a worked example. Every new hire needs the same five network drives mapped. Instead of mapping them by hand at each desk, you write a short batch logon script with `net use` commands, add comments explaining each line, and test it on a lab machine with a standard user account. You find one path is wrong, fix it, and then assign the script through Group Policy. Every user now gets the same drives automatically at sign-in, and the script is documented in the knowledge base. The common mistakes are the reverse of these steps: running an untested script as administrator everywhere, running a forum script without reading it, storing passwords in plain text inside a script, and confusing file types, such as expecting `.sh` to run natively in the Windows Command Prompt.",
   "Exam questions follow recognizable patterns. Match extensions to platforms: `.bat`, `.ps1` and `.vbs` are Windows; `.sh` is Linux and macOS; `.py` and `.js` are cross-platform. 'Map drives at logon' points to a logon script, 'unexpected system changes after running a script' points to insufficient testing, and 'script from an email attachment' points to malware risk."
  ],
  "analogy": "A script is like a set of instructions you leave for a house sitter: water the plants, feed the cat, lock the back door. Written once, followed exactly every day. The danger is the same too: if you wrote 'pour a full jug on every plant' when you meant only the big ones, the sitter will drown the cactus every day without questioning it. Where the analogy stops: a house sitter might notice something is wrong and stop, while a script running as administrator will keep going across every machine until someone intervenes.",
  "terms": [
   [
    "Script",
    "A plain-text file of commands executed in order by an interpreter."
   ],
   [
    "Batch file (.bat)",
    "A Windows script run by the Command Prompt interpreter."
   ],
   [
    "PowerShell (.ps1)",
    "Microsoft's powerful scripting language and shell for administering Windows and other systems."
   ],
   [
    "VBScript (.vbs)",
    "An older, deprecated Windows scripting language run by Windows Script Host, still seen in legacy scripts and malware."
   ],
   [
    "Shell script (.sh)",
    "A script for Linux or macOS run by bash or another shell."
   ],
   [
    "Variable",
    "A named storage location that holds a value a script can use and change."
   ],
   [
    "Loop",
    "A structure that repeats a set of commands, for example for each item in a list."
   ],
   [
    "Execution policy",
    "A PowerShell setting that controls whether and which scripts are allowed to run."
   ]
  ],
  "example": "A technician writes a PowerShell script to delete temporary files on all lab PCs and tests it only on their own laptop. On the lab PCs a variable is empty because of a different folder layout, and the script starts deleting the wrong directory until someone notices. After restoring from backup, the team adopts a rule that scripts are reviewed, tested on a sample lab machine and signed before deployment.",
  "mistakes": [
   [
    "Assuming .sh scripts run in the Windows Command Prompt.",
    "Shell scripts are for Linux and macOS shells such as bash. Windows Command Prompt runs .bat files; PowerShell runs .ps1 files."
   ],
   [
    "Testing a script on your own machine and then deploying everywhere.",
    "Your machine may differ from the targets. Test on a representative machine or sandbox with the same permissions and layout before wide deployment."
   ],
   [
    "Putting an administrator password directly in a script for convenience.",
    "Anyone who reads the file gets the password. Use a secure credential store instead."
   ],
   [
    "Thinking .vbs files are harmless because VBScript is old.",
    "VBScript is deprecated but still runs and is commonly used in malicious email attachments."
   ]
  ],
  "tryit": [
   [
    "At a fictional marketing agency, a technician finds a forum post with a PowerShell script that claims to speed up every PC by changing dozens of registry settings. The manager wants it run on all 60 office PCs tonight. What should the technician do?",
    "Read and understand the script first, then test it on a single non-production machine and check for unintended setting changes, and only deploy through the normal change process if it is safe and useful. Running an unreviewed internet script as administrator risks malware and inadvertent system changes on every PC."
   ],
   [
    "A script that copies log files in a loop runs overnight on a server. In the morning the server is unresponsive and memory usage is at its maximum. Which scripting risk does this match?",
    "A crash caused by mishandling resources, likely a loop that never ends and consumes all memory. The script should be fixed and tested before running again."
   ]
  ],
  "tip": "Match extensions to platforms: .bat, .ps1 and .vbs are Windows; .sh is Linux and macOS; .py and .js are cross-platform. The main risks are introducing malware, changing system settings unintentionally and crashes from mishandled resources, so test before deploying.",
  "check": [
   [
    "Which script extension would you expect for automating tasks on a Linux server?",
    ".sh, a shell script run by bash or another shell."
   ],
   [
    "Name three common uses for scripts in IT support.",
    "Examples include mapping network drives, installing applications, restarting services or machines, running backups and initiating updates."
   ],
   [
    "Why should scripts be tested before wide deployment?",
    "They run with the user's permissions and can change settings, delete data or consume resources across many machines at once."
   ],
   [
    "How do you write a comment in a PowerShell or Python script?",
    "Start the line with the # character; the interpreter ignores it."
   ]
  ]
 },
 {
  "t": "Remote access: RDP, VPN, VNC, SSH, RMM, SPICE, WinRM, screen-sharing and file-transfer tools, and their security considerations",
  "hook": "Monday at Granite Peak Accounting, a small firm you support part-time. You open the office server's Security log and it scrolls for minutes: thousands of failed sign-ins over the weekend, from addresses you have never seen, all aimed at the Administrator account. Someone, years ago, forwarded the remote desktop port straight through the router so the owner could work from home. The same morning, the receptionist tells you a 'Microsoft technician' called and asked her to install a remote support app so he could fix a virus. Remote access is how you do half your job. It is also how attackers would like to do theirs. Which doors should be open, and how should they be locked?",
  "simple": "Remote access lets you use or fix a computer from somewhere else. Different tools do different jobs. RDP shows a whole Windows desktop from far away. SSH gives a secure text window to control servers, mostly Linux. VNC shares a screen on many kinds of computers. A VPN is a private, encrypted tunnel into the office network, so other tools can be used safely. RMM tools let IT watch and fix hundreds of computers from one screen. Because these tools are powerful, criminals try to break into them or trick people into installing them. So you protect them with strong passwords, a second sign-in step, encryption, and by never leaving them open to the whole internet. It is like giving a house key to a cleaner: useful, but only to trusted people, and not left under the doormat.",
  "body": [
   "Remote access lets technicians support users and manage systems without traveling to them, and lets staff work from anywhere. Each method has a specific purpose, and each also creates a path attackers can try to use. Exposed remote access services are among the most common entry points for ransomware, and scammers regularly trick people into installing remote tools. The exam tests both sides: which tool fits the job, and how to secure it.",
   "RDP (Remote Desktop Protocol) gives a full graphical desktop session on a Windows computer, by default over TCP (Transmission Control Protocol) port 3389. Hosting RDP connections requires a Pro or higher edition of Windows, while any edition can run the client. Never expose RDP directly to the internet, because it is constantly scanned and targeted with password guessing. Put it behind a VPN or a remote desktop gateway, require NLA (Network Level Authentication), which authenticates the user before a session is created, add MFA (multifactor authentication), and use strong passwords with account lockout. On a Windows server, repeated failed RDP sign-ins show up as failed logon events in the Security log, which is often how exposure is noticed.",
   "VNC (Virtual Network Computing) is a cross-platform screen-sharing protocol that shows and controls the actual console session, the same screen the local user sees. Many implementations have weak or no encryption, so tunnel it through SSH or a VPN. SPICE (Simple Protocol for Independent Computing Environments) is a remote display protocol used mainly to reach virtual machine consoles on some virtualization platforms.",
   "SSH (Secure Shell) provides an encrypted command-line session, by default on TCP port 22, and is the standard for managing Linux servers and network devices. It replaced Telnet, which sends everything, including passwords, in plain text. Use key-based authentication rather than passwords where possible and disable direct root login. SSH also carries secure file transfer through SFTP (SSH File Transfer Protocol) and SCP (Secure Copy Protocol). WinRM (Windows Remote Management) fills a similar command-line role for Windows: it lets administrators run PowerShell commands and scripts on remote Windows computers without a graphical session. Restrict it to administrators and management networks.",
   "A VPN (virtual private network) creates an encrypted tunnel from a remote device to the organization's network, so remote users can reach internal resources as if they were in the office. A VPN is not a remote control tool itself; it provides the secure connection over which other tools, such as RDP, run. VPN accounts need MFA and prompt removal when people leave, because a valid VPN account is effectively a door into the internal network.",
   "RMM (remote monitoring and management) platforms are used by IT departments and MSPs (managed service providers) to monitor many endpoints, deploy patches and software, run scripts and take remote control from one console. Because the RMM agent has administrative control of every managed device, a compromised RMM account is extremely dangerous: one stolen password could reach every client machine at once. Protect it with MFA, named accounts with least privilege, and logging that someone actually reviews.",
   "Screen-sharing and remote-support tools, including desktop sharing in video conferencing and third-party remote support apps, let a user invite a technician to view or control their screen. Ideally they require the user's explicit consent for each session and show a visible indicator while it is active. File-transfer tools, such as SFTP, cloud file sharing and managed transfer services, should use encryption; avoid plain FTP (File Transfer Protocol), which sends credentials unencrypted. Across all methods: use encryption, MFA and strong authentication; allow only approved tools and remove unused ones; restrict access by IP address or require a VPN; keep software patched; log sessions; and train users that legitimate IT staff will not cold-call them demanding remote access.",
   "Consider a worked example. A small business allows RDP directly from the internet to its office server, and the Security log shows thousands of failed sign-in attempts from unfamiliar addresses. You close port 3389 on the firewall, set up a VPN with MFA for remote staff, allow RDP only from VPN addresses, confirm NLA is required, and enable account lockout. The failed attempts from the internet stop, and remote staff connect through the VPN as before. Common mistakes this avoids include forwarding RDP for convenience, using Telnet or plain FTP because they are simple, sharing one RMM administrator account, and letting remote sessions start without the user's consent.",
   "Exam questions use strong clue words. 'Encrypted command line to a Linux server' points to SSH on port 22. 'Full graphical desktop on a Windows PC' points to RDP on 3389. 'Cross-platform screen sharing of the console session' points to VNC. 'Run PowerShell on remote Windows machines without a desktop' points to WinRM. 'Manage patches and monitoring for hundreds of client endpoints' points to RMM. 'Virtual machine console display' points to SPICE, and 'secure tunnel to the office network' points to a VPN."
  ],
  "analogy": "A VPN is like a private, guarded corridor from your house straight into the office building. Walking down it gets you inside safely, but it does not sit you at a particular desk or turn on anyone's computer. Once inside, you still need a tool, such as RDP, to actually use a specific machine. The analogy matters for the exam because questions often offer a VPN as the answer to 'control the user's screen', and the corridor alone cannot do that.",
  "terms": [
   [
    "RDP (Remote Desktop Protocol)",
    "Microsoft's protocol for full graphical remote desktop sessions, by default on TCP port 3389."
   ],
   [
    "SSH (Secure Shell)",
    "An encrypted remote command-line protocol, by default on TCP port 22, that replaced Telnet."
   ],
   [
    "VNC (Virtual Network Computing)",
    "A cross-platform screen-sharing protocol that controls the console session, often needing an encrypted tunnel."
   ],
   [
    "VPN (virtual private network)",
    "An encrypted tunnel connecting a remote device to a private network."
   ],
   [
    "RMM (remote monitoring and management)",
    "A platform for monitoring, patching, scripting and remotely controlling many endpoints."
   ],
   [
    "WinRM (Windows Remote Management)",
    "A service that lets administrators run PowerShell commands on remote Windows computers."
   ],
   [
    "SPICE",
    "A remote display protocol used to access virtual machine consoles."
   ],
   [
    "NLA (Network Level Authentication)",
    "An RDP setting that requires users to authenticate before a remote session is created."
   ]
  ],
  "example": "An MSP technician supports forty client offices through an RMM platform. After a peer company is breached through a stolen RMM password, the MSP enforces MFA on every RMM account, gives each technician a named account with only the permissions they need, restricts console access to the office VPN, and reviews session logs weekly.",
  "mistakes": [
   [
    "Choosing a VPN when the question asks how to control a user's screen.",
    "A VPN only provides an encrypted connection to the network. A remote control tool such as RDP, VNC or a remote-support app runs over it."
   ],
   [
    "Forwarding port 3389 through the router so staff can reach RDP from home.",
    "RDP exposed to the internet is heavily targeted. Require a VPN or gateway, NLA, MFA and account lockout."
   ],
   [
    "Using Telnet or plain FTP because they are simple.",
    "Both send credentials in plain text. Use SSH, SFTP or SCP instead."
   ],
   [
    "Picking RDP for a Linux server command line.",
    "SSH on port 22 is the standard encrypted command-line tool for Linux servers and network devices."
   ]
  ],
  "tryit": [
   [
    "A fictional nonprofit's executive director gets a phone call from someone claiming to be from their software vendor, saying her PC is infected and asking her to install a remote support app and read out a session code. She calls you first. What do you tell her, and what should the organization put in place?",
    "Do not install the app or share any code; hang up and report the call to IT or security. Legitimate IT staff do not cold-call demanding remote access. The organization should allow only approved remote tools, require user consent for sessions, and train staff to recognize these scams."
   ],
   [
    "You need to run the same PowerShell configuration command on 30 Windows servers in a data center, with no need to see their desktops. Which remote access method fits best?",
    "WinRM, which lets administrators run PowerShell commands and scripts on remote Windows machines without a graphical session, restricted to administrators and the management network."
   ]
  ],
  "tip": "SSH (22) replaced Telnet for secure command-line access; RDP (3389) is Windows graphical access and should never be exposed directly to the internet. A VPN secures the connection but is not a remote-control tool by itself, and RMM accounts need MFA.",
  "check": [
   [
    "Which remote access method provides an encrypted command line to Linux servers, and on what default port?",
    "SSH, on TCP port 22."
   ],
   [
    "Why should RDP not be exposed directly to the internet?",
    "It is constantly targeted by password guessing and exploits and is a common ransomware entry point; put it behind a VPN or gateway with MFA."
   ],
   [
    "What is the purpose of an RMM platform?",
    "To monitor, patch, script and remotely control many endpoints from one console, as IT teams and MSPs do."
   ],
   [
    "Does a VPN let a technician control a user's screen?",
    "No. A VPN only provides an encrypted connection to the network; a remote control tool such as RDP or VNC runs over it."
   ]
  ]
 },
 {
  "t": "Artificial intelligence basics: app integration, appropriate-use policy and plagiarism, bias, hallucinations and accuracy, public vs private models and data privacy",
  "hook": "Two days after Maplewood Insurance switches on an AI assistant in its office suite, a ticket lands in your queue marked urgent. A claims adjuster asked the assistant to 'summarize anything about bonuses' and got a neat paragraph listing every executive's bonus, pulled from a spreadsheet that was shared with the whole company by accident years ago. An hour later, a help desk colleague mentions he pasted a customer's full error log into a free chatbot to get a fix, and the PowerShell command it gave him threw an error because the command does not exist. Nobody hacked anything. So what exactly went wrong, twice, in one morning?",
  "simple": "Artificial intelligence (AI) tools can write text, answer questions and summarize documents. Many apps now have AI built in. These tools are helpful but have weak spots. They can make things up and sound completely sure, which is called a hallucination, so you must check what they say. They can be unfair because they learn from human writing that contains unfair patterns, which is called bias. Free public AI services may keep what you type, so you should never paste private customer or company information into them. Companies write rules about which AI tools are allowed and how to use them, and passing off AI writing as your own can count as cheating. It is like a very fast intern who has read a lot: useful for drafts, but you check the work and do not hand over the office safe combination.",
  "body": [
   "Artificial intelligence (AI) tools, especially generative AI built on LLMs (large language models), are now part of many everyday applications: office suites that draft documents and summarize meetings, email clients that suggest replies, help desk systems that propose answers, search engines, and operating system assistants. Technicians support these features and advise users on using them responsibly, so the exam covers the basics: how AI is integrated, what policies govern it, its known weaknesses, and how to protect data when using it.",
   "App integration means AI features are embedded in existing software or connected to it through APIs (application programming interfaces). Integration raises practical questions for IT: what data the AI feature can reach, such as a user's entire mailbox and file storage; whether the user is licensed for it; whether the organization has approved it; and how it is configured. AI features usually act with the signed-in user's permissions, so poorly set file permissions can suddenly expose information through AI search and summaries. The assistant is not breaking in; it is simply finding what the user already technically had access to but would never have stumbled across. Reviewing access, especially broadly shared folders, before enabling an AI assistant is a sensible step.",
   "Organizations should publish an appropriate-use policy for AI, similar to an acceptable use policy. It typically lists which AI tools are approved, what types of data may and may not be entered, when output must be reviewed by a person, and when AI use must be disclosed. Plagiarism is a concern: presenting AI-generated text or code as your own original work may violate academic or workplace rules, and generated content can closely resemble existing copyrighted material. Users remain responsible for what they submit, whoever or whatever drafted it.",
   "Bias is the first of AI's known weaknesses. It arises because models learn from training data that reflects human and historical biases, so results can be unfair or skewed, for example in screening job applications or describing groups of people. An AI system's output can look neutral and objective while repeating patterns that would be unacceptable if a person made the same decision. That is why decisions that affect people should keep a human in the loop.",
   "Hallucinations are the second weakness. They are confident, plausible-sounding outputs that are simply false, such as invented facts, citations, commands, settings or menu paths that do not exist. They happen because a model generates likely-sounding text rather than looking up verified facts, so fluency is not evidence of accuracy. Verify important outputs against authoritative sources such as vendor documentation, test generated scripts and commands in a sandbox before running them on real systems, and keep a human reviewer responsible for anything that matters.",
   "Public versus private models is mainly a data privacy question. A public model is a consumer AI service available to anyone. Depending on its terms, the prompts and files users enter may be stored, reviewed by the provider or used to train future models, and could be exposed. Entering customer PII (personally identifiable information), PHI (protected health information), payment card data, passwords, source code or confidential business information into such a service can breach policy, contracts and regulations. A private model is one run by the organization itself or provided under an enterprise agreement that keeps data within the organization's control and excludes it from training. Organizations often steer users toward approved enterprise tools and use DLP (data loss prevention) controls to block sensitive data from reaching unapproved AI services.",
   "Consider a worked example. A help desk technician asks a public AI chatbot for a PowerShell command to fix a user's problem and pastes in the full error log, which includes the user's email address and internal server names. Company policy permits only the enterprise AI assistant for work data. The manager explains the privacy risk and reports the exposure under the data-handling procedure. The technician also discovers that one command the chatbot suggested does not exist, a hallucination that testing in a sandbox would have caught before it reached a real machine. Common mistakes like these include trusting output because it sounds confident, running AI-generated scripts directly in production, pasting regulated data into a public tool, assuming an assistant sees only 'safe' files, submitting AI-written work without required disclosure, and assuming AI decisions are neutral.",
   "Exam questions use recognizable clues. 'Invented a citation or a command that does not exist' points to a hallucination. 'Results unfairly favor one group' points to bias. 'Employee pasted customer data into a public chatbot' points to a data privacy violation and the need for private or approved models. 'Rules on which AI tools may be used and how' points to an appropriate-use policy. 'Presented AI-generated work as original' points to plagiarism, and 'AI assistant revealed files a user should not see' points to permissions and app integration."
  ],
  "analogy": "A generative AI model is like an extremely well-read person playing a word-association game: it produces whatever sounds most likely to come next, based on everything it has read. That is why it is fluent, and also why it can confidently 'remember' a book that was never written. It is not looking things up in a verified encyclopedia. The analogy stops working for data privacy: a person forgets your secret, but a public AI service may store what you typed under its terms, so the risk outlasts the conversation.",
  "terms": [
   [
    "Generative AI",
    "AI that creates new text, images or code based on patterns learned from training data."
   ],
   [
    "Large language model (LLM)",
    "An AI model trained on large amounts of text to generate and interpret language."
   ],
   [
    "Hallucination",
    "A confident but false or invented output produced by an AI model."
   ],
   [
    "Bias",
    "Systematic unfairness in AI output caused by skewed training data or design."
   ],
   [
    "Appropriate-use policy",
    "An organizational policy defining approved AI tools, permitted data and review requirements."
   ],
   [
    "Public model",
    "A consumer AI service open to anyone whose terms may allow storing or training on user input."
   ],
   [
    "Private model",
    "An AI model run by or contracted for an organization that keeps its data under the organization's control."
   ],
   [
    "DLP (data loss prevention)",
    "Controls that detect and block sensitive data from leaving approved systems, including to unapproved AI services."
   ]
  ],
  "example": "A company enables an AI assistant in its office suite. Within a day, a user asks it to summarize 'salary information' and receives details from a spreadsheet that had been shared with everyone by mistake. IT fixes the file permissions, reviews other broadly shared folders, and publishes an appropriate-use policy explaining what the assistant can reach and what data may be entered into it.",
  "mistakes": [
   [
    "Trusting AI output because it is detailed and confident.",
    "Hallucinations sound confident. Verify important facts against authoritative sources and test commands in a sandbox."
   ],
   [
    "Blaming the AI assistant for 'hacking' files a user should not see.",
    "Integrated assistants act with the user's existing permissions. The fix is correcting overly broad file permissions."
   ],
   [
    "Assuming AI decisions are neutral because a machine made them.",
    "Models learn from biased data and can produce unfair results, so keep a human in the loop for decisions affecting people."
   ],
   [
    "Pasting customer data into a public chatbot because it is faster.",
    "Public services may store or train on input. Use only approved private or enterprise tools as the appropriate-use policy allows."
   ]
  ],
  "tryit": [
   [
    "A fictional university's HR team wants to use a free public AI tool to rank 400 job applications by pasting in each applicant's resume. They say it will be objective because it is a computer. What concerns should IT raise?",
    "Two main concerns: data privacy, since resumes contain PII and pasting them into a public model may let the provider store or train on them, so an approved private tool and policy review are needed; and bias, since models can reproduce unfair patterns from training data, so a human must review decisions rather than relying on automated rankings."
   ],
   [
    "A technician asks an approved enterprise AI assistant for registry steps to fix a startup problem. The answer includes a registry path the technician cannot find in any documentation. What should the technician do?",
    "Treat it as a possible hallucination. Check vendor documentation, and do not apply the change to a production machine. If testing is needed, use a sandbox or test machine first."
   ]
  ],
  "tip": "Never put confidential or regulated data into a public AI model unless policy explicitly allows it. Always verify AI output, since hallucinations sound confident, and remember that AI features inherit the user's access permissions.",
  "check": [
   [
    "What is an AI hallucination?",
    "A confident, plausible-sounding output that is false, such as an invented fact, citation or command."
   ],
   [
    "Why is entering customer data into a public AI chatbot risky?",
    "The provider may store, review or train on the input, which can expose the data and violate policy or regulations."
   ],
   [
    "What does an AI appropriate-use policy typically define?",
    "Approved tools, what data may be entered, when human review is required and when AI use must be disclosed."
   ],
   [
    "How should a technician handle a script generated by AI?",
    "Review it, test it in a sandbox or test machine, and verify it against documentation before running it on production systems."
   ]
  ]
 }
], {"reviewed":"2026-10-06"});
