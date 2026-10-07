/* Teacher edition for PCEP – Certified Entry-Level Python Programmer (PCEP-30-02): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("pcep", [
 {
  "t": "Fundamental terms: interpreting vs compiling, lexis, syntax and semantics, source code and the Python interpreter",
  "objectives": [
   "Students will be able to explain the difference between compiling and interpreting and state which approach Python uses.",
   "Students will be able to distinguish lexis, syntax and semantics using short code examples.",
   "Students will be able to predict whether a snippet fails before running (syntax error) or when a line is reached (run-time error), and how much output appears first.",
   "Students will be able to compare interactive (REPL) mode with script mode."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write \"Dog the barked\" and \"The sofa barked\" on the board. Ask which sentence is broken and how. Label the answers grammar and meaning, and tell students that Python has the same layers of rules."
   ],
   [
    12,
    "Teach",
    "Explain compiler versus interpreter with the book translator and live interpreter comparison, then lexis, syntax and semantics. Project a three-line script, run it with a syntax error on the last line, and ask students to notice that nothing printed. Then move a division by zero to the middle line and point out that the first line's output appears before the traceback."
   ],
   [
    15,
    "Activity",
    "Run the error detective card sort. Circulate, and when a pair hesitates, ask: would Python notice this before running anything, or only when it reaches the line?"
   ],
   [
    8,
    "Discuss",
    "Each pair reports one card they found tricky. Use the discussion questions to draw out why parsing the whole file first is helpful and why logic errors need testing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post it by the door as they leave."
   ]
  ],
  "warmup": "Which of these is broken, and how: \"Dog the barked\" or \"The sofa barked\"? What kind of rule does each one break?",
  "activity": {
   "title": "Error detective card sort",
   "materials": "Printed cards with one short snippet each (about 12 per pair), whiteboard with four columns labeled Runs correctly, Syntax error, Run-time error and Logic error",
   "steps": [
    "Give each pair a set of cards showing snippets such as print(\"hi\", print(10 / 0), prnt(5) and area = width + height for a rectangle.",
    "Pairs sort every card into one of the four columns and, for each error card that is part of a longer script, write how many lines print before the program stops.",
    "Pairs compare with a neighboring pair and settle disagreements using the rule that Python parses the whole file first.",
    "Volunteers tape one card each into the whiteboard columns and explain their reasoning to the class."
   ]
  },
  "discussion": [
   "Why might it be helpful that Python checks the grammar of the whole file before running any of it?",
   "If a program runs without errors, how can you tell whether it is correct?",
   "When would you choose the interactive prompt instead of writing a script file?"
  ],
  "exit": [
   [
    "For the PCEP exam, is Python compiled or interpreted?",
    "Interpreted: the interpreter executes the source each time the program runs, so it must be present."
   ],
   [
    "A five-line file has a missing parenthesis on line 5. How many lines print?",
    "None, because the SyntaxError is found while parsing, before any line runs."
   ],
   [
    "Is print(\"a\" + 5) a syntax error or a run-time error?",
    "A run-time error (TypeError). The line is grammatically valid, but adding a str and an int has no meaning."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a reference card with the three questions \"Is it a legal word? Is it put together correctly? Does it make sense?\" and have them sort only syntax versus run-time cards first.",
   "Extend: Ask fast finishers to write a four-line script that prints exactly two lines before stopping with an error, then swap with a partner who must predict the output."
  ]
 },
 {
  "t": "Python logic and structure: keywords, instructions, indentation and comments",
  "objectives": [
   "Students will be able to identify Python keywords and explain why they cannot be used as names.",
   "Students will be able to predict which statements belong to a block from their indentation and how that changes output.",
   "Students will be able to recognize the messages for unexpected indent, expected an indented block and inconsistent indentation.",
   "Students will be able to explain how comments are treated, including a # inside a string literal."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project two versions of the same three-line if statement that differ only in the indentation of the last line. Ask students to predict whether the outputs differ."
   ],
   [
    10,
    "Teach",
    "Explain statements, keywords and case sensitivity, then headers, colons and blocks. Run both warm-up versions to show the different outputs. Demonstrate the two classic indentation errors and show how pass fixes an empty block. Finish with comments, including a # inside quotes."
   ],
   [
    18,
    "Activity",
    "Run the indentation strips activity. As pairs work, ask them to say aloud which header each line belongs to."
   ],
   [
    7,
    "Discuss",
    "Ask the discussion questions and connect answers to why Python chose indentation instead of braces."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "These two snippets contain exactly the same words. Will they print the same thing? Why or why not?",
  "activity": {
   "title": "Indentation strips",
   "materials": "Printed paper strips, each holding one line of code with no leading spaces, tape, and a sheet of paper per pair with faint vertical lines marking indentation levels",
   "steps": [
    "Give each pair an envelope of strips for a short program with an if, a for loop and a final print, plus a card describing the required output.",
    "Pairs tape the strips onto the lined sheet at the indentation level that produces the required output.",
    "Pairs swap sheets with another pair, who trace the program and write the output it would actually print.",
    "Discuss any mismatches as a class, and finish by asking each pair to place one strip so it would cause an IndentationError and name the error message."
   ]
  },
  "discussion": [
   "What are the advantages and disadvantages of making indentation part of the grammar?",
   "Why do you think True, False and None are capitalized keywords while most keywords are lowercase?",
   "What makes a comment useful rather than clutter?"
  ],
  "exit": [
   [
    "Can you name a variable pass? Why or why not?",
    "No. pass is a keyword, so pass = 1 is a SyntaxError."
   ],
   [
    "What error appears if a line ending with a colon is followed by an unindented line?",
    "IndentationError: expected an indented block."
   ],
   [
    "What does print(\"x # y\") output?",
    "x # y, because the # is inside a string literal, not a comment."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle strips that are color-coded by block, and ask them first to match each strip to its header before worrying about exact spacing.",
   "Extend: Ask fast finishers to write a nested example with three indentation levels and predict the output for two different values of the tested variable."
  ]
 },
 {
  "t": "Literals: Boolean, integer, float, scientific notation and string literals",
  "objectives": [
   "Students will be able to identify the type of a literal (int, float, str, bool or NoneType) from how it is written.",
   "Students will be able to explain why a literal written in scientific notation is always a float.",
   "Students will be able to distinguish valid from invalid numeric literals, including underscores and leading zeros.",
   "Students will be able to predict how a literal's type changes the result of an operation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write 4, 4.0, \"4\" and True on the board and ask students whether they are all the same thing. Record the different opinions without judging."
   ],
   [
    12,
    "Teach",
    "Walk through int, float, scientific notation, str, bool and None with examples, calling type() on each in a projected interpreter. Show \"12\" + \"3\", 1_000 + 1, True + True and 1,000 to surface the surprises."
   ],
   [
    15,
    "Activity",
    "Run the literal sorting activity. Circulate and ask students to justify each placement using the clue words: point or e means float, quotes mean str."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, focusing on why Python keeps 4 and 4.0 as different types even though they compare equal."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Are 4, 4.0, \"4\" and True the same value? What would you expect each to do if you added 1 to it?",
  "activity": {
   "title": "Literal sorting zones",
   "materials": "Sticky notes pre-printed with about 20 literals (for example 7, 7.0, 7., .5, 2e3, \"7\", 'True', True, None, 1_000, 007, 1__0), whiteboard divided into zones int, float, str, bool, NoneType and Invalid, student laptops with a browser-based Python interpreter if available",
   "steps": [
    "Hand each group of three a stack of sticky notes.",
    "Groups place each note in a zone on the whiteboard, discussing any disagreement before placing it.",
    "If laptops are available, groups test five of their placements with type() and move any that were wrong.",
    "The teacher reviews each zone with the class, pausing on 2e3, 'True', 007 and 1__0 to name the rule each one tests."
   ]
  },
  "discussion": [
   "Why would a language need both an int type and a float type?",
   "When might storing digits as a string be the right choice?",
   "Why might it be useful that True behaves like 1 in arithmetic, and when could that cause confusion?"
  ],
  "exit": [
   [
    "What is the type of 2E2 and what does print(2E2) show?",
    "float; it prints 200.0."
   ],
   [
    "Is 1_000_000 a valid literal? What is its value?",
    "Yes; single underscores between digits are allowed, and it equals the int 1000000."
   ],
   [
    "What does \"5\" * 2 produce?",
    "The string \"55\", because the literal \"5\" is a str and * replicates it."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a one-page clue sheet (digits only means int, point or e means float, quotes mean str, capital True or False means bool) and start them with only the clearly valid literals.",
   "Extend: Ask fast finishers to write five tricky literals of their own, at least two of them invalid, and challenge another group to classify them."
  ]
 },
 {
  "t": "Binary, octal and hexadecimal integer literals (0b, 0o, 0x)",
  "objectives": [
   "Students will be able to convert small binary, octal and hexadecimal literals to decimal by hand.",
   "Students will be able to write integer literals with the correct 0b, 0o and 0x prefixes and identify invalid ones.",
   "Students will be able to explain that bin(), oct() and hex() return strings while int(text, base) returns an int.",
   "Students will be able to predict the printed result of expressions that mix prefixed literals."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how many fingers a cartoon character with four fingers per hand would count on before carrying, and connect it to bases other than ten."
   ],
   [
    12,
    "Teach",
    "Show place values for base 2, 8 and 16 on the board. Convert 0b1010, 0o17 and 0xFF step by step. Run print(0xFF), hex(255) and int(\"ff\", 16) on the projector and point out which results are strings."
   ],
   [
    18,
    "Activity",
    "Run the base relay race. Keep score on the board and check each answer aloud with the class."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions about why hexadecimal is popular and why the result prints in decimal."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a slip of paper."
   ]
  ],
  "warmup": "If a character had only eight fingers in total, how might they write the number we call ten?",
  "activity": {
   "title": "Base relay race",
   "materials": "Whiteboard split into team columns, markers, printed cards each showing one literal or conversion task (for example 0b1101, 0o21, 0x2A, hex(42), int(\"77\", 8), 0b102)",
   "steps": [
    "Divide the class into teams of four and line them up facing the whiteboard.",
    "The first student in each line draws a card, writes the decimal value or the exact result on the board, or writes Invalid with a reason, then passes the marker on.",
    "Teammates may correct a previous answer instead of drawing a new card, which costs that turn.",
    "After ten minutes the teacher reviews each card with the class, highlighting results that are strings and literals that are invalid."
   ]
  },
  "discussion": [
   "Why do programmers prefer hexadecimal over binary for long bit patterns?",
   "Why does Python print prefixed literals in decimal by default?",
   "Where outside programming have you seen hexadecimal or octal values?"
  ],
  "exit": [
   [
    "What does print(0o10 + 0x10 + 0b10) output?",
    "26, because 0o10 is 8, 0x10 is 16 and 0b10 is 2."
   ],
   [
    "What is the type of hex(31)?",
    "str; it returns '0x1f'."
   ],
   [
    "Is 0b21 valid? Why?",
    "No. Binary literals may contain only the digits 0 and 1, so it is a SyntaxError."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a place-value table with columns already labeled for each base and let them convert only binary and hexadecimal at first.",
   "Extend: Ask fast finishers to convert a color such as 0x33CC99 into its three decimal components and explain why one byte is always two hex digits."
  ]
 },
 {
  "t": "Variables and naming rules, reserved keywords and PEP 8 naming conventions",
  "objectives": [
   "Students will be able to determine whether a given identifier is legal and explain the rule any illegal one breaks.",
   "Students will be able to distinguish legal names from names that follow PEP 8 conventions for variables, constants and classes.",
   "Students will be able to explain what shadowing a built-in name means and predict the resulting error.",
   "Students will be able to trace multiple assignment, chained assignment and the a, b = b, a swap."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the names 2nd_order, order-total, sum, MAX_SIZE and BankAccount, and ask students to vote on which ones Python would accept."
   ],
   [
    12,
    "Teach",
    "Cover the naming rules, case sensitivity, keywords versus built-in names, and PEP 8 conventions. Demonstrate sum = 0 followed by sum([1, 2]) on the projector and read the TypeError aloud. Finish with a, b = b, a and explain that the right side is built first."
   ],
   [
    15,
    "Activity",
    "Run the name court role-play. Remind judges to give a reason with every ruling."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, steering toward the difference between what the interpreter enforces and what teams agree on."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Which of these names would Python accept: 2nd_order, order-total, sum, MAX_SIZE, BankAccount? Vote with a show of hands for each.",
  "activity": {
   "title": "Name court",
   "materials": "Printed cards each showing one candidate name and its intended use (for example \"_count, a counter\", \"While, a loop flag\", \"Price, a variable\", \"tax rate, a constant\", \"list, a shopping list\"), three signs reading Illegal, Legal but not PEP 8, and Good PEP 8 name",
   "steps": [
    "Split the class into groups of three: a prosecutor, a defender and a judge, rotating roles for each card.",
    "The prosecutor argues what is wrong with the name, the defender argues that it is acceptable, and the judge rules by placing the card under one of the three signs with a one-sentence reason.",
    "For every card not ruled Good, the group writes a corrected name on the back.",
    "The teacher reviews contested cards with the class, especially While, list and names with hyphens or spaces."
   ]
  },
  "discussion": [
   "Why does Python allow you to reassign a built-in name like sum instead of forbidding it?",
   "If the interpreter does not enforce PEP 8, why do teams care about it?",
   "How does dynamic typing make naming more important?"
  ],
  "exit": [
   [
    "Which of these are legal: _x, x_1, 1_x, x-1, While?",
    "_x, x_1 and While are legal; 1_x starts with a digit and x-1 contains a hyphen."
   ],
   [
    "After a, b = 3, 5 and then a, b = b, a, what are a and b?",
    "a is 5 and b is 3, because the right-hand tuple is built before either name changes."
   ],
   [
    "Which PEP 8 style suits a function name: calcTotal, calc_total or CalcTotal?",
    "calc_total, because functions and variables use snake_case."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a checklist of the four legal rules (no leading digit, only letters, digits and underscores, not a keyword, case matters) to tick for each card.",
   "Extend: Ask fast finishers to write a short snippet that shadows a built-in, predict the error, and then explain how they would detect the problem in someone else's code."
  ]
 },
 {
  "t": "Numeric operators: ** * / % // + - and the difference between / and //",
  "objectives": [
   "Students will be able to predict the value and type produced by +, -, *, /, //, % and ** for int and float operands.",
   "Students will be able to explain why // rounds toward negative infinity and how that differs from int() truncation.",
   "Students will be able to compute % with negative operands using the rule (a // b) * b + (a % b) == a.",
   "Students will be able to apply // and % to everyday problems such as splitting minutes into hours and minutes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if 7 cookies are shared between 2 friends, how many does each get and how many are left? Write 7 / 2, 7 // 2 and 7 % 2 next to the answers."
   ],
   [
    12,
    "Teach",
    "Go through each operator and the type rule, emphasizing that / always returns a float. Draw a number line and show where -3.5 rounds down to with //. Derive -7 % 2 from the guarantee rule and show 7 % -2."
   ],
   [
    15,
    "Activity",
    "Run the number line challenge. Ask pairs to show their number line drawing for every negative case."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, linking // and % to clocks, calendars and change-making."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Seven cookies, two friends: how many cookies does each friend get, and how many are left over? Now write that with Python operators.",
  "activity": {
   "title": "Number line challenge",
   "materials": "Whiteboard with a large number line from -10 to 10, printed cards with expressions such as -9 // 4, -9 % 4, 7 % -2, 7.5 // 2, 2 ** -2 and 6 / 3, mini whiteboards or scrap paper for each pair",
   "steps": [
    "Pairs draw a card and write the predicted value and type, showing the true quotient and where it lands on the number line for any // or % case.",
    "Pairs check their % answers with the guarantee rule (a // b) * b + (a % b) == a and correct any mismatch.",
    "Each pair marks one result on the class number line and explains it in one sentence.",
    "The teacher reveals answers, running a few in a projected interpreter to confirm both value and type."
   ]
  },
  "discussion": [
   "Why might Python designers have chosen to round // toward negative infinity instead of toward zero?",
   "Where in everyday life do you use remainders without noticing?",
   "Why does it matter whether a result is 3 or 3.0 if they compare equal?"
  ],
  "exit": [
   [
    "What do 9 / 3 and 9 // 3 return?",
    "9 / 3 returns 3.0 (float) and 9 // 3 returns 3 (int)."
   ],
   [
    "What is -9 % 4?",
    "3, because -9 // 4 is -3 and -3 x 4 + 3 = -9."
   ],
   [
    "How would you split 135 minutes into hours and minutes with Python operators?",
    "135 // 60 gives 2 hours and 135 % 60 gives 15 minutes."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle positive-only cards first and a printed number line, then introduce one negative case with the teacher at their table.",
   "Extend: Ask fast finishers to write an expression that converts a number of seconds into hours, minutes and seconds using only // and %, and test it on 3725."
  ]
 },
 {
  "t": "String operators (+ and *), assignment and compound assignment operators (+=, *=, etc.)",
  "objectives": [
   "Students will be able to predict the result of string concatenation with + and replication with *.",
   "Students will be able to identify expressions that raise TypeError because of mismatched operand types and fix them with str() or int().",
   "Students will be able to rewrite x = x op y as a compound assignment and evaluate it, remembering that the right side is evaluated first.",
   "Students will be able to explain why Python has no ++ operator and what x += 1 does instead."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write \"4\" + \"4\", 4 + 4, \"4\" * 4 and 4 * 4 on the board and ask students to predict each result."
   ],
   [
    10,
    "Teach",
    "Explain concatenation and replication, the strict type rules and the fixes with str(). Then cover = versus ==, chained and multiple assignment, and the compound operators, demonstrating x *= 2 + 3 on the projector."
   ],
   [
    18,
    "Activity",
    "Run the receipt builder activity. Circulate and ask pairs to state the type of each operand before they write a line."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions to connect immutability and compound assignment."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Predict the results: \"4\" + \"4\", 4 + 4, \"4\" * 4 and 4 * 4. Which one surprises you?",
  "activity": {
   "title": "Receipt builder",
   "materials": "Printed target receipt (a border of dashes, a title line, three item lines and a total), scrap paper, student laptops with a browser-based Python interpreter if available",
   "steps": [
    "Pairs write, on paper, Python statements that would print the target receipt using string + and *, str() conversions and at least two compound assignments to build the total.",
    "Pairs trade papers and act as the interpreter, writing the exact output the other pair's code would produce, including any TypeError.",
    "Pairs fix any errors on their own code and, if laptops are available, run it to confirm.",
    "The teacher collects two contrasting solutions and projects them, pointing out where + needed str() and where a compound operator kept the code shorter."
   ]
  },
  "discussion": [
   "Why do you think Python refuses to guess when you write \"Age: \" + 30?",
   "What are the benefits of writing total += price instead of total = total + price?",
   "Why might a language designer leave out ++?"
  ],
  "exit": [
   [
    "What does print(\"=\" * 0 + \"x\") show?",
    "x, because replicating by zero gives an empty string."
   ],
   [
    "If a = 3 and you run a **= 1 + 1, what is a?",
    "9, because the right side 1 + 1 is evaluated first and then a = a ** 2."
   ],
   [
    "Why does \"Total: \" + 5 fail, and how do you fix it?",
    "+ cannot join a str and an int, so Python raises TypeError; use \"Total: \" + str(5)."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a two-column card listing str + str, str * int and their results, and have them label each operand's type before predicting any output.",
   "Extend: Ask fast finishers to center a word inside a line of 20 dashes using only replication, concatenation and len(), then explain how they handled words of odd length."
  ]
 },
 {
  "t": "Operator priority and binding, including right-to-left ** and unary minus",
  "objectives": [
   "Students will be able to list the priority levels of Python operators covered by the PCEP exam, from ** down to or.",
   "Students will be able to apply the right-to-left binding of ** to stacked exponents.",
   "Students will be able to evaluate expressions that combine unary minus with **.",
   "Students will be able to evaluate a dense mixed expression step by step, recording each intermediate result."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write -2 ** 2 and 2 ** 3 ** 2 on the board and take a quick vote on each result."
   ],
   [
    12,
    "Teach",
    "Present the priority table from highest to lowest and the left-to-right default. Show why 2 ** 3 ** 2 is 512 and why -2 ** 2 is -4, then work through 2 + 3 * 4 ** 2 and 1 + 2 < 4 and not 0 in passes on the board."
   ],
   [
    15,
    "Activity",
    "Run the sticky-note expression unpacking. Check that each group's notes follow the priority order."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, focusing on when to add parentheses in real code."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Vote: is -2 ** 2 equal to 4 or -4? Is 2 ** 3 ** 2 equal to 64 or 512?",
  "activity": {
   "title": "Expression unpacking with sticky notes",
   "materials": "Sticky notes, whiteboard, printed cards with dense expressions such as 17 % 5 * 2 // 3, -3 ** 2 + 1, 2 ** 2 ** 3 and 10 - 2 * 3 // 4",
   "steps": [
    "Groups of three draw an expression card and copy it onto the whiteboard.",
    "For each operation performed, the group writes the sub-result on a sticky note and places it over the part it replaces, in priority order.",
    "Another group checks the sequence of notes and challenges any step taken out of order.",
    "The teacher confirms each final answer with a projected interpreter and highlights any step where right-to-left binding or unary minus mattered."
   ]
  },
  "discussion": [
   "Why does Python treat ** differently from the other arithmetic operators?",
   "Should you rely on priority rules or add parentheses in your own code? Why?",
   "How would you explain -2 ** 2 to someone who learned that a negative number squared is positive?"
  ],
  "exit": [
   [
    "What does print(-3 ** 2) output?",
    "-9, because 3 ** 2 is evaluated before the unary minus."
   ],
   [
    "What is 2 ** 2 ** 3?",
    "256, because ** binds right to left: 2 ** (2 ** 3) = 2 ** 8."
   ],
   [
    "Evaluate 12 / 2 * 3.",
    "18.0, because / and * share a level and bind left to right."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a printed priority ladder to keep beside them and start them on expressions with only two operators.",
   "Extend: Ask fast finishers to write an expression whose value changes in three different ways depending on where parentheses are added, and list all three results."
  ]
 },
 {
  "t": "Bitwise operators: ~ & ^ | << >>",
  "objectives": [
   "Students will be able to compute &, | and ^ for small integers by aligning their binary forms.",
   "Students will be able to apply the rule ~x == -x - 1 to find bitwise negation.",
   "Students will be able to compute << and >> as multiplication and floor division by powers of two.",
   "Students will be able to choose the operator that tests, sets, clears or toggles a chosen bit."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask four students to stand and each hold a card showing 0 or 1, forming the number 6. Ask the class what number the row shows."
   ],
   [
    12,
    "Teach",
    "Work 6 & 3, 6 | 3 and 6 ^ 3 column by column on the board. Introduce ~x == -x - 1 with ~6 and ~0. Show shifts as doubling and halving. Finish with the four mask patterns: test with &, set with |, clear with & ~, toggle with ^."
   ],
   [
    15,
    "Activity",
    "Run the human bits activity. Have the class call out each column's result before the students flip their cards."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions and connect the mask patterns to permissions and settings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Four classmates hold cards reading 0, 1, 1, 0. What number does that row represent in binary?",
  "activity": {
   "title": "Human bits",
   "materials": "Printed cards with 0 on one side and 1 on the other (eight per team), whiteboard, printed operation cards such as 12 & 10, 12 | 10, 12 ^ 10, 5 << 1, 13 >> 2 and ~5",
   "steps": [
    "Two rows of four students form the two operands with their cards while the rest of the team acts as operators.",
    "The operators draw an operation card and announce the rule; a third row of students shows the result bit by bit, flipping cards column by column.",
    "The team converts the result row to decimal and writes it on the board next to the operation.",
    "For ~ and shift cards, the team writes the shortcut rule (-x - 1, multiply or floor-divide by a power of two) and checks that it gives the same answer."
   ]
  },
  "discussion": [
   "Why might a program store many yes-or-no settings in one integer instead of many variables?",
   "What goes wrong if you use ^ when you meant to clear a bit?",
   "How would you explain to a classmate why ~5 is -6?"
  ],
  "exit": [
   [
    "What is 5 ^ 3?",
    "6, because 101 XOR 011 is 110."
   ],
   [
    "What does ~5 return?",
    "-6, because ~x equals -x - 1."
   ],
   [
    "Which statement clears the bit worth 4 in flags, whatever its current value?",
    "flags &= ~4."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a printed grid with columns labeled 8, 4, 2 and 1 for lining up binary digits, and start them on & and | only.",
   "Extend: Ask fast finishers to write the four mask statements for the bit worth 16 and trace each on flags = 0b10101."
  ]
 },
 {
  "t": "Boolean and relational operators, float accuracy and rounding surprises",
  "objectives": [
   "Students will be able to evaluate relational and chained comparisons, including comparisons between strings.",
   "Students will be able to apply the priority of not, and and or relative to comparisons.",
   "Students will be able to explain why comparing float results with == can fail and write a tolerance comparison instead.",
   "Students will be able to predict the results of round() with exact halves and of int() on floats."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to add 1/3 + 1/3 + 1/3 using the decimal 0.333 and say whether the answer equals 1."
   ],
   [
    12,
    "Teach",
    "Cover the six comparison operators, string ordering and chained comparisons. Show not, and and or with their priority. Run 0.1 + 0.2 == 0.3 on the projector, explain binary representation in plain terms, and demonstrate the tolerance test and round(2.5)."
   ],
   [
    15,
    "Activity",
    "Run the true-or-false showdown. Pause on every card where more than a third of the class was wrong."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to connect float error to money and measurement."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Using 0.333 for one third, what is 0.333 + 0.333 + 0.333? Does it equal 1?",
  "activity": {
   "title": "True-or-false showdown",
   "materials": "Printed expression cards (for example 3 < 5 > 4, \"B\" < \"a\", 0.1 + 0.2 == 0.3, round(4.5), not 1 == 2, \"10\" < \"9\", 1 == 1.0), each student has a True card and a False card, projector with an interpreter",
   "steps": [
    "The teacher shows one expression card at a time; for round() cards, students write the number on a mini whiteboard instead.",
    "On a count of three, every student raises True or False.",
    "A volunteer who answered correctly explains the rule in one sentence, and the teacher runs the expression on the projector to confirm.",
    "Pairs then write one new tricky expression of their own and test it on another pair."
   ]
  },
  "discussion": [
   "Why do banks and shops often store money as whole cents instead of floats?",
   "When is it safe to use == with numbers?",
   "Why might round-half-to-even be fairer than always rounding halves up when many values are added?"
  ],
  "exit": [
   [
    "What does print(3 < 5 > 4) output?",
    "True, because it means 3 < 5 and 5 > 4."
   ],
   [
    "What is round(4.5)?",
    "4, because exact halves round to the nearest even integer."
   ],
   [
    "How should you test whether a float total equals 0.3?",
    "Use a tolerance, such as abs(total - 0.3) < 1e-9, instead of ==."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a card summarizing the three surprises (float error, round half to even, string ordering by character) and let them check each answer against it.",
   "Extend: Ask fast finishers to write a loop that adds 0.1 ten times, print each value, and explain where the drift first appears."
  ]
 },
 {
  "t": "Type casting with int(), float(), str() and bool()",
  "objectives": [
   "Students will be able to predict the result of int(), float(), str() and bool() on common inputs.",
   "Students will be able to distinguish ValueError from TypeError in failed conversions.",
   "Students will be able to explain the truthiness rules that bool() applies, including non-empty strings such as \"False\".",
   "Students will be able to chain conversions, such as int(float(\"4.2\")), to reach the required type."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: what should int(3.9) be, and what should bool(\"False\") be? Record predictions on the board."
   ],
   [
    12,
    "Teach",
    "Walk through each conversion function with examples on the projector, stressing truncation toward zero and the rules for strings. Explain truthiness for bool(). Contrast ValueError and TypeError with int(\"ten\") and int(None)."
   ],
   [
    15,
    "Activity",
    "Run the conversion machine stations. Keep groups moving every three minutes."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, focusing on why Python refuses to convert between numbers and strings implicitly."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Predict: int(3.9), int(-3.9) and bool(\"False\"). Which do you feel least sure about?",
  "activity": {
   "title": "Conversion machine stations",
   "materials": "Four table stations labeled int(), float(), str() and bool(), each with a stack of printed input cards (for example \" 42 \", \"4.2\", 7.99, -3.9, True, None, \"\", \"0\", [ ]), answer sheets, a timer",
   "steps": [
    "Groups start at one station and, for each input card, write the result of that station's function or the exact error name.",
    "Every three minutes groups rotate to the next station until they have visited all four.",
    "Back at their seats, groups mark any answers where they wrote ValueError or TypeError and justify the choice using the rule acceptable type with bad content versus unsupported type.",
    "The teacher reveals answers on the projector, running the most disputed cases live."
   ]
  },
  "discussion": [
   "Why do you think Python never converts between strings and numbers automatically?",
   "When would truncation be the behavior you want, and when would rounding be better?",
   "How could a program safely turn a typed yes or no into a Boolean?"
  ],
  "exit": [
   [
    "What does int(-2.7) return?",
    "-2, because int() truncates toward zero."
   ],
   [
    "What is bool(\"0\")?",
    "True, because the string is not empty."
   ],
   [
    "Which error does float(\"12a\") raise, and why?",
    "ValueError: a string is an acceptable type, but its content is not a number."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle a two-row table showing falsy values (0, 0.0, \"\", empty collections, None) and a reminder that everything else is True, and let them work only the int() and bool() stations first.",
   "Extend: Ask fast finishers to write a short sequence of conversions that turns the text \" 19.99 \" into the int 19 and then into the text \"19 dollars\", naming the type after each step."
  ]
 },
 {
  "t": "Console I/O: print() with sep= and end=, input() returning a string, converting input to numbers",
  "objectives": [
   "Students will be able to predict the exact output of print() calls that use sep= and end=, including spaces and line breaks.",
   "Students will be able to explain that input() always returns a string and predict the effect of using that string in arithmetic.",
   "Students will be able to convert input to numbers with int() and float() and identify when ValueError results.",
   "Students will be able to identify invalid calls, such as keyword arguments before positional ones or input() with two arguments."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write print(\"a\", \"b\") and print(\"a\" + \"b\") on the board and ask students to write the exact output of each, marking spaces with a dot."
   ],
   [
    10,
    "Teach",
    "Explain print() defaults, sep and end, with live examples on the projector. Show input() returning a string by typing 5 and then running input() * 2. Demonstrate int(input()) and the ValueError when 3.5 is typed."
   ],
   [
    18,
    "Activity",
    "Run the be-the-console activity. Rotate roles after each script."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions to connect output formatting with user experience."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Write the exact output of print(\"a\", \"b\") and print(\"a\" + \"b\"), marking every space with a dot.",
  "activity": {
   "title": "Be the console",
   "materials": "Printed short scripts using print() with sep and end and simulated input() values, grid paper (one character per square), whiteboard",
   "steps": [
    "In groups of three, one student reads a script line by line, one plays the user and supplies the listed input values, and one plays the console, writing output on grid paper with one character per square.",
    "The group marks every space with a dot and every newline with an arrow, then compares its grid with the answer key the teacher reveals on the projector.",
    "Groups rotate roles and repeat with a new script, including at least one that raises an error the console must write instead of output.",
    "Each group writes one script for another group, designed to catch a common sep or end mistake."
   ]
  },
  "discussion": [
   "Why might Python designers have made input() always return a string instead of guessing the type?",
   "When would you use end=\"\" in a real program?",
   "How can careless spacing in output confuse a user even when the numbers are correct?"
  ],
  "exit": [
   [
    "What does print(1, 2, sep=\"\", end=\"3\") followed by print(4) display?",
    "1234 on one line, followed by a newline."
   ],
   [
    "If the user types 5, what does print(input() * 2) show?",
    "55, because input() returns the string \"5\" and * replicates it."
   ],
   [
    "What happens with int(input()) if the user types 7.0?",
    "ValueError, because int() cannot parse a string containing a decimal point."
   ]
  ],
  "differentiation": [
   "Support: Give students who struggle scripts that use only sep or only end at first, and let them use grid paper with the default space and newline already marked.",
   "Extend: Ask fast finishers to write a single print() call that outputs a three-line receipt using sep=\"\\n\" and a custom end, then predict and check its output."
  ]
 },
 {
  "t": "If, if-else and if-elif-else statements, and why the order of elif conditions matters",
  "objectives": [
   "Students will be able to write syntactically correct if, if-else and if-elif-else statements with proper colons and indentation.",
   "Students will be able to predict which single branch of an if-elif-else chain runs for a given input value.",
   "Students will be able to explain why overlapping elif conditions must be ordered from most to least restrictive and identify unreachable branches.",
   "Students will be able to compare the output of an elif chain with the output of separate if statements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question and ask students to answer on a sticky note before any discussion. Collect a few answers and note the disagreement without resolving it yet."
   ],
   [
    12,
    "Teach",
    "Build the grading example live: start with if, add else, then add elif branches. Say clearly: Python stops at the first true condition. Then reverse the order of the conditions and ask the class to trace a score of 95. Show the unreachable branches."
   ],
   [
    15,
    "Activity",
    "Run the Branch Order Sort activity in pairs. Circulate and ask each pair to explain why their order works for an edge value such as exactly 80."
   ],
   [
    8,
    "Discuss",
    "Bring pairs together. Compare an elif chain with separate if statements on the board using the value 30 kg. Use the discussion questions to draw out when order matters and when it does not."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in at the door."
   ]
  ],
  "warmup": "A program says: if speed > 50 print \"fast\", elif speed > 100 print \"very fast\". What does it print when speed is 120, and is that what the author wanted?",
  "activity": {
   "title": "Branch Order Sort",
   "materials": "Printed cards, each showing one line of a conditional (if, elif and else lines for a shipping or grading rule), a set of test values on a slip, and a whiteboard for each pair or a sheet of paper.",
   "steps": [
    "Give each pair a shuffled set of cards for one rule, for example freight over 20 kg, parcel over 5 kg, otherwise letter.",
    "Pairs arrange the cards into a working if-elif-else chain and write down the output for each test value: 30, 20, 6 and 2.",
    "Pairs then deliberately swap two elif cards, trace the same values again and circle any value that now gets the wrong result.",
    "Finally, pairs rewrite the chain as separate if statements and record how many lines each test value would print.",
    "Each pair writes one sentence rule about ordering overlapping conditions to share with the class."
   ]
  },
  "discussion": [
   "When does changing the order of elif branches make no difference to the output, and why?",
   "Is it better to rely on branch order or to write full ranges such as 80 <= score < 90? What are the trade-offs?",
   "Why might a bug caused by branch order survive testing for a long time?"
  ],
  "exit": [
   [
    "With x = 7, what does if x > 5: print(\"A\") elif x > 2: print(\"B\") else: print(\"C\") print?",
    "Only A, because the first true condition ends the chain."
   ],
   [
    "Rewrite the order of if age >= 13 / elif age >= 65 so that seniors are priced correctly.",
    "Test age >= 65 first, then elif age >= 13, because the narrower condition must come before the broader overlapping one."
   ],
   [
    "How many lines can a chain of separate if statements print compared with one if-elif-else chain?",
    "Separate ifs can print one line per true condition; an if-elif-else chain runs exactly one block."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a tracing table with columns for condition, true or false, and runs or skipped, and have them fill it in for one value at a time before attempting full chains.",
   "Extend: ask fast finishers to write a four-branch grading chain using chained comparisons, then find an input value that falls through a gap they accidentally left, such as exactly 90."
  ]
 },
 {
  "t": "Multiple conditions with and, or and not; truthy and falsy values",
  "objectives": [
   "Students will be able to classify common Python values as truthy or falsy.",
   "Students will be able to evaluate expressions that mix not, and and or using correct precedence.",
   "Students will be able to predict the operand returned by and and or, including short-circuit cases.",
   "Students will be able to identify and fix the x == a or b bug in a condition."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up and take a quick show of hands for each option. Leave the answer open and promise to settle it by the end of the teach segment."
   ],
   [
    12,
    "Teach",
    "Introduce and, or and not with everyday examples, then the precedence order. List falsy values on the board. Demonstrate short-circuiting with print(0 and 5) and print(\"\" or \"guest\"), saying: the result is one of the operands, not always True or False."
   ],
   [
    15,
    "Activity",
    "Run the Truthy or Falsy Card Sort, then the Operand Relay. Circulate and ask students to justify the trickiest cards aloud."
   ],
   [
    8,
    "Discuss",
    "Walk through the library portal bug from the lesson hook: if role == \"admin\" or \"editor\":. Ask pairs to explain why it is always true and propose two fixes. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "Which of these will print yes: if \"0\": print(\"yes\"), if 0: print(\"yes\"), if [0]: print(\"yes\")? Decide before we run anything.",
  "activity": {
   "title": "Truthy or Falsy Card Sort and Operand Relay",
   "materials": "Printed cards each showing one value (0, \"0\", \"\", \" \", [], [0], None, -1, 0.0, {}, range(0), False), a second set of cards showing short expressions such as 0 and 5, \"\" or \"guest\", 1 or 2 and 0, and a whiteboard divided into truthy and falsy columns.",
   "steps": [
    "In small groups, students sort the value cards into truthy and falsy columns on the whiteboard and mark any card they disagreed about.",
    "The teacher reveals the correct sort and asks each group to explain one card they got wrong.",
    "Groups then draw expression cards one at a time and, as a relay, each member writes the exact value printed, not just True or False.",
    "For each expression, the group circles the operand where evaluation stopped to show short-circuiting.",
    "Groups finish by writing one rule for and and one for or in their own words."
   ]
  },
  "discussion": [
   "Why might Python's designers have chosen to return an operand from and and or instead of always returning True or False?",
   "When is using or to supply a default value convenient, and when could it hide a real input such as 0?",
   "How would you explain the x == 1 or 2 bug to someone who reads it as plain English?"
  ],
  "exit": [
   [
    "What does print(\"\" or 0) show?",
    "0, because neither operand is truthy, so or returns the last one."
   ],
   [
    "Evaluate True or False and False.",
    "True, because and is applied first, giving True or False, which is True."
   ],
   [
    "Fix the condition if color == \"red\" or \"blue\":.",
    "Write color == \"red\" or color == \"blue\", or color in (\"red\", \"blue\")."
   ]
  ],
  "differentiation": [
   "Support: provide a reference card listing every falsy value and the two rules (and returns the first falsy or last operand; or returns the first truthy or last operand), and let students use it during the relay.",
   "Extend: ask fast finishers to apply De Morgan's laws to rewrite not (age < 18 or banned) without the outer not, then test both versions with four combinations of inputs."
  ]
 },
 {
  "t": "Nested conditional statements and indentation",
  "objectives": [
   "Students will be able to trace nested if-else statements and predict their output for given variable values.",
   "Students will be able to determine which if an else belongs to by its indentation column.",
   "Students will be able to distinguish an IndentationError from a silent logic error caused by indentation.",
   "Students will be able to flatten a nested conditional into a single condition with and when it is safe to do so."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show two code snippets that differ only in the indentation of one else. Ask students whether they are the same program and to write down their reasoning."
   ],
   [
    12,
    "Teach",
    "Trace the ticket-pricing example with three different inputs. Draw the code as a tree on the board, with each indent level as a branch. Say: the column, not the order, tells you which if an else belongs to. Show an IndentationError and a silent logic error side by side."
   ],
   [
    15,
    "Activity",
    "Run the Indent Detective pair activity. Circulate and ask pairs to point to the exact column each else lines up with."
   ],
   [
    8,
    "Discuss",
    "Discuss the thermostat bug and when flattening with and is safe. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "These two programs use the same words in the same order, but one else is four spaces further left. Do they always print the same thing? Write yes or no and one sentence explaining why.",
  "activity": {
   "title": "Indent Detective",
   "materials": "Printed sheets with four short nested-if programs, each line on its own strip of paper so it can be moved, a ruler or the edge of a card for lining up columns, and colored pens.",
   "steps": [
    "Pairs receive one program and draw a vertical line at each indentation column with a colored pen.",
    "For each else, pairs draw an arrow to the if it belongs to and write down the output for two given sets of variable values.",
    "Pairs then slide one else strip left or right by one indent and trace the same values again, noting what changed.",
    "Pairs decide whether any of their programs could be safely flattened with and, and write the flattened version if so.",
    "Two pairs swap sheets and check each other's arrows and outputs."
   ]
  },
  "discussion": [
   "Why do you think Python uses indentation instead of braces to mark blocks? What are the advantages and risks?",
   "How deep should nesting go before you rewrite code? What would you do instead?",
   "Which is more dangerous in practice, an IndentationError or a misplaced else that still runs, and why?"
  ],
  "exit": [
   [
    "In if x > 0: (inner) if x > 10: print(\"big\") else: print(\"small\"), with else at the inner level, what prints for x = -5?",
    "Nothing. The outer condition is false, so the inner if and its else are skipped."
   ],
   [
    "How do you decide which if an else belongs to?",
    "Find the if at exactly the same indentation in the same block above it."
   ],
   [
    "Can if a: with an inner if b: and an inner else always be rewritten as if a and b:?",
    "No. The inner else does work that the flat version would lose; flattening is only safe without else or elif branches."
   ]
  ],
  "differentiation": [
   "Support: give students a template with the indentation columns already shaded in different colors, so each block is visually distinct, and have them trace one input at a time.",
   "Extend: ask fast finishers to rewrite a three-level nested conditional as a single if-elif-else chain and prove with four test values that both versions print the same output."
  ]
 },
 {
  "t": "The pass instruction as a placeholder body",
  "objectives": [
   "Students will be able to explain why Python requires a statement after every colon header and why a comment does not satisfy that rule.",
   "Students will be able to use pass to create valid stubs and intentionally empty branches.",
   "Students will be able to predict and compare the output of loops that use pass, continue and break in the same position."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a function whose body is only a comment and ask students to predict what happens when the file runs."
   ],
   [
    10,
    "Teach",
    "Run the comment-only function to show the IndentationError. Replace the comment with pass and run again. Say: pass is about syntax, not control flow. Then show the pass versus continue comparison and trace both outputs."
   ],
   [
    17,
    "Activity",
    "Run the Stub It Out activity. Pairs design a small program skeleton with pass, then complete the Same Spot, Different Word table."
   ],
   [
    8,
    "Discuss",
    "Discuss when silently ignoring an error with pass is acceptable and when it hides problems. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A file contains def greet(): followed by an indented comment that says to write this later, and nothing else in the function. What happens when you run the file, and why?",
  "activity": {
   "title": "Stub It Out, then Same Spot, Different Word",
   "materials": "Student laptops with a browser-based Python environment, or paper if no devices are available; a printed table with three columns labeled pass, continue and break; a whiteboard.",
   "steps": [
    "Pairs plan a tiny menu program for a school club (add member, remove member, list members) and write each function with a pass body plus a menu loop that calls them.",
    "Pairs run or desk-check the program to confirm it is valid and that each call returns None.",
    "On the printed table, pairs take the loop for i in range(5) with an if i == 2: line, and write the output when that if contains pass, continue and break in turn, with print(i) after the if.",
    "Pairs compare their three outputs with another pair and resolve any differences by tracing aloud.",
    "Each pair writes one sentence describing what pass does and one describing what it does not do."
   ]
  },
  "discussion": [
   "Why might a programmer prefer to write stubs with pass before writing any real code?",
   "Is it ever acceptable to use pass in an except block? What should you do if you choose to?",
   "Why is it useful that removing a pass from a block with other statements changes nothing?"
  ],
  "exit": [
   [
    "What error appears when an if block contains only a comment?",
    "IndentationError: expected an indented block, because comments are ignored and the block is empty."
   ],
   [
    "What does for i in range(3): if i == 1: pass, then print(i) at loop level, print?",
    "0, 1 and 2, because pass does nothing and print still runs every iteration."
   ],
   [
    "Give two legitimate uses of pass.",
    "Any two of: a stub function to be written later, an empty branch where a case needs no action, or an except block that deliberately ignores an error."
   ]
  ],
  "differentiation": [
   "Support: give students a card that shows the three keywords with a simple picture for each (a placeholder seat for pass, a skip arrow for continue, an exit door for break) to refer to while tracing.",
   "Extend: ask fast finishers to replace one pass stub with real code and write a short note on whether any other line of the program had to change, explaining why stubs make incremental development easier."
  ]
 },
 {
  "t": "While loops, loop conditions and avoiding infinite loops",
  "objectives": [
   "Students will be able to identify the initialization, condition and update parts of a while loop.",
   "Students will be able to count how many times a while loop's body and condition run by tracing variable values.",
   "Students will be able to diagnose why a given while loop is infinite and correct it.",
   "Students will be able to choose between a while loop and a for loop based on whether the number of iterations is known."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and have students write a number on a mini whiteboard or paper. Reveal the spread of answers without giving the correct one."
   ],
   [
    12,
    "Teach",
    "Trace the countdown example with a table of condition checks on the board. Label initialization, test and update. Show an infinite loop with `x != 10` and `x += 3`, and explain Ctrl+C and KeyboardInterrupt. Introduce while True with break for input validation."
   ],
   [
    15,
    "Activity",
    "Run Human Loop: students act as the Python interpreter for printed loops. Then pairs fix the broken loops on their cards."
   ],
   [
    8,
    "Discuss",
    "Return to the warm-up answer. Discuss the savings-plan zero deposit and how to guard against outside data stopping progress."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How many times is the word hi printed by: n = 1, then while n < 10: print(\"hi\"), n = n * 2? How many times is the condition checked?",
  "activity": {
   "title": "Human Loop and Loop Repair",
   "materials": "Printed loop cards (some correct, some infinite, some that run zero times), a large tracing table drawn on the whiteboard, sticky notes for variable values.",
   "steps": [
    "Three volunteers play roles: the condition checker, the body runner and the variable keeper, who holds a sticky note with the current value.",
    "The class reads a loop card aloud; the condition checker says true or false, the body runner performs the printed action, and the variable keeper writes the new value on a fresh sticky note.",
    "The class records each check in the tracing table and counts body runs and condition checks.",
    "In pairs, students take the remaining cards, mark each loop as finite, infinite or zero-iteration, and rewrite every infinite loop so it ends.",
    "Pairs present one repaired loop and explain which of initialization, test or update they changed."
   ]
  },
  "discussion": [
   "Why is a condition using < often safer than one using `!=` in a counting loop?",
   "When is while True with break clearer than putting the real condition in the header?",
   "How could a program protect itself if the value that drives a loop comes from a file or a user?"
  ],
  "exit": [
   [
    "How many times does the body of k = 10; while k > 0: k -= 4 run?",
    "3 times, with k equal to 10, 6 and 2 at the passing checks; k is -2 at the failing check."
   ],
   [
    "Why does `while n != 0: n -= 2` never end when n starts at 5?",
    "n takes 5, 3, 1, -1 and so on, skipping 0, so the condition never becomes false."
   ],
   [
    "Name the three parts every terminating while loop needs.",
    "Initialization before the loop, a condition in the header and an update inside the body that moves toward making the condition false."
   ]
  ],
  "differentiation": [
   "Support: give students a partly filled tracing table with columns for check number, variable value, condition result and output, and let them complete it for one loop before working alone.",
   "Extend: ask fast finishers to write a while loop that halves a number until it is below 1, predict the iteration count for a starting value of 100, then verify it in a browser-based Python environment."
  ]
 },
 {
  "t": "For loops over range() with start, stop and step, including negative steps and empty ranges",
  "objectives": [
   "Students will be able to list the values produced by range() with one, two or three arguments.",
   "Students will be able to write a range() call that produces a given sequence, including counting down with a negative step.",
   "Students will be able to identify empty ranges and explain why a loop over them runs zero times without error.",
   "Students will be able to distinguish the errors raised by a float argument and a zero step."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Students write the values they think range(2, 10, 3) produces. Collect answers on the board."
   ],
   [
    12,
    "Teach",
    "Draw a number line and walk through range(stop), range(start, stop) and range(start, stop, step), marking the stop with an open circle to show it is excluded. Show the countdown bug with range(10, 0). Demonstrate TypeError for a float and ValueError for a zero step."
   ],
   [
    15,
    "Activity",
    "Run Range Match: pairs match range() calls to number-line sequences and identify the empty ones."
   ],
   [
    8,
    "Discuss",
    "Discuss off-by-one errors and why empty ranges are silent. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Without running anything, write down every number range(2, 10, 3) produces. Is 10 included? Why or why not?",
  "activity": {
   "title": "Range Match",
   "materials": "Two sets of printed cards: one with range() calls (including some empty ranges and some with negative steps), one with number sequences and a card marked empty; a whiteboard number line from -5 to 12.",
   "steps": [
    "Pairs receive both card sets shuffled and match each range() call to its sequence, using the empty card for ranges that produce nothing.",
    "For each negative-step card, pairs draw arrows on the number line showing direction and mark the excluded stop with an open circle.",
    "Pairs then receive three target sequences, such as 5, 3, 1 and 0 through 10 inclusive, and write their own range() call for each.",
    "Pairs swap target answers with a neighbor, who checks each call by writing out its values term by term.",
    "The class reviews the empty-range cards together and states the rule for when a range is empty."
   ]
  },
  "discussion": [
   "Why might Python's designers have chosen to exclude the stop value? How does that help with range(len(seq))?",
   "Why do you think an empty range is not treated as an error? When could that be dangerous?",
   "How would you check that a countdown loop really includes its last number before a demonstration?"
  ],
  "exit": [
   [
    "What does list(range(10, 3, -3)) give?",
    "[10, 7, 4], because the next value, 1, would pass the stop of 3."
   ],
   [
    "Write a range() call that produces 1, 2, 3, 4, 5.",
    "range(1, 6)."
   ],
   [
    "How many times does for i in range(7, 7): print(i) run, and why?",
    "Zero times; start equals stop, so the range is empty and no error is raised."
   ]
  ],
  "differentiation": [
   "Support: let students use a printed number line and physically step a counter along it, saying each value aloud, and stop before touching the stop mark.",
   "Extend: ask fast finishers to derive a rule for the number of values in range(start, stop, step) with a negative step, test it on three examples, and compare with len() in a browser-based Python environment."
  ]
 },
 {
  "t": "Iterating over strings, lists and other sequences with for",
  "objectives": [
   "Students will be able to predict the items produced by a for loop over a string, list, tuple or dictionary.",
   "Students will be able to use the accumulator pattern correctly, initializing before the loop and updating inside it.",
   "Students will be able to explain why rebinding the loop variable does not change the list and modify a list in place using indexes.",
   "Students will be able to read and write loops using both range(len(seq)) and enumerate()."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up snippet and ask students to predict the printed list. Take a vote between the two most common answers."
   ],
   [
    12,
    "Teach",
    "Show loops over a string, a list and a dictionary. Introduce enumerate() next to range(len()). Demonstrate the accumulator pattern with the vowel counter, then move the initialization inside the loop and show the wrong result. Explain rebinding versus assigning through an index."
   ],
   [
    15,
    "Activity",
    "Run Paper Pile Loop and the Accumulator Bug Hunt in small groups."
   ],
   [
    8,
    "Discuss",
    "Revisit the warm-up answer. Discuss when to loop over items and when over indexes. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "nums = [1, 2, 3], then for n in nums: n = n + 10, then print(nums). What is printed?",
  "activity": {
   "title": "Paper Pile Loop and Accumulator Bug Hunt",
   "materials": "Index cards, each with one letter or number written on it, a sticky note to act as the loop variable, a whiteboard for the accumulator, and printed snippets of three buggy counting loops.",
   "steps": [
    "One group lays out cards spelling a short word; a student acts as the loop, picking up one card at a time and copying its value onto the sticky note, while another updates a vowel count on the whiteboard.",
    "The group repeats the walk-through, but this time the whiteboard count is erased at the start of every iteration, and they record the final value.",
    "Groups receive the three buggy snippets (accumulator reset inside the loop, accumulator never initialized, loop variable rebinding expected to change a list) and label each bug and its symptom.",
    "Groups rewrite each snippet correctly, using enumerate() at least once.",
    "Each group presents one bug and fix to the class."
   ]
  },
  "discussion": [
   "Why is looping directly over items often safer than looping over indexes?",
   "What problems can appear if you add or remove list items while looping over the same list?",
   "Why do strings force you to build a new string instead of changing characters in place?"
  ],
  "exit": [
   [
    "How many times does for ch in \"a b\": run its body?",
    "Three times; the space is a character too."
   ],
   [
    "Where should total = 0 go in a loop that sums a list, and why?",
    "Before the loop, so it is set once; inside the loop it would be reset each iteration."
   ],
   [
    "After for i, v in enumerate([\"x\", \"y\"]): print(i, v), what is printed?",
    "0 x on the first line and 1 y on the second."
   ]
  ],
  "differentiation": [
   "Support: give students a two-column trace sheet (loop variable, accumulator) to fill in for each iteration of a short loop before predicting output.",
   "Extend: ask fast finishers to write a loop that builds a new string containing only the consonants of a word, preserving their order, without using any indexes."
  ]
 },
 {
  "t": "Break and continue, and how break affects only the innermost loop",
  "objectives": [
   "Students will be able to explain the difference between break and continue and predict the output of loops that use them.",
   "Students will be able to trace nested loops in which break or continue affects only the innermost loop.",
   "Students will be able to use a flag variable or return to stop an outer loop.",
   "Students will be able to identify a while loop made infinite by an update placed after continue."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the nested loop with break when j == 1 and ask students how many lines it prints. Record answers."
   ],
   [
    12,
    "Teach",
    "Trace the single loop that uses both continue and break. Then trace the nested example on the board, drawing a box around the inner loop and saying: break only leaves this box. Show the flag pattern and the continue-before-update trap in a while loop."
   ],
   [
    15,
    "Activity",
    "Run Floor and Room Search, a role-play of nested loops with break and continue, followed by pair tracing of printed snippets."
   ],
   [
    8,
    "Discuss",
    "Discuss the seat finder bug and the choice between a flag and return. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "for i in range(3): for j in range(3): if j == 1: break, print(i, j). How many lines are printed, and what are they?",
  "activity": {
   "title": "Floor and Room Search",
   "materials": "Sticky notes labeled with floor and room numbers placed around the classroom (three floors of four rooms), a few marked key found or locked, a whiteboard for the trace, and printed nested-loop snippets.",
   "steps": [
    "A volunteer walks the floors in order as the outer loop and the rooms on each floor as the inner loop, saying each floor and room number aloud while a scribe records them on the whiteboard.",
    "On a locked room the volunteer says continue and moves to the next room; on key found the volunteer says break and leaves that floor only.",
    "The class observes that the walker still goes to the next floor after break, then adds a flag rule: after each floor, check whether the key was found and stop if so.",
    "In pairs, students trace three printed snippets and count printed lines, including one while loop where the update comes after continue.",
    "Pairs fix the while loop and explain their change to a neighboring pair."
   ]
  },
  "discussion": [
   "Why do you think Python does not have a labeled break that can leave several loops at once?",
   "When is a flag variable clearer than putting the loops in a function and using return, and when is the reverse true?",
   "Could you always rewrite a loop that uses continue with an if instead? Which version is easier to read?"
  ],
  "exit": [
   [
    "What does for n in range(6): if n == 4: break, if n % 2: continue, print(n) print?",
    "0 and 2. Odd numbers are skipped by continue, and the loop stops at 4 before printing it."
   ],
   [
    "A break runs inside an inner loop. Does the outer loop stop?",
    "No. Only the innermost loop is exited; the outer loop continues with its next iteration."
   ],
   [
    "Why might a while loop with continue never end?",
    "If the counter update comes after continue, it is skipped, so the condition keeps seeing the same value."
   ]
  ],
  "differentiation": [
   "Support: give students colored highlighters to box each loop in a different color, then mark break and continue with the color of the loop they affect before tracing.",
   "Extend: ask fast finishers to rewrite the seat finder twice, once with a flag and once as a function using return, and compare which is shorter and easier to test."
  ]
 },
 {
  "t": "While-else and for-else: when the else clause runs and when break skips it",
  "objectives": [
   "Students will be able to state when a loop's else clause runs and when it is skipped.",
   "Students will be able to predict output for for-else and while-else code that includes break, continue and empty sequences.",
   "Students will be able to distinguish a loop-level else from an if-level else by indentation.",
   "Students will be able to rewrite a search loop that uses a flag variable as a loop with an else clause."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up code and ask students whether the word done appears. Most will say no; leave the question open."
   ],
   [
    12,
    "Teach",
    "Introduce the rule: else after a loop means no break. Trace the even-number search, the empty loop and a loop with continue. Then show the login script with the else at loop level and at if level, and trace both with a wrong-then-right password sequence."
   ],
   [
    15,
    "Activity",
    "Run Break or No Break, a card-based prediction game, then pairs convert a flag-based search into loop-else."
   ],
   [
    8,
    "Discuss",
    "Return to the warm-up and resolve it. Use the discussion questions about readability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "for x in []: print(x), then at loop level else: print(\"done\"). Does done appear? Write yes or no and one reason.",
  "activity": {
   "title": "Break or No Break",
   "materials": "Printed cards, each showing a short loop with an else clause (some with break, some with continue, some empty, one with else at the if level), paper answer sheets, and a whiteboard scoreboard.",
   "steps": [
    "In teams, students draw a card and decide whether the else text is printed, writing the full output on their answer sheet.",
    "For each card, teams must name the reason: break ran, loop finished normally, loop was empty, or else belongs to an if.",
    "The teacher reveals answers and teams score a point for each correct output and reason.",
    "Pairs then receive a search loop that uses found = False, found = True and if not found:, and rewrite it using for-else.",
    "Pairs test both versions by tracing a list that contains the target and one that does not."
   ]
  },
  "discussion": [
   "Many programmers find loop-else confusing. Would you use it in your own code or prefer a flag variable, and why?",
   "Why do you think Python's designers attached else to loops at all?",
   "How can indentation alone turn a correct loop-else into a bug that runs on every iteration?"
  ],
  "exit": [
   [
    "for n in [1, 3, 5]: if n == 4: break, then else: print(\"none\"). What prints?",
    "none, because 4 is never found, so break never runs and the loop ends normally."
   ],
   [
    "Does a while loop's else run if the condition is false the first time?",
    "Yes. The loop ends normally after zero iterations, so the else runs."
   ],
   [
    "Which statement inside a loop causes its else to be skipped?",
    "break (leaving through return or an unhandled exception also skips it); continue does not."
   ]
  ],
  "differentiation": [
   "Support: give students a one-question checklist to apply after every loop, did break run, with a yes-skip and no-run flowchart printed on a card.",
   "Extend: ask fast finishers to write nested loops where the inner loop breaks but the outer loop's else still runs, and explain the output line by line."
  ]
 },
 {
  "t": "Nested loops and counting iterations",
  "objectives": [
   "Students will be able to explain that the inner loop runs completely for every outer iteration.",
   "Students will be able to count inner-body executions by multiplying for independent ranges and summing for dependent ranges.",
   "Students will be able to predict how break in an inner loop changes iteration counts without affecting the outer loop.",
   "Students will be able to identify which loop a statement belongs to by its indentation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students write their count on scrap paper."
   ],
   [
    12,
    "Teach",
    "Trace the multiplication table, then move the bare print() one level to the right and ask what changes. Build a table of outer value against inner count for range(4) with range(i). Show the n x (n + 1) / 2 shortcut. Demonstrate a break in the inner loop."
   ],
   [
    15,
    "Activity",
    "Run Seat Label Count in small groups using a grid of sticky notes, then a counting worksheet."
   ],
   [
    8,
    "Discuss",
    "Discuss the cost of nested loops on large data and the inner while reset trap. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "for i in range(5): for j in range(2): print(\"x\"). How many x characters are printed? Now change range(2) to range(i). How many now?",
  "activity": {
   "title": "Seat Label Count",
   "materials": "A grid of sticky notes on the whiteboard (5 rows labeled A to E, 10 seats each), markers, and a printed worksheet of six nested-loop snippets with mixed independent and dependent ranges.",
   "steps": [
    "Groups act out the seat-label loops: one student walks the rows (outer loop), another touches each sticky note in the row (inner loop), and a third tallies label prints.",
    "The teacher announces that seats 9 and 10 in rows D and E are closed; groups add a break rule and recount, recording the new tally.",
    "Groups complete the worksheet, building an outer value against inner count table for each snippet before writing the total.",
    "Groups circle any snippet where multiplying would give the wrong answer and explain why.",
    "Groups compare totals with another group and resolve any differences by retracing."
   ]
  },
  "discussion": [
   "Why does nesting loops over large lists slow programs down so quickly?",
   "How can you tell at a glance whether you are allowed to multiply to count iterations?",
   "When would you use string repetition instead of a second loop to print a pattern?"
  ],
  "exit": [
   [
    "How many times does the inner body run in for i in range(2, 5): for j in range(3):?",
    "9 times, because the outer loop runs 3 times and the inner loop runs 3 times each pass."
   ],
   [
    "How many times does the inner body run in for i in range(4): for j in range(i, 4):?",
    "4 + 3 + 2 + 1 = 10 times."
   ],
   [
    "In nested for loops, if the inner loop breaks when j == 1 on every pass and the outer loop runs 4 times, how many times does the outer loop run?",
    "Still 4 times; break only affects the inner loop."
   ]
  ],
  "differentiation": [
   "Support: give students a pre-drawn table with rows for each outer value and a column for the inner count, and let them fill it in by listing the inner range values.",
   "Extend: ask fast finishers to write a nested loop that prints every pair (i, j) with i < j from range(5), predict the number of pairs using a formula, and check it."
  ]
 },
 {
  "t": "The value of the loop variable after a for loop ends",
  "objectives": [
   "Students will be able to state the value of a for loop variable after the loop ends normally, after break, and after an empty loop.",
   "Students will be able to contrast the final value of a for loop variable with the final value of a while loop counter.",
   "Students will be able to predict the effect of assigning to the loop variable inside the loop body.",
   "Students will be able to explain why the leftover loop variable is not a reliable not-found indicator in a search."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up snippet and collect predictions: 4, 5 or an error."
   ],
   [
    12,
    "Teach",
    "Trace for i in range(5) and the equivalent while loop side by side in two columns on the board. Show break freezing the variable and the empty-loop NameError. Demonstrate that assigning inside the body only sticks after the final iteration."
   ],
   [
    15,
    "Activity",
    "Run Last Value Standing, a tracing card game in pairs, then fix the inventory search bug."
   ],
   [
    8,
    "Discuss",
    "Discuss why other languages make loop variables local and how that affects reading Python code. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "for i in range(5): pass, then print(i). Does this print 4, 5, or an error? Write your answer and one reason.",
  "activity": {
   "title": "Last Value Standing",
   "materials": "Printed cards each showing a loop followed by a print of the loop variable (normal end, break, empty range, assignment in the body, while counter), blank tracing sheets, and the printed inventory search script.",
   "steps": [
    "Pairs take turns drawing a card; one partner traces the loop variable column on the sheet while the other predicts the printed value.",
    "Partners swap roles for each card and keep score of correct predictions.",
    "Pairs sort the cards into four piles: last range value, value at break, unchanged or NameError, and while counter past the stop.",
    "Pairs read the inventory search script, find the input that makes it report the wrong item, and rewrite it with for-else.",
    "Two pairs compare their fixed scripts and test them with a list that contains the target, one that does not, and an empty list."
   ]
  },
  "discussion": [
   "Is it helpful or risky that Python keeps the loop variable after the loop? Give an example of each.",
   "Why does a counting while loop usually end one step past the last passing value while a for loop does not?",
   "What naming habits help you avoid accidentally overwriting a variable with a loop variable?"
  ],
  "exit": [
   [
    "What does for n in range(1, 10, 4): pass then print(n) show?",
    "9. The range yields 1, 5 and 9."
   ],
   [
    "x = 7, then for x in []: pass, then print(x). What prints?",
    "7, because the empty loop never assigns x, so it keeps its old value."
   ],
   [
    "After i = 0 and while i < 3: i += 1, what is i, and how does that compare with for i in range(3)?",
    "The while loop leaves i at 3; the for loop leaves i at 2."
   ]
  ],
  "differentiation": [
   "Support: give students a tracing sheet with a single column for the loop variable and a reminder at the top: the last value written in this column is the answer.",
   "Extend: ask fast finishers to write a loop that searches a list and prints either the found index or not found by setting a result variable to -1 before the loop and recording the index on a match, then compare its clarity with the for-else version."
  ]
 },
 {
  "t": "Lists: building, indexing (including negative indexes) and slicing",
  "objectives": [
   "Students will be able to create lists with literals, list(), concatenation and repetition.",
   "Students will be able to select elements with positive and negative indexes and identify indexes that raise IndexError.",
   "Students will be able to evaluate slices with start, stop and step, including negative steps and out-of-range positions.",
   "Students will be able to distinguish index assignment from slice assignment and an element from a one-item slice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write the warm-up list on the board and ask for the two predictions. Collect answers without revealing them."
   ],
   [
    12,
    "Teach",
    "Write a five-item list with positive indexes above and negative indexes below each item. Demonstrate indexing, IndexError, and slices with omitted values and negative steps. Contrast x[0] with x[0:1] and x[0] = [1, 2] with x[0:1] = [1, 2]."
   ],
   [
    15,
    "Activity",
    "Run Human List: students hold cards to form a list and physically respond to index and slice requests, then complete a slicing worksheet in pairs."
   ],
   [
    8,
    "Discuss",
    "Resolve the warm-up and discuss why slices are forgiving while indexes are strict. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "temps = [14, 16, 15, 19, 21, 18, 17]. What does temps[7] do? What does temps[5:10] do? Write both predictions.",
  "activity": {
   "title": "Human List",
   "materials": "Large printed cards with letters a to f, a second label on each card showing its positive and negative index, a whiteboard to record results, and a printed slicing worksheet.",
   "steps": [
    "Six students stand in a row holding the letter cards, showing their positive index on one side and negative index on the other.",
    "The teacher calls out index requests such as x[2] and x[-1]; the matching student steps forward, and the class shouts IndexError for any position with no student.",
    "The teacher calls out slices such as x[1:4], x[::-2] and x[4:1:-1]; the matching students step forward in the order the slice returns them, and a scribe writes the resulting list.",
    "The teacher calls x[2:100] and x[3:1] to show forgiving and empty slices.",
    "Students return to pairs and complete the worksheet, which includes index assignment versus slice assignment questions."
   ]
  },
  "discussion": [
   "Why might Python have been designed so that slices never raise an error but indexes do?",
   "When is a negative index clearer than len(lst) - 1?",
   "What could go wrong if you assumed a one-item slice was a plain value in a calculation?"
  ],
  "exit": [
   [
    "Given x = [3, 6, 9, 12, 15], what is x[-2]?",
    "12, the second item from the end."
   ],
   [
    "What does x[1:4] return for the same list, and how many items does it contain?",
    "[6, 9, 12], three items, because the stop position 4 is excluded."
   ],
   [
    "What is the difference between x[0] = [1, 2] and x[0:1] = [1, 2]?",
    "The first puts a nested list in position 0; the second replaces the first item with two separate items."
   ]
  ],
  "differentiation": [
   "Support: give students a template that draws the list with positive indexes above and negative indexes below each item, so they can point to positions while working out each slice.",
   "Extend: ask fast finishers to write three different slices that all return the same reversed last three items of a list, and explain why each one works."
  ]
 },
 {
  "t": "List methods and functions: append(), insert(), index(), remove(), sort(), len(), sorted(), del",
  "objectives": [
   "Students will be able to predict the contents of a list after a sequence of append(), insert(), remove() and del operations.",
   "Students will be able to distinguish in-place methods that return None from functions such as sorted() and len() that return values.",
   "Students will be able to identify whether a given list operation raises ValueError or IndexError.",
   "Students will be able to choose between remove(), del and pop() based on whether they know a value or a position."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project `ranked = [3, 1, 2].sort()` and `print(ranked)`. Ask students to write their prediction on a sticky note before revealing that it prints None."
   ],
   [
    12,
    "Teach",
    "Walk through append, insert (including negative indexes), index, remove, del, sort, sorted and len with a live example in a browser-based Python editor. Keep a two-column whiteboard chart: 'changes the list, returns None' versus 'returns a value'."
   ],
   [
    18,
    "Activity",
    "Run the 'List Surgery' card game in pairs, described below. Circulate and ask pairs to justify each answer aloud."
   ],
   [
    5,
    "Discuss",
    "Pull out the two trickiest cards and discuss why remove works by value and del by position, and why Python chose to return None."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "Your list is `x = [3, 1, 2]`. If you run `y = x.sort()`, what do you think `x` and `y` hold afterwards? Write both down before we test it.",
  "activity": {
   "title": "List Surgery card game",
   "materials": "Printed cards (one starting list per card plus 3 to 4 operations each), whiteboard, student laptops with a browser-based Python editor.",
   "steps": [
    "Give each pair a stack of cards. Each card shows a starting list, such as `[5, 2, 8]`, followed by operations like `insert(-1, 0)`, `remove(8)` and `del x[0]`.",
    "Pairs trace each operation on paper and write the final list, plus any value returned or error raised.",
    "Pairs then type the card into the editor to check, marking each card as correct or incorrect.",
    "For any incorrect card, the pair writes one sentence explaining the rule they missed, such as 'insert with a negative index goes before that position'.",
    "Pairs swap their hardest card with another pair and repeat."
   ]
  },
  "discussion": [
   "Why might a language designer make sort() return None rather than the sorted list?",
   "When would you prefer sorted() over sort() in a real program, even though sorted() uses extra memory?"
  ],
  "exit": [
   [
    "What does `print([4, 2, 9].sort())` display?",
    "None, because sort() works in place and returns None."
   ],
   [
    "Given `n = [10, 20, 30]`, what is n after `n.remove(20)`, and what does `n.remove(99)` raise?",
    "[10, 30]; removing a missing value raises ValueError."
   ],
   [
    "After `a = [1, 2]` and `a.insert(0, 5)`, what are a and len(a)?",
    "[5, 1, 2] and 3."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a printed reference card listing each operation with 'by value' or 'by position' and 'returns None' or 'returns a value', and let them use it during the card game.",
   "Extend: ask fast finishers to predict the results of `insert()` with large negative indexes such as `insert(-10, x)` on a three-item list, then explain the rule they discover after testing."
  ]
 },
 {
  "t": "Iterating through lists, in and not in, list comprehensions with conditions",
  "objectives": [
   "Students will be able to write for loops that read list items directly and loops that modify items through their indexes.",
   "Students will be able to evaluate in and not in expressions, including cases with nested lists and case-sensitive strings.",
   "Students will be able to distinguish a filtering comprehension from a transforming comprehension and predict the length of each result."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show `nums = [1, 2, 3]` and `for n in nums: n = n * 10`. Ask students to vote with raised hands on whether nums changes."
   ],
   [
    12,
    "Teach",
    "Demonstrate the loop variable versus index loops, then in and not in, then build comprehensions. Write each comprehension on the board next to its equivalent ordinary loop, circling where the if sits in each."
   ],
   [
    18,
    "Activity",
    "Run the 'Sieve or Stamp' card sort described below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Ask groups which cards were hardest to classify and why the placement of if changes the result length."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If `nums = [1, 2, 3]` and you run `for n in nums: n = n * 10`, what does `print(nums)` show? Explain your vote in one sentence.",
  "activity": {
   "title": "Sieve or Stamp card sort",
   "materials": "Printed cards each showing one comprehension or membership expression, a whiteboard divided into 'Sieve (filter)', 'Stamp (transform)', 'Membership' and 'Error' columns, sticky notes, student laptops with a browser.",
   "steps": [
    "Give each group 12 cards, such as `[x for x in range(8) if x % 2]`, `[\"y\" if x else \"n\" for x in [0, 3]]`, `2 in [[2], 3]` and one invalid comprehension with an else after a trailing if.",
    "Groups place each card in the right column on the board and write the predicted result and length on a sticky note.",
    "Groups verify three cards of their choice in a browser-based Python editor.",
    "Each group rewrites one comprehension card as an ordinary for loop on the back of the card.",
    "The class reviews any card placed in different columns by different groups."
   ]
  },
  "discussion": [
   "Why does Python allow an else in a leading conditional expression but not in a trailing filter?",
   "When is a plain for loop clearer than a list comprehension?"
  ],
  "exit": [
   [
    "What is `[x for x in range(10) if x > 6]`?",
    "[7, 8, 9], because the trailing if keeps only values greater than 6."
   ],
   [
    "How many items does `[\"hi\" if x > 1 else \"lo\" for x in [0, 1, 2, 3]]` contain?",
    "4, because a leading if-else transforms every item."
   ],
   [
    "Is `\"A\" in [\"a\", \"b\"]` True or False?",
    "False, because string comparison is case-sensitive."
   ]
  ],
  "differentiation": [
   "Support: provide a fill-in template on paper showing the shapes `[expr for item in source if test]` and `[a if test else b for item in source]`, with the parts color-coded, for students to annotate each card.",
   "Extend: challenge students to write one comprehension that both transforms and filters, such as doubling only positive numbers from a mixed list, and to explain the order in which Python applies each part."
  ]
 },
 {
  "t": "Copying vs aliasing lists: b = a compared with a[:] or list(a)",
  "objectives": [
   "Students will be able to explain why `b = a` creates an alias rather than a copy of a list.",
   "Students will be able to predict whether a change made through one name is visible through another after assignment, slicing, list() or copy().",
   "Students will be able to distinguish rebinding (`b = b + [x]`) from mutation (`b += [x]`, append(), item assignment).",
   "Students will be able to use `is` and `==` correctly to compare identity and contents."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project `a = [1, 2]`, `b = a`, `b.append(3)`, `print(a)` and have students predict the output on a mini whiteboard or paper."
   ],
   [
    12,
    "Teach",
    "Draw names as labels with arrows pointing to list boxes on the whiteboard. Add arrows live as you run each line. Show slicing creating a new box, and a shallow copy whose inner boxes are shared."
   ],
   [
    18,
    "Activity",
    "Run 'Labels and Boxes' in pairs, described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the `+=` versus `= ... +` difference and where aliasing helps, such as a function intentionally updating a list."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "After `a = [1, 2]`, `b = a` and `b.append(3)`, what does `print(a)` show? Write your prediction and one sentence of reasoning.",
  "activity": {
   "title": "Labels and Boxes",
   "materials": "Sticky notes for name labels, paper or whiteboard for drawing list boxes, printed code snippets (6 to 8), student laptops with a browser-based Python editor.",
   "steps": [
    "Give each pair a set of short snippets mixing `b = a`, `a[:]`, `list(a)`, `b = b + [x]`, `b += [x]` and a nested list copy.",
    "For each snippet, one student draws boxes for list objects while the other moves sticky-note labels to show which names point where.",
    "Pairs write the final printed output and the value of `a is b` for each snippet.",
    "Pairs check each prediction in the editor, printing `id()` values where they disagree.",
    "Each pair writes a one-line rule for any snippet they got wrong and shares it on the board."
   ]
  },
  "discussion": [
   "When might aliasing be exactly what you want in a program?",
   "Why do immutable types such as strings and tuples never show the aliasing surprise?"
  ],
  "exit": [
   [
    "After `a = [1]`, `b = a` and `b += [2]`, what is a?",
    "[1, 2], because += mutates the shared list in place."
   ],
   [
    "After `a = [1]`, `b = a[:]` and `b.append(2)`, what are a and `a is b`?",
    "[1] and False, because the slice created a separate list."
   ],
   [
    "Given `m = [[1], [2]]` and `n = m.copy()`, does `n[1].append(3)` change m?",
    "Yes, m becomes [[1], [2, 3]], because copy() is shallow and the inner lists are shared."
   ]
  ],
  "differentiation": [
   "Support: give students a partially drawn labels-and-boxes diagram for the first three snippets so they only need to add the arrows and the final output.",
   "Extend: ask fast finishers to write a snippet where a shallow copy is enough and another where only `copy.deepcopy()` gives the right result, then test both."
  ]
 },
 {
  "t": "Nested lists and matrices (list of lists)",
  "objectives": [
   "Students will be able to read and assign elements of a list of lists using row and column indexes, including negative indexes.",
   "Students will be able to build a grid with a nested list comprehension and explain why `[[0] * n] * m` creates shared rows.",
   "Students will be able to trace nested loops over a grid and predict their output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Draw a 3 by 3 grid on the board with numbers 1 to 9. Ask students to name the value at grid[2][0] and grid[-1][-2]."
   ],
   [
    12,
    "Teach",
    "Show indexing, len of rows and columns, extracting a column with a comprehension, nested loops, and nested comprehensions. Demonstrate the shared-row trap live, printing the grid after one assignment."
   ],
   [
    18,
    "Activity",
    "Run 'Human Grid' followed by tracing cards, described below."
   ],
   [
    5,
    "Discuss",
    "Ask students to explain the shared-row bug using the labels-and-boxes picture from the aliasing lesson."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "On the board grid with rows [1, 2, 3], [4, 5, 6] and [7, 8, 9], what are grid[2][0] and grid[-1][-2]? Write both answers down.",
  "activity": {
   "title": "Human Grid and tracing cards",
   "materials": "Sticky notes with numbers, desks or chairs arranged in a small grid, printed tracing cards, whiteboard, student laptops with a browser.",
   "steps": [
    "Arrange 6 to 9 students in a grid of seats, each holding a sticky note with a value. Call out indexes such as `grid[1][2]` and have the matching student stand.",
    "Demonstrate the shared-row trap: tape one large sheet across a whole column of seats and show that 'changing' it changes every row at once.",
    "Hand out tracing cards with nested loops that sum or print grid elements. Pairs write each (row, column) pair visited before computing the output.",
    "Pairs check two cards in a browser-based Python editor.",
    "Each pair writes the comprehension that would build the grid on their card."
   ]
  },
  "discussion": [
   "Why does `[[0] * 3] * 2` work fine for the inner `* 3` but break for the outer `* 2`?",
   "What kinds of real data fit naturally into a list of lists, and when would a jagged list be acceptable?"
  ],
  "exit": [
   [
    "For `m = [[1, 2], [3, 4], [5, 6]]`, what are m[1][0] and len(m)?",
    "3 and 3: row 1 is [3, 4], and the grid has three rows."
   ],
   [
    "After `g = [[0] * 2 for _ in range(2)]` and `g[0][0] = 7`, what is g?",
    "[[7, 0], [0, 0]], because the comprehension created independent rows."
   ],
   [
    "How do you collect the first column of m as a list?",
    "`[row[0] for row in m]`."
   ]
  ],
  "differentiation": [
   "Support: give students a printed grid with row and column numbers written along the edges so they can point to cells while tracing.",
   "Extend: ask fast finishers to write code that returns both diagonals of a square grid and to test it on a 4 by 4 grid."
  ]
 },
 {
  "t": "Tuples: building (including one-item tuples), indexing, slicing, immutability and tuples vs lists",
  "objectives": [
   "Students will be able to create tuples, including empty and one-item tuples, and explain why the comma rather than the parentheses creates a tuple.",
   "Students will be able to index, slice and unpack tuples and predict the results.",
   "Students will be able to identify the error raised by attempts to modify a tuple.",
   "Students will be able to choose between a tuple and a list for a given scenario and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write `type((5))` and `type((5,))` on the board and ask students to predict each result."
   ],
   [
    12,
    "Teach",
    "Demonstrate packing, the one-item comma rule, indexing and slicing, count() and index(), unpacking and swapping, then the errors from modifying a tuple. Finish with tuple versus list use cases and tuples as dictionary keys."
   ],
   [
    18,
    "Activity",
    "Run 'Tuple or Not' card sort and the scenario round described below."
   ],
   [
    5,
    "Discuss",
    "Discuss where immutability protects data in real programs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "What do you think `type((5))` and `type((5,))` return? Write your guesses and explain what the comma might do.",
  "activity": {
   "title": "Tuple or Not, then List or Tuple",
   "materials": "Printed expression cards, printed scenario cards, whiteboard with columns 'tuple', 'not a tuple' and 'error', student laptops with a browser.",
   "steps": [
    "Give each pair 10 expression cards such as `(7)`, `7,`, `()`, `(\"a\")`, `tuple(\"ab\")` and `t[0] = 1` on a tuple.",
    "Pairs sort each card into tuple, not a tuple, or error, writing the type, length or exception name on the card.",
    "Pairs verify any three cards in a browser-based Python editor.",
    "Hand out scenario cards (a shopping cart, a date of birth, a dictionary key made of two city names, a to-do queue) and have pairs choose list or tuple with a one-sentence reason.",
    "Pairs present one scenario choice to the class."
   ]
  },
  "discussion": [
   "If tuples cannot change, why does Python bother offering them alongside lists?",
   "Is a tuple that contains a list truly unchangeable? What does that tell you about what immutability means?"
  ],
  "exit": [
   [
    "What is `len((\"abc\"))` and `len((\"abc\",))`?",
    "3 and 1: the first is a string, the second a one-item tuple."
   ],
   [
    "What happens with `t = (1, 2)` and then `t[1] = 5`?",
    "TypeError, because tuples do not support item assignment."
   ],
   [
    "After `a, b = 3, 4` and `a, b = b, a`, what are a and b?",
    "a is 4 and b is 3, because tuple unpacking swaps them."
   ]
  ],
  "differentiation": [
   "Support: provide a reference strip with the rule 'comma makes a tuple' and three worked examples to keep beside the card sort.",
   "Extend: ask fast finishers to show that a tuple containing a list cannot be a dictionary key, explain why, and contrast it with a tuple of strings."
  ]
 },
 {
  "t": "Dictionaries: building, indexing, adding, changing and removing keys",
  "objectives": [
   "Students will be able to build dictionaries with literals and dict(), and explain the rules for valid keys.",
   "Students will be able to read values with square brackets and get(), predicting when KeyError is raised.",
   "Students will be able to add, change and remove pairs using assignment, update(), del, pop(), popitem() and clear()."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how a contacts app finds a phone number when you type a name, and connect this to looking up by key instead of by position."
   ],
   [
    12,
    "Teach",
    "Build a small menu dictionary live. Show reading with brackets and get(), adding and changing with assignment, update(), then del, pop(), popitem() and clear(). Record on the board what each operation does when the key is missing."
   ],
   [
    18,
    "Activity",
    "Run 'Coat Check' role-play followed by trace cards, described below."
   ],
   [
    5,
    "Discuss",
    "Compare get() with an in check, and discuss why keys must be immutable."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "When you type a friend's name into your phone's contacts, how does it find the number without scrolling through every entry? How is that different from finding the fifth item in a list?",
  "activity": {
   "title": "Coat Check role-play and trace cards",
   "materials": "Sticky notes as tickets, paper bags or envelopes as coats, printed trace cards, whiteboard, student laptops with a browser.",
   "steps": [
    "One student acts as the coat-check attendant holding labeled envelopes (keys) with sticky-note values inside. Classmates call out operations such as `d[\"blue\"]`, `d.get(\"red\")`, `d[\"green\"] = 5` and `del d[\"blue\"]`.",
    "The attendant performs each operation; when a key is missing, the class decides whether the result is KeyError, None or a new entry.",
    "Pairs then trace printed cards that build and modify a dictionary, writing the contents after each line and the final len().",
    "Pairs check two cards in a browser-based Python editor.",
    "The class lists every operation on the board under 'safe with a missing key' or 'raises KeyError'."
   ]
  },
  "discussion": [
   "When would you want a missing key to raise an error rather than return a default?",
   "Why might Python forbid lists as keys but allow tuples?"
  ],
  "exit": [
   [
    "What is `len({\"x\": 1, \"y\": 2, \"x\": 3})`?",
    "2, because the repeated key x keeps only its last value."
   ],
   [
    "Given `d = {\"a\": 1}`, what do `d.get(\"b\", 0)` and `d[\"b\"]` do?",
    "get returns 0; `d[\"b\"]` raises KeyError."
   ],
   [
    "What does `d.pop(\"a\")` return, and what is d afterwards?",
    "It returns 1, and d becomes the empty dictionary {}."
   ]
  ],
  "differentiation": [
   "Support: give struggling students the missing-key table (brackets, get, assignment, del, pop, in) as a printed card to use during tracing.",
   "Extend: ask fast finishers to predict and test `{1: \"x\", True: \"y\", 1.0: \"z\"}` and explain the result using equality of keys."
  ]
 },
 {
  "t": "Iterating dictionaries with keys(), values() and items(); checking whether a key exists",
  "objectives": [
   "Students will be able to loop over a dictionary's keys, values and items and predict the output of each form.",
   "Students will be able to check whether a key exists using in and not in, and explain why in does not search values.",
   "Students will be able to identify loops that raise RuntimeError and rewrite them safely using list(d)."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show `d = {\"a\": 1, \"b\": 2}` and ask what `for x in d: print(x)` prints and what `1 in d` returns."
   ],
   [
    12,
    "Teach",
    "Demonstrate keys(), values() and items(), unpacking in for loops, sorted() on keys, membership tests on the dictionary and on values(), and the counting pattern. Show the RuntimeError live and the list(d) fix."
   ],
   [
    18,
    "Activity",
    "Run 'Report Builder' in pairs, described below."
   ],
   [
    5,
    "Discuss",
    "Compare an in check with get(), and discuss when each fits better."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "Given `d = {\"a\": 1, \"b\": 2}`, what does `for x in d: print(x)` print, and is `1 in d` True or False?",
  "activity": {
   "title": "Report Builder",
   "materials": "Printed data cards with small dictionaries (inventory counts, quiz scores, ticket counts), whiteboard, student laptops with a browser-based Python editor.",
   "steps": [
    "Give each pair a data card and three tasks: print every key and value, total all the values, and remove every entry below a threshold.",
    "Pairs write their loops on paper first, labeling which view (keys, values or items) each loop uses.",
    "Pairs run the code in the editor. If they get RuntimeError, they rewrite the deletion loop over list(d).",
    "Pairs add one membership check of their own, such as whether a key is missing before adding it.",
    "Two pairs share their code on the projector and the class reviews which view was the clearest choice."
   ]
  },
  "discussion": [
   "Why might Python have chosen to make in check keys rather than values?",
   "When would you sort the keys before printing a report, and when is insertion order better?"
  ],
  "exit": [
   [
    "For `d = {\"x\": 5, \"y\": 6}`, what are `5 in d` and `5 in d.values()`?",
    "False and True, because in on the dictionary checks keys only."
   ],
   [
    "What does `for k, v in d.items(): print(k, v)` print for that d?",
    "x 5 and then y 6, one pair per line."
   ],
   [
    "How do you safely delete keys while looping?",
    "Loop over a copy such as list(d), because deleting from d during iteration raises RuntimeError."
   ]
  ],
  "differentiation": [
   "Support: give students a three-row chart showing `for k in d`, `for v in d.values()` and `for k, v in d.items()` with sample output for each, to use while coding.",
   "Extend: ask fast finishers to build a dictionary that inverts another (values become keys) using items(), and to explain what happens when two keys share the same value."
  ]
 },
 {
  "t": "Strings: indexing, slicing (including [::-1]), immutability and comparison",
  "objectives": [
   "Students will be able to evaluate string indexes and slices, including negative indexes, steps and [::-1].",
   "Students will be able to explain string immutability and rewrite code that tries to modify a string in place.",
   "Students will be able to predict the result of string comparisons using code points, case and character-by-character rules."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to predict whether \"Zebra\" < \"apple\" is True or False, and to explain their guess."
   ],
   [
    12,
    "Teach",
    "Draw the 'markers between characters' picture for \"Python\" on the board and evaluate several slices. Show the TypeError from item assignment and the rebuild fix. Show ord() values for A, Z, a and z, then compare strings."
   ],
   [
    18,
    "Activity",
    "Run 'Slice Relay' in teams, described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the library sorting oddities from the hook and how to fix each one."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "Is \"Zebra\" < \"apple\" True or False in Python? Write your guess and one sentence explaining your reasoning.",
  "activity": {
   "title": "Slice Relay",
   "materials": "Large paper strips with a word written one letter per box and the index markers above, whiteboard, printed slice and comparison cards, student laptops with a browser.",
   "steps": [
    "Divide the class into teams and give each team a paper strip for a word such as \"COMPUTER\" with positive and negative markers.",
    "The teacher reads a slice card such as `w[2:5]`, `w[-3:]` or `w[::-2]`; one member from each team writes the answer on the board, then passes the marker to the next teammate.",
    "Mix in comparison cards such as `\"cat\" < \"Cat\"` and `\"100\" < \"20\"`, and modification cards such as `w[0] = \"c\"` where the right answer is TypeError.",
    "Teams check disputed answers in a browser-based Python editor.",
    "Each team writes one tricky card of its own for another team to solve."
   ]
  },
  "discussion": [
   "Why might a language choose to make strings immutable?",
   "How would you sort a list of titles so that case does not affect the order?"
  ],
  "exit": [
   [
    "For `s = \"planet\"`, what are s[1:4], s[-2:] and s[::-1]?",
    "'lan', 'et' and 'tenalp'."
   ],
   [
    "What happens with `s = \"dog\"` followed by `s[0] = \"f\"`?",
    "TypeError, because strings are immutable; use `s = \"f\" + s[1:]`."
   ],
   [
    "Is `\"Bob\" < \"alice\"` True or False?",
    "True, because 'B' (66) has a lower code point than 'a' (97)."
   ]
  ],
  "differentiation": [
   "Support: give students a printed strip with both positive and negative index markers for each practice word so they can count rather than calculate.",
   "Extend: ask fast finishers to predict slices with negative steps and explicit start and stop values, such as `s[5:1:-2]`, then verify and explain the rule."
  ]
 },
 {
  "t": "Escaping with \\, quotes and apostrophes inside strings, multi-line strings",
  "objectives": [
   "Students will be able to write string literals that contain apostrophes and double quotes using alternate delimiters or escapes.",
   "Students will be able to calculate the length and printed output of strings containing escape sequences such as \\n, \\t and \\\\.",
   "Students will be able to identify invalid literals, including a string ending in a single backslash, and correct them.",
   "Students will be able to create multi-line strings with triple quotes and count the newline characters they contain."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project `print(\"C:\\new\")` and ask students to predict exactly what appears on screen."
   ],
   [
    12,
    "Teach",
    "Demonstrate alternate quotes, the main escape sequences, len() on escaped strings, the trailing backslash SyntaxError, raw strings and triple-quoted strings. Contrast print() output with the REPL echo of the same string."
   ],
   [
    18,
    "Activity",
    "Run 'Literal Detective' in pairs, described below."
   ],
   [
    5,
    "Discuss",
    "Discuss when to choose alternate quotes, escapes, raw strings or triple quotes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "What do you think `print(\"C:\\new\")` displays? Write down exactly what you expect on screen, including any line breaks.",
  "activity": {
   "title": "Literal Detective",
   "materials": "Printed cards each showing a string literal, whiteboard with columns 'valid' and 'SyntaxError', student laptops with a browser-based Python editor.",
   "steps": [
    "Give each pair 10 literal cards, such as `'It\\'s'`, `\"He said \\\"hi\\\"\"`, `\"end\\\"`, `'It's'`, `r\"C:\\new\"` and a short triple-quoted string spanning three lines.",
    "Pairs classify each card as valid or SyntaxError and place it on the board.",
    "For each valid card, pairs write its len() and what print() would show.",
    "Pairs test their answers in the editor and correct any mistakes on the card.",
    "Each pair rewrites one SyntaxError card into two different valid versions and shares them."
   ]
  },
  "discussion": [
   "When is a raw string the best choice, and when would doubling backslashes be clearer?",
   "Why does the REPL show a string differently from print()?"
  ],
  "exit": [
   [
    "What is `len(\"x\\ty\\n\")`?",
    "4: x, a tab, y and a newline."
   ],
   [
    "Why is `\"path\\\"` invalid?",
    "The final backslash escapes the closing quote, so the string is never closed and Python raises SyntaxError."
   ],
   [
    "How many newline characters are in a triple-quoted string whose text runs over three lines, starting right after the opening quotes and closing right after the last word?",
    "Two, one for each line break between the three lines."
   ]
  ],
  "differentiation": [
   "Support: give students a reference card listing \\n, \\t, \\\\, \\' and \\\" with \"counts as one character\" beside each, and let them use it during the activity.",
   "Extend: ask fast finishers to explore why `r\"\\\"` is a SyntaxError while `r\"\\\\\"` is valid, and to explain what the valid raw string contains (two backslash characters)."
  ]
 },
 {
  "t": "Common string methods: split(), join(), upper(), lower(), strip(), find(), count(), replace()",
  "objectives": [
   "Students will be able to use split(), join(), strip(), upper(), lower(), find(), count() and replace() to transform text and predict their results.",
   "Students will be able to explain why string methods return new strings and correct code that discards their results.",
   "Students will be able to distinguish split() with and without a separator, and find() from index() on missing substrings."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show `s = \"hello\"`, `s.upper()`, `print(s)` and ask students to predict the output."
   ],
   [
    12,
    "Teach",
    "Demonstrate each method on a messy input line, building a cleanup chain step by step. Show split() with and without a separator, join() on a separator, find() versus index(), and non-overlapping count()."
   ],
   [
    18,
    "Activity",
    "Run 'Data Cleanup Crew' in pairs, described below."
   ],
   [
    5,
    "Discuss",
    "Discuss which mistakes produced wrong output without any error message, and why those are the most dangerous."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "After `s = \"hello\"` and `s.upper()`, what does `print(s)` show? Explain your answer in one sentence.",
  "activity": {
   "title": "Data Cleanup Crew",
   "materials": "Printed cards with messy text lines (sign-up entries, survey answers, comma-separated records), whiteboard, student laptops with a browser-based Python editor.",
   "steps": [
    "Give each pair three messy lines and a target output for each, such as a clean name in title form or a pipe-separated record.",
    "Pairs plan the method chain on paper, writing the intermediate result after each method.",
    "Pairs implement and run their chain in the editor, assigning results where needed.",
    "Pairs swap cards with another pair and check that the other pair's chain produces the target output.",
    "The class lists any silent bugs found, such as unassigned results, on the board."
   ]
  },
  "discussion": [
   "Why do silent bugs, like an unassigned strip(), cause more trouble than errors?",
   "When would you choose find() over the in operator, and when is in clearer?"
  ],
  "exit": [
   [
    "What does `\" a b  c \".split()` return?",
    "['a', 'b', 'c'], because split() with no argument splits on runs of whitespace and ignores the ends."
   ],
   [
    "What does `\"+\".join([\"x\", \"y\", \"z\"])` return?",
    "'x+y+z'."
   ],
   [
    "What are `\"banana\".find(\"q\")` and `\"banana\".count(\"an\")`?",
    "-1 and 2."
   ]
  ],
  "differentiation": [
   "Support: give students a method card listing each method with its return type (string, list or integer) and one example, to keep beside them during the activity.",
   "Extend: ask fast finishers to write a one-line expression that turns \"  hello WORLD from python \" into \"Hello World From Python\" using split(), a comprehension and join(), then explain each step."
  ]
 },
 {
  "t": "Decomposition: splitting a program into functions",
  "objectives": [
   "Students will be able to explain the benefits of decomposition, including reuse, readability, testing, teamwork and abstraction.",
   "Students will be able to identify signs that code should be split into functions, such as duplicated blocks or comments naming a task.",
   "Students will be able to decompose a described program into named functions with parameters and return values.",
   "Students will be able to reject incorrect claims about functions, such as that they make programs run faster."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list the steps of making breakfast, then group the steps into a few named sub-tasks."
   ],
   [
    12,
    "Teach",
    "Show a long script with duplicated code, then refactor it live into small functions with a short main section. Point out names, parameters and return values, and list the benefits on the board."
   ],
   [
    18,
    "Activity",
    "Run 'Program Blueprint' in small groups, described below."
   ],
   [
    5,
    "Discuss",
    "Groups compare their decompositions and discuss where they drew the lines differently."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "Write the steps for making breakfast, then group them into three or four named sub-tasks. Which sub-task could you reuse for making lunch?",
  "activity": {
   "title": "Program Blueprint",
   "materials": "Printed program descriptions (a grade calculator, a shopping receipt, a quiz game), sticky notes, whiteboard or large paper, student laptops with a browser.",
   "steps": [
    "Give each group one program description written as a single long paragraph of steps.",
    "Groups write each sub-task on a sticky note as a function name in snake_case, with its parameters and what it returns.",
    "Groups arrange the notes into a tree on the board, with the main section at the top calling the others.",
    "Groups write the main section as a few lines of calls on paper, then optionally implement one function in a browser-based Python editor.",
    "Each group explains one function name and why it returns a value rather than printing it."
   ]
  },
  "discussion": [
   "How do you decide whether a piece of code deserves its own function?",
   "How does decomposition help when several people work on the same program?"
  ],
  "exit": [
   [
    "Give two benefits of splitting a program into functions.",
    "Any two of reuse, readability, easier testing and debugging, teamwork and abstraction."
   ],
   [
    "Why is a function that returns a value usually more useful than one that prints it?",
    "The caller can store, compare, reuse or print a returned value, while a printed value is only shown on screen."
   ],
   [
    "True or false: dividing code into functions makes it run faster.",
    "False; decomposition improves structure and maintenance, and calls add a small overhead."
   ]
  ],
  "differentiation": [
   "Support: give students a partly completed blueprint with the main section and two function names filled in, so they only need to add the remaining functions.",
   "Extend: ask fast finishers to write placeholder functions with pass for their whole blueprint, then implement and test one function at a time in a browser-based editor."
  ]
 },
 {
  "t": "Defining and invoking functions; functions must be defined before they are called",
  "objectives": [
   "Students will be able to define functions with def, including parameters, a colon and an indented body, and call them correctly.",
   "Students will be able to explain why a function must be defined before a top-level call runs, and why a body may refer to functions defined later.",
   "Students will be able to distinguish a function object from a function call and predict the output of each.",
   "Students will be able to predict NameError and TypeError outcomes caused by ordering, redefinition or wrong argument counts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a three-line script with `hello()` on line 1 and its def below, and ask students to predict what happens."
   ],
   [
    12,
    "Teach",
    "Trace scripts line by line on the board using a 'names defined so far' column. Show calls before and after def, a body calling a later function, missing parentheses, redefinition and wrong argument counts."
   ],
   [
    18,
    "Activity",
    "Run 'Execution Order Trace' in pairs, described below."
   ],
   [
    5,
    "Discuss",
    "Discuss why the pattern of defining all functions first and calling main() last always works."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions individually."
   ]
  ],
  "warmup": "A script has `hello()` on line 1 and `def hello(): print(\"hi\")` on lines 3 and 4. What happens when it runs? Write your prediction.",
  "activity": {
   "title": "Execution Order Trace",
   "materials": "Printed script cards (5 to 7 short scripts), printed two-column trace tables, whiteboard, student laptops with a browser-based Python editor.",
   "steps": [
    "Give each pair the script cards and blank trace tables with columns 'names defined so far' and 'what this line does'.",
    "Pairs trace each script line by line and write the final output or the error name and line.",
    "Pairs run each script in the editor to verify, correcting their trace tables where they differed.",
    "Pairs fix every script that raised an error by moving or editing as few lines as possible.",
    "Two pairs present one fix each, explaining the ordering rule involved."
   ]
  },
  "discussion": [
   "Why does Python look up names inside a function body only when the function runs?",
   "What are the risks of reusing a function's name for a variable later in a program?"
  ],
  "exit": [
   [
    "What happens if a script calls `report()` before its def has executed?",
    "NameError, because the name is not defined yet."
   ],
   [
    "What does `print(len)` display compared with `print(len(\"hi\"))`?",
    "The first shows a description of the built-in function object; the second prints 2."
   ],
   [
    "After `def f(): return 1` and then `def f(x): return x * 2`, what does `f(3)` return, and what does `f()` do?",
    "f(3) returns 6; f() raises TypeError, because only the second definition exists and it needs one argument."
   ]
  ],
  "differentiation": [
   "Support: give students trace tables with the first two rows already completed for each script, so they can follow the pattern.",
   "Extend: ask fast finishers to write a script where a function works when called at one point in the file and raises NameError when called earlier, and to explain the difference."
  ]
 },
 {
  "t": "Return and yield, returning several values as a tuple, the None value",
  "objectives": [
   "Students will be able to explain the difference between printing a value and returning it.",
   "Students will be able to predict when a function call evaluates to None, including functions with no return or a bare return.",
   "Students will be able to apply tuple packing in a return statement and unpack the result into variables.",
   "Students will be able to distinguish a generator function using yield from an ordinary function using return."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up snippet and ask students to write their predicted output on a sticky note before anyone runs it. Collect a few answers aloud without judging them."
   ],
   [
    12,
    "Teach",
    "Walk through return, implicit None, tuple returns and yield using the lesson's code. Say clearly: print shows, return gives back. Run `print(greet())` live so students see the None line appear, then show `next()` on a small generator."
   ],
   [
    18,
    "Activity",
    "Run the card sort described below in pairs, then have pairs check two of their cards in a browser-based Python interpreter."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the activity to real code reuse and to exam-style output questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper and hand them in."
   ]
  ],
  "warmup": "What does this print, and how many lines: `def hello(): print(\"hi\")` followed by `x = hello()` and `print(x)`?",
  "activity": {
   "title": "Print or return: output prediction card sort",
   "materials": "Printed cards, each with a short function and a call (about 12 cards); whiteboard divided into columns; student laptops with a browser for checking.",
   "steps": [
    "Divide the whiteboard into columns headed \"Shows a value only\", \"Returns a value\", \"Returns None\", \"Returns a tuple\" and \"Returns a generator\".",
    "Give each pair a shuffled set of cards. Pairs write the exact output of each card on the back, then place it in a column.",
    "Pairs compare placements with a neighboring pair and resolve disagreements by tracing line by line.",
    "Each pair picks the two cards they were least sure about and runs them in a browser-based interpreter to confirm.",
    "Finish by asking two pairs to explain one card that surprised them."
   ]
  },
  "discussion": [
   "Why would a team prefer functions that return values over functions that print them, when both seem to work on screen?",
   "When might producing values one at a time with yield be better than building and returning a whole list?"
  ],
  "exit": [
   [
    "What does `print(f())` show if `def f(): print(\"a\")`?",
    "a and then None, because f prints but returns nothing."
   ],
   [
    "What is the type of the value returned by `def g(): return 3, 4`?",
    "A tuple, (3, 4)."
   ],
   [
    "What does calling `def h(): yield 1` as `h()` give you?",
    "A generator object; its body runs only when a value is requested."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a two-column template, \"What appears on screen\" and \"What the call evaluates to\", and have them fill both columns for every snippet before predicting the final output.",
   "Extend: ask fast finishers to write a generator that yields the first n even numbers and a version that returns a list, then explain in two sentences how their behavior differs when the result is printed directly."
  ]
 },
 {
  "t": "Recursion, base cases and RecursionError",
  "objectives": [
   "Students will be able to identify the base case and the recursive case in a recursive function.",
   "Students will be able to trace a recursive call down to its base case and combine the results on the way back up.",
   "Students will be able to explain why a missing or unreachable base case raises RecursionError and where that class sits in the hierarchy.",
   "Students will be able to repair a faulty recursive function by fixing its base case or recursive step."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the nesting-doll warm-up prompt and let students discuss with a neighbor for two minutes before sharing one answer each."
   ],
   [
    12,
    "Teach",
    "Trace factorial(4) on the whiteboard, drawing each call as a box stacked on the previous one. Point to the base case and say: this is the only line that stops the calls. Then show what happens with a base case of `n == 1` and an argument of -1."
   ],
   [
    18,
    "Activity",
    "Run the human call stack activity below with volunteers, then let pairs trace a second function on paper."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare recursion with loops and to talk about real data that is naturally nested."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "To count a stack of nesting dolls without seeing inside, what rule would you repeat, and when would you stop?",
  "activity": {
   "title": "Human call stack",
   "materials": "Sticky notes, markers, whiteboard, printed copies of `digit_sum` and `factorial` for each pair.",
   "steps": [
    "Ask five volunteers to stand in a line. Each represents one call of `factorial`, starting with factorial(5) at the front.",
    "The first volunteer writes \"n = 5\" on a sticky note, then turns to the next and asks for factorial(4). Continue until the last volunteer, factorial(1), announces the base case answer 1.",
    "Results travel back: each volunteer multiplies their n by the answer they received, writes it on their note, and passes it forward. The class checks each step.",
    "Repeat with a broken version whose base case is `n == 0` but whose argument decreases by 2 from 5, and let the class see that the line never ends.",
    "Pairs then trace `digit_sum(472)` on paper, writing one call per line, and compare their answer of 13 with another pair."
   ]
  },
  "discussion": [
   "Which real-world structures, such as folders or family trees, feel naturally recursive, and why?",
   "If a loop can do anything recursion can, why might a programmer still choose recursion?"
  ],
  "exit": [
   [
    "What are the two required parts of a correct recursive function?",
    "A base case that returns without recursing, and a recursive case that moves the argument toward the base case."
   ],
   [
    "What does `def f(n): return 1 if n <= 1 else n * f(n - 1)` return for f(4)?",
    "24."
   ],
   [
    "Which exception is raised when recursion goes too deep, and what is its parent class?",
    "RecursionError, a subclass of RuntimeError."
   ]
  ],
  "differentiation": [
   "Support: give students a partially completed trace table with columns for the call, its argument and the value returned, so they only fill in the missing cells while tracing.",
   "Extend: ask fast finishers to write a recursive function that sums a list by adding the first item to the sum of the rest, identify its base case, and count how many calls it makes for a list of four items."
  ]
 },
 {
  "t": "Parameters vs arguments; positional, keyword and mixed argument passing",
  "objectives": [
   "Students will be able to distinguish parameters in a definition from arguments in a call.",
   "Students will be able to predict how positional, keyword and mixed arguments are bound to parameters.",
   "Students will be able to classify faulty calls as SyntaxError or TypeError and explain why.",
   "Students will be able to rewrite an error-prone positional call using keyword arguments."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hand out a blank paper form with three labeled lines and ask students to fill it in two ways: once in order without reading labels, once by label. Ask what could go wrong with the first way."
   ],
   [
    12,
    "Teach",
    "Write `def intro(name, age, city):` on the board and label the parameters. Show positional, keyword and mixed calls, then the four failing calls from the lesson, sorting them into SyntaxError and TypeError columns."
   ],
   [
    18,
    "Activity",
    "Run the parameter role-play described below, then let pairs classify a set of printed calls."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect argument styles to readable, safe code."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If someone handed you three numbers with no labels for a form asking for height, width and depth, how would you know which is which?",
  "activity": {
   "title": "Be the parameter",
   "materials": "Large printed name cards for three parameters, small printed value cards, a set of printed function calls (about 10), whiteboard.",
   "steps": [
    "Three volunteers stand at the front holding the cards \"name\", \"age\" and \"city\" in that order, representing `def intro(name, age, city):`.",
    "Read a call aloud, such as `intro(\"Ana\", city=\"Lima\", age=30)`. A fourth student acts as the interpreter and hands value cards to the right volunteers, positional values first from the left, then keyword values by name.",
    "For a faulty call, the interpreter must stop and announce the error: SyntaxError if a keyword comes before a positional value, TypeError if a volunteer would get two cards, gets none, or no volunteer has the named card.",
    "In pairs, students then sort the remaining printed calls into \"works\", \"SyntaxError\" and \"TypeError\", writing the output for the ones that work.",
    "Review the sort as a class, asking one pair to justify each error classification."
   ]
  },
  "discussion": [
   "When would you insist on keyword arguments in a team's code, and when are positional arguments perfectly fine?",
   "Why do you think Python reports a keyword-before-positional mistake before the program even runs, while a missing argument is only reported when the call happens?"
  ],
  "exit": [
   [
    "In `def area(w, h):` called as `area(2, 5)`, name the parameters and the arguments.",
    "The parameters are w and h; the arguments are 2 and 5."
   ],
   [
    "Given `def f(a, b): print(a, b)`, what does `f(b=2, a=1)` print?",
    "1 2, because keyword arguments are matched by name."
   ],
   [
    "Which error does `f(1, a=2)` raise, and which does `f(a=1, 2)` raise?",
    "The first raises TypeError (a gets two values); the second is a SyntaxError (positional argument after keyword argument)."
   ]
  ],
  "differentiation": [
   "Support: give students a binding table with one row per parameter and have them write which argument lands in each row before predicting any output; flag empty or double-filled rows as errors.",
   "Extend: ask fast finishers to design three calls to a four-parameter function that all produce identical output using different mixes of positional and keyword arguments, and one call for each error type."
  ]
 },
 {
  "t": "Default parameter values and why defaults must follow required parameters",
  "objectives": [
   "Students will be able to write functions with default parameter values and predict which value a call uses.",
   "Students will be able to explain why parameters with defaults must follow required parameters, and identify the resulting SyntaxError.",
   "Students will be able to use a keyword argument to override a later default while keeping earlier defaults.",
   "Students will be able to describe the shared mutable default problem and apply the None pattern to fix it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the coffee-order warm-up question and collect examples of everyday defaults from the class."
   ],
   [
    12,
    "Teach",
    "Build `greet(name, greeting=\"Hello\")` live on the projector, calling it three ways. Then type `def f(a=1, b):` and show that the error appears immediately. Explain the left-to-right filling rule, then show the mutable default example and its None fix."
   ],
   [
    18,
    "Activity",
    "Run the valid-or-not definition sort described below, followed by the call prediction round."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect defaults to maintaining code that many people already call."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "When you order a coffee without mentioning size or milk, what do you get? What does that tell you about how defaults make choices easier?",
  "activity": {
   "title": "Valid definition or SyntaxError?",
   "materials": "Printed cards with function definitions (about 8) and calls (about 8), sticky notes, whiteboard with two columns, student laptops with a browser for checking.",
   "steps": [
    "Give each group a stack of definition cards. Groups sort them into \"Valid\" and \"SyntaxError\" on the whiteboard and write one sentence on a sticky note explaining each SyntaxError.",
    "Hand out the call cards, each paired with a valid definition such as `def p(x, y=2, z=3)`. Groups write the exact output of each call.",
    "Include two cards that call a function with a list default twice; groups must predict the second result.",
    "Groups check three of their predictions in a browser-based interpreter and correct any mistakes.",
    "Each group presents the card that caused the most debate and how they resolved it."
   ]
  },
  "discussion": [
   "Why are defaults such a useful tool when a function is already called from many places in a codebase?",
   "Why do you think Python evaluates default values once instead of on every call, and what trade-off does that create?"
  ],
  "exit": [
   [
    "Is `def f(a, b=2, c):` valid?",
    "No; c has no default but follows b, which has one, so it is a SyntaxError."
   ],
   [
    "Given `def p(x, y=2, z=3): print(x, y, z)`, what does `p(1, z=5)` print?",
    "1 2 5."
   ],
   [
    "What is the standard fix for `def add(item, bag=[]):`?",
    "Use `bag=None` and create a new list inside the function when bag is None."
   ]
  ],
  "differentiation": [
   "Support: give students a parameter strip, a row of boxes labeled with each parameter and its default, and have them cross out a default each time an argument replaces it before reading off the final values.",
   "Extend: ask fast finishers to explain, in writing, why `def f(a=1, *, b):` might be allowed while `def f(a=1, b):` is not, then test their idea in a browser-based interpreter and report what they find."
  ]
 },
 {
  "t": "Name scopes, shadowing and the global keyword; UnboundLocalError",
  "objectives": [
   "Students will be able to explain the difference between local and global scope and describe the LEGB lookup order.",
   "Students will be able to predict the effect of assigning to a name inside a function, with and without the global keyword.",
   "Students will be able to diagnose an UnboundLocalError and propose two different fixes.",
   "Students will be able to distinguish mutating a global object from rebinding a global name."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up code and ask students to vote by raising hands on the printed value before running it."
   ],
   [
    12,
    "Teach",
    "Draw nested boxes on the board labeled Built-in, Global and Local. Trace a name lookup from the inside out. Show the change() example, then the bump() example with global, then `score += 1` without global and its UnboundLocalError."
   ],
   [
    18,
    "Activity",
    "Run the scope detective activity below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh the global keyword against passing and returning values."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "What does this print: `x = 1`, then `def f(): x = 2`, then `f()` and `print(x)`?",
  "activity": {
   "title": "Scope detectives",
   "materials": "Printed case files (short scripts of 5 to 8 lines, about 6 different ones), colored markers, whiteboard, student laptops with a browser for checking.",
   "steps": [
    "Give each group of three a case file. One student circles every name assigned inside each function in one color, and every global assignment in another color.",
    "The second student predicts, for each print line, whether the name resolves locally, globally or to a built-in, and writes the expected output or error.",
    "The third student checks the prediction in a browser-based interpreter and records any surprises.",
    "Groups rotate case files twice so each group solves three cases, rotating roles each time.",
    "Close by asking each group to present one case that produced UnboundLocalError and explain the fix they would choose."
   ]
  },
  "discussion": [
   "Why do experienced programmers try to avoid the global keyword, even though it works?",
   "Why might a bug that silently creates a local variable be more dangerous than one that raises UnboundLocalError?"
  ],
  "exit": [
   [
    "With `n = 5` and `def f(): n = 9`, what is n at the top level after f() runs?",
    "5, because the assignment inside f creates a local n."
   ],
   [
    "Why does `count = 0` followed by `def g(): count += 1` raise UnboundLocalError when g() is called?",
    "The assignment makes count local to g, and += reads it before any local value exists."
   ],
   [
    "Does `def h(): data.append(1)` need `global data` to change a global list?",
    "No, because it mutates the list without rebinding the name."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a checklist to apply to each function: list every assigned name, mark it local unless a global statement names it, then answer each read using only the checklist.",
   "Extend: ask fast finishers to write a nested function that reads a variable from its enclosing function, explain where the E in LEGB fits, and predict what happens if the inner function tries to assign to that variable."
  ]
 },
 {
  "t": "The exception hierarchy: BaseException, Exception, SystemExit, KeyboardInterrupt, ArithmeticError, LookupError",
  "objectives": [
   "Students will be able to sketch Python's exception hierarchy from BaseException down to the classes named in the exam objectives.",
   "Students will be able to explain why SystemExit and KeyboardInterrupt sit outside Exception.",
   "Students will be able to predict which except clause catches a given exception using parent-child relationships.",
   "Students will be able to choose an appropriately broad or narrow exception class for a handling scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students suggest what should happen when a user presses Ctrl+C in a program that ignores errors."
   ],
   [
    12,
    "Teach",
    "Draw the tree on the board from BaseException downward, adding one branch at a time and saying each parent-child pair aloud. Demonstrate `issubclass()` on the projector for three pairs, including KeyboardInterrupt and Exception."
   ],
   [
    18,
    "Activity",
    "Run the exception family tree build described below in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on broad versus narrow handlers."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If a program catches every possible error so it never crashes, what might go wrong when you try to stop it on purpose?",
  "activity": {
   "title": "Build the exception family tree",
   "materials": "Printed cards with one exception class name each (BaseException, Exception, SystemExit, KeyboardInterrupt, ArithmeticError, ZeroDivisionError, OverflowError, LookupError, IndexError, KeyError, TypeError, ValueError, NameError, RuntimeError, RecursionError), tape or sticky putty, whiteboard, a set of printed scenario cards.",
   "steps": [
    "Give each group a shuffled set of class cards. Groups arrange them into a tree on their desk or a section of the whiteboard, with the root at the top.",
    "Groups compare their tree with the one in the lesson and fix any misplaced cards, writing a one-line reason for each fix.",
    "Hand out scenario cards such as \"Ctrl+C pressed\", \"`[1, 2][7]`\" or \"`10 / 0`\". For each, groups place a sticky note on the class raised and trace upward, listing every except class that would catch it.",
    "For each scenario, groups mark whether `except Exception:` catches it.",
    "Each group presents one scenario and its upward trace to the class."
   ]
  },
  "discussion": [
   "What are the risks of catching very broad classes such as Exception, and when is it still a reasonable choice?",
   "Why might grouping errors into families such as LookupError make code easier to write and read?"
  ],
  "exit": [
   [
    "What class is the root of every Python exception?",
    "BaseException."
   ],
   [
    "Does `except LookupError:` catch a KeyError?",
    "Yes, because KeyError is a subclass of LookupError."
   ],
   [
    "Why does `except Exception:` let Ctrl+C stop a program?",
    "KeyboardInterrupt inherits directly from BaseException, not from Exception, so it is not caught."
   ]
  ],
  "differentiation": [
   "Support: give students a partially completed tree with the top two levels already filled in, so they only place the specific classes under the correct families.",
   "Extend: ask fast finishers to use `issubclass()` in a browser-based interpreter to find where OverflowError, RecursionError and UnboundLocalError sit, and to write one handler order that treats each family differently."
  ]
 },
 {
  "t": "Common built-in exceptions: ZeroDivisionError, IndexError, KeyError, TypeError, ValueError, NameError",
  "objectives": [
   "Students will be able to name the exception raised by short snippets involving the six common built-in exceptions.",
   "Students will be able to distinguish TypeError from ValueError using the same-type-different-value test.",
   "Students will be able to read the last line of a traceback to identify the exception type and message.",
   "Students will be able to propose a check or fix that prevents each of the six exceptions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question. Students write a guess on a sticky note and stick it on the board under one of six exception names."
   ],
   [
    12,
    "Teach",
    "Present each exception with one or two triggering snippets, running them live so students see the final traceback line. Spend extra time on TypeError versus ValueError, writing the quick test on the board: would a different value of the same type have worked?"
   ],
   [
    18,
    "Activity",
    "Run the exception bingo activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect exception names to debugging habits."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Python runs `int(\"hello\")`. Is the problem that you gave it the wrong kind of thing, or the right kind of thing with the wrong contents?",
  "activity": {
   "title": "Exception bingo",
   "materials": "Printed bingo cards with a 3 by 3 grid of exception names (repeated names allowed), a projector, a prepared list of about 20 one-line snippets, markers.",
   "steps": [
    "Hand each student a bingo card. Explain that each square is an exception name and that they will mark a square when a snippet raises that exception.",
    "Project one snippet at a time, such as `\"a\" + 1`, `[0][1]` or `int(\"3.5\")`. Give students 20 seconds to decide silently and mark a square.",
    "After each snippet, a randomly chosen student says the answer and the reason, using the words type, value, lookup, arithmetic or name.",
    "Include a few snippets that raise nothing, such as `0 / 5` or `[1, 2][5:9]`, so students learn not to mark anything.",
    "The first student to complete a line explains each of their marked squares to confirm the win, then the class reviews any snippet that caused disagreement."
   ]
  },
  "discussion": [
   "Why is reading the last line of a traceback first a good habit when debugging?",
   "When is it better to check a value before an operation, and when is it better to try the operation and handle the exception?"
  ],
  "exit": [
   [
    "Which exception does `int(\"12a\")` raise?",
    "ValueError."
   ],
   [
    "Which exception does `[10, 20].index(30)` raise?",
    "ValueError, because 30 is not in the list."
   ],
   [
    "Which exception does `\"age: \" + 30` raise?",
    "TypeError, because a string and an integer cannot be concatenated."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a decision flowchart: Is it division by zero? Is it a position or a key? Is the name defined? Could another value of the same type work? Have them follow it for every snippet.",
   "Extend: ask fast finishers to write one line of their own for each of the six exceptions plus one that looks like an error but is not, then swap with a partner and solve each other's lines."
  ]
 },
 {
  "t": "Try-except, except with several exceptions, bare except and except Exception",
  "objectives": [
   "Students will be able to trace the flow of a try statement with multiple except clauses for a given input.",
   "Students will be able to handle several exception types with one clause using a tuple, and access the exception object with as.",
   "Students will be able to compare a bare except with except Exception and justify which to use.",
   "Students will be able to explain when else and finally blocks run and place the clauses in the correct order."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect two or three answers about what a program should do when a user types letters where a number is expected."
   ],
   [
    12,
    "Teach",
    "Trace the lesson's first example on the projector three times with inputs 4, abc and 0, highlighting skipped lines in a different color. Add a tuple handler, then else and finally, and compare a bare except with except Exception."
   ],
   [
    18,
    "Activity",
    "Run the pair tracing relay described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on how broad handlers can hide bugs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A program asks for your age and you type \"twelve\". What should a well-written program do next, and what does a poorly written one do?",
  "activity": {
   "title": "Try statement tracing relay",
   "materials": "Printed try statements with try, except, else and finally blocks (about 6), a list of inputs for each, highlighters, whiteboard, student laptops with a browser for checking.",
   "steps": [
    "Pair students and give each pair a printed try statement and three inputs to test.",
    "For each input, one partner highlights the lines that run while the other writes the exact output; they swap roles for the next input.",
    "Pairs check one input of their choice in a browser-based interpreter and note any line they highlighted wrongly.",
    "Each pair then rewrites one handler in their snippet: replace a bare except with a specific class or a tuple, and explain what changes.",
    "Two pairs share their before-and-after versions on the whiteboard for the class to critique."
   ]
  },
  "discussion": [
   "Why can a bare except make a program look more reliable while actually making it harder to maintain?",
   "What kinds of code belong in an else block rather than inside the try block, and why?"
  ],
  "exit": [
   [
    "If the second line of a try block raises an error, does the third line run?",
    "No; the try block is abandoned and control goes to the first matching except clause."
   ],
   [
    "Write a single except clause that handles both KeyError and IndexError.",
    "`except (KeyError, IndexError):`"
   ],
   [
    "When does a finally block run?",
    "Every time, whether the try block raised an exception or not, and whether it was handled or not."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a flow diagram with boxes for try, each except, else and finally, and have them trace each input by moving a token through the boxes before writing output.",
   "Extend: ask fast finishers to design a try statement where the same code produces four different outputs for four different inputs, including one that triggers else, and swap with a partner to trace."
  ]
 },
 {
  "t": "Ordering except branches from specific to general",
  "objectives": [
   "Students will be able to apply the first-match rule to predict which except clause runs.",
   "Students will be able to identify unreachable except branches caused by a parent class appearing above a child class.",
   "Students will be able to reorder except clauses from most specific to most general.",
   "Students will be able to explain when the order of except clauses does not matter."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the laundry-basket warm-up question and let students answer aloud."
   ],
   [
    12,
    "Teach",
    "Display the LookupError-before-IndexError example and run it. Ask why the second message never appears. Redraw the relevant part of the hierarchy and walk through the divide() example with three different calls."
   ],
   [
    18,
    "Activity",
    "Run the handler line-up activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on why Python stays silent about dead branches."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If the first basket in a laundry room says \"clothes\" and the second says \"socks\", where does a sock end up?",
  "activity": {
   "title": "Handler line-up",
   "materials": "Printed cards, each with one except clause (such as `except Exception`, `except LookupError`, `except KeyError`, `except ZeroDivisionError`, `except ArithmeticError`, `except ValueError`), a printed exception tree for reference, scenario slips naming a raised exception, whiteboard.",
   "steps": [
    "Give each group a shuffled set of handler cards and ask them to lay the cards in a vertical line in any order.",
    "Draw a scenario slip, such as \"KeyError raised\". Groups walk down their line and mark the first card that matches, writing which branch runs.",
    "After three scenarios, groups list any card that never ran and explain which earlier card blocked it.",
    "Groups reorder their cards so every card can run for at least one scenario, keeping Exception last.",
    "Groups compare final orders with a neighbor and discuss why two different orders can both be correct when classes are unrelated."
   ]
  },
  "discussion": [
   "Why do you think Python does not warn you about an unreachable except clause?",
   "How could a team catch dead branches during code review or testing?"
  ],
  "exit": [
   [
    "What prints for `[1][5]` if the handlers are `except LookupError: print(\"L\")` then `except IndexError: print(\"I\")`?",
    "L, because IndexError is a subclass of LookupError and the first match wins."
   ],
   [
    "Put these in a working order: except Exception, except KeyError, except LookupError.",
    "except KeyError, then except LookupError, then except Exception."
   ],
   [
    "Does swapping `except TypeError` and `except KeyError` change which branch runs?",
    "No, because the classes are unrelated, so any exception matches at most one of them."
   ]
  ],
  "differentiation": [
   "Support: give students the exception tree printed on the same page as each snippet, and have them draw an arrow from the raised exception upward, circling every ancestor before reading the handlers.",
   "Extend: ask fast finishers to write a handler chain of five clauses with exactly one unreachable branch, swap with a partner, and challenge the partner to find it and fix the order."
  ]
 },
 {
  "t": "Propagating exceptions through function boundaries and deciding where to handle them",
  "objectives": [
   "Students will be able to trace an exception as it propagates through nested function calls, including finally blocks on the way up.",
   "Students will be able to read a traceback to identify where an exception was raised and how the program reached that point.",
   "Students will be able to use raise and a bare raise to signal and re-raise exceptions.",
   "Students will be able to justify at which level of a program an exception should be handled."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about passing a problem up a chain of people, and collect examples from school or work."
   ],
   [
    12,
    "Teach",
    "Trace the parse and read_age example on the board, crossing out lines that are skipped. Show a sample traceback on the projector and read it from the bottom up. Introduce raise, a bare raise and finally on the way up."
   ],
   [
    18,
    "Activity",
    "Run the pass-the-problem role-play described below, then the handler placement debate."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to discuss design decisions about where to catch errors."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "When a cashier cannot solve a customer's problem, who should solve it, and what should the cashier not do?",
  "activity": {
   "title": "Pass the problem",
   "materials": "Printed role cards for three functions (top level, menu, helper) with their code, a printed \"exception\" card, sticky notes, whiteboard, printed scenario sheets for the debate.",
   "steps": [
    "Three volunteers each hold a role card showing one function's code; the top level calls the menu, which calls the helper. The rest of the class follows along on printed copies.",
    "The helper reads its code aloud until it reaches the line that raises, then holds up the exception card. Anything after that line is crossed out on the board.",
    "The exception card is passed to the caller. Each volunteer checks: is my call inside a try with a matching except? If not, read any finally aloud and pass the card up.",
    "Run the scenario twice: once with the handler at the top level, once with it moved into the helper that returns None, and record the final output each time.",
    "In small groups, students read two printed scenarios and decide which level should handle the exception, writing a one-sentence justification to share."
   ]
  },
  "discussion": [
   "What are the costs of catching an exception too early, deep inside a helper function?",
   "How does a traceback help you understand not just what went wrong, but how the program got there?"
  ],
  "exit": [
   [
    "If b() raises ValueError with no handler and a() called b() inside a try with `except ValueError`, where is it handled?",
    "In a(), at the except clause around the call to b()."
   ],
   [
    "Does a function's return statement run after an exception escapes it?",
    "No; the function stops at the failing line."
   ],
   [
    "What does a bare raise do inside an except block?",
    "It re-raises the current exception so it continues propagating to the caller."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a call-chain diagram with one box per function and a checkbox for \"matching except here?\" and \"finally here?\", so they move upward one box at a time while tracing.",
   "Extend: ask fast finishers to write a three-function program where the middle function logs an error and re-raises it with a bare raise, then predict and verify the complete output in a browser-based interpreter."
  ]
 }
]);
