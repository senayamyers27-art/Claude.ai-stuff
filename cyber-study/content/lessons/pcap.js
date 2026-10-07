/* Lessons for PCAP – Certified Associate Python Programmer (PCAP-31-03): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("pcap", [
 {
  "t": "Import variants: import, import as, from … import, from … import *, and what each puts in the namespace",
  "hook": "It is your second week as a junior developer at Lantern Point Analytics, and Priya from the data team has messaged you a screenshot. Her report script worked yesterday. Today it crashes on the very first calculation with `NameError: name 'math' is not defined`. She swears she imported math, and she did: the top of the file now reads `import math as m`, because a teammate tidied it up overnight. A few lines further down, a different function quietly returns the wrong average, and nobody can say why. Both problems come from the same place: the import lines. What exactly did each of those lines put into the script, and what did they leave out?",
  "simple": "Think of your program as a desk with labeled drawers. Each label is a name, and behind it is the thing the name refers to. Importing a module is like bringing in a toolbox from another room, but each way of importing puts different labels on your desk. `import math` adds one label, `math`, and you reach each tool through it, like `math.sqrt`. `import math as m` adds only the label `m`. `from math import sqrt` puts the single tool `sqrt` on your desk and no toolbox label at all. `from math import *` dumps almost every tool onto your desk at once. If you ask for a label that is not on your desk, Python says it cannot find that name.",
  "body": [
   "A module is simply a file of Python code, and importing it lets you reuse the functions, classes and values it defines. The PCAP exam (Certified Associate Python Programmer, exam PCAP-31-03) cares less about the fact that you can import and more about exactly which names become available afterwards. Every module and script has its own namespace: a table that maps names to objects. Each import form adds different entries to the importing namespace, and many exam questions are really asking a simple thing in disguise: does this particular name exist at this particular moment?",
   "Start with the plain form. `import math` adds exactly one name, `math`, which refers to the module object. Everything inside the module must be qualified with that prefix: `math.pi`, `math.sqrt(2)`. Writing `sqrt(2)` on its own raises NameError, because `sqrt` was never placed in your namespace; it lives inside the module object, not beside it. This form is the clearest for a reader, since every call shows where the function came from.",
   "The aliased form changes only the label. `import math as m` loads the same module but binds it to the name `m`, and that is the only name it adds. The name `math` is not defined, so `math.pi` fails with NameError while `m.pi` works. This is precisely what broke Priya's script in the opening scene. Aliases are handy for long module names and are common in the wider ecosystem, for example `import numpy as np`, but the exam rule is strict: after `import X as Y`, only `Y` exists.",
   "The `from` form works the other way round. `from math import sqrt, pi` copies references to `sqrt` and `pi` directly into your namespace, so you call `sqrt(2)` without a prefix, but the name `math` is not defined at all. You can alias individual names too: `from math import sqrt as root` binds only `root`. Because these names land directly in your namespace, they can collide with your own. If you later write `pi = 3`, you have replaced the imported value. If you define your own `sqrt` and then import one, the import wins because it happened later. The rule is always the same: the last binding of a name wins, and Python gives no warning when one binding replaces another.",
   "The star form imports in bulk. `from math import *` copies every public name from the module into your namespace. Which names count as public follows two rules the exam expects you to know. If the module defines a list of strings called `__all__`, only the names in that list are imported. If there is no `__all__`, every top-level name that does not start with an underscore is imported, so a helper called `_cache` stays behind. Star imports are discouraged in real code because they hide where a name came from and can silently overwrite your own names, but you still need to predict exactly what they bring in.",
   "```python\nimport math as m\nprint(m.floor(2.7))      # 2\n# print(math.pi)         # NameError: math is not defined\n\nfrom math import pi\nprint(pi)                # 3.141592653589793\npi = 3\nprint(pi)                # 3 - your assignment replaced it\n```",
   "Trace that example name by name. The first line binds `m` only, so `m.floor` works and the commented-out `math.pi` would fail. The `from` line binds `pi` directly, and the assignment `pi = 3` rebinds the same name to a new integer. The module itself is untouched: `m.pi` is still 3.141592653589793, because you only changed which object your own label points to.",
   "Two more facts round this topic out. First, a module's code runs only on its first import in a process. Python stores loaded modules in a dictionary called `sys.modules`, and later imports of the same module, in any form, reuse that already-loaded module object instead of running the file again. Second, every import form executes the whole module file the first time, even `from mod import one_name`. Python cannot hand you one function without running the file that creates it, so any `print` calls at the top level of that module will appear even if you asked for a single name.",
   "When you meet an import question on the exam, slow down and list, line by line, which names each statement adds. Then check every later line against that list. Options that look perfectly reasonable often fail with NameError because they use the module name after an aliased import or after a `from` import, and options that look broken can work because a `from` import placed the bare name exactly where it was needed."
  ],
  "analogy": "Importing is like a library lending desk. `import math` hands you the whole labeled box, and you reach in each time (`math.sqrt`). `import math as m` hands you the same box with a new label stuck on, and the old label is gone. `from math import sqrt` takes one tool out and puts it straight on your desk, with no box. The analogy stops working in one place: Python does not copy the tool, it only gives your desk another label pointing at the same object.",
  "terms": [
   [
    "Namespace",
    "A mapping from names to objects; each module, function call and class has its own."
   ],
   [
    "Alias",
    "An alternative name given with as, for example import math as m, which binds only m."
   ],
   [
    "__all__",
    "A list of strings in a module naming what from module import * should import."
   ],
   [
    "Qualified name",
    "A name written with its module prefix, such as math.sqrt."
   ],
   [
    "sys.modules",
    "The dictionary of modules already loaded in this process; later imports reuse entries from it."
   ]
  ],
  "example": "A data script starts with from statistics import mean and later defines its own function called mean to handle missing values. Because the def comes after the import, every later call uses the local version, and the original import is shadowed without any warning.",
  "mistakes": [
   [
    "After import math as m, both math.pi and m.pi work.",
    "Only m is bound. The alias replaces the label rather than adding a second one, so math.pi raises NameError."
   ],
   [
    "from math import sqrt also makes math.sqrt available.",
    "The from form binds only the listed names. The name math is not defined unless you also write import math."
   ],
   [
    "from mod import * imports every name in the module.",
    "It skips names starting with an underscore, and if mod defines __all__, it imports only the names listed there."
   ],
   [
    "from mod import f runs only the code for f.",
    "The whole module file runs on its first import, whichever form you use; Python needs to execute the file to create f."
   ]
  ],
  "tryit": [
   [
    "Your script contains, in order: def floor(x): return 'mine', then from math import floor, then print(floor(2.7)). A teammate expects 'mine' to be printed because your def came first in the file. What actually prints, and why?",
    "It prints 2. The import is the later binding of the name floor, so it replaces your function. The last binding of a name always wins, and Python gives no warning."
   ],
   [
    "A module tools.py defines __all__ = ['load'] and also has top-level functions load, save and _check. Another file runs from tools import * and then calls save(). What happens?",
    "NameError. Because __all__ exists, the star import brings in only load. save is public by naming, but __all__ overrides the underscore rule. The caller would need from tools import save or import tools and tools.save()."
   ]
  ],
  "tip": "Ask which names each line adds. import m as x defines only x, never m; from m import f defines only f, never m. Many answer options that look fine fail with NameError for exactly this reason.",
  "check": [
   [
    "After import random as r, does print(random.random()) work?",
    "No. Only the alias r is defined, so random raises NameError; you must write r.random()."
   ],
   [
    "Which names does from mod import * skip when mod has no __all__?",
    "Names beginning with an underscore, such as _helper; all other top-level names are imported."
   ],
   [
    "If a module is imported twice in the same program, how many times does its top-level code run?",
    "Once. The second import finds the module already in sys.modules and reuses it."
   ]
  ]
 },
 {
  "t": "Qualifying names in nested modules and packages (package.subpackage.module.name)",
  "hook": "At Juniper Ridge Outfitters, the inventory code has grown from one file into a folder tree four levels deep. Marcus, who maintains the nightly stock report, moved a pricing function into `store/catalog/pricing/rules.py` and updated his import to `import store.catalog.pricing.rules`. The report now fails with `NameError: name 'rules' is not defined` on the line `rules.discount(item)`. He tries `import store.catalog.pricing.rules.discount` instead, and that fails differently, with ModuleNotFoundError. The function is right there in the file. It is 11 p.m., the report runs at midnight, and Marcus is staring at a dotted path that looks correct. What is Python actually expecting him to type?",
  "simple": "When a project gets big, its files are sorted into folders, and folders can sit inside other folders. Python lets you point to a function deep in that tree by writing the folder names joined with dots, like a street address: country, city, street, house, then the person inside. If you import using the full address, you must keep writing the full address every time you use it. If you want a shorter way to refer to it, you can give the house a nickname with `as`, or bring in just the part you need with `from`. One rule matters a lot: the plain `import` line must end at a file or folder, never at a function inside a file.",
  "body": [
   "Once a project grows past a few files, modules are grouped into packages. A package is a directory of modules, and a package can contain subpackages, which are simply packages inside packages. To reach an object deep inside that tree you use a dotted path that mirrors the directory structure. For a file `extra/good/best/sigma.py` that defines a function `funS()`, the fully qualified name is `extra.good.best.sigma.funS`. Each dot steps one level down: package, subpackage, sub-subpackage, module, and finally the object defined inside the module.",
   "How much of that path you must type depends entirely on how you imported. With `import extra.good.best.sigma`, Python binds only the top-level name `extra` in your namespace. It does not bind `sigma`, `best` or `good` as separate names. That means you must always write the full path: `extra.good.best.sigma.funS()`. This is exactly why Marcus saw a NameError for `rules`. It surprises people, but it is consistent: the import statement guarantees that every package along the path is loaded and attached as an attribute of its parent, so the chain of attribute lookups works when you start from `extra`.",
   "Aliasing is the first way to shorten the path. `import extra.good.best.sigma as sig` binds the name `sig` directly to the sigma module, so you call `sig.funS()`. In this form the name `extra` is not bound; the alias replaces the whole path with one name. This is often the most readable choice when a module sits deep in a tree and you call several of its functions.",
   "The `from` form lets you stop at any level you like. `from extra.good.best import sigma` binds `sigma`, so you write `sigma.funS()`. `from extra.good.best.sigma import funS` binds the function itself, so you write `funS()` with no prefix at all. In each case, only the name after `import` is added to your namespace; the names to the left of `import` in a `from` statement are not bound.",
   "There is one structural rule the exam loves to test. In the plain `import a.b.c` form, every component, including the last one, must be a package or a module. It can never be a function, class or variable. `import extra.good.best.sigma.funS` fails with ModuleNotFoundError, because Python tries to find a module or package named `funS` inside `sigma`, and `sigma` is a module, not a package. If you want the function by itself, you must use `from extra.good.best.sigma import funS`.",
   "```python\n# Directory tree (each package directory has __init__.py):\n# extra/\n#     good/\n#         best/\n#             sigma.py   -> def funS(): return 'sigma'\n\nimport extra.good.best.sigma\nprint(extra.good.best.sigma.funS())\n\nfrom extra.good.best.sigma import funS\nprint(funS())\n\nimport extra.good.best.sigma as sig\nprint(sig.funS())\n```",
   "For any of this to work, the top-level directory, here `extra`, must be findable. It has to sit inside one of the folders listed in `sys.path`, such as the folder containing your main script. You do not add the inner folders `good` or `best` to `sys.path`; Python walks down the tree itself using the dotted name. Traditionally each directory contains an `__init__.py` file marking it as a regular package, and that file runs when the package is first imported, so importing `extra.good.best.sigma` runs the `__init__.py` files of `extra`, `extra.good` and `extra.good.best`, in that order, before running `sigma.py`.",
   "It also helps to know what happens when you import less than you use. Suppose a script runs only `import extra.good` and later writes `extra.good.best.sigma.funS()`. Importing a package does not automatically import every subpackage and module beneath it, so unless something else, such as the package's own `__init__.py` or an earlier import elsewhere in the program, has already loaded `best` and `sigma`, the attribute lookup fails with AttributeError. The safe rule is to import the deepest module you need, by whichever form you prefer, rather than relying on a parent package to bring its children along. Notice too that a successful plain import of a deep path still binds only the top name, so writing the full path is not optional; it is the price of that form.",
   "A useful habit when reading exam code is to sketch the directory tree first, then check that each dotted name matches it exactly, including spelling and which level contains the function. Next, note which import form was used and therefore which single name was bound. Many wrong answers use a path that skips a level, swaps two folder names, puts the function name where a module should be, or uses a short name like `sigma` after an import that bound only `extra`."
  ],
  "analogy": "A dotted path is like a full postal address: country, city, street, house number, then the person who lives there. Writing `import extra.good.best.sigma` is like saving only the country in your address book, so every letter must carry the full address. An alias is a saved nickname for one house. The analogy stops working at the last step: you can import a house (a module) with plain import, but never a person (a function); for that you need from ... import.",
  "terms": [
   [
    "Package",
    "A directory of modules (and possibly subpackages) that Python can import by name."
   ],
   [
    "Subpackage",
    "A package nested inside another package, reached with a dot, such as extra.good."
   ],
   [
    "Fully qualified name",
    "The complete dotted path from the top package to an object, such as extra.good.best.sigma.funS."
   ],
   [
    "ModuleNotFoundError",
    "The exception raised when an import names a module or package Python cannot find, including when the last part of a plain import is a function."
   ]
  ],
  "example": "A team's code lives in company/reports/pdf/render.py. A new script that writes import company.reports.pdf.render must call company.reports.pdf.render.build(); switching to from company.reports.pdf import render lets it call render.build() instead.",
  "mistakes": [
   [
    "After import a.b.c, you can call c.func().",
    "Plain import binds only the top-level name a. You must write a.b.c.func(), or use import a.b.c as c, or from a.b import c."
   ],
   [
    "import pkg.module.function is a valid way to import a function.",
    "The last part of a plain import must be a module or package. Importing a function this way raises ModuleNotFoundError; use from pkg.module import function."
   ],
   [
    "Every subfolder of a package must be added to sys.path.",
    "Only the folder that contains the top-level package needs to be on sys.path. Python walks down to the subpackages using the dots."
   ],
   [
    "from a.b import c also makes a and a.b available as names.",
    "Only c is bound. The names to the left of import in a from statement are not added to your namespace."
   ]
  ],
  "tryit": [
   [
    "Your project has app/services/mail/sender.py with a function send(). A teammate writes import app.services.mail.sender as ms and then later calls app.services.mail.sender.send(). Will the second line work, and what would you suggest?",
    "It raises NameError, because the as form binds only ms and does not bind app. Either call ms.send(), or change the import to the plain form import app.services.mail.sender if the full path is preferred."
   ]
  ],
  "tip": "With plain import a.b.c you must use the full a.b.c prefix, and the last component must be a module, not a function or class. Questions often offer import a.b.func as a tempting wrong answer.",
  "check": [
   [
    "After import extra.good.best.sigma, which name is added to your namespace?",
    "Only extra; you reach the function through the full path extra.good.best.sigma.funS()."
   ],
   [
    "What must be true about sys.path for import extra.good.best.sigma to work?",
    "The directory that contains the top-level extra folder must be on sys.path; the inner folders do not need to be listed."
   ],
   [
    "Which import lets you call funS() with no prefix at all?",
    "from extra.good.best.sigma import funS, because it binds the function name directly."
   ]
  ]
 },
 {
  "t": "Dir() to list the names a module defines",
  "hook": "You are helping out at the Cedar Hollow Library coding club, and Leo, a high school volunteer, has just been handed a script that uses a module he has never seen. There is no internet in the back room today, and the printed documentation is somewhere in a box. Leo needs to know whether the module has a function for reading the operating system name, and he needs to know before the club starts in ten minutes. He opens the interactive shell and types the import, then stops. How can Python itself tell him what is inside that module, and what will the answer look like?",
  "simple": "`dir()` is Python's way of letting you peek inside something and read the labels. If you give it a module, it hands back a list of the names that module contains, such as its functions and settings, sorted in alphabetical order. It is like opening a toolbox and reading the names printed on every tool. If you call `dir()` with nothing inside the parentheses, it shows the labels on your own desk: the names your program has defined so far. That makes it a quick way to check what an import really added. It only returns names as text; it does not run anything.",
  "body": [
   "The built-in function `dir()` lets you look inside a module, object or class and see which names it holds. It returns a list of strings, sorted alphabetically. Think of it as a discovery tool. When you import a module you have never used, `dir()` shows you what it offers without opening any documentation, and on the PCAP exam it is the tool questions use to check whether you understand which names an import created.",
   "Called with a module object, `dir(math)` returns every attribute name defined in that module. That includes dunder names, short for double-underscore names, such as `__name__`, `__doc__` and `__file__` (where the module defines a file), alongside the functions you expect, such as `ceil` and `sqrt`. The module must be available under a name you can pass in. After `import math` you call `dir(math)`. After `import math as m` you call `dir(m)`, because `math` is not bound. After `from math import sqrt`, you cannot call `dir(math)` at all; the name `math` does not exist in your namespace and Python raises NameError.",
   "```python\nimport math\nfor name in dir(math):\n    if not name.startswith('_'):\n        print(name, end=' ')\n# acos acosh asin ... ceil ... sqrt tan tanh tau trunc ulp\n```",
   "That loop shows a common pattern. Because `dir()` returns plain strings, you can filter them with ordinary string methods. Skipping names that start with an underscore hides the special attributes and leaves the public functions and constants, which is usually what you want when exploring. The exact list you see depends on the Python version, which is why exam questions focus on the type and behavior of `dir()` rather than on a complete listing.",
   "Called with no argument, `dir()` lists the names in the current local scope. At the top level of a script or the interactive shell, that means your module's global names, so it is an easy way to confirm what an import added. Run `dir()`, then `import math as m`, then `dir()` again, and you will see `m` appear but not `math`. Try `from math import *` and the list suddenly grows by dozens of names at once, which makes the namespace-pollution argument against star imports concrete. Inside a function, `dir()` with no argument shows that function's local names instead, such as its parameters.",
   "The ordering of the list sometimes puzzles people. It is sorted by character code, and uppercase letters come before the underscore character, which comes before lowercase letters. So names beginning with capitals appear first, then names beginning with an underscore (including the dunder names), then lowercase names. You do not need to memorize this for the exam, but it explains why, in `dir(math)`, `__doc__` appears before `acos`, and why a module constant written in capitals, such as `MAX_SIZE`, would appear before both.",
   "Here is a small worked session that ties the ideas together. In a fresh interactive shell, `dir()` returns a short list such as `['__annotations__', '__builtins__', '__doc__', '__loader__', '__name__', '__package__', '__spec__']`; the exact entries can vary by version and tool. After `import platform as pf`, a second call shows the same list plus `'pf'`. Calling `len(dir(pf))` tells you roughly how large the module is, and `'system' in dir(pf)` returns True, which is a quick way to confirm a name before you rely on it. None of these calls execute any of the module's functions; `dir()` only reads names, so it is safe to use on anything you can name.",
   "`dir()` works on any object, not only on modules. `dir('abc')` lists string methods such as `upper` and `split`, `dir([])` lists list methods such as `append` and `sort`, and `dir(SomeClass)` lists the class's attributes, including the ones it inherits. This makes it a natural companion to `help()`, which prints documentation, and to `hasattr()`, which tests whether a single name exists on an object.",
   "Remember the key limitation: `dir()` gives you names, not objects. The result is a list of strings. To get the actual object behind one of those names, you would use `getattr(module, name)`, for example `getattr(math, 'sqrt')(16)` returns `4.0`. On the exam, an option that treats the result of `dir()` as a list of functions, or as a dictionary of name-object pairs, is wrong."
  ],
  "analogy": "Calling `dir()` on a module is like reading the index at the back of a book. It tells you every topic the book covers, in alphabetical order, but it does not give you the content itself; for that you turn to the page, which in Python means `getattr()` or a qualified name. Calling `dir()` with no argument is like reading the index of your own notebook to see what you have written so far.",
  "terms": [
   [
    "dir()",
    "Built-in that returns a sorted list of attribute names for an object, or of the current scope when called without arguments."
   ],
   [
    "Dunder name",
    "A name with double underscores on both sides, such as __name__, used for special attributes."
   ],
   [
    "Local scope",
    "The set of names defined in the currently executing block; dir() with no argument lists it."
   ],
   [
    "getattr()",
    "Built-in that returns the object bound to a given attribute name, such as getattr(math, 'pi')."
   ]
  ],
  "example": "While exploring the platform module in IDLE, you run import platform and then print(dir(platform)). Scanning the list, you spot python_implementation and system, and try each one to see what it returns on your machine.",
  "mistakes": [
   [
    "dir(math) returns a dictionary of names and values.",
    "It returns a sorted list of strings. To get the object for a name, use getattr(math, name) or a qualified name."
   ],
   [
    "After from math import sqrt, dir(math) lists the math functions.",
    "The name math is not bound by a from import, so dir(math) raises NameError."
   ],
   [
    "dir() only works on modules.",
    "It works on any object, such as strings, lists and classes, and with no argument it lists the current scope."
   ],
   [
    "dir(module) hides the dunder names.",
    "It includes them, such as __name__ and __doc__; you filter them out yourself if you want only public names."
   ]
  ],
  "tryit": [
   [
    "A student runs dir() in a fresh interactive shell, then types import os.path as osp, then runs dir() again. She expects to see both os and osp in the second list. What will she actually see, and why?",
    "She will see osp but not os. The as form binds only the alias, so osp is the single new name in the current scope."
   ]
  ],
  "tip": "dir(x) needs a name that actually exists. After from math import sqrt, dir(math) raises NameError; after import math as m, you must call dir(m).",
  "check": [
   [
    "What type does dir(math) return?",
    "A list of strings, sorted alphabetically, naming the module's attributes."
   ],
   [
    "How can you use dir() to see the effect of import os as o?",
    "Call dir() with no argument before and after; the name o appears and os does not."
   ],
   [
    "How do you turn a name returned by dir(math) into the actual object?",
    "Pass the module and the name to getattr(), for example getattr(math, 'floor')."
   ]
  ]
 },
 {
  "t": "Sys.path: where Python searches for modules and how to extend it at runtime",
  "hook": "On a quiet Tuesday at Bluewater Clinic's IT office, Ana is writing a small script to pick a random volunteer for the weekend help desk. She saves it as `random.py` in her tools folder and runs it. It crashes with `AttributeError: module 'random' has no attribute 'choice'`. She has used `random.choice` a hundred times. Meanwhile, her colleague Dev cannot import a shared helpers module that sits in a folder on the same drive, even though he can see the file in the file manager. Two different symptoms, one shared cause: the list of places Python looks when it imports. Where does Python search, and in what order?",
  "simple": "When you tell Python to import a module, it has to go and find the file, and it searches a list of folders in order, stopping at the first match. That list is called `sys.path`. Usually the first folder it checks is the one your script is in, then some folders you or your system set up, then the standard library that comes with Python, and then the folder where extra installed packages live. Because Python stops at the first match, a file of yours with the same name as a built-in module can hide the real one. You can also add a folder to the list while your program runs, which lasts only until the program ends.",
  "body": [
   "When you write `import something`, Python has to find a module called `something`. It first checks the modules it has already loaded in this process, which are kept in the dictionary `sys.modules`, and its built-in modules that are compiled into the interpreter. If neither has it, Python searches a list of directories stored in `sys.path`. Understanding that list explains most ModuleNotFoundError messages, and it is a named objective on the PCAP exam.",
   "`sys.path` is an ordinary Python list of strings, available after `import sys`. Its first entry is normally the directory containing the script you ran, or an empty string meaning the current directory when you work in the interactive shell. After that come any directories named in the `PYTHONPATH` environment variable, then the standard library locations, and then the `site-packages` directory where installed third-party packages live. Python checks the entries in order and uses the first match it finds, so earlier entries win. That is why Dev's helpers module was invisible: its folder was simply not on the list.",
   "```python\nimport sys\nfor entry in sys.path:\n    print(entry)\n\nsys.path.append('/home/me/mylibs')   # search this folder last\nimport helpers                         # now found if helpers.py is there\n```",
   "Because `sys.path` is a list, you can change it while the program runs, using normal list methods. `sys.path.append(folder)` adds a directory at the end, so it is searched last, after the standard library and installed packages. `sys.path.insert(0, folder)` puts it first, so its modules take priority over everything else, including the standard library. Two conditions apply. The change must happen before the `import` statement that needs it, because Python searches at the moment the import runs. And the change lasts only for the current process: it is not saved anywhere, and the next run starts with the default list again.",
   "Windows paths need extra care in string literals. A backslash starts an escape sequence, so a path like `'C:\\new\\libs'` would contain a newline character where `\\n` appears. Write each backslash twice, as in `'C:\\\\Users\\\\me\\\\libs'`, or use forward slashes, which Python accepts on Windows too. Questions sometimes show a path with single backslashes to see whether you notice.",
   "The first-match rule has a practical side effect called shadowing. If you save your own script as `random.py` in your project folder, then `import random` in that folder may load your file instead of the standard library module, because the script's directory is searched before the standard library. Your file has no `choice` function, so the symptom is exactly what Ana saw: an AttributeError such as `module 'random' has no attribute 'choice'`. The fix is to rename your file to something that does not clash, and delete any stale `__pycache__` copy of it so the old compiled version cannot be picked up.",
   "Two further details complete the picture. Python can also import from ZIP archives placed on `sys.path`; the archive's path is simply another entry in the list, and the exam occasionally mentions that a ZIP file is a valid search location. And because modules already in `sys.modules` are never searched for again, changing `sys.path` after a module has been loaded does not reload it or swap it for a different copy. If you add a folder after the import, the module you already have stays exactly as it was.",
   "In practice, diagnosing an import problem follows a short routine. Read the message first: `ModuleNotFoundError: No module named 'helpers'` means no entry on `sys.path` contained a match, while an AttributeError about a missing function in a module you know well hints that the wrong file was found. Next, print `sys.path` from inside the failing script, not from a different shell, because the first entry depends on where the script lives. Finally, after a successful import you can print the module's `__file__` attribute, for example `print(random.__file__)`, to see exactly which file was loaded. Had Ana done that, she would have seen the path of her own script instead of the standard library.",
   "When you face an import puzzle on the exam, ask three questions in order. Is the module already loaded? Which folders are on `sys.path`, and in what order? Was any change to `sys.path` made before the import line? Those three questions resolve nearly every scenario about missing modules, wrong modules and the effect of `append` versus `insert`."
  ],
  "analogy": "`sys.path` is like a list of shops you visit, in order, to buy one specific item. You stop at the first shop that has it, even if a better version is sold further down the list. Adding a shop with `append` puts it at the end of your route; `insert(0, ...)` makes it your first stop. The analogy is useful for shadowing too: if the first shop sells a fake with the right label, you leave with the fake.",
  "mnemonic": "Default search order, \"Some People Study Seriously\": Script folder, PYTHONPATH, Standard library, Site-packages.",
  "terms": [
   [
    "sys.path",
    "A list of directory strings that Python searches, in order, when importing a module."
   ],
   [
    "PYTHONPATH",
    "An environment variable whose directories are added to sys.path at startup."
   ],
   [
    "Shadowing",
    "When a module earlier on the search path hides a same-named module later on it."
   ],
   [
    "site-packages",
    "The directory where third-party packages installed with pip usually live."
   ],
   [
    "sys.modules",
    "The dictionary of already-loaded modules, checked before sys.path is searched."
   ]
  ],
  "example": "A student keeps shared helper modules in a folder outside every project. Instead of copying them, each script starts with import sys and sys.path.append to that folder, followed by import helpers, and the imports succeed only because the append comes first.",
  "mistakes": [
   [
    "sys.path.append() makes your folder the first place Python looks.",
    "append adds to the end, so the folder is searched last. Use sys.path.insert(0, folder) to search it first."
   ],
   [
    "Changing sys.path in a script permanently changes it for future runs.",
    "The change lives only in the current process. Each run starts with the default list again."
   ],
   [
    "Adding a folder to sys.path after importing a module reloads that module from the new folder.",
    "Modules already in sys.modules are reused and not searched for again, so the change has no effect on them."
   ],
   [
    "Naming your file random.py is harmless because the real module is built in.",
    "random is a standard library file, and the script's folder comes first on sys.path, so your file shadows it."
   ]
  ],
  "tryit": [
   [
    "Your script does import util on line 2 and sys.path.append('/shared/libs') on line 5, where util.py lives in /shared/libs. Running it gives ModuleNotFoundError. A coworker suggests changing append to insert(0, ...). Will that fix it? What will?",
    "No. The problem is order in the code, not position in the list: the import runs before the folder is added. Move the sys.path change above the import; then either append or insert works, as long as nothing earlier on the path also has a util module."
   ],
   [
    "A colleague wants his project's own json.py to be used instead of the standard library json module in one script. Which sys.path change would make that happen, and is it a good idea?",
    "His project folder must be searched before the standard library, which is already true if json.py is next to the script, or can be forced with sys.path.insert(0, folder). It is a poor idea, because shadowing a standard module confuses other code; renaming the file is safer."
   ]
  ],
  "tip": "append() searches the new folder last, insert(0, ...) searches it first, and neither change survives past the current run. The modification must come before the import that relies on it.",
  "check": [
   [
    "What is usually the first entry in sys.path when you run a script?",
    "The directory containing that script, so modules next to it are found before the standard library."
   ],
   [
    "Why might import random fail to find random.choice in your project?",
    "A file named random.py in your project folder shadows the standard library module because its folder is searched first."
   ],
   [
    "What kind of object is sys.path?",
    "An ordinary list of strings, which is why list methods such as append and insert can change it."
   ]
  ]
 },
 {
  "t": "Math module: ceil(), floor(), trunc(), factorial(), hypot(), sqrt()",
  "hook": "Friday afternoon at Tallgrass Bakery Supply, and Rosa in the warehouse sends you a ticket: the packing script says 24 cupcakes need 4 boxes of 6, which is right, but 25 cupcakes also need only 4 boxes, and one cupcake keeps getting left on the counter. Worse, the refund report shows a balance of -2 dollars where finance expected -3 after rounding a negative adjustment down. You open the code and find `int()` in one place, `math.trunc()` in another, and `round()` in a third. They all seem to turn decimals into whole numbers. So why do they disagree, and which one did each line actually need?",
  "simple": "The `math` module is a set of ready-made math tools. Several of them turn a decimal number into a whole number, but they go in different directions. `floor` always goes down, `ceil` (short for ceiling) always goes up, and `trunc` just chops off everything after the decimal point, which moves the number toward zero. For positive numbers chopping and going down look the same, but for negative numbers they differ. `sqrt` gives a square root, `hypot` gives the long side of a right triangle, and `factorial` multiplies all whole numbers from 1 up to the number you give it. Think of buying egg boxes: if you have 13 eggs and boxes of 12, you need to round up, not down.",
  "body": [
   "The `math` module provides mathematical functions for real numbers. The PCAP exam picks out a handful and tests the details: what each returns, what type it returns, and how it behaves with negative numbers and invalid input. Import it with `import math` and call functions as `math.name()`, or bring individual names in with a `from` import if you prefer shorter calls.",
   "Three functions turn a float into an integer, and they differ only in the direction they move along the number line. `math.floor(x)` returns the largest integer less than or equal to x, so it always moves down: `floor(2.7)` is 2 and `floor(-2.7)` is -3. `math.ceil(x)`, the ceiling, returns the smallest integer greater than or equal to x, so it always moves up: `ceil(2.1)` is 3 and `ceil(-2.7)` is -2. `math.trunc(x)` simply chops off the fractional part, which moves toward zero: `trunc(2.7)` is 2 and `trunc(-2.7)` is -2. In Python 3 all three return an `int`, not a float, so `floor(2.7)` prints `2`, not `2.0`.",
   "A quick way to keep them straight is to compare them in pairs. For positive numbers, `floor` and `trunc` agree, because moving down and moving toward zero are the same direction. For negative numbers, `ceil` and `trunc` agree, because moving up and moving toward zero are the same direction. If the input is already a whole number, such as `5.0` or `-3.0`, all three return the same integer. The built-in `int()` applied to a float behaves like `trunc`, which is why it explains Rosa's mysterious -2.",
   "```python\nimport math\nfor x in (2.5, -2.5):\n    print(math.floor(x), math.ceil(x), math.trunc(x), round(x))\n# 2 3 2 2\n# -3 -2 -2 -2\n```",
   "Notice `round()` in that example. It is a built-in function, not part of `math`, and when a value is exactly halfway between two integers it rounds to the nearest even integer. This is often called banker's rounding, and it is why `round(2.5)` is 2 and `round(3.5)` is 4. Exam options sometimes mix `round` in alongside the math functions to see whether you confuse them, so remember that `math.round` does not exist.",
   "`math.factorial(n)` returns n factorial, written `n!`, which is `1 × 2 × ... × n`, as an integer. By definition `factorial(0)` is 1, and `factorial(5)` is 120. It requires a non-negative integer; a negative argument raises ValueError. Factorials grow very quickly, but Python integers have no fixed size limit, so even large results are exact rather than approximate.",
   "`math.sqrt(x)` returns the square root as a float, even for perfect squares: `sqrt(16)` is `4.0`, not `4`. A negative argument raises ValueError with the message math domain error, because the `math` module works with real numbers only. `math.hypot(x, y)` returns the length of the hypotenuse of a right triangle with sides x and y, which is also the straight-line, or Euclidean, distance from the origin to the point (x, y): `hypot(3, 4)` is `5.0`. It is equivalent to `sqrt(x*x + y*y)` but written as a single call and computed carefully to avoid overflow with very large values. Like `sqrt`, it always returns a float.",
   "The floor idea also shows up outside the `math` module, which makes it worth connecting. The floor division operator `//` rounds its result toward negative infinity, exactly like `math.floor`. So `7 // 2` is 3 and `-7 // 2` is -4, not -3. With two integers, `//` gives an integer; if either operand is a float, it gives a float such as `3.0`, whereas `math.floor(7 / 2)` always gives the integer 3. A handy trick for rounding up with whole numbers is `-(-a // b)`, which equals `math.ceil(a / b)` for integers, though on the exam you only need to recognize what `//` and `ceil` produce. When a question mixes `//`, `int()`, `round()` and the three math functions, sort them by direction: down, toward zero, nearest-even, and up.",
   "Related names often appear in the same questions. The constants `math.pi` and `math.e` are floats. The function `math.pow(x, y)` always returns a float, unlike the `**` operator, which keeps integers as integers: `2 ** 3` is `8` while `math.pow(2, 3)` is `8.0`. Watching the return type is one of the easiest ways to eliminate wrong answers, because an option showing `4` where `4.0` would print is simply incorrect.",
   "Back at the bakery, the fixes are now clear. Packing 25 cupcakes in boxes of 6 needs `math.ceil(25 / 6)`, which is 5, because a partial box still needs a box. The refund report that should round a negative adjustment down needs `math.floor`, not `int()` or `trunc()`. Choosing the right function is really choosing the right direction, and for negative numbers that choice changes the answer."
  ],
  "analogy": "Picture the number line as a staircase you are standing on, partway between two steps. `floor` always steps down, `ceil` always steps up, and `trunc` always steps toward the ground floor at zero, which is down when you are above zero and up when you are in the basement. The analogy does not cover `round`, which looks for the nearest step and, on an exact tie, picks the even-numbered one.",
  "terms": [
   [
    "floor()",
    "Rounds down toward negative infinity and returns an int."
   ],
   [
    "ceil()",
    "Rounds up toward positive infinity and returns an int."
   ],
   [
    "trunc()",
    "Discards the fractional part, moving toward zero, and returns an int."
   ],
   [
    "hypot()",
    "Returns the Euclidean distance sqrt(x*x + y*y) as a float."
   ],
   [
    "factorial()",
    "Returns the product 1 × 2 × ... × n for a non-negative integer n, with factorial(0) equal to 1."
   ]
  ],
  "example": "A shipping script needs whole boxes for 23 items at 5 items per box. math.ceil(23 / 5) gives 5 boxes, while math.floor would give 4 and leave three items unpacked.",
  "mistakes": [
   [
    "floor() and trunc() are the same function.",
    "They agree only for positive numbers. For negatives, floor(-2.5) is -3 while trunc(-2.5) is -2."
   ],
   [
    "math.sqrt(16) prints 4.",
    "sqrt always returns a float, so it prints 4.0. The same is true for hypot."
   ],
   [
    "round(2.5) is 3 because halves round up.",
    "The built-in round uses round-half-to-even, so round(2.5) is 2 and round(3.5) is 4. It is not part of the math module."
   ],
   [
    "math.sqrt(-1) returns an imaginary number.",
    "The math module handles real numbers only, so it raises ValueError."
   ]
  ],
  "tryit": [
   [
    "A parking garage app charges per started hour. A visit of 2.1 hours should cost 3 hours, and a visit of exactly 2.0 hours should cost 2. A developer proposes int(hours) + 1. Which math function should be used instead, and why?",
    "math.ceil(hours). It returns 3 for 2.1 and 2 for 2.0. The proposed int(hours) + 1 would wrongly charge 3 hours for exactly 2.0."
   ]
  ],
  "tip": "Test negatives: floor(-2.5) is -3 but trunc(-2.5) and ceil(-2.5) are -2. Also remember sqrt and hypot always return floats, so sqrt(16) prints 4.0, not 4.",
  "check": [
   [
    "What does math.floor(-3.2) + math.ceil(-3.2) evaluate to?",
    "-7, because floor gives -4 and ceil gives -3."
   ],
   [
    "What does math.sqrt(-4) do?",
    "It raises ValueError, because math.sqrt works with real numbers only."
   ],
   [
    "What is printed by print(math.hypot(6, 8))?",
    "10.0, a float, because hypot returns the distance sqrt(36 + 64)."
   ],
   [
    "What does math.factorial(0) return?",
    "1, by definition of the factorial."
   ]
  ]
 },
 {
  "t": "Random module: random(), seed(), choice(), sample()",
  "hook": "At Maple Street Community Center, Tomas built a raffle script for the spring fair. It draws five winners from 200 ticket numbers. During the dress rehearsal on Thursday, the same five numbers came up three runs in a row, and the volunteers started joking that the draw was rigged. On Saturday morning, a different volunteer runs it, and one ticket wins twice in the same draw. Tomas is mortified. He looks at the code and sees a `random.seed(7)` left over from testing at the top, and a loop that calls `random.choice()` five times. Which of those lines caused which problem, and what should the draw have used?",
  "simple": "Computers cannot truly flip coins, so Python uses a clever formula that produces numbers which look random. Because it is a formula, if you start it from the same starting point, called the seed, you get the same numbers every time. That is handy for testing but bad for a real draw. `random()` gives a decimal number from 0 up to, but never reaching, 1. `choice()` picks one item from a list, and calling it several times can pick the same item again. `sample()` picks several different items at once, like pulling names from a hat without putting them back. Never use this module for passwords; Python has a separate `secrets` module for that.",
  "body": [
   "The `random` module generates pseudo-random numbers. They are called pseudo-random because they come from a deterministic algorithm: given the same starting state, it produces exactly the same sequence every time. That is perfect for games, simulations and tests, but it also means `random` must never be used for passwords, tokens or anything security-related. Python provides the `secrets` module for that purpose, because its values are designed to be unpredictable.",
   "The most basic function is `random.random()`. It takes no arguments and returns a float in the half-open range from 0.0 up to, but not including, 1.0. Half-open means one end is included and the other is not: 0.0 is a possible result, 1.0 never is. Many other functions are built on top of this one. To get a random integer you would normally use `random.randint(a, b)`, which includes both ends, or `random.randrange(start, stop)`, which excludes stop just as `range()` does. Mixing up those two inclusion rules is a common source of off-by-one errors.",
   "`random.seed(value)` sets the starting state of the generator. After seeding with the same value, the same sequence of calls returns the same results, which makes a program reproducible. If you never call `seed()`, the generator is seeded automatically from a source such as the operating system's randomness or the system time, so each run differs. Calling `seed()` with no argument re-seeds it in that same unpredictable way. The exam typically shows two blocks that each start with `random.seed(0)` and asks whether they print the same values. They do, provided the same calls happen in the same order. This is exactly what happened in Tomas's rehearsal: a fixed seed left in the code made every run identical.",
   "```python\nimport random\nrandom.seed(42)\na = [random.random() for _ in range(3)]\nrandom.seed(42)\nb = [random.random() for _ in range(3)]\nprint(a == b)                       # True\n\nprint(random.choice(['red', 'green', 'blue']))\nprint(random.sample(range(1, 50), 6))  # six different numbers\n```",
   "`random.choice(seq)` returns one element picked from a non-empty sequence such as a list, tuple or string. Called on a string, it returns a single character, so `choice('abc')` gives `'a'`, `'b'` or `'c'`. Calling it on an empty sequence raises IndexError, because there is nothing to pick. Each call is independent of the previous one, which means repeated calls can return the same element.",
   "`random.sample(population, k)` returns a new list of k elements chosen without replacement. Without replacement means no position in the population is picked twice, so the elements are unique as long as the population itself has no duplicates. The original sequence is not changed. If k is larger than the population, `sample` raises ValueError, since you cannot draw more unique items than exist. A k equal to the population size returns all of the items in a random order.",
   "The difference between repeated `choice()` calls and a single `sample()` call matters in practice and on the exam. Calling `choice()` five times can return the same element more than once, which is how one ticket won twice at the fair. A single `sample(tickets, 5)` never repeats a position. A lottery draw is a `sample`; rolling a die six times is repeated `choice` or `randint`. For shuffling there is also `random.shuffle(lst)`, which reorders a list in place and returns None, so writing `lst = random.shuffle(lst)` replaces your list with None, a classic trap.",
   "Two more details explain many tricky exam outputs. First, `sample()` always returns a list, whatever kind of sequence you give it. `random.sample('abcde', 2)` returns something like `['d', 'a']`, not a two-character string, and `random.sample(range(10), 3)` returns a list of three integers. Second, all of these module-level functions share one generator. Every call moves it forward, so after `random.seed(0)`, inserting an extra `random.random()` before a `choice()` changes what that `choice()` returns. Reproducibility depends on the same seed and the same sequence of calls, not just on the seed. That is why tests that rely on a seed tend to break when someone adds a new random call earlier in the code, and why exam questions that show matching seeds but different call orders do not produce matching output.",
   "Putting it together, Tomas's fix is two lines. Remove the leftover `random.seed(7)`, or keep it only behind a testing flag, so each real draw starts from an unpredictable state. Replace the loop of `choice()` calls with `winners = random.sample(tickets, 5)`, which guarantees five different winners. When you read exam code, ask three questions: was the generator seeded, and with what; is the function choosing with or without replacement; and what are the exact range boundaries?"
  ],
  "analogy": "Think of `choice()` as drawing a name from a hat, reading it, and putting it back before the next draw, so the same name can come up again. `sample()` is drawing several names and keeping them out of the hat, so no name appears twice. The seed is like stacking the hat's slips in a known order before you start: anyone who stacks them the same way gets the same draw, which is why it suits testing but not a real raffle.",
  "terms": [
   [
    "Pseudo-random",
    "Produced by a deterministic algorithm that only looks random; the same seed gives the same sequence."
   ],
   [
    "Seed",
    "The starting value for the generator; setting it makes results reproducible."
   ],
   [
    "Sampling without replacement",
    "Choosing items so that no position is picked twice, as random.sample() does."
   ],
   [
    "Half-open range",
    "A range that includes one end but not the other, such as 0.0 up to but not including 1.0 for random()."
   ]
  ],
  "example": "A teacher writes a quiz generator that picks 10 questions from a bank of 50 with random.sample(bank, 10). While debugging she calls random.seed(1) at the top so every run produces the same quiz and she can reproduce a bug.",
  "mistakes": [
   [
    "random.random() can return 1.0.",
    "Its range is half-open: 0.0 is possible, 1.0 is not."
   ],
   [
    "Calling choice() several times gives different items each time.",
    "Each call is independent, so repeats are possible. Use sample() for unique picks."
   ],
   [
    "random.sample([1, 2, 3], 5) returns the three items plus two repeats.",
    "It raises ValueError, because k cannot exceed the population size when sampling without replacement."
   ],
   [
    "The random module is fine for generating password reset tokens.",
    "Its output is predictable from its state. Use the secrets module for security-sensitive values."
   ]
  ],
  "tryit": [
   [
    "A board game app must deal 7 different tiles from a bag of 100 to each player, and the developers want to replay exact games when users report bugs. Which functions should they use, and how?",
    "Use random.sample(bag, 7) to deal unique tiles, and record a seed per game, calling random.seed(game_seed) at the start so the same seed replays the same deals."
   ],
   [
    "A script does random.seed(3), prints random.random(), then calls random.seed(3) again and prints random.random(). Are the two printed values the same?",
    "Yes. Reseeding with the same value resets the generator to the same state, so the first call after each seed returns the same float."
   ]
  ],
  "tip": "random() can return 0.0 but never 1.0, and sample() raises ValueError if k exceeds the population size. Same seed plus same calls equals same output.",
  "check": [
   [
    "What does random.sample([1, 2, 3], 4) do?",
    "It raises ValueError because you cannot choose 4 unique items from 3."
   ],
   [
    "Why should random not be used to generate a password reset token?",
    "Its output is pseudo-random and predictable from its state; the secrets module is designed for security-sensitive randomness."
   ],
   [
    "What does random.choice('hello') return?",
    "A single character from the string, such as 'l'."
   ]
  ]
 },
 {
  "t": "Platform module: platform(), machine(), processor(), system(), version(), python_implementation(), python_version_tuple()",
  "hook": "You maintain a small desktop tool at Quarry Lane Accounting, and the bug reports are a mess. One says only \"it crashes on my laptop.\" Another says \"I have the latest version,\" which might mean the latest Windows, the latest Python or the latest copy of your tool. Your manager, Hannah, asks you to make the tool print a short system summary at startup so every report includes the facts. You open the `platform` module and find a long list of functions with similar-sounding names. One of them is called `version()`. Does it tell you the Python version, or something else entirely?",
  "simple": "The `platform` module lets a Python program ask questions about the computer it is running on and about the Python that is running it. Is this Windows, Linux or a Mac? What kind of processor chip does it have? Which flavor of Python is this, and which version? Each question has its own function, and almost all of them give back a piece of text. The answers change from computer to computer, so there is no single right output. Think of it as a program reading the label on the back of the machine. One name trips people up: `version()` describes the operating system, not Python.",
  "body": [
   "The `platform` module lets a program find out about the computer and the Python interpreter it is running on. That is useful for bug reports, for choosing file paths or commands that differ between operating systems, and for checking that the interpreter is new enough before using a feature. Every function listed in this PCAP objective returns a string, except `python_version_tuple()`, which returns a tuple of strings. The exact values depend entirely on the machine, so exam questions ask what kind of information each function gives rather than expecting a specific output.",
   "Start with the broadest function. `platform.platform()` returns a single human-readable string describing the underlying platform, combining the operating system name, release and other details. On one machine it might look something like `Linux-6.5.0-x86_64-with-glibc2.35`, and on another like `Windows-10-10.0.19045-SP0`. It accepts optional arguments `aliased` and `terse`; passing `terse=True` asks for a shorter string with only the most important details. Because it packs everything into one line, it is ideal for the top of a log file.",
   "Two functions describe the hardware. `platform.machine()` returns the machine or hardware type, such as `x86_64`, `AMD64` or `arm64`. `platform.processor()` returns the real processor name if it can be determined. On some systems it returns an empty string because the information is not available, and that is normal behavior, not an error. Code that relies on `processor()` should handle the empty case gracefully.",
   "Two functions describe the operating system. `platform.system()` returns the operating system name, such as `Linux`, `Windows` or `Darwin`, which is the name macOS reports. `platform.version()` returns the operating system's version string, which is often a long build description. It is not the Python version. That point is the classic trap in this topic, and it is the answer to the question in the opening scene: a bug report built on `platform.version()` alone would tell you about Windows or Linux, but nothing about Python.",
   "```python\nimport platform\nprint(platform.system())                 # e.g. Linux\nprint(platform.machine())                # e.g. x86_64\nprint(platform.python_implementation())  # e.g. CPython\nmajor, minor, patch = platform.python_version_tuple()\nprint(major, minor)                      # e.g. 3 12 (strings)\n```",
   "Two functions describe Python itself. `platform.python_implementation()` names the interpreter implementation: `CPython` for the standard reference interpreter distributed by the Python Software Foundation, or others such as `PyPy`, `Jython` or `IronPython`. `platform.python_version_tuple()` returns a tuple of three strings, major, minor and patch level, for example `('3', '12', '1')`. Because the parts are strings, comparing them as numbers requires converting with `int()` first. Comparing `'10' > '9'` as strings gives False, because strings are compared character by character and `'1'` comes before `'9'`, which would be a subtle bug in a version check.",
   "Keep the two meanings of version apart. `platform.version()` is the operating system version. `platform.python_version()`, a string such as `'3.12.1'`, and `platform.python_version_tuple()` describe Python. If a question asks how to learn which interpreter version is running, the tuple or `python_version()` is the answer, not `version()`. A safe minimum-version check converts the parts first, for example `tuple(int(p) for p in platform.python_version_tuple()[:2]) >= (3, 8)`.",
   "In everyday code, the most common use of this module is branching on the operating system. A program might write `if platform.system() == 'Windows':` to pick a different configuration folder or command, and fall through to a default for `Linux` and `Darwin`. Comparisons like this must match the exact capitalization the function returns, so `'windows'` in lowercase would never be true. The `platform` module is not the only source of version information. The `sys` module offers `sys.version_info`, a tuple-like object whose main parts are integers, which is why many programs use it for numeric checks. The PCAP objective, however, names the `platform` functions, so expect questions about strings and about the difference between operating system and interpreter information rather than about `sys`.",
   "Because every result depends on the machine, a good exam strategy is to ignore the sample values in a question and focus on their shape. A single string full of hyphens and version numbers points to `platform()`. A short architecture word points to `machine()`. A word such as `Linux` or `Windows` points to `system()`. A tuple with three quoted parts can only be `python_version_tuple()`.",
   "For Hannah's request, a startup line combining `platform.platform()`, `platform.python_implementation()` and `platform.python_version()` captures the operating system, the interpreter and its version in one place. When reading exam questions, match the function to the category it reports: hardware (`machine`, `processor`), operating system (`system`, `version`, `platform`), or Python (`python_implementation`, `python_version_tuple`). Then check the return type, since the tuple of strings is the one exception to the all-strings rule."
  ],
  "analogy": "The `platform` functions are like different stickers on a rental car. One sticker names the manufacturer (`system`), one the engine type (`machine`), one the model year of the car itself (`version`), and a separate tag describes the driver who is renting it (`python_implementation` and `python_version_tuple`). Reading the car's model year tells you nothing about the driver, just as `version()` tells you nothing about Python.",
  "terms": [
   [
    "system()",
    "Returns the OS name such as Linux, Windows or Darwin."
   ],
   [
    "machine()",
    "Returns the hardware architecture name such as x86_64 or arm64."
   ],
   [
    "processor()",
    "Returns the processor name, or an empty string if it cannot be determined."
   ],
   [
    "python_implementation()",
    "Returns the interpreter implementation name, for example CPython or PyPy."
   ],
   [
    "python_version_tuple()",
    "Returns (major, minor, patch) as a tuple of strings."
   ]
  ],
  "example": "A support script prints platform.platform(), platform.python_implementation() and platform.python_version_tuple() at startup, so every bug report a user pastes already says which OS and interpreter they were using.",
  "mistakes": [
   [
    "platform.version() returns the Python version.",
    "It returns the operating system's version string. Use python_version() or python_version_tuple() for Python."
   ],
   [
    "python_version_tuple() returns integers such as (3, 12, 1).",
    "It returns strings such as ('3', '12', '1'); convert with int() before numeric comparison."
   ],
   [
    "An empty string from processor() means the call failed.",
    "Some systems cannot report the processor name, so an empty string is valid output."
   ],
   [
    "system() returns macOS on a Mac.",
    "It returns Darwin, the name of the underlying operating system."
   ]
  ],
  "tryit": [
   [
    "A script needs to refuse to run on interpreters older than Python 3.8. A teammate writes: major, minor, _ = platform.python_version_tuple() and then if minor < '8': quit(). Why is this unreliable, and how would you fix it?",
    "The parts are strings, so '10' < '8' is True and Python 3.10 would be refused. Convert first: if (int(major), int(minor)) < (3, 8): quit()."
   ]
  ],
  "tip": "platform.version() is the operating system's version, not Python's. python_version_tuple() returns strings, not integers, and processor() may legitimately return an empty string.",
  "check": [
   [
    "What type are the items returned by platform.python_version_tuple()?",
    "Strings, for example ('3', '11', '4'); convert with int() before numeric comparison."
   ],
   [
    "Which function tells you whether you are running CPython or PyPy?",
    "platform.python_implementation()."
   ],
   [
    "Which function returns the hardware architecture, such as x86_64?",
    "platform.machine()."
   ]
  ]
 },
 {
  "t": "__name__ and the if __name__ == \"__main__\" idiom",
  "hook": "Ivy, a new analyst at Northgate Transit, wrote a handy `fares.py` module with a function that calculates discounted fares. To test it, she added a few lines at the bottom that print sample fares. It works perfectly. Then her teammate Omar imports `fares` into the monthly ridership report, and suddenly every report run opens with five lines of mystery output about student fares. Omar asks Ivy to delete her tests. Ivy does not want to lose them, because she uses them every time she changes the function. Is there a way for one file to behave as a test script when Ivy runs it and as a quiet library when Omar imports it?",
  "simple": "Every Python file has a hidden label called `__name__`. Python fills it in before running the file. If you run the file yourself, the label says `'__main__'`, meaning this is the main program. If another file imports it, the label holds the file's name instead, such as `'fares'`. That lets a file check how it is being used. You put your test or demo code under the line `if __name__ == '__main__':`, and it runs only when you start that file directly. It is like a note on your front door that says \"only read this if you live here\": visitors walk past it.",
  "body": [
   "Every module has a built-in variable called `__name__`, a string that Python sets before running the module's code. Its value depends on how the file is being used. When you import a module, `__name__` is the module's name, such as `'tools'` for `tools.py`, or the dotted name such as `'pkg.tools'` when the module is inside a package. When you run a file directly as the main program, for example with `python tools.py` or the Run command in IDLE, Python sets its `__name__` to the special string `'__main__'` instead.",
   "That difference lets a file tell whether it is being run or imported, which is the basis of one of the most common idioms in Python. Code placed under `if __name__ == '__main__':` runs only when the file is the main program and is skipped when another module imports it. You use it for demonstration code, quick self-tests or a command-line entry point, so one module can double as a reusable library and a runnable script. This is exactly the solution for Ivy: her tests move under the guard, and Omar's reports stay quiet.",
   "```python\n# tools.py\ndef double(x):\n    return x * 2\n\nprint('tools loaded, __name__ is', __name__)\n\nif __name__ == '__main__':\n    print('self-test:', double(21))\n```",
   "Trace the two ways of using this file carefully. Running `python tools.py` prints `tools loaded, __name__ is __main__` followed by `self-test: 42`. In another file, `import tools` prints only `tools loaded, __name__ is tools`. The unconditional `print` still runs, because importing executes all of the module's top-level code, but the guarded block is skipped because the comparison is False. This is exactly the kind of output an exam question asks you to predict, so check which lines are inside the `if` block, by indentation, and which are not.",
   "Why bother with the guard at all? Without it, any test code at the top level would run every time someone imported the module, printing output, reading files or doing slow work the importer never asked for. That is why well-behaved modules keep their top level to definitions such as functions, classes and constants, and put anything that acts under the guard. Remember also that a module's top-level code runs only on the first import in a process, so even unguarded output appears once per run, not once per import statement.",
   "Only one module in a running program has `__name__` equal to `'__main__'`: the one Python was started with. Every module it imports, and every module those modules import, gets its own name. So if `main.py` imports `tools.py`, then inside `main.py` the value is `'__main__'`, and inside `tools.py` it is `'tools'`. If `main.py` prints `tools.__name__`, it sees `'tools'` too, because `__name__` is simply an attribute of the module object.",
   "Watch the spelling details, since exam options often change just one character. Both `__name__` and `'__main__'` use two underscores on each side. The comparison uses `==`, not `=`, because a single equals sign inside an `if` is a syntax error. The value is a string, so `'__main__'` must be quoted; writing `__main__` without quotes refers to a name that is not defined and raises NameError. The objective shows the idiom with double quotes, and single quotes are exactly equivalent in Python.",
   "Larger scripts usually go one step further and put all the run-as-a-program work into a function, often called `main()`, then call it from the guard: `if __name__ == '__main__': main()`. That keeps the guarded block to a single line, makes the startup logic easy to find, and lets other code or tests call `main()` deliberately if they need to. The same `'__main__'` value also appears when you start a module with the command `python -m modulename`, which runs that module as the main program and is a common way to launch tools that live inside packages. In every case the rule is the same: whichever module Python starts with gets the name `'__main__'`, and everything it imports keeps its own name.",
   "Modules have other dunder attributes as well, such as `__file__`, the path the module was loaded from, and `__doc__`, its docstring, but `__name__` is the one this idiom depends on. When a question shows two files and asks what is printed, work through it in order: identify which file was run directly, mark its `__name__` as `'__main__'`, give every imported module its own name, then execute top-level lines in order and skip guarded blocks in imported modules."
  ],
  "analogy": "A module with a main guard is like a recipe card with a section at the bottom marked \"only if you are cooking this tonight.\" If you pick up the card to cook, you follow everything, including that section. If another recipe merely refers to this card for its sauce, you take the sauce instructions and skip the bottom section. The analogy has one gap: the unguarded parts of the module still run on import, as if the whole card is read aloud except the marked section.",
  "terms": [
   [
    "__name__",
    "A module variable holding the module's name, or '__main__' when the file is run directly."
   ],
   [
    "'__main__'",
    "The value of __name__ in the module that started the program."
   ],
   [
    "Top-level code",
    "Statements at module level, outside functions and classes, which run whenever the module is loaded."
   ],
   [
    "Main guard",
    "The block if __name__ == '__main__': whose contents run only when the file is executed directly."
   ]
  ],
  "example": "A student writes grades.py with a function average() and some sample calls to check it. Wrapping the sample calls in if __name__ == '__main__': means a classmate can import average without seeing the test output every time.",
  "mistakes": [
   [
    "Importing a module skips all of its top-level code.",
    "Importing runs every unguarded top-level statement. Only the block under the main guard is skipped."
   ],
   [
    "When a file is imported, its __name__ is '__main__'.",
    "An imported module's __name__ is its own name, such as 'tools'. Only the file that started the program has '__main__'."
   ],
   [
    "if __name__ == __main__: works without quotes.",
    "'__main__' is a string and must be quoted; without quotes Python looks for a variable named __main__ and raises NameError."
   ],
   [
    "Every module in a program can have __name__ equal to '__main__'.",
    "Exactly one module, the one Python was started with, has that value."
   ]
  ],
  "tryit": [
   [
    "File a.py contains print('A1'), then import b, then print('A2'). File b.py contains print('B1') and, under the main guard, print('B2'). You run python a.py. What is printed, in order?",
    "A1, B1, A2. Running a.py makes its __name__ '__main__'. Importing b runs b's top-level print('B1'), but b's __name__ is 'b', so the guarded print('B2') is skipped."
   ]
  ],
  "tip": "Imports still run all unguarded top-level code. Only statements inside the if __name__ == '__main__': block are skipped when the file is imported.",
  "check": [
   [
    "What is the value of __name__ inside mod.py when another file does import mod?",
    "The string 'mod'."
   ],
   [
    "A module prints 'A' at top level and 'B' inside the main guard. What does importing it print?",
    "Only A, because the guarded block is skipped on import."
   ],
   [
    "What does print(__name__) show in a script you run directly?",
    "__main__, because the started file's __name__ is set to '__main__'."
   ]
  ]
 },
 {
  "t": "__pycache__ and compiled .pyc files",
  "hook": "Kenji is reviewing a pull request at Silverline Robotics when he notices something odd. A new contributor has committed a folder called `__pycache__` full of files with names like `motors.cpython-312.pyc`. In the review thread, someone asks whether those files make the robot code run faster, someone else asks whether they need to be deleted every time the source changes, and a third person wants to know why there is no `.pyc` file for `main.py`, the script they actually run. The thread is getting long, and nobody is sure. What are these files, when does Python create them, and do they belong in the repository at all?",
  "simple": "Before Python runs your code, it translates it into a simpler set of instructions called bytecode, a bit like turning a recipe written in full sentences into short numbered steps. Translating takes a moment, so when one file imports another, Python saves the translated version of the imported file in a folder named `__pycache__`, in a file ending in `.pyc`. Next time, it can skip the translation and load the saved steps, as long as the original file has not changed. The file you run directly is translated fresh each time and not saved. These saved files only help programs start a little faster; they do not make the program itself run faster.",
  "body": [
   "Python source code is not executed directly as text. The standard interpreter, CPython, first compiles it into bytecode, a compact, lower-level set of instructions for the Python virtual machine, and then executes that bytecode. Compiling takes time, so when a module is imported, CPython saves the bytecode to disk so the next import can skip that step. Those saved files are `.pyc` files, short for compiled Python, and they live in a folder called `__pycache__` next to the source files they came from.",
   "The file names carry a tag that identifies the interpreter and version, for example `__pycache__/tools.cpython-312.pyc` for `tools.py` compiled by CPython 3.12. Including this tag means different Python versions can keep their own compiled copies side by side in the same folder without overwriting each other. That matters because bytecode is not guaranteed to be compatible between versions; a file compiled for one version may not be usable by another, so each keeps its own.",
   "Before reusing a `.pyc` file, Python checks whether it is still valid. By default it records information about the source file, such as its modification time and size, inside the `.pyc` file. On the next import, Python compares that information with the current source. If the source has changed since, Python recompiles it and rewrites the cached file automatically. So you never need to delete `__pycache__` for your edits to take effect in normal use. It is also safe to delete the folder whenever you like, since Python simply recreates it on the next import.",
   "Importantly, the script you run directly is not cached. If you run `python main.py`, Python compiles `main.py` in memory every time and does not write `main.cpython-312.pyc`; only the modules that `main.py` imports, directly or indirectly, get `.pyc` files. This explains an exam favorite and the third question in Kenji's review: after running a program for the first time, a `__pycache__` folder appears containing files for the imported modules but not for the main script. If Python cannot write the folder, for instance because the directory is read-only, the program still runs normally; it just compiles each module every time.",
   "```text\nproject/\n    main.py            # run directly: not cached\n    tools.py           # imported by main.py\n    __pycache__/\n        tools.cpython-312.pyc\n```",
   "Read that tree from the bottom up. The folder `__pycache__` sits beside the source files, not in a central location. It contains one `.pyc` for `tools.py`, tagged with the interpreter and version, and nothing for `main.py`. If the same project were also run with a different Python version, a second file with a different tag would appear next to the first. If `tools.py` imported a third module, `helpers.py`, a `helpers` file would appear too, because every imported module is cached, not only the ones imported by the main script.",
   "It helps to picture what happens on each import of a module that has a cache. Python locates `tools.py` through `sys.path`, then looks in the neighboring `__pycache__` folder for a file whose tag matches the running interpreter. If one exists and its recorded source details still match `tools.py`, Python loads the bytecode straight from it. If the file is missing, has the wrong tag, or is out of date, Python compiles `tools.py` again and tries to write a fresh `.pyc`. Either way, the module object you get is the same, and your code cannot tell which path was taken. The whole mechanism is automatic, which is why most programmers never think about it until they notice the folder.",
   "Two misconceptions are worth clearing up. First, `.pyc` files do not make your program run faster once it is running. The bytecode executed is the same whether it was freshly compiled or loaded from the cache; the only saving is the compile step at import time, so the benefit is a faster start. Second, `.pyc` files are not a meaningful way to hide or protect source code. Bytecode can be inspected with the standard `dis` module and can be decompiled back into readable Python by widely available tools, so shipping only `.pyc` files offers little protection.",
   "Finally, consider the housekeeping side. The folder name has double underscores on both sides, like other special Python names, which signals that it is managed by Python rather than by you. Because the files are regenerated automatically and depend on the interpreter version, most projects add `__pycache__/` to their version-control ignore list. That answers the last question in Kenji's review: the folder should be removed from the pull request and ignored from now on, and nothing about the program will change except that each developer's machine will build its own cache."
  ],
  "analogy": "A `.pyc` file is like a pre-chopped vegetable tray in a restaurant kitchen. Prepping ahead does not make the cooking itself any faster, but dinner service starts sooner because the chopping is done. The kitchen checks the date label each night and re-chops if the recipe changed. The analogy stops working in one respect: the dish ordered most directly, the main script, is always chopped fresh and never stored.",
  "terms": [
   [
    "Bytecode",
    "The compiled, platform-independent instructions the Python virtual machine executes."
   ],
   [
    ".pyc file",
    "A file containing cached bytecode for an imported module."
   ],
   [
    "__pycache__",
    "The directory where CPython stores .pyc files, beside the source modules."
   ],
   [
    "Version tag",
    "The part of a .pyc name, such as cpython-312, that identifies the interpreter and version that compiled it."
   ]
  ],
  "example": "After running app.py, which imports config.py and utils.py, a developer sees __pycache__ containing config and utils .pyc files but nothing for app.py, because only imported modules are cached.",
  "mistakes": [
   [
    "The main script you run gets a .pyc file in __pycache__ too.",
    "Only imported modules are cached. The script started directly is compiled in memory each time."
   ],
   [
    ".pyc files make the program execute faster.",
    "They only skip compilation at import time, so they speed up loading, not execution."
   ],
   [
    "You must delete __pycache__ after editing a module or your changes will be ignored.",
    "Python checks the source's recorded details and recompiles automatically when the source changes."
   ],
   [
    "Distributing only .pyc files keeps your code secret.",
    "Bytecode can be disassembled and decompiled, so it is not real protection."
   ]
  ],
  "tryit": [
   [
    "A program run.py imports parser.py, and parser.py imports lexer.py. The folder is writable. After the first run with CPython, which .pyc files appear in __pycache__, and what happens on the second run if only lexer.py was edited in between?",
    "parser and lexer .pyc files appear, but none for run.py. On the second run Python reuses parser's cache, notices lexer.py changed, recompiles it and updates its .pyc."
   ]
  ],
  "tip": "The main script is compiled but not cached; only imported modules get .pyc files. Caching speeds up loading, not execution.",
  "check": [
   [
    "Why does the .pyc file name include something like cpython-312?",
    "It records the implementation and version, so different interpreters can keep separate, compatible caches."
   ],
   [
    "If you edit tools.py after its .pyc was created, what happens on the next import?",
    "Python notices the source changed, recompiles it and updates the cached .pyc."
   ],
   [
    "What happens if Python cannot create __pycache__ because the folder is read-only?",
    "The program still runs; modules are simply compiled each time without being cached."
   ]
  ]
 },
 {
  "t": "Package layout: directories, __init__.py, nested packages and private (_name) module variables",
  "hook": "Zara has inherited the scheduling code for Pinewood Veterinary Clinics: forty loose Python files in one folder, with names like `utils2.py` and `new_appointments_final.py`. Her lead, Ben, asks her to organize it into a proper package before the next release. As she moves files into folders, two questions keep coming up. First, what is that `__init__.py` file that every tutorial puts in each folder, and does it need anything in it? Second, the old code has a counter named `_next_id` that other files keep reaching into and changing directly, causing duplicate appointment numbers. Can Zara make that variable private? What does Python actually let her do?",
  "simple": "A package is just a folder of Python files that Python can import by name, and folders can contain smaller folders, called subpackages. Traditionally, each package folder holds a file named `__init__.py`. It marks the folder as a package and runs once, the first time the package is imported, so it can hold setup code, though it is often empty. Python has no real locks for hiding variables in a module. Instead, programmers start a name with an underscore, like `_count`, to say \"this is internal, please do not touch.\" The only thing Python enforces is that a star import skips such names. Anyone can still reach them on purpose.",
  "body": [
   "A package is how Python groups related modules into a folder hierarchy. The directory name becomes the package name, each `.py` file inside it is a module, and each subdirectory can be a subpackage with its own modules. Traditionally, and in everything the PCAP course teaches, each package directory contains a file called `__init__.py`, which marks the directory as a regular package. Python 3 can also import directories without it, called namespace packages, but for the exam treat `__init__.py` as the package marker.",
   "`__init__.py` is ordinary Python code, and it may be empty; it often is. When a package is imported for the first time in a process, its `__init__.py` runs once, so it is the place for package-level setup. Typical uses are defining constants shared by the package, importing selected names from inner modules so users can write shorter imports, and setting `__all__` to control what `from package import *` brings in. Whatever names `__init__.py` defines become attributes of the package object itself.",
   "When you import a nested module, the initialization files run from the outside in. For `import shop.cart.items`, Python first runs `shop/__init__.py`, then `shop/cart/__init__.py`, and only then `shop/cart/items.py`. Each of these runs only once per process, so a second import of anything inside `shop` does not run `shop/__init__.py` again. That ordering is useful to know when an exam question puts `print` calls in each file and asks for the output.",
   "```text\nshop/\n    __init__.py\n    prices.py\n    cart/\n        __init__.py\n        items.py\n```",
   "In this layout, `shop` is a package containing the module `shop.prices` and the subpackage `shop.cart`, which contains the module `shop.cart.items`. For `import shop` to work, the directory that contains `shop`, not `shop` itself, must be on `sys.path`. Packages can also be distributed as ZIP files, which Python can import from when the ZIP file's path is on `sys.path`. Zara's reorganization follows this pattern: group related modules into subpackages, give each folder an `__init__.py`, and keep the top folder somewhere Python searches.",
   "Now for privacy. Python has no true private variables at module level, but it has a naming convention with a little bit of teeth. A name that starts with a single underscore, such as `_counter` or `_helper()`, signals to other programmers that it is internal to the module. The one concrete effect is that `from module import *` does not import it, unless the module explicitly lists it in `__all__`. The name is still fully reachable by explicit access: `import module` followed by `module._counter` works, and so does `from module import _counter`. The underscore is a request, not a lock.",
   "```python\n# counter.py\n_count = 0\ndef bump():\n    global _count\n    _count += 1\n    return _count\n\n# main.py\nfrom counter import *\nprint(bump())        # 1\n# print(_count)      # NameError: not imported by *\nimport counter\nprint(counter._count)  # 1, explicit access still works\n```",
   "Notice in that example that `_count` lives in the `counter` module's namespace. The function `bump()` uses `global _count` so that its assignment changes the module-level variable rather than creating a local one, which is why `counter._count` shows the updated value. Hiding module state behind an underscore and giving users functions to change it is a simple form of encapsulation, and it is the module-level cousin of the private attributes you will meet in classes later. For Zara, the honest answer is that she cannot lock `_next_id`, but she can rename it with an underscore, provide a function such as `new_id()` that is the one supported way to get a number, and update the other files to call that function.",
   "A short example shows how `__init__.py` can make a package easier to use. Suppose `shop/cart/items.py` defines a function `add_item()`. If `shop/cart/__init__.py` contains the line `from .items import add_item`, then users can write `from shop.cart import add_item` or call `shop.cart.add_item()` without knowing which inner module holds the function. The leading dot is a relative import meaning this package, and it is common inside `__init__.py` files. If the same file sets `__all__ = ['add_item']`, then `from shop.cart import *` brings in exactly that name. Small conveniences like this are the most common reason an `__init__.py` file is not empty.",
   "When reading exam code about packages, check three things in order: which directories have `__init__.py` and what those files print or define, the order in which they run for the import shown, and whether any names begin with an underscore that a star import would skip. Remember that `__all__`, when present, overrides the underscore rule in both directions: listed names are imported even with an underscore, and unlisted public names are not."
  ],
  "analogy": "A package is like a filing cabinet. Each drawer is a subpackage, each folder in a drawer is a module, and the `__init__.py` file is the label and instruction sheet taped to the front of each drawer, read once when you first open it. An underscore name is like a folder marked \"staff only\": it keeps out people who grab everything at once (a star import), but anyone who asks for it by name can still pull it out.",
  "terms": [
   [
    "__init__.py",
    "A file that marks a directory as a regular package and runs when the package is first imported."
   ],
   [
    "Nested package",
    "A package directory placed inside another package directory."
   ],
   [
    "_name convention",
    "A leading underscore marks a module name as internal; from module import * skips it."
   ],
   [
    "Namespace package",
    "A package directory without __init__.py, supported by Python 3; PCAP treats __init__.py as the usual package marker."
   ]
  ],
  "example": "A game project has a package engine with subpackages engine.audio and engine.graphics, each with its own __init__.py. The graphics module keeps a _cache dictionary; users call engine.graphics.load() and never touch the cache directly.",
  "mistakes": [
   [
    "A leading underscore makes a module variable private and inaccessible.",
    "It only stops from module import * from importing it. module._name and from module import _name still work."
   ],
   [
    "__init__.py runs every time anything in the package is imported.",
    "It runs once per process, on the first import of the package or anything inside it."
   ],
   [
    "__init__.py must contain code to work.",
    "It may be empty; its presence marks the directory as a regular package."
   ],
   [
    "The package folder itself must be listed in sys.path.",
    "The folder that contains the top-level package must be on sys.path, not the package folder."
   ]
  ],
  "tryit": [
   [
    "Each of shop/__init__.py, shop/cart/__init__.py and shop/cart/items.py contains a single print of its file name. A script runs import shop.cart.items and then import shop.cart.items again. What is printed?",
    "shop/__init__.py, then shop/cart/__init__.py, then items.py, each once. The second import reuses the already-loaded modules, so nothing more is printed."
   ],
   [
    "A module config.py defines _secret = 'x', public = 1 and __all__ = ['public', '_secret']. Another file runs from config import * and prints _secret. Does it work?",
    "Yes. __all__ explicitly lists _secret, which overrides the underscore rule, so the star import brings it in."
   ]
  ],
  "tip": "A leading underscore only affects from module import *. Explicit imports and qualified access such as module._name still work, so it is a convention rather than real privacy.",
  "check": [
   [
    "When does code in a package's __init__.py run?",
    "Once, the first time the package (or anything inside it) is imported in a process."
   ],
   [
    "After from mod import *, is mod._secret available?",
    "No name _secret is imported (and mod itself is not bound), unless _secret is listed in __all__; import mod then mod._secret would work."
   ],
   [
    "Can __init__.py be empty?",
    "Yes. An empty __init__.py still marks the directory as a regular package."
   ]
  ]
 },
 {
  "t": "Try/except, multiple except branches and the order they are checked",
  "hook": "It is 7:45 a.m. at Harborview Credit Union, and the branch kiosk that converts savings goals into monthly deposits keeps crashing. Members type things like `twelve` or `0` into the months box, and the screen fills with a traceback. Sam, the developer on call, adds error handling, but now a member who types `0` sees \"Something went wrong with the math\" instead of the friendly \"Months cannot be zero\" message Sam wrote specifically for that case. The specific handler is right there in the code. Sam can see it. Why is Python choosing a different branch, and how does it decide which handler runs?",
  "simple": "An exception is Python's way of shouting \"something went wrong\" while a program runs, such as dividing by zero or turning the word \"abc\" into a number. If nobody deals with it, the program stops. A `try` block says \"attempt this,\" and the `except` branches after it say \"if this kind of problem happens, do that instead.\" Python checks the `except` branches from top to bottom and runs only the first one that fits, then carries on after the whole block. A general branch that fits many problems will grab them before a more specific branch below it gets a chance, like a big net placed in front of a small one.",
  "body": [
   "An exception is Python's way of signaling that something went wrong while a program was running: dividing by zero, converting `'abc'` to an int, reading a missing dictionary key. Each kind of problem is represented by an exception class, such as ZeroDivisionError, ValueError or KeyError. If nothing handles the exception, the program stops and prints a traceback, which lists the calls that led to the error and ends with the exception's class and message. The `try` statement lets you handle the exception instead, so the program can recover, report a friendly message or try something else.",
   "Here is how the statement works step by step. You put the risky code in a `try` block and one or more `except` branches after it. Python runs the `try` block. If no exception occurs, all `except` branches are skipped and execution continues after the whole statement. If an exception occurs, Python abandons the rest of the `try` block immediately, so the remaining lines never run, and looks through the `except` branches from top to bottom. The first branch whose exception class matches, either the same class or a superclass of the raised exception, is executed, and all later branches are ignored. At most one `except` branch runs for a given exception.",
   "```python\ntry:\n    x = int(input('Number: '))\n    print(10 / x)\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\nexcept ValueError:\n    print('That was not a number')\nexcept:\n    print('Something else went wrong')\nprint('done')\n```",
   "Trace the inputs one at a time. Entering `0` makes `int()` succeed, then `10 / x` raises ZeroDivisionError, so the first branch prints its message. Entering `abc` makes `int()` raise ValueError before the division line is reached, so the second branch runs. Entering `4` raises nothing, so `2.5` is printed and every `except` branch is skipped. In all three cases `done` follows, because a handled exception, or no exception at all, lets execution continue after the whole `try` statement.",
   "The final bare `except:` with no class catches anything not caught above. Python requires a bare `except` to be the last branch; putting it earlier is a syntax error, reported before any code runs. Use it sparingly. Because it catches every exception, it also hides mistakes you did not anticipate, such as a misspelled variable name that raises NameError, turning a clear bug into a vague message.",
   "Order matters because matching includes superclasses. Exception classes form a hierarchy: ZeroDivisionError is a subclass of ArithmeticError, which is a subclass of Exception. If you write `except ArithmeticError:` before `except ZeroDivisionError:`, the more general branch catches the division error first, and the specific branch can never run. Python does not warn you about such unreachable branches. That is precisely Sam's bug: a general arithmetic handler sits above the zero-months handler. The rule of thumb is to list exceptions from most specific to most general.",
   "If no branch matches, the exception is not handled at this level. It propagates outward: first to any enclosing `try` statement in the same function, then up to the function's caller, and so on through the chain of calls. If it reaches the top level unhandled, the program terminates with a traceback. Propagation is useful rather than a failure of design. A low-level function can let an exception escape and leave the decision to its caller, which often knows better how to respond, for example by asking the user again or logging the problem.",
   "One more subtle point appears in exam questions. An exception raised inside an `except` branch itself is not caught by sibling branches of the same `try` statement. Once Python has chosen a branch, the other branches of that statement are finished; a new exception raised while handling propagates outward, just like an unmatched one. Likewise, code after the failing line in the `try` block never runs, even after the exception is handled.",
   "For Sam, the fix is to reorder the branches so that the specific ZeroDivisionError handler comes before the general ArithmeticError handler, and to keep any catch-all branch last. When you meet a multi-branch question on the exam, work through it in four steps: find the line that raises, name the exception class, walk down the branches checking same-class-or-superclass, and stop at the first match."
  ],
  "analogy": "The `except` branches are like a row of sorting bins at a recycling center, checked in order from left to right. Each item goes into the first bin whose label fits it. If the first bin says \"anything plastic\" and the second says \"plastic bottles,\" every bottle lands in the first bin and the second stays empty. The analogy matches Python closely, except that an item that fits no bin is not left on the floor: it is passed up to the next center, the caller.",
  "terms": [
   [
    "Exception",
    "An object representing an error or unusual event that interrupts normal flow."
   ],
   [
    "except branch",
    "A handler that runs when the raised exception matches its class or a subclass of it."
   ],
   [
    "Propagation",
    "An unhandled exception moving outward to enclosing try statements and calling functions."
   ],
   [
    "Bare except",
    "An except with no class, catching everything; it must be the last branch."
   ],
   [
    "Traceback",
    "The report printed when an exception is not handled, listing the calls involved and the exception's class and message."
   ]
  ],
  "example": "A menu program wraps each user command in try with except ValueError for bad numbers and except KeyError for unknown menu options. A typo no longer crashes the program; it prints a hint and shows the menu again.",
  "mistakes": [
   [
    "Python picks the most specific matching except branch.",
    "It picks the first matching branch from top to bottom, so a superclass listed earlier wins."
   ],
   [
    "Several except branches can run for one exception.",
    "At most one branch runs; after it, execution continues after the whole try statement."
   ],
   [
    "After the except branch finishes, Python returns to the next line in the try block.",
    "The rest of the try block is abandoned; execution resumes after the entire try statement."
   ],
   [
    "A bare except can go anywhere among the branches.",
    "It must be the last branch; placing it earlier is a syntax error."
   ]
  ],
  "tryit": [
   [
    "A function contains try: d = {'a': 1}; print(d['b']) followed by except LookupError: print('L') and then except KeyError: print('K'). A colleague says K prints because KeyError is the exact class. What actually prints, and what change would make K print?",
    "L prints, because KeyError is a subclass of LookupError and the LookupError branch is checked first. Swap the branches so except KeyError comes first."
   ],
   [
    "A try block calls a function that raises TypeError, and the only branch is except ValueError. The call is inside another try in the caller with except TypeError. What happens?",
    "The inner try has no matching branch, so the TypeError propagates outward to the caller's try, where except TypeError handles it."
   ]
  ],
  "tip": "Only the first matching branch runs, and a superclass listed first swallows its subclasses. When two branches could match, the one higher up wins.",
  "check": [
   [
    "With except ArithmeticError followed by except ZeroDivisionError, which runs for 1/0?",
    "The ArithmeticError branch, because it is checked first and ZeroDivisionError is its subclass; the second branch is unreachable."
   ],
   [
    "What happens to the lines in a try block after the one that raises?",
    "They are skipped; control jumps straight to the matching except branch."
   ],
   [
    "Where must a bare except: appear?",
    "As the last except branch; anywhere else is a syntax error."
   ]
  ]
 },
 {
  "t": "Catching several exceptions in one branch: except (E1, E2)",
  "hook": "At Riverbend Community College, Elena maintains a small script that reads lab-equipment readings and divides totals by counts. Her code has three `except` branches, and two of them are identical: both print \"Bad reading, skipping row\" and move on. A reviewer, Malik, suggests merging them into one line. Elena tries `except ValueError, ZeroDivisionError:` and the script refuses to start with a SyntaxError. Malik also wants the log to say which of the two problems happened on each skipped row, so the lab staff can fix the source data. How do you catch two exceptions in one branch, and still know which one you caught?",
  "simple": "Sometimes two different problems deserve the same reaction. For example, a user might type a word instead of a number, or type zero where zero is not allowed, and in both cases you just want to say \"please try again.\" Instead of writing the same handler twice, Python lets you list several kinds of exceptions together inside parentheses after one `except`. If any of them happens, that one handler runs. You can also give the caught exception a name with `as`, so you can still check which problem it was. It is like one help-desk counter that handles both lost badges and expired badges, and writes down which one each visitor had.",
  "body": [
   "Sometimes different exceptions deserve exactly the same response. A function that parses user input might fail with ValueError, when the text is not a number, or with ZeroDivisionError, when a zero appears where a divisor was needed. In both cases you just want to print an error and ask again. Instead of writing two identical branches, which duplicates code and invites the two copies to drift apart over time, you can list several exception classes in a single `except` clause using a tuple.",
   "```python\ndef ratio(a, b):\n    try:\n        return int(a) / int(b)\n    except (ValueError, ZeroDivisionError):\n        print('Bad input, please try again')\n        return None\n\nprint(ratio('6', '3'))    # 2.0\nprint(ratio('6', '0'))    # message, then None\nprint(ratio('six', '3'))  # message, then None\n```",
   "Walk through those three calls. With `'6'` and `'3'`, both conversions succeed, the division returns `2.0`, and the `except` branch is skipped. With `'6'` and `'0'`, the conversions succeed but the division raises ZeroDivisionError, which is in the tuple, so the message prints and the function returns None, which is what the final `print` shows. With `'six'` and `'3'`, `int('six')` raises ValueError before any division, and the same branch handles it.",
   "The matching rule is the same one you already know, applied to each class in the tuple. The branch matches if the raised exception is an instance of any class in the tuple, including subclasses of any of them. So `except (LookupError, ValueError):` catches a KeyError, because KeyError is a subclass of LookupError. The order of classes inside one tuple does not matter, since the whole tuple belongs to a single branch.",
   "The parentheses are required in the Python 3 syntax that PCAP tests. Writing `except ValueError, ZeroDivisionError:` is treated as an error in that syntax; it was a different, now-removed feature in Python 2, where the comma introduced the name for the exception object. That is exactly what tripped up Elena. The very newest Python releases relax this rule for the case where no `as` clause is used, but exam questions use the comma form as a distractor, so always choose the parenthesized version.",
   "You can combine a tuple branch with ordinary branches in the same `try` statement. The top-to-bottom rule still applies: Python checks each branch in turn, and the first branch whose class or tuple matches wins. So a specific single-class branch placed before a tuple branch will handle its exception, and the tuple handles the rest. Conversely, if a tuple containing a superclass comes first, a later branch for one of its subclasses is unreachable, just as with single-class branches.",
   "When you need to know which of the listed exceptions actually occurred, add `as` to bind the exception object to a name: `except (ValueError, ZeroDivisionError) as e:`. Inside the branch, `type(e).__name__` gives the class name as a string, such as `'ZeroDivisionError'`, `e.args` holds the arguments the exception was created with, and `print(e)` shows its message. This is how Elena can keep one shared handler and still log precise details for the lab staff. Note that the name bound by `as` is removed when the branch ends, so use it inside the branch rather than after it.",
   "Grouping is ultimately a design choice. Group exceptions when your reaction is truly the same. If you catch a broad superclass instead, such as `except ArithmeticError`, you catch all its subclasses at once, which can be simpler but also catches cases you did not intend, such as an OverflowError you would rather see. Listing the exact classes in a tuple states precisely what you expect and lets anything unexpected propagate, which usually makes bugs easier to find. Avoid adding `Exception` to the tuple just to be safe; it defeats the purpose and quietly hides real errors.",
   "On the exam, questions about this topic usually test one of four points: whether the parentheses are present, whether a raised exception matches a class in the tuple directly or through inheritance, which branch wins when a tuple branch and a single-class branch could both match, and what the `as` name gives you access to. Check each in turn and the right option usually stands out."
  ],
  "analogy": "A tuple branch is like a single help-desk window with a sign listing several problems it handles: lost badge, expired badge, broken badge. Any visitor with one of those problems is served at that window, and the clerk writes down which problem it was (the `as` name). The analogy also covers inheritance: if the sign says \"any badge problem,\" every specific badge problem goes there, even ones not named individually.",
  "terms": [
   [
    "Exception tuple",
    "A parenthesized list of classes in one except clause; the branch matches any of them."
   ],
   [
    "as binding",
    "The except ... as name form that gives the handler access to the exception object."
   ],
   [
    "Subclass matching",
    "An except branch also catches instances of subclasses of the listed classes."
   ],
   [
    "e.args",
    "The tuple of arguments an exception object was created with, often containing its message."
   ]
  ],
  "example": "A configuration loader catches (KeyError, IndexError) in one branch because a missing setting might come from a dictionary lookup or from a list that is too short, and in both cases it falls back to a default value.",
  "mistakes": [
   [
    "except ValueError, TypeError: is the normal way to catch two exceptions.",
    "In the Python 3 syntax the exam tests, the classes must be in parentheses: except (ValueError, TypeError):."
   ],
   [
    "A tuple branch cannot catch subclasses of the listed classes.",
    "It matches subclasses of any listed class, so (LookupError,) catches KeyError and IndexError."
   ],
   [
    "Once you group exceptions, you cannot tell which one occurred.",
    "Bind the object with as e and inspect type(e).__name__, e.args or str(e)."
   ],
   [
    "Adding Exception to the tuple is a safe default.",
    "It catches nearly everything, hiding unexpected bugs; list only the classes you truly expect."
   ]
  ],
  "tryit": [
   [
    "A try block has except KeyError: print('K') followed by except (LookupError, ValueError): print('LV'). The code inside raises IndexError. What prints, and what would print for a KeyError?",
    "For IndexError, LV prints, because IndexError is a subclass of LookupError and the first branch does not match. For KeyError, K prints, because the specific branch comes first."
   ]
  ],
  "tip": "The tuple needs parentheses: except (A, B): is the form the exam expects, and except A, B: is the classic distractor. Add as e when you need to know which class was caught.",
  "check": [
   [
    "Does except (LookupError, ValueError) catch a KeyError?",
    "Yes, because KeyError is a subclass of LookupError, which is in the tuple."
   ],
   [
    "How can one branch that catches (TypeError, ValueError) report which one happened?",
    "Use except (TypeError, ValueError) as e and inspect type(e).__name__ or e.args."
   ],
   [
    "Does the order of classes inside a single except tuple affect which branch runs?",
    "No; the tuple is one branch, so it matches if any listed class matches."
   ]
  ]
 },
 {
  "t": "Except … as e and the args attribute",
  "hook": "It is 6:40 a.m. and you have just opened the overnight report for Lakeside Grocers' inventory script. It failed again, and the only line in the log says `Something went wrong`. Priya, the store manager, is waiting to know whether the shelves will be restocked on time, and you have no idea which file, which field or which error stopped the job. Somewhere inside that script an exception object carried the exact answer, with its class name and its message, and the code threw it away without looking. What would it take to catch that object, read what it says, and write something useful to the log instead?",
  "simple": "When something goes wrong in Python, Python creates a little package of information about the problem, called an exception. Writing `except ValueError as e:` means \"if a ValueError happens, hand me that package and call it e.\" Inside the package is a box named `args`, which holds whatever details were given when the problem was reported, usually a message. Printing `e` shows the message in a friendly way. Printing `e.args` shows the raw box, which is a tuple, so it has parentheses around it. Think of a parcel arriving at your door: `e` is the parcel, `args` is what is packed inside, and the label `e` is peeled off and thrown away as soon as you leave the doorway, the except block.",
  "body": [
   "An exception is more than a signal that something failed; it is an object, an instance of an exception class, created at the moment of the error. When you catch it, you can give that object a name with the `as` keyword and then inspect it. The syntax is `except ValueError as e:`, and inside the branch the variable `e` refers to the exact exception instance that was raised. Nothing about matching changes: the branch still runs only if the exception is a ValueError or a subclass of it. The `as` clause simply gives you a handle on the object.",
   "Every exception object has an attribute called `args`, a tuple of the arguments passed to the exception's constructor. When Python itself raises an exception, `args` usually contains a single message string. When you raise one yourself, `args` contains whatever you passed, in order. `raise ValueError('bad value', 42)` produces an exception whose `args` is `('bad value', 42)`, and `raise ValueError()` or plain `raise ValueError` produces empty `args`, `()`. Because `args` is an ordinary tuple, you can index it, take its length or unpack it, exactly as you would any other tuple.",
   "```python\ntry:\n    int('abc')\nexcept ValueError as e:\n    print(e.args)              # (\"invalid literal for int() with base 10: 'abc'\",)\n    print(e)                   # invalid literal for int() with base 10: 'abc'\n    print(type(e).__name__)    # ValueError\n```",
   "Printing the exception object is a different operation from printing its `args`. `print(e)` calls the object's `__str__()` method, and the default version builds its text from `args`. With exactly one argument, `str(e)` is that argument converted to text. With no arguments, it is an empty string, so `print(e)` prints a blank line. With several arguments, it is the string form of the whole tuple, parentheses, commas and quotes included. Exam questions like to ask the difference between `print(e)` and `print(e.args)`: the first shows the message, the second always shows a tuple, and a one-element tuple is displayed with a trailing comma, such as `('oops',)`. One small exception to the pattern is KeyError, whose single-argument message is shown with quotes around the key, so `print(e)` for a missing key `'x'` prints `'x'` rather than `x`.",
   "```python\ntry:\n    raise Exception('first', 'second')\nexcept Exception as e:\n    print(e)          # ('first', 'second')\n    print(e.args[1])  # second\n    print(len(e.args))  # 2\n```",
   "The name bound by `as` has a short life. It exists only while the `except` branch runs. When the branch finishes, Python deletes the variable automatically, because the exception object holds a reference to its traceback, and the traceback holds references to every frame and local variable involved. Keeping all of that alive by accident would waste memory and create reference cycles. The practical consequence is that if you write `print(e)` after the whole `try` statement, you get a NameError, even if the name `e` existed before the `try` began. If you need the exception later, assign it to another variable inside the branch, for example `saved = e`, and use `saved` afterwards.",
   "You can combine `as` with the other forms of `except`. A tuple of classes works, `except (KeyError, IndexError) as err:`, and `err` is bound to whichever of the two actually occurred. A broad class works too, `except Exception as err:`, which binds any ordinary error. Pairing that with `type(err).__name__` gives you the class name as a string, which is the standard way to log what went wrong without stopping the program. A log line such as `KeyError ('customer_id',)` tells an operator immediately what failed and which value was involved, which is far more useful than a generic message.",
   "The items in `args` do not have to be strings. You can pass numbers, lists or any other objects, and they are stored as they are, so `e.args[1]` in the example above could just as easily be an integer you then compare or do arithmetic with. This is why passing separate values is often better than formatting everything into one long message: a handler can pick out exactly the piece it needs. When you only want a readable message for a person, one string argument is the clearest choice, because then `print(e)` shows it cleanly with no parentheses or quotes.",
   "Keep the distinctions straight when tracing exam code. The `as` name is a reference to the instance, not to the class, so `isinstance(e, ValueError)` is True while `e is ValueError` is False. `e.args` is always a tuple, even when it holds one item or none. `str(e)` depends on how many arguments there were. And the name vanishes after the branch. If you can predict the output for zero, one and two constructor arguments, and say what happens to the name afterwards, you have this objective covered."
  ],
  "analogy": "Catching an exception with `as e` is like signing for a parcel at the front door. The parcel is the exception object; `args` is the packing list inside, which might hold one item, several, or nothing. Reading the friendly label on the box is `print(e)`, while reading the raw packing list is `print(e.args)`. The analogy breaks in one useful way: in Python, the moment you step back inside, the courier takes the name tag away, so if you want the parcel later you must put it somewhere with a new label, like `saved = e`.",
  "terms": [
   [
    "Exception instance",
    "The object created when an exception is raised; `except ... as name` binds it to a name."
   ],
   [
    "args",
    "A tuple holding the arguments passed to the exception's constructor; empty if none were given."
   ],
   [
    "str(e)",
    "The printable message of an exception, derived from args: the single argument, an empty string, or the whole tuple."
   ],
   [
    "type(e).__name__",
    "The class name of the caught exception as a string, useful for logging."
   ]
  ],
  "example": "A logging helper catches Exception as err and writes type(err).__name__ and err.args to a file, so when a nightly job fails the operator sees KeyError ('customer_id',) and knows immediately which field was missing.",
  "mistakes": [
   [
    "Believing `print(e)` and `print(e.args)` produce the same output.",
    "`print(e)` shows the message text; `print(e.args)` shows a tuple, which for one argument looks like `('message',)` with a trailing comma."
   ],
   [
    "Assuming `e` is still available after the try statement, like any other variable.",
    "Python deletes the `as` name when the except branch ends, so using it later raises NameError. Copy it to another name inside the branch if you need it."
   ],
   [
    "Thinking `raise ValueError` without parentheses gives args containing the class name.",
    "Raising the class makes Python create an instance with no arguments, so `args` is the empty tuple `()` and `str(e)` is an empty string."
   ],
   [
    "Expecting `str(e)` with two arguments to show only the first one.",
    "With more than one argument, `str(e)` is the string form of the whole tuple, such as `('first', 'second')`."
   ]
  ],
  "tryit": [
   [
    "Your teammate's script ends with `except Exception as e: pass`, and later, after the try statement, it runs `log.write(str(e))`. The job crashes with a NameError on that log line whenever an error occurs. What is the cause, and what is the smallest fix?",
    "The name `e` is deleted when the except branch finishes, so the later line refers to a name that no longer exists. Move the logging into the except branch, or assign `last_error = e` inside the branch and log `last_error` afterwards."
   ],
   [
    "A function raises `ValueError('quantity', -3)`. The caller catches it as `err` and wants to show only the bad number to the user. Should it print `err`, `err.args`, or something else?",
    "Use `err.args[1]`, which is `-3`. Printing `err` would show `('quantity', -3)` and printing `err.args` would show the same tuple, neither of which isolates the number."
   ]
  ],
  "tip": "print(e) shows the message; print(e.args) shows a tuple, which for one argument looks like ('message',). With no arguments, args is () and str(e) is empty. The as variable disappears after the except block.",
  "check": [
   [
    "What is printed by: try: raise KeyError('x', 1) / except KeyError as e: print(e.args)?",
    "('x', 1), the tuple of arguments given to the constructor."
   ],
   [
    "What happens if you use e after the try statement ends?",
    "NameError, because the name bound by as is deleted when the except branch finishes."
   ],
   [
    "What does print(e) show when the exception was raised with raise ValueError()?",
    "An empty line, because args is empty and str(e) is therefore an empty string."
   ]
  ]
 },
 {
  "t": "Else and finally branches and when each runs",
  "hook": "Marcus, the database administrator at Pinecrest Library, messages you at 9:15 a.m.: the connection pool is exhausted again and nobody can check out books. You open the nightly sync script you wrote and see the problem in seconds. When a record fails to import, the code jumps to the error handler, and the line that closes the database connection, sitting at the bottom of the `try` block, never runs. Each failure leaves one more connection hanging. You know Python has a branch that runs on success only and another that runs no matter what. Which one should hold the commit, and which one should close the connection?",
  "simple": "A `try` statement can have up to four parts. `try` holds the risky work. `except` handles a problem if one happens. `else` runs only if nothing went wrong in `try`. `finally` runs every single time, whether things went well, badly, or the function returned early. Think of borrowing a friend's car. If the trip goes fine, you fill the tank as a thank-you; that is `else`, because you only do it after a good trip. Whatever happens, even if you get a flat tire, you return the keys; that is `finally`. If there was a problem, you deal with it first, which is `except`, and you skip the thank-you, but you still return the keys.",
  "body": [
   "A `try` statement can have two more optional branches beyond `except`: `else` and `finally`. Knowing exactly when each runs is one of the most reliable sources of PCAP questions, usually in the form of a short function that prints letters from different branches and asks what the output is. The rules are short, and once they are fixed in your mind those questions become simple tracing exercises.",
   "The `else` branch comes after all the `except` branches and runs only if the `try` block finished without raising any exception. It is where you put code that should happen only on success but that you do not want protected by the handlers. Why not just put that code at the end of the `try` block? Because then any error it raised could be caught by a handler written for something else. Keeping the `try` block small, containing only the statement you expect might fail, and moving follow-up work into `else` means an unexpected error in the follow-up code is reported honestly instead of being mistaken for the expected one. A `try` with `else` must also have at least one `except` branch; `else` alone with `try` is a syntax error.",
   "The `finally` branch comes last and runs no matter what. It runs after a successful `try` and its `else`. It runs after an exception that was handled by an `except` branch. It even runs when an exception was not handled at all and is on its way out of the function, before that exception continues outward. It also runs when the `try`, `except` or `else` block exits early through `return`, `break` or `continue`. That makes it the right place for clean-up that must always happen, such as closing a file, closing a network or database connection, or releasing a lock. A `try` with only `finally` and no `except` is allowed, and is a common way to guarantee clean-up while letting errors propagate normally.",
   "```python\ndef test(x):\n    try:\n        print('A', end=' ')\n        r = 10 / x\n    except ZeroDivisionError:\n        print('B', end=' ')\n    else:\n        print('C', end=' ')\n    finally:\n        print('D')\n\ntest(2)   # A C D\ntest(0)   # A B D\n```",
   "Trace the two calls step by step. With 2 there is no error, so the `except` branch is skipped, `else` runs, then `finally`: the output is A C D. With 0 the division raises ZeroDivisionError, the `except` branch handles it and prints B, `else` is skipped because an exception occurred, and `finally` still runs: A B D. Now imagine an error that no branch catches, say `test('two')`, where dividing by a string raises TypeError. A is printed, the TypeError skips the ZeroDivisionError handler and skips `else`, `finally` prints D, and only then does the TypeError continue outward and produce a traceback. The output is A D followed by the error message.",
   "Early exits deserve a second look because exam writers enjoy them. If the `try` block executes `return 5`, Python remembers the value 5, runs the `finally` block, and only then returns. Anything `finally` prints appears before the caller sees the result. The `else` branch, however, does not run when the `try` block returns early, because control left the `try` block by a jump rather than by finishing normally. The same is true of `break` and `continue` inside a loop: `finally` runs on the way out, `else` does not.",
   "```python\ndef f():\n    try:\n        return 'from try'\n    finally:\n        print('cleaning up')\n\nprint(f())\n# cleaning up\n# from try\n```",
   "The full order of branches is fixed: `try`, then one or more `except` branches, then `else`, then `finally`. Writing them in any other order, for example `finally` before `else`, is a syntax error. One more subtle case is worth recognizing: if a `finally` block itself executes a `return`, that return replaces whatever the `try` block was returning, and it even discards an exception that was propagating, silently. That is legal but confusing, so avoid returning from `finally` in real code; just recognize it if an exam shows it.",
   "In everyday Python, the `with` statement often replaces a hand-written `finally` for resources such as files, because the file object closes itself when the block ends, even on error. Underneath, it provides the same guarantee. For the exam, though, focus on the four-branch `try` statement: `else` means no exception happened in `try`, `finally` means always, and if any exception occurs, `else` is skipped even when that exception was handled."
  ],
  "analogy": "Think of borrowing a friend's car. The drive is `try`. If you hit a pothole and get a flat, you change the tire; that is `except`. If the trip goes smoothly, you fill the tank as thanks; that is `else`, and you skip it after a flat. Whatever happens, you hand back the keys; that is `finally`. The analogy stops working for one exam case: a `return` inside `finally` would be like handing back different keys and hiding the flat tire entirely, which Python allows but you should not do.",
  "mnemonic": "Order of branches: \"Try Every Exit Fully\" for try, except, else, finally. Except comes before else, and finally is always last.",
  "terms": [
   [
    "else branch",
    "Runs only when the try block completes without raising an exception; requires at least one except branch."
   ],
   [
    "finally branch",
    "Runs every time the try statement is left, whether normally, by exception or by return, break or continue."
   ],
   [
    "Clean-up code",
    "Statements that release resources, such as closing files or connections, and therefore belong in finally or a with statement."
   ],
   [
    "Propagation",
    "An unhandled exception continuing outward to the caller after finally has run."
   ]
  ],
  "example": "A script opens a database connection in try, handles ConnectionError in except, commits the transaction in else so only successful work is saved, and closes the connection in finally so it is never left open.",
  "mistakes": [
   [
    "Believing else runs whenever the exception was handled, because the program recovered.",
    "else runs only if the try block raised no exception at all. If any exception occurred, else is skipped, handled or not."
   ],
   [
    "Thinking finally is skipped when the try block returns a value.",
    "finally runs before the function actually returns, so its output appears first and the return value is delivered afterward."
   ],
   [
    "Assuming try with else but no except is valid.",
    "else requires at least one except branch. try with only finally is the form that needs no except."
   ],
   [
    "Expecting an unhandled exception to prevent finally from running.",
    "finally runs first, then the unhandled exception continues outward with its traceback."
   ]
  ],
  "tryit": [
   [
    "You are writing a function that reads a configuration file, parses it, and then sends the parsed settings to a server. Only the parsing step is expected to raise ValueError. The file must always be closed. Where should the parse, the server call and the close go?",
    "Put the parse in try with except ValueError, put the server call in else so it runs only on a successful parse and is not caught by the ValueError handler by mistake, and put the close in finally so it always runs."
   ]
  ],
  "tip": "else means no exception happened; finally means always. If an exception occurs, else is skipped even when the exception was handled. Order is try, except, else, finally.",
  "check": [
   [
    "An unhandled TypeError is raised in try. Which of except (for ValueError), else and finally run?",
    "Only finally; then the TypeError continues to propagate."
   ],
   [
    "Is try: ... else: ... without any except valid?",
    "No. An else branch requires at least one except branch; try with only finally is allowed."
   ],
   [
    "A try block executes return 1 and the finally block prints 'x'. What appears first?",
    "x is printed first, then the function returns 1 to the caller."
   ]
  ]
 },
 {
  "t": "The built-in exception hierarchy: BaseException, Exception, ArithmeticError, LookupError, and their subclasses",
  "hook": "You are reviewing a pull request from Dana, a new developer at Bluewater Freight. Her function looks up shipping rates in both a list of zones and a dictionary of carriers, and she has written five separate `except` branches, one for every error she could think of. Two of them never run, and one of them catches the user pressing Ctrl+C when it should not. Your senior engineer leaves a one-line comment: \"Learn the tree and you will need two handlers, not five.\" Which tree, and how does knowing where each exception sits decide which handler catches it?",
  "simple": "Python's errors are organized like a family tree. At the very top is one great-grandparent called `BaseException`. Below it is `Exception`, the parent of almost every normal error. Some errors are grouped under a shared parent: running out of numbers to do math with falls under `ArithmeticError`, and looking for something that is not in a list or dictionary falls under `LookupError`. When you write `except` with a family name, you catch that person and all their children. It is like a school announcement saying \"everyone in the Garcia family, come to the office\": every Garcia child answers, but cousins from another family do not.",
  "body": [
   "Python's built-in exceptions are classes arranged in an inheritance tree. That structure is what makes `except` matching work: a branch catches its own class and every class below it, because an instance of a subclass is also an instance of its parent. Knowing the main branches of the tree lets you predict which handler catches what, notice handlers that can never run, and choose handlers at the right level of generality instead of listing every possible error.",
   "At the root is `BaseException`. Directly under it are a few special classes that are not errors in the usual sense: `SystemExit`, raised by `sys.exit()`; `KeyboardInterrupt`, raised when the user presses Ctrl+C; and `GeneratorExit`, used internally when a generator is closed. Also directly under `BaseException` is `Exception`, the parent of nearly every ordinary error. Your own exception classes should inherit from `Exception` or one of its subclasses, so they behave like ordinary errors and are caught by ordinary handlers.",
   "```text\nBaseException\n +-- SystemExit\n +-- KeyboardInterrupt\n +-- GeneratorExit\n +-- Exception\n      +-- ArithmeticError\n      |    +-- ZeroDivisionError\n      |    +-- OverflowError\n      |    +-- FloatingPointError\n      +-- LookupError\n      |    +-- IndexError\n      |    +-- KeyError\n      +-- AssertionError\n      +-- AttributeError\n      +-- ImportError\n      |    +-- ModuleNotFoundError\n      +-- NameError\n      +-- OSError\n      +-- StopIteration\n      +-- TypeError\n      +-- ValueError\n           +-- UnicodeError\n```",
   "Two intermediate classes deserve special attention because the exam names them. `ArithmeticError` groups errors from numeric operations: `ZeroDivisionError` for division or modulo by zero, `OverflowError` for results too large to represent (for example, raising a float to a huge power), and `FloatingPointError`. `LookupError` groups errors from failed lookups in containers: `IndexError` when a sequence index is out of range, and `KeyError` when a dictionary key is missing. Catching `LookupError` therefore handles both a bad list index and a missing dictionary key in a single branch, while catching `IndexError` alone would miss the KeyError, because the two are siblings, not parent and child.",
   "The other common leaves are worth recognizing by their cause, since the exam often shows a line of code and asks which exception it raises. `TypeError` means an operation was applied to the wrong type, like `'a' + 1`. `ValueError` means the type was right but the value unacceptable, like `int('abc')`. `NameError` means a variable or function name is not defined. `AttributeError` means an object has no attribute by that name, like `(5).append(1)`. `ImportError` and its subclass `ModuleNotFoundError` mean an import failed. `OSError` covers operating system and input/output (I/O) problems, such as a missing file, and is covered again in the file lessons. `AssertionError` is raised by a failed `assert`.",
   "The tree also explains the ordering rule for multiple `except` branches. Python checks branches from top to bottom and runs the first one that matches. If you put `except LookupError` above `except KeyError`, a missing key is caught by the first branch, and the KeyError branch can never run. So list the most specific classes first and the most general ones last. A handler for `Exception` at the end acts as a safety net for ordinary errors, while still letting `KeyboardInterrupt` and `SystemExit` through, because they are not below `Exception`.",
   "```python\ndata = {'a': 1}\ntry:\n    print(data['b'])\nexcept IndexError:\n    print('index problem')     # skipped: KeyError is not an IndexError\nexcept LookupError as e:\n    print('lookup problem', type(e).__name__)   # lookup problem KeyError\n```",
   "You can explore the tree yourself in the interpreter, and doing so is one of the labs for this domain. `ZeroDivisionError.__bases__` shows its direct parent, `(<class 'ArithmeticError'>,)`. `ZeroDivisionError.__mro__`, the method resolution order, lists the whole chain up to `object`. `issubclass(KeyError, LookupError)` returns True, and `issubclass(KeyboardInterrupt, Exception)` returns False. Checking a handful of classes like this takes two minutes and is the fastest way to make the tree stick.",
   "Choosing the level of a handler is a design decision, not just a memory test. Catching a leaf class such as `KeyError` says precisely what you expect and lets every other problem surface as a traceback, which is usually what you want while developing. Catching a parent such as `LookupError` is a good choice when the response is truly the same for every child, such as falling back to a default value. Catching `Exception` should be the last branch, used for logging or keeping a long-running loop alive, because it hides the difference between expected failures and genuine bugs.",
   "For the exam, memorize the parents rather than the entire tree: `ZeroDivisionError`, `OverflowError` and `FloatingPointError` under `ArithmeticError`; `IndexError` and `KeyError` under `LookupError`; `ModuleNotFoundError` under `ImportError`; `UnicodeError` under `ValueError`; and `KeyboardInterrupt`, `SystemExit` and `GeneratorExit` directly under `BaseException`, not under `Exception`. With those in mind, almost any question about which branch catches an error can be answered by walking up the tree."
  ],
  "analogy": "The exception hierarchy works like a company organization chart. Calling a meeting for \"the Lookup department\" brings in everyone who reports there, both Index and Key, but not Arithmetic staff, who report to a different manager. Calling \"all employees\" (Exception) brings almost everyone. The analogy has one twist the exam tests: a few people, such as KeyboardInterrupt and SystemExit, report straight to the owner (BaseException), so an all-employees meeting does not include them.",
  "terms": [
   [
    "BaseException",
    "The root of all built-in exceptions, including non-error signals like KeyboardInterrupt and SystemExit."
   ],
   [
    "Exception",
    "The base class for ordinary errors and for user-defined exceptions."
   ],
   [
    "ArithmeticError",
    "Parent of ZeroDivisionError, OverflowError and FloatingPointError."
   ],
   [
    "LookupError",
    "Parent of IndexError and KeyError, raised when a key or index is invalid."
   ],
   [
    "issubclass()",
    "Built-in function that returns True if one class inherits, directly or indirectly, from another."
   ]
  ],
  "example": "A function reads settings from both a list and a dictionary. A single except LookupError branch returns a default value whether the failure was an IndexError from the list or a KeyError from the dictionary.",
  "mistakes": [
   [
    "Choosing except IndexError to catch a missing dictionary key.",
    "A missing key raises KeyError, which is a sibling of IndexError. Use except KeyError, or except LookupError to cover both."
   ],
   [
    "Believing KeyboardInterrupt is a subclass of Exception.",
    "It inherits directly from BaseException, alongside Exception, so except Exception does not catch it."
   ],
   [
    "Putting a general handler such as except LookupError before except KeyError and expecting the KeyError branch to run.",
    "Branches are checked top to bottom and the first match wins, so the specific branch below is unreachable. List specific classes first."
   ],
   [
    "Confusing TypeError and ValueError.",
    "TypeError is the wrong kind of object, like 'a' + 1. ValueError is the right kind with a bad value, like int('abc')."
   ]
  ],
  "tryit": [
   [
    "A function divides two numbers taken from a list by position. It can fail because the list is too short or because the divisor is zero. You want one message for 'missing data' and another for 'bad math', using exactly two handlers. Which classes do you name?",
    "except LookupError (or IndexError) for missing data and except ArithmeticError (or ZeroDivisionError) for bad math. The parent classes also cover related errors, such as a KeyError if the data later moves into a dictionary."
   ]
  ],
  "tip": "Know the parents: ZeroDivisionError under ArithmeticError, IndexError and KeyError under LookupError, ModuleNotFoundError under ImportError, and KeyboardInterrupt directly under BaseException, not Exception.",
  "check": [
   [
    "Which branch catches d['missing'] where d is a dict: except IndexError or except LookupError?",
    "except LookupError, because KeyError is its subclass; IndexError is a sibling and does not match."
   ],
   [
    "Is ZeroDivisionError a subclass of Exception?",
    "Yes, through ArithmeticError, which inherits from Exception."
   ],
   [
    "What does issubclass(ModuleNotFoundError, ImportError) return?",
    "True, because ModuleNotFoundError inherits from ImportError."
   ]
  ]
 },
 {
  "t": "Raise, raise with an instance, and a bare raise to re-raise",
  "hook": "A support ticket lands from Coastal Pet Clinic: their appointment system accepted a booking for a dog aged minus three years, and the reminder service crashed two days later with an error no one could trace. You open the `book()` function and find that it quietly returned `None` when the age was invalid, so the bad data slipped through and broke something far away. Elena, your lead, asks a simple question during the review: \"Why didn't the function just refuse loudly at the moment it saw the bad value?\" How do you make your own code raise an error, and how does a handler pass one along after noting it?",
  "simple": "Most of the time Python raises errors for you, but you can raise one yourself with the word `raise`. It is like a referee blowing a whistle: play stops immediately and someone has to deal with it. You can blow the whistle with just the type of problem, `raise ValueError`, or with an explanation, `raise ValueError('age must be positive')`, which is far more helpful to whoever reads it. Sometimes a handler catches a problem, writes a note about it, and then wants the problem to keep going up to someone who can really fix it. Writing `raise` alone inside the handler does exactly that: it passes the same problem along, unchanged.",
  "body": [
   "Exceptions are not only raised by Python; your own code can raise them with the `raise` statement. You do this when a function detects a situation it cannot sensibly handle, such as a negative age, an empty list where data is required, or a file in the wrong format. Raising an exception hands the problem to the caller in a way that cannot be silently ignored. Returning a special value like `None` or `-1` can be forgotten by a careless caller, but an exception keeps travelling up the call stack until something handles it or the program stops with a traceback.",
   "The statement takes either an exception class or an exception instance. `raise ValueError` names a class; Python creates an instance for you by calling the class with no arguments, so its `args` is the empty tuple. `raise ValueError('age must be positive')` creates the instance yourself, passing a message that ends up in `args` and in the printed traceback. Passing a message is almost always better, because it tells whoever reads the error what went wrong and often what value caused it. Whatever you raise must be a class or instance derived from `BaseException`. Raising anything else, such as a plain string with `raise 'oops'`, does not work: Python raises a TypeError saying that exceptions must derive from BaseException.",
   "```python\ndef set_age(age):\n    if age < 0:\n        raise ValueError('age must be non-negative', age)\n    return age\n\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print(e.args)    # ('age must be non-negative', -5)\n```",
   "Execution stops at the `raise`, exactly as it would for an error raised by Python itself. Nothing after it in the same block runs. Python looks for a matching `except` branch in the current function; if there is none, the function ends immediately and the search continues in the caller, then the caller's caller, and so on. Any `finally` blocks along the way run as the exception passes through. If no handler is found at all, the program stops and prints a traceback that includes your message.",
   "Inside an `except` branch you can write `raise` on its own, with no operand. This bare `raise` re-raises the exception currently being handled, unchanged and with its original traceback, so the caller sees exactly what happened and where. It is useful when a handler wants to do something, such as write to a log or undo partial work, but still let the exception continue to the caller who can decide what to do. Outside any exception handler there is nothing to re-raise, so a bare `raise` there fails with a RuntimeError reporting that there is no active exception to re-raise.",
   "```python\ndef load(path):\n    try:\n        with open(path) as f:\n            return f.read()\n    except OSError:\n        print('load failed for', path)\n        raise          # same exception continues outward\n```",
   "Compare the three basic forms side by side. `raise SomeError` raises a new instance with empty `args`. `raise SomeError('message')` raises a new instance carrying your message. A bare `raise` inside a handler raises nothing new; it sends the existing exception onward. A common exam trap shows a handler that writes `raise e` instead of a bare `raise`. That also re-raises the same object, so the caller still catches the same class with the same `args`, but the bare form is the idiomatic way and is the one PCAP expects you to recognize as re-raising.",
   "A handler can also raise a different exception, translating a low-level error into a higher-level one that makes sense to its callers, for example turning an OSError into a custom ConfigError. Python records the original exception automatically as the context, and the traceback shows both, with a line saying that another exception occurred during handling. The optional form `raise NewError('msg') from original` marks the original as the explicit cause. PCAP focuses on the three basic forms, but recognizing `from` helps when you read real tracebacks.",
   "Finally, `raise` is handy for testing your handlers. Raising a specific exception deliberately inside a `try` lets you check that the right branch catches it and that your clean-up runs. Many exam questions do exactly this: they raise an exception by hand and ask which branch prints. When you see one, apply the usual matching rules, the class and all its subclasses, top to bottom, first match wins."
  ],
  "analogy": "Raising an exception is like a referee blowing the whistle: play stops at once and the problem goes to whoever is responsible. Blowing it with an explanation, \"offside, number 9\", is `raise ValueError('message')`. A bare `raise` inside a handler is like an assistant referee who notes the foul in a notebook and then passes the very same call up to the head referee without changing it. The analogy breaks down slightly in that Python's whistle has no \"play on\" option: once raised, the exception must be handled or the program stops.",
  "terms": [
   [
    "raise",
    "Statement that signals an exception, given a class or an instance derived from BaseException."
   ],
   [
    "Bare raise",
    "raise with no operand inside an except branch; re-raises the current exception unchanged."
   ],
   [
    "Exception chaining",
    "Linking a new exception to the one that caused it, automatically as context or explicitly with raise ... from."
   ],
   [
    "Propagation",
    "The movement of an unhandled exception up through calling functions until a handler matches or the program stops."
   ]
  ],
  "example": "A payment function catches a ConnectionError, writes a note to its log, and then uses a bare raise so the web handler above it still sees the original error and can show the user a retry message.",
  "mistakes": [
   [
    "Thinking raise ValueError without parentheses is a syntax error.",
    "Both raise ValueError and raise ValueError() are valid. The class form makes Python create an instance with empty args."
   ],
   [
    "Believing you can raise a string, as in raise 'invalid input'.",
    "Only classes or instances derived from BaseException can be raised; a string causes TypeError."
   ],
   [
    "Assuming a bare raise works anywhere, for example at the top of a function.",
    "A bare raise needs an exception currently being handled. Outside a handler it raises RuntimeError."
   ],
   [
    "Expecting code after raise in the same block to still run.",
    "Execution stops at raise; only finally blocks run as the exception travels outward."
   ]
  ],
  "tryit": [
   [
    "A function `withdraw(amount)` should refuse amounts of zero or less. A teammate suggests printing a warning and returning False. Another suggests raising ValueError with a message and the amount. The function is called from several places, and some callers do not check return values. Which approach is safer, and why?",
    "Raising ValueError('amount must be positive', amount) is safer. A return value can be ignored by a careless caller, while an exception cannot be ignored; it must be handled or it stops the program with a clear message and the offending amount in args."
   ],
   [
    "Inside `except KeyError:` a handler logs the missing key and then should let the caller handle the problem as usual. What single statement should follow the log line?",
    "A bare raise. It re-raises the same KeyError with its original traceback, so the caller's handlers work exactly as if the log line were not there."
   ]
  ],
  "tip": "raise ValueError and raise ValueError() both work; the class form creates an instance with empty args. A bare raise is valid only while an exception is being handled; elsewhere it causes RuntimeError.",
  "check": [
   [
    "What are the args of the exception produced by raise IndexError?",
    "An empty tuple, (), because Python instantiates the class with no arguments."
   ],
   [
    "What does a bare raise do inside an except branch?",
    "It re-raises the exception currently being handled, so it propagates to the next enclosing handler or caller."
   ],
   [
    "What happens when Python executes raise 'error'?",
    "TypeError, because exceptions must derive from BaseException."
   ]
  ]
 },
 {
  "t": "Assert and AssertionError",
  "hook": "During a code review at Maple Street Credit Union, you spot this line guarding a transfer function: `assert amount <= balance, 'insufficient funds'`. It passed every test. Then Omar from operations mentions that production runs Python with the `-O` flag to squeeze out a little speed. You feel your stomach drop, because you suspect that flag changes what this line does. If you are right, a customer could move more money than they have, and no error would ever appear. What exactly does `assert` do, and why is it the wrong tool for this particular check?",
  "simple": "An `assert` is a note you leave in your code that says, \"I am sure this is true here.\" If it really is true, nothing happens. If it is false, Python stops with an error called `AssertionError`, and it can show a short message you wrote. It is like a cook tasting a sauce before serving: a quick check that catches mistakes early in the kitchen. But here is the catch. Python can be started in a mode that skips every assert, like a busy restaurant that skips tasting. So asserts are for catching your own programming mistakes while you build and test, not for checking things that must always be checked, like whether a password is long enough.",
  "body": [
   "The `assert` statement checks a condition that you, the programmer, believe must be true at a certain point in the code. If the condition is true, nothing happens and execution continues with the next line. If it is false, Python raises `AssertionError`. Assertions are a debugging aid: they catch impossible states early, close to their cause, instead of letting bad data travel further through the program and fail later somewhere confusing, where the original mistake is hard to find.",
   "The syntax has an optional message: `assert condition` or `assert condition, message`. The message becomes the exception's argument, so it appears in the traceback and in `e.args`, and `print(e)` shows it. Without a message, the AssertionError has empty `args`, and the traceback shows only the failing line. The condition can be any expression. Python evaluates its truth value exactly as an `if` statement would, so zero, `None`, empty strings and empty containers count as false, and nearly everything else counts as true. That means `assert items` is a short way to assert that a list is not empty.",
   "```python\nimport math\n\ndef safe_sqrt(x):\n    assert x >= 0, 'x must be non-negative'\n    return math.sqrt(x)\n\ntry:\n    safe_sqrt(-1)\nexcept AssertionError as e:\n    print('Assertion failed:', e)   # Assertion failed: x must be non-negative\n```",
   "Note that `assert` is a statement, not a function, which leads to a classic trick question. Writing `assert(x > 0, 'message')`, with parentheses around both parts, does not pass two arguments. It builds a two-element tuple and asserts the tuple itself. A non-empty tuple is always true, so the assertion can never fail, no matter what `x` is. Recent Python versions emit a SyntaxWarning that the assertion is always true and suggest removing the parentheses. Parentheses around only the condition, as in `assert (x > 0), 'message'`, are harmless.",
   "Assertions can be switched off entirely. When the Python interpreter runs with the `-O` (optimize) command-line option, all `assert` statements are removed when the code is compiled and are never evaluated. Their conditions are not checked, and any function calls inside them do not happen. This is by design: assertions are meant to be cheap checks during development that can be dropped later. It is also why they must never be used for anything that has to happen in production, such as validating user input, checking permissions, guarding money transfers, or performing actions with side effects like writing to a file.",
   "For those real checks, use an `if` statement and raise a proper exception, for example `if amount > balance: raise ValueError('insufficient funds')`. That check runs whether or not `-O` is used, and the exception type tells the caller what kind of problem occurred. A good way to remember the division of labor is this: `assert` documents and checks assumptions about your own code, things that would only be false if you made a programming mistake, while exceptions raised with `raise` handle problems caused by the outside world, such as users, files and networks.",
   "```python\ndef withdraw(balance, amount):\n    if amount > balance:                 # always checked\n        raise ValueError('insufficient funds')\n    new_balance = balance - amount\n    assert new_balance >= 0              # internal sanity check\n    return new_balance\n```",
   "`AssertionError` sits directly under `Exception` in the hierarchy, so `except Exception` catches it, and you can catch it by name as the first example does. Most of the time, though, a failed assertion is meant to stop the program so the bug gets noticed and fixed, not to be caught and ignored. Test frameworks such as `unittest` and `pytest` build on the same idea: a failing check in a test reports the problem clearly so a developer can investigate.",
   "It helps to see where assertions fit in a typical function. They often appear at the start, checking that arguments passed by your own code have the shape you expect, and at the end, checking that a result makes sense before it is returned. A failed assertion message should describe the broken assumption in plain words, such as `'list must be sorted before merging'`, so that whoever sees the traceback understands what the code expected. Avoid putting calls with side effects inside an assert, such as `assert save(data)`, because with `-O` the call itself disappears.",
   "For the exam, keep four facts ready. A false condition raises AssertionError, and a true one does nothing. The optional message after the comma becomes the exception's argument. Parenthesizing the condition and message together makes a tuple that always passes. And the `-O` option removes asserts, so they are unsuitable for input validation or security checks."
  ],
  "analogy": "An assertion is like a chef tasting the sauce before it leaves the kitchen. It catches the chef's own mistakes early, before a customer ever sees them. But on a frantic night the restaurant may skip tasting entirely, which is what the `-O` option does. That is where the analogy teaches the exam point: you would never rely on tasting to check a customer's food allergy, because that check must happen every single time. Allergy checks, like input validation, need an `if` and a real exception.",
  "terms": [
   [
    "assert",
    "Statement that raises AssertionError when its condition is false and does nothing when it is true."
   ],
   [
    "AssertionError",
    "The exception raised by a failed assert; a direct subclass of Exception."
   ],
   [
    "-O option",
    "Interpreter flag that strips assert statements so they are never evaluated."
   ],
   [
    "Truth value",
    "Whether Python treats an expression as true or false; 0, None and empty containers are false."
   ]
  ],
  "example": "In a function that splits a bill, a developer adds assert len(people) > 0, 'no diners' before dividing. During testing it catches a bug in the caller that passed an empty list, long before users see a ZeroDivisionError.",
  "mistakes": [
   [
    "Using assert to validate user input or permissions.",
    "Running with -O removes every assert, so the check would silently disappear. Use an if statement and raise an exception such as ValueError."
   ],
   [
    "Writing assert(condition, 'message') and expecting it to fail when the condition is false.",
    "The parentheses create a non-empty tuple, which is always true, so the assertion never fails."
   ],
   [
    "Thinking assert x, when x is 0, passes because the expression is valid.",
    "0 is false, so the assertion fails and raises AssertionError."
   ],
   [
    "Believing AssertionError inherits directly from BaseException like KeyboardInterrupt.",
    "AssertionError is a subclass of Exception, so except Exception catches it."
   ]
  ],
  "tryit": [
   [
    "You are writing a function that calculates the average of a list. Callers inside your own module always pass a non-empty list, but the function is also reachable from a public web form where users may submit nothing. Should you guard against an empty list with assert, with if and raise, or both?",
    "Use if and raise ValueError for the empty-list case, because user-controlled input must be checked even when -O is used. An assert could be added for internal assumptions that only a programming mistake could break, but it cannot replace the real check."
   ]
  ],
  "tip": "assert (cond, 'msg') with parentheses is a non-empty tuple and always passes. Never rely on assert for input validation, because -O removes it. A failed assert raises AssertionError with the message as its argument.",
  "check": [
   [
    "What does assert 0, 'zero' do?",
    "Raises AssertionError with the message 'zero', because 0 is false."
   ],
   [
    "Why is assert unsuitable for checking a user's password length?",
    "Assertions can be disabled with -O, so the check might not run; use an if and raise an exception instead."
   ],
   [
    "Does except Exception catch an AssertionError?",
    "Yes, because AssertionError is a subclass of Exception."
   ]
  ]
 },
 {
  "t": "Why except Exception does not catch KeyboardInterrupt or SystemExit",
  "hook": "It is 11 p.m. and Jonah, on call for Redwood Transit's arrival-board service, is trying to stop a script that has gone wild, printing the same warning thousands of times a second. He presses Ctrl+C. Nothing. He presses it again and again. The script keeps scrolling. Earlier that week someone had wrapped the main loop in `try` with a bare `except: pass` to \"make it never crash.\" Meanwhile, a different script with `except Exception` stops instantly when you press Ctrl+C. Why does one handler swallow the interrupt and the other lets it through?",
  "simple": "Some events in Python are not mistakes at all; they are requests to stop. Pressing Ctrl+C sends one, called `KeyboardInterrupt`, and calling `sys.exit()` sends another, called `SystemExit`. Python keeps these in a separate family from ordinary errors. So a handler that says \"catch any normal error\", written `except Exception`, lets them pass by, and the program can still be stopped. A handler with no class name at all, a bare `except:`, catches absolutely everything, including those stop requests, which is why it can make a program impossible to stop. Think of a spam filter that blocks junk mail but always lets through a message from the fire department: that is `except Exception`.",
  "body": [
   "It is tempting to wrap a whole program in `try` with `except Exception:` so it never crashes. That works for ordinary errors such as ValueError or KeyError, but two important events pass straight through such a handler, by design. Understanding why depends on the exception hierarchy covered earlier, and the exam tests it directly with short programs that call `sys.exit()` or simulate an interrupt inside a `try`.",
   "`KeyboardInterrupt` is raised when the user presses Ctrl+C, or the equivalent interrupt key, in the terminal. `SystemExit` is raised by `sys.exit()` when a program asks to end, optionally with an exit status such as `sys.exit(0)` for success or `sys.exit(1)` for failure. Neither represents a bug. They are requests to stop. For that reason Python's designers placed them directly under `BaseException`, beside `Exception` rather than beneath it. Because an `except` branch matches only the named class and its subclasses, `except Exception` does not match them. A program with a broad error handler can therefore still be interrupted by the user and can still exit cleanly when told to. `GeneratorExit`, used when a generator is closed, sits in the same place for similar reasons.",
   "```python\nimport sys\ntry:\n    sys.exit(3)\nexcept Exception:\n    print('caught by Exception')       # not printed\nexcept SystemExit as e:\n    print('exit requested:', e.code)   # exit requested: 3\n```",
   "In that example, the first branch is checked and does not match, because SystemExit is not a subclass of Exception. The second branch names SystemExit explicitly, so it matches, and the exception's `code` attribute holds the value passed to `sys.exit()`, here 3. If `sys.exit()` is called with no argument, `code` is `None`, which the operating system treats as success. Without the second branch, the exception would propagate and the program would end with status 3.",
   "A bare `except:` with no class, or `except BaseException:`, does catch these events. That is exactly why a bare `except` is risky. A loop such as `while True:` containing `try: ... except: pass` becomes impossible to stop with Ctrl+C, because each KeyboardInterrupt is caught by the bare handler and swallowed, and the loop simply continues to the next iteration. A call to `sys.exit()` inside such a loop is swallowed the same way. If you truly must catch everything, for example to write a final log entry before the program ends, re-raise afterwards with a bare `raise` so the interrupt or exit still happens.",
   "```python\nwhile True:\n    try:\n        do_work()\n    except Exception as err:      # ordinary errors: log and keep going\n        print('skipped:', type(err).__name__)\n    # KeyboardInterrupt is not caught here, so Ctrl+C stops the loop\n```",
   "When you do want to respond to Ctrl+C, catch `KeyboardInterrupt` explicitly and deliberately: print a short message, save work, and end. When code calls `sys.exit()`, the SystemExit exception unwinds the stack like any other exception, which is a useful property: `finally` blocks and `with` statements still run their clean-up on the way out, so files are closed and locks are released even when the program exits from deep inside a function.",
   "It is worth tracing what happens to a KeyboardInterrupt step by step. The user presses Ctrl+C while the program is inside a `try` block. Python raises KeyboardInterrupt at that point. It checks each `except` branch in order: `except ValueError` does not match, `except Exception` does not match, because KeyboardInterrupt is not below Exception. If there is a `finally` block, it runs. Then the exception leaves the function and continues up the call stack. If nothing catches it anywhere, Python prints a short traceback ending in KeyboardInterrupt and the program stops, which is exactly what the user wanted.",
   "For the exam, the pattern to recognize is a question that triggers one of these events inside a `try` that only has `except Exception`, and asks what happens. The answer is that the handler does not run and the event propagates, ending the program after any `finally` block has run. If the question uses a bare `except:` instead, the handler does run and the program continues. Be ready to explain both outcomes from the position of the classes in the tree.",
   "The practical lesson is a rule of thumb for writing handlers: catch the narrowest exceptions you can, use `Exception` as a last resort for ordinary errors, and leave `BaseException` and bare `except` alone unless you re-raise. Following it keeps your programs robust against bad data while still respecting the user's and the system's requests to stop."
  ],
  "analogy": "Think of `except Exception` as an office receptionist who handles every routine complaint that comes through the door but always lets the fire marshal straight through. The fire marshal is KeyboardInterrupt or SystemExit: a request to stop, not a complaint. A bare `except:` is a receptionist told to stop everyone, fire marshal included, which is how a building, or a program, ends up impossible to evacuate. The analogy has limits: in Python you can let the marshal through after taking a note, by re-raising with a bare `raise`.",
  "terms": [
   [
    "KeyboardInterrupt",
    "Raised when the user presses the interrupt key (Ctrl+C); inherits directly from BaseException."
   ],
   [
    "SystemExit",
    "Raised by sys.exit(); its code attribute holds the exit status and it inherits directly from BaseException."
   ],
   [
    "except Exception",
    "A broad handler for ordinary errors that deliberately excludes exit and interrupt signals."
   ],
   [
    "Bare except",
    "An except clause with no class; it catches everything, including KeyboardInterrupt and SystemExit."
   ]
  ],
  "example": "A long-running monitoring script catches Exception inside its loop so a single bad reading does not kill it. When the operator presses Ctrl+C, KeyboardInterrupt bypasses that handler and the script stops as expected.",
  "mistakes": [
   [
    "Believing except Exception catches every possible exception.",
    "It catches ordinary errors only. KeyboardInterrupt, SystemExit and GeneratorExit inherit from BaseException, not Exception."
   ],
   [
    "Thinking sys.exit() ends the program instantly, skipping finally blocks.",
    "sys.exit() raises SystemExit, which unwinds the stack normally, so finally blocks and with statements still run."
   ],
   [
    "Assuming a bare except: is just a shorter way to write except Exception:.",
    "A bare except is equivalent to except BaseException and also swallows Ctrl+C and sys.exit()."
   ]
  ],
  "tryit": [
   [
    "A data-collection script runs forever in a loop and must survive occasional ValueError and ConnectionError failures. The operator must still be able to stop it with Ctrl+C, and it should print 'stopping' and close its log file when stopped. How should you arrange the handlers?",
    "Inside the loop, catch the specific errors, or Exception as a last resort, and continue. Around the whole loop, catch KeyboardInterrupt explicitly to print 'stopping', and close the log file in a finally block or use a with statement. Avoid a bare except inside the loop, because it would swallow Ctrl+C."
   ]
  ],
  "tip": "KeyboardInterrupt, SystemExit and GeneratorExit inherit from BaseException, not Exception. Only a bare except, except BaseException, or the specific class catches them.",
  "check": [
   [
    "Will except Exception catch the exception raised by sys.exit()?",
    "No. sys.exit() raises SystemExit, which derives from BaseException, not Exception."
   ],
   [
    "Why is an infinite loop containing try/except: pass hard to stop?",
    "The bare except swallows KeyboardInterrupt, so Ctrl+C is caught and the loop continues."
   ],
   [
    "What does the code attribute of a caught SystemExit hold after sys.exit(3)?",
    "3, the value passed to sys.exit()."
   ]
  ]
 },
 {
  "t": "Defining your own exception classes and adding attributes to them",
  "hook": "You are building checkout for Hilltop Bike Co-op's online shop. When a purchase fails, the page currently shows \"ValueError: something failed\" no matter whether the bike is out of stock, the card was declined, or the coupon expired. Sam, who runs the shop, wants the page to offer a different bike when stock runs out and to ask for another card when payment fails. Your handler would have to read the error message and guess which problem happened, which breaks the moment someone rewords a message. What if each failure had its own exception class, carrying the exact item and amount, so the handler could simply catch it by name?",
  "simple": "Python comes with ready-made error types, like ValueError, but your program has its own kinds of problems, such as \"not enough money in the account.\" You can create your own error type by writing a tiny class that inherits from `Exception`. Then you can raise it and catch it by its own name, just like a built-in one. You can also attach extra information to it, such as the balance and the amount someone tried to spend, so the code that catches it can read those numbers directly. It is like a hospital using specific alarm codes, \"code blue in room 4\", instead of one general alarm: the right team knows exactly what happened and where.",
  "body": [
   "Built-in exceptions describe general problems such as a bad value or a missing key, but your programs have their own failure modes: an account with insufficient funds, an order for an item that is out of stock, a configuration file missing a required setting. Defining your own exception classes lets callers catch exactly those problems by name, and lets you attach the data needed to handle them. This is a direct application of the object-oriented ideas in the course, and PCAP expects you to read and write such classes.",
   "A custom exception is simply a class that inherits from `Exception`, or from a more specific built-in such as `ValueError` if that describes it well. The simplest version needs no body at all beyond `pass`. It already behaves like any exception: you can raise it, catch it, and pass it a message that ends up in `args` and is shown by `print(e)`. Everything it needs, including the `args` attribute and the `__str__` method, is inherited from its parent.",
   "```python\nclass BankError(Exception):\n    pass\n\nclass InsufficientFunds(BankError):\n    def __init__(self, balance, amount):\n        super().__init__(f'balance {balance} is less than {amount}')\n        self.balance = balance\n        self.amount = amount\n\ntry:\n    raise InsufficientFunds(50, 80)\nexcept BankError as e:\n    print(e)                       # balance 50 is less than 80\n    print(e.amount - e.balance)    # 30\n```",
   "Two design ideas appear in that example. The first is a hierarchy. `InsufficientFunds` inherits from `BankError`, which inherits from `Exception`. A caller can catch every banking problem with `except BankError` or just this one with `except InsufficientFunds`. The same matching and ordering rules apply as with built-in exceptions: a branch catches its class and all subclasses, branches are checked from top to bottom, and the most specific class should come first. If you put `except BankError` above `except InsufficientFunds`, the second branch can never run.",
   "The second idea is extra attributes. By defining `__init__`, you store useful data such as `balance` and `amount` on the exception object as ordinary instance attributes. A handler can read them to decide what to do, for example offering to transfer the missing 30 from savings, rather than parsing numbers out of a message string. Messages are for people; attributes are for code. Parsing text is fragile, because the moment someone rewords the message, the parsing breaks, while an attribute name stays stable.",
   "When you override `__init__`, call `super().__init__(...)` with a message. That call runs the parent's constructor, which sets `args`, and `args` is what `print(e)` and tracebacks display. If you forget it, the exception still works, because Python fills in `args` automatically from the arguments the constructor call received. In the example, that would make `args` equal to `(50, 80)`, so `print(e)` would show `(50, 80)`, which is not the readable message you intended, and later code relying on `args` becomes confusing. You can also override `__str__()` to control the printed message directly, returning any string you like built from the object's attributes.",
   "```python\nclass OutOfStock(Exception):\n    def __init__(self, item):\n        super().__init__(item)\n        self.item = item\n    def __str__(self):\n        return f'{self.item} is out of stock'\n\ntry:\n    raise OutOfStock('helmet')\nexcept OutOfStock as e:\n    print(e)          # helmet is out of stock\n    print(e.args)     # ('helmet',)\n```",
   "Inherit from `Exception`, not from `BaseException`. Classes derived from `Exception` are caught by ordinary `except Exception` handlers and behave like errors, while classes derived directly from `BaseException` would slip past those handlers like KeyboardInterrupt and SystemExit do, which surprises everyone who uses your code. By convention, custom exception class names end in Error, like the built-ins, though descriptive names such as `InsufficientFunds` are also common. Keep custom hierarchies shallow: one base class for your module or package and a few specific subclasses is usually enough.",
   "Raising and catching a custom exception looks exactly like working with a built-in one. A function signals the problem with `raise InsufficientFunds(balance, amount)`, and a caller several levels up can handle it with `except InsufficientFunds as e:`, reading `e.balance` and `e.amount`. Because the exception is a class, you can also give it methods, for example one that returns a suggested fix, although simple attribute storage is all PCAP expects. Every feature of classes you have learned, inheritance, constructors and overriding, works the same way here.",
   "For the exam, be ready to read a small custom hierarchy and say which branch catches a raised instance, what `print(e)` shows with and without a `super().__init__()` call or a `__str__` override, and which attribute values a handler can read. All of it follows from two things you already know: how classes inherit and how `except` matching works."
  ],
  "analogy": "Custom exceptions are like specific hospital alarm codes. A general alarm, the built-in Exception, tells everyone something is wrong. A code with a room number, InsufficientFunds with balance and amount attributes, sends the right team to the right place with the facts they need. A family of codes under one prefix, BankError, lets a supervisor listen for all of them at once. The analogy stops short in one way: in Python the code also has a readable message, set through super().__init__(), and forgetting it leaves the message blank or odd.",
  "terms": [
   [
    "Custom exception",
    "A user-defined class inheriting from Exception, raised and caught like built-in exceptions."
   ],
   [
    "Exception hierarchy",
    "A set of related exception classes where a base class lets callers catch the whole group."
   ],
   [
    "super().__init__()",
    "Call to the parent constructor, which sets args and therefore the printed message."
   ],
   [
    "__str__()",
    "Method that returns the printable form of an object; overriding it controls what print(e) shows."
   ]
  ],
  "example": "An online shop defines OrderError with subclasses OutOfStock and PaymentDeclined. The checkout page catches OutOfStock to offer alternatives, reading its item attribute, and catches any other OrderError to show a generic message.",
  "mistakes": [
   [
    "Inheriting custom exceptions from BaseException to make them 'more basic'.",
    "Derive from Exception so ordinary handlers catch them; BaseException subclasses slip past except Exception like exit signals do."
   ],
   [
    "Believing a custom exception needs a long class body to work.",
    "class MyError(Exception): pass is a complete, working exception that can be raised with a message."
   ],
   [
    "Thinking that if you override __init__ without calling super().__init__(), args will be empty.",
    "Python still fills args from the constructor's arguments, so print(e) shows those raw values instead of a friendly message."
   ],
   [
    "Listing except BankError before except InsufficientFunds and expecting the specific branch to run.",
    "The base class matches first, so the specific branch is unreachable. Put subclasses first."
   ]
  ],
  "tryit": [
   [
    "A school's grading program needs to report two problems: a score outside 0 to 100, and a student ID that does not exist. One part of the program wants to handle both the same way; another part needs to tell them apart and show the bad score. How would you design the exceptions?",
    "Create a base class GradingError(Exception), then ScoreOutOfRange(GradingError) with a score attribute set in __init__ after calling super().__init__() with a message, and UnknownStudent(GradingError). Code that treats both alike catches GradingError; code that needs details catches ScoreOutOfRange first and reads e.score."
   ]
  ],
  "tip": "Custom exceptions should derive from Exception. If you override __init__, pass a message to super().__init__() so args and str(e) stay meaningful, and store data as attributes for handlers to read.",
  "check": [
   [
    "If class AppError(Exception) and class DbError(AppError) exist, does except AppError catch DbError?",
    "Yes, because DbError is a subclass of AppError."
   ],
   [
    "Why store data as attributes on a custom exception instead of only in the message?",
    "Handlers can read the values directly, for example e.amount, instead of parsing text."
   ],
   [
    "What does print(e) show for class E(Exception): pass after raise E('disk full')?",
    "disk full, because the inherited __str__ shows the single argument."
   ]
  ]
 },
 {
  "t": "Character encoding: ASCII, Unicode, code points, UTF-8",
  "hook": "A message pops up from Rosa in the front office of Valley Dental: the patient list you exported this morning shows \"JosÃ©\" instead of \"José\", and \"Zoë\" has turned into a string of odd symbols. The appointment reminders go out in an hour. You check the file and the data is all there; nothing was deleted. The bytes are exactly what your script wrote. So why does the same file look perfect on your machine and broken on hers? The answer is in how text becomes numbers, and numbers become bytes.",
  "simple": "Computers only understand numbers, so every letter has to be given a number. ASCII is an old, short list that numbers 128 characters, enough for English letters, digits and punctuation. Unicode is a giant list that gives a number, called a code point, to every character in every language, including accented letters and emoji. But a number still has to be written down as bytes to be saved in a file. UTF-8 is the most common way of writing those numbers as bytes. English letters take one byte, and other characters take two to four. Garbled text happens when a file is written with one method and read with another, like reading a recipe in metric units as if it were in cups.",
  "body": [
   "Computers store only numbers, so every character of text has to be represented by a number. An agreement about which number stands for which character is a character set, and a rule about how those numbers are written as bytes is an encoding. PCAP expects you to know the vocabulary and the relationship between the main standards, because it underpins how Python strings work and explains functions like `ord()`, `chr()`, `encode()` and `decode()`.",
   "ASCII, the American Standard Code for Information Interchange, is the classic character set. It defines 128 characters, numbered 0 to 127: the English letters in upper and lower case, the digits, punctuation, and control characters such as newline (10) and tab (9). Every ASCII code fits in 7 bits, so it fits comfortably in one byte. A few landmarks are worth remembering for the exam: space is 32, the digit '0' is 48, 'A' is 65 and 'a' is 97. Upper and lower case letters are exactly 32 apart, and uppercase letters come before lowercase ones, which explains why 'Z' sorts before 'a'.",
   "ASCII has no room for accented letters, Cyrillic, Greek, Chinese characters or emoji. Over the years, various 8-bit code pages tried to extend it by using the numbers 128 to 255, each for a different language or region. Because the same byte meant different characters in different code pages, text that moved between systems was often garbled. Unicode solved this by assigning a unique number, called a code point, to every character in every writing system, with plenty of space left for more. Code points are written in hexadecimal with a `U+` prefix, like `U+0041` for 'A' and `U+00E9` for 'é'. The first 128 Unicode code points are identical to ASCII, so ASCII is a subset of Unicode. Adapting software to many languages and regions this way is called internationalization, often abbreviated I18N, because there are 18 letters between the first i and the last n.",
   "A code point is just a number; it still needs an encoding to become bytes in a file or a network message. UTF-8 is the most widely used Unicode encoding. It is variable-length: it uses one byte for code points in the ASCII range and two, three or four bytes for higher code points. Because one-byte UTF-8 is byte-for-byte the same as ASCII, plain English text is identical in both, so old ASCII files are already valid UTF-8. That backward compatibility helped UTF-8 become the default on the web and in most modern systems. Other encodings exist: UTF-16 uses units of two bytes, and UTF-32 uses a fixed four bytes for every code point, which is simple but wasteful for mostly English text.",
   "```python\ns = 'café'\nprint(len(s))                  # 4 characters\nprint(len(s.encode('utf-8')))  # 5 bytes: é needs two\nprint(ord('é'))                # 233, its code point\nprint(s.encode('utf-8'))       # b'caf\\xc3\\xa9'\n```",
   "The output of that last line is a `bytes` object. The first three characters appear as themselves because their UTF-8 bytes are the same as ASCII, while 'é' appears as two hexadecimal escapes, the two bytes UTF-8 uses for code point 233. This is the core distinction to keep: the character, its code point (233, or U+00E9), and its encoded bytes (two bytes in UTF-8) are three different things.",
   "In Python 3, the `str` type holds Unicode text: a sequence of code points, independent of any encoding. Encoding happens only at the edges of a program. When you write text to a file or send it over a network, it must become bytes, which `str.encode()` does. When you read bytes back, `bytes.decode()` turns them into text again. That is why `len()` of a string counts characters, not bytes, and why files opened in text mode accept an `encoding` argument, such as `open('names.csv', encoding='utf-8')`.",
   "A mismatch between the encoding used to write and the one used to read is the usual cause of garbled characters, sometimes called mojibake. If a file is written as UTF-8 and read with a legacy code page, each two-byte character is shown as two separate wrong characters, which is exactly how 'José' becomes 'JosÃ©'. The bytes were never wrong; only their interpretation was. Reading with the correct encoding fixes the display without changing the file. If decoding meets bytes that are not valid in the chosen encoding, Python raises `UnicodeDecodeError`, a subclass of `UnicodeError` and therefore of `ValueError`.",
   "For the exam, keep the relationships straight. ASCII is a 128-character set. Unicode is the universal character set that includes ASCII as its first 128 code points. A code point is the number for a character. UTF-8 is an encoding of Unicode, not a separate character set, and it is variable-length and ASCII-compatible. A Python `str` is a sequence of code points, so `len('é')` is 1 even though UTF-8 needs 2 bytes to store it."
  ],
  "analogy": "Think of Unicode as a giant phone directory that gives every character in the world its own number, and UTF-8 as a way of writing those numbers on paper, with short numbers taking one box and long numbers taking up to four. ASCII is the first page of the directory, and UTF-8 writes that page exactly as ASCII always did. The analogy breaks a little when it comes to garbled text: the problem is never the directory, it is someone reading the boxes with the wrong rule for where one number ends and the next begins.",
  "terms": [
   [
    "ASCII",
    "American Standard Code for Information Interchange; a 7-bit character set of 128 characters numbered 0 to 127."
   ],
   [
    "Unicode",
    "A standard assigning a unique code point to every character in every writing system; its first 128 code points match ASCII."
   ],
   [
    "Code point",
    "The number Unicode assigns to a character, written like U+0041."
   ],
   [
    "UTF-8",
    "A variable-length Unicode encoding using 1 to 4 bytes per code point, compatible with ASCII."
   ],
   [
    "I18N",
    "Internationalization: designing software to work with many languages and regions."
   ]
  ],
  "example": "A CSV of customer names written on one system as UTF-8 is opened elsewhere with a legacy code page, and José appears as garbled symbols. Re-reading the file with encoding='utf-8' fixes it, because the bytes were never wrong, only their interpretation.",
  "mistakes": [
   [
    "Calling UTF-8 a character set that competes with Unicode.",
    "UTF-8 is an encoding of Unicode: a rule for turning Unicode code points into bytes. Unicode is the character set."
   ],
   [
    "Believing ASCII defines 256 characters.",
    "ASCII defines 128 characters, 0 to 127. The 8-bit extensions using 128 to 255 were separate code pages, not ASCII."
   ],
   [
    "Expecting len() of a Python string to count bytes.",
    "A str is a sequence of code points, so len() counts characters. Use len(s.encode('utf-8')) to count UTF-8 bytes."
   ],
   [
    "Thinking every UTF-8 character takes the same number of bytes.",
    "UTF-8 is variable-length: 1 byte for ASCII-range code points and 2 to 4 bytes for others. UTF-32 is the fixed four-byte encoding."
   ]
  ],
  "tryit": [
   [
    "A teammate says your text file is 'corrupted' because a name shows as 'MÃ¼ller' when opened in an old editor, though it looks fine in your program. The file was written by Python with encoding='utf-8'. Should you rewrite the file, and what is actually happening?",
    "No rewrite is needed. The editor is decoding UTF-8 bytes with a legacy single-byte code page, so the two-byte 'ü' appears as two wrong characters. Opening the file as UTF-8 shows it correctly, because the bytes themselves are fine."
   ]
  ],
  "tip": "ASCII is a subset of Unicode; UTF-8 is an encoding of Unicode, not a separate character set. A Python str counts code points, so len('é') is 1 even though it takes 2 bytes in UTF-8. Remember 32, 48, 65 and 97 for space, '0', 'A' and 'a'.",
  "check": [
   [
    "How many characters does ASCII define?",
    "128, with codes 0 to 127."
   ],
   [
    "Why can UTF-8 files containing only English text be read as ASCII?",
    "UTF-8 encodes code points 0 to 127 as single bytes identical to ASCII."
   ],
   [
    "What is len('naïve') and is it the same as len('naïve'.encode('utf-8'))?",
    "len('naïve') is 5; the UTF-8 encoding is 6 bytes because ï takes two bytes, so they differ."
   ]
  ]
 },
 {
  "t": "Ord() and chr()",
  "hook": "The coding club at Northgate Community Center has a puzzle on the whiteboard: \"Uryyb jbeyq.\" Lena, the volunteer who runs it, says it is a secret message made by shifting every letter forward by 13 places, and she challenges you to write a decoder in Python before the session ends. You know how to loop over a string, but how do you move a letter forward in the alphabet? Letters are not numbers, and `'u' - 13` is an error. Unless, of course, every letter already has a number hiding behind it. How do you get at that number, and back again?",
  "simple": "Every character in Python has a number behind it, called its code point. `ord()` takes one character and tells you its number: `ord('A')` is 65. `chr()` does the opposite: give it a number and it gives back the character, so `chr(65)` is 'A'. Because the letters a to z have numbers in a row, you can do simple arithmetic on them: add 1 to the number for 'c' and turn it back into a character, and you get 'd'. It is like seats in a theater: each seat has a number, `ord` tells you the seat number of a person, and `chr` tells you who is sitting in a given seat.",
  "body": [
   "Two built-in functions connect characters and their Unicode code points. `ord(ch)` takes a string of exactly one character and returns its code point as an integer. `chr(n)` does the reverse: it takes an integer code point and returns the one-character string for it. They are inverses of each other, so `chr(ord(c)) == c` for any single character `c`, and `ord(chr(n)) == n` for any valid code point `n`. Together they let you treat characters as numbers when that is convenient and turn the results back into text.",
   "```python\nprint(ord('A'), ord('a'), ord('0'), ord(' '))  # 65 97 48 32\nprint(chr(66), chr(122))                       # B z\nprint(ord('a') - ord('A'))                     # 32\nprint(chr(ord('c') + 1))                       # d\n```",
   "Those four values, 65 for 'A', 97 for 'a', 48 for '0' and 32 for space, are worth memorizing because exam questions use them without telling you. From them you can work out the rest: 'B' is 66, 'Z' is 90, 'z' is 122 and '9' is 57. The gap between any uppercase letter and its lowercase partner is always 32, so `chr(ord('G') + 32)` is 'g'. That is not how you should change case in real code, where `lower()` and `upper()` are clearer and handle non-English letters, but it is exactly the kind of arithmetic the exam asks you to trace.",
   "Because letters of the English alphabet have consecutive code points, you can do arithmetic on them. `ord(c) - ord('a')` gives a lowercase letter's position in the alphabet counting from 0, so 'a' is 0 and 'z' is 25. Adding an offset and then converting back with `chr()` shifts the letter. Combined with the modulo operator, which wraps 26 back around to 0, this gives the classic Caesar cipher from this domain's lab. Similarly, `ord(d) - ord('0')` turns a digit character into its numeric value, so `ord('7') - ord('0')` is 7. That is how digit parsing works under the hood.",
   "```python\ndef shift(c, k):\n    if 'a' <= c <= 'z':\n        return chr((ord(c) - ord('a') + k) % 26 + ord('a'))\n    return c\n\nprint(''.join(shift(c, 3) for c in 'xyz abc'))  # abc def\n```",
   "Trace one character to see why this works. For 'x', `ord('x') - ord('a')` is 23. Adding 3 gives 26, and `26 % 26` is 0. Adding `ord('a')` gives 97, and `chr(97)` is 'a'. The space is not between 'a' and 'z', so it is returned unchanged. Applying a shift of 13 twice brings every letter back to where it started, because 13 plus 13 is 26, which is why the club's puzzle can be decoded with the same function that encoded it.",
   "Know the error cases, because they are a favorite source of exam distractors. `ord()` requires a string of length exactly one. `ord('ab')` and `ord('')` both raise TypeError, and so does `ord(65)`, since the argument is not a string at all. `chr()` requires an integer in the valid Unicode range, from 0 up to 0x10FFFF, which is 1,114,111 in decimal. A negative number or anything above that limit raises ValueError, while a float such as `chr(65.0)` raises TypeError, because the type is wrong rather than the value.",
   "These functions work for all of Unicode, not just ASCII: `ord('€')` returns 8364 and `chr(960)` returns 'π'. Code points are commonly shown in hexadecimal, so `hex(ord('€'))` gives '0x20ac', matching the U+20AC notation used in Unicode charts. Python string literals also accept escapes based on code points, such as `'€'` for the euro sign, which is equivalent to `chr(0x20ac)`. You can pass a hexadecimal literal to `chr()` directly, as in `chr(0x41)`, which returns 'A'.",
   "You will often see `ord()` and `chr()` used together in a loop or comprehension to process a whole string. For example, `[ord(c) for c in 'Hi']` gives `[72, 105]`, and `''.join(chr(n) for n in [72, 105])` turns those numbers back into 'Hi'. This round trip is a simple way to check your understanding: whatever you do to the numbers in between, such as adding a shift, is what changes the text. It also shows why both functions work on single characters only, leaving the looping to you.",
   "Code point order is also what string comparison uses, character by character, which is why `'Z' < 'a'` is True: 90 is less than 97. It also explains why `sorted(['banana', 'Apple', 'cherry'])` puts 'Apple' first, and why `'10' < '9'` is True for strings, since '1' (49) comes before '9' (57). When a question asks you to predict comparisons or the sorting of mixed-case strings, computing a few `ord()` values in your head settles it."
  ],
  "analogy": "Picture a theater where every seat has a number and every character in Unicode has its own seat. `ord()` looks at a person and tells you their seat number; `chr()` looks at a seat number and tells you who sits there. Moving three seats along the row is a Caesar shift, and wrapping to the start of the row is the modulo. The analogy has an edge the exam cares about: asking for the seat of two people at once, `ord('ab')`, or for a seat that does not exist, `chr(-1)`, is an error.",
  "terms": [
   [
    "ord()",
    "Returns the integer code point of a single-character string; raises TypeError for any other length."
   ],
   [
    "chr()",
    "Returns the one-character string for an integer code point from 0 to 0x10FFFF; raises ValueError outside that range."
   ],
   [
    "Caesar cipher",
    "A simple substitution that shifts each letter a fixed number of places, easily built with ord, chr and modulo."
   ],
   [
    "Code point",
    "The integer Unicode assigns to a character, often shown in hexadecimal as U+ followed by digits."
   ]
  ],
  "example": "A password-strength checker counts uppercase letters by testing 65 <= ord(c) <= 90 for each character. The isupper() method is usually clearer, but the ord version shows exactly which code points count.",
  "mistakes": [
   [
    "Expecting ord('ab') to return a list of two numbers.",
    "ord() accepts exactly one character; a longer or empty string raises TypeError. Use a loop or list comprehension for several characters."
   ],
   [
    "Thinking chr(-1) or chr(2000000) raises TypeError.",
    "The type is right (an int) but the value is out of range, so it raises ValueError. A float argument is what raises TypeError."
   ],
   [
    "Believing 'a' < 'Z' because a comes first in the alphabet.",
    "Comparison uses code points: 'a' is 97 and 'Z' is 90, so 'Z' < 'a' is True."
   ],
   [
    "Forgetting modulo in a Caesar shift and expecting 'z' shifted by 1 to give 'a'.",
    "chr(ord('z') + 1) is '{'. You need (position + k) % 26 to wrap around."
   ]
  ],
  "tryit": [
   [
    "A form asks for a single-digit code and receives the character '7'. A teammate wants to convert it with ord('7') and use the result as the number. What will they get, and what should they write instead?",
    "ord('7') is 55, the code point, not the value 7. Use ord('7') - ord('0'), which gives 7, or simply int('7')."
   ]
  ],
  "tip": "ord() needs exactly one character, otherwise TypeError. chr() needs an int in range 0 to 0x10FFFF, otherwise ValueError. Remember 'A' = 65, 'a' = 97, '0' = 48 and space = 32.",
  "check": [
   [
    "What does chr(ord('A') + 32) return?",
    "'a', because lowercase letters are 32 code points after their uppercase forms."
   ],
   [
    "What happens with ord('hi')?",
    "TypeError, because ord expects a string of length 1."
   ],
   [
    "What does chr(ord('9') - 8) return?",
    "'1', because ord('9') is 57, 57 - 8 is 49, and 49 is the code point of '1'."
   ]
  ]
 },
 {
  "t": "String literals and escape sequences (\\n, \\t, \\\\, quotes)",
  "hook": "Felix, an intern at Summit Outdoor Gear, sends you a screenshot with a puzzled note. His script is supposed to save a report to `C:\\new_reports\\totals.txt`, but Python claims the folder does not exist, and when he prints the path, part of it has jumped onto a second line. He has checked the folder three times. Nothing is misspelled. You look at the string in his code and spot the culprit in about two seconds: a single innocent backslash. Why would one backslash split a path in two, and how do you write it so Python reads exactly what you typed?",
  "simple": "A string literal is text you type into your code between quotes, like `'hello'` or `\"hello\"`. Both kinds of quotes work the same. Some characters are hard to type inside quotes, such as a new line, a tab, or the quote mark itself. For those, Python uses a backslash code: `\\n` means \"new line\", `\\t` means \"tab\", `\\\\` means \"one real backslash\", and `\\'` or `\\\"` means a quote mark. Each code counts as just one character. It is like shorthand in a text message, where a short code stands for something longer. The catch is that Python reads every backslash as the start of a code, so a Windows folder path with a backslash can turn into something you did not mean.",
  "body": [
   "A string literal is text written directly in your source code between quotes. Python accepts single quotes `'...'` and double quotes `\"...\"` interchangeably; they produce identical strings, and `'x' == \"x\"` is True. Having both lets you include one kind of quote easily by delimiting with the other: `\"It's fine\"` or `'She said \"yes\"'`. Neither form needs any escaping in those cases, because the quote inside is not the one that ends the string.",
   "Some characters cannot be typed directly inside a literal, or would end it early. For those, Python uses escape sequences: a backslash followed by one or more characters that together stand for a single character in the resulting string. The ones to know for PCAP are `\\n` (newline), `\\t` (horizontal tab), `\\\\` (a literal backslash), `\\'` (single quote) and `\\\"` (double quote). The key exam fact is that an escape sequence is one character in the resulting string, not two. So `len('a\\nb')` is 3, not 4, and `len('\\\\')` is 1.",
   "```python\nprint('Name:\\tAda\\nRole:\\tEngineer')\n# Name:   Ada\n# Role:   Engineer\nprint('It\\'s a backslash: \\\\')    # It's a backslash: \\\nprint(len('\\\\'))                  # 1\nprint(len('a\\tb\\\\'))              # 4\n```",
   "The backslash-backslash case matters most in practice, for example with Windows file paths. The literal `'C:\\new'` does not contain a backslash followed by the letter n; it contains a newline character, because `\\n` is an escape sequence. When printed, the path breaks onto two lines, and opening it as a file fails. There are two fixes. Write `'C:\\\\new'`, doubling each backslash so it becomes one literal backslash, or use a raw string. A raw string is written with an `r` prefix, such as `r'C:\\new'`, and treats backslashes as ordinary characters, so `len(r'\\n')` is 2. Raw strings have one quirk: they still cannot end with a single backslash, because that backslash would escape the closing quote. Forward slashes also work in paths on Windows, which avoids the problem entirely.",
   "Triple-quoted strings, written with `'''...'''` or `\"\"\"...\"\"\"`, can span several lines, and the line breaks inside them become newline characters in the string. They are also used for docstrings, the documentation strings placed at the start of a function, class or module. Inside them you can use single and double quotes freely, which makes them convenient for text that contains both, such as a sentence quoting someone who says it's fine. Escape sequences still work inside triple-quoted strings unless you add the `r` prefix.",
   "```python\npoem = '''Roses are red,\nViolets are blue.'''\nprint(len(poem.split('\\n')))   # 2 lines\nnote = \"She said \\\"hi\\\" and left\"\nprint(note)                    # She said \"hi\" and left\n```",
   "A backslash at the very end of a line, outside a string, is a line continuation: it joins the next physical line to the current statement. Inside an ordinary single-quoted string, a backslash right before the end of the line also continues the literal onto the next line and adds no character. A backslash followed by a character that is not a recognized escape, like `\\d` or `\\p`, is kept as is, backslash included, so `'\\d'` has length 2. Recent Python versions warn about such invalid escapes, so prefer raw strings for text full of backslashes, such as regular expression patterns.",
   "Two small traps appear regularly on the exam. First, `print()` shows the processed string, while the interactive prompt echoes the representation produced by `repr()`, which displays escapes in readable form. Typing `'a\\tb'` at the prompt shows `'a\\tb'` with quotes and a visible backslash-t, but `print('a\\tb')` shows a real tab between a and b. Second, an empty string `''` has length 0, and strings of different quote styles compare equal, because the quotes are only delimiters in your source code and are not part of the string's value.",
   "Escape sequences also matter when you build text for files and other programs. Joining fields with `'\\t'` produces tab-separated data that spreadsheets can open in columns, and ending each line with `'\\n'` puts each record on its own line. Because each escape is a single character, `'a,b\\n'` is four characters long, and splitting text with `split('\\n')` breaks it into lines. Knowing that the backslash is part of the source code, not of the final string, makes all of these results predictable.",
   "When counting characters in an exam question, read the literal left to right and count each escape sequence as one: letters and digits count one each, `\\n`, `\\t`, `\\\\`, `\\'` and `\\\"` count one each, and raw strings count every backslash as its own character. That simple habit settles nearly every length and output question on this topic."
  ],
  "analogy": "Escape sequences work like shorthand in a text message: a short code such as \"brb\" stands for something you cannot or would rather not type out in full. In Python the backslash says \"the next character is shorthand\", so `\\n` becomes a line break. A raw string is like telling the reader \"no shorthand in this message, read every letter literally\". The analogy stops in one important place: in Python each code becomes exactly one character, which is what length questions test.",
  "terms": [
   [
    "String literal",
    "Text written in source code between single, double or triple quotes."
   ],
   [
    "Escape sequence",
    "A backslash followed by characters that represent one special character, such as \\n for newline."
   ],
   [
    "Raw string",
    "A literal with an r prefix in which backslashes are not treated as escapes."
   ],
   [
    "Triple-quoted string",
    "A literal delimited by three quote characters that can span multiple lines."
   ]
  ],
  "example": "A script builds a tab-separated report with '\\t'.join(fields) + '\\n' for each row. Opening the file in a spreadsheet lines everything up in columns, because each \\t is a single tab character.",
  "mistakes": [
   [
    "Counting \\n as two characters when asked for the length of a string.",
    "An escape sequence produces one character, so len('a\\nb') is 3."
   ],
   [
    "Believing single and double quotes create different kinds of strings.",
    "They produce identical str objects; 'x' == \"x\" is True. The choice only affects which quotes you can include without escaping."
   ],
   [
    "Writing a Windows path like 'C:\\new' and expecting a backslash followed by n.",
    "\\n is a newline escape. Double the backslash or use a raw string such as r'C:\\new'."
   ],
   [
    "Thinking a raw string can end with a single backslash, as in r'folder\\'.",
    "A raw string cannot end with an odd backslash, because it would escape the closing quote."
   ]
  ],
  "tryit": [
   [
    "You need to store the regular expression pattern \\d+\\.\\d+ in a variable, and a teammate's version keeps triggering warnings about invalid escape sequences. Which literal form should you use, and why?",
    "Use a raw string, r'\\d+\\.\\d+'. In a raw string every backslash is kept as an ordinary character, so the pattern reaches the regular expression engine exactly as written and Python does not try to interpret \\d or \\. as escapes."
   ]
  ],
  "tip": "Each escape sequence counts as one character: len('\\n') is 1 and len('\\\\') is 1. In a raw string, len(r'\\n') is 2. Watch for accidental escapes in Windows paths.",
  "check": [
   [
    "What is len('a\\tb\\\\')?",
    "4: the characters a, tab, b and one backslash."
   ],
   [
    "How can you write a string containing both ' and \" without escapes?",
    "Use triple quotes, or choose one quote style as the delimiter and escape only the other when needed."
   ],
   [
    "What does print(len(r'C:\\new')) show?",
    "6, because a raw string keeps the backslash and the n as two separate characters."
   ]
  ]
 },
 {
  "t": "Indexing, negative indexing and slicing, including steps",
  "hook": "Every morning, Riverside Animal Shelter's intake system drops files named like `intake_2025_03_dog.csv` into a shared folder, and Kofi, the volunteer coordinator, needs a quick script that pulls out the year, the month and the animal type from each name. He has written it with a loop and a counter, and it breaks whenever a file name is a little shorter than expected. You glance at it and realize the whole thing could be three short expressions in square brackets, none of which would ever crash on a short name. What makes slices so forgiving, and how do you read `name[-7:-4]` without counting on your fingers?",
  "simple": "Every character in a string has a position number, starting at 0 for the first one. `s[0]` gives the first character, and asking for a position that does not exist is an error. You can also count from the end: `s[-1]` is the last character. A slice, written `s[start:stop]`, cuts out a piece from start up to, but not including, stop. You can add a third number, the step, to skip characters or to go backwards: `s[::-1]` reverses the string. Think of a row of numbered lockers: you can open one locker by number, or ask for \"lockers 2 through 5\" and get everything in between. Asking for lockers past the end of the hallway just gives you the ones that exist.",
  "body": [
   "A string is a sequence of characters, and each character has a position called an index. Indexes start at 0 for the first character, so for `s = 'Python'`, `s[0]` is 'P' and `s[5]` is 'n'. The last valid index is always `len(s) - 1`. Using an index equal to or beyond the length, such as `s[6]`, raises IndexError: string index out of range. Indexing always returns a string of length one, because Python has no separate character type; `type(s[0])` is `str`.",
   "Negative indexes count from the end of the string. `s[-1]` is the last character 'n', `s[-2]` is 'o', and `s[-6]` is 'P', the first character. A useful rule is that `s[-k]` is the same as `s[len(s) - k]`. Negative indexes are convenient because you do not need to know the length to reach the end. They have limits too: `s[-7]` is out of range for a six-character string and raises IndexError, just as a too-large positive index does.",
   "Slicing extracts a substring with the form `s[start:stop:step]`. With the step left out, it returns characters from index `start` up to, but not including, `stop`, so `s[1:4]` is 'yth', the characters at indexes 1, 2 and 3. If you omit `start` it defaults to the beginning; if you omit `stop` it defaults to the end. So `s[:2]` is 'Py', `s[2:]` is 'thon' and `s[:]` is a full copy of the string. A handy consequence is that `s[:k] + s[k:]` always rebuilds the original string. The length of `s[a:b]` with non-negative `a` and `b` in range is simply `b - a`. Negative values work in slices too: `s[-3:]` is the last three characters, 'hon', and `s[:-1]` is everything except the last character.",
   "Unlike indexing, slicing never raises IndexError. Out-of-range values are clipped to the string's bounds, so `s[2:100]` is 'thon' and `s[-100:2]` is 'Py'. A slice whose start is at or after its stop, such as `s[4:2]`, is simply the empty string. That forgiveness is why slices are safe for extracting parts of data whose length may vary: a short file name gives a shorter result instead of a crash.",
   "```python\ns = 'Certification'\nprint(s[0], s[-1])     # C n\nprint(s[4:8])          # ific\nprint(s[::2])          # Criiain\nprint(s[::-1])         # noitacifitreC\nprint(s[-3:-8:-1])     # itaci\nprint(s[10:3])         # '' (empty)\n```",
   "The optional third value, the step, says how far to move between selected characters. The default step is 1. `s[::2]` takes every second character starting at index 0, which for 'Certification' gives 'Criiain'. A negative step walks backwards: `s[::-1]` reverses the string, a very common idiom. With a negative step the defaults flip, so an omitted start means the last character and an omitted stop means past the beginning. Start must then be to the right of stop to get anything. `s[1:5:-1]` is empty for that reason, because you cannot walk backwards from index 1 to index 5. A step of 0 makes no sense and raises ValueError: slice step cannot be zero.",
   "Trace the negative-step line in the example to see the rule in action. 'Certification' has 13 characters, so index -3 is the same as index 10, which is 'i', and index -8 is index 5. Walking backwards one step at a time from 10, Python takes indexes 10, 9, 8, 7 and 6, which are 'i', 't', 'a', 'c' and 'i', and stops before reaching 5. The result is 'itaci'. The same method, converting negatives to positives and listing the indexes, works for any slice with any step.",
   "A few slice idioms are worth recognizing on sight because they appear again and again. `s[:n]` is the first n characters and `s[-n:]` is the last n. `s[1:-1]` drops the first and last characters, handy for removing surrounding quotes or brackets. `s[::2]` takes the characters at even positions and `s[1::2]` those at odd positions. `s[::-1]` reverses. And `s[:]` makes a full copy, which for strings is rarely needed but for lists is a common way to copy before modifying.",
   "All of these rules apply equally to lists and tuples, which the exam also slices. The only difference is that slicing a list returns a new list and slicing a tuple returns a new tuple, while slicing a string returns a new string. In every case the original is left unchanged. When predicting a slice, write the sequence out with indexes underneath, both positive and negative, and count. It is faster and far more reliable than working it out in your head, especially with negative steps."
  ],
  "analogy": "Think of a row of numbered lockers in a hallway, numbered from 0 at one end, with a second set of labels counting -1, -2 and so on from the far end. Opening one locker is indexing, and asking for a locker that does not exist is an error. Asking for \"every locker from 2 up to but not including 5\" is slicing, and the janitor quietly ignores numbers past the end of the hallway. A step is walking past every second locker, or walking back down the hall, but you can only walk backwards if you start further along than where you stop.",
  "terms": [
   [
    "Index",
    "The position of an element in a sequence, starting at 0."
   ],
   [
    "Negative index",
    "A position counted from the end, where -1 is the last element; s[-k] equals s[len(s) - k]."
   ],
   [
    "Slice",
    "A subsequence selected with [start:stop:step], excluding the stop position."
   ],
   [
    "Step",
    "The stride between selected positions in a slice; negative values go backwards and 0 raises ValueError."
   ]
  ],
  "example": "A script extracts the year from filenames like report_2024_q3.txt with name[7:11], and the file extension check uses name[-4:] == '.txt'. Both keep working even when a filename is shorter than expected, because slices never raise IndexError.",
  "mistakes": [
   [
    "Believing s[1:4] includes the character at index 4.",
    "The stop index is excluded. s[1:4] contains indexes 1, 2 and 3, so its length is 3."
   ],
   [
    "Expecting 'abc'[5:] to raise IndexError, just like 'abc'[5].",
    "Slices clip out-of-range values, so 'abc'[5:] is the empty string. Only indexing raises IndexError."
   ],
   [
    "Writing s[1:5:-1] to get characters 1 to 4 in reverse.",
    "With a negative step, start must be greater than stop, so this is empty. Use s[4:0:-1] or s[1:5][::-1]."
   ],
   [
    "Thinking s[-1] and s[len(s)] refer to the same character.",
    "s[-1] is s[len(s) - 1]; s[len(s)] is out of range and raises IndexError."
   ]
  ],
  "tryit": [
   [
    "You receive product codes like 'TX-2048-B', always ending with a dash and one letter, but the middle part can be three, four or five digits long. You need the final letter and everything before the last dash. Which slices do you use?",
    "Use code[-1] for the final letter and code[:-2] for everything before the last dash. Negative indexes are measured from the end, so they work no matter how long the middle part is."
   ],
   [
    "A function needs to check whether a word reads the same forwards and backwards. A teammate writes a loop comparing characters. What one-line test could replace it?",
    "word == word[::-1]. The slice with step -1 builds a reversed copy, and comparing it to the original tells you whether the word is a palindrome."
   ]
  ],
  "tip": "Indexing out of range raises IndexError; slicing out of range just clips. With a negative step, start must be greater than stop or the result is empty. A step of 0 raises ValueError.",
  "check": [
   [
    "What is 'abcdef'[-2:]?",
    "'ef', the last two characters."
   ],
   [
    "What is 'abcdef'[5:1:-2]?",
    "'fd': start at index 5 ('f'), step back by 2 to index 3 ('d'), and stop before index 1."
   ],
   [
    "What does 'abc'[3] do compared with 'abc'[3:]?",
    "'abc'[3] raises IndexError; 'abc'[3:] returns the empty string."
   ]
  ]
 },
 {
  "t": "Immutability: why item assignment fails",
  "hook": "It is your second week tutoring at Oakwood Library's evening coding lab, and Aisha holds up her laptop with a frown. Her program reads a list of names, and she wrote `name.strip()` to remove extra spaces and `name[0] = name[0].upper()` to capitalize the first letter. The first line seems to do nothing at all, and the second crashes with a TypeError she does not understand. \"Lists let me do this,\" she says. \"Why won't strings?\" Both problems have the same root cause, and once you see it, a whole family of bugs stops happening. What is it about strings that refuses to change?",
  "simple": "In Python, once a string is made, it can never be changed. You can look at any letter, but you cannot swap one out. Writing `s[0] = 'J'` is an error. Instead, string tools like `upper()` or `replace()` make a brand-new string and give it back to you, leaving the old one exactly as it was. If you do not catch the new string by assigning it, as in `s = s.upper()`, it is simply lost. Think of a printed page in a book: you cannot erase a word, but you can type a new page with the change and use that one instead. Lists are different; they are more like a whiteboard you can edit in place.",
  "body": [
   "Strings in Python are immutable: once a string object is created, its contents can never change. You can read any character with indexing or any piece with slicing, but you cannot assign to an index or a slice, and you cannot delete characters in place. Trying `s[0] = 'J'` raises `TypeError: 'str' object does not support item assignment`, and `del s[0]` raises a similar TypeError saying the object does not support item deletion. The same applies to slice assignment such as `s[1:3] = 'xy'`. These are all TypeError, not ValueError or IndexError, because the operation itself is not supported by the type.",
   "Immutability sounds limiting, but string methods and operators work around it by always creating new strings. `s.upper()`, `s.replace('a', 'b')`, `s.strip()` and `s + '?'` each return a brand-new string and leave the original untouched. To change what a variable holds, you rebind the name to the new object: `s = s.upper()`. The old string is not modified at all; the name simply points to a different object afterwards, and the old object is discarded once nothing else refers to it.",
   "```python\ns = 'Python'\n# s[0] = 'J'           # TypeError\ns = 'J' + s[1:]       # build a new string\nprint(s)              # Jython\n\nt = 'hello'\nt.upper()             # result thrown away\nprint(t)              # hello, unchanged\nt = t.upper()\nprint(t)              # HELLO\n```",
   "That second pattern is a favorite exam trap: calling a string method without assigning the result does nothing visible, because the method cannot change the original. The new string is created, returned, and immediately thrown away. Contrast lists, which are mutable: `lst.append(x)` and `lst.sort()` change the list in place and return `None`. The two styles are opposites. With strings you must write `s = s.strip()`; with lists, writing `lst = lst.sort()` is itself a bug, because it replaces your list with `None`. Confusing the two styles is a common source of errors, so always note which type you are working with.",
   "Deleting a whole string variable is allowed, because that removes the name, not characters inside the object: `del s` works, after which using `s` raises NameError. Rebinding is allowed for the same reason: `s = 'new text'` changes which object the name refers to, not the object itself. Immutability is a property of the string object, not of the variable. Augmented assignment such as `s += 'x'` also works, but only because it builds a new string and rebinds `s` to it.",
   "You can observe the difference between modifying and rebinding by keeping a second name for the original object. After `s = 'abc'` and `t = s`, both names refer to the same string. Running `s += 'd'` leaves `t` as 'abc' and makes `s` 'abcd', and `s is t` is now False, because `s` names a new object while `t` still holds the untouched original. Try the same with a list: after `lst = [1, 2]` and `other = lst`, calling `lst.append(3)` changes what both names show, and `lst is other` stays True, because the one shared object was changed in place. This is a good experiment for the lab and a clear way to see what immutable means.",
   "Why design strings this way? Immutable objects are safe to share: if two variables refer to the same string, neither can surprise the other by changing it, so passing a string into a function never risks the function altering your copy. Immutability also makes strings hashable, which is why they can be dictionary keys and set members; a key that could change after being stored would break the dictionary. It also lets Python optimize storage by reusing identical strings. The cost is that building a long string by repeated `+=` in a loop creates many intermediate strings; for large amounts of text, collect pieces in a list and combine them once with `''.join(pieces)`.",
   "If you genuinely need mutable character data, convert the string to a list with `list(s)`, modify the list, and join it back with `''.join(chars)`. For example, `chars = list('cat')`, then `chars[0] = 'b'`, then `''.join(chars)` gives 'bat'. For binary data, the `bytearray` type is the mutable counterpart of immutable `bytes`, and you will meet it again in the file I/O (input/output) lessons. Tuples, like strings, are immutable and raise the same kind of TypeError on item assignment."
  ],
  "analogy": "A string is like a printed page in a book. You can read any word, but you cannot erase one. To change a word, you print a new page with the change and put your bookmark, the variable name, in the new page; the old page is left exactly as it was. A list is a whiteboard you can edit in place. The analogy breaks slightly with `+=`: it looks like writing on the page, but Python is actually printing a new page and moving the bookmark.",
  "terms": [
   [
    "Immutable",
    "Cannot be changed after creation; strings, tuples and bytes are immutable."
   ],
   [
    "Rebinding",
    "Pointing an existing name at a new object, as in s = s.upper()."
   ],
   [
    "Hashable",
    "Having a fixed hash value, which immutability makes possible and dictionaries require for keys."
   ],
   [
    "is operator",
    "Tests whether two names refer to the same object, useful for seeing whether a name now refers to a new object."
   ]
  ],
  "example": "A beginner writes name.strip() on a line by itself and is puzzled that the spaces remain. Changing it to name = name.strip() fixes the bug, because strip returns a new string instead of editing the old one.",
  "mistakes": [
   [
    "Expecting s.upper() on its own line to change s.",
    "String methods return a new string and leave the original unchanged. Assign the result: s = s.upper()."
   ],
   [
    "Thinking s[0] = 'J' raises IndexError or ValueError.",
    "It raises TypeError, because str objects do not support item assignment at all."
   ],
   [
    "Believing del s is an error because strings are immutable.",
    "del s removes the name, not characters in the object, so it is allowed; afterwards using s raises NameError."
   ],
   [
    "Applying the string habit to lists and writing lst = lst.sort().",
    "List methods such as sort() change the list in place and return None, so this replaces the list with None."
   ]
  ],
  "tryit": [
   [
    "A function receives a product code such as 'ab-123' and must return it with the first character uppercased, leaving the rest unchanged. A colleague writes code[0] = code[0].upper() followed by return code. What happens, and what should the function do instead?",
    "The assignment raises TypeError because strings are immutable. Build a new string instead: return code[0].upper() + code[1:]."
   ]
  ],
  "tip": "Any statement that assigns to s[i] or s[a:b], or deletes s[i], raises TypeError for strings. Methods return new strings; if the result is not assigned, it is lost.",
  "check": [
   [
    "What happens with s = 'abc'; s[1] = 'X'?",
    "TypeError, because str objects do not support item assignment."
   ],
   [
    "After s = 'abc'; s.replace('a', 'z'); print(s), what is printed?",
    "abc, because replace returned a new string that was not assigned."
   ],
   [
    "Is s += 'd' allowed for a string s, and does it modify the original object?",
    "It is allowed, but it creates a new string and rebinds s to it; the original object is unchanged."
   ]
  ]
 },
 {
  "t": "Iterating over strings; in and not in",
  "hook": "You are on the support rota at Lantern Books, a small online bookshop, and a ticket lands on Monday morning: the signup form is letting customers register usernames with spaces in them, and the mailing tool chokes on every one. Priya, the developer who wrote the validator, swears she checks for spaces. You open her code and see a loop that compares each character to a list, a membership test with the wrong operand order, and a comment that says 'should work'. Two lines of Python decide whether thousands of signups are clean or broken. Do you know exactly what a for loop hands you from a string, and exactly what `in` is really testing?",
  "simple": "A piece of text in Python is a string, and you can think of it as a row of letters standing in line. A for loop lets you visit them one at a time, from the first to the last, the way you might read a word letter by letter with your finger. The word `in` asks a yes-or-no question: does this piece of text appear inside that one? For example, asking whether 'cat' is in 'concatenate' gets the answer yes, because those three letters sit side by side in that order. Asking whether 'Cat' is in it gets no, because Python treats capital and small letters as different. `not in` simply asks the opposite question.",
  "body": [
   "A string is a sequence, and that single fact explains this whole lesson. Because a string is an ordered collection of characters, a `for` loop can walk through it one character at a time. `for ch in 'cat':` runs its body three times, with `ch` equal to 'c', then 'a', then 't'. There is no separate character type in Python, so each `ch` is itself a string of length one. This is the natural way to count, test or transform characters, and it avoids the off-by-one indexing errors that creep in when you manage positions yourself.",
   "```python\ntext = 'Hello, World'\nvowels = 0\nfor ch in text.lower():\n    if ch in 'aeiou':\n        vowels += 1\nprint(vowels)   # 3\n```",
   "Read the example above slowly, because the exam shows code in exactly this shape. `text.lower()` produces a new lowercase string, the loop visits each of its twelve characters including the comma and the space, and the membership test asks whether the current character appears in the string 'aeiou'. Only 'e', 'o' and 'o' pass, so the program prints 3. Notice that the loop never changes `text`; calling `lower()` returned a fresh string and the original stayed as it was.",
   "When you also need the position of each character, use `enumerate()`. It yields pairs of index and character, so `for i, ch in enumerate(text):` gives you 0 and 'H', then 1 and 'e', and so on. The older style, `for i in range(len(text)):` with `text[i]` inside the body, works too and appears regularly in exam code, so be comfortable reading both forms and tracing what each prints. Because strings are immutable, assigning a new value to `ch` inside the loop never changes the original string. To transform text, build a new string with concatenation, collect characters in a list and join them at the end, or use a method such as `replace()`.",
   "Now to membership. The operators `in` and `not in` test whether something occurs in a container, and both return a Boolean value, True or False. For strings they test for substrings, not just single characters. `'ell' in 'Hello'` is True because those three characters appear adjacent and in that order. `'eh' in 'Hello'` is False because, although both letters occur, they are not next to each other in that order. `'h' in 'Hello'` is False because the test is case-sensitive, and lowercase 'h' is a different character from uppercase 'H'. `not in` is simply the negation: `'z' not in 'Hello'` is True, and `'H' not in 'Hello'` is False.",
   "Two edge cases are favorites of exam writers. First, the empty string is considered a substring of every string, so `'' in 'abc'` is True, and even `'' in ''` is True. Think of it as asking whether you can find zero characters somewhere, which you always can. Second, the left operand must be a string when the right operand is a string. `1 in 'a1b'` does not quietly convert the number; it raises `TypeError: 'in <string>' requires string as left operand, not int`. Write `'1' in 'a1b'` or `str(1) in 'a1b'` instead.",
   "```python\nprint('ell' in 'Hello')     # True\nprint('H' not in 'Hello')   # False\nprint('' in 'abc')          # True\nfor i, ch in enumerate('ab'):\n    print(i, ch)            # 0 a, then 1 b\n```",
   "Membership tests are often the clearest way to express a condition. Instead of `if ch == 'a' or ch == 'e' or ch == 'i' ...`, you can write `if ch in 'aeiou':`, which reads almost like English. Be aware of exactly what that means, though: `ch in 'aeiou'` would also be True for a multi-character value such as 'ei', or for the empty string. That is fine when you know `ch` came from looping over a string and therefore holds exactly one character, but worth remembering when the value comes from user input. If you need to match whole items rather than substrings, test against a list or tuple instead: `ch in ['a', 'e', 'i', 'o', 'u']` is True only for an exact element match.",
   "A loop over an empty string runs zero times, which means code that counts or accumulates simply returns its starting value without error. Strings also work with the built-in functions `len()`, `min()` and `max()`; `min()` and `max()` compare characters by their Unicode code points, so `max('Hello')` is 'o' and `min('Hello')` is 'H', because every uppercase letter has a smaller code point than every lowercase letter. Keep that ordering in mind, because it returns in the lesson on comparing strings.",
   "To summarize for the exam: a for loop over a string yields one-character strings in order, `enumerate()` adds the index, the loop variable is a copy and changing it does not change the string, `in` tests for a contiguous and case-sensitive substring, the empty string is in every string, and a non-string left operand raises TypeError."
  ],
  "analogy": "Checking `in` on a string is like searching a printed sentence for a phrase with a highlighter. You are looking for the exact letters, side by side, in the same order and the same capitalization; scattered letters elsewhere on the line do not count. The analogy stops working at the empty string: a highlighter cannot mark nothing, but Python always reports that the empty string is found.",
  "terms": [
   [
    "Iteration",
    "Visiting each element of a sequence in turn, as a for loop does with a string's characters."
   ],
   [
    "Membership operator",
    "in or not in, which test whether a value occurs in a container or a substring occurs in a string."
   ],
   [
    "Substring",
    "A run of adjacent characters that appears, in order, inside a longer string."
   ],
   [
    "enumerate()",
    "Built-in that pairs each element with its index during iteration."
   ],
   [
    "Immutable",
    "Unable to be changed after creation; string operations always produce new strings."
   ]
  ],
  "example": "A form validator rejects usernames containing spaces with if ' ' in username, and checks a password contains at least one digit with any(ch in '0123456789' for ch in password).",
  "mistakes": [
   [
    "Thinking 'eh' in 'Hello' is True because both letters appear somewhere in the word.",
    "For strings, in looks for a contiguous substring. The characters must be adjacent and in the same order, so the result is False."
   ],
   [
    "Assuming in ignores letter case, so 'h' in 'Hello' is True.",
    "Membership is case-sensitive. Lowercase 'h' and uppercase 'H' are different characters. Lowercase both sides first if you want a case-insensitive test."
   ],
   [
    "Expecting 1 in 'a1b' to return True because the digit 1 is visible in the text.",
    "A string's in operator requires a string on the left. An int raises TypeError; use '1' in 'a1b'."
   ],
   [
    "Believing that changing the loop variable changes the string, as in for ch in s: ch = ch.upper().",
    "ch is just a name bound to a one-character string. Strings are immutable, so s is unchanged; build a new string instead."
   ]
  ],
  "tryit": [
   [
    "A teammate writes a check that blocks product codes containing the forbidden pair 'XX'. The codes come in mixed case, such as 'abXxd', and the check is if 'XX' in code: reject(). A tester reports that 'abXxd' is being accepted. Is the check working as written, and how would you fix it?",
    "It is working exactly as written: 'XX' in 'abXxd' is False because the match is case-sensitive and the code contains 'Xx', not 'XX'. If the rule is meant to ignore case, normalize first: if 'XX' in code.upper(): reject()."
   ],
   [
    "You need to print each character of a word together with its position, starting from 0. One option is a loop over range(len(word)) using word[i]; another is enumerate(word). Which would you choose, and do they print the same thing?",
    "Both print the same pairs. enumerate(word) is clearer and avoids indexing mistakes, so it is the better choice in new code, but you should be able to read the range(len()) form because it appears in exam questions."
   ]
  ],
  "tip": "For strings, in tests for a contiguous, case-sensitive substring, and the empty string is always in any string. Mixing types, like 3 in 'a3', raises TypeError.",
  "check": [
   [
    "What does 'ab' in 'a b' return?",
    "False, because the characters are not adjacent in 'a b'."
   ],
   [
    "How many times does the body of for c in '' run?",
    "Zero times; the empty string has no characters."
   ],
   [
    "What does '' in 'xyz' return?",
    "True. The empty string is a substring of every string."
   ],
   [
    "What happens when Python evaluates 5 in '12345'?",
    "TypeError, because the left operand of in must be a string when the right operand is a string."
   ]
  ]
 },
 {
  "t": "Concatenation, replication and comparison of strings (and why comparing strings with numbers using < fails)",
  "hook": "It is the end of the quarter at Ridgeway Freight, and Tomas runs the script that sorts invoice numbers so the accounts team can match them to payments. The output comes back as 1, 10, 100, 11, 2, and the team lead asks why invoice 2 is filed after invoice 100. Tomas tries a quick fix that compares each value to the number 50, and the script stops dead with a TypeError he has never seen before. Meanwhile, a label printer elsewhere in the code is crashing on 'Order ' + 42. Three bugs, one root cause: Python's string operators look like arithmetic but follow their own rules. Which rules are tripping Tomas up?",
  "simple": "Python lets you use + and * on text, but they mean something different than with numbers. + glues two pieces of text together, so 'sun' + 'flower' becomes 'sunflower'. * repeats text, so 'ha' * 3 becomes 'hahaha'. You can also compare text to see which comes first, a bit like ordering words in a dictionary, except Python decides by a numeric code behind each character, so capital letters come before small ones and '10' comes before '9'. You can ask whether text equals a number, and the answer is simply no. But asking whether text is smaller than a number makes Python stop with an error, because there is no sensible answer.",
  "body": [
   "Two arithmetic operators take on new meanings when used with strings. The plus sign `+` concatenates, which means joins end to end: `'Py' + 'thon'` is 'Python'. Both operands must be strings. `'Age: ' + 30` raises `TypeError: can only concatenate str (not \"int\") to str`, because Python will not silently turn the number into text. Convert first with `str(30)`, or use an f-string such as `f'Age: {age}'`, which converts for you.",
   "The asterisk `*` replicates, which means repeats: `'ab' * 3` is 'ababab', and the operands can be swapped, so `3 * 'ab'` gives the same result. The other operand must be an integer; `'ab' * 2.0` raises TypeError even though 2.0 looks like a whole number. Multiplying by 0 or by a negative number gives the empty string rather than an error, so `'ab' * -1` is ''. The augmented forms `+=` and `*=` work as well. Because strings are immutable, they never modify the existing string; they build a new one and rebind the name to it. That detail matters when another name still refers to the old string, since that name keeps seeing the original value.",
   "Strings can be compared with all six comparison operators: `==`, `!=`, `<`, `<=`, `>` and `>=`. Equality is exact and case-sensitive, so `'abc' == 'ABC'` is False and `'abc' == 'abc '` is False because of the trailing space. Ordering is lexicographic, like a dictionary, but based on Unicode code points rather than alphabet rules. A code point is the number Python associates with each character; `ord('A')` is 65, `ord('a')` is 97, and `ord('0')` is 48.",
   "Here is how the comparison proceeds. Python compares the first characters of both strings. If they differ, the character with the smaller code point makes its string smaller, and the comparison is over. If they are equal, Python moves to the second pair, and so on. If one string runs out first and every character so far matched, the shorter string is smaller, so `'app' < 'apple'` is True. Length alone never decides the result while characters still differ: `'b' > 'abc'` is True because 'b' beats 'a' at the very first position.",
   "```python\nprint('apple' < 'banana')   # True\nprint('Zebra' < 'apple')    # True: 'Z' is 90, 'a' is 97\nprint('10' < '9')           # True: '1' is 49, '9' is 57\nprint('abc' < 'abd')        # True: decided at the third character\nprint('ab' * 0 == '')       # True\n```",
   "Because of code point order, all uppercase ASCII (American Standard Code for Information Interchange) letters sort before all lowercase ones, and digits come before letters. That produces two classic bugs. First, 'Zebra' sorts before 'apple', which surprises anyone expecting dictionary order. For case-insensitive comparison, compare lowercased versions: `a.lower() < b.lower()`. Second, numeric strings compare character by character, so '10' is less than '9' and '100' is less than '2'. This is exactly what happens when numbers read from a file or from `input()` are sorted while still text. Convert with `int()` or `float()` before comparing when you want numeric order.",
   "Comparing a string with a number is where the exam likes to test you, and the rule splits cleanly in two. The equality operators always work across types: `'1' == 1` is simply False and `'1' != 1` is True, because values of different types are not equal. No error occurs. The ordering operators do not work across these types: `'1' < 1` raises `TypeError: '<' not supported between instances of 'str' and 'int'`. Python 3 refuses to guess a meaningful order between unrelated types. Earlier versions of the language allowed such comparisons and produced arbitrary results, which hid bugs; Python 3 made it an error on purpose.",
   "The same TypeError appears indirectly whenever an operation needs ordering. Calling `sorted()` on a list that mixes strings and numbers, such as `sorted([3, '1', 2])`, fails, and so do `max()` and `min()` on such a list, because each of them uses `<` internally. When you see that error in exam output, look for a mixed list. Fixing it means deciding what the data really is and converting everything to one type before sorting.",
   "In short: `+` and `*` build new strings and need a string plus a string, or a string and an integer, respectively; comparisons are code-point lexicographic and case-sensitive; `==` and `!=` across types are safe but report inequality; and `<`, `<=`, `>` or `>=` between a string and a number raise TypeError."
  ],
  "analogy": "Comparing strings is like ordering names on a list of house numbers written as words on mailboxes, where you decide only by the first letter that differs and never by length. A short name can come after a long one if its first differing letter is later. Where the analogy stops: Python's 'alphabet' is the code point table, so every capital letter comes before every small letter and digits come before both.",
  "terms": [
   [
    "Concatenation",
    "Joining strings end to end with +."
   ],
   [
    "Replication",
    "Repeating a string a whole number of times with *."
   ],
   [
    "Lexicographic order",
    "Comparing sequences element by element, the first difference deciding the result."
   ],
   [
    "Code point",
    "The number assigned to a character, returned by ord(); string comparisons use these numbers."
   ]
  ],
  "example": "A script reads version numbers from a text file and sorts them as strings, producing 1, 10, 2, 3. Converting each value with int() before sorting gives the intended 1, 2, 3, 10.",
  "mistakes": [
   [
    "Expecting '5' == 5 to raise an error just as '5' < 5 does.",
    "Equality across types is allowed and simply returns False. Only the ordering operators raise TypeError between str and int."
   ],
   [
    "Assuming the longer string is always greater, so 'b' < 'abc'.",
    "The first differing character decides. 'b' has a larger code point than 'a', so 'b' > 'abc' is True; length matters only when one string is a prefix of the other."
   ],
   [
    "Believing 'ab' * -2 raises an error.",
    "A zero or negative replication count produces the empty string ''. Only a non-integer count, such as 2.0, raises TypeError."
   ],
   [
    "Thinking 'Order ' + 42 will print Order 42.",
    "+ needs two strings and raises TypeError here. Use 'Order ' + str(42) or an f-string."
   ]
  ],
  "tryit": [
   [
    "A teacher's grade script reads student IDs as text from a file and sorts them with sorted(ids). The IDs are '7', '12', '3' and '105'. A parent complains that ID 105 appears before ID 3. What order did the script produce, and what one change fixes it?",
    "Sorting text compares code points character by character, so the result is ['105', '12', '3', '7']. Converting to integers first, for example sorted(ids, key=int) or sorted(int(i) for i in ids), gives numeric order 3, 7, 12, 105."
   ],
   [
    "Your colleague wants to skip blank prices and writes if price < 0: where price may be either the string '' or a float. What will happen on a blank row, and what is a safer approach?",
    "Comparing '' < 0 raises TypeError, because ordering between str and int is not supported. Check for the empty string first, with if price == '': continue, then convert the rest with float() before comparing."
   ]
  ],
  "tip": "'5' == 5 is False without error, but '5' < 5 raises TypeError. In string ordering, uppercase comes before lowercase and '10' < '9'.",
  "check": [
   [
    "What does 'a' * -2 produce?",
    "The empty string ''; negative replication counts are treated as zero."
   ],
   [
    "Is 'Apple' < 'apple' True or False, and why?",
    "True, because 'A' (65) has a smaller code point than 'a' (97)."
   ],
   [
    "What happens when evaluating 'abc' > 5?",
    "TypeError: ordering comparisons between str and int are not supported."
   ],
   [
    "Is 'app' < 'apple' True or False?",
    "True; all characters of 'app' match and it runs out first, so the shorter string is smaller."
   ]
  ]
 },
 {
  "t": "Character tests: isdigit(), isalpha(), isalnum(), isspace(), isupper(), islower()",
  "hook": "You are helping Jordan at Maple Grove Clinic, where the new patient check-in kiosk keeps crashing. The age field calls int() on whatever patients type, and someone typed 'forty'. Then someone typed '-' by accident. Then someone just pressed Enter. Each time the kiosk shows a red error screen and the receptionist has to restart it while a line forms. Jordan wants to validate the input before converting it, and has found a family of string methods whose names all start with 'is'. They look simple, but their rules about empty strings, minus signs and letter case are exactly where bugs, and exam questions, hide. Which test should guard that int() call, and what will it miss?",
  "simple": "Python strings come with built-in yes-or-no questions you can ask about the characters inside them. isdigit() asks: is every character a digit, 0 to 9? isalpha() asks: is every character a letter? isalnum() asks: is every character a letter or a digit? isspace() asks: is it all blank space, like spaces or tabs? isupper() and islower() ask whether the letters are all capital or all small, ignoring numbers and punctuation. A useful way to picture it: it is like checking that every item in a basket is fruit. An empty basket gets the answer no, because there is nothing in it to check.",
  "body": [
   "Strings have a family of methods beginning with `is` that test what kind of characters the string contains. Each returns True or False, and none of them changes the string. They are ideal for validating input before converting or storing it, so a program can ask the user to try again instead of crashing. All of them share two rules that exam questions probe repeatedly. The test applies to every character in the string, not just the first one. And an empty string returns False for every one of these methods.",
   "Start with the three content tests. `isdigit()` returns True if every character is a digit, so `'2024'.isdigit()` is True. But `'-5'.isdigit()` and `'3.14'.isdigit()` are False, because the minus sign and the decimal point are not digits; this method cannot recognize negative numbers or decimals. `isalpha()` is True if every character is a letter, so `'Hello'.isalpha()` is True while `'Hello World'.isalpha()` is False because the space is not a letter. `isalnum()` is True if every character is a letter or a digit, so `'abc123'.isalnum()` is True, but `'abc_123'.isalnum()` is False because of the underscore. These methods understand Unicode, the international standard for characters, so accented letters such as 'é' count as alphabetic.",
   "`isspace()` is True if every character is whitespace. Spaces, tabs written as `\\t`, and newlines written as `\\n` all qualify, so `' \\t\\n'.isspace()` is True. It is a quick way to detect a line that looks blank but is not empty. Remember the shared rule: the empty string '' is not considered whitespace, so `''.isspace()` is False. To catch both empty and blank lines in one test, a common pattern is `if not line.strip():`, which strips whitespace and then checks for emptiness.",
   "`isupper()` and `islower()` follow a slightly different logic because they look only at cased characters, meaning letters that have distinct upper and lower forms. `isupper()` is True if there is at least one cased character and all cased characters are uppercase. Digits, spaces and punctuation are ignored. So `'ABC 123?'.isupper()` is True, but `'123'.isupper()` is False, because there are no cased characters at all to be uppercase. `islower()` works the same way for lowercase, so `'abc-9'.islower()` is True. A mixed string such as 'Hello' is neither upper nor lower, and both methods return False for it.",
   "```python\ntests = ['2024', '-5', 'abc', 'abc123', 'A B', '', 'HELLO 1', ' \\t']\nfor s in tests:\n    print(repr(s), s.isdigit(), s.isalpha(), s.isalnum(),\n          s.isspace(), s.isupper(), s.islower())\n```",
   "Running the loop above in IDLE, the Integrated Development and Learning Environment that ships with Python, and predicting each line before you look is excellent exam practice. A few rows are worth checking in your head now. '2024' is True for `isdigit()` and `isalnum()` but False for `isalpha()`. 'A B' fails `isalpha()` and `isalnum()` because of the space, yet `isupper()` is True. The empty string prints False in every column. 'HELLO 1' is upper but not alphanumeric, because the space breaks `isalnum()`. Using `repr()` in the print call shows quotes and escape sequences, so you can see the empty string and the tab clearly.",
   "A practical pattern combines these methods with iteration over a string. To count character types in a password, you can write `sum(c.isdigit() for c in pw)`, which counts digits, because True counts as 1 and False as 0 when summed. Similarly, `any(c.isupper() for c in pw)` tells you whether at least one uppercase letter is present. Notice the difference between calling a method on the whole string, which asks about every character, and calling it on each character in a loop, which lets you ask about some characters.",
   "Do not confuse these tests with the converting methods `upper()` and `lower()`, which return new strings and never return a Boolean. A line such as `if name.upper:` without parentheses is always true, because it tests the method object itself. Also note that `isdigit()` being True does not guarantee that `int()` will accept the string in every case, because Unicode includes some special digit characters, such as superscript two, that count as digits but are not accepted by `int()`. For ordinary ASCII (American Standard Code for Information Interchange) input typed on a keyboard, the two agree, and `isdigit()` is a reasonable guard before conversion.",
   "The exam summary is short: every `is` method needs a non-empty string, content tests check every character, `isdigit()` rejects signs and decimal points, and the case tests ignore non-letters but need at least one letter."
  ],
  "analogy": "These methods work like a strict inspector checking a crate of parcels: every single parcel must pass for the crate to be approved, and an empty crate is never approved because there is nothing to certify. The case tests are a slightly different inspector who only looks at parcels with labels, ignores unlabeled ones, but still refuses to sign off if no labeled parcels exist at all.",
  "terms": [
   [
    "isdigit()",
    "True if the string is non-empty and every character is a digit."
   ],
   [
    "isalpha()",
    "True if the string is non-empty and every character is a letter."
   ],
   [
    "isalnum()",
    "True if the string is non-empty and every character is a letter or digit."
   ],
   [
    "isspace()",
    "True if the string is non-empty and every character is whitespace."
   ],
   [
    "Cased character",
    "A letter with distinct upper and lower forms; isupper() and islower() consider only these."
   ]
  ],
  "example": "A registration form accepts a username only if username.isalnum() is True, rejecting spaces and symbols, and asks the user to try again when age.isdigit() is False instead of crashing on int(age).",
  "mistakes": [
   [
    "Using isdigit() to validate any number, including negatives and decimals.",
    "'-5'.isdigit() and '3.14'.isdigit() are both False, because '-' and '.' are not digits. For signed or decimal input, try the conversion inside try and except ValueError instead."
   ],
   [
    "Expecting ''.isspace() or ''.isalpha() to be True because there is nothing that breaks the rule.",
    "Every is-method returns False for the empty string. Check for emptiness separately if empty input matters."
   ],
   [
    "Thinking '123'.isupper() is True because there are no lowercase letters.",
    "isupper() needs at least one cased character. With none, it returns False."
   ],
   [
    "Thinking 'user_1'.isalnum() is True because underscores are allowed in Python names.",
    "isalnum() accepts only letters and digits. The underscore makes it False."
   ]
  ],
  "tryit": [
   [
    "A sign-up page must accept usernames made only of letters and digits, 3 to 12 characters long. A developer writes if name.isalnum(): accept(). A tester enters an empty name and it is rejected, then enters 'ab' and it is accepted. Is the length rule enforced, and what should the condition be?",
    "isalnum() correctly rejects the empty string but does nothing about length, so 'ab' slips through. The condition should combine both checks: if name.isalnum() and 3 <= len(name) <= 12: accept()."
   ],
   [
    "A script must skip lines in a text file that are blank or contain only spaces and tabs. It uses if line.isspace(): continue. Lines read from the file keep their trailing newline, except possibly the last one, which may be empty. Will every blank line be skipped?",
    "Lines like '   \\n' are skipped because they are all whitespace. A completely empty string, which can occur when the file ends, returns False for isspace(), so it would not be skipped. Using if not line.strip(): handles both cases."
   ]
  ],
  "tip": "Every is-method returns False for the empty string. isdigit() rejects '-' and '.', and isupper() needs at least one uppercase letter and no lowercase ones, ignoring digits and symbols.",
  "check": [
   [
    "What does '3.5'.isdigit() return?",
    "False, because the dot is not a digit."
   ],
   [
    "What does 'HELLO WORLD'.isupper() return?",
    "True: all cased characters are uppercase, and the space is ignored."
   ],
   [
    "What does 'Hello'.islower() return?",
    "False, because 'H' is an uppercase cased character."
   ],
   [
    "What does ''.isalnum() return?",
    "False; every is-method returns False for the empty string."
   ]
  ]
 },
 {
  "t": "Join(), split(), find(), rfind(), index(), and the difference between find and index",
  "hook": "At Cobalt Street Studios, Amara maintains the script that reads the render farm's log every night and emails a summary. Last night the email never arrived. The log had one line without the 'job=' field, and her code called index() to find it, which threw an exception and killed the whole run. A week earlier a different version used find() inside an if statement and silently skipped every line where the field appeared at the very start. Both bugs came from methods that look almost identical. Now the producer wants to know whether tonight's report will be reliable. Do you know exactly how find and index differ, and how split and join reshape a line?",
  "simple": "These tools cut text apart, glue it together and search inside it. split() is like cutting a sentence into separate words wherever there is a space, giving you a list. join() does the reverse: it takes a list of words and glues them together with something in between, like commas. find() looks for a piece of text and tells you the position where it starts, counting from 0, or gives back -1 if it is not there. index() does the same search, but if the text is missing it stops the program with an error instead. Think of find() as a friend who shrugs and says 'not here', and index() as an alarm that goes off.",
  "body": [
   "These methods break strings apart, glue them together and search inside them. They are among the most used methods in real Python code, and among the most frequently tested in the PCAP (Certified Associate Python Programmer) exam, usually through short snippets where you must predict the printed output exactly, including brackets and quotes.",
   "`split()` breaks a string into a list of substrings. With no argument, it splits on runs of whitespace of any length and discards leading and trailing whitespace, so `'  a  b\\tc '.split()` is `['a', 'b', 'c']`. With a separator argument, it splits on exactly that string and keeps empty pieces between consecutive separators: `'a,,b'.split(',')` is `['a', '', 'b']`, and `'a b  c'.split(' ')` is `['a', 'b', '', 'c']`. That difference between the no-argument form and the explicit-space form is a favorite exam trap. An optional second argument, `maxsplit`, limits how many splits occur, counting from the left: `'a-b-c-d'.split('-', 1)` is `['a', 'b-c-d']`. Calling `split()` always returns a list, even when no separator is found, in which case the list holds the whole original string.",
   "`join()` is the opposite operation, and its shape surprises beginners. It is called on the separator string, and its argument is an iterable of strings. `'-'.join(['2024', '09', '25'])` gives '2024-09-25', and `''.join(list_of_chars)` glues characters together with nothing between them. Every item must already be a string: `','.join([1, 2])` raises TypeError, so convert first, for example with `','.join(str(n) for n in nums)`. Writing `items.join(', ')` fails with AttributeError, because lists have no `join()` method. Since a string is itself an iterable of characters, `'-'.join('abc')` is 'a-b-c'.",
   "```python\nwords = 'the quick brown fox'.split()\nprint(words)                 # ['the', 'quick', 'brown', 'fox']\nprint(' '.join(reversed(words)))  # fox brown quick the\n\ns = 'banana'\nprint(s.find('an'))          # 1\nprint(s.rfind('an'))         # 3\nprint(s.find('x'))           # -1\n# s.index('x')               # ValueError: substring not found\n```",
   "Searching starts with `find(sub)`, which returns the lowest index where the substring begins, or -1 if it does not occur at all. `rfind(sub)` searches from the right and returns the highest starting index, again -1 if absent. In 'banana', 'an' starts at positions 1 and 3, so `find()` reports 1 and `rfind()` reports 3. Both accept optional start and end arguments to limit the search region, interpreted like slice bounds: `s.find('a', 2)` begins looking at index 2 and returns 3 for 'banana'. Searching for the empty string returns the start position, so `'abc'.find('')` is 0.",
   "`index(sub)` finds a substring exactly like `find()` and returns the same lowest index when it is present. The only difference is the failure behavior: when the substring is missing, `index()` raises `ValueError: substring not found` instead of returning -1. There is also `rindex()`, the counterpart of `rfind()`, which raises ValueError the same way. So the difference between find and index is not about speed or direction; it is purely about what happens on failure. Use `find()` when absence is normal and you will check for -1. Use `index()` when absence would be a bug and you would rather the program fail loudly, or when you plan to catch the ValueError in a try block.",
   "A classic mistake with `find()` is writing `if s.find(x):` as a yes-or-no test. That condition is False when x is found at position 0, because 0 is falsy, and True when x is missing, because -1 is truthy, which is backwards in exactly the cases that matter. Compare explicitly with `if s.find(x) != -1:`, or, when you only need a yes or no, use the membership operator: `if x in s:`.",
   "Lists have an `index()` method as well, which returns the position of the first matching item and raises ValueError when the item is missing. Lists do not have a `find()` method, though; calling `[1, 2].find(2)` raises AttributeError. Only strings have `find()` and `rfind()`. Exam questions sometimes test exactly this asymmetry between the two sequence types.",
   "Put together, these methods form a typical text-processing pipeline: split a line into fields, search a field for a marker with `find()` so a missing marker does not crash the program, and rebuild cleaned output with `join()`. When you trace such code for the exam, write down each intermediate value: the exact list that `split()` returns, including any empty strings, the integer that `find()` returns, and the final joined string with its separators. Most wrong answers come from skipping one of those steps, such as forgetting that an explicit separator keeps empty pieces, or that `find()` counts positions from 0."
  ],
  "analogy": "find() and index() are like two assistants sent to look for a file in a cabinet. Both come back with the drawer number if they find it. If the file is missing, the first assistant calmly hands you a note saying -1, and you must remember to read it, while the second sets off the fire alarm so nobody can ignore the problem. Neither is faster; they differ only in how they report failure.",
  "terms": [
   [
    "split()",
    "Returns a list of substrings separated by whitespace or by a given separator."
   ],
   [
    "join()",
    "Called on a separator string; concatenates an iterable of strings with that separator between them."
   ],
   [
    "find() / rfind()",
    "Return the lowest or highest index of a substring, or -1 if it is absent."
   ],
   [
    "index() / rindex()",
    "Like find() and rfind() but raise ValueError when the substring is absent."
   ],
   [
    "maxsplit",
    "The optional second argument to split() that limits how many splits are made."
   ]
  ],
  "example": "A log parser splits each line with line.split(' ', 2) into date, level and message, uses message.find('user=') to locate an optional field without risking an exception, and rebuilds cleaned lines with '\\t'.join(parts).",
  "mistakes": [
   [
    "Writing items.join(', ') to combine a list of strings.",
    "join() is a string method called on the separator: ', '.join(items). Lists have no join() method."
   ],
   [
    "Assuming 'a  b'.split(' ') and 'a  b'.split() give the same result.",
    "With no argument, runs of whitespace count as one separator, giving ['a', 'b']. With ' ' explicitly, each space splits, giving ['a', '', 'b']."
   ],
   [
    "Thinking find() and index() differ in speed or search direction.",
    "They search the same way and return the same index when found. find() returns -1 when the substring is missing; index() raises ValueError."
   ],
   [
    "Using if s.find('x'): to test whether 'x' is present.",
    "find() returns 0 when 'x' is at the start (falsy) and -1 when missing (truthy). Use 'x' in s or compare with != -1."
   ]
  ],
  "tryit": [
   [
    "A configuration file has lines like 'timeout = 30' and occasionally a comment line with no '=' at all. You need the key and value for real settings and must skip comments without crashing. Should you locate the '=' with find() or index(), and how would you split the line?",
    "Use find(), because a missing '=' is a normal case here: if line.find('=') == -1, skip the line. For real settings, key, value = line.split('=', 1) splits only at the first '=', and calling strip() on each part removes the spaces."
   ],
   [
    "A teammate builds a CSV (comma-separated values) row with ','.join([name, age, city]) where age is the integer 34. The program crashes. What error occurs, and how should the line be written?",
    "join() requires every item to be a string, so it raises TypeError. Convert first, for example ','.join([name, str(age), city]) or ','.join(str(v) for v in row)."
   ]
  ],
  "tip": "find returns -1 on failure; index raises ValueError. And join is called on the separator: ', '.join(items), never items.join(', ').",
  "check": [
   [
    "What is 'a b  c'.split(' ')?",
    "['a', 'b', '', 'c']: with an explicit separator, consecutive spaces produce an empty string."
   ],
   [
    "What does 'hello'.rfind('l') return?",
    "3, the index of the last 'l'."
   ],
   [
    "Why is if s.find('a'): unreliable?",
    "find returns 0 (falsy) when 'a' is at the start and -1 (truthy) when absent, so the condition is backwards in those cases."
   ],
   [
    "What does '-'.join('xyz') return?",
    "'x-y-z', because a string is an iterable of one-character strings."
   ]
  ]
 },
 {
  "t": "Sorted() on strings versus list.sort()",
  "hook": "It is the night before a school science fair at Juniper Hill Middle School, and Mr. Okafor's volunteer, Lena, is writing a quick script to print the alphabetical list of student projects for the judges. She writes projects = projects.sort() and prints the result. The printer spits out a single word: None. She tries again with sorted() on the title of one project to alphabetize its letters for a word puzzle, and gets a list of single characters in square brackets instead of a word. The fair opens at eight. Two tools, both called sort, and each one surprised her in a different way. What exactly does each one return?",
  "simple": "Python has two ways to put things in order. sorted() is like photocopying a stack of cards, arranging the copies in order and handing them to you as a list, while the original stack stays as it was. It works on anything you can loop over, even a word, which it breaks into letters. list.sort() is like rearranging the original stack of cards in place on the table. It only works on lists, and it does not hand anything back; it just reports 'nothing', which Python calls None. So if you write x = mylist.sort(), you end up holding nothing instead of the sorted list.",
  "body": [
   "Python gives you two ways to sort, and they behave differently in ways the exam checks directly. The built-in function `sorted()` accepts any iterable, meaning anything a for loop can walk through, including a string, a tuple, a dictionary or a list. It returns a new list containing the items in order and leaves the input untouched. The method `list.sort()` exists only on lists, sorts that particular list in place by rearranging its items, and returns None. Almost every question on this topic comes down to remembering those two return values: a new list from `sorted()`, and None from `sort()`.",
   "Apply `sorted()` to a string and you get a list of its characters, not a string. `sorted('python')` is `['h', 'n', 'o', 'p', 't', 'y']`. To turn the result back into a string, join it with an empty separator: `''.join(sorted('python'))` gives 'hnopty'. The original string is unchanged, as it must be, because strings are immutable. That immutability is also why strings have no `sort()` method at all: `'python'.sort()` raises AttributeError, since there is no way to rearrange a string in place. Tuples, which are also immutable, likewise have no `sort()` method, but `sorted()` happily accepts them and returns a list.",
   "```python\nword = 'Banana'\nprint(sorted(word))                # ['B', 'a', 'a', 'a', 'n', 'n']\nprint(''.join(sorted(word)))       # Baaann\n\nnames = ['bob', 'Alice', 'carol']\nresult = names.sort()\nprint(result)                      # None\nprint(names)                       # ['Alice', 'bob', 'carol']\nprint(sorted(names, reverse=True)) # ['carol', 'bob', 'Alice']\n```",
   "Walk through the example carefully. `sorted(word)` puts the uppercase 'B' first because its code point, 66, is smaller than that of any lowercase letter. Joining gives 'Baaann'. Then `names.sort()` rearranges the list itself, so printing `names` shows the new order, while `result` holds None because that is what the method returns. The final line builds a fresh descending list and leaves `names` in its ascending order.",
   "The default order for strings is code point order, so uppercase letters come before lowercase ones: `sorted(['b', 'A', 'a', 'B'])` is `['A', 'B', 'a', 'b']`. Both `sorted()` and `list.sort()` accept the same two keyword arguments to change this behavior. `reverse=True` sorts in descending order. `key=` takes a function that is applied to each item to produce the value that is actually compared, while the items themselves are what end up in the result. `key=str.lower` sorts case-insensitively, so `sorted(['b', 'A', 'a', 'B'], key=str.lower)` groups the A's before the B's. `key=len` sorts strings by length. Note that you pass the function itself, `str.lower`, without parentheses; writing `key=str.lower()` would try to call it immediately and fail.",
   "Python's sort is stable, which means items that compare equal keep their original relative order. In the case-insensitive example above, 'A' and 'a' compare equal under `str.lower`, so they appear in the order they had in the input. Stability is what lets you sort by one criterion and then by another and have the earlier order preserved as a tiebreaker.",
   "The biggest trap on this topic is assignment. Because `list.sort()` returns None, writing `names = names.sort()` destroys your data: the list is sorted and then immediately thrown away, and `names` now refers to None. Any later `for n in names:` raises TypeError because None is not iterable. In the same way, `print(names.sort())` prints None even though the list was in fact sorted. With `sorted()`, the opposite mistake is calling it without keeping the result: `sorted(names)` alone on a line creates a sorted list and discards it, leaving `names` exactly as it was.",
   "Choose by need. Use `list.sort()` when you have a list and no longer need its original order; it sorts in place and avoids creating a copy, which matters for very large lists. Use `sorted()` for anything that is not a list, such as strings, tuples, dictionary keys or generator results, or when you want to keep the original sequence unchanged. Calling `sorted()` on a dictionary sorts and returns its keys.",
   "A handy use of `sorted()` on strings is checking anagrams. Two words are anagrams if `sorted(a) == sorted(b)`, since both produce lists of the same characters in the same order regardless of how the letters were arranged. Lowercase both words first if capital letters should not matter. As always, keep in mind that comparing these lists compares their characters by code point, so 'Listen' and 'silent' are not anagrams until you normalize the case."
  ],
  "analogy": "sorted() is a photocopier that hands you a neatly ordered copy and leaves your original pile alone; list.sort() is you reshuffling the original pile on your desk and then saying nothing when asked what you produced. If you write down what you were handed, you get a copy from the first and a blank note from the second. The analogy stops at strings: you cannot reshuffle a printed word, so only the photocopier works on them.",
  "terms": [
   [
    "sorted()",
    "Built-in that returns a new sorted list from any iterable."
   ],
   [
    "list.sort()",
    "Method that sorts a list in place and returns None."
   ],
   [
    "key function",
    "A function passed as key= that computes the value used for comparisons."
   ],
   [
    "Stable sort",
    "A sort that keeps equal items in their original relative order."
   ],
   [
    "In place",
    "Changing an existing object directly instead of creating a new one."
   ]
  ],
  "example": "A word-game helper checks whether a player's guess is an anagram of the target with sorted(guess.lower()) == sorted(target.lower()), which works regardless of letter order or capitalization.",
  "mistakes": [
   [
    "Writing names = names.sort() to get a sorted list.",
    "sort() returns None, so names becomes None and the data is lost. Call names.sort() on its own line, or write names = sorted(names)."
   ],
   [
    "Expecting sorted('cab') to return the string 'abc'.",
    "sorted() always returns a list: ['a', 'b', 'c']. Use ''.join(sorted('cab')) to get a string."
   ],
   [
    "Calling 'hello'.sort() to sort a string's letters.",
    "Strings are immutable and have no sort() method, so this raises AttributeError. Use sorted() and join."
   ],
   [
    "Writing key=str.lower() with parentheses.",
    "key expects a function object. Pass key=str.lower without calling it."
   ]
  ],
  "tryit": [
   [
    "A teacher's script keeps a list of student names in the order they arrived, which is needed later for a seating chart, and also needs to print the names alphabetically right now. A helper suggests calling names.sort() before printing. Is that a good idea, and what would you use instead?",
    "No. names.sort() would permanently reorder the list and lose the arrival order needed for the seating chart. Use for n in sorted(names): print(n), which produces a new sorted list and leaves names unchanged."
   ],
   [
    "You need to sort the list ['banana', 'Apple', 'cherry'] alphabetically, ignoring case, and keep the original capitalization in the output. What call produces ['Apple', 'banana', 'cherry']?",
    "sorted(words, key=str.lower), or words.sort(key=str.lower) if changing the list in place is acceptable. The key affects only comparison, so the items keep their original capitalization."
   ]
  ],
  "tip": "sorted('abc') returns a list, not a string; join it to get a string. list.sort() returns None, so never assign or print its result expecting a list.",
  "check": [
   [
    "What is the type of sorted('hello')?",
    "list, containing the characters in sorted order: ['e', 'h', 'l', 'l', 'o']."
   ],
   [
    "What is x after x = [3, 1, 2].sort()?",
    "None, because sort() works in place and returns None."
   ],
   [
    "What does sorted(['b', 'A', 'c']) return?",
    "['A', 'b', 'c'], because uppercase 'A' has a smaller code point than lowercase letters."
   ],
   [
    "Does a tuple have a sort() method?",
    "No. Tuples are immutable; use sorted(t), which returns a list."
   ]
  ]
 },
 {
  "t": "Core ideas: class, object, attribute, method, encapsulation, inheritance, superclass and subclass",
  "hook": "You join the small developer team at Bluefin Animal Shelter, which tracks dogs, cats and rabbits in one tangled script. Every animal is a dictionary, every action is a separate function, and last week someone set a rabbit's age to -3 because nothing stopped them. Grace, the lead volunteer, wants a cleaner design before the adoption drive and keeps using words like class, instance, encapsulation and subclass in the planning meeting. Half the room nods; the other half is lost. Object-oriented programming is the biggest section of the exam, and it all rests on this vocabulary. Can you explain what each of those words really means in Python, and how they fit together?",
  "simple": "Object-oriented programming is a way of organizing code around things. A class is a recipe or blueprint, like the plan for a kind of cake. An object is one actual cake baked from that plan, and you can bake many. Attributes are facts about each object, like its flavor, and methods are things it can do, like being sliced. Encapsulation means keeping each object's facts and actions together and letting outside code use the actions instead of poking at the facts directly. Inheritance means a new blueprint can start from an existing one and add or change things, the way a birthday-cake recipe starts from a basic cake recipe.",
  "body": [
   "Object-oriented programming (OOP) is a way of organizing a program around objects: bundles of data together with the code that works on that data. Instead of keeping separate lists of names, separate lists of balances and loose functions that update balances, you create account objects that each know their own balance and how to change it. The approach makes larger programs easier to reason about, because each piece of data travels with the rules that govern it. OOP is the largest section of the PCAP (Certified Associate Python Programmer) exam, so it pays to get the vocabulary exact.",
   "A class is a blueprint that describes what a kind of object contains and can do. An object, also called an instance, is one concrete thing built from that blueprint. `class Dog:` defines the class; `rex = Dog()` creates an object, and calling the class again creates another, completely independent object. You can create as many as you like, and each one has its own state. In Python, even built-in values are objects: `5` is an instance of the class `int`, `'hi'` is an instance of `str`, and `type(5)` reports `<class 'int'>`. Classes themselves are objects too, which is why you can pass them around and inspect them.",
   "An attribute is a named value that belongs to an object or a class, accessed with a dot: `rex.name`. A method is a function defined inside a class that operates on that class's objects, called with the same dot syntax: `rex.bark()`. Together, attributes hold an object's state, meaning the data that describes it right now, and methods define its behavior, meaning what it can do. When the exam asks you to tell them apart, the parentheses in the call and the `def` inside the class body are the giveaways.",
   "```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name          # attribute\n    def bark(self):               # method\n        return self.name + ' says woof'\n\nclass Puppy(Dog):                 # Puppy is a subclass of Dog\n    def bark(self):\n        return self.name + ' says yip'\n\nprint(Dog('Rex').bark())     # Rex says woof\nprint(Puppy('Bit').bark())   # Bit says yip\n```",
   "Look at what the example shows. `Dog` defines one attribute, `name`, set in the special method `__init__`, and one method, `bark()`. `Puppy` does not define `__init__` or `name` at all, yet `Puppy('Bit')` works, because it inherits `__init__` from `Dog`. It does define its own `bark()`, so calling `bark()` on a Puppy runs the Puppy version. That one example contains a class, two objects, an attribute, a method, inheritance and overriding.",
   "Encapsulation means keeping an object's data and the code that manages it together, and controlling access so that outside code uses the methods instead of reaching into the data directly. That lets a class enforce rules, such as refusing a negative balance or an impossible age, and change its internal details later without breaking the code that uses it. If every part of the program sets `account.balance` directly, every part must remember the rules; if they all call `account.withdraw()`, the rule lives in one place. Python supports encapsulation mostly by convention, using a leading underscore to mark internal names, plus a mechanism called name mangling for names beginning with two underscores, which a later lesson explains.",
   "Inheritance lets a new class be defined in terms of an existing one. The new class is the subclass, also called a child class or derived class; the existing class is the superclass, also called a parent class or base class. A subclass automatically has all the attributes and methods of its superclass and can add new ones or override existing ones with its own versions, as `Puppy` overrides `bark()`. Inheritance expresses an is-a relationship: a Puppy is a Dog, so anything you can do with a Dog you can do with a Puppy. In Python 3, every class ultimately inherits from the built-in class `object`, even if you do not write it, so `class Dog:` and `class Dog(object):` mean the same thing.",
   "One more term the exam uses is class hierarchy, the tree formed by classes and their subclasses. By convention it is drawn with the most general class at the top and more specific classes below. Moving down the tree means specialization, as in going from Animal to Dog to Puppy; moving up means generalization. A useful self-test is to sentence-check any proposed relationship: if 'a Square is a Shape' sounds right, inheritance fits; if 'a Car is an Engine' sounds wrong, the relationship is has-a, and the engine should be an attribute instead.",
   "Keep the core distinctions straight: class versus object, attribute versus method, superclass versus subclass, and encapsulation as the reason methods guard data."
  ],
  "analogy": "A class is like the architect's plan for a model of house, and each object is an actual house built from it, with its own paint color and its own residents. Encapsulation is the front door: visitors use it instead of climbing through windows. A subclass is a variant plan, such as the same house with a garage added. The analogy weakens for encapsulation in Python, where the 'windows' are only politely labeled, not locked.",
  "terms": [
   [
    "Class",
    "A blueprint defining the attributes and methods its objects will have."
   ],
   [
    "Object (instance)",
    "A concrete value created from a class, with its own state."
   ],
   [
    "Attribute",
    "A named value belonging to an object or class, accessed with dot notation."
   ],
   [
    "Method",
    "A function defined inside a class that operates on its objects."
   ],
   [
    "Encapsulation",
    "Bundling data with the methods that manage it and restricting direct access to that data."
   ],
   [
    "Superclass / subclass",
    "A parent class and a class that inherits from it, specializing or extending it."
   ]
  ],
  "example": "A drawing app defines a Shape superclass with a color attribute and an area() method, then subclasses Circle and Square that each override area(). The app keeps one list of shapes and asks each one for its area without caring which kind it is.",
  "mistakes": [
   [
    "Confusing the class with an object, as in thinking class Dog: creates a dog.",
    "The class statement only defines the blueprint. An object exists only after you call the class, as in rex = Dog()."
   ],
   [
    "Mixing up which class is the superclass in class Car(Vehicle):.",
    "The class in parentheses, Vehicle, is the superclass. Car is the subclass that inherits from it."
   ],
   [
    "Believing encapsulation in Python makes data impossible to reach from outside.",
    "Python relies on conventions and name mangling. They discourage and protect against accidental access but do not make data truly inaccessible."
   ],
   [
    "Thinking a class with no parentheses has no superclass.",
    "In Python 3 every class inherits from object, whether or not you write it."
   ]
  ],
  "tryit": [
   [
    "A shelter app needs Dog, Cat and Rabbit records. Each has a name and an age and needs a describe() method, but only dogs need a walk() method. A teammate proposes copying the same name, age and describe() code into three separate classes. How would you structure the classes instead?",
    "Create an Animal superclass that holds name, age and describe(), then define Dog, Cat and Rabbit as subclasses. Only Dog adds walk(). Each subclass is-an Animal, so inheritance fits, and shared code lives in one place."
   ],
   [
    "A developer models a Car class as a subclass of an Engine class so that cars get a start() method. Does that relationship pass the is-a test, and what would you suggest?",
    "A car is not an engine; it has an engine. That is a has-a relationship, so Car should have an engine attribute that holds an Engine object, and its start() method can call the engine's method."
   ]
  ],
  "tip": "A class is the blueprint; an object is an instance built from it. Subclasses inherit everything from superclasses and may override it, and every class inherits from object.",
  "check": [
   [
    "In class Car(Vehicle):, which is the superclass?",
    "Vehicle; Car is the subclass that inherits from it."
   ],
   [
    "What is the difference between an attribute and a method?",
    "An attribute is data stored on an object or class; a method is a function defined in the class that operates on its objects."
   ],
   [
    "Which class does class Thing: inherit from in Python 3?",
    "object, the root of every class hierarchy."
   ]
  ]
 },
 {
  "t": "Instance variables versus class variables: declaring, initializing and sharing",
  "hook": "At Copperline Games, Sam is chasing a bug two days before a demo. Every enemy in the level shares the same loot bag: when the player defeats one goblin, every other goblin's inventory suddenly shows the same sword. Meanwhile, a counter meant to track how many enemies were spawned reads 1 on one enemy and 7 on the class. Sam's teammate shrugs and says Python is being weird. It is not. Both bugs come from the difference between data that belongs to one object and data shared by the whole class, and from what assignment through self really does. Can you spot where each value lives before the demo?",
  "simple": "Objects can store information in two places. An instance variable belongs to one object only, like the name written on one student's notebook. A class variable belongs to the class, like a poster on the classroom wall that every student can read. When you read a value, Python looks at the object's own notebook first, and if it is not there, it looks at the wall poster. But if you write a value through one object, Python writes it in that object's notebook, not on the poster. To change the poster for everybody, you must write on it through the class name itself.",
  "body": [
   "Python objects can hold data in two places, and the difference matters both in real programs and on the exam. An instance variable belongs to one particular object. It is usually created inside `__init__` by assigning to `self.something`, and each object has its own independent copy. A class variable belongs to the class itself. It is created by an assignment written directly in the class body, outside any method, and there is only one copy, shared by all instances of that class.",
   "```python\nclass Counter:\n    created = 0                 # class variable\n\n    def __init__(self, label):\n        self.label = label      # instance variable\n        Counter.created += 1\n\na = Counter('a')\nb = Counter('b')\nprint(a.label, b.label)          # a b\nprint(Counter.created, a.created, b.created)   # 2 2 2\n```",
   "In the example, `label` is different for each object, while `created` is a single shared counter. Each time the constructor runs, it increments `Counter.created` through the class name, so after two objects exist the shared value is 2, and reading it through either instance also shows 2. Class variables exist as soon as the class statement has run, before any object is created, so `Counter.created` works and returns 0 even with no instances.",
   "Reading an attribute follows a lookup order. When you write `a.created`, Python first looks in the instance itself; if the name is not there, it looks in the instance's class, and then in that class's superclasses. If it still cannot find the name, it raises AttributeError. This fallback is why every instance can read a shared class variable even though the variable is not stored on the instance.",
   "Writing is different, and this is the key exam trap. Assigning through an instance, as in `a.created = 100`, never changes the class variable. It creates a new instance variable named `created` on `a` alone, which then shadows the class variable whenever you read it through `a`. After that line, `a.created` is 100, but `Counter.created` and `b.created` still show the old shared value. To change a class variable for everyone, assign through the class: `Counter.created += 1`, as the constructor does. Inside methods, `self.created += 1` looks similar but quietly does the wrong thing: it reads the class value through the fallback, adds one, and stores the result as a new instance variable on `self`, leaving the class variable unchanged. That is a subtle bug that exam questions like to show.",
   "Instance variables do not have to be created in `__init__`. Any method, or even code outside the class, can add a new attribute to a single object with `obj.new_attr = value`. As a result, two objects of the same class can end up with different sets of attributes, and code that assumes an attribute exists on every object may raise AttributeError for some of them. You can remove an instance variable with `del obj.attr`; if a class variable of the same name exists, reading through the object then falls back to the class value again.",
   "Mutable class variables deserve special care. If a class defines `items = []` in its body, then `self.items.append(x)` does not assign anything to `self.items`. It reads the shared list through the class fallback and modifies that one list in place, so every instance sees the change. That behavior is sometimes intended, such as a registry of every object created, but it is usually a bug, exactly like the shared loot bag in a game. Per-object lists belong in `__init__` as `self.items = []`, so each object receives its own new list. Contrast that with `self.items = self.items + [x]`, which is an assignment and therefore creates an instance variable.",
   "A practical rule of thumb helps you choose. Use class variables for data that is truly common to all instances: constants such as a tax rate, counters of how many objects were created, or default settings that individual objects may override. Use instance variables for everything that describes one object: its name, its position, its balance. When you read exam code, mark each assignment by where it is written and through which name, the class or `self`, and the output usually becomes easy to predict. A quick way to check your reasoning while practicing is to print `vars(obj)` for an instance, which shows only that object's own instance variables, and compare it with the class's contents. If a name you expected is missing from the instance, it is being read from the class through the lookup fallback."
  ],
  "analogy": "A class variable is like a shared whiteboard in an office, while instance variables are each employee's personal notepad. Reading a figure, an employee checks their notepad first and glances at the whiteboard only if it is not there. Writing through an employee always goes on their notepad. The analogy stops for mutable values: appending to a shared list is like an employee writing directly on the whiteboard, which everyone then sees.",
  "terms": [
   [
    "Instance variable",
    "An attribute stored on one object, usually set as self.name in __init__."
   ],
   [
    "Class variable",
    "An attribute defined in the class body and shared by all instances."
   ],
   [
    "Shadowing",
    "An instance attribute with the same name hiding a class attribute when accessed through that instance."
   ],
   [
    "Attribute lookup",
    "The search order for reading obj.attr: the instance, then its class, then the superclasses."
   ]
  ],
  "example": "A game's Enemy class has a class variable count to track how many enemies exist and instance variables x, y and health for each one. Damaging one enemy changes only its own health, while Enemy.count rises every time one is spawned.",
  "mistakes": [
   [
    "Thinking a.n = 5 changes the class variable n for all instances.",
    "Assignment through an instance always creates or updates an instance variable on that object. Change shared data through the class: A.n = 5."
   ],
   [
    "Using self.count += 1 in __init__ to count objects.",
    "That reads the class value and stores the sum on self, creating an instance variable. The class counter never changes. Use ClassName.count += 1."
   ],
   [
    "Defining items = [] in the class body to give each object its own list.",
    "That list is shared. self.items.append() modifies the one shared list. Create self.items = [] in __init__."
   ],
   [
    "Believing a class variable does not exist until an object is created.",
    "Class variables exist as soon as the class statement runs, so ClassName.var works with zero instances."
   ]
  ],
  "tryit": [
   [
    "A Ticket class has a class variable next_id = 1. Its __init__ does self.id = Ticket.next_id and then self.next_id += 1. After creating three tickets, all three have id 1. What went wrong, and what is the fix?",
    "self.next_id += 1 creates an instance variable on each ticket and never changes Ticket.next_id, so every new ticket reads 1. Write Ticket.next_id += 1 to update the shared counter."
   ],
   [
    "A Team class defines members = [] in the class body and an add() method that calls self.members.append(name). Two teams are created and a player is added to the first. What does the second team's members list show, and why?",
    "It shows the same player, because both teams share the single class-level list and append() modifies it in place. Move self.members = [] into __init__ so each team gets its own list."
   ]
  ],
  "tip": "obj.x = value always creates or updates an instance variable; it never changes the class variable. Change shared data through the class name.",
  "check": [
   [
    "class A: n = 1. After a = A(); a.n = 5, what are A.n and A().n?",
    "Both are 1; a.n = 5 created an instance variable only on a."
   ],
   [
    "Where does Python look when you read obj.attr?",
    "First in the instance, then in its class, then in the superclasses; if not found, AttributeError."
   ],
   [
    "After del a.n in the previous example, what is a.n?",
    "1, because the instance variable is gone and lookup falls back to the class variable."
   ]
  ]
 },
 {
  "t": "The __dict__ attribute of objects and classes",
  "hook": "You are pairing with Dev at Saltmarsh Insurance on a quoting tool. A Policy object is calculating the wrong premium, and Dev insists the discount rate is set on that object because he can read policy.discount and get 0.1. Yet when he prints the object's attributes to the log, discount is nowhere to be seen. A senior engineer walks by, types one line that reveals the object's internal dictionary, and then another that reveals the class's dictionary, and the mystery is solved in under a minute. Python keeps attributes in plain sight if you know where to look. Where exactly does an attribute live, and how can you prove it?",
  "simple": "Every ordinary Python object keeps its own facts in a hidden dictionary, a list of name and value pairs, and you can peek at it with __dict__. If you make a pet object and give it a name and an age, its __dict__ shows exactly those two. Things the whole class shares, like the class's methods or class-wide settings, are not copied into every object; they live in the class's own dictionary. It is like a school: each student has a personal file with their own details, and the school handbook, which applies to everyone, sits in the office instead of being photocopied into every student's file.",
  "body": [
   "Python stores most objects' attributes in a dictionary, and it lets you look at that dictionary through the special attribute `__dict__`. For an instance, `obj.__dict__` maps the names of its instance variables to their current values. For a class, `ClassName.__dict__` holds the class's own contents: its class variables, its methods and a few special entries. Examining these dictionaries makes the instance-versus-class distinction from the previous lesson concrete, and exam questions often ask you to predict exactly what `__dict__` prints.",
   "```python\nclass Point:\n    dims = 2\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def move(self, dx):\n        self.x += dx\n\np = Point(1, 2)\nprint(p.__dict__)          # {'x': 1, 'y': 2}\nprint('dims' in p.__dict__)  # False\nprint('dims' in Point.__dict__, 'move' in Point.__dict__)  # True True\n```",
   "Notice what the instance dictionary does not contain. Class variables such as `dims` are not copied into each instance; they stay in the class dictionary, and instances find them by falling back to the class during attribute lookup. Methods are also stored in the class, not in the instance, which is why thousands of Point objects do not each carry their own copy of `move`. An instance's `__dict__` contains only the attributes set on that specific object, so it changes over time. After `p.color = 'red'`, `p.__dict__` includes a 'color' key. After `p.move(5)`, the 'x' value becomes 6. And after `p.dims = 3`, the instance dictionary gains its own `dims` entry, which now shadows the class variable for `p` only, while `Point.__dict__['dims']` is still 2.",
   "Order is preserved in these dictionaries, in the order attributes were first assigned, so `p.__dict__` printing `{'x': 1, 'y': 2}` follows the order of the assignments in `__init__`. Exam answer choices sometimes differ only in key order or in whether a class variable appears, so read both carefully.",
   "A class's `__dict__` includes, besides your own names, special entries that Python adds, such as `'__module__'`, `'__dict__'`, `'__weakref__'` and `'__doc__'`, along with `'__init__'` when you define it. The exact set of special entries can vary between Python versions, so the exam focuses on your own names rather than these extras. A class's `__dict__` is not an ordinary dict but a read-only view of type mappingproxy. You cannot assign into it directly, so `Point.__dict__['dims'] = 3` raises TypeError; you change class attributes with normal assignment such as `Point.dims = 3`, and the change then appears in the view.",
   "Inheritance shows up clearly here. A subclass's `__dict__` contains only what the subclass itself defines, not what it inherits. If `class Point3D(Point):` defines only `__init__`, then `'move' in Point3D.__dict__` is False, even though `Point3D(1, 2, 3).move(1)` works perfectly through inheritance. That makes the class dictionary a handy way to see exactly which methods a subclass adds or overrides. Instances, by contrast, collect attributes set by every `__init__` that runs, so if the subclass's constructor calls `super().__init__(x, y)` and then sets `self.z`, the instance dictionary holds x, y and z together.",
   "Private attributes appear in `__dict__` under their mangled names. If `__init__` sets `self.__secret = 1` inside class `Vault`, the instance dictionary shows the key `'_Vault__secret'`, not `'__secret'`. The next lesson explains why Python renames such attributes. For now, notice that `__dict__` is the most reliable way to see what name an attribute is really stored under, which makes it the natural tool for checking any prediction about mangling.",
   "For simple objects you can use `__dict__` for introspection: printing all of an object's state while debugging, comparing two objects field by field, or copying values generically. The built-in `vars(obj)` returns the same dictionary and is the more readable spelling. Because the instance dictionary is the real storage, assigning `obj.__dict__['k'] = 1` does create an attribute `obj.k`, but in everyday code you rarely modify it directly; reading it is the main use.",
   "Not every object has a `__dict__`. Many built-in types, such as `int`, store their data in a different, more compact way, so `(5).__dict__` raises AttributeError, and `vars(5)` raises TypeError. Instances of ordinary classes you write yourself always have one unless the class deliberately opts out. For the exam, the useful habit is to ask, for every attribute in a snippet, where the assignment happened. An assignment through `self` or through an instance puts the name in the instance dictionary; an assignment in the class body or through the class name puts it in the class dictionary; and nothing is ever copied between the two."
  ],
  "analogy": "An instance's __dict__ is like a guest's personal locker at a gym: it holds only what that guest put there. The class's __dict__ is the front desk, holding shared equipment and the house rules that every guest can use. Asking for something not in your locker sends you to the desk automatically. Where it stops: the front desk's ledger is read-only through __dict__, so changes must go through normal class assignment.",
  "terms": [
   [
    "__dict__",
    "The dictionary (or mapping proxy for classes) holding an object's own attributes."
   ],
   [
    "mappingproxy",
    "The read-only mapping type used for a class's __dict__."
   ],
   [
    "vars()",
    "Built-in returning an object's __dict__."
   ],
   [
    "Introspection",
    "Examining an object's attributes and type while the program runs."
   ]
  ],
  "example": "Debugging a Customer object, a developer prints vars(customer) and sees only name and email. The missing discount attribute turns out to be a class variable, which appears only in Customer.__dict__.",
  "mistakes": [
   [
    "Expecting class variables to appear in every instance's __dict__.",
    "Class variables live only in the class's __dict__. Instances reach them through lookup, so they appear in an instance dictionary only if assigned through that instance."
   ],
   [
    "Thinking methods are stored in each instance's __dict__.",
    "Methods are defined in the class body and stored in the class's __dict__; instances find them through the class."
   ],
   [
    "Expecting a subclass's __dict__ to list inherited methods.",
    "A class's __dict__ contains only names defined in that class. Inherited methods stay in the superclass's dictionary."
   ],
   [
    "Trying to change a class attribute with Cls.__dict__['x'] = 1.",
    "A class's __dict__ is a read-only mappingproxy, so this raises TypeError. Use Cls.x = 1."
   ]
  ],
  "tryit": [
   [
    "A Sensor class defines unit = 'C' in its body and sets self.name and self.reading in __init__. A technician creates s = Sensor('lab', 21.5) and later runs s.unit = 'F'. What does vars(s) show now, and what is Sensor.unit?",
    "vars(s) shows {'name': 'lab', 'reading': 21.5, 'unit': 'F'}, because assigning through the instance added a unit entry. Sensor.unit is still 'C', and other sensors still read 'C'."
   ],
   [
    "A reviewer wants to know which methods a subclass FastPrinter overrides from its superclass Printer, without reading the source. What could they check?",
    "They can look at FastPrinter.__dict__ (or list its keys). It contains only the names FastPrinter defines itself, so any method listed there that also exists in Printer is an override."
   ]
  ],
  "tip": "Instance __dict__ holds only attributes set on that instance. Class variables and methods live in the class's __dict__, and inherited names do not appear in a subclass's __dict__.",
  "check": [
   [
    "class A: v = 1; def __init__(self): self.w = 2. What is A().__dict__?",
    "{'w': 2}; the class variable v is not in the instance dictionary."
   ],
   [
    "Where is a method stored: in the instance __dict__ or the class __dict__?",
    "In the class __dict__; instances find it through the class."
   ],
   [
    "What does (5).__dict__ do?",
    "It raises AttributeError, because int instances do not have a __dict__."
   ]
  ]
 },
 {
  "t": "Private attributes and name mangling (__name becomes _ClassName__name)",
  "hook": "You are reviewing code at Northwind Credit Union, where Elena's Account class stores the balance as self.__balance so nobody can change it by accident. A junior developer, testing a fix, writes acct.__balance = 0 from outside the class, runs it with no error, and announces that private attributes in Python are fake. Yet the account's balance() method still reports 100. Then a subclass written by another team defines its own __balance, and the two never collide. The test results look contradictory, and the team lead asks you to explain what Python actually did. What happens to a double-underscore name, and why does where you write it matter so much?",
  "simple": "Python does not lock any data away completely, but it has a trick to protect names that start with two underscores. When you write a name like __balance inside a class called Account, Python quietly renames it to _Account__balance behind the scenes. Code inside the class keeps using the short name and it works, because Python renames those uses too. Code outside the class that types the short name does not get renamed, so it cannot find the attribute. It is like a label on a parcel that the post office rewrites with the sender's name: the parcel is still there, just filed under a longer label.",
  "body": [
   "Python does not have strictly private attributes the way some languages do, where the compiler refuses access from outside the class. Instead it has two conventions that support encapsulation. A single leading underscore, as in `self._balance`, means internal: other programmers are asked not to use this name from outside the class. Nothing enforces that request; it is purely a signal. A double leading underscore, as in `self.__balance`, with no double underscore at the end, triggers a mechanism called name mangling, which the PCAP (Certified Associate Python Programmer) exam tests closely.",
   "Name mangling is a rewrite that happens when Python compiles code written inside a class body. Any identifier of the form `__name` that appears inside `class Account:` is automatically rewritten to `_Account__name`: a single underscore, then the class name, then the original name with its two underscores. Within the class's own methods you keep writing `self.__balance` and everything works, because those references are rewritten in the same way. Outside the class, the expression `acct.__balance` is not rewritten, so Python looks for an attribute literally called `__balance`. None exists, so the expression raises AttributeError.",
   "```python\nclass Account:\n    def __init__(self, amount):\n        self.__balance = amount\n    def balance(self):\n        return self.__balance\n\na = Account(100)\nprint(a.balance())             # 100\n# print(a.__balance)           # AttributeError\nprint(a._Account__balance)     # 100 - the mangled name\nprint(a.__dict__)              # {'_Account__balance': 100}\n```",
   "As the last two lines of the example show, the data is still reachable if you know the mangled name, and the instance's `__dict__` reveals that name to anyone who looks. Name mangling is therefore not a security feature; it is protection against accidents. Code that deliberately types `_Account__balance` is clearly breaking the class's contract, and a reviewer can see it at a glance. The single-underscore convention works the same way socially: it relies on programmers respecting a signal rather than on the language blocking access, and tools such as linters can warn about it.",
   "The main purpose of mangling is to avoid name clashes in inheritance. Suppose a superclass and a subclass were written by different people, and both happen to store internal data in an attribute called `__data`. Without mangling, the subclass would silently overwrite the superclass's value, and the superclass's methods would start misbehaving in confusing ways. With mangling, the two names become `_Parent__data` and `_Child__data`, two separate entries in the instance dictionary, so neither class can trample the other's internal state. The mangled name uses the class in which the code was written, not the class of the object at run time, which is exactly what keeps the two apart.",
   "The same rule applies to more than instance variables. A method named `__helper` defined inside class `Tool` is stored as `_Tool__helper`, and a class variable `__count` in class `Tool` becomes `_Tool__count`. Calling `self.__helper()` from another method of `Tool` works, while `tool.__helper()` from outside raises AttributeError. Two exceptions matter on the exam. Names that both start and end with two underscores, such as `__init__`, `__str__` or `__dict__`, are special methods or attributes and are never mangled. Names with only a single leading underscore are never mangled either.",
   "A consequence worth studying is what happens when outside code assigns to the short name. Writing `a.__balance = 5` outside the class does not change the private value. Because that line is not inside the class body, no mangling occurs, and Python simply creates a new, unrelated instance attribute literally named `__balance`. Afterwards `a.__dict__` holds two keys, `'_Account__balance'` with 100 and `'__balance'` with 5, and `a.balance()` still returns 100 because the method reads the mangled name. Exam questions use exactly this scenario to test whether you understand that mangling depends on where the code is written, not on which object it touches.",
   "When you meet a question on this topic, ask three things in order. Is the name written inside a class body? Does it start with two underscores and not end with two? If both answers are yes, rewrite it as underscore, class name, name, and then trace the code normally. Everything else is left exactly as written. In everyday code, many Python developers prefer the single underscore for internal attributes and reserve the double underscore for classes designed to be subclassed by others, where avoiding accidental clashes really matters. On the exam, though, expect the double underscore, because it is the form with a precise, testable rule."
  ],
  "analogy": "Name mangling is like a hotel that quietly files each guest's luggage under 'room number plus name' instead of just the name. Two guests both named Lee never get each other's bags, because the desk staff, who work inside the hotel, always add the room number. A stranger asking at the door for 'Lee's bag' gets nothing. The analogy's limit: anyone who knows the full label can still ask for it, so it is not a lock.",
  "terms": [
   [
    "Private attribute",
    "An attribute whose name starts with two underscores (and does not end with two), subject to name mangling."
   ],
   [
    "Name mangling",
    "Rewriting __name inside a class to _ClassName__name to avoid clashes."
   ],
   [
    "Single-underscore convention",
    "A leading _ marks a name as internal but has no enforcement."
   ],
   [
    "Dunder name",
    "A name that starts and ends with two underscores, such as __init__; never mangled."
   ]
  ],
  "example": "A library's Connection class stores self.__socket. A user subclass also defines self.__socket for a different purpose, and thanks to mangling the two become _Connection__socket and _MyConn__socket, so neither breaks the other.",
  "mistakes": [
   [
    "Believing double-underscore attributes are completely inaccessible from outside the class.",
    "They are reachable through the mangled name, such as obj._Account__balance, and visible in __dict__. Mangling prevents accidents, not deliberate access."
   ],
   [
    "Thinking a.__balance = 5 from outside the class changes the private balance.",
    "Outside a class body no mangling happens, so this creates a separate attribute named __balance. The mangled _Account__balance is unchanged."
   ],
   [
    "Assuming __init__ or __str__ are mangled because they start with two underscores.",
    "Names that also end with two underscores are not mangled."
   ],
   [
    "Expecting a single leading underscore to trigger mangling.",
    "Only a double leading underscore triggers mangling. _name is a convention with no rewriting."
   ]
  ],
  "tryit": [
   [
    "A class Vault stores self.__code = 1234. A test script outside the class runs v = Vault(); v.__code = 0; print(v._Vault__code). What prints, and how many keys does v.__dict__ contain afterwards?",
    "1234 prints, because v.__code = 0 outside the class created a separate attribute named __code. v.__dict__ has two keys: '_Vault__code' and '__code'."
   ],
   [
    "Two teams share a code base. Team A writes class Base with self.__cache = {} and Team B writes class Fast(Base) that also sets self.__cache = [] in its own __init__ after calling super().__init__(). Will Base's methods that use self.__cache break?",
    "No. Inside Base the name becomes _Base__cache and inside Fast it becomes _Fast__cache, so the instance holds two separate attributes and Base's methods keep using their own dictionary."
   ]
  ],
  "tip": "Inside class C, __x becomes _C__x. Outside the class, obj.__x is not mangled and fails (or creates a separate attribute if assigned). Dunder names like __init__ are never mangled.",
  "check": [
   [
    "In class Box, self.__size = 3 is set. What key appears in the instance __dict__?",
    "'_Box__size'."
   ],
   [
    "Is __str__ mangled?",
    "No. Names ending with two underscores are not mangled."
   ],
   [
    "Inside class Tool, a method is named __helper. What name can outside code use to call it?",
    "_Tool__helper, for example tool._Tool__helper()."
   ]
  ]
 },
 {
  "t": "Methods and the self parameter; constructors (__init__) with default arguments",
  "hook": "It is Friday afternoon at Pinecrest Library, and Marcus is finishing a small program to manage study-room bookings. He writes a Booking class with a confirm() method, runs it, and gets a TypeError complaining that confirm() takes 0 positional arguments but 1 was given, even though he called it with no arguments at all. Then he adds a second constructor so bookings can be made with or without a room number, and the first constructor stops working entirely. The librarian needs it by Monday. Both problems come from how Python calls methods and builds objects. What is self really doing, and how do you give a constructor flexible arguments?",
  "simple": "A method is a function that lives inside a class. When you call a method on an object, Python secretly hands the object itself to the method as its first input, and by habit that first input is named self. So you must always list self when you write a method, even though you never type it when calling one. The special method __init__ runs automatically every time you create a new object, setting up its starting details. Giving its inputs default values, like a coffee order that is medium unless you say otherwise, lets people create objects with fewer details.",
  "body": [
   "A method is a function defined inside a class. Its first parameter receives the object that the method was called on, and by a very strong convention that parameter is named `self`. When you write `obj.method(5)`, Python translates it into `type(obj).method(obj, 5)`, passing the object automatically as the first argument. You never pass `self` yourself in a normal call, but you must always list it in the method definition. The name `self` is not a keyword, and another name would technically work, but every Python programmer and every exam question uses `self`, so you should too.",
   "Forgetting `self` in the definition is a classic error. If you write `def greet():` inside a class and call `obj.greet()`, Python still passes the object, so the call fails with `TypeError: greet() takes 0 positional arguments but 1 was given`. The message seems strange until you remember the hidden argument. Inside a method, `self` is how you reach the object's attributes and its other methods: `self.name`, `self.helper()`. A bare `name` inside the method refers to a local or global variable instead, which is a common source of NameError or of silently using the wrong value.",
   "The special method `__init__` is usually called the constructor, though strictly it is the initializer, since the object already exists when it runs. Python calls it automatically right after creating a new object when you call the class, so `Dog('Rex', 3)` creates an empty Dog and then runs `__init__(new_dog, 'Rex', 3)`. Its job is to set up the object's instance variables. It must not return a value other than None; writing `return 5` in `__init__` raises TypeError when the object is created.",
   "```python\nclass Timer:\n    def __init__(self, minutes=5, label='timer'):\n        self.minutes = minutes\n        self.label = label\n    def describe(self):\n        return f'{self.label}: {self.minutes} min'\n\nprint(Timer().describe())            # timer: 5 min\nprint(Timer(10).describe())          # timer: 10 min\nprint(Timer(label='tea').describe()) # tea: 5 min\n```",
   "Default parameter values in `__init__` let callers omit arguments, exactly as with ordinary functions. In the example, `Timer()` uses both defaults, `Timer(10)` supplies the first argument positionally and keeps the default label, and `Timer(label='tea')` uses a keyword argument to skip the earlier default and set only the label. The usual rules apply: parameters with defaults must come after those without, so `def __init__(self, a=1, b):` is a SyntaxError, and passing more positional arguments than there are parameters raises TypeError.",
   "Avoid mutable defaults such as `items=[]` in a constructor. A default value is evaluated once, when the `def` statement runs, not each time the method is called. A list default is therefore one single list shared by every object created without that argument, and appending to it from one object changes it for all of them. The standard fix is `items=None` in the signature and `self.items = [] if items is None else items` in the body, which creates a fresh list for each object.",
   "Python does not support multiple constructors by overloading, as some languages do. If a class body defines `__init__` twice, the second definition simply replaces the first, just as assigning to a variable twice keeps only the last value. Calls that matched the first signature then fail with TypeError. Default arguments, and keyword arguments, are the Python way to provide flexible construction from a single `__init__`. One constructor with sensible defaults can usually cover every case that other languages would split across several overloaded constructors, and it keeps all of the setup logic in one place.",
   "If a class defines no `__init__` at all, it inherits one from its superclass, ultimately from `object`. The version inherited from `object` accepts no extra arguments, so a class with no `__init__` anywhere in its hierarchy can be created only with empty parentheses; calling it with arguments raises TypeError.",
   "Methods can call one another through `self`, can have their own default parameters, and can return values like any function. You can also call a method through the class and pass the instance explicitly, as in `Timer.describe(t)`. That form produces the same result as `t.describe()` and shows clearly what `self` really is: just the first argument, filled in for you when you use dot notation on an object. When you trace exam code, rewrite each call in that explicit form if you are unsure: count the arguments including the object, line them up against the parameters including `self`, apply any defaults, and the result, or the TypeError, follows directly."
  ],
  "analogy": "Calling obj.method() is like handing a form to a clerk who automatically staples your ID card to the front before processing it. The form's first box is always labeled for that ID, so a form printed without that box gets rejected, which is the TypeError when self is missing. Default arguments are the pre-filled boxes you can leave alone. The analogy stops in that the ID is the object itself, not a copy of it.",
  "terms": [
   [
    "self",
    "The conventional name of a method's first parameter, which receives the instance."
   ],
   [
    "__init__",
    "The initializer that runs automatically when an object is created, setting its attributes."
   ],
   [
    "Default argument",
    "A parameter value used when the caller does not supply one."
   ],
   [
    "Keyword argument",
    "An argument passed as name=value, allowing callers to skip earlier defaults."
   ]
  ],
  "example": "A Rectangle class defines __init__(self, width=1, height=1). Code that builds unit squares writes Rectangle(), while a layout engine writes Rectangle(height=4) to take the default width and set only the height.",
  "mistakes": [
   [
    "Leaving self out of a method definition because you do not pass it when calling.",
    "Python always passes the instance as the first argument, so a method without self raises TypeError when called on an object."
   ],
   [
    "Defining two __init__ methods to support different argument lists.",
    "The second definition replaces the first. Use default and keyword arguments in one __init__."
   ],
   [
    "Using a mutable default such as items=[] in __init__.",
    "The default list is created once and shared by every object that uses it. Use items=None and create a new list inside."
   ],
   [
    "Expecting __init__ to return the new object, as in return self.",
    "__init__ must return None. Returning anything else raises TypeError; the class call itself returns the object."
   ]
  ],
  "tryit": [
   [
    "A Ticket class has def __init__(self, seat, price=10). A colleague creates Ticket(price=15) and gets a TypeError. What is missing, and what call would work?",
    "seat has no default, so it is required. Ticket(price=15) omits it. A working call is Ticket('A1', price=15) or Ticket(seat='A1', price=15)."
   ],
   [
    "A Playlist class is written as def __init__(self, songs=[]): self.songs = songs. Two playlists are created with no arguments, and a song added to the first appears in the second. Why, and how do you fix it?",
    "Both objects received the same default list, created once when the def ran, so they share it. Change the signature to songs=None and set self.songs = [] if songs is None else songs."
   ]
  ],
  "tip": "Every instance method needs self as its first parameter, and obj.m(a) passes obj automatically. A second __init__ definition replaces the first; Python has no constructor overloading.",
  "check": [
   [
    "class A: def f(): return 1. What happens with A().f()?",
    "TypeError: f() takes 0 positional arguments but 1 was given, because the instance is passed automatically."
   ],
   [
    "What does obj.method(3) translate to?",
    "type(obj).method(obj, 3), with obj bound to self."
   ],
   [
    "If a class defines __init__(self, x) and later __init__(self), what happens with C(5)?",
    "TypeError, because the second __init__ replaced the first and accepts no extra argument."
   ]
  ]
 },
 {
  "t": "Introspection: hasattr(), type(), __name__, __module__, __bases__, __class__",
  "hook": "You are on call for the plugin system at Brightwater Robotics, and at 11 p.m. the nightly test run fails with a single cryptic line: an object has no attribute 'run'. The loader accepts plugins from three teams, and the log does not say which one broke. Your teammate Kai suggests adding a check before each call and logging the class name and the file it came from, so tomorrow's failure points straight at the culprit. He tries obj.__name__ in the log message, and the logger itself crashes. Python can tell you a great deal about any object while the program runs, if you ask the right object the right question. Which attributes belong to the instance, and which to its class?",
  "simple": "Introspection means a program looking at its own objects while it runs, a bit like checking the label on a box before opening it. type(obj) tells you what kind of thing an object is. hasattr(obj, 'name') answers yes or no: does this object have something called name? Classes also carry name tags: __name__ is the class's name, __module__ is the file it came from, and __bases__ lists its parent classes. Every object has __class__, which points to the class it was made from. A useful rule: the name tags belong to the class, so for an object you first ask for its class.",
  "body": [
   "Introspection means a program examining its own objects at run time: what type something is, which attributes it has, and where its class came from. Python makes this easy because classes and objects carry information about themselves, and the PCAP (Certified Associate Python Programmer) exam checks a specific set of tools: `hasattr()`, `type()`, and the special attributes `__name__`, `__module__`, `__bases__` and `__class__`. Changing objects at run time, rather than only inspecting them, is called reflection, and Python supports that too, through functions like `setattr()`.",
   "`hasattr(obj, 'name')` returns True if the object has an attribute with that name, whether it is stored on the instance itself or reached through its class and superclasses, and False otherwise. The name must be passed as a string; `hasattr(obj, name)` with a bare identifier looks up a variable called `name` instead. It is a safe way to check before accessing something that might be missing, so `if hasattr(plugin, 'run'): plugin.run()` avoids an AttributeError. Its companions are `getattr(obj, 'name', default)`, which reads an attribute by name and returns the default if it is missing, and `setattr(obj, 'name', value)`, which sets one. Because methods are attributes too, `hasattr()` works for them as well.",
   "`type(obj)` returns the object's class. `type(5)` is `int`, `type('hi')` is `str`, and for your own objects it is the class you created them from. Every object also has a `__class__` attribute that refers to the same class, so for ordinary objects `obj.__class__ is type(obj)` is True. Either can be used as the starting point for the class-level attributes below. Note that `type()` reports the exact class only; to ask whether an object belongs to a class or any of its subclasses, `isinstance()` is the right tool, as a later lesson discusses.",
   "Classes carry information about themselves in special attributes. `__name__` is the class's name as a string: `Dog.__name__` is 'Dog'. Instances do not have their own `__name__`, so for an object you write `type(obj).__name__` or `obj.__class__.__name__`; the expression `obj.__name__` raises AttributeError. This is one of the most frequently tested details on the topic. `__module__` is a string naming the module where the class was defined: `'__main__'` for a class defined in the script you ran directly, or the module's name, such as 'shapes', for a class imported from shapes.py. Unlike `__name__`, instances can read `__module__` through their class, so `obj.__module__` works.",
   "`__bases__` is a tuple of a class's direct superclasses, in the order they were listed in the class statement. For `class C(A, B):`, `C.__bases__` is `(A, B)`. A class with no explicit parent has `(object,)`, a one-element tuple, and printing it shows `(<class 'object'>,)` with the trailing comma. The attribute is available only on classes, so `obj.__bases__` raises AttributeError; use `type(obj).__bases__`. It also shows only direct parents. For the whole ancestry, including grandparents and `object`, use `__mro__`, the method resolution order, which lists the class itself followed by every ancestor in lookup order.",
   "```python\nclass Animal: pass\nclass Dog(Animal): pass\nd = Dog()\nprint(type(d).__name__)          # Dog\nprint(d.__class__.__name__)      # Dog\nprint(Dog.__module__)            # __main__\nprint(Dog.__bases__)             # (<class '__main__.Animal'>,)\nprint([c.__name__ for c in Dog.__bases__])  # ['Animal']\nprint(hasattr(d, 'speak'))       # False\n```",
   "Read the example output carefully, because exam answers differ in exactly these details. Printing a class shows `<class '__main__.Animal'>`, which combines the module name and the class name. Printing `__bases__` shows a tuple, with parentheses and a trailing comma when there is a single parent. A list comprehension over `__bases__` extracts just the names. And `hasattr(d, 'speak')` is False because neither Dog nor Animal defines `speak`.",
   "These tools let generic code adapt to the objects it receives. A logger can print any object's class name and module without knowing its type in advance. A loader can check `hasattr()` before calling an optional method. A short function can walk up a hierarchy with a loop that follows `__bases__`, printing each class name until it reaches `object`, whose own `__bases__` is the empty tuple. The PCAP course labs for this section ask you to write that kind of function, which is excellent preparation for questions that print these attributes.",
   "For quick recall: `hasattr()` takes the attribute name as a string; `type(obj)` and `obj.__class__` give the class; `__name__` and `__bases__` live on classes only; `__module__` is a string and is readable through instances; and `__bases__` is a tuple of direct parents."
  ],
  "analogy": "Think of a class as a product line and each object as one item from it. The item has a sticker saying which product line it belongs to, which is __class__. The product line's catalog page lists its name, the factory that makes it and the earlier models it was based on, which are __name__, __module__ and __bases__. Asking the item itself for the catalog name fails; you read the sticker first, then the catalog page.",
  "terms": [
   [
    "Introspection",
    "Examining an object's type and attributes at run time."
   ],
   [
    "hasattr()",
    "Returns True if an object has, or can reach, an attribute with the given string name."
   ],
   [
    "__class__",
    "An attribute of every object referring to the class it was created from."
   ],
   [
    "__bases__",
    "A tuple of a class's direct superclasses, available on classes only."
   ],
   [
    "__module__",
    "The name of the module in which a class was defined, as a string."
   ]
  ],
  "example": "A plugin loader receives unknown objects, checks hasattr(plugin, 'run') before calling it, and logs plugin.__class__.__name__ and plugin.__class__.__module__ so errors name exactly which class and file misbehaved.",
  "mistakes": [
   [
    "Writing obj.__name__ to get an instance's class name.",
    "Instances do not have __name__. Use type(obj).__name__ or obj.__class__.__name__."
   ],
   [
    "Expecting __bases__ to list every ancestor, including grandparents.",
    "__bases__ lists only direct superclasses. Use __mro__ for the full lookup order."
   ],
   [
    "Passing the attribute name without quotes, as in hasattr(obj, run).",
    "hasattr() needs the name as a string: hasattr(obj, 'run'). Without quotes Python looks for a variable named run."
   ],
   [
    "Expecting Dog.__bases__ to print a list or just the class.",
    "It is a tuple, so a single parent prints with parentheses and a trailing comma, such as (<class 'object'>,)."
   ]
  ],
  "tryit": [
   [
    "A logging helper must print the class name of whatever object it receives, including integers, strings and your own objects. A teammate writes print(obj.__name__). Will it work for 5, and what would you write instead?",
    "No. 5 is an instance of int and has no __name__ attribute, so it raises AttributeError. Use type(obj).__name__, which prints int for 5 and the class name for any other object."
   ],
   [
    "Given class A: pass, class B(A): pass and class C(B): pass, a student writes a loop that starts at C and repeatedly moves to cls.__bases__[0], printing cls.__name__ each time, and stops when the class has no bases. What names does it print?",
    "C, B, A and object. Each step follows the single direct parent, and object.__bases__ is the empty tuple, which ends the loop."
   ]
  ],
  "tip": "__name__ and __bases__ belong to classes; on an instance, go through type(obj) or obj.__class__ first. __bases__ lists only direct parents, as a tuple.",
  "check": [
   [
    "What does print(Dog.__bases__) show for class Dog: pass?",
    "(<class 'object'>,), a one-element tuple containing object."
   ],
   [
    "Why does obj.__name__ usually fail for an instance?",
    "Instances do not have __name__; the class does, so use type(obj).__name__."
   ],
   [
    "For a class defined in the script you run directly, what is its __module__?",
    "'__main__'."
   ]
  ]
 },
 {
  "t": "Single and multiple inheritance, method overriding and super()",
  "hook": "At Harborview Transit, Nadia is extending the fleet-tracking code. The base Vehicle class sets up wheels and a service log, and she writes a new ElectricBus subclass with its own __init__ for battery size. The first test run crashes the moment the dashboard asks the bus for its service log: AttributeError. Her colleague then tries to add a WiFiMixin and a Bus class together, and suddenly the wrong describe() method runs on the depot screen. Both bugs trace back to how Python finds methods in a class hierarchy and how a subclass reaches its parent's code. How does Python decide whose method runs, and what does super() actually call?",
  "simple": "Inheritance means a new class starts with everything an existing class has, and then adds or changes things. Single inheritance means one parent class; multiple inheritance means several. If the child class writes its own version of a method with the same name, that is overriding, and the child's version wins. Sometimes you want to add to the parent's behavior instead of replacing it, the way a new chef might follow a family recipe and then add one extra spice. super() lets the child call the parent's version first, so nothing the parent sets up gets lost.",
  "body": [
   "Inheritance lets a class reuse and extend another class. With single inheritance, a class has exactly one direct superclass, as in `class Car(Vehicle):`. The subclass receives every attribute and method of `Vehicle`, and anything it defines itself is added on top. When you call a method on a `Car` object, Python looks for it in `Car` first, then in `Vehicle`, then in `Vehicle`'s own superclasses, and finally in `object`, which sits at the top of every hierarchy. The first match wins, and if no class defines the name, the call raises AttributeError.",
   "Method overriding happens when a subclass defines a method with the same name as one in its superclass. For objects of the subclass, the subclass version wins, simply because lookup finds it first. Python matches methods by name only, not by their parameter lists, so there is no overloading: an overriding method may even take different parameters from the one it replaces. Keeping the parameters compatible is good design, though, because other code may call the method on any object in the hierarchy and expect the same signature.",
   "Often you want to extend the superclass's behavior rather than replace it completely. `super()` gives access to the superclass's version of a method from inside the subclass. The most common case is the constructor. A subclass's `__init__` calls `super().__init__(...)` so that the superclass can set up its own attributes, and then the subclass adds its own. If a subclass defines `__init__` and forgets to call the parent's, the parent's attributes are never created. Nothing fails at construction time, which makes the bug easy to miss; the AttributeError appears later, when some method tries to read one of the missing attributes.",
   "```python\nclass Vehicle:\n    def __init__(self, wheels):\n        self.wheels = wheels\n    def describe(self):\n        return f'{self.wheels} wheels'\n\nclass Car(Vehicle):\n    def __init__(self, brand):\n        super().__init__(4)\n        self.brand = brand\n    def describe(self):\n        return self.brand + ', ' + super().describe()\n\nprint(Car('Volvo').describe())   # Volvo, 4 wheels\n```",
   "Trace the example. `Car('Volvo')` runs `Car.__init__`, which first calls `super().__init__(4)`, so `Vehicle.__init__` sets `self.wheels = 4` on the new Car object, and then the Car constructor sets `self.brand`. Calling `describe()` finds `Car.describe` first; it builds its result by calling `super().describe()`, which runs the Vehicle version on the same object and returns '4 wheels'. The final output is 'Volvo, 4 wheels'.",
   "Notice the syntax details, because both forms appear on the exam. Inside a method in Python 3, `super()` takes no arguments, and you do not pass `self` to the method you call through it: write `super().__init__(4)`, not `super().__init__(self, 4)`, which would pass the object twice and raise TypeError. The alternative is to call the superclass by name, as in `Vehicle.__init__(self, 4)`. Called that way, the method is reached through the class rather than an instance, so you must pass `self` explicitly. Calling by name works for simple single inheritance but hard-codes the parent's name, while `super()` adapts automatically if the hierarchy changes.",
   "With multiple inheritance, a class lists several superclasses, as in `class FlyingCar(Car, Aircraft):`, and inherits from all of them. If more than one parent defines the same method, Python uses the first one found by searching the classes in a defined order: broadly left to right as the parents are listed, and each class before its own parents. That order is called the method resolution order (MRO), and it is the subject of the next lesson. You can inspect it with `FlyingCar.__mro__`. `super()` follows the same order rather than simply jumping to the textual parent, which is what lets cooperative classes each call `super()` and have every class's method run exactly once.",
   "Multiple inheritance is powerful but can make code hard to follow, so it is usually used in a disciplined way. A common, clean pattern is the mixin: a small class that adds one capability, such as a `JsonMixin` providing a `to_json()` method, combined with a main class in a header like `class Report(JsonMixin, Document):`. The mixin does not stand on its own; it simply contributes a method to any class that includes it.",
   "One last consequence of lookup by name is easy to overlook. Because Python always starts the search from the object's actual class, a method defined in a superclass can call `self.some_method()` and end up running a subclass's override. That is how a superclass can provide a template, a general algorithm with steps that subclasses fill in, and it is also why an override can change behavior in places you did not expect."
  ],
  "analogy": "Method lookup works like asking for help in a family business: you ask the person you are talking to first, and only if they cannot help do they pass you up to their parent, and so on to the founder. Overriding is a child handling the request their own way. super() is the child doing part of the job and then saying 'and here is what my parent would add'. With several parents, the order of who is asked next is fixed in advance, which is the MRO.",
  "terms": [
   [
    "Single inheritance",
    "A class with exactly one direct superclass."
   ],
   [
    "Multiple inheritance",
    "A class that lists two or more direct superclasses."
   ],
   [
    "Overriding",
    "Defining a method in a subclass with the same name as one in a superclass, replacing it for the subclass."
   ],
   [
    "super()",
    "Returns a proxy that finds the next class's version of a method in the method resolution order."
   ],
   [
    "Mixin",
    "A small class that adds one capability and is combined with other classes through multiple inheritance."
   ]
  ],
  "example": "A LoggedList class inherits from list and overrides append() to print a message and then call super().append(item), so it behaves exactly like a list while recording every addition.",
  "mistakes": [
   [
    "Writing super().__init__(self, 4) inside a subclass constructor.",
    "super() already binds the current object, so self must not be passed again. Write super().__init__(4), or Vehicle.__init__(self, 4) when calling by class name."
   ],
   [
    "Assuming the parent's __init__ runs automatically when the subclass defines its own __init__.",
    "Defining __init__ in the subclass overrides the parent's. Call super().__init__(...) explicitly or the parent's attributes are never set."
   ],
   [
    "Thinking Python picks an overriding method by matching the number of parameters.",
    "Methods are matched by name only. The first definition found in the lookup order is used, whatever its parameters."
   ],
   [
    "Believing that in class C(A, B) the method from B wins because it is listed last.",
    "Lookup searches broadly left to right, so A is checked before B and A's version is used."
   ]
  ],
  "tryit": [
   [
    "A Shape class sets self.color in its __init__. A Circle subclass defines def __init__(self, radius): self.radius = radius and never calls the parent constructor. Later, a drawing routine reads circle.color and crashes. What is the error, and what single line fixes it?",
    "AttributeError, because Shape.__init__ never ran, so color was never set. Add super().__init__(color) (with an appropriate color value or parameter) at the start of Circle.__init__."
   ],
   [
    "A class Report(JsonMixin, Document) is built, and both JsonMixin and Document define a method save(). Report defines no save() of its own. Which save() runs for Report().save(), and how could you confirm it?",
    "JsonMixin's save(), because it is listed first and is searched before Document. You can confirm by printing Report.__mro__, which shows Report, JsonMixin, Document and then object, in that order."
   ]
  ],
  "tip": "super().method(args) does not take self; ClassName.method(self, args) does. If a subclass overrides __init__ without calling super().__init__(), the parent's attributes are missing.",
  "check": [
   [
    "class A: def hi(self): return 'A'; class B(A): def hi(self): return 'B' + super().hi(). What does B().hi() return?",
    "'BA': B's method runs and calls A's through super()."
   ],
   [
    "If class C(A, B) and both A and B define m(), which one does C().m() use when C does not define m?",
    "A's version, because A is listed first and is searched before B."
   ],
   [
    "What is the difference between super().__init__(x) and Parent.__init__(self, x)?",
    "Both run the parent's initializer; with super() self is passed automatically, while calling through the class name requires passing self explicitly."
   ]
  ]
 },
 {
  "t": "Method resolution order (MRO), diamonds and inconsistent hierarchies",
  "hook": "You join the team at Meadowbrook Library Systems on a Tuesday, and Tomas hands you a puzzle. Their catalog app has a `Record` class, two mixins called `Searchable` and `Printable` that both extend it, and a `Book` class that inherits from both mixins. Someone overrode `describe()` in `Printable`, yet when Tomas traced the code in his head, he expected `Record`'s version to win, because `Searchable` is listed first and it inherits from `Record`. The program printed `Printable`'s text instead. Then a teammate tried to reorder some base classes and Python refused to even define the class. Which rule decides the search order, and why does Python sometimes say no?",
  "simple": "When you ask an object for a method, Python checks a line of classes, one after another, and uses the first one that has it. That line is called the method resolution order, or MRO. With one parent it is easy: the class, then its parent, then the grandparent. With several parents, Python follows two simple promises: a child is always checked before its parents, and parents are checked in the order you listed them. Picture a family looking for a spare key: you check your own pocket, then each parent in the order you named them, and only after both parents do you ask the grandparent they share. If you ever ask Python to break one of those promises, it refuses to create the class.",
  "body": [
   "Every attribute lookup follows a list. When you write `obj.method()`, Python does not wander through the class tree at random; it walks a single ordered list of classes and takes the first one that defines `method`. That list is the method resolution order (MRO). For single inheritance it is exactly what you would guess: the class itself, its parent, the grandparent, and so on up to `object`, which sits at the end of every MRO. With multiple inheritance the order is less obvious, so Python computes it with an algorithm called C3 linearization, and the PCAP exam expects you to predict the result for small hierarchies.",
   "You can always inspect the answer rather than guess. Every class has a `__mro__` attribute, a tuple of class objects, and a `mro()` method that returns the same classes as a list. Printing `[k.__name__ for k in D.__mro__]` gives a readable list of names. The rules C3 follows can be summarized in two constraints. First, a class always comes before its own parents. Second, the parents keep the left-to-right order in which they were listed in the class statement. On top of that, every class appears exactly once, and the search follows one consistent order instead of jumping back and forth.",
   "The diamond is the classic test case. Suppose `B` and `C` both inherit from `A`, and `D` inherits from both `B` and `C`. If you draw the inheritance lines, with `A` at the top, `B` and `C` beside each other in the middle and `D` at the bottom, they form a diamond shape. The MRO of `D` is D, B, C, A, object. Notice where `A` lands: after both `B` and `C`, not immediately after `B`. That placement guarantees two things. A method overridden in `C` is found before the original version in `A`, and the shared ancestor `A` is visited only once.",
   "```python\nclass A:\n    def who(self): return 'A'\nclass B(A):\n    pass\nclass C(A):\n    def who(self): return 'C'\nclass D(B, C):\n    pass\n\nprint(D().who())                          # C\nprint([k.__name__ for k in D.__mro__])    # ['D', 'B', 'C', 'A', 'object']\n```",
   "Trace the call to see why the result is `'C'`. Python checks `D`, which has no `who`. It checks `B`, which also has none. A naive depth-first search would now climb from `B` to `A` and return `'A'`, but the MRO says the next class is `C`, which does define `who`, so `D().who()` returns `'C'`. The order of the bases matters: swapping them to `class D(C, B)` changes the MRO to D, C, B, A, object. In that version `C` is checked even earlier, so the answer is still `'C'`, but if `B` had its own `who`, swapping the bases would change which one wins. On the exam, always write the MRO out before predicting output.",
   "Some hierarchies cannot satisfy both rules at once, and Python refuses to create them. Take `class Top:`, then `class Middle(Top):`, then `class Bottom(Top, Middle):`. The base list in `Bottom` says Top must come before Middle, because Top is listed first. But Middle is a subclass of Top, so the first rule says Middle must come before Top. Both cannot be true. Python detects the conflict while executing the class statement itself and raises `TypeError: Cannot create a consistent method resolution order (MRO)`, followed by the names of the bases involved. The key exam detail is timing: the error happens when the class is defined, not later when a method is called or an object is created. The fix is to list the more specific class first, `class Bottom(Middle, Top):`, which is valid and gives the MRO Bottom, Middle, Top, object. In practice, listing `Top` at all is redundant there, because `Middle` already brings it in.",
   "The MRO also drives `super()`. Inside a method, `super()` does not simply mean the parent class written in the class statement. It means the next class after the current one in the MRO of the object's actual class. In a diamond, that next class may be a sibling rather than a parent. For a `D` object, `super()` inside `B` points to `C`, not to `A`. This is what makes cooperative multiple inheritance work: if every class in the diamond calls `super().method()`, the call chain visits D, B, C and A in order, and each class's code runs exactly once. Without the MRO, `A`'s initialization could run twice.",
   "A practical way to compute an MRO by hand for exam-sized problems: start with the class itself, then follow the bases from left to right, but before writing down any class, check whether some class still waiting to be written is a subclass of it. If so, postpone it. In the diamond, after D and B you would like to write A, but C is still waiting and C is a subclass of A, so C goes first, then A, then object. When you reach a point where no class can be written without breaking a rule, you have found an inconsistent hierarchy, and the answer is the TypeError at definition time."
  ],
  "analogy": "Think of the MRO as the order in which you ask family members for a spare house key. You check yourself, then your parents in the order you named them, and only after every child of the grandparent has been asked do you ask the grandparent. Asking the grandparent too early would skip a parent who might have a newer key. The analogy stops at the TypeError: a family can always ask someone, but Python refuses to build a class whose asking order would contradict itself.",
  "terms": [
   [
    "MRO",
    "Method resolution order: the ordered list of classes Python searches for an attribute, using the first match."
   ],
   [
    "Diamond problem",
    "A hierarchy where two parent classes share a common ancestor, raising the question of search order and duplicate visits."
   ],
   [
    "C3 linearization",
    "The algorithm Python uses to compute a consistent MRO that respects child-before-parent and left-to-right base order."
   ],
   [
    "__mro__",
    "A class attribute holding its MRO as a tuple of class objects; mro() returns the same classes as a list."
   ],
   [
    "super()",
    "A proxy that delegates to the next class after the current one in the MRO of the object's actual class."
   ]
  ],
  "example": "A GUI toolkit's Button inherits from Clickable and Drawable, both of which inherit from Widget. Printing [k.__name__ for k in Button.__mro__] shows Button, Clickable, Drawable, Widget, object, confirming that Widget's setup method is reached last and only once, after both mixins have had a chance to run their own versions.",
  "mistakes": [
   [
    "In class D(B, C) with B and C both inheriting from A, the MRO is D, B, A, C, object, because Python searches depth first.",
    "Python uses C3 linearization, not plain depth-first search. A shared ancestor comes after all of its subclasses, so the MRO is D, B, C, A, object."
   ],
   [
    "The inconsistent-MRO TypeError appears when you first call a method on the object.",
    "It is raised while the class statement executes, at definition time. No object needs to exist for the error to occur."
   ],
   [
    "super() always refers to the parent class named in the class statement.",
    "super() refers to the next class in the MRO of the object's actual class, which in a diamond can be a sibling, such as C when called from inside B for a D object."
   ],
   [
    "Base order in the class statement does not matter, since all parents get searched anyway.",
    "Base order sets which parent is searched first. Swapping bases can change which method wins and can even turn a valid hierarchy into an invalid one."
   ]
  ],
  "tryit": [
   [
    "You are reviewing code with class Base:, class Logger(Base):, class Saver(Base):, and class Report(Saver, Logger):. Both Logger and Saver define a method save(), and Base defines it too. A colleague says Report().save() will call Base's version because Saver inherits from Base. Who is right, and what is the MRO?",
    "The MRO is Report, Saver, Logger, Base, object. Python checks Report, then Saver, which defines save(), so Saver's version runs. Base is reached only after both Saver and Logger, so the colleague is wrong twice: Base is not next after Saver, and Saver's own method is found first anyway."
   ],
   [
    "A teammate writes class Admin(Person, User): where User is already a subclass of Person. Running the file stops with a TypeError before any Admin object is created. What is wrong, and what change fixes it while keeping both classes in the bases?",
    "Person is listed before its own subclass User, so the left-to-right rule says Person first while the child-before-parent rule says User first. No consistent MRO exists, and the error is raised at the class statement. Writing class Admin(User, Person): fixes it, giving Admin, User, Person, object. Writing class Admin(User): alone is even simpler, since User already brings in Person."
   ]
  ],
  "tip": "In a diamond, the shared ancestor comes after all its subclasses in the MRO. Listing a superclass before one of its own subclasses in the bases raises TypeError when the class is defined, not when a method is called. Check ClassName.__mro__ if you can run code.",
  "check": [
   [
    "For class D(B, C) where B and C both inherit from A, what is the MRO?",
    "D, B, C, A, object."
   ],
   [
    "When is the inconsistent-MRO TypeError raised?",
    "At class definition time, when Python evaluates the class statement with the conflicting bases."
   ],
   [
    "What is the difference between D.__mro__ and D.mro()?",
    "Both list the same classes in the same order; __mro__ is a tuple attribute and mro() is a method returning a list."
   ]
  ]
 },
 {
  "t": "Isinstance(), issubclass(), and the is / is not operators versus ==",
  "hook": "It is Friday afternoon at Pinewood Veterinary Clinic, and Dana from the front desk reports that the appointment script keeps marking dogs as unknown animals. You open the code and find `if type(pet) == Animal:` sitting in the check, even though every `Dog` object inherits from `Animal`. A few lines down, a cache lookup tests `if result == None`, and another check compares two lists of vaccines with `is` and always says they differ, even when they hold exactly the same entries. Three small comparisons, three wrong answers. What does each of these tools actually ask, and which one should the code be using?",
  "simple": "Python gives you several ways to compare things, and each one asks a different question. `isinstance(obj, Class)` asks \"is this object that kind of thing, or a more specific kind of it?\" A dog is an animal, so the answer is yes. `issubclass(A, B)` asks the same about two classes instead of an object. `==` asks \"do these two things hold the same value?\" `is` asks \"are these two names pointing at the very same object?\" Picture two identical printed copies of a menu. They are equal, because the words match, but they are not the same piece of paper. Two people reading one shared menu are looking at the same paper, which is what `is` checks.",
  "body": [
   "These four tools answer different questions, and mixing them up is a reliable source of wrong exam answers. `isinstance()` asks what kind of thing an object is. `issubclass()` asks how two classes are related. `==` asks whether two objects have equal values. `is` asks whether two names refer to the very same object. Once you can name the question each one answers, most PCAP items on this topic become straightforward.",
   "`isinstance(obj, Class)` returns True if the object is an instance of that class or of any of its subclasses. With `class Dog(Animal):` and `d = Dog()`, both `isinstance(d, Dog)` and `isinstance(d, Animal)` are True, and so is `isinstance(d, object)`, because every class ultimately inherits from `object`. The reverse is not true: an `Animal()` object is not an instance of `Dog`. The second argument can also be a tuple of classes, and the result is True if any of them matches, as in `isinstance(x, (int, float))`. Prefer `isinstance` over checks like `type(x) == Dog`, because comparing types exactly ignores inheritance. A `Puppy` subclass of `Dog` would fail a `type()` equality test but pass `isinstance(p, Dog)`, which is almost always what you want.",
   "`issubclass(Sub, Super)` compares two classes rather than an object and a class. It returns True if `Sub` is `Super` itself, or inherits from it directly or indirectly through any number of levels. A class counts as a subclass of itself, so `issubclass(Dog, Dog)` is True, which surprises many learners. Passing an instance where a class is expected, such as `issubclass(d, Animal)`, raises TypeError, because the first argument must be a class. The function works with built-in types too: `issubclass(bool, int)` is True, since `bool` is a subclass of `int`, and `issubclass(KeyError, LookupError)` is True, since `KeyError` sits below `LookupError` in the exception hierarchy.",
   "```python\nclass Animal: pass\nclass Dog(Animal): pass\nd = Dog()\nprint(isinstance(d, Animal), issubclass(Dog, Animal))  # True True\nprint(issubclass(Animal, Dog))                          # False\n\na = [1, 2]\nb = [1, 2]\nc = a\nprint(a == b, a is b, a is c)   # True False True\n```",
   "The `is` operator tests identity: whether two expressions refer to the very same object in memory. The `==` operator tests equality: whether two objects have equal values, as the type defines it by calling its `__eq__` method. In the example, `a` and `b` are two separate list objects that happen to contain the same items, so `a == b` is True but `a is b` is False. The line `c = a` does not copy anything. It makes `c` a second name for the same list, so `a is c` is True, and calling `c.append(3)` changes what `a` shows as well. The `is not` operator is simply the negation of `is`, just as `!=` is the negation of `==`. You can confirm identity yourself with `id()`, which returns a number identifying the object; two names with the same `id()` at the same moment are the same object.",
   "Your own classes add one more twist. If a class does not define `__eq__`, it inherits the default from `object`, which compares identity. So two separate instances with identical attributes are not equal: `Point(1, 2) == Point(1, 2)` is False until you write an `__eq__` method that compares the attributes. For comparisons with None, always use `is None` or `is not None`. There is exactly one None object in a running program, so identity is the precise test, and it cannot be fooled by a class whose `__eq__` does something unusual.",
   "Avoid using `is` to compare numbers or strings. As an optimization, CPython reuses objects for some small integers and some short strings, so `x is y` can appear to work in a quick test and then give a different result with other values or in a different context. That behavior is an implementation detail, not a language guarantee. Use `==` whenever you care about values, and reserve `is` for identity questions such as None checks or confirming that two names share one mutable object. Following that rule makes your code's behavior predictable on every Python implementation.",
   "When an exam question mixes these tools, sort them by what they take. `isinstance` takes an object and a class (or tuple of classes). `issubclass` takes two classes. `==` and `is` take any two expressions. Then ask the precise question: does inheritance count, is a class compared with itself, and is a copy being made? A slice such as `x[:]` or a call like `list(x)` creates a new list, so the result is equal but not identical, while plain assignment creates no new object at all."
  ],
  "analogy": "Equality versus identity is like two printed copies of the same restaurant menu. Compare them word for word and they are equal, which is `==`. Ask whether they are the same sheet of paper and the answer is no, which is `is`. If two diners share one menu and one of them circles a dish, the other sees the circle too, just as `c = a` shares one list. The analogy does not cover small integers, where Python may quietly hand out the same object, which is exactly why you should not rely on `is` for numbers.",
  "terms": [
   [
    "isinstance()",
    "Returns True if an object is an instance of a class, any of its subclasses, or any class in a tuple of classes."
   ],
   [
    "issubclass()",
    "Returns True if a class is the same as, or derives directly or indirectly from, another class."
   ],
   [
    "Identity (is)",
    "Whether two references point to the same object in memory."
   ],
   [
    "Equality (==)",
    "Whether two objects have equal values according to their type's __eq__ method."
   ],
   [
    "id()",
    "Built-in function returning a number that identifies an object during its lifetime."
   ]
  ],
  "example": "A function that accepts numbers checks isinstance(value, (int, float)) so it also accepts subclasses such as bool, and a cache lookup uses if result is None to detect a miss without confusing it with an empty list, which is falsy but is not None.",
  "mistakes": [
   [
    "issubclass(Dog, Dog) is False because a class cannot be its own subclass.",
    "Python treats every class as a subclass of itself, so issubclass(Dog, Dog) is True."
   ],
   [
    "isinstance(d, Animal) is False for a Dog object because its type is Dog.",
    "isinstance includes subclasses. A Dog object is an instance of Dog, Animal and object, so all three checks return True."
   ],
   [
    "b = a makes a copy, so a is b is False.",
    "Assignment never copies. b becomes another name for the same object, so a is b is True and changes through b show up through a."
   ],
   [
    "Using is to compare integers or strings is fine because it works in quick tests.",
    "Object reuse for small integers and short strings is an implementation detail. Use == for values and is only for identity, such as None checks."
   ]
  ],
  "tryit": [
   [
    "Your teammate writes a function that rejects any argument unless type(arg) == Shape. A new Circle subclass of Shape keeps getting rejected, and a test that passes Shape() itself works fine. What single change makes the function accept Circle objects while still rejecting strings?",
    "Replace the type check with isinstance(arg, Shape). type() compares the exact class and ignores inheritance, while isinstance accepts Shape and every subclass, including Circle. A string is not an instance of Shape, so it is still rejected."
   ],
   [
    "A script stores x = [1, 2, 3], then y = x, then z = list(x). It then calls y.append(4). Without running it, what are x == z, x is y and len(z)?",
    "x == z is False, because x is now [1, 2, 3, 4] after the append through y, while z is still [1, 2, 3]. x is y is True, because y is just another name for x's list. len(z) is 3, because list(x) made a separate copy before the append."
   ]
  ],
  "tip": "issubclass(C, C) is True. isinstance also matches superclasses and accepts a tuple of classes. a == b compares values; a is b compares identity, and b = a creates no copy. Use is None, never == None.",
  "check": [
   [
    "For class B(A), what does isinstance(A(), B) return?",
    "False: an A object is not an instance of the subclass B."
   ],
   [
    "x = [1]; y = x[:]. What are x == y and x is y?",
    "True and False: the slice made a new list with equal contents."
   ],
   [
    "What does issubclass(Dog(), Animal) do if Dog is a class?",
    "It raises TypeError, because the first argument must be a class, not an instance."
   ]
  ]
 },
 {
  "t": "Polymorphism and the __str__() method",
  "hook": "You are helping Rosa at Juniper Street Bakery with the program that prints the morning order sheet. Every product in the list is a different class, `Bread`, `Cake` and `Cookie`, and each one calculates its price differently. The loop that prints the sheet has grown into a tower of `if type(item) == ...` branches, and yesterday someone added `Muffin` and forgot to add a branch, so muffins were printed at a price of zero. Worse, when Rosa prints an order directly, she sees text like `<__main__.Cake object at 0x7f3a...>` instead of the cake's name. How can each object take care of its own price and its own printed form?",
  "simple": "Polymorphism is a long word for a simple idea: you can ask different objects to do the same thing, and each one does it in its own way. If you tell a dog, a cat and a duck to \"speak\", you get a bark, a meow and a quack, and you did not have to check which animal you were talking to. In Python, this happens when several classes have a method with the same name. The `__str__()` method is one of these shared names. Whenever you print an object, Python asks it, \"how would you like to be written down?\" If the class answers with its own `__str__`, you get a friendly description instead of a memory address.",
  "body": [
   "Polymorphism means one interface, many forms: the same method call can do different things depending on the object it is called on. If `Circle`, `Square` and `Triangle` each define `area()`, then a loop that calls `shape.area()` works on all of them, and each object runs its own version. The calling code needs no `if` statements checking the type, because the object itself knows how to respond. Adding a new shape later means writing one new class, not editing every loop that handles shapes.",
   "In Python, polymorphism arises naturally from method overriding and dynamic lookup. When a method is called, Python looks it up on the actual object's class at that moment, following the method resolution order from the object's own class upward. This has a powerful consequence: a superclass method that calls `self.something()` will run the subclass's version of `something` when the object is a subclass instance. The superclass can therefore define the overall steps of an algorithm while subclasses supply the details, a pattern you will see in many frameworks.",
   "```python\nclass Shape:\n    def area(self):\n        return 0\n    def report(self):\n        return type(self).__name__ + ' area ' + str(self.area())\n\nclass Square(Shape):\n    def __init__(self, s): self.s = s\n    def area(self): return self.s * self.s\n\nclass Circle(Shape):\n    def __init__(self, r): self.r = r\n    def area(self): return round(3.14159 * self.r ** 2, 1)\n\nfor sh in (Square(2), Circle(1)):\n    print(sh.report())   # Square area 4, then Circle area 3.1\n```",
   "Trace the loop carefully, because this is exactly the kind of code PCAP asks you to predict. `report()` is defined only in `Shape`, so both objects use it. Inside `report()`, `type(self).__name__` gives the name of the actual class, `'Square'` or `'Circle'`, not `'Shape'`. The call `self.area()` is looked up on the actual object, so the `Square` runs `Square.area()` and returns 4, and the `Circle` runs `Circle.area()` and returns 3.1. If a subclass did not override `area()`, the lookup would continue up to `Shape.area()` and return 0. The superclass code never mentions either subclass, yet it produces the right result for both.",
   "Python goes further than inheritance-based polymorphism. Because methods are looked up by name at run time, any object with the right method works, whether or not it shares a superclass with the others. This is called duck typing: if it walks like a duck and quacks like a duck, treat it as a duck. The built-in `len()` is a good illustration. It works on strings, lists, dictionaries and your own classes, as long as they define `__len__`, and `len()` simply calls that method. If an object lacks the method, nothing warns you in advance: calling a missing method such as `obj.quack()` raises AttributeError at run time, and `len()` on an object without `__len__` raises TypeError.",
   "The `__str__()` method is a polymorphic hook that every object has, because every class inherits a default version from `object`. `print(obj)` and `str(obj)` call it to get a human-readable string. The inherited default produces text like `<__main__.Point object at 0x7f...>`, showing the module, the class name and a memory address, which is rarely useful to a person reading output. Overriding `__str__()` gives your objects a meaningful printed form. It takes only `self` and must return a string; returning any other type, such as an integer or None, makes `print()` or `str()` raise TypeError.",
   "```python\nclass Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __str__(self):\n        return f'({self.x}, {self.y})'\n\np = Point(1, 2)\nprint(p)              # (1, 2)\nprint('P=' + str(p))  # P=(1, 2)\n```",
   "Because `__str__` is an ordinary method, it follows the same inheritance rules as `area()`. A subclass that does not define it inherits its parent's version, and a subclass that does define it overrides the parent. Inside `__str__`, you can call `super().__str__()` to reuse the parent's text and add to it. Note that `print(p)` calls `__str__` for you; you never need to write `print(p.__str__())`, and string concatenation such as `'P=' + p` fails with TypeError because `+` does not convert objects to strings automatically. Use `str(p)` or an f-string instead.",
   "A related method, `__repr__()`, provides the developer-oriented representation shown at the interactive prompt and inside containers. Printing a list of points uses each element's `__repr__`, not `__str__`, so `print([p])` shows the default form unless `__repr__` is defined too. If a class defines only `__repr__`, `str()` falls back to it. For PCAP, focus on `__str__`: know that `print()` and `str()` call it, that it is inherited and can be overridden like any method, and that it must return a string."
  ],
  "analogy": "Polymorphism is like a TV remote's power button. You press the same button for the television, the sound bar and the streaming box, and each device handles \"power\" in its own way. The remote does not need to know how each device works inside. `__str__` is like each device's display label: if the maker never set one, you see a factory serial number, the equivalent of the memory address. The analogy stops short in one way: in Python, a device with no power method at all fails only when you actually press the button.",
  "terms": [
   [
    "Polymorphism",
    "The ability of different classes to respond to the same method call in their own way."
   ],
   [
    "Method overriding",
    "Defining a method in a subclass with the same name as one in its superclass, replacing it for subclass objects."
   ],
   [
    "Duck typing",
    "Using any object that provides the needed methods, regardless of its class."
   ],
   [
    "__str__()",
    "Special method returning an object's readable string form, used by print() and str()."
   ],
   [
    "__repr__()",
    "Special method returning a developer-oriented representation, used at the interactive prompt and inside containers."
   ]
  ],
  "example": "A payroll program keeps Salaried and Hourly employee objects in one list and calls emp.pay() on each. Adding a Contractor class later needs no change to the payroll loop, only a new pay() method, and a __str__ that returns the contractor's name and rate makes print(emp) readable in the audit report.",
  "mistakes": [
   [
    "When a superclass method calls self.area(), the superclass's own area() always runs.",
    "Lookup starts at the object's actual class. For a Square object, self.area() runs Square.area(), even when the call is written inside Shape."
   ],
   [
    "__str__ can return any value, and print() will convert it.",
    "__str__ must return a string. Returning an int or None makes print() and str() raise TypeError."
   ],
   [
    "You must call obj.__str__() explicitly to get the custom text.",
    "print(obj) and str(obj) call __str__ automatically. Calling the special method directly works but is unnecessary."
   ],
   [
    "Polymorphism in Python requires all classes to share a common superclass.",
    "Duck typing means any object with a method of the right name works; shared ancestry is one way to get polymorphism, not a requirement."
   ]
  ],
  "tryit": [
   [
    "Your team's Notification class has a send() method that calls self.format_message() and then prints the result. EmailNotification and SmsNotification both override format_message(), but a new PushNotification class does not. What does send() print for a PushNotification object, and how would you make it print a push-specific message?",
    "send() runs Notification's format_message(), because PushNotification has none of its own and lookup continues up to the superclass. To get a push-specific message, define format_message() in PushNotification; send() itself needs no change, which is the point of polymorphism."
   ],
   [
    "A colleague adds def __str__(self): print(self.name) to a Ticket class. When the code runs print(ticket), the name appears and then a TypeError is raised. Why, and what is the fix?",
    "The method prints the name and then returns None, because it has no return statement. print() then gets None from __str__, which is not a string, so it raises TypeError. The fix is to return the text: def __str__(self): return self.name."
   ]
  ],
  "tip": "print(obj) calls obj.__str__(); without an override you get the default <... object at 0x...> text. __str__ must return a string. Polymorphic calls run the method of the object's actual class, even when called from superclass code.",
  "check": [
   [
    "What must __str__ return?",
    "A string; returning another type makes print() or str() raise TypeError."
   ],
   [
    "A superclass method calls self.area(); the object is a Square that overrides area(). Which area() runs?",
    "Square's, because lookup starts from the object's actual class."
   ],
   [
    "A subclass of Point defines no __str__. What does print() use for its objects?",
    "Point's __str__, inherited like any other method."
   ]
  ]
 },
 {
  "t": "List comprehensions, including if filters and nested loops",
  "hook": "Kofi at Riverbend High School's IT office sends you a script that turns the student roster into email addresses. It is twelve lines long: an empty list, a `for` loop, an `if` that skips withdrawn students, and an `append`. A colleague replaces the whole thing with one line in square brackets, and it produces the same output. Then someone tries to build a seating grid with `[[0] * 4] * 5`, marks one seat as taken, and every row shows the same seat taken. On the PCAP exam, you will see these one-line lists again and again. How do you read them, and why did the grid go wrong?",
  "simple": "A list comprehension is a short way to build a list by saying what goes in it, all in one line. `[x * 2 for x in numbers]` means \"go through the numbers, double each one, and collect the results.\" You can add a filter at the end, like a bouncer at a door: `[x for x in numbers if x > 0]` lets in only the positive numbers. You can also put two loops in a row, and they behave like one loop inside another. Think of making fruit cups: for each cup, for each fruit, add a piece. The first loop you write is the outer one, and the last loop changes fastest.",
  "body": [
   "A list comprehension builds a new list from an iterable in a single expression. Instead of creating an empty list and calling `append()` inside a `for` loop, you write the whole thing in square brackets: `[expression for item in iterable]`. For example, `[x * x for x in range(5)]` produces `[0, 1, 4, 9, 16]`. Comprehensions are shorter than the loop version, usually a little faster, and very common in exam code, so reading them quickly is a core PCAP skill.",
   "Read a comprehension from the `for` outward. In `[x * x for x in range(5)]`, the reading is: for each `x` in `range(5)`, evaluate `x * x` and collect the result. The expression at the front can be anything that produces a value: a calculation, a method call such as `s.upper()`, a tuple, or even another comprehension. In Python 3, the loop variable is local to the comprehension, so it does not leak out. After the comprehension finishes, `x` is not defined, unless a variable named `x` existed before, in which case it keeps its old value untouched.",
   "An `if` clause at the end filters items. Only items for which the condition is true are included, and the others are dropped entirely. `[w for w in words if len(w) > 3]` keeps only the long words, so the result can be shorter than the input. Do not confuse that with a conditional expression at the front, which transforms every item instead of dropping any: `['even' if n % 2 == 0 else 'odd' for n in nums]` produces exactly one entry per number. A filter `if` has no `else`, and writing one there is a syntax error. A conditional expression must have an `else`, because it has to produce a value for every item. The position tells you which one you are looking at.",
   "```python\nnums = [1, 2, 3, 4, 5, 6]\nprint([n for n in nums if n % 2 == 0])         # [2, 4, 6]\nprint([n * 10 if n > 3 else n for n in nums])  # [1, 2, 3, 40, 50, 60]\nprint([(x, y) for x in 'ab' for y in (1, 2)])\n# [('a', 1), ('a', 2), ('b', 1), ('b', 2)]\nprint([[r * c for c in range(1, 4)] for r in range(1, 4)])\n# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]\n```",
   "Multiple `for` clauses create nested loops, and they run in the order written, left to right, exactly as if you had written the loops one inside the other. In `[(x, y) for x in 'ab' for y in (1, 2)]`, the first `for` is the outer loop and the second changes fastest, so you get both `y` values for `'a'` before moving on to `'b'`. The resulting list is flat: four tuples, not two lists of two. The equivalent loop version would be `for x in 'ab':` followed by an indented `for y in (1, 2):` and an `append`. If you are ever unsure of the order, rewrite the comprehension as those nested loops on scrap paper.",
   "Contrast that with a comprehension inside another comprehension, as in the last example, which produces a list of lists. Here the inner comprehension sits in the expression position, so it runs once for each row and builds that whole row. That form is the correct way to create a two-dimensional grid. Writing `[[0] * 3] * 3` instead looks similar, but the outer `* 3` repeats a reference to one inner list three times. All three rows are the same object, so `grid[0][1] = 5` changes every row. `[[0] * 3 for _ in range(3)]` evaluates `[0] * 3` freshly on each pass and gives three independent rows.",
   "You can combine several `for` and `if` clauses: `[(x, y) for x in range(3) for y in range(3) if x != y]` gives every pair of different numbers. Each `if` applies to the loops written before it, so an `if` placed between two `for` clauses can filter the outer variable before the inner loop runs. Keep comprehensions readable. When one needs more than about two clauses or a long expression, an ordinary loop with descriptive names is often clearer, and nothing in Python forces you to use the shorter form.",
   "The same syntax with different brackets builds other types. Braces give a set comprehension, such as `{c for c in 'banana'}`, which removes duplicates. Braces with a `key: value` expression give a dictionary comprehension, such as `{w: len(w) for w in words}`. Parentheses give a generator expression, which produces values lazily instead of building a list, as the generators lesson explains. On the exam, look at the outer brackets first to know what type the result will be, then read the `for` and `if` clauses to know what goes in it."
  ],
  "analogy": "A list comprehension is like an order ticket at a sandwich counter: \"for each customer in line, if they paid, make their sandwich.\" The worker reads it left to right and produces a tray of finished sandwiches. Two `for` clauses are like \"for each table, for each seat\": you finish every seat at table one before moving to table two. The analogy breaks for the grid trap: a real kitchen would never hand out one tray three times, but `[[0] * 3] * 3` does exactly that with a single inner list.",
  "terms": [
   [
    "List comprehension",
    "An expression in square brackets that builds a list by looping over an iterable."
   ],
   [
    "Filter clause",
    "A trailing if in a comprehension that includes only items meeting a condition; it has no else."
   ],
   [
    "Conditional expression",
    "A if condition else B, placed at the front to choose a value for every item."
   ],
   [
    "Nested comprehension",
    "A comprehension inside another, used to build lists of lists such as grids."
   ],
   [
    "Generator expression",
    "Comprehension syntax in parentheses that produces values lazily instead of building a list."
   ]
  ],
  "example": "A teacher converts a list of raw scores into labels with ['pass' if s >= 50 else 'fail' for s in scores], which keeps one entry per student, and then collects only the top marks with [s for s in scores if s >= 90], which can return a much shorter list.",
  "mistakes": [
   [
    "In [f(x, y) for x in A for y in B], the y loop is the outer one because it is written last.",
    "Loops run in the order written. The leftmost for is the outer loop and the rightmost changes fastest, just like nested loop statements."
   ],
   [
    "A trailing if can have an else: [n for n in nums if n > 0 else 0].",
    "A filter if cannot have an else and this is a syntax error. To transform every item, put the conditional expression at the front: [n if n > 0 else 0 for n in nums]."
   ],
   [
    "[[0] * 3] * 3 creates three independent rows.",
    "It creates three references to one inner list, so changing one cell changes every row. Use [[0] * 3 for _ in range(3)]."
   ],
   [
    "After [x for x in range(5)], the variable x holds 4.",
    "In Python 3 the loop variable is local to the comprehension and does not leak into the surrounding scope."
   ]
  ],
  "tryit": [
   [
    "You need a list of every (row, seat) label for a small theater with rows 'A' and 'B' and seats 1 to 3, printed row by row: A1, A2, A3, B1, B2, B3. Your teammate wrote [r + str(s) for s in range(1, 4) for r in 'AB']. Will it print in the right order, and if not, how do you fix it?",
    "No. The leftmost loop is outer, so seats are the outer loop and the result is A1, B1, A2, B2, A3, B3. Swap the clauses: [r + str(s) for r in 'AB' for s in range(1, 4)] keeps the row fixed while the seats change fastest."
   ],
   [
    "A script keeps only valid temperatures from readings with [t for t in readings if t > -50] and then, separately, wants to replace invalid readings with None while keeping the list the same length. Which form should the second comprehension use?",
    "A conditional expression at the front, because every item must produce an entry: [t if t > -50 else None for t in readings]. A trailing filter would drop items and change the length."
   ]
  ],
  "tip": "In multiple for clauses, the leftmost loop is the outer one. A trailing if filters (no else allowed); a leading if ... else transforms every item. Build grids with a nested comprehension, never with list multiplication of a list.",
  "check": [
   [
    "What is [c for c in 'hello' if c not in 'lo']?",
    "['h', 'e']."
   ],
   [
    "What does [i * j for i in range(2) for j in range(3)] produce?",
    "[0, 0, 0, 0, 1, 2]: i = 0 gives three zeros, then i = 1 gives 0, 1, 2."
   ],
   [
    "What is the length of [x if x else -1 for x in [0, 3, 0]]?",
    "3, because a leading conditional expression produces one entry per item: [-1, 3, -1]."
   ]
  ]
 },
 {
  "t": "Lambda functions and functions that take a lambda as an argument",
  "hook": "Ines runs the volunteer schedule for Cedar Hollow Food Pantry, and her Python script prints the list of volunteers sorted alphabetically. She wants it sorted by the number of hours each person has signed up for instead, and she has found a line in a colleague's notes: `sorted(volunteers, key=lambda v: v[2])`. It works, but she has no idea why. There is no `def`, no function name, and no `return`, yet something is clearly being called for each volunteer. On the exam you will be asked to trace exactly this kind of line. What is a lambda, and what does `sorted()` do with it?",
  "simple": "A lambda is a tiny function you can write in one line without giving it a name. `lambda x: x * 2` means \"take x and give back x times two.\" It is the same as writing a normal two-line function, just shorter. The main reason to use one is to hand a small rule to another function. When you sort a list of people by age, `sorted()` needs to know \"what should I compare?\", and you can hand it the rule `lambda p: p.age`. It is like giving a helper a sticky note with a short instruction on it instead of writing a whole manual. The helper reads the note for each item and does what it says.",
  "body": [
   "A lambda is a small anonymous function written as an expression: `lambda parameters: expression`. The text `lambda x: x * 2` creates a function that takes one argument and returns it doubled. It behaves like `def double(x): return x * 2`, but it has no name of its own and it fits anywhere an expression is allowed, such as an argument to another function, an item in a list, or a value returned from a function. The word anonymous simply means the function object is not bound to a name by the definition itself.",
   "The body of a lambda must be a single expression, and its value is returned automatically, so you never write `return`. Statements cannot appear inside a lambda: no assignments with `=`, no `for` or `while` loops, no `if` blocks, no `return`, no `pass`. A conditional expression is allowed, because it is an expression rather than a statement: `lambda n: 'even' if n % 2 == 0 else 'odd'` is valid. A lambda can take no parameters (`lambda: 42`), several parameters (`lambda a, b: a + b`) and default values (`lambda x, y=1: x + y`), using the same rules as a `def` parameter list, but without parentheses around the parameters.",
   "```python\nsquare = lambda x: x ** 2\nprint(square(4))                  # 16\nprint((lambda a, b: a * b)(3, 5)) # 15, called immediately\n\ndef apply(f, value):\n    return f(value)\n\nprint(apply(lambda s: s.upper(), 'hi'))   # HI\nprint(apply(len, 'hello'))                # 5\n```",
   "Look at the second print line. The lambda is wrapped in parentheses and then followed by `(3, 5)`, so it is created and called in the same expression. Without the parentheses around the lambda, Python would read `lambda a, b: a * b(3, 5)`, treating `b(3, 5)` as part of the body, which is a different function entirely. You will rarely write code like this in practice, but exam questions use it to check that you understand a lambda is just a function object that can be called like any other.",
   "Functions in Python are objects that can be passed around like any other value, and that is where lambdas are most useful. A function that accepts another function as a parameter, or returns one, is called a higher-order function. In `apply(f, value)` above, `f` can be a lambda, a built-in such as `len`, or any function defined with `def`; `apply` just calls `f(value)` and returns the result. Notice that `len` is passed without parentheses. Writing `apply(len(), 'hello')` would try to call `len` immediately with no arguments and fail with TypeError. Writing and tracing higher-order functions is a standard PCAP task, so practice two questions every time: which function is passed in, and what does the receiving function do with it, and how many times?",
   "The most common real use is the `key` argument of `sorted()`, `list.sort()`, `min()` and `max()`, along with the function argument of `map()` and `filter()`. `sorted(people, key=lambda p: p[1])` sorts tuples by their second item. `max(words, key=lambda w: len(w))` finds the longest word, and `max(words, key=len)` does the same more simply. The key function is called once per item to produce the value used for comparison, but the result contains the original items, not the key values. So `min(pairs, key=lambda p: p[0])` returns a whole tuple, not just its first element. Adding `reverse=True` to `sorted()` flips the order without changing the key.",
   "```python\npairs = [('b', 3), ('a', 1), ('c', 2)]\nprint(sorted(pairs, key=lambda p: p[1]))   # [('a', 1), ('c', 2), ('b', 3)]\nprint(min(pairs, key=lambda p: p[0]))      # ('a', 1)\n```",
   "To trace a call that receives a lambda, substitute. For `sorted(pairs, key=lambda p: p[1])`, compute the key for each item: `('b', 3)` gives 3, `('a', 1)` gives 1, `('c', 2)` gives 2. Sort by those keys, 1, 2, 3, and write the original items in that order. The same method works for any higher-order function on the exam: replace the parameter name in the lambda with each actual argument and evaluate.",
   "Assigning a lambda to a name, as `square = lambda x: x ** 2` does, works, but style guides such as PEP 8 recommend `def` in that case, because a named function shows its real name in tracebacks instead of `<lambda>`. Use lambdas for short, throwaway functions passed straight into another call. Lambdas can also be returned from functions, where they remember variables from the enclosing function, which leads to closures, covered in a later lesson."
  ],
  "analogy": "A lambda is like a sticky note you hand to a helper sorting a pile of envelopes: \"look at the zip code.\" The helper, `sorted()`, does all the sorting work, reading your note once for each envelope. You did not write a full instruction manual with a title page, which would be a `def`. The analogy stops in one place: a sticky note can hold only one short instruction, and a lambda likewise holds only a single expression, never several statements.",
  "terms": [
   [
    "Lambda",
    "An anonymous function defined by a single expression whose value it returns automatically."
   ],
   [
    "Higher-order function",
    "A function that takes another function as an argument or returns one."
   ],
   [
    "key function",
    "A function passed to sorted(), list.sort(), min() or max() to compute the comparison value for each item."
   ],
   [
    "Anonymous function",
    "A function object that is not given a name by its definition."
   ]
  ],
  "example": "An online store sorts products for display with sorted(products, key=lambda p: p['price']), and a shopper's choice of highest rating first becomes sorted(products, key=lambda p: p['rating'], reverse=True). The product dictionaries come back whole; only the order changes.",
  "mistakes": [
   [
    "A lambda can contain a return statement: lambda x: return x * 2.",
    "return is a statement and is not allowed. The expression's value is returned automatically: lambda x: x * 2."
   ],
   [
    "max(words, key=lambda w: len(w)) returns the length of the longest word.",
    "The key only decides the comparison. max() returns the original item, the longest word itself."
   ],
   [
    "Lambdas cannot use if logic at all.",
    "A conditional expression such as 'big' if n > 9 else 'small' is allowed; only if statements are forbidden."
   ],
   [
    "Passing len() as the key works the same as passing len.",
    "len() calls the function immediately with no arguments and raises TypeError. Pass the function object: key=len."
   ]
  ],
  "tryit": [
   [
    "Your team stores tasks as tuples (name, priority, minutes), for example ('backup', 2, 30). The manager wants the shortest task first, and for display, the task names only. A teammate writes sorted(tasks, key=lambda t: t[1]). What is wrong, and what would you write?",
    "The key uses t[1], the priority, not the minutes. Use sorted(tasks, key=lambda t: t[2]) to order by minutes. sorted() still returns whole tuples, so for names only you would follow it with something like [t[0] for t in sorted(tasks, key=lambda t: t[2])]."
   ]
  ],
  "tip": "A lambda body is one expression with an implicit return; no statements, no return keyword. When a function receives a lambda, trace it by substituting each argument into the lambda's expression. key functions choose the comparison value, but the original items come back.",
  "check": [
   [
    "What is printed by print((lambda x, y=2: x ** y)(3))?",
    "9, because y defaults to 2 and 3 ** 2 is 9."
   ],
   [
    "Is lambda x: return x valid?",
    "No. The body must be an expression; return is a statement and is not allowed."
   ],
   [
    "What does min(['pear', 'fig', 'apple'], key=len) return?",
    "'fig', the item with the smallest length; the item itself is returned, not 3."
   ]
  ]
 },
 {
  "t": "Map() and filter(), and the fact that they return one-shot iterators",
  "hook": "Marcus maintains the sales summary script at Bluegill Outdoor Supply. It reads a column of prices from a file, converts them with `prices = map(float, lines)`, prints the total with `sum(prices)`, and then prints the most expensive item with `max(prices)`. The total is correct. The `max()` line crashes with `ValueError: max() arg is an empty sequence`, even though the file clearly has two hundred prices in it. Marcus prints `prices` to investigate and sees only `<map object at 0x...>`. Nothing was deleted, and the file is fine. So where did the prices go between one line and the next?",
  "simple": "`map()` and `filter()` are two helpers that work through a collection for you. `map()` changes every item, for example turning every word into uppercase. `filter()` keeps only some items, for example only the even numbers. The catch is that neither one hands you a finished list. Instead it gives you a dispenser that releases one result at a time, only when you ask. Once the dispenser has handed out everything, it is empty for good, like a roll of raffle tickets: after you tear off the last ticket, asking again gets you nothing. If you need the results twice, pour them into a list first with `list()`.",
  "body": [
   "`map()` and `filter()` apply a function across the items of an iterable. `map(function, iterable)` calls the function on each item and produces the results, so the output has one value per input item. `filter(function, iterable)` calls the function on each item and keeps only the items for which it returns a true value, so the output can be shorter than the input, and it contains the original items, not the function's return values. Both are frequently used with lambdas, but any callable works: a built-in like `str`, a method like `str.upper`, or your own `def` function.",
   "```python\nnums = [1, 2, 3, 4, 5]\nprint(list(map(lambda n: n * n, nums)))         # [1, 4, 9, 16, 25]\nprint(list(filter(lambda n: n % 2 == 1, nums))) # [1, 3, 5]\nprint(list(map(str, nums)))                     # ['1', '2', '3', '4', '5']\n```",
   "In Python 3, neither function returns a list. Each returns an iterator object, a map object or a filter object, that produces values lazily, one at a time, only when something asks for the next value. That is why every example above wraps the call in `list()`. Printing one directly shows something like `<map object at 0x...>` rather than the values, because the values have not been computed yet. This is a frequent exam trap: an answer choice showing a list for `print(map(...))` is wrong in Python 3.",
   "Being an iterator has a consequence the exam loves: it is one-shot. Once you have consumed all its values, by converting it to a list, looping over it with `for`, or passing it to a function like `sum()`, `max()` or `sorted()`, it is exhausted, and using it again produces nothing. A second `list()` call returns `[]`, a second `for` loop runs zero times, and `max()` on the exhausted object raises ValueError because it receives an empty sequence. Laziness also means that creating a map or filter object runs nothing at all. The function is called only as values are requested, so an error inside the function surfaces at the moment of consumption, not at the line where `map()` was called.",
   "```python\nm = map(str.upper, ['a', 'b'])\nprint(list(m))   # ['A', 'B']\nprint(list(m))   # [] - already exhausted\n\nf = filter(None, [0, 1, '', 'x', None, [2]])\nprint(list(f))   # [1, 'x', [2]]\n```",
   "If you need the results more than once, store them in a list first: `results = list(map(...))`. A list can be looped over, indexed and measured with `len()` as many times as you like. You can also step through an iterator manually with `next()`, which returns the next value and raises StopIteration when nothing is left, the same protocol generators use. Partial consumption counts too: if you call `next(m)` once and then `list(m)`, the list contains only the remaining values. When you debug a script that suddenly sees no data, look for an earlier line that already used the iterator, including innocent-looking ones such as a `print(list(m))` added while testing. That debugging print consumes the values, so the real code that follows receives an empty iterator. Converting to a list once, right where the map or filter object is created, removes the whole class of problem.",
   "A few more details are tested. `map()` accepts several iterables when the function takes several arguments: `map(lambda a, b: a + b, [1, 2, 3], [10, 20])` produces 11 and 22 and stops at the end of the shortest iterable, so the 3 is ignored. `filter()` accepts `None` in place of a function, which means keep items that are themselves truthy, so it removes zeros, empty strings, None and empty containers while keeping everything else. And the function argument comes first in both: `map(nums, str)` has the arguments reversed and raises TypeError, because the class `str` is not an iterable to loop over.",
   "List comprehensions can do the same jobs. `[n * n for n in nums]` produces the same values as `list(map(lambda n: n * n, nums))`, and `[n for n in nums if n % 2]` matches the filter version. Many Python programmers prefer comprehensions for readability, but the PCAP exam expects you to read both styles fluently. Keep one difference in mind: a list comprehension builds a complete list immediately and can be reused, while map and filter objects are lazy and single-use. Generator expressions, written with parentheses, share the lazy, one-shot behavior of map and filter."
  ],
  "analogy": "A map object is like a ticket dispenser at a deli counter. It does not print all the tickets at once; it releases the next number only when someone pulls. Once the roll runs out, pulling again gives you nothing, and the dispenser does not refill itself. Calling `list()` is like pulling every ticket and pinning them to a board, where anyone can read them again. The analogy is imperfect in one way: a real roll exists in advance, while a map object computes each value only at the moment you pull.",
  "terms": [
   [
    "map()",
    "Returns an iterator applying a function to each item of one or more iterables, stopping at the shortest."
   ],
   [
    "filter()",
    "Returns an iterator yielding the original items for which a function returns a true value."
   ],
   [
    "Iterator",
    "An object producing values one at a time with next(); once exhausted it yields nothing more."
   ],
   [
    "Lazy evaluation",
    "Computing values only when they are requested rather than all at once."
   ],
   [
    "Truthy",
    "A value treated as true in a condition; filter(None, ...) keeps only truthy items."
   ]
  ],
  "example": "A script reads prices with prices = map(float, lines), prints sum(prices), and then tries max(prices), which raises ValueError because the map iterator was already exhausted by sum(). Changing the first line to prices = list(map(float, lines)) fixes both calls.",
  "mistakes": [
   [
    "print(map(abs, [-1, 2])) prints [1, 2] in Python 3.",
    "map returns a lazy iterator. Printing it shows <map object at 0x...>; wrap it in list() to see the values."
   ],
   [
    "You can call list() on the same map object as many times as you like.",
    "A map or filter object is one-shot. After the first full consumption, list() returns []."
   ],
   [
    "filter() returns the function's results, such as True and False.",
    "filter returns the original items that passed the test, not the test results."
   ],
   [
    "map() with two lists of different lengths raises an error.",
    "map stops at the end of the shortest iterable, silently ignoring the extra items."
   ]
  ],
  "tryit": [
   [
    "A report script does evens = filter(lambda n: n % 2 == 0, data), then loops for e in evens: total += e, and later prints len(list(evens)) to show how many even numbers there were. The total is right but the count is always 0. Explain the bug and give a fix.",
    "The for loop consumed the filter object, so list(evens) gets an exhausted iterator and returns [], whose length is 0. Store the results once with evens = list(filter(...)); then both the loop and len(evens) work."
   ],
   [
    "You need the sum of each pair from prices = [5, 10, 15] and fees = [1, 2]. A colleague predicts list(map(lambda p, f: p + f, prices, fees)) gives [6, 12, 15]. Is that right?",
    "No. map stops at the shortest iterable, so the result is [6, 12]. The 15 has no partner and is skipped, not passed through unchanged."
   ]
  ],
  "tip": "map and filter return iterators, not lists, and each can be consumed only once. A second list() of the same object gives []. filter(None, items) keeps only truthy items. map with several iterables stops at the shortest.",
  "check": [
   [
    "What is list(filter(lambda s: s.isdigit(), ['1', 'a', '22']))?",
    "['1', '22']."
   ],
   [
    "m = map(abs, [-1, -2]); sum(m); what is list(m)?",
    "[], because sum() consumed the iterator."
   ],
   [
    "What is list(filter(None, [0, '', 'a', [], 7]))?",
    "['a', 7], because 0, '' and [] are falsy."
   ]
  ]
 },
 {
  "t": "Closures: inner functions that remember variables from an enclosing scope, and late binding",
  "hook": "Aiko is building a small control panel for Willow Creek Community Theater. A loop creates five buttons, one for each lighting preset, and attaches `lambda: select(i)` to each so that clicking button 0 picks preset 0, button 1 picks preset 1, and so on. She clicks the first button and preset 4 comes on. She clicks the second, and preset 4 comes on again. Every button does the same thing. Nothing in the loop looks wrong, and when she printed `i` inside the loop it showed 0, 1, 2, 3, 4 as expected. What are those little functions actually remembering, and when do they look it up?",
  "simple": "Python lets you put one function inside another. The inner function can use the outer function's variables. If the outer function hands back the inner function, the inner one keeps those variables with it, like a backpack, even after the outer function has finished. That bundle is called a closure. There is one surprise: the backpack holds the variable itself, not a photo of its value at that moment. So if the variable changes later, the inner function sees the new value when it finally runs. Imagine leaving a note that says \"meet at the address on the fridge\" instead of writing the address down. If someone changes the fridge note, you go to the new place.",
  "body": [
   "Python lets you define a function inside another function, and the inner function can read the outer function's variables. That works because name lookup follows the LEGB rule: Python searches the Local scope first, then any Enclosing function scopes, then the Global (module) scope, then the Built-in names. A closure is created when the outer function returns the inner function and the inner one still uses variables from the outer scope. Even though the outer function has finished running, the returned function keeps those variables alive and can use them whenever it is called later.",
   "```python\ndef make_multiplier(factor):\n    def multiply(x):\n        return x * factor      # factor comes from the enclosing scope\n    return multiply\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double(5), triple(5))    # 10 15\n```",
   "Each call to `make_multiplier` creates a brand-new `factor` variable and a new inner function bound to it, so `double` and `triple` remember different values and do not interfere with each other. Notice that `make_multiplier` ends with `return multiply`, returning the function object without parentheses. Writing `return multiply()` would try to call the inner function immediately, with no argument, and raise TypeError. Exam questions often hinge on that difference. Closures are a lightweight way to create configured functions, and they are the mechanism underneath decorators and many callback patterns.",
   "Reading an enclosing variable is free, but assigning to it is different. An assignment anywhere inside a function makes that name local to the function for the whole function body. So if an inner function writes `count += 1`, Python treats `count` as a new local variable, not the enclosing one. To rebind the enclosing variable instead, declare it with `nonlocal count` at the top of the inner function. This lets a closure keep private state between calls without using a global variable or a class.",
   "```python\ndef counter():\n    count = 0\n    def step():\n        nonlocal count\n        count += 1\n        return count\n    return step\n\nc = counter()\nprint(c(), c(), c())   # 1 2 3\n```",
   "Without the `nonlocal` line, the first call `c()` would raise UnboundLocalError. The augmented assignment `count += 1` makes `count` local to `step`, and it tries to read that local before anything has been assigned to it. Note the contrast with `global`: `global` points a name at the module scope, while `nonlocal` points it at the nearest enclosing function scope, and `nonlocal` fails at compile time if no enclosing function has that name. Each call to `counter()` creates a separate `count`, so two counters keep independent tallies: after `c1 = counter()` and `c2 = counter()`, calling `c1()` three times and `c2()` once gives 3 and 1. Mutating an enclosing object is different from rebinding a name. If the enclosing variable holds a list, the inner function can call `items.append(x)` without `nonlocal`, because it never assigns to the name `items`; it only changes the object the name refers to. Only `=`, `+=` and similar assignments to the name itself need the declaration.",
   "Closures capture variables, not values. The enclosing variable is looked up when the inner function runs, not when it is defined. This is called late binding, and it produces a famous surprise with loops. The expression `funcs = [lambda: i for i in range(3)]` creates three functions that all refer to the same variable `i`. By the time you call them, the loop has finished and `i` holds 2, so `[f() for f in funcs]` gives `[2, 2, 2]`, not `[0, 1, 2]`. The same happens with an ordinary `for` loop that appends `def` functions or lambdas to a list. Printing `i` inside the loop looks correct, because at that moment it does hold each value; the problem appears only when the functions are called afterward.",
   "The usual fix is to capture the current value as a default argument, because default values are evaluated once, when the function is defined: `[lambda i=i: i for i in range(3)]` gives `[0, 1, 2]`. Inside each lambda, the parameter `i` is now a local with its own default, separate from the loop variable. Another fix is to create each function through a factory like `make_multiplier`, so each call gets its own enclosing variable. When an exam question builds functions in a loop and calls them later, check for late binding before anything else, then check whether the outer function returns the function object or the result of calling it."
  ],
  "analogy": "A closure is like a sticky note that says \"use the number on the whiteboard in Room 4\" rather than writing the number down. Wherever you carry the note, you can always walk back and read the board, even after the meeting in Room 4 has ended. Late binding follows directly: if someone changes the whiteboard before you read it, you get the new number. The analogy fits the default-argument fix too: copying the number onto the note itself, `i=i`, freezes the value at that moment.",
  "mnemonic": "LEGB, the name-lookup order: \"Lazy Elephants Guard Bananas\" for Local, Enclosing, Global, Built-in.",
  "terms": [
   [
    "Closure",
    "An inner function that retains access to variables from the enclosing function's scope after that function returns."
   ],
   [
    "Enclosing scope",
    "The local scope of an outer function, visible to functions nested inside it."
   ],
   [
    "nonlocal",
    "Declaration that lets an inner function rebind a variable of the nearest enclosing function."
   ],
   [
    "Late binding",
    "Looking up a closure's free variables when it is called, not when it is created."
   ],
   [
    "LEGB rule",
    "Python's name lookup order: Local, Enclosing, Global, Built-in."
   ]
  ],
  "example": "A GUI builds a row of buttons in a loop, attaching lambda: select(i) to each. Every button selects the last item until the developer changes it to lambda i=i: select(i), capturing each index at creation time.",
  "mistakes": [
   [
    "A closure stores a snapshot of the variable's value at the moment the inner function is defined.",
    "It keeps a reference to the variable itself, so it sees whatever value the variable has when the function is called. That is late binding."
   ],
   [
    "count += 1 inside an inner function updates the outer count automatically.",
    "The assignment makes count local, so reading it first raises UnboundLocalError. Declare nonlocal count to rebind the enclosing variable."
   ],
   [
    "return inner() and return inner both return the inner function.",
    "return inner() calls the inner function and returns its result. Only return inner, with no parentheses, returns the function object."
   ],
   [
    "nonlocal and global are interchangeable.",
    "global refers to the module scope; nonlocal refers to the nearest enclosing function scope."
   ]
  ],
  "tryit": [
   [
    "Your teammate writes handlers = [] and then for name in ['save', 'load', 'quit']: handlers.append(lambda: print(name)). When the app calls handlers[0](), it prints quit. They ask whether they should rename the loop variable to fix it. What do you tell them, and what is the real fix?",
    "Renaming does not help; all three lambdas share one variable, which holds 'quit' after the loop ends. Capture the current value with a default: handlers.append(lambda name=name: print(name)). Each lambda then has its own name parameter fixed at creation time."
   ]
  ],
  "tip": "Closures remember variables, not snapshots of values. Functions created in a loop all see the loop variable's final value unless you bind it with a default argument. To change an enclosing variable, declare it nonlocal.",
  "check": [
   [
    "What does [f() for f in [lambda: n * 2 for n in range(3)]] return?",
    "[4, 4, 4], because every lambda reads n after the loop has ended with n = 2."
   ],
   [
    "Why does count += 1 inside an inner function fail without nonlocal?",
    "The assignment makes count local to the inner function, so reading it first raises UnboundLocalError."
   ],
   [
    "def outer(): x = 5; def inner(): return x; return inner. What does outer()() return?",
    "5, because inner remembers x from the enclosing scope."
   ]
  ]
 },
 {
  "t": "Generators: yield, next(), and StopIteration",
  "hook": "It is 2 a.m. and Sam, on call for Northgate Freight's tracking system, gets an alert: the log-scanning script has crashed with `MemoryError` again. The script reads the entire forty-gigabyte shipment log into a list, then filters out the error lines. A teammate suggests a fix that looks almost too small: change the function so it uses `yield` instead of building a list. Sam tries it, and the script now runs with barely any memory. But when Sam calls the new function to test it, nothing seems to happen at all. Not even the `print('start')` at the top runs. What kind of function did that one keyword create?",
  "simple": "A generator is a function that gives you values one at a time, only when you ask, instead of making a whole list up front. You write it like a normal function, but use the word `yield` to hand back each value. When you call it, it does not run yet; it gives you a paused machine. Each time you ask for the next value, the machine runs until it hits a `yield`, hands over that value, and pauses again, remembering exactly where it was. When it runs out, it says \"no more\" with a signal called StopIteration. It is like a gumball machine: one turn, one gumball, and the machine does not make gumballs nobody asked for.",
  "body": [
   "A generator is a function that produces a sequence of values one at a time instead of computing them all at once and returning a list. You write it like an ordinary function but use `yield` instead of, or as well as, `return`. The presence of `yield` anywhere in the body turns the function into a generator function, and that changes what happens when you call it. Calling a generator function does not run its body at all. It returns a generator object that will run the body step by step on demand. This is why a `print()` at the top of a generator function does not appear when you merely call it.",
   "Each time you ask the generator for a value with `next(gen)`, it runs from where it last stopped until it reaches a `yield`, hands that value back, and pauses, keeping all its local variables and its position intact. The next request resumes immediately after that `yield`, as if the function had never stopped. When the function body finishes, either by reaching its end or by executing a `return` statement, the generator raises StopIteration to signal that there are no more values. Every later `next()` call raises StopIteration again; a finished generator never restarts.",
   "```python\ndef countdown(n):\n    print('start')\n    while n > 0:\n        yield n\n        n -= 1\n\ng = countdown(3)       # nothing printed yet\nprint(next(g))         # start, then 3\nprint(next(g))         # 2\nprint(next(g))         # 1\n# next(g)              # StopIteration\n```",
   "Walk through the example line by line. `countdown(3)` creates the generator object `g` and runs nothing. The first `next(g)` starts the body, prints `start`, enters the loop and pauses at `yield n`, handing back 3. The second `next(g)` resumes after the `yield`, decrements `n` to 2, loops, and yields 2. The third yields 1. A fourth `next(g)` would decrement `n` to 0, leave the loop, reach the end of the function, and raise StopIteration. Notice that `start` is printed only once, because the body runs once overall, in pieces.",
   "In everyday code you rarely call `next()` yourself. A `for` loop calls it automatically and treats StopIteration as the normal end of the loop, so `for x in countdown(3): print(x)` prints 3, 2, 1 with no error shown. Functions that consume iterables, such as `list()`, `sum()`, `max()` and `sorted()`, work the same way, so `list(countdown(3))` returns `[3, 2, 1]` after printing `start`. The StopIteration exception is still raised internally; these tools simply catch it as their signal to stop. You can mix the two styles: call `next(g)` once to take the first value by hand, then loop over `g` with `for`, and the loop continues from the second value, because both are asking the same generator for its next item. Exam questions use this to check that you see a generator as one continuing process rather than a list that starts over each time it is used.",
   "Generators are iterators, so, like map and filter objects, they are one-shot. After a generator is exhausted, looping over it again produces nothing and `list()` returns `[]`. To start over, call the generator function again to get a fresh generator object. The built-in `next()` also accepts a default value as a second argument: `next(g, None)` returns None instead of raising StopIteration when the generator is finished, which is handy when you want just the first matching item from a stream.",
   "Why use generators at all? A generator keeps only its current state in memory, not the whole sequence, so it can represent huge or even infinite sequences, such as every line of a very large file or an endless stream of ID numbers produced by a `while True:` loop that yields a new number on each pass. It also starts producing results immediately rather than after computing everything. A generator expression gives the same benefit in one line: `(x * x for x in range(10**6))` looks like a list comprehension with parentheses, but produces values lazily. When a generator expression is the only argument to a function, the extra parentheses can be dropped, as in `sum(x * x for x in range(10))`.",
   "Two more details are worth knowing for the exam. A `return value` statement inside a generator ends it; the value is not produced by `next()` but attached to the StopIteration exception as its `value` attribute, so a `for` loop never sees it. And generator objects are not lists: they have no `len()`, cannot be indexed with `g[0]`, and cannot be sliced. If you need any of those operations, convert the generator with `list()` first, accepting that this builds the whole sequence in memory."
  ],
  "analogy": "A generator is like a gumball machine. Calling the generator function installs the machine, but no gumball comes out until someone turns the handle, which is `next()`. Each turn releases exactly one gumball and the machine waits, remembering how many are left. When it is empty, turning the handle gets you a clear \"empty\" signal, StopIteration. Where the analogy stops: a real machine is filled in advance, while a generator makes each value at the moment you turn the handle, which is why it can be endless.",
  "terms": [
   [
    "Generator function",
    "A function containing yield; calling it returns a generator object without running the body."
   ],
   [
    "yield",
    "Produces a value and pauses the generator, preserving its local state until the next request."
   ],
   [
    "next()",
    "Built-in that asks an iterator for its next value; with a second argument, returns that default instead of raising StopIteration."
   ],
   [
    "StopIteration",
    "Exception raised when an iterator has no more values; for loops and list() handle it automatically."
   ],
   [
    "Generator expression",
    "A comprehension in parentheses that yields values lazily, such as (x * 2 for x in data)."
   ]
  ],
  "example": "A log analyzer defines def errors(path) that opens a file and yields only lines containing ERROR. It can scan a multi-gigabyte log with a for loop while holding just one line in memory at a time, and next(errors(path), None) returns the first error or None if there are none.",
  "mistakes": [
   [
    "Calling a generator function runs its body up to the first yield.",
    "Calling it only creates the generator object. The body starts running on the first next() call, or when a for loop begins."
   ],
   [
    "A for loop over a generator crashes with StopIteration at the end.",
    "for loops catch StopIteration and treat it as the normal end of iteration. Only explicit next() calls expose it."
   ],
   [
    "You can loop over the same generator object twice to get the values twice.",
    "Generators are one-shot. The second loop produces nothing; call the generator function again for a fresh object."
   ],
   [
    "len(gen) tells you how many values a generator will produce.",
    "Generators have no len() and cannot be indexed. Convert with list() if you really need the length."
   ]
  ],
  "tryit": [
   [
    "Your teammate writes a generator def first_three(): yield 'a'; yield 'b'; return 'c', and expects list(first_three()) to be ['a', 'b', 'c']. What does it actually return, and why?",
    "It returns ['a', 'b']. return ends the generator; its value is attached to the StopIteration exception rather than yielded, and list() silently discards it when it catches StopIteration."
   ],
   [
    "A script defines ids = (n for n in range(1, 4)), prints sum(ids), and then prints max(ids). The first line shows 6 and the second raises ValueError. What happened, and what is the simplest fix?",
    "sum() consumed the generator expression, so max() received an exhausted iterator and an empty sequence. Store the values in a list first, such as ids = [n for n in range(1, 4)], or create a new generator for each use."
   ]
  ],
  "tip": "Calling a generator function runs none of its body until the first next(). After the last yield, next() raises StopIteration, which for loops absorb silently. Generators are one-shot, have no len(), and cannot be indexed.",
  "check": [
   [
    "def g(): yield 1; yield 2. What does list(g()) return, and what does a third next() on one generator do?",
    "[1, 2]; a third next() on the same generator raises StopIteration."
   ],
   [
    "How does (x for x in range(3)) differ from [x for x in range(3)]?",
    "The first is a lazy, one-shot generator; the second builds a complete list immediately."
   ],
   [
    "What does next(iter([]), 'none') return?",
    "'none', because next() returns the default instead of raising StopIteration when the iterator is empty."
   ]
  ]
 },
 {
  "t": "File I/O: open() modes (r, w, a, x, b, t, +), text versus binary",
  "hook": "Monday morning at Harborview Dental, Lena opens the patient reminder log to check last week's calls, and the file is empty. Not missing, empty. A script that was only supposed to add one line to the log opened it with `'w'` instead of `'a'`, and in that instant every earlier entry was wiped. Meanwhile, a second script that copies X-ray images keeps producing files that will not open, because it reads them in text mode. One letter in a mode string caused each problem. Before you touch a file in Python, how do you know whether `open()` will create it, preserve it, erase it, or refuse?",
  "simple": "When a Python program wants to use a file, it calls `open()` and passes a short code saying what it plans to do. `'r'` means read only, and the file must already exist. `'w'` means write, and it wipes the file clean first, so be careful. `'a'` means add to the end and keep what is there. `'x'` means create a brand-new file and refuse if one already exists. Adding `'b'` means treat the file as raw data, like a photo, instead of text. Adding `'+'` means you can both read and write. Think of a notebook: read it, tear out all pages and start over, add a page at the back, or buy a new notebook only if you do not already have one.",
  "body": [
   "To work with a file, you first open it with `open(filename, mode)`, which returns a stream object, often called a file handle, for reading and writing. The mode string says what you intend to do, and each mode has precise consequences for files that already exist, which the PCAP exam tests directly. A wrong mode can erase data instantly or raise an exception before you read a single byte, so it pays to learn these rules exactly.",
   "The four main mode letters are `r`, `w`, `a` and `x`. `'r'` opens for reading and is the default if you give no mode at all; the file must exist, otherwise FileNotFoundError is raised. `'w'` opens for writing; it creates the file if it does not exist and truncates it to zero length if it does, so all previous content is lost the moment the file is opened, even if you never write anything. `'a'` opens for appending; it creates the file if needed, keeps existing content, and every write goes to the end of the file regardless of the current position. `'x'` opens for exclusive creation; it creates a new file for writing but raises FileExistsError if the file already exists, which protects you from overwriting something by accident.",
   "A plus sign adds the other direction of access. `'r+'` opens an existing file for both reading and writing without truncating it, and it still fails with FileNotFoundError if the file is missing. `'w+'` creates or truncates, then allows reading and writing. `'a+'` allows reading as well as appending, and creates the file if needed. `'x+'` creates a new file for reading and writing and fails if it exists. The plus never changes whether the file is created or truncated; that is decided entirely by the letter it modifies. This is the single most useful rule for exam questions about `+` modes.",
   "The letters `'t'` and `'b'` choose text or binary mode and are combined with the others, as in `'rb'`, `'wt'` or `'r+b'`. Text mode (`'t'`) is the default, so `'r'` means the same as `'rt'`. In text mode, reading returns `str` objects. Python decodes the bytes on disk into characters using an encoding, which you can set explicitly with `encoding='utf-8'`; otherwise a platform-dependent default is used. Text mode also translates line endings: when reading, Windows `\\r\\n` and old-style `\\r` become `\\n`, and when writing, `\\n` becomes the platform's line ending. In binary mode (`'b'`), nothing is translated or decoded. Reading returns `bytes`, writing requires `bytes` or `bytearray`, and you get exactly what is stored on disk. Use binary mode for images, audio, archives and any other non-text data.",
   "```python\nwith open('notes.txt', 'w', encoding='utf-8') as f:\n    f.write('line 1\\n')\nwith open('notes.txt', 'a', encoding='utf-8') as f:\n    f.write('line 2\\n')\nwith open('notes.txt') as f:             # 'r' and 't' by default\n    print(f.read())                       # line 1, line 2\nwith open('notes.txt', 'rb') as f:\n    print(f.read())                       # raw bytes, e.g. b'line 1\\nline 2\\n'\n```",
   "Follow the example step by step. The first `open()` with `'w'` creates `notes.txt` or empties it, and writes one line. The second with `'a'` keeps that line and adds another at the end. The third uses the defaults, read and text, and returns a `str` containing both lines. The fourth reads the same file in binary and shows a `bytes` literal, marked by the `b` prefix. On Windows, the raw bytes would show `\\r\\n` line endings, because text mode translated `\\n` when writing; on Linux and macOS they show `\\n`. That difference is exactly the translation text mode performs.",
   "Mixing types across modes causes errors. Writing a `str` to a file opened with `'wb'` raises TypeError, and so does writing `bytes` to a file opened in text mode. Combining incompatible letters, such as `'rw'` or `'tb'`, raises ValueError because a mode may contain only one of `r`, `w`, `a` and `x`, and only one of `t` and `b`. Opening a directory, or a file you lack permission for, raises subclasses of OSError such as IsADirectoryError or PermissionError, which the errno lesson covers in detail.",
   "When predicting outcomes, ask three questions for any mode. Does the file have to exist already? Is existing content erased when the file is opened? Does reading or writing use `str` or `bytes`? For `'r'` and `'r+'` the file must exist and nothing is erased. For `'w'` and `'w+'` the file is created or erased. For `'a'` and `'a+'` the file is created if needed and preserved. For `'x'` and `'x+'` the file must not exist. Add `b` and everything is `bytes`; leave it out and everything is `str`. Those answers settle almost every `open()` question on the exam."
  ],
  "analogy": "Opening a file is like walking up to a whiteboard with a plan. `'r'` is reading it; if there is no whiteboard, you cannot. `'w'` is wiping it clean before writing, even if you then write nothing. `'a'` is adding a note at the bottom. `'x'` is hanging a new whiteboard, but only if the wall is empty. Binary mode is photographing the board pixel by pixel instead of reading the words. The analogy misses one detail: the plus sign never changes the wiping rule, only whether you may also read or write.",
  "terms": [
   [
    "'r' mode",
    "Read mode, the default: the file must exist, and content is preserved."
   ],
   [
    "'w' mode",
    "Write mode: creates the file or truncates an existing one to zero length on opening."
   ],
   [
    "'a' mode",
    "Append mode: creates the file if needed, preserves content, and writes always go to the end."
   ],
   [
    "'x' mode",
    "Exclusive creation: creates a new file and fails with FileExistsError if it exists."
   ],
   [
    "Text mode",
    "Mode ('t', the default) that decodes bytes to str using an encoding and translates line endings."
   ],
   [
    "Binary mode",
    "Mode ('b') that reads and writes raw bytes with no decoding or translation."
   ]
  ],
  "example": "A script that saves daily results opens its log with 'a' so each run adds a line, while a report generator opens its output with 'x' so it can never overwrite last month's report by mistake. An image thumbnail tool opens photos with 'rb', because the data is not text.",
  "mistakes": [
   [
    "'r+' and 'w+' are the same, since both allow reading and writing.",
    "'w+' truncates the file on opening, while 'r+' preserves content and requires the file to exist. The plus adds access; the letter decides creation and truncation."
   ],
   [
    "'w' only erases the file once you call write().",
    "Truncation happens the moment open() succeeds, even if nothing is ever written."
   ],
   [
    "Text mode is the safe choice for any file, including images.",
    "Text mode decodes and translates line endings, which corrupts binary data. Use 'rb' or 'wb' for non-text files."
   ],
   [
    "open('data.txt') with no mode opens the file for writing if it is missing.",
    "The default mode is 'rt', read text. A missing file raises FileNotFoundError."
   ]
  ],
  "tryit": [
   [
    "Your team's nightly script must create a fresh summary file named after today's date. If a file with that name already exists, someone has run the script twice, and the existing file must not be touched. Which mode should the script use, and what should it expect if the file exists?",
    "Use 'x' (or 'x' with an encoding argument for text). It creates the file only if it does not exist and raises FileExistsError otherwise, leaving the existing file untouched. 'w' would silently erase it, and 'a' would mix two runs' output in one file."
   ],
   [
    "A colleague opens a configuration file with 'w+' so that the script can read the current settings and then update one value. After the first run, all settings except the new one are gone. What went wrong, and which mode fits?",
    "'w+' truncated the file as soon as it opened, so there was nothing left to read. 'r+' opens an existing file for reading and writing without erasing it, which matches the intent."
   ]
  ],
  "tip": "'w' erases existing content the moment the file is opened, 'a' preserves it, 'x' fails if the file exists and 'r' fails if it does not. The plus sign never changes those rules. Text mode gives str, binary mode gives bytes.",
  "check": [
   [
    "Which mode opens an existing file for reading and writing without erasing it?",
    "'r+'; 'w+' would truncate it."
   ],
   [
    "What type does f.read() return for a file opened with 'rb'?",
    "bytes."
   ],
   [
    "What happens with open('data.txt', 'x') if data.txt already exists?",
    "FileExistsError is raised and the file is left untouched."
   ],
   [
    "What does f.write('hi') do on a file opened with 'wb'?",
    "It raises TypeError, because binary mode requires bytes, such as b'hi'."
   ]
  ]
 },
 {
  "t": "Stream handles and the predefined streams sys.stdin, sys.stdout, sys.stderr",
  "hook": "Elena maintains a data export tool for Silver Lake Water District. Each night it writes customer usage records as comma-separated values, and the billing team loads the file the next morning. Today billing reports that the file will not import: halfway down, between two rows of numbers, sits the line `Warning: meter 4471 reading missing`. The tool printed that warning with a plain `print()`, and because the nightly job redirects the tool's output into the file, the warning landed in the data. Elena wants warnings to show up for the operator and never contaminate the export. Python already gives every program a separate channel for that. Which one, and how do you use it?",
  "simple": "A stream is just a flow of data going into or out of a program, like water through a pipe. When you open a file, Python gives you a handle, an object you use to read from or write to that pipe. Every Python program also starts with three pipes already connected. Standard input brings in what the user types. Standard output carries normal results to the screen; `print()` uses it. Standard error carries warnings and error messages, also to the screen by default, but on a separate pipe. Picture a restaurant kitchen with one window for finished dishes and a separate phone line to the manager for problems. If dishes are sent to another room, the phone line still reaches the manager.",
  "body": [
   "Python, like most languages, treats input and output sources as streams: ordered sequences of data that you read from or write to in turn. A stream handle is the object your program holds in order to work with one stream. `open()` returns a stream handle, and all file operations, such as reading, writing and closing, are methods called on that handle. The handle also keeps track of the current position in the file, which moves forward as you read or write, so consecutive reads continue where the previous one left off.",
   "The exact class of the handle depends on the mode used to open it. Text-mode files give a text stream, which in CPython is an `io.TextIOWrapper`, and its methods work with `str`. Binary files give a buffered binary stream such as `io.BufferedReader` for reading or `io.BufferedWriter` for writing, and those methods work with `bytes`. You do not need to memorize these class names for PCAP, but you should know that text and binary handles are different kinds of object, which explains why their `read()` and `write()` methods accept and return different types.",
   "Three streams are opened automatically for every Python program, before any of your code runs, and they are available as attributes of the `sys` module after `import sys`. `sys.stdin` is standard input, which by default reads from the keyboard; the built-in `input()` reads a line from it. `sys.stdout` is standard output, which by default goes to the screen; `print()` writes to it unless told otherwise. `sys.stderr` is standard error, also shown on the screen by default but kept as a separate stream so that error messages and diagnostics are not mixed with normal output. When an exception goes unhandled, Python writes the traceback to `sys.stderr`, not to `sys.stdout`.",
   "```python\nimport sys\nsys.stdout.write('normal output\\n')\nprint('also normal output')\nprint('something went wrong', file=sys.stderr)\nline = sys.stdin.readline()   # like input(), but keeps the trailing newline\n```",
   "Each line in that example uses one of the predefined streams directly. `sys.stdout.write()` sends text to standard output exactly as given, which is why it includes `\\n` explicitly. `print()` with no `file` argument goes to the same place. `print(..., file=sys.stderr)` sends the message to standard error instead. `sys.stdin.readline()` reads one line from standard input, much as `input()` does, with two differences: `readline()` keeps the trailing newline in the returned string, while `input()` strips it, and `input()` can display a prompt.",
   "Keeping stdout and stderr separate matters as soon as output is redirected. If you run `python report.py > out.txt` in a terminal, only standard output goes into the file. Error messages still appear on the screen, so the person running the command sees them, and the file contains only the intended data. Shells can redirect the three streams independently, for example sending errors to their own file, and programs can be chained with pipes so that one program's stdout becomes the next program's stdin. A tool that writes results to stdout and diagnostics to stderr works cleanly in all of these setups.",
   "Because the predefined streams are ordinary text streams, they support the same methods as text file handles: `sys.stdout.write()`, `sys.stdin.read()`, `sys.stdin.readline()` and so on. Two details often appear in exam questions. First, `write()` does not add a newline, unlike `print()`, which ends with one by default. Second, `write()` returns the number of characters written, which is why typing `sys.stdout.write('hi\\n')` at the interactive prompt shows the text followed by the number 3. Neither detail affects a normal script, where return values that are not used are simply discarded.",
   "You should not close the predefined streams yourself; Python opened them and manages them, and closing `sys.stdout` would make later `print()` calls fail with ValueError. The `file=` argument of `print()` accepts any writable text stream, so the same print call can target the screen, standard error or an open file handle: `print('done', file=log)` writes to whatever file `log` refers to. This makes it easy to move messages between channels without rewriting them. The same idea works in reverse for input: any function written to read from a text stream handle can be given `sys.stdin` or an open file, because both offer `readline()` and iteration with `for line in stream:`. Treating the keyboard, the screen and files as interchangeable streams is the main reason the stream concept is worth learning, and it is why PCAP groups the predefined streams together with ordinary file handles."
  ],
  "analogy": "The three standard streams are like a restaurant's service setup. Orders come in through the order window, which is stdin. Finished dishes go out through the pass, which is stdout. Problems go to the manager on a separate phone, which is stderr. If the owner reroutes all dishes to a catering van, which is redirecting stdout to a file, the phone still rings in the manager's office, so problems are never packed with the food. The analogy is loose in one way: both outputs normally appear on the same screen, which is easy to forget.",
  "terms": [
   [
    "Stream",
    "An ordered flow of data that a program reads from or writes to."
   ],
   [
    "Stream handle",
    "The object returned by open(), or provided by sys, through which a stream is used."
   ],
   [
    "sys.stdin",
    "Standard input, read by input() and by default connected to the keyboard."
   ],
   [
    "sys.stdout",
    "Standard output, the default destination of print()."
   ],
   [
    "sys.stderr",
    "Standard error, a separate output stream for error messages, diagnostics and tracebacks."
   ]
  ],
  "example": "A command-line tool prints its CSV results to stdout and its progress messages to stderr. A user runs it with output redirected to results.csv and still sees progress on screen, while the file contains only clean data.",
  "mistakes": [
   [
    "You must open sys.stdout with open() before printing to it.",
    "sys.stdin, sys.stdout and sys.stderr are opened automatically before your program starts. Just import sys."
   ],
   [
    "sys.stdout.write('x') behaves exactly like print('x').",
    "write() adds no newline and returns the number of characters written; print() adds a newline by default and returns None."
   ],
   [
    "Redirecting a program's output to a file also captures its error messages.",
    "Redirecting stdout leaves stderr on the screen. That separation is the reason stderr exists."
   ],
   [
    "Tracebacks from unhandled exceptions are written to standard output.",
    "Python writes tracebacks to sys.stderr."
   ]
  ],
  "tryit": [
   [
    "Your inventory script prints a results table and also prints messages like 'skipping row 12: bad quantity'. Operations runs it as python inventory.py > table.txt and complains that the table file is full of skip messages. What single change to the skip messages fixes it without hiding them from the operator?",
    "Send the skip messages to standard error: print('skipping row 12: bad quantity', file=sys.stderr), after import sys. Redirecting stdout captures only the table, and the messages still appear on the operator's screen."
   ]
  ],
  "tip": "print() writes to sys.stdout by default and input() reads from sys.stdin; sys.stderr is separate so errors survive redirection of normal output. All three are open before your program starts. write() adds no newline and returns a count.",
  "check": [
   [
    "How do you make print() send a message to standard error?",
    "print('message', file=sys.stderr), after importing sys."
   ],
   [
    "Do you need to call open() before using sys.stdin?",
    "No. sys.stdin, sys.stdout and sys.stderr are opened automatically when the program starts."
   ],
   [
    "What does sys.stdout.write('ab') return?",
    "2, the number of characters written."
   ]
  ]
 },
 {
  "t": "Read(), readline(), readlines(), write(), readinto() with bytearray, close() and with",
  "hook": "Jamal is on call for Oakridge Pharmacy's prescription system when the overnight import stalls. The script reads a list of refill orders with a loop that stops when `readline()` returns an empty string, and the input file has a blank line between batches, so the job quit after the first batch. The night before, a different script crashed partway through writing a report, and the last hundred lines never made it to disk because the file was never closed. Both problems come down to knowing exactly what each file method returns and when data is really written. What does end of file look like in Python, and how do you make sure a file always gets closed?",
  "simple": "Once a file is open, you use a few simple commands on it. `read()` grabs everything that is left. `readline()` grabs one line at a time. `readlines()` grabs all the remaining lines as a list. `write()` puts text into the file, but it never adds a new line for you. When there is nothing left to read, these commands hand back an empty result rather than an error. Finally, `close()` finishes the job, making sure everything is saved. Think of reading a book with a bookmark: each read moves the bookmark forward. The `with` statement is like a library that always reshelves the book for you when you leave, even if you leave in a hurry.",
  "body": [
   "Once a file is open, its handle offers methods for moving data in and out. Every one of them works from the current position in the file and moves that position forward, so successive calls continue where the previous one stopped. Reading half a file with one call and the rest with another is normal, and it is also why a second `read()` after a full read returns nothing: the position is already at the end.",
   "Python offers three main reading methods. `read()` with no argument reads everything from the current position to the end and returns it as one string in text mode or one bytes object in binary mode. `read(n)` reads at most n characters in text mode, or n bytes in binary mode. At end of file, `read()` returns an empty string or empty bytes, which is how you detect that nothing is left. `readline()` reads one line including its trailing newline, `'\\n'`, and returns an empty string at end of file. A blank line in the middle of a file comes back as `'\\n'`, not as an empty string, so testing `if line == '':` correctly detects only the end. `readlines()` reads all remaining lines and returns them as a list of strings, each still ending with its newline, except possibly the last line if the file does not end with one. The handle itself is also iterable: `for line in f:` reads one line at a time, which is memory-efficient for large files.",
   "```python\nwith open('data.txt', 'w') as f:\n    n = f.write('alpha\\nbeta\\n')\n    print(n)                   # 11 characters written\n\nwith open('data.txt') as f:\n    print(repr(f.readline()))  # 'alpha\\n'\n    print(f.readlines())       # ['beta\\n']\n    print(repr(f.read()))      # '' - nothing left\n```",
   "Trace the example carefully. `write()` returns 11, because `'alpha\\nbeta\\n'` contains five letters, a newline, four letters and a newline. In the second block, `readline()` returns the first line with its newline. `readlines()` then reads only what remains, a one-item list, because the position has already moved past `alpha`. Finally `read()` returns the empty string, and `repr()` shows it as `''`. Questions that interleave these methods are really testing whether you track the position.",
   "Writing is simpler. `write(s)` writes a string in text mode or a bytes-like object in binary mode, and returns the number of characters or bytes written. It does not add a newline, so you must include `'\\n'` yourself wherever a line should end. `writelines(list_of_strings)` writes several strings in sequence, and despite its name it also adds no newlines between them. Writes may be held in a buffer in memory for efficiency, which means the data is not necessarily on disk the instant `write()` returns.",
   "`readinto(buffer)` is the method for reading binary files into memory you already own. Instead of creating a new bytes object, it fills an existing, mutable `bytearray` with data from the file and returns the number of bytes read. That number can be smaller than the buffer's size near the end of the file, and it is 0 at end of file. Reusing one buffer avoids allocating a new object on every pass through a loop over a large binary file. It does not work with immutable `bytes` objects, which cannot be modified, and it is not available for reading text-mode handles.",
   "```python\ndata = bytearray(10)          # 10 zero bytes\nwith open('image.bin', 'rb') as f:\n    count = f.readinto(data)\nprint(count, data[:count])\n```",
   "In that snippet, `bytearray(10)` creates ten zero bytes. If `image.bin` holds only four bytes, `count` is 4, the first four positions of `data` are overwritten, and the remaining six stay zero, which is why the code slices `data[:count]` to use only the valid part. In a copying loop, you would write `data[:count]` to the destination and stop when `readinto()` returns 0.",
   "`close()` finishes with a file. It flushes any buffered writes to disk and releases the operating system resource. Forgetting to close a file you wrote to can leave data unwritten if the program crashes, and using a handle after closing it raises ValueError, typically with the message `I/O operation on closed file`. The `with` statement solves both problems: `with open(...) as f:` closes the file automatically when the block ends, whether it ends normally or because an exception was raised inside it. It is equivalent to a try/finally that calls `f.close()` in the finally clause, which is why every example here uses it. You can check a handle's state with its `f.closed` attribute, which is True after the block ends."
  ],
  "analogy": "A file handle is like reading a book with a bookmark. `read()` reads to the end, `readline()` reads one line, and every call moves the bookmark forward, so a second full read finds only the back cover, an empty result. The `with` statement is like a library desk that always reshelves the book when you walk away, even if you leave because the fire alarm rang. The analogy stops at writing: unlike ink on a page, buffered writes may not reach the disk until the file is flushed or closed.",
  "terms": [
   [
    "read()",
    "Reads the rest of the file, or at most n characters or bytes with an argument; returns an empty result at end of file."
   ],
   [
    "readline()",
    "Reads one line including its newline; returns an empty string at end of file."
   ],
   [
    "readlines()",
    "Returns a list of all remaining lines, each keeping its newline."
   ],
   [
    "readinto()",
    "Fills an existing bytearray from a binary file and returns the number of bytes read, 0 at end of file."
   ],
   [
    "with statement",
    "A context manager block that closes the file automatically when it ends, even after an exception."
   ]
  ],
  "example": "A backup tool copies large binary files by allocating one bytearray of 64 KB and repeatedly calling readinto() on the source, writing data[:count] to the destination until readinto() returns 0.",
  "mistakes": [
   [
    "readline() returns an empty string for a blank line in the middle of a file.",
    "A blank line comes back as '\\n'. Only end of file returns ''."
   ],
   [
    "Reading past the end of a file raises an exception.",
    "End of file is signaled by an empty result, '' or b'', or 0 from readinto(), not by an exception."
   ],
   [
    "write() and writelines() add a newline after each string, like print().",
    "Neither adds newlines. Include '\\n' in the strings yourself."
   ],
   [
    "readinto() works with a bytes object or a text-mode file.",
    "It needs a mutable bytearray (or similar writable buffer) and a binary-mode file."
   ]
  ],
  "tryit": [
   [
    "A teammate's script processes orders with while True: line = f.readline(); if not line.strip(): break. It stops at the first blank line in the file instead of at the end. Explain why, and give a condition that stops only at end of file.",
    "A blank line is '\\n', and '\\n'.strip() is '', so the test treats a blank line as the end. Test the raw value instead: if line == '': break, or more simply loop with for line in f:, which stops only at end of file."
   ],
   [
    "You need to copy a 2 GB video file in a memory-friendly way. A colleague proposes data = src.read() followed by dst.write(data). What would you change, and why?",
    "read() with no argument loads the whole file into memory at once. Open both files in binary mode and loop with a fixed bytearray buffer and readinto(), writing buf[:count] until it returns 0, or use read(n) with a fixed n. Memory use stays at the buffer size."
   ]
  ],
  "tip": "End of file is signaled by an empty result ('' or b''), not an exception; a blank line is '\\n'. write() never adds newlines and returns a count. readinto() needs a bytearray and a binary-mode file. Use with so files always close.",
  "check": [
   [
    "What does readline() return for an empty line in the middle of a file?",
    "'\\n', a string containing just the newline; only end of file returns ''."
   ],
   [
    "Why is with open(...) as f: preferred over calling close() manually?",
    "It guarantees the file is closed when the block exits, even if an exception is raised."
   ],
   [
    "A file holds 'a\\nb\\n'. After f.read(1), what does f.readline() return?",
    "'\\n', the rest of the first line, because read(1) already consumed 'a'."
   ]
  ]
 },
 {
  "t": "Errno values (for example ENOENT, EACCES) on I/O errors",
  "hook": "Brianna supports the document upload tool at Fairhaven Legal Aid. A volunteer calls: the tool just showed a wall of red text ending in `[Errno 13] Permission denied`, and she has no idea whether the file is missing, locked, or something worse. Later the same day, another volunteer types a folder name by mistake and gets a different traceback, `[Errno 21] Is a directory`. Both failures are normal, expected events for any program that opens files people choose, yet the tool treats them like crashes. Python hands your code a precise error code each time an operating system call fails. How do you read it, and how do you turn it into a clear, safe message?",
  "simple": "When a program asks the computer to open or save a file and the computer cannot do it, the computer gives back a short error code explaining why: the file is not there, you are not allowed, the disk is full, and so on. Python wraps that code in an exception called OSError and stores the code in a field named `errno`. Instead of remembering raw numbers, you compare it against friendly names from the `errno` module, like `ENOENT` for \"no such file\" and `EACCES` for \"permission denied.\" It is like a delivery driver returning a package with a checkbox marked: \"no one home,\" \"wrong address,\" or \"refused.\" Reading the checkbox tells you what to do next.",
  "body": [
   "Input and output can fail for many reasons outside your program's control: the file does not exist, you lack permission, the path points to a directory, the disk is full. When an operating system call fails, Python raises `OSError` or one of its subclasses, and the exception carries the operating system's error code in its `errno` attribute. Checking that code lets your program respond precisely to what went wrong instead of treating every failure the same way.",
   "The codes are integers, but their numeric values can differ between operating systems, so you should never compare against raw numbers like 2 or 13. Instead, the `errno` module provides named constants that always hold the correct value for the system your program is running on. The ones PCAP expects you to recognize include `errno.ENOENT` (no such file or directory), `errno.EACCES` (permission denied), `errno.EEXIST` (file exists), `errno.EISDIR` (is a directory), `errno.EBADF` (bad file descriptor, for example using an invalid or already closed low-level handle), `errno.EMFILE` (too many open files), `errno.ENOSPC` (no space left on device) and `errno.EFBIG` (file too large). The names are abbreviations of their meanings: ENOENT reads as \"error, no entry\", and EACCES as \"error, access\".",
   "```python\nimport errno\n\ntry:\n    with open('missing.txt') as f:\n        data = f.read()\nexcept OSError as e:\n    if e.errno == errno.ENOENT:\n        print('The file does not exist')\n    elif e.errno == errno.EACCES:\n        print('You do not have permission to read it')\n    else:\n        print('Other I/O error:', e.strerror)\n```",
   "The structure of that handler is the pattern to remember. The `try` block attempts the operation. The single `except OSError as e:` clause catches every operating system failure and binds the exception object to `e`. The `if` and `elif` branches compare `e.errno` with named constants, and a final `else` handles anything unexpected using the readable message. Because `FileNotFoundError` and `PermissionError` are subclasses of `OSError`, they are caught by this clause too, and their `errno` values are still set correctly.",
   "Besides `errno`, an OSError instance provides `strerror`, the human-readable message for the code, and often `filename`, the path involved. To turn any code into its message yourself, call `os.strerror(code)`; for example, `os.strerror(errno.ENOENT)` returns `'No such file or directory'`. Printing the exception object shows all of this together, typically in the form `[Errno 2] No such file or directory: 'missing.txt'`. The number shown there is what your current operating system uses, which is one more reason to compare with constants rather than with the digits you happen to see.",
   "Modern Python also maps common codes to specific subclasses of OSError, which you can catch directly. `FileNotFoundError` corresponds to ENOENT. `PermissionError` corresponds to EACCES and also EPERM (operation not permitted). `FileExistsError` corresponds to EEXIST, and `IsADirectoryError` to EISDIR. So `except FileNotFoundError:` is a readable alternative to checking `e.errno == errno.ENOENT`. Both styles appear in exam questions, and both are correct. The errno check is useful when you want one handler for several codes, or when a code, such as ENOSPC or EMFILE, has no dedicated subclass. If you list several except clauses, put the specific subclasses before `except OSError`, because Python uses the first matching clause.",
   "From a defensive point of view, these errors are expected events, not rare disasters. A file a user selected a moment ago may have been moved, a network share may deny access, and a disk may fill up during a long write. A robust program checks for these conditions where files are opened and gives the user a clear message instead of a traceback. It should also avoid leaking sensitive details, such as full internal paths or account names, in messages shown to untrusted users, while still logging enough detail, including the errno value and filename, for an administrator to diagnose the problem. Handling ENOENT and EACCES explicitly is the typical minimum for any program that opens files named by a user.",
   "When an exam question shows an errno check, read it in three steps. First, identify which operation can fail and which exception class will be raised. Second, match the situation to a constant: missing file is ENOENT, permission is EACCES, existing file with `'x'` mode is EEXIST, directory instead of file is EISDIR. Third, follow the `if` and `elif` chain to see which message prints. Remember that FileExistsError from `open(name, 'x')` is caught by `except OSError` and has `errno` equal to `errno.EEXIST`."
  ],
  "analogy": "Errno codes are like the checkboxes on a returned-package slip: \"no such address\", \"recipient refused\", \"no room in mailbox\". The driver always hands back the same kind of slip, an OSError, but the checked box tells you exactly what to fix. Using the errno constants is like reading the printed labels beside the boxes instead of counting which box is third from the top, since different delivery companies arrange their boxes differently, just as operating systems number their codes differently.",
  "terms": [
   [
    "errno attribute",
    "The operating system error code stored on an OSError instance."
   ],
   [
    "errno module",
    "Standard module defining named constants such as ENOENT and EACCES for error codes."
   ],
   [
    "ENOENT",
    "Error code meaning no such file or directory; matches FileNotFoundError."
   ],
   [
    "EACCES",
    "Error code meaning permission denied; matches PermissionError."
   ],
   [
    "strerror",
    "OSError attribute holding the readable message for the code; os.strerror(code) returns the same kind of text."
   ]
  ],
  "example": "A photo importer loops over user-selected files. When a file has been deleted it catches OSError with errno ENOENT and skips it with a note, and when a file is locked by permissions (EACCES) it tells the user which one needs its permissions fixed, while logging the full details for support staff.",
  "mistakes": [
   [
    "Comparing e.errno == 2 is fine because ENOENT is always 2.",
    "Numeric values can differ across operating systems. Always compare with errno.ENOENT and the other named constants."
   ],
   [
    "FileNotFoundError is not an OSError, so except OSError will not catch it.",
    "FileNotFoundError, PermissionError, FileExistsError and IsADirectoryError are all subclasses of OSError, so except OSError catches them."
   ],
   [
    "Every errno code has its own exception subclass, so errno checks are never needed.",
    "Only common codes have subclasses. Codes such as ENOSPC and EMFILE are handled by checking e.errno."
   ],
   [
    "Showing the full exception text, including internal paths, to every user is the most helpful approach.",
    "Give users a clear, short message and log the technical details for administrators, so sensitive paths are not exposed to untrusted users."
   ]
  ],
  "tryit": [
   [
    "Your team's export tool writes reports to a shared drive. Users see one of three problems: the destination folder was deleted, they lack write permission, or the drive is full. You must show a tailored message for each and a generic message for anything else. How would you structure the except logic?",
    "Catch OSError as e and branch on e.errno: errno.ENOENT for the missing folder, errno.EACCES for permission, errno.ENOSPC for the full drive, and an else branch using e.strerror for anything else. A single OSError handler with errno checks covers ENOSPC, which has no dedicated subclass."
   ],
   [
    "A script has except OSError: print('I/O problem') followed by except FileNotFoundError: print('missing'). A user opens a file that does not exist. Which message appears, and how would you fix the order?",
    "'I/O problem', because Python uses the first matching except clause and FileNotFoundError is a subclass of OSError. Put except FileNotFoundError first and except OSError after it."
   ]
  ],
  "tip": "Compare e.errno with errno module constants, never with raw numbers. ENOENT pairs with FileNotFoundError, EACCES with PermissionError and EEXIST with FileExistsError, all subclasses of OSError. Use strerror or os.strerror() for readable messages.",
  "check": [
   [
    "Which errno constant indicates that a file you tried to open does not exist?",
    "errno.ENOENT."
   ],
   [
    "How can you get a readable message for an error code?",
    "Use the exception's strerror attribute, or call os.strerror(code)."
   ],
   [
    "open('report.txt', 'x') fails because the file exists. Which errno constant does e.errno equal?",
    "errno.EEXIST, and the exception raised is FileExistsError, a subclass of OSError."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
