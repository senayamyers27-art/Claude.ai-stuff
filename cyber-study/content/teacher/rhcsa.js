/* Teacher edition for Red Hat Certified System Administrator (EX200 (RHEL 10)): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("rhcsa", [
 {
  "t": "Using a shell prompt and running commands with correct syntax",
  "objectives": [
   "Students will be able to identify the user, host, current directory and privilege level from a Bash prompt.",
   "Students will be able to break a command line into command, options and arguments, including grouped short options and long options.",
   "Students will be able to predict how Bash expands globs, ~, variables and command substitution before a program runs.",
   "Students will be able to use quoting, escaping, Tab completion and echo previews to avoid syntax errors."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project three prompts ([student@servera ~]$, [root@serverb /etc]#, [harry@servera tmp]$) and ask students to say who, where and with what privilege each one is."
   ],
   [
    12,
    "Teach",
    "Walk through command, options and arguments with ls examples. Show grouping (-lah) versus long options (--all), then demonstrate expansion live with echo *.conf, echo ~, echo $HOME and echo $(date)."
   ],
   [
    18,
    "Activity",
    "Run the 'What does the program receive?' card sort in pairs (see activity). Circulate and ask pairs to explain each answer in terms of expansion."
   ],
   [
    5,
    "Discuss",
    "Ask why echo before rm is a safe habit and when quoting matters. Connect to exam risk: wrong host, wrong account, wrong files."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Look at the prompt [root@serverb /etc]#. Who are you, which machine are you on, where are you, and why should that make you careful?",
  "activity": {
   "title": "What does the program receive?",
   "materials": "Printed cards, each showing a short directory listing and one command line (for example `rm *.log` in a folder with a.log, b.log and c.txt); whiteboard; student laptops with a browser-based Linux terminal if available.",
   "steps": [
    "Give each pair a set of 10 cards. Each card shows the files in the current directory and a command line using globs, ~, variables, quotes or spaces in names.",
    "Pairs write the exact argument list the program receives after Bash expansion, and label the command, options and arguments.",
    "Pairs swap cards with another pair and check each other's answers, marking any disagreement.",
    "If laptops are available, pairs verify disputed cards by recreating the files and running the command with echo in front.",
    "Each pair presents one card that surprised them to the class and explains the expansion rule involved."
   ]
  },
  "discussion": [
   "Why might a correct command still earn zero points on a hands-on exam?",
   "When is it better to use a long option than a short one, even though it takes more typing?"
  ],
  "exit": [
   [
    "What does `echo rm *.txt` show you?",
    "The exact list of file names rm would receive after the shell expands the glob, without deleting anything."
   ],
   [
    "Name the three parts of `cp --verbose a.txt b.txt`.",
    "Command cp, option --verbose, arguments a.txt and b.txt."
   ],
   [
    "How do you pass the file name `my notes.txt` as one argument?",
    "Quote it ('my notes.txt') or escape the space with a backslash."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a color-coded template where they highlight the command in one color, options in another and arguments in a third before tackling expansion cards.",
   "Extend: Challenge fast finishers to predict what happens when a glob matches no files, then test it and explain why Bash passed the literal pattern to the command."
  ]
 },
 {
  "t": "Input and output redirection: >, >>, 2>, 2>&1, <, pipes and tee",
  "objectives": [
   "Students will be able to name the three standard file descriptors and their numbers.",
   "Students will be able to choose the correct operator (>, >>, 2>, 2>&1, <, &>) to meet a stated output requirement.",
   "Students will be able to explain why the order of redirections changes the result of 2>&1.",
   "Students will be able to build pipelines and use tee, including writing a root-owned file with sudo tee."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students what they think happens to error messages when they run a command and save its output to a file. Collect guesses on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw a process box with three arrows labeled 0, 1 and 2. Redirect each arrow on the board as you introduce >, >>, 2>, <, and /dev/null. Then act out 2>&1 order with two arrows, showing left-to-right processing."
   ],
   [
    18,
    "Activity",
    "Run the 'Plumbing diagrams' pair activity: students draw where each stream goes for a set of command lines, then verify a few in a browser terminal if available."
   ],
   [
    5,
    "Discuss",
    "Discuss the sudo echo puzzle and why tee fixes it. Ask who actually opens the file in each case."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "You run `find / -name passwd > results.txt` as a normal user and still see lines on your screen. What are those lines, and why did they not go into the file?",
  "activity": {
   "title": "Plumbing diagrams",
   "materials": "Printed worksheet with eight command lines (for example `cmd > f 2>&1`, `cmd 2>&1 > f`, `cmd 2> /dev/null | wc -l`, `echo x | sudo tee /etc/f`); whiteboard; colored markers; optional student laptops with a browser-based Linux terminal.",
   "steps": [
    "In pairs, students draw a box for each command with arrows for descriptors 0, 1 and 2, and mark where each arrow ends: terminal, a file, /dev/null or the next command.",
    "For each line, students write one sentence describing what appears on screen and what ends up in each file.",
    "Pairs compare diagrams with a neighboring pair and resolve any differences, paying special attention to the two 2>&1 orderings.",
    "Volunteers draw the two 2>&1 lines on the whiteboard; the class confirms or corrects them.",
    "If terminals are available, pairs test two disputed lines with a command that produces both output and errors, such as `ls /etc/hosts /nonexistent`."
   ]
  },
  "discussion": [
   "Why might an administrator deliberately keep errors in a separate file instead of discarding them?",
   "When would you prefer tee over a plain > redirection in day-to-day work?"
  ],
  "exit": [
   [
    "Write a command that saves the output of `ls /etc` to list.txt without erasing what list.txt already contains.",
    "ls /etc >> list.txt"
   ],
   [
    "Where does stderr go in `cmd 2>&1 > out.txt`?",
    "To the terminal, because 2>&1 was processed while stdout still pointed at the terminal."
   ],
   [
    "How do you write the text 'hello' into the root-owned file /etc/motd as a normal user with sudo rights?",
    "echo hello | sudo tee /etc/motd"
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each operator with a one-line plain-English meaning, and let struggling students start with single-operator lines before mixed ones.",
   "Extend: Ask fast finishers to build a pipeline that counts the unique shells in /etc/passwd using cut, sort, uniq and wc, saving an intermediate stage with tee."
  ]
 },
 {
  "t": "Grep and regular expressions: ^, $, ., *, [ ], -i, -v, -r, -E",
  "objectives": [
   "Students will be able to explain the meaning of ^, $, ., * and bracket expressions in a regular expression.",
   "Students will be able to select grep options -i, -v, -r and -E to meet a search requirement.",
   "Students will be able to distinguish basic from extended regular expressions and predict when a pattern needs -E.",
   "Students will be able to write a grep command that saves matching lines to a file and verify the result."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a printed excerpt of a commented config file and ask students how they would find only the active settings without reading every line."
   ],
   [
    12,
    "Teach",
    "Introduce anchors, dot, star and brackets with examples on the board. Contrast regex * with the glob *. Then show -i, -v, -r and -E, and demonstrate grep 'a|b' versus grep -E 'a|b'."
   ],
   [
    18,
    "Activity",
    "Run the 'Match or no match' card game in small groups (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss why quoting patterns matters and which mistakes appeared most often in the game."
   ],
   [
    5,
    "Exit ticket",
    "Students write the three exit answers on a sticky note."
   ]
  ],
  "warmup": "If you search a 400-line configuration file for the word 'Port', how many lines do you think you will get, and how could you narrow the search to only the active setting?",
  "activity": {
   "title": "Match or no match",
   "materials": "Printed pattern cards (for example '^root', 'sh$', 'h.t', '[0-9][0-9]', '^$'), a printed sheet of 20 sample lines, sticky notes, whiteboard; optional student laptops with a browser-based Linux terminal.",
   "steps": [
    "Split the class into groups of three and give each group the sample-lines sheet and a shuffled stack of pattern cards.",
    "For each card, the group marks which sample lines would match, writing the line numbers on a sticky note.",
    "Add a second round with option cards (-i, -v, -E) that modify a pattern; groups update their answers.",
    "Reveal the answers on the projector or board; groups score one point per correct card.",
    "Finish by asking each group to write their own pattern that matches exactly three lines on the sheet, then trade with another group to test it."
   ]
  },
  "discussion": [
   "Why do you think grep uses basic regular expressions by default instead of extended ones?",
   "How does knowing grep's exit status help when you later write scripts?"
  ],
  "exit": [
   [
    "Write a grep command that shows lines in /etc/passwd starting with the text harry.",
    "grep '^harry' /etc/passwd"
   ],
   [
    "What does `grep -v '^#' file` print?",
    "Every line that does not begin with #, that is, the non-comment lines."
   ],
   [
    "Why does `grep -E 'cat|dog'` behave differently from `grep 'cat|dog'`?",
    "-E enables extended regex where | means alternation; without it | is a literal character."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page cheat sheet of the five core symbols with one example each, and start them on cards using a single symbol.",
   "Extend: Ask fast finishers to write an extended regex that matches lines containing a valid-looking IPv4 address pattern of four groups of one to three digits separated by dots, and explain each part."
  ]
 },
 {
  "t": "Accessing remote systems with ssh; logging in and switching users (su -, sudo -i) in multiuser targets",
  "objectives": [
   "Students will be able to connect to a remote host with ssh, run a single remote command and explain the purpose of known_hosts.",
   "Students will be able to describe how key-based authentication works using ssh-keygen, ssh-copy-id and authorized_keys.",
   "Students will be able to compare su, su - and sudo -i, including whose password each requires.",
   "Students will be able to verify their current identity and host with whoami, id and hostname before making changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you need root access on a server shared by five administrators, what are the risks of everyone knowing the root password?"
   ],
   [
    12,
    "Teach",
    "Demonstrate or diagram ssh user@host, the host key prompt and known_hosts. Draw the key pair: private key stays, public key goes to authorized_keys. Then compare su, su - and sudo -i in a table on the board."
   ],
   [
    18,
    "Activity",
    "Run the 'Who am I now?' role-play with stacked identities (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss why organizations prefer sudo over a shared root password, and what a host key warning might mean."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You connect to a server you have used many times and ssh shows a big warning that the host key has changed. What are two possible explanations?",
  "activity": {
   "title": "Who am I now?",
   "materials": "Printed name cards (student, harry, root) and host cards (servera, serverb), a printed sequence of commands for each group, whiteboard.",
   "steps": [
    "Groups of three receive a sequence card listing commands such as `ssh student@servera`, `sudo -i`, `su - harry`, `exit`, `ssh root@serverb`, `exit`.",
    "One student acts as the shell: after each command they hold up the correct user and host cards. A second student says whose password was required, if any.",
    "The third student records the stack of shells on paper after each step, drawing each new shell on top of the previous one.",
    "Groups swap sequence cards and repeat with roles rotated.",
    "The teacher reveals the correct stack for one sequence on the whiteboard and the class discusses any mismatches."
   ]
  },
  "discussion": [
   "What are the trade-offs between password logins and key-based logins for SSH?",
   "Why does it matter that sudo logs actions under each person's own name?"
  ],
  "exit": [
   [
    "Which command opens a root login shell using your own password?",
    "sudo -i"
   ],
   [
    "Where is a user's public key placed on the server to allow key-based login?",
    "In ~/.ssh/authorized_keys in that user's home directory on the server."
   ],
   [
    "You typed `su - harry` and then `exit`. Who are you now?",
    "The user you were before running su, because exit closes the stacked shell."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column chart (su versus sudo) with password, environment and logging rows filled in partially, and have students complete it before the role-play.",
   "Extend: Ask fast finishers to research in the man pages how sudo -u runs a command as a non-root user and write a sudoers rule idea in plain words that allows one user to restart one service only."
  ]
 },
 {
  "t": "Archiving and compressing with tar, gzip, bzip2 and xz (-c, -x, -t, -z, -j, -J, -f)",
  "objectives": [
   "Students will be able to distinguish archiving from compression and name the tool that performs each.",
   "Students will be able to construct tar commands using -c, -x, -t, -f and the correct compression option -z, -j or -J for a required extension.",
   "Students will be able to explain why tar strips the leading slash and use -C to control extraction location.",
   "Students will be able to verify an archive's contents and format with tar -tf and file."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: what is the difference between putting papers in a folder and shrinking them on a photocopier? Map the answer to archiving versus compressing."
   ],
   [
    12,
    "Teach",
    "Build the tar command on the board piece by piece: action letter, compression letter, f, archive name, source. Show the -fc trap, the leading-slash notice and -C. Demonstrate the file command on a correctly and an incorrectly compressed archive."
   ],
   [
    18,
    "Activity",
    "Run the 'Build the command' card assembly in pairs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss why graders check the real format rather than the file name, and what verification habits prevent lost points."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If a file is named backup.tar.xz, can you be certain it is compressed with xz? How could you find out?",
  "activity": {
   "title": "Build the command",
   "materials": "Printed cards with tar fragments (tar, -c, -x, -t, z, j, J, v, f, -C, archive names with different extensions, source paths); printed task slips; optional student laptops with a browser-based Linux terminal.",
   "steps": [
    "Give each pair a set of fragment cards and six task slips, such as 'create an xz archive of /etc/ssh named /root/ssh.tar.xz' or 'list the contents of logs.tar.bz2'.",
    "Pairs arrange the cards to form a correct command for each slip and write it down.",
    "For two slips, pairs also write the verification commands they would run afterward.",
    "Pairs swap answer sheets and look for errors such as f in the wrong place or a mismatched compression letter.",
    "If terminals are available, pairs run one create and one verify command to confirm the file command output matches the intended format."
   ]
  },
  "discussion": [
   "When would you choose gzip over xz even though xz usually produces smaller files?",
   "Why is it safer for tar to store relative paths by default?"
  ],
  "exit": [
   [
    "Write the command to create a bzip2-compressed archive of /etc named /root/etc.tar.bz2.",
    "tar -cjf /root/etc.tar.bz2 /etc"
   ],
   [
    "Which command confirms an archive's real compression format?",
    "file followed by the archive name, for example file /root/etc.tar.bz2."
   ],
   [
    "What does -C do when extracting?",
    "It changes to the given directory first, so files are extracted there instead of the current directory."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference strip showing 'action + compressor + f + name + source' with the letter-to-extension map, and let struggling students complete partially filled commands first.",
   "Extend: Ask fast finishers to work out how to list only the files under etc/ssh in an archive of /etc without extracting it, and how to extract just one file from the archive."
  ]
 },
 {
  "t": "Creating and editing text files with vim or nano",
  "objectives": [
   "Students will be able to explain vim's normal, insert and command-line modes and switch between them.",
   "Students will be able to perform core edits in vim: insert, delete a line, search, substitute, save and quit with or without saving.",
   "Students will be able to edit a file with nano using its on-screen shortcuts.",
   "Students will be able to identify when to use visudo, vipw or vigr instead of a general editor and how to verify a configuration change."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask who has ever been stuck in vim and how they got out. Use the stories to introduce modes."
   ],
   [
    10,
    "Teach",
    "Project a vim session. Show normal mode movement, i and Esc, :w, :wq and :q!, dd, u, /search and :%s. Then open nano and show the shortcut bar. Explain visudo and the swap file warning."
   ],
   [
    20,
    "Activity",
    "Run the 'Edit relay' exercise in pairs on student laptops (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss which editor each student will use on the exam and why vi basics are still worth knowing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You open a file and every key you press seems to do something strange instead of typing. What do you think is going on?",
  "activity": {
   "title": "Edit relay",
   "materials": "Student laptops with a browser-based Linux terminal or virtual lab that includes vim and nano; a printed practice config file (for example a fake app.conf with 20 lines) and a task list; projector.",
   "steps": [
    "Each pair creates the practice file by pasting it into a here-document, or the teacher provides it in the lab environment.",
    "Student A completes three edits in vim from the task list (change a value, delete two comment lines, replace every 'debug' with 'info') while Student B reads the tasks aloud and watches for mode errors.",
    "Partners swap roles; Student B completes three different edits using nano.",
    "Each pair verifies the final file with grep and cat against an answer key on the projector.",
    "Pairs write down the one keystroke or shortcut that tripped them up most and share it with the class."
   ]
  },
  "discussion": [
   "Why might an exam designer expect you to know vi even if nano is easier?",
   "What could happen if a sudoers file is saved with a syntax error, and how does visudo prevent it?"
  ],
  "exit": [
   [
    "Which key returns vim to normal mode?",
    "Esc."
   ],
   [
    "What vim command saves the file and quits?",
    ":wq (or :x)."
   ],
   [
    "Which command should you use to edit /etc/sudoers?",
    "visudo, because it checks syntax before saving."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed vim quick card with the ten commands from the lesson table, and let them complete the relay with nano first before trying vim.",
   "Extend: Challenge fast finishers to use a vim range substitution such as :10,20s/old/new/g and visual block mode to comment out several lines, then explain each command."
  ]
 },
 {
  "t": "Creating, deleting, copying and moving files and directories (mkdir -p, cp -a, mv, rm -r)",
  "objectives": [
   "Students will be able to create nested directory structures with mkdir -p and brace expansion.",
   "Students will be able to compare cp, cp -r, cp -a and mv in terms of which metadata each preserves, including SELinux contexts.",
   "Students will be able to remove files and directories safely using rm, rm -r and rmdir with preview habits.",
   "Students will be able to distinguish absolute and relative paths and verify results with ls -l, ls -ld and ls -lZ."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you photocopy a signed contract, is the copy identical to the original? What details change? Link to metadata."
   ],
   [
    12,
    "Teach",
    "Demonstrate mkdir versus mkdir -p, cp versus cp -a with ls -l showing owner and time changes, and mv within a file system keeping the context. Show rm -r, rmdir and the echo preview habit."
   ],
   [
    18,
    "Activity",
    "Run the 'What survives?' prediction table in pairs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss the mv SELinux trap and stories of accidental recursive deletes, and which habits prevent them."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You copy a folder of files from a colleague's account into yours. Who do you think will own the copies, and will the dates stay the same?",
  "activity": {
   "title": "What survives?",
   "materials": "Printed prediction table with rows for cp, cp -r, cp -a, mv (same file system) and mv (different file system), and columns for owner, permissions, timestamp, SELinux context and original still present; whiteboard; optional student laptops with a browser-based Linux terminal.",
   "steps": [
    "Pairs fill in the prediction table, marking for each command whether each attribute is kept or changed.",
    "Pairs then read short scenario cards (for example 'move a web page from a home directory into the web root') and choose the right command based on their table.",
    "The teacher reveals the correct table on the board and pairs score themselves.",
    "If terminals are available, pairs create a test file, copy it with cp and cp -a, and compare ls -l and ls -lZ output to confirm.",
    "Each pair writes one safety rule for rm on a sticky note and posts it on the board."
   ]
  },
  "discussion": [
   "Why might mv be fast for a 50 GB file in one case and slow in another?",
   "What personal habits will you adopt before running rm -r as root?"
  ],
  "exit": [
   [
    "Which command creates /srv/app/logs even if /srv/app does not exist?",
    "mkdir -p /srv/app/logs"
   ],
   [
    "Which cp option preserves ownership, permissions, timestamps and SELinux contexts?",
    "-a (archive)."
   ],
   [
    "Does mv within one file system change a file's SELinux context?",
    "No, it keeps the original context; restorecon or a copy is needed to get the destination's context."
   ]
  ],
  "differentiation": [
   "Support: Pair struggling students with a printed flowchart: 'Need to keep attributes? Use cp -a. Need a new context? Use cp. Just renaming? Use mv.'",
   "Extend: Ask fast finishers to find in the cp man page the --preserve option and explain how cp --preserve=mode,timestamps differs from cp -a."
  ]
 },
 {
  "t": "Hard links vs symbolic links (ln, ln -s) and their limits",
  "objectives": [
   "Students will be able to explain the relationship between file names, inodes and the link count.",
   "Students will be able to create hard links and symbolic links with ln and ln -s using the correct argument order.",
   "Students will be able to compare the limits of hard and symbolic links, including file system boundaries, directories and dangling links.",
   "Students will be able to verify link types with ls -li, ls -l and readlink -f."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if a person has two official names on record and one is removed, does the person disappear? Then ask the same about a forwarding note on a door."
   ],
   [
    12,
    "Teach",
    "Draw directory entries pointing to an inode box. Add a second entry for a hard link and show the link count rising. Draw a symlink as its own box containing a path. Demonstrate the cross-device error and a dangling link."
   ],
   [
    18,
    "Activity",
    "Run the 'Inode string model' activity in groups (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss when each link type is the right choice, and why directory hard links are forbidden."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "When you delete a file, do you think Linux erases its data right away? What might keep the data alive?",
  "activity": {
   "title": "Inode string model",
   "materials": "Sticky notes for file names, index cards for inodes (with an inode number and a link count box), string or drawn lines on the whiteboard, printed scenario cards; optional student laptops with a browser-based Linux terminal.",
   "steps": [
    "Each group builds a model on a desk or the whiteboard: name sticky notes connected by string or lines to inode cards.",
    "The teacher reads scenarios one at a time (create a file, add a hard link, add a symlink, delete the first name, move the target, link across file systems), and groups update the model and the link count.",
    "After each scenario, groups write whether each name still works and why.",
    "For the cross-file-system scenario, groups explain why the hard link cannot be drawn while the symlink can.",
    "If terminals are available, groups reproduce two scenarios and confirm the inode numbers and link counts with ls -li."
   ]
  },
  "discussion": [
   "Why might a running service keep using disk space after its log file has been deleted?",
   "What problems could a hard link to a directory cause for tools that walk the file tree?"
  ],
  "exit": [
   [
    "Which command creates a symbolic link /etc/app.conf pointing to /data/app.conf?",
    "ln -s /data/app.conf /etc/app.conf"
   ],
   [
    "Give two things a hard link cannot do that a symbolic link can.",
    "Cross file systems and point to a directory."
   ],
   [
    "What happens to a symlink when its target is deleted?",
    "It remains but becomes a dangling link that points at nothing."
   ]
  ],
  "differentiation": [
   "Support: Provide a comparison table with blanks for each property (inode, cross file system, directories, survives target deletion) for students to fill in during the model activity.",
   "Extend: Ask fast finishers to explain why a new directory has a link count of 2 and why that count rises when subdirectories are created."
  ]
 },
 {
  "t": "Listing, setting and changing standard ugo/rwx permissions in numeric and symbolic form",
  "objectives": [
   "Students will be able to read a permission string from ls -l and describe the access of the user, group and others.",
   "Students will be able to convert between symbolic (rwx) and octal permissions and set them with chmod in both forms.",
   "Students will be able to explain how r, w and x differ for files and directories, including why deletion depends on directory permissions.",
   "Students will be able to change ownership with chown and chgrp and predict access using the first-matching-class rule."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project three ls -l lines and ask students to guess who can do what with each file."
   ],
   [
    12,
    "Teach",
    "Break down the ten-character string. Teach r=4, w=2, x=1 with conversions on the board. Contrast file and directory meanings. Show symbolic mode with +, - and =, then chown and the first-matching-class rule."
   ],
   [
    18,
    "Activity",
    "Run the 'Permission help desk' ticket activity in pairs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss the surprising cases: deleting a read-only file, an owner with fewer rights than the group, and r without x on a directory."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A file shows -rw-r--r--. Who can change its contents, and who can only read it?",
  "activity": {
   "title": "Permission help desk",
   "materials": "Printed ticket cards, each with a user complaint, the user's groups and ls -l / ls -ld output for the file and its directory; whiteboard; optional student laptops with a browser-based Linux terminal.",
   "steps": [
    "Each pair receives five ticket cards, such as 'Tom can list /srv/reports but cannot open files' with the relevant listings.",
    "Pairs diagnose each ticket by identifying which class applies to the user and which permission is missing or present.",
    "Pairs write the fix twice: once in symbolic mode and once in octal mode, plus any chown or chgrp needed.",
    "Pairs swap tickets with another pair to review, checking that the fix does not grant more access than required.",
    "If terminals are available, pairs recreate one ticket with a test directory and confirm the fix with ls -ld."
   ]
  },
  "discussion": [
   "When is octal mode the better choice, and when is symbolic mode safer?",
   "Why do you think Linux checks only the first matching class instead of combining all the rights a user could get?"
  ],
  "exit": [
   [
    "Convert rwxr-x--- to octal.",
    "750."
   ],
   [
    "Write a symbolic chmod that adds write for the group without changing anything else.",
    "chmod g+w file"
   ],
   [
    "A user can delete a file they cannot write to. Which permission explains this?",
    "Write (with execute) permission on the directory containing the file."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a conversion grid listing 0 to 7 with the matching rwx strings, and start them on tickets involving files only before directories.",
   "Extend: Ask fast finishers to calculate the starting permissions of new files and directories for umask values 0027 and 0077 and explain each result."
  ]
 },
 {
  "t": "Finding documentation with man, man -k, info and /usr/share/doc",
  "objectives": [
   "Students will be able to navigate a man page and locate its SYNOPSIS, OPTIONS and EXAMPLES sections.",
   "Students will be able to explain man section numbers and choose section 1, 5 or 8 for a given need.",
   "Students will be able to find unknown commands with man -k or apropos and rebuild the index with mandb.",
   "Students will be able to locate sample configuration files and package documentation with /usr/share/doc and rpm -qd."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you had no internet during an exam, where would you look to remember a command option? List ideas on the board."
   ],
   [
    10,
    "Teach",
    "Open a man page on the projector and tour its sections and viewer keys. Show man passwd versus man 5 passwd. Demonstrate man -k with a grep filter, mention mandb, open info briefly and list a /usr/share/doc directory."
   ],
   [
    20,
    "Activity",
    "Run the 'Documentation scavenger hunt' in pairs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss which search path was fastest for each clue and which pages students would bookmark mentally for the exam."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You need to know the order of the fields in /etc/fstab and have no internet. Where on the system could that information be?",
  "activity": {
   "title": "Documentation scavenger hunt",
   "materials": "Student laptops with a browser-based Linux terminal or lab VM that has man pages installed; printed clue sheets; a timer on the projector.",
   "steps": [
    "Pairs receive a clue sheet with eight questions, such as 'Which command changes password aging?', 'What is the fourth field of /etc/fstab?' and 'Which grep option counts matching lines?'.",
    "For each clue, pairs must find the answer using only local documentation and write down the exact command they used to find it (for example man -k expir, then man chage).",
    "After 12 minutes, pairs stop and compare their search commands with another pair, noting which approach was faster.",
    "The teacher reviews answers on the projector, highlighting where a section number or man -k saved time.",
    "Each pair writes their personal 'search routine' in three steps on a sticky note."
   ]
  },
  "discussion": [
   "Why might local documentation be more trustworthy than a web search when configuring a specific system?",
   "When would you choose --help over a full man page, and when is it not enough?"
  ],
  "exit": [
   [
    "Which command shows the format of the /etc/passwd file rather than the passwd command?",
    "man 5 passwd"
   ],
   [
    "What should you run if man -k returns nothing appropriate?",
    "mandb as root to build the index, then search again."
   ],
   [
    "Which command lists the documentation files installed by a package?",
    "rpm -qd package"
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed map of a man page with the sections labeled and the five most useful viewer keys, and assign them the first four clues only.",
   "Extend: Ask fast finishers to find which package owns /etc/ssh/sshd_config with rpm -qf and then locate every documentation file for that package."
  ]
 },
 {
  "t": "Configuring access to RPM repositories: .repo files in /etc/yum.repos.d/ (baseurl, enabled, gpgcheck, gpgkey)",
  "objectives": [
   "Students will be able to write a .repo file in /etc/yum.repos.d/ with correct repository IDs, name, baseurl, enabled, gpgcheck and gpgkey settings.",
   "Students will be able to explain the purpose of GPG signature checking and choose gpgcheck settings that match the available keys.",
   "Students will be able to verify repository configuration with dnf repolist and a test install.",
   "Students will be able to troubleshoot common repository errors such as a wrong baseurl level, duplicate IDs and missing AppStream."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: how does your phone know where to download apps from, and how does it know an app was not tampered with? Connect to repositories and signatures."
   ],
   [
    12,
    "Teach",
    "Project a sample .repo file and annotate each line. Explain repodata and why baseurl must point to it, the three slashes in file URLs, enabled, gpgcheck and gpgkey. Show dnf repolist and dnf clean all."
   ],
   [
    18,
    "Activity",
    "Run the 'Broken repo files' pair troubleshooting activity (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss the security trade-off of gpgcheck=0 and when it is acceptable."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Why would a server refuse to install software even though it is connected to the network?",
  "activity": {
   "title": "Broken repo files",
   "materials": "Printed .repo file excerpts, each containing one or two errors (duplicate IDs, baseurl one level too high, two slashes in a file URL, enabled=0, gpgcheck=1 with no key, .txt extension), with a matching dnf error message; red pens; whiteboard.",
   "steps": [
    "Each pair receives six broken repo excerpts with the dnf error or symptom printed beneath each.",
    "Pairs circle the error in each file and write the corrected line or file name.",
    "For each fix, pairs write the command they would run to verify it, such as dnf clean all followed by dnf repolist.",
    "Pairs exchange sheets with another pair and check each other's corrections.",
    "The class builds one fully correct two-repository file together on the whiteboard as a final reference."
   ]
  },
  "discussion": [
   "What risks does an organization take by disabling package signature checking?",
   "Why do you think Red Hat splits content into BaseOS and AppStream instead of one repository?"
  ],
  "exit": [
   [
    "In which directory, and with which file extension, do repository definitions go?",
    "/etc/yum.repos.d/, in files ending in .repo."
   ],
   [
    "What must the baseurl directory contain?",
    "The repodata/ subdirectory with the repository metadata."
   ],
   [
    "Which command lists the repositories dnf is using?",
    "dnf repolist"
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank .repo template with the keys listed and have struggling students supply only the values for a given scenario.",
   "Extend: Ask fast finishers to explain how --enablerepo and --disablerepo change behavior for a single command and when an administrator might keep a repository defined but disabled."
  ]
 },
 {
  "t": "Dnf config-manager --add-repo, dnf repolist and dnf clean all",
  "objectives": [
   "Students will be able to add a repository with dnf config-manager --add-repo and describe the contents of the generated .repo file.",
   "Students will be able to complete a generated repository file with the correct gpgcheck or gpgkey setting.",
   "Students will be able to verify repository configuration with dnf repolist, repolist all and repolist -v.",
   "Students will be able to explain when and why to run dnf clean all and distinguish persistent from one-command repository changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard. Point out that most answers involve 'checking where dnf looks', which is today's topic."
   ],
   [
    12,
    "Teach",
    "Project the code block from the lesson. Walk through what --add-repo writes, show a sample generated file on screen, and highlight the missing gpgkey line. Then demonstrate repolist, repolist all and repolist -v, and explain the cache under /var/cache/dnf and why dnf clean all helps."
   ],
   [
    15,
    "Activity",
    "Run the 'Broken repo clinic' activity in pairs. Circulate and ask each pair to say out loud which command proves their fix worked."
   ],
   [
    8,
    "Discuss",
    "Go through the discussion questions. Draw a two-column chart on the board: persistent changes (files, --set-disabled) versus one-time changes (--enablerepo, --disablerepo)."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "Your colleague says, 'dnf install says no package matches, but I know the package exists.' What are the first two things you would check?",
  "activity": {
   "title": "Broken repo clinic",
   "materials": "Printed cards, each showing a short generated .repo file and a matching dnf error message; whiteboard; student laptops with a browser for optional reference to man page text the teacher has copied into a shared document.",
   "steps": [
    "Give each pair four cards. Each card shows a .repo file produced by config-manager with one problem: no gpgkey with gpgcheck=1, a typo in baseurl, enabled=0, or a correct file whose cache is stale.",
    "Pairs match each file to the most likely error message and write the single command or file edit that fixes it.",
    "For each card, pairs also write the command that verifies the fix (for example dnf repolist all or a test dnf install).",
    "Two pairs swap cards and check each other's answers, marking any disagreement.",
    "The teacher reveals the answers and asks pairs that disagreed to explain their reasoning to the class."
   ]
  },
  "discussion": [
   "Why might Red Hat have chosen not to add a gpgkey line automatically when --add-repo is given a plain URL?",
   "When is it acceptable in real life to set gpgcheck=0, and what risk are you accepting?",
   "How would you prove to a grader that both repositories work, using only command output?"
  ],
  "exit": [
   [
    "Which command shows disabled repositories as well as enabled ones?",
    "dnf repolist all."
   ],
   [
    "What must you usually add to a file created by dnf config-manager --add-repo with a plain URL?",
    "A gpgkey line, or gpgcheck=0 if the task allows it."
   ],
   [
    "What is the difference between --set-disabled and --disablerepo?",
    "--set-disabled changes the .repo file persistently; --disablerepo applies only to the one command."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference card listing the five commands (add-repo, set-enabled/set-disabled, repolist all, clean all, makecache) with a one-line purpose for each, and let them use it during the activity.",
   "Extend: Ask fast finishers to write the full .repo file by hand for the same two repositories, including name, baseurl, enabled, gpgcheck and gpgkey, then compare it line by line with what config-manager would generate."
  ]
 },
 {
  "t": "Installing, updating and removing RPM packages with dnf (install, remove, update, reinstall, history undo)",
  "objectives": [
   "Students will be able to install, remove, update and reinstall packages with dnf and read a transaction summary before confirming.",
   "Students will be able to use dnf history, history info and history undo to inspect and reverse a specific transaction.",
   "Students will be able to compare history undo with history rollback and choose the correct one for a scenario.",
   "Students will be able to explain why kernels are installed alongside older versions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. Take a few answers and steer toward the idea that a good tool keeps a record of what it changed."
   ],
   [
    12,
    "Teach",
    "Project the lesson's code block. Explain install, remove with dependent packages, update and check-update, reinstall, and the kernel exception. Show a sample dnf history listing drawn on the board with five transactions and explain info, undo and rollback against it."
   ],
   [
    15,
    "Activity",
    "Run 'Transaction detective' in groups of three. Visit each group and ask which command they chose and why not the alternative."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions. Emphasize reading the summary before typing y."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "If you could press 'undo' on one change you made to a computer last month, how would the computer need to have recorded that change for undo to work?",
  "activity": {
   "title": "Transaction detective",
   "materials": "A printed mock dnf history table with eight numbered transactions (date, command line, action, packages changed) and a set of six scenario cards; whiteboard.",
   "steps": [
    "Hand each group the mock history table and the scenario cards, such as 'remove only what transaction 4 installed' or 'return the system to how it was after transaction 3'.",
    "For each card, the group writes the exact command (history undo, history rollback, reinstall, or a plain install or remove) and one sentence explaining the choice.",
    "Groups mark any card where the result depends on whether an old package version is still available in a repository.",
    "Each group presents one card to the class; the class votes on whether the command is correct.",
    "The teacher summarizes on the whiteboard: undo for one transaction, rollback for a point in time, reinstall for damaged files."
   ]
  },
  "discussion": [
   "Why is it risky to use -y on a dnf remove command you have not run before?",
   "When might dnf history undo fail even though the transaction is listed?",
   "Why would an administrator want several kernels kept on disk?"
  ],
  "exit": [
   [
    "Which command restores a deleted file that belongs to an installed package?",
    "dnf reinstall followed by the package name."
   ],
   [
    "Transaction 8 installed a package; transactions 9 and 10 were unrelated updates. Which command removes only what 8 installed?",
    "dnf history undo 8."
   ],
   [
    "What is the alternative spelling of dnf update?",
    "dnf upgrade."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart that starts with 'What went wrong?' and branches to reinstall (damaged files), history undo (one bad transaction) or rollback (return to an earlier state), and let students trace each scenario card through it.",
   "Extend: Ask fast finishers to explain what happens to the history list after an undo, and to design a scenario where rollback and undo of the same ID would leave different package sets."
  ]
 },
 {
  "t": "Finding packages and files: dnf search, dnf provides, dnf info",
  "objectives": [
   "Students will be able to choose between dnf search, dnf provides and dnf info for a given lookup need.",
   "Students will be able to find the package that supplies a missing command using dnf provides with a name or quoted glob.",
   "Students will be able to read dnf info output and identify whether a package is installed and which repository offers it.",
   "Students will be able to explain the difference between rpm -qf and dnf provides."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student strategies on the board."
   ],
   [
    12,
    "Teach",
    "Project the lesson's code block and walk through each command with sample output sketched on the board. Stress the decision rule: know the job, use search; know the command or file, use provides; want details, use info."
   ],
   [
    15,
    "Activity",
    "Run the 'Which lookup?' card sort in pairs, then a quick class check of answers."
   ],
   [
    8,
    "Discuss",
    "Work through the discussion questions, connecting back to repository troubleshooting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "A task tells you to make the 'semanage' command work, and it is not installed. How would you figure out what to install without guessing?",
  "activity": {
   "title": "Which lookup?",
   "materials": "Printed cards with twelve short task statements (for example 'make the dig command available', 'install something that can serve web pages', 'which version of httpd is offered?', 'who owns /etc/ssh/sshd_config?'); four header cards labeled dnf search, dnf provides, dnf info, rpm -qf; sticky notes.",
   "steps": [
    "Pairs sort the twelve task cards under the four header cards.",
    "For each card, pairs write the exact command they would type on a sticky note and attach it.",
    "Pairs mark any card where a glob is needed and add the quotes.",
    "The teacher reveals the intended sorting; pairs explain any card they placed differently, since some have two defensible answers.",
    "As a wrap-up, each pair writes one rule of thumb in their own words."
   ]
  },
  "discussion": [
   "Why is dnf provides more useful than dnf search on a task-based exam?",
   "What does it tell you if dnf provides finds the file only under @System?",
   "How would you troubleshoot a lookup that returns nothing at all?"
  ],
  "exit": [
   [
    "Which command finds the package that would install a missing command?",
    "dnf provides followed by the command name or a quoted path glob."
   ],
   [
    "What does @System mean in dnf info output?",
    "The package is already installed on this system."
   ],
   [
    "Why might rpm -qf fail to help for a command that is not installed?",
    "It only queries the local database of installed packages, not repository metadata."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row table (I know what it does / I know the command or file / I know the package name) mapping each row to the right command, and let them use it during the card sort.",
   "Extend: Ask fast finishers to write a one-line shell command that finds and installs the package for a missing command in one go, and to explain why that could be risky if several packages match."
  ]
 },
 {
  "t": "Querying installed packages with rpm -q, -qa, -qi, -ql, -qf, -qc",
  "objectives": [
   "Students will be able to check whether a package is installed and list installed packages with rpm -q and rpm -qa.",
   "Students will be able to list a package's files, configuration files and details with rpm -ql, -qc and -qi.",
   "Students will be able to identify the package that owns a file with rpm -qf and interpret a 'not owned' result.",
   "Students will be able to explain why rpm is used for queries but dnf for installation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Write student ideas on the board and circle any that rely on the network."
   ],
   [
    12,
    "Teach",
    "Project the code block. Explain each option letter with a mock output line, then cover -p for package files and -V verification codes. End with the rule: query with rpm, change with dnf."
   ],
   [
    15,
    "Activity",
    "Run 'Audit interview' as a role-play in pairs; swap roles halfway."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions and connect -qc to how students will find config files for services in later units."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "If a server has no network connection, how could you find out which version of a program is installed and where its settings file lives?",
  "activity": {
   "title": "Audit interview",
   "materials": "Printed auditor question cards (ten questions such as 'Which package owns /etc/chrony.conf?' or 'When was httpd installed?'); a printed answer sheet with short mock rpm outputs for the 'admin' to read from; timer on the projector.",
   "steps": [
    "Pair students: one plays the auditor with the question cards, the other plays the administrator with the mock output sheet.",
    "For each question, the administrator states the exact rpm command first, then reads the relevant line from the mock output as the answer.",
    "The auditor marks whether the command was correct and whether the answer matched the question.",
    "After five questions, partners swap roles and use the remaining five cards.",
    "The class reviews the two questions most often answered with the wrong option letter."
   ]
  },
  "discussion": [
   "What would it mean during an audit if many files in /etc are not owned by any package?",
   "Why might a configuration file show changes under rpm -V on a healthy system?",
   "When would you use rpm -qp before installing anything?"
  ],
  "exit": [
   [
    "Which command lists every file installed by the chrony package?",
    "rpm -ql chrony."
   ],
   [
    "Which command tells you what package owns /etc/ssh/sshd_config?",
    "rpm -qf /etc/ssh/sshd_config."
   ],
   [
    "Why should you install local RPM files with dnf rather than rpm -i?",
    "dnf resolves dependencies from repositories and records the transaction in history."
   ]
  ],
  "differentiation": [
   "Support: Provide a letter key card (a, i, l, c, d, f, p) with the question each letter answers, and let struggling students say the question aloud before choosing the option.",
   "Extend: Ask fast finishers to interpret a printed rpm -V output with several code strings, decide which lines are expected and which need investigation, and justify each call."
  ]
 },
 {
  "t": "Package groups: dnf group list and dnf group install",
  "objectives": [
   "Students will be able to list groups, hidden groups and group IDs with dnf group list.",
   "Students will be able to inspect a group's mandatory, default and optional packages with dnf group info.",
   "Students will be able to install a group or environment group, including optional packages when required.",
   "Students will be able to compare groups with environment groups and explain where group definitions come from."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Point out that bundling is exactly what package groups do."
   ],
   [
    12,
    "Teach",
    "Project dnf group list and dnf group info output sketched on slides or the board. Explain groups versus environment groups, the three package classes, quoting and IDs, and the @ and @^ syntax."
   ],
   [
    15,
    "Activity",
    "Run 'Build the meal deal', a card activity in groups of three to four."
   ],
   [
    8,
    "Discuss",
    "Work through the discussion questions, focusing on the optional trap."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "When you set up a new phone or laptop, what is easier: installing apps one at a time or picking a ready-made bundle? What could go wrong with the bundle?",
  "activity": {
   "title": "Build the meal deal",
   "materials": "Printed cards: three mock 'dnf group info' outputs with packages under Mandatory, Default and Optional headings; task cards such as 'make sure tool X is available' or 'install the minimum for this group'; whiteboard.",
   "steps": [
    "Give each team the three mock group info printouts and five task cards.",
    "For each task card, the team writes the exact command, deciding whether --with-optional, quoting or an ID is needed.",
    "Teams list which packages would be installed by their command, using the printout.",
    "Teams exchange answers with another team and look for any task where a needed package would be missed.",
    "The teacher reviews the cards on the whiteboard and highlights the ones where a tool sat in the Optional section."
   ]
  },
  "discussion": [
   "Why might Red Hat mark some packages in a group as optional rather than default?",
   "What are the pros and cons of installing a whole group versus individual packages on a production server?",
   "Why could two systems show different group lists from dnf group list?"
  ],
  "exit": [
   [
    "Which command shows group IDs?",
    "dnf group list --ids."
   ],
   [
    "How do you include optional packages when installing a group?",
    "Add --with-optional to dnf group install."
   ],
   [
    "What prefix marks an environment group in dnf install syntax?",
    "@^, as in dnf install @^environment-id."
   ]
  ],
  "differentiation": [
   "Support: Give students a color-coded copy of one group info printout (mandatory in one color, default in another, optional in a third) and have them circle what a plain group install would include before tackling the task cards.",
   "Extend: Ask fast finishers to explain what dnf group remove would leave behind if two installed groups share packages, and to describe how they would confirm it with dnf history info."
  ]
 },
 {
  "t": "Configuring access to Flatpak repositories: flatpak remote-add, flatpak remotes",
  "objectives": [
   "Students will be able to explain what Flatpak remotes, runtimes and sandboxes are and how they differ from dnf repositories.",
   "Students will be able to add a system-wide or per-user remote with flatpak remote-add and a .flatpakrepo file.",
   "Students will be able to verify remotes with flatpak remotes and flatpak remote-ls.",
   "Students will be able to modify or delete a remote and explain the role of GPG verification."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the idea of trusted app sources."
   ],
   [
    12,
    "Teach",
    "Project the code block. Compare a dnf .repo file and a .flatpakrepo file side by side on the board. Explain system versus user scope, --if-not-exists, remotes and remote-ls, and why GPG keys matter."
   ],
   [
    15,
    "Activity",
    "Run 'Scope check' in pairs with printed scenario and output cards."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, steering toward exact naming and scope as grading criteria."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Before you install an app from a new app store, what would you want to know about that store?",
  "activity": {
   "title": "Scope check",
   "materials": "Printed cards with six short task statements (for example 'for all users', 'for user alice only', 'name it examplerepo'); printed mock outputs of flatpak remotes showing names and options; a projector for the answer key.",
   "steps": [
    "Pairs read each task statement and write the exact flatpak remote-add command, including who runs it and whether --user is needed.",
    "Pairs then match each command to the mock flatpak remotes output it would produce.",
    "For two of the mock outputs, pairs identify what is wrong with respect to the task (wrong name or wrong scope) and write the fix.",
    "Pairs swap with a neighbor to check commands and fixes.",
    "The teacher projects the answer key and discusses the most common error."
   ]
  },
  "discussion": [
   "Why might an organization prefer system-wide remotes on shared workstations?",
   "What risk do you accept if you add a remote with --no-gpg-verify?",
   "How is a Flatpak remote similar to and different from a dnf repository?"
  ],
  "exit": [
   [
    "Which command adds a remote named lab from lab.flatpakrepo only if it does not already exist?",
    "flatpak remote-add --if-not-exists lab lab.flatpakrepo."
   ],
   [
    "How do you add a remote for only your own user?",
    "Add the --user option to flatpak remote-add."
   ],
   [
    "Which command lists what applications a remote offers?",
    "flatpak remote-ls followed by the remote name."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank command template (flatpak remote-add [scope option] [--if-not-exists] NAME LOCATION) and a two-question checklist: who should see it, and what exact name is required.",
   "Extend: Ask fast finishers to describe what happens to installed applications if their remote is disabled or deleted, and to propose a safe order of commands for retiring a remote."
  ]
 },
 {
  "t": "Installing, listing, updating and removing Flatpak applications (flatpak install, list, update, uninstall, run)",
  "objectives": [
   "Students will be able to find an application ID with flatpak search and install the application from a named remote at system or user scope.",
   "Students will be able to list, inspect and run installed Flatpak applications with flatpak list, info and run.",
   "Students will be able to update and uninstall Flatpak applications and remove unused runtimes.",
   "Students will be able to explain why rpm and dnf cannot be used to verify Flatpak applications."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question; list the answers and connect them to the install, list, update, run and uninstall lifecycle."
   ],
   [
    12,
    "Teach",
    "Project the code block and walk through each command in lifecycle order. Draw an app sharing a runtime with a second app to explain why uninstall leaves runtimes. Show where the Installation column appears in flatpak list."
   ],
   [
    15,
    "Activity",
    "Run 'Lifecycle relay' in teams of four."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, contrasting Flatpak and dnf verification."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Think of an app you installed on a phone. What steps does it go through from the moment you find it until you delete it?",
  "activity": {
   "title": "Lifecycle relay",
   "materials": "Printed task cards describing a sequence (find, install for all users, verify, run, update, uninstall, clean up); printed mock outputs of flatpak list and flatpak search; whiteboard divided into lanes per team.",
   "steps": [
    "Each team lines up; the first student takes the 'find' card, writes the command on the team's whiteboard lane and hands the marker to the next student.",
    "Each following student writes the command for the next card, using the mock outputs to get the correct application ID and checking scope.",
    "After all cards are done, teams review their lane together and fix any mistakes before time is called.",
    "Teams compare lanes with a neighboring team and note differences, especially in verification and cleanup steps.",
    "The teacher goes over the expected commands and highlights flatpak uninstall --unused and the Installation column."
   ]
  },
  "discussion": [
   "Why is it useful that Flatpak apps can be updated independently of the operating system?",
   "What evidence would you show a grader to prove an app was installed for all users?",
   "When might you choose --delete-data when uninstalling, and when would you avoid it?"
  ],
  "exit": [
   [
    "Which command lists only installed Flatpak applications?",
    "flatpak list --app."
   ],
   [
    "Which command removes runtimes no installed application needs?",
    "flatpak uninstall --unused."
   ],
   [
    "Why does rpm -qa not show a Flatpak application?",
    "Flatpak keeps its own installation records separate from the RPM database."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a lifecycle strip with the six verbs (search, install, list, run, update, uninstall) and the matching flatpak command beside each, so they focus on choosing options such as --app, -y and scope.",
   "Extend: Ask fast finishers to explain the parts of the ref app/org.example.Editor/x86_64/stable and to predict what flatpak would do if two remotes both offered the same application ID."
  ]
 },
 {
  "t": "Shebang lines, making scripts executable and running them from PATH",
  "objectives": [
   "Students will be able to write a script with a correct shebang line and explain how the kernel uses it.",
   "Students will be able to set execute permission and place a script in a PATH directory so it runs by name.",
   "Students will be able to diagnose 'command not found', 'Permission denied' and 'bad interpreter' errors.",
   "Students will be able to compare running a script as a child process with sourcing it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect guesses about why a script might run for one person and not another."
   ],
   [
    12,
    "Teach",
    "Project the two code blocks. Explain the shebang, chmod 755, PATH search order and why the current directory is excluded. Draw the PATH as a row of boxes the shell checks left to right."
   ],
   [
    15,
    "Activity",
    "Run 'Error message triage' in pairs, using a free browser-based Linux terminal emulator if available or the printed cards alone."
   ],
   [
    8,
    "Discuss",
    "Work through the discussion questions, emphasizing testing the way the grader will."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A script works when you run it with 'bash myscript' but not when you type 'myscript'. List as many possible reasons as you can in two minutes.",
  "activity": {
   "title": "Error message triage",
   "materials": "Printed cards each showing a short terminal transcript (a command typed, an error message, and ls -l or echo $PATH output); whiteboard with three columns labeled Shebang, Permission, PATH; student laptops with a browser for an optional in-browser Linux emulator.",
   "steps": [
    "Give each pair eight transcript cards.",
    "Pairs place each card under the column for the requirement that is missing, adding a fourth 'Other' column if needed for cases such as a parent directory without access.",
    "For each card, pairs write the single command that fixes the problem.",
    "Pairs that have a browser emulator recreate two of the cards and confirm their fix works.",
    "The class reviews the placement of each card, and the teacher highlights the line-ending case."
   ]
  },
  "discussion": [
   "Why do you think the current directory is left out of PATH by default?",
   "When would you prefer ~/bin over /usr/local/bin for a script?",
   "Why is testing a script as root not enough when the task says any user must run it?"
  ],
  "exit": [
   [
    "What must the first line of a Bash script be?",
    "#!/bin/bash, with nothing before it."
   ],
   [
    "Which command makes /usr/local/bin/report executable by all users?",
    "chmod 755 /usr/local/bin/report (or chmod +x)."
   ],
   [
    "A script gives 'command not found' when typed by name. What is the most likely cause?",
    "It is not in a directory listed in PATH, or the name does not match."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-item checklist card (line 1 shebang, chmod 755, in PATH) and a sample ls -l output with the permission characters labeled, and have them check each transcript against the card.",
   "Extend: Ask fast finishers to explain what happens if two scripts with the same name exist in different PATH directories, and to show how which and type reveal which one will run."
  ]
 },
 {
  "t": "Conditionally running code with if, elif, else and test / [ ] (-f, -d, -z, -eq, -gt, string compares)",
  "objectives": [
   "Students will be able to explain that if branches on a command's exit status and that [ ] is a command requiring spaces.",
   "Students will be able to choose the correct file test (-e, -f, -d, -r, -w, -x, -s) for a scenario.",
   "Students will be able to compare strings with =, !=, -z and -n and integers with -eq, -ne, -lt, -le, -gt and -ge.",
   "Students will be able to write an if, elif, else structure that quotes variables and handles each branch."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Write two or three student 'if' rules from daily life on the board and translate one into pseudo-code."
   ],
   [
    12,
    "Teach",
    "Project the lesson's script. Explain exit status as true or false, why [ needs spaces, the three families of tests (file, string, number), quoting, and the if, elif, else, fi structure."
   ],
   [
    15,
    "Activity",
    "Run 'Fix the condition' in pairs with printed broken snippets; pairs with laptops can test in a browser-based Bash sandbox."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, comparing [ ] with [[ ]] briefly."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Write one 'if, else if, otherwise' rule you follow every day, such as what you wear depending on the weather.",
  "activity": {
   "title": "Fix the condition",
   "materials": "Printed cards with eight short broken if statements (missing spaces, unquoted variables, > used for numbers, -e instead of -d, missing fi); whiteboard; optional student laptops with a browser-based Bash sandbox.",
   "steps": [
    "Give each pair the eight cards and ask them to predict what each snippet actually does, including any error message.",
    "Pairs rewrite each snippet correctly on the back of the card.",
    "Pairs with laptops test two of their fixes in the sandbox, once with the condition true and once false.",
    "Pairs swap cards with a neighbor and check each other's fixes for quoting and the right operator.",
    "The teacher reviews the cards and records the three most common errors on the board."
   ]
  },
  "discussion": [
   "Why does Bash treat 0 as true when many languages treat 0 as false?",
   "When would you use any command, such as grep -q or id, as an if condition instead of [ ]?",
   "What could go wrong in production if a test silently evaluates to true because of an empty variable?"
  ],
  "exit": [
   [
    "Which test checks that /data is a directory?",
    "[ -d /data ]."
   ],
   [
    "Write a test that is true when $count is less than 3.",
    "[ \"$count\" -lt 3 ]."
   ],
   [
    "Which keyword closes an if statement?",
    "fi."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card that groups operators into three boxes (file, string, number) with one example each, and have students identify which box a scenario belongs in before writing the test.",
   "Extend: Ask fast finishers to rewrite two snippets using [[ ]] and explain one case where [[ ]] behaves differently from [ ], such as an empty unquoted variable or pattern matching."
  ]
 },
 {
  "t": "Exit status ($?), && and ||, and exit codes in scripts",
  "objectives": [
   "Students will be able to explain the meaning of exit statuses and read the most recent one with $?.",
   "Students will be able to use && and || to run commands conditionally and identify when a && b || c misbehaves.",
   "Students will be able to write scripts that exit with specific codes using exit and send errors to stderr.",
   "Students will be able to verify a script's exit code from the command line."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the idea of a report code at the end of every task."
   ],
   [
    12,
    "Teach",
    "Project both code blocks. Explain 0 versus non-zero, how $? is overwritten, guard lines with && and ||, the a && b || c pitfall, and exit codes in the usage-check script."
   ],
   [
    15,
    "Activity",
    "Run 'Predict the status' as a whole-class game followed by pair work."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, linking exit codes to cron and systemd in later units."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "If a robot vacuum could send you only one number when it finished, what numbers would you want it to use and what should each mean?",
  "activity": {
   "title": "Predict the status",
   "materials": "Projector with ten short command sequences (for example 'grep -q root /etc/passwd; echo $?' or 'false && echo a || echo b'); mini whiteboards or paper for each pair; a printed sheet of three short scripts with missing exit lines.",
   "steps": [
    "Show each command sequence; pairs write the predicted output and final exit status on their mini whiteboard and hold it up.",
    "Reveal the answer and briefly explain any sequence most pairs got wrong, especially the a && b || c case.",
    "Hand out the script sheet; pairs add guard lines and exit codes so each script matches a stated requirement such as 'exit 2 on wrong argument count'.",
    "Pairs swap sheets and trace the scripts with sample inputs, writing the expected $? for each.",
    "The teacher reviews one script on the board and highlights >&2 and the braces syntax."
   ]
  },
  "discussion": [
   "Why would a scheduler or monitoring tool care about a script's exit code more than its output?",
   "When is the compact a && b || c acceptable, and when is it risky?",
   "Why send error messages to stderr instead of stdout?"
  ],
  "exit": [
   [
    "What does echo $? print right after a successful command?",
    "0."
   ],
   [
    "In 'cmd1 || cmd2', when does cmd2 run?",
    "Only when cmd1 fails (returns non-zero)."
   ],
   [
    "How do you make a script stop immediately with failure code 4?",
    "Use exit 4."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column card showing && as 'and then, if it worked' and || as 'or else, if it failed', with three worked examples, and have them read each sequence aloud using those phrases.",
   "Extend: Ask fast finishers to look up the EXIT STATUS section of the grep and ls man pages and write a script that reports a different message for each documented code."
  ]
 },
 {
  "t": "Looping with for (over lists, globs, $(seq)) and while read",
  "objectives": [
   "Students will be able to write for loops over literal lists, globs and number sequences from seq or brace expansion.",
   "Students will be able to process a file line by line with while read -r and a redirection after done.",
   "Students will be able to set IFS to split fields on a custom separator and use continue and break.",
   "Students will be able to explain why for line in $(cat file) and piping into while can produce wrong results."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into 'go through a list' and 'keep going until something runs out'."
   ],
   [
    12,
    "Teach",
    "Project the code blocks. Explain the for loop with three list sources, the problem with $(cat file) and $(ls), then while read -r with < file, IFS for custom separators, continue and break, and the subshell caution."
   ],
   [
    15,
    "Activity",
    "Run 'Loop it' in pairs: trace and write loops from printed data files, with optional testing in a browser-based Bash sandbox."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions; connect loops back to exit status and if from previous lessons."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Name one repetitive task you do on a computer that you would happily hand to a script. Does it work through a list, or keep going until something runs out?",
  "activity": {
   "title": "Loop it",
   "materials": "Printed sheets with two small data files (a list of names, and colon-separated name:UID lines including one name with a space and one comment line), three loop tasks, and one broken loop using $(cat file); optional student laptops with a browser-based Bash sandbox.",
   "steps": [
    "Pairs trace the broken $(cat file) loop on paper, writing each value the variable takes, and identify where the line with a space breaks.",
    "Pairs write a while IFS=: read -r loop that would create each user with its UID, skipping comment lines with continue.",
    "Pairs write a for loop using seq or brace expansion to create numbered directories, and a glob loop that counts lines in each .conf file.",
    "Pairs with laptops test one loop with echo in place of the real command; others swap sheets and trace each other's loops.",
    "The teacher reviews answers on the board and asks one pair to explain why redirecting after done is better than piping."
   ]
  },
  "discussion": [
   "When would you choose a for loop over while read, and vice versa?",
   "Why is it a good habit to run a loop with echo first before letting it change the system?",
   "What problems could unusual file names cause in scripts, and how do globs and quoting help?"
  ],
  "exit": [
   [
    "Write a for loop header that counts from 1 to 5.",
    "for i in $(seq 1 5); do (or for i in {1..5}; do)."
   ],
   [
    "How do you feed /root/list.txt into a while read loop without a pipe?",
    "Put < /root/list.txt after done."
   ],
   [
    "What does continue do inside a loop?",
    "It skips the rest of the current iteration and moves to the next item."
   ]
  ],
  "differentiation": [
   "Support: Provide fill-in-the-blank loop templates (for ___ in ___; do ___; done and while read -r ___; do ___; done < ___) and have students complete them for each task before writing loops freehand.",
   "Extend: Ask fast finishers to write a loop that reads /etc/passwd with IFS=: and prints only users whose UID is 1000 or greater, combining read, an if test with -ge, and continue."
  ]
 },
 {
  "t": "Processing script inputs: $1, $2, $#, $@ and $0",
  "objectives": [
   "Students will be able to identify the values of $0, $1, $2, $# and \"$@\" for a given command line.",
   "Students will be able to explain the difference between \"$@\", \"$*\" and unquoted forms when arguments contain spaces.",
   "Students will be able to write a script that validates its argument count, prints a usage message to stderr and exits with a non-zero status.",
   "Students will be able to use shift and default-value expansion to process structured arguments."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write `cp report.txt /tmp` on the board and ask how cp knows which file is the source and which is the destination. Lead students to the idea that position matters, then say that scripts receive arguments the same way."
   ],
   [
    12,
    "Teach",
    "Project the mkusers.sh example. Walk through $0, $1, $#, \"$@\" and \"$*\" with a sample command line containing a quoted two-word name. Demonstrate the unary operator error from an unquoted empty $1, then show shift and ${1:-default}."
   ],
   [
    15,
    "Activity",
    "Run the \"Human script\" role-play described below, then have pairs write and test the greet script on laptops or a browser-based Linux terminal."
   ],
   [
    8,
    "Discuss",
    "Ask pairs to share one bug they hit while testing. Connect each bug to quoting, argument count or exit status, and stress testing with zero, one, several and spaced arguments."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "When you type `cp report.txt /tmp`, how does cp know which word is the file to copy and which is the destination? What do you think would happen if a script could not tell how many words you typed?",
  "activity": {
   "title": "Human script: acting out positional parameters",
   "materials": "Whiteboard, printed cards labeled $0, $1, $2, $3, $#, \"$@\" and \"$*\", sticky notes, student laptops with a browser for a free online Linux terminal or lab VM.",
   "steps": [
    "Choose five volunteers and give each a card: $0, $1, $2, $3 and $#. The teacher calls out a command line such as ./mkusers.sh ana 'bob lee' cara.",
    "Each volunteer writes the value for their card on a sticky note and holds it up; the class checks whether 'bob lee' was kept as one value.",
    "The teacher calls \"shift\"; the $1 volunteer sits down, everyone else slides one card down, and the $# holder updates the count.",
    "Repeat with a command line that has no arguments and ask what the script should print and which exit status it should return.",
    "In pairs, students write greet.sh that prints Hello NAME or a usage line with exit 1, and test it with zero arguments, one argument and a quoted two-word name, recording $? each time."
   ]
  },
  "discussion": [
   "Why do you think the shell splits unquoted variables on spaces at all, and when might that be useful?",
   "If an exam task does not mention an exit status, should your script still exit non-zero on bad input? Why?",
   "How would you design a script that takes an optional first argument and a required list after it?"
  ],
  "exit": [
   [
    "A script is run as `./s.sh red 'light blue' green`. What are $#, $2 and $0?",
    "$# is 3, $2 is light blue, and $0 is ./s.sh."
   ],
   [
    "Which form should you use to loop over every argument safely, and why?",
    "\"$@\" in double quotes, because it keeps each argument as a separate word even if it contains spaces."
   ],
   [
    "Write the line that prints a usage message and stops a script when no arguments are given.",
    "if [ $# -eq 0 ]; then echo \"Usage: $0 name\" >&2; exit 1; fi"
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a filled-in table mapping a sample command line to $0, $1, $2 and $#, and let them run `echo \"$# $1 $2\"` in a two-line script before writing anything larger.",
   "Extend: Ask fast finishers to write a script that accepts an optional -v flag before a list of files, using a while loop, case and shift, and that prints each file only when -v was given."
  ]
 },
 {
  "t": "Processing the output of shell commands with $( ) command substitution",
  "objectives": [
   "Students will be able to use $( ) to capture a command's standard output into a variable or a string.",
   "Students will be able to build a pipeline with cut, awk, tr, head, tail or grep that reduces output to a single value.",
   "Students will be able to explain what command substitution does not capture (standard error) and how quoting affects the result.",
   "Students will be able to write a script that uses captured values in a file name and in a numeric test."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Point out that every answer is a command that prints something, and that today's lesson is how a script grabs that printed text."
   ],
   [
    12,
    "Teach",
    "Show $(date +%F), echo \"Kernel: $(uname -r)\" and the backup script. Build the df pipeline live, one stage at a time, showing what each stage removes. Contrast stdout and stderr capture and show a quoted versus unquoted substitution."
   ],
   [
    18,
    "Activity",
    "Run the \"Pipeline relay\" activity below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Ask groups which stage of their pipeline was hardest and why testing at the prompt first saved time."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Name three commands that print a single useful fact about the system, such as its name or the date. How would you get that fact into a file name without retyping it?",
  "activity": {
   "title": "Pipeline relay: from raw output to one value",
   "materials": "Projector, printed excerpts of command output (df, /etc/passwd lines, who, ip -brief address), whiteboard markers, student laptops with a browser-based Linux terminal or lab VM.",
   "steps": [
    "Give each group of three a printed output excerpt and a target value, for example \"the percentage used on / as a bare number\" or \"all user names with UID 1000 or higher\".",
    "Student one writes the first pipeline stage on the whiteboard, student two adds the next stage, and student three adds the final trim, each explaining what their stage removes.",
    "Groups test their pipeline at a terminal and fix it until it prints exactly the target value and nothing else.",
    "Groups wrap the pipeline in $( ), assign it to a variable and use it in either a file name or an if test with -gt.",
    "Each group shows its final line on the projector, and the class predicts the output before it runs."
   ]
  },
  "discussion": [
   "Why might a script that works perfectly at the prompt fail when cron runs it at night, given what you know about standard error and missing output?",
   "When is it actually useful to leave a substitution unquoted?",
   "Should a script call date once and store it, or call $(date) each time it needs the value? What could go wrong?"
  ],
  "exit": [
   [
    "Write a line that stores the short host name in the variable h.",
    "h=$(hostname -s)"
   ],
   [
    "A substitution's command prints an error message. Does the error end up in the variable?",
    "No. Only standard output is captured; the error goes to the terminal unless redirected with 2>&1 inside the parentheses."
   ],
   [
    "Why should you write \"$(ls /data)\" in quotes when printing it?",
    "Quoting keeps the output as one word, preserving newlines and preventing word splitting and glob expansion."
   ]
  ],
  "differentiation": [
   "Support: Provide a worksheet with each pipeline stage's output already printed so students only choose the next command, and let them practice with echo \"$(date +%F)\" before longer pipelines.",
   "Extend: Ask fast finishers to write a script that reports the three largest directories under /var with du, sort and head, and writes the report to a file named with the host and date."
  ]
 },
 {
  "t": "Reading input and using variables and quoting correctly",
  "objectives": [
   "Students will be able to assign, reference and export variables correctly, including the ${name} form.",
   "Students will be able to use read with -p, -s and -t to collect input in a script.",
   "Students will be able to predict the output of commands that use double quotes, single quotes, backslashes and no quotes.",
   "Students will be able to perform integer arithmetic with $(( )) and explain its integer-only behavior."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write the three echo lines from the warm-up on the board and have students predict each output before revealing them."
   ],
   [
    12,
    "Teach",
    "Explain assignment rules, scope and export, then read options. Demonstrate the id $u bug live with empty input, show the fix, and finish with $(( )) examples including 7 / 2."
   ],
   [
    15,
    "Activity",
    "Run the \"Quote sort\" card activity below in pairs, then let pairs test their predictions at a terminal."
   ],
   [
    8,
    "Discuss",
    "Discuss which predictions were wrong and why. Build a class rule list on the whiteboard: no spaces around =, quote every variable, single quotes for literal text."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on a half sheet."
   ]
  ],
  "warmup": "Predict the output of these three lines when run as root: echo $HOME, echo \"$HOME\", echo '$HOME'. Which one surprises you, and why?",
  "activity": {
   "title": "Quote sort: predicting what the shell sees",
   "materials": "Printed cards, each with one short command (for example echo \"$USER\", echo '$USER', echo \\$USER, name = ana, f=\"a b\"; ls $f, echo $((7/2))), sticky notes, whiteboard, student laptops with a browser-based Linux terminal or lab VM.",
   "steps": [
    "Give each pair a stack of about ten command cards and three column headers on sticky notes: \"Expands\", \"Literal\" and \"Error or surprise\".",
    "Pairs sort the cards into columns and write their predicted output on each card.",
    "Pairs type each command into a terminal and mark each prediction as right or wrong.",
    "For every wrong prediction, pairs write one sentence explaining the rule they missed.",
    "Pairs fix the id $u script from the lesson so it rejects empty input and quotes the variable, then test it with empty input and a normal name."
   ]
  },
  "discussion": [
   "Why do you think Bash splits unquoted values on spaces instead of always keeping them together?",
   "When would you deliberately use single quotes in a script you write for the exam?",
   "How could export lead to surprising behavior in programs your script starts?"
  ],
  "exit": [
   [
    "What does `echo \"Home: $HOME\"` print for root, and what does `echo 'Home: $HOME'` print?",
    "The first prints Home: /root; the second prints the literal text Home: $HOME."
   ],
   [
    "Write a read command that prompts \"Password: \" and hides typing, storing the answer in pw.",
    "read -s -p 'Password: ' pw"
   ],
   [
    "What is the value of $((10 / 4))?",
    "2, because Bash arithmetic is integer only."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page quoting reference card with one example per quoting style and have them test each line before attempting the card sort.",
   "Extend: Ask fast finishers to write a script that reads lines of \"user:group\" from a file with a while read loop, splits each line with IFS=: and prints a usermod command for each, fully quoted."
  ]
 },
 {
  "t": "Case statements for simple argument handling",
  "objectives": [
   "Students will be able to write a case statement with alternative patterns, a default clause and correct punctuation.",
   "Students will be able to explain why clause order matters and that only the first matching clause runs.",
   "Students will be able to use glob patterns in case to accept variations of user input.",
   "Students will be able to test every branch of a case-based script and verify its exit status."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to describe an automated phone menu, then show a messy if/elif chain on the projector and ask what makes it hard to maintain."
   ],
   [
    12,
    "Teach",
    "Rewrite the if/elif chain as a case statement live, naming each piece of punctuation as you type it. Show alternatives with |, glob patterns such as [Yy], the default clause and bash -n."
   ],
   [
    15,
    "Activity",
    "Run the \"Mailroom trays\" card activity below, then have pairs write the go/stop script and test every branch."
   ],
   [
    8,
    "Discuss",
    "Ask pairs which test case revealed a bug and what it was. Highlight clause order and exit status checks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Think of an automated phone menu you have used. What happens when you press a number that is not on the menu? How would you write that rule in a script?",
  "activity": {
   "title": "Mailroom trays: acting out case matching",
   "materials": "Printed pattern cards (start|up, stop|down, status, [Yy]|[Yy][Ee][Ss], *.tgz, *), printed input cards (start, UP, Yes, backup.tgz, an empty card, restart), whiteboard, student laptops with a browser-based Linux terminal or lab VM.",
   "steps": [
    "Tape the pattern cards in a row on the whiteboard in a deliberately poor order, with * second.",
    "Students take turns drawing an input card and walking it along the row, stopping at the first pattern it matches.",
    "The class notices that the * card captures inputs meant for later patterns; a volunteer reorders the cards so * is last, and the class repeats the walk.",
    "Discuss the UP card: since patterns are case-sensitive, decide whether to add [Uu][Pp] or leave it to the default.",
    "In pairs, students write the go/stop script with exit 2 in the default clause, run bash -n, and test go, stop, an invalid word and no argument, recording $? for each."
   ]
  },
  "discussion": [
   "When would an if statement still be a better choice than case?",
   "Why is it important for the default clause to send its message to stderr and exit non-zero?",
   "How might you make a case statement accept commands in any capitalization without listing every combination?"
  ],
  "exit": [
   [
    "Write a case clause that matches either stop or down and runs systemctl stop httpd.",
    "stop|down) systemctl stop httpd ;;"
   ],
   [
    "Why must the *) clause come last?",
    "It matches everything, so any clause after it would never be reached, because only the first match runs."
   ],
   [
    "Which command checks a script for syntax errors without running it?",
    "bash -n script"
   ]
  ],
  "differentiation": [
   "Support: Provide a case statement skeleton with blanks for the patterns, ;; and esac, and have students fill it in and run bash -n before writing their own from scratch.",
   "Extend: Ask fast finishers to write a script that processes -v, -h and file name arguments in a while loop with case and shift, and prints a summary of which options were seen."
  ]
 },
 {
  "t": "Booting, rebooting and shutting down normally (systemctl reboot, poweroff)",
  "objectives": [
   "Students will be able to reboot, power off and schedule or cancel a shutdown using systemctl and shutdown.",
   "Students will be able to describe the boot sequence from firmware through GRUB 2, kernel and initramfs to systemd and the default target.",
   "Students will be able to view and change the default target and switch targets on a running system with isolate.",
   "Students will be able to verify after a reboot that services, mounts and settings persisted."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about what could be lost when power is cut. Connect the answers to the idea of an orderly shutdown."
   ],
   [
    12,
    "Teach",
    "Demonstrate systemctl reboot, shutdown -r +5 with a message, and shutdown -c. Draw the boot sequence on the whiteboard as a chain of boxes. Explain targets, get-default, set-default and isolate, and the difference between start and enable."
   ],
   [
    15,
    "Activity",
    "Run the \"Boot chain and reboot audit\" activity below."
   ],
   [
    8,
    "Discuss",
    "Ask groups what failed in their reboot audit or what they predicted would fail. Stress doing a final reboot on the exam."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "What could go wrong if you pulled the power cord on a server instead of shutting it down? List at least two things.",
  "activity": {
   "title": "Boot chain and reboot audit",
   "materials": "Printed cards labeled Firmware (BIOS/UEFI), GRUB 2, Kernel, initramfs, Real root mounted, systemd, Default target; a printed \"change log\" of five configuration tasks (some made persistent, some not); whiteboard; student laptops with a browser-based Linux lab or VM if available.",
   "steps": [
    "In groups of three, students shuffle the boot cards and put them in order, then explain to another group what each stage hands to the next.",
    "Give each group the printed change log, for example \"ran mount /dev/vg0/lv0 /data\", \"added /data to /etc/fstab\", \"ran systemctl start httpd\", \"ran systemctl enable --now chronyd\", \"ran systemctl set-default multi-user.target\".",
    "Groups mark each change as \"survives reboot\" or \"lost at reboot\" and write the command that would make the lost ones persistent.",
    "If lab VMs are available, groups make one persistent and one non-persistent change, reboot with systemctl reboot, and confirm with findmnt, systemctl is-active and systemctl --failed.",
    "Groups report their predictions and results to the class."
   ]
  },
  "discussion": [
   "Why do you think Red Hat grades the system after a reboot rather than while it is running?",
   "When would you schedule a shutdown with a delay and a message instead of rebooting immediately?",
   "What would you check first if a server took a very long time to shut down?"
  ],
  "exit": [
   [
    "What is the difference between systemctl set-default and systemctl isolate?",
    "set-default changes the target used at the next boot; isolate switches the running system to a target now."
   ],
   [
    "Put these in boot order: systemd, GRUB 2, firmware, initramfs.",
    "Firmware, GRUB 2, initramfs (loaded with the kernel), systemd."
   ],
   [
    "A service works now but is not running after a reboot. What was missed?",
    "It was started but not enabled; systemctl enable (or enable --now) makes it start at boot."
   ]
  ],
  "differentiation": [
   "Support: Give students a partly completed boot-sequence diagram with two stages filled in and a command cheat sheet for reboot, poweroff, get-default and set-default.",
   "Extend: Ask fast finishers to compare the units pulled in by multi-user.target and graphical.target using systemctl list-dependencies and explain the main difference."
  ]
 },
 {
  "t": "Identifying CPU- and memory-intensive processes with top, ps aux --sort and killing them (kill, pkill, signals 15 and 9)",
  "objectives": [
   "Students will be able to identify the processes using the most CPU and memory with top and ps aux --sort.",
   "Students will be able to explain the difference between SIGTERM (15) and SIGKILL (9) and choose the right one.",
   "Students will be able to terminate processes by PID, name or user with kill, pkill and killall.",
   "Students will be able to explain why systemctl stop is preferred over kill for systemd services."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a frozen app and how students have closed it. Connect \"close\" versus \"force quit\" to SIGTERM and SIGKILL."
   ],
   [
    12,
    "Teach",
    "Project top and explain the header and key columns. Show M, P, k and q. Run ps aux --sort=-%cpu | head and --sort=-%mem. Explain signals 15, 9, 1 and 2, then pkill, killall and pgrep -l."
   ],
   [
    15,
    "Activity",
    "Run the \"Read the snapshot\" activity below in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share their decisions for each scenario. Discuss when SIGKILL was justified and when systemctl stop was the right answer."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "When an app freezes on your phone or laptop, what are the two ways you can close it? What is the difference between them?",
  "activity": {
   "title": "Read the snapshot: triage from top and ps output",
   "materials": "Projector, printed excerpts of top and ps aux --sort=-%cpu output (made up by the teacher with fictional process names and users), short printed scenario cards, whiteboard, optional student laptops with a lab VM.",
   "steps": [
    "Give each pair a printed top screen and a ps aux --sort=-%mem excerpt for the same fictional server.",
    "Pairs identify the busiest CPU process and the largest memory process, writing down PID, user and command for each.",
    "Hand out scenario cards (for example \"process ignores SIGTERM\", \"process is httpd managed by systemd\", \"contractor account must be cleared\") and have pairs write the exact command they would run for each.",
    "If lab VMs are available, pairs start a harmless busy loop such as `sha256sum /dev/zero &`, find it in top, stop it with SIGTERM and confirm with pgrep.",
    "Pairs trade answers with a neighboring pair and check each other's commands."
   ]
  },
  "discussion": [
   "Why do you think SIGTERM is the default rather than SIGKILL?",
   "What risks come with using pkill on a short pattern, and how do you reduce them?",
   "How would you decide whether high CPU use is a problem or just normal work?"
  ],
  "exit": [
   [
    "What command lists processes sorted with the highest CPU users first?",
    "ps aux --sort=-%cpu (pipe to head to limit the list)."
   ],
   [
    "What is the difference between kill 1234 and kill -9 1234?",
    "kill 1234 sends SIGTERM, a request the process can handle to exit cleanly; kill -9 sends SIGKILL, which the kernel enforces immediately with no cleanup."
   ],
   [
    "How should you stop httpd if it is consuming too much CPU?",
    "systemctl stop httpd, because systemd may restart a killed service process."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the top screen with each column explained, and a two-column card listing signal names and numbers.",
   "Extend: Ask fast finishers to write a one-line command that shows the PID, user, %CPU and command of the top three CPU consumers using ps -eo with --sort, and to explain each field."
  ]
 },
 {
  "t": "Adjusting process scheduling with nice and renice (range -20 to 19)",
  "objectives": [
   "Students will be able to explain how the nice value affects CPU scheduling and why it only matters under contention.",
   "Students will be able to start a command at a given nice value with nice and change a running process with renice.",
   "Students will be able to state the nice range, its direction and which changes require root.",
   "Students will be able to verify nice values using the NI column in top and ps."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a line where someone lets others go ahead. Introduce the idea that processes can do the same."
   ],
   [
    12,
    "Teach",
    "Draw the range from -20 to 19 on the whiteboard with arrows for \"more CPU\" and \"less CPU\". Demonstrate nice -n, renice -n -p and -u, top's r key, and reading NI and PR. Explain the root-only rule."
   ],
   [
    15,
    "Activity",
    "Run the \"Coffee counter\" role-play below, then a short lab with two busy loops at different nice values."
   ],
   [
    8,
    "Discuss",
    "Discuss what students saw in top and why the nice 19 job sped up once the other finished."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Have you ever let someone go ahead of you in a line because they had only one item? How might a computer decide who goes first when many programs want the processor at the same time?",
  "activity": {
   "title": "Coffee counter: role-playing the scheduler",
   "materials": "Whiteboard, sticky notes with nice values written on them (-10, 0, 0, 10, 19), a timer, optional student laptops with a lab VM.",
   "steps": [
    "Five volunteers each take a sticky note with a nice value and stand in a group as \"processes\"; one more student is the \"scheduler\" at the counter.",
    "Each round lasts five seconds; the scheduler serves volunteers according to their values, giving low nice values more turns and high values fewer, while the class tallies turns on the whiteboard.",
    "Remove the high-priority volunteers and show that the nice 19 volunteer now gets every turn, because nobody else is competing.",
    "Ask one volunteer to try to change their own note from 10 to 0 and remind the class that only root may lower a value; the teacher, acting as root, makes the change.",
    "If lab VMs are available, pairs start two busy loops, one with nice -n 19, compare %CPU and NI in top, then use renice on one and observe the change."
   ]
  },
  "discussion": [
   "Why do you think Linux lets users make their own processes nicer but not less nice?",
   "What kinds of jobs at a school or office would you run at a high nice value?",
   "Why might renicing not help a job that is slow because it reads a lot from disk?"
  ],
  "exit": [
   [
    "Which nice value gives the highest priority, and which the lowest?",
    "-20 is the highest priority; 19 is the lowest."
   ],
   [
    "Write the command to set PID 4400 to nice value 12.",
    "renice -n 12 -p 4400"
   ],
   [
    "A normal user tries renice -n -5 on their own process. What happens?",
    "It fails with a permission error, because only root can lower a nice value or set a negative one."
   ]
  ],
  "differentiation": [
   "Support: Give students a number line from -20 to 19 labeled \"more CPU\" at the left and \"less CPU\" at the right, and a three-row cheat sheet for nice, renice and ps -o pid,ni,comm.",
   "Extend: Ask fast finishers to write a script that finds every process owned by a named user with pgrep -u and renices them all to 10, reporting the old and new values for each."
  ]
 },
 {
  "t": "Managing tuning profiles with tuned-adm (active, recommend, profile)",
  "objectives": [
   "Students will be able to explain what tuned and tuning profiles do and why different workloads need different profiles.",
   "Students will be able to install, enable and start the tuned service.",
   "Students will be able to list, recommend, apply and verify tuning profiles with tuned-adm.",
   "Students will be able to diagnose why a profile is missing after a reboot."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about TV or phone modes and list examples on the board. Connect them to the idea of one setting that changes many others."
   ],
   [
    12,
    "Teach",
    "Explain tuned and what a profile can change. Walk through the command block, stressing the order: install, enable --now, recommend, profile, active. Show where profiles live and explain that tuned-adm is a client of the service."
   ],
   [
    15,
    "Activity",
    "Run the \"Match the workload\" card sort and the command-sequence relay described below."
   ],
   [
    8,
    "Discuss",
    "Review the card sort answers, then discuss the troubleshooting scenario of a profile lost after reboot."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Your phone has modes such as \"battery saver\" and \"performance\". What changes when you switch modes, and why does it matter that the phone remembers your choice?",
  "activity": {
   "title": "Match the workload, then sequence the commands",
   "materials": "Printed workload cards (a laptop running on battery, a busy database server, a VM guest, a hypervisor host, a trading system needing low latency), printed profile cards (powersave, throughput-performance, virtual-guest, virtual-host, latency-performance, balanced), printed command strips, whiteboard, optional lab VMs.",
   "steps": [
    "In groups of three, students match each workload card to the profile that best fits its goal and explain their choice in one sentence.",
    "The teacher reveals suggested matches and stresses that on a real system tuned-adm recommend decides, and that the exact list comes from tuned-adm list.",
    "Give each group shuffled command strips (dnf install -y tuned, systemctl enable --now tuned, tuned-adm recommend, tuned-adm profile NAME, tuned-adm active) and have them put them in the right order.",
    "Each group writes on the whiteboard what would go wrong if the systemctl step were skipped.",
    "If lab VMs are available, groups run the sequence, record the recommended and active profiles, reboot, and confirm the profile persisted."
   ]
  },
  "discussion": [
   "Why do you think Red Hat provides ready-made profiles rather than asking administrators to tune each setting?",
   "When might you deliberately choose a profile different from the recommended one?",
   "How would you check that a profile's settings really took effect?"
  ],
  "exit": [
   [
    "Which command shows the profile tuned recommends for this system?",
    "tuned-adm recommend"
   ],
   [
    "Write the two commands that apply the virtual-guest profile and confirm it.",
    "tuned-adm profile virtual-guest, then tuned-adm active."
   ],
   [
    "A profile is lost after reboot. What is the most likely cause and fix?",
    "The tuned service is not enabled; run systemctl enable --now tuned and reapply or confirm the profile."
   ]
  ],
  "differentiation": [
   "Support: Give students a five-step checklist card for the tuned workflow and have them tick each step as they run or describe it.",
   "Extend: Ask fast finishers to find and read the tuned.conf file of one shipped profile under /usr/lib/tuned/ and explain in plain words two settings it changes and what include= does."
  ]
 },
 {
  "t": "Locating and reading system logs: /var/log/messages, /var/log/secure, journalctl -u, -p, -b, --since",
  "objectives": [
   "Students will be able to locate general, authentication, cron and service-specific logs under /var/log.",
   "Students will be able to filter the journal by unit, priority, boot and time using journalctl -u, -p, -b, --since and --until.",
   "Students will be able to order the eight syslog priorities and explain what a -p filter includes.",
   "Students will be able to explain why previous-boot journal entries may be missing and where the text logs persist."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about investigating a failed login and collect ideas. Introduce the idea that the system already wrote down what happened."
   ],
   [
    12,
    "Teach",
    "Show the /var/log files and what each holds, then the journalctl command block. Write the priority list on the board with numbers. Explain persistence and the difference between the journal and rsyslog files."
   ],
   [
    15,
    "Activity",
    "Run the \"Log detective\" activity below with printed excerpts and filter cards."
   ],
   [
    8,
    "Discuss",
    "Groups present which command or file solved their case and why. Correct any misunderstandings about -p and /var/log/secure."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A teacher says they could not log in to a server at 9:15 this morning. If the computer kept a diary of everything, what would you want to search it for, and how would you narrow it down?",
  "activity": {
   "title": "Log detective: choose the file or filter that solves the case",
   "materials": "Printed case cards (failed SSH logins, a web service that will not start, a cron job that did not run, a kernel disk error, \"what happened before last night's reboot\"), printed fictional log excerpts from /var/log/secure, /var/log/messages and journalctl output, whiteboard, optional student laptops with a lab VM.",
   "steps": [
    "In groups of three, students draw a case card and decide which text log or journalctl command they would use first, writing the exact command on a sticky note.",
    "The teacher hands the group the matching printed log excerpt, and the group finds the one or two lines that explain the problem.",
    "Groups write a refined command that would show only those lines, using -u, -p, -b, --since or grep as appropriate.",
    "For the \"before last night's reboot\" case, groups discuss what must be true for journalctl -b -1 to work and where else they could look.",
    "If lab VMs are available, groups generate an event (for example a failed su attempt) and find it in both /var/log/secure and the journal."
   ]
  },
  "discussion": [
   "Why do you think RHEL keeps both a binary journal and plain text log files?",
   "What are the risks of a journal that is stored only in memory on a production server?",
   "When would you choose grep on a text file over journalctl filters, or the other way around?"
  ],
  "exit": [
   [
    "Which file would you check first for failed sudo attempts?",
    "/var/log/secure."
   ],
   [
    "Write a command that shows err-and-worse messages from the current boot only.",
    "journalctl -b -p err"
   ],
   [
    "List the syslog priorities from most to least severe.",
    "emerg, alert, crit, err, warning, notice, info, debug."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page map showing each /var/log file next to the kind of event it records, plus a card with the four main journalctl filters and one example each.",
   "Extend: Ask fast finishers to use journalctl -o verbose to find the field names for one sshd entry and write a field-based filter, such as _COMM=sshd combined with --since, that isolates it."
  ]
 },
 {
  "t": "Preserving the systemd journal across reboots (Storage=persistent, /var/log/journal)",
  "objectives": [
   "Students will be able to explain the difference between a volatile journal in /run/log/journal and a persistent journal in /var/log/journal.",
   "Students will be able to compare the four Storage= values (persistent, volatile, auto, none) and predict where logs go for each.",
   "Students will be able to configure persistent journaling by editing journald.conf and restarting systemd-journald.",
   "Students will be able to verify persistence using journalctl --list-boots and journalctl -b -1."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the overnight crash with no logs. Collect two or three answers and write the words memory and disk on the board."
   ],
   [
    12,
    "Teach",
    "Project /etc/systemd/journald.conf. Walk through the [Journal] section, point out that the lines are commented defaults, and explain each Storage= value. Show the restart command, the machine-ID directory and the list-boots verification."
   ],
   [
    18,
    "Activity",
    "Run the Storage scenario card sort in pairs (see activity). Circulate and ask each pair to justify one prediction aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect persistence to troubleshooting and disk usage limits."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "A server crashed at 3 a.m. and rebooted itself. You run journalctl -b -1 and see nothing about the previous boot. Where do you think those log messages went, and why?",
  "activity": {
   "title": "Where do the logs go? Scenario card sort",
   "materials": "Printed scenario cards (8 to 10), whiteboard, markers, a projector showing a sample journald.conf and a sample journalctl --list-boots output.",
   "steps": [
    "Prepare cards that each describe a configuration, for example: Storage=auto and /var/log/journal missing; Storage=auto and the directory exists; Storage=persistent but journald not restarted; a commented #Storage=persistent line; a drop-in setting Storage=volatile; Storage=none with rsyslog running.",
    "Pairs sort each card into one of three columns on their desk: logs survive reboot, logs lost at reboot, or not yet in effect.",
    "For each card, pairs write the one command or edit that would fix it so logs survive a reboot.",
    "Project a list-boots output with one boot and another with four boots; pairs decide which systems from their cards could have produced each.",
    "Review the answers as a class, highlighting the auto versus persistent distinction and the need to restart journald."
   ]
  },
  "discussion": [
   "Why might a distribution choose not to keep the journal on disk by default, and what is the trade-off?",
   "If a persistent journal is limited in size, how would you decide how much history to keep on a busy server?",
   "How would you prove to a grader, without explaining in words, that the journal is persistent?"
  ],
  "exit": [
   [
    "Which directory holds a persistent journal, and which holds a volatile one?",
    "Persistent: /var/log/journal. Volatile: /run/log/journal."
   ],
   [
    "What command must you run after setting Storage=persistent?",
    "systemctl restart systemd-journald (or reboot)."
   ],
   [
    "What output proves the journal survived a reboot?",
    "journalctl --list-boots shows more than one boot, and journalctl -b -1 shows the previous boot's messages."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page flow chart: edit journald.conf, remove the #, set persistent, restart journald, check /var/log/journal, reboot, run list-boots. Let them check off each step during the activity.",
   "Extend: Ask fast finishers to write a drop-in file in /etc/systemd/journald.conf.d/ that sets Storage=persistent and a SystemMaxUse= limit, and to explain why a drop-in can be safer than editing the main file."
  ]
 },
 {
  "t": "Starting, stopping and checking network services (systemctl status, ss -tlnp)",
  "objectives": [
   "Students will be able to distinguish starting and stopping a service from enabling and disabling it at boot.",
   "Students will be able to interpret the Loaded and Active lines of systemctl status output.",
   "Students will be able to read ss -tlnp output and determine which addresses and ports a service listens on.",
   "Students will be able to apply a verification routine (is-enabled, is-active, ss) to prove a service task is complete."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the library web page that died after a reboot. List student guesses on the board under running, starting at boot and reachable."
   ],
   [
    12,
    "Teach",
    "Draw a two-by-two grid: running or stopped across, enabled or disabled down. Place example services in each cell. Show enable --now, mask, and a projected systemctl status output, then explain each ss -tlnp letter and the Local Address column."
   ],
   [
    18,
    "Activity",
    "Pairs work through the status and ss detective cards (see activity), writing a diagnosis and the fixing command for each."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the layers: systemd, socket, firewall, SELinux."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A web server worked on Friday, the machine rebooted over the weekend, and on Monday it is unreachable. List every reason you can think of, from most to least likely.",
  "activity": {
   "title": "Service detective: reading status and ss output",
   "materials": "Printed cards with excerpts of systemctl status output and ss -tlnp output (teacher-made), whiteboard, markers; optionally student laptops with a browser-based Linux terminal.",
   "steps": [
    "Give each pair six cards. Each card shows a short status excerpt and an ss excerpt, for example: active but disabled; enabled but inactive (dead); active and listening only on 127.0.0.1; failed with a config syntax error in the log lines; masked; active and listening on *:80.",
    "For each card, pairs answer three questions: is it running now, will it run after reboot, can a remote client reach it?",
    "Pairs write the exact command or check that would fix or further diagnose each case.",
    "Two pairs swap cards and check each other's answers, marking disagreements.",
    "The teacher reviews disagreements on the board and highlights the difference between running and reachable."
   ]
  },
  "discussion": [
   "Why does systemd keep start and enable as separate actions instead of combining them always?",
   "When would you choose mask over disable for a service you do not want running?",
   "If ss shows the right port listening, what else could stop a client from connecting?"
  ],
  "exit": [
   [
    "Which single command starts httpd now and makes it start at boot?",
    "systemctl enable --now httpd."
   ],
   [
    "In systemctl status output, which line tells you whether the service starts at boot?",
    "The Loaded line, which shows enabled or disabled."
   ],
   [
    "What does ss -tlnp show, and what does 0.0.0.0:22 mean?",
    "Listening TCP sockets with numeric ports and owning processes; 0.0.0.0:22 means listening on port 22 on all IPv4 addresses."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of a systemctl status output and an ss line, with each field annotated, and let students use it during the card activity.",
   "Extend: Ask fast finishers to write a short script that uses systemctl is-active and is-enabled exit statuses to report on a list of services, and explain why exit statuses are better than parsing text."
  ]
 },
 {
  "t": "Securely transferring files between systems with scp, sftp and rsync over ssh",
  "objectives": [
   "Students will be able to write scp commands that copy files and directories to and from a remote host using user@host:path syntax.",
   "Students will be able to use basic sftp commands and distinguish remote commands from local ones (cd versus lcd).",
   "Students will be able to explain how rsync transfers only differences and predict the effect of a trailing slash on the source.",
   "Students will be able to choose between scp, sftp and rsync for a given transfer scenario and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the interrupted 40 GB copy. Collect ideas and note which ones would need a separate, unencrypted service."
   ],
   [
    12,
    "Teach",
    "Show scp syntax on the board with arrows from source to destination. Demonstrate sftp prompt commands, highlighting the l prefix for local. Explain rsync's compare-then-send idea, the -a, -X, -A, --delete and -n options, and draw the trailing slash difference as two directory trees."
   ],
   [
    18,
    "Activity",
    "Pairs complete the tool-choice and command-writing card challenge (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on --delete safety and the scp -P trap."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You have to copy a large directory to another server every night over an untrusted network. What would make a tool good for this job?",
  "activity": {
   "title": "Pick the tool, write the command",
   "materials": "Printed scenario cards (8), whiteboard, markers, projector; optionally student laptops with a browser-based Linux terminal for testing local rsync between two directories.",
   "steps": [
    "Hand each pair eight scenario cards, for example: copy one config file to serverb; browse a remote log directory before downloading; mirror /srv/web nightly; copy over SSH port 2200; preserve SELinux contexts in a backup.",
    "For each card, pairs choose scp, sftp or rsync and write the exact command.",
    "For the rsync cards, pairs draw the resulting destination directory tree with and without a trailing slash on the source.",
    "If laptops are available, pairs test the trailing slash behavior locally with rsync -av dir1/ dir2/ and rsync -av dir1 dir2/ and compare results.",
    "Pairs present one card each; the class corrects any option mistakes, especially -p versus -P."
   ]
  },
  "discussion": [
   "Why is it an advantage that all three tools reuse SSH instead of running their own service?",
   "What could go wrong if you run rsync --delete with the source and destination swapped, and how do you protect yourself?",
   "When would sftp be the better choice even though rsync is more efficient?"
  ],
  "exit": [
   [
    "Write an scp command to copy the local directory /etc/httpd to /tmp on serverb as root.",
    "scp -r /etc/httpd root@serverb:/tmp/"
   ],
   [
    "Where does index.html from /srv/web end up with rsync -a /srv/web host:/backup/web/ ?",
    "At /backup/web/web/index.html, because without a trailing slash on the source rsync copies the directory itself. With /srv/web/ it would land at /backup/web/index.html."
   ],
   [
    "Which sftp command uploads a file, and which downloads one?",
    "put uploads; get downloads."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card showing source-to-destination order for scp and rsync with a remote path highlighted, plus a two-column table of sftp remote and local commands.",
   "Extend: Ask fast finishers to design a nightly backup with rsync that preserves ACLs and SELinux contexts, uses key-based login, and explain how they would test it safely before enabling --delete."
  ]
 },
 {
  "t": "Listing disks and partitions with lsblk, blkid and fdisk -l",
  "objectives": [
   "Students will be able to identify Linux block device names for SATA, virtio and NVMe disks and their partitions.",
   "Students will be able to use lsblk, blkid and fdisk -l to determine which disk is unused, its partition table type and its file system signatures.",
   "Students will be able to retrieve a file system UUID for use in /etc/fstab.",
   "Students will be able to apply a before-and-after lsblk check to any storage change."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about choosing the right disk. Ask what would happen if they guessed wrong."
   ],
   [
    12,
    "Teach",
    "Write device naming rules on the board (sda, vda, nvme0n1p1). Project sample lsblk, lsblk -f, blkid and fdisk -l outputs from the same system and trace one disk through all four, pointing out the Disklabel type and LVM2_member."
   ],
   [
    18,
    "Activity",
    "Groups solve the which-disk puzzle using printed outputs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce the read-only, look-first habit."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You are about to erase a disk and you have three to choose from. What information would you want before you press Enter?",
  "activity": {
   "title": "Which disk is safe? Output puzzle",
   "materials": "Printed packets with lsblk, lsblk -f, blkid and fdisk -l output from a fictional server with four disks (teacher-made), highlighters, whiteboard.",
   "steps": [
    "Give each group a packet describing a server with four disks: one system disk, one LVM physical volume, one with an XFS partition mounted at /data, and one completely empty.",
    "Groups highlight the evidence for each disk's use in each output, using a different color per disk.",
    "Groups answer task cards: which disk can take a new partition table, which partition's UUID goes into fstab for /data, which disk uses MBR, and which partition is an LVM physical volume.",
    "Groups write the exact command they would run to confirm each answer on a live system.",
    "The teacher reveals the answers and discusses any disk that was misidentified and why."
   ]
  },
  "discussion": [
   "Why are listing commands worth running even when the task tells you the disk name?",
   "Why can device names change between boots, and what does that mean for configuration files?",
   "Which single command would you trust most if you could run only one, and why?"
  ],
  "exit": [
   [
    "What is the device name of the first partition on the NVMe disk nvme0n1?",
    "/dev/nvme0n1p1."
   ],
   [
    "Which command shows the UUID and file system type of /dev/vdb1?",
    "blkid /dev/vdb1 (or lsblk -f /dev/vdb1)."
   ],
   [
    "In fdisk -l output, what does Disklabel type: dos tell you?",
    "The disk uses the older MBR partition scheme rather than GPT."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page cheat sheet mapping each question (what disks, what partitions, what file system, what UUID, where mounted) to the command that answers it, and pair students with a partner who reads outputs aloud.",
   "Extend: Ask fast finishers to use lsblk -o with custom columns (for example NAME,SIZE,FSTYPE,UUID,MOUNTPOINTS) to build a one-line inventory command and explain each column."
  ]
 },
 {
  "t": "Creating and deleting GPT partitions with parted, gdisk or fdisk; setting the partition type (lvm, swap)",
  "objectives": [
   "Students will be able to compare MBR and GPT partition tables and identify which a disk uses.",
   "Students will be able to create, type and delete partitions using fdisk, gdisk or parted, including the +SIZE shortcut.",
   "Students will be able to set partition types for LVM and swap using fdisk aliases, gdisk codes or parted flags.",
   "Students will be able to explain when changes are written in each tool and which commands destroy existing partitions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about dividing a drawer, then reveal Tomas's q-instead-of-w mistake and ask what was saved."
   ],
   [
    12,
    "Teach",
    "Contrast MBR and GPT on the board. Walk through an fdisk session line by line, then show the equivalent parted one-liners and the gdisk codes 8300, 8e00 and 8200. Stress write timing and the destructive label commands."
   ],
   [
    18,
    "Activity",
    "Pairs do the keystroke script exercise (see activity), then test it in a browser-based Linux environment if available."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to cover tool choice and safety."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you had to split one large storage area into sections for different uses, what information would you need to record about each section?",
  "activity": {
   "title": "Write the keystroke script",
   "materials": "Printed task cards and blank keystroke script sheets, a projector showing a sample fdisk session, whiteboard; optionally student laptops with a browser-based Linux virtual machine that has a spare disk image.",
   "steps": [
    "Give each pair three task cards: create a 1 GiB LVM partition on an empty disk with fdisk; add a 512 MiB swap partition to a disk that already has data, using gdisk; create a GPT label and a 2 GiB partition flagged lvm with parted one-liners.",
    "Pairs write every keystroke or command in order on the script sheet, including answers to prompts.",
    "Pairs swap scripts with another pair, who mark any step that would lose data or fail to save.",
    "If laptops are available, pairs run one script against a spare loop or virtual disk and confirm with lsblk and fdisk -l.",
    "The teacher reviews the most common errors, such as using g on a disk with data or forgetting w."
   ]
  },
  "discussion": [
   "Why might you prefer parted one-liners in a script but fdisk at an interactive prompt?",
   "If the kernel ignores partition types, why do administrators and graders still care about them?",
   "What checks would you run before deleting a partition on a production server?"
  ],
  "exit": [
   [
    "Which gdisk type codes mean Linux LVM and Linux swap?",
    "8e00 for Linux LVM and 8200 for Linux swap."
   ],
   [
    "You created two partitions in fdisk and typed q. What is on the disk?",
    "Nothing changed; q quits without writing. The changes are lost."
   ],
   [
    "Which commands create a new partition table and so would wipe existing partitions?",
    "fdisk g or o, gdisk o, and parted mklabel."
   ]
  ],
  "differentiation": [
   "Support: Give students a laminated fdisk prompt guide showing each prompt and the expected answer for a typical task, and let them pair with a partner who reads prompts aloud.",
   "Extend: Ask fast finishers to write a single non-interactive parted command line (using -s) that creates a GPT label and two typed partitions, and explain the alignment choice for the start positions."
  ]
 },
 {
  "t": "Creating and removing physical volumes (pvcreate, pvremove, pvs)",
  "objectives": [
   "Students will be able to describe the three layers of LVM and where physical volumes fit.",
   "Students will be able to create physical volumes with pvcreate after verifying the target device is unused.",
   "Students will be able to interpret pvs and pvdisplay output, including the VG, PSize and PFree columns.",
   "Students will be able to sequence the steps required to remove a PV that belongs to a volume group."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about pooling storage. Sketch three jugs pouring into one tank and bottles being filled from it."
   ],
   [
    12,
    "Teach",
    "Draw the LVM stack (PV, VG, LV, file system) on the board. Demonstrate pvcreate, pvs and pvdisplay with projected output, pointing out the empty VG column. Explain pvremove's restriction and the vgreduce and pvmove path."
   ],
   [
    18,
    "Activity",
    "Groups do the build-up and tear-down sequencing card sort (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce safety and ordering."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Imagine you have three small disks and need one large storage area that can grow later. How could software make three disks act like one?",
  "activity": {
   "title": "LVM build-up and tear-down card sort",
   "materials": "Printed command cards (one command per card: fdisk, pvcreate, vgcreate, lvcreate, mkfs, mount, fstab edit, umount, lvremove, vgreduce, pvmove, vgremove, pvremove, partition delete), printed pvs output scenarios, whiteboard.",
   "steps": [
    "Give each group the full deck of command cards.",
    "Groups first lay out the cards in the correct order to build a mounted LVM file system from an empty disk.",
    "Groups then lay out the correct order to completely remove it and reclaim the disk.",
    "Hand out three pvs output scenarios (for example, a PV with allocated extents in a VG with free space elsewhere); groups decide which cards are needed to free that PV and in what order.",
    "The teacher checks each layout and discusses where pvmove is required and where it is not."
   ]
  },
  "discussion": [
   "Why does pvcreate warn before wiping an existing signature, and what should you do when you see that warning?",
   "What are the advantages of LVM over plain partitions for a server that keeps growing?",
   "Why is no configuration file needed for a physical volume to survive a reboot?"
  ],
  "exit": [
   [
    "Which command initializes /dev/vdb1 and /dev/vdc1 as physical volumes?",
    "pvcreate /dev/vdb1 /dev/vdc1."
   ],
   [
    "In pvs output, how can you tell a PV is not yet in a volume group?",
    "The VG column is empty and PFree equals PSize."
   ],
   [
    "A PV in a VG holds data. List the commands to free it, in order.",
    "pvmove DEVICE (if other PVs have room), vgreduce VG DEVICE, then pvremove DEVICE."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the LVM stack with the create and remove command for each layer written beside it, and a sample pvs output with each column annotated.",
   "Extend: Ask fast finishers to explain what pvmove needs in order to succeed and to design a plan for replacing an aging disk in a VG with a new one without unmounting the file systems."
  ]
 },
 {
  "t": "Creating volume groups and assigning physical volumes (vgcreate -s, vgextend, vgs)",
  "objectives": [
   "Students will be able to create a volume group from one or more physical volumes, with a specified extent size.",
   "Students will be able to calculate logical volume sizes from extent counts and a VG's extent size.",
   "Students will be able to read vgs and vgdisplay output to find VSize, VFree, PE Size and Free PE.",
   "Students will be able to extend a volume group with vgextend and explain the conditions for vgreduce."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about scoop sizes. Have students compute 40 scoops at 4 MiB and at 16 MiB."
   ],
   [
    12,
    "Teach",
    "Show vgcreate with and without -s on the board, then project vgs and vgdisplay output and circle PE Size, Total PE and Free PE. Explain the device path naming, vgextend, vgreduce and vgremove."
   ],
   [
    18,
    "Activity",
    "Pairs complete the extent arithmetic relay and vgdisplay reading challenge (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect extent size to exam task wording."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A store sells rice only in whole scoops. If each scoop is 4 units, how many units are 40 scoops? What if each scoop is 16 units? Why does the store's scoop choice matter to customers?",
  "activity": {
   "title": "Extent arithmetic relay",
   "materials": "Printed vgdisplay excerpts with different PE sizes and free extents (teacher-made), task cards, whiteboard divided into team columns, markers.",
   "steps": [
    "Split the class into teams of three. Give each team a stack of task cards, for example: VG with 8 MiB extents, LV of 25 extents, what size; VG with 1000 free extents at 4 MiB, can it hold a 3 GiB LV.",
    "One student solves a card, the next checks the arithmetic, the third writes the vgcreate or lvcreate command on the board, then roles rotate.",
    "Hand out vgdisplay excerpts; teams find PE Size and Free PE and decide whether each requested LV fits, and if not, write the vgextend command that would fix it.",
    "Teams finish by writing a complete command sequence for a task that specifies a VG name, extent size and two PVs.",
    "The teacher checks each team's board column and corrects any unit errors."
   ]
  },
  "discussion": [
   "Why would an administrator choose a larger extent size, and what is lost by doing so?",
   "Why must the VG name be typed exactly, and where else does it appear later?",
   "What is the safest order of operations when retiring a disk from a volume group?"
  ],
  "exit": [
   [
    "Write the command to create VG labvg with 16 MiB extents on /dev/vdb1.",
    "vgcreate -s 16M labvg /dev/vdb1."
   ],
   [
    "A VG has 8 MiB extents. How large is an LV of 30 extents?",
    "240 MiB (30 x 8 MiB)."
   ],
   [
    "Which vgdisplay lines tell you the extent size and how many extents are free?",
    "PE Size and Free PE / Size."
   ]
  ],
  "differentiation": [
   "Support: Provide a multiplication table for common extent sizes (4, 8, 16, 32 MiB) against common extent counts, and a vgdisplay sample with the key lines highlighted.",
   "Extend: Ask fast finishers to work out the largest LV possible in a VG built from two PVs of different sizes and to explain how vgs -o with custom fields could report free extents directly."
  ]
 },
 {
  "t": "Creating and deleting logical volumes by size (-L) or extent count (-l) (lvcreate, lvremove, lvs)",
  "objectives": [
   "Students will be able to create logical volumes using -L with units, -l with extent counts, and -l with percentages.",
   "Students will be able to calculate an LV's real size from its extent count and the VG's extent size.",
   "Students will be able to verify an LV's name, size and extent count with lvs and lvdisplay.",
   "Students will be able to remove a logical volume safely, including unmounting and cleaning up /etc/fstab."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Share Kofi's -L 60 story and ask students to guess what went wrong before revealing the case difference."
   ],
   [
    12,
    "Teach",
    "Write -L and -l side by side on the board with examples. Work three extent calculations aloud. Project lvdisplay output and circle LV Size and Current LE. Walk through the safe lvremove sequence."
   ],
   [
    18,
    "Activity",
    "Pairs complete the task-to-command translation challenge (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce reading task wording carefully."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A task says: create a logical volume of 60 extents. A student types lvcreate -n logs -L 60 sysvg. Will the result be correct? What would you check to find out?",
  "activity": {
   "title": "Translate the task into lvcreate",
   "materials": "Printed exam-style task cards with VG details (name, PE Size, Free PE), blank answer sheets, projector, whiteboard; optionally student laptops with a browser-based Linux lab.",
   "steps": [
    "Give each pair ten task cards mixing size wording: 512 MiB, 30 extents, all remaining space, half the VG, 1.5 GiB in a VG with 32 MiB extents.",
    "Pairs write the exact lvcreate command for each and the expected size in MiB.",
    "For two cards, pairs also write the full sequence to format, mount and persist the LV.",
    "Pairs then receive a removal card describing a mounted LV with an fstab entry and write the safe removal steps in order.",
    "The teacher projects answers; pairs score themselves and discuss any rounding cases, such as a size that is not a multiple of the extent size."
   ]
  },
  "discussion": [
   "Why might a task specify a size in extents rather than in MiB or GiB?",
   "What happens when a requested -L size is not an exact multiple of the extent size, and why does LVM round up rather than down?",
   "What could go wrong at the next boot if you remove an LV but leave its fstab line?"
  ],
  "exit": [
   [
    "Write a command to create an LV named data of 40 extents in VG vg1.",
    "lvcreate -n data -l 40 vg1."
   ],
   [
    "VG vg1 has 32 MiB extents. How big is that LV?",
    "1280 MiB (40 x 32 MiB), which is 1.25 GiB."
   ],
   [
    "List the steps before running lvremove on a mounted LV used in fstab.",
    "Unmount it (or swapoff), remove or comment its /etc/fstab line, then run lvremove and confirm the name."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with -L and -l examples, a multiplication grid for extent sizes, and the verification commands (lvs, lvdisplay, lsblk) with what to look for in each.",
   "Extend: Ask fast finishers to explain how -l 50%FREE behaves when run twice in a row on the same VG, and to predict the sizes of both resulting LVs."
  ]
 },
 {
  "t": "Mounting file systems at boot by UUID or label in /etc/fstab",
  "objectives": [
   "Students will be able to identify and explain the six fields of an /etc/fstab entry.",
   "Students will be able to explain why UUIDs, labels or LVM paths are preferred over kernel device names.",
   "Students will be able to write a correct fstab entry for an XFS or ext4 file system using its UUID.",
   "Students will be able to test fstab changes safely with systemctl daemon-reload, mount -a and findmnt --verify."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about delivery addresses. Connect it to device names that shift when disks are added."
   ],
   [
    12,
    "Teach",
    "Project a sample fstab. Label each of the six fields with the mnemonic Dogs May Track Our Dirty Paws. Show blkid output, how to copy the UUID, and the test sequence: daemon-reload, mount -a, findmnt --verify."
   ],
   [
    18,
    "Activity",
    "Groups do the broken fstab hunt (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about safety and labels."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you told a courier to deliver to 'the third house on the left', what could go wrong over time? How is a street address better?",
  "activity": {
   "title": "Broken fstab hunt",
   "materials": "Printed fstab files (teacher-made) each containing three to four planted errors, matching blkid output sheets, red pens, whiteboard.",
   "steps": [
    "Give each group a printed fstab and blkid output. Planted errors include a mistyped UUID, a space inside the options field, an XFS entry with fsck order 2, a missing field, a /dev/sdb1 device name and a mount point that does not exist.",
    "Groups circle each problem and classify it: would it fail at boot, mount the wrong thing, or only be poor practice?",
    "Groups rewrite each bad line correctly using the blkid output.",
    "Groups write the exact commands they would run to test the corrected file without rebooting.",
    "Groups swap papers to check another group's corrections, then the teacher reviews the full answer key."
   ]
  },
  "discussion": [
   "When is a label a better choice than a UUID, and when is it riskier?",
   "Why is the nofail option useful for a USB backup drive but dangerous as a habit?",
   "What would you do first if a server stopped in emergency mode after you edited fstab?"
  ],
  "exit": [
   [
    "Name the six fstab fields in order.",
    "Device, mount point, file system type, options, dump, fsck order (pass)."
   ],
   [
    "Write an fstab line for an XFS file system with UUID abc-123 mounted at /data.",
    "UUID=abc-123 /data xfs defaults 0 0"
   ],
   [
    "Which two commands test new fstab entries before a reboot?",
    "mount -a (after systemctl daemon-reload) and findmnt --verify."
   ]
  ],
  "differentiation": [
   "Support: Give students a fill-in-the-blank fstab template with each field labeled, plus a sample blkid line showing which part to copy.",
   "Extend: Ask fast finishers to research and explain what systemd does with each fstab line (mount units) and how the x-systemd.automount option changes when a file system is mounted."
  ]
 },
 {
  "t": "Adding new partitions, logical volumes and swap without destroying existing data",
  "objectives": [
   "Students will be able to survey a system's existing storage and identify safe free space using lsblk, parted print free, pvs, vgs and swapon --show.",
   "Students will be able to add a partition, logical volume or swap area using only free space, without disturbing existing data.",
   "Students will be able to identify the commands that destroy existing data (new partition table, pvcreate, mkfs, > on fstab).",
   "Students will be able to verify both the new storage and the preserved data before and after a reboot."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about adding a shelf to a full bookcase. Collect rules students would follow."
   ],
   [
    10,
    "Teach",
    "Project before-and-after lsblk outputs. Walk through the survey commands, then the three add paths (partition, LV, swap). List the destructive commands in red on the board."
   ],
   [
    20,
    "Activity",
    "Pairs do the safe or destructive change review (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to build a personal safety checklist."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You need to add a shelf to a bookcase that is half full of valuable books. What rules would you follow so no books are damaged?",
  "activity": {
   "title": "Safe or destructive? Change plan review",
   "materials": "Printed system snapshots (lsblk, vgs, swapon --show output) and printed change plans written by a fictional junior admin (teacher-made), green and red markers, whiteboard.",
   "steps": [
    "Give each pair three system snapshots, each with a change plan of five to seven commands. Some plans contain a destructive step, such as fdisk g on a disk with a mounted partition, pvcreate on a device already in a VG, mkfs on the wrong partition, or echo with a single > into fstab.",
    "Pairs mark each command green (safe) or red (destructive or wrong) and write why.",
    "Pairs rewrite each plan so it achieves the goal safely, including the verification commands at the end.",
    "Each pair presents one corrected plan; the class checks it against the snapshot.",
    "The class builds a shared before-you-press-Enter checklist on the whiteboard."
   ]
  },
  "discussion": [
   "Which destructive mistake do you think is easiest to make under time pressure, and how would you guard against it?",
   "Why is comparing a before and after survey such a strong proof that nothing was lost?",
   "When might you choose an LVM volume over a new partition for added storage on a disk in use?"
  ],
  "exit": [
   [
    "Name two commands that would destroy existing data if run on the wrong device.",
    "Any two of: fdisk g or o (new table), parted mklabel, pvcreate, mkfs."
   ],
   [
    "How do you add a fstab line from the shell without wiping the file?",
    "Use >> to append (or edit with an editor), never a single >."
   ],
   [
    "After adding swap, which two commands confirm the total increased and both areas are active?",
    "free -h and swapon --show."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed survey checklist (lsblk, lsblk -f, parted print free, pvs, vgs, swapon --show) with a box to write what each shows, to complete before any change.",
   "Extend: Ask fast finishers to plan adding swap on a new LV and a file system on a new partition in a single session, ordering the steps to minimize risk, and explain how they would recover if the kernel does not reread the partition table."
  ]
 },
 {
  "t": "Creating and enabling swap (mkswap, swapon, swapon --show) and making it persistent",
  "objectives": [
   "Students will be able to explain what swap is, when the kernel uses it and why it is not a substitute for RAM.",
   "Students will be able to create swap on a partition or logical volume using mkswap and swapon.",
   "Students will be able to write a correct /etc/fstab swap entry using a UUID or LVM path.",
   "Students will be able to verify active swap and test persistence with swapoff, swapon -a, swapon --show and free -h."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the overflowing closet and the garage. Ask what the trade-off is."
   ],
   [
    12,
    "Teach",
    "Draw RAM and swap as two boxes with pages moving between them. Walk through create space, mkswap, swapon, fstab line and test, projecting example output of mkswap, swapon --show and free -h. Emphasize the swapoff then swapon -a test."
   ],
   [
    18,
    "Activity",
    "Pairs complete the swap task relay with printed outputs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about persistence and safety."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your closet is full, so you put rarely used coats in a box in the garage. What do you gain, what do you lose, and what would make that arrangement last after you move house?",
  "activity": {
   "title": "Swap task relay",
   "materials": "Printed task cards, printed command output snippets (mkswap, swapon --show, free -h, lsblk) before and after changes, blank fstab line strips, whiteboard; optionally student laptops with a browser-based Linux lab.",
   "steps": [
    "Give each pair a task card such as: add 512 MiB swap on partition /dev/vdb2, or add a 1 GiB swap LV in vg01.",
    "Partner A writes the commands to create and activate the swap; partner B writes the fstab line on a strip using the UUID from a printed mkswap output.",
    "Pairs swap roles for a second task card and repeat.",
    "Hand out before-and-after free -h and swapon --show snippets; pairs decide whether each task was completed and persistent, and explain any failures (missing mkswap, wrong fstab field, area never tested with swapon -a).",
    "The teacher reviews one fstab strip from each pair on the board and corrects field errors."
   ]
  },
  "discussion": [
   "If a server uses a lot of swap every day, what does that tell you, and is adding more swap the right fix?",
   "Why does turning swap off before running swapon -a give stronger proof than just running swapon -a?",
   "What would happen at boot if the swap UUID in fstab had a typo?"
  ],
  "exit": [
   [
    "List the commands to turn /dev/vdb2 into active swap.",
    "mkswap /dev/vdb2, then swapon /dev/vdb2."
   ],
   [
    "Write the fstab line for swap with UUID 1a2b-3c4d.",
    "UUID=1a2b-3c4d none swap defaults 0 0"
   ],
   [
    "How do you prove the fstab swap line works without rebooting?",
    "swapoff the device, run swapon -a, then confirm it appears in swapon --show (or free -h)."
   ]
  ],
  "differentiation": [
   "Support: Provide a four-step checklist card (create, mkswap, swapon, fstab and test) with an example command and expected output for each step.",
   "Extend: Ask fast finishers to set up two swap areas with different pri= values, predict which the kernel uses first, and explain how swapon --show displays it."
  ]
 },
 {
  "t": "Creating vfat, ext4 and xfs file systems (mkfs.vfat, mkfs.ext4, mkfs.xfs)",
  "objectives": [
   "Students will be able to create XFS, ext4 and vfat file systems with mkfs.xfs, mkfs.ext4 and mkfs.vfat, including labels.",
   "Students will be able to compare XFS, ext4 and vfat in terms of resizing, ownership support and typical use.",
   "Students will be able to verify a new file system's type, label and UUID with lsblk -f and blkid.",
   "Students will be able to choose the correct file system type from the wording of an exam-style task."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question on the projector and collect three or four answers aloud. Write the words layout, owner and free space on the board as the jobs a file system does."
   ],
   [
    12,
    "Teach",
    "Walk through the three mkfs helpers, their packages and the -L versus -n label options. Project sample output from mkfs.xfs, mkfs.ext4, lsblk -f and blkid and point out where the type, label and UUID appear. Stress the grow and shrink differences and the vfat permission limitation."
   ],
   [
    18,
    "Activity",
    "Run the Pick the File System card activity. Circulate, challenge each pair to justify the type and the exact command, and note common errors to raise in discussion."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions. Ask pairs who chose differently on the same card to explain their reasoning."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "You just plugged a brand-new, completely blank disk into a server. Why can't you simply copy files onto it yet, and what is missing?",
  "activity": {
   "title": "Pick the File System",
   "materials": "Printed scenario cards (one task per card), whiteboard, markers, optional student laptops with a browser for a free online Linux terminal emulator.",
   "steps": [
    "Prepare eight cards, each with a short task, such as a USB stick shared with a Windows laptop, a database volume that will only grow, a log volume that may be shrunk next quarter, or a device that must carry the label BACKUP.",
    "In pairs, students write the file system type and the exact mkfs command, including any label option, on the back of each card.",
    "For each card, pairs also write one verification command and what output would prove success, for example the FSTYPE and LABEL columns of lsblk -f.",
    "Pairs swap cards with another pair and mark them, flagging any wrong label option or type choice.",
    "The teacher reviews two or three disputed cards on the whiteboard, asking the class to settle each one using the rules from the lesson."
   ]
  },
  "discussion": [
   "Why might Red Hat choose a file system that cannot shrink as its default, and when would that choice bother you?",
   "What habits would protect you from formatting the wrong disk on a busy server with several identical drives?"
  ],
  "exit": [
   [
    "What command creates an ext4 file system labeled logs on /dev/vdb1?",
    "mkfs.ext4 -L logs /dev/vdb1"
   ],
   [
    "Which of XFS, ext4 and vfat cannot be shrunk?",
    "XFS. It can only grow; ext4 can shrink while unmounted."
   ],
   [
    "How do you confirm the type and UUID of a new file system?",
    "Run lsblk -f or blkid on the device and read the TYPE or FSTYPE and UUID values."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference table listing each file system, its mkfs helper, its label option, and whether it can grow, shrink or store permissions, and let them use it during the card activity.",
   "Extend: Ask fast finishers to explain how they would give the group webteam write access to a vfat partition mounted at /mnt/usb, including the exact mount options they would use and why chmod would not help."
  ]
 },
 {
  "t": "Mounting, unmounting and using file systems; mount -a and findmnt --verify",
  "objectives": [
   "Students will be able to mount and unmount a file system manually using a device path, UUID or label, with mount options.",
   "Students will be able to diagnose and resolve a target is busy error using cd, lsof or fuser.",
   "Students will be able to test /etc/fstab changes safely with systemctl daemon-reload, mount -a and findmnt --verify.",
   "Students will be able to explain why a bad fstab line can lead to emergency mode and how to recover."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take answers. Draw the single Linux tree on the board and show a disk being attached under /data."
   ],
   [
    12,
    "Teach",
    "Demonstrate or project mount, findmnt, df -h and umount. Show the target is busy error and how lsof and fuser find the cause. Then show a deliberately broken fstab line and run findmnt --verify to reveal it."
   ],
   [
    18,
    "Activity",
    "Run the Will It Boot activity with printed fstab excerpts and command outputs. Pairs decide whether the system would boot cleanly and what to fix."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions, connecting the activity to the exam's reboot-before-grading practice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "On Windows a new disk often appears as a new drive letter. Where do you think a new disk shows up on Linux, and how would you decide where to put it?",
  "activity": {
   "title": "Will It Boot",
   "materials": "Printed handouts with six short /etc/fstab excerpts and matching findmnt --verify or mount -a outputs, highlighters, whiteboard.",
   "steps": [
    "Give each pair the handout. Each excerpt contains zero or one problem, such as a missing mount point, a misspelled type, a stale UUID, or a space inside the options field.",
    "Pairs highlight the problem, predict whether boot would reach emergency mode, and write the exact fix and the test command they would run next.",
    "Pairs then read the provided findmnt --verify output for each excerpt and check whether their prediction matched.",
    "The teacher asks three pairs to present one excerpt each on the whiteboard, including how they would recover if the system had already rebooted into emergency mode."
   ]
  },
  "discussion": [
   "Why is it risky to rely only on mount -a when checking fstab changes?",
   "When, if ever, would a lazy unmount be acceptable, and what would you check afterward?"
  ],
  "exit": [
   [
    "What two commands should you run after editing /etc/fstab and before rebooting, besides daemon-reload?",
    "mount -a and findmnt --verify."
   ],
   [
    "What is the most common reason umount reports target is busy?",
    "A process, often your own shell, has a file open or its working directory inside the mount point."
   ],
   [
    "After mounting a file system on /data, where do the owner and mode shown for /data come from?",
    "From the root directory of the mounted file system, not the original empty directory."
   ]
  ],
  "differentiation": [
   "Support: Provide a step card listing the safe fstab workflow in order (get UUID, mkdir, edit fstab, daemon-reload, mount -a, findmnt --verify, findmnt path) and let students tick each step while working through the handout.",
   "Extend: Ask fast finishers to write the recovery steps from an emergency mode prompt, including how to make the root file system writable and how to confirm the fix before rebooting again."
  ]
 },
 {
  "t": "/etc/fstab fields: device, mount point, type, options, dump, fsck order",
  "objectives": [
   "Students will be able to name the six /etc/fstab fields in order and explain each one.",
   "Students will be able to write a correct fstab line for XFS, ext4, swap and NFS sources using stable device identifiers.",
   "Students will be able to choose correct dump and fsck values for different file system types.",
   "Students will be able to identify syntax and logic errors in an existing fstab file."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Write the six field names across the top of the board as columns."
   ],
   [
    12,
    "Teach",
    "Project the sample fstab and walk across each field, explaining stable device names, defaults and common options, and the dump and fsck values. Introduce the mnemonic and the blkid append trick."
   ],
   [
    18,
    "Activity",
    "Run the fstab Line Builder card sort. Groups assemble six-field lines from cards, then audit a broken file."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and revisit any card choices that split the class."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If the computer had to read one line of text to know how to attach a disk at startup, what pieces of information would that line need?",
  "activity": {
   "title": "fstab Line Builder",
   "materials": "Printed cards in six colors (one color per field) with sample values, sticky tack or tape, whiteboard, a printed broken fstab file per group.",
   "steps": [
    "Give each group a shuffled pile of field cards, for example UUID=..., LABEL=logs, server1:/export/home, /data, none, xfs, swap, nfs, defaults,_netdev, defaults,noexec, 0, 1 and 2.",
    "Read out four requirements one at a time (an XFS data volume, an ext4 log volume, a swap LV and an NFS share). Groups build each line on their desk in correct field order.",
    "Groups tape their finished lines on the whiteboard; the class checks each for order, type match, options syntax and dump and fsck values.",
    "Hand out the broken fstab file containing four errors. Groups find and correct each error and state which would block boot and which are only poor practice."
   ]
  },
  "discussion": [
   "Why do you think Red Hat recommends UUIDs or labels instead of names like /dev/vdb1?",
   "When would you choose nofail on a line, and what risk does it introduce?"
  ],
  "exit": [
   [
    "List the six fstab fields in order.",
    "Device, mount point, type, options, dump, fsck order."
   ],
   [
    "What fsck value should an XFS data volume normally have, and why?",
    "0, because XFS does not use boot-time fsck."
   ],
   [
    "Write an fstab line to mount server1:/exports/docs at /docs over NFS.",
    "server1:/exports/docs /docs nfs defaults,_netdev 0 0"
   ]
  ],
  "differentiation": [
   "Support: Give students a laminated template with six labeled boxes to fill for each line, plus a reference strip showing which types use 0 or 2 in the last field.",
   "Extend: Ask fast finishers to explain why nested mounts must be ordered parent before child, and to write a pair of lines for /data and /data/archive with the correct order and options."
  ]
 },
 {
  "t": "Mounting and unmounting NFS network file systems (mount -t nfs, _netdev)",
  "objectives": [
   "Students will be able to mount and unmount an NFS export manually with mount -t nfs using the server:/path syntax.",
   "Students will be able to write a persistent NFS fstab entry that includes _netdev and explain why.",
   "Students will be able to troubleshoot common NFS client failures, including name resolution, wrong export paths and root squash.",
   "Students will be able to explain the limits of showmount -e with NFSv4-only servers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Sketch a server and two clients on the board with an arrow labeled export."
   ],
   [
    12,
    "Teach",
    "Explain the server:/path source format, the manual mount, findmnt output showing nfs4, and the persistent fstab line with _netdev. Cover showmount limits, hard mounts and root squash."
   ],
   [
    18,
    "Activity",
    "Run the NFS Help Desk role-play. Pairs take turns as a user reporting a symptom and an administrator diagnosing it from printed evidence."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect symptoms to causes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your office stores shared files on one server. What would have to be true for your laptop to open those files as if they were in a local folder?",
  "activity": {
   "title": "NFS Help Desk",
   "materials": "Printed ticket cards with a user's symptom on the front and evidence (command outputs such as ping, getent, findmnt, ls -l and the fstab line) on the back, whiteboard.",
   "steps": [
    "Prepare six tickets: share missing after boot (no _netdev), wrong case in export path, server not resolvable, files owned by nobody, ls freezes while the server is down, and showmount timing out against an NFSv4-only server.",
    "In pairs, one student reads the symptom as the user; the other asks for one piece of evidence at a time and the user reads it from the back of the card.",
    "The administrator states the cause and the exact fix, then the pair writes both on the card.",
    "Pairs swap roles every ticket. After all six, the teacher collects the most common fixes on the whiteboard and confirms the correct ones."
   ]
  },
  "discussion": [
   "Why do you think the default NFS behavior is to hang and retry rather than return an error when the server is unreachable?",
   "What are the security reasons behind root squash, and what problems does it create for administrators?"
  ],
  "exit": [
   [
    "Write the command to mount server1:/exports/share at /mnt/share.",
    "mount -t nfs server1:/exports/share /mnt/share"
   ],
   [
    "Why add _netdev to an NFS fstab line?",
    "It marks the mount as needing the network so systemd mounts it after networking is up and unmounts it before networking stops."
   ],
   [
    "Files created as root on an NFS mount appear owned by nobody. What causes this?",
    "Root squash on the server maps client root to an unprivileged user."
   ]
  ],
  "differentiation": [
   "Support: Give students a troubleshooting ladder card (resolve name, reach server, check export path, check server export list, check ownership) to follow in order during the role-play.",
   "Extend: Ask fast finishers to compare a permanent fstab NFS mount with an autofs mount for the same share, listing two situations where each is the better choice."
  ]
 },
 {
  "t": "Configuring autofs: /etc/auto.master.d/*.autofs, map files and wildcard (* and &) entries",
  "objectives": [
   "Students will be able to configure autofs with a master map drop-in in /etc/auto.master.d/ and a matching map file.",
   "Students will be able to write wildcard indirect map entries using * and & for network home directories.",
   "Students will be able to compare direct and indirect maps and choose the right one for a requirement.",
   "Students will be able to verify and troubleshoot autofs mounts using access tests, findmnt and journalctl."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about two hundred fstab lines and collect ideas. Write on demand on the board."
   ],
   [
    12,
    "Teach",
    "Draw the chain master map drop-in, map file, NFS export. Show an indirect map, then the wildcard version, then a direct map. Explain why the base directory looks empty and how to test."
   ],
   [
    18,
    "Activity",
    "Run the Map It Out whiteboard design activity in small groups, followed by a gallery walk."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, drawing on designs from the gallery walk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A lab has two hundred student accounts whose home directories live on one file server. What problems would you expect if every lab machine mounted all two hundred at boot?",
  "activity": {
   "title": "Map It Out",
   "materials": "Whiteboard or large paper per group, markers, printed requirement cards, sticky notes for feedback.",
   "steps": [
    "Give each group one requirement card, for example home directories for all users under /rhome from server1:/rhome, a single read-only manuals share at /opt/manuals, or project directories under /projects from server2:/srv/projects.",
    "Groups draw the file names and exact contents of the master map drop-in and the map file, and decide whether the map is direct or indirect.",
    "Groups add a test plan: which command triggers the mount and which command proves it is mounted.",
    "Run a gallery walk. Each group leaves sticky-note feedback on two other designs, checking the .autofs file name, the key and location columns, and the use of * and &.",
    "The teacher reviews one design of each type with the class and corrects any recurring errors."
   ]
  },
  "discussion": [
   "What are the trade-offs between mounting a share permanently in fstab and mounting it on demand with autofs?",
   "Why might an empty-looking base directory confuse new administrators, and how would you explain it to a colleague?"
  ],
  "exit": [
   [
    "Which directory and file name ending hold an autofs master map drop-in?",
    "/etc/auto.master.d/ with a name ending in .autofs."
   ],
   [
    "Write a wildcard map line that mounts server1:/rhome/<user> under the base for any user, read-write.",
    "* -rw,sync server1:/rhome/&"
   ],
   [
    "What base does a direct map use in the master map?",
    "/-"
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank template for the master map line and map file line with labeled columns (base, map file; key, options, location) for students to complete.",
   "Extend: Ask fast finishers to describe how they would diagnose an autofs mount that never appears, ordering at least four checks from quickest to slowest and naming the command for each."
  ]
 },
 {
  "t": "Extending existing logical volumes and their file systems (lvextend -r, xfs_growfs, resize2fs)",
  "objectives": [
   "Students will be able to check volume group free space and add capacity with pvcreate and vgextend.",
   "Students will be able to extend a logical volume and its file system in one step with lvextend -r.",
   "Students will be able to grow XFS and ext4 file systems separately with xfs_growfs and resize2fs, using the correct argument for each.",
   "Students will be able to interpret size wording (to versus by) and verify results with lvs and df -h."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and ask students to guess why df did not change. Draw the PV, VG, LV and file system layers as stacked boxes."
   ],
   [
    12,
    "Teach",
    "Walk through vgs, pvcreate and vgextend, then lvextend with -L, +, -l and -r. Show the two manual tools and their arguments. Emphasize extent rounding and checking both lvs and df -h."
   ],
   [
    18,
    "Activity",
    "Run the Resize Relay activity. Teams pass a scenario sheet, each member writing the next command and the expected output."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and review any relay sheets with wrong sizes or arguments."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An administrator made a logical volume 5 GiB larger, but df -h shows no change. What do you think is still missing?",
  "activity": {
   "title": "Resize Relay",
   "materials": "Printed scenario sheets with starting outputs from vgs, lvs and df -h, pens, whiteboard for a class answer key.",
   "steps": [
    "Form teams of four and give each team a scenario sheet, such as grow an XFS volume by 1 GiB with enough free space, grow ext4 to 2 GiB when the VG is short, or fix a volume where lvextend ran without -r.",
    "The first student writes the first command needed and what output they expect; then passes the sheet to the next student, who writes the next command, and so on.",
    "When the sheet returns to the first student, the team checks the whole sequence against the requirement, including the final verification commands.",
    "Teams swap sheets with another team and mark them using the class answer key the teacher reveals on the whiteboard."
   ]
  },
  "discussion": [
   "Why might an exam grader accept a range of sizes rather than one exact number for a resized volume?",
   "What are the risks of using -l +100%FREE on a production volume group?"
  ],
  "exit": [
   [
    "Write one command that adds 500 MiB to /dev/vg1/data and grows its file system.",
    "lvextend -r -L +500M /dev/vg1/data"
   ],
   [
    "The XFS volume at /data was extended without -r. What command finishes the job?",
    "xfs_growfs /data"
   ],
   [
    "Which two commands verify both layers after a resize?",
    "lvs for the logical volume and df -h for the file system."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart card: check VFree, add PV if needed, lvextend -r, verify with lvs and df -h, with a side branch for forgot -r leading to xfs_growfs or resize2fs.",
   "Extend: Ask fast finishers to write the full sequence for growing a swap logical volume, explaining why the fstab line may need editing afterward."
  ]
 },
 {
  "t": "XFS can grow but not shrink; ext4 can do both when unmounted",
  "objectives": [
   "Students will be able to state which resize operations XFS and ext4 support and under what conditions.",
   "Students will be able to perform an ext4 shrink in the correct order with e2fsck -f, resize2fs and lvreduce, or with lvreduce -r.",
   "Students will be able to explain why shrinking the logical volume before the file system corrupts data.",
   "Students will be able to choose ext4 over XFS when a task requires future shrinking."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick show of hands. Write grow and shrink as two columns on the board with XFS and ext4 as rows."
   ],
   [
    12,
    "Teach",
    "Fill in the grid together: XFS grow online yes, shrink never; ext4 grow online yes, shrink offline only. Walk through the manual shrink sequence and the lvreduce -r shortcut, and explain the XFS backup and restore path."
   ],
   [
    18,
    "Activity",
    "Run the Order Matters card sequencing activity, followed by a what goes wrong analysis of a bad sequence."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why Red Hat defaults to XFS despite this limitation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A box is half empty and you want it to take up less space on the shelf. Should you cut the box down first or move the contents first, and why?",
  "activity": {
   "title": "Order Matters",
   "materials": "Printed command cards (umount, e2fsck -f, resize2fs, lvreduce, mount, lvextend, xfs_growfs, xfsdump, mkfs.xfs, xfsrestore), envelopes, whiteboard.",
   "steps": [
    "Give each pair an envelope of shuffled command cards and three scenarios: grow an XFS volume, shrink an ext4 volume, and shrink an XFS volume.",
    "Pairs lay out the cards in the correct order for each scenario, leaving out cards that do not belong, and record their sequences.",
    "Show the class an incorrect ext4 sequence on the board in which lvreduce comes before resize2fs. Pairs write two sentences explaining exactly what goes wrong to the data.",
    "Pairs compare sequences with a neighbor, then the teacher reveals the correct sequences and highlights that lvreduce -r and lvextend -r enforce the safe order."
   ]
  },
  "discussion": [
   "If XFS cannot shrink, why do you think Red Hat still chose it as the default file system?",
   "How would you plan storage on a new server to avoid ever needing to shrink a volume?"
  ],
  "exit": [
   [
    "Which file system can be shrunk, and under what condition?",
    "ext4, only while unmounted and after e2fsck -f."
   ],
   [
    "When shrinking ext4 manually, which comes first: resize2fs or lvreduce?",
    "resize2fs, then lvreduce."
   ],
   [
    "What is the only way to make an XFS volume smaller?",
    "Back up the data, recreate a smaller LV and XFS file system, and restore."
   ]
  ],
  "differentiation": [
   "Support: Give students the completed grow and shrink grid as a handout and let them annotate each cell with the command used, before attempting the card activity.",
   "Extend: Ask fast finishers to write the full command sequence for moving 1 GiB from an ext4 volume to an XFS volume in the same volume group, including verification steps."
  ]
 },
 {
  "t": "Diagnosing and correcting file permission problems (ls -l, namei -l, chmod, chown)",
  "objectives": [
   "Students will be able to read ls -l and namei -l output and identify the permission class that applies to a given user.",
   "Students will be able to explain the meaning of r, w and x on directories and why execute is needed on every parent directory.",
   "Students will be able to correct permission problems with the minimal chown, chgrp or chmod command, including numeric and symbolic modes and capital X.",
   "Students will be able to verify fixes by testing as the affected user and know when to check ACLs and SELinux."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up puzzle and let students vote on whether the user can read the file. Reveal that the answer depends on the directory above it."
   ],
   [
    12,
    "Teach",
    "Explain owner, group and other matching, directory bit meanings, and the namei -l output. Demonstrate chmod numeric and symbolic modes and the capital X. Stress testing as the user and the danger of 777."
   ],
   [
    18,
    "Activity",
    "Run the Permission Detective pair troubleshooting activity with printed namei -l and id outputs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and share the most surprising case from the activity."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A file is -rw-r--r-- and owned by root. A regular user tries to read it and is denied. Without changing the file at all, how is that possible?",
  "activity": {
   "title": "Permission Detective",
   "materials": "Printed case cards, each with a requirement, the output of id for the user, and namei -l output for the path; whiteboard; markers.",
   "steps": [
    "Prepare six cases, including a parent directory missing x, an owner with fewer rights than other, a wrong group on a directory, a user whose new group membership is not active yet, an ACL indicated by a plus sign, and a case where the requirement is already met.",
    "In pairs, students walk each path from left to right, marking the class (owner, group or other) that applies at every component.",
    "Pairs write the exact smallest command to fix each case, and the command they would use to test as the user.",
    "Pairs present one case each on the whiteboard; the class challenges any fix that grants more than the requirement asks for."
   ]
  },
  "discussion": [
   "Why is chmod 777 tempting under pressure, and what risks does it create on a shared server?",
   "When standard permissions look correct but access still fails, how do you decide whether to check ACLs or SELinux first?"
  ],
  "exit": [
   [
    "Which command shows the owner, group and mode of every directory along a path?",
    "namei -l followed by the path."
   ],
   [
    "What permission does a user need on every parent directory to open a file?",
    "Execute (x), which allows traversal."
   ],
   [
    "Write a command that gives the group read access to everything under /proj and traverse access on directories only.",
    "chmod -R g+rX /proj"
   ]
  ],
  "differentiation": [
   "Support: Provide a laminated decoder card showing the ten ls -l characters labeled, the r=4, w=2, x=1 values, and a three-step flow: find the class, check the path, check the file.",
   "Extend: Ask fast finishers to design a shared directory where group members can create files but only delete their own, and to explain which special permission bit they would add and why."
  ]
 },
 {
  "t": "Scheduling tasks with at, cron (crontab -e, /etc/cron.d) and systemd timer units (OnCalendar=, OnBootSec=)",
  "objectives": [
   "Students will be able to choose between at, cron and systemd timers based on whether a job runs once, on a schedule, or relative to boot.",
   "Students will be able to write correct crontab lines for personal crontabs and /etc/cron.d files, including the user field where required.",
   "Students will be able to create and enable a systemd timer and matching service using OnCalendar= or OnBootSec=.",
   "Students will be able to verify scheduled jobs with atq, crontab -l, systemctl list-timers and systemd-analyze calendar."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenarios aloud and have students shout once, repeat, or after boot for each."
   ],
   [
    13,
    "Teach",
    "Present at with atq and atrm, then the five cron fields with examples, then the /etc/cron.d user field. Finish with a timer and service pair, enabling the timer, and list-timers."
   ],
   [
    17,
    "Activity",
    "Run the Schedule Translator card activity, matching plain-English requirements to the correct tool and syntax."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare cron and timers."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone has a one-time alarm, a repeating alarm, and a timer that starts when you press a button. Which of these is most like each Linux scheduling tool, at, cron and a systemd timer?",
  "activity": {
   "title": "Schedule Translator",
   "materials": "Printed requirement cards and blank answer cards, a projector showing a cron field diagram, student laptops with a browser if available for checking work against notes.",
   "steps": [
    "Give each group ten requirement cards, for example back up /etc once at 23:00 tonight, run a cleanup every 15 minutes as root, user natasha echoes hello daily at 14:23, and run a license check 15 minutes after boot.",
    "For each card, groups choose the tool, write the exact line or unit settings, and name the file or command used to install it.",
    "Groups add the verification command they would run for each.",
    "Groups exchange cards with another group, which marks them and flags any missing user fields, swapped minute and hour, or enabling of the service instead of the timer.",
    "The teacher reviews the three most frequently missed cards with the class."
   ]
  },
  "discussion": [
   "What advantages do systemd timers offer over cron, and why might an administrator still prefer cron?",
   "Why does anacron exist, and what kinds of machines benefit from it most?"
  ],
  "exit": [
   [
    "Write a cron line in user alice's crontab that runs /usr/local/bin/sync.sh at 02:30 Monday to Friday.",
    "30 2 * * 1-5 /usr/local/bin/sync.sh"
   ],
   [
    "How does an /etc/cron.d line differ from a personal crontab line?",
    "It includes a user field between the five time fields and the command."
   ],
   [
    "Which unit do you enable to activate a systemd scheduled job, and with what command?",
    "The .timer unit, with systemctl enable --now name.timer."
   ]
  ],
  "differentiation": [
   "Support: Hand out a cron field ruler strip with the five fields labeled and value ranges shown, plus a three-question decision card: once, repeating, or after boot.",
   "Extend: Ask fast finishers to convert a cron schedule such as 0 */4 * * 1-5 into an equivalent OnCalendar= expression and explain how they would confirm it with systemd-analyze calendar."
  ]
 },
 {
  "t": "Starting and stopping services and configuring them to start at boot (systemctl enable --now, disable, mask)",
  "objectives": [
   "Students will be able to distinguish a service's active state from its enabled state and check each with systemctl.",
   "Students will be able to start, stop, restart, reload, enable and disable services, including with the --now option.",
   "Students will be able to explain the difference between disabling and masking a unit and choose the right one for a requirement.",
   "Students will be able to use daemon-reload, systemctl status and journalctl -u to apply unit changes and diagnose start failures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a service that vanished after reboot. Draw two switches labeled now and at boot on the board."
   ],
   [
    12,
    "Teach",
    "Demonstrate or project status output and point to the Loaded and Active lines. Explain enable as symlinks in a .wants directory, then --now, disable, mask and unmask. Cover daemon-reload and journalctl -u."
   ],
   [
    18,
    "Activity",
    "Run the Two Switches card game. Pairs predict the state after each command sequence, then explain their reasoning."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about disable versus mask."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A colleague started a web server on Friday and it was gone on Monday after an automatic reboot. What do you think was missed?",
  "activity": {
   "title": "Two Switches",
   "materials": "Printed sequence cards, each listing three or four systemctl commands run in order on one service; a printed state grid with columns active and enabled; whiteboard.",
   "steps": [
    "Give each pair eight sequence cards, such as start then reboot; enable then reboot; enable --now then disable; mask then start; disable then a dependency requests the service.",
    "Pairs fill in the state grid for each card: is the service active, is it enabled, and what would systemctl is-enabled print at the end.",
    "Pairs then write the single command that would have met an extra requirement on each card, such as running now and at boot, or never running at all.",
    "The teacher reveals answers one card at a time; pairs that disagree explain their reasoning to the class before the answer is confirmed."
   ]
  },
  "discussion": [
   "Why would systemd keep active and enabled as separate settings instead of combining them?",
   "In what situations would masking a service be too strong, and what could go wrong if you forget you masked it?"
  ],
  "exit": [
   [
    "Which single command starts httpd now and at every boot?",
    "systemctl enable --now httpd"
   ],
   [
    "How does mask differ from disable?",
    "mask links the unit to /dev/null so nothing can start it; disable only removes boot-time links."
   ],
   [
    "What must you run after editing a unit file under /etc/systemd/system?",
    "systemctl daemon-reload"
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column cheat card listing each command and whether it changes the now state, the at-boot state, or both.",
   "Extend: Ask fast finishers to explain what systemctl enable actually changes on disk, naming the directory and link created, and to predict what happens if the [Install] section is missing."
  ]
 },
 {
  "t": "Setting the default boot target (systemctl get-default, set-default)",
  "objectives": [
   "Students will be able to display and change the default boot target with systemctl get-default and set-default.",
   "Students will be able to distinguish set-default from isolate and choose the right one for a requirement.",
   "Students will be able to compare multi-user, graphical, rescue and emergency targets.",
   "Students will be able to boot into a recovery target once from the GRUB menu without changing the default."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a headless server running a desktop and collect answers."
   ],
   [
    12,
    "Teach",
    "Explain targets as groups of units, show get-default, set-default and the default.target symlink, then isolate. Describe rescue and emergency targets and the GRUB systemd.unit= method."
   ],
   [
    18,
    "Activity",
    "Run the Now or Next Boot sorting activity, followed by a short GRUB walkthrough using a projected screenshot or a whiteboard sketch."
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
  "warmup": "A server in a rack has no monitor, yet it starts a full graphical desktop every time it boots. Why might that be a problem, and what would you want to change?",
  "activity": {
   "title": "Now or Next Boot",
   "materials": "Printed scenario strips, two labeled areas on the whiteboard (Now and Next boot, with a third area for Both), tape, a projector or whiteboard sketch of a GRUB edit screen.",
   "steps": [
    "Give each group a set of scenario strips, such as make the server boot to text mode permanently, drop the desktop for this session only, get a root shell once to repair a broken service, or make a workstation boot to a graphical login.",
    "Groups tape each strip under Now, Next boot or Both, and write the exact command or GRUB edit needed on the strip.",
    "The class reviews each area together; the teacher asks a group to justify any strip placed under Both and confirm it needs two commands.",
    "Show the GRUB edit screen and have one volunteer describe aloud where to add systemd.unit=rescue.target and which key boots it."
   ]
  },
  "discussion": [
   "Why do you think systemd replaced numbered runlevels with named targets?",
   "When would you choose emergency.target instead of rescue.target for a repair?"
  ],
  "exit": [
   [
    "Which command makes the system boot to a text console at every boot?",
    "systemctl set-default multi-user.target"
   ],
   [
    "Which command switches the running system to multi-user.target without a reboot?",
    "systemctl isolate multi-user.target"
   ],
   [
    "What do you append to the kernel line in GRUB to boot rescue mode once?",
    "systemd.unit=rescue.target"
   ]
  ],
  "differentiation": [
   "Support: Give students a two-row table, Now and Next boot, with the matching command in each row and a picture of the default.target symlink, to use during the activity.",
   "Extend: Ask fast finishers to explain how they would confirm which units graphical.target adds beyond multi-user.target, naming the command they would use and what they expect to see."
  ]
 },
 {
  "t": "Configuring time service clients with chronyd (/etc/chrony.conf, chronyc sources) and timedatectl",
  "objectives": [
   "Students will be able to configure /etc/chrony.conf to use a named NTP server with the iburst option.",
   "Students will be able to interpret chronyc sources and chronyc tracking output to confirm synchronization.",
   "Students will be able to use timedatectl to view clock status, set the time zone and turn NTP on or off.",
   "Students will be able to troubleshoot a client that never reaches the ^* state."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project three log lines from different servers with mismatched timestamps for the same event. Ask students what could explain the order and what problems this causes for authentication and troubleshooting."
   ],
   [
    12,
    "Teach",
    "Walk through /etc/chrony.conf on the projector: pool versus server, iburst, driftfile and makestep. Show restarting chronyd, then explain each state character in chronyc sources -v and the key fields of chronyc tracking. Finish with timedatectl status, set-timezone and set-ntp."
   ],
   [
    15,
    "Activity",
    "Run the output-reading activity below in pairs. Circulate and ask each pair to justify their verdict for at least one card out loud."
   ],
   [
    8,
    "Discuss",
    "Review the cards as a class, focusing on the difference between a time zone problem and a synchronization problem, and on why a client needs no firewall opening."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or sticky notes and hand them in at the door."
   ]
  ],
  "warmup": "Your laptop shows the right time but the wrong hour after a trip, while a server shows the right hour but is four minutes slow. Are these the same problem? Which tool would you reach for in each case?",
  "activity": {
   "title": "Is this clock healthy?",
   "materials": "Printed cards, each showing a short chrony.conf excerpt plus matching chronyc sources and timedatectl output (some healthy, some broken); whiteboard; markers.",
   "steps": [
    "Prepare six cards: a healthy client with ^*, a client still showing the default pool after the task asked for a specific server, a client with ^? because the name does not resolve, a client with a wrong time zone but correct synchronization, a client where chronyd was never restarted after editing, and a client with NTP turned off in timedatectl.",
    "Pairs read each card and write a verdict: healthy, or broken with the specific cause.",
    "For each broken card, pairs write the exact commands they would run to fix and verify it.",
    "Pairs swap cards with a neighboring pair and check each other's fixes, noting any disagreement.",
    "The teacher collects disagreements on the whiteboard for the class discussion."
   ]
  },
  "discussion": [
   "Why do authentication systems such as Kerberos care so much about clock agreement between machines?",
   "When would you choose a pool line over a server line, and what changes on an exam where only one internal server is reachable?",
   "Why might makestep matter on a virtual machine that was paused for several hours?"
  ],
  "exit": [
   [
    "Write the chrony.conf line to use time.example.com with fast initial synchronization.",
    "server time.example.com iburst"
   ],
   [
    "Which symbol in chronyc sources output marks the source the system is synchronized to?",
    "^* (caret followed by an asterisk)."
   ],
   [
    "Which command sets the time zone to America/Chicago?",
    "timedatectl set-timezone America/Chicago"
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page legend of chronyc sources state characters and the three-step fix sequence (edit chrony.conf, restart and enable chronyd, verify with chronyc sources) to use while working through the cards.",
   "Extend: Ask fast finishers to describe what they would change to make this system serve time to a 192.168.10.0/24 network, including the chrony.conf directive and the firewalld service, and how they would test it from a client."
  ]
 },
 {
  "t": "Installing and updating packages from the Red Hat CDN, a remote repository or the local file system",
  "objectives": [
   "Students will be able to write a valid .repo file for local (file:///) and remote repositories.",
   "Students will be able to install, update, remove and search packages with dnf, including package groups.",
   "Students will be able to explain the roles of BaseOS, AppStream and the Red Hat CDN.",
   "Students will be able to query installed software with rpm and choose dnf over rpm -i for installs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on the whiteboard. Lead students toward the idea that a package manager can only use sources it has been told about."
   ],
   [
    12,
    "Teach",
    "Show the everyday dnf commands, then build a two-section .repo file live on the projector, explaining each key. Contrast file:/// and remote baseurl forms, and show dnf clean all and dnf repolist. Close with rpm queries and why rpm -i is avoided."
   ],
   [
    15,
    "Activity",
    "Run the broken repo files activity below in small groups."
   ],
   [
    8,
    "Discuss",
    "Groups present one bug each. Discuss gpgcheck trade-offs and why the DVD mount must persist."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You type dnf install httpd on a brand-new server and get no match for argument. The package definitely exists. List as many reasons as you can think of.",
  "activity": {
   "title": "Find the bug in the repo file",
   "materials": "Printed cards each showing a .repo file and the dnf repolist output it produced; sticky notes; whiteboard.",
   "steps": [
    "Prepare six cards with one bug each: file named lab.conf, missing bracketed ID, duplicate ID for two sections, baseurl one directory too high, gpgcheck=1 with no gpgkey, and a DVD path that is empty because the ISO is not mounted. Include one correct card as a control.",
    "Groups of three read each card and write the bug and the fix on a sticky note.",
    "For each card, groups also write the verification command they would run after fixing it.",
    "Groups post their sticky notes on the whiteboard under each card number.",
    "The teacher reviews any card where groups disagree and asks a group to defend its answer."
   ]
  },
  "discussion": [
   "What risk do you accept when you set gpgcheck=0, and when is that acceptable?",
   "Why does Red Hat split content into BaseOS and AppStream instead of one large repository?",
   "When is rpm the right tool, and when should you always prefer dnf?"
  ],
  "exit": [
   [
    "Which directory holds .repo files?",
    "/etc/yum.repos.d/"
   ],
   [
    "Write the baseurl line for a repository at /mnt/dvd/AppStream.",
    "baseurl=file:///mnt/dvd/AppStream"
   ],
   [
    "Which command lists the files installed by the httpd package?",
    "rpm -ql httpd"
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blanks .repo template with the five keys labeled and a short list of the six most-used dnf and rpm commands with one-line descriptions.",
   "Extend: Ask fast finishers to write a .repo file that uses gpgcheck=1 with a local key file, and explain how they would find the key on mounted installation media and what error dnf shows if the key is wrong."
  ]
 },
 {
  "t": "Registering systems with subscription-manager (Developer subscription)",
  "objectives": [
   "Students will be able to register a RHEL system with subscription-manager using a username or an activation key.",
   "Students will be able to explain simple content access and why attach steps from older guides are unnecessary.",
   "Students will be able to enable, disable and list repositories with subscription-manager repos.",
   "Students will be able to troubleshoot common registration problems, including cloned identities and clock errors."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the app store comparison and let a few students answer."
   ],
   [
    12,
    "Teach",
    "Demonstrate or show screenshots of register, status, repos --list-enabled and dnf repolist. Explain simple content access, the role of redhat.repo, activation keys, and unregister for retired or cloned VMs."
   ],
   [
    15,
    "Activity",
    "Run the help desk role-play below in pairs."
   ],
   [
    8,
    "Discuss",
    "Collect the best diagnoses from the role-play and discuss the exam context: why CDN access is not expected on the exam."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why would a company that gives away free study subscriptions still require each machine to sign in before it can download updates?",
  "activity": {
   "title": "Registration help desk",
   "materials": "Printed ticket cards describing a registration problem with sample command output; printed answer key for the teacher; whiteboard.",
   "steps": [
    "Prepare five tickets: empty dnf repolist on a fresh install, an old guide's attach command failing, a cloned VM with conflicting identity, a clock set years in the past, and a request to register many systems unattended.",
    "In pairs, one student plays the user reading the ticket and the other plays the administrator asking questions and proposing commands.",
    "The administrator writes the diagnosis and the exact fix commands on the ticket.",
    "Pairs switch roles for each new ticket.",
    "Pairs compare their fixes with a neighboring pair before the class discussion."
   ]
  },
  "discussion": [
   "What are the security advantages of activation keys over typing account credentials on each server?",
   "Why does a cloned VM cause trouble for a registration service, and how would you build clone-ready images to avoid it?",
   "How does registration relate to the .repo files you write for exam tasks?"
  ],
  "exit": [
   [
    "Which command registers a system with your Red Hat username?",
    "subscription-manager register --username your_login (it then prompts for the password)."
   ],
   [
    "Under simple content access, do you need to attach a subscription to each system?",
    "No. A registered system can use the content its account is entitled to."
   ],
   [
    "What should you do on a VM cloned from a registered system?",
    "Unregister or clean it, then register it again so it has its own identity."
   ]
  ],
  "differentiation": [
   "Support: Give students a short command card with register, status, repos --list-enabled, repos --enable, unregister and dnf repolist, each with a one-line purpose.",
   "Extend: Ask fast finishers to outline how they would prepare a VM template so that every clone registers itself with a unique identity on first boot using an activation key."
  ]
 },
 {
  "t": "Modifying the boot loader: grubby, /etc/default/grub and grub2-mkconfig",
  "objectives": [
   "Students will be able to identify where GRUB global settings, BLS entries and the generated grub.cfg live.",
   "Students will be able to change the menu timeout with /etc/default/grub and grub2-mkconfig -o.",
   "Students will be able to add and remove kernel arguments for one or all kernels with grubby.",
   "Students will be able to verify boot changes with grubby --info and /proc/cmdline."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers as a simple diagram on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw the three layers: /etc/default/grub, /boot/loader/entries/ and grub.cfg. Show grub2-mkconfig -o, explain why GRUB_CMDLINE_LINUX does not update existing BLS entries, then demonstrate grubby --info, --args and --remove-args, and /proc/cmdline."
   ],
   [
    15,
    "Activity",
    "Run the which-tool card sort below in small groups."
   ],
   [
    8,
    "Discuss",
    "Review the card sort answers and discuss safety habits that keep a system bootable."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When a computer starts, what has to happen before the operating system can run? Who decides which version of the system starts?",
  "activity": {
   "title": "Which tool changes it?",
   "materials": "Printed task cards; three header cards labeled /etc/default/grub plus grub2-mkconfig, grubby, and press e at the GRUB menu; whiteboard or table space.",
   "steps": [
    "Prepare about ten task cards, such as set the menu timeout to 10 seconds, add console=ttyS0 to all kernels, boot once into rescue.target, remove quiet from the default kernel only, and change the default arguments new kernels will inherit.",
    "Groups sort each card under the header that best handles it.",
    "For each card, groups write the exact command or file line on the back.",
    "Groups add a verification step to each card, such as cat /proc/cmdline or grubby --info=DEFAULT.",
    "The teacher reveals the answer key and groups score themselves, discussing any card that fits more than one header."
   ]
  },
  "discussion": [
   "Why might Red Hat have moved kernel arguments into per-kernel BLS files instead of one central file?",
   "What habits reduce the risk of making an exam system unbootable?",
   "When would you deliberately change only one kernel's arguments instead of all of them?"
  ],
  "exit": [
   [
    "Which file holds GRUB_TIMEOUT?",
    "/etc/default/grub"
   ],
   [
    "Write the command that regenerates the GRUB configuration file.",
    "grub2-mkconfig -o /boot/grub2/grub.cfg"
   ],
   [
    "Write the grubby command that removes rhgb from all kernels.",
    "grubby --update-kernel=ALL --remove-args='rhgb'"
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram of the boot configuration files with arrows showing which tool writes which file, and a short list of the four grubby options covered.",
   "Extend: Ask fast finishers to explain what happens to a kernel argument added with grubby when a new kernel package is installed, and how they would confirm it on the new entry."
  ]
 },
 {
  "t": "Choosing the default kernel and adding or removing kernel arguments",
  "objectives": [
   "Students will be able to list installed kernels and boot entries and identify the current default.",
   "Students will be able to set a persistent default kernel with grubby by path or index.",
   "Students will be able to add and remove kernel arguments for DEFAULT, ALL or a specific kernel.",
   "Students will be able to distinguish one-time GRUB menu edits from persistent changes and verify the result."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to why RHEL keeps multiple kernels installed."
   ],
   [
    12,
    "Teach",
    "Show sample output of rpm -q kernel and grubby --info=ALL on the projector. Demonstrate --set-default with a path, --default-kernel, --args and --remove-args, and explain the DEFAULT ordering trap. Contrast with one-time edits at the GRUB menu."
   ],
   [
    15,
    "Activity",
    "Run the ticket-to-commands activity below in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share one ticket each; discuss verification and the difference between running kernel and default kernel."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone updates overnight and an app you rely on stops working. If you could keep the old version installed alongside the new one, how would you want to switch between them?",
  "activity": {
   "title": "From ticket to commands",
   "materials": "Printed grubby --info=ALL output showing three kernels with index, kernel, args and title lines; printed ticket cards; whiteboard.",
   "steps": [
    "Hand each pair the printed grubby output and a set of four tickets: boot the middle kernel by default, add audit=1 to only the default kernel, remove rhgb from all kernels, and boot once into rescue.target.",
    "Pairs write the exact commands for each ticket using paths and arguments from the printout.",
    "Pairs predict what uname -r and cat /proc/cmdline will show after the next reboot for each ticket.",
    "Pairs swap with another pair and check commands, especially the order of --set-default and --update-kernel=DEFAULT.",
    "The teacher reviews answers on the whiteboard and highlights the one-time ticket."
   ]
  },
  "discussion": [
   "Why is a kernel path safer than an index number when setting the default?",
   "When might running kernel and default kernel legitimately differ, and how would you notice?",
   "What could go wrong if you add a recovery argument like systemd.unit=rescue.target with grubby instead of at the menu?"
  ],
  "exit": [
   [
    "Which command prints the default kernel path?",
    "grubby --default-kernel"
   ],
   [
    "Write the command to add audit=1 to the default kernel only.",
    "grubby --update-kernel=DEFAULT --args='audit=1'"
   ],
   [
    "You pressed e at the GRUB menu and added an argument. Will it be there after the next reboot?",
    "No. GRUB menu edits apply to that boot only."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing grubby --info=ALL, --default-kernel, --set-default, --update-kernel with ALL or DEFAULT, --args and --remove-args, with a worked example of each.",
   "Extend: Ask fast finishers to explain how installonly_limit affects a server pinned to an older kernel over several update cycles, and what they would do to make sure the pinned kernel is not removed."
  ]
 },
 {
  "t": "Configuring static and DHCP IPv4 and IPv6 addresses with nmcli (ipv4.method manual/auto, ipv4.addresses, ipv4.gateway)",
  "objectives": [
   "Students will be able to distinguish NetworkManager devices from connection profiles using nmcli device status and nmcli con show.",
   "Students will be able to configure static IPv4 and IPv6 addresses, gateway and DNS with nmcli con mod or con add.",
   "Students will be able to switch a profile between manual and auto addressing without leaving stale values.",
   "Students will be able to apply and verify changes with nmcli con up, ip addr and ip route."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the print server and collect ideas about fixed versus automatic addresses."
   ],
   [
    12,
    "Teach",
    "Show nmcli device status and nmcli con show output on the projector. Explain setting.property names, auto versus manual, CIDR, and IPv6 equivalents. Demonstrate con mod followed by con up and point out the gap between saving and applying, plus the plus and minus prefixes."
   ],
   [
    15,
    "Activity",
    "Run the command-building activity below in pairs."
   ],
   [
    8,
    "Discuss",
    "Review the trickiest scenario cards and talk through safe habits when changing addresses over SSH."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why would a printer or file server need an address that never changes, while a laptop is fine getting a new one each day?",
  "activity": {
   "title": "Build the nmcli command",
   "materials": "Printed scenario cards with a short task and the current nmcli con show excerpt; blank paper; whiteboard for the answer key.",
   "steps": [
    "Prepare six scenarios: convert DHCP to static IPv4 with gateway and DNS, add a second IPv4 address, add a static IPv6 address, convert static back to DHCP cleanly, change only the gateway, and disable IPv6 on a profile.",
    "Pairs write the full nmcli command or commands for each scenario, including the activation step.",
    "For each scenario, pairs write the verification command and the line they expect to see in its output.",
    "Pairs trade papers with another pair and mark any missing activation step or stale value.",
    "The teacher reveals answers on the whiteboard and discusses common errors."
   ]
  },
  "discussion": [
   "Why does NetworkManager save changes immediately but wait for activation to apply them? What is the benefit?",
   "When would you create a new profile instead of modifying the existing one, and what risk comes with two profiles for one device?",
   "How would you change the address of a remote server safely if you had no console access?"
  ],
  "exit": [
   [
    "Which ipv4.method value means static addressing?",
    "manual"
   ],
   [
    "Write the command to set profile lan to 192.168.1.50/24 with gateway 192.168.1.1.",
    "nmcli con mod lan ipv4.method manual ipv4.addresses 192.168.1.50/24 ipv4.gateway 192.168.1.1, followed by nmcli con up lan."
   ],
   [
    "Which command shows the default gateway after the change?",
    "ip route (the default via line)."
   ]
  ],
  "differentiation": [
   "Support: Give students a template command with blanks for profile name, method, address, gateway and DNS, plus a checklist: modify, up, ip addr, ip route.",
   "Extend: Ask fast finishers to write one command that creates a new profile with static IPv4, static IPv6 with gateway, two DNS servers, and autoconnect turned off, then explain how they would switch the device to it."
  ]
 },
 {
  "t": "NetworkManager keyfiles in /etc/NetworkManager/system-connections/ (RHEL 10 no longer uses ifcfg files)",
  "objectives": [
   "Students will be able to state where RHEL 10 stores connection profiles and explain that ifcfg files are no longer supported.",
   "Students will be able to read a keyfile and map its sections and keys to nmcli properties.",
   "Students will be able to apply a hand-edited keyfile safely using correct permissions, nmcli con reload and nmcli con up.",
   "Students will be able to identify why a profile is ignored or lost after reboot."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show an old ifcfg file next to a keyfile for the same settings and ask students to spot the matching values."
   ],
   [
    12,
    "Teach",
    "Walk through each keyfile section on the projector and map keys to nmcli properties. Explain the 600 permission rule, reload versus up, uniqueness of uuid when copying, and /run versus /etc storage."
   ],
   [
    15,
    "Activity",
    "Run the keyfile detective activity below in groups of three."
   ],
   [
    8,
    "Discuss",
    "Groups report findings; discuss when hand editing is reasonable and when nmcli is the better choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here are two files that configure the same network card: one from an older RHEL release and one from RHEL 10. Which values can you match between them, and what is different about how they are organized?",
  "activity": {
   "title": "Keyfile detective",
   "materials": "Printed keyfile excerpts with matching ls -l and nmcli output; a printed nmcli property list; sticky notes.",
   "steps": [
    "Prepare five cases: a correct keyfile, a keyfile at mode 644 that does not appear in nmcli con show, a copied keyfile with a duplicate uuid, a keyfile edited without reload so ip addr shows old values, and a profile stored under /run that vanished after reboot.",
    "Groups read each case and write on a sticky note what is wrong and the commands to fix it.",
    "For the correct keyfile, groups translate each line into the equivalent nmcli con mod property.",
    "Groups post notes on the whiteboard under each case.",
    "The teacher confirms answers and highlights the permission and reload rules."
   ]
  },
  "discussion": [
   "Why does NetworkManager refuse to load a keyfile that other users can read, rather than just warning?",
   "What are the advantages of keeping network configuration as readable files that tools such as diff can compare?",
   "When migrating old servers to RHEL 10, how would you handle notes and scripts that refer to ifcfg files?"
  ],
  "exit": [
   [
    "Which directory holds persistent NetworkManager keyfiles?",
    "/etc/NetworkManager/system-connections/"
   ],
   [
    "What owner and mode must a keyfile have?",
    "Owned by root with mode 600."
   ],
   [
    "You edited a keyfile. Which two commands apply it?",
    "nmcli con reload, then nmcli con up followed by the connection name."
   ]
  ],
  "differentiation": [
   "Support: Provide a side-by-side chart mapping each keyfile key in the example to its nmcli property name and a three-step checklist for hand edits: permissions, reload, up.",
   "Extend: Ask fast finishers to write a complete keyfile by hand for a profile with two static IPv4 addresses, one gateway, two DNS servers and IPv6 disabled, then list the commands to load and verify it."
  ]
 },
 {
  "t": "Bringing connections up and down and making them autoconnect (nmcli con up, connection.autoconnect)",
  "objectives": [
   "Students will be able to activate and deactivate profiles with nmcli con up and nmcli con down.",
   "Students will be able to configure connection.autoconnect and autoconnect-priority so the correct profile starts at boot.",
   "Students will be able to compare nmcli con down with nmcli device disconnect.",
   "Students will be able to verify active versus saved state and prove persistence after a reboot."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about multiple alarms and connect it to multiple profiles for one device."
   ],
   [
    12,
    "Teach",
    "Show nmcli con show and nmcli con show --active side by side. Demonstrate con up replacing another profile, autoconnect yes and no, autoconnect-priority, and the -f field selection. Contrast con down with device disconnect."
   ],
   [
    15,
    "Activity",
    "Run the boot-time prediction activity below in pairs."
   ],
   [
    8,
    "Discuss",
    "Review predictions, focusing on cases where active now differs from active after reboot."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You set two alarms on your phone for the same morning, one for 6:00 and one for 6:30, and you only want the second one. What are your options?",
  "activity": {
   "title": "Which profile wins at boot?",
   "materials": "Printed nmcli -f NAME,DEVICE,AUTOCONNECT,AUTOCONNECT-PRIORITY con show tables, one per scenario; whiteboard; markers.",
   "steps": [
    "Prepare five scenario tables with two or three profiles per device, varying autoconnect and priority, and in one case showing a device that was disconnected with nmcli device disconnect.",
    "Pairs predict which profile is active after the next reboot for each table and write a one-sentence reason.",
    "For each scenario, pairs write the commands to make a named target profile win reliably.",
    "Pairs compare predictions with another pair and resolve disagreements.",
    "The teacher reveals the outcomes and explains any surprises, including that device disconnect lasts only until restart."
   ]
  },
  "discussion": [
   "Why does NetworkManager default new profiles to autoconnect yes, and when is that a problem?",
   "When would you prefer deleting an unused profile over setting autoconnect no?",
   "What could go wrong if you only test network changes without ever rebooting?"
  ],
  "exit": [
   [
    "Write the command to stop profile test from starting at boot.",
    "nmcli con mod test connection.autoconnect no"
   ],
   [
    "Two profiles have priorities 0 and 10 for the same device, both autoconnect. Which wins?",
    "The profile with priority 10."
   ],
   [
    "What is the difference between nmcli con down and nmcli device disconnect?",
    "con down deactivates a profile but autoconnect may bring one back; device disconnect blocks automatic activation on that device until manual activation or restart."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision chart: is the profile needed after reboot (autoconnect yes), needed only manually (autoconnect no), or not needed (delete), plus the matching commands.",
   "Extend: Ask fast finishers to design a profile setup for a laptop-style server that should use a static office profile when its cable is in one network and fall back to DHCP otherwise, explaining how priorities and autoconnect interact."
  ]
 },
 {
  "t": "Configuring hostname resolution: hostnamectl, /etc/hosts, ipv4.dns and /etc/resolv.conf",
  "objectives": [
   "Students will be able to set and verify a persistent hostname with hostnamectl.",
   "Students will be able to add static name mappings to /etc/hosts and explain the lookup order in /etc/nsswitch.conf.",
   "Students will be able to configure DNS servers and search domains on a NetworkManager connection, including ignore-auto-dns.",
   "Students will be able to choose getent hosts or dig appropriately to verify resolution."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about how students look up a phone number, and map the steps to /etc/hosts and DNS."
   ],
   [
    12,
    "Teach",
    "Demonstrate hostnamectl set-hostname, show /etc/hosts and the hosts: line of nsswitch.conf, then show resolv.conf with its generated-by comment. Configure ipv4.dns, dns-search and ignore-auto-dns with nmcli and show the file change after con up."
   ],
   [
    15,
    "Activity",
    "Run the resolution trace activity below in small groups."
   ],
   [
    8,
    "Discuss",
    "Review traces and discuss why getent and dig can disagree."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you need a friend's phone number, where do you look first, and what do you do if it is not there? How might a computer do the same with names?",
  "activity": {
   "title": "Trace the lookup",
   "materials": "Printed sets of /etc/hosts, /etc/nsswitch.conf and /etc/resolv.conf excerpts with a list of names to resolve; whiteboard; markers.",
   "steps": [
    "Prepare four system snapshots, including one where /etc/hosts overrides a DNS answer, one where resolv.conf lists an extra DHCP nameserver, and one with a search domain.",
    "Groups trace how getent hosts would resolve each listed name, writing which source answers and the resulting address.",
    "Groups then predict what dig would return for the same names and note any difference.",
    "For one snapshot, groups write the nmcli commands to set the required DNS server and search domain permanently.",
    "Groups present one trace on the whiteboard and the class checks it."
   ]
  },
  "discussion": [
   "Why might an administrator choose /etc/hosts over DNS, and what problems appear when many servers each keep their own hosts file?",
   "What risks come from NetworkManager owning /etc/resolv.conf, and what benefits?",
   "Why should name resolution be one of the first things you verify on an exam system?"
  ],
  "exit": [
   [
    "Write the command to set the hostname to web1.example.com.",
    "hostnamectl set-hostname web1.example.com"
   ],
   [
    "Which file is checked first by default when resolving a name, /etc/hosts or DNS?",
    "/etc/hosts, because the hosts: line in /etc/nsswitch.conf lists files before dns."
   ],
   [
    "Write the commands to make profile lan use DNS server 10.0.0.53.",
    "nmcli con mod lan ipv4.dns 10.0.0.53, then nmcli con up lan."
   ]
  ],
  "differentiation": [
   "Support: Give students a flow diagram of a lookup (application, nsswitch.conf, /etc/hosts, resolv.conf, DNS server) and a card with the four key commands: hostnamectl set-hostname, nmcli con mod ipv4.dns, nmcli con up and getent hosts.",
   "Extend: Ask fast finishers to configure a profile that gets its address from DHCP but uses two specific DNS servers and two search domains, then explain what /etc/resolv.conf will contain and how short names will be expanded."
  ]
 },
 {
  "t": "Checking addresses, routes and name resolution: ip addr, ip route, ping, getent hosts",
  "objectives": [
   "Students will be able to read ip addr and ip route output to identify addresses, prefixes and the default gateway.",
   "Students will be able to use ping systematically to separate local, routing and remote problems.",
   "Students will be able to compare getent hosts with dig and choose the right tool for a resolution question.",
   "Students will be able to apply a bottom-up troubleshooting sequence to a network fault scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about an undelivered parcel and list student answers as layers on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Project sample ip addr, ip route, ping, getent and ss output. Explain what to look for in each and the order of checks: address, route, reach, resolve, then service."
   ],
   [
    15,
    "Activity",
    "Run the pair troubleshooting activity below."
   ],
   [
    8,
    "Discuss",
    "Pairs share how many clues they needed; discuss ICMP limits and getent versus dig."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A parcel you sent never arrived. List every place in the delivery process where something could have gone wrong, from your door to the recipient's.",
  "activity": {
   "title": "Pair troubleshooting with clue cards",
   "materials": "Printed fault scenarios and matching clue cards containing command output for ip addr, ip route, ping, getent hosts and ss; whiteboard.",
   "steps": [
    "Prepare five faults: no address on the interface, missing default route, gateway down, wrong DNS server, and service not listening.",
    "In each pair, one student holds the clue cards for a fault and the other is the troubleshooter.",
    "The troubleshooter asks for one command at a time and receives the matching clue card, aiming to diagnose with as few cards as possible.",
    "The troubleshooter states the diagnosis and the fix command; the partner confirms using the answer key.",
    "Pairs switch roles for the next fault and keep a tally of cards used."
   ]
  },
  "discussion": [
   "Why is it more efficient to troubleshoot from the interface outward than from the application inward?",
   "What would you conclude if ping to a host fails but you can still connect to its web service?",
   "When is dig the better tool, and when is getent hosts the better tool?"
  ],
  "exit": [
   [
    "In ip route output, what does the default via line tell you?",
    "The address of the default gateway and the interface used for traffic to non-local networks."
   ],
   [
    "Ping by IP works, ping by name fails. What do you check next?",
    "Name resolution: getent hosts, /etc/hosts and the DNS servers in /etc/resolv.conf or on the connection."
   ],
   [
    "Which command resolves a name the same way applications do?",
    "getent hosts name"
   ]
  ],
  "differentiation": [
   "Support: Give students a laminated flowchart: ip addr, then ip route, then ping gateway, then ping remote IP, then getent hosts, then ss, with the likely fix beside each failure.",
   "Extend: Ask fast finishers to interpret ip route get output for three destinations on a system with two interfaces and explain why traffic to each leaves the way it does."
  ]
 },
 {
  "t": "Configuring network services to start automatically at boot",
  "objectives": [
   "Students will be able to enable and start a network service with systemctl enable --now and verify it with is-enabled, is-active and ss.",
   "Students will be able to ensure the network connection activates at boot using connection.autoconnect.",
   "Students will be able to add permanent firewalld rules and explain runtime versus permanent configuration.",
   "Students will be able to explain the role of network-online.target and verify persistence with a reboot test."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a shop that works on opening day but not the next morning."
   ],
   [
    12,
    "Teach",
    "Present the three-step checklist: service, network, firewall. Demonstrate enable --now, is-enabled, is-active, ss -tlnp, nmcli autoconnect fields, firewall-cmd --permanent and --reload, and the difference between runtime and permanent lists. Briefly explain network-online.target."
   ],
   [
    15,
    "Activity",
    "Run the before-and-after reboot activity below in groups."
   ],
   [
    8,
    "Discuss",
    "Groups present which cases fail after reboot and why; discuss why casual testing hides persistence problems."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A new shop opens on Saturday and everything works. On Monday morning the door is locked, the lights are off and no staff are scheduled. What did the owner set up only for opening day?",
  "activity": {
   "title": "Will it survive the reboot?",
   "materials": "Printed case cards showing command history and current output (systemctl, nmcli, firewall-cmd); a printed checklist; whiteboard.",
   "steps": [
    "Prepare six cases: a service started but not enabled, a runtime-only firewall rule, a permanent rule never reloaded, a connection with autoconnect no, a competing autoconnect profile, and a fully correct setup.",
    "Groups decide for each case whether the service works now, and whether it works after a reboot.",
    "For each failing case, groups write the commands that fix it and the checks they would run after rebooting.",
    "Groups mark which step of the checklist (service, network, firewall) each failure belongs to.",
    "The class compiles results on the whiteboard and the teacher confirms the answers."
   ]
  },
  "discussion": [
   "Why does testing immediately after configuration hide persistence problems?",
   "Why does firewalld separate runtime and permanent configuration? When is that useful?",
   "What could go wrong for a service that binds to a specific address if it starts before the network is online?"
  ],
  "exit": [
   [
    "Write the command that enables httpd at boot and starts it now.",
    "systemctl enable --now httpd"
   ],
   [
    "Write the two commands that permanently allow the https service and apply the change.",
    "firewall-cmd --permanent --add-service=https, then firewall-cmd --reload"
   ],
   [
    "Which nmcli property must be yes for a connection to come up at boot?",
    "connection.autoconnect"
   ]
  ],
  "differentiation": [
   "Support: Give students a printed four-box checklist (service enabled, connection autoconnects, firewall rule permanent, reboot test) with the exact verification command in each box.",
   "Extend: Ask fast finishers to describe how they would write a custom systemd unit for a small network daemon that must start only after the network is online, naming the After= and Wants= directives and explaining why both are needed."
  ]
 },
 {
  "t": "Restricting network access with firewalld and firewall-cmd (services, ports, zones, --permanent, --reload)",
  "objectives": [
   "Students will be able to explain the roles of zones, services and ports in firewalld.",
   "Students will be able to open and close services and ports permanently with firewall-cmd and apply them with --reload.",
   "Students will be able to distinguish runtime from permanent configuration and predict what survives a reload or reboot.",
   "Students will be able to verify firewall state with --list-all and --get-active-zones."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take three or four answers. Write the words runtime and permanent on opposite sides of the board and leave them there for the lesson."
   ],
   [
    15,
    "Teach",
    "Explain zones, services and ports with the front-desk analogy. Project the command sequence from the lesson and narrate each line, stressing that --permanent saves without applying and --reload applies the saved set. Show sample --list-all output and point to the services and ports lines."
   ],
   [
    15,
    "Activity",
    "Run the sticky note versus rulebook card activity in pairs. Circulate and ask each pair to justify why a given rule is or is not active after the event on the card."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the activity to the exam: why the grader's reboot matters and where else a connection can fail."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in at the door."
   ]
  ],
  "warmup": "A web app works when you test it on the server itself but not from any other computer. List three different things that could be blocking it.",
  "activity": {
   "title": "Sticky note versus rulebook",
   "materials": "Whiteboard, sticky notes in two colors, and printed cards the teacher prepares, each listing a short sequence of firewall-cmd commands followed by an event such as reload, reboot or nothing.",
   "steps": [
    "Give each pair a stack of command cards and two sticky note colors: one color for runtime and one for permanent.",
    "For each card, students place sticky notes for every rule in the runtime column and the permanent column on a small table they draw on paper.",
    "When the card ends with an event, students update the table: a reload or reboot copies permanent into runtime and removes runtime-only notes.",
    "Students write the --list-all services and ports they would expect to see at the end of each card.",
    "Pairs swap one tricky card with another pair and check each other's answers, then the teacher reveals the key on the projector."
   ]
  },
  "discussion": [
   "Why might an administrator deliberately make runtime-only changes first instead of going straight to --permanent?",
   "If the firewall is open and the service still cannot be reached, what other gates would you check, and in what order?"
  ],
  "exit": [
   [
    "What does firewall-cmd --permanent --add-service=https do on its own?",
    "It saves https to the permanent configuration of the default zone but does not apply it until firewall-cmd --reload."
   ],
   [
    "Write the commands to permanently open UDP port 5353 and apply the change.",
    "firewall-cmd --permanent --add-port=5353/udp, then firewall-cmd --reload."
   ],
   [
    "Which command shows which zones are in use and by which interfaces?",
    "firewall-cmd --get-active-zones."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column template already labeled runtime and permanent, and start them on cards with only one command each before moving to longer sequences.",
   "Extend: Ask fast finishers to write a card where --runtime-to-permanent is the best answer, and explain how it differs from adding every rule twice."
  ]
 },
 {
  "t": "Using nmtui as a text-based alternative to nmcli",
  "objectives": [
   "Students will be able to navigate nmtui to edit a connection, activate a connection and set the hostname.",
   "Students will be able to configure a static IPv4 address, gateway and DNS server in nmtui using CIDR notation.",
   "Students will be able to explain why a saved profile must be reactivated and perform the reactivation.",
   "Students will be able to verify network settings with ip addr, ip route, /etc/resolv.conf and hostnamectl."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board under two headings: typed commands and menus."
   ],
   [
    12,
    "Teach",
    "Project screenshots or a live nmtui session. Walk through the three menu options, the IPv4 Manual setting, the Show button, CIDR addresses and the Automatically connect box. Emphasize that OK saves but does not apply."
   ],
   [
    18,
    "Activity",
    "Run the paper nmtui form activity. Pairs fill in a printed form from a task card, then trade with another pair who checks it and writes the activation and verification commands."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, focusing on when each tool is the better choice and what the grader's reboot means for autoconnect."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "Would you rather change a network setting by typing an exact command or by filling in a form on screen? What could go wrong with each?",
  "activity": {
   "title": "Paper nmtui form",
   "materials": "Printed copies of a mock nmtui Edit Connection form drawn by the teacher (profile name, device, IPv4 method, Addresses, Gateway, DNS servers, Automatically connect box), printed task cards with addressing requirements, pens, and a projector. If student laptops can reach a lab VM, the same steps can be done live.",
   "steps": [
    "Give each pair a task card, for example: static address 10.20.30.40/24, gateway 10.20.30.1, DNS 10.20.30.53, hostname web1.",
    "Pairs fill in the printed form exactly as they would in nmtui, including the method, CIDR address and the autoconnect check box.",
    "On the back of the form, pairs write the steps needed after pressing OK to make the change live, and the four commands they would use to verify it.",
    "Pairs swap forms with another pair, who marks any missing prefix, unticked autoconnect or missing activation step.",
    "The teacher shows a completed model form on the projector and the class compares."
   ]
  },
  "discussion": [
   "In what situations would you choose nmcli over nmtui, even if nmtui feels easier?",
   "Why does an unticked Automatically connect box matter more on the exam than it does when you are testing by hand?"
  ],
  "exit": [
   [
    "Which nmtui menu do you use after saving a profile to make the new address active?",
    "Activate a connection, where you deactivate and then activate the profile."
   ],
   [
    "How should the address 192.168.5.7 with netmask 255.255.255.0 be entered in nmtui?",
    "As 192.168.5.7/24 in the Addresses field."
   ],
   [
    "Name two commands that confirm the change worked.",
    "Any two of ip addr, ip route, cat /etc/resolv.conf, nmcli con show name, or hostnamectl for the hostname."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed form with the method already set to Manual and a cheat card that converts common netmasks to prefix lengths.",
   "Extend: Ask fast finishers to write the equivalent nmcli con mod command for their form and explain which property each nmtui field maps to."
  ]
 },
 {
  "t": "Creating, deleting and modifying local user accounts (useradd -u -G -s -c, usermod, userdel -r)",
  "objectives": [
   "Students will be able to create a user with a specified UID, comment, shell and supplementary groups using useradd.",
   "Students will be able to modify existing accounts with usermod, correctly using -aG to append groups.",
   "Students will be able to compare userdel and userdel -r and identify leftover files with find / -nouser.",
   "Students will be able to verify account properties with id and getent passwd."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question, collect answers, and write the properties students name (name, ID, home, groups, shell, password) on the board."
   ],
   [
    13,
    "Teach",
    "Walk through useradd defaults, then the options -u, -g, -G, -s, -c, -d and -r. Demonstrate or project usermod -G versus usermod -aG with id output before and after. Finish with userdel versus userdel -r."
   ],
   [
    17,
    "Activity",
    "Run the keycard requests activity. Pairs translate HR requests into commands and predict id output."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions, connecting orphaned files to security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a slip of paper."
   ]
  ],
  "warmup": "When a new employee joins a company, what pieces of information does the IT team need to create their computer account?",
  "activity": {
   "title": "Keycard requests",
   "materials": "Printed request cards written by the teacher in plain HR language (for example: new hire Lena Cho, ID 2200, needs the design and print groups), whiteboard, and student laptops with a browser-based Linux terminal or a lab VM if available.",
   "steps": [
    "Give each pair five request cards covering creation, adding a group, changing a shell, renaming and removing a leaver.",
    "Pairs write the exact command for each card on paper and predict the id output afterwards.",
    "One card deliberately describes an existing user's groups; pairs must notice that -aG is needed to keep them.",
    "If laptops with a terminal are available, pairs run their commands and compare the real id output with their prediction.",
    "Volunteers write their answers on the board and the class corrects any -G versus -aG or userdel versus userdel -r errors."
   ]
  },
  "discussion": [
   "Why is it a security problem to delete a user but leave their files behind?",
   "Why might an organization insist on specific UIDs instead of letting useradd choose the next free number?"
  ],
  "exit": [
   [
    "Write a command to create user maria with UID 2400, comment Maria Lopez and supplementary group sales.",
    "useradd -u 2400 -c 'Maria Lopez' -G sales maria (followed by passwd maria to set a password)."
   ],
   [
    "User ken is in groups wheel and qa. What is the result of usermod -G hr ken?",
    "Ken's supplementary groups become only hr; he loses wheel and qa."
   ],
   [
    "How do you remove user temp1 along with the home directory?",
    "userdel -r temp1."
   ]
  ],
  "differentiation": [
   "Support: Give students an option reference card mapping each letter (-u, -g, -G, -s, -c, -d, -r, -a) to a plain-English meaning, and start them on single-option cards.",
   "Extend: Ask fast finishers to write a short shell loop that creates five users from a list, sets a UID for each, and verifies them with id."
  ]
 },
 {
  "t": "Non-interactive shells for service accounts (/sbin/nologin)",
  "objectives": [
   "Students will be able to explain why service accounts should not allow interactive logins.",
   "Students will be able to create or modify an account with /sbin/nologin as its shell using useradd -s or usermod -s.",
   "Students will be able to verify a user's shell with getent passwd and su -.",
   "Students will be able to compare /sbin/nologin with /bin/false and with account locking."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Steer toward the idea that programs run as users too."
   ],
   [
    12,
    "Teach",
    "Show an /etc/passwd line and point to the seventh field. Demonstrate or project useradd -s /sbin/nologin and usermod -s, then the su - test. Explain what nologin does and does not block, and compare /bin/false."
   ],
   [
    18,
    "Activity",
    "Run the account audit activity with printed passwd excerpts."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on least privilege and the limits of nologin."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your computer runs programs like a web server and a backup tool. Should those programs run as you, as the administrator, or as their own separate accounts? Why?",
  "activity": {
   "title": "Account audit",
   "materials": "Printed excerpts of a fictional /etc/passwd file with about twelve lines mixing people and service accounts (some service accounts wrongly given /bin/bash), highlighters, and a whiteboard.",
   "steps": [
    "Hand each pair a passwd excerpt and ask them to label each line as person or service using the name, UID and comment fields.",
    "Pairs highlight every service account that has an interactive shell and write the usermod command to fix each one.",
    "Pairs identify any account whose shell is /bin/false and decide whether to change it, explaining their reasoning.",
    "For one service account, pairs write what extra step they would take if the account must not authenticate at all.",
    "Pairs present one finding each while the teacher records the commands on the board."
   ]
  },
  "discussion": [
   "If nologin does not stop authentication, why is it still worth using?",
   "How would you explain to a frustrated user why their contractor account now says This account is currently not available?"
  ],
  "exit": [
   [
    "Write a command that creates a system account named logsvc that cannot log in interactively.",
    "useradd -r -s /sbin/nologin logsvc."
   ],
   [
    "Which field of /etc/passwd holds the login shell, and how can you print only that field for user ana?",
    "The seventh field; getent passwd ana | cut -d: -f7."
   ],
   [
    "Can root still run a command as a user whose shell is /sbin/nologin?",
    "Yes, with sudo -u or runuser, because nologin only blocks interactive logins."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the seven passwd fields that students can keep beside the excerpt while auditing.",
   "Extend: Ask fast finishers to write a one-line command that lists every account with a UID below 1000 whose shell is not /sbin/nologin, using getent and awk."
  ]
 },
 {
  "t": "Changing passwords (passwd, passwd --stdin) and adjusting password aging (chage -M -m -W -E -d 0)",
  "objectives": [
   "Students will be able to set and reset user passwords with passwd, including the --stdin option for scripts.",
   "Students will be able to apply password aging with chage -M, -m, -W and -I and read the result with chage -l.",
   "Students will be able to force a password change at next login with chage -d 0.",
   "Students will be able to distinguish password expiry from account expiry and choose -d 0 or -E correctly."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers. Introduce the two kinds of expiry using the library card analogy."
   ],
   [
    13,
    "Teach",
    "Demonstrate passwd as root and as a user, and passwd --stdin. Project chage -l output and map each line to its option letter. Stress -d 0 versus -E 0 and -m versus -M."
   ],
   [
    17,
    "Activity",
    "Run the policy to command card match activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions about usability and security tradeoffs of aging rules."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your bank asks you to change your password every few months and sends a reminder first. What settings would a system need to store to do that?",
  "activity": {
   "title": "Policy to command match",
   "materials": "Printed cards: one set with plain-language policy statements (for example, warn users ten days before their password expires), a second set with chage commands, and a third set with chage -l output lines. Whiteboard for the answer key.",
   "steps": [
    "Give each group of three all three card sets, shuffled.",
    "Groups match each policy card with the chage command that implements it and the chage -l line that would show it.",
    "Include two trap cards, one using -E 0 where -d 0 was intended and one swapping -m and -M; groups must identify and fix them.",
    "Groups write one new policy card of their own and pass it to another group to solve.",
    "The teacher reveals the answer key on the board and groups score themselves."
   ]
  },
  "discussion": [
   "Very short maximum password ages can lead users to write passwords down. How should an administrator balance aging rules against usability?",
   "Why is chage -d 0 safer than emailing a new hire a permanent password?"
  ],
  "exit": [
   [
    "Write the command to make carla's password expire every 30 days with 5 days of warning.",
    "chage -M 30 -W 5 carla."
   ],
   [
    "Which command forces ben to choose a new password at his next login?",
    "chage -d 0 ben (or passwd -e ben)."
   ],
   [
    "After chage -E 2026-09-01 temp2, what happens on 2 September 2026 if temp2 types the correct password?",
    "The login is refused because the account has expired, regardless of the password."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card listing each chage letter, its meaning and an example value, and pair them with a partner for the trap cards.",
   "Extend: Ask fast finishers to explain how the inactive period (-I) interacts with -M, and design a policy that uses all of -M, -m, -W, -I and -E together."
  ]
 },
 {
  "t": "Default aging in /etc/login.defs and account defaults in /etc/default/useradd and /etc/skel",
  "objectives": [
   "Students will be able to identify which settings live in /etc/login.defs, /etc/default/useradd and /etc/skel.",
   "Students will be able to change default password aging for new accounts with PASS_MAX_DAYS, PASS_MIN_DAYS and PASS_WARN_AGE.",
   "Students will be able to explain why default changes do not affect existing accounts and apply chage to existing users.",
   "Students will be able to verify defaults with useradd -D, ls -a and chage -l."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the idea of templates."
   ],
   [
    12,
    "Teach",
    "Project an excerpt of each file. Walk through the aging lines and ID ranges in login.defs, the useradd -D output, and ls -a /etc/skel. Emphasize that defaults only apply at creation time."
   ],
   [
    18,
    "Activity",
    "Run the which-file sort activity followed by a short new-versus-existing scenario round."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on reading task wording."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a company changes its email signature template today, do emails people already sent last week change? How is that like setting defaults on a computer?",
  "activity": {
   "title": "Which file sorts it",
   "materials": "Printed setting cards (PASS_MAX_DAYS, SHELL, a .bashrc file, UID_MIN, HOME, CREATE_HOME, a README, EXPIRE, ENCRYPT_METHOD, UMASK and so on), three labeled areas on the whiteboard or desks for the three locations, and printed scenario cards.",
   "steps": [
    "Groups sort each setting card into /etc/login.defs, /etc/default/useradd or /etc/skel.",
    "The teacher checks each group's sort and asks them to justify any card they hesitated on.",
    "Groups then draw scenario cards, such as new users must get zsh or all users must change passwords every 60 days, and write the exact changes needed.",
    "For each scenario, groups mark whether existing users are affected and, if so, write the chage or usermod command needed for them.",
    "Groups share one scenario answer with the class for feedback."
   ]
  },
  "discussion": [
   "Why might an exam task deliberately say new users rather than all users, and how should that change your answer?",
   "What are the risks of editing /etc/login.defs carelessly, for example changing UID_MIN on a running system?"
  ],
  "exit": [
   [
    "Which file and setting make new users' passwords expire after 30 days?",
    "/etc/login.defs with PASS_MAX_DAYS 30."
   ],
   [
    "Which command shows the default shell new users will receive?",
    "useradd -D."
   ],
   [
    "After adding a file to /etc/skel, existing user amy does not have it. Is something wrong?",
    "No; skeleton files are copied only when a home directory is created, so existing homes are unaffected."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column cheat sheet with two example settings already filled in for each location.",
   "Extend: Ask fast finishers to write a short loop that applies chage -M 30 to every existing user with a UID of 1000 or more, using getent passwd and awk."
  ]
 },
 {
  "t": "Creating, deleting and modifying local groups and memberships (groupadd -g, usermod -aG, gpasswd)",
  "objectives": [
   "Students will be able to create, rename and delete groups with groupadd -g, groupmod and groupdel.",
   "Students will be able to add and remove members with usermod -aG, gpasswd -a, gpasswd -d and gpasswd -M.",
   "Students will be able to explain why group changes apply only to new login sessions.",
   "Students will be able to verify group configuration with getent group, id and groups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch a shared folder with several users pointing at it on the board."
   ],
   [
    13,
    "Teach",
    "Explain user private groups, then demonstrate groupadd -g, groupmod -n, groupdel and the primary group restriction. Compare usermod -aG with gpasswd -a, -d, -M and -A, showing getent group output after each."
   ],
   [
    17,
    "Activity",
    "Run the roster changes role-play with sticky notes on a whiteboard group table."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Five people need access to the same folder. Would you rather set permissions for each person or for a team? What happens when someone leaves?",
  "activity": {
   "title": "Roster changes role-play",
   "materials": "Whiteboard drawn as an /etc/group table with columns for name, GID and members; sticky notes with student-chosen usernames; printed request cards written by the teacher.",
   "steps": [
    "Students each write a username on a sticky note. One student plays the administrator at the board.",
    "The teacher reads a request card, such as create group design with GID 4100 or remove raj from finance only.",
    "The class calls out the exact command, and the administrator updates the board by moving sticky notes or writing new rows.",
    "Include a gpasswd -M card and a usermod -G without -a card so the class sees members disappear.",
    "Rotate the administrator role every few cards; finish with a groupdel card that must fail because the group is a primary group, and ask the class how to fix it."
   ]
  },
  "discussion": [
   "When would you prefer gpasswd -M over a series of gpasswd -a commands?",
   "What could go wrong if two servers sharing files used different GIDs for the same group name?"
  ],
  "exit": [
   [
    "Write a command to create group qa with GID 6000.",
    "groupadd -g 6000 qa."
   ],
   [
    "How do you add dev1 to group qa without changing dev1's other groups? Give two ways.",
    "usermod -aG qa dev1, or gpasswd -a dev1 qa."
   ],
   [
    "dev1 was added to qa but cannot access qa files in an open terminal. What should dev1 do?",
    "Log out and back in (start a new login session) so the new group membership is loaded."
   ]
  ],
  "differentiation": [
   "Support: Provide a command card that groups the tools by side: user side (usermod -aG) and group side (gpasswd -a, -d, -M, -A), with one example each.",
   "Extend: Ask fast finishers to design a shared directory for the qa group with setgid, write the full sequence of commands, and predict the ls -ld output."
  ]
 },
 {
  "t": "Account databases: /etc/passwd, /etc/shadow, /etc/group; id and getent",
  "objectives": [
   "Students will be able to identify every field in /etc/passwd, /etc/shadow and /etc/group.",
   "Students will be able to interpret shadow hash prefixes such as `!`, `!!`, `*` and `$6$` to determine password status.",
   "Students will be able to explain why primary group members are not listed in /etc/group.",
   "Students will be able to verify accounts with id and getent and extract single fields with cut."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a single /etc/passwd line on the projector and ask the warm-up question. Collect guesses for each field."
   ],
   [
    12,
    "Teach",
    "Walk through all three files field by field, using the office records analogy. Highlight the x placeholder, shadow hash prefixes and the primary group subtlety. Demonstrate id and getent, including getent passwd user | cut -d: -f7."
   ],
   [
    18,
    "Activity",
    "Run the account detective activity with printed excerpts."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on why sensitive data was moved to shadow and why getent matters with directory services."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here is a line of text with seven parts separated by colons. What do you think each part means?",
  "activity": {
   "title": "Account detective",
   "materials": "Printed excerpts of fictional /etc/passwd, /etc/shadow and /etc/group files for the same small system, a list of investigation questions, highlighters, and a whiteboard for answers.",
   "steps": [
    "Give each pair the three excerpts and ten investigation questions, such as which users have no password set or which shell does user kim use.",
    "Pairs answer each question and note which file and field gave them the answer.",
    "Include one question asking for all members of a group where one member belongs only through their primary GID, so pairs must combine passwd and group.",
    "Pairs write the id output they would expect for two chosen users.",
    "The class compares answers on the board, and the teacher explains any disagreement using the field diagrams."
   ]
  },
  "discussion": [
   "Why do you think password hashes were moved out of the world-readable /etc/passwd into /etc/shadow?",
   "On a server that gets accounts from a central directory, what could go wrong if an administrator only ever used grep on /etc/passwd?"
  ],
  "exit": [
   [
    "In alice:x:2001:3000:Alice Ng:/home/alice:/bin/bash, what is alice's primary GID and shell?",
    "Primary GID 3000; shell /bin/bash."
   ],
   [
    "A shadow line shows `bob:!!:20100:0:99999:7:::`. What does that tell you about bob's password?",
    "No password has been set or it is locked, so bob cannot log in with a password."
   ],
   [
    "Which command lists all of carol's groups, including her primary group?",
    "id carol."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students labeled field diagrams for all three files to keep beside the excerpts during the activity.",
   "Extend: Ask fast finishers to write a one-line command that lists every user whose shadow hash field begins with an exclamation mark, using getent shadow and awk."
  ]
 },
 {
  "t": "Configuring superuser access: the wheel group, /etc/sudoers.d/ drop-ins and visudo",
  "objectives": [
   "Students will be able to explain why sudo is preferred to shared root logins.",
   "Students will be able to grant full administrative rights by adding a user to the wheel group.",
   "Students will be able to write sudoers rules in a drop-in file with visudo -f, including group rules and NOPASSWD with full command paths.",
   "Students will be able to verify and troubleshoot sudo rights with sudo -l, visudo -c and drop-in naming rules."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas about shared passwords and accountability."
   ],
   [
    13,
    "Teach",
    "Explain the default %wheel rule and usermod -aG wheel. Break down the who, hosts, run-as and commands parts of a rule on the board. Show visudo -f, visudo -c, the dot-in-filename rule and sudo -l -U."
   ],
   [
    17,
    "Activity",
    "Run the rule builder and reviewer activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on least privilege and NOPASSWD."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Four people share one master password for a system. Something goes wrong at 2 a.m. What problems does the shared password create when you investigate?",
  "activity": {
   "title": "Rule builder and reviewer",
   "materials": "Printed request cards written by the teacher (for example, the helpdesk group may reset passwords with /usr/bin/passwd as root), blank rule strips, a projector, and printed file name cards such as admins, web.conf, ops~ and deploy.",
   "steps": [
    "Each pair draws three request cards and writes one sudoers rule for each on a strip, using full paths and the percent sign for groups.",
    "Pairs swap strips with another pair, who act as visudo and mark any syntax or path mistakes.",
    "Pairs sort the file name cards into will be read and will be ignored, explaining the reason for each.",
    "For one request, pairs decide whether adding the user to wheel would be a simpler or a riskier solution.",
    "The teacher projects model answers and the class discusses any rules that grant more than the request required."
   ]
  },
  "discussion": [
   "When is NOPASSWD reasonable, and what risks does it introduce?",
   "Why is it better to put local rules in /etc/sudoers.d/ than to edit the main /etc/sudoers file?"
  ],
  "exit": [
   [
    "How do you give user lena full sudo rights without editing any sudoers file?",
    "usermod -aG wheel lena, then lena logs in again."
   ],
   [
    "Write a rule letting user web restart nginx as root without a password.",
    "web ALL=(root) NOPASSWD: /usr/bin/systemctl restart nginx, created with visudo -f in /etc/sudoers.d/."
   ],
   [
    "A rule in /etc/sudoers.d/team.rules has no effect. What is the likely cause?",
    "The file name contains a dot, so sudo ignores it; rename it to a name without a dot, such as team."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled rule template showing the four parts (who, hosts, run-as, commands) with blanks for students to fill in.",
   "Extend: Ask fast finishers to research and explain how a Cmnd_Alias could group several commands, and rewrite one rule using it."
  ]
 },
 {
  "t": "Locking and unlocking accounts (usermod -L, passwd -l, chage -E 0)",
  "objectives": [
   "Students will be able to lock and unlock passwords with usermod -L/-U and passwd -l/-u and recognize the change in /etc/shadow.",
   "Students will be able to expire and unexpire accounts with chage -E 0 and chage -E -1.",
   "Students will be able to compare password locking, account expiry and /sbin/nologin by what each blocks.",
   "Students will be able to choose the correct disabling method from a task description and verify it with passwd -S and chage -l."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the ways students think a person can log in to a server."
   ],
   [
    12,
    "Teach",
    "Show a shadow line before and after usermod -L. Explain why SSH keys bypass a password lock, then demonstrate chage -E 0 and chage -E -1 with chage -l output. Compare with nologin and stress that sessions keep running."
   ],
   [
    18,
    "Activity",
    "Run the what gets through grid activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions using the stolen laptop scenario."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List every way you can think of that someone might log in to a Linux server. Which of those ways need a password?",
  "activity": {
   "title": "What gets through grid",
   "materials": "Whiteboard or printed grid with rows for password lock, account expiry, nologin shell and lock plus expiry, and columns for password console login, SSH password, SSH key, su from another user and root running a command with runuser. Sticky notes marked yes and no, and printed scenario cards.",
   "steps": [
    "Groups fill in the grid with yes or no sticky notes for whether each access method still works under each control.",
    "The teacher reveals the answers column by column, asking groups to justify any disagreements.",
    "Groups draw scenario cards, such as a lost laptop with SSH keys or an employee on parental leave, and write the exact commands to disable the account.",
    "Groups then write the commands needed to restore access when the person returns.",
    "Each group presents one scenario, and the class checks whether the chosen control blocks the threat described."
   ]
  },
  "discussion": [
   "In the stolen laptop case, what steps beyond locking the account would you take to protect the server?",
   "Why might an organization prefer expiring accounts on a schedule for contractors instead of remembering to lock them manually?"
  ],
  "exit": [
   [
    "What does passwd -l do, and what does it not stop?",
    "It locks the password by prefixing the hash with an exclamation mark; it does not stop SSH key logins."
   ],
   [
    "Which command makes user sam's account unusable by every login method?",
    "chage -E 0 sam."
   ],
   [
    "Write the commands to fully restore an account that was locked with usermod -L and expired with chage -E 0.",
    "usermod -U username and chage -E -1 username."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed grid with the password lock row filled in as a model.",
   "Extend: Ask fast finishers to explain how the inactive period set with chage -I interacts with password expiry, and when an account becomes locked out without any administrator action."
  ]
 },
 {
  "t": "Configuring firewall settings with firewall-cmd: zones, services, ports, sources, runtime vs permanent",
  "objectives": [
   "Students will be able to explain how firewalld selects a zone using source, interface and default zone in that order.",
   "Students will be able to restrict a service to a source network using --add-source and per-zone services and ports.",
   "Students will be able to compare runtime and permanent configuration and use --runtime-to-permanent and --permanent --list-all.",
   "Students will be able to plan firewall changes on a remote system without locking themselves out."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and sketch a building with two entrances on the board."
   ],
   [
    12,
    "Teach",
    "Explain the source, interface, default order with the SID memory aid. Walk through the predefined zones from drop to trusted. Project the source-binding command sequence and the outputs of --get-active-zones and --zone=internal --list-all. Compare runtime and permanent listings."
   ],
   [
    18,
    "Activity",
    "Run the packet sorting and policy design activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions about lockout risk and least privilege."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A building lets the public into the lobby but only staff from one office into the server room. How would a door decide who is who?",
  "activity": {
   "title": "Packet sorting and policy design",
   "materials": "Printed packet cards showing a source address, arrival interface and destination port; a printed firewall configuration with zones, sources, interfaces and services; a whiteboard; and student laptops with a browser for optional reading of the firewall-cmd man page.",
   "steps": [
    "Groups receive the printed configuration and a stack of packet cards.",
    "For each packet, groups decide which zone it lands in using source, then interface, then default, and whether it is accepted.",
    "Groups receive a policy request, such as allow SSH only from 10.1.1.0/24 and HTTPS from everyone, and write the full permanent command sequence.",
    "Groups reorder their commands so that a remote administrator on 10.1.1.0/24 would not be locked out at any step.",
    "Groups write the two listing commands they would run to confirm runtime and permanent configuration match, then compare with another group."
   ]
  },
  "discussion": [
   "When would you choose runtime changes followed by --runtime-to-permanent rather than permanent changes with a reload?",
   "Source bindings trust a network, not a person. What other controls would you combine with them on a sensitive server?"
  ],
  "exit": [
   [
    "A packet arrives on an interface in public from an address bound to internal. Which zone's rules apply?",
    "internal, because source bindings are checked before interface zones."
   ],
   [
    "Write the commands to allow SSH only from 10.0.9.0/24 using the internal zone, permanently.",
    "firewall-cmd --permanent --zone=internal --add-source=10.0.9.0/24; firewall-cmd --permanent --zone=internal --add-service=ssh; firewall-cmd --permanent --zone=public --remove-service=ssh; firewall-cmd --reload."
   ],
   [
    "How can you tell whether runtime and permanent firewall rules differ?",
    "Compare firewall-cmd --list-all with firewall-cmd --permanent --list-all for the zone."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart card for zone selection (source match, interface zone, default zone) to use during packet sorting.",
   "Extend: Ask fast finishers to design a policy using three zones, including drop for a known-bad network, and justify the choice of drop over block."
  ]
 },
 {
  "t": "Managing default file permissions with umask (shell and /etc/login.defs, ~/.bashrc)",
  "objectives": [
   "Students will be able to calculate the resulting file and directory modes for a given umask value.",
   "Students will be able to set a temporary umask and make it persistent for one user or for all users.",
   "Students will be able to explain why the umask cannot grant execute and does not affect existing files.",
   "Students will be able to choose the correct umask and configuration file for an exam-style requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and collect a few guesses. Write 666 and 777 on the board and tell students these are what programs ask for before anything is taken away."
   ],
   [
    12,
    "Teach",
    "Explain the umask as bits removed. Work through 022, 002, 077 and 027 on the board for files and directories. Demonstrate umask, umask -S, touch and mkdir on the projector. Then show where persistence lives: ~/.bashrc, ~/.bash_profile, /etc/profile.d/ and the UMASK line in /etc/login.defs."
   ],
   [
    18,
    "Activity",
    "Run the Mask Match card activity. Circulate and ask each pair to explain one answer aloud, especially any card involving execute bits or existing files."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect umask choices to private user groups and to services that set their own UMask."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "You create a file in a brand-new account and nobody ran chmod. Who do you think can read it, and who decided that?",
  "activity": {
   "title": "Mask Match",
   "materials": "Printed cards the teacher prepares (umask value cards, resulting mode cards, and requirement cards), whiteboard, markers, student laptops with a browser for an optional online Linux terminal.",
   "steps": [
    "Give each pair a shuffled deck: eight umask cards (such as 022, 002, 027, 077, 007, 000), matching mode cards for files and directories, and four requirement cards such as only the owner may read new files.",
    "Pairs match each umask card to its file mode and directory mode, then place each requirement card next to the umask that meets it.",
    "For each requirement card, pairs write on a sticky note where they would put the setting: the current shell, ~/.bashrc, or /etc/profile.d/.",
    "Pairs swap tables and check another pair's matches, flagging any they disagree with.",
    "If laptops are available, pairs test two of their answers with umask, touch, mkdir and ls -ld in a browser-based Linux terminal."
   ]
  },
  "discussion": [
   "Why does RHEL's private user group scheme make a umask of 002 reasonable for regular users?",
   "A daemon writes files that are too open even after you changed every user's ~/.bashrc. What might be going on?"
  ],
  "exit": [
   [
    "With umask 027, what modes do new files and directories get?",
    "Files 640 and directories 750."
   ],
   [
    "Where do you set a persistent umask for every user's login shell?",
    "In a script in /etc/profile.d/ (or a system startup file such as /etc/bashrc); /etc/login.defs UMASK also affects home directory creation and login through PAM."
   ],
   [
    "Why does umask 000 not make new regular files executable?",
    "Programs request 666 for files and the umask only removes bits, so execute is never present to begin with."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed table of 666 and 777 in binary-style rwx columns and let them cross out the bits named by the umask before converting back to octal.",
   "Extend: Ask students to find every place on a RHEL system that sets a umask (login.defs, /etc/profile, /etc/bashrc, profile.d, user files, systemd UMask=) and explain which one wins for a login shell and for a service."
  ]
 },
 {
  "t": "Configuring key-based SSH authentication (ssh-keygen, ssh-copy-id, ~/.ssh permissions, sshd_config)",
  "objectives": [
   "Students will be able to explain how an SSH key pair authenticates a user without sending the private key.",
   "Students will be able to generate a key pair with ssh-keygen and install the public key with ssh-copy-id.",
   "Students will be able to identify the ownership and permission requirements for ~/.ssh and authorized_keys.",
   "Students will be able to configure PasswordAuthentication and PermitRootLogin safely in an sshd drop-in file."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers on the board under two headings: something you know and something you have."
   ],
   [
    12,
    "Teach",
    "Draw the client and server on the board, showing which key lives where. Demonstrate ssh-keygen, ssh-copy-id and a passwordless login on the projector. Show an sshd drop-in file, sshd -t and systemctl reload sshd, and explain the second-session test before closing your session."
   ],
   [
    18,
    "Activity",
    "Run the Why Is My Key Refused activity. Circulate and push pairs to name the exact command that would confirm each diagnosis."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions, linking passphrases to automation and root login policy to risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "A script must log in to another server every night at 1 a.m. with nobody at the keyboard. What could it use instead of a typed password, and what would you need to protect?",
  "activity": {
   "title": "Why Is My Key Refused",
   "materials": "Printed case cards the teacher writes (each with ls -ld output, a short sshd_config excerpt or a journalctl line), whiteboard, sticky notes.",
   "steps": [
    "Give each pair four case cards. Each describes a user whose key login fails, with evidence such as directory modes, file ownership, which file the key was pasted into, or an sshd setting.",
    "Pairs identify the root cause on each card and write the fix as exact commands on a sticky note, such as chmod 700 ~/.ssh or restorecon -Rv ~/.ssh.",
    "Include one card where PasswordAuthentication no was set before the key was installed, and ask pairs how the admin should have avoided the lockout.",
    "Pairs post their sticky notes on the board under each case number, and the class compares fixes.",
    "Finish by having pairs write the correct mode for the home directory, ~/.ssh, authorized_keys and the private key from memory."
   ]
  },
  "discussion": [
   "When is an empty passphrase acceptable, and what other controls would you want around that key?",
   "Why might an organization choose PermitRootLogin prohibit-password instead of no?"
  ],
  "exit": [
   [
    "Where does the public key go so that student can log in to serverb with a key?",
    "Into /home/student/.ssh/authorized_keys on serverb, usually with ssh-copy-id student@serverb."
   ],
   [
    "What modes should ~/.ssh and authorized_keys have?",
    "~/.ssh 700 and authorized_keys 600, owned by the user, with the home directory not writable by group or other."
   ],
   [
    "Which steps should you take before closing your session after setting PasswordAuthentication no?",
    "Run sshd -t, reload sshd, and confirm key login works in a second session."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram showing client files (id_ed25519, id_ed25519.pub) and server files (authorized_keys) with their required modes, and let students refer to it during the activity.",
   "Extend: Ask students to explain how drop-in ordering in /etc/ssh/sshd_config.d/ interacts with the first-value-wins rule, and to write a drop-in that allows root key login only while refusing all passwords."
  ]
 },
 {
  "t": "Setting SELinux enforcing and permissive modes (getenforce, setenforce, /etc/selinux/config)",
  "objectives": [
   "Students will be able to describe the enforcing, permissive and disabled SELinux modes and when each is appropriate.",
   "Students will be able to check the current and configured mode with getenforce and sestatus.",
   "Students will be able to change the mode at runtime with setenforce and persistently in /etc/selinux/config.",
   "Students will be able to restore enforcing mode on a system where SELinux was disabled, including a relabel."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take quick answers. Write runtime and boot time as two columns on the board."
   ],
   [
    12,
    "Teach",
    "Explain mandatory access control in one sentence, then the three modes. Demonstrate getenforce, sestatus, setenforce 0 and 1, and the SELINUX= line in /etc/selinux/config on the projector. Place each command under runtime or boot time on the board, and explain /.autorelabel."
   ],
   [
    18,
    "Activity",
    "Run the Mode Doctor activity. Circulate and ask each pair what the grader would see after a reboot for each of their answers."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce that permissive is diagnostic, not a fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "If you change a setting and it looks right on screen, how can you be sure it will still be right after the server restarts?",
  "activity": {
   "title": "Mode Doctor",
   "materials": "Printed patient cards the teacher prepares (each with getenforce output, sestatus output and the SELINUX= line from the config file), whiteboard, markers.",
   "steps": [
    "Give each pair five patient cards showing different states, such as Permissive with config enforcing, Enforcing with config permissive, and Disabled with config disabled.",
    "For each card, pairs write what the mode will be after a reboot and why.",
    "Pairs then write the minimal command sequence to make the system enforcing now and after reboot, including touch /.autorelabel where needed.",
    "Two pairs compare answers on each card and settle disagreements by pointing to the runtime and boot time columns on the board.",
    "The teacher reveals one tricky card where selinux=0 is on the kernel command line and asks the class what else must change."
   ]
  },
  "discussion": [
   "Why is permissive mode useful for troubleshooting but dangerous to leave in place?",
   "Why does coming back from disabled require a full relabel, while switching from permissive to enforcing does not?"
  ],
  "exit": [
   [
    "Which command switches a running system to enforcing, and does it persist?",
    "setenforce 1; it does not persist past reboot without SELINUX=enforcing in /etc/selinux/config."
   ],
   [
    "What does permissive mode do with a forbidden access?",
    "It logs the would-be denial but allows the access."
   ],
   [
    "A system has SELinux disabled and must enforce. List the steps.",
    "Set SELINUX=enforcing in /etc/selinux/config, ensure selinux=0 is not on the kernel command line, touch /.autorelabel, reboot, and verify with sestatus."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column reference card listing runtime commands (getenforce, setenforce) and boot-time settings (/etc/selinux/config, kernel arguments) to use during the activity.",
   "Extend: Ask students to explain the difference between SELINUX=disabled in the config file and the selinux=0 kernel argument on current RHEL, and when enforcing=0 at the boot menu is the right tool."
  ]
 },
 {
  "t": "Listing and identifying SELinux file and process contexts (ls -Z, ps -eZ, id -Z)",
  "objectives": [
   "Students will be able to name the four fields of an SELinux context and identify the type as the deciding field in targeted policy.",
   "Students will be able to display file, directory, process and session contexts with ls -Z, ls -dZ, ps -eZ and id -Z.",
   "Students will be able to explain why cp and mv produce different labels for the same file.",
   "Students will be able to spot a mislabeled file by comparing its actual label with the expected one."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up scenario and ask students to list everything they would check. Note that nobody can see the hidden label yet."
   ],
   [
    12,
    "Teach",
    "Write a full context on the board and label each field. Demonstrate ls -Z, ls -dZ, ps -eZ and id -Z on the projector. Show cp and mv of a file from a home directory into /var/www/html and compare labels, then show matchpathcon."
   ],
   [
    18,
    "Activity",
    "Run the Spot the Wrong Wristband activity. Circulate and ask pairs to explain how each mislabeled file probably got its label."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect labels with permissions and with backup tools."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Two files sit side by side with identical permissions and owners, but the web server serves one and refuses the other. What could possibly be different?",
  "activity": {
   "title": "Spot the Wrong Wristband",
   "materials": "Printed listings the teacher prepares (ls -Z output for a directory, ps -eZ output for several services), highlighters, whiteboard.",
   "steps": [
    "Give each pair a printed ls -Z listing of /var/www/html with about ten files, two of which carry admin_home_t or user_home_t labels.",
    "Pairs highlight the type field on every line and circle any file whose type differs from httpd_sys_content_t.",
    "Pairs then read a ps -eZ excerpt and match each service process type to the file types it should read.",
    "For each circled file, pairs write how it probably got that label (mv from a home directory, tar without --selinux) and what command shows the expected label.",
    "Pairs report one finding to the class while the teacher records the causes on the board."
   ]
  },
  "discussion": [
   "Why does SELinux check labels in addition to permissions rather than replacing them?",
   "When would preserving original labels with cp -a or tar --selinux be helpful, and when would it cause trouble?"
  ],
  "exit": [
   [
    "Name the four fields of an SELinux context in order.",
    "User, role, type and level."
   ],
   [
    "Which command shows the label of a directory itself?",
    "ls -dZ followed by the directory path."
   ],
   [
    "A file was moved with mv from /root into /var/www/html. What label will it likely have and why?",
    "admin_home_t, because mv keeps the existing file's label instead of inheriting the directory's type."
   ]
  ],
  "differentiation": [
   "Support: Provide a color-coded printout where each context field is a different color, and have students only look at the type color during the activity.",
   "Extend: Ask students to use ss -Z and ps -eZ together to map which process type owns which listening socket, and to explain what unconfined_t means for commands they run in their own shell."
  ]
 },
 {
  "t": "Restoring default file contexts (restorecon -Rv) and adding rules with semanage fcontext",
  "objectives": [
   "Students will be able to explain the difference between the policy's expected label for a path and a file's actual label.",
   "Students will be able to restore policy labels with restorecon -Rv and preview changes with -n.",
   "Students will be able to add a persistent file context rule with semanage fcontext and apply it.",
   "Students will be able to compare chcon with semanage fcontext plus restorecon and choose the persistent method."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Draw two boxes on the board labeled policy says and file has."
   ],
   [
    12,
    "Teach",
    "Demonstrate restorecon -Rv on files moved into /var/www/html. Then create /web, show it gets default_t, add a semanage fcontext rule, and apply it with restorecon. Finally show chcon working and then being undone by restorecon."
   ],
   [
    18,
    "Activity",
    "Run the Relabel Relay activity. Circulate and check that every team writes the restorecon step after each semanage command."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare quick tests with persistent fixes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You fix something on a server and it works. A week later, after routine maintenance, it is broken again. What kinds of fixes are likely to disappear like that?",
  "activity": {
   "title": "Relabel Relay",
   "materials": "Printed scenario cards the teacher prepares, whiteboard divided into team columns, markers.",
   "steps": [
    "Split the class into teams of three and give each team five scenario cards, such as files moved into /var/www/html, a new content directory /srv/app, and an existing chcon fix that must become persistent.",
    "Each team member in turn writes one command on the board for the current card, then hands the marker to the next member.",
    "Teams must decide for each card whether restorecon alone is enough or whether a semanage fcontext rule is needed first.",
    "After each card, the team writes one verification command, such as ls -Z, restorecon -Rnv or semanage fcontext -l -C.",
    "The teacher reviews each column and awards points for correct order, quoted regular expressions and correct verification."
   ]
  },
  "discussion": [
   "When is chcon a reasonable tool to use, given that it is not persistent?",
   "How would you find the right type for a path when the task does not tell you which one to use?"
  ],
  "exit": [
   [
    "Which two commands make a custom directory /srv/site readable by Apache persistently?",
    "semanage fcontext -a -t httpd_sys_content_t '/srv/site(/.*)?' then restorecon -Rv /srv/site."
   ],
   [
    "What does restorecon -Rnv do?",
    "Shows recursively which labels would change, without changing anything."
   ],
   [
    "Why does restorecon undo a chcon change?",
    "restorecon applies the policy's rule for the path, and chcon did not change the policy."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart card: Is the label wrong? Does a rule for this path exist (matchpathcon)? If yes, restorecon. If no, semanage fcontext then restorecon.",
   "Extend: Ask students to add, modify and delete a rule with -a, -m and -d, and to explain why a more specific rule for a subdirectory can coexist with a broader rule for its parent."
  ]
 },
 {
  "t": "Managing SELinux port labels (semanage port -a -t http_port_t -p tcp)",
  "objectives": [
   "Students will be able to explain how SELinux port types control which ports a service may bind to.",
   "Students will be able to list port types and find a service's allowed ports with semanage port -l.",
   "Students will be able to add or modify a port label with semanage port -a or -m and the correct protocol.",
   "Students will be able to complete all three changes needed to run a service on a non-standard port."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student guesses. Circle any that mention SELinux and leave the others for later."
   ],
   [
    12,
    "Teach",
    "Show semanage port -l | grep -w http_port_t on the projector. Change Apache to Listen 82, show the failed start and the name_bind AVC, then add the port label and restart. Add the firewall rule and test from another host. Demonstrate the already defined error with 8080 and fix it with -m."
   ],
   [
    18,
    "Activity",
    "Run the Three Locks activity. Circulate and ask pairs which symptom each missing step would produce."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare port labels with firewall rules."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "You are root, nothing else is using port 82, and the config file is correct, but Apache still cannot listen on port 82. What could be stopping it?",
  "activity": {
   "title": "Three Locks",
   "materials": "Printed task cards and symptom cards the teacher prepares, whiteboard, markers, sticky notes.",
   "steps": [
    "Give each pair four task cards, such as run Apache on TCP 82, run SSH on TCP 2222, run Apache on TCP 8080, and a custom app on a port range.",
    "For each card, pairs write the three changes in order on sticky notes: service config, semanage port command with -a or -m, and firewall-cmd commands.",
    "Pairs then receive symptom cards (fails to start with name_bind, works locally but remote clients time out, already defined error) and match each to the missing or wrong step.",
    "Pairs swap their sticky notes with a neighboring pair, who checks protocol, type name and the choice between -a and -m.",
    "The class builds one master checklist on the whiteboard from the best answers."
   ]
  },
  "discussion": [
   "Why might SELinux restrict which ports a service binds to, when the firewall already restricts incoming traffic?",
   "How would you discover the port type for a service you have never configured before?"
  ],
  "exit": [
   [
    "Write the command to allow Apache to listen on TCP port 82.",
    "semanage port -a -t http_port_t -p tcp 82."
   ],
   [
    "Which SELinux permission appears in the AVC when a service cannot listen on an unlabeled port?",
    "name_bind."
   ],
   [
    "Besides the SELinux label, what two other changes does a web server on port 82 need?",
    "Listen 82 in the httpd configuration and a permanent firewall rule for 82/tcp followed by a reload."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank template: semanage port __ -t ____ -p ___ ____, with a word bank of options, types and protocols.",
   "Extend: Ask students to add a port range for a custom service, list it with semanage port -l -C, then remove it with -d and explain why built-in policy ports cannot be deleted."
  ]
 },
 {
  "t": "Using SELinux booleans (getsebool -a, setsebool -P, semanage boolean -l)",
  "objectives": [
   "Students will be able to explain what SELinux booleans are and why they exist.",
   "Students will be able to list and search booleans with getsebool -a and semanage boolean -l.",
   "Students will be able to set a boolean persistently with setsebool -P and verify it with semanage boolean -l -C.",
   "Students will be able to choose the narrowest boolean that satisfies a given requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about phone privacy settings and connect answers to the idea of safe defaults with optional switches."
   ],
   [
    12,
    "Teach",
    "Demonstrate getsebool -a | grep httpd, semanage boolean -l | grep -i home, setsebool without -P, then with -P. Explain the (current, default) pair and show semanage boolean -l -C before and after the persistent change."
   ],
   [
    18,
    "Activity",
    "Run the Find the Switch activity. Circulate and ask pairs to justify why their chosen boolean is the narrowest option."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh booleans against permissive mode."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Your phone ships with location sharing turned off for most apps. Why would a manufacturer choose that default, and when would you turn it on?",
  "activity": {
   "title": "Find the Switch",
   "materials": "A printed excerpt of semanage boolean -l output for about thirty httpd, nfs and ftp booleans, printed requirement cards, highlighters, whiteboard.",
   "steps": [
    "Give each pair the printed boolean excerpt and five requirement cards, such as serve personal pages from home directories, let a web app reach a remote database, and serve web content from NFS.",
    "Pairs search the descriptions with highlighters to find the boolean for each requirement, choosing the narrowest one when two could work.",
    "For each card, pairs write the full persistent command and the command they would use to verify it.",
    "Include one card where the excerpt shows (on , off) and ask pairs what that tells them and what it does not.",
    "Pairs present one card each, and the class votes on whether the chosen boolean is the narrowest fit."
   ]
  },
  "discussion": [
   "Why is turning on a boolean safer than switching SELinux to permissive?",
   "If a boolean is on and access still fails, what else would you check?"
  ],
  "exit": [
   [
    "Write the command to let Apache read users' home directories persistently.",
    "setsebool -P httpd_enable_homedirs on."
   ],
   [
    "What do the two values in parentheses in semanage boolean -l mean?",
    "The current value and the default value."
   ],
   [
    "How do you confirm that a boolean change will survive a reboot?",
    "Run semanage boolean -l -C and check that the boolean is listed with the new value."
   ]
  ],
  "differentiation": [
   "Support: Give students a short glossary of common boolean name parts (httpd, can_network_connect, use_nfs, enable_homedirs) to help them search the descriptions.",
   "Extend: Ask students to compare httpd_can_network_connect with httpd_can_network_connect_db and explain the least-privilege reasoning, then find a boolean for another service such as FTP or Samba in the printed list."
  ]
 },
 {
  "t": "Diagnosing routine SELinux denials: /var/log/audit/audit.log, ausearch -m AVC, sealert",
  "objectives": [
   "Students will be able to locate SELinux denials in /var/log/audit/audit.log and filter them with ausearch -m AVC.",
   "Students will be able to interpret the permission, scontext, tcontext and tclass fields of an AVC record.",
   "Students will be able to map a denial to the correct fix category: file label, port label or boolean.",
   "Students will be able to use sealert output critically and keep SELinux enforcing after the fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up question and collect answers. Write the four-step routine on the board: confirm, find, interpret, fix."
   ],
   [
    12,
    "Teach",
    "Project a raw AVC record and read it aloud as a sentence, circling permission, scontext, tcontext and tclass. Demonstrate ausearch -m AVC -ts recent -i, then journalctl -t setroubleshoot and sealert -l. Explain dontaudit and why audit2allow is a last resort."
   ],
   [
    18,
    "Activity",
    "Run the AVC Detectives activity. Circulate and ask each pair which field in the record led them to their fix."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce enforcing as the end state."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A website returns 403 Forbidden, the service is running and the file permissions look fine. If the server kept a detailed diary of every refusal, what would you want each entry to tell you?",
  "activity": {
   "title": "AVC Detectives",
   "materials": "Printed AVC record cards the teacher prepares (six realistic records covering wrong file labels, unlabeled ports and optional behaviors), fix cards, highlighters, whiteboard.",
   "steps": [
    "Give each pair six AVC record cards and a set of fix cards (restorecon, semanage fcontext plus restorecon, semanage port -a, semanage port -m, setsebool -P).",
    "Pairs highlight the permission, scontext, tcontext and tclass on each record and write a one-sentence plain reading of it.",
    "Pairs match each record to a fix card and write the exact command, including type names, paths, ports and protocols.",
    "Add one card that describes a failure with no AVC at all, and ask pairs what they would do and what they would check afterwards.",
    "Pairs compare answers with another pair, then the class reviews the trickiest records on the board."
   ]
  },
  "discussion": [
   "Why is building a custom module with audit2allow usually the wrong answer for routine denials?",
   "What risks come from leaving a server in permissive mode overnight to get a service working?"
  ],
  "exit": [
   [
    "Write the command to show interpreted AVC denials from the last ten minutes.",
    "ausearch -m AVC -ts recent -i."
   ],
   [
    "An AVC shows name_bind denied for httpd_t on a tcp_socket. Which fix category applies?",
    "A port label: semanage port -a (or -m) -t http_port_t -p tcp with the port number."
   ],
   [
    "An AVC shows httpd_t denied read on a file with tcontext user_home_t. What is the likely fix?",
    "Correct the file label with restorecon, or add a semanage fcontext rule and run restorecon if the path is custom."
   ]
  ],
  "differentiation": [
   "Support: Give students an annotated sample AVC with each field labeled and a three-row decision table (wrong file type, name_bind, optional action) to use while working.",
   "Extend: Ask students to explain how they would detect a dontaudit denial and to write a full verification sequence after a fix, including ausearch, getenforce and a retest of the failing action."
  ]
 }
]);
