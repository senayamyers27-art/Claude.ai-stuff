/* Teacher edition for PCAP – Certified Associate Python Programmer (PCAP-31-03): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("pcap", [
 {
  "t": "Import variants: import, import as, from … import, from … import *, and what each puts in the namespace",
  "objectives": [
   "Students will be able to state exactly which names each of the four import forms adds to the importing namespace.",
   "Students will be able to predict when code fails with NameError because of an alias or a from import.",
   "Students will be able to apply the underscore and __all__ rules to determine what from module import * brings in.",
   "Students will be able to explain why a module's top-level code runs only once per process."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project two lines: import math as m and print(math.pi). Ask students to vote on whether it prints, then reveal the NameError and ask who can explain it."
   ],
   [
    15,
    "Teach",
    "Draw a namespace as a two-column table (name, object) on the whiteboard. Walk through import math, import math as m, from math import sqrt, pi, and from math import * one at a time, adding rows to the table. Finish with __all__, underscore names, and the run-once rule using sys.modules."
   ],
   [
    15,
    "Activity",
    "Run the Namespace Table card activity in pairs (see activity). Circulate and ask each pair to justify one row aloud."
   ],
   [
    5,
    "Discuss",
    "Bring the class together to discuss why star imports are discouraged and when an alias is worth it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If you write import math as m, how many new names appear in your program, and what are they?",
  "activity": {
   "title": "Namespace Table",
   "materials": "Printed cards, each with a short import snippet followed by one usage line; whiteboard or paper for a two-column name/object table; optional student laptops with a browser-based Python interpreter.",
   "steps": [
    "Give each pair a stack of eight cards. Each card shows one to three import lines and a final line such as print(sqrt(9)) or print(math.pi).",
    "For each card, pairs write the namespace table the imports produce, then mark the final line as Works or NameError.",
    "Include two cards about a module with __all__ and an _underscore helper so pairs must apply the star rules.",
    "Pairs that have laptops verify three cards in a browser Python interpreter and note any surprises.",
    "Each pair presents one card the class found tricky and explains the namespace table behind it."
   ]
  },
  "discussion": [
   "Why might a team ban from module import * in its style guide even though it saves typing?",
   "When is an alias like import numpy as np helpful, and when does it make code harder to read?"
  ],
  "exit": [
   [
    "Which names does from os import path, sep add to the namespace?",
    "Exactly path and sep; the name os is not defined."
   ],
   [
    "A module defines _secret and public, and no __all__. Which does from mod import * import?",
    "Only public, because names starting with an underscore are skipped when there is no __all__."
   ],
   [
    "A module prints Hello at top level. A program imports it twice. How many times does Hello print?",
    "Once, because the second import reuses the module object stored in sys.modules."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partly filled namespace table template with the name column started, and let them check each row against a single printed rule card listing the four import forms.",
   "Extend: Ask fast finishers to write a small module with __all__ that deliberately includes an underscore name, then predict and verify what a star import brings in and why."
  ]
 },
 {
  "t": "Qualifying names in nested modules and packages (package.subpackage.module.name)",
  "objectives": [
   "Students will be able to write the fully qualified dotted name of an object from a given directory tree.",
   "Students will be able to identify which single name each nested import form binds and how calls must then be written.",
   "Students will be able to explain why import package.module.function fails with ModuleNotFoundError.",
   "Students will be able to state which directory must be on sys.path for a nested package import to succeed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a folder tree on the projector and ask students to write the address of a function inside the deepest file, using dots."
   ],
   [
    15,
    "Teach",
    "Using the extra/good/best/sigma.py tree on the whiteboard, demonstrate the plain, aliased and from forms, writing beside each the name it binds and the call syntax it requires. Explain the rule that a plain import must end at a module and the sys.path requirement for the top folder."
   ],
   [
    15,
    "Activity",
    "Run the Address Match activity in small groups (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss which import form groups preferred for readability and why."
   ],
   [
    5,
    "Exit ticket",
    "Collect the three exit questions on paper."
   ]
  ],
  "warmup": "If a function lives in shop/billing/tax.py, how would you write its full address with dots, and which part is the module?",
  "activity": {
   "title": "Address Match",
   "materials": "Printed sheet with a three-level package tree; cards with import statements; cards with call lines; whiteboard.",
   "steps": [
    "Give each group the printed tree and two stacks of cards: import statements and call lines.",
    "Groups pair each import card with every call card that would work after it, and set aside call cards that would raise NameError.",
    "Include one import card that ends in a function name; groups must label it as ModuleNotFoundError and rewrite it correctly.",
    "Groups record on the whiteboard the single name each import binds.",
    "The teacher reviews the board, asking a different group to defend each answer."
   ]
  },
  "discussion": [
   "Why do you think Python binds only the top-level name for import a.b.c instead of binding c?",
   "In a large project, would you prefer aliases or from imports for deeply nested modules, and what are the trade-offs?"
  ],
  "exit": [
   [
    "After from shop.billing import tax, how do you call the function total() defined in tax.py?",
    "tax.total(), because only tax is bound."
   ],
   [
    "Why does import shop.billing.tax.total fail?",
    "The last part of a plain import must be a module or package, and total is a function, so Python raises ModuleNotFoundError."
   ],
   [
    "Which folder must be on sys.path to import shop.billing.tax?",
    "The folder that contains the top-level shop directory."
   ]
  ],
  "differentiation": [
   "Support: Provide a colored version of the tree where each level (package, subpackage, module, function) has its own color, and have students color the matching parts of each dotted name.",
   "Extend: Ask fast finishers to predict the order in which the __init__.py files run for import shop.billing.tax and then design a tree where an alias would make the code noticeably clearer."
  ]
 },
 {
  "t": "Dir() to list the names a module defines",
  "objectives": [
   "Students will be able to describe what dir() returns when called with a module, with another object, and with no argument.",
   "Students will be able to use dir() before and after an import to show which names the import added.",
   "Students will be able to explain why dir(math) raises NameError after from math import sqrt.",
   "Students will be able to distinguish the names returned by dir() from the objects retrieved with getattr()."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you had no documentation and no internet, how could you find out what functions a module offers? Collect ideas on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Live-demo dir() in a browser Python interpreter on the projector: dir(math), the underscore filter loop, dir() with no argument before and after import math as m, then dir('abc'). Point out the sort order and the fact that the results are strings."
   ],
   [
    15,
    "Activity",
    "Run the Scope Detective activity in pairs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss how dir() differs from help() and hasattr()."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If dir() returns a list, what do you think the items in that list are: functions, numbers or text?",
  "activity": {
   "title": "Scope Detective",
   "materials": "Student laptops with a browser-based Python interpreter, or printed transcripts of dir() output for groups without devices; worksheet.",
   "steps": [
    "Pairs open a fresh interpreter and record the output of dir() with no argument.",
    "They run, one at a time, import math, import random as r and from platform import system, recording dir() after each line and circling the new names.",
    "Pairs try dir(math), dir(r) and dir(platform) and write down which one fails and why.",
    "Pairs use the underscore filter loop to list only public names of random, then pick one name and retrieve it with getattr().",
    "Groups without devices complete the same steps from the printed transcripts."
   ]
  },
  "discussion": [
   "Why might seeing dozens of names appear after from math import * convince a developer to avoid star imports?",
   "When exploring an unfamiliar module, when would you reach for dir() and when for help()?"
  ],
  "exit": [
   [
    "What does dir() return when called with no argument at the top level of a script?",
    "A sorted list of strings naming the script's current global names."
   ],
   [
    "After import math as m, which call lists the math module's names: dir(math) or dir(m)?",
    "dir(m), because only m is bound."
   ],
   [
    "Is dir(math) a list of functions?",
    "No, it is a list of strings; use getattr() to get the object behind a name."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed before-and-after dir() transcript and ask them only to highlight the new names, building up to running it themselves.",
   "Extend: Ask fast finishers to write a short loop that uses dir() and getattr() to print only the names in math that are callable, and to explain the sort order of the output."
  ]
 },
 {
  "t": "Sys.path: where Python searches for modules and how to extend it at runtime",
  "objectives": [
   "Students will be able to describe the default order of entries in sys.path and the first-match rule.",
   "Students will be able to compare the effects of sys.path.append() and sys.path.insert(0, ...).",
   "Students will be able to diagnose module shadowing from an AttributeError message.",
   "Students will be able to explain why sys.path changes must precede the import and do not persist between runs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the error module 'random' has no attribute 'choice' and ask pairs to brainstorm how that could ever happen."
   ],
   [
    15,
    "Teach",
    "Print sys.path on the projector and annotate each entry. Draw the search as an arrow moving down the list and stopping at the first match. Show append versus insert(0), the timing rule, the non-persistence rule, and how shadowing produces the warm-up error."
   ],
   [
    15,
    "Activity",
    "Run the Search Path Relay activity (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss when changing sys.path in code is reasonable and when installing or restructuring the project is better."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Python says a module named random has no attribute choice. What might be different about this computer or folder?",
  "activity": {
   "title": "Search Path Relay",
   "materials": "Sticky notes, whiteboard, printed scenario cards describing folders, file names and sys.path lists.",
   "steps": [
    "Draw four boxes on the whiteboard in a column labeled script folder, PYTHONPATH folder, standard library and site-packages, and place sticky-note files in them, including a random.py in the script folder.",
    "Groups receive scenario cards, each with an import line and sometimes a sys.path change, and must say which file Python loads or whether it fails.",
    "A student from each group walks the import down the column, stopping at the first match, while the group explains.",
    "Introduce cards where the sys.path change comes after the import, and cards using append versus insert(0), and have groups predict the outcome.",
    "Finish with a card asking the group to fix the shadowing problem with the least risky change."
   ]
  },
  "discussion": [
   "Why do you think Python puts the script's own folder at the front of sys.path, and what risk does that create?",
   "If a change to sys.path is lost when the program ends, what are better long-term ways to make a shared module importable?"
  ],
  "exit": [
   [
    "Which call makes Python search /opt/libs before the standard library?",
    "sys.path.insert(0, '/opt/libs'), because the new entry becomes first."
   ],
   [
    "A script appends a folder to sys.path after it imports a module from that folder. What happens?",
    "The import fails with ModuleNotFoundError, because the folder was not on the path when the import ran."
   ],
   [
    "How do you fix a file named random.py that shadows the standard module?",
    "Rename the file and remove any stale compiled copy in __pycache__."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a simplified sys.path with only three entries and one file per folder, and have them trace the search step by step before adding the shadowing case.",
   "Extend: Ask fast finishers to explain what happens when a module is already in sys.modules and the path is changed, and to design a scenario where insert(0) causes a surprising shadowing bug."
  ]
 },
 {
  "t": "Math module: ceil(), floor(), trunc(), factorial(), hypot(), sqrt()",
  "objectives": [
   "Students will be able to predict the results of floor(), ceil() and trunc() for positive and negative floats.",
   "Students will be able to state the return types of the six functions and identify outputs such as 4 versus 4.0.",
   "Students will be able to identify inputs that make sqrt() and factorial() raise ValueError.",
   "Students will be able to choose the correct rounding function for a real-world requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: you have 13 eggs and boxes of 6; how many boxes? Then: what is -2.5 rounded down? Collect answers."
   ],
   [
    15,
    "Teach",
    "Draw a number line from -4 to 4 on the whiteboard. Mark 2.5 and -2.5 and show arrows for floor, ceil and trunc. Add a column for round() and explain round-half-to-even. Then cover factorial, sqrt and hypot, stressing float return values and ValueError cases."
   ],
   [
    15,
    "Activity",
    "Run the Number Line Walk activity (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss which rounding direction fits billing, packing and display tasks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you have 13 eggs and each box holds 6, how many boxes do you need, and which way did you round?",
  "activity": {
   "title": "Number Line Walk",
   "materials": "Masking tape or a whiteboard number line from -4 to 4, printed cards with function calls such as math.floor(-1.5), sticky notes.",
   "steps": [
    "Lay out or draw a number line with whole numbers marked.",
    "Each student draws a call card, stands at or points to the input value, then moves to the result, explaining the direction aloud.",
    "Mix in cards for sqrt, hypot and factorial; students write the result on a sticky note, including whether it is an int or a float.",
    "Add two cards that raise ValueError; students must hold up an error sign instead of a value.",
    "Finish with three word problems where groups pick the right function and justify it."
   ]
  },
  "discussion": [
   "Why might banker's rounding be preferred in financial reports?",
   "Where in everyday software would choosing floor instead of ceil cause a real problem?"
  ],
  "exit": [
   [
    "What are math.floor(-1.5), math.ceil(-1.5) and math.trunc(-1.5)?",
    "-2, -1 and -1."
   ],
   [
    "What does print(math.sqrt(9)) display?",
    "3.0, because sqrt always returns a float."
   ],
   [
    "Which call raises ValueError: math.factorial(-1) or math.hypot(-3, 4)?",
    "math.factorial(-1); hypot accepts negative sides and returns 5.0."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed number line on which they draw the arrow for each function before writing the answer, starting with positive values only.",
   "Extend: Ask fast finishers to explain why int() behaves like trunc() and to write a function that rounds halves away from zero using floor and ceil."
  ]
 },
 {
  "t": "Random module: random(), seed(), choice(), sample()",
  "objectives": [
   "Students will be able to describe the range of values random.random() can return.",
   "Students will be able to explain how seed() makes a sequence of random results reproducible.",
   "Students will be able to compare choice() and sample() in terms of replacement and error conditions.",
   "Students will be able to justify why the random module is unsuitable for security-sensitive values."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the class to each write a random number from 1 to 10, then tally them on the board and ask whether the result looks random."
   ],
   [
    15,
    "Teach",
    "Explain pseudo-random generation. Demonstrate random(), then seed() by running the same seeded block twice on the projector. Use a hat of paper slips to show choice() with replacement and sample() without replacement, and the ValueError case."
   ],
   [
    15,
    "Activity",
    "Run the Hat Draw Lab in small groups (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss when reproducibility is useful and when it is dangerous."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a computer follows exact instructions, how can it ever produce a random number?",
  "activity": {
   "title": "Hat Draw Lab",
   "materials": "Paper slips numbered 1 to 10 and a cup or envelope per group, worksheet, optional student laptops with a browser-based Python interpreter.",
   "steps": [
    "Each group performs five draws with replacement, returning the slip each time, and records any repeats; this models repeated choice().",
    "Groups then draw five slips without returning them; this models sample(population, 5).",
    "Groups try to draw 11 slips without replacement and note why it is impossible, linking it to ValueError.",
    "Groups with laptops run random.seed(5) followed by three random.choice calls twice and compare the outputs with another group using the same seed.",
    "Each group writes one sentence explaining why the seeded runs matched."
   ]
  },
  "discussion": [
   "Why might a game developer deliberately set a seed, and why would a raffle organizer avoid it?",
   "What could go wrong if someone could predict the next value from a random number generator used for login codes?"
  ],
  "exit": [
   [
    "Can random.random() return 1.0?",
    "No; it returns floats from 0.0 up to but not including 1.0."
   ],
   [
    "Which function guarantees 3 different items from a list of 10: three choice() calls or sample(lst, 3)?",
    "sample(lst, 3), because it picks without replacement."
   ],
   [
    "Two scripts both call random.seed(10) and then make identical calls. Will they print the same values?",
    "Yes, the same seed and the same calls produce the same sequence."
   ]
  ],
  "differentiation": [
   "Support: Pair struggling students with the physical slips first, and give them a two-column chart labeled with replacement and without replacement to map each function onto.",
   "Extend: Ask fast finishers to explain the difference between randint(1, 6) and randrange(1, 6) and to write a dice simulator that is reproducible only when a debug flag is set."
  ]
 },
 {
  "t": "Platform module: platform(), machine(), processor(), system(), version(), python_implementation(), python_version_tuple()",
  "objectives": [
   "Students will be able to classify each platform function as describing hardware, the operating system or Python.",
   "Students will be able to identify the return type of each function, including the tuple of strings from python_version_tuple().",
   "Students will be able to explain why platform.version() does not report the Python version.",
   "Students will be able to write a correct version comparison using values from python_version_tuple()."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students what three facts they would want in a bug report about a program crash, and list them on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Run each platform function on the projector in a browser Python interpreter or show prepared output. Sort them into three columns on the board: hardware, operating system, Python. Highlight the version() trap and the string tuple."
   ],
   [
    15,
    "Activity",
    "Run the Label Sort activity in pairs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss why programs sometimes need to know which operating system they run on."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a user says I have the latest version, what are three different things they might mean?",
  "activity": {
   "title": "Label Sort",
   "materials": "Printed cards with the seven function names and separate cards with sample outputs (for example Linux, x86_64, CPython, ('3', '12', '1'), an empty string, a long OS build string); three labeled areas on desks or the whiteboard.",
   "steps": [
    "Pairs sort the function cards into hardware, operating system and Python categories.",
    "Pairs match each sample output card to the function that could have produced it.",
    "Pairs mark which outputs are strings and which is a tuple of strings.",
    "Each pair writes a three-line startup summary for a bug report using the functions they think are most useful.",
    "The teacher reveals the matches and asks pairs to explain any card they placed differently."
   ]
  },
  "discussion": [
   "Why would a tool behave differently on Linux, Windows and Darwin?",
   "What problems can come from comparing version numbers as text?"
  ],
  "exit": [
   [
    "Which function returns Darwin on a Mac?",
    "platform.system()."
   ],
   [
    "What does platform.version() describe?",
    "The operating system's version, not Python's."
   ],
   [
    "Why must you convert parts of python_version_tuple() before comparing them?",
    "They are strings, and string comparison would give wrong results such as '10' < '9'."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card with each function, its category and an example output, and ask them to complete the matching task using the card.",
   "Extend: Ask fast finishers to write a function that returns True only on CPython 3.8 or newer, handling the string conversion correctly."
  ]
 },
 {
  "t": "__name__ and the if __name__ == \"__main__\" idiom",
  "objectives": [
   "Students will be able to state the value of __name__ when a file is run directly and when it is imported.",
   "Students will be able to predict the output of a two-file program that uses the main guard.",
   "Students will be able to explain why test or demo code belongs under the main guard.",
   "Students will be able to identify syntax errors in incorrectly written versions of the idiom."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a module with a print at the bottom and ask what should happen if another program imports it."
   ],
   [
    15,
    "Teach",
    "On the projector, demonstrate tools.py being run directly and imported, printing __name__ each time. Write the two values on the board. Introduce the guard, then show common misspellings and why each fails."
   ],
   [
    15,
    "Activity",
    "Run the Who Is Main role-play (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss what kinds of code belong at the top level and what belongs under the guard."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a classmate imports your file just to use one function, should your test prints appear on their screen?",
  "activity": {
   "title": "Who Is Main",
   "materials": "Printed role cards for three modules (main.py, utils.py, report.py), each listing top-level lines and guarded lines; name tags; whiteboard.",
   "steps": [
    "Three volunteers each hold one module card; the teacher announces which file is run directly, and that student wears a name tag reading __main__.",
    "The other students wear name tags with their module names.",
    "The main student reads lines aloud in order; when a line imports another module, that student reads their top-level lines, skipping guarded lines because their tag is not __main__.",
    "The class records the output on the whiteboard, then repeats the role-play with a different file run directly.",
    "Pairs compare both runs and write one sentence explaining the difference."
   ]
  },
  "discussion": [
   "Why is it useful for one file to work as both a library and a runnable script?",
   "What could go wrong if a module did slow work, such as reading a large file, at top level without a guard?"
  ],
  "exit": [
   [
    "Inside helpers.py, what is __name__ when another script imports it?",
    "'helpers'."
   ],
   [
    "Why is if __name__ = '__main__': wrong?",
    "It uses assignment instead of comparison, which is a syntax error; it must use ==."
   ],
   [
    "A module has print('X') at top level and print('Y') under the guard. What prints when you run it directly?",
    "X then Y."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students printed code where top-level lines and guarded lines are highlighted in different colors, and ask them to predict output for imported and run-directly cases.",
   "Extend: Ask fast finishers to design a three-module chain and predict the output when each module in turn is run directly."
  ]
 },
 {
  "t": "__pycache__ and compiled .pyc files",
  "objectives": [
   "Students will be able to explain what bytecode is and why CPython caches it in .pyc files.",
   "Students will be able to predict which files appear in __pycache__ after running a program.",
   "Students will be able to describe how Python detects a stale .pyc and recompiles it.",
   "Students will be able to correct common misconceptions about speed and secrecy of .pyc files."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a screenshot or drawing of a project folder containing __pycache__ and ask students to guess what it is and who made it."
   ],
   [
    15,
    "Teach",
    "Draw the pipeline source to compile to bytecode to execute on the whiteboard. Explain caching for imported modules, the version tag in the file name, the staleness check, and why the main script is not cached. Close with the speed and secrecy misconceptions."
   ],
   [
    15,
    "Activity",
    "Run the Cache Prediction activity in pairs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss whether __pycache__ belongs in version control and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A folder called __pycache__ appeared after you ran your program. Did you create it? What do you think is inside?",
  "activity": {
   "title": "Cache Prediction",
   "materials": "Printed project scenarios showing file trees and import relationships, blank tree templates, sticky notes; optional projector to show a real run.",
   "steps": [
    "Pairs receive four scenarios, each describing which file is run and which modules import which.",
    "For each scenario, pairs draw the __pycache__ folder they expect after the first run, using sticky notes for .pyc files.",
    "For two scenarios, the card adds an event such as editing one module or running with a second Python version; pairs update their prediction.",
    "One scenario has a read-only folder; pairs must state what happens to the program.",
    "The teacher reveals the answers and pairs score their predictions, discussing any disagreements."
   ]
  },
  "discussion": [
   "Why might a team add __pycache__ to its ignore list instead of committing it?",
   "If .pyc files only speed up startup, in what kinds of programs would that benefit be most noticeable?"
  ],
  "exit": [
   [
    "After running main.py, which imports data.py, which file has a .pyc in __pycache__?",
    "Only data.py; the main script is not cached."
   ],
   [
    "Do .pyc files make a long-running loop execute faster?",
    "No, they only save the compile step when a module is imported."
   ],
   [
    "What does Python do when the source is newer than its cached .pyc?",
    "It recompiles the source and rewrites the .pyc."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a single simple scenario with two files and a labeled diagram of the compile pipeline, then add one import at a time.",
   "Extend: Ask fast finishers to research what the dis module shows for a small function and explain how that relates to why .pyc files are not secret."
  ]
 },
 {
  "t": "Package layout: directories, __init__.py, nested packages and private (_name) module variables",
  "objectives": [
   "Students will be able to describe the role of __init__.py and when it runs.",
   "Students will be able to determine the order in which __init__.py files run for a nested import.",
   "Students will be able to explain the exact effect of a leading underscore on module names.",
   "Students will be able to design a simple package layout for a given set of modules."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a list of ten loose file names from an imaginary project and ask how students would organize them into folders."
   ],
   [
    15,
    "Teach",
    "Draw the shop package tree on the whiteboard. Explain __init__.py as marker and setup code, the outside-in run order and run-once rule, and the sys.path requirement. Then demonstrate the counter.py example and the underscore rule, including the __all__ override."
   ],
   [
    15,
    "Activity",
    "Run the Package Architect activity in small groups (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss why Python relies on conventions instead of enforced privacy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you had forty Python files in one folder, how would you group them so a new teammate could find things?",
  "activity": {
   "title": "Package Architect",
   "materials": "Sticky notes in two colors, large paper or whiteboard space, printed list of module names and short descriptions.",
   "steps": [
    "Each group receives a list of about twelve module names for an imaginary clinic or store application.",
    "Groups design a package tree on paper, using one sticky color for directories and another for modules, and adding an __init__.py note in every package directory.",
    "Groups mark one module variable that should be internal and rename it with a leading underscore, then write the explicit import that could still reach it.",
    "Groups write the order in which __init__.py files would run for one deep import of their choice.",
    "Groups swap designs with another group, who checks the run order and the underscore usage."
   ]
  },
  "discussion": [
   "Is a naming convention enough to protect internal data, or would you want real enforcement? Why?",
   "What kinds of code belong in __init__.py, and what should stay in regular modules?"
  ],
  "exit": [
   [
    "For import a.b.c, in what order do the package initialization files run?",
    "a/__init__.py, then a/b/__init__.py, then the module c."
   ],
   [
    "Does from tools import * import _cache when tools has no __all__?",
    "No; names starting with an underscore are skipped."
   ],
   [
    "How can code still read tools._cache?",
    "With import tools followed by tools._cache, or from tools import _cache."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed package tree with the directories already drawn, and ask students to place the modules and __init__.py files.",
   "Extend: Ask fast finishers to write an __init__.py that re-exports one function from an inner module and sets __all__, and to explain what a star import of the package would bring in."
  ]
 },
 {
  "t": "Try/except, multiple except branches and the order they are checked",
  "objectives": [
   "Students will be able to trace the flow of a try statement with multiple except branches for a given input.",
   "Students will be able to explain why a superclass branch placed before a subclass branch makes the subclass branch unreachable.",
   "Students will be able to describe how an unmatched exception propagates to enclosing try statements and callers.",
   "Students will be able to order except branches correctly from most specific to most general."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the int(input()) example and ask what happens for inputs 0, abc and 4 before any explanation."
   ],
   [
    15,
    "Teach",
    "Trace the example step by step on the projector. Draw a small exception hierarchy (Exception, ArithmeticError, ZeroDivisionError, LookupError, KeyError) on the whiteboard and show how matching uses it. Demonstrate the unreachable-branch bug, the bare except rule and propagation to a caller."
   ],
   [
    15,
    "Activity",
    "Run the Branch Sorting Bins activity (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss the risks of a catch-all except branch."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What do you think a program should do when a user types a word where a number is expected?",
  "activity": {
   "title": "Branch Sorting Bins",
   "materials": "Printed exception cards (ZeroDivisionError, ValueError, KeyError, IndexError, TypeError), printed except-branch strips with class names, a small hierarchy chart, tape or whiteboard.",
   "steps": [
    "Groups receive a set of except-branch strips and arrange them in a column to form one try statement.",
    "The teacher draws an exception card; each group walks it down their column and names the branch that catches it, or says it propagates.",
    "Groups discover any branch that can never run and explain why using the hierarchy chart.",
    "Groups reorder their strips so every branch is reachable and the bare except, if present, is last.",
    "Groups present their final order and justify one placement."
   ]
  },
  "discussion": [
   "When is it better to let an exception propagate to the caller instead of handling it immediately?",
   "Why might a catch-all except branch make debugging harder?"
  ],
  "exit": [
   [
    "For int('x') inside a try with except TypeError then except ValueError, which branch runs?",
    "The ValueError branch, because int('x') raises ValueError and TypeError does not match."
   ],
   [
    "Why is except Exception followed by except KeyError a problem?",
    "KeyError is a subclass of Exception, so the first branch always catches it and the second never runs."
   ],
   [
    "If no except branch matches, what happens?",
    "The exception propagates outward to an enclosing try or the caller, and ends the program with a traceback if never handled."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a simplified hierarchy chart with only four classes and have them trace one exception at a time with a finger down the branch list.",
   "Extend: Ask fast finishers to write a two-function program where an exception raised in the inner function is handled in the outer one, and to predict the output before running it."
  ]
 },
 {
  "t": "Catching several exceptions in one branch: except (E1, E2)",
  "objectives": [
   "Students will be able to write a single except branch that handles several exception classes using a tuple.",
   "Students will be able to identify the comma-without-parentheses form as the incorrect distractor.",
   "Students will be able to use the as binding to report which exception was caught.",
   "Students will be able to predict which branch runs when tuple branches and single-class branches are combined."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a try statement with two identical except branches and ask students how they would shorten it."
   ],
   [
    15,
    "Teach",
    "Rewrite the warm-up example with a tuple on the projector. Trace the ratio() function for three inputs. Show the incorrect comma form, the as binding with type(e).__name__, and a combined example with a single-class branch above a tuple branch."
   ],
   [
    15,
    "Activity",
    "Run the Refactor and Predict activity in pairs (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss when grouping exceptions is wise and when separate branches are better."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Two except branches in this code do exactly the same thing. What would you change, and why does duplication matter?",
  "activity": {
   "title": "Refactor and Predict",
   "materials": "Printed code snippets with duplicated except branches, printed exception cards, student laptops with a browser-based Python interpreter if available, pens.",
   "steps": [
    "Pairs receive three snippets with duplicated handlers and rewrite each using a single tuple branch.",
    "Pairs add an as e binding to one snippet and write the line that prints the class name of the caught exception.",
    "The teacher displays four mixed try statements combining tuple and single-class branches; pairs draw exception cards and predict which branch runs.",
    "Pairs spot the one snippet that uses except A, B: and correct it.",
    "If laptops are available, pairs run their rewrites to confirm behavior and report any surprises to the class."
   ]
  },
  "discussion": [
   "What is the risk of catching a broad superclass instead of listing the exact exceptions you expect?",
   "How does recording which exception occurred help the people who maintain the data or the program?"
  ],
  "exit": [
   [
    "Write the except line that catches both KeyError and IndexError in one branch.",
    "except (KeyError, IndexError):"
   ],
   [
    "Inside except (ValueError, TypeError) as e:, how do you get the name of the exception class?",
    "type(e).__name__"
   ],
   [
    "A try has except (ArithmeticError, KeyError) above except ZeroDivisionError. Which runs for 1/0?",
    "The tuple branch, because ZeroDivisionError is a subclass of ArithmeticError and that branch is checked first."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a fill-in-the-blank template for the tuple syntax and the as binding, and start with snippets that raise only the two listed classes.",
   "Extend: Ask fast finishers to design a try statement where a tuple branch makes a later branch unreachable, then fix it, explaining each step."
  ]
 },
 {
  "t": "Except … as e and the args attribute",
  "objectives": [
   "Students will be able to bind a caught exception to a name with except ... as and explain what the name refers to.",
   "Students will be able to predict the output of print(e) and print(e.args) for exceptions raised with zero, one and several arguments.",
   "Students will be able to explain why the as name is deleted after the except branch and work around it correctly.",
   "Students will be able to write a handler that logs type(e).__name__ and e.args without stopping the program."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a log line that says only 'Something went wrong'. Ask pairs what information they would want instead, and collect answers on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Live-code except ValueError as e with int('abc'). Print e, e.args and type(e).__name__. Then raise exceptions with zero, one and two arguments and have the class call out the output before you run it."
   ],
   [
    15,
    "Activity",
    "Run the 'Predict the print' card game in pairs (see activity). Circulate and ask pairs to justify each prediction in terms of args."
   ],
   [
    5,
    "Discuss",
    "Show a snippet that uses e after the try statement. Ask why it fails and how to fix it. Connect to memory and tracebacks briefly."
   ],
   [
    8,
    "Exit ticket",
    "Students answer the three exit questions on paper or in a browser form; review answers aloud for the last two minutes."
   ]
  ],
  "warmup": "Your overnight job failed and the log only says 'error'. What three facts about the failure would you want the log to contain, and where in the code could those facts come from?",
  "activity": {
   "title": "Predict the print",
   "materials": "Printed cards (one snippet per card), sticky notes, student laptops with a browser-based Python interpreter, whiteboard.",
   "steps": [
    "Prepare 10 cards, each with a short try/except snippet that raises an exception with zero, one or several arguments and prints e, e.args, e.args[i] or str(e).",
    "Pairs draw a card, write their predicted output on a sticky note, and stick it on the card.",
    "Pairs then run the snippet in a browser Python interpreter and mark the prediction correct or wrong.",
    "For each wrong prediction, the pair writes one sentence on the sticky note explaining the rule they missed (for example, trailing comma in a one-element tuple).",
    "Collect the three most common mistakes on the whiteboard and resolve them together."
   ]
  },
  "discussion": [
   "Why might Python's designers have chosen to delete the as name automatically instead of leaving it for the programmer to clean up?",
   "When is it better to store data in args as separate items instead of formatting it all into one message string?"
  ],
  "exit": [
   [
    "What does print(e.args) show for raise ValueError('bad')?",
    "('bad',), a one-element tuple with a trailing comma."
   ],
   [
    "What does print(e) show for raise Exception('a', 'b')?",
    "('a', 'b'), the string form of the whole args tuple, because there is more than one argument."
   ],
   [
    "You need the caught exception after the try statement. What do you do?",
    "Assign it to another variable inside the except branch, such as saved = e, because e is deleted when the branch ends."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-row table (zero, one, two arguments) with columns for args and str(e), and have them fill it in by running code before attempting the cards.",
   "Extend: Ask fast finishers to write a small log_error(err) function that writes the class name, args and a timestamp, and to explain how KeyError's message differs when printed."
  ]
 },
 {
  "t": "Else and finally branches and when each runs",
  "objectives": [
   "Students will be able to state when the else branch and the finally branch of a try statement run.",
   "Students will be able to trace code with try, except, else and finally and predict its exact output, including unhandled exceptions and early returns.",
   "Students will be able to place success-only code and clean-up code in the correct branches of a try statement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the library connection leak. Let pairs suggest where the close should go."
   ],
   [
    12,
    "Teach",
    "Draw the four branches as boxes on the whiteboard. Trace test(2), test(0) and test('two') live, writing the printed letters under each call. Then trace a function that returns from try with a finally that prints."
   ],
   [
    15,
    "Activity",
    "Run the 'Branch path' card sort (see activity)."
   ],
   [
    6,
    "Discuss",
    "Ask why code that only runs on success belongs in else instead of at the end of try. Briefly show return inside finally and why to avoid it."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually, then compare with a neighbor."
   ]
  ],
  "warmup": "A script closes its database connection on the last line of the try block. What happens to that connection if an exception is raised halfway through the block?",
  "activity": {
   "title": "Branch path card sort",
   "materials": "Printed scenario cards, printed branch cards labeled try, except, else, finally and 'propagates', whiteboard, student laptops with a browser-based Python interpreter for checking.",
   "steps": [
    "Give each group of three a set of 8 scenario cards (for example: no error; handled ZeroDivisionError; unhandled TypeError; return inside try; break inside try in a loop).",
    "For each scenario, the group lays out the branch cards in the order they execute, leaving out branches that do not run.",
    "Groups check two of their sequences by running small functions in a browser Python interpreter.",
    "Each group presents one scenario they found surprising and explains the rule.",
    "Finish by writing the rule summary on the whiteboard: else on no exception, finally always."
   ]
  },
  "discussion": [
   "Why is it safer to keep the try block small and move follow-up work into else?",
   "Python allows return inside finally even though it can hide an exception. Should languages allow features that are usually a mistake? Why or why not?"
  ],
  "exit": [
   [
    "In test(x) from the lesson, what is printed by test(0)?",
    "A B D, because except handles the ZeroDivisionError, else is skipped and finally runs."
   ],
   [
    "Where should code go that must run only if no exception occurred?",
    "In the else branch, after all except branches."
   ],
   [
    "A try block raises an exception no except branch matches. Does finally run?",
    "Yes. finally runs, then the exception continues to propagate."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart template with the four branches and arrows labeled 'no error', 'handled error', 'unhandled error' so students can trace by following arrows.",
   "Extend: Ask fast finishers to predict and then test what happens when both try and finally contain return statements, and when finally returns while an exception is propagating."
  ]
 },
 {
  "t": "The built-in exception hierarchy: BaseException, Exception, ArithmeticError, LookupError, and their subclasses",
  "objectives": [
   "Students will be able to sketch the main branches of the built-in exception hierarchy from BaseException down to common leaf classes.",
   "Students will be able to identify the parent class of ZeroDivisionError, IndexError, KeyError and ModuleNotFoundError.",
   "Students will be able to predict which except branch catches a given exception, including unreachable branches caused by ordering.",
   "Students will be able to verify class relationships with issubclass() and __bases__."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show three snippets that raise KeyError, IndexError and ZeroDivisionError. Ask students to name each error before running it."
   ],
   [
    12,
    "Teach",
    "Build the tree on the whiteboard from the top down, explaining BaseException, Exception, ArithmeticError and LookupError. Demonstrate issubclass and __bases__ in a projected interpreter."
   ],
   [
    15,
    "Activity",
    "Groups build a physical exception tree from cards (see activity), then test it."
   ],
   [
    6,
    "Discuss",
    "Show a try statement with except LookupError above except KeyError. Ask which branch runs and why the second is unreachable."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you wrote except Exception around your whole program, which events do you think it would still let through, and why might that be a good thing?",
  "activity": {
   "title": "Build the exception tree",
   "materials": "Printed cards with one exception class name each (about 20), tape or sticky putty, whiteboard or wall space, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Give each group a shuffled set of class-name cards, including BaseException, Exception, ArithmeticError, LookupError and their subclasses.",
    "Groups arrange the cards into a tree on the wall or a desk without notes.",
    "Groups verify five relationships of their choice with issubclass() or __bases__ in the browser interpreter and fix any mistakes.",
    "Each group writes two 'which branch catches it' questions on sticky notes for another group, based on their tree.",
    "Groups swap and answer questions, then the teacher resolves disputes at the whiteboard."
   ]
  },
  "discussion": [
   "Why might Python's designers have placed KeyboardInterrupt and SystemExit outside Exception?",
   "When is catching a parent class like LookupError better than catching the specific leaf, and when is it worse?"
  ],
  "exit": [
   [
    "What is the direct parent class of KeyError?",
    "LookupError."
   ],
   [
    "Does except ArithmeticError catch a ZeroDivisionError?",
    "Yes, because ZeroDivisionError is a subclass of ArithmeticError."
   ],
   [
    "A try has except Exception first and except ValueError second. A ValueError is raised. Which branch runs?",
    "The except Exception branch, because it matches first; the ValueError branch is unreachable."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially filled tree with only the four named parents in place, and have them add the leaf classes.",
   "Extend: Ask fast finishers to print the __mro__ of three classes and explain why object appears at the end, then find where UnicodeError sits."
  ]
 },
 {
  "t": "Raise, raise with an instance, and a bare raise to re-raise",
  "objectives": [
   "Students will be able to raise an exception using a class and using an instance with arguments, and state the resulting args.",
   "Students will be able to explain what a bare raise does inside an except branch and what happens when it is used outside one.",
   "Students will be able to decide when a function should raise an exception instead of returning a special value."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about returning None versus raising an error. Collect quick answers."
   ],
   [
    12,
    "Teach",
    "Live-code set_age with raise ValueError('...', age). Show raise ValueError versus raise ValueError(), then a handler that logs and uses a bare raise. Finish by running a bare raise outside a handler to show the RuntimeError."
   ],
   [
    15,
    "Activity",
    "Run the 'Whistle and relay' role-play (see activity)."
   ],
   [
    6,
    "Discuss",
    "Discuss when to translate an exception into a different one, and show what a chained traceback looks like."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A function finds invalid input. Should it return None or raise an exception? List one advantage of each.",
  "activity": {
   "title": "Whistle and relay role-play",
   "materials": "Printed role cards (main program, caller function, worker function, logger), index cards to act as exception objects, markers, whiteboard.",
   "steps": [
    "Groups of four take roles: main program, caller, worker and logger. Write a short call chain on the whiteboard (main calls caller, caller calls worker).",
    "The worker receives a bad input card, writes an exception class and message on an index card (the exception object), and passes it up.",
    "The caller's script says it catches only one class. If the card matches, it handles it; if not, it passes the card up unchanged. In one round the caller logs the card with the logger and passes it on with a bare raise.",
    "Groups run three rounds with different exceptions and write down the path each card took.",
    "The class compares paths and relates them to tracebacks, then writes the same chain as real Python and runs it in a browser interpreter."
   ]
  },
  "discussion": [
   "Why is an exception harder to ignore than a special return value like -1?",
   "When should a handler re-raise the original exception and when should it raise a new, more meaningful one?"
  ],
  "exit": [
   [
    "What is e.args after raise ValueError('bad', 7)?",
    "('bad', 7)."
   ],
   [
    "What does a bare raise do outside any except branch?",
    "It raises RuntimeError because there is no active exception to re-raise."
   ],
   [
    "Name one benefit of using a bare raise after logging inside a handler.",
    "The caller still receives the original exception with its traceback, so its own handling is unchanged."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank template for a validating function and a handler, with the raise statements missing, and let students complete and run it.",
   "Extend: Ask fast finishers to translate an OSError into a custom ConfigError using raise ... from, and to describe how the traceback changes compared with no from clause."
  ]
 },
 {
  "t": "Assert and AssertionError",
  "objectives": [
   "Students will be able to write assert statements with and without a message and predict when AssertionError is raised.",
   "Students will be able to explain why assert(cond, 'msg') with parentheses always passes.",
   "Students will be able to explain the effect of the -O option and justify using if and raise instead of assert for input validation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about tasting food in a kitchen and connect it to checking assumptions in code."
   ],
   [
    12,
    "Teach",
    "Live-code safe_sqrt with an assert and a message. Show assert with a falsy value, then the tuple trap with its SyntaxWarning. Explain -O and show the withdraw example with if and raise."
   ],
   [
    15,
    "Activity",
    "Run the 'Assert or raise' card sort (see activity)."
   ],
   [
    6,
    "Discuss",
    "Discuss the credit union scenario: what could go wrong if production used -O and the check was an assert."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A chef tastes every dish before it is served. On a very busy night, the chef stops tasting. Which kinds of checks would be fine to skip, and which must never be skipped?",
  "activity": {
   "title": "Assert or raise card sort",
   "materials": "Printed scenario cards (about 12), two labeled areas on a desk or whiteboard ('assert' and 'if + raise'), sticky notes, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Give pairs a set of scenario cards, such as 'user enters an age', 'internal helper always receives a sorted list', 'file must exist', 'a loop counter should never be negative'.",
    "Pairs place each card under 'assert' or 'if + raise' and write a one-line reason on a sticky note.",
    "Pairs write the actual line of code for two of their cards and run it in a browser interpreter, including one assert that fails.",
    "Pairs then examine three printed assert lines, one using the tuple form, and predict which can fail.",
    "The class reviews disputed cards together and agrees on the rule: assumptions about your own code versus problems from the outside world."
   ]
  },
  "discussion": [
   "If asserts can be turned off, why do developers still find them useful?",
   "What other kinds of checks, besides input validation, should never depend on assert?"
  ],
  "exit": [
   [
    "What does assert [], 'empty' do?",
    "Raises AssertionError with the message 'empty', because an empty list is false."
   ],
   [
    "Why does assert(x > 5, 'too small') never fail?",
    "It asserts a non-empty tuple, which is always true."
   ],
   [
    "What happens to assert statements when Python runs with -O?",
    "They are removed and never evaluated."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a truth-value cheat sheet (0, '', [], None are false) and have them predict a few simple asserts before the card sort.",
   "Extend: Ask fast finishers to refactor a function that uses assert for input checks into one that raises appropriate exceptions, and to write a short note explaining each change."
  ]
 },
 {
  "t": "Why except Exception does not catch KeyboardInterrupt or SystemExit",
  "objectives": [
   "Students will be able to locate KeyboardInterrupt, SystemExit and GeneratorExit in the exception hierarchy and explain why they are outside Exception.",
   "Students will be able to predict whether except Exception, a bare except, or except SystemExit catches a given stop event.",
   "Students will be able to design a loop that tolerates ordinary errors but can still be stopped with Ctrl+C."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a program that cannot be stopped. Take two or three answers."
   ],
   [
    10,
    "Teach",
    "Draw BaseException with Exception and the three stop events side by side. Run the sys.exit(3) example on the projector, then demonstrate a loop with except Exception and stop it with Ctrl+C."
   ],
   [
    15,
    "Activity",
    "Run the 'Who gets through' handler game (see activity)."
   ],
   [
    8,
    "Discuss",
    "Discuss when, if ever, it is acceptable to catch BaseException, and why a bare raise afterwards matters."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Have you ever had a program that would not stop when you pressed Ctrl+C? What do you think the program might have been doing with that key press?",
  "activity": {
   "title": "Who gets through",
   "materials": "Printed event cards (ValueError, KeyError, KeyboardInterrupt, SystemExit, ZeroDivisionError and others), printed handler cards (except Exception, bare except, except SystemExit, except LookupError), whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Students in groups of three: one holds the handler cards, one draws event cards, one records results in a table on paper.",
    "For each event, the group decides which of the handler cards would catch it and records yes or no for each.",
    "Groups verify three rows by running sys.exit() and raise statements inside try blocks in a browser interpreter.",
    "Groups then rewrite a printed bad loop (with except: pass) so that ordinary errors are logged but Ctrl+C still stops it.",
    "Two groups present their rewritten loops and the class checks them against the rule of thumb."
   ]
  },
  "discussion": [
   "Why might it be useful that sys.exit() is implemented as an exception instead of stopping the process immediately?",
   "What risks does a bare except create in a program that runs unattended on a server?"
  ],
  "exit": [
   [
    "What is the parent class of KeyboardInterrupt?",
    "BaseException."
   ],
   [
    "A try with only except Exception contains sys.exit(0). Does the handler run?",
    "No. SystemExit is not a subclass of Exception, so it propagates and the program exits."
   ],
   [
    "Which handler forms catch Ctrl+C?",
    "A bare except, except BaseException, or except KeyboardInterrupt."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column diagram of BaseException's children with Exception's subtree folded, and have them circle what except Exception covers.",
   "Extend: Ask fast finishers to write a program that catches KeyboardInterrupt once to print a warning, and only stops on a second Ctrl+C, then explain how they kept the loop stoppable."
  ]
 },
 {
  "t": "Defining your own exception classes and adding attributes to them",
  "objectives": [
   "Students will be able to define a custom exception class that inherits from Exception and raise and catch it by name.",
   "Students will be able to build a small exception hierarchy and predict which except branch catches each class.",
   "Students will be able to add attributes to a custom exception through __init__ with a super().__init__() call and read them in a handler.",
   "Students will be able to explain the effect on print(e) of omitting super().__init__() or overriding __str__()."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up about a checkout page that shows the same error for every problem. Ask what information the page would need."
   ],
   [
    12,
    "Teach",
    "Live-code BankError and InsufficientFunds. Show catching by base and by subclass. Remove the super().__init__() call and show how print(e) changes, then add a __str__ override."
   ],
   [
    18,
    "Activity",
    "Pairs design and build an exception hierarchy for a scenario (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss why inheriting from Exception rather than BaseException matters, and when a custom exception is overkill."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "An online shop shows 'Error: something failed' for every checkout problem. What different problems might be hidden behind that message, and what would a better program need to know about each?",
  "activity": {
   "title": "Design an exception family",
   "materials": "Printed scenario cards (library loans, cinema booking, school timetable), whiteboard or large paper, markers, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Each pair draws a scenario card listing three ways an operation can fail.",
    "On paper, pairs draw a hierarchy with one base class and at least two subclasses, and decide which attributes each subclass should carry.",
    "Pairs implement the classes in a browser Python interpreter, using super().__init__() with a readable message and storing the attributes.",
    "Pairs write a try statement that raises each subclass and handles one specifically and the rest through the base class, printing an attribute value.",
    "Two pairs swap code and predict each other's output before running it, then discuss any surprises."
   ]
  },
  "discussion": [
   "When is it better to reuse a built-in exception like ValueError instead of creating your own?",
   "Why is parsing an error message to find a number a fragile design?"
  ],
  "exit": [
   [
    "Which class should a custom exception normally inherit from?",
    "Exception, or a subclass of it."
   ],
   [
    "class A(Exception): pass and class B(A): pass. A try has except A first, then except B. B() is raised. Which branch runs?",
    "except A, because B is a subclass of A and that branch is checked first."
   ],
   [
    "What does super().__init__(msg) do in a custom exception's __init__?",
    "It runs the parent constructor, setting args to (msg,) so print(e) shows the message."
   ]
  ],
  "differentiation": [
   "Support: Provide a skeleton with the class lines and __init__ signature already written, so students only fill in the super() call and attribute assignments.",
   "Extend: Ask fast finishers to add a __str__ override and a method on the base class that returns a suggested fix, then use it in a handler."
  ]
 },
 {
  "t": "Character encoding: ASCII, Unicode, code points, UTF-8",
  "objectives": [
   "Students will be able to define character set, encoding, code point, ASCII, Unicode and UTF-8 and explain how they relate.",
   "Students will be able to state key ASCII values (space 32, '0' 48, 'A' 65, 'a' 97) and the size of ASCII.",
   "Students will be able to explain why len() of a str can differ from the number of bytes in its UTF-8 encoding.",
   "Students will be able to diagnose garbled text as an encoding mismatch and describe the fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the garbled name 'JosÃ©' and ask students to guess what went wrong before explaining anything."
   ],
   [
    12,
    "Teach",
    "Draw three columns on the whiteboard: character, code point, UTF-8 bytes. Fill them for 'A', 'é' and '€'. Explain ASCII, Unicode, code pages and UTF-8, then run the café example on the projector."
   ],
   [
    15,
    "Activity",
    "Run the 'Encode the message' activity (see activity)."
   ],
   [
    6,
    "Discuss",
    "Discuss why UTF-8's ASCII compatibility helped it spread, and where students have seen garbled characters."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Have you ever seen strange symbols like Ã© in an email or web page where a normal letter should be? What do you think caused it?",
  "activity": {
   "title": "Encode the message",
   "materials": "Printed table of selected characters with code points, student laptops with a browser-based Python interpreter, sticky notes, whiteboard.",
   "steps": [
    "Each pair writes a short word that includes at least one non-English character, such as café, naïve or Zoë.",
    "Using ord() in a browser Python interpreter, pairs list each character's code point and write it in U+ hexadecimal using hex().",
    "Pairs compute len() of the word and len() of its UTF-8 encoding, and explain the difference on a sticky note.",
    "Pairs then call word.encode('utf-8').decode('latin-1') to see the garbled version, and decode correctly with 'utf-8' to restore it.",
    "Pairs post their sticky notes on the whiteboard, and the class groups them by which characters needed extra bytes."
   ]
  },
  "discussion": [
   "Why do you think the first 128 Unicode code points were made identical to ASCII?",
   "If a file looks garbled, why is changing how you read it better than changing its contents?"
  ],
  "exit": [
   [
    "What is the code point of 'a', and how far is it from 'A'?",
    "97; it is 32 more than 'A' at 65."
   ],
   [
    "Is UTF-8 a character set or an encoding?",
    "An encoding of Unicode, the character set."
   ],
   [
    "Why can len(s) be smaller than len(s.encode('utf-8'))?",
    "len(s) counts code points, while UTF-8 may use 2 to 4 bytes for characters outside the ASCII range."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-filled character, code point and bytes table for five characters and ask them to explain each column before doing the activity.",
   "Extend: Ask fast finishers to find a character that needs 3 bytes and one that needs 4 bytes in UTF-8 using encode(), and explain why the counts grow with the code point."
  ]
 },
 {
  "t": "Ord() and chr()",
  "objectives": [
   "Students will be able to use ord() and chr() to convert between characters and code points.",
   "Students will be able to recall the code points of 'A', 'a', '0' and space and use them to compute others.",
   "Students will be able to implement a Caesar shift using ord(), chr() and modulo.",
   "Students will be able to identify the TypeError and ValueError cases of ord() and chr()."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write 'Uryyb jbeyq' on the whiteboard and ask students how they might decode it with code."
   ],
   [
    10,
    "Teach",
    "Show ord and chr on the projector with the four landmark values. Demonstrate arithmetic on letters and digits, then trace the shift function for 'x'. Show each error case."
   ],
   [
    18,
    "Activity",
    "Pairs build and test a Caesar encoder and decoder (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss why 'Z' < 'a' and how that affects sorting mixed-case names."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If every letter of the alphabet had a number, how could you use arithmetic to turn 'cat' into 'dbu'?",
  "activity": {
   "title": "Secret message relay",
   "materials": "Student laptops with a browser-based Python interpreter, index cards, markers, whiteboard.",
   "steps": [
    "Pairs write a function shift(c, k) that shifts lowercase letters with wrap-around using ord, chr and %, leaving other characters unchanged.",
    "Each pair encodes a short message with a secret shift and writes the result on an index card.",
    "Cards are passed to another pair, who must decode the message by trying shifts until the text is readable.",
    "Pairs extend the function to handle uppercase letters by using ord('A') as the base.",
    "The class tests edge cases on the projector: shifting 'z' by 1, ord(''), and chr(-1), and records the resulting errors."
   ]
  },
  "discussion": [
   "Why is it useful that code points for letters are consecutive?",
   "Why might a real program prefer upper() or isdigit() over ord() arithmetic?"
  ],
  "exit": [
   [
    "What is ord('a') - ord('A')?",
    "32."
   ],
   [
    "What error does chr(-5) raise, and why not TypeError?",
    "ValueError, because -5 is an int (correct type) but outside the valid code point range."
   ],
   [
    "What does chr((ord('y') - ord('a') + 3) % 26 + ord('a')) return?",
    "'b', because y is position 24, plus 3 is 27, 27 % 26 is 1, which is 'b'."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed table of a to z with code points 97 to 122 so they can trace shifts by reading the table.",
   "Extend: Ask fast finishers to write a function that shifts digits as well, wrapping 9 to 0, and to decode a message without knowing the shift by checking all 26 possibilities."
  ]
 },
 {
  "t": "String literals and escape sequences (\\n, \\t, \\\\, quotes)",
  "objectives": [
   "Students will be able to write string literals with single, double and triple quotes and choose the appropriate form.",
   "Students will be able to use the escape sequences \\n, \\t, \\\\, \\' and \\\" and count each as one character.",
   "Students will be able to explain and fix accidental escapes in Windows paths using doubled backslashes or raw strings.",
   "Students will be able to distinguish the output of print() from the representation shown at the interactive prompt."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the line print('C:\\new_reports') and ask students to predict the output before running it."
   ],
   [
    12,
    "Teach",
    "On the projector, demonstrate each escape sequence and its length. Show the Windows path problem and both fixes. Contrast print() with the interactive echo of the same string."
   ],
   [
    15,
    "Activity",
    "Run the 'Count the characters' relay (see activity)."
   ],
   [
    6,
    "Discuss",
    "Discuss when raw strings are the best choice and their one limitation."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You type print('C:\\new_reports') into Python. What do you expect to see, and what do you think you will actually see?",
  "activity": {
   "title": "Count the characters relay",
   "materials": "Printed cards each showing one string literal, whiteboard divided into team columns, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Prepare about 12 cards with literals such as 'a\\tb', '\\\\', r'\\n', \"It's\", 'C:\\new' and a short triple-quoted string.",
    "Teams take turns drawing a card, writing on the whiteboard the predicted len() value and what print() would show.",
    "Another team checks the prediction in a browser Python interpreter and awards a point if correct.",
    "After all cards, each team rewrites one problem literal (such as a Windows path) in two correct ways.",
    "The class summarizes the counting rule on the whiteboard: each escape counts as one, raw strings keep every backslash."
   ]
  },
  "discussion": [
   "Why do you think Python offers both single and double quotes instead of just one?",
   "What are the trade-offs between doubling backslashes and using raw strings in file paths?"
  ],
  "exit": [
   [
    "What is len('x\\ny')?",
    "3: x, a newline character and y."
   ],
   [
    "Give two ways to write the Windows path C:\\new correctly.",
    "'C:\\\\new' with a doubled backslash, or the raw string r'C:\\new'."
   ],
   [
    "What is the difference between typing 'a\\tb' at the interactive prompt and print('a\\tb')?",
    "The prompt shows the repr, 'a\\tb', with the escape visible; print shows a real tab between a and b."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a chart of the five escape sequences with their meaning and length, and let them use it during the relay.",
   "Extend: Ask fast finishers to investigate what happens with an invalid escape like '\\d' and with a raw string ending in a backslash, and to explain both results."
  ]
 },
 {
  "t": "Indexing, negative indexing and slicing, including steps",
  "objectives": [
   "Students will be able to access characters with positive and negative indexes and identify out-of-range IndexError cases.",
   "Students will be able to predict the result of slices with omitted, negative and out-of-range start and stop values.",
   "Students will be able to use a step in a slice, including a negative step to reverse a sequence, and explain when the result is empty."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write 'Python' on the whiteboard and ask students to label every position with a number. Collect different answers, then reveal both positive and negative indexes."
   ],
   [
    12,
    "Teach",
    "Using the projector, demonstrate indexing, negative indexing and slicing on 'Certification'. Trace s[-3:-8:-1] by converting to positive indexes. Contrast 'abc'[3] with 'abc'[3:]."
   ],
   [
    15,
    "Activity",
    "Run the 'Human string' activity (see activity)."
   ],
   [
    6,
    "Discuss",
    "Ask why slices clip instead of raising errors, and when that forgiveness could hide a bug."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "In the word 'Python', what number would you give the first letter, and what number would you give the last letter if you counted from the end?",
  "activity": {
   "title": "Human string",
   "materials": "Large printed letter cards spelling a word such as CERTIFY, sticky notes for index labels, whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Seven students stand in a row holding letter cards; each wears a sticky note with a positive index on the front and a negative index on the back.",
    "The teacher calls out expressions such as s[2], s[-1], s[1:4], s[::2] and s[::-1], and the rest of the class decides which students step forward and in what order.",
    "After each expression, a student checks the answer in a browser Python interpreter on the projector.",
    "Include tricky calls: s[10], s[2:100], s[4:2] and s[1:5:-1], and let students discuss before checking.",
    "Pairs then write three slice puzzles for each other on paper and swap them."
   ]
  },
  "discussion": [
   "Why might Python's designers have chosen to exclude the stop index in slices?",
   "When could slicing's silent clipping hide a real problem in your data?"
  ],
  "exit": [
   [
    "What is 'Python'[-2]?",
    "'o', the second-to-last character."
   ],
   [
    "What is 'Python'[1:100]?",
    "'ython', because slices clip out-of-range values."
   ],
   [
    "Why is 'Python'[1:4:-1] empty?",
    "With a negative step, start must be to the right of stop; 1 is left of 4, so nothing is selected."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed grid showing a word with positive indexes above and negative indexes below each letter, to use while tracing.",
   "Extend: Ask fast finishers to predict and test slices on a list of numbers with negative steps and omitted bounds, then explain how s[::-1] and reversed() differ in what they return."
  ]
 },
 {
  "t": "Immutability: why item assignment fails",
  "objectives": [
   "Students will be able to explain what immutability means for Python strings and identify statements that raise TypeError.",
   "Students will be able to distinguish modifying an object from rebinding a name, using a second name and the is operator as evidence.",
   "Students will be able to correct code that discards the result of a string method or mistakenly assigns to a string index.",
   "Students will be able to contrast string methods, which return new strings, with list methods that modify in place."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show name.strip() on its own line followed by print(name) with extra spaces still present. Ask students why the spaces remain."
   ],
   [
    12,
    "Teach",
    "Demonstrate s[0] = 'J' and its TypeError, then s = 'J' + s[1:]. Keep a second name with t = s, run s += 'd', and show that t is unchanged and s is t is False; compare with a list append through two names. Explain why immutability makes strings usable as dictionary keys."
   ],
   [
    15,
    "Activity",
    "Run the 'Bug hunt' pair troubleshooting activity (see activity)."
   ],
   [
    6,
    "Discuss",
    "Discuss the opposite habits of string methods and list methods and how to remember which is which."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A friend writes name.strip() and then prints name, but the extra spaces are still there. What do you think went wrong?",
  "activity": {
   "title": "Bug hunt",
   "materials": "Printed sheets with six short buggy snippets, student laptops with a browser-based Python interpreter, highlighters, whiteboard.",
   "steps": [
    "Give each pair a sheet of snippets: an unassigned replace(), an index assignment, a del s[0], a slice assignment, lst = lst.sort(), and a correct s = s.upper() as a control.",
    "Pairs highlight the line they think is wrong and predict the error or output in writing.",
    "Pairs run each snippet in a browser interpreter to confirm, then write a corrected version.",
    "Pairs use a second name and the is operator to show, for one string and one list, whether the object changed or the name was rebound.",
    "Volunteers present one fix each on the whiteboard, and the class agrees on the general rule."
   ]
  },
  "discussion": [
   "Why is it useful that a string passed into a function cannot be changed by that function?",
   "Building a long string with += in a loop works. Why might joining a list of pieces be a better choice for large amounts of text?"
  ],
  "exit": [
   [
    "What error does s = 'cat'; s[0] = 'b' raise?",
    "TypeError, because str objects do not support item assignment."
   ],
   [
    "How do you produce 'bat' from s = 'cat' correctly?",
    "s = 'b' + s[1:], or s = s.replace('c', 'b'), building and assigning a new string."
   ],
   [
    "What is printed by s = 'hi'; s.upper(); print(s)?",
    "hi, because upper() returned a new string that was not assigned."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column chart, 'returns a new object' versus 'changes in place', with common string and list methods to sort before the bug hunt.",
   "Extend: Ask fast finishers to time building a long string with += versus ''.join() using the time module, and explain the result in terms of immutability."
  ]
 },
 {
  "t": "Iterating over strings; in and not in",
  "objectives": [
   "Students will be able to trace a for loop over a string and state the value of the loop variable on each pass.",
   "Students will be able to predict the result of in and not in expressions on strings, including case, adjacency and empty-string cases.",
   "Students will be able to explain why a non-string left operand with a string raises TypeError.",
   "Students will be able to choose between enumerate() and range(len()) and write a loop that counts characters meeting a condition."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write 'Hello' on the board and ask students to vote on whether 'ell', 'eh', 'h' and '' are 'in' it. Record the votes without revealing answers."
   ],
   [
    12,
    "Teach",
    "Show a for loop over a string on the projector and trace it aloud, writing ch on the board for each pass. Then explain substring membership, case sensitivity, the empty-string rule and the TypeError for an int on the left. Reveal the warm-up answers."
   ],
   [
    15,
    "Activity",
    "Run the 'Membership court' card activity in small groups, described below."
   ],
   [
    8,
    "Discuss",
    "Lead the discussion questions, focusing on when in on a string is the wrong tool and a list should be used instead."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Without running anything, is the expression 'eh' in 'Hello' True or False? What about '' in 'Hello'? Write your guesses and a one-line reason.",
  "activity": {
   "title": "Membership court",
   "materials": "Printed cards, each with one expression (for example 'ell' in 'Hello', 'H' not in 'Hello', 1 in 'a1b', '' in '', 'ei' in 'aeiou'), whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Give each group of three a stack of twelve expression cards and two sheets labeled True and False, plus a third labeled Error.",
    "Groups sort the cards onto the three sheets and must write a one-sentence 'verdict' for each card explaining the rule that decided it.",
    "Groups then run each expression in a browser Python interpreter and move any card they got wrong, noting which rule they missed.",
    "Each group writes a four-line loop that counts how many characters of a given sentence are digits, using in, and shares the result with the class."
   ]
  },
  "discussion": [
   "Why might ch in 'aeiou' give a surprising answer if ch comes from user input rather than from a loop over a string?",
   "When would you prefer enumerate() over range(len(text)), and is there ever a reason to use the second form?",
   "Why do you think Python raises TypeError for 1 in 'a1b' instead of converting the number for you?"
  ],
  "exit": [
   [
    "What is the value of 'Py' in 'Python'?",
    "True, because 'Py' appears as adjacent characters at the start."
   ],
   [
    "What does for i, ch in enumerate('ok'): print(i, ch) print?",
    "0 o on the first line and 1 k on the second."
   ],
   [
    "What happens with 2 in '123'?",
    "TypeError: the left operand must be a string when testing membership in a string."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a tracing table with columns for pass number, ch and the condition result, and have them fill it in for a five-character word before attempting the card sort.",
   "Extend: Ask fast finishers to write a function that returns True if every character of one string appears somewhere in another, using a loop and in, then compare it with a version that checks contiguous substrings."
  ]
 },
 {
  "t": "Concatenation, replication and comparison of strings (and why comparing strings with numbers using < fails)",
  "objectives": [
   "Students will be able to evaluate expressions that use + and * on strings, including zero and negative replication counts.",
   "Students will be able to determine the result of string comparisons using code point lexicographic order.",
   "Students will be able to distinguish between cross-type equality, which returns False, and cross-type ordering, which raises TypeError.",
   "Students will be able to fix a sorting bug caused by comparing numeric strings by converting them to numbers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the list ['10', '9', '100', '2'] and ask students to predict what sorted() returns. Collect three or four guesses on the board."
   ],
   [
    12,
    "Teach",
    "Demonstrate + and * with strings, including the TypeError for 'Age: ' + 30 and the empty result for a negative count. Show ord() values for 'A', 'a', '0' and '9', then walk through comparing 'Zebra' and 'apple' character by character. Finish with '1' == 1 versus '1' < 1."
   ],
   [
    15,
    "Activity",
    "Run the 'Line up the strings' activity described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to connect the rules to real data-cleaning problems."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Here is a list of numbers stored as text: ['10', '9', '100', '2']. What do you think sorted() will return, and why?",
  "activity": {
   "title": "Line up the strings",
   "materials": "Large printed cards with one string each ('apple', 'Apple', 'app', 'Zebra', '10', '9', 'b', 'abc'), a printed table of code points for digits and letters, whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Hand eight students one card each and ask them to stand in a line at the front in the order Python's sorted() would produce. The rest of the class directs them using the code point table.",
    "For each adjacent pair, the class states which character position decided the order and why.",
    "Pairs of students then check the final order in a browser Python interpreter and note any surprises.",
    "Each pair writes three expressions of their own: one that is True, one that is False and one that raises TypeError, then swaps with another pair to predict the outcomes."
   ]
  },
  "discussion": [
   "Why do you think Python 3 chose to raise an error for '1' < 1 instead of picking some order?",
   "Where have you seen numbers stored as text in real data, and how could that cause sorting problems?",
   "When is case-insensitive comparison the right choice, and when would it be wrong?"
  ],
  "exit": [
   [
    "What is the value of 3 * 'no'?",
    "'nonono'."
   ],
   [
    "Is '9' < '10' True or False?",
    "False, because '9' (57) is greater than '1' (49) at the first character."
   ],
   [
    "What is the difference between '7' == 7 and '7' < 7?",
    "'7' == 7 is False with no error; '7' < 7 raises TypeError."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially filled code point table and have students compare only the first character of each pair before moving to strings that share a prefix.",
   "Extend: Challenge students to write a key function that sorts a list of filenames like 'file2', 'file10', 'file1' in human numeric order, and explain why the default order differs."
  ]
 },
 {
  "t": "Character tests: isdigit(), isalpha(), isalnum(), isspace(), isupper(), islower()",
  "objectives": [
   "Students will be able to predict the result of each of the six character-test methods for a given string.",
   "Students will be able to explain the empty-string rule and the cased-character rule for isupper() and islower().",
   "Students will be able to select the appropriate test to validate a specific kind of user input.",
   "Students will be able to combine a character test with a loop or sum() to count character types."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to predict '-5'.isdigit() and ''.isspace() and explain their reasoning to a neighbor."
   ],
   [
    12,
    "Teach",
    "Introduce the six methods with one True and one False example each. Emphasize the every-character rule, the empty-string rule, and how isupper() ignores digits but needs at least one letter. Run the tests loop from the lesson on the projector, pausing before each row for predictions."
   ],
   [
    15,
    "Activity",
    "Run the 'Prediction grid' activity described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about validation choices and their limits."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Will '-5'.isdigit() return True or False? What about ''.isspace()? Write your answer and one sentence of reasoning.",
  "activity": {
   "title": "Prediction grid",
   "materials": "Printed grid with eight strings down the side ('2024', '-5', 'abc', 'abc123', 'A B', '', 'HELLO 1', ' \\t') and six method names across the top, pencils, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Students work in pairs and fill every cell of the grid with T or F by reasoning alone.",
    "Pairs run the tests loop in a browser interpreter and circle every cell they got wrong.",
    "For each circled cell, the pair writes the rule they had missed, such as 'empty string is always False' or 'isupper needs a letter'.",
    "Pairs then design a small validator for a made-up kiosk that accepts an age, a first name and an optional middle initial, choosing which method guards each field, and present one choice to the class."
   ]
  },
  "discussion": [
   "Why might isdigit() be a poor choice for validating a bank balance field?",
   "Why do you think Python decided that the empty string fails all of these tests?",
   "What is the difference between checking s.isupper() and checking any(c.isupper() for c in s)?"
  ],
  "exit": [
   [
    "What does 'abc_1'.isalnum() return?",
    "False, because the underscore is neither a letter nor a digit."
   ],
   [
    "What does 'R2D2'.isupper() return?",
    "True; the cased characters R and D are uppercase and the digits are ignored."
   ],
   [
    "Which method would you use to check that a string contains only spaces, tabs or newlines, and what does it return for ''?",
    "isspace(); it returns False for the empty string."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a cheat card listing each method with one True and one False example, and have them complete only the first four rows of the grid before checking.",
   "Extend: Ask fast finishers to write a password-strength function that returns a score based on counts of digits, uppercase letters, lowercase letters and other characters, using sum() with generator expressions."
  ]
 },
 {
  "t": "Join(), split(), find(), rfind(), index(), and the difference between find and index",
  "objectives": [
   "Students will be able to predict the list returned by split() with and without a separator and with maxsplit.",
   "Students will be able to write a correct join() call and explain why the separator is the object it is called on.",
   "Students will be able to compare find(), rfind(), index() and rindex() and state what each returns or raises when the substring is missing.",
   "Students will be able to choose between find() and index() for a given parsing situation and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display 'banana' and ask students where 'an' first appears and where it last appears, counting from 0."
   ],
   [
    13,
    "Teach",
    "Demonstrate split() with no argument, with ' ' and with maxsplit, highlighting the empty strings. Show join() on the separator and the TypeError for integers. Then show find(), rfind() and index() side by side on 'banana', and finish with the if s.find(x): trap."
   ],
   [
    15,
    "Activity",
    "Run the 'Log line surgery' pair activity described below."
   ],
   [
    7,
    "Discuss",
    "Work through the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In the word 'banana', at what index does 'an' first start, and at what index does it last start? What would you expect a search to return if you looked for 'x'?",
  "activity": {
   "title": "Log line surgery",
   "materials": "Printed sheet of six made-up log lines (some missing a 'user=' field, one with double spaces), whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "In pairs, students write by hand the result of line.split() and line.split(' ') for two of the log lines, including any empty strings.",
    "Pairs decide, for each line, what message.find('user=') and message.index('user=') would produce, and mark which lines would crash with index().",
    "Pairs write a short loop that extracts the user name when present and prints 'unknown' otherwise, using find(), then test it in a browser interpreter.",
    "Pairs rebuild each line with '|'.join(parts) and compare output with another pair, explaining any differences."
   ]
  },
  "discussion": [
   "In what kind of program would you prefer a missing value to raise an exception rather than return -1?",
   "Why do you think Python made join() a string method instead of a list method?",
   "When is the membership test x in s a better choice than find()?"
  ],
  "exit": [
   [
    "What is 'one,two,,three'.split(',')?",
    "['one', 'two', '', 'three']."
   ],
   [
    "What does 'banana'.index('z') do?",
    "It raises ValueError because the substring is not found."
   ],
   [
    "Fix this line: words.join(' ')",
    "' '.join(words), because join() is called on the separator string."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students index cards showing each character of 'banana' with its index underneath, so they can physically locate substrings before using find() and rfind().",
   "Extend: Ask fast finishers to write a function that returns every starting index of a substring in a string, using find() with its start argument in a loop, and to explain how they avoid an infinite loop."
  ]
 },
 {
  "t": "Sorted() on strings versus list.sort()",
  "objectives": [
   "Students will be able to state the return value and side effect of sorted() and of list.sort().",
   "Students will be able to predict the output of sorted() applied to a string and convert it back into a string with join().",
   "Students will be able to use the key and reverse arguments to control sort order.",
   "Students will be able to identify and correct the names = names.sort() bug."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project x = [3, 1, 2].sort() followed by print(x) and ask students to write down what they think prints."
   ],
   [
    12,
    "Teach",
    "Contrast sorted() and list.sort() with a two-column table on the board: accepts, returns, changes original. Demonstrate sorted('Banana'), join(), the AttributeError for 'abc'.sort(), and key=str.lower and reverse=True."
   ],
   [
    15,
    "Activity",
    "Run the 'Copy or rearrange' role-play and code check described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore when each approach is appropriate."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What does this print: x = [3, 1, 2].sort(); print(x)? Write your guess before we run it.",
  "activity": {
   "title": "Copy or rearrange",
   "materials": "Sets of five paper cards with names written on them, sticky notes, whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "In groups of four, one student plays sorted(): they copy the names onto sticky notes, arrange the copies in order and hand them over, leaving the original cards alone. Another plays list.sort(): they rearrange the original cards and hand over a blank sticky note labeled None.",
    "Groups act out four short code snippets read by the teacher, such as names = names.sort() and print(sorted(names)), and say what each variable holds afterwards.",
    "Groups verify each snippet in a browser interpreter and note any surprises.",
    "Each group writes an anagram checker using sorted() and lower(), tests it on three pairs of words, and shares one pair that shows why lowercasing matters."
   ]
  },
  "discussion": [
   "Why might a program prefer list.sort() for a very large list?",
   "Why do strings and tuples have no sort() method, while lists do?",
   "How does the key argument change what is compared without changing what is returned?"
  ],
  "exit": [
   [
    "What does ''.join(sorted('cat')) return?",
    "'act'."
   ],
   [
    "After nums = [5, 2]; nums.sort(), what is nums?",
    "[2, 5]; the list was sorted in place."
   ],
   [
    "Why is names = names.sort() a bug?",
    "sort() returns None, so names is rebound to None and the sorted list is lost."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column reference card comparing sorted() and list.sort() and have them annotate each line of the example code with what changes.",
   "Extend: Ask fast finishers to sort a list of words first by length and then alphabetically within each length, using stability or a tuple key, and explain why it works."
  ]
 },
 {
  "t": "Core ideas: class, object, attribute, method, encapsulation, inheritance, superclass and subclass",
  "objectives": [
   "Students will be able to define class, object, attribute, method, encapsulation, inheritance, superclass and subclass in their own words.",
   "Students will be able to identify each of these elements in a short Python class definition.",
   "Students will be able to distinguish is-a relationships suited to inheritance from has-a relationships.",
   "Students will be able to explain how encapsulation lets a class enforce rules on its data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to name three things a school library system would track and what each can do. List them on the board as nouns and verbs."
   ],
   [
    13,
    "Teach",
    "Map the warm-up nouns to classes and verbs to methods. Walk through the Dog and Puppy example on the projector, labeling class, object, attribute, method, superclass, subclass and overriding. Explain encapsulation with a bank balance that must not go negative."
   ],
   [
    15,
    "Activity",
    "Run the 'Is-a or has-a' card sort described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a school library system. Name three kinds of things it keeps track of and one action each of them can perform.",
  "activity": {
   "title": "Is-a or has-a",
   "materials": "Printed cards with class pairs (Square and Shape, Car and Engine, Puppy and Dog, Library and Book, Student and Person, Phone and Battery), whiteboard, markers.",
   "steps": [
    "Groups of three sort the pair cards into two piles: is-a, which suits inheritance, and has-a, which suits an attribute.",
    "For each is-a pair, groups write the class header, for example class Square(Shape):, and name the superclass and subclass.",
    "Groups pick one hierarchy and sketch it on the whiteboard as a tree with at least three levels, adding one attribute and one method per class and marking any overriding method.",
    "Each group explains one design decision, including where encapsulation would protect data from invalid values."
   ]
  },
  "discussion": [
   "Why might bundling data with methods make a large program easier to maintain?",
   "What problems could arise if inheritance is used for a has-a relationship?",
   "If Python does not truly lock private data, why is encapsulation still valuable?"
  ],
  "exit": [
   [
    "In class Truck(Vehicle):, which class is the subclass?",
    "Truck."
   ],
   [
    "In rex = Dog('Rex'); rex.bark(), identify the class, the object and the method.",
    "Dog is the class, rex is the object and bark is the method."
   ],
   [
    "What does encapsulation allow a class to do?",
    "Keep its data together with the methods that manage it and enforce rules by having outside code use those methods instead of changing the data directly."
   ]
  ],
  "differentiation": [
   "Support: Provide a glossary card with each term, a one-line definition and a matching line from the Dog example, and let students refer to it during the card sort.",
   "Extend: Ask fast finishers to write a small class hierarchy in a browser interpreter with an overridden method, and add a method in the superclass that calls the overridden method through self."
  ]
 },
 {
  "t": "Instance variables versus class variables: declaring, initializing and sharing",
  "objectives": [
   "Students will be able to identify which assignments in a class create instance variables and which create class variables.",
   "Students will be able to predict values read through an instance and through the class after assignments, including shadowing.",
   "Students will be able to explain why self.counter += 1 does not update a class counter.",
   "Students will be able to diagnose and fix bugs caused by mutable class variables."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show class A: n = 1, then a = A(); a.n = 5; print(A.n). Ask for predictions with a show of hands."
   ],
   [
    12,
    "Teach",
    "Trace the Counter example on the board, drawing a box for the class and a box for each instance with their attributes. Demonstrate lookup order, then shadowing with a.created = 100, then the self.created += 1 trap and the shared list."
   ],
   [
    15,
    "Activity",
    "Run the 'Notebooks and the wall poster' tracing activity described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Given class A: n = 1, then a = A() and a.n = 5, what does print(A.n) show? Commit to an answer.",
  "activity": {
   "title": "Notebooks and the wall poster",
   "materials": "Large sheet of paper on the wall labeled with a class name, sticky notes in two colors, printed code snippets, student laptops with a browser-based Python interpreter.",
   "steps": [
    "The teacher reads a short code snippet line by line. Each class-body assignment goes on the wall sheet as a sticky note of one color; each assignment through an instance goes on that student's 'notebook' card in the other color.",
    "After each print statement in the snippet, students holding instance cards say what value they would read, checking their notebook first and the wall second.",
    "Pairs then trace two printed snippets on their own, including one with self.count += 1 and one with a shared list, writing the final value of every attribute.",
    "Pairs verify their traces in a browser interpreter, using vars(obj) to see what is really stored on each instance, and fix the buggy snippet."
   ]
  },
  "discussion": [
   "When is it useful for all objects to share one value, and when is it dangerous?",
   "Why does self.items.append(x) behave differently from self.items = self.items + [x]?",
   "How could you make the self.count += 1 bug easier to spot when reading code?"
  ],
  "exit": [
   [
    "class B: x = 0. After b1 = B(); b2 = B(); B.x = 9, what is b2.x?",
    "9, because b2 has no instance variable x and reads the class variable."
   ],
   [
    "Which line correctly increments a shared counter inside __init__: self.total += 1 or ClassName.total += 1?",
    "ClassName.total += 1; the other creates an instance variable."
   ],
   [
    "Why should a per-object list be created in __init__ rather than the class body?",
    "A list in the class body is shared by all instances, so appending through one object changes it for every object."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn diagram with a class box and two instance boxes and have them write values in the boxes after each line of the Counter example.",
   "Extend: Ask fast finishers to write a class that keeps a class-level registry of every instance created, and then explain how to give each instance its own separate history list."
  ]
 },
 {
  "t": "The __dict__ attribute of objects and classes",
  "objectives": [
   "Students will be able to predict the contents of an instance's __dict__ after construction and after later assignments.",
   "Students will be able to explain why class variables and methods appear in the class's __dict__ and not the instance's.",
   "Students will be able to use vars() or __dict__ to diagnose where an attribute is stored.",
   "Students will be able to state that a subclass's __dict__ contains only names it defines itself."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the Point class and ask students to write what print(p.__dict__) will show for p = Point(1, 2)."
   ],
   [
    12,
    "Teach",
    "Run the Point example on the projector. Add p.color and p.dims assignments and print the dictionaries after each. Show Point.__dict__ and its mappingproxy type, then a subclass's __dict__ and a mangled private name."
   ],
   [
    15,
    "Activity",
    "Run the 'Where does it live' prediction race described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "For the Point class on the board, what will print(p.__dict__) show after p = Point(1, 2)? Will dims be in it?",
  "activity": {
   "title": "Where does it live",
   "materials": "Printed code snippets with a class, a subclass and several assignments, mini whiteboards or paper, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Pairs receive a snippet and, for each listed attribute name, write whether it will appear in the instance __dict__, the class __dict__, the subclass __dict__, or more than one.",
    "Pairs write the exact output of two print(vars(obj)) lines, including key order.",
    "Pairs run the snippet in a browser interpreter and score one point per correct prediction, then correct any errors with a one-line reason.",
    "The class compares answers for the trickiest names, such as an attribute assigned through an instance that shadows a class variable."
   ]
  },
  "discussion": [
   "Why is it efficient for methods to live in the class rather than in each instance?",
   "How could printing vars(obj) help you debug a program that behaves differently for two objects of the same class?",
   "Why might Python make a class's __dict__ read-only while an instance's __dict__ can be changed?"
  ],
  "exit": [
   [
    "class C: k = 5; def __init__(self): self.m = 1. After c = C(); c.k = 7, what is c.__dict__?",
    "{'m': 1, 'k': 7}."
   ],
   [
    "Is 'k' still in C.__dict__ after that assignment, and with what value?",
    "Yes, with value 5; the instance assignment did not change it."
   ],
   [
    "If class D(C): pass, is '__init__' in D.__dict__?",
    "No; D inherits __init__ from C, and a class's __dict__ shows only what it defines itself."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a diagram with three boxes labeled instance, class and superclass, and have them place each attribute name in the right box before writing any output.",
   "Extend: Ask fast finishers to write a function that walks up a class and its superclasses and reports in which class's __dict__ a given method name is first found."
  ]
 },
 {
  "t": "Private attributes and name mangling (__name becomes _ClassName__name)",
  "objectives": [
   "Students will be able to apply the name mangling rule to rewrite a double-underscore name inside a class.",
   "Students will be able to predict whether an attribute access from outside a class succeeds, fails or creates a new attribute.",
   "Students will be able to explain why name mangling prevents clashes between superclass and subclass attributes.",
   "Students will be able to distinguish single-underscore, double-underscore and dunder names."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the Account class and ask whether print(a.__balance) will work from outside the class. Take a quick vote."
   ],
   [
    12,
    "Teach",
    "Explain the single-underscore convention, then name mangling with the Account example, printing a.__dict__. Show the outside assignment a.__balance = 5 creating a second key, then the superclass and subclass example with two separate mangled names."
   ],
   [
    15,
    "Activity",
    "Run the 'Mangle or not' card sort and trace activity described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a class Account sets self.__balance in __init__, will print(a.__balance) work from outside the class? Write yes or no and why.",
  "activity": {
   "title": "Mangle or not",
   "materials": "Printed cards each showing a name and a location (for example '__size inside class Box', '__size outside any class', '_size inside class Box', '__init__ inside class Box'), whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Groups sort the cards into Mangled and Not mangled, writing the rewritten name on each mangled card.",
    "Groups trace a printed snippet with a superclass and a subclass that both use __data, writing the final contents of the instance __dict__.",
    "Groups run the snippet in a browser interpreter and compare the printed __dict__ with their prediction.",
    "Each group writes one exam-style question about outside assignment to a double-underscore name and swaps it with another group to answer."
   ]
  },
  "discussion": [
   "If mangled names can still be reached, what is the real value of name mangling?",
   "When would you choose a single underscore instead of a double underscore for an internal attribute?",
   "Why does it matter that mangling uses the class where the code is written, not the class of the object?"
  ],
  "exit": [
   [
    "Inside class Car, what does self.__speed become?",
    "self._Car__speed."
   ],
   [
    "Outside the class, what does car.__speed = 10 do?",
    "It creates a new attribute literally named __speed; the mangled _Car__speed is unchanged."
   ],
   [
    "Which of these is mangled inside a class: _id, __id, __id__?",
    "Only __id."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-step checklist card (inside a class body, starts with two underscores, does not end with two) to apply to every name before writing an answer.",
   "Extend: Ask fast finishers to investigate what happens to a double-underscore name used inside a nested function defined within a method, predict the result, and test it."
  ]
 },
 {
  "t": "Methods and the self parameter; constructors (__init__) with default arguments",
  "objectives": [
   "Students will be able to explain how Python passes the instance to a method as self.",
   "Students will be able to diagnose the TypeError caused by a method defined without self.",
   "Students will be able to write an __init__ method with default and keyword arguments and predict the resulting attributes.",
   "Students will be able to explain why Python has no constructor overloading and why mutable defaults are risky."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a class with def greet(): return 'hi' and the call obj.greet(). Ask students to predict what happens."
   ],
   [
    12,
    "Teach",
    "Rewrite obj.method(5) as type(obj).method(obj, 5) on the board. Walk through the Timer example with three different calls. Show the double __init__ replacement and the mutable default problem with a quick live demo."
   ],
   [
    15,
    "Activity",
    "Run the 'Constructor call desk' pair activity described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A class defines def greet(): return 'hi', and someone calls obj.greet(). What happens, and why?",
  "activity": {
   "title": "Constructor call desk",
   "materials": "Printed class definitions with different __init__ signatures, a stack of printed calls on cards (some valid, some invalid), whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Pairs receive one class definition and eight call cards. For each card they write the resulting attribute values or the error it raises.",
    "Pairs rewrite each valid call in the explicit form ClassName.__init__(obj, ...) on paper to show where self comes from.",
    "Pairs test their predictions in a browser interpreter and correct any mistakes.",
    "Pairs fix a provided class that uses a mutable default and a duplicated __init__, then demonstrate the fix to another pair."
   ]
  },
  "discussion": [
   "Why do you think Python makes self explicit in method definitions instead of hiding it completely?",
   "How do default arguments replace the need for multiple constructors?",
   "What kinds of default values are safe in a constructor, and which are risky?"
  ],
  "exit": [
   [
    "Given def __init__(self, a, b=2), what are the attributes for C(5) if it stores both?",
    "a is 5 and b is 2."
   ],
   [
    "What is wrong with def show(): print(self.name) inside a class?",
    "self is missing from the parameter list, so calling obj.show() raises TypeError, and self would be undefined inside."
   ],
   [
    "What happens if a class defines __init__ twice?",
    "The second definition replaces the first; only the second signature works."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a template for a class with __init__ and one method, with blanks for self and the default values, and let them fill it in before predicting calls.",
   "Extend: Ask fast finishers to write a class whose constructor accepts either a single string like '3x4' or two numbers, using default arguments and type checks, and to discuss whether that design is clear."
  ]
 },
 {
  "t": "Introspection: hasattr(), type(), __name__, __module__, __bases__, __class__",
  "objectives": [
   "Students will be able to use hasattr() correctly with a string attribute name to check for attributes and methods.",
   "Students will be able to retrieve an object's class and class name using type() or __class__ and __name__.",
   "Students will be able to predict the printed output of __module__ and __bases__ for a given class hierarchy.",
   "Students will be able to identify which introspection attributes exist on classes only and which can be read through instances."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how a program could find out what kind of object it has been handed, without printing the object itself."
   ],
   [
    12,
    "Teach",
    "Run the Animal and Dog example line by line on the projector, pausing for predictions. Show obj.__name__ failing, type(obj).__name__ working, __module__ as '__main__', and __bases__ as a tuple. Contrast __bases__ with __mro__."
   ],
   [
    15,
    "Activity",
    "Run the 'Object detective' worksheet activity described below."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a function receives an unknown object, how could the program find out what class it is and whether it has a method called save?",
  "activity": {
   "title": "Object detective",
   "materials": "Printed worksheet with a three-level class hierarchy and a list of introspection expressions, colored pens, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Pairs write the exact output of each expression on the worksheet, such as type(x).__name__, X.__bases__, x.__module__ and hasattr(x, 'save'), marking any that raise AttributeError.",
    "Pairs run the expressions in a browser interpreter and mark each prediction correct or incorrect in a different color.",
    "Pairs write a function that takes any object and prints its class name, its module and the chain of class names up to object by following __bases__.",
    "Two pairs swap functions and test them on an integer, a string and an instance of the worksheet hierarchy, then report one difference they noticed."
   ]
  },
  "discussion": [
   "Why might a plugin system prefer hasattr() checks over assuming every plugin has the same methods?",
   "Why do you think instances can read __module__ but not __name__?",
   "When would __mro__ be more useful than __bases__?"
  ],
  "exit": [
   [
    "For class Cat(Animal): pass and c = Cat(), what is c.__class__.__name__?",
    "'Cat'."
   ],
   [
    "What does Cat.__bases__ print if Animal is defined in the main script?",
    "(<class '__main__.Animal'>,)."
   ],
   [
    "What does hasattr(c, 'meow') return if neither Cat nor Animal defines meow?",
    "False."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card that marks each attribute as class-only or instance-readable, and have them annotate the worksheet expressions with which object they are asking before predicting.",
   "Extend: Ask fast finishers to extend their function to handle multiple inheritance by printing every direct base at each level, and compare its output with __mro__."
  ]
 },
 {
  "t": "Single and multiple inheritance, method overriding and super()",
  "objectives": [
   "Students will be able to trace method lookup through a single-inheritance hierarchy and identify which version of an overridden method runs.",
   "Students will be able to write a subclass constructor that correctly calls the superclass constructor using super() or the class name.",
   "Students will be able to predict which parent's method is used in a simple multiple-inheritance class.",
   "Students will be able to diagnose the AttributeError caused by a subclass that does not call the parent's __init__."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show class A with hi() returning 'A' and class B(A) overriding hi() to return 'B' + super().hi(). Ask students to predict B().hi()."
   ],
   [
    13,
    "Teach",
    "Walk through the Vehicle and Car example, tracing each call on the board. Contrast super().__init__(4) with Vehicle.__init__(self, 4). Introduce multiple inheritance with a two-parent example, show __mro__ and explain mixins briefly."
   ],
   [
    15,
    "Activity",
    "Run the 'Who answers the call' role-play described below."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If class B(A) overrides hi() and returns 'B' + super().hi(), and A's hi() returns 'A', what does B().hi() return?",
  "activity": {
   "title": "Who answers the call",
   "materials": "Name cards for classes (object, Vehicle, Car, Aircraft, FlyingCar), printed cards listing the methods each class defines, whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Students holding class cards stand in the order of the method resolution order for FlyingCar(Car, Aircraft), with the rest of the class helping decide the order.",
    "The teacher calls out method names; the first student in line whose card defines that method raises a hand and 'answers'. If their method uses super(), they pass the call to the next student in line.",
    "Pairs then write a Vehicle and Car pair of classes in a browser interpreter, first without calling super().__init__() to reproduce the AttributeError, then with the fix.",
    "Pairs predict and verify FlyingCar.__mro__ and explain one surprise to the class."
   ]
  },
  "discussion": [
   "Why might a subclass want to extend a parent's method rather than completely replace it?",
   "What are the advantages of super() over calling the parent class by name?",
   "When does multiple inheritance help, and when does it make code harder to understand?"
  ],
  "exit": [
   [
    "What is wrong with super().__init__(self, name) in a subclass?",
    "self is passed twice; super() already binds the object, so it should be super().__init__(name)."
   ],
   [
    "In class D(B, C) where only B and C define go(), which go() does D().go() use?",
    "B's, because B is listed first."
   ],
   [
    "Why might a subclass object raise AttributeError for an attribute the parent class sets?",
    "The subclass defined its own __init__ and did not call the parent's __init__, so the attribute was never created."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a lookup ladder diagram for single inheritance and have them place each method name on the rung where it is defined before tracing calls.",
   "Extend: Ask fast finishers to build a diamond hierarchy where every class's __init__ prints its name and calls super().__init__(), predict the printed order, and check it against __mro__."
  ]
 },
 {
  "t": "Method resolution order (MRO), diamonds and inconsistent hierarchies",
  "objectives": [
   "Students will be able to compute the MRO of a diamond hierarchy by hand and confirm it with __mro__.",
   "Students will be able to predict which overridden method runs for a class with multiple bases.",
   "Students will be able to identify an inconsistent hierarchy and explain why Python raises TypeError at class definition time.",
   "Students will be able to explain how super() follows the MRO rather than the literal parent class."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Draw a family tree with a shared grandparent on the board and ask: if you need a spare key, whom do you ask, and in what order? Record two or three orders students suggest."
   ],
   [
    12,
    "Teach",
    "Live-code the A, B, C, D diamond. Ask the class to predict D().who() before running it, then print the MRO. State the two C3 rules and show the hand method of postponing a class while a subclass of it is still waiting. Finish by defining class Bottom(Top, Middle) and letting the TypeError appear."
   ],
   [
    15,
    "Activity",
    "Run 'MRO line-up' (see activity). Circulate and ask each group to justify one position in their line using the two rules."
   ],
   [
    6,
    "Discuss",
    "Show super() inside B for a D object and ask where it goes. Connect to cooperative inheritance: each class runs once."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions on paper; review answers aloud in the last two minutes."
   ]
  ],
  "warmup": "Two of your parents and their shared parent all might have a spare key. In what order should you ask, and why would asking the grandparent second be a mistake?",
  "activity": {
   "title": "MRO line-up",
   "materials": "Printed cards with one class name each, printed hierarchy sheets (four small diagrams, one invalid), whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Give each group of four or five a hierarchy sheet and a set of class-name cards.",
    "Groups physically arrange the cards on the desk in MRO order, writing the order on a sticky note.",
    "One hierarchy is inconsistent; groups that find it write 'TypeError at definition' and explain which rule breaks.",
    "Groups type the classes into a browser interpreter and print [k.__name__ for k in X.__mro__] to check.",
    "Each group presents one hierarchy and explains a placement that surprised them."
   ]
  },
  "discussion": [
   "Why might Python's designers prefer refusing to create a class over silently picking some order?",
   "When would you deliberately rely on super() reaching a sibling class?"
  ],
  "exit": [
   [
    "Give the MRO of class D(B, C) when B and C both inherit from A.",
    "D, B, C, A, object."
   ],
   [
    "class Q(P): and class R(P, Q): - what happens when the file runs?",
    "TypeError at the class R statement, because P is listed before its own subclass Q, so no consistent MRO exists."
   ],
   [
    "Inside B's method, for an object of class D(B, C), where does super() go?",
    "To C, the next class after B in D's MRO."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a template with blank boxes and the two rules printed beside it, and start with single inheritance before the diamond.",
   "Extend: Ask fast finishers to build a five-class hierarchy with two diamonds, predict the MRO, verify it, and then find one base reordering that makes it inconsistent."
  ]
 },
 {
  "t": "Isinstance(), issubclass(), and the is / is not operators versus ==",
  "objectives": [
   "Students will be able to predict the result of isinstance() and issubclass() calls in a small class hierarchy.",
   "Students will be able to distinguish identity (is) from equality (==) and predict both for lists and copies.",
   "Students will be able to explain why is None is correct and why is should not be used for numbers or strings.",
   "Students will be able to rewrite an exact type() comparison as an isinstance() check."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hold up two identical printed sheets and then one sheet two students share. Ask which pairs are 'equal' and which are 'the same', and record the vocabulary."
   ],
   [
    12,
    "Teach",
    "Live-code the Animal/Dog example. Ask students to call out each True or False before running it. Then show a = [1, 2]; b = [1, 2]; c = a and print ==, is and id() for each pair. End with the None rule."
   ],
   [
    15,
    "Activity",
    "Run 'Equal or same?' (see activity). Circulate and ask students to justify answers using the words identity, equality and subclass."
   ],
   [
    6,
    "Discuss",
    "Project a class without __eq__ and ask why two instances with the same attributes are not equal. Ask how they would fix it."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions; read answers aloud and clarify misconceptions."
   ]
  ],
  "warmup": "Two students each hold an identical copy of the lunch menu, and two other students share one menu. In which pair would a pen mark made by one person be seen by the other, and why?",
  "activity": {
   "title": "Equal or same?",
   "materials": "Printed cards with short code snippets (12 cards), sticky notes in two colors, student laptops with a browser-based Python interpreter, whiteboard.",
   "steps": [
    "Pairs receive a stack of snippet cards, each ending in an expression using isinstance, issubclass, == or is.",
    "For each card, pairs write their predicted result on a sticky note and stick it to the card.",
    "Pairs type each snippet into a browser interpreter to check, moving wrong predictions to a 'surprises' column on the whiteboard.",
    "For each surprise, the pair writes one sentence explaining the rule that caught them.",
    "The class reviews the surprises column together and groups them by rule."
   ]
  },
  "discussion": [
   "Why might a library prefer isinstance checks, or no type checks at all, over type(x) == SomeClass?",
   "When would you actually want to know that two names share one object rather than just equal values?"
  ],
  "exit": [
   [
    "With class Cat(Pet): and c = Cat(), what are isinstance(c, Pet) and issubclass(Pet, Cat)?",
    "True and False: Cat objects are Pets, but Pet is not a subclass of Cat."
   ],
   [
    "a = [5]; b = a; b.append(6). What is a, and what is a is b?",
    "a is [5, 6] and a is b is True, because b is another name for the same list."
   ],
   [
    "Which test is correct for a missing value: x == None or x is None, and why?",
    "x is None, because there is exactly one None object and identity cannot be changed by a custom __eq__."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column chart (object-and-class tools versus two-expression tools) and have them sort each snippet card into a column before predicting.",
   "Extend: Ask fast finishers to write a Point class with __eq__ and show, with id() output, two Points that are equal but not identical."
  ]
 },
 {
  "t": "Polymorphism and the __str__() method",
  "objectives": [
   "Students will be able to explain polymorphism as one method call producing class-specific behavior.",
   "Students will be able to trace a superclass method that calls an overridden method on self and predict the output.",
   "Students will be able to write a __str__ method that returns a string and predict what print() shows with and without it.",
   "Students will be able to describe duck typing and give an example using a built-in such as len()."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to name one instruction that works for many different devices or animals, such as 'power on' or 'speak'. List them on the board."
   ],
   [
    12,
    "Teach",
    "Live-code the Shape, Square and Circle example. Pause before running the loop and ask the class to predict each line. Then print a Point object without __str__, add __str__, and print again. Finally make __str__ return a number to show the TypeError."
   ],
   [
    15,
    "Activity",
    "Run 'One call, many forms' (see activity). Circulate and ask each pair to point to the exact line Python runs for each object."
   ],
   [
    6,
    "Discuss",
    "Ask how adding a new shape differs between the if-chain version and the polymorphic version. Mention __repr__ and printing lists."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions; review answers aloud."
   ]
  ],
  "warmup": "Your remote has one power button that works for the TV, the speaker and the game console. What does the remote need to know about each device for that to work?",
  "activity": {
   "title": "One call, many forms",
   "materials": "Printed cards showing a superclass and three subclasses (some methods overridden, some not), sticky notes, student laptops with a browser-based Python interpreter, whiteboard.",
   "steps": [
    "Pairs receive a card set describing a Vehicle superclass with describe() calling self.wheels(), plus Car, Bike and Trailer subclasses.",
    "For each subclass object, pairs write on a sticky note what describe() prints and which class's wheels() runs.",
    "Pairs add a __str__ to one subclass on paper and predict what print() shows for each object.",
    "Pairs type the code into a browser interpreter and check their predictions.",
    "Each pair adds one new subclass without editing describe() and explains why no other code changed."
   ]
  },
  "discussion": [
   "What are the risks of duck typing compared with requiring a shared superclass?",
   "Why might a team want every class in a project to define a readable __str__?"
  ],
  "exit": [
   [
    "Shape.report() returns str(self.area()). Square overrides area() to return 9. What does Square(3).report() use?",
    "Square's area(), returning 9, because lookup starts from the actual object's class."
   ],
   [
    "What does print(obj) show for a class with no __str__ or __repr__ of its own?",
    "The default text from object, like <__main__.ClassName object at 0x...>."
   ],
   [
    "def __str__(self): return 42 - what happens on print(obj)?",
    "TypeError, because __str__ must return a string."
   ]
  ],
  "differentiation": [
   "Support: Give students a lookup ladder diagram (object's class at the bottom, object at the top) and have them physically move a marker up it for each method call.",
   "Extend: Ask fast finishers to make len() work on their own Playlist class with __len__, and to explain why that is duck typing."
  ]
 },
 {
  "t": "List comprehensions, including if filters and nested loops",
  "objectives": [
   "Students will be able to rewrite a for-loop-and-append pattern as a list comprehension and back again.",
   "Students will be able to distinguish a trailing filter if from a leading conditional expression and predict result length.",
   "Students will be able to predict the order of results from comprehensions with multiple for clauses.",
   "Students will be able to explain why [[0] * n] * m shares rows and build an independent grid correctly."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a five-line loop that appends squares of even numbers. Ask students to say in one English sentence what the loop builds."
   ],
   [
    12,
    "Teach",
    "Translate the warm-up loop into a comprehension live. Add a filter, then a conditional expression, and ask how the length changes. Show two for clauses and their loop equivalent, then demonstrate the shared-row grid bug and its fix."
   ],
   [
    15,
    "Activity",
    "Run 'Loop to one-liner card match' (see activity). Circulate and ask pairs to read each comprehension aloud from the for outward."
   ],
   [
    6,
    "Discuss",
    "Ask when a comprehension becomes too clever and an ordinary loop is better. Mention set and dictionary comprehensions."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions; review answers together."
   ]
  ],
  "warmup": "Here is a loop that builds a list. Describe in one plain sentence what ends up in the list, without using the words for or append.",
  "activity": {
   "title": "Loop to one-liner card match",
   "materials": "Printed card set: 8 loop-version cards, 8 comprehension cards and 8 output cards; sticky notes; student laptops with a browser-based Python interpreter.",
   "steps": [
    "Pairs receive the shuffled cards and match each loop to its comprehension and its output.",
    "Two comprehension cards have no matching loop; pairs write the missing loop version on a sticky note.",
    "One output card is a grid built with list multiplication; pairs explain why its rows change together.",
    "Pairs verify three of their matches in a browser interpreter.",
    "Pairs swap card sets with a neighbor and check each other's matches."
   ]
  },
  "discussion": [
   "How do you decide whether a one-line comprehension or a multi-line loop is easier for a teammate to read?",
   "Why do you think Python 3 stopped comprehension loop variables from leaking into the surrounding code?"
  ],
  "exit": [
   [
    "What does [n for n in range(6) if n % 3 == 0] produce?",
    "[0, 3]."
   ],
   [
    "What does [(a, b) for a in 'xy' for b in 'pq'] produce?",
    "[('x', 'p'), ('x', 'q'), ('y', 'p'), ('y', 'q')], because the first for is the outer loop."
   ],
   [
    "g = [[0] * 2] * 2; g[0][0] = 1. What is g, and why?",
    "[[1, 0], [1, 0]], because both rows are the same inner list."
   ]
  ],
  "differentiation": [
   "Support: Provide a color-coded template where students highlight the expression, the for clause and the if clause in different colors before predicting output.",
   "Extend: Ask fast finishers to write a dictionary comprehension mapping each word in a sentence to its length, and a set comprehension of first letters."
  ]
 },
 {
  "t": "Lambda functions and functions that take a lambda as an argument",
  "objectives": [
   "Students will be able to write a lambda with zero, one or several parameters and state what it returns.",
   "Students will be able to identify invalid lambdas that contain statements such as return or assignment.",
   "Students will be able to trace a higher-order function that receives a lambda by substituting arguments.",
   "Students will be able to use key= with sorted(), min() and max() and predict the result."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a list of three (name, age) tuples and ask: if Python sorts this, what does it compare first? How could we tell it to compare ages?"
   ],
   [
    12,
    "Teach",
    "Write def double(x): return x * 2 and turn it into a lambda on the board. Show invalid versions with return and =. Live-code apply(f, value), passing a lambda, len and a def function. Finish with sorted, min and max using key=."
   ],
   [
    15,
    "Activity",
    "Run 'Be the sorter' (see activity). Circulate and ask each group to say aloud the key value of each card."
   ],
   [
    6,
    "Discuss",
    "Discuss when to name a function with def instead of assigning a lambda, and preview closures."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions; review answers."
   ]
  ],
  "warmup": "If you asked a friend to sort a stack of library books, what one-sentence instruction would you give so they sort by page count instead of by title?",
  "activity": {
   "title": "Be the sorter",
   "materials": "Printed cards, each showing one tuple such as ('kim', 17, 88); printed lambda cards such as key=lambda s: s[2]; whiteboard; student laptops with a browser-based Python interpreter.",
   "steps": [
    "Groups of three receive six tuple cards and a stack of lambda cards.",
    "One student draws a lambda card and reads it aloud; the group writes each tuple's key value on a sticky note on that card.",
    "The group arranges the tuple cards in sorted order, then answers what min() and max() would return with that key.",
    "Groups check two arrangements by typing them into a browser interpreter.",
    "One lambda card is invalid (contains return); groups must spot it and rewrite it."
   ]
  },
  "discussion": [
   "Why does Python allow conditional expressions but not if statements inside a lambda?",
   "What makes a higher-order function like sorted() more flexible than writing a separate sort for each field?"
  ],
  "exit": [
   [
    "What does (lambda a, b=10: a + b)(5) return?",
    "15, because b uses its default of 10."
   ],
   [
    "Is lambda x: y = x valid? Why or why not?",
    "No. Assignment is a statement, and a lambda body must be a single expression."
   ],
   [
    "What does max([(1, 'z'), (3, 'a')], key=lambda p: p[1]) return?",
    "(1, 'z'), because 'z' is the larger key, and max returns the whole tuple."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a substitution table with columns item, key expression, key value, and have them fill it in before sorting.",
   "Extend: Ask fast finishers to sort tuples by two keys at once using key=lambda t: (t[1], t[0]) and explain how tuple comparison makes it work."
  ]
 },
 {
  "t": "Map() and filter(), and the fact that they return one-shot iterators",
  "objectives": [
   "Students will be able to predict the output of map() and filter() calls wrapped in list().",
   "Students will be able to explain that map and filter return lazy, one-shot iterators and diagnose bugs caused by exhaustion.",
   "Students will be able to use map with multiple iterables and filter with None and predict the results.",
   "Students will be able to convert between map/filter calls and equivalent list comprehensions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hand out a short roll of raffle tickets to a volunteer. Ask them to tear off all tickets, then ask for one more. Ask the class what this has to do with code."
   ],
   [
    12,
    "Teach",
    "Live-code map and filter with lambdas and built-ins. Print a map object directly, then list() it twice to show exhaustion. Show filter(None, ...) and map with two lists of different lengths."
   ],
   [
    15,
    "Activity",
    "Run 'Find the vanished data' (see activity). Circulate and ask each pair to point to the exact line that consumes the iterator."
   ],
   [
    6,
    "Discuss",
    "Compare map/filter with comprehensions and discuss when laziness helps, such as with huge files."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions; review answers."
   ]
  ],
  "warmup": "A dispenser gives out one ticket each time you pull. After you have pulled every ticket, what happens on the next pull, and how could you keep a record of all the tickets?",
  "activity": {
   "title": "Find the vanished data",
   "materials": "Printed bug cards (six short scripts, each with a map or filter exhaustion bug or a distractor that is correct), sticky notes, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Pairs read each bug card and mark on a sticky note the line where the iterator is first consumed.",
    "Pairs predict the program's actual output and write it beside the card.",
    "Pairs run each script in a browser interpreter to confirm.",
    "Pairs rewrite each buggy script with the smallest fix, usually storing a list.",
    "Two cards are correct as written; pairs must identify them and explain why."
   ]
  },
  "discussion": [
   "When could lazy evaluation save a program from running out of memory?",
   "Do you find map/filter or comprehensions easier to read, and would that change with longer functions?"
  ],
  "exit": [
   [
    "What does print(list(map(lambda x: x + 1, [1, 2, 3]))) show?",
    "[2, 3, 4]."
   ],
   [
    "f = filter(lambda c: c > 'm', 'zap'); list(f); what is list(f) the second time?",
    "[], because the filter object was exhausted by the first list()."
   ],
   [
    "What does list(map(max, [1, 9], [5, 2], [3, 3])) produce?",
    "[5, 9], because map passes one item from each list to max: max(1, 5, 3) and max(9, 2, 3)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a tracing grid with one row per input item and columns for function result and kept or not, filled in before writing the output list.",
   "Extend: Ask fast finishers to use next() on a map object partway, then predict what list() returns afterward, and explain the result."
  ]
 },
 {
  "t": "Closures: inner functions that remember variables from an enclosing scope, and late binding",
  "objectives": [
   "Students will be able to explain how an inner function accesses enclosing variables using the LEGB rule.",
   "Students will be able to write a closure factory and predict the results of calling the functions it returns.",
   "Students will be able to use nonlocal correctly and explain the UnboundLocalError that occurs without it.",
   "Students will be able to identify late binding in loop-created functions and fix it with a default argument."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write the number 7 on the whiteboard and hand a student a note saying 'read the number on the board'. Change the number to 9, then ask the student to read the note. Ask what the note remembered."
   ],
   [
    12,
    "Teach",
    "Live-code make_multiplier and show double and triple. Build counter() without nonlocal to show UnboundLocalError, then add nonlocal. Finish with the loop of lambdas printing [2, 2, 2] and the i=i fix."
   ],
   [
    15,
    "Activity",
    "Run 'Closure detectives' (see activity). Circulate and ask each pair when each variable is looked up."
   ],
   [
    6,
    "Discuss",
    "Ask where closures appear in real code, such as callbacks and decorators, and compare nonlocal with global."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions; review answers."
   ]
  ],
  "warmup": "If I give you a note that says 'use the number on the board' and then I change the board, what number will you use when you finally read the note?",
  "activity": {
   "title": "Closure detectives",
   "materials": "Printed case cards (eight short closure snippets, some with late-binding or nonlocal bugs), sticky notes, whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Pairs read each case card and write the predicted output on a sticky note.",
    "For each card, pairs label every variable the inner function uses as Local, Enclosing, Global or Built-in.",
    "Pairs run each snippet in a browser interpreter and mark any wrong predictions.",
    "For the buggy cards, pairs write the smallest fix: a default argument, a nonlocal line, or removing parentheses from a return.",
    "Each pair presents one fixed case to the class."
   ]
  },
  "discussion": [
   "Why might a closure with nonlocal be preferable to a global variable for keeping a counter?",
   "Late binding causes bugs in loops, but when could looking up the current value at call time be exactly what you want?"
  ],
  "exit": [
   [
    "def make_adder(n): return lambda x: x + n. What is make_adder(4)(6)?",
    "10."
   ],
   [
    "fs = [lambda: k for k in 'ab']. What is fs[0]()?",
    "'b', because both lambdas read k after the loop ended."
   ],
   [
    "What one line makes an inner function's total += 1 update the enclosing total?",
    "nonlocal total, placed before the assignment inside the inner function."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a scope diagram with nested boxes (built-in, global, enclosing, local) and have them place each variable in its box before tracing.",
   "Extend: Ask fast finishers to write a function that returns two closures sharing one nonlocal counter, one that increments and one that resets, and explain why they share state."
  ]
 },
 {
  "t": "Generators: yield, next(), and StopIteration",
  "objectives": [
   "Students will be able to trace a generator function through successive next() calls, including when its body starts running.",
   "Students will be able to explain when StopIteration is raised and how for loops and list() handle it.",
   "Students will be able to distinguish generator expressions from list comprehensions in memory use and reusability.",
   "Students will be able to justify using a generator for large or infinite data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if a file is far bigger than your computer's memory, how could a program still count its error lines? Collect ideas."
   ],
   [
    12,
    "Teach",
    "Live-code countdown(3). Call it and show that nothing prints, then call next() repeatedly until StopIteration. Loop over a fresh generator with for, then loop again over the same object to show it is exhausted. Show a generator expression inside sum()."
   ],
   [
    15,
    "Activity",
    "Run 'Human generator' (see activity). Circulate and ask the 'generator' students what local variables they are remembering."
   ],
   [
    6,
    "Discuss",
    "Compare memory use of a list versus a generator for a million values and discuss next() with a default."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions; review answers."
   ]
  ],
  "warmup": "Your file has more lines than your computer has memory. How could you still find every line that contains the word ERROR?",
  "activity": {
   "title": "Human generator",
   "materials": "Printed generator scripts (three short generator functions), index cards, a small object to pass as the next() token, whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "In groups of four, one student acts as the generator holding the printed function; one is the caller holding the next() token.",
    "Each time the caller hands over the token, the generator student executes lines until a yield, writes the yielded value on an index card, and stops, noting their position.",
    "A recorder writes each value and any printed output on the whiteboard; when the function ends, the generator student says StopIteration.",
    "The group predicts what list() would return for a fresh generator, then checks it in a browser interpreter.",
    "Groups swap roles and repeat with a generator that contains a return value."
   ]
  },
  "discussion": [
   "What kinds of real programs benefit from producing data one item at a time rather than all at once?",
   "Why do you think Python made a for loop hide StopIteration instead of showing it as an error?"
  ],
  "exit": [
   [
    "def gen(): print('go'); yield 5. What prints when you run g = gen() alone?",
    "Nothing; the body does not start until next(g) or a for loop."
   ],
   [
    "After two yields have been consumed from a generator with exactly two yields, what does next() do?",
    "It raises StopIteration."
   ],
   [
    "Why does sum(x for x in range(10**6)) use little memory?",
    "The generator expression produces one value at a time instead of building a million-item list."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a trace table with columns call number, line where execution resumes, value yielded, and variables, to fill in for countdown(3).",
   "Extend: Ask fast finishers to write an infinite generator of even numbers and use next() in a loop to take the first five without using list()."
  ]
 },
 {
  "t": "File I/O: open() modes (r, w, a, x, b, t, +), text versus binary",
  "objectives": [
   "Students will be able to state, for each of r, w, a and x, whether the file must exist and whether content is erased.",
   "Students will be able to explain the effect of adding + to a mode and predict the outcome of r+, w+ and a+.",
   "Students will be able to distinguish text and binary mode by the types they read and write and by line-ending translation.",
   "Students will be able to choose the correct mode for a described file task."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Tell the story of a log file wiped by the wrong mode letter. Ask students to guess which letter did it and why a single letter could be so dangerous."
   ],
   [
    12,
    "Teach",
    "Draw a table with columns must exist, erases content, creates if missing. Fill it in with the class for r, w, a, x, then add a + row. Live-code the notes.txt example and show the bytes output from 'rb'. Show TypeError from writing str to 'wb'."
   ],
   [
    15,
    "Activity",
    "Run 'Mode match-up' (see activity). Circulate and ask groups to justify each mode using the three questions."
   ],
   [
    6,
    "Discuss",
    "Ask when 'x' is better than 'w' and why images need binary mode."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions; review answers."
   ]
  ],
  "warmup": "A one-letter typo in a script just emptied a week of log entries. What do you think that letter was, and what letter should it have been?",
  "activity": {
   "title": "Mode match-up",
   "materials": "Printed scenario cards (ten file tasks, such as add a line to a log, copy a photo, never overwrite a report), printed mode cards (r, w, a, x, r+, w+, a+, rb, wb, ab), whiteboard, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Groups of three spread out the mode cards and receive the scenario cards face down.",
    "Groups turn over each scenario and place the best mode card on it, writing a one-line justification on a sticky note.",
    "For two scenarios of their choice, groups write and run a short open() test in a browser interpreter to check behavior with an existing and a missing file.",
    "Groups compare answers with a neighboring group and resolve disagreements using the three questions.",
    "The teacher reveals the intended answers and discusses any scenario with two defensible choices."
   ]
  },
  "discussion": [
   "Why might Python make reading the default mode instead of writing?",
   "What could go wrong if a program relies on the platform's default text encoding?"
  ],
  "exit": [
   [
    "Which mode creates a file if missing and keeps existing content, writing at the end?",
    "'a'."
   ],
   [
    "A file contains 100 lines. It is opened with 'w+' and immediately closed. How many lines remain?",
    "None; 'w+' truncates the file when it is opened."
   ],
   [
    "What type does reading return in 'r' mode versus 'rb' mode?",
    "str in 'r' (text) mode and bytes in 'rb' (binary) mode."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed three-question checklist (must it exist, is it erased, str or bytes) to fill in for each mode before choosing.",
   "Extend: Ask fast finishers to show line-ending translation by writing a file in text mode and reading it back in binary mode, then explain what they would expect on Windows."
  ]
 },
 {
  "t": "Stream handles and the predefined streams sys.stdin, sys.stdout, sys.stderr",
  "objectives": [
   "Students will be able to define a stream and a stream handle and relate them to open().",
   "Students will be able to identify sys.stdin, sys.stdout and sys.stderr and state which built-ins use each.",
   "Students will be able to redirect print() output to standard error or a file with the file= argument.",
   "Students will be able to explain why separating stdout and stderr matters when output is redirected."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a printed CSV file with a warning message stuck in the middle of the data. Ask students how it got there and how it could have been prevented."
   ],
   [
    12,
    "Teach",
    "Draw a program box with three arrows: stdin in, stdout and stderr out. Live-code print, sys.stdout.write and print with file=sys.stderr. If a terminal is available, show python script.py > out.txt and point out that the stderr line still appears."
   ],
   [
    15,
    "Activity",
    "Run 'Route the message' (see activity). Circulate and ask students what would end up in the redirected file."
   ],
   [
    6,
    "Discuss",
    "Discuss pipes between programs and why tracebacks go to stderr."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions; review answers."
   ]
  ],
  "warmup": "A data file arrived with an error message printed in the middle of the numbers. How might that have happened, and where should the message have gone instead?",
  "activity": {
   "title": "Route the message",
   "materials": "Printed message cards (twelve lines a program might output, such as data rows, warnings, prompts and tracebacks), three labeled paper trays or whiteboard columns (stdin, stdout, stderr), student laptops with a browser-based Python interpreter.",
   "steps": [
    "Groups sort each message card into the stream it should use, writing the Python line that would produce it on the back.",
    "Groups then imagine the program is run with stdout redirected to a file and list what ends up in the file and what stays on screen.",
    "Groups test two of their lines in a browser interpreter, using print(..., file=sys.stderr).",
    "Groups swap card sets with another group and review each other's routing.",
    "The class discusses any card that could reasonably go to more than one stream."
   ]
  },
  "discussion": [
   "If both stdout and stderr appear on the same screen by default, why bother keeping them separate?",
   "What problems could occur if a program closed sys.stdout partway through?"
  ],
  "exit": [
   [
    "Which stream does print() use by default, and which does input() read from?",
    "print() writes to sys.stdout; input() reads from sys.stdin."
   ],
   [
    "Write the line that prints 'disk low' to standard error.",
    "print('disk low', file=sys.stderr), with import sys earlier."
   ],
   [
    "A program's output is redirected to a file. Where do its stderr messages go?",
    "They still appear on the screen by default, because only stdout was redirected."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the three-arrow diagram as a handout with built-ins (print, input, tracebacks) to label on the correct arrow.",
   "Extend: Ask fast finishers to write a function log(msg, error=False) that sends messages to stdout or stderr, and to explain how readline() differs from input()."
  ]
 },
 {
  "t": "Read(), readline(), readlines(), write(), readinto() with bytearray, close() and with",
  "objectives": [
   "Students will be able to predict the return values of read(), read(n), readline() and readlines(), including at end of file.",
   "Students will be able to use write() correctly, including adding newlines and interpreting its return value.",
   "Students will be able to explain how readinto() fills a bytearray and what its return value means.",
   "Students will be able to justify using with to guarantee files are closed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: when you finish reading a book, how do you know you have reached the end? How might a program know? Collect answers."
   ],
   [
    12,
    "Teach",
    "Live-code the data.txt example, pausing before each print for predictions. Show a blank line returning '\\n'. Demonstrate readinto() with a small bytearray. Show ValueError from reading a closed file and how with prevents leaks."
   ],
   [
    15,
    "Activity",
    "Run 'Bookmark tracing' (see activity). Circulate and ask each pair where the bookmark sits after each call."
   ],
   [
    6,
    "Discuss",
    "Discuss why end of file is not an exception and when readinto() is worth using."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions; review answers."
   ]
  ],
  "warmup": "When you finish reading a book, how do you know you have reached the end? How do you think a program reading a file knows?",
  "activity": {
   "title": "Bookmark tracing",
   "materials": "Printed file contents cards (short text files shown with visible newline markers), printed method-sequence cards, a paper clip per pair to act as the bookmark, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Pairs place the paper clip at the start of a file contents card.",
    "For each method on the sequence card, pairs move the clip and write the exact return value, using repr() style with quotes and \\n.",
    "Pairs repeat with a sequence that includes a blank line and one that ends with read() at end of file.",
    "Pairs check their traces by running the sequences in a browser interpreter, creating the file first with write().",
    "Pairs write one new sequence for a neighbor to trace."
   ]
  },
  "discussion": [
   "Why might Python's designers have chosen an empty result rather than an exception to mark end of file?",
   "What could happen to data if a long-running program writes to a file but never closes it?"
  ],
  "exit": [
   [
    "A file contains 'x\\n\\ny\\n'. What do three readline() calls return?",
    "'x\\n', '\\n' and 'y\\n'."
   ],
   [
    "What does f.write('hello') return in text mode?",
    "5, the number of characters written."
   ],
   [
    "buf = bytearray(8); a file has 3 bytes. What does f.readinto(buf) return?",
    "3, the number of bytes actually read."
   ]
  ],
  "differentiation": [
   "Support: Provide file cards with each character in its own box, including a box for every newline, so students can move the bookmark one box at a time.",
   "Extend: Ask fast finishers to write a file-copy loop using readinto() and a 16-byte bytearray, then test it on a small text file opened in binary mode."
  ]
 },
 {
  "t": "Errno values (for example ENOENT, EACCES) on I/O errors",
  "objectives": [
   "Students will be able to match common errno constants (ENOENT, EACCES, EEXIST, EISDIR, ENOSPC) to their meanings.",
   "Students will be able to write an OSError handler that branches on e.errno using errno module constants.",
   "Students will be able to relate errno codes to OSError subclasses and order except clauses correctly.",
   "Students will be able to explain how to report I/O errors clearly without exposing sensitive details."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project two tracebacks, [Errno 2] and [Errno 13]. Ask students what a non-technical user would need to be told in each case."
   ],
   [
    12,
    "Teach",
    "Introduce OSError, the errno attribute and the errno module. Live-code the missing.txt handler, then trigger permission and existing-file cases. Show e.strerror, e.filename and os.strerror(). Map each code to its subclass on the board."
   ],
   [
    15,
    "Activity",
    "Run 'Error desk' (see activity). Circulate and ask groups which constant and which subclass apply to each ticket."
   ],
   [
    6,
    "Discuss",
    "Discuss what to show users versus what to log, and why raw numbers are unreliable."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions; review answers."
   ]
  ],
  "warmup": "A user sees '[Errno 13] Permission denied' and phones the help desk in a panic. What should the program have told them instead, and what should it have recorded for the support team?",
  "activity": {
   "title": "Error desk",
   "materials": "Printed help-desk ticket cards (ten short user complaints such as 'I picked a folder instead of a file'), printed errno constant cards, sticky notes, student laptops with a browser-based Python interpreter.",
   "steps": [
    "Groups of three act as a help desk and receive the ticket cards.",
    "For each ticket, the group selects the matching errno constant card and the matching OSError subclass, if one exists.",
    "The group writes a short, user-friendly message and a separate log line on sticky notes.",
    "Groups write one except OSError handler on paper that covers all their tickets with if and elif branches, then test parts of it in a browser interpreter by opening a missing file and a directory.",
    "Groups compare handlers with a neighbor and check the order of any except clauses."
   ]
  },
  "discussion": [
   "Why might a program want one OSError handler with errno checks instead of several subclass handlers?",
   "What information is safe to show an untrusted user, and what should stay in the logs?"
  ],
  "exit": [
   [
    "What does errno.EACCES mean, and which subclass corresponds to it?",
    "Permission denied; PermissionError."
   ],
   [
    "Why should code compare e.errno with errno.ENOENT instead of the number 2?",
    "Numeric values can differ between operating systems; the constant always has the right value."
   ],
   [
    "except OSError appears before except FileNotFoundError. Which runs for a missing file?",
    "The OSError clause, because it matches first; the subclass clause should come first."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column reference card listing each constant, its plain-English meaning and its subclass, to use while sorting tickets.",
   "Extend: Ask fast finishers to write a function that tries to open a list of paths and returns a dictionary counting how many failures fell under each errno constant name, using errno.errorcode to look up names."
  ]
 }
]);
