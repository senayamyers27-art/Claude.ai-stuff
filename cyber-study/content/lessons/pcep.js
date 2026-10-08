/* Lessons for PCEP – Certified Entry-Level Python Programmer (PCEP-30-02): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("pcep", [
 {
  "t": "Fundamental terms: interpreting vs compiling, lexis, syntax and semantics, source code and the Python interpreter",
  "hook": "It is your first week as a junior developer at Lantern Books, a small online bookshop. Priya, the team lead, forwards you a ticket: the nightly stock report script \"did nothing at all\" last night, not even the first line that announces it has started. A colleague insists Python must have crashed halfway through the run. You open the file and spot a missing closing bracket on the very last line. Could one typo at the bottom of a file really stop the first line from ever running, and how would you explain that to your colleague without sounding like you are guessing?",
  "simple": "Computers only understand very low-level instructions made of ones and zeros. People write programs in friendlier languages like Python, so something has to translate. A compiler translates the whole program once, ahead of time, like translating an entire book before anyone reads it. An interpreter translates while the program runs, like a live interpreter at a meeting. Python works the second way. Every language also has rules: the allowed words (lexis), the grammar for putting words together (syntax), and whether the result makes sense (semantics). \"Dog the barked\" uses real words but bad grammar. \"The sofa barked\" has fine grammar but makes no sense. Python checks the grammar of the whole file before running anything, but only discovers nonsense when it reaches that line.",
  "body": [
   "A computer's processor only understands machine code: long sequences of binary instructions specific to that processor. People do not write that directly. Instead you write source code in a high-level programming language such as Python, and a program translates it into something the machine can execute. The PCEP (Certified Entry-Level Python Programmer) exam expects you to know the vocabulary for how that translation happens and for the rules any language imposes, because these words appear in questions long before you write a line of code.",
   "There are two classic translation strategies. Compilation translates the whole program ahead of time into a separate executable file of machine code, which can then be run many times without the compiler. Interpretation reads the source code and executes it statement by statement each time the program runs, so the interpreter must always be present. Compiled programs tend to run faster and can be shipped without their source; interpreted programs are quicker to test and easier to move between platforms, because the same source runs anywhere an interpreter exists. Python is treated as an interpreted language: you run `python3 script.py` and the interpreter executes it. Internally, CPython first converts source into bytecode for its own virtual machine, but for the exam, Python is interpreted. The practical consequence is that a compiled program is tied to one kind of processor and operating system, while a Python script can be copied to Windows, macOS or Linux and run unchanged as long as an interpreter is installed there. The price is that every user needs that interpreter, and every run pays a small translation cost.",
   "Every language, human or computer, has layers of rules. An alphabet is the set of symbols you may use. Lexis is the vocabulary: the set of valid words and symbols, such as keywords, operators, names and literals. Syntax is the grammar: the rules for how those words may be combined into valid statements. Semantics is meaning: whether a statement that is well formed actually makes sense. For example, `print(\"hi\"` is a syntax error because a parenthesis is missing, while `print(10 / 0)` is grammatically fine but fails when run because dividing by zero has no meaning. Think of the layers as a ladder: the text may use only legal symbols, those symbols must form legal words, the words must be arranged by the grammar, and only then can anyone ask whether the result means something. A problem on a lower rung stops you before the higher rungs are even checked.",
   "The interpreter finds problems at different times, and the exam tests the difference. Before running anything, Python reads (parses) the whole file; a syntax error anywhere stops the program before even the first line executes, and the message shows the line with a caret under the problem. Run-time errors, called exceptions, appear only when the faulty line is actually reached, so earlier lines may already have produced output. Logic errors are the hardest: the program runs without complaint but gives the wrong answer, and no tool will flag them for you. You can tell the two apart from the screen. A syntax error message names the file and line, repeats the offending line with a caret, and ends with a line such as `SyntaxError: invalid syntax` (newer versions often print a more specific explanation). A run-time error prints a traceback that begins `Traceback (most recent call last):` and ends with the exception name and a message, for example `ZeroDivisionError: division by zero`.",
   "CPython is the reference implementation of Python, written in the C language, and it is what you download from the official Python site. You can use it in two modes. Interactive mode, also called the REPL (read-eval-print loop), shows the `>>>` prompt and evaluates each line immediately, which is ideal for experiments. Script mode runs a saved `.py` file from start to finish. Source files are plain text, so any editor works, and IDLE (Integrated Development and Learning Environment), which ships with Python, gives you both an editor and a shell. In the REPL you do not even need `print()` to see a value: typing `2 + 3` at the `>>>` prompt echoes 5, which makes it a handy place to test an idea. A script, by contrast, shows nothing unless you print it.",
   "```python\n# save as demo.py and run: python3 demo.py\nprint(\"start\")        # runs first\nprint(len(\"abc\"))     # 3\nprint(10 / 0)         # ZeroDivisionError here, at run time\nprint(\"never shown\")\n```",
   "Consider a worked example. You save a file with three `print()` calls, but the third is missing its closing parenthesis. When you run it, nothing is printed at all: the interpreter reports a `SyntaxError` before executing anything, because parsing the whole file comes first. You fix the bracket, but now the second line is `print(1 / 0)`. This time the first line prints, then a `ZeroDivisionError` stops the program, so the third line never runs. Finally you fix that, but you wrote `area = width + height` where you meant multiplication; everything runs and prints a number, yet it is wrong. That is a logic error.",
   "Common mistakes: thinking Python is compiled because it creates `.pyc` bytecode files; assuming a syntax error on line 10 lets lines 1 to 9 run first (it does not); and confusing lexis with syntax. A misspelled name such as `prnt` is lexically valid (it is a legal name), parses fine, and only fails at run time with `NameError`. Exam questions use clue words: \"translated once into an executable\" means compiler; \"executed line by line each time\" means interpreter; \"vocabulary\" means lexis; \"grammar\" or \"structure\" means syntax; \"meaning\" means semantics; \"found before execution\" means a syntax error."
  ],
  "analogy": "Think of a play rehearsal. Before anyone acts, the director reads the whole script for missing pages and garbled lines; if a page is unreadable, rehearsal never starts. That is parsing and the syntax error. Once rehearsal begins, an actor may reach a scene that asks for something impossible, such as walking through a wall, and rehearsal stops right there, after the earlier scenes were already performed. That is a run-time error. The comparison stops working in one way: a real director might skip a bad page, but Python never skips a syntax error.",
  "mnemonic": "Climb the ladder in order: Lexis, Syntax, Semantics means Words, Grammar, Meaning. Ask \"Is it a legal word? Is it put together correctly? Does it make sense?\" in that order.",
  "terms": [
   [
    "Source code",
    "The human-readable program text you write, stored for Python in a plain-text .py file."
   ],
   [
    "Compiler",
    "A program that translates the whole source code into machine code ahead of time, producing a separate executable."
   ],
   [
    "Interpreter",
    "A program that reads and executes source code each time it runs; CPython is Python's reference interpreter."
   ],
   [
    "Lexis",
    "The vocabulary of a language: the valid words and symbols it recognizes."
   ],
   [
    "Syntax",
    "The grammar rules for combining lexical elements into valid statements."
   ],
   [
    "Semantics",
    "The rules that decide whether a well-formed statement makes sense and what it means."
   ],
   [
    "REPL",
    "The interactive read-eval-print loop, shown by the >>> prompt, that runs each line as you type it."
   ]
  ],
  "example": "You save a file with three print() calls, but the third is missing its closing parenthesis. When you run it, nothing is printed at all: the interpreter reports a SyntaxError before executing anything. Fix that, but make the second line print(1 / 0), and now the first line prints, then a ZeroDivisionError stops the program before the third line.",
  "mistakes": [
   [
    "Python is a compiled language because it creates .pyc files.",
    "CPython does turn source into bytecode internally, but that bytecode still runs on Python's own virtual machine and needs the interpreter. For the PCEP exam, Python is an interpreted language."
   ],
   [
    "A syntax error on line 10 lets lines 1 to 9 run first.",
    "Python parses the whole file before executing anything, so a syntax error anywhere means no line runs at all."
   ],
   [
    "Misspelling print as prnt is a syntax error.",
    "prnt is a legal name and the line parses fine. It fails only at run time, with NameError, when that line is reached."
   ],
   [
    "A program that runs without any error message is correct.",
    "Logic errors produce wrong results silently. Only comparing the output with what you expected reveals them."
   ]
  ],
  "tryit": [
   [
    "Your script has five lines. Line 2 prints a greeting, line 4 divides a total by a count that turns out to be 0, and line 5 is missing a closing quote. When you run it, what appears on screen, and what happens after you fix only line 5?",
    "On the first run nothing is printed except a SyntaxError for line 5, because Python parses the whole file before running anything. After fixing line 5, the greeting from line 2 prints, then line 4 raises ZeroDivisionError and the program stops, because run-time errors appear only when the faulty line is reached."
   ]
  ],
  "tip": "Exam questions often ask which kind of error a snippet produces. Missing brackets, bad indentation or misplaced keywords are syntax errors found before anything runs; valid code that does something impossible is a run-time error found only when that line is reached.",
  "check": [
   [
    "What is the key practical difference between compiling and interpreting?",
    "A compiler translates the whole program once into an executable that runs without the compiler; an interpreter translates and runs the source every time, so the interpreter must be present."
   ],
   [
    "Is print(\"a\" + 5) a syntax error or a run-time error?",
    "A run-time error (TypeError). The line is grammatically valid, but adding a string and an integer has no meaning, so it fails only when executed."
   ],
   [
    "Which is violated by writing prnt instead of print: lexis, syntax or semantics?",
    "Not lexis or syntax: prnt is a valid name and the line parses. It fails at run time with NameError because the name is not defined, which is a semantic problem."
   ],
   [
    "A file has a syntax error on its last line. How many earlier lines run?",
    "None. Python parses the whole file before executing it, so the SyntaxError is reported before any line runs."
   ]
  ]
 },
 {
  "t": "Python logic and structure: keywords, instructions, indentation and comments",
  "hook": "You are pairing with Leo on the help desk team at Fernhill Community College. He has pasted a short script that should print one reminder for each student on a list and then a single summary line. Instead, the summary prints after every reminder, as if the loop swallowed it. The words in the file look perfect. You lean closer and notice the summary line starts four spaces in from the margin. Leo shrugs: \"Spaces cannot change what a program does, can they?\" In most languages he would be right. In Python, is he?",
  "simple": "A Python program is a list of instructions read from top to bottom, usually one instruction per line. Some words, like if, for and while, are reserved: Python already uses them, so you cannot use them as names for your own things. Python also uses the spaces at the start of a line to show which lines belong together. Think of a recipe: \"If the oven is hot:\" followed by indented steps means those steps happen only when the oven is hot, while a line back at the left edge happens no matter what. Comments start with a # sign and are notes for people; Python skips them completely.",
  "body": [
   "A Python program is a sequence of instructions (statements) that the interpreter executes from top to bottom. Normally each statement sits on its own line, and the end of the line ends the statement; there is no semicolon at the end as in some other languages. You can put several short statements on one line separated by semicolons, and you can continue a long statement across lines inside parentheses, brackets or braces, or with a backslash at the end of a line, but the plain one-statement-per-line style is what you should write and what the exam usually shows. For example, a long sum written inside parentheses may continue onto the next line, because Python keeps reading until the bracket closes. Remember too that statements run strictly in order: a line cannot use a name that is only assigned further down the file.",
   "Keywords are reserved words with a fixed meaning in the language, such as `if`, `else`, `elif`, `while`, `for`, `in`, `def`, `return`, `pass`, `break`, `continue`, `import`, `global`, `try`, `except`, `and`, `or`, `not`, `is`, `None`, `True` and `False`. You cannot use a keyword as a variable or function name: `for = 3` is a syntax error. Keywords are case sensitive: `True` is a keyword but `true` is an ordinary, and usually undefined, name. You can see the full list with `import keyword` followed by `print(keyword.kwlist)`. Each keyword has one job you will meet in later lessons: `if`, `elif` and `else` choose between paths, `while` and `for` repeat, `def` and `return` build functions, and `try` and `except` handle errors. Syntax highlighting in IDLE and most editors shows keywords in a distinct color, which is a quick visual check that you have not accidentally used one as a name.",
   "Indentation is part of Python's syntax, not just style. A compound statement such as `if`, `while`, `for`, `def` or `try` ends its header line with a colon, and the lines that belong to it (its block, also called a suite) must be indented more than the header. The block ends when indentation returns to the earlier level. All lines in one block must use exactly the same indentation. PEP 8 (Python Enhancement Proposal 8, the official style guide) recommends four spaces per level. Mixing tabs and spaces inconsistently leads to `TabError`, and a wrong level leads to `IndentationError`; both are kinds of `SyntaxError`. Indentation replaces the curly braces that languages such as C or Java use to mark blocks, so in Python the visual layout and the program structure can never disagree. Blocks can nest: a `for` inside an `if` gets a second level of indentation, eight spaces in PEP 8 style, and each level closes when the code moves back out toward the left margin.",
   "```python\nx = 7\nif x > 5:\n    print(\"big\")      # inside the if block\n    print(\"still in\") # same block, same indent\nprint(\"always runs\")  # back at the outer level\n# output: big / still in / always runs\n```",
   "Comments start with `#` and run to the end of the line. The interpreter ignores them entirely, so they are for human readers: explain why the code does something, not what each obvious line does. A `#` inside a string literal is just a character, not a comment. Python has no special multi-line comment syntax; you put `#` on each line or, by convention, use a triple-quoted string, which is really a string literal that is evaluated and discarded. When a triple-quoted string is the first statement in a function or module it becomes its docstring, a piece of built-in documentation. Good comments explain intent, such as `# retry once because the sensor sometimes misses a reading`, while comments that merely restate the code, such as `# add 1 to x`, add clutter. Putting `#` in front of a line is also a quick way to switch it off during testing, a habit called commenting out.",
   "Consider a worked example. A learner writes a loop that should print a running total. The header `for n in range(3):` is followed by two lines, the first indented four spaces and the second three. Python refuses to run the file and reports `IndentationError: unindent does not match any outer indentation level`. After fixing that, the learner moves `print(total)` back to the left margin; now it runs once after the loop instead of three times inside it. Both versions contain identical words, yet indentation alone changes whether the program runs and what it prints.",
   "Common mistakes: forgetting the colon at the end of a header, which is a `SyntaxError`; indenting a line that has no header above it, which gives `IndentationError: unexpected indent`; ending a header with a colon and indenting nothing below it, which gives `IndentationError: expected an indented block` (the reason the `pass` keyword exists); writing `true` or `none` in lower case; and believing that a comment can serve as a block body. It cannot, because comments are discarded before the grammar is checked.",
   "Exam questions in this area usually show a short snippet and ask whether it runs, what it prints, or which error appears. Clue words: \"reserved word\" or \"cannot be used as a name\" means keyword; \"belongs to the block\" means indentation level; \"ignored by the interpreter\" means comment; \"unexpected indent\" and \"expected an indented block\" name the two classic indentation errors. When a line's indentation is the only difference between answer choices, trace the columns carefully, because that is exactly what is being tested."
  ],
  "analogy": "Indentation works like the outline of a school report. Sub-points indented under a heading belong to that heading, and when you return to the left margin you start a new heading. Python reads code the same way: the indented lines under a header that ends with a colon belong to it, and the first line back at the outer level is outside it. The comparison stops at strictness: a teacher might forgive one sub-point indented by three spaces instead of four, but Python demands that every line in a block line up exactly.",
  "terms": [
   [
    "Statement (instruction)",
    "A single command the interpreter executes, normally one per line."
   ],
   [
    "Keyword",
    "A reserved word with fixed meaning, such as if, for or def, that cannot be used as an identifier."
   ],
   [
    "Block (suite)",
    "The group of indented statements belonging to a header line that ends with a colon."
   ],
   [
    "Comment",
    "Text after # to the end of the line, ignored by the interpreter."
   ],
   [
    "IndentationError",
    "The SyntaxError subclass raised when indentation is missing, unexpected or inconsistent."
   ],
   [
    "Docstring",
    "A string literal placed first in a module or function, kept as its documentation."
   ]
  ],
  "example": "A learner writes a loop whose second body line is indented with three spaces instead of four. Python reports an IndentationError (unindent does not match any outer indentation level) before running anything. Re-indenting both lines to four spaces makes the program run, and moving the final print back to the margin makes it run once after the loop instead of on every pass.",
  "mistakes": [
   [
    "Indentation is only style, as in most other languages.",
    "In Python indentation is syntax. It decides which statements belong to a block, and wrong or inconsistent indentation raises IndentationError before the program runs."
   ],
   [
    "true and none work because Python is forgiving about case.",
    "Python is case sensitive. Only True, False and None are keywords; true is an ordinary name that raises NameError if it was never assigned."
   ],
   [
    "A comment can serve as an empty block body.",
    "Comments are discarded before the grammar is checked, so a header followed only by a comment raises IndentationError: expected an indented block. Use pass instead."
   ],
   [
    "A # always starts a comment.",
    "Inside a string literal, # is an ordinary character, so print(\"a # b\") prints a # b."
   ]
  ],
  "tryit": [
   [
    "A teammate writes a function stub to fill in later: a def line ending in a colon, followed by a single line containing only # TODO, indented four spaces. The file refuses to run. What is wrong, and what is the smallest fix?",
    "The comment is ignored, so the def header has no block at all, which raises IndentationError: expected an indented block. Adding an indented pass statement gives the header a real body that does nothing; the comment can stay."
   ]
  ],
  "tip": "True, False and None are capitalized keywords; lowercase true is just an undefined name. A # inside quotes is not a comment, and a comment alone can never be a block body.",
  "check": [
   [
    "What happens if you write if x > 3: and the next line is not indented?",
    "Python raises IndentationError: expected an indented block, because a compound statement header must be followed by an indented block."
   ],
   [
    "Can you name a variable pass?",
    "No. pass is a keyword, so pass = 1 is a SyntaxError."
   ],
   [
    "What does print(\"a # b\") output?",
    "a # b. The # is part of the string literal, not the start of a comment."
   ],
   [
    "How many spaces per indentation level does PEP 8 recommend, and is it enforced?",
    "Four spaces. The interpreter only requires consistency within a block; four spaces is the style convention."
   ]
  ]
 },
 {
  "t": "Literals: Boolean, integer, float, scientific notation and string literals",
  "hook": "You are on the analytics team at Cedar Valley Water. Dana from billing sends a puzzled message: the monthly usage report says one customer used 2020 units, but the meter clearly reads 40. You open the script and find a line someone added while testing, `usage = \"20\" * 2`. Nobody typed a wrong digit; the 20 is right and so is the 2. So why did doubling twenty produce a four-digit number, and how could you have spotted the problem just by looking at how the value was written?",
  "simple": "A literal is a value you type straight into your code, like 42, 3.5, \"hello\" or True. Python decides what kind of value it is from the way you write it. Whole numbers with no decimal point are integers. Numbers with a decimal point, or with an e meaning \"times ten to the power of\", are floats. Anything inside quotes is text, called a string, even if it looks like a number. True and False, with capital first letters, are Boolean values meaning yes and no. The kind of value changes what happens: 2 times 2 is 4, but \"2\" times 2 is \"22\", like writing the same character twice on a sticky note.",
  "body": [
   "A literal is a value written directly in your code, such as `42`, `3.5`, `\"cat\"` or `True`. The way you write it decides its type, which you can check with the built-in `type()` function. PCEP tests whether you can recognize each kind of literal on sight and predict its type, because type decides what operators do with the value. Literals are different from variables: `x` is a name that refers to a value, while `42` is the value itself. Knowing the type also tells you which operations are legal at all: you can divide one number by another, but dividing a string by a number is an error, so a quick glance at how a value is written prevents many bugs before they happen.",
   "Integer literals (type `int`) are whole numbers with no decimal point: `0`, `17`, `-4`. Strictly, `-4` is the literal `4` with a unary minus applied, but the result is the same. Python integers have no fixed size limit; they grow as large as memory allows, so `2 ** 100` is exact. You may use single underscores between digits for readability, so `1_000_000` is the same as `1000000`. You may not write leading zeros on a non-zero decimal integer: `007` is a syntax error, because a leading zero is reserved for prefixes like `0o`. Integer literals can also be written in other bases with prefixes such as `0x` for hexadecimal, a topic with its own lesson; whatever the spelling, the type is still `int`.",
   "Float literals (type `float`) contain a decimal point or an exponent: `3.14`, `2.0`, `.5` (which is 0.5) and `4.` (which is 4.0). The point matters: `4` is an int and `4.0` is a float, even though they compare equal. Scientific notation uses `e` or `E` to mean \"times ten to the power of\": `3e8` is 300000000.0 and `1.5E-3` is 0.0015. A literal written with an exponent is always a float, even if the value is whole, so `type(3e8)` is `float`. Python also prints very large or very small floats in this notation: `print(0.00001)` shows `1e-05` and `print(1e16)` shows `1e+16`. Floats are stored in binary with limited precision, so they are approximations, which is why a separate lesson covers float accuracy. For now, the key skill is spotting that a value is a float in the first place.",
   "String literals (type `str`) are text in single or double quotes: `'hello'` and `\"hello\"` are identical. Using one kind of quote lets you include the other inside, as in `\"It's\"`, or you can escape a quote with a backslash, as in `'It\\'s'`. Escape sequences such as `\\n` (newline) and `\\t` (tab) put special characters into a string. Triple quotes (`'''...'''` or `\"\"\"...\"\"\"`) allow text to span several lines. An empty string is `''`. Digits in quotes are text, not numbers: `\"12\"` is a string, and `\"12\" + \"3\"` gives `\"123\"`. The quotes are not part of the value: `len(\"cat\")` is 3, and `print(\"cat\")` shows cat without quotes, while the REPL echoes `'cat'` with quotes to remind you it is a string.",
   "Boolean literals are `True` and `False` (type `bool`). They must be capitalized. `bool` is a subclass of `int`, so `True` behaves as 1 and `False` as 0 in arithmetic: `True + True` is 2. Finally, `None` is a special literal of type `NoneType` meaning \"no value\"; it is what a function returns when it has no `return` statement. Note that `None` is not the same as `0`, `False` or the empty string `\"\"`: each has its own type, even though all of them count as false in a condition. `type(None)` shows `<class 'NoneType'>`, and there is exactly one `None` object in a running program. These values come up again whenever you write a condition, which is why later lessons on truthiness return to them.",
   "```python\nprint(type(10), type(10.0), type(1e3))  # int, float, float\nprint(1_000 + 1)                        # 1001\nprint(True + 1, .5 + 4.)                # 2 4.5\nprint(\"It's\", 'say \"hi\"')               # It's say \"hi\"\nprint(type(\"7\"))                        # <class 'str'>\n```",
   "Consider a worked example. A price script stores `tax_rate = 2e-2` and `quantity = 3`, then prints `quantity * tax_rate`. The output is `0.06`, a float, because the exponent makes `2e-2` a float and an int times a float gives a float. Later the script reads a quantity stored as `\"3\"` from a file; now `\"3\" * 2` produces `\"33\"` rather than 6, because the literal is a string. Recognizing the type from how the value is written tells you in advance which result you will get. Converting the text with `int(\"3\")` before multiplying fixes the bug, a technique you will study in the type-casting lesson.",
   "Common mistakes: writing `true` or `TRUE` instead of `True`; thinking `1e3` is an int because its value is whole; writing `1,000` (which is actually a tuple of two ints, `(1, 0)`) instead of `1_000`; putting an underscore at the start, end or doubled (`_100`, `100_`, `1__0`), all of which are not valid numeric literals; and forgetting that quoted digits are strings. Exam questions usually ask \"what is the type of\" or \"which literal is valid\". Clue words: a point or an `e` means float; quotes mean str; capitalized `True` or `False` means bool; nothing but digits and optional underscores means int."
  ],
  "analogy": "Literals are like goods arriving in labeled packaging. A carton marked \"liquid\" and a box marked \"tablets\" may hold the same dose, yet you handle them differently, just as 4 and 4.0 compare equal but have different types. Quotes are like sealing a number inside an envelope with the number written on the front: \"12\" is a label you can read, not an amount you can add. The comparison stops at bool: True really is also the number 1, which no packaging rule would predict.",
  "terms": [
   [
    "Literal",
    "A value written directly in source code, whose form determines its type."
   ],
   [
    "int",
    "Python's integer type for whole numbers, with no fixed size limit."
   ],
   [
    "float",
    "Python's type for numbers with a fractional part or exponent, such as 2.5 or 1e-3."
   ],
   [
    "Scientific notation",
    "Float notation using e or E for a power of ten, as in 6.02e23; always produces a float."
   ],
   [
    "bool",
    "The Boolean type with values True and False, a subclass of int where True equals 1 and False equals 0."
   ],
   [
    "str",
    "Python's text type, written in single, double or triple quotes."
   ],
   [
    "None",
    "The single value of NoneType, meaning the absence of a value."
   ]
  ],
  "example": "A price list script stores tax_rate = 2e-2 and quantity = 3. print(quantity * tax_rate) prints 0.06, a float, because the scientific-notation literal 2e-2 is a float and int times float gives a float. When the quantity later arrives as the string \"3\", the same multiplication by 2 would produce \"33\" instead.",
  "mistakes": [
   [
    "1e3 is an int because 1000 is a whole number.",
    "Any literal written with e or E is a float, so 1e3 is 1000.0."
   ],
   [
    "1,000 is a way to write one thousand.",
    "The comma builds a tuple, (1, 0). Use 1_000 for readable digit grouping."
   ],
   [
    "true, TRUE and True all work as Booleans.",
    "Only True and False with a capital first letter are Boolean literals; the other spellings are undefined names."
   ],
   [
    "\"12\" is a number because it contains only digits.",
    "Anything in quotes is a str, so \"12\" + \"3\" is \"123\" and \"12\" * 2 is \"1212\"."
   ]
  ],
  "tryit": [
   [
    "A setting is copied into a script as repeat = 3e1, and a teammate wants to use it as the count in \"-\" * repeat to draw a divider line. What is the type and value of repeat, and what happens on that line?",
    "3e1 is the float 30.0, because scientific notation always produces a float. \"-\" * 30.0 raises TypeError, since a string can only be repeated an int number of times. Writing repeat = 30, or converting with int(repeat), fixes it."
   ]
  ],
  "tip": "Watch for the decimal point and the e: 5 is int, 5.0 and 5. are float, 5e0 is float. And \"5\" in quotes is a str no matter what it looks like.",
  "check": [
   [
    "What is the type of 2E2 and what does print(2E2) show?",
    "float; it prints 200.0."
   ],
   [
    "Is 1_000_000 a valid literal, and what does it equal?",
    "Yes. Single underscores between digits are allowed for readability; it equals the int 1000000."
   ],
   [
    "What does True * 3 evaluate to?",
    "3, because True behaves as the integer 1 in arithmetic."
   ],
   [
    "Why is 007 rejected in Python 3?",
    "Leading zeros are not allowed on non-zero decimal integer literals; a leading zero is reserved for base prefixes such as 0o."
   ]
  ]
 },
 {
  "t": "Binary, octal and hexadecimal integer literals (0b, 0o, 0x)",
  "hook": "You are the night-shift technician at Pinecrest Clinic, and the log from an infusion pump shows a fault code of `0x1F`. The pump's manual lists fault numbers in plain decimal, from 1 to 40. Your colleague Sam suggests the log is corrupted, because \"0x1F is not even a number.\" Before you phone the vendor's support line at 3 a.m., you want to be certain. Is `0x1F` a real number, and which entry in the manual does it point to?",
  "simple": "We normally count in tens, using the digits 0 to 9. Computers work in twos, using only 0 and 1. Programmers sometimes write numbers in base 2, base 8 or base 16 because those line up neatly with the computer's bits. Python lets you do this with a short prefix: 0b for binary, 0o for octal, and 0x for hexadecimal, which uses the letters A to F for the values ten to fifteen. The prefix only changes how you write the number, not the number itself. It is like saying \"a dozen\" instead of \"twelve\": the same eggs, described differently. Python prints the result in ordinary decimal unless you ask for something else.",
  "body": [
   "People normally write numbers in decimal (base 10), but computers store them in binary (base 2), and programmers often use octal (base 8) and hexadecimal (base 16) as compact ways to write binary patterns. Python lets you write integer literals in any of these bases by adding a prefix. The prefix only changes how you write the number; the result is always an ordinary `int`, and `print()` shows it in decimal. Why bother? Because some values are naturally bit patterns: a color code, a permission setting or a set of flags reads far more clearly as `0xFF` or `0b1010` than as 255 or 10.",
   "Binary literals start with `0b` or `0B` and may contain only the digits 0 and 1. Each position is a power of two, so `0b1010` means 8 + 0 + 2 + 0, which is 10. Octal literals start with `0o` or `0O` (zero followed by the letter o) and use digits 0 to 7; `0o17` means 1 x 8 + 7, which is 15. Hexadecimal literals start with `0x` or `0X` and use digits 0 to 9 plus the letters A to F, in either case, for the values 10 to 15; `0xFF` means 15 x 16 + 15, which is 255, and `0x10` is 16. Underscores are allowed after the prefix too, as in `0b1111_0000`. The letters in a hexadecimal literal are not case sensitive, so `0xff`, `0xFF` and `0XfF` all mean 255.",
   "```python\nprint(0b1010, 0o17, 0xFF, 0x10)      # 10 15 255 16\nprint(bin(10), oct(15), hex(255))    # 0b1010 0o17 0xff\nprint(int(\"ff\", 16), int(\"101\", 2))  # 255 5\nprint(type(0x1F))                    # <class 'int'>\n```",
   "Going the other way, the built-in functions `bin()`, `oct()` and `hex()` take an integer and return a string showing it in that base, including the prefix. They return strings, not numbers, and `hex()` uses lowercase letters. To convert text in some base back into an integer, call `int()` with a second argument naming the base: `int(\"ff\", 16)` returns 255. Using a digit that is not valid for the base causes an error: `0b102` in code is a syntax error, and `int(\"9\", 8)` raises `ValueError` at run time. The base argument of `int()` can be any value from 2 to 36, although the exam concentrates on 2, 8 and 16.",
   "A quick way to convert by hand: for binary, write the powers of two from the right (1, 2, 4, 8, 16, 32 and so on) above the digits and add the ones that sit over a 1. For hexadecimal, each hex digit stands for exactly four binary digits (bits), which is why hex is popular for memory addresses, error codes, colors such as `0xFF8800`, and byte values: one byte is always two hex digits. For octal, each digit is three bits, which is why it still appears in Unix file permissions like `0o755`, where each digit is a read-write-execute set. To convert hexadecimal by hand, multiply each digit by its place value (1, 16, 256 and so on from the right) and add the results; for octal the place values are 1, 8, 64 and 512. With practice you will recognize landmarks instantly: `0xFF` is 255, `0x100` is 256, `0b1111` is 15 and `0o10` is 8.",
   "Consider a worked example. A web designer stores a color as `0x33CC99` in a script. `print(0x33CC99)` shows `3394713`, the same number in decimal. To split it into red, green and blue, you read it two hex digits at a time: `0x33` is 51, `0xCC` is 204 and `0x99` is 153. When the script needs to write the color back into a stylesheet, `hex(3394713)` returns the string `'0x33cc99'`. Negative values work with prefixes too: `-0x10` is -16, and because every one of these literals is an ordinary int, `0x10 + 0b1` is simply 17.",
   "Common mistakes: writing `0O` and misreading it as two zeros, or writing `00` for octal; using a plain leading zero such as `017`, which was octal in Python 2 but is a `SyntaxError` in Python 3; expecting `print(0xFF)` to show `0xFF` instead of 255; treating the output of `hex()` as a number and trying to add to it; and using letters beyond F, such as `0xG1`. Also remember that `int(\"0x1f\", 16)` works (the prefix is accepted when it matches the base) but `int(\"0x1f\")` with the default base 10 raises `ValueError`.",
   "Exam questions usually give an expression mixing prefixes and ask for the printed result, or ask which literal is invalid. Clue words: \"base 2\" means `0b`; \"base 8\" means `0o`; \"base 16\" means `0x`; \"returns a string with a prefix\" means `bin()`, `oct()` or `hex()`; \"convert text in another base\" means `int(text, base)`. Convert each literal to decimal on scrap paper, add them up, and remember that the printed result is decimal. If an answer choice shows the result with a prefix, it is only correct when the code called `bin()`, `oct()` or `hex()`, and then the answer is a string, which `print()` shows without quotes but the REPL shows with them."
  ],
  "analogy": "Number bases are like units of length. One foot and twelve inches are the same distance written differently, and `0xFF` and 255 are the same int written differently. The prefix is the unit label that tells Python how to read the digits. The comparison stops at output: Python always reports the value in decimal, as if a tape measure insisted on giving every length in inches, unless you call `bin()`, `oct()` or `hex()`, and those give you back text rather than a number.",
  "mnemonic": "The prefix letters b, o, x go up the alphabet as the base goes up: b for 2, o for 8, x for 16. And the octal prefix is zero followed by the letter o, never two zeros.",
  "terms": [
   [
    "0b prefix",
    "Marks a binary (base 2) integer literal, using only digits 0 and 1."
   ],
   [
    "0o prefix",
    "Marks an octal (base 8) integer literal, using digits 0 to 7."
   ],
   [
    "0x prefix",
    "Marks a hexadecimal (base 16) integer literal, using 0 to 9 and A to F."
   ],
   [
    "bin(), oct(), hex()",
    "Built-in functions that return a string representation of an integer in base 2, 8 or 16, with prefix."
   ],
   [
    "int(text, base)",
    "Converts a string of digits written in the given base into an int."
   ],
   [
    "Bit",
    "A single binary digit, 0 or 1; one hex digit represents four bits."
   ]
  ],
  "example": "A web designer stores a color as 0x33CC99 in a script. print(0x33CC99) shows 3394713, the same number in decimal, while hex(3394713) returns the string '0x33cc99' to put back into a stylesheet. Reading the value two hex digits at a time gives red 51, green 204 and blue 153.",
  "mistakes": [
   [
    "print(0xFF) shows 0xFF.",
    "The prefix only affects how you write the literal. The value is an ordinary int, so print shows 255."
   ],
   [
    "017 is an octal literal.",
    "That was Python 2 behavior. In Python 3 a plain leading zero on a non-zero number is a SyntaxError; octal needs the 0o prefix."
   ],
   [
    "hex(255) returns a number you can add to.",
    "bin(), oct() and hex() return strings such as '0xff'. Adding an int to that string raises TypeError."
   ],
   [
    "int(\"0x1f\") converts hexadecimal text.",
    "With the default base 10 it raises ValueError. Use int(\"0x1f\", 16) or int(\"1f\", 16)."
   ]
  ],
  "tryit": [
   [
    "A script stores a file permission as mode = 0o640, and a teammate prints it to check, expecting to see 640. A different number appears. What does print(mode) show, and how should the teammate display the value in octal?",
    "It shows 416, because 6 x 64 + 4 x 8 + 0 = 416 and print shows ints in decimal. To see octal, use print(oct(mode)), which displays the string 0o640."
   ]
  ],
  "tip": "The octal prefix is zero plus the letter o (0o), not two zeros, and a plain leading zero like 017 is a SyntaxError in Python 3. Remember that bin(), oct() and hex() return strings, while prefixed literals are ints printed in decimal.",
  "check": [
   [
    "What does print(0o10 + 0x10 + 0b10) output?",
    "26, because 0o10 is 8, 0x10 is 16 and 0b10 is 2."
   ],
   [
    "What is the type of hex(31)?",
    "str. It returns the string '0x1f'."
   ],
   [
    "Is 0b21 valid?",
    "No. Binary literals may contain only 0 and 1, so it is a SyntaxError."
   ],
   [
    "What does int(\"777\", 8) return?",
    "511, because 7 x 64 + 7 x 8 + 7 = 511."
   ]
  ]
 },
 {
  "t": "Variables and naming rules, reserved keywords and PEP 8 naming conventions",
  "hook": "You have just joined the small development team at Riverside Bakery Supply, and Omar asks you to review a script before it goes live. One line reads `2nd_order = 15`, another uses `order-total`, and a third names a running total `sum`, which works fine until a later line calls `sum()` on a list and crashes. Omar shrugs: \"They are all just names. What is the difference?\" The review meeting starts in ten minutes. Which of these names will Python refuse outright, which will run but cause trouble later, and which merely break the team's style guide?",
  "simple": "A variable is a name you give to a value so you can use it later, like writing a label on a storage box. In Python you create one just by assigning a value: score = 10. Names follow rules. They can use letters, digits and underscores, but they cannot start with a digit, cannot contain spaces or dashes, and cannot be one of Python's reserved words such as for or class. Capital letters matter, so Score and score are two different names. On top of the rules there is a style guide most Python programmers follow: lowercase_with_underscores for ordinary names, ALL_CAPS for values that should never change, and CapitalizedWords for class names.",
  "body": [
   "A variable is a name that refers to a value stored in memory. In Python you create a variable simply by assigning to it: `age = 30`. There is no separate declaration and no fixed type attached to the name; the value carries the type, and the same name can later refer to a value of a different type, so `age = \"thirty\"` is legal. Python is therefore called dynamically typed. Using a variable before anything has been assigned to it raises `NameError`. Behind the scenes, a name is a label attached to an object: after `a = 10` and `b = a`, both names refer to the same int object. Assigning `b = 20` later moves only the `b` label, and `a` still refers to 10.",
   "The legal naming rules are strict and testable. A name (identifier) may contain letters, digits and underscores. It must not start with a digit, so `2cats` is illegal but `cats2` is fine. It may start with an underscore, as in `_total`. It must not contain spaces, hyphens or other symbols: `my-var` is read as `my` minus `var`. It must not be a keyword such as `class`, `for` or `None`. Names are case sensitive, so `Total`, `total` and `TOTAL` are three different variables, and `While` is legal even though `while` is a keyword. There is no practical limit on the length of a name, so choose descriptive ones such as `items_in_cart` rather than cryptic abbreviations. Python 3 also allows non-English letters in names, though that is rarely wise.",
   "A subtle point: names of built-in functions such as `print`, `list`, `str`, `sum` or `input` are not keywords, so Python lets you assign to them. Doing so shadows the built-in. After `list = [1, 2]`, calling `list(\"abc\")` fails with `TypeError` because `list` now refers to your list object. The code is legal, but it is a bug waiting to happen, so avoid reusing built-in names. You can confirm the difference in the REPL: after `import keyword`, the call `keyword.iskeyword(\"list\")` returns `False`, showing that `list` is a built-in name rather than a keyword.",
   "PEP 8 (Python Enhancement Proposal 8), Python's official style guide, sets naming conventions that the interpreter does not enforce but that other programmers expect and that the exam refers to. Variables and functions use lowercase words separated by underscores (snake_case): `total_price`, `get_input()`. Constants, which are ordinary variables you promise not to change, use uppercase with underscores: `MAX_SIZE = 100`. Class names use CapWords (also called CamelCase): `BankAccount`. Avoid the single-character names `l`, `O` and `I`, because they look like the digits 1 and 0. Following these conventions makes code readable at a glance for other Python programmers: seeing `MAX_SIZE` tells a reader not to change it, and seeing `BankAccount` tells them it names a class.",
   "```python\nuser_name = \"Ana\"   # good: snake_case\nMAX_RETRIES = 3     # constant by convention\n_count = 0          # legal: leading underscore\nWhile = 1           # legal, but confusing\n# 3rd_place = 1     # SyntaxError: starts with a digit\n# my var = 1        # SyntaxError: contains a space\n# class = \"A\"       # SyntaxError: keyword\n```",
   "Assignment works right to left: the expression on the right is evaluated first, then the name on the left is bound to the result. That is why `x = x + 1` makes sense in programming even though it is false in algebra. You can bind several names at once: `a, b = 1, 2` binds both, and `a, b = b, a` swaps them, because the right side is built as a tuple before either name changes. Chained assignment, `a = b = 0`, binds both names to the same value. Unpacking needs matching counts: `a, b = 1, 2, 3` raises `ValueError` because there are three values for two names. Use the built-in `type()` whenever you want to confirm what kind of value a name currently refers to, which is handy in the REPL while you practice. Compound forms such as `x += 1` follow the same right-to-left logic and need the name to exist already.",
   "Consider a worked example. A beginner writes `sum = 0`, adds prices in a loop with `sum = sum + p`, and later calls `sum([1, 2, 3])` to check a list. Python raises `TypeError: 'int' object is not callable`, because the name `sum` now refers to an integer. Renaming the variable to `total` restores the built-in `sum()` and follows PEP 8 at the same time. Common mistakes: confusing \"legal\" with \"conventional\", thinking an uppercase constant is protected (Python lets you reassign `PI`), and assuming a hyphen joins words in a name.",
   "Exam questions usually list several candidate names and ask which are invalid, or which is the best PEP 8 choice. Clue words: \"cannot be used as a variable name\" points to a digit first, a space, a hyphen or another symbol, or a keyword; \"follows PEP 8 for a variable\" points to snake_case; \"constant\" points to UPPER_CASE; \"class name\" points to CapWords; \"not defined\" in an error message means `NameError` from using a name before assignment."
  ],
  "analogy": "A variable is a sticky note, not a box. Writing `price = 5` sticks the note \"price\" onto the value 5, and `price = \"five\"` simply moves the note to a different value, which is dynamic typing. Shadowing a built-in is like covering the label on a fire extinguisher with your own note: the extinguisher is still in the building, but nobody can find it under that name anymore. The comparison stops at constants: writing a note in capital letters does not glue it down, and Python still lets you move it.",
  "mnemonic": "Classes get CapWords (C for C), constants SHOUT in UPPER_CASE because they should not change, and everything else, variables and functions, slithers along in snake_case.",
  "terms": [
   [
    "Variable",
    "A name bound to a value by assignment; the value, not the name, has a type."
   ],
   [
    "Identifier",
    "Any name you create; it may use letters, digits and underscores, must not start with a digit and must not be a keyword."
   ],
   [
    "Dynamic typing",
    "The same name may refer to values of different types over time, with no declaration."
   ],
   [
    "PEP 8",
    "Python's official style guide, recommending snake_case for variables and functions, UPPER_CASE for constants and CapWords for classes."
   ],
   [
    "Shadowing a built-in",
    "Assigning to a built-in name such as list or str, which hides the original function in that scope."
   ],
   [
    "NameError",
    "The exception raised when code uses a name that has not been assigned."
   ]
  ],
  "example": "A beginner names a variable sum = 0 and later calls sum([1, 2, 3]), getting TypeError: 'int' object is not callable. Renaming the variable to total restores the built-in sum() and follows PEP 8 at the same time, and the code reviewer also renames Price to price and taxrate to TAX_RATE because it never changes.",
  "mistakes": [
   [
    "my-var is a legal name if the spacing is right.",
    "A hyphen is the minus operator, so my-var means my minus var. Use an underscore: my_var."
   ],
   [
    "Naming a constant in UPPER_CASE makes Python protect it.",
    "It is only a PEP 8 convention. Python lets you reassign MAX_SIZE without any complaint."
   ],
   [
    "list, str and print are keywords, so you cannot assign to them.",
    "They are built-in names, not keywords. Assigning to them is legal but shadows the built-in, which causes errors later when you try to call it."
   ],
   [
    "MyTotal breaks Python's rules for a variable name.",
    "It is legal and runs. It only breaks PEP 8, which recommends my_total for variables and reserves CapWords for classes."
   ]
  ],
  "tryit": [
   [
    "You need a name for a value that stores the maximum number of login attempts, which the program should never change, and a name for a function that checks a password. A teammate suggests maxAttempts and CheckPassword. What would PEP 8 recommend, and would the teammate's names cause errors?",
    "PEP 8 suggests MAX_ATTEMPTS for the constant and check_password for the function. The teammate's names are legal and would run; they only break the conventions, and CheckPassword misleadingly looks like a class name."
   ]
  ],
  "tip": "Legal and conventional are different questions. Exam items may ask which names are invalid (digit first, hyphen, space, keyword) versus which break PEP 8 but still run (MyVariable for a variable, for example).",
  "check": [
   [
    "Which of these names are legal: _x, x_1, 1_x, x-1, While?",
    "_x, x_1 and While are legal (While differs from the keyword while by case). 1_x starts with a digit and x-1 contains a hyphen, so both are illegal."
   ],
   [
    "Does Python stop you from changing a constant named PI?",
    "No. Upper-case naming is only a PEP 8 convention; the interpreter lets you reassign it."
   ],
   [
    "After a, b = 3, 5 and a, b = b, a, what are a and b?",
    "a is 5 and b is 3; the right-hand tuple is built first, then unpacked."
   ],
   [
    "Which PEP 8 style suits a function name: calcTotal, calc_total or CalcTotal?",
    "calc_total. Functions and variables use snake_case; CapWords is for classes."
   ]
  ]
 },
 {
  "t": "Numeric operators: ** * / % // + - and the difference between / and //",
  "hook": "You are covering the support inbox at Maplewood Tutoring, where a scheduling script turns each 125-minute session into hours and minutes for the timetable. A tutor named Ines writes in: her timetable says her session lasts 2.0833333333333335 hours. A second message reports that a refund calculation for a negative balance came out one dollar further from zero than expected. Both bugs trace back to the division operators in the code. Which operator should the script have used each time, and why does Python round negative numbers the way it does?",
  "simple": "Python does arithmetic with the symbols you know, plus a few new ones. + adds, - subtracts and * multiplies. There are three kinds of division. A single slash / gives the exact answer and always produces a decimal number, so 6 / 3 is 2.0. A double slash // gives only the whole-number part, rounded down, so 7 // 2 is 3. The percent sign % gives the remainder, so 7 % 2 is 1. Think of sharing 7 cookies between 2 friends: each gets 3 whole cookies (that is //) and 1 is left over (that is %). Finally, ** means \"to the power of\", so 2 ** 3 is 8.",
  "body": [
   "Python's arithmetic operators are `+` (addition), `-` (subtraction), `*` (multiplication), `/` (true division), `//` (floor division), `%` (remainder, called modulo) and `**` (exponentiation). The PCEP exam loves these, especially the three division-related ones, so you need to predict both the value and the type of every result. Getting the type right is half the answer, because `3` and `3.0` print differently. These operators are the building blocks of almost every calculation a program makes, from totaling a shopping cart to working out whether a number is even, so fluency with them pays off in every later domain.",
   "The type rule is simple for most operators: if both operands are `int`, the result is `int`; if either is `float`, the result is `float`. So `3 + 4` is 7 but `3 + 4.0` is 7.0. The big exception is `/`: true division always returns a float, even when the division is exact. `6 / 3` is 2.0, not 2. Exponentiation has its own exception, covered below. This automatic promotion from int to float is called implicit conversion. Python widens the int so that no information is lost, which is why the float wins whenever the two types meet.",
   "Floor division `//` divides and then rounds down toward negative infinity, giving the largest whole number not greater than the true quotient. With two ints the result is an int; with any float it is a float with a whole value. `7 // 2` is 3 and `7.0 // 2` is 3.0. Rounding down matters for negatives: `-7 // 2` is -4, not -3, because -3.5 rounded toward negative infinity is -4. It does not simply chop off the fraction. That is the key difference from `int()`, which truncates toward zero: `int(-3.5)` is -3, while `-7 // 2` is -4. When both operands are positive the two approaches agree, which is why the difference only shows up in questions with a negative number.",
   "The `%` operator gives the remainder that goes with floor division, and Python guarantees that `(a // b) * b + (a % b) == a`. So `7 % 2` is 1 and `-7 % 2` is 1, because -4 x 2 + 1 = -7. The result takes the sign of the divisor: `7 % -2` is -1. Common uses are testing for even numbers (`n % 2 == 0`), extracting the last digit (`n % 10`) and wrapping values around a range, such as hours on a clock. A quick sanity check for modulo answers: with a positive divisor the result is always between 0 and the divisor minus 1, so anything `% 3` can only be 0, 1 or 2.",
   "```python\nprint(7 / 2, 7 // 2, 7 % 2)     # 3.5 3 1\nprint(-7 // 2, -7 % 2)          # -4 1\nprint(7 % -2)                   # -1\nprint(6 / 3, 2 ** 3, 2 ** -1)   # 2.0 8 0.5\nprint(7.5 // 2, 2.0 ** 2)       # 3.0 4.0\n```",
   "Exponentiation `**` raises the left operand to the power of the right: `2 ** 10` is 1024. With int operands and a non-negative exponent the result is an int; a negative exponent gives a float, so `2 ** -1` is 0.5. Dividing by zero with `/`, `//` or `%` raises `ZeroDivisionError`, whether the operands are ints or floats. The unary operators `+` and `-` apply to a single operand, as in `-x`, while binary `+` and `-` combine two. Keep them separate in your mind, because they have different priorities, which the operator-priority lesson covers. Exponentiation also accepts float operands, as in `9 ** 0.5`, which gives 3.0, the square root of 9.",
   "Consider a worked example. A script shares 17 cookies among 5 children. `17 // 5` gives 3 cookies each and `17 % 5` gives 2 left over; together, 3 x 5 + 2 = 17, exactly the guarantee above. If the script had used `17 / 5`, it would get 3.4, which is useless for counting whole cookies. The same pair converts 135 minutes into hours and minutes: `135 // 60` is 2 and `135 % 60` is 15. Another everyday pattern is `n % 10` for the last digit and `n // 10` to drop it, so 472 gives 2 and 47. Common mistakes: expecting `/` to return an int for exact results, rounding `-7 // 2` to -3, giving `%` the sign of the left operand, and forgetting that any float operand turns `//` into a float result.",
   "Exam questions typically print a few results on one line and ask for the exact output. Clue words: \"true division\" means `/` and a float; \"integer division\" or \"floor division\" means `//`; \"remainder\" or \"modulo\" means `%`; \"power\" means `**`. Check every negative floor-division or modulo question twice by working out the true quotient, rounding it down toward negative infinity, and then computing the remainder from the guarantee. Also watch for mixed types hidden in a longer expression: a single `/` anywhere makes the whole result a float, so `4 / 2 * 3` is 6.0, and `10 // 3 + 0.0` is 3.0 because adding a float promotes the int result."
  ],
  "analogy": "Floor division is like an elevator that stops only at whole floors and always goes down to the nearest stop below you. At floor 3.5 it drops to 3. In a basement at floor -3.5, going down means -4, not -3, which is why -7 // 2 is -4. The remainder % is whatever you need to climb back up to your exact spot. The comparison stops at types: if any input is a float, the elevator reports a float floor number, so 7.0 // 2 is 3.0.",
  "terms": [
   [
    "True division (/)",
    "Division that always returns a float, even for exact results like 4 / 2 = 2.0."
   ],
   [
    "Floor division (//)",
    "Division rounded down toward negative infinity; int with two ints, float otherwise."
   ],
   [
    "Modulo (%)",
    "The remainder paired with floor division, taking the sign of the divisor in Python."
   ],
   [
    "Exponentiation (**)",
    "Raises the left operand to the power of the right operand."
   ],
   [
    "ZeroDivisionError",
    "The exception raised when /, // or % has a divisor of zero."
   ],
   [
    "Unary operator",
    "An operator such as -x or +x that takes a single operand."
   ]
  ],
  "example": "A script splits 17 cookies among 5 children: 17 // 5 gives 3 cookies each and 17 % 5 gives 2 left over. If it had used 17 / 5 it would get 3.4, which is useless for counting whole cookies. The same pair of operators turns 135 minutes into 2 hours and 15 minutes.",
  "mistakes": [
   [
    "6 / 3 gives 2 because the division is exact.",
    "True division always returns a float, so the result is 2.0."
   ],
   [
    "-7 // 2 is -3 because // chops off the decimal part.",
    "// rounds toward negative infinity, so -3.5 becomes -4. Chopping toward zero is what int() does."
   ],
   [
    "The result of % takes the sign of the left operand.",
    "In Python it takes the sign of the divisor: -7 % 2 is 1 and 7 % -2 is -1."
   ],
   [
    "7.5 // 2 is 3 because floor division gives an int.",
    "Any float operand makes the result a float, so it is 3.0."
   ]
  ],
  "tryit": [
   [
    "A parking garage script charges per full hour and also reports leftover minutes. A car stayed 200 minutes, and the draft uses hours = 200 / 60. What does the draft produce, and which operators should a corrected version use?",
    "The draft gives 3.3333333333333335, a float that is useless for counting full hours. Using hours = 200 // 60 gives 3 and minutes = 200 % 60 gives 20, and 3 x 60 + 20 = 200 confirms the pair."
   ]
  ],
  "tip": "Two classic traps: / always returns a float, and // rounds toward negative infinity, so -7 // 2 is -4. Check every negative floor-division or modulo question twice.",
  "check": [
   [
    "What do 9 / 3 and 9 // 3 return?",
    "9 / 3 returns 3.0 (float); 9 // 3 returns 3 (int)."
   ],
   [
    "What is -9 % 4?",
    "3, because -9 // 4 is -3 and -3 x 4 + 3 = -9."
   ],
   [
    "What is the type and value of 7.5 // 2?",
    "float 3.0; floor division with a float operand gives a whole-valued float."
   ],
   [
    "What is 2 ** -2?",
    "0.25, a float, because a negative exponent produces a float result."
   ]
  ]
 },
 {
  "t": "String operators (+ and *), assignment and compound assignment operators (+=, *=, etc.)",
  "hook": "You maintain the receipt script for Bluebird Cafe. Just before the lunch rush, the owner, Rosa, calls: the line that should print \"Table 4\" at the top of each receipt now crashes with a TypeError, and a test line meant to show four times four printed 4444 instead of 16. Both problems appeared after yesterday's quick edits, and both involve the familiar symbols + and *, which behave very differently once text is involved. What exactly do those symbols do to strings, and how do you fix both lines before the first order prints?",
  "simple": "Some math symbols also work on text. The plus sign glues two pieces of text together: \"sun\" + \"flower\" becomes \"sunflower\". The star repeats text: \"ha\" * 3 becomes \"hahaha\". But Python will not mix text and numbers with +, so \"Age: \" + 30 is an error; you first turn the number into text with str(30). The equals sign = does not mean \"is equal to\"; it means \"store this value under this name\". Shortcuts like += mean \"update the value\": if your score is 10 and you write score += 5, the score becomes 15, just like adding points on a scoreboard.",
  "body": [
   "Two arithmetic symbols also work on strings, with different meanings. The `+` operator concatenates (joins) two strings: `\"snow\" + \"ball\"` gives `\"snowball\"`. The `*` operator replicates a string a whole number of times: `\"ab\" * 3` gives `\"ababab\"`. The order of the operands for `*` does not matter, so `3 * \"ab\"` is the same. Multiplying by zero or a negative number gives an empty string `\"\"`. Neither operator adds a space for you: `\"Hello\" + \"world\"` is `\"Helloworld\"`. Both operators always build a brand-new string; they never change the strings you started with.",
   "These operators are strict about types. Both operands of `+` must be strings, so `\"Age: \" + 30` raises `TypeError`; you must convert first with `\"Age: \" + str(30)`. For `*`, one operand must be a string and the other an int: `\"ab\" * 2.0` raises `TypeError` because you cannot repeat something 2.0 times, and `\"ab\" * \"2\"` fails too. The same two operators work on lists and tuples: `[0] * 3` is `[0, 0, 0]` and `[1] + [2]` is `[1, 2]`. One curiosity: replication with a Boolean works because `bool` is a subclass of `int`, so `\"ab\" * True` is `\"ab\"`, though nobody writes that on purpose.",
   "The plain assignment operator `=` binds the name on its left to the value of the expression on its right. It is a statement, not a comparison; comparing uses `==`. Python also supports chained assignment, `a = b = 0`, which binds both names to the same value, and multiple assignment, `x, y = 1, 2`. An assignment produces no value you can print, so `print(x = 5)` does not print 5; Python treats `x=5` inside the call as a keyword argument and raises `TypeError`. Because `=` and `==` look so alike, a common slip is writing `if x = 5:`, which Python rejects as a `SyntaxError` rather than quietly assigning.",
   "Compound (augmented) assignment operators combine an operation with assignment. `x += 5` means `x = x + 5`, and the same pattern exists for `-=`, `*=`, `/=`, `//=`, `%=` and `**=`, plus the bitwise forms `&=`, `|=`, `^=`, `<<=` and `>>=`. The variable must already exist; `count += 1` on an undefined `count` raises `NameError`. The type rules of the underlying operator still apply, so after `x = 10` and `x /= 2`, `x` is the float 5.0, not the int 5. There is no `++` or `--` operator in Python; `x++` is a syntax error, and `++x` is simply two unary plus signs, leaving `x` unchanged. Compound operators are mostly about readability: you avoid typing the variable name twice and so remove a chance to misspell it. They appear constantly in loops, where `total += price` and `count += 1` accumulate results.",
   "```python\ns = \"ha\"\ns *= 3          # s = s * 3\nprint(s)        # hahaha\nn = 7\nn //= 2         # n = n // 2  -> 3\nn **= 2         # n = n ** 2  -> 9\nprint(n)        # 9\nx = 4\nx *= 2 + 3      # x = x * (2 + 3)\nprint(x)        # 20\n```",
   "One subtle point the exam likes: the right-hand side of a compound assignment is evaluated fully before the operation. So `x *= 2 + 3` means `x = x * (2 + 3)`, not `x = x * 2 + 3`. If `x` is 4, the result is 20, not 11. Strings are immutable, so `s += \"!\"` does not change the original string object; it builds a new string and rebinds `s` to it. You will not see a difference in simple programs, but it explains why another name bound to the old string is unaffected.",
   "Consider a worked example. A console game draws a border with `print(\"-\" * 20)`, which prints twenty hyphens in one line. It builds a score message with `\"Score: \" + str(points)`, because `\"Score: \" + points` would crash with `TypeError` when `points` is an int. When a player wins a round, it updates the score with `points += 10` instead of writing `points = points + 10`. At the end, `bonus = 1.5` and `points *= bonus` turns 40 into 60.0, a float, which the programmer converts back with `int(points)` before displaying it.",
   "Common mistakes: expecting `+` to add a number to a string; expecting `\"3\" * 4` to be 12 rather than `\"3333\"`; forgetting that `/=` always produces a float; using `+=` on a name that was never assigned; and misreading `x -= 1 + 2` as `x - 1 + 2`. Exam clue words: \"join\" or \"concatenate\" means `+`; \"repeat\" or \"replicate\" means `*`; \"shorthand for x = x op y\" means a compound operator. When a question mixes quotes and numbers, decide the type of each operand first and the answer usually follows."
  ],
  "analogy": "String + is like coupling railway cars end to end: the cars join exactly as they are, with no gap unless you add a space car yourself. String * is a photocopier set to a number of copies; you can ask for 3 copies, but not 2.5 or \"three\". A compound assignment such as points += 10 is a scorekeeper erasing the old number and writing the new one. The comparison stops at immutability: the old train is never altered; a new train is built and the name moves to it.",
  "terms": [
   [
    "Concatenation",
    "Joining two strings with +, producing a new string."
   ],
   [
    "Replication",
    "Repeating a string (or list) with * and an integer count."
   ],
   [
    "Assignment operator (=)",
    "Binds the name on the left to the value of the expression on the right."
   ],
   [
    "Compound assignment",
    "An operator such as += or //= that applies an operation and rebinds the variable to the result."
   ],
   [
    "Chained assignment",
    "Binding several names to one value in a single statement, as in a = b = 0."
   ],
   [
    "Immutable",
    "Unable to be changed in place; strings are immutable, so string operations build new strings."
   ]
  ],
  "example": "A console game draws a border with print(\"-\" * 20) and builds a score message with \"Score: \" + str(points). When a player wins a round it updates points += 10 instead of writing points = points + 10, and a later points *= 1.5 turns the score into a float that the programmer converts back with int() before display.",
  "mistakes": [
   [
    "\"3\" * 4 gives 12.",
    "With a string operand, * replicates text, so the result is \"3333\"."
   ],
   [
    "x *= 2 + 3 means x = x * 2 + 3.",
    "The whole right side is evaluated first, so it means x = x * (2 + 3)."
   ],
   [
    "x++ adds one to x, as in other languages.",
    "Python has no ++ operator. x++ is a SyntaxError; write x += 1."
   ],
   [
    "After x = 10 and x /= 2, x is the int 5.",
    "/= uses true division, so x becomes the float 5.0."
   ]
  ],
  "tryit": [
   [
    "A script draws a progress bar with bar = \"#\" * done, where done = total / 4. With total = 20 the line crashes. Why, and what are two ways to fix it?",
    "total / 4 is the float 5.0, and a string can only be replicated by an int, so Python raises TypeError. Use floor division, done = total // 4, which gives the int 5, or convert with int(total / 4) before replicating."
   ]
  ],
  "tip": "Expect a question where a number is added to a string. \"3\" + 4 is a TypeError, \"3\" * 4 is \"3333\", and x *= 2 + 1 multiplies by 3, because the whole right side is evaluated first.",
  "check": [
   [
    "What does print(\"=\" * 0 + \"x\") show?",
    "x. Replicating by zero gives an empty string, then \"x\" is concatenated."
   ],
   [
    "If a = 3 and you run a **= 1 + 1, what is a?",
    "9. The right side 1 + 1 is evaluated first, then a = a ** 2."
   ],
   [
    "Why does \"Total: \" + 5 fail?",
    "+ cannot join a str and an int, so Python raises TypeError. Convert with str(5) first."
   ],
   [
    "After x = 9 and x /= 3, what is x?",
    "3.0, a float, because /= uses true division."
   ]
  ]
 },
 {
  "t": "Operator priority and binding, including right-to-left ** and unary minus",
  "hook": "You are reviewing code at Northgate Robotics, where a junior engineer, Kai, wrote `penalty = -speed ** 2` to compute a cost that should always be positive. In testing, the route planner keeps choosing the fastest and riskiest path, because the penalty comes out negative and so looks like a reward. Kai insists that \"minus speed, squared\" must be positive. The expression has no parentheses, so Python had to decide on its own which operator to apply first. Which one did it choose, and why?",
  "simple": "When an expression has several operations, Python must decide which to do first, just like the school rule that multiplication comes before addition. That ordering is called priority, or precedence. When two operations share the same priority, Python usually works left to right, so 10 - 4 - 3 is 3. There are two surprises. Powers (**) are worked out right to left, so 2 ** 3 ** 2 means 2 to the power of 9. And a minus sign written in front of a power is applied after the power, so -2 ** 2 is -4, not 4. Parentheses always win, so when in doubt, add them.",
  "body": [
   "When an expression contains several operators, Python uses priority (also called precedence) to decide which operations happen first, and binding (associativity) to decide the order among operators of the same priority. Parentheses override both, so in your own code, add them whenever the order is not obvious. The exam, however, gives you expressions without helpful parentheses and asks for the result, so you need the table in your head. Python's rules match school arithmetic for the familiar operators, so multiplication still comes before addition, but Python has many more operators, and two of its rules surprise people who learned math on paper.",
   "The order you need for PCEP, from highest to lowest priority, is: `**`; then unary `+`, `-` and `~`; then `*`, `/`, `//` and `%`; then binary `+` and `-`; then the shifts `<<` and `>>`; then `&`; then `^`; then `|`; then the comparison operators (`==`, `!=`, `<`, `<=`, `>`, `>=`, plus `in`, `not in`, `is`, `is not`); then `not`; then `and`; and finally `or`. Assignment operators are not part of expressions at all; they happen last, after the whole right side is known. Parentheses sit above everything in this list, which is why adding them never hurts. You rarely need the position of every unusual operator in everyday coding, but on the exam a single misplaced level changes the answer, so practice reading expressions from the highest level down.",
   "Most operators bind left to right. `10 - 4 - 3` is `(10 - 4) - 3`, which is 3, and `100 / 10 / 5` is 2.0. The notable exception is `**`, which binds right to left. So `2 ** 3 ** 2` is `2 ** (3 ** 2)`, which is `2 ** 9`, or 512, not `8 ** 2`, which would be 64. Operators on the same level, such as `*` and `%`, are simply applied in reading order: `17 % 5 * 2` is `(17 % 5) * 2`, which is 4. Right-to-left binding for `**` matches the way mathematicians read stacked exponents, where the top exponent is applied first.",
   "Unary minus has an unusual relationship with `**`. Because `**` binds more tightly than a unary minus on its left, `-2 ** 2` is `-(2 ** 2)`, which is -4. To square negative two you must write `(-2) ** 2`, which is 4. On the right side of `**`, however, a unary operator applies to the exponent: `2 ** -1` is 0.5. Some course tables list the unary operators above `**`; whatever table you study from, what the interpreter actually does is what the exam checks, and it prints -4 for `-2 ** 2`. Compared with multiplication, unary minus binds tighter: `-3 * 2` is `(-3) * 2`. Here the grouping makes no difference to the value, which is why the `**` case is the one to remember.",
   "```python\nprint(2 ** 3 ** 2)      # 512  (right to left)\nprint(-2 ** 2)          # -4   (** before unary minus)\nprint((-2) ** 2)        # 4\nprint(2 + 3 * 4 ** 2)   # 50   (4**2=16, 3*16=48, 2+48)\nprint(17 % 5 * 2 // 3)  # 1    ((17 % 5) * 2) // 3 = 4 // 3\nprint(1 + 2 < 4 and not 0)  # True\n```",
   "To evaluate a tricky expression, work in passes: first resolve parentheses; then every `**` from right to left; then unary signs; then `*`, `/`, `//` and `%` from left to right; then `+` and `-` from left to right; then shifts and bitwise operators; then comparisons; then `not`, `and` and `or`. Writing each intermediate result down is the most reliable exam technique. In the last line of the code block, `1 + 2` is 3, `3 < 4` is `True`, `not 0` is `True`, and `True and True` is `True`. When a line mixes arithmetic and logic, finish all the arithmetic, then the comparisons, and only then the Boolean operators.",
   "Consider a worked example. A physics script computes a value with `-g ** 2`, where `g` is 9.8, expecting the square of a negative constant to be positive. Because `**` runs before the unary minus, it gets about -96.04. Writing `(-g) ** 2` or simply `g ** 2` fixes the bug. Common mistakes: evaluating `**` left to right, applying the unary minus before `**`, assuming `*` always runs before `/` or `%` (they share a level and go left to right), and forgetting that comparisons come after all arithmetic, so `2 + 3 == 5` is `True` without parentheses.",
   "Exam questions usually say \"What is the output of the following snippet?\" and give one dense line. Clue words: \"priority\" or \"precedence\" means which level wins; \"binding\" or \"associativity\" means the direction within one level; \"right-sided binding\" is the phrase used for `**`. If two answers differ only in whether a negative sign was applied first, the question is testing unary minus against `**`."
  ],
  "analogy": "Operator priority is like boarding groups at an airport gate. Groups board in a fixed order, and within one group passengers board in the order they stand in line, which is left-to-right binding. The ** group is unusual: it boards from the back of its line forward, which is right-to-left binding. Parentheses are a priority pass that puts a sub-expression on first. The comparison stops at unary minus: a minus standing to the left of ** waits until the power has boarded, even though unary operators otherwise rank high.",
  "mnemonic": "PUMA for the top four levels, highest first: Power (**), Unary signs (+x, -x, ~x), Multiplicative (*, /, //, %), Additive (binary + and -). Even so, a minus on the left of ** waits for the power, because ** binds more tightly than a unary operator on its left.",
  "terms": [
   [
    "Priority (precedence)",
    "The rule deciding which operators are applied first in an expression."
   ],
   [
    "Binding (associativity)",
    "The order in which operators of equal priority are applied, usually left to right."
   ],
   [
    "Right-to-left binding",
    "The behavior of **, so a ** b ** c means a ** (b ** c)."
   ],
   [
    "Unary operator",
    "An operator with one operand, such as -x, +x or ~x."
   ],
   [
    "Parentheses",
    "Brackets that force a sub-expression to be evaluated first, overriding priority."
   ]
  ],
  "example": "A physics script computes energy with -g ** 2 expecting a positive square of a negative constant. Because ** runs before the unary minus, it gets a negative result; writing (-g) ** 2 or simply g ** 2 fixes the bug, and the team adds parentheses to every mixed expression to make intent obvious.",
  "mistakes": [
   [
    "2 ** 3 ** 2 is 64 because operators go left to right.",
    "** binds right to left, so it is 2 ** (3 ** 2) = 2 ** 9 = 512."
   ],
   [
    "-2 ** 2 is 4 because the minus belongs to the 2.",
    "** binds more tightly than a unary minus on its left, so it is -(2 ** 2) = -4. Write (-2) ** 2 to get 4."
   ],
   [
    "* always runs before / and %.",
    "*, /, // and % share one level and are applied left to right, so 12 / 2 * 3 is 18.0."
   ],
   [
    "Arithmetic must be wrapped in parentheses before a comparison, as in (2 + 3) == 5.",
    "All arithmetic outranks comparisons, so 2 + 3 == 5 is already True. Parentheses are optional, though they can help readability."
   ]
  ],
  "tryit": [
   [
    "A grading script should give the average of a raw score and a bonus of 10, and a teacher wrote result = raw + 10 / 2. For raw = 70, what does the script compute, and how should the line be written?",
    "/ has higher priority than +, so the script computes 70 + 5.0 = 75.0. The intended average needs parentheses: (raw + 10) / 2, which gives 40.0."
   ]
  ],
  "tip": "Memorize the two exceptions: ** binds right to left, and ** beats a unary minus on its left. Everything else at the same level runs left to right, so %, *, // and / are applied strictly in reading order.",
  "check": [
   [
    "What does print(-3 ** 2) output?",
    "-9, because 3 ** 2 is evaluated before the unary minus."
   ],
   [
    "What is 2 ** 2 ** 3?",
    "256, because ** binds right to left: 2 ** (2 ** 3) = 2 ** 8."
   ],
   [
    "Evaluate 10 - 2 * 3 // 4.",
    "9. 2 * 3 is 6, 6 // 4 is 1, then 10 - 1 is 9."
   ],
   [
    "Evaluate 12 / 2 * 3.",
    "18.0. / and * share a level and bind left to right: 12 / 2 is 6.0, then 6.0 * 3 is 18.0."
   ]
  ]
 },
 {
  "t": "Bitwise operators: ~ & ^ | << >>",
  "hook": "You are the on-call engineer for the door access system at Greenleaf Library. At 2 a.m. an alert fires: a visitor badge just opened the staff room. Badge permissions are stored as one integer, with each bit standing for one door, and a nightly script is supposed to remove staff room access from visitor badges. Last week a colleague changed that line from `perms &= ~4` to `perms ^= 4`, reasoning that both \"turn the bit off.\" The badge had been fine for months. How could one changed operator, acting on bits you cannot even see in the decimal value, unlock a door?",
  "simple": "Every whole number inside a computer is a row of tiny on-off switches called bits. Bitwise operators work on those switches one position at a time instead of on the number as a whole. & keeps a switch on only if it is on in both numbers. | turns it on if it is on in either number. ^ turns it on only where the two numbers differ. ~ flips every switch, which in Python always gives minus the number, minus one. << and >> slide all the switches left or right, which doubles or halves the number for each step. Picture two rows of light switches in a hallway, compared position by position.",
  "body": [
   "Bitwise operators work on the individual binary digits (bits) of integers rather than on their overall values. They only accept integers, including Booleans, which are integers; using them on floats raises `TypeError`. You will meet them in low-level work such as flags, permissions and network masks, and the exam checks that you can compute them by hand. Think of each number as a row of switches, and each operator as a rule for combining the switches column by column. Inside the computer every int is already stored as bits, so these operators are fast and map directly onto what the hardware does.",
   "The binary operators compare two numbers bit by bit. `&` (AND) gives 1 only where both bits are 1. `|` (OR) gives 1 where at least one bit is 1. `^` (XOR, exclusive or) gives 1 where the bits differ. Take 6 (binary 110) and 3 (binary 011): `6 & 3` is 010, which is 2; `6 | 3` is 111, which is 7; `6 ^ 3` is 101, which is 5. Line the numbers up in binary, pad the shorter one with zeros on the left, work column by column, and convert back. With larger numbers such as 12 and 10, write 1100 above 1010 and compare the four columns one at a time. A helpful check for non-negative numbers: `&` can never produce a result larger than the smaller operand, and `|` can never produce one smaller than the larger operand, so `6 & 3` must be at most 3 and `6 | 3` at least 6.",
   "The unary operator `~` (NOT, or bitwise negation) flips every bit. Because Python integers behave like two's complement numbers for negatives, the practical rule is `~x == -x - 1`. So `~6` is -7, `~0` is -1 and `~-1` is 0. Do not confuse `~` with the logical `not`: `not 6` is `False`, while `~6` is -7. Likewise, do not confuse `&` and `|` with the logical `and` and `or`: the bitwise forms always compute a number from both operands, while the logical forms short-circuit and return one of the operands. To see why the rule works, notice that `x + ~x` is always -1, because between them every bit position holds exactly one 1.",
   "The shift operators move bits left or right. `x << n` shifts left by n positions, filling with zeros, which multiplies by 2 to the power n: `6 << 1` is 12 and `1 << 4` is 16. `x >> n` shifts right, dropping the lowest bits, which floor-divides by 2 to the power n: `6 >> 1` is 3 and `13 >> 2` is 3. For negative numbers the right shift still floors, so `-5 >> 1` is -3. Shifts are the classic way to build a mask for a single bit: `1 << 3` is 8, binary 1000, which has only the bit at position 3 set, counting positions from 0 on the right.",
   "```python\na, b = 12, 10               # 1100 and 1010\nprint(a & b, a | b, a ^ b)  # 8 14 6\nprint(~a, a << 2, a >> 2)   # -13 48 3\nflags = 0b0101\nprint(flags & 4 != 0)       # True: bit with value 4 is set\nflags &= ~4                 # clear that bit\nprint(flags)                # 1\n```",
   "Remember their priorities: `~` sits with the unary signs just below `**`; shifts come after `+` and `-`; then `&`, then `^`, then `|`, all above comparisons. So `1 + 2 << 1` is `(1 + 2) << 1`, which is 6, and `5 & 3 == 1` means `(5 & 3) == 1`, which is `True`. A common use is a bit mask: to test whether the bit worth 4 in `flags` is set, check `flags & 4 != 0`; to set it, use `flags |= 4`; to clear it, `flags &= ~4`; to toggle it, `flags ^= 4`.",
   "Consider a worked example. A file permission value `0o755` is checked for owner write access with `(mode & 0o200) != 0`. In binary, `0o755` is 111 101 101 and `0o200` is 010 000 000. The `&` keeps only the bit being tested, so the result is non-zero exactly when owner write permission is set, which it is. To remove group and others' execute rights, the script uses `mode & ~0o011`, producing `0o744`. Common mistakes: working in decimal instead of binary, treating `^` as a power operator (it is XOR; power is `**`), forgetting the `~x == -x - 1` rule, and assuming shifts have higher priority than addition.",
   "Exam questions show short expressions such as `print(9 ^ 5)` or `print(~7)` and ask for the output, or ask which operator sets, clears or tests a flag. Clue words: \"both bits\" means `&`; \"either bit\" means `|`; \"bits differ\" or \"exclusive\" means `^`; \"invert\" or \"negate bits\" means `~`; \"multiply by a power of two\" means `<<`; \"divide by a power of two\" means `>>`. Always answer in decimal unless the code calls `bin()`."
  ],
  "analogy": "Picture two rows of light switches, one row per number, lined up by position. & is a pair of guards who must both say yes before a light turns on; | needs only one guard; ^ turns the light on only when the guards disagree. A shift slides an entire row along by some places. The comparison stops at ~: Python treats a negative number as if it had endless leading 1s, so flipping the switches does not give a small positive number but follows the rule -x - 1.",
  "mnemonic": "Within the bitwise group, priority runs AND, XOR, OR (&, ^, |): \"Ants eXplore Outside.\" All three sit below the shifts and above the comparisons.",
  "terms": [
   [
    "Bitwise AND (&)",
    "Produces 1 in each bit position where both operands have 1."
   ],
   [
    "Bitwise OR (|)",
    "Produces 1 in each bit position where at least one operand has 1."
   ],
   [
    "Bitwise XOR (^)",
    "Produces 1 in each bit position where the operands differ."
   ],
   [
    "Bitwise NOT (~)",
    "Flips all bits; for Python ints ~x equals -x - 1."
   ],
   [
    "Shift (<< >>)",
    "Moves bits left or right, multiplying or floor-dividing by powers of two."
   ],
   [
    "Bit mask",
    "A number used with &, | or ^ to test, set, clear or toggle chosen bits."
   ]
  ],
  "example": "A file permission value 0o755 is checked for owner write access with (mode & 0o200) != 0. The & masks away every bit except the one being tested, so the result is non-zero only if that permission is set. Clearing execute rights for group and others with mode & ~0o011 then produces 0o744.",
  "mistakes": [
   [
    "^ is the power operator.",
    "^ is bitwise XOR. 2 ^ 3 is 1, while 2 ** 3 is 8."
   ],
   [
    "~6 is 1 because flipping 110 gives 001.",
    "Python ints behave like two's complement numbers with unlimited leading bits, so ~x == -x - 1 and ~6 is -7."
   ],
   [
    "& and the keyword and are interchangeable.",
    "& works bit by bit and returns a number; and short-circuits and returns one of its operands. 6 & 3 is 2, but 6 and 3 is 3."
   ],
   [
    "Shifts bind more tightly than + and -.",
    "Shifts come after addition and subtraction, so 1 + 1 << 2 is (1 + 1) << 2, which is 8."
   ]
  ],
  "tryit": [
   [
    "A settings value flags = 0b1010 uses the bit worth 2 to mean notifications are on. A teammate wants to turn notifications off whatever their current state, and proposes flags ^= 2. Is that right, and what is the correct operation?",
    "No. ^= 2 toggles the bit, so it would turn notifications on if they were already off. To clear the bit unconditionally, use flags &= ~2; here flags becomes 0b1000, which is 8."
   ]
  ],
  "tip": "The fastest route through ~ questions is the formula ~x = -x - 1. For &, | and ^, always convert to binary and line up the columns; guessing from decimal values is where mistakes happen. And ^ is XOR, never exponentiation.",
  "check": [
   [
    "What is 5 ^ 3?",
    "6. 101 XOR 011 is 110."
   ],
   [
    "What does ~5 return?",
    "-6, because ~x equals -x - 1."
   ],
   [
    "What is 20 >> 2?",
    "5, the same as 20 // 4."
   ],
   [
    "What is 1 + 1 << 2?",
    "8, because + has higher priority than <<, so it is 2 << 2."
   ]
  ]
 },
 {
  "t": "Boolean and relational operators, float accuracy and rounding surprises",
  "hook": "You support the checkout system at Brightwater Hardware. A cashier, Tom, reports that the exact-change discount never triggers, even when a customer buys two items priced 0.10 and 0.20 and the screen clearly shows 0.30. You open the code and find `if total == 0.3:`, which looks flawless. Another note on your desk says a price of 2.5 was rounded to 2 on a receipt, not 3. Is the computer bad at arithmetic, or is something about how decimal numbers live in memory catching everyone out?",
  "simple": "Comparison operators ask yes-or-no questions about two values: is this equal to that (==), not equal (!=), smaller (<), bigger (>), and so on. The answer is always True or False. You can combine answers with and (both must be true), or (at least one must be true) and not (flip the answer). One surprise: computers store decimal numbers like 0.1 in binary, and most of them cannot be stored exactly, much as one third written as 0.333 is never quite exact. So 0.1 + 0.2 comes out as 0.30000000000000004, and asking whether it equals 0.3 gives False. Compare decimals by checking that they are very close instead.",
  "body": [
   "Relational (comparison) operators compare two values and return a Boolean: `==` equal, `!=` not equal, `<` less than, `>` greater than, `<=` less than or equal, and `>=` greater than or equal. Note that `=` assigns while `==` compares. Numbers of different types compare by value, so `1 == 1.0` is `True` and `True == 1` is also `True`. Strings compare character by character using their character codes, so `\"B\" < \"a\"` is `True` because uppercase letters come before lowercase ones, and `\"apple\" < \"apricot\"` is `True` because `p` comes before `r` at the first difference. Comparing a string with a number using `<` raises `TypeError`, although `==` simply returns `False`. Every comparison produces a `bool`, so you can store it, print it or combine it with other comparisons: `is_adult = age >= 18` is a perfectly ordinary statement.",
   "Python allows chained comparisons: `1 < x < 10` means `1 < x and x < 10`, with `x` evaluated only once. It reads naturally and is often tested. `a == b == c` is `True` only when all three are equal, and `3 < 5 > 4` is legal and `True`, because it means `3 < 5 and 5 > 4`. Chains can be as long as you like; each link is checked in turn, and evaluation stops at the first link that is false.",
   "The logical (Boolean) operators combine conditions. `and` is true only when both sides are true; `or` is true when at least one side is; `not` reverses a single value. Their priority, from highest, is `not`, then `and`, then `or`, all below the comparisons. So `not a == b` means `not (a == b)`, and `a or b and c` means `a or (b and c)`. Both `and` and `or` short-circuit: they stop as soon as the answer is known, which the lesson on truthiness explores. These words must be lowercase: `AND` and `Or` are just undefined names.",
   "Floats are stored in binary with a limited number of bits, so most decimal fractions such as 0.1 cannot be represented exactly. Tiny errors appear: `0.1 + 0.2` prints `0.30000000000000004`, and `0.1 + 0.2 == 0.3` is `False`. This is not a Python bug; it happens in nearly every language that uses standard floating-point numbers. When comparing floats, check whether the difference is tiny, for example `abs(a - b) < 1e-9`, instead of using `==`. For money, many programs avoid floats entirely and count whole cents as integers. Integers never have this problem: Python stores them exactly, however large they get, so `10 ** 20 + 1 == 100000000000000000001` is `True`. The inaccuracy belongs only to floats, and it can build up: adding 0.1 ten times in a loop gives 0.9999999999999999 rather than 1.0, so a loop that waits for a float counter to equal exactly 1.0 might never stop.",
   "```python\nprint(0.1 + 0.2 == 0.3)            # False\nprint(abs(0.1 + 0.2 - 0.3) < 1e-9) # True\nprint(round(2.5), round(3.5))      # 2 4\nprint(round(3.14159, 2))           # 3.14\nprint(int(2.9), int(-2.9))         # 2 -2\nprint(\"B\" < \"a\", 1 == 1.0)         # True True\n```",
   "The built-in `round()` has its own surprise. With one argument it returns an int, rounding exact halves to the nearest even number, a rule called banker's rounding: `round(0.5)` is 0, `round(1.5)` is 2 and `round(2.5)` is 2. With a second argument it rounds to that many decimal places and returns a float, but because of binary representation some values that look like halves are slightly below them, so `round(2.675, 2)` gives 2.67. Also remember that `int()` truncates toward zero instead of rounding: `int(2.9)` is 2 and `int(-2.9)` is -2. For display, rounding is fine; for decisions, compare with a tolerance instead of rounding both sides and hoping they match.",
   "Consider a worked example. A shop script adds items priced 0.1 and 0.2 and checks `if total == 0.3:` to apply a discount. The branch never runs, because `total` is 0.30000000000000004. Changing the test to `abs(total - 0.3) < 1e-9`, or storing prices as whole cents so the check becomes `total == 30`, makes it behave correctly. Common mistakes: writing `=` in a condition (a `SyntaxError`), expecting `round()` to always round halves up, expecting `int()` to round, and thinking `\"10\" < \"9\"` is `False`; as strings, `\"1\"` sorts before `\"9\"`, so it is `True`.",
   "Exam questions in this area ask for the printed result of a comparison, a chained comparison or a `round()` call. Clue words: \"equal to\" means `==`; \"chained\" means an implied `and`; \"float precision\", \"representation error\" or `0.1 + 0.2` means the answer is probably `False` for `==`; \"rounds half to even\" means `round()`. If a snippet compares float sums with `==`, suspect `False`. If it chains comparisons, split them into pairs joined by `and` before deciding."
  ],
  "analogy": "Storing 0.1 as a float is like marking a third of a meter on a ruler that shows only millimeters: you get 333 mm, close but never exactly a third. Lay three of those end to end and you reach 999 mm, not one meter. Demanding == is like insisting the mark be exactly a third; checking that the difference is under a millimeter is the tolerance test. The comparison stops at which numbers are awkward: in binary, even 0.1, which looks simple in decimal, cannot be stored exactly.",
  "mnemonic": "Logical priority, highest first: Not, And, Or, remembered as \"Never Assume Order.\" All three come after every comparison, so a == b and c > d needs no parentheses.",
  "terms": [
   [
    "Relational operator",
    "An operator such as ==, != or <= that compares two values and returns True or False."
   ],
   [
    "Chained comparison",
    "An expression such as 0 <= x < 5, equivalent to two comparisons joined by and."
   ],
   [
    "Logical operator",
    "and, or or not, used to combine or invert Boolean conditions."
   ],
   [
    "Floating-point error",
    "The small inaccuracy caused by storing decimal fractions in binary, as in 0.1 + 0.2."
   ],
   [
    "Banker's rounding",
    "round()'s rule of sending exact halves to the nearest even integer."
   ],
   [
    "Tolerance comparison",
    "Testing floats with abs(a - b) < small_value instead of ==."
   ]
  ],
  "example": "A shop script checks if total == 0.3 after adding items of 0.1 and 0.2 and never takes the discount branch. Changing the test to abs(total - 0.3) < 1e-9, or working in whole cents as ints, makes it behave correctly, and the receipt uses round(total, 2) only for display.",
  "mistakes": [
   [
    "0.1 + 0.2 == 0.3 is True.",
    "Binary floating point cannot store these values exactly, so the sum is 0.30000000000000004 and == returns False. Compare with abs(a - b) < 1e-9."
   ],
   [
    "round(2.5) is 3 because halves always round up.",
    "round() sends exact halves to the nearest even integer, so round(2.5) is 2 and round(3.5) is 4."
   ],
   [
    "int(2.9) rounds to 3.",
    "int() truncates toward zero, so int(2.9) is 2 and int(-2.9) is -2."
   ],
   [
    "\"10\" < \"9\" is False because 10 is bigger than 9.",
    "Strings compare character by character, and \"1\" comes before \"9\", so it is True."
   ]
  ],
  "tryit": [
   [
    "A sensor script adds 0.1 to a level variable in a loop that starts at 0 and stops with while level != 1.0. Testers report the loop never ends. Why, and how should it be written?",
    "Ten additions of 0.1 give 0.9999999999999999, not exactly 1.0, so level != 1.0 stays true and the loop runs past 1.0 forever. Use a condition that does not need exact equality, such as while level < 1.0 - 1e-9, or better, count steps with an int and compute the level from the count."
   ]
  ],
  "tip": "If an exam snippet compares float sums with ==, suspect False. If it calls round() on a .5 value, remember round-half-to-even: round(2.5) is 2 and round(3.5) is 4.",
  "check": [
   [
    "What does print(3 < 5 > 4) output?",
    "True. It is 3 < 5 and 5 > 4, and both are true."
   ],
   [
    "What is round(4.5)?",
    "4, because exact halves round to the nearest even integer."
   ],
   [
    "How is not 1 == 2 grouped?",
    "As not (1 == 2), because comparisons have higher priority than not; the result is True."
   ],
   [
    "What does \"abc\" == 3 return, and what does \"abc\" < 3 do?",
    "== returns False; < raises TypeError because a str and an int cannot be ordered."
   ]
  ]
 },
 {
  "t": "Type casting with int(), float(), str() and bool()",
  "hook": "You are helping Grace, the volunteer coordinator at Oakridge Food Pantry, with a sign-up script. Volunteers type their age and whether they want weekend shifts, and the script decides who may lift heavy boxes. Yesterday the script crashed when someone typed their age as 17.5. Today every volunteer is marked as wanting weekend shifts, including the ones who typed no. Grace suspects the computer is ignoring people. Both bugs share one root cause: values in the wrong type, converted the wrong way. Which conversion function fixes each one, and which function is the trap?",
  "simple": "Python keeps track of what kind of value everything is: whole number, decimal number, text, or true and false. Sometimes you need to change one kind into another. int() makes a whole number, float() makes a decimal number, str() makes text, and bool() makes True or False. For example, int(\"42\") turns the text 42 into a number you can do math with. Two surprises: int(3.9) gives 3 because it simply chops off the decimal part instead of rounding. And bool() says True for any text that is not empty, even the word \"False\". It is like a scale that only checks whether the bag has anything in it, not what is written on the label.",
  "body": [
   "Type casting (type conversion) means creating a value of one type from a value of another. Python does some conversions automatically, for example turning an int into a float when you add `2 + 0.5`, but it never silently turns a string into a number or a number into a string. For those you call a conversion function: `int()`, `float()`, `str()` or `bool()`. Each returns a new value; the original is unchanged, so `x = \"5\"` followed by `int(x)` on its own line leaves `x` a string unless you assign the result, as in `x = int(x)`. You need casting most often at the edges of a program, where data arrives as text from a keyboard or a file and has to become a number before you can calculate with it.",
   "`int(x)` builds an integer. From a float it truncates toward zero, dropping the fractional part rather than rounding: `int(3.9)` is 3 and `int(-3.9)` is -3. From a string it accepts only text that looks like a whole number, optionally with a sign and surrounding spaces: `int(\" 42 \")` is 42, but `int(\"4.2\")` and `int(\"abc\")` raise `ValueError`. From a Boolean, `int(True)` is 1. With a second argument it reads other bases: `int(\"1f\", 16)` is 31. Truncation and rounding agree for positive numbers with a fraction below one half but differ above it: `int(2.7)` is 2, while `round(2.7)` is 3.",
   "`float(x)` builds a float. `float(7)` is 7.0, `float(\"3.5\")` is 3.5, `float(\"1e3\")` is 1000.0 and `float(\" -2 \")` is -2.0. Non-numeric text raises `ValueError`. To turn the string `\"4.2\"` into an int, go through float first: `int(float(\"4.2\"))` gives 4. `str(x)` produces the text that `print()` would show: `str(10)` is `\"10\"`, `str(2.50)` is `\"2.5\"`, `str(True)` is `\"True\"` and `str(None)` is `\"None\"`. It is how you join numbers into messages with `+`. Casting also works between the types you already know in less obvious ways: `float(True)` is 1.0, `int(False)` is 0, and `str(1e3)` is `\"1000.0\"`, because the float is converted to its printed form. Calling `str()` on a string simply returns the same text, and calling `int()` on an int returns the same number, so conversions are safe to repeat.",
   "`bool(x)` applies Python's truthiness rules. It returns `False` for zero values and empty things: `0`, `0.0`, `\"\"` (the empty string), `[]`, `()`, `{}` and `None`. Everything else is `True`, including negative numbers, `\" \"` (a single space) and the string `\"False\"`, because that string is not empty. Note that `bool()` looks only at emptiness or zero, never at what the text says, so it cannot tell you whether a user typed yes or no. To turn such text into a Boolean, compare it: `answer.lower() == \"yes\"` returns a real `True` or `False`. You will use `bool()` rarely in code, but understanding it explains every `if` and `while` condition, because Python applies exactly the same rules there. With no argument, `bool()` is `False`, `int()` is 0, `float()` is 0.0 and `str()` is `\"\"`.",
   "```python\nprint(int(7.99), int(\"-12\"), float(\"2\"))  # 7 -12 2.0\nprint(str(3) + str(4))                    # 34\nprint(int(str(3) + str(4)) + 1)           # 35\nprint(bool(\"False\"), bool(0.0), bool(-1)) # True False True\nprint(int(float(\"4.8\")))                  # 4\n```",
   "Two errors come up constantly, and the exam asks you to tell them apart. `ValueError` means the argument has an acceptable type but unusable content, such as `int(\"ten\")` or `float(\"12a\")`. `TypeError` means the type itself is not accepted, such as `int([1, 2])` or `int(None)`. Implicit conversion between int and float happens only inside arithmetic, and Python never converts implicitly between numbers and strings, which is why `\"5\" + 5` is a `TypeError` rather than 10 or `\"55\"`. A quick way to decide between them: first ask whether the function accepts that type at all. If not, it is `TypeError`; if it does but the content is unusable, it is `ValueError`.",
   "Consider a worked example. A form collects a height as the text `\"1.82\"`. `int(\"1.82\")` crashes with `ValueError`, so the program uses `h = float(\"1.82\")` for calculations. To display it in centimeters it computes `round(h * 100)`, which is 182, and builds the message `str(182) + \" cm\"`. A second field stores a yes or no answer, and the programmer writes `bool(answer)`, expecting `bool(\"no\")` to be `False`. It is `True`, because any non-empty string is truthy; the correct check is `answer == \"yes\"`. Notice that the message needed `str()` only because it was built with `+`; printing the number with commas would have converted it automatically.",
   "Common mistakes: expecting `int()` to round; expecting `int(\"3.0\")` to work; treating `bool(\"0\")` or `bool(\"False\")` as false; and forgetting to assign the converted value back to a variable. Exam clue words: \"truncates\" means `int()` on a float; \"empty\" or \"zero\" means falsy for `bool()`; \"cannot convert string\" means `ValueError`; \"unsupported type\" means `TypeError`. Predict the type first, then the value. A good habit when practicing in the REPL is to call `type()` on every converted value until the rules feel automatic."
  ],
  "analogy": "Casting is like a currency exchange desk. Hand over euros, ask for dollars, and you receive a new amount; your original euros are untouched, just as int(x) leaves x alone unless you assign the result. The desk politely refuses play money, like ValueError for int(\"ten\"), and refuses a library card outright, like TypeError for int(None). The comparison stops at rounding: a cashier might round to the nearest coin, but int() always drops the fraction toward zero.",
  "terms": [
   [
    "Type casting",
    "Explicitly converting a value to another type with a function such as int() or str()."
   ],
   [
    "Implicit conversion",
    "Automatic promotion of an int to a float when the two are mixed in arithmetic."
   ],
   [
    "Truncation",
    "Dropping the fractional part toward zero, as int() does with floats."
   ],
   [
    "Truthiness",
    "The rule bool() uses: zero, empty and None are False; everything else is True."
   ],
   [
    "ValueError",
    "Raised when a conversion function gets an acceptable type but an unusable value, such as int(\"3.7\")."
   ],
   [
    "TypeError",
    "Raised when an operation or function receives a value of an unsupported type, such as int(None)."
   ]
  ],
  "example": "A form collects a height as the text \"1.82\". int(\"1.82\") crashes with ValueError, so the program uses float(\"1.82\") for calculations and str(round(h * 100)) + \" cm\" to display it. A yes or no field checked with bool(answer) is always True for non-empty text, so the program compares answer == \"yes\" instead.",
  "mistakes": [
   [
    "int(3.9) is 4.",
    "int() truncates toward zero, so int(3.9) is 3 and int(-3.9) is -3. Use round() when you want rounding."
   ],
   [
    "int(\"3.5\") gives 3.",
    "int() cannot parse a string with a decimal point and raises ValueError. Use int(float(\"3.5\"))."
   ],
   [
    "bool(\"False\") and bool(\"0\") are False.",
    "Any non-empty string is truthy, so both are True. Only the empty string \"\" is False."
   ],
   [
    "Writing int(x) on its own line converts x.",
    "Conversion returns a new value. Without x = int(x), x keeps its original type."
   ]
  ],
  "tryit": [
   [
    "A quiz app reads a saved score as the text score = \"8.0\" and must add 2 points and show a whole number. A teammate writes int(score) + 2. What happens, and what is a correct expression?",
    "int(\"8.0\") raises ValueError, because int() rejects text containing a decimal point. Convert through float first: int(float(score)) + 2 gives 10."
   ]
  ],
  "tip": "int() never rounds; it truncates toward zero, and it refuses strings containing a decimal point. bool() of any non-empty string, even \"0\" or \"False\", is True.",
  "check": [
   [
    "What does int(-2.7) return?",
    "-2, because int() truncates toward zero."
   ],
   [
    "What is bool(\"0\")?",
    "True, since the string is not empty."
   ],
   [
    "Which error does float(\"12a\") raise?",
    "ValueError: the argument is a string (an acceptable type) but its content is not a number."
   ],
   [
    "What does int(None) raise, and why is it different?",
    "TypeError, because None is not a type int() accepts at all, rather than an acceptable type with bad content."
   ]
  ]
 },
 {
  "t": "Console I/O: print() with sep= and end=, input() returning a string, converting input to numbers",
  "hook": "You are the only programmer at Sunfield Animal Shelter, and the front desk logs donations with a small console script. Mia at the desk sends you a photo of the screen: a donor gave 20 and then 5, and the running total reads 205. In the same photo, the thank-you message sits on its own line below the amount instead of beside it. Nothing crashed, and all the data is there. What is the script doing with the text it reads and writes, and which small arguments control where each character lands?",
  "simple": "print() shows things on the screen, and input() asks the user to type something. By default print() puts a space between the items you give it and moves to a new line at the end, but you can change both: sep sets what goes between items, and end sets what goes after the last one. input() waits until the user presses Enter and always gives you back text, even if they typed a number. So if someone types 5, Python receives the text \"5\", like a number written on a note, not an amount of money. To do math with it, wrap the call: int(input()) turns it into a real number.",
  "body": [
   "Console programs talk to the user through two built-in functions: `print()` for output and `input()` for input. Both show up constantly in PCEP questions, usually as \"what exactly is printed?\", so small details such as spaces and line breaks matter. The console, also called the terminal or standard output, is simply the text window where your script runs. Almost every exam snippet ends in a `print()` call, so reading output exactly, character by character, is a skill you will use in every domain, not only this one.",
   "`print()` accepts any number of positional arguments of any type. It converts each one to text, as `str()` would, joins them with a separator, and adds an ending. By default the separator is a single space and the ending is a newline, so `print(\"a\", 1, True)` prints `a 1 True` followed by a line break. Calling `print()` with no arguments prints just an empty line. `print()` itself returns `None`, so `x = print(\"hi\")` prints hi and leaves `x` equal to `None`. Because each argument passes through `str()`, a float written as 2.50 appears as 2.5 and a Boolean appears as True, exactly as `str()` would render them.",
   "Two keyword arguments change that behavior. `sep=` sets the string placed between arguments: `print(1, 2, 3, sep=\"-\")` prints `1-2-3`, and `sep=\"\"` removes the spaces. `end=` sets what is printed after the last argument: `print(\"Hi\", end=\"\")` prints without moving to a new line, so the next print continues on the same line. These must be passed by keyword, and they must come after the positional arguments; `print(sep=\"-\", 1, 2)` is a `SyntaxError`. The separator only goes between arguments, so with one argument `sep` has no visible effect. Escape sequences also shape output: `\\n` inside a string starts a new line and `\\t` inserts a tab. Both `sep` and `end` must be strings (or `None`, which means the default); passing a number such as `sep=0` raises `TypeError`. Because `print()` converts every argument itself, you can print numbers and strings together with commas, as in `print(\"Total:\", 42)`, without calling `str()`; you only need `str()` when you join pieces with `+`.",
   "```python\nprint(\"a\", \"b\", sep=\"*\", end=\"!\\n\")  # a*b!\nprint(\"x\", end=\" \")\nprint(\"y\")                           # x y\nprint(\"one\\ntwo\")                    # two lines\nprint(1, 2, 3, sep=\", \")             # 1, 2, 3\n```",
   "`input()` pauses the program, optionally displaying a prompt string you pass (`input(\"Name: \")`), and waits for the user to press Enter. It returns everything they typed, without the trailing newline, as a string. It always returns a `str`, even if the user types digits. That is the source of many bugs: `age = input(\"Age: \")` followed by `age + 1` raises `TypeError`, and `input() * 2` repeats the text rather than doubling a number. If the user just presses Enter, `input()` returns the empty string `\"\"`. The prompt is printed without a newline, so the cursor waits on the same line; that is why prompts usually end with a colon and a space, as in `\"Name: \"`. The prompt must be a single value: `input(\"Age\", \":\")` raises `TypeError` because, unlike `print()`, `input()` takes at most one argument.",
   "To get numbers, wrap the call in a conversion function: `age = int(input(\"Age: \"))` or `price = float(input(\"Price: \"))`. The inner call runs first and returns a string, and the outer call converts it. If the user types something that cannot be converted, such as `abc`, or `3.5` for `int()`, a `ValueError` is raised, which you can handle with try-except once you reach the exceptions domain. Because `input()` always returns text, it is good practice to convert right where the value is read, so the rest of the program can treat it as a number.",
   "Consider a worked example. A tip calculator runs `bill = float(input(\"Bill: \"))` and `pct = int(input(\"Tip %: \"))`. The user enters 40 and 15. The program then runs `print(\"Tip:\", round(bill * pct / 100, 2), end=\" dollars\\n\")`, which shows `Tip: 6.0 dollars` on one line. Earlier, a draft used `a = input()` and `b = input()` and printed `a + b`; with inputs 2 and 3 it showed `23`, because two strings were concatenated. Converting both with `int()` makes it show 5.",
   "Common mistakes: forgetting that `sep` goes only between arguments; placing `end` text before the output instead of after; expecting `input()` to return an int; and counting spaces wrongly when a string already ends with a space and `sep` adds another. Exam clue words: \"separator\" means `sep=`; \"stay on the same line\" means `end=\"\"` or `end=\" \"`; \"always returns a string\" means `input()`. When a question uses `input()`, assume a string until you see `int()` or `float()`, then write the output character by character. Mark each space and line break explicitly on scrap paper."
  ],
  "analogy": "print() works like a label maker. You feed it items, and it automatically puts a spacer between them (sep) and cuts the tape after the last one (end, a newline by default). Change the spacer and the items join differently; set end to an empty string and the next label continues on the same strip. input() is a mail slot: whatever comes through is always paper with writing on it, even when the writing is a number. The comparison stops at the return value: print() returns None, so there is no label you can keep and reuse.",
  "terms": [
   [
    "print()",
    "Built-in that writes its arguments, converted to text, to the console, separated by sep and followed by end."
   ],
   [
    "sep=",
    "print() keyword argument giving the string inserted between arguments; the default is a single space."
   ],
   [
    "end=",
    "print() keyword argument giving the string printed after the last argument; the default is a newline."
   ],
   [
    "input()",
    "Built-in that reads one line from the user and always returns it as a string."
   ],
   [
    "Prompt",
    "The optional string passed to input() and shown before the user types."
   ],
   [
    "Escape sequence",
    "A backslash combination such as \\n or \\t that stands for a special character in a string."
   ]
  ],
  "example": "A tip calculator asks bill = float(input(\"Bill: \")) and pct = int(input(\"Tip %: \")), then prints print(\"Tip:\", round(bill * pct / 100, 2), end=\" dollars\\n\") so the result reads naturally on one line. An earlier draft that added the two raw inputs printed 4015 instead of doing arithmetic.",
  "mistakes": [
   [
    "input() returns a number when the user types digits.",
    "input() always returns a str. Convert with int() or float() before doing arithmetic."
   ],
   [
    "sep is also printed after the last item.",
    "sep goes only between arguments; end is printed once, after the last argument."
   ],
   [
    "print(sep=\"-\", 1, 2) works because argument order does not matter.",
    "Positional arguments must come before keyword arguments, so this is a SyntaxError."
   ],
   [
    "input(\"Age\", \":\") shows a two-part prompt, like print().",
    "input() accepts at most one argument, so this raises TypeError."
   ]
  ],
  "tryit": [
   [
    "A countdown script must print 3 2 1 Go on a single line with spaces between. It uses a loop that calls print() once for each number, then a final print(\"Go\"), and right now each value appears on its own line. Which argument fixes it, and what value should it have?",
    "Pass end=\" \" to the print() inside the loop, so each number is followed by a space instead of a newline. The final print(\"Go\") keeps the default end, so the line finishes with a newline: 3 2 1 Go."
   ]
  ],
  "tip": "When a question uses input(), assume a string until you see int() or float(). With print(), count separators carefully: sep appears only between arguments, and end appears once, at the very end.",
  "check": [
   [
    "What does print(1, 2, sep=\"\", end=\"3\") followed by print(4) display?",
    "1234 on one line, then a newline: 12 from the first call with no separator, 3 as its ending, then 4 from the second call."
   ],
   [
    "If the user types 5, what does print(input() * 2) show?",
    "55, because input() returns the string \"5\" and * replicates it."
   ],
   [
    "What does int(input()) do when the user types 7.0?",
    "It raises ValueError, because int() cannot parse a string containing a decimal point."
   ],
   [
    "What does print(\"a\", \"b\", sep=\"\\n\") output?",
    "a and b on two separate lines, because the separator between them is a newline."
   ]
  ]
 },
 {
  "t": "If, if-else and if-elif-else statements, and why the order of elif conditions matters",
  "hook": "You have just joined the small developer team at Marlow Lane Freight, and the first ticket in your queue is angry. A customer shipped a 30 kg crate of machine parts and was charged the parcel rate, a fraction of the freight price. Accounting wants to know how many other crates slipped through. You open the pricing script and find four tidy lines: an `if`, two `elif` branches and an `else`. Nothing crashes, nothing logs an error, and every test the previous developer wrote still passes. Yet somewhere in those few lines, a heavy crate is being treated like a small box. How can code that looks perfectly reasonable send the wrong answer every single time?",
  "simple": "A program often has to choose between different actions, the way you choose what to wear by checking the weather. Python does this with `if`: if something is true, do this. Adding `else` means otherwise, do that instead. When there are more than two choices, `elif` (short for else if) lets you list extra questions. Python asks the questions from top to bottom and stops at the first one that gets a yes. Only that one action happens. Imagine sorting mail: if it weighs over 20 kg it is freight, else if it weighs over 5 kg it is a parcel, otherwise it is a letter. If you asked the over 5 kg question first, a heavy crate would answer yes to it and be called a parcel, and you would never even ask about freight.",
  "body": [
   "Conditional statements let a program choose what to do based on data. Without them, every program would do exactly the same thing every time, whatever its input. The simplest form is `if`: a header line made of the keyword, a condition and a colon, followed by an indented block. If the condition is true, the block runs; if not, Python skips the whole block and carries on with the first statement after it. A typical header looks like `if temperature > 30:`, and the indented lines below it, conventionally four spaces in, form the body that depends on that test.",
   "Adding `else` turns a one-way choice into a two-way choice. The `else:` line sits at the same indentation as its `if` and has no condition of its own; its block runs exactly when the `if` condition is false. That gives a firm guarantee: one of the two blocks always runs, never both and never neither. Writing a condition after `else`, as in `else x > 5:`, is a `SyntaxError`, because `else` means everything that was not already caught. The `if` and `else` blocks may contain any statements, including further conditionals and loops, so the structure scales up to real decisions.",
   "For more than two paths, use `elif`, short for else if. Python tests the `if` condition first, then each `elif` condition in order from top to bottom. As soon as one condition is true, its block runs and the whole statement is finished; no later conditions are even evaluated. An optional final `else` catches every case where nothing matched. You can have any number of `elif` branches but at most one `else`, and it must come last. An `elif` cannot appear without an `if` before it at the same indentation, and an `elif` placed after the `else` is a syntax error. Without a final `else`, it is possible for none of the blocks to run.",
   "```python\nscore = 85\nif score >= 90:\n    grade = \"A\"\nelif score >= 80:\n    grade = \"B\"   # this runs; the rest are skipped\nelif score >= 70:\n    grade = \"C\"\nelse:\n    grade = \"F\"\nprint(grade)      # B\n```",
   "Because only the first true branch runs, the order of `elif` conditions matters whenever conditions overlap. In the grading example, a score of 95 also satisfies `score >= 80` and `score >= 70`, but it gets an A because that test comes first. If you reversed the order and checked `score >= 70` first, every passing score would get a C and the A and B branches would never be reachable. Those are called unreachable branches: code that exists in the file but can never run. The rule of thumb with overlapping ranges is to test the most specific or most restrictive condition first. When the conditions cannot overlap, such as `x == 1` and `x == 2`, the order changes only efficiency, not results.",
   "Ranges can also be written with chained comparisons, as in `elif 80 <= score < 90:`. Each branch then describes its full range, which makes the result independent of the order, at the cost of more typing and more chances to leave a gap, for example forgetting what happens at exactly 90. Many programmers prefer the shorter form that relies on order, so the exam expects you to read both styles and reach the same answer either way.",
   "Compare an `if-elif` chain with a series of separate `if` statements. Each independent `if` is tested on its own, so several blocks can run. With `if` followed by `elif`, at most one block runs; with `if` followed by `if`, every true condition runs its block. Conditions do not have to be comparisons: any expression works, and Python uses its truthiness, so `if items:` means if the list is not empty. A short body may be written on the header line, as in `if x: print(x)`, though PEP 8 (Python Enhancement Proposal 8, the official style guide) discourages that because it is harder to read.",
   "Consider a worked example. A shipping script checks `weight > 20` for freight, then `elif weight > 5` for a parcel, `else` a letter. A 30 kg crate matches the first test and is sent as freight. A developer then reorders the branches and puts `weight > 5` first; now the crate matches that test, is charged as a parcel, and the freight branch is never reached for any weight. Another developer rewrites the chain as three separate `if` statements; now the crate is labeled freight and then relabeled parcel, because both blocks run and the second assignment overwrites the first. Two different edits, two different bugs, and neither one produces an error message.",
   "Common mistakes are worth listing because the exam builds distractors from them: forgetting the colon after a condition; indenting `else` differently from its `if`; putting a broad condition before a narrow one; writing `if x = 5:` (assignment instead of comparison, a `SyntaxError`); and assuming `else` pairs with the nearest `if` regardless of indentation. Exam questions typically show a chain and a value and ask what prints, or ask how many lines appear. Clue words help: first true condition means an `elif` chain stops early; unreachable branch means a broader test sits above a narrower one; all that apply in code form means separate `if` statements. When tracing, write the value at the top, test each condition in order, and stop at the first true one."
  ],
  "analogy": "An if-elif-else chain works like a hospital triage desk with a checklist read from the top. The nurse asks the most urgent question first: is the patient not breathing? Then: is there heavy bleeding? The first yes decides the room, and the nurse stops asking. If the checklist started with a broad question such as does the patient feel unwell, almost everyone would answer yes and be sent to the general waiting room, including the emergencies. The analogy stops working in one way: a real nurse might notice a later problem anyway, while Python truly never evaluates the later conditions.",
  "terms": [
   [
    "if statement",
    "Runs its indented block only when its condition is true."
   ],
   [
    "elif",
    "An extra condition tested only if all earlier conditions in the same statement were false."
   ],
   [
    "else",
    "The branch that runs when no earlier if or elif condition was true; it takes no condition."
   ],
   [
    "Condition",
    "Any expression whose truthiness decides whether a block runs."
   ],
   [
    "Overlapping conditions",
    "Conditions that can be true at the same time, which makes the order of elif branches significant."
   ],
   [
    "Unreachable branch",
    "A branch that can never run because an earlier condition always catches its cases."
   ],
   [
    "Chained comparison",
    "An expression such as 80 <= score < 90 that tests a full range in one condition."
   ]
  ],
  "example": "A shipping script checks weight > 20 for freight, then weight > 5 for a parcel, else a letter. If a developer moves the weight > 5 test first, a 30 kg crate is charged as a parcel, because the first true branch wins and the freight branch is never reached. Splitting the chain into separate if statements causes a different bug: both blocks run and the last one wins.",
  "mistakes": [
   [
    "Python checks every elif and runs all the ones that are true.",
    "Only the first true branch in an if-elif-else chain runs; the remaining conditions are not even evaluated. Several blocks can run only with separate if statements."
   ],
   [
    "The order of elif branches never changes the result.",
    "It changes the result whenever conditions overlap. Put the narrowest or most restrictive test first, such as score >= 90 before score >= 80."
   ],
   [
    "else can take its own condition, like else x > 5:.",
    "else never has a condition; writing one is a SyntaxError. Use elif when you need another test."
   ],
   [
    "An else belongs to the closest if above it.",
    "It belongs to the if at the same indentation in the same block, whatever lies between them."
   ]
  ],
  "tryit": [
   [
    "A ticket script sets price by age: if age >= 13 the price is 10, elif age >= 65 the price is 6, else the price is 4. A 70-year-old customer complains about paying 10. What is wrong, and how would you fix it?",
    "The conditions overlap and the broad test age >= 13 comes first, so a 70-year-old matches it and the senior branch is unreachable. Test age >= 65 first, then age >= 13, then else. Alternatively write each branch as a full range, such as 13 <= age < 65."
   ],
   [
    "With n = 12, one program uses if n > 10: print(\"big\") followed by a separate if n > 5: print(\"medium\"). Another uses if n > 10 with elif n > 5. How many lines does each print?",
    "The first prints two lines, big and medium, because separate if statements are tested independently. The second prints only big, because the elif is skipped once the first condition is true."
   ]
  ],
  "tip": "Count how many branches can run. An if-elif-else chain runs exactly one block (or none without else); a stack of separate ifs can run several. That single distinction answers many PCEP output questions.",
  "check": [
   [
    "With x = 15, what does if x > 10: print(\"A\") elif x > 5: print(\"B\") print?",
    "Only A. The first true branch runs and the elif is not evaluated."
   ],
   [
    "Can an if statement have two else clauses?",
    "No. It may have many elif branches but at most one else, which must be last."
   ],
   [
    "Why check score >= 90 before score >= 80?",
    "Because the ranges overlap; testing >= 80 first would capture scores of 90 and above and the A branch would never run."
   ],
   [
    "With x = 15, how many lines do if x > 10: print(\"A\") and a separate if x > 5: print(\"B\") print?",
    "Two, A and B, because separate if statements are each tested independently."
   ]
  ]
 },
 {
  "t": "Multiple conditions with and, or and not; truthy and falsy values",
  "hook": "It is Monday morning at Fernhill Community Library, and Jonah, the volunteer who maintains the member portal, has a worried message for you. Over the weekend, ordinary members were able to open the staff page that edits book records. Nobody was given new permissions. The only change was one line he added on Friday to let editors in as well as admins: `if role == \"admin\" or \"editor\":`. It reads like plain English, and it ran without a single error. Yet it seems to have opened the door for everyone. How can a condition that sounds exactly right be true for every person who logs in?",
  "simple": "Sometimes a decision depends on more than one fact. Python joins facts with three words. `and` means both must be true, like needing a ticket and an ID to board a plane. `or` means at least one must be true, like being allowed in on Saturday or Sunday. `not` flips a fact from true to false or back. Python also treats ordinary values as yes or no. Empty things and zero count as no (called falsy): an empty box of chocolates is a no. Anything with something in it counts as yes (called truthy), even a box holding a single wrapper. Finally, `and` and `or` are lazy: they stop checking as soon as they know the answer, and they hand back one of the actual values they looked at, not always a plain True or False.",
  "body": [
   "Real decisions often depend on more than one fact, so Python lets you combine conditions with the logical operators `and`, `or` and `not`. The expression `a and b` is true only when both are true. The expression `a or b` is true when at least one is true. The expression `not a` flips a value. For example, `if age >= 18 and has_ticket:` requires both facts, while `if day == \"Sat\" or day == \"Sun\":` accepts either one. These are keywords, written in lower case; the symbols `&&`, `||` and `!` from other languages are not valid Python and produce a `SyntaxError`.",
   "Priority matters when operators are mixed. Python applies `not` first, then `and`, then `or`, and all three come after the comparison operators such as `==` and `<`. So `a or b and c` means `a or (b and c)`, and `not x > 3` means `not (x > 3)`. Use parentheses when you mix `and` and `or` so the reader does not have to remember the table. De Morgan's laws help you simplify negations: `not (a and b)` equals `not a or not b`, and `not (a or b)` equals `not a and not b`. In words, the opposite of both is at least one missing, and the opposite of either is neither.",
   "Every value in Python can be used as a condition, not only `True` and `False`. Values that count as false are called falsy: `False`, `None`, `0`, `0.0`, the empty string `\"\"`, and empty collections such as `[]`, `()`, `{}` and `range(0)`. Everything else is truthy, including negative numbers, the string `\"0\"`, the string `\" \"` containing a space, and a list containing `[0]`. That is why `if name:` is a common way to check that a string is not empty. You can confirm any value's truthiness with `bool()`: `bool([0])` is `True` because the list has one element, even though that element is zero. Truthiness is decided by the whole value, not by what it contains.",
   "The operators `and` and `or` short-circuit, and they return one of their operands, not necessarily a Boolean. `a and b` evaluates `a`; if `a` is falsy it returns `a` immediately without evaluating `b`; otherwise it returns `b`. `a or b` evaluates `a`; if `a` is truthy it returns `a`; otherwise it returns `b`. Only `not` always returns a real `True` or `False`. When an `if` statement uses such an expression, the returned value is simply judged for truthiness, so the difference is invisible; it becomes visible the moment you print or store the result.",
   "```python\nprint(0 and 5)       # 0   (first falsy value)\nprint(3 and 5)       # 5   (all truthy: last value)\nprint(\"\" or \"guest\") # guest\nprint(not [])        # True\nprint(None or 0)     # 0   (nothing truthy: last value)\nprint(1 or 2 and 0)  # 1   (1 or (2 and 0))\n```",
   "Short-circuiting is useful for safety. In `if n != 0 and total / n > 2:`, the division only happens when `n` is not zero, so no `ZeroDivisionError` can occur. Swap the two sides and the program can crash, because the division is evaluated first. Likewise `name = user_input or \"guest\"` supplies a default when the input is empty. Keep in mind that a default via `or` also replaces other falsy values: `count = entered or 10` turns a genuine 0 into 10, which may not be what you want. Short-circuiting also means a function call on the right side may never run, which matters if that call prints something or changes a variable.",
   "Consider a worked example. A login form uses `display = nickname or email`. If the user left the nickname blank, the empty string is falsy, so `display` becomes the email address; otherwise the nickname is shown, with no `if` statement needed. The same form checks `if password and len(password) >= 8:`; when the password is empty the length is never measured. A colleague adds `if role == \"admin\" or \"editor\":` to grant access, and suddenly everybody gets in. Python parses it as `(role == \"admin\") or \"editor\"`, and the non-empty string `\"editor\"` is truthy, so the condition is always true. The fix is `role == \"admin\" or role == \"editor\"`, or the shorter membership test `role in (\"admin\", \"editor\")`.",
   "Common mistakes include that last one, `x == 1 or 2`; assuming `and` and `or` always return `True` or `False`; thinking `\"0\"` or `\"False\"` is falsy; and forgetting that `not` binds more loosely than `==`, so `not a == b` means `not (a == b)`. Exam questions often print the result of an `and` or `or` expression directly. Clue words: short-circuit means the right side may not run; falsy means zero, empty or `None`; returns the operand means the answer may be a number or string rather than a Boolean. When you see `print(a or b)`, answer with a value, not automatically `True`. A reliable method is to evaluate left to right, stopping as soon as the result is decided, and write down the operand where you stopped."
  ],
  "analogy": "Think of `or` as a friend looking for a pen in your bag: they pull out items one by one and hand you the first one that works, without checking the rest. If nothing works, you get the last thing they touched. `and` is a safety inspector walking down a checklist who stops and hands you the first failed item; if everything passes, you get the last item checked. The analogy stops short in one place: in Python, what you get back is the actual operand, which only matters when you print or store it.",
  "mnemonic": "Precedence order for the logical operators is N-A-O: Not, then And, then Or. Say it as one word, NAO (like now), and read it from tightest to loosest. All three are weaker than comparisons, so comparisons are done before any of them.",
  "terms": [
   [
    "Truthy",
    "Any value that counts as true in a condition, such as non-zero numbers and non-empty collections."
   ],
   [
    "Falsy",
    "A value that counts as false: False, None, zero and empty strings or collections."
   ],
   [
    "Short-circuit evaluation",
    "and and or stop evaluating as soon as the result is known."
   ],
   [
    "Logical operator",
    "and, or or not, used to combine or invert conditions."
   ],
   [
    "De Morgan's laws",
    "Rules for negating combined conditions: not (a and b) equals not a or not b, and vice versa."
   ],
   [
    "Operator precedence",
    "The order in which Python applies operators: comparisons first, then not, then and, then or."
   ]
  ],
  "example": "A login form uses display = nickname or email. If the user left nickname blank, the empty string is falsy, so display becomes the email address; otherwise the nickname is shown, with no if statement needed. A buggy access check written as role == \"admin\" or \"editor\" lets everyone in until it is rewritten as role in (\"admin\", \"editor\").",
  "mistakes": [
   [
    "`print(3 and 5)` shows True.",
    "and returns one of its operands. Both are truthy, so it returns the last one, 5. Only not is guaranteed to return a real Boolean."
   ],
   [
    "`x == 1 or 2` checks whether x is 1 or 2.",
    "It is parsed as (x == 1) or 2, and 2 is truthy, so the whole condition is always true. Write x == 1 or x == 2, or x in (1, 2)."
   ],
   [
    "The strings \"0\" and \"False\" are falsy.",
    "Any non-empty string is truthy, whatever its text. Only the empty string \"\" is falsy."
   ],
   [
    "and and or have the same priority, so expressions are read left to right.",
    "and binds tighter than or, so a or b and c means a or (b and c)."
   ]
  ],
  "tryit": [
   [
    "A shop script sets quantity = entered_quantity or 1 so that a blank entry defaults to one item. A customer deliberately types 0 to cancel a line, but the order still contains one item. Why, and what would you change?",
    "0 is falsy, so or replaces it with the default 1, exactly as it would replace an empty value. The script should test explicitly for the missing case, for example by checking whether the entry is None or an empty string before converting, so that a real 0 is kept."
   ],
   [
    "A program checks `if total / count > 10 and count != 0:`. It crashes when count is 0. How do you fix it without adding a new if statement?",
    "Swap the operands: `if count != 0 and total / count > 10:`. and short-circuits, so when count is 0 the left side is False and the division is never evaluated."
   ]
  ],
  "tip": "When an exam prints the result of and or or, do not answer True or False automatically. and returns the first falsy operand (or the last one); or returns the first truthy operand (or the last one).",
  "check": [
   [
    "What does print(5 or 0) show?",
    "5, because or returns the first truthy operand."
   ],
   [
    "What does print([] and 7) show?",
    "[], because the empty list is falsy and and returns it without evaluating 7."
   ],
   [
    "Why is if x == 3 or 4: always true?",
    "It is parsed as (x == 3) or 4, and 4 is truthy."
   ],
   [
    "What is not 0 and \"\"?",
    "\"\" (an empty string). not 0 is True, so and evaluates and returns its right operand, the empty string."
   ],
   [
    "What does bool([0]) return?",
    "True, because the list is not empty; truthiness depends on the whole list, not on its element."
   ]
  ]
 },
 {
  "t": "Nested conditional statements and indentation",
  "hook": "It is a Monday morning in January, and Rosa, the facilities manager at Brightwater Primary School, is on the phone. The heating contractor has been reading the boiler log and wants to know why, every night after the heating switches off, your thermostat script keeps sending the command to hold the temperature. The script ran without a single error all week. You open the file and look: an `if heating_on:` with a smaller `if` and `else` tucked inside. Every word is exactly what you meant. Then you notice that the `else` sits four spaces further left than you remember, lined up with the outer `if` instead of the inner one. Can four spaces really change what a program does?",
  "simple": "Sometimes one decision only makes sense after another. You first check whether a shop is open, and only if it is open do you check whether your favorite snack is in stock. Putting one `if` inside another is called nesting. Python does not use brackets to show which lines belong together. Instead it uses indentation, the spaces at the start of a line. Lines pushed further right belong to the decision above them. An `else` belongs to whichever `if` it lines up with exactly. Move a line left or right and you change which decision it belongs to, even if every word stays the same. It is like an outline for an essay: the indentation tells you which points sit under which heading.",
  "body": [
   "A nested conditional is an `if` statement placed inside the block of another `if`, `elif` or `else`. You use nesting when a second decision only makes sense after the first one has been made: first check that a user is logged in, then, only for logged-in users, check whether they are an administrator. The inner decision is not even considered unless the program has entered the outer block. If the outer condition is false, Python skips the whole outer block, inner `if` included, without evaluating anything inside it.",
   "In Python, indentation alone shows which block a line belongs to; there are no braces or `end` keywords as in some other languages. Each level of nesting adds one more level of indentation, conventionally four spaces. The inner `if` is indented under the outer header, and the inner block is indented once more. When a line returns to an earlier level, it has left the inner block, and when it returns to the left margin, it has left the whole statement. A helpful way to think about it is that every colon opens a block and the next line that moves back out closes it.",
   "```python\nage = 20\nmember = False\nif age >= 18:\n    if member:\n        print(\"Adult member price\")\n    else:\n        print(\"Adult price\")      # this runs\nelse:\n    print(\"Child price\")\nprint(\"Done\")                     # always runs\n```",
   "The position of `else` decides which `if` it belongs to. An `else` pairs with the `if` at exactly the same indentation in the same block. In the example, the first `else` (indented four spaces) belongs to `if member:`, while the second (at the left margin) belongs to `if age >= 18:`. Move an `else` left or right by one level and the program's meaning changes completely, even though every word is the same. Other languages call this the dangling-else problem, the question of which `if` an ambiguous `else` belongs to. Python solves it with indentation, and exam questions test exactly this, so trace the columns carefully. With `age = 15`, the outer test fails, the inner `if member:` is never evaluated, and the output is `Child price` followed by `Done`.",
   "Nesting and logical operators can often express the same thing. An `if a:` containing only an inner `if b:`, with no `else` branches at either level, is equivalent to `if a and b:`. The flat form is usually easier to read. Nesting is the better choice when each level has its own `else` or does different work, as in the pricing example. Deep nesting, four or more levels, is a sign the code could be simplified, for example with `elif` or by moving part of it into a function. An `elif` chain is really a flattened version of nested `else: if ...:` blocks. An outer `if` with an `else:` whose only content is another `if` and `else` behaves exactly like `if`, `elif`, `else` at one level, but it uses one more level of indentation and is harder to read.",
   "Indentation errors are common with nesting, and they come in two very different kinds. Lines inside the same block must line up exactly. If an inner block uses a different number of spaces than its sibling lines, Python raises `IndentationError`, a subclass of `SyntaxError`, before anything runs, so you at least get a message. Mixing tabs and spaces can cause the same error, which is why editors are usually set to insert four spaces when you press Tab. The second kind is silent. If you forget to indent the inner `if` itself, it becomes a separate statement at the outer level and runs regardless of the outer condition. That is a logic error, not a syntax error, so no message warns you; the program simply does the wrong thing.",
   "To predict output, trace from the top. Evaluate the outer condition, pick the matching block, then evaluate any conditions inside it, ignoring every branch you did not enter. Lines at level 0 run unconditionally, lines at level 1 depend on the outer test, and lines at level 2 depend on both. Marking each line with its indentation level on scrap paper before tracing turns a confusing snippet into a simple tree of choices.",
   "Consider a worked example. A thermostat script checks `if heating_on:` and, inside that, `if temp < 18:` to turn the boiler up, with an inner `else:` to hold the temperature. A developer accidentally dedents the inner `else` by four spaces, attaching it to the outer `if`. The file still runs, but now the boiler is told to hold whenever heating is off, and nothing at all happens when heating is on and the room is already warm. Common mistakes in this area: pairing `else` with the nearest `if` above it instead of the one at the same column, mixing tabs and spaces between levels, and assuming the inner condition is checked even when the outer one is false.",
   "Exam questions usually give two or three levels of nested `if` statements, set some variables, and ask what prints. Clue words: nested means one decision inside another; belongs to or matches means find the `if` at the same indentation; always runs means a line at the outer level after the whole statement. Count carefully how many lines are printed, and remember that a line at the left margin after the statement prints in every case."
  ],
  "analogy": "Nested conditionals work like the folders on a computer. A document inside the Projects folder, inside the 2026 folder, can only be reached by opening 2026 first and then Projects. If you cannot open the outer folder, you never see anything inside it. Indentation is the folder path: it tells Python exactly which container each line lives in. Moving a line out by one indent is like dragging a file up one folder. The analogy breaks down slightly because folders can be opened in any order, while Python always evaluates the outer condition first.",
  "terms": [
   [
    "Nested conditional",
    "An if statement inside the block of another conditional branch."
   ],
   [
    "Indentation level",
    "The column at which a line starts; it defines which block the line belongs to."
   ],
   [
    "Dangling else",
    "The question of which if an else belongs to; in Python, the one at the same indentation."
   ],
   [
    "Flattening",
    "Replacing nested ifs with and or with an elif chain to reduce indentation depth."
   ],
   [
    "Logic error",
    "A mistake that lets the program run but produces the wrong behavior, such as a misplaced else."
   ],
   [
    "IndentationError",
    "A subclass of SyntaxError raised before the program runs when lines in a block do not line up correctly."
   ]
  ],
  "example": "A thermostat script checks if heating_on:, and inside that, if temp < 18: to turn the boiler up, else: to hold. A developer accidentally dedents the inner else, attaching it to the outer if, so the boiler is told to hold whenever heating is off. The code runs without any error message, but the logic is wrong.",
  "mistakes": [
   [
    "An else always belongs to the nearest if above it.",
    "In Python an else belongs to the if at exactly the same indentation in the same block, even if another if appears between them."
   ],
   [
    "Python still checks the inner condition when the outer one is false.",
    "If the outer condition is false, the whole inner block is skipped and the inner condition is never evaluated."
   ],
   [
    "Every indentation mistake produces an error message.",
    "Misaligned lines within one block raise IndentationError, but indenting a line at the wrong level can create valid code that silently does something different, a logic error."
   ],
   [
    "Nested ifs are always equivalent to joining the conditions with and.",
    "They are equivalent only when neither level has an else or elif and nothing else is in the outer block."
   ]
  ],
  "tryit": [
   [
    "A library script reads: if member: then, indented, if overdue: print(\"Pay fine\"), and below that an else: at the left margin printing \"Join today\". A member with no overdue books uses it. What prints, and is that what the author likely intended?",
    "Nothing prints. The member condition is true, the inner overdue test is false, and the inner if has no else of its own. The left-margin else belongs to if member:, so it only runs for non-members. If the author wanted a message for members without fines, they needed an else indented to match if overdue:."
   ],
   [
    "You need to give a discount only to logged-in users who are students. A colleague wrote two nested ifs with no else branches. Should you flatten it, and how?",
    "Yes, it can safely become if logged_in and is_student:, because neither level has an else and the outer block contains nothing else. The flat version is easier to read and behaves identically."
   ]
  ],
  "tip": "Line up else and elif with their if using the indentation column, not the order they appear in. The same words at a different indent produce a different program.",
  "check": [
   [
    "When is if a: followed by an indented if b: equivalent to if a and b:?",
    "When neither level has an else or elif branch and nothing else is in the outer block."
   ],
   [
    "Which if does an else belong to?",
    "The if at the same indentation level directly above it in the same block."
   ],
   [
    "What error do you get if two lines in the same inner block have different indentation?",
    "IndentationError, a subclass of SyntaxError, before the program runs."
   ],
   [
    "With age = 15 in the pricing example, what is printed?",
    "Child price, then Done. The outer condition is false, so the inner if is never evaluated."
   ]
  ]
 },
 {
  "t": "The pass instruction as a placeholder body",
  "hook": "You are sketching a to-do app for the volunteers at Cedar Hollow Food Bank, and you want to try the menu before writing any of the real features. You type `def add_task():`, press Enter, add a comment that says to finish this later, and do the same for `remove_task` and `list_tasks`. You run the file to see your menu, and Python refuses to start: `IndentationError: expected an indented block`. There is nothing wrong with the menu, and the comments clearly say what each function will do. So why will Python not run a file whose only problem is that some parts are not written yet?",
  "simple": "In Python, any line that ends with a colon, such as an `if` or a function definition, must be followed by at least one indented instruction. Sometimes you have nothing to put there yet, or you want nothing to happen. A comment does not count, because Python ignores comments completely. The `pass` statement fills the gap. It is an instruction that means do nothing and move on. Think of a theater seat with a reserved sign on it: the seat is not empty in the booking system, but nobody is actually sitting there yet. `pass` holds the place so the program is valid. It does not skip anything, stop a loop or leave a function; the next line simply runs as usual.",
  "body": [
   "Python requires every compound statement header, meaning a line ending in a colon such as `if`, `elif`, `else`, `while`, `for`, `def`, `class`, `try` or `except`, to be followed by at least one indented statement. Sometimes you have nothing to put there yet, or you deliberately want nothing to happen. Leaving the block empty is a syntax error, reported as `IndentationError: expected an indented block`, and because it is detected before the program starts, not one line of the file runs. A comment does not help, because the interpreter discards comments when it reads the code, and the block is still empty.",
   "The `pass` keyword solves this. It is a statement that does nothing at all. It exists purely to fill a place where the grammar needs a statement. When Python reaches `pass`, it simply continues with the next line. Because `pass` is a real statement, it can sit in any block, alongside other statements or alone, and it can even appear at the top level of a file, where it is harmless. It produces no output and no value, and it does not change any variable.",
   "```python\nfor n in range(5):\n    pass            # loop runs 5 times, doing nothing\n\ndef save_report():\n    pass            # to be written later\n\nerror_count = 0\nif error_count == 0:\n    pass            # nothing to do in the normal case\nelse:\n    print(\"Errors found\")\n```",
   "Common uses fall into three groups. The first is stubs while you are planning a program: define all your function names with `pass` bodies, then fill them in one by one. The second is empty branches where one case needs no action, as in the `error_count` example, where only the error case prints anything. The third, in the exceptions domain, is an `except` block that deliberately ignores an error. Silently ignoring errors is usually a bad idea, because it hides real problems, so if you do it, add a comment explaining why. Some programmers use the ellipsis literal `...` as a placeholder in the same way, but `pass` is the keyword the exam expects.",
   "A few further details are worth knowing. You can use `pass` inside a `while` loop, as in `while not ready(): pass`, which keeps checking a condition, although such busy waiting wastes processor time. The `for` loop in the example still runs five times; `n` takes each value from 0 to 4, and afterwards `n` is 4, because `pass` does nothing to stop or shorten the loop. And because `pass` is a keyword, you cannot use it as a variable name: `pass = 3` is a `SyntaxError`.",
   "Do not confuse `pass` with `continue` or `break`. Inside a loop, `pass` does nothing and execution carries on with the rest of the current iteration. `continue` skips the rest of the current iteration and moves on to the next one. `break` leaves the loop completely. So a line after `pass` in the same loop body still runs, but a line after `continue` does not. A useful summary is that `pass` is about syntax, while `continue` and `break` are about control flow. Removing a `pass` that shares its block with other statements changes nothing at all; removing a `continue` or `break` changes what the program does.",
   "```python\nfor i in range(3):\n    if i == 1:\n        pass\n    print(i)        # prints 0, 1, 2\n\nfor i in range(3):\n    if i == 1:\n        continue\n    print(i)        # prints 0, 2\n```",
   "Consider a worked example. While designing a to-do app, you sketch `def add_task():`, `def remove_task():` and `def list_tasks():`, each with a `pass` body, then write the menu loop that calls them. The file runs without errors, so you can test the menu before writing the real functions. Calling `list_tasks()` at this stage does nothing and returns `None`, like any function that ends without a `return` statement. Later, when you replace each `pass` with real code, the rest of the program does not need to change. Common mistakes: using a comment instead of `pass`, thinking `pass` exits a loop or function, and trying to use `pass` as a variable name.",
   "Exam questions on `pass` usually ask what output a loop produces when `pass`, `continue` or `break` appears in the same position, or which statement makes an empty block legal. Clue words: placeholder, empty body, do nothing or syntactically required all mean `pass`; skip the rest of this iteration means `continue`; exit the loop means `break`. If an answer choice treats `pass` as if it skipped anything, it is wrong. Another frequent item shows a function or `if` with only a comment in its body and asks what happens; the answer is `IndentationError: expected an indented block`, and the fix is to add `pass`. Remember that a loop containing only `pass` prints nothing."
  ],
  "analogy": "`pass` is like a Reserved card on a restaurant table. The booking system needs every table in the plan to have something assigned, so the card holds the spot even though nobody is eating there yet. Diners walking past do not stop or turn back because of it; they just carry on to their own tables. A sticky note saying a table is for later, written only in the manager's private notebook, would be like a comment: the booking system never sees it. Where the analogy stops: a reserved card eventually means a real guest, but `pass` can stay forever and is still valid.",
  "terms": [
   [
    "pass",
    "A keyword statement that does nothing, used where syntax requires a statement."
   ],
   [
    "Stub",
    "A placeholder function or block, often with a pass body, to be completed later."
   ],
   [
    "Empty block error",
    "IndentationError: expected an indented block, raised when a colon header has no body."
   ],
   [
    "Compound statement",
    "A statement such as if, for, while or def whose header ends in a colon and owns an indented block."
   ],
   [
    "continue",
    "Unlike pass, skips the rest of the current loop iteration."
   ],
   [
    "break",
    "Unlike pass, exits the loop completely."
   ]
  ],
  "example": "While designing a to-do app, you sketch def add_task():, def remove_task(): and def list_tasks(): each with a pass body. The file runs without errors, so you can build and test the menu loop before writing the real functions, and each call simply returns None until you fill it in.",
  "mistakes": [
   [
    "A comment is enough to fill an empty block.",
    "Python discards comments, so the block is still empty and the file fails with IndentationError: expected an indented block. Add pass."
   ],
   [
    "pass skips the rest of the loop body, like continue.",
    "pass does nothing; the following lines in the same iteration still run. continue is the statement that skips them."
   ],
   [
    "pass exits a function or loop early.",
    "It exits nothing. A function with only pass runs to its end and returns None, and a loop with pass still runs every iteration."
   ],
   [
    "pass can be used as a variable name, since it does nothing.",
    "pass is a keyword, so pass = 3 is a SyntaxError."
   ]
  ],
  "tryit": [
   [
    "A reviewer finds this in a data import script: an except block containing only pass, under a try that converts each line to a number. The import finishes without errors, but the totals are lower than expected. What might be happening, and what would you suggest?",
    "The pass in the except block silently ignores every conversion failure, so bad lines are dropped without any message, which lowers the totals. Suggest at least counting or printing the failures, or handling only the specific error you expect, so problems are visible instead of hidden."
   ],
   [
    "In a loop over range(4), the body is if i == 2: followed by a placeholder, and then print(i) at the loop level. You must choose pass or continue as the placeholder. What prints in each case?",
    "With pass, 0 1 2 3 print, because pass does nothing and print(i) still runs. With continue, 0 1 3 print, because continue skips print(i) when i is 2."
   ]
  ],
  "tip": "pass does not skip or exit anything; the code after it in the same block still runs. If an answer choice treats pass like continue, it is wrong.",
  "check": [
   [
    "Can a comment alone serve as the body of an if?",
    "No. Comments are ignored, so the block is still empty and Python raises IndentationError; use pass."
   ],
   [
    "What does a function with body pass return?",
    "None, like any function that ends without a return statement."
   ],
   [
    "In a loop, what is the difference between pass and continue?",
    "pass does nothing and execution continues with the next line; continue skips the rest of the iteration and starts the next one."
   ],
   [
    "How many times does for i in range(4): pass run its body?",
    "Four times; pass does not stop the loop, it just does nothing on each iteration."
   ]
  ]
 },
 {
  "t": "While loops, loop conditions and avoiding infinite loops",
  "hook": "At 7 a.m. Theo, who runs the small savings app for Willow Creek Credit Union members, finds the overnight report job still running. It normally finishes in seconds. The server fan is roaring, the log has stopped growing, and the job has been stuck on one member's projection for six hours. That member's savings plan says the monthly deposit is 0, because they paused contributions last week. The script that projects how many months until they reach their goal is a simple `while` loop that has worked for years. Why would a single zero turn a three-line loop into a program that never stops?",
  "simple": "A `while` loop repeats some instructions as long as a condition stays true. Before every round, Python asks the question again: is it still true? If yes, it runs the instructions once more; if no, it stops and moves on. Think of stirring soup while it is still lumpy: you check, stir, check again, and stop once it is smooth. For this to end, each round must change something that brings you closer to stopping, like the lumps actually breaking up. If nothing changes, the answer is always yes and the loop runs forever. That is called an infinite loop. Also, if the answer is no the very first time, the instructions never run at all.",
  "body": [
   "A `while` loop repeats a block as long as its condition is true. Python checks the condition before each pass through the body, and each pass is called an iteration. If the condition is true, the body runs, then Python goes back to the header and checks again. When the condition is false, the loop ends and execution continues with the first statement after the block. If the condition is false the very first time, the body never runs at all, so a `while` loop may run zero times. That makes it different from loops in some other languages that always run at least once.",
   "```python\ncount = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint(\"Liftoff\")   # prints 3, 2, 1, Liftoff\n```",
   "A well-formed `while` loop has three parts. There is something set up before the loop, here `count = 3`; a condition that depends on it, `count > 0`; and a change inside the body that eventually makes the condition false, `count -= 1`. Use `while` when you do not know in advance how many iterations you need, for example repeating until the user types `quit` or until a value reaches a target. A special input like `quit` that tells a loop to stop is called a sentinel value. When you do know the count, a `for` loop over `range()` is usually clearer. Any `for` loop can be rewritten as a `while` loop with a manual counter, but the reverse is not always convenient.",
   "An infinite loop is a loop whose condition never becomes false. The usual causes are forgetting to update the loop variable, updating it in the wrong direction (`count += 1` when counting down), or using a condition that the update skips over. For example, `while x != 10:` with `x += 3` starting from 0 jumps from 9 to 12 and never equals 10. Using `<` or `>` instead of `!=` makes the loop more robust, because overshooting the target still ends it. Before running a new `while` loop, ask yourself two questions: does the body change something the condition depends on, and does that change move toward making the condition false? If either answer is no, the loop will not end on its own. If you start an infinite loop in the console, press Ctrl+C, which raises `KeyboardInterrupt` and stops the program.",
   "Sometimes an infinite loop is intentional. `while True:` runs forever unless something inside it stops it, typically `break` when a goal is reached, although a `return` inside a function or an unhandled exception also ends it. This pattern is common for menus and input validation: keep asking until the input is valid, then break out. The loop below keeps asking until the answer is exactly yes or no, however many attempts that takes.",
   "```python\nwhile True:\n    answer = input(\"Type yes or no: \")\n    if answer in (\"yes\", \"no\"):\n        break\nprint(\"Thanks\")\n```",
   "Any truthy or falsy value can be a condition. `while items:` runs while a list is not empty, which works nicely with `items.pop()` removing one item each time. `while n:` runs until `n` becomes 0, but if `n` starts negative and you subtract 1 each time, it never reaches 0. To count iterations for an exam question, write down the variable's value at each check of the condition, including the final check that fails, and count how many times the body ran. The condition is always checked one more time than the body runs, unless the loop is left with `break`. A `while` loop can also have an `else` clause and can use `break` and `continue`, which later lessons cover in detail. Keep the body short and the update easy to see, ideally as the first or last line of the body, so that a reader can confirm at a glance that the loop will end.",
   "Consider a worked example. A savings script sets `balance = 0`, `months = 0`, and loops `while balance < goal:`, adding a monthly deposit and incrementing `months`. With a goal of 1000 and a deposit of 250, the condition is checked with balances 0, 250, 500, 750 and 1000; the body runs four times and `months` ends at 4. One day the deposit is read from a settings file as 0. The balance never changes, the condition stays true, and the loop is infinite. Adding a check before the loop that the deposit is positive prevents it, and that check is a good habit any time a loop's progress depends on outside data.",
   "Common mistakes include placing the update outside the loop by getting the indentation wrong, testing `!=` against a value the step can jump over, and forgetting that the body may not run at all. Exam clue words: until, as long as or unknown number of times suggest `while`; never ends means the update is missing or wrong; how many times is the body executed means trace the condition checks. Draw a small table with one row per check, the value of the variable and whether the condition passed, and your count will be reliable."
  ],
  "analogy": "A `while` loop is like filling a bathtub while checking the level. Before each minute of running water, you look: is it below the line? If yes, keep the tap on; if no, turn it off. An infinite loop is a tub with the plug pulled out. Water flows in, drains out at the same rate, the level never reaches the line, and you would stand there forever. The analogy differs in one important way: a person eventually notices and gives up, while Python will keep checking the same false hope until you press Ctrl+C.",
  "mnemonic": "Every terminating while loop needs I-T-U: Initialize before the loop, Test in the header, Update inside the body. If the U is missing or points the wrong way, the loop never ends.",
  "terms": [
   [
    "while loop",
    "A loop that repeats its body as long as its condition is true, checking before each iteration."
   ],
   [
    "Iteration",
    "One execution of a loop's body."
   ],
   [
    "Loop condition",
    "The expression checked before each iteration; the loop ends when it is falsy."
   ],
   [
    "Infinite loop",
    "A loop whose condition never becomes false, so it runs until interrupted or broken out of."
   ],
   [
    "KeyboardInterrupt",
    "The exception raised when the user presses Ctrl+C, used to stop a runaway program."
   ],
   [
    "Sentinel value",
    "A special input, such as quit, that tells a loop to stop."
   ]
  ],
  "example": "A savings script loops while balance < goal, adding a monthly deposit and counting months. If the deposit is accidentally set to 0, the balance never changes and the loop is infinite; adding a check that the deposit is positive before the loop prevents it.",
  "mistakes": [
   [
    "A while loop always runs its body at least once.",
    "Python checks the condition first. If it is false at the start, the body runs zero times."
   ],
   [
    "`while x != 10:` is a safe way to stop at 10.",
    "If the step can jump over 10, for example 9 to 12, the condition never becomes false. Use x < 10 so overshooting still ends the loop."
   ],
   [
    "The number of condition checks equals the number of iterations.",
    "The condition is checked one more time than the body runs, because the final failing check ends the loop."
   ],
   [
    "while True: is always a bug.",
    "It is a common, deliberate pattern for menus and input validation, as long as the body contains a break (or return) that eventually runs."
   ]
  ],
  "tryit": [
   [
    "A countdown script sets t = 10 and loops `while t != 0:`, printing t and then doing t -= 3. A tester reports the program never finishes. Explain why and suggest a fix.",
    "t takes the values 10, 7, 4, 1, -2 and so on, skipping 0, so `t != 0` stays true forever. Change the condition to while t > 0:, which ends once t drops to 0 or below."
   ],
   [
    "You need to keep asking a user for a PIN until they enter exactly four digits, without knowing how many tries they will need. Should you use a for loop over range() or a while loop, and how would you end it?",
    "Use a while loop, because the number of iterations is unknown. A common shape is while True: read the input, and break when it has exactly four characters that are all digits."
   ]
  ],
  "tip": "Count carefully: a while loop's condition is checked one more time than the body runs. Also watch for `!=` conditions that a step can jump over.",
  "check": [
   [
    "How many times does the body of i = 0; while i < 5: i += 2 run?",
    "3 times, with i equal to 0, 2 and 4 at the checks that pass; the check with i = 6 fails."
   ],
   [
    "What happens with n = 0 followed by while n: print(n)?",
    "Nothing is printed; 0 is falsy, so the body never runs."
   ],
   [
    "How do you normally end a while True loop?",
    "With a break statement inside the body when some condition is met (or by an exception or return)."
   ],
   [
    "Why is `while x != 10: x += 3` with x starting at 0 infinite?",
    "x takes 0, 3, 6, 9, 12 and so on, skipping 10, so the condition never becomes false."
   ]
  ]
 },
 {
  "t": "For loops over range() with start, stop and step, including negative steps and empty ranges",
  "hook": "The science fair at Juniper Ridge High School opens in ten minutes, and Amara's rocket display is supposed to count down from 10 on the big screen before the model launches. She tests it one last time. The screen stays blank, then shows the word Go. No numbers, no error, nothing in red. She had changed one thing that morning, tidying `range(10, 0, -1)` to the shorter `range(10, 0)` because the extra number looked unnecessary. The countdown worked yesterday. Now it silently skips every number. What did that small missing value really do, and why did Python not complain?",
  "simple": "A `for` loop repeats some instructions once for each item in a list of values. When you want to repeat something a set number of times, you give it `range()`, which hands out whole numbers one after another. You tell it where to start, where to stop and how big each step is. The most important rule is that the stop number itself is never included, like a fence you walk up to but never cross. So `range(1, 5)` gives 1, 2, 3, 4. To count down, the step must be negative, such as -1. If the numbers cannot possibly move from start toward stop in the direction of the step, `range()` gives nothing at all, and the loop quietly runs zero times.",
  "body": [
   "A `for` loop runs its body once for each item in a sequence. To repeat something a known number of times, you usually loop over `range()`, which produces a series of integers on demand without building a list in memory. The loop variable takes each value in turn, and you can use it inside the body. The header always has the shape `for name in range(...):`, followed by an indented block, and the loop ends by itself when the range has no more values.",
   "`range()` takes one, two or three integer arguments. `range(stop)` counts from 0 up to but not including `stop`: `range(4)` gives 0, 1, 2, 3. `range(start, stop)` counts from `start` up to but not including `stop`: `range(2, 5)` gives 2, 3, 4. `range(start, stop, step)` moves by `step` each time: `range(0, 10, 3)` gives 0, 3, 6, 9. The stop value is always excluded, which is the most important rule to remember. Because of that, `range(n)` produces exactly n values. The arguments may be negative numbers or expressions, such as `range(-3, 3)`, which gives -3 up to 2, or `range(len(word))`, which gives every valid index of `word`.",
   "A range object is not a list. `print(range(3))` shows `range(0, 3)`, not the numbers, which is why you wrap it in `list()` to see them. Wrapping a range in `list()` is useful in the REPL (read-eval-print loop, the interactive prompt) when you want to check your reasoning, and `len()` works on a range directly. If you do not need the loop variable, the convention is to name it `_`, as in `for _ in range(3): print(\"hi\")`.",
   "A negative step counts downward. `range(5, 0, -1)` gives 5, 4, 3, 2, 1, still excluding the stop, 0, and `range(10, 0, -3)` gives 10, 7, 4, 1. To include 0 when counting down, use a stop of -1: `range(3, -1, -1)` gives 3, 2, 1, 0. With a negative step, start must be greater than stop, otherwise nothing is produced. The loop variable is also just a normal variable, so you can use it in calculations, as in `for i in range(1, 6): print(i * i)`, which prints the first five squares.",
   "An empty range produces no numbers at all, so a loop over it runs zero times without any error. This happens whenever you cannot reach the stop by moving in the step's direction: `range(0)`, `range(5, 2)` (default step +1 but stop is below start), `range(3, 3)` and `range(1, 5, -1)`. Python treats this as perfectly valid, which is exactly why empty-range bugs are silent. Exam questions often include an empty range and ask how many times the body runs; the answer is zero, and any `else` clause on the loop still runs.",
   "```python\nfor i in range(2, 11, 4):\n    print(i, end=\" \")   # 2 6 10\nprint()\nfor i in range(5, 2):\n    print(\"never\")      # empty range\nprint(list(range(6, 0, -2)))  # [6, 4, 2]\nprint(len(range(0, 10, 3)))   # 4\n```",
   "All arguments must be integers. `range(1.5)` raises `TypeError`, and a step of 0 raises `ValueError`, because a range that never moves would never end. To count how many values a range produces with a positive step, take the difference between stop and start, divide by the step and round up; for `range(0, 10, 3)` that is 10 divided by 3, rounded up to 4. The first value is always start, and each following value adds the step until the next one would reach or pass the stop.",
   "Consider a worked example. A countdown timer uses `for s in range(10, 0, -1): print(s)` and then prints `Go`, producing 10 down to 1. A developer who writes `range(10, 0)` instead gets an empty range, and the countdown silently prints nothing but `Go`, because the default step is +1 and 10 is already past 0. Another developer wants the numbers 1 to 10 and writes `range(1, 10)`, which stops at 9; the fix is `range(1, 11)`. Common mistakes: including the stop value, forgetting the negative step when counting down, putting start and stop the wrong way round, and passing a float such as `range(n / 2)`, where `/` makes a float and triggers `TypeError`; use `n // 2`. Also watch for off-by-one errors when a loop index is used to read a sequence.",
   "Exam questions usually ask what a `range()` loop prints, how many times its body runs, or which call produces a given sequence. Clue words: up to but not including means the stop; counts down means a negative step; runs zero times means an empty range. Write the sequence out term by term until the next value would reach or pass the stop. For a negative step, pass means going below the stop, so `range(7, 1, -2)` gives 7, 5, 3 and stops before 1."
  ],
  "analogy": "Think of `range()` as walking along a row of numbered paving stones toward a painted line. Start is the stone where you begin, step is the length of each stride, and stop is the line you must never step on or over. If you face the wrong way, with your strides pointing away from the line, you simply do not walk at all, which is an empty range. One detail matters for the exam: with long strides your last stone may sit well short of the line, as `range(0, 10, 4)` ends at 8, but you never land on the line or beyond it.",
  "terms": [
   [
    "range()",
    "Built-in that produces integers from start up to but not including stop, moving by step."
   ],
   [
    "Start",
    "The first value of a range; 0 if omitted."
   ],
   [
    "Stop",
    "The boundary value, never included in the range."
   ],
   [
    "Step",
    "The amount added each time; negative steps count downward and 0 is not allowed."
   ],
   [
    "Empty range",
    "A range that produces no values, such as range(5, 2), so a loop over it runs zero times."
   ],
   [
    "Loop variable",
    "The name that takes each successive value in a for loop."
   ],
   [
    "Off-by-one error",
    "A mistake where a loop runs one time too many or too few, often caused by forgetting that stop is excluded."
   ]
  ],
  "example": "A countdown timer uses for s in range(10, 0, -1): print(s) and then prints Go. A developer who writes range(10, 0) instead gets an empty range and the countdown silently prints nothing, because the default step is +1. Another wants 1 to 10, writes range(1, 10), and loses the 10.",
  "mistakes": [
   [
    "range(1, 10) includes 10.",
    "The stop value is never included. range(1, 10) gives 1 to 9; use range(1, 11) to include 10."
   ],
   [
    "range(10, 0) counts down from 10.",
    "The default step is +1, so it cannot move from 10 toward 0 and the range is empty. Counting down needs a negative step, as in range(10, 0, -1)."
   ],
   [
    "An empty range raises an error.",
    "It is valid and simply produces no values; the loop body runs zero times. Errors come from a float argument (TypeError) or a zero step (ValueError)."
   ],
   [
    "print(range(3)) shows 0, 1, 2.",
    "It shows range(0, 3). Use list(range(3)) to see [0, 1, 2]."
   ]
  ],
  "tryit": [
   [
    "A teacher's script should print the even page numbers from 20 down to 2 for a reading assignment. A student wrote for p in range(20, 2, -2): print(p). The last page, 2, is missing. Why, and what is the fix?",
    "The stop value is excluded, so the range stops before reaching 2 and gives 20, 18 and so on down to 4. Use a stop past 2 in the direction of travel, such as range(20, 0, -2) or range(20, 1, -2), which both end at 2."
   ],
   [
    "A program computes half = total / 2 and then loops for i in range(half):. It crashes with TypeError when total is 10. What is happening?",
    "The / operator always returns a float, so half is 5.0, and range() only accepts integers. Use floor division, half = total // 2, which gives the integer 5."
   ]
  ],
  "tip": "The stop value is never included, and a range that cannot move from start toward stop in the step's direction is empty, not an error.",
  "check": [
   [
    "What values does range(1, 8, 2) produce?",
    "1, 3, 5, 7."
   ],
   [
    "How many times does for i in range(4, 1): print(i) print?",
    "Zero times; the range is empty because the default step is +1 and 4 is already beyond 1."
   ],
   [
    "What does list(range(3, -2, -2)) give?",
    "[3, 1, -1]."
   ],
   [
    "What does range(5, 0, 0) do?",
    "It raises ValueError, because the step must not be zero."
   ],
   [
    "How many values does range(0, 10, 3) produce?",
    "Four: 0, 3, 6 and 9."
   ]
  ]
 },
 {
  "t": "Iterating over strings, lists and other sequences with for",
  "hook": "The sign-up page for the Pinecrest Running Club has a new password checker, and Malik, the volunteer who wrote it, is puzzled. Members keep complaining that the page says their password has only one digit when it clearly has three. Malik's code loops over every character, checks `ch.isdigit()`, and adds one to a counter. He has stared at the loop for an hour, and every individual line looks right. The bug is not in what the loop does with each character. It is in where one innocent line, `digits = 0`, happens to sit. How can a single misplaced line make a loop forget almost everything it has counted?",
  "simple": "A `for` loop can walk through any collection of things, one item at a time, like reading a shopping list from top to bottom. Loop over a word and you get its letters one by one. Loop over a list and you get each item in order. You do not need to count or know where the end is; the loop stops by itself when the items run out. To build up a result, such as a count or a total, you start a running total before the loop, add to it inside the loop, and read it after. If you reset the total inside the loop, it is like wiping a scoreboard after every point: at the end, it only shows the last one.",
  "body": [
   "A `for` loop is not limited to numbers. It works with any iterable, meaning any object that can hand out its items one at a time. Strings, lists, tuples, dictionaries, sets and ranges are all iterable. The syntax is always `for name in iterable:`, and on each pass the name is bound to the next item. The loop ends by itself when the items run out, so you never need a counter or an end condition. Looping over an empty sequence runs the body zero times, without any error.",
   "Looping over a string gives you its characters one at a time, as one-character strings; spaces and punctuation count as characters too. A string with n characters gives exactly n iterations, and `len()` tells you n in advance if you need it. Looping over a list or tuple gives you each element in order, from index 0 to the end. This is usually cleaner and less error-prone than looping over indexes, because you cannot go past the end by accident.",
   "The same `in` keyword that drives a `for` loop also works as a membership test inside an expression, as in `if ch in \"aeiou\":`. In the loop header it assigns each item to the loop variable, while in a condition it only returns `True` or `False`. Keep those two roles apart when you read code that uses both on neighboring lines, which is very common in counting loops.",
   "```python\nfor ch in \"cat\":\n    print(ch, end=\"-\")    # c-a-t-\nprint()\ncolors = [\"red\", \"green\", \"blue\"]\nfor c in colors:\n    print(c.upper())      # RED, GREEN, BLUE\nfor i, c in enumerate(colors):\n    print(i, c)           # 0 red, 1 green, 2 blue\n```",
   "If you need the position as well as the item, you have two options. The traditional one is `for i in range(len(colors)):` and then `colors[i]`. The more Pythonic one is `enumerate()`, which gives pairs of index and item: `for i, c in enumerate(colors):`. Both appear in exam code, so be able to read both. Looping over a dictionary gives its keys by default, in insertion order; `for k in d:` is the same as `for k in d.keys():`. Tuples and sets work the same way as lists, except that a set gives its items in no guaranteed order.",
   "Assigning to the loop variable does not change the list. In `for x in nums: x = x * 2`, each `x` is just a name bound to an element; rebinding it has no effect on `nums`. To modify a list in place, loop over indexes and assign `nums[i] = nums[i] * 2`. Strings cannot be modified in place at all, because they are immutable; you build a new string instead, for example `result = result + ch.upper()`. Adding items to or removing them from a list while looping over the same list causes confusing behavior, such as skipped items, because the loop keeps its own position counter. If you must change it, loop over a copy, such as `for x in items[:]:`.",
   "Many exam questions accumulate something while iterating: counting vowels, summing numbers, or building a reversed string. Set up the accumulator before the loop (`total = 0` or `text = \"\"`), update it inside, and use it after. Forgetting to initialize it before the loop raises `NameError` on the first update, and resetting it inside the loop throws away everything except the last item. Note in the example below that the capital `P` in `\"Programming\"` is not matched by `in \"aeiou\"`, because the comparison is case sensitive.",
   "```python\nvowels = 0\nfor ch in \"Programming\":\n    if ch in \"aeiou\":\n        vowels += 1\nprint(vowels)   # 3 (o, a, i)\n\nrev = \"\"\nfor ch in \"abc\":\n    rev = ch + rev\nprint(rev)      # cba\n```",
   "Consider a worked example. A password checker loops `for ch in password:` and increments `digits` when `ch.isdigit()` is true and `upper` when `ch.isupper()` is true. After the loop it reports whether each requirement was met, never touching indexes at all. A first draft set `digits = 0` inside the loop, so it only ever reported 0 or 1. Common mistakes: resetting the accumulator inside the loop, expecting `x += 1` on the loop variable to change the list, and forgetting about capital letters. Exam clue words: each character means iterating a string; index and value means `enumerate()`; iterating a dictionary means keys; is the list changed after rebinding the loop variable means no."
  ],
  "analogy": "Iterating with `for` is like a teacher handing back test papers from a pile. Each turn, the teacher holds one paper, the current item, and does something with it, then picks up the next until the pile is empty. Writing a new grade on a sticky note in your hand does not change the paper in the pile; that is like rebinding the loop variable. To change the paper itself, you have to go to its position in the pile and write on it, which is like assigning `nums[i]`. The analogy differs for strings: those papers are laminated, and you can only make new copies.",
  "terms": [
   [
    "Iterable",
    "An object whose items can be taken one at a time, such as a string, list, tuple, dict or range."
   ],
   [
    "enumerate()",
    "Built-in that yields (index, item) pairs while iterating."
   ],
   [
    "Accumulator",
    "A variable set before a loop and updated each iteration to build a total or result."
   ],
   [
    "Immutable string",
    "A string cannot be changed in place; loops build new strings instead."
   ],
   [
    "range(len(seq))",
    "A pattern that loops over the valid indexes of a sequence."
   ],
   [
    "Membership test",
    "The in operator used in an expression, returning True or False."
   ]
  ],
  "example": "A password checker loops for ch in password: and increments counters for digits with ch.isdigit() and uppercase letters with ch.isupper(). After the loop it reports whether each requirement was met, never touching indexes at all. A draft that reset the counters inside the loop always reported at most one digit.",
  "mistakes": [
   [
    "`for x in nums: x = x * 2` doubles every element of nums.",
    "It only rebinds the name x each time; nums is unchanged. Assign through an index, nums[i] = nums[i] * 2, to change the list."
   ],
   [
    "Looping over a dictionary gives key-value pairs.",
    "A plain for k in d: gives only the keys, in insertion order."
   ],
   [
    "Spaces and punctuation are skipped when looping over a string.",
    "Every character counts, including spaces and punctuation, so a string of length n always gives n iterations."
   ],
   [
    "It is fine to set the accumulator at the top of the loop body.",
    "Resetting it inside the loop throws away earlier progress, leaving only the last item's effect. Initialize it once, before the loop."
   ]
  ],
  "tryit": [
   [
    "A program should count how many words in a list start with a capital letter. It sets count = 0 before the loop, then for w in words: if w[0].isupper(): count += 1, and prints count. A teammate suggests moving count = 0 to the first line inside the loop to keep things together. What would happen?",
    "count would be reset to 0 on every iteration, so after the loop it would be at most 1, reflecting only the last word. The accumulator must be initialized once, before the loop."
   ],
   [
    "You need to print each item of a shopping list with a number in front, starting at 0. One option uses range(len(items)) with items[i]; the other uses enumerate(items). Which would you choose and why?",
    "Either produces the same output, but enumerate(items) is usually preferred because it gives the index and the item together, with no separate indexing step and no chance of an index error. You should still be able to read the range(len()) version on the exam."
   ]
  ],
  "tip": "Changing the loop variable never changes the sequence. If a question does for x in lst: x += 1 and then prints lst, the list is unchanged.",
  "check": [
   [
    "What does `for ch in \"hi?\": print(ch)` print?",
    "Three lines: h, i and ?."
   ],
   [
    "After nums = [1, 2] and for n in nums: n = n * 10, what is nums?",
    "[1, 2]; rebinding the loop variable does not modify the list."
   ],
   [
    "What does iterating directly over a dictionary give you?",
    "Its keys."
   ],
   [
    "How would you double every element of a list in place with a for loop?",
    "Loop over indexes, for i in range(len(nums)):, and assign nums[i] = nums[i] * 2."
   ]
  ]
 },
 {
  "t": "Break and continue, and how break affects only the innermost loop",
  "hook": "Opening night at the Riverside Playhouse is sold out except for a handful of seats, and Nadia at the box office is using the seat finder you wrote to place a late arrival. She asks for the first free seat, nearest the stage. The program proudly answers row K, near the back, although she can see an empty seat in row C on her chart. Your code clearly says `break` the moment it finds a free seat. Somehow it kept searching anyway, row after row, and reported the last free seat instead of the first. If `break` means stop, why did your loop keep going?",
  "simple": "Normally a loop does every round from start to finish. Two words let you change that from inside. `break` means stop this loop right now and move on to whatever comes after it. `continue` means skip the rest of this round and go straight to the next round. Picture checking a stack of envelopes for one bill: once you find it, you stop looking (`break`). Picture sorting mail and tossing advertisements aside without opening them (`continue`). When one loop is inside another, like checking every drawer in every cabinet, `break` only stops the loop it is directly in, the drawers of the current cabinet. You still move on to the next cabinet unless you do something extra.",
  "body": [
   "Normally a loop runs its whole body on every iteration and stops only when its condition fails or its sequence runs out. Two keywords let you change that from inside the body. `break` ends the loop immediately; execution jumps to the first statement after the loop. `continue` ends only the current iteration; the rest of the body is skipped and the loop moves on to its next iteration. For a `while` loop that means re-checking the condition; for a `for` loop it means taking the next item. Neither keyword takes an argument.",
   "```python\nfor n in range(1, 8):\n    if n == 3:\n        continue      # skip 3\n    if n == 6:\n        break         # stop completely at 6\n    print(n, end=\" \")\n# output: 1 2 4 5\n```",
   "Each keyword has a natural job. Use `break` when you have found what you were looking for, or when continuing makes no sense, for example searching a list for the first negative number. Use `continue` to skip items that should not be processed, such as blank lines or invalid entries, without wrapping the rest of the body in an extra `if`. Both keywords are valid only inside a loop; using them elsewhere, even inside an `if` that is not in a loop, is a `SyntaxError` reported before the program runs. They affect the loop they are directly inside, and nothing else. Code written after `break` in the same block can never run.",
   "That last point matters with nested loops. `break` exits only the innermost loop that contains it. The outer loop carries on with its next iteration as if the inner loop had ended normally. Similarly, `continue` in an inner loop skips to the next iteration of the inner loop only. Python has no labeled break that jumps out of several loops at once. A `break` inside an `if` inside a loop still acts on the loop, because `if` is not a loop; the `if` simply decides whether the `break` runs. The same goes for `continue`: only loops count when you look for the enclosing one.",
   "```python\nfor i in range(3):\n    for j in range(3):\n        if j == 1:\n            break      # leaves the j loop only\n        print(i, j)\n# prints 0 0, 1 0, 2 0\n```",
   "Here the inner loop always stops when `j` reaches 1, but the outer loop still runs three times, so three lines are printed. To stop both loops, you need an extra step. One option is to set a flag variable before breaking, such as `found = True`, and check it in the outer loop right after the inner one (`if found: break`). Another is to put the loops in a function and use `return`, which leaves the whole function at once, however deeply nested the loops are.",
   "In a `while` loop, be careful where `continue` sits relative to the update. If the counter is incremented after a `continue`, the increment is skipped on that iteration and the loop can become infinite, because the condition sees the same value forever. Put the update before the `continue`, or at the top of the body. In a `for` loop this danger does not exist, because the next value always comes from the sequence, whatever the body does.",
   "Consider a worked example. A seat finder loops over rows and, inside, over seats. When it finds a free seat it breaks, but the outer row loop keeps going and later finds more seats, so the program reports the last free row rather than the first. Setting `found = True` before the `break` and adding `if found: break` right after the inner loop makes it stop at the first free seat. A second function skips damaged seats with `continue`; in its `while` version, `seat += 1` was placed at the bottom of the body, after the `continue`, so the first damaged seat froze the loop forever. Moving the increment to the top fixed it.",
   "Common mistakes: believing `break` exits every loop; confusing `continue` with `pass`; placing the counter update after `continue` in a `while` loop; and forgetting that code after `break` in the same block never runs. Exam questions often print inside nested loops and ask how many lines appear. Clue words: exit the loop early or stop searching means `break`; skip this item means `continue`; innermost is the key word for nested cases. Trace the outer loop's counter separately, because a `break` inside never touches it. For `continue`, remember that the loop still runs every iteration; only the lines after it are skipped."
  ],
  "analogy": "Imagine searching a building floor by floor for a lost set of keys, checking each room on a floor. Finding the keys in a room and walking out of that floor is `break`: you leave the current floor's search, but unless you tell yourself to stop, your plan still says go to the next floor. Glancing into a locked storage room and moving straight to the next room is `continue`. To leave the building entirely, you need a note to yourself that the keys are found, the flag, or to walk out the front door, the `return`.",
  "terms": [
   [
    "break",
    "Immediately exits the innermost enclosing loop."
   ],
   [
    "continue",
    "Skips the rest of the current iteration and begins the next one of the innermost loop."
   ],
   [
    "Innermost loop",
    "The loop that most directly contains a statement; break and continue act only on it."
   ],
   [
    "Flag variable",
    "A Boolean set inside a loop to signal an event, such as found = True, checked later to stop an outer loop."
   ],
   [
    "Early exit",
    "Leaving a loop before its natural end, usually with break or return."
   ]
  ],
  "example": "A seat finder loops over rows and, inside, over seats. When it finds a free seat it breaks, but the outer row loop keeps going and later finds more seats. Setting found = True before the break and adding if found: break after the inner loop makes it stop at the first free seat.",
  "mistakes": [
   [
    "break exits all enclosing loops at once.",
    "break exits only the innermost loop that contains it. To leave an outer loop too, use a flag checked after the inner loop, or return from a function."
   ],
   [
    "continue stops the loop.",
    "continue only skips the rest of the current iteration; the loop goes on with its next iteration."
   ],
   [
    "A break inside an if leaves the if.",
    "if is not a loop. The break leaves the nearest enclosing loop; the if only decides whether the break runs."
   ],
   [
    "Where the update sits in a while loop does not matter when using continue.",
    "If the update comes after continue, it is skipped on those iterations and the loop can become infinite. Place the update before the continue."
   ]
  ],
  "tryit": [
   [
    "A program scans a grid of sensor readings with an outer loop over rows and an inner loop over columns. It must stop all scanning the moment it finds a reading above 100. The current code has a break inside the inner loop only, and it keeps printing rows afterward. How would you change it?",
    "The break leaves only the inner loop, so the outer loop continues. Set a flag such as alarm = True before the break, and add if alarm: break immediately after the inner loop, inside the outer loop. Alternatively, put the scan in a function and return when the reading is found."
   ],
   [
    "A while loop processes order numbers with i starting at 0. Its body is: if orders[i] is canceled, continue; then process orders[i]; then i += 1. The program hangs on the first canceled order. Why, and what is the fix?",
    "When continue runs, i += 1 is skipped, so the loop checks the same canceled order forever. Move i += 1 to before the continue, for example at the top of the body after reading the current order, so every path updates the counter."
   ]
  ],
  "tip": "break never jumps out of two loops. When a nested-loop question uses break, only the inner loop stops; keep counting the outer loop's iterations.",
  "check": [
   [
    "A loop over range(5) executes continue when i % 2 is truthy and otherwise prints i. What is printed?",
    "0, 2 and 4, because odd values give a remainder of 1 and are skipped by continue."
   ],
   [
    "If break runs in an inner loop, what happens to the outer loop?",
    "It continues with its next iteration; only the innermost loop is exited."
   ],
   [
    "Why can continue cause an infinite while loop?",
    "If the loop variable is updated after the continue, that update is skipped, so the condition may never change."
   ],
   [
    "What happens if you write break inside an if that is not inside any loop?",
    "Python reports a SyntaxError, because break is only allowed inside a loop."
   ]
  ]
 },
 {
  "t": "While-else and for-else: when the else clause runs and when break skips it",
  "hook": "The help desk at Oakmere College is getting odd calls. Students who mistype their password once see the message Account locked, then type the right password and get in anyway. Elena, the student worker who maintains the login script, is baffled. The code gives three attempts with a `for` loop, breaks out on a correct password, and has an `else` that prints the lock message. She tested it with three wrong attempts and it locked correctly. The words are all right. The only thing she cannot explain is why the lock message appears after a single mistake. Which statement does that `else` actually belong to?",
  "simple": "In Python, a loop can have an `else` part, which surprises people who only know `else` from `if`. The rule is simple: the `else` part runs once, after the loop, if the loop finished on its own. Finished on its own means it ran out of items or its condition became false. If the loop was stopped early with `break`, the `else` part is skipped. A handy way to remember it is to read the loop's `else` as no break. Imagine searching your bag for your keys: if you find them, you stop looking. If you check every pocket and never stop early, you then say the keys are not here. That final sentence is the loop's `else`.",
  "body": [
   "Python lets a loop have an `else` clause, which surprises people who know `else` only from `if`. The `else` block is written at the same indentation as the `for` or `while` header and runs once, after the loop, if the loop finished normally. Normally means the `while` condition became false or the `for` loop ran out of items. If the loop was ended by `break`, the `else` block is skipped. Either way, execution then continues with whatever statement follows the `else` block, which runs in both cases.",
   "```python\nfor n in [3, 7, 9]:\n    if n % 2 == 0:\n        print(\"Found even\", n)\n        break\nelse:\n    print(\"No even numbers\")   # runs: no break happened\n```",
   "The best way to read loop-else is as no break. It is designed for search loops: you loop looking for something, `break` when you find it, and the `else` handles the not-found case without needing a separate flag variable. Without loop-else, you would set `found = False` before the loop, set it to `True` before the `break`, and test it afterwards; the `else` clause does the same job in fewer lines. A `while` loop follows exactly the same rule as a `for` loop.",
   "Several details are testable. First, the `else` runs even if the loop body never executed: `for x in []:` followed by `else: print(\"done\")` prints `done`, and so does a `while` whose condition is false at the start. Second, `continue` does not skip the `else`; only `break` does, along with `return` from a function and an unhandled exception, which leave everything. When a loop is inside a function, a `return` from the body leaves the function immediately, so neither the rest of the loop nor its `else` runs. Third, in nested loops, a `break` in the inner loop skips only the inner loop's `else`; the outer loop's `else` still depends on whether the outer loop itself was broken. Finally, the `else` belongs to the loop, so it is indented at the same level as the `for` or `while` keyword, not at the level of the loop body.",
   "```python\ni = 0\nwhile i < 3:\n    i += 1\nelse:\n    print(\"while ended, i =\", i)   # runs, i = 3\n\nfor k in range(5):\n    if k == 2:\n        break\nelse:\n    print(\"not printed\")\nprint(k)                           # 2\n```",
   "A common misunderstanding is to think the `else` runs instead of the loop when the condition is false, as with `if`. It does not replace the loop; it follows it. If a `while` loop runs five times and then its condition fails, the `else` runs after those five iterations. Another misunderstanding is indentation. An `else` indented to line up with an `if` inside the loop belongs to that `if`, not to the loop, and then runs on every iteration where the `if` is false. The column decides everything. If you find loop-else hard to read in your own code, a flag variable is always an acceptable alternative, but you must still be able to trace the `else` form on the exam.",
   "Consider a worked example. A login script gives the user three attempts with `for attempt in range(3):`, reading a password each time and breaking on a correct one. The `else` clause after the loop prints `Account locked`. If the user gets it right on the second try, `break` runs and the `else` is skipped. If all three attempts fail, the loop ends normally and the account is locked. A developer who indents the `else` under the `if` inside the loop instead would print `Account locked` after every wrong attempt, which is a completely different program, even though the user can still log in on a later attempt.",
   "Common mistakes: thinking `continue` skips the `else`; thinking an empty loop skips it; and misreading which statement an `else` belongs to. Many programmers avoid loop-else because it confuses readers, but it is part of the PCEP syllabus. Exam questions typically show a loop with a `break` inside a condition and ask whether the `else` text appears. Clue words: loop else, completed without interruption or not found point to the `else` running; found followed by `break` points to it being skipped. When tracing, ask one question after the loop finishes: did a `break` execute? If yes, skip the `else`; if no, run it."
  ],
  "analogy": "A loop with an `else` is like a lifeguard's patrol along a beach. The lifeguard walks from one end to the other. If they spot a swimmer in trouble, they break off the patrol and go to help, and the end-of-patrol report is never filed. If they reach the far end without breaking off, they file the report saying all clear, which is the `else`. Stopping briefly to pick up litter and carrying on is like `continue`: the patrol is still completed, so the report is still filed.",
  "terms": [
   [
    "Loop else clause",
    "A block after a for or while loop that runs only if the loop ended without break."
   ],
   [
    "Normal termination",
    "A loop ending because its condition became false or its items ran out."
   ],
   [
    "Search loop",
    "A loop that looks for an item and breaks when it finds it, often paired with else for the not-found case."
   ],
   [
    "break",
    "The statement whose execution causes a loop's else clause to be skipped."
   ],
   [
    "Flag variable",
    "A Boolean that records whether something happened; loop-else can replace one in search loops."
   ]
  ],
  "example": "A login script gives the user three attempts with for attempt in range(3):, breaking on a correct password. The else clause after the loop prints Account locked, which happens only when all three attempts were used without a break. Indenting that else under the inner if would instead print the message after every wrong attempt.",
  "mistakes": [
   [
    "The loop's else runs only when the loop body never ran, like if-else.",
    "It runs whenever the loop finishes without break, whether it ran zero times or many times. It follows the loop rather than replacing it."
   ],
   [
    "continue skips the else clause.",
    "Only break (or leaving through return or an exception) skips the else. A loop that uses continue still finishes normally."
   ],
   [
    "An empty loop skips its else.",
    "A loop over an empty sequence, or a while whose condition is false at the start, ends normally, so its else runs."
   ],
   [
    "A break in an inner loop skips the outer loop's else.",
    "It skips only the inner loop's else. The outer else depends on whether the outer loop itself was ended by break."
   ]
  ],
  "tryit": [
   [
    "A program checks whether a number n greater than 1 is prime with for d in range(2, n): if n % d == 0: print(\"not prime\") and break, then an else at loop level printing \"prime\". What does it print for n = 9 and for n = 7?",
    "For 9, the loop finds d = 3 divides 9, prints not prime and breaks, so the else is skipped. For 7, no divisor is found, the loop ends normally and the else prints prime."
   ],
   [
    "A colleague wants to replace a found flag in a search loop with loop-else. The loop currently uses continue to skip blank entries and break when the target is found. Will the else correctly report not found?",
    "Yes. continue does not affect the else, so skipped blank entries are fine. The else runs only when the loop ends without break, which is exactly the not-found case."
   ]
  ],
  "tip": "Read else after a loop as if no break. An empty loop still runs its else, and continue does not prevent it.",
  "check": [
   [
    "Does for x in range(0): pass followed by else: print(\"E\") print E?",
    "Yes. The loop ends normally (it simply had no items) and no break ran."
   ],
   [
    "If a for loop executes continue on every iteration, does its else run?",
    "Yes. Only break (or leaving via return or an exception) skips the else."
   ],
   [
    "When is the else of a while loop skipped?",
    "When the loop is exited with break."
   ],
   [
    "A break in an inner loop runs. Is the outer loop's else skipped?",
    "Not because of that. The inner break skips only the inner loop's else; the outer else runs if the outer loop itself ends without break."
   ]
  ]
 },
 {
  "t": "Nested loops and counting iterations",
  "hook": "The Starlight Cinema in Ashford Falls is reopening after renovation, and Leon, the manager, wants seat labels printed for every seat before Friday. Your script prints labels from A1 to E10 using one loop inside another. Leon has ordered exactly 50 blank label cards. On Thursday he tells you the last two seats in rows D and E have been removed for a wheelchair space, and asks how many cards he can send back. You add one line with a `break` to skip the closed seats. Now you need an exact number, not a guess, before the print shop closes. How many labels will your loops really print?",
  "simple": "A nested loop is a loop inside another loop. For every single round of the outer loop, the inner loop runs all the way through from the beginning. Think of a clock: for every hour the hour hand moves, the minute hand goes all the way around. Counting how many times the inner part runs is a common exam task. If the inner loop always does the same number of rounds, just multiply: 4 outer rounds times 3 inner rounds is 12. But if the inner loop's size changes depending on which outer round you are in, you cannot multiply. Instead you write down the count for each outer round and add them up.",
  "body": [
   "A nested loop is a loop inside the body of another loop. For every single iteration of the outer loop, the inner loop runs from start to finish. Nested loops are how you work with two-dimensional data such as rows and columns, generate every pair of items, or print patterns and tables. The outer loop decides how many times the inner loop is started; the inner loop decides how much work each start does. Both loops can be `for` loops, both can be `while` loops, or you can mix them.",
   "```python\nfor row in range(1, 4):\n    for col in range(1, 4):\n        print(row * col, end=\"\\t\")\n    print()   # new line after each row\n# 1 2 3 / 2 4 6 / 3 6 9\n```",
   "That prints a 3 by 3 multiplication table. Notice the structure: the inner `print` uses `end=\"\\t\"` to keep values on one line separated by tabs, and the outer loop's own `print()` runs once per row, after the inner loop finishes. Which loop a statement belongs to is decided only by its indentation. Move that bare `print()` one level to the right and it runs after every value, putting each number on its own line. When counting, always check the column each statement starts in before deciding which loop it belongs to.",
   "Counting iterations is a favorite exam task. When the inner loop's range does not depend on the outer variable, the total number of inner-body executions is simply outer count multiplied by inner count: `for i in range(4): for j in range(3):` runs the inner body 12 times, and the outer body runs 4 times. When the inner range depends on the outer variable, you must add up each round separately. In `for i in range(4): for j in range(i):`, the inner loop runs 0, 1, 2 and 3 times, for a total of 6. In `for i in range(1, 4): for j in range(i, 4):` it runs 3, 2 and 1 times, again 6. Write the counts per outer value in a small table; do not try to do it in your head. A useful shortcut is that the sum 1 + 2 + ... + n equals n x (n + 1) / 2, so a triangle of rows 1 to 10 has 55 inner iterations.",
   "```python\ncount = 0\nfor i in range(3):\n    for j in range(i, 3):\n        count += 1\nprint(count)   # 3 + 2 + 1 = 6\n\nfor i in range(1, 4):\n    print(\"*\" * i)   # *, **, ***\n```",
   "The second snippet shows that patterns do not always need two loops. String repetition with `*` builds each row in one step, so only one loop is needed to print a triangle of asterisks. On the exam, a question about how many asterisks are printed may use either form; in both cases you add the row lengths, here 1 + 2 + 3 = 6.",
   "`break` and `continue` change the counts. A `break` in the inner loop ends only that run of the inner loop, so the outer loop keeps going and the inner loop starts fresh on the next outer iteration. A `while` loop nested in a `for`, or the reverse, follows the same rules, but make sure the inner loop's control variable is reset inside the outer loop. If you set `j = 0` only once, before both loops, the inner `while` runs fully on the first outer pass and not at all afterwards, because `j` already fails the condition.",
   "Consider a worked example. A cinema seating chart loops `for row in \"ABCDE\":` and inside `for seat in range(1, 11):` to print labels like A1 to E10. The inner print runs 5 x 10 = 50 times, while the outer loop's newline print runs 5 times. When management closes seats 9 and 10 in rows D and E, the programmer adds `if row in \"DE\" and seat > 8: break` as the first line of the inner loop; now the label print runs 10 + 10 + 10 + 8 + 8 = 46 times, and the outer loop still runs 5 times. Nested loops multiply work quickly: two loops over 1,000 items each means a million inner iterations, which is why programmers avoid unnecessary nesting in larger programs.",
   "Common mistakes: multiplying when the inner range uses the outer variable, forgetting that the inner loop restarts from its beginning each time, counting the outer body's statements as inner ones because of misread indentation, and forgetting to reset an inner `while` counter. Exam clue words: how many times is the message printed means count the inner body; how many asterisks means sum the per-row counts; nested with `break` means only the inner loop is cut short. Build a small table of outer value against inner count, then add it up. Double-check by testing the first and last outer values."
  ],
  "analogy": "Nested loops work like a clock's hands. For every single step of the hour hand, the minute hand sweeps all the way around from the beginning. If you want to know how many minute ticks happen in four hours, you multiply: 4 times 60. The analogy stops working when the inner range depends on the outer variable. That is like a strange clock whose minute hand sweeps a different distance every hour; then you cannot multiply and must add up each hour's sweep separately.",
  "terms": [
   [
    "Nested loop",
    "A loop placed inside the body of another loop; the inner loop completes fully for each outer iteration."
   ],
   [
    "Outer loop",
    "The enclosing loop, which controls how many times the inner loop is started."
   ],
   [
    "Inner loop",
    "The enclosed loop, which restarts from its beginning on every outer iteration."
   ],
   [
    "Iteration count",
    "The total number of times a loop body runs, found by multiplying or summing per outer pass."
   ],
   [
    "Dependent range",
    "An inner range whose bounds use the outer loop variable, so counts differ per outer pass."
   ]
  ],
  "example": "A cinema seating chart loops for row in \"ABCDE\": and inside for seat in range(1, 11): to print labels like A1 to E10. The inner print runs 5 x 10 = 50 times, while the outer loop's newline print runs 5 times. Adding a break for closed seats in two rows cuts the inner count to 46 without changing the outer count.",
  "mistakes": [
   [
    "You can always multiply the outer count by the inner count.",
    "Only when the inner range does not depend on the outer variable. For a dependent range such as range(i), list each pass's count and add them."
   ],
   [
    "The inner loop continues from where it left off on the next outer pass.",
    "A for inner loop starts again from the beginning of its range on every outer iteration."
   ],
   [
    "A break in the inner loop reduces the outer loop's count.",
    "The outer loop still runs all its iterations; break only shortens the current run of the inner loop."
   ],
   [
    "An inner while counter set once before both loops works like an inner for loop.",
    "It must be reset inside the outer loop; otherwise it keeps its final value and the inner while never runs again after the first pass."
   ]
  ],
  "tryit": [
   [
    "A program prints a staircase: for i in range(1, 6): for j in range(i): print(\"#\", end=\"\"), then print() at the outer level. Your teacher asks how many # characters and how many lines appear. What are the numbers and how do you find them?",
    "The inner loop runs 1, 2, 3, 4 and 5 times, so 1 + 2 + 3 + 4 + 5 = 15 # characters. The print() at the outer level runs once per outer iteration, so 5 lines. You must add rather than multiply because the inner range depends on i."
   ],
   [
    "A teammate's code has j = 0 before an outer for loop over three classes, and inside it while j < 4: print a seat and j += 1. Only four seats print instead of twelve. What is wrong?",
    "j is never reset, so after the first class it stays at 4 and the inner while condition fails for the other two classes. Move j = 0 inside the outer loop, just before the while."
   ]
  ],
  "tip": "If the inner range uses the outer variable, never multiply; list the inner count for each outer value and add them up.",
  "check": [
   [
    "How many times does print run in for i in range(3): for j in range(4): print(i, j)?",
    "12 times (3 x 4)."
   ],
   [
    "How many times does the inner body run in for i in range(1, 5): for j in range(i):?",
    "1 + 2 + 3 + 4 = 10 times."
   ],
   [
    "With a while loop inside a for loop, why reset the inner counter inside the outer loop?",
    "Otherwise the counter keeps its final value after the first pass and the inner while never runs again."
   ],
   [
    "How many times does the inner body run in for i in range(3): for j in range(5): if j == 2: break?",
    "9 times: on each of the 3 outer passes the inner body runs for j = 0, 1 and 2, and break ends the inner loop at j = 2."
   ]
  ]
 },
 {
  "t": "The value of the loop variable after a for loop ends",
  "hook": "Sam runs the parts inventory for Copperfield Bike Repair, and a customer is standing at the counter waiting for a brake cable. Sam types the part code into the lookup script you wrote, and it confidently reports the item at the end of the list, a set of handlebar grips. The brake cable is not in stock at all, but the program did not say so. Your search loop breaks when it finds a match and then prints the item at the loop's index. It worked every time you tested it with parts that existed. What value does that index hold when the loop finds nothing and simply runs out of items?",
  "simple": "When a `for` loop finishes, its loop variable does not vanish. It keeps the last value it was given, like a bookmark left in the last page you read. If you looped over `range(5)`, the numbers were 0 to 4, so afterward the variable holds 4, not 5, because 5 was never handed out. If the loop stopped early with `break`, the variable holds whatever value it had at that moment. If the loop had nothing to go through at all, the variable is never set; if it did not exist before, using it causes an error, and if it did exist, it keeps its old value. A counting `while` loop is different: its counter usually ends one step past the last value that passed.",
  "body": [
   "In Python, the loop variable of a `for` loop is an ordinary variable in the surrounding scope. It does not disappear when the loop ends. After the loop, it still holds the last value it was assigned. Many other languages treat loop variables as local to the loop, so this is a favorite PCEP trap, and questions often print the variable right after the loop. Nothing resets or deletes it for you.",
   "```python\nfor i in range(5):\n    pass\nprint(i)      # 4, not 5\n```",
   "Notice the value: 4, not 5. `range(5)` produces 0 to 4, and the loop variable is only ever bound to values the range produces. The stop value is never assigned. Compare this with a `while` loop that counts with `i += 1` while `i < 5`: there the variable ends at 5, because the final increment happens before the condition fails. Exam questions often put these two side by side precisely to catch this difference. The same rule applies to any iterable: after looping over a string, the variable holds the last character; after looping over a list, it holds the last element. The loop never assigns anything beyond the final item, so there is no one past the end value as there is with a counting `while` loop.",
   "```python\ni = 0\nwhile i < 5:\n    i += 1\nprint(i)      # 5\n\nfor ch in \"code\":\n    pass\nprint(ch)     # e\n\nfor n in range(10):\n    if n * n > 20:\n        break\nprint(n)      # 5\n```",
   "If the loop is ended by `break`, the variable keeps the value it had when `break` ran. In the example above, `n` is 5 afterwards, because 5 x 5 = 25 is the first square over 20. If the iterable is empty, the loop body never runs and the loop variable is never assigned. If the name did not exist before, using it afterwards raises `NameError`. If it already existed, it keeps its old value: with `x = 99` followed by `for x in []: pass`, `x` is still 99.",
   "Assigning to the loop variable inside the body does not affect the next iteration of a `for` loop. In `for i in range(3): i = 10`, the next iteration still gets the next value from the range, and after the loop `i` is 10, because the last thing done to it was the assignment in the final iteration. The iterable decides each new value; your assignments only last until the next iteration starts. This is different from a `while` loop, where changing the counter inside the body directly changes what the condition sees next. So `i = 0; while i < 3: i = 10` runs its body once and stops, while the `for` version always runs three times.",
   "A loop variable can also overwrite an existing variable of the same name. If you had `i = 100` before `for i in range(2):`, the old value is lost and `i` ends at 1. That is a common source of subtle bugs in longer programs, where a name such as `total` or `item` is reused as a loop variable and the original value silently disappears. Choosing distinct, descriptive names avoids it.",
   "Consider a worked example. A script searches a list with `for idx in range(len(items)):`, breaking when it finds a match, then prints `items[idx]`. When a match exists, `idx` holds its index and the output is correct. When no match exists, `idx` is simply the last index, not a not-found marker, so the program wrongly reports the last item as the match. If `items` is empty, the loop never runs and `print(items[idx])` fails with `NameError`. A loop `else` clause or a `found` flag fixes both problems, because it distinguishes stopped by break from ran out of items.",
   "Common mistakes: answering with the stop value of the range, assuming the variable is undefined after the loop, forgetting that `break` freezes the variable at its current value, and forgetting that assignments in the final iteration stick. Exam clue words: after the loop or value of i printed after means the last assigned value; empty range means unchanged or `NameError`; while loop counter usually means the stop value itself. When tracing, keep one column for the loop variable, update it at the top of each iteration and at every assignment, and its final entry is the answer."
  ],
  "analogy": "The loop variable is like a name tag that a conference volunteer moves from guest to guest as each one arrives. When the last guest arrives, the tag stays on that guest; it does not jump to an imaginary guest who never came. If the volunteer is called away mid-line, the tag stays on whoever was being greeted at that moment, which is `break`. If no guests arrive, the tag never moves at all. A counting `while` loop is different, more like a ticket dispenser that has already printed the next number before anyone notices there is nobody left in line.",
  "terms": [
   [
    "Loop variable scope",
    "In Python a for loop's variable remains defined after the loop, holding its last value."
   ],
   [
    "Last assigned value",
    "For range(n), the loop variable ends at n - 1, not n."
   ],
   [
    "Counter variable",
    "A variable a while loop updates itself; it usually ends one step past the last passing check."
   ],
   [
    "NameError",
    "Raised if you use a loop variable that was never assigned because the loop ran zero times."
   ],
   [
    "Tracing",
    "Recording each variable's value step by step to predict a program's output."
   ]
  ],
  "example": "A script searches a list with for idx in range(len(items)):, breaking when it finds a match, then prints items[idx]. If no match exists, idx is the last index, not a not-found marker, so the program wrongly reports the last item. A for-else or a found flag fixes it.",
  "mistakes": [
   [
    "After for i in range(5), i is 5.",
    "The range only produces 0 to 4, so i ends at 4. The stop value is never assigned."
   ],
   [
    "The loop variable no longer exists after the loop.",
    "Python keeps it in the surrounding scope with its last assigned value."
   ],
   [
    "After a loop over an empty range, the variable is 0 or None.",
    "It is never assigned. It keeps any earlier value, or using it raises NameError if it never existed."
   ],
   [
    "Assigning to the loop variable inside a for loop changes the next iteration.",
    "The iterable supplies each new value regardless. Only an assignment in the final iteration survives after the loop."
   ]
  ],
  "tryit": [
   [
    "A student writes total = 50, then for total in range(3): print(total), then print(total + 10). They expected 60 at the end. What actually prints last, and why?",
    "12. The loop reuses the name total, overwriting 50; after the loop total holds the last range value, 2, so total + 10 is 12. Using a different loop variable name would keep the original 50."
   ],
   [
    "Two snippets are compared in a code review: one counts with i = 0 and while i < 4: i += 1, the other uses for i in range(4): pass. Each then prints i. What do they print?",
    "The while version prints 4, because the final increment happens before the condition fails. The for version prints 3, because range(4) never hands out 4."
   ]
  ],
  "tip": "After for i in range(n), i is n - 1; after a counting while loop, the counter is usually n. After an empty for loop, the variable is unchanged or undefined.",
  "check": [
   [
    "What is printed by for k in range(2, 9, 3): pass followed by print(k)?",
    "8. The range yields 2, 5, 8, so the last value assigned is 8."
   ],
   [
    "What happens with for z in range(0): pass then print(z), if z was never defined?",
    "NameError, because the empty loop never assigned z."
   ],
   [
    "After for i in range(4): i *= 2, what is i?",
    "6. The last iteration gets i = 3 from the range and then doubles it."
   ],
   [
    "After for c in \"loop\": if c == \"o\": break, what is c?",
    "\"o\", because break runs at the first o and the variable keeps that value."
   ]
  ]
 },
 {
  "t": "Lists: building, indexing (including negative indexes) and slicing",
  "hook": "Priya keeps the weather station for Hollow Pine Middle School's science club, and every evening a short script posts today's temperature to the club noticeboard. Tonight the script crashes with `IndexError: list index out of range`. The list holds exactly seven readings, one for each day of the week, and the line that fails asks for item 7, which seemed like the obvious place to find the seventh day. Strangely, a different line asking for items 5 to 10 ran perfectly, even though there is nothing at position 10. Why does one request crash while another, which reaches even further, quietly works?",
  "simple": "A list is a row of values kept in order, like numbered lockers in a hallway. You write it with square brackets, such as `[10, 20, 30]`. Each item has a position number called an index, and counting starts at 0, not 1, so the first locker is number 0. You can also count from the end using negative numbers: -1 is the last item, -2 the one before. Asking for a locker that does not exist causes an error. A slice asks for a stretch of lockers, from a start position up to but not including a stop position, and gives back a new list. Slices are forgiving: if you ask for lockers past the end, you simply get the ones that exist.",
  "body": [
   "A list is an ordered, changeable (mutable) collection of values. You write it with square brackets and commas: `nums = [10, 20, 30]`. A list may contain values of mixed types, duplicates and even other lists, so `[1, \"two\", 3.0, [4]]` is perfectly legal. An empty list is `[]` or `list()`. You can also build a list from any iterable, so `list(\"abc\")` is `['a', 'b', 'c']` and `list(range(3))` is `[0, 1, 2]`. Two operators build new lists from old ones: `+` concatenates (`[1, 2] + [3]` is `[1, 2, 3]`) and `*` repeats (`[0] * 3` is `[0, 0, 0]`). Lists matter because almost every real program handles a collection of things: scores, names, readings or lines of a file.",
   "Indexing selects one element by position with square brackets. Positions start at 0, so in `nums = [10, 20, 30]`, `nums[0]` is 10 and `nums[2]` is 30. The last valid positive index is always `len(nums) - 1`. Negative indexes count from the end: `nums[-1]` is the last element (30), `nums[-2]` is the second last, and `nums[-len(nums)]` is the first. Any index outside the range from `-len(nums)` to `len(nums) - 1` raises `IndexError: list index out of range`. Because lists are mutable, you can assign through an index: `nums[1] = 99` changes the list in place to `[10, 99, 30]`. Indexes must be integers; `nums[1.0]` raises `TypeError`, even though the value looks like one.",
   "Slicing extracts part of a list as a new list, using `lst[start:stop:step]`. Like `range()`, the start is included and the stop is excluded, so the slice contains `stop - start` items when the step is 1. Omitting start means from the beginning, omitting stop means to the end, and step defaults to 1. Negative values work in all three positions. A step of 2 takes every second item, and a negative step walks backwards from right to left.",
   "```python\nx = [\"a\", \"b\", \"c\", \"d\", \"e\"]\nprint(x[1:3])     # ['b', 'c']\nprint(x[:2])      # ['a', 'b']\nprint(x[-2:])     # ['d', 'e']\nprint(x[::2])     # ['a', 'c', 'e']\nprint(x[::-1])    # ['e', 'd', 'c', 'b', 'a']\nprint(x[4:1:-1])  # ['e', 'd', 'c']\nprint(x[3:1])     # []\nprint(x[2:100])   # ['c', 'd', 'e']\n```",
   "The key distinction the exam tests is that slices are forgiving where indexes are strict. A slice with positions beyond the end never raises an error; it just stops at the edge, so `x[2:100]` is `['c', 'd', 'e']`. If start is at or after stop with a positive step, the result is an empty list, as `x[3:1]` shows. With a negative step the slice moves right to left, so start must be to the right of stop: `x[4:1:-1]` works, while `x[1:4:-1]` is empty. A second distinction is element versus list: a single index returns an element, while a slice always returns a list, even with one item. `x[0]` is `'a'` but `x[0:1]` is `['a']`.",
   "Reading a slice never changes the original, which is why `x[:]` is a common way to copy a list. Assigning to a slice, however, does change it, and the replacement may have a different length: `x[1:3] = [\"B\"]` replaces two items with one, giving `['a', 'B', 'd', 'e']`, and `del x[1:3]` removes a range. Compare `x[0] = [1, 2]`, which puts a nested list in position 0, with `x[0:1] = [1, 2]`, which replaces one item with two separate items.",
   "Consider a worked example. A weather script stores a week of temperatures as `temps = [14, 16, 15, 19, 21, 18, 17]`. Today's reading is the last one, `temps[-1]`, which is 17, and yesterday's is `temps[-2]`, 18. The weekend is the last two days, `temps[-2:]`, giving `[18, 17]`. The first three days are `temps[:3]`, which is `[14, 16, 15]`, and every other day starting with Monday is `temps[::2]`, `[14, 15, 21, 17]`. If a sensor reported a wrong value for Wednesday, `temps[2] = 16` fixes it in place. Asking for `temps[7]` raises `IndexError`, because the seven items occupy positions 0 to 6, but `temps[5:10]` quietly returns `[18, 17]`.",
   "Common mistakes: counting from 1 instead of 0 and so treating `lst[len(lst)]` as the last item (it raises `IndexError`); forgetting that the stop position is excluded, so `x[1:3]` has two items, not three; expecting a one-item slice to be a plain value; writing a backward slice with start and stop in the wrong order and getting `[]`; and assuming that assigning to a slice behaves like assigning to an index.",
   "Exam questions on this topic are almost always what is printed snippets. Patterns to watch: a negative index means count from the end, starting at -1; `[::-1]` means reversed copy; a slice whose start is past its stop with a positive step means an empty list `[]`; an index equal to `len()` means `IndexError`; and a slice past the end means no error, just fewer items. When the answer choices include both `'a'` and `['a']`, check whether the code used an index or a slice. Work each slice out by writing the positions under the items, including the negative ones, before you pick an answer."
  ],
  "analogy": "A list is like a row of numbered mailboxes in an apartment lobby, numbered from 0 instead of 1. An index is asking the clerk for the contents of one mailbox; ask for box 7 in a row of seven boxes numbered 0 to 6 and the clerk says that box does not exist, which is `IndexError`. A slice is asking for everything from box 5 up to, but not including, box 10; the clerk hands you what is in boxes 5 and 6 and does not complain about the missing ones. Where it stops matching: a real clerk would not number boxes from the back, but Python lets you use -1 for the last one.",
  "terms": [
   [
    "List",
    "An ordered, mutable sequence of values written in square brackets, such as `[1, 2, 3]`."
   ],
   [
    "Index",
    "An integer position used in square brackets to select one element, starting at 0 on the left."
   ],
   [
    "Negative index",
    "A position counted from the end of a sequence, where -1 is the last element."
   ],
   [
    "Slice",
    "The expression `lst[start:stop:step]`, which returns a new list from start up to but not including stop."
   ],
   [
    "Step",
    "The third slice value, giving the stride between items; a negative step walks from right to left."
   ],
   [
    "IndexError",
    "The exception raised when an index falls outside the valid range of a sequence."
   ],
   [
    "Mutable",
    "Able to be changed in place; lists are mutable, so you can assign through an index or a slice."
   ]
  ],
  "example": "A small shop script keeps the last ten sales amounts in a list called `sales`. The owner wants the most recent sale, so the script prints `sales[-1]`. For a quick trend view it prints `sales[-3:]`, the three latest sales, and for a report in reverse chronological order it loops over `sales[::-1]`. When a refund corrects the fifth sale, the script assigns `sales[4] = 0`. On a quiet day with only two sales recorded, `sales[-3:]` still works and simply returns the two that exist, while `sales[9]` would raise IndexError.",
  "mistakes": [
   [
    "`lst[len(lst)]` is the last item.",
    "Indexes start at 0, so the last valid index is len(lst) - 1, or simply -1. lst[len(lst)] raises IndexError."
   ],
   [
    "`x[1:3]` contains three items.",
    "The stop is excluded, so it contains positions 1 and 2, two items."
   ],
   [
    "A slice that runs past the end raises IndexError, just like an index.",
    "Slices never raise for out-of-range positions; they return whatever exists, possibly an empty list."
   ],
   [
    "`x[0]` and `x[0:1]` give the same result.",
    "An index returns the element itself, such as 'a'; a slice always returns a list, such as ['a']."
   ]
  ],
  "tryit": [
   [
    "A quiz app stores questions in a list called qs. To show the final three questions in reverse order for a review screen, a developer writes qs[-1:-4]. The screen comes up blank. Why, and what should be written instead?",
    "With the default positive step, a slice moves left to right, and -1 is already to the right of -4, so the result is empty. Use a negative step: qs[-1:-4:-1] gives the last three in reverse, or qs[-3:][::-1] reverses the last three after slicing them."
   ],
   [
    "A list scores = [70, 85, 90] needs the middle score replaced by two make-up scores, 80 and 88, keeping all values as separate items. Should you write scores[1] = [80, 88] or scores[1:2] = [80, 88]?",
    "Use scores[1:2] = [80, 88], which replaces one item with two and gives [70, 80, 88, 90]. scores[1] = [80, 88] would put a nested list in position 1, giving [70, [80, 88], 90]."
   ]
  ],
  "tip": "Indexes out of range raise IndexError, but slices out of range quietly return what exists, possibly an empty list. A one-item slice is still a list, so x[0] and x[0:1] print differently.",
  "check": [
   [
    "Given `x = [5, 6, 7, 8]`, what do `x[-1]`, `x[1:3]` and `x[::-1]` produce?",
    "8, `[6, 7]` and `[8, 7, 6, 5]`: -1 is the last item, the slice stops before index 3, and a step of -1 reverses."
   ],
   [
    "What does `[1, 2, 3][3]` do, and what does `[1, 2, 3][3:5]` do?",
    "The index raises IndexError because the valid positions are 0 to 2; the slice returns an empty list `[]` because slices never raise for out-of-range positions."
   ],
   [
    "What is the result of `[1, 2, 3, 4][3:1]`?",
    "An empty list, because with the default positive step a slice cannot move from position 3 back to position 1."
   ],
   [
    "After `x = [\"a\", \"b\", \"c\"]` and `x[1:2] = [\"p\", \"q\"]`, what is `x`?",
    "`['a', 'p', 'q', 'c']`, because assigning to a slice replaces that part of the list and the replacement can have a different length."
   ]
  ]
 },
 {
  "t": "List methods and functions: append(), insert(), index(), remove(), sort(), len(), sorted(), del",
  "hook": "It is Friday afternoon at Maple Ridge Middle School, and Priya, the only person on staff who knows any Python, gets a message from the vice principal: the honor roll script printed \"None\" instead of a ranked list of names, and the assembly is Monday morning. You open the file and find a single line, `ranked = names.sort()`, followed by `print(ranked)`. The list of names is right there, perfectly sorted, yet the variable meant to hold it is empty. Nothing crashed and no error appeared. So where did the sorted list go, and why did Python hand back nothing at all?",
  "simple": "A list is like a numbered shopping list, and Python gives you tools to change it. Some tools are attached to the list itself and are called with a dot, such as `groceries.append(\"milk\")`. These tools change the list you already have and give back nothing, which Python writes as `None`. Other tools are general functions, such as `sorted(groceries)`, which leave your list alone and hand you a brand-new sorted copy. Think of the difference between rearranging the papers on your own desk (the list changes, nothing new appears) and photocopying them in order (your desk stays as it was, and you get a new stack). Also remember that `remove()` looks for a value, like \"milk\", while `del` and `pop()` work with a position number.",
  "body": [
   "Lists come with methods, which you call with dot notation on the list itself (`lst.append(4)`), and they also work with general built-in functions such as `len()` and `sorted()` and with the `del` statement. The difference matters on the exam: methods like `append()` and `sort()` change the list in place and return `None`, while functions like `sorted()` leave the list alone and return something new. Knowing which tool mutates and which returns a value is the key to predicting output.",
   "`lst.append(x)` adds one item to the end. If `x` is itself a list, it is added as a single nested element, so after `a = [1, 2]` and `a.append([3, 4])`, `a` is `[1, 2, [3, 4]]` with length 3. (The related method `extend()` adds each item separately.) `lst.insert(i, x)` puts `x` at position `i` and shifts later items right. An index beyond the end simply appends, `insert(0, x)` puts `x` at the front, and a negative index inserts before that position counted from the end, so `insert(-1, x)` places `x` just before the last item, not at the very end.",
   "`lst.index(x)` returns the position of the first occurrence of the value `x` and raises `ValueError` if `x` is not in the list. `lst.remove(x)` deletes the first occurrence of the value `x`, not the item at index `x`, and also raises `ValueError` if it is absent. The `del` statement removes by position instead: `del lst[0]` removes the first item, `del lst[1:3]` removes a slice, and `del lst` deletes the variable itself, so using `lst` afterwards raises `NameError`. A position that does not exist, as in `del lst[10]`, raises `IndexError`. `lst.pop()` removes and returns the last item, and `lst.pop(i)` does the same for position `i`.",
   "```python\nx = [3, 1, 2]\nx.append(5)        # [3, 1, 2, 5]\nx.insert(0, 9)     # [9, 3, 1, 2, 5]\nx.remove(1)        # [9, 3, 2, 5]  (value 1, not index 1)\ndel x[-1]          # [9, 3, 2]\nprint(x.index(2), len(x))  # 2 3\ny = sorted(x)      # new list [2, 3, 9]; x unchanged\nx.sort(reverse=True)\nprint(x, y)        # [9, 3, 2] [2, 3, 9]\n```",
   "`lst.sort()` sorts the list in place, ascending by default, or descending with `sort(reverse=True)`. It returns `None`, so `y = x.sort()` leaves `y` equal to `None`, one of the most common traps. `sorted(iterable)` is a built-in function that returns a new sorted list and leaves the original unchanged. It works on any iterable, including strings and tuples, and always returns a list: `sorted(\"cab\")` is `['a', 'b', 'c']`. It also accepts `reverse=True`. Sorting a list that mixes numbers and strings raises `TypeError` because they cannot be compared with `<`. Strings sort by character code, so `\"Zoe\"` comes before `\"adam\"`. The in-place method `lst.reverse()` flips the order and also returns `None`, while `reversed()` is a function. `len(lst)` returns the number of top-level items; a nested list counts as one item, so `len([1, [2, 3]])` is 2. Other handy tools are `lst.count(x)` and the functions `min()`, `max()` and `sum()`.",
   "Consider a worked example. A to-do app starts with `tasks = [\"email\", \"shop\"]`. The user adds \"gym\" at the end with `tasks.append(\"gym\")` and an urgent \"call bank\" at the top with `tasks.insert(0, \"call bank\")`, giving `['call bank', 'email', 'shop', 'gym']`. Finishing shopping, the app calls `tasks.remove(\"shop\")`. To display tasks alphabetically without disturbing the user's own order, it prints `sorted(tasks)`, which shows `['call bank', 'email', 'gym']` while `tasks` keeps its order. To show how many remain it prints `len(tasks)`, which is 3. If the user asks to remove \"shop\" again, `remove()` raises `ValueError`, so the app first checks `if \"shop\" in tasks:`. Clearing the top task by position uses `del tasks[0]`.",
   "Why does Python design list methods to return `None` at all? It is a deliberate signal. If `sort()` returned the list, a reader might assume it returned a new sorted copy and that the original was untouched. Returning `None` makes the in-place nature of the change obvious the first time you try to use the result. You can see the pattern in the interactive prompt: typing `[3, 1, 2].sort()` echoes nothing, while typing `sorted([3, 1, 2])` echoes `[1, 2, 3]`. The same rule holds for `append()`, `insert()`, `remove()` and `reverse()`. By contrast, `pop()` and `index()` do return something useful, the removed item and the position respectively, so they are the exceptions worth memorizing among the methods.",
   "Common mistakes: assigning the result of an in-place method (`x = x.sort()` or `x = x.append(4)`) and then finding `x` is `None`; confusing `remove(value)` with `del lst[index]` or `pop(index)`; expecting `append([3, 4])` to add two items instead of one nested list; expecting `index()` or `remove()` of a missing value to raise `IndexError` when it is really `ValueError`; and forgetting that `sorted()` on a string or tuple still returns a list. Another slip is thinking `len()` counts items inside nested lists; it only counts the top level.",
   "Exam wording usually hides the answer in the difference between a method and a function. If a snippet prints the result of `x.sort()`, `x.append()`, `x.insert()`, `x.remove()` or `x.reverse()`, the answer involves `None`. If it prints `sorted(x)` and then `x`, expect a sorted list followed by the original order. \"Removes the first occurrence\" points to `remove()`; \"removes the item at position\" points to `del` or `pop()`; \"returns the position\" points to `index()`. When a question asks which error a missing value causes, choose `ValueError`; for a bad position with `del` or indexing, choose `IndexError`."
  ],
  "analogy": "Think of a list as a row of numbered lockers in a school hallway. `append()` adds a new locker at the end of the row, and `insert()` squeezes one in and renumbers the lockers after it. `remove(\"gym bag\")` walks down the row and empties the first locker holding a gym bag, while `del lockers[3]` empties locker number 3 no matter what is inside. `sorted()` is like taking a photo of the lockers rearranged in order: the hallway itself does not change. The analogy stops at return values: real lockers do not hand you `None`, but Python's in-place methods do.",
  "terms": [
   [
    "Method",
    "A function attached to an object and called with dot notation, such as `lst.append(x)`."
   ],
   [
    "In-place operation",
    "An operation that changes the existing object rather than creating a new one, typically returning `None`."
   ],
   [
    "append()",
    "A list method that adds a single item, which may itself be a list, to the end of the list."
   ],
   [
    "insert()",
    "A list method that places an item before the given position, shifting later items to the right."
   ],
   [
    "remove()",
    "A list method that deletes the first item equal to a given value and raises ValueError if none exists."
   ],
   [
    "sorted()",
    "A built-in function that returns a new sorted list from any iterable, leaving the original unchanged."
   ],
   [
    "del",
    "A statement that removes list items by index or slice, or deletes a variable name entirely."
   ]
  ],
  "example": "A teacher's grading script collects scores in a list with `scores.append(score)` as each test is marked. To publish the top result it uses `max(scores)`, and to print a ranked list without losing the original marking order it prints `sorted(scores, reverse=True)`. When a student's test turns out to be a duplicate, the script calls `scores.remove(72)`, which deletes only the first 72. A new assistant once wrote `ranked = scores.sort()` and printed `ranked`, getting None, which is how the team learned that sort() works in place and returns nothing.",
  "mistakes": [
   [
    "Writing `x = x.sort()` to sort a list and keep it",
    "sort() changes x in place and returns None, so this line replaces your list with None. Write `x.sort()` on its own, or `y = sorted(x)` for a new list."
   ],
   [
    "Believing `remove(1)` removes the item at index 1",
    "remove() searches by value and deletes the first item equal to 1. To delete by position use `del x[1]` or `x.pop(1)`."
   ],
   [
    "Expecting `index()` or `remove()` on a missing value to raise IndexError",
    "A missing value raises ValueError. IndexError is for positions that do not exist, such as `del x[10]` on a short list."
   ],
   [
    "Thinking `append([3, 4])` adds two items",
    "append() always adds exactly one item; here that item is the list [3, 4], so the length grows by one. extend() would add 3 and 4 separately."
   ]
  ],
  "tryit": [
   [
    "A colleague's script holds `queue = [\"ana\", \"ben\", \"cy\"]`. She needs to print the names alphabetically for a report, but the queue order must stay the same because it decides who is served next. She is choosing between `queue.sort()` followed by `print(queue)` and `print(sorted(queue))`. Which should she use?",
    "`print(sorted(queue))`. sorted() returns a new sorted list and leaves queue in its original serving order. queue.sort() would permanently reorder the queue, so the next customer called would be wrong."
   ],
   [
    "A list `codes = [7, 3, 7, 9]` contains a duplicate 7 that should be deleted, keeping the other 7. You know the duplicate is the one at the front. Would you use `codes.remove(7)` or `del codes[2]`, and what is the result?",
    "Use `codes.remove(7)`: it deletes the first 7, giving [3, 7, 9], which is exactly the one at the front. `del codes[2]` deletes by position, so it removes the other 7 and gives [7, 3, 9]. Both leave one 7, but only remove(7) deletes the intended one. `del codes[0]` would also work, because you know its position."
   ]
  ],
  "tip": "Methods that change a list in place (append, insert, remove, sort, reverse) return None. If an answer prints the result of x.sort(), it prints None. remove() works by value, del and pop() by position.",
  "check": [
   [
    "What does `print([3, 1, 2].sort())` display?",
    "None, because sort() sorts the list in place and returns None."
   ],
   [
    "After `a = [1, 2]` and `a.append([3, 4])`, what is `len(a)`?",
    "3, because append() adds the whole list `[3, 4]` as one nested item."
   ],
   [
    "Given `n = [10, 20, 30]`, what is the difference between `n.remove(20)` and `del n[20]`?",
    "remove(20) deletes the value 20, leaving `[10, 30]`; del n[20] tries to delete position 20 and raises IndexError."
   ],
   [
    "What does `sorted(\"bca\")` return, and does it change anything?",
    "It returns the new list `['a', 'b', 'c']`; strings are immutable and sorted() never changes its argument anyway."
   ]
  ]
 },
 {
  "t": "Iterating through lists, in and not in, list comprehensions with conditions",
  "hook": "Daniel runs the volunteer sign-up desk for the Riverbend Food Bank, and the spreadsheet export he gets every Monday is a long Python list of shift hours. His manager wants two things by noon: a list of only the shifts longer than four hours, and a label of \"long\" or \"short\" for every shift so the chart lines up with the original rows. He writes two list comprehensions that look almost identical, yet one returns 12 items and the other returns 31. The chart is broken, the noon deadline is close, and he cannot see why two nearly identical lines behave so differently. What is the one placement detail he is missing?",
  "simple": "Iterating means going through a list one item at a time, like reading names off a class roster from top to bottom. The `in` operator asks a yes-or-no question: is this value in the list? A list comprehension is a short way to build a new list from an old one in a single line. If you add an `if` at the end, it works like a sieve: only items that pass the test get through, so you may end up with fewer items. If you put `if ... else` at the front, it works like a label maker: every item gets a new value, so you always end up with the same number of items. For example, sorting laundry into a \"keep\" pile is filtering, while tagging every shirt \"light\" or \"dark\" is transforming.",
  "body": [
   "The most common thing to do with a list is to process each item in turn. A `for` loop over the list gives you each element directly, one per iteration: `for price in prices: total += price`. The loop variable is simply bound to the next element each time; it is not a position. If you also need positions, loop over `range(len(prices))` or use `enumerate(prices)`, which yields pairs of index and value. When you need to change items in place, use the index form (`prices[i] = prices[i] * 2`), because assigning to the loop variable only rebinds that name and does not modify the list.",
   "```python\nprices = [4, 10, 6]\nfor p in prices:\n    p = p * 2            # rebinds p only; list unchanged\nprint(prices)            # [4, 10, 6]\nfor i in range(len(prices)):\n    prices[i] = prices[i] * 2\nprint(prices)            # [8, 20, 12]\nfor i, p in enumerate(prices):\n    print(i, p)          # 0 8 / 1 20 / 2 12\n```",
   "The membership operators `in` and `not in` test whether a value appears in a list and return `True` or `False`. `3 in [1, 2, 3]` is `True`; `\"x\" not in [\"a\", \"b\"]` is also `True`. They compare with `==`, so `1.0 in [1, 2]` is `True`, and `\"A\" in [\"a\"]` is `False` because string comparison is case-sensitive. They only look at top-level items: `2 in [[1, 2], 3]` is `False`, because the list contains a list and a 3, not a 2, while `[1, 2] in [[1, 2], 3]` is `True`. The same operators work with strings (`\"ell\" in \"hello\"` checks for a substring), tuples and dictionary keys. Note the difference between `for x in lst:` (a loop header) and `x in lst` (an expression that yields a Boolean).",
   "A list comprehension builds a new list from an iterable in a single expression: `[expression for item in iterable]`. It is equivalent to creating an empty list and appending the expression inside a loop, just shorter. Adding an `if` clause at the end filters items: only those for which the condition is true are included. Read `[n for n in range(10) if n % 2 == 0]` as \"n, for each n in range(10), if n is even\". A conditional expression at the front transforms every item instead of filtering: `[\"even\" if n % 2 == 0 else \"odd\" for n in range(3)]` gives `['even', 'odd', 'even']`. This is the distinction the exam cares about. An `if` after the `for` decides whether an item is included and cannot have an `else`. An `if ... else` before the `for` decides what value each item becomes and must have an `else`. You can combine both: `[x * 2 if x > 0 else 0 for x in data if x is not None]`.",
   "```python\nsquares = [n * n for n in range(5)]\nprint(squares)      # [0, 1, 4, 9, 16]\nevens = [n for n in range(10) if n % 2 == 0]\nprint(evens)        # [0, 2, 4, 6, 8]\nlabels = [\"hi\" if n > 2 else \"lo\" for n in [1, 5, 3]]\nprint(labels)       # ['lo', 'hi', 'hi']\n```",
   "It helps to translate a comprehension back into an ordinary loop when you are unsure what it produces. `[n * 2 for n in data if n > 0]` is the same as creating `result = []`, then writing `for n in data:`, then `if n > 0:`, then `result.append(n * 2)`. Notice that the filter becomes an `if` statement inside the loop, wrapping the append. A leading conditional expression, by contrast, lives inside the append itself: `result.append(\"big\" if n > 5 else \"small\")`. Seeing the two shapes side by side explains why the filter cannot take an `else` (there is nothing to append when the test fails) and why the conditional expression must have one (every append needs some value). This translation trick works on any comprehension the exam can show you.",
   "Consider a worked example. A sign-up form collects usernames in `names = [\"ana\", \"Ben\", \"cy\", \"ana\"]`. To check whether \"ben\" is taken, `\"ben\" in names` returns `False`, because only `\"Ben\"` exists; a case-insensitive check is `\"ben\" in [n.lower() for n in names]`, which returns `True`. To list only short names, `[n for n in names if len(n) <= 2]` gives `['cy']`. To mark each name as new or repeated, a loop with `enumerate` compares each name with the slice before it: `\"repeat\" if n in names[:i] else \"new\"`. Written as a comprehension over `enumerate(names)`, the result is `['new', 'new', 'new', 'repeat']`, one label per name because the leading if-else transforms rather than filters.",
   "Common mistakes: expecting `for x in lst: x = 0` to zero the list; putting an `else` on a trailing filter `if`, which is a `SyntaxError`; leaving out the `else` in a leading conditional expression, also a `SyntaxError`; expecting `in` to search nested lists; and modifying a list (adding or removing items) while looping over it, which can skip elements. Loop over a copy, `for x in lst[:]:`, or build a new list with a comprehension instead. Remember too that in Python 3 a comprehension's loop variable does not leak out: after `[i for i in range(3)]`, a name `i` defined only there does not exist, unlike the variable of a normal `for` loop, which keeps its last value.",
   "Exam questions test these ideas by asking for the length or content of a comprehension's result. Clue patterns: an `if` at the end means fewer items, so count only those passing the test; an `if ... else` at the front means the same number of items as the source; `in` with a nested list means look at top-level items only; and a loop that assigns to its loop variable means the list is unchanged. When you see `not in`, evaluate `in` first and flip the result. For a nested comprehension such as `[[0] * 3 for _ in range(2)]`, the outer loop produces rows, giving a 2 by 3 grid of zeros."
  ],
  "analogy": "Picture a mail sorter at a post office. A trailing `if` is a slot that only accepts letters with stamps: anything without a stamp is set aside, so fewer letters come out than went in. A leading `if ... else` is a stamping machine that marks every letter either \"local\" or \"out of town\": exactly as many letters come out as went in, each with a mark. The `in` operator is a clerk who checks only the top layer of the bin; a letter sealed inside a larger envelope (a nested list) is not seen. The analogy breaks for strings, where `in` does find a sequence of characters inside a larger string.",
  "terms": [
   [
    "Iteration",
    "Visiting the items of a collection one at a time, typically with a `for` loop."
   ],
   [
    "enumerate()",
    "A built-in that yields (index, value) pairs so a loop can use both the position and the item."
   ],
   [
    "Membership operator",
    "The operators `in` and `not in`, which return True or False depending on whether a value is present."
   ],
   [
    "List comprehension",
    "An expression of the form `[expr for item in iterable]` that builds a new list in one line."
   ],
   [
    "Filter condition",
    "A trailing `if` in a comprehension that keeps only items for which the condition is true."
   ],
   [
    "Conditional expression",
    "The form `a if condition else b`, which evaluates to one of two values and can transform items in a comprehension."
   ]
  ],
  "example": "A support team exports ticket priorities as a list of numbers. An analyst wants only the urgent ones, so she writes `urgent = [t for t in tickets if t >= 4]`, which may produce fewer items than the original. For a dashboard she needs a label for every ticket, so she writes `[\"urgent\" if t >= 4 else \"normal\" for t in tickets]`, which produces exactly one label per ticket. Before emailing the on-call engineer she checks `if 5 not in tickets:` to skip the message when there are no critical tickets at all.",
  "mistakes": [
   [
    "Writing `[x for x in data if x > 0 else 0]`",
    "A trailing filter cannot have an else, so this is a SyntaxError. To give every item a value, move the condition to the front: `[x if x > 0 else 0 for x in data]`."
   ],
   [
    "Expecting `for x in lst: x = 0` to set every element to zero",
    "Assigning to the loop variable only rebinds that name. To change elements, loop over indexes with `for i in range(len(lst)): lst[i] = 0`."
   ],
   [
    "Believing `2 in [[1, 2], 3]` is True",
    "in checks only the top-level items, which are the list [1, 2] and the number 3, so the result is False. `[1, 2] in [[1, 2], 3]` is True."
   ],
   [
    "Removing items from a list while looping over that same list",
    "Removing shifts later items left, so the loop can skip elements. Loop over a copy (`lst[:]`) or build a new list with a comprehension."
   ]
  ],
  "tryit": [
   [
    "A teacher has `scores = [55, 82, 90, 47, 76]`. She needs a list containing only the passing scores (70 or more) to send to the honor committee, and a separate list with \"pass\" or \"fail\" for every student so it lines up with the roster. Write both comprehensions and give the length of each result.",
    "Passing scores: `[s for s in scores if s >= 70]` gives [82, 90, 76], length 3, because the trailing if filters. Labels: `[\"pass\" if s >= 70 else \"fail\" for s in scores]` gives five labels, because the leading if-else transforms every item."
   ]
  ],
  "tip": "A trailing if filters (fewer items, no else allowed); a leading if-else transforms (same number of items, else required). Also remember that in does not search inside nested lists.",
  "check": [
   [
    "What is `[x for x in range(6) if x % 3 == 0]`?",
    "`[0, 3]`, because the trailing if keeps only values divisible by 3."
   ],
   [
    "What is `len([\"a\" if x else \"b\" for x in [0, 1, 2, 0]])`?",
    "4, because a leading conditional expression transforms every item rather than filtering any out."
   ],
   [
    "Is `2 in [[1, 2], [3]]` True or False, and why?",
    "False, because in checks only top-level items, which here are two lists, not the number 2."
   ],
   [
    "After `nums = [1, 2, 3]` and `for n in nums: n += 10`, what is `nums`?",
    "Still `[1, 2, 3]`, because adding to the loop variable rebinds that name without changing the list."
   ]
  ]
 },
 {
  "t": "Copying vs aliasing lists: b = a compared with a[:] or list(a)",
  "hook": "Sam is building a seating tool for the Lakeview Community Theater. Each new show should start with a copy of the default seating list, and staff then mark seats as sold. On opening night, the box office calls: the Thursday matinee shows seats as sold that nobody bought, and the Saturday show has the same \"sold\" seats. You open the code and see `show_seats = default_seats`, followed by changes to `show_seats`. Every show has been writing into the very same list all week. How can a single equals sign tie three shows together, and what one change would give each show its own list?",
  "simple": "In Python, a variable is a name tag, not a box. When you write `b = a` and `a` is a list, you do not get a second list. You just stick a second name tag on the same list. So if you add something using the name `b`, you will see it when you look through `a` too, because there is only one list. It is like two roommates sharing one whiteboard: if one writes on it, the other sees the note. To get a separate list you make a copy, using `a[:]`, `list(a)` or `a.copy()`. That is like photocopying the whiteboard so each roommate has their own sheet. One catch: if the list contains other lists, those inner lists are still shared after this kind of copy.",
  "body": [
   "In Python, a variable does not contain a list; it holds a reference to a list object stored somewhere in memory. Think of the name as a label tied to the object rather than a box holding it. This small fact explains one of the most tested behaviors on the PCEP (Certified Entry-Level Python Programmer) exam. When you write `b = a` where `a` is a list, Python copies nothing. It ties a second label, `b`, to the very same list object. Now `a` and `b` are two names (aliases) for one list, and a change made through either name is visible through the other.",
   "```python\na = [1, 2, 3]\nb = a          # alias, not a copy\nb.append(4)\nprint(a)       # [1, 2, 3, 4]\nprint(a is b)  # True\nc = a[:]       # a real (shallow) copy\nc[0] = 100\nprint(a, c)    # [1, 2, 3, 4] [100, 2, 3, 4]\nprint(a is c, a == [1, 2, 3, 4])  # False True\n```",
   "To get an independent list, make a copy. Three common ways produce a new list with the same items: slicing the whole list with `a[:]`, calling `list(a)`, and calling the method `a.copy()`. After `c = a[:]`, `c` is a different object, so `c.append(99)` leaves `a` unchanged. The identity operator shows the difference: `a is c` is `False`, while `a == c` is `True` right after copying, because `==` compares contents and `is` compares identity (whether two names refer to the same object). The built-in `id()` returns an object's identity number, and aliases share the same `id()`.",
   "Watch for operations that rebind a name instead of mutating the list. After `b = a`, the statement `b = b + [5]` creates a brand-new list and binds `b` to it, so `a` is not affected and the alias is broken. But `b += [5]` on a list mutates it in place (it behaves like `extend`), so `a` does change. Similarly, `b.append(5)`, `b[0] = 5`, `b.sort()`, `del b[0]` and slice assignment such as `b[:] = []` all mutate the shared object. `del b`, on the other hand, only removes the name `b`; the list survives because `a` still refers to it. Immutable values such as numbers, strings and tuples never show this surprise, because they cannot be changed in place; any \"change\" produces a new object.",
   "These copies are shallow. The new outer list is independent, but if the items are themselves lists, both copies point to the same inner lists. For `m = [[1, 2], [3, 4]]` and `n = m[:]`, the assignment `n[0][0] = 9` changes `m` too, because `n[0]` and `m[0]` are the same inner list. Appending a new row to `n` does not affect `m`. For fully independent nested structures, the standard library offers `copy.deepcopy()` (after `import copy`), which you only need to recognize at this level. Aliasing also happens when you pass a list to a function: the parameter is another name for the caller's list, so a function that appends to its parameter changes the caller's list. That is the same rule, not a special case.",
   "Consider a worked example. A game keeps a default inventory `start = [\"sword\", \"map\"]`. For each new player, the programmer first wrote `inv = start` and then `inv.append(\"potion\")` when the player found one. After three players had found potions, `start` held three potions and every new player began with them, because every `inv` was an alias of `start`. The fix was `inv = start[:]` (or `list(start)`), giving each player a separate list. A check in the REPL (the interactive Python prompt) confirmed it: `inv is start` printed `False` after the fix, and appending to `inv` left `start` as `['sword', 'map']`.",
   "You can confirm what is happening at any time with two quick checks in the interactive prompt. `id(a)` and `id(b)` print each object's identity number; if they match, you have one object with two names. `a is b` answers the same question with True or False. These tools are worth reaching for whenever a value seems to change by itself. In practice, the surprise almost always comes from one of three places: a plain assignment such as `b = a`, a list passed into a function that modifies its parameter, or a shallow copy of a nested list whose inner rows are still shared. Spotting which of the three is involved tells you whether the fix is a slice copy, a copy inside the function, or `copy.deepcopy()`.",
   "Common mistakes: believing `b = a` makes a copy; believing `b = b + [x]` and `b += [x]` behave the same for an aliased list (the first rebinds, the second mutates); assuming `a[:]` copies nested lists deeply; using `==` when the question is about identity, where `is` is needed; and forgetting that passing a list into a function does not copy it. Another subtle one: `b = a` followed by `a = [9]` does not change `b`, because reassigning `a` only moves the label `a` to a new object; `b` still refers to the old list.",
   "Exam questions present a few lines and ask what `a` prints at the end. Clue patterns: `b = a` followed by a mutating method or item assignment on `b` means `a` changes too; `a[:]`, `list(a)` or `a.copy()` before the change means `a` is untouched at the top level; a change to an inner list such as `b[0][1] = x` after a shallow copy means `a` changes anyway; `a is b` asks about identity and `a == b` about contents. When you see `+=` versus `= ... +`, slow down, because that one-character difference decides whether the alias sees the change."
  ],
  "analogy": "Imagine a shared online document. Writing `b = a` is like sending a coworker the link: you both edit the same document, so their changes appear in your view. Making a copy with `a[:]` is like choosing \"make a copy\" and sending that instead: now there are two documents. A shallow copy is a copy that still contains links to the same embedded spreadsheets, so editing an embedded sheet shows up in both documents. The analogy is close, though in Python nothing is copied unless you explicitly ask.",
  "terms": [
   [
    "Reference",
    "The link from a variable name to an object in memory; names hold references, not the objects themselves."
   ],
   [
    "Alias",
    "A second name bound to the same object, so changes through one name are visible through the other."
   ],
   [
    "Shallow copy",
    "A new outer list containing references to the same inner objects, made by `a[:]`, `list(a)` or `a.copy()`."
   ],
   [
    "Deep copy",
    "A copy that also duplicates every nested object, made with `copy.deepcopy()`."
   ],
   [
    "Identity operator",
    "The operator `is`, which returns True only when two names refer to the very same object."
   ],
   [
    "Mutation",
    "Changing an object in place, for example with append(), item assignment or +=, rather than creating a new object."
   ]
  ],
  "example": "A spreadsheet export script loads a list of column headers and passes it to a function that adds a \"Total\" header for one report. Because the function appends to its parameter, the shared header list now contains \"Total\" for every later report as well, and a second report ends up with the column twice. The developer changes the function to work on `headers[:]`, a shallow copy, so each report gets its own list and the original headers stay as loaded.",
  "mistakes": [
   [
    "Believing `b = a` makes a copy of a list",
    "It binds a second name to the same list. Any mutation through b, such as `b.append(4)`, is visible through a. Use `a[:]`, `list(a)` or `a.copy()` for a new list."
   ],
   [
    "Treating `b = b + [5]` and `b += [5]` as identical when b is an alias",
    "`b = b + [5]` builds a new list and rebinds b, so a is unchanged. `b += [5]` extends the shared list in place, so a changes too."
   ],
   [
    "Assuming `a[:]` copies nested lists completely",
    "Slicing makes a shallow copy: the outer list is new but inner lists are shared, so `b[0][0] = 9` also changes a. Use `copy.deepcopy()` for full independence."
   ],
   [
    "Using `==` to check whether two names refer to the same list",
    "`==` compares contents. Use `is` to test identity; two separate lists with the same items are equal but not identical."
   ]
  ],
  "tryit": [
   [
    "A function `add_bonus(points)` runs `points.append(10)` and returns nothing. The main program has `team = [5, 7]`, calls `add_bonus(team)`, and then prints team. A teammate expects [5, 7] because the function did not return anything. What is printed, and how would you keep team unchanged?",
    "[5, 7, 10] is printed. The parameter points is another name for the caller's list, so append() mutates it. To protect team, call `add_bonus(team[:])` or have the function work on a copy such as `points = points[:]` before appending."
   ]
  ],
  "tip": "b = a never copies a list. If a question mutates b after that line, a changes as well. Slices, list() and copy() make new outer lists, but nested lists inside are still shared.",
  "check": [
   [
    "After `a = [1, 2]`, `b = a` and `b.append(3)`, what does `print(a)` show?",
    "`[1, 2, 3]`, because b is an alias for the same list, so the append is visible through a."
   ],
   [
    "After `a = [1, 2]`, `b = a` and `b = b + [3]`, what does `print(a)` show?",
    "`[1, 2]`, because `b + [3]` builds a new list and rebinding b breaks the alias without touching a."
   ],
   [
    "Given `m = [[0], [1]]` and `n = list(m)`, what does `n[0].append(5)` do to `m`?",
    "It changes `m` to `[[0, 5], [1]]`, because list() makes a shallow copy and both outer lists share the inner lists."
   ],
   [
    "Immediately after `c = a[:]`, what are `a == c` and `a is c`?",
    "`a == c` is True because the contents match, and `a is c` is False because the slice created a different object."
   ]
  ]
 },
 {
  "t": "Nested lists and matrices (list of lists)",
  "hook": "Leo is writing a simple booking tool for the Harborview Bowling Center, with 4 lanes and 6 time slots stored as a grid of zeros. He tests his first booking, lane 2 at the 3 o'clock slot, prints the grid, and freezes: every lane now shows that same slot as booked. Customers will be turned away for slots that are actually free. The code that changed the grid is one short line, and it looks correct. The real problem is hidden in the line that built the grid in the first place. How can a grid of independent rows end up acting like four copies of one row?",
  "simple": "A nested list is a list whose items are also lists. It is the usual way to store a table or grid, like a seating chart or a bingo card. Each inner list is one row. To get one value you use two sets of square brackets: the first picks the row, and the second picks the position within that row. Both start counting at 0. So `grid[1][2]` means \"second row, third item.\" It works like finding a seat in a theater: first find your row, then your seat number in that row. One warning: build a grid with a comprehension such as `[[0] * 3 for _ in range(2)]`. The shortcut `[[0] * 3] * 2` makes rows that are secretly the same row, so changing one changes them all.",
  "body": [
   "A list can contain other lists. A list whose items are all lists of the same length is a convenient way to represent a matrix or grid: a table with rows and columns, such as a game board, a seating plan, a timetable or a small spreadsheet of numbers. Each inner list is one row, and the position within that row is the column. Python has no separate built-in matrix type at PCEP level, so a list of lists is the standard tool, and the exam expects you to index, loop over and build them confidently.",
   "```python\ngrid = [\n    [1, 2, 3],\n    [4, 5, 6]\n]\nprint(grid[1])       # [4, 5, 6]  (second row)\nprint(grid[1][2])    # 6          (row 1, column 2)\nprint(grid[-1][-1])  # 6          (bottom-right)\nprint(len(grid), len(grid[0]))  # 2 3\ngrid[0][0] = 99\nprint(grid)          # [[99, 2, 3], [4, 5, 6]]\n```",
   "Indexing uses two sets of brackets, applied left to right. `grid[1]` picks the row, which is itself a list, and then `[2]` picks the element inside that row. So `grid[r][c]` means row `r`, column `c`, both counted from 0. Negative indexes work at both levels. `len(grid)` gives the number of rows, and `len(grid[0])` the number of columns in the first row. You can assign to a single element (`grid[0][0] = 99`) or replace a whole row (`grid[1] = [7, 8, 9]`). Slicing works on the outer list and returns rows: `grid[0:1]` is a list containing the first row. To get a column you must collect it yourself, for example `[row[1] for row in grid]`, which gives `[2, 5]`.",
   "To visit every element, use nested loops: the outer loop over rows, the inner loop over the items of each row. With `for row in grid:` followed by an indented `for value in row:` you get each value in reading order. If you need positions, use `for r in range(len(grid)):` and inside it `for c in range(len(grid[r])):`. Comprehensions are the neat way to build a grid: `[[0] * 3 for _ in range(2)]` creates two separate rows of three zeros, and `[[r * c for c in range(3)] for r in range(3)]` builds a small multiplication table. In a nested comprehension the outer `for` (on the right) makes rows and the inner one (inside the brackets) makes the values in each row. A diagonal, where the row index equals the column index, can be read with `[grid[i][i] for i in range(len(grid))]` on a square grid.",
   "There is one serious trap. `[[0] * 3] * 2` looks like it builds the same grid, but the outer `* 2` repeats a reference to the same inner list twice. Changing one row then appears to change both: after `bad = [[0] * 3] * 2` and `bad[0][0] = 1`, `bad` is `[[1, 0, 0], [1, 0, 0]]`. The comprehension version creates a new inner list on every iteration, so the rows are independent. Using `* 3` on the inner `[0]` is fine, because the repeated items are integers, which are immutable. This is the aliasing rule from the previous lesson appearing inside a grid.",
   "When you trace nested loops over a grid, it pays to be systematic. With `for r in range(len(grid)):` and an inner `for c in range(len(grid[r])):`, the inner loop runs completely for each value of the outer loop. On a 2 by 3 grid, the pairs visited are (0, 0), (0, 1), (0, 2), (1, 0), (1, 1) and (1, 2), six in total. Writing these pairs down before computing anything turns a confusing snippet into simple bookkeeping. The same discipline helps with a running total: start the total at 0 outside both loops, add `grid[r][c]` inside the inner loop, and print it after both loops finish. If the print sits inside the inner loop by mistake, you will see a growing total printed once per element instead of a single final value.",
   "Consider a worked example. A tic-tac-toe program builds its board with `board = [[\" \"] * 3 for _ in range(3)]`. When the first player takes the center, the program sets `board[1][1] = \"X\"`; the second player takes the top-right corner with `board[0][2] = \"O\"`. To check whether the first row is a win, it tests `board[0][0] == board[0][1] == board[0][2] != \" \"`. To check the middle column it builds `[board[r][1] for r in range(3)]`, and for the main diagonal `[board[i][i] for i in range(3)]`. If the programmer had used `[[\" \"] * 3] * 3`, the first move would have put an X in the center of every row, a bug that is easy to spot once you print the board.",
   "Common mistakes: swapping row and column, so reading `grid[2][1]` as column 2, row 1; forgetting that both indexes start at 0; using `[[0] * n] * m` to build a grid; assuming `len(grid)` counts every element rather than the rows; and expecting `grid[0:2][1]` to be a column. It is not: the slice returns the first two rows, then `[1]` picks the second of those rows. Rows do not have to be the same length, and a \"jagged\" list such as `[[1], [2, 3], [4, 5, 6]]` is legal, but code that assumes equal lengths, like `len(grid[0])` as the column count, may then give wrong results or `IndexError`. Nesting can go deeper, as in `cube[z][y][x]`, with one more pair of brackets per level.",
   "Exam questions typically show a small grid and ask for `m[i][j]`, the value of `len(m)` or `len(m[1])`, or the output of nested loops that sum or print elements. Clue patterns: two bracket pairs mean row first, then column; `len(m)` means the number of rows; `[[x] * n] * m` followed by one assignment means the change shows in every row; and a nested comprehension means read the outer loop as rows. Trace nested loops by writing down each (row, column) pair in order before computing anything."
  ],
  "analogy": "A list of lists is like an apartment building. The outer list is the building, each inner list is one floor, and each item is an apartment on that floor. `building[2][4]` means floor 2, apartment 4, with the ground floor counted as 0. Building a grid with `[[0] * 3] * 2` is like putting up a building where every floor is the same physical floor reachable by different elevator buttons: paint one wall and it is painted on \"every\" floor. The analogy fails in one way: real floors cannot have different numbers of apartments the way jagged lists can.",
  "mnemonic": "Row before Column, just as R comes before C in grid[r][c]. Read a grid like a book: pick the line first, then the word on that line.",
  "terms": [
   [
    "Nested list",
    "A list that contains other lists as its items."
   ],
   [
    "Matrix",
    "A rectangular grid of values, represented in Python as a list of equally long row lists."
   ],
   [
    "Row index",
    "The first index in `grid[r][c]`, selecting which inner list to use."
   ],
   [
    "Column index",
    "The second index in `grid[r][c]`, selecting the element inside the chosen row."
   ],
   [
    "Jagged list",
    "A nested list whose inner lists have different lengths."
   ],
   [
    "Nested loop",
    "A loop inside another loop, used to visit every element of a two-dimensional structure."
   ]
  ],
  "example": "A cinema booking script stores a hall of 5 rows with 8 seats each as `seats = [[0] * 8 for _ in range(5)]`, where 0 means free and 1 means booked. Booking row C, seat 4 sets `seats[2][3] = 1`, remembering that both counts start at zero. To show free seats per row it prints `row.count(0)` for each row in the outer loop. An earlier version built the hall with `[[0] * 8] * 5`, and a single booking marked the same seat taken in every row, until the team switched to the comprehension.",
  "mistakes": [
   [
    "Building a grid with `[[0] * 3] * 3`",
    "The outer * 3 repeats a reference to one inner list, so all rows are the same object and one assignment changes every row. Use `[[0] * 3 for _ in range(3)]`."
   ],
   [
    "Reading `grid[2][1]` as column 2, row 1",
    "The first index is always the row and the second is the column, so `grid[2][1]` is row 2, column 1, both counted from 0."
   ],
   [
    "Expecting `grid[0:2][1]` to return a column",
    "The slice returns the first two rows, and [1] then picks the second of those rows. To get a column, use `[row[1] for row in grid]`."
   ],
   [
    "Thinking `len(grid)` counts every element",
    "len(grid) counts the rows only. Use len(grid[0]) for the columns in the first row, or a nested loop to count all elements."
   ]
  ],
  "tryit": [
   [
    "A classroom seating chart has 3 rows and 4 seats per row, stored as `chart = [[\"\"] * 4 for _ in range(3)]`. The teacher wants to seat Mia in the back row, last seat, and then print how many seats are in each row. Which assignment and which expression should she use?",
    "Use `chart[2][3] = \"Mia\"` (or `chart[-1][-1] = \"Mia\"`), because the back row is index 2 and the last seat is index 3. Each row has `len(chart[0])` seats, which is 4. Because the grid was built with a comprehension, only that one seat changes."
   ]
  ],
  "tip": "grid[1][2] is row 1, column 2, both counted from 0. And [[0] * 3] * 3 creates three references to one row, so a single assignment appears in every row.",
  "check": [
   [
    "For `m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`, what are `m[2][0]` and `m[-1][-2]`?",
    "7 and 8: row 2 is `[7, 8, 9]`, whose first item is 7, and the last row's second-last item is 8."
   ],
   [
    "What does `[[r + c for c in range(2)] for r in range(2)]` produce?",
    "`[[0, 1], [1, 2]]`, because the outer loop makes one row per r and the inner loop fills each row with r + c."
   ],
   [
    "After `g = [[0] * 2] * 2` and `g[0][1] = 5`, what is `g`?",
    "`[[0, 5], [0, 5]]`, because both rows are the same list object repeated by the outer * 2."
   ],
   [
    "How do you get the second column of a list-of-lists `m` as a list?",
    "Use `[row[1] for row in m]`, because Python lists have no column selection and you must take index 1 from each row."
   ]
  ]
 },
 {
  "t": "Tuples: building (including one-item tuples), indexing, slicing, immutability and tuples vs lists",
  "hook": "Ava maintains the inventory script for Pinecrest Hardware, and a weekend change has made one report crash with \"TypeError: 'int' object is not subscriptable\". The line she added looks harmless: `sizes = (12)`, followed later by `sizes[0]`. Monday's delivery truck is waiting for that report. She is sure she wrote a tuple, because the parentheses are right there. Yet Python insists `sizes` is a plain number. What turns a value into a tuple in Python, if it is not the parentheses she was relying on?",
  "simple": "A tuple is like a list that is locked once you create it. You can read its items, count them and loop over them, but you cannot add, remove or replace anything. People usually write tuples with parentheses, like `(3, 4)`, but the real ingredient is the comma. That is why `(5)` is just the number 5, while `(5,)` with a trailing comma is a tuple holding one item. Think of a printed receipt versus a whiteboard: the receipt (tuple) cannot be edited, while the whiteboard (list) can be erased and rewritten. Use a tuple for things that should stay fixed, like the latitude and longitude of a place, and a list for things that change, like a shopping cart.",
  "body": [
   "A tuple is an ordered sequence like a list, but immutable: once created, its items cannot be added, removed or replaced. You usually write a tuple with parentheses and commas, `point = (3, 4)`, but it is actually the comma that makes a tuple. `t = 1, 2, 3` (tuple packing) creates a tuple without parentheses. An empty tuple is `()` or `tuple()`, and `tuple(\"ab\")` gives `('a', 'b')`, just as `tuple([1, 2])` gives `(1, 2)`. Tuples exist because many values naturally belong together and should not change: a coordinate, a date, an RGB (red, green, blue) color.",
   "The comma rule creates a famous trap with one-item tuples. `(5)` is just the integer 5 in parentheses, because parentheses alone only group an expression, as in `(2 + 3) * 4`. To make a one-item tuple you need a trailing comma: `(5,)` or `5,`. So `type((5))` is `int`, while `type((5,))` is `tuple`. Likewise, `(\"a\")` is a string, and `len((\"abc\"))` is 3 (the length of the string), whereas `len((\"abc\",))` is 1. A stray trailing comma can also create a tuple by accident: `x = 7,` makes `x` the tuple `(7,)`. Indexing and slicing work exactly as with lists: `t[0]`, `t[-1]`, `t[1:3]` and `t[::-1]`. A slice of a tuple is a new tuple. `len()`, `in`, `not in`, `for` loops, `min()`, `max()` and `sum()` all work, as do concatenation with `+` and repetition with `*`. `sorted(t)` also works but returns a list, not a tuple. Tuples have just two methods: `count()` and `index()`. Tuples can be nested and can hold values of any type, including lists.",
   "```python\nt = (10, 20, 30, 20)\nprint(t[1:], t.count(20), t.index(30))  # (20, 30, 20) 2 2\nt2 = t + (40,)       # new tuple; t is unchanged\nprint(len(t2))       # 5\nprint(type((5)), type((5,)))  # <class 'int'> <class 'tuple'>\nx, y = (3, 4)        # unpacking\nx, y = y, x          # swap\nprint(x, y)          # 4 3\n# t[0] = 99          # TypeError: does not support item assignment\n```",
   "Immutability means that `t[0] = 99` and `del t[0]` raise `TypeError`, and `t.append(5)` or `t.sort()` raise `AttributeError`, because tuples simply have no such methods. You can still delete the whole tuple variable with `del t`, and you can rebind the name to a new tuple, as `t = t + (5,)` does; that creates a new object and leaves the old one untouched. Note the subtlety: a tuple holding a list cannot swap that list for another, but the list itself remains mutable, so `(1, [2])[1].append(3)` works. Tuple unpacking assigns each item to a name: `x, y = (3, 4)` sets `x` to 3 and `y` to 4. The number of names must match the number of items, or you get `ValueError`. Unpacking is what makes `a, b = b, a` swap values, and it is how functions return several values.",
   "When should you choose which? Use a list for a collection that will grow, shrink or change, such as a shopping cart or a queue of tasks. Use a tuple for a fixed group of related values, such as coordinates or the parts of a date, or when you need to use the sequence as a dictionary key, which a list cannot be because it is mutable. Tuples also signal to readers that the data is not meant to change, and they protect it from accidental modification.",
   "It is worth knowing exactly which error each tuple mistake produces, because the exam often asks for it. Assigning to an item, as in `t[0] = 99`, raises `TypeError: 'tuple' object does not support item assignment`. Deleting an item, as in `del t[0]`, raises `TypeError` too. Calling a list method that tuples lack, such as `t.append(5)`, raises `AttributeError: 'tuple' object has no attribute 'append'`. Indexing past the end, as in `t[10]` on a short tuple, raises `IndexError`, exactly as with a list. Finally, unpacking into the wrong number of names raises `ValueError`. Five different mistakes, four different exception types: matching each mistake to its exception is a quick way to earn points.",
   "Consider a worked example. A mapping app stores a city's location as `lima = (-12.05, -77.04)`. The program reads the latitude with `lima[0]` and unpacks both parts with `lat, lon = lima`. It keeps a dictionary of road distances keyed by pairs of cities, such as `dist[(\"Lima\", \"Quito\")] = 1800`. The key works because a tuple of strings is hashable, while `dist[[\"Lima\", \"Quito\"]] = 1800` would raise `TypeError: unhashable type: 'list'`. Later a developer writes `dist[(\"Lima\", \"Cusco\")] = 1,100`, meaning one thousand one hundred, and the value becomes the tuple `(1, 100)` because of the comma, a bug the comma rule explains at once.",
   "Common mistakes: writing `(5)` when a one-item tuple is needed; assuming parentheses make a tuple (`()` is the only case where parentheses alone do); trying to sort or append to a tuple; believing `t + (5,)` changes `t` in place; expecting `sorted(t)` to return a tuple; and confusing the `TypeError` from item assignment with the `AttributeError` from calling a missing method. Also watch for unpacking with the wrong number of names, as in `a, b = (1, 2, 3)`, which raises `ValueError: too many values to unpack`.",
   "Exam questions on tuples often ask \"what is the type of\" or \"what is the length of\" an expression with parentheses. Clue patterns: a single value in parentheses without a comma means not a tuple; a trailing comma means a tuple; an assignment to `t[i]` means `TypeError`; `t.append` means `AttributeError`; `a, b = b, a` means a swap. When a question asks which structure to use for fixed data or a dictionary key, the answer is a tuple; for data that must change, a list."
  ],
  "analogy": "A tuple is like a sealed lunch box with fixed compartments: you can look into any compartment and count them, but you cannot add or remove a compartment. A list is a lunch bag you can keep stuffing or emptying. If you want a different lunch box, you build a new one, which is what `t + (5,)` does. The analogy stops working when a compartment holds a container of its own: a tuple can hold a list, and that inner list can still change, even though the tuple's compartments cannot be swapped.",
  "terms": [
   [
    "Tuple",
    "An ordered, immutable sequence, usually written with parentheses and commas, such as `(3, 4)`."
   ],
   [
    "Immutable",
    "Unable to be changed after creation; any \"change\" produces a new object."
   ],
   [
    "One-item tuple",
    "A tuple with a single element, which requires a trailing comma, as in `(5,)`."
   ],
   [
    "Tuple packing",
    "Creating a tuple by listing values separated by commas, as in `t = 1, 2, 3`."
   ],
   [
    "Unpacking",
    "Assigning the items of a sequence to several names at once, as in `x, y = (3, 4)`."
   ],
   [
    "Hashable",
    "Able to serve as a dictionary key or set member; immutable values like tuples of immutable items qualify."
   ]
  ],
  "example": "A drawing program stores each color as a tuple such as `red = (255, 0, 0)`. Because colors should never change by accident, a tuple fits better than a list, and a bug where one function tried `red[1] = 128` failed loudly with TypeError instead of silently turning every red shape orange. The program also counts how often each color is used with a dictionary keyed by those tuples, which would be impossible with lists.",
  "mistakes": [
   [
    "Writing `(5)` to create a one-item tuple",
    "Parentheses alone only group an expression, so `(5)` is the integer 5. Add a trailing comma: `(5,)` or `5,`."
   ],
   [
    "Believing `t + (4,)` modifies t in place",
    "Tuples are immutable, so + builds a new tuple. The original stays unchanged unless you rebind the name, as in `t = t + (4,)`."
   ],
   [
    "Expecting `t.append(4)` to raise TypeError",
    "Tuples have no append() method, so the error is AttributeError. TypeError is what you get from item assignment such as `t[0] = 4`."
   ],
   [
    "Expecting `sorted(t)` to return a tuple",
    "sorted() always returns a list, whatever iterable it receives. Wrap it in tuple() if you need a tuple."
   ]
  ],
  "tryit": [
   [
    "A delivery app must store each warehouse's location and use it as a key in a dictionary of distances. A junior developer proposes storing each location as a list such as `[40.7, -74.0]` so it can be updated if a warehouse moves. Should locations be lists or tuples here?",
    "Tuples. Dictionary keys must be hashable, and a list raises TypeError when used as a key. If a warehouse moves, the program can replace the whole key with a new tuple rather than editing it in place."
   ],
   [
    "What is the type and length of `x = (\"hello\")`, and of `y = (\"hello\",)`?",
    "x is a string of length 5, because parentheses without a comma just group the string. y is a tuple of length 1, because the trailing comma creates a one-item tuple."
   ]
  ],
  "tip": "The comma, not the parentheses, makes a tuple. (7) is an int, (7,) is a tuple, and 7, is a tuple too. Any attempt to assign to t[i] raises TypeError.",
  "check": [
   [
    "What are `type((4))` and `type((4,))`?",
    "`int` and `tuple`, because only the trailing comma creates a one-item tuple; parentheses alone just group."
   ],
   [
    "What happens when you run `t = (1, 2, 3)` and then `t[0] = 0`?",
    "A TypeError is raised, because tuples are immutable and do not support item assignment."
   ],
   [
    "After `t = (1, 2)` and `t = t + (3,)`, has the original tuple been modified?",
    "No; the + builds a new tuple (1, 2, 3) and the name t is rebound to it, while the old tuple is unchanged."
   ],
   [
    "Why can a tuple be a dictionary key when a list cannot?",
    "Because a tuple of immutable items is hashable, while a list is mutable and therefore unhashable, so using it as a key raises TypeError."
   ]
  ]
 },
 {
  "t": "Dictionaries: building, indexing, adding, changing and removing keys",
  "hook": "Nora handles the help desk queue at Silver Lake Credit Union, and a script that counts failed login attempts per username just crashed in the middle of a busy Monday with \"KeyError: 'jlee'\". The counter worked for weeks, because every user it saw had failed before. Today a new employee mistyped a password for the first time, and the line `fails[user] += 1` gave up. The security team needs those counts to spot suspicious activity. Why does adding one to a count fail only for someone who has never been counted, and what one-line change makes the script safe?",
  "simple": "A dictionary stores pairs: a key and its value. Instead of finding things by position like a list, you find them by name, the way a contacts app finds a phone number when you type a person's name. You write it with curly braces, like `{\"Ana\": 31, \"Ben\": 27}`. To read a value you write `ages[\"Ana\"]`. If the name is not there, Python raises an error called `KeyError`, but `ages.get(\"Zoe\")` quietly gives back `None` instead. Adding and changing use the same line: `ages[\"Cy\"] = 40` adds Cy if new or replaces the value if Cy already exists. To remove a pair, use `del ages[\"Cy\"]` or `ages.pop(\"Cy\")`. Keys must be unchangeable values, like text or numbers, so a list cannot be a key.",
  "body": [
   "A dictionary (type `dict`) stores key-value pairs. Instead of looking items up by numeric position, as with a list, you look them up by a meaningful key, the way you look up a word in a real dictionary to find its definition. You write a dictionary in curly braces with a colon between each key and its value and commas between pairs: `ages = {\"Ana\": 31, \"Ben\": 27}`. An empty dictionary is `{}` or `dict()`. Note that `{}` is an empty dict, not an empty set. You can also build one from pairs, as in `dict([(\"a\", 1), (\"b\", 2)])`, or with keyword arguments, as in `dict(a=1, b=2)`.",
   "Keys must be unique and immutable (technically, hashable): strings, numbers, Booleans and tuples of immutable items all work, but a list cannot be a key and raises `TypeError: unhashable type: 'list'`. Values can be anything, including lists and other dictionaries. If a literal repeats a key, the last value wins: `{\"a\": 1, \"a\": 2}` is `{'a': 2}`. Watch equal keys of different types too: because `1 == 1.0 == True`, the literal `{1: \"x\", True: \"y\"}` has just one key, `1`, holding `\"y\"`. Since Python 3.7, dictionaries keep keys in the order they were inserted, but you still cannot index them by position; `ages[0]` looks for a key 0 and raises `KeyError` if there is none.",
   "To read a value, index with its key: `ages[\"Ana\"]` returns 31. If the key is missing, Python raises `KeyError`. The `get()` method is the safe alternative: `ages.get(\"Zoe\")` returns `None`, and `ages.get(\"Zoe\", 0)` returns the default 0, without raising an error. Adding and changing use the same syntax. Assigning to a key that does not exist adds a new pair; assigning to an existing key replaces its value: `ages[\"Cy\"] = 40` adds, `ages[\"Ana\"] = 32` changes. So assignment never raises `KeyError`. The `update()` method merges another dictionary in, adding new keys and overwriting existing ones.",
   "```python\nd = {\"x\": 1}\nd[\"y\"] = 2              # add\nd[\"x\"] = 10             # change\nd.update({\"z\": 3, \"x\": 11})\nprint(d)                # {'x': 11, 'y': 2, 'z': 3}\nprint(d.get(\"w\", -1))   # -1\ndel d[\"y\"]              # remove\nprint(d.pop(\"z\"))       # 3\nprint(d, len(d))        # {'x': 11} 1\n```",
   "There are several ways to remove entries. `del d[key]` removes a pair and raises `KeyError` if it is missing. `d.pop(key)` removes the pair and returns its value, also raising `KeyError` if missing unless you supply a default, as in `d.pop(key, None)`. `d.popitem()` removes and returns the last inserted pair as a tuple. `d.clear()` empties the dictionary but keeps the object, while `del d` deletes the variable itself, so a later `print(d)` raises `NameError`. `len(d)` counts key-value pairs, not keys plus values. Like lists, dictionaries are mutable and subject to aliasing: after `e = d`, changes through `e` show up in `d`. Use `d.copy()` or `dict(d)` for a separate shallow copy.",
   "A useful habit is to think about every dictionary operation in terms of one question: what happens if the key is missing? Reading with square brackets raises `KeyError`. Reading with `get()` returns `None` or your default. Assigning with square brackets creates the key, so it never fails. Deleting with `del` raises `KeyError`. Popping raises `KeyError` unless you pass a default as the second argument. Checking with `in` simply returns `False`. Once you have this table in your head, most dictionary questions on the exam become a matter of spotting whether the key exists at the moment each line runs. Tracing a snippet line by line, with the current contents of the dictionary written beside each line, removes nearly all the guesswork.",
   "Consider a worked example. A café's menu is `menu = {\"tea\": 2.5, \"coffee\": 3.0}`. The owner adds cake with `menu[\"cake\"] = 4.0` and raises the price of coffee with `menu[\"coffee\"] = 3.2`. A customer asks for \"juice\"; `menu[\"juice\"]` would crash the till program with `KeyError`, so the program uses `menu.get(\"juice\")`, sees `None` and prints \"not available\". When tea is discontinued, `price = menu.pop(\"tea\")` removes it and keeps the old price for the report. Finally, `len(menu)` reports 2 items on the menu: coffee and cake.",
   "Common mistakes: using a list as a key; expecting `d[0]` to return the first pair; confusing `d.get(key)`, which returns `None`, with `d[key]`, which raises `KeyError`; forgetting that a duplicate key in a literal silently keeps only the last value; thinking `d[key] = value` fails for a new key; and mixing up `pop()` on a dictionary, which needs a key, with `pop()` on a list, which takes an optional position. Another trap is expecting `{}` to be a set; it is always an empty dictionary.",
   "Exam questions usually show a dictionary being built and modified, then ask for `len(d)`, a particular value, or which line raises an error. Clue patterns: a missing key in square brackets means `KeyError`; the same missing key with `get()` means `None` (or the default); an assignment to a key that exists means replace, not add; duplicate keys in a literal mean the last one wins; `del` or `pop()` of a missing key without a default means `KeyError`. When the question asks which types can be keys, pick immutable types such as strings, numbers and tuples, never lists or dictionaries."
  ],
  "analogy": "A dictionary is like a coat check at a theater. You hand over a coat and receive a ticket number; later, the ticket (the key) retrieves exactly that coat (the value). Handing over a second coat with a ticket number already in use replaces the first coat. Asking for a ticket that was never issued gets a firm refusal, which is `KeyError`, while a polite attendant who says \"nothing here\" is `get()`. The analogy stops working on order: a coat check has no order, but Python dictionaries do remember insertion order, even though you still cannot look items up by position.",
  "terms": [
   [
    "Dictionary",
    "A mutable collection of key-value pairs, written as `{key: value}`, that is looked up by key rather than by position."
   ],
   [
    "Key",
    "The unique, hashable identifier used to store and retrieve a value in a dictionary."
   ],
   [
    "Value",
    "The data associated with a key; it can be of any type and need not be unique."
   ],
   [
    "KeyError",
    "The exception raised when indexing, deleting or popping a key that is not in the dictionary."
   ],
   [
    "get()",
    "A dictionary method that returns the value for a key, or None or a given default if the key is missing."
   ],
   [
    "pop()",
    "A dictionary method that removes a key and returns its value, raising KeyError if missing and no default is given."
   ],
   [
    "update()",
    "A dictionary method that adds or overwrites pairs from another dictionary."
   ]
  ],
  "example": "A login service keeps failed attempts per username in a dictionary. On each failure it runs `fails[user] = fails.get(user, 0) + 1`, which creates the key the first time and increases it afterwards, with no risk of KeyError. When a user logs in successfully, `fails.pop(user, None)` clears their counter even if they never failed. An administrator reviewing the code notes that `fails[user] += 1` alone would crash for a first-time failure, because reading a missing key raises KeyError.",
  "mistakes": [
   [
    "Expecting `d[0]` to return the first pair of a dictionary",
    "Dictionaries are looked up by key, not position. `d[0]` looks for a key equal to 0 and raises KeyError if there is none."
   ],
   [
    "Thinking `d[\"new\"] = 5` fails because the key does not exist yet",
    "Assigning to a missing key adds it. Only reading, deleting or popping a missing key raises KeyError."
   ],
   [
    "Believing a repeated key in a literal creates two entries",
    "Keys are unique, so `{\"a\": 1, \"a\": 2}` keeps only the last value and becomes `{'a': 2}` with length 1."
   ],
   [
    "Using a list as a dictionary key",
    "Lists are mutable and unhashable, so Python raises TypeError. Use a tuple of immutable items instead."
   ]
  ],
  "tryit": [
   [
    "A school library tracks borrowed books with `loans = {\"Ana\": 2, \"Ben\": 1}`. A new student, Cy, borrows a book, and the librarian's script runs `loans[\"Cy\"] += 1`. It crashes. How should the line be written so it works for both new and existing students?",
    "Use `loans[\"Cy\"] = loans.get(\"Cy\", 0) + 1`. The original line reads the missing key first and raises KeyError. get() with a default of 0 returns 0 for a new student and the current count for an existing one, and the assignment then adds or updates the key."
   ]
  ],
  "tip": "d[key] on a missing key raises KeyError; d.get(key) returns None. Assigning d[key] = value never fails: it adds if new and replaces if present.",
  "check": [
   [
    "What does `{\"a\": 1, \"b\": 2, \"a\": 3}` evaluate to, and what is its length?",
    "`{'a': 3, 'b': 2}` with length 2, because a repeated key keeps only its last value."
   ],
   [
    "Given `d = {\"x\": 1}`, what do `d.get(\"y\")` and `d[\"y\"]` do?",
    "`d.get(\"y\")` returns None, while `d[\"y\"]` raises KeyError because the key is missing."
   ],
   [
    "Why does `d[[1, 2]] = \"a\"` fail?",
    "Lists are mutable and therefore unhashable, so they cannot be dictionary keys; Python raises TypeError."
   ],
   [
    "What is the difference between `d.clear()` and `del d`?",
    "clear() empties the dictionary but the name d still refers to an empty dict; del d removes the name, so using d afterwards raises NameError."
   ]
  ]
 },
 {
  "t": "Iterating dictionaries with keys(), values() and items(); checking whether a key exists",
  "hook": "Marcus runs the nightly stock report for Cedar Street Pharmacy. His script holds a dictionary of medicine names and quantities, and a rule says to flag anything with a count of 0. He writes `if 0 in stock:` and the report says nothing is out of stock, even though he can see three items at zero. Worse, when he tries to tidy the dictionary by deleting zero-count items inside his loop, the script stops with \"RuntimeError: dictionary changed size during iteration.\" The pharmacist needs the reorder list before the morning delivery cutoff. What is `in` really checking, and how should he loop when he wants to remove entries?",
  "simple": "A dictionary holds pairs, like words and their meanings. When you loop over a dictionary, Python hands you the keys (the words) one at a time. If you want the values (the meanings), ask for `d.values()`, and if you want both together, ask for `d.items()`, which gives you each pair. The `in` operator on a dictionary only checks keys. It is like a phone book: you can quickly check whether a name is listed, but asking \"is the number 555-0100 listed?\" means reading every entry, so you must say `in d.values()` for that. One safety rule: do not add or remove keys while you are looping over the same dictionary; loop over `list(d)`, a copy of the keys, instead.",
  "body": [
   "Once data is in a dictionary, you will often need to walk through all of it: print a report, total the values, or find the largest entry. Dictionaries give you three views of their contents. `d.keys()` returns the keys, `d.values()` returns the values, and `d.items()` returns the key-value pairs as two-item tuples. These are view objects, not lists: they reflect later changes to the dictionary, and you can loop over them, test membership in them or convert them with `list()`. Printing one shows something like `dict_keys(['a', 'b'])`, and views cannot be indexed, so `d.keys()[0]` raises `TypeError`; use `list(d.keys())[0]` if you really need a position.",
   "Looping directly over a dictionary gives you its keys, in insertion order, so `for k in d:` and `for k in d.keys():` behave the same. To get the value inside such a loop, index with the key: `d[k]`. The `items()` form is usually the clearest when you need both key and value. Each item is a two-element tuple, which the `for name, p in ...` syntax unpacks into two variables. You can sort as you iterate: `for k in sorted(d):` visits keys in sorted order, and `sorted(d.values())` gives a sorted list of values. Functions like `sum(d.values())`, `max(d)` (the largest key) and `len(d)` also work directly.",
   "```python\nprices = {\"tea\": 2.5, \"cake\": 3.0}\nfor name in prices:\n    print(name, prices[name])     # tea 2.5 / cake 3.0\nfor p in prices.values():\n    print(p)                      # 2.5 / 3.0\nfor name, p in prices.items():\n    print(name, \"costs\", p)       # tea costs 2.5 / ...\nprint(list(prices.items()))       # [('tea', 2.5), ('cake', 3.0)]\nprint(\"tea\" in prices, 2.5 in prices)  # True False\n```",
   "To check whether a key exists, use `in` or `not in` on the dictionary itself: `\"tea\" in prices` is `True`. This tests keys only. `2.5 in prices` is `False` even though 2.5 is a value; to search values, use `2.5 in prices.values()`, and to search for a whole pair, `(\"tea\", 2.5) in prices.items()`. Checking before indexing is a common way to avoid `KeyError`: `if key in d: print(d[key])`. The alternative is `d.get(key)`, which returns `None` or a default if the key is absent. Choose `in` when you need to take a different action for a missing key, and `get()` when a default value is all you need.",
   "A frequent pattern is counting: loop over data and increase a count for each item, creating the key the first time it appears. Another is inverting or filtering a dictionary with a loop over `items()`. Be careful not to add or remove keys while looping over a dictionary; Python raises `RuntimeError: dictionary changed size during iteration`. Changing the values of existing keys is fine. If you need to delete entries, loop over a copy of the keys, such as `for k in list(d):`.",
   "Views are live, and that is worth seeing once. If you store `k = d.keys()` and then add a key to `d`, printing `k` shows the new key too, because the view is a window onto the dictionary rather than a snapshot. That is why converting to a list matters when you want a fixed copy: `list(d)` or `list(d.keys())` captures the keys as they are at that moment, and you can safely delete from `d` while looping over it. The same idea explains why `sorted(d)` is safe to loop over while changing values: `sorted()` builds a brand-new list of keys first. Keep in mind that changing the value of an existing key during a loop is allowed; only adding or removing keys changes the size and triggers the `RuntimeError`.",
   "Consider a worked example. A shop counts which fruits were sold today from the list `sold = \"apple pear apple fig apple\".split()`. It starts with `counts = {}` and, for each word, runs `if word in counts: counts[word] += 1` with an `else` branch that sets `counts[word] = 1`. The result is `{'apple': 3, 'pear': 1, 'fig': 1}`. To print a report the program loops with `for fruit, n in counts.items(): print(fruit, n)`. To find the best seller it uses `max(counts, key=counts.get)`, which returns `'apple'`, though a simple loop that tracks the highest count works just as well. Finally, to drop fruits sold only once, it loops over `list(counts)` and deletes keys whose value is 1, leaving `{'apple': 3}` without a `RuntimeError`.",
   "Common mistakes: expecting `for x in d:` to give values or pairs (it gives keys); writing `for k, v in d:`, which tries to unpack each key and usually raises `ValueError`, instead of `for k, v in d.items():`; using `in` to search for a value; indexing a view object; and deleting keys inside a loop over the dictionary itself. Remember too that the loop order is insertion order, not alphabetical, unless you use `sorted()`.",
   "Exam questions show a short loop over a dictionary and ask what is printed or what `in` returns. Clue patterns: `for x in d` means x is each key; `.values()` means only values; `.items()` with two loop variables means key and value together; `value in d` means False unless that value is also a key; and a loop that deletes or adds keys means `RuntimeError`. When a question asks for \"the safest way to read a key that may be missing\", the answer is `get()` or a prior `in` check."
  ],
  "analogy": "Think of a dictionary as a row of mailboxes in an apartment lobby. The names on the boxes are the keys, and the mail inside is the value. Walking past the boxes and reading the names is `for k in d`. Opening each box to look at the mail is `values()`, and reading the name and opening the box together is `items()`. Asking \"is there a box for Lee?\" is a quick `in` check, but `in` will never search through the mail. The analogy has a limit: real mailboxes have no insertion order, while a Python dictionary remembers the order keys were added.",
  "terms": [
   [
    "keys()",
    "A dictionary method returning a view of all keys in insertion order."
   ],
   [
    "values()",
    "A dictionary method returning a view of all values, which may contain duplicates."
   ],
   [
    "items()",
    "A dictionary method returning a view of (key, value) tuples, ideal for loops that need both."
   ],
   [
    "View object",
    "A live, iterable window onto a dictionary's keys, values or items that reflects later changes and cannot be indexed."
   ],
   [
    "Membership test",
    "Using `in` or `not in` on a dictionary to check whether a key, not a value, is present."
   ],
   [
    "RuntimeError",
    "The exception raised when a dictionary changes size while it is being iterated over."
   ]
  ],
  "example": "An IT (information technology) help desk tracks open tickets per technician as `open = {\"Ana\": 3, \"Ben\": 0, \"Cy\": 5}`. Each morning a script loops with `for tech, n in open.items():` to print a workload line per person. Before assigning a new ticket to \"Dee\", it checks `if \"Dee\" not in open:` and adds her with 0 tickets. Someone once tried to delete idle technicians inside `for tech in open:` and got RuntimeError, so the script now loops over `list(open)` when removing entries.",
  "mistakes": [
   [
    "Expecting `for x in d:` to give values or pairs",
    "Looping over a dictionary yields its keys. Use `d.values()` for values or `d.items()` for (key, value) pairs."
   ],
   [
    "Writing `for k, v in d:` to get keys and values",
    "This tries to unpack each key into two names and usually raises ValueError. Write `for k, v in d.items():`."
   ],
   [
    "Using `value in d` to search the values",
    "in on a dictionary checks keys only. Use `value in d.values()`, or `(key, value) in d.items()` for a whole pair."
   ],
   [
    "Deleting keys inside `for k in d:`",
    "Changing the size of a dictionary during iteration raises RuntimeError. Loop over `list(d)` when you need to delete entries."
   ]
  ],
  "tryit": [
   [
    "A gym's membership script has `visits = {\"ana\": 12, \"ben\": 0, \"cy\": 3, \"dee\": 0}`. The manager wants to remove every member with 0 visits and then print each remaining member with their count. Describe the loops you would write and the final contents.",
    "First loop over a copy of the keys: `for name in list(visits): if visits[name] == 0: del visits[name]`, which avoids RuntimeError. Then print with `for name, n in visits.items(): print(name, n)`. The dictionary ends as {'ana': 12, 'cy': 3}, printed in insertion order."
   ]
  ],
  "tip": "in on a dictionary checks keys, not values. Looping over a dictionary gives keys; use items() to get both parts at once.",
  "check": [
   [
    "Given `d = {\"a\": 1, \"b\": 2}`, what does `for x in d: print(x)` print?",
    "a and then b, because iterating over a dictionary yields its keys in insertion order."
   ],
   [
    "For the same `d`, what are `1 in d` and `1 in d.values()`?",
    "False and True, because in on the dictionary checks keys only, while in on values() checks the values."
   ],
   [
    "What is the right way to loop over both keys and values of `d`?",
    "`for k, v in d.items():`, because items() yields (key, value) tuples that unpack into two names."
   ],
   [
    "What happens if you delete keys from a dictionary inside a loop over that dictionary?",
    "Python raises RuntimeError because the dictionary changed size during iteration; loop over list(d) instead."
   ]
  ]
 },
 {
  "t": "Strings: indexing, slicing (including [::-1]), immutability and comparison",
  "hook": "Grace maintains the catalog for the Brookside Public Library, and patrons keep reporting the same oddities. A search sorted by title places \"Zen Garden\" before \"art of war,\" and \"Volume 10\" appears before \"Volume 9.\" Then a new feature to capitalize the first letter of each author's name fails with \"TypeError: 'str' object does not support item assignment.\" The head librarian wants a fix and an explanation by the end of the day. All three problems trace back to how Python stores and compares text. What rules is Python following that make these results correct by its own logic?",
  "simple": "A string is a piece of text, like a word or a sentence, and Python treats it as a row of characters numbered from 0. You can grab one character with `s[0]` or a piece with a slice like `s[1:4]`, which takes positions 1, 2 and 3 but stops before 4. Writing `s[::-1]` gives you the text backwards. Strings cannot be edited in place; to change one, you build a new string, much like reprinting a name tag instead of erasing ink. When Python compares strings, it goes letter by letter using each character's number code. Capital letters have smaller codes than lowercase letters, so \"Zoo\" comes before \"apple\". Digits inside quotes are compared as characters, so \"10\" comes before \"9\".",
  "body": [
   "A string is an immutable sequence of characters. Because it is a sequence, it supports the same indexing and slicing rules as lists and tuples, so everything you learned there carries over. `s = \"Python\"` has length 6; `s[0]` is `'P'`, `s[5]` and `s[-1]` are both `'n'`, and `s[6]` raises `IndexError: string index out of range`. Python has no separate character type: indexing a string returns another string of length one. You can loop over a string character by character with `for ch in s:`, and `in` tests for a substring, so `\"th\" in s` is `True`.",
   "Slicing uses `s[start:stop:step]`, with start included and stop excluded. `s[0:2]` is `'Py'`, `s[2:]` is `'thon'`, `s[:-2]` is `'Pyth'`, and `s[::2]` takes every second character, `'Pto'`. As with lists, slices never raise errors for out-of-range positions: `s[4:100]` is just `'on'`, and `s[4:2]` is the empty string `''`. `s[::-1]` is the idiomatic way to reverse a string. With start and stop omitted and a step of -1, the slice walks from the last character to the first. It is how you test for a palindrome: `word == word[::-1]`.",
   "```python\ns = \"Python\"\nprint(s[1:4], s[-3:], s[::-1])  # yth hon nohtyP\nprint(len(s), \"th\" in s)         # 6 True\nt = \"J\" + s[1:]                  # build a new string\nprint(t, s)                      # Jython Python\nprint(\"Zebra\" < \"apple\", \"10\" < \"9\")  # True True\nprint(ord(\"A\"), ord(\"a\"), chr(66))    # 65 97 B\n```",
   "Strings are immutable: you cannot change a character in place. `s[0] = \"J\"` raises `TypeError: 'str' object does not support item assignment`, and `del s[0]` fails too. To \"change\" a string you build a new one, for example `s = \"J\" + s[1:]`, which gives `'Jython'` and rebinds the name. String methods such as `upper()` and `replace()` also return new strings and leave the original untouched, so calling `s.upper()` without assigning the result has no lasting effect. Operators `+` (concatenation) and `*` (repetition, as in `\"ab\" * 3`) likewise create new strings.",
   "Strings can be compared with `==`, `!=`, `<`, `>`, `<=` and `>=`. Equality requires identical characters, including case: `\"abc\" == \"ABC\"` is `False`. Ordering is lexicographic, character by character, using each character's numeric code (its Unicode code point, which you can see with `ord()`; `chr()` goes the other way). All uppercase letters have lower codes than all lowercase letters, so `\"Zebra\" < \"apple\"` is `True`. The first differing character decides; if one string is a prefix of the other, the shorter one is smaller: `\"cat\" < \"cats\"`. Digits in strings are compared as characters, not numbers, so `\"10\" < \"9\"` is `True` because `'1'` comes before `'9'`. Convert with `int()` for numeric comparison. Comparing a string with a number using `<` raises `TypeError`, while `==` just returns `False`, so `\"5\" == 5` is `False`.",
   "A good way to master slicing is to picture the positions as lying between characters rather than on them. For `s = \"Python\"`, imagine a marker before `P` labeled 0, one between `P` and `y` labeled 1, and so on up to 6 after `n`. The slice `s[1:4]` then takes everything between markers 1 and 4, which is `'yth'`, and its length is simply 4 minus 1. Negative markers count from the right: -1 sits just before the last character, so `s[-3:]` takes the last three characters, `'hon'`. With a negative step, the slice starts from the right and walks left, which is why `s[::-1]` reverses the whole string and `s[4:1:-1]` gives `'oht'`. Practicing a few of these on paper is the quickest way to make slice questions automatic.",
   "Consider a worked example. A registration form checks whether a chosen username reads the same backwards. For `name = \"Anna\"`, `name == name[::-1]` is `False`, because the reversed string is `\"annA\"` and case matters. Lowercasing first, `name.lower() == name.lower()[::-1]`, gives `True`. The form also wants the first letter capitalized, and a developer tries `name[0] = name[0].upper()`, which raises `TypeError`. The fix is `name = name[0].upper() + name[1:]`. Finally, sorting sign-up codes stored as text, `sorted([\"100\", \"20\", \"3\"])` returns `['100', '20', '3']`, which surprised the team until they sorted with numbers instead.",
   "Common mistakes: trying to assign to `s[i]`; expecting `s.upper()` on its own to change `s`; assuming lowercase letters sort before uppercase; comparing numeric strings and expecting numeric order; forgetting that the last valid index is `len(s) - 1`; and expecting `\"a\" < 1` to return `False` when it raises `TypeError`. A slice such as `s[3:1]` quietly gives the empty string, not an error, and `s[::-1]` gives a new reversed string rather than reversing `s` in place.",
   "Exam questions ask you to evaluate an index or slice, predict a comparison, or spot the line that raises an error. Clue patterns: `[::-1]` means reversed; `[-n:]` means the last n characters; `s[i] = ...` means `TypeError`; an index equal to `len(s)` means `IndexError`; a capital versus lowercase comparison means capitals are smaller; and digits in quotes mean text comparison. When two strings differ in length, find the first position where they differ before deciding which is smaller."
  ],
  "analogy": "A string is like a word spelled out in letter tiles glued onto a board. You can point to any tile by its position, copy a run of tiles onto a new board (a slice), or copy them in reverse order (`[::-1]`). You cannot pry a tile off and swap it, because the glue is permanent; you must build a new board. Comparison works like a dictionary where every uppercase tile is filed before every lowercase tile. The analogy is imperfect in one way: real dictionaries ignore case, while Python's string comparison does not.",
  "mnemonic": "Start, Stop, Step: you start walking, you stop before the finish line, and you choose your stride. That is the order inside s[start:stop:step], and the stop position is never included.",
  "terms": [
   [
    "String",
    "An immutable sequence of Unicode characters, written in quotes, such as `\"Python\"`."
   ],
   [
    "Immutability",
    "The property that a string's characters cannot be changed in place; changes create a new string."
   ],
   [
    "Reverse slice",
    "The slice `s[::-1]`, which returns a new string with the characters in reverse order."
   ],
   [
    "Lexicographic order",
    "Dictionary-style comparison, character by character, where the first difference decides the result."
   ],
   [
    "Code point",
    "The number Unicode assigns to a character, returned by `ord()` and turned back into a character by `chr()`."
   ],
   [
    "Concatenation",
    "Joining strings with `+` to create a new string."
   ]
  ],
  "example": "A library system sorts book titles for its catalog. Staff notice that \"Zen Garden\" appears before \"art of war\" and that \"Volume 10\" comes before \"Volume 9\". Both results follow from string comparison rules: uppercase letters have lower code points than lowercase ones, and digits inside strings compare character by character. The developer fixes the first by comparing lowercased titles and the second by storing volume numbers as integers, while the original titles stay unchanged because strings are immutable.",
  "mistakes": [
   [
    "Trying `s[0] = \"J\"` to change a character",
    "Strings are immutable, so item assignment raises TypeError. Build a new string instead: `s = \"J\" + s[1:]`."
   ],
   [
    "Assuming lowercase letters sort before uppercase",
    "Uppercase letters have lower code points (for example `ord(\"Z\")` is 90 and `ord(\"a\")` is 97), so \"Zebra\" < \"apple\" is True."
   ],
   [
    "Expecting `\"10\" < \"9\"` to be False",
    "Strings compare character by character, and '1' comes before '9', so the result is True. Convert with int() for numeric comparison."
   ],
   [
    "Expecting `s[10]` and `s[2:10]` on a short string to behave the same",
    "Indexing past the end raises IndexError, but slicing never does: an out-of-range slice simply stops at the end of the string."
   ]
  ],
  "tryit": [
   [
    "A sign-up form must reject usernames that read the same forward and backward, ignoring case. A user enters \"Level\". Your teammate writes `if name == name[::-1]:` and the check lets it through. Why, and what is the fix?",
    "Reversing \"Level\" gives \"leveL\", which differs because case matters in comparison. Compare lowercased versions instead: `name.lower() == name.lower()[::-1]`, which is True for \"Level\", so the form rejects it."
   ]
  ],
  "tip": "Uppercase sorts before lowercase, and digit strings compare as text, so \"100\" < \"20\" is True. Any attempt to assign to s[i] is a TypeError.",
  "check": [
   [
    "For `s = \"banana\"`, what are `s[1:4]`, `s[-2:]` and `s[::-1]`?",
    "`'ana'`, `'na'` and `'ananab'`: the first stops before index 4, the second takes the last two characters, and the third reverses."
   ],
   [
    "What happens when you run `s = \"cat\"` and then `s[0] = \"b\"`?",
    "TypeError, because strings are immutable; write `s = \"b\" + s[1:]` to build a new string instead."
   ],
   [
    "Is `\"apple\" < \"Banana\"` True or False?",
    "False, because 'a' (code 97) is greater than 'B' (code 66), and the first characters decide."
   ],
   [
    "What does `\"9\" > \"10\"` return, and why?",
    "True, because strings compare character by character and '9' is greater than '1'."
   ]
  ]
 },
 {
  "t": "Escaping with \\, quotes and apostrophes inside strings, multi-line strings",
  "hook": "Omar is on the IT team at Westbrook Clinic, and the nightly backup script just produced a report that makes no sense. The line meant to read `Saved to C:\\backups\\new` instead prints `Saved to C:\\backups` and then, on a new line, `ew`. A coworker's quick fix to add a quoted file name made things worse: the script now refuses to run at all, with a SyntaxError pointing at a double quote. The compliance officer reads these reports every morning. Nothing about the backup itself is broken. So why is Python printing something different from what Omar typed?",
  "simple": "When you write text in Python code, you wrap it in quotes so Python knows where it starts and stops. If the text itself contains a quote, you can wrap it in the other kind: use double quotes around text with an apostrophe, like \"It's ready\". The backslash `\\` is a special signal that means \"the next character has a special meaning.\" So `\\n` means start a new line, `\\t` means a tab, and `\\\\` means one real backslash. Each of these pairs counts as just one character. This is why a Windows folder path like C:\\new can break: Python reads `\\n` as a new line. For text that spans several lines, wrap it in three quote marks in a row (three single or three double quotes), and the line breaks become part of the text.",
  "body": [
   "A string literal is text in your source code delimited by quotes, so putting quote characters inside it needs care: Python has to know which quote ends the string. Python gives you two easy ways out. First, choose the other kind of quote for the delimiters: `\"It's fine\"` contains an apostrophe inside double quotes, and `'She said \"hi\"'` contains double quotes inside single quotes. Single and double quotes are otherwise identical in Python; neither is \"more correct\". Second, escape the quote with a backslash: `'It\\'s fine'` and `\"She said \\\"hi\\\"\"` are both valid and produce the same text.",
   "The backslash `\\` is the escape character. Combined with the next character, it forms an escape sequence that stands for a single character. The ones you need are `\\n` (newline), `\\t` (tab), `\\\\` (a literal backslash), `\\'` (single quote) and `\\\"` (double quote). Each counts as one character, so `len(\"a\\nb\")` is 3 and `len(\"\\\\\")` is 1. When printed, `\\n` moves to a new line and `\\t` inserts a tab. In the REPL (the interactive prompt), typing a string without `print` echoes its representation, which shows escape sequences such as `'a\\nb'` instead of a real line break. A backslash followed by a character that is not a recognized escape, such as `\\d`, is kept as two characters, but recent Python versions warn about it, so do not rely on that.",
   "```python\nprint('It\\'s here')          # It's here\nprint(\"Col1\\tCol2\\nA\\tB\")     # two lines, tab separated\nprint(\"C:\\\\temp\")             # C:\\temp\nprint(len(\"\\\\\"), len(\"a\\nb\"))   # 1 3\nprint(r\"C:\\new\")              # C:\\new  (raw string)\nprint(\"C:\\new\")               # C:  then a line break, then ew\n```",
   "A backslash cannot be the last character of an ordinary string literal, because it would escape the closing quote: `\"folder\\\"` is a `SyntaxError` (the string is never closed). Write `\"folder\\\\\"` instead. Be careful with Windows paths: in `\"C:\\new\"`, the `\\n` becomes a newline. Doubling the backslashes avoids that, and so does a raw string, written with an `r` prefix (`r\"C:\\new\"`), in which backslashes are kept literally. Even a raw string cannot end with a single backslash, for the same reason.",
   "Multi-line strings use triple quotes, either `'''...'''` or `\"\"\"...\"\"\"`. Everything between them, including line breaks and any single or double quotes, becomes part of the string, so `\"\"\"He said \"it's done\" \"\"\"` needs no escaping at all. The newlines are real characters: a triple-quoted string whose text spans three lines contains two `\\n` characters, or more if you break the line right after the opening quotes. Escape sequences still work inside triple quotes. Triple-quoted strings are also used as docstrings to document functions. An ordinary single- or double-quoted string cannot contain a raw line break; pressing Enter inside one gives a `SyntaxError`. To put a line break inside such a string, use `\\n`. For example, a variable `msg` assigned a triple-quoted text whose lines are `Dear user,`, `It's \"done\".` and `Bye` prints as three lines, and `msg.count(\"\\n\")` returns 2, because only the two line breaks inside the quotes become characters.",
   "It helps to separate two moments: when Python reads your source code and when your program runs. Escape sequences are processed when Python reads the literal, so by the time the program runs, `\"a\\nb\"` already holds three characters: a, a newline and b. Nothing at run time interprets the backslash again. This is also why `print()` and the REPL echo look different. `print()` shows the characters themselves, so you see a real line break. The REPL echo shows a representation designed to be typed back in, so it displays `'a\\nb'`. Both describe the same three-character string. Keeping these two moments apart explains length questions as well: `len()` counts the characters that ended up in the string, not the keystrokes you typed in the source.",
   "Consider a worked example. A script writes a log line `Saved \"report.txt\" to C:\\data\\new` and the developer first types `print(\"Saved \"report.txt\" to C:\\data\\new\")`. That is a `SyntaxError`, because the second double quote closes the string early. Switching to single quotes fixes the quotes, but the output now breaks after `C:\\data` because `\\n` became a newline. The working versions are `print('Saved \"report.txt\" to C:\\\\data\\\\new')` or `print(r'Saved \"report.txt\" to C:\\data\\new')`.",
   "Common mistakes: counting `\\n` as two characters; ending a string with one backslash; forgetting that `\\n` and `\\t` are processed inside normal strings, which breaks Windows paths; mixing delimiters such as `'text\"`; and thinking triple quotes are only for comments. They create real string objects, which simply go unused when not assigned. One more trap is the REPL echo: seeing `'a\\nb'` in the interactive prompt does not mean the string contains a backslash and an n; it is just how the newline is displayed, and `print()` shows the real line break.",
   "Exam questions ask for the length of a string with escapes, what `print()` outputs, or which literal is valid. Clue patterns: a backslash pair such as `\\n` or `\\\\` counts as one character; a string ending in a lone backslash means `SyntaxError`; an apostrophe inside single quotes without a backslash means `SyntaxError`; an `r` prefix means backslashes stay as typed; and a triple-quoted literal spanning lines means the line breaks are part of the string. Count newlines in a triple-quoted string by counting the line breaks between the opening and closing quotes."
  ],
  "analogy": "The backslash is like the Shift key on a keyboard: on its own it prints nothing, but it changes what the next key means. `\\n` is \"shift plus n,\" giving a line break instead of the letter n, and `\\\\` is \"shift plus backslash,\" giving one plain backslash. Triple quotes are like a large envelope that can hold anything, line breaks and quotation marks included, without special handling. The analogy stops where raw strings begin: an `r` prefix switches the special meaning off, so backslashes stay as typed, though even a raw string cannot end with a single backslash.",
  "terms": [
   [
    "Escape character",
    "The backslash `\\`, which gives the following character a special meaning inside a string literal."
   ],
   [
    "Escape sequence",
    "A backslash and a character, such as `\\n` or `\\'`, that together stand for one character."
   ],
   [
    "Newline",
    "The line-break character written `\\n`, which moves output to the next line."
   ],
   [
    "Raw string",
    "A literal prefixed with `r`, in which backslashes are kept as ordinary characters."
   ],
   [
    "Triple-quoted string",
    "A literal delimited by `'''` or `\"\"\"` that can span several lines and contain both kinds of quotes."
   ],
   [
    "Docstring",
    "A string literal placed first in a function, class or module body to document it."
   ]
  ],
  "example": "An administrator writes a script that prints a Windows folder path for a backup report. The output mysteriously splits across two lines and loses a letter because the path contains `\\new` and `\\n` is read as a newline. Rewriting the path as `r\"D:\\backups\\new\"` or with doubled backslashes fixes the report. The same script prints a multi-line message with triple quotes, so the text can contain both \"quoted\" names and apostrophes without any escaping.",
  "mistakes": [
   [
    "Counting `\\n` as two characters",
    "An escape sequence stands for one character, so `len(\"a\\nb\")` is 3 and `len(\"\\\\\")` is 1."
   ],
   [
    "Ending a string with a single backslash, as in `\"folder\\\"`",
    "The final backslash escapes the closing quote, so the string never closes and Python raises SyntaxError. Double it, as in `\"folder\\\\\"`."
   ],
   [
    "Putting an apostrophe inside single quotes without escaping it, as in `'It's'`",
    "The apostrophe ends the string early, causing a SyntaxError. Use double quotes, `\"It's\"`, or escape it, `'It\\'s'`."
   ],
   [
    "Thinking triple quotes are only comments",
    "A triple-quoted literal creates a real string object. When it is not assigned or used, it is simply discarded, which is why it can serve as a docstring or an unused note."
   ]
  ],
  "tryit": [
   [
    "A script must print the path D:\\reports\\tax and, on the next line, the message File \"q3.txt\" is ready. A teammate writes `print(\"D:\\reports\\tax\\nFile \"q3.txt\" is ready\")`. What goes wrong, and what is a working version?",
    "Two things go wrong. The inner double quotes around q3.txt close the string early, so Python raises SyntaxError before anything runs. Even with the quotes fixed, `\\r` and `\\t` in the path are escape sequences (a carriage return and a tab), so the path would be mangled. The `\\n` before File is intended and fine. A working version is `print(\"D:\\\\reports\\\\tax\\nFile \\\"q3.txt\\\" is ready\")`, or two calls: `print(r\"D:\\reports\\tax\")` and `print('File \"q3.txt\" is ready')`."
   ]
  ],
  "tip": "Each escape sequence is one character when counting length. A string that ends in a single backslash is a syntax error because the backslash escapes the closing quote.",
  "check": [
   [
    "What is `len(\"a\\tb\\\\\")`?",
    "4: the characters are a, a tab, b and one backslash, since `\\t` and `\\\\` each count as one character."
   ],
   [
    "Why is `'It's'` invalid, and how can you fix it?",
    "The apostrophe ends the string early, causing a SyntaxError; use `\"It's\"` or `'It\\'s'`."
   ],
   [
    "What does `print(\"C:\\\\new\")` output compared with `print(\"C:\\new\")`?",
    "The first prints C:\\new; the second prints C: followed by a line break and ew, because `\\n` is a newline."
   ],
   [
    "How many newline characters does a triple-quoted string contain if its text runs over four lines, starting right after the opening quotes?",
    "Three, one for each line break between the four lines."
   ]
  ]
 },
 {
  "t": "Common string methods: split(), join(), upper(), lower(), strip(), find(), count(), replace()",
  "hook": "Hannah handles the newsletter sign-ups for the Oak Valley Garden Club. Members type their names and emails into a web form, and the export arrives as messy lines like \"  Ana MARTINEZ ; ana@Example.com \" with stray spaces and odd capitals. Her cleanup script runs without errors, yet the printed list looks exactly as messy as the input. She checks the code and sees lines such as `name.strip()` and `email.lower()`, each on its own. The club president wants clean mailing labels by tomorrow. If the methods ran, where did their results go?",
  "simple": "String methods are built-in tools for tidying and reshaping text. `upper()` and `lower()` change the letter case. `strip()` trims spaces and line breaks from the two ends, not the middle. `split()` cuts a sentence into a list of pieces, and `join()` glues a list of pieces back into one string, using whatever separator string you call it on. `find()` tells you where some text starts, or gives -1 if it is not there. `count()` tells you how many times it appears, and `replace()` swaps one piece of text for another. The key idea: text in Python cannot be changed in place, so every one of these methods hands you a new string, and you must save it, like `name = name.strip()`, or the result is lost.",
  "body": [
   "Strings have many built-in methods, called with dot notation such as `text.upper()`. They are the everyday tools for cleaning user input, parsing lines of data and building output. Because strings are immutable, none of these methods change the original string. Each returns a new value, and you must assign or use that result. Writing `name.strip()` on its own line and expecting `name` to change is a classic bug; the correct form is `name = name.strip()`.",
   "`upper()` returns a copy with all letters in uppercase and `lower()` with all in lowercase; other characters are untouched. They are handy for case-insensitive comparisons: `answer.lower() == \"yes\"`. `strip()` removes whitespace (spaces, tabs, newlines) from both ends, but not from the middle: `\"  hi there \".strip()` is `'hi there'`. Given an argument, it strips any of those characters from the ends instead: `\"xxhixx\".strip(\"x\")` is `'hi'`, and `\"--a-b--\".strip(\"-\")` is `'a-b'`. There are also `lstrip()` and `rstrip()` for one side only. `strip()` is essential when reading lines from `input()` or a file, where a trailing newline or stray spaces are common.",
   "`split()` breaks a string into a list of substrings. With no argument, it splits on any run of whitespace and ignores leading and trailing whitespace, so `\" a  b c \".split()` is `['a', 'b', 'c']`. With a separator argument it splits exactly at that separator, and empty strings can appear: `\"a,,b\".split(\",\")` is `['a', '', 'b']`. `join()` does the reverse. It is called on the separator string and takes an iterable of strings: `\"-\".join([\"2026\", \"09\", \"25\"])` is `'2026-09-25'`, and `\"\".join([\"a\", \"b\"])` is `'ab'`. Every item must be a string, so joining a list of numbers raises `TypeError` until you convert them, for example with `\",\".join(str(n) for n in nums)`.",
   "```python\nline = \"  red, green ,blue \"\nparts = [p.strip() for p in line.split(\",\")]\nprint(parts)                     # ['red', 'green', 'blue']\nprint(\" | \".join(parts).upper()) # RED | GREEN | BLUE\nprint(\"banana\".find(\"an\"), \"banana\".find(\"x\"))  # 1 -1\nprint(\"banana\".count(\"a\"), \"aaaa\".count(\"aa\"))  # 3 2\nprint(\"a-b-c\".replace(\"-\", \"+\", 1))             # a+b-c\n```",
   "`find(sub)` returns the lowest index where `sub` starts, or -1 if it is not found. It never raises an error, which distinguishes it from `index(sub)`, which raises `ValueError` when the substring is missing. Be careful: -1 is a valid-looking index (it means the last character), so check `if s.find(x) != -1:` or simply use `x in s`. `find()` accepts an optional start position: `\"banana\".find(\"a\", 2)` is 3. `count(sub)` returns how many non-overlapping times `sub` occurs: `\"banana\".count(\"a\")` is 3 and `\"aaaa\".count(\"aa\")` is 2, not 3. `replace(old, new)` returns a copy with every occurrence of `old` replaced by `new`; an optional third argument limits the number of replacements. If `old` does not occur, the string comes back unchanged. Methods can be chained because each returns a string: `raw.strip().lower().replace(\" \", \"_\")` applies them left to right.",
   "Chaining is where these methods really pay off, and it follows directly from the fact that each one returns a string. In `raw.strip().lower().replace(\" \", \"_\")`, Python first runs `strip()` on `raw`, then calls `lower()` on that result, then `replace()` on the next result. Reading left to right tells you the order. The chain breaks only when a method returns something other than a string: `split()` returns a list, so you cannot call `upper()` on its result, and `find()` and `count()` return integers. A practical habit when cleaning input is to strip first, because stray spaces and newlines would otherwise survive into every later step and make comparisons such as `answer.lower() == \"yes\"` fail for an input of `\"yes\\n\"`.",
   "Consider a worked example. A contact form receives `raw = \"  Ana MARTINEZ ; ana@Example.com \\n\"`. The program cleans it with `name, email = [p.strip() for p in raw.split(\";\")]`, giving `'Ana MARTINEZ'` and `'ana@Example.com'`. It normalizes the email with `email = email.lower()`. To check that the address has an at sign, it tests `email.find(\"@\") != -1` (or `\"@\" in email`), and to reject addresses with more than one it checks `email.count(\"@\") == 1`. A tidy display name comes from `\" \".join(w.capitalize() for w in name.split())`, which gives `'Ana Martinez'`. Each step returns a new string, so the program assigns every result.",
   "Common mistakes: calling a method without keeping the result; writing `list.join(sep)` instead of `sep.join(list)`; joining non-strings; assuming `split(\",\")` removes spaces around items (it does not, so `\"a, b\".split(\",\")` is `['a', ' b']`); treating a -1 from `find()` as \"not found\" in some places and as an index in others; expecting `strip()` to remove characters from the middle; and expecting `count()` to count overlapping matches.",
   "Exam questions test these methods through short \"what is printed\" snippets and questions about return values. Clue patterns: `split()` with no argument means whitespace runs are collapsed and no empty strings appear; `split(\",\")` on doubled commas means empty strings in the list; `join` means look at the string before the dot for the separator; `find` on a missing substring means -1, while `index` means `ValueError`; and a method call whose result is not assigned means the original string is printed unchanged."
  ],
  "analogy": "String methods are like the tools at a photo-printing counter that always hand you a new print. Asking for a black-and-white version (`lower()`) or a cropped version (`strip()`) never changes your original photo; you walk away with a second print, and if you leave it on the counter, it is gone. `split()` is cutting a strip of photos into separate frames, and `join()` is taping frames back together with a chosen spacer. The analogy is loose on cost: in Python, making these new strings is quick and routine.",
  "terms": [
   [
    "split()",
    "Returns a list of substrings, splitting on whitespace by default or on a given separator."
   ],
   [
    "join()",
    "Called on a separator string, returns one string made by joining an iterable of strings."
   ],
   [
    "strip()",
    "Returns a copy with whitespace, or the given characters, removed from both ends."
   ],
   [
    "find()",
    "Returns the index of the first occurrence of a substring, or -1 if it is absent."
   ],
   [
    "count()",
    "Returns the number of non-overlapping occurrences of a substring."
   ],
   [
    "replace()",
    "Returns a copy with occurrences of one substring replaced by another, optionally limited in number."
   ]
  ],
  "example": "A data analyst imports a CSV (comma-separated values) line such as `\" 42, Lima ,PE\\n\"`. She uses `strip()` to remove the newline, `split(\",\")` to break it into fields, and `strip()` again on each field to remove stray spaces. To produce a pipe-separated line for another system she writes `\"|\".join(fields)`, remembering that join is called on the separator. When a numeric ID appears in the list, she converts it with str() first, avoiding the TypeError that join raises for non-strings.",
  "mistakes": [
   [
    "Calling `name.strip()` without assigning the result",
    "Strings are immutable, so strip() returns a new string and name stays the same. Write `name = name.strip()`."
   ],
   [
    "Writing `words.join(\" \")` to join a list",
    "join() is a string method called on the separator: `\" \".join(words)`. A list has no join() method, so the first form raises AttributeError."
   ],
   [
    "Expecting `\"a, b\".split(\",\")` to remove the spaces",
    "split() cuts exactly at the separator and keeps everything else, giving ['a', ' b']. Strip each piece afterwards."
   ],
   [
    "Treating `find()` and `index()` as identical",
    "Both return the position of the first match, but on a missing substring find() returns -1 while index() raises ValueError."
   ]
  ],
  "tryit": [
   [
    "A survey export has the line `\" yes,No , YES ,no\\n\"`. You need a count of how many answers are yes, ignoring case and spaces. Which methods would you use, in what order, and what is the count?",
    "Strip the line, split it on commas, then strip and lowercase each piece: `[a.strip().lower() for a in line.strip().split(\",\")]` gives ['yes', 'no', 'yes', 'no']. Then `.count(\"yes\")` on that list gives 2."
   ],
   [
    "A teammate wants to check whether an email contains an at sign with `if email.find(\"@\"):`. Why is this unreliable?",
    "find() returns -1 when the sign is missing, and -1 is truthy, so the test passes for addresses with no at sign. It also returns 0 if the at sign is first, which is falsy. Use `\"@\" in email` or `email.find(\"@\") != -1`."
   ]
  ],
  "tip": "String methods return new strings; the original never changes. find() returns -1 instead of failing, and join() is called on the separator, not on the list.",
  "check": [
   [
    "What does `\" a  b \".split()` return, and how does that differ from `\" a  b \".split(\" \")`?",
    "`['a', 'b']`; splitting on a single space instead keeps empty strings: `['', 'a', '', 'b', '']`."
   ],
   [
    "After `s = \"hello\"` and `s.upper()`, what does `print(s)` show?",
    "hello, because upper() returns a new string and the result was never assigned back to s."
   ],
   [
    "What do `\"python\".find(\"z\")` and `\"python\".index(\"z\")` do?",
    "find() returns -1, while index() raises ValueError because the substring is missing."
   ],
   [
    "What does `\"-\".join([\"a\", \"b\", \"c\"])` return, and what happens with `\"-\".join([1, 2])`?",
    "It returns 'a-b-c'; joining integers raises TypeError because every item must be a string."
   ]
  ]
 },
 {
  "t": "Decomposition: splitting a program into functions",
  "hook": "Ethan inherited the order-processing script at Bayside Bakery Supply, all 300 lines of it in one long block. When the sales tax rate changes, he updates the calculation where he finds it, runs a test order, and everything looks fine. A week later, the accountant reports that some invoices still use the old rate. The tax formula had been copied into three different places, and Ethan found only two. Nobody made a typo, and the code runs without errors. What structural change would have made this mistake nearly impossible?",
  "simple": "Decomposition means breaking a big job into smaller jobs, and giving each small job its own function. A function is a named set of instructions you can use again and again just by calling its name. Think of cooking a big dinner: instead of one giant recipe, you have separate recipes for the soup, the main dish and the dessert, and a short plan saying which to make in what order. If the soup recipe needs fixing, you fix it in one place. In programming this means less repeated code, programs that are easier to read and test, and teammates who can each work on different functions. Functions that hand back a result with `return` are more useful than ones that only print, because the result can be used again.",
  "body": [
   "As programs grow, putting all the code in one long sequence becomes hard to read, test and change. Decomposition is the practice of breaking a problem into smaller, well-defined sub-problems and giving each one its own function. Instead of one 200-line script, you might have `read_scores()`, `average()`, `grade_for()` and `print_report()`, and a short main section that calls them in order. Reading the main section then tells you the whole story of the program in a few lines, and each detail lives in one clearly named place.",
   "A function is a named block of code that performs one task. You define it once with `def`, and you can call (invoke) it as many times as you need. Functions take input through parameters and hand back output with `return`. Python already gives you many built-in functions, such as `print()`, `len()` and `input()`; decomposition means writing your own in the same spirit. A function that computes and returns a value is generally more useful than one that only prints, because the caller can print the value, store it, compare it or pass it on to another function.",
   "There are several reasons to decompose, and the exam asks about them directly. Reuse: code needed in several places is written once, so a fix is made once. Readability: a well-named call like `is_valid_email(address)` tells the reader what happens without their reading the details. Testing: a small function with clear inputs and outputs can be checked on its own in the REPL (the interactive prompt). Teamwork: different people can write and maintain different functions. Abstraction: a caller only needs to know what a function does, not how it does it, so the inside can be improved later without changing the callers.",
   "```python\ndef get_numbers(text):\n    return [int(x) for x in text.split()]\n\ndef average(values):\n    return sum(values) / len(values)\n\ndef report(values):\n    print(\"Count:\", len(values))\n    print(\"Average:\", average(values))\n\nnums = get_numbers(input(\"Numbers: \"))\nreport(nums)\n```",
   "Good functions tend to do one thing, have a descriptive verb-based name in snake_case (lowercase words joined by underscores, as PEP 8, the Python style guide, recommends), and communicate through parameters and return values rather than by reading or changing global variables. A sign that decomposition is needed is duplicated code, or a comment such as \"now calculate the tax\" in the middle of a long block; that comment usually names the function you should extract. Decomposition is often done top down: write the main steps first as calls to functions that do not exist yet, give each a `pass` or simple placeholder body, then implement and test them one at a time. Functions can call other functions, so a large task becomes a tree of smaller ones. At a larger scale, Python organizes code into modules (files) and packages, which you bring in with `import`, and the same principle applies at every level.",
   "Deciding where to draw the lines between functions is a skill that grows with practice, but a few questions help. Can you describe what the function does in one short sentence without using the word \"and\"? If not, it probably does two jobs. Does it need information it is not given as a parameter? If so, it may be quietly depending on a global variable. Does it print a result the caller might want to use? Then it should probably return that result and let the caller print it. Finally, could you test it by calling it with a couple of sample values in the interactive prompt? A function that passes these checks is usually the right size. None of these questions is about speed: decomposition is about clarity and maintenance, not performance.",
   "Consider a worked example. A student writes a grade calculator as one long script: it reads five marks, adds them, divides, then uses a chain of `if` statements to turn the average into a letter, and the same chain is copied again for a second class. Decomposed, it becomes `read_marks()`, which returns a list; `average(marks)`, which returns a number; `letter(avg)`, which returns `\"A\"` to `\"F\"`; and a main section of four lines. When the grading boundaries change, only `letter()` is edited, and both classes pick up the change. The student can test `letter(89.5)` in the REPL without typing five marks each time.",
   "Common mistakes: making functions that do many unrelated things, which defeats the purpose; relying on global variables instead of parameters, which hides the function's inputs; printing inside a helper when the caller needs the value, so the result cannot be reused; giving vague names such as `do_stuff()`; and splitting code so finely that every line becomes its own function, which hurts readability instead of helping it. Another slip is forgetting that defining a function does nothing until it is called, so a decomposed program must still call its functions in the right order.",
   "Exam questions on decomposition are usually conceptual: \"What is a benefit of dividing a program into functions?\" or \"Which is the best reason to write a function?\" Clue words map to answers: \"the same code in several places\" points to reuse; \"easier to find and fix errors\" points to testing and maintainability; \"several programmers\" points to teamwork; \"the caller does not need to know how\" points to abstraction. Answer choices claiming that functions make a program run faster, or that they are required by the interpreter, are the distractors."
  ],
  "analogy": "Decomposition is like how a restaurant kitchen is organized into stations: one cook makes sauces, another grills, another plates desserts, and the head chef calls out orders. Each station does one job well, a new sauce recipe changes only the sauce station, and a new cook can learn one station at a time. The head chef does not need to know how each sauce is made, only what to ask for, which is abstraction. The analogy stops working on speed: extra stations can make a kitchen faster, but extra functions do not make a Python program faster.",
  "terms": [
   [
    "Decomposition",
    "Breaking a problem into smaller sub-problems, each solved by its own function."
   ],
   [
    "Function",
    "A named, reusable block of code that performs one task and can take arguments and return a value."
   ],
   [
    "Abstraction",
    "Using something through its name and interface without needing to know how it works inside."
   ],
   [
    "Reuse",
    "Writing code once and calling it from many places, so fixes and improvements apply everywhere."
   ],
   [
    "Top-down design",
    "Writing the main steps first as calls to functions, then implementing each function in turn."
   ],
   [
    "Module",
    "A Python file containing definitions that other code can bring in with `import`."
   ]
  ],
  "example": "A small business has a 300-line script that reads orders, applies discounts, calculates tax and prints invoices, with the tax calculation copied in three places. When the tax rate changes, a developer updates two of the copies and misses the third, so some invoices are wrong. Refactoring the script into functions such as `apply_discount(order)`, `tax_for(amount)` and `print_invoice(order)` means the tax logic lives in one function, each piece can be tested on its own, and the main section reads like a checklist.",
  "mistakes": [
   [
    "Choosing \"functions make the program run faster\" as a benefit",
    "Decomposition improves structure, reuse, readability and testing. Function calls add a little overhead rather than speeding anything up."
   ],
   [
    "Writing one function that reads input, calculates and prints everything",
    "A function that does many unrelated things is hard to reuse and test. Give each task its own function and connect them in a short main section."
   ],
   [
    "Printing a result inside a helper when the caller needs the value",
    "A printed value cannot be stored or reused. Return the value and let the caller decide whether to print it."
   ],
   [
    "Splitting code so finely that every line becomes a function",
    "Too many tiny functions make a program harder to follow. Aim for functions that each perform one meaningful task."
   ]
  ],
  "tryit": [
   [
    "A student's quiz program contains the same 8-line block that checks an answer and updates the score, copied for each of 10 questions. The teacher asks for one change: correct answers should now earn 2 points instead of 1. What would you recommend before making the change, and why?",
    "Extract the repeated block into a function such as `check_answer(given, correct)` that returns the points earned, and call it for each question. The scoring rule then lives in one place, so changing it to 2 points is a single edit, and the function can be tested on its own."
   ]
  ],
  "tip": "Exam questions on decomposition focus on why: reuse, readability, easier testing and teamwork. A function that returns a value is more reusable than one that only prints it.",
  "check": [
   [
    "Name two benefits of decomposing a program into functions.",
    "Any two of: code reuse, better readability, easier testing and debugging, easier teamwork and abstraction of details."
   ],
   [
    "Why is `def area(w, h): return w * h` usually better than a version that prints the area?",
    "Because a returned value can be stored, compared or reused by the caller, while a printed value is only shown on screen."
   ],
   [
    "What is a common sign that part of a long program should become a function?",
    "Duplicated code, or a block introduced by a comment describing a single task, such as \"calculate the tax\"."
   ],
   [
    "Does splitting code into functions make a Python program run faster?",
    "Not in itself; decomposition improves structure, reuse and maintainability, and the extra calls add a little overhead rather than removing any."
   ]
  ]
 },
 {
  "t": "Defining and invoking functions; functions must be defined before they are called",
  "hook": "Rosa is building a quiz app for the Elm Grove Adult Learning Center, and the first test run ends immediately with \"NameError: name 'ask_question' is not defined.\" The function is right there in the file, a few lines down, spelled exactly the same. After she moves things around, the app runs but prints `<function score at 0x...>` where a number should be, and a fix she made to `score()` seems to be ignored. The center's instructors want to try the app this afternoon. What does Python actually do, line by line, when it meets a `def` and when it meets a call?",
  "simple": "Defining a function is like writing a recipe card and putting it in a box. Nothing gets cooked when you write the card. Cooking happens only when someone asks for that recipe by name, which in Python means writing the name followed by parentheses, like `greet(\"Ana\")`. Python reads a file from top to bottom, so the recipe card has to be in the box before anyone asks for it. If you call a function on a line that runs before its `def`, Python complains that the name is not defined. Without parentheses, `greet` is just the card itself, not the cooked dish. And if you write two cards with the same name, the second one replaces the first.",
  "body": [
   "You define a function with the `def` keyword, followed by the function name, a pair of parentheses containing any parameters, and a colon. The indented block below is the function body, and it must contain at least one statement (`pass` will do). Defining a function does not run the body; it creates a function object and binds it to the name. The body runs only when you call (invoke) the function by writing its name followed by parentheses, with any arguments inside. Each call runs the body from the top, with fresh local variables.",
   "```python\ndef greet(name):\n    print(\"Hello,\", name)\n\ngreet(\"Ana\")    # Hello, Ana\ngreet(\"Ben\")    # Hello, Ben\nprint(greet)    # <function greet at 0x...>\n```",
   "The parentheses matter. `greet(\"Ana\")` calls the function. `greet` without parentheses is just a reference to the function object; writing it alone does nothing visible, and `print(greet)` shows something like `<function greet at 0x...>`. Calling a function with the wrong number of arguments raises `TypeError`, for example \"greet() missing 1 required positional argument: 'name'\". A function with no parameters still needs empty parentheses both in its definition, `def show():`, and in the call, `show()`. Function names follow the same rules as variable names and share the same namespace. If you later assign `greet = 5`, the name no longer refers to the function, and `greet(\"x\")` raises `TypeError: 'int' object is not callable`. Defining a second function with the same name replaces the first one; Python does not support overloading by number of parameters, so only the most recent definition exists. A function whose body contains only `pass` is valid and returns `None` when called. In the REPL (the interactive prompt) the prompt changes to `...` after the header line, and a blank line finishes the definition.",
   "Python runs a script from top to bottom, and a `def` statement is executed like any other statement: when Python reaches it, it creates the function. So a function must be defined before the line that calls it runs. Calling it earlier raises `NameError: name '...' is not defined`. There is an important subtlety. Inside a function body, names are looked up only when the function runs, not when it is defined. So function `a()` can call function `b()` even if `b` is defined later in the file, as long as `b` exists by the time `a()` is actually called. That is why the usual pattern of defining all functions first and calling the main one at the bottom always works.",
   "```python\ndef main():\n    helper()        # fine: looked up when main() runs\n\ndef helper():\n    print(\"helping\")\n\nmain()              # helping\nsay_hi()            # NameError: say_hi is not defined yet\n\ndef say_hi():\n    print(\"hi\")\n```",
   "Tracing a script in execution order is the single most useful skill for this topic. Go through the file from the top and, for each line, ask what Python does right now. A `def` line creates the function object and binds the name, then Python skips over the body to the next unindented line. A call line jumps into the body, runs it with fresh local names, and comes back. When a body mentions another function, Python looks that name up only at that moment. Writing a small table with two columns, \"names defined so far\" and \"what this line does,\" turns every ordering question into simple bookkeeping. If a call happens while the name is missing from the first column, the answer is `NameError`; if the name exists but is bound to something like an integer, the answer is `TypeError`.",
   "Consider a worked example. A student writes a quiz program with the call `ask_question()` on line 1 and the `def ask_question():` block below it. Running it gives `NameError`, because line 1 executes before Python has seen the `def`. Moving the call to the end fixes it. Later the student adds `def score(): ...` twice with different bodies, and is surprised that only the second version ever runs: the second `def` simply rebinds the name. Finally, the student writes `total = score` intending to store the result, but `print(total)` shows a function object; the call needs parentheses, `total = score()`.",
   "Common mistakes: calling a function before its `def` has executed at the top level of a script; forgetting the parentheses in a call, which silently gives you the function object instead of its result; forgetting the colon after the header or the indentation of the body, both of which are syntax errors; reusing a function's name for a variable, which makes the function unreachable; and expecting two definitions with different parameter counts to coexist, as they might in some other languages. Another misunderstanding is thinking that `def` itself runs the code; it only defines it, so a file containing nothing but definitions produces no output at all.",
   "Exam questions typically show a short script and ask what happens. Clue patterns: a call that appears above its `def` at the top level means `NameError`; a call inside another function's body that refers to a function defined later, but executed only after both definitions, means it works; a name without parentheses means a function object, not a result; two `def` lines with the same name mean only the last one counts; and a function called with too many or too few arguments means `TypeError`. Always trace the file in execution order, noting when each `def` actually runs."
  ],
  "analogy": "A `def` statement is like saving a contact in your phone: it stores the name and what to do, but no call is placed. Calling the function is pressing that contact to dial. You cannot dial a contact you have not saved yet, which is the `NameError`. Saving a second contact with the same name overwrites the first. Looking at the contact card without pressing it is like writing the function name without parentheses. The analogy breaks slightly for functions that mention each other: a body can refer to a contact saved later, as long as it is saved before the call actually happens.",
  "terms": [
   [
    "def",
    "The keyword that starts a function definition, followed by the name, parameters in parentheses and a colon."
   ],
   [
    "Function body",
    "The indented block of statements that runs each time the function is called."
   ],
   [
    "Invocation",
    "Calling a function by writing its name followed by parentheses and any arguments."
   ],
   [
    "Function object",
    "The object created by a def statement, bound to the function's name and callable with parentheses."
   ],
   [
    "NameError",
    "The exception raised when code uses a name, such as a function, that has not been defined yet."
   ],
   [
    "Not callable",
    "The TypeError raised when parentheses are applied to an object, such as an integer, that is not a function."
   ]
  ],
  "example": "A developer splits a long script into helper functions and places a quick test call, `format_report(data)`, at the top of the file to check the output. The script fails with NameError because Python executes the call before reaching the def further down. She moves all test calls into a `main()` function defined after the helpers and calls `main()` on the last line, so every function exists before anything runs.",
  "mistakes": [
   [
    "Placing a top-level call above the function's def",
    "Python runs the file top to bottom, so the def has not executed yet and the call raises NameError. Put calls after the definitions, often in a main() called on the last line."
   ],
   [
    "Believing a function body cannot mention a function defined later in the file",
    "Names inside a body are looked up only when it runs, so `a()` may call `b()` defined below it, as long as both defs run before `a()` is called."
   ],
   [
    "Writing `total = score` to store a function's result",
    "Without parentheses you get the function object itself. Write `total = score()` to call it and store its return value."
   ],
   [
    "Expecting two defs with the same name but different parameters to coexist",
    "Python has no overloading by parameter count. The second def rebinds the name, so only the most recent definition exists."
   ]
  ],
  "tryit": [
   [
    "A file contains, in order: `def start(): setup()`, then `start()`, then `def setup(): print(\"ready\")`. A teammate says this works because Python sees the whole file before running. What actually happens, and how would you fix it?",
    "It raises NameError. Python runs top to bottom, so when start() is called on line 2, the def for setup has not executed yet, and the lookup inside start() fails. Move the call `start()` below both definitions."
   ]
  ],
  "tip": "A def must execute before the call runs, but one function body may refer to another function defined later, because names inside a body are looked up only at call time.",
  "check": [
   [
    "What happens if a script calls `hello()` on line 1 and defines `def hello():` on line 3?",
    "A NameError is raised, because the def has not executed yet when line 1 runs."
   ],
   [
    "Why does `def a(): b()` followed by `def b(): print(\"x\")` and then `a()` work?",
    "Because the name b inside a's body is looked up only when a() runs, and by then b has been defined."
   ],
   [
    "What does `print(len)` display, compared with `print(len(\"abc\"))`?",
    "The first shows a built-in function object description; the second calls len and prints 3."
   ],
   [
    "A file defines `def f(): return 1` and then `def f(x): return x`. What does `f()` do?",
    "It raises TypeError, because the second def replaced the first and now requires one argument."
   ]
  ]
 },
 {
  "t": "Return and yield, returning several values as a tuple, the None value",
  "hook": "It is your second week supporting the volunteer-built reservation system at Cedar Hollow Public Library. A librarian, Priya, forwards a screenshot: every confirmation email now reads \"Your pickup shelf is None.\" The function that finds the shelf clearly works, because when you run it by hand it prints \"Shelf B4\" right there on the screen. Yet the email code, which calls the same function, gets nothing useful back. Nobody changed the email template and nobody touched the database. The only recent edit was a \"small cleanup\" that swapped one word in the shelf function. Which word turns a working answer into None, and how do you get the answer back?",
  "simple": "A function is like a small machine: you feed it something, it does some work, and it can hand back a result. `return` is the hand-back. If a function only shows something on the screen with `print`, it has not handed anything back, so Python gives the caller a placeholder called `None`, which simply means \"nothing here\". Think of asking a friend to check the price of milk. If they shout the price across the store, you heard it, but you have nothing written down. If they hand you a note with the price, you can keep it and use it later. `return` is the note. A function can also hand back several things at once, bundled together in a tuple (a fixed group of values). `yield` is different again: it hands out one value at a time and pauses in between.",
  "body": [
   "Functions are only truly useful when they can hand results back, and the PCEP (Certified Entry-Level Python Programmer) exam tests exactly how that hand-off works. The `return` statement ends a function immediately and sends a value back to the caller. The call expression then evaluates to that value, so you can assign it, print it or use it in a larger expression: `total = add(2, 3)` or `print(add(2, 3) * 10)`. Any code after an executed `return` in the same function is skipped, and even a `return` inside a loop ends the whole function, not just the loop. A function can contain several `return` statements, for example one in each branch of an `if`, but only one of them runs per call.",
   "```python\ndef sign(n):\n    if n > 0:\n        return \"positive\"\n    elif n < 0:\n        return \"negative\"\n    return \"zero\"\n\ndef greet():\n    print(\"hi\")          # prints, but returns nothing\n\nprint(sign(-4))          # negative\nprint(greet())           # hi  then  None\n```",
   "A function that finishes without reaching a `return`, or uses a bare `return` with no value, returns the special value `None`. `None` is the single object of type `NoneType` and means \"no value\". It is falsy, it prints as `None`, and the correct way to test for it is `x is None`. Arithmetic with it fails: `None + 1` raises `TypeError`. A classic exam trap is printing the result of a function that prints but does not return: `print(greet())` shows the greeting and then `None`. Remember too that list methods such as `append()` and `sort()` return `None`, for the same reason. To return several values, list them after `return` separated by commas: `return low, high`. Python packs them into a single tuple, so the function actually returns one object. The caller can keep the tuple or unpack it: `lo, hi = min_max(data)`. The number of names must match the number of values, or you get `ValueError`. `return (low, high)` and `return low, high` are identical, and `return [low, high]` would return a list instead. You can see one more subtlety in the REPL (the interactive Python prompt): typing `greet()` there shows `hi` but no `None`, because the REPL does not echo a `None` result, whereas `print(greet())` displays it explicitly.",
   "```python\ndef min_max(values):\n    return min(values), max(values)\n\nresult = min_max([4, 9, 1])\nprint(result, type(result))   # (1, 9) <class 'tuple'>\nlo, hi = min_max([4, 9, 1])\nprint(lo, hi)                 # 1 9\n\ndef countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(countdown(3)))     # [3, 2, 1]\n```",
   "`yield` looks similar but works very differently, and PCEP expects you to recognize it. A function containing `yield` anywhere in its body becomes a generator function. Calling it does not run the body; it returns a generator object. Each time you ask the generator for a value (with a `for` loop, `next()` or `list()`), the body runs until the next `yield`, hands out that value, and pauses, keeping its local variables for next time. `return` ends a function for good and gives back one result; `yield` produces a value and suspends, so one generator can produce many values over time. When the body finishes, the generator is exhausted and a loop over it simply stops. Generators are useful for long or endless sequences produced one item at a time without building a whole list in memory. You can watch the pausing directly with `g = countdown(3)` followed by `next(g)`, which gives 3, and a second `next(g)`, which gives 2. Once the values run out, a further `next(g)` raises `StopIteration`, which a `for` loop handles for you silently.",
   "Consider a worked example. A statistics helper is written as `def stats(nums): total = sum(nums); print(total / len(nums))`. The caller writes `avg = stats([2, 4, 6])` and then `if avg > 3:`, which raises `TypeError` because `avg` is `None`: the function printed 4.0 but returned nothing. Rewriting the last line as `return total / len(nums)` fixes it. The team then extends it to `return total / len(nums), max(nums)` and unpacks with `avg, top = stats([2, 4, 6])`, getting 4.0 and 6.",
   "Common mistakes: confusing printing with returning; placing code after a `return` and expecting it to run; expecting a function with several comma-separated return values to return a list; testing for `None` with `== None` (it works, but `is None` is the correct idiom); and calling a generator function and expecting its body to run immediately. Unpacking also catches people out: `a, b = min_max(data)` works, but `a, b, c = min_max(data)` raises `ValueError`, because exactly two values were packed into the tuple.",
   "Exam questions test these points through output prediction. Clue patterns: a function with no `return` whose call is printed means `None` appears in the output; comma-separated values after `return` mean a tuple; a `return` inside a loop means the loop stops after one pass through that line; `yield` in the body means calling the function gives a generator object, and `list()` or a loop collects the values; and a function that prints inside and is also printed outside means two lines of output. Read each function from the top, following only the branch that runs."
  ],
  "analogy": "`return` is like a cashier handing you a receipt and closing the till: the transaction is over and you hold the result. A function that only prints is a cashier who reads your total aloud but never gives you a receipt; you heard it, but you have nothing to keep. `yield` is like the ticket dispenser at a deli counter: each pull gives you the next number, and the machine remembers where it was. The analogy stops working for multiple return values: they are not several receipts but one envelope, a tuple, holding them all.",
  "terms": [
   [
    "return",
    "A statement that ends a function and sends a value, or None if no value is given, back to the caller."
   ],
   [
    "None",
    "The single value of type NoneType, meaning \"no value\", returned by functions that do not return anything else."
   ],
   [
    "Implicit return",
    "The automatic `return None` that happens when a function reaches the end of its body."
   ],
   [
    "Tuple return",
    "Returning several comma-separated values, which Python packs into one tuple."
   ],
   [
    "yield",
    "A statement that makes a function a generator, handing out one value and pausing until the next is requested."
   ],
   [
    "Generator",
    "An object produced by calling a generator function, which yields values one at a time on demand."
   ]
  ],
  "example": "A shipping app has a function that looks up a parcel's status and prints it. A new feature needs to send the status by text message, but calling `msg = get_status(id)` gives None, so the texts say \"None\". The developer changes the function to return the status string instead of printing it, and to return two values, `return status, eta`, which the caller unpacks with `status, eta = get_status(id)`. Both the screen and the message feature now reuse the same function.",
  "mistakes": [
   [
    "A function that prints a value also returns it.",
    "Printing only displays text. Unless the function executes `return value`, its call evaluates to None, so `x = f()` stores None."
   ],
   [
    "`return a, b` returns two separate objects, or a list.",
    "It returns one tuple, `(a, b)`. Only `return [a, b]` would return a list."
   ],
   [
    "A `return` inside a loop only ends the loop, like `break`.",
    "`return` ends the whole function at once; nothing after it in that function runs on that call."
   ],
   [
    "Calling a generator function runs its body right away.",
    "The call only creates a generator object; the body runs step by step as values are requested by `next()`, a `for` loop or `list()`."
   ]
  ],
  "tryit": [
   [
    "A teammate writes `def area(w, h): print(w * h)` and later `total = area(2, 3) + area(4, 5)`. The script prints 6 and 20 and then crashes. Which exception occurs, and what single change fixes it?",
    "TypeError, because each call evaluates to None and `None + None` is not supported. Replacing `print(w * h)` with `return w * h` makes each call evaluate to a number, so total becomes 26."
   ],
   [
    "You need one function that reports both the lowest and the highest score in a list. You write `def score_range(s): return min(s), max(s)`. What does `r = score_range([7, 3, 9])` store, and how would you get the two numbers into separate variables?",
    "r holds the tuple (3, 9), because comma-separated return values are packed into one tuple. Unpack it with `lo, hi = score_range([7, 3, 9])`; writing three names on the left would raise ValueError."
   ]
  ],
  "tip": "If a function has no return (or a bare return), its call evaluates to None; print(f()) will show None after anything f prints. A comma-separated return gives a tuple.",
  "check": [
   [
    "What does this print: `def f(): print(\"x\")` followed by `print(f())`?",
    "x and then None, because f prints x but returns nothing, so its call evaluates to None."
   ],
   [
    "What type does `def g(): return 1, 2` return?",
    "A tuple, (1, 2), because comma-separated return values are packed into one tuple."
   ],
   [
    "What does `def h(): return 5; print(\"after\")` do when called?",
    "It returns 5 and never prints \"after\", because return ends the function immediately."
   ],
   [
    "What does calling a function that contains `yield` return?",
    "A generator object; the body runs only as values are requested, for example by a for loop or list()."
   ]
  ]
 },
 {
  "t": "Recursion, base cases and RecursionError",
  "hook": "Tomas, the only developer at Larkspur Community Theater, wrote a tiny function to count every seat in the venue's nested seating map: sections contain rows, rows contain blocks, and blocks contain seats. It worked on the test map. Tonight the box office manager uploads the new balcony layout, and the ticketing script dies with a wall of identical traceback lines ending in \"maximum recursion depth exceeded\". Doors open in two hours. The function calls itself, which is the whole idea, so why does it suddenly never stop, and which single line decides whether recursion finishes neatly or runs away?",
  "simple": "Recursion means a function solves a problem by calling itself on a smaller piece of the same problem. Picture a set of nesting dolls. To count them, you open the outer doll and say: one, plus however many are inside. You repeat that with the next doll, and the next, until you reach the tiny solid doll that does not open. That smallest doll is the base case, the point where you stop and answer directly. Without it you would keep trying to open dolls forever. Python protects itself from that situation: if a function keeps calling itself too many times in a row without finishing, Python stops it with an error named RecursionError.",
  "body": [
   "A recursive function is one that calls itself. Recursion is a way of solving a problem by reducing it to a smaller version of the same problem, solving that, and building the answer back up. The factorial of n (the product of all integers from 1 to n, written in math with an exclamation mark after the number) is the standard example: the factorial of n equals n times the factorial of n - 1, and the factorial of 1 is 1. The definition refers to itself, so the code can too. Recursion is not a special Python feature; it simply follows from the fact that a function body may call any function that exists when it runs, including itself.",
   "```python\ndef factorial(n):\n    if n <= 1:                    # base case\n        return 1\n    return n * factorial(n - 1)   # recursive case\n\nprint(factorial(5))   # 120\n\ndef fib(n):\n    if n < 2:                     # base cases 0 and 1\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(6))         # 8\n```",
   "Every correct recursive function has two parts. The base case is a condition under which the function returns an answer directly, without calling itself. The recursive case calls the function again with an argument that moves closer to the base case. Without a reachable base case, the function would call itself forever. It helps to trace what happens. `factorial(5)` needs `factorial(4)`, which needs `factorial(3)`, and so on down to `factorial(1)`, which returns 1. Each call waits, with its own separate local variables, on a stack of pending calls (the call stack). Then the results come back up: 2 x 1 = 2, 3 x 2 = 6, 4 x 6 = 24, 5 x 24 = 120. Recursive calls do not share local variables; each call has its own `n`. You can picture the call stack as a pile of sticky notes: each new call puts a note on top, and a note is removed only when its call returns its result.",
   "Python limits how deep recursion can go, to protect the interpreter from exhausting memory. In CPython (the standard interpreter) the default limit is 1000 frames, which you can inspect with `sys.getrecursionlimit()`. If a function recurses deeper than that, usually because the base case is missing or can never be reached, Python raises `RecursionError: maximum recursion depth exceeded`. `RecursionError` is a subclass of `RuntimeError`, and because it inherits from `Exception`, it can be caught with `try` and `except`. For example, `factorial(-1)` in a version whose base case is `if n == 1:` would move further away from 1 with every call and never stop, eventually raising `RecursionError`; using `n <= 1` avoids that. When it happens, the traceback is long and repetitive, showing the same line of the function again and again, usually with a note that the previous line was repeated many more times, and the final line names `RecursionError`.",
   "The Fibonacci example shows that a function can call itself more than once per call, which makes it elegant but slow for large n, because the same values are computed again and again: `fib(6)` computes `fib(2)` five times. Anything recursion can do, a loop can also do. Recursion is clearer for problems that are naturally self-similar, such as nested lists, folder trees and tree-shaped data; loops are usually more efficient and never hit the depth limit. On the exam you will not be asked to choose performance strategies, but you will be asked to trace calls and spot faulty base cases.",
   "Consider a worked example. A function sums the digits of a number: `def digit_sum(n): if n < 10: return n` and otherwise `return n % 10 + digit_sum(n // 10)`. Tracing `digit_sum(472)`: it returns `2 + digit_sum(47)`, which is `7 + digit_sum(4)`, which hits the base case and returns 4. Coming back up, 7 + 4 is 11 and 2 + 11 is 13. Now suppose someone writes the recursive step as `digit_sum(n / 10)` with true division. The argument becomes 47.2, then 4.72, which is below 10, so the base case returns a float and the final answer is about 13.92 instead of 13: no error, just a wrong result. A different slip, writing the recursive step as `digit_sum(n)` without shrinking `n`, never approaches the base case at all and ends in `RecursionError`. Small details in the recursive step decide whether the base case is reached correctly.",
   "Common mistakes: forgetting the base case; writing a base case that the arguments can skip over, such as `n == 0` when `n` goes down by 2 from an odd number; forgetting to `return` the recursive call's result, which makes the function return `None`; changing the argument in the wrong direction; and assuming recursive calls share variables.",
   "Exam questions give a short recursive function and ask what a call returns or what happens with a given argument. Clue patterns: a missing or unreachable base case means `RecursionError`; a recursive branch without `return` means `None` reaches the caller, often causing a `TypeError` in arithmetic; and \"how many times is the function called\" means count every call, including the first and the base cases. Trace on paper: write each call with its argument on its own line, go down to the base case, then combine results on the way back up."
  ],
  "analogy": "Recursion is like a line of people passing a question back: \"How many people are behind you?\" Each person asks the one behind, waits, then adds one to the answer they receive. The last person, with nobody behind, says \"zero\": that is the base case. The answers then travel back to the front. If the line looped in a circle, the question would never end, which is the RecursionError case. The analogy is good on one point the exam cares about: each person keeps their own count, just as each call keeps its own local variables.",
  "terms": [
   [
    "Recursion",
    "A technique in which a function solves a problem by calling itself on a smaller version of it."
   ],
   [
    "Base case",
    "The condition under which a recursive function returns directly without calling itself."
   ],
   [
    "Recursive case",
    "The branch that calls the function again with an argument closer to the base case."
   ],
   [
    "Call stack",
    "The stack of active function calls, each with its own local variables, waiting for results."
   ],
   [
    "RecursionError",
    "The exception, a subclass of RuntimeError, raised when the maximum recursion depth is exceeded."
   ],
   [
    "Recursion limit",
    "The maximum call depth Python allows, readable with `sys.getrecursionlimit()`."
   ]
  ],
  "example": "A file-management tool needs the total size of a folder that contains files and other folders, nested to any depth. A recursive function adds the sizes of the files in the current folder and calls itself for each subfolder; an empty folder is the base case. Tested on a folder with a symbolic link that pointed back to its own parent, the function recursed until Python raised RecursionError, so the developer added a check to skip folders it had already visited.",
  "mistakes": [
   [
    "A recursive function only needs the call to itself; Python works out when to stop.",
    "Without a base case that is actually reached, the calls never end, and Python raises RecursionError once the depth limit is exceeded."
   ],
   [
    "Any base case is fine as long as one exists.",
    "It must be reachable from every valid argument. `if n == 0` with steps of 2 from an odd number, or a negative starting value with steps of -1, skips past it."
   ],
   [
    "Writing `n * factorial(n - 1)` on a line without `return` still passes the answer back.",
    "The value is computed and discarded, so the call returns None and the caller's multiplication raises TypeError."
   ],
   [
    "RecursionError is a kind of ArithmeticError and cannot be caught.",
    "It is a subclass of RuntimeError, under Exception, so `except RecursionError` or `except Exception` catches it."
   ]
  ],
  "tryit": [
   [
    "A classmate writes `def countdown(n): print(n); countdown(n - 1)` (on separate lines) so that `countdown(3)` prints 3, 2, 1. Instead it prints 3, 2, 1, 0, -1 and keeps going until an error appears. What is missing, which error appears, and how would you fix it?",
    "The base case is missing, so the function recurses until Python raises RecursionError. Add `if n == 0: return` (or `if n < 1: return`) as the first lines so the calls stop before printing 0."
   ],
   [
    "Given `def f(n): return 0 if n == 0 else 1 + f(n - 1)`, how many times is f called in total for `f(3)`, and what does it return?",
    "Four calls: f(3), f(2), f(1) and f(0). f(0) returns 0, and the results come back up as 1, 2 and 3, so f(3) returns 3."
   ]
  ],
  "tip": "When tracing recursion, write each call on its own line with its argument, go down to the base case, then multiply or add on the way back up. A base case that the arguments can skip over is as bad as none.",
  "check": [
   [
    "What two parts must every correct recursive function have?",
    "A base case that returns without recursing and a recursive case that moves the argument closer to that base case."
   ],
   [
    "With `def f(n): return 1 if n == 0 else n * f(n - 1)`, what does `f(4)` return?",
    "24, because 4 x 3 x 2 x 1 x f(0), and f(0) returns 1."
   ],
   [
    "What happens when you call the same `f` with `f(-1)`?",
    "It never reaches n == 0, keeps recursing with -2, -3 and so on, and eventually raises RecursionError."
   ],
   [
    "Which built-in exception class is RecursionError derived from?",
    "RuntimeError, which in turn derives from Exception, so except Exception catches it."
   ]
  ]
 },
 {
  "t": "Parameters vs arguments; positional, keyword and mixed argument passing",
  "hook": "At Willow Bend Veterinary Clinic, the appointment script has worked for months. This morning Dana at the front desk calls you: a golden retriever named Biscuit was supposed to be booked for 45 minutes in exam room 3, but the calendar shows a 3-minute visit in room 45, a room that does not exist. You open the code and find the call a new volunteer added. It passes the same three values the function always expects, just typed in a different order than the definition lists them. Python raised no error and printed no warning; it did exactly what it was told. How does Python decide which value goes where, and how could the call have been written so the mix-up was impossible?",
  "simple": "When you write a function, you list names in parentheses that will receive values later. Those names are parameters, like the blank lines on a paper form: Name, Age, City. When you use the function, you pass real values, called arguments, like filling in the form. Python can fill the blanks in two ways. Positional means by order: the first value goes in the first blank, the second in the second. Keyword means by label: you write `city=\"Lima\"` and it lands in the City blank no matter where you put it. You can mix the two, but the by-order values must come first. Once you start labeling, an unlabeled value would have no clear blank to go into.",
  "body": [
   "The words parameter and argument are often used loosely, but the exam uses them precisely. A parameter is the name listed in the function definition; it exists only inside the function. An argument is the actual value you pass when calling the function. In `def area(width, height):`, `width` and `height` are parameters; in `area(3, 4)`, 3 and 4 are arguments. When the function is called, each parameter is bound to its argument, and the parameter then behaves like a local variable for the duration of that call. A handy memory aid: parameters are placeholders in the definition, arguments are actual values in the call.",
   "Positional arguments are matched to parameters by order: the first argument goes to the first parameter, and so on. `area(3, 4)` sets `width = 3` and `height = 4`; swapping them to `area(4, 3)` swaps the meanings, which for many functions changes the result. Keyword arguments are matched by name, using `parameter=value` in the call. Their order does not matter: `area(height=4, width=3)` is identical to `area(3, 4)`. Keyword arguments make calls self-explanatory and protect you from mixing up the order. You already use them with `print(\"a\", \"b\", sep=\"-\", end=\".\")`, where `sep` and `end` are keyword arguments. Most everyday calls use positional arguments because they are short, and they are perfectly clear when there are only one or two arguments whose order is obvious; keywords earn their place as the argument list grows.",
   "You can mix the two styles in one call, but positional arguments must come first. `area(3, height=4)` is valid. `area(width=3, 4)` is a `SyntaxError` (\"positional argument follows keyword argument\"), detected before the program even runs. You also cannot give the same parameter two values: `area(3, width=5)` raises `TypeError` because `width` already received 3 positionally (\"got multiple values for argument 'width'\"). Using a keyword that is not a parameter name, such as `area(3, depth=4)`, raises `TypeError` (\"unexpected keyword argument\"). Every parameter without a default value must receive exactly one argument, so too few or too many arguments also raise `TypeError`.",
   "```python\ndef intro(name, age, city):\n    print(name, age, city)\n\nintro(\"Ana\", 30, \"Lima\")               # positional\nintro(city=\"Lima\", name=\"Ana\", age=30) # keyword\nintro(\"Ana\", city=\"Lima\", age=30)      # mixed\n# intro(\"Ana\", 30)              -> TypeError: missing 'city'\n# intro(\"Ana\", 30, \"Lima\", 1)   -> TypeError: too many arguments\n# intro(\"Ana\", name=\"Bo\", age=1, city=\"X\") -> TypeError: multiple values\n# intro(name=\"Ana\", 30, \"Lima\") -> SyntaxError\n```",
   "Passing an argument binds the parameter to the same object the caller has; nothing is copied. Rebinding the parameter inside the function (`values = []`) does not affect the caller, but mutating a mutable argument (`values.append(1)`) does, because both names refer to the same list. For immutable arguments such as numbers and strings, nothing the function does to its parameter can change the caller's variable. The argument can be any expression, too: in `area(2 + 1, len(\"abcd\"))` the expressions are evaluated first, and their results, 3 and 4, are passed.",
   "Consider a worked example. A booking function is defined as `def book(guest, nights, room_type):`. A receptionist's script calls `book(\"Kim\", \"suite\", 2)`, and the booking comes out for \"suite\" nights in room type 2, because positional arguments follow order, not meaning. Rewriting the call as `book(\"Kim\", room_type=\"suite\", nights=2)` fixes it and makes the intent obvious. Another colleague tries `book(guest=\"Kim\", 2, \"suite\")` and gets a `SyntaxError`, and a third tries `book(\"Kim\", 2, \"suite\", guest=\"Lee\")`, which raises `TypeError` because `guest` would receive two values. Reading the error message carefully pays off here: Python names the function and the parameter involved, so a message such as `book() got multiple values for argument 'guest'` points straight at the faulty call.",
   "Common mistakes: using \"parameter\" and \"argument\" interchangeably in definition questions; putting a keyword argument before a positional one; passing the same parameter both positionally and by keyword; misspelling a keyword; and believing that reassigning a parameter changes the caller's variable. Another is assuming that keyword arguments must follow the order of the parameters; they may appear in any order, as long as all of them come after the positional ones. A further slip is confusing the error types: the order rule is enforced by the parser as a `SyntaxError`, while the counting and naming rules are checked at call time and raise `TypeError`.",
   "Exam questions ask you to identify parameters versus arguments, predict output from calls that mix styles, or pick the call that fails. Clue patterns: \"in the function definition\" means parameters, \"in the function call\" means arguments; a `name=value` pair before a bare value in a call means `SyntaxError`; a parameter supplied twice, a missing argument or an unknown keyword means `TypeError`; and keyword arguments in any order mean the same result as the correctly ordered positional call. Map each argument to its parameter on paper before deciding what is printed."
  ],
  "analogy": "Think of a theater. A positional argument is a ticket that only says \"next in line\": the first person in gets seat 1, the second seat 2, so order is everything. A keyword argument is a ticket with a name printed on a reserved seat: arrive in any order and you still sit in the right place. Mixing works if the unnamed tickets enter first and fill seats from the left. The analogy stops at one point the exam tests: in Python, letting a named ticket in before an unnamed one is not merely awkward but a SyntaxError, so the code never starts at all.",
  "mnemonic": "Parameters are Placeholders in the definition; Arguments are Actual values in the call. For mixed calls, Positional arguments come first and Keyword arguments last: position first, names after.",
  "terms": [
   [
    "Parameter",
    "A name listed in a function definition that receives a value when the function is called."
   ],
   [
    "Argument",
    "The actual value or expression supplied in a function call."
   ],
   [
    "Positional argument",
    "An argument matched to a parameter by its position in the call."
   ],
   [
    "Keyword argument",
    "An argument written as `name=value` and matched to the parameter with that name."
   ],
   [
    "Mixed passing",
    "A call that uses positional arguments followed by keyword arguments."
   ],
   [
    "Binding",
    "Associating a parameter name with the argument's object for the duration of a call."
   ]
  ],
  "example": "An online shop has a function `ship(order_id, weight, express)`. A developer calls `ship(1042, True, 2.5)` and the courier system receives a weight of True and an express flag of 2.5, which crashes a later calculation. The team adopts a rule that calls with more than two arguments use keywords, such as `ship(1042, weight=2.5, express=True)`, so the meaning of each value is visible and the order can no longer be mixed up.",
  "mistakes": [
   [
    "Parameters and arguments mean the same thing, so either word fits any question.",
    "On the exam, parameters are the names in the def line and arguments are the values or expressions in the call."
   ],
   [
    "Keyword arguments must follow the same order as the parameters.",
    "Keyword arguments can appear in any order, as long as all of them come after the positional arguments."
   ],
   [
    "`f(a=1, 2)` raises a TypeError when the function is called.",
    "It is a SyntaxError detected when the code is parsed, so nothing in the file runs at all."
   ],
   [
    "Reassigning a parameter inside the function changes the caller's variable.",
    "It only rebinds the local name. Mutating a mutable argument, such as appending to a list, is the only kind of change the caller sees."
   ]
  ],
  "tryit": [
   [
    "Given `def label(item, price, qty): print(item, price * qty)`, a colleague proposes three calls: `label(\"pen\", qty=4, price=2)`, `label(price=2, \"pen\", 4)` and `label(\"pen\", 2, item=\"cup\")`. Which call works, and what goes wrong with the other two?",
    "The first works and prints pen 8, because the keywords are matched by name. The second is a SyntaxError (positional argument follows keyword argument), so a file containing it will not run at all. The third raises TypeError at call time, because item receives \"pen\" positionally and \"cup\" by keyword, and qty is never supplied."
   ],
   [
    "Your team's function is `def transfer(from_acct, to_acct, amount)`, and a reviewer worries that calls like `transfer(a, b, 50)` are easy to get backwards. What change to the calls removes the risk without touching the function?",
    "Call it with keyword arguments, for example `transfer(from_acct=a, to_acct=b, amount=50)`. Keywords are matched by name, so the order no longer decides which account is debited, and the intent is visible to every reader."
   ]
  ],
  "tip": "Positional before keyword, always. A keyword argument before a positional one is a SyntaxError; giving one parameter two values or a nonexistent name is a TypeError.",
  "check": [
   [
    "In `def pay(amount, tip):` and the call `pay(20, 3)`, which are the parameters and which are the arguments?",
    "amount and tip are the parameters; 20 and 3 are the arguments."
   ],
   [
    "Given `def f(a, b): print(a - b)`, what does `f(b=1, a=5)` print?",
    "4, because keyword arguments are matched by name, so a is 5 and b is 1."
   ],
   [
    "Why is `f(a=5, 1)` rejected?",
    "It is a SyntaxError because a positional argument cannot follow a keyword argument."
   ],
   [
    "What does `f(5, a=1)` raise for the same function?",
    "TypeError, because a receives 5 positionally and then another value by keyword, and b is never supplied."
   ]
  ]
 },
 {
  "t": "Default parameter values and why defaults must follow required parameters",
  "hook": "Felix maintains the label-printing script at Juniper Ridge Food Bank. Every Saturday, volunteers print bin labels with `make_label(item)`, and it has always worked. Yesterday he added an optional size setting and, while he was at it, a new required parameter for the storage zone, typed at the end of the parameter list. This morning the volunteers report that the script will not even start: no labels, just a SyntaxError pointing at the def line, before a single function has been called. Felix only added one word. Why does Python refuse to create the function at all, and where should that word have gone?",
  "simple": "A default value is a fallback answer built into a function. If you do not say otherwise, the function uses it. Think of ordering coffee: if you do not mention milk, you get it black, but you can ask for milk whenever you like. In Python you write the fallback in the definition, like `size=\"medium\"`. The rule is that the parameters with fallbacks must come after the ones you always have to give. Python fills values from left to right, so if an optional blank came first, it could not tell whether your first value was meant for the optional blank or the required one. One more thing to know: the fallback is made once, when the function is created, and then reused every time.",
  "body": [
   "A parameter can be given a default value in the function definition with `name=value`. If the caller supplies an argument for it, that argument is used; if not, the default is used. This lets one function serve both simple and detailed calls, and it lets you add new options to an existing function without breaking the calls that already use it. `print()` itself works this way: `sep` defaults to a space and `end` to a newline, which is why `print(\"a\", \"b\")` shows `a b` and moves to a new line unless you say otherwise.",
   "```python\ndef greet(name, greeting=\"Hello\"):\n    print(greeting + \", \" + name)\n\ngreet(\"Ana\")                 # Hello, Ana\ngreet(\"Ben\", \"Hi\")           # Hi, Ben\ngreet(\"Cy\", greeting=\"Hey\")  # Hey, Cy\n# greet()                    -> TypeError: missing 'name'\n```",
   "Parameters without defaults are called required parameters, because every call must supply them. The rule is that in the definition all required parameters must come before any parameter that has a default. `def f(a, b=2):` is fine, but `def f(a=1, b):` is a `SyntaxError`, reported as \"non-default argument follows default argument\" in older versions and as \"parameter without a default follows parameter with a default\" in newer ones. Either way, the error happens when Python reads the definition, so the function is never created and no call is needed to trigger it. Why this rule? Positional arguments are assigned left to right. In `def f(a=1, b):`, a call such as `f(5)` would be ambiguous: should 5 go to `a`, leaving `b` without a value, or should it skip `a` and go to `b`? Python avoids the ambiguity by insisting that the optional parameters come last, so positional arguments always fill the required ones first and any leftover positions fill the optional ones in order. You can override just some defaults. With `def box(w, h=1, d=1):`, the call `box(5, d=3)` uses the default for `h` and overrides `d`. Using a keyword is the only way to skip over an earlier optional parameter; positionally, `box(5, 3)` sets `h`, not `d`.",
   "Default values are evaluated once, when the `def` statement runs, not at each call. For immutable defaults such as numbers, strings, `None` or tuples, this makes no difference. For a mutable default such as a list, all calls that use the default share the same list object, so changes accumulate between calls. The standard fix is to use `None` as the default and create the list inside the function. The default object is stored with the function itself, so every call that omits the argument reaches for that same stored object rather than building a new one; that is harmless for a number and surprising for a list.",
   "```python\ndef add_bad(item, bag=[]):\n    bag.append(item)\n    return bag\n\ndef add_item(item, bag=None):\n    if bag is None:\n        bag = []\n    bag.append(item)\n    return bag\n\nprint(add_bad(1), add_bad(2))    # [1, 2] [1, 2]\nprint(add_item(1), add_item(2))  # [1] [2]\n```",
   "Consider a worked example. A reporting function starts as `def report(data):` and is called in twenty places. A new requirement asks for an optional title, so the developer changes it to `def report(data, title=\"Monthly report\"):`. All twenty existing calls keep working with the default, and new calls pass `report(data, \"Q3 summary\")` or `report(data, title=\"Q3 summary\")`. A colleague then tries to add a required `owner` parameter at the end, `def report(data, title=\"Monthly report\", owner):`, and gets a `SyntaxError` before anything runs; the fix is to put `owner` before `title`, or give it a default too. Notice that the ordering rule applies to the definition only. In a call, a required parameter can be passed by keyword after an optional one, as in `report(title=\"Q3 summary\", data=rows)`, because keyword arguments are matched by name.",
   "Common mistakes: placing a default parameter before a required one; expecting that error to appear only when the function is called, when in fact the whole file fails to run; skipping a middle optional parameter positionally instead of using a keyword; assuming a default is recalculated on every call; and using a mutable default such as `[]` or `{}` that silently keeps its contents between calls. A quieter mistake is forgetting that an argument always wins over the default, so `greet(\"Ben\", \"\")` prints just `, Ben` rather than falling back to \"Hello\".",
   "Exam questions test defaults in three ways: which definition is valid, what a call prints when some arguments are omitted, and what a mutable default does over several calls. Clue patterns: `def f(a=1, b)` means `SyntaxError` at definition time; a call that omits an optional argument means the default value is used; a call using a keyword for a later parameter means earlier defaults stay in place; and a list default modified inside the function, called twice, means the second result includes the first call's item. Remember that a required parameter can still be passed by keyword, as in `greet(name=\"Ana\")`."
  ],
  "analogy": "A default value is like the quick-start button on a microwave: press it without choosing anything and it uses its preset time; type in a time and your choice wins. The preset is fixed when the microwave is built, not recalculated each time you press start, which is exactly how Python evaluates defaults once, at definition time. The analogy works for numbers and strings, but a mutable default such as a list is more like a shared bowl left inside the microwave: whatever one person puts in is still there for the next person.",
  "terms": [
   [
    "Default value",
    "A value given to a parameter in the definition, used when the caller supplies no argument for it."
   ],
   [
    "Required parameter",
    "A parameter with no default, which every call must supply."
   ],
   [
    "Optional parameter",
    "A parameter with a default value, which the caller may omit."
   ],
   [
    "Definition time",
    "The moment the def statement runs, when default values are evaluated once and the function object is created."
   ],
   [
    "Mutable default",
    "A default such as a list or dictionary that is shared by every call using it, so changes persist between calls."
   ],
   [
    "None sentinel",
    "Using None as a default and creating a fresh object inside the function when the argument is None."
   ]
  ],
  "example": "A logging helper is defined as `def log(msg, level=\"INFO\", tags=[])`. Each call that adds a tag appends to the default list, so after a day of use every log line carries dozens of unrelated tags. The developer changes the signature to `tags=None` and creates a new list inside the function when tags is None. The level default still works as before, and every existing call like `log(\"started\")` continues to work unchanged.",
  "mistakes": [
   [
    "`def f(a=1, b):` fails only when you call f.",
    "It is a SyntaxError at definition time; the whole file is rejected before any of it runs."
   ],
   [
    "With `def box(w, h=1, d=1)`, the call `box(5, 3)` sets d to 3.",
    "Positional arguments fill parameters left to right, so 3 goes to h. To set only d, use a keyword: `box(5, d=3)`."
   ],
   [
    "A default value is recalculated every time the function is called.",
    "Defaults are evaluated once when def runs, so a mutable default like `[]` is shared across calls. Use None and create the list inside the function."
   ],
   [
    "Passing an empty string or 0 makes the function fall back to its default.",
    "Any argument you pass, even an empty or falsy one, replaces the default."
   ]
  ],
  "tryit": [
   [
    "You maintain `def send(msg, to, urgent=False):`, and existing calls look like `send(\"hi\", \"ops\")`. You must add an optional `retries` parameter defaulting to 3 and a new required `sender` parameter. Where can each go, and what happens to the existing calls?",
    "`sender` must go before `urgent`, for example `def send(msg, to, sender, urgent=False, retries=3):`, because a parameter without a default cannot follow one with a default. However, every existing two-argument call would then raise TypeError for the missing sender, so you either update those calls or give sender a default too. Adding `retries=3` at the end keeps old calls working unchanged."
   ],
   [
    "A helper is defined as `def add(x, seen=[]): seen.append(x); return len(seen)` (on separate lines). What do `add(\"a\")` and then `add(\"b\")` return, and how would you make each call start fresh?",
    "They return 1 and then 2, because both calls share the single default list created at definition time. Use `seen=None` and inside write `if seen is None: seen = []`, so each call that omits the argument gets a new list."
   ]
  ],
  "tip": "Defaults go on the right. def f(a=1, b) never even gets defined: it is a SyntaxError at definition time, not an error at call time.",
  "check": [
   [
    "Which is valid: `def f(a, b=0):` or `def f(a=0, b):`?",
    "Only `def f(a, b=0):`; a parameter without a default cannot follow one with a default, so the second is a SyntaxError."
   ],
   [
    "Given `def p(x, y=2, z=3): print(x, y, z)`, what does `p(1, z=9)` print?",
    "1 2 9, because y keeps its default and z is set by keyword."
   ],
   [
    "What does `p(1, 9)` print for the same function?",
    "1 9 3, because the second positional argument fills y, not z."
   ],
   [
    "Why is `def f(item, items=[])` risky?",
    "The default list is created once at definition time and shared by all calls, so items appended in one call remain in later calls."
   ]
  ]
 },
 {
  "t": "Name scopes, shadowing and the global keyword; UnboundLocalError",
  "hook": "The scoreboard for the Brookfield Middle School robotics fair runs on a short Python script written by a parent volunteer, Ines. At 10 a.m. the first team scores, and the projector shows a traceback instead of points: UnboundLocalError. Ines is puzzled, because the variable `score` is right there at the top of the file, set to zero, and another function reads it without any trouble. In a hurry she changes one line so the error goes away, and now the board shows zero for every team, all morning, without a single complaint. Why can one function see `score` while another cannot, and why is the quiet version worse?",
  "simple": "A scope is the area of a program where a name can be seen. Think of a house. Things on the kitchen table (global names, set at the top of the file) can be seen from every room. Things inside a bedroom drawer (local names, created inside a function) only exist in that room while you are in it. A function can look at the kitchen table freely. But if the function sets down its own item with the same name, it uses its own copy, and the kitchen one stays unchanged. To actually replace the kitchen item from inside a room, the function must say so first, with the word `global`. And if a function plans to use its own copy but reads it before setting it, Python raises UnboundLocalError.",
  "body": [
   "A name's scope is the part of the program where that name can be seen and used. Names assigned at the top level of a script live in the global scope and are visible everywhere in the file, including inside functions. Names created inside a function, including its parameters, are local: they exist only while that call is running and cannot be seen from outside. Using a function's local variable after the function returns raises `NameError`. Scopes keep functions independent: a variable called `total` inside one function never collides with a `total` inside another.",
   "When Python looks up a name, it searches the local scope first, then any enclosing function scopes, then the global scope, and finally the built-in names such as `print` and `len`. The first match wins. This is often summarized as LEGB: local, enclosing, global, built-in. Reading a global variable inside a function works without any special syntax. Assigning to a name inside a function, however, makes that name local to the whole function. If a local variable has the same name as a global one, the local one hides (shadows) the global inside the function, and the global is left untouched. Parameters shadow globals the same way, and a global named `len` or `list` shadows the built-in, which is why using built-in names for variables causes confusing bugs.",
   "```python\nx = 10\ndef show():\n    print(x)      # reads the global: 10\ndef change():\n    x = 99        # creates a local x; global unchanged\n    print(x)      # 99\nshow(); change()\nprint(x)          # 10\ncounter = 0\ndef bump():\n    global counter\n    counter += 1\nbump(); bump()\nprint(counter)    # 2\n```",
   "To assign to a global variable from inside a function, declare it with the `global` keyword before using it in the function: `global counter`. After that, assignments to `counter` in the function affect the global variable, and if the global does not exist yet, the assignment creates it. Use `global` sparingly; passing values in as arguments and getting results back with `return` keeps functions independent and easier to test. Mutating a global object is different from assigning to its name. `items.append(4)` inside a function changes a global list without any `global` statement, because the name `items` is only read, not rebound. A good test of your understanding is to ask, for each function, which names it assigns: those are its locals, unless a `global` statement says otherwise.",
   "`UnboundLocalError` is the error that ties these rules together. Python decides which names are local when it compiles the function: any name assigned anywhere in the body is local throughout the body. So if you read that name before the local assignment has happened, there is no local value yet, and Python does not fall back to the global. `x = 1` at the top level followed by `def f(): print(x); x = 2` raises `UnboundLocalError` when `f()` is called, even though a global `x` exists. The same happens with `count += 1` inside a function without `global count`, because `+=` both reads and assigns. `UnboundLocalError` is a subclass of `NameError`, so `except NameError` catches it. Notice that the error is raised at the read, and only when the function is called; defining such a function produces no error at all, which is why these bugs often surface only when a particular feature is first used.",
   "Consider a worked example. A game keeps `score = 0` at the top level and defines `def add_points(n): score += n`. The first call crashes with `UnboundLocalError`, with a message such as \"cannot access local variable 'score' where it is not associated with a value\" (older versions say \"local variable 'score' referenced before assignment\"), because `score += n` makes `score` local. Adding `global score` as the first line of the function fixes it. A cleaner design passes and returns the value: `def add_points(score, n): return score + n`, called as `score = add_points(score, 5)`. The same game has `def reset(): score = 0`, which silently does nothing to the global score because it creates a local; that bug produces no error at all.",
   "Common mistakes: expecting an assignment inside a function to change a global without `global`; expecting a function's local variables to be visible after it returns; thinking a global is used for the first line of a function and the local for later lines; confusing mutation (`lst.append`) with rebinding (`lst = [...]`); and shadowing built-ins, as in `list = [1, 2]`, which then makes `list(\"abc\")` fail with `TypeError`.",
   "Exam questions show a global and a function that reads or assigns it, and ask what is printed or which error occurs. Clue patterns: a read with no assignment in the function means the global is used; an assignment without `global` means a separate local and the global unchanged; a read before an assignment in the same function means `UnboundLocalError`; `global` in the function means the top-level value changes; and a name defined only inside a function used outside means `NameError`."
  ],
  "analogy": "Scopes work like name tags at a family reunion. Everyone in the hall knows Grandma Rosa (a global). If kids in the game room say \"Rosa is our team captain\" and mean a cousin also named Rosa, then inside that room \"Rosa\" means the cousin (shadowing), and Grandma is unaffected. The `global` keyword is like announcing \"in this room, Rosa means Grandma.\" Where the analogy breaks: Python decides who \"Rosa\" means for the whole room before the game starts, so asking about Rosa before the cousin arrives is an error, not a quiet fallback to Grandma.",
  "mnemonic": "LEGB gives the order Python searches for a name: Local, Enclosing, Global, Built-in. Read it as \"Look Every Good Bin\", checking the nearest bin first and the built-in bin last.",
  "terms": [
   [
    "Scope",
    "The region of a program in which a name is visible and can be used."
   ],
   [
    "Local variable",
    "A name assigned inside a function, including its parameters, that exists only during that call."
   ],
   [
    "Global variable",
    "A name assigned at the top level of a module, visible to all functions in that file."
   ],
   [
    "Shadowing",
    "A local name hiding a global or built-in name with the same spelling inside a function."
   ],
   [
    "global keyword",
    "A declaration that makes assignments to a name inside a function affect the global variable."
   ],
   [
    "UnboundLocalError",
    "A NameError subclass raised when a local variable is read before it has been assigned in the function."
   ],
   [
    "LEGB rule",
    "The lookup order for names: local, enclosing, global, then built-in."
   ]
  ],
  "example": "A web script keeps a global `request_count` and a function that is supposed to increase it on each visit with `request_count = request_count + 1`. The first visit crashes with UnboundLocalError. A junior developer \"fixes\" it by writing `request_count = 1` inside the function, which runs without error but leaves the global at zero forever. The reviewer replaces both attempts with a function that takes the count as a parameter and returns the new value, which is easy to test and needs no global statement.",
  "mistakes": [
   [
    "Assigning to a name inside a function updates the global with the same name.",
    "Without `global`, the assignment creates a separate local variable, and the global keeps its old value."
   ],
   [
    "Inside a function, Python reads the global until the local assignment line, then switches to the local.",
    "Python decides when compiling the function that an assigned name is local for the whole function, so an earlier read raises UnboundLocalError."
   ],
   [
    "Changing a global list with `items.append(x)` requires `global items`.",
    "Mutating an object only reads the name; `global` is needed only to rebind it, as in `items = []`."
   ],
   [
    "UnboundLocalError and NameError are unrelated errors.",
    "UnboundLocalError is a subclass of NameError, so `except NameError` catches both."
   ]
  ],
  "tryit": [
   [
    "Your script has `total = 100` at the top and `def apply_discount(): total = total * 0.9`. One colleague suggests renaming the left side to `new_total`, another suggests adding `global total`, and a third suggests `def apply_discount(t): return t * 0.9`. Which options remove the UnboundLocalError, and which actually change the global total?",
    "All three remove the error. Renaming reads the global correctly but stores the result in a local that vanishes, so total stays 100. Adding `global total` changes the global to 90.0. The parameter-and-return version changes total only when the caller writes `total = apply_discount(total)`, which is the cleanest design because the function no longer depends on a global."
   ],
   [
    "A function is written as `def show(): print(len)` with no assignment, while elsewhere in the file someone wrote `len = 5` at the top level. What does `show()` print, and what goes wrong with `len(\"abc\")` later in the file?",
    "It prints 5, because the global `len` shadows the built-in function in the lookup order. Later, `len(\"abc\")` raises TypeError, because the name now refers to an integer, which is not callable."
   ]
  ],
  "tip": "Any assignment to a name anywhere in a function makes it local for the entire function, so reading it earlier in the same function raises UnboundLocalError instead of reading the global.",
  "check": [
   [
    "With `x = 5` and `def f(): x = 7`, what is `x` at the top level after `f()`?",
    "Still 5, because the assignment inside f creates a local x that shadows the global."
   ],
   [
    "What does `n = 0` followed by `def g(): n += 1` and a call to `g()` do?",
    "It raises UnboundLocalError, because += makes n local to g and it is read before being assigned."
   ],
   [
    "How do you let a function assign to a global variable named `total`?",
    "Declare `global total` inside the function before using it; then assignments change the global."
   ],
   [
    "Does `def h(): items.append(1)` need a global statement to change a global list `items`?",
    "No, because it only reads the name and mutates the list; global is needed only to rebind the name."
   ]
  ]
 },
 {
  "t": "The exception hierarchy: BaseException, Exception, SystemExit, KeyboardInterrupt, ArithmeticError, LookupError",
  "hook": "It is late Friday at Saltmarsh Wind Co-op, and Jonah is running an overnight script that cleans six months of turbine readings. Partway through, he spots a wrong file path and presses Ctrl+C. Nothing stops. The script prints \"skipped one bad record\" and carries on. He presses again: another skipped record. Eventually he has to close the terminal window, losing the run's log. The handler that swallowed his interrupt was meant to catch only bad data. Why was Ctrl+C treated like a bad record, and which single word in that handler would have let him stop the script cleanly?",
  "simple": "When Python hits a problem, it raises an exception, which is like an alarm with a label on it. The labels are arranged in a family tree. At the very top is BaseException, the ancestor of every alarm. Under it sits Exception, the parent of all ordinary errors, plus a couple of special alarms that are not really errors: SystemExit (the program asked to quit) and KeyboardInterrupt (someone pressed Ctrl+C). Lower down, smaller families group similar errors: ArithmeticError for math trouble such as dividing by zero, and LookupError for asking a list or dictionary for something that is not there. When you catch a parent, you also catch all of its children, like a family pass that admits the whole family.",
  "body": [
   "When something goes wrong at run time, Python raises an exception: an object describing the error, with a type (its class) and usually a message. Exceptions are organized into a class hierarchy, a family tree in which more specific exception types inherit from more general ones. This matters because an `except` clause that names a class also catches every class below it in the tree. Knowing the tree lets you predict which handler runs, and lets you choose how broad or narrow each handler should be.",
   "At the root is `BaseException`. Every exception inherits from it. Directly under it are a few special exceptions that are not really errors, most importantly `SystemExit`, raised by `sys.exit()` (and by the built-in `exit()`) to end the program, and `KeyboardInterrupt`, raised when the user presses Ctrl+C. `GeneratorExit`, used internally by generators, is another. Also directly under `BaseException` is `Exception`, the base class for all ordinary errors, and the class your own code should normally catch or extend. In a traceback you see these class names on the last line; pressing Ctrl+C during a long loop, for example, typically ends the output with the single word `KeyboardInterrupt`.",
   "```text\nBaseException\n +-- SystemExit\n +-- KeyboardInterrupt\n +-- Exception\n      +-- ArithmeticError\n      |    +-- ZeroDivisionError\n      |    +-- OverflowError\n      +-- LookupError\n      |    +-- IndexError\n      |    +-- KeyError\n      +-- RuntimeError\n      |    +-- RecursionError\n      +-- TypeError\n      +-- ValueError\n      +-- NameError\n           +-- UnboundLocalError\n```",
   "Why are `SystemExit` and `KeyboardInterrupt` kept outside `Exception`? Because code that catches `Exception` to handle ordinary errors should not accidentally prevent the program from exiting or stop the user from interrupting it. `except Exception:` lets Ctrl+C and `sys.exit()` pass through, while a bare `except:` (or `except BaseException:`) swallows them too, which is why a bare except is discouraged. `ArithmeticError` groups errors from numeric operations. Its subclasses include `ZeroDivisionError` (dividing or taking a remainder by zero) and `OverflowError` (a result too large to represent, which with Python's unlimited integers mostly happens with floats, for example `2.0 ** 10000`). Catching `ArithmeticError` handles all of them. `LookupError` groups errors caused by an invalid index or key when looking something up in a collection. `IndexError` (a sequence index out of range) and `KeyError` (a missing dictionary key) are both subclasses, so `except LookupError:` catches `[1, 2][5]` and `{}[\"x\"]` alike.",
   "You can check relationships in the REPL (the interactive prompt) with `issubclass()`. `issubclass(ZeroDivisionError, ArithmeticError)` returns `True`, `issubclass(KeyError, LookupError)` returns `True`, and `issubclass(KeyboardInterrupt, Exception)` returns `False`. A class counts as a subclass of itself, so `issubclass(ValueError, ValueError)` is also `True`. `TypeError` and `ValueError` sit directly under `Exception`, so neither `ArithmeticError` nor `LookupError` catches them. The practical consequence is a choice of breadth: naming `ZeroDivisionError` handles one precise problem, naming `ArithmeticError` handles a family of related problems, and naming `Exception` handles almost anything. A narrower class makes it clearer what went wrong and avoids hiding unrelated bugs, so choose the most specific class that still covers the cases you can genuinely handle.",
   "Consider a worked example. A data-import script wraps its main loop in `try:` with `except Exception as e: print(\"skipped:\", e)` so that one bad record does not stop the whole import. A bad record causing `KeyError` or `ZeroDivisionError` is skipped as planned. When the operator presses Ctrl+C to stop a long run, `KeyboardInterrupt` is not an `Exception`, so it passes through the handler and the script stops, which is exactly right. An earlier version used a bare `except:`, and pressing Ctrl+C just skipped the current record and carried on, forcing the operator to close the terminal. Separately, a handler written as `except LookupError:` around a dictionary and list lookup catches both kinds of missing item with one clause.",
   "Common mistakes: believing `KeyboardInterrupt` or `SystemExit` are subclasses of `Exception`; putting `ZeroDivisionError` under `ValueError`; thinking `LookupError` catches `ValueError` from `list.index()`; assuming `except ArithmeticError` misses `ZeroDivisionError`; and believing a bare `except:` is the same as `except Exception:`. Remember that `BaseException` is the root, not `Exception`, and that `RecursionError` sits under `RuntimeError`, not under `ArithmeticError` or `LookupError`.",
   "Exam questions ask which `except` branch catches a given error, or which class is the parent of another. Clue patterns: an index or key problem means `LookupError` also catches it; a numeric problem such as division by zero means `ArithmeticError` also catches it; Ctrl+C or `sys.exit()` means `Exception` does not catch it, but `BaseException` and a bare `except:` do; and \"the root of all exceptions\" means `BaseException`. When in doubt, draw the tree from memory and walk up from the raised exception. PCEP (Certified Entry-Level Python Programmer) questions name these classes directly, so it is worth being able to sketch the tree without notes."
  ],
  "analogy": "The hierarchy is like a set of mail-sorting bins. A bin labeled Lookup accepts letters for both Index Street and Key Street. A bin labeled Exception accepts nearly every ordinary letter. The bin labeled BaseException accepts absolutely everything, including two special envelopes, \"exit\" and \"Ctrl+C\", which are deliberately kept out of the Exception bin so routine sorting never traps them. The analogy misses one detail the exam uses: in Python a class also counts as a subclass of itself, so a KeyError bin accepts KeyError exactly.",
  "mnemonic": "Remember the two families as LIK and AZO: LookupError holds IndexError and KeyError; ArithmeticError holds ZeroDivisionError and OverflowError.",
  "terms": [
   [
    "Exception",
    "An object signalling a run-time error; also the name of the base class of all ordinary errors."
   ],
   [
    "BaseException",
    "The root class from which every Python exception inherits."
   ],
   [
    "SystemExit",
    "The exception raised by sys.exit() to end a program; it inherits directly from BaseException."
   ],
   [
    "KeyboardInterrupt",
    "The exception raised when the user presses Ctrl+C; it inherits directly from BaseException."
   ],
   [
    "ArithmeticError",
    "The base class for numeric errors, including ZeroDivisionError and OverflowError."
   ],
   [
    "LookupError",
    "The base class for invalid index or key errors, including IndexError and KeyError."
   ],
   [
    "issubclass()",
    "A built-in function that returns True if one class inherits from another or is the same class."
   ]
  ],
  "example": "A monitoring script polls a server every minute and must survive network glitches, so each poll is wrapped in `try` with `except Exception`. When the administrator wants to stop it for maintenance, Ctrl+C raises KeyboardInterrupt, which is not an Exception subclass, so the script exits cleanly instead of treating the interrupt as one more glitch. The team documents the hierarchy in the code comments so future maintainers do not \"improve\" it to a bare except.",
  "mistakes": [
   [
    "Exception is the root of all exceptions.",
    "BaseException is the root; Exception is one of its children, alongside SystemExit and KeyboardInterrupt."
   ],
   [
    "`except Exception:` catches Ctrl+C and sys.exit().",
    "KeyboardInterrupt and SystemExit inherit directly from BaseException, so they pass through `except Exception:`. Only `except BaseException:` or a bare `except:` catches them."
   ],
   [
    "LookupError catches the error from `[1, 2].index(9)`.",
    "`list.index()` with a missing value raises ValueError, which sits directly under Exception, not under LookupError."
   ],
   [
    "ZeroDivisionError is a kind of ValueError.",
    "ZeroDivisionError is a subclass of ArithmeticError; ValueError is a separate class directly under Exception."
   ]
  ],
  "tryit": [
   [
    "A script has three handlers in this order: `except ArithmeticError: print(\"math\")`, `except LookupError: print(\"lookup\")` and `except Exception: print(\"other\")`. Which word prints for `{\"a\": 1}[\"b\"]`, for `10 % 0`, and for `int(\"ten\")`?",
    "lookup, because KeyError is a subclass of LookupError; math, because the zero divisor raises ZeroDivisionError, a subclass of ArithmeticError; and other, because ValueError sits directly under Exception and matches neither of the first two."
   ],
   [
    "A teammate wants a long-running loop to keep going after ordinary errors but still stop when someone presses Ctrl+C. They are choosing between `except:` and `except Exception:`. Which should they use, and why?",
    "`except Exception:`, because KeyboardInterrupt is not a subclass of Exception and passes through, letting Ctrl+C stop the loop. A bare `except:` catches BaseException and everything under it, so it would swallow the interrupt."
   ]
  ],
  "tip": "Know which classes sit under which: IndexError and KeyError under LookupError, ZeroDivisionError under ArithmeticError, and SystemExit and KeyboardInterrupt directly under BaseException, outside Exception.",
  "check": [
   [
    "Which class is at the root of Python's exception hierarchy?",
    "BaseException; every exception, including Exception itself, inherits from it."
   ],
   [
    "Does `except Exception:` catch KeyboardInterrupt?",
    "No, because KeyboardInterrupt inherits directly from BaseException, not from Exception."
   ],
   [
    "Which single class could you name in an except clause to catch both IndexError and KeyError?",
    "LookupError, which is the parent class of both."
   ],
   [
    "What does `issubclass(ZeroDivisionError, ArithmeticError)` return?",
    "True, because ZeroDivisionError is a subclass of ArithmeticError."
   ]
  ]
 },
 {
  "t": "Common built-in exceptions: ZeroDivisionError, IndexError, KeyError, TypeError, ValueError, NameError",
  "hook": "Monday morning at Pinecrest Adult Learning Center, Rosa opens the help-desk queue and finds five tickets about the same homework-grading tool. Each ticket includes a screenshot of a traceback, and each ends with a different last line: ValueError, ZeroDivisionError, KeyError, TypeError and NameError. The instructor who filed them believes the tool is simply broken and wants it rewritten from scratch. Rosa suspects something else: five small, very specific problems, each one announced clearly by Python itself. What is each of those names telling her, and which two are people most likely to mix up?",
  "simple": "When Python cannot do what you asked, it stops and names the problem. Six names show up constantly. ZeroDivisionError: you divided by zero. IndexError: you asked for a position that does not exist, like the tenth seat in a row of five. KeyError: you looked up a dictionary label that is not there. NameError: you used a name Python has never heard of, often a typo. TypeError: you combined the wrong kinds of things, like adding a word to a number. ValueError: the kind of thing was right but the specific value was wrong, like asking Python to turn the word \"abc\" into a number. Think of a vending machine: pushing a button into the coin slot is a type problem; inserting a coin it does not accept is a value problem.",
  "body": [
   "The PCEP (Certified Entry-Level Python Programmer) exam expects you to look at a short snippet and name the exception it raises. Six built-in exceptions come up again and again. Learn what triggers each one and how they differ, especially the pair `TypeError` and `ValueError`, which accounts for many wrong answers. When an exception is not handled, Python prints a traceback ending with a line like `ZeroDivisionError: division by zero`; the last line names the exception type and message, which is where to look first.",
   "`ZeroDivisionError` is raised when the right operand of `/`, `//` or `%` is zero, whether it is `0` or `0.0`: `5 / 0`, `5 // 0.0` and `5 % 0` all raise it. Raising zero to a negative power, as in `0 ** -1`, raises it too. It is a subclass of `ArithmeticError`. Note that `0 / 5` is fine (it is 0.0); only a zero divisor is a problem.",
   "`IndexError` is raised when a sequence index is out of range: `[1, 2, 3][3]`, `\"abc\"[-4]` or `()[0]`. Slices never raise it. `KeyError` is raised when a dictionary key is missing: `{\"a\": 1}[\"b\"]`, `del d[\"b\"]` or `d.pop(\"b\")` for a key that is not there. Both are subclasses of `LookupError`. Note that `list.index(x)` and `list.remove(x)` with a missing value raise `ValueError`, not `IndexError`, because the problem is the value, not a position. `NameError` is raised when a name is used that has not been defined in any reachable scope: a misspelled variable (`prnt(1)`), a variable used before assignment at the top level, or a function called before its `def` ran. Its subclass `UnboundLocalError` covers local variables read before assignment inside a function.",
   "`TypeError` means an operation or function received a value of an inappropriate type. Examples: `\"a\" + 1`, `len(5)`, `\"ab\" * 2.0`, calling something that is not callable (`5()`), assigning to a tuple or string item, comparing a string and a number with `<`, or calling a function with the wrong number of arguments. `ValueError` means the type was acceptable but the particular value was not. Examples: `int(\"abc\")`, `int(\"3.5\")`, `float(\"x\")`, `[1, 2].index(9)`, `[1, 2].remove(9)` and unpacking the wrong number of items, as in `a, b = (1, 2, 3)`. The quick test: if a different value of the same type would have worked, it is a `ValueError`; if no value of that type could work, it is a `TypeError`. `int(\"42\")` works, so `int(\"abc\")` is a value problem; no list could be added to an integer, so `[1] + 1` is a type problem.",
   "```python\ntests = [lambda: 1 / 0, lambda: [0][1], lambda: {}[\"k\"],\n         lambda: \"a\" + 1, lambda: int(\"x\"), lambda: undefined_name]\nfor t in tests:\n    try:\n        t()\n    except Exception as e:\n        print(type(e).__name__)\n# ZeroDivisionError IndexError KeyError TypeError ValueError NameError\n```",
   "Consider a worked example. A tip calculator reads the bill and the number of people with `bill = float(input())` and `people = int(input())`, then prints `bill / people`. Typing \"twelve\" for the bill raises `ValueError` from `float()`, because a string was acceptable but that string was not a number. Typing 0 people raises `ZeroDivisionError`. A developer who writes `print(\"Each pays \" + bill / people)` gets `TypeError`, because a string cannot be added to a float; `str()` or an f-string fixes it. Misspelling the variable as `peple` raises `NameError`, and reading `names[people]` from a list of that many names raises `IndexError`, because the last valid index is one less than the length. Each exception also points toward its own fix: validate input text before converting it to cure a `ValueError`, check for zero before dividing, convert with `str()` or use an f-string to cure a `TypeError` in concatenation, and compare an index with `len()` before using it.",
   "Common mistakes: calling `int(\"3.5\")` a `TypeError` (the argument is a string, which `int()` accepts, so it is a `ValueError`); calling a missing list value in `remove()` an `IndexError`; expecting a slice out of range to raise `IndexError`; expecting `0 / 5` to fail; confusing `KeyError` with `IndexError` for dictionaries; and thinking `NameError` covers misspelled attributes like `lst.apend(1)`, which actually raises `AttributeError`.",
   "Exam questions typically present a one-line snippet and ask which exception is raised, or which `except` clause handles it. Clue patterns: a zero divisor means `ZeroDivisionError`; a position past the end means `IndexError`; a missing dictionary key in brackets means `KeyError`; mixing incompatible types or calling a non-function means `TypeError`; a conversion of badly formatted text or a missing value in `index()` or `remove()` means `ValueError`; and an undefined or misspelled name means `NameError`. Name the category first (type, value, lookup, arithmetic or name), then pick the specific class."
  ],
  "analogy": "Picture a post office counter. Handing over a sandwich instead of a parcel is a TypeError: the wrong kind of thing entirely. Handing over a parcel with an unreadable address is a ValueError: the right kind of thing with bad contents. Asking for locker 12 on a wall of 10 lockers is an IndexError; asking for a parcel under a name that is not on file is a KeyError. Using a word the clerk has never heard is a NameError. The analogy has no counterpart for ZeroDivisionError, so remember that one on its own: only a zero divisor fails, never a zero being divided.",
  "terms": [
   [
    "ZeroDivisionError",
    "Raised when the divisor of /, // or % is zero; a subclass of ArithmeticError."
   ],
   [
    "IndexError",
    "Raised when a sequence index is outside the valid range; a subclass of LookupError."
   ],
   [
    "KeyError",
    "Raised when a dictionary key is not found; a subclass of LookupError."
   ],
   [
    "TypeError",
    "Raised when an operation is applied to a value of an unsuitable type."
   ],
   [
    "ValueError",
    "Raised when a value has the right type but an unsuitable content, such as int(\"abc\")."
   ],
   [
    "NameError",
    "Raised when code refers to a name that is not defined in any reachable scope."
   ],
   [
    "Traceback",
    "The report Python prints for an unhandled exception, ending with the exception type and message."
   ]
  ],
  "example": "A student's grade tool crashes several times in one afternoon. Entering \"A+\" as a score gives ValueError from int(); an empty class list gives ZeroDivisionError when computing the average; looking up a student who is not in the dictionary gives KeyError; and printing \"Average: \" + avg gives TypeError. Reading the last line of each traceback tells her exactly which kind of problem occurred, so she adds a specific handler or check for each one instead of one catch-all.",
  "mistakes": [
   [
    "`int(\"3.5\")` raises TypeError because the text is the wrong type.",
    "`int()` accepts strings, so the type is fine; the content is not a valid integer literal, so it raises ValueError."
   ],
   [
    "`[1, 2].remove(9)` or `[1, 2].index(9)` raises IndexError.",
    "No position was given; the value is missing from the list, so both raise ValueError."
   ],
   [
    "A slice past the end, such as `[1, 2][5:9]`, raises IndexError.",
    "Slices never raise IndexError; this expression simply returns an empty list."
   ],
   [
    "A misspelled method such as `lst.apend(1)` raises NameError.",
    "Misspelled attributes and methods raise AttributeError; NameError is for bare names that are not defined."
   ]
  ],
  "tryit": [
   [
    "A survey script runs `ages = {\"Ana\": 31}`, then `age = int(input())`, then `print(100 / age)`, then `print(ages[\"ana\"])`. The user types 0. Which exception stops the program, and what would happen instead if the user typed 25?",
    "ZeroDivisionError at `100 / age`, so the dictionary lookup is never reached. With 25, the script prints 4.0 and then raises KeyError, because dictionary keys are case-sensitive and \"ana\" is not the same key as \"Ana\"."
   ],
   [
    "Which exception does each line raise: `len(42)`, `float(\"1,5\")`, `(1, 2)[2]` and `totl + 1` where only `total` exists?",
    "TypeError, because an integer has no length; ValueError, because the string is acceptable but a comma is not a valid decimal point for float(); IndexError, because the tuple's last index is 1; and NameError, because `totl` was never defined."
   ]
  ],
  "tip": "TypeError is about the kind of value, ValueError about the specific value. list.index() and list.remove() on a missing item raise ValueError, not IndexError.",
  "check": [
   [
    "Which exception does `int(\"7.0\")` raise, and why?",
    "ValueError, because int() accepts strings but this string is not a valid integer literal."
   ],
   [
    "Which exception does `\"total: \" + 5` raise?",
    "TypeError, because a string and an integer cannot be concatenated with +."
   ],
   [
    "What do `[1, 2, 3][5]` and `[1, 2, 3].index(5)` raise?",
    "IndexError for the out-of-range position, and ValueError because the value 5 is not in the list."
   ],
   [
    "Which exception does `{\"a\": 1}[\"A\"]` raise?",
    "KeyError, because dictionary keys are case-sensitive and \"A\" is not a key."
   ]
  ]
 },
 {
  "t": "Try-except, except with several exceptions, bare except and except Exception",
  "hook": "Kofi volunteers at the Riverside Tenants' Association, where a small Python script records monthly rent-relief applications typed in at the front desk. Last month it crashed every time someone typed a dollar sign in the income field, so a well-meaning helper wrapped everything in a bare `except:`. Now it never crashes. It also never stops: Ctrl+C does nothing. And when an application vanished last week, there was no error anywhere, because a misspelled variable was being quietly treated as bad input. The script looks calmer and is far more dangerous. How do you catch the errors you expect without hiding the ones you do not?",
  "simple": "A `try` block means \"attempt this, but be ready in case it goes wrong.\" After it come one or more `except` blocks, each saying \"if this particular problem happens, do this instead.\" Think of baking: try using eggs; if there are no eggs, use applesauce; if the oven is broken, order a pizza. As soon as something goes wrong, you stop following the recipe and jump to the matching backup plan, and only one backup plan runs. A plain `except:` with no name catches absolutely everything, even you trying to stop the program, so it hides problems. `except Exception:` catches ordinary errors but still lets you quit. An `else` block runs only if nothing went wrong, and `finally` runs no matter what.",
  "body": [
   "Exception handling lets your program respond to errors instead of crashing. You put code that might fail in a `try` block and the recovery code in one or more `except` blocks. If no exception occurs in the `try` block, all `except` blocks are skipped. If an exception occurs, the rest of the `try` block is abandoned immediately, and Python looks for the first `except` clause whose type matches the exception or one of its parent classes. If one matches, its block runs and execution continues after the whole statement. If none matches, the exception continues upward as if there were no handler.",
   "```python\ntry:\n    n = int(input(\"Number: \"))\n    print(100 / n)\n    print(\"Division done\")\nexcept ValueError:\n    print(\"That was not a whole number\")\nexcept ZeroDivisionError:\n    print(\"Zero is not allowed\")\nprint(\"Carrying on\")\n```",
   "Trace the example with different inputs. Entering 4 prints 25.0, \"Division done\" and \"Carrying on\". Entering \"abc\" makes `int()` raise `ValueError`, so the next two lines of the `try` block are skipped, \"That was not a whole number\" is printed, and then \"Carrying on\". Entering 0 prints \"Zero is not allowed\" and \"Carrying on\", but never \"Division done\". Only one `except` branch runs per exception, even if several could match. To handle different exceptions in the same way, list them as a tuple in one clause: `except (ValueError, TypeError):`. Write the parentheses; they are required in every Python version before 3.14 and whenever you add `as`. To access the exception object, add `as` and a name: `except ZeroDivisionError as e: print(e)` prints the message `division by zero`. Notice that `print(e)` shows only the message; if you want the class name as well, `type(e).__name__` gives `ZeroDivisionError`.",
   "A bare `except:` with no exception type catches everything, including `SystemExit` and `KeyboardInterrupt`. It must be the last `except` clause, or the code is a `SyntaxError` (\"default 'except:' must be last\"). Because it also hides typos (a `NameError` from a misspelled variable is silently caught) and can stop Ctrl+C from working, it is generally discouraged. `except Exception:` is the usual \"catch almost everything\" choice: it catches all ordinary errors but lets `SystemExit` and `KeyboardInterrupt` through, because those do not inherit from `Exception`. A `try` must be followed by at least one `except` or a `finally`; a `try` on its own is a `SyntaxError`.",
   "Two optional clauses complete the statement. An `else:` block, placed after all the `except` clauses, runs only if the `try` block raised no exception; it is the place for code that should run only on success, and keeping it out of the `try` avoids accidentally catching its errors. A `finally:` block runs in every case, whether an exception occurred, was handled or not, which makes it the place for clean-up such as closing a file. The order is always `try`, `except` clauses, `else`, `finally`.",
   "```python\ntry:\n    value = [1, 2][5]\nexcept (IndexError, KeyError) as err:\n    print(\"Lookup failed:\", err)\nelse:\n    print(\"No error\")\nfinally:\n    print(\"Always runs\")\n# Lookup failed: list index out of range\n# Always runs\n```",
   "Consider a worked example. A script reads temperatures from user input in a loop and must never crash. The developer wraps `float(text)` in `try` with `except ValueError:` to reprompt on bad input, uses `else:` to append the good value to a list, and adds `finally:` to count attempts. At first she wrote a bare `except:`, but then Ctrl+C no longer stopped the loop, and a typo, `tempratures.append(v)` inside the `try`, was silently treated as bad input for hours. Switching to `except ValueError:` exposed the `NameError` at once and restored Ctrl+C.",
   "Common mistakes: assuming the rest of the `try` block runs after an error; expecting more than one `except` to run; putting a bare `except:` before others; writing `except ValueError, TypeError:` without parentheses in older versions; and wrapping huge blocks in `try` so that unrelated errors are hidden. Another is catching an error and then carrying on as if nothing happened, for example leaving a variable unassigned and hitting a `NameError` a few lines later, outside the `try`.",
   "Exam questions show a `try` statement and ask what is printed, or which clause catches an error. Clue patterns: an exception on a line means every later line in the `try` is skipped; a tuple after `except` means any of those types matches; `else` means printed only when no exception occurred; `finally` means printed always; a bare `except:` not in last position means `SyntaxError`; and \"catches everything except Ctrl+C and exit\" means `except Exception`. Trace line by line and stop the `try` at the first failing line."
  ],
  "analogy": "A try statement is like a safety net under a trapeze act. The performer, the try block, attempts the routine; at the first slip, the routine stops and the fall goes to the first net that fits. Several nets hung for specific falls are your except clauses. A bare `except:` is a net so wide it also catches the stage manager walking across to end the show, which is what happens to Ctrl+C and sys.exit(). `except Exception:` is wide but leaves a gap for the stage manager. Where the analogy breaks: in Python the routine never resumes from the slip; execution continues after the whole try statement.",
  "terms": [
   [
    "try block",
    "The block of code that Python monitors for exceptions."
   ],
   [
    "except clause",
    "A handler that runs when the try block raises an exception of the named class or a subclass."
   ],
   [
    "Bare except",
    "An `except:` with no class, which catches every exception, including SystemExit and KeyboardInterrupt, and must come last."
   ],
   [
    "except Exception",
    "A handler that catches all ordinary errors while letting SystemExit and KeyboardInterrupt through."
   ],
   [
    "else clause",
    "An optional block after the except clauses that runs only if the try block raised nothing."
   ],
   [
    "finally clause",
    "An optional block that runs whether or not an exception occurred, used for clean-up."
   ]
  ],
  "example": "A point-of-sale terminal converts scanned price codes to numbers. A damaged barcode produces text that int() rejects, so the code catches ValueError and asks the cashier to type the price instead. The receipt printer is closed in a finally block, so it is released whether the sale succeeds or fails. The team uses except Exception around the whole sale as a last resort that logs the error, but never a bare except, so staff can still stop the program for maintenance.",
  "mistakes": [
   [
    "After the handler runs, Python goes back and finishes the rest of the try block.",
    "The try block is abandoned at the failing line; after the handler, execution continues after the whole try statement."
   ],
   [
    "If two except clauses could match, both run.",
    "Only the first matching clause runs, and the rest are skipped."
   ],
   [
    "A bare `except:` and `except Exception:` behave the same.",
    "A bare except also catches SystemExit and KeyboardInterrupt; `except Exception:` lets them through."
   ],
   [
    "The else block runs when an exception was handled.",
    "`else` runs only if the try block raised nothing; `finally` is the block that runs every time."
   ]
  ],
  "tryit": [
   [
    "Predict the output. The try block contains `x = int(\"7\")`, then `print(10 / (x - 7))`, then `print(\"ok\")`. It is followed by `except ValueError: print(\"V\")`, `except ZeroDivisionError: print(\"Z\")`, `else: print(\"E\")` and `finally: print(\"F\")`.",
    "Z and then F. `int(\"7\")` succeeds, but `x - 7` is 0, so the division raises ZeroDivisionError, \"ok\" is skipped, the second handler prints Z, the else block is skipped because an exception occurred, and finally prints F."
   ],
   [
    "You are reviewing a loop that reads numbers from a user with `float(text)` and must keep asking until it gets a valid number, while still letting the user quit with Ctrl+C. The current code uses a bare `except:` around the whole loop body, which also contains the code that saves the number. What would you change?",
    "Narrow the handler to `except ValueError:` around only the `float(text)` call, and move the saving code into an `else:` block. That way only bad input triggers a reprompt, typos in the saving code raise visible errors, and KeyboardInterrupt is no longer caught, so Ctrl+C works."
   ]
  ],
  "tip": "Only the first matching except runs. A bare except must be last and catches even KeyboardInterrupt; except Exception does not catch SystemExit or KeyboardInterrupt.",
  "check": [
   [
    "If the first line of a try block raises ValueError, do the other lines of the try block run?",
    "No; the try block is abandoned at once and control jumps to the first matching except clause."
   ],
   [
    "How do you handle ValueError and TypeError with the same block?",
    "Use one clause with a tuple: `except (ValueError, TypeError):`."
   ],
   [
    "When does an else block attached to try run?",
    "Only when the try block completes without raising any exception."
   ],
   [
    "What is wrong with placing `except:` before `except ValueError:`?",
    "A bare except must be the last clause, so this is a SyntaxError."
   ]
  ]
 },
 {
  "t": "Ordering except branches from specific to general",
  "hook": "At Northgate Transit's small IT office, riders have been complaining that the trip-planner tool says \"Something went wrong\" for every problem, whether they typed a stop name that does not exist or a departure time like 25:99. The developer, Lena, insists she wrote helpful messages for each case. You open her handler code and find them all there, carefully worded: \"Unknown stop\", \"Invalid time\", and a general fallback. Yet none of the specific messages has appeared once in three months of logs, and Python never complained about anything. How can correctly written handlers sit in the code and never run?",
  "simple": "When Python has several `except` blocks to choose from, it reads them from top to bottom, uses the first one that fits, and stops looking. A general block, such as `except Exception`, fits almost every error. If you put it first, it grabs everything, and the specific blocks below it never get a turn. Think of sorting laundry: if the first basket is labeled \"clothes\", every sock and shirt lands there, and the \"socks\" basket underneath stays empty forever. The fix is to put the specific baskets first and the general basket last, as a catch-all. Python does not warn you about a basket that can never be used; it simply never uses it.",
  "body": [
   "When an exception is raised inside a `try` block, Python checks the `except` clauses from top to bottom and runs the first one that matches. A clause matches if the exception is an instance of the named class or of any of its subclasses. Once a clause has matched, no later clauses are considered, even if a later one names the exact class that was raised. This first-match rule is why the order of `except` branches matters, and why PCEP (Certified Entry-Level Python Programmer) questions so often show several branches and ask which one prints. Consider what happens if a general class comes first. `except Exception:` matches almost every error, and `except LookupError:` matches both `IndexError` and `KeyError`. If you put one of these above a more specific clause, the specific clause can never run: it is unreachable, or dead code. Python does not report an error for this; the code runs normally, and the specific branch simply never gets its turn.",
   "```python\ntry:\n    print([1, 2][9])\nexcept LookupError:\n    print(\"lookup problem\")   # this runs\nexcept IndexError:\n    print(\"bad index\")        # never reached\n```",
   "The correct pattern is to order the branches from most specific to most general: subclasses first, then their parents, then `Exception`, and a bare `except:` (if you use one at all) last. That way each specific case gets its tailored handling, and the general clause acts as a safety net for anything unexpected. Two exceptions that are not related (neither inherits from the other), such as `KeyError` and `ZeroDivisionError`, can appear in either order without changing behavior, because a given exception can match only one of them. Order only matters along a single branch of the hierarchy. The same logic applies to tuples: `except (ValueError, LookupError):` placed above `except KeyError:` makes the `KeyError` branch unreachable too. A helpful picture is a funnel of filters: the narrowest filters sit at the top and the widest at the bottom, so each error is caught by the narrowest filter that fits it.",
   "```python\ndef divide(data, key, count):\n    try:\n        return data[key] / count\n    except KeyError:\n        print(\"No such key\")\n    except ZeroDivisionError:\n        print(\"Count is zero\")\n    except ArithmeticError:\n        print(\"Other math problem\")\n    except Exception as e:\n        print(\"Unexpected:\", type(e).__name__)\n\ndivide({\"a\": 10}, \"b\", 2)   # No such key\ndivide({\"a\": 10}, \"a\", 0)   # Count is zero\ndivide({\"a\": 10}, \"a\", \"x\") # Unexpected: TypeError\n```",
   "To reason about any snippet you need the hierarchy from the earlier lesson: `ZeroDivisionError` and `OverflowError` under `ArithmeticError`; `IndexError` and `KeyError` under `LookupError`; `UnboundLocalError` under `NameError`; `RecursionError` under `RuntimeError`; all of them under `Exception`; and `Exception`, `SystemExit` and `KeyboardInterrupt` under `BaseException`. For each raised exception, walk down the clauses and ask: is this clause's class the same as the raised class or one of its ancestors? The first yes wins.",
   "Consider a worked example. A configuration loader reads a value with `settings[\"port\"]` and converts it with `int()`. Its handlers are, in order, `except Exception:` printing \"config error\", `except KeyError:` printing \"port missing\", and `except ValueError:` printing \"port not a number\". Whatever goes wrong, users only ever see \"config error\", and support staff cannot tell a missing setting from a typo. Reordering to `KeyError`, then `ValueError`, then `Exception` makes each message appear when it should, while `Exception` still catches surprises. The fixed order is also easier to read, because a reviewer sees each special case before the catch-all and can tell at a glance which messages users will actually receive.",
   "Common mistakes: assuming Python picks the best match rather than the first match; thinking an unreachable branch causes an error; believing unrelated classes must be in a particular order; forgetting that a tuple clause matches each of its members and their subclasses; and placing `except Exception` or a bare `except:` anywhere but the end. A subtler slip is reading the class names too quickly: `LookupError` and `KeyError` look unrelated at a glance, but one is the parent of the other, so their order matters a great deal. When in doubt, check with `issubclass()` in the REPL (the interactive prompt).",
   "Exam questions nearly always use the form \"what is printed?\" with a raised exception and three or four clauses. Clue patterns: a parent class above its child means the parent's message is printed and the child's branch is dead code; `Exception` first means its branch runs for every ordinary error; unrelated classes in any order mean only the matching one runs; and a bare `except:` that is not last means `SyntaxError`, not a runtime result. Scan strictly top to bottom and stop at the first class that is the same as, or an ancestor of, the raised exception. If none matches, the exception propagates as if the `try` were not there."
  ],
  "analogy": "Ordering except clauses is like airport security lanes checked in sequence. If the first sign says \"All passengers\", nobody ever reaches the \"Crew only\" or \"Families with strollers\" lanes behind it, even though those lanes are staffed and ready. Put the special lanes first and the general lane last. Where the analogy stops: travelers might look around and choose the best lane, but Python never searches for the best match, only the first one that fits, and it never tells you that a lane went unused.",
  "terms": [
   [
    "First-match rule",
    "Python runs only the first except clause, from top to bottom, whose class matches the raised exception."
   ],
   [
    "Specific exception",
    "A class low in the hierarchy, such as KeyError, that describes one precise kind of error."
   ],
   [
    "General exception",
    "A class high in the hierarchy, such as LookupError or Exception, that covers many kinds of error."
   ],
   [
    "Unreachable branch",
    "An except clause that can never run because an earlier clause already catches everything it would."
   ],
   [
    "Ancestor class",
    "A class further up the hierarchy from which a given exception class inherits."
   ],
   [
    "Safety net",
    "A final general handler, typically except Exception, that catches errors not handled by earlier clauses."
   ]
  ],
  "example": "An online payment service catches errors from its connection to the bank. Its code first catches `OSError`, a general class for operating-system and network errors, and below it `TimeoutError`, a subclass for slow responses that should be retried. Because the general clause comes first, timeouts are logged as failures and never retried, and customers see declined payments. Swapping the order so TimeoutError is checked first makes retries work, and the general OSError clause still handles every other network problem.",
  "mistakes": [
   [
    "Python picks the most specific matching except clause.",
    "Python uses the first matching clause from top to bottom, even if a more exact one appears later."
   ],
   [
    "An unreachable except clause causes a SyntaxError or a warning.",
    "Python accepts it silently; the only ordering rule enforced as a SyntaxError is that a bare `except:` must be last."
   ],
   [
    "Unrelated exceptions like KeyError and ZeroDivisionError must appear in a set order.",
    "Order matters only between a class and its ancestors; unrelated classes can go in either order."
   ],
   [
    "`except LookupError` above `except KeyError` is fine because they are different names.",
    "LookupError is the parent of KeyError, so it catches every KeyError first and the KeyError branch becomes dead code."
   ]
  ],
  "tryit": [
   [
    "A teammate's handlers appear in this order: `except Exception`, `except ValueError`, `except ArithmeticError`, `except ZeroDivisionError`. Reorder them so every branch can run, and say whether ValueError must come before or after the arithmetic pair.",
    "One correct order is ValueError, ZeroDivisionError, ArithmeticError, Exception. ZeroDivisionError must come before its parent ArithmeticError, and Exception must be last. ValueError is unrelated to the arithmetic classes, so it may go anywhere above Exception."
   ],
   [
    "Handlers are, in order, `except (ValueError, LookupError): print(\"input\")`, `except KeyError: print(\"key\")` and `except Exception: print(\"other\")`. What prints for `{}[\"x\"]`, and is the KeyError branch ever used?",
    "input, because KeyError is a subclass of LookupError, which is in the tuple of the first clause. The KeyError branch is unreachable and never runs for any exception."
   ]
  ],
  "tip": "Trace except clauses strictly top to bottom and stop at the first ancestor-or-same class. A general class above a specific one makes the specific branch dead code, and Python does not warn you.",
  "check": [
   [
    "In what order should `except Exception`, `except LookupError` and `except KeyError` appear?",
    "KeyError first, then LookupError, then Exception: from most specific to most general."
   ],
   [
    "What does this print: `try: 1 / 0` with `except ArithmeticError: print(\"A\")` followed by `except ZeroDivisionError: print(\"Z\")`?",
    "A, because ZeroDivisionError is a subclass of ArithmeticError and the first matching clause wins."
   ],
   [
    "Does Python raise an error when a specific except clause is unreachable?",
    "No; the code runs normally and the unreachable clause is silently never used."
   ],
   [
    "Does the order of `except KeyError` and `except ZeroDivisionError` matter?",
    "No, because the two classes are unrelated, so any exception can match at most one of them."
   ]
  ]
 },
 {
  "t": "Propagating exceptions through function boundaries and deciding where to handle them",
  "hook": "Amara is on call for the online booking system at Heronsgate Community Pool. A parent emails: the site accepted her child's swim-lesson booking, showed a cheerful \"Booked for None\", and reserved no lane. You trace the flow. The booking page calls `create_booking()`, which calls `pick_slot()`, which calls a helper that parses the lesson time. That helper has a tidy `try` and `except` that catches every bad time and quietly returns None. Nothing crashed, nothing was logged, and three layers up, the page had no idea anything had failed. Was catching the error there the right call, and if not, where should it have been caught?",
  "simple": "When something goes wrong inside a function and that function has no plan for it, the problem is passed back to whoever called the function, like a question an employee cannot answer being passed up to a manager. If the manager has no answer either, it goes to their boss, and so on. If it reaches the very top with nobody handling it, the program stops and prints a report called a traceback. Everything the function would have done after the problem is skipped, including handing back a result. Deciding where to catch an error is like deciding who should answer a customer: the person who actually knows what to do, not necessarily the first person who heard the question.",
  "body": [
   "An exception does not have to be handled in the function where it is raised. If a function has no matching `except` for an exception, the function stops immediately, and the exception is passed (propagated) to the code that called it, at the point of the call. If that caller does not handle it either, it moves up again, through each calling function in turn. If it reaches the top level of the program without being handled, Python prints a traceback and the program ends. This behavior is what lets you separate the code that detects a problem from the code that decides what to do about it.",
   "```python\ndef parse(text):\n    return int(text)          # may raise ValueError\n\ndef read_age(text):\n    age = parse(text)         # no handler here\n    print(\"parsed\")           # skipped on error\n    return age\n\ntry:\n    print(read_age(\"abc\"))\nexcept ValueError:\n    print(\"Please enter digits\")   # handled at the top\n```",
   "Here `int(\"abc\")` raises `ValueError` inside `parse`. Neither `parse` nor `read_age` handles it, so both stop at once: \"parsed\" is never printed, the `return` statements never run, and the exception arrives at the `try` around the call to `read_age`, where it is handled. The only output is \"Please enter digits\". The traceback Python prints for an unhandled exception lists this chain of calls, starting with \"Traceback (most recent call last):\", oldest call first, with the line where the error was raised at the bottom, just above the exception name and message. Reading a traceback from the bottom up is the fastest way to find where things went wrong, and reading upwards shows how the program got there.",
   "Once an exception has been handled, it stops propagating. If `parse` had caught the `ValueError` itself and returned, say, `None`, the caller would never know an error happened and would receive `None` instead, possibly failing later with a confusing `TypeError`. Where you handle an exception is therefore a design decision, not just syntax. Handle it at the level that knows what to do about it. A low-level helper like `parse` usually cannot know whether to ask the user again, use a default or abort, so it is often better to let the exception propagate. The code that talks to the user, such as an input loop, is the right place to catch it and re-prompt. Conversely, if a function can genuinely recover, for example by returning a sensible default for a missing dictionary key, handling it locally keeps callers simpler. A useful rule of thumb is to catch an exception where you can do something meaningful about it, such as retry, use a sensible default or explain the problem to a person, and otherwise let it travel upward.",
   "A function can also raise exceptions deliberately with the `raise` statement, for example `raise ValueError(\"age must be positive\")`, to signal a problem to its caller. The raised exception propagates exactly like one raised by Python itself. Inside an `except` block, a bare `raise` re-raises the current exception so it continues to propagate after you have, for instance, logged it. A `finally` block in any function the exception passes through still runs on the way up, so clean-up code is never skipped. Note that a bare `raise` only makes sense while an exception is being handled; used outside any `except` block, it fails with a `RuntimeError` because there is no active exception to re-raise.",
   "Consider a worked example. A banking app has `withdraw(account, amount)`, which calls `check_balance()`, which raises `ValueError(\"insufficient funds\")` when the balance is too low. `withdraw` has a `finally` that releases a lock on the account but no `except`. The menu function calls `withdraw` inside `try` with `except ValueError as e: print(\"Sorry:\", e)`. When a customer overdraws, `check_balance` raises, the rest of `check_balance` and `withdraw` is skipped, the lock is released by `finally`, and the menu prints \"Sorry: insufficient funds\" and shows the menu again. The lower functions stay simple, and the user-facing code decides how to respond.",
   "Common mistakes: expecting a function's remaining lines, including its `return`, to run after an exception escapes it; thinking a caller's `except` cannot catch errors raised deep inside called functions; catching an exception too early and returning a misleading value such as `None`; swallowing exceptions with `except: pass`, which hides the cause; and forgetting that `finally` still runs as the exception passes through.",
   "Exam questions give two or three nested functions and a `try` at some level, then ask what is printed. Clue patterns: an exception with no handler in the current function means skip the rest of it and move to the caller; a matching `except` at a higher level means only that handler's output appears; code after the failing call in each abandoned function never prints; a `finally` on the way up prints anyway; and no handler anywhere means a traceback and program termination. To trace propagation, ask at each level: is the failing call inside a `try` with a matching `except` here? If yes, run that handler and continue after its `try` statement. If not, run any `finally` block in this function, abandon everything else, and move to the caller. Repeat until the exception is handled or reaches the top level."
  ],
  "analogy": "Exception propagation works like a complaint moving up a store's chain of command. A cashier who cannot fix a billing error passes it to the supervisor, who passes it to the manager, until someone with the authority to fix it takes care of it. Each person who passes it on stops what they were doing for that customer. A `finally` block is like each person jotting a quick note before handing the problem up: it always happens. Where the analogy breaks: in Python nobody chooses to pass the problem on; any function without a matching except passes it automatically.",
  "terms": [
   [
    "Propagation",
    "The movement of an unhandled exception from a function back to its caller, and so on up the call chain."
   ],
   [
    "Call chain",
    "The sequence of function calls active at a moment, from the top-level code down to the current function."
   ],
   [
    "Traceback",
    "The report of an unhandled exception, listing the call chain with the most recent call last and the error at the bottom."
   ],
   [
    "raise",
    "A statement that throws an exception deliberately, such as `raise ValueError(\"bad input\")`."
   ],
   [
    "Re-raise",
    "Using a bare `raise` inside an except block to let the current exception continue propagating."
   ],
   [
    "Handler placement",
    "The design choice of which level catches an exception, ideally the one that knows how to respond."
   ]
  ],
  "example": "A weather app calls `fetch_forecast()`, which calls `download()`, which raises an error when the network is down. Neither lower function handles it, so the error propagates to the screen code, which catches it and shows \"Offline: showing last saved forecast\". If download() had caught the error and returned an empty string, the parser would have crashed later with a confusing message, and the screen code would never have known the network was the real problem.",
  "mistakes": [
   [
    "After an exception escapes a function, the function still finishes its remaining lines and returns.",
    "The function stops at the failing line; its later lines and its return statement never run."
   ],
   [
    "Only a try block in the same function can catch an exception.",
    "A matching except in any caller further up the chain catches it."
   ],
   [
    "It is always best to catch errors as early as possible, right where they occur.",
    "Catching too early can hide failures, for example by returning None that breaks something later. Catch where the code knows how to respond."
   ],
   [
    "finally blocks are skipped when an exception passes through them.",
    "finally always runs, including while an exception is propagating upward."
   ]
  ],
  "tryit": [
   [
    "Predict the output. `inner()` prints \"A\", computes `1 / 0`, then prints \"B\". `outer()` calls `inner()` and then prints \"C\" inside a try that has only a `finally: print(\"D\")`. The top level calls `outer()` and then prints \"E\" inside a try with `except ZeroDivisionError: print(\"F\")`, and finally prints \"G\" after that statement.",
    "A, D, F, G. inner prints A and raises; B is skipped. outer has no except, so C is skipped but its finally prints D on the way up. The top-level handler catches the error and prints F, E is skipped, and execution continues to print G."
   ],
   [
    "A helper `load_price(code)` looks up a product code in a dictionary and may raise KeyError. A checkout screen uses it and should ask the cashier to rescan, while a nightly report uses it and should log the code and skip it. Should `load_price` catch the KeyError itself?",
    "No. Each caller needs a different response, so let the KeyError propagate and handle it in the checkout screen and in the report separately. If load_price caught it and returned None, both callers would need extra checks and could fail later with a confusing TypeError."
   ]
  ],
  "tip": "When an exception escapes a function, every remaining line in that function is skipped, including its return. The exception is caught by the nearest enclosing try with a matching except anywhere up the call chain.",
  "check": [
   [
    "If function `a()` calls `b()`, and `b()` raises KeyError with no handler, where can the KeyError be caught?",
    "In a() if the call to b() is inside a try with a matching except, or in any caller further up the chain."
   ],
   [
    "After an exception escapes a function, does that function's return statement run?",
    "No; the function stops immediately at the failing line and returns no value."
   ],
   [
    "What does a bare `raise` do inside an except block?",
    "It re-raises the exception currently being handled, so it continues propagating to the caller."
   ],
   [
    "Why is it often better to let a low-level helper's exception propagate rather than catch it there?",
    "Because the helper usually cannot know the right response, while higher-level code, such as the user interface, can re-prompt, use a default or report the error."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
