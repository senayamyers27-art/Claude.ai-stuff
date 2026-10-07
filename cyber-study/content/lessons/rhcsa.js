/* Lessons for Red Hat Certified System Administrator (EX200 (RHEL 10)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("rhcsa", [
 {
  "t": "Using a shell prompt and running commands with correct syntax",
  "hook": "It is your first week as a junior administrator at Pinecrest Logistics, and Dana, the senior admin, hands you a ticket: clean out old log files on the shipping server. You open a terminal, type a quick command with a wildcard, and press Enter. Nothing prints. No error, no confirmation. Dana leans over and asks a simple question that makes your stomach drop: \"Which machine are you on, and which account are you using?\" You glance at the prompt for the first time. Did that command run where you thought it did, and did it touch only the files you meant?",
  "simple": "A shell is the program that listens to what you type in a text window and turns it into action. You type a line, press Enter, and the shell figures out which program you want and what you want it to work on. A line has three parts: the command (the tool), options (switches that change how the tool behaves, usually starting with a dash) and arguments (the things it works on, such as file names). Before running anything, the shell also fills in shortcuts, such as replacing *.log with the list of matching file names. It is a bit like telling a helper \"photocopy, double-sided, these three pages\": the job, how to do it, and what to do it to.",
  "body": [
   "Almost everything on the RHCSA (Red Hat Certified System Administrator) exam happens at a shell prompt. The shell on Red Hat Enterprise Linux (RHEL) is Bash, the Bourne Again SHell. It reads a line you type, splits it into words, expands special characters and then runs a program. Knowing exactly how it does that is what separates a command that works from one that silently does the wrong thing on a live exam system, where there is no undo and the grader checks only the end result.",
   "Start by reading the prompt, because it tells you who and where you are. A typical RHEL prompt looks like `[student@servera ~]$`: the user name, the short host name, the current directory (`~` means your home directory) and a final character that is `$` for a normal user and `#` for root. The exam gives you more than one machine and more than one account, so before you change anything, glance at the prompt. A task completed perfectly on the wrong host earns nothing, and a command run as root by accident can do far more damage than the same command run as a normal user.",
   "Next, learn the structure of a command line: the command name, then options, then arguments. Options change how the command behaves and usually start with a dash. Short options are single letters and can be grouped, so `ls -l -a -h` is the same as `ls -lah`. Long options start with two dashes and are spelled out, such as `ls --all`; they are easier to read in scripts. Arguments are what the command acts on, usually file names or directories. Spaces separate words, which is why a file name containing a space must be quoted (`'my file'`) or escaped with a backslash (`my\\ file`). Without that, the shell hands the command two separate arguments, and it may act on two files that do not exist, or worse, on two that do.",
   "```bash\nls -lah /etc/ssh          # command, grouped options, one argument\ncp --verbose a.txt b.txt   # long option, two arguments\ncommand1 ; command2        # run one after the other\nsleep 300 &                # run in the background\n```",
   "The shell also controls how commands run together. A semicolon runs commands one after another regardless of success. An ampersand at the end of a line, as in `sleep 300 &`, starts the command in the background and gives your prompt back immediately, printing a job number and a process ID (PID). These small symbols are part of the syntax, so a stray `&` or `;` inside an unquoted argument changes the meaning of the whole line.",
   "The most important idea in this lesson is expansion: the shell rewrites your line before the program ever sees it. Globs such as `*.conf` become the list of matching file names, `~` becomes your home directory, `$HOME` becomes the value of a variable and `$(date)` becomes a command's output. Because the shell does this, `rm *.log` and `rm a.log b.log` are identical from the point of view of `rm`; the program never knows a wildcard was typed. That is also why a glob that matches nothing can behave oddly, since Bash passes the literal text `*.log` to the command when no file matches. Use `echo` in front of a risky command (`echo rm *.log`) to preview exactly what the expansion will produce, then remove `echo` and run it for real.",
   "Bash also saves effort and prevents typos. Tab completes command and file names, and pressing it twice shows all the choices, which is the fastest way to type long paths such as `/etc/systemd/system/` correctly. The Up arrow and `history` recall earlier commands, `Ctrl+R` searches them as you type, and `Ctrl+C` interrupts a running command. When you are unsure what a word actually is, `type` tells you whether it is a built-in, an alias or a program on disk, and `which` shows the path of a program found through your PATH variable, the list of directories Bash searches for commands.",
   "Finally, remember that Linux is case-sensitive. `File.txt` and `file.txt` are different files, and `-R` and `-r` can be different options for different commands (for `ls`, `-R` is recursive while `-r` reverses the sort order). When a command fails, read the error message carefully instead of retyping blindly. Messages such as `No such file or directory`, `command not found` or `invalid option -- 'q'` name the exact word the shell or program could not understand, and that word is almost always where the fix lies."
  ],
  "analogy": "Think of the shell as a mail room clerk who prepares your request before passing it to a specialist. You write \"copy all invoices\" and the clerk replaces \"all invoices\" with the actual list of invoice folders on the shelf, then hands the specialist that list. The specialist never sees the word \"all\". Where the analogy stops: a human clerk might ask what you meant, but Bash never asks. If the pattern matches nothing or too much, it simply passes along what it found.",
  "terms": [
   [
    "Shell",
    "The program (Bash on RHEL) that reads your command lines, expands them and starts the requested programs."
   ],
   [
    "Option",
    "A word beginning with - or -- that changes how a command behaves, such as -l or --all."
   ],
   [
    "Argument",
    "A word after the options that the command acts on, usually a file or directory name."
   ],
   [
    "Glob",
    "A wildcard pattern such as *.conf or file?.txt that the shell expands into matching file names."
   ],
   [
    "Tab completion",
    "Pressing Tab to have Bash finish a command or path name, reducing typing errors."
   ],
   [
    "Expansion",
    "The shell's rewriting of a command line (globs, ~, variables, command substitution) before the program runs."
   ]
  ],
  "example": "An exam task asks you to list every file in /etc/ssh including hidden ones with human-readable sizes. You check the prompt to confirm you are on servera, type `ls -lah /etc/ssh`, and use Tab to complete the path so a typo cannot send you to the wrong directory.",
  "mistakes": [
   [
    "Believing the command itself understands wildcards like *.log.",
    "The shell expands globs before the command runs; the program only receives the resulting list of names. Preview with echo to see the real arguments."
   ],
   [
    "Thinking a $ or # at the end of the prompt is just decoration.",
    "It shows your privilege level: $ for a normal user, # for root. Check it, along with the host name, before every change on the exam."
   ],
   [
    "Assuming -r and -R always mean the same thing.",
    "Linux is case-sensitive and each command defines its own options. For ls, -R is recursive and -r reverses the sort; check the man page when unsure."
   ],
   [
    "Typing a file name with a space without quotes.",
    "The shell splits on spaces, so the command receives two arguments. Quote the name or escape the space with a backslash."
   ]
  ],
  "tryit": [
   [
    "You are about to delete old files with `rm /var/tmp/report*` while logged in as root. You are not sure how many files the pattern matches, and some colleagues keep important reports in that directory with similar names. What should you do before pressing Enter?",
    "Run `echo rm /var/tmp/report*` (or `ls /var/tmp/report*`) first. The shell expands the glob the same way in both cases, so you see exactly which files rm would receive. If the list is right, run the real command; if not, narrow the pattern."
   ]
  ],
  "tip": "The shell, not the command, expands globs, variables and ~. If a result surprises you, put echo in front of the command to see exactly which arguments the program will receive.",
  "check": [
   [
    "What does the # at the end of a prompt usually indicate?",
    "You are logged in as root; a normal user's prompt ends in $."
   ],
   [
    "Are `ls -la` and `ls -l -a` different?",
    "No. Short options can be grouped behind a single dash, so both give a long listing including hidden files."
   ],
   [
    "How do you pass a file named `my report.txt` to a command?",
    "Quote it ('my report.txt') or escape the space (my\\ report.txt) so the shell treats it as one argument."
   ],
   [
    "Which command tells you whether `ls` is an alias, a built-in or a program on disk?",
    "type ls, which reports how Bash will interpret the word."
   ]
  ]
 },
 {
  "t": "Input and output redirection: >, >>, 2>, 2>&1, <, pipes and tee",
  "hook": "At Bluewater Clinic, Priya on the overnight IT shift gets a message from the compliance officer: \"Send me a list of every file owned by the departed contractor, and nothing else.\" She runs a search across the whole server and saves it to a file. The next morning the officer replies, puzzled: half the file is lines saying \"Permission denied\", and the other half of the results seems to be missing because a second run overwrote the first. The search itself was right. What went wrong was where the output went. How do you send results, errors and input exactly where you want them?",
  "simple": "Every program has three \"pipes\" attached to it. One brings input in (usually your keyboard). One carries normal results out (usually your screen). One carries error messages out (also your screen). Redirection means rerouting those pipes: sending results into a file, sending errors somewhere else, or feeding a file in as input. A pipe symbol, |, connects the results of one program straight into the next program, like an assembly line. Think of a kitchen: orders come in through one window, finished plates go out another, and complaints go to a third. Redirection lets you choose which room each window opens into.",
  "body": [
   "Every process starts with three open channels called file descriptors, numbered so the shell can refer to them. Standard input (stdin, descriptor 0) is where a program reads input, normally the keyboard. Standard output (stdout, descriptor 1) is where normal results go, and standard error (stderr, descriptor 2) is where error messages go; both normally appear on your terminal, mixed together, which is why you rarely notice they are separate. Redirection lets you connect these channels to files or to other commands instead. That is exactly what an exam task means when it says \"save the output to a file\" or \"discard error messages\".",
   "The output operators are easy to confuse, so learn them precisely. `>` sends stdout to a file, creating it if needed and overwriting it if it exists, with no warning. `>>` appends stdout to the end of a file, keeping what was already there. `2>` sends stderr to a file, and `2>>` appends stderr. `<` makes a file the command's stdin, so the program reads from the file as if you had typed its contents. Redirecting to `/dev/null`, a special file that silently discards everything written to it, is the standard way to throw away unwanted output such as the flood of permission errors you get when searching the whole file system as a normal user.",
   "```bash\nfind /etc -name '*.conf' > found.txt 2> errors.txt   # split results and errors\nfind /etc -name '*.conf' > all.txt 2>&1             # both into one file\nfind /etc -name '*.conf' 2> /dev/null               # hide permission errors\nsort < names.txt                                   # file as stdin\n```",
   "The trickiest operator is `2>&1`, which means \"send descriptor 2 to wherever descriptor 1 currently points\". The key word is currently. The shell processes redirections left to right, so order matters. `cmd > file 2>&1` first points stdout at the file and then points stderr at the same place, so both land in the file. `cmd 2>&1 > file` points stderr at the terminal (where stdout was at that moment) and only then moves stdout, so errors still appear on screen and the file holds only normal output. Bash also accepts `&> file` as a shortcut for sending both streams to one file, which is shorter but less portable to other shells.",
   "Pipes take the idea further by connecting commands instead of files. A pipe, `|`, connects the stdout of one command to the stdin of the next, letting you build a small processing line: `ps aux | grep sshd | wc -l` lists processes, keeps only lines mentioning sshd and counts them. Only stdout travels through a pipe; stderr still goes to the terminal unless you add `2>&1` before the pipe, as in `find / -user harry 2>&1 | less`. Pipes are the reason small tools such as `grep`, `sort`, `uniq`, `head`, `tail` and `wc` are so useful together, and many exam tasks are solved by chaining two or three of them.",
   "Sometimes you want to see output and save it at the same time, and that is the job of `tee`. It copies its stdin to stdout and to one or more files: `df -h | tee disk.txt` shows the disk report on screen and writes it to disk.txt. Use `tee -a` to append instead of overwrite. Because tee sits in the middle of a pipeline, you can also save an intermediate stage: `grep Failed /var/log/secure | tee failed.txt | wc -l` saves the matching lines and still prints the count.",
   "`tee` also solves a classic privilege puzzle. In `sudo echo text > /etc/file`, sudo applies only to `echo`; the redirection is set up by your own unprivileged shell before sudo even starts, so it fails with `Permission denied`. The fix is `echo text | sudo tee /etc/file`, where the process that actually opens and writes the file is tee running as root. Add `> /dev/null` at the end if you do not want the text echoed to the screen, and `-a` if you must append to an existing configuration file rather than replace it.",
   "Finally, build the habit of checking results. After redirecting, run `cat` or `wc -l` on the file to confirm it holds what the task asked for: only paths and no error lines, or both streams if that was the requirement. A single `>` where `>>` was needed silently erases earlier work, and graders check file contents exactly."
  ],
  "analogy": "Picture a theater with two exits: the main doors (stdout) and a side door (stderr). By default both lead to the same lobby, your screen. `> file` moves the main doors to open into a storage room. `2>&1` says \"make the side door open wherever the main doors open right now\". If you give that instruction before moving the main doors, the side door still leads to the lobby. The analogy stops at timing: in the shell, each redirection is applied in order before the program starts, not while people are walking out.",
  "terms": [
   [
    "stdin, stdout, stderr",
    "File descriptors 0, 1 and 2: the standard input, normal output and error output of every process."
   ],
   [
    "> and >>",
    "Redirect stdout to a file, overwriting it (>) or appending to it (>>)."
   ],
   [
    "2>&1",
    "Redirect stderr to wherever stdout currently points; place it after the stdout redirection."
   ],
   [
    "Pipe (|)",
    "Connects one command's stdout to the next command's stdin."
   ],
   [
    "tee",
    "Copies its input both to the screen (stdout) and to files; -a appends."
   ],
   [
    "/dev/null",
    "A special file that discards anything written to it; used to throw away unwanted output."
   ]
  ],
  "example": "A task says: search the whole file system for files owned by user harry and save the list to /root/harry-files, discarding errors. You run `find / -user harry > /root/harry-files 2> /dev/null`, then `cat /root/harry-files` to confirm the file contains only paths and no 'Permission denied' lines.",
  "mistakes": [
   [
    "Using > when the task says to add to an existing file.",
    "> truncates the file first and erases its old contents. Use >> to append."
   ],
   [
    "Writing `cmd 2>&1 > file` and expecting both streams in the file.",
    "Redirections are processed left to right, so stderr is pointed at the terminal before stdout moves. Write `cmd > file 2>&1` or `cmd &> file`."
   ],
   [
    "Believing `sudo echo x > /etc/file` writes as root.",
    "The redirection is done by your unprivileged shell. Use `echo x | sudo tee /etc/file` so a root process writes the file."
   ],
   [
    "Expecting error messages to flow through a pipe.",
    "Pipes carry only stdout. Add 2>&1 before the pipe to include stderr."
   ]
  ],
  "tryit": [
   [
    "You need to run a nightly report command, keep its normal output in /root/report.log, add each night's output to the end of that file, and record any errors separately in /root/report.err, also appending. Which redirection operators do you use?",
    "Use `report-command >> /root/report.log 2>> /root/report.err`. The >> keeps previous nights' results instead of overwriting them, and 2>> appends stderr to its own file so errors stay separate from the report."
   ],
   [
    "A colleague wants to watch a long command's output live but also keep a copy for the ticket. What do you suggest?",
    "Pipe it to tee: `long-command | tee /root/output.txt`. tee prints to the screen and writes the file at the same time; add 2>&1 before the pipe if errors should be captured too."
   ]
  ],
  "tip": "Order matters: `> file 2>&1` captures both streams in the file, but `2>&1 > file` leaves errors on the terminal. Also remember a single > overwrites; use >> when the task says append.",
  "check": [
   [
    "What is the difference between `>` and `>>`?",
    "> truncates (overwrites) the target file, while >> adds to the end of it."
   ],
   [
    "Why does `sudo echo hi > /etc/motd` fail for a normal user?",
    "Your own unprivileged shell performs the redirection before sudo runs; use `echo hi | sudo tee /etc/motd` instead."
   ],
   [
    "Does a pipe carry error messages to the next command?",
    "No, only stdout. Add 2>&1 before the pipe if you want stderr to travel through it too."
   ],
   [
    "How do you make sort read its input from names.txt using redirection?",
    "sort < names.txt, which connects the file to sort's stdin."
   ]
  ]
 },
 {
  "t": "Grep and regular expressions: ^, $, ., *, [ ], -i, -v, -r, -E",
  "hook": "The help desk at Copperfield Library forwards a ticket to you: patrons cannot log in to the catalog server over SSH, and someone suspects a setting was changed. The configuration file is hundreds of lines long, and most of them are comments. Your manager, Luis, is on the phone asking whether password logins are switched off. Scrolling through the file line by line, you keep losing your place among the hash marks. There has to be a faster way to pull out only the lines that matter. How do you ask the system to show you exactly the text you are looking for?",
  "simple": "grep is a search tool. You give it a pattern and some text, and it prints only the lines that match. The pattern can be plain words, or it can use a few special symbols to describe text more cleverly: ^ means \"at the start of the line\", $ means \"at the end\", a dot means \"any one character\", and square brackets mean \"any one of these characters\". Options change the search: ignore uppercase versus lowercase, show the lines that do not match, or search every file in a folder. It is like using a highlighter on a long list, but you describe the rule once and the computer finds every line that fits.",
  "body": [
   "`grep` prints the lines of its input that match a pattern. On the RHCSA you use it constantly: to find a setting in a configuration file, to pick lines out of a log, or to satisfy a task such as \"save every line of /usr/share/dict/words containing the string ich into /root/lines\". The pattern is a regular expression (regex), a small language for describing text that is also used by `sed`, `vim`, `less` and many other tools, so the time you invest here pays off everywhere.",
   "The core regex characters are few, and each has a precise meaning. `^` anchors the match to the start of a line and `$` to the end, so `^root` matches lines beginning with root and `bash$` matches lines ending in bash. Anchors match positions, not characters. A dot `.` matches any single character, so `h.t` matches hat, hot and h9t. A star `*` means \"zero or more of the preceding item\", so `a*` matches nothing, a, aa and so on, and `.*` matches any run of characters. Square brackets list a set of allowed characters: `[0-9]` is one digit, `[aeiou]` one vowel, and `[^0-9]` (with a caret inside the brackets) any character that is not a digit. Note that the caret means \"start of line\" outside brackets but \"not\" when it is the first character inside them.",
   "```bash\ngrep '^root' /etc/passwd            # lines starting with root\ngrep -v '^#' /etc/ssh/sshd_config   # hide comment lines\ngrep -v '^$' file                   # hide empty lines\ngrep -i 'error' /var/log/messages   # case-insensitive\ngrep -r 'PermitRootLogin' /etc/ssh  # search a directory tree\ngrep -E '^(root|student):' /etc/passwd\n```",
   "The options on this topic each do one clear job. `-i` ignores case, so `error`, `Error` and `ERROR` all match. `-v` inverts the match and prints lines that do not match; combined with `^#` and `^$` it is the classic way to see only the active lines of a config file. `-r` searches recursively through every file under a directory and prefixes each result with the file name, as in `/etc/ssh/sshd_config:PermitRootLogin no`. Other options worth knowing are `-n` for line numbers (useful when you then open the file in vim), `-c` to count matching lines and `-l` to list only the names of matching files. You can give several patterns with repeated `-e` options, and a line matches if it matches any of them.",
   "Basic and extended regular expressions are where many candidates slip. Plain `grep` uses basic regular expressions, in which `+`, `?`, `|`, `{ }` and `( )` are ordinary characters unless you put a backslash in front of them. `grep -E` switches to extended regular expressions, where those characters are special without backslashes: `+` means one or more, `?` zero or one, `|` alternation, `{3}` exactly three and parentheses group. So `grep -E 'cat|dog'` finds either word, whereas plain `grep 'cat|dog'` looks for the literal text cat|dog and quietly prints nothing. If a pattern with `|` or `+` returns no results when you are sure matches exist, the missing `-E` is the first thing to check.",
   "Quoting protects your pattern from the shell. Always put the pattern in single quotes, because characters such as `*`, `$` and `[ ]` are also special to Bash. Without quotes, Bash may expand `*.conf` into file names in your current directory or replace `$HOME` with a path before grep ever sees it, giving confusing results that change depending on where you run the command. To match a literal special character, escape it with a backslash: `grep '\\.conf$'` matches lines ending in .conf, while `grep '.conf$'` would also match lines ending in xconf.",
   "Putting it together on the exam usually means combining grep with redirection. A task that asks you to save matching lines to a file is solved with `grep 'ich' /usr/share/dict/words > /root/lines`, then checked with `wc -l /root/lines` and `head /root/lines`. When reading logs, `grep -i fail /var/log/secure | tail` shows the most recent failures. Remember that grep returns exit status 0 when it finds a match and 1 when it finds none, which becomes important later when you use it in shell scripts to make decisions. Adding `-q` suppresses the output entirely so only that exit status is left, which is exactly what a script's `if` statement needs. Practice a few combinations until they feel natural: `grep -c` to count matches in a log, `grep -n` to find the line to edit, and `grep -rl` to discover which files under /etc mention a host name you are about to change."
  ],
  "analogy": "A regular expression is like a stencil you slide down a page of text. Wherever the holes line up with the letters, the line is kept. ^ and $ are the edges of the stencil pinned to the left or right margin, a dot is a hole that fits any letter, and brackets are a hole shaped to fit only certain letters. Where it stops working: the star is not a stencil hole for \"anything\"; it stretches the hole just before it to repeat zero or more times.",
  "terms": [
   [
    "Regular expression",
    "A pattern language for describing text, used by grep, sed, vim and many other tools."
   ],
   [
    "Anchor",
    "^ matches the start of a line and $ matches the end; they match positions, not characters."
   ],
   [
    "Character class",
    "A bracket expression such as [a-z] that matches one character from the listed set; [^...] negates it."
   ],
   [
    "-v",
    "grep option that prints lines that do NOT match the pattern."
   ],
   [
    "-E",
    "grep option that enables extended regular expressions, making + ? | {} and () special."
   ],
   [
    "-r",
    "grep option that searches every file under a directory recursively, prefixing results with file names."
   ]
  ],
  "example": "To review only the active settings in /etc/ssh/sshd_config, you run `grep -v -e '^#' -e '^$' /etc/ssh/sshd_config`. Comment and blank lines disappear and you can quickly confirm whether PasswordAuthentication is set.",
  "mistakes": [
   [
    "Treating * in a regex like the shell glob meaning \"anything\".",
    "In a regex, * means zero or more of the previous item. The regex for any run of characters is .*"
   ],
   [
    "Using | or + with plain grep and getting no matches.",
    "Basic regex treats them as literal characters. Use grep -E, or escape them in basic syntax."
   ],
   [
    "Leaving the pattern unquoted.",
    "Bash may expand *, $ or brackets before grep runs. Always single-quote patterns."
   ],
   [
    "Thinking ^ inside brackets means start of line.",
    "As the first character inside brackets, ^ negates the set: [^0-9] means any non-digit."
   ]
  ],
  "tryit": [
   [
    "A task asks you to save every line of /etc/passwd for accounts whose login shell is /bin/bash into /root/bashusers. A colleague suggests `grep bash /etc/passwd > /root/bashusers`. Is that precise enough, and what would you run instead?",
    "It could also match a user or home directory containing the text bash. Anchor it to the end of the line: `grep '/bin/bash$' /etc/passwd > /root/bashusers`, then check the file with cat."
   ]
  ],
  "tip": "In a regex, * does not mean 'anything' as it does in a shell glob; it means 'zero or more of the previous character'. The regex for 'anything' is .* and patterns belong in single quotes.",
  "check": [
   [
    "Which command prints lines of /etc/passwd that end in nologin?",
    "grep 'nologin$' /etc/passwd, because $ anchors the match to the end of the line."
   ],
   [
    "Why might `grep 'a|b' file` find nothing when lines contain a or b?",
    "In basic regex | is literal; use grep -E 'a|b' (or escape it as \\|) to get alternation."
   ],
   [
    "What does `grep -v '^$'` do?",
    "It removes empty lines, because ^$ matches a line with nothing between start and end and -v inverts the match."
   ],
   [
    "Which option lists only the names of files that contain a match?",
    "-l, often combined with -r to search a directory tree."
   ]
  ]
 },
 {
  "t": "Accessing remote systems with ssh; logging in and switching users (su -, sudo -i) in multiuser targets",
  "hook": "It is 2 a.m. and Marcus, on call for Riverbend Water Authority, gets a page: the monitoring server in the pump station has stopped sending reports. There is no keyboard or screen out there, only a network connection. He opens his laptop, connects to the server, and needs to restart a service that only root can touch. A teammate in chat suggests just sharing the root password. Another says that is exactly what the audit flagged last quarter. Marcus needs to get in securely, become the right user for the job, and leave a clear record of what he did. How?",
  "simple": "Servers often sit in a data center with no screen attached, so administrators reach them over the network with SSH, a tool that creates an encrypted, private connection. You type ssh, the user name and the machine name, prove who you are with a password or a key file, and you get a command prompt on the remote machine. Once there, you sometimes need to act as a different user. su switches you to another account if you know that account's password. sudo lets you run admin commands using your own password, if you have been given permission. It is like a building: SSH is the secure entrance, su is borrowing someone else's badge, and sudo is your own badge with extra access rights added.",
  "body": [
   "RHEL servers usually run in the multi-user target, the systemd state for a text-mode system with networking and services running but no graphical desktop. You reach them with a text console or, far more often, over the network with SSH (Secure Shell), which encrypts the whole session, including passwords, so nobody on the network can read them. On the exam you will ssh between machines and switch between accounts constantly, so these commands should become automatic, and you should always know which machine and which account each terminal is using.",
   "The basic connection is `ssh user@host`. If you omit the user, ssh uses your current user name on the remote side. The first time you connect to a host, ssh shows the server's key fingerprint and asks you to confirm it; accepted keys are stored in `~/.ssh/known_hosts`. If the key later changes, ssh prints a prominent warning and may refuse to connect. That could mean the server was rebuilt, or that something is intercepting the connection, so treat it seriously rather than reflexively deleting the entry. You can also run a single command remotely without an interactive session: `ssh root@serverb 'systemctl is-active sshd'`. Type `exit` or press `Ctrl+D` to log out.",
   "Key-based authentication replaces passwords with a key pair and is the standard for administrators. `ssh-keygen` creates a private key (for example `~/.ssh/id_ed25519`) and a matching public key ending in `.pub`. `ssh-copy-id user@host` appends the public key to `~/.ssh/authorized_keys` in that account's home directory on the server. After that you log in without typing a password, and the private key never leaves your machine. Protect it with a passphrase and tight permissions; the SSH server refuses keys when the `.ssh` directory or `authorized_keys` file is writable by other users, which is a common reason key logins mysteriously fail.",
   "Once logged in, you often need another identity, and `su` is the first tool. `su` (substitute user) starts a shell as another user after asking for that user's password. The dash matters: `su - harry` starts a login shell that loads harry's environment, PATH and home directory, exactly as if harry had logged in. Plain `su harry` keeps most of your current environment, including your current directory and PATH, which can make commands behave unexpectedly or fail to be found. `su -` with no name means root and asks for the root password.",
   "`sudo` is the second tool and the one administrators prefer. It runs a single command as root (or another user with `-u`) after asking for your own password, and only if the sudo policy in `/etc/sudoers` and files in `/etc/sudoers.d/` allows it. On RHEL, members of the `wheel` group are allowed to run any command by default. `sudo -i` opens an interactive root login shell, similar to `su -`, but authenticates you with your own password. Because every sudo use is tied to a named person and recorded in the system logs, teams can grant root access without sharing the root password, and remove it from one person without changing it for everyone.",
   "```bash\nssh student@servera\nsudo -i          # root login shell using your password\nsu - harry       # full login as harry using harry's password\nwhoami; id       # confirm who you are now\nexit             # return to the previous identity\n```",
   "Switching identities stacks shells, and that is easy to forget. Each `su`, `sudo -i` or `ssh` starts a new shell on top of the old one, so `exit` takes you back one level at a time: from root to student, then from serverb back to servera. Before doing anything important, check `whoami`, `hostname` and the prompt. A quick `id` also shows your groups, which tells you whether a newly added group membership has taken effect yet; group changes apply only to new login sessions.",
   "For exam purposes, keep the password rule straight because it appears in many questions: su asks for the target account's password, while sudo asks for yours and then consults the sudoers policy. If sudo says your user is not in the sudoers file, the fix is to add the user to `wheel` (`usermod -aG wheel user`) or to write a rule with `visudo`, then log in again so the new group membership applies. For a single extra rule, a small file in `/etc/sudoers.d/` edited with `visudo -f` keeps the main file untouched and is easy to remove later."
  ],
  "analogy": "su is like borrowing a coworker's key card: you need their secret, and the door log shows their name, not yours. sudo is like a front desk that checks your own ID against an approved list, then opens the door for you and writes your name in the logbook. The analogy stops at one point: sudo can be limited to specific commands, so it is less like a master key and more like an approved list of specific doors.",
  "terms": [
   [
    "SSH",
    "Secure Shell: an encrypted protocol and client (ssh) for logging in to and running commands on remote systems."
   ],
   [
    "su -",
    "Switch user with a full login shell and that user's environment; asks for the target user's password."
   ],
   [
    "sudo -i",
    "Start a root login shell after authenticating with your own password, as allowed by the sudoers policy."
   ],
   [
    "wheel group",
    "The group whose members RHEL's default sudoers policy allows to run any command with sudo."
   ],
   [
    "multi-user.target",
    "The systemd target for a text-mode system with networking and services but no graphical login."
   ],
   [
    "authorized_keys",
    "File in ~/.ssh on the server listing public keys allowed to log in to that account."
   ]
  ],
  "example": "You log in to servera as student, then run `ssh root@serverb` to finish a task there. Back on servera you use `sudo -i` to edit /etc/fstab, type `exit` to return to student, and `whoami` confirms you are no longer root.",
  "mistakes": [
   [
    "Believing sudo asks for the root password.",
    "sudo asks for your own password and then checks the sudoers policy. su is the command that asks for the target account's password."
   ],
   [
    "Using `su harry` when the task needs harry's full environment.",
    "Without the dash you keep much of your old environment and directory. Use su - harry for a real login shell."
   ],
   [
    "Deleting the known_hosts entry every time a host key warning appears.",
    "A changed key can mean a rebuilt server or an intercepted connection. Confirm the reason before accepting the new key."
   ],
   [
    "Copying the private key to the server.",
    "Only the public key (.pub) goes into the server's authorized_keys. The private key stays on your machine."
   ]
  ],
  "tryit": [
   [
    "A new team member, Ana, needs to restart services on a server as root. The team lead does not want to give out the root password, and the security team wants to know who did what. Which approach do you recommend, and how do you set it up?",
    "Give Ana sudo rights instead of the root password, for example by adding her to the wheel group with `usermod -aG wheel ana`. She then uses sudo or sudo -i with her own password, and each use is logged under her name. She must log in again for the new group to apply."
   ]
  ],
  "tip": "su asks for the TARGET user's password; sudo asks for YOUR password. And always use the dash (su -) when you need the other user's full environment.",
  "check": [
   [
    "What is the practical difference between `su harry` and `su - harry`?",
    "su - harry starts a login shell with harry's environment, PATH and home directory; su harry keeps much of the current environment."
   ],
   [
    "Whose password does `sudo -i` ask for?",
    "The invoking user's own password, and only if sudoers permits that user."
   ],
   [
    "Which file on the server holds public keys that may log in to an account?",
    "~/.ssh/authorized_keys in that account's home directory."
   ],
   [
    "Which command copies your public key to a remote account?",
    "ssh-copy-id user@host, which appends it to the remote authorized_keys file."
   ]
  ]
 },
 {
  "t": "Archiving and compressing with tar, gzip, bzip2 and xz (-c, -x, -t, -z, -j, -J, -f)",
  "hook": "Friday afternoon at Maple Grove School District, and Jordan is about to apply a large configuration change to the student records server. The change policy says: back up /etc first, compressed, stored in /root, before touching anything. Jordan types a tar command from memory, it finishes without complaint, and the change goes ahead. On Monday something is broken and Jordan reaches for the backup, only to find a file named \"c\" in the current directory and no archive where the policy said it would be. One letter in the wrong place made all the difference. Which letters go where, and how do you prove a backup is real?",
  "simple": "Archiving means packing many files and folders into one single file, like putting loose papers into one box so they travel together. Compressing means squeezing a file so it takes less space, like vacuum-packing that box. On Linux, tar does the packing and can call a squeezing tool at the same time. The three common squeezing tools are gzip (quick), bzip2 (slower, usually smaller) and xz (slowest, usually smallest). Single-letter options tell tar what to do: create, extract, or list, which squeezer to use, and the name of the box file. Afterwards you can peek inside the box to check everything made it in.",
  "body": [
   "Archiving and compressing are two different jobs, and the exam expects you to know which tool does which. Archiving bundles many files and directories, together with their permissions, ownership and timestamps, into one file. Compressing makes a file smaller. `tar` (tape archive, a name from the days of tape backups) does the bundling and can call a compressor at the same time, which is why backup files often end in `.tar.gz`, `.tar.bz2` or `.tar.xz`. A typical exam task reads: \"create a bzip2-compressed archive of /etc named /root/etc.tar.bz2\", and the grader checks both the file name and the actual compression format.",
   "tar's options describe the action first, and exactly one action is needed. `-c` creates an archive, `-x` extracts one and `-t` lists its contents (its table of contents) without extracting anything. `-f` names the archive file and must be followed directly by that file name. That is why `f` is conventionally the last letter in a group: `-cf archive.tar` works, but `-fc archive.tar` makes tar treat the letter c as the archive name and archive.tar as something to add, producing a stray file named c. `-v` (verbose) prints each file name as it is processed, which is reassuring but slows down very large archives.",
   "The compression options pick the compressor, and each matches a file extension. `-z` uses gzip (`.gz`, fast, moderate compression), `-j` uses bzip2 (`.bz2`, slower, usually smaller) and `-J` uses xz (`.xz`, slowest, usually smallest). When extracting or listing, GNU tar on RHEL detects the compression automatically, so `tar -xf file.tar.xz` works, but writing the matching letter is harmless and makes your intent clear. When creating, there is no detection: if you forget the letter, you get an uncompressed archive no matter what extension you type. tar calls the separate compressor program, so the matching package must be installed; on a minimal system, check that the compressor runs before relying on it.",
   "```bash\ntar -czvf /root/etc.tar.gz /etc      # create, gzip\ntar -cjf /root/etc.tar.bz2 /etc      # create, bzip2\ntar -cJf /root/etc.tar.xz /etc       # create, xz\ntar -tf /root/etc.tar.gz             # list contents\ntar -xzf /root/etc.tar.gz -C /tmp    # extract into /tmp\n```",
   "tar also protects you from overwriting a live system. When archiving an absolute path such as /etc, it removes the leading `/` from stored paths and prints the notice `Removing leading '/' from member names`. That is a safety feature, not an error. Extracting later recreates `etc/...` relative to your current directory, or relative to the directory given with `-C`, instead of overwriting the real `/etc`. Always check where you are with `pwd`, or use `-C` with a target directory, before extracting, so you do not scatter a copy of etc into whatever directory you happened to be in.",
   "The compressors also work on their own, on single files. `gzip file` replaces it with `file.gz`, and `gunzip file.gz` (or `gzip -d`) reverses it; `bzip2`/`bunzip2` and `xz`/`unxz` behave the same way. By default they replace the original file, so use `-k` to keep it. They do not bundle directories, which is why they are normally paired with tar. To read a compressed text file without decompressing it on disk, use `zcat`, `bzcat` or `xzcat`, which print the contents to stdout and can be piped into `grep` or `less`.",
   "Verification is the step that turns a command into a finished task. After creating an archive, run `tar -tf /root/etc.tar.bz2 | head` and confirm the expected paths, such as `etc/hosts`, are listed. Then run `file /root/etc.tar.bz2`, which inspects the contents rather than trusting the name and should report bzip2 compressed data. A file named .bz2 that `file` reports as a plain tar archive means you forgot the `-j`. Finally, `ls -lh` shows the size, a quick sanity check that the archive is not empty.",
   "Keep the bigger picture in mind as well. Because tar stores ownership and permissions, extracting as root restores them, while extracting as a normal user makes you the owner of the extracted files. That difference matters when you restore configuration files that must belong to root or to a service account. You can also archive several sources at once, such as `tar -czf /root/web.tar.gz /etc/httpd /var/www`, and every path is stored under its own relative name. When a task specifies an exact archive name and location, type it exactly, including the extension, because a grader script looks for that path and nothing else."
  ],
  "analogy": "Think of moving house. tar is the moving box: it gathers many items, labels them with where they came from and keeps them together. gzip, bzip2 and xz are different vacuum bags that shrink the box, each slower but tighter than the last. Where the analogy breaks: a real box can hold a vacuum-packed bag inside, but here the shrinking happens to the whole box at once, and the compressors on their own cannot box up a folder.",
  "terms": [
   [
    "Archive",
    "A single file that bundles many files and directories along with their metadata; created with tar."
   ],
   [
    "-c / -x / -t",
    "tar actions: create an archive, extract it, or list (table of contents) without extracting."
   ],
   [
    "-f",
    "tar option naming the archive file; the file name must immediately follow it."
   ],
   [
    "-z / -j / -J",
    "Use gzip, bzip2 or xz compression respectively."
   ],
   [
    "-C",
    "tar option that changes to a directory before extracting (or archiving)."
   ],
   [
    "file",
    "Command that identifies a file's real format by inspecting its contents, such as bzip2 or XZ compressed data."
   ]
  ],
  "example": "Asked to back up /var/log as an xz-compressed archive, you run `tar -cJf /root/logs.tar.xz /var/log`, then `tar -tf /root/logs.tar.xz | head` to confirm the paths are there and `file /root/logs.tar.xz` to confirm it is XZ compressed data.",
  "mistakes": [
   [
    "Thinking the .gz or .bz2 extension makes tar compress the archive.",
    "When creating, tar compresses only if you give -z, -j or -J. The name alone changes nothing; verify with the file command."
   ],
   [
    "Mixing up -j and -J.",
    "Lowercase -j is bzip2 (.bz2); uppercase -J is xz (.xz)."
   ],
   [
    "Putting f in the middle of the option group, as in -fcz.",
    "-f takes the next word as the archive name, so the following letters become the file name. Keep f last: -czf."
   ],
   [
    "Assuming gzip can compress a whole directory.",
    "gzip, bzip2 and xz compress single files and replace them. Use tar to bundle a directory first."
   ]
  ],
  "tryit": [
   [
    "A task asks for a backup of /home named /root/home.tar.xz. You run `tar -czf /root/home.tar.xz /home` and it completes without errors. Before moving on, you run `file /root/home.tar.xz`. What will it report, and is the task done?",
    "It will report gzip compressed data, because -z selects gzip regardless of the .xz name. The task is not done; recreate it with `tar -cJf /root/home.tar.xz /home` and check again with file."
   ]
  ],
  "tip": "Match the letter to the extension: z = .gz, j = .bz2, J = .xz. Keep f last in the option group so the archive name follows it directly.",
  "check": [
   [
    "Which command lists the contents of backup.tar.gz without extracting it?",
    "tar -tzf backup.tar.gz (or tar -tf backup.tar.gz, since tar detects compression when reading)."
   ],
   [
    "Why does tar print 'Removing leading /' when archiving /etc?",
    "It stores relative paths so extraction does not overwrite the live system files; they are recreated under the current or -C directory."
   ],
   [
    "What does `gzip notes.txt` do to the original file?",
    "It replaces it with notes.txt.gz; use -k to keep the original."
   ],
   [
    "How do you extract archive.tar.bz2 into /restore instead of the current directory?",
    "tar -xjf archive.tar.bz2 -C /restore (the directory must already exist)."
   ]
  ]
 },
 {
  "t": "Creating and editing text files with vim or nano",
  "hook": "Halfway through a maintenance window at Northgate Credit Union, Sam opens the SSH server's configuration file to change one setting. The screen fills with text, Sam starts typing the new value, and letters vanish, the cursor jumps around and a line disappears entirely. Sam tries to quit, but nothing obvious works. Across the room, a teammate calls out, \"Press Escape, then colon q bang.\" The window is ticking down, and the server will not apply the change until the file is saved correctly. What is the editor actually doing, and how do you make it do what you want?",
  "simple": "On Linux, settings live in plain text files, so administrators edit text all the time. Two common editors are nano and vim. nano works like a basic notepad: you just type, and the shortcuts are listed at the bottom of the screen. vim is more powerful but has modes: in one mode your keys are commands (move, delete, copy), and in another mode your keys type text. You press i to start typing and Esc to go back to commands. Saving and quitting is done by typing a colon command such as :wq. It is like a TV remote with a switch: in one position the buttons change channels, in the other they type letters into a search box.",
  "body": [
   "Linux configuration lives in plain text files, so editing them quickly and correctly is a core RHCSA skill. RHEL always provides `vi`, and usually the fuller `vim` (Vi IMproved) is installed as well; `nano` is a simpler editor you can install if you prefer it. On the exam you may use any editor available, but vi is guaranteed to be present even on minimal systems, so it is worth being comfortable with vi and vim basics even if you prefer nano day to day. Editing speed matters, because the exam is timed and many tasks involve changing a configuration file.",
   "The key idea is that vim is modal: the same key does different things depending on the mode. You start in normal mode, where keys are commands for moving and changing text. Press `i` to enter insert mode and type text before the cursor (`a` appends after the cursor, `o` opens a new line below). Press `Esc` to return to normal mode. Typing `:` from normal mode opens command-line mode at the bottom of the screen, where you save, quit and run substitutions. Most beginner confusion comes from typing text while still in normal mode, where each letter is treated as a command; for example, `d` starts a delete and `x` deletes a character. When in doubt, press `Esc` once or twice to return to a known state. vim shows `-- INSERT --` at the bottom of the screen while you are in insert mode.",
   "```text\n:w        save          :q        quit\n:wq or :x save and quit :q!       quit, discard changes\ndd        delete line   yy / p    copy line / paste below\nu         undo          Ctrl+r    redo\n/text     search down   n         next match\ngg / G    top / bottom  :set nu   show line numbers\n```",
   "A few more commands make configuration editing fast. `:%s/old/new/g` replaces every occurrence in the file; the `%` means all lines and the `g` means every match on each line, not just the first. `x` deletes one character, `cw` changes a word (it deletes to the end of the word and enters insert mode), and a number before a command repeats it, so `5dd` deletes five lines. Visual mode (`v`, or `V` for whole lines) lets you select text and then delete, copy or indent it. Combining these with search (`/PermitRootLogin`) lets you jump straight to a setting, change it and save in a few keystrokes.",
   "vim also protects you from conflicting edits with a swap file. While you edit, vim keeps a hidden `.swp` file next to the original. If you open a file and vim warns that a swap file already exists, either another session is editing the same file right now or an earlier session crashed. Choose to open it read-only, or recover the changes, rather than blindly deleting the swap file, and if you are sure the old session is gone, delete the leftover swap file afterward so the warning stops.",
   "nano takes the opposite approach and is modeless: you just type, and the text appears. The shortcuts are shown at the bottom of the screen, where `^` means Ctrl. `Ctrl+O` writes the file (press Enter to confirm the name), `Ctrl+X` exits and offers to save if there are changes, `Ctrl+W` searches and `Ctrl+K` cuts a line, which `Ctrl+U` pastes back. It is easier to learn and perfectly acceptable on the exam if it is installed, though slower for large or repetitive edits.",
   "Some files have safer, purpose-built editing commands, and the exam expects you to know them. Use `visudo` for `/etc/sudoers`, because it locks the file, checks the syntax before saving and refuses to install a broken file that could lock everyone out of sudo. `vipw` and `vigr` lock `/etc/passwd` and `/etc/group` while you edit them, preventing two changes from colliding. For new small files, you do not need an editor at all: redirection works, such as `echo 'text' > file`, or a here-document with `cat > file << 'EOF'` followed by the lines and a closing EOF line.",
   "Whatever editor you use, the job is not finished when the file is saved. Verify your change afterward with `cat`, `grep` or the service's own syntax test, such as `sshd -t` for the SSH daemon, and then restart or reload the service that reads the file. A setting that is saved but never loaded by the service does not count as configured."
  ],
  "analogy": "Using vim is like driving a car with a manual gearbox. In one gear (normal mode) your pedals and stick move you around the text and perform actions; in another gear (insert mode) the same keys produce letters. Esc is the clutch that always brings you back to neutral. The comparison stops at stalling: vim never breaks if you press the wrong key, and `u` undoes almost anything you did in normal mode.",
  "terms": [
   [
    "Normal mode",
    "Vim's default mode, in which keys are commands for moving, deleting, copying and pasting."
   ],
   [
    "Insert mode",
    "Vim mode entered with i, a or o in which typed keys become text; Esc leaves it."
   ],
   [
    ":wq / :q!",
    "Vim commands to save and quit, or to quit discarding unsaved changes."
   ],
   [
    "visudo",
    "Safely edits the sudoers file, locking it and checking syntax before saving."
   ],
   [
    "Swap file",
    "A .swp recovery file vim keeps while editing; a leftover one signals a concurrent or crashed edit."
   ],
   [
    "nano",
    "A modeless terminal editor whose Ctrl-key shortcuts are listed at the bottom of the screen."
   ]
  ],
  "example": "You need to set `PermitRootLogin no` in /etc/ssh/sshd_config. In vim you type `/PermitRootLogin` to find the line, `cw` to change the value, Esc, then `:wq`. You check with `grep PermitRootLogin /etc/ssh/sshd_config` and run `systemctl reload sshd`.",
  "mistakes": [
   [
    "Typing text in vim immediately after opening a file.",
    "vim starts in normal mode, where letters are commands. Press i (or a or o) first, and Esc when finished typing."
   ],
   [
    "Editing /etc/sudoers directly with vim.",
    "A syntax error can break sudo for everyone. Use visudo, which checks the file before saving."
   ],
   [
    "Deleting a vim swap file as soon as the warning appears.",
    "It may belong to an active session or hold unsaved work. Open read-only or recover first, then remove it once you are sure."
   ],
   [
    "Assuming a saved config file takes effect immediately.",
    "Most services read their files at start. Test the syntax and reload or restart the service."
   ]
  ],
  "tryit": [
   [
    "You open /etc/chrony.conf in vim, type several characters before realizing you were in normal mode, and now lines look changed in ways you do not understand. You have not saved. What is the quickest safe way out?",
    "Press Esc, then type `:q!` and Enter to quit without saving, discarding the accidental changes. Reopen the file and start again, pressing i before typing. Alternatively press u repeatedly to undo, but `:q!` is the most certain."
   ]
  ],
  "tip": "If vim seems to ignore your typing or does strange things, you are in the wrong mode: press Esc, then use :wq to save or :q! to abandon changes.",
  "check": [
   [
    "How do you quit vim without saving after making changes?",
    "Press Esc, then type `:q!` and Enter."
   ],
   [
    "Why use visudo instead of editing /etc/sudoers directly?",
    "visudo checks the syntax before saving, so a typo cannot break sudo access."
   ],
   [
    "Which vim command replaces every 'foo' with 'bar' in the file?",
    ":%s/foo/bar/g"
   ],
   [
    "In nano, which keys save the file?",
    "Ctrl+O, then Enter to confirm the file name."
   ]
  ]
 },
 {
  "t": "Creating, deleting, copying and moving files and directories (mkdir -p, cp -a, mv, rm -r)",
  "hook": "At Summit Ridge Veterinary Hospital, Elena is migrating the appointment website's files to a new disk. She copies the folder over, points the web server at it, and the site immediately shows \"Forbidden\". The files are all there, with the same names and sizes. But a closer look shows they now belong to her account instead of the web service, every timestamp says today, and the security labels are wrong. Meanwhile, a teammate cleaning up the old copy is hovering over a recursive delete. The commands are only a few letters long. What decides whether they copy everything that matters, and whether a delete takes only what you meant?",
  "simple": "Files live in folders (Linux calls them directories), and a few short commands handle almost all file housekeeping. mkdir makes a folder; with -p it also makes any missing folders on the way. cp copies; with -a it copies a whole folder and keeps every detail, such as who owns each file and when it was last changed. mv moves or renames. rm deletes, and with -r it deletes a folder and everything inside it. There is no recycle bin, so a delete is permanent. Think of photocopying a signed form: a plain copy gets today's date and your name on it, while an exact archival copy keeps the original signature and date.",
  "body": [
   "Managing files is the everyday base of administration, and these commands appear inside many larger exam tasks. The commands are short, but their options decide whether a task succeeds, whether metadata such as ownership and permissions survives, and whether you accidentally destroy data. Linux has no recycle bin at the command line: what `rm` removes is gone, and the exam system will not give it back.",
   "Directories come first, because many tasks start by creating a place to put things. Plain `mkdir /data/projects/web` fails with `No such file or directory` if `/data/projects` does not exist yet. `mkdir -p` creates every missing parent along the way and does not complain if the directory already exists, which makes it the safe choice in tasks and in scripts that may run more than once. Bash brace expansion pairs well with it: `mkdir -p /srv/app/{logs,data}` creates two subdirectories in one command. `touch file` creates an empty file, or updates the timestamp of an existing one without changing its contents.",
   "Copying is where metadata quietly changes. `cp source destination` copies files, and to copy a directory you need `-r` (recursive). By default the copy belongs to you, gets the current time and default permissions based on your umask, which is exactly what broke the website in the opening story. `cp -a` (archive) copies recursively and preserves permissions, ownership, timestamps and symbolic links, and on RHEL also SELinux contexts and other extended attributes. Preserving ownership requires running as root, since a normal user cannot give files away. When a task asks you to copy files \"preserving attributes\" or to move data to a new file system, `-a` is the answer. `cp -i` asks before overwriting an existing file, a useful guard when the destination may already hold data.",
   "Moving and renaming are the same operation in Linux: `mv` does both, so you never need a separate tool to rename a single file. Within the same file system, `mv` simply changes the name in the directory, so it is instant even for huge files and keeps the file's metadata, including its owner, permissions and SELinux context. Across file systems it must copy the data and then delete the original, which takes time. This creates a classic SELinux (Security-Enhanced Linux) trap. A file created in your home directory carries a home-directory context; if you `mv` it into `/var/www/html`, it keeps that context and the web server may be denied access. A file you copy there with plain `cp` gets the context of its new location instead. Running `restorecon` on the moved file fixes it, a topic covered in the security lessons.",
   "```bash\nmkdir -p /srv/app/{logs,data}   # braces create both subdirectories\ncp -a /etc/httpd /root/httpd.bak\nmv report.txt /srv/app/data/\nmv old.conf new.conf            # rename\nrm -r /srv/app/logs             # remove a directory tree\nrmdir /srv/empty                # remove an empty directory only\n```",
   "Deleting deserves the most care. `rm` removes files; `rm -r` removes a directory and everything beneath it; and `-f` suppresses prompts and errors, so `rm -rf` will not stop to ask anything. `rmdir` removes only empty directories and refuses otherwise, which makes it a safe way to clean up. Before any recursive delete, run `ls` on the same path, avoid trailing wildcards you have not checked, and be especially careful as root. A single stray space, as in `rm -r /srv/app /logs` instead of `/srv/app/logs`, turns a small cleanup into a disaster. Using `rm -i` or previewing with `echo rm -r path/*` costs seconds and can save the exam.",
   "Paths are the final piece. A path can be absolute, starting with `/` and describing the full route from the root directory, or relative to your current directory. `.` is the current directory and `..` its parent, so `cp file ../backup/` copies one level up. When in doubt, use absolute paths so the command does the same thing no matter where you are, which matters on the exam because you switch between users and directories constantly.",
   "Finally, check your work with `ls -l` for ownership and permissions, `ls -lZ` to include SELinux contexts, and `ls -ld` when you want information about a directory itself rather than its contents. Graders inspect these attributes, so a copy with the right names but the wrong owner is an incomplete task. A quick `diff -r` between source and copy confirms that the contents match as well."
  ],
  "analogy": "Think of a library. mv within one building is like changing the label on a shelf: the book itself, with its stamps and history, stays exactly the same. cp is like photocopying the book: you get a fresh copy stamped with today's date and your name, unless you ask for an archival copy (cp -a) that reproduces every stamp. rm is shredding with no backup. The analogy stops for mv between buildings (file systems), where Linux really does copy and then shred the original.",
  "terms": [
   [
    "mkdir -p",
    "Create a directory and any missing parent directories; no error if it already exists."
   ],
   [
    "cp -a",
    "Archive copy: recursive, preserving permissions, ownership, timestamps, links and extended attributes such as SELinux contexts."
   ],
   [
    "mv",
    "Moves or renames files; within one file system it keeps the file's metadata unchanged."
   ],
   [
    "rm -r",
    "Recursively remove a directory and all of its contents."
   ],
   [
    "rmdir",
    "Remove a directory only if it is empty."
   ],
   [
    "Absolute path",
    "A path starting at the root directory /, independent of the current directory."
   ]
  ],
  "example": "A task says to copy /home/harry/site to /var/www/site keeping ownership and timestamps. You run `mkdir -p /var/www` then `cp -a /home/harry/site /var/www/` and check with `ls -lZ /var/www/site` that the owners and times match the source.",
  "mistakes": [
   [
    "Using cp -r when attributes must be preserved.",
    "-r copies recursively but the copies get your ownership and new timestamps. Use cp -a to preserve mode, ownership, times, links and SELinux contexts."
   ],
   [
    "Expecting mv to give a file the SELinux context of its new directory.",
    "Within one file system mv keeps the old context. Copy instead, or run restorecon after moving."
   ],
   [
    "Thinking mkdir can create nested paths without options.",
    "Plain mkdir needs the parent to exist. Use mkdir -p to create missing parents."
   ],
   [
    "Assuming deleted files can be recovered from a trash folder.",
    "rm at the command line deletes permanently. Preview with ls or echo before recursive deletes."
   ]
  ],
  "tryit": [
   [
    "A developer created index.html in her home directory and wants it served by the web server from /var/www/html. She asks whether to use mv or cp to put it there, and the server enforces SELinux. Which do you recommend, and why?",
    "Use cp (as root), so the new file receives the SELinux context of /var/www/html. If she uses mv, the file keeps its home-directory context and the web server may be denied access; she would then need restorecon on the file."
   ],
   [
    "You need to remove /srv/old, which you believe is empty, but you are not certain. Which command is safest?",
    "rmdir /srv/old. It succeeds only if the directory is empty and refuses otherwise, so you cannot accidentally delete contents you did not know about."
   ]
  ],
  "tip": "Know which command preserves what: mv within a file system keeps everything (including the old SELinux context), cp without -a takes new ownership and default attributes, and cp -a preserves them.",
  "check": [
   [
    "Why does `mkdir /a/b/c` fail on a fresh system while `mkdir -p /a/b/c` succeeds?",
    "Without -p the parent directories /a and /a/b must already exist; -p creates them."
   ],
   [
    "What does -a add to cp?",
    "Recursion plus preservation of mode, ownership, timestamps, links and extended attributes like SELinux contexts."
   ],
   [
    "Which command removes a directory only if it is empty?",
    "rmdir."
   ],
   [
    "How do you rename old.conf to new.conf?",
    "mv old.conf new.conf, because mv both moves and renames."
   ]
  ]
 },
 {
  "t": "Hard links vs symbolic links (ln, ln -s) and their limits",
  "hook": "At Lakeshore Community College, an application on the registration server expects its settings at /etc/app.conf, but the team keeps the real file on a separate data disk so it survives reinstalls. Kofi tries to link the two and gets \"Invalid cross-device link\". He tries a different kind of link, and it works. A month later, someone reorganizes the data disk, and the application suddenly cannot find its settings, even though /etc/app.conf still shows up in a listing. Two kinds of link, two very different behaviors. Which one should you use, and what are its limits?",
  "simple": "A link is a way to reach the same file from more than one place. Linux has two kinds. A hard link is a second name for exactly the same file: both names are equal, and the file stays alive as long as at least one name exists. A symbolic link (symlink) is a small signpost that says \"the real file is over there\". Signposts can point anywhere, even to another disk or to a folder, but if the real file moves, the signpost points at nothing. Think of a person with two equally official names on record (hard link) compared with a forwarding note on a door that says \"moved to room 204\" (symbolic link).",
  "body": [
   "To understand links you first need the idea of an inode, because both kinds of link are defined by how they relate to it. A file's data and metadata, such as owner, permissions, timestamps, size and the location of its data blocks, live in an inode, which is identified by a number. A file name is just a directory entry that points to an inode; the name itself is not stored in the inode. `ls -i` shows inode numbers, and the second column of `ls -l` shows the link count: how many names point to that inode. A freshly created file has a link count of 1.",
   "A hard link is simply another name for the same inode, created with `ln target linkname`. Both names are equal; neither is the \"original\", and no command can tell which name came first. Editing the file through one name changes what you see through the other, and they always share permissions, ownership and timestamps because there is only one inode holding them. Deleting one name only decrements the link count. The data is freed only when the count reaches zero and no process still has the file open, which is why removing a large log file that a running service still writes to does not free disk space until the service closes it.",
   "A symbolic (soft) link works differently: it is a separate small file, with its own inode, whose content is a path, created with `ln -s target linkname`. When you open the link, the system reads that path and follows it. `ls -l` shows a symlink with an `l` file type and an arrow: `lrwxrwxrwx ... current -> /opt/app-2.1`. If the target is moved or deleted, the symlink remains but points at nothing. This is called a dangling or broken link, and `ls` usually highlights it in red; trying to open it gives `No such file or directory`, which is confusing when `ls` clearly shows the name exists.",
   "```bash\nln /data/report.txt /data/report-hard.txt\nln -s /etc/httpd/conf/httpd.conf /root/httpd.conf\nls -li /data                  # same inode number, link count 2\nreadlink -f /root/httpd.conf  # where the symlink really points\n```",
   "The limits are what the exam asks about most. Hard links cannot cross file systems, because inode numbers are only unique within one file system; inode 1234 on /home and inode 1234 on /boot are unrelated files. Trying gives an `Invalid cross-device link` error. Hard links to directories are not allowed, not even for root, which prevents loops in the directory tree that would confuse tools that walk it. Symbolic links have neither restriction: they can point to directories, to files on other file systems, or even to paths that do not exist yet. The price is fragility, because they break when the target moves or is renamed.",
   "Argument order and relative targets cause most practical errors. `ln` takes the existing target first and the new name second, just like `cp`, so remember \"what exists, then what to create\". With symlinks, a relative target is stored as written and is interpreted relative to the link's own directory, not your current directory. So `ln -s ../conf/app.conf /etc/app.conf` points to `/conf/app.conf`, because `..` is resolved from /etc, wherever you happened to be standing when you created it. Using absolute targets avoids that confusion, and `readlink -f` shows the fully resolved path so you can check.",
   "Permissions behave differently for the two types as well. A symlink's own permissions, always shown as `rwxrwxrwx`, are ignored; access is decided entirely by the target's permissions. A hard link has no permissions of its own to ignore, because it shares the single inode, so changing permissions with `chmod` through either name changes them for both.",
   "Choosing between them is usually simple. Use a symbolic link when you need to cross file systems, link a directory, or create a stable name like `current` that you will repoint at new versions. Use a hard link when you want a second name that survives deletion of the first and both live on the same file system. On the exam, verify with `ls -li` (same inode number and higher link count for hard links) or `ls -l` (the arrow for symlinks). To find every name that shares an inode with a given file, `find / -samefile /data/report.txt` lists all of its hard links, and `find /etc -xtype l` is a quick way to spot broken symbolic links after a reorganization like the one in the opening story."
  ],
  "analogy": "A hard link is like a person listed under two equally valid names in the same town register: both entries lead to the same person, and removing one entry does not remove the person. A symbolic link is a forwarding note saying \"see the register in another town, entry 42\". The note can point to another town, but if that entry changes, the note leads nowhere. The limit of the analogy: town registers are the file systems, and hard-link entries can never point to another town's register.",
  "terms": [
   [
    "Inode",
    "The on-disk structure holding a file's metadata and data locations, identified by a number unique within its file system."
   ],
   [
    "Hard link",
    "An additional directory entry pointing to the same inode; created with ln."
   ],
   [
    "Symbolic link",
    "A special file containing a path to another file or directory; created with ln -s."
   ],
   [
    "Link count",
    "The number of hard links (names) referring to an inode, shown in the second column of ls -l."
   ],
   [
    "Dangling link",
    "A symbolic link whose target no longer exists."
   ],
   [
    "readlink -f",
    "Prints the fully resolved path that a symbolic link ultimately points to."
   ]
  ],
  "example": "An application expects its configuration at /etc/app.conf but you keep the real file on a separate /data file system. A hard link fails with 'Invalid cross-device link', so you create `ln -s /data/app/app.conf /etc/app.conf` and confirm it with `ls -l /etc/app.conf`.",
  "mistakes": [
   [
    "Believing deleting the original name of a hard-linked file deletes the data.",
    "There is no original; all names are equal. The data stays until the last name is removed and no process holds it open."
   ],
   [
    "Trying to hard-link across file systems or to a directory.",
    "Inode numbers are only meaningful within one file system, and directory hard links are forbidden. Use a symbolic link."
   ],
   [
    "Reversing the arguments to ln.",
    "The existing target comes first and the new link name second, as with cp."
   ],
   [
    "Assuming a relative symlink target is resolved from your current directory.",
    "It is resolved from the directory containing the link. Use absolute targets or check with readlink -f."
   ]
  ],
  "tryit": [
   [
    "You need /opt/app/current to always point at the active release directory, such as /opt/app/release-2, and you will switch it to release-3 next month. Should you use a hard link or a symbolic link, and why?",
    "A symbolic link: `ln -s /opt/app/release-2 /opt/app/current`. Hard links cannot point to directories, and a symlink can easily be replaced later (for example with ln -sfn) to point at the new release."
   ]
  ],
  "tip": "Hard links: same inode, same file system only, no directories, survive deletion of the other name. Symlinks: separate file holding a path, can cross file systems and point to directories, break if the target moves.",
  "check": [
   [
    "If you delete the original name of a file that has a hard link, what happens to the data?",
    "Nothing is lost; the data remains reachable through the other name until the last link is removed."
   ],
   [
    "Why can't you hard-link a file from /home to /boot when they are different file systems?",
    "Hard links reference inode numbers, which are only meaningful within one file system."
   ],
   [
    "How can you tell a symbolic link in `ls -l` output?",
    "The first character is l and the name is followed by -> and the target path."
   ],
   [
    "How do you confirm two names are hard links to the same file?",
    "ls -li shows the same inode number for both and a link count of at least 2."
   ]
  ]
 },
 {
  "t": "Listing, setting and changing standard ugo/rwx permissions in numeric and symbolic form",
  "hook": "A help-desk ticket lands at Oakridge Credit Union: the finance team's shared folder is \"broken\". Wei can open her own spreadsheets but cannot see anyone else's. Tom can see the list of files but gets \"Permission denied\" when he opens one. And an intern somehow deleted a report he had no right to edit. You run a single listing command and see three short strings of letters and dashes. Somewhere in those nine characters per file, plus the ones on the folder itself, lies the answer to all three complaints. How do you read them, and how do you fix them precisely?",
  "simple": "Every file on Linux has an owner, a group, and a set of rules saying who may do what. There are three kinds of people: the owner (u), members of the file's group (g) and everyone else, the others (o). For each kind there are three rights: read (r), write (w) and execute (x, meaning run a program or enter a folder). You can set these with letters, like \"give the group write access\", or with numbers, where read is 4, write is 2 and execute is 1, added together for each kind of person. It is like a shared apartment: the tenant, the roommates and visitors each get their own set of keys for looking, changing and entering.",
  "body": [
   "Every file and directory has an owner user, an owning group and three sets of permissions, and reading them fluently is one of the most tested RHCSA skills. The three classes are the user who owns the file (u), members of the owning group (g) and everyone else, called others (o). Each set has read (r), write (w) and execute (x). `ls -l` shows them as ten characters, for example `-rwxr-x---`: the first character is the type (`-` regular file, `d` directory, `l` symbolic link), followed by three characters each for u, g and o. In that example, the owner can read, write and execute, the group can read and execute, and others have no access. Use `ls -ld dir` to see the permissions of a directory itself rather than its contents.",
   "The meaning of r, w and x differs between files and directories, and the exam tests this distinction. On a file, r lets you read the contents, w lets you change them and x lets you run the file as a program or script. On a directory, r lets you list the names inside, w lets you create, delete and rename entries in it, and x lets you enter the directory and reach things inside it. That directory w point explains the intern in the opening story: deleting a file depends on write permission on the directory, regardless of the file's own permissions. A directory with r but no x shows names, but you cannot open anything or see file details; with x but no r, you can open files whose names you already know but cannot list them.",
   "Numeric (octal) mode is the fastest way to set an exact mode. Each permission has a value: r = 4, w = 2, x = 1. Add them for each class and write three digits, in the order u, g, o. So 7 is rwx, 6 is rw-, 5 is r-x, 4 is r-- and 0 is nothing. `chmod 750 script.sh` gives the owner rwx, the group r-x and others nothing. `chmod 640 app.conf` is a typical configuration file mode: owner read-write, group read, others nothing. Numeric mode always sets all nine bits at once, which is ideal when a task states the exact final permissions.",
   "Symbolic mode changes permissions relative to what is already there, which is ideal when you must adjust one thing and leave the rest alone. It combines who (`u`, `g`, `o` or `a` for all), an operator (`+` add, `-` remove, `=` set exactly) and the permissions. `chmod g+w file` adds group write, `chmod o-rwx dir` removes everything for others, and `chmod u=rw,go=r file` sets an exact mode for each class separated by commas. `-R` applies a change recursively to a whole tree. The capital `X` adds execute only to directories and to files that already have execute for someone, which is handy for fixing a tree so directories become enterable without making every document executable.",
   "```bash\nls -ld /srv/shared\nchmod 2770 /srv/shared     # rwxrws---, setgid on the directory\nchmod u+x deploy.sh\nchmod -R g+rX /srv/docs\nchown harry:web /srv/web   # change owner and group\nchgrp web /srv/web/index.html\n```",
   "Ownership matters as much as the mode bits, because the bits only make sense relative to who owns the file. Ownership is changed with `chown user:group file` (only root can change the owning user) and with `chgrp group file`, which the owner can use to switch to another group they belong to. Both accept `-R` for whole trees. When a process accesses a file, Linux checks only the first matching class, in the order user, group, others. If you are the owner, only the user bits apply, even if the group bits would give you more. A file with mode `0470` therefore denies its owner write access even though the group can write, which surprises many people.",
   "New files get their starting permissions from the umask, a mask of bits to remove from the default maximums of 666 for files and 777 for directories. With a umask of 0022, new files start at 644 and directories at 755; with 0002, they start at 664 and 775. On RHEL, normal accounts with their own private group have commonly received 0002 and root 0022, but you can always check the current value with `umask`. Files never receive execute permission automatically, which is why you run `chmod u+x` on a new script.",
   "Finally, recognize the special bits so they do not confuse you. Setuid, setgid and sticky add a fourth leading digit, as in 2770 above, and appear in `ls -l` as `s` or `t` in the execute positions (or `S` and `T` when the underlying execute bit is not set). They are covered with collaborative directories, but on this topic you only need to read them correctly. After any change, verify with `ls -l` or `ls -ld` and compare the string to what the task requires."
  ],
  "analogy": "Picture a shared apartment with a lockbox of three keys for each of three groups: the tenant, the roommates and visitors. The read key lets you look in, the write key lets you rearrange, the execute key lets you walk through the door. A directory is the apartment itself: whoever can rearrange the apartment can throw out a box even if the box is locked. Where it stops working: a doorman checks only the first group you belong to, so a tenant never borrows the roommates' keys.",
  "mnemonic": "\"Four-two-one, read-write-run\": r = 4, w = 2, x = 1, added per class in the order u, g, o.",
  "terms": [
   [
    "ugo",
    "The three permission classes: user (owner), group and others; a means all three."
   ],
   [
    "Octal mode",
    "Numeric permissions where r=4, w=2 and x=1 are summed per class, e.g. 755 or 640."
   ],
   [
    "Symbolic mode",
    "chmod notation such as u+x, g-w or o=r that changes specific permissions."
   ],
   [
    "Execute on a directory",
    "Permission to enter the directory and access items within it."
   ],
   [
    "chown",
    "Changes a file's owning user and optionally its group (user:group)."
   ],
   [
    "umask",
    "A mask of permission bits removed from new files and directories when they are created."
   ]
  ],
  "example": "A task says only the owner of /root/backup.sh may read, write and run it, and its group may read it. You run `chmod 740 /root/backup.sh` and `ls -l` shows -rwxr-----. Later you use `chmod g+x` to let the group run it too, giving 750.",
  "mistakes": [
   [
    "Believing you need write permission on a file to delete it.",
    "Deleting removes a directory entry, so it depends on write (and execute) permission on the directory, not the file."
   ],
   [
    "Assuming an owner also gets the group's rights if they are in the group.",
    "Linux checks only the first matching class. The owner gets only the user bits."
   ],
   [
    "Thinking r on a directory is enough to open files inside.",
    "r lists names; x is needed to enter the directory and access its contents."
   ],
   [
    "Using chmod -R a+x to make a tree browsable.",
    "That makes every file executable. Use the capital X, as in chmod -R a+rX, which adds execute only to directories and already-executable files."
   ]
  ],
  "tryit": [
   [
    "A shared directory /srv/reports is set to drwxr--r-- and owned by root:finance. Members of finance say they can see file names with ls but cannot open any report. What is missing, and what command fixes it without giving others more access?",
    "The group lacks execute on the directory, so members can list names but not enter it. Run `chmod g+x /srv/reports` (giving drwxr-xr--). Others keep only r, and if others should have no access at all, also run chmod o-r."
   ]
  ],
  "tip": "Deleting a file depends on write permission on the DIRECTORY, not on the file. And remember the owner class is checked first: an owner with fewer rights than the group does not inherit the group's rights.",
  "check": [
   [
    "What octal mode corresponds to rw-r-----?",
    "640: rw- = 6, r-- = 4, --- = 0."
   ],
   [
    "What does execute permission on a directory allow?",
    "Entering (cd into) the directory and accessing files or subdirectories within it."
   ],
   [
    "What is the symbolic chmod command to remove all permissions from others?",
    "chmod o-rwx file (or chmod o= file)."
   ],
   [
    "Which command changes both the owner and group of /srv/web to harry and web?",
    "chown harry:web /srv/web"
   ]
  ]
 },
 {
  "t": "Finding documentation with man, man -k, info and /usr/share/doc",
  "hook": "Thirty minutes into a lab exam at the Westfield Technical Institute testing center, Ravi faces a task to make a new file system mount automatically at boot. He knows the file, but the order of the six fields has gone completely blank. There is no browser, no phone and no internet on the exam machines. The clock in the corner keeps moving. The answer is sitting on the very system he is working on, if he knows where to look and how to search it quickly. Where does a Linux system keep its own instruction manual, and how do you find the right page in seconds?",
  "simple": "Linux comes with its own built-in instruction manuals. The man command opens a manual page for a tool or a settings file, with sections showing how to type the command, what each option does and often examples. If you do not know the tool's name, man -k searches all the manual titles and short descriptions for a keyword. info opens longer, book-style guides for some tools. And the folder /usr/share/doc holds extra notes and sample settings files from installed software. It is like a library with a card catalog: man is reading one book, man -k is searching the catalog, and /usr/share/doc is the shelf of sample worksheets.",
  "body": [
   "The RHCSA exam is taken without internet access, so the documentation installed on the system is your only reference. Knowing how to find the right page quickly is a genuine exam skill: many candidates rescue a half-remembered option or configuration syntax by checking a man page or an example file. The same skill also makes you a better administrator on isolated production systems, where the local documentation matches exactly the software version installed, unlike a random web page.",
   "Manual pages, read with `man command`, are the main source, and they all share a predictable layout. Each page has NAME, SYNOPSIS (the syntax, with optional parts in square brackets and alternatives separated by `|`), DESCRIPTION, OPTIONS, often EXAMPLES near the end, and SEE ALSO pointing to related pages. Because the layout is consistent, you can jump straight to the part you need. Inside the viewer, `/text` searches forward, `n` jumps to the next match, `Space` pages down, `g` and `G` go to the top and bottom, and `q` quits. Searching for `EXAMPLES` with `/EXAMPLES` is often the fastest route to a working command.",
   "Man pages are organized in numbered sections, and the same name can exist in several of them. The ones you will use most are section 1 (user commands), 5 (file formats, such as `/etc/fstab`), 7 (overviews and conventions) and 8 (system administration commands). `man 5 passwd` describes the `/etc/passwd` file, while `man passwd` shows the first match, the `passwd` command in section 1. Search results and SEE ALSO lists show the section in parentheses, as in `crontab(5)`. For the exam, `man 5 fstab`, `man 5 crontab`, `man 5 sshd_config`, `man 7 regex` and `man 8 semanage-fcontext` are especially valuable; the last one includes ready-made examples of labeling a directory for a web server.",
   "When you do not know the page name, search by keyword. `man -k keyword` (the same as `apropos keyword`) searches page names and their one-line descriptions: `man -k partition` lists tools such as `fdisk`, `parted` and `gdisk`. The search relies on an index database. If it returns `nothing appropriate` on a fresh system, run `mandb` as root to build or update the index, then search again. Results can be long, so filter by section with grep, for example `man -k user | grep '(8)'` to see only administration commands. `man -K` (capital K) searches the full text of every page, which is thorough but slow.",
   "```bash\nman -k selinux | grep '(8)'   # admin commands about SELinux\nman 5 fstab                   # file format\nman -K 'Storage='            # full-text search (slow)\ninfo coreutils                # GNU info manual\nls /usr/share/doc/            # package docs and samples\n```",
   "`info` is the second documentation system, and it suits GNU tools in particular. It shows GNU info documents, which are structured more like books, with nodes (sections) and links between them. GNU tools such as coreutils, tar and grep often have their most complete documentation there, with the man page being a shorter summary. Move with the arrow keys, press Enter on a link to follow it, `u` to go up a level, `n` and `p` for the next and previous node, and `q` to quit. For a very fast reminder, many commands also print a usage summary with `--help`, which is often enough to recall a single option.",
   "Finally, `/usr/share/doc/` holds per-package directories with README files, licenses, change logs and, most usefully, sample configuration files. When you need the syntax of an unfamiliar configuration file, `rpm -qd package` lists that package's documentation files, including its man pages, and `/usr/share/doc/<package>/` often contains a commented example you can copy and adapt. If you know a file but not which package owns it, `rpm -qf /path/to/file` tells you, and then `rpm -qd` on that package shows the documentation.",
   "Build a quick search routine and practice it before exam day: try `--help` for a forgotten option, `man command` and `/EXAMPLES` for syntax, `man 5 file` for configuration formats, `man -k` when you do not know the name, and `/usr/share/doc` for samples. A minute spent in the right page is far cheaper than a misconfigured service that fails to start. Note too that some tools document their configuration in pages whose names you would not guess, which is exactly when `man -k` with a distinctive word from the file, such as `fstab` or `chrony`, earns its keep. Pages listed under SEE ALSO are a natural next step when the first page you open is close but not quite what you need."
  ],
  "analogy": "The documentation on a Linux system is like a library. man is opening a specific book on the shelf; the section number is the floor, so `man 5 passwd` sends you to the floor of file formats rather than the floor of commands. man -k is the card catalog that finds books by subject, and mandb is the librarian who must index new books before the catalog lists them. /usr/share/doc is the shelf of sample forms. The analogy stops at loans: nothing ever leaves the shelf, and there is no online catalog to fall back on during the exam.",
  "terms": [
   [
    "man page",
    "A manual page viewed with man, organized into standard sections such as SYNOPSIS, OPTIONS and EXAMPLES."
   ],
   [
    "Man section",
    "A numbered category of man pages: 1 user commands, 5 file formats, 7 overviews, 8 administration commands."
   ],
   [
    "man -k",
    "Searches man page names and descriptions for a keyword; equivalent to apropos."
   ],
   [
    "mandb",
    "Builds or updates the index database that man -k searches."
   ],
   [
    "info",
    "Viewer for GNU info documents, book-like manuals with linked nodes."
   ],
   [
    "/usr/share/doc",
    "Directory holding installed packages' extra documentation and sample configuration files."
   ]
  ],
  "example": "You cannot remember the name of the tool for changing a user's password expiry. `man -k expir` shows chage(1) among the results; `man chage` then reminds you that `chage -M 90 harry` sets the maximum password age.",
  "mistakes": [
   [
    "Running `man passwd` to learn the format of /etc/passwd.",
    "Without a section number man shows the first match, the command in section 1. Use man 5 passwd for the file format."
   ],
   [
    "Concluding that no relevant page exists when man -k returns nothing appropriate.",
    "The index may not have been built yet. Run mandb as root and search again."
   ],
   [
    "Ignoring /usr/share/doc because man pages seem enough.",
    "Many packages ship commented sample configuration files there, which are often quicker to adapt than reading a full man page."
   ],
   [
    "Expecting man -k to search the full text of pages.",
    "man -k searches only names and short descriptions. man -K searches full text, but slowly."
   ]
  ],
  "tryit": [
   [
    "During a practice exam you must schedule a job with a system crontab entry, but you cannot remember the order of the time fields. You type `man crontab` and see only command options for editing crontabs. What do you try next?",
    "The file format is in section 5, so run `man 5 crontab`, which describes the minute, hour, day of month, month and day of week fields. If unsure which sections exist, `man -k crontab` lists them with their section numbers."
   ]
  ],
  "tip": "If `man -k` returns 'nothing appropriate', the index has not been built yet: run mandb as root and search again. Use the section number (man 5 ...) when you need a file format rather than a command.",
  "check": [
   [
    "Which man section documents configuration file formats?",
    "Section 5, e.g. man 5 fstab or man 5 passwd."
   ],
   [
    "How do you search man pages when you don't know the command name?",
    "man -k keyword (apropos keyword), after mandb has built the index if needed."
   ],
   [
    "Where would you look for a sample configuration file shipped with a package?",
    "In /usr/share/doc/<package>/, which you can find with rpm -qd package."
   ],
   [
    "Inside the man viewer, how do you search forward for the word EXAMPLES?",
    "Type /EXAMPLES and press Enter; press n for the next match."
   ]
  ]
 },
 {
  "t": "Configuring access to RPM repositories: .repo files in /etc/yum.repos.d/ (baseurl, enabled, gpgcheck, gpgkey)",
  "hook": "A new server has just been racked at Harborview Food Bank, and Nadia's checklist says: install the web server, the database client and a few tools. Her first `dnf install` fails immediately with an error saying there are no enabled repositories. The server is not registered for updates, but a coworker left a note with the address of an internal package mirror. Every task on Nadia's list depends on this one step working, and a single wrong character in a short text file will make all of them fail. What exactly goes into that file, and how does she know it is right before moving on?",
  "simple": "Software on Red Hat Enterprise Linux comes in packages, and the dnf tool downloads them from repositories, which are organized collections of packages, like stores. To tell dnf where a store is, you write a small text file ending in .repo inside the folder /etc/yum.repos.d/. Each store gets a name in square brackets, an address (baseurl), a switch saying whether to use it (enabled), and a setting saying whether to check each package's digital signature (gpgcheck), plus where the signature key is (gpgkey). It is like adding a store to a delivery app: you give its name, its address, tell the app to include it, and decide whether to check the seal on every box.",
  "body": [
   "RHEL installs software as RPM packages; RPM originally stood for Red Hat Package Manager. The `dnf` tool downloads packages from repositories, which are directories of RPM files plus metadata describing them, and it resolves dependencies so that installing one package pulls in everything it needs. On the exam the systems are often not registered to Red Hat, so a task will give you the location of the BaseOS and AppStream repositories and ask you to configure the machine to use them. If this step is wrong, every later install task fails, so it is worth getting perfect and verifying immediately.",
   "Repositories are defined in files ending in `.repo` inside `/etc/yum.repos.d/`; files with any other extension are ignored. The directory still carries the name of yum, dnf's predecessor, and `yum` remains available as a name for dnf. Each file can contain one or more sections. A section starts with a repository ID in square brackets, which must be unique across all repo files and contain no spaces, followed by key=value settings, one per line. You can create the file with any editor or with a here-document, and the file name itself, such as `exam.repo`, can be anything that ends in `.repo`.",
   "```ini\n[BaseOS]\nname=RHEL BaseOS\nbaseurl=file:///mnt/rhel/BaseOS\nenabled=1\ngpgcheck=1\ngpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release\n\n[AppStream]\nname=RHEL AppStream\nbaseurl=file:///mnt/rhel/AppStream\nenabled=1\ngpgcheck=1\ngpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release\n```",
   "The location settings come first. `name` is a human-readable description that appears in dnf output. `baseurl` is the location of the repository, specifically the directory that contains the `repodata/` subdirectory where the metadata lives. It can be a web address (HTTP or HTTPS, the Hypertext Transfer Protocol and its secure form), an FTP (File Transfer Protocol) address or a local `file:` address. Note the three slashes in `file:///mnt/...`: two belong to the scheme and the third is the leading slash of the absolute path. On the exam you will use exactly the address the task gives you, copied carefully, because a single typo produces errors about failing to download metadata. `enabled=1` makes dnf use the repository, while `enabled=0` keeps the definition on disk but ignores it unless you enable it for one command with `--enablerepo`.",
   "The signature settings protect the system from tampered software. `gpgcheck=1` tells dnf to verify each package's GPG (GNU Privacy Guard) signature before installing it, which proves the package came from the publisher and was not altered in transit or on the mirror. `gpgkey` points to the public key used for that check; Red Hat's release keys are installed under `/etc/pki/rpm-gpg/`. If the task does not provide a key, or says signatures need not be checked, set `gpgcheck=0`. With gpgcheck enabled and no usable key, installs fail with a signature or public key error. Keys can also be imported directly into the RPM database with `rpm --import keyfile`. In real environments, keeping signature checking on is the secure choice; turning it off is an exam convenience only when the task allows it.",
   "Testing the file is the step that turns a guess into a finished task. `dnf repolist` should show both repository IDs with their names; `dnf repolist all` also shows disabled ones, which helps when a repository seems to be missing. Then install a small package, such as `dnf install -y tree`, to prove that metadata downloads, signatures verify and packages install. If something fails, read the error: it usually names the repository ID and the URL dnf tried.",
   "Typical mistakes are predictable, so check for them first. The baseurl may point one level too high or too low; it must be the directory that directly contains `repodata/`. The scheme may be mistyped, such as two slashes instead of three for a local path. `enabled=1` may be missing or set to 0. The gpgcheck setting may not match the available keys. Two sections may share the same ID. And on RHEL, BaseOS and AppStream are separate repositories, so configuring only one leaves many packages unavailable. After fixing a file, run `dnf clean all` so dnf discards stale cached metadata and tries the corrected settings fresh. Finally, remember that the repository configuration persists across reboots because it is just a file, so once `dnf repolist` and a test install succeed, every later software task on the exam can rely on it. If the task places the packages on local installation media instead of a network server, the same file works with `file:` addresses, provided the media is mounted at the path you name, and mounted again after a reboot."
  ],
  "analogy": "A .repo file is like an entry in a delivery app's list of stores. The ID in brackets is the store's unique code, baseurl is its street address (it must be the storefront itself, the directory with repodata, not the street or the back room), enabled decides whether the app shows that store, and gpgcheck with gpgkey is checking the tamper seal on every box against the brand's known seal. The analogy breaks at one point: dnf never phones the store to ask, so a wrong address simply fails.",
  "terms": [
   [
    "Repository",
    "A collection of RPM packages plus metadata (repodata) that dnf can download from."
   ],
   [
    "Repository ID",
    "The unique name in square brackets that starts a section of a .repo file."
   ],
   [
    "baseurl",
    "The URL of the directory containing the repository's repodata; may use web, FTP or file schemes."
   ],
   [
    "enabled",
    "Setting that makes dnf use the repository (1) or ignore it (0)."
   ],
   [
    "gpgcheck",
    "Setting that makes dnf verify package signatures (1) or skip verification (0)."
   ],
   [
    "gpgkey",
    "Location of the public key used to verify package signatures when gpgcheck=1."
   ]
  ],
  "example": "The task gives BaseOS and AppStream URLs on content.example.com. You create /etc/yum.repos.d/exam.repo with two sections using those URLs as baseurl, enabled=1 and gpgcheck=0 because no key was provided, then `dnf repolist` lists both and `dnf install -y tree` works.",
  "mistakes": [
   [
    "Configuring only the BaseOS repository.",
    "On RHEL, BaseOS and AppStream are separate repositories with different packages. Create a section, with its own unique ID, for each."
   ],
   [
    "Pointing baseurl at a parent directory of the repository.",
    "baseurl must be the directory that directly contains repodata/. Check the path the task gives and do not add or drop a level."
   ],
   [
    "Leaving gpgcheck=1 when no key is available.",
    "Installs then fail signature verification. Provide the correct gpgkey, import it with rpm --import, or set gpgcheck=0 if the task allows."
   ],
   [
    "Saving the definition with a .conf or .txt extension.",
    "dnf reads only files ending in .repo in /etc/yum.repos.d/."
   ]
  ],
  "tryit": [
   [
    "You create /etc/yum.repos.d/local.repo with two sections, both starting with [rhel]. `dnf repolist` shows only one repository and many packages cannot be found. What is wrong, and how do you fix it?",
    "Repository IDs must be unique, so the two sections collide and only one is used. Rename them, for example [BaseOS] and [AppStream], run `dnf clean all`, and confirm both appear in `dnf repolist`."
   ],
   [
    "The task gives repository addresses but no signing key and says package signatures do not need to be verified. Your installs fail with a public key error. What setting do you change?",
    "Set gpgcheck=0 in each section (the gpgkey line can then be removed), run dnf clean all, and retry the install."
   ]
  ],
  "tip": "baseurl must point to the directory that contains repodata/. On RHEL, BaseOS and AppStream are separate repositories, so you normally need two sections, each with its own unique ID.",
  "check": [
   [
    "What does `enabled=0` in a repository section do?",
    "It keeps the repository definition but dnf ignores it unless it is enabled, for example with --enablerepo."
   ],
   [
    "What happens with gpgcheck=1 and no valid gpgkey?",
    "Installing packages fails because dnf cannot verify their signatures."
   ],
   [
    "Where are repository definition files stored?",
    "In files ending in .repo under /etc/yum.repos.d/."
   ],
   [
    "Which command confirms that dnf sees your configured repositories?",
    "dnf repolist (or dnf repolist all to include disabled ones)."
   ]
  ]
 },
 {
  "t": "Dnf config-manager --add-repo, dnf repolist and dnf clean all",
  "hook": "It is the first hour of a practice exam, and the task sheet at Cedar Valley Logistics' training lab reads: 'Configure serverb to use the BaseOS and AppStream repositories at the given locations.' Priya, the junior admin beside you, starts typing a `.repo` file from memory and stalls on the exact key names. You know there is a faster route that writes the file for you. Then her `dnf install` fails with an error about a missing key, and a minute later a repository she fixed still shows old contents. Three small commands would have saved her ten minutes. Which ones, and in what order?",
  "simple": "Your server gets its software from online or local shelves called repositories. Before dnf, the software installer, can use a shelf, it needs a small settings file telling it where the shelf is. One command, `dnf config-manager --add-repo`, writes that settings file for you when you give it the shelf's address. A second command, `dnf repolist`, shows which shelves dnf currently knows about, so you can check your work. A third, `dnf clean all`, throws away dnf's saved copy of the shelf catalogs so it reads fresh ones. Think of a grocery app that remembers yesterday's price list: if the store changed, you refresh the app so you see today's list instead.",
  "body": [
   "Writing a `.repo` file by hand is only one way to add a repository. The `config-manager` subcommand, provided by the dnf-plugins-core package that Red Hat Enterprise Linux (RHEL) installs by default, can create the file for you, and two other commands let you check the result and reset dnf's cache. Together they make repository tasks on the Red Hat Certified System Administrator (RHCSA) exam quick to complete and easy to verify, which matters when a broken repository blocks every later task that needs a package.",
   "Start with what `--add-repo` actually does. `dnf config-manager --add-repo` followed by a Uniform Resource Locator (URL) creates a new `.repo` file in `/etc/yum.repos.d/`. If the URL ends in `.repo`, dnf downloads that file as is. Otherwise it treats the URL as a repository location and writes a minimal definition: an ID and a name derived from the URL, the URL itself as `baseurl`, and `enabled=1`. What it does not write is a `gpgkey` line. GPG (GNU Privacy Guard) signatures are how dnf proves packages really came from the vendor, and with `gpgcheck` on but no key configured, installs fail with a key error. So after using `--add-repo` you usually open the generated file and add either `gpgcheck=0` (only if the task allows it) or the correct `gpgkey=` line, for example pointing at `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release`.",
   "```bash\ndnf config-manager --add-repo file:///mnt/rhel/BaseOS\ndnf config-manager --add-repo file:///mnt/rhel/AppStream\nls /etc/yum.repos.d/\nvim /etc/yum.repos.d/mnt_rhel_BaseOS.repo   # add gpgcheck / gpgkey\ndnf config-manager --set-disabled mnt_rhel_AppStream\ndnf repolist all\n```",
   "Look before you edit. The exact file names and IDs generated depend on the URL, with slashes and other characters turned into underscores, so list the directory rather than guessing. A generated file typically contains a section header such as `[mnt_rhel_BaseOS]`, a `name=` line saying it was created by dnf config-manager, the `baseurl=` and `enabled=1`. Beyond adding repositories, `config-manager` can switch existing repositories on and off persistently with `--set-enabled` and `--set-disabled` followed by the repository ID; this simply rewrites the `enabled=` line in the file. For a single command you can override the configuration temporarily with `--enablerepo=ID` or `--disablerepo=ID`, which changes nothing on disk.",
   "Next, prove the configuration works. `dnf repolist` shows the enabled repositories with their IDs and names. `dnf repolist all` includes disabled ones and adds a status column reading enabled or disabled, and `dnf repolist -v` shows details such as the baseurl, the package count and when metadata was last refreshed. It is the fastest proof that your configuration works: if a repository is missing from the list, or dnf prints a message that it cannot download metadata for a repository ID, the file or URL needs fixing. A typo in the `baseurl` path is the most common cause, followed by a section header that is missing its square brackets.",
   "Then understand the cache. dnf stores repository metadata, the catalog of which packages exist and their checksums, along with downloaded packages under `/var/cache/dnf/`. That saves time, but when you change a repository's address or its content, the cache can make dnf keep using old information. `dnf clean all` deletes the cached metadata and packages for enabled repositories so the next command downloads fresh metadata, and `dnf makecache` downloads it immediately rather than waiting for the next install. dnf would eventually refresh on its own when the cached metadata expires, an interval set by the `metadata_expire` option, but on an exam you do not want to wait for that or wonder whether it has happened. It is a good reflex after editing repository files or whenever you see errors mentioning metadata or checksums.",
   "A sensible order for any repository task is therefore: add or edit the files, fix the GPG settings, run `dnf clean all`, then `dnf repolist` to confirm both repositories appear with a non-zero package count, and finally install one small package as a real test. Graders check results, not the commands you typed, so a working `dnf install` is the evidence that counts.",
   "Finally, remember persistence. Repository configuration lives in files, so there is nothing extra to do for it to survive a reboot, unlike a mount or a firewall rule that needs a permanent flag. The files must still be syntactically correct and the location reachable at boot time as well as now; a repository on a mounted ISO image, for example, only works after reboot if that mount is also persistent."
  ],
  "analogy": "Think of `/etc/yum.repos.d/` as the contacts list on your phone and each `.repo` file as one contact card. `config-manager --add-repo` is like tapping 'add contact' from a business card: it fills in the address but leaves the verification code blank, so you add that yourself. `dnf repolist` is scrolling through your contacts. `dnf clean all` is clearing the app's cache so it re-syncs. The analogy stops at caching: dnf rebuilds its cache automatically when metadata expires, so cleaning is a shortcut, not the only way it refreshes.",
  "terms": [
   [
    "dnf config-manager",
    "dnf plugin command (from dnf-plugins-core) for adding repositories and persistently enabling or disabling them."
   ],
   [
    "--add-repo",
    "Creates a .repo file in /etc/yum.repos.d from a repository URL, or downloads a ready-made .repo file."
   ],
   [
    "dnf repolist",
    "Lists enabled repositories; add all to include disabled ones, -v for details such as baseurl and package count."
   ],
   [
    "dnf clean all",
    "Removes cached repository metadata and packages so dnf fetches fresh data."
   ],
   [
    "dnf makecache",
    "Downloads and caches repository metadata immediately."
   ],
   [
    "--enablerepo / --disablerepo",
    "Options that enable or disable a repository for one dnf command only, without changing files."
   ],
   [
    "gpgcheck / gpgkey",
    "Repository settings that turn signature checking on or off and point to the key used to verify packages."
   ]
  ],
  "example": "After running `dnf config-manager --add-repo` for the two URLs in the task, `dnf install httpd` fails with a GPG key error. You edit each generated file in /etc/yum.repos.d, add gpgcheck=0 as the task allows, run `dnf clean all` and `dnf repolist`, see both repositories listed with package counts, and the install now succeeds.",
  "mistakes": [
   [
    "Assuming `--add-repo` produces a complete, ready-to-use repository file.",
    "It writes only an ID, name, baseurl and enabled=1. You must add gpgcheck=0 or a gpgkey line yourself, or installs fail on signature checks."
   ],
   [
    "Guessing the generated repository ID when running --set-disabled or editing the file.",
    "The ID is derived from the URL. Run `ls /etc/yum.repos.d/` or `dnf repolist all` and copy the exact ID."
   ],
   [
    "Using --disablerepo=ID when the task asks for a repository to stay disabled.",
    "--disablerepo affects only that one command. For a persistent change use `dnf config-manager --set-disabled ID` or set enabled=0 in the file."
   ],
   [
    "Believing repository changes need a service restart or extra step to survive a reboot.",
    "dnf reads the .repo files every time it runs; the files persist on their own. Only the underlying source, such as a mounted ISO, may need its own persistence."
   ]
  ],
  "tryit": [
   [
    "You fixed a typo in the baseurl of a repository on serverb, but `dnf install vsftpd` still reports a package that does not match what the corrected repository holds. `dnf repolist` lists the repository as enabled. Nothing else has changed. What do you run before trying the install again, and why?",
    "Run `dnf clean all` (optionally followed by `dnf makecache`). dnf is still using metadata cached from the old location under /var/cache/dnf; cleaning forces it to download fresh metadata from the corrected baseurl."
   ],
   [
    "A task says: 'Make the AppStream repository unavailable by default, but you may use it once to install a package.' Which two commands meet both parts?",
    "`dnf config-manager --set-disabled <AppStream ID>` makes it persistently disabled, and `dnf install --enablerepo=<AppStream ID> package` uses it for that one command without changing the file."
   ]
  ],
  "tip": "config-manager --add-repo does not configure a GPG key. Check the generated file and add gpgcheck or gpgkey yourself, run dnf clean all, then confirm with dnf repolist and a test install.",
  "check": [
   [
    "How do you list disabled as well as enabled repositories?",
    "dnf repolist all, which adds a status column."
   ],
   [
    "Why run `dnf clean all` after changing a repository's baseurl?",
    "To remove stale cached metadata so dnf downloads current metadata from the new location."
   ],
   [
    "How do you disable a repository persistently by its ID?",
    "dnf config-manager --set-disabled ID (or set enabled=0 in its .repo file)."
   ],
   [
    "Which line does `dnf config-manager --add-repo` leave out that often causes install failures?",
    "The gpgkey line; with gpgcheck on and no key, signature checks fail."
   ]
  ]
 },
 {
  "t": "Installing, updating and removing RPM packages with dnf (install, remove, update, reinstall, history undo)",
  "hook": "It is 4:40 p.m. on a Friday at Northwind Dental Group, and Marcus on the infrastructure team pings you: he cleaned up an old package on the patient-scheduling server and now the web front end will not start. His shell history shows a single `dnf remove -y` line, but the summary he never read removed far more than one package. The clinic opens at 8 a.m. Monday. You could try to remember every package by name and reinstall them one by one, or you could ask dnf what it did and simply reverse it. How do you undo a package change cleanly, and how do you avoid causing one in the first place?",
  "simple": "dnf is the tool that adds, updates and removes software on Red Hat Enterprise Linux. Software is often built from parts that depend on other parts, the way a coffee machine needs a water tank and a filter. When you install something, dnf brings along the parts it needs. When you remove something, dnf also removes things that cannot work without it. dnf also keeps a diary of every change it makes. If a change goes wrong, you can look up that diary entry and tell dnf to undo it, putting back what it removed and taking away what it added. And if a program's files get damaged, you can ask dnf to reinstall the same version to put fresh copies back.",
  "body": [
   "Start with the job dnf does. `dnf` is the package manager on Red Hat Enterprise Linux (RHEL). It installs software from the configured repositories while resolving dependencies: if a package needs libraries or other packages, dnf finds and installs them too, and when you remove something it removes packages that depend on it. Packages are RPM files (RPM Package Manager format) that bundle programs, configuration files and metadata. Almost every service task on the Red Hat Certified System Administrator (RHCSA) exam begins with installing a package, so these commands need to be second nature.",
   "Installing and removing come first. `dnf install package` installs one or more packages, showing a transaction summary of what will be installed, upgraded or removed, its total download size, and asking 'Is this ok [y/N]'; `-y` answers yes automatically. You can also install a local RPM file with `dnf install ./file.rpm`, and dnf will pull any missing dependencies from the repositories, which is why it is preferred over `rpm -i` for local files. `dnf remove package` uninstalls a package plus anything that depends on it. Read the summary before confirming so you do not remove more than intended; the 'Removing dependent packages' section is the part that surprises people.",
   "Updating keeps the system current. `dnf update` (also spelled `dnf upgrade`; both work) installs newer versions of all installed packages, or only of the ones you name, as in `dnf update openssh-server`. `dnf check-update` lists available updates without installing them, which is useful before a maintenance window. Kernel packages are special: dnf installs the new kernel alongside the old ones rather than replacing it, so you can choose an older kernel from the boot menu if the new one has problems. Only a limited number of kernels are kept, controlled by the `installonly_limit` setting in `/etc/dnf/dnf.conf`, and the oldest is removed when the limit is exceeded.",
   "Reinstalling is the repair tool. `dnf reinstall package` reinstalls the same version that is already installed. This is the quick fix when files belonging to a package were deleted or damaged, for example a removed binary or a mangled default configuration file in a lab. It puts back the packaged files without changing the version, and it is far faster than removing and installing again, which could also take dependent packages with it.",
   "```bash\ndnf install -y httpd mod_ssl\ndnf remove -y telnet\ndnf update -y\ndnf reinstall -y openssh-server\ndnf history               # list past transactions\ndnf history info 7        # what transaction 7 changed\ndnf history undo 7        # reverse it\n```",
   "History is your safety net. Every dnf transaction is recorded in a local database. `dnf history` lists transactions with an ID, the command line, the date and time, the action (Install, Removed, Upgrade and so on) and the number of packages changed. `dnf history info ID` shows exactly which packages were installed, upgraded or removed in that transaction and which user ran it. `dnf history undo ID` reverses that one transaction: packages it installed are removed and packages it removed are reinstalled, provided the needed versions are still available from a repository. `dnf history rollback ID` goes further and undoes every transaction after the given one, returning the package set to how it was at that point. The undo is itself recorded as a new transaction, so you can see it in the list afterwards.",
   "Keep the difference between undo and rollback straight, because it is a favorite distractor. Undo targets one transaction and leaves everything else alone. Rollback returns to a point in time and reverses all later transactions. If you installed a package in transaction 10 and several unrelated updates happened in 11 and 12, `dnf history undo 10` removes just that package, while `dnf history rollback 9` would also reverse 11 and 12.",
   "Finally, build safe habits. Use `dnf list installed name` or `rpm -q name` to confirm a result. Add `--assumeno` to see the full transaction summary a command would produce without changing anything, which is a cheap way to check what a remove would take with it. Most exam tasks only require that the software is installed and working afterwards, and 'working' often also means the service is enabled and started with `systemctl enable --now`, so do not stop at the install."
  ],
  "analogy": "dnf history works like the order history in a delivery app. Each order lists every item that arrived or was returned. 'Undo order 7' sends back exactly what came in order 7 and reorders what you returned in it. 'Roll back to order 7' reverses every order placed after it. The analogy breaks in one place that matters: dnf can only put back a removed package if a repository still offers that version, just as a store cannot reship an item it no longer stocks.",
  "terms": [
   [
    "dnf install",
    "Installs packages and their dependencies from enabled repositories or local RPM files."
   ],
   [
    "dnf remove",
    "Uninstalls packages together with packages that depend on them."
   ],
   [
    "dnf update",
    "Upgrades installed packages to the newest available versions; also called dnf upgrade."
   ],
   [
    "dnf reinstall",
    "Reinstalls the current version of a package, restoring its packaged files."
   ],
   [
    "dnf history undo",
    "Reverses the changes made by one specific recorded dnf transaction."
   ],
   [
    "dnf history rollback",
    "Undoes every transaction after the given ID, returning to that point."
   ],
   [
    "installonly_limit",
    "dnf.conf setting that limits how many versions of install-only packages, such as kernels, are kept."
   ]
  ],
  "example": "In a lab you accidentally removed a package group that took several tools with it. `dnf history` shows the removal as transaction 12; `dnf history info 12` confirms the list, and `dnf history undo 12` reinstalls everything it removed. A new transaction 13 appears, recording the undo.",
  "mistakes": [
   [
    "Thinking `dnf history undo 7` reverses everything since transaction 7.",
    "Undo reverses only transaction 7. Reversing all later transactions is `dnf history rollback`."
   ],
   [
    "Picking remove-then-install to fix a deleted binary.",
    "Removing may take dependent packages with it. `dnf reinstall package` restores the files without touching anything else."
   ],
   [
    "Believing dnf replaces the running kernel on update.",
    "Kernels are install-only: the new one is added alongside the old ones so you can boot a previous version if needed."
   ],
   [
    "Using `rpm -i` for a downloaded RPM because it feels more direct.",
    "rpm does not fetch missing dependencies from repositories and is not recorded in dnf history. Use `dnf install ./file.rpm`."
   ]
  ],
  "tryit": [
   [
    "A colleague ran `dnf install -y php` (transaction 21). Since then, transaction 22 updated openssh and transaction 23 installed vim-enhanced. Your manager wants PHP and everything it pulled in gone, but the openssh update and vim must stay. What do you run?",
    "`dnf history info 21` to confirm, then `dnf history undo 21`. Undo reverses only that transaction. A rollback to 20 would also reverse transactions 22 and 23, which is not wanted."
   ],
   [
    "During a lab, someone deleted /usr/sbin/sshd. The file is gone, but you know it belongs to openssh-server. How do you restore it with the least disruption?",
    "`dnf reinstall -y openssh-server`. It replaces the package's files at the same version without removing dependents, then you restart sshd."
   ]
  ],
  "tip": "Prefer `dnf install ./file.rpm` over `rpm -i file.rpm` for local packages: dnf resolves dependencies from the repositories and records the change in dnf history, so you can undo it later.",
  "check": [
   [
    "How do you restore files deleted from an installed package?",
    "dnf reinstall package."
   ],
   [
    "What does `dnf history undo 5` do?",
    "It reverses transaction 5: removes what it installed and reinstalls what it removed, if those versions are available."
   ],
   [
    "Why does dnf keep old kernels after an update?",
    "New kernels are installed alongside old ones so you can boot a previous kernel if the new one fails."
   ],
   [
    "How can you see what a dnf remove would take with it without removing anything?",
    "Run it with --assumeno (or read the summary and answer N)."
   ]
  ]
 },
 {
  "t": "Finding packages and files: dnf search, dnf provides, dnf info",
  "hook": "You open the next exam-practice task at Bluestone Community College's Linux lab: 'Allow the web server to listen on port 82 by labeling the port for SELinux.' You type `semanage port -l` and the shell answers 'command not found'. Next to you, Dana starts guessing package names out loud: semanage, selinux-tools, policycoreutils. Each `dnf install` attempt fails or installs the wrong thing, and the clock keeps moving. You know dnf can answer the real question directly: not 'what is this package called?' but 'which package puts this command on my system?' Which subcommand asks that, and when would you reach for the others instead?",
  "simple": "Often you know what you want a computer to do, or the name of a command, but not the name of the software package that contains it. dnf, the Red Hat software installer, has three ways to look things up. 'Search' looks for a word in package names and short descriptions, like typing 'blender' into a store's search box. 'Provides' answers 'which package contains this exact file or command?', like asking a clerk which box a specific screw comes in. 'Info' shows the label on one package: its version, size, where it comes from and what it does. Use search when you know the job, provides when you know the command, and info to double-check before installing.",
  "body": [
   "Start with the gap these tools close. Exam tasks on the Red Hat Certified System Administrator (RHCSA) exam rarely tell you the exact package name. They say 'install the tool that provides the semanage command' or 'make sure the system can serve web pages'. Three dnf subcommands bridge the gap between what you need and the package that delivers it: `search`, `provides` and `info`, with `dnf list` and `rpm -qf` as useful companions.",
   "Use search when you know the kind of software. `dnf search keyword` looks for the keyword in package names and summaries across all enabled repositories. `dnf search web server` lists packages whose name or summary matches, with matches on the name shown first under a heading such as 'Name Exactly Matched' or 'Name & Summary Matched', followed by summary-only matches. If you get too few hits, `dnf search --all keyword` also searches descriptions and URLs (Uniform Resource Locators). Search is best when you know what the software does but not what it is called. Its weakness is that a short keyword can return dozens of loosely related packages, so read the summaries carefully.",
   "Use provides when you know a file or command. `dnf provides` (also spelled `dnf whatprovides`) answers a different question: which package contains a particular file or command? Give it a full path, a command name or a glob pattern. `dnf provides semanage` reports policycoreutils-python-utils, which installs `/usr/sbin/semanage`; `dnf provides '*/bin/sealert'` finds the package with the SELinux (Security-Enhanced Linux) troubleshooting tool. Quote globs so your shell does not try to expand them against local files first. The output lists each matching package with its version and repository, followed by a 'Matched from' line showing the file name that matched. This is the most useful of the three on the exam, because many tasks name a command rather than a package.",
   "```bash\ndnf search nfs\ndnf provides semanage\ndnf provides '*/bin/ifconfig'\ndnf info httpd\ndnf list --installed 'python3*'\ndnf list --available 'php*'\n```",
   "Use info to confirm before you install. `dnf info package` shows a package's details: name, version, release, architecture, size, the repository it comes from, a summary, the license and a description. The Repository field shows `@System` when the package is already installed, and if it is both installed and available in a newer version, dnf shows an 'Installed Packages' section and an 'Available Packages' section. Use it to confirm you have the right package before installing it, to see what version a repository offers, or to read the description when two search results look similar. You can give it several names or a quoted glob, such as `dnf info 'httpd*'`, to compare related packages side by side, which helps when one name is the main program and another is a module or documentation package.",
   "Use list for name patterns. `dnf list` complements these by showing packages by name pattern, divided into installed and available sections, and it accepts globs such as `'kernel*'`. It answers questions like 'which Python 3 packages are installed?' quickly. The version column also tells you whether an update is waiting, because an available package with a higher version appears alongside the installed one. To see only packages that have newer versions waiting, `dnf list --upgrades` narrows the output, and `--installed` or `--available` limit it to one section, as the example commands above show.",
   "Know when rpm is faster. For files belonging to packages that are already installed, `rpm -qf /path` is faster than `dnf provides` because it only reads the local RPM (RPM Package Manager) database. `dnf provides`, by contrast, searches repository metadata and can therefore find files in packages you have not installed yet, which is exactly the situation when a command is missing. A good rule: if the file exists on disk and you want its owner, use `rpm -qf`; if the file is missing and you want to install it, use `dnf provides`.",
   "Finally, check the foundations when searches come back empty. All of these dnf lookups depend on working repositories. If they return nothing, or only installed packages, first check `dnf repolist`: an empty or broken repository configuration is a far more common cause than a package that does not exist. Stale metadata can also hide recently added packages, which `dnf clean all` fixes."
  ],
  "analogy": "Imagine a large hardware store. `dnf search` is the store's search kiosk: type 'garden hose' and it shows every product with those words in its name or label. `dnf provides` is asking the clerk, 'which kit includes this exact washer?' and getting the one box that contains it. `dnf info` is reading the full label on a box before you buy it. `rpm -qf` is checking a receipt for something you already took home: it only knows about what you own, not what is still on the shelves.",
  "terms": [
   [
    "dnf search",
    "Searches package names and summaries (or with --all, descriptions and URLs too) for keywords."
   ],
   [
    "dnf provides",
    "Finds which package contains a given file, command or path glob; also called whatprovides."
   ],
   [
    "dnf info",
    "Displays details about a package, such as version, repository, size, license and description."
   ],
   [
    "dnf list",
    "Lists installed and available packages matching a name pattern."
   ],
   [
    "@System",
    "Label dnf uses to show that a package is installed locally rather than available from a repository."
   ],
   [
    "rpm -qf",
    "Queries the local RPM database for the installed package that owns a file."
   ]
  ],
  "example": "A task asks you to set an SELinux port label, but `semanage` is not found. `dnf provides semanage` shows that policycoreutils-python-utils supplies /usr/sbin/semanage, so you run `dnf install -y policycoreutils-python-utils` and continue with the task.",
  "mistakes": [
   [
    "Using `dnf search semanage` to find the package for a command.",
    "Search matches names and summaries, and the command name may not appear in either. `dnf provides semanage` matches the actual file the package installs."
   ],
   [
    "Using `rpm -qf` to find the package for a command that is not installed.",
    "rpm only reads the local database of installed packages. For a missing file, search repository metadata with `dnf provides`."
   ],
   [
    "Leaving globs unquoted, as in dnf provides */bin/sealert.",
    "The shell may expand the pattern against local files before dnf sees it. Quote it: `dnf provides '*/bin/sealert'`."
   ],
   [
    "Concluding a package does not exist because search found nothing.",
    "Check `dnf repolist` first; disabled or broken repositories are the usual cause."
   ]
  ],
  "tryit": [
   [
    "A task says: 'Ensure the dig command is available.' `dig` returns 'command not found'. You have two minutes left on this task. Which command finds the right package, and what do you do next?",
    "Run `dnf provides dig` (or `dnf provides '*/bin/dig'`). It reports the package that installs /usr/bin/dig (bind-utils on RHEL); install it with `dnf install -y` and run `dig -v` to confirm."
   ],
   [
    "You found two packages in `dnf search ftp` with similar names and are unsure which is the server. What do you run before installing?",
    "`dnf info` on each package and read the summary and description; the server package will describe itself as a daemon or server."
   ]
  ],
  "tip": "When a task names a command, not a package, reach for `dnf provides command` (quote globs like '*/bin/name'). Use dnf search when you only know what the software does, and dnf info to confirm before installing.",
  "check": [
   [
    "Which command tells you which package would install /usr/bin/dig?",
    "dnf provides /usr/bin/dig (or dnf provides dig)."
   ],
   [
    "How can dnf info show you whether a package is already installed?",
    "Installed packages list the repository as @System or appear under 'Installed Packages'."
   ],
   [
    "Why might dnf search return no results for a package that exists?",
    "The repositories may be misconfigured or disabled; check dnf repolist first."
   ],
   [
    "When is rpm -qf the better choice than dnf provides?",
    "When the file already exists on disk and you only need its owning installed package; rpm reads the local database and is faster."
   ]
  ]
 },
 {
  "t": "Querying installed packages with rpm -q, -qa, -qi, -ql, -qf, -qc",
  "hook": "An auditor from Lakeshore Health's compliance office stands behind your chair with a clipboard. She has three questions about the patient-portal server: Is the chrony time service installed, and which version? Where does it keep its configuration? And who put that odd file in /etc that nobody recognizes? The server has no internet access during the audit window, so repository searches are out. Everything you need is already on the machine, in a database that records every installed package and every file it delivered. Which rpm options answer each of her questions in seconds?",
  "simple": "Every Red Hat system keeps a record book of all the software installed on it: each package's name, version and the list of files it put on the disk. The `rpm -q` command lets you ask that record book questions. Is this program installed? What version? What files did it install? Which of those are settings files? And, working backwards, which package does this file belong to? Because the record book lives on the machine itself, these questions work even without a network. It is like checking the inventory list at a warehouse instead of calling every supplier: fast, local and accurate for what is already on the shelves.",
  "body": [
   "Start with where rpm gets its answers. While `dnf` handles repositories and dependencies, the lower-level `rpm` command (RPM originally stood for Red Hat Package Manager and is now RPM Package Manager) reads the local RPM database directly. That database describes every package installed on the system, including each file it delivered with its size, permissions and checksum. rpm's query mode, `-q`, is fast, works offline and is the standard way to answer questions such as 'is this installed?', 'which files did it install?' or 'which package owns this file?'.",
   "Begin with the simplest queries. `rpm -q package` checks whether a package is installed and prints its full name with version, release and architecture, in a form like `openssh-server-<version>-<release>.el10.x86_64`, or the message 'package X is not installed'. Because it sets its exit status accordingly, zero when installed and non-zero when not, it is also handy in scripts: `rpm -q httpd || dnf install -y httpd`. `rpm -qa` lists all installed packages, often several hundred lines; pipe it to `grep` or give it a quoted glob, as in `rpm -qa 'kernel*'`, to narrow the list. Adding `--last`, as in `rpm -qa --last | head`, sorts packages by install time with the newest first, which quickly answers 'what changed on this server recently?' when you suspect a recent install caused a problem.",
   "Then add detail about a package. `rpm -qi package` shows information similar to `dnf info`: name, version, release, install date, build host, vendor, signature, license, summary and description. The install date is handy for questions like 'when was this added?'. `rpm -ql package` lists every file the package installed, one full path per line. `rpm -qc package` lists only its configuration files, which is often the quickest way to discover where a service keeps its settings. `rpm -qd` lists its documentation files, such as man pages and files under `/usr/share/doc`. Two more are worth knowing: `rpm -qR package` lists what the package requires, and `rpm -q --scripts package` shows any scripts it runs during installation or removal. Option letters combine freely after `-q`, so `rpm -qil chrony` prints the information block followed by the full file list.",
   "Work backwards from a file with -f. `rpm -qf /path/to/file` tells you which installed package owns a file. `rpm -qf /etc/ssh/sshd_config` returns openssh-server. If the answer is 'file ... is not owned by any package', the file was created locally by an administrator or by an application at runtime, which is itself useful information during troubleshooting or an audit. Combine it with command substitution to find the package of a command: `rpm -qf $(which ss)` resolves the command to its path first and then asks who owns it.",
   "```bash\nrpm -q httpd\nrpm -qa | wc -l\nrpm -qi chrony\nrpm -ql chrony | grep bin\nrpm -qc chrony            # /etc/chrony.conf and friends\nrpm -qf /usr/bin/ssh\nrpm -qp --list ./app.rpm  # query a package file not yet installed\n```",
   "Query package files with -p. Adding `-p` points the query at an RPM file instead of the installed database, so `rpm -qpl file.rpm` shows what a downloaded package would install before you install it, and `rpm -qpi file.rpm` shows its details. This is a sensible safety step for any RPM handed to you outside a repository: you can see exactly where its files would land.",
   "Verify files with -V. `rpm -V package` compares the installed files against what the database recorded and prints nothing if everything matches. When something differs, it prints a line with a string of codes and the file name: for example `S` means the size changed, `5` the checksum changed, `M` the mode (permissions) changed and `T` the modification time changed, with a `c` marking configuration files. Edited configuration files will naturally show differences; a changed binary is worth investigating, and `dnf reinstall` repairs it.",
   "Finally, keep the division of labor clear. Use rpm for queries, but install and remove with dnf. Installing with `rpm -i` does not resolve dependencies from repositories and is not recorded in dnf history, so you lose the undo safety net. On the Red Hat Certified System Administrator (RHCSA) exam, rpm queries are your fastest way to find configuration files and confirm results, while dnf does the actual changes."
  ],
  "analogy": "The RPM database is like a library's catalog. `rpm -q` asks whether the library owns a book, `-qi` reads its catalog card, `-ql` lists every chapter, `-qc` lists only the chapters you are allowed to annotate, and `-qf` takes a loose page found on a table and tells you which book it was torn from. `-p` is reading the catalog card of a book that has been delivered but not yet shelved. The analogy breaks for search: the catalog knows only books already in this library, never ones you could order.",
  "terms": [
   [
    "RPM database",
    "The local database recording every installed package and its files, queried with rpm -q."
   ],
   [
    "rpm -qa",
    "Lists all installed packages; accepts a quoted glob to narrow the list."
   ],
   [
    "rpm -ql / -qc / -qd",
    "Lists all files, only the configuration files, or only the documentation files installed by a package."
   ],
   [
    "rpm -qf",
    "Shows which installed package owns a given file."
   ],
   [
    "rpm -qi",
    "Shows detailed information about an installed package, including install date and signature."
   ],
   [
    "rpm -qp",
    "Queries an RPM package file instead of the installed database."
   ],
   [
    "rpm -V",
    "Verifies installed files against the database and reports changes in size, checksum, mode and more."
   ]
  ],
  "example": "You need to change the NTP (Network Time Protocol) servers but are unsure of the file. `rpm -qc chrony` lists /etc/chrony.conf, so you edit it, add your server line and restart chronyd. Later `rpm -qf /etc/chrony.conf` confirms it belongs to chrony, and `rpm -V chrony` shows it as a modified configuration file, as expected.",
  "mistakes": [
   [
    "Using `rpm -qf` with a package name, as in rpm -qf httpd.",
    "-f expects a file path and answers 'who owns this file'. For a package name use `rpm -q httpd`, and `rpm -ql httpd` to list its files."
   ],
   [
    "Expecting rpm -q to find packages that are only available in repositories.",
    "rpm queries only the installed database. For packages not yet installed use dnf search, dnf info or dnf provides."
   ],
   [
    "Treating any output from rpm -V as proof of tampering.",
    "Configuration files you edited legitimately will show size and checksum changes. Look closely at unexpected changes to binaries."
   ],
   [
    "Installing a downloaded package with rpm -i because rpm is already open.",
    "Use rpm for queries and dnf to install: `dnf install ./file.rpm` resolves dependencies and records history."
   ]
  ],
  "tryit": [
   [
    "You find /etc/cron.d/cleanup on a server and no one remembers creating it. `rpm -qf /etc/cron.d/cleanup` reports that the file is not owned by any package. What does that tell you, and what would you check next?",
    "It was created locally, by an administrator, a script or an application, not installed by a package. Next, check its ownership and timestamps with ls -l, look at what it runs, and search logs or change records for who added it."
   ],
   [
    "A task says: 'Configure the vsftpd service; settings must be in its default configuration file.' You have never used vsftpd. How do you find that file in one command after installing it?",
    "`rpm -qc vsftpd` lists its configuration files, and the main one under /etc/vsftpd stands out."
   ]
  ],
  "tip": "Map the letters: a = all, i = info, l = list files, c = config files, d = docs, f = which package owns this file, p = query a package file instead of the database.",
  "check": [
   [
    "Which command shows the package that owns /usr/sbin/sshd?",
    "rpm -qf /usr/sbin/sshd."
   ],
   [
    "How do you list only the configuration files of the httpd package?",
    "rpm -qc httpd."
   ],
   [
    "How can you see what files a downloaded RPM would install without installing it?",
    "rpm -qpl package.rpm."
   ],
   [
    "What does it mean if rpm -V prints nothing for a package?",
    "All of its installed files match what the RPM database recorded."
   ]
  ]
 },
 {
  "t": "Package groups: dnf group list and dnf group install",
  "hook": "A ticket lands in your queue at Riverbend Robotics: 'New build server needs the usual compiler toolchain. Same as the old one. Thanks.' Nobody wrote down what 'the usual' means. You could start installing gcc, then discover you also need make, then autoconf, then a debugger, rerunning the build after each failure while the developer waits. Or you could install the whole set the distribution already defines for exactly this purpose, in one command, and know you got everything a developer expects. Where are those sets defined, how do you see what is inside one before installing it, and what does dnf leave out unless you ask?",
  "simple": "Some jobs need a whole bundle of software, not just one program. Instead of making you list every piece, Red Hat's repositories define named bundles called groups, such as 'Development Tools'. You can ask dnf, the software installer, to show the bundles, look inside one, and install the whole thing with one command. Bigger bundles, called environment groups, describe a complete kind of computer, such as a server with a graphical desktop. Inside a bundle, some items are must-haves, some are normally included, and some are optional extras that you only get if you ask. It is like ordering a meal deal: the burger and fries come by default, but the extra sauce is only added if you request it.",
  "body": [
   "Start with why groups exist. Some jobs need many packages at once: a graphical desktop, development tools or a full set of server utilities. Rather than listing dozens of names, repositories define package groups, and dnf can install a whole group in one command. The definitions come from the repository's group metadata, often called comps after the `comps.xml` file that describes them, so the groups available to you depend on which repositories are configured and enabled. Using a group also means you get the set Red Hat considers complete for that purpose, rather than whatever you happened to remember.",
   "Next, learn the two kinds of grouping. A group is a set of related packages such as 'Development Tools' or 'System Tools'. An environment group is a larger bundle made of several groups, representing a complete kind of system, such as 'Server with GUI' (graphical user interface) or 'Minimal Install'; these are the base environment choices you see in the installer's software selection screen. Inside a group, packages are classified as mandatory, default or optional. Mandatory packages are the core of the group, default packages are normally wanted, and optional packages are extras. By default dnf installs the mandatory and default packages; optional ones need `--with-optional`.",
   "Then explore before installing. `dnf group list` shows available and installed environment groups and groups under separate headings, such as 'Available Environment Groups', 'Installed Groups' and 'Available Groups'. Some groups are hidden by default because they are mainly building blocks for environments; `dnf group list hidden` shows them too. `dnf group list --ids` adds each group's short ID in parentheses, and IDs are easier to type than names with spaces. `dnf group info 'Development Tools'` lists the packages in a group under 'Mandatory Packages', 'Default Packages' and 'Optional Packages', so you can confirm that the tool you need is included and whether it is optional.",
   "```bash\ndnf group list\ndnf group list --ids\ndnf group info 'System Tools'\ndnf group install -y 'Development Tools'\ndnf group install -y --with-optional 'System Tools'\ndnf group remove 'Development Tools'\n```",
   "Now install. `dnf group install` installs a group or environment group, showing a normal transaction summary first. Put names containing spaces in quotes, or use the ID; without quotes the shell splits 'Development Tools' into two arguments and dnf looks for two groups. The older syntax `dnf install @groupname` (and `@^environment` for environment groups) is equivalent and handy in scripts or kickstart files. Group installs are recorded in dnf history like any other transaction, so `dnf history undo` can reverse one. Running `dnf history info` on that transaction afterwards lists every package the group pulled in, which is a good way to see how large a group really was and to explain the change to a colleague.",
   "Manage groups after installation as well. `dnf group remove` removes packages that were installed as part of the group, but it leaves packages that you had installed separately or that other installed groups still need. `dnf group upgrade` brings a group up to date, including packages newly added to its definition since you installed it, which a plain `dnf update` would not add. `dnf group list --installed` shows which groups dnf considers installed.",
   "Watch for the optional trap. A common exam wording is 'install the group so that tool X is available'. If X is listed under Optional Packages in `dnf group info`, a plain group install will finish successfully and X will still be missing. Either use `--with-optional` or install X by name afterwards. Reading the group info first prevents this silent gap.",
   "Finally, verify and troubleshoot. On the Red Hat Certified System Administrator (RHCSA) exam you might be asked to install a group to provide some tools, or to install a group and then verify a command from it works. Check your result with `dnf group list --installed` or, better, by running one of the expected commands, such as `gcc --version` after installing development tools. As with any dnf work, if `dnf group list` shows nothing useful, check that your repository configuration includes the repositories that carry the group data; on Red Hat Enterprise Linux (RHEL) both BaseOS and AppStream contribute groups, so a system with only one of them configured shows an incomplete list."
  ],
  "analogy": "Package groups are like a restaurant's set menus. An environment group is the full banquet, made of several set menus. Each set menu has items that always come with it (mandatory), items that come unless you object (default), and items listed as 'add-ons on request' (optional). Ordering the set menu without asking for add-ons gets you no add-ons. The analogy stops at removal: sending back a set menu in dnf leaves behind any dish you had also ordered separately or that another menu still includes.",
  "mnemonic": "Package classes inside a group, from always installed to only on request: 'My Dog Obeys', Mandatory, Default, Optional. dnf installs the first two unless you add --with-optional.",
  "terms": [
   [
    "Package group",
    "A named set of related packages defined in repository metadata, installable in one step."
   ],
   [
    "Environment group",
    "A larger bundle of groups representing a complete system type, such as Server with GUI."
   ],
   [
    "Mandatory / default / optional",
    "Package classes within a group; dnf installs mandatory and default unless told --with-optional."
   ],
   [
    "dnf group info",
    "Shows the packages contained in a group, sorted by class."
   ],
   [
    "@group syntax",
    "Shorthand for groups in dnf install, such as dnf install @groupid; @^ marks an environment group."
   ],
   [
    "Hidden group",
    "A group not shown by default in dnf group list, usually a building block for environments; shown with dnf group list hidden."
   ]
  ],
  "example": "A developer needs a compiler and make on a minimal server. `dnf group list --ids` shows the ID beside 'Development Tools'; `dnf group info 'Development Tools'` confirms gcc and make are included as mandatory or default packages, and `dnf group install -y 'Development Tools'` installs them. `gcc --version` and `make --version` prove it worked.",
  "mistakes": [
   [
    "Typing dnf group install Development Tools without quotes.",
    "The shell splits the name into two words and dnf looks for two groups. Quote names with spaces or use the group ID."
   ],
   [
    "Assuming a group install includes every package in the group.",
    "Only mandatory and default packages are installed. Optional packages need --with-optional or a separate install by name."
   ],
   [
    "Believing that dnf update adds packages newly added to a group's definition.",
    "dnf update only upgrades installed packages. dnf group upgrade adds new members of the group."
   ],
   [
    "Concluding a group does not exist because dnf group list does not show it.",
    "It may be hidden (try dnf group list hidden), or a repository such as AppStream may be missing from the configuration."
   ]
  ],
  "tryit": [
   [
    "A task says: 'Install the System Tools group so that every tool in it is available.' You run `dnf group info 'System Tools'` and see a long Optional Packages section. What command do you use?",
    "`dnf group install -y --with-optional 'System Tools'`. A plain group install would skip the optional packages, so 'every tool' would not be satisfied."
   ],
   [
    "You are writing a script that must install an environment group by ID without quoting issues. Which syntax works with dnf install?",
    "`dnf install -y @^<environment-id>`; the @^ prefix marks an environment group, while @ alone marks a regular group."
   ]
  ],
  "tip": "Quote group names with spaces or use their IDs, read dnf group info first, and remember optional packages are not installed unless you add --with-optional.",
  "check": [
   [
    "How do you see which packages a group contains before installing it?",
    "dnf group info 'Group Name'."
   ],
   [
    "What is the difference between a group and an environment group?",
    "An environment group is a larger bundle composed of several groups describing a whole system type."
   ],
   [
    "Which alternative syntax installs a group with dnf install?",
    "dnf install @groupname (or @^environmentname for an environment group)."
   ],
   [
    "Which package classes does a plain dnf group install include?",
    "Mandatory and default; optional packages need --with-optional."
   ]
  ]
 },
 {
  "t": "Configuring access to Flatpak repositories: flatpak remote-add, flatpak remotes",
  "hook": "The design team at Maple Street Architects wants a drawing application on their shared Red Hat workstations, and the version they need is distributed as a Flatpak, not as an RPM. Your lead, Tomas, forwards you a small file called studio.flatpakrepo and writes: 'Make this available to everyone on the machine, and name the source studio, exactly. The auditing script checks the name.' You have configured dnf repositories many times, but there is no `.repo` file here and nothing in /etc/yum.repos.d will help. How do you register this new kind of software source, for every user, and prove it is working?",
  "simple": "Flatpak is a second way to install programs on Red Hat Enterprise Linux, used mostly for desktop apps. Each Flatpak app comes with the shared building blocks it needs and runs inside a protective box, so it cannot freely touch the rest of the system. Before you can install Flatpak apps, you must tell the computer where to get them. These sources are called remotes, much like app stores. You add one with `flatpak remote-add`, giving it a name and a small description file, and you list the ones you have with `flatpak remotes`. A remote can be for the whole computer or just for you. Think of adding a new store to your phone and choosing whether everyone in the family can use it.",
  "body": [
   "Start with what Flatpak is. Flatpak is a second way to distribute software on Red Hat Enterprise Linux (RHEL), aimed mainly at desktop applications. A Flatpak application is packaged together with a runtime, a shared set of libraries it runs on, and it executes in a sandbox that limits what it can access on the host, such as files, devices and the network, to the permissions its packager declared. Because applications bring their own runtime, they can be updated independently of the operating system's RPM (RPM Package Manager) packages. The current EX200 objectives include configuring Flatpak repositories and managing Flatpak applications, so expect at least one task in this area.",
   "Next, learn the vocabulary. Flatpak repositories are called remotes. A remote is a named source of applications and runtimes, much like a dnf repository, but configured with the `flatpak` command rather than a `.repo` file. Remotes can be added system-wide or per user. System-wide is the default: such remotes are available to all users, apps from them are stored under `/var/lib/flatpak`, and adding one requires root or administrator authorization. Per-user remotes are added with `--user` and stored under `~/.local/share/flatpak` in that user's home directory, where only that user sees them. Make sure the flatpak package itself is installed first with `dnf install flatpak`; on a minimal server it may not be present.",
   "Now add a remote. `flatpak remote-add` takes a name and a location, which is usually a `.flatpakrepo` file. That file is a small text descriptor containing the repository's URL (Uniform Resource Locator), a human-readable title and the GPG (GNU Privacy Guard) key used to verify everything downloaded from it. The location can be a local path or a web address for the file. `--if-not-exists` makes the command succeed quietly if a remote of that name is already there instead of failing with an error, which is useful in scripts and when you repeat a task after a mistake.",
   "```bash\nflatpak remote-add --if-not-exists myremote /path/or/url/to/myremote.flatpakrepo\nflatpak remotes                 # list configured remotes\nflatpak remotes --show-details  # include URLs and options\nflatpak remote-ls myremote      # what the remote offers\nflatpak remote-modify --disable myremote\nflatpak remote-delete myremote\n```",
   "Then inspect what you configured. `flatpak remotes` lists the configured remotes with their name and options such as `system` or `user`, which tells you at a glance where each one lives. `--show-details` adds titles, URLs and other settings, and `--system` or `--user` limits the listing to one scope when you want to confirm exactly where a remote was created. `flatpak remote-ls NAME` lists the applications and runtimes available from a remote, which is the Flatpak equivalent of checking that a repository works with `dnf repolist`: if it lists content, the location and key are good; if it errors, the address or signature is the problem. Add `--app` to `remote-ls` to see only applications, which makes a long list easier to read.",
   "Change or remove remotes when needed. `remote-modify` changes settings of an existing remote, for example `--disable` to stop using it without deleting its configuration, `--enable` to turn it back on, or a new URL. `remote-delete` removes it entirely. If applications installed from that remote are still present, flatpak warns you, because they would lose their update source; remove those apps first or use the option flatpak offers to force deletion in a lab.",
   "Treat signatures as seriously as with RPM. A `.flatpakrepo` file normally includes the GPG key, so content is verified automatically every time you install or update. If you add a remote directly by URL without a key, you may need to supply one with `--gpg-import=keyfile`. Disabling verification with `--no-gpg-verify` removes the guarantee that what you download is what the publisher built, so it should only be done in a controlled lab and only if a task explicitly allows it.",
   "Finally, match the task exactly. Graders check results with commands such as `flatpak remotes`, so the remote name must be exactly what the task specifies, including case. Pay equal attention to scope: a task that says 'for all users' needs a system remote added as root without `--user`, while 'for user alice only' means running the command as alice with `--user`. Getting the scope wrong produces a remote that works for you but fails the grader's check."
  ],
  "analogy": "Adding a Flatpak remote is like adding a new store to a family tablet's app store settings. You give the store a name and a sealed introduction card that includes its address and its official stamp, so the tablet can check every delivery is genuine. You can add it for the whole family (system) or only your own profile (user). The analogy has a limit: unlike a phone app store, removing a Flatpak remote does not remove apps already installed from it; they simply stop getting updates.",
  "terms": [
   [
    "Flatpak",
    "A system for distributing sandboxed applications that ship with their own runtimes, independent of RPM packages."
   ],
   [
    "Remote",
    "A named Flatpak repository from which applications and runtimes are installed."
   ],
   [
    "Runtime",
    "A shared set of libraries and services that Flatpak applications run on top of."
   ],
   [
    ".flatpakrepo file",
    "A descriptor containing a remote's URL, title and GPG key, used with flatpak remote-add."
   ],
   [
    "System vs user installation",
    "System remotes and apps are shared by all users (/var/lib/flatpak); --user ones live in the user's home (~/.local/share/flatpak)."
   ],
   [
    "flatpak remote-ls",
    "Lists the applications and runtimes a remote offers; a quick test that the remote works."
   ]
  ],
  "example": "A task asks for a system-wide Flatpak remote named examplerepo using the .flatpakrepo file provided on the classroom server. As root you run `flatpak remote-add --if-not-exists examplerepo` with that location, then `flatpak remotes` shows examplerepo with the system option and `flatpak remote-ls examplerepo` lists its applications.",
  "mistakes": [
   [
    "Creating a .repo file in /etc/yum.repos.d for a Flatpak source.",
    "dnf repositories and Flatpak remotes are separate systems. Flatpak remotes are configured only with flatpak remote-add."
   ],
   [
    "Adding the remote with --user when the task says 'for all users'.",
    "--user creates a remote only for the account that ran it. System-wide is the default when run as root without --user."
   ],
   [
    "Fixing a signature error by adding --no-gpg-verify.",
    "That disables verification of downloaded content. Use the .flatpakrepo file or --gpg-import with the correct key unless a task explicitly allows otherwise."
   ],
   [
    "Naming the remote something close to what the task asked.",
    "Graders check the exact name in flatpak remotes. Use the name exactly as written."
   ]
  ],
  "tryit": [
   [
    "You ran `flatpak remote-add --user studio studio.flatpakrepo` as your own account. The task required the studio remote to be available to all users on the workstation. `flatpak remotes` shows studio with the user option. What do you do?",
    "Remove the per-user remote (`flatpak remote-delete --user studio`), then as root run `flatpak remote-add --if-not-exists studio studio.flatpakrepo` without --user, and confirm `flatpak remotes` shows studio with the system option."
   ],
   [
    "After adding a remote, `flatpak remote-ls` for it fails with an error about the signature. The task supplied a separate key file. What option fixes this without weakening security?",
    "Re-add or modify the remote with `--gpg-import=<keyfile>` so content is verified with the supplied key, rather than using --no-gpg-verify."
   ]
  ],
  "tip": "Check whether the task wants a system-wide remote (run as root, the default) or a per-user one (--user). The remote name must match the task exactly, and flatpak remote-ls proves the remote works.",
  "check": [
   [
    "What command lists the Flatpak remotes configured on a system?",
    "flatpak remotes (add --show-details for URLs)."
   ],
   [
    "What does --if-not-exists do in flatpak remote-add?",
    "It makes the command succeed without error when a remote of that name already exists."
   ],
   [
    "Where are system-wide Flatpak remotes and applications stored?",
    "Under /var/lib/flatpak; per-user ones are under ~/.local/share/flatpak."
   ],
   [
    "What does a .flatpakrepo file usually contain?",
    "The remote's URL, a title and the GPG key used to verify its content."
   ]
  ]
 },
 {
  "t": "Installing, listing, updating and removing Flatpak applications (flatpak install, list, update, uninstall, run)",
  "hook": "Monday morning at Maple Street Architects, the studio remote you configured last week is ready, and the request is simple: install the drawing application for everyone, make sure it actually starts, and clear out the old viewer nobody uses. Then Lena from the help desk asks a reasonable question: 'Why doesn't `rpm -qa` show the new app? Did the install fail?' You realize the Flatpak world has its own names, its own list and its own cleanup rules, and that a grader checking your work will use them too. How do you install, verify, update and remove Flatpak applications so the evidence is where everyone expects it?",
  "simple": "Once a Flatpak source is set up, you use the `flatpak` command to manage apps from it, a lot like a phone's app store. Apps have long, unique names written backwards like a web address, such as org.example.Editor. You install an app, list what you have, update everything, start an app, or remove one. When you install an app, Flatpak also brings the shared building blocks, called runtimes, that it needs. When you remove the app, those building blocks stay, because other apps might use them, and there is a separate cleanup command for leftovers. Flatpak keeps its own list, separate from the normal Red Hat software list, so you check Flatpak apps with Flatpak commands.",
  "body": [
   "Start with how Flatpak names things. Once a remote is configured, the `flatpak` command manages applications from it in much the same way dnf manages RPM (RPM Package Manager) packages. The difference is in the naming. Flatpak applications are identified by an application ID in reverse-DNS form (DNS is the Domain Name System, so the ID reads like a domain name written backwards), such as `org.example.Editor`. A full reference, or ref, also includes the type, architecture and branch, like `app/org.example.Editor/x86_64/stable`. Runtimes have refs too, beginning with `runtime/`. Most commands accept the short application ID, and flatpak fills in the rest.",
   "Find and install applications next. `flatpak install REMOTE APPID` installs an application and, automatically, any runtime it needs, showing a list of refs it will install and asking for confirmation. Without a remote name, flatpak searches all configured remotes and asks you to choose if more than one offers the app. `-y` answers prompts automatically, and `--user` or `--system` selects where it is installed; system installs are the default and require root or administrator authorization. `flatpak search keyword` finds application IDs across remotes when you do not know the exact name, showing the name, description, application ID, version, branch and remote for each match.",
   "```bash\nflatpak search editor\nflatpak install -y myremote org.example.Editor\nflatpak list                 # installed apps and runtimes\nflatpak list --app           # apps only\nflatpak info org.example.Editor\nflatpak run org.example.Editor\nflatpak update -y\nflatpak uninstall -y org.example.Editor\nflatpak uninstall --unused   # remove runtimes no app needs\n```",
   "Check what is installed. `flatpak list` shows what is installed in columns such as name, application ID, version, branch and installation (system or user). `--app` limits the list to applications and `--runtime` to runtimes, which matters because a single app can pull in a runtime plus extensions, making the full list longer than you might expect. `flatpak info APPID` shows details of one installed application: its ref, origin remote, installation, the runtime it uses, its commit and its installed size. The installation column or field is the quickest way to prove that an app is installed system-wide when a task says 'for all users'.",
   "Run the application to prove it works. `flatpak run APPID` starts an application inside its sandbox. Desktop environments also add installed Flatpaks to their application menus, but on a server or exam system `flatpak run` is the direct way to show an application is installed and launchable. Anything you type after the application ID is passed to the application itself, such as a file to open, and `flatpak ps` lists the Flatpak applications currently running, which helps when you need to confirm one started in the background. The sandbox restricts the application to the permissions its packager declared, such as access to the network, to certain folders or to the display; you can inspect them with `flatpak info --show-permissions APPID`. These permissions are part of why Flatpak suits desktop software from outside the core operating system.",
   "Keep applications current. `flatpak update` updates all installed applications and runtimes to their latest versions from their remotes, or only the one you name, as in `flatpak update org.example.Editor`. Flatpak updates are independent of `dnf update`: running one does not update the other, so a full patching routine on a workstation includes both commands.",
   "Remove applications and clean up. `flatpak uninstall APPID` removes an application but leaves its runtime in place, because other applications may share it. `flatpak uninstall --unused` cleans up runtimes and extensions that nothing needs any more, which can recover a lot of disk space. Adding `--delete-data` to an uninstall also removes the application's saved data, which otherwise stays in each user's `~/.var/app/APPID` directory in case the app is reinstalled.",
   "Finally, keep the two package worlds apart. Flatpak and dnf are independent: `rpm -qa` will not show Flatpak applications and `flatpak list` will not show RPMs. When a task on the Red Hat Certified System Administrator (RHCSA) exam says 'install the application from the Flatpak repository', verify with `flatpak list --app` and, ideally, `flatpak run`, not with rpm. Likewise, use the exact application ID and the remote the task names, and choose system or user scope to match the wording."
  ],
  "analogy": "Flatpak apps are like furnished tiny homes delivered on a truck. Each home (the app) sits on a standard foundation kit (the runtime), and several homes can share one foundation design. Removing a home leaves the foundation in place in case another home uses it, so you run a separate cleanup for unused foundations. The town's property register (the RPM database) does not list these homes at all; Flatpak keeps its own register. Where the analogy fails: runtimes are shared files on disk, not a physical slab under one app.",
  "terms": [
   [
    "Application ID",
    "A reverse-DNS style identifier for a Flatpak app, such as org.example.Editor."
   ],
   [
    "Ref",
    "A full Flatpak reference combining type, ID, architecture and branch, e.g. app/ID/x86_64/stable."
   ],
   [
    "flatpak install",
    "Installs an application and its required runtime from a remote."
   ],
   [
    "flatpak list",
    "Shows installed applications and runtimes; --app or --runtime filters the list."
   ],
   [
    "flatpak run",
    "Starts an installed Flatpak application in its sandbox."
   ],
   [
    "flatpak update",
    "Updates installed applications and runtimes from their remotes, independently of dnf."
   ],
   [
    "flatpak uninstall --unused",
    "Removes runtimes and extensions no longer needed by any installed application."
   ]
  ],
  "example": "A task asks you to install an application from the examplerepo remote for all users. You run `flatpak search` to get its ID, install it as root with `flatpak install -y examplerepo org.example.App`, confirm with `flatpak list --app` that the Installation column says system, and start it with `flatpak run org.example.App`.",
  "mistakes": [
   [
    "Verifying a Flatpak install with rpm -qa or dnf list installed.",
    "Those only know about RPM packages. Use flatpak list (or flatpak list --app) and flatpak info."
   ],
   [
    "Expecting flatpak uninstall to remove the runtime as well.",
    "Runtimes may be shared, so they stay. Run flatpak uninstall --unused to remove runtimes nothing needs."
   ],
   [
    "Using the human-readable name, such as 'Editor', with flatpak run.",
    "flatpak run expects the application ID, such as org.example.Editor. Get it from flatpak search or flatpak list."
   ],
   [
    "Assuming dnf update also updates Flatpak apps.",
    "The systems are independent. Run flatpak update separately."
   ]
  ],
  "tryit": [
   [
    "You installed an app for a user with `flatpak install --user`, but the task said all users of the workstation must be able to run it. `flatpak list --app` shows the app with Installation 'user'. How do you correct it and prove the fix?",
    "Uninstall the user copy (`flatpak uninstall --user APPID`), then as root run `flatpak install -y REMOTE APPID` without --user. Confirm `flatpak list --app` shows Installation 'system' and start it with `flatpak run APPID`."
   ],
   [
    "After removing three Flatpak apps, disk usage under /var/lib/flatpak barely dropped. What explains it, and what command recovers the space?",
    "Their runtimes were left installed because uninstall does not remove shared runtimes. `flatpak uninstall --unused` removes runtimes and extensions that no installed app needs."
   ]
  ],
  "tip": "Use the application ID (reverse-DNS name) with flatpak commands, and verify Flatpak tasks with flatpak list and flatpak run; rpm and dnf know nothing about Flatpak apps.",
  "check": [
   [
    "Which command shows installed Flatpak applications but not runtimes?",
    "flatpak list --app."
   ],
   [
    "Why doesn't uninstalling an app remove its runtime?",
    "Runtimes can be shared by several apps; use flatpak uninstall --unused to remove unneeded ones."
   ],
   [
    "How do you start a Flatpak application from the command line?",
    "flatpak run followed by its application ID."
   ],
   [
    "Does dnf update update Flatpak applications?",
    "No; Flatpak apps and runtimes are updated with flatpak update."
   ]
  ]
 },
 {
  "t": "Shebang lines, making scripts executable and running them from PATH",
  "hook": "At Granite Peak Credit Union, the operations manager asks for a command called `sysinfo` that any teller-support technician can type from anywhere to see the host name and disk space. Jordan, your new teammate, writes the script in his home directory, runs `sh sysinfo` and declares victory. Then the first technician logs in, types `sysinfo`, and gets 'command not found'. Jordan copies it to a shared folder; now it says 'Permission denied'. He fixes that, and a third person gets 'bad interpreter'. The script itself was fine all along. What three things does a script need before anyone can run it just by typing its name?",
  "simple": "A shell script is a text file full of commands, saved so you can run them again with one word. For that to work smoothly, three things must be true. First, the very first line, called the shebang, tells the computer which program should read the file, usually `#!/bin/bash`. Second, the file must be marked as runnable, using `chmod +x`. Third, the file must sit in a folder the shell automatically looks in when you type a command; that list of folders is called PATH. It is like a recipe card: it needs a title saying which cook should use it, permission to be used in the kitchen, and a place in the recipe box where the cook actually looks.",
  "body": [
   "Start with what a script is and what the exam expects. A shell script is a text file containing commands you could type at the prompt, saved so they can run again reliably. The Red Hat Certified System Administrator (RHCSA) exam asks you to write simple scripts, and a script only counts if it runs the way the task describes: usually by name, from any directory, with the right interpreter, often as an ordinary user. Three things make that happen: the shebang line, the execute permission and the PATH. If any one is missing, the script fails in a specific, recognizable way.",
   "The shebang comes first, literally. The shebang is the first line of the script and starts with `#!` followed by the absolute path of the interpreter; for Bash scripts that is `#!/bin/bash`. When you run the file as a program, the kernel reads this line and starts that interpreter with the script's path as its argument, so the interpreter reads and runs the rest of the file. Without a shebang, your current shell usually runs the file itself, which may work by accident but is not reliable, especially if a user's login shell is different or the script uses Bash-only features. The shebang must be the very first line, with no blank line or space before it; later lines starting with `#` are ordinary comments.",
   "```bash\n#!/bin/bash\n# report.sh - show host name and disk usage\necho \"Host: $(hostname)\"\ndf -h /\n```",
   "Next, give the file execute permission. New files are created without the execute bit, so run `chmod +x report.sh` or `chmod 755 report.sh`, which gives the owner read, write and execute and everyone else read and execute. Without it, running `./report.sh` gives 'Permission denied', and `ls -l` shows `-rw-r--r--` instead of `-rwxr-xr-x`. You can still run a non-executable script by passing it to the interpreter explicitly, `bash report.sh`, which is useful for testing, but tasks normally expect the file itself to be executable. Note also that the script runs in a new child process, so variables it sets and directory changes it makes do not affect your current shell; `source report.sh` (or `. report.sh`) runs it in the current shell instead, which is how files like `~/.bashrc` are read.",
   "Then make it findable through PATH. The shell finds commands by searching the directories listed in the PATH environment variable, separated by colons, in order from left to right, and runs the first match. `echo $PATH` shows it. The current directory is deliberately not in PATH, a safety measure that stops a malicious file named like a common command from running by accident, which is why you must type `./report.sh` to run a script in the current directory. To run it by name alone, place it in a directory that is in PATH. `/usr/local/bin` is the conventional place for administrator scripts available to all users. For personal scripts, `~/bin` and `~/.local/bin` are added to each user's PATH by the default RHEL (Red Hat Enterprise Linux) shell startup files.",
   "```bash\nvim /usr/local/bin/report.sh\nchmod 755 /usr/local/bin/report.sh\nreport.sh              # works from any directory\nwhich report.sh        # /usr/local/bin/report.sh\n```",
   "Verify like a grader would. After placing the script, switch to an ordinary user with `su - username`, change to an unrelated directory such as `/tmp`, and type the command name alone. `which report.sh` or `type report.sh` confirms which file the shell will run, which also catches the case where an older copy earlier in PATH is shadowing your new one. If the task names the command without `.sh`, name the file exactly that; the extension is only a convention and Linux does not need it.",
   "Finally, recognize the common error messages. If a script behaves strangely, run it with `bash -x script` to print each command, prefixed with `+`, as it executes. 'command not found' points to PATH or the file name. 'Permission denied' points to the execute bit or a parent directory the user cannot enter. 'bad interpreter' points to the shebang: a typo in the path, or Windows line endings if you copied the script from elsewhere, because a stray carriage return after `/bin/bash` makes the kernel look for an interpreter that does not exist."
  ],
  "analogy": "Running a script by name is like getting a letter delivered. The shebang is the name of the person who must read it, written at the very top. The execute permission is the stamp: without it the letter is refused. PATH is the list of mailboxes the carrier checks, in order; a letter left on your kitchen table (the current directory) is never checked unless you hand it over directly with ./. The analogy stops at order: the shell runs the first matching file in PATH, even if a newer copy sits in a later directory.",
  "terms": [
   [
    "Shebang",
    "The #! first line naming the interpreter, e.g. #!/bin/bash, used when the file is executed."
   ],
   [
    "Execute permission",
    "The x permission that lets a file be run as a program; set with chmod +x or chmod 755."
   ],
   [
    "PATH",
    "Environment variable listing directories the shell searches, in order, for commands."
   ],
   [
    "/usr/local/bin",
    "Conventional system-wide directory in PATH for locally created scripts and programs."
   ],
   [
    "source",
    "Runs a script in the current shell rather than a child process; also written as a dot."
   ],
   [
    "bash -x",
    "Runs a script while printing each command as it executes, for debugging."
   ]
  ],
  "example": "A task asks for a command called `sysinfo` that any user can run. You create /usr/local/bin/sysinfo starting with #!/bin/bash, add the commands, run `chmod 755 /usr/local/bin/sysinfo`, then log in as a normal user and type `sysinfo` from /tmp to prove it works from PATH.",
  "mistakes": [
   [
    "Testing with `bash script` and assuming the task is done.",
    "That bypasses both the shebang and the execute bit. Test the way the task says it will be run: by name, as the intended user."
   ],
   [
    "Putting a comment or blank line above #!/bin/bash.",
    "The shebang only works on the very first line. Anything before it turns it into an ordinary comment."
   ],
   [
    "Expecting cd or variables set in a script to change your current shell.",
    "Scripts run in a child process. Use source script (or . script) if you need the changes in your current shell."
   ],
   [
    "Fixing 'command not found' by running chmod +x.",
    "That error means the shell could not find the file. Move the script into a PATH directory such as /usr/local/bin or call it with a path."
   ]
  ],
  "tryit": [
   [
    "A user reports that typing `backup-home` gives 'Permission denied'. `ls -l /usr/local/bin/backup-home` shows `-rw-r--r--. root root`. The script starts with #!/bin/bash. What is wrong, and what is the fix?",
    "The file lacks execute permission. Run `chmod 755 /usr/local/bin/backup-home` so all users can read and execute it, then test as that user."
   ],
   [
    "You copied a script from a Windows laptop to /usr/local/bin and set chmod 755. Running it gives a 'bad interpreter' error mentioning /bin/bash, even though /bin/bash exists. What is the likely cause?",
    "Windows line endings: a carriage return follows /bin/bash on the shebang line, so the kernel looks for an interpreter named with that invisible character. Convert the file to Unix line endings, for example by removing the carriage returns with sed or a tool such as dos2unix if installed."
   ]
  ],
  "tip": "Running a script by name needs all three: a correct shebang on line 1, execute permission, and a location in PATH. Otherwise you must use ./script or bash script.",
  "check": [
   [
    "Why must you type ./myscript.sh even when you are in its directory?",
    "The current directory is not in PATH, so you must give a path to the file."
   ],
   [
    "What error do you get running an executable script without x permission, and how do you fix it?",
    "Permission denied; fix it with chmod +x (or run it with bash script)."
   ],
   [
    "Where should a system-wide admin script be placed so every user can run it by name?",
    "In /usr/local/bin, which is in the default PATH."
   ],
   [
    "What does `source script.sh` do differently from `./script.sh`?",
    "It runs the script in the current shell, so variables and directory changes persist afterwards."
   ]
  ]
 },
 {
  "t": "Conditionally running code with if, elif, else and test / [ ] (-f, -d, -z, -eq, -gt, string compares)",
  "hook": "The nightly job at Harbor Freight Cooperative's warehouse runs a cleanup script, and this morning the shared /backup folder is gone, replaced by a plain file of the same name. Sam, who wrote the script, swears it 'checks first'. You open it and find the check: `if [-d /backup]` with no spaces, an unquoted variable that was empty last night, and a numeric comparison written with `>`. Each one looks harmless, and each one quietly changed what the script decided. Your task today is to rewrite it so it makes the right call every time. How does Bash actually decide whether a condition is true?",
  "simple": "Scripts often need to make choices: do this if a folder exists, otherwise do that. Bash makes those choices with `if`. It runs a check, and if the check succeeds, it runs one set of commands; if not, it can try another check (`elif`) or fall back to a default (`else`). The most common check is written inside square brackets, like `[ -d /backup ]`, which asks 'is /backup a folder?'. There are small codes for common questions: is it a file, is it a folder, is this text empty, is this number bigger than that one. It works like a decision you make every morning: if it is raining, take an umbrella; else if it is sunny, take sunglasses; otherwise, take nothing.",
  "body": [
   "Start with how Bash decides. Scripts become useful when they make decisions: create a directory only if it is missing, refuse to run without an argument, warn when a disk is nearly full. Bash makes decisions with `if`, which runs a command and branches on that command's exit status. An exit status of zero means true (success) and anything else means false. That is the reverse of many programming languages, and it explains everything else in this lesson: `if` is not evaluating an expression, it is asking whether a command succeeded.",
   "Meet the test command. The command most often used in an `if` is `test`, usually written in its bracket form `[ ... ]`. The `[` is itself a command whose last argument must be `]`, which is why the spaces are mandatory: `[ -f file ]` works, while `[-f file]` fails with an error like 'command not found', because the shell looks for a command literally named `[-f`. Bash also offers `[[ ... ]]`, a more forgiving keyword form that handles empty variables and pattern matching more gracefully, but plain `[ ]` is portable and is what most exam material uses.",
   "```bash\n#!/bin/bash\nif [ -d /backup ]; then\n    echo \"/backup exists\"\nelif [ -f /backup ]; then\n    echo \"/backup is a file, not a directory\"\nelse\n    mkdir -p /backup\nfi\n```",
   "Use file tests to ask about the file system. `-e` is true if the path exists at all, `-f` if it is a regular file, `-d` if it is a directory, `-r`, `-w` and `-x` if the user running the script can read, write or execute it, and `-s` if the file exists and is not empty. Choosing the precise test matters: `-e /backup` is true for both a file and a directory, which is exactly the trap in the example above, so the script tests `-d` and `-f` separately.",
   "Use string tests to compare text. `-z \"$var\"` is true if the string is empty, `-n \"$var\"` if it is not, `=` tests equality and `!=` inequality. Always quote variables inside `[ ]`. If `$var` is empty and unquoted, it disappears entirely after expansion, and `[ -n $var ]` becomes `[ -n ]`, which is a one-argument test that is always true, while `[ $var = yes ]` becomes `[ = yes ]` and fails with a 'unary operator expected' error. Quoting keeps an empty value as an empty argument, so the test behaves as you intended.",
   "Use numeric operators for numbers. `<` and `>` are redirections to the shell, so `[ 5 > 3 ]` would create a file named 3 rather than compare anything. Numbers use letter operators instead: `-eq` (equal), `-ne` (not equal), `-lt` (less than), `-le` (less than or equal), `-gt` (greater than) and `-ge` (greater than or equal). So `[ \"$count\" -gt 10 ]` compares numerically, while `[ \"$a\" = \"$b\" ]` compares strings. Mixing them up is a classic mistake: `[ 10 = 10.0 ]` is false because the strings differ, and `-eq` with non-numbers gives an 'integer expression expected' error. Note that Bash only compares integers this way. `!` negates a test: `[ ! -d /data ]` is true when /data is not a directory.",
   "Put the structure together. The structure is always `if condition; then ... fi`, with optional `elif condition; then` branches and a final `else`. Each `if` must end with `fi`, and Bash checks branches from top to bottom, running only the first one whose condition succeeds. You can combine tests with `&&` and `||` between separate brackets: `if [ -f \"$1\" ] && [ -r \"$1\" ]; then` runs the branch only when both are true. Any command can be the condition, not only test: `if grep -q '^harry:' /etc/passwd; then` branches on whether grep found a match, with `-q` keeping it quiet, and `if id harry &>/dev/null; then` checks whether a user exists.",
   "Finally, write for readability under pressure. Indent the body of each branch consistently; the shell does not care, but you will read and debug the script faster under exam time pressure. Test each branch deliberately: run the script once with the condition true and once with it false, and use `bash -x script` to see exactly which test ran and what values it compared."
  ],
  "analogy": "An if statement is like a security guard who does not judge anything personally but radios a colleague and acts on a yes or no. The colleague is the command in the condition; test and [ ] are the colleague who checks badges and room numbers. Zero on the radio means yes. Where the analogy needs care: the guard trusts the exact words spoken, so an empty, unquoted variable is like the colleague mumbling, and the guard may hear a different question entirely.",
  "terms": [
   [
    "test / [ ]",
    "Command that evaluates a condition and returns exit status 0 (true) or 1 (false); spaces around brackets are required."
   ],
   [
    "-f / -d / -e",
    "Tests for a regular file, a directory, or any existing path."
   ],
   [
    "-r / -w / -x / -s",
    "Tests whether a file is readable, writable or executable by the current user, or exists and is not empty."
   ],
   [
    "-z / -n",
    "Tests whether a string is empty or not empty."
   ],
   [
    "-eq / -gt / -lt",
    "Numeric comparison operators: equal, greater than, less than (also -ne, -ge, -le)."
   ],
   [
    "= / !=",
    "String equality and inequality tests inside [ ]."
   ],
   [
    "elif",
    "Additional condition checked only if the previous if or elif was false."
   ]
  ],
  "example": "A script must print 'large' if the file given as its argument is bigger than 1024 bytes. You get the size with `size=$(stat -c %s \"$1\")` and test `if [ \"$size\" -gt 1024 ]; then echo large; else echo small; fi`, first checking `[ -f \"$1\" ]` so a missing file gives a clear message.",
  "mistakes": [
   [
    "Writing [-f file] or [\"$a\" = b] without spaces.",
    "[ is a command and ] its last argument, so both need spaces around them: [ -f file ]."
   ],
   [
    "Using > or < to compare numbers inside [ ].",
    "Those are redirections. Use -gt, -lt, -ge, -le, -eq or -ne for integers."
   ],
   [
    "Leaving variables unquoted in tests.",
    "An empty unquoted variable vanishes and changes the test. Write \"$var\" every time."
   ],
   [
    "Using -e when the task needs to know it is a directory.",
    "-e is true for any existing path, including a regular file. Use -d for directories and -f for regular files."
   ]
  ],
  "tryit": [
   [
    "A script must create user accounts, but it should refuse to run if the first argument is missing. A colleague wrote `if [ $1 = \"\" ]; then echo missing; exit 1; fi`, and running it with no argument prints 'unary operator expected'. What is the correct test?",
    "`if [ -z \"$1\" ]; then ...`. Quoting keeps the empty value as an argument, and -z is the direct test for an empty string; the original failed because unquoted $1 vanished."
   ],
   [
    "A disk check script reads usage as a number in $pct and should warn at 90 or more. Which test do you write, and why not `[ \"$pct\" > 90 ]`?",
    "`[ \"$pct\" -ge 90 ]`. The > version redirects output to a file named 90 and the test itself checks only that $pct is non-empty, so it is almost always true."
   ]
  ],
  "tip": "Use -eq/-gt/-lt for numbers and = / != for strings, keep spaces inside the brackets, and quote every variable in a test.",
  "check": [
   [
    "Why does `[\"$a\" = \"b\"]` fail?",
    "There must be spaces after [ and before ], because [ is a command and ] its final argument."
   ],
   [
    "Which test is true if a variable is empty?",
    "[ -z \"$var\" ]."
   ],
   [
    "How do you test whether the number in $n is greater than 5?",
    "[ \"$n\" -gt 5 ]; > would be treated as a redirection."
   ],
   [
    "What exit status does if treat as true?",
    "Zero; any non-zero status counts as false."
   ]
  ]
 },
 {
  "t": "Exit status ($?), && and ||, and exit codes in scripts",
  "hook": "At 3:10 a.m. the on-call phone buzzes for Aisha at Pinecrest Medical Imaging: the root file system on the archive server is 100 percent full. The culprit is the nightly backup script. The external backup disk had failed to mount, the script never noticed, and it happily copied two terabytes of scans into an empty /backup directory on the root disk. Worse, the scheduler reported the job as successful, because the last line of the script, an `echo \"done\"`, always succeeds. One guard line at the top and a proper exit code would have stopped all of it. How do scripts know a command failed, and how do they tell anyone else?",
  "simple": "Every command, when it finishes, quietly reports a number called its exit status. Zero means 'it worked'. Any other number means 'something went wrong', and different numbers can mean different problems. The shell keeps the most recent number in a special variable written `$?`. You can chain commands so the second one runs only if the first worked (`&&`), or only if it failed (`||`). Scripts report a number too, using `exit`, so other programs can tell whether they succeeded. It is like a delivery driver texting a code back to the office: 0 for 'delivered', other codes for 'nobody home' or 'wrong address', so the office knows what to do next.",
  "body": [
   "Start with the number every command returns. Every command that finishes returns an exit status, a number from 0 to 255. By convention 0 means success and any non-zero value means some kind of failure; the specific value can identify the kind of error, and a command's man page often documents its codes in an 'EXIT STATUS' section. The shell uses exit statuses to drive `if`, `while`, `&&` and `||`, so understanding them is the key to scripts that react correctly to failure instead of carrying on regardless.",
   "Read the status with $?. The special variable `$?` holds the exit status of the most recently completed command. Check it immediately, because the next command, even `echo` or a `[ ]` test, replaces it. For example, `grep -q harry /etc/passwd; echo $?` prints 0 if harry is found and 1 if not, and grep uses 2 for errors such as a missing file. If you need the value later, save it straight away with `rc=$?` and test `$rc` afterwards.",
   "```bash\nls /nonexistent\necho $?                    # 2 for ls: serious trouble\nmkdir -p /backup && cp -a /etc /backup/   # copy only if mkdir worked\nping -c1 -W1 serverb || echo \"serverb unreachable\"\nsystemctl is-active sshd && echo up || echo down\n```",
   "Chain commands with && and ||. `cmd1 && cmd2` runs cmd2 only if cmd1 succeeded; `cmd1 || cmd2` runs cmd2 only if cmd1 failed. They let you write short guard lines such as `cd /data || exit 1`, which stops a script rather than continuing in the wrong directory, where a later `rm` could do real damage. Commands such as `systemctl is-active`, `mountpoint -q` and `id` are designed for this style: they print little or nothing and communicate mainly through their exit status.",
   "Know the limits of the shortcut. The combination `a && b || c` is often used as a compact if/else, but beware: c also runs if a succeeded and b failed, because `||` reacts to the status of whatever ran just before it. For example, `test -d /data && cp file /data || echo 'no /data'` prints the misleading message when the copy fails even though /data exists. Use a real `if` when that difference matters, which is most of the time in scripts that change things.",
   "Set your script's exit code deliberately. Scripts return exit codes too. The `exit` built-in ends the script immediately with the number you give: `exit 0` for success or `exit 1` (or another non-zero value) for failure. Without an explicit exit, a script returns the status of the last command it ran, which is how a final `echo` can hide an earlier failure. Setting a clear code matters because other tools rely on it: a cron job, a systemd service or another script can only know your script failed if it returns non-zero. A task might say 'if no argument is given, print a usage message and exit with status 2', and the grader will check `$?` afterwards.",
   "```bash\n#!/bin/bash\nif [ $# -ne 1 ]; then\n    echo \"Usage: $0 username\" >&2\n    exit 2\nfi\nid \"$1\" &> /dev/null || { echo \"no such user\" >&2; exit 1; }\necho \"$1 exists\"\nexit 0\n```",
   "Read that script line by line. `$#` is the number of arguments and `$0` the script's own name, so the first block prints a usage line and exits with 2 when the argument count is wrong. `>&2` sends error messages to standard error (stderr) rather than standard output, which is good practice because it keeps errors out of any output that is piped or captured. The braces group several commands to run after `||`; note the spaces inside them and the semicolon before the closing brace. You can verify a script's code the same way as any command: run it, then `echo $?`.",
   "Finally, a word on automatic options. Some administrators add `set -e` to stop on any failing command, but it has surprising exceptions, such as commands in `if` conditions or before `&&`, which do not trigger it. Explicit checks are clearer and more predictable for Red Hat Certified System Administrator (RHCSA) exam scripts, and they let you choose the exact message and exit code a task asks for."
  ],
  "analogy": "Exit statuses work like the light on a dishwasher when the cycle ends: green means clean, and a blinking pattern tells the technician which part failed. `$?` is glancing at that light, and it only shows the most recent cycle, so if you start another load first you lose the earlier result. `&&` is 'unload only if green'; `||` is 'call the technician only if blinking'. The analogy falls short in one way: commands can use up to 255 different codes, far more than any appliance light.",
  "terms": [
   [
    "Exit status",
    "A number 0 to 255 returned by every command; 0 means success, non-zero means failure."
   ],
   [
    "$?",
    "Special variable holding the exit status of the last command that finished."
   ],
   [
    "&&",
    "Runs the next command only if the previous one succeeded (exit status 0)."
   ],
   [
    "||",
    "Runs the next command only if the previous one failed (non-zero exit status)."
   ],
   [
    "exit",
    "Built-in that ends a script immediately with a given status code."
   ],
   [
    "$#",
    "Special variable holding the number of arguments passed to a script."
   ],
   [
    ">&2",
    "Redirects a command's output to standard error, used for error messages."
   ]
  ],
  "example": "A backup script starts with `mountpoint -q /backup || { echo 'backup disk not mounted' >&2; exit 1; }`. When the disk is missing, the script stops with status 1 instead of filling the root file system, and the cron job's failure is visible in the logs.",
  "mistakes": [
   [
    "Running echo or a test before checking $?.",
    "Each command overwrites $?. Check it immediately or save it with rc=$?."
   ],
   [
    "Treating a && b || c as an exact if/else.",
    "c also runs when a succeeds but b fails. Use if ... then ... else when that matters."
   ],
   [
    "Thinking a script without exit always returns 0.",
    "It returns the status of the last command run, which may be a failure, or may hide an earlier failure if the last command succeeded."
   ],
   [
    "Believing 1 means success because it means true in many languages.",
    "In the shell, 0 is success and true; any non-zero value is failure and false."
   ]
  ],
  "tryit": [
   [
    "A script runs `cd /var/app/releases` and then `rm -rf old-*`. Last night /var/app/releases did not exist on a new server, and files in the wrong directory matching old-* were deleted. What single change prevents this?",
    "Guard the cd: `cd /var/app/releases || exit 1`. If cd fails, the script stops with a non-zero status instead of running rm in whatever directory it was already in."
   ],
   [
    "A task says: 'The script must exit with status 3 if the file given as the first argument does not exist.' How do you write that check, and how do you prove it works?",
    "`[ -e \"$1\" ] || exit 3` (or an if block with exit 3). Run the script with a missing file name, then `echo $?` should print 3."
   ]
  ],
  "tip": "$? is overwritten by every command, including echo and [ ]; save it to a variable (rc=$?) right away if you need it later, and end scripts with an explicit exit code.",
  "check": [
   [
    "What exit status indicates success?",
    "0; any non-zero value indicates failure."
   ],
   [
    "In `mkdir /data && touch /data/ok`, when does touch run?",
    "Only if mkdir succeeded."
   ],
   [
    "What status does a script return if it has no exit command?",
    "The exit status of the last command it executed."
   ],
   [
    "Why is `cd /data || exit 1` a useful first line before destructive commands?",
    "It stops the script if the directory change fails, so later commands do not run in the wrong place."
   ]
  ]
 },
 {
  "t": "Looping with for (over lists, globs, $(seq)) and while read",
  "hook": "The new semester starts Monday at Oakridge Technical Institute, and Ravi in IT has a spreadsheet export of forty new instructors: one line each with a user name and an assigned user ID. His manager wants the accounts created today. Ravi starts typing `useradd` commands by hand, and by the eleventh one he has already mistyped a UID. A second request is waiting behind it: check every `.conf` file in /etc/httpd and report its line count. You know a few lines of Bash can do both jobs without a single typo, as long as you pick the right kind of loop. Which loop fits a list of names, and which fits a file read line by line?",
  "simple": "A loop lets a script repeat the same work for many items. A `for` loop goes through a list one item at a time, like reading names off a guest list and greeting each person. The list can be typed out, can be all the files that match a pattern such as every file ending in .conf, or can be numbers counted out with the `seq` command. A `while` loop keeps going as long as something stays true. Paired with `read`, it reads a file one line at a time and stops when the file runs out, like working through a stack of forms until the tray is empty. Inside a loop you can skip one item (`continue`) or stop early (`break`).",
  "body": [
   "Start with why loops matter. Loops let a script repeat work: create ten users, check every configuration file, process each line of a list. Without them you copy and paste commands and multiply your chances of a typo. Bash has two loops you need for the Red Hat Certified System Administrator (RHCSA) exam: `for`, which walks through a list of words, and `while`, which repeats as long as a command succeeds. Combined with `read`, a while loop processes a file line by line.",
   "Learn the shape of a for loop. A `for` loop assigns each item in a list to a variable in turn and runs the body once per item. The list can be written literally, produced by a glob that matches file names, or generated by a command through command substitution. The structure is `for var in list; do ... done`. Inside the body, refer to the current item as `$var`, and quote it as `\"$var\"` so values containing spaces stay whole.",
   "```bash\nfor user in alice bob carol; do\n    useradd \"$user\"\ndone\n\nfor f in /etc/*.conf; do\n    echo \"$f: $(wc -l < \"$f\") lines\"\ndone\n\nfor n in $(seq 1 5); do\n    echo \"server$n\"\ndone\n```",
   "Prefer globs for files, and know your number options. Globs in a for loop are expanded by the shell into matching file names, sorted alphabetically, which is safer than parsing `ls` output because names with spaces stay intact as single items. If nothing matches, the loop receives the literal pattern, such as `/etc/*.conf` itself, so scripts often add `[ -e \"$f\" ] || continue` inside the loop. For numbers, `seq FIRST LAST` prints a sequence, and `seq 0 5 20` counts from 0 to 20 in steps of 5. Bash's brace expansion `{1..5}` gives a similar sequence without running a separate command, and C-style loops `for ((i=1; i<=5; i++))` also work when you need arithmetic control.",
   "Understand why for is wrong for lines of a file. A tempting shortcut is `for line in $(cat file)`, but command substitution splits its output on every space, tab and newline, so a line like 'Ana Lopez 2001' becomes three separate loop items. It also expands any glob characters in the data. That is why reading files is the job of a while loop.",
   "Use while with read for line-by-line input. A `while` loop repeats while its condition command returns 0. `while read line` is the standard idiom for reading input line by line: `read` returns success each time it gets a line and failure at the end of the input, which ends the loop. Feed the file with a redirection after `done`, so the whole loop reads from it. One quirk is worth knowing: if the last line of the file has no trailing newline, `read` still fills the variable but returns failure, so that final line is skipped. Files you create in vim always end with a newline, but data exported from other tools may not.",
   "```bash\nwhile read -r name uid; do\n    echo \"Creating $name with UID $uid\"\n    useradd -u \"$uid\" \"$name\"\ndone < /root/newusers.txt\n```",
   "Control how read splits each line. `read` splits each line on whitespace into the variables you name, with any leftover words going into the last one, so `read -r name rest` puts the first word in name and everything else in rest. `-r` stops backslashes being treated as escapes, which is almost always what you want. To split on another character, set IFS (the Internal Field Separator) for the read only by placing the assignment in front of it: `while IFS=: read -r user x uid rest; do ... done < /etc/passwd` splits each passwd line on colons. Inside any loop, `continue` skips to the next item and `break` leaves the loop entirely, which is useful for skipping comment lines with `[[ $name == \\#* ]] && continue` or stopping at the first match.",
   "Finally, avoid the subshell trap. Piping into a while loop, as in `cat file | while read ...`, runs the loop in a subshell, so variables set or counters incremented inside it are lost once the loop ends. Redirecting with `< file` after `done` keeps the loop in the current shell and avoids that. Test loops on a small sample first, perhaps with `echo` in place of the real command, so you can see exactly what each iteration would do before it creates forty accounts."
  ],
  "analogy": "A for loop is like a teacher calling the roll from a printed list: every name on the sheet is called once, in order. A while read loop is like a clerk taking forms from an inbox tray one at a time and stopping when the tray is empty. The analogy also shows the classic error: using for with $(cat file) is like cutting the forms into individual words before handing them to the clerk, so a single person's form becomes several pieces.",
  "terms": [
   [
    "for loop",
    "Repeats a block once for each word in a list, assigning the word to a variable."
   ],
   [
    "while loop",
    "Repeats a block as long as its condition command returns exit status 0."
   ],
   [
    "read",
    "Built-in that reads one line of input into variables; returns non-zero at end of input."
   ],
   [
    "seq",
    "Command that prints a sequence of numbers, e.g. seq 1 10 or seq 0 5 20."
   ],
   [
    "IFS",
    "Internal Field Separator: the characters read and word splitting use to split text."
   ],
   [
    "continue / break",
    "Skip to the next loop iteration, or leave the loop entirely."
   ],
   [
    "Glob",
    "A file name pattern such as /etc/*.conf that the shell expands into matching names."
   ]
  ],
  "example": "Given /root/hosts.txt with one host name per line, you write `while read -r h; do ping -c1 -W1 \"$h\" &>/dev/null && echo \"$h up\" || echo \"$h down\"; done < /root/hosts.txt` and get a quick status report for every host.",
  "mistakes": [
   [
    "Reading a file with for line in $(cat file).",
    "Command substitution splits on every space, breaking lines apart. Use while read -r ... done < file."
   ],
   [
    "Looping over $(ls /dir) to process files.",
    "Names with spaces break into pieces. Use a glob: for f in /dir/*."
   ],
   [
    "Piping a file into while read and expecting a counter to keep its value afterwards.",
    "The pipe runs the loop in a subshell, so changes are lost. Redirect with < file after done instead."
   ],
   [
    "Confusing break and continue.",
    "continue skips only the current item and keeps looping; break exits the loop completely."
   ]
  ],
  "tryit": [
   [
    "A file /root/staff.txt contains lines like 'jdoe:2001' with a user name and UID separated by a colon. A task says to create every user with the given UID. How do you write the loop?",
    "`while IFS=: read -r name uid; do useradd -u \"$uid\" \"$name\"; done < /root/staff.txt`. Setting IFS to a colon for read splits each line into the two fields; a for loop would not split on the colon or keep lines intact."
   ],
   [
    "You need to create directories /data/proj1 through /data/proj12. Which loop is simplest, and what would you check first?",
    "`for n in $(seq 1 12); do mkdir -p \"/data/proj$n\"; done` (or {1..12}). Run it first with echo in place of mkdir to see the twelve paths before creating them."
   ]
  ],
  "tip": "Loop over files with a glob (for f in /dir/*), not with $(ls), and read files line by line with while read -r ... done < file rather than for line in $(cat file), which splits on every space.",
  "check": [
   [
    "How do you loop over the numbers 1 to 10?",
    "for i in $(seq 1 10); do ...; done (or for i in {1..10})."
   ],
   [
    "What ends a `while read line` loop?",
    "read returns a non-zero status at the end of the input, making the while condition false."
   ],
   [
    "What does `break` do inside a loop?",
    "It exits the loop immediately; continue would skip to the next iteration instead."
   ],
   [
    "How do you make read split a line on colons instead of whitespace?",
    "Set IFS for the read only: IFS=: read -r field1 field2 rest."
   ]
  ]
 },
 {
  "t": "Processing script inputs: $1, $2, $#, $@ and $0",
  "hook": "It is your second week as a junior administrator at Cedar Valley Logistics, and Priya, the team lead, hands you a script someone wrote years ago. It is supposed to create accounts for every new warehouse hire named on the command line. Today she ran it with three names, and it created one account called \"Ana\" and another called \"Silva\", because the new hire's full name had a space in it. Then a colleague ran it with no arguments at all, and it quietly did nothing and reported success. Priya wants it fixed before the next onboarding batch arrives tomorrow morning. How does a script know what it was given, how many things it was given, and how do you keep a name like \"Ana Silva\" in one piece?",
  "simple": "When you run a command, the words you type after it are its inputs. Scripts get those words too. Bash hands them to the script in numbered boxes: the first word goes in box 1, the second in box 2, and so on. You read box 1 with `$1`, box 2 with `$2`. There is also a counter, `$#`, that says how many words were given, and a box `$0` that holds the script's own name. If you want all the words at once, `\"$@\"` gives you the whole list, each word kept separate. Think of a waiter taking an order: the script is the kitchen, and the numbered tickets are the dishes requested. The kitchen checks how many tickets arrived and reads each one in turn. Quotes matter because \"Ana Silva\" should be one ticket, not two.",
  "body": [
   "Scripts become far more useful when they accept input on the command line, the way normal commands do. When you run `./adduser.sh harry 2001`, the words after the script name are its arguments, also called positional parameters, and Bash makes them available through a set of special variables. RHCSA exam tasks frequently specify exactly how a script should respond to its arguments, including what it must print and which exit status it must return when they are missing, so you need to know these variables precisely rather than approximately.",
   "The numbered parameters come first. `$1` is the first argument, `$2` the second, and so on up to `$9`. From the tenth argument on you need braces, `${10}`, because Bash would otherwise read `$10` as `$1` followed by a literal 0. `$0` holds the name the script was run with, including any path you typed, so `./mkusers.sh` and `/usr/local/bin/mkusers.sh` give different values. That makes `$0` ideal for usage messages, because the message always shows the command the person actually typed. `$#` holds the number of arguments, not counting `$0`, which lets you check that the user supplied what the script needs before it does anything.",
   "Next come the variables that mean all the arguments at once. `$@` expands to every argument. Written in double quotes, `\"$@\"`, it expands to each argument as a separate word and preserves arguments that contain spaces, which makes it the right choice for `for` loops and for passing arguments on to another command unchanged. `$*` also means all arguments, but `\"$*\"` joins them into one single word separated by spaces. That joined form is mainly useful for printing them together in a message. Unquoted, `$@` and `$*` behave the same way, and both split any argument containing spaces into pieces, which is exactly the bug in the Cedar Valley script.",
   "The following script shows the standard pattern: check the count, print a usage line if it is wrong, then loop over the arguments safely.",
   "```bash\n#!/bin/bash\n# mkusers.sh - create each user named on the command line\nif [ $# -eq 0 ]; then\n    echo \"Usage: $0 user [user...]\" >&2\n    exit 1\nfi\necho \"Creating $# user(s)\"\nfor u in \"$@\"; do\n    useradd \"$u\" && echo \"created $u\"\ndone\n```",
   "Quoting is the habit that keeps scripts correct. Always quote positional parameters when you use them: `\"$1\"` rather than `$1`. If an argument is empty or contains spaces, an unquoted reference is split into several words or disappears entirely. A test such as `[ $1 = yes ]` with an empty `$1` becomes `[ = yes ]`, which fails with a confusing \"unary operator expected\" error, while `[ \"$1\" = yes ]` simply evaluates to false. Checking `$#` at the top of the script, printing a usage line to standard error with `>&2`, and exiting with a non-zero status is the defensive pattern graders expect. The non-zero exit status matters because other scripts and the grader check `$?` to decide whether your script succeeded.",
   "Two further tools help when arguments have structure. `shift` discards `$1` and moves every other argument down one place, so `$2` becomes `$1`, `$3` becomes `$2`, and `$#` decreases by one. It is useful for handling a first special argument, such as a group name, and then treating the rest as a list of users, or for processing arguments one at a time in a `while [ $# -gt 0 ]` loop. You can also supply default values with parameter expansion: `${1:-/tmp}` uses the first argument if it was given and is not empty, and `/tmp` otherwise. This lets a script such as a cleanup tool work sensibly with or without an argument.",
   "It also helps to know what you are not getting. Positional parameters are set when the script starts and belong to that script's process; a function inside the script has its own `$1`, `$2` and `$#` for the arguments passed to the function, while `$0` stays the script name. If you call another script and want it to receive the same arguments, pass them on with `\"$@\"`, never with an unquoted list.",
   "Finally, test before you call a task finished. Run your script with zero arguments, with one, with several, and with one that contains a space, for example `./mkusers.sh 'Ana Silva' bob`, and check `echo $?` after each run. When something looks wrong, `bash -x ./script a 'b c'` traces execution and shows exactly how each parameter was expanded, line by line, which usually reveals a missing pair of quotes within seconds."
  ],
  "analogy": "Positional parameters are like numbered seats on a small bus. The first passenger sits in seat 1, the second in seat 2, and the driver's clipboard records how many boarded ($#) and the route name ($0). \"$@\" is the full passenger list, one name per line. Unquoted $@ is like a clerk who copies the list but splits every two-word name into two passengers. shift is the passenger in seat 1 getting off and everyone moving forward one seat. The analogy stops at seat 10: Bash needs braces, ${10}, to read it.",
  "terms": [
   [
    "Positional parameters",
    "The arguments passed to a script, available as $1, $2 and so on; ${10} and above need braces."
   ],
   [
    "$0",
    "The name of the script as it was invoked, including any path typed."
   ],
   [
    "$#",
    "The number of arguments passed to the script, not counting $0."
   ],
   [
    "\"$@\"",
    "All arguments as separate, correctly quoted words; the right form for loops and for passing arguments on."
   ],
   [
    "\"$*\"",
    "All arguments joined into a single word separated by spaces; useful for printing."
   ],
   [
    "shift",
    "Discards $1 and renumbers the remaining arguments down by one, reducing $# by one."
   ],
   [
    "${1:-default}",
    "Parameter expansion that uses $1 if it is set and non-empty, or the default value otherwise."
   ]
  ],
  "example": "A task wants /usr/local/bin/greet that prints 'Hello NAME' for its first argument, or prints 'Usage: greet name' and exits 1 if none is given. You test `[ $# -lt 1 ]` for the usage branch, print the usage line to standard error and `exit 1`, then use `echo \"Hello $1\"`. You try it with no argument (checking that `echo $?` shows 1) and with 'Ada Lovelace' in quotes, which prints Hello Ada Lovelace as one name.",
  "mistakes": [
   [
    "$# includes the script name, so a script run with two arguments has $# equal to 3",
    "$# counts only the arguments after the script name. Two arguments means $# is 2; $0 is not counted."
   ],
   [
    "$10 refers to the tenth argument",
    "Bash reads $10 as $1 followed by the character 0. Use ${10} for the tenth argument and beyond."
   ],
   [
    "$@ and $* are interchangeable, so either works in a for loop",
    "Only \"$@\" in double quotes keeps each argument intact. \"$*\" makes one joined word, and unquoted forms split arguments containing spaces."
   ],
   [
    "Printing a usage message is enough when arguments are missing",
    "Exam tasks usually also require a specific non-zero exit status. Send the message to stderr with >&2 and use exit 1 (or whatever code the task specifies)."
   ]
  ],
  "tryit": [
   [
    "A colleague's backup script starts with `dest=$1` and then runs `tar -czf $dest /etc`. When run with no argument, tar fails with an odd error, and when run with '/backups/new dir/etc.tgz' it creates the wrong file. What two changes fix it?",
    "Quote the variable everywhere, `tar -czf \"$dest\" /etc`, so a path with a space stays one argument. Then add a check near the top, `if [ $# -ne 1 ]; then echo \"Usage: $0 file\" >&2; exit 1; fi`, or supply a default with `dest=${1:-/backups/etc.tgz}` if the task allows one."
   ],
   [
    "A task asks for a script whose first argument is a group name and whose remaining arguments are user names to add to that group. How do you separate the group from the users cleanly?",
    "Save the first argument with `group=\"$1\"`, then run `shift` so the users become $1, $2 and so on, and loop with `for u in \"$@\"; do usermod -aG \"$group\" \"$u\"; done`. Check first that $# is at least 2 and print a usage line otherwise."
   ]
  ],
  "tip": "Use \"$@\" (with quotes) to loop over or pass on all arguments; unquoted $@ or $* splits arguments that contain spaces. Check $# first, print usage to stderr, and exit non-zero when input is missing.",
  "check": [
   [
    "If a script is run as `./s.sh a b c`, what are $# and $2?",
    "$# is 3 and $2 is b."
   ],
   [
    "What does $0 contain?",
    "The name (and path, as typed) used to run the script, such as ./s.sh."
   ],
   [
    "Why is \"$@\" preferred over $* in a for loop?",
    "\"$@\" keeps each argument as one word even if it contains spaces; $* splits them unquoted or joins them into one word when quoted."
   ],
   [
    "After running `shift` once in a script started with three arguments, what is $#?",
    "2, because shift discards $1 and moves the others down."
   ]
  ]
 },
 {
  "t": "Processing the output of shell commands with $( ) command substitution",
  "hook": "Marcus runs the small Linux fleet at Brightwater Library District, and every Friday he copies the /etc directory of each server into a backup folder. For months he has typed the archive name by hand, and last week he overwrote Thursday's archive because he forgot to change the date. His manager asks for a script that names each archive after the server and the day automatically, and that warns him when the root file system is nearly full. Marcus knows the commands that print the host name, the date and the disk usage. What he does not know is how to grab what those commands print and drop it into a file name or an `if` test. How does a script capture another command's output?",
  "simple": "Some commands answer questions: `date` tells you the date, `hostname` tells you the machine's name, `wc -l` counts lines. Command substitution lets a script ask such a question and use the answer right away. You wrap the command in `$( )`, and the shell runs it and pastes its printed answer in that spot. So `echo \"Today is $(date +%F)\"` prints Today is followed by the date. You can also save the answer in a variable, like `today=$(date +%F)`, and use it later in a file name. It is like asking a coworker \"what's today's date?\" and writing their answer straight onto a label. Only the normal answer is pasted in; error messages still appear on the screen.",
  "body": [
   "Command substitution runs a command and puts its output into your command line or into a variable. It is how a script learns facts about the system, such as the host name, today's date, the number of lines in a file or the IP address of an interface, and then uses them in messages, file names or tests. The RHCSA objective about processing the output of shell commands within a script is largely about this one feature combined with a few text-filtering tools.",
   "The modern syntax is `$(command)`. The shell runs the command in a subshell, which is a child copy of the shell, captures its standard output, removes any trailing newlines and substitutes the result in place. `today=$(date +%F)` stores something like 2026-09-25 in a variable, and `echo \"Kernel: $(uname -r)\"` embeds the running kernel version directly in a message. The older form wraps the command in backquote characters, often called backticks. It does the same thing but is harder to read, easy to confuse with single quotes, and awkward to nest because inner backticks must be escaped. Prefer `$( )` in everything you write, but recognize backticks when you meet them in older scripts.",
   "The script below gathers a few facts and acts on them. Notice that each substitution is either assigned to a variable or placed inside a double-quoted string.",
   "```bash\n#!/bin/bash\nhost=$(hostname -s)\nusers=$(who | wc -l)\nrootuse=$(df --output=pcent / | tail -1 | tr -d ' %')\necho \"$host has $users login(s); / is ${rootuse}% full\"\nif [ \"$rootuse\" -gt 90 ]; then\n    echo \"WARNING: root file system almost full\" >&2\nfi\ntar -czf /backup/etc-$(date +%F).tar.gz /etc\n```",
   "Often you must trim a command's output down to exactly the value you need, and a pipeline inside the substitution does that. The `df` line above is a good illustration: `df --output=pcent /` prints a header and a value such as ` 42%`, `tail -1` keeps only the last line, and `tr -d ' %'` deletes the spaces and the percent sign, leaving the bare number 42 that the numeric test `-gt` can compare. The usual trimming tools are `cut`, which selects fields (`cut -d: -f1 /etc/passwd` gives user names), `awk '{print $2}'`, which prints a whitespace-separated column, `tr`, which deletes or translates characters, `head` and `tail`, which pick lines, and `grep`, which filters them. A reliable working method is to build and test the pipeline at the prompt first, confirm it prints exactly the value you want and nothing else, and only then wrap it in `$( )`.",
   "Be clear about what is captured. Only standard output goes into the substitution. Error messages written to standard error still appear on the terminal, so add `2>/dev/null` inside the parentheses if you want them silenced, or `2>&1` if you want them captured along with the normal output. The command's exit status is still available afterwards in `$?`, which lets you write constructs such as `out=$(some_cmd) || echo 'failed'`. Because an assignment like `rootuse=$(...)` reports the exit status of the substituted command, you can test whether the command worked as well as what it printed.",
   "Quoting matters here just as it does for variables. When you use a substitution as an argument, put it in double quotes, `\"$(command)\"`, to keep its output as one word; unquoted, the result is split on whitespace and any glob characters in it, such as `*`, are expanded against file names. The exception is when you deliberately want word splitting. `for u in $(cut -d: -f1 /etc/passwd)` gives one loop iteration per user name precisely because the output is split on newlines. User names contain no spaces, so this is safe; for data that might contain spaces, such as file names, a `while read` loop is safer.",
   "Substitutions nest cleanly with the `$( )` form. `echo \"Config owned by $(rpm -qf $(which sshd))\"` first finds the path of the sshd binary and then asks the RPM database which package owns that file. Nesting with backticks would require escaping the inner pair, which is one more reason the modern syntax is preferred.",
   "A few practical cautions round this out. Command substitution runs the command every time the line executes, so store a value in a variable if you need it several times and it should not change between uses, such as a timestamp shared by several files. Trailing newlines are stripped, but newlines in the middle of the output are kept, and they only survive if you quote the expansion when you print it: compare `echo $(ls)` with `echo \"$(ls)\"`. Finally, remember that a variable set inside the substitution's subshell does not come back to the parent script; only the printed output does."
  ],
  "analogy": "Command substitution is like asking a colleague a question and writing their spoken answer straight onto a form. You say \"what's the server name?\", they reply, and you write the reply in the blank. If they cough or complain while answering (standard error), that does not go on the form unless you deliberately ask for it. The analogy stops at quoting: on paper an answer stays together, but in the shell an unquoted answer can be cut into separate words wherever it contains spaces.",
  "terms": [
   [
    "Command substitution",
    "$(command): runs the command and replaces itself with the command's standard output, minus trailing newlines."
   ],
   [
    "Backticks",
    "The older `command` form of command substitution; equivalent but harder to read and nest."
   ],
   [
    "Subshell",
    "A child copy of the shell in which the substituted command runs; variables it sets do not return to the parent."
   ],
   [
    "cut",
    "Extracts fields or character ranges from each line, for example cut -d: -f1 /etc/passwd."
   ],
   [
    "awk '{print $N}'",
    "Prints the Nth whitespace-separated field of each line."
   ],
   [
    "tr",
    "Translates or deletes characters, for example tr -d ' %' removes spaces and percent signs."
   ]
  ],
  "example": "A task asks for a script that saves a list of users with UID 1000 or above into a file named after the host. You compute `file=/root/users-$(hostname -s).txt` and fill it with `awk -F: '$3 >= 1000 {print $1}' /etc/passwd > \"$file\"`. Running it on servera produces /root/users-servera.txt containing one regular user name per line.",
  "mistakes": [
   [
    "$(command) captures everything the command prints, including errors",
    "Only standard output is captured. Errors still go to the terminal unless you add 2>&1 (to capture) or 2>/dev/null (to discard) inside the parentheses."
   ],
   [
    "$(command) and ${variable} are the same thing",
    "Parentheses run a command and substitute its output; braces expand a variable. $(hostname) runs hostname, while ${hostname} reads a variable named hostname."
   ],
   [
    "It is fine to leave substitutions unquoted",
    "Unquoted output is split on whitespace and globs are expanded, which breaks values with spaces or asterisks. Quote \"$(cmd)\" unless you deliberately want one word per item."
   ],
   [
    "A numeric test can compare df output directly",
    "df prints a header and a value with a % sign. Trim it to a bare number first, for example with tail -1 and tr -d ' %', or the -gt test fails."
   ]
  ],
  "tryit": [
   [
    "A script line reads `count=$(grep -c 'Failed password' /var/log/secure 2>/dev/null)` and is followed by `if [ \"$count\" -gt 5 ]; then ... fi`. A colleague asks why the 2>/dev/null is inside the parentheses rather than at the end of the if line. What do you tell them?",
    "The redirection must be attached to the grep command that might fail, for example if the file is unreadable, so it belongs inside the substitution. Placed elsewhere, it would apply to a different command and grep's error would still reach the terminal. Standard output, the count, is still captured into the variable."
   ]
  ],
  "tip": "$( ) captures stdout only and strips trailing newlines. Build the pipeline at the prompt first, then wrap it. Quote it (\"$(cmd)\") unless you intentionally want the output split into separate words.",
  "check": [
   [
    "How do you store the current date as YYYY-MM-DD in a variable?",
    "d=$(date +%F)."
   ],
   [
    "Does $(command) capture error messages?",
    "No, only standard output; redirect 2>&1 inside the parentheses to include them."
   ],
   [
    "Why prefer $( ) over backticks?",
    "It is easier to read and nests without escaping."
   ],
   [
    "What does `echo \"Users: $(who | wc -l)\"` print?",
    "Users: followed by the number of current login sessions."
   ]
  ]
 },
 {
  "t": "Reading input and using variables and quoting correctly",
  "hook": "Late on a Tuesday, Jordan, the only administrator at Pine Ridge Veterinary Clinic, writes a quick script that asks for a user name and then shows that account's details. A receptionist tests it, presses Enter without typing anything, and the script happily prints the details of root. Another test with a folder called \"Client Records\" archives nothing and complains about two missing directories, \"Client\" and \"Records\". Nothing in the script looks wrong at first glance: it reads a value, stores it, and uses it. Yet one missing pair of quote marks is turning ordinary input into the wrong command. Why does the shell treat the same variable so differently depending on how you write it?",
  "simple": "A variable is a labeled box that holds a value, such as a name or a folder path. In Bash you fill the box with `name=value`, with no spaces around the equals sign, and you read it back with `$name`. The `read` command asks the person running the script to type something and puts the answer in a box. Quotes tell the shell how literally to take your text. Double quotes say \"fill in the boxes, but keep everything together as one piece\". Single quotes say \"take this text exactly as written, do not fill in anything\". Picture a mail clerk: double quotes are an envelope that keeps a two-word name together, while no quotes at all lets the clerk tear the name into two separate letters.",
  "body": [
   "Variables hold the values a script works with: names, paths, counts. In Bash you assign with `name=value`, and there must be no spaces around the `=`. Writing `name = value` makes Bash try to run a command called name with the arguments `=` and value, which fails with \"command not found\". You use the value with `$name`, or with `${name}` when the name is immediately followed by other characters, as in `${file}.bak`; without the braces, `$file.bak` works but `$filebak` would look for a variable called filebak. Variable names are case-sensitive, and by convention scripts use lowercase for their own variables and leave uppercase for environment variables such as PATH, HOME and USER, which avoids accidentally overwriting something important.",
   "Scope explains why variables sometimes seem to vanish. A variable exists only in the current shell unless you export it. `export NAME=value` marks it as part of the environment passed to child processes, which is how programs started from your script, such as an editor or another script, can see it. Variables set inside a script disappear when the script ends, because the script runs in its own process; running `./setvars.sh` cannot change variables in your interactive shell. If you really want a file's assignments in your current shell, you source it with `source file` or `. file`, which is how shell startup files work.",
   "Interactive input comes from `read`. `read name` waits for a line from standard input and stores it in name. `read -p 'Enter user: ' user` shows a prompt first, on the same line. The `-s` option hides typing, which is useful for passwords, and `-t 10` gives up after ten seconds so an unattended script does not hang forever. With several variable names, `read` splits the line on whitespace, puts one word in each variable, and places the whole remainder in the last one, so `read first rest` given \"Ana Maria Silva\" stores Ana in first and Maria Silva in rest. Because `read` uses standard input, it can also read from a pipe or a redirected file, which is how `while read line; do ...; done < file` loops process a file line by line.",
   "The script below asks for a directory, checks it and archives it. Every variable and substitution is double-quoted. The test `[ -d \"$dir\" ]` is false for an empty answer as well as for a missing directory, so one check covers both cases.",
   "```bash\n#!/bin/bash\nread -p \"Directory to archive: \" dir\n[ -d \"$dir\" ] || { echo \"Not a directory: '$dir'\" >&2; exit 1; }\ndest=\"/backup/$(basename \"$dir\")-$(date +%F).tar.gz\"\ntar -czf \"$dest\" \"$dir\" && echo \"Saved to $dest\"\n```",
   "Quoting controls what the shell expands, and it is where most script bugs come from. Double quotes, `\"...\"`, allow variable expansion, command substitution and backslash escapes, but prevent word splitting and glob expansion, so `\"$dir\"` stays a single argument even if it contains spaces or an asterisk. Single quotes, `'...'`, prevent all expansion: `echo '$HOME'` prints the literal text $HOME. A backslash escapes a single character: `echo \\$HOME` also prints $HOME. With no quotes at all, the shell expands the variable and then splits the result on spaces, tabs and newlines and expands any glob characters, and an empty variable vanishes completely, which is exactly what made Jordan's `id $u` turn into plain `id` and report on root.",
   "The practical rule is simple: put double quotes around every variable and command substitution unless you have a specific reason not to. Use single quotes for fixed strings that contain special characters, such as regular expressions for grep or awk programs, where you want the shell to leave `$` and `*` alone so the other program sees them. You can mix the two: `echo \"User $USER said 'hello'\"` works because single quotes inside double quotes are ordinary characters, and `$USER` is still expanded. Inside double quotes, escape a literal dollar sign or double quote with a backslash, as in `\"Price: \\$5\"`.",
   "Arithmetic has its own syntax. `$(( ))` evaluates integer expressions: `count=$((count + 1))` or `echo $((60 * 60))`. Inside the double parentheses you do not need `$` before variable names, and spaces around operators are allowed, unlike in plain assignments. Bash arithmetic is integer only, so `$((7 / 2))` is 3, and `$((7 % 2))` gives the remainder, 1. For numeric comparisons in tests, use `-eq`, `-lt` and `-gt` inside `[ ]`, not `<` and `>`, which inside single brackets are redirections.",
   "When something behaves strangely, the fastest diagnosis is to run the script with `bash -x`. The trace shows each command after expansion, so a missing quote reveals itself as an argument that split in two or disappeared. Combined with the habit of quoting everything, this resolves the large majority of beginner script problems quickly."
  ],
  "analogy": "Quoting is like packing items for shipping. Double quotes are a sealed box with a packing list: the warehouse fills in the variable values, but everything travels as one parcel. Single quotes are a box sealed with tape that says \"do not open\": what you wrote is exactly what arrives. No quotes is loose items on a conveyor: anything with a space falls apart into separate pieces, and an empty item simply is not there. The analogy is imperfect in one way: inside double quotes, a backslash can still escape $, \" and the backslash itself.",
  "terms": [
   [
    "Variable assignment",
    "name=value with no spaces around =; referenced later as $name or ${name}."
   ],
   [
    "export",
    "Marks a variable for inclusion in the environment of child processes."
   ],
   [
    "read -p",
    "Reads a line of input into variables after displaying a prompt; -s hides input and -t sets a timeout."
   ],
   [
    "Double quotes",
    "Allow $ expansion and command substitution but prevent word splitting and globbing."
   ],
   [
    "Single quotes",
    "Prevent all expansion; the text is taken literally."
   ],
   [
    "$(( ))",
    "Arithmetic expansion that evaluates integer expressions, such as $((n + 1))."
   ]
  ],
  "example": "A script asks for a user name with `read -p 'User: ' u` and runs `id $u`. When someone presses Enter without typing, unquoted $u vanishes and id reports on the current user (root) instead. Changing the script to `[ -z \"$u\" ] && exit 1` and using `id \"$u\"` fixes the bug: empty input now stops the script, and a quoted name is always passed as exactly one argument.",
  "mistakes": [
   [
    "Spaces around = are fine, as in many programming languages",
    "In Bash, count = 5 runs a command named count. Assignments must be written count=5 with no spaces."
   ],
   [
    "Single and double quotes are interchangeable",
    "Single quotes block all expansion, so '$HOME' prints the literal text. Double quotes expand variables while keeping the value as one word."
   ],
   [
    "Running a script that sets variables changes them in my current shell",
    "A script runs in a child process, so its variables vanish when it exits. Use source (or .) to run assignments in the current shell, and export to pass variables to children."
   ],
   [
    "$((7 / 2)) gives 3.5",
    "Bash arithmetic is integer only and truncates, so the result is 3."
   ]
  ],
  "tryit": [
   [
    "A script contains `read -p 'File to remove: ' f` followed by `rm $f`. A user types `old *.log` meaning one file with that unusual name. What could happen, and how should the script be written?",
    "Unquoted, $f splits into two words, old and *.log, and the glob expands to every .log file in the directory, so rm could delete far more than intended. Write `rm -- \"$f\"` so the value stays one literal argument, and check first that it is not empty and that the file exists with `[ -e \"$f\" ]`."
   ]
  ],
  "tip": "No spaces around = in assignments, double quotes around every $variable, single quotes when you want text taken literally. `'$HOME'` prints $HOME; `\"$HOME\"` prints /root when run as root.",
  "check": [
   [
    "What is wrong with `count = 5`?",
    "Spaces around = make Bash run a command named count; it must be count=5."
   ],
   [
    "What does `echo '$USER'` print?",
    "The literal text $USER, because single quotes prevent expansion."
   ],
   [
    "How do you add 1 to the variable n?",
    "n=$((n + 1))."
   ],
   [
    "Why does a variable set in a script disappear after the script ends?",
    "The script runs in its own child process, and its variables are lost when that process exits."
   ]
  ]
 },
 {
  "t": "Case statements for simple argument handling",
  "hook": "At Summit Ridge Credit Union, Elena inherits a service-control script that has grown into forty lines of `if`, `elif` and `else`. Each new option, such as \"restart\" or \"reload\", was bolted on by a different person, and now running it with \"Stop\" in capital letters starts the web server instead of stopping it, because one comparison was copied in the wrong place. The change window for the evening is in an hour, and she would rather not trust the script as it stands. She suspects the whole tangle could be a dozen tidy lines. Is there a cleaner way for a script to pick one action out of a short list of words?",
  "simple": "Sometimes a script has to choose one action from a menu of words, like \"start\", \"stop\" or \"status\". A `case` statement does that neatly. You hand it one value, usually the first word the user typed, and list the words you expect, each with what to do. Bash checks the list from top to bottom and runs the first match only. A final catch-all entry, written `*)`, handles anything unexpected, usually by printing how to use the script. It works like the phone menu at a doctor's office: press 1 for appointments, 2 for prescriptions, and anything else gets \"sorry, that is not a valid choice\". The patterns can include simple wildcards, so one entry can accept \"y\", \"Y\" and \"yes\".",
  "body": [
   "When a script must choose among several fixed options, such as start, stop and status, a long chain of `if` and `elif` string comparisons becomes hard to read and easy to get wrong. The `case` statement matches one value against a list of patterns and runs the block for the first pattern that matches. It is the standard Bash construct for handling a command-line argument that selects an action, and the RHCSA scripting objectives about conditionals and processing script inputs make it a natural fit for exam tasks.",
   "The structure has four parts. You begin with `case WORD in`, then write one or more clauses, then finish with `esac`, which is case spelled backwards. Each clause is a pattern ending in `)`, followed by one or more commands, and ends with `;;`. The patterns are shell glob patterns, the same kind you use for file names, not regular expressions: `*` matches any string, `?` matches any single character and `[ ]` matches one character from a set. You can list alternatives in one clause by separating them with `|`. A final `*)` clause acts as the default, catching anything that no earlier clause matched.",
   "Here is a typical service-control script. It accepts two words for each action and rejects everything else with a usage message.",
   "```bash\n#!/bin/bash\n# svc.sh - control the web server\ncase \"$1\" in\n    start|up)\n        systemctl start httpd ;;\n    stop|down)\n        systemctl stop httpd ;;\n    status)\n        systemctl status httpd --no-pager ;;\n    *)\n        echo \"Usage: $0 {start|stop|status}\" >&2\n        exit 1 ;;\nesac\n```",
   "Order matters because only one clause ever runs. Patterns are tested from top to bottom and the first match wins, so put specific patterns before general ones and the catch-all `*)` last. If you put `*)` first, it would match everything and the other clauses would never run. After the matching clause's commands finish, `;;` sends execution to the line after `esac`; unlike the switch statements of some programming languages, Bash does not fall through into the next clause. Quote the word being tested, `\"$1\"`, so an empty or spaced argument is handled cleanly. An empty argument then simply falls through to the default clause, which is exactly where you print a usage message to standard error and exit with a non-zero status.",
   "Glob patterns make it easy to accept variations without extra code. `[Yy]|[Yy][Ee][Ss])` matches y, Y, yes, YES and any mixed-case spelling of yes, and `*.tar.gz|*.tgz)` matches file names by extension. A pattern like `[0-9]*)` matches anything that starts with a digit. This makes `case` useful for interpreting user input from `read` as well: ask a question, then use case to decide what the answer means and treat anything unrecognized as a refusal or an error. Because the patterns are globs, characters such as `*` and `?` are special inside them; quote them, as in `'*')`, if you need to match the literal character.",
   "Case also combines well with loops. A common pattern processes options one at a time: `while [ $# -gt 0 ]; do case \"$1\" in -v) verbose=1 ;; -h) usage ;; *) files+=(\"$1\") ;; esac; shift; done`. Each pass examines the first argument, acts on it, and then `shift` moves the next argument into `$1` until none are left. For the RHCSA, the simpler form of matching a single argument against a few words is usually enough, but recognizing the loop form helps when you read existing scripts.",
   "Exit statuses deserve attention, because graders check them. If the task says the script must exit with status 2 on invalid input, put `exit 2` in the default clause, and verify with `echo $?` straight after running the script. A clause that runs a command such as `systemctl start httpd` leaves the script's exit status equal to that command's status if it is the last thing the script does, which is usually what you want.",
   "Watch the punctuation, since it is the usual source of syntax errors: `in` after the word, `)` after each pattern, `;;` at the end of each clause and `esac` at the end. A missing `;;` produces an error that points at the following line, which can be confusing. Running `bash -n script` checks the syntax without executing anything, so it is a quick, safe test before you run a script that starts and stops services. Then test every branch, including no argument and a wrong argument, before calling the task done."
  ],
  "analogy": "A case statement is like the sorting desk in a mailroom with labeled trays. The clerk reads the label on each incoming item, compares it with the trays from left to right, and drops it into the first tray whose label fits. One tray at the far right is marked \"everything else\". The clerk never puts an item in two trays. Where it differs: tray labels in Bash can use wildcards, so one tray can say \"anything ending in .tgz\".",
  "terms": [
   [
    "case ... esac",
    "Statement that compares a value against patterns and runs the first matching clause."
   ],
   [
    ";;",
    "Terminates a case clause; execution then continues after esac with no fall-through."
   ],
   [
    "Pattern alternatives",
    "Several patterns in one clause separated by |, such as start|up)."
   ],
   [
    "*) default clause",
    "A final clause matching anything not matched earlier, typically for usage errors."
   ],
   [
    "Glob pattern",
    "Shell wildcard matching with *, ? and [ ], used by case instead of regular expressions."
   ],
   [
    "bash -n",
    "Checks a script's syntax without running it."
   ]
  ],
  "example": "A task asks for a script that prints 'green' when run with 'go', 'red' with 'stop', and 'Usage: script go|stop' otherwise with exit code 2. You write a case on \"$1\" with go), stop) and *) clauses, putting `exit 2` in the default clause after the echo to stderr. You then test all three plus no argument, checking `echo $?` each time to confirm 0 for the valid words and 2 for everything else.",
  "mistakes": [
   [
    "case patterns are regular expressions, so ^start$ or [a-z]+ will work",
    "case uses shell glob patterns. Use start for an exact word, * for any string, ? for one character and [ ] for a set."
   ],
   [
    "If several patterns match, every matching clause runs",
    "Only the first matching clause runs, and ;; then jumps past esac. There is no fall-through between clauses."
   ],
   [
    "The *) clause can go anywhere",
    "It matches everything, so any clause placed after it can never run. Put it last."
   ],
   [
    "The statement ends with end or done",
    "A case statement ends with esac; done ends loops and fi ends if statements."
   ]
  ],
  "tryit": [
   [
    "A script's case statement has the clauses `*)` (print usage), then `start)`, then `stop)`. Users report that every command just prints the usage message. What is wrong, and how do you confirm the fix?",
    "The catch-all *) is first, so it matches every value and the specific clauses are never reached. Move *) to the end, run bash -n to check syntax, then test start, stop, an invalid word and no argument, checking $? each time."
   ],
   [
    "You need a script that asks \"Continue? \" and proceeds for y, Y, yes or YES but stops for anything else, including just pressing Enter. How would you structure it?",
    "Use read -p 'Continue? ' ans, then case \"$ans\" in [Yy]|[Yy][Ee][Ss]) echo proceeding ;; *) echo stopped; exit 1 ;; esac. An empty answer matches only *), so pressing Enter stops the script."
   ]
  ],
  "tip": "case uses shell glob patterns, not regex, stops at the first match, and needs ;; after each clause and esac at the end. Quote the tested word and put the catch-all *) last.",
  "check": [
   [
    "What keyword ends a case statement?",
    "esac."
   ],
   [
    "How do you make one clause match both 'start' and 'up'?",
    "Use start|up) as the pattern."
   ],
   [
    "What happens if two patterns could match the same value?",
    "Only the first matching clause in order runs."
   ],
   [
    "What does an empty \"$1\" match in the svc.sh example?",
    "Only the *) default clause, which prints the usage message and exits 1."
   ]
  ]
 },
 {
  "t": "Booting, rebooting and shutting down normally (systemctl reboot, poweroff)",
  "hook": "It is the last half hour of your practice exam at Northgate Community College, and every task looks finished. The web server answers, the new logical volume is mounted on /data, and the firewall rule is in place. Your instructor, Mr. Okafor, walks past and asks one question: \"Have you rebooted?\" You have not. Everything you configured is running right now, but the grader will look at the machine only after it restarts. Did you write that mount into /etc/fstab, or did you just run mount? Did you enable the service, or only start it? There is one way to find out, and you need to do it cleanly, quickly and with enough time left to fix whatever breaks.",
  "simple": "Turning a Linux server off properly is like closing a shop at night: you let customers finish, lock the till, and switch off the lights in order, instead of cutting the power at the street. On RHEL, a program called systemd is in charge of starting everything when the machine boots and stopping everything neatly when it shuts down. You ask it to restart with `systemctl reboot` and to turn off with `systemctl poweroff`. The machine also has a \"default target\", which is simply the mode it starts in: a text-only server mode or a full desktop mode. After a restart, you check that everything you set up came back on its own.",
  "body": [
   "On a RHEL system, systemd is the first process the kernel starts, and it has process ID (PID) 1. It brings up services in the right order during boot, tracks them while the system runs, and stops them cleanly at shutdown. Shutting down or rebooting through systemd, rather than pulling the power, gives services time to save data, lets file systems be unmounted, and flushes disk caches so nothing written in the last few seconds is lost. On the exam you will reboot often, because every configuration must survive a reboot, so you should do it cleanly and understand what happens on the way down and the way back up.",
   "The main commands are short. `systemctl reboot` restarts the machine, `systemctl poweroff` shuts it down and switches off the power, and `systemctl halt` stops the system without powering it off, leaving the hardware on. The traditional commands `reboot`, `poweroff` and `halt` still exist and simply ask systemd to do the same thing. `shutdown` adds scheduling and warnings: `shutdown -r now` reboots immediately, `shutdown -h +10` powers off in ten minutes and broadcasts a warning to logged-in users, a message can be added at the end, and `shutdown -c` cancels a scheduled shutdown. These commands need root privileges, so on the exam you will run them as root or with `sudo`.",
   "```bash\nsystemctl reboot\nsystemctl poweroff\nshutdown -r +5 \"Rebooting for kernel update\"\nshutdown -c\nsystemctl get-default        # target used at boot\nsystemctl set-default multi-user.target\n```",
   "Behind these commands are systemd targets. A target is a unit that groups other units to describe a system state, a little like a run level on older systems. `poweroff.target` and `reboot.target` are what the shutdown commands activate. At boot, systemd starts the default target, normally `multi-user.target` for servers, which provides a text console with networking and services, or `graphical.target` for systems with a desktop, which includes everything in multi-user plus the graphical login. `systemctl get-default` shows the default, and `systemctl set-default` changes it persistently by updating the `default.target` symbolic link. `systemctl isolate multi-user.target` switches the running system to another target immediately, stopping units that the new target does not need, without rebooting and without changing the default.",
   "The boot sequence is worth knowing in outline because later topics, such as rescue mode and password recovery, build on it. Firmware, either the older BIOS (Basic Input/Output System) or UEFI (Unified Extensible Firmware Interface), runs first, tests the hardware and starts the boot loader, GRUB 2 (GRand Unified Bootloader version 2). GRUB shows a menu, then loads the selected kernel and the initramfs, a small initial file system loaded into memory that contains the drivers and tools needed to find the real root file system, for example storage drivers or LVM (Logical Volume Manager) tools. Code in the initramfs mounts the real root file system and hands control to systemd on that root, which then starts the default target and everything it depends on.",
   "Enabling and starting are separate ideas, and rebooting is what exposes the difference. `systemctl start` runs a service now; `systemctl enable` makes it start at boot; `systemctl enable --now` does both. Similarly, a file system mounted with the `mount` command is gone after a reboot unless it also has an entry in `/etc/fstab`. A practice reboot is therefore the most honest test of your work, because it shows the system exactly as the grader will see it.",
   "After a reboot, confirm the system came up as expected. Log in, run `systemctl --failed` to list units that did not start, check specific things such as `systemctl is-enabled httpd`, `systemctl is-active httpd` and `findmnt /data`, and read the logs. `journalctl -b` shows messages from the current boot, and `journalctl -b -1` shows the previous boot, provided the journal is stored persistently on disk. On the exam, do a final reboot before time runs out, and leave enough time to fix and reboot again if something does not come back.",
   "Finally, avoid forcing a reset unless the system is truly hung and does not respond to a clean shutdown. A hard reset or power cut skips the orderly stop: file systems may need checking or repair on the next boot, and any data not yet written to disk is lost. If a clean reboot appears stuck, give it time, because systemd waits for services to stop, and some wait for a timeout before being forced to exit."
  ],
  "analogy": "A clean shutdown is like a pilot landing a plane through a checklist: lower the landing gear, reduce speed, taxi to the gate, and only then switch off the engines. Pulling the power is a crash landing; you might walk away, but something will need repair. Targets are like the flight's phases: \"cruising\" (multi-user.target) or \"cruising with the in-flight entertainment on\" (graphical.target). The analogy stops at isolate: a plane cannot jump to a different phase instantly, but systemctl isolate can switch targets on a running system.",
  "mnemonic": "Boot order is \"Fred Goes Into Swimming\": Firmware (BIOS or UEFI), GRUB 2, Initramfs (kernel loaded with it), then systemd starting the default target.",
  "terms": [
   [
    "systemd",
    "The init system and service manager, PID 1 on RHEL, which starts and stops everything else."
   ],
   [
    "systemctl reboot / poweroff",
    "Cleanly restart the system, or shut it down and power it off."
   ],
   [
    "shutdown",
    "Schedules a reboot (-r) or power-off (-h) with a warning to users; shutdown -c cancels it."
   ],
   [
    "Target",
    "A systemd unit that groups other units to describe a system state, for example multi-user.target."
   ],
   [
    "Default target",
    "The target systemd starts at boot; shown by systemctl get-default and changed by systemctl set-default."
   ],
   [
    "systemctl isolate",
    "Switches the running system to a different target immediately without changing the default."
   ],
   [
    "initramfs",
    "Initial RAM file system loaded with the kernel, containing what is needed to mount the real root file system."
   ]
  ],
  "example": "After finishing all tasks you run `systemctl reboot`, log back in, and check `findmnt /data`, `systemctl is-active httpd` and `systemctl --failed`. You discover a typo in /etc/fstab left a mount missing, fix it, confirm with `mount -a`, and reboot again before time runs out. The second reboot shows every mount and service in place.",
  "mistakes": [
   [
    "systemctl set-default graphical.target switches to the desktop right away",
    "set-default only changes what starts at the next boot. Use systemctl isolate graphical.target to switch now."
   ],
   [
    "If a service is running, it will be running after a reboot",
    "Only enabled services start at boot. Use systemctl enable --now so it runs now and after every reboot."
   ],
   [
    "halt and poweroff are the same",
    "halt stops the operating system but leaves the hardware powered on; poweroff also switches the power off."
   ],
   [
    "A quick power cycle is as good as a reboot when you are short on time",
    "A forced reset skips the orderly shutdown, can leave file systems needing repair, and loses unwritten data. Use systemctl reboot."
   ]
  ],
  "tryit": [
   [
    "A colleague installed a desktop on a server, and now it boots to a graphical login that wastes memory. They want text mode at every boot from now on, and they also want to drop to text mode right now without rebooting. Which commands do they need?",
    "systemctl set-default multi-user.target makes text mode the default for future boots, and systemctl isolate multi-user.target switches the running system now. Confirm with systemctl get-default."
   ]
  ],
  "tip": "systemctl set-default changes what happens at the NEXT boot; systemctl isolate changes the target NOW. The exam grades the system after a reboot, so reboot yourself, check, and leave time to fix.",
  "check": [
   [
    "Which command shows the target the system boots into by default?",
    "systemctl get-default."
   ],
   [
    "How do you schedule a reboot in 10 minutes and then cancel it?",
    "shutdown -r +10, then shutdown -c."
   ],
   [
    "What is the role of the initramfs in booting?",
    "It provides the drivers and tools needed to find and mount the real root file system before handing over to systemd."
   ],
   [
    "After a reboot, which command lists units that failed to start?",
    "systemctl --failed."
   ]
  ]
 },
 {
  "t": "Booting into different targets manually from the GRUB menu (systemd.unit=rescue.target, emergency.target)",
  "body": [
   "Sometimes a system will not boot normally: a bad `/etc/fstab` entry, a broken service or a forgotten password. Rather than reinstalling, you can tell systemd to start a smaller, more basic target for one boot only, by editing the kernel command line in the GRUB 2 boot loader menu. This is a key troubleshooting skill and a likely exam task.",
   "To do it, reboot and interrupt the GRUB menu by pressing an arrow key before the countdown ends. Highlight the kernel entry you want (normally the first) and press `e` to edit it. Find the line that starts with `linux` (it loads the kernel and lists its parameters), move to the end of that line and add your parameter. Press `Ctrl+X` to boot with the change. The edit applies to this boot only; nothing is written to disk.",
   "`systemd.unit=rescue.target` boots into rescue mode, the modern equivalent of single-user mode. systemd mounts all local file systems from `/etc/fstab`, starts a few basic services, and gives you a root shell after asking for the root password. Networking and most services are not started. Rescue mode is the right choice when file systems are fine but something in the normal startup, such as a misbehaving service, is the problem.",
   "`systemd.unit=emergency.target` is even more minimal. It mounts only the root file system, and read-only, and gives a root shell (again after the root password). It is used when rescue mode itself cannot start, typically because an `/etc/fstab` entry refers to a disk or file system that is missing or broken. In emergency mode you remount root read-write, fix the problem, and continue.",
   "```bash\n# in emergency mode, after entering the root password\nmount -o remount,rw /\nvim /etc/fstab        # fix or comment out the bad line\nsystemctl daemon-reload\nmount -a              # test all fstab entries\nsystemctl default     # continue to the default target (or reboot)\n```",
   "In fact, if an `/etc/fstab` entry cannot be mounted during normal boot, systemd usually drops you into emergency mode automatically with a message to that effect, so recognising this shell and knowing the recovery steps is essential. The same targets can be reached on a running system with `systemctl isolate rescue.target`, and `systemctl rescue` or `systemctl emergency` do so directly.",
   "Both targets require the root password. If the root account is locked or the password is unknown, you need the initramfs break technique instead, which is covered separately. The names `rescue.target` and `emergency.target` must be spelled exactly; with a typo you do not get the target you asked for."
  ],
  "terms": [
   [
    "GRUB 2",
    "The boot loader on RHEL; its menu lets you choose and temporarily edit kernel entries."
   ],
   [
    "Kernel command line",
    "Parameters on the linux line in GRUB, passed to the kernel and systemd at boot."
   ],
   [
    "rescue.target",
    "Minimal target that mounts all local file systems and provides a root shell, without networking."
   ],
   [
    "emergency.target",
    "Most minimal target: only root mounted read-only and a root shell."
   ],
   [
    "systemd.unit=",
    "Kernel parameter telling systemd which target to start instead of the default."
   ]
  ],
  "example": "After someone adds a mistyped UUID to /etc/fstab, the server stops at an emergency shell on boot. You enter the root password, run `mount -o remount,rw /`, correct the line using `blkid` to get the real UUID, run `mount -a` successfully and reboot to a normal login.",
  "tip": "Rescue mounts all file systems; emergency mounts only root, read-only. If fstab is broken, rescue fails, so use emergency and remember to remount / read-write before editing.",
  "check": [
   [
    "Which key edits a GRUB menu entry and which boots the edited entry?",
    "e edits the entry; Ctrl+X boots it."
   ],
   [
    "Why would you choose emergency.target over rescue.target?",
    "When file systems in /etc/fstab cannot be mounted, since emergency only mounts root (read-only)."
   ],
   [
    "Is a parameter added in the GRUB editor permanent?",
    "No, it applies only to that boot."
   ]
  ]
 },
 {
  "t": "Interrupting the boot process to gain access (rd.break, chroot /sysroot, passwd, touch /.autorelabel)",
  "body": [
   "If the root password is lost, rescue and emergency modes do not help because both ask for it. RHEL documents a recovery procedure that stops the boot inside the initramfs, before systemd on the real system takes over and before any password is requested. It is a legitimate administrator technique and a classic RHCSA task. It also shows why physical or console access to a server must be protected: anyone with console access can do the same, which is why data centres restrict console access and why a GRUB password or disk encryption can be used to block it.",
   "The key parameter is `rd.break`, understood by dracut, the tool that builds the initramfs. It tells the initramfs to stop and give you a shell just before switching to the real root file system. At that point the real root is mounted read-only at `/sysroot`, and you are working in the tiny initramfs environment.",
   "```bash\n# GRUB: press e, add rd.break to the end of the linux line, Ctrl+X\nmount -o remount,rw /sysroot\nchroot /sysroot\npasswd root                # set the new password\ntouch /.autorelabel\nexit                       # leave the chroot\nexit                       # continue booting (or reboot)\n```",
   "Step by step: remount `/sysroot` read-write so you can change files. `chroot /sysroot` makes `/sysroot` appear as `/` for your shell, so commands such as `passwd` operate on the real system's `/etc/shadow` instead of the initramfs. Change the password with `passwd` (or `passwd root`). Then create the empty file `/.autorelabel`.",
   "That last step is the one people forget, and it matters because of SELinux (Security-Enhanced Linux). During this procedure SELinux policy is not loaded, so when `passwd` replaces `/etc/shadow` the new file gets no correct SELinux label. With SELinux enforcing, the system would then deny access to the file and nobody could log in. `/.autorelabel` tells the system to relabel every file with its correct context on the next boot, which takes a few minutes and triggers an extra automatic reboot. Do not interrupt it.",
   "Typing `exit` twice leaves the chroot and then the initramfs shell, and the boot continues. Some systems need a GRUB edit to remove `rhgb quiet` to see messages, and on some virtual machines the console is on a serial line, but the procedure is the same. An alternative sometimes used is booting with `init=/bin/bash`; in all cases the idea is to get a root shell before authentication and then restore SELinux labels.",
   "Afterwards, verify by logging in as root with the new password. If login fails with the correct password, the relabel step was probably skipped; you can fix it by repeating the procedure, or, from a working root shell, with `restorecon -v /etc/shadow`."
  ],
  "terms": [
   [
    "rd.break",
    "Kernel parameter that makes the initramfs stop and open a shell before switching to the real root."
   ],
   [
    "/sysroot",
    "Where the real root file system is mounted inside the initramfs, read-only by default."
   ],
   [
    "chroot",
    "Runs a shell with a given directory treated as the root /, here /sysroot."
   ],
   [
    "/.autorelabel",
    "Empty file that triggers a full SELinux relabel of the file system at the next boot."
   ],
   [
    "dracut",
    "The tool that builds the initramfs and understands rd.* kernel parameters."
   ]
  ],
  "example": "On an exam system the root password is unknown. You add rd.break in GRUB, remount /sysroot read-write, chroot, run `passwd` and `touch /.autorelabel`, then exit twice. The system relabels, reboots on its own and you log in as root with the new password.",
  "tip": "Remember the order: remount,rw /sysroot, chroot /sysroot, passwd, touch /.autorelabel, exit, exit. Skipping the autorelabel leaves /etc/shadow mislabeled and logins fail under SELinux.",
  "check": [
   [
    "Why must you remount /sysroot before changing the password?",
    "It is mounted read-only at the rd.break point, so the password change could not be written."
   ],
   [
    "What problem does touch /.autorelabel prevent?",
    "The new /etc/shadow lacking a correct SELinux context, which would block logins when SELinux is enforcing."
   ],
   [
    "Why do you chroot into /sysroot?",
    "So passwd modifies the real system's files rather than the initramfs environment."
   ]
  ]
 },
 {
  "t": "Identifying CPU- and memory-intensive processes with top, ps aux --sort and killing them (kill, pkill, signals 15 and 9)",
  "hook": "At 2:10 a.m. your phone buzzes: the order-tracking server at Riverbend Freight is crawling, and the overnight dispatchers cannot load their screens. You connect over SSH and even typing feels sluggish. Somewhere on this machine one process is eating the processor or swallowing memory, and everything else is waiting in line behind it. You could reboot and lose the dispatchers' unsaved work, or you could find the culprit in under a minute and stop it cleanly. Which process is it, who owns it, and how do you stop it without breaking anything else?",
  "simple": "Every program that is running on a computer is called a process, and each one gets an ID number. When a computer feels slow, it is usually because one process is hogging the processor or the memory. The `top` command shows a live list with the hungriest processes at the top, and `ps aux --sort=-%cpu` prints a one-time list sorted the same way. Once you know the ID number, you can ask the process to stop with `kill`. By default this is a polite request, like asking someone to finish up and leave. If the process ignores you, `kill -9` is like a security guard removing them on the spot: it always works, but they get no chance to tidy up.",
  "body": [
   "A process is a running instance of a program, identified by a process ID (PID). When a system is slow, your job is to find which processes are using the central processing unit (CPU) or memory and decide whether to stop them. The RHCSA expects you to identify CPU- and memory-intensive processes and terminate them correctly, which means knowing both the viewing tools and the meaning of the signals you send.",
   "The live view comes from `top`. Its header shows uptime, the load average (the average number of processes running or waiting to run over the last 1, 5 and 15 minutes), task counts by state, CPU usage split into categories such as user, system and idle, and memory and swap usage. Below the header, processes are listed with PID, USER, priority (PR), nice value (NI), memory columns (VIRT for virtual size and RES for resident memory actually held in RAM), state (S), %CPU, %MEM, TIME+ and COMMAND. By default top sorts by CPU. Press `M` to sort by memory, `P` to return to CPU, `k` to kill a process by PID, `r` to renice one and `q` to quit. A load average well above the number of CPUs, combined with one process near 100 percent CPU, is the classic sign of a runaway job.",
   "The snapshot view comes from `ps`. `ps aux` lists every process with user, PID, %CPU, %MEM, VSZ (virtual size), RSS (resident set size), state, start time and full command. Add `--sort` to order it: `ps aux --sort=-%cpu | head` shows the heaviest CPU users first, because the minus sign means descending, and `--sort=-%mem` does the same for memory. Because `ps` prints once and exits, it is easy to pipe into `head` or save into a file, which makes it better than top for scripts and for exam evidence. `ps -ef` is another common style, `ps -o pid,ni,%cpu,cmd -p PID` shows chosen columns for one process, and `pgrep name` prints the PIDs whose name matches, with `pgrep -l` adding the names.",
   "```bash\nps aux --sort=-%cpu | head -5\nps aux --sort=-%mem | head -5\npgrep -l dd\nkill 4312          # SIGTERM (15), polite request\nkill -9 4312       # SIGKILL, cannot be ignored\npkill -u harry     # signal all of harry's processes\nkillall stress-ng\n```",
   "Processes are stopped by sending signals, which are small numbered notifications delivered by the kernel. `kill PID` sends SIGTERM, signal 15, by default. SIGTERM asks the process to terminate; a well-written program catches it, saves its work, closes files and exits cleanly. SIGKILL, signal 9, sent with `kill -9 PID` or `kill -KILL PID`, is handled by the kernel itself: the process is removed immediately and cannot catch, delay or ignore it, so it gets no chance to clean up, which can leave temporary files or half-written data behind. The right approach is SIGTERM first, a few seconds of patience, and SIGKILL only if the process does not exit. Other signals worth recognizing are SIGHUP (1), which many daemons treat as \"reload your configuration\", and SIGINT (2), which is what Ctrl+C sends to a foreground program. `kill -l` lists them all with their numbers.",
   "It also helps to read the state column before you act. In both top and ps, R means running or ready to run, S means sleeping while waiting for an event, D means uninterruptible sleep, usually waiting on disk or network storage, T means stopped, and Z marks a zombie, a process that has exited but whose parent has not yet collected its exit status. A process in D state is often not burning CPU at all, and signals, even SIGKILL, take effect only when it leaves that state, so the real problem may be the storage it waits on. A zombie uses no CPU or memory and cannot be killed because it is already dead; it disappears when its parent collects it or when the parent itself exits.",
   "Sometimes you want to signal by name or owner rather than by number. `pkill` and `killall` do that. `pkill -u harry` targets all of a user's processes, `pkill -t pts/1` those attached to one terminal, and `killall name` matches exact command names. Both send SIGTERM unless you give another signal, for example `pkill -9 -u harry`. Because pattern matching can catch more than you intend (`pkill ssh` would also match sshd), preview the match with `pgrep -l` using the same pattern before you send anything.",
   "Permissions and services add two final rules. Normal users can signal only their own processes; root can signal any process. And killing a process that belongs to a systemd service may simply cause systemd to restart it, depending on the unit's restart policy, so for services use `systemctl stop` (and `systemctl disable` if it should not return at boot) instead of kill. Afterwards, confirm the result: rerun `ps aux --sort=-%cpu | head` or watch top until the load settles, and check that the process is really gone with `pgrep`."
  ],
  "analogy": "Sending signals is like closing time at a library. SIGTERM is the announcement \"the library closes in five minutes\": readers reshelve books, save their work and leave on their own. SIGKILL is security escorting someone out mid-sentence: guaranteed, but their notes stay scattered on the table. The analogy breaks in one place: a reader could ignore the announcement and stay, and a program can likewise catch or ignore SIGTERM, but nobody can refuse SIGKILL.",
  "terms": [
   [
    "PID",
    "Process ID: the unique number identifying a running process."
   ],
   [
    "top",
    "Interactive, live view of processes sorted by resource use; M sorts by memory, P by CPU, k kills, q quits."
   ],
   [
    "ps aux --sort=-%cpu",
    "Snapshot of all processes sorted by descending CPU usage."
   ],
   [
    "Load average",
    "Average number of processes running or waiting for a CPU over 1, 5 and 15 minutes."
   ],
   [
    "SIGTERM (15)",
    "Default kill signal requesting a clean shutdown; the process may catch it."
   ],
   [
    "SIGKILL (9)",
    "Signal that terminates a process immediately; it cannot be caught or ignored."
   ],
   [
    "pkill / pgrep",
    "Signal, or list, processes matched by name, user or terminal instead of PID."
   ]
  ],
  "example": "The load average is climbing. `ps aux --sort=-%cpu | head -3` shows a runaway `dd` owned by harry at 99% CPU. `kill 5821` has no effect after a few seconds, so you use `kill -9 5821`, and top shows the CPU returning to idle. `pgrep -l dd` returns nothing, confirming the process is gone.",
  "mistakes": [
   [
    "kill always destroys a process immediately",
    "Plain kill sends SIGTERM (15), a request the process may handle or ignore. Only SIGKILL (9) forces immediate removal."
   ],
   [
    "Use kill -9 first because it is the most reliable",
    "SIGKILL gives no chance to clean up and can leave corrupted or temporary files. Try SIGTERM first and escalate only if needed."
   ],
   [
    "--sort=%cpu shows the busiest processes first",
    "Without the minus sign the sort is ascending. Use --sort=-%cpu (or -%mem) for highest first."
   ],
   [
    "Killing a service's main process stops the service",
    "systemd may restart it. Use systemctl stop for services."
   ]
  ],
  "tryit": [
   [
    "Users report a slow server. top shows a load average of 6 on a 2-CPU machine, and a process named reportgen owned by a user named lee is at 98% CPU. It is not part of any systemd service. What do you do, in order?",
    "Note the PID from top or ps aux --sort=-%cpu, then send SIGTERM with kill PID (or press k in top and accept signal 15). Wait a few seconds and check with pgrep -l reportgen. Only if it is still running, send kill -9 PID. Confirm the load average falls."
   ],
   [
    "You need to stop every process belonging to a departing contractor account, temp1, before deleting it. How do you do this safely?",
    "Preview with pgrep -l -u temp1 to see what will be matched, then run pkill -u temp1 to send SIGTERM. Check again with pgrep -u temp1, and use pkill -9 -u temp1 only for anything left."
   ]
  ],
  "tip": "Try SIGTERM (15, the default) before SIGKILL (9). SIGKILL cannot be caught, so the process gets no chance to clean up. Use a minus in --sort=-%cpu for highest first, and preview pkill with pgrep -l.",
  "check": [
   [
    "Which signal does `kill PID` send by default?",
    "SIGTERM, signal 15."
   ],
   [
    "How do you list the five most memory-hungry processes?",
    "ps aux --sort=-%mem | head -6 (header plus five), or press M in top."
   ],
   [
    "Why can a process not ignore SIGKILL?",
    "SIGKILL is acted on by the kernel directly and cannot be caught or blocked by the process."
   ],
   [
    "Which key in top sorts by memory usage?",
    "M (capital); P returns to CPU sorting."
   ]
  ]
 },
 {
  "t": "Adjusting process scheduling with nice and renice (range -20 to 19)",
  "hook": "Every night at eleven, the reporting job at Hollow Oak Insurance compresses a day's claim files, and every night at eleven the customer portal slows to a crawl for the agents working late. Dana, the systems administrator, does not want to move the job to 3 a.m., because the reports must be ready by morning, and she cannot buy a bigger server this quarter. The portal and the report both need the processor; the question is who should go first when they compete. Is there a way to tell Linux that the report can wait its turn without stopping it altogether?",
  "simple": "A computer's processor can only do so much at once, so when several programs want it, Linux takes turns among them. The \"nice value\" is a number that tells Linux how polite a program should be about taking its turn. It runs from -20 to 19. A high number, like 19, means \"very nice: let everyone else go first\". A low number, like -20, means \"I'm important: let me go first\". Most programs start at 0. You start a program with a chosen value using `nice`, and change a running one with `renice`. It is like a queue at a coffee shop where a patient customer waves others ahead. If nobody else is in line, the patient customer still gets served right away.",
  "body": [
   "The Linux scheduler is the part of the kernel that decides which process runs on a central processing unit (CPU) at any moment. When there is more work than CPU time, processes compete, and the nice value is how you tell the scheduler which ones matter more. It does not make a process faster in absolute terms; it changes how CPU time is shared when the CPU is busy. On an idle system, a low-priority process still gets all the CPU it wants, which is why niceness is a safe way to push background work aside without delaying it unnecessarily.",
   "The range and direction are what the exam tests most. Nice values range from -20 to 19, and the default is 0. A higher number means the process is \"nicer\" to others and gets a smaller share of CPU; a lower, negative number means a larger share and higher priority. So -20 is the highest priority and 19 the lowest. The name is the best memory aid: a nice process lets others go first. Child processes inherit the nice value of the process that started them, so a script started at nice 10 runs all of its commands at nice 10.",
   "Permissions are deliberately asymmetric. Any user can make their own processes nicer by raising the value toward 19. Only root can lower a nice value, whether to a negative number or back down after raising it, so a regular user who renices a job from 0 to 10 cannot later return it to 0. This rule prevents ordinary users from grabbing CPU at the expense of everyone else on a shared system. On the exam you normally work as root, but you should still know which changes an ordinary user is allowed to make.",
   "Two commands set the value. `nice` starts a new command with a chosen value: `nice -n 10 tar -czf /backup/home.tar.gz /home` runs the backup at nice 10. Without `-n`, nice uses an adjustment of 10. `renice` changes processes that are already running: `renice -n 5 -p 2345` sets PID 2345 to 5, `renice -n 15 -u harry` changes all of harry's processes, and `-g` targets a process group. Within `top`, press `r`, enter the PID and then the new value. Both commands accept negative values only when run as root.",
   "```bash\nnice -n 19 ./cpu-hog.sh &       # start at lowest priority\npgrep -f cpu-hog.sh             # find its PID\nps -o pid,ni,%cpu,comm -p 2345  # check the NI column\nrenice -n -5 -p 2345            # root only: raise priority\nps axo pid,ni,comm --sort=-ni | head\n```",
   "Checking your work means reading the right column. Look at the NI column in `top`, or add `ni` to `ps` output with `-o` or `axo`, as in the example above. `top` also shows PR, the kernel's priority. For normal processes it equals 20 plus the nice value, so nice 0 shows as PR 20, nice -20 as PR 0 and nice 19 as PR 39. Real-time processes show `rt` there and use a separate scheduling scheme that you do not need to manage for the RHCSA. If a question asks you to verify a nice value, NI is the column that matches the number you set.",
   "It helps to see how niceness behaves under load. If two CPU-bound processes share one CPU, one at nice 0 and one at nice 19, the nice 0 process receives by far the larger share of CPU time, and the nice 19 process makes slow progress. If the nice 0 process finishes, the nice 19 process immediately speeds up to use the whole CPU. Niceness affects CPU scheduling only; it does not limit memory use or directly change disk input and output priority, so a job that is slow because of disk activity will not be fixed by renicing alone.",
   "Typical uses follow from this. Run backups, compressions, indexing and batch jobs at a high nice value so interactive users and services stay responsive, and occasionally give an important process a negative value when it must not be starved. An exam task might ask you to start a command with a specific nice value or to change the value of a running process; complete it with `nice -n` or `renice -n`, then verify the result with `ps -o pid,ni,comm -p PID` before moving on."
  ],
  "analogy": "Nice values work like a polite line at a single coffee counter. A customer with a high nice value keeps waving others ahead, so they are served last when the shop is busy, but immediately when it is empty. Only the manager (root) can move someone to the front of the line; customers can only choose to wait longer. The analogy stops at speed: being served first does not make the barista work faster, just as a low nice value does not make the CPU faster.",
  "terms": [
   [
    "Nice value",
    "A number from -20 (highest priority) to 19 (lowest) that influences a process's CPU share; the default is 0."
   ],
   [
    "nice",
    "Starts a command with a specified nice value; the default adjustment is 10."
   ],
   [
    "renice",
    "Changes the nice value of running processes by PID (-p), user (-u) or process group (-g)."
   ],
   [
    "NI column",
    "The nice value shown by top and by ps with the ni field."
   ],
   [
    "PR",
    "The priority column in top; for normal processes it is 20 plus the nice value."
   ],
   [
    "Scheduler",
    "The kernel component that decides which runnable process uses a CPU next."
   ]
  ],
  "example": "A nightly report job slows down the web application. You find its PID with `pgrep -f report` and run `renice -n 15 -p 7710`. `ps -o pid,ni,comm -p 7710` shows NI 15. The job still finishes, but the web server's requests are now scheduled ahead of it and response times recover.",
  "mistakes": [
   [
    "A higher nice value means higher priority",
    "It is the opposite. Higher nice means lower priority; -20 is the highest priority and 19 the lowest."
   ],
   [
    "Any user can set any nice value for their own processes",
    "Users can only raise their own values (be nicer). Lowering a value, including setting a negative one, requires root."
   ],
   [
    "A process at nice 19 runs slowly even on an idle machine",
    "Nice only matters when processes compete for CPU. On an idle system a nice 19 process gets all the CPU it needs."
   ],
   [
    "nice with no -n option leaves the value at 0",
    "Without -n, nice applies an adjustment of 10."
   ]
  ],
  "tryit": [
   [
    "User kim started a long compression job and, to be helpful, ran renice -n 10 on it. An hour later the job is nearly done and kim wants it back at 0 to finish faster. Kim's renice command fails. Why, and what are the options?",
    "Lowering a nice value requires root, even back to the original 0. Kim can ask an administrator to run renice -n 0 -p PID as root, or simply let the job finish; if the CPU is otherwise idle, nice 10 makes little difference anyway."
   ]
  ],
  "tip": "Higher nice number = lower priority. Anyone can raise a value (be nicer); only root can lower it or set a negative value. Verify with ps -o pid,ni,comm -p PID.",
  "check": [
   [
    "What is the lowest-priority nice value?",
    "19; -20 is the highest priority."
   ],
   [
    "Can a regular user renice their process from 10 back to 0?",
    "No, lowering a nice value requires root."
   ],
   [
    "How do you start `updatedb` at nice value 15?",
    "nice -n 15 updatedb."
   ],
   [
    "In top, a normal process shows PR 25. What is its nice value?",
    "5, because PR equals 20 plus the nice value."
   ]
  ]
 },
 {
  "t": "Managing tuning profiles with tuned-adm (active, recommend, profile)",
  "hook": "Ravi has just moved a dozen servers at Silver Creek Analytics from physical hardware onto virtual machines, and a ticket arrives from the data team: queries that used to finish in ten minutes now take fifteen. Nothing is broken, and every service is running. A senior colleague glances at the ticket and asks one question: \"What tuning profile are those guests using?\" Ravi has never heard of a tuning profile. He opens a terminal on one of the new machines and wonders how he would even find out what the system thinks it is, let alone what it should be set to. Where do you start?",
  "simple": "A Linux server can be set up for different jobs: some need maximum speed, some need to save power, and some run inside a virtual machine where the hardware is shared. Adjusting all the hidden settings for each job by hand would be slow and error-prone. RHEL includes a helper service called tuned that applies ready-made sets of settings, called profiles, in one step. You ask it which profile it recommends, switch to a profile with one command, and check which one is active. It is like the picture modes on a television, such as \"movie\", \"sports\" or \"power saver\": one button changes many settings at once, and the TV remembers your choice.",
  "body": [
   "Different workloads want different kernel and hardware settings. A database server benefits from settings that favor throughput, a laptop from power saving, and a virtual machine guest from settings suited to virtualized disks and CPUs (central processing units). RHEL's tuned service applies coherent sets of such settings, called profiles, so you do not have to adjust dozens of parameters by hand and remember to reapply them after every reboot. Managing tuning profiles is listed in the RHCSA objectives under operating running systems, and the task is usually quick if you know the commands.",
   "tuned runs as a systemd service named `tuned`. A profile can change things such as CPU frequency governors, which control how aggressively processors raise and lower their clock speed, disk input/output (I/O) schedulers, kernel sysctl parameters, and power-management behavior for devices. Some profiles also monitor the system and adjust settings dynamically as load changes. Profiles shipped with the package live under `/usr/lib/tuned/` (newer tuned releases place them in a `profiles` subdirectory there), and administrators can create custom profiles under `/etc/tuned/`, usually by including an existing profile and overriding a few settings. You do not need to write custom profiles for the exam, but knowing where they live helps you understand what `tuned-adm list` is reading.",
   "The profile names describe their intent. Commonly seen profiles include `balanced`, a compromise between performance and power; `powersave`; `throughput-performance`, tuned for high throughput on servers; `latency-performance`, for low response times; `network-latency` and `network-throughput`, specialized versions of those for network-heavy work; `virtual-guest`, for systems running as virtual machines; and `virtual-host`, for systems hosting virtual machines. The exact list depends on the installed package version and any extra profile packages, so check it on the system with `tuned-adm list` rather than memorizing it.",
   "```bash\ndnf install -y tuned\nsystemctl enable --now tuned\ntuned-adm list          # available profiles and the current one\ntuned-adm active        # currently active profile\ntuned-adm recommend     # profile suggested for this system\ntuned-adm profile virtual-guest\ntuned-adm verify        # check the settings are applied\ntuned-adm off           # disable tuning\n```",
   "The workflow follows a simple order. First make sure tuned is installed and that the service is enabled and running, because the profile is applied by the service, not by the `tuned-adm` command itself; `tuned-adm` is only the client that talks to the daemon. `tuned-adm active` then shows the current profile. `tuned-adm recommend` prints the profile tuned considers best for this machine, based on detection of things such as whether it is running as a virtual machine. `tuned-adm profile NAME` switches to that profile immediately, and the choice is saved, so it persists across reboots as long as the service is enabled. `tuned-adm verify` compares the current system settings with the profile and reports whether they match, and `tuned-adm off` stops tuning without stopping the service.",
   "Exam tasks are usually worded one of two ways: \"set the recommended tuning profile\" or \"set the tuning profile to X\". For the first, run `tuned-adm recommend`, pass exactly what it prints to `tuned-adm profile`, and confirm with `tuned-adm active`. Do not guess the recommended profile from what you think the machine is; let tuned decide, because the grader will compare against tuned's own recommendation. For the second, simply use the named profile. You can combine profiles by listing several names after `tuned-adm profile`, with later ones overriding earlier ones where they conflict, but single profiles are normal on the exam.",
   "It is worth being clear about what tuned does not do. It does not install software, change which services run, or alter your application settings; it adjusts how the kernel and hardware behave underneath them. Changing a profile is also safe to experiment with, because `tuned-adm profile` can switch back at any time and takes effect without a reboot. On a laptop or workstation, a desktop power-management tool may expose similar power modes, but on an RHCSA exam server the tuned service and `tuned-adm` are what you use and what the grader checks.",
   "Troubleshooting is mostly about the service. If `tuned-adm` reports that it cannot talk to the daemon, the service is not running; start and enable it with `systemctl enable --now tuned` and try again. Because the service applies the saved profile at boot, a disabled tuned service is the usual reason a profile seems to be lost after a reboot. If a profile name is rejected, check its spelling against `tuned-adm list`, since names are exact. As with every exam task, reboot near the end and confirm with `tuned-adm active` that the profile is still in place."
  ],
  "analogy": "tuned is like the climate presets in a car: \"eco\", \"comfort\" or \"sport\" each change fan speed, temperature and seat heating in one press, and the car remembers your choice the next time you start it. tuned-adm recommend is like the car suggesting \"eco\" because it detects highway driving. The analogy stops at the engine: the presets only work while the car's control unit is on, just as profiles are applied only while the tuned service is running and enabled.",
  "terms": [
   [
    "tuned",
    "The RHEL service that applies tuning profiles adjusting kernel and hardware settings for a workload."
   ],
   [
    "Tuning profile",
    "A named set of performance and power settings, such as balanced, throughput-performance or virtual-guest."
   ],
   [
    "tuned-adm list",
    "Lists available profiles and shows the current one."
   ],
   [
    "tuned-adm active",
    "Shows the currently active tuning profile."
   ],
   [
    "tuned-adm recommend",
    "Shows the profile tuned recommends for the detected system."
   ],
   [
    "tuned-adm profile",
    "Switches to the given profile and saves it so it persists across reboots."
   ],
   [
    "tuned-adm verify",
    "Checks whether the current system settings match the active profile."
   ]
  ],
  "example": "A task says to apply the recommended tuning profile on serverb. `tuned-adm recommend` prints virtual-guest, so you run `systemctl enable --now tuned` and `tuned-adm profile virtual-guest`, then `tuned-adm active` confirms it. After a reboot it still shows virtual-guest.",
  "mistakes": [
   [
    "tuned-adm profile alone is enough, whether or not the service is enabled",
    "The tuned service applies the profile. If it is not running and enabled, the profile is not applied at boot. Use systemctl enable --now tuned."
   ],
   [
    "The recommended profile can be inferred from the hardware, so there is no need to ask",
    "Always run tuned-adm recommend and use its output; the grader checks against tuned's own recommendation."
   ],
   [
    "tuned-adm active shows the recommended profile",
    "active shows what is in use now; recommend shows what tuned suggests. They can differ."
   ],
   [
    "tuned-adm off stops and disables the tuned service",
    "It only stops applying tuning. Stopping or disabling the service is done with systemctl."
   ]
  ],
  "tryit": [
   [
    "On a virtual machine, tuned-adm active reports \"balanced\", and a task asks for the recommended profile. When you run tuned-adm recommend, you get an error saying it cannot connect to the tuned daemon. What do you do?",
    "The service is not running. Run systemctl enable --now tuned, then tuned-adm recommend again. Apply whatever it prints with tuned-adm profile NAME (often virtual-guest on a VM, but use the actual output) and confirm with tuned-adm active, ideally again after a reboot."
   ]
  ],
  "tip": "The profile is applied by the tuned service, so make sure it is enabled and running (systemctl enable --now tuned). Don't guess the recommended profile: ask tuned-adm recommend, apply it, then check tuned-adm active.",
  "check": [
   [
    "How do you find which profile tuned suggests for a machine?",
    "tuned-adm recommend."
   ],
   [
    "Which command shows the profile currently in use?",
    "tuned-adm active."
   ],
   [
    "Why might a chosen profile not be active after a reboot?",
    "The tuned service is not enabled, so nothing applies the profile at boot."
   ],
   [
    "Where are the profiles shipped with the package stored?",
    "Under /usr/lib/tuned/ (in a profiles subdirectory on newer releases); custom profiles go under /etc/tuned/."
   ]
  ]
 },
 {
  "t": "Locating and reading system logs: /var/log/messages, /var/log/secure, journalctl -u, -p, -b, --since",
  "hook": "A help-desk ticket lands in your queue at Maple Grove School District: \"Teachers can't log in to the grades server since this morning.\" The server is up, the web page loads, and the SSH (Secure Shell) service shows as active. Your colleague Tomas suggests restarting everything and hoping. You would rather know what actually happened. Somewhere on this machine, every refused login, every service restart and every configuration warning has been written down with a timestamp. The record exists; the trick is knowing which file or command holds the lines you need, and how to cut thousands of entries down to the five that explain the problem. Where do you look first?",
  "simple": "A log is a diary the computer keeps about itself: every time something starts, stops, fails or someone logs in, it writes a line with the time. RHEL keeps two kinds of diary. One is a set of plain text files in the folder `/var/log`, which you can read with ordinary tools. `/var/log/messages` holds general news, and `/var/log/secure` holds login and security events. The other is the systemd journal, which you read with the `journalctl` command. Its strength is filtering: show only one service, only serious problems, only since this morning. It is like searching a long email inbox by sender and date instead of scrolling through every message.",
  "body": [
   "Logs are the first place to look when something fails: a service that will not start, a login that is refused, a disk that will not mount. RHEL has two cooperating logging systems, and the RHCSA expects you to use both. systemd-journald collects messages from the kernel, the early boot process, services and programs into a structured binary journal. rsyslog, a traditional syslog daemon, receives messages from the journal and writes them to plain text files in `/var/log/`, sorted by type. Most messages therefore appear in both places, and you can choose whichever view answers your question faster.",
   "The text files are easy to search with `less`, `tail` and `grep`. `/var/log/messages` holds most general system messages. `/var/log/secure` holds security and authentication events: logins, `sudo` use, SSH connections and failed passwords. `/var/log/cron` records scheduled jobs, `/var/log/maillog` mail activity, and `/var/log/boot.log` boot messages from services. `tail -f /var/log/secure` follows a file live, which is useful while you reproduce a problem in another terminal, and `grep -i 'failed password' /var/log/secure` pulls out one kind of event. Which messages go to which file is decided by rules in `/etc/rsyslog.conf` and files in `/etc/rsyslog.d/`, which match messages by facility, such as authpriv or cron, and by priority. Many services also keep their own logs outside this system; the Apache web server, for example, writes under `/var/log/httpd/`.",
   "`journalctl` reads the journal and can filter it far more precisely, because each entry is stored with structured fields such as the unit, the process ID and the priority. On its own, `journalctl` shows everything, oldest first, in a pager. `-e` jumps to the end, `-f` follows new entries as they arrive, and `-n 20` shows the last 20 entries. The most useful filters are these, and they can be combined freely.",
   "```bash\njournalctl -u sshd               # one unit (service)\njournalctl -p err                # priority err and more severe\njournalctl -b                    # current boot only\njournalctl -b -1                 # previous boot (needs persistence)\njournalctl --since '1 hour ago'\njournalctl --since '2026-09-25 08:00' --until '2026-09-25 09:00'\njournalctl -u httpd -p warning --since today\n```",
   "Each filter has details worth knowing exactly. `-u UNIT` shows messages from one systemd unit, which is the fastest way to see why a service failed; `systemctl status UNIT` also shows its last few journal lines, which is often enough for a first look. `-p` filters by priority and includes everything at that level and above. The syslog priorities from most to least severe are emerg (0), alert (1), crit (2), err (3), warning (4), notice (5), info (6) and debug (7), so `-p err` shows err, crit, alert and emerg, and you can give either the name or the number. `-b` limits output to one boot; `-b -1` is the previous boot, and `--list-boots` shows which boots are available. `--since` and `--until` accept dates such as `'2026-09-25 14:00'` and words such as `today`, `yesterday` or `'10 min ago'`.",
   "A few more options round out the toolkit. `-o verbose` shows every stored field of each entry, which reveals the field names you can filter on. Field matches such as `_PID=1234` or `_COMM=sshd` filter by those fields directly, and `-k` shows kernel messages only, similar to `dmesg`. Access is restricted: you need to be root, or a member of a group allowed to read the system journal such as `systemd-journal` or `wheel`, to see all entries, while other normal users see only their own.",
   "Persistence is the detail that most often surprises people. Whether the journal survives a reboot depends on the `Storage=` setting in `/etc/systemd/journald.conf` and on whether the directory `/var/log/journal` exists. When the journal is kept only in memory under `/run/log/journal`, entries from previous boots are gone and `journalctl -b -1` has nothing to show. Making it persistent, by creating `/var/log/journal` or setting `Storage=persistent` and restarting systemd-journald, is covered as its own topic. The text files in `/var/log` survive reboots regardless, because rsyslog writes them to disk.",
   "In practice, a good investigation moves from broad to narrow. Start with `systemctl status` or `journalctl -u UNIT -e` for a failing service, `/var/log/secure` for login and sudo problems, and `journalctl -p err -b` for a quick list of everything serious since boot. Then narrow by time with `--since` around the moment the problem began, and read the few lines that remain carefully, because the cause is usually stated plainly in one of them."
  ],
  "analogy": "The two logging systems are like a hospital's records. The journal is the electronic patient database: every entry has fields, so you can ask for \"only cardiology, only critical, only since Tuesday\". The files in /var/log are the printed ward binders, already sorted by department, easy to flip through with no special software. The analogy breaks on persistence: the database may be wiped at every reboot unless it is set to save to disk, while the binders always stay on the shelf.",
  "mnemonic": "Syslog priorities from most to least severe: \"Every Alley Cat Eats Worms, Not Including Dogs\" for emerg, alert, crit, err, warning, notice, info, debug (0 to 7).",
  "terms": [
   [
    "systemd-journald",
    "Service that collects log messages into the structured systemd journal."
   ],
   [
    "rsyslog",
    "Syslog daemon that writes messages to text files under /var/log according to /etc/rsyslog.conf."
   ],
   [
    "/var/log/messages",
    "Text log for most general system messages."
   ],
   [
    "/var/log/secure",
    "Text log for authentication and security events such as logins, SSH and sudo."
   ],
   [
    "journalctl -u",
    "Shows journal entries for a specific systemd unit."
   ],
   [
    "journalctl -b",
    "Limits output to one boot; -b -1 is the previous boot if the journal is persistent."
   ],
   [
    "Syslog priority",
    "Severity level from emerg (0) to debug (7); journalctl -p shows that level and more severe ones."
   ]
  ],
  "example": "Users say SSH logins to serverb fail. You run `tail -n 30 /var/log/secure` and see repeated 'Failed password' lines for one account, then `journalctl -u sshd --since '30 min ago'` shows sshd restarted with a configuration warning, pointing you to the bad setting. After fixing it, `journalctl -u sshd -f` shows a successful login as a user tests again.",
  "mistakes": [
   [
    "journalctl -p err shows only err messages",
    "-p includes the named priority and everything more severe, so err also shows crit, alert and emerg."
   ],
   [
    "Failed logins and sudo use are recorded in /var/log/messages",
    "Authentication and security events go to /var/log/secure."
   ],
   [
    "journalctl -b -1 always shows the previous boot",
    "It works only if the journal is stored persistently; a memory-only journal under /run/log/journal is lost at reboot."
   ],
   [
    "A normal user running journalctl sees the whole system journal",
    "Normal users see only their own entries unless they are root or in a group such as systemd-journal or wheel."
   ]
  ],
  "tryit": [
   [
    "The httpd service failed to start after a configuration change about an hour ago, and systemctl status httpd shows only a generic failure line. Which command narrows the journal to exactly what you need?",
    "journalctl -u httpd --since '1 hour ago' (optionally with -p err or -e) shows only httpd's entries from that window, where the specific configuration error is usually stated. Fix the file, restart the service and watch the result with journalctl -u httpd -f."
   ],
   [
    "A security officer asks how many failed SSH password attempts happened on a server today. Where do you look, and how do you count them?",
    "Authentication events are in /var/log/secure, so grep -c 'Failed password' /var/log/secure gives a count for the file; alternatively, journalctl -u sshd --since today | grep -c 'Failed password' limits it to today using the journal."
   ]
  ],
  "tip": "journalctl -p err shows err AND everything more severe (crit, alert, emerg). Authentication problems go to /var/log/secure, not /var/log/messages. Combine filters: -u, -p, -b and --since work together.",
  "check": [
   [
    "Which file records failed SSH logins and sudo usage?",
    "/var/log/secure."
   ],
   [
    "How do you show only this boot's messages from the chronyd service?",
    "journalctl -b -u chronyd."
   ],
   [
    "What does journalctl -p warning include?",
    "Messages with priority warning and all more severe priorities (err, crit, alert, emerg)."
   ],
   [
    "Why might journalctl -b -1 show nothing?",
    "The journal is not persistent, so entries from previous boots were kept only in memory and lost at reboot."
   ]
  ]
 },
 {
  "t": "Preserving the systemd journal across reboots (Storage=persistent, /var/log/journal)",
  "hook": "It is 7:15 a.m. at Pinecrest Medical Supply, and the order database server rebooted itself at 3:02 a.m. Nobody touched it. Your manager, Lena, wants to know why before the morning standup at 9:00. You log in, run `journalctl -b -1` to read the previous boot, and get nothing but a message that the boot is not available. The logs from the hours before the crash are simply gone, along with any clue about a failing disk, a kernel panic or a runaway process. The server will probably do this again. What one setting would have kept those messages, and how do you make sure the next crash leaves evidence behind?",
  "simple": "Your Linux system keeps a diary of everything that happens, called the journal. On some systems that diary is written only in memory, the way you might jot notes on a whiteboard. When the power goes off or the machine restarts, the whiteboard is wiped and the notes are lost. Making the journal persistent means telling the system to write the diary into a notebook on the disk instead, in a folder called `/var/log/journal`. You change one line in a settings file, `Storage=persistent`, restart the journal service, and from then on every restart leaves the old pages intact so you can read what happened before it. A simple everyday picture: it is the difference between a whiteboard and a bound logbook.",
  "body": [
   "The systemd journal is the central log on RHEL, collected by the `systemd-journald` service and read with `journalctl`. Depending on how a system was set up, that journal may live only in memory. In that case journald writes to `/run/log/journal/`, a directory on a tmpfs (a temporary file system held in RAM) that is emptied at every boot. The consequence is easy to miss until you need it: `journalctl -b -1`, which asks for the previous boot, returns nothing, and `journalctl --list-boots` shows only the current boot. That makes it very hard to investigate a crash or a failed boot after the fact. Making the journal persistent means storing it on disk in `/var/log/journal/`, and it is a standard RHCSA (Red Hat Certified System Administrator) task.",
   "Where the journal goes is controlled by the `Storage=` setting in the `[Journal]` section of `/etc/systemd/journald.conf`, or in a drop-in file ending in `.conf` under `/etc/systemd/journald.conf.d/`. It has four values. `persistent` stores the journal on disk in `/var/log/journal` and creates that directory if it does not exist. `volatile` keeps logs only in memory under `/run/log/journal`. `auto` stores on disk only if `/var/log/journal` already exists, and otherwise falls back to memory. `none` discards journal data entirely, although messages can still be forwarded to rsyslog. The shipped file lists its settings as commented-out lines that show the compiled-in defaults, so the edit is to remove the leading `#` and change the value, not just to read the line and assume it is active.",
   "```ini\n# /etc/systemd/journald.conf\n[Journal]\nStorage=persistent\n```",
   "```bash\nvim /etc/systemd/journald.conf        # set Storage=persistent\nsystemctl restart systemd-journald\nls /var/log/journal/                  # a directory named by machine ID appears\njournalctl --list-boots               # after the next reboot, several boots\njournalctl --disk-usage\n```",
   "After editing, restart the service with `systemctl restart systemd-journald` so it rereads the configuration and begins writing to disk. You will then see a subdirectory inside `/var/log/journal` whose name is a long hexadecimal string; it matches the contents of `/etc/machine-id`, and inside it are files such as `system.journal`. Seeing that directory and those files is your first sign the change worked. An alternative that works when the setting is left at `auto` is simply to create the directory: `mkdir -p /var/log/journal`, then `systemd-tmpfiles --create --prefix /var/log/journal` to give it the correct group ownership and permissions, then restart journald. Setting `Storage=persistent` explicitly is clearer, survives someone deleting the directory, and is what exam tasks usually ask for.",
   "It helps to know which file wins if settings appear in more than one place. Drop-in files in `/etc/systemd/journald.conf.d/` are read after the main file and override it, so if a task or a colleague left a drop-in that says `Storage=volatile`, your edit to the main file will appear to do nothing. A quick `grep -r Storage /etc/systemd/journald.conf*` shows every place the key is set. The key name and value are case sensitive: `storage=persistent` or `Storage=Persistent` will not be recognized, and journald quietly keeps its old behavior.",
   "A persistent journal does not grow forever. By default journald limits the on-disk journal to a share of the file system it lives on, and you can set your own ceilings in the same file with options such as `SystemMaxUse=` (the most disk space the journal may use) and `SystemKeepFree=` (how much space to always leave free). You can also trim it by hand with `journalctl --vacuum-size=` to shrink it to a size or `journalctl --vacuum-time=` to delete entries older than a period. Journal files are rotated as they fill, and the oldest archived files are removed when limits are reached, so very old entries eventually disappear even on a persistent journal. `journalctl --disk-usage` reports how much space the journal currently takes.",
   "Persistence pays off when you combine it with journalctl's filters. Once several boots are stored, `journalctl --list-boots` shows each one with an offset (0 for the current boot, -1 for the previous, and so on), a boot ID and the first and last timestamps. `journalctl -b -1 -p err` shows only error-level and worse messages from the previous boot, and `journalctl -b -1 -e` jumps to its end, which is exactly where the last messages before a crash or a hang live. On systems where rsyslog is also running, text logs such as `/var/log/messages` persist too, but the journal holds richer, structured data and is what exam tasks name.",
   "To confirm the change, reboot and run `journalctl --list-boots`. If it lists more than one boot, and `journalctl -b -1` shows the previous boot's messages, the journal is persistent. That verification step is worth the minute it takes, because a typo in the setting, a line left commented out, a conflicting drop-in or a forgotten restart all silently keep the old behavior, and a grader will check after rebooting the system."
  ],
  "analogy": "A volatile journal is like a flight recorder that only keeps data while the plane is powered on: the moment the power cuts, everything it recorded vanishes, which is exactly when you needed it. Setting `Storage=persistent` is like fitting a recorder that writes to a crash-proof memory card. The analogy stops working in one place: even the persistent journal is not kept forever, because size limits and rotation delete the oldest records to make room for new ones.",
  "terms": [
   [
    "Storage=",
    "journald.conf option choosing where the journal is kept: persistent, volatile, auto or none."
   ],
   [
    "/var/log/journal",
    "On-disk location of a persistent journal; contains a subdirectory named after the machine ID."
   ],
   [
    "/run/log/journal",
    "In-memory (tmpfs) location of a volatile journal, lost at every reboot."
   ],
   [
    "systemd-journald",
    "The journal service; restart it after changing journald.conf."
   ],
   [
    "journalctl --list-boots",
    "Lists the boots recorded in the journal; more than one indicates persistence."
   ],
   [
    "SystemMaxUse=",
    "journald.conf option capping how much disk space the persistent journal may use."
   ]
  ],
  "example": "A server rebooted unexpectedly overnight but `journalctl -b -1` shows no data. You set `Storage=persistent` in /etc/systemd/journald.conf and restart systemd-journald, and a machine-ID directory appears under /var/log/journal. After the next incident, `journalctl -b -1 -p err` shows the disk errors leading up to the reboot, and you can open a hardware ticket with evidence.",
  "mistakes": [
   [
    "Editing journald.conf is enough; the change applies on its own.",
    "journald reads its configuration when it starts. Restart it with `systemctl restart systemd-journald` (or reboot) before expecting files in /var/log/journal."
   ],
   [
    "Storage=auto already makes the journal persistent.",
    "auto writes to disk only if /var/log/journal already exists. If the directory is missing, the journal stays in /run/log/journal. persistent creates the directory itself."
   ],
   [
    "Seeing the Storage line in the file means it is set.",
    "The shipped file shows defaults as commented lines starting with #. The line has no effect until you remove the # and set the value, and a drop-in in journald.conf.d can still override it."
   ],
   [
    "A persistent journal keeps every message forever.",
    "journald enforces size limits and rotates files, deleting the oldest archives. Use SystemMaxUse= or the vacuum options to control how much history is kept."
   ]
  ],
  "tryit": [
   [
    "You are handed a server where `journalctl --list-boots` shows only boot 0. You check /etc/systemd/journald.conf and see `Storage=persistent` uncommented and correct, and you restarted journald. After a reboot, there is still only one boot listed. What do you check next?",
    "Look for an override: run `grep -r Storage /etc/systemd/journald.conf*`. A drop-in file in /etc/systemd/journald.conf.d/ setting Storage=volatile would be read after the main file and win. Remove or fix it, restart systemd-journald, reboot and run journalctl --list-boots again."
   ]
  ],
  "tip": "Storage=auto only persists if /var/log/journal exists; Storage=persistent creates it. Either way, restart systemd-journald and confirm with journalctl --list-boots after a reboot.",
  "check": [
   [
    "Where is the journal stored when it is not persistent?",
    "In /run/log/journal, a tmpfs location that is cleared at every boot."
   ],
   [
    "After setting Storage=persistent, what must you do for it to take effect?",
    "Restart systemd-journald (systemctl restart systemd-journald) or reboot."
   ],
   [
    "How can you prove the journal now survives reboots?",
    "Reboot, then journalctl --list-boots lists multiple boots and journalctl -b -1 shows the previous one."
   ],
   [
    "What is the difference between Storage=auto and Storage=persistent?",
    "auto uses disk only if /var/log/journal already exists; persistent creates the directory and always uses disk."
   ]
  ]
 },
 {
  "t": "Starting, stopping and checking network services (systemctl status, ss -tlnp)",
  "hook": "Monday, 8:05 a.m., at Cedar Valley Library. Omar, the only IT person on staff, gets a ticket: the new catalog web page that worked on Friday is down. He remembers installing the web server and starting it, and it worked fine. Then the server was patched and rebooted over the weekend. Now the browser just times out. Omar wonders whether the web server crashed, whether something is blocking it, or whether it simply never came back. Before he starts changing configuration files at random, he needs a reliable way to ask the system three questions: is the service running, will it start on its own, and is it really listening for visitors?",
  "simple": "A network service is a program that runs quietly in the background and waits for other computers to talk to it, like a shop clerk waiting behind a counter. On RHEL, a manager program called systemd looks after these background programs, and you give it orders with the `systemctl` command. There are two separate questions. Is the shop open right now? That is start and stop. Will the shop open by itself every morning? That is enable and disable. `systemctl enable --now` answers yes to both. Then the `ss` command lets you look at which doors are actually open, meaning which network ports a program is listening on. A clerk who is hired but never unlocks the door still turns customers away.",
  "body": [
   "A network service is a daemon, a background program, that listens on a network port for clients: sshd on port 22, a web server on ports 80 and 443, chronyd for time synchronization. On RHEL, systemd manages daemons as service units, such as `sshd.service` or `httpd.service`, described by unit files under `/usr/lib/systemd/system/` (vendor defaults) and `/etc/systemd/system/` (local changes). `systemctl` is how you control them, and you can usually leave off the `.service` suffix. A service task is only finished when three things are true: the service is running now, it will start at boot, and it is actually listening where clients expect.",
   "Two separate ideas are easy to mix up, and exam tasks test the difference. Starting or stopping changes the current state: `systemctl start httpd`, `systemctl stop httpd`, `systemctl restart httpd` (stop then start) and `systemctl reload httpd` (reread configuration without dropping existing connections, if the service supports it). Enabling or disabling changes what happens at boot: `systemctl enable httpd` creates the links that make it start automatically, and `disable` removes them. Neither one implies the other, so a service can be running but disabled (it will vanish after the next reboot) or enabled but stopped (it will appear only after a reboot). `systemctl enable --now httpd` does both at once and is the usual command on the exam; `systemctl disable --now` is its opposite.",
   "```bash\nsystemctl enable --now httpd\nsystemctl status httpd          # state, PID, recent log lines\nsystemctl is-active httpd       # active / inactive / failed\nsystemctl is-enabled httpd      # enabled / disabled / masked\nsystemctl list-units --type=service --state=running\nsystemctl mask telnet.socket    # prevent any start\n```",
   "`systemctl status UNIT` is the main diagnostic. Its Loaded line shows the unit file path and whether the unit is enabled or disabled, for example `Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; ...)`. Its Active line shows the current state, such as `active (running)`, `inactive (dead)` or `failed`, with a timestamp. Below that you see the main PID (process ID), memory and CPU use, and the most recent journal lines for the unit, which usually explain a failure in plain words, such as a syntax error on a specific line of a configuration file. `systemctl --failed` lists every unit that failed.",
   "For quick checks and scripts, `systemctl is-active` and `systemctl is-enabled` print just one word and set a matching exit status, 0 when the answer is yes. Masking goes further than disabling. `systemctl mask UNIT` links the unit to `/dev/null`, so it cannot be started at all, not by hand and not as a dependency of another unit, until you run `systemctl unmask UNIT`. Use it when a service must never run, for example to keep a conflicting service from being pulled in. A masked unit shows `masked` in `is-enabled` and an error if you try to start it.",
   "`ss` (socket statistics) shows what the system is actually listening on, which proves the service is reachable at the network level and not just running. `ss -tlnp` means TCP (`-t`), listening sockets only (`-l`), numeric addresses and ports instead of names (`-n`), and the process owning each socket (`-p`, which needs root to show other users' processes). Add `-u` for UDP. A typical line reads `LISTEN 0 511 *:80 *:* users:((\"httpd\",pid=1234,fd=4))`. The Local Address column tells you where it listens: `0.0.0.0:22` or `[::]:22` means all IPv4 or IPv6 addresses, `*:80` means all addresses, while `127.0.0.1:631` means localhost only, reachable from no other machine. If the port you expect is missing entirely, the daemon is not listening there, whatever `status` says.",
   "If a service is running and listening but clients still cannot connect, check the next layers out. The firewall must allow the port or service (`firewall-cmd --list-all` shows what is open in the active zone), and SELinux (Security-Enhanced Linux) must allow the service to use a non-standard port; a web server moved to port 8080 or 82 needs that port labeled for it. If a service will not start at all, read `systemctl status` and `journalctl -u UNIT`, fix the configuration, and use the service's own syntax check if it has one, such as `sshd -t` for the SSH server or `apachectl configtest` for Apache.",
   "After changing a unit file itself, or adding a drop-in under `/etc/systemd/system/UNIT.d/`, run `systemctl daemon-reload` so systemd rereads its definitions before you restart the service. Editing the service's own configuration file, such as `/etc/httpd/conf/httpd.conf`, does not need daemon-reload; it needs a restart or reload of that service.",
   "A dependable routine closes every service task. Run `systemctl enable --now SERVICE`, then `systemctl is-enabled SERVICE` and `systemctl is-active SERVICE` to prove both states, then `ss -tlnp | grep PORT` to prove it is listening on the right address and port. If remote access matters, confirm the firewall too. That sequence takes under a minute and catches nearly every way a service task fails after a reboot."
  ],
  "analogy": "Think of a service as a coffee shop. `start` is unlocking the door and turning on the lights today. `enable` is putting the shop on the staff schedule so someone opens it every morning without being asked. `mask` is boarding the door up so nobody can open it at all. `ss -tlnp` is walking down the street to see which doors are actually open. The analogy stops at reload: a real shop cannot reread its menu without pausing service, but some daemons can reload configuration without dropping connections.",
  "terms": [
   [
    "Service unit",
    "A systemd unit (name.service) that describes how to run and manage a daemon."
   ],
   [
    "start vs enable",
    "start runs the service now; enable makes it start at boot. enable --now does both."
   ],
   [
    "systemctl status",
    "Shows a unit's load and enable state, active state, main PID and recent log lines."
   ],
   [
    "ss -tlnp",
    "Lists listening TCP sockets numerically with the owning process."
   ],
   [
    "mask",
    "Links a unit to /dev/null so it cannot be started, even as a dependency, until unmasked."
   ],
   [
    "daemon-reload",
    "Makes systemd reread unit files after you change or add them."
   ]
  ],
  "example": "You install httpd and run `systemctl enable --now httpd`. `systemctl status httpd` shows active (running) and enabled, and `ss -tlnp | grep ':80'` shows httpd listening on *:80. A test from another host still fails, so you run `firewall-cmd --list-all`, see that http is not allowed, add the http service permanently, reload the firewall, and the page loads.",
  "mistakes": [
   [
    "systemctl start makes the service come back after a reboot.",
    "start only affects the current boot. Without enable, the service is gone after a restart. Use systemctl enable --now for both."
   ],
   [
    "systemctl status says active (running), so clients can connect.",
    "Running is not the same as reachable. ss -tlnp may show it bound only to 127.0.0.1, and the firewall or SELinux port labels can still block access."
   ],
   [
    "disable and mask are the same thing.",
    "disable only removes the boot-time links; the unit can still be started by hand or as a dependency. mask links it to /dev/null so nothing can start it until unmask."
   ],
   [
    "You need daemon-reload after editing httpd.conf.",
    "daemon-reload is for unit files and drop-ins. A change to the service's own configuration file needs a restart or reload of that service."
   ]
  ],
  "tryit": [
   [
    "A task says the chronyd service must run and survive a reboot. You run `systemctl start chronyd` and `systemctl status chronyd` shows active (running). The Loaded line ends with 'disabled'. Is the task complete?",
    "No. disabled means it will not start at the next boot, and graders check after rebooting. Run systemctl enable chronyd (or enable --now), then confirm with systemctl is-enabled chronyd returning enabled."
   ],
   [
    "After moving sshd to listen on port 2222, `systemctl status sshd` shows failed, and the journal mentions it cannot bind to port 2222. ss shows nothing on 2222. What layer is the likely cause?",
    "SELinux is the likely cause: port 2222 is not labeled for SSH, so sshd is denied permission to bind. Label the port for ssh, then restart sshd and confirm with ss -tlnp. The firewall would block incoming clients, not the daemon's ability to bind."
   ]
  ],
  "tip": "A task that says the service must be running and persistent needs both start and enable: systemctl enable --now. Then prove it with systemctl is-enabled, is-active and ss -tlnp.",
  "check": [
   [
    "What is the difference between systemctl start and systemctl enable?",
    "start runs the service now; enable configures it to start automatically at boot."
   ],
   [
    "What do the letters in ss -tlnp mean?",
    "TCP, listening sockets, numeric output, and show the owning process."
   ],
   [
    "What does 127.0.0.1:25 in ss output tell you?",
    "The service listens only on the loopback interface, so remote hosts cannot connect."
   ],
   [
    "How do you make sure a service cannot be started at all, even as a dependency?",
    "systemctl mask UNIT; undo it with systemctl unmask UNIT."
   ]
  ]
 },
 {
  "t": "Securely transferring files between systems with scp, sftp and rsync over ssh",
  "hook": "It is Thursday evening at Bluewater Logistics, and Priya has been asked to copy the company's 40 GB web content directory to a standby server before Saturday's maintenance window. She starts a copy, it runs for twenty minutes, and then the VPN drops at 92 percent. Starting over means another twenty minutes, and tomorrow she will need to repeat the copy anyway to pick up the day's changes. Her colleague suggests just using FTP, but the security team banned unencrypted transfers last year. Priya already logs into both servers with SSH keys. Is there a tool that is encrypted, uses those same keys, and only sends what has actually changed?",
  "simple": "Administrators often need to move files from one Linux computer to another. Doing it over SSH, the same secure connection you use to log in remotely, means the files travel scrambled so nobody in the middle can read them, and you sign in with the same username, password or key you already have. RHEL gives you three tools for this. `scp` copies a file in one go, like photocopying a page and posting it. `sftp` opens an interactive session where you can look around the other computer and pick files, like browsing shelves in a library. `rsync` compares both sides and sends only what is new or changed, like a friend who updates your notebook by copying just the pages you missed instead of rewriting the whole thing.",
  "body": [
   "Administrators constantly move files between systems: configuration files, backups, logs for analysis, application content. Doing it over SSH (Secure Shell) means the transfer is encrypted and authenticated with the same accounts and keys you already use to log in, so no separate file-transfer service has to be installed, opened in the firewall or secured. RHEL provides three tools that do this, each suited to a different job: `scp` for quick copies, `sftp` for interactive browsing and `rsync` for efficient, repeatable synchronization.",
   "`scp` (secure copy) works like `cp`, except that either side can be a remote location written as `user@host:path`. `scp file.txt root@serverb:/tmp/` copies a local file to serverb, and `scp root@serverb:/etc/hosts .` copies a remote file to the current local directory. A path after the colon without a leading slash is relative to the remote user's home directory, so `scp notes.txt student@serverb:docs/` lands in `/home/student/docs/`. Useful options are `-r` to copy directories recursively, `-p` to preserve modification times and modes, and `-P` (capital) to set a non-default SSH port. That capital P is a classic trap, because `ssh` itself uses lowercase `-p` for the port. Current OpenSSH versions implement scp using the SFTP protocol underneath, but the command line you type is unchanged.",
   "`sftp` is interactive, like an old FTP (File Transfer Protocol) client, but it runs over SSH. `sftp user@host` opens a session with an `sftp>` prompt. There, `ls`, `cd` and `pwd` act on the remote side, while `lls`, `lcd` and `lpwd` (with a leading l for local) act on your own machine. `get FILE` downloads, `put FILE` uploads, `mkdir` creates a remote directory, and `exit` or `bye` quits. It is handy when you need to browse a remote directory before deciding what to transfer, or when a server allows file transfer but not a full shell.",
   "```bash\nscp -p /etc/chrony.conf root@serverb:/etc/\nscp -r root@serverb:/var/log/httpd ./serverb-logs\nsftp student@serverb\n  sftp> cd /tmp\n  sftp> put report.txt\n  sftp> get data.csv\nrsync -av /srv/web/ root@serverb:/srv/web/\nrsync -avn --delete /srv/web/ root@serverb:/srv/web/   # dry run\n```",
   "`rsync` synchronizes files efficiently. It compares source and destination, by default using file size and modification time, and sends only what changed, and for large files only the changed parts. The first run is a full copy, but repeated transfers are fast, and an interrupted transfer can simply be rerun to pick up where it effectively left off. Over the network it uses SSH by default, so `host:path` syntax works just as with scp. rsync must be installed on both machines, because a copy of rsync runs on the remote side to do the comparison.",
   "rsync's options are where the exam distinctions live. `-a` (archive) recurses into directories and preserves permissions, timestamps, symbolic links, owner and group (owner only when run as root on the receiving side), and device files. `-v` lists what is transferred. Archive mode does not include extended attributes or ACLs (access control lists), so add `-X` to carry extended attributes such as SELinux contexts and `-A` for ACLs when those matter. `--delete` removes files from the destination that no longer exist in the source, making the destination an exact mirror. Because that deletes data, run the command first with `-n` (dry run, also `--dry-run`), read the list of what would be deleted, and only then run it for real.",
   "The trailing slash on an rsync source changes the result, and it causes more confusion than any other rsync detail. `rsync -a /srv/web/ host:/backup/web/` copies the contents of web into the destination directory. `rsync -a /srv/web host:/backup/` creates `/backup/web` on the destination and copies into that. When results end up one directory too deep, for example `/backup/web/web/index.html`, a missing or extra slash is almost always why. A trailing slash on the destination makes no such difference.",
   "All three tools authenticate exactly as ssh does. If you have set up key-based login with `ssh-keygen` and `ssh-copy-id`, transfers run without password prompts, which is what lets you put them in scripts and scheduled jobs. A host key warning during a transfer means the same thing it does for ssh: the remote key changed, which may be a rebuilt server or something worse, so investigate before accepting it. Firewalls need only the SSH port open.",
   "Choosing between them is straightforward. Use scp for a quick one-off copy of a file or two. Use sftp when you need to browse and pick, or when the remote account is limited to file transfer. Use rsync for large trees, repeated transfers and backups, and whenever you want to preserve metadata carefully or mirror a directory. Whichever you use, verify the result on the destination with `ls -l` or a second rsync dry run, which should report nothing left to transfer."
  ],
  "analogy": "scp is like mailing a box: you pack everything and send it all, every time. rsync is like a moving crew that walks through both houses with a checklist and carries over only the items missing or changed at the new place. The analogy stops working at --delete: a moving crew would never throw away furniture at the new house just because it is not in the old one, but rsync with --delete does exactly that, which is why you rehearse with -n first.",
  "terms": [
   [
    "scp",
    "Secure copy: copies files to or from remote hosts over SSH using user@host:path syntax."
   ],
   [
    "sftp",
    "Interactive file transfer client over SSH with commands like get, put, ls and lcd."
   ],
   [
    "rsync",
    "Synchronizes files, transferring only differences, over SSH by default."
   ],
   [
    "rsync -a",
    "Archive mode: recursive, preserving permissions, times, links, and ownership where possible."
   ],
   [
    "--delete",
    "rsync option removing destination files that are absent from the source; test first with -n."
   ],
   [
    "rsync -n",
    "Dry run: shows what rsync would transfer or delete without changing anything."
   ]
  ],
  "example": "You need a nightly copy of /srv/web on serverb. The first `rsync -av /srv/web/ root@serverb:/srv/web/` takes several minutes, but the next run sends only the three files that changed and finishes in seconds. Adding --delete after a -n dry run, which lists two old files it would remove, keeps the copy an exact mirror.",
  "mistakes": [
   [
    "scp -p 2222 sets the port, just like ssh -p.",
    "For scp, lowercase -p preserves times and modes. The port option is capital -P. ssh uses lowercase -p for the port."
   ],
   [
    "rsync -a copies everything, including SELinux contexts and ACLs.",
    "Archive mode preserves permissions, times, links, owner and group, but not extended attributes or ACLs. Add -X for extended attributes (including SELinux contexts) and -A for ACLs."
   ],
   [
    "A trailing slash on the source does not matter.",
    "With a trailing slash rsync copies the directory's contents; without it, it copies the directory itself, creating one more level at the destination."
   ],
   [
    "In sftp, cd /tmp changes your local directory.",
    "cd, ls and pwd act on the remote side. The local versions start with l: lcd, lls, lpwd."
   ]
  ],
  "tryit": [
   [
    "You must keep /data on serverc as an exact mirror of /data on servera, including removing files deleted on servera. The directory is 30 GB and changes a little every day. Which tool and options do you choose, and what do you run first?",
    "rsync -av --delete /data/ root@serverc:/data/, because it sends only changes and --delete mirrors removals. Run it first with -n added to see what would be deleted, confirm nothing unexpected is in the list, then run it for real. Add -X and -A if extended attributes or ACLs must be preserved."
   ]
  ],
  "tip": "In rsync, a trailing slash on the source means 'the contents of this directory'; without it the directory itself is copied into the destination. scp uses -P for port, while ssh uses -p.",
  "check": [
   [
    "How do you copy /etc/hosts from serverb into the current local directory?",
    "scp user@serverb:/etc/hosts ."
   ],
   [
    "Why is rsync faster than scp for repeated backups?",
    "It transfers only files, and parts of files, that changed since the last run."
   ],
   [
    "In sftp, what is the difference between cd and lcd?",
    "cd changes the remote directory; lcd changes the local directory."
   ],
   [
    "Which rsync option lets you preview a --delete run safely?",
    "-n (--dry-run), which lists what would happen without making changes."
   ]
  ]
 },
 {
  "t": "Listing disks and partitions with lsblk, blkid and fdisk -l",
  "hook": "At Northgate Community College, Marcus is asked to add a new data disk to the student records server. The virtualization team says they attached a 20 GB disk, but they did not say what it is called. The server already has three disks, one holding the operating system and two holding a database that must not be touched. Marcus has the partitioning tool open and his cursor is blinking at the device name prompt. If he types `/dev/vdb` and he is wrong, years of records could disappear in a keystroke. How does he find out, with certainty and without changing anything, which disk is the new, empty one?",
  "simple": "Before you change anything on a disk, you need to look at what is already there, the way you would check the labels on moving boxes before throwing one away. Linux gives every disk a name such as `/dev/sda` or `/dev/vdb`, and every slice of a disk (a partition) gets that name plus a number, like `/dev/vdb1`. Three read-only commands help you look without touching anything. `lsblk` draws a family tree of disks and their slices and shows where each is in use. `blkid` reads the label stuck on each slice: what kind of file system it holds and its unique ID number. `fdisk -l` shows how each disk is divided up. Running them first is how you avoid erasing the wrong disk.",
  "body": [
   "Before you partition, format or mount anything, you must know exactly which disks exist, how they are divided and what is already in use. Picking the wrong device is the most destructive mistake possible on the exam, and in production, because partitioning and formatting tools do exactly what you tell them. The listing commands in this lesson only read information and change nothing, so they are safe to run as often as you like, and they should be the first thing you type in any storage task.",
   "Linux names block devices after the driver that handles them. SATA, SAS and USB disks appear as `/dev/sda`, `/dev/sdb` and so on. Virtual machines often use virtio disks named `/dev/vda`, `/dev/vdb`, which is what you will typically see in a lab or exam environment. NVMe (Non-Volatile Memory Express) drives appear as `/dev/nvme0n1`, where the first number is the controller and `n1` is the namespace. Partitions add a number: `/dev/vdb1`, `/dev/sda2`, or `/dev/nvme0n1p1` for NVMe, where a `p` separates the partition number from the device name. LVM (Logical Volume Manager) logical volumes appear as `/dev/mapper/vg-lv` and as the symbolic link `/dev/vg/lv`.",
   "`lsblk` (list block devices) shows every disk, partition and logical volume as a tree, with columns for NAME, MAJ:MIN (kernel device numbers), RM (removable), SIZE, RO (read-only), TYPE (disk, part, lvm, rom) and mount points. The tree shows relationships directly: a partition appears indented under its disk, and a logical volume under the partition used as its physical volume. A disk with no children and no mount point is the classic sign of the new, empty disk a task refers to. `lsblk -f` swaps in file system columns, showing FSTYPE, LABEL, UUID (universally unique identifier) and how full each mounted file system is, while `lsblk -p` prints full device paths, which is handy for copying.",
   "```bash\nlsblk\nlsblk -f\nblkid\nblkid /dev/vdb1\nfdisk -l /dev/vdb\nparted /dev/vdb print\ncat /proc/partitions\n```",
   "`blkid` prints the attributes of devices that contain a recognized signature: the UUID, the file system TYPE (`xfs`, `ext4`, `swap`, `LVM2_member` for an LVM physical volume), the LABEL if one was set and, for GPT partitions, the PARTUUID, which identifies the partition itself rather than its contents. A typical line looks like `/dev/vdb1: UUID=\"5c1e...\" TYPE=\"xfs\" PARTUUID=\"...\"`. Its main exam use is getting the UUID to put in `/etc/fstab`. A device that produces no output from blkid has no recognized file system or signature yet, which is another strong hint that it is unused. Run it as root for complete, current results, because an unprivileged run may show cached or partial information.",
   "`fdisk -l` lists the partition table of every disk, or only the one you name, without entering the interactive editor. For each disk it shows the size in bytes and sectors, the sector size, and the `Disklabel type`, which is `dos` for the older MBR (Master Boot Record) scheme or `gpt` for the GUID Partition Table. It then lists each partition's device name, start and end sector, number of sectors, size and type, such as Linux filesystem, Linux LVM or Linux swap. A disk with no partition table produces just the size lines and no partition list. `parted DEVICE print` gives similar information, labels the scheme as `Partition Table: gpt` or `msdos`, and with `parted DEVICE print free` shows unallocated gaps explicitly. `cat /proc/partitions` is the kernel's own minimal list of devices and sizes.",
   "Each tool answers a slightly different question, so they work best together. Which disk is new or has free space? Use `lsblk` and `fdisk -l` or `parted print free`. Which partition table and partition types does it have? Use `fdisk -l`. What is on each device, and what is its UUID? Use `lsblk -f` or `blkid`. Where is it mounted? Use `lsblk` or `findmnt`. For LVM, `pvs` adds which partitions are already physical volumes, and `swapon --show` shows which are active swap.",
   "A dependable habit is to run `lsblk` before and after every storage change. Before, it confirms you have the right device name and that it is not mounted or part of a volume group. After, it confirms the kernel sees the result: a new partition under the disk, a new logical volume, or a new mount point. If the 'after' view does not show what you expect, stop and investigate before formatting anything. Comparing sizes is also a good cross-check, because the disk a task describes as 5 GiB should show as about 5G in lsblk, and that alone often identifies it."
  ],
  "analogy": "Reading storage is like walking into an unfamiliar warehouse. lsblk is the floor plan showing which shelves exist and which boxes sit on them. blkid reads the shipping label on each box: what is inside and its tracking number, the UUID. fdisk -l is the shelving diagram showing how each shelf is divided. The analogy stops working with device names: a warehouse shelf number never changes, but /dev/vdb can become /dev/vdc after disks are added, which is why the tracking number matters for fstab.",
  "terms": [
   [
    "Block device",
    "A storage device such as a disk or partition accessed in blocks, found under /dev."
   ],
   [
    "lsblk",
    "Lists block devices as a tree with size, type and mount point; -f adds file system details."
   ],
   [
    "blkid",
    "Shows UUID, file system type and label of devices with recognized signatures."
   ],
   [
    "fdisk -l",
    "Lists partition tables, showing table type (dos or gpt) and each partition's size and type."
   ],
   [
    "UUID",
    "Universally unique identifier assigned to a file system or other signature, stable across device renaming."
   ],
   [
    "Disklabel type",
    "fdisk's name for the partition table scheme: dos for MBR or gpt for GPT."
   ]
  ],
  "example": "A task says to create a swap partition on the second disk. `lsblk` shows /dev/vda with the system partitions and an unused 5G /dev/vdb with no children and no mount point. `blkid /dev/vdb` prints nothing, and `fdisk -l /dev/vdb` confirms a gpt label with no partitions, so you know exactly which device to work on.",
  "mistakes": [
   [
    "The second disk is always /dev/sdb.",
    "Names depend on the driver: virtual disks are often /dev/vda, /dev/vdb, and NVMe drives are /dev/nvme0n1. Always check with lsblk instead of assuming."
   ],
   [
    "NVMe partition one is /dev/nvme0n11.",
    "NVMe partitions insert a p before the partition number: /dev/nvme0n1p1."
   ],
   [
    "blkid shows nothing for a disk, so the command failed.",
    "No output means the device has no recognized signature or file system yet. That is useful information: it is probably unused."
   ],
   [
    "fdisk -l opens the disk for editing and is risky.",
    "fdisk -l only lists partition tables and exits. The interactive editor is fdisk without -l, and even then nothing changes until you write with w."
   ]
  ],
  "tryit": [
   [
    "A task says: create a 1 GiB partition on the 10 GiB disk. lsblk shows vda (20G) with three partitions mounted at /boot, / and [SWAP], vdb (10G) with one partition vdb1 used as an LVM physical volume, and vdc (10G) with no children. Which disk do you use, and how do you double-check?",
    "vdc is the safer choice because it is 10 GiB and completely unused; vdb is also 10 GiB but already holds an LVM physical volume. Confirm with fdisk -l /dev/vdc (no partitions) and blkid /dev/vdc (no output). If the task text names a disk explicitly, follow it, but verify it has free space with parted print free."
   ]
  ],
  "tip": "Run lsblk before touching any disk to be sure you have the right device name, and use blkid (or lsblk -f) to get the UUID for /etc/fstab. NVMe partitions include a p: nvme0n1p1.",
  "check": [
   [
    "Which command shows disks, partitions and logical volumes as a tree with mount points?",
    "lsblk."
   ],
   [
    "How do you get the UUID of /dev/vdb1?",
    "blkid /dev/vdb1 (or lsblk -f /dev/vdb1)."
   ],
   [
    "How can you tell whether a disk uses MBR or GPT?",
    "fdisk -l shows Disklabel type dos (MBR) or gpt; parted print shows the Partition Table."
   ],
   [
    "What TYPE does blkid report for an LVM physical volume?",
    "LVM2_member."
   ]
  ]
 },
 {
  "t": "Creating and deleting GPT partitions with parted, gdisk or fdisk; setting the partition type (lvm, swap)",
  "hook": "At Riverside Dental Group, Tomas has a ticket that sounds simple: carve two partitions out of a new 10 GB disk on the imaging server, one for LVM and one for swap, using GPT. He opens fdisk, creates both partitions, and moves on to the next ticket. An hour later the storage script fails because the first partition is typed as a plain Linux filesystem, and the swap partition does not exist at all according to `lsblk`. Tomas checks his terminal history and sees that he typed `q` at the end instead of `w`. What did fdisk actually keep, and how should he have set those partition types?",
  "simple": "A disk starts as one big empty space. Partitioning divides it into separate sections, like putting dividers in a drawer so socks and shirts stay apart. Each section can then hold something different: files, extra memory space (swap), or space for the flexible storage system called LVM. The list that records where each section starts and ends is the partition table, and the modern kind is called GPT. You can make sections with three tools: `fdisk`, `gdisk` or `parted`. You also give each section a type, a label that says what it is for, like writing 'socks' on a divider. One important difference: fdisk and gdisk only save when you tell them to, while parted saves every change immediately.",
  "body": [
   "Partitioning divides a disk into independent sections that can each hold a file system, swap space or an LVM (Logical Volume Manager) physical volume. RHEL supports two partition table schemes. The older MBR (Master Boot Record, shown by tools as `dos` or `msdos`) allows only four primary partitions, or three plus an extended partition holding logical ones, and supports disks up to 2 TiB. GPT (GUID Partition Table, where GUID means globally unique identifier) allows many partitions, 128 by default, supports very large disks, stores a backup copy of the table at the end of the disk, and is the norm on modern and UEFI (Unified Extensible Firmware Interface) systems. Exam tasks may ask for GPT specifically, so check the table type with `fdisk -l` or `parted print` before you begin.",
   "Three tools can do the job, and you only need to be fluent in one. `fdisk` is interactive and handles both MBR and GPT. `gdisk` is an fdisk-like tool for GPT only, with type codes in hexadecimal. `parted` works interactively or with complete commands on one line, which suits scripts and lets you see the result immediately. The most important behavioral difference is when changes reach the disk: fdisk and gdisk hold everything in memory until you write it with `w`, so `q` quits and discards all your work, while parted applies each command the moment you run it, with no undo.",
   "```text\nfdisk /dev/vdb\n  g            create a new empty GPT table (only on an empty disk)\n  n            new partition: accept number and first sector,\n               last sector +1G for a 1 GiB partition\n  t            change type: enter lvm, swap or linux (L lists aliases)\n  p            print the table to check\n  w            write and exit (q quits without saving)\n```",
   "In fdisk, the `n` command asks for a partition number, a first sector and a last sector. Accepting the defaults for the number and first sector places the partition at the start of the free space, and answering the last-sector prompt with `+1G` or `+500M` creates a partition of that size without any arithmetic. Then `t` changes the type: on a GPT disk, fdisk accepts aliases such as `lvm`, `swap` and `linux`, and `L` lists the available types. `p` prints the table so you can check sizes and types before writing. If the disk previously held a signature, fdisk may ask whether to remove it; read the question rather than answering by reflex.",
   "With parted, the same work takes three kinds of commands. `parted /dev/vdb mklabel gpt` creates the table. `parted /dev/vdb mkpart data xfs 1MiB 1025MiB` creates a partition, where for GPT the first argument is a partition name and the file system word is only a type hint; parted does not create a file system. `parted /dev/vdb set 1 lvm on` or `parted /dev/vdb set 2 swap on` sets the type flag for partition 1 or 2. `parted /dev/vdb print` shows the result, and `parted /dev/vdb rm 1` deletes partition 1. Starting the first partition at 1MiB keeps partitions aligned to the disk's physical boundaries for performance, and parted may warn if you choose a misaligned start.",
   "In gdisk, `n` also creates partitions with the same `+SIZE` shortcut, and the type is given as a four-digit hexadecimal code: `8300` Linux filesystem (the default), `8e00` Linux LVM and `8200` Linux swap. `l` lists every code, `p` prints and `w` writes, with a final confirmation. Setting the right type is required when a task says so, and it documents the partition's purpose for tools and administrators, even though the kernel will let you put any content on a partition of any type. You can verify the type afterward in the Type column of `fdisk -l`.",
   "Deleting is `d` in fdisk or gdisk, followed by the partition number, and `rm NUMBER` in parted. Deleting a partition removes access to its data, so first make sure it is unmounted, not active as swap (`swapoff`), and not a physical volume in a volume group; remove any matching line from `/etc/fstab` as well, or the next boot will try to mount a device that no longer exists.",
   "After writing, run `lsblk` to confirm the kernel sees the new partitions. If the disk had other partitions in use and the kernel could not reread the table, fdisk prints a warning about the kernel still using the old table. Run `partprobe /dev/vdb` or `udevadm settle` and check `lsblk` again. Finally, the biggest danger: never create a new partition table (`g` or `o` in fdisk, `o` in gdisk, `mklabel` in parted) on a disk that already holds data you need. It replaces the table with an empty one and effectively wipes every existing partition."
  ],
  "analogy": "fdisk and gdisk are like drafting a seating chart in pencil: you can rearrange it as much as you like, and nothing happens until you hand it to the host with w. Quitting with q tears up the draft. parted is like telling guests where to sit as you go: each instruction takes effect immediately. Creating a new label is like clearing every seat in the room. The analogy stops at type codes: a seat label changes nothing about who can sit there, and similarly the kernel ignores types, but exam graders and tools do check them.",
  "terms": [
   [
    "GPT",
    "GUID Partition Table: modern scheme supporting many partitions and very large disks, with a backup table."
   ],
   [
    "MBR (dos)",
    "Older partition scheme limited to four primary partitions and 2 TiB disks."
   ],
   [
    "Partition type",
    "Identifier describing a partition's purpose, such as Linux LVM (8e00) or Linux swap (8200)."
   ],
   [
    "mklabel",
    "parted command that creates a new, empty partition table (msdos or gpt)."
   ],
   [
    "partprobe",
    "Asks the kernel to reread a disk's partition table after changes."
   ],
   [
    "+SIZE",
    "Answer to the last-sector prompt in fdisk or gdisk that sizes a partition directly, such as +1G."
   ]
  ],
  "example": "You need a 2 GiB LVM partition on the empty disk /dev/vdc. You run `parted /dev/vdc mklabel gpt`, `parted /dev/vdc mkpart lvmpart 1MiB 2049MiB`, `parted /dev/vdc set 1 lvm on`, then `lsblk /dev/vdc` shows vdc1 at 2G and `fdisk -l /dev/vdc` shows its type as Linux LVM.",
  "mistakes": [
   [
    "Quitting fdisk with q saves the partitions you created.",
    "q quits without writing anything. fdisk and gdisk keep changes in memory until w. parted is the tool that applies each change immediately."
   ],
   [
    "parted mkpart data xfs ... creates an XFS file system.",
    "The file system word is only a type hint. You still run mkfs.xfs on the new partition afterward."
   ],
   [
    "Creating a new GPT label is a safe first step on any disk.",
    "On a disk with data, g, o or mklabel discards the existing partition table, effectively wiping all partitions. Use it only on an empty disk."
   ],
   [
    "The partition type controls what the kernel allows on the partition.",
    "The kernel ignores the type; it is metadata for tools and administrators. Set it anyway when a task asks, because graders check it."
   ]
  ],
  "tryit": [
   [
    "A task asks for a 512 MiB swap partition on /dev/vdb, which already has a GPT table and one 1 GiB partition holding data. Using fdisk, what sequence do you type, and what must you avoid?",
    "Run fdisk /dev/vdb, then n, accept the default number and first sector, enter +512M, then t, choose the new partition number and type swap, p to check, w to write. Avoid g, which would create a new empty table and wipe the existing partition. Then confirm with lsblk, and run partprobe if the kernel did not pick up the change."
   ]
  ],
  "tip": "fdisk and gdisk change nothing until you press w; parted applies each command immediately. Creating a new label (g, o, mklabel) on a disk with data wipes its partitions.",
  "check": [
   [
    "What is the gdisk type code for a Linux LVM partition?",
    "8e00 (8200 is Linux swap, 8300 Linux filesystem)."
   ],
   [
    "How do you mark partition 1 as LVM with parted?",
    "parted /dev/DISK set 1 lvm on."
   ],
   [
    "Why use +1G at the last-sector prompt in fdisk?",
    "It creates a partition 1 GiB in size starting at the chosen first sector, without calculating sectors by hand."
   ],
   [
    "What should you run if lsblk does not show a partition you just wrote?",
    "partprobe /dev/DISK (or udevadm settle), then check lsblk again."
   ]
  ]
 },
 {
  "t": "Creating and removing physical volumes (pvcreate, pvremove, pvs)",
  "hook": "At Summit Ridge Credit Union, the loan application server is running out of room every quarter, and every quarter someone repartitions a disk on a Saturday night. Jae, the new administrator, proposes LVM so storage can grow without downtime. Her manager agrees but asks a sharp question: what is the first command, and how do we make sure it lands on the new disk and not the one holding last year's loan files? Jae knows the first layer of LVM is the physical volume. She also knows that the same command, pointed at the wrong device, would overwrite the start of that disk. What does pvcreate actually do, and how does she prove she picked the right device?",
  "simple": "LVM (Logical Volume Manager) is a way to treat several disks as one big, flexible pool of storage, like pouring several jugs of water into one tank so you can fill bottles of any size from it. Before a disk or partition can be poured into the tank, it has to be marked as LVM storage. That marking step is called creating a physical volume, done with `pvcreate`. It writes a small label at the start of the device saying 'this belongs to LVM'. `pvs` lists the marked devices and how much space each has, and `pvremove` erases the label when you want the device back for something else. It is like putting a 'reserved for the pool' sticker on a jug.",
  "body": [
   "LVM (Logical Volume Manager) adds a flexible layer between disks and file systems. Instead of formatting a partition directly, you pool storage from one or more devices and carve volumes out of the pool, which can later be grown, moved between disks or spread across several of them without repartitioning. LVM has three layers: physical volumes (PVs) at the bottom, volume groups (VGs) that pool them, and logical volumes (LVs) that you format and mount. This lesson covers the first layer, which is also where most of the risk lies, because it is the step that touches raw devices.",
   "A physical volume is a block device that has been initialized for LVM use. It can be a whole disk such as `/dev/vdb`, a partition such as `/dev/vdb1` (ideally with its partition type set to Linux LVM so its purpose is obvious), or other block devices such as a software RAID (redundant array of independent disks) array. Initializing writes a small LVM label and a metadata area near the start of the device. The label identifies the device as an LVM physical volume, and the metadata later records which volume group it belongs to and how its space is allocated. A PV's space is divided into physical extents, the fixed-size units that a volume group hands out to logical volumes; the extent size is decided when the device joins a volume group, not by pvcreate.",
   "```bash\nlsblk /dev/vdb                  # confirm the right, unused device\npvcreate /dev/vdb1 /dev/vdc1    # initialize two partitions\npvs                             # brief list\npvdisplay /dev/vdb1             # detailed view\npvremove /dev/vdc1              # wipe the LVM label\n```",
   "`pvcreate DEVICE...` initializes one or more devices in a single command and reports success for each, for example `Physical volume \"/dev/vdb1\" successfully created.` If the device already contains a file system or another signature, pvcreate warns and asks whether to wipe it. Treat that prompt as your last chance to notice you picked the wrong device; answering y destroys access to whatever was there. The device must not be mounted, active as swap or otherwise in use, and if it is, pvcreate refuses. Running `lsblk` and `blkid` on the device first, and expecting no children, no mount point and no signature, is the habit that prevents disasters.",
   "`pvs` gives a one-line summary per PV with the columns PV (device name), VG (the volume group it belongs to, empty if none yet), Fmt (format, `lvm2`), Attr (attributes), PSize (total size) and PFree (free space). A freshly created PV has an empty VG column and a PFree equal to its PSize. `pvdisplay` shows more detail in a labeled block, including the PV UUID and, once the PV belongs to a VG, the PE Size and the Total PE, Free PE and Allocated PE counts. `lsblk -f` and `blkid` also recognize PVs, showing them with the type `LVM2_member`, which is a quick way to spot them among ordinary partitions.",
   "`pvremove DEVICE` erases the LVM label so the device is no longer a PV and can be reused for something else, such as a plain file system or swap. It only works if the PV does not belong to a volume group; otherwise LVM refuses and tells you which group still uses it. To free a PV that is in a group, you first take it out with `vgreduce VG DEVICE`. If it still holds allocated extents, migrate them to other PVs in the same group with `pvmove DEVICE` before reducing, provided the group has enough free space elsewhere. Alternatively, remove the whole volume group if you are dismantling everything.",
   "The logical order for dismantling is always top down, the reverse of building. Unmount the file systems and remove their `/etc/fstab` lines, remove the logical volumes with `lvremove`, then remove or reduce the volume group with `vgremove` or `vgreduce`, then remove the PV label with `pvremove`, and finally delete the partition if you want the raw space back. Building is bottom up: partition (optional), `pvcreate`, `vgcreate`, `lvcreate`, `mkfs`, then mount and add to fstab. Keeping that order straight answers many exam questions about what must happen before a given command will succeed.",
   "Initializing a PV is not recorded in `/etc/fstab` or in any configuration file you edit. The label on the device itself is what LVM scans for at boot, so once pvcreate succeeds there is nothing else to configure for the PV to survive a reboot. That is also why a stray PV label on a reused disk can surprise you later, and why pvremove, rather than simply repartitioning, is the clean way to retire one."
  ],
  "analogy": "Creating a physical volume is like putting a 'property of the shared pantry' sticker on a cupboard. The cupboard is unchanged, but everyone now knows it belongs to the pantry system, which decides later how its shelves are used. Peeling the sticker off (pvremove) is only allowed once the pantry has emptied that cupboard (vgreduce). The analogy stops working in one respect: a sticker does not damage what is inside the cupboard, but pvcreate on a device that holds data does overwrite part of it.",
  "terms": [
   [
    "LVM",
    "Logical Volume Manager: pools block devices into volume groups and allocates flexible logical volumes."
   ],
   [
    "Physical volume (PV)",
    "A disk or partition initialized with an LVM label so it can join a volume group."
   ],
   [
    "pvcreate",
    "Initializes devices as physical volumes."
   ],
   [
    "pvs / pvdisplay",
    "Show physical volumes in brief (pvs) or detailed (pvdisplay) form."
   ],
   [
    "pvremove",
    "Removes the LVM label from a device that is not in any volume group."
   ],
   [
    "pvmove",
    "Migrates allocated extents from one PV to others in the same volume group."
   ]
  ],
  "example": "To prepare storage for a new volume group, you create /dev/vdb1 with type Linux LVM, confirm with `blkid /dev/vdb1` that it has no signature, then run `pvcreate /dev/vdb1`. `pvs` shows /dev/vdb1 with a size of about 2g, an empty VG column and PFree equal to its size, ready for vgcreate.",
  "mistakes": [
   [
    "pvcreate sets the physical extent size.",
    "The extent size belongs to the volume group and is set with vgcreate -s. pvcreate only writes the label and metadata area."
   ],
   [
    "pvremove works on any PV.",
    "pvremove refuses while the PV belongs to a volume group. vgreduce it out first (after pvmove if it holds data), or remove the VG."
   ],
   [
    "You must add the PV to /etc/fstab or a config file so it persists.",
    "The LVM label on the device is found by scanning at boot. Nothing else needs configuring for a PV to persist."
   ],
   [
    "Only partitions can be physical volumes.",
    "Whole disks work too, as do other block devices such as RAID arrays. A partition with type Linux LVM simply documents the purpose."
   ]
  ],
  "tryit": [
   [
    "You want to reuse /dev/vdc1 for a plain XFS file system. pvs shows /dev/vdc1 in VG datavg with PSize 2g and PFree 1.5g, and datavg also contains /dev/vdb1 with 3g free. What steps free /dev/vdc1 safely?",
    "Some extents on vdc1 are allocated (2g size, 1.5g free), so run pvmove /dev/vdc1 to migrate them to vdb1, which has enough free space. Then vgreduce datavg /dev/vdc1, then pvremove /dev/vdc1. Only then run mkfs.xfs on it."
   ]
  ],
  "tip": "Build LVM bottom up (partition, pvcreate, vgcreate, lvcreate, mkfs, mount) and dismantle it top down. pvremove fails while a PV still belongs to a volume group.",
  "check": [
   [
    "What must happen before you can pvremove a PV that is part of a VG?",
    "It must be removed from the VG with vgreduce (after moving data off with pvmove if needed), or the VG removed."
   ],
   [
    "Which column in pvs shows whether a PV belongs to a volume group?",
    "The VG column; it is empty for an unassigned PV."
   ],
   [
    "Can a whole disk without partitions be a physical volume?",
    "Yes, pvcreate works on whole disks as well as partitions."
   ],
   [
    "How does blkid identify a physical volume?",
    "With TYPE=\"LVM2_member\"."
   ]
  ]
 },
 {
  "t": "Creating volume groups and assigning physical volumes (vgcreate -s, vgextend, vgs)",
  "hook": "At Oakmont Engineering, Dana is working through a practice exam the night before her RHCSA. The task reads: create a volume group named projects with a physical extent size of 16 MiB, then create a logical volume of 40 extents. She creates the volume group, then the logical volume, and checks the size: 160 MiB. The answer key expects 640 MiB. She looks back at her history and sees `vgcreate projects /dev/vdb1`, with no extent size at all. Fixing it now means tearing down what she built. Where in the process did that one missing option matter, and how could she have caught it in seconds?",
  "simple": "In LVM, a volume group is the shared storage tank that you fill from one or more disks (the physical volumes) and then draw from to make volumes of any size. Inside the tank, space is measured in fixed-size scoops called extents. Every volume you make is a whole number of scoops. By default each scoop is 4 MiB, but you can choose a different scoop size when you create the tank, and only then. `vgcreate` builds the tank, `vgextend` pours another disk into it when it runs low, and `vgs` shows how big it is and how much is left. It is like deciding whether to sell rice by the cup or by the bucket before the shop opens.",
  "body": [
   "A volume group (VG) is the storage pool in LVM (Logical Volume Manager). It combines the space of one or more physical volumes into a single pool, from which you allocate logical volumes. Because a logical volume draws from the pool rather than from a single disk, it can be larger than any one device, and you can grow the pool later simply by adding another physical volume. The VG is also where an important exam detail lives: the physical extent size, which determines how logical volume sizes given in extents translate into real space.",
   "`vgcreate NAME PV...` creates a volume group from one or more physical volumes, for example `vgcreate datavg /dev/vdb1 /dev/vdc1`. If a device you list is not yet a PV, current versions of LVM initialize it automatically, but running `pvcreate` first is clearer and gives you a chance to check the device. The name you choose becomes part of the device paths for its logical volumes, `/dev/NAME/LVNAME` and `/dev/mapper/NAME-LVNAME`, so exam tasks always specify it, and you must use it exactly, including case. A typo here propagates into every path and fstab entry that follows.",
   "The space in a VG is divided into physical extents (PEs), fixed-size units. Every logical volume is made of a whole number of extents, so the extent size is the granularity of allocation. The default extent size is 4 MiB. `vgcreate -s SIZE` sets a different size at creation, for example `-s 16M` for 16 MiB extents; it is normally a power of two. Exam tasks often specify the extent size and then ask for a logical volume measured in extents, so getting `-s` right at the start matters: with 16 MiB extents, 40 extents is 640 MiB, but with the default 4 MiB it is only 160 MiB. The extent size is chosen when the VG is created and is not something you would normally change afterward, so read the whole task before you type vgcreate.",
   "```bash\nvgcreate -s 16M datavg /dev/vdb1\nvgs                          # summary\nvgdisplay datavg             # PE Size, Total PE, Free PE\npvcreate /dev/vdc1\nvgextend datavg /dev/vdc1    # add space to the pool\nvgs datavg\nvgreduce datavg /dev/vdc1    # remove an unused PV\nvgremove datavg              # delete the VG (after removing its LVs)\n```",
   "`vgs` lists volume groups with the columns VG (name), #PV (number of physical volumes), #LV (number of logical volumes), #SN (snapshots), Attr (attributes), VSize (total size) and VFree (free space). It is the quickest way to answer 'is there room for another logical volume?'. `vgdisplay NAME` shows much more in a labeled block, including `PE Size`, `Total PE`, `Alloc PE / Size` and `Free PE / Size`. Those lines tell you how many extents are available, which you need when a task asks for a volume of a given number of extents or for all remaining space. Running `vgdisplay datavg | grep 'PE Size'` immediately after creation is the seconds-long check that confirms the extent size is what the task asked for.",
   "`vgextend VG PV` adds a physical volume to an existing group. Its extents become free space in the VG immediately, without affecting existing logical volumes or requiring anything to be unmounted. This is the standard first step when a logical volume needs to grow but the VG is full: add a disk or partition, `pvcreate` it, `vgextend` the group, and then extend the LV. You can extend with several PVs at once by listing them all.",
   "The reverse operations follow the same top-down logic as the rest of LVM. `vgreduce VG PV` removes a PV that holds no allocated extents; if it does hold data, `pvmove PV` can first migrate its extents to other PVs in the group, as long as they have enough free space. `vgremove VG` deletes a whole group, and it asks for confirmation for each logical volume still in it; the safer practice is to unmount and remove the logical volumes yourself first so nothing in use is destroyed by surprise. After vgremove, the devices remain PVs until you run pvremove.",
   "As with PVs, a VG needs no configuration file to persist. Its metadata, including its name, extent size, member PVs and the layout of its logical volumes, is stored on each of its physical volumes and is found automatically at boot. The only files you edit for LVM storage are the ones for what sits on top: `/etc/fstab` for mounting the file systems on its logical volumes."
  ],
  "analogy": "A volume group is like a bulk food store that pours supplies from several delivery trucks (physical volumes) into one set of bins. Customers (logical volumes) buy in whole scoops, and the store decides the scoop size (the extent size) when it opens. Another truck can arrive any time and top up the bins (vgextend). The analogy stops at changing the scoop: a real store could buy new scoops tomorrow, but you should treat the extent size as fixed once the VG exists.",
  "terms": [
   [
    "Volume group (VG)",
    "An LVM storage pool made from one or more physical volumes."
   ],
   [
    "Physical extent (PE)",
    "The fixed-size allocation unit of a volume group; 4 MiB by default."
   ],
   [
    "vgcreate -s",
    "Creates a volume group with a specified physical extent size."
   ],
   [
    "vgextend",
    "Adds physical volumes to an existing volume group to increase its capacity."
   ],
   [
    "vgdisplay",
    "Shows detailed volume group information including PE size and free extents."
   ],
   [
    "vgs",
    "One-line summary per VG with #PV, #LV, VSize and VFree."
   ]
  ],
  "example": "A task asks for a volume group named research with 8 MiB extents on /dev/vdb2. You run `pvcreate /dev/vdb2` and `vgcreate -s 8M research /dev/vdb2`, and `vgdisplay research | grep 'PE Size'` confirms 8.00 MiB. Later, when the VG fills up, you add /dev/vdc1 with `vgextend research /dev/vdc1` and `vgs research` shows the larger VFree.",
  "mistakes": [
   [
    "You can set the extent size later when you create the logical volume.",
    "The extent size belongs to the VG and is set with vgcreate -s at creation. lvcreate uses whatever the VG already has."
   ],
   [
    "The default extent size is 1 MiB or 16 MiB.",
    "The default is 4 MiB. Check vgdisplay PE Size rather than assuming, especially if the task specified a size."
   ],
   [
    "Adding a PV with vgextend makes existing logical volumes bigger.",
    "vgextend only increases free space in the VG. You must extend the logical volume (and its file system) separately."
   ],
   [
    "vgreduce can remove any PV from a VG.",
    "vgreduce only removes a PV with no allocated extents. Move data off first with pvmove, which needs enough free space on the other PVs."
   ]
  ],
  "tryit": [
   [
    "A task says: create VG appvg with 32 MiB extents using /dev/vdb1 and /dev/vdc1, then an LV of 20 extents. Neither device is a PV yet. What commands do you run, and how big will the LV be?",
    "pvcreate /dev/vdb1 /dev/vdc1, then vgcreate -s 32M appvg /dev/vdb1 /dev/vdc1, then check vgdisplay appvg for PE Size 32.00 MiB. An LV created with -l 20 will be 20 x 32 MiB = 640 MiB."
   ]
  ],
  "tip": "Read the task for an extent size: vgcreate -s must be set at creation. Later, an LV of -l 50 in a VG with 16 MiB extents is 800 MiB, not 200 MiB.",
  "check": [
   [
    "What is the default physical extent size?",
    "4 MiB."
   ],
   [
    "How do you add /dev/vdd1 to the existing VG datavg?",
    "pvcreate /dev/vdd1 (if needed), then vgextend datavg /dev/vdd1."
   ],
   [
    "Where can you see how many free extents a VG has?",
    "vgdisplay (Free PE / Size line), or vgs -o +vg_free_count."
   ],
   [
    "Which device paths will an LV named web in VG datavg have?",
    "/dev/datavg/web and /dev/mapper/datavg-web."
   ]
  ]
 },
 {
  "t": "Creating and deleting logical volumes by size (-L) or extent count (-l) (lvcreate, lvremove, lvs)",
  "hook": "It is the second hour of a practice exam at the Westfield Tech training center. Kofi reads task nine: create a logical volume named logs with 60 extents in volume group sysvg, format it as XFS and mount it at /logs. He types `lvcreate -n logs -L 60 sysvg`, formats it, mounts it, and moves on feeling good. When the instructor grades the lab, the volume is 60 MiB instead of the expected 960 MiB, and the task fails. One letter was the wrong case. What is the difference between those two options, and how would Kofi have noticed before moving on?",
  "simple": "A logical volume is the piece of storage you actually use. You cut it from the shared storage pool (the volume group), then put files on it, just like a normal disk partition. The difference is that it is much easier to resize later. When you create one with `lvcreate`, you say how big it should be in one of two ways. A capital `-L` means 'this many megabytes or gigabytes', like ordering 2 liters of juice. A small `-l` means 'this many scoops', where the scoop size depends on the pool, like ordering 3 cups without knowing how big the cups are. `lvs` lists your volumes, and `lvremove` deletes one, along with everything stored on it.",
  "body": [
   "Logical volumes (LVs) are the top layer of LVM (Logical Volume Manager) and the part you actually use: you put a file system or swap on an LV and mount it, just as you would a partition. The difference is flexibility. An LV is allocated from a volume group's pool of extents, can span several disks without you noticing, and can be extended later without repartitioning anything. On the exam, LV tasks come with very specific names and sizes, and the grader checks both.",
   "`lvcreate` makes a logical volume. `-n` gives it a name, and the last argument is the volume group it comes from. You specify the size in one of two ways, and exam tasks test both. `-L` (capital) takes a size with units: `-L 500M`, `-L 2G`. `-l` (lowercase) takes a number of extents: `-l 50` allocates 50 physical extents, so its real size depends on the VG's extent size. `-l` also accepts percentages, such as `-l 100%FREE` for all remaining free space in the VG, `-l 50%VG` for half the whole group, or `-l 50%FREE` for half of what is left. A bare number given to `-L` without a unit is read as megabytes, which is exactly how a task asking for 60 extents ends up as a 60 MiB volume.",
   "```bash\nlvcreate -n weblv -L 1G datavg\nlvcreate -n dblv -l 60 datavg        # 60 extents\nlvcreate -n archive -l 100%FREE datavg\nlvs\nlvdisplay /dev/datavg/weblv\nmkfs.xfs /dev/datavg/weblv\nmkdir -p /web && mount /dev/datavg/weblv /web\n```",
   "The extent arithmetic is simple multiplication. In a VG with 16 MiB extents, `-l 60` gives 960 MiB; in a VG with the default 4 MiB extents, the same command gives 240 MiB. With `-L`, if the size is not an exact multiple of the extent size, LVM rounds up to the next whole extent and prints a message such as `Rounding up size to full physical extent`. Before calculating, check `vgdisplay` for `PE Size` and `Free PE`, so you know both the multiplier and whether the space is available. A task that says 'a logical volume of 20 extents' wants `-l 20`, and one that says '800 MiB' wants `-L 800M`; graders usually accept a small tolerance for sizes, but not a result that is off by a factor of four or sixteen because of the wrong option.",
   "After creation, the LV appears as `/dev/VG/LV`, a symbolic link, and as `/dev/mapper/VG-LV`; both refer to the same device-mapper device, so either works in commands and in `/etc/fstab`. If the VG or LV name itself contains a hyphen, the mapper name doubles it, for example `/dev/mapper/my--vg-data`, which is one reason simple names are preferred. Next, create a file system on it with `mkfs.xfs` or `mkfs.ext4`, or make it swap with `mkswap`, then create the mount point, mount it, and add it to `/etc/fstab` for persistence.",
   "`lvs` lists logical volumes with the columns LV (name), VG, Attr (attributes) and LSize, among others, which is enough to confirm the name, group and size at a glance. `lvdisplay` gives details in a labeled block, including `LV Path`, `LV Status` (available or not), `LV Size` and `Current LE`, the number of logical extents, which equals the number of physical extents allocated. Comparing Current LE with the extent count a task asked for is the most direct check for `-l` tasks. `lvs -o +devices` adds a column showing which PVs the LV's extents live on.",
   "`lvremove /dev/VG/LV` deletes a logical volume and everything on it; there is no recycle bin. Before running it, unmount the file system (or `swapoff` for swap) and remove its `/etc/fstab` entry. Otherwise lvremove refuses because the volume is in use, or, if it was unmounted but left in fstab, the next boot fails trying to mount a device that no longer exists and may stop in emergency mode. lvremove asks `Do you really want to remove active logical volume ...?`; read the name it shows before answering y, because a tab-completed path can easily point at the wrong LV.",
   "A short verification routine closes every LV task. Run `lvs` to confirm the name, VG and size, or `lvdisplay` for the extent count. Run `lsblk` to see the LV under its PV with the expected mount point. Then `findmnt` or `df -h` on the mount point, and `mount -a` after editing fstab, prove the file system is mounted and will mount again at boot."
  ],
  "analogy": "Ordering an LV is like ordering fabric. With -L you ask for 2 meters, and the shop cuts 2 meters, rounding up to the next whole mark on its measuring stick. With -l you ask for 50 bolts, and how much fabric that is depends entirely on how long this shop's bolts are. The analogy holds for rounding but stops at removal: returning fabric to the shop leaves the cloth intact, while lvremove destroys the data on the volume.",
  "terms": [
   [
    "Logical volume (LV)",
    "A volume allocated from a volume group that holds a file system or swap, like a flexible partition."
   ],
   [
    "lvcreate -L",
    "Creates an LV with a size given in units such as M or G."
   ],
   [
    "lvcreate -l",
    "Creates an LV with a size given in extents, or percentages such as 100%FREE."
   ],
   [
    "lvs / lvdisplay",
    "List LVs briefly, or show details such as Current LE and LV Path."
   ],
   [
    "lvremove",
    "Deletes a logical volume; unmount it and remove it from fstab first."
   ],
   [
    "Current LE",
    "lvdisplay field showing how many logical extents the LV has."
   ]
  ],
  "example": "A task asks for an LV named database with exactly 50 extents in VG datavg, whose extent size is 16 MiB. You run `lvcreate -n database -l 50 datavg`, then `lvdisplay /dev/datavg/database` shows Current LE 50 and LV Size 800.00 MiB. You format it with mkfs.ext4, mount it, add it to fstab and confirm with mount -a.",
  "mistakes": [
   [
    "-L and -l are interchangeable spellings of the same option.",
    "-L takes a size with units (a bare number means MiB); -l takes an extent count or percentage. Mixing them up changes the size by the extent-size factor."
   ],
   [
    "-l 60 is always 240 MiB.",
    "That is true only with 4 MiB extents. Multiply by the VG's PE Size from vgdisplay; with 16 MiB extents it is 960 MiB."
   ],
   [
    "-l 100%VG uses all remaining space.",
    "100%VG means a size equal to the whole VG, not what is left, so once other LVs exist it asks for more than is free. Use 100%FREE for all remaining space."
   ],
   [
    "Unmounting is enough before lvremove.",
    "Also remove or comment out the /etc/fstab entry, or the next boot will try to mount a device that no longer exists."
   ]
  ],
  "tryit": [
   [
    "VG appvg has PE Size 8 MiB and Free PE 300. A task asks for an LV named cache of 2 GiB and another named tmpdata using all remaining space. What do you run, and roughly how big is tmpdata?",
    "lvcreate -n cache -L 2G appvg uses 256 extents (2048 / 8). Then lvcreate -n tmpdata -l 100%FREE appvg takes the remaining 44 extents, which is 352 MiB. Confirm both with lvs."
   ]
  ],
  "tip": "Capital -L is a size with units; lowercase -l is a count of extents (or a percentage). Multiply extents by the VG's PE size to know the real size.",
  "check": [
   [
    "How big is an LV created with -l 25 in a VG with 8 MiB extents?",
    "200 MiB (25 x 8 MiB)."
   ],
   [
    "How do you create an LV using all remaining space in vg01?",
    "lvcreate -n name -l 100%FREE vg01."
   ],
   [
    "What should you do before lvremove on a mounted LV?",
    "Unmount it (or swapoff if swap) and remove its /etc/fstab entry."
   ],
   [
    "Which lvdisplay field confirms the number of extents an LV has?",
    "Current LE."
   ]
  ]
 },
 {
  "t": "Mounting file systems at boot by UUID or label in /etc/fstab",
  "hook": "At Harborview Animal Hospital, Ines adds a second disk to the records server, mounts it at /records with a quick `mount /dev/sdb1 /records` and copies the patient files over. Everything works. Three weeks later a technician adds a USB backup drive and reboots. The server does not come back; the console shows an emergency mode prompt. When it finally boots, /records is either empty or showing the backup drive's contents. Ines had added a line to /etc/fstab using `/dev/sdb1`, and after the reboot that name belonged to a different disk. How should the entry have been written so the right file system mounts every time?",
  "simple": "Mounting means connecting a storage device to a folder so its files appear there, like plugging a drawer into a cabinet slot. A mount you type by hand lasts only until the computer restarts. To make it automatic, you add one line to a file called `/etc/fstab`, the list of things to mount at startup. Each line says which device, which folder, what kind of file system, and a few settings. The tricky part is naming the device. Names like `/dev/sdb1` can shuffle when disks are added, like seat numbers changing when new chairs are brought in. A UUID, a long unique ID number stored on the file system itself, never changes, so it is the safer way to say which device you mean.",
  "body": [
   "Mounting attaches a file system to a directory, its mount point, so the file system's contents appear there. A `mount` command lasts only until reboot. For a file system to be mounted automatically every boot, it must have an entry in `/etc/fstab` (the file system table). The RHCSA (Red Hat Certified System Administrator) exam grades your storage work after a reboot, so a correct fstab entry is essential, and a broken one can stop the system at an emergency shell, which may cost you far more than the one task.",
   "Each non-comment line in `/etc/fstab` has six fields separated by spaces or tabs. First, the device, preferably identified by `UUID=...` or `LABEL=...`. Second, the mount point, or `none` for swap. Third, the file system type, such as `xfs`, `ext4`, `vfat` or `swap`. Fourth, mount options, where `defaults` means a standard set (read-write, allow device files and executables, mount automatically at boot and so on); several options are separated by commas with no spaces, as in `defaults,noatime`. Fifth, the dump field, used by the old dump backup utility and almost always 0. Sixth, the fsck order: 0 means do not check at boot, 1 is for the root file system and 2 for other file systems that should be checked. XFS file systems normally use 0, because XFS does not use a boot-time fsck.",
   "```text\nUUID=4f3c1d2e-...-9a7b  /data     xfs   defaults         0 0\nLABEL=backup             /backup   ext4  defaults,noatime 0 2\n/dev/datavg/weblv        /web      xfs   defaults         0 0\nUUID=91b2...             none      swap  defaults         0 0\n```",
   "Why use a UUID or label instead of a name such as `/dev/vdb1`? Device names are assigned in the order the kernel detects disks, and that order can change when disks are added or removed, or even between boots on some hardware. A name that was correct today might point to a different disk tomorrow, so the wrong file system would be mounted or the mount would fail. A UUID (universally unique identifier) is created when the file system is made and stays the same wherever the disk appears. Get it with `blkid /dev/vdb1` or `lsblk -f`, and copy it carefully, because a single wrong character means the device is never found. In fstab you write it without quotes, as `UUID=` followed by the value.",
   "A label is a human-friendly name you assign to a file system. Set it at creation with `mkfs.xfs -L backup` or `mkfs.ext4 -L backup`, or later with `xfs_admin -L backup /dev/vdb1` for XFS (the file system must be unmounted) or `e2label /dev/vdb1 backup` for ext4. Labels are easier to read than UUIDs, but they are only unique if you keep them unique; two disks labeled backup will confuse the system. LVM paths such as `/dev/datavg/weblv` or `/dev/mapper/datavg-weblv` are also stable, because they come from LVM names rather than detection order, so they are acceptable in fstab too.",
   "```bash\nmkdir -p /data\nblkid /dev/vdb1                  # copy the UUID\nvim /etc/fstab                   # add the line\nsystemctl daemon-reload          # systemd regenerates mount units\nmount -a                         # mount everything in fstab, reports errors\nfindmnt --verify                 # check fstab syntax and devices\nfindmnt /data ; df -h /data\n```",
   "Always test before rebooting. `mount -a` mounts every fstab entry that is not already mounted and prints an error for any bad line, such as an unknown file system type, a missing mount point or a device that cannot be found. That is far better than discovering the error at boot. `findmnt --verify` parses fstab and reports problems such as unknown types, missing devices or bad option syntax, even for entries that are already mounted. On RHEL, systemd turns each fstab entry into a mount unit, so after editing the file run `systemctl daemon-reload`; otherwise mount prints a hint that fstab has been modified but systemd still uses the old version. Remember that the mount point directory must exist before anything can be mounted on it.",
   "If a bad entry does make it through, the boot usually stops in emergency mode with a message that a mount unit failed. Log in with the root password, remount the root file system read-write if needed (`mount -o remount,rw /`), fix or comment out the bad line, run `systemctl daemon-reload` and `mount -a`, and reboot. For removable or optional disks, the `nofail` option lets the boot continue even if the device is missing, which is useful for USB backup drives but should not be used to hide a mistake in an entry that must work. Finally, confirm everything after a reboot with `findmnt` or `df -h`, which show the device, mount point and type actually in use."
  ],
  "analogy": "An fstab entry by device name is like telling a delivery driver to leave a package at the third house on the left. That works until someone builds a new house at the start of the street. A UUID is the street address painted on the house itself; it does not matter how many houses are added. A label is a family name on the mailbox: easy to read, but only reliable if no other house uses the same name.",
  "mnemonic": "The six fstab fields in order: Dogs May Track Our Dirty Paws. Device, Mount point, Type, Options, Dump, Pass (fsck order).",
  "terms": [
   [
    "/etc/fstab",
    "File listing file systems to mount at boot: device, mount point, type, options, dump and fsck order."
   ],
   [
    "Mount point",
    "An existing directory where a file system's contents are attached."
   ],
   [
    "UUID=",
    "fstab device syntax using a file system's universally unique identifier, stable across device renaming."
   ],
   [
    "LABEL=",
    "fstab device syntax using a human-assigned file system label."
   ],
   [
    "mount -a",
    "Mounts all fstab entries not yet mounted; used to test fstab before rebooting."
   ],
   [
    "findmnt --verify",
    "Checks /etc/fstab for syntax errors, unknown types and missing devices."
   ]
  ],
  "example": "You format /dev/vdb1 with XFS and need it at /archive permanently. `blkid /dev/vdb1` gives its UUID; you add `UUID=<that value> /archive xfs defaults 0 0` to /etc/fstab, create /archive, run `systemctl daemon-reload` and `mount -a`, and `findmnt /archive` confirms it before you reboot to be sure.",
  "mistakes": [
   [
    "/dev/sdb1 is fine in fstab because it is what lsblk shows today.",
    "Device names follow detection order and can change when disks are added or removed. Use UUID=, LABEL= or a stable LVM path."
   ],
   [
    "XFS file systems should use 1 or 2 in the sixth field.",
    "XFS does not use boot-time fsck, so 0 is normal. 1 is for the root file system and 2 for other checked file systems such as ext4."
   ],
   [
    "A successful manual mount proves the fstab line is correct.",
    "A manual mount does not read your new line. Test the line itself with mount -a (after unmounting if already mounted) and findmnt --verify."
   ],
   [
    "Options can be written with spaces, like defaults, noatime.",
    "Spaces separate fields. Options must be comma-separated with no spaces: defaults,noatime."
   ]
  ],
  "tryit": [
   [
    "You added `UUID=7a1c... /projects ext4 defaults 0 2` to fstab. You run mount -a and get an error that the mount point /projects does not exist. Separately, findmnt --verify warns that the UUID cannot be found. What do you fix, and in what order?",
    "Create the directory with mkdir -p /projects, then recheck the UUID with blkid against the device, correct any typo in fstab, run systemctl daemon-reload, then mount -a and findmnt --verify again. Only reboot once both are clean."
   ]
  ],
  "tip": "Always run mount -a (and ideally findmnt --verify) after editing /etc/fstab. A typo you catch now is a two-second fix; the same typo at boot drops you into emergency mode.",
  "check": [
   [
    "Why are UUIDs preferred over /dev/sdX names in fstab?",
    "Device names can change when disks are added or detected in a different order; UUIDs stay with the file system."
   ],
   [
    "What does the sixth fstab field control?",
    "The fsck order at boot: 0 no check, 1 root, 2 other file systems."
   ],
   [
    "How do you test new fstab entries without rebooting?",
    "Run mount -a (after systemctl daemon-reload) and check for errors; findmnt --verify also helps."
   ],
   [
    "How do you set a label on an existing ext4 file system?",
    "e2label /dev/DEVICE labelname (for XFS, xfs_admin -L on the unmounted file system)."
   ]
  ]
 },
 {
  "t": "Adding new partitions, logical volumes and swap without destroying existing data",
  "hook": "At Maple Grove Insurance, the claims server's disk already holds a mounted /claims file system with seven years of scanned documents. Sam is asked to add 1 GiB of swap and a small logical volume for a new reporting tool on the same disk, using the free space at the end. Sam opens fdisk, and muscle memory from last week's lab, where every disk was blank, suggests typing `g` first to start fresh. The cursor waits. One keystroke would make the claims partition vanish from the table. How do you add new storage to a disk that is already in use, so that the old data is still there when you are done?",
  "simple": "Often you need to add new storage to a disk that already holds important files, like adding a new shelf to a bookcase that is already full of books in its top half. The rule is: only build in the empty space, and never knock down what is already standing. First, look carefully at what exists and where the free space is. Then add the new piece, whether that is a new partition, a new volume in the LVM pool, or swap (extra space the computer uses when memory is full), using only that free space. Some commands are like tearing the bookcase down and starting over, and you must avoid them on a disk with data. Finally, check that both the new shelf and the old books are fine.",
  "body": [
   "Many RHCSA storage tasks are set on disks that already hold data or configuration you must keep, and real servers are like that almost every time. The grader checks both that your new storage works and that the existing partitions, volumes and file systems are intact after a reboot. The skill here is adding storage non-destructively: using only free space, never re-creating anything that already exists, and verifying before and after. Most of it is caution and habit rather than new commands.",
   "Start by surveying, without changing anything. `lsblk` and `lsblk -f` show the disks, partitions, logical volumes, file system types and mount points. `fdisk -l DISK` or `parted DISK print free` show the partition table and, with parted, any unallocated gaps labeled Free Space. `pvs` and `vgs` show which devices are LVM physical volumes and how much free space each volume group has in its VFree column. `swapon --show` lists active swap. From this you are looking for one of three things: unallocated space at the end of a disk, an entirely unused disk, or free extents in a volume group. Write down the device names you will touch and the ones you must not.",
   "To add a partition, open the disk with fdisk, gdisk or parted and create a new partition in the free space only. Do not create a new partition table (fdisk `g` or `o`, gdisk `o`, parted `mklabel`); that replaces the table with an empty one and discards every existing partition, even though the data blocks are still physically there. In fdisk, accept the default partition number and first sector, which is the start of the free space, and give the size with `+SIZE`, such as `+1G`. Print the table with `p` and check that the old partitions are still listed with the same start sectors before you write with `w`. After writing, if the disk has mounted partitions, fdisk may warn that the kernel is still using the old table; `partprobe` or `udevadm settle` usually solves it, and `lsblk` should then show the new partition alongside the old ones.",
   "To add a logical volume, check `vgs` for free space. If the VG has enough, `lvcreate` in the existing VG allocates only free extents and does not touch other LVs. If it does not, create a new partition or use a new disk as a physical volume and `vgextend` the VG first, then create the LV. Never run `pvcreate` or `mkfs` on a device that already holds data: pvcreate writes an LVM label over the start of the device and mkfs writes a new, empty file system structure, and both destroy access to what was there. If either command warns that it found an existing signature, stop and recheck the device name rather than answering y.",
   "Swap is disk space the kernel uses as overflow memory when RAM is under pressure. To add swap non-destructively, create a new partition (type Linux swap) or a new LV in free space, then write the swap signature, activate it and make it persistent:",
   "```bash\nmkswap /dev/vdb3                 # writes a swap signature, prints UUID\nswapon /dev/vdb3                 # activate now\necho 'UUID=<uuid-from-mkswap> none swap defaults 0 0' >> /etc/fstab\nswapoff /dev/vdb3 && swapon -a   # test the fstab entry\nswapon --show ; free -h          # confirm total swap increased\n```",
   "Note the `>>` to append to `/etc/fstab`; a single `>` would replace the whole file with one line and the system would lose its root and other mounts at the next boot. Editing the file with an editor avoids that risk entirely. `swapon -a` activates all swap entries in fstab that are not already active, so it is the test for swap lines, just as `mount -a` is for file systems; turning the new area off first with `swapoff` makes sure the test really uses your fstab line. A task may say to add swap while keeping the existing swap, so the total on the Swap line of `free -h` should rise, and `swapon --show` should list both areas, rather than one replacing the other. Priorities, set with the `pri=` option, decide which swap area is used first, but they are rarely required.",
   "Finish every storage task with the same verification routine. Run `lsblk` to see the full layout, old and new. Run `mount -a` and `swapon -a` to test fstab, plus `findmnt --verify` if you edited mount lines. Reboot if you are allowed to. Then run `findmnt` or `df -h` for mounted file systems, `swapon --show` for swap, and take a quick look at the existing data, for example `ls` on the old mount point, to confirm nothing was lost. Comparing the 'before' survey with the 'after' one is the simplest proof that you added storage without taking any away."
  ],
  "analogy": "Adding storage to a disk in use is like building an extension onto an occupied house. You survey the lot to find the empty yard, build only there, and never start by bulldozing the foundation. Creating a new partition table is the bulldozer: the furniture may still be lying in the rubble, but the house plan that told you where each room was is gone. The analogy stops at recovery: rebuilding a house plan is hard, and on an exam there is no time to try.",
  "terms": [
   [
    "Free space",
    "Unallocated area on a disk or free extents in a volume group, where new storage can be added safely."
   ],
   [
    "Swap space",
    "Disk space used by the kernel to hold memory pages when RAM is under pressure."
   ],
   [
    "mkswap",
    "Writes a swap signature to a device, preparing it for use as swap."
   ],
   [
    "swapon / swapoff",
    "Activate or deactivate swap areas; swapon -a activates all fstab swap entries."
   ],
   [
    "swapon --show",
    "Lists active swap areas with their size, usage and priority."
   ],
   [
    "parted print free",
    "Shows a disk's partitions plus any unallocated gaps labeled Free Space."
   ]
  ],
  "example": "A disk /dev/vdb has a 1 GiB XFS partition mounted at /data and 4 GiB free. You add a 512 MiB swap partition with fdisk (n, default start, +512M, t swap, p to check /dev/vdb1 is still listed, w), run `mkswap` and `swapon`, append its UUID to /etc/fstab with >>, and after a reboot `free -h` shows the extra swap while /data still has its files.",
  "mistakes": [
   [
    "Starting fdisk with g gives a clean slate and is harmless.",
    "g (and o, or parted mklabel) replaces the partition table, discarding every existing partition. Only use it on an empty disk."
   ],
   [
    "Running pvcreate or mkfs on the device is fine if you meant to reuse it.",
    "Both overwrite what is there. On a device that holds data, they destroy access to it. If they warn about an existing signature, stop and check the device name."
   ],
   [
    "echo ... > /etc/fstab adds a line.",
    "A single > replaces the whole file. Use >> to append, or edit the file with an editor."
   ],
   [
    "Adding new swap should replace the old swap.",
    "Unless the task says otherwise, keep the existing swap. The total in free -h should increase and swapon --show should list both areas."
   ]
  ],
  "tryit": [
   [
    "A task says: add a 2 GiB logical volume named reports to VG appvg without affecting existing volumes. vgs shows appvg with VFree 500m. lsblk shows /dev/vdc, 5G, unused. What do you do?",
    "The VG lacks space, so extend it: pvcreate /dev/vdc (after confirming with blkid that it has no signature), vgextend appvg /dev/vdc, then lvcreate -n reports -L 2G appvg. Existing LVs are untouched because lvcreate only uses free extents. Confirm with lvs and vgs."
   ],
   [
    "After adding a partition with fdisk on a disk whose first partition is mounted, lsblk does not show the new partition and fdisk warned about the kernel using the old table. Should you reboot immediately?",
    "Not necessarily. Run partprobe on the disk (or udevadm settle) and check lsblk again; usually the kernel then sees the new partition. Reboot only if that fails, and only after checking that fstab is valid so the system comes back cleanly."
   ]
  ],
  "tip": "Never recreate a partition table or run pvcreate/mkfs on something that holds data. Append to fstab with >> (or edit it), and test with mount -a and swapon -a before rebooting.",
  "check": [
   [
    "Which fdisk commands would destroy all existing partitions on a disk?",
    "g (new GPT table) or o (new DOS table), followed by w."
   ],
   [
    "How do you activate a new swap partition and test its fstab entry?",
    "mkswap and swapon it, add a UUID line to fstab, then swapoff it and run swapon -a to confirm fstab activates it."
   ],
   [
    "A VG has no free space but you need a new LV. What do you do first?",
    "Add a new PV (partition or disk) and vgextend the VG, then lvcreate."
   ],
   [
    "Which command shows unallocated gaps on a disk?",
    "parted DISK print free."
   ]
  ]
 },
 {
  "t": "Creating and enabling swap (mkswap, swapon, swapon --show) and making it persistent",
  "hook": "At Silverline Analytics, the reporting server keeps killing its nightly batch job around 2 a.m., and the journal shows the kernel's out-of-memory killer choosing the biggest process. A memory upgrade is weeks away. Your team lead, Ravi, asks you to add 2 GiB of swap as a stopgap today. You create the space, run `swapon`, and `free -h` shows the new swap. The job survives that night. Then the server is patched and rebooted on Saturday, and on Sunday morning the job is killed again. `free -h` now shows the swap you added is gone. What step was missing, and how do you prove it is fixed without waiting for the next reboot?",
  "simple": "Swap is a part of the disk that the computer uses as backup memory. When the real memory (RAM) is full, the system moves things it has not used for a while onto the disk, a bit like moving rarely worn coats from your closet to a box in the garage. It is slower to fetch them from the garage, but your closet does not overflow. Setting it up takes three steps: make the space, mark it as swap with `mkswap`, then switch it on with `swapon`. Switching it on lasts only until the next restart, so you also add a line to `/etc/fstab`, the startup list, so it switches on automatically every time.",
  "body": [
   "Swap is disk space the kernel uses as overflow for memory. When RAM (random access memory) fills up, the kernel moves memory pages that have not been touched recently out to swap, so that active programs can keep running instead of being stopped by the out-of-memory killer. Swap is much slower than RAM, so it is a safety net rather than a performance feature; a system that constantly uses swap needs more memory. Even so, many workloads expect some swap, and the RHCSA exam expects you to add it on request. Swap can live on a partition, on a logical volume or in a file; exam tasks usually ask for a partition or a logical volume of a given size.",
   "The workflow has three steps. First, create the space: a partition (in `fdisk` set the type to Linux swap with the `swap` alias, in `parted` use `mkpart` with the `linux-swap` file system type, in `gdisk` use type code 8200) or a logical volume with `lvcreate`. Second, write a swap signature with `mkswap`, which also assigns a UUID (universally unique identifier) and prints it, for example `Setting up swapspace version 1, size = 512 MiB ... UUID=3f1c...`. Third, activate the area with `swapon`. Check the result with `swapon --show` or `free -h`.",
   "```bash\nmkswap /dev/vdb2            # writes signature, prints UUID\nswapon /dev/vdb2            # activate now\nswapon --show               # list active swap areas\nfree -h                     # Swap: line shows the new total\n```",
   "Each verification command shows something slightly different. `swapon --show` lists every active swap area with the columns NAME (the device or file), TYPE (partition or file), SIZE, USED and PRIO (priority). `free -h` shows a Swap line with total, used and free amounts in human-readable units, so after adding 512 MiB the total should rise by about that much. `lsblk` shows `[SWAP]` in the mount point column for active swap devices, and `blkid` shows `TYPE=\"swap\"` for any device that has a swap signature, active or not.",
   "Activation with `swapon` does not survive a reboot. To make swap persistent, add a line to `/etc/fstab`. For swap, the mount point field is `none` (some systems write `swap`, which is equally accepted), the type is `swap`, the options are usually `defaults`, and the dump and fsck fields are both 0, because swap is never mounted as a file system or checked. Use the UUID from `mkswap` or `blkid` rather than the device name, because names like `/dev/vdb2` can change between boots when disks are added or detected in a different order. For a logical volume, the LVM path such as `/dev/vg01/swaplv` is also stable and acceptable.",
   "```\nUUID=3f1c...-9a2e  none  swap  defaults  0 0\n```",
   "After editing `/etc/fstab`, test the entry without rebooting. Run `swapon -a`, which activates every swap entry listed in the file that is not already active, then check `swapon --show` again. If you had already activated the device by hand, turn it off first with `swapoff /dev/vdb2` so that `swapon -a` proves the fstab line, and not your earlier manual command, brings it up. You can also set a priority with the `pri=` option, as in `defaults,pri=10`; the kernel uses higher-priority swap areas first, and areas with equal priority are used in rotation. Priorities are rarely required on the exam, but you may see them in `swapon --show`, where areas without an explicit priority get negative default values.",
   "Common mistakes are easy to predict. Forgetting the `mkswap` step makes swapon fail because it cannot find a valid swap signature. Putting a mount point path such as `/swap` in the second field, or typing the type as anything but `swap`, makes the line wrong. A single mistyped character in the UUID means the device is never found at boot. Running `mkswap` on the wrong device, such as an existing data partition, destroys that data, so confirm the device with `lsblk` first. On the exam, a system that does not boot cleanly because of a broken fstab line costs far more than the swap task itself, so always test with `swapon -a`, and with `findmnt --verify` if you also touched mount lines, before you reboot.",
   "Removing swap is the reverse: `swapoff DEVICE` to deactivate it, delete or comment out its fstab line, then remove the partition or logical volume if you want the space back. Doing those steps in that order avoids both an in-use error and a failed swap unit at the next boot."
  ],
  "analogy": "Swap is like a self-storage unit for a crowded apartment. When your rooms fill up, you move things you rarely touch to the unit so you can keep living comfortably, but fetching them back takes a drive. mkswap is signing the lease, swapon is getting the keys, and the fstab line is the standing agreement that keeps the unit yours after every month-end. Without that agreement, the unit is gone after the next reboot. The analogy stops at speed: real storage trips take minutes, while swap is slower than RAM by a large but much smaller margin.",
  "mnemonic": "Make, Switch on, Save, Show: mkswap, swapon, add the fstab line, then swapoff and swapon -a and swapon --show to prove it.",
  "terms": [
   [
    "Swap space",
    "Disk space the kernel uses to hold memory pages that do not fit in RAM."
   ],
   [
    "mkswap",
    "Writes a swap signature and UUID to a partition, logical volume or file so it can be used as swap."
   ],
   [
    "swapon / swapoff",
    "Activate or deactivate swap areas; swapon -a activates every swap entry in /etc/fstab."
   ],
   [
    "swapon --show",
    "Lists active swap areas with name, type, size, usage and priority."
   ],
   [
    "UUID",
    "A universally unique identifier stored in a file system or swap signature, used to refer to a device reliably in /etc/fstab."
   ],
   [
    "pri=",
    "fstab option setting swap priority; higher values are used first."
   ]
  ],
  "example": "You are asked to add a 512 MiB swap partition on /dev/vdb that is active after reboot. You create partition 2 with parted as linux-swap, run mkswap /dev/vdb2, copy the UUID into /etc/fstab with none, swap, defaults, 0 0, then run swapoff /dev/vdb2 (if it was active), swapon -a and confirm with swapon --show before rebooting.",
  "mistakes": [
   [
    "swapon alone makes swap permanent.",
    "swapon only activates it for the current boot. Without a /etc/fstab line, the swap area is gone after a reboot."
   ],
   [
    "You can run swapon right after creating the partition.",
    "The partition needs a swap signature first. Run mkswap, or swapon fails because it finds no valid signature."
   ],
   [
    "The second fstab field for swap should be a path such as /swap.",
    "Swap is not mounted on a directory. Use none (or swap) in the mount point field, type swap, and 0 0 for the last two fields."
   ],
   [
    "If swapon -a prints nothing, the fstab line must be wrong.",
    "swapon -a is silent on success and skips areas already active. Check swapon --show; turn the area off with swapoff first to prove the fstab line works."
   ]
  ],
  "tryit": [
   [
    "A task asks for a 1 GiB swap logical volume named swaplv in VG vg01, active after reboot. vgs shows 3 GiB free. Write the full sequence, including how you prove persistence without rebooting.",
    "lvcreate -n swaplv -L 1G vg01, mkswap /dev/vg01/swaplv, add the line /dev/vg01/swaplv none swap defaults 0 0 (or the UUID from mkswap) to /etc/fstab, then run swapon -a and confirm with swapon --show. Because swapon -a only reads fstab, seeing the LV listed proves the line works; if you had activated it manually first, swapoff it before running swapon -a."
   ]
  ],
  "tip": "Persistence is the part graders check. A swap area activated only with swapon disappears at reboot, so the task fails unless the /etc/fstab line exists and swapon -a activates it cleanly.",
  "check": [
   [
    "What three commands take a new partition to active, verified swap?",
    "mkswap to write the signature, swapon to activate it, and swapon --show (or free -h) to verify it."
   ],
   [
    "What goes in the mount point and fsck fields of a swap line in /etc/fstab?",
    "The mount point is none (or swap) and both the dump and fsck order fields are 0, since swap is never mounted or checked."
   ],
   [
    "Why use the UUID rather than /dev/vdb2 in /etc/fstab?",
    "Device names can change between boots when disks are added or detected in a different order, while the UUID stays with the swap signature."
   ],
   [
    "What does lsblk show in the mount point column for an active swap partition?",
    "[SWAP]."
   ]
  ]
 },
 {
  "t": "Creating vfat, ext4 and xfs file systems (mkfs.vfat, mkfs.ext4, mkfs.xfs)",
  "hook": "It is your second week on the Linux team at Tidewater Freight, and Priya drops a ticket on you before lunch. Three new disks have been attached to the reporting server. One needs the standard RHEL file system for a growing database, one needs ext4 because a vendor tool insists on it, and one is a small partition that a Windows laptop must be able to read when the disk is moved. You type `lsblk` and see vdb, vdc and vdd sitting there, empty and nameless. Three commands will format them in seconds, and the same three commands will wipe the wrong disk just as quickly. Which tool goes with which disk, and how do you prove you got it right?",
  "simple": "A new disk is like a blank warehouse floor: there is space, but no shelves, no labels and no way to find anything. A file system is the shelving system. It keeps track of where each file lives, who owns it and how much room is left. Linux offers several shelving styles. XFS is Red Hat's standard choice and is great for big, busy storage. ext4 is an older, very reliable style that can also be made smaller later. vfat is a simple style that almost every computer, camera and firmware chip understands, but it cannot remember Linux owners or permissions. The command `mkfs` (make file system) builds the shelves, and it clears out anything already on that floor, so you always check which disk you are pointing at first.",
  "body": [
   "A partition or logical volume is only raw block space until you put a file system on it. The file system decides how files, directories, ownership, permissions and free space are tracked on that space. Red Hat Enterprise Linux (RHEL) uses XFS as its default, supports ext4 (the fourth extended file system) as a mature alternative, and uses vfat, the Linux driver for the FAT (File Allocation Table) family, where other operating systems or firmware must read the disk. The classic examples are the EFI (Extensible Firmware Interface) system partition that UEFI (Unified Extensible Firmware Interface) firmware boots from, and a USB stick that has to work on a Windows or macOS machine.",
   "Each type has its own `mkfs` helper, and each helper comes from its own package. `mkfs.xfs` comes from xfsprogs, `mkfs.ext4` from e2fsprogs, and `mkfs.vfat` from dosfstools. The first two are installed on almost every RHEL system; dosfstools may need a quick `dnf install dosfstools` if `mkfs.vfat` reports command not found. You can also run the generic front end, `mkfs -t xfs /dev/vdb1`, which simply calls the matching helper for you. Labels are optional but handy because they give the file system a human-readable name you can later use in `/etc/fstab` or with `mount LABEL=...`. XFS and ext4 take `-L label`, while vfat uses `-n LABEL`; FAT labels are short and traditionally uppercase.",
   "```bash\nmkfs.xfs  /dev/vg1/data        # default RHEL file system\nmkfs.ext4 -L logs /dev/vdb1    # ext4 with a label\nmkfs.vfat -n USBDATA /dev/vdc1 # FAT, readable by other systems\nlsblk -f                       # shows FSTYPE, LABEL, UUID\nblkid /dev/vdb1                # prints UUID and TYPE\n```",
   "When you run these commands, read the output rather than letting it scroll past. `mkfs.xfs` prints a block of geometry details such as `meta-data=`, `data=`, `log=` and `realtime=`, which tells you it succeeded. `mkfs.ext4` prints the block count, the new file system UUID (Universally Unique Identifier), a list of superblock backup locations and a series of done messages as it writes inode tables and the journal. `mkfs.vfat` is terse and usually prints only its version line. Afterward, `lsblk -f` gives you one tidy view of every device with its FSTYPE, LABEL and UUID columns, and `blkid /dev/vdb1` prints a single line like `/dev/vdb1: LABEL=\"logs\" UUID=\"...\" TYPE=\"ext4\"`.",
   "Know the differences the exam leans on. XFS is fast with large files and parallel input and output, can be grown while mounted with `xfs_growfs`, but cannot be shrunk at all. ext4 can be grown online with `resize2fs` and shrunk only while unmounted. vfat has no Linux ownership or permission bits. The owner, group and mode you see on its files are invented at mount time from options such as `uid=`, `gid=` and `umask=`, so `chmod` and `chown` on files inside it do not change anything the way you expect. If a task says a group of users must be able to write to a vfat partition, the fix belongs in the mount options, not in a `chown` command.",
   "Choosing the type is part of the task, not a matter of taste. If the instructions name a type, use exactly that type. If they say the volume will later need to be made smaller, ext4 is the right choice because XFS cannot shrink. If they say the partition must be readable by firmware or by another operating system, use vfat. If nothing is specified, XFS is the RHEL default and a safe choice for general data.",
   "Be careful, because `mkfs` destroys whatever was on the device. As a safety net, if the device already holds a recognizable file system, `mkfs.xfs` refuses and tells you to use `-f` to force it, and `mkfs.ext4` stops to ask whether to proceed anyway. That refusal is a useful warning, so read the message before forcing. Double-check the device name with `lsblk` first, especially on a virtual machine with several disks of the same size. Formatting `/dev/vdb` when you meant `/dev/vdb1` replaces the partition table's contents with a file system and is a classic way to lose an hour.",
   "Creating the file system does not make it usable yet. You still need a mount point directory, a mount, and usually an `/etc/fstab` line so it returns after reboot. After `mkfs`, run `blkid` or `lsblk -f` to get the new UUID for that fstab line, because UUIDs stay stable even if the kernel renames disks. Note that re-running `mkfs` on the same device generates a brand-new UUID, so any fstab entry that used the old one must be updated, or the next boot may stop in emergency mode looking for a device that no longer exists."
  ],
  "analogy": "Running mkfs is like a moving company installing shelving in an empty storage unit. XFS is heavy industrial racking: easy to extend with more sections, but you cannot cut it down without tearing it out. ext4 is adjustable shelving that can be extended any time and shortened if you first empty it. vfat is a simple plastic bin system any visitor can use, but it has no locks, so there is no way to say whose bin is whose. The analogy stops at one point: real shelving keeps your boxes when replaced, while mkfs throws every box away.",
  "terms": [
   [
    "XFS",
    "The default RHEL file system; high performance and growable online, but it cannot be shrunk."
   ],
   [
    "ext4",
    "The fourth extended file system; mature, growable online and shrinkable while unmounted."
   ],
   [
    "vfat",
    "The Linux driver for FAT file systems, used for EFI partitions and removable media; it stores no Linux ownership or permissions."
   ],
   [
    "mkfs",
    "The make file system front end; mkfs -t type calls the matching helper such as mkfs.xfs or mkfs.ext4."
   ],
   [
    "blkid",
    "Prints the UUID, label and file system type of block devices, used when writing /etc/fstab entries."
   ],
   [
    "lsblk -f",
    "Lists block devices in a tree with their file system type, label, UUID and mount point."
   ]
  ],
  "example": "A task asks for an ext4 file system labeled archive on the logical volume /dev/vgdata/lvarch. You run mkfs.ext4 -L archive /dev/vgdata/lvarch, confirm with lsblk -f that FSTYPE is ext4 and LABEL is archive, and then use blkid to copy its UUID into /etc/fstab.",
  "mistakes": [
   [
    "Using -L to label a vfat file system.",
    "mkfs.vfat uses -n for the volume name. -L is the label option for mkfs.xfs and mkfs.ext4."
   ],
   [
    "Fixing access on a vfat USB partition with chown -R or chmod.",
    "FAT stores no Linux owners or modes. Set uid=, gid= and umask= as mount options, in the mount command or the fstab line."
   ],
   [
    "Choosing XFS for a volume the task says will be shrunk later.",
    "XFS can only grow. A volume that must shrink should be ext4, which can be reduced while unmounted."
   ],
   [
    "Assuming the old fstab line still works after reformatting.",
    "Every mkfs run writes a new UUID. Update the UUID= entry in /etc/fstab or the system may fail to mount it at boot."
   ]
  ],
  "tryit": [
   [
    "You are told to prepare /dev/vdc1 as a partition that a hardware appliance's firmware will read, and to name it FWDATA. A teammate suggests mkfs.xfs -L FWDATA /dev/vdc1 because XFS is the RHEL default. lsblk shows /dev/vdc1 is currently empty. What do you run instead, and why?",
    "Run mkfs.vfat -n FWDATA /dev/vdc1. Firmware and other operating systems generally read FAT, not XFS, and the vfat helper uses -n rather than -L for the name. Then confirm with lsblk -f that FSTYPE shows vfat and the label is FWDATA."
   ],
   [
    "You run mkfs.xfs /dev/vdb1 and it stops with a message that the device appears to contain an existing ext4 file system and that you should use -f to force overwrite. The task told you to create XFS on /dev/vdb1. What should you do before adding -f?",
    "Pause and confirm you have the right device, for example with lsblk -f and by checking that nothing is mounted from it and no fstab line depends on it. If it really is the target named in the task, rerun with mkfs.xfs -f /dev/vdb1. The refusal is a safety check, not an error to bypass by reflex."
   ]
  ],
  "tip": "Match the requested type exactly. A grader checking for ext4 will fail an XFS volume even if it mounts and works, so confirm with lsblk -f or blkid before moving on.",
  "check": [
   [
    "Which option sets a label for XFS and ext4, and which for vfat?",
    "XFS and ext4 use -L label; mkfs.vfat uses -n LABEL."
   ],
   [
    "Why can't you fix ownership inside a vfat file system with chown?",
    "FAT stores no Linux owner or permission bits; ownership and mode are set for the whole file system at mount time with options like uid=, gid= and umask=."
   ],
   [
    "What happens to the UUID if you run mkfs again on the same device?",
    "A new UUID is generated, so any /etc/fstab entry using the old UUID must be updated."
   ],
   [
    "Which package provides mkfs.vfat?",
    "dosfstools. mkfs.xfs comes from xfsprogs and mkfs.ext4 from e2fsprogs."
   ]
  ]
 },
 {
  "t": "Mounting, unmounting and using file systems; mount -a and findmnt --verify",
  "hook": "At Juniper Valley Clinic, Marcus added a new line to `/etc/fstab` late on a Thursday so the scanned-records volume would come back after maintenance. He typed it from memory, saved, and scheduled a reboot for 6 a.m. At 6:07 your phone buzzes: the server is not answering on the network, and the console shows a prompt asking for the root password to enter emergency mode. Staff arrive at 7:30 and need the patient scheduling system. One missing directory or one mistyped UUID was enough to stop the boot. What two quick checks would have caught this before anyone rebooted?",
  "simple": "On Linux, all files live in one big tree that starts at the top folder, written `/`. A new disk does not get its own drive letter like on some other systems. Instead, you attach it to an ordinary folder, and from then on whatever is on the disk shows up inside that folder. Attaching is called mounting, and the folder is the mount point. Detaching is unmounting. You can mount by hand for a quick test, but to make it happen at every startup you write a line in a settings file called `/etc/fstab`. Because a mistake in that file can stop the computer from starting, you test your line with `mount -a` and `findmnt --verify` before restarting, like checking a recipe before you cook for guests.",
  "body": [
   "Linux has one directory tree starting at `/`. Mounting attaches a file system to a directory in that tree, called the mount point, so the file system's contents appear there. Whatever was inside the mount point directory before is hidden, not deleted, until you unmount. On Red Hat Enterprise Linux (RHEL) you mount manually to test and use `/etc/fstab` (the file system table) to make mounts persistent across reboots. The exam reboots your system before grading, so a mount that only exists in memory earns nothing.",
   "A manual mount takes a device and a directory. The device can be a path such as `/dev/vg1/data`, or a reference such as `UUID=...` (a Universally Unique Identifier written into the file system) or `LABEL=...`, which stays correct even if the kernel names disks differently next boot. The kernel usually detects the file system type, but you can state it with `-t xfs` or `-t ext4`. Options go after `-o`, for example `ro` for read-only, `noexec` to block running programs from that file system, or `nosuid` to ignore setuid bits. You can change options on a mounted file system with `remount` instead of unmounting first.",
   "```bash\nmkdir -p /data\nmount UUID=5b2e...c7 /data        # or: mount /dev/vg1/data /data\nmount -o remount,ro /data          # change options in place\nfindmnt /data                      # show source, type, options\ndf -h /data                        # size and free space\numount /data                       # detach it\n```",
   "To see what is mounted, `findmnt` is the most readable tool. With no arguments it prints the whole tree; with a path such as `findmnt /data` it prints a single line with the TARGET, SOURCE, FSTYPE and OPTIONS columns, which is exactly what you need to confirm a task. `df -h` shows size, used and available space in human-readable units, and plain `mount` with no arguments lists everything, though its output is long and noisy because of the many virtual file systems systemd mounts.",
   "Unmounting fails with the message target is busy if any process has a file open there or has it as its current working directory, and that process is often your own shell. Run `cd /` and try again. To find other culprits, `lsof /data` lists open files under the mount, and `fuser -vm /data` lists the processes using it with their PIDs (process IDs). Stop or move those processes and unmount cleanly. A lazy unmount with `umount -l` detaches the name immediately but leaves the file system in use behind the scenes, so avoid it as a habit and fix the cause instead.",
   "For persistent mounts, add a line to `/etc/fstab`, then test it before you reboot. `mount -a` mounts every fstab entry that is not already mounted and is not marked `noauto`, so if it prints an error, your new line is the obvious suspect. If it prints nothing, it worked. `findmnt --verify` goes further: it parses the whole file and reports problems such as a missing mount point directory, an unknown file system type, or a UUID or label that does not match any device, without mounting anything. It also checks entries that are already mounted, which `mount -a` silently skips. Run both, and read the summary line that `findmnt --verify` prints at the end, which counts parse errors, errors and warnings.",
   "On RHEL, systemd turns each fstab line into a mount unit at boot, with a name derived from the path, such as `data.mount` for `/data`. After editing the file, run `systemctl daemon-reload` so systemd regenerates those units; otherwise `mount` may print a hint that fstab has been modified but systemd still uses the old version. A bad fstab line that is not marked `nofail` can drop the system into emergency mode at boot. There you enter the root password, remount the root file system read-write if needed with `mount -o remount,rw /`, fix the file, and reboot.",
   "Finally, to use the mounted file system, simply work inside the mount point. One detail trips people up: once mounted, the ownership and permissions you see on the mount point are those of the root directory of the mounted file system, not of the empty directory you created beforehand. So if a task says the mount point must be owned by a group or have a certain mode, apply `chown` and `chmod` after mounting, and they will be stored in the file system and persist across remounts."
  ],
  "analogy": "Mounting is like plugging a filing drawer into an empty slot in a big cabinet. The slot is the mount point; the drawer is the file system. Once it is in, anyone opening that slot sees the drawer's folders. Whatever was taped to the back of the empty slot is hidden until the drawer comes out. You cannot pull the drawer while someone has their hand in it, which is the target is busy error. The analogy stops at labels: the drawer's own label, not the slot's, decides who may open it.",
  "terms": [
   [
    "Mount point",
    "An existing directory where a file system is attached to the directory tree."
   ],
   [
    "mount -a",
    "Mounts every file system listed in /etc/fstab that is not already mounted, used to test new entries."
   ],
   [
    "findmnt --verify",
    "Checks /etc/fstab for errors such as missing mount points, bad types or unknown devices without mounting."
   ],
   [
    "target is busy",
    "The umount error shown when a process has open files or a working directory inside the file system."
   ],
   [
    "Emergency mode",
    "A minimal root shell systemd drops to when a required mount or other critical step fails at boot."
   ]
  ],
  "example": "After adding an fstab line for /backup, you run systemctl daemon-reload, then findmnt --verify, which warns that /backup does not exist. You create the directory, run mount -a with no errors, and findmnt /backup shows the right device and options, so the reboot is safe.",
  "mistakes": [
   [
    "Rebooting right after editing /etc/fstab to see whether it works.",
    "Test first with mount -a and findmnt --verify. A broken line can stop the boot in emergency mode, costing far more time than the test."
   ],
   [
    "Thinking mount -a proves every fstab line is correct.",
    "mount -a skips entries already mounted and those marked noauto. findmnt --verify checks every line without mounting."
   ],
   [
    "Setting ownership on the empty mount point directory before mounting.",
    "After mounting, you see the root directory of the mounted file system instead. Set chown and chmod after the mount."
   ],
   [
    "Using umount -l whenever target is busy appears.",
    "Find the process with lsof or fuser -vm, or simply cd out of the directory, then unmount cleanly."
   ]
  ],
  "tryit": [
   [
    "You need /dev/vg1/reports mounted at /reports at every boot. You add the fstab line and run mount -a, which returns silently, and df -h shows /reports. A colleague says you are done. Is anything left to check before the system is rebooted?",
    "Yes. Run systemctl daemon-reload so systemd uses the new fstab, and run findmnt --verify to catch any warnings across the whole file, such as another entry that is already mounted but now broken. Then confirm findmnt /reports shows the expected source and options."
   ],
   [
    "umount /mnt/archive fails with target is busy. Your shell prompt shows you are in /root, and fuser -vm /mnt/archive lists a process named tar owned by user ops. What is the safe way forward?",
    "A backup job appears to be reading from the file system. Check with the owner or wait for tar to finish, or stop that process if it is safe to do so, then unmount normally. Forcing a lazy unmount would hide the problem while tar keeps the file system in use."
   ]
  ],
  "tip": "Never reboot after editing /etc/fstab without running mount -a and findmnt --verify. A typo can leave the exam system in emergency mode and cost you time on every other task.",
  "check": [
   [
    "umount /data reports target is busy. What are the usual cause and fix?",
    "A process or your own shell is using a file or directory there; cd out of it, or find the process with lsof or fuser -vm and stop it, then unmount."
   ],
   [
    "What does findmnt --verify check that mount -a does not?",
    "It parses every fstab line and reports problems such as missing mount point directories, unknown types or unresolvable UUIDs without mounting anything, including entries already mounted."
   ],
   [
    "Why run systemctl daemon-reload after editing /etc/fstab?",
    "systemd generates mount units from fstab; the reload makes it regenerate them so it uses your new entries."
   ],
   [
    "How do you change a mounted file system to read-only without unmounting it?",
    "mount -o remount,ro /mountpoint."
   ]
  ]
 },
 {
  "t": "/etc/fstab fields: device, mount point, type, options, dump, fsck order",
  "hook": "Elena at Northgate Library Services hands you a printout of `/etc/fstab` from a server that keeps landing in emergency mode after patch night. Six neat columns, a dozen lines, and somewhere among them a problem. One line uses `/dev/sdb1` where everything else uses UUIDs. Another has `defaults, noatime` with a space after the comma. A third ends in `1 1` for an XFS data volume. She asks which of these actually breaks the boot, which are just untidy, and which are harmless. To answer, you need to know exactly what each of the six fields means. Can you read every column on sight?",
  "simple": "The file `/etc/fstab` is a to-do list the computer reads every time it starts up. Each line says: take this disk, attach it at this folder, treat it as this kind of file system, with these settings, and here are two small numbers about backups and checking. The six pieces always come in the same order and are separated by spaces. If you put a space in the wrong place, the computer reads the line wrongly, a bit like a spreadsheet where one value spilled into the next column. Learning the six columns by heart lets you write a line quickly and spot mistakes in someone else's line.",
  "body": [
   "The file `/etc/fstab` (file system table) lists the file systems and swap spaces the system should mount or activate at boot. Each non-comment line has six fields separated by spaces or tabs, and lines starting with `#` are comments. You will edit this file on nearly every RHCSA (Red Hat Certified System Administrator) storage task on RHEL (Red Hat Enterprise Linux), so learn the fields in order until you can write a line without looking. Alignment does not matter to the system; tidy columns are only for human readers.",
   "```\n# device                  mount point  type  options           dump fsck\nUUID=5b2e...c7            /data        xfs   defaults          0    0\nLABEL=logs                /logs        ext4  defaults,noatime  0    2\n/dev/vg1/lvapp            /app         xfs   defaults          0    0\nUUID=3f1c...9a2e          none         swap  defaults          0    0\nserver1:/export/share     /mnt/share   nfs   defaults,_netdev  0    0\n```",
   "Field 1 is the device, meaning what to mount. Use `UUID=` (the file system's Universally Unique Identifier) or `LABEL=` for disk partitions, a logical volume path such as `/dev/vg1/lvapp` or `/dev/mapper/vg1-lvapp` (stable because LVM, the Logical Volume Manager, keeps its names), or `host:/path` for NFS (Network File System). Avoid raw kernel names like `/dev/vdb1` for disks, because the kernel assigns those names in detection order, and adding or removing a disk can shift them. A line that points at the wrong device might mount someone else's data, or nothing at all.",
   "Field 2 is the mount point, which must be an existing absolute directory such as `/data`. Swap has no mount point, so it uses the word `none`. Field 3 is the file system type: `xfs`, `ext4`, `vfat`, `swap`, `nfs` and so on. The type must match what is really on the device; `lsblk -f` or `blkid` will tell you. Writing `ext4` on a line for an XFS volume makes the mount fail.",
   "Field 4 holds the mount options, separated by commas with no spaces. `defaults` stands for rw, suid, dev, exec, auto, nouser and async, which together mean read-write, honor setuid, allow device files, allow programs to run, mount at boot, only root may mount, and write asynchronously. Useful extras include `ro` (read-only), `noexec`, `nosuid`, `noauto` (do not mount at boot or with `mount -a`), `nofail` (boot continues if the device is missing), `_netdev` (the device needs the network, so wait for it), and for vfat `uid=`, `gid=` and `umask=` to set ownership and mode. When you list extras with `defaults`, the later options override the matching parts of defaults, so `defaults,ro` gives a read-only mount.",
   "Field 5 is the dump flag, used by the old `dump` backup tool to decide what to back up. Nothing on a modern RHEL system relies on it, so set it to 0. Field 6 is the fsck order, which controls boot-time file system checks: 0 means never check at boot, 1 is reserved for the root file system, and 2 is for other file systems checked after root. XFS does not use boot-time fsck because it relies on its journal and on `xfs_repair` when needed, so XFS lines normally use 0, and so do swap and network file systems. ext4 data file systems commonly use 2. Strictly, these last two fields may be omitted and default to 0, but writing them out is clearer and is what graders expect to see.",
   "A reliable workflow keeps you out of trouble. Get the UUID with `blkid` or `lsblk -f`. Create the mount point with `mkdir -p`. Add the line. Run `systemctl daemon-reload` so systemd regenerates its mount units, then `mount -a` and `findmnt --verify` to test. A speed trick is `blkid /dev/vdb1 >> /etc/fstab`, which appends the device line with its UUID so you can edit it into shape instead of retyping a long string. If you use it, clean up the extra text carefully, removing the device name, the quotation marks and the extra `TYPE=` and similar fields, because they are not valid fstab syntax.",
   "Two more details matter. Order matters for nested mounts: a line for `/data/archive` must come after the line for `/data`, or the inner mount would be hidden when the outer one mounts over it. And because fields are whitespace separated, a single space inside the options list, such as `defaults, noatime`, splits the line into seven fields and breaks it. `findmnt --verify` catches this kind of parse error immediately. When you inherit a server, reading its fstab top to bottom with these six fields in mind is also a fast way to learn how its storage is laid out: which volumes exist, which are network shares, which are read-only and which are allowed to be missing at boot."
  ],
  "analogy": "An fstab line is like a mailing label with six boxes in fixed order: who the package is from (device), the delivery address (mount point), the kind of package (type), handling instructions (options), whether to photocopy it for records (dump), and whether to inspect it on arrival, and in what order (fsck). Postal sorters read the boxes by position, so writing the address in the instructions box sends it astray. The analogy breaks a little at fsck: inspection order matters only among ext file systems, and XFS skips inspection entirely.",
  "mnemonic": "Don't Make Two Old Dogs Fight: Device, Mount point, Type, Options, Dump, Fsck order.",
  "terms": [
   [
    "/etc/fstab",
    "The file that lists file systems and swap to mount or activate at boot, one six-field line each."
   ],
   [
    "defaults",
    "The option set rw, suid, dev, exec, auto, nouser and async."
   ],
   [
    "fsck order",
    "The sixth fstab field: 0 skips checking, 1 is root, 2 is other file systems checked after root."
   ],
   [
    "nofail",
    "An fstab option that lets boot continue if the device is not present."
   ],
   [
    "noauto",
    "An fstab option that stops the file system mounting at boot or with mount -a; it mounts only on request."
   ],
   [
    "Dump flag",
    "The fifth fstab field, read only by the legacy dump backup tool; normally 0."
   ]
  ],
  "example": "You need /dev/vgdata/lvweb (XFS) mounted read-only at /srv/web at boot. You add the line /dev/vgdata/lvweb /srv/web xfs ro 0 0, run systemctl daemon-reload and mount -a, and findmnt /srv/web shows the options column starting with ro.",
  "mistakes": [
   [
    "Writing options with spaces, such as defaults, noatime.",
    "Fields are split on whitespace, so the space creates an extra field and breaks the line. Write defaults,noatime with no spaces."
   ],
   [
    "Setting the fsck field to 1 or 2 for an XFS volume.",
    "XFS is not checked by fsck at boot. Use 0 for XFS, swap and network file systems; 1 is root, 2 is other ext file systems."
   ],
   [
    "Using /dev/vdb1 in field 1 because it is shorter.",
    "Kernel device names can change between boots. Use UUID=, LABEL= or an LVM path, which stay stable."
   ],
   [
    "Thinking the dump field controls modern backups.",
    "It is read only by the legacy dump tool. Set it to 0."
   ]
  ],
  "tryit": [
   [
    "A task asks for the ext4 file system with label projects to mount at /projects at boot, with programs on it blocked from running. You have confirmed the label with blkid. Write the fstab line and say what each of the last three fields means here.",
    "LABEL=projects /projects ext4 defaults,noexec 0 2. The options combine defaults with noexec to block execution, dump is 0 because the legacy dump tool is unused, and 2 means fsck checks it at boot after the root file system, which is normal for an ext4 data volume."
   ],
   [
    "You find this line on a server: UUID=9a1e... /mnt/usb vfat defaults 0 0. Users in group staff (GID 1005) cannot write to the USB partition, and chown has no effect. What do you change in the line?",
    "Change field 4 to something like defaults,gid=1005,umask=002 so the group owns everything and can write. vfat stores no Linux ownership, so ownership and mode must come from mount options. Then daemon-reload, unmount, mount -a and verify."
   ]
  ],
  "tip": "Exam questions often ask what the fifth and sixth fields mean. Dump is legacy and set to 0; fsck order is 1 for root, 2 for others, and 0 for XFS, swap and network mounts.",
  "check": [
   [
    "List the six fstab fields in order.",
    "Device, mount point, file system type, mount options, dump flag and fsck order."
   ],
   [
    "Why do XFS lines usually end in 0 0?",
    "The dump flag is unused, and XFS is not checked by fsck at boot (it repairs via its journal and xfs_repair), so the fsck order is 0."
   ],
   [
    "What does noauto do?",
    "It keeps the file system from mounting at boot or with mount -a; it mounts only when requested explicitly."
   ],
   [
    "What goes in the mount point field for a swap line?",
    "The word none, because swap is activated rather than mounted on a directory."
   ]
  ]
 },
 {
  "t": "Mounting and unmounting NFS network file systems (mount -t nfs, _netdev)",
  "hook": "The design team at Saltmarsh Architects keeps every drawing on a file server in the back room, and the new rendering workstation you just built needs to see the share at /projects every time it starts. Jonah, the lead designer, has already tried copying files over by USB and is losing patience. You know the server name and the export path. A manual mount works in seconds. But the last time someone added a network share to a workstation's startup list, it hung at boot because the network was not ready yet, and nobody could log in until noon. How do you make an NFS share mount reliably at boot without that hang?",
  "simple": "NFS lets one computer share a folder so other computers can open it over the network as if it were their own disk. The sharing computer is the server, and the folder it offers is called an export. On your computer, the client, you attach that shared folder to a local folder, just like mounting a disk, except the source is written as the server's name, a colon, and the folder path. To make it happen at every startup, you add a line to `/etc/fstab` and include the setting `_netdev`, which tells the system to wait until the network is ready before trying. Think of it as waiting for the phone line to connect before you start talking.",
  "body": [
   "NFS (Network File System) lets a server share, or export, directories that clients mount over the network as if they were local. Users on the client see ordinary files and directories; reads and writes travel across the network to the server. The RHCSA (Red Hat Certified System Administrator) exam tests the client side: finding a share, mounting it by hand, and making it mount at boot, either permanently through `/etc/fstab` or on demand through autofs. The client tools, including the mount helper for the nfs type, come from the nfs-utils package, which is often already installed and otherwise needs `dnf install nfs-utils`. You do not need to start any service on the client for a basic mount; the mount helper handles the connection when you run `mount` or when systemd processes the fstab line at boot.",
   "An NFS source is written `server:/exported/path`, for example `server1.example.com:/exports/share`. To see what a server exports, `showmount -e server` works when the server also offers the older NFSv3 helper services. Against a server that offers only NFSv4, it may fail or time out even though mounts work fine. In that case you can mount the server's root export, for example `mount server1:/ /mnt`, and browse it to find the paths. RHEL (Red Hat Enterprise Linux) clients try NFS version 4 first by default and negotiate down if needed, and you can force a version with `-o nfsvers=4.2` or `vers=3` if a task requires it.",
   "```bash\ndnf install -y nfs-utils\nmkdir -p /mnt/share\nmount -t nfs server1.example.com:/exports/share /mnt/share\nfindmnt /mnt/share      # shows type nfs4 and options\numount /mnt/share\n```",
   "When the mount succeeds, `findmnt /mnt/share` shows the SOURCE as the server and path and the FSTYPE as `nfs4` when version 4 was negotiated, even though you typed `-t nfs`. The OPTIONS column is long and shows negotiated values such as `vers=4.2`, the read and write sizes, `hard`, `proto=tcp` and the client address. `df -h` shows the share's size as reported by the server. Unmounting works exactly as for local file systems, including the target is busy error if something is still using the share.",
   "For a persistent mount, the fstab line uses the NFS source as the device, `nfs` as the type, and includes `_netdev` in the options. That option marks the file system as needing the network. systemd also recognizes the nfs type as a network file system, but `_netdev` states it explicitly, so systemd orders the mount after the network is online and unmounts it before networking stops at shutdown. Dump and fsck are 0 because there is nothing local to check. As with any fstab change, create the mount point first, run `systemctl daemon-reload`, then `mount -a` and `findmnt --verify`, and confirm with `findmnt /mnt/share` that the share is attached with the options you expect. Extra NFS options, such as `ro` for a read-only share or a specific `nfsvers=` value, go in the same comma-separated field.",
   "```\nserver1.example.com:/exports/share  /mnt/share  nfs  defaults,_netdev  0 0\n```",
   "Troubleshooting follows the path of the request. First, can you resolve and reach the server? Try `ping server1` and `getent hosts server1`. Second, is the export path spelled exactly as exported, including case? Third, firewalls: the client usually needs no firewall change because it makes outbound connections, but the server's firewall must allow the nfs service. An access denied by server message often means the server does not export to your client's address. Permission errors after a successful mount usually come from UID (user ID) mismatches between client and server, or from root squashing, where the server maps the client's root user to an unprivileged user such as nobody, so files you create as root appear owned by nobody and root cannot write where it expects to.",
   "Finally, understand what happens when the server disappears. With the default hard mount, processes that touch the share wait and retry indefinitely until the server returns, which can make commands like `ls` or `df` appear to freeze. That is by design to protect data from silent write failures, but it is another reason to test mounts carefully before rebooting and to use `_netdev` so boot ordering is right. When a task asks for on-demand mounting instead of a permanent one, especially for user home directories, the tool is autofs, which mounts the share only when someone accesses it. That also avoids the risk of a missing server delaying boot, because nothing is mounted until it is needed."
  ],
  "analogy": "Mounting an NFS share is like adding a shared cloud folder to your computer's sidebar: it looks like a local folder, but every file opened really travels from another building. The _netdev option is like waiting until your phone has signal before opening that folder. Root squash is the front desk that refuses to treat any visitor as the building manager, no matter what badge they print at home. Where the analogy stops: NFS does not keep offline copies, so with a hard mount, work simply waits when the server is unreachable.",
  "terms": [
   [
    "NFS",
    "Network File System; a protocol for sharing directories from a server so clients can mount them over the network."
   ],
   [
    "Export",
    "A directory an NFS server makes available to clients."
   ],
   [
    "_netdev",
    "An fstab option marking a file system as network-dependent so it mounts after networking starts."
   ],
   [
    "Root squash",
    "An NFS server behavior that maps a client's root user to an unprivileged account, the default for exports."
   ],
   [
    "showmount -e",
    "Lists a server's exports using NFSv3 helper services; it may not work against an NFSv4-only server."
   ],
   [
    "Hard mount",
    "The default NFS behavior where operations retry until the server responds rather than failing."
   ]
  ],
  "example": "A task says to mount server1:/exports/projects at /projects at every boot. You create /projects, test with mount -t nfs server1:/exports/projects /projects, unmount, add server1:/exports/projects /projects nfs defaults,_netdev 0 0 to /etc/fstab, then run systemctl daemon-reload and mount -a to confirm.",
  "mistakes": [
   [
    "Opening the NFS service in the client's firewall to fix a failing mount.",
    "The client makes outbound connections; it is the server's firewall that must allow nfs. Check name resolution, the export path and the server's export list first."
   ],
   [
    "Concluding the server is broken because showmount -e fails.",
    "showmount relies on NFSv3 services. An NFSv4-only server may not answer it while mounts still work."
   ],
   [
    "Expecting findmnt to show type nfs after mounting with -t nfs.",
    "When version 4 is negotiated, findmnt and mount report nfs4. That is normal and correct."
   ],
   [
    "Treating files owned by nobody as a client-side permission bug.",
    "Root squash on the server maps client root to an unprivileged user. Create files as a regular user with matching UIDs, or ask the server administrator to adjust the export."
   ]
  ],
  "tryit": [
   [
    "You add server2:/srv/media /media nfs defaults 0 0 to fstab and the system boots, but sometimes the share is missing after startup and mount -a fixes it. What change makes boot ordering explicit, and what else do you run?",
    "Add _netdev so the line reads server2:/srv/media /media nfs defaults,_netdev 0 0. This tells systemd the mount needs the network, so it waits until networking is up. Then run systemctl daemon-reload, mount -a and findmnt --verify before the next reboot."
   ],
   [
    "mount -t nfs server1:/exports/Data /data fails with no such file or directory, but ping server1 works. The server administrator says the export is /exports/data. What is wrong and how could you have found the path yourself?",
    "The path is case sensitive, and Data is not data. You could run showmount -e server1 if the server offers NFSv3 services, or mount server1:/ on a temporary directory and browse it to see the exported paths."
   ]
  ],
  "tip": "Include _netdev on network mounts in /etc/fstab. It documents that the mount needs the network and keeps boot and shutdown ordering correct, and it is the option exam answers look for.",
  "check": [
   [
    "What is the device field for an NFS mount in /etc/fstab?",
    "The server name or address and exported path, written server:/path."
   ],
   [
    "Why might showmount -e fail against a working NFS server?",
    "It relies on NFSv3 services; a server offering only NFSv4 may not answer it, even though mounts work."
   ],
   [
    "Files you create on an NFS mount as root show up owned by nobody. Why?",
    "The server uses root squash, mapping client root to an unprivileged user."
   ],
   [
    "Which package provides the NFS client mount helper on RHEL?",
    "nfs-utils."
   ]
  ]
 },
 {
  "t": "Configuring autofs: /etc/auto.master.d/*.autofs, map files and wildcard (* and &) entries",
  "hook": "Cedar Hollow Community College has two hundred lab accounts, and every student's home directory lives on one NFS server. Last semester someone listed all two hundred home directories in `/etc/fstab` on each lab machine. Boot took several minutes, and on the morning the file server was down for maintenance, no lab machine would finish starting at all. Ravi, the lab coordinator, asks you to fix it before the new term. Students should get their home directory the moment they log in, and a sleeping file server should not block startup. Is there a way to do this with one or two lines instead of two hundred?",
  "simple": "autofs is a helper that waits until someone actually needs a folder before connecting it. Instead of attaching every shared folder when the computer starts, autofs watches a parent folder. When a user opens a path inside it, autofs quickly connects the right network share, and after a while of nobody using it, it disconnects again. You tell autofs what to watch in one small file and what to connect in another. A special shortcut lets one line cover every user: a star means any name, and an ampersand means put that same name here. It is like a hotel that only unlocks a room when its guest arrives.",
  "body": [
   "autofs is the automounter. Instead of mounting file systems at boot, it watches directories and mounts a file system the moment someone accesses a path under them, then unmounts it after a period of inactivity, five minutes by default on RHEL (Red Hat Enterprise Linux). It is the standard way to give users network home directories shared over NFS (Network File System): nothing is mounted until a user logs in or changes into the directory, and an unreachable server does not slow down boot. Because autofs mounts on demand, the paths it manages have no `/etc/fstab` lines at all. autofs can mount local devices too, but on the RHCSA it almost always manages NFS shares from a server, so the client needs the nfs-utils package as well as autofs.",
   "Setup has three parts. First, install and enable the service with `dnf install autofs` and `systemctl enable --now autofs`. Second, create a master map entry, preferably as a drop-in file whose name ends in `.autofs` under `/etc/auto.master.d/`. The main file `/etc/auto.master` includes that directory, so a drop-in keeps your change separate and easy to find. Each master map line names a base directory and the map file that controls it, and can optionally add default mount options. Third, write the map file itself, conventionally named `/etc/auto.something`.",
   "```\n# /etc/auto.master.d/guests.autofs   (master map drop-in)\n/rhome   /etc/auto.guests\n\n# /etc/auto.guests   (indirect map)\nuser1   -rw,sync   server1:/rhome/user1\n```",
   "A map file line has three columns: the key, optional mount options starting with a dash, and the location to mount. With the indirect map above, autofs owns `/rhome`. Accessing `/rhome/user1` mounts `server1:/rhome/user1` there, using NFS by default when the location is in server:/path form. Do not create `/rhome/user1` yourself; autofs creates the key directories on demand and removes them after unmounting. As a result `ls /rhome` looks empty until something is accessed, which surprises people but is normal. Test with `cd /rhome/user1` or `ls /rhome/user1`, then run `findmnt /rhome/user1` or `mount | grep rhome` to see the active NFS mount.",
   "Wildcards let one line cover every user. In the key column, `*` matches any name, and in the location column, `&` is replaced by the key that matched. So the line `* -rw,sync server1:/rhome/&` means that accessing `/rhome/alice` mounts `server1:/rhome/alice`, and accessing `/rhome/bob` mounts `server1:/rhome/bob`. This works as long as the directory names on the server match the names users will access, which is the usual layout for home directories. Options in the map line, such as `-rw,sync`, apply to every mount the wildcard creates. If the master map line also lists options, they act as defaults for the whole map, and options in the map file add to or override them.",
   "```\n# /etc/auto.guests   (wildcard indirect map)\n*   -rw,sync   server1:/rhome/&\n```",
   "There are two kinds of maps. An indirect map, as above, names a base directory in the master map and lists relative keys in the map file; it suits many mounts under one parent. A direct map uses the special base `/-` in the master map, and its map file lists full absolute paths as keys, for example `/mnt/docs -ro server1:/exports/docs`. Direct maps suit a few fixed mount points scattered across the tree. With a direct map, autofs places a trigger on each listed path, and the mount appears there when it is accessed.",
   "```\n# /etc/auto.master.d/docs.autofs\n/-   /etc/auto.direct\n\n# /etc/auto.direct   (direct map)\n/mnt/docs   -ro   server1:/exports/docs\n```",
   "After changing maps, run `systemctl restart autofs` (a reload also works for map changes). If a mount does not appear, troubleshoot in layers. Check `systemctl status autofs` to confirm the service is running and enabled. Read `journalctl -u autofs` for errors such as a missing map file. Confirm the master map drop-in really ends in `.autofs`, because files with other names in that directory are ignored. Test the server export with a manual `mount -t nfs` to a temporary directory to separate network problems from autofs problems. And check that you have not swapped the master map and map file names or put a full path where a relative key belongs.",
   "On the RHCSA (Red Hat Certified System Administrator) exam, the classic autofs task is home directories for network users: a base such as `/rhome` or `/home/guests`, a wildcard map with `rw` options, and a test by switching to a user with `su - username` and confirming that the shell lands in a mounted directory. Confirm with `pwd` and `findmnt` that the home directory really is the NFS share and not an empty local directory. The service must be enabled, not just started, so that it works after the reboot that precedes grading."
  ],
  "analogy": "autofs works like motion-sensor lights in a long hallway of offices. The master map says which hallway has sensors and which wiring plan controls them. The map file is the wiring plan: which light goes with which office. The wildcard line says every office lights up its own nameplate. Nothing burns power until someone walks in, and the light turns off after the room is empty a while. The analogy stops in one place: you cannot see dark offices at all; an idle autofs directory looks empty until you step into a specific room.",
  "terms": [
   [
    "autofs",
    "A service that mounts file systems automatically when a path is accessed and unmounts them when idle."
   ],
   [
    "Master map",
    "The top-level autofs configuration, in /etc/auto.master and /etc/auto.master.d/*.autofs, mapping base directories to map files."
   ],
   [
    "Indirect map",
    "A map whose keys are names relative to a base directory given in the master map."
   ],
   [
    "Direct map",
    "A map attached to the special base /- whose keys are absolute paths."
   ],
   [
    "Wildcard entry",
    "A map line with * as the key and & in the location, so any key name maps to a matching server path."
   ]
  ],
  "example": "Users ldapuser1 through ldapuser9 need home directories from server1:/home/guests mounted under /home/guests. You add /home/guests /etc/auto.guests to /etc/auto.master.d/guests.autofs, write * -rw,sync server1:/home/guests/& in /etc/auto.guests, enable autofs, and su - ldapuser5 lands in a mounted home directory.",
  "mistakes": [
   [
    "Creating the per-user directories under the autofs base, or adding fstab lines for them.",
    "autofs creates and removes key directories itself and needs no fstab entries. Pre-creating directories or adding fstab lines conflicts with it."
   ],
   [
    "Deciding autofs is broken because ls of the base directory shows nothing.",
    "An idle indirect base looks empty by design. Access a full path such as /rhome/alice to trigger the mount."
   ],
   [
    "Naming the master map drop-in guests.conf or guests.master.",
    "Only files ending in .autofs under /etc/auto.master.d/ are read."
   ],
   [
    "Swapping * and & in a wildcard line.",
    "The * goes in the key column to match any name; the & goes in the location to insert that matched name."
   ]
  ],
  "tryit": [
   [
    "You create /etc/auto.master.d/data.autofs containing /data /etc/auto.data, and /etc/auto.data containing * -rw server2:/srv/data/&. You restart autofs, but ls /data/reports says no such file or directory. A manual mount of server2:/srv/data/reports works. What do you check next?",
    "Confirm autofs actually loaded the map: check systemctl status autofs and journalctl -u autofs for errors, verify the map file path and name match exactly, and make sure /data is not also listed in /etc/fstab or already mounted. Also check for a typo such as a missing colon in the location."
   ],
   [
    "A task says a single NFS export, server1:/exports/manuals, must appear at /opt/manuals on demand, read-only, and nothing else under /opt should be controlled by autofs. Should you use a direct or indirect map? Write the two lines.",
    "Use a direct map, because an indirect map on /opt would take over the whole /opt directory. Master map drop-in: /- /etc/auto.direct. Map file: /opt/manuals -ro server1:/exports/manuals. Then restart autofs and test with ls /opt/manuals."
   ]
  ],
  "tip": "Do not create the subdirectories under an autofs base or add fstab lines for them. An empty ls of the base directory is expected; test by accessing the full path.",
  "check": [
   [
    "In the map line * -rw server1:/home/&, what does & mean?",
    "It is replaced by the key that * matched, so /base/alice mounts server1:/home/alice."
   ],
   [
    "What name must a master map drop-in file have?",
    "It must be in /etc/auto.master.d/ and end in .autofs."
   ],
   [
    "How does a direct map differ from an indirect map in the master map?",
    "A direct map uses /- as its base and lists absolute paths in its map file; an indirect map names a base directory and lists relative keys."
   ],
   [
    "What must you do so autofs mounts still work after a reboot?",
    "Enable the service, for example with systemctl enable --now autofs."
   ]
  ]
 },
 {
  "t": "Extending existing logical volumes and their file systems (lvextend -r, xfs_growfs, resize2fs)",
  "hook": "It is 3:15 a.m. at Bluefin Logistics, and the monitoring page says `/data` on the shipment-tracking server is 97 percent full. Sam on the night shift already ran `lvextend -L +5G` twenty minutes ago and reported it fixed. Yet `df -h` still shows the same size and the same 97 percent, and the database is starting to log write errors. `lvs` clearly shows the logical volume got bigger. So where did those five gigabytes go, and what single step was missed that would have made the space appear instantly, without unmounting anything?",
  "simple": "LVM lets you treat several disks as one big pool of space, then carve that pool into adjustable slices called logical volumes. On each slice sits a file system, which is what actually holds your files. Making more room is a two-step job. First you make the slice bigger. Then you tell the file system to spread out into the new room. If you skip the second step, the space exists but the file system does not know about it, like adding a room to your house but never opening the door to it. The command `lvextend -r` does both steps at once, which is why it is the safest habit.",
  "body": [
   "Growing storage without downtime is one of the main benefits of LVM (Logical Volume Manager). A logical volume (LV) takes space from its volume group (VG), and the volume group pools one or more physical volumes (PVs), which are disks or partitions prepared for LVM. Extending storage means two separate things: making the LV larger, and then making the file system on it use the new space. The LV is just a container of blocks; the file system has its own record of how big it is. Forget the second step and `df` still shows the old size even though `lvs` shows the new one.",
   "Start by checking free space in the volume group with `vgs`, where the VFree column shows unallocated space, or with `vgdisplay`, which shows Free PE / Size. If there is not enough, add a disk or partition to the group: `pvcreate /dev/vdc` initializes it, and `vgextend vg1 /dev/vdc` adds it to the pool. `vgs` should then show a larger VFree. Only then extend the LV. With `lvextend`, the `-L` option sets size in units, where `-L 2G` makes the LV 2 GiB in total and `-L +500M` adds 500 MiB to its current size. The `-l` option works in extents or percentages instead, and `-l +100%FREE` takes all remaining free space in the VG.",
   "```bash\nvgs                                  # check VFree\nlvextend -r -L +500M /dev/vg1/data   # grow LV and file system together\ndf -h /data                          # confirm new size\n```",
   "The `-r` option, long form `--resizefs`, is the simplest and safest choice. After growing the LV, it calls the right file system resize tool for you, whether the file system is XFS or ext4, and the output shows both steps: a line saying the logical volume was successfully resized, followed by the file system tool's own messages, such as the new data block count from XFS. Using `-r` every time removes the most common storage mistake on the exam in one stroke. It also works the same way regardless of file system type, so you do not need to remember which tool or argument each file system wants, and it refuses to proceed if something is wrong rather than leaving the two layers out of step.",
   "If you forgot `-r`, grow the file system yourself; nothing is lost and the LV is already big enough. For XFS, run `xfs_growfs` on the mount point, for example `xfs_growfs /data`. XFS must be mounted to grow, which is unusual but by design: the tool works through the mounted file system. With no size argument it grows to fill the whole device. For ext4, run `resize2fs /dev/vg1/data`, passing the device path. resize2fs grows ext4 online while it is mounted, and with no size argument it also fills the device.",
   "```bash\nlvextend -L +1G /dev/vg1/data   # LV only\nxfs_growfs /data                # XFS: pass the mount point\nresize2fs /dev/vg1/data         # ext4: pass the device\n```",
   "Watch the size wording in tasks, because it changes the command. Grow to 800 MiB means a total size of `-L 800M`; add 800 MiB, or grow by 800 MiB, means `-L +800M`. Units matter too: LVM's `M` and `G` mean mebibytes and gibibytes, powers of 1024. Sizes are also approximate, because LVM allocates space in whole physical extents, 4 MiB by default, and rounds a request up to the next extent. Graders usually accept a range around the requested size for this reason. Verify both layers afterward: `lvs` for the volume and `df -h` for the file system. Both must show the new size, though `df` will report slightly less than `lvs` because the file system uses some space for its own metadata.",
   "Swap on an LV is a special case, because swap is not a file system you can grow in place. Turn it off with `swapoff /dev/vg1/swap`, extend the LV with `lvextend`, recreate the swap signature with `mkswap /dev/vg1/swap`, and turn it back on with `swapon`. Running `mkswap` again generates a new UUID (Universally Unique Identifier), so if the fstab line uses `UUID=`, update it; a line using the LV path needs no change. Confirm with `swapon --show` or `free -h`. The same layered thinking applies everywhere in LVM: check the pool, grow the container, grow what lives inside it, then verify every layer you touched."
  ],
  "analogy": "Extending an LV without the file system is like a landlord knocking down a wall to make your apartment bigger, but leaving the furniture plan and the room count on the lease unchanged. The space physically exists, but no one uses it until the lease is updated. lvextend -r is the landlord who updates the lease in the same visit. xfs_growfs and resize2fs are the lease office you visit afterward if the landlord forgot. The analogy stops at shrinking: you cannot shrink XFS at all, which the next lesson covers.",
  "terms": [
   [
    "lvextend",
    "Increases the size of a logical volume, optionally resizing its file system with -r."
   ],
   [
    "xfs_growfs",
    "Grows a mounted XFS file system to fill its device; takes the mount point."
   ],
   [
    "resize2fs",
    "Resizes an ext2, ext3 or ext4 file system; it can grow online and shrink offline."
   ],
   [
    "Physical extent",
    "The fixed-size unit (4 MiB by default) in which LVM allocates space, so LV sizes round to multiples of it."
   ],
   [
    "vgextend",
    "Adds one or more initialized physical volumes to a volume group to increase its free space."
   ]
  ],
  "example": "The /data volume (XFS on /dev/vg1/data) must grow from 1 GiB to 1.5 GiB. vgs shows 2 GiB free, so you run lvextend -r -L 1.5G /dev/vg1/data. lvs shows 1.50g, and df -h /data reports roughly 1.5G, so both layers are done without unmounting.",
  "mistakes": [
   [
    "Running lvextend without -r and assuming the job is done because lvs shows the new size.",
    "The file system still has its old size. Run xfs_growfs on the mount point or resize2fs on the device, or use lvextend -r next time."
   ],
   [
    "Using -L 800M when the task says add 800 MiB.",
    "-L 800M sets the total size. Adding space needs a plus sign: -L +800M."
   ],
   [
    "Passing the device path to xfs_growfs and the mount point to resize2fs.",
    "xfs_growfs takes the mount point of the mounted XFS file system; resize2fs takes the device path."
   ],
   [
    "Unmounting the file system before growing it.",
    "Both XFS and ext4 grow while mounted. XFS actually requires being mounted to grow."
   ]
  ],
  "tryit": [
   [
    "A task says the logical volume /dev/vgapp/lvlogs, formatted ext4 and mounted at /logs, must be resized to between 760 MiB and 840 MiB. lvs shows it is 500 MiB, and vgs shows 100 MiB free. What do you do?",
    "There is not enough free space, so first add a PV: pvcreate on a spare disk or partition and vgextend vgapp with it. Then run lvextend -r -L 800M /dev/vgapp/lvlogs, aiming at the middle of the range. Confirm with lvs and df -h /logs that both show about 800 MiB."
   ],
   [
    "A colleague ran lvextend -L +2G /dev/vg1/web an hour ago. The volume is XFS mounted at /srv/web, and df -h still shows the old size. What single command fixes it without downtime?",
    "xfs_growfs /srv/web. The LV already has the space; XFS just needs to grow into it, which it does while mounted."
   ]
  ],
  "tip": "The most common failure is growing the LV but not the file system. Use lvextend -r every time, and check df -h, not just lvs, before moving on.",
  "check": [
   [
    "What is the difference between lvextend -L 2G and -L +2G?",
    "-L 2G sets the total size to 2 GiB; -L +2G adds 2 GiB to the current size."
   ],
   [
    "Which argument does xfs_growfs take and which does resize2fs take?",
    "xfs_growfs takes the mount point of the mounted XFS file system; resize2fs takes the device path."
   ],
   [
    "The volume group has no free space. What do you do before lvextend?",
    "Initialize a new disk or partition with pvcreate and add it to the group with vgextend."
   ],
   [
    "What does lvextend -l +100%FREE do?",
    "It grows the LV by all the remaining free space in its volume group."
   ]
  ]
 },
 {
  "t": "XFS can grow but not shrink; ext4 can do both when unmounted",
  "hook": "The finance team at Copperline Insurance overestimated last year, and the 20 GiB reports volume is barely a quarter full. Meanwhile, the archive volume in the same volume group is out of space, and there are no spare disks until next quarter. Aisha, your manager, asks the obvious question: can't you just take 10 GiB from reports and give it to archive this afternoon? You open a terminal and type `lsblk -f`. The answer depends entirely on what you see in the FSTYPE column for the reports volume. What happens if it says xfs, and what happens if it says ext4?",
  "simple": "Some file systems can only get bigger, and some can get bigger or smaller. XFS, the Red Hat default, is the first kind: you can add room to it any time, even while people are using it, but you can never make it smaller. ext4 is the second kind: you can add room while it is in use, and you can make it smaller too, but only after you stop using it (unmount it). When you shrink, the order is important. You first pack the files into a smaller space, then trim the container. Doing it the other way around is like cutting a box in half before moving the things out of the half you are cutting off.",
  "body": [
   "When you resize storage, the file system type decides what is possible. This is one of the most tested distinctions in RHCSA (Red Hat Certified System Administrator) storage tasks. XFS, the RHEL (Red Hat Enterprise Linux) default, can only get bigger. ext4 can get bigger while mounted, and it can get smaller, but only while unmounted. Knowing this lets you pick the right file system at creation time and avoid destroying data during a resize. Before any resize, run `lsblk -f` or `df -T` to confirm the type rather than assuming it. The type column in `/etc/fstab` is a useful clue, but the device itself is the authority.",
   "XFS was designed around large, growing data sets. `xfs_growfs` extends it while it is mounted and in use, which is why growing XFS is quick and painless. There is no tool to shrink XFS in place, and that is a design decision, not a missing feature you can install. If an XFS volume truly must become smaller, the only path is to back up the data, for example with `xfsdump` or `tar`, unmount it, reduce or recreate the logical volume, run `mkfs.xfs` again, restore the data, and update the UUID (Universally Unique Identifier) in `/etc/fstab` because mkfs generated a new one. On the exam that usually means you should not have chosen XFS for a volume the task says will shrink.",
   "ext4 grows online with `resize2fs` exactly as XFS grows with `xfs_growfs`. Shrinking requires more care, because the file system must be made smaller before the volume under it, never the other way around. A logical volume (LV) in LVM (Logical Volume Manager) has no idea which of its blocks hold data. If you cut the LV first, you chop off the end of the file system, along with any files stored there, and the file system's own metadata now describes blocks that no longer exist. The manual order is therefore: unmount, check, shrink the file system, then shrink the LV to match.",
   "```bash\numount /logs\ne2fsck -f /dev/vg1/logs          # required check before shrinking\nresize2fs /dev/vg1/logs 800M     # shrink file system first\nlvreduce -L 800M /dev/vg1/logs   # then the LV to match\nmount /logs\n```",
   "Each step has a reason. resize2fs refuses to shrink a file system that has not been freshly checked and prints a message asking you to run `e2fsck -f` first; the forced check ensures the metadata is consistent before blocks are moved. resize2fs then relocates any data sitting beyond the new end and writes the smaller size. Only after that is it safe for `lvreduce` to release the space at the end of the LV back to the volume group, where `vgs` will show it as VFree, ready for another volume to use.",
   "The safer shortcut is `lvreduce -r -L 800M /dev/vg1/logs`. The `-r` option, long form `--resizefs`, has LVM resize the file system in the correct order for you before reducing the LV, using a helper such as `fsadm`. It checks and shrinks the file system first, and it will unmount if needed or ask you to. Used on an XFS volume, `lvreduce -r` stops with an error because XFS cannot shrink, which protects you from destroying data. Without `-r`, `lvreduce` prints a warning that reducing the volume may destroy data and asks for confirmation; treat that prompt seriously, and answer yes only if you have already shrunk the file system yourself.",
   "There are limits even for ext4. You cannot shrink an ext4 file system below the space its data and metadata actually use, and `resize2fs` will refuse with an error saying the new size is smaller than the minimum. Leave comfortable headroom rather than shrinking to the bare minimum. Also note the asymmetry with growing: when growing, the volume goes first and the file system follows; when shrinking, the file system goes first and the volume follows. Always confirm with `df -h` and `lvs` afterward, and check that the data is still readable by listing or opening a few files.",
   "Putting it together for the Copperline-style request: if the reports volume is ext4, unmount it, run `lvreduce -r -L 10G` on it, remount it, then `lvextend -r` the archive volume with the freed space. If it is XFS, there is no shortcut; you either add a disk, or back up, recreate a smaller volume and restore, which means planned downtime."
  ],
  "analogy": "Think of XFS as a balloon: you can always blow more air in, but there is no valve to let air out without popping it and starting over. ext4 is more like a duffel bag with compression straps: you can let it expand, and you can cinch it smaller, but only after you stop carrying it and pack the contents tightly first. Cinching the straps before repacking would crush whatever sits at the end. The analogy stops at speed: ext4 shrinking is not quick, since data may need to be moved first.",
  "mnemonic": "Grow: Volume first, then FS. Shrink: FS first, then volume. Think of it as a mirror: shrink reverses grow.",
  "terms": [
   [
    "Shrink",
    "Reducing a file system and its volume to a smaller size; supported offline by ext4 and not at all by XFS."
   ],
   [
    "e2fsck -f",
    "Forces a full consistency check of an ext file system, required by resize2fs before shrinking."
   ],
   [
    "lvreduce",
    "Decreases the size of a logical volume; with -r it shrinks the file system first."
   ],
   [
    "fsadm",
    "A helper used by lvextend -r and lvreduce -r to resize the file system on a logical volume."
   ],
   [
    "xfsdump",
    "An XFS backup tool, used with xfsrestore when an XFS volume must be recreated at a smaller size."
   ]
  ],
  "example": "A colleague needs 300 MiB back from the ext4 /reports volume. You unmount it, run lvreduce -r -L -300M /dev/vg1/reports, which checks and shrinks the file system before the LV, then remount and confirm the files are intact. The same request on an XFS volume would mean back up, recreate and restore.",
  "mistakes": [
   [
    "Believing XFS can shrink if you unmount it first.",
    "XFS cannot shrink at all, mounted or not. The only route is back up, recreate smaller and restore."
   ],
   [
    "Running lvreduce first and resize2fs afterward.",
    "That cuts off the end of the file system and corrupts data. Shrink the file system first, or use lvreduce -r to get the order right."
   ],
   [
    "Trying to shrink a mounted ext4 file system.",
    "ext4 grows online but shrinks only while unmounted, after e2fsck -f."
   ],
   [
    "Answering yes to the lvreduce data warning without having resized the file system.",
    "That warning means the file system may still extend past the new end. Stop and use -r or shrink the file system first."
   ]
  ],
  "tryit": [
   [
    "A task says: create a logical volume for /scratch and format it so it can later be reduced in size without recreating it. A classmate formats it with mkfs.xfs because XFS is the default. Is that correct?",
    "No. XFS cannot shrink, so a later reduction would require backup, recreation and restore. Format it with mkfs.ext4, which can be shrunk while unmounted."
   ],
   [
    "You need to shrink the ext4 volume /dev/vg1/home from 2 GiB to 1.5 GiB. df -h shows 1.7 GiB used. What happens if you try, and what should you do?",
    "resize2fs will refuse, because 1.5 GiB is smaller than the space the data needs, and lvreduce -r will fail at that step. Free up or move data first, or pick a larger target size that leaves headroom."
   ]
  ],
  "tip": "Order is everything when shrinking: file system first, then logical volume. For growing it is the reverse: volume first, then file system. The -r option handles both orders for you.",
  "check": [
   [
    "Can you shrink a mounted ext4 file system?",
    "No. ext4 grows online but must be unmounted, and checked with e2fsck -f, before it can be shrunk."
   ],
   [
    "How do you reduce the size of an XFS volume?",
    "You cannot shrink XFS; back up the data, recreate a smaller LV and file system, and restore."
   ],
   [
    "Why is running lvreduce before resize2fs dangerous?",
    "It removes space the file system still thinks it owns, cutting off data at the end and corrupting the file system."
   ],
   [
    "What does lvreduce -r do on an XFS logical volume?",
    "It fails, because the file system resize step cannot shrink XFS, which prevents data loss."
   ]
  ]
 },
 {
  "t": "Diagnosing and correcting file permission problems (ls -l, namei -l, chmod, chown)",
  "hook": "A ticket arrives at Fernwood Public Schools' IT desk: the new attendance app cannot read its configuration file, and the service log just says Permission denied. Tomás, the developer, swears the file is readable because `ls -l` shows `-rw-r--r--`. He has already suggested `chmod 777` on everything under `/srv/app` to make the error go away before the morning bell. You suspect the file itself is fine and the problem is somewhere else along the path. What one command would show you exactly where access breaks, and what is the smallest fix that keeps the files safe?",
  "simple": "Every file on Linux has an owner, a group and three sets of permissions: one for the owner, one for the group, and one for everyone else. Each set says whether that person may read, write or run the file. Folders use the same letters but with slightly different meanings: to get into a folder at all, you need the run permission, called execute, on it. So to open a file deep inside several folders, you need that permission on every folder along the way, like needing a key for every door down a hallway, not just the last room. When someone is locked out, you walk the hallway door by door to find the locked one.",
  "body": [
   "When a user gets Permission denied, the cause is almost always one of a few things: the wrong owner or group on the file, missing permission bits on the file, or missing permission on a directory somewhere along the path. SELinux (Security-Enhanced Linux) and ACLs (access control lists) can also block access, but start with standard permissions because they are the first thing to inspect and the most common problem in exam tasks. A calm, step-by-step check almost always finds the cause in a minute.",
   "Every file has an owner, a group and three sets of bits: user (the owner), group and other. `ls -l` shows them as ten characters, such as `-rw-r-----`, where the first character is the type (`-` for a file, `d` for a directory, `l` for a symbolic link) and the next nine are the user, group and other sets. `ls -ld dir` shows a directory itself rather than its contents, which is what you want when checking a path. Linux checks only one set for any user: if you are the owner, the owner bits apply; otherwise if you are in the file's group, the group bits apply; otherwise the other bits apply. The checks stop at the first match, which means an owner with fewer rights than other is still restricted by the owner bits.",
   "Bits mean different things on directories, and this is where most real problems hide. On a directory, `r` lets you list the names inside, `w` lets you create, delete and rename entries (it only works together with `x`), and `x` lets you enter the directory and reach anything inside it by name. To open `/srv/app/conf/app.ini`, you need `x` on every directory in the path, from `/` down to `conf`, plus `r` on the file itself. A file with mode 644 is still unreadable if any parent directory denies `x` to that user. The `namei -l` command walks a path and shows the owner, group and mode of every component, which makes a missing `x` easy to spot.",
   "```bash\nnamei -l /srv/app/conf/app.ini\n# f: /srv/app/conf/app.ini\n# dr-xr-xr-x root root   /\n# drwxr-xr-x root root   srv\n# drwx------ root root   app      <- others cannot traverse\n# drwxr-xr-x app  app    conf\n# -rw-r----- app  app    app.ini\n```",
   "Read that output as a user would walk it. Anyone can pass `/` and `srv`. At `app`, only root has any access, so a user named alice stops there no matter how open the deeper levels are. If the requirement is that the app user can read the file, two things must be true: app must be able to pass `/srv/app`, and app must match the owner or group of `app.ini` with `r` set. Looking at the output, the file is fine for user app; the block is the `drwx------ root root` directory.",
   "Fix with the smallest change that meets the requirement. `chown user:group file` changes the owner and group together, `chown user file` changes only the owner, `chgrp group file` changes only the group, and `-R` applies the change recursively. `chmod` accepts symbolic modes like `g+rw` or `o-rwx`, and numeric modes like `750`, where each digit is the sum of r=4, w=2 and x=1 for user, group and other in that order. So 750 means rwx for the owner, r-x for the group and nothing for others. A capital `X` in `chmod -R g+rX dir` adds execute only to directories and to files that already have an execute bit for someone, which is ideal for opening a whole tree to a group without making every text file executable.",
   "```bash\nls -ld /srv/app                    # drwx------ root root\nchgrp app /srv/app                 # give the app group the directory\nchmod 750 /srv/app                 # owner rwx, group r-x, other none\nsudo -u app cat /srv/app/conf/app.ini\n```",
   "Test as the affected user, not as root, because root bypasses normal permission checks and a test as root proves nothing. Use `su - alice -c 'cat /srv/app/conf/app.ini'` or `sudo -u alice cat /srv/app/conf/app.ini`. Remember also that group membership changes take effect only in new login sessions, so a user added to a group with `usermod -aG` must log out and back in, or you must test with a fresh `su -`. Check membership with `id alice`.",
   "If permissions look right and access still fails, widen the search. A `+` after the mode in `ls -l`, as in `-rw-r-----+`, means an ACL exists; inspect it with `getfacl`, because an ACL mask can restrict group access. Then check SELinux: `ls -Z` shows the context, and denials appear in `/var/log/audit/audit.log` or through `ausearch -m AVC`, which searches for AVC (access vector cache) denial records. Avoid the quick fix `chmod 777`. It hides the real cause, lets every user on the system modify the file, and often fails exam tasks that check for specific modes."
  ],
  "analogy": "Reaching a file is like walking to an office deep inside a building. Each directory is a door that needs your badge to swipe through (the x bit), and reading the door's room list is a separate permission (r). The file is a locked cabinet in the last office. A cabinet left unlocked does not help if a hallway door three floors down rejects your badge. namei -l is the security guard's printout showing which door rejected you. The analogy stops with root, who in Linux simply walks through every standard door.",
  "mnemonic": "Read 4, Write 2, eXecute 1: add them per class in User, Group, Other order. 7 is rwx, 5 is r-x, 0 is nothing.",
  "terms": [
   [
    "namei -l",
    "Lists each component of a path with its owner, group and mode, used to find where traversal fails."
   ],
   [
    "Execute bit on a directory",
    "Permission to enter a directory and access entries inside it, needed on every directory in a path."
   ],
   [
    "chmod",
    "Changes permission bits using symbolic (u+x, g-w) or numeric (755) modes."
   ],
   [
    "chown",
    "Changes the owner, and optionally the group, of files with the form user:group."
   ],
   [
    "Capital X",
    "A chmod symbol that adds execute only to directories and files already executable by someone."
   ]
  ],
  "example": "Members of the devs group cannot read /opt/project/notes.txt even though the file is -rw-rw---- root:devs. namei -l shows /opt/project is drwx------, so the group cannot traverse it. You run chgrp devs /opt/project and chmod 750 /opt/project, and su - dev1 -c 'cat /opt/project/notes.txt' now works.",
  "mistakes": [
   [
    "Assuming a file with mode 644 is readable by everyone.",
    "Every parent directory must also grant x to that user. Check the whole path with namei -l."
   ],
   [
    "Thinking an owner gets other's permissions if those are more generous.",
    "Linux uses only the first matching class: owner, then group, then other. An owner with --- is denied even if other has r--."
   ],
   [
    "Testing access as root to confirm a fix.",
    "Root bypasses standard permission checks. Test with su - user -c or sudo -u user."
   ],
   [
    "Using chmod -R 777 or chmod -R g+x to open a tree.",
    "777 opens files to everyone, and g+x makes every file executable. Use the specific mode required, or g+rX for directories."
   ]
  ],
  "tryit": [
   [
    "User maria is in group finance. The file /data/finance/q3.xlsx is -rw-rw---- owned by root:finance. namei -l shows /data as drwxr-xr-x root root and /data/finance as drwxr-x--- root root. maria gets Permission denied. What is the cause and the smallest fix?",
    "maria is not the owner and the directory's group is root, so she falls into other on /data/finance, which has no x. Change the directory's group with chgrp finance /data/finance; its group bits r-x then let finance members enter and read. Test with su - maria -c 'cat /data/finance/q3.xlsx' or a similar read."
   ],
   [
    "You run usermod -aG webdev ken so he can edit files in /var/www/site, which is group webdev with mode 2775. Ken, still logged in, reports he still cannot save files. Permissions look correct. What is most likely going on?",
    "Group membership is read at login, so Ken's existing session does not include webdev yet. Have him log out and back in, or verify with id ken and test in a new session with su - ken. No permission change is needed."
   ]
  ],
  "tip": "Linux applies only the first matching class: owner, then group, then other. And access needs x on every parent directory, which namei -l reveals in one command.",
  "check": [
   [
    "A file is mode 644 but a user still gets Permission denied reading it. What do you check first?",
    "The directories in the path; the user needs execute permission on every one, which namei -l shows."
   ],
   [
    "What does chmod -R g+rX do differently from g+rx?",
    "Capital X adds execute only to directories and files that already have an execute bit, so regular files do not become executable."
   ],
   [
    "Why should you test access as the user instead of as root?",
    "Root bypasses standard permission checks, so a test as root proves nothing about what the user can do."
   ],
   [
    "What does mode 750 mean?",
    "Owner read, write and execute; group read and execute; others no access."
   ]
  ]
 },
 {
  "t": "Scheduling tasks with at, cron (crontab -e, /etc/cron.d) and systemd timer units (OnCalendar=, OnBootSec=)",
  "hook": "Grace runs IT for Lakeshore Veterinary Group, and she leaves you three sticky notes before her vacation. One: run a one-time cleanup of the old imaging folder tonight at 11 p.m., after the clinic closes. Two: the database export must run at 2:30 every weekday morning, forever. Three: a license-check script must run fifteen minutes after the server boots, every time it boots. All three are about running a command later, but each fits a different tool, and choosing the wrong one means a job that never fires, fires once, or fires as the wrong user. Which tool goes with which note?",
  "simple": "Linux has three ways to say do this later. The `at` command is like an alarm you set once: run this command at 11 tonight, then forget it. cron is like a repeating alarm: run this every weekday at 2:30, for as long as the schedule exists. systemd timers are a newer kind of repeating alarm that can also say things like fifteen minutes after the computer starts, and they keep a record of each run in the system log. Each tool has its own way of writing the time, so learning each format is the main skill. A small detail matters a lot: system-wide cron files need you to name which user runs the job.",
  "body": [
   "Red Hat Enterprise Linux (RHEL) gives you three ways to run commands later. `at` runs a job once at a set time. cron runs jobs repeatedly on a schedule. systemd timer units also run jobs on a schedule or relative to events such as boot, and they integrate with systemd's logging and service management. The exam may ask for any of them, so know the syntax and the verification command for each. The quick rule: one time means at, a repeating clock schedule means cron or a timer, and relative to boot means a timer.",
   "`at` needs the atd service running, so enable it with `systemctl enable --now atd` if it is not already. You give `at` a time and type the commands at its `at>` prompt, ending with Ctrl+D, or you pipe the commands in. Time formats are flexible: `now + 30 minutes`, `17:00 tomorrow`, `23:00`, or `noon`. `atq` lists pending jobs with their numbers and times, `at -c N` shows the full content of job N, and `atrm N` removes it. Jobs run with the environment of the user who queued them. Access can be limited with `/etc/at.allow` and `/etc/at.deny`, and cron has matching `/etc/cron.allow` and `/etc/cron.deny` files, so a user blocked by those files cannot schedule jobs at all.",
   "```bash\necho 'tar czf /tmp/etc.tgz /etc' | at now + 30 minutes\nat 17:00 tomorrow\natq\natrm 3\n```",
   "cron is run by the crond service. Each user edits their own table with `crontab -e`, which opens an editor and installs the table when you save; `crontab -l` lists it. As root you can manage another user's table with `crontab -e -u alice` and list it with `crontab -l -u alice`. A line has five time fields followed by the command: minute (0-59), hour (0-23), day of month (1-31), month (1-12) and day of week (0-7, where both 0 and 7 mean Sunday). An asterisk means every value, `*/15` means every 15th value, commas list values, and dashes give ranges. So `30 2 * * 1-5 /usr/local/bin/backup.sh` runs at 02:30 Monday through Friday, and `*/10 8-17 * * *` runs every ten minutes during the hours 8 through 17.",
   "System-wide jobs go in files under `/etc/cron.d/`, or in `/etc/crontab`. These use the same five time fields plus a sixth field naming the user to run as, placed between the schedule and the command, for example `0 * * * * root /usr/local/bin/cleanup.sh`. Forgetting that user field is a common mistake: cron then treats the first word of your command as the user name and the job silently fails. Scripts dropped into `/etc/cron.daily/`, `/etc/cron.weekly/` and `/etc/cron.monthly/` must be executable and are run by anacron, which catches up on jobs missed while the machine was powered off. cron job output is mailed to the owner if mail is configured, and the fact that a job started is logged in `/var/log/cron`.",
   "A systemd timer is a `.timer` unit that activates a matching `.service` unit; by default `backup.timer` starts `backup.service`. `OnCalendar=` sets wall-clock schedules such as `daily`, `weekly`, `Mon..Fri 02:30` or `*-*-* 02:30:00`, in the form day-of-week year-month-day hour:minute:second. Monotonic settings run relative to an event instead: `OnBootSec=15min` runs a set time after boot, and `OnUnitActiveSec=1h` repeats relative to the last time the service was activated. `Persistent=true` makes a missed calendar run happen at the next boot, similar to anacron.",
   "```ini\n# /etc/systemd/system/backup.timer\n[Unit]\nDescription=Nightly backup\n\n[Timer]\nOnCalendar=*-*-* 02:30:00\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n```",
   "The matching service needs no `[Install]` section because the timer starts it. A minimal version is a `[Service]` section with `Type=oneshot` and `ExecStart=/usr/local/bin/backup.sh`. After creating both files, run `systemctl daemon-reload` and then `systemctl enable --now backup.timer`; you enable and start the timer, not the service. Enabling the service instead does nothing useful, because without an `[Install]` section there is nothing to enable, and starting it just runs the job once.",
   "Verification differs per tool and is worth practicing. For at, use `atq`. For cron, use `crontab -l -u user` or `cat /etc/cron.d/file`, and check `/var/log/cron` after the scheduled time. For timers, `systemctl list-timers` shows each timer's next and last run, `systemd-analyze calendar 'Mon..Fri 02:30'` parses an expression and prints when it would next fire, which catches syntax errors before you rely on them, and `journalctl -u backup.service` shows the output of each run."
  ],
  "analogy": "Think of a kitchen. at is a sticky note on the fridge: do this once at 6 p.m., then it is thrown away. A personal crontab is your own wall calendar with repeating entries, so everything on it is obviously yours. /etc/cron.d is the shared staff calendar on the office wall, where each entry must say who is responsible. A systemd timer is a smart oven timer that can also start counting when the oven is switched on, and logs every time it went off. The analogy stops at persistence: only anacron and Persistent=true catch up on missed runs.",
  "mnemonic": "Cron field order: Minute, Hour, Day of month, Month, Weekday. My Hungry Dog Munches Wafers.",
  "terms": [
   [
    "at",
    "Schedules a one-time job, run by the atd service; atq lists and atrm removes jobs."
   ],
   [
    "crontab",
    "A per-user table of recurring jobs with five time fields and a command, edited with crontab -e."
   ],
   [
    "/etc/cron.d",
    "A directory of system cron files whose lines include a user field between the schedule and the command."
   ],
   [
    "Timer unit",
    "A systemd .timer file that starts a matching service on a calendar schedule (OnCalendar=) or after an event (OnBootSec=)."
   ],
   [
    "anacron",
    "Runs the daily, weekly and monthly cron directories and catches up on runs missed while the system was off."
   ],
   [
    "Persistent=true",
    "A timer setting that runs a missed OnCalendar job at the next boot."
   ]
  ],
  "example": "The task: user natasha must run /bin/echo hello every day at 14:23. As root you run crontab -e -u natasha and add 23 14 * * * /bin/echo hello, then confirm with crontab -l -u natasha. Because it is her crontab, no user field is needed.",
  "mistakes": [
   [
    "Putting a user name in a personal crontab line, or leaving it out of an /etc/cron.d file.",
    "Personal crontabs never have a user field. /etc/crontab and /etc/cron.d files always need one between the schedule and the command."
   ],
   [
    "Enabling the .service unit instead of the .timer.",
    "Enable and start the timer with systemctl enable --now name.timer; the timer starts the service on schedule."
   ],
   [
    "Reading the cron fields as hour then minute.",
    "The order is minute, hour, day of month, month, day of week. 23 14 * * * means 14:23."
   ],
   [
    "Using cron for run once tonight.",
    "A one-time job is what at is for. A cron line would repeat every day until someone removes it."
   ]
  ],
  "tryit": [
   [
    "A script /usr/local/bin/license-check.sh must run fifteen minutes after every boot and then every hour while the system is up. A colleague proposes an /etc/cron.d entry. What would you build instead, and with which settings?",
    "A systemd timer, because cron has no boot-relative schedule in this form. Create license-check.service with Type=oneshot and the ExecStart path, and license-check.timer with OnBootSec=15min and OnUnitActiveSec=1h plus WantedBy=timers.target. Then daemon-reload, systemctl enable --now license-check.timer, and confirm with systemctl list-timers."
   ],
   [
    "You find /etc/cron.d/report containing 0 6 * * 1 /usr/local/bin/weekly-report.sh. The report never runs, and /var/log/cron shows errors about an unknown user. What is wrong and how do you fix it?",
    "Files in /etc/cron.d need a user field. cron is reading /usr/local/bin/weekly-report.sh as the user name. Change the line to 0 6 * * 1 root /usr/local/bin/weekly-report.sh, or another appropriate user, so it runs at 06:00 every Monday."
   ]
  ],
  "tip": "Know which cron format needs a user field: personal crontabs never do, /etc/crontab and /etc/cron.d files always do. And remember to enable the .timer unit, not the .service, for systemd timers.",
  "check": [
   [
    "What does the cron schedule */10 8-17 * * 1-5 mean?",
    "Every 10 minutes from 08:00 through 17:50, Monday to Friday."
   ],
   [
    "How do you make a systemd timer start at boot and run on schedule?",
    "Create the .timer and matching .service, run systemctl daemon-reload, then systemctl enable --now name.timer."
   ],
   [
    "What does OnBootSec=10min do?",
    "It triggers the service ten minutes after the system boots."
   ],
   [
    "Which commands list and remove pending at jobs?",
    "atq lists them and atrm followed by the job number removes one."
   ]
  ]
 },
 {
  "t": "Starting and stopping services and configuring them to start at boot (systemctl enable --now, disable, mask)",
  "hook": "On Monday morning at Riverside Dental Partners, the appointment website is down again. Last Friday, Leo installed the web server, started it, tested the page, and went home pleased. Over the weekend the server rebooted for updates, and the web server simply never came back. Now the front desk is fielding calls, and Leo insists he did everything right because the service was definitely running when he left. He is half right. Two separate settings control a service on RHEL, and he changed only one of them. Which one did he miss, and how do you set both with a single command?",
  "simple": "A service is a program that runs quietly in the background, like a web server or a print server. systemd is the part of Linux that starts and stops these services. Every service has two independent switches. One switch says whether it is running right now. The other says whether it starts automatically when the computer boots. Turning on the first does not turn on the second, much like switching on a lamp today does not set its timer for tomorrow. The command `systemctl enable --now` flips both switches at once. There is also a stronger setting, mask, that unplugs the service completely so nothing can start it by accident.",
  "body": [
   "systemd is the init system and service manager on Red Hat Enterprise Linux (RHEL). It is the first process the kernel starts, and it starts and supervises everything else, organized as units. A service unit, with a name ending in `.service`, describes how to run a background program such as `sshd` or `httpd`. Two questions about any service are separate, and the exam tests both: is the service running right now, which systemd calls active, and will it start at boot, which systemd calls enabled? A service can be running but not enabled, which means it disappears after the reboot that graders perform before checking your work.",
   "`systemctl start`, `stop` and `restart` change the current state. `reload` asks a running service to reread its configuration without stopping, if the service supports it, which avoids dropping connections; `reload-or-restart` uses reload when available and restart otherwise. `systemctl status sshd` is the most informative single command: it shows a Loaded line ending with the enabled or disabled state and the vendor preset, an Active line such as `active (running) since ...`, the main PID (process ID), the control group of processes, and the most recent log lines. For scripts and quick checks, `systemctl is-active sshd` prints active or inactive, and `systemctl is-enabled sshd` prints enabled, disabled or masked.",
   "`systemctl enable httpd` makes a service start at boot. It reads the unit's `[Install]` section, usually `WantedBy=multi-user.target`, and creates a symbolic link in `/etc/systemd/system/multi-user.target.wants/` pointing at the unit file, so the service starts whenever that target is reached. The command prints a Created symlink line showing exactly that. `disable` removes those links. Neither changes the current state, which is why `enable --now` exists: it enables and starts in one command. Likewise `disable --now` disables and stops.",
   "```bash\nsystemctl enable --now httpd     # start now and at every boot\nsystemctl status httpd\nsystemctl disable --now cups     # stop now and at boot\nsystemctl mask cups              # block it entirely\nsystemctl unmask cups\nsystemctl list-units --type=service --state=running\nsystemctl list-unit-files --type=service\n```",
   "Masking is stronger than disabling. A disabled service can still be started manually by an administrator, or pulled in automatically as a dependency of another unit. `mask` creates a link from `/etc/systemd/system/name.service` to `/dev/null`, so systemd sees an empty unit and refuses to start it by any route; `systemctl start` on a masked unit fails with a message that the unit is masked. Nothing can start it until you `unmask` it. Use masking to keep conflicting services off, for example when two services would compete for the same port, or when policy says a service must never run. `systemctl mask --now` masks and stops in one step.",
   "Listing commands help you survey a system. `systemctl list-units --type=service` shows loaded services and their current state; add `--state=running` or `--state=failed` to filter, and `systemctl --failed` is a quick way to find broken units. `systemctl list-unit-files --type=service` shows every installed service file with its enablement state, such as enabled, disabled, static (no `[Install]` section, so it cannot be enabled directly and is started only by other units) or masked.",
   "If you edit a unit file or create a new one, run `systemctl daemon-reload` so systemd rereads its configuration; otherwise systemd keeps using the old version and may warn that the unit file changed on disk. Put your own units and overrides under `/etc/systemd/system/`, not `/usr/lib/systemd/system/`, because package updates overwrite the latter. `systemctl edit name` creates a drop-in override safely and reloads for you. A drop-in is a small file under a directory such as `/etc/systemd/system/httpd.service.d/` that changes only the settings you list, leaving the vendor file untouched.",
   "When a service fails to start, `systemctl status name` and `journalctl -u name` usually reveal the reason within a few lines: a configuration syntax error, a port already in use by another service, a missing file, or an SELinux denial. Fix the cause and start it again. Finally, remember that some services are activated through another unit. A socket-activated service is enabled through its `.socket` unit, and a scheduled job through its `.timer` unit, so the task wording tells you which unit to enable. Before you move on from any service task, run `systemctl is-active` and `systemctl is-enabled` on the unit, or read both values from `systemctl status`. Two short checks confirm that the service is running now and will survive the reboot that comes before grading."
  ],
  "analogy": "Think of a coffee machine in an office. start is pressing the brew button now. enable is programming the machine to brew automatically every morning. Pressing the button does not program the timer, and programming the timer does not brew a cup now; enable --now does both. disable clears the morning program, but anyone can still press the button. mask is unplugging the machine and taping over the outlet: nobody, not even another appliance that wants coffee, can start it until the tape comes off.",
  "terms": [
   [
    "Unit",
    "An object managed by systemd, such as a .service, .socket, .timer, .mount or .target."
   ],
   [
    "enable --now",
    "Configures a unit to start at boot and starts it immediately in one command."
   ],
   [
    "mask",
    "Links a unit to /dev/null so it cannot be started manually or as a dependency until unmasked."
   ],
   [
    "daemon-reload",
    "Makes systemd reread unit files after they are created or changed."
   ],
   [
    "Active versus enabled",
    "Active means running now; enabled means configured to start at boot. Each is set independently."
   ]
  ],
  "example": "After installing httpd you run systemctl start httpd and the web page works. That is not enough for the exam: after reboot httpd is stopped. Running systemctl enable --now httpd, then checking that is-enabled prints enabled and is-active prints active, makes the result survive the reboot.",
  "mistakes": [
   [
    "Starting a service and assuming it will come back after reboot.",
    "start affects only the current state. Use enable as well, or enable --now to do both."
   ],
   [
    "Enabling a service and assuming it is now running.",
    "enable only creates boot-time links. Add --now or run start."
   ],
   [
    "Using disable to guarantee a service never runs.",
    "A disabled service can still be started manually or as a dependency. Use mask to block it completely."
   ],
   [
    "Editing a unit file and restarting without daemon-reload.",
    "systemd keeps the old definition until daemon-reload runs, so your change may be ignored."
   ]
  ],
  "tryit": [
   [
    "Policy says the cups printing service must never run on a server, even if another package tries to pull it in. Currently it is active and enabled. What command or commands meet the policy, and how do you verify?",
    "Run systemctl mask --now cups, or systemctl disable --now cups followed by systemctl mask cups. Masking blocks manual starts and dependency starts. Verify with systemctl is-enabled cups, which prints masked, and systemctl is-active cups, which prints inactive."
   ],
   [
    "You change the ExecStart= line in /etc/systemd/system/inventory.service to point at a new script, then run systemctl restart inventory. The service still runs the old script, and systemctl status shows a warning that the unit file changed on disk. What step did you skip?",
    "systemctl daemon-reload. systemd keeps the definition it loaded earlier until told to reread unit files. Run daemon-reload, restart the service, and confirm the new command in systemctl status inventory."
   ]
  ],
  "tip": "Enabled and active are independent. Exam answers that only start a service, or only enable it, are both incomplete; enable --now covers both.",
  "check": [
   [
    "What is the difference between disable and mask?",
    "disable removes boot-time links but the unit can still be started manually or by dependencies; mask links it to /dev/null so it cannot start at all."
   ],
   [
    "You edited /etc/systemd/system/app.service. What must you run before restarting it?",
    "systemctl daemon-reload, so systemd rereads the unit file."
   ],
   [
    "Which single command stops a service and prevents it starting at boot?",
    "systemctl disable --now name."
   ],
   [
    "What does is-enabled print for a unit that has no [Install] section?",
    "static, meaning it cannot be enabled directly and runs only when another unit starts it."
   ]
  ]
 },
 {
  "t": "Setting the default boot target (systemctl get-default, set-default)",
  "hook": "The new build server at Kestrel Robotics was installed from the workstation profile, so every time it starts, it loads a full graphical desktop that nobody ever looks at. It sits in a rack with no monitor attached, and Hana from the platform team points out that the login screen alone is using memory the compilers could use. She asks you to make the machine boot straight to a text console from now on, and, if possible, to drop the desktop right now without a reboot because a build is about to start. Two different commands do those two jobs. Which is which?",
  "simple": "When a Linux computer starts, it aims for a goal called a target. One common goal is text mode with all the background services running, called `multi-user.target`. Another adds a graphical login screen on top, called `graphical.target`. The default target is simply which goal the computer heads for every time it boots. You can ask which one it uses, change it for future boots, or switch the running machine to a different goal right now. Think of a car's navigation: setting your home address changes where future trips go, while taking a detour changes only today's drive.",
  "body": [
   "A systemd target is a unit, with a name ending in `.target`, that groups other units to represent a system state. Targets replace the numbered runlevels of the older SysV init system. At boot, systemd starts the default target and everything it depends on, pulling in services, mounts and other targets in the right order. The two targets you will set most often are `multi-user.target`, a full system with networking and services but only a text console, and `graphical.target`, which includes everything in multi-user and adds a graphical login manager on top. Servers usually use multi-user; desktops and workstations use graphical.",
   "`systemctl get-default` prints the current default, for example `graphical.target`. `systemctl set-default multi-user.target` changes it. Behind the scenes, the default is a symbolic link, `/etc/systemd/system/default.target`, pointing to the chosen target's unit file, and `set-default` simply removes and recreates that link, printing a Removed line and a Created symlink line so you can see exactly what changed. You could create the link by hand with `ln -sf`, but `set-default` is clearer and less error-prone. The change applies at the next boot; the running system is not affected.",
   "```bash\nsystemctl get-default\nsystemctl set-default multi-user.target\n# Created symlink /etc/systemd/system/default.target -> .../multi-user.target\nsystemctl isolate multi-user.target   # switch now, without rebooting\n```",
   "To change the current state immediately, use `systemctl isolate target`. It starts the units the target needs and stops every unit not required by it. Only targets that allow isolation, marked with `AllowIsolate=yes` in their unit file, can be used this way; the main ones such as multi-user, graphical, rescue and emergency all do. Switching from graphical to multi-user with isolate stops the display manager and ends any graphical session, so run it from a text console or an SSH (Secure Shell) session, and save any work in the desktop first. Isolate does not change the default, so after a reboot the system returns to whatever `get-default` reports.",
   "You can see what a target pulls in with `systemctl list-dependencies multi-user.target`, which prints a tree of the services and targets it wants. Comparing that with graphical.target shows that graphical simply adds the display manager on top of multi-user. `systemctl list-units --type=target` shows which targets are active right now, which is a handy way to confirm the effect of an isolate. Note that switching the default to graphical.target only helps if the graphical packages and a display manager are installed; on a minimal server, the target exists but there is no login screen for it to start. In that case the system still reaches the multi-user services, and you install the desktop packages first if a graphical login is truly required.",
   "Other targets matter for recovery. `rescue.target` gives a single-user root shell with local file systems mounted and basic system services running, but no networking. `emergency.target` gives an even more minimal shell in which the root file system is mounted read-only and almost nothing else is started, which helps when fstab problems or broken services stop a normal boot. You can choose one of these for a single boot without changing the default. At the GRUB (GRand Unified Bootloader) boot menu, press e to edit the selected entry, move to the line beginning with `linux`, append `systemd.unit=rescue.target` to the end, and press Ctrl+X to boot. The edit is not saved, so the next boot uses the normal default again.",
   "Old runlevel names still exist as aliases for compatibility, such as `runlevel3.target` for multi-user and `runlevel5.target` for graphical, and you may see them in older documentation or scripts. `systemctl set-default runlevel3.target` resolves to multi-user, but on the exam, use the real target names, because they are clearer and match what `get-default` prints. After setting a default, verify it with `systemctl get-default`; graders often check exactly that output, and a typo in the target name makes `set-default` fail with an error rather than silently succeeding.",
   "A good workflow for a task like the Kestrel request is therefore: `systemctl set-default multi-user.target` so every future boot goes to text mode, `systemctl get-default` to confirm, and optionally `systemctl isolate multi-user.target` from an SSH session to drop the desktop now. If the task asks only that the system boot into a particular target, set-default alone is the required change; isolate is a convenience that affects only the current session."
  ],
  "analogy": "Setting the default target is like setting the default floor on a hotel elevator that always opens at the lobby each morning: set-default changes which floor it returns to after every reset. isolate is pressing a button to go to a floor right now, sending everyone off at that level; it does not change the morning default. Rescue and emergency are the service floors maintenance staff use for one trip. The analogy stops at isolate's side effect: it also stops units the new target does not need.",
  "terms": [
   [
    "Target",
    "A systemd unit that groups other units to define a system state, replacing runlevels."
   ],
   [
    "multi-user.target",
    "A full non-graphical system state with networking and services, the usual default for servers."
   ],
   [
    "graphical.target",
    "multi-user.target plus a graphical login manager."
   ],
   [
    "isolate",
    "A systemctl command that switches the running system to a target, stopping units not required by it."
   ],
   [
    "default.target",
    "The symbolic link in /etc/systemd/system that points to the target systemd starts at boot."
   ],
   [
    "rescue.target",
    "A single-user recovery state with local file systems mounted and no networking."
   ]
  ],
  "example": "A server boots to a graphical login and wastes memory. You run systemctl set-default multi-user.target, check that get-default prints multi-user.target, and optionally run systemctl isolate multi-user.target to switch now instead of waiting for the next reboot.",
  "mistakes": [
   [
    "Using systemctl isolate to make a system boot into text mode permanently.",
    "isolate changes only the running state. Use set-default to change what happens at every boot."
   ],
   [
    "Expecting set-default to switch the running system immediately.",
    "set-default replaces the default.target link for the next boot. Use isolate if you also need the change now."
   ],
   [
    "Confusing rescue.target with emergency.target.",
    "Rescue mounts local file systems and starts basic services; emergency mounts only the root file system read-only and starts almost nothing."
   ],
   [
    "Answering with runlevel numbers or init commands on a RHEL system.",
    "Runlevel targets are only compatibility aliases. Use target names with systemctl, such as multi-user.target."
   ]
  ],
  "tryit": [
   [
    "A task says: configure the system so that it boots into a graphical login by default. systemctl get-default currently prints multi-user.target, and the graphical packages are installed. You are connected over SSH. What do you run, and do you need to reboot to complete the task?",
    "Run systemctl set-default graphical.target and confirm with systemctl get-default. No reboot is needed to satisfy the requirement, because the default is what was asked for; the graders' reboot will use it. You could isolate graphical.target to test it, but that is optional."
   ],
   [
    "A server keeps hanging during boot while starting a misbehaving network service, and you cannot reach it over SSH. You have console access with the GRUB menu. How do you get a root shell without changing the default target for future boots?",
    "At the GRUB menu press e, append systemd.unit=rescue.target to the linux line, and press Ctrl+X. Rescue mode does not start networking, so the bad service is avoided, and the edit is used for this boot only. Fix or disable the service, then reboot normally."
   ]
  ],
  "tip": "set-default changes the next boot only; isolate changes the current state only. A task that says the system must boot into a text console needs set-default.",
  "check": [
   [
    "Which file does systemctl set-default change?",
    "It replaces the /etc/systemd/system/default.target symlink to point to the chosen target."
   ],
   [
    "How do you boot into rescue.target once without changing the default?",
    "Edit the kernel line in the GRUB menu and append systemd.unit=rescue.target, then boot with Ctrl+X."
   ],
   [
    "What is the difference between multi-user.target and graphical.target?",
    "graphical.target includes everything in multi-user.target plus a graphical display manager for login."
   ],
   [
    "Does systemctl isolate change the default target?",
    "No. It switches the running system only; the next boot still uses the default shown by get-default."
   ]
  ]
 },
 {
  "t": "Configuring time service clients with chronyd (/etc/chrony.conf, chronyc sources) and timedatectl",
  "hook": "It is 2 a.m. at Bramblewood Insurance, and Theo on the night shift is chasing a failed login storm across three servers. He lines up the logs side by side and something feels wrong: the web server says the first failure happened at 01:52, the authentication server says 01:58, and the database says 01:49. Did the attack move backward in time, or are the clocks simply wrong? Worse, users on one server are now getting ticket errors because its clock has drifted too far from the others. Theo knows the fix involves the time service, but which file does he edit, and how does he prove the server is really synchronized?",
  "simple": "Every computer has a clock, and like a cheap wall clock it slowly runs fast or slow. To stay correct, computers ask special time servers on the network what time it is and gently adjust themselves. On RHEL, the program that does this asking is called chronyd. You tell it which time servers to ask by writing their names in a settings file, /etc/chrony.conf. Then you can ask chronyd how it is doing with the command chronyc sources, which lists the servers and marks the one it trusts with an asterisk. A second tool, timedatectl, is the control panel for the clock: it shows the time and time zone and switches automatic network time on or off. Think of it like setting your watch by the station clock every morning.",
  "body": [
   "Accurate time matters more than it seems. Logs from different systems must line up when you troubleshoot, Kerberos authentication and many TLS (Transport Layer Security) certificate checks fail when clocks drift too far apart, and scheduled jobs run at the wrong moment. RHEL (Red Hat Enterprise Linux) keeps time with chrony, an implementation of NTP (Network Time Protocol). The daemon is `chronyd`, it reads its configuration from `/etc/chrony.conf`, and you query it with the companion command `chronyc`. On the RHCSA (Red Hat Certified System Administrator) exam, a typical task is short: make this system a time client of a named server and make sure it stays that way after reboot.",
   "The configuration file names time sources. A `server` line names one NTP server. A `pool` line names a DNS (Domain Name System) name that resolves to several servers, and chronyd uses a handful of them. The `iburst` option sends a quick burst of requests at startup so the clock synchronizes within seconds rather than minutes. To point a client at a specific server, comment out the default pool line and add your own `server` line. The other lines in the default file, such as `driftfile`, which records how fast the local clock tends to drift, and `makestep`, which allows the clock to be stepped (jumped) instead of slowly slewed when it is far off during the first few updates, can normally stay as they are.",
   "```\n# /etc/chrony.conf\n#pool 2.rhel.pool.ntp.org iburst\nserver classroom.example.com iburst\ndriftfile /var/lib/chrony/drift\nmakestep 1.0 3\n```",
   "Configuration changes take effect only when the daemon rereads the file. After editing, restart the service with `systemctl restart chronyd` and make sure it starts at boot with `systemctl enable chronyd` (on most installs it is already enabled). Then check with `chronyc sources -v`. The `-v` flag prints a legend that explains every column, which is helpful when you are under exam pressure. The first character, `^`, means the source is a server. The second character is the state: `^*` marks the source currently selected for synchronization, `^+` marks acceptable candidates that are combined with the selected one, and `^?` means the source is unreachable or has not yet been evaluated. A freshly restarted daemon may show `^?` for a few seconds before settling on `^*`.",
   "For more detail, `chronyc tracking` shows the reference server, the stratum (how many hops the system is from a reference clock), the current offset between the system clock and true time, and whether the leap status is normal. If the offset is small and the leap status says Normal, the client is healthy. These two commands together, `chronyc sources` for which server and `chronyc tracking` for how well, are your verification step.",
   "`timedatectl` is the general systemd tool for clock settings. Plain `timedatectl` shows local time, UTC (Coordinated Universal Time), the RTC (real-time clock, the hardware clock), the time zone, whether the NTP service is active and whether the system clock is synchronized. `timedatectl set-timezone Europe/Berlin` sets the zone, and `timedatectl list-timezones` lists valid names so you do not have to guess the spelling. `timedatectl set-ntp true` enables network time, which on RHEL starts and enables chronyd. `timedatectl set-ntp false` stops it, which you need before you can set the clock by hand with `timedatectl set-time`, because the tool refuses manual changes while synchronization is active.",
   "```bash\ntimedatectl set-timezone America/New_York\ntimedatectl set-ntp true\nsystemctl restart chronyd\nchronyc sources -v\ntimedatectl        # System clock synchronized: yes\n```",
   "Notice the separation of jobs. The time zone only changes how time is displayed; it does not change the underlying UTC clock and has nothing to do with which server you synchronize to. The server list lives only in `/etc/chrony.conf`. Mixing these up is a common source of wrong answers: setting the zone will not fix a clock that is minutes off, and adding a server will not fix a clock that shows the wrong hour because of the zone.",
   "When a source never reaches `^*`, troubleshoot from the bottom up. Check that the server name resolves with `getent hosts classroom.example.com`, that the network path works, and that UDP (User Datagram Protocol) port 123 is not blocked between the client and the server. A client does not need a local firewall opening for NTP, because it initiates the requests and the replies are allowed back as related traffic. Only a system that serves time to others, using an `allow` directive in its own chrony.conf, needs the ntp service opened in firewalld."
  ],
  "analogy": "Think of chronyd as a careful person who sets their watch by asking a few trusted station clocks. The `server` lines are the list of station clocks to ask, `iburst` is asking several times quickly when you first arrive, and the asterisk in `chronyc sources` is the clock they decided to trust. The time zone is just which city name is printed on the watch face. The analogy stops working in one way: chronyd usually adjusts the clock gradually rather than resetting it in one jump, unless `makestep` allows a step.",
  "terms": [
   [
    "NTP",
    "Network Time Protocol, used to synchronize clocks with time servers over the network on UDP port 123."
   ],
   [
    "chronyd",
    "The RHEL NTP daemon, configured in /etc/chrony.conf and queried with chronyc."
   ],
   [
    "iburst",
    "A chrony server option that sends several quick requests at startup to synchronize faster."
   ],
   [
    "timedatectl",
    "A systemd tool to view and set the time, time zone and whether NTP synchronization is on."
   ],
   [
    "Stratum",
    "The distance, in hops, between a system and a reference clock; shown by chronyc tracking."
   ],
   [
    "UTC",
    "Coordinated Universal Time, the time standard the system clock keeps internally regardless of time zone."
   ]
  ],
  "example": "A task asks you to make the system a time client of classroom.example.com. You comment out the pool line in /etc/chrony.conf and add server classroom.example.com iburst, run systemctl enable chronyd and systemctl restart chronyd, and after a short wait chronyc sources shows ^* classroom.example.com. timedatectl now reports System clock synchronized: yes.",
  "mistakes": [
   [
    "Fixing a clock that is minutes off by changing the time zone.",
    "The time zone only changes how UTC is displayed. A clock that is minutes off needs a working NTP source in /etc/chrony.conf and a restarted chronyd."
   ],
   [
    "Editing /etc/chrony.conf and assuming the change is live.",
    "chronyd reads the file at startup. Run systemctl restart chronyd, then confirm with chronyc sources."
   ],
   [
    "Opening UDP 123 in the client's firewall to make synchronization work.",
    "A client starts the conversation, so replies are allowed back automatically. Only a system that serves time to others needs the ntp service opened."
   ],
   [
    "Treating ^+ as the synchronized source.",
    "^+ is an acceptable candidate. Only ^* marks the source chronyd has selected for synchronization."
   ]
  ],
  "tryit": [
   [
    "You are told to set the time zone of serverb to Asia/Tokyo and make it synchronize with time.lab.example.com. After editing chrony.conf and running timedatectl set-timezone Asia/Tokyo, chronyc sources shows ^? time.lab.example.com even after a minute. What do you check, in what order?",
    "First confirm you restarted chronyd after editing the file. Then check that the name resolves with getent hosts time.lab.example.com, then that the server is reachable and UDP port 123 is not blocked on the path. The time zone change is unrelated to the ^? state, because it only affects display."
   ],
   [
    "A colleague needs to set the clock manually to a specific date for a test, but timedatectl set-time returns an error about automatic time synchronization. What should they do?",
    "Run timedatectl set-ntp false first, which stops chronyd, then set the time. Afterward, run timedatectl set-ntp true so the system returns to network time."
   ]
  ],
  "tip": "In chronyc sources output, the asterisk after the caret marks the source you are actually synchronized to. No asterisk means the configuration is not working yet, so check the restart, name resolution and reachability before moving on.",
  "check": [
   [
    "Which line would you add to /etc/chrony.conf to use ntp1.example.com?",
    "server ntp1.example.com iburst, then restart chronyd so it rereads the file."
   ],
   [
    "What does timedatectl set-ntp true do on RHEL?",
    "It turns on network time synchronization by enabling and starting chronyd."
   ],
   [
    "In chronyc sources output, what does ^? mean?",
    "The source is unreachable or has not yet been evaluated."
   ],
   [
    "Which command shows the current offset and stratum?",
    "chronyc tracking."
   ]
  ]
 },
 {
  "t": "Installing and updating packages from the Red Hat CDN, a remote repository or the local file system",
  "hook": "Rosa at Copperfield Community College has a new lab server to build before the semester starts on Monday. The machine sits on an isolated network with no route to the internet. Her instructions say: install the web server, the database client and a monitoring tool from the internal package mirror, and use the installation DVD for anything the mirror lacks. She types `dnf install httpd` and gets back a flat message that there is no match, because no repositories are enabled. Every later step depends on fixing this first. Where does dnf look for packages, and how does Rosa tell it where to look?",
  "simple": "On RHEL, software comes in bundles called packages. A tool named dnf installs them for you. dnf does not search the whole internet; it only looks in repositories, which are organized shelves of packages that you have told it about. A repository might be Red Hat's own online service, a server your company runs, or a DVD mounted on the machine. You describe each shelf in a small text file ending in .repo, giving it a name and its location. Once dnf knows the shelves, installing is one command, and dnf also fetches any other packages the program needs to run, the way a recipe app adds every ingredient to your shopping list, not just the one you asked for.",
  "body": [
   "RHEL (Red Hat Enterprise Linux) installs software as RPM (RPM Package Manager) packages and manages them with `dnf`. dnf reads repositories, which are collections of packages plus metadata describing what each package contains and needs. From that metadata it resolves dependencies and installs everything required, in the right order. Repositories can come from the Red Hat CDN (content delivery network) after the system is registered, from a remote server your organization runs, or from local media such as the installation DVD. The RHCSA (Red Hat Certified System Administrator) objective covers all three.",
   "Start with the everyday commands, because you will use them in almost every exam task. `dnf install httpd` and `dnf remove httpd` add and remove software. `dnf update` (or its synonym `dnf upgrade`) applies all available updates, while `dnf update kernel` updates just one package. `dnf search keyword` finds packages by name and summary, `dnf info pkg` describes one, and `dnf provides /usr/sbin/semanage` tells you which package contains a file, which is the fastest way to find the package behind a missing command. `dnf list installed` shows what is present. `dnf repolist` shows enabled repositories and `dnf repolist all` includes disabled ones. Groups install related sets of packages: `dnf group list` shows them and `dnf group install 'Server'` installs one.",
   "On a registered RHEL system, the CDN repositories are configured for you. subscription-manager writes them into `/etc/yum.repos.d/redhat.repo`, and the two you use most are BaseOS and AppStream. BaseOS holds the core operating system, the packages needed for a minimal working system. AppStream holds applications, programming languages, databases and other user-space software. Many tasks need packages from both, so an exam repository setup usually gives you two addresses.",
   "Exam systems often have no CDN access, and you are told to use a repository at a given address instead. Create a file ending in `.repo` in `/etc/yum.repos.d/`. Each section starts with a unique repository ID in brackets, followed by a `name`, a `baseurl`, `enabled=1` and GPG (GNU Privacy Guard) settings. With `gpgcheck=1`, dnf verifies each package signature against a key you name with `gpgkey=`, which protects you from tampered packages. Set `gpgcheck=0` only when the task tells you to, and know that it trades safety for convenience.",
   "```ini\n# /etc/yum.repos.d/local.repo\n[BaseOS-local]\nname=BaseOS from DVD\nbaseurl=file:///mnt/dvd/BaseOS\nenabled=1\ngpgcheck=0\n\n[AppStream-local]\nname=AppStream from DVD\nbaseurl=file:///mnt/dvd/AppStream\nenabled=1\ngpgcheck=0\n```",
   "For a remote repository, the `baseurl` simply uses the web address you were given instead of the `file:///` form. Copy it exactly, including the path to the directory that contains the `repodata` folder. `dnf config-manager --add-repo` followed by that address can generate a basic .repo file for you; open it afterward to confirm the address and to add `gpgcheck` settings as the task requires. For the DVD, mount it first. With an ISO file, use `mount -o loop rhel.iso /mnt/dvd`, and add a line to `/etc/fstab` if the repository must survive a reboot, otherwise dnf finds an empty directory after the grader restarts the machine.",
   "Always verify right away. Run `dnf clean all` to discard cached metadata, then `dnf repolist` to confirm that dnf sees each repository and reports a package count. If a repository is missing or shows an error, the usual causes are a file that does not end in `.repo`, a duplicate or missing ID in brackets, a typo in `baseurl`, or a `baseurl` that points one directory too high or too low. Checking now saves you from discovering the problem halfway through a later task.",
   "Updates follow the same repositories. `dnf check-update` lists packages with newer versions available without installing anything, `dnf update` applies them all, and `dnf history` shows past transactions with an ID for each, so you can see what changed and, if needed, undo a transaction with `dnf history undo` followed by its ID. A kernel update installs a new kernel alongside the old one rather than replacing it, which is why the boot menu keeps a fallback entry.",
   "Sometimes the package is already on disk as a file. `dnf install ./package.rpm` installs it and still pulls any dependencies from enabled repositories. The `./` matters, because without a path dnf treats the word as a package name to look up. The low-level `rpm` tool is best for queries about installed software: `rpm -qa` lists everything, `rpm -qi pkg` shows details, `rpm -ql pkg` lists its files, `rpm -qf /path` names the package that owns a file, and `rpm -qc pkg` lists its configuration files. Avoid `rpm -i` for installs, because it does not resolve dependencies and simply fails when one is missing."
  ],
  "analogy": "dnf is like a librarian who only fetches books from the shelves listed in the library catalog. A .repo file adds a shelf to the catalog: here is its name, here is where it is, and here is whether to check the publisher's seal. Ask for a book on an unlisted shelf and the librarian says no match. The analogy breaks in one helpful way: when you borrow one book, this librarian also brings every other book it depends on.",
  "terms": [
   [
    "dnf",
    "The RHEL package manager that installs, updates and removes RPM packages and resolves dependencies from repositories."
   ],
   [
    ".repo file",
    "A file in /etc/yum.repos.d/ that defines repositories with an ID, name, baseurl, enabled and gpgcheck settings."
   ],
   [
    "BaseOS and AppStream",
    "The two main RHEL repositories: core operating system packages, and applications and runtimes."
   ],
   [
    "GPG check",
    "Verification of a package's signature against a trusted key before installing it."
   ],
   [
    "baseurl",
    "The repository location, either a web address or a file:/// path to a directory containing repodata."
   ],
   [
    "dnf provides",
    "Finds which package supplies a given file or command."
   ]
  ],
  "example": "The exam gives you two repository addresses for BaseOS and AppStream. You create /etc/yum.repos.d/exam.repo with two sections, each with its own ID, a baseurl, enabled=1 and gpgcheck=0 as instructed. dnf repolist lists both with package counts, and dnf install -y httpd succeeds, pulling its dependencies from both repositories.",
  "mistakes": [
   [
    "Naming the file exam.conf or exam.txt in /etc/yum.repos.d/.",
    "dnf only reads files ending in .repo in that directory. Rename it and check with dnf repolist."
   ],
   [
    "Using rpm -i to install a downloaded package.",
    "rpm -i does not resolve dependencies. Use dnf install ./package.rpm, which installs the file and fetches what it needs from enabled repositories."
   ],
   [
    "Mounting the DVD by hand and assuming the repository will still work after reboot.",
    "A manual mount is gone after reboot. Add an /etc/fstab entry so the baseurl path exists every time."
   ],
   [
    "Putting both BaseOS and AppStream under the same bracketed ID.",
    "Each repository needs its own unique ID in brackets; otherwise one definition overrides or conflicts with the other."
   ]
  ],
  "tryit": [
   [
    "A task says a command called semanage must be available, but typing it gives command not found. The repositories are configured and working. What do you do, and how do you confirm success?",
    "Run dnf provides semanage (or the full path /usr/sbin/semanage) to find the package that contains it, then dnf install that package. Confirm with rpm -qf on the command's path or by running semanage with --help."
   ],
   [
    "You created /etc/yum.repos.d/lab.repo with a baseurl pointing at the internal mirror, but dnf repolist shows the repository with an error about missing metadata. The address loads in a browser and shows folders named BaseOS and AppStream. What is the likely mistake?",
    "The baseurl points one level too high. dnf needs the directory that directly contains repodata, so the baseurl should end in BaseOS (or AppStream), with one section for each."
   ]
  ],
  "tip": "A .repo file must end in .repo and each section needs a unique ID in brackets and a baseurl. A typo there makes every later install task fail, so confirm with dnf repolist straight away.",
  "check": [
   [
    "How do you find which package provides the semanage command?",
    "dnf provides semanage (or the full path /usr/sbin/semanage)."
   ],
   [
    "What baseurl form points at a locally mounted DVD?",
    "file:/// followed by the path, such as file:///mnt/dvd/BaseOS."
   ],
   [
    "Why use dnf install ./pkg.rpm instead of rpm -i pkg.rpm?",
    "dnf resolves and installs dependencies from enabled repositories, while rpm -i fails on missing dependencies."
   ],
   [
    "Which command names the package that owns /etc/ssh/sshd_config?",
    "rpm -qf /etc/ssh/sshd_config."
   ]
  ]
 },
 {
  "t": "Registering systems with subscription-manager (Developer subscription)",
  "hook": "You have finally set up a home lab to prepare for the RHCSA. Two virtual machines, fresh RHEL installs, a quiet weekend ahead. You log in, type `dnf update`, and dnf tells you there are no repositories enabled. `dnf install vim-enhanced` fails the same way. A friend from the Lakeshore Users Group says you just need to register, but another guide you found tells you to run a command that your system says no longer exists. Meanwhile, you cloned the second VM from the first, and you are not sure whether that matters. What does registration actually do, and what is the right way to do it today?",
  "simple": "Red Hat gives out its software updates through an online service, but only to machines that have signed in with a Red Hat account. Signing a machine in is called registering it. The tool for this is subscription-manager. You run one command with your account name, type your password, and the machine is linked to your account. After that, the machine can download packages and updates. For learners, Red Hat offers a free Developer subscription for individuals, so you can practice on the real product. It works like signing a new phone into your app store account: until you sign in, the store shows nothing to install.",
  "body": [
   "A RHEL (Red Hat Enterprise Linux) system needs to be registered with Red Hat to receive packages and updates from the Red Hat CDN (content delivery network). Registration ties the machine to a Red Hat account and the subscriptions that account holds. For study, the no-cost Red Hat Developer subscription for individuals lets you register personal RHEL systems, so you can practice on the real product rather than on a rebuild. This lesson connects to the RHCSA (Red Hat Certified System Administrator) objective about installing software from the Red Hat CDN, because the CDN repositories appear only after registration.",
   "The tool is `subscription-manager`. You register with your Red Hat account username, and it prompts for the password so it does not end up in your shell history. Organizations with many systems usually register with an activation key and an organization ID instead. An activation key is created in the Red Hat customer portal and can define which repositories registered systems get, and using it avoids typing account passwords into scripts or automation.",
   "```bash\nsubscription-manager register --username your_login\nsubscription-manager status\nsubscription-manager repos --list-enabled\ndnf repolist\n```",
   "Red Hat accounts now use simple content access. In this model, a registered system can use the content its account is entitled to without attaching a specific subscription to each machine. Older guides and blog posts tell you to run `subscription-manager attach --auto` after registering; with simple content access that step is not needed, and on current releases the command may not be available at all. If you meet that instruction in an old guide, skip it. After registering, the BaseOS and AppStream repositories appear in `/etc/yum.repos.d/redhat.repo`, and `dnf repolist` lists them.",
   "That file deserves a note. `redhat.repo` is managed by subscription-manager, which regenerates it, so you should not edit it by hand to enable or disable repositories. Use the tool instead: `subscription-manager repos --enable repo-id` and `subscription-manager repos --disable repo-id` turn extra repositories on or off, and `subscription-manager repos --list` shows what is available to the account. `subscription-manager identity` shows the system's registration identity, and `subscription-manager status` reports whether the system is registered and has access to content.",
   "Registration also has an end. `subscription-manager unregister` removes the registration, for example before you retire a VM (virtual machine) so it stops appearing in your account. This matters for cloned machines. A system cloned from a registered VM carries the same identity, so both copies look like one machine to Red Hat and can interfere with each other. On the clone, run `subscription-manager unregister` (or `subscription-manager clean` to remove local registration data), then register it again so it gets its own identity.",
   "You do not always need the command line. The graphical installer offers registration during installation, and the web console can register a system from a browser. The result is the same: the system is linked to your account and redhat.repo is populated.",
   "It helps to know what a healthy result looks like. `subscription-manager status` should report that the system is registered and that content access is provided by simple content access rather than listing per-machine subscription problems. `subscription-manager repos --list-enabled` should show repository IDs for BaseOS and AppStream that match the RHEL major version and architecture of the machine, and `dnf repolist` should show the same repositories with readable names. If `dnf repolist` still shows nothing right after registering, run `dnf clean all` and try again, because dnf may be using cached metadata from before the system was registered. Registration information is stored locally under `/etc/pki/consumer/` as a certificate that identifies the system, which is why copying a VM copies its identity.",
   "Keep the exam context in mind. On the exam you should not expect CDN access; tasks usually provide a repository address instead, and you create a .repo file as described in the package installation lesson. Registration is still worth knowing, because the objective names the Red Hat CDN and because your practice VMs need it for updates. If registration fails, check name resolution with `getent hosts`, check outbound network access, confirm the system clock is correct (certificate checks fail when the clock is far off), and make sure you typed the account username, not an email alias that is not set up as a login."
  ],
  "analogy": "Registering a RHEL system is like signing a new phone into your app store account. Before you sign in, the store is empty; after, you can install and update apps. Your account decides what you are entitled to, and simple content access means you no longer pick a separate plan for each phone. The analogy breaks for clones: copying a signed-in phone would not normally confuse the store, but a cloned VM shares the original's identity until you unregister and register it again.",
  "terms": [
   [
    "subscription-manager",
    "The command-line tool that registers a RHEL system with Red Hat and manages its repositories."
   ],
   [
    "Developer subscription",
    "A no-cost Red Hat subscription for individuals that allows registering RHEL systems for development and learning."
   ],
   [
    "Simple content access",
    "Red Hat's model where a registered system can use entitled content without attaching subscriptions to each machine."
   ],
   [
    "Activation key",
    "A preconfigured key used with an organization ID to register systems without a username and password."
   ],
   [
    "redhat.repo",
    "The repository file in /etc/yum.repos.d/ that subscription-manager generates and manages after registration."
   ]
  ],
  "example": "You install RHEL 10 in a VM for practice. After first boot, dnf repolist shows nothing. You run subscription-manager register --username with your Red Hat Developer login, enter the password, and subscription-manager status reports the system is registered. dnf repolist now shows the BaseOS and AppStream repositories, so dnf update works.",
  "mistakes": [
   [
    "Running subscription-manager attach --auto because an older guide says so.",
    "With simple content access, attaching subscriptions per system is not needed. Registering is enough for the system to see entitled content."
   ],
   [
    "Editing /etc/yum.repos.d/redhat.repo by hand to enable a repository.",
    "subscription-manager manages that file and can regenerate it. Use subscription-manager repos --enable repo-id instead."
   ],
   [
    "Cloning a registered VM and using both copies as they are.",
    "The clone shares the original's identity. Unregister or clean the clone and register it again."
   ],
   [
    "Expecting to register systems during the exam to get packages.",
    "Exam tasks usually provide repository addresses instead. Registration is for real environments and practice labs."
   ]
  ],
  "tryit": [
   [
    "You need a script that registers twenty new lab servers at Fernhill Analytics overnight without anyone typing a password. What registration method do you use, and why?",
    "Use an activation key with the organization ID, for example subscription-manager register with the --org and --activationkey options. It avoids storing an account password in the script and lets the key control what content the systems receive."
   ],
   [
    "A practice VM registered last month suddenly cannot reach any repositories, and you notice the clock shows a date several years in the past. What do you fix first?",
    "Fix the clock first, for example by enabling NTP with timedatectl set-ntp true and checking chronyc sources. Certificate validation against Red Hat's services fails when the clock is badly wrong, so registration and repository access break until time is correct."
   ]
  ],
  "tip": "If dnf repolist is empty on a fresh RHEL install, the system is probably not registered. Registration, not a missing .repo file you wrote, is what provides the CDN repositories.",
  "check": [
   [
    "Which file holds CDN repositories after registration?",
    "/etc/yum.repos.d/redhat.repo, managed by subscription-manager."
   ],
   [
    "Why might you register with an activation key instead of a username?",
    "It avoids putting account passwords into scripts and lets an organization control which content registered systems get."
   ],
   [
    "What should you do before deleting a registered practice VM?",
    "Run subscription-manager unregister so it no longer appears in your account."
   ],
   [
    "How do you turn on an additional repository on a registered system?",
    "subscription-manager repos --enable repo-id."
   ]
  ]
 },
 {
  "t": "Modifying the boot loader: grubby, /etc/default/grub and grub2-mkconfig",
  "hook": "At Marigold Health Partners, the operations team wants every server to send boot messages to a serial console so they can watch reboots remotely, and they want the boot menu to wait long enough for someone to pick an older kernel. Sam, the new admin, opens `/boot/grub2/grub.cfg`, finds the kernel lines, and starts editing them directly. A senior colleague stops him: that file will be overwritten, and on this system the kernel lines are not even stored there anymore. Sam closes the file without saving. So where do boot settings really live on RHEL, and which tool should change each one?",
  "simple": "When a computer starts, a small program called the boot loader runs first. On RHEL it is GRUB. It shows a short menu of installed Linux versions (kernels), waits a few seconds, then starts one and hands it a line of startup options. Those settings live in a few files. One file holds general settings, like how long the menu waits. Another set of small files describes each kernel and its options. The big file GRUB reads at startup is generated by a tool, so you never edit it by hand. Red Hat also provides grubby, a tool that changes kernel options safely for you. It is like a printed timetable: you change the schedule in the office system and reprint it, rather than scribbling on the poster.",
  "body": [
   "GRUB 2 (GRand Unified Bootloader version 2) is the boot loader on RHEL (Red Hat Enterprise Linux). It shows the boot menu, loads the chosen kernel and its initial RAM disk, and passes the kernel command line, the list of arguments that tune the kernel and systemd at startup. RHEL stores each kernel's menu entry as its own small file in `/boot/loader/entries/`, following the BLS (Boot Loader Specification). Each file has a title, the kernel path, the initramfs path and an `options` line with that kernel's arguments. Knowing where each setting lives tells you which tool changes it, which is exactly what the RHCSA (Red Hat Certified System Administrator) exam tests.",
   "There are two layers of configuration. The first is `/etc/default/grub`, which holds global settings such as `GRUB_TIMEOUT` (seconds the menu waits before booting the default entry) and `GRUB_CMDLINE_LINUX` (default kernel arguments). The second is the generated file `/boot/grub2/grub.cfg`, which is what GRUB actually reads at boot. You never edit `grub.cfg` by hand: `grub2-mkconfig` rebuilds it from `/etc/default/grub` and the scripts in `/etc/grub.d/`, and any manual change is lost the next time it runs, for example when a kernel update triggers a rebuild. On current RHEL releases the same `/boot/grub2/grub.cfg` path is used on both BIOS (Basic Input/Output System) and UEFI (Unified Extensible Firmware Interface) systems, because the small file on the EFI system partition just points to it.",
   "```bash\nvim /etc/default/grub            # e.g. GRUB_TIMEOUT=10\ngrub2-mkconfig -o /boot/grub2/grub.cfg\n```",
   "The `-o` option names the output file. Without it, grub2-mkconfig prints the generated configuration to the screen and changes nothing, which is a common reason a timeout change seems to have no effect. Read the output messages as it runs: it lists the kernels it found, and an error here is your warning before the next reboot.",
   "Kernel arguments need extra care because of BLS. Since each kernel's arguments are stored in its own entry file, editing `GRUB_CMDLINE_LINUX` and regenerating does not, by default, rewrite the arguments of kernels that are already installed. It affects kernels installed later. To change existing entries as well, pass `--update-bls-cmdline` to `grub2-mkconfig`, or, more simply and more reliably, use `grubby`.",
   "`grubby` edits boot entries directly and is Red Hat's recommended tool for kernel arguments and for choosing the default kernel. `grubby --info=ALL` lists every entry with its index, kernel path, arguments and title. `grubby --default-kernel` shows the default kernel path. `grubby --update-kernel=ALL --args='quiet'` adds an argument to every entry, and `--remove-args='rhgb'` removes one. You can target a single kernel by giving its path instead of ALL, or the current default with DEFAULT. When you use ALL, grubby also records the change so that kernels installed later inherit the same arguments.",
   "```bash\ngrubby --info=ALL | grep -E '^(index|kernel|args)'\ngrubby --update-kernel=ALL --args='console=ttyS0'\ngrubby --update-kernel=ALL --remove-args='rhgb quiet'\n```",
   "All of these changes take effect at the next boot, not immediately. After rebooting, confirm what the running kernel actually received with `cat /proc/cmdline`, and confirm the stored entry with `grubby --info=DEFAULT`. Checking both tells you whether the change was saved correctly and whether the system booted the entry you expected.",
   "A quick way to decide between the two approaches is to ask what the task is changing. If it is a property of the menu itself, such as the timeout, the menu appearance or the default arguments for kernels you will install later, the answer is `/etc/default/grub` followed by `grub2-mkconfig -o /boot/grub2/grub.cfg`. If it is a property of the kernels already installed, such as adding `console=ttyS0`, removing `rhgb quiet` or choosing which kernel boots, the answer is `grubby`. You can also look at the entries directly with `ls /boot/loader/entries/` and `cat` one of them to see its `options` line, which is a good way to confirm what grubby did without rebooting.",
   "Be careful: a boot loader mistake can make a system unbootable, which on the exam may take every other task down with it, because the grader cannot check a system that does not start. Make one change at a time, read the output of every command, and keep a working older kernel entry available in the menu as a fallback. If a change goes wrong, you can press e at the GRUB menu to edit an entry for one boot, fix the problem from the running system, and then make the permanent correction with the right tool."
  ],
  "analogy": "Think of the boot configuration like a restaurant menu. `/etc/default/grub` is the house style guide (how long to display the menu, default notes for every dish), `/boot/loader/entries/` holds one recipe card per kernel, and `grub.cfg` is the printed menu produced from them. grub2-mkconfig reprints the menu; grubby edits the recipe cards directly. The analogy stops working at one point: reprinting the menu with a new style guide does not rewrite existing recipe cards unless you ask with --update-bls-cmdline.",
  "terms": [
   [
    "GRUB 2",
    "The RHEL boot loader that presents the boot menu and loads the kernel with its command line."
   ],
   [
    "/etc/default/grub",
    "The file of global GRUB settings such as GRUB_TIMEOUT and GRUB_CMDLINE_LINUX, applied by grub2-mkconfig."
   ],
   [
    "grub2-mkconfig",
    "Regenerates /boot/grub2/grub.cfg from /etc/default/grub and /etc/grub.d scripts when given -o."
   ],
   [
    "grubby",
    "A tool that reads and edits boot entries directly, including default kernel and kernel arguments."
   ],
   [
    "BLS entry",
    "A per-kernel file in /boot/loader/entries/ describing one boot menu entry and its kernel arguments."
   ]
  ],
  "example": "You must make the boot menu wait 10 seconds. You set GRUB_TIMEOUT=10 in /etc/default/grub and run grub2-mkconfig -o /boot/grub2/grub.cfg. On reboot the menu counts down from 10 before starting the default kernel. A second task asks you to add console=ttyS0 to all kernels, so you run grubby --update-kernel=ALL --args='console=ttyS0' and, after reboot, cat /proc/cmdline shows it.",
  "mistakes": [
   [
    "Editing /boot/grub2/grub.cfg directly.",
    "It is generated, so grub2-mkconfig or a kernel update overwrites manual edits. Change /etc/default/grub or use grubby."
   ],
   [
    "Running grub2-mkconfig without -o and expecting the change to apply.",
    "Without -o it only prints the configuration. Use grub2-mkconfig -o /boot/grub2/grub.cfg."
   ],
   [
    "Assuming a GRUB_CMDLINE_LINUX edit updates existing kernels.",
    "Arguments live in each BLS entry. Existing entries change only with --update-bls-cmdline or with grubby."
   ],
   [
    "Using a different grub.cfg path for UEFI systems on current RHEL.",
    "Current RHEL uses /boot/grub2/grub.cfg on both BIOS and UEFI; the EFI partition file only points to it."
   ]
  ],
  "tryit": [
   [
    "You are asked to remove the graphical boot splash from every installed kernel on servera so that boot messages are visible, and the change must persist. Which tool do you use, what is the command, and how do you verify?",
    "Use grubby, because it updates existing entries directly: grubby --update-kernel=ALL --remove-args='rhgb'. Verify with grubby --info=ALL that rhgb is gone from each args line, then reboot and check cat /proc/cmdline."
   ],
   [
    "A colleague changed GRUB_TIMEOUT to 15 and ran grub2-mkconfig, but the menu still waits 5 seconds. The command printed a long configuration to the screen. What went wrong?",
    "They ran grub2-mkconfig without -o /boot/grub2/grub.cfg, so the output went to the screen and the real file was never rewritten. Rerun it with -o."
   ]
  ],
  "tip": "Menu settings like the timeout need /etc/default/grub plus grub2-mkconfig -o /boot/grub2/grub.cfg. Per-kernel arguments are easiest with grubby, which updates existing entries immediately.",
  "check": [
   [
    "Why should you not edit /boot/grub2/grub.cfg directly?",
    "It is generated by grub2-mkconfig, so manual edits are overwritten the next time it is rebuilt."
   ],
   [
    "Which command adds a kernel argument to every installed kernel?",
    "grubby --update-kernel=ALL --args='argument'."
   ],
   [
    "How can you confirm the arguments the running kernel booted with?",
    "cat /proc/cmdline."
   ],
   [
    "Where are per-kernel boot entries stored on RHEL?",
    "In /boot/loader/entries/, one BLS file per kernel."
   ]
  ]
 },
 {
  "t": "Choosing the default kernel and adding or removing kernel arguments",
  "hook": "Monday morning at Silverline Shipping, Kenji gets a ticket: since the weekend patch run, the warehouse database server drops its storage connection every few hours. The vendor suspects a driver change in the newest kernel and asks for the server to run the previous kernel until a fix ships, without uninstalling anything. They also want an extra kernel argument added so the driver logs more detail. Kenji knows how to pick an older kernel at the boot menu by hand, but he will not be standing at the console at 3 a.m. when the server next reboots. How does he make the older kernel the permanent default and add the argument so both survive every reboot?",
  "simple": "A RHEL machine usually keeps a few versions of its core program, the kernel, installed side by side. That way, if a new version causes trouble, an older one is still there. Normally the newest version starts automatically, but you can tell the machine to start a different one every time. You can also give the kernel extra startup instructions, called arguments, such as asking it to show fewer messages or send output to a different screen. A tool called grubby handles both jobs and remembers your choice. It is like keeping last year's working phone in the drawer: if the new one misbehaves, you switch back until the problem is fixed.",
  "body": [
   "RHEL (Red Hat Enterprise Linux) keeps several kernels installed at once, so a bad update never leaves you without a working one. Kernel packages are installed side by side rather than replacing each other, and dnf keeps a limited number of kernel versions, controlled by the `installonly_limit` setting in `/etc/dnf/dnf.conf`, removing the oldest when a new one arrives. The default boot entry is normally the newest kernel, but you may need to boot an older one permanently, for example while a driver problem in the new kernel is investigated. On the RHCSA (Red Hat Certified System Administrator) exam, this shows up as tasks to set a specific default kernel or to make a kernel argument persistent.",
   "Start by seeing what is installed and what will boot. `rpm -q kernel` lists the installed kernel packages. `grubby --info=ALL` lists every boot entry with its index number, kernel path, arguments and title. `grubby --default-kernel` prints the path of the default kernel, and `grubby --default-index` prints its menu position, counting from 0, so the first entry in the menu is index 0. `uname -r` shows which kernel is running right now, which may differ from the default if someone picked another entry at the menu.",
   "To change the default permanently, give `grubby` either the kernel path or an index. A path is safer, because index numbers shift when kernels are added or removed. The choice is stored as the saved entry in the GRUB environment block, so it persists across reboots. After rebooting, `uname -r` confirms which kernel is running.",
   "```bash\ngrubby --info=ALL | grep -E '^(index|kernel)'\ngrubby --set-default /boot/vmlinuz-<older-version>\n# or: grubby --set-default-index=1\ngrubby --default-kernel\nreboot\nuname -r\n```",
   "Kernel arguments are the second half of this objective. They tune the kernel and systemd at boot. Examples you may meet include `quiet` and `rhgb` (reduce messages and show the Red Hat graphical boot splash), `console=` to send output to a serial console, `systemd.unit=rescue.target` for recovery, and `crashkernel=` to reserve memory for kernel crash dumps. Add arguments with `--args` and remove them with `--remove-args`. The `--update-kernel` option accepts `ALL` for every entry, `DEFAULT` for the current default entry, or a specific kernel path for just one.",
   "```bash\ngrubby --update-kernel=DEFAULT --args='audit=1'\ngrubby --update-kernel=ALL --remove-args='quiet'\ngrubby --info=DEFAULT | grep args\n```",
   "Order of operations matters when you combine these tasks. If you first change the default kernel and then add an argument with `--update-kernel=DEFAULT`, the argument goes on the new default. If you add it first, it goes on the entry that was the default at that moment, which may not be the one you then select. Using `ALL` avoids that trap when the task wants the argument everywhere, and checking `grubby --info=DEFAULT` afterward shows exactly what the next boot will use.",
   "Distinguish permanent from one-time changes. Arguments added with grubby persist. Arguments typed at the GRUB menu after pressing e apply to that boot only, which is exactly what you want for recovery tasks such as booting into `rescue.target` or using `rd.break` to interrupt the boot early. Choosing an older entry with the arrow keys at the menu is also one-time. When a task uses the word persistent, a menu edit is never the answer.",
   "It helps to read what the tools print. A `grubby --info=ALL` entry shows lines such as `index=0`, `kernel=\"/boot/vmlinuz-...\"`, `args=\"ro crashkernel=... rhgb quiet\"` and `title=\"Red Hat Enterprise Linux ...\"`. There is also usually a rescue entry built for emergencies, with a kernel path containing the word rescue; it is not a normal kernel, so do not choose it as the default unless a task asks for it. Compare the `args` line before and after each change, and you will see exactly which words grubby added or removed. If an argument appears twice or with a typo, remove it with `--remove-args` and add it again correctly rather than editing entry files by hand.",
   "Always verify after a reboot. `uname -r` proves which kernel is running, `cat /proc/cmdline` proves which arguments it received, and `grubby --default-kernel` proves what the next boot will choose. Reboot once yourself before you finish, so that the grader's reboot holds no surprises. If the wrong kernel comes up, nothing is lost: pick the right entry at the menu to get a working system, then run grubby again and recheck the default before the next reboot."
  ],
  "analogy": "Picking a default kernel is like setting a default printer. Several printers are installed, the computer uses the default unless you choose another for one job, and changing the default in settings sticks for every future job. Kernel arguments are the print options, like double-sided or grayscale, saved per printer. The analogy stops at one point: kernel changes take effect only at the next boot, not on the next job.",
  "terms": [
   [
    "Kernel argument",
    "An option on the kernel command line that changes kernel or systemd behavior at boot."
   ],
   [
    "grubby --set-default",
    "Sets the default boot entry by kernel path, persisting across reboots."
   ],
   [
    "uname -r",
    "Prints the release of the currently running kernel."
   ],
   [
    "/proc/cmdline",
    "A virtual file showing the command line the running kernel was booted with."
   ],
   [
    "installonly_limit",
    "The dnf setting in /etc/dnf/dnf.conf that controls how many kernel versions are kept installed."
   ]
  ],
  "example": "After an update, a storage driver misbehaves on the newest kernel. You list entries with grubby --info=ALL, run grubby --set-default on the previous kernel's vmlinuz path, then grubby --update-kernel=DEFAULT --args='loglevel=7'. After a reboot, uname -r shows the older version, cat /proc/cmdline includes the new argument, and the new kernel stays installed for later testing.",
  "mistakes": [
   [
    "Choosing the older kernel at the GRUB menu and considering the task done.",
    "A menu choice lasts for one boot only. Use grubby --set-default so the choice persists, then verify after a reboot."
   ],
   [
    "Relying on index numbers in --set-default-index long term.",
    "Indexes shift when kernels are installed or removed. A kernel path names the exact kernel and is safer."
   ],
   [
    "Removing the new kernel package to force the old one to boot.",
    "That loses the new kernel for later testing. Changing the default keeps both installed."
   ],
   [
    "Adding an argument to DEFAULT before switching the default kernel.",
    "The argument lands on the old default. Switch first, or use ALL, then check grubby --info=DEFAULT."
   ]
  ],
  "tryit": [
   [
    "A task says: make the second-newest installed kernel the default, and ensure all kernels boot without the quiet argument. Write the steps you would take and how you prove each one.",
    "List entries with grubby --info=ALL to find the vmlinuz path of the second-newest kernel, run grubby --set-default with that path, then grubby --update-kernel=ALL --remove-args='quiet'. Reboot, then uname -r should show that kernel's release and cat /proc/cmdline should not contain quiet."
   ],
   [
    "You need to boot once into rescue.target to repair a broken service, but the next normal reboot must go back to the usual target. Do you use grubby or the GRUB menu?",
    "Use the GRUB menu: press e on the entry and add systemd.unit=rescue.target to the linux line for that boot only. A grubby change would persist and keep sending the system to rescue mode."
   ]
  ],
  "tip": "Edits made at the GRUB menu with e last for one boot only. If a task says persistent, use grubby (or /etc/default/grub with grub2-mkconfig) and verify after a reboot with uname -r and cat /proc/cmdline.",
  "check": [
   [
    "How do you see which kernel will boot by default?",
    "grubby --default-kernel (or --default-index for its position)."
   ],
   [
    "Which command removes the quiet argument from every kernel?",
    "grubby --update-kernel=ALL --remove-args='quiet'."
   ],
   [
    "What is the difference between adding an argument at the GRUB menu and with grubby?",
    "The GRUB menu edit applies only to that boot; grubby changes the stored entry so it persists."
   ],
   [
    "Which command shows the kernel that is running right now?",
    "uname -r."
   ]
  ]
 },
 {
  "t": "Configuring static and DHCP IPv4 and IPv6 addresses with nmcli (ipv4.method manual/auto, ipv4.addresses, ipv4.gateway)",
  "hook": "The print server at Hollowbrook Elementary keeps vanishing. Every few days, teachers send jobs and nothing comes out, and Ms. Okafor, the office manager, has started printing everything from her own laptop. You log in and find the cause quickly: the server gets its address from DHCP, the lease changed, and every classroom computer is still pointing at the old address. The district wants the server on a fixed IPv4 address with a gateway and DNS, plus a fixed IPv6 address for the new network plan, and it must survive reboots. You have nmcli open. Which properties do you set, and why does your change seem to do nothing until one more command?",
  "simple": "Every computer on a network needs an address, like a house needs a street number. It can get one in two ways. It can ask a server on the network to hand it one automatically, which is called DHCP, or you can type in a fixed address yourself, which is called static. On RHEL, a service called NetworkManager looks after network settings, and nmcli is the command you use to talk to it. Settings are stored in profiles, which are like saved recipes for a network card. You change the recipe with nmcli, and then you tell NetworkManager to use the updated recipe. Until you do that last step, the card keeps cooking the old recipe.",
  "body": [
   "RHEL (Red Hat Enterprise Linux) manages networking with NetworkManager, and `nmcli` is its command-line interface. NetworkManager separates two ideas. A device is a physical or virtual network interface, such as `enp1s0`. A connection is a saved configuration profile that can be applied to a device. A device can have several connection profiles, but only one is active on it at a time. Almost every RHCSA (Red Hat Certified System Administrator) networking task follows the same shape: modify or create a connection, then activate it, then verify.",
   "Start by looking around. `nmcli device status` shows each device, its state and which connection it is using. `nmcli connection show` (short form `nmcli con show`) lists every profile with its name, UUID (universally unique identifier), type and device. `nmcli con show name` prints every property of one profile. Properties use a `setting.property` naming style, such as `ipv4.method`, `ipv4.addresses`, `ipv4.gateway` and `ipv4.dns`, and the same names appear when you modify them. Profile names that contain spaces, such as the installer's `Wired connection 1`, need quotes.",
   "The `ipv4.method` property decides where the address comes from. `ipv4.method auto` means DHCP (Dynamic Host Configuration Protocol): the address, gateway and DNS (Domain Name System) servers come from a DHCP server. `ipv4.method manual` means static: you supply the address in CIDR (Classless Inter-Domain Routing) form, such as `192.168.10.20/24`, where the number after the slash is the prefix length that defines the netmask, and usually a gateway and DNS servers too. Other values exist, such as `link-local` and `disabled`. IPv6 is parallel: `ipv6.method auto` uses router advertisements and DHCPv6, `manual` takes `ipv6.addresses` such as `fd00:10::20/64` and an optional `ipv6.gateway`, and `disabled` turns IPv6 off for that profile.",
   "```bash\nnmcli con add con-name static1 ifname enp1s0 type ethernet \\\n  ipv4.method manual ipv4.addresses 192.168.10.20/24 \\\n  ipv4.gateway 192.168.10.1 ipv4.dns 192.168.10.1 \\\n  ipv6.method manual ipv6.addresses fd00:10::20/64\nnmcli con up static1\n```",
   "Creating a new profile with `nmcli con add` is one approach; modifying the existing one is often simpler and avoids having two profiles competing for the same device. Use `nmcli con mod` for that. Changes are saved to the profile at once but do not reach the running interface until you reactivate the connection with `nmcli con up name`. That gap is the single most common reason a change seems not to work: the file on disk is right, but the interface still has the old address. To add an extra address instead of replacing the list, prefix the property with a plus, as in `nmcli con mod static1 +ipv4.addresses 10.0.0.5/24`; a minus prefix removes one specific value.",
   "```bash\nnmcli con mod 'Wired connection 1' ipv4.method auto   # back to DHCP\nnmcli con mod static1 ipv4.addresses 192.168.10.30/24\nnmcli con up static1\nip addr show enp1s0\n```",
   "Order matters when switching to manual. Setting `ipv4.method manual` with no address is rejected, because a static profile without an address makes no sense, so give the method and the address in the same command. When switching back to auto, clear stale static values with empty strings, for example `ipv4.addresses ''` and `ipv4.gateway ''`, otherwise NetworkManager keeps them and adds them on top of the DHCP lease, leaving the interface with two addresses. Tab completion works for nmcli subcommands and property names, which saves typing and avoids typos under time pressure.",
   "Verification closes every task. After `nmcli con up`, run `ip addr show enp1s0` to see the `inet` and `inet6` lines with the new addresses and prefixes, `ip route` to confirm the `default via` line points at the right gateway, and `cat /etc/resolv.conf` or `nmcli con show static1 | grep dns` to confirm the DNS servers. Then test reachability with `ping -c 3` to the gateway. If the task names an IPv6 address, check `ip -6 addr` and `ip -6 route` as well.",
   "Work carefully over SSH (Secure Shell). Reactivating the connection you are logged in through changes the address under your session, which can disconnect you. On the exam you normally use the console, but in real work you can chain the modify and up commands on one line so the change completes even if the session drops, and keep console access available as a backup. Finally, remember that the profile is stored persistently, so a correctly modified and activated profile comes back the same way after a reboot, which is exactly what the grader checks."
  ],
  "analogy": "A connection profile is like a saved seat-and-mirror setting in a shared car. Changing the saved setting with nmcli con mod updates the memory button, but the seat does not move until you press the button, which is nmcli con up. ipv4.method auto is letting the valet adjust everything for you; manual is setting it yourself. The analogy breaks a little because a car has one driver at a time, while a device can store many profiles, and only one is active.",
  "terms": [
   [
    "NetworkManager",
    "The RHEL service that configures and manages network interfaces using connection profiles."
   ],
   [
    "Connection profile",
    "A saved set of network settings that NetworkManager applies to a device when activated."
   ],
   [
    "ipv4.method",
    "The property that selects auto (DHCP), manual (static), link-local or disabled addressing."
   ],
   [
    "CIDR notation",
    "An address followed by a slash and prefix length, such as 192.168.10.20/24, giving address and netmask together."
   ],
   [
    "DHCP",
    "Dynamic Host Configuration Protocol, which hands out addresses, gateways and DNS servers automatically."
   ],
   [
    "nmcli con mod",
    "Changes properties of a saved profile; the change applies to the interface after nmcli con up."
   ]
  ],
  "example": "The exam says to give serverb the static address 172.25.250.11/24, gateway 172.25.250.254 and DNS 172.25.250.254 on its existing connection. You run one nmcli con mod command setting ipv4.method manual with the address, gateway and DNS, then nmcli con up. ip addr shows inet 172.25.250.11/24, ip route shows default via 172.25.250.254, and a reboot brings back the same settings.",
  "mistakes": [
   [
    "Running nmcli con mod and expecting the interface to change immediately.",
    "con mod saves the profile only. Run nmcli con up name to apply it to the live interface."
   ],
   [
    "Setting ipv4.method manual first and the address in a later command.",
    "nmcli rejects manual with no address. Set the method and ipv4.addresses together in one command."
   ],
   [
    "Switching back to auto without clearing old static values.",
    "Leftover ipv4.addresses and ipv4.gateway stay in the profile and are added beside the DHCP lease. Clear them with empty strings."
   ],
   [
    "Writing the address and netmask separately, such as 192.168.10.20 255.255.255.0.",
    "nmcli expects CIDR form in ipv4.addresses, such as 192.168.10.20/24."
   ]
  ],
  "tryit": [
   [
    "Serverc must keep its current static address 10.0.5.20/24 but also answer on 10.0.6.20/24, using its existing profile named lan. What exact command do you use, what do you run next, and how do you check?",
    "Run nmcli con mod lan +ipv4.addresses 10.0.6.20/24 so the new address is appended rather than replacing the list, then nmcli con up lan. ip addr show should list both inet lines on the interface."
   ],
   [
    "A desktop that was static must go back to DHCP. After nmcli con mod office ipv4.method auto and nmcli con up office, ip addr shows two IPv4 addresses: the old static one and a new DHCP one. What happened and how do you fix it?",
    "The old static address and gateway are still stored in the profile. Run nmcli con mod office ipv4.addresses '' ipv4.gateway '' and bring the connection up again, so only the DHCP lease remains."
   ]
  ],
  "tip": "nmcli con mod saves the profile but does not apply it. Always follow with nmcli con up (and be aware this can drop an SSH session if the address changes), then verify with ip addr and ip route.",
  "check": [
   [
    "Which ipv4.method value means DHCP?",
    "auto."
   ],
   [
    "How do you add a second IPv4 address without removing the first?",
    "nmcli con mod name +ipv4.addresses address/prefix, then reactivate the connection."
   ],
   [
    "You changed the address with nmcli con mod but ip addr shows the old one. Why?",
    "The profile is saved but not reapplied; run nmcli con up name to activate it."
   ],
   [
    "Which property holds a static IPv6 address?",
    "ipv6.addresses, with ipv6.method set to manual."
   ]
  ]
 },
 {
  "t": "NetworkManager keyfiles in /etc/NetworkManager/system-connections/ (RHEL 10 no longer uses ifcfg files)",
  "hook": "Darnell at Kestrel Ridge Credit Union is moving a dozen older servers to RHEL 10. His migration notes are full of familiar steps: open `/etc/sysconfig/network-scripts/ifcfg-eth0`, change `IPADDR`, restart networking. On the first new server he goes to that directory and finds nothing useful. He copies a profile file from a colleague's working machine into the place he thinks it belongs, but NetworkManager acts as if the file does not exist. The cutover window closes at 6 a.m. Where do RHEL 10 network profiles live now, what do they look like, and why would NetworkManager ignore a file that seems perfectly fine?",
  "simple": "NetworkManager remembers each saved network setup, called a profile, as a small text file. Older versions of RHEL used one file style, called ifcfg, kept in a folder named network-scripts. RHEL 10 dropped that style. Now every profile is a keyfile: a plain text file with sections in square brackets, kept in /etc/NetworkManager/system-connections/ and ending in .nmconnection. You usually let nmcli write these files for you, but you can read them, copy them and even edit them by hand. If you edit by hand, two rules apply: only the administrator account may be able to read the file, because it can hold passwords, and you must tell NetworkManager to read it again. It is like a recipe card file: change a card, then tell the cook to look again.",
  "body": [
   "NetworkManager stores each connection profile as a file on disk. For many years RHEL (Red Hat Enterprise Linux) used the ifcfg format: shell-style files of `KEY=value` lines, such as `BOOTPROTO=dhcp` and `IPADDR=192.168.10.20`, kept in `/etc/sysconfig/network-scripts/`. RHEL 10 no longer supports that format. Profiles are keyfiles, INI-style text files in `/etc/NetworkManager/system-connections/`, normally named after the connection with a `.nmconnection` extension. Older study guides that tell you to edit `ifcfg-eth0` do not apply to the RHCSA (Red Hat Certified System Administrator) exam for RHEL 10, and an exam question that mentions ifcfg is likely testing whether you know it has been replaced.",
   "A keyfile is organized into sections in square brackets that match the nmcli setting names you already use: `[connection]`, `[ethernet]`, `[ipv4]` and `[ipv6]`, plus others for Wi-Fi, bonds or VPNs (virtual private networks) when relevant. Inside each section, keys match nmcli property names without the prefix, so `ipv4.method` becomes `method=` under `[ipv4]`. Addresses are listed as `address1=`, `address2=` and so on, each in CIDR (Classless Inter-Domain Routing) form, optionally followed by a comma and the gateway. DNS (Domain Name System) servers are a semicolon-separated list.",
   "```ini\n# /etc/NetworkManager/system-connections/static1.nmconnection\n[connection]\nid=static1\nuuid=0c8f...e21a\ntype=ethernet\ninterface-name=enp1s0\nautoconnect=true\n\n[ipv4]\nmethod=manual\naddress1=192.168.10.20/24,192.168.10.1\ndns=192.168.10.1;\n\n[ipv6]\nmethod=auto\n```",
   "Reading this file tells you a lot quickly. The `id` is the connection name you use with `nmcli con up`. The `uuid` uniquely identifies the profile, which is why two copies of one file with the same UUID cause confusion. `interface-name` ties the profile to a device, `autoconnect` controls whether it starts at boot, and the `[ipv4]` section shows a static address with its gateway after the comma. A keyfile omits properties that are at their default values, so a short file is normal and not a sign that something is missing.",
   "The recommended way to create and change these files is still `nmcli` or `nmtui`, the text-based menu tool. Both validate your values, generate a UUID, set the right permissions and write the file for you, which removes most of the ways a hand edit can go wrong. Reading the file is still valuable: it shows at a glance what a profile contains, makes a clean backup of network configuration, and lets you compare two servers with a simple `diff`.",
   "If you do edit or copy a keyfile by hand, two rules apply. First, ownership and permissions: the file must be owned by root with mode 600. NetworkManager ignores keyfiles that other users can read or write, because they can contain secrets such as Wi-Fi passphrases or VPN passwords. Second, NetworkManager does not notice the change by itself. Run `nmcli con reload` so it rereads every file in the directory, or `nmcli con load /path/to/file` for a single file, and then `nmcli con up id` to apply the profile to the interface.",
   "```bash\nchown root:root /etc/NetworkManager/system-connections/static1.nmconnection\nchmod 600 /etc/NetworkManager/system-connections/static1.nmconnection\nnmcli con reload\nnmcli con up static1\n```",
   "When copying a keyfile from another machine, also think about what should be unique. Give the copy a new `uuid`, for example a value generated with the `uuidgen` command, check that `interface-name` matches a real device on the new machine as shown by `nmcli device status`, and change any static address so two hosts do not end up with the same IP (Internet Protocol) address. If SELinux (Security-Enhanced Linux) is enforcing, a file moved from another location may keep the wrong context, so `restorecon -v` on the file is a sensible extra step.",
   "Not every profile is written to `/etc`. Profiles that exist only in memory, for example ones NetworkManager generates at boot to run DHCP (Dynamic Host Configuration Protocol) on a new interface, may live under `/run/NetworkManager/system-connections/`, and `/run` is cleared at every reboot. Once you modify such a profile with nmcli, it is written to `/etc/NetworkManager/system-connections/`, which makes it persistent. You can see where a profile is stored with `nmcli -f NAME,FILENAME con show`, a quick way to confirm your work will survive the grader's reboot. The same command also helps after a migration, because it shows at a glance which file backs each profile, so you can spot leftovers, duplicates or a profile that was never saved. If you no longer want a profile, remove it with `nmcli con delete name`, which deletes its keyfile too, rather than deleting files while NetworkManager still has them loaded."
  ],
  "analogy": "Keyfiles are like a filing cabinet of recipe cards that the cook, NetworkManager, memorized at the start of the shift. You can write new cards with a helper (nmcli) who uses the right format and locks the cabinet, or slip a card in yourself. If you do it yourself, the cabinet must be locked to staff only, and the cook will not know about your card until you say reread the cards. The analogy stops at the lock: NetworkManager does not just warn about an unlocked card, it ignores it.",
  "terms": [
   [
    "Keyfile",
    "NetworkManager's INI-style profile format, stored as .nmconnection files in /etc/NetworkManager/system-connections/."
   ],
   [
    "ifcfg file",
    "The legacy shell-style network configuration format in /etc/sysconfig/network-scripts/, not supported in RHEL 10."
   ],
   [
    "nmcli con reload",
    "Tells NetworkManager to reread connection files from disk after manual edits."
   ],
   [
    "address1=",
    "The keyfile key for the first static address in CIDR form, optionally followed by a comma and the gateway."
   ],
   [
    "nmtui",
    "A text-based menu interface to NetworkManager that writes keyfiles for you."
   ],
   [
    "UUID",
    "Universally unique identifier; each profile's uuid key must be unique on a system."
   ]
  ],
  "example": "You copy a working profile to a new VM, but NetworkManager does not list it. ls -l shows the file is mode 644. After chown root:root, chmod 600 and nmcli con reload, the connection appears in nmcli con show and activates with nmcli con up. nmcli -f NAME,FILENAME con show confirms it is stored under /etc/NetworkManager/system-connections/.",
  "mistakes": [
   [
    "Editing /etc/sysconfig/network-scripts/ifcfg-* on RHEL 10.",
    "RHEL 10 does not support ifcfg profiles. Use nmcli, nmtui or keyfiles in /etc/NetworkManager/system-connections/."
   ],
   [
    "Leaving a hand-copied keyfile at mode 644.",
    "NetworkManager ignores keyfiles readable by other users. Set root ownership and mode 600."
   ],
   [
    "Editing a keyfile and expecting the change to apply immediately.",
    "Run nmcli con reload or nmcli con load, then nmcli con up to apply it."
   ],
   [
    "Copying a keyfile between servers without changing anything.",
    "The uuid, interface-name and any static address may need changing so the profile is unique and matches the new machine."
   ]
  ],
  "tryit": [
   [
    "A colleague asks you to change the static address on profile lan from 10.1.1.5/24 to 10.1.1.6/24 and suggests editing address1 in the keyfile with vim. Is that acceptable, and what must happen afterward for the change to work?",
    "It is acceptable, though nmcli con mod is safer because it validates the value. After saving, keep the file root-owned with mode 600, run nmcli con reload, then nmcli con up lan, and verify with ip addr."
   ],
   [
    "After a reboot, a profile you created earlier with a temporary tool is gone, and nmcli -f NAME,FILENAME con show for a similar profile shows a path under /run. What explains the loss, and how do you make such a profile persistent?",
    "Profiles under /run exist only in memory and disappear at reboot. Modify the profile with nmcli (or create it with nmcli con add), which writes it to /etc/NetworkManager/system-connections/ so it persists."
   ]
  ],
  "tip": "Hand-edited keyfiles need mode 600, root ownership and a reload. If a question mentions ifcfg files for RHEL 10, the answer is that keyfiles in /etc/NetworkManager/system-connections replaced them.",
  "check": [
   [
    "Where does RHEL 10 store persistent connection profiles?",
    "As .nmconnection keyfiles in /etc/NetworkManager/system-connections/."
   ],
   [
    "Why might NetworkManager ignore a keyfile you copied in?",
    "Its permissions are too open or it is not owned by root; keyfiles must be root-owned with mode 600."
   ],
   [
    "What must you run after editing a keyfile by hand?",
    "nmcli con reload (or nmcli con load file), then nmcli con up to apply the profile."
   ],
   [
    "In a keyfile, how is a static IPv4 address with gateway written?",
    "address1=192.168.10.20/24,192.168.10.1 under the [ipv4] section, with method=manual."
   ]
  ]
 },
 {
  "t": "Bringing connections up and down and making them autoconnect (nmcli con up, connection.autoconnect)",
  "hook": "At Fairhaven Veterinary Group, Lena configured a static address on the records server on Friday, tested it, and went home happy. On Monday, the server is back on its old DHCP address, and the clinic's scheduling app cannot find it. Nothing in her static profile changed. She runs `nmcli con show` and sees two profiles for the same network card: her static one and the installer's original DHCP profile, both set to start on their own. During the weekend reboot, the wrong one won. How does NetworkManager decide which profile to activate at boot, and how does Lena make sure her profile is the one that comes up every time?",
  "simple": "A saved network setup, called a profile, does nothing until you switch it on for a network card. Switching it on is called bringing it up; switching it off is bringing it down. Each profile also has a setting that says whether it should switch itself on when the computer starts. That setting is called autoconnect. If two profiles for the same card both have autoconnect turned on, the computer has to pick one, and it may not pick the one you want. So you either turn autoconnect off on the profile you do not want, delete it, or give your preferred profile a higher priority. It is like two alarms set for the same morning: you only want one of them to go off.",
  "body": [
   "A NetworkManager connection profile does nothing until it is activated on a device. `nmcli con up name` activates a profile, applying its addresses, routes and DNS (Domain Name System) settings to the interface. `nmcli con down name` deactivates it, removing those settings. Because only one profile can be active on a device at a time, bringing up a second profile on the same interface replaces the first; you do not need to take the first one down yourself. These commands are central to the RHCSA (Red Hat Certified System Administrator) networking objectives, because every change you make has to be activated and every setting has to survive reboot.",
   "Activation is also how you apply changes. After `nmcli con mod`, the stored profile is updated, but the live interface keeps its old settings until you run `nmcli con up` again. Running `con up` on a profile that is already active is fine; it simply reapplies the profile. There is also `nmcli device reapply enp1s0`, which applies some changes to the active connection without a full deactivation and reactivation, which can be gentler on running services, though `con up` is the reliable default when you are unsure.",
   "Whether a profile activates at boot is controlled by the `connection.autoconnect` property. When it is `yes`, which is the default for new profiles, NetworkManager brings the profile up automatically at boot and whenever the device becomes available, for example when a cable is plugged in. Set it to `no` for profiles you only want to use by hand, such as a test configuration, and `yes` for the profile the system must use after reboot. When several autoconnect profiles match the same device, `connection.autoconnect-priority` breaks the tie: the profile with the higher number wins. Profiles default to priority 0, so setting your preferred profile to a positive number is enough.",
   "```bash\nnmcli con mod static1 connection.autoconnect yes\nnmcli con mod 'Wired connection 1' connection.autoconnect no\nnmcli -f NAME,DEVICE,AUTOCONNECT,AUTOCONNECT-PRIORITY con show\nnmcli con up static1\n```",
   "The `-f` option in that example selects which fields to display, which makes it easy to see every profile's autoconnect state in one table. Look for more than one profile with the same interface and autoconnect set to yes; that is the classic setup for the wrong profile winning after a reboot. If the extra profile is no longer needed, `nmcli con delete name` removes it entirely, which is the cleanest fix.",
   "Two commands look similar but behave differently, and the exam likes this distinction. `nmcli con down name` deactivates the profile, but NetworkManager may still autoconnect a profile on that device later, for example at the next boot or when the device reappears. `nmcli device disconnect enp1s0` deactivates the device itself and stops NetworkManager from automatically activating anything on it until you bring a connection up manually or the system restarts. Use `con down` to stop using one profile, and `device disconnect` when you want the interface to stay quiet for now.",
   "A related idea is the difference between the running state and the saved state. `nmcli con show --active` lists only the profiles that are active right now, while `nmcli con show` lists all saved profiles. A profile can be active now but set not to autoconnect, which means it works today and disappears after reboot. Equally, a profile can be set to autoconnect but not active, which means it is not in use now but will be after reboot. Checking both views tells you the present and the future.",
   "Be careful when working over SSH (Secure Shell). Taking down the connection you are logged in through cuts your session immediately, and changing the address with `con up` can do the same. On the exam, make network changes from the console if you can, or chain the commands on one line, such as a modify followed by an up, so the change completes even if the session drops. After every change, verify with `nmcli con show --active`, `ip addr` and `ip route`.",
   "Finally, prove persistence. The most reliable test is to reboot once at the end of your networking work and confirm that the right profile comes up on its own with the right address. That reboot reproduces exactly what the grader does, and it is far better to discover a competing autoconnect profile yourself than to lose the points for every task that depended on the network."
  ],
  "analogy": "Autoconnect profiles are like several alarms on a phone for the same morning. Each alarm is a profile for the same device; autoconnect yes means the alarm is switched on. If two are switched on, you cannot be sure which wakes you, so you switch one off or mark one as the priority. con up is pressing play on an alarm right now. The analogy stops at timing: NetworkManager activates only one profile per device, while a phone would happily ring both alarms.",
  "terms": [
   [
    "nmcli con up",
    "Activates a connection profile on its device, applying its current settings."
   ],
   [
    "nmcli con down",
    "Deactivates a connection profile; NetworkManager may still autoconnect a profile on that device later."
   ],
   [
    "connection.autoconnect",
    "A profile property that makes NetworkManager activate it automatically at boot and when the device appears."
   ],
   [
    "autoconnect-priority",
    "A number that decides which of several autoconnect profiles wins for a device; higher wins."
   ],
   [
    "nmcli device disconnect",
    "Deactivates a device and prevents automatic reactivation until a connection is brought up manually or the system restarts."
   ]
  ],
  "example": "A server has two profiles for enp1s0: the installer's DHCP profile and your static one. After reboot it keeps coming up with the DHCP address. You set connection.autoconnect no on the DHCP profile and yes on the static profile, bring up the static profile, and nmcli -f NAME,DEVICE,AUTOCONNECT con show confirms the change. The next reboot comes up static.",
  "mistakes": [
   [
    "Assuming that a profile active now will also be active after reboot.",
    "Activation is not persistence. Check connection.autoconnect, and look for competing autoconnect profiles on the same device."
   ],
   [
    "Using nmcli con down to keep an interface down permanently.",
    "con down only deactivates that profile; an autoconnect profile can come back later. Use nmcli device disconnect for the current boot, or disable autoconnect on its profiles."
   ],
   [
    "Believing a lower autoconnect-priority number wins.",
    "Higher numbers win. Give the preferred profile a larger value."
   ],
   [
    "Thinking you must run con down before con up on the same device.",
    "Bringing up a profile on a device automatically replaces the profile active there."
   ]
  ],
  "tryit": [
   [
    "A lab server has three profiles for enp2s0: dhcp-default, static-lab and static-test. The task says static-lab must be active now and after every reboot, and the others must stay saved for later use. What do you run?",
    "Set connection.autoconnect no on dhcp-default and static-test, set connection.autoconnect yes on static-lab (optionally with a higher autoconnect-priority), then run nmcli con up static-lab. Verify with nmcli -f NAME,DEVICE,AUTOCONNECT con show and, ideally, a reboot."
   ],
   [
    "You are connected to a remote server over SSH through enp1s0 and need to switch it from profile old to profile new on the same interface. What is the risk, and how do you reduce it?",
    "Bringing up the new profile replaces the old one and can drop your session, especially if the address changes. Use console access if available, or run the switch as a single chained command so it completes even if SSH drops, and be ready to reconnect at the new address."
   ]
  ],
  "tip": "If the wrong settings come back after reboot, look for another autoconnect profile on the same device. Either delete it, set autoconnect to no, or raise the priority of the one you want, then reboot once to prove it.",
  "check": [
   [
    "What property makes a profile activate at boot?",
    "connection.autoconnect set to yes."
   ],
   [
    "You modified a profile; how do you apply the changes to the live interface?",
    "Run nmcli con up name (or nmcli device reapply for some changes)."
   ],
   [
    "Two autoconnect profiles match the same device. How do you choose which one wins?",
    "Set a higher connection.autoconnect-priority on the preferred one, or disable autoconnect on the other."
   ],
   [
    "How do you list only the profiles that are active right now?",
    "nmcli con show --active."
   ]
  ]
 },
 {
  "t": "Configuring hostname resolution: hostnamectl, /etc/hosts, ipv4.dns and /etc/resolv.conf",
  "hook": "At Orchard Lane Engineering, a new build server keeps introducing itself as localhost.localdomain in every email alert, and the monitoring team cannot tell which machine is complaining. Worse, it cannot install packages, because it cannot turn the repository server's name into an address. Priya fixed the name resolution yesterday by typing a nameserver line straight into /etc/resolv.conf, and it worked, until the network connection restarted overnight and her line disappeared. Now the ticket is back with a note in capital letters: make it stick. Where should the hostname and DNS settings really go on RHEL, and why did Priya's fix vanish?",
  "simple": "Computers talk to each other using number addresses, but people prefer names. Two jobs are involved here. First, each computer has its own name, called a hostname, which you set with a tool called hostnamectl. Second, a computer needs a way to look up other computers' names and find their number addresses. It can check a small local list in a file called /etc/hosts, like a personal address book, and then ask a DNS server, which is like a phone directory service. On RHEL, the DNS server addresses are part of the network profile, and NetworkManager writes them into a file called /etc/resolv.conf for you. If you edit that file directly, NetworkManager overwrites your change, a bit like correcting a printed report instead of the spreadsheet behind it.",
  "body": [
   "Two related jobs fall under this objective: giving the machine its own name, and making it able to turn names into addresses. Both are routine RHCSA (Red Hat Certified System Administrator) exam tasks, and both matter beyond themselves. A system that cannot resolve names makes later tasks, such as NFS (Network File System) mounts, time synchronization and repository access, fail in confusing ways, so it pays to set this up correctly and verify it early.",
   "Start with the hostname. The static hostname is stored in `/etc/hostname` and set with `hostnamectl set-hostname server1.example.com`. That one command updates the file and the running system at once, so no reboot is needed. Run `hostnamectl` to see the static hostname along with details such as the operating system and kernel, or `hostname` for just the name. Use the FQDN (fully qualified domain name), the complete name including the domain, when the task gives one. Existing shell prompts keep showing the old name until you open a new shell, which is cosmetic and not a sign that the change failed. systemd actually tracks three kinds of name: the static hostname in `/etc/hostname`, which is the one the exam cares about; a transient hostname, which can be set temporarily at runtime, for example from DHCP when no static name exists; and a pretty hostname, a free-form descriptive label. `hostnamectl set-hostname` sets the static name, and when a static name is set it takes precedence, so a DHCP server cannot quietly rename your machine. If a server shows `localhost` or a strange DHCP-provided name, that usually means no static hostname has been set yet.",
   "Name resolution is the second job. When a program looks up a name, the system follows the sources listed on the `hosts:` line in `/etc/nsswitch.conf` (the name service switch configuration), normally `files` first and then `dns`. The `files` source means `/etc/hosts`, a simple text file in which each line holds an address followed by a canonical name and optional aliases. Entries there take effect immediately, need no service restart, and override DNS for those names because `files` is checked first. This makes `/etc/hosts` handy in labs, small setups and exam tasks that ask for a static mapping.",
   "```\n# /etc/hosts\n127.0.0.1      localhost localhost.localdomain\n192.168.10.20  server1.example.com server1\n192.168.10.30  server2.example.com server2\n```",
   "DNS (Domain Name System) is the network-wide directory. The resolver reads `/etc/resolv.conf`, where `nameserver` lines list DNS server addresses in the order they are tried and a `search` line lists domains appended to short names, so `server2` can be tried as `server2.example.com`. On RHEL, NetworkManager writes this file from the settings of the active connections. That is why hand edits disappear: the next time a connection is activated or a DHCP (Dynamic Host Configuration Protocol) lease renews with new values, NetworkManager rewrites the file. The file usually begins with a comment saying it was generated by NetworkManager, which is your reminder to configure DNS on the connection instead.",
   "```bash\nnmcli con mod static1 ipv4.dns '192.168.10.1 192.168.10.2'\nnmcli con mod static1 ipv4.dns-search example.com\nnmcli con mod static1 ipv4.ignore-auto-dns yes   # with DHCP, use only these\nnmcli con up static1\ncat /etc/resolv.conf\n```",
   "The DNS properties work like the address properties. `ipv4.dns` holds one or more server addresses; giving a new value replaces the list, `+ipv4.dns` adds a server to the existing list, and `-ipv4.dns` removes one. `ipv4.dns-search` sets the search domains. IPv6 has matching `ipv6.dns` and `ipv6.dns-search` properties. As always with nmcli, the change is saved immediately but reaches `/etc/resolv.conf` only after you reactivate the connection with `nmcli con up`.",
   "DHCP adds one wrinkle. With `ipv4.method auto`, the DHCP server usually supplies DNS servers too, and NetworkManager combines them with any you configured. If a task says the system must use only the server you specify, set `ipv4.ignore-auto-dns yes` so the DHCP-provided servers are ignored while the address still comes from DHCP. Forgetting this is a common reason `/etc/resolv.conf` shows an unexpected extra nameserver.",
   "Verify with the right tool. `getent hosts name` resolves a name exactly the way applications do, following the order in `/etc/nsswitch.conf`, so it consults `/etc/hosts` and then DNS. If `getent hosts server2` returns the address you expect, applications will see the same answer. Tools such as `dig` and `host` query DNS servers directly and skip `/etc/hosts`, which is useful for testing a DNS server but can mislead you about what applications actually see. Finish by checking `hostnamectl` for the name and `cat /etc/resolv.conf` for the nameservers, and these settings will survive the grader's reboot."
  ],
  "analogy": "Name resolution works like finding a phone number. First you check the personal address book in your pocket, which is /etc/hosts, then you call directory assistance, which is DNS. nsswitch.conf is the habit that says check the pocket book first. /etc/resolv.conf is the printed list of directory numbers that NetworkManager reprints from your network settings, so you change the settings, not the printout. The analogy stops at speed: /etc/hosts changes apply instantly, with nothing to reload.",
  "terms": [
   [
    "hostnamectl",
    "The tool that shows and sets the system hostname, writing the static name to /etc/hostname."
   ],
   [
    "/etc/hosts",
    "A local file of address-to-name mappings consulted before DNS by default."
   ],
   [
    "/etc/resolv.conf",
    "The resolver file listing nameserver and search domains, generated by NetworkManager on RHEL."
   ],
   [
    "ipv4.dns",
    "The NetworkManager connection property holding DNS server addresses for that profile."
   ],
   [
    "/etc/nsswitch.conf",
    "The name service switch file whose hosts: line sets the lookup order, normally files then dns."
   ],
   [
    "ipv4.ignore-auto-dns",
    "A property that makes a DHCP profile ignore DNS servers supplied by the DHCP server."
   ]
  ],
  "example": "You set the hostname with hostnamectl set-hostname servera.lab.example.com, then add DNS 172.25.250.254 with nmcli con mod on the active connection, set ipv4.dns-search lab.example.com, and reactivate it. /etc/resolv.conf now lists that nameserver and search domain, and getent hosts classroom.lab.example.com returns an address.",
  "mistakes": [
   [
    "Fixing DNS by editing /etc/resolv.conf directly.",
    "NetworkManager regenerates that file. Set ipv4.dns (and ipv4.dns-search) on the connection and run nmcli con up."
   ],
   [
    "Editing /etc/hostname and expecting the running name to change.",
    "Use hostnamectl set-hostname, which updates both the file and the running system without a reboot."
   ],
   [
    "Testing an /etc/hosts entry with dig or host.",
    "Those tools query DNS directly and ignore /etc/hosts. Use getent hosts to see what applications resolve."
   ],
   [
    "Setting ipv4.dns on a DHCP profile and expecting only that server to be used.",
    "DHCP-supplied servers are added too. Set ipv4.ignore-auto-dns yes to use only your list."
   ]
  ],
  "tryit": [
   [
    "A task says: serverd must resolve the name backup.lab.example.com to 172.25.250.40 even if DNS does not know it, and its hostname must be serverd.lab.example.com. What do you do and how do you verify each part?",
    "Add the line 172.25.250.40 backup.lab.example.com backup to /etc/hosts and run hostnamectl set-hostname serverd.lab.example.com. Verify with getent hosts backup.lab.example.com, which reads /etc/hosts, and with hostnamectl or hostname."
   ],
   [
    "A DHCP-configured workstation must use only the DNS server 10.20.0.53. After nmcli con mod office ipv4.dns 10.20.0.53 and nmcli con up office, /etc/resolv.conf shows 10.20.0.53 and two other nameservers. Why, and what is the fix?",
    "The other two come from the DHCP server. Run nmcli con mod office ipv4.ignore-auto-dns yes, then nmcli con up office, and /etc/resolv.conf should list only 10.20.0.53."
   ]
  ],
  "tip": "Do not fix DNS by editing /etc/resolv.conf directly on RHEL; NetworkManager rewrites it. Set ipv4.dns on the connection and bring it up again, then test with getent hosts.",
  "check": [
   [
    "Which command permanently sets the hostname without a reboot?",
    "hostnamectl set-hostname name."
   ],
   [
    "Which file decides whether /etc/hosts is checked before DNS?",
    "/etc/nsswitch.conf, on its hosts: line."
   ],
   [
    "Why do your manual edits to /etc/resolv.conf disappear?",
    "NetworkManager regenerates it from connection DNS settings; configure ipv4.dns with nmcli instead."
   ],
   [
    "Which nmcli property sets the search domain?",
    "ipv4.dns-search (or ipv6.dns-search for IPv6)."
   ]
  ]
 },
 {
  "t": "Checking addresses, routes and name resolution: ip addr, ip route, ping, getent hosts",
  "hook": "The help desk at Tamarack Freight forwards you a ticket at 7:40 a.m.: the inventory server cannot reach the package repository, and the morning update job failed. Your colleague Ruben has already restarted the firewall twice, rebooted the server once, and is now proposing to rebuild the network profile from scratch. You suggest five minutes of checking first. The interface might be down, the address might be wrong, the gateway might be missing, the remote host might be unreachable, or the name might simply not resolve. Each of those has a different fix, and guessing wastes the morning. Which commands answer each question, and in what order should you ask them?",
  "simple": "When a computer cannot reach something on the network, the trick is to check one thing at a time, from closest to farthest. First, does the network card have an address? The command ip addr shows that. Second, does the computer know which way to send traffic? ip route shows the list of directions, including the main exit, called the default gateway. Third, can it reach that exit and then the far machine? ping sends a small hello message and waits for a reply. Fourth, can it turn a name into an address? getent hosts looks up a name the same way programs do. It is like a delivery driver checking they have the truck, the map, the open road and the right street address.",
  "body": [
   "When networking misbehaves, test layer by layer instead of guessing. Ask four questions in order: does the interface have the right address, does the system know where to send traffic, can it reach the next hop and then the destination, and can it resolve names? A handful of commands answer each question, and they are the same commands you use to verify your own work on the RHCSA (Red Hat Certified System Administrator) exam after every networking task. Working from the bottom up means the first failing check points straight at the problem.",
   "The first question is about the interface. `ip addr` (short form `ip a`) lists interfaces and their addresses. For each interface, look for `state UP` on the first line, an `inet` line with the IPv4 address and prefix, such as `inet 192.168.10.20/24`, and `inet6` lines for IPv6 addresses. `ip -br addr` gives a brief one-line-per-interface summary that is easy to scan. `ip link` shows only link state and MAC (media access control) addresses, which helps when you suspect a cable or virtual link rather than addressing. A missing or wrong address usually means the connection profile is not active or is configured incorrectly, so the next step would be `nmcli con show --active`.",
   "The second question is about routing. `ip route` (short form `ip r`) shows the routing table. The `default via` line names the default gateway, the router that receives traffic for any destination not on a directly connected network. Directly connected networks appear as routes marked `proto kernel`, created automatically from the interface address and prefix. `ip -6 route` shows IPv6 routes. `ip route get` followed by a destination address shows exactly which route, source address and interface the kernel would use for that destination, which settles arguments about where traffic is really going. No default route means the system can talk to its local subnet but nothing beyond it.",
   "```bash\nip -br addr                # brief: one line per interface\nip route\n# default via 192.168.10.1 dev enp1s0 proto static metric 100\nping -c 3 192.168.10.1     # gateway reachable?\nping -c 3 server2          # name + reachability\ngetent hosts server2       # resolution only\nss -tlnp                   # listening TCP ports\n```",
   "The third question is about reachability. `ping` sends ICMP (Internet Control Message Protocol) echo requests and reports replies along with the round-trip time. Always use `-c` to set a count, otherwise ping on Linux runs until you press Ctrl+C. A sensible sequence is to ping the gateway first, then a remote address, then a remote name. If the gateway does not answer, the problem is local: address, link or the gateway itself. If the gateway answers but a remote address does not, look at routing or something beyond your network. Note that some hosts and firewalls deliberately drop ICMP, so a failed ping is a strong clue, not absolute proof.",
   "The fourth question is about names. If pinging an address works but pinging a name fails, connectivity is fine and the problem is resolution. `getent hosts name` resolves a name exactly as applications do, following the `hosts:` line in `/etc/nsswitch.conf`, which normally checks `/etc/hosts` first and then DNS (Domain Name System). If getent returns nothing, check `/etc/hosts` and the nameservers in `/etc/resolv.conf`, and fix DNS on the connection with `nmcli con mod` rather than by editing files NetworkManager manages.",
   "Choose your name lookup tool to match the question. Tools such as `dig` and `host`, from the bind-utils package, query DNS servers directly and skip `/etc/hosts`. That is ideal when you want to test whether a DNS server knows a name, but it can mislead you about what applications see: a name defined only in `/etc/hosts` fails in dig yet works for every program. getent answers the question that matters for most troubleshooting, which is what the system will actually resolve.",
   "Sometimes the network is fine and the service is the problem. `ss -tulpn` lists listening TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) sockets with numeric ports and the owning process; `ss -tlnp` limits it to TCP. If a web server should be listening on port 80 but nothing appears, no firewall rule or route change will help, because there is nothing to connect to. Checking this before you blame the firewall saves a lot of time.",
   "Put together, these checks form a quick routine you can run in under a minute: `ip -br addr`, `ip route`, `ping -c 3` to the gateway, `ping -c 3` to a remote address, `getent hosts` for the name, and `ss -tlnp` on the server side. Use it after every network change on the exam, and you will catch mistakes while they are still cheap to fix."
  ],
  "analogy": "Troubleshooting a network is like finding out why a parcel was not delivered. Does the sender have a return address on the box (ip addr)? Does the courier know the route out of town (ip route and the default gateway)? Is the road open to the depot and then the destination (ping)? Is the street name in the directory (getent hosts)? And is anyone home to sign for it (ss)? The analogy stops at ping: a closed road always stops a parcel, but a host that ignores ping may still accept real traffic.",
  "mnemonic": "Address, Route, Reach, Resolve: ip addr, ip route, ping, getent hosts. Check them in that order, from closest to farthest.",
  "terms": [
   [
    "ip addr",
    "Shows network interfaces with their state and IPv4 and IPv6 addresses."
   ],
   [
    "Default gateway",
    "The router that receives traffic for destinations not on a directly connected network, shown as default via in ip route."
   ],
   [
    "getent hosts",
    "Resolves a name using the system's configured order (nsswitch), including /etc/hosts and DNS."
   ],
   [
    "ICMP",
    "Internet Control Message Protocol, used by ping for echo requests and replies."
   ],
   [
    "ss",
    "Socket statistics tool; ss -tulpn lists listening TCP and UDP ports with owning processes."
   ],
   [
    "ip route get",
    "Shows which route, source address and interface the kernel would use for a given destination."
   ]
  ],
  "example": "A server cannot install packages from the repository host. ip addr shows the right address, ping to the gateway works, ping to the repository's IP works, but getent hosts on its name returns nothing. The issue is name resolution, so you fix ipv4.dns on the connection with nmcli and run nmcli con up instead of touching routes, and getent hosts now returns the address.",
  "mistakes": [
   [
    "Concluding a host is down because ping fails.",
    "Some hosts and firewalls drop ICMP. Treat a failed ping as a clue and confirm with other checks, such as connecting to the service port."
   ],
   [
    "Using dig to check whether applications can resolve a name in /etc/hosts.",
    "dig queries DNS directly and ignores /etc/hosts. Use getent hosts to see what applications resolve."
   ],
   [
    "Running ping without -c and waiting for it to finish.",
    "Linux ping runs until interrupted. Use -c 3 or press Ctrl+C."
   ],
   [
    "Blaming the firewall when a service is unreachable.",
    "Check ss -tlnp on the server first; if nothing is listening on the port, the service is the problem, not the firewall."
   ]
  ],
  "tryit": [
   [
    "A workstation can ping 192.168.10.1 (its gateway) but cannot ping 10.50.0.20 on another site, and ip route shows only one line: 192.168.10.0/24 dev enp1s0 proto kernel. What is wrong, and how would you fix it permanently?",
    "There is no default route, so the system only knows its local subnet. Set ipv4.gateway 192.168.10.1 on the connection with nmcli con mod, run nmcli con up, and confirm a default via line appears in ip route."
   ],
   [
    "A web server responds to ping and getent hosts resolves its name correctly from clients, but browsers cannot connect to it on port 80. What do you check on the server first?",
    "Run ss -tlnp and look for a listener on port 80. If nothing is listening, start and enable the web service. If it is listening, then check the firewall rule next."
   ]
  ],
  "tip": "getent hosts shows what applications will resolve; dig and host bypass /etc/hosts. Pick the tool that matches the question being asked, and always check address, route, reach and resolve in that order.",
  "check": [
   [
    "Which line in ip route output shows the default gateway?",
    "The line starting with default via, followed by the gateway address and interface."
   ],
   [
    "Ping to an IP address works but ping to its name fails. Where is the problem?",
    "In name resolution: /etc/hosts, DNS server settings or the DNS server itself."
   ],
   [
    "Why can dig give a different answer from getent hosts?",
    "dig queries DNS directly and ignores /etc/hosts and nsswitch order, while getent uses the same lookup path as applications."
   ],
   [
    "Which command lists listening TCP ports with their processes?",
    "ss -tlnp (or ss -tulpn to include UDP)."
   ]
  ]
 },
 {
  "t": "Configuring network services to start automatically at boot",
  "hook": "You finish setting up a small FTP server for the design team at Gullwing Print Studio. Files upload, files download, and Ana, the studio manager, gives you a thumbs-up before leaving for the weekend. On Monday, nobody can connect. The server rebooted on Sunday for updates, and when you log in, the service is not running, the firewall shows no trace of the rule you added, and you are not even sure the network came up with the right address. Everything worked on Friday. What does it take to make a network service survive a reboot, and how do you prove it before the grader, or Ana, finds out the hard way?",
  "simple": "A network service is a program that waits for other computers to connect, like a web server or a file server. For it to be useful, three things must be true every time the computer starts. First, the program itself must be set to start automatically, not just running because you started it once. Second, the network connection must come up on its own with the right address. Third, the firewall, which is the computer's door guard, must have a lasting rule that lets visitors in. If any one of these is only set up for today, everything breaks after a restart. It is like opening a shop: you need staff scheduled, the lights on and the front door unlocked every morning, not just on opening day.",
  "body": [
   "A network service is only useful if it is listening when clients arrive, including after a reboot. On RHEL (Red Hat Enterprise Linux), making a network service start at boot uses the same systemd commands as any other service, plus two network-specific checks: the network connection itself must come up automatically, and clients must be allowed through the firewall. The RHCSA (Red Hat Certified System Administrator) exam grades systems after a reboot, so anything configured only for the current session is effectively not done.",
   "Step one is the service unit. After installing a package such as httpd, vsftpd or nfs-utils, the service is usually installed but disabled and stopped. Run `systemctl enable --now httpd` so it starts now and at every boot. The `enable` part creates the link that makes systemd start the unit at boot, typically from `multi-user.target`, and `--now` also starts it immediately so you can test right away. Confirm with `systemctl is-enabled httpd`, which should print `enabled`, and `systemctl is-active httpd`, which should print `active`. `systemctl status httpd` shows both facts plus recent log lines, which helps if the service fails to start.",
   "Being active is not the same as listening where clients expect. `ss -tlnp` lists listening TCP (Transmission Control Protocol) sockets with numeric ports and the owning process, so `ss -tlnp | grep ':80'` confirms that httpd is listening on port 80. If the service is active but the port is missing, look at its configuration file for a different port or address, and check its logs with `journalctl -u httpd`.",
   "Step two is the network itself. NetworkManager must be enabled, which it is by default, and the connection profile must have `connection.autoconnect yes` so it activates at boot. Check with `systemctl is-enabled NetworkManager` and `nmcli -f NAME,DEVICE,AUTOCONNECT con show`. A service can be enabled perfectly and still be unreachable after reboot because the interface did not come up, or came up with a different profile and a different address. If more than one autoconnect profile exists for the same device, make sure the right one wins, as covered in the lesson on autoconnect.",
   "Step three is access through the firewall. firewalld keeps two configurations: runtime, which is what is enforced right now, and permanent, which is what loads at boot and on reload. Open the service permanently, for example `firewall-cmd --permanent --add-service=http`, then run `firewall-cmd --reload` so the permanent configuration becomes the running one. A rule added without `--permanent` works immediately and disappears at the next reboot or reload, which is one of the most common ways a working service breaks overnight. Check with `firewall-cmd --list-services`, and with `firewall-cmd --permanent --list-services` to see what will load at boot. If the service uses a non-standard port, SELinux (Security-Enhanced Linux) may also need a port label, which is covered in the SELinux lessons.",
   "```bash\ndnf install -y httpd\nsystemctl enable --now httpd\nfirewall-cmd --permanent --add-service=http\nfirewall-cmd --reload\nsystemctl is-enabled httpd NetworkManager\nss -tlnp | grep ':80'\n```",
   "Some services need to wait until the network is fully configured, not just until NetworkManager has started. Units that need this order themselves after `network-online.target` and pull it in with a `Wants=` dependency; NetworkManager provides that target through its wait-online service, `NetworkManager-wait-online.service`, which waits until connections are up. Most packaged services already handle this correctly. The idea explains why the `_netdev` option exists for network file system mounts in `/etc/fstab`, and why a custom unit that binds to a specific IP (Internet Protocol) address might fail at boot if it starts before that address exists.",
   "Keep the three steps together as a checklist, because each one hides the others when you test casually. If you test right after configuring, the service is running because you started it, the network is up because it was already up, and the firewall rule works because it is in the runtime configuration. None of that proves the system will behave the same after a restart. Only the enabled state, the autoconnect setting and the permanent firewall rule do.",
   "The final and most reliable test is a reboot. After the system comes back, check `systemctl is-active` for the service, `ss -tlnp` for the listening port, `ip addr` for the interface address, `firewall-cmd --list-services` for the rule, and then a real connection from another host, such as fetching the default web page with `curl` followed by the server's name. If all of those pass after a reboot, the grader will see the same thing."
  ],
  "analogy": "Running a network service is like running a small shop. Enabling the service is putting staff on the permanent rota rather than asking someone to come in once. Autoconnect is making sure the power and lights come on every morning. A permanent firewall rule is unlocking the front door every day, not just propping it open on opening day. The analogy stops at one point: a shop owner notices a locked door at once, while a server happily runs a disabled service until the next reboot reveals it.",
  "mnemonic": "Service, Network, Firewall, then Reboot: enable --now the unit, autoconnect the connection, add the rule with --permanent and reload, then reboot and test.",
  "terms": [
   [
    "enable --now",
    "Enables a unit to start at boot and starts it immediately."
   ],
   [
    "network-online.target",
    "A systemd target reached when the network is fully configured, used to order services that need working networking."
   ],
   [
    "ss -tlnp",
    "Lists listening TCP sockets with numeric ports and the owning processes."
   ],
   [
    "Permanent firewall rule",
    "A firewalld change saved with --permanent so it survives reloads and reboots."
   ],
   [
    "systemctl is-enabled",
    "Reports whether a unit is configured to start at boot."
   ],
   [
    "Runtime configuration",
    "The firewalld rules enforced right now, lost at reboot or reload unless also saved permanently."
   ]
  ],
  "example": "You set up vsftpd and it works, but after the grader's reboot clients cannot connect. systemctl is-enabled vsftpd prints disabled, and firewall-cmd --permanent --list-services does not include ftp. Running systemctl enable --now vsftpd and firewall-cmd --permanent --add-service=ftp followed by firewall-cmd --reload makes it survive the next reboot, which you confirm by rebooting and connecting from another host.",
  "mistakes": [
   [
    "Running systemctl start and considering the service configured.",
    "start only runs it now. Use systemctl enable --now so it also starts at every boot, and confirm with is-enabled."
   ],
   [
    "Adding a firewall rule without --permanent.",
    "Runtime-only rules vanish at reboot or reload. Add the rule with --permanent and run firewall-cmd --reload."
   ],
   [
    "Adding a rule with --permanent and testing immediately without reloading.",
    "Permanent changes do not affect the running firewall until firewall-cmd --reload."
   ],
   [
    "Assuming that a service which is active is reachable.",
    "Check ss -tlnp for the listening port, the interface address and the firewall. Active only means the process is running."
   ]
  ],
  "tryit": [
   [
    "A task asks for an Apache web server on serverb reachable from clients after reboot. You installed httpd, ran systemctl start httpd and firewall-cmd --add-service=http, and a test from serverc works. List what is still missing.",
    "The service is not enabled, so run systemctl enable httpd (or enable --now). The firewall rule is runtime only, so add it again with --permanent and reload. Also confirm the connection profile autoconnects, then reboot and test from serverc again."
   ],
   [
    "After a reboot, systemctl is-active nfs-server says active and the permanent firewall rules are correct, but clients cannot reach the server, and ip addr shows a different address from the one you configured. Where do you look?",
    "At the network profiles. Another profile probably autoconnected on the device instead of yours. Check nmcli -f NAME,DEVICE,AUTOCONNECT con show, disable autoconnect on the unwanted profile or raise the priority of yours, bring it up and reboot to confirm."
   ]
  ],
  "tip": "For network services, check three things before calling a task done: the service is enabled, the connection autoconnects, and the firewall rule is permanent. Then reboot and test from another host.",
  "check": [
   [
    "Which two systemctl checks confirm a service will run after reboot and is running now?",
    "systemctl is-enabled for boot and systemctl is-active for current state."
   ],
   [
    "The service is enabled but unreachable after reboot. Name two network causes.",
    "The connection profile did not autoconnect or came up with the wrong address, or the firewall rule was runtime-only."
   ],
   [
    "What is network-online.target for?",
    "It marks when networking is fully configured, so services that need a working network can be ordered after it."
   ],
   [
    "How do you see which firewall services will be allowed after a reboot?",
    "firewall-cmd --permanent --list-services."
   ]
  ]
 },
 {
  "t": "Restricting network access with firewalld and firewall-cmd (services, ports, zones, --permanent, --reload)",
  "hook": "It is 4:40 p.m. at Larkspur Dental Group, and Owen from the front office has opened a ticket: the new scheduling web app works perfectly when he tests it on the server itself, but every workstation in the office gets a connection error. You check `systemctl status httpd` and the service is running. You run `ss -tlnp` and something is listening on port 80. Yet from your own laptop the browser just spins and then fails. Something between the network and the service is saying no. You also remember that last month someone fixed a similar problem, and the fix disappeared after the server rebooted. What is blocking the traffic, and how do you open it so it stays open?",
  "simple": "A firewall is like a receptionist at the front desk of a building. Visitors (network connections) arrive, and the receptionist checks a list of who is allowed in. On Red Hat Enterprise Linux, that receptionist is a program called firewalld, and you talk to it with the command `firewall-cmd`. You tell it things like let in web visitors or let in visitors for port 8080. The tricky part is that the receptionist has two lists: today's sticky note and the official printed list. A sticky note works right away but gets thrown out at the end of the day. The printed list survives, but only gets used after the receptionist rereads it. On the exam, you write on the printed list and then ask the receptionist to reread it.",
  "body": [
   "A host firewall decides which incoming network connections are allowed to reach the services running on a machine. Red Hat Enterprise Linux (RHEL) uses firewalld, a service that manages the kernel's packet filtering for you. Under the hood the kernel uses nftables, but you rarely touch those low-level rules directly. Instead you describe what you want in terms of zones, services and ports, and firewalld translates that into the correct rules. `firewall-cmd` is the command-line client that talks to the running firewalld daemon, so firewalld must be running for any of your commands to work. If `firewall-cmd --state` reports not running, start and enable it with `systemctl enable --now firewalld`.",
   "The first building block is the zone. A zone is a named trust level that carries its own list of allowed services and ports. Each network interface belongs to exactly one zone, and the default zone, normally `public`, applies to any interface not assigned elsewhere. On RHEL, the `public` zone allows very little out of the box: SSH (Secure Shell), the DHCPv6 (Dynamic Host Configuration Protocol for IPv6) client and cockpit, which is the RHEL web console. Any incoming connection that is not allowed by the zone is rejected. That is why a freshly installed web server is reachable from itself, because firewalld always accepts traffic on the loopback interface, but not from other machines.",
   "The second building block is the service. A service in firewalld is a named definition of one or more ports and protocols, such as `http` (TCP port 80), `https` (TCP port 443), `nfs` or `ssh`. Using service names is clearer than listing numbers and keeps related ports together. You can list every predefined service with `firewall-cmd --get-services`. When a program listens on a port that has no service definition, or on a non-standard port such as a web app on 8080, you open the port itself using the form `port/protocol`, for example `8080/tcp` or `5353/udp`. Forgetting the protocol part is a common typo that firewall-cmd rejects.",
   "Here is a typical sequence you might type during an exam task: look at the current state, add what is needed permanently, remove something that should not be open, reload, and check again.",
   "```bash\nfirewall-cmd --get-default-zone\nfirewall-cmd --list-all                   # rules in the default zone\nfirewall-cmd --permanent --add-service=http\nfirewall-cmd --permanent --add-port=8080/tcp\nfirewall-cmd --permanent --remove-service=cockpit\nfirewall-cmd --reload\nfirewall-cmd --list-all\n```",
   "The most important idea in this topic is the difference between runtime and permanent configuration. Without `--permanent`, a change affects the running firewall immediately, but it lives only in memory and is lost at the next reload or reboot. With `--permanent`, the change is written to the saved configuration under `/etc/firewalld/`, but it does not take effect until you run `firewall-cmd --reload`. That split explains the ticket in the opening scene: a colleague probably opened the port without `--permanent`, it worked, and the reboot erased it. The usual exam pattern is therefore to add rules with `--permanent` and then reload. An alternative that suits careful testing is to make runtime changes first, confirm they work, and then save everything at once with `firewall-cmd --runtime-to-permanent`.",
   "By default every command works on the default zone. Add `--zone=name` to work on a different one, as in `firewall-cmd --permanent --zone=internal --add-service=ssh`. To see which zones are actually in use, and which interfaces or sources are bound to them, run `firewall-cmd --get-active-zones`. A typical output shows `public` followed by a line such as `interfaces: enp1s0`. If you add a rule to a zone that no interface uses, the rule is valid but does nothing, so checking the active zones saves confusion.",
   "Always finish a firewall task by running `firewall-cmd --list-all` after the reload. The output lists the zone's target, interfaces, services, ports and other settings, and because a reload has just copied the permanent configuration into the running one, what you see is both what is active now and what will survive a reboot. If you want to see only the saved configuration, add `--permanent` to the listing command. Seeing `services: cockpit dhcpv6-client http ssh` and `ports: 8080/tcp` is the confirmation a grader will look for.",
   "Finally, remember that the firewall is only one of several gates a connection must pass. A client may still fail because the service is not listening on the expected address or port, because SELinux (Security-Enhanced Linux) blocks the service from using a non-standard port, or because the service's own configuration restricts clients. A practical troubleshooting order is to confirm the service is running, confirm it is listening with `ss -tlnp`, test locally, and then, when it works locally but not from another machine, look at the firewall first."
  ],
  "analogy": "Think of firewalld as a building with a front desk. The zone is the rulebook for one entrance, the services are the visitor categories on the list, and ports are individual room numbers you can add by hand. A runtime change is a sticky note on the desk: effective now, gone when the shift changes. A permanent change is an edit to the printed rulebook: it lasts, but the desk only follows it after rereading it with --reload. The analogy stops at direction: this lesson's rules filter incoming connections, not people leaving.",
  "terms": [
   [
    "firewalld",
    "The RHEL firewall service that manages packet filtering rules through zones, services and ports."
   ],
   [
    "firewall-cmd",
    "The command-line client used to query and change firewalld's runtime and permanent configuration."
   ],
   [
    "Zone",
    "A named trust level holding allowed services and ports, applied to interfaces or source addresses."
   ],
   [
    "Service (firewalld)",
    "A named definition of ports and protocols, such as http for TCP 80, that can be allowed in a zone."
   ],
   [
    "--permanent",
    "Saves a firewall-cmd change to configuration without applying it until a reload."
   ],
   [
    "--reload",
    "Reloads firewalld so the permanent configuration becomes the running configuration, discarding runtime-only changes."
   ]
  ],
  "example": "A web server must accept HTTP and a management app on TCP 8443. You run firewall-cmd --permanent --add-service=http and firewall-cmd --permanent --add-port=8443/tcp, then firewall-cmd --reload. firewall-cmd --list-all shows services including http and ports 8443/tcp, and a browser on another machine can reach both.",
  "mistakes": [
   [
    "Adding a rule with --permanent and assuming it is active now.",
    "A permanent change is only saved. It does not touch the running firewall until firewall-cmd --reload, so test after the reload, not before."
   ],
   [
    "Adding a rule without --permanent because it works immediately.",
    "Runtime changes vanish at the next reload or reboot, and the exam grader reboots the machine. Use --permanent plus --reload, or --runtime-to-permanent after testing."
   ],
   [
    "Writing --add-port=8080 without a protocol.",
    "Ports must be given as port/protocol, such as 8080/tcp. Without the protocol firewall-cmd returns an error and nothing is opened."
   ],
   [
    "Assuming that if the firewall is open, the service must be reachable.",
    "The service must also be listening on the right address and port, and SELinux or the service's own settings can still block it. The firewall is one gate among several."
   ]
  ],
  "tryit": [
   [
    "A colleague opened TCP 3000 for a dashboard with firewall-cmd --add-port=3000/tcp yesterday. Users could connect all day. This morning, after patching and a reboot, the dashboard is unreachable again, though the application is running and listening. What happened, and what do you run?",
    "The original rule was a runtime-only change, so the reboot discarded it. Run firewall-cmd --permanent --add-port=3000/tcp followed by firewall-cmd --reload, then confirm with firewall-cmd --list-all. If the rule were still in runtime, firewall-cmd --runtime-to-permanent would also have saved it."
   ]
  ],
  "tip": "A --permanent change without --reload does nothing yet; a change without --permanent is gone after the next reload or reboot. The exam grader reboots, so permanent plus reload is the safe pattern, followed by firewall-cmd --list-all to verify.",
  "check": [
   [
    "What happens to a rule added without --permanent when firewalld reloads?",
    "It is lost, because reload replaces the runtime configuration with the permanent one."
   ],
   [
    "How do you open TCP port 8080 permanently in the default zone?",
    "firewall-cmd --permanent --add-port=8080/tcp, then firewall-cmd --reload."
   ],
   [
    "Which command shows the running rules for the default zone?",
    "firewall-cmd --list-all."
   ],
   [
    "A web service works with curl localhost but not from another host. What is the first thing to check?",
    "The firewall, with firewall-cmd --list-all, to see whether the service or port is allowed in the active zone."
   ]
  ]
 },
 {
  "t": "Using nmtui as a text-based alternative to nmcli",
  "hook": "You are forty minutes into a practice exam at the Cedar Valley Library training lab. The task reads: give server2 the static address 172.25.250.11/24, gateway 172.25.250.254, DNS server 172.25.250.254, and hostname server2.lab.example. You start typing an nmcli command, pause, and cannot remember whether the property is ipv4.address or ipv4.addresses. Beside you, Rosa from the evening class opens a blue menu screen, tabs through labeled boxes, and is finished before you have checked the man page. But when the instructor tests her machine, it still answers on the old address. What did the menu save, and what did it not do?",
  "simple": "NetworkManager is the part of RHEL that keeps track of network settings such as the computer's address, its gateway (the door out to other networks) and its DNS servers (the address book for names). There are two common ways to talk to it from a terminal. nmcli is a typed command where you must know exact setting names. nmtui is a simple menu that runs inside the terminal: you move with the arrow keys and Tab, fill in labeled boxes and press Enter. Both write the same settings files. The catch is that saving a change in nmtui is like writing a new address on a form: it is stored, but the network card keeps using the old one until you switch the connection off and on again.",
  "body": [
   "`nmtui`, short for NetworkManager text user interface, is a menu-driven program for the same everyday tasks you perform with `nmcli`. It runs in any terminal, including the exam's remote console, and you navigate it with the arrow keys, Tab, Enter and the space bar. Because both tools are clients of NetworkManager, they read and write the same connection profiles, stored as keyfiles under `/etc/NetworkManager/system-connections/`. Under exam time pressure, many people find nmtui quicker and less error-prone for one-off changes, because every field is labeled and you never need to recall exact property names such as `ipv4.addresses` or `ipv4.method`. The command comes from the `NetworkManager-tui` package, which may not be installed by default, so be ready to run `dnf install -y NetworkManager-tui`.",
   "The main menu offers three core choices. Edit a connection lets you add a new connection profile, change an existing one or delete one. Activate a connection lets you bring profiles up or down, which is how saved changes are applied. Set system hostname sets the static hostname, the same thing `hostnamectl set-hostname` does. You can skip the main menu and jump straight to one of these screens with `nmtui edit`, `nmtui connect` or `nmtui hostname`, and you can name a specific connection, as in `nmtui edit static1` or `nmtui connect static1`. Quit returns you to the shell.",
   "Inside the edit screen, the profile is laid out as a form. Near the top are the profile name and the device it is bound to. Further down, the IPv4 CONFIGURATION line shows a method such as Automatic, which means DHCP (Dynamic Host Configuration Protocol), or Manual. To set a static address, change it to Manual and then select Show to expand the hidden fields. You will see entries for Addresses, Gateway, DNS servers and Search domains. Enter each address in CIDR (Classless Inter-Domain Routing) form, such as `192.168.10.20/24`, because the prefix length is part of the address field. Use Add to put in a second DNS server. The IPv6 CONFIGURATION section works the same way.",
   "Below the address sections are check boxes. The most important one for the exam is Automatically connect, which maps directly to the `connection.autoconnect` property. If it is not ticked, the profile will not come up on its own after a reboot, and a grader who reboots your machine will find no network. There is also an option controlling whether the profile is available to all users. Toggle a check box with the space bar, then move to OK at the bottom and press Enter to save.",
   "The one real trap is activation. Saving in nmtui writes the profile to disk, but, exactly as with `nmcli con mod`, the running interface may keep using its old settings. That is what happened to Rosa in the opening scene. After saving, go back to the main menu, choose Activate a connection, select the profile, choose Deactivate, then choose Activate. If you prefer the shell, run `nmcli con up name`, which reapplies the profile in one step. Be aware that if you are connected over the same interface you are changing, reactivating it with a new address will drop your session, which is fine on a local console but worth remembering on a remote one.",
   "A short session that combines both tools looks like this:",
   "```bash\ndnf install -y NetworkManager-tui\nnmtui edit 'Wired connection 1'   # change settings, OK\nnmcli con up 'Wired connection 1'  # apply them\nip addr; ip route; cat /etc/resolv.conf\n```",
   "Use whichever tool you are faster and more accurate with, but know both. nmtui shines interactively because the form shows you every relevant field at once, which also makes it a good way to inspect a profile you did not create. nmcli is scriptable, works well over any connection, and is easier to verify precisely with `nmcli con show name`, where you can read each property and value. Many administrators use nmtui to make a change and nmcli to confirm it.",
   "Whatever tool you choose, verification is the same. Check the address with `ip addr`, the default route with `ip route`, and name resolution settings with `cat /etc/resolv.conf`. Test real connectivity, for example by pinging the gateway. Confirm the hostname with `hostnamectl`. Finally, make sure the profile has autoconnect enabled, because the exam is graded after a reboot and only persistent, automatically activated settings count."
  ],
  "analogy": "nmtui and nmcli are like filling out a paper change-of-address form versus typing the change into a records system with exact field codes. Both end up in the same filing cabinet. But filing the form does not move you: the mail carrier keeps delivering to the old house until the route is refreshed. In nmtui, that refresh is deactivating and reactivating the connection. The analogy breaks in one way: refreshing the route briefly drops the connection, so on a remote session you may lose your own link while it reactivates.",
  "terms": [
   [
    "nmtui",
    "A text-based, menu-driven NetworkManager interface for editing connections, activating them and setting the hostname."
   ],
   [
    "NetworkManager-tui",
    "The package that provides the nmtui command."
   ],
   [
    "Connection profile",
    "A saved set of network settings, such as address, gateway and DNS, that NetworkManager applies to a device."
   ],
   [
    "Automatically connect",
    "The nmtui check box that sets connection.autoconnect so the profile activates at boot."
   ],
   [
    "Activate a connection",
    "The nmtui menu for bringing profiles up or down so saved changes take effect."
   ]
  ],
  "example": "On the exam console you need a static address, gateway, DNS and hostname. You run nmtui, set IPv4 to Manual with the values, tick Automatically connect, save, reactivate the profile under Activate a connection, then set the hostname from the Set system hostname option, and verify with ip addr, ip route and hostnamectl.",
  "mistakes": [
   [
    "Believing that pressing OK in nmtui changes the live address.",
    "OK only saves the profile. The interface keeps its old settings until you deactivate and reactivate the connection or run nmcli con up."
   ],
   [
    "Typing the address without a prefix, such as 192.168.10.20, and a separate netmask.",
    "nmtui expects CIDR form in the Addresses field, such as 192.168.10.20/24. Leaving out the prefix risks the wrong subnet size, so always type it."
   ],
   [
    "Thinking nmtui and nmcli keep separate configurations that can conflict.",
    "Both are NetworkManager clients and write the same keyfiles. A change made in one is visible in the other."
   ],
   [
    "Leaving Automatically connect unticked on a new profile.",
    "Without autoconnect the profile does not come up at boot, so the configuration fails after the grader's reboot."
   ]
  ],
  "tryit": [
   [
    "You edit the profile static1 in nmtui, change the address from .10 to .20, and press OK. ip addr still shows .10. A teammate suggests rebooting the server to be safe. Is that necessary, and what is the faster correct step?",
    "A reboot is not necessary. The profile is saved but not applied. Use Activate a connection in nmtui to deactivate and reactivate static1, or run nmcli con up static1, then confirm with ip addr. A reboot would also work only if autoconnect is enabled, so check that too."
   ]
  ],
  "tip": "nmtui saves the profile but may not apply it; deactivate and reactivate the connection afterwards, exactly as you would run nmcli con up after nmcli con mod. Then confirm Automatically connect is ticked.",
  "check": [
   [
    "What three tasks does the nmtui main menu offer?",
    "Edit a connection, activate a connection, and set the system hostname."
   ],
   [
    "You saved new settings in nmtui but ip addr shows the old address. What do you do?",
    "Reactivate the connection in nmtui's Activate menu or with nmcli con up."
   ],
   [
    "Do nmtui and nmcli store configuration differently?",
    "No; both use NetworkManager and write the same keyfiles in /etc/NetworkManager/system-connections/."
   ],
   [
    "Which package must be installed if the nmtui command is not found?",
    "NetworkManager-tui."
   ]
  ]
 },
 {
  "t": "Creating, deleting and modifying local user accounts (useradd -u -G -s -c, usermod, userdel -r)",
  "hook": "Monday morning at Brightwater Veterinary Clinic, and the onboarding sheet on your desk lists three changes. A new technician, Dana Ruiz, needs an account with UID 2050 and access to the shared records group. Marcus has moved to the billing team and must join the billing group. And an intern who left on Friday must be removed completely. You add Marcus with a quick usermod command, and ten minutes later he calls: he can reach billing files, but he has lost access to everything he could open last week. Meanwhile the intern's old home directory is still sitting in /home. What went wrong with Marcus, and how do you clean up properly?",
  "simple": "A user account is a computer's record of a person or program: a name, an ID number, a home folder for their files, and the program that starts when they log in. On RHEL you manage these records with three commands. `useradd` creates an account, `usermod` changes one, and `userdel` removes one. Groups work like club memberships that give access to shared files. The most common slip is with usermod: telling it the groups a person should be in replaces their whole list of memberships, unless you also say append. It is like rewriting someone's keycard so it opens only the new door, when you meant to add one more door to the doors it already opened.",
  "body": [
   "Local user accounts are defined in files on the system itself, as opposed to accounts that come from a central directory service. RHCSA tasks routinely ask you to create users with specific properties, change those properties later and remove accounts cleanly. Three tools do this work: `useradd`, `usermod` and `userdel`. They share most of their option letters, so learning one makes the others easy, and all three must be run as root or through sudo.",
   "Running `useradd name` with no options creates the account using defaults. The account gets the next free UID (user ID), starting from 1000 for regular users on RHEL. It gets a private group with the same name as the user, which becomes its primary group. A home directory is created under `/home` and populated with a copy of the files in `/etc/skel`, and the login shell is set to `/bin/bash`. Importantly, the new account has no usable password, so nobody can log in with a password until you set one with `passwd name`. Any option you give overrides the matching default.",
   "Here is a typical creation command with several options, followed by the verification you should always run:",
   "```bash\nuseradd -u 2001 -G wheel,devs -s /bin/bash -c 'Alice Ng' alice\npasswd alice\nid alice\n# uid=2001(alice) gid=2001(alice) groups=2001(alice),10(wheel),1005(devs)\n```",
   "The key options are worth memorizing. `-u` sets the UID, which tasks often specify so that IDs match across systems or shared storage. `-g` sets the primary group, which must already exist. `-G` sets a comma-separated list of supplementary groups, with no spaces after the commas. `-s` sets the login shell, `-c` sets the comment field, usually the person's full name and quoted if it contains a space, and `-d` sets the home directory path. `-m` forces creation of the home directory and `-M` skips it. For accounts used by services rather than people, `-r` creates a system account with a UID below 1000 and, by default, no home directory. If a group listed with `-G` does not exist, useradd stops with an error, so create groups first.",
   "`usermod` changes an existing account using the same letters. For example, `usermod -s /sbin/nologin alice` changes the shell, `usermod -c 'Alice Ng-Park' alice` changes the comment and `usermod -u 3001 alice` changes the UID, which also updates ownership of files in her home directory. The option people most often get wrong is `-G`. Used alone, `usermod -G devs alice` replaces all of alice's supplementary groups with just devs, silently removing her from wheel and anything else. That is exactly what happened to Marcus in the opening scene. To add a group while keeping the others, use `-aG`, where `-a` means append: `usermod -aG billing marcus`. Other useful options are `-l newname` to rename the login and `-d /new/home -m` to move the home directory and its contents.",
   "`userdel name` removes the account from the account files but leaves the home directory and mail spool behind. Those leftover files then belong to a numeric UID that no longer has a name, and `ls -l` shows the number instead of a username. `userdel -r name` also removes the home directory and the mail spool in `/var/spool/mail`. Files the user owned elsewhere on the system, such as in `/tmp` or a shared project directory, are not removed either way. You can find them with `find / -nouser` and then reassign them with `chown` or delete them. Cleaning up matters for security: if a future account is created with the same UID, it would silently become the owner of all those orphaned files.",
   "Always verify your work. `id user` shows the UID, primary group and every supplementary group, and `getent passwd user` shows the full account line, including the comment, home directory and shell. Compare what you see with every requirement in the task. Remember also that group membership is read when a user logs in. A user who is already logged in when you add them to a group must log out and back in before their processes gain the new group, even though `id user` run by root already shows it.",
   "A good exam habit is to read the task once for each property it mentions: UID, comment, groups, shell, home and password. Build the useradd command to cover all of them, set the password, and then check each property with id and getent before moving on."
  ],
  "analogy": "Think of supplementary groups as doors programmed on an employee's keycard. usermod -aG is asking security to add one more door. usermod -G on its own is asking security to reprogram the card with only the doors you name, so every door you forgot to mention stops opening. userdel without -r deactivates the badge but leaves the person's locker full; -r empties the locker too. The analogy stops at files elsewhere: neither option clears things the user left in other rooms.",
  "terms": [
   [
    "UID",
    "User ID, the number the kernel uses to identify a user; regular users start at 1000 on RHEL."
   ],
   [
    "Primary group",
    "The group assigned to new files a user creates, set with -g and stored in /etc/passwd."
   ],
   [
    "Supplementary group",
    "An additional group membership that grants group permissions, set with -G."
   ],
   [
    "usermod -aG",
    "Appends supplementary groups to a user without removing existing ones."
   ],
   [
    "userdel -r",
    "Deletes a user account together with its home directory and mail spool."
   ],
   [
    "/etc/skel",
    "The skeleton directory whose files are copied into each new home directory."
   ]
  ],
  "example": "A task asks for user harry with UID 3000, comment Harry Potter, and membership in the sysadmins group. You run useradd -u 3000 -c 'Harry Potter' -G sysadmins harry, then set his password with passwd harry, and id harry shows uid=3000 with sysadmins among his groups.",
  "mistakes": [
   [
    "Using usermod -G group user to add someone to a group.",
    "Without -a, -G replaces the entire supplementary group list. Use usermod -aG group user to add while keeping existing memberships."
   ],
   [
    "Assuming useradd sets a password or that the user can log in immediately.",
    "A new account has no usable password. Run passwd user (or another password tool) before the user can log in with a password."
   ],
   [
    "Believing plain userdel removes the user's files.",
    "Plain userdel leaves the home directory and mail spool. Use userdel -r, and look for other files with find / -nouser."
   ],
   [
    "Mixing up -g and -G.",
    "Lowercase -g sets the single primary group; uppercase -G sets supplementary groups. Tasks that say member of a group almost always mean -G."
   ]
  ],
  "tryit": [
   [
    "User priya belongs to wheel and webdev. She now also needs the dbadmin group. A colleague drafts usermod -G dbadmin priya. Should you run it? If not, what should you run, and how do you confirm?",
    "Do not run it, because it would remove priya from wheel and webdev. Run usermod -aG dbadmin priya, then id priya should list wheel, webdev and dbadmin. Tell priya to log out and back in so her sessions pick up the new group."
   ],
   [
    "An employee with UID 2500 has left. You run userdel jsmith. A month later a new hire receives UID 2500 and finds old files in a project directory owned by them. What should have been done?",
    "Use userdel -r jsmith to remove the home directory and mail spool, then run find / -nouser (or find / -uid 2500 before deletion) to reassign or remove files the user owned elsewhere."
   ]
  ],
  "tip": "usermod -G without -a replaces every supplementary group. When a task says add a user to a group, use usermod -aG group user, and verify every requested property with id and getent passwd.",
  "check": [
   [
    "What does userdel -r do that plain userdel does not?",
    "It also deletes the user's home directory and mail spool."
   ],
   [
    "Which option sets a user's supplementary groups at creation?",
    "-G followed by a comma-separated list of groups."
   ],
   [
    "After usermod -aG devs bob, bob still cannot use the devs group in his open session. Why?",
    "Group membership is read at login; bob must log out and back in."
   ],
   [
    "What UID does a regular user created without -u receive on RHEL?",
    "The next free UID starting at 1000."
   ]
  ]
 },
 {
  "t": "Non-interactive shells for service accounts (/sbin/nologin)",
  "hook": "During a quarterly review at Pinecrest Water Authority, the auditor, Mr. Okafor, scrolls through the account list on your file server and stops at a line for backupsvc. That account runs the nightly backup job, nobody uses it as a person, and yet its login shell is /bin/bash. He asks a simple question: if someone learned the password for that account, could they open a shell on this server? You realize the honest answer is yes. The backup job must keep running as that user, owning its files, but no human should ever be able to log in as it. How do you close that door without breaking the job?",
  "simple": "Some accounts on a Linux computer belong to programs, not people. A backup tool or a web server runs under its own account so that if it misbehaves, it can only touch its own files. Those accounts need to exist, but nobody should log in with them. Every account has a login shell, which is the program that starts when someone logs in and gives them a command prompt. If you set that program to `/sbin/nologin`, any attempt to log in just prints a short message saying the account is not available and then ends. It is like a staff door with a sign: deliveries for this department still arrive, but the door does not open for visitors.",
  "body": [
   "Not every account on a server belongs to a person. Services such as web servers, databases and backup jobs run as their own dedicated users so that a compromise or bug in one service cannot automatically take over the whole system. This is the principle of least privilege applied to processes. These service accounts need to own files and run processes, but nobody should be able to log in as them interactively. Giving them a non-interactive shell is the standard way to enforce that, and RHCSA tasks often phrase it as the user must not have an interactive shell.",
   "To see how this works, recall the structure of `/etc/passwd`. Each account has one line with seven colon-separated fields, and the last field is the login shell: the program the system starts when that user logs in. For a normal person this is usually `/bin/bash`. If you set it to `/sbin/nologin`, then any interactive login, whether at the console, over SSH (Secure Shell) or with `su - user`, starts nologin instead of a real shell. The nologin program prints a short message, by default This account is currently not available, and exits immediately, which ends the session. On RHEL, `/sbin` is a symbolic link to `/usr/sbin`, so `/usr/sbin/nologin` and `/sbin/nologin` refer to the same file and either path works.",
   "You can set the shell when creating an account or change it later:",
   "```bash\nuseradd -r -s /sbin/nologin -c 'Backup service' backupsvc\nusermod -s /sbin/nologin sarah       # existing account\ngetent passwd sarah\n# sarah:x:1003:1003::/home/sarah:/sbin/nologin\nsu - sarah\n# This account is currently not available.\n```",
   "In the first command, `-r` makes a system account with a UID below 1000 and no home directory by default, which is typical for a service. The second command converts an existing regular account. The `getent` output confirms the change in the seventh field, and the `su -` test proves the behavior. On the exam, running that test as root is a quick way to check the requirement is met.",
   "It is important to understand the limits of nologin. It blocks shells, not authentication in general. A user whose shell is `/sbin/nologin` may still be able to authenticate to services that never start a shell, such as some FTP (File Transfer Protocol) or mail configurations. Root can still run commands as that user with `sudo -u user command` or `runuser -u user -- command`, which is exactly how many services and scheduled jobs operate, so the backup job in the opening scene keeps working. Depending on the SSH server configuration, features such as port forwarding might still be possible even without a shell. If an account must not authenticate at all, also lock its password or expire the account, which is covered in the lesson on locking accounts.",
   "A related tool you may see is `/bin/false`. It simply exits with a failure status and prints nothing. It also prevents interactive logins, but users get no explanation, which can generate confused help-desk tickets. On RHEL, `/sbin/nologin` is the preferred choice because it tells the user why the login failed, and it is what the exam expects when a task asks for a user without an interactive shell. The nologin program can also display a custom message if the file `/etc/nologin.txt` exists, although you do not need that for the exam.",
   "The list of valid login shells lives in `/etc/shells`. Some services, such as certain FTP servers, refuse to authenticate users whose shell is not listed in that file. That is worth knowing if a service account unexpectedly cannot authenticate to a service it is supposed to use. You can check any user's current shell with `getent passwd user` and reading the last field, or more precisely with `getent passwd user | cut -d: -f7`.",
   "Putting it together, a typical exam task might read: create user sarah who belongs to the group sysadmins but has no interactive shell. The answer is `useradd -G sysadmins -s /sbin/nologin sarah`, plus a password if the task asks for one. Verify with `id sarah` for the group, `getent passwd sarah` for the shell, and `su - sarah` to see the refusal message. If the task later says sarah should be allowed to log in again, reverse it with `usermod -s /bin/bash sarah`, because nothing else about the account was changed: her UID, groups, password and files all stayed exactly as they were."
  ],
  "analogy": "A service account with /sbin/nologin is like a company mailbox for a department. Packages addressed to it arrive, get stored and get processed by staff with the right keys, but there is no desk or chair behind it, so nobody can sit down and work as that department. Where the analogy stops: nologin only removes the chair. If the account can still authenticate to a service that never asks for a chair, such as some FTP setups, you also need to lock or expire it.",
  "terms": [
   [
    "Service account",
    "An account used by a program rather than a person, typically created with useradd -r."
   ],
   [
    "/sbin/nologin",
    "A shell that politely refuses interactive login, used to block logins for service accounts."
   ],
   [
    "Login shell",
    "The program started when a user logs in, stored in the last field of /etc/passwd."
   ],
   [
    "/etc/shells",
    "The list of valid login shells on the system."
   ],
   [
    "/bin/false",
    "A program that exits with failure and no message; it also blocks interactive logins but gives no explanation."
   ]
  ],
  "example": "The task: create user sarah as a member of sysadmins who must not have an interactive shell. You run useradd -G sysadmins -s /sbin/nologin sarah and set her password. su - sarah prints This account is currently not available, and getent passwd sarah ends in /sbin/nologin, which confirms the requirement.",
  "mistakes": [
   [
    "Believing /sbin/nologin fully disables an account.",
    "It only blocks interactive shells. The account may still authenticate to services that do not start a shell, and root can still run commands as it. Lock or expire the account for a full disable."
   ],
   [
    "Choosing /bin/false because it sounds stricter.",
    "Both block interactive logins. RHEL prefers /sbin/nologin because it explains the refusal, and exam tasks that say no interactive shell expect /sbin/nologin."
   ],
   [
    "Thinking a nologin shell will break a service that runs as that user.",
    "Services and scheduled jobs are started by systemd or root as that user without a login shell, so they keep working."
   ],
   [
    "Editing /etc/passwd by hand to change the shell.",
    "Use usermod -s, which edits the file safely. If you must edit by hand, use vipw, which locks the file."
   ]
  ],
  "tryit": [
   [
    "A web application runs as user webapp. Security wants to ensure nobody can SSH in as webapp, but the application must keep running and writing to its log directory. A junior admin suggests deleting the account and running the app as root instead. What do you recommend?",
    "Keep the dedicated account and run usermod -s /sbin/nologin webapp. The service keeps running and owning its files, while interactive logins are refused. Running the app as root would violate least privilege. If the account must not authenticate at all, also lock its password."
   ]
  ],
  "tip": "No interactive shell on the exam means -s /sbin/nologin. It blocks shell logins but not authentication itself, so combine with locking when an account must be fully disabled.",
  "check": [
   [
    "Where is a user's login shell stored?",
    "In the seventh (last) field of the user's line in /etc/passwd."
   ],
   [
    "How do you give an existing user a non-interactive shell?",
    "usermod -s /sbin/nologin username."
   ],
   [
    "Does /sbin/nologin stop root from running a command as that user?",
    "No; root can still use sudo -u or runuser, because nologin only blocks interactive shell logins."
   ],
   [
    "What message does su - user show when the user's shell is /sbin/nologin?",
    "This account is currently not available."
   ]
  ]
 },
 {
  "t": "Changing passwords (passwd, passwd --stdin) and adjusting password aging (chage -M -m -W -E -d 0)",
  "hook": "Three requests land in your queue at Northgate Community College on the first day of term. Human resources wants every new staff member to choose their own password the first time they log in, instead of keeping the temporary one printed on their welcome letter. The security office says passwords must be changed at least every 90 days, with two weeks of warning. And a visiting instructor's account must stop working on the last day of the semester, no matter what. Jamal, the help-desk lead, asks whether all of that needs three different tools. You suspect one command can do most of it, if you can remember which letter does what. Which settings control each request?",
  "simple": "A password on Linux is stored in a scrambled form, together with a few dates and numbers that act like an expiry label on milk. `passwd` is the command that sets or changes a password. `chage`, short for change age, adjusts the expiry label: how many days a password can be used, how soon it can be changed again, how many days of warning to give, and the date when the whole account stops working. There are two different kinds of expiry. When a password expires, the person can still get in but must pick a new password first. When the account expires, the door is shut completely, whatever password they type.",
  "body": [
   "On RHEL, passwords are stored as one-way hashes in `/etc/shadow`, a file only root can read. Alongside each hash, the file keeps aging information that controls how long the password stays valid and when the account itself expires. RHCSA tasks ask you to set passwords, force users to change them, and apply aging rules to individual accounts. Two commands cover all of this. `passwd` sets passwords, and `chage`, short for change age, views and manages the aging fields.",
   "Setting passwords is straightforward. A regular user runs `passwd` to change their own password and must type the old one first. Root runs `passwd alice` to set anyone's password without knowing the old one, which is how you set initial or reset passwords. For scripts, RHEL's `passwd` accepts `--stdin`, which reads the new password from standard input instead of prompting. A related tool, `chpasswd`, reads lines in the form `user:password`, which is handy for setting many passwords at once. Be aware that a password typed as part of a command line can end up in your shell history and may be visible in the process list while the command runs, so use these methods with care outside of lab work.",
   "```bash\npasswd alice\necho 'N3w-Passw0rd' | passwd --stdin alice\nchage -l alice          # show aging settings\n```",
   "Password aging has several fields, each with its own chage option. `-M` sets the maximum number of days a password is valid before it must be changed. `-m` sets the minimum number of days between changes, which stops users from changing their password and then immediately cycling straight back to the old one. `-W` sets how many days of warning a user gets before the password expires. `-I` sets the inactive period: the number of days after the password expires during which the user can still log in, but only to set a new password. `-E` sets the account expiration date, written either as YYYY-MM-DD or as a number of days since 1 January 1970, and `-E -1` removes the expiration date entirely. Finally, `-d` sets the date of the last password change.",
   "That last option has a very practical use. `chage -d 0 alice` sets the last change date to day zero, which means the password is treated as already expired. The next time alice logs in, she is required to choose a new password before she gets a shell. This is the standard way to hand out a temporary password safely, and it is exactly what the human resources request in the opening scene needs. `passwd -e alice` achieves the same result. You can see the effect in `chage -l alice`, where the Last password change line reads password must be changed.",
   "A combined example of typical exam tasks looks like this:",
   "```bash\nchage -M 90 -m 7 -W 14 alice      # 90 day max, 7 day min, warn 14 days\nchage -E 2026-12-31 contractor1   # account stops working after that date\nchage -d 0 newhire                # force change at next login\nchage -l alice\n```",
   "The output of `chage -l` lists each field in plain English: Last password change, Password expires, Password inactive, Account expires, Minimum number of days between password change, Maximum number of days between password change, and Number of days of warning before password expires. Reading it after every change is the fastest way to confirm you used the right letter, because `-m` and `-M` look alike and are easy to swap.",
   "The most important distinction is between password expiry and account expiry. When the password expires after the `-M` period, the user can still log in but is forced to change the password first, unless the inactive period has also passed, in which case the account is locked out until an administrator steps in. When the account expires because of `-E`, the account cannot be used at all, whatever password is typed. So for the visiting instructor in the opening scene, `-E` with the last day of term is the right tool, while the 90-day rule is `-M`. If you forget the letters during a task, running `chage alice` with no options walks you through each value interactively, showing the current value in brackets so you can accept or change it."
  ],
  "analogy": "Password aging is like a library card. The password is the PIN, and -M is how long the PIN stays valid before the library asks you to choose a new one at the desk. -W is the reminder letter, and -m stops you from switching back to your old PIN the same afternoon. Account expiry (-E) is the card itself expiring: no PIN will help. Where it stops: chage -d 0 has no neat library equivalent; it simply marks the PIN as expired today.",
  "mnemonic": "Capital M is the Maximum, the big number; lowercase m is the minimum, the small wait. W warns, I is the inactive grace period, E ends the account, and d is the date of the last change.",
  "terms": [
   [
    "chage",
    "Views and changes password aging and account expiration for a user."
   ],
   [
    "passwd --stdin",
    "A RHEL passwd option that reads the new password from standard input, for use in scripts."
   ],
   [
    "Maximum password age",
    "Days a password stays valid before the user must change it, set with chage -M."
   ],
   [
    "Minimum password age",
    "Days a user must wait between password changes, set with chage -m."
   ],
   [
    "Inactive period",
    "Days after password expiry during which the user can still log in to set a new password, set with chage -I."
   ],
   [
    "Account expiration",
    "A date after which the account cannot be used at all, set with chage -E."
   ]
  ],
  "example": "The new hire mia's password must expire after 60 days, and she must change her temporary password when she first logs in. You run chage -M 60 mia and chage -d 0 mia; chage -l mia now shows password must be changed for the last change and a maximum of 60 days.",
  "mistakes": [
   [
    "Using chage -E 0 to force a password change at next login.",
    "-E 0 expires the whole account, so the user cannot log in at all. To force a password change, use chage -d 0 or passwd -e."
   ],
   [
    "Swapping -m and -M.",
    "Uppercase -M is the maximum age; lowercase -m is the minimum days between changes. Check with chage -l after every change."
   ],
   [
    "Thinking an expired password means the user is locked out.",
    "After password expiry the user can still log in but must set a new password, unless the inactive period has also passed. Only account expiry blocks all use."
   ],
   [
    "Believing chage -l or passwd show the password itself.",
    "Passwords are stored as one-way hashes in /etc/shadow; no command reveals the original password."
   ]
  ],
  "tryit": [
   [
    "A contractor, dev7, needs access until 30 June of next year, must change passwords at least every 45 days, and must not reuse a password by changing it twice in one day. Write the chage command and say how you would confirm it.",
    "chage -E with the date in YYYY-MM-DD form for 30 June, -M 45 and -m 1 for dev7, for example chage -E 2027-06-30 -M 45 -m 1 dev7. Confirm with chage -l dev7, checking Account expires, the maximum of 45 and the minimum of 1."
   ]
  ],
  "tip": "chage -d 0 forces a password change at next login; chage -E 0 or a past date expires the whole account. Mixing them up either locks the user out or does nothing useful, so read chage -l after every change.",
  "check": [
   [
    "Which command forces user tom to change his password at next login?",
    "chage -d 0 tom (or passwd -e tom)."
   ],
   [
    "What does chage -m 7 mean?",
    "The user must wait at least 7 days between password changes."
   ],
   [
    "What is the difference between password expiry and account expiry?",
    "An expired password must be changed at login but the account works; an expired account cannot be used at all."
   ],
   [
    "How do you remove an account expiration date?",
    "chage -E -1 username."
   ]
  ]
 },
 {
  "t": "Default aging in /etc/login.defs and account defaults in /etc/default/useradd and /etc/skel",
  "hook": "At Riverbend Insurance, the new password policy took effect on Monday: every account's password must expire after 60 days, and every new user should find a copy of the acceptable-use notice in their home folder. On Wednesday, Tomas from compliance runs a spot check. The two users created yesterday look perfect. But the forty accounts that existed before Monday still show passwords that never expire, and nobody on the team can explain why, because the default was changed correctly. Tomas wants an answer before Friday's audit meeting. Where do new account defaults come from, and why did changing them leave everyone else untouched?",
  "simple": "When you create a new user on Linux, you usually do not type every detail. The system fills in the gaps from three places, like a form that comes pre-filled. `/etc/login.defs` holds general rules, such as how many days a new password lasts and which ID numbers new users get. `/etc/default/useradd` holds the user-creation tool's own defaults, such as which folder homes go in and which shell people get. `/etc/skel` is a template folder: whatever you put in it is copied into each new person's home folder. The key point is that these are templates for the future. Changing them does not reach back and change accounts that already exist.",
  "body": [
   "When `useradd` creates an account, it fills in everything you did not specify on the command line from three places: `/etc/login.defs`, `/etc/default/useradd` and the `/etc/skel` directory. Changing these defaults is how you make sure every future account follows policy without anyone having to remember a long list of options each time. The key point, and one that is frequently tested, is that these files affect only accounts created after the change. They are templates, not live settings, so existing accounts keep whatever values they were created with.",
   "The first file, `/etc/login.defs`, holds settings for the shadow password suite of tools. Its password aging lines set the values that are copied into `/etc/shadow` when a new user is created: `PASS_MAX_DAYS` for the maximum password age, `PASS_MIN_DAYS` for the minimum days between changes, and `PASS_WARN_AGE` for the warning period. The same file also sets the UID (user ID) and GID (group ID) ranges for regular and system accounts with `UID_MIN`, `UID_MAX`, `SYS_UID_MIN`, `SYS_UID_MAX` and the matching GID settings, which is why regular users start at 1000 on RHEL. It controls whether home directories are created by default with `CREATE_HOME`, the `UMASK` used to set permissions on new home directories, and `ENCRYPT_METHOD`, the hashing method used for new passwords.",
   "Here is an excerpt showing a policy that sets a 90-day maximum. Lines beginning with a hash sign are comments, and each setting is a keyword followed by whitespace and a value:",
   "```\n# /etc/login.defs (excerpt)\nPASS_MAX_DAYS   90\nPASS_MIN_DAYS   1\nPASS_WARN_AGE   14\nUID_MIN         1000\nCREATE_HOME     yes\n```",
   "The second file, `/etc/default/useradd`, holds defaults that belong to useradd itself. `HOME` sets the base directory under which home directories are created, normally `/home`. `SHELL` sets the default login shell. `SKEL` names the skeleton directory to copy from. `INACTIVE` and `EXPIRE` set a default inactive period and account expiry date for new accounts, and `GROUP` sets a default group used in some configurations. You can view these values with `useradd -D`, which prints them in a readable form, and you can change them either with options such as `useradd -D -s /bin/bash` or by editing the file directly with a text editor.",
   "The third piece is `/etc/skel`, the skeleton directory. Its contents are copied into each new home directory when the account is created, so files you place there, such as a standard `.bashrc`, a README with company policies or an empty directory structure, automatically appear for every new user with the correct ownership. RHEL ships `/etc/skel` with `.bash_logout`, `.bash_profile` and `.bashrc`. Because those names begin with a dot, they are hidden from a plain `ls`, which can make the directory look empty. Use `ls -a /etc/skel` to see everything. Like the other defaults, changes to `/etc/skel` do not affect home directories that already exist.",
   "You can test the whole chain in a few commands:",
   "```bash\nuseradd -D                     # show useradd defaults\necho 'Welcome' > /etc/skel/README\nuseradd testuser\nls -a /home/testuser           # README is there\nchage -l testuser              # shows login.defs aging values\n```",
   "For existing accounts, you must apply the policy yourself, usually with `chage` for each user. That is the explanation for the compliance problem in the opening scene: the team changed `PASS_MAX_DAYS`, which only affected new users, and never ran `chage -M` on the forty existing accounts, which still show the shipped default maximum of 99999 days, effectively never. A typical exam task reads: new users must have passwords that expire after 30 days. The answer is to set `PASS_MAX_DAYS 30` in `/etc/login.defs`. If the task also mentions existing users, add `chage -M 30 user` for each of them. Read the wording carefully, because new users and all users lead to different amounts of work, and verify both a new account and an existing one with `chage -l`.",
   "A few practical cautions help on the exam and at work. Edit these files with care, keeping the keyword and value format intact, because a typo in `/etc/login.defs` is not always reported as an error and the setting may simply be ignored. Avoid changing ID ranges such as `UID_MIN` on a system that already has users, since it can lead to confusing gaps or overlaps. When you change `/etc/default/useradd` with `useradd -D`, run `useradd -D` again to confirm the new value. And remember that options given on the useradd command line always win over every default, so a task that specifies a shell or home directory for one user should be done with options, not by changing the defaults for everyone."
  ],
  "analogy": "These defaults work like the template a print shop uses for new business cards. Change the template, and every card printed from now on has the new logo. Cards already sitting in people's wallets do not change. /etc/login.defs and /etc/default/useradd are the template settings, and /etc/skel is the box of starter items stapled to every new order. Where the analogy stops: for existing accounts, you do not reprint; you edit each one in place with chage or usermod.",
  "terms": [
   [
    "/etc/login.defs",
    "Configuration for new accounts: default password aging, UID and GID ranges, CREATE_HOME, UMASK and hashing method."
   ],
   [
    "/etc/default/useradd",
    "useradd defaults such as base home directory, default shell, skeleton directory and expiry, shown with useradd -D."
   ],
   [
    "/etc/skel",
    "The skeleton directory whose files are copied into every new user's home directory."
   ],
   [
    "PASS_MAX_DAYS",
    "The login.defs setting for default maximum password age applied to new accounts."
   ],
   [
    "useradd -D",
    "Prints or changes the defaults stored in /etc/default/useradd."
   ]
  ],
  "example": "Policy says every new account's password must expire after 20 days. You set PASS_MAX_DAYS 20 in /etc/login.defs, create user kim, and chage -l kim shows a maximum of 20. User lee, created last week, still shows 99999 until you run chage -M 20 lee.",
  "mistakes": [
   [
    "Expecting a change to /etc/login.defs to update existing users.",
    "login.defs is only read when an account is created. Existing users keep their values until you change them with chage."
   ],
   [
    "Looking in /etc/login.defs for the default shell.",
    "The default shell for new users is SHELL in /etc/default/useradd, shown with useradd -D. login.defs holds aging, ID ranges, CREATE_HOME, UMASK and hashing."
   ],
   [
    "Concluding /etc/skel is empty because ls shows nothing.",
    "Its default files start with a dot and are hidden. Use ls -a /etc/skel."
   ],
   [
    "Thinking files added to /etc/skel appear in every existing home directory.",
    "Skeleton files are copied only when a home directory is created. Copy files to existing homes manually if required."
   ]
  ],
  "tryit": [
   [
    "A task reads: all users created from now on must get passwords that expire after 45 days and must have a file named POLICY in their home directory. User ops1 already exists and is not mentioned. What do you change, and how do you test it?",
    "Set PASS_MAX_DAYS 45 in /etc/login.defs and create /etc/skel/POLICY. Leave ops1 alone because the task only covers new users. Test by creating a throwaway user, running chage -l on it to see a maximum of 45, and ls -a on its home to see POLICY, then remove it with userdel -r."
   ]
  ],
  "tip": "login.defs and /etc/default/useradd change only accounts created afterwards. If existing users must comply, run chage on them as well, and check both a new and an old account with chage -l.",
  "check": [
   [
    "Which file sets the default maximum password age for new users?",
    "/etc/login.defs, using PASS_MAX_DAYS."
   ],
   [
    "How do you see useradd's current default shell and home base?",
    "Run useradd -D, which prints the values from /etc/default/useradd."
   ],
   [
    "You put a file in /etc/skel. Which users get it?",
    "Only users whose home directories are created after that point; existing homes are not changed."
   ],
   [
    "Which login.defs setting defines the lowest UID given to regular users?",
    "UID_MIN."
   ]
  ]
 },
 {
  "t": "Creating, deleting and modifying local groups and memberships (groupadd -g, usermod -aG, gpasswd)",
  "hook": "The design team at Saltmarsh Architects has a new shared project folder, and Elena, the team lead, wants five people to have access by this afternoon. Next month two of them rotate off the project, and Elena would like to manage the membership herself instead of filing tickets every time someone joins or leaves. There is one more wrinkle: the same project folder is mirrored on a second server, so the group must have the same ID number on both machines or the permissions will not line up. You could change permissions on the folder for each person, one at a time. But is there a cleaner way to grant access to a team, hand control of the list to Elena, and keep the IDs consistent?",
  "simple": "A group on Linux is a named list of users, like a club. Instead of giving each person access to a shared folder one at a time, you give the folder to the group, and then you only manage who is in the club. Each group has a name and an ID number. `groupadd` creates a group, `groupmod` changes its name or number, and `groupdel` removes it. To add or remove members you can work from the person's side with `usermod -aG`, or from the group's side with `gpasswd`. One thing to remember: a person who is already logged in only gets a new group after logging out and back in, like a new badge that only works after you swipe in again.",
  "body": [
   "Groups let you grant permissions to several users at once. You give a directory to a group, set group permissions on it, and then control access by managing membership instead of changing file permissions for each person. Local groups are stored in `/etc/group`, while group passwords and group administrators are kept in `/etc/gshadow`, which only root can read. On RHEL, every user also gets a private group with the same name as the user, known as a user private group. Because only that one user belongs to it, shared access always needs additional groups that you create.",
   "Creating and changing groups uses a small family of commands. `groupadd name` creates a group with the next free GID (group ID). The `-g` option sets a specific GID, which tasks often require so that IDs match across systems, for example when the same files are shared over NFS (Network File System) or mirrored between servers. The `-r` option creates a system group with a GID from the system range. `groupmod -n newname oldname` renames a group, keeping its GID and members, and `groupmod -g newgid name` changes its GID. `groupdel name` deletes a group, but it refuses to delete a group that is still the primary group of any user, because that would leave the user without a valid primary group.",
   "```bash\ngroupadd -g 3000 sysadmins\ngroupmod -n admins sysadmins\ngetent group admins\n# admins:x:3000:\ngroupdel admins\n```",
   "The empty last field in the `getent` output shows that the group has no supplementary members yet. Membership can be managed from the user side or from the group side, and you should be comfortable with both. From the user side, `usermod -aG sysadmins alice` appends a supplementary group to alice's existing list. Remember the trap from the user accounts lesson: `-G` without `-a` replaces the whole list. From the group side, `gpasswd -a alice sysadmins` adds one user and `gpasswd -d alice sysadmins` removes one, in both cases without touching the user's other groups. `gpasswd -M alice,bob sysadmins` sets the entire member list at once, replacing whoever was there before, which is useful when a task gives you the complete list.",
   "```bash\ngpasswd -a bob sysadmins\ngpasswd -d bob sysadmins\ngpasswd -A alice sysadmins   # alice can manage members herself\nid bob\ngroups bob\n```",
   "Two more tools round out the picture. `gpasswd -A user group` makes a user a group administrator. A group administrator can then run `gpasswd -a` and `gpasswd -d` for that group without root, which is exactly what Elena in the opening scene wants. `newgrp group` starts a new shell in which that group is the user's primary group, so files created in that shell belong to the group. It is useful for one-off work, although the setgid bit on a shared directory is usually the better long-term solution.",
   "Group membership takes effect at login. After you add a user to a group, `id user` run by root shows the new group immediately, because it reads the account databases. However, the user's existing sessions and processes keep the group list they had when they logged in. Until they log out and back in, or start a new login, they cannot use the new group's permissions. When a user reports that a new group does not work, this is the first thing to check, by asking them to run `id` without arguments in their own session.",
   "A common exam pattern ties several lessons together. You create a group with a given GID, add users as supplementary members, create a shared directory, change its group ownership to the new group with `chgrp` or `chown :group`, and set permissions such as 2770, where the leading 2 is the setgid bit. With setgid on a directory, new files created inside automatically inherit the directory's group rather than the creator's private group, so everyone in the team can work on them. Verify every step: `getent group name` for the GID and members, `id user` for each member, and `ls -ld` on the directory for ownership and mode.",
   "Choosing between `usermod -aG` and `gpasswd -a` is mostly a matter of style, since both add one group without removing others. Many administrators use usermod when thinking about a person and gpasswd when thinking about a group. The one combination to avoid is `usermod -G` without `-a`, unless you truly intend to replace every supplementary group the user has."
  ],
  "analogy": "A group is like a shared email distribution list. Instead of adding every person to every message, you send to the list and manage who is on it. groupadd creates the list, gpasswd -a and -d add or remove one subscriber, gpasswd -M replaces the whole roster, and gpasswd -A makes someone a list moderator. Where it breaks down: an email list takes effect instantly, while a Linux group only applies to a user's new login sessions.",
  "terms": [
   [
    "GID",
    "Group ID, the number identifying a group in /etc/group."
   ],
   [
    "groupadd -g",
    "Creates a group with a specific GID."
   ],
   [
    "gpasswd",
    "Administers /etc/group and /etc/gshadow: add or remove members, set the member list and assign group administrators."
   ],
   [
    "/etc/gshadow",
    "The secure group file holding group passwords, administrators and members."
   ],
   [
    "User private group",
    "The group with the same name as a user, created automatically on RHEL and used as that user's primary group."
   ],
   [
    "Group administrator",
    "A user set with gpasswd -A who can add and remove members of that group without root."
   ]
  ],
  "example": "You create the group sysadmins with GID 4000 and make natasha and harry members: groupadd -g 4000 sysadmins, then usermod -aG sysadmins natasha and gpasswd -a harry sysadmins. getent group sysadmins shows sysadmins:x:4000:natasha,harry.",
  "mistakes": [
   [
    "Using usermod -G group user to add a membership.",
    "Without -a it replaces all supplementary groups. Use usermod -aG or gpasswd -a, which add one group and keep the rest."
   ],
   [
    "Assuming groupdel will remove any group.",
    "groupdel refuses if the group is still some user's primary group. Change that user's primary group with usermod -g first."
   ],
   [
    "Believing gpasswd -M adds names to the existing list.",
    "gpasswd -M sets the complete member list, replacing anyone not named. Use gpasswd -a to add a single member."
   ],
   [
    "Expecting a logged-in user to gain a new group immediately.",
    "Group lists are read at login. The user must start a new login session before the membership applies to their processes."
   ]
  ],
  "tryit": [
   [
    "The group finance has members ana, raj and lee. A task says: make finance's members exactly ana and tom. A teammate plans to run gpasswd -a tom finance. Will that meet the requirement? What would you run instead?",
    "No, because raj and lee would remain members. Run gpasswd -M ana,tom finance to set the exact list, then confirm with getent group finance, which should end in ana,tom."
   ]
  ],
  "tip": "Both usermod -aG and gpasswd -a add one group without removing others. The trap is usermod -G without -a, which wipes a user's existing supplementary groups. When a task fixes the GID, always use groupadd -g.",
  "check": [
   [
    "How do you create group devops with GID 5000?",
    "groupadd -g 5000 devops."
   ],
   [
    "Which command removes carol from group finance only?",
    "gpasswd -d carol finance."
   ],
   [
    "Why might groupdel refuse to delete a group?",
    "It is still the primary group of at least one user."
   ],
   [
    "How can a non-root user be allowed to manage a group's members?",
    "Root makes them a group administrator with gpasswd -A user group."
   ]
  ]
 },
 {
  "t": "Account databases: /etc/passwd, /etc/shadow, /etc/group; id and getent",
  "hook": "It is the last fifteen minutes of a practice exam in the Harborview Tech evening lab, and you have finished every user task. Or have you? Theo, the instructor, walks past and says the grader will check five things about user sarah: her UID, her shell, her groups, whether she has a password, and whether her group exists with the right ID. You could rerun every command and hope. Or you could read the account files directly and see the truth in a few seconds. You open /etc/group to check sarah's primary group, and it seems to list no members at all. Is something broken, or are you reading the file wrong?",
  "simple": "Linux keeps its list of users and groups in a few plain text files, one line per account, with the pieces separated by colons, a bit like a spreadsheet saved as text. `/etc/passwd` lists every user with their ID number, home folder and starting program. `/etc/shadow` holds the scrambled passwords and expiry dates, and only the administrator can read it. `/etc/group` lists groups and their extra members. Instead of reading the files by hand, two commands give quick, reliable answers. `id` shows everything about one user's identity and groups, and `getent` looks up an entry wherever the system gets accounts from, including central directories as well as local files.",
  "body": [
   "Local accounts on RHEL are stored in plain text files with one line per entry and fields separated by colons. Reading these files fluently lets you verify any user or group task in seconds and spot mistakes such as a wrong shell, a missing group member or a password that was never set. You should feel free to inspect them, but change them with the proper tools, such as `useradd`, `usermod`, `chage` and `groupmod`. If you ever must edit them by hand, use `vipw` for the passwd file and `vigr` for the group file, which lock the files so that no other tool writes to them at the same time, and which offer to edit the matching shadow file too.",
   "The first file, `/etc/passwd`, is readable by every user, because many programs need to translate UIDs into names. Each line has seven fields: the login name, a password placeholder, the UID (user ID), the primary GID (group ID), the GECOS comment field that usually holds the full name, the home directory and the login shell. An `x` in the second field means the real password hash is stored in `/etc/shadow`, out of reach of ordinary users.",
   "```\nalice:x:2001:2001:Alice Ng:/home/alice:/bin/bash\n```",
   "The second file, `/etc/shadow`, is readable only by root and holds the password hash and the aging data. It has nine fields: login name, password hash, date of last change counted in days since 1 January 1970, minimum age, maximum age, warning period, inactivity period, account expiration date and a reserved field. The hash field tells you a lot at a glance. A field starting with `!` or `!!` means the password is locked or was never set, so password login is impossible. On RHEL, `!!` typically appears on a brand-new account before anyone runs `passwd`, while a single `!` placed in front of an existing hash is what `usermod -L` or `passwd -l` adds when an administrator locks the account, leaving the old hash intact underneath. A `*` means no password login is possible at all, which is common for system accounts. A real hash begins with an identifier showing the algorithm, such as `$6$` for SHA-512 or `$y$` for yescrypt, followed by the salt and the hash itself. The aging fields are the same values that `chage -l` displays in friendlier form.",
   "The third file, `/etc/group`, has four fields: the group name, a password placeholder, the GID and a comma-separated list of supplementary members. Here is the subtle point that explains the puzzle in the opening scene. Users whose primary group is this group are usually not listed in the last field, because that membership comes from the GID field in `/etc/passwd`, not from `/etc/group`. That is why a user private group such as `sarah` normally shows an empty member list, and why checking only `/etc/group` can make it look as though a group has no members when it does.",
   "```\n# name:password:GID:members\nsysadmins:x:4000:natasha,harry\n```",
   "Two commands give reliable answers without manual parsing. `id user` prints the UID, the primary GID and every group the user belongs to, combining the primary group from `/etc/passwd` with the supplementary groups from `/etc/group`. `getent` queries the system databases through NSS (Name Service Switch), the layer configured in `/etc/nsswitch.conf` that decides where account information comes from. That means `getent` includes local files and any network sources such as LDAP (Lightweight Directory Access Protocol). You can run `getent passwd alice`, `getent group sysadmins` and, as root, `getent shadow alice`. Prefer these commands to `grep` on the files, because on systems joined to a directory service, network users do not appear in `/etc/passwd` at all, yet they are perfectly valid accounts.",
   "```bash\nid alice\ngetent passwd alice | cut -d: -f7   # just the shell\ngetent group sysadmins\n```",
   "A practical verification routine after any user task looks like this: `getent passwd user` to check the UID, comment, home directory and shell; `id user` to check the primary and supplementary groups; `getent group groupname` to check the GID and member list; and, as root, `getent shadow user` to confirm the hash starts with `$`, which proves a password has been set. Combined with `cut -d: -f` and a field number, you can pull out exactly the field you need, which makes these commands easy to use in scripts as well."
  ],
  "analogy": "The three files are like an office's records. /etc/passwd is the staff directory on the wall that anyone can read: names, desk numbers and departments. /etc/shadow is the locked HR cabinet with the sensitive details. /etc/group is the list of project teams, which only names people added as extras, because everyone's home department is already printed in the staff directory. id is asking HR for one person's full summary. The analogy stops at getent, which can also check records kept at headquarters, not just this office.",
  "terms": [
   [
    "/etc/passwd",
    "The world-readable account file with seven fields: name, x, UID, GID, comment, home and shell."
   ],
   [
    "/etc/shadow",
    "The root-only file holding password hashes and aging fields for each account."
   ],
   [
    "/etc/group",
    "The group file with name, x, GID and a list of supplementary members."
   ],
   [
    "getent",
    "Queries system databases such as passwd and group through NSS, including local and network sources."
   ],
   [
    "NSS",
    "Name Service Switch, configured in /etc/nsswitch.conf, which decides where account and name lookups are answered from."
   ],
   [
    "vipw and vigr",
    "Tools that safely edit the passwd and group files with locking."
   ]
  ],
  "example": "After creating user sarah with a nologin shell and membership in sysadmins, you verify with getent passwd sarah, which ends in /sbin/nologin, and id sarah, which lists sysadmins. getent shadow sarah shows a hash starting with $, proving a password is set.",
  "mistakes": [
   [
    "Concluding a group has no members because its last field in /etc/group is empty.",
    "Users whose primary group it is are recorded by GID in /etc/passwd, not listed in /etc/group. Use id user to see all memberships."
   ],
   [
    "Thinking the x in /etc/passwd means the account has no password.",
    "The x means the hash is stored in /etc/shadow. Check the shadow field: a hash beginning with $ means a password is set."
   ],
   [
    "Using grep on /etc/passwd to prove a user does not exist.",
    "Directory users from LDAP or similar sources are not in the local file. getent passwd user checks every configured source."
   ],
   [
    "Editing /etc/passwd directly with a normal text editor.",
    "Use the account tools, or vipw and vigr, which lock the files and prevent corruption from simultaneous changes."
   ]
  ],
  "tryit": [
   [
    "You run getent shadow devuser and see `devuser:!!:20100:0:99999:7:::`. The task required devuser to have the password redhat. What does the line tell you, and what do you do?",
    "The `!!` in the hash field means no password has been set (or it is locked), so the task is not complete. Set the password with passwd devuser (or echo the value into passwd --stdin devuser), then rerun getent shadow devuser and confirm the field now starts with $."
   ]
  ],
  "tip": "A user's primary group is set by the GID field in /etc/passwd, not listed in /etc/group. Use id to see all memberships at once, and getent rather than grep so network accounts are included.",
  "check": [
   [
    "What does the x in the second field of /etc/passwd mean?",
    "The password hash is stored in /etc/shadow instead."
   ],
   [
    "What does `!!` at the start of a shadow hash field indicate?",
    "The account has no password set yet or is locked, so password login is not possible."
   ],
   [
    "Why use getent passwd instead of grep on /etc/passwd?",
    "getent follows NSS and includes network sources like LDAP, so it shows every account the system knows."
   ],
   [
    "How many fields does a line in /etc/passwd have, and which is the shell?",
    "Seven fields; the shell is the seventh, last field."
   ]
  ]
 },
 {
  "t": "Configuring superuser access: the wheel group, /etc/sudoers.d/ drop-ins and visudo",
  "hook": "At Kestrel Logistics, four administrators share one root password, and last Tuesday someone restarted the database in the middle of the payroll run. Nobody remembers doing it, and the logs only say root. Your manager, Ifeoma, wants it fixed today: each admin should use their own account and password for administrative work, every command should be traceable to a person, and the deployment bot should be able to restart the web server, but nothing else, without typing a password. You open a terminal, reach for vi /etc/sudoers, and a senior colleague stops you with a warning about locking everyone out. How do you grant exactly the right powers, safely?",
  "simple": "On Linux, root is the all-powerful account. Logging in as root for everyday work is risky, and if several people share the root password you cannot tell who did what. `sudo` solves this: approved users type `sudo` before a command, enter their own password, and the command runs with root powers while the system records who ran it. The rules about who may do what live in a file called sudoers, plus small extra files in the `/etc/sudoers.d/` folder. On RHEL, anyone in the group called wheel already has full sudo rights. You always edit these rules with `visudo`, which checks your work before saving, because a broken rule file can stop everyone from using sudo.",
  "body": [
   "Administrators should not log in as root for daily work. `sudo` lets approved users run specific commands as root, or as another user, while authenticating with their own password, and it records what they ran in the system logs. That gives accountability, because every privileged action is tied to a named person, and it lets you grant just the privileges someone needs instead of handing over the root password. The rules that control sudo live in `/etc/sudoers` and in drop-in files under the `/etc/sudoers.d/` directory, which the main file includes.",
   "RHEL ships with one very useful rule already enabled in `/etc/sudoers`: `%wheel ALL=(ALL) ALL`. The percent sign means the name that follows is a group, not a user. So the quickest way to give a user full administrative rights is simply to add them to the wheel group with `usermod -aG wheel alice`. After alice logs out and back in, so that her session picks up the new group, `sudo command` runs a single command as root and `sudo -i` opens a root login shell, in both cases after she types her own password. sudo caches a successful authentication for a short time, so she will not be asked again for every command in quick succession.",
   "A sudoers rule follows a fixed pattern: who, on which hosts, as which users, may run which commands. In `alice ALL=(ALL) ALL`, alice is the who, the first ALL is the hosts the rule applies on, `(ALL)` is the list of users she may act as, and the final ALL is the commands. You can narrow any part. Adding the tag `NOPASSWD:` before the command list skips the password prompt, which suits automation but should be used sparingly. Command lists should always use full paths, such as `/usr/bin/systemctl`, because sudo matches the exact program and a bare name could be satisfied by a different program earlier in the search path.",
   "```\n# /etc/sudoers.d/admins\n%sysadmins   ALL=(ALL)  ALL\nbob          ALL=(root) NOPASSWD: /usr/bin/systemctl restart httpd\nbackup       ALL=(root) /usr/bin/rsync, /usr/bin/tar\n```",
   "In that example, members of sysadmins get full rights, bob may restart httpd as root without a password and nothing else, and the backup user may run rsync and tar as root after entering a password. When you give a command with arguments, as in bob's rule, sudo allows only that exact command line, so bob cannot use the rule to stop or reconfigure other services.",
   "Never edit sudoers files with a plain text editor. `visudo` opens the file with a lock, so two administrators cannot save over each other, and it checks the syntax before saving. If there is an error, it tells you the line and asks what to do, letting you re-edit rather than saving a broken file. That matters because a syntax error in sudoers can stop sudo from working for everyone, and if root logins are disabled you could lock yourself out of administration entirely. Use `visudo -f /etc/sudoers.d/admins` to create or edit a drop-in file, and `visudo -c` to check the main file and every included file. Drop-in files keep your local changes separate from the vendor's `/etc/sudoers`, which a package update might replace, and make it easy to add or remove one set of rules cleanly.",
   "Drop-in files have naming rules that catch people out. sudo ignores files in `/etc/sudoers.d/` whose names contain a dot or end in a tilde, which prevents editor backup files and package leftovers from being read. So name a file `admins`, not `admins.conf`, or your rules will be silently ignored with no error message. The files should be owned by root with mode 0440, which visudo sets automatically when it creates them.",
   "Finally, test as the affected user. `sudo -l` lists what the current user may run, and `sudo -l -U bob` run by root shows bob's rights without switching to his account. When a rule does not work, check the file name for a dot, the user's group membership and whether they have logged in again since joining the group, the full command paths and the output of `visudo -c`. sudo records both successful and failed attempts in the journal, and you can search them with `journalctl -t sudo`, which shows the user, the working directory and the exact command, giving you the accountability the opening scene was missing."
  ],
  "analogy": "sudo is like a hotel's master key kept at the front desk. Staff do not carry their own copy; they sign the logbook with their name, and the desk hands them only the keys their job requires. The wheel group is the list of managers allowed any key. visudo is the supervisor who checks each change to the rules before it is posted, so a typo cannot lock every door. The analogy stops at NOPASSWD: in a hotel nobody would skip the signature, but sudo still logs the command even without a password.",
  "terms": [
   [
    "sudo",
    "Runs a command as root or another user according to sudoers rules, logging the action."
   ],
   [
    "wheel group",
    "The RHEL administrative group granted full sudo rights by the default sudoers rule %wheel ALL=(ALL) ALL."
   ],
   [
    "visudo",
    "Edits sudoers files safely with locking and syntax checking; -f edits a drop-in and -c checks all files."
   ],
   [
    "/etc/sudoers.d/",
    "A directory of drop-in sudoers files that keeps local rules separate from the main file."
   ],
   [
    "NOPASSWD:",
    "A sudoers tag that lets the listed commands run without the user entering a password."
   ],
   [
    "sudo -l",
    "Lists the commands the current user, or a named user with -U, is allowed to run."
   ]
  ],
  "example": "Members of sysadmins must run any command as root, and user deploy may only restart httpd without a password. You run visudo -f /etc/sudoers.d/local and add %sysadmins ALL=(ALL) ALL and deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart httpd, then visudo -c reports the files parsed OK and sudo -l -U deploy shows the single allowed command.",
  "mistakes": [
   [
    "Editing /etc/sudoers with vi or nano directly.",
    "A plain editor saves syntax errors that can break sudo for everyone. Use visudo, which locks the file and checks syntax before saving."
   ],
   [
    "Naming a drop-in file admins.conf.",
    "sudo ignores files in /etc/sudoers.d/ whose names contain a dot or end with a tilde. Use a name such as admins."
   ],
   [
    "Writing commands without full paths, such as NOPASSWD: systemctl restart httpd.",
    "sudoers command entries should use full paths like /usr/bin/systemctl so sudo matches the exact program."
   ],
   [
    "Forgetting the percent sign for a group, as in sysadmins ALL=(ALL) ALL.",
    "Without the percent sign sudo treats sysadmins as a user name. Groups are written %sysadmins."
   ]
  ],
  "tryit": [
   [
    "A task says user operator must be able to run any command as root but should still enter a password, and the change must not touch /etc/sudoers. Another administrator suggests adding operator to wheel. Is that acceptable, and what alternative would also work?",
    "Adding operator to wheel with usermod -aG wheel operator works because the default %wheel rule grants full rights with a password, and it does not edit /etc/sudoers. An alternative is visudo -f /etc/sudoers.d/operator containing operator ALL=(ALL) ALL. Either way, confirm with sudo -l -U operator, and remember operator must log in again if you used the group."
   ]
  ],
  "tip": "Always use visudo; a syntax error in a sudoers file can remove everyone's sudo access. And a drop-in file whose name contains a dot is silently ignored. When a task just says full admin rights, adding the user to wheel is the fastest correct answer.",
  "check": [
   [
    "What is the fastest way to give alice full sudo rights on RHEL?",
    "Add her to the wheel group with usermod -aG wheel alice; she gets the rights at her next login."
   ],
   [
    "What does %devs ALL=(ALL) NOPASSWD: ALL mean?",
    "Members of group devs can run any command as any user on any host without entering a password."
   ],
   [
    "Why would /etc/sudoers.d/admins.conf be ignored?",
    "sudo skips drop-in files whose names contain a dot or end with a tilde."
   ],
   [
    "Which command checks the syntax of all sudoers files?",
    "visudo -c."
   ]
  ]
 },
 {
  "t": "Locking and unlocking accounts (usermod -L, passwd -l, chage -E 0)",
  "hook": "Friday afternoon at Mapleton Public Schools, the security office calls: a staff laptop was stolen from a car, and its owner, a developer named Corey, is starting three weeks of leave tomorrow. Corey's account must stop working right now, but his files, scheduled reports and account must be untouched when he returns. You run a quick password lock and report back. An hour later, the monitoring dashboard shows a successful SSH login as corey from an unfamiliar address, using a key. The password lock is still in place. How did the login succeed, and what should you have done instead?",
  "simple": "Sometimes an account needs to be switched off for a while without deleting it, like pausing a gym membership instead of cancelling it. Linux offers two main switches. The first, a password lock, scrambles the stored password so that no typed password matches. But people can also log in with an SSH key, a kind of digital ID card that skips the password, and a password lock does not stop that. The second switch, account expiry, sets the account's end date in the past. The login system checks that date for every method, keys included, so the account is completely shut. Both switches can be reversed later, and the user's files stay where they are.",
  "body": [
   "Sometimes an account must stop working without being deleted. An employee goes on leave, a contractor's work is paused, or you suspect a password or device was exposed. Locking keeps the account, its UID, its files and its settings intact, so you can restore access later with a single command. RHEL offers two different mechanisms, plus a related third tool, and understanding exactly what each one blocks is the key point for both the exam and real incidents.",
   "The first mechanism is locking the password. `usermod -L alice` or `passwd -l alice` puts an exclamation mark in front of the password hash in `/etc/shadow`. Because a hash with an extra character at the front can never match any password, password logins fail, whether at the console, over SSH (Secure Shell) with a password, or through `su`. The original hash is still there behind the mark, so `usermod -U alice` or `passwd -u alice` removes the mark and the old password works again. `passwd -S alice` shows the account's password status, with `LK` or a similar note indicating a locked password.",
   "```bash\nusermod -L alice\ngetent shadow alice | cut -d: -f2 | cut -c1-5   # starts with !\npasswd -S alice\nusermod -U alice\n```",
   "The weakness of a password lock is that it blocks only logins that use the password. A user with a public key in `~/.ssh/authorized_keys` can still log in over SSH, because key authentication never checks the password hash. Other authentication methods configured on the system may also keep working. That is exactly what happened in the opening scene: the password lock was in place, but the attacker used Corey's SSH key from the stolen laptop. A password lock alone is therefore not enough to disable an account completely. It is still useful, for example when you only suspect a password leak and want to force a reset, but it should not be your only step when the whole account must be shut. In a real incident you would also remove or rotate the compromised key from `authorized_keys`.",
   "The second mechanism is account expiry. `chage -E 0 alice` sets the account expiration date to day zero, which is 1 January 1970, a date safely in the past, so the account is expired. PAM (Pluggable Authentication Modules), the framework RHEL uses to decide whether a login may proceed, checks account expiry as part of its account phase for every login method, including SSH key logins, so the account cannot be used at all. To undo it, run `chage -E -1 alice`, which removes the expiration date. `usermod -e` sets the same field using a date, and you can combine both locks in one command, for example `usermod -L -e 1 alice`, which locks the password and sets expiry to the day after 1 January 1970.",
   "```bash\nchage -E 0 alice      # expire: blocks all logins\nchage -l alice        # Account expires: Jan 01, 1970\nchage -E -1 alice     # remove expiry\n```",
   "Changing the shell to `/sbin/nologin` is a third, different tool. It stops interactive shells but does not stop authentication itself, so a user might still use services that do not start a shell. It is ideal for service accounts but is not, on its own, a way to disable a person's account. For a complete disable of a human account, the usual combination is to expire the account and lock the password, which covers both key-based and password-based logins and makes the status obvious to anyone reading `/etc/shadow`.",
   "Locking also does not end anything already running. Existing sessions, background processes and scheduled jobs that belong to the user keep going after you lock or expire the account. During an incident, check with `who`, `loginctl list-sessions` or `ps -u alice`, then end active sessions with `loginctl terminate-user alice` or `pkill -u alice`. Review cron and at jobs as well if the user should not run anything while disabled.",
   "To choose the right tool, read what the task says must be prevented. If it says the user must not be able to log in with a password, a password lock satisfies it. If it says the account must not be usable at all, or mentions SSH keys, use `chage -E 0`, ideally together with `usermod -L`. When restoring access, reverse both: `chage -E -1` and `usermod -U`, and confirm with `chage -l` and `passwd -S`."
  ],
  "analogy": "A password lock is like changing the code on an office's keypad: anyone relying on the code is stopped, but someone holding a physical key card can still walk in. Account expiry is deactivating the person's badge in the building system, so every door, keypad or card reader, refuses them. nologin is taking away their desk while leaving the badge active. The analogy stops at existing sessions: in a real building a deactivated badge does not throw someone out who is already inside, and neither does locking an account.",
  "terms": [
   [
    "Password lock",
    "An exclamation mark prefixed to the shadow hash by usermod -L or passwd -l, which blocks password authentication only."
   ],
   [
    "Account expiry",
    "The shadow expiration date; chage -E 0 sets it in the past so every login method is refused."
   ],
   [
    "passwd -S",
    "Shows the password status of an account, including whether it is locked."
   ],
   [
    "chage -E -1",
    "Removes an account's expiration date, reversing chage -E 0."
   ],
   [
    "PAM",
    "Pluggable Authentication Modules, the framework that checks authentication and account status, including expiry, for each login."
   ]
  ],
  "example": "A developer goes on leave but uses SSH keys. After usermod -L the developer can still log in with a key, so you also run chage -E 0 dev1. The next SSH attempt is refused because the account is expired. On return, chage -E -1 dev1 and usermod -U dev1 restore access.",
  "mistakes": [
   [
    "Believing usermod -L or passwd -l blocks every login.",
    "They only block password authentication. SSH key logins still work. Use chage -E 0 to block every method."
   ],
   [
    "Deleting an account to stop a user temporarily.",
    "Deletion loses the account and can orphan files. Locking or expiring keeps everything intact and is easily reversed."
   ],
   [
    "Using /sbin/nologin as the way to disable a person's account.",
    "nologin blocks interactive shells but not authentication. For a full disable, expire the account and lock the password."
   ],
   [
    "Assuming locking ends sessions that are already open.",
    "Existing sessions and processes continue. End them with loginctl terminate-user or pkill -u."
   ]
  ],
  "tryit": [
   [
    "A contractor's engagement is paused for two weeks. The contractor logs in only with SSH keys, and the manager wants the account usable again without any changes to the contractor's keys or files. Which commands do you run now, and which on their return?",
    "Run chage -E 0 contractor (and optionally usermod -L contractor) now, then check for active sessions and end them with loginctl terminate-user contractor. On return, run chage -E -1 contractor and usermod -U contractor if you locked the password, and confirm with chage -l and passwd -S."
   ]
  ],
  "tip": "usermod -L and passwd -l block only password logins; chage -E 0 blocks every login method, including SSH keys. Choose based on what the task says must be prevented, and remember chage -E -1 to undo expiry.",
  "check": [
   [
    "What does usermod -L change in /etc/shadow?",
    "It puts an exclamation mark at the start of the password hash so it cannot match."
   ],
   [
    "Why can a locked user still log in over SSH?",
    "Password locking does not affect key-based authentication; expire the account with chage -E 0 to block all logins."
   ],
   [
    "How do you remove an expiration date set with chage -E 0?",
    "Run chage -E -1 username."
   ],
   [
    "Does locking an account end the user's current sessions?",
    "No; use loginctl terminate-user or pkill -u to end existing sessions."
   ]
  ]
 },
 {
  "t": "Configuring firewall settings with firewall-cmd: zones, services, ports, sources, runtime vs permanent",
  "hook": "The internal review at Fairhaven Health Clinic lands on your desk with one finding circled in red: the patient-records server accepts SSH and web console connections from every network in the building, including the guest Wi-Fi in the waiting room. Nadia, the clinic's IT lead, wants SSH and the console reachable only from the administrators' network, 10.10.5.0/24, while the records web app stays open to staff. She also reminds you that the last firewall change someone made vanished after a reboot, and the one before that locked an administrator out for an hour. How do you restrict who can connect, not just what they can connect to, without repeating either mistake?",
  "simple": "A firewall decides which network visitors can reach which services on a computer. In the earlier networking lesson you learned to open a service or port for everyone. This lesson adds a second question: who is the visitor? firewalld sorts every incoming connection into a zone, a set of rules with its own trust level. You can say that connections from a certain range of addresses, such as the administrators' office network, belong to a more trusted zone with extra services allowed. Everyone else falls into the normal zone with fewer services. As before, changes can be temporary, which work now but disappear later, or permanent, which last but only take effect after a reload.",
  "body": [
   "The networking lesson covered opening services and ports in the default zone. The security objective goes further: using zones and source addresses to control who may connect, and being precise about runtime and permanent configuration. The goal is least privilege, meaning you allow only what a service needs, and only from the networks that need it. A web app open to staff and an SSH service open only to administrators are two different policies on the same host, and firewalld zones are how you express that difference.",
   "To use zones well, you need to know how firewalld assigns each incoming packet to exactly one zone. First, if the packet's source address matches a source bound to a zone, that zone applies. Otherwise, the zone of the interface the packet arrived on applies. If the interface has not been assigned a zone, the default zone applies. Because source bindings are checked first, they take priority over interface zones, which is what lets you carve out special treatment for one network on an otherwise ordinary interface. firewalld ships predefined zones that range from `drop`, which silently discards incoming connections, and `block`, which rejects them with an error, through `public`, `external`, `dmz`, `work`, `home` and `internal`, to `trusted`, which allows everything. Each zone has its own list of allowed services and ports.",
   "Binding a source network to a zone lets you treat certain clients differently. For the clinic in the opening scene, you would place the administrators' network in the `internal` zone, allow SSH there, and remove SSH from `public`. Administrators connecting from 10.10.5.0/24 then match the source binding and reach SSH, while everyone else lands in `public`, where SSH is no longer allowed.",
   "```bash\nfirewall-cmd --permanent --zone=internal --add-source=10.10.5.0/24\nfirewall-cmd --permanent --zone=internal --add-service=ssh\nfirewall-cmd --permanent --zone=public --remove-service=ssh\nfirewall-cmd --reload\nfirewall-cmd --get-active-zones\nfirewall-cmd --zone=internal --list-all\n```",
   "After the reload, `--get-active-zones` should show `internal` with a `sources:` line listing the network, and `public` with its interface. Order matters when you work remotely. If you are connected over SSH from the admin network, add the source binding and the internal rule before removing SSH from public, or use runtime changes first so a mistake can be undone with a reload.",
   "Sources can be single addresses, such as `10.10.5.25`, or whole networks in CIDR (Classless Inter-Domain Routing) notation, such as `10.10.5.0/24`. A source can belong to only one zone at a time, so if firewalld reports that a source is already bound elsewhere, remove it from the old zone with `--remove-source` first. To review all bindings in one place, `firewall-cmd --get-active-zones` lists every zone that currently has an interface or a source, which makes it the quickest way to see who will be treated how.",
   "Several other zone commands are worth knowing. `firewall-cmd --set-default-zone=name` changes the default zone, and it takes effect immediately and permanently, with no `--permanent` or reload needed. `firewall-cmd --zone=internal --change-interface=enp1s0` moves an interface to another zone. For interfaces managed by NetworkManager, the lasting setting is the connection's `connection.zone` property, set with `nmcli con mod name connection.zone internal`. `firewall-cmd --list-all-zones` shows every zone's configuration. Within any zone, you add services and ports with `--add-service` and `--add-port=port/proto`, remove them with the matching `--remove-service` and `--remove-port` options, and test with `--query-service=http`, which answers yes or no.",
   "Runtime versus permanent is the concept most often tested. Runtime changes apply immediately and vanish on reload or reboot. Permanent changes are saved under `/etc/firewalld/` but do not apply until `firewall-cmd --reload`. Because the two are separate, they can drift apart without any warning. `firewall-cmd --list-all` shows the runtime state, and `firewall-cmd --permanent --list-all` shows the saved configuration, so comparing the two outputs reveals any drift. A safe way to experiment on a remote system is to make runtime changes, test them from a client, and then save them all with `firewall-cmd --runtime-to-permanent`. If a runtime change locks you out, a reload or reboot restores the saved rules, which is your safety net.",
   "When a service must stay reachable after a reboot, the permanent configuration must include it. Before finishing any firewall task, run both listing commands for each zone you changed and confirm they agree. On the exam, the grader may reboot your system, and only what is in the permanent configuration will count. In practice, that final comparison catches both of the mistakes from the opening scene: rules that existed only at runtime, and permanent rules that were never reloaded and tested."
  ],
  "analogy": "Think of zones as different entrances to the same building. The public entrance has a receptionist who lets visitors into the lobby and the cafeteria. A badge-reader door for staff from the administrators' office opens onto the server room as well. A source binding is the badge reader: it checks who you are before the default entrance rules apply. Where it stops: firewalld matches source addresses, not people, so anyone using a machine on the admin network gets the admin entrance.",
  "mnemonic": "SID for zone selection: Source binding first, then the Interface's zone, then the Default zone.",
  "terms": [
   [
    "Source binding",
    "Assigning a source address or network to a zone so packets from it use that zone's rules."
   ],
   [
    "Default zone",
    "The zone used for interfaces and traffic not assigned to any other zone, public unless changed."
   ],
   [
    "Runtime configuration",
    "The firewall rules currently in effect, lost on reload or reboot unless saved."
   ],
   [
    "Permanent configuration",
    "The saved firewall rules under /etc/firewalld/, applied at reload or boot."
   ],
   [
    "--runtime-to-permanent",
    "Saves the current runtime firewall configuration as the permanent configuration."
   ],
   [
    "drop and block zones",
    "Predefined zones that refuse incoming connections; drop discards silently and block rejects with an error."
   ]
  ],
  "example": "Only the 192.168.50.0/24 admin network may use the web console on TCP 9090. You add that network as a source to the internal zone with cockpit allowed, remove cockpit from public, all with --permanent, reload, and confirm with --get-active-zones and --zone=internal --list-all.",
  "mistakes": [
   [
    "Assuming the interface's zone always decides which rules apply.",
    "A matching source binding takes priority. Order is source, then interface, then default zone."
   ],
   [
    "Using --permanent with --set-default-zone and then reloading.",
    "--set-default-zone already changes both runtime and permanent configuration immediately; no reload is needed."
   ],
   [
    "Checking only firewall-cmd --list-all after making permanent changes without a reload.",
    "--list-all shows runtime. Compare with firewall-cmd --permanent --list-all, or reload first, to see what will survive a reboot."
   ],
   [
    "Removing SSH from public over a remote SSH session before allowing it from the admin source.",
    "You can cut off your own session. Add the new allow rule first, or test with runtime changes so a reload restores access."
   ]
  ],
  "tryit": [
   [
    "A database on TCP 5432 must be reachable only from the application servers at 172.16.20.0/24. The host's interface is in public, and nothing else should change for other clients. Which zone and commands would you use, and how would you check your work?",
    "Bind the network to another zone, for example firewall-cmd --permanent --zone=internal --add-source=172.16.20.0/24 and firewall-cmd --permanent --zone=internal --add-port=5432/tcp, make sure 5432 is not open in public, then firewall-cmd --reload. Check with --get-active-zones, --zone=internal --list-all and the same with --permanent to confirm runtime and saved rules match."
   ],
   [
    "You made several runtime changes during testing and everything works. Your shift ends in five minutes. What one command keeps the working setup after a reboot?",
    "firewall-cmd --runtime-to-permanent, followed by firewall-cmd --permanent --list-all to confirm the saved configuration."
   ]
  ],
  "tip": "Source bindings take priority over interface zones. Compare firewall-cmd --list-all with firewall-cmd --permanent --list-all to be sure your runtime and saved rules agree before you finish.",
  "check": [
   [
    "How does firewalld choose a zone for an incoming packet?",
    "A matching source binding first, then the zone of the incoming interface, then the default zone."
   ],
   [
    "How do you save working runtime rules without retyping them?",
    "firewall-cmd --runtime-to-permanent."
   ],
   [
    "Which command shows the saved, rather than running, rules for a zone?",
    "firewall-cmd --permanent --zone=name --list-all."
   ],
   [
    "What is the difference between the drop and block zones?",
    "drop silently discards incoming connections, while block rejects them with an error response."
   ]
  ]
 },
 {
  "t": "Managing default file permissions with umask (shell and /etc/login.defs, ~/.bashrc)",
  "hook": "It is Monday morning at Larkspur Insurance, and Dev from the audit team forwards you a finding: payroll export files on the reporting server are readable by every account on the box. Nobody ran a careless `chmod`. The files were simply born that way, created by a nightly job running as user daniel, who exports straight into a shared directory. You open a terminal as daniel, type `touch test.csv`, and `ls -l` shows `-rw-rw-r--`. Every new file he makes starts life with read access for the whole system. You could chase each file with `chmod` forever, or you could change the rule that decides what permissions a brand-new file gets in the first place. Where does that rule live, and how do you make it stick after the next login?",
  "simple": "Every time you create a file, Linux has to decide who may read and change it. Programs start by asking for generous permissions, and then a setting called the umask (short for user file-creation mask) takes some of them away before the file appears. Think of it like a coffee shop that pours every cup full and then removes some coffee depending on your order: the umask is the order slip that says how much to pour back out. A umask of 022 says take away write access from everyone except the owner. A umask of 077 says take away everything from everyone except the owner. The umask only affects files created after you set it, and it can only remove access, never add it.",
  "body": [
   "Every new file starts from a request. When a program creates a file or directory, it asks the kernel for a starting mode: normally 666 (rw-rw-rw-) for regular files and 777 (rwxrwxrwx) for directories. The umask (user file-creation mask) then removes bits from that request before the file is written to disk. Each process has its own umask, inherited from its parent process, so the value set in your shell controls the permissions of everything you create from that shell, including files written by scripts and editors you launch from it.",
   "The umask lists the bits to take away, not the bits to keep. With umask 022, write is removed for group and other, so new files get 644 (rw-r--r--) and new directories get 755 (rwxr-xr-x). With umask 002, only other loses write: files become 664 and directories 775. With umask 077, group and other lose everything: files become 600 and directories 700. With umask 027, group loses write and other loses everything, giving files 640 and directories 750. Regular files never get execute from the default creation process, because programs do not request it for regular files in the first place. That is why a umask of 000 still produces 666 files, not 777.",
   "```bash\numask            # 0022\numask -S         # u=rwx,g=rx,o=rx\numask 027\ntouch f; mkdir d\nls -ld f d       # -rw-r----- f   drwxr-x--- d\n```",
   "You can read and set the value from any shell. Plain `umask` prints the current value in octal, usually with a leading zero for the special bits, such as `0022`. `umask -S` prints it symbolically, showing what is kept rather than what is removed, for example `u=rwx,g=rx,o=rx`. Setting a value is just as short: `umask 027`. Strictly speaking, the umask is a bitwise mask rather than a subtraction, but for the common values you will see on the exam, subtracting each digit from 666 or 777 gives the right answer.",
   "A value typed at the prompt is temporary. Setting `umask 027` interactively affects only that shell and the processes it starts, and it disappears when you log out or close the terminal. To make it persistent for one user, add the `umask` line to that user's `~/.bashrc`, which is read by interactive shells, or to `~/.bash_profile`, which is read by login shells. The change takes effect in new shells, so test it by logging in again or opening a new session with `su - username`, not by checking the shell where you edited the file.",
   "System-wide defaults come from several places on RHEL (Red Hat Enterprise Linux). The file `/etc/login.defs` has a `UMASK` setting, which is used, for example, when `useradd` creates home directories and can be applied at login by PAM (Pluggable Authentication Modules). Shell startup files such as `/etc/profile` and `/etc/bashrc` can also set the umask, and the cleanest place for a site-wide shell override is a small script in `/etc/profile.d/` ending in `.sh`, because package updates do not overwrite your own files there. Typical results are 0022 for root and 0002 for regular users. The looser 0002 suits RHEL's private user groups scheme, in which each user's primary group contains only that user, so granting group write does not expose files to anyone else.",
   "```bash\n# /etc/profile.d/umask.sh  (all users)\numask 027\n\n# ~/.bashrc  (one user)\numask 077\n```",
   "Order matters when several files set the value. Startup files run in sequence, and whichever one runs last wins for that shell. A per-user `~/.bashrc` normally runs after the system files, so it overrides them for that user. If an exam task says all users must have a particular umask and one user still shows something else, look in that user's own startup files for a conflicting line with `grep umask ~/.bashrc ~/.bash_profile`.",
   "Two rules prevent most mistakes. First, the umask never grants permissions; it only removes them, so it cannot make a new file executable. Second, it applies at creation only. Existing files keep their modes no matter how you change the umask, so use `chmod` to fix files that already exist. Also remember that services started by systemd do not read your shell startup files at all. A systemd unit can set its own value with the `UMask=` directive, independently of any user's shell, which is why changing `~/.bashrc` does not change the permissions of files written by a daemon."
  ],
  "analogy": "The umask is like a stencil laid over a fresh sheet of paper. The program hands over a fully printed sheet (666 or 777), and the stencil blocks out certain squares before anything reaches the page. A stencil can only block, never add ink, which is why the umask cannot grant execute. The comparison stops working for files already on disk: the stencil is used only once, at printing time, so later changes to it do nothing to existing pages.",
  "terms": [
   [
    "umask",
    "A per-process mask of permission bits removed from new files and directories, inherited from the parent process."
   ],
   [
    "Default creation mode",
    "The mode programs request before masking: 666 for regular files and 777 for directories."
   ],
   [
    "umask -S",
    "Shows the current umask symbolically as the permissions that are kept, such as u=rwx,g=rx,o=rx."
   ],
   [
    "~/.bashrc",
    "A per-user shell startup file where a persistent umask for that user can be set."
   ],
   [
    "/etc/login.defs",
    "A system file of account defaults; its UMASK setting is used for new home directories and at login through PAM."
   ],
   [
    "/etc/profile.d/",
    "A directory of shell scripts run at login for all users, a clean place for site-wide settings like umask."
   ]
  ],
  "example": "User daniel must have new files readable only by himself. You add umask 077 to /home/daniel/.bashrc. After he logs in again, touch report.txt creates -rw------- and mkdir notes creates drwx------. Files he created before the change keep their old modes, so you also run chmod 600 on the existing exports.",
  "mistakes": [
   [
    "Thinking umask 022 means new files get permission 022.",
    "The umask lists bits to remove. With 022, files get 666 minus 022, which is 644, and directories get 755."
   ],
   [
    "Expecting umask 000 to make new files executable.",
    "Programs request 666 for regular files, so with nothing removed they get 666. The umask can only remove bits; execute must be added with chmod."
   ],
   [
    "Setting umask at the prompt and assuming it will survive a reboot or a new login.",
    "A typed umask lasts only for that shell and its children. Put it in ~/.bashrc for one user or a script in /etc/profile.d/ for everyone."
   ],
   [
    "Believing a new umask fixes files that already exist.",
    "The umask applies only at creation. Existing files keep their modes until you change them with chmod."
   ]
  ],
  "tryit": [
   [
    "A project team shares the directory /srv/design and wants every file a member creates to be writable by the group but completely hidden from other users. Members log in with bash and the setting must apply to all of them after their next login. What umask do you choose, and where do you put it?",
    "Use umask 007, which gives files 660 and directories 770, so the group keeps read and write while other gets nothing. Put umask 007 in a script such as /etc/profile.d/umask.sh so every user's login shell picks it up. If only the team members should get it, put it in each member's ~/.bashrc instead."
   ]
  ],
  "tip": "Subtract the umask from 666 for files and 777 for directories. With umask 027, files are 640 and directories 750. Verify a persistent change in a new login shell, not the one you edited from.",
  "check": [
   [
    "With umask 007, what modes do new files and directories get?",
    "Files 660 (rw-rw----) and directories 770 (rwxrwx---)."
   ],
   [
    "Where would you set a persistent umask for just one user?",
    "In that user's ~/.bashrc or ~/.bash_profile, which take effect in new shells."
   ],
   [
    "Can umask make new regular files executable?",
    "No; it only removes bits, and programs request 666 for files, so execute is never set by default."
   ],
   [
    "You changed the umask, but an old file still has mode 664. Why?",
    "The umask applies only when a file is created; existing files must be changed with chmod."
   ]
  ]
 },
 {
  "t": "Configuring key-based SSH authentication (ssh-keygen, ssh-copy-id, ~/.ssh permissions, sshd_config)",
  "hook": "At Brightwater Logistics, the backup script on servera has failed every night this week. Ana, who wrote it, left a note: it copies files to serverb with `scp` and somebody keeps typing the password by hand when they remember. Your manager wants it unattended by tonight, and the security lead adds one more line to the ticket: once keys work, password logins to serverb must be turned off. You know that a single wrong permission on a hidden directory can make the server silently ignore your key, and that disabling passwords too early can lock everyone out, you included. How do you set up keys so they work every time, and switch off passwords without stranding yourself?",
  "simple": "Logging in with SSH (Secure Shell) normally means typing a password. Key-based login replaces that with a pair of matching files. One file, the private key, stays on your own computer and must be kept secret. The other, the public key, is copied to the server you want to reach. When you connect, the server asks your computer to prove it has the private key that matches, without the private key ever being sent. It is like a padlock and its key: you can hand out copies of the padlock (the public key) to anyone, but only the person holding the real key can open them. Once it is set up, you can log in without typing a password, which is perfect for scripts.",
  "body": [
   "Key authentication replaces something you type with something you hold. SSH (Secure Shell) key authentication uses a key pair: a private key that stays on your client and a public key that is copied to each server. When you connect, the server sends a challenge that only the matching private key can answer, and the private key itself never crosses the network. Keys resist password guessing, make automation possible because nothing has to be typed, and are expected on the RHCSA (Red Hat Certified System Administrator) exam whenever a task says a user must log in without a password.",
   "You create the pair with `ssh-keygen`. The default key type depends on the OpenSSH version shipped with your RHEL (Red Hat Enterprise Linux) release, and you can always choose explicitly with `-t ed25519` or `-t rsa`. Accept the default location in `~/.ssh/`, which produces a private key such as `id_ed25519` and a public key with the same name plus `.pub`. You then choose whether to protect the private key with a passphrase. An empty passphrase allows unattended use by scripts, while a passphrase protects you if the file is ever stolen. `ssh-agent` can hold the unlocked key in memory so you type the passphrase once per session.",
   "```bash\nssh-keygen -t ed25519            # creates ~/.ssh/id_ed25519 and .pub\nssh-copy-id student@serverb      # asks for the password once\nssh student@serverb              # now logs in with the key\n```",
   "Copying the public key is easiest with `ssh-copy-id`. It logs in once with the password, appends your public key to `~/.ssh/authorized_keys` in the target user's home directory on the server, and creates the directory and file with sensible permissions if they do not exist. Note which account matters: the key goes into the home directory of the user you will log in as on the server, not your own local account. If you are root on servera and must reach serverb as student, the key belongs in student's file on serverb.",
   "Permissions decide whether sshd trusts the files. If you copy keys by hand, the SSH daemon refuses to use them when they are too open, because a file anyone can edit could be used to plant a stranger's key. The home directory must not be writable by group or other, `~/.ssh` should be 700, `authorized_keys` should be 600, and the private key on the client must be 600. Everything must be owned by the user. SELinux (Security-Enhanced Linux) labels matter too: files created with `mv` from elsewhere can carry the wrong label, so run `restorecon -Rv ~/.ssh` after placing them by hand. A quick fix for a hand-built setup is `chmod 700 ~/.ssh; chmod 600 ~/.ssh/authorized_keys` followed by `chown -R user: ~/.ssh` if root created the files.",
   "Server behavior lives in sshd's configuration. The main file is `/etc/ssh/sshd_config`, and on current RHEL the preferred place for local changes is a drop-in file under `/etc/ssh/sshd_config.d/` ending in `.conf`. The main file includes that directory near its top, so drop-ins are read first, and for most options the first value sshd finds is the one it uses. Three settings matter most. `PubkeyAuthentication yes` enables keys and is already the default. `PasswordAuthentication no` requires keys and refuses typed passwords. `PermitRootLogin` takes `yes`, `no` or `prohibit-password`, which means root may log in with a key but never with a password.",
   "```bash\n# /etc/ssh/sshd_config.d/50-local.conf\nPasswordAuthentication no\nPermitRootLogin no\n\nsshd -t                  # test syntax\nsystemctl reload sshd\n```",
   "Always test before you reload and before you close your session. `sshd -t` checks the configuration and prints nothing when it is valid, while a typo produces an error naming the line. After `systemctl reload sshd`, keep your current session open and confirm in a second terminal that key login still works. Only then disconnect. This habit prevents the classic lockout where passwords are disabled before the key was ever accepted.",
   "When a key is refused, gather evidence from both ends. Run the client with `ssh -v user@host` to see which keys it offered and whether the server fell back to password. On the server, `journalctl -u sshd` usually names the problem, such as bad ownership or modes on a directory, and a successful login appears as Accepted publickey for the user. Finally, treat private keys like passwords: never copy a private key to a server, and remove a person's line from `authorized_keys` when their access should end."
  ],
  "analogy": "Key authentication is like a building that keeps a list of padlock designs at the front desk. You register your padlock (the public key) with the desk, and when you arrive the guard hands you a locked box built from that design. Only someone holding your real key can open it and show what is inside. Unlike a real padlock, the desk also refuses your registration if the list is kept in a drawer anyone can open, which is the permissions rule sshd enforces.",
  "terms": [
   [
    "Key pair",
    "A private key kept on the client and a matching public key placed on servers for authentication."
   ],
   [
    "ssh-keygen",
    "Generates a new SSH key pair; -t chooses the key type, such as ed25519 or rsa."
   ],
   [
    "authorized_keys",
    "The file ~/.ssh/authorized_keys on a server listing public keys allowed to log in as that user."
   ],
   [
    "ssh-copy-id",
    "Copies a public key into a remote user's authorized_keys file with correct permissions."
   ],
   [
    "PasswordAuthentication",
    "An sshd setting; no refuses typed passwords so only keys or other methods work."
   ],
   [
    "PermitRootLogin",
    "An sshd setting controlling root logins: yes, no or prohibit-password (key only)."
   ]
  ],
  "example": "User student on servera must log in to serverb without a password. As student you run ssh-keygen accepting defaults, then ssh-copy-id student@serverb and enter the password once. ssh student@serverb hostname now prints serverb without prompting, and journalctl -u sshd on serverb shows Accepted publickey for student.",
  "mistakes": [
   [
    "Copying the private key to the server.",
    "Only the public key (.pub) goes to the server, into authorized_keys. The private key stays on the client and should never leave it."
   ],
   [
    "Putting the public key in your own local account instead of the target account on the server.",
    "The key must be in ~/.ssh/authorized_keys of the user you log in as on the server, such as student on serverb."
   ],
   [
    "Assuming permissions do not matter as long as the key text is correct.",
    "sshd ignores keys when ~/.ssh, authorized_keys or the home directory are writable by others or owned by the wrong user. Use 700 for ~/.ssh and 600 for authorized_keys."
   ],
   [
    "Disabling PasswordAuthentication before testing the key.",
    "Confirm key login works in a second session first, and run sshd -t before reloading, or you can lock yourself out."
   ]
  ],
  "tryit": [
   [
    "A colleague hand-copied his public key into /home/lee/.ssh/authorized_keys on serverb, but ssh lee@serverb still asks for a password. ls -ld shows /home/lee as drwxrwxr-x and ~/.ssh as drwxr-xr-x. What do you fix?",
    "The home directory is group-writable, which makes sshd distrust the key files. Run chmod 755 (or 700) on /home/lee, chmod 700 on ~/.ssh and chmod 600 on authorized_keys, confirm lee owns them, and run restorecon -Rv /home/lee/.ssh. journalctl -u sshd would have named the bad permission."
   ],
   [
    "Policy says root on serverb may still log in for emergencies, but only with a key. Which sshd setting and value do you use?",
    "PermitRootLogin prohibit-password in a drop-in under /etc/ssh/sshd_config.d/, followed by sshd -t and systemctl reload sshd. That allows root key logins and refuses root passwords."
   ]
  ],
  "tip": "Most key failures are permissions: ~/.ssh must be 700, authorized_keys 600, and the home directory not group- or world-writable. Check journalctl -u sshd on the server for the reason.",
  "check": [
   [
    "Which file on the server must contain your public key?",
    "~/.ssh/authorized_keys in the home directory of the account you log in as."
   ],
   [
    "What do you run after changing sshd settings?",
    "sshd -t to check syntax, then systemctl reload sshd (or restart)."
   ],
   [
    "What does PermitRootLogin prohibit-password allow?",
    "Root may log in with a key but not with a password."
   ],
   [
    "Why is an empty passphrase sometimes chosen for a key?",
    "It allows unattended use, such as a scheduled backup script, at the cost of less protection if the private key file is stolen."
   ]
  ]
 },
 {
  "t": "Setting SELinux enforcing and permissive modes (getenforce, setenforce, /etc/selinux/config)",
  "hook": "You inherit a web server at Cedar Valley Clinic from Marcus, who moved to another team last month. His handover note says everything works fine. You run `getenforce` out of habit, and it prints Permissive. Somewhere along the way, a stubborn permission problem was solved by quietly switching off the protection that would contain a compromised web server. The compliance officer wants SELinux enforcing on every server before Friday's review, and it has to stay enforcing after the scheduled reboot on Saturday night. You could type one command and see the right word appear, but would it survive the reboot? And if the previous admin went further and disabled SELinux entirely, what else would you need to do before turning it back on?",
  "simple": "SELinux (Security-Enhanced Linux) is an extra guard built into the Linux system. Normal file permissions say which users may open which files. SELinux adds a second rulebook that says which programs may touch which files and network ports, so a hacked web server cannot wander into places it never needed. The guard can be in one of three moods. Enforcing means it blocks anything against the rules and writes it down. Permissive means it only writes down what it would have blocked, but lets everything through. Disabled means the guard has gone home. It is like a store security guard who either stops shoplifters, just takes notes, or is not on shift at all. You can change the mood right now with one command, but to keep it after a restart you must write it in a settings file.",
  "body": [
   "SELinux adds a second layer of decisions on top of normal permissions. SELinux (Security-Enhanced Linux) is mandatory access control built into the Linux kernel. Every process and file carries a security label, and a policy says which process types may access which object types. Even if a service is compromised, SELinux can stop it from touching files and ports it was never meant to use, because the attacker inherits the service's label and its limits. RHEL (Red Hat Enterprise Linux) enables SELinux by default, and the RHCSA (Red Hat Certified System Administrator) exam expects it to stay on. A grader that finds SELinux permissive or disabled at the end may treat related tasks as failed.",
   "SELinux runs in one of three modes, and each has a clear purpose. Enforcing applies the policy: forbidden access is denied and logged. Permissive loads the policy and logs what would have been denied, but allows the access anyway. It is a troubleshooting mode, not a security setting, because nothing is actually blocked. Disabled means no SELinux protection at all. It also means files created while disabled get no labels, which is why returning from disabled requires a full relabel of the file system.",
   "Two commands tell you where you stand. `getenforce` prints the current mode as a single word: Enforcing, Permissive or Disabled. `sestatus` shows more detail, including whether SELinux is enabled, the current mode, the mode from the config file and the loaded policy name, which is normally targeted. When the current mode and the config file mode differ in `sestatus` output, someone changed the mode at runtime and the next reboot will change it again.",
   "`setenforce` switches modes on a running system. `setenforce 0` switches to permissive and `setenforce 1` switches back to enforcing. You can also write `setenforce Permissive` or `setenforce Enforcing`. The change is immediate and lasts only until the next boot. Crucially, setenforce cannot enable or disable SELinux itself. If `getenforce` prints Disabled, setenforce just reports that SELinux is disabled, and you have to change the configuration and reboot.",
   "```bash\ngetenforce            # Enforcing\nsetenforce 0          # permissive until reboot\nsetenforce 1\nsestatus\ngrep ^SELINUX= /etc/selinux/config\n```",
   "The boot-time mode lives in `/etc/selinux/config`. The line `SELINUX=` takes `enforcing`, `permissive` or `disabled`, and it sits alongside `SELINUXTYPE=targeted`, which names the standard policy. Edit this file to make a mode persistent. On current RHEL releases, setting `disabled` in this file does not fully remove SELinux from the kernel; the supported way to disable it completely is the `selinux=0` kernel argument. For a single boot you can also add `enforcing=0` to the kernel command line at the boot menu, which starts the system permissive without changing any file. That is useful when a mislabeled system will not boot normally.",
   "Kernel arguments can override the file, so check them too. If `getenforce` still shows the wrong mode after you fixed the config file and rebooted, look at the running kernel command line with `cat /proc/cmdline`. An `enforcing=0` or `selinux=0` there wins over `/etc/selinux/config`. On RHEL, persistent kernel arguments are managed with `grubby`, for example `grubby --update-kernel ALL --remove-args selinux=0`, which removes the argument from every installed kernel's boot entry so the next boot follows the config file again.",
   "A common exam scenario is a system left in the wrong mode. You must make it enforcing persistently. First set `SELINUX=enforcing` in `/etc/selinux/config`. If SELinux is currently permissive, run `setenforce 1` so it enforces now as well. If it was disabled, setenforce will not help, so create the file `/.autorelabel` with `touch /.autorelabel` and reboot. On that boot, the system relabels every file according to policy and then reboots again, which can take several minutes on a large file system. Finally, confirm with `sestatus` that both the current mode and the mode from the config file read enforcing.",
   "Permissive is a diagnostic tool, never a fix. When something fails and you suspect SELinux, you may briefly run `setenforce 0` and retry. If the problem goes away, SELinux was involved. Then go straight back to enforcing with `setenforce 1` and fix the real cause, which is almost always a wrong file label, a missing port label or a boolean that needs to be turned on. Leaving the system permissive hides the problem, removes protection from every service on the machine, and fails an exam that checks the mode after reboot."
  ],
  "analogy": "Think of SELinux modes as a security camera system with automatic door locks. Enforcing records everything and locks doors against anyone not on the list. Permissive keeps recording but leaves every door unlocked, so you can review the footage to learn who would have been stopped. Disabled turns off both cameras and locks. The comparison breaks down on recovery: turning cameras back on is instant, but SELinux coming back from disabled must first relabel every file, which needs /.autorelabel and a reboot.",
  "terms": [
   [
    "SELinux",
    "Security-Enhanced Linux, kernel mandatory access control based on labels and policy."
   ],
   [
    "Enforcing mode",
    "SELinux applies the policy, denying and logging forbidden access."
   ],
   [
    "Permissive mode",
    "SELinux logs policy violations but allows them, used for troubleshooting."
   ],
   [
    "setenforce",
    "Switches between enforcing (1) and permissive (0) at runtime until the next boot; it cannot enable or disable SELinux."
   ],
   [
    "/etc/selinux/config",
    "The file setting the SELinux mode and policy type used at boot."
   ],
   [
    "/.autorelabel",
    "An empty file that tells the system to relabel every file at the next boot."
   ]
  ],
  "example": "A server was left permissive by a previous admin. getenforce prints Permissive and the config file says SELINUX=permissive. You change the file to SELINUX=enforcing, run setenforce 1, and sestatus now shows both current and config mode as enforcing, so it stays that way after reboot.",
  "mistakes": [
   [
    "Running setenforce 1 and considering the task done.",
    "setenforce changes only the running mode. Without SELINUX=enforcing in /etc/selinux/config, the system returns to the old mode at the next boot."
   ],
   [
    "Treating permissive as a safe middle ground for production.",
    "Permissive blocks nothing; it only logs. It is for short troubleshooting, after which you return to enforcing and fix the real cause."
   ],
   [
    "Expecting setenforce to turn a disabled system back on.",
    "setenforce works only when SELinux is enabled. A disabled system needs the config file changed, touch /.autorelabel, and a reboot."
   ],
   [
    "Skipping the relabel when re-enabling SELinux after it was disabled.",
    "Files created while disabled have no correct labels, so services can fail or the system may not boot cleanly. touch /.autorelabel before rebooting."
   ]
  ],
  "tryit": [
   [
    "After a reboot, a lab server prints Disabled for getenforce. /etc/selinux/config contains SELINUX=disabled. The task says SELinux must enforce the targeted policy persistently. What exact steps do you take?",
    "Edit /etc/selinux/config to SELINUX=enforcing and keep SELINUXTYPE=targeted. Check that the kernel command line does not contain selinux=0. Run touch /.autorelabel so files are labeled on boot, then reboot. After it comes back, getenforce and sestatus should both show enforcing. setenforce is not used because it cannot enable a disabled SELinux."
   ]
  ],
  "tip": "setenforce changes only the running mode; /etc/selinux/config sets the mode at boot. A persistent change needs the file, and graders check after a reboot.",
  "check": [
   [
    "What is the difference between enforcing and permissive?",
    "Enforcing denies and logs policy violations; permissive only logs them and allows the access."
   ],
   [
    "Can setenforce disable SELinux?",
    "No; it only switches between enforcing and permissive at runtime."
   ],
   [
    "What should you do before rebooting a system that had SELinux disabled and must now enforce?",
    "Set SELINUX=enforcing in /etc/selinux/config and touch /.autorelabel so files are relabeled at boot."
   ],
   [
    "sestatus shows current mode permissive and mode from config file enforcing. What will the mode be after reboot?",
    "Enforcing, because the boot-time mode comes from the config file; someone used setenforce 0 at runtime."
   ]
  ]
 },
 {
  "t": "Listing and identifying SELinux file and process contexts (ls -Z, ps -eZ, id -Z)",
  "hook": "A help-desk ticket lands in your queue at Meadowbrook Library Services: the new events page returns 403 Forbidden, while every other page on the intranet loads fine. Rosa, the web editor, swears she copied it into the right folder. You check with `ls -l`, and the permissions match its neighbors exactly, rw-r--r--, owned by root. The Apache configuration has not changed in months. Nothing in the normal permission bits explains why one file is refused. Yet the web server clearly treats that file differently from the one right next to it. There must be another label on the file that `ls -l` does not show. What is it, how do you read it, and how do you tell whether it is the right one?",
  "simple": "SELinux (Security-Enhanced Linux) puts a hidden name tag on every file and every running program. The tag says what kind of thing it is, such as web page content or a user's private file. SELinux then checks the tags: a program tagged as the web server may only read files tagged as web content. Normal commands hide these tags, but adding `-Z` to commands like `ls`, `ps` and `id` shows them. Think of a concert where staff wear wristbands of different colors and each door only opens for certain colors. Ordinary permissions are like having a ticket, but you still need the right wristband color to get through a particular door. When something is mysteriously refused, checking the tags often reveals a file wearing the wrong color.",
  "body": [
   "Labels are the language SELinux thinks in. Everything SELinux (Security-Enhanced Linux) decides is based on labels called security contexts. Every file, directory, process, network port and user session has one. Before you can fix an SELinux problem, you need to read these labels and notice when one is wrong. That is why almost every RHCSA (Red Hat Certified System Administrator) SELinux task starts with a command that has a `-Z` option, which is the near-universal switch for showing contexts.",
   "A context has four fields separated by colons: user, role, type and level, for example `system_u:object_r:httpd_sys_content_t:s0`. The SELinux user, here `system_u`, is not the same as your Linux login name, and it matters little in the default targeted policy. The role, such as `object_r` for files or `system_r` for system processes, also plays only a small part in targeted policy. The type, which ends in `_t`, is the part that matters. Targeted policy rules are written in terms of which process type may do what to which object type, and this approach is called type enforcement. The level, such as `s0`, is used for multi-level security and multi-category security, and you can usually ignore it on the exam.",
   "Many standard commands accept `-Z`. `ls -Z` shows the contexts of files, and `ls -dZ` shows the context of a directory itself instead of its contents. `ps -eZ` (or `ps axZ`) shows the context of every running process, so you can see that the Apache web server runs as `httpd_t`. `id -Z` shows your own context, which for a normal login is usually `unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023`, meaning your shell is not confined by the targeted policy. `ss -Z` shows network sockets together with the contexts of the processes that own them, and `cp -Z`, `mkdir -Z` and similar commands can set a context as they create something.",
   "```bash\nls -Z /var/www/html/index.html\n# unconfined_u:object_r:httpd_sys_content_t:s0 /var/www/html/index.html\nps -eZ | grep httpd\n# system_u:system_r:httpd_t:s0   1234 ?  00:00:00 httpd\nid -Z\n```",
   "Reading these labels explains most failures. A process of type `httpd_t` may read files labeled `httpd_sys_content_t`, but not files labeled `user_home_t` or `admin_home_t`. So when a web page file shows the wrong type, that mismatch is your problem, even if its permission bits are perfectly fine. Remember that SELinux is checked in addition to normal permissions, not instead of them. Access is allowed only when the traditional permissions allow it and the policy allows it, so a file can fail either check independently.",
   "Process labels deserve the same attention as file labels. A process usually gets its type from the program file it runs, through rules called transitions. When systemd starts `/usr/sbin/httpd`, whose file type is `httpd_exec_t`, the new process becomes `httpd_t`. If you see a service running as `unconfined_service_t` or `initrc_t` instead of its expected type, it was likely started in an unusual way or its program file is mislabeled. Filtering helps when the list is long: `ps -eZ | grep -E 'httpd|sshd'` narrows the output to the services you care about, and `ps -Z -p PID` shows one process by its process ID. Ports carry contexts too, such as `http_port_t` for port 80, and those are listed with `semanage port -l`, which a later lesson covers.",
   "Where do file labels come from? A newly created file normally inherits the type of the directory it is created in. That is why `cp` into `/var/www/html` gives the copy the right label: `cp` creates a new file in the destination. By contrast, `mv` from a home directory keeps the old home label, because moving within the same file system does not create a new file, it only renames the existing one with its existing label. `cp -a` and `tar` with the `--selinux` option deliberately preserve the original labels, which is useful for backups and can be surprising when restoring into a different location.",
   "To know what a label should be, ask the policy. The policy keeps a list of default labels for paths, written as regular expressions, and `semanage fcontext -l` shows the full list. For one specific path, `matchpathcon /path` prints the expected label, and `restorecon -nv /path` shows what would change without changing anything. Comparing the actual label from `ls -Z` with the expected one is the core diagnostic step. A mismatch is exactly what the next lesson's `restorecon` command fixes, and a path with no suitable rule is what `semanage fcontext` addresses."
  ],
  "analogy": "SELinux contexts are like colored wristbands at a festival. Each staff member and each area has a color, and the rules say which wristband colors may enter which areas. Your ticket (normal permissions) gets you through the gate, but the backstage door also checks your wristband (the type). Moving a file with mv is like walking into a new area still wearing your old wristband, while cp is like getting a fresh one at the entrance. The analogy stops at the extra fields: only the type color really matters in targeted policy.",
  "mnemonic": "Context fields in order are user, role, type, level: Users Read Their Labels. The third word, Their, is the type, the field that matters most.",
  "terms": [
   [
    "Security context",
    "An SELinux label of the form user:role:type:level attached to files, processes, ports and sessions."
   ],
   [
    "Type",
    "The context field ending in _t that targeted policy uses to decide access."
   ],
   [
    "Type enforcement",
    "SELinux policy rules that allow a process type specific access to object types."
   ],
   [
    "unconfined_t",
    "The type of normal user login sessions, which targeted policy does not restrict."
   ],
   [
    "httpd_sys_content_t",
    "The file type the Apache web server process (httpd_t) may read as web content."
   ],
   [
    "matchpathcon",
    "Prints the label the policy expects for a given path, for comparison with ls -Z."
   ]
  ],
  "example": "A page you moved into /var/www/html gives 403 Forbidden while others work. ls -Z shows the new file is admin_home_t while the others are httpd_sys_content_t, and ps -eZ shows the server runs as httpd_t. The mismatch comes from using mv instead of cp, and relabeling the file fixes it.",
  "mistakes": [
   [
    "Assuming the SELinux user field (such as system_u) is the Linux login name and must match the file owner.",
    "The SELinux user is separate from Linux users and matters little in targeted policy. The type field decides access."
   ],
   [
    "Thinking correct permission bits rule out an access problem.",
    "SELinux is checked in addition to permissions. A file with 644 can still be denied if its type is wrong for the process."
   ],
   [
    "Expecting mv to give a file the destination directory's label.",
    "mv keeps the existing file and its label. Only a newly created file, such as one made by cp, inherits the directory's type."
   ],
   [
    "Using ls -Z on a directory and reading the contents' labels instead of the directory's own.",
    "Use ls -dZ to see the label of the directory itself."
   ]
  ],
  "tryit": [
   [
    "A custom service started from a systemd unit cannot read its configuration file in /etc/myapp. ls -l shows the file is root-owned and 644. ps -eZ shows the service process has type myapp_t, and ls -Z shows the config file is user_home_t. What does this evidence tell you, and what is your next step?",
    "The permission bits are fine, but the file's type is user_home_t, a home directory label, so it was probably moved from a home directory with mv. Compare with the expected label using matchpathcon /etc/myapp/file.conf, then restore the policy default with restorecon (covered in the next lesson)."
   ]
  ],
  "tip": "mv keeps a file's old context while cp creates a new file with the directory's context. A moved file with the wrong type is a classic exam trap.",
  "check": [
   [
    "Which field of an SELinux context matters most in the targeted policy?",
    "The type field, ending in _t."
   ],
   [
    "How do you see the context of running httpd processes?",
    "ps -eZ | grep httpd (or ps axZ)."
   ],
   [
    "Why does a file moved with mv keep the wrong context?",
    "mv keeps the existing file and its label, while a newly created file inherits the directory's type."
   ],
   [
    "What does id -Z typically show for a normal user login, and what does it mean?",
    "unconfined_u:unconfined_r:unconfined_t with a level range; the session is not restricted by targeted policy."
   ]
  ]
 },
 {
  "t": "Restoring default file contexts (restorecon -Rv) and adding rules with semanage fcontext",
  "hook": "At Northgate Community College, the new course catalog site must be served from `/srv/catalog`, a dedicated volume Kwame mounted yesterday. Apache is configured, the firewall is open, and every page returns 403 Forbidden. You found the cause quickly: `ls -Z` shows the files are `default_t`, a label the web server may not read. A teammate fixed it last term with `chcon`, and it worked, right up until a routine relabel quietly put the old labels back and the site went dark during registration week. This time the fix has to survive relabels, reboots and the next admin. How do you teach the system what label a brand-new path should have, and then make the files actually wear it?",
  "simple": "SELinux (Security-Enhanced Linux) keeps a master list that says which tag each folder and file should wear, such as web content for the web folder. Each file also carries its own actual tag. Sometimes the two disagree, for example when a file was moved from somewhere else. The `restorecon` command fixes that by resetting files to whatever the master list says. If you invent a new folder the master list has never heard of, you first add an entry to the list with `semanage fcontext`, and then run `restorecon` to apply it. It is like a school's official class roster: if a student sits in the wrong room, you send them to the room on the roster, and if a new student arrives, you add them to the roster first.",
  "body": [
   "SELinux keeps two versions of the truth, and fixing labels means reconciling them. The policy database records which label each path should have, written as regular expressions such as `/var/www(/.*)?` mapped to the type `httpd_sys_content_t`. The actual label is stored on each file as an extended attribute. When the two disagree, the fix is to reset the file to what the policy says. When the policy itself has no suitable rule for your custom path, you first add one and then apply it. Those two operations are the job of `restorecon` and `semanage fcontext` in SELinux (Security-Enhanced Linux).",
   "`restorecon` sets files back to the label the policy expects. Give it a path, and add `-R` to recurse into directories and `-v` to print each change, so you can see exactly what was wrong. `restorecon -Rv /var/www/html` is the standard fix for files moved there from home directories with `mv`. It is safe to run repeatedly, because it only changes labels that differ from policy and leaves correct ones alone. When you want to preview without touching anything, `restorecon -Rnv` shows what would change, which is a good habit on unfamiliar systems.",
   "```bash\nrestorecon -Rv /var/www/html\n# Relabeled /var/www/html/page.html from ...admin_home_t:s0 to ...httpd_sys_content_t:s0\n```",
   "Custom locations need a rule before restorecon can help. If you serve web content from `/web`, the policy's default label for that new top-level path is `default_t`, which the web server may not read. Running restorecon there would simply put `default_t` back, because that is what the policy currently says. So you add a rule with `semanage fcontext -a -t type 'regex'`, where `-a` adds and `-t` names the type, and then apply it with restorecon. The regular expression `'/web(/.*)?'` matches the directory itself and everything inside it. Quote it so the shell does not try to expand the parentheses or asterisk, and use the full absolute path.",
   "```bash\nsemanage fcontext -a -t httpd_sys_content_t '/web(/.*)?'\nrestorecon -Rv /web\nls -dZ /web\nsemanage fcontext -l -C        # list local customizations\n```",
   "Finding the right type is often the hardest part. `semanage fcontext -l` lists every rule in the policy, and you can grep it for a similar existing path to borrow its type. For example, `semanage fcontext -l | grep '/var/www'` reveals `httpd_sys_content_t` for web content and other web types, such as a read-write type for directories the application must write to. `semanage fcontext -l -C` shows only your local customizations, which is a quick way to confirm your rule was saved. `-d` deletes a local rule and `-m` modifies one. The semanage command comes from the policycoreutils-python-utils package, which you may need to install with `dnf install policycoreutils-python-utils` on a minimal system.",
   "Rules are persistent because they live in the policy. A rule added with semanage fcontext survives reboots and even a full relabel triggered by `touch /.autorelabel`, because the relabel reads the same policy database. This is the key difference from `chcon`, which changes a file's label directly, for example `chcon -t httpd_sys_content_t /web/index.html`. chcon works immediately, which makes it handy for a quick test, but it is temporary in an important sense: the next restorecon or relabel will undo it, because the policy still says otherwise. On the exam, and in production, use semanage fcontext plus restorecon for anything that must persist.",
   "Remember the order and what each step does. semanage fcontext only records the rule; it does not change any file on disk. restorecon applies the rule to existing files. New files created later in that directory inherit the directory's type automatically, so you do not need to rerun restorecon for every new file, only for files that were moved in or created before the rule existed. If `ls -Z` still shows the old label after you added a rule, you almost certainly forgot the restorecon step, or your regular expression does not match the path you typed.",
   "Two related tricks round out the toolkit. `touch /.autorelabel` followed by a reboot relabels the entire file system from policy, which is useful after re-enabling SELinux or when labels are widely damaged. And restorecon is the right fix after placing SSH keys, web content or configuration files with `mv`, since moved files keep their original labels. When in doubt, compare `ls -Z` with `matchpathcon` for the path, then decide whether you need restorecon alone or a new rule first."
  ],
  "analogy": "The fcontext rules are like a school's official seating chart, and each file's label is where a student is actually sitting. restorecon walks the room and moves everyone to their assigned seat. If a new room opens that is not on the chart, restorecon has nowhere sensible to send anyone, so you add the room to the chart first with semanage fcontext. chcon is like telling a student to sit somewhere else without changing the chart: it works until the next time someone checks the chart.",
  "mnemonic": "Rule first, then restore: semanage writes the chart, restorecon moves the files. Think S then R, as in Set the rule, then Relabel.",
  "terms": [
   [
    "restorecon",
    "Resets file SELinux labels to the values defined in policy; -R recurses, -v reports changes and -n previews."
   ],
   [
    "semanage fcontext",
    "Adds (-a), modifies (-m), deletes (-d) or lists (-l) the policy rules mapping path patterns to file types."
   ],
   [
    "chcon",
    "Changes a file's label directly; the change is lost on restorecon or relabel."
   ],
   [
    "(/.*)?",
    "The regular expression suffix that matches a directory and everything beneath it in fcontext rules."
   ],
   [
    "default_t",
    "The type given to paths with no specific rule, such as new top-level directories; most confined services cannot read it."
   ],
   [
    "policycoreutils-python-utils",
    "The package that provides the semanage command."
   ]
  ],
  "example": "Apache must serve content from /srv/site. You run semanage fcontext -a -t httpd_sys_content_t '/srv/site(/.*)?', then restorecon -Rv /srv/site, which relabels every file. After a full relabel test with touch /.autorelabel and reboot, ls -Z still shows httpd_sys_content_t because the rule is in policy.",
  "mistakes": [
   [
    "Running semanage fcontext -a and expecting the files to change immediately.",
    "semanage only records the rule. You must run restorecon -Rv on the path to apply it to existing files."
   ],
   [
    "Using chcon for a fix that must survive reboots and relabels.",
    "chcon changes only the file. A relabel or restorecon resets it to the policy value, so add a semanage fcontext rule instead."
   ],
   [
    "Running restorecon on a custom path with no rule and expecting the right type.",
    "restorecon applies whatever the policy says, which for a new path such as /web is default_t. Add the rule first."
   ],
   [
    "Writing the pattern without quotes or without (/.*)?.",
    "Quote the regex so the shell does not expand it, and include (/.*)? so the rule covers the directory contents, not just the directory."
   ]
  ],
  "tryit": [
   [
    "A colleague fixed a 403 error on /data/www with chcon -R -t httpd_sys_content_t /data/www, and the site works. You are asked to make sure it still works after the planned full relabel next weekend. What do you do, and how do you verify it without waiting for the weekend?",
    "Add the rule with semanage fcontext -a -t httpd_sys_content_t '/data/www(/.*)?', then run restorecon -Rv /data/www. To verify, run restorecon -Rnv /data/www and confirm it reports no changes, or check matchpathcon /data/www against ls -dZ. Since the policy now matches the labels, a relabel will keep them."
   ]
  ],
  "tip": "semanage fcontext only records the rule; it does not change any file. Always follow it with restorecon -Rv on the path, and prefer this pair over chcon for persistence.",
  "check": [
   [
    "You added a semanage fcontext rule but ls -Z shows the old label. What did you forget?",
    "Running restorecon -Rv on the path to apply the rule to existing files."
   ],
   [
    "Why is chcon not a persistent fix?",
    "It changes the label on the file only; restorecon or a relabel resets it to what the policy says."
   ],
   [
    "What does the pattern '/data(/.*)?' match?",
    "The /data directory itself and everything beneath it."
   ],
   [
    "How do you list only the file context rules you added locally?",
    "semanage fcontext -l -C."
   ]
  ]
 },
 {
  "t": "Managing SELinux port labels (semanage port -a -t http_port_t -p tcp)",
  "hook": "It is 4:40 p.m. at Fernhill Credit Union, and the vendor's install guide for the new loan calculator says the internal web server must answer on port 82, because port 80 already serves the staff portal. Jamal changed the `Listen` line in the Apache configuration, restarted the service, and walked away. Now `systemctl status httpd` shows failed, and the error says permission denied while binding to port 82. Jamal is puzzled: he is root, nothing else uses port 82, and the configuration syntax checks out. The service owner wants it running before the branch closes. Something besides ordinary permissions is deciding which ports Apache may listen on. What is it, and how do you change it without turning off the protection?",
  "simple": "Network services listen on numbered ports, such as port 80 for websites. SELinux (Security-Enhanced Linux) puts a tag on each port number, and it only lets a service listen on ports carrying the tag meant for that service. The web server, for example, may only use ports tagged as web ports. If you tell it to use an unusual number, SELinux blocks it and the service will not start, even though everything else is set up correctly. The fix is to add that number to the web port tag with the `semanage port` command. It is like a parking garage where each company has spaces painted in its color: you can only park in your color, so to use a new space, you have it repainted.",
  "body": [
   "SELinux labels network ports as well as files. SELinux (Security-Enhanced Linux) policy says which process types may bind to, meaning listen on, which port types. For example, `httpd_t`, the type of the Apache web server, may bind to ports labeled `http_port_t`, which by default include 80 and 443 and a few others such as 8008 and 8443. Port 8080, which many people assume is a web port, is actually labeled `http_cache_port_t`. If you configure a service to listen on a port that does not carry its type, SELinux blocks the bind and the service fails to start, even though the configuration is otherwise perfect. This protects you if a compromised service tries to open a listener on an unexpected port.",
   "Start by checking what is already allowed. `semanage port -l` lists every port type with its protocol and port numbers. The full list is long, so filter it: `semanage port -l | grep -w http_port_t` for the web server, or `grep ssh_port_t` for SSH (Secure Shell). The `-w` option to grep matches the whole word, so you do not also see similar types such as `http_cache_port_t`. This one command tells you both whether your port is already covered and which type name you need to use if it is not.",
   "```bash\nsemanage port -l | grep -w http_port_t\n# http_port_t   tcp   80, 81, 443, 488, 8008, 8009, 8443, 9000\nsemanage port -a -t http_port_t -p tcp 82\nsemanage port -l | grep -w http_port_t\n```",
   "Adding a port is a single command. The form is `semanage port -a -t type -p protocol port`. `-a` adds a new mapping, `-t` gives the port type, and `-p` gives the protocol, either tcp or udp, followed by the port number. The change is stored in the local policy and survives reboots, so you do it once. Ranges work too, such as `8100-8110`. To check what you have added yourself, `semanage port -l -C` lists only local customizations, which is a quick way to confirm your change was saved.",
   "Sometimes the port already belongs to another type. If the number is already assigned, for example 8080 to `http_cache_port_t`, then `-a` fails with an error saying the port is already defined. In that case use `-m` to modify the existing mapping to your new type, with the same options: `semanage port -m -t http_port_t -p tcp 8080`. To remove a mapping you added, use `-d` with the type, protocol and port. You cannot delete port definitions that are built into the policy, only your own local additions.",
   "A typical exam task needs three separate changes. Suppose the web server must serve content on port 82. First set `Listen 82` in the Apache configuration, such as `/etc/httpd/conf/httpd.conf`. Second, add the SELinux port label with `semanage port -a -t http_port_t -p tcp 82`. Third, open the firewall with `firewall-cmd --permanent --add-port=82/tcp` followed by `firewall-cmd --reload`. Then run `systemctl restart httpd` and test with `curl serverb:82` from another host. Missing any one of the three changes fails the task, and each failure looks different: a bad config fails the syntax check, a missing label fails the service start, and a missing firewall rule lets local tests pass while remote clients time out.",
   "The same pattern applies to other services. SSH on a non-standard port needs `ssh_port_t` added for that port, plus the `Port` lines in an sshd drop-in file and a firewall rule. Other daemons have their own port types, and grepping `semanage port -l` for the service name is the fastest way to find them. The order of operations is flexible, but adding the SELinux label before restarting the service saves you a failed start. After the restart, `ss -tlnp` confirms which process is listening on which port, so you can prove the service really bound to the new number.",
   "Recognizing the symptom saves a lot of time. When a service fails to start after a port change, `systemctl status` and `journalctl -u` typically show a bind error such as permission denied. The audit log then holds an AVC (access vector cache) denial with the permission `name_bind` and a target class of `tcp_socket` or `udp_socket`, which points straight at a missing port label. You can find it quickly with `ausearch -m AVC -ts recent`. Once you see `name_bind`, you know the fix is `semanage port`, not a file label or a boolean."
  ],
  "analogy": "Port types are like reserved parking spaces painted in each company's color. The web server may park only in spaces painted web color, and port 82 starts out unpainted, so the attendant turns it away. semanage port -a paints the space, and -m repaints a space already painted for another company. The analogy has a limit: painting the space does not open the garage gate, which is the separate firewall rule that remote clients also need.",
  "mnemonic": "Moving a service to a new port needs three Ls: Listen (the service config), Label (semanage port), Let in (the firewall rule).",
  "terms": [
   [
    "Port type",
    "An SELinux label on a network port, such as http_port_t or ssh_port_t, that controls which process types may use it."
   ],
   [
    "name_bind",
    "The permission a process needs to listen on a port; denials of it indicate a missing port label."
   ],
   [
    "semanage port -a",
    "Adds a port number and protocol to an SELinux port type."
   ],
   [
    "semanage port -m",
    "Modifies a port that is already defined with another type."
   ],
   [
    "semanage port -l -C",
    "Lists only locally added or changed port mappings."
   ],
   [
    "http_cache_port_t",
    "The port type that includes 8080 by default, which is why adding 8080 to http_port_t needs -m."
   ]
  ],
  "example": "SSH must also listen on port 2222. You add Port 22 and Port 2222 to a drop-in in /etc/ssh/sshd_config.d/, run semanage port -a -t ssh_port_t -p tcp 2222, open 2222/tcp in firewalld permanently, reload, and restart sshd. ss -tlnp shows sshd listening on both ports.",
  "mistakes": [
   [
    "Opening the firewall port and assuming the service can now listen there.",
    "The firewall controls incoming traffic, not which ports a service may bind. The service also needs the SELinux port label, or it fails to start."
   ],
   [
    "Using -a for a port that already has another type, such as 8080.",
    "-a fails with already defined. Use semanage port -m to change the existing mapping."
   ],
   [
    "Fixing a name_bind denial with restorecon or a file context rule.",
    "name_bind is about a port, not a file. The fix is semanage port with the right type and protocol."
   ],
   [
    "Forgetting -p or picking the wrong protocol.",
    "Port labels are per protocol. A web server needs tcp; adding udp 82 would not help it bind on TCP port 82."
   ]
  ],
  "tryit": [
   [
    "A monitoring agent's web interface must listen on TCP 8888. After changing its config to port 8888 and restarting, the service fails, and ausearch shows a name_bind denial for httpd_t on port 8888. semanage port -l | grep 8888 returns nothing. What do you run?",
    "Because 8888 is not defined for any type, add it with semanage port -a -t http_port_t -p tcp 8888, then restart the service and open 8888/tcp permanently in firewalld for remote clients. If the grep had shown 8888 under another type, you would use -m instead of -a."
   ]
  ],
  "tip": "A service moved to a non-standard port needs three things: its own config, an SELinux port label, and a firewall rule. If the port already has another type, use -m instead of -a.",
  "check": [
   [
    "How do you check which ports the web server may bind to?",
    "semanage port -l | grep http_port_t (use grep -w to avoid similar types)."
   ],
   [
    "semanage port -a reports the port is already defined. What now?",
    "Use semanage port -m with the same options to change its type."
   ],
   [
    "httpd fails to start after changing Listen to 8888. Which SELinux permission is likely denied?",
    "name_bind on port 8888, because it is not labeled http_port_t."
   ],
   [
    "Is 8080 labeled http_port_t by default?",
    "No; it is labeled http_cache_port_t, so moving it to http_port_t requires semanage port -m."
   ]
  ]
 },
 {
  "t": "Using SELinux booleans (getsebool -a, setsebool -P, semanage boolean -l)",
  "hook": "The physics department at Alder Ridge University wants every faculty member to publish a personal page from `~/public_html`, the classic tilde-style address. Lena enabled the Apache user directory module, fixed the folder permissions, and still gets 403 Forbidden for every professor. The audit log shows SELinux denying the web server access to home directories, which is exactly what SELinux is supposed to do on most servers. Here, though, the department has decided it wants that behavior. Lena does not want to write custom policy or disable anything. She just wants to flip one deliberate, documented switch. Better still, it has to stay flipped after Thursday's patch reboot. Does SELinux have such a switch, and how do you find the right one among hundreds?",
  "simple": "SELinux (Security-Enhanced Linux) has a strict rulebook for each service. Some behaviors are safe on some servers but risky on others, like letting the web server read files in people's home folders. Instead of making everyone rewrite the rules, SELinux includes ready-made on/off switches called booleans for these optional behaviors. You look up the switch you need, read what it does, and turn it on. The catch is that a switch flipped the quick way resets when the computer restarts, so you add `-P` to make it permanent. It is like the settings on a new phone: features such as location sharing come off by default, and you turn on only the ones you actually want.",
  "body": [
   "Booleans let you adjust policy without writing policy. SELinux (Security-Enhanced Linux) policy covers many ways a service might reasonably be used, but not all of them are safe to allow on every system. Booleans are on/off switches built into the policy for optional behavior, such as letting the web server serve users' home directories, letting it make outbound network connections, or letting an FTP (File Transfer Protocol) server write to certain directories. You flip a boolean instead of writing new rules, and every boolean has a default value chosen to be safe for a typical system.",
   "You can list booleans in two ways. `getsebool -a` prints every boolean and its current value, one per line, such as `httpd_enable_homedirs --> off`. The list is long, so filter it with grep, as in `getsebool -a | grep httpd`. `getsebool httpd_enable_homedirs` shows just one. `semanage boolean -l` gives more information: the current value, the default value and a short description of what the boolean allows. The descriptions are what make it useful when you do not know a boolean's name, because you can grep for a word like home, nfs or network.",
   "```bash\ngetsebool -a | grep httpd\nsemanage boolean -l | grep -i home\n# httpd_enable_homedirs  (off , off)  Allow httpd to read home directories\nsetsebool -P httpd_enable_homedirs on\ngetsebool httpd_enable_homedirs\n```",
   "Changing a boolean has a temporary and a permanent form. `setsebool name on` changes the value immediately, but only until the next reboot. `setsebool -P name on` changes it and also writes it to the policy on disk so it persists. Without `-P` the change looks successful, `getsebool` confirms it, and everything works, until the reboot quietly reverts it and the task fails. So use `-P` whenever a change must last, which on the exam is nearly always. With `-P`, the command can take several seconds while the policy is rebuilt, so be patient rather than interrupting it. You can also write `1` and `0` or `true` and `false` instead of on and off.",
   "Reading the value pair in `semanage boolean -l` tells you a lot. The two words in parentheses are (current, default). If a line reads (off , off), the boolean has never been changed. If it reads (on , off), someone switched it on, but this alone does not tell you whether it was done persistently. To see only booleans whose persistent value was changed locally, use `semanage boolean -l -C`. That is the best way to confirm your `setsebool -P` worked, and also a quick audit of what previous administrators changed on an inherited server.",
   "A handful of booleans appear again and again. `httpd_enable_homedirs` lets the web server read users' home directories for personal web pages. `httpd_can_network_connect` lets web applications open outbound network connections, and `httpd_can_network_connect_db` limits that to database ports. `httpd_use_nfs` allows web content stored on NFS (Network File System), and `use_nfs_home_dirs` supports NFS-mounted home directories for logins. Most booleans start with the name of the service they affect, which makes `getsebool -a | grep servicename` an efficient first search. Note the difference between the two web networking booleans: the database one is the narrower choice when an application only needs to reach a database server, so prefer it when it is enough.",
   "Let the logs point you to the boolean. When a denial could be fixed with a boolean, the setroubleshoot tools report it: `sealert` explanations include a suggestion naming the boolean and the exact `setsebool -P` command to run. This is often the fastest way to discover the boolean you need, especially for services you rarely configure. Read the suggestion and the boolean's description before applying it, because sealert may list several possible fixes ranked by likelihood.",
   "Turn on only what the task needs. Each boolean widens what a service can do, so turning one on is a small, deliberate reduction in protection. It is still far better than switching SELinux to permissive or disabling it, because everything else stays confined. Also remember that a boolean is rarely the only change. Serving home directories, for example, also requires the Apache user directory configuration, directory permissions that let the server traverse into the home directory, and the correct file labels on `~/public_html`. If a boolean is on and access still fails, look for the next missing piece rather than turning on more booleans."
  ],
  "analogy": "SELinux booleans are like the privacy toggles on a new phone. The manufacturer ships with sensitive features off, and you switch on only the ones you need, such as letting a maps app use your location. A toggle flipped with setsebool alone is like a setting that resets every time the phone restarts; -P saves it. The comparison has a limit: one toggle rarely finishes the job, because the service may also need correct labels and permissions.",
  "terms": [
   [
    "SELinux boolean",
    "A policy switch that turns an optional set of permissions on or off without writing new policy."
   ],
   [
    "getsebool -a",
    "Lists all booleans and their current values."
   ],
   [
    "setsebool -P",
    "Sets a boolean and makes the change persistent across reboots."
   ],
   [
    "semanage boolean -l",
    "Lists booleans with current value, default value and description."
   ],
   [
    "semanage boolean -l -C",
    "Lists only booleans whose persistent value has been changed locally."
   ],
   [
    "httpd_enable_homedirs",
    "A boolean that allows the Apache web server to read content in users' home directories."
   ]
  ],
  "example": "Users' personal web pages under ~/public_html return 403 errors. semanage boolean -l | grep homedirs shows httpd_enable_homedirs is off. You run setsebool -P httpd_enable_homedirs on, fix the directory permissions and labels, and the pages load, including after a reboot.",
  "mistakes": [
   [
    "Running setsebool without -P and treating the task as finished.",
    "Without -P the value reverts at reboot. Use setsebool -P and confirm with semanage boolean -l -C."
   ],
   [
    "Reading (on , off) as the boolean being off.",
    "The pair is (current, default). (on , off) means it is currently on and its default is off."
   ],
   [
    "Turning on several broad booleans until something works.",
    "Each boolean reduces protection. Read the descriptions or sealert's suggestion and enable only the one the task needs."
   ],
   [
    "Assuming a boolean alone fixes the problem.",
    "Many tasks also need correct file labels, permissions or service configuration. A boolean grants one optional behavior, nothing more."
   ]
  ],
  "tryit": [
   [
    "A PHP web application on servera must connect to a database server on another host. The app logs a connection refused error, and ausearch shows httpd_t denied name_connect to the database port. The security team wants the narrowest possible change. Which boolean do you choose and how do you set it?",
    "Use httpd_can_network_connect_db, which allows connections to database ports only, rather than the broader httpd_can_network_connect. Run setsebool -P httpd_can_network_connect_db on, then confirm with getsebool and semanage boolean -l -C, and retest the application."
   ]
  ],
  "tip": "setsebool without -P is lost at reboot. When a task asks for a persistent change, check afterwards with semanage boolean -l -C, which lists only locally changed booleans.",
  "check": [
   [
    "What does -P add to setsebool?",
    "It makes the change persistent across reboots by writing it into the policy."
   ],
   [
    "How can you find a boolean when you do not know its name?",
    "semanage boolean -l | grep a keyword, which searches names and descriptions."
   ],
   [
    "In semanage boolean -l output, what does (on , off) mean?",
    "The boolean is currently on and its default is off."
   ],
   [
    "Which boolean lets Apache serve pages from users' home directories?",
    "httpd_enable_homedirs."
   ]
  ]
 },
 {
  "t": "Diagnosing routine SELinux denials: /var/log/audit/audit.log, ausearch -m AVC, sealert",
  "hook": "It is 2 a.m. and your phone buzzes: the intranet at Riverside Water Authority is down after an evening content migration. Tomas, the on-call engineer before you, already tried the obvious things. Apache is running, the files exist, the permissions look fine, and the only clue in the browser is 403 Forbidden. His last message in the ticket says he is tempted to just set SELinux to permissive and go to bed. You know that would get the site back and quietly remove a layer of protection from every service on the box. Somewhere on this server there is a precise record of exactly what was blocked and why. Where is it, how do you read it quickly, and how do you turn it into the one correct fix?",
  "simple": "When SELinux (Security-Enhanced Linux) blocks something, the program that was blocked usually gives a vague error like permission denied. But SELinux itself writes a detailed note in a log file every time it says no. Each note says which program tried to do what, to which file or port, and what tags they both had. Tools like `ausearch` find those notes quickly, and `sealert` translates them into plain language with a suggested fix. It is like a building's front desk log: a visitor only knows the door would not open, but the log says exactly which badge was refused at which door, so security can fix the right badge instead of propping every door open.",
  "body": [
   "Troubleshooting SELinux is a routine, not a guessing game. When SELinux (Security-Enhanced Linux) blocks something, the application usually reports only a vague error such as permission denied or 403 Forbidden, because it does not know why the kernel refused. The real explanation is in the audit log. The routine has four steps: confirm SELinux is involved, find the denial, work out which label, port or boolean is wrong, and fix that specific thing while SELinux stays enforcing.",
   "Denials are recorded by the audit daemon, auditd, in `/var/log/audit/audit.log` as AVC (access vector cache) messages. Each AVC record names the permission that was denied, such as `read`, `open`, `getattr`, `write` or `name_bind`. It names the process with its command (`comm`) and process ID, the source context of the process (`scontext`), the target with its name and context (`tcontext`), and the object class (`tclass`), such as file, dir or tcp_socket. Because auditd writes the log, it must be running; `systemctl status auditd` confirms that.",
   "```\ntype=AVC msg=audit(...): avc:  denied  { read } for  pid=2143\n  comm=\"httpd\" name=\"index.html\" dev=\"vda1\" ino=12345\n  scontext=system_u:system_r:httpd_t:s0\n  tcontext=unconfined_u:object_r:admin_home_t:s0 tclass=file\n```",
   "Read an AVC as a sentence. The record above says: the `httpd` process, running as type `httpd_t`, was denied read on a file named index.html that is labeled `admin_home_t`. Web servers are allowed to read `httpd_sys_content_t`, so the file label is wrong, probably because the file was moved with `mv` from root's home directory. The fix is `restorecon`, or a `semanage fcontext` rule followed by restorecon if the path is custom. Other patterns read just as clearly. A `name_bind` denial with `tclass=tcp_socket` points to a missing port label and `semanage port`. A denial for a legitimate but optional action, such as `name_connect` from a web server to a database, often points to a boolean.",
   "`ausearch` searches the audit log so you do not have to scroll through it. `ausearch -m AVC` selects AVC messages. Add `-ts recent` to see only the last ten minutes, or `-ts today` for today, and `-c httpd` to filter by command name. Adding `-i` interprets numeric values, such as user IDs and timestamps, into readable names. A good habit is to reproduce the failure, for example by reloading the web page, and immediately run `ausearch -m AVC -ts recent -i` so only fresh, relevant denials appear.",
   "`sealert` goes a step further and explains the denial for you. It comes from the setroubleshoot-server package. When that package is installed, the setroubleshoot service watches for denials and writes a one-line summary to the system journal beginning with SELinux is preventing, followed by a command to view details. `sealert -l id` prints the full explanation for that alert, including the likely causes ranked by confidence and the exact suggested commands, such as a `semanage fcontext`, `semanage port` or `setsebool -P` line. `sealert -a /var/log/audit/audit.log` analyzes the whole log at once, which is useful when you arrive after the fact.",
   "```bash\nausearch -m AVC -ts recent -i\njournalctl -t setroubleshoot --since '10 min ago'\nsealert -l 3e4f...   # id from the journal message\n```",
   "Finding the alert in the journal is quick. `journalctl -t setroubleshoot` shows messages from the setroubleshoot service, and `journalctl | grep sealert` finds the lines that contain the ready-made `sealert -l` command. Copy the ID from that line and run it. If sealert is not installed, ausearch and a careful read of the raw AVC are always enough, which is why understanding the record format matters more than memorizing tool output.",
   "Two cautions keep your diagnosis honest. First, if there is no AVC at all but you still suspect SELinux, you may briefly run `setenforce 0` and retry. If it then works, SELinux is involved, possibly through a dontaudit rule, which silently denies an access without logging it. Return to enforcing immediately with `setenforce 1` and look at labels, ports and booleans for the affected service. Second, read sealert's suggestions critically. Its last-resort advice to build a custom policy module with `audit2allow` is almost never the right answer for exam tasks, where the answer is a correct label, a port type or a boolean.",
   "The final check is to retest with SELinux enforcing. Once you have applied the fix, repeat the action that failed, run `ausearch -m AVC -ts recent` again to make sure no new denials appear, and confirm with `getenforce` that the system still reports Enforcing. That last step matters on the exam, where leaving SELinux permissive can cost you every SELinux-related task even if the service works."
  ],
  "analogy": "Reading an AVC is like reading a building access log. Each entry says which badge type (scontext) tried which door type (tcontext), what it tried to do (the permission), and that it was refused. If the door is labeled wrong, you relabel the door (restorecon). If a new door was never registered, you register it (semanage). If the badge needs an optional privilege, you grant that one privilege (a boolean). The analogy stops at silent refusals: dontaudit rules are doors that refuse without writing to the log.",
  "terms": [
   [
    "AVC denial",
    "An audit log record of an access blocked by SELinux, naming the permission, source context, target context and class."
   ],
   [
    "auditd",
    "The audit daemon that writes SELinux denials and other events to /var/log/audit/audit.log."
   ],
   [
    "ausearch",
    "Searches the audit log by message type, time and command; -m AVC selects SELinux denials and -i makes output readable."
   ],
   [
    "sealert",
    "A setroubleshoot tool that explains denials in plain language and suggests fixes."
   ],
   [
    "scontext and tcontext",
    "The source context of the process attempting access and the target context of the file, port or other object."
   ],
   [
    "dontaudit rule",
    "A policy rule that denies an access without logging it, so no AVC appears."
   ]
  ],
  "example": "Apache returns 403 for a new site under /srv/site. ausearch -m AVC -ts recent shows httpd_t denied read on files with tcontext default_t. sealert suggests semanage fcontext -a -t httpd_sys_content_t '/srv/site(/.*)?' followed by restorecon. You apply it, and the site loads with SELinux still enforcing.",
  "mistakes": [
   [
    "Setting SELinux to permissive as the fix once the problem is confirmed.",
    "Permissive is only a diagnostic step. Fix the label, port type or boolean and return to enforcing."
   ],
   [
    "Applying sealert's audit2allow suggestion to build a custom module.",
    "That is a last resort and almost never right for exam tasks. Look first for a wrong label, missing port type or boolean."
   ],
   [
    "Looking only at the scontext and ignoring the tcontext and tclass.",
    "The target context and class show what is wrong: a wrong file type means restorecon or fcontext, and tcp_socket with name_bind means semanage port."
   ],
   [
    "Concluding SELinux is not involved because no AVC appears.",
    "dontaudit rules deny silently. A brief permissive test can reveal SELinux involvement, after which you return to enforcing."
   ]
  ],
  "tryit": [
   [
    "After moving SSH to port 2022, sshd will not start. ausearch -m AVC -ts recent -i shows: denied { name_bind } for comm=sshd src=2022 scontext=system_u:system_r:sshd_t:s0 tclass=tcp_socket. What is the cause and the fix?",
    "The name_bind permission on a tcp_socket means port 2022 is not labeled for sshd. Run semanage port -a -t ssh_port_t -p tcp 2022 (or -m if the port is already defined), restart sshd, open 2022/tcp in the firewall, and confirm no new AVCs appear."
   ],
   [
    "A web app fails to reach a remote database. ausearch shows httpd_t denied name_connect to a tcp_socket on the database port. Files and ports on the web server are labeled correctly. Which kind of fix is likely?",
    "An optional behavior is being denied, so a boolean is the likely fix: setsebool -P httpd_can_network_connect_db on. sealert would usually name this boolean in its suggestions."
   ]
  ],
  "tip": "Read the tcontext of the denial: a wrong file type means restorecon or semanage fcontext, name_bind means semanage port, and an optional behavior means a boolean. Never leave SELinux permissive as the fix.",
  "check": [
   [
    "Which command shows SELinux denials from the last few minutes?",
    "ausearch -m AVC -ts recent."
   ],
   [
    "In an AVC message, what do scontext and tcontext represent?",
    "scontext is the context of the process attempting access; tcontext is the context of the target file, port or other object."
   ],
   [
    "No AVC appears, but switching to permissive makes the problem go away. What might explain that?",
    "A dontaudit rule is silently denying the access, so SELinux is still the cause even though nothing is logged."
   ],
   [
    "Which package provides sealert?",
    "setroubleshoot-server."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
