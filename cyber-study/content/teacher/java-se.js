/* Teacher edition for Oracle Certified Professional: Java SE Developer (1Z0-831 (Java SE 25)): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("java-se", [
 {
  "t": "Primitive types, literals (underscores, binary/hex/octal), default values",
  "objectives": [
   "Students will be able to list the eight Java primitive types with their sizes and identify which are signed, unsigned or non-numeric.",
   "Students will be able to determine the type and value of int, long, float, double, char, binary, octal and hexadecimal literals.",
   "Students will be able to judge whether a literal with underscores or suffixes is legal.",
   "Students will be able to explain which variables receive default values and spot uninitialized local variables that cause compile errors."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write `010`, `0x10` and `0b10` on the board and ask students to guess each value privately, then reveal 8, 16 and 2. Ask who guessed 10 for the first one and use that to introduce the idea that the way a literal is written changes its meaning."
   ],
   [
    15,
    "Teach",
    "Present the eight primitive types in a table with bit sizes. Explain int and double as the default literal types and show why L and f suffixes are needed. Walk through the four bases and the underscore rule (between two digits), then contrast field and array defaults with local variables, using a short snippet that fails to compile because of an unassigned local."
   ],
   [
    15,
    "Activity",
    "Run the card sort described below. Circulate and ask each pair to justify one 'does not compile' card out loud."
   ],
   [
    5,
    "Discuss",
    "Pick the three cards that caused the most disagreement and resolve them together on the projector, reading the compiler message if a laptop is available."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "If you write the number 010 in a Java program, what value do you think it has, and why might a language choose to read it differently from how it looks?",
  "activity": {
   "title": "Compile or not: literal card sort",
   "materials": "Printed cards (one literal or short declaration per card, about 20 cards per pair), whiteboard, optional student laptops with a browser-based Java playground or jshell.",
   "steps": [
    "Prepare cards such as `long a = 3_000_000_000;`, `float b = 1.5;`, `int c = 0b1010_1010;`, `int d = 0_17;`, `int e = 09;`, `double f = 1_.5;`, `char g = 65;` and `int h = 0x_FF;`.",
    "Pairs sort cards into two piles: compiles and does not compile. For every compiling card they write the stored value on the card.",
    "Pairs swap piles with a neighboring pair and mark any card they disagree with.",
    "If laptops are available, pairs test the disputed cards and record the compiler message.",
    "Each pair writes one rule on a sticky note that would have prevented their most common mistake and posts it on the board."
   ]
  },
  "discussion": [
   "Why do you think Java designers chose to make an unadorned whole number an int rather than picking the smallest type that fits?",
   "Fields get default values but local variables do not. What kinds of bugs does that rule prevent?"
  ],
  "exit": [
   [
    "What is the value of `0x1A + 010`?",
    "34, because 0x1A is 26 and 010 is octal 8."
   ],
   [
    "Why does `float f = 2.0;` fail to compile?",
    "2.0 is a double literal, and assigning a double to a float is narrowing without a cast. Use 2.0f."
   ],
   [
    "A method declares `int n;` and later prints it without assigning it. What happens?",
    "It does not compile, because local variables have no default value and must be definitely assigned before use."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a reference strip with the eight types, their bit sizes, the four literal prefixes and the one-line underscore rule, and let them use it during the card sort.",
   "Extend: ask fast finishers to work out the decimal value of `0b1111_1111` and `0377`, then explain why `byte b = 0b1000_0000;` fails while `byte b = (byte) 0b1000_0000;` gives -128."
  ]
 },
 {
  "t": "Wrapper classes, autoboxing/unboxing and Integer caching with ==",
  "objectives": [
   "Students will be able to name the wrapper class for each primitive and explain why wrappers are needed for collections and generics.",
   "Students will be able to identify where the compiler autoboxes or unboxes and predict a NullPointerException from unboxing null.",
   "Students will be able to predict the result of == and equals on wrapper objects, including the effect of the Integer cache.",
   "Students will be able to apply the widening, boxing, varargs order to choose the overload a call selects."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project two lines, `Integer a = 127, b = 127;` and `Integer c = 128, d = 128;`, and ask students to vote on what `a == b` and `c == d` print. Record the votes without revealing the answer."
   ],
   [
    15,
    "Teach",
    "Explain wrappers and why `List<int>` is illegal. Show the code the compiler inserts for boxing (valueOf) and unboxing (intValue). Reveal the warm-up answer and explain identity versus value and the cache range. Cover parseInt versus valueOf, the no widen-then-box rule, and the three-phase overload order."
   ],
   [
    15,
    "Activity",
    "Run the 'Same box or same value' pair exercise described below."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to share the snippet that surprised them most and connect each one back to either identity, unboxing null or overload phases."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If two people each write the number 500 on a separate sticky note, are the notes equal? Are they the same note? How might a programming language need to tell those two ideas apart?",
  "activity": {
   "title": "Same box or same value",
   "materials": "Printed sheets with 10 short code snippets, sticky notes in two colors, whiteboard, optional student laptops with a browser-based Java playground.",
   "steps": [
    "Hand each pair a sheet of snippets covering == on cached and uncached Integers, == between Integer and int, equals between Long and Integer, unboxing a null from a Map, and overloads such as m(long) versus m(Integer).",
    "For each snippet, pairs write the predicted output, or 'compile error' or 'exception', on a sticky note and stick it next to the snippet number on the board.",
    "Pairs label each prediction with the rule that justifies it: identity, cache, unboxing, no widen-then-box, or overload phase.",
    "If laptops are available, pairs run three snippets of their choice and correct any wrong predictions.",
    "The class reviews the board together, and the teacher circles the snippets with split predictions for the discussion."
   ]
  },
  "discussion": [
   "Why might the Java designers have chosen to cache small Integer values at all, given that it makes == behave inconsistently?",
   "When would you deliberately choose Integer over int for a field, knowing that it can be null?"
  ],
  "exit": [
   [
    "What does `Integer p = 50, q = 50; System.out.println(p == q);` print, and why?",
    "true, because 50 is in the -128 to 127 cache, so both references point to the same object."
   ],
   [
    "Given `Map<String,Integer> m = new HashMap<>(); int v = m.get(\"x\");`, what happens at runtime?",
    "A NullPointerException, because get returns null and unboxing null fails."
   ],
   [
    "With overloads `go(long)` and `go(Integer)`, which runs for `go(3)`?",
    "go(long), because widening is tried before boxing."
   ]
  ],
  "differentiation": [
   "Support: give students a two-column reference card listing each primitive with its wrapper and the cache range, and let them first classify snippets only as 'identity comparison' or 'value comparison' before predicting outputs.",
   "Extend: ask fast finishers to explain why `Integer i = 10; Long l = 10L; System.out.println(i.equals(l));` prints false, and to design an overload set where a call needs varargs to compile."
  ]
 },
 {
  "t": "Operator precedence, increment/decrement, compound assignment with implicit casts",
  "objectives": [
   "Students will be able to order Java operators by precedence and distinguish grouping from left-to-right operand evaluation.",
   "Students will be able to trace prefix and postfix increment and decrement expressions to a final value.",
   "Students will be able to explain why compound assignment compiles where the equivalent long form fails, and predict overflow or truncation.",
   "Students will be able to predict when && and || skip their right operand."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write `int x = 3; int y = x++ * 2 + ++x;` on the board and have each student write the value of y on a scrap of paper. Collect a quick show of hands for 10, 11 and 12."
   ],
   [
    15,
    "Teach",
    "Present the precedence ladder from postfix down to assignment. Emphasize that operands still evaluate left to right and solve the warm-up step by step. Show `x = x++`, the short-circuit operators with a null check, and the hidden cast in compound assignment with the byte overflow and `i *= 2.5` examples. Finish with integer division and remainder signs."
   ],
   [
    15,
    "Activity",
    "Run the 'Human interpreter' exercise described below."
   ],
   [
    5,
    "Discuss",
    "Ask groups which expression they found hardest, and have one group explain the trick that cracked it."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "In math class, 2 + 3 x 4 is 14, not 20. Who decides that, and what would happen to software if every programmer used a different rule?",
  "activity": {
   "title": "Human interpreter",
   "materials": "Printed expression cards (about 12), whiteboard divided into columns, markers, sticky notes.",
   "steps": [
    "Split the class into groups of three: one reads the expression, one is the 'memory' who writes each variable's current value on the board, and one is the 'evaluator' who announces each operand's value from left to right.",
    "Each group draws a card, such as `int a = 2; a += a++ * 2;`, `byte b = 120; b += 10;`, `int n = 0; boolean ok = n != 0 && 10 / n > 1;` or `int x = 5; x = x++;`.",
    "The memory student updates values after every increment and the evaluator writes the final result, or 'compile error' or 'exception'.",
    "Groups rotate roles and repeat with a new card until each student has played every role.",
    "Groups post their hardest card and its answer on a sticky note for the class to verify."
   ]
  },
  "discussion": [
   "Is the hidden cast in compound assignment a helpful convenience or a dangerous source of bugs? Defend your view.",
   "Why do you think professional style guides often discourage using ++ inside larger expressions?"
  ],
  "exit": [
   [
    "What is y after `int x = 2; int y = ++x * x++;`?",
    "9. ++x makes x 3 and yields 3, then x++ yields 3 and makes x 4, so y is 3 x 3 = 9."
   ],
   [
    "Does `byte b = 10; b = b * 2;` compile? What about `b *= 2;`?",
    "The first does not compile, because b * 2 is an int; the second compiles because *= casts back to byte."
   ],
   [
    "In `if (s != null && s.length() > 3)`, why is there no NullPointerException when s is null?",
    "&& short-circuits: `s != null` is false, so `s.length()` is never evaluated."
   ]
  ],
  "differentiation": [
   "Support: give students a printed precedence ladder and a trace table with columns for each variable, and start them on expressions with only one increment before moving to mixed expressions.",
   "Extend: ask fast finishers to evaluate `int i = 1; i += i++ + ++i;` and to explain why `char c = 'A'; c += 1.7;` compiles and what character results."
  ]
 },
 {
  "t": "Widening and narrowing conversions, casting and numeric promotion rules",
  "objectives": [
   "Students will be able to state the widening chain for Java primitives and identify conversions that need an explicit cast.",
   "Students will be able to predict the result of narrowing casts, including truncation and bit wrap-around.",
   "Students will be able to apply binary numeric promotion rules to determine the type of an arithmetic expression.",
   "Students will be able to explain the compile-time constant exception and diagnose overflow caused by promotion."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show `long ms = 30 * 24 * 60 * 60 * 1000;` and ask students to predict whether the value is correct. Reveal that it prints a negative number and ask for theories."
   ],
   [
    15,
    "Teach",
    "Draw the widening chain as arrows on the board with char joining at int. Demonstrate narrowing casts with truncation and wrap-around, then teach the two-step promotion rule and the constant exception. Return to the warm-up and fix it with 30L."
   ],
   [
    15,
    "Activity",
    "Run the 'Type detectives' card exercise described below."
   ],
   [
    5,
    "Discuss",
    "Ask teams which rule caught them most often and why the language designers might have chosen to promote small types to int."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Your variable is a long, which can hold numbers in the quintillions. Can a calculation stored in it still overflow? Write down your guess and one reason.",
  "activity": {
   "title": "Type detectives",
   "materials": "Printed cards with expressions or declarations, a large printed promotion flowchart or one drawn on the whiteboard, sticky notes, optional laptops with a browser-based Java playground.",
   "steps": [
    "Teams of three receive 12 cards such as `byte x = 10; byte y = x * 2;`, `short s = 'z';`, `float f = 10L;`, `int i = (int) 9.99 * 2;`, `long l = 50_000 * 50_000;` and `char c = (char) 65.9;`.",
    "For each card, teams write the expression type, whether it compiles, and the value if it does.",
    "Teams trace each card on the promotion flowchart and mark which rule applied: widening, promotion, constant exception or cast.",
    "Two teams swap cards and audit each other's answers, flagging disagreements with a sticky note.",
    "If laptops are available, teams verify flagged cards and note the compiler message for any that fail."
   ]
  },
  "discussion": [
   "Java allows long to float widening even though it can lose precision. Was that a good design choice?",
   "How could a code reviewer spot promotion overflow bugs before they reach production?"
  ],
  "exit": [
   [
    "What type is `'A' + (short) 1`, and what is its value?",
    "int, with value 66, because char and short are both promoted to int."
   ],
   [
    "Does `int n = 7; byte b = n;` compile?",
    "No. n is not a compile-time constant, so narrowing to byte needs a cast."
   ],
   [
    "What is `(int) -8.9`?",
    "-8, because casting truncates toward zero."
   ]
  ],
  "differentiation": [
   "Support: provide a laminated flowchart with the four promotion questions in order (is either double, float, long, else int) and let students trace each card with a finger before answering.",
   "Extend: ask fast finishers to predict and explain the output of `System.out.println((int) (char) -1);` and of `(float) 16_777_217`."
  ]
 },
 {
  "t": "Math API: round, floor, ceil, abs, max/min, pow",
  "objectives": [
   "Students will be able to state the return type of Math.round, floor, ceil, abs, max, min and pow for given argument types.",
   "Students will be able to predict results for negative numbers and halfway values, distinguishing floor, ceil, round and an (int) cast.",
   "Students will be able to identify Math expressions that do not compile because of their return types.",
   "Students will be able to choose the right Math method for a practical rounding requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to round -2.5 to the nearest whole number on paper, then ask how many wrote -3 and how many wrote -2. Use the split to motivate precise rules."
   ],
   [
    15,
    "Teach",
    "Draw a number line from -3 to 3 on the board. Mark floor, ceil, round and (int) moves with differently colored arrows for 1.5 and -1.5. Then present a table of return types for each method, stressing round(double) returning long and pow returning double. Show the abs(Integer.MIN_VALUE) edge case."
   ],
   [
    15,
    "Activity",
    "Run the 'Number line relay' activity described below."
   ],
   [
    5,
    "Discuss",
    "Ask teams to share one real situation where floor is right and one where ceil is right."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A taxi company charges for every started kilometer, and a parking garage charges only for every full hour. Which one rounds up and which rounds down, and does rounding toward zero always mean the same thing?",
  "activity": {
   "title": "Number line relay",
   "materials": "Whiteboard with a large number line from -5 to 5, colored markers, printed cards each showing one Math expression, optional laptops with jshell or a browser-based Java playground.",
   "steps": [
    "Divide the class into teams of four and give each team a stack of cards such as `Math.round(-3.5)`, `Math.floor(-0.2)`, `Math.ceil(2.01)`, `(int) -4.9`, `Math.max(3, 3L)`, `Math.pow(2, 4)` and `int x = Math.round(1.5);`.",
    "One student at a time runs to the board, marks the result on the number line with the team's color and writes the result type next to it, or writes 'compile error'.",
    "Teammates may challenge before the next runner goes; challenges are settled by the rules sheet or by running the expression in jshell.",
    "After all cards are placed, teams look for patterns: where floor and (int) differ, and which expressions failed because of return types.",
    "Each team writes one rule they want to remember on a sticky note and posts it beside the number line."
   ]
  },
  "discussion": [
   "Why might Java's designers have made round(double) return long instead of int?",
   "If you were billing customers, when would rounding halves toward positive infinity be unfair, and what would you use instead?"
  ],
  "exit": [
   [
    "What does `Math.floor(-3.2)` return?",
    "-4.0, a double, because floor moves toward negative infinity."
   ],
   [
    "Does `int p = Math.pow(2, 5);` compile?",
    "No. pow returns a double, so a cast such as (int) Math.pow(2, 5) is required."
   ],
   [
    "What is `Math.round(2.5f)` and what is its type?",
    "3, an int, because round(float) returns int and halves round up."
   ]
  ],
  "differentiation": [
   "Support: provide a printed number line and a return-type cheat sheet, and have students first work only with positive values before moving to negatives.",
   "Extend: ask fast finishers to explain why `Math.abs(Integer.MIN_VALUE)` is negative, and to compare `-7 / 2` and `-7 % 2` with `Math.floorDiv(-7, 2)` and `Math.floorMod(-7, 2)`."
  ]
 },
 {
  "t": "String immutability and key methods: substring, indexOf, charAt, strip, repeat, isBlank",
  "objectives": [
   "Students will be able to explain String immutability and identify code where a method's result is discarded.",
   "Students will be able to compute the results of substring, indexOf, lastIndexOf and charAt, including out-of-range cases.",
   "Students will be able to distinguish strip from trim and isEmpty from isBlank, and predict repeat results.",
   "Students will be able to compare strings correctly, explaining when == and equals differ."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show `String s = \"hello\"; s.toUpperCase(); System.out.println(s);` and ask students to write the output. Reveal `hello` and ask why."
   ],
   [
    15,
    "Teach",
    "Explain immutability with the photocopy picture. Write the word DEVELOP on the board with index numbers 0 to 6 beneath each letter and demonstrate substring with an exclusive end, charAt, indexOf and lastIndexOf. Contrast strip with trim, isEmpty with isBlank, and show repeat. Finish with the string pool and == versus equals."
   ],
   [
    15,
    "Activity",
    "Run the 'Paper string' exercise described below."
   ],
   [
    5,
    "Discuss",
    "Ask pairs which method surprised them most and where they have seen blank-input bugs in apps they use."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If you photocopy a page and highlight the copy, has the original page changed? How might that idea apply to text in a program?",
  "activity": {
   "title": "Paper string",
   "materials": "Strips of paper with one character per square and index numbers underneath, scissors, printed code snippets, optional laptops with jshell or a browser-based Java playground.",
   "steps": [
    "Give each pair a paper strip spelling a word such as `\"  Coffee  \"`, including the spaces as empty squares.",
    "For each snippet, such as `s.strip()`, `s.strip().substring(1, 4)`, `s.indexOf('f')`, `s.charAt(10)` and `\"ab\".repeat(0)`, pairs physically cut a copy of the strip to model the result, never cutting the original.",
    "Pairs record each result on paper, or write 'exception' with the exception name when an index is out of range.",
    "Include two snippets where the result is not assigned, and ask pairs to state the original variable's value afterwards.",
    "Pairs verify three of their answers in jshell if laptops are available and correct any mistakes."
   ]
  },
  "discussion": [
   "Why is it useful for HashMap keys that String is immutable?",
   "Where in a real application would you choose isBlank over isEmpty, and is there any case where isEmpty is the better check?"
  ],
  "exit": [
   [
    "What is `\"computer\".substring(3)`?",
    "\"puter\", the characters from index 3 to the end."
   ],
   [
    "What does `\"  hi  \".isBlank()` return, and what does `\"\".isBlank()` return?",
    "false for the first because it contains letters, and true for the empty string."
   ],
   [
    "After `String a = \"x\"; a.repeat(3);`, what is a?",
    "\"x\". repeat returns a new string, which was not assigned."
   ]
  ],
  "differentiation": [
   "Support: provide pre-printed index strips for each word so students can point to positions, and start with charAt and substring(begin) before introducing the two-argument form.",
   "Extend: ask fast finishers to predict the output of `String a = \"ja\"; String b = a + \"va\"; System.out.println(b == \"java\");` and then explain how making `a` final changes the result."
  ]
 },
 {
  "t": "StringBuilder methods: append, insert, reverse, delete, replace",
  "objectives": [
   "Students will be able to explain the difference between mutable StringBuilder and immutable String, including why unassigned calls still take effect.",
   "Students will be able to trace append, insert, reverse, delete, deleteCharAt and replace calls to the final content.",
   "Students will be able to identify aliasing created by chained calls and assigned return values.",
   "Students will be able to compare StringBuilder contents correctly instead of relying on equals."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show two snippets side by side: `s.concat(\"x\")` on a String and `sb.append(\"x\")` on a StringBuilder, each followed by a print. Ask students to predict both outputs."
   ],
   [
    15,
    "Teach",
    "Use the whiteboard-versus-printed-page picture. Walk through the main example line by line, writing the builder's content and index numbers after each call. Highlight the exclusive end, the lenient end for delete and replace, aliasing through returned references, and the equals trap."
   ],
   [
    15,
    "Activity",
    "Run the 'Builder trace race' described below."
   ],
   [
    5,
    "Discuss",
    "Ask groups when they would choose StringBuilder over String in their own code and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "When you edit a shared document online, everyone sees your change right away. When you edit a printed copy, nobody does. Which is more like a Java String, and which is like a StringBuilder?",
  "activity": {
   "title": "Builder trace race",
   "materials": "Printed trace sheets with 6 short programs, a grid of squares for writing characters with index numbers, pencils, optional laptops with a browser-based Java playground.",
   "steps": [
    "Pairs receive trace sheets. Each program creates a StringBuilder and applies five or six calls, including at least one unassigned call, one chained call and one call with an end index past the length.",
    "For each line, pairs write the builder's full content in the grid, one character per square, with indexes beneath.",
    "Include one program where `StringBuilder b2 = sb.append(...)` creates an alias, and ask pairs to show the content of both references at the end.",
    "Pairs compare final answers with another pair and resolve differences by retracing together.",
    "If laptops are available, pairs run the two programs they disagreed on most and note which rule they had missed."
   ]
  },
  "discussion": [
   "Why might the Java designers have chosen not to override equals in StringBuilder?",
   "What risks come with passing a StringBuilder into a method you did not write?"
  ],
  "exit": [
   [
    "What does `new StringBuilder(\"hello\").insert(2, \"XY\")` contain?",
    "heXYllo, because the text is inserted before index 2."
   ],
   [
    "After `StringBuilder a = new StringBuilder(\"1\"); StringBuilder b = a.append(\"2\"); b.append(\"3\");`, what does a contain?",
    "123, because a and b refer to the same builder."
   ],
   [
    "How should you check whether two StringBuilder objects hold the same text?",
    "Use sb1.compareTo(sb2) == 0 or compare sb1.toString() with sb2.toString() using equals, not sb1.equals(sb2)."
   ]
  ],
  "differentiation": [
   "Support: let students use paper squares they can physically insert, remove and rearrange to model each call before writing the result, and start with append and reverse before range methods.",
   "Extend: ask fast finishers to explain what `new StringBuilder('a').length()` returns and why, and to write a one-line expression that checks whether a word is a palindrome using StringBuilder."
  ]
 },
 {
  "t": "Text blocks: incidental whitespace, \\ line continuation, \\s escape",
  "objectives": [
   "Students will be able to identify valid and invalid text block syntax, including the rule for the opening delimiter.",
   "Students will be able to compute the incidental whitespace removed from a text block, including the effect of the closing delimiter's position.",
   "Students will be able to predict the effect of trailing-space stripping, the \\s escape and the line continuation backslash.",
   "Students will be able to determine whether a text block's value ends with a newline."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project an old-style string with many escaped quotes and \\n sequences holding a small JSON object, and ask students to rewrite it so a human can read it. Collect ideas."
   ],
   [
    15,
    "Teach",
    "Introduce text block syntax and show the same JSON as a text block. Draw dots for spaces on the board and model the incidental-whitespace algorithm step by step, including blank lines and the closing delimiter. Demonstrate trailing-space stripping, then \\s and the line continuation, and show when there is a final newline."
   ],
   [
    15,
    "Activity",
    "Run the 'Dot grid' exercise described below."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to describe a real situation where trailing spaces or a final newline would matter, such as file formats or test assertions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "When you paste text into an email, the spacing sometimes changes. How would you want a programming language to treat the indentation of a multi-line message written inside indented code?",
  "activity": {
   "title": "Dot grid",
   "materials": "Printed sheets of text blocks drawn on grid paper with each space shown as a dot, colored pencils, optional laptops with jshell or a browser-based Java playground.",
   "steps": [
    "Give pairs six text blocks on grid paper, each with a different situation: closing delimiter on its own line at various indents, delimiter at the end of the last line, a blank line, trailing spaces, a \\s escape and a line continuation.",
    "Pairs shade the incidental whitespace columns in one color and any trailing spaces that will be stripped in another.",
    "Pairs then write the resulting string using visible markers, such as a dot for each space and \\n for each newline.",
    "Pairs compare with another pair and resolve differences by recounting columns.",
    "If laptops are available, pairs check two answers by printing each block wrapped in square brackets."
   ]
  },
  "discussion": [
   "Why do you think the Java designers chose to strip trailing spaces automatically rather than keep everything exactly as typed?",
   "Is the position of the closing delimiter an intuitive way to control indentation? What alternative might you design?"
  ],
  "exit": [
   [
    "Does `String s = \"\"\"Hi\"\"\";` compile?",
    "No. Content cannot appear on the same line as the opening delimiter."
   ],
   [
    "A text block has content lines `  a` and `    b` (2 and 4 spaces) and the closing delimiter is at the end of the `b` line. What is its value?",
    "\"a\\n  b\", with 2 spaces removed from each line and no trailing newline."
   ],
   [
    "How do you keep a trailing space at the end of a text block line?",
    "Write it as the \\s escape, which is translated after trailing spaces are stripped."
   ]
  ],
  "differentiation": [
   "Support: give students grids with column numbers printed along the top so they can count indentation directly, and start with blocks that have no escapes.",
   "Extend: ask fast finishers to predict the value of a text block that mixes a tab and spaces in its indentation, and to explain why `stripIndent()` gives the same result as the compiler."
  ]
 },
 {
  "t": "Date-Time API: LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Instant",
  "objectives": [
   "Students will be able to choose the correct java.time class for a requirement based on whether it needs a date, a time, a zone or an exact instant.",
   "Students will be able to predict results of factory methods, plus methods and month-end adjustment, including runtime exceptions for invalid values.",
   "Students will be able to identify code that does not compile because a method does not exist on a given type, or that has no effect because a result is discarded.",
   "Students will be able to convert between LocalDateTime, ZonedDateTime and Instant and read their ISO-8601 output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students: 'If I say the meeting is at 9:00 on Friday, what extra information might someone in another country need?' Collect answers on the board."
   ],
   [
    15,
    "Teach",
    "Present the five classes as a ladder of information, using a slide or board table with an example value for each. Show factory methods, immutability with a discarded plusDays, month numbering and end-of-month clamping, the methods that exist on each type, conversions with atTime, atZone and toInstant, and the ISO-8601 printed forms."
   ],
   [
    15,
    "Activity",
    "Run the 'Pick the class' scenario sort described below."
   ],
   [
    5,
    "Discuss",
    "Ask groups to share one scenario they argued about and how they settled it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Write down a date and time that would mean exactly the same moment to everyone on earth. What did you have to include?",
  "activity": {
   "title": "Pick the class",
   "materials": "Printed scenario cards (about 15), five large labeled zones on the whiteboard for LocalDate, LocalTime, LocalDateTime, ZonedDateTime and Instant, sticky notes, optional laptops with jshell.",
   "steps": [
    "Groups of three receive scenario cards such as 'a national holiday', 'an alarm clock setting', 'a log entry written by a server', 'a video call between London and Sydney', 'a form field for appointment date and time at one local clinic' and 'a passport expiry date'.",
    "Groups place each card in a class zone on the board and write a one-line justification on a sticky note.",
    "For five of the cards, groups write the factory call that creates an example value, such as LocalTime.of(7, 30).",
    "Then hand out four code snippets with traps (a discarded plusDays, LocalDate.of(2025, 2, 29), plusHours on a LocalDate, plusMonths on January 31) and have groups predict output, 'compile error' or 'exception'.",
    "If laptops are available, groups verify the snippets in jshell and fix any wrong predictions."
   ]
  },
  "discussion": [
   "Why do you think the designers of java.time made every class immutable?",
   "When is it acceptable to store a LocalDateTime rather than a ZonedDateTime or Instant?"
  ],
  "exit": [
   [
    "Which class records the exact moment a server received a request, independent of location?",
    "Instant, because it is a point on the UTC timeline."
   ],
   [
    "What does `LocalTime.of(22, 30).plusHours(3)` return?",
    "01:30, because LocalTime wraps around midnight."
   ],
   [
    "What is printed after `LocalDate d = LocalDate.of(2025, 5, 1); d.plusWeeks(1); System.out.println(d);`?",
    "2025-05-01, because the result of plusWeeks was not assigned."
   ]
  ],
  "differentiation": [
   "Support: give students a one-page chart showing each class, what it contains, a sample printed value and its main plus methods, and let them use it during the scenario sort.",
   "Extend: ask fast finishers to write code that takes a LocalDateTime for a meeting in Chicago, converts it to the local time in Tokyo, and explains why the date may change."
  ]
 },
 {
  "t": "Period vs Duration and daylight saving time transitions",
  "objectives": [
   "Students will be able to distinguish Period from Duration and choose the right one for a business requirement.",
   "Students will be able to read and predict the ISO-8601 toString output of Period and Duration values.",
   "Students will be able to identify static-factory chaining traps and runtime exceptions from mismatched amounts and types.",
   "Students will be able to predict how plusDays and plusHours behave on a ZonedDateTime across DST gaps and overlaps."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: 'If your alarm is set for 7:00 every day and the clocks spring forward tonight, how many hours will pass between tomorrow's alarm and today's?' Collect answers and note the disagreement."
   ],
   [
    15,
    "Teach",
    "Contrast Period and Duration with the calendar-versus-stopwatch picture. Show factories, between methods and ISO-8601 output, including PT24H. Demonstrate the static chaining trap. Draw a timeline of a spring-forward night on the board showing the gap from 02:00 to 03:00, then compare plusDays(1) and plusHours(24) on a ZonedDateTime, and repeat briefly for the fall overlap."
   ],
   [
    15,
    "Activity",
    "Run the 'Clock change role-play' described below."
   ],
   [
    5,
    "Discuss",
    "Ask teams which real features they would build with Period and which with Duration, and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Is 'one day from now' always the same as '24 hours from now'? Write yes or no and one reason.",
  "activity": {
   "title": "Clock change role-play",
   "materials": "Two large paper clock faces or a projected clock, a whiteboard timeline, printed requirement cards, sticky notes, optional laptops with jshell.",
   "steps": [
    "Divide students into 'Calendar' and 'Stopwatch' teams. Draw a timeline on the board for the night clocks spring forward, marking the skipped hour.",
    "The teacher reads a requirement card, such as 'remind me at 8:00 every day', 'charge parking by the hour', 'renew every month' or 'session timeout after 30 minutes'.",
    "Each team argues for 30 seconds why its tool fits, then the class votes and records the decision with the matching code (plusDays, plus(Period...), Duration.between and so on).",
    "For three of the cards, students move a sticky note along the timeline to show where plusDays(1) and plusHours(24) land when starting at noon the day before the change.",
    "If laptops are available, a volunteer runs the example from the lesson in jshell to confirm the 12:00 versus 13:00 results and the PT23H duration."
   ]
  },
  "discussion": [
   "Why do you think Java keeps Period and Duration as separate classes instead of one general amount of time?",
   "What problems could a system have if it stored all event times as LocalDateTime in a country that uses daylight saving time?"
  ],
  "exit": [
   [
    "What does `Period.of(0, 14, 0)` print, and what does `normalized()` change?",
    "P14M; normalized() turns it into P1Y2M."
   ],
   [
    "A ZonedDateTime is at 12:00 the day before clocks spring forward. What clock time does plusHours(24) give?",
    "13:00, because exactly 24 hours pass and the skipped hour moves the clock reading forward."
   ],
   [
    "Which class should measure how long a server request took?",
    "Duration, because it measures exact elapsed time, ideally between two Instant values."
   ]
  ],
  "differentiation": [
   "Support: give students a two-column organizer, with Period on the left (years, months, days; P...) and Duration on the right (hours, minutes, seconds; PT...), and have them sort example values into it before tackling DST.",
   "Extend: ask fast finishers to work out what 01:30 on a fall-back night in New York prints by default, what withLaterOffsetAtOverlap() prints, and how many minutes separate the two."
  ]
 },
 {
  "t": "If/else and the ternary operator",
  "objectives": [
   "Students will be able to trace if, else if and else chains, including unbraced branches and the dangling else rule.",
   "Students will be able to identify conditions that do not compile or that misbehave, such as non-boolean conditions, assignment in a condition and a stray semicolon.",
   "Students will be able to determine the value and result type of a ternary expression, including which branch is evaluated.",
   "Students will be able to choose between if/else and the ternary operator for a given task."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the dangling else example from the lesson with misleading indentation and ask students to write the output. Count how many choose A, B or nothing."
   ],
   [
    15,
    "Teach",
    "Explain boolean-only conditions, else if ordering and the one-statement rule for unbraced branches. Redraw the warm-up code with braces added to show the true structure. Cover assignment in conditions, the stray semicolon and if (false). Then teach the ternary: evaluation of one branch only, right-associativity, result types and why it cannot be a statement."
   ],
   [
    15,
    "Activity",
    "Run the 'Brace it' pair exercise described below."
   ],
   [
    5,
    "Discuss",
    "Ask pairs whether their team would require braces on every if, and what they would allow in a ternary."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If a sign says 'Wet floor' and three hallways are lined up behind it, which hallway does the sign apply to? How would a computer decide?",
  "activity": {
   "title": "Brace it",
   "materials": "Printed code snippets (8 per pair) with misleading indentation, colored pens, whiteboard, optional laptops with a browser-based Java playground.",
   "steps": [
    "Give pairs eight snippets: unbraced if blocks with two indented lines, nested ifs with a dangling else, an if followed by a semicolon, if (flag = false), if (count) with an int, and three ternaries with mixed types.",
    "Pairs rewrite each snippet with explicit braces in colored pen, showing exactly which statements each if and else controls, or mark it 'does not compile'.",
    "For the ternaries, pairs write the result type and value and circle the branch that is never evaluated.",
    "Pairs swap sheets with a neighbor, who checks the brace placement and challenges any disagreement.",
    "If laptops are available, pairs run their two most disputed snippets and note the actual output or compiler message."
   ]
  },
  "discussion": [
   "Many style guides require braces even for one-line if statements. Is that worth the extra lines? Why or why not?",
   "When does a ternary make code clearer, and when does it make code harder to read?"
  ],
  "exit": [
   [
    "In `if (a) if (b) x(); else y();`, which if does the else belong to?",
    "The inner if (b), because an else binds to the nearest unmatched if."
   ],
   [
    "Does `String s = ok ? \"yes\" : 0;` compile?",
    "No. The result type is a common supertype of String and Integer, not String, so it cannot be assigned to a String."
   ],
   [
    "After `int n = 4; int m = n > 3 ? n-- : n++;`, what are n and m?",
    "n is 3 and m is 4. Only the true branch runs, and n-- yields 4 before decrementing."
   ]
  ],
  "differentiation": [
   "Support: give students a checklist to apply to every snippet: 1) is the condition boolean, 2) is there a semicolon after the condition, 3) draw braces around one statement per unbraced if or else, 4) match each else to the nearest open if.",
   "Extend: ask fast finishers to determine the result type of `flag ? 'a' : 0` and of `flag ? 1 : null`, and to explain why `int v = false ? 1 : null;` compiles but throws at runtime."
  ]
 },
 {
  "t": "Classic switch statements, fall-through and break",
  "objectives": [
   "Students will be able to list which selector types a classic switch statement accepts and identify selectors that do not compile.",
   "Students will be able to trace fall-through in a colon-form switch, including a default label placed in the middle.",
   "Students will be able to identify invalid case labels such as non-constant variables and duplicates.",
   "Students will be able to explain the effect of break inside a switch nested in a loop and of a null String selector."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a five-line classic switch with a missing break and ask students to predict the output silently, then reveal answers by show of hands. Do not confirm the correct answer yet."
   ],
   [
    12,
    "Teach",
    "Explain selectors, constant labels and the entry-point idea. Trace the Tue Wed example on the board line by line, then move default into the middle and trace again. Mention case-sensitive String matching and the null selector exception."
   ],
   [
    18,
    "Activity",
    "Run the Human Switch activity described below, then have pairs trace three printed switch snippets."
   ],
   [
    5,
    "Discuss",
    "Ask when fall-through is useful on purpose and how a team could prevent accidental fall-through in reviews."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Without running it, what does this print when x is 2: switch (x) { case 1: print(\"A\"); case 2: print(\"B\"); case 3: print(\"C\"); break; default: print(\"D\"); }",
  "activity": {
   "title": "The Human Switch",
   "materials": "Printed label cards (case 1, case 2, case 3, default, break), sticky notes with print statements, whiteboard, three printed tracing snippets per pair.",
   "steps": [
    "Line up five students holding label cards in a row; give each of the first four a sticky note with a word to say aloud.",
    "Call out a selector value. The matching student starts speaking their word, and each following student speaks in turn until the student holding the break card raises it.",
    "Move the default card to the middle of the line and repeat with a value that matches nothing, so the class sees fall-through after default.",
    "Hand out three printed snippets: one with a missing break, one with default in the middle, and one with a non-final variable as a label. Pairs write the output or 'does not compile' and a one-line reason.",
    "Review answers on the board, asking a different pair to explain each one."
   ]
  },
  "discussion": [
   "Fall-through is sometimes intentional. How would you signal to a reviewer that a missing break is deliberate?",
   "Why might the language designers have limited classic switch selectors to a small set of types?"
  ],
  "exit": [
   [
    "Name two selector types a classic switch does not accept.",
    "Any two of long, float, double and boolean."
   ],
   [
    "In switch (x) { default: print(\"D\"); case 1: print(\"1\"); break; } with x equal to 5, what prints?",
    "D1, because default is entered and execution falls through into case 1 until the break."
   ],
   [
    "A switch is inside a for loop and a case runs break. What happens to the loop?",
    "The loop continues; the unlabeled break exits only the switch."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a tracing template with one row per line of the switch and a column for 'runs or skipped', and have them start at the entry point and shade every line down to the break.",
   "Extend: Ask fast finishers to rewrite one snippet with arrow labels and explain how the output changes, and to find a case where intentional fall-through is the clearest design."
  ]
 },
 {
  "t": "Switch expressions with arrow labels, multiple labels and yield",
  "objectives": [
   "Students will be able to write a switch expression with arrow labels, multiple labels and a block branch that uses yield.",
   "Students will be able to determine whether a switch expression is exhaustive for int, String and enum selectors.",
   "Students will be able to identify compile errors caused by return, break, missing yield or mixed label styles.",
   "Students will be able to compare the exhaustiveness rules for switch expressions and arrow-form switch statements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a classic switch with a missing break and ask how a new feature could rule out that bug entirely. Collect ideas."
   ],
   [
    12,
    "Teach",
    "Rewrite the warm-up switch as a switch expression on the board. Introduce arrows, multiple labels, block branches with yield, and throw branches. Explain exhaustiveness with int, String and enum selectors, and contrast statement versus expression."
   ],
   [
    18,
    "Activity",
    "Run the Fix the Compiler card activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss why omitting default on an enum switch expression can be a deliberate safety choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Have you ever forgotten a break in a switch? What would you want a language to do so that mistake becomes impossible?",
  "activity": {
   "title": "Fix the Compiler",
   "materials": "Printed cards, each with a short switch expression that has zero, one or two compile errors; whiteboard; student laptops with a browser-based Java playground if available.",
   "steps": [
    "Give each pair six cards. Some compile; others have a missing default, a block without yield, a return inside the expression, mixed colon and arrow labels, or branches of incompatible types.",
    "Pairs sort the cards into 'compiles' and 'does not compile', writing the specific error on each failing card.",
    "For each failing card, pairs write the smallest fix in the margin.",
    "If laptops are available, pairs test two of their fixes in a browser Java playground and note any surprise.",
    "The teacher reveals the answers and asks pairs to explain the cards where the class disagreed."
   ]
  },
  "discussion": [
   "When would you choose a switch statement with arrows rather than a switch expression?",
   "Is it better to add a default that throws or to leave default out of an enum switch expression? What does each choice give you?"
  ],
  "exit": [
   [
    "Does String s = switch (n) { case 1 -> \"one\"; case 2 -> \"two\"; }; compile when n is an int?",
    "No. A switch expression over an int needs default to be exhaustive."
   ],
   [
    "How does a block branch in a switch expression supply its value?",
    "With a yield statement, such as yield \"value\";."
   ],
   [
    "Can a switch statement with arrow labels over an int skip values without a default?",
    "Yes. Only switch expressions, and pattern switches, must be exhaustive."
   ]
  ],
  "differentiation": [
   "Support: Give students a four-item checklist card (default, yield, no return or break, compatible types) and have them tick each item for every snippet before deciding.",
   "Extend: Challenge fast finishers to write a switch expression using colon labels and yield that shows fall-through between groups, and explain why the arrow form is preferred."
  ]
 },
 {
  "t": "Pattern matching in switch: type patterns, record patterns and when guards",
  "objectives": [
   "Students will be able to write a pattern switch using type patterns, record patterns and when guards.",
   "Students will be able to trace which case a given input matches, including inputs that fail a guard.",
   "Students will be able to explain how case null and default interact when the selector is null.",
   "Students will be able to order guarded and unguarded cases so that none is dominated."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project an if-else instanceof chain with casts and ask students what is repetitive and error-prone about it."
   ],
   [
    12,
    "Teach",
    "Rewrite the chain as a pattern switch. Introduce type patterns, record patterns with var and nesting, the unnamed pattern, when guards and case null. Trace the describe example with four inputs."
   ],
   [
    18,
    "Activity",
    "Run the Route the Message activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss what changed when a guarded case was moved below the unguarded one, and why the compiler cares."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here is an if-else chain with three instanceof checks and three casts. What could go wrong when someone adds a fourth type next month?",
  "activity": {
   "title": "Route the Message",
   "materials": "Printed input cards (a Circle with radius 12, a Circle with radius 3, a Square, a String, an Integer, null), a projected pattern switch, sticky notes, student laptops with a browser Java playground if available.",
   "steps": [
    "Project the describe method from the lesson. Give each group a shuffled stack of input cards.",
    "For each card, the group places it on a sticky note labeled with the case it matches, writing the returned text.",
    "Swap the order of the guarded Circle case and the unguarded Circle case on the projected code and ask groups to predict what the compiler does.",
    "Groups then write a new case for a record Triangle(double base, double height) using a record pattern with one unnamed component, and decide where it goes.",
    "If laptops are available, groups run their version and compare output with their predictions."
   ]
  },
  "discussion": [
   "What does pattern matching in switch give you that a chain of instanceof checks does not?",
   "Why do you think the designers made default not match null by itself?"
  ],
  "exit": [
   [
    "What does case Circle(double r) when r > 10 match?",
    "Only Circle objects whose radius is greater than 10."
   ],
   [
    "A pattern switch has default but no case null. What happens with a null selector?",
    "It throws NullPointerException."
   ],
   [
    "Where must a guarded case go relative to an unguarded case for the same type?",
    "Before it; otherwise the guarded case is dominated and the code does not compile."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart card that asks, for each case in order: does the type match, does the guard pass, then stop here; students follow it for every input.",
   "Extend: Ask fast finishers to write a nested record pattern for a Line made of two Points and use the unnamed pattern for values they do not need."
  ]
 },
 {
  "t": "Case dominance and exhaustiveness (enums, sealed types, default)",
  "objectives": [
   "Students will be able to identify dominated case labels involving subtypes, guards, constants and default.",
   "Students will be able to determine whether a switch is exhaustive for enum, sealed and open selector types.",
   "Students will be able to reorder case labels from specific to general so that a switch compiles.",
   "Students will be able to explain why omitting default on a sealed or enum switch is a deliberate design choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a switch with case Number n before case Integer i and ask: which case runs for the value 7? Let students notice that the Integer case can never run."
   ],
   [
    12,
    "Teach",
    "Present the three dominance rules, the guard exception, constants-first ordering, default last and the default-plus-unconditional conflict. Then explain exhaustiveness for enums, sealed types and open types, and mention MatchException."
   ],
   [
    18,
    "Activity",
    "Run the Order the Cases card sort described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the trade-off between default and relying on exhaustiveness when a hierarchy grows."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a switch checks case Number n before case Integer i, which case handles the value 7, and what should the compiler say about the other?",
  "activity": {
   "title": "Order the Cases",
   "materials": "Printed case-label cards (for example case 42, case Integer i when i > 0, case Integer i, case Number n, case String s, default), sealed interface handouts, whiteboard.",
   "steps": [
    "Give each group an envelope of case-label cards and a selector type written on the front, such as Object or a sealed interface Vehicle permits Car, Truck.",
    "Groups arrange the cards into an order that compiles, removing any card that can never be reached or is not allowed.",
    "Groups then decide whether their switch is exhaustive and, if not, what one card would make it so.",
    "Swap envelopes with a neighbor group and check each other's order using the two questions: can every case be reached, and is every value handled.",
    "The teacher reviews a few arrangements on the board, including one that tries to use both default and case Object o."
   ]
  },
  "discussion": [
   "Suppose a sealed hierarchy gains a new subtype every few months. Would you rather have default or rely on exhaustiveness? Why?",
   "Why can the compiler not let a guarded pattern dominate later cases?"
  ],
  "exit": [
   [
    "Why does case CharSequence cs followed by case String s fail to compile?",
    "Every String is a CharSequence, so the String case is dominated and can never run."
   ],
   [
    "A switch expression over sealed interface Shape permits Circle, Square has cases for Circle and Square only. Does it compile?",
    "Yes. Covering every permitted subtype makes it exhaustive without default."
   ],
   [
    "What is the correct order for constant, guarded, unguarded and default labels of the same type?",
    "Constants, then guarded patterns, then unguarded patterns, then default."
   ]
  ],
  "differentiation": [
   "Support: Draw a nested-circle diagram (Object containing Number containing Integer) and have students place each case in its circle so they can see which earlier case already covers a later one.",
   "Extend: Ask fast finishers to explain what happens at runtime when a precompiled exhaustive switch meets a newly added subtype, and how a team should roll out such a change."
  ]
 },
 {
  "t": "While, do-while, for and enhanced for loops",
  "objectives": [
   "Students will be able to explain when the condition is tested in while, do-while and for loops.",
   "Students will be able to trace loop variables across iterations using a table.",
   "Students will be able to identify compile errors in loop syntax, such as a missing do-while semicolon or mixed types in a for initializer.",
   "Students will be able to choose the appropriate loop form for a given task and explain the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to describe, in plain words, the difference between 'look before you leap' and 'leap before you look', and connect it to while versus do-while."
   ],
   [
    12,
    "Teach",
    "Present the four loop forms with syntax on the board. Trace the lesson's code example with a variable table. Highlight the do-while semicolon, the for initializer rules, the for-each copy behavior, Map not being Iterable and ConcurrentModificationException."
   ],
   [
    18,
    "Activity",
    "Run the Loop Tracing Relay described below."
   ],
   [
    5,
    "Discuss",
    "Ask which loop students would pick for four short scenarios and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you check the fridge before deciding to cook, and when you taste soup before deciding to add salt, which one always happens at least once?",
  "activity": {
   "title": "Loop Tracing Relay",
   "materials": "Printed loop snippets (one per station), blank tracing tables, whiteboard, a timer on the projector.",
   "steps": [
    "Set up four stations around the room, each with one loop snippet: a while that runs zero times, a do-while that runs once, a two-variable for loop, and a for-each that modifies its loop variable.",
    "Groups spend about three minutes at each station filling in a tracing table and writing the final output or 'does not compile'.",
    "One station snippet secretly has a missing do-while semicolon or a mixed-type for initializer; groups must catch it.",
    "After rotating through all stations, groups compare answers with a neighbor group and resolve differences.",
    "The teacher reveals the answers and asks each group to explain one station to the class."
   ]
  },
  "discussion": [
   "Why do you think Java's for-each loop does not give you an index?",
   "When is an infinite loop with a break clearer than a loop with a complex condition?"
  ],
  "exit": [
   [
    "How many times does int x = 5; while (x < 5) { x++; } run its body?",
    "Zero times, because the condition is false before the first iteration."
   ],
   [
    "Does int[] a = {1, 2}; for (int v : a) v = 0; change a?",
    "No. The loop variable is a copy of each element."
   ],
   [
    "Which loop fits 'prompt the user at least once, then repeat until the input is valid'?",
    "A do-while loop, because its body runs before the condition is tested."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-drawn tracing table with the column headers already filled in and the first row completed, so they focus on the order of initialization, condition and update.",
   "Extend: Ask fast finishers to rewrite a for-each that removes elements from a list so it no longer throws ConcurrentModificationException, and explain why their version works."
  ]
 },
 {
  "t": "Break and continue, including labeled statements",
  "objectives": [
   "Students will be able to explain the difference between break and continue in for, while and do-while loops.",
   "Students will be able to trace nested loops that use labeled break and continue.",
   "Students will be able to identify illegal uses, such as continue outside a loop or a label that does not enclose the statement.",
   "Students will be able to predict how break and continue behave inside a switch nested in a loop."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: you are searching several boxes for a missing sock. What do you do when you find it, and what do you do when a box is taped shut? Map the answers to break and continue."
   ],
   [
    12,
    "Teach",
    "Show break and continue in single loops, including continue in a while loop that skips the increment. Introduce labels with the outer loop example and trace it on the board. Cover placement rules and the switch-inside-loop case."
   ],
   [
    18,
    "Activity",
    "Run the Grid Walk activity described below."
   ],
   [
    5,
    "Discuss",
    "Compare a labeled break with extracting a method and using return. Which reads better?"
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are searching a row of boxes for a missing sock. What do you do when you find it? What do you do when a box is taped shut and you skip it?",
  "activity": {
   "title": "Grid Walk",
   "materials": "A 3 by 3 grid drawn on the whiteboard or taped on the floor, printed nested-loop snippets with labeled break and continue, sticky notes.",
   "steps": [
    "Draw a 3 by 3 grid with row numbers i and column numbers j. A volunteer acts as the program counter and steps through cells in loop order.",
    "Read out a snippet aloud. When the snippet hits continue outer, the volunteer jumps to the start of the next row; on break outer, the volunteer steps off the grid.",
    "The class writes the printed output on sticky notes as the volunteer moves, then compares.",
    "Pairs then trace two printed snippets on their own, one with an unlabeled break inside a switch in a loop and one with continue in a while loop that skips the increment.",
    "Pairs mark any snippet that does not compile, such as continue in a switch outside a loop, and explain why."
   ]
  },
  "discussion": [
   "Labeled break is sometimes called a structured goto. Is it a good tool or a warning sign in real code?",
   "Why does Java let a label share a name with a variable?"
  ],
  "exit": [
   [
    "In a for loop, does continue skip the i++ update?",
    "No. The update runs before the condition is checked again."
   ],
   [
    "What does break outer; do inside an inner loop?",
    "It ends the loop labeled outer and every loop inside it; execution continues after the outer loop."
   ],
   [
    "Does continue inside a switch that is not in any loop compile?",
    "No. continue is only allowed inside a loop."
   ]
  ],
  "differentiation": [
   "Support: Give students colored arrows to draw on printed code: green for where break goes and orange for where continue goes, before writing any output.",
   "Extend: Ask fast finishers to rewrite a labeled-break search as a separate method that returns early and to compare readability and testability."
  ]
 },
 {
  "t": "Unreachable code and definite assignment compile errors",
  "objectives": [
   "Students will be able to identify unreachable statements after return, throw, break, continue and infinite loops.",
   "Students will be able to explain why if (false) compiles while while (false) does not.",
   "Students will be able to determine whether a local variable is definitely assigned before it is read.",
   "Students will be able to detect missing return statements and invalid assignments to final locals."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project four tiny methods and ask students to vote compiles or does not compile for each, without explanations yet."
   ],
   [
    12,
    "Teach",
    "Explain flow analysis, the main unreachable cases, constant expressions versus variables, the if exemption, definite assignment, final locals and missing returns. Revisit the warm-up votes with the rules."
   ],
   [
    18,
    "Activity",
    "Run the Compiler Inspector activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss why the compiler is deliberately conservative instead of trying to evaluate every condition."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Vote compiles or does not compile: a line after return; an if (false) block; a while (false) loop; a local int printed after being set only inside an if with no else.",
  "activity": {
   "title": "Compiler Inspector",
   "materials": "Printed method cards with short code snippets, red and green sticky dots, whiteboard, student laptops with a browser Java playground if available.",
   "steps": [
    "Give each pair ten method cards. Each card has a short method that may contain an unreachable statement, an unassigned local, a final assigned twice or a missing return.",
    "Pairs place a green dot on cards that compile and a red dot on cards that do not, writing the exact rule that fails.",
    "For each red card, pairs write the smallest change that fixes it.",
    "If laptops are available, pairs test three of their red cards in a browser Java playground and record the exact compiler message.",
    "The class builds a shared list on the whiteboard of compiler messages and the rule behind each one."
   ]
  },
  "discussion": [
   "Why might the designers have exempted if (false) but not while (false)?",
   "Would you rather have a compiler that is conservative or one that tries harder to prove your code is safe? What are the costs of each?"
  ],
  "exit": [
   [
    "Does while (false) { x++; } compile?",
    "No. The body is unreachable because the condition is the constant false."
   ],
   [
    "Does int x; if (flag) x = 1; else x = 2; System.out.println(x); compile?",
    "Yes. x is assigned on both paths, so it is definitely assigned."
   ],
   [
    "Why does int x; for (int i = 0; i < 3; i++) x = i; System.out.println(x); fail?",
    "The compiler assumes the loop might run zero times, so x is not definitely assigned when printed."
   ]
  ],
  "differentiation": [
   "Support: Have students draw a simple path diagram with arrows for each branch and loop, and mark where each variable is assigned, before deciding.",
   "Extend: Ask fast finishers to write a method using a while (true) loop with a break where a local is definitely assigned after the loop, and explain why the compiler accepts it."
  ]
 },
 {
  "t": "Classes, fields, methods, constructors, initializer blocks and initialization order",
  "objectives": [
   "Students will be able to explain when the compiler adds a default constructor and when an implicit super() call fails.",
   "Students will be able to trace the output of static and instance initializers and constructors across a parent and child class.",
   "Students will be able to distinguish a constructor from a method that shares the class name.",
   "Students will be able to explain pass-by-value for primitives and object references."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a class with a static block, an instance block and a constructor that each print a letter. Ask students to predict the output of creating two objects."
   ],
   [
    12,
    "Teach",
    "Explain fields, methods, constructors and the default constructor rule. Show implicit super() and its failure case. Present the two-phase initialization order and trace the A and B example. Finish with pass-by-value."
   ],
   [
    18,
    "Activity",
    "Run the Construction Line role-play described below."
   ],
   [
    5,
    "Discuss",
    "Discuss why Java builds the parent part first and what could go wrong if it did not."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A class prints S in a static block, I in an instance block and C in its constructor. What prints when you create two objects?",
  "activity": {
   "title": "Construction Line",
   "materials": "Printed role cards (Parent static, Child static, Parent init, Parent constructor, Child init, Child constructor), a whiteboard to record output, printed tracing snippets.",
   "steps": [
    "Hand six students the role cards. Each card holder says their label aloud when it is their turn to run.",
    "The teacher announces new Child(). The class must call out who runs next, and students speak in order. Record the output on the board.",
    "Announce new Child() a second time and ask the class who stays silent this time and why.",
    "Change the scenario: Parent now declares only Parent(String n). Ask the class whether Child() still compiles and how to fix it.",
    "Pairs then trace two printed snippets, one with field initializers mixed between blocks and one with a this(...) call, and compare answers."
   ]
  },
  "discussion": [
   "Why might the compiler stop providing a default constructor once you write any constructor?",
   "How does pass-by-value explain both surprising and unsurprising method behavior with objects?"
  ],
  "exit": [
   [
    "If a class declares only Car(String model), does new Car() compile?",
    "No. Declaring any constructor removes the default no-argument constructor."
   ],
   [
    "In what order do the parent constructor body and the child's instance initializers run?",
    "The parent constructor body runs first, then the child's instance initializers, then the child's constructor body."
   ],
   [
    "How many times does a static block run if you create five objects of the class?",
    "Once, when the class is first initialized."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column template labeled 'once per class' and 'every object', and have students sort each line of code into a column before tracing.",
   "Extend: Ask fast finishers to predict the output when a constructor calls this(...) and both constructors print, and to explain why instance initializers still run only once."
  ]
 },
 {
  "t": "Flexible constructor bodies (Java 25): statements before super(...) or this(...)",
  "objectives": [
   "Students will be able to describe how Java 25 flexible constructor bodies split a constructor into a prologue and an epilogue.",
   "Students will be able to classify statements as allowed or not allowed in the prologue.",
   "Students will be able to explain why assigning fields before super(...) helps when a superclass constructor calls an overridden method.",
   "Students will be able to state the initialization order for a constructor that has a prologue."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a pre-Java 25 constructor that uses a static helper inside super(...) to validate an argument. Ask students why the author did not just write an if statement first."
   ],
   [
    12,
    "Teach",
    "Introduce flexible constructor bodies, the prologue and epilogue, the top-level and at-most-once rules, and what the early construction context forbids and allows. Walk through the SavingsAccount example and the overridden-method problem."
   ],
   [
    18,
    "Activity",
    "Run the Prologue Gatekeeper card sort described below."
   ],
   [
    5,
    "Discuss",
    "Discuss how this feature changes the way students would write validation in constructors."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Before Java 25, why might a developer write super(checkPositive(cents)) instead of checking cents in an if statement first?",
  "activity": {
   "title": "Prologue Gatekeeper",
   "materials": "Printed statement cards, two labeled zones on the whiteboard (Allowed before super, Not allowed before super), sticky tape, printed constructor snippets.",
   "steps": [
    "Give each group a set of statement cards, such as: if (x < 0) throw ...; int half = x / 2; this.rate = r; System.out.println(this.name); helper(); Math.max(a, b); return; super.toString(); new Inner();",
    "Groups tape each card into the Allowed or Not allowed zone and write a one-line reason on it.",
    "Reveal the correct zones and discuss any disagreements, focusing on assign versus read for fields.",
    "Pairs then read three printed constructors and decide whether each compiles, including one with super(...) inside an if block.",
    "Each pair rewrites one failing constructor so it compiles while keeping the validation before super(...)."
   ]
  },
  "discussion": [
   "Why do you think the language still forbids reading fields in the prologue even though assigning them is allowed?",
   "Does validating arguments before super(...) change how you would design a class hierarchy?"
  ],
  "exit": [
   [
    "Can a Java 25 constructor throw an exception before calling super(...)?",
    "Yes. Throwing in the prologue is allowed and lets invalid input fail fast."
   ],
   [
    "Does Child(int x) { int y = this.count; super(); } compile?",
    "No. Reading an instance field in the prologue uses the object before it is initialized."
   ],
   [
    "In a constructor with a prologue, when do this class's instance initializers run?",
    "After the superclass constructor returns and before the epilogue."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-word rule card, 'write yes, read no', for fields, plus a list of allowed items (parameters, locals, static calls, throw) to check each statement against.",
   "Extend: Ask fast finishers to write a superclass constructor that calls an overridden method and show how assigning the subclass field in the prologue changes the printed value."
  ]
 },
 {
  "t": "Inheritance, overriding vs overloading vs hiding, polymorphism and casting",
  "objectives": [
   "Students will be able to distinguish overriding, overloading and hiding and predict which member is used in a given call.",
   "Students will be able to apply the overriding rules on return type, access level and checked exceptions.",
   "Students will be able to explain polymorphism as reference type deciding what can be called and object type deciding what runs.",
   "Students will be able to predict whether a reference cast fails at compile time, at runtime, or succeeds."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the Animal and Dog example without the comments and ask students to predict the three printed values."
   ],
   [
    12,
    "Teach",
    "Explain inheritance basics, then overriding rules, overloading resolution order, and hiding for statics and fields. Use the warm-up to show which members follow the object and which follow the reference. Finish with upcasting, downcasting and ClassCastException."
   ],
   [
    18,
    "Activity",
    "Run the Object or Reference card game described below."
   ],
   [
    5,
    "Discuss",
    "Discuss why Java chose to make fields and static methods follow the reference type."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Animal a = new Dog(); Both classes declare a name field, a static kind() method and a sound() method. Predict what a.sound(), a.name and a.kind() return.",
  "activity": {
   "title": "Object or Reference",
   "materials": "Printed scenario cards, two large signs on the whiteboard labeled Object decides and Reference decides, a third sign labeled Does not compile, sticky notes.",
   "steps": [
    "Give each group a deck of scenario cards, each with a short class pair and one expression, such as a.sound(), a.name, a.kind(), (Dog) a, (Integer) someString, or an overload call with an int argument.",
    "Groups place each card under Object decides, Reference decides or Does not compile, and write the result on a sticky note.",
    "Add a set of override cards that change return type, access or exceptions, and have groups mark each as legal or illegal with the rule.",
    "Groups swap decks with a neighbor and check each other's placements.",
    "The teacher reviews the trickiest cards, especially the downcast that compiles but throws ClassCastException."
   ]
  },
  "discussion": [
   "If fields followed the object instead of the reference, what problems or benefits would that create?",
   "When would you choose an overload over an override, or the reverse?"
  ],
  "exit": [
   [
    "Can a subclass override public void run() with protected void run()?",
    "No. An overriding method cannot have more restrictive access."
   ],
   [
    "Object o = \"hi\"; Integer i = (Integer) o; compiles. What happens at runtime?",
    "A ClassCastException is thrown, because the object is a String."
   ],
   [
    "With Parent p = new Child(); and a static method show() in both, which version does p.show() call?",
    "Parent's version, because static methods are hidden and chosen by the reference type."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision card with two questions for each call: is it an instance method that is overridden? If yes, look at the object; otherwise, look at the reference.",
   "Extend: Ask fast finishers to build an overload set with int, long, Integer and int... parameters and predict which is chosen for several argument types, then explain the order."
  ]
 },
 {
  "t": "Abstract classes and interfaces: default, static and private interface methods",
  "objectives": [
   "Students will be able to compare abstract classes and interfaces in terms of state, constructors, inheritance and method modifiers.",
   "Students will be able to explain how default, static and private interface methods are declared, inherited and called.",
   "Students will be able to resolve conflicting default methods using an override and InterfaceName.super.method().",
   "Students will be able to identify compile errors such as non-public implementations and static interface methods called through a class."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if forty classes implement an interface and you add one more abstract method to it, what happens? Collect predictions."
   ],
   [
    12,
    "Teach",
    "Cover abstract classes and their rules, then interfaces: implicit modifiers, constant fields, default, static and private methods. Walk through the Walker and Swimmer example, the class-wins rule and the public implementation requirement."
   ],
   [
    18,
    "Activity",
    "Run the Design Desk whiteboard activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss when an abstract class is a better choice than an interface and vice versa."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If forty classes implement an interface and you add one abstract method to it, what happens to those classes? Is there a way to add behavior without breaking them?",
  "activity": {
   "title": "Design Desk",
   "materials": "Whiteboard or large paper per group, markers, printed requirement cards, printed code snippets with interface conflicts.",
   "steps": [
    "Give each group a requirement card describing a small domain, such as payment methods that share a fee field plus a Refundable capability used by unrelated classes.",
    "Groups sketch the types on the whiteboard, labeling each as an abstract class or an interface and listing at least one default, one static and one private interface method with a reason for each.",
    "Hand out three code snippets: two conflicting defaults with no override, a static interface method called through an implementing class, and a package-access implementation of an interface method.",
    "Groups mark each snippet compiles or does not compile and write the fix, using InterfaceName.super.method() where needed.",
    "Groups present their design in one minute, and other groups ask one question about a choice."
   ]
  },
  "discussion": [
   "Default methods let interfaces carry behavior. Does that blur the line between interfaces and abstract classes? Where is the line now?",
   "Why do you think static interface methods are not inherited by implementing classes?"
  ],
  "exit": [
   [
    "Can an interface method be declared protected?",
    "No. Interface methods can be public or private only."
   ],
   [
    "How do you call Walker's version of a conflicting default method from inside Duck?",
    "Walker.super.move(); inside Duck's overriding method."
   ],
   [
    "Does Duck.info() compile if info() is a static method in the Walker interface that Duck implements?",
    "No. Static interface methods are not inherited; call Walker.info() instead."
   ]
  ],
  "differentiation": [
   "Support: Provide a comparison chart with rows for fields, constructors, method modifiers and how many a class can use, and have students fill it in before the activity.",
   "Extend: Ask fast finishers to create a scenario where a superclass method and an interface default share a signature, predict which runs, and explain the class-wins rule."
  ]
 },
 {
  "t": "Records: components, canonical and compact constructors, accessors, equals/toString",
  "objectives": [
   "Students will be able to list the members the compiler generates from a record header, including accessor names and the toString format.",
   "Students will be able to distinguish a long-form canonical constructor from a compact constructor and state what each may and may not assign.",
   "Students will be able to identify compile errors in record declarations, such as extra instance fields, extending a class or failing to delegate with this(...).",
   "Students will be able to predict the result of equals and toString on record instances."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a traditional Point class with fields, getters, equals, hashCode and toString. Ask students to count the lines and guess how many matter."
   ],
   [
    12,
    "Teach",
    "Replace it with `record Point(int x, int y) {}` and list each generated member on the board. Cover the structural rules (final, extends Record, no extra instance fields) and contrast long-form and compact constructors using the Range example."
   ],
   [
    15,
    "Activity",
    "Run the Compile or Not card sort in pairs, then review the trickiest cards as a class."
   ],
   [
    8,
    "Discuss",
    "Discuss shallow immutability with a List component and why value-based equality makes records good map keys."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "Here is a 40-line Point class. Which lines carry real information, and which could a compiler write for you?",
  "activity": {
   "title": "Compile or Not: record edition",
   "materials": "Printed cards, each showing a short record declaration or usage line (about 12 cards), sticky notes, whiteboard.",
   "steps": [
    "Give each pair a shuffled deck of cards. Examples: a compact constructor assigning this.x, a record with a static counter, a record extending a class, an accessor call p.getX(), an extra constructor calling this(0, 0).",
    "Pairs sort cards into Compiles and Does not compile piles, writing the reason on a sticky note for each failure.",
    "For cards that compile and print something, pairs write the expected output, such as Range[low=3, high=9].",
    "Pairs swap piles with a neighbor and challenge any card they disagree with.",
    "The teacher reveals answers on the projector and asks pairs who disagreed to explain their reasoning."
   ]
  },
  "discussion": [
   "If a record holds a List component, in what sense is it immutable and in what sense is it not?",
   "When would you choose an ordinary class instead of a record for a data type in a real project?"
  ],
  "exit": [
   [
    "What accessor does `record Book(String title)` generate?",
    "A public method title() returning the String; there is no getTitle()."
   ],
   [
    "Why does `Book { this.title = title.trim(); }` fail to compile?",
    "A compact constructor may not assign fields directly; it should reassign the parameter, title = title.trim(), and the compiler assigns the field."
   ],
   [
    "Are `new Book(\"Java\")` and another `new Book(\"Java\")` equal with equals?",
    "Yes. The generated equals compares all components, and both have the same title."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference that shows a record header next to the expanded class the compiler would generate, labeled member by member, to use during the card sort.",
   "Extend: Ask fast finishers to write a sealed interface with three record implementations and a switch that uses record patterns to deconstruct each one."
  ]
 },
 {
  "t": "Sealed classes and interfaces: permits, final, sealed and non-sealed subclasses",
  "objectives": [
   "Students will be able to declare a sealed class or interface with a permits clause and explain when permits may be omitted.",
   "Students will be able to choose the correct modifier (final, sealed or non-sealed) for each permitted subclass.",
   "Students will be able to identify package and module location errors for sealed hierarchies.",
   "Students will be able to explain how sealing enables an exhaustive switch without a default branch."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: what is the difference between a final class and an ordinary class? Collect answers and pose the question of whether there is something in between."
   ],
   [
    12,
    "Teach",
    "Introduce sealed and permits, the three continuation modifiers, records and enums as implicit cases, and the same-package or same-module rule. Walk through the Payment example and remove the default from the switch."
   ],
   [
    15,
    "Activity",
    "Run the hierarchy design exercise in small groups."
   ],
   [
    8,
    "Discuss",
    "Groups present their designs and the class identifies where non-sealed was a good or risky choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you were designing a payment system, would you want any developer anywhere to be able to invent a new payment type? Why or why not?",
  "activity": {
   "title": "Design a closed hierarchy",
   "materials": "Whiteboard or large paper per group, markers, printed scenario cards (vehicles, notifications, shapes, account events).",
   "steps": [
    "Each group draws one scenario card and lists the allowed kinds, for example Email, Sms and Push for notifications.",
    "Groups write the sealed interface declaration with a permits clause, then declare each subtype, choosing record, final, sealed or non-sealed and justifying the choice.",
    "Groups write a switch expression over the sealed type with no default and confirm it covers every subtype.",
    "The teacher announces a new requirement, such as adding a new kind, and groups list every line of code that must change.",
    "Groups trade boards and look for compile errors such as a missing modifier or a subtype not in permits."
   ]
  },
  "discussion": [
   "What do you gain and what do you give up by marking one branch of a sealed hierarchy as non-sealed?",
   "Why might Java require permitted subclasses to live in the same package when there is no named module?"
  ],
  "exit": [
   [
    "Name the three modifiers a permitted class can use.",
    "final, sealed and non-sealed."
   ],
   [
    "Why does a switch over a sealed interface with a case for each permitted record need no default?",
    "The compiler knows the complete list of permitted subtypes, so the switch is provably exhaustive."
   ],
   [
    "In classpath code with no module-info, can a permitted subclass be in a different package?",
    "No. In the unnamed module the sealed type and its permitted subclasses must be in the same package."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank template with the sealed interface and three subtype lines, where students only choose the modifier for each subtype and explain the choice in one sentence.",
   "Extend: Ask fast finishers to build a two-level sealed hierarchy in which one permitted subtype is itself sealed, then write a switch that handles every leaf type."
  ]
 },
 {
  "t": "Enums with fields, constructors, methods and values()/valueOf()/ordinal()",
  "objectives": [
   "Students will be able to declare an enum with fields, a constructor and methods using correct syntax, including the semicolon rule.",
   "Students will be able to predict the results of values(), valueOf(), name() and ordinal(), including the exception thrown by valueOf.",
   "Students will be able to explain when enum constructors run and trace their output.",
   "Students will be able to implement constant-specific behavior with an abstract method."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question and take three or four answers."
   ],
   [
    12,
    "Teach",
    "Cover private constructors, implicit Enum superclass, the generated methods, the semicolon rule and class-initialization timing with the Planet example, then constant-specific bodies."
   ],
   [
    15,
    "Activity",
    "Run the Trace the Enum pair exercise."
   ],
   [
    8,
    "Discuss",
    "Discuss why ordinals should not be persisted, using the Maple Ridge scenario from the hook."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why might a program use a fixed list of named values instead of plain strings like \"small\" and \"large\"? What could go wrong with strings?",
  "activity": {
   "title": "Trace the Enum",
   "materials": "Projector, printed handouts with four short enum programs, student laptops with a browser-based Java runner (optional).",
   "steps": [
    "Pairs receive four programs: one with constructor print statements, one calling valueOf with wrong case, one with a missing semicolon, one with an abstract method missing from a constant.",
    "For each program, pairs write either the exact output or the compile or runtime error.",
    "Pairs that finish early verify their predictions in a browser-based Java runner if laptops are available.",
    "The teacher walks through each program, emphasizing that constructors print once per constant at initialization."
   ]
  },
  "discussion": [
   "What are the risks of saving ordinal values, and are there any risks in saving names?",
   "When is a constant-specific method body clearer than a switch over the enum?"
  ],
  "exit": [
   [
    "What does `values()` return?",
    "A new array of all constants in declaration order."
   ],
   [
    "What happens with `Color.valueOf(\"red\")` when the constant is RED?",
    "IllegalArgumentException is thrown, because the match is case-sensitive."
   ],
   [
    "In an enum with three constants whose constructor prints \"x\", how many x's print the first time any constant is used?",
    "Three, one per constant, when the enum class initializes."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students an annotated enum skeleton that labels the constant list, the semicolon, the field, the private constructor and a method, and let them fill in values for a familiar example such as pizza sizes.",
   "Extend: Ask fast finishers to rewrite a switch-based calculator as an enum with an abstract apply method and constant-specific bodies, then use EnumMap to count how often each operation is used."
  ]
 },
 {
  "t": "Nested, inner, local and anonymous classes",
  "objectives": [
   "Students will be able to classify a nested class declaration as static nested, inner, local or anonymous.",
   "Students will be able to write the correct instantiation syntax for static nested and inner classes from inside and outside the outer class.",
   "Students will be able to apply the effectively final rule to variables captured by local classes, anonymous classes and lambdas.",
   "Students will be able to identify which access modifiers are legal for each kind of nested class."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the four declarations from the example code without labels and ask students to group them by how they look."
   ],
   [
    12,
    "Teach",
    "Name each kind, show its instantiation syntax on the board, explain the hidden outer reference, Outer.this, the effectively final rule and modifier rules."
   ],
   [
    15,
    "Activity",
    "Run the Four Corners classification and repair activity."
   ],
   [
    8,
    "Discuss",
    "Discuss when to choose static nested versus inner, and why lambdas replaced many anonymous classes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why might a programmer want to put one class inside another instead of in its own file?",
  "activity": {
   "title": "Four Corners: classify and repair",
   "materials": "Four signs taped to room corners (Static nested, Inner, Local, Anonymous), printed snippet cards, sticky notes.",
   "steps": [
    "Each student receives one snippet card showing a nested class declaration or instantiation line.",
    "Students walk to the corner that matches the kind of class on their card and compare cards with others there.",
    "Each corner group identifies which of its cards contain errors, such as new Outer.Inner() for an inner class or a captured variable that is reassigned.",
    "Groups write the corrected line on a sticky note and attach it to the card.",
    "Each group presents one error and fix to the class."
   ]
  },
  "discussion": [
   "What does an inner object cost in memory and coupling compared with a static nested object, and when is that cost worth paying?",
   "Why do you think Java requires captured local variables to be effectively final?"
  ],
  "exit": [
   [
    "Write the code to create a Builder declared as `static class Builder` inside Pizza.",
    "new Pizza.Builder()"
   ],
   [
    "Write the code to create an Inner from main when Inner is a non-static member of Outer.",
    "new Outer().new Inner()"
   ],
   [
    "Can an anonymous class declare a constructor? Why?",
    "No. It has no name, so a constructor cannot be declared; an instance initializer can be used instead."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart: Is it inside a method? Does it have a name? Is it marked static? Let them use it during the Four Corners activity.",
   "Extend: Ask fast finishers to rewrite an anonymous Comparator as a lambda and explain which capture and this-reference rules differ between the two."
  ]
 },
 {
  "t": "Instanceof pattern matching and flow scoping",
  "objectives": [
   "Students will be able to rewrite an instanceof test and cast as a single pattern-matching expression.",
   "Students will be able to determine where a pattern variable is in scope in if, else, &&, || and negated conditions.",
   "Students will be able to identify compile errors caused by incompatible types or name clashes with pattern variables.",
   "Students will be able to use a record pattern with instanceof to bind components."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project old-style instanceof code with a separate cast and ask what could go wrong when someone edits it later."
   ],
   [
    12,
    "Teach",
    "Introduce the pattern form, null behavior, and flow scoping for if, else, && and ||. Spend extra time on the negated early-return form, then show record patterns."
   ],
   [
    15,
    "Activity",
    "Run the Scope Highlighter exercise in pairs."
   ],
   [
    8,
    "Discuss",
    "Review the trickiest snippets and connect flow scoping to switch pattern matching."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "This code tests `obj instanceof String` on one line and casts it ten lines later. What could break if a teammate edits the lines in between?",
  "activity": {
   "title": "Scope Highlighter",
   "materials": "Printed handouts with six short methods using pattern variables, two colors of highlighter or colored pencils, projector.",
   "steps": [
    "Pairs receive six methods, each using a pattern variable in different positions: if block, else block, after &&, after ||, after a negated if that returns, after a negated if that does not return.",
    "Pairs highlight in one color every line where the pattern variable is in scope and in another color every attempted use that would not compile.",
    "For each compile error, pairs write the smallest change that fixes it.",
    "The teacher projects each method and pairs vote on the scope before the answer is revealed."
   ]
  },
  "discussion": [
   "Why does the compiler allow the pattern variable after a negated if that returns, but not after one that just prints a message?",
   "How does pattern matching make equals methods safer and shorter?"
  ],
  "exit": [
   [
    "Rewrite `if (o instanceof Integer) { int n = (Integer) o; }` using pattern matching.",
    "if (o instanceof Integer n) { ... } with n usable inside the block."
   ],
   [
    "Is `s` usable in `if (o instanceof String s && s.isBlank())`?",
    "Yes. The right side of && runs only when the match succeeded."
   ],
   [
    "What does `if (o instanceof String s)` do when o is null?",
    "The condition is false and s is not bound; no exception is thrown."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a truth-table worksheet for && and || that marks which side runs when the left side is true or false, and have them use it to decide scope.",
   "Extend: Ask fast finishers to write a method using nested record patterns, such as Line(Point(var x1, var y1), Point(var x2, var y2)), and explain what happens when any component is null."
  ]
 },
 {
  "t": "Encapsulation, immutable objects and var local type inference",
  "objectives": [
   "Students will be able to compare the four Java access levels and choose the narrowest suitable one.",
   "Students will be able to apply the five-part recipe to make a class immutable, including defensive copies.",
   "Students will be able to identify legal and illegal uses of var and state the inferred type of a var declaration.",
   "Students will be able to explain why final on a reference field does not guarantee immutability."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a class with public fields and ask students to list everything a caller could break."
   ],
   [
    12,
    "Teach",
    "Cover access levels, the immutability recipe with the Team example, and why final references still need defensive copies. Then present the var rules and surprising inferred types."
   ],
   [
    15,
    "Activity",
    "Run the Break It, Then Lock It pair exercise."
   ],
   [
    8,
    "Discuss",
    "Review var lines from the activity handout and discuss when var helps or hurts readability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here is a BankAccount class with a public balance field. Name three ways other code could put this object into a bad state.",
  "activity": {
   "title": "Break It, Then Lock It",
   "materials": "Printed handout with a mutable Schedule class and a list of ten var declarations, whiteboard, student laptops with a browser-based Java runner (optional).",
   "steps": [
    "Pairs read the Schedule class and write a short caller snippet that changes its internal state without calling any setter, for example by modifying a returned list.",
    "Pairs rewrite Schedule as an immutable class, marking each change with the recipe step it satisfies.",
    "Pairs swap rewritten classes with another pair, who try again to break them.",
    "Pairs then mark each of the ten var declarations as legal or illegal, writing the inferred type or the reason for the error.",
    "The teacher reviews the var answers on the board, focusing on the diamond, null and multiple-variable cases."
   ]
  },
  "discussion": [
   "Is a record automatically immutable? What would you need to add for a record with a List component?",
   "When does var make code clearer, and when does it hide information a reader needs?"
  ],
  "exit": [
   [
    "Which access level allows a subclass in another package to use a member, but not unrelated classes in that package?",
    "protected."
   ],
   [
    "Name two steps besides private final fields needed for an immutable class.",
    "Any two of: make the class final, provide no setters, initialize all fields in the constructor, make defensive copies of mutable inputs and outputs."
   ],
   [
    "Does `var a = 1, b = 2;` compile?",
    "No. A var declaration may declare only one variable."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist card with the five immutability steps and the five common var errors so struggling students can tick items off while reviewing the handout.",
   "Extend: Ask fast finishers to make an immutable class that holds a mutable array and a mutable custom object, and explain how deep their defensive copying must go."
  ]
 },
 {
  "t": "Object lifecycle and garbage collection eligibility",
  "objectives": [
   "Students will be able to explain the difference between an object being eligible for garbage collection and being collected.",
   "Students will be able to trace reference assignments line by line and count eligible objects at a given point.",
   "Students will be able to identify GC roots and explain why islands of isolation are eligible.",
   "Students will be able to describe common causes of memory leaks in Java and why System.gc() does not fix them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect guesses about who frees memory in Java."
   ],
   [
    10,
    "Teach",
    "Explain heap versus variables, GC roots, the three ways to lose a reference, eligible versus collected, and islands of isolation. Trace the Demo example on the board with boxes and arrows."
   ],
   [
    18,
    "Activity",
    "Run the Human Heap role-play."
   ],
   [
    7,
    "Discuss",
    "Discuss memory leaks through static collections and why finalize should not be used."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In some languages programmers must free memory themselves. What problems could that cause, and what problems might automatic cleanup introduce?",
  "activity": {
   "title": "The Human Heap",
   "materials": "Sticky notes labeled with variable names, sheets of paper labeled Object 1 to Object 6, string or yarn (or simply pointing arms), a projected code listing.",
   "steps": [
    "Volunteers hold object sheets at the front of the room; other students hold variable sticky notes and represent references by pointing at or holding string to an object.",
    "The teacher reveals the code one line at a time; students holding variables move their reference as each assignment, null or scope exit happens.",
    "After selected lines, the class identifies which objects have no reference from any variable or reachable object; those students sit down as eligible.",
    "Run a second listing that builds a two-node cycle and then drops both variables, so students see that the cycle still sits down.",
    "Pairs then trace a printed listing on paper and compare counts."
   ]
  },
  "discussion": [
   "If garbage collection is automatic, how can a Java program still run out of memory?",
   "Why is it a bad idea to depend on any code running at the moment an object is collected?"
  ],
  "exit": [
   [
    "Name two kinds of GC roots.",
    "Any two of: local variables or parameters of running methods, static fields, active threads."
   ],
   [
    "After `Obj a = new Obj(); Obj b = a; a = null;`, is the Obj eligible?",
    "No. b still refers to it."
   ],
   [
    "What does System.gc() guarantee?",
    "Nothing; it is only a request that the JVM may ignore."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn grid of object boxes for the paper trace so struggling students only need to draw and erase arrows as each line runs.",
   "Extend: Ask fast finishers to write a short program with a static List that leaks memory, then refactor it to remove the leak and explain why the fix works."
  ]
 },
 {
  "t": "Checked vs unchecked exceptions and the Throwable hierarchy",
  "objectives": [
   "Students will be able to draw the Throwable hierarchy showing Error, Exception and RuntimeException.",
   "Students will be able to classify common exceptions as checked or unchecked.",
   "Students will be able to apply the handle-or-declare rule to decide whether code compiles.",
   "Students will be able to distinguish throw from throws and describe the main Throwable methods."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board."
   ],
   [
    12,
    "Teach",
    "Draw the Throwable tree, mark the unchecked branches, explain handle-or-declare with the read and safe methods, and contrast throw with throws."
   ],
   [
    15,
    "Activity",
    "Run the exception card sort and hierarchy build."
   ],
   [
    8,
    "Discuss",
    "Discuss why Java designers made some exceptions checked and whether that design helps or burdens developers."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of two things that can go wrong when a program reads a file a user picked. Which is the program's fault, and which is not?",
  "activity": {
   "title": "Build the family tree",
   "materials": "Printed cards with exception class names (about 16, such as IOException, FileNotFoundException, NullPointerException, NumberFormatException, StackOverflowError), whiteboard, tape or sticky tack.",
   "steps": [
    "The teacher draws Throwable, Error, Exception and RuntimeException as an empty tree on the whiteboard.",
    "Small groups receive a set of cards and decide where each one belongs in the tree.",
    "Groups tape their cards to the whiteboard tree in turn, explaining each placement.",
    "The class shades the unchecked region (RuntimeException, Error and their subclasses) and confirms every card's classification.",
    "Groups then read three short methods on the projector and decide whether each compiles under handle-or-declare."
   ]
  },
  "discussion": [
   "Some languages have no checked exceptions at all. What might Java developers gain or lose without them?",
   "Why is catching Error generally a bad idea in application code?"
  ],
  "exit": [
   [
    "Is FileNotFoundException checked or unchecked?",
    "Checked; it extends IOException, which extends Exception but not RuntimeException."
   ],
   [
    "Does a method calling Integer.parseInt need a try/catch to compile?",
    "No. NumberFormatException is unchecked."
   ],
   [
    "What are the two direct subclasses of Throwable?",
    "Error and Exception."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed tree with RuntimeException and Error already shaded, so they focus on placing the individual exception cards.",
   "Extend: Ask fast finishers to write a method that wraps an IOException in a custom unchecked exception, then show how getCause() retrieves the original."
  ]
 },
 {
  "t": "Try/catch/finally flow, including return in try and finally",
  "objectives": [
   "Students will be able to state the structural rules for try, catch and finally, including required braces and block combinations.",
   "Students will be able to trace the order of execution through try, catch and finally for normal completion, handled exceptions and uncaught exceptions.",
   "Students will be able to predict the returned value when try and finally both interact with return.",
   "Students will be able to explain why return or throw in finally hides exceptions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about cleanup and take a few answers."
   ],
   [
    12,
    "Teach",
    "Cover structural rules, catch matching from top to bottom, when finally runs, the saved return value, and return in finally. Trace test() and override() on the board."
   ],
   [
    15,
    "Activity",
    "Run the Path Tracing Relay."
   ],
   [
    8,
    "Discuss",
    "Review the hardest traces and discuss why teams ban return in finally."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You borrow a friend's car and something goes wrong on the trip. What should you always do at the end, whether the trip went well or badly?",
  "activity": {
   "title": "Path Tracing Relay",
   "materials": "Printed cards with six short try/catch/finally programs, whiteboard split into columns, markers.",
   "steps": [
    "Divide the class into teams, each lined up in front of a whiteboard column.",
    "The teacher projects a program; the first student in each team writes the first block that runs, the next student writes the next block, and so on.",
    "The final student writes the exact output and either the returned value or the exception that reaches the caller.",
    "The teacher reveals the answer and awards a point for each fully correct trace; teams explain any step they got wrong.",
    "Programs include a return in try with a change in finally, a return in finally that hides an exception, a catch that throws, and a mutable return value."
   ]
  },
  "discussion": [
   "Why would a language allow return in finally if it is so dangerous?",
   "What cleanup in real programs belongs in finally, and what is better handled by try-with-resources?"
  ],
  "exit": [
   [
    "What does `int f() { int x = 1; try { return x; } finally { x = 2; } }` return?",
    "1, because the return value was saved before finally ran."
   ],
   [
    "Name one situation in which finally does not run.",
    "When the JVM exits, for example via System.exit(), or the process is killed."
   ],
   [
    "If try throws and finally returns 7, what does the caller see?",
    "A normal return of 7; the exception is discarded."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart template with try, catch, finally and after-statement boxes so they can trace each relay program by drawing arrows before writing output.",
   "Extend: Ask fast finishers to write a program in which finally throws a new exception and use getSuppressed or getCause to see whether the original exception is recoverable, then explain the result."
  ]
 },
 {
  "t": "Multi-catch rules: no related types; the catch variable is effectively final",
  "objectives": [
   "Students will be able to write correct multi-catch syntax with a single variable after the last type.",
   "Students will be able to determine whether the alternatives in a multi-catch are related by subclassing and therefore illegal.",
   "Students will be able to explain why the multi-catch parameter is implicitly final and contrast it with a single-type catch.",
   "Students will be able to identify which methods can be called on a multi-catch variable."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show two catch blocks with identical bodies and ask how students would remove the duplication."
   ],
   [
    12,
    "Teach",
    "Introduce multi-catch syntax, the related-types rule using a mini hierarchy diagram, the implicitly final parameter, the union type, and precise rethrow."
   ],
   [
    15,
    "Activity",
    "Run the Legal or Not multi-catch card sort."
   ],
   [
    8,
    "Discuss",
    "Discuss when combining handlers is appropriate and when separate handlers are clearer."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "These two catch blocks print the same message for different exceptions. What problems could appear if someone later changes only one of them?",
  "activity": {
   "title": "Legal or Not: multi-catch",
   "materials": "Printed hierarchy reference sheet (Exception, IOException, FileNotFoundException, RuntimeException, IllegalArgumentException, NumberFormatException, ArithmeticException), printed cards with 12 multi-catch lines, sticky notes.",
   "steps": [
    "Pairs receive the hierarchy sheet and the deck of multi-catch cards.",
    "For each card, pairs mark Legal or Not and, for illegal cards, write the reason (related types, reassigned variable, bad syntax) on a sticky note.",
    "For legal cards, pairs write the closest common supertype of the alternatives.",
    "Pairs fix every illegal card with the smallest change that keeps the intended behavior.",
    "The class reviews answers, with each pair presenting one fix."
   ]
  },
  "discussion": [
   "Why do you think Java chose to forbid related types instead of silently ignoring the redundant one?",
   "How does precise rethrow help a method keep a narrow throws clause?"
  ],
  "exit": [
   [
    "Does `catch (ArithmeticException | NumberFormatException e)` compile?",
    "Yes. The two types are unrelated siblings under RuntimeException."
   ],
   [
    "Why does `catch (IOException | SQLException e) { e = null; }` fail?",
    "The multi-catch parameter is implicitly final and cannot be reassigned."
   ],
   [
    "Fix `catch (Exception | IOException e)`.",
    "Use catch (Exception e), since Exception already covers IOException."
   ]
  ],
  "differentiation": [
   "Support: Let struggling students draw the hierarchy branches for each card's types before deciding, and check whether one type sits directly above the other on the same branch.",
   "Extend: Ask fast finishers to write a method that catches Exception, rethrows it unchanged, and declares only the specific checked exceptions, then show how reassigning the variable breaks the precise rethrow."
  ]
 },
 {
  "t": "Catch block ordering and unreachable catch compile errors",
  "objectives": [
   "Students will be able to order catch blocks from most specific to most general and explain why.",
   "Students will be able to identify catch blocks that are unreachable because an earlier block catches a supertype.",
   "Students will be able to determine whether a catch for a specific checked exception is allowed based on what the try block can throw.",
   "Students will be able to explain why Exception, Throwable and unchecked exceptions can always be caught."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about sorting mail and connect it to choosing handlers."
   ],
   [
    12,
    "Teach",
    "Explain first-match-wins, the already-caught error, the never-thrown error for specific checked exceptions, and the exemptions for unchecked types, Exception and Throwable. Trace the NoSuchFileException example."
   ],
   [
    15,
    "Activity",
    "Run the Handler Chain Builder exercise."
   ],
   [
    8,
    "Discuss",
    "Discuss why the compiler treats these situations as errors instead of warnings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A mailroom has a bin labeled Everything and a bin labeled Letters for Ana. If a clerk checks the Everything bin first, what happens to Ana's letters?",
  "activity": {
   "title": "Handler Chain Builder",
   "materials": "Printed exception name cards (Exception, IOException, FileNotFoundException, NoSuchFileException, RuntimeException, IllegalArgumentException, NumberFormatException, SQLException), printed try-block cards describing what each try calls, whiteboard.",
   "steps": [
    "Groups receive a try-block card, such as one that calls Files.readString, one that only parses an integer, or one that is empty.",
    "Groups choose four exception cards and arrange them as a catch chain that compiles for their try block, taping them in order on the board.",
    "Each group then deliberately creates one broken chain, either with a misordered pair or with a checked exception the try cannot throw.",
    "Groups rotate and diagnose another group's broken chain, naming the exact compiler error and the fix.",
    "The teacher summarizes the two questions to ask for every catch block."
   ]
  },
  "discussion": [
   "What real bugs could happen if Java allowed a broad catch before specific ones?",
   "Why is catching Exception after an empty try allowed, while catching SQLException is not?"
  ],
  "exit": [
   [
    "Order these catch blocks so the code compiles: Exception, FileNotFoundException, IOException.",
    "FileNotFoundException, then IOException, then Exception."
   ],
   [
    "Does `try { int x = 1 / 0; } catch (java.io.IOException e) { }` compile?",
    "No. IOException is checked and nothing in the try can throw it."
   ],
   [
    "Can `catch (RuntimeException e)` follow an empty try block?",
    "Yes. Unchecked exceptions can always be caught."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a ladder diagram showing each exception's parent so they can check, rung by rung, whether an earlier catch sits above a later one.",
   "Extend: Ask fast finishers to write a try block that calls two methods declaring different checked exceptions and design a handler chain mixing multi-catch and single catches that compiles with no unreachable blocks."
  ]
 },
 {
  "t": "Try-with-resources, AutoCloseable and reverse close order",
  "objectives": [
   "Students will be able to identify which types may be declared as resources by checking for AutoCloseable or Closeable.",
   "Students will be able to trace the output of a try-with-resources statement, including open order, reverse close order, catch and finally.",
   "Students will be able to apply the scope, implicit final and effectively final rules to decide whether resource code compiles.",
   "Students will be able to explain how the declared exceptions of close() affect what the caller must handle."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a manual try/finally that closes a reader on the last line of try. Ask: what leaks if line 3 throws? Collect answers on the board."
   ],
   [
    12,
    "Teach",
    "Introduce AutoCloseable and Closeable, the syntax rules (semicolons, implicit final, scope, Java 9 effectively final variables) and the exact order of events. Live-trace the Res example on the projector, writing each printed token as it appears."
   ],
   [
    15,
    "Activity",
    "Run the 'Human resources' role-play described below, then have pairs predict printed output for three printed code cards."
   ],
   [
    6,
    "Discuss",
    "Ask why reverse order is the sensible design and why closing happens before catch. Connect to wrapping streams and connection or statement pairs."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions on paper; review the trickiest one aloud."
   ]
  ],
  "warmup": "If you open a file, a network connection and a buffered writer that wraps the file, in which order should you close them, and what goes wrong if you get it backward?",
  "activity": {
   "title": "Human resources: acting out try-with-resources",
   "materials": "Whiteboard, sticky notes, three printed cards labeled Resource A, Resource B, Resource C, a card labeled Body, a card labeled Catch and a card labeled Finally, plus three printed code snippets for pair tracing.",
   "steps": [
    "Pick six volunteers and give each a card. The teacher reads a try-with-resources header aloud; the resource students step forward in declaration order and say 'open'.",
    "The Body student says 'body' and, on the teacher's signal, says 'throw'. The resource students must then step back in reverse order saying 'close', before Catch and Finally speak.",
    "Repeat with a twist: Resource B's constructor throws. Students decide who closes (only A) and act it out.",
    "In pairs, students trace three printed snippets (normal completion, exception in body, exception in a constructor) and write the exact output on sticky notes.",
    "Pairs post sticky notes on the board; the class compares and the teacher resolves disagreements by tracing on the projector."
   ]
  },
  "discussion": [
   "Why does Java close resources before running the catch block rather than after it?",
   "When would you write your own class that implements AutoCloseable, and what should its close() method declare?"
  ],
  "exit": [
   [
    "What is printed by `try (var a = new R(\"A\"); var b = new R(\"B\")) { print(\"body \"); }` if R prints open and close messages?",
    "open-A open-B body close-B close-A"
   ],
   [
    "Does `try (var r = new Res()) { } finally { r.close(); }` compile?",
    "No. The resource variable r is not in scope in the finally block."
   ],
   [
    "A class implements AutoCloseable with `public void close()` and no throws clause. Must callers using it in try-with-resources handle Exception?",
    "No. The narrower override declares no checked exception, so nothing from close() needs handling."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed timeline template with boxes labeled open, body, close, catch, finally, and have them fill it in for each snippet before writing the output line.",
   "Extend: Ask fast finishers to predict the output when both the body and B's close() throw, and to write how they would print every exception, previewing suppressed exceptions."
  ]
 },
 {
  "t": "Suppressed exceptions and Throwable.getSuppressed()",
  "objectives": [
   "Students will be able to identify the primary exception when the try body and one or more close() calls throw.",
   "Students will be able to predict the contents and order of the array returned by getSuppressed().",
   "Students will be able to compare exception handling in try-with-resources with a plain try/finally block.",
   "Students will be able to distinguish suppressed exceptions from the cause returned by getCause()."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about two failures at once. Take three or four answers and write them on the board without judging."
   ],
   [
    12,
    "Teach",
    "Explain the primary rule, addSuppressed and getSuppressed, the body-succeeds case, and the try/finally contrast. Project a sample stack trace with Suppressed: and Caused by: sections and annotate each part."
   ],
   [
    15,
    "Activity",
    "Run the 'Incident report' card exercise described below in groups of three."
   ],
   [
    6,
    "Discuss",
    "Ask groups which scenario surprised them and why try/finally loses information. Contrast cause and suppressed with the kitchen analogy."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually; collect them at the door."
   ]
  ],
  "warmup": "If your code fails and then the cleanup code fails too, which error would you want to see first in the log, and why?",
  "activity": {
   "title": "Incident report: who is primary?",
   "materials": "Printed scenario cards (six short code snippets with resources that do or do not throw), blank 'incident report' half-sheets with boxes for Primary and Suppressed, whiteboard and markers.",
   "steps": [
    "Form groups of three and give each group the six scenario cards face down.",
    "For each card, the group traces the open and close order and fills in an incident report: the primary exception message, then the suppressed messages in order.",
    "Two cards use a plain try/finally instead of try-with-resources; groups must mark which exception is lost.",
    "One card mixes a wrapping exception with a cause; groups label which exception appears under Caused by and which under Suppressed.",
    "The teacher reveals answers on the projector; groups score themselves and explain any miss to another group."
   ]
  },
  "discussion": [
   "Why is losing the original exception in a finally block so damaging when you are troubleshooting a production failure?",
   "When would you call addSuppressed yourself instead of relying on try-with-resources?"
  ],
  "exit": [
   [
    "The try body throws \"X\" and the single resource's close() throws \"Y\". What is e.getMessage() in the catch block, and what does getSuppressed() contain?",
    "\"X\"; getSuppressed() contains the exception with message \"Y\"."
   ],
   [
    "The body completes normally and close() throws \"Y\". What is suppressed?",
    "Nothing. \"Y\" becomes the primary exception and getSuppressed() is empty."
   ],
   [
    "Which method returns the exception that a wrapper exception was built around?",
    "getCause(), not getSuppressed()."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column worksheet, 'thrown first' and 'thrown later', and have students list each exception in the order it is thrown before deciding which one is primary.",
   "Extend: Ask fast finishers to rewrite a try/finally snippet by hand so that it preserves the original exception using addSuppressed, then compare their version with try-with-resources."
  ]
 },
 {
  "t": "Declaring exceptions with throws and overriding rules",
  "objectives": [
   "Students will be able to distinguish the throws clause from the throw statement and apply the handle-or-declare rule.",
   "Students will be able to decide whether an overriding method's throws clause compiles by comparing it to the overridden method.",
   "Students will be able to explain why the compiler checks exceptions against the reference type rather than the runtime object.",
   "Students will be able to apply wrapping to report a new failure without breaking an inherited contract."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about promises in a job description and connect it to method contracts."
   ],
   [
    12,
    "Teach",
    "Cover throws versus throw, unchecked exceptions in throws, the override rule with the Loader example, reference type checking, and the constructor and overloading cases. Draw the IOException family tree on the board."
   ],
   [
    15,
    "Activity",
    "Run the 'Legal or not' card sort described below."
   ],
   [
    6,
    "Discuss",
    "Discuss why polymorphism forces the override rule and when wrapping is better than a broad throws Exception."
   ],
   [
    7,
    "Exit ticket",
    "Students complete the three exit questions; review answers together."
   ]
  ],
  "warmup": "If a company promises customers that a delivery might arrive late, what promises can a subcontractor make without breaking the company's word, and which ones would break it?",
  "activity": {
   "title": "Legal or not: override card sort",
   "materials": "Printed cards, each showing a parent method signature and a child override signature (about 16 cards), a printed exception hierarchy sheet (Exception, IOException, FileNotFoundException, SQLException, RuntimeException, IllegalArgumentException), and a whiteboard split into Compiles and Does Not Compile.",
   "steps": [
    "In pairs, students sort the cards into Compiles and Does Not Compile using the hierarchy sheet.",
    "For each Does Not Compile card, pairs write the reason on a sticky note: new checked, broader checked, or other.",
    "Pairs tape their cards to the whiteboard columns; the teacher checks two pairs' work aloud.",
    "Bonus round: give each pair a failing card and ask them to rewrite the override using wrapping so it compiles."
   ]
  },
  "discussion": [
   "Why would declaring throws Exception on an interface method make life harder for every caller?",
   "Is it better to wrap a low-level exception in a checked or an unchecked exception when an override cannot declare it? What does each choice cost?"
  ],
  "exit": [
   [
    "Parent: `void save() throws IOException`. Child: `void save() throws SQLException`. Does it compile?",
    "No. SQLException is a new checked exception not covered by IOException."
   ],
   [
    "Parent: `void save()`. Child: `void save() throws NullPointerException`. Does it compile?",
    "Yes. NullPointerException is unchecked, which an override may always throw."
   ],
   [
    "What is the difference between `throws` and `throw`?",
    "throws is a header declaration listing checked exceptions a method may pass on; throw is a statement that throws one exception object."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart card: Is it unchecked? Allowed. Is it the same or a subclass of a parent exception? Allowed. Otherwise not allowed. Have them walk each card through the flowchart.",
   "Extend: Ask fast finishers to explain, with code, why a subclass constructor must declare an exception thrown by the superclass constructor, and what changes if the superclass has a second constructor that throws nothing."
  ]
 },
 {
  "t": "Creating custom checked and unchecked exceptions",
  "objectives": [
   "Students will be able to classify a custom exception as checked or unchecked by following its extends chain.",
   "Students will be able to write custom exception constructors that call super with a message and a cause.",
   "Students will be able to justify choosing a checked or unchecked parent for a given failure scenario.",
   "Students will be able to explain how exception chaining preserves the original error in getCause() and stack traces."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the generic 'Something went wrong' message and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Draw the Throwable hierarchy, explain checked versus unchecked parents, constructor rules and chaining. Write the InsufficientFundsException example live, deliberately omitting a constructor to show the compile error."
   ],
   [
    15,
    "Activity",
    "Run the 'Design the exception' scenario exercise described below."
   ],
   [
    6,
    "Discuss",
    "Groups share one checked and one unchecked choice and defend it; the class challenges at least one decision."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "An app shows the same error message for a wrong password, a full disk and a programming bug. Who suffers from that, and what would a better design look like?",
  "activity": {
   "title": "Design the exception",
   "materials": "Printed scenario cards (eight failure descriptions from a fictional library system), blank class-skeleton templates, and student laptops with a browser-based Java playground or paper if laptops are unavailable.",
   "steps": [
    "Groups of three draw two scenario cards, such as 'book already checked out' or 'null member ID passed to a lookup method'.",
    "For each scenario, the group decides checked or unchecked, picks a parent class and writes the reason in one sentence.",
    "Groups write the class with at least a message constructor and a message-plus-cause constructor, calling super in each.",
    "Groups write one method that wraps a lower-level exception in their custom exception, passing the cause.",
    "Groups swap code with another group, who checks the extends choice and whether every constructor call compiles."
   ]
  },
  "discussion": [
   "Many modern libraries prefer unchecked exceptions. What do you gain and what do you lose when callers are not forced to handle a failure?",
   "What information belongs in an exception message, and what should never go there?"
  ],
  "exit": [
   [
    "Is `class LateFeeException extends RuntimeException` checked or unchecked?",
    "Unchecked, because it extends RuntimeException."
   ],
   [
    "Write the constructor that lets `new LateFeeException(\"overdue\", e)` compile.",
    "LateFeeException(String message, Throwable cause) { super(message, cause); }"
   ],
   [
    "Why should a wrapping exception pass the original exception as its cause?",
    "So getCause() returns the original and the stack trace shows it under Caused by, keeping the root problem visible."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank class template with the extends clause and super calls left blank, plus a hierarchy chart to consult while filling it in.",
   "Extend: Ask fast finishers to add a field and getter to their exception that carries structured data, then write a catch block that uses the getter instead of parsing the message."
  ]
 },
 {
  "t": "Declaring, creating and copying arrays; Arrays.sort, binarySearch, compare, mismatch",
  "objectives": [
   "Students will be able to determine which array declarations and creation expressions compile and what types they produce.",
   "Students will be able to choose the correct copying method and explain why array copies are shallow.",
   "Students will be able to compute the result of Arrays.binarySearch for present and missing keys on sorted arrays.",
   "Students will be able to compare the results of Arrays.equals, Arrays.compare and Arrays.mismatch for the same pair of arrays."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write `int[] a = {1, 2}; int[] b = {1, 2};` on the board and ask whether a == b and a.equals(b) are true. Collect votes."
   ],
   [
    12,
    "Teach",
    "Cover declaration and creation rules, length, jagged arrays, the equals and toString traps, copy methods, sort order for strings, binarySearch with the insertion point formula, and compare versus mismatch."
   ],
   [
    15,
    "Activity",
    "Run the 'Human array' binary search and the card drill described below."
   ],
   [
    6,
    "Discuss",
    "Ask why binarySearch subtracts one and why the result on an unsorted array is undefined."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Two arrays hold exactly the same numbers. Are they equal in Java? Write down what you think a == b and a.equals(b) print, and why.",
  "activity": {
   "title": "Human array: binary search by hand",
   "materials": "Eight sheets of paper with numbers written large (for example 3, 8, 12, 19, 25, 31, 40, 52), index labels 0 to 7 on sticky notes, whiteboard, and a stack of printed drill cards with array expressions.",
   "steps": [
    "Eight students stand in a row holding the sorted numbers, each wearing an index sticky note.",
    "The teacher calls out a key such as 25; the class directs a 'searcher' to the middle student and halves the range aloud until found, recording the index.",
    "The teacher calls a missing key such as 20; the class finds the insertion point (index 4) and computes -(4) - 1 = -5 on the board.",
    "Shuffle the students and ask what binarySearch returns now; establish that the answer is undefined.",
    "In pairs, students work through drill cards covering declarations, copyOf padding, string sort order, compare and mismatch, then check answers against a projected key."
   ]
  },
  "discussion": [
   "Why might Java's designers have chosen to make arrays fixed size, and when would you use an ArrayList instead?",
   "If copying an array of objects is shallow, how could you make a truly independent copy?"
  ],
  "exit": [
   [
    "What does `Arrays.binarySearch(new int[]{2, 4, 6, 8}, 7)` return?",
    "-4. The insertion point is 3, and -(3) - 1 = -4."
   ],
   [
    "What is the sorted order of `{\"b\", \"A\", \"10\", \"9\"}`?",
    "[10, 9, A, b], because strings compare by Unicode value: digits, then uppercase, then lowercase."
   ],
   [
    "What does `Arrays.copyOf(new int[]{1, 2}, 4)` produce?",
    "[1, 2, 0, 0], because copyOf pads with default values."
   ]
  ],
  "differentiation": [
   "Support: Give a printed Unicode order strip (digits, then A to Z, then a to z) and a binarySearch worksheet with the insertion point column pre-labeled, so students apply the formula step by step.",
   "Extend: Ask fast finishers to predict Arrays.compare and Arrays.mismatch results for pairs involving null and empty arrays, and to explain why mismatch returns the shorter length for a proper prefix."
  ]
 },
 {
  "t": "List, Set, Map, Queue and Deque interfaces and their main implementations",
  "objectives": [
   "Students will be able to describe the defining rules of List, Set, Map, Queue and Deque and how Map relates to Collection.",
   "Students will be able to select an appropriate implementation (ArrayList, LinkedList, HashSet, LinkedHashSet, TreeSet, HashMap, LinkedHashMap, TreeMap, ArrayDeque, PriorityQueue) for a scenario.",
   "Students will be able to predict the results of queue and deque operations, including which methods throw and which return null or false.",
   "Students will be able to apply overload rules to List.remove with Integer elements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about restaurant structures and map student answers to collection types on the board."
   ],
   [
    13,
    "Teach",
    "Draw the interface hierarchy, then go through each interface with its implementations, ordering and null rules. Build the queue method table (throws versus returns special value) with the class, and demonstrate the remove(int) trap."
   ],
   [
    15,
    "Activity",
    "Run the 'Pick the container' scenario cards and the stack and queue simulation described below."
   ],
   [
    5,
    "Discuss",
    "Discuss why code declares variables with interface types and when LinkedHashMap beats HashMap."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think about a restaurant. Name one thing that works like an ordered list, one that must never contain duplicates, one that pairs a ticket with an item, and one that serves people in arrival order.",
  "activity": {
   "title": "Pick the container",
   "materials": "Printed scenario cards (ten short requirements such as 'unique usernames in signup order' or 'tasks processed by priority'), sticky notes, a whiteboard grid with the main implementations as columns, and paper cups labeled 1 to 5 for a stack and queue simulation.",
   "steps": [
    "In groups of three, students read each scenario card and choose an interface and implementation, writing the choice and one-sentence reason on a sticky note.",
    "Groups place sticky notes in the matching column on the whiteboard; the teacher reviews disagreements with the class.",
    "Two volunteers act as a deque: one adds cups with push and offer while the class calls out what pop, poll and peek return after each step.",
    "Repeat with an empty deque, asking which calls return null and which throw an exception.",
    "Groups finish by writing the output of one remove(int) versus remove(Object) snippet."
   ]
  },
  "discussion": [
   "Why is it better to declare a variable as List rather than ArrayList, and when might you need the concrete type?",
   "When would a PriorityQueue be the wrong choice even though you need some kind of ordering?"
  ],
  "exit": [
   [
    "Which method should you use to remove the head of a queue without risking an exception if it is empty?",
    "poll(), which returns null on an empty queue."
   ],
   [
    "What does `stack.push(1); stack.push(2); stack.pop();` return for an ArrayDeque?",
    "2, because push and pop work at the front, last in first out."
   ],
   [
    "Which Map implementation keeps keys in sorted order?",
    "TreeMap."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page reference table listing each interface, its duplicate rule, ordering and null rules, and let struggling students consult it while sorting scenario cards.",
   "Extend: Ask fast finishers to explain why LinkedList can be both a List and a Deque, and to write code that uses one LinkedList object through both interface types."
  ]
 },
 {
  "t": "Unmodifiable collections: List.of, Set.of, Map.of and Arrays.asList behavior",
  "objectives": [
   "Students will be able to predict which operations on List.of, Set.of and Map.of collections compile and which throw at runtime.",
   "Students will be able to identify the exceptions thrown for null values and duplicate elements or keys in the factory methods.",
   "Students will be able to compare Arrays.asList, List.copyOf, Collections.unmodifiableList and new ArrayList in terms of modification and write-through behavior.",
   "Students will be able to explain why unmodifiable collections are shallow."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about laminated menus and chalkboards and collect ideas."
   ],
   [
    12,
    "Teach",
    "Present the four creation styles with a projected comparison grid: modify, add or remove, set, null allowed, reflects source. Demonstrate the compile-then-fail pattern and the int[] trap with Arrays.asList."
   ],
   [
    15,
    "Activity",
    "Run the 'Compile, run or crash' card game described below."
   ],
   [
    6,
    "Discuss",
    "Discuss why the factories reject nulls and duplicates, and when a view is preferable to a copy."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A restaurant has a laminated menu, a chalkboard menu with fixed slots, and a window into the kitchen whiteboard. Which one can a customer change, which can the staff change, and which never changes?",
  "activity": {
   "title": "Compile, run or crash",
   "materials": "Printed cards each showing a short snippet (about 15 cards mixing List.of, Set.of, Map.of, Arrays.asList, copyOf and unmodifiableList), three signs reading 'Does not compile', 'Runs fine' and 'Throws (name it)', whiteboard.",
   "steps": [
    "Post the three signs in different corners of the room.",
    "Read a card aloud and project it; students walk to the corner matching their prediction.",
    "Students in the 'Throws' corner must name the exact exception: UnsupportedOperationException, NullPointerException or IllegalArgumentException.",
    "Reveal the answer and have one student from the correct corner explain the rule.",
    "After ten cards, pairs complete the remaining cards on paper and fill in the comparison grid from memory."
   ]
  },
  "discussion": [
   "Why might the designers of List.of have chosen to throw on duplicates and nulls instead of silently ignoring them?",
   "If a method returns an unmodifiable list of mutable objects, what can a caller still change, and how could you prevent it?"
  ],
  "exit": [
   [
    "What exception does `Set.of(\"x\", \"x\")` throw?",
    "IllegalArgumentException, because of the duplicate element."
   ],
   [
    "Does `Arrays.asList(\"a\", \"b\").set(0, \"c\")` succeed?",
    "Yes. Arrays.asList supports set because it does not change the size."
   ],
   [
    "Which creates an independent unmodifiable snapshot: Collections.unmodifiableList(list) or List.copyOf(list)?",
    "List.copyOf(list). unmodifiableList is a view that reflects later changes."
   ]
  ],
  "differentiation": [
   "Support: Give students the completed comparison grid as a reference card during the game, then remove it for the exit ticket.",
   "Extend: Ask fast finishers to predict what `Arrays.asList(new int[]{1, 2}).size()` returns and to explain why, then compare it with `Arrays.asList(new Integer[]{1, 2}).size()`."
  ]
 },
 {
  "t": "Sequenced collections: getFirst, getLast, addFirst, reversed",
  "objectives": [
   "Students will be able to identify which collection and map types implement SequencedCollection, SequencedSet and SequencedMap.",
   "Students will be able to predict the result or exception of getFirst, getLast, addFirst, addLast and removeFirst on lists, sets, sorted sets, unmodifiable lists and empty collections.",
   "Students will be able to explain why reversed() returns a view and trace changes through it.",
   "Students will be able to decide whether a call compiles based on the reference type."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how they would get the last element of a list, a deque and a LinkedHashSet in older Java. List the answers to show the inconsistency."
   ],
   [
    12,
    "Teach",
    "Draw the new interface hierarchy (SequencedCollection, SequencedSet, SequencedMap) beside List, Deque, SortedSet and SortedMap. Walk through the method list and the exception rules, then live-trace the projected example."
   ],
   [
    15,
    "Activity",
    "Run the 'Line up' role-play and prediction cards described below."
   ],
   [
    6,
    "Discuss",
    "Discuss why TreeSet rejects addFirst and why reversed() is a view rather than a copy."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In older Java, how would you get the last element of an ArrayList, an ArrayDeque and a LinkedHashSet? Why is it awkward that each answer is different?",
  "activity": {
   "title": "Line up: acting out sequenced collections",
   "materials": "Name cards for five volunteers, a sign reading 'TreeSet: sorted by height', a sign reading 'List.of: frozen', printed prediction cards with short snippets, whiteboard.",
   "steps": [
    "Five volunteers form a line representing a LinkedHashSet. The class calls getFirst, getLast and addFirst on an existing name; the named student walks to the front.",
    "A sixth student holds up a mirror-style 'reversed view' sign at the back. When the line changes, the class confirms the reversed view changes too.",
    "The volunteers re-sort by height under the TreeSet sign; the class tries addFirst and the teacher announces UnsupportedOperationException.",
    "Under the 'List.of: frozen' sign, the class confirms getFirst still works but removeFirst throws.",
    "In pairs, students complete prediction cards that mix reference types (Set, SequencedSet, List), empty collections and maps, writing the output or exception."
   ]
  },
  "discussion": [
   "Why did Java add new interfaces instead of adding getFirst to Collection itself?",
   "When would you prefer getFirst, which throws on empty, over peekFirst, which returns null?"
  ],
  "exit": [
   [
    "What does `new TreeSet<>(List.of(5, 1)).addFirst(0)` do?",
    "It throws UnsupportedOperationException, because a sorted set decides element positions."
   ],
   [
    "Given `var s = new LinkedHashSet<>(List.of(\"a\", \"b\", \"c\")); s.addLast(\"a\");`, what is s?",
    "[b, c, a], because addLast moves an existing element to the end."
   ],
   [
    "Does `Set<String> s = new LinkedHashSet<>(); s.getFirst();` compile?",
    "No. The Set reference type does not declare getFirst."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-question checklist card (reference type, implementation support, empty or not) and have students write the answer to each question before predicting output.",
   "Extend: Ask fast finishers to trace `list.reversed().addFirst(\"x\")` and `map.reversed().pollFirstEntry()` on a LinkedHashMap, explaining what happens to the original collection."
  ]
 },
 {
  "t": "Map methods: merge, computeIfAbsent, getOrDefault, putIfAbsent",
  "objectives": [
   "Students will be able to predict the return value and resulting map contents for getOrDefault, putIfAbsent, computeIfAbsent and merge.",
   "Students will be able to explain how each method treats an absent key versus a key mapped to null.",
   "Students will be able to apply merge for counting and computeIfAbsent for grouping in place of containsKey logic.",
   "Students will be able to identify when these methods throw on unmodifiable maps or null arguments."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up word-counting task and have students write their own multi-line solution."
   ],
   [
    12,
    "Teach",
    "Introduce each method with its rule and return value, emphasizing 'absent or mapped to null' and the getOrDefault exception. Trace the stock example line by line, updating a drawn map on the board."
   ],
   [
    15,
    "Activity",
    "Run the 'Map machine' tracing relay described below."
   ],
   [
    6,
    "Discuss",
    "Compare students' warm-up solutions with the one-line merge version and discuss readability and correctness."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Write code that counts how many times each word appears in a list of words using a Map. How many lines did it take, and where could a bug hide?",
  "activity": {
   "title": "Map machine: tracing relay",
   "materials": "Whiteboard divided into four team columns, each with a drawn starting map; a printed sequence of twelve method calls per team (a mix of getOrDefault, putIfAbsent, computeIfAbsent, merge and computeIfPresent); markers.",
   "steps": [
    "Split the class into four teams lined up in front of their whiteboard column.",
    "The first student reads call 1, updates the map on the board and writes the return value; then hands the marker to the next teammate for call 2.",
    "Teams may challenge their own previous entries at any time but cannot skip ahead.",
    "When all teams finish, the teacher reveals the correct final map and return values; teams score one point per correct return value and two for a correct final map.",
    "Each team explains one call they got wrong and which rule they misapplied."
   ]
  },
  "discussion": [
   "Why might Java's designers have made getOrDefault treat a null value differently from the other methods?",
   "When would using merge or computeIfAbsent make code harder to read rather than easier?"
  ],
  "exit": [
   [
    "A map is {x=null}. What does `putIfAbsent(\"x\", 4)` return, and what is the map afterward?",
    "It returns null and the map becomes {x=4}, because a null mapping counts as absent."
   ],
   [
    "Write the one-line call that increments a word count in `Map<String, Integer> counts`.",
    "counts.merge(word, 1, Integer::sum);"
   ],
   [
    "A map is {k=2}. What does `computeIfAbsent(\"k\", key -> 10)` return?",
    "2. The key has a non-null value, so the function is not called."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart for each method (Is the key absent or null? Then ... Otherwise ...) with the return value written at each end point.",
   "Extend: Ask fast finishers to rewrite a grouping loop using Collectors.groupingBy and compare it with the computeIfAbsent version, then explain which is atomic on ConcurrentHashMap."
  ]
 },
 {
  "t": "Sorting with Comparable and Comparator (comparing, thenComparing, reversed)",
  "objectives": [
   "Students will be able to distinguish Comparable (natural ordering, compareTo) from Comparator (external ordering, compare).",
   "Students will be able to build multi-key comparators with comparing, comparingInt, thenComparing and reverseOrder.",
   "Students will be able to predict how the position of reversed() in a chain changes the sort result.",
   "Students will be able to identify sorting code that fails to compile or throws ClassCastException."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to sort five names written on the board, including mixed case, by hand, then reveal the Unicode order Java uses."
   ],
   [
    12,
    "Teach",
    "Contrast Comparable and Comparator, cover the return value convention and Integer.compare, then build comparator chains live on the projector, showing reversed() in different positions and the lambda inference trap."
   ],
   [
    15,
    "Activity",
    "Run the 'Human sort' role-play described below."
   ],
   [
    6,
    "Discuss",
    "Discuss when a class should have a natural order and why stable sorting matters for multi-pass sorting."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Sort these names the way you think Java would: apple, Banana, cherry, Apple, 42. Then explain the rule you used.",
  "activity": {
   "title": "Human sort: comparator chains",
   "materials": "Printed badges for eight volunteers showing a last name, first name and age; printed comparator cards (such as comparing(last).thenComparing(first), comparingInt(age).reversed(), comparing(last).thenComparing(age, reverseOrder())); whiteboard.",
   "steps": [
    "Eight volunteers wear badges and stand in random order at the front.",
    "The teacher reads a comparator card; the seated class directs the volunteers into sorted order, saying which key decides each swap.",
    "For chains with reversed(), the class first predicts whether one key or all keys flip, writes the prediction on the board, then arranges the volunteers.",
    "Repeat with a card containing the lambda inference trap; the class decides whether it compiles before any sorting happens.",
    "In pairs, students write the comparator expression that produces a final arrangement the teacher sets up, and compare answers."
   ]
  },
  "discussion": [
   "Should a Product class implement Comparable at all, given that users may sort by price, rating or name? What would its natural order be?",
   "Why does it matter that list.sort is stable when you sort in multiple passes?"
  ],
  "exit": [
   [
    "Write a comparator that sorts people by age descending and then by last name ascending.",
    "Comparator.comparingInt(Person::age).reversed().thenComparing(Person::last)"
   ],
   [
    "What sign does `Integer.valueOf(5).compareTo(9)` return?",
    "Negative, because 5 comes before 9."
   ],
   [
    "What happens when Arrays.sort is called on an array of objects that do not implement Comparable, with no comparator?",
    "It throws ClassCastException at runtime."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a chain-reading template: write each key on its own line, mark ascending or descending, and draw an arrow showing which lines each reversed() affects.",
   "Extend: Ask fast finishers to write a comparator using nullsLast for a list containing null last names, and to explain the difference between Comparator.nullsLast(naturalOrder()) and placing nulls manually."
  ]
 },
 {
  "t": "TreeSet and TreeMap natural ordering",
  "objectives": [
   "Students will be able to predict the iteration order of TreeSet and TreeMap contents under natural ordering, including mixed-case strings.",
   "Students will be able to explain how compareTo or a comparator decides duplicates in sorted collections.",
   "Students will be able to apply lower, floor, ceiling, higher, headSet, tailSet and subSet and state their inclusive or exclusive behavior.",
   "Students will be able to identify runtime failures caused by non-Comparable elements and null keys."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about finding the next appointment and gather strategies."
   ],
   [
    12,
    "Teach",
    "Explain natural ordering, the Comparable requirement and null rule, duplicates by comparison, then the navigation and range methods. Draw a number line on the board and mark lower, floor, ceiling and higher for a sample value."
   ],
   [
    15,
    "Activity",
    "Run the 'Number line navigator' activity described below."
   ],
   [
    6,
    "Discuss",
    "Discuss when a TreeMap beats a HashMap and the danger of comparators that compare only one field."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You have a list of 500 appointment times. How would you find the first appointment after 2:15 p.m. quickly, and what would make that easier?",
  "activity": {
   "title": "Number line navigator",
   "materials": "A long number line drawn on the whiteboard or taped on the floor with sticky notes at 10, 20, 30, 40, 50; printed query cards (such as floor(35), higher(50), headSet(30), subSet(20, 40), tailSet(30, false)); a second set of cards showing TreeSet constructions with mixed-case strings and custom comparators.",
   "steps": [
    "A volunteer stands on the number line at the query value from a card; the class tells them which way to look and whether the starting point counts.",
    "The class calls out the answer, including null when nothing qualifies, and the teacher records it beside the query.",
    "For range cards, volunteers stand on each element included in the view so the class can check inclusive and exclusive bounds.",
    "In pairs, students work through the second set of cards, predicting printed contents and size when comparators cause duplicates.",
    "Pairs swap answers with a neighboring pair to check, and the teacher resolves any disagreements on the board."
   ]
  },
  "discussion": [
   "Why might it be dangerous to build a TreeSet with a comparator that only compares one field of an object?",
   "In what kinds of applications would range views like headMap or subMap be especially useful?"
  ],
  "exit": [
   [
    "For a TreeSet {5, 15, 25}, what do ceiling(15) and higher(15) return?",
    "ceiling(15) returns 15; higher(15) returns 25."
   ],
   [
    "What does adding an object whose class does not implement Comparable to a natural-order TreeSet do?",
    "It compiles but throws ClassCastException at runtime."
   ],
   [
    "What does `new TreeSet<>(List.of(1, 2, 3, 4)).headSet(3)` contain?",
    "[1, 2], because headSet excludes its bound by default."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed number line with arrows labeled lower (strict, left), floor (inclusive, left), ceiling (inclusive, right) and higher (strict, right) for students to place their finger on while answering.",
   "Extend: Ask fast finishers to design a booking clash check using floorEntry and ceilingEntry on a TreeMap of start times to end times, and to write the condition that detects an overlap."
  ]
 },
 {
  "t": "Generics: type parameters, bounded types and wildcards (? extends, ? super)",
  "objectives": [
   "Students will be able to declare generic classes and methods, including bounded type parameters with multiple bounds in the correct order.",
   "Students will be able to explain type erasure and identify code it makes illegal, such as new T() and overloads that erase to the same signature.",
   "Students will be able to compare invariance, ? extends and ? super and predict whether a read or write on a wildcard list compiles.",
   "Students will be able to apply the PECS rule to choose parameter types for a utility method."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write List<Number> nums = new ArrayList<Integer>(); on the board and ask for a show of hands: compiles or not. Collect reasons without confirming yet."
   ],
   [
    15,
    "Teach",
    "Walk through type parameters, generic methods and bounds, then erasure and its consequences. Show why invariance protects the list by acting out adding a Double into a list of Integers. Introduce ? extends and ? super with the sum and fill examples and write PECS on the board."
   ],
   [
    15,
    "Activity",
    "Run the Compiles or Not card sort described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Review the cards pairs disagreed on most, asking each pair to state the rule that decided it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door."
   ]
  ],
  "warmup": "If Integer is a Number, why might it be dangerous to treat a list of Integers as a list of Numbers? Write one sentence before we discuss.",
  "activity": {
   "title": "Compiles or Not card sort",
   "materials": "Printed cards (about 16), each with a short generics snippet; a whiteboard divided into Compiles and Does Not Compile columns; sticky notes.",
   "steps": [
    "Prepare cards such as list.add(5) on a List<? extends Number>, out.add(1) on a List<? super Integer>, Integer i = out.get(0), new T(), <T extends Comparable<T> & Number>, and a pair of overloads differing only by type argument.",
    "Pairs sort each card into Compiles or Does Not Compile and write the rule that decided it on a sticky note attached to the card.",
    "Pairs then rewrite two failing cards so they compile, for example by changing the wildcard or reordering bounds.",
    "Each pair places one card on the board and explains it in one sentence to the class."
   ]
  },
  "discussion": [
   "Why did Java choose invariant generics when arrays are covariant, and which choice catches errors earlier?",
   "When would you pick a bounded type parameter <T extends Number> instead of a wildcard List<? extends Number>?"
  ],
  "exit": [
   [
    "Which compiles: adding an Integer to List<? extends Number> or to List<? super Integer>?",
    "Only List<? super Integer>; the extends version accepts only null."
   ],
   [
    "Why can you not write new T[10] in a generic class?",
    "Type erasure removes T at run time, so the JVM (Java Virtual Machine) cannot know which array type to create."
   ],
   [
    "A method reads Numbers from one list and writes them to another. What wildcards should its two parameters use?",
    "The source uses ? extends Number and the destination uses ? super Number, following PECS."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column reference card showing read and write outcomes for List<T>, List<? extends T> and List<? super T>, and let them use it during the card sort.",
   "Extend: Ask fast finishers to write a generic static max method with the signature <T extends Comparable<? super T>> T max(List<? extends T> list) and explain why each wildcard is there."
  ]
 },
 {
  "t": "List.remove(int) vs remove(Object) with Integer lists",
  "objectives": [
   "Students will be able to explain the three phases of overload resolution and why an int argument selects remove(int).",
   "Students will be able to predict the contents of a List<Integer> after a sequence of remove calls with int and Integer arguments.",
   "Students will be able to identify which remove overload is used from the variable a result is assigned to.",
   "Students will be able to choose removeIf or an Iterator to remove elements safely during iteration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show List<Integer> nums = new ArrayList<>(List.of(10, 20, 1, 30)); nums.remove(1); and ask students to write the resulting list."
   ],
   [
    12,
    "Teach",
    "Present the two overloads and their return types, then the three overload phases. Trace the warm-up and the Integer.valueOf version on the board, and show the IndexOutOfBoundsException case."
   ],
   [
    18,
    "Activity",
    "Run the Human List activity described below."
   ],
   [
    5,
    "Discuss",
    "Ask where this bug might hide in real code, such as IDs stored as Integers, and how a code reviewer would spot it."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "A list holds the numbers 10, 20, 1 and 30. If I say remove 1, what are two things I might mean?",
  "activity": {
   "title": "Human List",
   "materials": "Five to six large index cards with numbers such as 10, 20, 1, 30, 1; a whiteboard; a projector showing remove calls one at a time.",
   "steps": [
    "Five volunteers stand in a row at the front, each holding a number card, and the class labels their positions 0 to 4 on the board.",
    "The teacher projects a call such as nums.remove(1), nums.remove(Integer.valueOf(1)) or nums.remove((Object) 30), and the class decides by vote which overload applies.",
    "The volunteer affected sits down, the rest close the gap, and the class updates the positions on the board.",
    "Include one call with an out-of-range index and one by-value call with a missing value, and ask the class what the program does in each case.",
    "Finish by having pairs write one tricky remove question of their own to swap with another pair."
   ]
  },
  "discussion": [
   "Why does the compiler prefer a widening match over boxing even when the boxed version looks like a better fit?",
   "How would you change an API to make this kind of mistake less likely?"
  ],
  "exit": [
   [
    "For List<Integer> a = new ArrayList<>(List.of(3, 4, 5)); what does a.remove(1) return?",
    "It returns 4, the element at index 1, and the list becomes [3, 5]."
   ],
   [
    "What does a.remove(Integer.valueOf(7)) return if 7 is not present?",
    "false, with no change and no exception."
   ],
   [
    "Which overload runs for boolean ok = a.remove(x); and why?",
    "remove(Object), because only that overload returns a boolean."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart: is the argument a primitive int, short, char or byte? Then index. Is it a reference type? Then value.",
   "Extend: Ask fast finishers to predict what happens with a char argument such as list.remove('A') on a List<Integer> of size 3, and explain the widening."
  ]
 },
 {
  "t": "Functional interfaces in java.util.function: Supplier, Consumer, Function, Predicate, UnaryOperator, BinaryOperator",
  "objectives": [
   "Students will be able to match Supplier, Consumer, Function, Predicate, UnaryOperator and BinaryOperator to their abstract method names and shapes.",
   "Students will be able to choose the correct functional interface for a given lambda or method reference, including Bi and primitive versions.",
   "Students will be able to compute the result of composed functions using andThen, compose, and, or and negate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project four lambdas and ask students to describe each in words: how many inputs, what comes out."
   ],
   [
    12,
    "Teach",
    "Introduce the single-abstract-method rule, then build a two-question table (inputs, output) on the board that fills in the six core interfaces and their methods. Show the Bi versions and the primitive naming pattern, then demonstrate andThen versus compose with numbers."
   ],
   [
    18,
    "Activity",
    "Run the Interface Match card game described below."
   ],
   [
    5,
    "Discuss",
    "Ask which pairs of interfaces students confused and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here are four lambdas: () -> 42, s -> System.out.println(s), s -> s.length(), s -> s.isEmpty(). For each, how many inputs does it take and what does it return?",
  "activity": {
   "title": "Interface Match card game",
   "materials": "Three sets of printed cards per group: lambda cards, interface-name cards and method-name cards (get, accept, apply, test, getAsInt, applyAsInt).",
   "steps": [
    "Groups of three receive shuffled cards and match each lambda card to an interface card and a method-name card.",
    "Include traps such as a lambda that fits both Predicate<String> and Function<String, Boolean>, and cards for IntFunction versus ToIntFunction.",
    "Each group then writes a composition on the board, such as plus1.andThen(times2).apply(3), and another group computes the result.",
    "The teacher reveals answers and each group scores one point per correct triple."
   ]
  },
  "discussion": [
   "Why does Java provide primitive specializations like IntPredicate instead of only Predicate<Integer>?",
   "When is it worth defining your own functional interface instead of using java.util.function?"
  ],
  "exit": [
   [
    "What method does Consumer<T> declare, and what does it return?",
    "void accept(T t)."
   ],
   [
    "Which interface fits (a, b) -> a * b for two Integers returning an Integer, and what does reduce expect?",
    "BinaryOperator<Integer>, which is what reduce's accumulator takes."
   ],
   [
    "If f is x -> x + 1 and g is x -> x * 2, what is f.andThen(g).apply(5)?",
    "12, because f runs first (6) and then g (12)."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page table of the six interfaces with inputs, output and method name, and let them annotate it with their own examples.",
   "Extend: Ask fast finishers to write a custom @FunctionalInterface TriFunction<A, B, C, R> and use it with a lambda, then explain why the annotation helps."
  ]
 },
 {
  "t": "Lambda syntax, method references and effectively final variables",
  "objectives": [
   "Students will be able to identify valid and invalid lambda syntax, including parameter parentheses, var usage, braces, semicolons and return.",
   "Students will be able to explain the effectively final rule and why it applies to local variables but not to fields.",
   "Students will be able to convert between lambdas and the four kinds of method references."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project five lambdas, two of them broken, and ask students to spot the compile errors."
   ],
   [
    12,
    "Teach",
    "Cover parameter rules, expression versus block bodies, target typing and the effectively final rule with a live trace of the count++ example. Then introduce the four method reference kinds with one lambda equivalent each."
   ],
   [
    18,
    "Activity",
    "Run the Lambda to Reference relay described below."
   ],
   [
    5,
    "Discuss",
    "Discuss why Java copies captured locals and what would go wrong if it did not."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Which of these compile: x -> x + 1, (x, y) -> x + y, x, y -> x + y, s -> { s.length() }, () -> 42? Give a reason for each one that fails.",
  "activity": {
   "title": "Lambda to Reference relay",
   "materials": "Printed strips with lambdas (about 12), a whiteboard split into four columns labeled Static, Bound, Unbound and Constructor plus a Must Stay a Lambda column, tape.",
   "steps": [
    "Teams line up; the first student takes a strip, writes the equivalent method reference (or decides none exists), and tapes the strip under the right column.",
    "The next student checks the previous answer before taking their own strip, and may move it with a one-sentence justification.",
    "Include traps such as s -> s.substring(1), (a, b) -> a.compareTo(b), () -> new ArrayList<String>() and x -> System.out.println(x).",
    "Finish with each team writing one method that breaks a lambda through a later reassignment, and swap with another team to find the line."
   ]
  },
  "discussion": [
   "Is a method reference always clearer than a lambda? When might a lambda read better?",
   "Why does the effectively final rule check the whole method instead of just the lines before the lambda?"
  ],
  "exit": [
   [
    "Fix this lambda: s -> return s.trim();",
    "s -> s.trim() or s -> { return s.trim(); }."
   ],
   [
    "Name the kind of method reference: System.out::println.",
    "Bound instance method reference, because the receiver System.out is fixed."
   ],
   [
    "Can a lambda modify an instance field counter? Can it modify a local variable counter?",
    "It can modify the field; it cannot reassign the local, which must be effectively final."
   ]
  ],
  "differentiation": [
   "Support: Give a template card showing each method reference kind next to its expanded lambda, and let students fill blanks before trying full conversions.",
   "Extend: Ask fast finishers to find a method reference that fits two different functional interfaces, such as String::concat as BinaryOperator<String> and BiFunction<String, String, String>, and explain how the target type decides."
  ]
 },
 {
  "t": "Creating streams: collections, Stream.of, IntStream.range/rangeClosed, Stream.iterate",
  "objectives": [
   "Students will be able to create streams from collections, arrays, individual values, ranges and generators.",
   "Students will be able to predict the elements produced by range, rangeClosed and both forms of Stream.iterate.",
   "Students will be able to explain why a stream is single use and identify code that throws IllegalStateException.",
   "Students will be able to identify when an infinite stream needs a short-circuiting operation to finish."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how many numbers a loop for (int i = 1; i < 5; i++) visits, then reveal that IntStream.range(1, 5) matches it."
   ],
   [
    12,
    "Teach",
    "Show each source type with a one-line example on the projector, emphasizing exclusive versus inclusive ends, the Stream.of(int[]) trap, the single-use rule and infinite generators."
   ],
   [
    18,
    "Activity",
    "Run the What Does It Produce stations described below."
   ],
   [
    5,
    "Discuss",
    "Ask groups which station tripped them up and what rule they will remember."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A for loop runs i from 1 while i < 5. How many times does it run? Now guess what IntStream.range(1, 5) produces.",
  "activity": {
   "title": "What Does It Produce stations",
   "materials": "Four printed station sheets taped around the room, each with three stream source snippets; sticky notes; student laptops with a browser-based Java playground if available.",
   "steps": [
    "Station sheets cover ranges, Stream.iterate with two and three arguments, arrays with Stream.of versus Arrays.stream, and reused streams.",
    "Small groups rotate every four minutes and write the exact output, or Never ends, or Exception, on a sticky note for each snippet.",
    "Groups with laptops may verify one answer per station by running it, then note any surprise.",
    "After the last rotation, the teacher reads out answers and groups correct their notes."
   ]
  },
  "discussion": [
   "Why might the Java designers have made streams single use instead of reusable like collections?",
   "When would you choose Stream.generate over Stream.iterate?"
  ],
  "exit": [
   [
    "What does IntStream.rangeClosed(2, 4) produce?",
    "2, 3 and 4."
   ],
   [
    "What does Stream.iterate(1, n -> n < 30, n -> n * 3) produce?",
    "1, 3, 9 and 27; the next value, 81, fails the predicate, so the stream ends."
   ],
   [
    "What happens when a second terminal operation is called on the same stream?",
    "It throws IllegalStateException because the stream has already been operated upon."
   ]
  ],
  "differentiation": [
   "Support: Provide a for-loop equivalent next to each range and three-argument iterate snippet so students can trace them with a familiar construct.",
   "Extend: Ask fast finishers to produce the first ten Fibonacci numbers using Stream.iterate with an int array as the seed, and explain why limit is required."
  ]
 },
 {
  "t": "Intermediate operations and lazy evaluation: filter, map, flatMap, peek, sorted, distinct, limit",
  "objectives": [
   "Students will be able to describe lazy evaluation and explain why a pipeline without a terminal operation does nothing.",
   "Students will be able to apply filter, map, flatMap, distinct, sorted, limit, skip and peek to transform a stream.",
   "Students will be able to trace the element-by-element order of output in a pipeline that uses peek and limit.",
   "Students will be able to identify stateful operations that prevent infinite streams from finishing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project Stream.of(1, 2, 3).peek(System.out::println); and ask students to predict the output."
   ],
   [
    12,
    "Teach",
    "Explain laziness, then each operation with a one-line example. Trace the peek, filter, map, limit example vertically on the board, element by element, and contrast sorted's need to see everything."
   ],
   [
    18,
    "Activity",
    "Run the Human Pipeline activity described below."
   ],
   [
    5,
    "Discuss",
    "Ask why laziness is useful for large files and infinite sources, and what risks it creates for debugging."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What do you think Stream.of(1, 2, 3).peek(System.out::println); prints, and why?",
  "activity": {
   "title": "Human Pipeline",
   "materials": "Index cards with letters or numbers for the source, role cards (Peek, Filter, Map, Limit, ForEach), a whiteboard to record output.",
   "steps": [
    "Five students take role cards and stand in a line; a sixth holds the source cards and may only hand over one card when the ForEach student asks for it.",
    "The ForEach student requests a card; it moves down the line, Peek announces it, Filter rejects or passes it, Map rewrites it, and Limit counts it. The class records every announcement on the board.",
    "Run the pipeline until Limit says stop, then ask which source cards were never touched.",
    "Repeat with a Sorted role inserted before Limit and observe that Sorted must collect every card before passing any on."
   ]
  },
  "discussion": [
   "Why is peek a poor place to put business logic such as saving to a database?",
   "Where else in programming have you seen work deferred until a result is actually needed?"
  ],
  "exit": [
   [
    "What does Stream.of(\"x\", \"y\").map(String::toUpperCase); do on its own?",
    "Nothing; there is no terminal operation, so no element is processed."
   ],
   [
    "What does List.of(List.of(1, 2), List.of(3)).stream().flatMap(List::stream).toList() return?",
    "[1, 2, 3]."
   ],
   [
    "Why does Stream.iterate(1, n -> n + 1).limit(3).sorted().toList() finish while the version with sorted before limit does not?",
    "With limit first, sorted only receives three elements. With sorted first, it waits forever for the infinite source to end."
   ]
  ],
  "differentiation": [
   "Support: Give students a trace table with one row per element and one column per operation, so they can fill in each element's path step by step.",
   "Extend: Ask fast finishers to rewrite a pipeline using takeWhile instead of filter and explain when the results differ for an unsorted source."
  ]
 },
 {
  "t": "Terminal operations: forEach, reduce, collect, count, findFirst, anyMatch, toList",
  "objectives": [
   "Students will be able to state the return type of forEach, count, min, max, findFirst, findAny, the match methods, reduce, collect and toList.",
   "Students will be able to predict the result of match methods and reduce forms on empty streams.",
   "Students will be able to choose the most appropriate terminal operation for a described requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show int items = cart.stream().count(); and ask why it fails to compile."
   ],
   [
    12,
    "Teach",
    "Group terminal operations into families on the board with return types. Explain Optional-returning operations, the empty-stream rules for the match methods, the three reduce forms, and the difference between Stream.toList and Collectors.toList."
   ],
   [
    18,
    "Activity",
    "Run the Return Type Bingo activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss why the API returns Optional instead of null for an empty result."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why do you think stream.count() returns a long instead of an int?",
  "activity": {
   "title": "Return Type Bingo",
   "materials": "Printed bingo cards with return types (long, boolean, void, Optional<T>, T, List<T>, Object[]), a projector to show stream expressions, markers.",
   "steps": [
    "Students receive bingo cards with return types in random squares.",
    "The teacher projects a stream expression such as names.stream().anyMatch(...) or Stream.of(1, 2).reduce(Integer::sum), and students mark the matching return type.",
    "After each call, a random student explains the answer, including what happens if the stream is empty.",
    "The first student with a completed row reads back their answers for the class to verify, then play continues to a full card for the remaining time."
   ]
  },
  "discussion": [
   "When is reduce the right tool, and when is collect a better fit?",
   "Why is the vacuous truth of allMatch on an empty stream useful rather than a trap in real code?"
  ],
  "exit": [
   [
    "What type does names.stream().findFirst() return for a List<String>?",
    "Optional<String>."
   ],
   [
    "What does Stream.<Integer>empty().reduce(0, Integer::sum) return?",
    "0, the identity value."
   ],
   [
    "Which terminal operation would you use to check that every password in a list is at least 12 characters long?",
    "allMatch(p -> p.length() >= 12), which returns a boolean and stops at the first failure."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each terminal operation, its return type and its empty-stream result, and allow it during the bingo game.",
   "Extend: Ask fast finishers to write a three-argument reduce that totals the lengths of a Stream<String>, then explain why the combiner is needed for parallel streams."
  ]
 },
 {
  "t": "Collectors: groupingBy, partitioningBy, counting, joining, toMap and merge functions",
  "objectives": [
   "Students will be able to use groupingBy and partitioningBy with and without downstream collectors and state the resulting map type.",
   "Students will be able to explain when toMap throws IllegalStateException and write a merge function to prevent it.",
   "Students will be able to format strings with joining using a delimiter, prefix and suffix.",
   "Students will be able to compare groupingBy on a boolean with partitioningBy for empty groups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hand each student a sticky note with a word and ask the class to physically group themselves by first letter."
   ],
   [
    12,
    "Teach",
    "Use the warm-up groups to introduce groupingBy, then show downstream collectors (counting, mapping, toSet), partitioningBy with both keys always present, toMap with a merge function and joining. Write the result types next to each example."
   ],
   [
    18,
    "Activity",
    "Run the Collector Sort Lab described below."
   ],
   [
    5,
    "Discuss",
    "Ask which collector each part of the help desk dashboard from the warm-up story should use."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Everyone has a word on a sticky note. Group yourselves by the first letter of your word. Which letters ended up with no group, and why does that matter?",
  "activity": {
   "title": "Collector Sort Lab",
   "materials": "A printed deck of 12 product cards (name, category, price, inStock), whiteboard, markers, printed collector expressions.",
   "steps": [
    "Small groups receive the product cards and a sheet of collector expressions, such as groupingBy(Product::category, counting()) and partitioningBy(Product::inStock).",
    "For each expression, groups physically arrange the cards into the resulting map on their desks and write the result, with its exact generic type, on the whiteboard.",
    "Include a toMap by category without a merge function, and ask groups to describe what happens and write the fix.",
    "Groups compare answers with a neighboring group and resolve any differences."
   ]
  },
  "discussion": [
   "Why might the Java designers have chosen to throw on duplicate keys in toMap rather than silently overwrite?",
   "When would a report need partitioningBy rather than groupingBy on a boolean?"
  ],
  "exit": [
   [
    "What is the type of words.stream().collect(partitioningBy(w -> w.isEmpty(), counting()))?",
    "Map<Boolean, Long>."
   ],
   [
    "What happens with toMap(Person::city, Person::name) if two people live in the same city?",
    "It throws IllegalStateException for a duplicate key unless a merge function is supplied."
   ],
   [
    "What does Stream.<String>empty().collect(joining(\",\", \"[\", \"]\")) return?",
    "\"[]\"."
   ]
  ],
  "differentiation": [
   "Support: Give students a cheat sheet mapping each collector call to its result type and an empty-input example, and pair them with a partner for the lab.",
   "Extend: Ask fast finishers to write a nested collector producing Map<String, Map<Boolean, List<String>>>, grouping products by category and then partitioning by inStock."
  ]
 },
 {
  "t": "Primitive streams and summary statistics",
  "objectives": [
   "Students will be able to convert between object streams and IntStream, LongStream and DoubleStream using mapToInt, mapToObj, boxed and asDoubleStream.",
   "Students will be able to state the return types of sum, average, max and min on primitive streams.",
   "Students will be able to use summaryStatistics to compute several values in one pass and predict its results for an empty stream."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: what is the average age of an empty room? Collect answers, then connect them to OptionalDouble."
   ],
   [
    12,
    "Teach",
    "Introduce the three primitive streams and why they avoid boxing, the mapping methods between stream types, the return types of sum, average, max and min, and summaryStatistics with its empty-stream values."
   ],
   [
    18,
    "Activity",
    "Run the Stream Type Detective worksheet described below."
   ],
   [
    5,
    "Discuss",
    "Ask why the API chose MIN_VALUE and MAX_VALUE for empty statistics instead of throwing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What is the average age of the people in an empty room? What should a program return in that case?",
  "activity": {
   "title": "Stream Type Detective",
   "materials": "A printed worksheet of 10 short stream expressions; student laptops with a browser-based Java playground if available; whiteboard.",
   "steps": [
    "In pairs, students write the exact type of each expression, such as IntStream.of(1, 2).average() or Stream.of(\"a\").mapToInt(String::length).max(), or mark Does Not Compile.",
    "Pairs fix every Does Not Compile line, for example by adding mapToInt, boxed or getAsInt.",
    "Pairs with laptops verify two answers by running them, including a summaryStatistics call on an empty stream.",
    "The teacher reviews answers on the whiteboard, asking pairs to explain one fix each."
   ]
  },
  "discussion": [
   "When would the performance difference between Stream<Integer> and IntStream actually matter?",
   "Is returning Integer.MIN_VALUE for an empty maximum a good design? What would you do instead in application code?"
  ],
  "exit": [
   [
    "What does IntStream.rangeClosed(1, 4).average() return?",
    "An OptionalDouble containing 2.5."
   ],
   [
    "How do you get the largest value from IntStream.of(3, 8, 5).max()?",
    "Call getAsInt() on the OptionalInt, which returns 8."
   ],
   [
    "What does getCount() return for summary statistics of an empty IntStream, and what is getMin()?",
    "getCount() returns 0 and getMin() returns Integer.MAX_VALUE."
   ]
  ],
  "differentiation": [
   "Support: Provide a table with the three primitive stream types as columns and sum, average, max and statistics as rows, with return types filled in for students to reference.",
   "Extend: Ask fast finishers to compute summary statistics for a Stream<Order> with Collectors.summarizingDouble and explain how combine supports parallel streams."
  ]
 },
 {
  "t": "Optional: of, ofNullable, map, orElse, orElseGet, orElseThrow",
  "objectives": [
   "Students will be able to create Optionals with of, ofNullable and empty and predict which creation throws for null.",
   "Students will be able to chain map, flatMap and filter to transform an Optional without explicit null checks.",
   "Students will be able to compare orElse, orElseGet and orElseThrow, including when each argument is evaluated."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to describe a time a program crashed or misbehaved because a value was missing."
   ],
   [
    12,
    "Teach",
    "Introduce Optional as a return type, the three creation methods, the test methods, map and flatMap chains, and the three fallback methods. Demonstrate eager orElse versus lazy orElseGet by printing a message inside a default method."
   ],
   [
    18,
    "Activity",
    "Run the Who Runs the Default trace activity described below."
   ],
   [
    5,
    "Discuss",
    "Ask where Optional belongs in an API and where it does not, such as fields and parameters."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a search that might find nothing. What should the search method return in that case, and how should the caller know?",
  "activity": {
   "title": "Who Runs the Default trace",
   "materials": "Printed code cards, each with an Optional expression and a default method that prints a message; a projector; sticky notes for predictions.",
   "steps": [
    "Pairs receive about eight cards mixing Optional.of, ofNullable, map, orElse, orElseGet and orElseThrow, with both empty and full Optionals.",
    "For each card, pairs write on a sticky note the exact console output and the final value or exception.",
    "The teacher reveals answers on the projector one card at a time; pairs score a point for exact output, including whether the default method's message printed.",
    "Pairs rewrite two cards to use the most appropriate fallback method and explain the change."
   ]
  },
  "discussion": [
   "Is it ever acceptable to call get() on an Optional? What would you check first?",
   "Why do the Java designers discourage Optional for fields and method parameters?"
  ],
  "exit": [
   [
    "What does Optional.ofNullable(null).orElse(\"none\") return?",
    "\"none\"."
   ],
   [
    "In opt.orElse(compute()), when does compute() run?",
    "Every time, before orElse is called, whether or not opt has a value."
   ],
   [
    "What does opt.orElseThrow(() -> new IllegalStateException()) do when opt is empty?",
    "It throws the IllegalStateException created by the supplier."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart: is the Optional empty? If yes, which fallback applies? If no, which transformation applies? Let them trace cards with it.",
   "Extend: Ask fast finishers to rewrite a method with three nested null checks as a single Optional chain using flatMap, map and orElseGet."
  ]
 },
 {
  "t": "Stream Gatherers (Java 24+): gather() with Gatherers.windowFixed, windowSliding, fold, scan",
  "objectives": [
   "Students will be able to explain what a gatherer is and how gather differs from collect as an intermediate operation.",
   "Students will be able to predict the output of windowFixed and windowSliding, including the short final window and small-stream cases.",
   "Students will be able to distinguish fold from scan and choose the right one for a described requirement.",
   "Students will be able to identify the parts of a gatherer: initializer, integrator, combiner and finisher."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: how would you compute a three-day moving average of temperatures with only map, filter and collect?"
   ],
   [
    12,
    "Teach",
    "Introduce gather and Gatherer as the intermediate counterpart to collect and Collector, then the four parts of a gatherer. Demonstrate windowFixed, windowSliding, scan and fold on the board with the numbers 1 to 5."
   ],
   [
    18,
    "Activity",
    "Run the Gatherer Bead Strings activity described below."
   ],
   [
    5,
    "Discuss",
    "Ask where students have seen batching or running totals in real systems."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "With only map, filter and collect, how would you compute a three-day moving average of a week of temperatures? What gets awkward?",
  "activity": {
   "title": "Gatherer Bead Strings",
   "materials": "Paper strips with numbered squares 1 to 8 (one per pair), scissors or colored pencils, printed gatherer cards (windowFixed(3), windowSliding(3), scan with addition, fold with addition), whiteboard.",
   "steps": [
    "Each pair draws a gatherer card and applies it to their number strip by circling or cutting windows, or writing running totals under each square.",
    "Pairs write the exact resulting list in Java notation, such as [[1, 2, 3], [4, 5, 6], [7, 8]], on the whiteboard.",
    "Pairs swap cards and repeat, then the teacher adds edge cases: a strip of only 2 squares with windowSliding(3), and scan with an initial value of 10.",
    "The class compares fold and scan outputs side by side and states the difference in one sentence."
   ]
  },
  "discussion": [
   "Why might the Java designers have added a general gatherer mechanism instead of adding separate window and scan methods to Stream?",
   "When would you still prefer a simple loop over a gatherer?"
  ],
  "exit": [
   [
    "What does Stream.of(1, 2, 3, 4, 5).gather(Gatherers.windowFixed(2)).toList() produce?",
    "[[1, 2], [3, 4], [5]]."
   ],
   [
    "For inputs 2, 4, 6 with scan(() -> 0, Integer::sum), what is emitted?",
    "2, 6 and 12."
   ],
   [
    "How many elements does a fold gatherer emit, and what does a pipeline need after it to get the value?",
    "Exactly one result at the end; a terminal operation such as findFirst() or toList() is still needed."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked example strip for each built-in gatherer so students can compare their answers step by step.",
   "Extend: Ask fast finishers to sketch, in plain words, the initializer, integrator and finisher of a custom gatherer that emits only elements larger than every element seen before."
  ]
 },
 {
  "t": "Parallel streams and why stateful lambdas cause problems",
  "objectives": [
   "Students will be able to explain how a parallel stream splits, processes and combines work, and state that a pipeline has a single mode.",
   "Students will be able to predict which terminal operations (forEach, findAny, forEachOrdered, findFirst, toList) give ordered or unordered results in parallel.",
   "Students will be able to identify non-associative operations, false identity values and stateful lambdas that break parallel results.",
   "Students will be able to rewrite a side-effecting forEach into a safe collecting terminal operation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four guesses on the whiteboard without confirming any yet."
   ],
   [
    12,
    "Teach",
    "Project the bad and good ArrayList examples. Explain chunking, the common ForkJoinPool, and why toList keeps encounter order. Then show reduce(0, Integer::sum) next to reduce(10, Integer::sum) and work through two chunks by hand."
   ],
   [
    18,
    "Activity",
    "Run the Human Parallel Stream simulation described below, then debrief which results changed between rounds and why."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the simulation to forEach, collectors and when parallel is slower."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "If four people each count a quarter of a jar of beans and shout their counts to one person writing a running total, what could go wrong? What if each writes a subtotal on their own card first?",
  "activity": {
   "title": "Human Parallel Stream",
   "materials": "Twenty numbered index cards, four sticky-note pads, a whiteboard, and a projector showing the code examples.",
   "steps": [
    "Split the class into four thread groups and give each group five numbered cards as its chunk.",
    "Round 1 (stateful): every group writes its numbers onto one shared whiteboard list at the same time, with no turn-taking. Count the result and note lost or out-of-order numbers.",
    "Round 2 (collector): each group writes its numbers on its own sticky note, in card order; the teacher then merges the notes in group order. Compare the result to the original sequence.",
    "Round 3 (reduce): each group starts a subtotal at 10 instead of 0 and adds its cards; combine the four subtotals and compare with the true sum to show the extra 30.",
    "Groups write one sentence per round naming the Java operation each round modeled."
   ]
  },
  "discussion": [
   "Why does collecting with toList keep order even though the threads finish in random order?",
   "When might a parallel stream be slower than a sequential one in a real application you can imagine?",
   "How would you explain a stateful lambda to a teammate in one sentence?"
  ],
  "exit": [
   [
    "Does List.of(1,2,3).parallelStream().toList() return [1, 2, 3]?",
    "Yes. Collecting keeps encounter order in parallel."
   ],
   [
    "Why is reduce(0, (a, b) -> a - b) unsafe in parallel?",
    "Subtraction is not associative, so different chunk groupings give different results."
   ],
   [
    "What should replace list.add(x) inside a parallel forEach?",
    "A collecting terminal operation such as toList() or collect(Collectors.toList())."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a two-column card listing ordered operations (forEachOrdered, findFirst, toList, collect) and unordered ones (forEach, findAny) to use during the activity and exit ticket.",
   "Extend: ask fast finishers to explain why Stream.iterate and LinkedList split poorly, and to write a parallel reduce using multiplication with the correct identity."
  ]
 },
 {
  "t": "Module-info.java: module, requires, requires transitive, exports, opens",
  "objectives": [
   "Students will be able to write a module-info.java that uses requires, requires transitive, exports and opens correctly.",
   "Students will be able to distinguish exports (compile and run time access to public types) from opens (run-time deep reflection).",
   "Students will be able to explain implied readability and decide when requires transitive is needed.",
   "Students will be able to identify invalid module setups such as cycles, split packages and opens inside an open module."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about public versus accessible on the board."
   ],
   [
    13,
    "Teach",
    "Project the com.shop.orders declaration. Walk through each line, drawing modules as boxes and arrows for requires. Contrast exports and opens with a two-row table: compile time and run time, public and private."
   ],
   [
    17,
    "Activity",
    "Run the Module Gatekeeper card sort described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on why encapsulation helps teams change internal code safely."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions in writing."
   ]
  ],
  "warmup": "In plain Java without modules, if a class is public, who can use it? Is that always what the class's author wants?",
  "activity": {
   "title": "Module Gatekeeper",
   "materials": "Printed scenario cards (one access attempt per card), printed directive cards (requires, requires transitive, requires static, exports, exports ... to, opens, open module), and a whiteboard.",
   "steps": [
    "In pairs, students draw a scenario card such as \"A framework needs to set a private field in com.app.entity\" or \"Callers of our API receive a type from com.lib.model.\"",
    "Pairs choose the directive card that grants exactly the needed access and no more, and write the module-info line on a sticky note.",
    "Pairs place their sticky note on the whiteboard under the module where it belongs.",
    "The class reviews each sticky note; the teacher asks whether the access is compile time, run time or both, and whether a broader directive would expose too much.",
    "Finish with two trick cards: one with opens inside an open module and one with a split package, and have pairs explain why each fails."
   ]
  },
  "discussion": [
   "Why might a team deliberately leave a package with public classes unexported?",
   "What would go wrong for callers if an API returned another module's types but used plain requires?",
   "Why does Java treat reflection on private members as a separate permission from normal access?"
  ],
  "exit": [
   [
    "A package is exported but not opened. Can a framework use setAccessible(true) on its private fields?",
    "No. Deep reflection on private members requires opens."
   ],
   [
    "Module A requires transitive B; module C requires A. Does C read B?",
    "Yes, through implied readability."
   ],
   [
    "Does exporting com.app also export com.app.util?",
    "No. Each package must be exported separately."
   ]
  ],
  "differentiation": [
   "Support: provide a filled-in table with rows for exports and opens and columns for compile time, run time, public members and private members, so students can check each scenario against it.",
   "Extend: have fast finishers write a module-info using a qualified export (exports ... to) and requires static, and explain a realistic reason for each."
  ]
 },
 {
  "t": "Services: uses, provides ... with, and ServiceLoader",
  "objectives": [
   "Students will be able to name the four roles in a service (service interface, consumer, provider, ServiceLoader) and the module that declares each directive.",
   "Students will be able to write module-info declarations for an API module, a provider and a consumer.",
   "Students will be able to use ServiceLoader.load, findFirst and stream with Provider.type() and get().",
   "Students will be able to diagnose a ServiceConfigurationError caused by a missing uses directive or an invalid provider class."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the idea of an agreed interface."
   ],
   [
    12,
    "Teach",
    "Project the three module declarations. Draw arrows for requires and highlight that the consumer never requires the provider. Show the three ways to use ServiceLoader and the provider constructor rule."
   ],
   [
    18,
    "Activity",
    "Run the Plug-in Role Play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare services with requiring a specific implementation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why can you plug almost any charger into a wall outlet without rewiring the house? What has to be agreed in advance?",
  "activity": {
   "title": "Plug-in Role Play",
   "materials": "Name tags labeled API module, Consumer, Provider A, Provider B and ServiceLoader; blank index cards; a whiteboard.",
   "steps": [
    "Assign five students the roles; everyone else is an auditor with blank cards.",
    "Each role student writes the module-info directives for their role on an index card and tapes it on the board under their tag.",
    "The ServiceLoader student walks to each provider, reads their provides line aloud, and returns with a card for each implementation; auditors check the directives are in the right module.",
    "The teacher removes Provider B (unplugging a JAR) and then removes the Consumer's uses line; auditors predict what happens each time (fewer providers; ServiceConfigurationError).",
    "Pairs of auditors write one rule per role and share."
   ]
  },
  "discussion": [
   "What does the consumer gain by never naming the provider module?",
   "Why is it good practice to keep the implementation class in a non-exported package?",
   "When would you use stream() and type() instead of simply iterating the ServiceLoader?"
  ],
  "exit": [
   [
    "Which module declares uses for a service interface?",
    "The consumer that calls ServiceLoader.load."
   ],
   [
    "What does findFirst() return if no provider is present?",
    "An empty Optional."
   ],
   [
    "Name the two ways a provider class can be instantiable by ServiceLoader.",
    "A public no-argument constructor, or a public static no-argument provider() method."
   ]
  ],
  "differentiation": [
   "Support: give students a fill-in template of the three module-info files with blanks only for the directive keywords, and a word bank of uses, provides, with, requires and exports.",
   "Extend: have fast finishers compare the module-based provides directive with the META-INF/services file used on the class path, and explain which one is checked at startup."
  ]
 },
 {
  "t": "Module path vs class path, named, automatic and unnamed modules",
  "objectives": [
   "Students will be able to classify a JAR as a named, automatic or unnamed module from its location and contents.",
   "Students will be able to derive an automatic module name from a file name or Automatic-Module-Name entry.",
   "Students will be able to explain why named modules cannot require the unnamed module and how automatic modules bridge the gap.",
   "Students will be able to describe bottom-up and top-down migration strategies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note answers about how Java finds classes."
   ],
   [
    12,
    "Teach",
    "Project the comparison table. Walk through each module type with a JAR drawing moved between two columns labeled class path and module path. Demonstrate name derivation for two sample file names."
   ],
   [
    18,
    "Activity",
    "Run the Where Does This JAR Go card sort described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about migration choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a library is missing from the class path, when do you find out: when the program starts, or later? Why might that matter in production?",
  "activity": {
   "title": "Where Does This JAR Go",
   "materials": "Printed JAR cards (each states a file name, whether it has module-info.class, and whether it has an Automatic-Module-Name entry), a whiteboard divided into class path and module path columns, sticky notes.",
   "steps": [
    "In groups of three, students receive six JAR cards.",
    "For each card, the group decides where to place it for a given requirement (for example, \"the app module must require this\") and tapes it in a column.",
    "On a sticky note, the group writes the resulting module type and, for automatic modules, the derived name.",
    "The teacher moves one modular JAR from the module path to the class path and asks groups what changes.",
    "Groups present one card each and the class checks the derived names."
   ]
  },
  "discussion": [
   "Why might a library author add Automatic-Module-Name before fully modularizing?",
   "What are the trade-offs between bottom-up and top-down migration for a team with many third-party libraries?",
   "Why do automatic modules read every other module, including the unnamed module?"
  ],
  "exit": [
   [
    "A JAR with module-info.class is placed on the class path. What kind of module is it?",
    "Part of the unnamed module; its descriptor is ignored."
   ],
   [
    "What automatic module name comes from json-utils-3.2.jar with no manifest entry?",
    "json.utils."
   ],
   [
    "Can a named module declare requires on the unnamed module?",
    "No. The unnamed module has no name."
   ]
  ],
  "differentiation": [
   "Support: give students a two-question flowchart (Which path? Has module-info.class?) to classify each JAR card.",
   "Extend: ask fast finishers to describe what happens when two JARs on the module path contain the same package, and how they would fix it."
  ]
 },
 {
  "t": "Compiling and running modules with javac --module-path and java --module",
  "objectives": [
   "Students will be able to write javac and java commands that compile and run a named module with --module-path and --module.",
   "Students will be able to distinguish the meaning of -d for javac and java.",
   "Students will be able to use diagnostic options such as --describe-module, --list-modules and --show-module-resolution.",
   "Students will be able to match common module errors to their causes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display a broken command and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Project the project layout and the two-line compile and run example. Annotate each option. Show the -d contrast side by side, and the --module-source-path form for multiple modules."
   ],
   [
    18,
    "Activity",
    "Run the Command Line Doctor pair exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about early failure."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here is a command: java -d out -m com.greet/com.greet.Main. What do you think it does? Write a guess before we discuss.",
  "activity": {
   "title": "Command Line Doctor",
   "materials": "Printed sheets with eight broken javac or java commands and their error messages, a projector, student laptops with a browser for any note-taking.",
   "steps": [
    "In pairs, students read each broken command and its error message.",
    "Pairs identify the cause, such as a missing -p, a wrong path separator, a malformed -m value, or options placed after the module name.",
    "Pairs write the corrected command beneath each one.",
    "The teacher projects each command and calls on a pair to explain the fix.",
    "Pairs finish by writing one command that compiles two modules with --module-source-path."
   ]
  },
  "discussion": [
   "Why is it useful that module errors appear before any code runs?",
   "Why do you think the tools reuse short options like -d with different meanings, and how will you remember them?",
   "When would you need --add-modules?"
  ],
  "exit": [
   [
    "Write the command to run class com.shop.App in module com.shop with modules in the mods folder.",
    "java -p mods -m com.shop/com.shop.App."
   ],
   [
    "What does -d mean for java?",
    "--describe-module, which prints a module's descriptor."
   ],
   [
    "When can you omit the class name after -m?",
    "When the module's JAR records a main class, set with jar --main-class."
   ]
  ],
  "differentiation": [
   "Support: provide a command template with labeled slots: java -p [where modules are] -m [module]/[package.Class] [program arguments].",
   "Extend: ask fast finishers to explain what java --show-module-resolution would help them discover and to package a module with jar --main-class."
  ]
 },
 {
  "t": "Module import declarations (Java 25): import module and ambiguity rules",
  "objectives": [
   "Students will be able to explain what import module M imports, including types from transitively required modules.",
   "Students will be able to predict where an ambiguity error is reported when two module imports supply the same simple name.",
   "Students will be able to resolve an ambiguity with a single-type import, an on-demand package import or a qualified name.",
   "Students will be able to distinguish import module from requires and import static."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers."
   ],
   [
    12,
    "Teach",
    "Project the Demo example. Explain the import, show the List clash between java.util and java.awt, and draw the shadowing order on the board from strongest to weakest."
   ],
   [
    18,
    "Activity",
    "Run the Ambiguity Detective exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions comparing module imports and explicit imports."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How many import lines does a typical beginner program need to use List, Map, Path and LocalDate? What could replace them all?",
  "activity": {
   "title": "Ambiguity Detective",
   "materials": "Printed code snippets (six short files with different combinations of module imports, package imports and type uses), colored pens, a projector.",
   "steps": [
    "In pairs, students read each snippet and circle every line that would fail to compile.",
    "For each circled line, they write which two types clash.",
    "Pairs propose the smallest fix and label it as a single-type import, an on-demand package import or a qualified name.",
    "The teacher projects each snippet and the class votes on whether it compiles before revealing the answer.",
    "Include one snippet that imports both modules but never uses List, to reinforce that the imports alone are legal."
   ]
  },
  "discussion": [
   "When would you prefer explicit imports over import module in a team project?",
   "Why does the compiler report the error at the use of a name rather than at the import line?",
   "How is import module different from requires in module-info.java?"
  ],
  "exit": [
   [
    "Does import module java.sql; make java.xml types available?",
    "Yes, because java.sql requires java.xml transitively."
   ],
   [
    "With import module java.base and java.desktop, where is the error reported if List is used?",
    "At each line that uses the simple name List, not at the import lines."
   ],
   [
    "Give one fix for the List ambiguity.",
    "Add import java.util.List;, or import java.util.*;, or write java.util.List."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a printed shadowing ladder (same file or package, single-type import, on-demand package import, module import) to consult for each snippet.",
   "Extend: ask fast finishers to find another simple name that could clash between two JDK modules and write a snippet that demonstrates it."
  ]
 },
 {
  "t": "Compact source files and instance main methods (Java 25), java.lang.IO",
  "objectives": [
   "Students will be able to apply the launch protocol to decide which main method runs and whether a class is launchable.",
   "Students will be able to describe the properties of an implicitly declared class created from a compact source file.",
   "Students will be able to use java.lang.IO methods println, print and readln correctly.",
   "Students will be able to state what is imported automatically in compact source files."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write the classic Hello World on the board and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Project the Greeter example. Explain the implicit class and its limits, then the launch protocol as a flowchart: String[] first, then no-arg; not private; instance main needs a non-private no-arg constructor."
   ],
   [
    18,
    "Activity",
    "Run the Launchable or Not exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about learning and growing programs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Which words in public static void main(String[] args) confused you when you first learned Java? Which ones does a beginner really need?",
  "activity": {
   "title": "Launchable or Not",
   "materials": "Printed cards each showing a short class or compact source file with one or more main methods, a whiteboard split into Launches and Fails columns, sticky notes.",
   "steps": [
    "In small groups, students sort ten cards into the Launches or Fails columns on the whiteboard.",
    "For cards that launch, they write on a sticky note which main method runs and whether an object is created.",
    "For cards that fail, they write the rule broken, such as private main, missing no-arg constructor, or bare println without IO.",
    "The teacher reviews each column and asks a group to justify one tricky card, such as a class with both main() and main(String[]).",
    "Students rewrite one failing card so it launches."
   ]
  },
  "discussion": [
   "Do these features make Java simpler to learn, or do they hide things students will need later?",
   "What steps turn a compact source file into a normal class?",
   "Why can't other code refer to the implicit class by name?"
  ],
  "exit": [
   [
    "A class has both static void main(String[] a) and void main(). Which runs?",
    "main(String[] a), because the String[] version is chosen first."
   ],
   [
    "Is private void main() launchable?",
    "No. The chosen main must not be private."
   ],
   [
    "Does a compact source file need import java.util.List; to use List?",
    "No. It automatically imports the java.base module."
   ]
  ],
  "differentiation": [
   "Support: provide the launch protocol as a printed flowchart that students trace for each card.",
   "Extend: ask fast finishers to explain how top-level fields in a compact source file interact with a static main versus an instance main."
  ]
 },
 {
  "t": "Launching single-file and multi-file source programs with the java launcher",
  "objectives": [
   "Students will be able to run a program in source-file mode and explain that no class files are written.",
   "Students will be able to identify which class runs in a single source file and how arguments are passed.",
   "Students will be able to explain how the multi-file launcher finds and compiles other source files on demand.",
   "Students will be able to use --class-path and --source correctly, including in a shebang file."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the steps students name."
   ],
   [
    12,
    "Teach",
    "Project the project tree and commands. Explain the trigger (.java argument), first top-level class rule, on-demand compilation, option placement, and the shebang case requiring --source."
   ],
   [
    18,
    "Activity",
    "Run the Launcher Prediction Walk described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about when to move to a build tool."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List every step you normally take between writing Hello.java and seeing its output. Which steps could a tool do for you?",
  "activity": {
   "title": "Launcher Prediction Walk",
   "materials": "Six posters around the room, each showing a folder tree, file contents summary and a java command; sticky notes; a whiteboard.",
   "steps": [
    "Students rotate in pairs between posters every two to three minutes.",
    "At each poster they write on a sticky note what happens: which class runs, which files are compiled and when, and what main receives as arguments.",
    "Include posters with options after the file name, a file without the .java extension, a helper in the wrong folder, and a two-class file.",
    "Back at their seats, the teacher reveals each answer and pairs score themselves.",
    "The class lists the limits of source mode on the whiteboard."
   ]
  },
  "discussion": [
   "At what point would you stop using source-file mode and set up javac and a build tool?",
   "Why might on-demand compilation make a bug appear later than you expect?",
   "What are the benefits and risks of writing small operations scripts in Java with a shebang line?"
  ],
  "exit": [
   [
    "Does java Tool.java write Tool.class to disk?",
    "No. It compiles in memory only."
   ],
   [
    "In java -cp lib/x.jar App.java one two, what does main receive?",
    "The array [one, two]; -cp is a launcher option because it comes before the file name."
   ],
   [
    "Why does a shebang Java script need --source?",
    "Because its file name does not end in .java, so the launcher needs --source to treat it as source."
   ]
  ],
  "differentiation": [
   "Support: give students a labeled diagram of a java command showing the launcher options zone, the source file, and the program arguments zone.",
   "Extend: ask fast finishers to explain how a compile error in a helper file could go unnoticed during a test run that never reaches that helper."
  ]
 },
 {
  "t": "JDK tools: jar, jdeps, jlink",
  "objectives": [
   "Students will be able to match jar, jdeps and jlink to their purposes and key options.",
   "Students will be able to read jar commands that create, list, extract and record a main class.",
   "Students will be able to use jdeps options such as --jdk-internals and --print-module-deps in a migration plan.",
   "Students will be able to explain why jlink requires named modules and what a runtime image contains."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas."
   ],
   [
    12,
    "Teach",
    "Project the four-command example. Annotate each tool's options, emphasizing jar -c, -t, -x, -e, jdeps --jdk-internals and --print-module-deps, and jlink --module-path, --add-modules, --output and --launcher."
   ],
   [
    18,
    "Activity",
    "Run the Migration Planning Board described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about runtime images."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you ship an application with a full Java installation, how much of it do you think the application actually uses? Why might that matter for security updates?",
  "activity": {
   "title": "Migration Planning Board",
   "materials": "Printed task cards (for example, \"find internal API use\", \"list needed modules\", \"package classes with an entry point\", \"build a trimmed runtime\"), printed command cards, a whiteboard with a four-step timeline.",
   "steps": [
    "In groups, students match each task card to the command card that performs it.",
    "Groups place the matched pairs on the whiteboard timeline in a sensible migration order.",
    "The teacher adds a complication card: one dependency is a plain JAR. Groups decide what must happen before jlink can run.",
    "Each group explains its timeline and one option on a command card.",
    "The class agrees on a final order and copies it into notes."
   ]
  },
  "discussion": [
   "Why does leaving unused modules out of a runtime reduce the attack surface?",
   "Why would jlink refuse automatic modules?",
   "How could jdeps --jdk-internals save a team from a surprise during a Java upgrade?"
  ],
  "exit": [
   [
    "Which jar option lists an archive's contents?",
    "-t, as in jar -tf app.jar."
   ],
   [
    "Which jdeps option produces a module list ready for jlink --add-modules?",
    "--print-module-deps."
   ],
   [
    "Can jlink include a class path JAR?",
    "No. jlink links only explicit named modules."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a one-page reference card with each tool's purpose and three key options to use during the activity.",
   "Extend: ask fast finishers to write a complete jlink command with a launcher and explain what --output requires about the target directory."
  ]
 },
 {
  "t": "Creating threads with Runnable, Thread, and the Thread.Builder API",
  "objectives": [
   "Students will be able to describe Runnable's method signature and its limits.",
   "Students will be able to explain the difference between start() and run() and predict the thread a task runs on.",
   "Students will be able to create threads with Thread constructors and the Thread.Builder API, including start, unstarted and factory.",
   "Students will be able to explain daemon threads, join and the builder options available only for platform threads."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to background work."
   ],
   [
    12,
    "Teach",
    "Project the code example and walk through each creation style. Demonstrate run versus start with a printed thread name. List platform-only builder options and the always-daemon rule for virtual threads."
   ],
   [
    18,
    "Activity",
    "Run the Thread Theater role play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about Runnable versus extending Thread."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of an app that froze while it was doing something. What would you want the app to do instead while the slow work happened?",
  "activity": {
   "title": "Thread Theater",
   "materials": "Index cards with short code snippets (run versus start, start versus unstarted, daemon settings, join), name tags for main and worker threads, a whiteboard timeline.",
   "steps": [
    "One student plays the main thread and reads code cards aloud in order.",
    "When a card calls start(), a new student with a worker name tag stands up and acts out the task; when a card calls run(), the main thread student acts it out personally.",
    "Cards with unstarted() create a worker who stays seated until a later start() card.",
    "A join() card makes the main thread wait until the worker sits down; a daemon card shows the worker leaving when main finishes.",
    "The rest of the class records on the whiteboard timeline which thread printed each line."
   ]
  },
  "discussion": [
   "Why is passing a Runnable to a thread usually better design than subclassing Thread?",
   "Why might you use unstarted() instead of start()?",
   "When is it acceptable that a daemon thread is cut off when the JVM exits?"
  ],
  "exit": [
   [
    "What does calling run() directly on a Thread do?",
    "It runs the task on the current thread; no new thread is created."
   ],
   [
    "Which builder methods exist only for platform threads?",
    "daemon(boolean) and priority(int)."
   ],
   [
    "What does join() do?",
    "Makes the calling thread wait until that thread terminates."
   ]
  ],
  "differentiation": [
   "Support: give students a two-column chart comparing start() and run() with the thread that executes the code in each case.",
   "Extend: ask fast finishers to use Thread.ofPlatform().name(\"w-\", 0).factory() and explain what names threads created by that factory will have."
  ]
 },
 {
  "t": "Platform threads vs virtual threads; Executors.newVirtualThreadPerTaskExecutor()",
  "objectives": [
   "Students will be able to compare platform threads and virtual threads, including carrier threads and mounting.",
   "Students will be able to decide whether a workload is I/O bound or CPU bound and choose the right thread type.",
   "Students will be able to use newVirtualThreadPerTaskExecutor with try-with-resources and limit concurrency with a Semaphore.",
   "Students will be able to state virtual thread properties: always daemon, normal priority, and pinning causes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort answers into waiting and working."
   ],
   [
    12,
    "Teach",
    "Draw carrier threads as lanes on the board and show virtual threads mounting and unmounting during a blocking call. Project the executor example and explain why there is no pool and why a Semaphore limits scarce resources."
   ],
   [
    18,
    "Activity",
    "Run the Restaurant Simulation described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about choosing thread types."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A support agent spends most of each call on hold waiting for another department. How could one agent handle more customers without working any faster?",
  "activity": {
   "title": "Restaurant Simulation",
   "materials": "Order slips (index cards marked W for waiting tasks and C for cooking tasks), four chairs representing carrier threads, a timer, and a whiteboard for results.",
   "steps": [
    "Round 1 (platform threads): four students are waiters who each keep one order slip until it is complete, including a 30-second wait for W slips. Count orders finished in three minutes.",
    "Round 2 (virtual threads): waiters set W slips aside on a parked table during the wait and pick up new slips, returning when the wait ends. Count orders finished again.",
    "Round 3 (CPU-bound): use only C slips, which require continuous work. Show that switching styles does not increase the count.",
    "Add a rule that only two W slips may visit the kitchen at once, modeled with two tokens, to show a Semaphore.",
    "Groups record results on the whiteboard and map each element to a Java term."
   ]
  },
  "discussion": [
   "Why should virtual threads not be pooled?",
   "How would you explain to a manager why virtual threads did not speed up a calculation job?",
   "What problems could heavy ThreadLocal caches cause with very many virtual threads?"
  ],
  "exit": [
   [
    "Do virtual threads make CPU-bound work faster?",
    "Generally no; they help I/O-bound tasks that spend time waiting."
   ],
   [
    "How should you limit virtual threads to 10 concurrent database calls?",
    "Use a Semaphore with 10 permits, not a pool of 10 threads."
   ],
   [
    "What happens if you call setDaemon(false) on a virtual thread?",
    "It throws IllegalArgumentException; virtual threads are always daemon."
   ]
  ],
  "differentiation": [
   "Support: provide a labeled diagram of carrier threads with virtual threads mounting, unmounting during a blocking call, and remounting, for students to annotate.",
   "Extend: ask fast finishers to explain pinning, which cases still cause it, and why long pinning reduces scalability."
  ]
 },
 {
  "t": "ExecutorService, Callable and Future; shutdown, awaitTermination, close()",
  "objectives": [
   "Students will be able to distinguish Runnable from Callable and execute from submit, including what each returns.",
   "Students will be able to explain how Future.get, get with timeout, isDone and cancel behave, including ExecutionException and TimeoutException.",
   "Students will be able to compare shutdown, shutdownNow, awaitTermination and close and predict isShutdown and isTerminated values.",
   "Students will be able to apply try-with-resources to an ExecutorService so that a program finishes its work and exits."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a short main method that submits one Callable to a fixed pool, prints the result and ends without shutdown. Ask students whether the program exits and why. Collect guesses without confirming."
   ],
   [
    13,
    "Teach",
    "Walk through factory methods, then Runnable versus Callable using two lambdas on the board. Draw a Future as a claim ticket and list get, get with timeout, isDone and cancel. Finish with a three-column table: shutdown (stops new work, no wait), awaitTermination (waits), close (both)."
   ],
   [
    17,
    "Activity",
    "Run the Print Shop role-play described below, then have pairs annotate a printed code snippet with what each line returns or throws."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play to real programs that hang at exit or swallow task exceptions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in at the door."
   ]
  ],
  "warmup": "A program submits a task to Executors.newFixedThreadPool(2), prints the result of future.get(), and reaches the end of main. Does the program exit? What is keeping it alive, if anything?",
  "activity": {
   "title": "The Print Shop",
   "materials": "Index cards labeled as tasks (some marked Runnable, some Callable, one marked throws IOException, one marked takes 10 minutes), sticky notes as Future receipts, a whiteboard, and printed code snippets for pairs.",
   "steps": [
    "Choose two students to be pool threads and one to be the counter clerk; the clerk represents the ExecutorService.",
    "Other students submit task cards. For submit, the clerk hands back a sticky-note receipt; for execute, no receipt is given. Ask the class what that means for getting a result.",
    "A student calls get on a receipt and must wait until a thread finishes that card. For the card marked throws IOException, the clerk returns a sealed envelope labeled ExecutionException with the IOException card inside.",
    "Announce shutdown. The clerk refuses new cards (RejectedExecutionException) while threads finish current ones. Ask: is the shop terminated yet? Then announce awaitTermination with a one-minute timeout while the 10-minute card is still running and record whether it returns true or false.",
    "Pairs annotate the printed snippet, writing next to each line what it returns or throws, and rewrite it using try-with-resources. Review two pairs' answers on the board."
   ]
  },
  "discussion": [
   "Why might the designers have made Future.get wrap task exceptions in ExecutionException instead of rethrowing them directly?",
   "When would you prefer shutdown followed by awaitTermination over close, and when would close be the better choice?"
  ],
  "exit": [
   [
    "What does submit return when given a Runnable, and what does get() on it return after the task completes?",
    "A Future<?>; get() returns null once the task has completed."
   ],
   [
    "A Callable throws IOException. What does future.get() throw, and how do you reach the IOException?",
    "ExecutionException; call getCause() to get the original IOException."
   ],
   [
    "Right after shutdown(), while a long task is still running, what do isShutdown() and isTerminated() return?",
    "isShutdown() is true and isTerminated() is false until all tasks finish."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table with each method in one row and columns for what it accepts, what it returns, whether it blocks and what it can throw, and let them fill it in during the role-play.",
   "Extend: Ask fast finishers to compare invokeAll and invokeAny for a set of three suppliers, and to explain what happens to a task that ignores interruption when shutdownNow is called."
  ]
 },
 {
  "t": "Thread lifecycle and start() vs run()",
  "objectives": [
   "Students will be able to name all six Thread.State values and match each to a scenario such as sleep, join or waiting for a lock.",
   "Students will be able to explain the difference between calling start() and run(), including which thread executes the code.",
   "Students will be able to predict when IllegalThreadStateException is thrown and why a terminated thread cannot be restarted.",
   "Students will be able to describe how interruption works and how join can be used to order output between threads."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the start versus run code sample with the output lines hidden. Ask students to write what each call prints. Reveal after the teach segment."
   ],
   [
    12,
    "Teach",
    "Draw a state diagram on the board with the six states and arrows labeled start, lock wait, join, sleep and end of run. Emphasize there is no RUNNING state. Then trace start versus run and the second start call, and explain interrupt and the checked InterruptedException."
   ],
   [
    18,
    "Activity",
    "Run the State Card Sort described below, followed by a short tracing round with printed snippets."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why Java merges running and ready, and why stop() was abandoned."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If you create a Thread named worker and call t.run(), what does Thread.currentThread().getName() print inside the task? What if you call t.start()?",
  "activity": {
   "title": "State Card Sort",
   "materials": "Printed cards with the six state names, printed scenario cards (for example: inside Thread.sleep(500); waiting to enter a synchronized method; inside join() with no timeout; just constructed; run() returned; executing a loop), tape, a whiteboard, and three printed code snippets per pair.",
   "steps": [
    "Tape the six state cards across the whiteboard as column headers.",
    "Give each small group a shuffled set of scenario cards. Groups place each scenario under the correct state and justify one choice aloud.",
    "Add trick cards such as RUNNING and SLEEPING; groups must identify them as not real states and explain what the real state would be.",
    "Hand out snippets: one calls run() then start(), one calls start() twice, one starts a thread and prints from main without join. Pairs write the output, an exception, or that the order cannot be determined.",
    "Review answers, asking each pair to point to the state diagram while explaining."
   ]
  },
  "discussion": [
   "Why do you think Java reports both running and ready-to-run threads as RUNNABLE instead of separating them?",
   "Interruption is cooperative. What are the benefits and risks of asking a thread to stop rather than forcing it?"
  ],
  "exit": [
   [
    "Which state is a thread in while it waits to enter a synchronized method held by another thread?",
    "BLOCKED."
   ],
   [
    "What happens if you call start() on a thread that has already terminated?",
    "IllegalThreadStateException is thrown; a thread can be started only once."
   ],
   [
    "Main calls t.run() and t is a Thread named worker. Which thread executes the task and what is t's state afterward?",
    "The main thread executes it as an ordinary method call, and t is still NEW."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed state diagram with arrows already drawn and blank labels; students fill in the method or event for each arrow before attempting the card sort.",
   "Extend: Ask fast finishers to write a short program outline in which main starts two threads and guarantees their output appears after both finish, and to explain what happens to the interrupt flag when InterruptedException is caught."
  ]
 },
 {
  "t": "Race conditions, synchronized blocks and methods, and visibility",
  "objectives": [
   "Students will be able to explain why count++ on a shared field is a race condition by breaking it into read, add and write steps.",
   "Students will be able to identify which lock a synchronized block, instance method or static method uses and whether two pieces of code exclude each other.",
   "Students will be able to distinguish visibility from atomicity and decide when volatile is sufficient.",
   "Students will be able to describe happens-before edges created by lock release and acquisition, start and join."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: two threads each increment a shared int one million times. What totals could print? Collect answers on the board."
   ],
   [
    12,
    "Teach",
    "Break count++ into three steps and show an interleaving that loses an update. Introduce intrinsic locks and the three synchronized forms, writing which object each locks. Explain visibility with a stop flag example, happens-before and the limits of volatile."
   ],
   [
    18,
    "Activity",
    "Run the Whiteboard Tally role-play described below, then have pairs mark up the Counter class and a two-method example."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect locks to design choices such as immutability."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Two threads each run count++ one million times on the same int field, starting from zero. What are the possible final values, and why?",
  "activity": {
   "title": "Whiteboard Tally",
   "materials": "A whiteboard with a number written on it, one marker designated as the lock, scrap paper for each participant, and a printed Counter class excerpt for each pair.",
   "steps": [
    "Pick two students as threads. Each must read the board value onto scrap paper, add one on paper, then erase and write the new value, repeating five times. Let them work at the same time without the lock marker and count how many increments were lost.",
    "Repeat the round with the rule that only the student holding the lock marker may read or write the board. Compare the final value with the first round.",
    "Add a third student as a reader who looks at a photo taken earlier of the board instead of the board itself, illustrating a stale value; discuss how locking or volatile fixes visibility.",
    "Pairs annotate the printed Counter class, labeling which object each method locks and rewriting it so every access uses the same lock.",
    "Pairs then decide whether a synchronized static method and a synchronized instance method can run at the same time, and share answers."
   ]
  },
  "discussion": [
   "Immutable objects never need locks. What kinds of data in a real application could be made immutable to avoid synchronization?",
   "Why might a team choose an explicit lock object over synchronizing on this?"
  ],
  "exit": [
   [
    "Why can count++ lose updates when two threads run it at the same time?",
    "It is a separate read, add and write; another thread can interleave between them and overwrite the result."
   ],
   [
    "Does a synchronized static method exclude a synchronized instance method of the same class?",
    "No. The static method locks the Class object and the instance method locks the instance."
   ],
   [
    "Is declaring a counter volatile enough to make count++ thread-safe?",
    "No. volatile provides visibility but not atomicity; use synchronized, a lock or an atomic class."
   ]
  ],
  "differentiation": [
   "Support: Give students an interleaving table with two thread columns and rows for each step of count++, and have them fill in values to see the lost update before moving to code.",
   "Extend: Ask fast finishers to list every happens-before edge in a program where main sets a field, starts a thread, and later joins it, and to explain why reading the field after join is safe."
  ]
 },
 {
  "t": "Atomic classes (AtomicInteger, AtomicLong) and locks (ReentrantLock, tryLock)",
  "objectives": [
   "Students will be able to predict the return values of incrementAndGet, getAndIncrement, getAndAdd, compareAndSet and updateAndGet.",
   "Students will be able to explain why atomic classes protect a single variable but not an invariant across several variables.",
   "Students will be able to write the correct lock, try, finally unlock pattern and the tryLock pattern for a ReentrantLock.",
   "Students will be able to identify when IllegalMonitorStateException occurs and how a reentrant hold count works."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project an AtomicInteger starting at 5 and four calls in sequence. Students write each return value and the final value on scrap paper."
   ],
   [
    12,
    "Teach",
    "Explain compare-and-swap with a simple diagram, then the get-and versus and-get naming rule. Show the transfer example and stress lock before try and unlock in finally. Introduce tryLock with and without timeout, fairness and the hold count."
   ],
   [
    18,
    "Activity",
    "Run the Storeroom Key role-play and the code repair round described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare synchronized with ReentrantLock."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "An AtomicInteger holds 5. What do getAndIncrement(), then incrementAndGet(), then getAndAdd(10) each return, and what is the final value?",
  "activity": {
   "title": "The Storeroom Key",
   "materials": "One physical object to act as a lock (a key or marker), a tally counter or whiteboard, printed broken code snippets for pairs, and sticky notes.",
   "steps": [
    "Two students act as threads that must move three tokens from jar A to jar B as one unit; a third student tries to count both jars at the same time. Without the key, show that the counter can see a total that is temporarily wrong.",
    "Introduce the key: only the holder may touch either jar. Repeat the move and the count to show the invariant now holds.",
    "Act out tryLock: a student who finds the key taken says busy and walks away instead of waiting. Act out reentrancy: the holder picks up the key twice and must put it down twice, tracked with tally marks.",
    "Pairs receive three broken snippets: one without finally, one that unlocks after a failed tryLock, and one that uses two separate atomics for a transfer. They name the bug and write the fix on a sticky note.",
    "Pairs post fixes on the board and the class checks each one against the lock, try, finally rule."
   ]
  },
  "discussion": [
   "If synchronized already gives mutual exclusion, what situations justify the extra responsibility of an explicit ReentrantLock?",
   "Fair locks reduce starvation but lower throughput. How would you decide which to use?"
  ],
  "exit": [
   [
    "An AtomicLong holds 10. What does getAndAdd(5) return and what is the new value?",
    "It returns 10 and the value becomes 15."
   ],
   [
    "Why must unlock() go in a finally block?",
    "An explicit lock is not released automatically; finally ensures it is released even if the guarded code throws."
   ],
   [
    "What happens if a thread calls unlock() after tryLock() returned false?",
    "IllegalMonitorStateException is thrown because the thread does not hold the lock."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat card that pairs each atomic method with its operator equivalent (++x, x++, and so on) and a fill-in template of the lock, try, finally pattern.",
   "Extend: Ask fast finishers to write a compareAndSet retry loop that decrements a stock count only when it is above zero, and to explain why the lambda in updateAndGet must not have side effects."
  ]
 },
 {
  "t": "Concurrent collections: ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue",
  "objectives": [
   "Students will be able to choose between ConcurrentHashMap, CopyOnWriteArrayList and a BlockingQueue for a described access pattern.",
   "Students will be able to predict the result of modifying a collection during iteration for ArrayList and CopyOnWriteArrayList.",
   "Students will be able to classify BlockingQueue methods into throwing, returning a special value, blocking and timed groups.",
   "Students will be able to explain why get-then-put is a race on ConcurrentHashMap and how merge or compute avoids it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a for-each loop that adds to an ArrayList while iterating and ask what happens. Then change the type to CopyOnWriteArrayList and ask again."
   ],
   [
    12,
    "Teach",
    "Contrast synchronized wrappers with concurrent collections. Cover ConcurrentHashMap's weakly consistent iterators, null rule and atomic merge. Explain copy-on-write snapshots. Draw a producer-consumer diagram and fill in a four-row table of BlockingQueue methods."
   ],
   [
    18,
    "Activity",
    "Run the Kitchen Pass simulation and the scenario card sort described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A for-each loop over an ArrayList adds an element on each pass. What happens? Would the answer change if the list were a CopyOnWriteArrayList?",
  "activity": {
   "title": "The Kitchen Pass",
   "materials": "A desk serving as the queue with room for three paper plates (or cards), paper plates, a timer, printed scenario cards describing access patterns, and a whiteboard.",
   "steps": [
    "Two students are producers (cooks) and two are consumers (servers). The desk holds at most three plates, representing a bounded BlockingQueue.",
    "Run rounds where producers use put and consumers use take: when the desk is full, cooks must wait; when it is empty, servers must wait. Then run a round using offer and poll, where students walk away instead of waiting, and record how many plates were dropped.",
    "Hand out scenario cards (for example: listener list rarely changed and constantly notified; word counts updated by many threads; jobs passed from downloaders to resizers). Groups sort each card under ConcurrentHashMap, CopyOnWriteArrayList or BlockingQueue.",
    "Each group justifies one placement aloud and names one method they would call, such as merge, take or add.",
    "Close by filling in the BlockingQueue method table on the board together."
   ]
  },
  "discussion": [
   "Why might ConcurrentHashMap forbid null keys and values when HashMap allows them?",
   "What are the risks of an unbounded queue between fast producers and slow consumers?"
  ],
  "exit": [
   [
    "Which BlockingQueue method blocks when the queue is empty, and which returns null immediately?",
    "take() blocks; poll() without a timeout returns null immediately."
   ],
   [
    "What does a for-each loop that adds to a CopyOnWriteArrayList see during iteration?",
    "Only the elements present when the loop started, because the iterator uses a snapshot; no exception is thrown."
   ],
   [
    "How should many threads increment counts in a ConcurrentHashMap safely?",
    "Use an atomic method such as merge(key, 1, Integer::sum) instead of get followed by put."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision flowchart with three questions (Is it a map? Are writes rare? Are you handing off work between threads?) leading to the right collection.",
   "Extend: Ask fast finishers to compare ConcurrentSkipListMap with ConcurrentHashMap and to describe a scenario where sorted concurrent access is required."
  ]
 },
 {
  "t": "Deadlock, starvation and livelock",
  "objectives": [
   "Students will be able to distinguish deadlock, livelock and starvation from a description, code sample or thread state.",
   "Students will be able to name the four conditions required for deadlock and explain how lock ordering breaks one of them.",
   "Students will be able to propose a fix for each liveness problem, such as consistent lock order, randomized backoff or fair locks.",
   "Students will be able to explain how a thread dump from jstack or jcmd helps diagnose a deadlock."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Describe the two-customer transfer freeze from the lesson hook and ask students to guess why CPU usage is near zero."
   ],
   [
    12,
    "Teach",
    "Draw two threads and two locks with arrows forming a cycle. List the four deadlock conditions and show lock ordering. Contrast with livelock (RUNNABLE, busy) and starvation (some threads never served), and describe what a thread dump reports."
   ],
   [
    18,
    "Activity",
    "Run the Hallway Simulation and the diagnosis cards described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the problems to real system design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Two bank transfers between the same two accounts, in opposite directions, both hang forever with no errors and almost no CPU use. What might the threads be doing?",
  "activity": {
   "title": "The Hallway Simulation",
   "materials": "Two objects to serve as locks (for example two markers labeled A and B), masking tape to mark a narrow hallway on the floor, printed diagnosis cards with symptoms and thread states, and a whiteboard.",
   "steps": [
    "Deadlock round: Student 1 picks up marker A and reaches for B; Student 2 picks up B and reaches for A. Neither may let go. The class names the four conditions they can see.",
    "Fix round: introduce the rule that everyone picks up A before B. Repeat and observe that one student finishes first.",
    "Livelock round: two students walk toward each other in the taped hallway and must always step to the same side as the other. After a few steps, add the rule to wait a random count of one to three before moving, and watch the symmetry break.",
    "Starvation round: one student repeatedly tries to take a marker but the teacher always hands it to someone else first. Discuss how a fair queue would help.",
    "Groups receive diagnosis cards (for example: CPU high, threads RUNNABLE, no progress) and label each as deadlock, livelock or starvation with a proposed fix, then share."
   ]
  },
  "discussion": [
   "Lock ordering requires every developer to follow the same rule. How could a team make sure the rule is followed across a large codebase?",
   "Why can a restart hide a deadlock bug rather than fix it?"
  ],
  "exit": [
   [
    "Threads are RUNNABLE, CPU is high and no work completes as they keep reacting to each other. Which problem is it?",
    "Livelock."
   ],
   [
    "Name the four conditions required for deadlock.",
    "Mutual exclusion, hold and wait, no preemption, and circular wait."
   ],
   [
    "What is the standard fix for two threads that lock A then B and B then A?",
    "Have every thread acquire the locks in the same consistent order."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column comparison chart (waiting or busy, who is stuck, typical fix) to fill in during the simulation.",
   "Extend: Ask fast finishers to sketch a transfer method that uses tryLock with a timeout on both accounts and backs off with a random delay, and to explain which deadlock condition this breaks."
  ]
 },
 {
  "t": "Scoped values (Java 25): ScopedValue.where(...).run(...) as an alternative to ThreadLocal",
  "objectives": [
   "Students will be able to explain the drawbacks of ThreadLocal, including data leaking between tasks on pooled threads.",
   "Students will be able to write code that creates a ScopedValue key, binds it with where(...).run(...) and reads it with get, isBound or orElse.",
   "Students will be able to predict whether a scoped value is bound, and to which value, before, during and after nested where(...).run(...) calls.",
   "Students will be able to choose between ThreadLocal and ScopedValue for a described scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Tell the lesson hook story of a user name leaking into the next request through a ThreadLocal, and ask students to brainstorm why it happened."
   ],
   [
    12,
    "Teach",
    "Contrast ThreadLocal set and remove with ScopedValue binding for a dynamic scope. Walk through the USER example on the projector, showing newInstance, where, run, get, isBound and orElse, and explain NoSuchElementException. Draw nested scopes as boxes inside boxes to show rebinding."
   ],
   [
    18,
    "Activity",
    "Run the Visitor Badge trace described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare the two designs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A request handler puts the current user into a ThreadLocal on a pooled thread and forgets to remove it when an exception occurs. What could the next request on that thread see?",
  "activity": {
   "title": "The Visitor Badge Trace",
   "materials": "Printed badges or sticky notes with values written on them, a whiteboard showing nested boxes for method calls, and printed code snippets with nested where(...).run(...) calls for each pair.",
   "steps": [
    "Draw a large box labeled handle and smaller boxes inside it labeled service and audit. Hand a student a badge reading USER = ana as they step into the handle box; any student inside any inner box may read it aloud but not change it.",
    "Have a nested step rebind USER to system by placing a new badge on top inside one inner box. When that box closes, remove the top badge and show that ana is visible again.",
    "When the handle box closes, collect the badge and ask a student outside to read USER; the class responds with NoSuchElementException.",
    "Pairs trace three printed snippets, writing the value printed at each marked line or the exception thrown, including one that uses orElse and one that chains two bindings.",
    "Pairs compare answers with another pair and resolve differences, then the teacher reviews the trickiest line."
   ]
  },
  "discussion": [
   "Why might the designers have chosen not to give ScopedValue a set method?",
   "Can you think of a case where a mutable per-thread value is genuinely the right design, so ThreadLocal is still the better choice?"
  ],
  "exit": [
   [
    "What happens if code calls USER.get() when USER is not bound?",
    "It throws NoSuchElementException."
   ],
   [
    "After ScopedValue.where(USER, \"ana\").run(task) returns, is USER still bound to ana in the caller?",
    "No. The binding lasts only for the duration of run."
   ],
   [
    "How can a piece of code use a different value for USER during one step without affecting the rest of the request?",
    "Rebind it with a nested ScopedValue.where(USER, newValue).run(...) for that step; the outer value returns when it finishes."
   ]
  ],
  "differentiation": [
   "Support: Give students a fill-in template with the five key calls (newInstance, where, run, get, isBound) and a one-line description of each, and let them trace only the first snippet with a partner.",
   "Extend: Ask fast finishers to rewrite a short ThreadLocal-based request ID example using two chained scoped value bindings and call(...) to return a result, and to explain why no cleanup code is needed."
  ]
 },
 {
  "t": "Path creation and operations: resolve, relativize, normalize, getFileName, getParent",
  "objectives": [
   "Students will be able to predict the results of getFileName, getParent, getRoot, getNameCount and subpath, including null edge cases.",
   "Students will be able to apply resolve, resolveSibling, relativize and normalize and identify when relativize throws IllegalArgumentException.",
   "Students will be able to distinguish methods that only manipulate path text from toRealPath, which accesses the file system.",
   "Students will be able to use normalize and startsWith to defend against path traversal."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write three resolve expressions on the board, one with an absolute argument, and have students predict each result."
   ],
   [
    12,
    "Teach",
    "Draw a path as a row of boxes with a root box at the front. Point to each box while demonstrating getFileName, getParent, getRoot, getName and subpath. Then demonstrate resolve and its absolute rule, relativize as directions, normalize as crossing out, and toRealPath as the only method here that checks the disk."
   ],
   [
    18,
    "Activity",
    "Run the Path Card Puzzle described below, followed by the traversal defense challenge."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect path handling to security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "What do Path.of(\"/home/ana\").resolve(\"docs\") and Path.of(\"/home/ana\").resolve(\"/etc\") each produce?",
  "activity": {
   "title": "The Path Card Puzzle",
   "materials": "Printed cards each showing one name element (/, srv, app, conf, .., ., app.properties), tape, a whiteboard, and student laptops with a browser for an optional check in any free online Java runner.",
   "steps": [
    "Groups lay out cards to form a path such as /srv/app/conf/../conf/./app.properties on their desks.",
    "The teacher calls out a method (getFileName, getParent, getNameCount, subpath(1,3), normalize). Groups physically point to or remove cards to show the result and write it down.",
    "For relativize, two groups each build a path and work out the directions from one to the other using .. cards; include one round mixing absolute and relative paths so groups discover the IllegalArgumentException rule.",
    "Traversal challenge: give each group a malicious file name card sequence such as ../../etc/passwd. Groups resolve it against an uploads base, normalize it, and decide whether startsWith(uploads) passes.",
    "Optionally verify two of the answers in a free browser-based Java runner on the projector."
   ]
  },
  "discussion": [
   "Why is it useful that creating a Path never touches the disk, and when could that surprise a developer?",
   "What extra risk do symbolic links add to path traversal checks, and which method helps?"
  ],
  "exit": [
   [
    "What is Path.of(\"/a/b\").relativize(Path.of(\"/a/c/d\"))?",
    "../c/d"
   ],
   [
    "What does Path.of(\"/a/./b/../c\").normalize() return, and does it check the disk?",
    "/a/c; no, normalize is purely textual."
   ],
   [
    "Which method returns null for Path.of(\"notes.txt\"): getFileName or getParent?",
    "getParent, because a single-element relative path has no parent."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each method with one worked example, and let students use it during the card puzzle.",
   "Extend: Ask fast finishers to explain why base.resolve(name).normalize().startsWith(base) can still be bypassed by symbolic links and how toRealPath changes the check."
  ]
 },
 {
  "t": "Files methods: exists, createDirectory vs createDirectories, copy, move, delete",
  "objectives": [
   "Students will be able to compare createDirectory and createDirectories and predict when each throws FileAlreadyExistsException or NoSuchFileException.",
   "Students will be able to explain the default behavior of Files.copy and Files.move on an existing target and the effect of REPLACE_EXISTING and ATOMIC_MOVE.",
   "Students will be able to distinguish delete from deleteIfExists, including DirectoryNotEmptyException.",
   "Students will be able to explain why check-then-act with exists is a race and choose a safer pattern."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the invoice export stack trace from the lesson hook (NoSuchFileException on createDirectory) and ask students to guess the cause."
   ],
   [
    12,
    "Teach",
    "Draw a small directory tree on the board. Demonstrate createDirectory versus createDirectories against it, then copy and move with and without REPLACE_EXISTING, ATOMIC_MOVE, and the empty directory result of copying a folder. Finish with delete versus deleteIfExists and the exists race."
   ],
   [
    18,
    "Activity",
    "Run the Exception Prediction Relay described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect API defaults to safe design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A program calls Files.createDirectory(Path.of(\"invoices/2026/10\")) and the folder invoices/2026 does not exist. What happens, and what would you change?",
  "activity": {
   "title": "Exception Prediction Relay",
   "materials": "A whiteboard with a drawn starting directory tree, printed operation cards (for example: createDirectory on an existing folder; copy onto an existing file without options; delete a folder with two files; deleteIfExists on a missing file; move to a folder whose parent is missing), and colored sticky notes.",
   "steps": [
    "Divide the class into teams and draw the same starting directory tree on the board for everyone.",
    "A team draws an operation card, applies it to the current tree, and writes on a sticky note either the result (the tree change or return value) or the exception thrown.",
    "The other teams vote whether they agree. If correct, the team updates the board tree to reflect the change and earns a point.",
    "After all cards are played, teams rewrite two of the failing operations so they succeed, naming the method or option they would change.",
    "Close by listing on the board each exception seen and the method that caused it."
   ]
  },
  "discussion": [
   "Why might the API designers have made copy and move refuse to overwrite by default?",
   "When is it better to just attempt an operation and catch the exception rather than check exists first?"
  ],
  "exit": [
   [
    "What does Files.createDirectories do if the directory already exists?",
    "Nothing; it does not throw, which makes it safe to call every run."
   ],
   [
    "Files.copy(a, b) is called and b exists. What happens without options, and how do you overwrite?",
    "FileAlreadyExistsException is thrown; pass StandardCopyOption.REPLACE_EXISTING to overwrite."
   ],
   [
    "What do Files.delete and Files.deleteIfExists do for a path that does not exist?",
    "delete throws NoSuchFileException; deleteIfExists returns false."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference table listing each method with its success result and the exceptions it can throw, and let students consult it during the relay.",
   "Extend: Ask fast finishers to outline how to safely publish a report by writing to a temporary file and moving it with ATOMIC_MOVE, and what to do if AtomicMoveNotSupportedException is thrown."
  ]
 },
 {
  "t": "Reading and writing text with Files.readAllLines, Files.lines, Files.writeString",
  "objectives": [
   "Students will be able to state the return types of readAllLines, readString and lines and choose the right one for a file size.",
   "Students will be able to explain why the stream from Files.lines must be closed and how errors surface as UncheckedIOException.",
   "Students will be able to predict the effect of writeString with no options, with APPEND alone, and with CREATE and APPEND.",
   "Students will be able to identify the exceptions caused by missing files, missing directories, CREATE_NEW and bad encoding."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students what would happen if a program loaded a 20 GB log file into a List<String>. Collect answers."
   ],
   [
    12,
    "Teach",
    "Compare readAllLines, readString and lines in a three-column table with return type, memory use and whether you must close. Then show writeString defaults (CREATE, TRUNCATE_EXISTING, WRITE), the replace-defaults rule for options, APPEND with CREATE, and CREATE_NEW."
   ],
   [
    18,
    "Activity",
    "Run the Bug Hunt pair exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to talk about defaults and data loss."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "If you call Files.writeString(notes, newNote) every time a user saves a note, what does the file contain after three saves?",
  "activity": {
   "title": "Bug Hunt: Lost Notes and Full Memory",
   "materials": "Printed code snippets (six short programs using readAllLines, lines, writeString and write with various options), printed descriptions of the file system state for each snippet, highlighters, and a projector.",
   "steps": [
    "Pairs receive the six snippets with the file system state for each, such as the file exists with three lines, the file is missing, or the parent folder is missing.",
    "For each snippet, pairs write the outcome: file contents afterward, the value returned, or the exception thrown.",
    "Pairs highlight one bug per snippet where one exists (missing try-with-resources around Files.lines, APPEND without CREATE, readAllLines on a huge file, writeString truncating notes) and write the corrected line.",
    "Two pairs compare answers and agree on a final version for each snippet.",
    "The teacher projects the snippets and calls on pairs to explain their fixes."
   ]
  },
  "discussion": [
   "Why might writeString default to replacing content instead of appending, and what kinds of bugs can that cause?",
   "When would you still prefer readAllLines over Files.lines, even though lines handles larger files?"
  ],
  "exit": [
   [
    "What does Files.lines return, and why must it be closed?",
    "A Stream<String>; it holds the file open until the stream is closed."
   ],
   [
    "What happens when you call Files.writeString(path, text, StandardOpenOption.APPEND) and the file does not exist?",
    "NoSuchFileException, because passing APPEND replaces the defaults so CREATE is not implied."
   ],
   [
    "Which method returns a List<String> of all lines and closes the file for you?",
    "Files.readAllLines."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart: Is the file large? Use lines in try-with-resources. Do you need to add to a file? Use CREATE plus APPEND. Must you never overwrite? Use CREATE_NEW.",
   "Extend: Ask fast finishers to write a pipeline using Files.lines that counts lines by log level into a Map, and to explain how an encoding error would surface during that pipeline."
  ]
 },
 {
  "t": "Walking file trees: Files.list vs Files.walk vs Files.find",
  "objectives": [
   "Students will be able to compare Files.list, Files.walk and Files.find by recursion, inclusion of the start path and required parameters.",
   "Students will be able to predict the contents of Files.walk(dir, n) for a given tree and maxDepth.",
   "Students will be able to write a Files.find matcher using BasicFileAttributes to filter by size, type or modification time.",
   "Students will be able to explain why these streams belong in try-with-resources and how errors during traversal surface."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Draw a small directory tree and ask students which entries an ls of the top folder would show, and which a full recursive search would show."
   ],
   [
    12,
    "Teach",
    "Use the tree on the board to demonstrate list (direct children only), walk (start path first, depth-first, maxDepth examples 0, 1 and 2) and find (required maxDepth, BiPredicate with BasicFileAttributes). Explain UncheckedIOException during traversal and briefly introduce walkFileTree for deleting a tree."
   ],
   [
    18,
    "Activity",
    "Run the Tree Walk card exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the methods to real tasks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Given a folder project containing src/Main.java, src/util/Io.java and README.md, which paths would a command that lists only the top level show?",
  "activity": {
   "title": "Tree Walk",
   "materials": "Printed cards each showing one path from a sample tree (with file sizes written on file cards), string or tape to arrange them as a tree on a desk or wall, a whiteboard, and printed method calls for each group.",
   "steps": [
    "Groups arrange the path cards as a tree, with the start directory at the top and its children and grandchildren below.",
    "The teacher calls out method calls one at a time: Files.list(project), Files.walk(project), Files.walk(project, 0), Files.walk(project, 1), and Files.find(project, 5, matcher for files over a given size).",
    "For each call, groups collect the matching cards in the order the stream would return them (start path first for walk) and lay them in a line.",
    "Groups write the Java call that would produce a given set of cards that the teacher holds up, such as all files over 1 MB at any depth.",
    "Review answers, highlighting the start path difference between list and walk and that find requires maxDepth."
   ]
  },
  "discussion": [
   "Why might it be better to fail fast with an exception when a folder cannot be read, and when would you rather skip it and continue?",
   "Why does deleting a directory tree require visiting directories after their contents?"
  ],
  "exit": [
   [
    "Which of the three methods includes the start directory in its stream?",
    "Files.walk (and Files.find, if the matcher accepts it); Files.list does not."
   ],
   [
    "What does Files.walk(dir, 1) return?",
    "dir itself plus its direct children."
   ],
   [
    "Write the parameter list of Files.find.",
    "A start Path, an int maxDepth, and a BiPredicate<Path, BasicFileAttributes> matcher, optionally followed by FileVisitOption values."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-row comparison card (recursive or not, includes start or not, required parameters) to fill in while doing the card exercise.",
   "Extend: Ask fast finishers to sketch a SimpleFileVisitor that deletes a directory tree, naming which callback deletes files and which deletes directories, and to explain how visitFileFailed could let the walk continue past an unreadable folder."
  ]
 },
 {
  "t": "Byte and character streams, BufferedReader and BufferedWriter",
  "objectives": [
   "Students will be able to classify java.io classes as byte or character streams by name and purpose.",
   "Students will be able to explain why buffering improves performance and why unflushed output is lost.",
   "Students will be able to predict the end-of-data value returned by read() and readLine().",
   "Students will be able to build a correct wrapped stream chain inside try-with-resources."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect two or three guesses on the board without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Draw the four abstract roots (InputStream, OutputStream, Reader, Writer) and sort concrete classes under them. Show the decorator chain and walk the readLine loop line by line, stressing -1 versus null."
   ],
   [
    15,
    "Activity",
    "Run the stream-chain card sort in pairs, then have pairs predict outputs of short read loops."
   ],
   [
    8,
    "Discuss",
    "Debrief the activity using the discussion questions, linking each answer back to the class-name rule and flushing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "You copy a 1 GB file one byte at a time and it takes ten minutes. Without changing the hardware, what could make it dramatically faster?",
  "activity": {
   "title": "Build the stream chain",
   "materials": "Printed cards, each naming one class (FileInputStream, FileReader, BufferedReader, BufferedWriter, InputStreamReader, PrintWriter, ObjectInputStream, FileWriter, BufferedInputStream), a whiteboard and markers.",
   "steps": [
    "Pairs sort the cards into four piles under InputStream, OutputStream, Reader and Writer, using only the class names.",
    "The teacher reads out tasks such as \"read UTF-8 text from the keyboard line by line\" and \"copy a JPEG\"; pairs line up cards left to right as a wrapper chain.",
    "Each pair writes its chain on the board as Java constructor code inside a try-with-resources header.",
    "The class checks each chain for the wrong family, a missing bridge, or no buffering, and corrects it together.",
    "Pairs predict the printed output of a projected loop that uses read() and one that uses readLine(), naming the end-of-data value."
   ]
  },
  "discussion": [
   "When would you deliberately choose a byte stream for data that happens to be text?",
   "PrintWriter hides IOExceptions behind checkError(). When is that convenient, and when is it risky?",
   "Why does closing the outermost wrapper, rather than the innermost stream, matter for buffered writers?"
  ],
  "exit": [
   [
    "What value signals end of data for InputStream.read() and for BufferedReader.readLine()?",
    "-1 for read(), null for readLine()."
   ],
   [
    "Which class bridges System.in to a character Reader?",
    "InputStreamReader."
   ],
   [
    "A BufferedWriter program ends without closing the writer. What can go wrong?",
    "The last buffered data may never be written, so the file is missing output."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat card (ends in Stream means bytes, ends in Reader or Writer means characters) and let them sort only four cards first.",
   "Extend: Ask fast finishers to rewrite a chain using Files.newBufferedReader and Files.newBufferedWriter with StandardOpenOption.APPEND and explain what changes."
  ]
 },
 {
  "t": "Console and standard input/output",
  "objectives": [
   "Students will be able to identify the types of System.in, System.out and System.err and when to use each.",
   "Students will be able to write correct printf format strings using %s, %d, %.2f and %n.",
   "Students will be able to explain why System.console() must be null-checked and why readPassword returns char[].",
   "Students will be able to diagnose the Scanner nextInt then nextLine empty-string problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about where error messages should go."
   ],
   [
    12,
    "Teach",
    "Show the three standard streams with a diagram of redirection, demonstrate printf specifiers, then walk through the Console code sample and the char[] reasoning."
   ],
   [
    15,
    "Activity",
    "Pairs work through the printed output-prediction cards and fix the buggy console program."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to connect the activity to secure handling of credentials."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "If a program prints both results and error messages, and you save its output to a file, would you want the error messages in that file? Why or why not?",
  "activity": {
   "title": "Predict and patch the console tool",
   "materials": "Printed cards with short code snippets (printf calls, Scanner sequences, Console usage), a projector showing a 15-line buggy login program, student laptops with a browser-based Java playground if available, otherwise paper.",
   "steps": [
    "Pairs draw six snippet cards and write the exact output for each, or the exception it throws.",
    "Reveal answers on the projector; pairs score themselves and note which specifier or Scanner rule tripped them.",
    "Project the buggy login program, which calls System.console().readLine() without a null check, stores the password as a String and prints errors to System.out.",
    "Pairs list every problem they find and rewrite the program on paper or in the playground.",
    "Two pairs present their fixes and the class agrees on a final version."
   ]
  },
  "discussion": [
   "Wiping a char array helps, but what other places might a password still linger in a running program?",
   "Why might a tool behave differently when run from an IDE than from a terminal?",
   "When is Scanner a better choice than BufferedReader for reading input, and when is it worse?"
  ],
  "exit": [
   [
    "What does System.console() return when no console is available?",
    "null."
   ],
   [
    "Write a printf format that prints a price with two decimals followed by a platform line separator.",
    "\"%.2f%n\""
   ],
   [
    "Why should diagnostic messages go to System.err?",
    "So they stay separate from normal output and remain visible when stdout is redirected or piped."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each printf specifier with one example, and pair struggling students with a partner for the snippet predictions.",
   "Extend: Ask fast finishers to use System.setOut with a ByteArrayOutputStream to capture and test a method's printed output, and explain why tests do this."
  ]
 },
 {
  "t": "Serialization: Serializable, transient fields, serialVersionUID",
  "objectives": [
   "Students will be able to explain what Serializable, transient and serialVersionUID each control.",
   "Students will be able to predict field values of an object after a serialization round trip.",
   "Students will be able to identify the exception raised by a missing Serializable type or a version mismatch.",
   "Students will be able to recommend defensive practices for deserializing untrusted data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and collect ideas about what should and should not be saved."
   ],
   [
    13,
    "Teach",
    "Walk through writeObject and readObject, the transient and static rules, the constructor rule, and serialVersionUID with the User class on the projector."
   ],
   [
    15,
    "Activity",
    "Teams complete the round-trip prediction worksheet."
   ],
   [
    7,
    "Discuss",
    "Run the discussion questions, ending on the security risk of untrusted input."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you saved a video game's progress to a file, which pieces of the game state should be saved, and which should be rebuilt or left out when the game loads?",
  "activity": {
   "title": "Round-trip prediction",
   "materials": "A printed worksheet with four short class definitions (fields with static, transient, initializers, a non-serializable superclass, a record) and a values-before table, pencils, projector for answers.",
   "steps": [
    "In teams of three, students read each class and the values set before serialization.",
    "For every field, teams write the value after deserialization in a fresh JVM, or the exception thrown when writing.",
    "Each team marks which rule justified each answer: stream value, transient default, static not saved, initializer skipped, or constructor runs.",
    "The teacher reveals answers one class at a time; teams explain any disagreements aloud.",
    "Teams finish by adding a serialVersionUID line to one class and stating what change would require bumping it."
   ]
  },
  "discussion": [
   "Why might Java's designers have chosen not to run constructors during deserialization?",
   "What kinds of data in your own projects belong in transient fields?",
   "Why is deserializing untrusted bytes riskier than parsing JSON into known classes?"
  ],
  "exit": [
   [
    "What value does a transient int field have after deserialization?",
    "0, its default value."
   ],
   [
    "Which exception results from a serialVersionUID mismatch?",
    "InvalidClassException."
   ],
   [
    "Name one defense when native deserialization of outside data cannot be avoided.",
    "Use an ObjectInputFilter to allow only expected classes and limit size."
   ]
  ],
  "differentiation": [
   "Support: Give a flowchart card: static? then not saved; transient? then default value; otherwise value from the stream; initializers never run unless it is a record.",
   "Extend: Ask fast finishers to explain how a record's canonical constructor validation changes what happens when tampered serialized data is read."
  ]
 },
 {
  "t": "Closing resources and stream-returning Files methods",
  "objectives": [
   "Students will be able to trace the order of body, resource closing, catch and finally in try-with-resources.",
   "Students will be able to determine which exception propagates and which is suppressed when close() fails.",
   "Students will be able to classify Files methods as resource-returning or self-closing.",
   "Students will be able to fix a resource leak caused by an unclosed Files.list or Files.lines stream."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to limited operating system handles."
   ],
   [
    12,
    "Teach",
    "Explain AutoCloseable versus Closeable, show the Res example and the close order, then the suppressed-exception rule and the two groups of Files methods."
   ],
   [
    15,
    "Activity",
    "Run the human try-with-resources role-play, then sort Files method cards."
   ],
   [
    8,
    "Discuss",
    "Lead the discussion questions, revisiting the leaking monitoring service."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A library lends each patron at most five books at a time. What happens to a patron who reads books but never returns them, and how is that like a program that opens files?",
  "activity": {
   "title": "Act out try-with-resources",
   "materials": "Sticky notes labeled Body, Resource A, Resource B, Catch and Finally; printed cards naming Files methods (lines, list, walk, find, readAllLines, readString, writeString, newBufferedReader, newInputStream, copy, size); whiteboard.",
   "steps": [
    "Five volunteers each wear a sticky note role and stand in declaration order; the teacher reads a scenario, such as the body throwing and resource B's close throwing.",
    "Volunteers step forward in the order Java would execute them while the class calls out corrections.",
    "The class records on the board which exception propagates and which is suppressed for each scenario.",
    "Pairs then sort the Files method cards into two piles: you must close the result, or the method closes internally.",
    "Pairs justify one card from each pile aloud, naming the return type that drove their decision."
   ]
  },
  "discussion": [
   "Why might the Stream API designers have made BaseStream AutoCloseable even though most streams need no closing?",
   "What would be lost if close exceptions replaced body exceptions instead of being suppressed?",
   "When would you prefer Files.lines over Files.readAllLines, and what extra responsibility comes with it?"
  ],
  "exit": [
   [
    "try (var a = ...; var b = ...) {} finally {}: in what order do the closes and finally run?",
    "Close b, close a, then finally."
   ],
   [
    "The body throws X and close throws Y. Which propagates?",
    "X; Y is attached as a suppressed exception."
   ],
   [
    "Name two Files methods whose returned stream must be closed.",
    "Any two of Files.lines, Files.list, Files.walk, Files.find."
   ]
  ],
  "differentiation": [
   "Support: Give a timeline template (body, close last-declared, close first-declared, catch, finally) that students fill in for each scenario.",
   "Extend: Ask fast finishers to write a custom AutoCloseable whose close declares Exception and explain how that changes the required catch clauses."
  ]
 },
 {
  "t": "Locale objects: language, country, Locale.of and Locale.getDefault",
  "objectives": [
   "Students will be able to construct Locale objects with Locale.of, constants, forLanguageTag and Locale.Builder.",
   "Students will be able to predict the toString and language-tag forms of a locale.",
   "Students will be able to explain where the default locale comes from and the scope of Locale.setDefault.",
   "Students will be able to choose between an explicit fixed locale and a user's locale for a given output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write 1,234.5 on the board and ask students how it would be written in other countries they know."
   ],
   [
    12,
    "Teach",
    "Introduce Locale parts and codes, show the Locale.of code sample, then the default locale and its categories, and the bug of relying on the default."
   ],
   [
    15,
    "Activity",
    "Groups run the locale card match and the machine-versus-human output sort."
   ],
   [
    8,
    "Discuss",
    "Work through the discussion questions with examples students have seen in apps."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone shows dates as 03/04 for a meeting. Is the meeting in March or April? What would you need to know to be sure?",
  "activity": {
   "title": "Locale match and output sort",
   "materials": "Printed cards with Java expressions (Locale.of(\"EN\",\"us\"), Locale.CANADA_FRENCH, Locale.forLanguageTag(\"pt-BR\"), Locale.of(\"fr\")) and matching output cards (en_US, fr_CA, pt_BR, fr); a second set of scenario cards; whiteboard.",
   "steps": [
    "Groups match each expression card to the output its toString would print, then write the toLanguageTag form beside it.",
    "The teacher reveals answers and highlights case normalization and underscore versus hyphen.",
    "Groups receive scenario cards such as \"CSV export for accounting\" or \"price shown on a shopping page\" and sort them into fixed locale or user's locale.",
    "Each group writes the Java expression it would pass in one scenario from each pile on the board.",
    "The class reviews the board and corrects any reliance on the default locale."
   ]
  },
  "discussion": [
   "Why do you think Java changed from constructors to the Locale.of factory?",
   "What could go wrong if a web server called Locale.setDefault for each incoming request?",
   "Why might a user want separate display and format locales?"
  ],
  "exit": [
   [
    "What does Locale.of(\"es\", \"MX\") print?",
    "es_MX."
   ],
   [
    "Where does the JVM's default locale come from at startup?",
    "The operating system's settings."
   ],
   [
    "Which locale should a machine-readable export use?",
    "An explicit fixed locale such as Locale.ROOT or Locale.US, not the default."
   ]
  ],
  "differentiation": [
   "Support: Provide a template card showing language (lowercase) underscore COUNTRY (uppercase) with three filled examples to copy from.",
   "Extend: Ask fast finishers to explain the difference between Locale.getDefault(Locale.Category.DISPLAY) and Locale.getDefault(Locale.Category.FORMAT) with a concrete example of each."
  ]
 },
 {
  "t": "Resource bundles: properties files, naming and lookup/fallback order",
  "objectives": [
   "Students will be able to name properties files correctly for a base name and locale.",
   "Students will be able to list the candidate bundle names in lookup order for a requested and default locale.",
   "Students will be able to trace key fallback through the chosen bundle's parent chain.",
   "Students will be able to read and write valid properties file syntax."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and discuss how apps change language."
   ],
   [
    12,
    "Teach",
    "Show a bundle family, properties syntax and getBundle, then build the candidate list on the board for fr_CA with default en_US and trace a missing key."
   ],
   [
    16,
    "Activity",
    "Groups run the bundle hunt with folders of cards."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions to reinforce the difference between bundle selection and key fallback."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you switch your phone to another language, some apps change completely and others change only partly. Why might an app show a mix of two languages?",
  "activity": {
   "title": "Bundle hunt",
   "materials": "For each group, a set of index cards each representing a properties file (file name on the front, three or four key=value lines on the back); scenario slips giving a requested locale, a default locale and a key; whiteboard.",
   "steps": [
    "Each group lays out its file cards face up so only the names show.",
    "The teacher reads a scenario; groups write the full candidate list in order and circle the first file that exists in their set.",
    "Groups flip the chosen card to look for the key; if absent, they walk the parent chain card by card and record where it is found or announce MissingResourceException.",
    "After each of four scenarios, one group explains its path on the board and the class checks it.",
    "Finally, groups write one new properties file with at least one comment line and both separator styles."
   ]
  },
  "discussion": [
   "Why does Java consult the default locale before the base bundle when choosing a bundle?",
   "Why is it useful that key fallback ignores the default locale's bundles?",
   "What language should a base bundle be written in for your project, and why?"
  ],
  "exit": [
   [
    "Requested ja_JP, default fr_FR. List the candidate names for base name App.",
    "App_ja_JP, App_ja, App_fr_FR, App_fr, App."
   ],
   [
    "App_fr is chosen and lacks key exit. Where is it searched next?",
    "In the base App bundle."
   ],
   [
    "What does getString throw when a key is not found anywhere in the chain?",
    "MissingResourceException."
   ]
  ],
  "differentiation": [
   "Support: Give a five-slot template (requested L_C, requested L, default L_C, default L, base) that students fill in for each scenario.",
   "Extend: Ask fast finishers to predict the result when both a ListResourceBundle class and a properties file share the name Messages_fr, and justify it."
  ]
 },
 {
  "t": "Formatting numbers and currency with NumberFormat",
  "objectives": [
   "Students will be able to select the correct NumberFormat factory method for numbers, integers, currency and percentages.",
   "Students will be able to predict formatted output including default fraction digits and HALF_EVEN rounding.",
   "Students will be able to predict the result of parse, including locale effects and trailing text.",
   "Students will be able to read and write simple DecimalFormat patterns using 0 and #."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prices and ask which ones look wrong and to whom."
   ],
   [
    12,
    "Teach",
    "Present the factory methods, the code sample outputs, default fraction digits, HALF_EVEN with a number line on the board, then parse behavior and DecimalFormat patterns."
   ],
   [
    15,
    "Activity",
    "Pairs play the formatter relay with printed value cards."
   ],
   [
    8,
    "Discuss",
    "Work through the discussion questions, focusing on money and locale bugs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Write these on the board: 1,234.50 and 1.234,50 and 1 234,50. Are they the same amount? Which would confuse a US shopper, and which a German one?",
  "activity": {
   "title": "Formatter relay",
   "materials": "Printed value cards (2.5, 3.5, 0.256, 1234.5678, \"12abc\", \"1.234\"), formatter cards (getInstance US, getInstance GERMANY, getCurrencyInstance US, getPercentInstance US, getIntegerInstance US, DecimalFormat \"#,##0.00\", parse with US, parse with GERMANY), whiteboard divided into lanes.",
   "steps": [
    "Pairs draw one value card and one compatible formatter card, then write the exact output on a sticky note.",
    "They post the note in their lane on the whiteboard and draw the next pair of cards.",
    "After ten minutes the teacher reveals answers one formatter at a time; pairs score a point per correct note.",
    "For each wrong note the class names the rule involved: fraction digits, HALF_EVEN, percent times 100, locale separators, or lenient parse.",
    "Pairs finish by writing a DecimalFormat pattern that would print 0042.50 for 42.5."
   ]
  },
  "discussion": [
   "Why might banks and accountants prefer half-even rounding over always rounding halves up?",
   "What risks come from parsing user-entered numbers with the server's default locale?",
   "Why separate storing money as BigDecimal from displaying it with NumberFormat?"
  ],
  "exit": [
   [
    "Which factory method displays 0.75 as 75%?",
    "NumberFormat.getPercentInstance(locale)."
   ],
   [
    "What does getIntegerInstance(Locale.US).format(4.5) produce?",
    "4, because HALF_EVEN rounds the half to the even digit."
   ],
   [
    "What does NumberFormat.getInstance(Locale.GERMANY).parse(\"1.234\") return?",
    "1234, because the period is the German grouping separator."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference table listing each factory method, its default fraction digits and one sample output, and allow students to consult it during the relay.",
   "Extend: Ask fast finishers to show how setRoundingMode(RoundingMode.HALF_UP) and setMaximumFractionDigits change three outputs from the relay, and explain why."
  ]
 },
 {
  "t": "Compact number formatting (CompactNumberFormat)",
  "objectives": [
   "Students will be able to create compact formatters with getCompactNumberInstance for SHORT and LONG styles.",
   "Students will be able to predict compact output using magnitude, default zero fraction digits and HALF_EVEN rounding.",
   "Students will be able to adjust precision and rounding with setMaximumFractionDigits and setRoundingMode.",
   "Students will be able to explain why compact suffixes depend on the locale."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of short numbers students see in apps."
   ],
   [
    10,
    "Teach",
    "Show the code sample, explain SHORT versus LONG, then demonstrate the four-step prediction routine on the board, including 1,500 and 2,500."
   ],
   [
    17,
    "Activity",
    "Teams play the compact number bingo with prediction cards."
   ],
   [
    8,
    "Discuss",
    "Work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A post shows 2.3K likes. Roughly how many likes does it have, and what information is lost by showing it that way?",
  "activity": {
   "title": "Compact number bingo",
   "materials": "Printed bingo grids with outputs (999, 1K, 2K, 6M, 1.2M, 2 thousand, 1 million, -2K, 3B and others), a projector showing calls such as \"US SHORT, default, 2_500\", markers.",
   "steps": [
    "The teacher projects one call at a time, naming the style, any setMaximumFractionDigits or setRoundingMode change, and the value.",
    "Teams apply the four steps (magnitude, divide, fraction digits with rounding, suffix) on scrap paper and mark the matching square.",
    "After each call, one team explains its reasoning aloud before the answer is revealed.",
    "Include trap calls for values under 1,000, exact halves like 1,500 and 2,500, and a LONG style value.",
    "The first team to complete a line must justify every marked square to win."
   ]
  },
  "discussion": [
   "When is a compact number misleading, and where should an exact count be shown instead?",
   "Why is it safer to rely on locale data than to hard-code K, M and B?",
   "Would you choose HALF_EVEN or HALF_UP for a public view counter, and why?"
  ],
  "exit": [
   [
    "US SHORT, default settings: what is printed for 1_500?",
    "2K."
   ],
   [
    "US LONG, default settings: what is printed for 3_000_000_000?",
    "3 billion."
   ],
   [
    "Which method call turns 1M into 1.2M for 1,234,567?",
    "setMaximumFractionDigits(1)."
   ]
  ],
  "differentiation": [
   "Support: Give a step card listing the four prediction steps and a small table of magnitudes and suffixes for US English.",
   "Extend: Ask fast finishers to predict US SHORT output for 2,500 and 3,500 under HALF_EVEN and then under HALF_UP, and explain why only one of the two results changes."
  ]
 },
 {
  "t": "Formatting and parsing dates and times with DateTimeFormatter and locales",
  "objectives": [
   "Students will be able to obtain formatters from ISO constants, localized styles and custom patterns.",
   "Students will be able to interpret case-sensitive pattern letters and predict formatted output.",
   "Students will be able to explain how a Locale and withLocale affect names and layout.",
   "Students will be able to distinguish DateTimeParseException from UnsupportedTemporalTypeException."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect date formats students use."
   ],
   [
    12,
    "Teach",
    "Introduce the three formatter sources, build a pattern-letter table on the board with case pairs (M/m, H/h, y/Y), run through the code sample and the two exceptions."
   ],
   [
    15,
    "Activity",
    "Pairs complete the pattern decoder cards and the bug hunt."
   ],
   [
    8,
    "Discuss",
    "Lead the discussion questions, including the week-based year trap."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How many different ways can you write today's date? Which of them could be misread by someone from another country?",
  "activity": {
   "title": "Pattern decoder and bug hunt",
   "materials": "Printed cards each showing a date-time value and a pattern (for example LocalDate 2026-01-05 with MM/dd, LocalDateTime with EEEE d MMMM, LocalDate with HH:mm, a pattern using mm for month), a projector, whiteboard.",
   "steps": [
    "Pairs draw cards and write the exact output, or name the exception that would be thrown.",
    "The teacher projects answers; pairs mark which pattern-letter rule or exception rule decided each card.",
    "The teacher projects three buggy snippets: yyyy-mm-dd, YYYY near December 31, and ofPattern with an English-only formatter on a French page.",
    "Pairs rewrite each snippet correctly on the whiteboard and explain the fix in one sentence.",
    "The class compares fixes and agrees on the best version of each."
   ]
  },
  "discussion": [
   "Why do you think the java.time designers made DateTimeFormatter immutable when SimpleDateFormat was not?",
   "When should an application use a localized FormatStyle instead of a fixed pattern?",
   "Why might a YYYY bug survive testing for months before anyone notices?"
  ],
  "exit": [
   [
    "What does LocalDate.of(2026, 3, 7).format(ofPattern(\"dd MMM yyyy\", Locale.US)) print?",
    "07 Mar 2026."
   ],
   [
    "Which exception results from formatting a LocalDate with the pattern HH:mm?",
    "UnsupportedTemporalTypeException."
   ],
   [
    "How do you get a copy of a formatter that prints French month names?",
    "Call withLocale(Locale.FRANCE) on it."
   ]
  ],
  "differentiation": [
   "Support: Provide a laminated pattern-letter card listing y, M, d, E, H, h, a, m, s with one example each and the case pairs highlighted.",
   "Extend: Ask fast finishers to explain why ofLocalizedDateTime(FormatStyle.FULL) fails with a LocalDateTime but works with a ZonedDateTime."
  ]
 },
 {
  "t": "Message formatting with MessageFormat",
  "objectives": [
   "Students will be able to explain why MessageFormat placeholders support translation better than string concatenation.",
   "Students will be able to predict output for patterns with reordered, repeated or missing placeholders.",
   "Students will be able to apply format types including number, percent and choice.",
   "Students will be able to escape apostrophes and braces correctly in a pattern."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up translation puzzle and collect observations about word order."
   ],
   [
    12,
    "Teach",
    "Show concatenation versus a pattern, walk through the code sample, then format types, the choice type and the apostrophe rule."
   ],
   [
    15,
    "Activity",
    "Groups play translator and developer with bundle cards."
   ],
   [
    8,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Translate \"Ana has 3 new messages\" into any other language you know, or imagine one where the number must come first. What would break if the code always glued the name, then the number, then the words together?",
  "activity": {
   "title": "Translator and developer",
   "materials": "Printed cards each with an English message and its argument list, blank cards for patterns, a projector for revealing outputs, whiteboard.",
   "steps": [
    "In groups of three, one student acts as developer, one as translator and one as checker.",
    "The developer writes an English pattern with placeholders for a message card; the translator writes a second pattern that reorders or repeats placeholders, as another language might.",
    "The checker predicts the exact output of both patterns for the given arguments, including locale number grouping.",
    "The teacher adds trap cards: a contraction with one apostrophe, a missing argument and a plural requiring the choice type; groups fix each pattern.",
    "Groups share one fixed pattern on the board and the class verifies its output."
   ]
  },
  "discussion": [
   "Why is a silent failure, like a vanished apostrophe, more dangerous than an exception?",
   "What are the limits of the choice type for languages with more complex plural rules?",
   "Why should the pattern live in a resource bundle rather than in code?"
  ],
  "exit": [
   [
    "What does MessageFormat.format(\"{1} {0}\", \"world\", \"hello\") return?",
    "hello world."
   ],
   [
    "How do you write It's {0} so the apostrophe prints and the placeholder works?",
    "It''s {0}, with two single quotes."
   ],
   [
    "What does {0,number,percent} print for 0.5 in a US locale?",
    "50%."
   ]
  ],
  "differentiation": [
   "Support: Give a checklist card: count from zero, match each index to an argument, look for single apostrophes, apply locale grouping to numbers.",
   "Extend: Ask fast finishers to write a choice pattern for zero, one and many items and a version of the same message for another language they know."
  ]
 }
]);
