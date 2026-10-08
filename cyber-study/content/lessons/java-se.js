/* Lessons for Oracle Certified Professional: Java SE Developer (1Z0-831 (Java SE 25)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("java-se", [
 {
  "t": "Primitive types, literals (underscores, binary/hex/octal), default values",
  "hook": "You are reviewing a pull request at Tidewater Freight on a Friday afternoon. Jonah, a new developer, has added a constant for the maximum shipment weight in grams and a permissions mask written in binary. The build is red. The compiler says one number is \"too large\", even though the variable is declared as a `long`. A second line compiles but a test fails because a value that should be ten is coming out as eight. Jonah swears he typed exactly what he meant. Nothing in the code looks wrong at a glance, and the release is scheduled for Monday. What is the compiler seeing in those numbers that Jonah is not?",
  "simple": "A computer program needs to store simple values such as whole numbers, decimal numbers, single letters and yes-or-no answers. Java has eight built-in boxes for these, called primitive types. Each box has a fixed size, the way a small, medium or large jar holds a fixed amount. When you type a number straight into your code, that typed value is called a literal, and Java decides which box it belongs in from the way you write it. A plain number like 42 goes in the medium whole-number box, a number with a decimal point goes in the large decimal box, and special prefixes tell Java the number is written in binary, octal or hexadecimal. Finally, some boxes start out holding zero or nothing automatically, while others must be filled before you can look inside.",
  "body": [
   "Java has eight primitive types, and they hold raw values rather than references to objects. Four are whole-number types, all signed: `byte` (8 bits, -128 to 127), `short` (16 bits), `int` (32 bits) and `long` (64 bits). Two are floating-point types: `float` (32 bits) and `double` (64 bits). `char` is a 16-bit unsigned value that stores a UTF-16 (16-bit Unicode Transformation Format) code unit, which means it ranges from 0 to 65535 and can take part in arithmetic. Finally, `boolean` holds only `true` or `false`. Unlike C, a Java `boolean` is never a number, so `if (1)` does not compile and there is no cast between `boolean` and any numeric type.",
   "The type of a literal is decided by how you write it, not by the variable that receives it. A plain whole number such as `42` is an `int` literal, so a value too big for `int` needs the `L` suffix: `long big = 3_000_000_000L;` compiles, but the same number without `L` is a compile error with a message like \"integer number too large\", even though the target is a `long`. Use an uppercase `L`, because a lowercase `l` looks like the digit 1. A number with a decimal point or an exponent, such as `3.14` or `1e3`, is a `double` literal, so `float f = 3.14;` fails and you must write `3.14f` or cast it. A `d` or `D` suffix is allowed but optional. Character literals use single quotes, as in `'A'`, the escape `'\\n'` or the Unicode escape `'\\u0041'`, while text in double quotes is a `String`, not a `char`.",
   "Whole-number literals can be written in four bases, and the prefix tells you which one. Decimal is the default. A leading `0` means octal, base 8, so `017` is 15. A prefix of `0x` or `0X` means hexadecimal, base 16, so `0x1F` is 31 and the letters A to F may be upper or lower case. A prefix of `0b` or `0B` means binary, base 2, so `0b101` is 5. The octal rule is the classic trap: `010` is 8, not 10, and `09` does not compile because 9 is not an octal digit. Whenever you see a number that starts with zero and has more digits, stop and convert it before you do anything else.",
   "Underscores can separate digits for readability, as in `1_000_000` or `0b1010_0101`. They have no effect on the value. The single rule to remember is that an underscore must sit between two digits. So these are illegal: a leading or trailing underscore (`_100` is actually a variable name, and `100_` is an error), an underscore next to a decimal point (`1_.5`, `1._5`), one right before a suffix (`10_L`, `2.0_f`) and one straight after the `0x` or `0b` prefix (`0x_FF`). Several underscores in a row are fine (`1__000`), and so is one after the leading zero of an octal literal (`0_17`), because that zero counts as a digit.",
   "Default values apply only to fields, meaning instance and static variables, and to array elements. Numeric fields default to zero (`0`, `0L`, `0.0f`, `0.0`), `char` defaults to `'\\u0000'` (the null character), `boolean` to `false`, and every reference type, including `String` and wrapper types such as `Integer`, defaults to `null`. Arrays get these defaults the moment they are created with `new`, which is why `new int[3]` holds three zeros.",
   "Local variables never get a default. A variable declared inside a method, constructor or block must be definitely assigned before it is read, and the compiler checks this with flow analysis. If you declare `int total;` and then assign it only inside an `if` branch, reading it afterwards gives the error \"variable total might not have been initialized\". The exam likes to hide this inside a branch or a loop, so trace every path from the declaration to the first read. Declaring a local variable without ever reading it is fine.",
   "```java\nint[] nums = new int[3];          // {0, 0, 0}\nboolean[] flags = new boolean[2]; // {false, false}\nint x;\n// System.out.println(x);        // does not compile: x not initialized\nint hex = 0xFF, oct = 010, bin = 0b11;\nSystem.out.println(hex + oct + bin); // 255 + 8 + 3 = 266\nlong ok = 3_000_000_000L;\nfloat f = 2.5f;\nchar c = 'A' + 1;                 // 'B': constant expression fits in char\n```",
   "Putting it together, most exam questions on this topic are really compile-or-not questions. When you see a code block, scan every literal for a leading zero, a missing `L` or `f` suffix, and an underscore in an illegal spot, then check whether every local variable is assigned on every path before it is used. Only once the code is known to compile does it make sense to work out what it prints. This order of checks saves time and avoids picking an output answer for code that would never run."
  ],
  "analogy": "Primitive types are like a set of measuring cups in a kitchen: a quarter cup, a half cup, a cup and a large jug. A literal is an ingredient you pour, and Java decides which cup it goes in from the label on the package, not from the bowl you plan to pour it into. A plain whole number is labeled \"cup\" (int), so a huge amount spills even if you are holding the jug (long) until you relabel it with L. The analogy stops at defaults: real cups are always empty, but Java fields start with zero while local variables have no usable value at all.",
  "terms": [
   [
    "Primitive type",
    "One of the eight built-in value types (byte, short, int, long, float, double, char, boolean) that are not objects."
   ],
   [
    "Literal",
    "A fixed value written in source code, such as 42, 3.5f, 'x' or 0b1010."
   ],
   [
    "Octal literal",
    "A whole-number literal with a leading 0, read in base 8, so 010 equals 8."
   ],
   [
    "Hexadecimal literal",
    "A whole-number literal with a 0x or 0X prefix, read in base 16, so 0x1F equals 31."
   ],
   [
    "Default value",
    "The value a field or array element gets automatically: 0, false, '\\u0000' or null. Local variables have none."
   ],
   [
    "Definite assignment",
    "The compiler rule that a local variable must be assigned on every path before it is read."
   ]
  ],
  "example": "A payments service stores amounts in cents as a `long`. A developer writes `long limit = 5_000_000_000;` and the build fails, because the literal is still an `int` literal and is out of range. Adding `L` (`5_000_000_000L`) fixes it, and the underscores keep the number readable in code review.",
  "mistakes": [
   [
    "Thinking `long big = 3000000000;` compiles because the variable is a long.",
    "The literal is an int literal regardless of the target, and 3000000000 is outside the int range, so it fails. Add the L suffix."
   ],
   [
    "Reading `010` as ten.",
    "A leading zero makes the literal octal, so 010 is 8. And 08 or 09 do not compile at all."
   ],
   [
    "Assuming a local variable starts at 0 like a field does.",
    "Only fields and array elements get defaults. Reading an unassigned local variable is a compile error."
   ],
   [
    "Believing underscores are allowed anywhere inside a number.",
    "An underscore must be between two digits, so it cannot touch the start, the end, a decimal point, a suffix or the 0x or 0b prefix."
   ]
  ],
  "tryit": [
   [
    "A teammate stores a file-permissions value as `int mode = 0755;` and a counter as `int count;` inside a method, then prints `mode` and, inside an `if (debug)` block, assigns `count = 1;` before printing `count` after the block. The code is part of a quick utility that must compile today. What will the compiler and the program do?",
    "The compiler rejects the code, because count is assigned only inside the if branch and then read after it, so it might not have been initialized. Once count is given an initial value, mode prints 493, because 0755 is an octal literal (7 x 64 + 5 x 8 + 5)."
   ]
  ],
  "tip": "Scan every numeric literal for three things: a leading 0 (octal), a missing L or f suffix on a value that needs it, and an underscore touching a prefix, suffix or decimal point. Then check that each local variable is assigned on every path before it is read.",
  "check": [
   [
    "Does `float price = 9.99;` compile?",
    "No. 9.99 is a double literal, and assigning a double to a float is a narrowing conversion. Write 9.99f or cast with (float)."
   ],
   [
    "What does `System.out.println(012 + 0x10);` print?",
    "26. 012 is octal for 10 and 0x10 is hexadecimal for 16."
   ],
   [
    "Which of these is legal: `1_000`, `_1000`, `0x_10`, `1000_L`?",
    "Only 1_000. The others put an underscore at the start, right after the 0x prefix, or right before the L suffix."
   ],
   [
    "What is the value of a `boolean` instance field that is never assigned?",
    "false. Fields get default values, and the default for boolean is false."
   ]
  ]
 },
 {
  "t": "Wrapper classes, autoboxing/unboxing and Integer caching with ==",
  "hook": "It is 7:40 a.m. at Larkspur Ticketing and Dana from support has forwarded a strange bug report. The seat-matching code says two customers hold the same seat number when both have seat 42, but when both have seat 212, it says they do not match. Overnight, the nightly report job also crashed with a NullPointerException on a line that only reads a number out of a map. Nobody changed the code this week, the unit tests pass, and the two bugs seem unrelated. You open the class and see `Integer` everywhere instead of `int`. Why would the same comparison work for small seat numbers and fail for larger ones?",
  "simple": "Java keeps simple values like numbers in lightweight boxes called primitives. Some parts of Java, such as lists, can only hold full objects, so each primitive has a matching object version called a wrapper, for example `Integer` for `int`. Java moves values in and out of these wrappers automatically, which is called boxing and unboxing. The catch is that comparing two wrappers with `==` asks \"are these the very same box?\", not \"do they hold the same number?\". Java reuses the same box for small numbers, so the check often looks right for small values and fails for bigger ones. It is like two people holding identical receipts: they are equal in content but are still two separate pieces of paper. Use `equals` to compare what is inside.",
  "body": [
   "Each primitive type has a wrapper class in `java.lang`: `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character` and `Boolean`. Note the two names that are not simply capitalized: `Integer` for `int` and `Character` for `char`. Wrappers exist because collections and generics work only with objects, so you cannot write `List<int>` and must write `List<Integer>`. A wrapper object is immutable, meaning the value inside never changes, and a wrapper reference can be `null`, which a primitive never can.",
   "Autoboxing is the compiler automatically converting a primitive to its wrapper, and unboxing is the reverse. When you write `Integer n = 5;` the compiler quietly inserts `Integer.valueOf(5)`, and when you write `int m = n;` it inserts `n.intValue()`. Unboxing also happens when a wrapper is used with arithmetic or relational operators, so `n + 1` and `n > 0` unbox first. Because unboxing is really a method call, unboxing a `null` reference throws a `NullPointerException` (NPE) at runtime. The frequent exam scenario is `Map.get` returning `null` for a missing key and that `null` being assigned to an `int` variable. The code compiles cleanly and fails only when it runs.",
   "Know the difference between the two conversion families. `Integer.parseInt(\"42\")` returns a primitive `int`, while `Integer.valueOf(\"42\")` returns an `Integer` object; both throw `NumberFormatException` for text that is not a number. The wrapper constructors such as `new Integer(5)` are deprecated and marked for removal, so modern code and exam answers use `valueOf` or autoboxing. Boxing only goes to the matching wrapper: `Long x = 5;` does not compile, because `5` is an `int` and would box to an `Integer`, which is not a `Long`. Java will not widen and then box in one step, so write `5L`. Similarly `Double d = 1;` fails, while `double d = 1;` is fine because it is plain widening.",
   "The `==` operator on two wrapper references compares identity, that is, whether both references point to the same object, not whether the values are equal. `Integer.valueOf` keeps a cache of `Integer` objects for at least the range -128 to 127, and autoboxing uses `valueOf`, so two boxed values in that range point at the same cached object. Outside that range each boxing typically creates a new object. That is why `Integer a = 127, b = 127; a == b` is `true` but the same test with 128 is `false`. `Short` and `Long` cache the same range, `Byte` caches every possible value (which is that same range), `Character` caches 0 to 127, and `Boolean` has only the two shared objects `Boolean.TRUE` and `Boolean.FALSE`. `Float` and `Double` have no such cache. The fix is simple: compare wrapper values with `equals`.",
   "Mixing a wrapper and a primitive in `==` behaves differently. The wrapper is unboxed, so the comparison is numeric and the cache does not matter at all. Also watch `equals` across types. `Long.valueOf(1).equals(1)` is `false`, because the argument `1` is boxed to an `Integer`, and `Long.equals` returns `false` for anything that is not a `Long`. The same trap appears when a `Set<Long>` is asked whether it `contains(1)`: the answer is `false`.",
   "```java\nInteger a = 100, b = 100;\nInteger c = 1000, d = 1000;\nSystem.out.println(a == b);      // true  (cached)\nSystem.out.println(c == d);      // false (different objects)\nSystem.out.println(c.equals(d)); // true\nint e = 1000;\nSystem.out.println(c == e);      // true  (c is unboxed)\nLong big = 1L;\nSystem.out.println(big.equals(1)); // false (Integer argument)\n```",
   "Overload resolution also involves boxing, and the compiler works in three phases. First it looks for an exact match or a widening primitive conversion, without any boxing. Only if nothing fits does it try boxing and unboxing. Only if that also fails does it consider varargs. So given `m(long)` and `m(Integer)`, the call `m(5)` picks `m(long)`, because widening beats boxing. Given only `m(Object)`, the call `m(5)` still compiles: `5` is boxed to `Integer` and then widened as a reference to `Object`. What the compiler will never do is widen a primitive and then box it, which is why `m(Long)` cannot accept `m(5)`.",
   "In practice, the safe habits are short. Use primitives for local arithmetic and counters, use wrappers when a collection or a possibly missing value requires them, compare wrapper values with `equals` or by unboxing one side, and guard against `null` before unboxing, for example with `Map.getOrDefault` or an explicit null check."
  ],
  "analogy": "A wrapper is like a coat check ticket holder: the number is on a card inside a plastic sleeve. Asking `==` on two sleeves asks whether they are literally the same sleeve. The coat check pre-prints a stack of sleeves for numbers -128 to 127 and hands out the same one every time, so small numbers seem to match. Larger numbers get a freshly printed sleeve each time, so two sleeves showing 500 are still different sleeves. The analogy breaks for unboxing a null: that is like reaching into an empty hand for a card that does not exist, and Java throws an exception.",
  "terms": [
   [
    "Wrapper class",
    "An immutable class such as Integer or Double that holds one primitive value as an object."
   ],
   [
    "Autoboxing",
    "The automatic conversion of a primitive to its wrapper, done by the compiler through valueOf."
   ],
   [
    "Unboxing",
    "The automatic conversion of a wrapper to its primitive; throws NullPointerException if the reference is null."
   ],
   [
    "Integer cache",
    "A pool of Integer objects for at least -128 to 127 that Integer.valueOf reuses, which makes == appear to work for small values."
   ],
   [
    "parseInt vs valueOf",
    "parseInt returns a primitive int; valueOf returns an Integer object, possibly from the cache."
   ]
  ],
  "example": "A shop counts orders per customer in a `Map<String, Integer>`. The code `int count = counts.get(id);` works in testing, then crashes in production with a NullPointerException the first time a new customer appears, because `get` returns null and the unboxing fails. Using `getOrDefault(id, 0)` avoids it.",
  "mistakes": [
   [
    "Assuming `Integer x = 128, y = 128; x == y` is true because the values match.",
    "== on two wrapper references compares identity. 128 is outside the guaranteed cache, so the objects usually differ and the result is false. Use equals."
   ],
   [
    "Thinking `Long total = 10;` compiles because int widens to long.",
    "Java will not widen and then box. 10 boxes only to Integer, which is not a Long. Write 10L."
   ],
   [
    "Believing that unboxing a null gives 0.",
    "Unboxing calls a method such as intValue() on the reference, so a null reference throws NullPointerException."
   ],
   [
    "Picking `m(Integer)` for the call `m(5)` when `m(long)` also exists.",
    "The compiler prefers widening over boxing, so m(long) is chosen."
   ]
  ],
  "tryit": [
   [
    "Your team stores user IDs as `Set<Long> blocked`. A new check reads `if (blocked.contains(userId))` where `userId` is declared as `int`, and blocked users are getting through. The IDs are definitely in the set. What is wrong and how do you fix it?",
    "The int userId is autoboxed to an Integer, and Long.equals returns false for any object that is not a Long, so contains never finds a match. Convert to long first, for example by declaring userId as long or calling blocked.contains((long) userId), so it boxes to a Long."
   ],
   [
    "A method compares two `Integer` order totals with `if (oldTotal == newTotal)` to decide whether to send an update email. Customers with small totals never get duplicate emails, but customers with large totals get one every time. Explain the pattern.",
    "Small totals fall in the -128 to 127 cache, so both references point to the same object and == is true. Larger totals are separate objects, so == is false even when the values are equal. Replace == with equals, or unbox one side."
   ]
  ],
  "tip": "When you see == between two Integer variables, check whether both values fall in -128 to 127. If they do, expect true; if not, expect false. If one side is a primitive, it is a plain numeric comparison.",
  "check": [
   [
    "What does `Integer x = 128, y = 128; System.out.println(x == y);` print?",
    "Usually false. 128 is outside the guaranteed cache range, so each boxing creates a separate object and == compares identity."
   ],
   [
    "Does `Long total = 10;` compile?",
    "No. 10 is an int, and autoboxing only produces an Integer, which is not assignable to Long. Write 10L."
   ],
   [
    "What happens when `Integer n = null; int m = n;` runs?",
    "It compiles but throws a NullPointerException, because unboxing calls intValue() on null."
   ],
   [
    "What is the return type of `Integer.parseInt(\"7\")`?",
    "int, a primitive. Integer.valueOf(\"7\") would return an Integer object."
   ]
  ]
 },
 {
  "t": "Operator precedence, increment/decrement, compound assignment with implicit casts",
  "hook": "At Copperline Games the bug tracker has a ticket marked urgent: players at full health who drink a healing potion suddenly show negative health and die on the spot. Theo, the gameplay programmer, insists the healing line is a single, obviously correct statement, `health += 50;`, and it compiles without a warning. Two rows down in the same file, a loop counter written as `i = i++;` never seems to advance, and the build server has been hanging on a test for an hour. Both lines look harmless and both pass code review every time. What are these operators actually doing behind the scenes?",
  "simple": "When a line of code mixes several math symbols, Java needs rules for which one to do first, just as in school you multiply before you add. These rules are called operator precedence. Java also has shortcuts. `x++` means \"add one to x\", but it gives back the old value before adding, while `++x` adds first and gives back the new value. Another shortcut, `x += 5`, means \"add 5 to x and store it back in x\". That shortcut quietly squeezes the answer back into x's original size of box, even if it does not fit, a bit like stuffing a large sweater into a small drawer and finding it crumpled. Knowing these rules lets you predict exactly what a line will do.",
  "body": [
   "Operator precedence decides which operators bind first when an expression has no parentheses. From highest to lowest, the order you need is: postfix (`x++`, `x--`), then unary and prefix (`++x`, `--x`, unary `+` and `-`, `!`, `~` and casts), then multiplicative (`*`, `/`, `%`), additive (`+`, `-`), shifts (`<<`, `>>`, `>>>`), relational (`<`, `>`, `<=`, `>=`, `instanceof`), equality (`==`, `!=`), then the bitwise and logical `&`, `^` and `|` in that order, then the short-circuit `&&` and `||`, the ternary `?:`, and finally the assignment operators (`=`, `+=` and so on). Most binary operators are left-associative, so `10 - 4 - 3` is `(10 - 4) - 3`, while assignment and the ternary are right-associative.",
   "Precedence controls grouping, not the order in which operands are evaluated. Java always evaluates operands from left to right. In `a() + b() * c()`, the multiplication is grouped first, but `a()` is still called before `b()` and `c()`. This rule is what lets you solve increment puzzles reliably: walk across the expression from left to right, compute each operand's value at the moment you reach it, and apply the grouping afterwards.",
   "Increment and decrement have two forms. Prefix `++x` increments first and the expression's value is the new value. Postfix `x++` produces the old value and increments afterwards. In `int x = 3; int y = x++ * 2 + ++x;` the evaluation is left to right: `x++` gives 3 and x becomes 4, then `++x` makes x 5 and gives 5, so `y` is `3 * 2 + 5 = 11`. A famous trap is `x = x++;`, which leaves `x` unchanged: the old value is saved, `x` is incremented, and then the saved old value is assigned back over the increment. Increment and decrement also work on `char`, `byte`, `short`, `float` and `double` variables and include an implicit cast, so `char c = 'a'; c++;` compiles and gives `'b'`.",
   "The short-circuit operators `&&` and `||` skip the right side when the left side already decides the result, so side effects on the right may never happen. In `if (a > 0 || b++ > 0)`, `b` is not incremented when `a > 0` is true. In `if (obj != null && obj.isReady())`, the method call is skipped when `obj` is `null`, which is exactly why this pattern avoids a `NullPointerException`. The non-short-circuit `&` and `|` on booleans always evaluate both sides, so swapping `&&` for `&` in that null check would throw.",
   "Compound assignment operators (`+=`, `-=`, `*=`, `/=`, `%=` and the bitwise and shift ones) include an implicit cast back to the type of the left operand. Formally, `x += y` means `x = (T)(x + y)` where `T` is the type of `x`, and `x` is evaluated only once. That is why the long form fails where the short form compiles:",
   "```java\nshort s = 10;\ns += 5;        // OK: implicit cast back to short\n// s = s + 5;  // does not compile: s + 5 is an int\nbyte b = 127;\nb += 1;        // compiles; b overflows to -128\nint i = 7;\ni *= 2.5;      // compiles; (int)(7 * 2.5) = 17\nString msg = \"Total: \";\nmsg += 3 + 4;  // \"Total: 7\" (3 + 4 is evaluated first)\n```",
   "The implicit cast can silently lose data, as the `byte` overflow and the truncated `17` show, and the compiler gives no warning. The exam uses this to test whether you know that `s = s + 5` fails but `s += 5` works. Remember also that an assignment is itself an expression whose value is the assigned value, so `int a, b; a = b = 4;` sets both to 4 because assignment is right-associative, and `if (flag = true)` compiles for a `boolean` variable and is always true. With an `int`, `if (n = 5)` does not compile, because the condition would be an `int`.",
   "Division and remainder have their own rules. Integer division truncates toward zero, so `7 / 2` is 3 and `-7 / 2` is `-3`. The sign of `%` follows the left operand, so `-7 % 2` is `-1` and `7 % -2` is `1`. Integer division or remainder by zero throws `ArithmeticException` at runtime, while floating-point division by zero gives `Infinity`, `-Infinity` or `NaN` (Not a Number) with no exception. Watch the `+` operator with strings too: once either operand is a `String`, `+` means concatenation, and evaluation still goes left to right, so `1 + 2 + \"x\"` is `\"3x\"` but `\"x\" + 1 + 2` is `\"x12\"`.",
   "For exam questions, a short routine works well. Rewrite the expression with full parentheses according to precedence, then evaluate operands left to right on paper, writing each variable's value after every `++` or `--`. For any compound assignment, add the hidden cast to the left operand's type before computing the final value."
  ],
  "analogy": "A compound assignment is like a moving company that always repacks into your original box. If you ask them to add a second sofa to a box sized for one, they do not refuse and they do not bring a bigger box; they squeeze, and something gets crushed. The long form `s = s + 5` is like a careful mover who sees the result needs a bigger box and refuses to proceed until you sign off with a cast. The analogy stops at overflow: real crushed furniture is damaged, while Java keeps the low-order bits, so the value wraps around to a negative number.",
  "terms": [
   [
    "Operator precedence",
    "The rules that decide which operator in an unparenthesized expression is applied first."
   ],
   [
    "Postfix increment",
    "x++: the expression yields the old value, then x is increased by one."
   ],
   [
    "Prefix increment",
    "++x: x is increased by one first, and the expression yields the new value."
   ],
   [
    "Compound assignment",
    "An operator like += that combines an operation with assignment and casts the result back to the left operand's type."
   ],
   [
    "Short-circuit evaluation",
    "&& and || skip evaluating the right operand when the left operand already determines the result."
   ]
  ],
  "example": "A game loop stores a health value in a `byte` to save memory. Code that heals with `health += 50;` compiles cleanly, but a player at 100 health suddenly shows -106, because 150 does not fit in a byte and the compound assignment's hidden cast wrapped it around. Using `int` and clamping with Math.min fixes the bug.",
  "mistakes": [
   [
    "Thinking precedence also changes the order operands are evaluated.",
    "Precedence only groups operators. Operands are always evaluated left to right, which is what decides the result of increment puzzles."
   ],
   [
    "Expecting `x = x++;` to increase x by one.",
    "The old value is saved, x is incremented, then the old value is assigned back, so x ends up unchanged."
   ],
   [
    "Believing `short s = 1; s = s + 1;` compiles because s += 1 does.",
    "s + 1 is promoted to int, and assigning an int to a short needs a cast. Only the compound form includes the cast."
   ],
   [
    "Assuming the right side of && or || always runs.",
    "If the left side decides the result, the right side is skipped, along with any side effects such as an increment or a method call."
   ]
  ],
  "tryit": [
   [
    "A colleague writes a validation line: `if (count > 0 & total / count > 10)` and it throws ArithmeticException whenever `count` is zero, even though the first condition is false. They ask whether the JVM is broken. What do you tell them?",
    "The single & is the non-short-circuit operator, so both sides are always evaluated, and total / count divides by zero. Changing & to && makes Java skip the division when count > 0 is false."
   ]
  ],
  "tip": "Evaluate operands strictly left to right, tracking each variable's value on paper after every ++ or --. For compound assignment, remember the hidden cast: it compiles where the long form would not.",
  "check": [
   [
    "What is the value of x after `int x = 5; x = x++ + ++x;`?",
    "12. x++ yields 5 (x becomes 6), then ++x makes x 7 and yields 7, so 5 + 7 = 12 is assigned."
   ],
   [
    "Why does `short s = 1; s = s + 1;` fail but `s += 1;` compile?",
    "s + 1 is promoted to int and cannot be assigned to short without a cast, while += includes an implicit cast back to short."
   ],
   [
    "What is printed by `int a = 0; boolean r = (a > 1) && (a++ > 0); System.out.println(a);`?",
    "0. The left side is false, so && short-circuits and a++ never runs."
   ],
   [
    "What is `-7 % 3`?",
    "-1. The sign of the remainder follows the left operand."
   ]
  ]
 },
 {
  "t": "Widening and narrowing conversions, casting and numeric promotion rules",
  "hook": "The monthly uptime report at Bluestem Hosting has just landed in the operations channel, and it says a customer's server was online for a negative number of milliseconds in March. Priya, the analyst who owns the report, is getting questions from the account team. The code is a one-liner that multiplies days by hours, minutes, seconds and milliseconds and stores the answer in a `long`, a type big enough for any month. Nobody touched it in years, and it worked fine for short periods. Tonight it has to be fixed before the customer invoices go out. How can a calculation stored in a big enough variable still come out negative?",
  "simple": "Java's number types are boxes of different sizes. Moving a value from a small box into a bigger one is always safe, so Java does it for you automatically; this is called widening. Moving a value into a smaller box might not fit, so Java makes you say so out loud with a cast, a note in parentheses like `(int)`, which means \"I know this may lose something\". There is one more hidden rule: when Java does math on small whole numbers, it first moves them into at least the medium `int` box, and the answer stays that type. It is like a calculator that always shows results on a standard-width screen: if the true answer is too wide, the digits wrap around before you ever copy the number down.",
  "body": [
   "A widening primitive conversion moves a value into a type that can hold a larger range, and Java does it automatically in assignments, method calls and arithmetic. The widening chain is `byte` to `short` to `int` to `long` to `float` to `double`, with `char` also widening to `int` and everything after it. Widening from `int` or `long` to `float`, or from `long` to `double`, is allowed even though it can lose precision in the low digits, because the range still fits; `(float) 123_456_789` prints as `1.23456792E8`. Note that `byte` and `short` do not widen to `char`, and `char` does not widen to `short`, because `char` is unsigned and the ranges do not nest.",
   "A narrowing conversion goes the other way and needs an explicit cast, such as `int i = (int) 3.99;`, which truncates toward zero to 3 (and `(int) -3.99` gives -3). Casting a whole number to a smaller type keeps only the low-order bits, so `(byte) 200` is -56 and `(byte) 128` is -128. Casting a floating-point value to an integer type works differently: a very large `double` cast to `int` clamps to `Integer.MAX_VALUE`, and casting `NaN` (Not a Number) to `int` gives 0. In every case the compiler does not warn you; it trusts the cast and you own the result.",
   "There is one important exception to the cast requirement, and the exam tests it often. If the value is a compile-time constant expression of type `int`, `char`, `short` or `byte`, and its value fits in the target `byte`, `short` or `char`, the compiler narrows it for you in an assignment. So `byte b = 100;`, `char c = 65;` and `short s = 'a';` compile, but `byte b = 200;` does not. The same applies to `final` local variables initialized with constants: `final int k = 10; byte b = k;` compiles, but if `k` is not `final` the compiler cannot treat it as a constant and the line fails. This exception does not cover `long` constants (`int i = 5L;` fails) and does not apply to method arguments, so passing `10` to a method that takes a `byte` does not compile.",
   "Numeric promotion is what happens to the operands of arithmetic operators before the operation runs. The rules come in a fixed order. First, `byte`, `short` and `char` are always promoted to at least `int` in a binary operation, even when both operands have the same small type. Second, if either operand is `double` the other becomes `double`; otherwise, if either is `float` both become `float`; otherwise, if either is `long` both become `long`; otherwise both are `int`. The result has the promoted type. This is why adding two `byte` values produces an `int`, and why unary minus on a `byte` also produces an `int`:",
   "```java\nbyte a = 10, b = 20;\n// byte c = a + b;         // does not compile: int result\nbyte c = (byte) (a + b);   // OK\nchar ch = 'A';\nSystem.out.println(ch + 1);          // 66 (int)\nSystem.out.println((char) (ch + 1)); // B\nlong big = 1_000_000 * 1_000_000;    // int overflow before widening\nlong ok  = 1_000_000L * 1_000_000;   // 1000000000000\n```",
   "The last two lines show a subtle but essential point: promotion is decided by the operand types, not by the target variable. Both literals are `int`, so the multiplication is performed in 32-bit arithmetic, overflows silently, and only the wrong result is widened to `long`. Making one operand a `long`, ideally the first, fixes it because the whole chain is then computed as `long`. The same idea explains why `double avg = total / count;` with two `int` values loses the fraction: the division is integer division and only its truncated result becomes a `double`.",
   "Casting has high precedence, binding more tightly than any arithmetic operator. `(int) 2.5 * 2` is `(int) 2.5` times 2, which is 4, while `(int) (2.5 * 2)` is 5. When you see a cast in front of an expression, check whether parentheses extend it over the whole expression or only the first operand. Compound assignments and increments, as covered in the operators lesson, add their own implicit narrowing cast, which is why `b += 1` and `ch++` compile when `b = b + 1` and `ch = ch + 1` do not.",
   "Reference types have their own casting rules, covered with polymorphism later, but primitives and wrappers do not mix freely. You cannot cast a `String` to `int`; use `Integer.parseInt`. A cast such as `(Integer) 3L` does not compile, because a `long` can only box to a `Long`. To convert between wrapper types, call methods such as `longValue()` or `intValue()`, which every numeric wrapper inherits from `Number`."
  ],
  "analogy": "Think of widening and narrowing as pouring water between glasses of different sizes. Pouring from a small glass into a larger one never spills, so nobody asks permission. Pouring from a large glass into a small one might overflow, so Java makes you sign a waiver, the cast. Numeric promotion is the bartender who always mixes drinks in a standard pint glass first, then pours into your cup: if the mix overflows the pint before it ever reaches your big jug, what you get is already wrong. The analogy breaks on what spills: Java does not lose the top of the water; it keeps the low-order bits, so an overflow wraps around.",
  "mnemonic": "Widening order: \"Be Smart, I Like Fast Dogs\" = byte, short, int, long, float, double. Remember that char joins the chain at int, not at short.",
  "terms": [
   [
    "Widening conversion",
    "An automatic conversion to a type with a larger range, such as int to long or float to double."
   ],
   [
    "Narrowing conversion",
    "A conversion to a type with a smaller range, which needs an explicit cast unless it is a fitting compile-time constant."
   ],
   [
    "Numeric promotion",
    "The rule that operands of arithmetic operators are converted to a common type of at least int before the operation."
   ],
   [
    "Compile-time constant",
    "An expression whose value the compiler knows, such as a literal or a final variable initialized with a literal."
   ],
   [
    "Truncation",
    "Dropping the fractional part when a floating-point value is cast to an integer type, always toward zero."
   ]
  ],
  "example": "A reporting job computes total milliseconds with `long ms = days * 24 * 60 * 60 * 1000;` where `days` is an int. For 30 days it prints a negative number, because the whole product is computed as an int and overflows before the widening to long. Writing `days * 24L * 60 * 60 * 1000` keeps the arithmetic in long.",
  "mistakes": [
   [
    "Thinking the target type decides how arithmetic is computed, so `long x = a * b;` cannot overflow.",
    "Promotion uses the operand types. If a and b are int, the multiply overflows as int and only then widens to long."
   ],
   [
    "Believing `byte b = 5; b = b + 1;` compiles because 6 fits in a byte.",
    "b + 1 is a non-constant int expression, so assignment back to byte needs a cast. Only constant expressions get automatic narrowing."
   ],
   [
    "Expecting `(int) 3.7` to round to 4.",
    "Casting truncates toward zero, giving 3. Use Math.round for rounding."
   ],
   [
    "Assuming `char` widens to `short` because both are 16 bits.",
    "char is unsigned and short is signed, so neither widens to the other automatically. Both widen to int."
   ]
  ],
  "tryit": [
   [
    "A grading app computes `double average = sum / count;` with `int sum = 17` and `int count = 4`, and teachers complain that every average ends in .0. The developer says the variable is a double, so decimals should work. What is happening, and what one-character-level change would fix it?",
    "Both operands are int, so integer division gives 4 before the result is widened to 4.0. Making one operand floating-point, for example `sum / (double) count` or `sum * 1.0 / count`, promotes the division to double and gives 4.25."
   ]
  ],
  "tip": "When a question assigns an arithmetic result to byte, short or char, look for promotion to int. It only compiles with a cast, a compound assignment, or when the whole expression is a constant that fits.",
  "check": [
   [
    "Does `char c = 'a'; c = c + 1;` compile?",
    "No. c + 1 is promoted to int, and assigning an int variable expression to char needs a cast. c++ or c += 1 would compile."
   ],
   [
    "What is `(byte) 130`?",
    "-126. Only the low 8 bits are kept, and 130 in 8-bit two's complement is -126."
   ],
   [
    "What is the type of `5L * 2.0f`?",
    "float. When either operand is float (and neither is double), both are promoted to float."
   ],
   [
    "Does `final int k = 50; byte b = k;` compile? What if k is not final?",
    "With final it compiles, because k is a constant that fits in a byte. Without final, k is not a constant and the assignment needs a cast."
   ]
  ]
 },
 {
  "t": "Math API: round, floor, ceil, abs, max/min, pow",
  "hook": "Rosa runs the print shop at Northgate Library, and the new self-service kiosk keeps charging patrons for one page fewer than they print. A patron printing 41 pages at 20 pages per sheet bundle is billed for two bundles instead of three. Meanwhile the refund screen rounds a credit of minus 2.50 dollars to minus 2, not minus 3, and a patron is asking why. The developer who wrote the kiosk has left, and the code is full of `Math` calls that look perfectly reasonable. You have the source open and a line of patrons at the desk. Which `Math` method is doing what you assume, and which is not?",
  "simple": "Java has a built-in toolbox called `Math` for common number jobs, so you do not have to write them yourself. `round` rounds to the nearest whole number. `floor` always goes down and `ceil`, short for ceiling, always goes up, like choosing the floor or the ceiling of a room. `abs` drops a minus sign, `max` and `min` pick the larger or smaller of two numbers, and `pow` raises a number to a power, such as 2 to the 3rd power being 8. The tricky part is that each tool hands back a specific kind of number. Some return a whole number and some return a decimal, even when the answer looks whole, like a scale that always shows 8.0 instead of 8.",
  "body": [
   "`java.lang.Math` is a utility class of static methods, so you call them as `Math.round(x)` without creating an object, and there is no need to import it because everything in `java.lang` is imported automatically. You cannot instantiate it either, since its constructor is private. The exam focuses less on what each method does, which is intuitive, than on what type each method returns and how it treats negative numbers and edge cases. Most questions are really compile-error questions in disguise.",
   "`Math.round` rounds to the nearest whole number, with halves rounded up toward positive infinity. It is overloaded: `round(double)` returns a `long` and `round(float)` returns an `int`. So `int r = Math.round(2.5);` does not compile, because the argument is a `double` literal and the result is `long`; `Math.round(2.5f)` returns the `int` 3. The half-up rule surprises people with negatives: `Math.round(-2.5)` is -2, while `Math.round(-2.6)` is -3, because -2.5 is exactly halfway and halves go toward positive infinity. Passing an `int` to `round` compiles too, because the `int` widens to `float` and the result is an `int`.",
   "`Math.floor` and `Math.ceil` both take a `double` and return a `double`. `floor` goes down to the next whole number toward negative infinity, and `ceil` goes up toward positive infinity. For positive numbers that matches intuition, and for negative numbers it is where people slip: `Math.floor(-1.5)` is -2.0 and `Math.ceil(-1.5)` is -1.0. A negative value between -1 and 0 passed to `ceil` gives negative zero, which prints as `-0.0`. Because these methods return `double`, printing them shows a `.0`, and assigning them to an `int` needs a cast. Casting with `(int)` is a different operation again: it truncates toward zero, so `(int) -1.5` is -1, which matches `ceil` for negatives and `floor` for positives.",
   "`Math.abs`, `Math.max` and `Math.min` are overloaded for `int`, `long`, `float` and `double`, and the version chosen follows the argument types after normal numeric promotion, so the return type does too. `Math.max(3, 7L)` returns a `long`, and `Math.min(2, 1.5)` returns the `double` 1.5. Passing two `byte` or `short` values selects the `int` version. One edge case appears on tests: `Math.abs(Integer.MIN_VALUE)` returns `Integer.MIN_VALUE` itself, still negative, because the positive value 2147483648 does not fit in an `int`. If you need that case detected, `Math.absExact` throws an `ArithmeticException` instead.",
   "`Math.pow(base, exponent)` takes two `double` values and always returns a `double`, even for whole numbers: `Math.pow(2, 3)` is 8.0. Assigning it to an `int` requires a cast, as in `int p = (int) Math.pow(2, 10);`. Related methods you may see include `Math.sqrt`, which returns a `double` and gives `NaN` (Not a Number) for a negative argument, and `Math.random()`, which returns a `double` from 0.0 inclusive to 1.0 exclusive, so `(int) (Math.random() * 6) + 1` simulates a die roll. `Math.floorDiv` and `Math.floorMod` round toward negative infinity unlike `/` and `%`, so `Math.floorDiv(-7, 2)` is -4 and `Math.floorMod(-7, 2)` is 1.",
   "```java\nSystem.out.println(Math.round(3.49));   // 3   (long)\nSystem.out.println(Math.round(-3.5));   // -3\nSystem.out.println(Math.round(2.5f));   // 3   (int)\nSystem.out.println(Math.floor(3.9));    // 3.0\nSystem.out.println(Math.ceil(3.1));     // 4.0\nSystem.out.println(Math.abs(-7));       // 7\nSystem.out.println(Math.max(4, 4.0f));  // 4.0 (float)\nSystem.out.println(Math.pow(3, 2));     // 9.0\n```",
   "A common real-world pattern combines these methods with careful arithmetic. To compute how many groups of 20 you need for `n` items, you might write `Math.ceil(n / 20)`, but if `n` is an `int` the division truncates first and `ceil` receives a whole number, so the result is wrong for partial groups. Writing `Math.ceil(n / 20.0)` forces floating-point division so `ceil` sees the fraction. The same care applies to averages and percentages: decide where the conversion to floating point happens before any `Math` method runs.",
   "Edge values are worth one more look, because they produce answers that seem impossible. `Math.round` of `NaN` returns 0, and a `double` too large for a `long` rounds to `Long.MAX_VALUE`. `Math.max` and `Math.min` return `NaN` if either argument is `NaN`. `Math.floor` and `Math.ceil` return an argument that is already a whole number unchanged, so `Math.floor(5.0)` is simply 5.0. None of these methods throws an exception for unusual floating-point input; they quietly return a special value, which is why reading the expected output carefully matters more than memorizing every corner. In a lab, try these in `jshell`, the interactive Java shell included with the Java Development Kit (JDK). It prints each result along with its type, for example `$1 ==> 3` for an `int` or `$2 ==> 3.0` for a `double`, which makes the return-type rules stick far better than memorizing a table. Try negative halves with `round`, negative fractions with `floor` and `ceil`, and mixed argument types with `max`."
  ],
  "analogy": "Picture standing on a staircase between two steps. `floor` always steps down and `ceil` always steps up, no matter which way you are facing, which is why on the negative side of zero `floor` takes you further from zero. Casting with `(int)` is different: it always steps toward the landing at zero. `round` steps to whichever step is closer, and when you are exactly halfway it always steps up toward positive infinity. The analogy stops at return types: the staircase does not tell you that floor and ceil report their answer as a double, which is what most exam questions really test.",
  "terms": [
   [
    "Math.round",
    "Rounds to the nearest whole number with halves toward positive infinity; returns long for a double argument and int for a float."
   ],
   [
    "Math.floor / Math.ceil",
    "Return the double just at or below (floor) or at or above (ceil) the argument, moving toward negative or positive infinity."
   ],
   [
    "Math.pow",
    "Raises a double base to a double exponent and always returns a double."
   ],
   [
    "Overloading by type",
    "abs, max and min have int, long, float and double versions, so the result type follows the promoted argument types."
   ],
   [
    "Truncation",
    "What an (int) cast does to a fraction: it drops the decimal part, moving toward zero."
   ]
  ],
  "example": "A billing script computes the number of pages to print with `int pages = items / 20;` and misses the last partial page. The fix is `int pages = (int) Math.ceil(items / 20.0);`. Note the 20.0: with plain 20 the integer division would truncate before ceil ever sees a fraction.",
  "mistakes": [
   [
    "Assuming `Math.round(7.5)` can be assigned to an int.",
    "round(double) returns a long, so the assignment needs a cast. Only round(float) returns int."
   ],
   [
    "Thinking `Math.round(-2.5)` is -3 because you round the magnitude.",
    "Halves always round toward positive infinity, so -2.5 becomes -2."
   ],
   [
    "Treating `Math.floor` and an `(int)` cast as the same thing.",
    "floor moves toward negative infinity and returns a double; the cast moves toward zero and gives an int. They differ for negative numbers."
   ],
   [
    "Expecting `Math.pow(2, 3)` to print 8.",
    "pow always returns a double, so it prints 8.0, and assigning it to an int requires a cast."
   ]
  ],
  "tryit": [
   [
    "A fitness app awards one badge per full 5 kilometers run. The developer writes `int badges = (int) Math.round(distanceKm / 5);` where `distanceKm` is a double. A user who ran 12.6 km gets 3 badges instead of 2 and the product owner is unhappy. Which `Math` method should replace `round`, and why?",
    "Math.floor. 12.6 / 5 is 2.52, which round turns into 3, but a badge needs a full 5 km, so you must always round down. (int) Math.floor(distanceKm / 5) gives 2. For non-negative values a plain (int) cast would also work, since truncation toward zero matches floor there."
   ]
  ],
  "tip": "Before choosing an answer, write down the return type of each Math call. Most Math questions are really compile-error questions about round returning long or pow returning double.",
  "check": [
   [
    "Does `int n = Math.round(7.5);` compile?",
    "No. 7.5 is a double, so round returns a long, which cannot be assigned to int without a cast."
   ],
   [
    "What does `Math.round(-4.5)` return?",
    "-4. Halves round toward positive infinity."
   ],
   [
    "What is printed by `System.out.println(Math.ceil(-0.5));`?",
    "-0.0. ceil moves toward positive infinity, and the result for this negative fraction is negative zero, printed as -0.0."
   ],
   [
    "What is the type of `Math.max(10, 2.5f)`?",
    "float. The int is promoted to float, so the float version of max is chosen and it returns 10.0."
   ]
  ]
 },
 {
  "t": "String immutability and key methods: substring, indexOf, charAt, strip, repeat, isBlank",
  "hook": "At Maplewood Clinic the patient portal's sign-up page has started producing accounts with no visible name. Kenji from the help desk has three tickets open from front-desk staff who cannot find these patients in search. The validation code clearly calls `name.strip()` and checks `name.isEmpty()` before saving, and the developer insists both lines are there and run every time. You add a log line and the saved names are still full of leading spaces, and some are nothing but spaces. The methods are being called. So why is the data coming out exactly as the user typed it?",
  "simple": "In Java, a piece of text is a `String`, and once a String is made it can never be changed. Methods that seem to change text, such as making it uppercase or trimming spaces, actually create a brand-new String and hand it back to you. If you do not catch that new String in a variable, it is lost and the original stays the same, like photocopying a page, writing on the copy, then throwing the copy away. Positions in a String are counted from 0, not 1. Java gives you tools to grab a piece of text (`substring`), find where something is (`indexOf`), read one letter (`charAt`), remove outer spaces (`strip`), repeat text (`repeat`), and check whether text is empty or only spaces (`isBlank`).",
  "body": [
   "A `String` in Java is immutable: once created, its characters never change. Every method that seems to modify a string, such as `toUpperCase`, `replace`, `strip` or `concat`, actually returns a new `String` and leaves the original alone. The most common exam trap is a line like `s.toUpperCase();` whose result is thrown away, so `s` is unchanged when it is printed on the next line. Immutability is a deliberate design choice: it lets strings be shared safely between threads, cached in the string pool, and used as reliable `HashMap` keys whose hash code never changes after insertion. The class is also `final`, so no subclass can add mutable behavior.",
   "String literals are placed in the string pool, an area the Java Virtual Machine (JVM) uses to keep one shared copy of each literal. Two identical literals therefore refer to the same object and `==` is `true`. A string built at runtime, for example with `new String(\"hi\")` or by concatenating a non-constant variable, is a different object, so `==` is `false` even when the text matches. Always compare text with `equals`, or `equalsIgnoreCase` when case should not matter. Concatenation of compile-time constants, like `\"a\" + \"b\"` or a `final` variable holding a literal plus another literal, is done by the compiler and does land in the pool. Calling `intern()` returns the pooled copy of any string.",
   "Indexes are zero-based, so the first character is at index 0 and the last is at `length() - 1`. `charAt(i)` returns the `char` at position `i` and throws `StringIndexOutOfBoundsException` if `i` is negative or not less than `length()`. `substring(begin)` runs to the end, and `substring(begin, end)` includes `begin` but excludes `end`, so its length is always `end - begin`. That rule explains the edge cases: `substring(3, 3)` is an empty string, and `substring(length())` is also empty, but an `end` greater than `length()` or a `begin` greater than `end` throws an exception. Note the method name is all lowercase: `subString` does not exist.",
   "`indexOf` returns the index of the first match of a `char` or `String`, or -1 if there is none, and an overload takes a starting index: `\"banana\".indexOf('a', 2)` is 3. `lastIndexOf` searches from the end, so `\"banana\".lastIndexOf('a')` is 5. These methods never throw for a missing value, and even a starting index past the end simply returns -1, which makes them useful as a guard before a `substring` call. Related tests include `contains`, `startsWith` and `endsWith`, all of which return a `boolean`.",
   "`strip()` removes leading and trailing whitespace using Unicode's definition of whitespace, while the older `trim()` removes only characters with code points up to U+0020, the ordinary space. That means `trim()` leaves some Unicode spaces in place that `strip()` removes. `stripLeading()` and `stripTrailing()` do one side only. Neither touches whitespace in the middle of the text, so `\" a b \".strip()` is `\"a b\"`.",
   "Two checks look similar but differ. `isEmpty()` is true only when the length is 0, while `isBlank()` is true when the string is empty or contains only whitespace, so `\"  \".isEmpty()` is false but `\"  \".isBlank()` is true. `repeat(n)` returns the string repeated n times: `repeat(0)` gives an empty string, `repeat(1)` returns the same text, and a negative count throws `IllegalArgumentException`. Calling any of these on a `null` reference throws a `NullPointerException`, so a null check still comes first.",
   "```java\nString s = \"  Java  \";\ns.strip();                             // result discarded\nSystem.out.println(\"[\" + s + \"]\");     // [  Java  ]\nString t = s.strip();\nSystem.out.println(t.charAt(0));       // J\nSystem.out.println(t.substring(1, 3)); // av\nSystem.out.println(t.indexOf(\"va\"));   // 2\nSystem.out.println(\"ab\".repeat(3));    // ababab\nSystem.out.println(\" \\t\".isBlank());   // true\n```",
   "Method chaining works because each call returns a new string: `\" hi \".strip().toUpperCase().repeat(2)` gives `HIHI`. Read chains left to right and keep track of the intermediate value at each step, writing it down if the chain is long. When a question mixes a chain with an unassigned call, remember that only results that are assigned or used carry forward; the variable itself only changes when it appears on the left of an `=`.",
   "For the exam, the reliable method is to ask three questions of every string snippet. Is each result assigned, or is it discarded? Are the index arguments within range, remembering that the end index is exclusive? And is the comparison using `==`, which tests identity, or `equals`, which tests content? Answering those in order catches nearly every trap this topic sets."
  ],
  "analogy": "A String is like a printed page in a library's reference book that you may not write in. When you ask for an uppercase version, the librarian photocopies the page, edits the copy and hands it to you. If you walk away without taking the copy, nothing has changed, and the original page is exactly as it was. The page numbers start at 0, and when you ask for pages 2 to 5 you get 2, 3 and 4, never 5. The analogy stops at the pool: a library would not hand two readers the very same physical page, but Java does share one copy of each identical literal.",
  "terms": [
   [
    "Immutability",
    "The property that an object's state cannot change after creation; String methods return new strings instead."
   ],
   [
    "String pool",
    "A JVM area that stores one shared copy of each string literal and compile-time constant string."
   ],
   [
    "substring(begin, end)",
    "Returns the characters from begin up to but not including end."
   ],
   [
    "strip vs trim",
    "strip removes leading and trailing Unicode whitespace; trim removes only characters up to U+0020."
   ],
   [
    "isBlank",
    "Returns true if a string is empty or contains only whitespace characters."
   ]
  ],
  "example": "A sign-up form checks `if (name.isEmpty())` to reject empty names, but users typing only spaces slip through and end up with blank display names. Switching to `name.isBlank()`, and storing `name.strip()`, closes the gap.",
  "mistakes": [
   [
    "Believing `s.toUpperCase();` changes s.",
    "Strings are immutable. The method returns a new string, and if it is not assigned, s is unchanged."
   ],
   [
    "Thinking `substring(2, 5)` returns characters at indexes 2 through 5.",
    "The end index is exclusive, so it returns indexes 2, 3 and 4: three characters."
   ],
   [
    "Using `==` to compare text read from input with a literal.",
    "== compares identity, and runtime strings are separate objects. Use equals to compare content."
   ],
   [
    "Assuming `isEmpty()` rejects strings of only spaces.",
    "isEmpty checks only for length 0. Use isBlank to treat whitespace-only strings as empty."
   ]
  ],
  "tryit": [
   [
    "A log parser receives lines such as `\"ERROR: disk full\"` and needs the text after the colon and space. A developer writes `String msg = line.substring(line.indexOf(':'));` and finds every message starts with a colon. Some lines have no colon at all, and those crash the job. What should the code do instead?",
    "indexOf returns the colon's index, and substring includes its begin index, so the colon is kept. Use line.substring(i + 2) or substring(i + 1).strip(), where i = line.indexOf(':'). For lines without a colon, i is -1, and substring(-1) throws StringIndexOutOfBoundsException, so check i >= 0 first."
   ]
  ],
  "tip": "Look for string method calls whose return value is not assigned. Because String is immutable, the original variable is unchanged, and that is usually the whole point of the question.",
  "check": [
   [
    "What does `\"develop\".substring(2, 5)` return?",
    "\"vel\". It includes index 2 and excludes index 5, giving three characters."
   ],
   [
    "What is the difference between `isEmpty()` and `isBlank()`?",
    "isEmpty is true only for length 0; isBlank is also true for strings that contain only whitespace."
   ],
   [
    "What is printed by `String s = \"abc\"; s.concat(\"d\"); System.out.println(s);`?",
    "abc. concat returns a new string, which is discarded."
   ],
   [
    "What does `\"hello\".charAt(5)` do?",
    "It throws StringIndexOutOfBoundsException, because valid indexes are 0 to 4."
   ]
  ]
 },
 {
  "t": "StringBuilder methods: append, insert, reverse, delete, replace",
  "hook": "The nightly export at Ashford Logistics builds a CSV file of 400,000 shipments, and it has started taking so long that the warehouse team arrives before it finishes. Lena, the developer on call, finds the culprit: a loop that adds each field with `line = line + field + \",\";`. Her fix uses a `StringBuilder`, and the export now runs in seconds. But a reviewer flags a new problem: a helper that receives the builder and calls `reverse()` on it to check something, without assigning the result, and suddenly every line in the file is backwards. With strings, an unassigned call never changed anything. Why does it here?",
  "simple": "A `String` in Java can never change, so every edit makes a new copy. When you build up text piece by piece, all those copies waste time and memory. A `StringBuilder` is a different tool: it is a piece of text you are allowed to change in place, like writing on a whiteboard instead of printing a fresh page for every edit. You can add text to the end (`append`), slip text into the middle (`insert`), flip it backwards (`reverse`), erase a section (`delete`) or swap a section for something else (`replace`). Because you are editing the same whiteboard every time, a change happens even if you do not store the result anywhere.",
  "body": [
   "`StringBuilder` is the mutable counterpart to `String`. It holds a resizable sequence of characters, and its methods change that sequence in place instead of creating new objects. Use it when you build text in a loop, because repeated `String` concatenation creates a new object on every step, and for large loops that copying dominates the running time. `StringBuffer` has the same methods but is synchronized, meaning its methods are safe for several threads to call at once at some performance cost; `StringBuilder` is the usual choice when only one thread uses the object.",
   "Most `StringBuilder` methods modify the object and also return a reference to the same object, which is why calls can be chained: `sb.append(\"a\").append(1).reverse()`. This is the opposite of the `String` trap. With a `StringBuilder`, a call whose result is ignored still changes the object, so a bare `sb.reverse();` on its own line really does reverse the content. And because the returned reference is the same object, `StringBuilder b2 = sb.append(\"x\");` makes `b2` and `sb` point to one builder, so a later `b2.append(\"y\")` is visible through `sb` as well.",
   "`append(x)` adds the text form of almost any type to the end: `String`, `char`, `int`, `boolean`, `double`, objects through their `toString`, and even another `StringBuilder`. `insert(offset, x)` puts text before the given index, and the offset may equal `length()` to insert at the end; an offset past the length throws `StringIndexOutOfBoundsException`. `reverse()` reverses the characters. Watch `append` with a `char` versus an `int`: `sb.append('A' + 1)` appends `66`, because `'A' + 1` is an `int` expression, while `sb.append((char) ('A' + 1))` appends `B`.",
   "The range methods all use an exclusive end, just like `substring`. `delete(start, end)` removes characters from `start` up to but not including `end`; unlike `substring`, an `end` past the length is allowed and simply treated as the length, which is why `delete(4, 99)` is legal on a short builder. `deleteCharAt(i)` removes a single character and requires a valid index. `replace(start, end, str)` removes the range `start` to `end` and inserts `str` in its place, and the replacement can be longer or shorter than what it replaces, so the builder's length can change. `replace` also tolerates an `end` past the length. Note that `StringBuilder.replace` takes indexes, unlike `String.replace`, which takes the old and new text.",
   "Some methods do not change the builder. `substring`, `charAt`, `indexOf` and `length()` only read from it, and `substring` returns a new `String`, not a builder, so `sb.substring(1)` on its own line has no effect. `toString()` makes a `String` copy of the current content, which is what you usually pass on to the rest of the program. A few other methods do mutate: `setLength(n)` truncates the content or pads it with null characters, and `setCharAt(i, c)` replaces one character at a valid index.",
   "```java\nStringBuilder sb = new StringBuilder(\"java\");\nsb.append(\"25\");          // java25\nsb.insert(0, \"[\");        // [java25\nsb.append(']');           // [java25]\nsb.replace(1, 5, \"JDK\");  // [JDK25]\nsb.delete(4, 99);         // [JDK\nsb.reverse();             // KDJ[\nSystem.out.println(sb);   // KDJ[\n```",
   "Two comparison traps come up often. First, `StringBuilder` does not override `equals`, so it inherits identity comparison from `Object`, and `new StringBuilder(\"a\").equals(new StringBuilder(\"a\"))` is `false`. Compare content with `sb1.compareTo(sb2) == 0`, available on `StringBuilder`, or with `sb1.toString().equals(sb2.toString())`. Another option is `sb1.toString().contentEquals(sb2)`. Second, `sb.equals(\"a\")` is also `false`, because a `StringBuilder` is never equal to a `String`, and `sb == \"a\"` does not even compile because the types are unrelated and the compiler knows they can never refer to the same object.",
   "Also know the constructors. `new StringBuilder()` starts empty, `new StringBuilder(\"text\")` starts with that content, and `new StringBuilder(20)` starts empty with an initial capacity of 20. Capacity is storage space reserved in advance, not length, so `length()` is still 0 for that last builder. The builder grows its capacity automatically as you append, so choosing a capacity is only a performance hint. Be careful with `new StringBuilder('a')`: a `char` argument widens to `int` and is treated as a capacity of 97, not as the text \"a\".",
   "When you trace an exam question, follow one builder object through every line, apply each mutating call even when its result is not assigned, and keep an eye on aliases created by assigning the return value. Then check the index arithmetic for every range method, remembering the exclusive end and the lenient end for `delete` and `replace`."
  ],
  "analogy": "A `String` is a printed page and a `StringBuilder` is a whiteboard. Erasing a word on the whiteboard changes it for everyone looking at it, even if you do not announce the change, which is why an unassigned `reverse()` still takes effect. Handing someone \"the whiteboard\" from a method call gives them the same board, not a copy, so two names can refer to one board. The analogy stops at equality: two whiteboards with identical writing are still two different boards to `equals`, so you have to compare what is written on them with `toString` or `compareTo`.",
  "terms": [
   [
    "StringBuilder",
    "A mutable, non-synchronized sequence of characters whose methods change the object in place."
   ],
   [
    "Method chaining",
    "Calling one method on the result of another; it works with StringBuilder because mutating methods return this."
   ],
   [
    "replace(start, end, str)",
    "Removes the characters from start to end (exclusive) and inserts str there."
   ],
   [
    "Capacity",
    "The amount of storage a StringBuilder has reserved, which is separate from its current length."
   ],
   [
    "StringBuffer",
    "An older, synchronized class with the same methods as StringBuilder, intended for use by multiple threads."
   ]
  ],
  "example": "A log formatter builds each line with a StringBuilder: it appends a timestamp, inserts a level tag at position 0, and deletes a trailing comma with `deleteCharAt(sb.length() - 1)`. All of it happens on one object, so formatting thousands of lines creates far fewer temporary strings than using + in a loop.",
  "mistakes": [
   [
    "Assuming an unassigned `sb.reverse();` has no effect, as with String methods.",
    "StringBuilder methods mutate the object itself, so the content is reversed whether or not the return value is used."
   ],
   [
    "Expecting `sb1.equals(sb2)` to compare content.",
    "StringBuilder does not override equals, so it compares identity. Use compareTo or compare the toString results."
   ],
   [
    "Thinking `delete(2, 99)` throws because 99 is past the end.",
    "delete and replace treat an end beyond the length as the length. Only start must be valid."
   ],
   [
    "Believing `StringBuilder b2 = sb.append(\"x\");` creates a second builder.",
    "append returns the same object, so b2 and sb are two references to one builder."
   ]
  ],
  "tryit": [
   [
    "A method receives a `StringBuilder report`, and a teammate adds a debug line that calls `report.reverse().indexOf(\"ERR\")` to look for errors at the end of the report. After the change, the final report written to disk is backwards. Explain the bug and suggest a safe way to inspect the text.",
    "reverse mutates the same builder the caller owns, so the reversal persists after the debug line. To inspect without changing it, work on a copy, such as new StringBuilder(report).reverse(), or check report.toString() with lastIndexOf or endsWith."
   ]
  ],
  "tip": "Track one StringBuilder object through every line, applying each call even when its result is not assigned. Then check the index math: every range method uses an exclusive end.",
  "check": [
   [
    "What is printed by `StringBuilder sb = new StringBuilder(\"abc\"); sb.reverse(); System.out.println(sb);`?",
    "cba. reverse changes the builder itself, so the ignored return value does not matter."
   ],
   [
    "What does `new StringBuilder(\"12345\").delete(1, 3)` contain?",
    "145. It removes indexes 1 and 2 (the end index 3 is excluded)."
   ],
   [
    "Is `new StringBuilder(\"x\").equals(new StringBuilder(\"x\"))` true?",
    "No. StringBuilder inherits equals from Object, which compares identity, and these are two objects."
   ],
   [
    "What does `new StringBuilder(\"cat\").replace(0, 1, \"ch\")` contain?",
    "chat. The character at index 0 is removed and \"ch\" is inserted, making the builder one character longer."
   ]
  ]
 },
 {
  "t": "Text blocks: incidental whitespace, \\ line continuation, \\s escape",
  "hook": "At Pinecrest Insurance, Omar has just replaced a tangle of escaped quotes and `\\n` sequences with a neat text block holding a JSON (JavaScript Object Notation) request template. The code looks beautiful in review. Then the partner system starts rejecting requests. The log shows the JSON is valid, but a fixed-width field that must end with two spaces has lost them, and an expected trailing newline is missing on one template while another has an extra one. Omar did not type anything different from the old version. The spaces are visible in his editor. Where did they go, and who decided?",
  "simple": "A text block is a way to type a long, multi-line piece of text in Java code exactly as it looks, wrapped between three double quotes at the start and three at the end. It saves you from typing special codes for every quote mark and line break. Because your code is usually indented, Java automatically removes the shared indentation at the start of every line, so the text is not full of extra spaces. It also removes spaces at the very end of lines. Two special codes help you control this: a backslash at the end of a line means \"join this line with the next one\", and `\\s` means \"keep a space here\". Think of it as pasting a poem into an email that tidies up the margins for you.",
  "body": [
   "A text block is a multi-line string literal that starts with three double quotes and ends with three double quotes. It produces an ordinary `String` at compile time, so everything you know about strings still applies: it is immutable, it is pooled like any other literal, and `equals` compares it with any other string by content. Text blocks make embedded JSON (JavaScript Object Notation), SQL (Structured Query Language) or HTML (HyperText Markup Language) readable, because you can write quotes and line breaks directly instead of escaping them with `\\\"` and `\\n`.",
   "The opening delimiter must be followed by a line terminator, optionally preceded by whitespace: the content always starts on the next line. Writing content on the same line as the opening quotes is a compile error, so a one-line `\"\"\"abc\"\"\"` does not compile. Each line break in the source becomes a `\\n` in the value, and line endings are normalized to `\\n` even if the source file was saved with Windows-style carriage-return line endings. If the closing delimiter is on its own line, the string ends with a newline; if it sits at the end of the last content line, there is no trailing newline.",
   "Incidental whitespace is the indentation that exists only because the text block is indented along with your code. The compiler removes it with a simple algorithm. It looks at every non-blank content line, plus the closing delimiter's line if the delimiter is on a line by itself, and finds the smallest number of leading whitespace characters among them. It then strips that many characters from the start of every line. Lines that are entirely blank do not take part in the calculation, and each space or tab counts as one character, which is why mixing tabs and spaces gives surprising results. Anything beyond the common indentation is essential whitespace and is kept.",
   "Because the closing delimiter takes part in the calculation, its position is a deliberate control. Moving the closing delimiter to the left of the content adds indentation to the result, since the minimum shrinks and the content keeps more of its leading spaces. Moving it to the right cannot remove more than the content has, because the content lines still set the minimum. Separately, trailing spaces at the end of each content line are always stripped, which is the cause of the missing spaces in many real bugs.",
   "Escape sequences still work inside text blocks, and they are processed after the whitespace stripping, which is the key to two escapes that matter here. A backslash at the very end of a line, a `\\` followed directly by the line break, is a line continuation: it suppresses that newline, so two source lines become one line in the value. The `\\s` escape is a single space; because it is an escape rather than a literal space, it survives trailing-space stripping, so you can use it to keep trailing spaces or to pad lines to a fixed width. You can include a single double quote or two in a row freely; three in a row must have at least one escaped, as in `\\\"\"\"`.",
   "```java\nString a = \"\"\"\n    Hello\n      World\n    \"\"\";\n// \"Hello\\n  World\\n\"  (4 spaces of incidental whitespace removed)\n\nString b = \"\"\"\n    one \\\n    two\"\"\";\n// \"one two\"  (continuation joins lines, no trailing newline)\n\nString c = \"\"\"\n    red\\s\n    green\n    \"\"\";\n// \"red \\ngreen\\n\"  (\\s keeps the space)\n\nString d = \"\"\"\n      indented\n  \"\"\";\n// \"    indented\\n\"  (closing delimiter further left keeps 4 spaces)\n```",
   "Notice in example `b` that the space before the backslash is part of the first line's content and is followed by an escape, so it is kept, and the result is `one two` with a single space. Without that space the lines would join as `onetwo`. In example `d`, the closing delimiter is indented two spaces while the content is indented six, so the minimum is two and four essential spaces remain in front of the word.",
   "Text blocks also combine well with methods introduced for them. `formatted(...)` works like `String.format` on the block, so a block whose content line reads `Hello, %s` can be followed by `.formatted(name)` right after the closing delimiter to fill in the placeholder. `stripIndent()` applies the same incidental-whitespace algorithm to any string, and `translateEscapes()` processes escape sequences in a string at runtime. You will rarely need the last two on the exam, but knowing they exist explains where the text block rules come from.",
   "Count carefully on exam questions. Note where the closing delimiter is, compute the common indentation from the non-blank lines and the delimiter line, strip trailing spaces, then apply escapes such as `\\s` and line continuations, and finally decide whether the last line ends with a newline. In your lab, print a text block wrapped in brackets, as in `System.out.println(\"[\" + block + \"]\");`, so you can see the leading spaces and the final newline that would otherwise be invisible."
  ],
  "analogy": "Think of a text block as a letter pasted into a document that automatically tidies the left margin. The tidy-up slides every line left by the same amount, the smallest margin any line has, so relative indentation is preserved. The closing delimiter acts like a margin marker: place it further left and the tidy-up slides less. Trailing spaces are like invisible ink at the end of each line that the tidy-up always wipes away, unless you write them with the special pen `\\s`. The analogy stops at escapes: a real document has no equivalent of the line-continuation backslash that joins two lines into one.",
  "terms": [
   [
    "Text block",
    "A multi-line String literal delimited by three double quotes, with content starting on the line after the opening delimiter."
   ],
   [
    "Incidental whitespace",
    "Common leading indentation that the compiler strips from every line of a text block."
   ],
   [
    "Essential whitespace",
    "Indentation beyond the common minimum, which the compiler keeps as part of the string."
   ],
   [
    "Line continuation",
    "A backslash at the end of a text block line, which removes the line break so the next line joins it."
   ],
   [
    "\\s escape",
    "An escape for a single space that survives the stripping of trailing whitespace."
   ]
  ],
  "example": "A developer embeds an SQL query in a text block indented inside a method. When logged, the query shows no leading spaces, because the compiler removed the incidental indentation. To keep a long WHERE clause on one physical line in the output while wrapping it in source, the developer ends the first half with a backslash.",
  "mistakes": [
   [
    "Writing content on the same line as the opening three quotes.",
    "The opening delimiter must be followed by a line terminator, so content on that line is a compile error."
   ],
   [
    "Assuming the leading spaces you see in source end up in the string.",
    "The common indentation of the non-blank lines and the closing delimiter line is removed as incidental whitespace."
   ],
   [
    "Expecting trailing spaces typed at the end of a line to be kept.",
    "Trailing spaces are always stripped. Use \\s, or another escape, to keep a trailing space."
   ],
   [
    "Thinking a text block always ends with a newline.",
    "It ends with a newline only if the closing delimiter is on its own line. If the delimiter follows the last content, there is none."
   ]
  ],
  "tryit": [
   [
    "You must produce a fixed-width record where each line is exactly 10 characters, and the value `ABC` must be followed by 7 spaces. In a text block you type `ABC` and seven spaces, but the output line is only 3 characters long. The closing delimiter is on its own line under the content. What changed the line, and how do you fix it while keeping the text block?",
    "Trailing spaces on each line are stripped as part of whitespace processing, so the seven spaces vanish. End the padding with an escape that survives stripping, for example six spaces followed by \\s, or write the seven spaces as \\s escapes; escapes are translated after stripping, so the line keeps its full width."
   ]
  ],
  "tip": "The closing delimiter's position controls indentation: if it is on its own line and further left than the content, the difference becomes leading spaces. If it is on the last content line, there is no final newline.",
  "check": [
   [
    "Does a text block allow content on the same line as the opening three quotes?",
    "No. The opening delimiter must be followed by a line terminator, so that is a compile error."
   ],
   [
    "Why use `\\s` instead of a plain space at the end of a text block line?",
    "Trailing spaces are stripped from each line, but \\s is an escape that is translated after stripping, so the space is kept."
   ],
   [
    "What does a backslash at the end of a text block line do?",
    "It is a line continuation: the newline is removed, and the next line is joined to the current one."
   ],
   [
    "A text block's content lines are indented 8 spaces and the closing delimiter, on its own line, is indented 4. How many leading spaces does each content line keep?",
    "4. The minimum indentation is 4, set by the closing delimiter, so 4 spaces are removed from each line and 4 remain."
   ]
  ]
 },
 {
  "t": "Date-Time API: LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Instant",
  "hook": "It is Monday morning at Saltmarsh Travel, and Grace from the operations desk has a spreadsheet of complaints. Customers booked on an overnight flight from Seattle to Boston were shown an arrival time that was three hours wrong. The audit log, collected from servers in two regions, lists a booking change as happening before the booking itself was created. And a reminder job meant to run \"one day after check-in\" never fired, though the code calls `plusDays(1)` right there in plain sight. Every one of these values came from Java's date and time classes. Which class should each piece of data have been stored in, and what went wrong with that reminder?",
  "simple": "Java has a set of ready-made tools for dates and times, and each one holds a different amount of information. One holds only a date, like a birthday. One holds only a clock time, like 7:30 for an alarm. One holds both a date and a time but no location, like \"lunch on March 3 at noon\" written on a sticky note. One adds the time zone, so it knows exactly which moment in the world you mean. The last one is a single, precise moment counted from a fixed starting point, used for computer timestamps. None of them can be changed after they are made: adding a day gives you a new value, like getting a new calendar page rather than erasing the old one.",
  "body": [
   "The `java.time` package is Java's modern date and time application programming interface (API). Its classes are immutable and thread-safe, unlike the older `java.util.Date` and `Calendar` classes, and none of them have public constructors: you create values with static factory methods such as `now()`, `of(...)` and `parse(...)`. Writing `new LocalDate()` does not compile. Because the values are immutable, every method that seems to change one, like `plusDays` or `withYear`, returns a new object. Forgetting to assign that result is the most common exam trap, exactly as with `String`: `date.plusDays(1);` on its own line changes nothing.",
   "Pick the class by how much information you need. `LocalDate` is a date with no time or zone, such as a birthday (`LocalDate.of(2025, 3, 14)`). `LocalTime` is a time of day with no date, such as an alarm at 07:30, with precision down to nanoseconds. `LocalDateTime` combines both but still has no time zone, so it does not name a single moment on the global timeline: 9:00 on a given date happens at different instants in Tokyo and in Chicago. `ZonedDateTime` adds a `ZoneId` such as `America/New_York`, so it pins down an exact moment and knows the zone's offset rules, including daylight saving time. `Instant` is a point on the timeline measured from the epoch, 1970-01-01T00:00:00Z, in UTC (Coordinated Universal Time), and it is the natural type for timestamps in logs and databases because every server agrees on it.",
   "Months are numbered 1 to 12, unlike the old `Calendar` class where January was 0, and you can also pass a `Month` enum constant: `LocalDate.of(2025, Month.JANUARY, 31)`. Invalid values are rejected at runtime, not at compile time: `LocalDate.of(2025, 2, 30)` and `LocalTime.of(25, 0)` both throw a `DateTimeException`. Adding months, however, adjusts to the end of the month instead of failing, so January 31 plus one month is February 28, or February 29 in a leap year. Parsing works the same way: `LocalDate.parse(\"2025-03-14\")` reads the standard ISO-8601 format (an International Organization for Standardization date format), and badly formed text throws a `DateTimeParseException`.",
   "Methods only exist where they make sense, and the compiler enforces it. `LocalDate` has `plusDays`, `plusWeeks`, `plusMonths` and `plusYears` but no `plusHours`, so calling `plusHours` on a `LocalDate` does not compile. `LocalTime` has `plusHours`, `plusMinutes` and `plusSeconds` but no `plusDays`. `LocalDateTime` and `ZonedDateTime` have both families. Times wrap around midnight silently: `LocalTime.of(23, 0).plusHours(2)` is 01:00, with no date to roll over. Getters include `getYear()`, `getMonth()` (which returns a `Month` enum), `getMonthValue()` (an `int` from 1 to 12), `getDayOfMonth()`, `getDayOfWeek()` (a `DayOfWeek` enum) and `getHour()`. The `with` methods replace one field, as in `date.withDayOfMonth(1)` for the first of the month.",
   "You convert between the types by adding or removing information. `date.atTime(9, 0)` gives a `LocalDateTime`, and `date.atStartOfDay()` gives midnight. `ldt.atZone(ZoneId.of(\"Europe/Paris\"))` gives a `ZonedDateTime`, `zdt.toInstant()` gives an `Instant`, and `instant.atZone(zone)` goes back the other way. `ldt.toLocalDate()` and `ldt.toLocalTime()` drop parts. You cannot turn a `LocalDateTime` straight into an `Instant` without supplying a zone or offset, because without one the moment is ambiguous. Comparisons use `isBefore`, `isAfter` and `isEqual`, or `compareTo`, and `equals` on a `ZonedDateTime` also compares the zone, so two values for the same instant in different zones are not `equals`.",
   "```java\nLocalDate d = LocalDate.of(2025, 1, 31);\nd.plusDays(1);                      // result discarded\nSystem.out.println(d);              // 2025-01-31\nLocalDate next = d.plusMonths(1);\nSystem.out.println(next);           // 2025-02-28\nLocalDateTime ldt = next.atTime(14, 5);\nSystem.out.println(ldt);            // 2025-02-28T14:05\nZonedDateTime z = ldt.atZone(ZoneId.of(\"UTC\"));\nSystem.out.println(z.toInstant());  // 2025-02-28T14:05:00Z\n```",
   "Look at the printed forms in that example, because exam answers rely on them. `toString` uses ISO-8601: dates print as `2025-02-28`, date-times put a `T` between date and time, seconds are omitted when they are zero (`14:05`, not `14:05:00`), and an `Instant` always ends in `Z` for UTC. A `ZonedDateTime` prints its offset and then the zone ID in square brackets, as in `2025-02-28T14:05-05:00[America/New_York]`.",
   "For text output in other formats, `DateTimeFormatter` formats and parses. `DateTimeFormatter.ofPattern(\"yyyy-MM-dd HH:mm\")` uses `MM` for month and `mm` for minutes, and `HH` for a 24-hour clock versus `hh` for a 12-hour clock, usually paired with `a` for AM or PM. Mixing those letters up is a classic mistake that compiles and runs but produces nonsense such as minutes where the month should be. Formatting a `LocalDate` with a pattern that includes hours throws an exception at runtime, because the date has no time field to supply. You can call either `date.format(formatter)` or `formatter.format(date)`; both work."
  ],
  "analogy": "Think of the five classes as increasingly complete addresses for a meeting. `LocalDate` is \"March 3\", `LocalTime` is \"at noon\", and `LocalDateTime` is \"March 3 at noon\", which is still useless to someone in another city who does not know whose noon you mean. `ZonedDateTime` adds \"New York time\", so anyone anywhere can work out the moment. `Instant` is the satellite timestamp: one number that every clock on earth agrees on, with no local calendar at all. The analogy stops at immutability: a real meeting can be rescheduled, but a Java date value never changes; you always get a new one back.",
  "terms": [
   [
    "LocalDate",
    "An immutable date (year, month, day) with no time of day and no time zone."
   ],
   [
    "LocalTime",
    "An immutable time of day with no date and no zone, which wraps around midnight when you add hours."
   ],
   [
    "LocalDateTime",
    "A date and time without a zone, so it does not identify a single global instant."
   ],
   [
    "ZonedDateTime",
    "A date and time with a ZoneId, which identifies an exact moment and applies that zone's offset and daylight saving rules."
   ],
   [
    "Instant",
    "A point on the UTC timeline measured from the epoch 1970-01-01T00:00:00Z."
   ]
  ],
  "example": "An airline stores departure times as ZonedDateTime so that a flight leaving Tokyo and landing in Los Angeles shows the correct local time at each airport, while the booking system logs every change as an Instant so all servers agree on the order of events regardless of where they run.",
  "mistakes": [
   [
    "Believing `date.plusDays(1);` updates date.",
    "java.time values are immutable. The method returns a new object, which must be assigned to be kept."
   ],
   [
    "Calling `LocalDate.of(2025, 0, 15)` for January.",
    "Months run from 1 to 12, so 0 throws a DateTimeException at runtime. Use 1 or Month.JANUARY."
   ],
   [
    "Using `plusHours` on a LocalDate.",
    "LocalDate has no time fields, so that method does not exist and the code does not compile."
   ],
   [
    "Storing global event times as LocalDateTime.",
    "Without a zone, the value does not identify one moment. Use Instant or ZonedDateTime for events that must be ordered across regions."
   ]
  ],
  "tryit": [
   [
    "A gym app stores each member's class booking as a `LocalDateTime` and compares bookings from members in different time zones to detect double-booked instructors. Two bookings at 18:00 in Denver and 18:00 in Chicago are flagged as a conflict, although they are an hour apart. Which type should the app store, and why?",
    "Store ZonedDateTime (or convert to Instant for comparison). LocalDateTime has no zone, so both values look identical. With zones, the instants differ by an hour and isBefore or isAfter on the Instant values compares the real moments."
   ],
   [
    "A report formatter uses `DateTimeFormatter.ofPattern(\"dd/mm/yyyy\")` and prints dates like `14/00/2025` for every day in March. What is wrong?",
    "mm means minutes, and a LocalDateTime at midnight has 00 minutes. The pattern needs MM for the month. (With a LocalDate, mm would instead throw an exception, because there is no minute field.)"
   ]
  ],
  "tip": "When a date-time method call is not assigned, the object is unchanged. Also check that the method exists on that type: LocalDate has no plusHours, and LocalTime has no plusDays.",
  "check": [
   [
    "Which class would you use for a store's opening time that is the same every day?",
    "LocalTime, because it represents a time of day without a date or a zone."
   ],
   [
    "What happens with `LocalDate.of(2025, 4, 31)`?",
    "It throws a DateTimeException at runtime, because April has only 30 days."
   ],
   [
    "What is `LocalDate.of(2024, 1, 31).plusMonths(1)`?",
    "2024-02-29. 2024 is a leap year, and plusMonths clamps to the last valid day of the month."
   ],
   [
    "Does `LocalDate d = new LocalDate(2025, 1, 1);` compile?",
    "No. java.time classes have no public constructors; use LocalDate.of(2025, 1, 1)."
   ]
  ]
 },
 {
  "t": "Period vs Duration and daylight saving time transitions",
  "hook": "It is the Monday after the clocks spring forward, and the help desk at Riverbend Medical Group is flooded. Patients set up with a medication reminder \"every 24 hours at 8:00 a.m.\" were pinged at 9:00 a.m. on Sunday. Meanwhile, the night-shift payroll system paid Sam, who worked from 10 p.m. Saturday to 6 a.m. Sunday, for eight hours, although only seven real hours passed. Both features were built by careful developers using Java's date-time classes, and both pass every unit test written in January. What is the difference between \"one day later\" and \"24 hours later\", and which one did each feature need?",
  "simple": "Java has two different ways to measure an amount of time. A `Period` counts calendar units: years, months and days, like \"see you in 2 months\". A `Duration` counts exact clock time: hours, minutes and seconds, like \"the oven timer is set for 90 minutes\". Most days these agree, but not always. Twice a year in many places, clocks jump forward or back an hour for daylight saving time. On those days, \"same time tomorrow\" is only 23 or 25 hours away. Think of a weekly TV show that always airs at 8 p.m.: after the clocks change, it still airs at 8 p.m., even though the real time between episodes was not exactly a week of hours.",
  "body": [
   "Java separates two kinds of amounts of time, and choosing the right one is the core of this topic. A `Period` is a date-based amount in years, months and days, such as \"2 months and 3 days\". A `Duration` is a time-based amount stored as seconds and nanoseconds, created from days, hours, minutes or seconds. The difference matters because a month or a calendar day does not always have the same length, since months vary between 28 and 31 days and a calendar day can be 23 or 25 hours long, while a `Duration` is always an exact number of seconds. Both classes are immutable, like the rest of `java.time`.",
   "Create them with static factories. `Period.of(1, 2, 3)` is 1 year, 2 months and 3 days; `Period.ofDays(10)`, `Period.ofMonths(6)` and `Period.ofWeeks(2)` (stored as 14 days) build single units. For time, use `Duration.ofHours(5)`, `Duration.ofMinutes(90)`, `Duration.ofSeconds(30)` or `Duration.ofDays(1)`, which is stored as 24 hours. You can also measure between values: `Period.between(date1, date2)` takes two `LocalDate` values, and `Duration.between(t1, t2)` takes two time-based values such as `LocalTime`, `LocalDateTime` or `Instant`. Passing two `LocalDate` values to `Duration.between` throws an exception at runtime, because a date has no seconds to count. When you just need a count of one unit, `ChronoUnit.DAYS.between(d1, d2)` returns a `long`.",
   "The `toString` formats follow ISO-8601, the international standard for date and time notation, and the exam expects you to read them. A `Period` prints like `P1Y2M3D`, starting with `P` for period, and a zero period prints `P0D`. A `Duration` prints like `PT1H30M`, where the `T` marks the start of the time part. `Duration.ofDays(1)` prints `PT24H`, not `P1D`, because a `Duration` never stores days as a calendar unit. A `Period` is not normalized automatically, so `Period.ofMonths(14)` prints `P14M` until you call `normalized()`, which gives `P1Y2M`.",
   "One trap is chaining factories. `Period.ofYears(1).ofMonths(2)` looks like it builds 1 year and 2 months, but `ofMonths` is a static method, so calling it through an instance ignores that instance entirely and the result is just `P2M`. Many code editors flag a static call made through an instance, but the compiler accepts it. Use `Period.of(1, 2, 0)`, or an instance method such as `withMonths` or `plusMonths`, instead. Another trap is using the wrong amount for the type. A `Period` with a non-zero amount cannot be added to a `LocalTime`, and a `Duration` cannot be added to a `LocalDate`; both compile but throw `UnsupportedTemporalTypeException` at runtime, because the target has no field for those units.",
   "Daylight saving time (DST) is where `Period` and `Duration` behave differently on a `ZonedDateTime`. In the spring, clocks jump forward and a local hour is skipped, which is called a gap. In the fall, clocks go back and a local hour repeats, which is called an overlap. A `ZonedDateTime` handles both with its zone's rules, which is something `LocalDateTime` cannot do because it has no zone. If you create a time that falls in a gap, it moves forward by the length of the gap, so 02:30 on a spring-forward day in New York becomes 03:30 with the new offset. In an overlap, it keeps the earlier offset by default, and `withLaterOffsetAtOverlap()` selects the second occurrence.",
   "Date-based arithmetic keeps the local time of day, while time-based arithmetic adds exact elapsed time. On the day before a spring-forward change, `zdt.plusDays(1)` or `zdt.plus(Period.ofDays(1))` gives the same clock time the next day, even though only 23 real hours pass. `zdt.plusHours(24)` or `zdt.plus(Duration.ofDays(1))` adds exactly 24 hours, so the clock reading ends up one hour later. In the fall the effect reverses: `plusDays(1)` spans 25 real hours, while `plusHours(24)` lands one hour earlier on the clock.",
   "```java\nZoneId ny = ZoneId.of(\"America/New_York\");\n// US clocks spring forward at 02:00 on 2025-03-09\nZonedDateTime z = ZonedDateTime.of(2025, 3, 8, 12, 0, 0, 0, ny);\nSystem.out.println(z.plusDays(1));   // 2025-03-09T12:00-04:00[America/New_York]\nSystem.out.println(z.plusHours(24)); // 2025-03-09T13:00-04:00[America/New_York]\nSystem.out.println(Duration.between(z, z.plusDays(1))); // PT23H\n```",
   "Notice that the offset in the output changes from -05:00 to -04:00 across the transition, and that the `Duration` between noon and noon is only 23 hours. When a question prints a `ZonedDateTime`, read both the clock time and the offset. Converting both values to `Instant` is a reliable way to check how much real time has passed, because an `Instant` ignores zones and offsets entirely.",
   "In practice, choose by the business meaning. Calendar commitments such as a monthly bill, a yearly renewal or a daily 8 a.m. reminder should use `Period` or the `plusDays` and `plusMonths` family, so they stay on the same calendar day and clock time. Measurements of elapsed time, such as billing by the hour, timeouts, or how long a shift lasted, should use `Duration`, ideally computed between `Instant` or `ZonedDateTime` values so DST changes are counted correctly."
  ],
  "analogy": "A `Period` is like a wall calendar and a `Duration` is like a stopwatch. If you circle \"same time tomorrow\" on the calendar, you meet at 8:00 again no matter how the clocks were adjusted overnight. If you start a stopwatch for 24 hours, it beeps after exactly 24 hours of real time, which on a spring-forward night reads 9:00 on the wall. Neither is wrong; they answer different questions. The analogy stops with LocalDateTime: a wall calendar with no city printed on it cannot know about DST at all, which is why only ZonedDateTime shows the difference.",
  "terms": [
   [
    "Period",
    "A date-based amount of time in years, months and days, printed like P1Y2M3D."
   ],
   [
    "Duration",
    "A time-based amount stored as seconds and nanoseconds, printed like PT2H30M."
   ],
   [
    "DST gap",
    "The skipped local hour when clocks spring forward; a time inside it is shifted forward by the gap length."
   ],
   [
    "DST overlap",
    "The repeated local hour when clocks fall back; ZonedDateTime keeps the earlier offset by default."
   ],
   [
    "ISO-8601",
    "The international standard notation used by toString in java.time, such as 2025-03-09 and PT1H30M."
   ]
  ],
  "example": "A subscription renews monthly, so billing uses `plus(Period.ofMonths(1))` to keep the same calendar day, while a parking app charges by elapsed time and uses `Duration.between(entry, exit)` on Instant values, so a car parked across a DST change is billed for the hours actually used.",
  "mistakes": [
   [
    "Thinking `Period.ofYears(1).ofMonths(2)` is 1 year and 2 months.",
    "ofMonths is static, so the first object is ignored and the result is P2M. Use Period.of(1, 2, 0)."
   ],
   [
    "Expecting `Duration.ofDays(1)` to print P1D.",
    "Duration stores time in seconds, so it prints PT24H. Only Period prints days as D before any T."
   ],
   [
    "Believing plusDays(1) and plusHours(24) always give the same result.",
    "On a ZonedDateTime across a DST change, plusDays keeps the clock time while plusHours(24) adds exact elapsed time, so the results differ by an hour."
   ],
   [
    "Assuming adding a Duration to a LocalDate fails to compile.",
    "plus(TemporalAmount) accepts any amount, so it compiles, but it throws UnsupportedTemporalTypeException at runtime."
   ]
  ],
  "tryit": [
   [
    "A hotel booking system computes checkout as `checkIn.plus(Duration.ofDays(3))` on a `ZonedDateTime` with check-in at 15:00. Guests whose stay includes the fall-back night see a checkout time of 14:00, and they are unhappy. What should the code use instead, and why?",
    "Use plusDays(3) or plus(Period.ofDays(3)). A stay is a calendar commitment that should keep the same clock time. Duration.ofDays(3) adds exactly 72 hours, and the fall-back day has 25 hours, so the result lands one hour earlier on the clock."
   ],
   [
    "A timesheet app records shift start and end as `LocalDateTime` and computes pay with `Duration.between(start, end)`. A nurse who works from 22:00 to 06:00 across the spring-forward night is paid for 8 hours. Is that correct, and how would you fix it?",
    "It is not correct: only 7 real hours passed, but LocalDateTime has no zone, so it cannot see the skipped hour. Record ZonedDateTime or Instant values, and Duration.between will return PT7H."
   ]
  ],
  "tip": "Remember Period for dates (P...Y...M...D) and Duration for times (PT...H...M...S). Across a DST change, plusDays keeps the wall-clock time, while plusHours(24) keeps the exact elapsed time.",
  "check": [
   [
    "What does `Period.ofDays(3).ofWeeks(1)` produce?",
    "P7D. ofWeeks is static, so the first call's result is ignored and one week is stored as 7 days."
   ],
   [
    "What happens to `ZonedDateTime` 02:30 local time on a spring-forward day when that hour is skipped?",
    "It is adjusted forward by the length of the gap, typically to 03:30 with the new offset."
   ],
   [
    "Can you add `Duration.ofHours(2)` to a `LocalDate`?",
    "It compiles but throws UnsupportedTemporalTypeException at runtime, because LocalDate has no time units."
   ],
   [
    "What does `Duration.ofMinutes(150)` print?",
    "PT2H30M. Duration normalizes minutes into hours and minutes in its output."
   ]
  ]
 },
 {
  "t": "If/else and the ternary operator",
  "hook": "On Thursday evening the checkout page at Juniper Garden Supply starts giving every customer free shipping, not just loyalty members. Aisha, the on-call developer, opens the commit from that afternoon. Someone added a second line under an `if` that checks for loyalty membership, indented neatly to match the first line. The diff looks perfect, the code compiles, and the tests that only use loyalty members all pass. A few lines further down, a one-line ternary decides the shipping label and now refuses to compile in a teammate's branch. Orders are flowing in with the wrong totals. What is the compiler reading differently from the humans who reviewed this code?",
  "simple": "Programs often need to make choices, such as \"if the customer is a member, give free shipping, otherwise charge the normal rate\". In Java, the `if` statement makes this kind of choice: it checks a yes-or-no question and runs some code only when the answer is yes, with an optional `else` for when the answer is no. The question must truly be yes or no; Java will not treat a number as yes or no. There is also a compact form, the ternary operator, written `question ? answerIfYes : answerIfNo`, which picks one of two values in a single line. It is like a vending machine button that gives you either a cold drink or a hot one depending on a single switch.",
  "body": [
   "An `if` statement runs a block only when its condition is `true`. The condition must be a `boolean` expression, or a `Boolean` that is unboxed; unlike C, Java will not treat an `int` as true or false, so `if (count)` does not compile and neither does `if (5)`. An optional `else` runs when the condition is `false`, and you can chain decisions with `else if`. Only the first branch whose condition is true runs, so the order of conditions matters: checking `score >= 50` before `score >= 90` means the second branch can never be reached by a high score.",
   "Braces are optional when a branch has a single statement, and this is where many exam questions hide. Without braces, only the next statement belongs to the `if`, no matter how it is indented, because Java ignores indentation entirely. An `else` always attaches to the nearest preceding unmatched `if` in the same block, which is known as the dangling else. Reading indentation instead of structure leads to the wrong answer, so mentally add braces around exactly one statement after each unbraced `if` or `else`.",
   "```java\nint x = 5;\nif (x > 10)\n    System.out.println(\"big\");\n    System.out.println(\"always\");   // not part of the if\n\nif (x > 0)\n    if (x > 10) System.out.println(\"A\");\nelse System.out.println(\"B\");        // belongs to the inner if: prints B\n```",
   "In the first example, `always` prints whatever the value of `x`, because only the `big` line is controlled by the `if`. In the second, the `else` is indented to line up with the outer `if`, but it belongs to the inner `if (x > 10)`. Since `x` is 5, the outer condition is true, the inner condition is false, and `B` is printed. If `else` followed an `if` that was already closed by an earlier `else`, or if a stray statement separated them, the code would not compile with an \"else without if\" error.",
   "Watch for assignment inside a condition. `if (flag = false)` compiles when `flag` is a `boolean`, because the value of an assignment expression is the assigned value, here `false`, so the branch never runs and `flag` is silently overwritten. With an `int`, `if (n = 5)` does not compile because the result is an `int`. Also note that a stray semicolon, as in `if (x > 10);`, makes the `if` control an empty statement, and the block that follows always runs. Finally, unlike loops, `if (false) { ... }` is allowed even though its body can never run; Java permits it so that constant flags can switch code on and off, whereas `while (false) { ... }` is an unreachable-statement compile error.",
   "An `if` condition can also include a type pattern, which declares a variable only where the test has succeeded. In `if (obj instanceof String s && s.length() > 3)`, the variable `s` is in scope on the right side of `&&` and inside the `if` block, because both are reached only when the pattern matched. With `||` instead of `&&`, `s` would not be usable on the right side, since that side runs exactly when the match failed. This flow scoping follows the same short-circuit logic as ordinary `if` conditions.",
   "The ternary, or conditional, operator `condition ? valueIfTrue : valueIfFalse` is an expression, so it produces a value and can be used in assignments, method arguments and return statements. Only one of the two value expressions is evaluated, so side effects in the other branch do not happen: `int y = true ? x++ : x--;` increments `x` only. The ternary has low precedence, just above assignment, and is right-associative, so `a ? b : c ? d : e` means `a ? b : (c ? d : e)`. A ternary cannot stand alone as a statement: `flag ? a() : b();` does not compile, even when both methods return values.",
   "The result type of a ternary depends on both branches. If one branch is `int` and the other is `double`, numeric promotion makes the result `double`, so `int r = flag ? 1 : 2.0;` does not compile. If one branch is `int` and the other is `long`, the result is `long`. If the branches are unrelated reference types, such as `String` and `Integer`, the result is a common supertype, which is fine for `Object o = flag ? \"a\" : 1;` but not for `String s = flag ? \"a\" : 1;`. Mixing a primitive with `null`, as in `flag ? 1 : null`, gives an `Integer`; assigning that to an `int` compiles but throws a `NullPointerException` when the `null` branch is chosen, because the value must be unboxed.",
   "Use `if/else` when you are choosing between actions, and a ternary when you are choosing between two values. Deeply nested ternaries compile but are hard to read; exam questions use them precisely because they are easy to misread, so add parentheses mentally from right to left. For every `if` question, ignore the indentation, count statements, match each `else` to its closest open `if`, and check that each condition really is a `boolean`."
  ],
  "analogy": "An unbraced `if` is like a sign on a door that says \"Staff only\": it applies to the next door and nothing else, no matter how neatly the doors behind it are lined up. The dangling `else` works like a reply in a group chat that attaches to the most recent unanswered question, not the one you were thinking of. The ternary is a railroad switch: the train goes down exactly one track, so anything on the other track never happens. The analogy stops at types: a railroad does not care what the two destinations have in common, but Java computes a single result type from both branches.",
  "terms": [
   [
    "Conditional expression",
    "The ternary operator cond ? a : b, which evaluates to one of two values depending on a boolean."
   ],
   [
    "Dangling else",
    "The rule that an else attaches to the closest unmatched if, regardless of indentation."
   ],
   [
    "Boolean condition",
    "An expression of type boolean or Boolean, the only kind accepted by if, while and the ternary operator."
   ],
   [
    "Empty statement",
    "A lone semicolon; after if(...) it becomes the entire body of the if."
   ],
   [
    "Flow scoping",
    "The rule that a pattern variable declared in an instanceof test is in scope only where the match is known to have succeeded."
   ]
  ],
  "example": "A shipping page shows `String label = weight > 20 ? \"Freight\" : \"Standard\";`. When a teammate later adds a second action to an unbraced `if` for free-shipping customers, the second line runs for everyone. Code review catches it, and the team adopts a rule to always use braces.",
  "mistakes": [
   [
    "Trusting indentation to show which statements belong to an if.",
    "Java ignores indentation. Without braces, only the single next statement belongs to the if or else."
   ],
   [
    "Matching an else to the outer if because it is lined up with it.",
    "An else binds to the nearest unmatched if, which is often the inner one."
   ],
   [
    "Writing `int r = flag ? 1 : 2.0;` and expecting it to compile.",
    "The branches are promoted to a common type, double, which cannot be assigned to int without a cast."
   ],
   [
    "Using a ternary as a standalone statement, such as `ok ? save() : log();`.",
    "A ternary is an expression, not a statement, so it must be used as a value, for example in an assignment or return."
   ]
  ],
  "tryit": [
   [
    "A teammate writes `if (isAdmin = true) grantAccess();` and every user, including guests, receives admin access. It compiles without errors, and isAdmin is a boolean field. Explain why, and suggest two ways to write the condition safely.",
    "The single = assigns true to isAdmin and the expression's value is true, so the branch always runs and the field is overwritten. Write if (isAdmin) or, if a comparison is needed, if (isAdmin == true). Using just the variable is the clearest and avoids the typo entirely."
   ]
  ],
  "tip": "Ignore indentation. Count statements: without braces, only one statement belongs to the if or else, and every else binds to the nearest unmatched if.",
  "check": [
   [
    "What is the type of `true ? 1 : 2L`?",
    "long. Binary numeric promotion applies to the two branches, so the int is widened to long."
   ],
   [
    "Does `if (5) { }` compile in Java?",
    "No. The condition must be boolean; Java does not convert numbers to booleans."
   ],
   [
    "In `int a = 1; int b = (a > 0) ? a++ : a--;`, what are a and b?",
    "a is 2 and b is 1. Only the true branch runs, and the postfix a++ yields 1 before incrementing."
   ],
   [
    "What does `int x = 3; if (x > 5); System.out.println(\"hi\");` print?",
    "hi. The semicolon ends the if with an empty statement, so the print always runs."
   ]
  ]
 },
 {
  "t": "Classic switch statements, fall-through and break",
  "hook": "It is your second week at Lantern Ferries, and a ticket lands in your queue: customers who choose option 4, Export, in the booking console are watching their saved trips vanish. You open the menu handler and find a tidy classic switch, one case per option. The Export code looks fine. The Delete code under case 5 looks fine too. Nobody touched Delete in months. So why does picking Export erase data? Your lead leans over and says only, \"Look at what is missing, not at what is there.\" What is missing?",
  "simple": "A switch is like a row of doors in a hallway, each with a number on it. Java looks at your value, finds the door with the matching number and walks in. The surprise in the old-style switch is that the doors are only entrances, not walls. Once you are inside, you keep walking down the hallway through every room after it until you hit a sign that says stop, which in Java is the word break. Forget the break, and you wander into the next room too. That keeps going is called fall-through. If no door matches, Java uses the door marked default if there is one, and otherwise it skips the whole hallway.",
  "body": [
   "A `switch` statement chooses one of several code paths by comparing a single value, the selector, against a list of `case` labels. In the classic form each label ends with a colon, and the statements after the matching label run. The selector of a classic switch can be a `char`, `byte`, `short` or `int`, their wrapper classes (`Character`, `Byte`, `Short`, `Integer`), a `String`, or an `enum`. It cannot be a `long`, `float`, `double` or `boolean`; code such as `long id = 5L; switch (id) { ... }` simply does not compile. Pattern-matching switches, covered in a later lesson, widen this to any reference type, but the classic constant-label form keeps these limits.",
   "The labels themselves are strict. Each `case` label must be a compile-time constant whose type is compatible with the selector: a literal such as `3` or `\"red\"`, an enum constant, or a `final` local or field initialized with a constant expression. A plain variable, even one that never changes, is not enough, and a method call such as `case max():` is rejected. Two labels with the same value are a compile error too, because the compiler could not decide which one to enter. Since Java 14 a single label can list several values separated by commas, as in `case 1, 2, 3:`, which replaces the older habit of stacking `case 1: case 2: case 3:` on separate lines. For an enum selector you write the bare constant name, `case MONDAY:`, not `case Day.MONDAY:` in the traditional style.",
   "Fall-through is the defining behavior of the colon form, and it is the thing exam questions test most. A label is only an entry point. Once execution enters at the matching label, it continues straight down through every following statement, including the statements under later labels, until it reaches a `break`, a `return`, a thrown exception, or the closing brace of the switch. The next `case` label is not a barrier. Fall-through is genuinely useful when several values should share code, but a forgotten `break` is one of the oldest bugs in C-style languages, and Java inherited it.",
   "```java\nint day = 2;\nswitch (day) {\n    case 1:\n        System.out.print(\"Mon \");\n    case 2:\n        System.out.print(\"Tue \");\n    case 3:\n        System.out.print(\"Wed \");\n        break;\n    default:\n        System.out.print(\"Other \");\n}\n// prints: Tue Wed\n```",
   "Trace that example the way the exam expects. The selector is 2, so execution enters at `case 2:` and prints `Tue `. There is no `break`, so it falls into the statements under `case 3:` and prints `Wed `. Then it meets `break` and leaves. The `Mon ` line never runs because execution entered below it, and `Other ` never runs because the `break` came first.",
   "The `default` label is the entry point used when no case matches, and it does not have to be written last. This is where many people slip. If `default` sits in the middle of the switch and is selected, fall-through still applies, so the statements under the labels that follow it run as well until a `break` appears. Placement does not change which label is chosen, only what runs after entry. And if the selector matches no case and there is no `default`, a classic switch statement quietly does nothing; unlike a switch expression, it is not required to handle every possible value.",
   "Two runtime details round out the topic. First, a switch on a `String` compares with `equals`, so it is case-sensitive: `\"Yes\"` does not match `case \"yes\":`. Second, if the selector is a reference type, such as a `String`, a wrapper or an enum, and its value is `null`, the switch throws a `NullPointerException` unless the switch has a `case null` label, which is allowed since Java 21. Unboxing an `Integer` selector that is `null` fails the same way. Finally, a `break` inside a switch that is itself inside a loop leaves only the switch, not the loop. To leave the loop as well you need a labeled `break` or a `return`.",
   "A reliable tracing method saves points. Find the entry point first, which is the matching label or, failing that, `default`. Then read downward line by line and write down everything that executes, ignoring the `case` labels you pass, until the first `break`, `return` or the end of the switch. Before tracing at all, scan for compile errors: a `long` selector, a non-constant label, or a duplicate value means the answer is that the code does not compile."
  ],
  "analogy": "A classic switch is like a water slide with several entry platforms at different heights. You climb to the platform whose number matches your ticket and push off. From there you slide past every lower platform without stopping, because platforms are places to get on, not places to get off. Only an exit gate, a break, lets you out early. The analogy stops working for default: in Java the default platform can be built anywhere along the slide, and wherever it is, you still slide down from it.",
  "terms": [
   [
    "Fall-through",
    "In a colon-form switch, execution continuing into the statements of later cases because no break, return or throw stopped it."
   ],
   [
    "case label",
    "A compile-time constant that marks an entry point in a switch; duplicates and non-constant values do not compile."
   ],
   [
    "default label",
    "The entry point used when no case matches; it may appear anywhere in the switch, and fall-through still applies after it."
   ],
   [
    "Selector expression",
    "The value in switch(...) compared with the case labels; in a classic switch it may be char, byte, short, int, their wrappers, String or an enum."
   ],
   [
    "Compile-time constant",
    "A literal, an enum constant, or a final variable initialized with a constant expression, the only things allowed as case labels."
   ]
  ],
  "example": "A menu handler uses a classic switch over the chosen option. A developer adds a new `case 4:` for \"Export\" but forgets the break, so choosing Export also runs the \"Delete\" code under `case 5:`. Switching the code to arrow labels, which never fall through, prevents that class of bug.",
  "mistakes": [
   [
    "Execution stops when it reaches the next case label.",
    "Labels are only entry points. In the colon form, execution keeps running through later cases until break, return, a thrown exception or the end of the switch."
   ],
   [
    "default must be the last label, and it never falls through.",
    "default can appear anywhere. If it is chosen and sits above other cases, their statements run too until a break."
   ],
   [
    "Any variable that never changes can be a case label.",
    "Only compile-time constants work. int v = 3 is not enough; final int v = 3 is."
   ],
   [
    "A long or boolean selector works like an int one.",
    "A classic switch rejects long, float, double and boolean selectors at compile time."
   ]
  ],
  "tryit": [
   [
    "You are reviewing `switch (level) { case 1: msg = \"low\"; case 2: msg = \"mid\"; break; case 3: msg = \"high\"; }`. A tester reports that level 1 always shows \"mid\". Is the tester right, and what is the smallest fix?",
    "The tester is right. Level 1 enters at case 1, assigns \"low\", then falls through into case 2 and overwrites it with \"mid\" before the break. Adding break after msg = \"low\" fixes it, or rewriting the switch with arrow labels removes fall-through entirely."
   ],
   [
    "A teammate wants to switch on an `Order` object's `long` id field to route records to one of three handlers. Will a classic switch accept that selector, and what could the teammate do instead?",
    "No. A classic switch does not accept a long selector. The teammate could use an if-else chain, switch on an int or String derived from the id if that is safe, or switch on a more meaningful field such as an enum status."
   ]
  ],
  "tip": "Find where execution enters the switch, then keep going downward past every label until you hit break or the closing brace. A default in the middle still falls through.",
  "check": [
   [
    "Can a classic switch use a `long` selector?",
    "No. Classic switch supports char, byte, short, int, their wrappers, String and enums, but not long, float, double or boolean."
   ],
   [
    "Does `int v = 3; switch (x) { case v: ... }` compile?",
    "No. A case label must be a compile-time constant, and v is not final. Declaring it final int v = 3 would work."
   ],
   [
    "What prints if `x` is 9 in `switch (x) { default: print(\"D\"); case 1: print(\"1\"); break; case 2: print(\"2\"); }`?",
    "D1. The default is entered, then execution falls through into case 1 until the break."
   ],
   [
    "What happens when a `String` selector is `null` and the switch has no `case null`?",
    "A NullPointerException is thrown at runtime when the switch evaluates the selector."
   ]
  ]
 },
 {
  "t": "Switch expressions with arrow labels, multiple labels and yield",
  "hook": "At Cobalt Rail, Priya maintains the fare calculator. A product manager adds a new ticket class, OVERNIGHT, to the enum and asks for a release this afternoon. Priya runs the build and it fails in three places, each one a switch that maps ticket classes to prices. The manager is annoyed: why would adding one value break code nobody changed? Priya smiles, because the failure is exactly what she wanted. Those switches produce values, and the compiler refuses to let one of them silently return nothing for OVERNIGHT. How did she set that up?",
  "simple": "A switch expression is a switch that hands back an answer, the way a vending machine hands back a snack for the button you press. You can store that answer in a variable right away. The newer arrow style, written with `->`, runs exactly one branch and then stops, so you never fall into the next branch by accident. Because the switch must always give back an answer, Java insists that every possible input has a branch. For something like a number or a word, which could be anything, that means you must include a catch-all branch called default. When a branch needs a few steps before giving its answer, it uses the word yield to hand the answer back.",
  "body": [
   "A switch expression is a `switch` that evaluates to a value. You can assign it to a variable, return it from a method or pass it as an argument, just like any other expression. It is usually written with arrow labels, `case X -> result;`. Arrow labels never fall through: exactly one branch runs, and no `break` is needed or allowed to end it. When the switch expression appears on the right side of an assignment, the whole statement still ends with a semicolon after the closing brace, which is an easy detail to miss when reading exam code.",
   "```java\nint day = 6;\nString type = switch (day) {\n    case 1, 2, 3, 4, 5 -> \"Weekday\";\n    case 6, 7 -> \"Weekend\";\n    default -> throw new IllegalArgumentException(\"bad day\");\n};\n```",
   "The right side of an arrow can take three forms. It can be a single expression, as in `-> \"Weekend\";`. It can be a `throw` statement, which is useful for values that should never occur. Or it can be a block in braces, for when a branch needs more than one statement. A block branch must supply its value with `yield`, as in `case 3 -> { log(\"three\"); yield \"Wed\"; }`. Think of `yield` as the switch-expression counterpart of `return` in a method. Using `return` inside a switch expression is a compile error, because you cannot jump out of the middle of an expression, and `break` cannot be used to leave a switch expression either.",
   "A switch expression must be exhaustive, meaning every possible selector value is handled. The reason is simple: the expression must always produce something to assign. For an `int` or `String` selector the set of possible values is effectively unlimited, so a `default` branch is required. For an enum selector, covering every constant is enough, and `default` becomes optional. Leaving `default` out of an enum switch expression is often the smarter choice, because adding a new constant later makes the build fail at exactly the switches that need a new branch. Every branch must also produce a value compatible with the target type, or throw. If one branch yields a `String` and another an `int`, assigning the result to a `String` variable does not compile.",
   "Multiple labels share a branch when you list them with commas, `case \"a\", \"e\", \"i\" ->`. Each label must still be a compile-time constant, and duplicates are still an error. One switch cannot mix colon labels and arrow labels; you pick one style per switch. You can, however, write a switch expression with the old colon labels. In that case each group must end with `yield` or a `throw`, and fall-through between groups becomes possible again, which is why the arrow form is preferred in practice.",
   "Arrow labels also work in switch statements, the kind that produce no value. A switch statement with arrows behaves like a tidy classic switch without fall-through. Here is the distinction the exam likes to probe: a switch statement with arrows over an `int` does not need to be exhaustive, but a switch expression always does. The same switch body can therefore compile when used as a statement and fail when assigned to a variable, purely because a `default` is missing. A related detail concerns `throw` branches. A branch that throws produces no value, so it does not have to match the target type, and it still counts toward exhaustiveness. That is why `default -> throw new IllegalArgumentException(\"bad day\");` is a common way to satisfy the compiler for values that should never occur, while making a bad input fail loudly instead of returning a misleading result.",
   "```java\nint score = 72;\nchar grade = switch (score / 10) {\n    case 10, 9 -> 'A';\n    case 8 -> 'B';\n    case 7 -> {\n        System.out.println(\"close to B\");\n        yield 'C';\n    }\n    default -> 'F';\n};\nSystem.out.println(grade); // prints close to B, then C\n```",
   "When you meet a switch expression in a question, check four things in order. Is there a `default`, or is the selector an enum or sealed type whose values are all covered? Does every block branch end in `yield` or `throw`? Is there any `return` or `break` trying to leave the expression? Do all branches produce types compatible with the target? Only after those checks pass should you trace the output, and remember that a block branch can print something before it yields, as the grade example shows."
  ],
  "analogy": "A switch expression is like a ticket kiosk at a train station that must print exactly one ticket for every destination typed in. The arrow form prints one ticket and stops, never two. If a destination needs extra steps, the clerk does the paperwork and then hands over the ticket, which is what yield does. The kiosk will not open for business until there is a rule for every possible destination, and for free-text input that means a rule for anything else, the default.",
  "mnemonic": "Check a switch expression with DYRT: Default (or full coverage of an enum or sealed type), Yield in every block branch, no Return or break inside, Types of all branches compatible with the target.",
  "terms": [
   [
    "Switch expression",
    "A switch that evaluates to a value; it must be exhaustive, and with arrow labels it never falls through."
   ],
   [
    "Arrow label",
    "case X -> ..., a label whose right side is a single expression, a block or a throw, with no fall-through."
   ],
   [
    "yield",
    "A statement that supplies the value of a switch expression from inside a block or a colon-style group."
   ],
   [
    "Exhaustiveness",
    "The requirement that a switch expression handles every possible value of its selector."
   ],
   [
    "Multiple labels",
    "Several constants listed with commas in one case, such as case 6, 7 ->, sharing one branch."
   ]
  ],
  "example": "A pricing service maps a subscription tier to a monthly fee with a switch expression over an enum. When the product team adds a new PLATINUM tier, the build fails at that switch because it is no longer exhaustive, so the missing price is noticed before release instead of in production.",
  "mistakes": [
   [
    "A switch expression over an int or String compiles without default as long as the expected values are covered.",
    "The compiler cannot know which ints or Strings will arrive, so default is required for exhaustiveness."
   ],
   [
    "A block branch can use return to hand back its value.",
    "return is a compile error inside a switch expression. A block branch must use yield, or throw."
   ],
   [
    "You can mix case 1: and case 2 -> in one switch if it reads well.",
    "One switch must use only colon labels or only arrow labels."
   ],
   [
    "Arrow labels make any switch exhaustive-checked.",
    "Only switch expressions, and pattern switches, must be exhaustive. A switch statement with arrows over an int may skip values."
   ]
  ],
  "tryit": [
   [
    "You are writing `String label = switch (status) { case 200 -> \"OK\"; case 404 -> \"Not found\"; case 500 -> { log(status); } };` where status is an int. A colleague says it is fine because only those three codes are ever used. List every compile error you can see and how to fix each.",
    "Two problems. The block for 500 does not yield a value, so add yield \"Server error\"; after the log call. And the switch expression over an int is not exhaustive, so add a default branch such as default -> \"Other\"; or default -> throw new IllegalArgumentException();. The colleague's knowledge of real inputs does not satisfy the compiler."
   ]
  ],
  "tip": "In a switch expression, look for three errors: a missing default for int or String selectors, a block branch without yield, and a return or break used to leave the expression.",
  "check": [
   [
    "Does a switch expression over a `String` compile without a `default`?",
    "No. The possible String values are unlimited, so default is needed for exhaustiveness."
   ],
   [
    "How does a block branch of a switch expression return its value?",
    "With a yield statement, for example yield 42;. return is not allowed there."
   ],
   [
    "Can one switch mix `case 1:` and `case 2 ->`?",
    "No. A single switch must use either colon labels or arrow labels, not both."
   ],
   [
    "Does a switch expression over an enum need default if every constant has a case?",
    "No. Covering every constant makes it exhaustive, so default is optional."
   ]
  ]
 },
 {
  "t": "Pattern matching in switch: type patterns, record patterns and when guards",
  "hook": "Marcus on the payments team at Wildflower Outfitters inherits a method called route that is sixty lines of if statements: if the message is an instanceof Login, cast it; else if it is a Payment, cast it, then check the amount; else if it is null, skip it. A new message type is coming next sprint, and every attempt to extend this chain breaks something else. His reviewer suggests replacing all of it with one switch of about ten lines. Marcus is skeptical. How can a switch, which he thought only compared numbers and strings, look inside objects?",
  "simple": "Pattern matching lets a switch ask what kind of thing it has been given, and then hand you that thing already labeled. Imagine sorting a box of mail. Instead of asking whether each item is exactly letter number 7, you ask: is this a parcel? Is it a postcard? If it is a parcel, you can open it and look at the address and weight right away. A type pattern checks the kind of object. A record pattern opens a simple data object and pulls out its parts. A when guard adds an extra condition, such as: is it a parcel heavier than ten kilograms? Java tries the cases from top to bottom and uses the first one that fits.",
  "body": [
   "Pattern matching lets a `switch` test the type and shape of a value instead of only comparing it with constants. The selector can be any reference type, such as `Object` or a sealed interface. Each `case` holds a pattern, and when the pattern matches, the variables it declares are bound and ready to use in that branch. This replaces long chains of `if (o instanceof Foo) { Foo f = (Foo) o; ... }` with a compact, compiler-checked form, and it is the reason the classic restrictions on selector types no longer apply when patterns are used.",
   "The simplest form is the type pattern, a type followed by a variable name: `case String s -> s.length();`. If the selector's runtime object is a `String`, it is bound to `s`, already typed as `String`, so no cast is needed. The pattern variable is in scope only in that case's branch; you cannot use `s` in the next case. A pattern switch can also include `case null ->` to handle a null selector explicitly. Without it, a null selector throws a `NullPointerException`, even if the switch has a `default` label, because `default` does not match null on its own. When you want null and everything else to share a branch, write `case null, default ->`.",
   "A record pattern goes one step further and deconstructs a record into its components. Given `record Point(int x, int y)`, the label `case Point(int x, int y) -> x + y;` matches any `Point` and binds `x` and `y` by calling the record's accessor methods. You may write `var` for a component, as in `case Point(var x, var y)`, and the compiler infers the component's declared type. Patterns can nest, so `case Line(Point(var x1, var y1), Point p2) ->` matches a `Line` whose components are `Point`s and pulls apart the first one. Since Java 22 you can also use the unnamed pattern `_` for a component you do not need, such as `case Point(var x, _)`, which documents that the second value is intentionally ignored.",
   "A guard adds a condition with the contextual keyword `when`: `case Integer i when i > 100 -> \"large\";`. The case matches only if the pattern matches and the guard evaluates to `true`. The guard can use the pattern variables, and it must be a `boolean` expression. If the pattern matches but the guard is `false`, the switch does not stop there; it moves on and tries the next case labels in order. That is what lets you write a special case for large values directly above a general case for the same type.",
   "```java\nsealed interface Shape permits Circle, Square {}\nrecord Circle(double r) implements Shape {}\nrecord Square(double side) implements Shape {}\n\nstatic String describe(Object o) {\n    return switch (o) {\n        case null -> \"nothing\";\n        case Circle(double r) when r > 10 -> \"big circle\";\n        case Circle c -> \"circle \" + c.r();\n        case Square(var s) -> \"square \" + s;\n        case String str -> \"text of length \" + str.length();\n        default -> \"unknown\";\n    };\n}\n```",
   "Trace the example with a few inputs. A `null` argument returns `\"nothing\"` from the first case instead of throwing. A `Circle` with radius 12 matches the record pattern and passes the guard, returning `\"big circle\"`. A `Circle` with radius 3 matches the record pattern but fails the guard, so the switch moves on to `case Circle c` and returns `\"circle 3.0\"`. A `Square` is deconstructed with `var s`, a `String` is bound to `str`, and an `Integer` falls through to `default`.",
   "Order matters because cases are tried from top to bottom and the first matching label wins. A guarded case must come before the unguarded case for the same type; if `case Circle c` appeared first, the guarded case beneath it could never run and the compiler would report that it is dominated. Because the selector here is `Object`, a `default` is needed for exhaustiveness. Note also that a pattern switch statement, not only a pattern switch expression, must be exhaustive, which is different from a classic switch statement. The next lesson covers dominance and exhaustiveness rules in detail.",
   "To build intuition, write a pattern switch over `Object` in a small program, call it with a `String`, an `Integer`, a record and `null`, and print the results. Then deliberately move a guarded case below the unguarded case for the same type and read the compiler's error message. Seeing the dominance error once makes it easy to spot on the exam."
  ],
  "analogy": "A pattern switch works like an airport security line with a series of lanes. Each lane has a sign: oversized bags, liquids over a limit, everything else. You walk past the lanes in order and enter the first one whose sign fits your bag, and an officer immediately opens the bag and takes out the items named on the sign, which is like a record pattern binding components. A when guard is an extra sign condition, such as liquids over a limit. Where it differs: in Java a null bag is turned away with an exception unless there is a lane explicitly for null.",
  "terms": [
   [
    "Type pattern",
    "A pattern like String s that matches when the value is an instance of the type and binds it to a variable of that type."
   ],
   [
    "Record pattern",
    "A pattern like Point(int x, int y) that matches a record and extracts its components through the accessors."
   ],
   [
    "Guard",
    "A when clause after a pattern that adds a boolean condition; if it is false, the switch tries the next case."
   ],
   [
    "case null",
    "A label that lets a pattern switch handle a null selector instead of throwing NullPointerException."
   ],
   [
    "Unnamed pattern",
    "The underscore _ used in a record pattern for a component you do not need, available since Java 22."
   ]
  ],
  "example": "An events system receives messages as a sealed interface with records such as `Login(String user)` and `Payment(String user, long cents)`. A single pattern switch routes each record, with `case Payment(var u, var c) when c > 1_000_000 ->` sending large payments to manual review before the ordinary Payment case.",
  "mistakes": [
   [
    "A default label catches null in a pattern switch.",
    "default does not match null. Without case null (or case null, default), a null selector throws NullPointerException."
   ],
   [
    "If a guard is false, the switch ends without running anything.",
    "A false guard just means that case did not match. The switch continues with the next case labels."
   ],
   [
    "Pattern variables are visible in later cases.",
    "A pattern variable is in scope only in its own case branch."
   ],
   [
    "Putting a general case before a guarded case for the same type is fine because the guard is more specific.",
    "Cases are tried in order. The unguarded case would match first, so the guarded case is dominated and the code does not compile."
   ]
  ],
  "tryit": [
   [
    "A message handler receives `Object msg`. You need to send `Payment` records over a large amount to manual review, other payments to normal processing, log `null` messages, and reject anything else. Sketch the order of case labels you would use and explain the order.",
    "Use case null first (or case null, default at the end), then case Payment(var u, var c) when c > limit, then case Payment p, then default. The guarded payment case must come before the unguarded one so it is not dominated, and default must exist because the selector is Object."
   ]
  ],
  "tip": "Read pattern cases top to bottom and pick the first that matches, checking the guard too. A null selector throws NullPointerException unless there is a case null label.",
  "check": [
   [
    "What does `case Integer i when i > 0 ->` match?",
    "Only Integer values greater than zero; the type must match and the guard must be true."
   ],
   [
    "What happens if a pattern switch receives `null` and has no `case null`?",
    "It throws NullPointerException, even if there is a default label."
   ],
   [
    "What does a record pattern such as `case Point(var x, var y)` do?",
    "It matches a Point and binds x and y to its components, with types inferred from the record's component types."
   ],
   [
    "Is `s` usable in the next case after `case String s -> ...`?",
    "No. A pattern variable is scoped to its own case branch."
   ]
  ]
 },
 {
  "t": "Case dominance and exhaustiveness (enums, sealed types, default)",
  "hook": "Elena is reviewing a pull request at Juniper Insurance late on a Friday. The change adds a tidy pattern switch over claim types, and the author's note says it is ready to merge. The build server disagrees with two red errors: one says a case label is dominated, and the other says the switch does not cover all possible input values. The author insists the logic is correct and the compiler is being fussy. Elena suspects the compiler is protecting them from two very real bugs. Who is right, and how can she tell in under a minute?",
  "simple": "The compiler asks two questions about every pattern switch. First: can every case actually be reached? If an earlier case already catches everything a later case would catch, the later one is dead code, and Java refuses to compile it. That is called dominance. Picture a sorting machine where the first chute says 'all fruit' and the second says 'apples'. No apple ever reaches the second chute. Second: is every possible input handled? If some value could slip through with no matching case, the switch is not exhaustive. That is like a sorting machine with no chute for pears. A sealed type, which lists all its allowed subtypes, or an enum, which lists all its values, lets the compiler see the complete list.",
  "body": [
   "Two compiler checks make pattern-matching switches safe: dominance and exhaustiveness. Dominance makes sure every case can be reached. Exhaustiveness makes sure every possible value is handled. Both are compile-time errors rather than warnings, so exam questions about these rules usually ask a single thing: does this switch compile? Learning to run both checks quickly is more valuable than memorizing every edge case.",
   "A case label is dominated when an earlier label matches every value it would match, which means the later label could never run. Three rules cover most questions. First, a type pattern dominates a later pattern of the same type or of a subtype, so `case CharSequence cs` followed by `case String s` is an error, because every `String` is a `CharSequence`. Second, an unguarded pattern dominates a guarded pattern of the same type, so `case Integer i` followed by `case Integer i when i > 5` is an error. Third, a pattern dominates a later constant label of that type, so `case Integer i` followed by `case 42` is an error. The cure in every case is to order labels from most specific to most general.",
   "Guards deserve a closer look. A guarded pattern does not dominate later patterns, because the compiler does not evaluate guards and cannot know whether the guard will be true. So `case Integer i when i > 5` followed by `case Integer i` is perfectly legal, and it is the normal way to write a special case. Constant labels are treated more strictly: they should come before any pattern of their type, guarded or not. Placing `case 42` after `case Integer i when i > 0` is rejected, so the safe habit is constants first, then guarded patterns, then unguarded ones.",
   "The `default` label also takes part in dominance. In a switch that uses patterns, a pattern label placed after `default` is an error, since `default` would already have matched everything. Putting `default` last avoids the problem entirely. In addition, a switch cannot contain both a `default` and an unconditional pattern, such as `case Object o` when the selector type is `Object`, because both would match every value and one of them would be unreachable. An unconditional pattern is one whose type is the selector's type or a supertype of it.",
   "Exhaustiveness is required for every switch expression and for any switch statement that uses patterns or a `case null` label. There are three ways to satisfy it. For an `enum` selector, listing every constant makes the switch exhaustive. For a sealed type, covering every permitted subtype makes it exhaustive, and no `default` is needed. Otherwise, you add `default` or an unconditional pattern. A classic switch statement over an `int`, `String` or `enum` that uses only constant labels is still allowed to skip values, which keeps decades of existing code compiling.",
   "```java\nsealed interface Vehicle permits Car, Truck {}\nfinal class Car implements Vehicle {}\nfinal class Truck implements Vehicle {}\n\nint wheels(Vehicle v) {\n    return switch (v) {     // exhaustive without default\n        case Car c -> 4;\n        case Truck t -> 6;\n    };\n}\n\n// Does not compile: second case is dominated\n// switch (obj) { case Number n -> 1; case Integer i -> 2; default -> 0; }\n```",
   "In that example the compiler knows from the `permits` clause that a `Vehicle` can only be a `Car` or a `Truck`, both `final`, so two cases cover every possibility. If the interface later permits a `Bus`, the `wheels` method stops compiling until someone adds a case. The commented-out switch fails because `Integer` is a subtype of `Number`, so the `Integer` case can never be reached once `Number` has been tested.",
   "Relying on exhaustiveness instead of `default` is a deliberate design choice. When a new permitted subtype or a new enum constant appears, every switch that lacks `default` becomes a compile error that points to exactly the code that needs updating. A `default` would have silently swallowed the new value. There is also a runtime safety net: if code compiled against the old version of a sealed hierarchy runs against a newer one that adds a subtype it has never seen, the switch throws a `MatchException`. For enum switches, older releases threw `IncompatibleClassChangeError` in the equivalent situation.",
   "When checking an answer under time pressure, ask two questions in order. Can any later case ever be reached, given the cases above it? Is there any value of the selector type that no case handles? A switch must pass both to compile, and the order of specific-to-general labels with `default` last nearly always does."
  ],
  "analogy": "Think of a mail sorting wall with labeled slots checked from left to right. If the first slot says 'any envelope', a later slot labeled 'red envelopes' will never receive anything; the compiler calls that dominance. If the wall has no slot for padded mailers, some mail has nowhere to go; that is a missing case. A sealed type is like a post office that only accepts three printed envelope styles, so three slots really do cover everything. The analogy breaks at guards: a slot with a condition never blocks the slots after it.",
  "mnemonic": "Order pattern cases as C-G-U-D: Constants, Guarded patterns, Unguarded patterns, Default. Within patterns, put subtypes before supertypes.",
  "terms": [
   [
    "Dominance",
    "A case is dominated when an earlier case matches every value it could match, which makes it unreachable and is a compile error."
   ],
   [
    "Exhaustive switch",
    "A switch whose cases cover every possible selector value, required for switch expressions and pattern switches."
   ],
   [
    "Unconditional pattern",
    "A pattern that matches every value of the selector's type, such as case Object o for an Object selector."
   ],
   [
    "Sealed type",
    "A class or interface whose permits clause lists every allowed direct subtype, letting the compiler check exhaustiveness."
   ],
   [
    "MatchException",
    "The runtime exception an exhaustive switch throws if it meets a value its compiled cases do not cover, such as a newly added subtype."
   ]
  ],
  "example": "A tax engine has a sealed interface `Income` with permitted records `Salary`, `Dividend` and `Rent`. Its switch expressions have no default. When the team adds `Royalty` to the permits list, the compiler flags every switch that needs a new case, so no tax rule is silently skipped.",
  "mistakes": [
   [
    "A guarded pattern dominates the unguarded pattern after it.",
    "The reverse is true. The compiler cannot know whether a guard is true, so a guarded case never dominates; an unguarded case dominates a later guarded one."
   ],
   [
    "A switch over a sealed interface always needs default.",
    "If every permitted subtype has a case, the switch is already exhaustive and default is optional."
   ],
   [
    "You can add default as a safety net next to case Object o.",
    "With an Object selector, case Object o is unconditional, so having default as well does not compile."
   ],
   [
    "Every switch statement must now be exhaustive.",
    "Only switch expressions and switch statements that use patterns or case null must be. A classic constant-label switch statement may skip values."
   ]
  ],
  "tryit": [
   [
    "A colleague writes `switch (obj) { case Number n -> \"number\"; case Integer i when i > 0 -> \"positive int\"; default -> \"other\"; }` and says it fails to compile for no reason. Explain the error and give a corrected order.",
    "Integer is a subtype of Number, so case Number n matches every Integer before the guarded Integer case is tried; the guarded case is dominated. Put case Integer i when i > 0 first, then case Number n, then default."
   ],
   [
    "Your team has `enum Size { S, M, L }` and a switch expression with cases for S, M and L and no default. Someone proposes adding default -> 0 \"just in case\". What do you lose by adding it?",
    "You lose the compile-time alarm. Without default, adding XL to the enum makes this switch fail to compile, pointing to the code that needs a new price. With default, XL would silently get 0."
   ]
  ],
  "tip": "Order pattern cases from specific to general: subtypes before supertypes, guarded before unguarded, constants before type patterns, default last.",
  "check": [
   [
    "Why does `case Integer i -> ...; case Integer i when i > 0 -> ...;` fail to compile?",
    "The unguarded Integer pattern matches every value the guarded one would, so the second case is dominated."
   ],
   [
    "Does a switch expression over a sealed interface need `default` if every permitted subtype has a case?",
    "No. Covering every permitted subtype makes it exhaustive."
   ],
   [
    "Does a classic switch statement over an enum with constant labels need to cover every constant?",
    "No. Only switch expressions and pattern switches must be exhaustive."
   ],
   [
    "Can a switch with an Object selector have both `case Object o` and `default`?",
    "No. Both would match every value, so the switch does not compile."
   ]
  ]
 },
 {
  "t": "While, do-while, for and enhanced for loops",
  "hook": "Dev on the support desk at Maple Grove Library gets a strange report: the self-checkout kiosk sometimes skips the welcome prompt entirely and goes straight to an error. He opens the code and finds a while loop that asks for a card number, but only while a variable called valid is false. Someone, it turns out, initialized valid to true as a shortcut. The prompt never ran even once. Dev knows a different kind of loop would have guaranteed at least one prompt. Which one, and how does each loop decide when to check its condition?",
  "simple": "A loop repeats some code. Java has four kinds. A while loop checks first and then acts, like looking in the fridge before deciding to cook; if the fridge is empty, you never cook at all. A do-while loop acts first and then checks, like tasting a soup and then deciding whether to add more salt; you always taste at least once. A for loop is for counting, like doing ten push-ups: it sets up a counter, checks it and updates it each time. An enhanced for loop just visits every item in a list one by one, like reading every name on a guest list, without needing to track a position number.",
  "body": [
   "Java has four loop forms, and the most important difference between them is when the condition is tested. A `while` loop checks its `boolean` condition before each iteration, so if the condition is false at the start, the body runs zero times. A `do-while` loop runs the body first and checks the condition afterwards, so its body always runs at least once. The `do-while` must end with a semicolon after the closing parenthesis, as in `do { ... } while (x < 3);`. Leaving the semicolon out is a compile error that exam questions like to hide in otherwise correct code.",
   "The basic `for` loop packs three parts into its parentheses: initialization, condition and update, as in `for (int i = 0; i < 5; i++)`. The initialization runs exactly once. The condition is checked before every iteration, including the first. The update runs after each iteration, just before the next condition check. All three parts are optional, so `for (;;)` is an infinite loop. The initialization can declare several variables of the same type, `int i = 0, j = 10`, but not variables of different types, so `int i = 0, long j = 0` does not compile. The update can list several expressions separated by commas, `i++, j--`. A variable declared in the initialization exists only inside the loop, so using `i` after the closing brace is a compile error.",
   "The enhanced `for` loop, often called for-each, iterates over an array or any object that implements `Iterable`, such as a `List` or a `Set`: `for (String name : names)`. The loop variable receives a copy of each element in turn. For primitives that means assigning to the loop variable never changes the array; for objects it means you can change the object the variable points to, but reassigning the variable does not replace the element in the collection. The for-each loop does not give you an index, and it cannot iterate a `Map` directly, because `Map` is not `Iterable`. Loop over `map.keySet()`, `map.values()` or `map.entrySet()` instead.",
   "There is one runtime trap with for-each over collections. Structurally modifying the collection you are iterating, for example calling `list.remove(x)` or `list.add(x)` inside a for-each over that same list, usually throws a `ConcurrentModificationException` the next time the hidden iterator advances. If you need to remove elements while looping, use an explicit `Iterator` and its `remove` method, or `removeIf`, which is covered with collections later.",
   "```java\nint i = 10;\nwhile (i < 3) { i++; }        // body never runs\ndo { i++; } while (i < 3);   // runs once: i is 11\n\nfor (int a = 0, b = 5; a < b; a++, b--) {\n    System.out.print(a + \"\" + b + \" \");  // 05 14 23\n}\n\nint[] nums = {1, 2, 3};\nfor (int n : nums) { n *= 10; }\nSystem.out.println(nums[0]);  // 1: the array is unchanged\n```",
   "Walk through that example slowly. The `while` condition `10 < 3` is false at the start, so the body never runs and `i` stays 10. The `do-while` body runs once, making `i` equal to 11, and then `11 < 3` is false. The `for` loop declares two `int` variables, prints each pair, and moves them toward each other until `a < b` fails after three iterations. Finally, multiplying `n` inside the for-each changes only the copy, so `nums[0]` is still 1.",
   "Infinite loops also matter for compilation, not only for runtime. `while (true) { }` with no `break` inside means any statement after the loop can never run, and an unreachable statement is a compile error. The same applies to `for (;;)` and to a `for` loop whose condition is omitted. Add a reachable `break` inside the loop and the code after it becomes reachable again. Note that the compiler only treats the condition as always true when it is a constant expression, such as the literal `true`; a non-final variable holding `true` does not count. The next lessons cover `break`, `continue` and unreachable code in detail.",
   "Choose the loop by intent. Use `while` when you do not know in advance how many iterations you need, such as reading lines until the input ends. Use `do-while` when the body must run at least once, such as showing a menu or prompting for input before checking it. Use the basic `for` loop when you are counting or need an index. Use the enhanced `for` loop when you simply visit every element in order and do not need to modify the collection's structure.",
   "When tracing loops on the exam, build a small table with one row per iteration and one column per variable, and mark the moment the condition is tested. Most wrong answers come from being off by one iteration, from forgetting that the update runs before the condition check, or from forgetting that a do-while always runs once."
  ],
  "analogy": "The four loops are like four ways to handle a stack of mail. A while loop checks whether the tray has anything before opening a letter, so an empty tray means no work. A do-while is a mail carrier who always rings the bell once before checking whether anyone is home. A basic for loop is a numbered list of houses on a route. An enhanced for loop is reading every letter in the tray in order, where you can read and annotate a letter but cannot swap it for another one in the tray.",
  "terms": [
   [
    "while loop",
    "A loop that tests its condition before each iteration, so its body may run zero times."
   ],
   [
    "do-while loop",
    "A loop that runs its body once before testing the condition, so it always executes at least once; it ends with a semicolon."
   ],
   [
    "Enhanced for loop",
    "for (T x : source), which visits each element of an array or Iterable without an index."
   ],
   [
    "Iterable",
    "The interface that lets an object be used as the source of an enhanced for loop; Map does not implement it."
   ],
   [
    "Infinite loop",
    "A loop whose condition never becomes false, such as while(true) or for(;;), usually exited with break or return."
   ]
  ],
  "example": "A command-line tool keeps asking for a password with a do-while loop until the input matches the rules, because it must ask at least once. It then uses an enhanced for loop to print each of the user's saved profiles from a List.",
  "mistakes": [
   [
    "A while loop always runs at least once.",
    "A while loop tests first, so it can run zero times. Only do-while guarantees one run."
   ],
   [
    "A for loop can declare an int and a long in its initialization.",
    "All variables declared in the initialization must share one type."
   ],
   [
    "Changing the loop variable in a for-each over an int array updates the array.",
    "The loop variable is a copy. Use an indexed for loop to change array elements."
   ],
   [
    "You can write for (var e : map) for a Map.",
    "Map is not Iterable. Iterate keySet(), values() or entrySet() instead."
   ]
  ],
  "tryit": [
   [
    "A kiosk must display a menu, read the user's choice and repeat until the user picks 0. A teammate wrote it with a while loop and initialized choice to 0 first, so the menu never appears. Which loop would you use, and why?",
    "A do-while loop. It shows the menu and reads a choice before testing the condition, so the menu always appears at least once and the loop repeats while choice is not 0."
   ]
  ],
  "tip": "Check whether the condition is tested before or after the body: while and for can run zero times, do-while always runs at least once. Also check that do-while ends with a semicolon.",
  "check": [
   [
    "How many times does `int x = 5; do { x++; } while (x < 5);` run its body?",
    "Once. The body runs before the condition is tested, and then 6 < 5 is false."
   ],
   [
    "Does `for (int i = 0, long j = 0; i < 3; i++)` compile?",
    "No. All variables declared in the initialization must share one type."
   ],
   [
    "Does assigning to the loop variable in `for (int n : arr)` change the array?",
    "No. The loop variable holds a copy of each element."
   ],
   [
    "Can you use an enhanced for loop directly on a `HashMap`?",
    "No. Map is not Iterable; loop over keySet(), values() or entrySet()."
   ]
  ]
 },
 {
  "t": "Break and continue, including labeled statements",
  "hook": "At Tidewater Cinemas, Noor is fixing the seat-finder. It scans a grid of rows and seats for the first free seat and is supposed to stop as soon as it finds one. Instead, customers keep getting assigned a seat in the last row. Noor finds a break inside the inner loop over seats, and it does exactly what she wrote: it ends the inner loop. Then the outer loop happily moves on to the next row and keeps searching, overwriting her answer. She needs one statement that stops both loops at once. What does Java give her?",
  "simple": "Sometimes you want to stop a loop early or skip part of it. The word break means stop this loop now and move on to whatever comes after it. The word continue means skip the rest of this round and start the next round. Picture checking every drawer in several cabinets for your keys. break is what you do when you find the keys: stop looking. continue is what you do when a drawer is locked: skip it and try the next drawer. If you have loops inside loops, a plain break only leaves the inner loop. To leave the outer one too, you give the outer loop a name, called a label, and write break with that name.",
  "body": [
   "`break` and `continue` change the normal flow of a loop, and they are often tested together because they look alike but behave very differently. `break` ends the innermost enclosing loop, or `switch`, immediately, and execution continues with the first statement after it. `continue` skips the rest of the current iteration and goes straight to the next one. The loop itself keeps running. The detail many people miss is what \"the next one\" means in each loop form. In a `for` loop, `continue` still runs the update expression, such as `i++`, before testing the condition again. In a `while` or `do-while` loop, `continue` jumps directly to the condition test, so if the code that advances the loop variable sits below the `continue`, it is skipped and you may create an infinite loop.",
   "Without a label, both statements affect only the innermost loop that contains them. That is often not what you want with nested loops, such as scanning a two-dimensional array for the first match. A label is an identifier followed by a colon placed before a statement, for example `outer: for (...)`. Then `break outer;` ends the labeled loop entirely, and any loops inside it, while `continue outer;` abandons the current iteration of the inner loop and moves on to the next iteration of the labeled outer loop, including that outer loop's update step.",
   "```java\nouter:\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        if (j == 2) continue outer;  // skip rest of inner loop\n        if (i == 3) break outer;     // leave both loops\n        System.out.print(i + \"\" + j + \" \");\n    }\n}\n// prints: 11 21\n```",
   "Trace that example carefully, because the order of the checks decides the output. When `i` is 1 and `j` is 1, neither condition is true, so `11` prints. When `j` becomes 2, `continue outer` runs, the inner loop is abandoned, `i++` runs and `i` becomes 2. The same happens for `i = 2`, printing `21`. When `i` is 3 and `j` is 1, the first check fails, the second check `i == 3` is true, and `break outer` ends both loops before anything prints. If the two `if` statements were swapped, the output would be the same here, but in other questions a swap changes everything, so always trace in the written order.",
   "There are firm rules about where these statements may appear. `continue` is allowed only inside a loop; using it in a `switch` or `if` that is not inside any loop is a compile error. A labeled `continue` must name a loop, not just any labeled statement. `break` may appear in a loop or a `switch`, and a labeled `break` can even name a labeled block or `if` statement, although that is rare in real code. Using a label that does not enclose the statement is a compile error, so you cannot `break` to a label on a sibling loop. Finally, any statement directly after a `break` or `continue` in the same block is unreachable and does not compile.",
   "Switches inside loops cause frequent confusion. Inside a `switch` that sits in a loop, an unlabeled `break` exits only the switch, and the loop carries on. An unlabeled `continue` inside that switch, on the other hand, affects the loop, because a switch is not a loop and `continue` looks for the nearest enclosing loop. And `break` cannot be used to leave a switch expression at all: a switch expression must produce a value, so its branches use `yield` instead.",
   "It also helps to compare `break` with `return`, since both can end a loop early. `break` leaves only the loop (or the labeled statement) and the method carries on with the next statement after it. `return` leaves the entire method, no matter how deeply the loops are nested, so no label is needed. In a `do-while` loop, `continue` jumps to the condition at the bottom, which means the body may still stop after the current pass if the condition is now false. When a question mixes these statements, write down after each one exactly which line runs next; that single habit catches most wrong answers.",
   "Labels are legal on any statement, but they only matter for `break` and `continue`. They live in their own namespace, so a label may share a name with a variable without conflict, and by convention they are short descriptive words such as `outer`, `rows` or `search`. Use them sparingly. When you find yourself needing a labeled break, extracting the nested loop into a method and using `return` to exit as soon as you have the answer is often clearer and easier to test."
  ],
  "analogy": "Imagine searching a hotel for a lost phone, floor by floor and room by room. continue is finding a room locked and moving on to the next room on the same floor. continue floors is deciding the rest of this floor is pointless and taking the stairs to the next floor. break leaves the current floor's search only, and you would still go upstairs. break hotel means you found the phone and walk out of the building. The analogy fades with switches: a switch is not a floor, so continue inside one moves to the next room of the surrounding loop.",
  "terms": [
   [
    "break",
    "Ends the innermost enclosing loop or switch, or the labeled statement it names."
   ],
   [
    "continue",
    "Skips the rest of the current iteration of the innermost loop, or of the labeled loop it names; in a for loop the update still runs."
   ],
   [
    "Label",
    "An identifier followed by a colon placed before a statement so that break or continue can target it."
   ],
   [
    "Nested loop",
    "A loop inside another loop; an unlabeled break or continue affects only the inner one."
   ]
  ],
  "example": "A seating app searches a 2D array of seats for the first free one. As soon as it finds one, it uses `break search;` to leave both the row loop and the column loop, instead of setting a flag and checking it in the outer loop.",
  "mistakes": [
   [
    "An unlabeled break inside the inner loop stops all the loops.",
    "It stops only the innermost loop. Use a labeled break, or return from a method, to leave the outer loop."
   ],
   [
    "continue in a for loop skips the update expression.",
    "The update still runs before the condition is tested. In a while loop, continue jumps straight to the condition."
   ],
   [
    "continue can be used in a switch to leave it.",
    "continue is only legal inside a loop; in a switch inside a loop it moves to the loop's next iteration."
   ],
   [
    "A labeled break can jump to any label in the method.",
    "The label must be on a statement that encloses the break; otherwise the code does not compile."
   ]
  ],
  "tryit": [
   [
    "You have `int i = 0; while (i < 5) { if (i == 2) continue; System.out.print(i); i++; }`. A tester says the program hangs. Why, and how would you fix it?",
    "When i is 2, continue jumps to the condition without reaching i++, so i stays 2 forever. Move i++ above the continue check, or rewrite it as a for loop where the update always runs."
   ],
   [
    "You need to find the first negative number in a two-dimensional array and stop searching immediately. What are two clean ways to stop both loops?",
    "Label the outer loop and use break with that label when you find the number, or put the nested loops in a method and return the result as soon as it is found."
   ]
  ],
  "tip": "Ask which loop each break or continue refers to. With no label it is always the innermost loop; with a label it is the loop that carries that label. Remember that continue in a for loop still runs the update.",
  "check": [
   [
    "What does `continue outer;` do when it runs inside an inner loop?",
    "It abandons the rest of the inner loop and starts the next iteration of the loop labeled outer, including its update step."
   ],
   [
    "Can `continue` be used inside a switch that is not inside any loop?",
    "No. continue must be inside a loop, so that is a compile error."
   ],
   [
    "In a switch inside a for loop, what does an unlabeled `break` in a case do?",
    "It exits the switch only; the loop keeps running."
   ]
  ]
 },
 {
  "t": "Unreachable code and definite assignment compile errors",
  "hook": "It is the night before a release at Blue Heron Logistics, and Sam just added one debugging line at the top of a method: return;. The intention was to skip some slow logic temporarily. Instead, the build fails with \"unreachable statement\". A moment later a different file fails with \"variable total might not have been initialized\", even though Sam can see a line that clearly sets it inside a loop. The build server is not running anything yet, so how can the compiler already be sure these lines are wrong?",
  "simple": "Before your program ever runs, the Java compiler reads through each method like a careful proofreader and checks two things. First, is there any line that could never run? For example, a line right after return can never be reached, because return leaves the method. Java treats that as a mistake, not a warning. Second, could you ever read a local variable before giving it a value? If a variable gets a value only inside an if with no else, or only inside a loop that might not run at all, the compiler cannot be sure it has a value, so it refuses to compile. It is like a recipe that says 'add the sauce' when only one of the earlier steps might have made any sauce.",
  "body": [
   "The Java compiler performs flow analysis on every method body, tracing the possible paths that control can take. Two of its checks produce errors that the exam loves to hide in questions that look like they are about output: statements that can never run, called unreachable code, and local variables that might be read before they have a value, which breaks the definite assignment rule. Both are compile-time errors, not warnings. So before you trace any output, scan the code for these problems, because \"does not compile\" may be the right answer.",
   "A statement is unreachable if the compiler can prove that control never gets there. The common cases are a statement directly after `return`, `throw`, `break` or `continue` in the same block; code after an infinite loop such as `while (true)` or `for (;;)` that contains no `break` able to exit it; and the body of `while (false)`. The analysis is purely static and uses only constant expressions. `while (true)` is known to loop forever, but `boolean t = true; while (t)` is not, because `t` is an ordinary variable whose value the compiler does not track. If you declare it `final boolean t = true;`, it becomes a constant variable and the loop is again treated as infinite.",
   "The `if` statement is a deliberate exception to these rules. `if (false) { ... }` compiles, so that developers can switch blocks of code on and off with a constant debug flag. As a result, `while (false) { x++; }` is an error but `if (false) { x++; }` is fine, a contrast the exam returns to often. The exemption covers only the condition, though. If both the `if` branch and the `else` branch end with `return` or `throw`, the whole `if-else` statement cannot complete normally, and a statement placed after it is unreachable and does not compile.",
   "```java\nint f() {\n    return 1;\n    // System.out.println(\"hi\");  // unreachable: does not compile\n}\n\nvoid g() {\n    while (true) { }\n    // System.out.println(\"done\"); // unreachable\n}\n\nvoid h() {\n    for (int i = 0; ; i++) {\n        if (i > 3) break;\n    }\n    System.out.println(\"ok\");     // reachable because of break\n}\n```",
   "Definite assignment is the second check. The compiler must be able to prove that a local variable has been assigned before it is read, along every possible path through the code. Fields and array elements receive default values such as 0, `false` or `null`, but local variables receive nothing, so reading one too early is a compile error with the message that the variable might not have been initialized. If a variable is assigned only in some branches of an `if` with no `else`, or only inside a loop body that might run zero times, reading it afterwards fails. Assigning it in both the `if` and the `else` branch, or in every branch of an exhaustive switch, satisfies the rule.",
   "```java\nint x;\nif (Math.random() > 0.5) x = 1;\n// System.out.println(x);   // does not compile: x might not be initialized\n\nint y;\nif (Math.random() > 0.5) y = 1; else y = 2;\nSystem.out.println(y);      // OK\n```",
   "The analysis is conservative in a specific way. The compiler does not evaluate `Math.random()` or any other non-constant condition, so it assumes either branch may run. For a basic `for` loop with a non-constant condition, it assumes the body might run zero times, even when you can see that `i < 3` starts true. That is why assigning a variable only inside such a loop and printing it afterwards does not compile. Conversely, a `while (true)` loop that assigns a variable before its only `break` does make the variable definitely assigned after the loop.",
   "The same analysis governs `final` locals and return statements. A `final` local may be declared without a value and assigned later, but it must be assigned exactly once on every path; assigning it in both branches of an `if-else` is fine, assigning it twice in a row or inside a loop is an error. A method with a non-void return type must return a value on every path or end in a `throw`; if the compiler finds a path that reaches the closing brace, it reports a missing return statement. An `if` without an `else` that returns, followed by nothing, is the classic way to trigger it."
  ],
  "analogy": "The compiler behaves like a building inspector reading blueprints, not watching people walk through the building. If a room has no door from any hallway, the inspector rejects it as unreachable, without waiting to see whether anyone gets there. If a room's lights only get wired on one of two possible routes, the inspector refuses to sign off, even if you promise everyone takes the wired route. The odd exception is the if statement: the inspector allows a room behind a door marked 'closed for now', the if (false) block.",
  "terms": [
   [
    "Unreachable statement",
    "A statement the compiler can prove will never execute, which is a compile-time error in Java."
   ],
   [
    "Definite assignment",
    "The compiler rule that a local variable must be assigned on every path before it is read."
   ],
   [
    "Constant expression",
    "An expression the compiler can evaluate, such as true or a final variable holding a literal, used in reachability analysis."
   ],
   [
    "Missing return statement",
    "The error reported when a non-void method can reach its end without returning a value."
   ],
   [
    "Constant variable",
    "A final variable of primitive or String type initialized with a constant expression, which the compiler can treat as a constant."
   ]
  ],
  "example": "A developer temporarily adds `return;` at the top of a method to skip some logic while debugging, and the build breaks with \"unreachable statement\". Changing it to `if (true) return;` compiles, because if statements are exempt from the unreachable-code rule.",
  "mistakes": [
   [
    "if (false) { ... } and while (false) { ... } are both compile errors.",
    "Only while (false) is. The if statement is exempt so that constant flags can switch code on and off."
   ],
   [
    "A local variable defaults to 0 like a field does.",
    "Locals have no default value. Reading one before it is definitely assigned is a compile error."
   ],
   [
    "Assigning a variable inside a for loop that obviously runs is enough.",
    "The compiler assumes a loop with a non-constant condition might run zero times, so the variable is not definitely assigned afterwards."
   ],
   [
    "boolean flag = true; while (flag) { } makes later code unreachable.",
    "flag is not a constant, so the compiler does not treat the loop as infinite. Declaring it final would."
   ]
  ],
  "tryit": [
   [
    "A method reads `int result; if (amount > 0) { result = 1; } else if (amount < 0) { result = -1; } return result;`. A reviewer says it will not compile, but you argue that amount is either positive or negative. Who is right, and what is the simplest fix?",
    "The reviewer is right. There is no final else, so when amount is 0 no branch assigns result, and the compiler sees a path where result is read unassigned. Change the else if to else, add a final else result = 0;, or initialize result when it is declared."
   ]
  ],
  "tip": "Treat if(false) and while(false) differently: the first compiles, the second does not. For locals, trace every path, including a loop that runs zero times and an if without else.",
  "check": [
   [
    "Does `while (false) { System.out.println(1); }` compile?",
    "No. The body is unreachable because the condition is the constant false."
   ],
   [
    "Does `int x; for (int i = 0; i < 3; i++) x = i; System.out.println(x);` compile?",
    "No. The compiler cannot prove the loop body runs, so x is not definitely assigned."
   ],
   [
    "Is code after `while (true) { if (done()) break; }` reachable?",
    "Yes. The break makes it possible for control to leave the loop."
   ],
   [
    "Does `final boolean on = true; while (on) { } System.out.println(1);` compile?",
    "No. on is a constant variable, so the loop is treated as infinite and the print is unreachable."
   ]
  ]
 },
 {
  "t": "Classes, fields, methods, constructors, initializer blocks and initialization order",
  "hook": "Rosa at Kestrel Analytics adds a constructor that takes a report title to the Report class, ships it, and within minutes three other teams report that their code no longer compiles. They all call new Report() with no arguments, and Rosa never deleted any constructor. Meanwhile, a teammate is puzzled that a log line in a static block appears only once, no matter how many reports are created. Both puzzles come from the same set of rules about how Java builds a class and its objects. What are those rules, and in what order do they run?",
  "simple": "A class is a blueprint, like the plans for a house. Fields are the facts each house remembers, such as its color. Methods are things the house can do. A constructor is the builder who sets up each new house when you order one with new. If you never write a builder, Java quietly supplies a basic one, but the moment you write your own, that free one disappears. A static block is setup that happens once for the whole housing estate, the first time anyone uses the plans. An instance block is setup done for every single house. When a house is built from a parent design, the parent's part is always finished first.",
  "body": [
   "A class is a blueprint that declares three main kinds of members: fields, which hold state; methods, which define behavior; and constructors, which set up new objects. An instance field belongs to each object, so two objects can hold different values. A `static` field belongs to the class itself and is shared by all instances. A single source file can contain several top-level classes, but at most one of them may be `public`, and that public class must have the same name as the file, so `public class Invoice` lives in `Invoice.java`.",
   "A constructor has the same name as its class and no return type at all, not even `void`. If you write `void MyClass()`, you have written an ordinary method that happens to share the class name, and the exam uses this trick regularly. If a class declares no constructor, the compiler adds a no-argument default constructor with the same access as the class. As soon as you declare any constructor, that default disappears. So if you declare only `MyClass(int x)`, the call `new MyClass()` stops compiling. That is exactly what happens when a new constructor is added to a class that other code was creating with no arguments.",
   "Every constructor body begins, explicitly or implicitly, with a call to another constructor: `super(...)` for the parent class or `this(...)` for another constructor in the same class. If you write neither, the compiler inserts `super()`. That inserted call fails to compile if the parent class has no accessible no-argument constructor, which is a common exam scenario: the parent declares only `Parent(String name)` and the child's constructor says nothing, so the hidden `super()` has nothing to call. The fix is to call `super(\"something\")` explicitly. Java 25 relaxes where this call may appear, which the next lesson covers.",
   "Initializer blocks are blocks of code written directly in the class body. A `static { ... }` block runs once, when the class is initialized. Initialization happens the first time the class is actively used, for example when an instance is created, a static method is called, or a non-constant static field is read. An instance initializer, a plain `{ ... }` block, runs every time an object is created. Field initializers such as `int count = 5;` or `static List<String> names = new ArrayList<>();` behave like initializer blocks of the same kind, and all of them run in the order they appear in the source file. A static block that refers to a static field declared below it can assign it but cannot read it by its simple name, another sign that textual order matters.",
   "The full order when you create the first object of a subclass has two phases. In the static phase, which happens only once per class, the superclass's static field initializers and static blocks run in textual order, and then the subclass's. In the instance phase, which happens for every new object, the superclass part of the object is built completely first: its instance field initializers and instance blocks run in order, then its constructor body. Then the subclass's instance initializers and blocks run in order, and finally the rest of the subclass constructor body. When a constructor delegates with `this(...)`, instance initializers still run only once per object, as part of the constructor that eventually calls `super`.",
   "```java\nclass A {\n    static { System.out.print(\"A-static \"); }\n    { System.out.print(\"A-init \"); }\n    A() { System.out.print(\"A() \"); }\n}\nclass B extends A {\n    static { System.out.print(\"B-static \"); }\n    { System.out.print(\"B-init \"); }\n    B() { System.out.print(\"B() \"); }\n}\n// new B(); new B(); prints:\n// A-static B-static A-init A() B-init B() A-init A() B-init B()\n```",
   "Read that output against the two-phase model. The first `new B()` triggers class initialization for `A` and then `B`, printing the two static lines. Then the object is built parent first: `A-init` and `A()`, followed by `B-init` and `B()`. The second `new B()` skips the static phase entirely, because both classes are already initialized, and repeats only the four instance steps.",
   "Methods round out the class. A method declaration includes optional access and other modifiers, a return type or `void`, a name, a parameter list and an optional `throws` clause. Java always passes arguments by value: a primitive argument is copied, and for an object the reference is copied. As a result a method can change the state of the object a parameter points to, and the caller will see that change, but assigning a new object to the parameter inside the method does not affect the caller's variable. Static methods cannot use `this` or access instance members directly, because no current object exists in a static context. When you trace initialization questions, write the output in the two phases: static once per class, parent first; then per object, parent first, initializers before the constructor body."
  ],
  "analogy": "Building an object is like opening a new branch of a franchise. The franchise headquarters is set up once, before the first branch opens, which is the static phase, and the parent company's headquarters is set up before the regional office's. For every new branch, the standard parent fit-out happens first, shelves and signs, then the parent's opening checklist, and only then the regional additions and the local manager's own steps. The analogy does not cover pass-by-value: that is about methods, not construction.",
  "mnemonic": "Initialization order: SS-IC-IC. Static parent, Static child (once); then for each object, parent Initializers and Constructor, then child Initializers and Constructor.",
  "terms": [
   [
    "Default constructor",
    "The no-argument constructor the compiler adds only when a class declares no constructors."
   ],
   [
    "Static initializer",
    "A static { } block that runs once when the class is initialized."
   ],
   [
    "Instance initializer",
    "A { } block in the class body that runs for every new object, before the constructor body but after the superclass constructor."
   ],
   [
    "Pass by value",
    "Java copies each argument into the parameter; for objects, the copied value is the reference."
   ],
   [
    "Class initialization",
    "The one-time step, on first active use of a class, that runs its static field initializers and static blocks in textual order."
   ]
  ],
  "example": "A configuration class loads default settings in a static block, so the file is read once when the class is first used, not every time a settings object is created. Each object then copies those defaults in an instance initializer, so every constructor gets them without duplicated code.",
  "mistakes": [
   [
    "Adding a new constructor keeps the default no-argument constructor available.",
    "Declaring any constructor removes the compiler's default one. Declare a no-argument constructor explicitly if callers still need it."
   ],
   [
    "A method named like the class with a void return type is a constructor.",
    "Constructors have no return type. With void it is an ordinary method."
   ],
   [
    "Static blocks run each time an object is created.",
    "Static blocks run once per class, when it is initialized. Instance blocks run per object."
   ],
   [
    "The subclass's instance initializers run before the superclass constructor.",
    "The superclass part is built completely first, including its constructor body; then the subclass initializers run."
   ]
  ],
  "tryit": [
   [
    "`class Parent { Parent(String n) { } }` and `class Child extends Parent { Child() { System.out.println(\"hi\"); } }`. A teammate says Child compiles because it has its own constructor. Are they right, and what would you change?",
    "No. Child's constructor has an implicit super() call, and Parent has no no-argument constructor, so it does not compile. Add super(\"some name\"); as the explicit call, or give Parent a no-argument constructor."
   ],
   [
    "A class has `static { print(\"S\"); }`, `{ print(\"I\"); }` and a constructor printing `C`. What prints for `new X(); new X();`, and why?",
    "SICIC. The static block runs once when the class is initialized; then for each object the instance initializer runs before the constructor body."
   ]
  ],
  "tip": "Statics run once, parent before child. For each new object: parent's initializers and constructor body, then child's initializers, then child's constructor body. Initializers run in source order.",
  "check": [
   [
    "If a class declares only `Car(String model)`, does `new Car()` compile?",
    "No. Declaring any constructor stops the compiler from adding the default no-argument constructor."
   ],
   [
    "When does a static initializer block run?",
    "Once, when the class is initialized on first active use, before any instance of it is created."
   ],
   [
    "Is `public void Dog() { }` a constructor?",
    "No. It has a return type, so it is an ordinary method that happens to share the class's name."
   ],
   [
    "Can a method change the caller's variable by assigning a new object to its parameter?",
    "No. Java passes a copy of the reference, so reassigning the parameter affects only the method's copy."
   ]
  ]
 },
 {
  "t": "Flexible constructor bodies (Java 25): statements before super(...) or this(...)",
  "hook": "Omar at Silverline Bank is reviewing a SavingsAccount subclass. Its constructor has to reject negative balances, but before Java 25 the call to super(cents) had to come first, so the parent constructor did a round of logging and setup on bad data before the check ever ran. The workaround was an awkward static helper buried in the argument list. Now the team is on Java 25, and a junior developer has simply moved the check above super(cents). The reviewer next to Omar frowns and says that will never compile. Will it?",
  "simple": "When you build an object from a child class, Java first has the parent part built by calling super(...). For many years, that call had to be the very first line of a constructor, so you could not even check your inputs before it. Java 25 changes that. You may now write some code before super(...), such as checking that a number is not negative and throwing an error if it is. The catch is that the object is not ready yet during that early part, a bit like a house before the foundation is poured. You can measure, plan and reject bad orders, but you cannot use the rooms. So in that early part you cannot read the object's fields or call its regular methods.",
  "body": [
   "Before Java 25, the call to `super(...)` or `this(...)` had to be the very first statement in a constructor. That rule made it awkward to validate or prepare arguments before handing them to the parent constructor. Developers resorted to static helper methods called inside the argument list, such as `super(checkPositive(cents))`, or to complicated expressions that were hard to read. Flexible constructor bodies, finalized in Java 25, relax the rule: you may now write statements before the explicit constructor call.",
   "With this feature the constructor body is split into two parts. The statements before `super(...)` or `this(...)` form the prologue, and the statements after it form the epilogue. Several things have not changed. The explicit constructor call still has to be a top-level statement of the constructor body; it cannot be placed inside an `if`, a loop or a `try` block. A constructor still calls `super` or `this` at most once. And if there is no explicit call at all, the compiler still inserts `super()` at the start, exactly as before, so existing code behaves the same. The same prologue rules apply when the explicit call is `this(...)`, which lets a constructor normalize or validate arguments before delegating to another constructor in the same class, for example trimming a `String` or replacing a `null` with a default value. Static helper methods inside the argument list still compile, so older code does not need to change, but a short prologue is usually easier to read.",
   "The prologue runs in what the language calls an early construction context, before the superclass has initialized the object. Because the object is not ready, the prologue may not use it. You cannot read its fields, call its instance methods, use `this` explicitly except as the target of a field assignment, use `super.something` to reach a parent member, or create an instance of an inner class that would capture `this`. The arguments of the `super(...)` or `this(...)` call are part of the same early context and face the same restrictions.",
   "What you may do in the prologue is broad enough to be useful. You can work with the constructor's parameters and local variables, call static methods, compute values, throw exceptions, and assign values to fields declared in this class that have no initializer. Field assignment is allowed but reading the field back is not. A `return` statement is not allowed in the prologue, though it remains legal in the epilogue, where the object can be used normally.",
   "```java\nclass Account {\n    Account(long cents) { /* ... */ }\n}\n\nclass SavingsAccount extends Account {\n    private final double rate;\n\n    SavingsAccount(long cents, double rate) {\n        if (cents < 0) {                       // prologue: validate first\n            throw new IllegalArgumentException(\"negative\");\n        }\n        this.rate = rate;                      // allowed: assign own field\n        super(cents);                          // explicit constructor call\n        System.out.println(\"created\");        // epilogue: may use this\n    }\n}\n```",
   "In that example the prologue validates `cents` and throws before the parent constructor does any work, so invalid input fails fast. It also assigns `this.rate`, which is allowed because it is an assignment to this class's own field and that field has no initializer. After `super(cents)` returns, the epilogue may use `this` freely, call methods and read fields.",
   "Assigning fields in the prologue solves a long-standing problem with overridden methods. If a superclass constructor calls a method that a subclass overrides, that method used to run before the subclass fields were set, so it saw their default values, such as `null` or 0, which led to subtle bugs. When the subclass assigns those fields in its prologue, before calling `super(...)`, the overridden method sees the real values instead.",
   "The initialization order from the previous lesson changes only slightly. For a constructor with a prologue, the prologue runs first; then the superclass is constructed; then this class's instance initializers and field initializers run in textual order; then the epilogue. Exam questions on this topic usually show a prologue and ask whether it compiles. Check for any read of an instance field, any instance method call, any `super.` access, a `return`, an inner class instance creation, or a `super(...)` call nested inside another statement. Each of those is a compile error, while validation, static calls, local variables and plain field assignments are fine."
  ],
  "analogy": "Think of the prologue as the time before a new employee's first day. HR can check the paperwork, reject an incomplete application and fill in the employee's start date on a form, which is like validating arguments and assigning fields. But nobody can ask the new hire to do any work or look up what is on their desk yet, because they have not been onboarded by headquarters, the superclass. After onboarding, the epilogue, everything is normal. Where it differs: in Java you may write to a field early but not read it back.",
  "terms": [
   [
    "Prologue",
    "The statements in a constructor before the explicit super(...) or this(...) call, which cannot use the object being constructed."
   ],
   [
    "Epilogue",
    "The statements after the explicit constructor call, where the object can be used normally."
   ],
   [
    "Early construction context",
    "The prologue and constructor-call arguments, where references to the current instance are restricted."
   ],
   [
    "Explicit constructor invocation",
    "A super(...) or this(...) statement that chains to another constructor; it must be a top-level statement and appear at most once."
   ],
   [
    "Flexible constructor bodies",
    "The Java 25 feature that allows statements before an explicit super(...) or this(...) call."
   ]
  ],
  "example": "A `Temperature` class extends a `Measurement` base class whose constructor logs the value. The subclass now checks in its prologue that the value is above absolute zero and throws IllegalArgumentException if not, so an invalid object never reaches the parent constructor or the log.",
  "mistakes": [
   [
    "Java 25 lets super(...) appear anywhere, including inside an if or try.",
    "The explicit call must still be a top-level statement of the constructor body, and at most one is allowed."
   ],
   [
    "Anything can go in the prologue now.",
    "The prologue cannot read fields, call instance methods, use super.member, create inner class instances that capture this, or return."
   ],
   [
    "Assigning this.field in the prologue is illegal because it uses this.",
    "Assigning a field of this class that has no initializer is allowed; reading it is not."
   ],
   [
    "Constructors without an explicit call now behave differently.",
    "If there is no explicit call, the compiler still inserts super() first, as before."
   ]
  ],
  "tryit": [
   [
    "A colleague writes `Temperature(double k) { if (k < 0) throw new IllegalArgumentException(); log(\"checked\"); super(k); }` where log is an instance method of Temperature. Does it compile under Java 25, and what would you change?",
    "No. The throw is allowed, but calling the instance method log in the prologue uses the object before it is initialized. Make log static, or move the log call into the epilogue after super(k)."
   ],
   [
    "A child constructor needs to pick between two parent constructors depending on an argument: `if (flag) super(1); else super(2);`. Does Java 25 allow this, and what is an alternative?",
    "No. super(...) must be a top-level statement, not inside an if. Compute the argument in the prologue, such as int v = flag ? 1 : 2; super(v);, which is allowed."
   ]
  ],
  "tip": "In a prologue, allowed means parameters, locals, static calls, throwing and assigning this class's fields. Not allowed means reading fields, calling instance methods, super.x, return, or putting super(...) inside a block.",
  "check": [
   [
    "Can a Java 25 constructor call a static helper method before `super(...)`?",
    "Yes. Static methods do not need the instance, so they are allowed in the prologue."
   ],
   [
    "Does `Child(int x) { System.out.println(this.name); super(); }` compile?",
    "No. Reading an instance field in the prologue uses the object before it is initialized."
   ],
   [
    "Can `super(...)` appear inside an `if` block in a constructor?",
    "No. The explicit constructor call must be a top-level statement of the constructor body."
   ],
   [
    "May the prologue contain a `return` statement?",
    "No. return is not allowed before the explicit constructor call, though it is allowed in the epilogue."
   ]
  ]
 },
 {
  "t": "Inheritance, overriding vs overloading vs hiding, polymorphism and casting",
  "hook": "Jordan at Pinecrest Health is debugging a report generator. A variable declared as Animal points to a Dog object. Calling sound() prints Woof, as expected. But reading the name field prints animal, and calling the static method kind() prints Animal too. Jordan's teammate is convinced the Java runtime is broken. Same reference, same object, three different answers. Jordan suspects the difference lies in which members are chosen by the object and which by the variable's declared type. Which is which, and why does Java draw the line there?",
  "simple": "Inheritance lets one class build on another, like a new car model based on an older one. Overriding is when the new model replaces a feature with its own version: same button, new behavior. Overloading is having several buttons with the same name that take different inputs, like a 'play' button for a song and a 'play' button for a playlist. Hiding is a lookalike that applies to static methods and fields, which are chosen by the label on the box, not by what is inside. Polymorphism means you can hold any kind of animal in a box labeled Animal, and when you ask it to make a sound, the real animal inside answers. Casting changes the label on the box, not the animal.",
  "body": [
   "A class inherits from exactly one direct superclass using `extends`, because Java has single inheritance of classes, and every class ultimately extends `Object`. The subclass inherits the accessible members of its parent and can add new members or replace inherited behavior. Two points are frequently tested: private members are not inherited in the sense of being accessible from the subclass, and constructors are never inherited at all, which is why a subclass must chain to a parent constructor with `super(...)`.",
   "Overriding happens when a subclass declares an instance method with the same name and the same parameter types as an inherited instance method. The compiler enforces several rules. The return type must be the same or a subtype, which is called a covariant return. The access level cannot be more restrictive, so a `public` method cannot be overridden as `protected`. The overriding method cannot declare new or broader checked exceptions, although it may declare fewer, narrower or only unchecked ones. A `final` method cannot be overridden. The `@Override` annotation asks the compiler to confirm that you really are overriding something, which catches typos such as `tostring()` instead of `toString()`.",
   "Overloading is a different mechanism. Overloaded methods live in the same class, or are inherited, and share a name but have different parameter lists, differing in number, type or order of parameters. Return type and exceptions alone do not distinguish overloads, so two methods that differ only in return type do not compile. The compiler chooses the overload at compile time from the static types of the arguments, preferring an exact match, then a widening primitive conversion, then boxing or unboxing, and finally varargs. Because the choice is made at compile time, it depends on the declared types of the arguments, not on the runtime objects.",
   "Hiding applies to static methods and to fields. A static method in a subclass with the same signature as a static method in the parent hides it rather than overriding it, and the version that runs depends on the reference type known at compile time, not on the object. A static method cannot hide an instance method, and an instance method cannot override a static method; either combination is a compile error. Fields are also hidden and never overridden. If both classes declare a field called `name`, then `parentRef.name` reads the parent's field even when the object is a subclass instance.",
   "Polymorphism ties these ideas together. A reference of a supertype can point to an object of any subtype, and calls to overridden instance methods are resolved at runtime using the actual object, a process often called dynamic dispatch. The reference type decides which methods you are allowed to call, because the compiler checks that the method exists on the declared type. The object type decides which implementation runs. Fields and static methods do not take part in dynamic dispatch.",
   "```java\nclass Animal {\n    String name = \"animal\";\n    static String kind() { return \"Animal\"; }\n    String sound() { return \"...\"; }\n}\nclass Dog extends Animal {\n    String name = \"dog\";\n    static String kind() { return \"Dog\"; }\n    @Override String sound() { return \"Woof\"; }\n}\nAnimal a = new Dog();\nSystem.out.println(a.sound()); // Woof   (overridden: object type)\nSystem.out.println(a.name);    // animal (field: reference type)\nSystem.out.println(a.kind());  // Animal (static: reference type)\n```",
   "Casting reference types changes the type of the reference, never the object. Upcasting, from a subtype to a supertype, is automatic and always safe. Downcasting, from a supertype to a subtype, needs an explicit cast such as `Dog d = (Dog) a;`. If the object is not actually a `Dog` or a subtype of it, a `ClassCastException` is thrown at runtime. If the two types cannot possibly be related, such as casting a `String` to an `Integer`, the compiler rejects the cast outright, because no object could ever satisfy both. When you are not sure of the runtime type, test it first with `instanceof`, ideally with a pattern such as `if (a instanceof Dog d)`, which casts and binds in one step.",
   "For exam questions, sort every member access into one of two buckets. Overridden instance methods follow the object at runtime. Fields, static methods and the choice among overloads follow the declared type at compile time. Then check compile-time legality: does the method exist on the reference type, do the override rules hold, and is the cast between possibly related types?"
  ],
  "analogy": "Picture a universal remote labeled TV pointed at a brand-new smart TV. The buttons on the remote are the reference type: you can only press buttons the TV label offers, even if the smart TV has extra features. When you press power, the actual set decides how to turn on, which is overriding. But a sticker on the remote, such as its brand name, is read off the remote itself, like a field or static method. Swapping to a smart-TV remote is a downcast; aim it at a toaster and it fails at runtime.",
  "mnemonic": "Instance methods follow the Object; fields, statics and overload choice follow the Reference. Short form: methods O, the rest R.",
  "terms": [
   [
    "Overriding",
    "Redefining an inherited instance method with the same signature; the object's runtime type decides which version runs."
   ],
   [
    "Overloading",
    "Declaring methods with the same name but different parameter lists; the compiler picks one from argument types."
   ],
   [
    "Hiding",
    "Declaring a static method or a field with the same name as one in the parent; the reference type decides which is used."
   ],
   [
    "Covariant return type",
    "An overriding method's return type that is a subtype of the overridden method's return type."
   ],
   [
    "ClassCastException",
    "The runtime exception thrown when a downcast is applied to an object that is not an instance of the target type."
   ]
  ],
  "example": "A drawing program keeps a `List<Shape>` holding circles, squares and triangles. Calling `shape.area()` on each element runs the right formula for each object because `area` is overridden, while the list code never needs to know the concrete classes.",
  "mistakes": [
   [
    "A field in a subclass with the same name overrides the parent's field.",
    "Fields are hidden, never overridden. The reference type decides which field is read."
   ],
   [
    "An overriding method can throw any new checked exception it needs.",
    "It cannot add new or broader checked exceptions; it may throw fewer, narrower or unchecked ones."
   ],
   [
    "Two methods that differ only in return type are valid overloads.",
    "Overloads must differ in parameter lists; a different return type alone does not compile."
   ],
   [
    "Casting a reference converts the object to the new type.",
    "A cast changes only the reference type. If the object is not really that type, ClassCastException is thrown."
   ]
  ],
  "tryit": [
   [
    "`Animal a = new Cat();` and Cat defines a new method `purr()` that Animal lacks. A teammate writes `a.purr();`. Does it compile, and how would you call purr safely?",
    "It does not compile, because the reference type Animal has no purr method. Test and cast first, for example if (a instanceof Cat c) { c.purr(); }."
   ],
   [
    "A parent declares `public Number total() throws IOException`. Which override is legal: `public Integer total()` or `protected Number total() throws Exception`?",
    "public Integer total() is legal: Integer is a covariant return type, access is not narrower, and declaring no exception is fine. The second narrows access and broadens the checked exception, so it does not compile."
   ]
  ],
  "tip": "Instance methods follow the object; fields and static methods follow the reference type. For overriding, check signature, covariant return, access not narrower, and no new broader checked exceptions.",
  "check": [
   [
    "Can a subclass override `public void run()` with `protected void run()`?",
    "No. An overriding method cannot have more restrictive access."
   ],
   [
    "What happens at runtime with `Object o = \"hi\"; Integer i = (Integer) o;`?",
    "It compiles, because Object might be an Integer, but throws ClassCastException because the object is a String."
   ],
   [
    "Do `int calc()` and `long calc()` in the same class compile as overloads?",
    "No. Overloads must differ in parameter lists; a different return type alone is not enough."
   ],
   [
    "With `Animal a = new Dog();`, which `name` does `a.name` read if both classes declare a name field?",
    "Animal's field, because fields are chosen by the reference type."
   ]
  ]
 },
 {
  "t": "Abstract classes and interfaces: default, static and private interface methods",
  "hook": "The platform team at Saltmarsh Media maintains a Catalog interface implemented by forty classes across the company. They need to add a new operation, sortedByTitle, and the last time someone added a method to an interface, forty builds broke on the same morning. This time the lead says the change will break nothing, and teams that want a faster version can supply their own later. A new hire, Leah, wonders how that is possible when interface methods have no bodies. Is that still true, and what else can an interface hold today?",
  "simple": "An abstract class is a half-finished blueprint. You cannot build directly from it, but it can include finished parts and leave some parts blank for each child class to fill in. An interface is more like a job description: it lists what something must be able to do, and many unrelated classes can sign up for it. A class can have only one parent class but can follow many interfaces. Modern interfaces can also include ready-made behavior. A default method is a ready-made action classes get for free and may change. A static method belongs to the interface itself, like a helpful tool on its shelf. A private method is a hidden helper used only inside the interface.",
  "body": [
   "An abstract class is declared with the `abstract` keyword and cannot be instantiated with `new`. It may contain abstract methods, which have no body and end with a semicolon, alongside ordinary methods with bodies, fields of any kind and constructors. A concrete, non-abstract subclass must implement every inherited abstract method, or it will not compile. An abstract subclass may leave some of them unimplemented for its own subclasses. An abstract method cannot be `private`, `static` or `final`, because each of those modifiers would prevent it from ever being overridden. And a class that declares an abstract method must itself be declared abstract.",
   "Even though an abstract class cannot be instantiated, it can and often does have constructors. They run whenever a concrete subclass object is created, through the usual chain of `super(...)` calls, and they are a natural place to initialize shared state. This is one of the clearest differences from interfaces, which cannot declare constructors at all.",
   "An interface defines a contract. A class adopts one or more interfaces with `implements`, which is how Java supports multiple inheritance of type. An interface cannot have instance fields or constructors. Any field you declare in an interface is implicitly `public static final`, a constant that must be initialized where it is declared. Methods without a body are implicitly `public abstract`. An interface can extend several other interfaces with `extends`, and an interface method may only be `public` or `private`, never `protected` or package access.",
   "Interfaces can also contain method bodies of three kinds. A `default` method is an instance method with an implementation that implementing classes inherit and may override; it is implicitly `public`, and it is what lets a library add a method to a widely used interface without breaking existing implementations. A `static` method belongs to the interface itself and must be called with the interface name, as in `Validator.isEmail(s)`. It is not inherited by implementing classes or by subinterfaces, so calling it through an implementing class name or an instance does not compile. A `private` method, either instance or static, holds helper code shared by other methods of the interface and is invisible outside it. A private instance method can be called from default methods, and a private static method from static or default methods.",
   "Default methods raise the question of conflicts. When a class inherits two default methods with the same signature from different, unrelated interfaces, it must override the method, or the class does not compile. Inside its override it can call a specific version with `InterfaceName.super.method()`. Two further rules settle other conflicts. If a superclass provides a method with the same signature, the class's inherited method wins over any interface default; this is often summarized as class wins. And if one interface extends another and overrides its default, the more specific interface wins.",
   "```java\ninterface Walker {\n    default String move() { return \"walk\"; }\n    static String info() { return \"Walker\"; }\n}\ninterface Swimmer {\n    default String move() { return \"swim\"; }\n}\nclass Duck implements Walker, Swimmer {\n    @Override public String move() {        // required: conflicting defaults\n        return Walker.super.move() + \" and \" + helper();\n    }\n    private String helper() { return \"swim\"; }\n}\n// Walker.info() works; Duck.info() does not compile\n```",
   "Because interface methods are implicitly `public`, an implementing class must declare its implementations as `public`. Writing `void move()` with package access in the class is a compile error, since it would reduce visibility compared with the interface method. This trips people up because the interface itself never had to write the word `public`. The same applies when a class overrides a default method: the override must be `public` too, and adding `@Override` lets the compiler confirm that the signature really matches the interface method.",
   "Choosing between the two is a design decision. Use an abstract class when closely related classes share state, constructor logic or protected helpers, since interfaces cannot hold instance state. Use an interface when you are describing a capability that unrelated classes can have, such as being comparable, closeable or printable. Remember the counting rule for the exam: a class can extend only one class, abstract or not, but can implement many interfaces, and it can do both at once, as in `class Duck extends Bird implements Walker, Swimmer`."
  ],
  "analogy": "An abstract class is like a franchise kit: the kit includes a building, equipment and some finished recipes, but leaves a few menu items for each owner to create, and every owner can join only one franchise. An interface is like a certification badge, such as food-safety certified, that any business can earn, and a business can hold many badges. A default method is a template procedure that comes with the badge. The analogy stops at state: badges cannot hold instance fields, only constants.",
  "terms": [
   [
    "Abstract method",
    "A method with no body that concrete subclasses or implementing classes must implement."
   ],
   [
    "Default method",
    "An interface instance method with a body that implementing classes inherit and may override; implicitly public."
   ],
   [
    "Static interface method",
    "A method belonging to the interface itself, called only as InterfaceName.method() and not inherited."
   ],
   [
    "Private interface method",
    "A helper method with a body that is visible only inside the interface."
   ],
   [
    "Class wins rule",
    "When a superclass method and an interface default have the same signature, the superclass method is used."
   ]
  ],
  "example": "A library adds a new `default` method `sortedByTitle()` to its `Catalog` interface. Existing classes that implement Catalog keep compiling because they inherit the default, and classes that need a faster version override it.",
  "mistakes": [
   [
    "A static interface method can be called on an implementing class or an instance.",
    "Static interface methods are not inherited. Call them only as InterfaceName.method()."
   ],
   [
    "An implementing class may leave its method at package access because the interface did not write public.",
    "Interface abstract methods are implicitly public, so the implementation must be public."
   ],
   [
    "Abstract classes cannot have constructors because they cannot be instantiated.",
    "They can, and those constructors run when a subclass object is created."
   ],
   [
    "A class can inherit two conflicting default methods and Java will pick one.",
    "The class must override the method; it can delegate with InterfaceName.super.method()."
   ]
  ],
  "tryit": [
   [
    "Class `Robot` implements `Walker` and `Swimmer`, and both declare `default String move()`. Robot does not declare move. Does Robot compile? If not, write the minimal fix that reuses Swimmer's version.",
    "It does not compile, because the defaults conflict. Add public String move() { return Swimmer.super.move(); } to Robot."
   ],
   [
    "You are designing types for a game: `Enemy` objects share health and position fields and a constructor, and unrelated objects such as doors and chests can be `Lockable`. Which should be an abstract class and which an interface?",
    "Enemy should be an abstract class because it holds shared state and constructor logic. Lockable should be an interface because it is a capability that unrelated classes adopt."
   ]
  ],
  "tip": "Interface methods are public, whether written or not, so implementations must be public. Static interface methods are called only through the interface name, and duplicate defaults must be resolved with an override.",
  "check": [
   [
    "Can an interface method be declared `protected`?",
    "No. Interface methods can be public or private only."
   ],
   [
    "How do you call Walker's version of a conflicting default method from inside Duck?",
    "Walker.super.move(); inside the overriding method."
   ],
   [
    "Can an abstract class have a constructor?",
    "Yes. It cannot be instantiated directly, but its constructor runs when a subclass object is created."
   ],
   [
    "Can an interface declare an instance field such as `int count;`?",
    "No. Interface fields are implicitly public static final constants and must be initialized, so int count; without a value does not compile."
   ]
  ]
 },
 {
  "t": "Records: components, canonical and compact constructors, accessors, equals/toString",
  "hook": "You are reviewing a pull request at Tidewater Freight on a Friday afternoon. Priya has replaced a sixty-line `Shipment` class, with its fields, getters, `equals`, `hashCode` and `toString`, by a single line: `record Shipment(String id, int weightKg) {}`. A teammate comments that the tests now call `s.weightKg()` instead of `s.getWeightKg()`, and another asks how they are supposed to reject negative weights if there is no constructor body to put the check in. Priya says the compiler writes most of the class for her and that validation still has a home. Who is right, and what exactly did the compiler generate?",
  "simple": "A record is a short way to write a class whose only job is to hold a few values that never change, like a label on a parcel listing sender, weight and destination. You list the values once in the header, for example `record Point(int x, int y)`, and Java writes the boring parts for you: a field for each value, a constructor that fills them in, a method to read each value (named `x()` and `y()`), a way to compare two records for equality, and a readable printout such as `Point[x=1, y=2]`. If you want to check the values before they are stored, you add a short constructor block with no parameter list. Records cannot be extended, and they cannot gain extra instance fields.",
  "body": [
   "A record is a special kind of class designed to carry immutable data, and the exam expects you to know exactly what the compiler generates from its header. The declaration `record Point(int x, int y) {}` lists two components. From those, the compiler creates a `private final` field for each component, a canonical constructor that takes all components in declaration order, a `public` accessor method for each component named exactly like it (`x()` and `y()`, never `getX()`), and implementations of `equals`, `hashCode` and `toString` based on all of the components. That is the whole reason records exist: a data carrier in one line instead of dozens.",
   "Records also follow fixed structural rules, and most compile-error questions come from these. A record is implicitly `final`, so no class can extend it. It implicitly extends `java.lang.Record`, so it cannot extend anything else, although it can implement any number of interfaces. You cannot declare extra instance fields in the body; only the components become instance state. The body may still contain `static` fields, static methods, instance methods, constructors and nested types. Because the generated fields are `final`, records are shallowly immutable: if a component is a `List`, the reference cannot change, but the list itself can still be modified unless you store a copy.",
   "The canonical constructor is where validation and normalization live, and you can write it in two forms. The long form repeats every parameter, and then you must assign every field yourself with `this.x = x`. The more common form is the compact constructor, which has no parameter list at all: `record Point(int x, int y) { Point { if (x < 0) throw new IllegalArgumentException(); } }`. Inside a compact constructor the parameters are in scope, you may reassign them (for example to swap, trim or copy a value), and the compiler assigns the fields automatically at the end of the block using the final parameter values. You may not write `this.x = ...` inside a compact constructor; that is a compile error, because the field assignment is reserved for the compiler.",
   "You can add other, non-canonical constructors, but every one of them must delegate with `this(...)` and eventually reach the canonical constructor, so that every record instance passes through the same validation. In Java 25, flexible constructor bodies allow some statements, such as argument checks, to appear before that `this(...)` call as a prologue, as long as they do not use the instance being built. Records can never call `super(...)`. You may also explicitly declare an accessor, which must be `public` and have the same return type as the component, or override `toString`, `equals` or `hashCode` when the generated behavior is not what you need.",
   "```java\nrecord Range(int low, int high) {\n    Range {                          // compact canonical constructor\n        if (low > high) {\n            int tmp = low; low = high; high = tmp;  // reassign parameters\n        }\n    }\n    Range(int single) { this(single, single); }\n    int size() { return high - low; }\n}\nvar r = new Range(9, 3);\nSystem.out.println(r);               // Range[low=3, high=9]\nSystem.out.println(r.low());         // 3\nSystem.out.println(r.equals(new Range(3, 9)));  // true\n```",
   "Reading that example line by line shows each generated piece at work. `new Range(9, 3)` enters the compact constructor, which swaps the parameters, and then the fields are assigned as low 3 and high 9. The extra constructor `Range(int single)` delegates to the canonical one with `this(single, single)`. The instance method `size()` reads the fields directly by name, which is allowed inside the record body.",
   "The generated `toString` prints the record name followed by each component name and value in square brackets, such as `Range[low=3, high=9]`. The generated `equals` returns true when the other object is the same record type and all components are equal, so two separately created records with the same values are equal, and the generated `hashCode` is consistent with that. This value-based equality makes records reliable keys in a `HashMap` or elements in a `HashSet`, which is a common exam scenario: two `new Point(1, 2)` objects count as one entry in a set.",
   "Records pair naturally with pattern matching. A record pattern such as `case Range(var lo, var hi)` in a switch, or `obj instanceof Range(int lo, int hi)`, tests the type and deconstructs the record into its components in one step, using the accessors behind the scenes. Combined with sealed interfaces, this lets you model a closed set of data shapes and process them with an exhaustive switch, which is one reason records are central to modern Java.",
   "When an exam question shows a record, check a short list: are the accessors called by component name, does the body try to declare an instance field, does a compact constructor try to assign `this.field` or declare parameters, does any extra constructor fail to delegate with `this(...)`, and does the record try to extend a class? Any one of those answers usually decides the question."
  ],
  "analogy": "A record is like a pre-printed shipping label with fixed boxes for sender, weight and destination. Once the label is printed you cannot add a new box or rewrite one, and two labels with identical entries describe the same shipment. The compact constructor is the clerk who checks and tidies your handwriting before printing. The analogy stops at mutable components: if one box holds a reference to a list, the list itself can still change unless the clerk makes a copy.",
  "terms": [
   [
    "Record component",
    "A name and type in a record header; each becomes a private final field and a public accessor."
   ],
   [
    "Canonical constructor",
    "The constructor whose parameters match the record components in order and that assigns every field."
   ],
   [
    "Compact constructor",
    "A canonical constructor written without a parameter list, used to validate or normalize parameters before fields are assigned automatically."
   ],
   [
    "Accessor method",
    "The generated public method named after a component, such as x(), that returns its value."
   ],
   [
    "java.lang.Record",
    "The implicit superclass of every record, which is why a record cannot extend another class."
   ]
  ],
  "example": "An order service uses `record Money(long cents, String currency)` for amounts. Its compact constructor rejects null currencies and upper-cases the code, so every Money object in the system is valid, and two Money objects for the same amount compare equal in tests and work as keys in a HashMap of totals.",
  "mistakes": [
   [
    "Calling `p.getX()` on a record because that is the JavaBeans convention.",
    "Record accessors are named exactly after the component, so the call is `p.x()`. `getX()` does not exist unless you write it yourself."
   ],
   [
    "Writing `this.x = x;` inside a compact constructor.",
    "That is a compile error. In a compact constructor you reassign the parameter (`x = Math.abs(x);`) and the compiler assigns the field at the end."
   ],
   [
    "Adding `private int count;` to a record body to track extra state.",
    "Records may not declare instance fields beyond their components. Static fields are allowed; extra instance state means the type should be an ordinary class."
   ],
   [
    "Assuming a record with a `List` component is fully immutable.",
    "Records are shallowly immutable. The field cannot be reassigned, but the list can still be modified unless the constructor stores a copy such as `List.copyOf(items)`."
   ]
  ],
  "tryit": [
   [
    "Diego writes `record Temp(double celsius) { Temp(double celsius) { if (celsius < -273.15) throw new IllegalArgumentException(); } }`. It fails to compile. He thinks records do not allow constructors. What is actually wrong, and how would you fix it?",
    "Records allow constructors. He wrote the long-form canonical constructor (it has a parameter list) but never assigned the field, and a long-form canonical constructor must assign every field. Either add `this.celsius = celsius;` at the end, or remove the parameter list to make it a compact constructor, `Temp { ... }`, where the field is assigned automatically."
   ],
   [
    "A team stores `new Point(2, 5)` in a `HashSet`, later builds another `new Point(2, 5)` from user input and calls `set.contains(...)`. Point is a record with no overridden methods. Does contains return true?",
    "Yes. The generated equals and hashCode are based on all components, so two separately created records with the same component values are equal and hash identically."
   ]
  ],
  "tip": "Record accessors are named after the components (name(), not getName()). In a compact constructor, reassign the parameters, never this.field, and never declare a parameter list. Extra constructors must delegate with this(...).",
  "check": [
   [
    "Can a record declare a private instance field in its body?",
    "No. Only the components become instance fields; the body may add static fields but not instance fields."
   ],
   [
    "What is printed by `System.out.println(new Point(1, 2));` for `record Point(int x, int y)`?",
    "Point[x=1, y=2], the generated toString format."
   ],
   [
    "Can a record extend another class?",
    "No. It implicitly extends java.lang.Record, but it may implement interfaces."
   ],
   [
    "What must every non-canonical constructor in a record do?",
    "Delegate to another constructor with this(...), eventually reaching the canonical constructor. Records cannot call super(...)."
   ]
  ]
 },
 {
  "t": "Sealed classes and interfaces: permits, final, sealed and non-sealed subclasses",
  "hook": "At Lantern Payments, Omar gets a production alert at 2 a.m.: a refund batch crashed with an `IllegalStateException` thrown from the `default` branch of a switch that was supposed to be unreachable. Someone added a new `CryptoWallet` payment type last week, and nobody updated the fee calculator. The compiler said nothing, because the `default` branch quietly swallowed the missing case at compile time and blew up at run time. Omar wonders whether Java could have refused to build the code until every payment type was handled. Could it, and what would the payment hierarchy need to look like?",
  "simple": "Normally, any class can extend another class unless that class is marked `final`, which blocks everyone. A sealed class is the middle ground: it publishes a guest list of exactly which classes may extend it. Think of a club with a door list: only the named people get in. Each class on the list must then say what happens next: either nobody can extend it (`final`), it has its own guest list (`sealed`), or anyone can extend it from there on (`non-sealed`). Because the compiler knows the full list, it can check that a switch handles every allowed type, and it warns you when a new type is added and a switch forgets it.",
  "body": [
   "A sealed class or interface restricts which other classes or interfaces may directly extend or implement it. Ordinary inheritance is open: anyone can subclass a non-final class. `final` closes it completely. Sealing sits in between, because you name the exact set of allowed direct subtypes. This lets you model a closed set of alternatives, such as the shapes a drawing tool supports or the payment methods a checkout accepts, and it lets the compiler check that a switch covers every case.",
   "You declare a sealed type with the `sealed` modifier and a `permits` clause listing the permitted direct subtypes: `public sealed class Shape permits Circle, Square, Polygon {}`. The `permits` clause can be omitted when all the permitted subclasses are declared in the same source file as the sealed type; the compiler then infers the list from what it sees in that file. A sealed interface works the same way, and its permitted subtypes can be classes, records, enums or other interfaces. Sealed interfaces use `permits` for both the classes that implement them and the interfaces that extend them.",
   "Every permitted direct subclass must declare how it continues the hierarchy, using exactly one of three modifiers. `final` means no further subclasses are allowed. `sealed` means it restricts its own subclasses with its own `permits` clause, so the hierarchy stays closed one level deeper. `non-sealed` reopens the hierarchy from that point, so any class can extend it. Leaving the modifier off entirely is a compile error, and so is combining two of them. Records are implicitly final, and an enum is implicitly final (or implicitly sealed when its constants have class bodies), so they satisfy the rule without writing a modifier. That is why a sealed interface with record implementations is such a common pattern in modern Java.",
   "There are also location rules that the exam likes to test. A permitted subclass must directly extend the sealed class or directly implement the sealed interface, and it must be accessible to it. If the code is in a named module, the sealed type and its permitted subclasses must be in the same module. If the code is in the unnamed module, which is ordinary classpath code with no `module-info.java`, they must be in the same package. A class listed in `permits` that does not actually extend the sealed type is a compile error, and so is a class that tries to extend a sealed type without being listed.",
   "```java\npublic sealed interface Payment permits Card, BankTransfer, Voucher {}\n\npublic record Card(String number) implements Payment {}      // implicitly final\npublic final class BankTransfer implements Payment {}\npublic non-sealed class Voucher implements Payment {}        // open again\nclass GiftVoucher extends Voucher {}                         // allowed\n\nstatic String fee(Payment p) {\n    return switch (p) {           // exhaustive: all permitted subtypes\n        case Card c -> \"2%\";\n        case BankTransfer b -> \"flat\";\n        case Voucher v -> \"none\";\n    };\n}\n```",
   "The compiler uses sealing for exhaustiveness checking. Because `Payment` has exactly three permitted subtypes, a switch over it with a case for each needs no `default` branch. If a fourth type is later added to the `permits` clause, every such switch stops compiling until it handles the new type, which turns a run-time surprise into a compile-time to-do list. Note that `case Voucher v` also covers `GiftVoucher`, because `GiftVoucher` is a subclass of `Voucher`, and the non-sealed `Voucher` branch is still a single known type from the compiler's point of view.",
   "A small vocabulary point: `non-sealed` is a contextual keyword written with a hyphen, the only hyphenated keyword in Java. `sealed` and `permits` are also contextual keywords, so they can still be used as identifiers elsewhere, but you will rarely see that on the exam.",
   "Sealing controls who may subclass; it does not affect who may use the type. A sealed class may be abstract or concrete, and a concrete sealed class can itself be instantiated with `new`. It can have constructors, fields and methods like any other class. Think of sealing as a design statement: these are all the kinds there are.",
   "When you analyze an exam snippet, check four things in order: does every permitted subtype directly extend the sealed type, does each one carry exactly one of `final`, `sealed` or `non-sealed` (or is it a record or enum), are they in the same package or module as required, and does any switch over the sealed type cover every permitted subtype or include a `default`?"
  ],
  "analogy": "A sealed class is like a building with a guest list at the front desk. Only the names on the list may walk in, and each guest must tell the desk whether they will bring no one (`final`), bring only people on their own list (`sealed`), or hold the door open for anyone (`non-sealed`). Because the desk knows every guest, it can confirm a seating chart covers everyone. The analogy breaks slightly in that the list controls only who becomes a subclass, not who may visit and use the type.",
  "mnemonic": "Every permitted subclass picks one exit: F, S or N. Final closes the door, Sealed keeps a new guest list, Non-sealed opens the door to everyone.",
  "terms": [
   [
    "Sealed class",
    "A class or interface that allows only the direct subtypes named in its permits clause, or declared in the same file."
   ],
   [
    "permits clause",
    "The list of classes or interfaces allowed to directly extend or implement a sealed type."
   ],
   [
    "non-sealed",
    "A modifier for a permitted subclass that reopens the hierarchy so any class may extend it."
   ],
   [
    "Exhaustive hierarchy",
    "A closed set of subtypes that lets the compiler verify a switch handles every case without a default."
   ],
   [
    "Unnamed module",
    "The module for ordinary classpath code; sealed types there must keep permitted subclasses in the same package."
   ]
  ],
  "example": "A banking API models account events as `sealed interface Event permits Deposit, Withdrawal, Fee`, each a record. Reporting code switches over Event without a default, and the day someone adds `Interest` to the permits list, the compiler shows every report that must handle it.",
  "mistakes": [
   [
    "Declaring a permitted subclass as `class Circle extends Shape {}` with no modifier.",
    "A permitted subclass must be final, sealed or non-sealed. Only records and enums get away without one, because they are implicitly final or sealed."
   ],
   [
    "Believing a sealed class cannot be instantiated.",
    "Sealing restricts subclassing, not use. A non-abstract sealed class can be created with new like any other class."
   ],
   [
    "Thinking a switch over a sealed type always needs a default branch.",
    "If the switch covers every permitted subtype, it is exhaustive and needs no default; that is the main payoff of sealing."
   ],
   [
    "Placing permitted subclasses in another package of the same classpath project.",
    "In the unnamed module they must be in the same package as the sealed type. Different packages are allowed only within the same named module."
   ]
  ],
  "tryit": [
   [
    "Your team has `sealed interface Shape permits Circle, Square` where both are records. A teammate adds `record Triangle(double a, double b, double c) implements Shape {}` in the same package but does not touch the permits clause. What happens, and what else will need to change once it is fixed?",
    "Triangle fails to compile, because it implements a sealed interface without being listed in permits. After adding Triangle to the permits clause, every switch over Shape that relied on exhaustiveness without a default stops compiling until it adds a case for Triangle."
   ]
  ],
  "tip": "Every permitted subclass needs exactly one of final, sealed or non-sealed, unless it is a record or enum. Unnamed-module code must keep them in the same package, and permits can be omitted only when all subclasses are in the same file.",
  "check": [
   [
    "What happens if a class listed in `permits` is declared `class Circle extends Shape {}` with no modifier?",
    "Compile error. A permitted subclass must be declared final, sealed or non-sealed."
   ],
   [
    "When can the `permits` clause be omitted?",
    "When all permitted subclasses are declared in the same source file as the sealed type."
   ],
   [
    "Can a record implement a sealed interface without extra modifiers?",
    "Yes. Records are implicitly final, which satisfies the requirement."
   ],
   [
    "Does `case Voucher v` in a switch over a sealed type also match a subclass of the non-sealed Voucher?",
    "Yes. A type pattern matches the type and all of its subclasses."
   ]
  ]
 },
 {
  "t": "Enums with fields, constructors, methods and values()/valueOf()/ordinal()",
  "hook": "The help-desk queue at Maple Ridge Clinic fills with the same ticket: the appointment app shows patients the wrong room size after an update. Jun traces it to the database, which stores each `RoomType` as a number, its `ordinal()`. Last sprint someone inserted a new constant, `TELEHEALTH`, at the top of the enum, and every stored number now points one position off. Exam rooms became consult rooms overnight. Jun needs to fix the data and make sure it cannot happen again. What should have been stored instead, and what else do enums give you for free?",
  "simple": "An enum is a type with a fixed, short list of allowed values, like the sizes on a coffee menu: small, medium and large. Nobody can invent a fourth size at run time. Each value is a real object, so it can carry its own data, such as the number of milliliters in each cup, and its own methods. Java also adds helper methods: `values()` gives you all the choices in order, `valueOf(\"LARGE\")` turns text into the matching choice (spelling and capitals must match exactly), and `ordinal()` tells you a choice's position, starting at 0. Because there is only ever one SMALL, you can compare choices safely with `==`.",
  "body": [
   "An enum is a class with a fixed set of named instances. `enum Size { SMALL, MEDIUM, LARGE }` creates exactly three `Size` objects, and no code can create more, because enum constructors are always private. If you write no modifier the constructor is implicitly private, and writing `public` or `protected` on it is a compile error. Each constant is a `public static final` field of the enum type, so you refer to them as `Size.SMALL`. Since there is exactly one instance of each constant, comparing enums with `==` is safe and is the usual style, and it can never throw a `NullPointerException` the way calling `equals` on a null reference can.",
   "Every enum implicitly extends `java.lang.Enum`, so it cannot extend another class, though it can implement interfaces. It gets several methods for free, and the exam tests their exact behavior. `values()` is a compiler-generated static method that returns a new array of all constants in declaration order. `valueOf(String)` returns the constant with exactly that name and throws `IllegalArgumentException` if no constant matches; the match is case-sensitive, so `Size.valueOf(\"small\")` fails. `name()` returns the constant's declared name, `ordinal()` returns its zero-based position, and `compareTo` orders constants by ordinal. The default `toString` returns the name, although you may override `toString` (but not `name()`, which is final).",
   "Enums can have fields, constructors and methods like any class, and the syntax rules are strict. The constant list must come first in the body. If anything follows the list, such as a field or method, the list must end with a semicolon. Each constant can pass arguments to the constructor in parentheses after its name. The constructor runs once per constant, when the enum class is initialized, which happens the first time the enum is used, not each time you mention a constant. That detail decides output questions: all constructor side effects happen together, in declaration order, before the first constant is returned to your code.",
   "```java\nenum Planet {\n    MERCURY(3.303e23), EARTH(5.976e24);   // semicolon required here\n\n    private final double mass;\n    Planet(double mass) {                    // implicitly private\n        this.mass = mass;\n        System.out.print(\"init \");\n    }\n    double mass() { return mass; }\n}\nSystem.out.println(Planet.EARTH.mass());    // init init 5.976E24\nSystem.out.println(Planet.EARTH.ordinal()); // 1\nSystem.out.println(Planet.valueOf(\"MERCURY\")); // MERCURY\n```",
   "In that example, the first use of `Planet` initializes the class, so the constructor runs for MERCURY and then EARTH, printing `init init` before the mass is printed. The second and third lines print no further `init`, because the class is already initialized. `EARTH.ordinal()` is 1 because ordinals start at 0, and `valueOf(\"MERCURY\")` finds the constant by its exact name.",
   "Constants can also have their own class bodies, which lets each one behave differently. If the enum declares an abstract method, every constant must supply a body that implements it, as in `PLUS { int apply(int a, int b) { return a + b; } }`, and leaving one out is a compile error. If the method is not abstract, constants may override it selectively. This constant-specific behavior is a clean alternative to a switch statement buried inside the enum.",
   "Enums work well with `switch`. In a classic switch statement or a switch expression over an enum variable, the case labels are usually the bare constant names, such as `case SMALL ->`, without the type prefix (qualified names like `Size.SMALL` are also accepted in current Java). A switch expression that lists every constant is exhaustive and needs no `default`. Enums also have specialized collections, `EnumSet` and `EnumMap`, which are compact, fast and iterate in declaration order.",
   "One practical rule follows from how ordinals work: avoid storing ordinals in files or databases. Reordering constants or inserting a new one changes the ordinals of everything after it, silently corrupting saved data. Store the name instead and rebuild the constant with `valueOf` when reading it back. Renaming a constant still breaks stored names, but that change is visible and searchable, unlike a shifted number.",
   "When an exam question shows an enum, run through a short checklist. Is the constant list first, and does it end with a semicolon if members follow? Is the constructor free of `public` or `protected`? Does any code try `new` on the enum or try to extend a class? Does a `valueOf` call use the exact, case-sensitive name? Are ordinals counted from 0? And if constructors print, remember that every constant's constructor runs once, in order, the first time the enum is used. Most enum questions turn on one of these details."
  ],
  "analogy": "An enum is like the fixed set of buttons on a vending machine. The machine ships with exactly those buttons; nobody can add one by pressing harder. Each button can carry a label and a price (fields), and the buttons are numbered left to right (ordinals). If the manufacturer inserts a new button at the left end, every number shifts, which is why you record a button's label, not its position. The comparison stops at construction: the buttons are all built at once when the machine is switched on, not when first pressed.",
  "terms": [
   [
    "Enum",
    "A special class with a fixed set of named instances declared at the top of its body."
   ],
   [
    "values()",
    "A generated static method returning a new array of all enum constants in declaration order."
   ],
   [
    "valueOf(String)",
    "Returns the constant with the exact, case-sensitive given name, or throws IllegalArgumentException."
   ],
   [
    "ordinal()",
    "The zero-based position of a constant in its declaration."
   ],
   [
    "Constant-specific body",
    "A class body attached to one enum constant that implements or overrides methods for that constant only."
   ]
  ],
  "example": "A coffee shop app defines `enum CupSize { SMALL(250), MEDIUM(350), LARGE(450) }` with a field for milliliters. The order screen loops over CupSize.values() to build its buttons, the price calculator reads each constant's milliliters instead of using a separate lookup table, and saved orders store the name, such as \"MEDIUM\", rather than the ordinal.",
  "mistakes": [
   [
    "Expecting `Size.valueOf(\"small\")` to return SMALL.",
    "valueOf is case-sensitive and matches the exact constant name; a mismatch throws IllegalArgumentException, not null."
   ],
   [
    "Declaring a public enum constructor so other classes can create constants.",
    "Enum constructors are always private; public or protected is a compile error, and new Size() is never allowed."
   ],
   [
    "Thinking the constructor runs each time a constant is referenced.",
    "It runs once per constant, all together, when the enum class is first initialized."
   ],
   [
    "Leaving out the semicolon after the constant list when fields or methods follow.",
    "When the body contains anything after the constants, the list must end with a semicolon or the code does not compile."
   ]
  ],
  "tryit": [
   [
    "A shipping app has `enum Speed { STANDARD, EXPRESS, OVERNIGHT }` and saves `speed.ordinal()` to a file for each order. A product manager asks you to add `ECONOMY` as the cheapest option and put it first in the list. What happens to old saved orders, and what would you change?",
    "Every old order shifts by one: a saved 0 that meant STANDARD now reads as ECONOMY. The fix is to store `speed.name()` and read it back with `Speed.valueOf(...)`, then migrate the existing numeric data once before reordering the constants."
   ],
   [
    "Given `enum Op { PLUS { int apply(int a, int b) { return a + b; } }, MINUS; abstract int apply(int a, int b); }`, does it compile?",
    "No. Because apply is abstract, every constant must provide a body implementing it, and MINUS has none."
   ]
  ],
  "tip": "Enum constructors are private and run once per constant at class initialization. valueOf is case-sensitive and throws IllegalArgumentException, ordinals start at 0, and the constant list needs a semicolon when members follow.",
  "check": [
   [
    "What does `Size.valueOf(\"Medium\")` do if the constant is `MEDIUM`?",
    "It throws IllegalArgumentException, because valueOf matches names exactly and is case-sensitive."
   ],
   [
    "Can you create an enum instance with `new Size()`?",
    "No. Enum constructors are private and the compiler forbids instantiating enums."
   ],
   [
    "What is `Size.LARGE.ordinal()` for `enum Size { SMALL, MEDIUM, LARGE }`?",
    "2, because ordinals start at 0."
   ],
   [
    "Can an enum extend another class?",
    "No. It implicitly extends java.lang.Enum, but it can implement interfaces."
   ]
  ]
 },
 {
  "t": "Nested, inner, local and anonymous classes",
  "hook": "Ana is pairing with a new hire at Riverbend Library Systems. The code base has a `Catalog` class with a `Node` type inside it, an `Iterator` declared inside that, a little class declared inside a method, and a `new Comparator<Book>() { ... };` block in the middle of a sort call. The new hire asks why one inner type is created with `new Catalog.Node()` while another needs `catalog.new Cursor()`, and why the compiler rejected a lambda the moment he added `count++` further down the method. Ana realizes there are four kinds of nested classes here, each with its own rules. How do you tell them apart?",
  "simple": "Java lets you put a class inside another class, or even inside a method, to keep small helper types close to where they are used. There are four kinds. A static nested class is just a normal class stored inside another for tidiness. An inner class belongs to one particular outer object and can see that object's private data, like a drawer that belongs to one specific desk. A local class is written inside a method and only exists there. An anonymous class has no name; you write it and create its one object in a single line, often to supply a quick bit of behavior. Classes written inside a method can read the method's variables only if those variables are never changed.",
  "body": [
   "Java lets you declare a class inside another class or even inside a method. These nested classes keep helper types close to where they are used, hide them from the rest of the code base, and can access the enclosing class's members, including private ones. There are four kinds: static nested classes, inner classes, local classes and anonymous classes. The exam tests how each one is created, what it can access, and which modifiers it may carry.",
   "A static nested class is declared with `static` inside another class. It behaves like a top-level class that happens to live in the outer class's namespace, and it has no link to any outer object. As a result, it can access the outer class's static members directly, but to reach instance members it needs an explicit reference to an outer object. You create it with `new Outer.Nested()`, with no outer instance required. Builders, map entries and small helper types are often written this way.",
   "An inner class is a member class declared without `static`, and it is tied to an instance of the outer class. Every inner object holds a hidden reference to the outer object that created it, so it can read and write that object's fields, including private ones. To create an inner object from outside, or from a static method such as `main`, you need an outer instance: `Outer o = new Outer(); Outer.Inner i = o.new Inner();`, or in one line `new Outer().new Inner()`. Inside the outer class's instance methods, plain `new Inner()` works because `this` supplies the outer instance. If an inner class has a field with the same name as one in the outer class, `Outer.this.name` reaches the outer one while `this.name` refers to the inner one. Since Java 16, inner classes may also declare static members.",
   "A local class is declared inside a method, constructor or block and is visible only from its declaration to the end of that block. An anonymous class is a local class with no name, declared and instantiated in one expression, usually to implement an interface or extend a class on the spot: `Runnable r = new Runnable() { public void run() { ... } };`. Notice the semicolon after the closing brace, because the whole construct is an expression inside a declaration statement. An anonymous class can extend one class or implement one interface, never both, and it cannot declare a constructor because it has no name to give one, although it can use an instance initializer block and can pass arguments to a superclass constructor.",
   "Local and anonymous classes, and lambdas too, can use local variables and parameters of the enclosing method only if those are final or effectively final. Effectively final means the variable is never reassigned after initialization. The rule is checked across the whole method: reassigning the variable anywhere, even on a line after the class declaration, makes the capture a compile error. Fields of the enclosing object are not subject to this rule, because the class reaches them through the outer reference rather than copying them.",
   "```java\npublic class Outer {\n    private int x = 10;\n    static class Nested { int get() { return 1; } }\n    class Inner { int get() { return x; } }       // uses outer field\n\n    void demo() {\n        int y = 5;                                  // effectively final\n        class Local { int get() { return x + y; } }\n        Runnable anon = new Runnable() {\n            public void run() { System.out.println(y); }\n        };\n        // y++;  // would make y not effectively final: compile error above\n    }\n}\nOuter.Nested n = new Outer.Nested();\nOuter.Inner i = new Outer().new Inner();\n```",
   "Access modifiers differ by kind. Member classes, meaning static nested and inner classes, can be `public`, `protected`, package-private or `private`, exactly like fields and methods. Local and anonymous classes take no access modifier at all, because they are visible only inside their block. A local class may be `final` or `abstract`, but writing `public` or `private` on it is a compile error.",
   "When you meet a nested-class question, first identify the kind from its declaration: `static` at member level, member without `static`, inside a method with a name, or `new Type() { ... }` with no name. Then apply the matching rule: how it is instantiated, whether an outer instance is needed, which variables it captures, and which modifiers are legal."
  ],
  "analogy": "Think of an office building. A static nested class is a separate company that rents a room in the building: it shares the address but has no tie to any particular office. An inner class is an assistant assigned to one specific manager, with access to that manager's private files. A local class is a temporary project team that exists only during one meeting, and an anonymous class is a contractor hired on the spot for one task without ever being given a job title. The analogy stops at capture rules, which have no office equivalent: locals must be effectively final.",
  "mnemonic": "SILA lists the four kinds from most independent to most temporary: Static nested, Inner, Local, Anonymous.",
  "terms": [
   [
    "Static nested class",
    "A class declared static inside another class; it needs no outer instance and is created with new Outer.Nested()."
   ],
   [
    "Inner class",
    "A non-static member class whose instances are tied to an outer instance and can access its members."
   ],
   [
    "Local class",
    "A named class declared inside a method or block, visible only within that block."
   ],
   [
    "Anonymous class",
    "An unnamed class declared and instantiated in a single expression, extending one class or implementing one interface."
   ],
   [
    "Effectively final",
    "A local variable that is never reassigned after initialization, which makes it usable from local classes, anonymous classes and lambdas."
   ]
  ],
  "example": "A `LinkedList` implementation keeps its `Node` type as a private static nested class, since nodes do not need a reference to the list, and its iterator as a private inner class, since the iterator must read the list's head and modification count.",
  "mistakes": [
   [
    "Writing `new Outer.Inner()` from a static method for a non-static inner class.",
    "An inner class needs an outer instance: `new Outer().new Inner()` or `outerRef.new Inner()`. Only static nested classes use `new Outer.Nested()`."
   ],
   [
    "Giving an anonymous class a constructor.",
    "An anonymous class has no name, so it cannot declare a constructor; use an instance initializer or pass arguments to the superclass constructor."
   ],
   [
    "Assuming a variable is capturable because it is not reassigned before the class is declared.",
    "Effectively final is judged across the whole scope; a reassignment anywhere in the method, even later, breaks the capture."
   ],
   [
    "Marking a local class `private` to hide it.",
    "Local and anonymous classes cannot have access modifiers; they are already visible only inside their block."
   ]
  ],
  "tryit": [
   [
    "In `public static void main`, Lee writes `Outer.Inner in = new Outer.Inner();` where Inner is declared `class Inner {}` inside Outer with no static modifier. The build fails. What are two different ways to fix it, and how do they change the design?",
    "Either create an outer object first, `Outer.Inner in = new Outer().new Inner();`, keeping Inner tied to an Outer instance, or declare Inner as `static class Inner`, making it a static nested class that no longer has access to Outer's instance fields. Choose based on whether Inner needs outer instance state."
   ]
  ],
  "tip": "Creating an inner class from outside needs an outer object: outer.new Inner(). A static nested class uses new Outer.Nested(). Captured locals must be effectively final, and local or anonymous classes take no access modifiers.",
  "check": [
   [
    "How do you create an `Inner` object from a static method when Inner is a non-static member of Outer?",
    "With an outer instance: new Outer().new Inner(), or outerRef.new Inner()."
   ],
   [
    "Can an anonymous class both extend a class and implement an interface?",
    "No. It can extend exactly one class or implement exactly one interface."
   ],
   [
    "Can a local class read a method variable that is reassigned later in the method?",
    "No. Captured local variables must be final or effectively final."
   ],
   [
    "Inside an inner class with a field named `name` that shadows the outer field, how do you reach the outer one?",
    "With Outer.this.name."
   ]
  ]
 },
 {
  "t": "Instanceof pattern matching and flow scoping",
  "hook": "At Copperline Insurance, a claims service has crashed three times this week with a `ClassCastException`. Femi finds the culprit: an `instanceof Document` test on line 40 and a cast to `Document` on line 52, with a refactor in between that changed the variable the cast uses. The test and the cast drifted apart. Femi rewrites the block as `if (item instanceof Document doc)`, and the bug becomes impossible. Then a teammate tries `if (!(item instanceof Document doc)) return;` and is surprised that `doc` works on the lines after the `if`. Why does that compile, and where exactly can a pattern variable be used?",
  "simple": "The `instanceof` check asks, is this object of a certain type? Pattern matching lets you ask that question and, if the answer is yes, get a ready-to-use variable of that type in the same breath, like checking a parcel's label and opening it in one move. For example, `if (obj instanceof String s)` means: if obj really is a String, call it `s` and let me use it as a String. The new variable exists only in places where Java is sure the check passed, such as inside the `if` block or after `&&` in the same condition. It is not available where the check might have failed, such as the `else` block or after `||`.",
  "body": [
   "The `instanceof` operator tests whether an object is an instance of a type. Before pattern matching, a test was usually followed by a separate cast: `if (obj instanceof String) { String s = (String) obj; ... }`. That repetition invited bugs, because the test and the cast could drift apart during edits. Pattern matching combines the test, the cast and the variable declaration into one expression: `if (obj instanceof String s) { ... }`. If the test succeeds, `s` is a `String` variable ready to use. If `obj` is `null`, `instanceof` evaluates to `false` and nothing is bound, so pattern matching can never produce a null pattern variable.",
   "The variable introduced by a pattern is called a pattern variable, and its scope follows a rule called flow scoping: it is in scope only where the compiler can prove the pattern matched. In `if (o instanceof String s) { ... } else { ... }`, `s` is usable in the `if` block and not in the `else` block, because the `else` block runs exactly when the match failed. You can also use the variable later in the same condition after `&&`: `if (o instanceof String s && s.length() > 3)` compiles, because the right side of `&&` runs only when the left side is true.",
   "With `||` the logic reverses. `if (o instanceof String s || s.isEmpty())` does not compile, because the right side of `||` runs exactly when the left side was false, which means the match failed and `s` was never assigned. For the same reason, `s` is not in scope inside the body of an `if` whose condition is an `||` involving the pattern. Negation flips scope the other way round. In `if (!(o instanceof String s)) { return; }`, the pattern variable is not in scope inside the block, but it is in scope after the `if` statement for the rest of the method, because the block always exits early and the only way to reach the following lines is if the pattern matched. If the block could complete normally instead of returning or throwing, `s` would not be in scope afterward.",
   "```java\nstatic int len(Object o) {\n    if (!(o instanceof String s)) {\n        return -1;              // s not in scope here\n    }\n    return s.length();          // s in scope: pattern must have matched\n}\n\nObject x = \"hello\";\nif (x instanceof String t && t.startsWith(\"h\")) {\n    System.out.println(t.toUpperCase()); // HELLO\n}\n// if (x instanceof String u || u.isEmpty()) {}  // does not compile\n```",
   "Several more rules come up on the exam. A pattern variable cannot have the same name as a local variable already in scope, so `String s = \"\"; if (o instanceof String s)` is a compile error. Pattern variables are not implicitly final, so they can be reassigned, although that is rarely good style; you can write `instanceof final String s` to make one final. The type in `instanceof` must be compatible with the expression's static type: `Integer i = 5; if (i instanceof String s)` does not compile, because an `Integer` can never be a `String`. The compiler rejects any test that could never succeed, which protects you from typos in type names.",
   "Record patterns work with `instanceof` too. `if (obj instanceof Point(int x, int y))` tests that `obj` is a `Point` and binds its two components as `x` and `y` in one step, using the record's accessors. Record patterns can be nested, as in `Line(Point(var x1, var y1), Point p2)`, and they can use `var` for component types. A record pattern does not match `null`, so a `Point` reference that is null fails the test cleanly.",
   "Flow scoping is the same idea used by pattern matching in `switch`, where a `case String s ->` label binds `s` only for that case's body. Both features remove a whole category of `ClassCastException` bugs, because the cast can no longer drift away from the test that protects it. They also make `equals` methods shorter: `return o instanceof Money m && cents == m.cents;` is a complete and safe implementation of the comparison logic.",
   "For exam questions, trace scope like the compiler does. Ask at each line: on every path that reaches here, did the pattern definitely match? If yes, the variable is in scope. If any path could reach this line after a failed match, the variable is not in scope and using it is a compile error."
  ],
  "analogy": "Picture a security desk that checks badges. When you pass the check, you are handed a visitor sticker with your name, and you may wear it anywhere inside the secure area. If you fail the check, you never get a sticker, so you cannot show one in the waiting room (the `else` block or the right side of `||`). If the rule is turn away anyone without a badge, then everyone still standing in the hallway afterward must have a sticker, which is the negated `if` with an early return.",
  "terms": [
   [
    "Pattern matching for instanceof",
    "An instanceof test that also binds the value to a new variable of the tested type when it matches."
   ],
   [
    "Pattern variable",
    "The variable declared by a pattern, such as s in o instanceof String s."
   ],
   [
    "Flow scoping",
    "The rule that a pattern variable is in scope only where the compiler can prove the match succeeded."
   ],
   [
    "Record pattern",
    "A pattern such as Point(int x, int y) that tests for a record type and binds its components."
   ],
   [
    "Definite matching",
    "The compiler's analysis of which code paths can only be reached after a successful match."
   ]
  ],
  "example": "An equals method used to be written with instanceof and a cast on separate lines. Rewriting it as `return o instanceof Money m && cents == m.cents && currency.equals(m.currency);` removes the cast and keeps the whole check in one readable expression.",
  "mistakes": [
   [
    "Using the pattern variable after `||` in the same condition.",
    "The right side of || runs only when the match failed, so the variable is not in scope there; use && when the second test depends on the binding."
   ],
   [
    "Believing `null instanceof String s` throws a NullPointerException.",
    "instanceof is simply false for null, and no variable is bound."
   ],
   [
    "Expecting the pattern variable to be usable in the else block.",
    "The else block runs when the match failed, so the variable is out of scope there."
   ],
   [
    "Reusing the name of an existing local variable for the pattern variable.",
    "A pattern variable cannot shadow a local already in scope; that is a compile error."
   ]
  ],
  "tryit": [
   [
    "Kai writes a method that starts with `if (!(shape instanceof Circle c)) { System.out.println(\"not a circle\"); }` and then uses `c.radius()` on the next line. It does not compile. What is wrong, and what one-word change fixes it?",
    "The if block can complete normally, so the line after it can be reached when the match failed, and c is not in scope. Adding `return;` (or throwing) at the end of the block makes the following line reachable only after a successful match, so c comes into scope."
   ]
  ],
  "tip": "After &&, the pattern variable is usable; after ||, it is not. With a negated test whose block always returns or throws, the variable is in scope after the if statement. instanceof is always false for null.",
  "check": [
   [
    "Is `s` in scope in the else block of `if (o instanceof String s) { } else { }`?",
    "No. In the else block the match failed, so s is not definitely matched."
   ],
   [
    "What does `null instanceof String s` evaluate to?",
    "false. instanceof never matches null, so no variable is bound."
   ],
   [
    "Why does `if (o instanceof String s || s.length() > 0)` fail to compile?",
    "The right side of || runs only when the match failed, so s is not in scope there."
   ],
   [
    "Does `Integer i = 5; if (i instanceof String s) {}` compile?",
    "No. Integer and String are incompatible types, so the compiler rejects the test."
   ]
  ]
 },
 {
  "t": "Encapsulation, immutable objects and var local type inference",
  "hook": "Monday morning at Bluepine Events, the scheduling dashboard shows an empty calendar for the whole sales team. Nobody deleted anything on purpose. Rosa digs in and finds that `Schedule.getMeetings()` hands back the class's own internal `ArrayList`, and a reporting module called `clear()` on it to reuse the list. One shared reference, one careless call, and a week of meetings vanished from memory. Rosa's lead asks her to make `Schedule` impossible to break from the outside. While refactoring, she also notices a new hire wrote `var meetings;` with no initializer and wonders why that will not compile. What does truly protecting an object's state take?",
  "simple": "Encapsulation means an object keeps its data private and lets others change it only through methods it controls, the way a bank lets you deposit through a teller instead of reaching into the vault. An immutable object goes further: once it is built, nothing about it can ever change, like a printed receipt. To get there, you mark fields private and final, skip setters, and hand out copies of any lists instead of your own. Separately, `var` lets Java figure out a local variable's type from the value you give it, so `var name = \"Ana\";` makes `name` a String. The type still never changes later; `var` just saves typing.",
  "body": [
   "Encapsulation means hiding an object's internal state and exposing it only through methods you control. In practice you make fields `private` and provide methods such as getters and setters, or better, meaningful operations like `deposit(amount)` and `withdraw(amount)`. Because callers cannot reach the fields directly, the class can validate every change, keep its invariants (rules that must always hold, such as a balance never going negative) and change its internal representation later without breaking other code. On the exam, a class with public mutable fields is the classic example of poor encapsulation.",
   "Java has four access levels, and encapsulated classes use the narrowest level that works. `private` members are visible only inside the top-level class that declares them, which includes any nested classes within it. Package-private, the default when you write no modifier, means visible to all classes in the same package. `protected` adds access from subclasses in other packages, through inheritance, on top of package access. `public` means visible everywhere the class itself is visible. Questions often hinge on the difference between package-private and protected, so remember that protected is the wider of the two.",
   "An immutable object cannot change after construction, which makes it safe to share between threads and use as a map key. The usual recipe has five parts. Make the class `final`, or give it only private constructors, so subclasses cannot add mutable behavior or override methods. Make all fields `private final`. Provide no setters or other methods that modify state. Initialize every field in the constructor. Make defensive copies of mutable inputs and outputs, such as lists, arrays and dates from older libraries, so callers cannot change your state through a shared reference. `String`, the wrapper classes such as `Integer`, and the `java.time` classes are immutable. Records give you most of this automatically, apart from the defensive copies, which you add in a compact constructor.",
   "```java\npublic final class Team {\n    private final String name;\n    private final List<String> members;\n\n    public Team(String name, List<String> members) {\n        this.name = name;\n        this.members = List.copyOf(members);   // defensive copy\n    }\n    public String name() { return name; }\n    public List<String> members() { return members; } // already unmodifiable\n}\n```",
   "In that example, `List.copyOf` creates an unmodifiable copy, so later changes to the caller's list do not affect the team, and returning the stored list is safe because nobody can modify it. If the field held an ordinary `ArrayList`, the getter would also need to return a copy or an unmodifiable view. Note that `final` on a field only prevents reassignment of the reference; it does not stop the object it points to from changing, which is exactly why the defensive copy matters.",
   "Local variable type inference with `var` lets the compiler work out a local variable's type from its initializer. `var list = new ArrayList<String>();` makes `list` an `ArrayList<String>`, exactly as if you had written the type. The type is still static and fixed at compile time; `var` is not dynamic typing, so assigning a value of an incompatible type later is a compile error. Hover over a `var` in an integrated development environment (IDE) and it shows the inferred type.",
   "`var` has strict rules that the exam tests line by line. It can be used only for local variables, including those declared in `for` loops, enhanced `for` loops and try-with-resources, and for lambda parameters (where if one parameter uses `var`, all must). It cannot be used for fields, method parameters, constructor parameters or return types. It needs an initializer in the same declaration, and that initializer cannot be `null` alone, an array initializer like `{1, 2}`, or a lambda or method reference without a target type. You cannot declare several variables in one `var` statement, so `var a = 1, b = 2;` fails, and you cannot add array brackets as in `var[] a`. `var` is a reserved type name, not a keyword, so it can still be used as a variable or method name, but not as the name of a class, interface or other type.",
   "Watch for inferred types that surprise you. `var n = 10;` is an `int`, so `n = 3.5;` fails. `var big = 10L;` is a `long`. `var list = new ArrayList<>();` combines `var` with the diamond and infers `ArrayList<Object>`, which is legal but rarely what you want. `var c = 'a' + 1;` is an `int`, because arithmetic on a `char` promotes it. `var s = (String) null;` compiles, because the cast gives the compiler a type. Use `var` when the type is obvious from the right side, and write the type explicitly when it helps a reader."
  ],
  "analogy": "Encapsulation is a bank teller window: you can ask for a deposit or withdrawal, but you never touch the vault, so the bank can enforce rules on every request. An immutable object is a notarized document: once stamped, no one edits it, and if you want a change you get a new document. A defensive copy is handing out a photocopy instead of the original. The analogy does not cover `var`, which has nothing to do with protection; it is only the compiler filling in a type you could have written yourself.",
  "terms": [
   [
    "Encapsulation",
    "Keeping fields private and controlling access to an object's state through methods."
   ],
   [
    "Immutable object",
    "An object whose state cannot change after construction, such as a String or a well-designed record."
   ],
   [
    "Defensive copy",
    "A copy of a mutable input or output that prevents outside code from changing an object's internal state."
   ],
   [
    "var",
    "A reserved type name that makes the compiler infer a local variable's type from its initializer."
   ],
   [
    "Package-private",
    "The default access level with no modifier, visible only to classes in the same package."
   ]
  ],
  "example": "A `Schedule` class returned its internal `ArrayList` of meetings from a getter, and a caller cleared it by accident, wiping the calendar. Returning `List.copyOf(meetings)` instead, and storing a copy in the constructor, made the class immutable from the outside.",
  "mistakes": [
   [
    "Believing `private final List<String> items` makes the list itself unchangeable.",
    "final only prevents reassigning the field. The list can still be modified unless you store an unmodifiable copy, such as List.copyOf(items)."
   ],
   [
    "Thinking `var` makes Java dynamically typed.",
    "The inferred type is fixed at compile time; var x = 10 is an int forever, and assigning a String later is a compile error."
   ],
   [
    "Using `var` for a field or method parameter.",
    "var is allowed only for local variables and lambda parameters, never fields, parameters of methods or constructors, or return types."
   ],
   [
    "Assuming protected is more restrictive than package-private.",
    "protected includes package access plus access from subclasses in other packages, so it is wider than the default."
   ]
  ],
  "tryit": [
   [
    "A code review shows four lines in a method: `var count;`, `var total = 0, max = 0;`, `var names = new ArrayList<String>();` and `var empty = null;`. Which lines compile, and why do the others fail?",
    "Only `var names = new ArrayList<String>();` compiles. `var count;` has no initializer, `var total = 0, max = 0;` declares two variables in one var statement, and `var empty = null;` gives the compiler no type to infer."
   ],
   [
    "Your `Invoice` class is final with private final fields and no setters, but its constructor stores the caller's `List<LineItem>` directly. Is Invoice immutable? What would you change?",
    "No. The caller still holds the same list and can add or remove items after construction. Store List.copyOf(items) in the constructor, and if LineItem itself is mutable, make it immutable too (for example as a record)."
   ]
  ],
  "tip": "For var, check each line for a field or parameter use, a missing initializer, a null or {array} initializer, or several variables in one declaration; each is a compile error. For immutability, look for a missing defensive copy.",
  "check": [
   [
    "Does `var x;` followed by `x = 5;` compile?",
    "No. var requires an initializer in the declaration so the type can be inferred."
   ],
   [
    "Why must an immutable class copy a `List` passed to its constructor?",
    "Otherwise the caller keeps a reference to the same list and can change the object's state after construction."
   ],
   [
    "Can `var` be used as the type of an instance field?",
    "No. var is only for local variables and lambda parameters."
   ],
   [
    "What type does `var list = new ArrayList<>();` infer?",
    "ArrayList<Object>, because the diamond has nothing else to infer from."
   ]
  ]
 },
 {
  "t": "Object lifecycle and garbage collection eligibility",
  "hook": "The on-call phone at Northgate Ticketing buzzes at 3 a.m.: the booking server's memory use has climbed for six days and it just slowed to a crawl. Sam restarts it, which buys a few days, but the pattern repeats. A heap dump shows millions of `Session` objects from users who logged out long ago. Java is supposed to clean up unused objects automatically, so why are these still here? Sam needs to understand exactly when the garbage collector is allowed to reclaim an object, and why calling `System.gc()` in a panic will not fix anything.",
  "simple": "When your Java program creates objects, they take up memory. You never delete them yourself. Instead, a cleanup helper called the garbage collector looks for objects that your program can no longer reach through any variable, directly or through other objects, and frees their memory. An object becomes available for cleanup when the last path to it disappears, for example when you set its variable to `null`, point the variable at a different object, or the method holding the variable ends. Think of balloons tied to strings: a balloon with no string still held by anyone floats away. Java decides on its own when to actually clean up, so you can only know an object is eligible, not when it will go.",
  "body": [
   "Objects in Java are created on the heap, usually with `new`, and they live as long as they are needed. You never free memory yourself. Instead, the garbage collector (GC), part of the Java Virtual Machine (JVM), finds objects that the program can no longer reach and reclaims their memory. Variables are a different thing from objects: a variable holds either a primitive value or a reference to an object, and local variables live in a stack frame while their method runs. Keeping that distinction clear is the key to every garbage collection question, because the exam counts objects, not variables.",
   "An object becomes eligible for garbage collection when no live thread can reach it through any chain of references starting from a GC root. Roots include local variables and parameters of methods that are currently running, static fields of loaded classes, and active threads themselves. An object can lose its last reference in three common ways: a variable that referred to it is set to `null`, the variable is reassigned to a different object, or the variable goes out of scope when its method or block ends. If another reachable object still holds a reference to it, for example through a field or a collection, it remains reachable and is not eligible.",
   "Eligible does not mean collected. The JVM decides when, and whether, to run the collector, based on memory pressure and its own algorithms. `System.gc()` is only a request that the JVM may ignore, so no exam answer can rely on it, and a correct answer never says an object is guaranteed to be collected at a given line. That is why questions ask how many objects are eligible at a given line, not how many have been collected. Objects that only reference each other, with no path from a root, are eligible too; this group is sometimes called an island of isolation. Java's collector works by reachability, so it handles cycles correctly, unlike simple reference-counting schemes that would keep a cycle alive forever.",
   "```java\npublic class Demo {\n    public static void main(String[] args) {\n        String a = new String(\"A\");   // object 1\n        String b = new String(\"B\");   // object 2\n        a = b;                        // object 1 now unreachable\n        String c = new String(\"C\");   // object 3\n        b = null;                     // object 2 still referenced by a\n        c = a;                        // object 3 now unreachable\n        // Line X: objects 1 and 3 are eligible; object 2 is reachable via a and c\n    }\n}\n```",
   "Trace such questions by drawing boxes for objects and arrows for references, then updating the arrows line by line. In the example, after `a = b` the arrow from `a` moves to object 2, leaving object 1 with no arrows. Setting `b = null` removes one arrow from object 2, but `a` still points to it. Finally `c = a` moves `c` away from object 3, leaving it unreachable. At the requested line, count the boxes with no incoming arrow from a live variable or from another reachable object. Be careful with string literals: literals live in the string pool and remain reachable, so they are not the kind of objects these questions count, which is why exam code uses `new String(...)` or custom classes.",
   "Some questions involve objects that refer to each other through fields. If `Node n1 = new Node(); Node n2 = new Node(); n1.next = n2; n2.next = n1; n1 = null; n2 = null;`, both nodes are eligible after the last line, even though each still points to the other, because neither can be reached from a root. If instead only `n1 = null` runs, both nodes are still reachable through `n2`, since `n2.next` points to the first node.",
   "The `Object.finalize()` method was meant to run before an object is collected, but it is deprecated for removal and you should never depend on it; there is no guarantee it runs at all, or when. For releasing resources such as files, sockets and database connections, use try-with-resources and `close()`, which run at a predictable point in your code rather than at the collector's convenience.",
   "In practice, memory leaks in Java come from references that are kept by accident, such as objects added to a static collection and never removed, listeners that are registered but never unregistered, or caches without an eviction policy. The GC cannot collect anything that is still reachable, no matter how useless it is to the program. Fixing a leak means removing the reference, not calling the collector more often."
  ],
  "analogy": "Picture a fair with helium balloons. Each balloon is an object, each string is a reference, and each child holding strings is a GC root. A balloon tied only to another balloon that nobody holds will still drift away, which is the island of isolation. Letting go of a string makes a balloon eligible to float off, but the wind decides exactly when it leaves, just as the JVM decides when collection happens. The analogy fails in one way: real balloons always leave eventually, while an eligible object might never be collected before the program ends.",
  "terms": [
   [
    "Garbage collector",
    "The JVM component that automatically reclaims memory used by unreachable objects."
   ],
   [
    "Eligible for garbage collection",
    "An object that no live thread can reach from any GC root; it may be collected at any later time or never."
   ],
   [
    "GC root",
    "A starting point for reachability, such as a local variable in an active method, a static field or an active thread."
   ],
   [
    "Island of isolation",
    "A group of objects that reference each other but cannot be reached from any root, so all are eligible."
   ],
   [
    "Heap",
    "The memory area where objects are allocated and from which the garbage collector reclaims space."
   ]
  ],
  "example": "A web application caches every user session in a static HashMap and never removes entries. Even after users log out, the sessions stay reachable through the static field, so they are never eligible for collection and the server slowly runs out of memory. Evicting entries on logout fixes it.",
  "mistakes": [
   [
    "Choosing an answer that says `System.gc()` forces collection.",
    "It is only a request the JVM may ignore. No code can guarantee when, or whether, an eligible object is collected."
   ],
   [
    "Counting variables set to null instead of objects with no references.",
    "Eligibility is about objects. An object stays reachable if any live variable or reachable object still refers to it, even if one of its variables was set to null."
   ],
   [
    "Believing objects in a reference cycle can never be collected.",
    "Java uses reachability from roots, so a cycle with no path from a root is eligible."
   ],
   [
    "Relying on finalize() to close files.",
    "finalize() is deprecated for removal and may never run; use try-with-resources so close() runs predictably."
   ]
  ],
  "tryit": [
   [
    "Consider `Box x = new Box(); Box y = new Box(); x.inner = y; y = null;`. Then `x = new Box();` runs. How many of the Box objects created so far are eligible for garbage collection at that point, and why?",
    "Two. The first Box was reachable only through x, which now points to the third Box, so it is eligible. The second Box was reachable through y (now null) and through the first Box's inner field, but the first Box is itself unreachable, so the second is eligible too. The third Box is referenced by x."
   ]
  ],
  "tip": "Count reachable objects, not variables. Draw references on paper line by line, remember that cycles with no root are eligible, and remember that System.gc() guarantees nothing.",
  "check": [
   [
    "Does calling `System.gc()` guarantee that eligible objects are collected?",
    "No. It is only a suggestion; the JVM decides when collection happens."
   ],
   [
    "If objects A and B reference each other but nothing else references them, are they eligible?",
    "Yes. Neither can be reached from a GC root, so both are eligible despite the cycle."
   ],
   [
    "When does a local object created in a method become eligible if no reference escapes?",
    "When the method returns and its local variable goes out of scope, or earlier if the variable is reassigned or set to null."
   ],
   [
    "Why do exam questions use `new String(\"A\")` rather than the literal \"A\"?",
    "Literals live in the string pool and stay reachable, so only explicitly created objects behave predictably for eligibility counting."
   ]
  ]
 },
 {
  "t": "Checked vs unchecked exceptions and the Throwable hierarchy",
  "hook": "Two builds fail at Saltmarsh Analytics on the same morning. Imani's report generator will not compile because a call to `Files.readString` says \"unreported exception IOException; must be caught or declared to be thrown.\" Meanwhile Tomas's code compiles cleanly but crashes in production with a `NumberFormatException` when a customer types \"12a\" into a quantity box. Both are exceptions, yet the compiler forced one to be handled and ignored the other entirely. Imani asks why Java treats them so differently. The answer is one family tree, and knowing where each exception sits on it decides a large share of exam questions.",
  "simple": "An exception is Java's way of saying something went wrong, so stop what you are doing and let someone handle it. Java sorts these problems into two groups. Checked exceptions are problems outside your program's control that you should plan for, like a file that might be missing; the compiler insists you either handle them or warn callers about them. Unchecked exceptions usually mean a bug in the code, like dividing by zero or using a null reference; the compiler does not force you to handle them, because the real fix is to correct the code. It is like a landlord who requires renters insurance for floods (checked) but not for forgetting your keys (unchecked).",
  "body": [
   "An exception is an object that signals something unexpected happened, and throwing it interrupts the normal flow of the program until some code catches it. All exceptions and errors in Java descend from `java.lang.Throwable`. `Throwable` has two direct subclasses. `Error` is for serious problems in the Java Virtual Machine (JVM) or the environment that applications normally should not try to handle, such as `OutOfMemoryError` and `StackOverflowError`. `Exception` is for conditions a program might reasonably handle. `RuntimeException` is a subclass of `Exception`, and that position is what makes it special.",
   "Java splits this tree into checked and unchecked exceptions. Unchecked exceptions are `RuntimeException`, `Error` and all of their subclasses. Checked exceptions are `Throwable` itself, `Exception`, and every subclass of `Exception` that is not under `RuntimeException`. The difference is enforced by the compiler through the handle-or-declare rule: if code can throw a checked exception, the enclosing method must either catch it in a `try`/`catch` or declare it with `throws` in its signature. Unchecked exceptions carry no such requirement, though you may still catch or declare them if you choose.",
   "The reasoning behind the split is about who can prevent the problem. Checked exceptions represent conditions outside your code's control that a caller should plan for, such as a missing or unreadable file (`IOException` and its subclass `FileNotFoundException`) or a failure talking to a database. Unchecked exceptions usually represent programming bugs that should be fixed rather than caught, such as `NullPointerException`, `ArrayIndexOutOfBoundsException`, `ClassCastException`, `ArithmeticException` and `IllegalArgumentException` with its subclass `NumberFormatException`. `IllegalStateException` and `UnsupportedOperationException` are unchecked too.",
   "```java\nvoid read(Path p) throws IOException {      // declares the checked exception\n    Files.readString(p);                      // may throw IOException\n}\nvoid safe(Path p) {\n    try {\n        read(p);\n    } catch (IOException e) {               // handles it\n        System.out.println(\"missing: \" + e.getMessage());\n    }\n}\nvoid bug(String s) {\n    Integer.parseInt(s);  // NumberFormatException is unchecked: no handling required\n}\n```",
   "In that example, `read` chooses to declare, pushing the decision to its caller, and `safe` chooses to handle. If `safe` did neither, the compiler would report the unreported `IOException`. The `bug` method compiles without any handling, because `NumberFormatException` is unchecked; if the string is not a number, the exception simply propagates up the call stack at run time.",
   "It also helps to know who typically throws what. The JVM itself throws `NullPointerException`, `ArithmeticException` (for integer division by zero), `ArrayIndexOutOfBoundsException`, `ClassCastException` and errors such as `StackOverflowError` and `OutOfMemoryError`. Library code and programmers throw `IllegalArgumentException`, `NumberFormatException`, `IllegalStateException`, `IOException` and others explicitly with `throw new ...`. Keep the two keywords straight: the `throw` statement throws one exception object right now, while the `throws` clause in a method header declares which exceptions the method may let escape.",
   "`Throwable` provides the methods you use to inspect exceptions. `getMessage()` returns the detail message, which may be null. `toString()` returns the class name followed by a colon and the message. `printStackTrace()` prints the exception and the call stack to standard error. `getCause()` returns the exception that caused this one, which matters when code wraps a low-level exception in a higher-level one, as in `throw new ReportException(\"template missing\", e);`. Wrapping a checked exception in an unchecked one is a common way to pass it through code, such as a lambda, that cannot declare checked exceptions.",
   "The hierarchy also tells you what each catch block covers and how to define your own exceptions. `catch (Exception e)` catches every checked exception and every `RuntimeException`, but not an `Error`, because `Error` is not a subclass of `Exception`. `catch (Throwable t)` catches everything, which is almost never appropriate in application code because it also swallows errors like `OutOfMemoryError` that the program cannot meaningfully recover from. When you write a custom exception, its superclass decides its category: `class TemplateMissingException extends Exception` creates a checked exception that callers must handle or declare, while `class InvalidQuantityException extends RuntimeException` creates an unchecked one. Custom exceptions conventionally provide constructors that take a message and a cause and pass them to `super`.",
   "When a question asks whether code compiles, find every call that can throw a checked exception and make sure each one is inside a `try` that catches that type or a supertype, or that the method declares it or a supertype. Unchecked exceptions never cause these compile errors. Overriding adds one more twist covered elsewhere: an overriding method may not declare broader checked exceptions than the method it overrides."
  ],
  "analogy": "Think of a building's safety code. Some hazards, like a possible gas leak, are outside the tenant's control, so the inspector requires a detector or a written plan before you may open: those are checked exceptions, and the compiler is the inspector. Other problems, like leaving a door unlocked, are the tenant's own mistake; the inspector does not require a plan for them, you are just expected to fix your habits. That is the unchecked branch. The analogy stops at Error: those are like an earthquake, which no tenant is expected to handle at all.",
  "mnemonic": "R and E roam free: RuntimeException and Error, plus everything below them, are unchecked. Every other Exception must be handled or declared.",
  "terms": [
   [
    "Throwable",
    "The root class of everything that can be thrown, with direct subclasses Error and Exception."
   ],
   [
    "Checked exception",
    "A subclass of Exception, but not of RuntimeException, that must be caught or declared."
   ],
   [
    "Unchecked exception",
    "RuntimeException, Error or any of their subclasses, which the compiler does not require you to handle."
   ],
   [
    "Handle-or-declare rule",
    "The compiler requirement that code throwing a checked exception either catches it or lists it in throws."
   ],
   [
    "throws clause",
    "The part of a method header that declares which exceptions the method may let propagate to its caller."
   ]
  ],
  "example": "A report generator reads a template file. Because `Files.readString` throws the checked IOException, the compiler forces the developer to decide what should happen when the file is missing, and the team chooses to catch it and show a clear message instead of crashing with a stack trace.",
  "mistakes": [
   [
    "Classifying NumberFormatException as checked because parsing input feels like an external problem.",
    "It extends IllegalArgumentException, which extends RuntimeException, so it is unchecked."
   ],
   [
    "Calling Error a kind of Exception.",
    "Error and Exception are sibling subclasses of Throwable; an Error is not an Exception, and catch (Exception e) does not catch it."
   ],
   [
    "Mixing up throw and throws.",
    "throw is a statement that throws one object now; throws is part of a method signature that declares what may escape."
   ],
   [
    "Believing unchecked exceptions cannot be caught.",
    "They can be caught or declared; the compiler simply does not require it."
   ]
  ],
  "tryit": [
   [
    "A method `loadConfig()` calls `Files.readAllLines(path)` and `Integer.parseInt(line)` but has no try block and no throws clause. A reviewer says it will not compile. Which call causes the error, and what are two ways to fix it?",
    "Files.readAllLines throws the checked IOException, so it causes the error; parseInt's NumberFormatException is unchecked and does not. Fix it by wrapping the call in try/catch (IOException e), or by adding throws IOException (or a supertype) to loadConfig's signature."
   ]
  ],
  "tip": "Memorize the split: RuntimeException and Error subtypes are unchecked; every other Exception is checked. IOException and FileNotFoundException are checked; NumberFormatException is unchecked.",
  "check": [
   [
    "Is `NumberFormatException` checked or unchecked?",
    "Unchecked. It extends IllegalArgumentException, which extends RuntimeException."
   ],
   [
    "What must a method do if it calls code that throws `IOException`?",
    "Catch IOException (or a supertype) or declare throws IOException (or a supertype) in its signature."
   ],
   [
    "Is `StackOverflowError` an Exception?",
    "No. It is an Error, which is a Throwable but not an Exception, and it is unchecked."
   ],
   [
    "Which keyword appears in a method header to declare exceptions: throw or throws?",
    "throws; throw is the statement that actually throws an exception object."
   ]
  ]
 },
 {
  "t": "Try/catch/finally flow, including return in try and finally",
  "hook": "It is the end of a long sprint at Kestrel Logistics, and the error dashboard looks suspiciously calm. Too calm: failed shipment updates have stopped appearing in the logs entirely, yet customers are calling about missing orders. Hana traces it to a helper method where a teammate added `return STATUS_OK;` inside a `finally` block to make sure the method always returned something. Since then, every exception thrown in the `try` block has silently vanished. Hana knows `finally` always runs, but she never realized it could swallow an exception. What exactly happens to returns and exceptions when `try` and `finally` collide?",
  "simple": "A `try` block holds code that might fail. A `catch` block says what to do if a certain kind of failure happens. A `finally` block holds cleanup that should run no matter what, like turning off the stove whether dinner turned out well or burned. The tricky part is returning a value. If the `try` block says `return 5`, Java remembers the 5, runs the `finally` cleanup, and then returns the remembered 5, even if the cleanup changed the variable. But if the `finally` block has its own `return`, that one wins and replaces everything, even an error that was on its way out, which is why programmers avoid returning from `finally`.",
  "body": [
   "A `try` statement groups code that might throw with the code that handles or cleans up after it. A `try` block must be followed by at least one `catch` block, a `finally` block, or both; a plain `try` alone does not compile. Try-with-resources is the one form that may stand without either, because its automatic resource closing plays the cleanup role. Braces are required for every block, even when a block contains a single statement, unlike `if` and loops. When an exception is thrown inside the `try`, the rest of the `try` block is skipped immediately, and Java checks the `catch` blocks from top to bottom, running only the first one whose declared type matches the exception's type or one of its supertypes. If no catch matches, the exception propagates to the caller, but only after the `finally` block runs.",
   "The `finally` block runs whether the `try` completes normally, a `catch` handles an exception, or an exception escapes uncaught. It also runs when the `try` or a `catch` exits early with `return`, `break` or `continue`. That reliability makes it the natural place for cleanup such as releasing a lock or resetting a flag. The only practical ways to skip it are for the Java Virtual Machine (JVM) to stop, for example with `System.exit()`, for the process to be killed, or for the thread to die abruptly. On the exam, assume `finally` runs unless you see `System.exit`.",
   "Returns interact with `finally` in a precise order that the exam tests often. If the `try` (or a `catch`) executes `return expr;`, the expression is evaluated first and its value is saved. Then the `finally` block runs, and then the method returns the saved value. So if `finally` changes a local primitive variable, the returned value does not change, because the saved copy is already fixed. If the returned value is a reference to a mutable object, however, changes the `finally` makes to that object, such as adding to a list or setting a field, are visible to the caller, because the saved value is the reference and both point to the same object.",
   "If the `finally` block itself executes `return`, that return wins. It replaces the value from the `try` or `catch`, and it also discards any exception that was propagating, so the caller sees a normal return and never learns that anything failed. The same loss happens if `finally` throws a new exception: the original exception is replaced by the new one. That is why returning or throwing from `finally` is considered bad practice, why some compilers and tools warn about it, and why exam questions love it.",
   "```java\nstatic int test() {\n    int x = 1;\n    try {\n        return x;          // value 1 is saved\n    } finally {\n        x = 99;            // does not change the saved value\n        System.out.print(\"finally \");\n    }\n}\n// prints: finally, and test() returns 1\n\nstatic int override() {\n    try {\n        throw new RuntimeException(\"boom\");\n    } finally {\n        return 42;         // exception discarded, 42 returned\n    }\n}\n```",
   "In `test()`, the value 1 is captured when `return x` executes, `finally` prints and sets `x` to 99, and the method still returns 1. In `override()`, the `RuntimeException` starts propagating, `finally` runs and returns 42, and the exception disappears without a trace. A caller printing `override()` sees 42 and no stack trace.",
   "When tracing output, follow the exact path. Run the statements in `try` up to the throw, then the matching `catch`, then `finally`, then either the code after the whole statement (if the exception was handled) or a jump to the caller (if not). If a `catch` block itself throws a new exception, `finally` still runs before that new exception propagates, and statements after the try statement are skipped. If no exception occurs at all, the `catch` blocks are skipped entirely and `finally` runs after the last statement of `try`. Writing the sequence down, one block per line, is the most reliable way to avoid mistakes in multi-print questions.",
   "Also note scope. A variable declared inside the `try` block is local to that block and is not visible in `catch` or `finally`, so code such as `try { int n = 5; } finally { System.out.println(n); }` does not compile. Declare the variable before the `try` if those blocks need it, and give it an initial value if the compiler cannot prove it is assigned on every path.",
   "A good habit for exam questions is to annotate each block with when it runs: try always starts, catch runs only for a matching exception, and finally runs on every path except a JVM exit. Then mark any `return` in `try` or `catch` as saved and any `return` in `finally` as final."
  ],
  "analogy": "Think of checking out of a hotel. You hand the clerk your bill amount (the return value from `try`), and on the way out the porter always does a room check (`finally`). If the porter moves furniture around, your bill does not change, because the clerk already wrote it down. But if the porter tears up the bill and writes a new one, the new one is what you pay, and any complaint you were carrying out the door gets thrown away with it. The analogy covers primitives well; with a mutable object, the porter can change the actual object you are taking home.",
  "terms": [
   [
    "try block",
    "A block containing code that might throw, followed by catch and/or finally blocks."
   ],
   [
    "catch block",
    "A handler that runs when an exception of its declared type, or a subtype, is thrown in the try."
   ],
   [
    "finally block",
    "A block that runs after try and catch whatever happens, unless the JVM exits."
   ],
   [
    "Exception propagation",
    "An uncaught exception leaving the current method and moving up the call stack to the caller."
   ],
   [
    "Saved return value",
    "The value of a return expression in try or catch, evaluated before finally runs and returned afterward unless finally returns."
   ]
  ],
  "example": "A method opens a database transaction in a try block and marks it finished in finally. When a teammate adds `return` inside the finally to return a status code, errors from the try block start disappearing from the logs, because a return in finally discards the propagating exception.",
  "mistakes": [
   [
    "Expecting that `x = 99` in finally changes the value already returned from try.",
    "The return expression was evaluated and saved before finally ran; changing a local primitive afterward has no effect on it."
   ],
   [
    "Believing finally is skipped when try executes return.",
    "finally runs on return, break and continue as well; only stopping the JVM, such as System.exit, skips it."
   ],
   [
    "Thinking an exception from try still reaches the caller when finally returns.",
    "A return in finally discards the propagating exception, and the method completes normally with the finally's value."
   ],
   [
    "Using a variable declared inside try from the catch or finally block.",
    "Its scope is the try block only. Declare it before the try statement."
   ]
  ],
  "tryit": [
   [
    "A method has `StringBuilder sb = new StringBuilder(\"a\"); try { return sb; } finally { sb.append(\"b\"); }`. A caller prints the result. Will it print a or ab, and why does this differ from returning an int?",
    "It prints ab. The saved return value is a reference to the StringBuilder, and finally modifies that same object before the method returns. With an int, the saved value is a copy of the number, so later changes to the variable do not affect it."
   ],
   [
    "In `try { System.out.print(\"A\"); throw new IllegalStateException(); } catch (IllegalStateException e) { System.out.print(\"B\"); throw new RuntimeException(); } finally { System.out.print(\"C\"); } System.out.print(\"D\");`, what prints before the RuntimeException reaches the caller?",
    "ABC. The catch runs and throws, finally still runs, and D is skipped because the new exception propagates out of the method."
   ]
  ],
  "tip": "The return value is fixed when return in try executes; finally runs afterward and can only replace it by returning itself. A return or throw in finally hides any earlier exception, and only a JVM exit skips finally.",
  "check": [
   [
    "Does `try { }` with no catch or finally compile?",
    "No. A plain try needs at least one catch or a finally block."
   ],
   [
    "If try returns a local int and finally increments that variable, what value is returned?",
    "The original value. It was evaluated and saved before finally ran."
   ],
   [
    "What happens to an exception thrown in try if finally executes `return 0;`?",
    "It is discarded, and the method returns 0 normally."
   ],
   [
    "Does finally run if the try block calls `System.exit(0)`?",
    "No. Exiting the JVM stops the program before finally can run."
   ]
  ]
 },
 {
  "t": "Multi-catch rules: no related types; the catch variable is effectively final",
  "hook": "Code review at Orchard Health Records: Malik has collapsed three identical catch blocks into one line, `catch (FileNotFoundException | IOException | DateTimeParseException e)`, and the build immediately fails. He removes `FileNotFoundException` and it compiles, but then he adds `e = new IOException(\"wrapped\")` to attach context and the compiler complains again, saying the parameter may not be assigned. In a single catch block that same assignment worked fine yesterday. Malik wonders why multi-catch is so much pickier. What are the rules, and why do they make sense?",
  "simple": "Sometimes several different problems need exactly the same response, like a help desk that answers both a forgotten password and a locked account with the same reset steps. Multi-catch lets you write one handler for several exception types by separating them with a vertical bar, like `catch (IOException | SQLException e)`. There are two rules. First, the types in the list cannot be parent and child, because the parent already covers the child, so listing both is pointless. Second, you cannot assign a new value to the variable `e` inside a multi-catch block, because Java would not know which type it should be.",
  "body": [
   "A multi-catch block handles several exception types with one handler by separating them with a vertical bar: `catch (IOException | SQLException e)`. It removes duplicated handler code when different exceptions need the same response, which keeps logging and recovery logic in one place where it cannot drift apart. There is exactly one variable name for the whole block, and it is placed after the last type. Each alternative is just a type name, so syntax such as `catch (IOException e1 | SQLException e2)` is invalid.",
   "The key rule is that the alternatives in a multi-catch cannot be related by subclassing. `catch (FileNotFoundException | IOException e)` does not compile, because `FileNotFoundException` is a subclass of `IOException` and the subclass alternative is redundant; catching `IOException` alone already covers it. The compiler reports that alternatives in a multi-catch statement cannot be related by subclassing. The same applies to `RuntimeException | IllegalArgumentException`, to `Exception | anything that extends Exception`, and to listing the same type twice. The types must be unrelated, such as siblings like `NumberFormatException | ArithmeticException` or types from separate branches of the hierarchy like `IOException | SQLException`.",
   "The catch parameter of a multi-catch is implicitly `final`. Assigning to it, as in `e = new IOException();`, is a compile error. The reason is that the variable's type is a combination of the alternatives, so there is no single type that a new value could safely have. In a single-type catch the parameter is not final, so reassignment compiles there, although it is poor style because it hides the original exception. You may also write `final` explicitly on either kind of catch parameter, which is legal but redundant in a multi-catch.",
   "Inside the block, the variable's static type is a union of the alternatives, and what you can call on it is determined by their closest common supertype. In `catch (NumberFormatException | ArithmeticException e)`, the common supertype is `RuntimeException`, so you can call methods of `RuntimeException` and its ancestors, such as `getMessage()` and `printStackTrace()`. You cannot call a method that exists on only one of the alternatives without first checking the type and casting, for example with `if (e instanceof NumberFormatException nfe)`.",
   "```java\ntry {\n    String s = args[0];\n    int n = Integer.parseInt(s);\n    System.out.println(10 / n);\n} catch (ArrayIndexOutOfBoundsException | NumberFormatException e) {\n    System.out.println(\"bad input: \" + e.getMessage());\n    // e = null;   // does not compile: multi-catch parameter is final\n} catch (ArithmeticException e) {\n    e = new ArithmeticException(\"changed\");  // legal in single catch\n    System.out.println(\"zero\");\n}\n```",
   "In the example, a missing argument and a non-numeric argument both lead to the same bad input message through the multi-catch. Division by zero goes to the separate single-type catch, where reassigning `e` compiles even though it is not good practice. The two alternatives in the multi-catch are unrelated, since `ArrayIndexOutOfBoundsException` extends `IndexOutOfBoundsException` and `NumberFormatException` extends `IllegalArgumentException`; both are runtime exceptions, but neither extends the other.",
   "Multi-catch also affects rethrowing. If you catch and rethrow the variable with `throw e;`, the compiler knows the exact set of types it can be, so the enclosing method only needs to declare those specific types, not a broad supertype. The same precise rethrow analysis works for a single catch of a broad type such as `Exception`, provided the variable is effectively final, meaning it is never reassigned in the block. If you do reassign a single-catch parameter, the compiler falls back to the declared type and the method must declare it.",
   "Ordering rules still apply between separate catch blocks. A multi-catch block that includes a type must not follow a block that already catches that type or one of its supertypes, or the compiler reports it as unreachable. A multi-catch alternative that is a specific checked exception the `try` cannot throw is also an error. The next lesson covers that ordering in detail.",
   "When an exam question shows a multi-catch, run a two-step check. First, compare every pair of types in the list and ask whether one extends the other; if so, the code does not compile. Second, scan the block for any assignment to the variable; if there is one, the code does not compile. If both checks pass, apply the usual ordering and reachability rules. Remember too that multi-catch is purely a convenience: any multi-catch could be rewritten as separate single-type blocks with copied bodies, so it never catches anything those separate blocks would not."
  ],
  "analogy": "A multi-catch is like a single drop-off bin labeled Paper or Plastic. It makes sense because paper and plastic are different things that get the same treatment. A bin labeled Plastic or Plastic Bottles would be silly, because plastic bottles are already plastic, which is the related-types rule. And once something is in the bin, you cannot swap it for a different item, because nobody would know whether the replacement belongs; that is the implicitly final variable.",
  "terms": [
   [
    "Multi-catch",
    "A catch block listing several exception types separated by |, sharing one handler and one variable."
   ],
   [
    "Related types",
    "Exception types where one is a subclass of another; they cannot both appear in the same multi-catch."
   ],
   [
    "Implicitly final parameter",
    "The multi-catch variable, which cannot be reassigned inside the block."
   ],
   [
    "Precise rethrow",
    "Rethrowing a caught, unmodified exception variable so the method only needs to declare the specific types that can actually occur."
   ],
   [
    "Union type",
    "The combined static type of a multi-catch variable, usable through the alternatives' closest common supertype."
   ]
  ],
  "example": "A file importer catches `IOException | DateTimeParseException e` in one block and writes the same \"could not import row\" message for both, instead of copying the logging code into two handlers that would drift apart over time.",
  "mistakes": [
   [
    "Listing a subclass and its superclass, such as FileNotFoundException | IOException.",
    "Related types are not allowed in one multi-catch; keep only the superclass, which already covers the subclass."
   ],
   [
    "Reassigning the multi-catch variable to wrap it, as in e = new IOException(e).",
    "The multi-catch parameter is implicitly final. Throw a new exception instead: throw new IOException(e);"
   ],
   [
    "Writing a separate variable name for each alternative.",
    "There is one variable name, after the last type: catch (A | B e)."
   ],
   [
    "Calling a method that exists only on one alternative directly on e.",
    "Only members of the common supertype are available; check with instanceof and use the pattern variable to reach type-specific methods."
   ]
  ],
  "tryit": [
   [
    "A teammate proposes `catch (IllegalArgumentException | NumberFormatException | IOException e)` for a method that parses a number from a file. Will it compile? If not, what is the smallest change that keeps the same behavior?",
    "It does not compile, because NumberFormatException extends IllegalArgumentException, so the two are related. Remove NumberFormatException; catching IllegalArgumentException already covers it, so the behavior is the same: catch (IllegalArgumentException | IOException e)."
   ]
  ],
  "tip": "In a multi-catch, check two things: that no type in the list is a subclass of another, and that the variable is never assigned. Either mistake is a compile error.",
  "check": [
   [
    "Does `catch (IOException | Exception e)` compile?",
    "No. IOException is a subclass of Exception, so the types are related."
   ],
   [
    "Can you assign a new value to `e` inside `catch (IOException | SQLException e)`?",
    "No. The multi-catch parameter is implicitly final."
   ],
   [
    "Can you reassign `e` inside a single-type `catch (IOException e)`?",
    "Yes. A single-type catch parameter is not final, although reassigning it is poor style."
   ],
   [
    "In `catch (NumberFormatException | ArithmeticException e)`, which type's methods can you call on e without a cast?",
    "Those of RuntimeException and its supertypes, the closest common supertype of the alternatives."
   ]
  ]
 },
 {
  "t": "Catch block ordering and unreachable catch compile errors",
  "hook": "Late on a Thursday at Silverlake Transit, Joon wants every failure in the fare-sync job logged, so he adds `catch (Exception e)` at the very top of an existing handler chain. The build breaks with \"exception IOException has already been caught\" pointing at a handler two blocks below. Annoyed, he moves the broad catch to the bottom, and while he is there he adds a `catch (SQLException e)` for safety. Now the compiler complains that `SQLException` is never thrown in the body of the try. Joon thought catch blocks were just a list of possibilities. Why does the compiler care about their order and about exceptions that cannot happen?",
  "simple": "When an error happens, Java looks at your catch blocks from top to bottom and uses the first one that fits. A catch for a general type, like `Exception`, fits almost everything, so if you put it first, the more specific catches below it can never be used. Java refuses to compile code with handlers that can never run. So you list the specific ones first and the general ones last, like sorting mail into named boxes first and putting a general bin at the end. Java also refuses a catch for a specific checked exception, such as a file error, when nothing in the try block could possibly cause it.",
  "body": [
   "When an exception is thrown, Java checks the `catch` blocks in the order they appear and runs the first one whose type matches the exception or one of its supertypes. Only one catch block runs per exception; after it finishes, control moves to `finally` if there is one, and then to the code after the try statement. Because a supertype catch matches all of its subtypes, the order in which you write catch blocks matters, and the compiler checks it.",
   "If a catch block for a supertype comes before a catch block for one of its subtypes, the subtype block can never run, and the compiler reports an error saying the exception has already been caught. So you must order catch blocks from most specific to most general: `FileNotFoundException` before `IOException` before `Exception`. Two catch blocks for unrelated types, such as `IOException` and `SQLException`, can appear in either order, because neither covers the other. Catching the exact same type twice in separate blocks is also an error, since the second block is unreachable.",
   "```java\ntry {\n    Files.readString(Path.of(\"data.txt\"));\n} catch (NoSuchFileException e) {   // most specific first\n    System.out.println(\"missing\");\n} catch (IOException e) {\n    System.out.println(\"io problem\");\n} catch (Exception e) {\n    System.out.println(\"other\");\n}\n\n// Does not compile: IOException already caught by Exception\n// try { ... } catch (Exception e) { } catch (IOException e) { }\n```",
   "In that example, `NoSuchFileException` is a subclass of `IOException` (it lives in `java.nio.file` and is the exception the `Files` methods typically throw for a missing file), so it must come first. `IOException` comes next, and `Exception` last catches anything else, including unchecked exceptions. If the file is missing, only missing prints, even though all three blocks would technically match, because the first match wins.",
   "A second rule produces another unreachable-catch error: you cannot catch a checked exception that the `try` block cannot throw. If the `try` contains only `System.out.println(\"hi\")`, then `catch (IOException e)` does not compile, because nothing in the block declares or throws `IOException`. The compiler knows which checked exceptions each method call declares in its `throws` clause and which ones `throw` statements produce, so it can prove the handler is dead code. The error message says the exception is never thrown in the body of the corresponding try statement. The check is not fooled by subclasses, though: catching `FileNotFoundException` is allowed when the try calls a method declared to throw `IOException`, because that `IOException` might actually be a `FileNotFoundException` at run time.",
   "That rule does not apply to unchecked exceptions or to the broadest types. You may always catch `RuntimeException` or any of its subclasses and any `Error`, because any code might throw them. You may also always catch `Exception` and `Throwable`, even when the try block is empty, since those types include unchecked exceptions. So `try { } catch (Exception e) { }` compiles while `try { } catch (java.sql.SQLException e) { }` does not, because `SQLException` is a specific checked exception that nothing in an empty block can throw.",
   "Multi-catch follows the same logic. A multi-catch listing a type that was already caught by an earlier block, or a subtype of one, is an unreachable-code error. A multi-catch alternative that is a specific checked exception the try cannot throw is also an error. And within the multi-catch itself, the alternatives may not be related by subclassing, as the previous lesson explained.",
   "These rules exist to catch real mistakes. A broad handler placed too early silently swallows errors that a specific handler was written to treat differently, and a handler for an exception that cannot happen usually signals a misunderstanding or leftover code after a refactor. Making both compile errors keeps handler chains honest. In practice, when you see either error, the fix is usually one of two moves: reorder the blocks so the subclass handler comes first, or delete the handler for the checked exception that can no longer occur. Occasionally the right fix is the opposite, because the error reveals that a method you expected to declare a checked exception no longer does, and the calling code needs to be reviewed.",
   "When an exam question has several catch blocks, go through them in order and ask two questions for each. Could an earlier block already catch everything this one catches? And if its type is checked and specific, can anything in the try actually throw it? A yes to the first question, or a no to the second, means the code does not compile."
  ],
  "analogy": "Catch blocks are like a set of sieves stacked from top to bottom. If you put the finest sieve, the one that lets nothing through, at the top, every stone stops there and the coarser sieves underneath never see anything, so the compiler calls them useless. Stack them from coarsest at the top to finest at the bottom instead. The comparison stops at the second rule: the compiler also rejects a sieve sized for a stone that the try block can never produce, which has no real-world sieve equivalent.",
  "mnemonic": "Small fish before the big net: catch the subclass first and the superclass last.",
  "terms": [
   [
    "Catch order",
    "The top-to-bottom sequence in which catch blocks are checked; the first matching one runs."
   ],
   [
    "Unreachable catch block",
    "A handler the compiler proves can never run, either because an earlier block catches its type or because the try cannot throw it."
   ],
   [
    "Most specific first",
    "The rule of writing subclass exception handlers before superclass handlers."
   ],
   [
    "Checked exception analysis",
    "The compiler's tracking of which checked exceptions a try block can throw, based on method throws clauses and throw statements."
   ],
   [
    "NoSuchFileException",
    "A java.nio.file subclass of IOException commonly thrown by the Files methods when a path does not exist."
   ]
  ],
  "example": "A developer adds `catch (Exception e)` at the top of an existing handler chain to log everything, and the build fails because the specific IOException and TimeoutException handlers below it are now unreachable. Moving the broad catch to the bottom restores the specific handling.",
  "mistakes": [
   [
    "Putting catch (Exception e) first as a safety net.",
    "Every later catch for a subclass of Exception becomes unreachable and the code does not compile; the broad catch belongs last."
   ],
   [
    "Believing that two unrelated exceptions must be in a particular order.",
    "Unrelated types, such as IOException and SQLException, can appear in any order because neither catches the other."
   ],
   [
    "Adding catch (IOException e) after a try that cannot throw it, just in case.",
    "A specific checked exception that the try cannot throw makes the catch unreachable, which is a compile error."
   ],
   [
    "Assuming catch (Exception e) after an empty try is also an error.",
    "Exception and Throwable include unchecked exceptions, so they are always allowed, as are RuntimeException, its subclasses and Error."
   ]
  ],
  "tryit": [
   [
    "A try block calls only `Integer.parseInt(text)`. The handlers are, in order: `catch (NumberFormatException e)`, `catch (IllegalArgumentException e)`, `catch (IOException e)`. Which handler causes a compile error, and why are the first two fine?",
    "The IOException handler fails, because IOException is checked and parseInt cannot throw it. The first two compile: NumberFormatException is a subclass of IllegalArgumentException, so the specific one correctly comes first, and both are unchecked, so they may always be caught."
   ],
   [
    "A teammate swaps the first two handlers so IllegalArgumentException comes before NumberFormatException. What happens now?",
    "Compile error. The NumberFormatException handler becomes unreachable because IllegalArgumentException, its superclass, already catches it."
   ]
  ],
  "tip": "Subclass before superclass, always. A specific checked exception can only be caught if something in the try can throw it; Exception, Throwable and unchecked types are always allowed.",
  "check": [
   [
    "Does `catch (RuntimeException e) {} catch (IllegalArgumentException e) {}` compile?",
    "No. IllegalArgumentException is a subclass of RuntimeException, so the second block is unreachable."
   ],
   [
    "Can you write `catch (IOException e)` after a try block that only does arithmetic?",
    "No. IOException is checked and nothing in the try can throw it, so the catch is unreachable."
   ],
   [
    "Can you write `catch (Exception e)` after an empty try block?",
    "Yes. Exception includes unchecked exceptions, so the compiler allows it."
   ],
   [
    "How many catch blocks run when one exception matches several of them?",
    "Only one: the first matching block in top-to-bottom order."
   ]
  ]
 },
 {
  "t": "Try-with-resources, AutoCloseable and reverse close order",
  "hook": "It is 2 a.m. and your phone buzzes. The nightly invoice export at Lakeshore Supply has crashed again, this time with \"Too many open files\". Priya, who wrote the job, swears she closes everything: there is a `close()` call at the bottom of every method. You open the code and see the pattern. The file writer is closed on the last line of the `try` block, so whenever a row fails to format, the exception skips straight past it and the handle stays open. After a few thousand bad rows, the operating system refuses to open any more. A colleague suggests wrapping everything in try-with-resources. But in what order will the three resources close, and will the error still be logged?",
  "simple": "Some objects borrow something from the computer that must be handed back, such as an open file or a database connection. If you forget to hand it back, the computer eventually runs out. Java's try-with-resources is a way of saying \"borrow these things for this block of code, and give them back automatically when the block ends, no matter what happens\". It works like a library that automatically checks your books back in when you leave the building, even if you leave in a hurry. If you borrowed several things, Java returns them in the opposite order: the last thing you picked up is the first thing put back, like taking off a coat you put on over a sweater. Only objects that promise to have a close method can be used this way.",
  "body": [
   "Many Java objects hold resources that live outside the Java Virtual Machine (JVM): open files, network sockets, database connections and similar operating system handles. The garbage collector does not reliably release these for you, so they must be closed when you are done. Before Java 7, the standard pattern was a `finally` block that checked for `null` and called `close()`, often with its own nested `try`. That code is verbose and easy to get wrong. The try-with-resources statement automates it: resources declared in parentheses after `try` are closed automatically when the block finishes, whether it completes normally or throws an exception.",
   "Not every object can go in those parentheses. A resource must implement `java.lang.AutoCloseable`, whose single method is `void close() throws Exception`. The older `java.io.Closeable` interface extends it, narrowing the method to `close() throws IOException`, and it is implemented by streams, readers and writers. Declaring a variable of a class that implements neither interface in the resource list is a compile error, not a runtime failure, so on the exam a line like `try (String s = \"x\")` simply does not compile. Your own classes can implement `AutoCloseable` and be used exactly the same way as the built-in ones.",
   "The syntax has a few precise rules. Resources are declared inside the parentheses and separated by semicolons, and a trailing semicolon after the last one is allowed. Each resource variable is implicitly `final`, so assigning a new value to it inside the block is a compile error. Its scope is only the `try` block: it is not visible in `catch` or `finally`, which surprises people who want to log the resource's name in the handler. Since Java 9 you can also list an existing variable declared before the statement, as long as it is final or effectively final, as in `try (reader) { ... }`. A try-with-resources statement may stand alone with no `catch` or `finally` at all, which a plain `try` cannot do, but any checked exception thrown by `close()` must still be handled or declared by the enclosing method.",
   "Order is the most tested detail. Resources are opened in the order they are declared, left to right, and closed in the reverse order, so the last one opened is closed first. This makes sense because later resources often depend on earlier ones: a statement depends on its connection, and a buffered writer wraps a file writer. The closing happens right after the `try` block ends, before any `catch` or `finally` block runs. So by the time your `catch` block executes, every resource is already closed. If the initialization of a resource throws, only the resources that were already successfully opened are closed; the failing one never existed, and the ones declared after it were never created.",
   "Here is a small class that prints when it opens and closes, used in a statement that throws from the body. Trace it line by line before reading the final comment.",
   "```java\nclass Res implements AutoCloseable {\n    private final String name;\n    Res(String name) { this.name = name; System.out.print(\"open-\" + name + \" \"); }\n    public void close() { System.out.print(\"close-\" + name + \" \"); }\n}\n\ntry (var a = new Res(\"A\"); var b = new Res(\"B\")) {\n    System.out.print(\"body \");\n    throw new RuntimeException();\n} catch (RuntimeException e) {\n    System.out.print(\"catch \");\n} finally {\n    System.out.print(\"finally\");\n}\n// open-A open-B body close-B close-A catch finally\n```",
   "Notice that the `close()` implementation in `Res` declares no exception at all. An overriding method may throw fewer or narrower checked exceptions than the method it overrides, and `AutoCloseable.close()` declares the very broad `throws Exception`. When your class narrows it to nothing, the compiler no longer requires the caller to handle `Exception`, because it checks the declared type of the resource variable. If you leave `throws Exception` on your own `close()`, every try-with-resources that uses your class must catch or declare `Exception`, which is usually more than callers want. Using `var` for the resource variable still works, because the inferred type is `Res`.",
   "Exceptions from `close()` deserve a word here, although the next lesson covers them in depth. If the body throws and a `close()` call also throws, the body's exception is the one that propagates and the closing exception is attached to it as a suppressed exception, so neither problem is lost. That is a real improvement over a hand-written `finally` block, where an exception thrown during cleanup would replace the original error.",
   "In real code, use try-with-resources for every file, stream, socket or connection you open, such as `try (var in = Files.newBufferedReader(path))`, instead of calling `close()` yourself. On the exam, train yourself to trace the exact sequence: open in declaration order, run the body, close in reverse order, then run the matching `catch`, then `finally`. Combined with the scope and final rules, that sequence answers most questions on this topic."
  ],
  "analogy": "Think of getting dressed for snow: you put on a sweater, then a coat, then gloves. When you come inside, you take them off in reverse, gloves first, then coat, then sweater, because each layer sits on top of the one before. Try-with-resources undresses your code the same way, automatically, even if you rush inside because something went wrong. Where the analogy stops: Java always finishes undressing before anyone at the door (the catch block) gets to talk to you.",
  "mnemonic": "Open, Body, Reverse close, Catch, Finally: \"Only Bears Really Catch Fish.\" Resources open in declaration order, the body runs, resources close in reverse order, then catch, then finally.",
  "terms": [
   [
    "try-with-resources",
    "A try statement that declares resources in parentheses and closes them automatically at the end of the block."
   ],
   [
    "AutoCloseable",
    "The interface in java.lang with a single close() method that a resource must implement to be used in try-with-resources."
   ],
   [
    "Closeable",
    "A subinterface of AutoCloseable in java.io, used by I/O classes, whose close() throws IOException."
   ],
   [
    "Reverse close order",
    "Resources are closed in the opposite order of declaration, last opened first closed."
   ],
   [
    "Effectively final",
    "A variable that is never reassigned after initialization; since Java 9 such a variable can be listed directly in a try-with-resources header."
   ]
  ],
  "example": "A CSV export opens a database connection, a statement and a file writer in one try-with-resources. If writing a row fails, the writer is closed first, then the statement, then the connection, and only then does the catch block log the error, so no handles are leaked.",
  "mistakes": [
   [
    "The catch block runs first, and the resources are closed afterward.",
    "Resources are closed as soon as the try block ends, before catch and finally run. Inside catch, the resources are already closed."
   ],
   [
    "Resources close in the same order they were declared.",
    "They close in reverse order. The last resource declared is the first one closed."
   ],
   [
    "A resource variable can be used in the catch or finally block for logging.",
    "Resource variables are scoped to the try block only. Referring to them in catch or finally does not compile."
   ],
   [
    "Any object can go in the try parentheses, and a non-closeable one just fails at runtime.",
    "The type must implement AutoCloseable (or Closeable). Otherwise it is a compile error."
   ]
  ],
  "tryit": [
   [
    "Malik writes `var log = new FileWriter(\"audit.txt\"); try (log) { log.write(\"start\"); }` and later, before the try, adds a line `log = new FileWriter(\"other.txt\");` to switch files. The code worked before his change. Will it still compile, and why?",
    "No. Listing an existing variable in try-with-resources requires it to be final or effectively final. Reassigning `log` makes it no longer effectively final, so the `try (log)` line fails to compile. He should declare the resource inside the parentheses or use a separate variable."
   ],
   [
    "A class `Conn` implements `AutoCloseable` but keeps the inherited signature `public void close() throws Exception`. Dana uses it in `try (Conn c = new Conn()) { c.query(); } catch (SQLException e) { ... }` inside a method with no throws clause. What happens and how could she fix it?",
    "It does not compile, because the implicit call to close() can throw Exception, which is neither caught nor declared. She can add `catch (Exception e)`, declare `throws Exception` on the method, or change Conn's close() to declare a narrower exception or none."
   ]
  ],
  "tip": "Trace the order: open in declaration order, body, close in reverse order, then catch, then finally. Resource variables are final and not visible in catch or finally.",
  "check": [
   [
    "In `try (var x = new R(\"1\"); var y = new R(\"2\"))`, which resource is closed first?",
    "y (\"2\"), because resources are closed in reverse order of declaration."
   ],
   [
    "Do resources close before or after the catch block runs?",
    "Before. They are closed as soon as the try block ends, then catch and finally run."
   ],
   [
    "Can you use an existing variable in try-with-resources?",
    "Yes, since Java 9, if it is final or effectively final: try (existingResource) { }."
   ],
   [
    "If the constructor of the second of three resources throws, which resources are closed?",
    "Only the first one, because it is the only resource that was successfully opened."
   ]
  ]
 },
 {
  "t": "Suppressed exceptions and Throwable.getSuppressed()",
  "hook": "Monday morning at Pinecrest Health, the weekend backup report says only \"connection reset while closing\". Leon on the operations team spends two hours chasing a flaky network switch before Ana, the developer on call, opens the code. The backup routine closes its network share in a hand-written `finally` block. The real failure, a disk-full error during the write, happened first, but when the cleanup code also failed, its exception replaced the original one completely. The log only ever saw the second problem. Ana rewrites the routine with try-with-resources, and the next failure shows both errors. How does Java decide which exception is the main one, and where does the other one go?",
  "simple": "Sometimes two things go wrong at almost the same moment. Your code fails, and then the automatic cleanup also fails. Java can only hand one problem back to you at a time, so it picks the first, more important one, the failure in your main code, and staples the cleanup failure to it like a sticky note. Those stapled problems are called suppressed exceptions. You can read the sticky notes with a method called getSuppressed. Imagine a waiter who drops a tray and then trips over the mess. The manager's report is about the dropped tray, with a note attached saying \"also tripped during cleanup\". Nothing is forgotten, but the real cause stays on top.",
  "body": [
   "Sometimes more than one exception happens during the same operation. In try-with-resources this is common: the body throws an exception, and then the automatic `close()` call also throws, perhaps because the connection is already broken. Java cannot throw two exceptions at once, so it must choose one as the primary exception and remember the other. The rule is simple and heavily tested: the exception from the `try` block is primary. Any exceptions thrown while closing resources are attached to it as suppressed exceptions, and only the primary one propagates to a `catch` block or up the call stack.",
   "Suppressed exceptions are stored inside the primary `Throwable` itself. Since Java 7, the `Throwable` class has two methods for this. `addSuppressed(Throwable)` attaches one, and try-with-resources calls it for you behind the scenes. `getSuppressed()` returns a `Throwable[]` array of the attached exceptions, in the order they were added, and it returns an empty array (never `null`) when there are none. With several resources, each failing `close()` adds another entry. Because resources close in reverse order of declaration, the array follows that reverse order: the last declared resource's close exception comes first.",
   "A catch block for the primary exception can loop over the array to log every problem. The following example shows a resource whose `close()` always fails, used in a body that also fails. Read the output comments and notice which message is primary.",
   "```java\nclass Door implements AutoCloseable {\n    public void close() { throw new IllegalStateException(\"door stuck\"); }\n}\n\ntry (Door d = new Door()) {\n    throw new RuntimeException(\"fire alarm\");\n} catch (RuntimeException e) {\n    System.out.println(e.getMessage());          // fire alarm\n    for (Throwable t : e.getSuppressed()) {\n        System.out.println(\"suppressed: \" + t.getMessage()); // door stuck\n    }\n}\n```",
   "Now consider the cases where the body does not throw. If the `try` block completes normally and only `close()` throws, there is nothing to suppress: the exception from `close()` becomes the primary exception and is thrown normally, exactly as if you had called `close()` yourself. If two resources both fail to close and the body succeeded, the first close exception, which comes from the last declared resource because of reverse order, becomes primary, and the second close exception is suppressed inside it. A useful habit is to ask \"what was thrown first?\" because the first exception thrown is always the one that propagates.",
   "Suppression happens automatically only in try-with-resources. A classic `try/finally` behaves worse. If the `try` block throws and the `finally` block also throws, the exception from `finally` replaces the original, and the original is lost entirely unless you capture it yourself and call `addSuppressed`. The same thing happens if `finally` executes a `return`: the pending exception simply disappears. This silent loss of the real cause is one of the strongest reasons to prefer try-with-resources over manual cleanup, and exam questions often contrast the two forms side by side.",
   "You will see suppressed exceptions in printed stack traces. `printStackTrace()` lists them under a \"Suppressed:\" heading, indented beneath the primary exception's own frames, which you will notice in lab output and in application logs. Do not confuse suppressed exceptions with the cause. `getCause()` returns the exception that led to this one, set when one exception wraps another through a constructor such as `new ServiceException(\"save failed\", e)`, and it appears under \"Caused by:\". `getSuppressed()` lists additional exceptions that happened alongside the primary one during cleanup. A cause explains why; suppressed exceptions report what else went wrong.",
   "You can also use the mechanism by hand. When you write your own cleanup logic, for example a method that shuts down several services in a loop, you can catch the first failure, keep going, and attach each later failure to it with `first.addSuppressed(next)` before rethrowing `first`. That reproduces the try-with-resources behavior: one exception propagates, and nothing else is silently dropped. Two small details are worth knowing. An exception cannot suppress itself, so `e.addSuppressed(e)` throws `IllegalArgumentException`, and passing `null` throws `NullPointerException`. In everyday code you rarely need this, because try-with-resources already does it correctly.",
   "On the exam, work in two steps. First, identify the primary exception: the one from the `try` body if there is one, otherwise the first exception thrown by a `close()` call. Second, list the remaining close exceptions in reverse resource order as suppressed. Then check which `catch` block matches the primary exception's type, because suppressed exceptions never select a catch block on their own."
  ],
  "analogy": "Picture a relay of incident reports in a busy kitchen. The chef burns a sauce, and while cleaning the pan the dishwasher chips it. The shift report is filed under the burned sauce, with a stapled note about the chipped pan. Nobody files a separate report for the pan, and nobody throws the first report away. A plain finally block is like a careless manager who tears up the sauce report and files only the pan note.",
  "terms": [
   [
    "Suppressed exception",
    "An exception thrown while closing a resource that is attached to the primary exception instead of replacing it."
   ],
   [
    "Primary exception",
    "The exception that actually propagates; in try-with-resources, the one thrown by the try block if there is one."
   ],
   [
    "getSuppressed()",
    "A Throwable method returning an array (possibly empty) of the exceptions suppressed by this one."
   ],
   [
    "addSuppressed(Throwable)",
    "A Throwable method that attaches another exception as suppressed; try-with-resources calls it automatically."
   ],
   [
    "getCause()",
    "A Throwable method returning the exception that caused this one, which is different from suppressed exceptions."
   ]
  ],
  "example": "A backup job fails while writing to a network share, and then closing the connection fails too. Because the job uses try-with-resources, the log shows the real write error as the main exception, with the close failure listed under Suppressed, so the operations team fixes the right problem first.",
  "mistakes": [
   [
    "The exception from close() wins because it happened last.",
    "In try-with-resources the body's exception is primary. The close() exception is attached to it as suppressed."
   ],
   [
    "getSuppressed() returns null when nothing was suppressed.",
    "It returns an empty array, so looping over it is always safe."
   ],
   [
    "Suppressed exceptions and the cause are the same thing.",
    "The cause is the exception that led to this one (getCause, shown as Caused by). Suppressed exceptions are extra failures that happened alongside it during cleanup."
   ],
   [
    "A try/finally block also keeps the original exception automatically.",
    "No. If finally throws, its exception replaces the original, which is lost unless you call addSuppressed yourself."
   ]
  ],
  "tryit": [
   [
    "A method uses `try (var a = new Res(\"A\"); var b = new Res(\"B\")) { }`. The body completes normally, but both close() methods throw, A with \"a-fail\" and B with \"b-fail\". Kenji catches the exception and prints its message and the messages of its suppressed exceptions. What does he see?",
    "The primary message is \"b-fail\", because B closes first (reverse order) and its exception is the first one thrown. \"a-fail\" appears once in getSuppressed()."
   ],
   [
    "Rosa's legacy code has `try { write(); } finally { conn.close(); }`. In production, write() throws a disk-full IOException and conn.close() throws a connection exception. Which exception reaches the caller, and what should she change?",
    "Only the connection exception reaches the caller; the disk-full error is lost. She should switch to try-with-resources so the disk-full error is primary and the close failure is kept as suppressed."
   ]
  ],
  "tip": "In try-with-resources, the body's exception wins and close exceptions become suppressed. In a plain finally, a new exception replaces the original, which is lost.",
  "check": [
   [
    "If the try body and a resource's close() both throw, which exception reaches the catch block?",
    "The one from the try body; the close() exception is available through getSuppressed()."
   ],
   [
    "If only close() throws, is anything suppressed?",
    "No. The close() exception is thrown as the primary exception."
   ],
   [
    "What is the difference between getCause() and getSuppressed()?",
    "getCause returns the exception that caused this one; getSuppressed returns extra exceptions that were thrown alongside it and suppressed."
   ],
   [
    "With three resources that all fail to close after the body throws, in what order do the close exceptions appear in getSuppressed()?",
    "In reverse declaration order, because resources close last to first and each failure is added as it happens."
   ]
  ]
 },
 {
  "t": "Declaring exceptions with throws and overriding rules",
  "hook": "The build at Ridgeline Logistics has been green for weeks, until Omar adds a new `CloudLoader` class for the shipment importer. His override of `load()` reads from a remote store and can fail with a `SQLException`, so he adds that to its `throws` clause. The compiler rejects it immediately: \"overridden method does not throw SQLException\". Omar is puzzled. His method really can throw it, so surely declaring it honestly is the right thing to do. Across the room, the importer's main loop calls `load()` through a plain `Loader` reference and only catches `IOException`. Why does the compiler care what a subclass declares, and what is Omar allowed to write instead?",
  "simple": "In Java, a method can announce the kinds of serious, expected problems it might hand back to whoever called it. That announcement is the throws clause, and callers must be ready for everything listed. When a child class replaces a parent's method, it has to keep the parent's promise. It may promise fewer problems or more specific ones, but never new or bigger ones, because code written for the parent is only prepared for what the parent announced. It is like a store that promises \"we might be out of milk\". A franchise may say \"we might be out of oat milk\" or promise nothing is ever missing, but it cannot suddenly say \"we might be closed all week\".",
  "body": [
   "The `throws` clause in a method or constructor header lists the checked exceptions it may pass to its caller, as in `void load(String name) throws IOException, SQLException`. It is part of the method's contract: callers must then either catch those exceptions or declare them in their own `throws` clause, the rule known as handle or declare. Do not confuse it with `throw`, a statement inside the method body that throws one exception object right now, such as `throw new IOException(\"missing file\")`. One is a declaration in the header, the other is an action in the code, and exam questions sometimes swap them to see if you notice.",
   "The compiler is lenient about what you list. You may include unchecked exceptions, meaning subclasses of `RuntimeException` or `Error`, as documentation, but the compiler ignores them for handle-or-declare purposes, so callers need not catch them. You may also declare a checked exception that the method never actually throws; that compiles, and it forces callers to deal with it anyway. A `throws` clause can name a supertype, such as `throws Exception`, which covers every checked exception, at the cost of making every caller handle a very broad type. The reverse is not lenient: if the body can throw a checked exception that is neither caught nor declared, the method does not compile.",
   "Overriding adds a restriction that the exam tests often. An overriding method cannot throw new checked exceptions or broader checked exceptions than the method it overrides. It may throw the same checked exceptions, narrower subclasses of them, fewer of them, or none at all. It may always throw any unchecked exception. The reason is polymorphism. Code that calls the method through a supertype reference was written against the supertype's contract and only prepared for the exceptions the supertype declared. If a subclass could add a new checked exception, that caller would receive an exception the compiler had promised it would never see.",
   "The following classes show each allowed and forbidden case. Read each override and compare its `throws` clause to `IOException`.",
   "```java\nclass Loader {\n    void load() throws IOException { }\n}\nclass FileLoader extends Loader {\n    @Override void load() throws FileNotFoundException { }  // OK: narrower\n}\nclass QuietLoader extends Loader {\n    @Override void load() { }                                // OK: none\n}\nclass BadLoader extends Loader {\n    // @Override void load() throws Exception { }            // broader: error\n    // @Override void load() throws SQLException { }         // new: error\n    @Override void load() throws IllegalStateException { }   // OK: unchecked\n}\n```",
   "The same rules apply to methods that implement an interface, which matters for `AutoCloseable`. Its `close()` declares `throws Exception`, so an implementation may declare anything narrower, including nothing at all. What callers must handle depends on the reference type the compiler sees, not on the runtime object. If you call `load()` on a `Loader` reference, you must handle `IOException` even when the object is a `QuietLoader`, because the compiler checks `Loader`'s declaration. If you call it on a `QuietLoader` reference, you need not handle anything. This is a frequent trick question: the object cannot throw, yet the code still needs a `catch` or `throws`.",
   "Some related situations have different rules. Overloading has no exception restriction, because an overload is a separate method with a different parameter list; it may declare any exceptions it likes. Constructors are not inherited or overridden, so the override rule does not apply to them. However, if a superclass constructor declares a checked exception, a subclass constructor that calls it, explicitly or through the implicit `super()`, must itself declare that exception or a supertype. It cannot catch it, because the `super(...)` call must be the first statement and cannot sit inside a `try` block. Static methods are hidden rather than overridden, but the compiler applies the same checked exception restriction when a subclass declares a static method with the same signature.",
   "When an override really does need to report a new kind of failure, the usual technique is wrapping. Catch the low-level exception and throw one the contract allows, passing the original as the cause: `throw new IOException(\"remote load failed\", e)`. Callers keep their existing handling, and the stack trace still shows the real problem under \"Caused by:\". Alternatively, wrap it in an unchecked exception, which the override may always throw.",
   "In practice, declare specific exceptions rather than `throws Exception`, so callers can react to the actual problems. On the exam, for any override, list the parent's checked exceptions, then confirm that every checked exception in the child is the same type or a subclass of one of them; unchecked exceptions can be ignored for this check."
  ],
  "analogy": "A parent method's throws clause is like the warnings printed on a job description: \"may involve lifting up to 20 kilograms\". A contractor who takes over the job may lift less, or nothing heavy at all, without surprising anyone. But showing up and saying \"this job now involves working at heights\" breaks what everyone signed up for. The analogy stops at unchecked exceptions: those are like accidents nobody can promise against, so they are always allowed.",
  "terms": [
   [
    "throws clause",
    "The part of a method or constructor header that declares the checked exceptions it may pass to callers."
   ],
   [
    "throw statement",
    "A statement that throws one exception object, as in throw new IOException()."
   ],
   [
    "Handle or declare",
    "The compiler rule that a checked exception must be caught or listed in the method's throws clause."
   ],
   [
    "Narrower exception",
    "A subclass of an exception type, which an overriding method may declare in place of the parent type."
   ],
   [
    "Contract",
    "The promises a method's signature makes to callers, including which checked exceptions they must handle."
   ]
  ],
  "example": "A plugin framework declares `void run() throws PluginException`. A plugin author tries to override run with `throws IOException` and the build fails. Wrapping the IOException in a PluginException (passing it as the cause) keeps the contract that the framework's error handling depends on.",
  "mistakes": [
   [
    "An override may throw any exception that its body really needs, as long as it declares it.",
    "An override may not add new or broader checked exceptions than the overridden method. Wrap the exception in an allowed type or an unchecked exception instead."
   ],
   [
    "If the runtime object's method throws nothing, the caller does not need to handle anything.",
    "The compiler uses the reference type's declaration. Calling through a Loader reference still requires handling IOException."
   ],
   [
    "An override cannot add RuntimeException subclasses because they are not in the parent's throws clause.",
    "Unchecked exceptions are always allowed in an override, declared or not."
   ],
   [
    "A subclass constructor can catch a checked exception thrown by the superclass constructor.",
    "The super(...) call must be first and cannot be wrapped in try, so the subclass constructor must declare the exception."
   ]
  ],
  "tryit": [
   [
    "An interface declares `String read() throws IOException`. Three classes implement it: A declares `throws FileNotFoundException`, B declares `throws IOException, IllegalArgumentException`, and C declares `throws Exception`. Which ones compile?",
    "A and B compile. FileNotFoundException is narrower than IOException, and B adds only an unchecked exception. C fails because Exception is broader than IOException."
   ],
   [
    "Tess writes `Loader l = new QuietLoader(); l.load();` in a method with no throws clause and no try block. QuietLoader's load() declares no exceptions, but Loader's declares IOException. Does it compile, and what are two ways to fix it if not?",
    "It does not compile, because the compiler checks Loader's declaration, which throws IOException. She can catch IOException or declare it, or change the reference type to QuietLoader."
   ]
  ],
  "tip": "For an override, allowed checked exceptions are: the same, narrower, fewer or none. Never new and never broader. Unchecked exceptions are always allowed.",
  "check": [
   [
    "Can an override of `void m() throws IOException` declare `throws FileNotFoundException`?",
    "Yes. FileNotFoundException is a subclass of IOException, so it is narrower."
   ],
   [
    "Can an override of `void m()` (no throws) declare `throws Exception`?",
    "No. That adds a checked exception the overridden method did not declare."
   ],
   [
    "Must you handle IOException when calling `load()` through a `Loader` reference that points to a subclass declaring no exceptions?",
    "Yes. The compiler uses the reference type's declaration, which throws IOException."
   ],
   [
    "Does an overloaded version of `load(String path)` have to follow the throws rules of `load()`?",
    "No. An overload is a different method, so it can declare any exceptions."
   ]
  ]
 },
 {
  "t": "Creating custom checked and unchecked exceptions",
  "hook": "At Brightwater Savings, the mobile app team keeps showing customers the same message: \"Something went wrong.\" A customer trying to move more money than her balance allows sees it. So does a customer whose account number was mistyped by a buggy screen. Behind the scenes, every failure in the transfer service is thrown as a plain `Exception` with a text message, and the app has no reliable way to tell \"ask for a smaller amount\" from \"this is a bug, page the developers\". Nadia, the lead developer, wants to give each failure its own type. Should her new exceptions be checked or unchecked, and what constructors do they need?",
  "simple": "An exception is Java's way of saying \"something went wrong here\". Java comes with many ready-made kinds, but you can create your own with names that describe your program's problems, like InsufficientFundsException. You make one by building on an existing kind. If you build on Exception, Java forces anyone calling your code to plan for that problem, which suits problems they can recover from, like a low balance. If you build on RuntimeException, nobody is forced to plan for it, which suits programming mistakes that should be fixed in the code. It is like a hospital using specific alarm codes instead of one generic bell: the right team responds faster.",
  "body": [
   "You create your own exception type by extending an existing exception class, and the choice of parent decides how it behaves. Extend `Exception`, or another checked exception such as `IOException`, to make a checked exception that callers must catch or declare. Extend `RuntimeException`, or one of its subclasses like `IllegalArgumentException` or `IllegalStateException`, to make an unchecked exception that the compiler does not track. Extending `Error` is technically possible but reserved for serious problems at the level of the Java Virtual Machine (JVM), such as running out of memory, and it is not appropriate for application code. Extending `Throwable` directly is also legal but poor practice, because ordinary handlers that catch `Exception` will miss it.",
   "Choosing between checked and unchecked is a design decision about the caller. Choose checked when the caller can reasonably recover. An `InsufficientFundsException` is a good example: the banking user interface can respond by asking for a smaller amount, so forcing callers to think about it is helpful. Choose unchecked when the exception signals a bug or a broken precondition that the caller should fix in code, such as passing a malformed account identifier or calling a method on an object in the wrong state. Many modern libraries lean toward unchecked exceptions to avoid forcing boilerplate `try` blocks on every caller, but the exam expects you to know both styles and to classify any custom class by following its `extends` chain.",
   "Custom exceptions usually provide constructors that pass information up to the parent class. The conventional set mirrors the four public constructors of `Exception`: a no-argument constructor, one taking a `String` message, one taking a message and a `Throwable` cause, and one taking only a cause. Constructors are not inherited, so if you want any of these you must write them yourself and call `super(...)` with the matching arguments. If you declare only a message constructor, the compiler no longer supplies a default constructor, and `new MyException()` does not compile. If you declare no constructors at all, you get only the implicit no-argument one.",
   "The example below defines one checked and one unchecked exception for a banking service and shows a method that throws the checked one. Notice the extra field on the checked exception and the cause passed through on the unchecked one.",
   "```java\npublic class InsufficientFundsException extends Exception {     // checked\n    private final long shortfall;\n    public InsufficientFundsException(String message, long shortfall) {\n        super(message);\n        this.shortfall = shortfall;\n    }\n    public long getShortfall() { return shortfall; }\n}\n\npublic class AccountNotFoundException extends RuntimeException { // unchecked\n    public AccountNotFoundException(String id, Throwable cause) {\n        super(\"no account \" + id, cause);\n    }\n}\n\nvoid withdraw(long cents) throws InsufficientFundsException {\n    if (cents > balance) {\n        throw new InsufficientFundsException(\"balance too low\", cents - balance);\n    }\n    balance -= cents;\n}\n```",
   "Passing the cause is called exception chaining or wrapping. When a low-level exception, such as an `SQLException` from the database driver, is caught and a higher-level custom exception is thrown instead, passing the original as the cause keeps the full story. `getCause()` returns it, and the printed stack trace shows it under a \"Caused by:\" line. This lets higher layers handle a meaningful business exception without depending on database classes, while operators can still see the root problem. Throwing a new exception without the cause discards that information and makes debugging much harder, because the trace then starts at the wrapper.",
   "Custom exceptions can add fields and methods, like `getShortfall()` above, so handlers receive structured data rather than having to parse message text, which is fragile and breaks when wording changes. Keep messages useful but free of secrets such as passwords, tokens or full card numbers, since exception messages often end up in log files, monitoring tools and sometimes error pages. It is also good practice to make the class name end in `Exception` and to keep exception objects simple, because they may be created, logged and serialized in places you do not control.",
   "Once defined, a custom exception follows every rule that built-in exceptions follow. A checked custom exception must be handled or declared wherever it can be thrown. It can appear in a multi-catch, but not together with its own superclass or subclass. An overriding method may declare it only if it is the same as, or narrower than, an exception declared by the overridden method. In a sequence of `catch` blocks, a handler for a subclass must come before a handler for its superclass, or the later block is unreachable and the code does not compile.",
   "On the exam, look at the `extends` clause first to decide whether a custom exception is checked: follow the chain up until you reach `RuntimeException` (unchecked), `Error` (unchecked) or `Exception` without passing through `RuntimeException` (checked). Then apply the handle-or-declare and overriding rules exactly as for built-in exceptions, and check that every constructor call matches a constructor the class actually declares."
  ],
  "analogy": "Creating a custom exception is like a hospital adding its own alarm codes. Code blue and code red each summon a specific team, so nobody wastes time guessing. Choosing the parent class is like deciding whether the code must be acknowledged at the nurses' station (checked) or simply broadcast for whoever can fix it (unchecked). The analogy has a limit: in Java the parent class, not the name, decides the behavior, so a class called CriticalException can still be unchecked.",
  "terms": [
   [
    "Custom exception",
    "An application-defined class that extends Exception, RuntimeException or one of their subclasses."
   ],
   [
    "Checked exception",
    "An exception that the compiler requires callers to catch or declare; any subclass of Exception that is not a subclass of RuntimeException."
   ],
   [
    "Exception chaining",
    "Wrapping a caught exception as the cause of a new exception so the original details are kept."
   ],
   [
    "Cause",
    "The Throwable passed to an exception's constructor and returned by getCause()."
   ],
   [
    "super(message)",
    "The constructor call that passes a detail message to the parent exception class."
   ]
  ],
  "example": "An order service catches a low-level `SQLException` when saving an order and throws `OrderSaveException(\"could not save order 42\", e)`. The web layer handles OrderSaveException without knowing about SQL, while the logs still show the SQL error under Caused by.",
  "mistakes": [
   [
    "A custom exception inherits all of Exception's constructors automatically.",
    "Constructors are never inherited. You must declare each constructor you need and call super with the right arguments."
   ],
   [
    "A class named like a serious problem, or one that extends IllegalStateException, is checked.",
    "Only the parent chain matters. IllegalStateException extends RuntimeException, so subclasses are unchecked."
   ],
   [
    "Wrapping an exception without passing the cause is fine because the message describes it.",
    "Without the cause, getCause() returns null and the original stack trace is lost. Pass the caught exception to the constructor."
   ],
   [
    "Application exceptions should extend Error so they are taken seriously.",
    "Error is for serious JVM-level problems. Application code should extend Exception or RuntimeException."
   ]
  ],
  "tryit": [
   [
    "A shipping app needs an exception for when a carrier's tracking service is temporarily unreachable. Callers can retry later or show a friendly message. Another exception is needed for when a method receives a negative package weight, which only happens through a coding bug. Which parent class should each extend?",
    "The tracking outage should be checked (extend Exception or IOException) because callers can recover by retrying. The negative weight should be unchecked (extend IllegalArgumentException or RuntimeException) because it is a precondition bug to fix in code."
   ],
   [
    "Marco writes `class QuotaException extends Exception { QuotaException(String msg) { super(msg); } }` and later, elsewhere, `throw new QuotaException(\"limit\", e);` inside a catch block. Will it compile, and how should he fix it?",
    "No. QuotaException has only a String constructor, and constructors are not inherited. He should add `QuotaException(String msg, Throwable cause) { super(msg, cause); }` so the cause is kept."
   ]
  ],
  "tip": "The parent class decides everything: extends Exception means checked, extends RuntimeException means unchecked. Constructors are not inherited, so write each one you need and call super.",
  "check": [
   [
    "Is `class ConfigException extends IllegalStateException` checked or unchecked?",
    "Unchecked, because IllegalStateException extends RuntimeException."
   ],
   [
    "Why pass the original exception as the cause when wrapping it?",
    "So getCause() and the stack trace keep the original error details for debugging."
   ],
   [
    "If a custom exception declares only `MyEx(String msg)`, does `new MyEx()` compile?",
    "No. Constructors are not inherited and no no-argument constructor exists."
   ],
   [
    "Is `class ReportException extends IOException` checked or unchecked?",
    "Checked, because IOException extends Exception and not RuntimeException."
   ]
  ]
 },
 {
  "t": "Declaring, creating and copying arrays; Arrays.sort, binarySearch, compare, mismatch",
  "hook": "The weekly leaderboard at Summit Climbing Gym has gone strange. Coach Elena reports that a new top score of 95 was inserted in the wrong place, and a test that compares last week's scores with this week's says they are different even though they look identical when printed. Jules, the volunteer developer, finds three separate problems: the scores were searched before they were sorted, the comparison used `equals` on two arrays, and the \"backup\" copy changes whenever the original does. Each line looks reasonable on its own. Which of Java's array rules is each line breaking, and what should Jules call instead?",
  "simple": "An array is a row of numbered boxes that all hold the same kind of thing, like an egg carton holding only eggs. The numbering starts at zero, and once the carton is made, it cannot grow or shrink. Java gives you helper tools in a class called Arrays. One sorts the boxes from smallest to largest. Another finds a value quickly, but only if the boxes are already sorted, the way you can only flip straight to a name in a phone book because it is in alphabetical order. Others compare two arrays or tell you the first box where they differ. Copying an array of objects copies the labels, not the objects, so both copies still point at the same things.",
  "body": [
   "An array is a fixed-size object holding elements of one type, indexed from 0. The brackets can go after the type or after the variable name, and this matters in declarations with several variables: `int[] a, b;` declares two arrays, while `int a[], b;` declares one array `a` and one plain `int` `b`. Mixing both styles stacks dimensions, so in `int[] a, b[];` the variable `b` is an `int[][]`. You create an array either with a size, `new int[5]`, which fills it with default values (0 for numbers, `false` for `boolean`, `null` for references), or with an initializer, `new int[] {1, 2, 3}`. The short form `int[] x = {1, 2, 3};` is allowed only in a declaration, not in a later assignment. Giving both a size and an initializer, as in `new int[3] {1, 2, 3}`, or neither, as in `new int[]`, is a compile error.",
   "An array's size is the `length` field, written without parentheses, unlike `String.length()` and `List.size()`, and it never changes after creation. Accessing index `length` or any negative index compiles but throws `ArrayIndexOutOfBoundsException` at runtime. Multi-dimensional arrays are really arrays of arrays, so rows can have different lengths, which is sometimes called a jagged array. `int[][] grid = new int[3][];` creates three `null` rows that you fill later with arrays of any length. Only the first dimension must be specified when creating it; `new int[][3]` does not compile.",
   "Arrays inherit `equals`, `hashCode` and `toString` from `Object` without overriding them, which causes two classic bugs. `a.equals(b)` and `a == b` both compare identity, so two arrays with the same contents are not equal by either test. Printing an array shows a type code and hash, such as `[I@1b6d3586`, instead of its elements. Use `Arrays.equals(a, b)` to compare contents and `Arrays.toString(a)` to print them, or `Arrays.deepToString` for nested arrays.",
   "Copying has several options, each with a slightly different shape. `a.clone()` returns a new array of the same length. `Arrays.copyOf(a, newLength)` truncates if the new length is shorter or pads with default values if it is longer. `Arrays.copyOfRange(a, from, to)` copies a slice where the end index is exclusive. `System.arraycopy(src, srcPos, dest, destPos, length)` copies into an existing array that you already created. All of these are shallow copies: for an array of objects, the new array holds the same references, so the copies share the same element objects, and changing an element object through one array is visible through the other.",
   "Sorting and searching come from the `java.util.Arrays` class. `Arrays.sort(a)` sorts in ascending order in place and returns nothing. Numbers sort numerically. Strings sort in natural order, which is by Unicode value, where digits come before uppercase letters, which come before lowercase letters. So `{\"b\", \"A\", \"10\", \"9\"}` sorts to `[10, 9, A, b]`, because comparison is character by character and \"1\" comes before \"9\". Object arrays need elements that implement `Comparable`, or you must pass a `Comparator` as a second argument.",
   "`Arrays.binarySearch(a, key)` searches a sorted array by repeatedly halving the range. If the key is found, it returns its index. If not, it returns `-(insertionPoint) - 1`, where the insertion point is the index at which the key would be inserted to keep the array sorted. The minus one exists so that a missing key that belongs at index 0 returns -1 rather than 0, which would look like a hit. On an unsorted array the result is undefined, so on the exam the correct answer is that you cannot predict it, not any particular number.",
   "Two newer methods compare arrays. `Arrays.compare(a, b)` compares lexicographically, element by element, like dictionary order, and returns a negative number, zero or a positive number. If one array is a prefix of the other, the shorter one is smaller, and a `null` array is considered smaller than a non-null one. `Arrays.mismatch(a, b)` returns the index of the first position where the arrays differ, or -1 if they are equal; if one is a proper prefix of the other, it returns the length of the shorter array, because that is the first index where only one array has an element.",
   "```java\nint[] nums = {8, 2, 6, 4};\nArrays.sort(nums);                            // [2, 4, 6, 8]\nSystem.out.println(Arrays.binarySearch(nums, 6)); // 2\nSystem.out.println(Arrays.binarySearch(nums, 5)); // -3 (would go at index 2)\nint[] copy = Arrays.copyOf(nums, 6);          // [2, 4, 6, 8, 0, 0]\nSystem.out.println(Arrays.compare(new int[]{1, 2}, new int[]{1, 3})); // negative\nSystem.out.println(Arrays.mismatch(new int[]{1, 2, 3}, new int[]{1, 2})); // 2\nSystem.out.println(Arrays.mismatch(nums, nums.clone()));  // -1\n```",
   "A quick way to keep these straight: `equals` answers yes or no, `compare` answers which comes first, and `mismatch` answers where they differ. For `binarySearch`, always confirm the array is sorted, then compute the insertion point and apply the negate-and-subtract-one formula."
  ],
  "analogy": "Binary search is like finding a word in a printed dictionary: you open to the middle, decide whether to go left or right, and halve the pages each time. That only works because the dictionary is alphabetized; in a shuffled pile of pages the method gives nonsense. When a word is missing, Java does not just say \"not found\", it tells you where the word would be printed, encoded as a negative number so it cannot be mistaken for a real page.",
  "terms": [
   [
    "Array",
    "A fixed-length object holding elements of one type, accessed by a zero-based index."
   ],
   [
    "length",
    "The field (not a method) holding an array's fixed number of elements."
   ],
   [
    "Shallow copy",
    "A copy of an array whose elements are the same object references as the original."
   ],
   [
    "Insertion point",
    "The index where a missing key would be inserted; binarySearch returns -(insertion point) - 1 for it."
   ],
   [
    "Arrays.mismatch",
    "Returns the first index at which two arrays differ, or -1 if they are equal."
   ]
  ],
  "example": "A leaderboard keeps sorted scores in an int array. To find where a new score belongs, the code calls `Arrays.binarySearch`, and when the result is negative it converts it back with `-(result + 1)` to get the insertion point before shifting the lower scores down with System.arraycopy.",
  "mistakes": [
   [
    "`a.equals(b)` compares the contents of two arrays.",
    "Arrays do not override equals, so it compares identity like ==. Use Arrays.equals(a, b)."
   ],
   [
    "binarySearch on an unsorted array returns -1 when the value is missing.",
    "The result on an unsorted array is undefined. Sort first; for a missing key the result is -(insertion point) - 1."
   ],
   [
    "`int a[], b;` declares two arrays.",
    "Brackets after a name apply only to that name, so b is a plain int. `int[] a, b;` declares two arrays."
   ],
   [
    "clone() or Arrays.copyOf creates fully independent copies of object elements.",
    "They are shallow copies. The new array holds the same object references, so mutating an element object affects both."
   ]
  ],
  "tryit": [
   [
    "Inez has `String[] tags = {\"beta\", \"Alpha\", \"2024\", \"alpha\"};` and calls `Arrays.sort(tags)` and then `Arrays.binarySearch(tags, \"Beta\")`. What is the sorted array, and what does the search return?",
    "Sorted: [2024, Alpha, alpha, beta], since digits come before uppercase, which come before lowercase. \"Beta\" is missing; it would go after \"Alpha\" and before \"alpha\", at index 2, so the result is -(2) - 1 = -3."
   ],
   [
    "A test compares yesterday's and today's sensor readings, `int[] y = {3, 5, 7}` and `int[] t = {3, 5, 7, 9}`, using `Arrays.mismatch(y, t)` and `Arrays.compare(y, t)`. What do they return, and what does each tell the tester?",
    "mismatch returns 3, the length of the shorter array, because y is a proper prefix of t. compare returns a negative number, because the shorter prefix array sorts first. mismatch says where they differ; compare says which comes first."
   ]
  ],
  "tip": "For binarySearch on a missing value, find the index where it would be inserted, negate it, and subtract one. If the array is not sorted, the answer is 'undefined'.",
  "check": [
   [
    "In `int[] a, b[];`, what is the type of b?",
    "int[][], because the brackets after the type apply to both and b adds another dimension."
   ],
   [
    "What does `Arrays.binarySearch(new int[]{1, 3, 5}, 4)` return?",
    "-3. The insertion point is 2, and -(2) - 1 = -3."
   ],
   [
    "What does `Arrays.mismatch(new int[]{5, 6}, new int[]{5, 6})` return?",
    "-1, because the arrays are equal."
   ],
   [
    "Does `int[] x; x = {1, 2};` compile?",
    "No. The short initializer form is allowed only in a declaration; use x = new int[] {1, 2}."
   ]
  ]
 },
 {
  "t": "List, Set, Map, Queue and Deque interfaces and their main implementations",
  "hook": "The help-desk system at Cedar Valley Schools is acting up during the first week of term. Tickets are answered in a random order instead of first come, first served. The list of technicians on duty shows the same person twice. And a new feature that removes \"ticket 1\" from a list of ticket numbers keeps removing the second ticket instead. Farah, the developer who inherited the code, discovers that every structure was declared as an `ArrayList`, whatever its job. She has a whole framework of collection types to choose from. Which interface fits each job, and which implementation should sit behind it?",
  "simple": "A collection is a container that holds a group of things in a program. Java offers several kinds, each with its own rules. A list keeps things in order and allows repeats, like a shopping list. A set refuses repeats, like a guest list where each name appears once. A map pairs each key with a value, like a coat check where each ticket number leads to one coat. A queue lines things up so the first in is the first served, like people waiting at a bakery. A deque, pronounced \"deck\", lets you add or remove at both ends, so it can also work as a stack of plates where the last plate added is the first taken.",
  "body": [
   "The Java Collections Framework is a set of interfaces and implementations in the `java.util` package. `Collection` is the root interface for `List`, `Set` and `Queue`, and `Deque` extends `Queue`. `Map` is part of the framework but does not extend `Collection`, because it stores key-value pairs rather than single elements, and methods such as `add(E)` would make no sense for it. You usually declare variables with the interface type, as in `List<String> names = new ArrayList<>();`, so that the rest of your code depends only on the interface and you can switch implementations later by changing one line. The diamond `<>` lets the compiler infer the type argument from the declaration.",
   "A `List` is an ordered sequence that allows duplicates and gives access by a zero-based index through methods such as `get(int)`, `set(int, E)` and `add(int, E)`. `ArrayList` is backed by a resizable array, so random access is fast but inserting or removing in the middle shifts the following elements. `LinkedList` is a doubly linked list that also implements `Deque`, so it can serve as a list or a queue. A classic trap with `List<Integer>` is `remove`. `list.remove(1)` removes the element at index 1, because `remove(int index)` is an exact match for an `int` argument and overload resolution prefers it over boxing. To remove the value 1, write `list.remove(Integer.valueOf(1))`, which calls `remove(Object)`.",
   "A `Set` holds no duplicates, as decided by its rules for equality. `HashSet` uses `hashCode` and `equals`, gives no ordering guarantee and allows one `null` element. `LinkedHashSet` adds a linked list through its entries so that iteration follows insertion order. `TreeSet` keeps elements sorted by natural order or a supplied comparator and does not allow `null` with natural ordering. When you add an element that is already present, `add` returns `false` instead of throwing an exception, and the set is unchanged. That boolean return value is a common exam detail.",
   "A `Map` associates unique keys with values. `put` returns the previous value for the key, or `null` if there was none, and replaces the old value. `get` returns `null` for a missing key. `HashMap` allows one `null` key and any number of `null` values and has no order guarantee. `LinkedHashMap` keeps insertion order. `TreeMap` keeps keys sorted and, with natural ordering, rejects a `null` key. You iterate over a map through one of its three views: `keySet()`, `values()` or `entrySet()`, where each entry offers `getKey()` and `getValue()`.",
   "A `Queue` usually processes elements first in, first out (FIFO). Each operation comes in two flavors: one that throws an exception when it fails and one that returns a special value. `add` throws if the element cannot be added, while `offer` returns `false`. `remove` throws `NoSuchElementException` on an empty queue, while `poll` returns `null`. `element` throws on an empty queue, while `peek` returns `null`. `PriorityQueue` is the exception to FIFO: `poll` always removes the smallest element by natural order or comparator, although iterating over it or printing it shows no particular order, because only the head is guaranteed. It does not accept `null`.",
   "A `Deque` (double-ended queue, pronounced \"deck\") adds operations at both ends, such as `offerFirst`, `offerLast`, `pollFirst`, `pollLast`, `peekFirst` and `peekLast`, along with throwing versions like `addFirst` and `removeLast`. It can also act as a stack, last in, first out (LIFO), with `push`, `pop` and `peek`, which all work at the front. `push` is equivalent to `addFirst`, and `pop` to `removeFirst`, so `pop` throws on an empty deque. `ArrayDeque` is the usual implementation, does not allow `null` elements and is preferred over the old synchronized `Stack` class.",
   "```java\nDeque<Integer> stack = new ArrayDeque<>();\nstack.push(1); stack.push(2); stack.push(3);\nSystem.out.println(stack.pop());   // 3 (last in, first out)\n\nQueue<Integer> queue = new ArrayDeque<>();\nqueue.offer(1); queue.offer(2); queue.offer(3);\nSystem.out.println(queue.poll());  // 1 (first in, first out)\n\nQueue<Integer> pq = new PriorityQueue<>(List.of(5, 1, 3));\nSystem.out.println(pq.poll());     // 1 (smallest first)\nSystem.out.println(new ArrayDeque<Integer>().peek()); // null, no exception\n```",
   "When choosing, ask three questions. Do I need duplicates and positions? Use a `List`. Do I need uniqueness? Use a `Set`, picking hash for speed, linked for insertion order or tree for sorting. Do I look things up by key? Use a `Map`, with the same three flavors. Do I process items in arrival or priority order? Use a `Queue` or `Deque`. On the exam, combine that with the details: the `remove(int)` overload, the boolean from `Set.add`, the previous value from `Map.put`, and which queue methods throw versus return a special value."
  ],
  "analogy": "Think of a restaurant. The reservation book is a list: ordered, and the same family can book twice. The VIP guest list is a set: each name appears once. The coat check is a map: each ticket number points to exactly one coat. The line at the host stand is a queue. The stack of clean plates is a deque used as a stack: the last plate put down is the first one taken. The analogy stops at PriorityQueue, which is more like an emergency room than a line.",
  "mnemonic": "Queue pairs, throwing method first: \"All Reports Expire, Old Papers Persist.\" add, remove, element throw; offer, poll, peek return false or null.",
  "terms": [
   [
    "List",
    "An ordered collection that allows duplicates and index-based access, such as ArrayList or LinkedList."
   ],
   [
    "Set",
    "A collection with no duplicate elements, such as HashSet, LinkedHashSet or TreeSet."
   ],
   [
    "Map",
    "A structure of unique keys mapped to values that is not a Collection, such as HashMap or TreeMap."
   ],
   [
    "Queue",
    "A collection that holds elements for processing, usually first in, first out, with throwing and non-throwing method pairs."
   ],
   [
    "Deque",
    "A double-ended queue supporting insertion and removal at both ends, usable as a queue or a stack."
   ]
  ],
  "example": "A help-desk system keeps incoming tickets in an ArrayDeque used as a FIFO queue, urgent tickets in a PriorityQueue ordered by severity, the set of agents on duty in a HashSet, and each agent's assigned tickets in a HashMap keyed by agent name.",
  "mistakes": [
   [
    "`list.remove(1)` on a `List<Integer>` removes the value 1.",
    "It removes the element at index 1, because remove(int) is an exact match. Use remove(Integer.valueOf(1)) to remove the value."
   ],
   [
    "Adding a duplicate to a Set throws an exception.",
    "add simply returns false and the set is unchanged."
   ],
   [
    "Map is a subinterface of Collection.",
    "Map is part of the framework but does not extend Collection."
   ],
   [
    "Printing a PriorityQueue shows its elements in sorted order.",
    "Only the head is guaranteed to be the smallest. Iteration and toString show no particular order; poll repeatedly to get sorted order."
   ]
  ],
  "tryit": [
   [
    "A print shop's job tracker must handle jobs in arrival order, but a manager can push an urgent job to the very front. The app must never crash when the tracker is empty; it should just show \"no jobs\". Which interface, implementation and removal method fit best?",
    "A Deque implemented by ArrayDeque. Normal jobs use offerLast, urgent jobs use offerFirst, and the worker uses pollFirst, which returns null on an empty deque instead of throwing."
   ],
   [
    "Code runs `Set<String> s = new HashSet<>(); System.out.println(s.add(\"x\") + \" \" + s.add(\"x\")); Map<String,Integer> m = new HashMap<>(); System.out.println(m.put(\"k\", 1) + \" \" + m.put(\"k\", 2));`. What is printed?",
    "\"true false\" and then \"null 1\". The second add finds a duplicate and returns false. The first put returns null because there was no previous value; the second returns the previous value 1."
   ]
  ],
  "tip": "Learn the queue pairs: add/offer, remove/poll, element/peek. The first of each throws on failure, the second returns false or null. push and pop on a Deque work at the front.",
  "check": [
   [
    "For `List<Integer> list = new ArrayList<>(List.of(10, 20, 30));`, what does `list.remove(1)` remove?",
    "The element at index 1, which is 20, because remove(int) matches the int argument exactly."
   ],
   [
    "What does `poll()` return on an empty queue?",
    "null. remove() would throw NoSuchElementException instead."
   ],
   [
    "Does Map extend Collection?",
    "No. Map is a separate interface in the framework."
   ],
   [
    "Which Set implementation keeps insertion order?",
    "LinkedHashSet. HashSet has no order guarantee and TreeSet keeps sorted order."
   ]
  ]
 },
 {
  "t": "Unmodifiable collections: List.of, Set.of, Map.of and Arrays.asList behavior",
  "hook": "A security reviewer at Harborview Clinic flags something odd in the patient portal: uploaded files ending in `.exe` were accepted for an hour last Tuesday. The allowed extensions were supposed to be fixed in code. Theo traces it to a plugin that called `add(\"exe\")` on the configuration's extension list, which was built with `Arrays.asList`. Elsewhere in the same codebase, a different list built with `List.of` threw an exception the moment anyone tried to change it, and a third, made with `Collections.unmodifiableList`, still changed when the underlying list did. Three lists, three behaviors. Which factory gives Theo a list that truly cannot change, and what will it reject?",
  "simple": "Java can make lists, sets and maps that are locked, so nobody can add, remove or replace items after they are created. You make them quickly with methods like List.of. If code tries to change a locked collection, the program stops with an error rather than quietly changing it. These locked collections also refuse empty values, called null, and a locked set or map refuses repeats. A different helper, Arrays.asList, makes a list that is glued to an existing array. You can swap an item in place, and the array changes too, but you cannot make the list longer or shorter. Think of a printed menu: a locked list is laminated, while Arrays.asList is a menu board with a fixed number of slots.",
  "body": [
   "The factory methods `List.of`, `Set.of` and `Map.of`, added in Java 9, create unmodifiable collections in one line, such as `List.of(\"pdf\", \"png\")`. Any attempt to change them, using methods like `add`, `remove`, `put`, `clear`, `set` or `sort`, compiles fine, because those methods are declared on the `List`, `Set` and `Map` interfaces, but throws `UnsupportedOperationException` at runtime. That is the pattern the exam tests repeatedly: code that compiles and then fails. Whenever you see a mutating call on a collection, trace back to how the collection was created before deciding what happens.",
   "These factories are strict about their contents. Passing a `null` element, key or value throws `NullPointerException` immediately, at creation time. Even calling `contains(null)` on a `List.of` result throws `NullPointerException`. `Set.of` with duplicate elements and `Map.of` with duplicate keys throw `IllegalArgumentException`, because silently dropping data would hide a bug; a regular `HashSet` would just ignore the duplicate. The iteration order of `Set.of` and `Map.of` results is unspecified and may differ between runs, so never rely on it. `Map.of` takes keys and values as alternating arguments for up to 10 pairs; for more, use `Map.ofEntries(Map.entry(k, v), ...)`, which accepts any number of entries.",
   "Copies and views are a separate pair of ideas. `List.copyOf`, `Set.copyOf` and `Map.copyOf`, added in Java 10, create unmodifiable copies of an existing collection. They follow the same no-null rule, so copying a list that contains `null` throws `NullPointerException`, and later changes to the source do not affect the copy. `Set.copyOf` quietly removes duplicates from its source rather than throwing. This differs from `Collections.unmodifiableList(list)`, which returns a read-only view: you cannot change the list through the view, but changes made to the original list show through it. A view protects against callers, not against the owner of the original.",
   "`Arrays.asList(array)` is a different creature with its own rules. It returns a fixed-size list backed by the array. You can call `set` to replace elements, and the change writes through to the array; changes made to the array show up in the list too. You can even sort it in place, which reorders the array. But `add` and `remove` throw `UnsupportedOperationException`, because the size is fixed by the array underneath. Unlike `List.of`, `Arrays.asList` allows `null` elements. One subtle trap: passing a primitive array such as `int[]` produces a `List<int[]>` with one element, because generics cannot hold primitives.",
   "The following code shows each behavior side by side. Read the commented-out lines as lines that would compile but fail at runtime.",
   "```java\nString[] arr = {\"a\", \"b\", \"c\"};\nList<String> fixed = Arrays.asList(arr);\nfixed.set(0, \"z\");              // OK: arr[0] is now \"z\"\narr[1] = \"y\";                   // list sees it: [z, y, c]\n// fixed.add(\"d\");              // UnsupportedOperationException\n\nList<String> immutable = List.of(\"a\", \"b\");\n// immutable.set(0, \"z\");       // UnsupportedOperationException\n// List.of(\"a\", null);          // NullPointerException\n// Set.of(\"a\", \"a\");            // IllegalArgumentException\n\nList<String> growable = new ArrayList<>(List.of(\"a\", \"b\"));\ngrowable.add(\"c\");              // OK: a regular ArrayList copy\n```",
   "The last lines show the standard escape hatch. When you need a modifiable list with initial values, pass the factory result to a constructor: `new ArrayList<>(List.of(\"a\", \"b\"))`, `new HashSet<>(Set.of(...))` or `new HashMap<>(Map.of(...))`. The new collection is an ordinary, fully modifiable copy that also accepts `null` if you add it later. The reverse direction is common in well-designed classes: a class keeps a private modifiable list internally and returns `List.copyOf(items)` or `Collections.unmodifiableList(items)` from its getter, so callers can read the data but cannot change the object's state behind its back. Choose the copy when callers should see a stable snapshot, and the view when they should see live updates without the cost of copying on every call.",
   "Unmodifiable is shallow. A `List.of(sb1, sb2)` holding `StringBuilder` objects cannot gain or lose elements, and you cannot replace either builder, but each builder can still be changed with `append`. True immutability requires immutable elements as well, such as `String`, the wrapper classes or records whose fields are themselves immutable. This matters for security reviews: an unmodifiable list of mutable objects does not stop a caller from altering the objects.",
   "A quick way to remember the table: `List.of` and its relatives mean no changes and no nulls; `Arrays.asList` means `set` yes, `add` or `remove` no, nulls allowed, and backed by the array; `Collections.unmodifiableList` is a read-only window onto a list that can still change; and `new ArrayList<>(...)` is fully modifiable."
  ],
  "analogy": "List.of is a laminated menu: nothing can be crossed out or added, and it was printed without blank lines (no nulls). Arrays.asList is a chalk menu board with a fixed number of slots bolted to the wall: you can rewrite any slot, and the board and the wall are the same object, but you cannot add slots. Collections.unmodifiableList is a window into the kitchen whiteboard: customers cannot write on it, but the chef still can, and they see every change.",
  "terms": [
   [
    "Unmodifiable collection",
    "A collection whose mutator methods throw UnsupportedOperationException, such as those from List.of."
   ],
   [
    "UnsupportedOperationException",
    "The runtime exception thrown when a collection does not support a modifying operation."
   ],
   [
    "Fixed-size list",
    "The list returned by Arrays.asList, which supports set but not add or remove and is backed by the array."
   ],
   [
    "Unmodifiable view",
    "A read-only wrapper, such as Collections.unmodifiableList, that still reflects changes to the underlying collection."
   ],
   [
    "List.copyOf",
    "Creates an unmodifiable copy of a collection that is unaffected by later changes to the source and rejects null elements."
   ]
  ],
  "example": "A configuration class exposes its allowed file extensions as `List.of(\"pdf\", \"png\", \"jpg\")`. When a plugin tries to add \"exe\" to the list at runtime, it gets an UnsupportedOperationException instead of silently widening what the upload feature accepts.",
  "mistakes": [
   [
    "Calling add on a List.of result is a compile error.",
    "It compiles, because add is declared on List, and throws UnsupportedOperationException at runtime."
   ],
   [
    "Arrays.asList returns an unmodifiable list, just like List.of.",
    "It returns a fixed-size list backed by the array: set works and writes through, add and remove throw, and null is allowed."
   ],
   [
    "Set.of quietly ignores duplicates, like HashSet.",
    "Set.of and Map.of throw IllegalArgumentException for duplicate elements or keys."
   ],
   [
    "Collections.unmodifiableList makes a frozen copy.",
    "It is a read-only view. Changes to the original list are visible through it. Use List.copyOf for an independent unmodifiable copy."
   ]
  ],
  "tryit": [
   [
    "Sam needs a list of five default colors that the user can later extend with custom colors. He writes `List<String> colors = List.of(\"red\", \"blue\", ...);` and the app crashes when the user adds a color. What should he write instead, and why?",
    "`List<String> colors = new ArrayList<>(List.of(\"red\", \"blue\", ...));`. List.of returns an unmodifiable list, so add throws UnsupportedOperationException; copying it into an ArrayList gives a fully modifiable list with the same starting values."
   ],
   [
    "Given `List<String> src = new ArrayList<>(List.of(\"a\")); List<String> view = Collections.unmodifiableList(src); List<String> copy = List.copyOf(src); src.add(\"b\");`, what are view.size() and copy.size()?",
    "view.size() is 2, because the view reflects changes to src. copy.size() is 1, because copyOf made an independent snapshot."
   ]
  ],
  "tip": "Mutating a List.of, Set.of or Map.of collection compiles but throws UnsupportedOperationException. Arrays.asList allows set but not add or remove, and writes through to the array.",
  "check": [
   [
    "What happens with `Map.of(\"a\", 1, \"a\", 2)`?",
    "IllegalArgumentException at runtime, because of the duplicate key."
   ],
   [
    "After `String[] a = {\"x\"}; List<String> l = Arrays.asList(a); l.set(0, \"y\");`, what is a[0]?",
    "\"y\". The list is backed by the array, so set writes through."
   ],
   [
    "Does `List.of(1, 2).add(3)` compile?",
    "Yes, but it throws UnsupportedOperationException at runtime."
   ],
   [
    "What does `List.of(\"a\", null)` do?",
    "It throws NullPointerException, because the factory methods reject null elements."
   ]
  ]
 },
 {
  "t": "Sequenced collections: getFirst, getLast, addFirst, reversed",
  "hook": "Quinn is refactoring the recently viewed products feature at Maplewood Outfitters. The old code is a patchwork: `list.get(list.size() - 1)` here, `deque.peekLast()` there, and for the `LinkedHashSet` of product IDs, a loop that walks the entire set just to find the last element. A senior developer suggests the newer sequenced collection methods, which promise one way to ask for the first or last element of any ordered collection. Quinn tries `getFirst()` and it works on the list and the set, but the compiler rejects it on a variable declared as `Set`, and a test crashes on an empty list. What exactly do these methods promise, and where do they refuse to help?",
  "simple": "Many collections keep their items in a definite order: a list, a line of people, a set that remembers the order things were added. Before Java 21, each kind had its own way to get the first or last item. Now they share one set of simple commands: get the first item, get the last item, add to the front or back, remove from either end, and look at everything in reverse. Collections with no real order, such as a plain HashSet, do not get these commands, because \"first\" means nothing to them. It is like a bookshelf versus a bag of marbles: you can name the first book on a shelf, but not the first marble in a bag.",
  "body": [
   "Before Java 21, getting the first or last element worked differently for each collection type. Lists used `list.get(0)` and `list.get(list.size() - 1)`, deques used `getFirst()` and `getLast()`, sorted sets used `first()` and `last()`, and a `LinkedHashSet` offered nothing convenient at all for its last element. Reversing was equally inconsistent. Sequenced collections, added in Java 21, give every collection that has a defined encounter order one common set of methods, so code can be written once against a shared interface.",
   "Three new interfaces form the core. `SequencedCollection` declares `addFirst`, `addLast`, `getFirst`, `getLast`, `removeFirst`, `removeLast` and `reversed`. `List` and `Deque` now extend it, so `ArrayList`, `LinkedList` and `ArrayDeque` all have these methods. A new `SequencedSet` interface extends both `SequencedCollection` and `Set`; it is implemented by `LinkedHashSet` and extended by `SortedSet`, so `NavigableSet` and `TreeSet` have it too. `HashSet` does not, because it has no defined order. For maps, `SequencedMap` is implemented by `LinkedHashMap` and extended by `SortedMap`, so `TreeMap` has it as well; `HashMap` does not.",
   "The behavior details are what the exam checks. `getFirst`, `getLast`, `removeFirst` and `removeLast` on an empty collection throw `NoSuchElementException`; they do not return `null`, unlike `peekFirst` or `pollFirst` on a deque. On unmodifiable collections such as those from `List.of(...)`, the add and remove methods throw `UnsupportedOperationException`, while `getFirst` and `getLast` work normally. On sorted collections like `TreeSet`, `addFirst` and `addLast` throw `UnsupportedOperationException`, because the sort order, not the caller, decides where an element goes. On a `LinkedHashSet`, `addFirst` and `addLast` move an element that is already present to the requested end rather than adding a duplicate.",
   "`reversed()` returns a reverse-ordered view, not a copy. Iterating over it visits elements from last to first, and changes to the original show through the view immediately. If the original is modifiable, changes made through the view, where supported, write back to the original, so `list.reversed().addFirst(x)` actually appends `x` to the end of `list`. Calling `reversed()` on the view gives you back the original order. Because it is a view, it is cheap to create even for large collections.",
   "The following code shows the methods on a list, then a `LinkedHashSet`, with two lines that would fail at runtime commented out.",
   "```java\nList<String> list = new ArrayList<>(List.of(\"b\", \"c\"));\nlist.addFirst(\"a\");                    // [a, b, c]\nlist.addLast(\"d\");                     // [a, b, c, d]\nSystem.out.println(list.getFirst());   // a\nSystem.out.println(list.getLast());    // d\nList<String> rev = list.reversed();\nSystem.out.println(rev);               // [d, c, b, a]\nlist.removeFirst();\nSystem.out.println(rev);               // [d, c, b]  (view reflects change)\n\nvar set = new LinkedHashSet<>(List.of(1, 2, 3));\nset.addFirst(3);                       // [3, 1, 2]\n// new TreeSet<>(set).addFirst(0);     // UnsupportedOperationException\n// new ArrayList<String>().getFirst(); // NoSuchElementException\n```",
   "Maps get a parallel set of methods. `SequencedMap` adds `firstEntry`, `lastEntry`, `pollFirstEntry`, `pollLastEntry`, `putFirst`, `putLast` and `reversed`, plus `sequencedKeySet()`, `sequencedValues()` and `sequencedEntrySet()`, which return sequenced views of the keys, values and entries. Unlike `getFirst` on a collection, `firstEntry` and `lastEntry` return `null` for an empty map, and the poll methods remove and return an entry or `null`. As with sorted sets, `putFirst` and `putLast` are unsupported on a `TreeMap`, since the keys' order decides placement. On a `LinkedHashMap`, `putFirst` places the entry first, moving it if the key already exists.",
   "The reference type still controls what compiles. `Collection`, `Set` and `Map` themselves did not gain these methods; only the sequenced subtypes did. So `Set<String> s = new LinkedHashSet<>(); s.getFirst();` does not compile, because the compiler sees only `Set`. Declaring the variable as `SequencedSet<String>` or `LinkedHashSet<String>`, or using `var`, makes the call legal. `List` references are fine, because `List` itself extends `SequencedCollection`. The same applies to method parameters: a utility method that should accept any ordered collection can declare a `SequencedCollection<T>` parameter, which accepts an `ArrayList`, an `ArrayDeque` or a `LinkedHashSet`, but rejects a `HashSet` at compile time. That is one of the design goals of the feature, because it lets an API state in its signature that it depends on order.",
   "Some older methods now overlap with the new ones, and that is intentional. On a `Deque`, `getFirst` and `getLast` already existed with the same throwing behavior, so nothing changes there. On a `SortedSet`, `getFirst()` returns the same element as `first()`, and both throw `NoSuchElementException` when the set is empty. On a `List`, `getFirst()` is equivalent to `get(0)`, except that an empty list throws `NoSuchElementException` rather than `IndexOutOfBoundsException`, a difference exam questions can exploit.",
   "On the exam, work through three checks in order. First, does the reference type have the method? Second, does the implementation support the operation, remembering that sorted collections reject add-first style calls and unmodifiable collections reject all changes? Third, is the collection empty, which turns get and remove calls into `NoSuchElementException`?"
  ],
  "analogy": "A sequenced collection is like a line of people at a ticket window: you can always point to the person at the front and the person at the back, and you can look down the line from either end. A HashSet is a crowd in a park, with no front or back to point to. A TreeSet is a line sorted by height: you can see who is first, but you cannot tell someone to stand at the front, because their height decides their spot.",
  "terms": [
   [
    "SequencedCollection",
    "A Java 21 interface for collections with a defined encounter order, providing first and last operations and reversed()."
   ],
   [
    "SequencedSet",
    "A sequenced collection with no duplicates, implemented by LinkedHashSet and inherited by SortedSet and TreeSet."
   ],
   [
    "SequencedMap",
    "A map with a defined entry order, implemented by LinkedHashMap and extended by SortedMap, so TreeMap has it too."
   ],
   [
    "reversed()",
    "Returns a reverse-ordered view of a sequenced collection or map that reflects later changes."
   ],
   [
    "Encounter order",
    "The defined order in which a collection's elements are visited, such as index order in a list or insertion order in a LinkedHashSet."
   ]
  ],
  "example": "A browser keeps visited pages in a LinkedHashSet. Revisiting a page calls `history.addFirst(url)`, which moves it to the front without duplicating it, and the history menu displays `history.reversed()` or the first ten entries depending on the user's chosen order.",
  "mistakes": [
   [
    "getFirst() returns null on an empty collection, like peek().",
    "getFirst, getLast, removeFirst and removeLast throw NoSuchElementException on an empty collection."
   ],
   [
    "Every Set has getFirst() since Java 21.",
    "Only sequenced sets do. HashSet does not, and a variable declared as Set cannot call getFirst even if the object is a LinkedHashSet."
   ],
   [
    "reversed() returns a new reversed copy.",
    "It returns a view. Changes to the original appear in it, and supported changes through it write back to the original."
   ],
   [
    "addFirst works on any sequenced set, including TreeSet.",
    "TreeSet and TreeMap throw UnsupportedOperationException for addFirst, addLast, putFirst and putLast, because sort order decides placement."
   ]
  ],
  "tryit": [
   [
    "Lina's music app keeps a play queue as `LinkedHashSet<String> queue = new LinkedHashSet<>(List.of(\"s1\", \"s2\", \"s3\"));`. A user taps \"play next\" on s3, and the code calls `queue.addFirst(\"s3\")`. What does the queue contain, and what does `queue.reversed().getFirst()` return?",
    "The queue is [s3, s1, s2], because addFirst moves an existing element to the front without duplicating it. queue.reversed().getFirst() returns s2, the last element of the original."
   ],
   [
    "Ben writes a utility method `static <T> T lastOf(Collection<T> c) { return c.getLast(); }` so it works for lists and sets. It fails to compile. Why, and what parameter type should he use?",
    "Collection does not declare getLast; only SequencedCollection and its subtypes do. He should use SequencedCollection<T> as the parameter type, which accepts lists, deques and sequenced sets."
   ]
  ],
  "tip": "Check the reference type first: Set and Collection references do not have getFirst. Then check the implementation: TreeSet and TreeMap reject addFirst and putFirst, unmodifiable lists reject all changes, and empty collections throw NoSuchElementException.",
  "check": [
   [
    "Does `HashSet` have `getFirst()`?",
    "No. HashSet has no defined order, so it does not implement SequencedCollection."
   ],
   [
    "What does `new ArrayList<Integer>().getLast()` do?",
    "It throws NoSuchElementException because the list is empty."
   ],
   [
    "Is the list returned by `reversed()` a copy?",
    "No. It is a view, so changes to the original list appear in it."
   ],
   [
    "Does `List.of(1, 2, 3).getFirst()` work?",
    "Yes, it returns 1. Reading is allowed on unmodifiable lists; only add and remove methods throw."
   ]
  ]
 },
 {
  "t": "Map methods: merge, computeIfAbsent, getOrDefault, putIfAbsent",
  "hook": "The nightly report at Granite Street Library counts how many times each book was borrowed, and this morning the totals are wrong. Some books show one loan when they had five; others are missing entirely. Wren, the developer, finds a twelve-line block of `if (map.containsKey(...))` checks with a misplaced `else`, plus a second block that builds lists of overdue books and occasionally overwrites a list it should have added to. A reviewer suggests replacing both blocks with two one-line calls: `merge` and `computeIfAbsent`. Wren likes the idea but has to explain to the team exactly what each call returns and what happens when a key is missing or mapped to `null`. Can she?",
  "simple": "A map stores pairs: a key, like a book title, and a value, like how many times it was borrowed. Java maps come with shortcut methods for everyday jobs. One gives you a fallback answer if the key is missing, without changing anything. One adds a pair only if the key is not already there. One builds a value on demand the first time you ask for a key, which is handy for starting an empty list. One combines a new value with an old one, which makes counting easy: add one to the old count, or start at one if there is none. It is like a tally sheet where you add a mark next to a name, or write the name if it is new.",
  "body": [
   "Beyond `put` and `get`, the `Map` interface has default methods, added in Java 8, that handle common patterns in a single call: counting, grouping and supplying fallbacks. They replace multi-line `containsKey` checks that are easy to get wrong. The exam tests their exact return values and how they treat missing keys and keys mapped to `null`, so it pays to learn each method's rule precisely rather than guessing from its name. A useful phrase to keep in mind is \"absent or mapped to null\", because most of these methods treat those two situations the same way.",
   "`getOrDefault(key, defaultValue)` returns the value for the key if the key is present, and `defaultValue` otherwise. It never changes the map; it is a read with a fallback. There is one subtle case. For a key that is present but mapped to `null`, which is possible in a `HashMap`, it returns `null`, not the default, because the key does exist. This is the one method in the group that does not treat a `null` mapping like an absent key, which makes it a favorite exam trap.",
   "`putIfAbsent(key, value)` adds the mapping only if the key is absent or currently mapped to `null`. It returns the previous value: `null` if it added the mapping, or the existing value if it left the map unchanged. It never overwrites a non-null value. Notice the return value carefully: a `null` return means \"I stored your value\", while a non-null return means \"I kept the old one, here it is\". Compare that with plain `put`, which always overwrites and returns the previous value.",
   "`computeIfAbsent(key, mappingFunction)` calls the function only when the key is absent or mapped to `null`. The function receives the key, and its result is stored and returned. If the key already has a non-null value, the function is not called at all and the existing value is returned, which matters if the function is expensive or has side effects. If the function returns `null`, nothing is stored and the method returns `null`. This makes it ideal for grouping into lists: `map.computeIfAbsent(dept, k -> new ArrayList<>()).add(name);` creates a list the first time a department appears and reuses it afterward. The related `computeIfPresent` runs its function only when a non-null value exists, and `compute` always runs, receiving the current value or `null`.",
   "`merge(key, value, remappingFunction)` combines a new value with an existing one. If the key is absent or mapped to `null`, it stores the given value without calling the function. Otherwise it calls the function with the old value and the new value, in that order, and stores the result. If the function returns `null`, the key is removed from the map. `merge` returns the new value associated with the key, or `null` if the mapping was removed. Counting words becomes one line: `counts.merge(word, 1, Integer::sum);`. The `value` argument itself must not be `null`, or `merge` throws `NullPointerException`.",
   "The following example walks through each method on one `HashMap` that includes a key mapped to `null`. Predict each printed value before reading its comment.",
   "```java\nMap<String, Integer> stock = new HashMap<>();\nstock.put(\"apple\", 5);\nstock.put(\"pear\", null);\n\nSystem.out.println(stock.getOrDefault(\"kiwi\", 0));    // 0\nSystem.out.println(stock.getOrDefault(\"pear\", 0));    // null\nSystem.out.println(stock.putIfAbsent(\"apple\", 9));    // 5 (unchanged)\nSystem.out.println(stock.putIfAbsent(\"pear\", 2));     // null (now 2)\nSystem.out.println(stock.merge(\"apple\", 3, Integer::sum)); // 8\nstock.merge(\"apple\", 0, (oldV, newV) -> null);        // removes apple\nSystem.out.println(stock.computeIfAbsent(\"fig\", k -> k.length())); // 3\nSystem.out.println(stock);  // {pear=2, fig=3} (order not guaranteed)\n```",
   "These methods exist on every `Map` implementation, including `TreeMap`, `LinkedHashMap` and `ConcurrentHashMap`. On `ConcurrentHashMap`, the compute and merge methods are performed atomically, which is why they are the recommended way to update shared counters from several threads. Note that `ConcurrentHashMap` and `TreeMap` with natural ordering do not accept `null` keys, and `ConcurrentHashMap` does not accept `null` values either. With unmodifiable maps such as those from `Map.of`, any of these methods that would change the map throws `UnsupportedOperationException`.",
   "On the exam, answer two questions for each call. Does the map change, and to what? And what does the method return? Remember the pattern: `putIfAbsent` returns the old value, `computeIfAbsent` and `merge` return the current value after the call, and `getOrDefault` never changes anything. When a question shows a sequence of calls, keep a small table on scratch paper with the map's contents after each line, and write the return value beside it; most wrong answers come from mixing up the old value and the new one."
  ],
  "analogy": "Picture a tally sheet at a bake sale. getOrDefault is glancing at the sheet: if a cake is not listed, you assume zero, but you do not write anything. putIfAbsent writes a name only on a blank line. computeIfAbsent is setting up a new labeled jar the first time a new cake type shows up. merge is adding a tally mark next to a name, or writing the name with one mark if it is new; crossing out the total (a null result) removes the line entirely.",
  "terms": [
   [
    "getOrDefault",
    "Returns the mapped value if the key is present, otherwise the supplied default, without modifying the map."
   ],
   [
    "putIfAbsent",
    "Stores a value only when the key is absent or mapped to null, and returns the previous value."
   ],
   [
    "computeIfAbsent",
    "Computes and stores a value from the key only when the key is absent or mapped to null, returning the current value."
   ],
   [
    "merge",
    "Stores a value for an absent key, or combines it with the existing value using a function; a null result removes the key."
   ],
   [
    "Remapping function",
    "The BiFunction passed to merge or compute that receives the old value and a new value and returns the value to store."
   ]
  ],
  "example": "An analytics job reads millions of log lines and counts hits per page with `hits.merge(page, 1, Integer::sum)`, and it groups error messages by status code with `errors.computeIfAbsent(code, c -> new ArrayList<>()).add(line)`, replacing a dozen lines of if-contains-then-put code.",
  "mistakes": [
   [
    "getOrDefault returns the default whenever the stored value is null.",
    "It returns the default only when the key is absent. A key present with a null value returns null."
   ],
   [
    "putIfAbsent returns the value now in the map.",
    "It returns the previous value: null if it inserted, or the existing value if it left the map unchanged."
   ],
   [
    "computeIfAbsent always calls its function and then decides whether to store.",
    "The function is called only when the key is absent or mapped to null. Otherwise it is skipped entirely."
   ],
   [
    "If merge's function returns null, null is stored as the value.",
    "A null result removes the key from the map."
   ]
  ],
  "tryit": [
   [
    "A school app tracks club sign-ups in `Map<String, List<String>> clubs`. Ravi wants to add a student to a club, creating the club's list if needed, in one line. He considers `clubs.putIfAbsent(club, new ArrayList<>()).add(name);`. Will it work, and what should he use?",
    "No. putIfAbsent returns the previous value, which is null the first time, so .add throws NullPointerException. He should use clubs.computeIfAbsent(club, k -> new ArrayList<>()).add(name), which returns the current list."
   ],
   [
    "A map holds `{\"a\"=1}`. Code calls `m.merge(\"a\", 5, (o, n) -> o > 3 ? o + n : null)` and then `m.merge(\"b\", 5, Integer::sum)`. What does each call return, and what is the final map?",
    "The first call computes 1 > 3, which is false, so the function returns null; \"a\" is removed and merge returns null. The second call finds \"b\" absent, stores 5 without calling the function and returns 5. The final map is {b=5}."
   ]
  ],
  "tip": "Check the return value asked for: putIfAbsent returns the old value (null when it inserted), while merge and computeIfAbsent return the current value. A null result from merge's function removes the key.",
  "check": [
   [
    "What does `putIfAbsent` return when the key already maps to 7?",
    "7, the existing value, and the map is not changed."
   ],
   [
    "When is the function in `computeIfAbsent` called?",
    "Only when the key is absent or mapped to null."
   ],
   [
    "What happens if the remapping function in `merge` returns null?",
    "The key's mapping is removed from the map."
   ],
   [
    "What does `getOrDefault(\"k\", 0)` return if \"k\" is mapped to null?",
    "null, because the key is present; the default is used only for absent keys."
   ]
  ]
 },
 {
  "t": "Sorting with Comparable and Comparator (comparing, thenComparing, reversed)",
  "hook": "Customers of Fernhill Market's online store are complaining that \"sort by price\" puts a 2-dollar item after a 19-dollar item, and that among equally priced items the worst-rated products appear first. Isaac, the developer, inherited a hand-written comparator that subtracts prices cast to `int` and then calls `reversed()` at the end of a chain, which flips more than he intended. He also notices the product class has its own `compareTo` that nobody uses anymore. Before he rewrites anything, he needs to be sure: what is the difference between a class's natural order and a separate comparator, and how do `thenComparing` and `reversed` combine?",
  "simple": "Sorting means putting things in order, but Java has to be told what \"order\" means for your objects. There are two ways. A class can carry its own built-in, default order, like dictionary order for words; that is called Comparable. Or you can write a separate rule from outside, like \"sort students by age\", and pass it in when you sort; that is a Comparator. Java can chain rules together: sort by last name, and if two people share a last name, sort by first name. You can also flip a rule so it runs backward, from largest to smallest. It is like a librarian who shelves books by author, then by title for books with the same author.",
  "body": [
   "Java has two ways to define an order, and the exam expects you to know both. `Comparable<T>`, in `java.lang`, gives a class its natural ordering from inside the class, through one method, `int compareTo(T other)`. `Comparator<T>`, in `java.util`, defines an ordering from outside the class, through `int compare(T a, T b)`, so you can have many different orders for one type without changing the class. Both methods return a negative number if the first object comes first, zero if they are equal in order, and a positive number if the first comes after. The exact magnitude does not matter, so `compareTo` may return 31 rather than 1.",
   "Many standard types already implement `Comparable`. `String`, the wrapper classes such as `Integer` and `Double`, `LocalDate` and all enums have a natural order. Strings compare character by character by Unicode value, so uppercase letters sort before lowercase letters and \"Zebra\" comes before \"apple\". Enums compare by ordinal, meaning the order in which the constants are declared, not alphabetically. When you implement `compareTo` yourself, it should be consistent with `equals`: return 0 exactly when `equals` returns true. Sorted collections like `TreeSet` and `TreeMap` use `compareTo` to decide duplicates, so an inconsistent implementation causes surprising results such as distinct objects being treated as one.",
   "For numeric fields, use `Integer.compare(a, b)`, `Long.compare` or `Double.compare` rather than subtracting (`a - b`). Subtraction can overflow for large or negative values, wrapping around to the wrong sign, and casting decimal values to `int` before subtracting loses precision, so 2.10 and 2.90 compare as equal. The `compare` helpers always return a correct sign.",
   "The `Comparator` interface has static and default methods that build comparators without writing `compare` by hand. `Comparator.comparing(Person::lastName)` sorts by a key that is itself `Comparable`. `comparingInt`, `comparingLong` and `comparingDouble` take primitive keys and avoid boxing. `thenComparing(...)` adds a tie-breaker that is consulted only when the previous comparison returns 0; it accepts either a key extractor, a key extractor plus a comparator for that key, or a whole comparator. `reversed()` reverses the entire comparator it is called on. `Comparator.naturalOrder()` and `Comparator.reverseOrder()` give natural ordering and its reverse, and `Comparator.nullsFirst(...)` and `nullsLast(...)` wrap a comparator so that `null` values sort at one end instead of causing a `NullPointerException`.",
   "The following record and list show three common chains. Trace each sort and compare your result with the comment.",
   "```java\nrecord Person(String last, String first, int age) {}\nList<Person> people = new ArrayList<>(List.of(\n    new Person(\"Lee\", \"Ann\", 30),\n    new Person(\"Kim\", \"Bo\", 25),\n    new Person(\"Lee\", \"Al\", 41)));\n\npeople.sort(Comparator.comparing(Person::last)\n                      .thenComparing(Person::first));\n// Kim Bo, Lee Al, Lee Ann\n\npeople.sort(Comparator.comparingInt(Person::age).reversed());\n// Lee Al (41), Lee Ann (30), Kim Bo (25)\n\npeople.sort(Comparator.comparing(Person::last)\n                      .thenComparing(Person::age, Comparator.reverseOrder()));\n// Kim Bo, Lee Al (41), Lee Ann (30)\n```",
   "Position matters with `reversed()`. In `comparing(a).thenComparing(b).reversed()`, the call applies to the whole chain built so far, so both keys are reversed. To reverse only the second key, pass a reversed comparator into `thenComparing`, as in the last example above, or write `thenComparing(Comparator.comparing(b).reversed())`. Another trap involves type inference. `Comparator.comparing(p -> p.last()).reversed()` may fail to compile, because with the chained call the compiler cannot infer the lambda's parameter type from the target and treats `p` as `Object`, which has no `last()` method. A method reference such as `Person::last` or an explicitly typed lambda, `(Person p) -> p.last()`, fixes it.",
   "There are several ways to actually sort. Call `list.sort(comparator)`, or `list.sort(null)` for natural order; `Collections.sort(list)` for natural order; `Collections.sort(list, comparator)`; or `Arrays.sort(array, comparator)` for object arrays. Sorting objects that are not `Comparable` without a comparator fails with a `ClassCastException` at runtime for `list.sort(null)` and `Arrays.sort`, but it is a compile error with the one-argument `Collections.sort`, whose generic signature requires the element type to be `Comparable`. These object sorts are stable, so equal elements keep their existing relative order, which is why sorting by first name and then by last name in two separate passes gives the same result as one chained comparator.",
   "Records, enums and other classes you write can implement `Comparable` to define a sensible default, while comparators handle every other order a screen or report needs. On the exam, read comparator chains left to right, apply each `reversed()` to everything before it, and remember that natural order for strings is Unicode order, not alphabetical order ignoring case."
  ],
  "analogy": "Comparable is like the order printed on a deck of cards by the manufacturer: every card knows where it belongs by default. A Comparator is a house rule a game group writes on an index card, such as \"sort by suit, then by rank, high to low\". You can have many index cards for the same deck. The analogy breaks a little with reversed(): flipping the index card reverses every rule written above that point, not just the last line.",
  "terms": [
   [
    "Comparable",
    "An interface a class implements to define its natural ordering through compareTo."
   ],
   [
    "Comparator",
    "A separate object that defines an ordering through compare, allowing several orders for one type."
   ],
   [
    "thenComparing",
    "A Comparator method that adds a secondary key used only when the first comparison is a tie."
   ],
   [
    "reversed()",
    "A Comparator default method that returns a comparator imposing the reverse of the entire chain it is called on."
   ],
   [
    "Stable sort",
    "A sort that keeps equal elements in their original relative order."
   ]
  ],
  "example": "An online store's product page lets shoppers sort by price, then by rating. The code builds `Comparator.comparingDouble(Product::price).thenComparing(Product::rating, Comparator.reverseOrder())`, so cheaper items come first and, among equal prices, the best rated appear on top.",
  "mistakes": [
   [
    "Calling reversed() at the end of a chain reverses only the last key.",
    "reversed() reverses the whole comparator built so far. To reverse one key, pass a reversed comparator to thenComparing."
   ],
   [
    "compareTo must return exactly -1, 0 or 1.",
    "Any negative, zero or positive value is valid; only the sign matters."
   ],
   [
    "Strings sort alphabetically ignoring case.",
    "Natural String order is by Unicode value, so all uppercase letters come before lowercase ones. Use String.CASE_INSENSITIVE_ORDER for a case-insensitive sort."
   ],
   [
    "Subtracting two int fields is a safe way to write compareTo.",
    "Subtraction can overflow and give the wrong sign. Use Integer.compare."
   ]
  ],
  "tryit": [
   [
    "A school roster must list students by grade level descending (12 down to 9), and within a grade by last name A to Z. Mia writes `Comparator.comparingInt(Student::grade).thenComparing(Student::last).reversed()`. Is that right, and what should she write?",
    "No. The final reversed() flips both keys, so last names would run Z to A. She should write `Comparator.comparingInt(Student::grade).reversed().thenComparing(Student::last)`, which reverses only the grade."
   ],
   [
    "Given `enum Size { SMALL, LARGE, MEDIUM }` and a list of sizes sorted with `Collections.sort(list)`, what order results, and why might a developer be surprised?",
    "SMALL, LARGE, MEDIUM, because enums compare by ordinal, the declaration order. A developer expecting alphabetical or logical size order would be surprised; reordering the constants or using a comparator fixes it."
   ]
  ],
  "tip": "Read comparator chains left to right, and apply reversed() to everything before it in the chain. compareTo and compare return negative, zero or positive, not only -1, 0 and 1.",
  "check": [
   [
    "What does `\"apple\".compareTo(\"Banana\")` return, positive or negative?",
    "Positive. Lowercase 'a' has a higher Unicode value than uppercase 'B', so \"apple\" sorts after \"Banana\"."
   ],
   [
    "In `comparing(A).thenComparing(B).reversed()`, which keys are reversed?",
    "Both A and B, because reversed() applies to the whole comparator built so far."
   ],
   [
    "Why is `return this.age - other.age;` risky in compareTo?",
    "The subtraction can overflow for large or negative values and return the wrong sign. Integer.compare avoids that."
   ],
   [
    "Does `Collections.sort(list)` compile when the element type does not implement Comparable?",
    "No. Its signature requires Comparable elements, so it is a compile error rather than a runtime exception."
   ]
  ]
 },
 {
  "t": "TreeSet and TreeMap natural ordering",
  "hook": "The room-booking tool at Willow Creek Community Center double-booked the main hall twice last month. Grace, a volunteer developer, discovers the bookings are stored in an `ArrayList` that the code scans from start to finish on every request, and the clash check misses bookings that straddle the new start time. Her mentor suggests a `TreeMap` keyed by start time, which keeps entries sorted and can jump straight to the booking just before or just after any moment. Grace tries it and immediately hits a `ClassCastException` on her very first `put`, using her own `Slot` class as the key. Why would adding one key fail, and how do these sorted structures decide order and duplicates?",
  "simple": "A TreeSet is a collection that keeps itself sorted all the time, and a TreeMap is a map that keeps its keys sorted. You never call sort; every time you add something, it slides into the right place, like a librarian who files each returned book straight onto the correct shelf. By default they use the items' own natural order: numbers smallest to largest, words in dictionary-like order where capital letters come first. Because everything is sorted, you can ask questions like \"what is the closest value just below 25?\" Items must know how to compare themselves, and two items that compare as equal count as the same item, even if they are not otherwise identical.",
  "body": [
   "`TreeSet` and `TreeMap` keep their elements, or keys, sorted at all times. Internally they use a balanced binary search tree (a red-black tree), so adding, removing and looking up an element take time proportional to the logarithm of the size, which stays fast even for large collections. By default they use natural ordering, meaning each element's `compareTo` method from the `Comparable` interface: numbers ascending, strings in Unicode order (digits, then uppercase letters, then lowercase letters), and dates chronologically. You can pass a `Comparator` to the constructor to use a different order, such as `new TreeSet<>(Comparator.reverseOrder())` or `new TreeMap<>(String.CASE_INSENSITIVE_ORDER)`.",
   "With natural ordering, every element must implement `Comparable`. Adding an object that does not, such as a plain class with no `compareTo`, compiles, because the `add` method accepts any element of the declared type, but throws `ClassCastException` at runtime when the tree tries to cast it to `Comparable`. This happens even for the very first element, because the implementation compares the first key with itself as a type check. Adding `null` throws `NullPointerException`, because `null` cannot be compared. The same rules apply to `TreeMap` keys; the values can be anything, including `null`.",
   "Duplicates are decided by the comparison, not by `equals`. If `compareTo`, or the supplied comparator, returns 0 for two elements, the tree treats them as the same element. The second one is not added to a `TreeSet`, and `add` returns `false`. In a `TreeMap`, a second `put` with a key that compares as equal replaces the value for the existing key, and the original key object is kept. For example, a `TreeSet<String>` built with `String.CASE_INSENSITIVE_ORDER` keeps only one of \"a\" and \"A\", whichever was added first. This is why `compareTo` should be consistent with `equals`, and why a comparator that compares only one field can silently drop data.",
   "Because they are sorted, these classes implement `NavigableSet` and `NavigableMap`, which add navigation methods that hash-based collections cannot offer. `first()` and `last()` return the smallest and largest elements and throw `NoSuchElementException` if the set is empty. `lower(e)` returns the greatest element strictly less than `e`, `floor(e)` the greatest element less than or equal to `e`, `ceiling(e)` the least element greater than or equal to `e`, and `higher(e)` the least element strictly greater; each returns `null` if there is no such element. `pollFirst()` and `pollLast()` remove and return the extremes, returning `null` when empty, and `descendingSet()` gives a reverse-ordered view.",
   "Range views are the other big feature. `headSet(to)` returns the elements below `to`, exclusive of `to` by default. `tailSet(from)` returns the elements from `from` upward, inclusive of `from` by default. `subSet(from, to)` includes `from` but excludes `to`, the usual half-open convention. Overloads with boolean flags, such as `headSet(to, true)` or `subSet(from, false, to, true)`, let you choose inclusiveness explicitly. These ranges are views backed by the original set, so changes to either one show in the other, and adding an element outside the view's range through the view throws `IllegalArgumentException`.",
   "```java\nTreeSet<Integer> set = new TreeSet<>(List.of(40, 10, 30, 20));\nSystem.out.println(set);               // [10, 20, 30, 40]\nSystem.out.println(set.floor(25));     // 20\nSystem.out.println(set.ceiling(25));   // 30\nSystem.out.println(set.higher(40));    // null\nSystem.out.println(set.headSet(30));   // [10, 20]\nSystem.out.println(set.tailSet(30));   // [30, 40]\n\nTreeMap<String, Integer> map = new TreeMap<>();\nmap.put(\"banana\", 2); map.put(\"Apple\", 1); map.put(\"cherry\", 3);\nSystem.out.println(map);               // {Apple=1, banana=2, cherry=3}\nSystem.out.println(map.firstKey());    // Apple\nSystem.out.println(map.headMap(\"c\"));  // {Apple=1, banana=2}\n```",
   "`TreeMap` offers the matching key-based methods: `firstKey`, `lastKey`, `floorKey`, `ceilingKey`, `lowerKey` and `higherKey`, plus `...Entry` versions such as `floorEntry` and `firstEntry` that return a key-value pair as a `Map.Entry`. It also has `headMap`, `tailMap`, `subMap` and `descendingMap`, with the same inclusive and exclusive defaults as the set versions. Like the set ranges, the map range methods return views backed by the original map. Notice in the example that \"Apple\" sorts first because uppercase letters precede lowercase ones, and that `headMap(\"c\")` includes \"banana\" but not \"cherry\", since \"cherry\" is greater than \"c\".",
   "Choose a tree when you need sorted iteration or range queries, such as finding the next scheduled event after a given time or all scores between two values. If you only need fast lookup by exact key, `HashSet` and `HashMap` are usually faster and also accept `null`. If you only need to remember insertion order, `LinkedHashSet` and `LinkedHashMap` are the better fit. On the exam, watch for non-comparable elements, `null` values and comparators that make different objects compare as equal."
  ],
  "analogy": "A TreeSet is like a well-run library shelf: every returned book is filed straight into its correct spot, so the shelf is always in order and you can instantly find the book just before or just after any title. The shelf's rule decides what counts as the same book; if the rule only looks at the author, two different books by the same author are treated as one copy. Where the analogy stops: a real librarian could shelve a book with no label, but a tree rejects a null outright.",
  "terms": [
   [
    "Natural ordering",
    "The order defined by an element's own compareTo method from the Comparable interface."
   ],
   [
    "NavigableSet",
    "A sorted set interface with methods such as floor, ceiling, headSet and tailSet, implemented by TreeSet."
   ],
   [
    "NavigableMap",
    "A sorted map interface with methods such as floorKey, ceilingEntry, headMap and tailMap, implemented by TreeMap."
   ],
   [
    "floor / ceiling",
    "The greatest element less than or equal to, or the least element greater than or equal to, a given value."
   ],
   [
    "headSet / tailSet",
    "Views of the elements below a bound (exclusive by default) or at and above a bound (inclusive by default)."
   ]
  ],
  "example": "A meeting-room booking system stores each room's bookings in a TreeMap keyed by start time. To check whether a new booking clashes, it calls `floorEntry(newStart)` to find the booking that starts just before it and `ceilingKey(newStart)` to find the next one, instead of scanning the whole list.",
  "mistakes": [
   [
    "A TreeSet uses equals and hashCode to detect duplicates.",
    "It uses compareTo or the comparator. Two elements that compare as 0 are duplicates even if equals returns false."
   ],
   [
    "Adding a non-Comparable object to a TreeSet is a compile error.",
    "It compiles and throws ClassCastException at runtime, even for the first element."
   ],
   [
    "headSet(30) includes 30.",
    "headSet excludes its bound by default, while tailSet includes it. Use the boolean overload to change that."
   ],
   [
    "floor(25) returns null when 25 is not in the set.",
    "floor returns the greatest element less than or equal to 25, such as 20. It returns null only if no element is that small."
   ]
  ],
  "tryit": [
   [
    "An exam-scheduling app stores times in a `TreeSet<Integer>` of minutes past midnight: {540, 600, 720, 840}. A student asks for the first available slot at or after 610 and the latest slot strictly before 600. Which two methods should the app call, and what do they return?",
    "ceiling(610) returns 720, the least slot greater than or equal to 610. lower(600) returns 540, the greatest slot strictly less than 600."
   ],
   [
    "Ada creates `TreeSet<Employee> staff = new TreeSet<>(Comparator.comparing(Employee::dept));` and adds three employees, two of them in the Sales department. What is staff.size(), and how should she fix it if she wants all three?",
    "2, because the comparator returns 0 for the two Sales employees, so the second is treated as a duplicate and not added. She should add a tie-breaker, such as thenComparing(Employee::id), so distinct employees never compare as equal."
   ]
  ],
  "tip": "In a TreeSet or TreeMap, compareTo returning 0 means duplicate, regardless of equals. headSet excludes its bound, tailSet includes it, and lower/higher are strict while floor/ceiling are not.",
  "check": [
   [
    "What does `new TreeSet<>(List.of(\"b\", \"A\", \"a\", \"1\"))` print?",
    "[1, A, a, b]. Natural string order puts digits before uppercase before lowercase."
   ],
   [
    "What happens when you add `null` to a TreeSet using natural ordering?",
    "It throws NullPointerException, because null cannot be compared."
   ],
   [
    "For a TreeSet containing 10, 20, 30, what do `lower(20)` and `floor(20)` return?",
    "lower(20) returns 10 (strictly less); floor(20) returns 20 (less than or equal)."
   ],
   [
    "Can a TreeMap with natural ordering store a null value?",
    "Yes. Only keys must be comparable and non-null; values may be null."
   ]
  ]
 },
 {
  "t": "Generics: type parameters, bounded types and wildcards (? extends, ? super)",
  "hook": "It is Thursday afternoon at Lantern Freight, and Priya is reviewing a pull request from a new teammate. The method is supposed to total shipment weights, and it takes a `List<Number>`. The tests pass, but the moment Priya tries to call it with the warehouse team's `List<Integer>`, her editor lights up red. \"Integer is a Number,\" the teammate writes in the review thread, \"so why does Java refuse?\" A second method that should append default box counts has the opposite problem: it compiles, yet nothing useful can be read back out. Priya knows the answer lives in three small symbols, `T`, `? extends` and `? super`. Can you explain to the teammate what the compiler is protecting them from?",
  "simple": "Generics let you put a label on a container that says what kind of thing goes inside, like writing \"socks only\" on a drawer. Once a list is labeled `List<String>`, Java refuses to let you drop a number into it, and you never have to double-check what you pull out. A type parameter such as `T` is a blank label that gets filled in later. A wildcard such as `?` means \"some label I do not know exactly.\" The tricky part is that a drawer labeled \"socks\" is not a drawer labeled \"clothing,\" even though socks are clothing, because then someone could put a coat in your sock drawer. The keywords `extends` and `super` give you safe ways to accept related drawers: read-only or write-only.",
  "body": [
   "Generics let you write a class or method once and have the compiler check the types it works with. When you write `List<String>`, the compiler rejects `list.add(42)` and lets you read elements without a cast. The angle-bracket names such as `T`, `E`, `K` and `V` are type parameters: placeholders that are replaced by real type arguments at each use. The diamond `<>` on the right side (`new ArrayList<>()`) asks the compiler to infer the type argument from the left side. The payoff is that type mistakes move from run time, where they would surface as a `ClassCastException` deep inside a running program, to compile time, where they appear as an error before the code ever runs. A raw type such as a plain `List` with no angle brackets still compiles for backward compatibility, but the compiler issues an unchecked warning and you give up that safety, so treat raw types as a red flag in exam code.",
   "A generic method declares its own type parameters just before the return type: `static <T> T first(List<T> list)`. The compiler infers `T` from the arguments. A bounded type parameter restricts what `T` can be. `<T extends Number>` means T must be Number or a subclass, so inside the method you may call `doubleValue()` on a T. Multiple bounds use `&`, and a class bound must come first: `<T extends Number & Comparable<T>>`. Note that `extends` is used for both classes and interfaces in a bound. A generic class declares its type parameter after the class name, as in `class Box<T> { private T value; T get() { return value; } }`, and that `T` is in scope for every instance member of the class. A generic method can be static or instance, and its own type parameter is visible only inside that method. When inference cannot work out the type, you can supply it explicitly with a type witness: `Collections.<String>emptyList()`.",
   "Generics use type erasure: after compilation, type arguments are removed and replaced by their bound (or Object). That is why you cannot write `new T()`, `new T[10]`, `instanceof List<String>` (unless the compiler can prove the check is safe from the expression's static type; `instanceof List<?>` is always allowed), or overload two methods that differ only by type argument such as `m(List<String>)` and `m(List<Integer>)`; after erasure they have the same signature. Static fields cannot use a class's type parameter either. Erasure also explains why `List<String>.class` is not valid syntax: at run time there is only one `List.class`. The static field rule follows from the same idea. A static field is shared by every parameterization of the class, so a `Box<String>` and a `Box<Integer>` would have to share one field whose type could not be both. A static method that needs generics declares its own type parameter instead, such as `static <U> Box<U> of(U value)`.",
   "Generic types are invariant: `List<Integer>` is not a subtype of `List<Number>`, even though Integer is a Number. If it were, you could add a Double to a list of Integers. Wildcards give you controlled flexibility. `List<?>` is a list of some unknown type; you can read elements as Object but can add only `null`. `List<? extends Number>` is an upper-bounded wildcard: it accepts `List<Integer>` or `List<Double>`, you can read elements as Number, but you cannot add anything except `null` because the compiler does not know the exact element type. Arrays behave differently, and the exam likes the contrast. Arrays are covariant: an `Integer[]` really is an `Object[]`, and storing a String into it compiles but fails at run time with an `ArrayStoreException`. Generics chose invariance so the same mistake is caught by the compiler instead. Keep in mind that `List<?>` and `List<Object>` are not the same: a `List<Object>` accepts any object you add, while a `List<?>` accepts only `null` because its real element type is unknown.",
   "`List<? super Integer>` is a lower-bounded wildcard: it accepts `List<Integer>`, `List<Number>` or `List<Object>`. You can safely add Integers to it, but when you read you only get Object. The rule of thumb is PECS: Producer Extends, Consumer Super. If a parameter produces values you read, use `? extends`; if it consumes values you write, use `? super`. `Collections.copy(List<? super T> dest, List<? extends T> src)` is the classic example. Wildcards belong in variable declarations, parameters and return types, not in object creation. `new ArrayList<? extends Number>()` does not compile, because you cannot create a list of an unknown type; you create a concrete `ArrayList<Integer>` and then refer to it through a wildcard variable. Wildcards also cannot appear where a type parameter is declared, so `class Box<? extends Number>` is invalid while `class Box<T extends Number>` is fine.",
   "```java\nstatic double sum(List<? extends Number> nums) {\n    double total = 0;\n    for (Number n : nums) total += n.doubleValue();\n    return total;\n}\nstatic void fill(List<? super Integer> out) {\n    out.add(1); out.add(2);   // OK\n    // Integer i = out.get(0); // does not compile: returns Object\n}\n```",
   "When an exam question mixes these features, work through it in a fixed order. First, find the declared type of the variable or parameter, including any wildcard. Second, decide whether the line reads from or writes to the collection. Third, apply the rule: with `? extends X` reads give you an X and writes fail except for `null`; with `? super X` writes of an X succeed and reads give you only `Object`; with a plain `List<X>` both directions work but only an exact `List<X>` may be assigned. Finally, check for erasure traps such as `new T()`, a generic array creation, or two overloads that erase to the same signature. Most generics questions fall to this checklist in under a minute."
  ],
  "analogy": "Think of vending machine slots. A slot labeled `? extends Drink` is like a sealed display case: you know whatever is inside is some kind of drink, so you can take one, but you cannot add anything because it might be a juice-only case. A `? super Cola` slot is a recycling bin that accepts colas and anything more general: you can always drop a cola in, but when you reach in you only know you are holding \"some object.\" The analogy stops at erasure: a real case keeps its label, but Java removes type arguments after compiling.",
  "mnemonic": "PECS: Producer Extends, Consumer Super. If a parameter produces values for you to read, declare it with ? extends. If it consumes values you write into it, declare it with ? super.",
  "terms": [
   [
    "Type parameter",
    "A placeholder such as T declared in angle brackets on a class, interface or method and replaced by a type argument at each use."
   ],
   [
    "Bounded type parameter",
    "A type parameter restricted with extends, such as <T extends Comparable<T>>, so the code can call methods of the bound."
   ],
   [
    "Upper-bounded wildcard",
    "? extends X: accepts X or any subtype; safe for reading as X, but only null can be added."
   ],
   [
    "Lower-bounded wildcard",
    "? super X: accepts X or any supertype; safe for adding X values, but reads return Object."
   ],
   [
    "Type erasure",
    "The compiler removes generic type arguments after checking them, so they are not available at run time."
   ],
   [
    "Invariance",
    "The rule that List<A> and List<B> are unrelated types even when A is a subtype of B."
   ],
   [
    "Raw type",
    "A generic type used without type arguments, such as plain List; it compiles with an unchecked warning and loses type checking."
   ]
  ],
  "example": "A reporting utility needs to total prices held in a List<BigDecimal> one day and a List<Integer> the next. Declaring the parameter as List<? extends Number> lets one method accept both, while a method that appends default quantities to a list takes List<? super Integer> so callers can pass a List<Number> or List<Object>.",
  "mistakes": [
   [
    "List<Integer> can be passed to a parameter of type List<Number> because Integer extends Number.",
    "Generic types are invariant, so this does not compile. Declare the parameter as List<? extends Number> if you only need to read Numbers."
   ],
   [
    "You can add an Integer to a List<? extends Number> since Integer is a Number.",
    "The real list could be a List<Double>, so the compiler blocks every add except null. Use ? super Integer when you need to add Integers."
   ],
   [
    "Reading from a List<? super Integer> gives you an Integer.",
    "The list could be a List<Number> or List<Object>, so get() returns Object. Only writes of Integer are guaranteed safe."
   ],
   [
    "Two methods m(List<String>) and m(List<Integer>) are a valid overload.",
    "After type erasure both become m(List), so they clash and the class does not compile."
   ]
  ],
  "tryit": [
   [
    "You are writing a helper that copies every element from one list into another, and it must accept a List<Integer> source with a List<Number> destination, or a List<Double> source with a List<Object> destination. Your first draft is copy(List<T> src, List<T> dest). How should you change the signature?",
    "Use copy(List<? extends T> src, List<? super T> dest). The source only produces values you read, so it takes extends; the destination only consumes values you write, so it takes super. This is PECS, the same shape as Collections.copy."
   ],
   [
    "A teammate writes class Cache<T> { private static T last; } and asks why it fails to compile. What do you tell them?",
    "A static field is shared by every parameterization of Cache, and the type parameter T belongs to each instance, so it cannot be used in a static context. Make the field an instance field, or use a static generic method that declares its own type parameter."
   ]
  ],
  "tip": "Exam questions often show list.add(...) on a List<? extends Something> and ask whether it compiles. It does not (except for null). With ? super, adding the bound type compiles, but assigning get() to anything more specific than Object does not.",
  "check": [
   [
    "Does List<Number> nums = new ArrayList<Integer>(); compile?",
    "No. Generic types are invariant, so ArrayList<Integer> is not a List<Number>. List<? extends Number> would accept it."
   ],
   [
    "Why can you not write new T() inside a generic class?",
    "Because of type erasure the actual type of T is unknown at run time, so the JVM cannot know which constructor to call."
   ],
   [
    "In <T extends Runnable & Serializable>, which must come first if one bound is a class?",
    "The class must be listed first, followed by any interfaces joined with &."
   ],
   [
    "Does new ArrayList<?>() compile?",
    "No. A wildcard cannot be used when creating an object; create a concrete type such as new ArrayList<String>() and assign it to a List<?> variable if needed."
   ]
  ]
 },
 {
  "t": "List.remove(int) vs remove(Object) with Integer lists",
  "hook": "At Bluewater Ticketing, the night support queue suddenly shows the wrong tickets closing. Marcus, the on-call developer, pulls the logs at 1 a.m. and sees that when an agent resolves ticket 3, ticket 3 stays open while some unrelated ticket vanishes from the active list. On quieter nights, the same action crashes with an `IndexOutOfBoundsException`. The code looks innocent: `activeIds.remove(ticketId)`, where `activeIds` is a `List<Integer>` and `ticketId` is an `int`. Nothing about it looks like it should remove by position. Marcus stares at the single line and wonders how Java decided what \"remove 3\" means. Which method is the compiler really calling?",
  "simple": "A Java list has two different \"remove\" buttons that share one name. One button means \"remove whatever is in slot number 2.\" The other means \"find the thing equal to 2 and remove it.\" With a list of words there is no confusion, because a word is not a slot number. With a list of numbers, though, the number 2 could mean either. Java settles it with a simple rule: a plain whole number like `2` always means a slot position. If you want to remove the value 2, you must wrap it as an object first, for example `Integer.valueOf(2)`. Think of a row of numbered mailboxes holding numbered letters: \"remove box 2\" and \"remove letter 2\" are different requests.",
  "body": [
   "The List interface has two methods named remove. `E remove(int index)` removes the element at a position and returns it. `boolean remove(Object o)` removes the first element equal to o and returns true if it found one. With a `List<String>` there is no confusion, but with a `List<Integer>` a call like `list.remove(1)` could mean either, and the exam loves this trap. The two methods were designed for different jobs. The index version is for code that already knows a position, for example after a search or inside a counted loop. The object version is for code that knows the value it wants gone but not where it sits. Because `Integer` is an object type that wraps an `int`, a list of Integers is the one common case where both kinds of argument look the same at a glance.",
   "Java resolves overloads in phases. In the first phase the compiler looks for a method that matches without boxing or unboxing. The literal `1` is an int, and `remove(int)` accepts an int exactly, so it wins. Boxing to Integer to match `remove(Object)` is only considered if no method matched in the first phase. So `list.remove(1)` always removes by index, never by value. The three phases are: first, matching by identity or widening conversions only; second, allowing boxing and unboxing; third, allowing variable arguments (varargs). The compiler stops at the first phase that finds any applicable method, even if a later phase would find a method that looks like a better fit to a human reader. This rule exists mainly for backward compatibility: code written before autoboxing existed had to keep calling the same methods once boxing was added to the language.",
   "To remove by value you must pass an object: `list.remove(Integer.valueOf(1))` or `list.remove((Integer) 1)` or `list.remove((Object) 1)`. Now the argument is a reference type, the int overload does not apply, and `remove(Object)` runs. It uses `equals`, so it removes the first element whose value is 1, and returns false if there is none rather than throwing. A cast to `Object` works just as well as a cast to `Integer`, because the argument's compile-time type is then a reference type and only `remove(Object)` can accept it. The same applies if the argument is a variable declared as `Integer`: `Integer id = 3; list.remove(id);` removes by value. Remember too that `remove(Object)` removes only the first matching element, so a list containing `[1, 1, 2]` still contains one `1` after a single call.",
   "The return types differ too, which helps you read a question. `remove(int)` returns the removed element (an Integer), and throws `IndexOutOfBoundsException` if the index is negative or not less than `size()`. `remove(Object)` returns a boolean. If code assigns the result to a boolean, it must be the Object version; if it assigns to an Integer or int, it must be the index version. This return-type clue is often the fastest way to answer an exam question. For example, `int removed = list.remove(0);` is the index version with the returned Integer unboxed to an int, while `if (list.remove(x))` only compiles if `x` is a reference type, because an `if` condition needs a boolean.",
   "```java\nList<Integer> nums = new ArrayList<>(List.of(10, 20, 1, 30));\nnums.remove(1);                  // removes index 1 (20) -> [10, 1, 30]\nnums.remove(Integer.valueOf(1)); // removes value 1     -> [10, 30]\nboolean b = nums.remove(Integer.valueOf(99)); // false, no change\n// nums.remove(5);  // IndexOutOfBoundsException at run time\n```",
   "It helps to trace the example above slowly. The list begins as `[10, 20, 1, 30]`. The call `nums.remove(1)` passes an int literal, so phase one matches `remove(int)`, and the element at index 1, which is 20, is removed and returned. The list is now `[10, 1, 30]`. Next, `nums.remove(Integer.valueOf(1))` passes an Integer, phase one finds no int match for a reference argument, so `remove(Object)` runs, uses `equals` to find the value 1 at index 1, and removes it, leaving `[10, 30]`. Asking to remove the value 99 finds nothing and simply returns false. Only the final, commented-out call fails, because index 5 is not less than the size of 2.",
   "Watch for related traps. A short or char variable also widens to int and selects the index version. An unmodifiable list from `List.of` throws `UnsupportedOperationException` on either remove. Removing inside an enhanced for loop over the same ArrayList typically throws `ConcurrentModificationException`; use `removeIf(x -> x == 1)` or an Iterator's remove instead. `removeIf` takes a Predicate, so there is no index ambiguity at all."
  ],
  "analogy": "Picture a coat check with numbered hooks, where every coat also has a number sewn into its collar. If you tell the attendant \"take down number 4,\" a well-trained attendant always assumes you mean hook 4, because hook numbers are what the job runs on. To get the coat with 4 sewn in the collar, you must hand over the actual coat tag, an object, not just say a number. The analogy is close, but in Java the choice is made by the compiler before the program runs, not by the attendant at the counter.",
  "terms": [
   [
    "remove(int index)",
    "Removes and returns the element at the given position; throws IndexOutOfBoundsException for a bad index."
   ],
   [
    "remove(Object o)",
    "Removes the first element equal to o and returns true if one was removed, false otherwise."
   ],
   [
    "Overload resolution phases",
    "The compiler first tries matches without boxing, then with boxing and unboxing, then with varargs."
   ],
   [
    "removeIf",
    "A Collection method that removes every element matching a Predicate and returns true if anything was removed."
   ],
   [
    "Autoboxing",
    "The automatic conversion of a primitive such as int into its wrapper object such as Integer when a reference type is needed."
   ]
  ],
  "example": "A developer keeps a List<Integer> of ticket IDs and calls ids.remove(ticketId) where ticketId is an int. Instead of removing ticket 3, the code removes whatever sits at index 3, or crashes when the list is short. Changing the call to ids.remove(Integer.valueOf(ticketId)) fixes the bug.",
  "mistakes": [
   [
    "list.remove(1) on a List<Integer> removes the value 1.",
    "An int argument matches remove(int) in the first overload phase, so it removes the element at index 1. Pass Integer.valueOf(1) to remove by value."
   ],
   [
    "remove(Object) throws an exception when the value is not in the list.",
    "It returns false and leaves the list unchanged. Only remove(int) throws, with IndexOutOfBoundsException for a bad index."
   ],
   [
    "remove(Object) removes every element equal to the argument.",
    "It removes only the first match. Use removeIf with a predicate to remove all matching elements."
   ],
   [
    "Casting a short or char to the argument makes Java remove by value.",
    "short and char widen to int in phase one, so they still select remove(int). Only a reference type selects remove(Object)."
   ]
  ],
  "tryit": [
   [
    "A colleague's code holds List<Integer> scores = new ArrayList<>(List.of(4, 7, 4, 9)); and then calls scores.remove(Integer.valueOf(4)); followed by scores.remove(2);. What does the list contain afterward, and why?",
    "It contains [7, 4]. The first call removes the first element equal to 4, leaving [7, 4, 9]. The second call passes an int, so it removes index 2, which holds 9."
   ]
  ],
  "tip": "For a List<Integer>, a plain int argument always means index. Look for Integer.valueOf, a cast to Integer or Object, or an Integer variable to spot the by-value version.",
  "check": [
   [
    "Given List<Integer> x = new ArrayList<>(List.of(5, 6, 7)); what does x.remove(2) do?",
    "It removes the element at index 2, which is 7, and returns it. The list becomes [5, 6]."
   ],
   [
    "What does x.remove(Integer.valueOf(9)) return if 9 is not in the list?",
    "It returns false and leaves the list unchanged; it does not throw an exception."
   ],
   [
    "Given Integer key = 2; and List<Integer> x = new ArrayList<>(List.of(1, 2, 3)); what does x.remove(key) do?",
    "It removes the value 2 and returns true, because key is an Integer reference, so remove(Object) is selected. The list becomes [1, 3]."
   ]
  ]
 },
 {
  "t": "Functional interfaces in java.util.function: Supplier, Consumer, Function, Predicate, UnaryOperator, BinaryOperator",
  "hook": "Rosa has just joined the billing team at Cedar Row Utilities, and her first task is reviewing a pipeline that filters accounts, converts them to invoices and emails each one. The code passes around variables typed `Predicate`, `Function`, `Consumer` and `Supplier`, and one line calls `isOverdue.apply(account)`. The build is failing, and the senior developer who wrote it is on vacation. Rosa suspects the problem is not the logic at all, but a mismatch between the interface and the method name being called. Every one of these interfaces holds a single lambda, so how do you know which method name each one expects?",
  "simple": "A functional interface is a job description with exactly one task. Because there is only one task, Java lets you hand over a short piece of code, a lambda, to do it. The package `java.util.function` already has the common job descriptions. A Supplier gives you something and asks for nothing, like a vending machine. A Consumer takes something and gives nothing back, like a paper shredder. A Function turns one thing into another, like a translator. A Predicate answers yes or no, like a bouncer checking IDs. UnaryOperator and BinaryOperator are Functions where everything is the same type, such as turning a number into another number, or two numbers into their sum.",
  "body": [
   "A functional interface is an interface with exactly one abstract method. Default and static methods do not count, and neither do abstract methods that match public methods of Object such as `equals`. Because there is only one abstract method, a lambda or method reference can supply its body. The optional `@FunctionalInterface` annotation makes the compiler check the rule. The package `java.util.function` supplies ready-made interfaces so you rarely need to write your own. The annotation is not required for a lambda to work: any interface that meets the single-abstract-method rule can be a lambda target. Its value is protection. If someone later adds a second abstract method to an annotated interface, the compiler reports an error at the interface itself rather than at every lambda that uses it. A familiar example outside this package is `Comparator<T>`, which declares several default and static methods and also redeclares `equals`, yet is still functional because `compare` is its only abstract method of its own.",
   "Learn the six core shapes by their method names, because the exam expects you to know which method to call. `Supplier<T>` has `T get()`: no input, one output, useful for lazy values and factories. `Consumer<T>` has `void accept(T t)`: one input, no result, used for side effects such as printing. `Function<T, R>` has `R apply(T t)`: converts a T into an R. `Predicate<T>` has `boolean test(T t)`: answers yes or no. A helpful way to keep them straight is to ask two questions about any lambda: how many inputs does it take, and does it return something? No input with a result is a Supplier; one input with no result is a Consumer; one input with any result is a Function; one input with a boolean result is a Predicate. The lambda `() -> new Random().nextInt()` fits a Supplier, `s -> System.out.println(s)` fits a Consumer, and `s -> s.length() > 5` fits a Predicate or, with boxing, a `Function<String, Boolean>`.",
   "`UnaryOperator<T>` extends `Function<T, T>`, so its method is still `apply`, but the input and output types are the same, for example `String::toUpperCase`. `BinaryOperator<T>` extends `BiFunction<T, T, T>` with `T apply(T a, T b)`, which is exactly what `reduce` expects, for example `Integer::sum`. The Bi versions take two arguments: `BiConsumer<T, U>` (accept), `BiFunction<T, U, R>` (apply) and `BiPredicate<T, U>` (test). There is no BiSupplier, because a supplier takes no input. Because the operators are subtypes of the functions, a `UnaryOperator<String>` can be passed anywhere a `Function<String, String>` is expected, but not the other way around. Methods like `List.replaceAll` take a UnaryOperator, and `Stream.reduce` takes a BinaryOperator, so passing a lambda whose result type differs from its input type will not compile in those places.",
   "Several of these interfaces have default methods for composition. `Predicate` offers `and`, `or` and `negate`, plus static `Predicate.not(p)` and `Predicate.isEqual(x)`. `Function` offers `andThen` (apply this, then the other) and `compose` (apply the other first), plus static `Function.identity()`. `Consumer` offers `andThen`. `BinaryOperator` has static `minBy(comparator)` and `maxBy(comparator)`. Composition works because each default method returns a new functional interface instance, so calls can be chained. For example, `isActive.and(isOverdue.negate())` builds a predicate for active accounts that are not overdue without writing a new lambda. `Predicate.not(String::isBlank)` is handy inside a stream filter where a method reference cannot be negated directly. Note that `Supplier` has no composition methods at all, which is a detail some answer choices get wrong.",
   "```java\nSupplier<List<String>> maker = ArrayList::new;\nConsumer<String> show = System.out::println;\nFunction<String, Integer> len = String::length;\nPredicate<String> empty = String::isEmpty;\nUnaryOperator<String> up = String::toUpperCase;\nBinaryOperator<Integer> add = Integer::sum;\n\nFunction<Integer, Integer> plus1 = x -> x + 1, times2 = x -> x * 2;\nplus1.andThen(times2).apply(3); // (3+1)*2 = 8\nplus1.compose(times2).apply(3); // 3*2+1 = 7\n```",
   "To avoid boxing, primitive specializations exist: `IntPredicate`, `IntFunction<R>` (int in, R out), `ToIntFunction<T>` (T in, int out), `IntUnaryOperator`, `IntBinaryOperator`, `IntSupplier` (method `getAsInt`), `BooleanSupplier` (`getAsBoolean`) and matching Long and Double versions. The naming pattern tells you the direction: `IntFunction` takes an int, `ToIntFunction` returns an int.",
   "When an exam question asks which interface fits a lambda, read the target type, count the parameters, and check the return type, including whether it is primitive. Then check that the code calls the right method on the variable: a `Function` must be invoked with `apply`, never `test` or `get`, even when the lambda inside would make sense either way. Remember that the type of the variable, not the shape of the lambda, decides which method name is available. Two variables can hold identical-looking lambdas, `x -> x > 0` as a `Predicate<Integer>` and as a `Function<Integer, Boolean>`, and you would call `test` on the first and `apply` on the second."
  ],
  "analogy": "Think of a kitchen with four stations, each with one job card. The pantry (Supplier) hands out ingredients without being given anything. The dishwasher (Consumer) takes plates and returns nothing. The prep station (Function) takes a raw ingredient and returns a prepared one. The quality checker (Predicate) looks at a dish and says pass or fail. The analogy holds for shapes, but on the exam the station's name also fixes the exact command you shout: get, accept, apply or test.",
  "terms": [
   [
    "Functional interface",
    "An interface with exactly one abstract method, which a lambda or method reference can implement."
   ],
   [
    "Supplier<T>",
    "Takes no arguments and returns a T through get()."
   ],
   [
    "Predicate<T>",
    "Takes a T and returns a boolean through test(); composable with and, or and negate."
   ],
   [
    "UnaryOperator<T>",
    "A Function<T, T> whose input and output types are the same; its method is apply."
   ],
   [
    "BinaryOperator<T>",
    "A BiFunction<T, T, T> that combines two values of the same type into one; used by reduce."
   ],
   [
    "Consumer<T>",
    "Takes a T and returns nothing through accept(); used for side effects such as printing or saving."
   ],
   [
    "Function<T, R>",
    "Takes a T and returns an R through apply(); composable with andThen and compose."
   ],
   [
    "@FunctionalInterface",
    "An optional annotation that makes the compiler verify an interface has exactly one abstract method."
   ]
  ],
  "example": "An order service filters orders with a Predicate<Order> (isPaid), converts them with a Function<Order, Invoice>, and sends each invoice with a Consumer<Invoice>. A Supplier<LocalDate> for today's date is injected so tests can supply a fixed date instead of the real clock.",
  "mistakes": [
   [
    "A Predicate is invoked with apply() because it is a kind of function.",
    "Predicate is not a subtype of Function; its method is test(). Calling apply on a Predicate does not compile."
   ],
   [
    "UnaryOperator has its own method named operate or applyAsT.",
    "UnaryOperator extends Function<T, T>, so its method is still apply. Only primitive versions such as IntUnaryOperator use names like applyAsInt."
   ],
   [
    "An interface with default methods cannot be functional.",
    "Default and static methods do not count. Only abstract methods count, and exactly one is allowed."
   ],
   [
    "IntFunction<R> takes an object and returns an int.",
    "IntFunction takes an int and returns R. ToIntFunction<T> is the one that takes a T and returns an int."
   ]
  ],
  "tryit": [
   [
    "You need to pass a factory to a cache so that it creates a new empty HashMap only when a key is missing. The factory takes no arguments and returns the new map. Which functional interface should the parameter use, and what method will the cache call?",
    "Supplier<Map<K, V>>, invoked with get(). It takes no input and returns a value, which is exactly the Supplier shape, and HashMap::new fits it as a constructor reference."
   ],
   [
    "A teammate writes Function<Integer, Integer> f = x -> x + 1; Function<Integer, Integer> g = x -> x * 10; and asks what f.compose(g).apply(2) returns. What do you say?",
    "21. compose applies g first, giving 20, and then f, giving 21. With andThen it would be f first, giving 3, then g, giving 30."
   ]
  ],
  "tip": "Match method names to interfaces: get for Supplier, accept for Consumer, apply for Function and the operators, test for Predicate. Questions often call the wrong method, such as predicate.apply(x), which does not compile.",
  "check": [
   [
    "Which functional interface fits a lambda (a, b) -> a + b where a, b and the result are all Integer?",
    "BinaryOperator<Integer> (or the more general BiFunction<Integer, Integer, Integer>)."
   ],
   [
    "What is the difference between f.andThen(g) and f.compose(g)?",
    "andThen applies f first and then g to the result; compose applies g first and then f."
   ],
   [
    "What method does IntSupplier declare?",
    "int getAsInt(), which returns a primitive int without boxing."
   ],
   [
    "Is an interface with one abstract method, two default methods and an abstract boolean equals(Object o) a functional interface?",
    "Yes. Default methods do not count, and equals matches a public method of Object, so only one abstract method counts."
   ]
  ]
 },
 {
  "t": "Lambda syntax, method references and effectively final variables",
  "hook": "It is code review day at Orchard Lane Clinic's scheduling team, and Devon has refactored a page of anonymous inner classes into tidy one-line lambdas. Everything compiled until he added `count++` near the bottom of the method to track how many appointments were filtered. Suddenly a lambda forty lines higher, one he never touched, refuses to compile with a message about variables that must be \"final or effectively final.\" His teammate suggests turning the counter into a field, and that works, which only deepens the mystery. Why would changing a line below the lambda break the lambda itself, and why does a field behave differently from a local variable?",
  "simple": "A lambda is a tiny, nameless piece of code you can hand to another method, like writing a quick instruction on a sticky note: \"take a word and give back its length.\" The arrow `->` separates what the note receives from what it does. A method reference is an even shorter note that just points at an existing method, such as `String::length`, meaning \"use the length method.\" When a lambda uses a local variable from the surrounding method, Java copies that value onto the note. To keep the copy honest, Java insists the original never changes after it is set; that is what \"effectively final\" means. Fields are different because the note reaches them through the object, not through a copy.",
  "body": [
   "A lambda expression is a compact implementation of a functional interface's single abstract method. Its shape is parameters, an arrow and a body. Parentheses are optional only for a single parameter with no declared type: `x -> x * 2`. Zero or several parameters need parentheses: `() -> 42`, `(a, b) -> a + b`. You may declare types, `(String s) -> s.length()`, or use `var`, `(var s) -> s.length()`, but you must be consistent: all parameters typed, all `var` or all untyped. Mixing, as in `(var a, b)`, does not compile. The compiler decides what a lambda means from its target type, the functional interface it is assigned or passed to. The same text `x -> x * 2` can be a `Function<Integer, Integer>`, a `UnaryOperator<Integer>` or an `IntUnaryOperator`, depending on context. That is also why `var f = x -> x * 2;` does not compile: with `var` there is no target type for the compiler to read. When a parameter is declared with a type or `var`, it can also carry a modifier or annotation, such as `(final String s) -> s.length()`, which is the main reason `var` is allowed there at all.",
   "The body is either a single expression or a block. An expression body returns its value automatically and has no semicolon or return keyword inside: `s -> s.isEmpty()`. A block body uses braces, needs semicolons, and must use `return` if the interface returns a value: `s -> { return s.isEmpty(); }`. Writing `s -> { s.isEmpty() }` (no semicolon, no return) or `s -> return s.isEmpty();` (return without braces) are classic compile errors. A void-compatible interface such as `Consumer` accepts either style as long as nothing is returned: `s -> System.out.println(s)` is fine because a method call can stand as a statement. A block body for a value-returning interface must return on every path, so a block with an `if` that returns in only one branch fails to compile just as a normal method would.",
   "A lambda can read local variables from the enclosing method only if they are final or effectively final, meaning they are never reassigned after initialization. The compiler captures a copy of the value, so allowing later changes would create confusion. Instance fields and static fields are different: the lambda reaches them through `this` or the class, so they can be read and modified freely. Lambda parameters and locals also cannot reuse the name of a local variable already in scope, and inside a lambda `this` means the enclosing instance, not the lambda. The rule is checked across the whole method, not just the lines before the lambda: if a local variable is reassigned anywhere, before or after the lambda, it is not effectively final, and every lambda that captures it fails. The same rule applies to local and anonymous classes. A common workaround is to capture a reference to a mutable object, such as an `AtomicInteger` or a one-element array, because the reference itself never changes even though the object's contents do; the exam may show this pattern and ask whether it compiles, and it does.",
   "```java\nint limit = 10;\nPredicate<Integer> small = n -> n < limit; // OK: limit is effectively final\n// limit++;   // uncommenting breaks the lambda above: no longer effectively final\nString s = \"x\";\n// Function<String, Integer> f = s -> s.length(); // error: s already defined\n```",
   "A method reference is shorthand for a lambda that only calls one existing method. There are four kinds. Static: `Integer::parseInt` means `s -> Integer.parseInt(s)`. Bound instance, on a particular object: `System.out::println` means `x -> System.out.println(x)`. Unbound instance, on an arbitrary object of a type: `String::length` means `s -> s.length()`, where the first parameter becomes the receiver. Constructor: `ArrayList::new` means `() -> new ArrayList<>()` or a version with arguments, depending on the target interface. Two details about bound references are worth remembering. The receiver expression is evaluated once, when the method reference is created, not each time it is called. And constructor references also work for arrays: `int[]::new` fits an `IntFunction<int[]>`, which is how `stream.toArray(String[]::new)` builds an array of the right type.",
   "The same method reference can fit different interfaces. `String::concat` is a `BinaryOperator<String>` because `(a, b) -> a.concat(b)`. You cannot add extra arguments or logic to a method reference; if you need `s -> s.substring(1)`, you must use a lambda. The target type decides which overload a reference picks, so an ambiguous reference with overloaded methods can fail to compile.",
   "To convert between forms quickly on the exam, line up the lambda parameters with the method reference. If the lambda passes all its parameters straight to a static method, it is a static reference. If it calls a method on an object that existed before the lambda, it is bound. If its first parameter is the object the method is called on and any remaining parameters become the method's arguments, it is unbound, as with `(a, b) -> a.compareTo(b)` becoming `String::compareTo`. If the body is just `new` with the parameters, it is a constructor reference. Anything else, such as a literal argument, arithmetic or a second method call, keeps it a lambda."
  ],
  "analogy": "Capturing a local variable is like photocopying a recipe card before giving it to a friend to cook from. If you kept scribbling changes on your original, the friend's copy would silently disagree with yours, so Java simply forbids changing the original once it has been copied. A field is like a recipe pinned on the shared kitchen board: everyone looks at the same card, so changes are visible and allowed. The analogy stops short of thread safety, which the exam treats separately.",
  "terms": [
   [
    "Lambda expression",
    "An anonymous function written as parameters -> body that implements a functional interface."
   ],
   [
    "Effectively final",
    "A local variable that is never reassigned after it is initialized, so a lambda or inner class may capture it."
   ],
   [
    "Bound method reference",
    "A reference on a specific object, such as System.out::println, whose receiver is fixed when the reference is created."
   ],
   [
    "Unbound method reference",
    "A reference such as String::length where the first argument supplied at call time becomes the receiver."
   ],
   [
    "Constructor reference",
    "ClassName::new, which creates a new object using the constructor that matches the target interface's parameters."
   ],
   [
    "Target type",
    "The functional interface type the compiler expects in a given context, which gives a lambda its meaning."
   ],
   [
    "Static method reference",
    "A reference such as Integer::parseInt that passes the lambda's arguments to a static method."
   ]
  ],
  "example": "A sorting utility is refactored from an anonymous Comparator class to people.sort(Comparator.comparing(Person::lastName)). The unbound method reference Person::lastName reads each person's last name, making the code shorter and harder to get wrong.",
  "mistakes": [
   [
    "A lambda can capture a local variable as long as it is not changed before the lambda.",
    "Any reassignment anywhere in the method, before or after, makes the variable not effectively final and breaks the lambda."
   ],
   [
    "s -> { return s.isEmpty() } compiles because it has braces and return.",
    "A block body needs semicolons after its statements, so the missing semicolon is a compile error. Either write s -> s.isEmpty() or s -> { return s.isEmpty(); }."
   ],
   [
    "(var a, String b) -> a + b is fine since both parameters have some kind of type.",
    "Parameter styles cannot be mixed. Use all var, all explicit types, or no types at all."
   ],
   [
    "s -> s.substring(1) can be written as String::substring.",
    "A method reference cannot supply the literal argument 1. String::substring would need the index from somewhere else, so this must stay a lambda."
   ]
  ],
  "tryit": [
   [
    "A method declares String prefix = \"ID-\"; then creates Function<Integer, String> label = n -> prefix + n; and, ten lines later, inside an if block, sets prefix = \"REF-\";. A teammate says the lambda is fine because the reassignment comes later. Is it?",
    "No. prefix is reassigned in the method, so it is not effectively final, and the lambda that captures it does not compile. Introduce a separate final variable for the lambda or avoid reassigning prefix."
   ],
   [
    "You see Comparator<String> c = (a, b) -> a.compareToIgnoreCase(b);. Can it be a method reference, and which kind?",
    "Yes, String::compareToIgnoreCase, an unbound instance method reference. The first parameter a becomes the receiver and b becomes the argument."
   ]
  ],
  "tip": "Check three things in every lambda question: parentheses rules for parameters, braces with return and semicolons, and whether any captured local variable is reassigned anywhere in the method, even after the lambda.",
  "check": [
   [
    "Does (a, var b) -> a + b compile?",
    "No. Parameters must be all explicitly typed, all var, or all untyped; mixing styles is a compile error."
   ],
   [
    "Rewrite s -> s.trim() as a method reference and name its kind.",
    "String::trim, an unbound instance method reference: the lambda's parameter becomes the object trim is called on."
   ],
   [
    "Can a lambda increment an instance field count++?",
    "Yes. The effectively final rule applies only to captured local variables and parameters, not to fields."
   ],
   [
    "Why does var f = x -> x + 1; fail to compile?",
    "A lambda needs a target type, and var gives the compiler none to infer from."
   ]
  ]
 },
 {
  "t": "Creating streams: collections, Stream.of, IntStream.range/rangeClosed, Stream.iterate",
  "hook": "At Kestrel Logistics, Amara is building test data for a new route planner. She needs pallet numbers 1 through 100, a few fixed depot codes, and a doubling sequence of load sizes. Her first attempt uses `IntStream.range(1, 100)`, and the QA lead reports that pallet 100 never appears. Her second attempt reuses a stream variable to count elements and then print them, and the program throws an `IllegalStateException`. Her third attempt, a doubling sequence with no stopping point, simply never ends and pins a CPU core. Three small bugs, three different stream sources. What does each source really produce, and when does it stop?",
  "simple": "A stream is like a conveyor belt that carries items past a series of workers. Before any work happens you need somewhere for the items to come from, the source. You can put an existing list on the belt, list a few items by hand, count numbers from one value to another, or have a machine keep producing new items from a rule, such as \"start at 1 and keep doubling.\" Two everyday cautions apply. When counting, one method stops just before the end number and the other includes it. And a belt can run only once; after the items have gone by, you need a new belt.",
  "body": [
   "A stream is a pipeline for processing a sequence of elements: a source, zero or more intermediate operations, and one terminal operation. A stream does not store data and cannot be reused; once a terminal operation runs, calling another operation on the same stream object throws `IllegalStateException`. The first skill is knowing how to create the source. This single-use rule surprises people who think of a stream as a kind of collection. A collection is a container you can loop over many times. A stream is closer to an iterator: a one-way pass over data from some source. If you need to process the same data twice, keep the source, such as the list, and call `stream()` on it again to get a fresh pipeline each time.",
   "From a collection, call `stream()` (or `parallelStream()`): `List.of(\"a\", \"b\").stream()`. A Map is not a Collection, so you stream one of its views, such as `map.entrySet().stream()` or `map.keySet().stream()`. From an array use `Arrays.stream(array)`; for an int[] this gives an `IntStream`, not a `Stream<Integer>`. From individual values use `Stream.of(\"a\", \"b\", \"c\")`. `Stream.empty()` makes an empty stream and `Stream.ofNullable(x)` gives a stream with zero elements if x is null, otherwise one. Watch the array case carefully. `Arrays.stream(int[])` returns an IntStream of the numbers, but `Stream.of(intArray)` returns a `Stream<int[]>` with a single element, the array itself, because the varargs parameter of `Stream.of` is a generic type and an int[] is one object. With an object array such as `String[]`, `Stream.of(array)` and `Arrays.stream(array)` both stream the individual strings. `Arrays.stream(array, from, to)` streams just a slice, again with an exclusive end.",
   "`IntStream.range(1, 5)` produces 1, 2, 3, 4: the end is exclusive. `IntStream.rangeClosed(1, 5)` produces 1 through 5 inclusive. The same methods exist on LongStream. These are the stream equivalents of a counting for loop, and the exclusive versus inclusive end is a favorite exam detail. A useful check is to compute the size: `range(a, b)` has `b - a` elements, and `rangeClosed(a, b)` has `b - a + 1`. If the start is greater than the end, both methods produce an empty stream rather than counting downward or throwing. Because these return IntStream, you call `boxed()` or `mapToObj` when you need a `Stream<Integer>` or a stream of objects such as formatted strings.",
   "Streams can also be infinite. `Stream.generate(supplier)` calls the supplier for each element, for example `Stream.generate(() -> \"x\")`. `Stream.iterate(seed, next)` starts with the seed and applies the UnaryOperator repeatedly: `Stream.iterate(1, n -> n * 2)` gives 1, 2, 4, 8 and so on forever. An infinite stream is fine as long as a short-circuiting operation such as `limit`, `findFirst` or `anyMatch` stops it; calling `count()` or `forEach` on it without a limit never finishes. The difference between the two generators is about state. `generate` calls its Supplier independently every time, which suits constant values or random numbers, as in `Stream.generate(Math::random)`. `iterate` feeds each result back in to compute the next one, which suits sequences where each term depends on the previous term. `IntStream.iterate` and `IntStream.generate` provide the same behavior for primitive ints.",
   "The three-argument form `Stream.iterate(seed, hasNext, next)` works like a for loop and is finite: `Stream.iterate(1, n -> n <= 100, n -> n * 2)` gives 1, 2, 4, 8, 16, 32, 64. The predicate is tested before each element is emitted, including the seed. Getting the argument order wrong (next before hasNext) will not compile because the types differ. Compare it with a classic loop to read it: `for (int n = 1; n <= 100; n = n * 2)` maps directly to seed, hasNext and next. If the seed itself fails the predicate, as in `Stream.iterate(500, n -> n <= 100, n -> n * 2)`, the stream is empty.",
   "```java\nStream<String> s1 = Stream.of(\"a\", \"b\", \"c\");\nIntStream s2 = IntStream.rangeClosed(1, 3);          // 1 2 3\nStream<Integer> s3 = Stream.iterate(0, n -> n + 5).limit(4); // 0 5 10 15\nStream<Integer> s4 = Stream.iterate(1, n -> n < 20, n -> n * 3); // 1 3 9\nlong c = s1.count();\n// s1.count();  // IllegalStateException: stream has already been operated upon\n```",
   "Files also produce streams (`Files.lines`, `Files.list`), and `String.chars()` gives an IntStream of character values. Whatever the source, the rules are the same: nothing happens until a terminal operation runs, and each stream object is single use."
  ],
  "analogy": "Think of stream sources as ways to load a conveyor belt. A collection is a box of parts tipped onto the belt; it ends when the box is empty. `Stream.of` is placing a few parts by hand. A range is a numbered ticket dispenser, and `range` stops one ticket short of the number you name. `iterate` is a machine that builds each part from the last one, and without an off switch it never stops. Unlike a real belt, you cannot run the same stream past the workers twice.",
  "terms": [
   [
    "Stream source",
    "Where the elements come from, such as a collection, array, Stream.of values, a range or a generator."
   ],
   [
    "IntStream.range",
    "Produces ints from the start up to but not including the end."
   ],
   [
    "IntStream.rangeClosed",
    "Produces ints from the start up to and including the end."
   ],
   [
    "Stream.iterate",
    "Builds a stream from a seed and a function applied repeatedly; the two-argument form is infinite, the three-argument form stops when a predicate fails."
   ],
   [
    "Infinite stream",
    "A stream with no natural end, made by generate or two-argument iterate, which needs a short-circuiting operation to finish."
   ],
   [
    "Stream.of",
    "Creates a stream from the values passed as arguments; an int[] passed alone becomes a single element."
   ],
   [
    "Stream.generate",
    "Creates an infinite stream by calling a Supplier for each element."
   ]
  ],
  "example": "A test harness needs order IDs 1 through 50. Instead of a loop that fills a list, it uses IntStream.rangeClosed(1, 50).mapToObj(i -> \"ORD-\" + i).toList(), which reads as a description of the data rather than a set of instructions.",
  "mistakes": [
   [
    "IntStream.range(1, 10) includes 10.",
    "range has an exclusive end and produces 1 through 9. Use rangeClosed(1, 10) to include 10."
   ],
   [
    "A stream stored in a variable can be used for count() and then forEach().",
    "Each stream is single use. The second terminal operation throws IllegalStateException; create a new stream from the source instead."
   ],
   [
    "Stream.of(new int[]{1, 2, 3}) gives a stream of three Integers.",
    "It gives a Stream<int[]> with one element. Use Arrays.stream(int[]) or IntStream.of(1, 2, 3)."
   ],
   [
    "You can call map.stream() directly on a HashMap.",
    "Map is not a Collection and has no stream() method. Stream entrySet(), keySet() or values() instead."
   ]
  ],
  "tryit": [
   [
    "You need a stream of the powers of ten up to and including one million to test number formatting. A teammate proposes Stream.iterate(1, n -> n * 10).forEach(System.out::println). What is wrong, and what is a correct finite version?",
    "The two-argument iterate is infinite and forEach never stops. Use Stream.iterate(1, n -> n <= 1_000_000, n -> n * 10), or add limit(7) to the original pipeline."
   ]
  ],
  "tip": "Remember range excludes the end and rangeClosed includes it, and that a stream is single use. A question that stores a stream in a variable and calls two terminal operations on it ends in IllegalStateException.",
  "check": [
   [
    "How many elements does IntStream.range(3, 3) produce?",
    "Zero. The end is exclusive, so a range whose start equals its end is empty."
   ],
   [
    "What does Stream.iterate(2, n -> n < 10, n -> n + 3) produce?",
    "2, 5, 8. The next value 11 fails the predicate, so the stream ends."
   ],
   [
    "What happens if you call count() on Stream.generate(() -> 1) without limit?",
    "It never returns, because the stream is infinite and count must consume every element."
   ],
   [
    "What does Arrays.stream(new int[]{4, 5}) return?",
    "An IntStream containing 4 and 5, not a Stream<Integer>."
   ]
  ]
 },
 {
  "t": "Intermediate operations and lazy evaluation: filter, map, flatMap, peek, sorted, distinct, limit",
  "hook": "Late on a Friday at Silver Pine Analytics, Jun adds a `peek(System.out::println)` to a stream pipeline to see why a report shows the wrong customers. Nothing prints. Puzzled, he adds a `forEach` at the end, and now the output appears, but in a strange interleaved order: each element seems to travel through all the steps before the next one even starts. Then he notices that some customers are never printed at all, even though they are in the source list, because a `limit(3)` sits further down the pipeline. Jun's mental model of \"filter everything, then map everything\" is clearly wrong. How does a stream really move its elements through the steps?",
  "simple": "Intermediate operations are the workers along the stream's conveyor belt. One worker throws away items that do not pass a test (filter). Another changes each item into something else (map). Another opens boxes and puts their contents on the belt (flatMap). Others remove duplicates, sort, or stop after a set number of items. The surprising part is that the workers are lazy: setting them up does nothing until someone at the end of the belt actually asks for results. Then items travel one at a time down the whole line, so if the last worker only wants three items, the belt stops early and the rest are never touched.",
  "body": [
   "Intermediate operations transform a stream into another stream. They are lazy: calling `filter` or `map` only records a step in the pipeline. No element is processed until a terminal operation runs. If a pipeline has no terminal operation, none of its lambdas are ever executed, which is why a question with only `peek(System.out::println)` and no terminal operation prints nothing. Each intermediate call returns a new Stream object that remembers the previous stage, so a chain such as `filter(...).map(...)` builds a linked description of the work. The terminal operation then pulls elements through that description. This design lets the library combine steps, skip work that cannot affect the result, and handle sources far larger than memory.",
   "`filter(Predicate)` keeps the elements for which the predicate returns true. `map(Function)` converts each element into exactly one new element, possibly of a different type. `flatMap(Function)` converts each element into a stream and then flattens all those streams into one, so a `Stream<List<String>>` becomes a `Stream<String>` with `flatMap(List::stream)`. `mapToInt`, `mapToObj` and similar switch between object and primitive streams. The difference between map and flatMap shows up in the types. If each order has a `List<Item>`, then `orders.stream().map(Order::items)` gives a `Stream<List<Item>>`, a stream of lists, while `orders.stream().flatMap(o -> o.items().stream())` gives a `Stream<Item>`, a single stream of all items. The function passed to flatMap must return a Stream, not a List, which is why `List::stream` or `Collection::stream` appears so often in these calls.",
   "`distinct()` removes duplicates using `equals` (and `hashCode`). `sorted()` sorts by natural order and requires elements to be Comparable, otherwise a `ClassCastException` occurs when the terminal operation runs; `sorted(Comparator)` uses the supplied order. `limit(n)` passes on at most n elements and `skip(n)` discards the first n. `peek(Consumer)` runs an action on each element as it passes and returns the same elements; it is meant for debugging, not for changing state. For an ordered stream, `distinct` keeps the first occurrence of each value, so `Stream.of(3, 1, 3, 2, 1).distinct()` yields 3, 1, 2. `sorted(Comparator.reverseOrder())` sorts in descending natural order, and comparators built with `Comparator.comparing` work the same way. Two further short-circuiting operations are useful to recognize: `takeWhile(predicate)` passes elements until the first one that fails, and `dropWhile(predicate)` discards elements until the first one that fails. Unlike filter, neither one tests the remaining elements once the condition first changes: takeWhile stops, and dropWhile passes everything after that point.",
   "Laziness has a visible effect on order. Elements flow through the pipeline one at a time, vertically, rather than each operation finishing all elements before the next starts. With `limit`, processing stops as soon as enough elements have passed, so earlier steps may run on only a few elements. This is also what lets infinite streams work. A good way to trace output is to write each element in a column and move it down through every step before starting the next element. When an element is rejected by filter, it stops there and the next element begins. When limit has passed its quota, the pipeline signals that no more elements are needed, and the source stops supplying them.",
   "```java\nStream.of(\"b\", \"a\", \"c\", \"d\")\n      .peek(s -> System.out.print(\"p\" + s + \" \"))\n      .filter(Predicate.not(\"a\"::equals))\n      .map(String::toUpperCase)\n      .limit(2)\n      .forEach(s -> System.out.print(s + \" \"));\n// prints: pb B pa pc C\n// \"d\" is never peeked: limit(2) was already satisfied\n```",
   "`sorted` and `distinct` are stateful: they must remember elements they have seen. `sorted` in particular has to see every element before it can emit the first one, so in a pipeline with `sorted` all earlier steps run on all elements first, and `sorted` on an infinite stream never finishes even if a `limit` comes after it. Put `limit` before `sorted` when you want to sort only the first few elements of an infinite source. The opposite placement matters as well. `Stream.iterate(1, n -> n + 1).limit(5).sorted()` finishes, because sorted only receives five elements. A similar issue arises with `distinct` on an infinite stream that contains only a few distinct values: `Stream.generate(() -> 1).distinct().limit(2)` never completes, because distinct keeps waiting for a second distinct value that never comes.",
   "Intermediate operations never modify the source collection. `list.stream().map(String::toUpperCase)` leaves the list unchanged; you must collect the result into a new collection if you want to keep it.",
   "When peek appears in an exam question, ask two things: is there a terminal operation, and how many elements actually reach the peek before the pipeline stops? Also be aware that a terminal operation which can compute its answer without traversing elements, such as `count()` on a sized source with no filter, may skip running intermediate steps entirely, so a peek before a plain count might print nothing. This is one more reason to treat peek as a debugging aid rather than as a place to put logic the program depends on."
  ],
  "analogy": "Imagine an assembly line where nothing moves until a customer at the far end places an order. When the customer asks for two finished parts, the first raw part travels the whole line, then the next, and as soon as two finished parts arrive the line shuts off; the remaining raw parts never leave the shelf. A sorting station is the exception: it has to collect every part before it can hand out the smallest one, so it holds up the line until the shelf is empty.",
  "terms": [
   [
    "Lazy evaluation",
    "Intermediate operations run only when a terminal operation pulls elements through the pipeline."
   ],
   [
    "flatMap",
    "Maps each element to a stream and concatenates the resulting streams into a single stream."
   ],
   [
    "Stateful operation",
    "An intermediate operation such as sorted or distinct that must track elements it has already seen."
   ],
   [
    "Short-circuiting operation",
    "An operation such as limit that can finish without processing every element."
   ],
   [
    "peek",
    "An intermediate operation that performs an action on each element as it passes, mainly for debugging."
   ],
   [
    "takeWhile",
    "A short-circuiting intermediate operation that passes elements until the first one that fails a predicate."
   ],
   [
    "distinct",
    "A stateful intermediate operation that removes duplicates using equals and hashCode, keeping the first occurrence in ordered streams."
   ]
  ],
  "example": "A log analyzer reads millions of lines but only needs the first five error lines. Because streams are lazy, lines().filter(l -> l.contains(\"ERROR\")).limit(5) stops reading as soon as five matches are found instead of scanning the whole file.",
  "mistakes": [
   [
    "Each intermediate operation processes all elements before the next operation starts.",
    "Elements flow one at a time through the whole pipeline, which is why limit can stop work early."
   ],
   [
    "Adding peek(System.out::println) will print elements even without a terminal operation.",
    "Intermediate operations are lazy; without a terminal operation nothing runs and nothing prints."
   ],
   [
    "Putting limit after sorted makes sorted on an infinite stream finish.",
    "sorted must see every element first, so it never finishes on an infinite stream. Put limit before sorted."
   ],
   [
    "map(List::stream) flattens a Stream<List<T>> into a Stream<T>.",
    "map produces a Stream<Stream<T>>. Use flatMap(List::stream) to flatten."
   ]
  ],
  "tryit": [
   [
    "A pipeline is Stream.of(5, 3, 8, 1).peek(n -> System.out.print(n + \" \")).filter(n -> n > 2).limit(2).forEach(n -> System.out.print(\"[\" + n + \"] \"));. What does it print?",
    "5 [5] 3 [3]. Element 5 is peeked, passes the filter and is printed by forEach; then 3 does the same, satisfying limit(2), so 8 and 1 are never peeked."
   ],
   [
    "Your team stores customers with a List<String> of phone numbers each, and you need one sorted list of every unique phone number. Which intermediate operations do you chain, and in what order?",
    "flatMap(c -> c.phones().stream()) to get one stream of numbers, then distinct() to remove duplicates, then sorted(), and finally a terminal operation such as toList()."
   ]
  ],
  "tip": "Trace output questions element by element, not operation by operation, and check whether there is a terminal operation at all. Also watch for sorted on an infinite stream, which hangs even with a later limit.",
  "check": [
   [
    "What does Stream.of(1, 2, 3).peek(System.out::println); print?",
    "Nothing. There is no terminal operation, so the lazy pipeline never runs."
   ],
   [
    "How do you turn a List<List<Integer>> into a Stream<Integer>?",
    "listOfLists.stream().flatMap(List::stream)."
   ],
   [
    "Why does Stream.iterate(1, n -> n + 1).sorted().limit(3).toList() never finish?",
    "sorted must see all elements before emitting any, and the source is infinite."
   ],
   [
    "What does Stream.of(3, 1, 3, 2, 1).distinct().toList() return?",
    "[3, 1, 2]; distinct keeps the first occurrence of each value in encounter order."
   ]
  ]
 },
 {
  "t": "Terminal operations: forEach, reduce, collect, count, findFirst, anyMatch, toList",
  "hook": "At Meadowbrook Grocers, the checkout service has been rewritten with streams, and a junior developer named Theo is pairing with you on the last bug. One line, `int items = cart.stream().count();`, will not compile. Another, `Integer cheapest = prices.stream().min(Comparator.naturalOrder());`, fails too. A third compiles, but when the receipt code tries to `add` a \"Thank you\" line to the list returned by `toList()`, the service throws at run time. Theo sighs: \"The pipeline logic is right. Why does the very last call keep breaking?\" Every one of these bugs sits in the terminal operation. What does each terminal operation actually hand back?",
  "simple": "A terminal operation is the final step that tells a stream \"go.\" Until it runs, nothing happens. Each terminal operation gives back a different kind of answer. Some count items and return a number. Some answer a yes or no question, such as \"is any item expired?\" Some combine everything into one value, like adding up a receipt. Some gather items into a new list. And some, such as \"find the first one\" or \"find the smallest,\" might find nothing at all, so they return a small box called an Optional that may be empty. Knowing which kind of answer comes back is most of the battle on the exam.",
  "body": [
   "A terminal operation ends a pipeline, triggers the processing and produces a result or a side effect. After it runs the stream is consumed. Knowing each operation's return type is essential, because exam code often assigns the result to a variable of the wrong type. Terminal operations fall into a few families: those that run an action (`forEach`), those that test a condition (`anyMatch`, `allMatch`, `noneMatch`), those that search (`findFirst`, `findAny`, `min`, `max`), those that reduce to a single value (`count`, `reduce`), and those that gather elements into a container (`collect`, `toList`, `toArray`). Grouping them this way makes return types easier to remember.",
   "`forEach(Consumer)` performs an action on each element and returns void. `count()` returns a long. `min(Comparator)` and `max(Comparator)` return an `Optional<T>`, because the stream might be empty. `findFirst()` and `findAny()` also return Optional; `findFirst` respects encounter order, while `findAny` may return any element and is cheaper in parallel streams. `toList()` returns an unmodifiable List containing the elements in order; adding to it throws `UnsupportedOperationException`. Because `count()` returns a long, `int n = stream.count();` does not compile without a cast. For parallel streams, `forEach` does not promise any order; `forEachOrdered` processes elements in encounter order when the stream has one. `toArray()` with no arguments returns an `Object[]`, while `toArray(String[]::new)` returns a correctly typed `String[]`. Unlike `List.of`, the list from `Stream.toList()` may contain null elements, but it is still unmodifiable.",
   "`anyMatch`, `allMatch` and `noneMatch` take a Predicate and return a boolean. They short-circuit: `anyMatch` stops at the first true, `allMatch` at the first false. On an empty stream `anyMatch` returns false while `allMatch` and `noneMatch` return true (there is no counterexample). Short-circuiting terminal operations like these and the find methods can finish on an infinite stream; `count` and `forEach` cannot. The empty-stream results follow from logic rather than memorization: \"is any element red?\" is false when there are no elements, while \"are all elements red?\" is vacuously true because no element breaks the rule, and \"are no elements red?\" is likewise true. Many exam distractors assume allMatch on an empty stream is false, so this is worth slowing down for.",
   "`reduce` combines all elements into one value. There are three forms. `reduce(identity, accumulator)` returns a T and uses the identity as the starting value and as the result for an empty stream: `Stream.of(1, 2, 3).reduce(0, Integer::sum)` is 6. `reduce(accumulator)` has no identity, so it returns `Optional<T>`, empty if the stream is empty. `reduce(identity, accumulator, combiner)` lets the result type differ from the element type, and the combiner merges partial results in parallel streams. The identity must truly be neutral for the accumulator, because the library may apply it more than once when working in parallel. Using 10 as the identity for addition, for example, gives a different total in a parallel stream than in a sequential one. The three-argument form is the one to reach for when the element type and result type differ, such as summing the lengths of a `Stream<String>` into an Integer: `reduce(0, (total, s) -> total + s.length(), Integer::sum)`. The single-argument form is common in questions that then call `get()` or `orElse` on the result.",
   "`collect` performs a mutable reduction into a container. Most often you pass a Collector such as `Collectors.toList()`, `toSet()`, `joining()` or `groupingBy(...)`. There is also a three-argument form `collect(supplier, accumulator, combiner)`, for example `collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)`. Unlike `toList()`, `Collectors.toList()` makes no promise about mutability; `Collectors.toUnmodifiableList()` explicitly makes it unmodifiable. The difference between `reduce` and `collect` is worth stating clearly. `reduce` is designed for immutable values: each step produces a new value, such as a new sum. `collect` is designed for mutable containers: each step adds to a container that already exists, such as an ArrayList or a StringBuilder, which is far more efficient for building collections.",
   "```java\nList<String> names = List.of(\"Ana\", \"Bo\", \"Cy\");\nlong n = names.stream().filter(s -> s.length() == 2).count();       // 2\nOptional<String> f = names.stream().findFirst();                     // Optional[Ana]\nboolean any = names.stream().anyMatch(s -> s.startsWith(\"B\"));    // true\nint total = names.stream().map(String::length).reduce(0, Integer::sum); // 7\nOptional<Integer> none = Stream.<Integer>empty().reduce(Integer::sum);  // Optional.empty\nList<String> up = names.stream().map(String::toUpperCase).toList();\n```",
   "Exam questions on terminal operations usually test three things. First, the return type: count is long; min, max, findFirst, findAny and single-argument reduce return Optional; the match methods return boolean; forEach returns void, so its result cannot be assigned to anything. Second, the empty-stream behavior: Optionals come back empty, the match methods follow the any-false, all-true, none-true rule, and two-argument reduce returns its identity. Third, whether the operation can finish on an infinite stream: the match and find operations can, because they short-circuit, while count, forEach, collect and toList cannot."
  ],
  "analogy": "Think of a stream pipeline as a kitchen preparing an order, and the terminal operation as the request the customer makes at the counter. \"How many dishes?\" gets a number. \"Is any dish spicy?\" gets yes or no. \"Give me the first dish\" might get an empty tray if nothing was cooked, which is what Optional represents. \"Put everything on one plate\" is reduce or collect. The analogy fails in one way: a kitchen can answer several questions about the same order, but a stream answers only one.",
  "terms": [
   [
    "Terminal operation",
    "The final operation of a pipeline that triggers processing and produces a result or side effect."
   ],
   [
    "reduce",
    "Combines the elements into a single value with an accumulator, optionally starting from an identity value."
   ],
   [
    "Identity value",
    "A starting value that does not change the result when combined, such as 0 for addition or \"\" for concatenation."
   ],
   [
    "collect",
    "A mutable reduction that gathers elements into a container, usually via a Collector."
   ],
   [
    "Stream.toList()",
    "A terminal operation that returns an unmodifiable List of the stream's elements."
   ],
   [
    "Optional",
    "A container returned by find, min, max and single-argument reduce that holds a value or is empty."
   ],
   [
    "Short-circuiting terminal operation",
    "A terminal operation such as anyMatch or findFirst that can finish without consuming every element."
   ]
  ],
  "example": "A checkout service checks cart.stream().anyMatch(Item::isRestricted) before asking for age verification, computes the total with map(Item::price).reduce(BigDecimal.ZERO, BigDecimal::add), and builds the receipt lines with toList().",
  "mistakes": [
   [
    "count() returns an int.",
    "It returns a long, so assigning it to an int without a cast does not compile."
   ],
   [
    "allMatch returns false on an empty stream because nothing matched.",
    "It returns true: with no elements, nothing violates the predicate. anyMatch is the one that returns false."
   ],
   [
    "min and max return the element directly.",
    "They return Optional<T>, because the stream might be empty. Call orElse, orElseThrow or a similar method to get the value."
   ],
   [
    "The list returned by Stream.toList() can be added to like Collectors.toList().",
    "Stream.toList() returns an unmodifiable list, so add throws UnsupportedOperationException. Collectors.toList() makes no guarantee either way."
   ]
  ],
  "tryit": [
   [
    "A reporting job must decide whether any order in a very large, possibly endless feed is flagged for fraud, and stop as soon as it finds one. A teammate suggests filter(Order::isFlagged).count() > 0. What is a better choice and why?",
    "anyMatch(Order::isFlagged). It short-circuits on the first match and returns a boolean, while count must consume every element and would never finish on an endless feed."
   ]
  ],
  "tip": "Know the return types: count is long, min, max, findFirst, findAny and single-argument reduce return Optional, the match methods return boolean, and allMatch on an empty stream is true.",
  "check": [
   [
    "What type does Stream.of(3, 1, 2).max(Comparator.naturalOrder()) return?",
    "Optional<Integer>, here containing 3."
   ],
   [
    "What does Stream.<String>empty().allMatch(s -> s.isEmpty()) return?",
    "true. With no elements, nothing violates the predicate."
   ],
   [
    "What happens when you call add on the list returned by stream.toList()?",
    "It throws UnsupportedOperationException because the list is unmodifiable."
   ],
   [
    "What does Stream.of(4, 5).reduce(1, (a, b) -> a * b) return?",
    "20, starting from the identity 1 and multiplying by 4 and then 5."
   ]
  ]
 },
 {
  "t": "Collectors: groupingBy, partitioningBy, counting, joining, toMap and merge functions",
  "hook": "It is Monday morning at Fernhill Help Desk, and the support manager, Odette, wants a dashboard before the 10 a.m. standup: open tickets counted by priority, a list of overdue tickets that must appear even if it is empty, and a map from each agent's email address to their ticket count. Your teammate Ravi wrote all three in one evening using Collectors. The priority counts look right, but the overdue section disappears on good days, and the agent map crashes with an `IllegalStateException` whenever an agent appears twice. The fixes are each a single argument. Which collector should each part of the dashboard use, and what does it return?",
  "simple": "Collectors are recipes for gathering the items in a stream into a result. Some recipes put items into a list or set. `joining` strings items together into one piece of text, like making a comma-separated line. `groupingBy` sorts items into labeled bins, like sorting laundry by color, and gives back a map from each label to what landed in that bin. `partitioningBy` is the same idea with exactly two bins, yes and no, and both bins always exist even if one is empty. `toMap` lets you choose both the label and the value, but if two items want the same label, you must say how to combine them, or Java stops with an error.",
  "body": [
   "The `Collectors` class provides ready-made recipes you pass to `collect`. The simple ones gather elements into a container: `toList()`, `toSet()`, `toCollection(TreeSet::new)`. `joining()` concatenates a stream of CharSequence values; `joining(\", \")` adds a delimiter, and `joining(\", \", \"[\", \"]\")` adds a prefix and suffix. Joining an empty stream with a prefix and suffix gives just \"[]\". `toCollection` is the escape hatch when you need a specific collection type, such as a TreeSet for sorted unique values or a LinkedList. Note that `joining` only works on a stream of `CharSequence` values; to join numbers, map them to strings first with `map(String::valueOf)`.",
   "`groupingBy(classifier)` builds a `Map<K, List<T>>`: the classifier function computes a key for each element, and elements with the same key go into the same list. Only keys that actually occur appear in the map. A second argument is a downstream collector that processes each group instead of listing it: `groupingBy(String::length, Collectors.counting())` gives a `Map<Integer, Long>`. A three-argument form adds a map factory, `groupingBy(f, TreeMap::new, toList())`, when you need sorted keys; otherwise the map type is unspecified (in practice a HashMap). Each list in the result keeps the elements in encounter order, so a grouped list of words appears in the same order the words had in the source. The classifier must not return null: grouping an element whose key would be null throws a `NullPointerException`. Downstream collectors can be nested, so `groupingBy(Employee::department, groupingBy(Employee::title, counting()))` builds a `Map<String, Map<String, Long>>`, which is the kind of type an exam may ask you to write out.",
   "`partitioningBy(predicate)` is a special grouping with only two keys, true and false, returning `Map<Boolean, List<T>>`. Unlike groupingBy, both keys are always present, even if one list is empty. It also accepts a downstream collector. Useful downstream collectors include `counting()` (which yields a Long, not an Integer), `summingInt`, `averagingInt` (always a Double), `mapping(f, toList())`, `maxBy(comparator)` (an Optional) and `toSet()`. The guaranteed presence of both keys is the main reason to choose partitioningBy over grouping by a boolean. `groupingBy(w -> w.length() > 6)` would also produce Boolean keys, but if no word were longer than six letters, the `true` key would simply be missing and `map.get(true)` would return null. `mapping(f, downstream)` adapts elements before they reach another collector, as in collecting just the names of employees in each department, and `filtering(p, downstream)` applies a predicate inside each group while still keeping groups that end up empty.",
   "`toMap(keyMapper, valueMapper)` builds a map where you choose both key and value. If two elements produce the same key it throws `IllegalStateException` for a duplicate key. To handle collisions, add a merge function, a BinaryOperator that combines the old and new values: `toMap(k, v, (a, b) -> a + b)` or `(a, b) -> a` to keep the first. A fourth argument supplies the map type, such as `TreeMap::new`. A frequent pattern is counting with toMap: `toMap(w -> w, w -> 1, Integer::sum)` maps each word to 1 and adds the counts together when a word repeats. The merge function receives the existing value first and the new value second, so `(a, b) -> b` keeps the last value instead of the first. Like groupingBy, the plain toMap returns a map whose type is unspecified, so supply `TreeMap::new` as the fourth argument when key order matters.",
   "```java\nList<String> words = List.of(\"apple\", \"avocado\", \"banana\", \"cherry\", \"blueberry\");\nMap<Character, List<String>> byLetter =\n    words.stream().collect(Collectors.groupingBy(w -> w.charAt(0)));\n// {a=[apple, avocado], b=[banana, blueberry], c=[cherry]}\nMap<Boolean, Long> longOnes =\n    words.stream().collect(Collectors.partitioningBy(w -> w.length() > 6, Collectors.counting()));\n// {false=3, true=2}\nMap<Character, Integer> totalLen = words.stream().collect(\n    Collectors.toMap(w -> w.charAt(0), String::length, Integer::sum));\n// {a=12, b=15, c=6}\nString csv = words.stream().collect(Collectors.joining(\",\", \"<\", \">\"));\n```",
   "When reading a question, work out the exact generic type of the result map. `groupingBy` with no downstream gives List values; with `counting()` it gives Long values; with `mapping(..., toSet())` it gives Set values. Assigning a `Map<Boolean, List<String>>` result to a `Map<String, List<String>>` variable does not compile.",
   "It helps to remember what each collector does with empty input. `groupingBy` on an empty stream returns an empty map. `partitioningBy` on an empty stream still returns a map with both keys, each holding an empty list or the downstream collector's empty result, such as 0 for counting. `joining` returns an empty string, or just the prefix and suffix if you supplied them. `toMap` returns an empty map. Finally, recall that none of these collectors modify the source; they always build new containers, and the exam may ask you to confirm that the original list is unchanged after collecting."
  ],
  "analogy": "Picture a mailroom. groupingBy is a wall of pigeonholes that appears one slot at a time: a slot exists only once a letter for that name arrives. partitioningBy is a desk with exactly two trays, Yes and No, sitting there every day whether or not mail comes. toMap is a mailroom where each person may hold only one envelope; when a second envelope arrives for the same person, someone must decide how to combine them, or the clerk refuses to continue.",
  "terms": [
   [
    "groupingBy",
    "A collector that groups elements by a classifier into a Map whose values are lists or the result of a downstream collector."
   ],
   [
    "partitioningBy",
    "A collector that splits elements into a Map<Boolean, ...> with both true and false keys always present."
   ],
   [
    "Downstream collector",
    "A collector passed to groupingBy or partitioningBy that processes each group, such as counting or mapping."
   ],
   [
    "Merge function",
    "A BinaryOperator given to toMap that decides the value when two elements map to the same key."
   ],
   [
    "joining",
    "A collector that concatenates strings with an optional delimiter, prefix and suffix."
   ],
   [
    "toMap",
    "A collector that builds a map from key and value functions; without a merge function it throws IllegalStateException on duplicate keys."
   ],
   [
    "mapping",
    "A downstream collector that transforms each element before passing it to another collector."
   ]
  ],
  "example": "A help desk dashboard groups tickets with groupingBy(Ticket::priority, counting()) to show how many are open at each priority, and partitions them with partitioningBy(Ticket::isOverdue) so the overdue list is always present even when it is empty.",
  "mistakes": [
   [
    "counting() produces Integer values.",
    "counting() produces Long, so groupingBy(f, counting()) yields Map<K, Long>."
   ],
   [
    "partitioningBy omits the false key when every element passes.",
    "Both true and false keys are always present; the unused one maps to an empty list or the downstream collector's empty result."
   ],
   [
    "toMap keeps the last value automatically when keys repeat.",
    "Without a merge function it throws IllegalStateException. Provide (a, b) -> b to keep the last or (a, b) -> a to keep the first."
   ],
   [
    "groupingBy returns a sorted TreeMap.",
    "The map type is unspecified unless you supply a map factory such as TreeMap::new in the three-argument form."
   ]
  ],
  "tryit": [
   [
    "A school system has a Stream<Student> and needs, for each grade level, the set of student last names, with grade levels in ascending order. Which collector call produces this, and what is the result type?",
    "groupingBy(Student::grade, TreeMap::new, mapping(Student::lastName, toSet())), which returns a TreeMap<Integer, Set<String>> (declared as Map<Integer, Set<String>>). The map factory gives sorted keys and mapping with toSet gives unique names."
   ],
   [
    "You must build a Map<String, Double> from product name to price, but the feed sometimes repeats a product with an updated price that should win. What do you add to toMap?",
    "A merge function that keeps the newer value: toMap(Product::name, Product::price, (oldP, newP) -> newP)."
   ]
  ],
  "tip": "toMap without a merge function throws IllegalStateException on a duplicate key. counting() produces Long, and averagingX produces Double; exam answers often use Integer instead.",
  "check": [
   [
    "What is the type of stream.collect(groupingBy(String::length, counting())) for a Stream<String>?",
    "Map<Integer, Long>."
   ],
   [
    "If no element satisfies the predicate, what does partitioningBy return?",
    "A map with both keys: true maps to an empty list and false maps to all elements."
   ],
   [
    "How do you keep the first value when toMap sees duplicate keys?",
    "Supply a merge function (a, b) -> a as the third argument."
   ],
   [
    "What does Stream.of(1, 2, 3).map(String::valueOf).collect(Collectors.joining(\"-\")) return?",
    "\"1-2-3\"."
   ]
  ]
 },
 {
  "t": "Primitive streams and summary statistics",
  "hook": "At Northgate Weather Cooperative, a dashboard shows the minimum, maximum and average temperature from each station every minute. Imani, the developer on call, notices the code opens the data three times per refresh: once for the sum, once for the max, once for the count. When she tries to reuse one stream instead, it throws an exception. Worse, for a station that sent no readings, the dashboard shows a maximum temperature of minus two billion. A colleague suggests a single call that gathers everything in one pass. Imani wants to know which method that is, why the empty station shows such a strange number, and what `average()` really returns.",
  "simple": "Java has special streams for plain numbers: IntStream for whole numbers, LongStream for very large whole numbers, and DoubleStream for numbers with decimals. They skip the extra wrapping that regular objects need, so they are faster, and they come with handy math buttons such as sum and average. Because a list might be empty, some answers come in a small box that may be empty, like asking \"what is the average age of nobody?\" When you want several answers at once, such as the smallest, largest and average, `summaryStatistics()` gives you a report card with all of them from one pass over the numbers, much like a cashier totaling a receipt in one scan.",
  "body": [
   "Java has three primitive stream types: `IntStream`, `LongStream` and `DoubleStream`. They exist to avoid the cost of boxing each number into an Integer, Long or Double object, and they add numeric operations that `Stream<T>` lacks, such as `sum()`, `average()` and `summaryStatistics()`. There is no CharStream, ByteStream or FloatStream; `String.chars()` returns an IntStream. Boxing costs memory and time: a `Stream<Integer>` holds references to Integer objects, each of which must be created and later collected as garbage, while an IntStream works directly with int values. For a few elements the difference is small, but for millions of readings it matters. The primitive streams also mirror the creation methods you already know, such as `IntStream.of(1, 2, 3)`, `IntStream.range`, `Arrays.stream(int[])` and `IntStream.iterate`.",
   "You move between object and primitive streams with mapping methods. From `Stream<T>` use `mapToInt(ToIntFunction)`, `mapToLong` or `mapToDouble`. From a primitive stream back to objects use `mapToObj(IntFunction)` or `boxed()`, which turns an IntStream into a `Stream<Integer>`. Between primitive types use `asLongStream()`, `asDoubleStream()` or `mapToLong` and similar. `map` on an IntStream must return an int (it takes an IntUnaryOperator). Getting these conversions wrong is a common source of compile errors. A `Stream<String>` has no `sum()` method, so `names.stream().map(String::length).sum()` does not compile; the fix is `mapToInt(String::length).sum()`. In the other direction, an IntStream cannot be collected with `Collectors.toList()` directly, because primitive streams have no single-argument collect method; call `boxed()` first.",
   "Return types are a frequent exam topic. On an IntStream, `sum()` returns int, and on a LongStream it returns long. `average()` returns `OptionalDouble` for every primitive stream type, because the average of whole numbers can have a fraction and an empty stream has no average. `max()` and `min()` on an IntStream return `OptionalInt`, which you read with `getAsInt()`, not `get()`. `count()` is still long. The `sum()` of a DoubleStream returns a double. Integer sums can overflow silently: summing large int values in an IntStream wraps around without an exception, so use `asLongStream().sum()` or a LongStream when totals may exceed the int range. To read an OptionalDouble, call `getAsDouble()`, or use `orElse(0.0)` to supply a fallback for an empty stream.",
   "When you need several statistics, calling `sum()` and then `max()` fails because a stream can be used only once. Instead call `summaryStatistics()`, which makes one pass and returns an `IntSummaryStatistics` (or the Long or Double version) with `getCount()`, `getSum()`, `getMin()`, `getMax()` and `getAverage()`. For IntSummaryStatistics, `getSum()` returns a long so large totals do not overflow. The statistics object is also useful outside streams. You can create an `IntSummaryStatistics` directly, call `accept(value)` for each number as it arrives, and read the totals at any time, which suits code that receives values one at a time. Two statistics objects can be merged with `combine`, which is how parallel streams join partial results.",
   "```java\nint[] scores = {70, 85, 90};\nIntSummaryStatistics st = Arrays.stream(scores).summaryStatistics();\nst.getMin();     // 70\nst.getMax();     // 90\nst.getAverage(); // 81.666...\nst.getSum();     // 245 (a long)\n\nOptionalDouble avg = IntStream.empty().average(); // OptionalDouble.empty\nint total = Stream.of(\"a\", \"bb\").mapToInt(String::length).sum(); // 3\nList<Integer> boxed = IntStream.range(0, 3).boxed().toList();\n```",
   "For an empty stream, summary statistics do not throw. The count and sum are 0 and the average is 0.0, while `getMin()` returns `Integer.MAX_VALUE` and `getMax()` returns `Integer.MIN_VALUE`, the starting values before any element is seen. That is different from `IntStream.empty().max()`, which returns an empty OptionalInt. The equivalent collectors `Collectors.summarizingInt(...)` produce the same statistics object from a Stream of objects. The collector forms are handy when you start from objects and do not want a separate mapping step: `orders.stream().collect(Collectors.summarizingDouble(Order::total))` returns a `DoubleSummaryStatistics` directly. Their siblings `summingInt`, `averagingInt` and the Long and Double versions compute just one value, and `averagingInt` returns a Double even for whole numbers. When a question shows a downstream collector inside `groupingBy`, such as `groupingBy(Order::region, summarizingDouble(Order::total))`, the result is a map whose values are statistics objects, one per region, each built in a single pass over that region's orders.",
   "For the other types, the empty values follow the same idea: `LongSummaryStatistics` uses `Long.MAX_VALUE` and `Long.MIN_VALUE` for an empty minimum and maximum, and `DoubleSummaryStatistics` uses positive and negative infinity. The average of an empty summary is 0.0 for all three. In real code, always check `getCount()` before displaying a minimum or maximum, which is exactly the fix Northgate's dashboard needs. On the exam, read each question for three things: which stream type is in play, what each method returns for that type, and whether the stream is used more than once."
  ],
  "analogy": "A summary statistics object is like a cashier who keeps a running tally while scanning groceries: count of items, total cost, cheapest and most expensive item, all updated as each item passes, so the receipt is ready in one pass. Before the first item, the cashier writes \"cheapest so far: infinitely expensive\" and \"most expensive so far: infinitely cheap\" so that any real item will replace them. That is why an empty receipt shows those extreme placeholder values rather than an error.",
  "terms": [
   [
    "IntStream",
    "A stream of primitive int values with numeric operations such as sum, average and summaryStatistics."
   ],
   [
    "OptionalDouble",
    "An Optional-like container for a double, returned by average() on primitive streams; read with getAsDouble()."
   ],
   [
    "boxed()",
    "Converts a primitive stream into a stream of the matching wrapper objects."
   ],
   [
    "IntSummaryStatistics",
    "An object holding count, sum, min, max and average computed in a single pass."
   ],
   [
    "mapToInt",
    "Converts a Stream<T> into an IntStream using a ToIntFunction."
   ],
   [
    "OptionalInt",
    "An Optional-like container for an int, returned by max() and min() on an IntStream; read with getAsInt()."
   ],
   [
    "mapToObj",
    "Converts a primitive stream into a Stream of objects using a function that takes the primitive value."
   ]
  ],
  "example": "A sensor monitor reads temperatures as a DoubleStream and calls summaryStatistics() once per minute to log the min, max and average in a single pass, instead of reopening the data three times.",
  "mistakes": [
   [
    "average() on an IntStream returns an OptionalInt or a double.",
    "It returns OptionalDouble for every primitive stream type, so assigning it to a double does not compile."
   ],
   [
    "You can call get() on the OptionalInt returned by IntStream.max().",
    "OptionalInt has getAsInt(), not get(). Calling get() does not compile."
   ],
   [
    "Summary statistics of an empty IntStream throw an exception for getMax().",
    "They return Integer.MIN_VALUE for getMax() and Integer.MAX_VALUE for getMin(), with a count of 0 and average 0.0."
   ],
   [
    "Stream<Integer> has a sum() method because the elements are numbers.",
    "Only primitive streams have sum(). Convert with mapToInt(Integer::intValue) first."
   ]
  ],
  "tryit": [
   [
    "A fitness app has a List<Workout> and must show total minutes, longest workout and average length on one screen, recalculated often. A teammate writes three separate stream pipelines. What single approach is better, and how do you call it?",
    "Use workouts.stream().mapToInt(Workout::minutes).summaryStatistics() (or collect(Collectors.summarizingInt(Workout::minutes))). It computes count, sum, min, max and average in one pass, and you read them with getSum(), getMax() and getAverage()."
   ]
  ],
  "tip": "average() always returns OptionalDouble, sum() on IntStream returns int, and OptionalInt uses getAsInt(). Answers that assign average() to a double or call get() on an OptionalInt do not compile.",
  "check": [
   [
    "What does IntStream.of(1, 2).average() return?",
    "An OptionalDouble containing 1.5."
   ],
   [
    "What does getMax() return on the summary statistics of an empty IntStream?",
    "Integer.MIN_VALUE; it does not throw."
   ],
   [
    "How do you turn an IntStream into a List<Integer>?",
    "Call boxed() and then a terminal operation such as toList() or collect(Collectors.toList())."
   ],
   [
    "What type does LongStream.of(5, 6).sum() return?",
    "long."
   ]
  ]
 },
 {
  "t": "Optional: of, ofNullable, map, orElse, orElseGet, orElseThrow",
  "hook": "At Riverstone Library's online catalog, the \"Recommended for you\" panel is slow, and Hana from the platform team is asked to find out why. The profiler points at a single line: `String pick = userPick.orElse(loadRecommendation());`. The recommendation call hits a remote service and takes half a second, and it runs on every page view, even for the many patrons who already have a saved pick. Meanwhile a different service crashed overnight with a `NullPointerException` from `Optional.of(member.getNickname())`. Both bugs come from the same small class that was supposed to make missing values safe. What does each Optional method really do, and when does its argument run?",
  "simple": "An Optional is a small box that either holds one thing or is empty. Instead of handing you a \"nothing\" that can crash your program later, a method hands you the box, and you decide what to do if it is empty. You can make a box that must have something in it (`of`), a box that might be empty (`ofNullable`), or an empty box (`empty`). You can transform what is inside without opening the box (`map`). When you finally need the contents, you can ask for a backup if the box is empty (`orElse` or `orElseGet`) or raise an alarm (`orElseThrow`). It is like checking a lost-and-found bin: it might have your umbrella, or you might need a spare.",
  "body": [
   "`Optional<T>` is a container that either holds one non-null value or is empty. Methods such as `findFirst`, `max` and `reduce` return it so that the caller must think about the no-result case instead of receiving a surprise null. It is meant mainly as a return type; using it for fields or method parameters is discouraged. Before Optional, a method that might not find anything usually returned null, and nothing in the method signature warned the caller. A forgotten null check then turned into a `NullPointerException` far from where the value was missing. An `Optional<User>` return type documents the possibility in the signature itself, and the compiler forces the caller to unwrap it deliberately. An Optional variable itself should never be null; return `Optional.empty()` instead.",
   "There are three ways to create one. `Optional.of(value)` requires a non-null value and throws `NullPointerException` if given null. `Optional.ofNullable(value)` returns an empty Optional for null and a full one otherwise, so use it when the value might be missing. `Optional.empty()` returns an empty Optional directly. The choice between `of` and `ofNullable` is a statement about your expectations. Use `of` when a null would indicate a bug, so that it fails fast at the point of creation. Use `ofNullable` when wrapping a value from code that legitimately returns null, such as `Map.get` for a missing key or an older library method.",
   "To test and use the value, `isPresent()` and `isEmpty()` return booleans, `ifPresent(Consumer)` runs an action only if there is a value, and `ifPresentOrElse(Consumer, Runnable)` handles both cases. `get()` returns the value or throws `NoSuchElementException` if empty, which is why it is best avoided in favor of the methods below. The no-argument `orElseThrow()` does exactly the same thing as `get()` but its name makes the risk obvious. A further option, `or(Supplier)`, returns the same Optional if it has a value or another Optional produced by the supplier if it is empty, which is useful for trying several sources in turn. The method `stream()` turns an Optional into a stream of zero or one elements, which is handy inside `flatMap` when processing many Optionals at once. Code such as `if (opt.isPresent()) { use(opt.get()); }` works, but it is just a null check in disguise; the functional methods usually express the same logic more clearly.",
   "`map(Function)` transforms the value if present and returns a new Optional; if the Optional is empty, or the function returns null, the result is empty. `flatMap` is for functions that already return an Optional, so you do not end up with `Optional<Optional<T>>`. `filter(Predicate)` keeps the value only if it matches. These let you chain steps without writing null checks. A chain such as `findUser(id).map(User::address).map(Address::city).orElse(\"Unknown\")` replaces three nested null checks. If any step finds nothing, the rest of the chain is skipped and the fallback is used. Use `flatMap` instead of `map` when a step already returns an Optional, such as `findUser(id).flatMap(User::manager)` where `manager()` returns `Optional<User>`.",
   "Getting a fallback has three variants and the difference is tested. `orElse(other)` returns the value or `other`, but the argument expression is always evaluated, even when the Optional has a value. `orElseGet(Supplier)` calls the supplier only when the Optional is empty, so it is the right choice when the default is expensive or has side effects. `orElseThrow(Supplier)` throws the exception the supplier creates when empty, for example `orElseThrow(() -> new IllegalArgumentException(\"no user\"))`. The reason is ordinary Java evaluation order. Method arguments are always evaluated before the method is called, so in `orElse(loadDefault())` the call to `loadDefault()` happens first, and only then does `orElse` look at whether the Optional is empty. With `orElseGet`, the argument is a lambda, which is just an object describing work; creating it is cheap, and the work runs only if `orElseGet` decides to call it. For a constant fallback such as `orElse(\"Guest\")` or `orElse(0)`, there is no cost difference and `orElse` reads more simply.",
   "```java\nOptional<String> name = Optional.ofNullable(lookup(id));\nint len = name.map(String::length).orElse(0);\nString n1 = name.orElse(loadDefault());          // loadDefault() always runs\nString n2 = name.orElseGet(() -> loadDefault()); // runs only if empty\nString n3 = name.orElseThrow();                  // NoSuchElementException if empty\n// Optional.of(null);  // NullPointerException\n```",
   "Primitive versions `OptionalInt`, `OptionalLong` and `OptionalDouble` come from primitive streams. They have `getAsInt()` and similar instead of `get()`, and they lack `map`, `flatMap` and `filter`.",
   "When reading an exam question about Optional, check four things. How was it created: `of` with a possible null throws immediately, `ofNullable` does not. What does each step return: `map` wraps the result in a new Optional, and a null result becomes empty. Which fallback is used: `orElse` evaluates its argument eagerly, `orElseGet` lazily, and `orElseThrow` throws. And is it a primitive Optional: then the accessor is `getAsInt`, `getAsLong` or `getAsDouble`, and there is no `map`. Also remember that `get()` and the no-argument `orElseThrow()` both throw `NoSuchElementException`, not `NullPointerException`, when the Optional is empty."
  ],
  "analogy": "An Optional is like a parcel locker that may or may not contain your package. `orElse` is asking a friend to bring a spare package to the locker every time you visit, just in case, even on days your package is already waiting. `orElseGet` is keeping the friend's phone number and calling only if the locker is empty. `orElseThrow` is filing a missing-package report when it is empty. The analogy breaks slightly with `map`, which changes the contents without ever opening the locker.",
  "terms": [
   [
    "Optional.of",
    "Creates an Optional holding a non-null value; throws NullPointerException if the value is null."
   ],
   [
    "Optional.ofNullable",
    "Creates an Optional that is empty if the value is null and full otherwise."
   ],
   [
    "orElse",
    "Returns the value or a fallback; the fallback expression is evaluated every time."
   ],
   [
    "orElseGet",
    "Returns the value or calls a Supplier to produce a fallback only when empty."
   ],
   [
    "orElseThrow",
    "Returns the value or throws: NoSuchElementException with no argument, or a supplied exception."
   ],
   [
    "Optional.empty",
    "Returns an Optional with no value, the safe alternative to returning null."
   ],
   [
    "flatMap (Optional)",
    "Applies a function that returns an Optional and avoids nesting the result as Optional<Optional<T>>."
   ]
  ],
  "example": "A user service returns Optional<User> from findByEmail. The controller writes findByEmail(email).map(User::displayName).orElseGet(() -> \"Guest\") so no null check is needed, and the admin API uses orElseThrow(() -> new NotFoundException(email)) to turn absence into a 404 response.",
  "mistakes": [
   [
    "Optional.of(null) returns an empty Optional.",
    "It throws NullPointerException immediately. Use Optional.ofNullable(null) to get an empty Optional."
   ],
   [
    "orElse only evaluates its argument when the Optional is empty.",
    "The argument is evaluated before orElse is called, every time. Use orElseGet with a Supplier for expensive or side-effecting defaults."
   ],
   [
    "get() on an empty Optional returns null.",
    "It throws NoSuchElementException. The same is true of the no-argument orElseThrow()."
   ],
   [
    "OptionalInt supports map and filter like Optional.",
    "OptionalInt, OptionalLong and OptionalDouble have no map, flatMap or filter, and use getAsInt and similar instead of get."
   ]
  ],
  "tryit": [
   [
    "A pricing service writes BigDecimal price = cachedPrice.orElse(fetchPriceFromSupplierApi(sku)); and a monitoring graph shows the supplier receiving a request on every page view, even though the cache hit rate is high. What change fixes this, and why?",
    "Replace orElse with orElseGet(() -> fetchPriceFromSupplierApi(sku)). orElse evaluates its argument eagerly, so the remote call happens every time; orElseGet calls the supplier only when the cache Optional is empty."
   ]
  ],
  "tip": "The classic trap: orElse(expensiveCall()) runs expensiveCall() even when the Optional has a value; orElseGet does not. Also, Optional.of(null) throws immediately, while ofNullable(null) is empty.",
  "check": [
   [
    "What does Optional.ofNullable(null).map(String::length).orElse(-1) return?",
    "-1. The Optional is empty, so map returns an empty Optional and orElse supplies the fallback."
   ],
   [
    "What does the no-argument orElseThrow() throw on an empty Optional?",
    "NoSuchElementException, the same as get()."
   ],
   [
    "What does Optional.of(\"abc\").map(s -> null).isPresent() return?",
    "false. When the mapping function returns null, map returns an empty Optional."
   ]
  ]
 },
 {
  "t": "Stream Gatherers (Java 24+): gather() with Gatherers.windowFixed, windowSliding, fold, scan",
  "hook": "At Brightwater Energy, a monitoring service reads a smart-meter feed and must report a moving average of the last three readings, send readings to the billing system in batches of fifty, and show a running total of energy used today. Lucía, the developer assigned the ticket, starts writing loops with index arithmetic and mutable counters, and the code quickly becomes hard to follow. A reviewer comments: \"These are all one-liners with gatherers now.\" Lucía knows `map`, `filter` and `collect`, but none of them can look at neighboring elements or carry a running state through the middle of a pipeline. What is a gatherer, and which built-in fits each requirement?",
  "simple": "Normal stream steps look at one item at a time and forget it right away. Sometimes you need a step with a memory: group items into batches, look at a few neighbors together, or keep a running total. A gatherer is a step that can remember things between items. Java includes ready-made ones. `windowFixed` cuts the stream into batches of the same size, like packing eggs into cartons of six, where the last carton might be partly full. `windowSliding` looks through a moving frame, like reading three words at a time and shifting one word each step. `scan` keeps a running total and reports it after every item. `fold` keeps a total and reports only the final answer.",
  "body": [
   "Stream Gatherers were finalized in Java 24. They add one new intermediate operation, `Stream.gather(Gatherer)`, that lets you plug in custom transformations the built-in operations cannot express, such as grouping neighbors into windows or emitting running totals. Where `collect` with a Collector is a flexible terminal operation, `gather` with a Gatherer is a flexible intermediate operation: the stream continues afterwards. Before gatherers, the built-in intermediate operations each did one fixed job, such as filter or map, and anything else required collecting into a list and starting a new stream, or writing loops with mutable variables. A gatherer packages that custom logic as a reusable object, so a pipeline can stay a single chain of operations. The interface `Gatherer` and the factory class `Gatherers` live in the `java.util.stream` package alongside `Collector` and `Collectors`.",
   "A Gatherer can transform elements one to one, one to many, many to one or many to many, can keep state between elements, and can stop early. Internally it is described by up to four functions: an initializer that creates private state, an integrator that receives each element (and may push results downstream), an optional combiner for parallel use, and an optional finisher that can emit final results after the last element. You rarely write one yourself for the exam; you use the built-ins in `java.util.stream.Gatherers`. The integrator is the heart of a gatherer: for each element it can push zero, one or several results to the next stage, and it returns a boolean that says whether it wants more input. Returning false is how a gatherer short-circuits, much as `limit` stops a stream early. State created by the initializer is private to the gatherer, which is what lets it remember neighbors or running totals safely instead of relying on outside mutable variables.",
   "`Gatherers.windowFixed(n)` groups elements into consecutive, non-overlapping lists of size n; the last list may be shorter. `Stream.of(1,2,3,4,5).gather(Gatherers.windowFixed(2))` produces [1, 2], [3, 4], [5]. `Gatherers.windowSliding(n)` produces overlapping windows that move one element at a time: `windowSliding(3)` over 1..5 gives [1, 2, 3], [2, 3, 4], [3, 4, 5]. If the stream has fewer elements than n, windowSliding emits one window containing them all. Both result in a `Stream<List<T>>`, and a window size below 1 throws `IllegalArgumentException`. Window sizes and edge cases are where questions concentrate. With windowFixed, the number of windows is the element count divided by n, rounded up, and only the final window can be short. With windowSliding, every window except the special small-stream case has exactly n elements, and a stream of k elements where k is at least n produces k minus n plus 1 windows. An empty stream produces no windows from either gatherer. Because each window is a List, you will often follow the gather with a map step that processes the window, such as computing its sum or average.",
   "`Gatherers.fold(initial, folder)` is a many-to-one gatherer: it starts from the value the Supplier provides, combines each element in order, and emits a single result at the end, producing a one-element stream. It resembles `reduce`, but it keeps working in the middle of a pipeline and the result type can differ from the element type. `Gatherers.scan(initial, scanner)` is similar but emits every intermediate result, giving a running total. Scan does not emit the initial value itself. The initial value is given as a Supplier, not a plain value, so you write `() -> 0` rather than `0`. Also notice the difference from `reduce`: reduce is a terminal operation that returns its result directly or wrapped in an Optional, while fold is intermediate, so you still need a terminal operation such as `findFirst()` or `toList()` to retrieve the single value. Scan is the natural tool for running balances, cumulative counts and progress totals, where every intermediate step matters.",
   "```java\nStream.of(1, 2, 3, 4)\n      .gather(Gatherers.scan(() -> 0, (acc, x) -> acc + x))\n      .toList();                               // [1, 3, 6, 10]\n\nStream.of(1, 2, 3, 4)\n      .gather(Gatherers.fold(() -> \"\", (acc, x) -> acc + x))\n      .findFirst();                            // Optional[1234]\n\nIntStream.rangeClosed(1, 7).boxed()\n         .gather(Gatherers.windowFixed(3))\n         .toList();                            // [[1, 2, 3], [4, 5, 6], [7]]\n```",
   "Gatherers compose: `g1.andThen(g2)` builds one gatherer from two, and you may call `gather` several times in a pipeline. Note that `gather` is defined on `Stream<T>`, not on IntStream, so call `boxed()` first when starting from a primitive stream. There is also `Gatherers.mapConcurrent(maxConcurrency, mapper)`, which runs a mapping function concurrently on virtual threads while keeping the output in encounter order.",
   "To answer exam questions on gatherers, first confirm the stream is a `Stream<T>` and not a primitive stream, since `gather` exists only on Stream. Next identify the built-in and its output shape: windowFixed and windowSliding produce lists, scan produces one result per input element, and fold produces exactly one result at the end. Then check the arguments: window sizes must be at least 1, and fold and scan take a Supplier for the initial value followed by a function that combines the current state with the next element. Finally, remember that gather is intermediate, so nothing runs until a terminal operation is called, the same laziness rule that governs filter and map."
  ],
  "analogy": "Imagine a conveyor belt of apples passing a worker with a notepad. A regular map step looks at each apple and forgets it. A gatherer worker can write on the notepad. With windowFixed, she packs apples into crates of six and ships each full crate, plus a final partly filled one. With windowSliding, she holds up a frame that always shows the last three apples. With scan, she writes the running count after each apple; with fold, she announces only the final count when the belt stops.",
  "terms": [
   [
    "Gatherer",
    "An object describing a custom intermediate stream operation through an initializer, integrator, combiner and finisher."
   ],
   [
    "windowFixed",
    "A built-in gatherer that groups elements into non-overlapping lists of a fixed size, with a possibly shorter last list."
   ],
   [
    "windowSliding",
    "A built-in gatherer that emits overlapping lists of a fixed size, advancing one element at a time."
   ],
   [
    "fold",
    "A built-in gatherer that combines all elements into a single result emitted when the stream ends."
   ],
   [
    "scan",
    "A built-in gatherer that emits the running result after each element, like a cumulative sum."
   ],
   [
    "Integrator",
    "The required part of a gatherer that receives each element, may push results downstream, and returns whether it wants more input."
   ],
   [
    "Gatherers.mapConcurrent",
    "A built-in gatherer that runs a mapping function concurrently on virtual threads, up to a limit, while preserving encounter order."
   ]
  ],
  "example": "A monitoring job computes a three-reading moving average of CPU samples with gather(Gatherers.windowSliding(3)).map(w -> average(w)), and sends metrics to a server in batches of 100 using gather(Gatherers.windowFixed(100)).",
  "mistakes": [
   [
    "gather is a terminal operation like collect.",
    "gather is intermediate and returns a new Stream, so a terminal operation is still needed."
   ],
   [
    "scan emits the initial value first, then the running results.",
    "scan does not emit the initial value by itself; for inputs 1, 2, 3 with initial 0 and addition, it emits 1, 3, 6."
   ],
   [
    "windowSliding(3) on four elements produces two windows, the second one short.",
    "Sliding windows overlap and are all full size: [1, 2, 3] and [2, 3, 4]. Only windowFixed can produce a short last window."
   ],
   [
    "You can call gather directly on an IntStream.",
    "gather is defined only on Stream<T>. Call boxed() first to get a Stream<Integer>."
   ]
  ],
  "tryit": [
   [
    "A bank statement needs a running balance after each transaction, starting from an opening balance of 500, and the result should still be a stream that is later mapped to display lines. Which gatherer do you choose, and how is it written?",
    "Gatherers.scan(() -> 500, (balance, tx) -> balance + tx.amount()). It emits one running balance per transaction and keeps the pipeline going, while fold would emit only the final balance."
   ],
   [
    "A telemetry service must upload readings in groups of 25 to reduce network calls, and any leftover readings at the end must still be uploaded. Which gatherer fits?",
    "Gatherers.windowFixed(25). It produces non-overlapping lists of 25, and the last list holds whatever readings remain, so nothing is dropped."
   ]
  ],
  "tip": "Distinguish fold from scan by output size: fold emits one element at the end, scan emits one per input element. For windows, fixed does not overlap and its last window can be short; sliding overlaps.",
  "check": [
   [
    "What does Stream.of(\"a\",\"b\",\"c\",\"d\",\"e\").gather(Gatherers.windowFixed(2)).toList() produce?",
    "[[a, b], [c, d], [e]]."
   ],
   [
    "What does scan(() -> 10, (a, x) -> a + x) emit for elements 1 and 2?",
    "11 and then 13; the initial value 10 is not emitted by itself."
   ],
   [
    "Is gather an intermediate or terminal operation?",
    "Intermediate: it returns a new Stream, so a terminal operation is still needed."
   ],
   [
    "What does Stream.of(1, 2, 3, 4).gather(Gatherers.windowSliding(2)).toList() produce?",
    "[[1, 2], [2, 3], [3, 4]]: three overlapping windows of size 2."
   ]
  ]
 },
 {
  "t": "Parallel streams and why stateful lambdas cause problems",
  "hook": "It is Thursday afternoon at Tidewater Freight, and Priya on the reporting team is proud of herself. She changed one word, `stream()` to `parallelStream()`, and the nightly shipment report now finishes in a third of the time. Then the operations manager calls. Last night's report listed 9,987 shipments. The warehouse scanned exactly 10,000. Priya reruns it and gets 10,000. She runs it again and gets 9,994. Nothing in the data changed, and the code has no obvious bug. The only thing she touched was one word. How can the same code, on the same input, give a different answer every time it runs?",
  "simple": "A normal stream works like one person going through a stack of papers, one sheet at a time. A parallel stream splits the stack among several helpers who all work at the same moment, then puts their results together. That is faster for big jobs, but it causes trouble if the helpers all try to write on the same shared notepad at once: they bump into each other and some notes get lost. The safe way is to give each helper their own notepad and combine the notepads at the end. In Java, that means letting the stream collect the results for you, with something like `toList()`, instead of having your code add items to one shared list.",
  "body": [
   "A parallel stream splits its source into chunks, processes those chunks on several threads at the same time, and then combines the partial results. You get one by calling `parallelStream()` on a collection, or `parallel()` on an existing stream. Calling `sequential()` switches back, and `isParallel()` reports the current mode. The important detail for the exam is that a whole pipeline has exactly one mode: it is not possible to make the `filter` step parallel and the `map` step sequential. Whichever of `parallel()` or `sequential()` is called last before the terminal operation wins. By default the work runs on threads from the common ForkJoinPool, a shared pool the Java runtime keeps for this kind of divide-and-combine work.",
   "Running on several threads changes which results you can predict. With `forEach` on a parallel stream, elements are processed in whatever order the threads happen to finish, so `List.of(1, 2, 3, 4, 5).parallelStream().forEach(System.out::print)` might print `31542` one time and `34125` the next. If you need encounter order, use `forEachOrdered`, which keeps the order at some cost in speed. The same split appears in the search operations: `findAny` may return any matching element, while `findFirst` still returns the first element in encounter order. Collecting is different from `forEach`: `toList()` and `collect(Collectors.toList())` still produce the elements in encounter order, because each thread builds its own partial list and the stream merges those lists in the right sequence.",
   "Reduction in parallel needs the right building blocks. The accumulator function must be associative, meaning `(a op b) op c` gives the same result as `a op (b op c)`. Addition and multiplication are associative, while subtraction and division are not. The identity value must also be a true identity for that operation, meaning combining it with any value leaves that value unchanged. `reduce(0, Integer::sum)` is correct because adding 0 changes nothing. `reduce(10, Integer::sum)` looks harmless, but in parallel each chunk starts from 10, so the extra 10 is added once per chunk and the answer differs from the sequential result. A non-associative operation such as `reduce(0, (a, b) -> a - b)` produces answers that can vary from run to run.",
   "The deeper problem is the stateful lambda. A lambda is stateful when its behavior depends on, or changes, something outside itself while the stream runs. The classic mistake is adding to a shared `ArrayList` from inside `forEach` or `map`. `ArrayList` is not thread-safe, so when two threads call `add` at the same moment, one write can overwrite the other. You may see missing elements, duplicates, `null` entries, or even an `ArrayIndexOutOfBoundsException` when the internal array grows underneath a thread. Wrapping the list with `Collections.synchronizedList` stops the corruption, but the order of elements becomes unpredictable and the threads now queue up for the lock. Counting with a shared `int[]` slot or a plain `int` field has the same race condition, because `count++` is a read, an add, and a write that other threads can interleave.",
   "```java\nList<Integer> bad = new ArrayList<>();\nIntStream.range(0, 10_000).parallel().forEach(bad::add); // unsafe: size often < 10000\n\nList<Integer> good = IntStream.range(0, 10_000).parallel()\n                              .boxed().toList();         // safe and ordered\n```",
   "The fix is to let the stream do the accumulating. Terminal operations such as `collect`, `toList`, `reduce`, `count` and `sum` are designed for parallel use: each thread gets its own container or running total, and the stream merges them safely at the end. Your lambdas should be stateless and free of side effects. A good self-test is to ask whether the lambda would give the same output for the same input no matter which thread ran it or when. If it reads or writes a field, a shared collection, or an outside counter, the answer is no, and the code is not safe to run in parallel.",
   "Finally, parallel is not automatically faster. Splitting the work, scheduling threads and merging results all cost time. For small data sets, the overhead can make the parallel version slower than the sequential one. Some sources also split poorly: an `ArrayList` or array can be divided cheaply by index, but a `LinkedList` must be walked node by node, and `Stream.iterate` produces each element from the previous one, so neither divides well. Blocking input/output (I/O) inside a parallel stream is another trap, because it ties up threads from the shared common pool that other parallel streams in the same program also depend on.",
   "For exam output questions, sort each terminal operation into one of two groups. Unpredictable in parallel: the order of `forEach`, the element returned by `findAny`, and the result of any `reduce` with a bad identity or a non-associative function. Predictable in parallel: `forEachOrdered`, `findFirst`, `toList()`, `collect` with standard collectors, and `reduce` with a true identity and an associative function. If a question shows a lambda modifying an outside list or counter, assume the result is unreliable."
  ],
  "analogy": "Picture a bank counting a pile of coins with four tellers. If each teller counts their own heap and writes a subtotal on their own slip, the manager adds four slips and gets the right total every time. If instead all four tellers shout numbers at one person keeping a single running tally, some numbers get missed. Collectors and `reduce` are the private slips; a shared `ArrayList` is the single overwhelmed tally keeper. The analogy stops at ordering: real tellers lose the order of coins, but `toList()` still keeps encounter order.",
  "terms": [
   [
    "Parallel stream",
    "A stream whose operations run on multiple threads, by default in the common ForkJoinPool."
   ],
   [
    "forEachOrdered",
    "A terminal operation that processes elements in encounter order even in a parallel stream."
   ],
   [
    "Associative operation",
    "An operation where grouping does not matter, (a op b) op c = a op (b op c), required for correct parallel reduce."
   ],
   [
    "Identity value",
    "The starting value for reduce that leaves any element unchanged when combined with it, such as 0 for addition or 1 for multiplication."
   ],
   [
    "Stateful lambda",
    "A lambda that reads or modifies shared mutable state during stream execution, which is unsafe in parallel."
   ],
   [
    "Common ForkJoinPool",
    "The shared thread pool that parallel streams use by default."
   ]
  ],
  "example": "A developer speeds up a report by switching to parallelStream() but keeps results.add(row) inside forEach. The report sometimes shows 9,987 rows instead of 10,000. Replacing the side effect with .map(this::toRow).toList() fixes both the missing rows and the ordering.",
  "mistakes": [
   [
    "Thinking toList() or Collectors.toList() returns elements in random order on a parallel stream.",
    "Collecting keeps encounter order. Each thread builds its own partial result and the partial results are merged in sequence. Only forEach and findAny are unordered."
   ],
   [
    "Believing you can make part of a pipeline parallel and the rest sequential.",
    "A stream has a single mode. The last parallel() or sequential() call before the terminal operation applies to the whole pipeline."
   ],
   [
    "Assuming reduce(10, Integer::sum) just adds 10 to the total in parallel too.",
    "In parallel the identity is used once per chunk, so 10 may be added several times. The identity must be a true identity, such as 0 for addition."
   ],
   [
    "Picking parallel streams as the automatic answer for better performance.",
    "Small data, poorly splitting sources such as LinkedList or Stream.iterate, and blocking I/O can all make a parallel stream slower than a sequential one."
   ]
  ],
  "tryit": [
   [
    "Marcus has a parallel stream over 50,000 order IDs. Inside map, he increments a shared int field called processed so he can log progress, then he collects the results with toList(). The list is always complete, but the logged count is sometimes 49,912. Should he switch to forEachOrdered, or fix something else?",
    "Fix the counter. The toList() result is safe because the stream manages it. The shared field is a stateful side effect: processed++ is not atomic, so increments from different threads are lost. Use the list's size, or count() in a separate pipeline, rather than a hand-maintained counter. forEachOrdered would not repair the race in map."
   ]
  ],
  "tip": "For output questions on parallel streams, forEach order is unpredictable, findAny is unpredictable, but collect/toList keep encounter order. A reduce with a non-identity starting value gives a different result in parallel.",
  "check": [
   [
    "Why might List.of(1,2,3).parallelStream().forEach(System.out::print) not print 123?",
    "forEach on a parallel stream does not guarantee encounter order; forEachOrdered would."
   ],
   [
    "Is reduce(0, (a, b) -> a - b) safe for a parallel stream?",
    "No. Subtraction is not associative, so splitting the work can produce a different result."
   ],
   [
    "What is the safe replacement for adding to a shared ArrayList inside forEach?",
    "Use a collecting terminal operation such as toList() or collect(Collectors.toList())."
   ],
   [
    "A pipeline calls parallel(), then filter, then sequential(), then map, then toList(). How does it run?",
    "Entirely sequentially, because the last mode call before the terminal operation was sequential()."
   ]
  ]
 },
 {
  "t": "Module-info.java: module, requires, requires transitive, exports, opens",
  "hook": "Your first code review at Copperline Insurance comes back with one comment on a file you barely noticed: `module-info.java`. You had exported every package in the claims module, including `com.copperline.claims.internal`, because the build kept failing until you did. The senior developer, Ana, writes: \"Now every team in the company can call our internal classes, and we can never change them without breaking someone.\" She also points out that the persistence framework still fails at startup, complaining it cannot reach private fields, even though the entity package is exported. Exported should mean accessible, right? So why is the framework still locked out, and what should this file really say?",
  "simple": "A Java module is a named bundle of code that states two things up front: which other bundles it needs, and which of its own folders (packages) other people may use. That statement lives in a small file called `module-info.java`. Think of an apartment building's front desk list. `requires` is the list of buildings you are allowed to visit. `exports` is the list of your rooms that visitors may enter through the front door. `opens` is different: it lets a trusted inspector come in at run time and look inside the locked drawers too, which is what some tools need. Anything not listed stays private, even if it looks public inside the building.",
  "body": [
   "The Java Platform Module System (JPMS), introduced in Java 9, groups packages into named modules with explicit dependencies and an explicit public application programming interface (API). A module is described by a file named `module-info.java`, placed at the root of the module's source folder next to the top-level package directories. It compiles to `module-info.class`. The module name usually follows reverse-domain style, such as `com.shop.orders`, and it must be unique among the modules the Java Virtual Machine (JVM) can see on the module path. Here is a declaration that uses every directive this lesson covers.",
   "```java\nmodule com.shop.orders {\n    requires java.sql;\n    requires transitive com.shop.model;\n    exports com.shop.orders.api;\n    exports com.shop.orders.spi to com.shop.plugins;\n    opens com.shop.orders.entity;\n}\n```",
   "Start with dependencies. `requires M` says this module depends on module M and can read the packages M exports. Every module implicitly requires `java.base`, the module that contains `java.lang`, `java.util` and other core packages, so you never need to write that line. `requires transitive M` does the same and also passes the dependency on: any module that requires this module automatically reads M as well. This is called implied readability. Use it when your exported API exposes M's types, for example when a public method in `com.shop.orders.api` returns an `Order` class that lives in `com.shop.model`. Without `transitive`, every caller would have to add its own `requires com.shop.model` just to use your return type. A third form, `requires static M`, means M is needed at compile time but is optional at run time, which suits annotations or optional integrations.",
   "Next comes visibility. `exports P` makes the public types in package P accessible to other modules, at both compile time and run time. Packages that are not exported are strongly encapsulated: even their public classes cannot be used from outside the module, and the compiler will report that the package is not visible. `exports P to M1, M2` is a qualified export that grants access only to the listed modules, which is useful for a service provider interface meant for one partner module. Exports work on packages, never on individual classes, and they do not cascade to subpackages. Exporting `com.shop` does not export `com.shop.util`; each package must be listed separately.",
   "Reflection is handled separately, and this is where many learners get caught. An exported package allows normal compile-time and run-time access to public members. Deep reflection, such as a framework calling `setAccessible(true)` on a private field to fill it from a database row, needs more: the package must be opened. `opens P` grants run-time-only reflective access to all members, including private ones, but no compile-time access. A package can be opened without being exported, which is exactly what you want for entity classes that only a framework touches. `opens P to M` limits the reflective access to specific modules. Declaring `open module X { ... }` opens every package in the module at once, and inside an open module you cannot also write individual `opens` statements, because they would be redundant and the compiler rejects them.",
   "Two structural rules are commonly tested. First, the module graph cannot contain cycles among `requires` directives: if A requires B, B may not require A, directly or through other modules. Second, a module may not read two modules that contain the same package. This situation, called a split package, causes an error at compile time or at startup, and it is a common obstacle when migrating old libraries that spread one package across several JAR (Java archive) files.",
   "It helps to think of the directives in pairs. `requires` and `exports` are two sides of ordinary access: one module must require, and the other must export, before code compiles. `exports` and `opens` are two kinds of permission on a package: one for normal use at compile and run time, the other for deep reflection at run time only. When you read a question, identify which kind of access is being attempted. A compile error about a package not being visible points to a missing `exports` or `requires`. An `InaccessibleObjectException` at run time, thrown when a framework tries `setAccessible(true)`, points to a missing `opens`.",
   "The remaining directives, `uses` and `provides ... with`, deal with services, Java's built-in plug-in mechanism, and are covered in the next lesson. For now, remember the overall goal of these five keywords: reliable configuration, because missing dependencies are found before any code runs, and strong encapsulation, because only what you deliberately expose can be used by anyone else."
  ],
  "analogy": "Think of a module as an office building. `requires` is your visitor badge for other buildings. `exports` is the public lobby: anyone with a badge can walk in and use what is there. `opens` is a key you give a building inspector, who may enter any room, including locked offices, but only during an inspection, never to move in. `requires transitive` is a badge that automatically comes with a guest pass for a partner building. The analogy stops at subpackages: a lobby key in real life might open adjoining rooms, but `exports com.shop` never covers `com.shop.util`.",
  "mnemonic": "The five keywords in this lesson answer three questions. Who am I (`module`)? Whom do I read (`requires`, `requires transitive`)? Who may see me (`exports` for normal access at compile and run time, `opens` for reflection at run time)? Think: name, needs, offers.",
  "terms": [
   [
    "module-info.java",
    "The module declaration file at the root of a module's sources, naming the module and its directives."
   ],
   [
    "requires transitive",
    "Declares a dependency and makes it readable to every module that requires this module (implied readability)."
   ],
   [
    "requires static",
    "Declares a dependency needed at compile time but optional at run time."
   ],
   [
    "exports",
    "Makes a package's public types accessible to other modules; optionally limited with a to clause."
   ],
   [
    "opens",
    "Allows runtime deep reflection, including private members, on a package without granting compile-time access."
   ],
   [
    "Strong encapsulation",
    "The rule that non-exported packages are inaccessible to other modules even if their classes are public."
   ],
   [
    "Split package",
    "The same package appearing in two modules read by one module, which is an error."
   ]
  ],
  "example": "An orders module exposes com.shop.orders.api for other teams, keeps com.shop.orders.internal hidden by not exporting it, and opens com.shop.orders.entity so a persistence framework can reflectively set private fields on its entity classes.",
  "mistakes": [
   [
    "Believing that exports also allows reflection on private fields.",
    "exports grants access to public types only. Deep reflection on private members requires opens (or an open module)."
   ],
   [
    "Thinking exporting com.shop also exports com.shop.util.",
    "Exports apply to exactly one package. Subpackages must each be exported separately."
   ],
   [
    "Writing requires java.base, or choosing an answer that says it is required.",
    "java.base is implicitly required by every module. Writing it is allowed but never necessary."
   ],
   [
    "Using plain requires when your public API returns another module's types.",
    "Callers would then need their own requires for that module. requires transitive gives them implied readability."
   ]
  ],
  "tryit": [
   [
    "Leo's module com.lab.report has a public method that returns a type from com.lab.data. Another team's module requires com.lab.report and gets a compile error saying com.lab.data types are not accessible. Leo already exports com.lab.report.api. Which single change in Leo's module-info fixes this for every caller?",
    "Change requires com.lab.data to requires transitive com.lab.data. That gives every module that reads com.lab.report implied readability of com.lab.data, so callers can use the returned type without adding their own requires."
   ],
   [
    "A team wants a persistence framework to set private fields in com.lab.entity, but no other module should compile against those classes. Should they export the package, open it, or both?",
    "Open it only. opens grants run-time reflective access to all members without compile-time access, which is exactly the requirement. Exporting would let other modules compile against the classes."
   ]
  ],
  "tip": "Exports controls ordinary access and applies at compile and run time; opens controls reflection at run time only. If an exported method's signature uses another module's types, that dependency should be requires transitive.",
  "check": [
   [
    "Module A requires transitive B, and module C requires A. Can C use B's exported types without requiring B?",
    "Yes. requires transitive gives C implied readability of B."
   ],
   [
    "A package is exported but not opened. Can a framework reflectively read its private fields?",
    "No. Deep reflection on private members needs the package to be opened."
   ],
   [
    "Do you need to write requires java.base?",
    "No. Every module requires java.base implicitly."
   ],
   [
    "Can you write opens com.x.entity; inside a module declared as open module?",
    "No. An open module already opens all packages, so individual opens directives are not allowed."
   ]
  ]
 },
 {
  "t": "Services: uses, provides ... with, and ServiceLoader",
  "hook": "At Bluefin Outfitters, the checkout application talks to one card processor. Then finance signs a second processor for international orders, and the checkout lead, Tomas, faces a choice. He could add the new processor's module to the checkout's `requires` list, write an `if` statement, and rebuild and redeploy checkout every time a processor changes. Or he could make checkout not know which processors exist at all, and simply find them when it starts. His teammate shrugs: \"How can code call a class it never names and never imports?\" Java has a built-in answer. Which module declares what, and who does the finding?",
  "simple": "A service is a way to plug new pieces into a program without changing the program. Think of a wall outlet. The outlet shape is agreed in advance, so you can plug in a lamp, a fan or a phone charger, and the wall does not need rewiring for each one. In Java, the outlet shape is an interface. The program that wants to use it says \"I use this kind of plug\" (`uses`). Each add-on says \"I provide this kind of plug, and here is my device\" (`provides ... with`). A helper class called `ServiceLoader` looks around when the program runs and hands back every device it finds plugged in.",
  "body": [
   "A service lets one module use an implementation without knowing, at compile time, which module supplies it. It is Java's built-in plug-in mechanism, and it fits naturally with the Java Platform Module System (JPMS). There are four roles. The service type, usually an interface, lives in an exported package of an API module (API stands for application programming interface). The consumer is the module that wants to use the service. One or more provider modules implement it. Finally, `java.util.ServiceLoader` finds the providers at run time. This keeps the consumer loosely coupled: you can add or remove a provider JAR (Java archive) on the module path without recompiling the consumer.",
   "Each role declares something different in its `module-info.java`. The API module exports the package that contains the interface. The consumer requires the API module and declares `uses` followed by the fully qualified interface name. A provider requires the API module and declares `provides <interface> with <implementation class>`. The implementation class does not need to be in an exported package. In fact, keeping it in a non-exported package is good practice, because then nobody can instantiate it directly or depend on it by name; only the ServiceLoader can reach it. Notice that the consumer never requires the provider module.",
   "```java\n// API module: contains interface PaymentGateway\nmodule com.pay.api { exports com.pay.api; }\n\n// provider\nmodule com.pay.card {\n    requires com.pay.api;\n    provides com.pay.api.PaymentGateway with com.pay.card.internal.CardGateway;\n}\n\n// consumer\nmodule com.shop.app {\n    requires com.pay.api;\n    uses com.pay.api.PaymentGateway;\n}\n```",
   "In the consumer's code, `ServiceLoader.load(PaymentGateway.class)` returns a `ServiceLoader<PaymentGateway>`. It is `Iterable`, so a for-each loop creates and returns each provider instance in turn. When you need only one, `findFirst()` returns an `Optional<PaymentGateway>`, which is empty if no provider is present, so your code should handle that case. For more control, `stream()` returns a `Stream<ServiceLoader.Provider<PaymentGateway>>`. Each `Provider` has `type()`, which returns the implementation's `Class` without creating an object, and `get()`, which creates the instance. That lets you filter providers, for example by an annotation on the class, before paying the cost of constructing any of them.",
   "The provider class has a strict shape requirement. It must have either a public no-argument constructor, or a public static no-argument method named `provider()` that returns an instance of the service type. The `provider()` method is useful when the implementation should be a singleton or needs setup logic that a constructor cannot express cleanly. If neither exists, loading fails with a `ServiceConfigurationError`. The same error is thrown when a consumer in a named module forgets its `uses` directive and calls `ServiceLoader.load` for that service. Providers are located lazily as you iterate, and the loader caches the instances it has created; calling `reload()` clears that cache so new lookups start fresh.",
   "Before modules existed, services already worked on the class path, and that mechanism is still supported. A provider JAR contains a text file at `META-INF/services/` followed by the fully qualified interface name, for example `META-INF/services/com.pay.api.PaymentGateway`, and each line lists an implementation class name. Modular JARs placed on the module path use `provides` instead, and the module system checks those declarations at startup. You may see both in exam answers, so recognize the file-based form as the class path approach.",
   "The exam mostly tests which module declares which directive, so slow down on those questions. `uses` goes in the consumer. `provides ... with` goes in the provider. `exports` of the interface's package goes in whichever module defines the interface. The provider's implementation package does not need to be exported, and the consumer does not require the provider. If an answer choice has the consumer requiring a specific implementation module, or the provider declaring `uses`, it is a distractor.",
   "A short trace of what happens at startup ties the pieces together. When the JVM (Java Virtual Machine) resolves the module graph, it notes that com.shop.app declares `uses com.pay.api.PaymentGateway` and looks for observable modules that declare `provides com.pay.api.PaymentGateway`. Those provider modules are resolved too, even though nothing requires them by name. Later, when the consumer calls `ServiceLoader.load`, the loader already knows which provider classes exist and creates them only as your code asks for them.",
   "The benefit is easy to see in practice. Swapping or adding an implementation becomes a deployment decision rather than a code change. The consumer's code compiles once against the interface, and whatever providers are on the module path at startup are the ones it finds."
  ],
  "analogy": "A service works like a hotel concierge desk. The hotel (consumer) posts a sign saying it offers taxi bookings (`uses`). Taxi companies (providers) register with the concierge, each saying \"we offer taxi rides, ask for us\" (`provides ... with`). Guests never phone a company directly; they ask the concierge (`ServiceLoader`), who lists whoever is registered today. The analogy stops at registration timing: in Java the provider list comes from what is on the module path when the program runs, not from companies calling in during the day.",
  "terms": [
   [
    "Service interface",
    "The type, usually an interface in an exported package, that consumers depend on and providers implement."
   ],
   [
    "uses",
    "A module directive in the consumer declaring that it looks up implementations of a service with ServiceLoader."
   ],
   [
    "provides ... with",
    "A module directive in the provider naming the service interface and the implementation class that supplies it."
   ],
   [
    "ServiceLoader",
    "The class that discovers and instantiates service providers at run time via load, iteration, findFirst or stream."
   ],
   [
    "ServiceLoader.Provider",
    "A handle to a provider that exposes type() without instantiation and get() to create the instance."
   ],
   [
    "ServiceConfigurationError",
    "The error thrown when a service cannot be loaded, such as a missing uses directive or an unusable provider class."
   ]
  ],
  "example": "A photo editor defines an ImageFilter service interface. Each filter ships as its own module that provides ImageFilter with its class. The editor calls ServiceLoader.load(ImageFilter.class).stream() to list available filters in its menu, so a new filter appears simply by dropping its JAR on the module path.",
  "mistakes": [
   [
    "Putting uses in the provider module, or provides in the consumer.",
    "uses belongs to the consumer that calls ServiceLoader. provides ... with belongs to the module that contains the implementation."
   ],
   [
    "Exporting the implementation package so ServiceLoader can find it.",
    "The implementation package does not need to be exported. Keeping it unexported hides the class from everyone except the ServiceLoader."
   ],
   [
    "Having the consumer require the provider module.",
    "The consumer requires only the API module. Requiring the provider defeats the loose coupling that services exist to provide."
   ],
   [
    "Expecting findFirst() to throw an exception when no provider exists.",
    "findFirst() returns an empty Optional when no provider is found."
   ]
  ],
  "tryit": [
   [
    "Nadia's consumer module requires com.weather.api and calls ServiceLoader.load(Forecast.class). Two provider JARs are on the module path, each with a correct provides directive, yet her program throws ServiceConfigurationError as soon as load is called. The provider classes have public no-argument constructors. What is the most likely cause?",
    "Her consumer module is missing uses com.weather.api.Forecast in its module-info.java. A named module must declare uses for a service before calling ServiceLoader.load for it; otherwise ServiceConfigurationError is thrown."
   ]
  ],
  "tip": "Keep the directive owners straight: uses goes in the consumer, provides ... with goes in the provider, and the interface's package must be exported by whoever defines it. The implementation's package does not need to be exported.",
  "check": [
   [
    "Which module declares uses com.pay.api.PaymentGateway?",
    "The consumer module that calls ServiceLoader.load(PaymentGateway.class)."
   ],
   [
    "What does ServiceLoader.findFirst() return when no provider is found?",
    "An empty Optional."
   ],
   [
    "What must a provider class have so ServiceLoader can create it?",
    "A public no-argument constructor or a public static provider() method."
   ],
   [
    "How can you inspect a provider's class without creating an instance?",
    "Use stream() and call type() on each ServiceLoader.Provider; get() creates the instance only when needed."
   ]
  ]
 },
 {
  "t": "Module path vs class path, named, automatic and unnamed modules",
  "hook": "Ravi at Kestrel Logistics has spent the morning turning the routing application into a proper module. His `module-info.java` is neat, and the compiler is happy with his own code. But the application depends on an old CSV parsing library that has never heard of modules, and he cannot write `requires` for something that is just sitting on the class path. A colleague says, \"Move the JAR to the module path and it becomes a module.\" Another says, \"No, class path code can never be required by a module.\" Both sound confident. Who is right, and what decides how Java treats a JAR?",
  "simple": "Java can look for code in two lists. The old list, the class path, is like a big unsorted box of tools: Java grabs whatever it finds by name and does not check who needs what. The newer list, the module path, is like a labeled toolbox where every tool says what it needs and what it shares, and Java checks everything before starting. Where you put a library decides how it is treated. A library with a label (a module descriptor) on the module path is a full module. A library without a label on the module path gets an automatic label made from its file name. Everything in the unsorted box is lumped together as one nameless group.",
  "body": [
   "Java has two ways to tell the Java Virtual Machine (JVM) where your code and libraries are. The class path, set with `-cp`, `-classpath` or `--class-path`, is the traditional flat list of directories and JAR (Java archive) files. The JVM searches it for classes by name, in order, with no concept of dependencies or encapsulation; if a class is missing, you learn about it only when the code first needs it. The module path, set with `-p` or `--module-path`, holds modules. The JVM reads each module's descriptor, checks that every `requires` is satisfied before the program starts, and enforces exports. The key insight for the exam is that the same JAR can be treated as three different kinds of module depending on where you put it and whether it contains `module-info.class`.",
   "A named module, also called an explicit module, is a JAR or directory that contains `module-info.class` and is placed on the module path. It reads only the modules it requires, plus `java.base`, and exposes only the packages it exports. This is the fully modular case, with strong encapsulation and reliable configuration. If a required module is missing, the JVM refuses to start and names the missing module, rather than failing later with a `NoClassDefFoundError` deep inside a request.",
   "An automatic module is a plain JAR, one without `module-info.class`, placed on the module path. Automatic modules exist so modular code can depend on libraries that have not been modularized yet. The module's name comes from the `Automatic-Module-Name` attribute in the JAR's `META-INF/MANIFEST.MF` file if present. Otherwise the name is derived from the file name: drop the `.jar` extension and any trailing version number, then replace characters such as hyphens with dots. So `commons-text-1.10.jar` becomes `commons.text`. Because an automatic module has no descriptor, Java makes generous assumptions: it exports and opens all of its packages, and it reads every other module, including the unnamed module. That last point makes automatic modules a bridge between the two worlds.",
   "The unnamed module holds everything loaded from the class path. There is one unnamed module per class loader. It reads all modules and exports all of its packages, so existing class path code keeps working on modern Java. However, a named module cannot declare `requires` on the unnamed module, because it has no name to write. This is the key asymmetry. Class path code can use modular code, as long as the modules it needs are resolved. Modular code can reach class path code only indirectly, by turning the library into an automatic module on the module path.",
   "```text\n                      module-info?   Where         Exports          Can be required?\nNamed (explicit)      yes            module path   declared only    yes, by its name\nAutomatic             no             module path   all packages     yes, by derived name\nUnnamed               either         class path    all packages     no\n```",
   "Placement can also cancel a descriptor. A modular JAR placed on the class path is treated as part of the unnamed module, and its `module-info.class` is simply ignored. Its exports, requires and encapsulation rules no longer apply. This flexibility is what allows gradual migration. Teams usually follow one of two strategies. In bottom-up migration, you modularize the libraries with no dependencies first and work upward toward the application. In top-down migration, you make the application a named module first and place its unmodularized dependencies on the module path as automatic modules, converting them later.",
   "A few failure cases appear in exam questions. Two modules on the module path cannot contain the same package; this split package problem prevents startup. A file name that cannot be turned into a valid module name, for example one whose derived segments are not legal Java identifiers, makes that JAR fail to load as an automatic module; adding an `Automatic-Module-Name` manifest entry fixes it. And because automatic module names derived from file names can change when a file is renamed, library authors are encouraged to set `Automatic-Module-Name` so that applications have a stable name to require.",
   "To answer placement questions quickly, ask two things in order. Is the JAR on the module path or the class path? If the class path, it is in the unnamed module, regardless of its contents. If the module path, does it contain `module-info.class`? If yes, it is a named module; if no, it is an automatic module."
  ],
  "analogy": "Think of a conference. Named modules are registered speakers with badges listing exactly which sessions they attend and which rooms they host. Automatic modules are walk-in guests given a badge with a name copied from their ticket; they may wander into any room and their own room is open to all. The unnamed module is the crowded hallway: everyone in it can visit any room, but no speaker can schedule a meeting with \"the hallway\" because it has no name. The analogy stops at counting: there is one hallway per class loader, not per building.",
  "terms": [
   [
    "Class path",
    "The traditional flat list of directories and JARs searched for classes by name, with no dependency checks or encapsulation."
   ],
   [
    "Module path",
    "The list of locations searched for modules, set with --module-path or -p, where module rules are enforced."
   ],
   [
    "Named module",
    "A module with a module-info.class on the module path that reads only what it requires and exposes only what it exports."
   ],
   [
    "Automatic module",
    "A non-modular JAR on the module path; it gets a derived name, exports all packages and reads all modules."
   ],
   [
    "Unnamed module",
    "The module containing all class path code; it reads everything and exports everything but cannot be required."
   ],
   [
    "Automatic-Module-Name",
    "A manifest attribute that sets a stable name for a JAR used as an automatic module."
   ]
  ],
  "example": "A team modularizes its application but depends on a JSON library that has no module-info. By placing the library JAR on the module path, it becomes an automatic module named from its manifest, and the application's module-info can simply say requires that name.",
  "mistakes": [
   [
    "Thinking a modular JAR keeps its encapsulation when placed on the class path.",
    "On the class path, module-info.class is ignored and the JAR's classes join the unnamed module, exporting everything."
   ],
   [
    "Believing an automatic module exports only some packages or reads only some modules.",
    "An automatic module exports and opens all of its packages and reads every other module, including the unnamed module."
   ],
   [
    "Choosing an answer where a named module writes requires for class path code.",
    "The unnamed module has no name and cannot be required. Move the JAR to the module path to make it an automatic module."
   ],
   [
    "Assuming an automatic module name always equals the full file name.",
    "The name comes from Automatic-Module-Name if present; otherwise .jar and the version suffix are dropped and characters such as hyphens become dots."
   ]
  ],
  "tryit": [
   [
    "Elena puts three JARs on the module path: app.jar with module-info.class, report-utils-2.3.jar without one, and a fourth, core.jar with module-info.class, on the class path. Her app module needs code from report-utils and from core. Which requires directives can she write, and which dependency is a problem?",
    "She can write requires report.utils, since report-utils-2.3.jar becomes an automatic module named report.utils. She cannot require core: on the class path its module-info.class is ignored and its classes are in the unnamed module, which cannot be required. Moving core.jar to the module path makes it a named module she can require."
   ]
  ],
  "tip": "Automatic modules come from plain JARs on the module path; the unnamed module comes from anything on the class path. Named modules can require automatic modules but never the unnamed module.",
  "check": [
   [
    "What module type does a JAR without module-info become when placed on the module path?",
    "An automatic module, which exports all its packages and reads all other modules."
   ],
   [
    "Can a named module require code in the unnamed module?",
    "No. The unnamed module has no name, so a requires directive cannot refer to it."
   ],
   [
    "What happens to module-info.class in a modular JAR placed on the class path?",
    "It is ignored; the JAR's classes become part of the unnamed module."
   ],
   [
    "What automatic module name is derived from data-tools-4.1.jar with no Automatic-Module-Name entry?",
    "data.tools, after dropping .jar and the version and replacing the hyphen with a dot."
   ]
  ]
 },
 {
  "t": "Compiling and running modules with javac --module-path and java --module",
  "hook": "It is 6 p.m. at Sandpiper Health, and the release build for the appointment service has failed on the build server. Jordan copies the command from the wiki and runs it locally: `java -d out -m com.appts/com.appts.Main`. Instead of starting the service, Java prints something that looks like a module description and a complaint about a module not being found. Jordan was sure `-d` meant the output folder, since that is what it means when compiling. The deadline is in an hour. What does each short option really mean to each tool, and what is the correct command?",
  "simple": "Building a modular Java program takes two steps. First, the compiler (`javac`) turns your source files into class files and puts them in an output folder. Second, the launcher (`java`) starts your program. Both tools need to know where to find the modules your code depends on, and you tell them with the module path option, `-p`. To start the program you name the module and the class that holds `main`, like an address: building name, then room number, as in `-m com.greet/com.greet.Main`. One catch: some short options mean different things to the two tools, so `-d` is an output folder for the compiler but a describe command for the launcher.",
  "body": [
   "Compiling and running modules uses the same two tools as always, `javac` and `java`, with a few extra options. A typical single-module project keeps its sources in a folder named after the module: `src/com.greet/module-info.java` alongside `src/com.greet/com/greet/Main.java`. You compile with `javac`, pointing `-d` at an output directory and `--module-path` (short form `-p`) at any modules you depend on. You list every source file, including `module-info.java`, because the compiler needs the descriptor to know the module's name, its dependencies and its exports.",
   "```text\njavac -p mods -d out/com.greet src/com.greet/module-info.java src/com.greet/com/greet/Main.java\njava  -p out:mods -m com.greet/com.greet.Main\n```",
   "Running is where the module options really show up. `java --module-path` (or `-p`) lists the directories or JAR (Java archive) files that contain modules, separated by `:` on Linux and macOS and by `;` on Windows. `--module` (short form `-m`) names the module to start and its main class, in the form `moduleName/fully.qualified.MainClass`. If the module's JAR records a main class, which you set with `jar --main-class` when packaging, you can write just `-m com.greet` and the Java Virtual Machine (JVM) looks up the class itself. Anything that appears after the module name is passed to `main` as program arguments, so options for the JVM must come before `-m`.",
   "Watch the short options carefully, because they mean different things in different tools. For `javac`, `-d` is the output directory. For `java`, `-d` is short for `--describe-module`, which prints a module's descriptor: its name, requires, exports, opens and other directives. That explains Jordan's surprising output in the opening scene. Several other launcher options help with diagnosis. `java --list-modules` shows the modules the JDK (Java Development Kit) provides, plus any found on a module path you supply. `java --show-module-resolution` prints how the module graph was built at startup, which is useful when a module you expected is missing. For a packaged file, `jar --describe-module --file app.jar` shows the descriptor stored in the JAR.",
   "Projects with several modules can be compiled in one command. `javac --module-source-path src --module com.greet,com.util -d out` compiles both modules together. The module source path is expected to contain one subdirectory per module, named after that module, and the compiler writes output into matching subdirectories of `out`, such as `out/com.greet` and `out/com.util`. The short form of `--module` for javac is also `-m`, which is why you may see `javac --module-source-path src -m com.greet,com.util -d out` in build scripts. This mode is convenient because the compiler can resolve dependencies between the modules it is building without needing them already compiled.",
   "Modules and the class path can also be combined. Classes still on the class path can be added with `-cp`, and they join the unnamed module. If class path code needs a module that nothing on the module path requires, that module may not be resolved by default; `--add-modules` adds it to the root set so the JVM resolves it at startup. For example, `--add-modules java.sql` makes the SQL module available to class path code that uses it.",
   "Recognizing the common errors is a large part of exam questions on this topic. Running with `-m` but forgetting `-p`, or pointing it at the wrong folder, gives a module not found error before any code runs. A `requires` on a module that is not on the module path fails at compile time, and if you somehow compiled it, fails again at startup. Using a type from a package that the other module does not export fails to compile, with a message saying the package is not visible or is not exported. Each of these checks happens early, before your program does any work, which is the reliable configuration benefit of modules. Compare that with the class path, where a missing library surfaces as a `NoClassDefFoundError` only when some code path finally touches it.",
   "Packaging fits between compiling and running. After compiling into `out/com.greet`, a command such as `jar --create --file mods/com.greet.jar --main-class com.greet.Main -C out/com.greet .` produces a modular JAR whose descriptor records the main class. From then on, `java -p mods -m com.greet` is enough to start the program. The module path accepts either exploded directories of class files or modular JARs, and you can mix both in one path.",
   "To summarize the syntax worth memorizing: compile with `javac -p <deps> -d <outdir> <sources>`, or with `--module-source-path` for many modules, and run with `java -p <paths> -m <module>/<main class>`. Describe a module with `java -p <paths> -d <module>`, and list modules with `java --list-modules`."
  ],
  "analogy": "Running a module is like giving a taxi driver directions in a large office park. The module path (`-p`) is the map of which buildings exist. The `-m` value is the building name followed by the office: `com.greet/com.greet.Main`. If the building has a default reception desk (a main class recorded in the JAR), the building name alone is enough. The analogy stops at the `-d` trap: no taxi driver would hear the same word as \"drop me at the depot\" in one car and \"describe the building\" in another, but `javac` and `java` do exactly that.",
  "terms": [
   [
    "--module-path (-p)",
    "The option for javac and java that lists directories or JARs containing modules."
   ],
   [
    "--module (-m)",
    "The java option that names the module to run, optionally with /MainClass; in javac it names modules to compile."
   ],
   [
    "--describe-module (-d)",
    "A java option that prints a module's descriptor; not the same as javac's -d output directory."
   ],
   [
    "--module-source-path",
    "A javac option for compiling several modules at once from one source tree with a folder per module."
   ],
   [
    "--list-modules",
    "A java option that lists the observable modules and their versions."
   ],
   [
    "--add-modules",
    "An option that adds modules to the root set so they are resolved even if nothing requires them."
   ]
  ],
  "example": "A build script compiles two modules with javac --module-source-path src -m com.greet,com.util -d out, packages each with jar, and a support engineer later runs java -p lib --describe-module com.greet to confirm which packages are exported when an integration fails.",
  "mistakes": [
   [
    "Using java -d to mean an output directory.",
    "For java, -d is --describe-module. Only javac uses -d for the output directory."
   ],
   [
    "Writing -m com.greet.Main or -m com/greet/Main to run a module.",
    "The format is moduleName/fully.qualified.ClassName, for example -m com.greet/com.greet.Main, unless the JAR records a main class."
   ],
   [
    "Placing JVM options after the -m value.",
    "Everything after the module and class name is passed to main as program arguments. JVM options must come before -m."
   ],
   [
    "Leaving module-info.java out of the javac source list.",
    "The descriptor must be compiled with the module's sources; without it the code is not compiled as a named module."
   ]
  ],
  "tryit": [
   [
    "Wei compiled com.inventory into out/com.inventory. It requires com.common, which is packaged as libs/common.jar. On Linux she runs java -m com.inventory/com.inventory.App and gets an error that module com.inventory cannot be found. What should the command be?",
    "java -p out:libs -m com.inventory/com.inventory.App. The module path must include both the compiled module and the folder holding its dependency, separated by a colon on Linux. Without -p the launcher has no module path to search."
   ]
  ],
  "tip": "The run syntax is java -p path -m module/package.Class. Remember -d means output directory for javac but describe-module for java.",
  "check": [
   [
    "What does java -p out -m com.greet/com.greet.Main do?",
    "Starts the JVM with out on the module path and runs the main method of com.greet.Main in module com.greet."
   ],
   [
    "Which command prints a module's requires and exports?",
    "java --describe-module (or -d) with the module path set, or jar --describe-module --file for a JAR."
   ],
   [
    "When can you run a module with just -m com.greet and no class name?",
    "When the module's JAR records a main class, set with jar --main-class when it was packaged."
   ]
  ]
 },
 {
  "t": "Module import declarations (Java 25): import module and ambiguity rules",
  "hook": "Halvorsen Community College runs an after-school Java club, and the volunteer instructor, Dee, loves one Java 25 feature: her sample files start with a single line, `import module java.base;`, and students never fight with import lists. Then a student named Owen decides to open a window for his game and adds `import module java.desktop;`. His imports compile. But the line `List<String> scores = new ArrayList<>();`, which worked yesterday, now refuses to compile, and the error mentions something called an ambiguous reference. Owen did not touch that line. Why would adding an import break code that never changed, and what is the smallest fix?",
  "simple": "Normally you tell Java which classes you plan to use with import lines, one package or one class at a time. Java 25 adds a shortcut: `import module java.base;` brings in every public class from all the packages that module shares, in a single line. It is like saying \"I'll use anything from this whole store\" instead of naming each aisle. The risk is that two stores can sell items with the same name. If you import two modules that both have a class called `List`, Java does not know which one you mean when you write `List`, so it stops and asks. You settle it by naming the exact one you want, for example `import java.util.List;`.",
  "body": [
   "A module import declaration, finalized in Java 25, lets you import an entire module's API (application programming interface) in one line: `import module java.base;`. It imports, on demand, every public top-level class and interface in every package the named module exports. It also includes the packages exported by modules that the named module requires transitively. For example, `java.sql` declares `requires transitive java.xml`, so `import module java.sql;` also makes the types that `java.xml` exports available by their simple names.",
   "The feature is mainly a convenience for small programs, scripts and learners, who would otherwise need a stack of lines such as `import java.util.*;`, `import java.util.function.*;` and `import java.nio.file.*;`. It is important to understand what it does not do. It does not change what code can access, does not add a dependency, and does not affect the module graph. It only changes which simple names are in scope in that one source file. Code in the unnamed module, which means ordinary class path code with no `module-info.java`, can use it. Compact source files, covered in the next lesson, automatically import `java.base` as if they began with `import module java.base;`.",
   "Importing whole modules makes name clashes more likely, because modules export many packages. `java.base` exports `java.util.List`, while `java.desktop` exports `java.awt.List`, a user interface component. With both `import module java.base;` and `import module java.desktop;` in a file, the simple name `List` is ambiguous. Here is the part that exam questions like to test: the import lines themselves compile without complaint. The error is reported only where code actually uses the ambiguous simple name. A file that imports both modules but never writes `List` compiles fine, and you can always sidestep the problem with a fully qualified name such as `java.util.List`.",
   "The standard fix is shadowing, where a more specific declaration hides a broader one. A single-type import such as `import java.util.List;` takes priority over both on-demand package imports and module imports, so it resolves the ambiguity cleanly. In Java 25, an on-demand package import such as `import java.util.*;` also shadows module imports, so it would resolve this particular clash as well. Types declared in the same compilation unit, or in the same package, take precedence over imported ones too. From strongest to weakest, think of the order as: types declared in this file or package, single-type imports, on-demand package imports, and finally module imports.",
   "```java\nimport module java.base;\nimport module java.desktop;\nimport java.util.List;          // resolves the List ambiguity\n\nclass Demo {\n    List<String> names = new ArrayList<>(); // java.util.List\n    Frame window;                           // java.awt.Frame from java.desktop\n}\n```",
   "In the example above, `ArrayList` comes from `java.base` through the module import, and `Frame` comes from `java.desktop`, since neither name clashes. Only `List` needed help. Notice that the fix did not remove either module import; it simply added one more specific import, which is the least disruptive change and usually the expected exam answer.",
   "It is also worth knowing why the feature favors small programs. In a large code base, explicit imports document exactly which types a file depends on, and many teams prefer them for that reason. Module imports trade that precision for brevity. Neither choice changes the compiled behavior: the bytecode refers to fully qualified names regardless of how the source spelled them, so switching between styles is purely a readability decision.",
   "Keep the vocabulary straight, because the exam mixes these keywords on purpose. `import module` is different from `requires` in `module-info.java`. `requires` controls readability between modules and is checked by the module system at compile time and at startup. `import module` only affects name lookup inside one source file. It also differs from `import static`, which brings in static members such as methods and constants, not types. The name after `import module` is a module name like `java.sql`, not a package name, so `import module java.util;` is wrong because `java.util` is a package. Finally, the module you import must be one that the current code can read; in a named module, that means one it requires, directly or through implied readability.",
   "For test questions, work through three checks. Is the name after `import module` really a module? Does any simple name used in the file exist in two imported modules or packages? If so, is there a single-type import, a same-package declaration, or an on-demand package import that shadows the module imports? If not, every use of that simple name is a compile error."
  ],
  "analogy": "A module import is like a library card that lets you borrow from an entire branch instead of one shelf. Borrowing from two branches is fine until you ask the clerk for \"the List\" and both branches have a book by that title; the clerk asks which one you meant. A single-type import is like writing the exact call number on your request, which always wins. The analogy stops at timing: a clerk might reject your card as soon as you show both, but Java objects only when you actually request the ambiguous name.",
  "terms": [
   [
    "Module import declaration",
    "import module M; which imports on demand all public top-level types in packages M exports, including those from its transitive dependencies."
   ],
   [
    "Ambiguous simple name",
    "A type name that two imports provide from different packages; using it without qualification is a compile error."
   ],
   [
    "Shadowing",
    "When a more specific import or declaration hides a name that a broader import would otherwise supply."
   ],
   [
    "Single-type import",
    "An import naming one class, such as import java.util.List;, which takes priority over on-demand and module imports."
   ],
   [
    "On-demand package import",
    "An import ending in .*, such as import java.util.*;, which in Java 25 shadows module imports."
   ]
  ],
  "example": "A teacher's sample program starts with import module java.base; and uses List, Map, Path and LocalDate without further imports. When a student adds import module java.desktop; to draw a window, uses of List stop compiling until the student adds import java.util.List;.",
  "mistakes": [
   [
    "Believing the compile error appears on the import module lines themselves.",
    "The imports compile. The error is reported only where the ambiguous simple name is used."
   ],
   [
    "Thinking import module adds a dependency like requires does.",
    "import module only affects name lookup in one source file. Readability between modules is still controlled by requires."
   ],
   [
    "Writing import module java.util;",
    "java.util is a package, not a module. The correct module is java.base, which exports java.util."
   ],
   [
    "Assuming module imports cover only the module's own packages.",
    "They also include packages exported by modules that the imported module requires transitively, such as java.xml through java.sql."
   ]
  ],
  "tryit": [
   [
    "Sam's file has import module java.base; and import module java.desktop;. It declares a field of type Map and another of type Frame, and never uses List. A classmate says the file cannot compile because List is ambiguous. Is the classmate right?",
    "No. Ambiguity is reported only where the clashing simple name is used. Map comes only from java.base and Frame only from java.desktop, so the file compiles."
   ],
   [
    "Later Sam adds List<String> tags; to the same file. Name two different import lines, either of which would fix the error.",
    "import java.util.List; (a single-type import) or import java.util.*; (an on-demand package import, which shadows module imports in Java 25). Writing java.util.List in the declaration also works."
   ]
  ],
  "tip": "An ambiguity from two module imports is reported only where the simple name is used, and a single-type import fixes it. Also remember module imports bring in types from transitively required modules.",
  "check": [
   [
    "With import module java.base; and import module java.desktop;, does a declaration List<String> x; compile?",
    "No. List is ambiguous between java.util.List and java.awt.List unless a single-type import or qualified name resolves it."
   ],
   [
    "Does import module java.sql; make java.xml's exported types available?",
    "Yes, because java.sql requires java.xml transitively."
   ],
   [
    "Which module does a compact source file import automatically?",
    "java.base."
   ],
   [
    "Does import module change which packages your code is allowed to access?",
    "No. It only puts simple names in scope; access is still governed by exports and requires."
   ]
  ]
 },
 {
  "t": "Compact source files and instance main methods (Java 25), java.lang.IO",
  "hook": "Fernbrook Library's teen coding night is starting in ten minutes, and the volunteer, Mateo, is rewriting his first exercise. Last year the handout opened with `public class Hello { public static void main(String[] args) {`, and half the room spent the first hour asking what `static` and `String[] args` meant. This year he types a file with just `void main() { IO.println(\"Hello\"); }` and nothing else. A fellow volunteer frowns: \"There is no class. There is no static. That cannot be legal Java.\" Mateo runs it and it prints Hello. What exactly did Java 25 change, and what rules still apply to this tiny file?",
  "simple": "For years, the shortest Java program needed a class, a special `public static void main(String[] args)` line, and `System.out.println` just to print one word. Java 25 lets beginners skip most of that. You can write methods and variables directly in a file with no class around them, and Java quietly wraps them in a hidden class for you. The starting method can simply be `void main()`. A new helper called `IO` lets you print with `IO.println` and read a typed line with `IO.readln`. Common tools such as `List` are available without import lines. It is still normal Java: when the program grows, you wrap it in a class and keep going.",
  "body": [
   "Java 25 finalized two features that make small programs much shorter, and the exam expects you to know their rules precisely. The first is instance main methods. Traditionally the program's entry point had to be exactly `public static void main(String[] args)`. Now the launcher also accepts a `main` method that is not static, not public, and has no parameters. The simplest valid program written as a normal class is `class Hello { void main() { System.out.println(\"Hi\"); } }`.",
   "The launcher picks the entry point with a defined protocol. If the class declares or inherits a `main` method with a single `String[]` parameter, that one is chosen. Otherwise the launcher looks for a `main()` method with no parameters. Either way, the method must not be private; public, protected and package access all work, and the return type must be `void`. If the chosen method is static, it is called directly, just as before. If it is an instance method, the launcher first creates an object using the class's non-private no-argument constructor and then calls `main` on that object. If no such constructor exists, for example because the class declares only a constructor that takes a `String`, launching fails with an error.",
   "The second feature is compact source files. A source file may now contain fields and methods that are not enclosed in any class declaration. The compiler wraps them in an implicitly declared class with fixed properties: it is final, it extends `Object`, it lives in the unnamed package, and it has only a default constructor. It cannot implement interfaces or extend another class, because there is no declaration line on which to say so. Its name is derived from the file name, but other code cannot refer to it by that name, so you cannot write `new Greeter()` from another class. A compact source file must contain a launchable `main` method or it does not compile, and it may still declare nested classes, records, interfaces and enums alongside its top-level members.",
   "```java\n// Greeter.java  (a compact source file)\nString greeting = \"Hello\";\n\nString greet(String who) { return greeting + \", \" + who; }\n\nvoid main() {\n    String name = IO.readln(\"Your name: \");\n    IO.println(greet(name));\n    IO.println(List.of(1, 2, 3)); // java.util types available: java.base is imported\n}\n```",
   "Compact source files automatically import the `java.base` module, as if they began with `import module java.base;`. That is why the example can use `List` with no import line, and the same goes for `Map`, `Path`, `LocalDate` and the many other types in packages that `java.base` exports. Ordinary class files do not get this automatic import; they still need explicit imports for anything outside `java.lang`.",
   "The new class `java.lang.IO` supplies simple console methods meant for beginners. `IO.println(obj)` prints a value followed by a line break, `IO.println()` prints just a line break, and `IO.print(obj)` prints without a line break. `IO.readln()` reads one line of input as a `String`, and `IO.readln(prompt)` prints the prompt first and then reads the line. At end of input, both reading methods return `null`. Because `IO` is in `java.lang`, it needs no import in any Java file, compact or not. Its methods are static members of the `IO` class, so you write `IO.println`, not a bare `println`; the methods are not imported statically for you.",
   "These features do not create a separate beginner dialect. A compact source file is ordinary Java. You can compile it with `javac Greeter.java` or run it directly with `java Greeter.java` using source-file mode. It grows into a normal class simply by wrapping the members in `class Greeter { ... }` and adding the import statements it now needs, since the automatic `java.base` import applies only to compact source files.",
   "A few smaller details round out the picture. Top-level fields in a compact source file are instance fields of the implicit class, so they can be used freely from an instance `main`; a static `main` could not use them without an object. The implicit class can still declare static members if you mark them `static`. And because the class is in the unnamed package, a compact source file cannot begin with a `package` declaration.",
   "Exam questions on this topic usually test three things. First, which `main` signatures are launchable: static or instance, with or without `String[]`, but never private, and the `String[]` version wins when both exist. Second, what the implicit class can and cannot do: it is final, in the unnamed package, cannot be named from other code, and needs a `main`. Third, what is available automatically: `java.base` types in compact files, and `IO` everywhere because it is in `java.lang`."
  ],
  "analogy": "A compact source file is like writing a recipe on an index card without the cookbook's cover, table of contents and chapter title. The kitchen (the compiler) slips the card into a plain, unlabeled folder so it still fits on the shelf. You can cook from it perfectly well, but nobody else can cite it as \"chapter 12\" because the folder has no title. The analogy stops at growth: when the recipe becomes a real chapter, you add the cover yourself by wrapping the code in a named class.",
  "terms": [
   [
    "Instance main method",
    "A non-static main method, with or without a String[] parameter, that the launcher calls on a newly created instance."
   ],
   [
    "Launch protocol",
    "The rule that main(String[]) is chosen over main(), that main must not be private, and that an instance main needs a non-private no-argument constructor."
   ],
   [
    "Compact source file",
    "A source file with top-level fields and methods not enclosed in a class, which the compiler wraps in an implicit final class."
   ],
   [
    "Implicitly declared class",
    "The unnamed-package final class the compiler creates for a compact source file; code cannot refer to it by name."
   ],
   [
    "java.lang.IO",
    "A class with static console helpers print, println and readln, available without an import."
   ]
  ],
  "example": "A new developer writes a ten-line Temperature.java with a top-level convert method and void main() that reads input with IO.readln and prints results with IO.println. They run it with java Temperature.java, and later wrap it in a class when it becomes part of a larger project.",
  "mistakes": [
   [
    "Thinking main() is chosen when a class has both main() and main(String[]).",
    "The launcher picks main(String[]) first. main() is used only when no String[] version is declared or inherited."
   ],
   [
    "Believing any main method works, including a private one.",
    "The chosen main must not be private. Public, protected and package access are all allowed."
   ],
   [
    "Writing println(\"Hi\") in a compact source file and expecting it to compile.",
    "IO's methods are static members of IO and are not statically imported. Write IO.println(\"Hi\")."
   ],
   [
    "Assuming another class can create the implicit class with new Greeter().",
    "An implicitly declared class cannot be referenced by name from other code."
   ]
  ],
  "tryit": [
   [
    "Kai writes class Report { Report(String title) { } void main() { IO.println(\"Run\"); } } and tries to launch it with java Report.java. Will it run, and why?",
    "No. main() is an instance method, so the launcher must create a Report object using a non-private no-argument constructor. The only constructor takes a String, and declaring it removes the default constructor, so launching fails. Adding a no-argument constructor or making main static fixes it."
   ],
   [
    "A compact source file named Tally.java declares an int field and a static void main(String[] args) method, plus a void main() method. Which one runs?",
    "main(String[] args). The launch protocol chooses a main with a String[] parameter before a no-parameter main, and static methods are called directly."
   ]
  ],
  "tip": "If a class has both main(String[]) and main(), the String[] version is chosen. A private main is not launchable, and an instance main needs a non-private no-argument constructor.",
  "check": [
   [
    "Is void main() in a regular class a valid entry point in Java 25?",
    "Yes. The launcher creates an instance with the no-argument constructor and calls the instance main method."
   ],
   [
    "Can another class refer to the implicit class created from Greeter.java by the name Greeter?",
    "No. An implicitly declared class cannot be referenced by name from other code."
   ],
   [
    "Do you need import statements for List in a compact source file?",
    "No. Compact source files automatically import the java.base module."
   ],
   [
    "What does IO.readln() return at end of input?",
    "null."
   ]
  ]
 },
 {
  "t": "Launching single-file and multi-file source programs with the java launcher",
  "hook": "Gus runs operations at Marlow Ferries, and he keeps a folder of small Java utilities: one checks certificate expiry dates, another trims old log files. Each time he edits one, he has to remember the `javac` command, where the class files went, and which folder to run from. A teammate, Ines, shows him a trick: `java CheckCerts.java ferry-gateway` runs the utility straight from source, with no class files left behind. Gus is impressed until his checker grows a helper class in another file and package. Will the one-line trick still work when the program is split across files, and what are its limits?",
  "simple": "Usually Java has two steps: compile your code into class files, then run those class files. The `java` command can also do both steps at once, straight from a `.java` source file, keeping the compiled result only in memory. It is like a cook following a recipe directly instead of first writing a clean copy. For tiny programs that saves effort. Newer Java versions go further: if your file uses a class from another `.java` file in a nearby folder, the launcher finds that file and compiles it too. Anything you type after the file name is handed to your program. For big projects you still use proper build tools.",
  "body": [
   "The `java` launcher can run a program directly from source, without a separate `javac` step. Running `java Hello.java arg1 arg2` compiles the file in memory and then runs it, and no `.class` files are written to disk. This source-file mode is intended for small programs, scripts, experiments and learning. The launcher switches into it because the first non-option argument ends in `.java`; if that argument were `Hello` without an extension, the launcher would instead look for a compiled class named `Hello` on the class path.",
   "In the original single-file mode, all of a program's classes had to be in that one file. The class that runs is the first top-level class declared in the file, and it must have a launchable `main` method. The file may declare several top-level classes, and its name does not need to match the name of any class in it, which differs from normal compilation, where a public class must live in a file of the same name. Arguments that follow the file name are passed to `main` in its `String[]` parameter, so `java Hello.java a b` gives `main` an array of two elements, `a` and `b`.",
   "Since Java 22, the launcher also supports multi-file programs. When the launched file refers to a class it does not declare, the launcher looks for a matching `.java` file in the directory tree rooted at the directory containing the launched file, using the usual layout where package names map to folders. It compiles that file on demand. So `java Main.java` works even if `Main` uses `util.Helper`, provided `Helper` is declared with `package util;` in `util/Helper.java`. Only files that are actually needed get compiled, and they are compiled when first referenced. One consequence matters for troubleshooting: a compile error in a helper file may appear only when the program first reaches the code that uses that class, not at the very start.",
   "```text\nproject/\n  Main.java            (uses util.Helper)\n  util/Helper.java     (package util;)\n\n$ cd project\n$ java Main.java hello         # compiles Main, then Helper on demand, then runs\n$ java -cp 'lib/*' Main.java   # add library JARs to the class path\n```",
   "Several options make source mode more useful. `--class-path` (or `-cp`) adds library JAR (Java archive) files, and the source program can use their classes just like compiled code would. `--source N` tells the in-memory compiler which language version to use. It is optional for normal `.java` files, but it is required when the file name does not end in `.java`, because without the extension the launcher has no other way to know the file is source code. Ordering also matters: options for the launcher and compiler go before the file name, and anything after the file name goes to the program as arguments. Putting `--source 25` after the file name, for example, would pass it to `main` rather than to the compiler.",
   "That `--source` rule enables shebang scripts on Linux and macOS. A shebang file is an executable text file whose first line starts with `#!` followed by the path to an interpreter, so the operating system knows what program should run it. A Java script might begin with `#!/path/to/java --source 25`, be saved without the `.java` extension, and be marked executable. Running it directly starts the launcher, which ignores that first line and compiles the rest. This lets small Java tools behave like shell scripts.",
   "Know the limits, since exam answers often test them. Source mode is not a build tool. There is no incremental compilation, so every run compiles the needed files again. There is no packaging into a JAR, and annotation processing is disabled. Class files are never left on disk, which also means nothing else can reuse the compiled result. For anything larger than a small program or utility, you move to `javac`, `jar`, and a build system.",
   "Source mode pairs naturally with the Java 25 beginner features from the previous lesson. With compact source files and instance main methods, a learner can create `Hello.java` containing only `void main() { IO.println(\"Hello\"); }` and run it with `java Hello.java`, with no class declaration, no compile step and no import lines. When the exercise grows across several files, multi-file source mode keeps that same single command working."
  ],
  "analogy": "Source-file mode is like a theater rehearsal read straight from the script, with no printed programs and no set built. The cast reads the main scene, and when a line mentions a character from another scene, someone fetches that page from the binder, filed by act and scene, and reads it on the spot. Nothing is kept afterward. The analogy stops at errors: in a rehearsal you would notice a torn page before starting, but in multi-file mode a broken helper file is only discovered when its class is first needed.",
  "terms": [
   [
    "Source-file mode",
    "Running java with a .java file name so the launcher compiles the source in memory and runs it without writing class files."
   ],
   [
    "Multi-file source program",
    "A source-mode program whose other classes are found as .java files under the launched file's directory and compiled on demand."
   ],
   [
    "--source",
    "A launcher option setting the language version for source mode; required for files that do not end in .java."
   ],
   [
    "Shebang file",
    "An executable script whose first line starts with #! and names the java launcher, run directly by the operating system."
   ],
   [
    "Program arguments",
    "Values written after the source file name, passed to main rather than to the launcher."
   ]
  ],
  "example": "An operations engineer keeps a CheckCerts.java utility in a tools folder with a helper class in tools/net/Tls.java. Running java CheckCerts.java ferry-gateway compiles both in memory and runs the check, with no build setup and no class files left behind.",
  "mistakes": [
   [
    "Expecting java Hello.java to leave Hello.class on disk.",
    "Source-file mode compiles only in memory; no class files are written."
   ],
   [
    "Assuming the class matching the file name always runs.",
    "The first top-level class declared in the file is launched, and it must have a launchable main method."
   ],
   [
    "Placing launcher options such as -cp or --source after the file name.",
    "Everything after the file name is passed to the program as arguments. Launcher options must come before it."
   ],
   [
    "Thinking every helper file is compiled at startup in multi-file mode.",
    "Helper files are found and compiled on demand when first referenced, so a helper's compile error may appear later in the run."
   ]
  ],
  "tryit": [
   [
    "Rosa saves a small Java utility as a file called cleanup with no extension, makes its first line #!/usr/local/jdk/bin/java, marks it executable, and runs ./cleanup. The launcher does not treat it as source code. What is missing?",
    "The --source option on the shebang line, for example #!/usr/local/jdk/bin/java --source 25. Because the file name does not end in .java, the launcher needs --source to know it should compile the file in source mode."
   ]
  ],
  "tip": "In source mode the first top-level class in the file is launched, arguments after the file name go to main, and no class files are produced. Multi-file support finds other classes as source files by package directory.",
  "check": [
   [
    "Does java Hello.java create Hello.class on disk?",
    "No. Source-file mode compiles in memory only."
   ],
   [
    "If Hello.java declares class A first and class Hello second, which runs?",
    "Class A, the first top-level class in the file, provided it has a launchable main method."
   ],
   [
    "When is --source required?",
    "When the source file name does not end in .java, as in a shebang script."
   ],
   [
    "Main.java uses data.Store. Where does the multi-file launcher look for it?",
    "For data/Store.java in the directory tree rooted at the folder containing Main.java."
   ]
  ]
 },
 {
  "t": "JDK tools: jar, jdeps, jlink",
  "hook": "The platform team at Juniper Valley Water wants to retire an old billing service's oversized container image. Lena, the developer who inherited it, is asked three questions in one meeting. Does the service still use internal JDK classes that newer Java versions block? Which modules does it really need? And can it ship with a runtime that contains only those modules instead of the full JDK? She knows the answers are somewhere in the `bin` folder of the JDK she already has installed, but she is not sure which tool does what. Which three tools should she reach for, and in what order?",
  "simple": "The Java Development Kit (JDK) comes with small command-line helpers. Three of them handle packaging. `jar` is like a zip tool for Java: it bundles your compiled classes into one file and can note which class starts the program. `jdeps` is like an inspector: it reads your compiled code and reports what other code it depends on, including risky use of Java's private internals. `jlink` is like a custom moving box: it builds a trimmed-down copy of Java that holds only the parts your program needs, so it is smaller and quicker to start. One rule to remember: `jlink` only works with code that is packaged as proper named modules.",
  "body": [
   "The JDK (Java Development Kit) ships command-line tools that the exam expects you to recognize by purpose and by their key options. Three matter most for packaging and deployment. `jar` builds and inspects archives, `jdeps` analyzes dependencies, and `jlink` builds a custom runtime image containing only the modules an application needs. Each has a distinct job, and a migration project typically uses all three together.",
   "`jar` works much like the classic `tar` archiving tool, and its short options follow the same pattern. `jar --create --file app.jar -C classes .` (short form `jar -cf app.jar -C classes .`) packages the contents of the `classes` directory into a JAR (Java archive). The `-C dir` option changes into that directory before adding files, so the archive does not contain the `classes/` prefix in its paths. `--main-class` (short form `-e`) records the entry point in the manifest, so `java -jar app.jar` can start the program; for a modular JAR it also records the main class in the module descriptor, which is what lets you run `java -p mods -m com.app` without naming a class. The other common operations are `-t` to list contents, as in `jar -tf app.jar` or `jar --list --file app.jar`, `-x` to extract, `-u` to update an existing archive, and `-v` for verbose output. `jar --describe-module --file app.jar` shows a modular JAR's descriptor. Every JAR's metadata lives in the manifest file at `META-INF/MANIFEST.MF`, which holds entries such as `Main-Class`.",
   "`jdeps` reads class files or JARs and reports what they depend on, at the package or module level. Running `jdeps app.jar` lists package dependencies. `-s` (or `-summary`) prints a short module-level summary. `--list-deps` lists the modules the code needs, and `--print-module-deps` prints the same information as a comma-separated list designed to paste into jlink's `--add-modules` option. Two options are especially useful during migration. `--jdk-internals` finds uses of internal JDK application programming interfaces (APIs) that strong encapsulation will block, along with suggested replacements where they exist. `--generate-module-info` can draft a `module-info.java` for a plain JAR as a starting point for modularizing it.",
   "```text\njar  --create --file mods/app.jar --main-class com.app.Main -C out/com.app .\njdeps -s mods/app.jar\njdeps --jdk-internals legacy.jar\njlink --module-path mods --add-modules com.app \\\n      --output build/runtime --launcher app=com.app/com.app.Main \\\n      --strip-debug --no-header-files --no-man-pages\nbuild/runtime/bin/app\n```",
   "`jlink` links a set of modules and all of their transitive dependencies into a standalone runtime image. The result is a directory with its own `bin/java`, its own libraries, and only the modules that were needed. `--module-path` points to your application's modules; current JDKs find their own platform modules automatically, so you do not usually have to list them. `--add-modules` names the root modules, and jlink pulls in everything they require. `--output` names the destination directory, which must not already exist; jlink refuses to overwrite it. `--launcher name=module/mainclass` creates a small script in the image's `bin` folder that starts the application, so users can type `build/runtime/bin/app`. Size-reduction options include `--strip-debug`, `--no-header-files`, `--no-man-pages` and `--compress`.",
   "jlink has one hard requirement that the exam likes to test: it works only with explicit named modules. It cannot link automatic modules, and it cannot include class path JARs. An application with non-modular dependencies must either modularize them, for example by adding a `module-info.java` drafted with `jdeps --generate-module-info`, or use a different packaging approach. The payoff for meeting that requirement is a smaller runtime, faster startup, and a reduced attack surface, because modules the application never uses are simply absent and therefore never need patching. Running `bin/java --list-modules` inside the finished image shows exactly what was included.",
   "A few reading tips help with exam questions that show commands. In `jar` commands, `-f` always introduces the archive file name, so `-cf app.jar` means create that file and `-tf app.jar` means list it. In `jlink` commands, look for the three required pieces: where the modules are (`--module-path`), which modules to start from (`--add-modules`), and where to write the image (`--output`). If any answer choice includes a class path option for jlink, treat it with suspicion, because jlink has no use for the class path.",
   "Putting the tools together gives a typical migration path. First, run `jdeps --jdk-internals` on the existing JARs to find code that will break under strong encapsulation, and fix it. Next, use `jdeps --print-module-deps` to learn which platform modules the application uses. Then package the application as modular JARs with `jar`, recording the main class. Finally, run `jlink` with those modules to produce a runtime image for deployment, often inside a container."
  ],
  "analogy": "Think of moving house. `jar` is packing your belongings into labeled boxes, with a note on top saying which box to open first. `jdeps` is the inventory clerk who lists what each box depends on and flags anything borrowed from the landlord that you are not allowed to take. `jlink` is the moving company that builds a custom truck holding only the boxes you need plus the furniture they require. The analogy stops at unlabeled boxes: a real mover would take them anyway, but jlink refuses anything that is not a named module.",
  "mnemonic": "Package, probe, prune: jar packages the classes, jdeps probes the dependencies, and jlink prunes the runtime down to only the modules the application needs.",
  "terms": [
   [
    "jar",
    "The JDK tool that creates, lists, extracts and updates JAR archives and can record a main class."
   ],
   [
    "jdeps",
    "The JDK dependency analyzer that reports package and module dependencies and internal API use."
   ],
   [
    "jlink",
    "The JDK tool that assembles named modules and their dependencies into a custom runtime image."
   ],
   [
    "Runtime image",
    "A self-contained directory with a JVM and only the modules an application needs."
   ],
   [
    "Manifest",
    "The META-INF/MANIFEST.MF file inside a JAR holding metadata such as Main-Class."
   ],
   [
    "--print-module-deps",
    "A jdeps option that prints the required modules as a comma-separated list suitable for jlink --add-modules."
   ]
  ],
  "example": "Before upgrading an old service, a team runs jdeps --jdk-internals on its JARs and finds calls to an internal JDK class. After replacing them and modularizing, they use jlink to build a trimmed runtime for their container image, which starts faster and ships fewer modules to patch.",
  "mistakes": [
   [
    "Believing jlink can include automatic modules or class path JARs.",
    "jlink works only with explicit named modules. Non-modular dependencies must be modularized first."
   ],
   [
    "Using jar -x to list a JAR's contents.",
    "-x extracts files. -t lists them, as in jar -tf app.jar."
   ],
   [
    "Expecting jlink to overwrite an existing output directory.",
    "The --output directory must not already exist; jlink fails if it does."
   ],
   [
    "Mixing up jdeps and jlink because both deal with modules.",
    "jdeps only analyzes and reports dependencies. jlink builds a runtime image."
   ]
  ],
  "tryit": [
   [
    "Omar's service is one modular JAR, com.ledger, plus a third-party library JAR with no module-info that he placed on the module path. His jlink command fails. What is the cause, and what are his options?",
    "The library is an automatic module, and jlink cannot link automatic modules. He can modularize the library by adding a module-info (jdeps --generate-module-info can draft one), replace it with a modular version, or package the application without jlink."
   ],
   [
    "Before running jlink, Omar wants a list of the platform modules his JAR uses, ready to paste into --add-modules. Which tool and option should he use?",
    "jdeps --print-module-deps on the JAR, which prints a comma-separated module list in the format jlink expects."
   ]
  ],
  "tip": "Match tool to job: jar packages, jdeps analyzes, jlink builds a runtime. jlink works only with named modules, never automatic modules or the class path.",
  "check": [
   [
    "Which option lists the contents of a JAR?",
    "-t, typically jar -tf app.jar (or jar --list --file app.jar)."
   ],
   [
    "Which jdeps option finds uses of internal JDK APIs?",
    "--jdk-internals."
   ],
   [
    "Can jlink include a plain JAR placed on the module path as an automatic module?",
    "No. jlink only links explicit named modules."
   ],
   [
    "What does jar's -e (--main-class) option do?",
    "It records the entry point class in the manifest, and for a modular JAR in the module descriptor, so the program can be started without naming the class."
   ]
  ]
 },
 {
  "t": "Creating threads with Runnable, Thread, and the Thread.Builder API",
  "hook": "Customers of Bramble Books are complaining that the desktop catalog app freezes for a full minute every time it rebuilds its search index. Your teammate, Yusuf, is sure he already fixed it: he moved the indexing code into a `Thread` object. You open his change and see `new Thread(indexTask).run();`. The app still freezes exactly as before. Yusuf insists the code is running in a thread, because it says `Thread` right there. You suspect one word is wrong. What is the difference between the method he called and the one he should have called, and how would you write it with the newer builder style?",
  "simple": "A thread is like a separate worker inside your program who can do a job while the main worker keeps going. You describe the job with a `Runnable`, which is simply \"here is some code to run\": one method, `run()`, with no inputs and no result. You hand the job to a `Thread` and call `start()`, which hires the new worker and lets them begin. A common slip is calling `run()` yourself; that just makes the main worker do the job, so nothing happens in parallel. Newer Java also has a builder style that reads like filling in a form: `Thread.ofPlatform().name(\"indexer\").start(job)`.",
  "body": [
   "A thread is an independent path of execution within a program. Every Java program starts with a main thread, and you can create more threads so that work happens concurrently, such as keeping a user interface responsive while a long job runs in the background. The work itself is usually described by a `Runnable`, a functional interface with exactly one method, `void run()`. That method takes no arguments, returns nothing, and cannot throw checked exceptions; if the work can fail with a checked exception, the code inside `run` must catch it. Because `Runnable` is a functional interface, a lambda works: `Runnable task = () -> System.out.println(\"working\");`.",
   "There are two classic ways to create a thread. You can pass a `Runnable` to a `Thread` constructor, optionally with a name, or you can subclass `Thread` and override `run`. Passing a `Runnable` is preferred, for three reasons: it separates the task from the mechanism that runs it, it leaves your class free to extend some other class since Java allows only one superclass, and the same task can later be handed to an executor without changes. In both styles, nothing happens until you call `start()`. That call asks the Java Virtual Machine (JVM) to create a new thread and invoke `run()` on it. Calling `start()` a second time on the same `Thread` object throws `IllegalThreadStateException`, because a thread can be started only once. When one thread needs to wait for another to finish, it calls `join()` on that thread; `join()` can throw the checked `InterruptedException`.",
   "```java\nRunnable task = () -> System.out.println(Thread.currentThread().getName());\n\nThread t1 = new Thread(task, \"worker-1\");\nt1.start();\n\nThread t2 = Thread.ofPlatform().name(\"worker-\", 2).daemon(true).start(task);\nThread t3 = Thread.ofVirtual().name(\"v1\").unstarted(task);\nt3.start();\nThread t4 = Thread.startVirtualThread(task);\n\nt1.join();   // wait for t1 to finish; throws InterruptedException\n```",
   "The Thread.Builder API, added alongside virtual threads, offers a fluent way to configure and create threads. `Thread.ofPlatform()` returns a builder for ordinary platform threads, each backed by an operating system (OS) thread, and `Thread.ofVirtual()` returns a builder for virtual threads, which the JVM manages. On either builder you can set a name with `name(\"worker\")`, or use `name(\"worker-\", 0)` to give each thread created by that builder a numbered name such as `worker-0`, `worker-1` and so on. Platform builders add `daemon(boolean)` and `priority(int)`; those methods do not exist on the virtual builder.",
   "Once a builder is configured, three methods produce threads or a way to make them. `start(runnable)` creates the thread and starts it immediately, returning the running `Thread`. `unstarted(runnable)` creates a configured thread without starting it, so you must call `start()` yourself later; this is useful when you want to set something up before the thread begins. `factory()` returns a `ThreadFactory` that you can hand to an executor so that every thread it creates has your settings. For the most common virtual-thread case, `Thread.startVirtualThread(runnable)` is a one-line shortcut that creates and starts a virtual thread.",
   "A few thread properties come up in questions. A daemon thread is a background thread that does not keep the JVM alive: when only daemon threads remain, the JVM exits, even if those threads have not finished. Threads are non-daemon by default when created from a non-daemon thread, and virtual threads are always daemon threads. Thread names are labels, not unique identifiers; two threads can share a name, so each thread also has a numeric `threadId()`. `Thread.currentThread()` returns the thread that is running the current code, which is how a task can find out its own name, as the example's lambda does.",
   "In real applications you rarely create a thread by hand for each task. Instead you submit tasks to an `ExecutorService`, which manages the threads for you. The exam still tests the foundations, though. Remember which method `Runnable` defines and what it can and cannot do, that `start()` is required to create a new thread, and how the builder methods chain together.",
   "The most important trap is the difference between `run()` and `start()`. Calling `run()` directly is just an ordinary method call: the code executes on the current thread, and the caller waits until it finishes. No new thread is created. That is exactly the bug in the opening scene. If an output question calls `run()` and prints `Thread.currentThread().getName()`, the answer is the caller's thread name, usually `main`."
  ],
  "analogy": "A `Runnable` is a written job description, and a `Thread` is a hired worker holding it. Calling `start()` sends the worker off to do the job while you carry on with your own work. Calling `run()` yourself is like reading the job description and doing the job personally; the worker never leaves the break room. The builder is the hiring form where you fill in the worker's name, whether they are a temp who leaves when everyone else goes home (daemon), and whether they start now or on Monday (`start` versus `unstarted`).",
  "terms": [
   [
    "Runnable",
    "A functional interface with void run() that represents a task with no result and no checked exceptions."
   ],
   [
    "start",
    "The Thread method that creates a new thread of execution and calls run() on it; it may be called only once per thread."
   ],
   [
    "Thread.Builder",
    "A fluent API, obtained with Thread.ofPlatform() or Thread.ofVirtual(), for configuring and creating threads."
   ],
   [
    "unstarted",
    "A Thread.Builder method that creates a configured thread without starting it."
   ],
   [
    "Daemon thread",
    "A background thread that does not prevent the JVM from exiting."
   ],
   [
    "join",
    "A Thread method that makes the caller wait until that thread terminates."
   ]
  ],
  "example": "A desktop app starts a background indexer with Thread.ofPlatform().name(\"indexer\").daemon(true).start(indexTask) so the UI stays responsive, and the indexer does not block the app from closing when the user quits.",
  "mistakes": [
   [
    "Calling run() and expecting a new thread.",
    "run() executes on the current thread like any method. Only start() creates a new thread."
   ],
   [
    "Expecting Runnable.run() to return a value or throw a checked exception.",
    "run() returns void and declares no checked exceptions. Use Callable when you need a result or a checked exception."
   ],
   [
    "Calling daemon(true) or priority() on Thread.ofVirtual().",
    "Those methods belong to the platform builder. Virtual threads are always daemon threads with normal priority."
   ],
   [
    "Thinking unstarted(r) starts the thread.",
    "unstarted returns a configured thread that is not running; you must call start() on it."
   ]
  ],
  "tryit": [
   [
    "Priya writes Thread t = Thread.ofPlatform().name(\"sync\").unstarted(task); and then t.run(); followed by IO.println(\"done\");. The task prints the current thread's name. What prints, and in what order?",
    "The task prints main (or whatever thread called run), then done prints. unstarted created a thread that was never started, and run() executed the task synchronously on the calling thread. Calling t.start() instead would run it on the thread named sync."
   ]
  ],
  "tip": "Runnable's method is run(), it returns void and cannot throw checked exceptions. daemon() and priority() are available on platform builders; virtual threads are always daemon.",
  "check": [
   [
    "What is the difference between Thread.ofVirtual().start(r) and Thread.ofVirtual().unstarted(r)?",
    "start creates and starts the thread immediately; unstarted returns a configured thread you must start yourself."
   ],
   [
    "Why is implementing Runnable usually preferred to extending Thread?",
    "It separates the task from how it is run, lets the class extend another class, and lets executors run the same task."
   ],
   [
    "What happens if you call start() twice on the same Thread object?",
    "The second call throws IllegalThreadStateException, because a thread can be started only once."
   ]
  ]
 },
 {
  "t": "Platform threads vs virtual threads; Executors.newVirtualThreadPerTaskExecutor()",
  "hook": "Every Monday morning, the order-status service at Silverleaf Grocers slows to a crawl. Each request calls three slow partner systems, and the service uses a fixed pool of 200 threads, so request number 201 waits in line even though the processors are mostly idle. Hannah, the on-call engineer, proposes a one-line change to virtual threads. Her colleague Dev pushes back: \"If threads were the bottleneck, just raise the pool to 20,000.\" Another teammate wants to use virtual threads for the nightly image-resizing job too, hoping it will finish faster. Which of these ideas will actually help, and why?",
  "simple": "A normal Java thread, called a platform thread, is tied to one real worker supplied by the operating system, and that worker sits idle while the thread waits for a slow reply. Those workers are expensive, so programs keep only a limited number. A virtual thread is a lightweight thread that Java manages itself. When it has to wait, Java sets it aside and lets the real worker do something else, then picks it back up when the reply arrives. That lets you have huge numbers of waiting tasks without running out of workers. Virtual threads help when tasks spend most of their time waiting, like phone calls on hold. They do not make number-crunching faster.",
  "body": [
   "Java now has two kinds of threads, and the exam expects you to know when each one fits. A platform thread is a thin wrapper around an operating system (OS) thread. It holds that OS thread for its entire life, including all the time it spends waiting for a database, a file, or a network reply. OS threads are relatively expensive: each one reserves memory for its stack, and the OS can schedule only so many efficiently. That is why server applications traditionally used fixed-size thread pools and shared a limited number of threads among many tasks, with extra tasks waiting in a queue.",
   "A virtual thread, final since Java 21, is a lightweight thread managed by the Java Virtual Machine (JVM) rather than by the OS. The JVM runs virtual threads on a small pool of platform threads called carrier threads. When a virtual thread performs a blocking operation, such as reading from a socket or calling `Thread.sleep`, the JVM unmounts it from its carrier and parks its stack in heap memory. The carrier is then free to run another virtual thread. When the blocking operation completes, the virtual thread is mounted again and continues, possibly on a different carrier than before. To your code, it looks like an ordinary blocking call.",
   "The practical result is that you can have very large numbers of virtual threads, even millions, and still write simple, readable blocking code in a thread-per-request style. Virtual threads improve throughput for input/output (I/O) bound work, meaning many tasks that spend most of their time waiting. They do not make central processing unit (CPU) bound code faster. A task that spends its time calculating, such as resizing images or compressing files, needs a processor core the whole time, and the number of carrier threads, and therefore of cores in use, stays the same. For CPU-heavy work, a small pool of platform threads sized to the number of cores remains the right tool.",
   "```java\ntry (ExecutorService ex = Executors.newVirtualThreadPerTaskExecutor()) {\n    for (int i = 0; i < 10_000; i++) {\n        int id = i;\n        ex.submit(() -> fetchOrder(id));   // each task gets its own new virtual thread\n    }\n}   // close() waits for all submitted tasks to finish\n```",
   "`Executors.newVirtualThreadPerTaskExecutor()` returns an `ExecutorService` that starts a brand-new virtual thread for every submitted task. There is no pool, because virtual threads are cheap to create and discard. The guidance is direct: do not pool virtual threads, and do not try to reuse them. `ExecutorService` is `AutoCloseable`, so the try-with-resources block in the example calls `close()` at the end, which waits for every submitted task to finish before moving on. If you need to limit concurrent access to a scarce resource, such as a database that allows only ten connections, use a `Semaphore` with ten permits rather than a pool of ten threads. Other ways to create virtual threads are `Thread.ofVirtual().start(r)`, `Thread.startVirtualThread(r)` and `Thread.ofVirtual().factory()`, which returns a `ThreadFactory` for other executors.",
   "Some properties of virtual threads differ from platform threads, and they show up in questions. Virtual threads are always daemon threads, so they never keep the JVM alive on their own, and calling `setDaemon(false)` on one throws `IllegalArgumentException`. Their priority is fixed at normal, and `setPriority` has no effect on them. `isVirtual()` tells you which kind a given thread is. Thread-local variables work in virtual threads, but with millions of threads, heavy per-thread caches stored in `ThreadLocal` can waste a lot of memory; that concern is one reason scoped values were introduced as an alternative for sharing data.",
   "A virtual thread can become pinned to its carrier, meaning it cannot unmount while blocked and so holds the carrier the whole time. Historically this happened when a virtual thread blocked inside a `synchronized` block or method, and it still happens during native method calls. Java 24 removed the `synchronized` case, but long periods of pinning should still be avoided because they reduce the number of carriers available to everyone else.",
   "For the exam, focus on the model rather than tuning details. Use many cheap virtual threads for blocking I/O, one per task, with no pooling. Use a few platform threads for CPU-heavy work. Limit access to scarce resources with a `Semaphore`. And remember that virtual threads add scalability, the ability to handle more simultaneous waiting tasks, not raw speed for any single task."
  ],
  "analogy": "Platform threads are like restaurant waiters who each stand at one table until the diners finish, even while they are just reading the menu. You can only hire so many. Virtual threads are like waiters who take an order, hand it to the kitchen, and serve other tables while the food cooks, coming back when the dish is ready. The same few waiters serve far more tables. The analogy stops at cooking itself: adding table-hopping waiters does not make the kitchen cook faster, just as virtual threads do not speed up CPU-bound work.",
  "terms": [
   [
    "Platform thread",
    "A Java thread backed one to one by an operating system thread for its whole lifetime."
   ],
   [
    "Virtual thread",
    "A lightweight JVM-managed thread that unmounts from its carrier while blocked so the carrier can run other work."
   ],
   [
    "Carrier thread",
    "A platform thread on which the JVM mounts virtual threads to execute them."
   ],
   [
    "newVirtualThreadPerTaskExecutor",
    "An Executors factory method returning an ExecutorService that starts a new virtual thread for each task."
   ],
   [
    "Pinning",
    "A state where a blocked virtual thread cannot unmount from its carrier, reducing scalability."
   ],
   [
    "Semaphore",
    "A concurrency utility that limits how many threads can use a resource at once by handing out a fixed number of permits."
   ]
  ],
  "example": "A web service that calls three slow downstream APIs per request switches from a 200-thread fixed pool to a virtual-thread-per-task executor. Under load it handles far more concurrent requests with the same hardware, because waiting requests no longer tie up operating system threads.",
  "mistakes": [
   [
    "Expecting virtual threads to speed up CPU-bound work.",
    "Virtual threads help tasks that wait on I/O. CPU-bound work is limited by the number of cores, which virtual threads do not change."
   ],
   [
    "Creating a fixed pool of virtual threads to limit concurrency.",
    "Virtual threads should be created per task and not pooled. Use a Semaphore to limit access to a scarce resource."
   ],
   [
    "Calling setDaemon(false) on a virtual thread to keep the JVM alive.",
    "Virtual threads are always daemon threads; setDaemon(false) throws IllegalArgumentException."
   ],
   [
    "Thinking a virtual thread stays on the same carrier for its whole life.",
    "After unmounting during a blocking call, it may be mounted again on a different carrier thread."
   ]
  ],
  "tryit": [
   [
    "Leah's service submits 50,000 tasks to Executors.newVirtualThreadPerTaskExecutor(). Each task queries a reporting database that accepts at most 20 connections, and the database starts refusing connections under load. A teammate suggests switching to Executors.newFixedThreadPool(20). What would you recommend instead, and why?",
    "Keep the virtual-thread-per-task executor and guard the database call with a Semaphore of 20 permits. That limits concurrent database access to 20 while other parts of each task, such as calls to other services, still run concurrently. A fixed pool of 20 would limit all work to 20 tasks at a time."
   ]
  ],
  "tip": "Virtual threads improve scalability for blocking, I/O-heavy tasks, not raw CPU speed. Do not pool them; limit access to scarce resources with a Semaphore instead. They are always daemon threads.",
  "check": [
   [
    "Will switching a CPU-bound image-resizing job to virtual threads make it finish faster?",
    "Generally no. Virtual threads help when tasks wait on I/O; CPU-bound work is limited by the number of cores."
   ],
   [
    "What happens when a virtual thread blocks on a network read?",
    "The JVM unmounts it from its carrier thread, which can then run other virtual threads until the read completes."
   ],
   [
    "Why should you not create a fixed pool of 10 virtual threads to limit database calls?",
    "Virtual threads are meant to be created per task and not pooled; use a Semaphore to limit concurrency."
   ],
   [
    "What does close() do on the executor returned by newVirtualThreadPerTaskExecutor() in a try-with-resources block?",
    "It waits for all submitted tasks to finish before the block exits."
   ]
  ]
 },
 {
  "t": "ExecutorService, Callable and Future; shutdown, awaitTermination, close()",
  "hook": "It is Friday evening at Copperline Travel, and Priya on the platform team gets a message: the nightly fare-import job finished its work an hour ago, but the process is still sitting there, refusing to exit, and the scheduler cannot start the next job. She opens the code. Every supplier query is submitted to a thread pool, every result is collected with get(), and the totals are written correctly. Nothing is stuck in a loop. The log even says \"import complete.\" So what is keeping the Java Virtual Machine alive, and what single call did the author forget?",
  "simple": "Think of an ExecutorService as a small team of workers you hire for a job. Instead of doing every task yourself, you hand tasks to the team and they do them in the background. When you hand over a task that should give an answer back, you get a claim ticket, called a Future. Later you show the ticket and wait, if needed, to collect the answer. The catch is that the team keeps showing up for work until you tell them to go home. Saying shutdown means no new tasks, finish what you have. Waiting with awaitTermination means you stand at the door until they are done. In newer Java, close() does both for you. For example, a coffee shop takes your order, hands you a number, and you pick up your drink when it is called.",
  "body": [
   "An `ExecutorService` separates two decisions that used to be tangled together: what work needs to be done, and which threads do it. You hand it tasks, and it decides how they map onto threads. You usually create one with a factory method in the `Executors` class. `newSingleThreadExecutor()` runs tasks one at a time in the order they were submitted, `newFixedThreadPool(n)` keeps n reusable threads, `newCachedThreadPool()` creates threads as needed and reuses idle ones, `newScheduledThreadPool(n)` runs tasks after a delay or periodically, and `newVirtualThreadPerTaskExecutor()` starts a new virtual thread for every task. On the exam, read the factory name carefully, because questions about ordering often depend on whether the pool has one thread or several.",
   "Tasks come in two shapes, and the difference drives many questions. A `Runnable` has `void run()`, returns nothing and cannot throw checked exceptions. A `Callable<V>` has `V call() throws Exception`, so it can return a result and is allowed to throw checked exceptions. A lambda becomes one or the other depending on its body: `() -> 6 * 7` returns a value, so it fits Callable, while `() -> System.out.println(\"hi\")` returns nothing, so it fits Runnable. The submission methods differ too. `execute(Runnable)` is fire-and-forget and returns void. `submit` accepts either a Runnable or a Callable and returns a `Future`. `invokeAll(collection)` runs a collection of Callables and returns a list of Futures once all of them are done, and `invokeAny(collection)` returns the result of one task that completed successfully and cancels the others. Both invoke methods block the caller until they have an answer, unlike `submit`, which returns a Future at once and lets the caller carry on with other work.",
   "A `Future<V>` is a claim ticket for a result that may not exist yet. `get()` blocks until the task finishes and then returns its value; for a submitted Runnable that value is null. `get(timeout, unit)` waits at most the given time and throws `TimeoutException` if the result is still not ready. If the task itself threw an exception, `get()` does not rethrow it directly. Instead it throws `ExecutionException`, and the original exception is available through `getCause()`. Because `get()` waits, it also declares the checked `InterruptedException`. `isDone()` lets you check without blocking, and `cancel(true)` attempts to stop the task by interrupting the thread running it. A task that ignores interruption may keep running even after cancel returns true.",
   "```java\nExecutorService ex = Executors.newFixedThreadPool(2);\ntry {\n    Future<Integer> f = ex.submit(() -> 6 * 7);   // Callable<Integer>\n    Future<?> r = ex.submit(() -> System.out.println(\"hi\")); // Runnable\n    System.out.println(f.get());                 // 42 (blocks until done)\n} finally {\n    ex.shutdown();\n    if (!ex.awaitTermination(5, TimeUnit.SECONDS)) ex.shutdownNow();\n}\n```",
   "The example shows the shutdown pattern you should recognize. An executor's platform threads keep the Java Virtual Machine (JVM) running until the executor is shut down, which is exactly the problem in a program that prints its final message and then never exits. `shutdown()` stops the executor from accepting new tasks but lets already submitted tasks run to completion, and it returns immediately without waiting. Any later submission is refused with `RejectedExecutionException`. `shutdownNow()` goes further: it attempts to stop running tasks by interrupting them and returns a list of the tasks that were waiting and never started.",
   "Waiting is a separate step. `awaitTermination(timeout, unit)` blocks the calling thread until all tasks have finished after a shutdown request, or until the timeout expires, and returns true if the executor terminated in time or false if it did not. Calling it without first calling shutdown simply waits for the timeout, because the executor never moves toward termination. Two status methods mirror these steps. `isShutdown()` becomes true as soon as shutdown or shutdownNow has been called, while `isTerminated()` becomes true only when shutdown was requested and every task has completed. A question that asks what `isTerminated()` returns immediately after `shutdown()`, with a long task still running, expects false.",
   "Since Java 19, `ExecutorService` extends `AutoCloseable`, so it can be declared in a try-with-resources statement. Its `close()` method calls shutdown and then waits for all submitted tasks to finish, so reaching the end of the block guarantees the work is done. This is the idiomatic way to use a virtual-thread executor: `try (var ex = Executors.newVirtualThreadPerTaskExecutor()) { ... }`. Keep the three behaviors straight, because the exam likes to swap them: `shutdown()` stops new work but does not wait, `awaitTermination` waits but does not shut anything down, and `close()` does both."
  ],
  "analogy": "An ExecutorService is like a print shop. You drop off jobs at the counter and get a numbered receipt, which is your Future. Asking for the job with the receipt makes you wait at the counter until it is ready. Hanging the closed sign is shutdown: no new customers, but the presses finish current jobs. Standing by the door until the last press stops is awaitTermination, and close() is hanging the sign and then waiting. The analogy stops working with cancel: a real printer stops when told, but a Java task stops only if its code checks for interruption.",
  "terms": [
   [
    "ExecutorService",
    "An interface for running tasks on managed threads, with methods to submit work and to shut the service down."
   ],
   [
    "Callable<V>",
    "A task interface with V call() throws Exception, returning a result and allowed to throw checked exceptions."
   ],
   [
    "Future<V>",
    "A handle to a pending result, with get, get with timeout, isDone and cancel."
   ],
   [
    "ExecutionException",
    "The checked exception thrown by Future.get when the task itself threw; the original exception is its cause."
   ],
   [
    "shutdown",
    "Stops an executor accepting new tasks while letting submitted tasks complete, without waiting."
   ],
   [
    "awaitTermination",
    "Blocks until all tasks complete after shutdown or a timeout expires, returning whether it terminated."
   ],
   [
    "close()",
    "The AutoCloseable method of ExecutorService that shuts down and then waits for submitted tasks to finish."
   ]
  ],
  "example": "A price aggregator submits a Callable per supplier to a fixed pool, then calls future.get(2, TimeUnit.SECONDS) on each so one slow supplier cannot stall the page, and catches TimeoutException to show that supplier as unavailable.",
  "mistakes": [
   [
    "shutdown() waits for running tasks to finish before returning.",
    "shutdown() returns immediately. It only stops new submissions. To wait, call awaitTermination after it, or use close(), which shuts down and waits."
   ],
   [
    "If a Callable throws an IOException, future.get() throws IOException.",
    "get() wraps the task's exception in ExecutionException. The IOException is available as getCause()."
   ],
   [
    "execute and submit are interchangeable.",
    "execute takes only a Runnable and returns void, so you cannot get a result or see the task's exception through it. submit accepts Runnable or Callable and returns a Future."
   ],
   [
    "shutdownNow() guarantees every running task stops at once.",
    "It only interrupts running tasks and returns the tasks that never started. A task that does not respond to interruption keeps running."
   ]
  ],
  "tryit": [
   [
    "Ravi writes a command-line tool that submits five Callables to Executors.newFixedThreadPool(3), prints each future.get(), and then reaches the end of main. The output is correct, but the process never exits. He is running on Java 25 and wants the shortest correct fix that also guarantees all work is finished before main ends. What should he change?",
    "Declare the executor in a try-with-resources block, for example try (ExecutorService ex = Executors.newFixedThreadPool(3)) { ... }. The pool's threads were keeping the JVM alive because it was never shut down. close() calls shutdown and then waits for submitted tasks, so the program finishes the work and exits. Calling shutdown() alone would also let the JVM exit, but it would not wait."
   ]
  ],
  "tip": "execute returns void and takes only a Runnable; submit returns a Future. shutdown does not wait, awaitTermination waits, and close() does both. Exceptions inside a task reach you wrapped in ExecutionException from get().",
  "check": [
   [
    "What does Future.get() return for a submitted Runnable?",
    "null, once the task has completed."
   ],
   [
    "After shutdown(), what happens when you submit another task?",
    "It is rejected with a RejectedExecutionException."
   ],
   [
    "What is the difference between isShutdown() and isTerminated()?",
    "isShutdown is true once shutdown was requested; isTerminated is true only after all tasks have finished following shutdown."
   ],
   [
    "What does future.get(1, TimeUnit.SECONDS) throw if the task needs ten seconds?",
    "TimeoutException, after waiting about one second; the task itself keeps running."
   ]
  ]
 },
 {
  "t": "Thread lifecycle and start() vs run()",
  "hook": "At Fernhill Clinic the appointment desktop app freezes for twenty seconds every time Dana clicks Export Schedule. The developer, Owen, insists he fixed this last sprint: the export now lives in its own Thread object, named exportWorker, so the screen should stay responsive. You pull up the code and see the thread created correctly, the Runnable written correctly, and then one line that calls exportWorker.run(). A log statement inside the task prints the current thread's name, and the name it prints is the user-interface thread. If the code is in a Thread, why is the work not happening on a new thread?",
  "simple": "A Thread object in Java is like a hired helper who has been given instructions but has not started yet. The method start() is you saying go, do this on your own while I keep working. The helper then goes off and follows the instructions in run(). If instead you call run() yourself, you are just reading the instructions and doing the work with your own hands. Nobody new is helping, and you are stuck until the work is done. A helper can only be told go once. Once their job is finished, you cannot reuse the same helper; you need a new one. For example, asking a friend to bake a cake while you clean is start(); reading their recipe and baking it yourself is run().",
  "body": [
   "Every `Thread` object moves through a fixed set of states defined by the `Thread.State` enum, and `getState()` reports the current one. `NEW` means the object exists but `start()` has not been called. `RUNNABLE` means the thread is running or ready to run; Java deliberately does not separate running on a CPU from waiting for a CPU, so there is no RUNNING state. `BLOCKED` means the thread is waiting to acquire a monitor lock to enter a `synchronized` block or method. `WAITING` means it waits with no time limit for another thread, for example in `join()` without a timeout or in `Object.wait()`. `TIMED_WAITING` is the same idea with a limit, such as `Thread.sleep(100)` or `join(500)`. `TERMINATED` means `run()` has finished, either normally or by throwing an exception. Memorize all six names exactly; distractors such as RUNNING, SLEEPING or READY do not exist.",
   "The usual path is easy to picture. A thread goes from NEW to RUNNABLE when `start()` is called. While alive it moves between RUNNABLE and BLOCKED, WAITING or TIMED_WAITING as it waits for locks, for other threads or for time to pass, and it returns to RUNNABLE when the wait ends. Finally it moves from RUNNABLE to TERMINATED. The path only runs forward. A terminated thread can never be restarted, and calling `start()` a second time on the same Thread object, in any state other than NEW, throws the unchecked `IllegalThreadStateException`. To run the same work again you create a new Thread, or better, submit the task to an executor. You can observe every step yourself by printing `t.getState()` before start, during a sleep inside the task, and after a join; the output reads NEW, then TIMED_WAITING, then TERMINATED.",
   "The distinction tested most often is `start()` versus `run()`. `start()` asks the JVM, the Java Virtual Machine, to create a new thread of execution, and that new thread then calls `run()`. Calling `run()` directly is nothing more than an ordinary method call. The code executes synchronously on the current thread, no new thread is created, `Thread.currentThread()` inside it returns the caller, and the Thread object stays in the NEW state. That is why calling `run()` and then `start()` on the same object is legal, while calling `start()` twice is not.",
   "```java\nRunnable job = () -> System.out.println(Thread.currentThread().getName());\nThread t = new Thread(job, \"worker\");\n\nt.run();    // prints main    (runs on the calling thread)\nt.start();  // prints worker  (runs on a new thread)\n// t.start();  // IllegalThreadStateException: already started\n```",
   "Once several threads are running, the order of their output is not guaranteed. If main starts a thread and then prints a line, either line may appear first, and the answer can change from run to run. Exam questions that ask for the exact output of unsynchronized threads usually expect an answer such as \"the order cannot be determined\" or a set of possible outputs. The way to force an order is to coordinate. `t.join()` makes the calling thread wait, in the WAITING state, until t terminates, so anything printed after the join is guaranteed to come after everything t printed.",
   "Sleeping deserves its own note. `Thread.sleep(millis)` is a static method that always affects the current thread, even if you call it through a reference to another thread, such as `t.sleep(100)`. It puts the current thread into TIMED_WAITING, does not release any locks the thread holds, and declares the checked `InterruptedException`, so code that calls it must catch or declare that exception. A sleeping thread that holds a lock can therefore leave other threads BLOCKED for the whole sleep.",
   "Interruption is the cooperative way to ask a thread to stop. Calling `t.interrupt()` sets the thread's interrupt flag. If the thread is sleeping, waiting or joining, that blocking call throws `InterruptedException` and clears the flag. If the thread is simply computing, nothing happens automatically; well-behaved code checks `Thread.currentThread().isInterrupted()` in long loops and exits cleanly. A common good practice in a catch block is to restore the flag with `Thread.currentThread().interrupt()` so code further up the stack also sees the request. The old `stop()` method was unsafe because it could leave shared objects half-updated, and in current Java versions it no longer stops threads, so never rely on it. In practice, an executor's `shutdownNow()` and `Future.cancel(true)` both work through this same interrupt mechanism, which is why tasks that check for interruption shut down promptly."
  ],
  "analogy": "A Thread object is like a car parked in a garage with a route already programmed. start() is turning the key so the car drives the route by itself while you stay home. Calling run() is getting out a map and walking the route yourself; you arrive at the same places, but the car never leaves the garage. Once a car finishes its one programmed trip, it cannot be started again; you need another car. The analogy stops working for timing: real cars follow traffic rules, but the scheduler decides which thread runs when, so output order is not predictable.",
  "mnemonic": "The six states in typical order: \"New Runners Block, Wait, Time-wait, Terminate\" for NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED. There is no RUNNING state.",
  "terms": [
   [
    "Thread.State",
    "The enum of thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING and TERMINATED."
   ],
   [
    "RUNNABLE",
    "The state of a started thread that is either executing or ready to execute; Java has no separate running state."
   ],
   [
    "BLOCKED",
    "The state of a thread waiting to acquire a monitor lock for a synchronized block or method."
   ],
   [
    "TIMED_WAITING",
    "The state of a thread waiting with a time limit, as in sleep or join with a timeout."
   ],
   [
    "IllegalThreadStateException",
    "Thrown when start() is called on a thread that has already been started."
   ],
   [
    "Interrupt",
    "A cooperative signal that sets a thread's interrupt flag and wakes it from sleep, wait or join with InterruptedException."
   ]
  ],
  "example": "A developer notices that their slow export still freezes the UI even though it is wrapped in a Thread. The code calls exportThread.run() instead of start(), so the export runs on the UI thread. Changing it to start() moves the work to a new thread.",
  "mistakes": [
   [
    "Calling run() starts the thread, just like start().",
    "run() is an ordinary method call on the current thread. Only start() creates a new thread of execution, which then calls run()."
   ],
   [
    "A thread that is running is in a RUNNING state.",
    "There is no RUNNING constant. A thread that is executing or ready to execute is RUNNABLE."
   ],
   [
    "A thread waiting to enter a synchronized block is WAITING.",
    "Waiting for a monitor lock is BLOCKED. WAITING is for indefinite waits such as join() or Object.wait()."
   ],
   [
    "Thread.sleep releases the locks the thread holds.",
    "sleep keeps every lock. Object.wait is the method that releases the monitor while waiting."
   ]
  ],
  "tryit": [
   [
    "A test creates Thread t = new Thread(task), calls t.start(), then t.join(), then prints t.getState(), and finally calls t.start() again. A teammate expects the printout to be NEW because the thread can be reused. What actually prints, and what happens on the last line?",
    "After join returns, the thread has finished, so getState() prints TERMINATED. The second start() throws IllegalThreadStateException, because a Thread object can be started only once, from the NEW state. To run the task again, create a new Thread or submit the task to an executor."
   ]
  ],
  "tip": "Calling run() does not create a thread, so Thread.currentThread() inside it is the caller. Calling start() twice throws IllegalThreadStateException. Unless code uses join or another coordination tool, output order between threads is unpredictable.",
  "check": [
   [
    "What state is a thread in after it is created but before start() is called?",
    "NEW."
   ],
   [
    "Which state is a thread in while inside Thread.sleep(1000)?",
    "TIMED_WAITING."
   ],
   [
    "Does calling t.run() change t's state to RUNNABLE?",
    "No. run() executes on the calling thread; t stays NEW."
   ],
   [
    "What does interrupting a thread that is blocked in Thread.sleep do?",
    "The sleep ends early by throwing InterruptedException, and the interrupt flag is cleared."
   ]
  ]
 },
 {
  "t": "Race conditions, synchronized blocks and methods, and visibility",
  "hook": "The monthly report at Bluegate Libraries says the online catalog had 1.82 million searches. The web server access log, which writes one line per search, says 1.91 million. Leah, the analyst, files a ticket asking who is losing her data. You find the counter: a plain int field called searches, and a method that does searches++ every time a request thread handles a search. There is no exception in any log, no crash, no warning. The code has passed review twice. How can one line of arithmetic quietly lose ninety thousand increments, and what is the smallest change that would stop it?",
  "simple": "When two or more workers share the same notebook, they can step on each other. Imagine two people updating a tally on a whiteboard. Both look and see 10. Both think the new number is 11. Both write 11. Two people counted, but the board only went up by one. That is a race condition: the answer depends on who moved when. The fix is to make people take turns, like passing a single marker; only the person holding it may read and change the number. In Java that marker is a lock, and the keyword synchronized means hold the lock while doing this. There is a second, sneakier problem: one worker might keep reading an old copy of the board and never see the new number. Locks fix that too.",
  "body": [
   "A race condition happens when a program's result depends on the unpredictable timing of threads that share mutable data. The textbook case is `count++` on a shared field. It looks like one step, but it is really three: read the current value, add one, and write the result back. If two threads both read the same value before either writes, they both write the same new value, and one increment is lost. Run a million increments on each of two threads and the final total is usually less than two million, and different on every run. Nothing throws an exception, which is why these bugs survive testing.",
   "The `synchronized` keyword fixes this with mutual exclusion. Every object in Java has an intrinsic lock, also called a monitor. A synchronized block, written `synchronized (lock) { ... }`, lets only one thread at a time hold that object's lock and run code guarded by it. Other threads that try to enter go into the BLOCKED state until the lock is released. A synchronized instance method is equivalent to wrapping its body in `synchronized (this)`, and a synchronized static method locks the Class object, such as `Counter.class`. As a result, a synchronized instance method and a synchronized static method in the same class use different locks and do not exclude each other.",
   "```java\nclass Counter {\n    private int count;\n    private final Object lock = new Object();\n    void increment() { synchronized (lock) { count++; } }\n    synchronized int get() { return count; }   // locks this, not lock\n}\n```",
   "Mutual exclusion works only when every access to the shared data uses the same lock. In the class above, `get()` locks `this` while `increment()` locks the private `lock` object, so a reader and a writer are not coordinated at all; the fix is to guard both with one lock. Two more properties are worth knowing. Intrinsic locks are reentrant, which means a thread already holding a lock can enter another block or method synchronized on the same object without deadlocking itself. And the lock is released automatically when the block exits, whether it finishes normally or because an exception is thrown, so you never write an unlock call for synchronized. While a thread waits to enter, a thread dump lists it as BLOCKED and names the monitor it is waiting for, which is often the first clue when a system slows down under load.",
   "The second problem is visibility, and it is less obvious. For speed, threads may keep values in registers or caches, and both the compiler and the processor may reorder instructions. Without synchronization, one thread may never see another thread's write, or may see writes in a surprising order. The Java Memory Model (JMM) defines happens-before relationships that guarantee when a write is visible. Releasing a lock happens-before the next acquisition of the same lock, so everything a thread wrote inside a synchronized block is visible to the next thread that takes that lock. Calling `Thread.start()` happens-before the started thread's actions, and a thread's actions happen-before another thread returns from `join()` on it.",
   "The `volatile` keyword on a field is a lighter visibility tool. Every read of a volatile field sees the most recent write to it by any thread, and the compiler and processor may not reorder ordinary reads and writes across it in harmful ways. It is ideal for a stop flag, declared as `private volatile boolean running = true;`, which one thread sets to false and a worker loop reads. What volatile does not do is make compound actions atomic. `count++` on a volatile int is still three separate steps and still a race condition. Choosing volatile is therefore a question of shape: one writer and many readers of a simple value suits it, while counters and check-then-act logic do not. For read-modify-write you need synchronized, an explicit lock, or an atomic class such as `AtomicInteger`.",
   "Locking is not the only defense. Often the best fix is to avoid sharing mutable state at all: use immutable objects, which can be shared freely; confine data to a single thread; or let a concurrent collection manage the shared state for you. When you do synchronize, keep the guarded regions short, because every synchronized region is a point where threads may wait for each other, and long regions reduce the benefit of having multiple threads. On the exam, look for which lock each piece of code uses, whether every access is guarded, and whether a question is about atomicity or about visibility."
  ],
  "analogy": "A synchronized block is like a single-occupancy restroom with a key on a big wooden paddle. Whoever holds the paddle may go in; everyone else waits in the hallway, which is the BLOCKED state. The trick is that every door you want to protect must use the same paddle. If the restroom on the second floor has its own paddle, two people can be in the two rooms at once, just as get() and increment() can run together when they lock different objects. The analogy does not cover visibility: real people see the same room, but threads may see stale copies unless a lock or volatile is involved.",
  "terms": [
   [
    "Race condition",
    "A bug where the outcome depends on the timing of threads accessing shared mutable data."
   ],
   [
    "Intrinsic lock (monitor)",
    "The lock built into every object, acquired by synchronized blocks and methods."
   ],
   [
    "synchronized method",
    "A method whose body runs while holding the lock on this, or on the Class object for static methods."
   ],
   [
    "Reentrant",
    "A property of a lock that lets the thread already holding it acquire it again without blocking."
   ],
   [
    "Visibility",
    "Whether a write by one thread is guaranteed to be seen by reads in another thread."
   ],
   [
    "Happens-before",
    "A Java Memory Model guarantee that the effects of one action are visible to another, for example from a lock release to the next acquisition."
   ],
   [
    "volatile",
    "A field modifier guaranteeing visibility and ordering of reads and writes, but not atomicity of compound operations."
   ]
  ],
  "example": "A web app counts page views with a plain int field updated by many request threads, and the daily total is always lower than the access log shows. Making the update synchronized, or switching to an AtomicLong, removes the lost updates.",
  "mistakes": [
   [
    "Making the counter volatile fixes count++.",
    "volatile guarantees visibility only. count++ is still a read, an add and a write that other threads can interleave, so updates are still lost."
   ],
   [
    "A synchronized static method and a synchronized instance method of the same class block each other.",
    "The static method locks the Class object and the instance method locks this. Different locks mean no mutual exclusion between them."
   ],
   [
    "Synchronizing only the writer is enough.",
    "Readers must use the same lock too, or they may see stale or partially updated data. Every access to the shared state needs the same lock."
   ],
   [
    "A thread will deadlock if it calls a synchronized method from inside another method synchronized on the same object.",
    "Intrinsic locks are reentrant, so the thread that holds the lock can enter again without blocking."
   ]
  ],
  "tryit": [
   [
    "A class has a field private boolean done. Thread A runs `while (!done) { work(); }` and thread B later sets done = true. In testing, thread A sometimes keeps looping forever. Nothing else reads or writes done. Should you use volatile, synchronized or an AtomicInteger, and why?",
    "Declare the field volatile. The bug is visibility: thread A may never see B's write. Only one thread writes and the write is a simple assignment, not a read-modify-write, so volatile is enough and lighter than synchronized. An AtomicInteger would work but is unnecessary for a boolean flag."
   ],
   [
    "Two methods in a Wallet class, deposit and balance, are both declared synchronized, but a third method, static audit, is declared synchronized static and reads the same instance data through a parameter. Is audit coordinated with deposit?",
    "No. audit locks Wallet.class while deposit locks the Wallet instance, so they can run at the same time. To coordinate them, audit should synchronize on the wallet instance it reads, or all three should share one lock object."
   ]
  ],
  "tip": "volatile gives visibility but not atomicity, so volatile count++ is still unsafe. Synchronized instance methods lock this and static ones lock the Class object; two methods only exclude each other if they use the same lock.",
  "check": [
   [
    "Why is count++ unsafe when two threads run it on a shared field?",
    "It is a read, an add and a write; threads can interleave between those steps and overwrite each other's updates."
   ],
   [
    "Does a synchronized static method block a thread entering a synchronized instance method of the same class?",
    "No. They lock different objects: the Class object versus the instance."
   ],
   [
    "When is volatile enough?",
    "When one thread writes a value that others only read, such as a stop flag, and no read-modify-write is needed."
   ],
   [
    "Is the lock of a synchronized block released if the block throws an exception?",
    "Yes. The intrinsic lock is released automatically however the block exits."
   ]
  ]
 },
 {
  "t": "Atomic classes (AtomicInteger, AtomicLong) and locks (ReentrantLock, tryLock)",
  "hook": "At Tidewater Theaters, opening night tickets go on sale at noon, and by 12:03 the booking service has stopped responding. Marcus, the on-call developer, takes a thread dump and finds two hundred request threads all waiting on the same lock inside the seat-reservation method. One thread holds it, and that thread is stuck calling a slow payment gateway. Customers are staring at spinning wheels instead of seeing a polite \"try again\" message. The fix needs to keep seat maps and payments consistent, but no request should wait forever. Which tool lets a thread give up gracefully instead of queuing behind a stuck lock?",
  "simple": "Sometimes many workers need to update one shared number, like a tally of visitors. Java's atomic classes are special counters that update in one unbreakable step, so no update is ever lost, and nobody has to take turns by hand. But some jobs involve changing two or more things together, like moving money from one jar to another. For those, you need a lock: a key that only one worker can hold at a time. A ReentrantLock is a key you pick up and put down yourself, and you must always put it back. Its special trick is tryLock, which means try to grab the key, and if someone else has it, do not wait in line; go do something else. For example, checking if a fitting room is free and leaving if it is not.",
  "body": [
   "The `java.util.concurrent.atomic` package offers classes such as `AtomicInteger`, `AtomicLong`, `AtomicBoolean` and `AtomicReference` that update a single variable atomically without explicit locking. Under the hood they rely on compare-and-swap (CAS), an instruction supported by modern processors: an update succeeds only if the value still equals what the thread read a moment ago, and if another thread changed it in between, the operation retries. Atomic classes also give volatile-like visibility, so every thread sees the latest value. That makes them the natural choice for counters, sequence numbers and flags that many threads touch.",
   "The exam expects you to know the method names and exactly what they return. `incrementAndGet()` adds one and returns the new value, like `++x`, while `getAndIncrement()` returns the old value, like `x++`. The decrement and add versions follow the same pattern: `decrementAndGet`, `getAndDecrement`, `addAndGet(n)` and `getAndAdd(n)`. A useful memory trick is that the word order tells you the timing: \"get and increment\" gets first, then increments. `get()` and `set()` read and write the value. `compareAndSet(expected, newValue)` sets the value only if it currently equals expected and returns a boolean telling you whether it did. `updateAndGet(x -> x * 2)` and `accumulateAndGet(5, Integer::sum)` apply a function atomically, retrying if another thread interferes, so the function may run more than once and should be free of side effects.",
   "```java\nAtomicInteger hits = new AtomicInteger();\nhits.incrementAndGet();          // 1\nint old = hits.getAndAdd(10);    // old = 1, now 11\nhits.compareAndSet(11, 0);       // true, now 0\nhits.updateAndGet(x -> x + 5);   // 5\n```",
   "Atomic classes protect one variable at a time. When an invariant spans several variables, such as moving money between two balances or updating a seat map together with a payment ledger, two separately atomic updates are not enough, because another thread can observe the state between them. For that you need a lock. `ReentrantLock` in the `java.util.concurrent.locks` package implements the `Lock` interface and provides the same mutual exclusion as `synchronized`, with more control. The essential rule is to call `lock()` immediately before the try block and `unlock()` in the finally block. Unlike synchronized, nothing releases an explicit lock automatically, so a missing unlock leaves every other thread waiting forever.",
   "```java\nprivate final Lock lock = new ReentrantLock();\nvoid transfer(Account a, Account b, int amt) {\n    lock.lock();\n    try { a.withdraw(amt); b.deposit(amt); }\n    finally { lock.unlock(); }\n}\n```",
   "Most of the extra control is about not waiting forever. `tryLock()` attempts to acquire the lock immediately and returns true or false without blocking. `tryLock(1, TimeUnit.SECONDS)` waits up to the given time and, because it waits, declares the checked `InterruptedException`. When tryLock returns false you must not call unlock, since you never acquired the lock; instead you do something else, such as retry later or report that the resource is busy. The usual shape is `if (lock.tryLock()) { try { ... } finally { lock.unlock(); } } else { ... }`. `lockInterruptibly()` waits like lock but can be interrupted, and `new ReentrantLock(true)` creates a fair lock that grants access roughly in arrival order, at some cost in throughput. The default constructor creates a non-fair lock.",
   "Reentrant means the thread that holds the lock can acquire it again without blocking itself. Each call to `lock()` increments a hold count, and the lock is released to other threads only after an equal number of `unlock()` calls brings the count back to zero. Code that holds the lock can call other methods that lock it again, which is what makes nested helper methods safe. Calling `unlock()` on a lock the current thread does not hold throws `IllegalMonitorStateException`, which is the exception to remember for unlocking too many times or unlocking after a failed tryLock. For data that is read far more often than it is written, `ReentrantReadWriteLock` provides a pair of locks: many readers can hold the read lock together, while a writer gets exclusive access through the write lock.",
   "When choosing among these tools, start simple. A single counter or flag calls for an atomic class. A group of related updates that must look like one step calls for synchronized or a ReentrantLock, and you reach for ReentrantLock specifically when you need tryLock, a timeout, interruptible waiting or fairness. In a production system, those features are what turn a frozen service into one that tells the user \"busy, try again\" and keeps serving everyone else."
  ],
  "analogy": "An atomic counter is like a turnstile at a stadium: each person who pushes through adds exactly one to the count, and two people can never be counted as one. A ReentrantLock is like the key to a storeroom that you must sign out and return. lock() is waiting at the desk until the key comes back, while tryLock() is glancing at the hook and walking away if it is empty. The analogy breaks on reentrancy: in Java the same holder can sign the key out several times and must return it as many times before anyone else can have it.",
  "terms": [
   [
    "AtomicInteger",
    "An int wrapper with atomic, lock-free operations such as incrementAndGet and compareAndSet."
   ],
   [
    "Compare-and-swap (CAS)",
    "An atomic hardware operation that updates a value only if it still equals an expected value."
   ],
   [
    "compareAndSet",
    "An atomic method that sets a new value only if the current value equals the expected one, returning whether it succeeded."
   ],
   [
    "ReentrantLock",
    "An explicit Lock implementation that the holding thread can re-acquire, released by matching unlock calls."
   ],
   [
    "tryLock",
    "A Lock method that tries to acquire the lock without blocking, or within a timeout, and returns whether it succeeded."
   ],
   [
    "IllegalMonitorStateException",
    "Thrown when a thread unlocks a lock it does not hold."
   ],
   [
    "ReentrantReadWriteLock",
    "A lock pair that lets many readers share access while a writer has exclusive access."
   ]
  ],
  "example": "A rate limiter tracks requests with an AtomicLong counter, while a booking system that must update both a seat map and a payment ledger together guards both with one ReentrantLock and uses tryLock with a timeout so a stuck request fails fast instead of hanging.",
  "mistakes": [
   [
    "getAndIncrement() returns the new value.",
    "It returns the old value, like x++. incrementAndGet() returns the new value, like ++x."
   ],
   [
    "Using two AtomicInteger fields makes a transfer between them thread-safe.",
    "Each field is atomic on its own, but other threads can see the moment between the withdrawal and the deposit. A lock is needed to make the two updates appear as one."
   ],
   [
    "Call unlock() in finally even when tryLock() returned false.",
    "If tryLock returned false the thread never acquired the lock, and unlock throws IllegalMonitorStateException. Only unlock after a successful lock or tryLock."
   ],
   [
    "An explicit lock is released automatically at the end of the method, like synchronized.",
    "Nothing releases a ReentrantLock for you. Without unlock in a finally block, an exception leaves the lock held forever."
   ]
  ],
  "tryit": [
   [
    "An inventory service needs to decrement a stock count only if it is above zero, from many threads. A teammate writes if (stock.get() > 0) stock.decrementAndGet(); using an AtomicInteger. Is this safe, and what would you use instead?",
    "It is not safe. The check and the decrement are two separate atomic steps, so two threads can both see 1 and both decrement, leaving -1. Use a single atomic operation such as a compareAndSet retry loop, or updateAndGet(x -> x > 0 ? x - 1 : x), or guard the check and decrement with one lock."
   ],
   [
    "A report generator must update a shared cache, but if another thread is already rebuilding it, the generator should skip the rebuild and use the old cache rather than wait. Which Lock method fits?",
    "tryLock() with no timeout. It returns false at once if another thread holds the lock, so the generator can fall back to the old cache. If it returns true, rebuild inside try and unlock in finally."
   ]
  ],
  "tip": "incrementAndGet returns the new value and getAndIncrement returns the old one. Always unlock in finally, and only after a successful lock or tryLock; unlocking a lock you do not hold throws IllegalMonitorStateException.",
  "check": [
   [
    "If an AtomicInteger holds 5, what does getAndIncrement() return and what is the new value?",
    "It returns 5 and the value becomes 6."
   ],
   [
    "What does tryLock() return if another thread holds the lock?",
    "false, immediately, without waiting."
   ],
   [
    "A thread calls lock() twice on a ReentrantLock. How many unlock() calls release it?",
    "Two; the hold count must return to zero."
   ],
   [
    "Why should the function passed to updateAndGet be free of side effects?",
    "It may be called more than once if another thread changes the value and the update has to retry."
   ]
  ]
 },
 {
  "t": "Concurrent collections: ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue",
  "hook": "Every night at Northfield Freight, a batch job loads shipment events into an in-memory HashMap shared by eight worker threads. Most nights it works. Tonight Imani on the support rotation gets an alert: the job threw a ConcurrentModificationException at 3:12 a.m., and yesterday's run produced counts that do not match the source file. Someone suggests wrapping everything in one big synchronized block, but that would make eight threads behave like one. Another suggests just catching the exception. Imani suspects the real problem is that the wrong kind of collection is being used. Which collection fits each job here, and why?",
  "simple": "Normal Java lists and maps assume only one person is using them at a time. If several workers write in the same notebook at once, pages get scrambled. Java offers special containers built for sharing. ConcurrentHashMap is like a big filing cabinet with many drawers, each with its own lock, so many people can work at once without trampling each other. CopyOnWriteArrayList is like a posted notice: when someone wants to change it, they make a fresh copy with the change and put that up, so readers are never disturbed. A BlockingQueue is like a conveyor belt between a kitchen and servers: cooks put plates on, servers take them off, and if the belt is full or empty, people simply wait their turn.",
  "body": [
   "The ordinary collections such as `ArrayList` and `HashMap` are not thread-safe. If several threads modify one without coordination, you can lose updates, corrupt the internal structure, or get a `ConcurrentModificationException` when one thread iterates while another changes the collection. Wrapping with `Collections.synchronizedList(list)` or `Collections.synchronizedMap(map)` makes each individual method call synchronized on a single lock. That is correct, but it serializes all access, and you must still synchronize manually on the wrapper while iterating, because iteration is many calls, not one. The `java.util.concurrent` package offers collections designed specifically for concurrent use. They spread the locking out, or avoid it entirely, so that threads working on different parts of the data rarely wait for each other. Note that a ConcurrentModificationException is not only a multithreading problem: a single thread that calls `list.remove` inside a for-each loop over an ArrayList triggers it too, because the iterator detects that the list changed underneath it.",
   "`ConcurrentHashMap` allows many threads to read and write at the same time, using fine-grained internal locking for updates and lock-free reads. Its iterators are weakly consistent: they never throw ConcurrentModificationException, and they reflect the state of the map at some point during iteration, possibly including some changes made after the iterator was created. Unlike HashMap, it does not permit null keys or null values and throws `NullPointerException` if you try, because null would be ambiguous with \"no mapping\" in concurrent code. Atomic compound operations such as `putIfAbsent`, `computeIfAbsent`, `compute` and `merge` let you update safely: `counts.merge(word, 1, Integer::sum)` counts words across threads without a separate lock. A get-then-put sequence, by contrast, is still a race, because another thread can act between the two calls even though each call is thread-safe.",
   "`CopyOnWriteArrayList`, and its partner `CopyOnWriteArraySet`, copy the whole underlying array on every modification. Iterators work on a snapshot taken when they were created, so they never throw ConcurrentModificationException and do not see later changes, and the iterator's own `remove` method is unsupported and throws `UnsupportedOperationException`. This design is efficient when reads and iteration vastly outnumber writes, such as a list of event listeners that is registered once and notified constantly. It is wasteful when writes are frequent, because each write costs a full copy.",
   "```java\nList<String> listeners = new CopyOnWriteArrayList<>(List.of(\"a\", \"b\"));\nfor (String s : listeners) listeners.add(s.toUpperCase()); // no exception; loop sees only a, b\nSystem.out.println(listeners);  // [a, b, A, B]\n\nBlockingQueue<String> q = new LinkedBlockingQueue<>(100);\nq.put(\"job\");            // waits if the queue is full\nString job = q.take();   // waits if the queue is empty\nString maybe = q.poll(1, TimeUnit.SECONDS); // null if nothing arrives in time\n```",
   "The loop in the example would throw ConcurrentModificationException with an ArrayList, but with a CopyOnWriteArrayList it finishes normally: the loop iterates over the original snapshot of two elements, and the list ends with four. That snapshot behavior is exactly what exam questions probe. Notice also that the snapshot is cheap to take, because the iterator simply keeps a reference to the array that existed when it started; the cost is paid by writers, who build a new array each time.",
   "A `BlockingQueue` is the backbone of producer-consumer designs. Producers add work, consumers remove it, and the queue handles the waiting so neither side needs explicit locks. Its methods come in four groups, and you should be able to sort them. `add` and `remove` throw exceptions when the queue is full or empty. `offer` and `poll` return false or null immediately. `put` and `take` block until space or an element is available. `offer(e, timeout, unit)` and `poll(timeout, unit)` wait for a limited time. Implementations include `ArrayBlockingQueue`, which is bounded and array-based; `LinkedBlockingQueue`, which is optionally bounded; and `PriorityBlockingQueue`, which orders elements by priority. A bounded queue also provides back-pressure: when consumers fall behind, producers wait instead of filling memory. A `LinkedBlockingQueue` created without a capacity is effectively unbounded, so producers never wait on put, which is convenient until a slow consumer lets the queue grow without limit. Like ConcurrentHashMap, blocking queues reject null elements, because poll uses null to signal that nothing was available.",
   "Other members you may see are `ConcurrentLinkedQueue`, a non-blocking queue; `ConcurrentSkipListMap` and `ConcurrentSkipListSet`, which are sorted, concurrent counterparts of TreeMap and TreeSet; and `LinkedBlockingDeque`, a blocking double-ended queue. Exam questions usually describe a scenario and ask which collection fits, or show a loop that modifies a collection while iterating and ask what happens. Match the access pattern: many readers and writers on a map suggest ConcurrentHashMap, rare writes with constant iteration suggest CopyOnWriteArrayList, and handing work from one group of threads to another suggests a BlockingQueue."
  ],
  "analogy": "A BlockingQueue is like the pass window between a restaurant kitchen and the dining room. Cooks set plates on the shelf and servers pick them up. If the shelf is full, cooks wait before plating more (put blocks); if it is empty, servers wait (take blocks). Nobody has to shout or schedule. offer and poll are like glancing at the shelf and walking off if there is no room or no plate. The analogy stops at priority: a PriorityBlockingQueue serves the most important plate first, not the first one set down.",
  "terms": [
   [
    "ConcurrentHashMap",
    "A thread-safe map allowing concurrent reads and writes, with weakly consistent iterators and no null keys or values."
   ],
   [
    "CopyOnWriteArrayList",
    "A thread-safe list that copies its array on each write; iterators use a snapshot and never throw ConcurrentModificationException."
   ],
   [
    "BlockingQueue",
    "A queue whose put and take methods wait for space or elements, used for producer-consumer handoff."
   ],
   [
    "Weakly consistent iterator",
    "An iterator that tolerates concurrent modification without throwing and may or may not reflect changes made after it was created."
   ],
   [
    "merge",
    "A Map method that atomically combines a new value with an existing one in ConcurrentHashMap, for example to count occurrences."
   ],
   [
    "Back-pressure",
    "Slowing producers when consumers fall behind, as a bounded BlockingQueue does by blocking put."
   ]
  ],
  "example": "A log shipper has several reader threads that put parsed lines on an ArrayBlockingQueue of capacity 10,000 and one sender thread that takes them in batches. When the network slows, the full queue makes readers wait on put instead of running out of memory.",
  "mistakes": [
   [
    "ConcurrentHashMap accepts null values like HashMap does.",
    "It rejects null keys and null values with NullPointerException."
   ],
   [
    "Using ConcurrentHashMap makes any sequence of calls thread-safe.",
    "Each call is thread-safe, but a get followed by a put can still race. Use atomic methods such as merge, compute or putIfAbsent."
   ],
   [
    "A loop that adds to a CopyOnWriteArrayList while iterating will see the new elements.",
    "The iterator uses a snapshot from when it was created, so it sees only the original elements and never throws ConcurrentModificationException."
   ],
   [
    "offer and poll wait when the queue is full or empty.",
    "Without a timeout they return false or null immediately. put and take are the methods that block."
   ]
  ],
  "tryit": [
   [
    "A plugin system keeps a list of about twenty listeners. Listeners are registered at startup and rarely change, but every user action notifies all of them, from many threads, thousands of times per minute. Which collection should hold the listeners?",
    "CopyOnWriteArrayList. Iteration is constant and writes are rare, so the cost of copying on write is negligible, and iteration needs no locking and can never throw ConcurrentModificationException even if a listener is added during notification."
   ],
   [
    "An image service has four threads that download images and two threads that resize them. Downloads sometimes arrive faster than resizing can keep up, and memory usage has spiked. What structure and method choices would fix this?",
    "Put downloaded images on a bounded BlockingQueue such as an ArrayBlockingQueue. Downloaders call put, which waits when the queue is full, and resizers call take, which waits when it is empty. The bound provides back-pressure so memory stays under control."
   ]
  ],
  "tip": "Modifying an ArrayList while iterating it throws ConcurrentModificationException; a CopyOnWriteArrayList does not, and the loop sees the old snapshot. ConcurrentHashMap rejects null keys and values. put/take block, offer/poll do not.",
  "check": [
   [
    "Which BlockingQueue method waits until an element is available?",
    "take() (or poll with a timeout for a limited wait)."
   ],
   [
    "What happens with map.put(\"k\", null) on a ConcurrentHashMap?",
    "It throws NullPointerException; null values are not allowed."
   ],
   [
    "Why is CopyOnWriteArrayList a poor choice for a list updated thousands of times per second?",
    "Every write copies the entire array, which is expensive when writes are frequent."
   ],
   [
    "How can several threads safely count words in a shared ConcurrentHashMap<String, Integer>?",
    "Use counts.merge(word, 1, Integer::sum), which updates atomically, instead of get followed by put."
   ]
  ]
 },
 {
  "t": "Deadlock, starvation and livelock",
  "hook": "At Granite Bay Savings, two customers happen to send money to each other at the same second: Ana pays Ben, and Ben pays Ana. Both transfer requests stop responding. CPU usage on the server is near zero, there are no exceptions in the logs, and every later transfer touching either account hangs too. Jordan, the engineer on call, takes a thread dump and sees a strange pair of lines, each thread waiting for a lock held by the other. A restart clears it, but it happens again the next week. What exactly is going on, and what rule would make it impossible?",
  "simple": "Sometimes a program does not crash but simply stops getting anywhere. There are three classic ways this happens. Deadlock is two people at a narrow doorway, each holding one of two keys the other needs, each refusing to give theirs up, so both wait forever. Livelock is two people in a hallway who both step aside the same way, then the other way, again and again: lots of movement, no progress. Starvation is a polite person who never gets a turn at the coffee machine because others keep cutting in. The usual fixes are simple rules: always pick up keys in the same order, add a little randomness when backing off, and take turns fairly.",
  "body": [
   "Deadlock, starvation and livelock are liveness problems. The program does not crash and may not log anything, but some or all of its threads stop making useful progress. The exam expects you to identify each one from a description, a code sample or a thread state, and to choose a sensible way to prevent it. The distinctions are sharp once you focus on two questions: are the threads waiting or busy, and is everyone stuck or only some?",
   "Deadlock happens when two or more threads each hold a lock that another needs, and each waits forever for the other to release it. The classic case is thread 1 locking A and then trying to lock B, while thread 2 locks B and then tries to lock A. Both end up stuck in the BLOCKED state with synchronized, or in WAITING with explicit locks, and nothing will ever change without outside intervention. Four conditions must all hold for deadlock: mutual exclusion, where a resource can be held by only one thread; hold and wait, where a thread holds one resource while waiting for another; no preemption, meaning a resource cannot be forcibly taken away; and a circular wait among the threads. Remove any one of these conditions and deadlock becomes impossible, which is why every prevention technique can be described as breaking one of them.",
   "```java\n// Thread 1                     // Thread 2\nsynchronized (a) {               synchronized (b) {\n    synchronized (b) { ... }         synchronized (a) { ... }\n}                                }\n// Fix: both threads acquire a first, then b.\n```",
   "To prevent deadlock, break any one of the four conditions. The most common fix is a consistent lock order: every thread acquires multiple locks in the same global order, for example by account number, so a circular wait cannot form. In the banking scenario, a transfer locks the lower-numbered account first regardless of the direction of the payment. Other techniques are holding only one lock at a time where possible, keeping synchronized regions small, and using `tryLock` with a timeout so that a thread that cannot get the second lock releases the first and retries later. To diagnose a deadlock in a running Java Virtual Machine (JVM), take a thread dump, for example with the `jstack` tool or with `jcmd <pid> Thread.print`. The dump lists each thread's state and stack, and the JVM reports detected deadlocks along with the locks each thread holds and is waiting for.",
   "Starvation happens when a thread is ready to run but rarely or never gets the resource it needs, because other threads keep taking it first. Examples include a thread that always loses the race for a non-fair lock, a low-priority thread crowded out by busier ones, or one thread holding a shared lock for a very long time while others wait. Unlike deadlock, the system as a whole keeps working; it is only the starved thread that suffers. The fixes are about fairness: fair locks such as `new ReentrantLock(true)`, which grant access roughly in arrival order; shorter critical sections; and bounded work queues so one kind of work cannot monopolize a pool.",
   "Livelock happens when threads are not blocked at all but keep reacting to each other so that none of them makes progress, like two people in a corridor who repeatedly step aside in the same direction. In code, two threads that each detect a conflict, back off, release their lock and retry at exactly the same moment can repeat that dance forever while burning CPU. A thread dump shows them as RUNNABLE, and that is what distinguishes livelock from deadlock. Adding a randomized delay before retrying, or giving one side priority so it never yields, breaks the symmetry and lets one thread go first. Network protocols use the same idea when two senders collide: each waits a random interval before trying again, so they are unlikely to collide twice.",
   "When reading a scenario, look for the telltale clues. Near-zero CPU with threads BLOCKED or WAITING on each other's locks points to deadlock. High CPU with threads RUNNABLE but no work completed points to livelock. A system that mostly works while one particular thread or request type never finishes points to starvation. A quick summary helps: deadlock means everyone waits and no one moves; livelock means everyone moves but no one gets anywhere; starvation means some threads get the resource and others never do."
  ],
  "analogy": "Picture a four-way intersection with no traffic lights where each car waits for the car on its right. If four cars arrive at once, each waits for another, and nobody ever moves: that is deadlock, and a rule such as \"north-south goes first\" is the lock ordering that fixes it. Two cars that keep inching forward and stopping politely at the same time are livelock. A side-street car that never finds a gap in heavy traffic is starvation. The analogy stops at detection: real drivers can see the jam, but in Java you need a thread dump to see it.",
  "mnemonic": "The four deadlock conditions: \"My Hold Never Circles\" for Mutual exclusion, Hold and wait, No preemption, Circular wait. Break any one and deadlock cannot occur.",
  "terms": [
   [
    "Deadlock",
    "Two or more threads each waiting forever for a lock held by another, forming a cycle."
   ],
   [
    "Starvation",
    "A thread is perpetually denied access to a resource it needs because other threads keep getting it."
   ],
   [
    "Livelock",
    "Threads stay active, repeatedly responding to one another, but make no progress."
   ],
   [
    "Lock ordering",
    "A prevention technique where all threads acquire multiple locks in the same global order."
   ],
   [
    "Fair lock",
    "A lock that grants access roughly in the order threads requested it, reducing starvation."
   ],
   [
    "Thread dump",
    "A snapshot of every thread's state and stack, used to find deadlocks and blocked threads."
   ]
  ],
  "example": "A banking service occasionally freezes during simultaneous transfers between the same two accounts. A thread dump shows two threads each holding one account's lock and waiting for the other. Locking accounts in order of account number fixes it.",
  "mistakes": [
   [
    "Livelocked threads are BLOCKED, just like deadlocked ones.",
    "Livelocked threads are RUNNABLE and actively running, which is why CPU stays high. Deadlocked threads are BLOCKED or WAITING."
   ],
   [
    "Making a lock fair prevents deadlock.",
    "Fairness addresses starvation by ordering waiting threads. It does nothing about a circular wait; consistent lock ordering or tryLock with a timeout does."
   ],
   [
    "Starvation means the whole program has stopped.",
    "In starvation most of the program keeps working; only some threads are repeatedly denied the resource."
   ],
   [
    "Adding more threads will break a deadlock.",
    "New threads that need the same locks simply join the wait. Deadlock must be prevented by design or resolved by restarting the stuck work."
   ]
  ],
  "tryit": [
   [
    "A warehouse system has a method move(Bin from, Bin to) that synchronizes on from and then on to. Under load, the service sometimes hangs with CPU near zero, always when two workers move stock between the same two bins in opposite directions. What is happening, and how would you change move?",
    "It is a deadlock caused by opposite lock order. Fix it by always locking the bins in a consistent order, for example by bin ID: lock the bin with the smaller ID first, then the other, whichever direction the move goes."
   ],
   [
    "Two robot-control threads each grab a shared corridor lock with tryLock, see that the other robot is also requesting the corridor, release the lock to be polite, wait exactly 50 milliseconds and retry. Logs show both retrying for minutes and CPU usage is steady. What is this and how would you fix it?",
    "This is livelock: both threads are active and keep reacting identically. Use a randomized backoff instead of a fixed 50 milliseconds, or give one robot priority, so the symmetry breaks and one thread proceeds."
   ]
  ],
  "tip": "Deadlocked threads are BLOCKED or WAITING; livelocked threads are RUNNABLE and busy. The standard deadlock fix in answer choices is acquiring locks in a consistent order.",
  "check": [
   [
    "Two threads repeatedly release and retry a lock in response to each other, never finishing, while CPU usage stays high. Which problem is this?",
    "Livelock."
   ],
   [
    "What is the simplest way to prevent the lock A / lock B deadlock?",
    "Make every thread acquire the locks in the same order."
   ],
   [
    "What tool output helps confirm a deadlock in a running JVM?",
    "A thread dump, for example from jstack or jcmd Thread.print, which reports deadlocked threads."
   ],
   [
    "A low-priority reporting thread never acquires a busy non-fair lock, while the rest of the application runs normally. What is this called?",
    "Starvation; a fair lock or shorter critical sections would help."
   ]
  ]
 },
 {
  "t": "Scoped values (Java 25): ScopedValue.where(...).run(...) as an alternative to ThreadLocal",
  "hook": "A security review at Orchard Health Portal turns up something alarming: one audit log entry records a lab-result view under the wrong user's name. Sofia, the reviewer, traces it to a ThreadLocal called currentUser. A request handler set it, an exception skipped the cleanup code, and the pooled thread carried that user into the next request it served, which belonged to someone else. The team now runs on virtual threads, and the lead asks whether there is a way to pass the current user deep into the service layer that cannot leak like this. Is there one, and how does it guarantee the value disappears?",
  "simple": "Programs often need to carry a piece of background information, like who is logged in, through many layers of code without passing it by hand to every method. A ThreadLocal is like a sticky note on a worker's desk: anyone can change it, and if nobody peels it off, the next customer finds the old note. A scoped value is more like a visitor badge handed out at the door for one visit. While the visit lasts, anyone inside can read the badge, but nobody can rewrite it, and it is collected automatically when the visit ends. Even if the visit ends badly, the badge still comes back. For example, a museum wristband that only works today and is cut off at the exit.",
  "body": [
   "Applications often need to pass contextual data, such as the current user, a tenant ID or a request ID, down through many layers of method calls without adding a parameter to every method along the way. The traditional tool is `ThreadLocal`, a variable that holds a separate value for each thread. It works, but it has real drawbacks. Any code can call `set` at any time, so it is hard to tell where a value came from. Values live until someone calls `remove`, so in a thread pool a forgotten cleanup leaks one request's data into the next task, and keeps objects in memory. Child threads that inherit values through `InheritableThreadLocal` must copy them. With very large numbers of virtual threads, these costs and risks grow.",
   "Scoped values, finalized in Java 25 as `java.lang.ScopedValue`, solve the same problem with a different model. A scoped value is bound to a value for the duration of one method call, called its dynamic scope, and it is automatically unbound when that call returns, whether normally or by an exception. Within the scope, any method called directly or indirectly can read the value. Outside the scope, the scoped value has no value at all. There is no `set` method, so the binding is effectively immutable for the whole call. That one design decision removes both the leaking and the who-changed-it problems.",
   "```java\nstatic final ScopedValue<String> USER = ScopedValue.newInstance();\n\nvoid handle(Request req) {\n    ScopedValue.where(USER, req.user()).run(() -> service());\n    // here USER is no longer bound\n}\nvoid service() { audit(); }\nvoid audit() {\n    String who = USER.isBound() ? USER.get() : \"anonymous\";\n    System.out.println(\"action by \" + who);\n}\n```",
   "Walk through the example to see the parts. You create a key with `ScopedValue.newInstance()`, usually stored in a `static final` field so every class that needs it can reach the same key. `ScopedValue.where(key, value)` returns a carrier object that holds the binding, and calling `run(Runnable)` on it executes the code with the binding in place; `call(...)` does the same for code that returns a result. Several bindings can be chained before running: `ScopedValue.where(USER, u).where(REQ_ID, id).run(...)`. Inside the scope, `key.get()` returns the bound value, `isBound()` reports whether there is one, and `orElse(other)` returns a fallback when there is not. Calling `get()` when the value is not bound throws `NoSuchElementException`, which is the exception to remember. In the example, `service()` never mentions the user, yet `audit()`, two calls deeper, can still read it.",
   "Although a binding cannot be changed, a nested call can rebind the same key with its own `where(...).run(...)`. Inside the nested scope the new value is visible; when the nested run returns, the outer value is visible again automatically. For example, a request could run as the logged-in user but rebind `USER` to a system account for one privileged maintenance step, and the original user reappears the moment that step finishes. This gives a clear, one-way flow of data from caller to callee, which is much easier to reason about than ThreadLocal's arbitrary set calls from anywhere in the program.",
   "Because each binding ends when its scope ends, there is nothing to clean up, and there is no risk of one request's data appearing in the next task that runs on a pooled thread. The leak described in a typical ThreadLocal incident simply cannot happen. Scoped values are also designed to be cheap to read, and to be shared efficiently with child threads created through structured concurrency, which in Java 25 is still a preview API, so you mostly need to know that the two features are designed to work together. Reading a scoped value is a plain method call with no locking, and because the value cannot change during the scope, all code reading it within that scope sees the same object.",
   "The choice between the two tools comes down to mutability and lifetime. Choose `ThreadLocal` when code truly needs a mutable per-thread value that lives across many unrelated calls, such as a per-thread cache of an expensive, non-thread-safe formatter. Choose a scoped value to pass read-only context through a bounded piece of work, such as one request or one job. On the exam, expect questions about whether a value is still bound after `run` returns, what `get()` does when unbound, and how to supply a different value for part of a computation."
  ],
  "analogy": "A scoped value works like a hotel key card programmed for your stay. During your stay, every door you are entitled to opens, no matter how many hallways you walk through, and nobody can reprogram the card in your pocket. At checkout the card stops working automatically, even if you forget to return it, so the next guest never inherits your access. A ThreadLocal is more like a metal key left at the front desk: it works until someone remembers to take it back. The analogy stops at rebinding: in Java a nested scope can issue a temporary card that reverts to yours when that inner step ends.",
  "terms": [
   [
    "ScopedValue",
    "A value bound for the duration of a call and readable by all code in that call's dynamic scope, then automatically unbound."
   ],
   [
    "ScopedValue.where",
    "Creates a binding of a scoped value key to a value, followed by run or call to execute code with it."
   ],
   [
    "Dynamic scope",
    "The set of code executed during a call, including methods called indirectly, where a binding is visible."
   ],
   [
    "ThreadLocal",
    "A variable with a separate mutable value per thread that persists until removed."
   ],
   [
    "Rebinding",
    "Binding an already bound scoped value to a new value in a nested where(...).run(...) call."
   ],
   [
    "NoSuchElementException",
    "Thrown by ScopedValue.get() when the scoped value is not bound in the current scope."
   ]
  ],
  "example": "A web framework binds the authenticated user with ScopedValue.where(CURRENT_USER, user).run(() -> handler.handle(request)). Deep inside, an audit logger reads CURRENT_USER.get() without the user being passed through every layer, and the binding disappears when the request finishes.",
  "mistakes": [
   [
    "A scoped value can be updated with a set method, like ThreadLocal.",
    "ScopedValue has no set method. The only way to change the visible value is to rebind it in a nested where(...).run(...) call."
   ],
   [
    "After run returns, the scoped value keeps its last value in the caller.",
    "The binding lasts only for the duration of run. Afterwards the caller sees the previous binding, or no binding at all."
   ],
   [
    "get() returns null when the scoped value is not bound.",
    "get() throws NoSuchElementException when unbound. Use isBound() or orElse(...) when the value may be missing."
   ],
   [
    "Scoped values completely replace ThreadLocal for every use.",
    "They suit read-only context for a bounded call. A mutable per-thread cache that lives across many calls is still a ThreadLocal job."
   ]
  ],
  "tryit": [
   [
    "A batch job binds JOB_ID with ScopedValue.where(JOB_ID, \"A17\").run(this::process). Inside process, a helper runs ScopedValue.where(JOB_ID, \"A17-retry\").run(this::retryStep), and after that returns, process logs JOB_ID.get(). What is logged, and what would happen if the same log line ran after the outer run returned?",
    "Inside process after the nested call, it logs A17, because the nested binding ended when retryStep returned and the outer binding is visible again. After the outer run returns, JOB_ID is unbound, so get() would throw NoSuchElementException; isBound() or orElse would avoid that."
   ]
  ],
  "tip": "Scoped values have no set method; the only way to change the visible value is to rebind in a nested scope. get() outside any binding throws NoSuchElementException, so use isBound or orElse when the value may be missing.",
  "check": [
   [
    "After ScopedValue.where(K, \"x\").run(task) returns, is K still bound in the caller?",
    "No. The binding lasts only for the duration of run."
   ],
   [
    "How do you give a scoped value a different value for part of a computation?",
    "Rebind it with a nested ScopedValue.where(K, newValue).run(...) call."
   ],
   [
    "What is one advantage of scoped values over ThreadLocal in thread pools?",
    "Bindings end automatically when the scope ends, so data cannot leak into later tasks and nothing needs removing."
   ],
   [
    "Which method do you use instead of run when the code in the scope must return a result?",
    "call(...), on the carrier returned by ScopedValue.where."
   ]
  ]
 },
 {
  "t": "Path creation and operations: resolve, relativize, normalize, getFileName, getParent",
  "hook": "At Willowbrook Print Studio, customers upload artwork through a web form, and the service saves each file under an uploads folder. One morning Theo, the developer on duty, finds a file named passwd sitting in a directory far outside uploads, and the access log shows a request whose file name was a chain of ../ segments. Nothing was overwritten, thanks to file permissions, but it was close. Theo opens the code and sees the destination built by gluing strings together with slashes. Which Path methods would have turned that sneaky name into something the code could recognize and refuse?",
  "simple": "A Path in Java is just an address for a file or folder, like a street address written on an envelope. Writing the address does not check whether the house exists; it is only text. Java gives you tools to work with these addresses. You can ask for the last part, the file name, or everything before it, the parent folder. You can join two addresses, like adding a room number to a building address, which is resolve. You can tidy up an address that says go into this folder, then back out, which is normalize. And you can ask for directions from one address to another, which is relativize. For example, from your kitchen to the garage might be: back to the hall, then out the side door.",
  "body": [
   "The NIO.2 API in the `java.nio.file` package represents a location in a file system with the `Path` interface. You create a Path with `Path.of(\"data\", \"logs\", \"app.log\")` or with the older equivalent `Paths.get(...)`; both join the parts using the platform's separator. Creating a Path does not touch the disk. The file does not need to exist, and most Path methods are pure manipulation of the name, which is why they never throw `IOException`. A malformed string, such as one containing a character the platform forbids in file names, can make `Path.of` throw the unchecked `InvalidPathException`, but a missing file never does. An absolute path starts from a root, such as `/` on Linux or `C:\\` on Windows. A relative path has no root and is interpreted against the current working directory when it is eventually used.",
   "A path is a sequence of name elements, optionally preceded by a root, and several methods take it apart. For `/data/logs/app.log`, `getFileName()` returns the last element as a Path, `app.log`; `getParent()` returns everything before it, `/data/logs`; and `getRoot()` returns `/`, or null for a relative path. `getNameCount()` counts the elements, not including the root, so it returns 3 here, and `getName(0)` returns the first element after the root, `data`. `subpath(begin, end)` extracts a range of elements with the end index exclusive, so `subpath(1, 3)` is `logs/app.log`, and it never includes the root. Edge cases are favorite exam material: `getParent()` returns null when there is no parent, as for the single-element path `app.log`, and `getFileName()` of the root path `/` is null.",
   "`resolve(other)` joins paths. `Path.of(\"/home/ana\").resolve(\"docs/a.txt\")` gives `/home/ana/docs/a.txt`. The rule to remember is that if the argument is absolute, resolve simply returns the argument: `Path.of(\"/home\").resolve(\"/etc\")` is `/etc`, because an absolute path already says where it starts. `resolveSibling(other)` resolves the argument against this path's parent, which is handy for renaming a file in the same directory: `Path.of(\"/tmp/a.txt\").resolveSibling(\"b.txt\")` is `/tmp/b.txt`. Resolve does not tidy up the result, so redundant elements such as `.` and `..` remain until you normalize.",
   "`relativize(other)` answers the question, how do I get from this path to that one? `Path.of(\"/a/b\").relativize(Path.of(\"/a/c/d\"))` is `../c/d`: go up out of b, then down into c and d. Both paths must be of the same type, both absolute or both relative; mixing them throws `IllegalArgumentException`. On Windows they must also share the same root, so you cannot relativize between drives. `normalize()` removes redundant `.` elements and collapses `name/..` pairs: `Path.of(\"/a/./b/../c\").normalize()` is `/a/c`. It works on the text alone, so it does not follow symbolic links and does not check that anything exists, and a leading `..` in a relative path is kept because there is nothing before it to cancel.",
   "```java\nPath base = Path.of(\"/srv/app\");\nPath cfg  = base.resolve(\"conf/../conf/./app.properties\");\ncfg.normalize();                 // /srv/app/conf/app.properties\ncfg.getFileName();               // app.properties\ncfg.normalize().getParent();     // /srv/app/conf\nbase.relativize(Path.of(\"/srv/logs/x.log\")); // ../logs/x.log\nPath.of(\"a\").getParent();        // null\n```",
   "Notice in the example that `cfg.getParent()` without normalizing would return `/srv/app/conf/../conf/.`, which is technically correct but rarely what you want. Paths are also immutable: methods such as resolve and normalize return new Path objects and leave the original unchanged, so a line that calls `cfg.normalize();` without using the result changes nothing. Exam questions often hide exactly this mistake.",
   "Comparisons between paths also work element by element rather than character by character. `Path.startsWith(Path)` and `endsWith(Path)` match whole name elements, so `Path.of(\"/srv/apple\").startsWith(Path.of(\"/srv/app\"))` is false, even though the same check on plain strings would be true. That is one more reason to keep file locations as Path objects instead of strings. Likewise `equals` compares the paths as written, without normalizing them or checking the disk, so `a/b` and `a/./b` are not equal until both are normalized; `Files.isSameFile` is the method that asks the file system whether two paths point to the same file.",
   "Two methods go beyond pure path text. `toAbsolutePath()` prepends the current working directory to a relative path, still without checking that the file exists. `toRealPath()` returns the canonical path with symbolic links resolved and `..` elements removed, and because it must consult the file system it throws `IOException`, typically `NoSuchFileException`, if the file does not exist. These methods matter for security. Normalizing a resolved path and then checking that it still starts with the expected base directory, using `startsWith`, is a common defensive pattern against path traversal, where user input such as `../../etc/passwd` tries to escape an upload folder. When symbolic links are involved, comparing real paths is stronger still."
  ],
  "analogy": "Working with Path methods is like giving directions in an office building on paper. Writing down \"Floor 3, Room 12\" does not check that the room exists; it is just an address. resolve is adding \"desk 4\" to that address, unless the new note is already a full street address, in which case you just use the new note. normalize is crossing out \"go to Floor 4 and then back down to Floor 3.\" relativize is writing directions from one room to another. The analogy stops at toRealPath, which actually walks the building and fails if the room is not there.",
  "terms": [
   [
    "Path",
    "An interface representing a file system location as a sequence of name elements, optionally with a root."
   ],
   [
    "getFileName / getParent",
    "Return the last name element and everything before it; either can return null for edge cases such as a root or a single element."
   ],
   [
    "resolve",
    "Joins a path to another; returns the argument unchanged if the argument is absolute."
   ],
   [
    "relativize",
    "Builds a relative path from one path to another; both must be absolute or both relative."
   ],
   [
    "normalize",
    "Removes . elements and name/.. pairs by string logic without accessing the file system."
   ],
   [
    "toRealPath",
    "Returns the actual path with links resolved, throwing IOException if the file does not exist."
   ],
   [
    "Path traversal",
    "An attack that uses .. segments in input to reach files outside an intended directory."
   ]
  ],
  "example": "A file upload service builds the destination with uploads.resolve(userFileName).normalize() and rejects the request unless the result still startsWith(uploads). A malicious name containing ../ segments is caught before any file is written.",
  "mistakes": [
   [
    "Path.of throws an exception if the file does not exist.",
    "Creating a Path and most Path methods never touch the disk. Only methods such as toRealPath, or Files operations, check existence."
   ],
   [
    "resolve always appends the argument to the base path.",
    "If the argument is absolute, resolve returns the argument unchanged."
   ],
   [
    "normalize checks the file system and resolves symbolic links.",
    "normalize is purely textual. toRealPath is the method that consults the file system and resolves links."
   ],
   [
    "Calling path.normalize(); on its own line cleans up path.",
    "Path is immutable. normalize returns a new Path, so the result must be assigned or used."
   ]
  ],
  "tryit": [
   [
    "A log viewer receives a relative file name from users and opens Path.of(\"/var/app/logs\").resolve(name). A tester submits ../../../etc/hosts and the viewer displays it. You may add one check before opening the file. What should it be?",
    "Normalize the resolved path and confirm it still starts with the base directory, for example Path target = base.resolve(name).normalize(); then reject the request unless target.startsWith(base). The traversal name normalizes to /etc/hosts, which does not start with /var/app/logs, so it is refused. Rejecting absolute names matters too, because resolve with an absolute argument returns that argument."
   ],
   [
    "A build script computes Path.of(\"/projects/site\").relativize(Path.of(\"assets/logo.png\")) to create a link and crashes. Why, and how would you fix it?",
    "relativize throws IllegalArgumentException because one path is absolute and the other relative. Make both the same type, for example by resolving the relative path against the project root first, then relativize."
   ]
  ],
  "tip": "Resolving an absolute path returns it unchanged, relativize throws IllegalArgumentException when mixing absolute and relative paths, and normalize never checks the disk. Most Path methods do not require the file to exist.",
  "check": [
   [
    "What is Path.of(\"x/y\").resolve(\"/z\")?",
    "/z, because resolving an absolute path returns the argument."
   ],
   [
    "What is Path.of(\"/a/b/c\").relativize(Path.of(\"/a\"))?",
    "../.."
   ],
   [
    "What does Path.of(\"report.txt\").getParent() return?",
    "null, because a single-element relative path has no parent."
   ],
   [
    "What is Path.of(\"../a/./b\").normalize()?",
    "../a/b, because the . is removed and the leading .. is kept."
   ]
  ]
 },
 {
  "t": "Files methods: exists, createDirectory vs createDirectories, copy, move, delete",
  "hook": "On the first of the month, the invoice export at Riverside Dental Group fails before it writes a single file. Kenji, who maintains it, reads the stack trace: NoSuchFileException on the line that creates the folder invoices/2026/10. Last month it worked fine, because someone had created the year folder by hand. A week later a different error appears when the job reruns: FileAlreadyExistsException on the copy of the summary file. The code looks reasonable, and every path is spelled correctly. What do these two exceptions reveal about the exact Files methods Kenji chose, and which ones should he use instead?",
  "simple": "If Path is the address on an envelope, the Files class is the person who actually goes to the house and does things: checks whether it exists, builds a new room, copies furniture, moves boxes or knocks a wall down. Each action has rules. Building one room fails if the floor below it is missing, while the build-everything version adds any missing floors for you. Copying or moving onto a spot that is already taken fails unless you say it is fine to replace what is there. Removing something that is not there fails, unless you use the polite version that just says nothing was removed. For example, a mover will not put your sofa where another sofa already sits unless you say replace it.",
  "body": [
   "Where `Path` only describes a location, the `Files` class contains static methods that actually act on the file system. Most of them throw the checked `IOException` or one of its more specific subclasses, and the exam frequently asks which exception a given call produces. Checking comes first. `Files.exists(path)` and `Files.notExists(path)` test whether something is there. They are not perfect opposites: if the program cannot determine the answer, for example because a parent directory is not readable, both return false. Other common checks are `isDirectory`, `isRegularFile`, `isReadable`, `size` and `isSameFile`, which asks whether two paths point to the same file. Methods that read metadata, such as `size`, throw an IOException when the file is missing, while the boolean checks simply return false, so choose a boolean check when absence is a normal outcome rather than an error.",
   "Creating directories is a classic exam pair. `Files.createDirectory(path)` creates exactly one directory. It throws `FileAlreadyExistsException` if anything already exists at that path, and `NoSuchFileException` if the parent directory is missing. `Files.createDirectories(path)` creates the directory together with any missing parent directories, much like the shell command `mkdir -p`, and it does not throw if the directory already exists, which makes it safe to call on every run. It does still fail if a regular file, rather than a directory, is in the way. For files, `Files.createFile(path)` creates a new empty file and throws FileAlreadyExistsException if one already exists.",
   "Copying follows a cautious default. `Files.copy(source, target)` copies a file and fails with `FileAlreadyExistsException` if the target exists, so you must pass `StandardCopyOption.REPLACE_EXISTING` to overwrite it. Copying a directory creates an empty directory at the target; the directory's contents are not copied, so copying a whole tree requires walking it and copying each entry. Overloads let you copy from an `InputStream` to a Path, such as saving a download, or from a Path to an `OutputStream`. `StandardCopyOption.COPY_ATTRIBUTES` asks for file attributes such as the last modified time to be preserved where the file system supports it.",
   "Moving uses the same options with one addition. `Files.move(source, target)` moves or renames a file, and it also throws FileAlreadyExistsException unless REPLACE_EXISTING is given. Renaming within the same directory is simply a move to a new name. `StandardCopyOption.ATOMIC_MOVE` asks for an all-or-nothing move, so other programs see either the old file or the new one and never a partial result; if the file system cannot guarantee that, the call throws `AtomicMoveNotSupportedException`. Moving an empty directory is allowed. Moving a non-empty directory works when it can be done as a simple rename on the same file system, but `move` will not copy a directory's contents across file systems for you.",
   "```java\nPath dir = Path.of(\"out/reports/2026\");\nFiles.createDirectories(dir);                 // creates out, reports and 2026 as needed\nPath src = Path.of(\"draft.txt\");\nFiles.copy(src, dir.resolve(\"final.txt\"), StandardCopyOption.REPLACE_EXISTING);\nFiles.move(src, Path.of(\"archive/draft.txt\")); // NoSuchFileException if archive is missing\nFiles.delete(Path.of(\"tmp.txt\"));        // NoSuchFileException if absent\nboolean gone = Files.deleteIfExists(Path.of(\"tmp.txt\")); // false, no exception\n```",
   "Deleting has its own pair of methods. `Files.delete(path)` throws `NoSuchFileException` if the path does not exist and `DirectoryNotEmptyException` if it is a directory that still has entries. `Files.deleteIfExists(path)` returns a boolean, false when there was nothing to delete, instead of throwing for a missing file, but it still throws DirectoryNotEmptyException for a non-empty directory. Symbolic links get special treatment: `delete` removes the link itself, not the file it points to, while `exists` follows links by default and reports on the target unless you pass `LinkOption.NOFOLLOW_LINKS`.",
   "Notice that none of the creating, copying or moving methods create missing parent directories, apart from `createDirectories` itself. In the example, moving to `archive/draft.txt` fails with NoSuchFileException if `archive` does not exist, even though the source file is fine. When you read a stack trace, check whether the missing path is the source or the target's parent; both produce the same exception type. The exception's message names the path that could not be found, so reading it carefully usually tells you whether to fix the source, create a folder, or correct a typo in the target name.",
   "Finally, checking `exists` and then acting on the answer is a race if another process can change the file in between, a pattern often called check-then-act or time-of-check to time-of-use. Where possible, simply attempt the operation and handle the specific exception. `createFile`, and the `CREATE_NEW` open option used when writing, fail safely if a file already exists, which is also the defensive choice for temporary or lock files that must not be silently overwritten."
  ],
  "analogy": "Think of Files methods as instructions to a building contractor. createDirectory is \"add one room on floor three\": it fails if floor two was never built. createDirectories is \"build whatever floors and rooms are needed to get there.\" copy and move are furniture deliveries that refuse to stack a new sofa on an old one unless you sign a replace-existing form. delete is demolition, which refuses to knock down a room still full of furniture. The analogy stops at copying a directory: a real contractor would bring the furniture, but Files.copy brings only an empty room.",
  "terms": [
   [
    "Files.exists / notExists",
    "Test whether a path exists; both return false when existence cannot be determined."
   ],
   [
    "Files.createDirectories",
    "Creates a directory and all missing parents, without failing if the directory already exists."
   ],
   [
    "FileAlreadyExistsException",
    "Thrown when an operation would create or overwrite a path that already exists without permission to replace it."
   ],
   [
    "NoSuchFileException",
    "Thrown when a required file or parent directory does not exist."
   ],
   [
    "REPLACE_EXISTING",
    "A StandardCopyOption that lets copy or move overwrite an existing target."
   ],
   [
    "ATOMIC_MOVE",
    "A move option requesting an all-or-nothing move, failing if the file system cannot guarantee it."
   ],
   [
    "DirectoryNotEmptyException",
    "Thrown when trying to delete a directory that still contains entries."
   ]
  ],
  "example": "A nightly job writes to reports/2026/09 using Files.createDirectories so the first run of each month creates the folders, writes to a temporary file, and then uses Files.move with ATOMIC_MOVE and REPLACE_EXISTING so readers never see a half-written report.",
  "mistakes": [
   [
    "createDirectory creates missing parent directories.",
    "createDirectory creates one directory and throws NoSuchFileException if the parent is missing. createDirectories creates the parents too."
   ],
   [
    "Files.copy overwrites an existing target by default.",
    "copy and move throw FileAlreadyExistsException unless REPLACE_EXISTING is passed."
   ],
   [
    "Files.copy on a directory copies everything inside it.",
    "It creates only an empty directory at the target. Copying a tree means walking it and copying each entry."
   ],
   [
    "deleteIfExists never throws.",
    "It returns false for a missing file but still throws DirectoryNotEmptyException for a non-empty directory, and other IOExceptions for problems such as permissions."
   ]
  ],
  "tryit": [
   [
    "A photo app saves uploads to media/<year>/<month>/<id>.jpg. Each upload calls Files.createDirectory on the month folder before writing, and the second upload of every month crashes. Which exception is thrown, and what one-word change to the method name fixes it?",
    "The second call throws FileAlreadyExistsException because the month folder already exists, and the very first upload of a new year would throw NoSuchFileException because the year folder is missing. Changing createDirectory to createDirectories fixes both: it creates missing parents and does nothing if the directory already exists."
   ],
   [
    "A cleanup task calls Files.delete(tempDir) at the end of a job, but tempDir still contains a few scratch files. What happens, and what would you do instead?",
    "Files.delete throws DirectoryNotEmptyException. Delete the contents first, for example by walking the tree and deleting files before their directories, then delete the directory itself."
   ]
  ],
  "tip": "createDirectory fails if the directory exists or the parent is missing; createDirectories handles both. copy and move fail on an existing target unless REPLACE_EXISTING is given. delete throws for a missing file; deleteIfExists returns false.",
  "check": [
   [
    "What happens with Files.createDirectory(Path.of(\"a/b\")) when a does not exist?",
    "It throws NoSuchFileException because the parent is missing; createDirectories would create both."
   ],
   [
    "Does Files.copy on a directory copy its files?",
    "No. It creates an empty directory at the target; the contents are not copied."
   ],
   [
    "What does Files.delete throw for a directory with files in it?",
    "DirectoryNotEmptyException."
   ],
   [
    "What does Files.move(a, b) do when b already exists and no options are given?",
    "It throws FileAlreadyExistsException; pass REPLACE_EXISTING to overwrite."
   ]
  ]
 },
 {
  "t": "Reading and writing text with Files.readAllLines, Files.lines, Files.writeString",
  "hook": "At Summit Cycling Club, the membership tool keeps an activity log, one line per ride. Grace volunteers on the tech committee, and this week two strange things happen. First, the monthly summary job dies with an OutOfMemoryError after the log passes a few gigabytes. Second, after a small fix to the notes feature, every member's saved notes file contains only the most recent note; everything older is gone. No one deleted anything on purpose. Both bugs trace back to single-line calls on the Files class. Which calls were they, and what should each have been?",
  "simple": "Java gives you quick one-line tools for reading and writing text files. Some tools read the whole file into memory at once, like photocopying an entire book before reading it. That is easy, but a huge book will not fit on your desk. Another tool reads one line at a time as you need it, like reading a book page by page; it handles any size, but you must close the book when you are done. For writing, the quick tool replaces whatever was in the file unless you specifically say add to the end. For example, writing on a whiteboard after wiping it clean versus writing below what is already there.",
  "body": [
   "The `Files` class offers convenient one-call methods for reading and writing text. Unless you pass a `Charset`, they use UTF-8, an encoding that can represent any Unicode character, regardless of the platform's default. Each one is a shortcut for opening a channel, reading or writing, and closing it again, which removes a lot of boilerplate and the risk of forgetting to close. Choosing among them comes down to two questions: how large is the file, and do you need all of its contents at once or can you process it line by line?",
   "`Files.readAllLines(path)` reads the entire file and returns a `List<String>` with one element per line and the line terminators removed. `Files.readString(path)` returns the whole file as a single String, terminators included. Both are simple, and both open and close the file themselves, so there is nothing to clean up. The trade-off is that they load everything into memory, which suits small and medium files such as configuration or short reports, and fails on very large ones. If the file contains bytes that are not valid in the charset, reading fails with a `MalformedInputException`, which is a kind of IOException.",
   "`Files.lines(path)` takes a different approach and returns a `Stream<String>` that reads lines lazily, only as the stream is consumed. That makes it suitable for very large files, because only a small part of the file is in memory at a time, and it combines naturally with stream operations such as `filter`, `map` and `limit`. A `limit(10)` really does stop reading after ten lines. Because the stream holds an open file handle, you must close it, normally with try-with-resources. An I/O error that occurs while the stream is being consumed surfaces as an `UncheckedIOException`, because the lambdas inside a stream pipeline cannot throw checked exceptions. `Files.newBufferedReader(path)` is the non-stream alternative for line-by-line reading with `readLine()`, which returns null at the end of the file. Like the stream, the reader must be closed, so it also belongs in try-with-resources.",
   "```java\nPath log = Path.of(\"app.log\");\nList<String> all = Files.readAllLines(log);          // whole file in memory\ntry (Stream<String> lines = Files.lines(log)) {      // lazy, must be closed\n    long errors = lines.filter(l -> l.contains(\"ERROR\")).count();\n}\nFiles.writeString(Path.of(\"out.txt\"), \"first line\\n\");\nFiles.writeString(Path.of(\"out.txt\"), \"second line\\n\", StandardOpenOption.APPEND);\nFiles.write(Path.of(\"list.txt\"), List.of(\"a\", \"b\"));  // one element per line\n```",
   "Writing has its own family. `Files.writeString(path, text)` writes any `CharSequence`, such as a String or StringBuilder. With no options it behaves as if you passed CREATE, TRUNCATE_EXISTING and WRITE: it creates the file if it is missing and replaces any existing content. `Files.write(path, lines)` writes an Iterable of strings, such as a List, and adds a line separator after each element, while `Files.write(path, bytes)` writes a byte array exactly as given. Note that writeString does not add a line terminator for you, which is why the example includes `\\n` in each string. For incremental output, such as writing a report row by row, `Files.newBufferedWriter(path)` returns a writer you should also close with try-with-resources.",
   "Open options change the default behavior, and passing any option replaces the defaults rather than adding to them. `StandardOpenOption.APPEND` adds to the end of the file instead of truncating it. If you pass only APPEND and the file does not exist, you get `NoSuchFileException`, because CREATE is no longer implied, so combine APPEND with CREATE when the file may be missing. `CREATE_NEW` fails with FileAlreadyExistsException if the file exists, which is useful when you must never overwrite. Remember also that the parent directory must already exist; none of these methods create directories, so a missing folder produces NoSuchFileException.",
   "Put together, the opening scenario resolves neatly. The summary job should replace `readAllLines` with `Files.lines` inside try-with-resources, so a multi-gigabyte log is read one line at a time. The notes feature should pass `StandardOpenOption.CREATE` and `StandardOpenOption.APPEND` so each new note is added rather than replacing the file.",
   "For the exam, focus on three things: the return types, which are List for readAllLines, Stream for lines and String for readString; the need to close the stream returned by `Files.lines`; and the default truncate behavior of the write methods, together with how APPEND and CREATE change it. Also expect to recognize the exceptions: NoSuchFileException for a missing file or parent folder, FileAlreadyExistsException with CREATE_NEW, MalformedInputException for bad encoding when reading eagerly, and UncheckedIOException for errors inside a stream pipeline."
  ],
  "analogy": "readAllLines is like photocopying an entire binder so you can flip through it at your desk: convenient, but a warehouse of binders will not fit on the desk. Files.lines is like reading the binder one page at a time at the shelf, which works for any size but means you must put the binder back when you finish, which is closing the stream. writeString with no options is like writing on a fresh sheet that replaces the old one; APPEND is writing at the bottom of the existing page. The analogy stops at encoding: Java also needs to know the charset to read the page correctly.",
  "terms": [
   [
    "Files.readAllLines",
    "Reads an entire file into a List<String>, one element per line, and closes the file."
   ],
   [
    "Files.readString",
    "Reads an entire file into one String and closes the file."
   ],
   [
    "Files.lines",
    "Returns a lazily populated Stream<String> of the file's lines that must be closed after use."
   ],
   [
    "Files.writeString",
    "Writes a CharSequence to a file, by default creating it or truncating existing content."
   ],
   [
    "StandardOpenOption.APPEND",
    "An open option that writes at the end of an existing file instead of replacing its content."
   ],
   [
    "CREATE_NEW",
    "An open option that creates a new file and fails with FileAlreadyExistsException if it already exists."
   ],
   [
    "UncheckedIOException",
    "An unchecked wrapper for an IOException, used when I/O fails inside stream processing."
   ]
  ],
  "example": "A support engineer needs to count failed logins in a 20 GB authentication log. Files.readAllLines would exhaust memory, so they use try (Stream<String> s = Files.lines(log)) { s.filter(...).count(); }, which reads one line at a time and closes the file afterwards.",
  "mistakes": [
   [
    "Files.lines reads the whole file into memory, like readAllLines.",
    "Files.lines is lazy and reads lines as the stream is consumed, which is why it suits very large files. readAllLines loads everything."
   ],
   [
    "The stream from Files.lines closes itself when the terminal operation finishes.",
    "It keeps the file open until the stream is closed. Use try-with-resources."
   ],
   [
    "Files.writeString appends to an existing file by default.",
    "The defaults include TRUNCATE_EXISTING, so existing content is replaced. Pass APPEND, usually with CREATE, to add to the end."
   ],
   [
    "Passing APPEND keeps the default CREATE behavior.",
    "Any options you pass replace the defaults. APPEND alone on a missing file throws NoSuchFileException."
   ]
  ],
  "tryit": [
   [
    "A nightly job must print the first five lines that contain the word WARN from a 15 GB server log, then stop. A teammate proposes Files.readAllLines(log).stream().filter(...).limit(5). What would you use instead, and why?",
    "Use try (Stream<String> s = Files.lines(log)) { s.filter(l -> l.contains(\"WARN\")).limit(5).forEach(System.out::println); }. readAllLines would try to load all 15 GB into memory first. Files.lines reads lazily, so it stops reading soon after the fifth match, and try-with-resources closes the file."
   ],
   [
    "An audit feature calls Files.writeString(auditFile, entry, StandardOpenOption.APPEND) and works in testing, but on a brand-new server the first audit entry fails with NoSuchFileException. What is wrong?",
    "Passing APPEND replaces the default options, so CREATE is no longer implied and the missing file is not created. Pass both StandardOpenOption.CREATE and StandardOpenOption.APPEND, and make sure the parent directory exists."
   ]
  ],
  "tip": "readAllLines returns a List and closes the file; lines returns a Stream that you must close. writeString without options truncates existing content, and APPEND alone fails if the file is missing.",
  "check": [
   [
    "Which method is appropriate for a file too large to fit in memory?",
    "Files.lines (or a BufferedReader), which reads lazily line by line."
   ],
   [
    "What happens if you call Files.writeString(path, \"x\") on a file that already has content?",
    "The existing content is replaced, because the default options include TRUNCATE_EXISTING."
   ],
   [
    "Why should Files.lines be used in try-with-resources?",
    "The returned stream keeps the file open until the stream is closed."
   ],
   [
    "What does Files.write(path, List.of(\"a\", \"b\")) write?",
    "Two lines, a and b, each followed by a line separator, replacing any existing content."
   ]
  ]
 },
 {
  "t": "Walking file trees: Files.list vs Files.walk vs Files.find",
  "hook": "The build server at Maplewood Software has a disk that keeps filling up, and Nora on the infrastructure team is asked to write a quick Java utility that reports every file larger than one megabyte under the project directories. Her first version uses Files.list and finds almost nothing, which is clearly wrong. Her second version uses Files.walk with a filter that calls Files.size on every path; it works, but it is slow and occasionally crashes partway through with an exception she did not expect. A colleague mentions a third method she has never tried. What are the real differences between these three, and which one fits this job?",
  "simple": "Imagine looking through folders on a computer. Files.list is like opening one folder and seeing what is directly inside it, without opening any folders within it. Files.walk is like opening a folder, then every folder inside it, and every folder inside those, all the way down, and listing everything you pass, including the folder you started in. Files.find does the same deep search, but you hand it a rule, such as only files bigger than a megabyte, and it uses information it already has about each file to check the rule quickly. All three hand you results one at a time, and all three must be closed when you are done, like turning off a flashlight after searching a dark attic.",
  "body": [
   "Three methods in the `Files` class return a `Stream<Path>` describing directory contents, and the differences between them are a common exam question. They have three things in common. All three are lazy, reading entries only as the stream is consumed. All three hold open directory handles while the stream is in use. And all three should therefore be used in try-with-resources, so the handles are released even if processing stops early or throws an exception.",
   "`Files.list(dir)` returns the entries directly inside one directory: its files and subdirectories, but not the contents of those subdirectories. It is not recursive, and the directory itself is not included in the stream. If the path is not a directory, it throws `NotDirectoryException`. A good mental model is the `ls` command run on one folder. The order of the entries is not specified, so sort the stream if you need a predictable listing. In the opening scenario, Files.list found almost nothing because the large files lived in nested build folders that list never opens.",
   "`Files.walk(start)` traverses the whole tree depth-first. The first element of the stream is `start` itself, and from there it descends into every subdirectory, all the way down. `Files.walk(start, maxDepth)` limits how deep it goes: a maxDepth of 0 returns only the start path, 1 returns the start plus its direct children, 2 adds grandchildren, and so on. So `Files.walk(dir, 1)` is like `Files.list(dir)` plus `dir` itself. By default walk does not follow symbolic links. Passing `FileVisitOption.FOLLOW_LINKS` makes it follow them, and if a link creates a cycle, the walk fails with a `FileSystemLoopException` wrapped in an `UncheckedIOException`.",
   "`Files.find(start, maxDepth, matcher)` also walks the tree depth-first, but filters as it goes. The matcher is a `BiPredicate<Path, BasicFileAttributes>`, so your test receives both the path and the file's basic attributes, such as its size, its creation and modification times, and whether it is a regular file, a directory or a symbolic link. Those attributes are read as part of the walk, so you avoid an extra file system call per file. Unlike walk, the maxDepth parameter is required; there is no overload without it. Using find is usually more efficient than walk followed by a filter that calls `Files.size` or `Files.isDirectory` on every path, which is exactly why Nora's second version was slow.",
   "```java\nPath root = Path.of(\"project\");\ntry (Stream<Path> s = Files.list(root)) {\n    s.forEach(System.out::println);               // direct children only\n}\ntry (Stream<Path> s = Files.walk(root)) {\n    long javaFiles = s.filter(p -> p.toString().endsWith(\".java\")).count();\n}\ntry (Stream<Path> s = Files.find(root, 10,\n        (p, attr) -> attr.isRegularFile() && attr.size() > 1_000_000)) {\n    s.forEach(p -> System.out.println(\"large: \" + p));\n}\n```",
   "Error handling differs from most Files methods. Opening the stream can throw a checked IOException, for example if the start path does not exist. But errors that happen while the stream is being consumed, such as reaching a subdirectory the program is not permitted to read, are thrown as `UncheckedIOException`, because the stream's internal iteration cannot throw checked exceptions. That explains the crash partway through in the opening scenario: one protected build folder ended the whole walk. Code that must survive such folders needs either a try-catch around the stream processing or a different approach. Catching UncheckedIOException and calling `getCause()` gives you the underlying IOException, such as an `AccessDeniedException`, with the path that failed.",
   "That different approach is the older `Files.walkFileTree(start, visitor)`, which takes a `FileVisitor`, usually a subclass of `SimpleFileVisitor`. You override methods such as `preVisitDirectory`, `visitFile`, `visitFileFailed` and `postVisitDirectory`, and each returns a `FileVisitResult` that can continue the walk, skip a subtree, skip remaining siblings or terminate. Overriding visitFileFailed lets you log an unreadable entry and keep going. walkFileTree is also the standard way to delete a directory tree, because each directory must be emptied before it can be deleted: delete files in visitFile and delete each directory in postVisitDirectory, which runs after all of its entries have been visited.",
   "To choose quickly on the exam, ask three questions. Do you need only one level? Use list. Do you need the whole tree, or a few levels including the start directory? Use walk, with a maxDepth if needed. Do you need to filter on size, dates or file type? Use find, remembering that maxDepth is required and the matcher takes a Path and BasicFileAttributes."
  ],
  "analogy": "Searching file trees is like searching a library. Files.list is reading the sign on one shelf to see which books and boxes are on it, without opening any boxes. Files.walk is walking every aisle, opening every box and sub-box, and writing down everything, starting with the shelf you began at. Files.find is the same complete walk, but you carry a checklist and glance at each book's spine label, which already shows its size and date, instead of pulling each one out to check. The analogy stops at closing: in Java you must close the stream when finished.",
  "terms": [
   [
    "Files.list",
    "Returns a lazy Stream<Path> of the direct entries of one directory, without recursion and without the directory itself."
   ],
   [
    "Files.walk",
    "Returns a lazy depth-first Stream<Path> of a directory tree, including the start path, optionally limited by maxDepth."
   ],
   [
    "Files.find",
    "Walks a tree to a required maxDepth and returns paths matching a BiPredicate<Path, BasicFileAttributes>."
   ],
   [
    "BasicFileAttributes",
    "An interface exposing size, timestamps and file type information read with the directory entry."
   ],
   [
    "FOLLOW_LINKS",
    "A FileVisitOption that makes walk and find follow symbolic links."
   ],
   [
    "Files.walkFileTree",
    "Walks a tree with a FileVisitor whose callbacks control the walk, used for tasks such as deleting a directory tree."
   ]
  ],
  "example": "A cleanup script uses Files.find(logDir, 3, (p, a) -> a.isRegularFile() && a.lastModifiedTime().toInstant().isBefore(cutoff)) to find old log files without calling Files.getLastModifiedTime separately for each file, then deletes each match.",
  "mistakes": [
   [
    "Files.list is recursive.",
    "list returns only the direct entries of one directory. walk and find are the recursive methods."
   ],
   [
    "Files.walk(dir) returns only the contents of dir.",
    "The start path itself is the first element of the stream."
   ],
   [
    "Files.find has an overload without maxDepth, like walk.",
    "find always requires maxDepth along with the start path and the BiPredicate matcher."
   ],
   [
    "An unreadable subdirectory during a walk throws a checked IOException you must declare.",
    "Errors during stream consumption are thrown as UncheckedIOException. Only opening the stream throws the checked IOException."
   ]
  ],
  "tryit": [
   [
    "A backup tool must list the files and folders directly inside a user's home directory to show in a menu, without descending into any subfolders, and must not include the home directory itself in the list. Which method fits, and what code shape would you use?",
    "Files.list(home), inside try-with-resources: try (Stream<Path> s = Files.list(home)) { ... }. It returns only direct entries and excludes the directory itself. Files.walk(home, 1) would also include home as the first element."
   ],
   [
    "An auditor wants every regular file modified in the last day anywhere under /srv/data, up to 20 levels deep. One teammate suggests Files.walk with a filter calling Files.getLastModifiedTime on each path; another suggests Files.find. Which is better and why?",
    "Files.find(root, 20, (p, a) -> a.isRegularFile() && a.lastModifiedTime().toInstant().isAfter(cutoff)). The matcher receives BasicFileAttributes read during the walk, so it avoids an extra file system call per path and avoids handling a checked exception inside the filter lambda."
   ]
  ],
  "tip": "list is one level and excludes the start directory; walk is recursive and includes the start directory; find requires maxDepth and a BiPredicate taking attributes. All return streams that must be closed.",
  "check": [
   [
    "Does Files.walk(dir) include dir itself in the stream?",
    "Yes. The start path is the first element."
   ],
   [
    "What does Files.walk(dir, 0) return?",
    "A stream containing only dir."
   ],
   [
    "What are the parameter types of the matcher passed to Files.find?",
    "Path and BasicFileAttributes, in a BiPredicate."
   ],
   [
    "Why is walkFileTree the usual choice for deleting a directory tree?",
    "Its postVisitDirectory callback runs after a directory's entries are visited, so files can be deleted first and each directory deleted once it is empty."
   ]
  ]
 },
 {
  "t": "Byte and character streams, BufferedReader and BufferedWriter",
  "hook": "It is 2 a.m. and Priya, on call for Lantern Logistics, gets paged: the nightly manifest export has been running for forty minutes and the warehouse scanners are waiting. She opens the code and finds a loop that writes each field of 100,000 rows straight to a FileWriter, one tiny write at a time. A colleague's patch from last week tried to fix it by wrapping the writer in a BufferedWriter, but now the output file is sometimes missing its last few hundred lines. Two problems, one class family. Why does buffering make such a difference, and where did those final lines go?",
  "simple": "A program often needs to read from or write to a file. Java moves that data through \"streams\", which are like pipes. Some pipes carry raw bytes, the tiny numbers a computer stores everything as, which is right for pictures or other non-text files. Other pipes carry characters, meaning letters and symbols, which is right for text. A buffered pipe adds a holding tank: instead of fetching one drop at a time, it fills a bucket and hands you drops from the bucket. Think of carrying groceries: one trip with a big bag is far faster than a separate trip for every apple. The catch is that whatever is still in the bag when you stop has to be unloaded, which is what flushing or closing does.",
  "body": [
   "Start by separating two meanings of the word stream. The original `java.io` package, still widely used, organizes input and output (I/O) into streams, and these have nothing to do with the `java.util.stream` Stream API used with lambdas. An I/O stream is a one-way channel to a source or destination such as a file, a socket or the console. Within `java.io` there are two families. Byte streams read and write raw 8-bit bytes and descend from the abstract classes `InputStream` and `OutputStream`. Character streams read and write text as chars and descend from the abstract classes `Reader` and `Writer`. The class name tells you which family you are looking at: names ending in Stream handle bytes, and names ending in Reader or Writer handle characters. That simple naming rule answers a surprising number of exam questions.",
   "Choosing the family depends on the data. Use byte streams for binary data such as images, archives or serialized objects, with classes like `FileInputStream`, `FileOutputStream`, `BufferedInputStream` and `ObjectInputStream`. Use character streams for text, because they decode bytes into characters using a charset, the rule that maps bytes to characters: `FileReader`, `FileWriter`, `BufferedReader` and `PrintWriter`. When you already have a byte stream but need text, `InputStreamReader` and `OutputStreamWriter` act as bridges. They wrap a byte stream and apply a charset, for example `new InputStreamReader(System.in, StandardCharsets.UTF_8)`. Since Java 18 the default charset is UTF-8, so a FileReader created without a charset decodes UTF-8 regardless of the operating system, which removed a long-standing source of garbled text when files moved between machines.",
   "Next, understand how the classes fit together. Streams follow the decorator pattern: low-level streams connect directly to a source such as a file, and high-level streams wrap another stream to add features such as buffering, line handling, formatting or object reading. You build a chain by passing one stream into the constructor of another, as in `new BufferedReader(new FileReader(\"in.txt\"))`. Buffering is the most important feature. Reading one byte or char at a time directly from a file makes a request to the operating system each time, and those system calls are slow. A buffered stream reads a large block into memory and serves your small reads from it, and a buffered writer collects small writes and sends them in large blocks. Closing the outermost stream closes the ones it wraps, so you only need to close the outer wrapper.",
   "```java\ntry (var in = new BufferedReader(new FileReader(\"in.txt\"));\n     var out = new BufferedWriter(new FileWriter(\"out.txt\"))) {\n    String line;\n    while ((line = in.readLine()) != null) {   // null means end of file\n        out.write(line.toUpperCase());\n        out.newLine();                          // platform line separator\n    }\n}   // closing flushes out, then both files are closed\n```",
   "Exam questions often hinge on return values, so learn them precisely. `InputStream.read()` returns the next byte as an int from 0 to 255, or -1 at the end of the stream. `Reader.read()` returns the next char as an int, or -1 at the end. The array version, `read(byte[])` or `read(char[])`, returns how many items were placed in the array, or -1 when nothing remains. `BufferedReader.readLine()` returns a line without its line terminator, or null at end of file. Notice the asymmetry: the single-value methods signal the end with -1 because they return an int, while readLine signals it with null because it returns a String. A loop that compares readLine to -1 will not compile.",
   "On the writing side, `BufferedWriter.newLine()` writes the platform line separator, and `flush()` forces any buffered data out to the underlying stream. Forgetting to flush or close a writer is the classic cause of output that is missing from the end of a file: the last partial buffer was still in memory when the program moved on or exited. Closing a writer flushes it first, which is one more reason to use try-with-resources so the close happens even when an exception interrupts the loop.",
   "Several convenience classes and methods round out the picture. `PrintWriter` and `PrintStream`, the latter being the type of `System.out`, add `print`, `println`, `printf` and `format`. These methods never throw IOException; instead they set an internal error flag that you can test with `checkError()`. That makes them pleasant for logging but means a failing disk can go unnoticed unless you check. `new FileWriter(\"log.txt\", true)` opens a file in append mode rather than truncating it, and `FileOutputStream` has the same boolean parameter. `InputStream.transferTo(OutputStream)` copies all remaining bytes from an input stream to an output stream in one call, replacing the hand-written copy loop.",
   "Finally, the `java.nio.file.Files` class offers modern factories for the same objects. `Files.newBufferedReader(path)` and `Files.newBufferedWriter(path, options)` return a BufferedReader and BufferedWriter that default to UTF-8 and accept the same open options, such as `StandardOpenOption.APPEND`, as the other Files methods. They are often the cleanest way to obtain a buffered text stream in new code. For the exam, be ready to identify which family a class belongs to, choose the right bridge, predict what a read loop prints, and explain why output went missing."
  ],
  "analogy": "Picture a kitchen faucet and a water jug. Reading byte by byte is like filling a glass by turning the faucet on and off for every single drop. A BufferedReader fills a jug once and lets you pour many glasses from it. Writing works the same way in reverse: a BufferedWriter fills a jug before emptying it into the tank. The analogy stops where flushing begins: water left in a real jug is still visible, but data left in a writer's buffer silently vanishes if you never flush or close it.",
  "terms": [
   [
    "Byte stream",
    "An InputStream or OutputStream that transfers raw bytes, suited to binary data such as images or serialized objects."
   ],
   [
    "Character stream",
    "A Reader or Writer that transfers characters, decoding and encoding bytes with a charset."
   ],
   [
    "InputStreamReader",
    "A bridge that wraps a byte InputStream and decodes it into characters using a charset."
   ],
   [
    "BufferedReader",
    "A Reader that buffers input and provides readLine(), which returns null at end of file."
   ],
   [
    "BufferedWriter",
    "A Writer that collects output in memory, writes it in blocks and provides newLine()."
   ],
   [
    "flush",
    "Forces any buffered output to be written to the underlying destination."
   ]
  ],
  "example": "A CSV export writes 100,000 rows with a BufferedWriter wrapped around a FileWriter, calling newLine() after each row. Without buffering, each small write would hit the disk separately and the export took minutes; with it, the export finishes in seconds. Declaring the writer in try-with-resources guarantees the final buffer is flushed when the loop ends.",
  "mistakes": [
   [
    "Comparing the result of readLine() to -1 to detect the end of the file.",
    "readLine() returns a String, so the end is signaled by null. Only the int-returning read() methods use -1."
   ],
   [
    "Choosing FileInputStream to read a text file line by line.",
    "Byte streams have no readLine and do not decode characters. Use a BufferedReader around a FileReader, or Files.newBufferedReader."
   ],
   [
    "Believing data is on disk as soon as write() returns on a BufferedWriter.",
    "It may still be in the buffer. Call flush() or close the writer, ideally with try-with-resources, to guarantee it is written."
   ],
   [
    "Closing every stream in a wrapped chain individually, inner first.",
    "Closing the outermost wrapper closes the inner streams. Closing the inner one first can lose data still buffered in the outer wrapper."
   ]
  ],
  "tryit": [
   [
    "Sam needs to read a large UTF-8 text log, keep only lines containing ERROR and write them to a new file, as fast as possible. He is choosing between FileInputStream with read() in a loop and a BufferedReader with a BufferedWriter. Which should he pick, and what must he make sure happens at the end?",
    "A BufferedReader (around a FileReader, or from Files.newBufferedReader) and a BufferedWriter. The data is text and he needs whole lines, which readLine provides, and buffering avoids a system call per character. He must close the writer, best with try-with-resources, so the final buffered lines are flushed to the file."
   ]
  ],
  "tip": "End-of-data signals differ: read() returns -1, readLine() returns null. Classes ending in Stream handle bytes; Reader and Writer handle characters. Closing the outer wrapper closes the inner stream, and closing a writer flushes it.",
  "check": [
   [
    "What does BufferedReader.readLine() return at end of file?",
    "null, because it returns a String; only the int-returning read() methods use -1."
   ],
   [
    "Which class converts a byte InputStream into a character Reader?",
    "InputStreamReader, which wraps the byte stream and applies a charset."
   ],
   [
    "Why might output be missing from a file written with BufferedWriter?",
    "The writer was not flushed or closed, so the last buffered data was never written."
   ],
   [
    "Do PrintWriter's println methods throw IOException?",
    "No. They set an internal error flag that you check with checkError()."
   ]
  ]
 },
 {
  "t": "Console and standard input/output",
  "hook": "Diego maintains a small command-line tool that the operations team at Cedar Valley Health uses to rotate service passwords. A security reviewer, Ruth, asks him two pointed questions on a Tuesday morning. First, why does the password appear on screen while it is typed, where anyone walking past can read it? Second, why do nightly scripts that capture the tool's output keep finding error messages mixed into the data they parse? Diego also mentions that the tool crashes with a NullPointerException when he runs it inside his IDE. Three complaints, one topic. What does Java give him to fix all of them?",
  "simple": "Every program has three built-in pipes. One brings in what the user types, one sends out normal results, and one sends out error messages. Keeping errors in their own pipe means you can save the normal results to a file while still seeing problems on the screen. Java also has a Console helper for interactive programs. It can ask a question and read the answer, and it can read a password without showing the letters as they are typed, like the dots on an ATM screen. Sometimes there is no real keyboard window attached, for example when a program runs in the background, and then Java gives you no Console at all, so your code must check before using it.",
  "body": [
   "Begin with the three standard streams that every Java program has, available as static fields of `System`. `System.in` is an `InputStream` connected to standard input, usually the keyboard. `System.out` is a `PrintStream` for normal output, and `System.err` is a `PrintStream` for error and diagnostic messages. Keeping errors on `System.err` is not just tidiness: on most shells a user can redirect normal output to a file with `>` while errors still appear on screen, and scripts that parse your output are not confused by warnings. `System.setOut`, `System.setErr` and `System.setIn` reassign these streams, which is useful in unit tests that capture output or feed scripted input.",
   "For output, `System.out` offers `print`, `println`, and formatted output with `printf(format, args)` or its identical twin `format`. Common format specifiers are `%s` for strings, `%d` for integers, `%f` for floating point, `%.2f` for two decimal places, `%n` for the platform line separator, and a width such as `%5d` to right-align a number in five columns, or `%-10s` to left-align text. A mismatched specifier, such as `%d` with a String argument, compiles fine but throws an `IllegalFormatException` subclass at run time. Prefer `%n` over a hard-coded newline in printf so output looks right on every operating system.",
   "Input takes a little more work because `System.in` is a raw byte stream. The classic approach wraps it: `new BufferedReader(new InputStreamReader(System.in))` gives you `readLine()`, which returns null when input ends, for example when the user presses the end-of-input key or a redirected file runs out. Alternatively, `java.util.Scanner` parses tokens for you with `nextInt()`, `nextDouble()`, `next()` for a single word and `nextLine()` for the rest of the current line. A classic Scanner trap is calling `nextLine()` right after `nextInt()`. nextInt reads the digits but leaves the line terminator in the input, so the following nextLine returns an empty string immediately. The usual fix is an extra nextLine to consume the leftover terminator. For small programs, `IO.readln()` in the `java.lang.IO` class offers a simpler way to print a prompt and read a line.",
   "```java\nConsole c = System.console();\nif (c == null) {\n    System.err.println(\"No console available\");\n    return;\n}\nString user = c.readLine(\"User: \");\nchar[] pw = c.readPassword(\"Password: \");   // not echoed\ntry {\n    c.printf(\"Hello %s%n\", user);\n} finally {\n    java.util.Arrays.fill(pw, ' ');           // wipe the password from memory\n}\n```",
   "The `java.io.Console` class is designed for interactive text programs, and you obtain it from `System.console()`. That method returns null when no console is available, for example in some IDEs or when the program runs as a background service with no terminal attached, so always check for null before calling methods on it. Exam code that calls `System.console().readLine()` directly can throw a NullPointerException in those environments. Console provides `readLine()` and `readLine(format, args)` for prompted input, `readPassword()` and `readPassword(format, args)` which turn off echo and return a `char[]`, `printf` and `format` for output, `flush()`, and `reader()` and `writer()` to get a Reader and a PrintWriter bound to the console.",
   "Why does readPassword return a char array rather than a String? Strings are immutable, so you cannot erase one; it stays in memory until the garbage collector reclaims it, which might be much later, and could show up in a memory dump. Strings are also easy to log or print by accident through string concatenation. A char array can be overwritten with `Arrays.fill` the moment you are done with it, as the finally block above does. It is a small defensive measure, but a real one, and the exam expects you to know the reason. The broader habit matters even more: never print or log a password, even temporarily while debugging.",
   "Putting the pieces together gives a clean design for command-line tools. Prompts and interactive input go through Console when one exists. Normal results go to `System.out`, so other programs can pipe or capture them. Failures and warnings go to `System.err`, so they are visible to a human and kept out of captured data. When no console exists, the tool can fall back to reading from `System.in` or exit with a clear message on `System.err`.",
   "For the exam, remember the types: `System.in` is an InputStream, while `System.out` and `System.err` are PrintStreams. Remember that `System.console()` may return null, that `readPassword` returns `char[]` rather than String, and that Scanner's nextLine after nextInt returns an empty string. Format specifier mismatches fail at run time, not at compile time."
  ],
  "analogy": "Think of a theater. System.in is the microphone the audience speaks into, System.out is the main stage everyone watches, and System.err is the stage manager's headset, a separate channel so problems do not interrupt the show. Console is a private booth with a curtain where you can whisper a password. The analogy has a limit for the exam: a theater always has a booth, but System.console() can return null when no terminal is attached.",
  "terms": [
   [
    "System.in",
    "The standard input stream, an InputStream usually connected to the keyboard."
   ],
   [
    "System.out",
    "The standard output stream, a PrintStream for normal program output."
   ],
   [
    "System.err",
    "The standard error stream, a PrintStream intended for error and diagnostic messages."
   ],
   [
    "Console",
    "A class obtained from System.console() for interactive text input and output, which may be null when unavailable."
   ],
   [
    "readPassword",
    "A Console method that reads input without echoing it and returns a char array."
   ],
   [
    "printf",
    "A method that writes formatted output using specifiers such as %s, %d, %.2f and %n."
   ]
  ],
  "example": "A command-line admin tool uses System.console().readPassword(\"Password: \") so the password never appears on screen or in the terminal history, wipes the char array after authenticating, and prints failures to System.err so scripts that capture stdout are not polluted. When launched without a terminal, it detects the null console and exits with a clear message.",
  "mistakes": [
   [
    "Assuming System.console() always returns a Console object.",
    "It returns null when no console is attached, such as in some IDEs or background services. Check for null first."
   ],
   [
    "Thinking readPassword returns a String like readLine does.",
    "It returns char[] so the caller can wipe the password from memory afterward."
   ],
   [
    "Expecting nextLine() after nextInt() to read the next line the user types.",
    "nextInt leaves the line terminator behind, so nextLine returns an empty string. Consume the leftover terminator first."
   ],
   [
    "Believing printf(\"%d\", \"text\") is a compile error.",
    "It compiles; the mismatch throws an IllegalFormatException at run time."
   ]
  ],
  "tryit": [
   [
    "Ana writes a report generator whose results are piped into another program, but it also prints warnings when input rows are skipped. Users complain that the downstream program chokes on the warning lines. Where should the warnings go, and what is the benefit?",
    "Print warnings with System.err instead of System.out. Standard error is a separate stream, so piping or redirecting stdout captures only the report data while warnings still reach the user's screen."
   ],
   [
    "A team runs its password-reset tool from an IDE run configuration and gets a NullPointerException on the line String u = System.console().readLine(). What is happening and how should the code change?",
    "In that environment System.console() returned null, so calling readLine on it threw the exception. Store the result, test it for null, and fall back to another input method or print a message to System.err and exit."
   ]
  ],
  "tip": "System.console() can return null, so exam code that calls a method on it without checking may throw NullPointerException. readPassword returns char[], and System.out and System.err are PrintStreams while System.in is an InputStream.",
  "check": [
   [
    "What type does Console.readPassword() return and why?",
    "char[], so the caller can overwrite the password in memory after use, which is not possible with an immutable String."
   ],
   [
    "After scanner.nextInt() reads 5 from the line \"5\", what does scanner.nextLine() return?",
    "An empty string, because nextInt left the line terminator unread."
   ],
   [
    "What is the declared type of System.err?",
    "PrintStream, the same type as System.out."
   ]
  ]
 },
 {
  "t": "Serialization: Serializable, transient fields, serialVersionUID",
  "hook": "Monday morning at Birchwood Studio, the support queue is full. Last Friday's update to the desktop photo editor added one small helper method, and now hundreds of users report the same thing: their saved sessions refuse to open, with an InvalidClassException in the log. Meanwhile Kofi, reviewing the same release, notices that a field holding the user's cloud token is being written to the session file in plain form, and that a counter which should start at 10 keeps coming back as 0. Nobody changed those fields. What exactly does Java write when it serializes an object, and what does it skip?",
  "simple": "Sometimes a program needs to save an object, like a game's progress, and load it again later, maybe on another computer. Serialization turns the object into a flat list of bytes that can be stored in a file, and deserialization rebuilds the object from those bytes. A class must say it allows this by implementing a special interface. Fields you mark as \"transient\" are left out on purpose, like a password you do not want saved; when the object comes back, those fields are empty. Each class can also carry a version number, like an edition number on a book, so Java can tell whether saved bytes still fit the current class.",
  "body": [
   "Serialization converts an object graph, meaning an object plus every object it refers to, into a stream of bytes so it can be saved to a file or sent over a network. Deserialization rebuilds the objects from those bytes. In Java you write with `ObjectOutputStream.writeObject(obj)` and read with `ObjectInputStream.readObject()`. Because readObject returns Object, you cast the result to the expected type. It can throw `ClassNotFoundException`, when the bytes name a class that is not on the classpath, as well as IOException, so callers must handle or declare both checked exceptions.",
   "A class opts in by implementing `java.io.Serializable`, a marker interface with no methods; implementing it simply tells the runtime that serialization is allowed. Every non-transient instance field must itself be serializable, meaning a primitive or a type that implements Serializable, or writing fails at run time with `NotSerializableException`. The compiler does not check this, so the error appears only when you try to write an object that actually holds the offending field. Many standard types are serializable, such as String, the wrapper classes like Integer, and the common collections like ArrayList and HashMap. Records can be serializable too, by implementing the same interface.",
   "Fields marked `transient` are skipped. Use the modifier for data that should not be persisted: a password or token, a cached value that can be recomputed, or a resource that cannot be serialized at all, such as a database connection or a thread. Static fields are not serialized either, because they belong to the class rather than to any one object. After deserialization, a transient field holds its type's default value: null for references, 0 for numbers and false for booleans.",
   "The next rule surprises many learners. Deserialization does not call the constructor of a Serializable class, and that class's field initializers and instance initializer blocks do not run. Instead, the Java Virtual Machine (JVM) calls the no-argument constructor of the first superclass that is not Serializable, often Object itself, and then fills in the fields directly from the stream. This is why a field declared `transient int count = 10;` comes back as 0, not 10: the initializer that would set it to 10 never runs, and the stream holds no value for it. It also means that if the nearest non-serializable superclass lacks an accessible no-argument constructor, deserialization fails. Records are the exception to the no-constructor rule: they are rebuilt through their canonical constructor, so any validation you put in it runs on deserialized data.",
   "```java\nclass User implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String name;\n    private transient String password;   // not written\n    private transient int loginCount = 5; // restored as 0\n}\n\ntry (var out = new ObjectOutputStream(new FileOutputStream(\"u.ser\"))) {\n    out.writeObject(new User());\n}\n```",
   "Versioning is handled by `serialVersionUID`, a version number for the class declared as `private static final long serialVersionUID`. When reading, the JVM compares the value recorded in the stream with the value in the class currently loaded. If they differ, it throws `InvalidClassException` rather than guessing. If you do not declare one, the JVM computes a value from details of the class structure, such as its name, fields and methods. That means even a harmless change, like adding a method, can alter the computed value and make all previously saved data unreadable. Declaring the field explicitly lets you decide when versions are compatible: keep the same number for compatible changes such as adding a field, which simply receives its default value when old data is read, and change it when old data truly cannot be interpreted.",
   "Security deserves serious attention here. Deserializing data from an untrusted source is dangerous, because the process can instantiate classes and invoke their methods before your code ever sees the resulting object, and this pattern has been the root cause of serious vulnerabilities in many applications. Defensive practice is to avoid Java serialization for untrusted input entirely, prefer formats such as JSON with explicit mapping to known types, and, where native serialization cannot be avoided, restrict which classes may be deserialized and how large the data can be with an `ObjectInputFilter`. Marking secrets transient also keeps them out of files and network messages in the first place.",
   "For the exam, practice predicting field values after a round trip. Ask of each field: is it static or transient (default value or the class's current static value), is it a normal instance field (value from the stream), and does any initializer run (no, unless the class is a record or the field belongs to a non-serializable superclass whose constructor runs)."
  ],
  "analogy": "Serialization is like packing a furnished room into labeled boxes for a move. Everything you pack arrives, but items marked \"do not pack\" (transient) are left behind, so that spot is empty in the new room. The serialVersionUID is the floor plan number on the boxes: if the new house's plan number differs, the movers refuse to unpack. The analogy breaks in one place: real movers would rebuild shelves by the instructions, but Java does not rerun your constructor or initializers.",
  "terms": [
   [
    "Serializable",
    "A marker interface that allows instances of a class to be written and read by object streams."
   ],
   [
    "transient",
    "A field modifier that excludes the field from serialization; it is restored with its default value."
   ],
   [
    "serialVersionUID",
    "A private static final long version identifier checked during deserialization to detect incompatible class versions."
   ],
   [
    "NotSerializableException",
    "Thrown at run time when writing an object that has a non-transient field whose type is not serializable."
   ],
   [
    "InvalidClassException",
    "Thrown during deserialization when the stream's serialVersionUID does not match the loaded class, among other class problems."
   ],
   [
    "ObjectInputFilter",
    "A mechanism to restrict which classes and how much data may be deserialized, used to defend against unsafe input."
   ]
  ],
  "example": "A desktop app saves session state with ObjectOutputStream. After an update that added a method, users' saved sessions stopped loading with InvalidClassException, because the class had no declared serialVersionUID and the computed one changed. Declaring an explicit serialVersionUID in the next release keeps future saves loadable as long as field changes stay compatible, and marking the access token transient keeps it out of the file.",
  "mistakes": [
   [
    "Expecting a transient field with an initializer, such as transient int count = 10, to come back as 10.",
    "Field initializers do not run during deserialization of a Serializable class, so the field gets its default value, 0."
   ],
   [
    "Believing the compiler rejects a Serializable class that has a non-serializable field.",
    "It compiles. The failure is a NotSerializableException at run time when such an object is written."
   ],
   [
    "Thinking static fields are saved with the object.",
    "Static fields belong to the class and are never written; after reading, you see whatever the class's static value currently is."
   ],
   [
    "Assuming a Serializable class's constructor runs on deserialization.",
    "It does not. Only the no-arg constructor of the first non-serializable superclass runs; records are the exception, using their canonical constructor."
   ]
  ],
  "tryit": [
   [
    "A team serializes an Order object containing a customer name, a total, a static counter of orders created, and a transient Connection to the database. After reading the object back in a fresh JVM where the counter's static initializer set it to 0, what values will they see for each field?",
    "The name and total come from the stream. The connection is null because it was transient. The counter is 0, the current static value in the new JVM, because static fields are not serialized at all."
   ],
   [
    "Your service receives serialized Java objects from partner systems over the network, and a security review flags it. What should you recommend?",
    "Avoid native deserialization of untrusted data, preferring a format like JSON mapped to known types. If it must stay, apply an ObjectInputFilter that allows only the expected classes and limits data size."
   ]
  ],
  "tip": "On deserialization, transient and static fields are not read from the stream, field initializers do not run, and the Serializable class's constructors are not called; only the first non-serializable superclass's no-arg constructor runs. Records are rebuilt through their canonical constructor.",
  "check": [
   [
    "A transient String field is set to \"secret\" before serialization. What is it after deserialization?",
    "null, the default value for a reference."
   ],
   [
    "What exception occurs when the stream's serialVersionUID does not match the class?",
    "InvalidClassException."
   ],
   [
    "What happens if a serializable class has a non-transient field of a type that is not Serializable?",
    "Writing the object throws NotSerializableException at run time."
   ],
   [
    "Which checked exceptions can ObjectInputStream.readObject() throw?",
    "IOException and ClassNotFoundException."
   ]
  ]
 },
 {
  "t": "Closing resources and stream-returning Files methods",
  "hook": "The monitoring service at Granite Ridge Water has run flawlessly in testing, but on the third day in production it falls over with a too-many-open-files error. Ines, the developer on call, restarts it and the clock starts again. The code looks innocent: every few seconds it calls Files.list on a log directory, filters the names and counts them. There is no file opened by hand anywhere. The count is correct every time. So what is still holding thousands of handles open, and why did no exception or warning ever point at it?",
  "simple": "When a program opens a file, the operating system lends it a ticket, called a handle, and there are only so many tickets. If the program never gives the ticket back by closing the file, tickets run out and new files cannot open. Java's try-with-resources statement hands the ticket back automatically when a block of code ends, even if something goes wrong. A few file-reading methods return a stream of results that quietly keeps its ticket until you close it, even after you finish using the results, so those must go inside try-with-resources too. It is like a library book: reading the last page does not return it.",
  "body": [
   "Files, sockets, database connections and many I/O streams hold operating system resources that the garbage collector does not release promptly. Garbage collection reclaims memory, not file handles, and it runs whenever the JVM decides, which may be never for a long-lived object. If you forget to close resources, you can run out of file handles, leave files locked on Windows so they cannot be deleted or renamed, or lose buffered output that was never flushed. The try-with-resources statement is the standard way to guarantee closing.",
   "Here is how it works. Any object that implements `AutoCloseable` can be declared in the parentheses after `try`. When the block finishes, normally or by an exception, its `close()` method is called automatically. `Closeable`, the interface used by I/O classes, extends AutoCloseable and narrows `close()` to throw IOException, while AutoCloseable's `close()` is declared to throw Exception. The compiler makes you catch or declare whatever the resource's declared close method can throw, so a custom AutoCloseable whose close declares Exception forces you to handle Exception. A resource variable is implicitly final and cannot be reassigned inside the block. Since Java 9 you can also list an existing variable that is final or effectively final, as in `try (reader) { ... }`, instead of declaring a new one.",
   "The order of events is precise and frequently tested. Resources are closed in the reverse order of their declaration, so the last one opened is the first one closed, which matters when one resource depends on another. They are closed before any `catch` or `finally` block runs, so code in catch or finally sees resources that are already closed. If the try block throws an exception and then `close()` also throws, the close exception does not replace the original. It is attached to the original as a suppressed exception, retrievable with `getSuppressed()`, and the original exception propagates. If only close throws, that exception propagates normally.",
   "```java\ntry (var a = new Res(\"A\"); var b = new Res(\"B\")) {\n    System.out.println(\"body\");\n} finally {\n    System.out.println(\"finally\");\n}\n// body, close B, close A, finally\n```",
   "The Stream API interacts with this in a way many developers miss. `BaseStream`, the parent interface of Stream, implements AutoCloseable, but most streams, such as those created from collections or arrays, hold no resources and need no closing. The exception is streams returned by I/O methods in `java.nio.file.Files`: `Files.lines`, `Files.list`, `Files.walk` and `Files.find`. Their documentation says to use try-with-resources, because the stream keeps a file or directory handle open until the stream itself is closed. A terminal operation such as `count()`, `forEach()` or `collect()` consumes the stream but does not close it. That is exactly the leak in a loop that calls Files.list every few seconds.",
   "```java\ntry (Stream<Path> entries = Files.list(Path.of(\"logs\"))) {\n    entries.filter(p -> p.toString().endsWith(\".gz\")).forEach(System.out::println);\n}\n// By contrast, readAllLines, readString, write and writeString open and close internally.\n```",
   "A useful rule of thumb separates Files methods into two groups. Methods that return an open object, such as a Reader, Writer, InputStream, OutputStream or Stream, hand responsibility for closing to you: `Files.newBufferedReader`, `Files.newInputStream`, `Files.newBufferedWriter`, `Files.newOutputStream`, plus the four stream-returning methods above. Methods that do the whole job in one call, such as `readAllLines`, `readString`, `readAllBytes`, `write`, `writeString`, `copy` and `size`, open and close whatever they need internally, so there is nothing for you to close. The trade-off is memory: readAllLines loads the entire file into a List, while Files.lines reads lazily and suits very large files, as long as you close it.",
   "Two more details complete the picture. When wrapping streams, closing the outermost wrapper closes the inner ones, so declare the wrapper as the resource; if you declare both inner and outer separately, the inner one may be closed twice, which is harmless for well-behaved I/O classes but unnecessary. A stream can register cleanup actions with `onClose(Runnable)`, and those actions run when `close()` is called, which is how resource-backed streams release their handles.",
   "For the exam, trace try-with-resources output carefully: body, then closes in reverse order, then catch if an exception occurred, then finally. Identify which exception propagates when both the body and close throw. And recognize that Files.lines, list, walk and find return streams that must be closed, while readAllLines and writeString do not need it."
  ],
  "analogy": "Try-with-resources is like a hotel checkout desk that automatically collects your room keys when you leave, whatever the reason, and collects them in reverse order of the rooms you booked. A resource-backed stream from Files.list is a rental car: finishing your trip, the terminal operation, does not return it; only dropping it at the desk, close(), does. The analogy stops short on suppressed exceptions: if checkout itself fails after a problem during your stay, Java reports the original problem and attaches the checkout failure to it.",
  "terms": [
   [
    "try-with-resources",
    "A try statement that declares AutoCloseable resources and closes them automatically in reverse order of declaration."
   ],
   [
    "AutoCloseable",
    "An interface with close() throws Exception, required for resources in try-with-resources."
   ],
   [
    "Closeable",
    "An I/O interface that extends AutoCloseable with close() throws IOException."
   ],
   [
    "Suppressed exception",
    "An exception thrown while closing a resource after the body already threw, attached to the original via addSuppressed and read with getSuppressed."
   ],
   [
    "Resource-backed stream",
    "A Stream such as those from Files.lines, list, walk or find that holds an open handle and must be closed."
   ],
   [
    "Effectively final",
    "A variable never reassigned after initialization; since Java 9 such a variable can be listed directly in a try-with-resources header."
   ]
  ],
  "example": "A monitoring service lists a directory every few seconds with Files.list but never closes the stream. After a day it fails with a too-many-open-files error. Wrapping the call in try-with-resources releases each directory handle as soon as the listing finishes, and the service runs indefinitely.",
  "mistakes": [
   [
    "Believing a terminal operation like count() or forEach() closes a stream from Files.lines.",
    "Terminal operations consume a stream but never close it. Declare the stream in try-with-resources."
   ],
   [
    "Thinking resources are closed after the finally block runs.",
    "They are closed right after the try block, before any catch or finally block runs."
   ],
   [
    "Expecting an exception from close() to replace the one thrown in the body.",
    "The body's exception propagates; the close exception is attached as suppressed and is available via getSuppressed()."
   ],
   [
    "Wrapping Files.readAllLines or Files.writeString in try-with-resources.",
    "These return a List or Path, not a resource, and close the file internally. There is nothing to close and they cannot be declared as resources."
   ]
  ],
  "tryit": [
   [
    "Given try (var r1 = new Res(\"1\"); var r2 = new Res(\"2\")) { throw new RuntimeException(\"body\"); } catch (RuntimeException e) { print(\"catch\"); } finally { print(\"finally\"); }, where each close prints \"close\" plus its name, what prints in order?",
    "close 2, close 1, catch, finally. Resources close in reverse order immediately after the body, before the catch and finally blocks run."
   ],
   [
    "A nightly job must count lines in a 20 GB log file. One developer proposes Files.readAllLines(path).size(), another proposes Files.lines(path).count() inside try-with-resources. Which is better and why?",
    "Files.lines inside try-with-resources. It reads lazily without loading 20 GB into memory, and the try-with-resources releases the file handle. readAllLines would build an enormous List and likely run out of memory."
   ]
  ],
  "tip": "Resources close in reverse order, before catch and finally. An exception from close after a body exception is suppressed, not thrown. Files.lines, list, walk and find return streams you must close; readAllLines and writeString do not need it.",
  "check": [
   [
    "In try (var x = ...; var y = ...), which resource is closed first?",
    "y, because resources are closed in the reverse order they were declared."
   ],
   [
    "The try body throws IOException and close() throws IllegalStateException. Which propagates?",
    "The IOException; the IllegalStateException is added as a suppressed exception."
   ],
   [
    "Does calling count() on the stream from Files.lines close the file?",
    "No. A terminal operation does not close the stream; use try-with-resources."
   ],
   [
    "Since Java 9, what condition must an existing variable meet to be listed in a try-with-resources header?",
    "It must be final or effectively final."
   ]
  ]
 },
 {
  "t": "Locale objects: language, country, Locale.of and Locale.getDefault",
  "hook": "Lucas on the payments team at Northwind Mutual gets a ticket from the Frankfurt office: the nightly rate import crashes with a NumberFormatException on a value of 1.5. The same build runs perfectly on every developer laptop in the Toronto office. The input file is identical in both places, and so is the code. The only difference anyone can find is the servers themselves. A teammate mutters something about \"the locale\" and suggests hard-coding the German servers to behave like American ones. Before Lucas touches anything, he wants to know: what is a locale in Java, and where does a program get one?",
  "simple": "People in different places write the same things differently. In the United States, one and a half is written 1.5, but in Germany it is 1,5. Dates, currency and the names of months change too. A Locale in Java is a small label that says which language, and optionally which country, a program should follow, such as French as spoken in Canada. Java's formatting tools read that label and adjust their output. If you do not give them a label, they use the computer's own setting, which can differ from machine to machine. That is how one program can behave differently on two computers.",
  "body": [
   "Localization means adapting a program to a user's language and region: translated text, and numbers, currencies, dates and times displayed the way that user expects. Java represents a language and region choice with the class `java.util.Locale`. A Locale does not format anything by itself; it is a label. The locale-sensitive classes, such as NumberFormat, DateTimeFormatter and ResourceBundle, accept a Locale and adjust their behavior accordingly. This separation lets one program serve many regions by passing a different Locale.",
   "A Locale is built from a language code, an optional country (region) code and an optional variant. Language codes are lowercase codes from the International Organization for Standardization (ISO) 639 standard, such as `en`, `fr` and `de`. Country codes are uppercase ISO 3166 codes such as `US`, `CA` and `DE`. The string form produced by `toString()` joins them with an underscore, language first: `en_US`, `fr_CA`. A locale can be language only, like `fr`, which is common for translations that do not vary by country. A country without a language is technically possible, and it prints as `_US`, but it is rarely useful because the language is the essential part. The standard way to write a locale as a language tag, the form used in web headers and many configuration files, joins the parts with a hyphen instead: `en-US`.",
   "Creating locales has a modern API. `Locale.of(\"fr\", \"CA\")` creates a language and country locale, and `Locale.of(\"fr\")` creates a language-only locale. These factory methods replaced the Locale constructors, which are now deprecated, so prefer Locale.of in new code and expect it on the exam. Locale normalizes case, so `Locale.of(\"EN\", \"us\")` prints as `en_US`. Common locales are available as constants: `Locale.US`, `Locale.UK`, `Locale.FRANCE`, `Locale.GERMANY` and `Locale.CANADA_FRENCH`, along with language-only constants such as `Locale.ENGLISH` and `Locale.FRENCH`. `Locale.forLanguageTag(\"pt-BR\")` parses a hyphenated tag, and `new Locale.Builder().setLanguage(\"es\").setRegion(\"MX\").build()` builds a locale step by step with validation of each part.",
   "```java\nLocale ca = Locale.of(\"fr\", \"CA\");\nSystem.out.println(ca);                 // fr_CA\nSystem.out.println(ca.getLanguage());   // fr\nSystem.out.println(ca.getCountry());    // CA\nSystem.out.println(ca.toLanguageTag()); // fr-CA\nSystem.out.println(Locale.getDefault()); // depends on the machine, e.g. en_US\nLocale.setDefault(Locale.GERMANY);       // affects only this JVM\n```",
   "Every JVM also has a default locale. `Locale.getDefault()` returns it, and it is initialized from the operating system's settings when the Java Virtual Machine (JVM) starts. `Locale.setDefault(locale)` changes it for the running JVM only. It does not touch the operating system, other programs, or the next run of the same program. Any locale-sensitive method called without an explicit Locale uses the default, which is why the same code can produce different output on different servers.",
   "The default comes in two flavors. Java defines category-specific defaults through the `Locale.Category` enum. `Locale.Category.DISPLAY` controls the language used for user interface text, such as the names of languages and countries returned by display methods. `Locale.Category.FORMAT` controls how numbers, dates and currencies are formatted. You read them with `Locale.getDefault(Category)` and change them with `Locale.setDefault(Category, locale)`. This lets a user, for example, read menus in English while seeing dates in the format of their home country. Calling the one-argument `setDefault` sets both categories as well as the overall default.",
   "Relying on the default locale is a common source of bugs. A program that parses `1.5` as a number with a locale-sensitive parser may work on a US machine and fail on a German one, where the decimal separator is a comma. The fix is not to change the server's settings but to be explicit in code. For data exchanged between systems, such as files, APIs and logs, pass a fixed locale such as `Locale.ROOT`, the neutral locale with empty language and country, or `Locale.US`. For text shown to a person, use that person's locale, perhaps taken from their profile or request. `getDisplayName()` returns a human-readable name such as \"French (Canada)\", itself written in the default display locale, and `getDisplayName(Locale)` lets you choose the language of that name.",
   "It helps to see where locales come from in a real application. A desktop program usually just uses the default locale, since the person at the keyboard set up the operating system. A server is different: one JVM serves many users at once, so its default locale says nothing about any particular user. Server code therefore picks a Locale per request, perhaps from a stored user preference or from a language tag the client sent, parses it with `Locale.forLanguageTag`, and passes it explicitly to every formatter and bundle lookup. Changing the default with setDefault inside a server is risky, because it affects every thread in the JVM at once, including requests from other users.",
   "For the exam, know the string format (lowercase language, underscore, uppercase country, language always first), the hyphenated language-tag form, that Locale.of is the current factory, that setDefault affects only the current JVM, and which category controls formatting versus display text."
  ],
  "analogy": "A Locale is like the setting on a universal travel adapter. The adapter itself does not produce electricity; it tells the device which plug shape and voltage rules to follow, and the appliance (NumberFormat, DateTimeFormatter) adjusts. The default locale is whatever setting the adapter had when you unpacked it, taken from the country you were in. Unlike a real adapter, changing it with setDefault affects only your own JVM, not the wall socket, the operating system.",
  "terms": [
   [
    "Locale",
    "An object identifying a language and optional country and variant, used by locale-sensitive classes."
   ],
   [
    "Language code",
    "A lowercase ISO 639 code such as en or fr that forms the first part of a locale."
   ],
   [
    "Country code",
    "An uppercase ISO 3166 code such as US or CA identifying the region of a locale."
   ],
   [
    "Locale.of",
    "The factory method for creating a Locale from a language and optional country and variant, replacing the deprecated constructors."
   ],
   [
    "Default locale",
    "The locale the JVM uses when none is given, initialized from the operating system and changeable with Locale.setDefault."
   ],
   [
    "Locale.Category",
    "An enum with DISPLAY and FORMAT that allows separate default locales for user interface text and for formatting."
   ]
  ],
  "example": "An invoicing service formats totals with the customer's Locale taken from their profile, so a customer in Quebec sees French formatting from Locale.of(\"fr\", \"CA\"), while its CSV exports always use Locale.ROOT so the accounting system can parse the numbers regardless of the server's default locale.",
  "mistakes": [
   [
    "Writing a locale as US_en or en_us.",
    "The language always comes first in lowercase and the country second in uppercase: en_US. Locale normalizes case, but the order is fixed."
   ],
   [
    "Believing Locale.setDefault changes the operating system's language.",
    "It changes the default only inside the running JVM."
   ],
   [
    "Using new Locale(\"fr\", \"CA\") as the recommended way to create a locale.",
    "The constructors are deprecated; use Locale.of(\"fr\", \"CA\"), a constant, forLanguageTag or Locale.Builder."
   ],
   [
    "Confusing the toString form with the language tag.",
    "toString uses an underscore (fr_CA); toLanguageTag uses a hyphen (fr-CA)."
   ]
  ],
  "tryit": [
   [
    "A logging library writes timestamps and durations into log files that a parser on another server reads. On one server the durations contain commas instead of periods and the parser fails. The code formats numbers without passing a Locale. What should change?",
    "Pass an explicit, fixed locale such as Locale.ROOT or Locale.US when formatting data meant for machines. Relying on the default locale makes the output depend on each server's operating system settings."
   ],
   [
    "A user wants menus and messages in English but dates and numbers formatted the way they are in Germany. Which Locale feature supports this?",
    "Category-specific defaults: set Locale.Category.DISPLAY to an English locale and Locale.Category.FORMAT to Locale.GERMANY with Locale.setDefault(Category, locale)."
   ]
  ],
  "tip": "The string form is language_COUNTRY with lowercase language and uppercase country, language always first; the language tag uses a hyphen. Locale.setDefault changes the JVM only. Use Locale.of rather than the deprecated constructors.",
  "check": [
   [
    "What does System.out.println(Locale.of(\"de\", \"AT\")) print?",
    "de_AT."
   ],
   [
    "Does Locale.setDefault change the operating system's locale?",
    "No. It changes the default only for the running JVM."
   ],
   [
    "Can a Locale have a country without a language?",
    "Technically yes, printing as _US, but not in normal use: the language comes first and is the essential part; country and variant are optional refinements."
   ],
   [
    "What does Locale.of(\"fr\", \"CA\").toLanguageTag() return?",
    "fr-CA, with a hyphen."
   ]
  ]
 },
 {
  "t": "Resource bundles: properties files, naming and lookup/fallback order",
  "hook": "Hana is preparing the French-Canadian launch of Maple Lane Books' ordering app. Testers in Montreal report that most labels appear in French, but the checkout button inexplicably reads in English, and one tester running a laptop set to German sees the entire app in English, not in the French or German anyone expected. The translation files are all there: Messages.properties, Messages_fr.properties, Messages_fr_CA.properties and Messages_en_US.properties. Hana suspects that Java is searching the files in an order she does not quite understand. In what order does Java actually look, and why?",
  "simple": "Apps that speak many languages keep their words outside the code, in text files, one file per language. Each file holds pairs like greeting=Hello. All the files share a family name, like Messages, and the language is added to the end: Messages_fr for French, Messages_fr_CA for French in Canada, and plain Messages as the backup. When the app needs a word, Java picks the most specific file it can find for the user, and if a word is missing there, it checks the more general files in the same family. Think of asking for directions: first a local resident, then someone from the region, then a general map.",
  "body": [
   "A resource bundle keeps locale-specific data, mostly user interface text, outside your code so that translators can supply new languages without any code changes. The most common form is a family of properties files that share a base name, with the locale appended after underscores: `Messages.properties` (the default, or base, bundle), `Messages_fr.properties`, `Messages_fr_CA.properties` and `Messages_en_US.properties`. The base name is the shared prefix, here Messages. Java class bundles that extend `ListResourceBundle` are also possible, and when both a class and a properties file exist for the same name, the class is preferred.",
   "Properties files have a simple syntax worth knowing exactly. Each line holds one key-value pair, written as `greeting=Hello` or `greeting: Hello`. Both `=` and `:` separate the key from the value, and whitespace around the separator is ignored. Lines starting with `#` or `!` are comments. A backslash at the end of a line continues the value on the next line, which helps with long messages. Since Java 9, properties resource bundles are read as UTF-8 by default, so accented and non-Latin characters can be written directly rather than as escape sequences.",
   "Loading and reading is a two-step process. You load a bundle with `ResourceBundle.getBundle(\"Messages\", locale)`, or with just the base name to use the default locale, and you read values with `getString(\"greeting\")`. The methods `getObject`, `keySet()` and `containsKey()` are also available. Two failure cases throw the same unchecked `MissingResourceException`: getBundle throws it if no bundle at all can be found for the base name, and getString throws it if a key is missing from the chosen bundle and from all of its parents.",
   "The lookup order for choosing a bundle is the part the exam tests most. Suppose you request `fr_CA` and the default locale is `en_US`. Java builds a list of candidate names from most specific to least and picks the first one that exists. It tries `Messages_fr_CA`, then `Messages_fr`, then the default locale's `Messages_en_US`, then `Messages_en`, and finally the base `Messages`. If none exists, getBundle throws MissingResourceException. Notice two things: the requested locale's candidates always come before the default locale's, and the default locale is consulted before the base bundle, but only when nothing matched the requested locale. This explains Hana's German tester: no German bundle exists, so neither the requested nor the default candidates matched, and Java ended at the base file, which is written in English.",
   "```text\ngetBundle(\"Messages\", fr_CA) with default en_US tries:\n  1. Messages_fr_CA   2. Messages_fr\n  3. Messages_en_US   4. Messages_en\n  5. Messages          (then MissingResourceException)\n\nIf Messages_fr_CA is chosen, a missing key is looked up in:\n  Messages_fr_CA -> Messages_fr -> Messages\n```",
   "Once a bundle has been chosen, looking up an individual key can also fall back, but only along that bundle's parent chain, never into the default locale's bundles. The parent of `Messages_fr_CA` is `Messages_fr`, and the parent of `Messages_fr` is the base `Messages`. So a key missing from `Messages_fr_CA` is searched in `Messages_fr` and then in `Messages`, never in `Messages_en_US`. That is why Hana's checkout button appeared in English: the key existed only in the base file, written in English, and was missing from both French files. The parent chain is a feature, not a flaw. It lets you put shared keys in the base file and override only what differs in each language or region, so a `_fr_CA` file might contain just a handful of Canadian terms.",
   "A practical design follows from these rules. Put every key in the base bundle, in whatever language you choose as the final fallback, so getString never fails. Add per-language files with translated values for every key, and per-region files only for the few values that differ. Values often contain placeholders such as `{0}`, which you fill at run time with MessageFormat, so translators can move the inserted value to wherever their grammar needs it.",
   "Two practical details often surface in code reviews. First, getBundle caches bundles, so repeated calls with the same base name and locale are cheap, and editing a properties file while the program runs usually has no effect until a restart. Second, bundle files are found on the classpath, so the base name can include a package path, such as `com.example.i18n.Messages`, matching a file at `com/example/i18n/Messages.properties`. A misspelled base name or a file placed outside the classpath produces MissingResourceException from getBundle, even though the file exists on disk. When debugging, check the exact base name, the file location, and the underscore-separated locale suffix before suspecting the lookup order.",
   "For the exam, draw the list of candidate names before answering any lookup question: requested language_country, requested language, default language_country, default language, base. Then, for a missing key, walk only the chosen bundle's parent chain. Remember that MissingResourceException is unchecked and covers both a missing bundle and a missing key."
  ],
  "analogy": "Choosing a bundle is like a traveler looking for a restaurant menu in their own language. First they ask for the regional menu, Canadian French, then any French menu; if the restaurant has neither, they settle for the menu in the house's home language, the default locale, and finally the generic menu with pictures, the base bundle. Once seated with a menu, if a dish is not described, they only check the less specific versions of that same menu, never the menu in another language. The comparison ends there: a real waiter might improvise a translation, and Java never does.",
  "terms": [
   [
    "Resource bundle",
    "A set of locale-specific key-value resources loaded by base name and locale with ResourceBundle.getBundle."
   ],
   [
    "Base name",
    "The common prefix of a bundle family, such as Messages, to which locale suffixes like _fr_CA are added."
   ],
   [
    "Default (base) bundle",
    "The bundle file with no locale suffix, used as the final fallback and the root of every parent chain."
   ],
   [
    "Parent chain",
    "The sequence of less specific bundles, such as fr_CA to fr to base, searched for a key missing from the chosen bundle."
   ],
   [
    "MissingResourceException",
    "An unchecked exception thrown when no bundle is found or a key is missing from the bundle and its parents."
   ],
   [
    "ListResourceBundle",
    "An abstract class for bundles written as Java classes; a class bundle is preferred over a properties file of the same name."
   ]
  ],
  "example": "A booking site ships Labels.properties in English, Labels_es.properties in Spanish and Labels_es_MX.properties that overrides only a few words used differently in Mexico. A visitor with locale es_MX gets the Mexican file, and any key it lacks is found in Labels_es and then Labels.",
  "mistakes": [
   [
    "Thinking the base bundle is tried before the default locale's bundles.",
    "When nothing matches the requested locale, the default locale's language_country and language bundles are tried before the base."
   ],
   [
    "Believing a key missing from Messages_fr_CA is looked up in the default locale's Messages_en_US.",
    "Key fallback follows only the chosen bundle's parent chain: fr_CA, then fr, then the base."
   ],
   [
    "Assuming getString returns null for a missing key.",
    "It throws the unchecked MissingResourceException."
   ],
   [
    "Thinking only = can separate key and value in a properties file.",
    "Both = and : work, with surrounding whitespace ignored."
   ]
  ],
  "tryit": [
   [
    "The default locale is en_US. The files Messages.properties, Messages_en.properties and Messages_it.properties exist. A user requests it_CH. Which bundle is chosen, and if a key is missing from it, where is it searched next?",
    "Messages_it is chosen, because it_CH does not exist and the requested language comes before any default-locale candidate. A missing key is then searched in its parent, the base Messages, and never in Messages_en."
   ],
   [
    "Your team must ship a Brazilian Portuguese version quickly, but only some strings differ from the existing Portuguese translation. What files should you add and why?",
    "Add Messages_pt_BR.properties containing only the keys whose wording differs. Keys it lacks are found through the parent chain in Messages_pt and then the base Messages, so no duplication is needed."
   ]
  ],
  "tip": "Order: requested locale (language_country, then language), then default locale (language_country, then language), then base. For missing keys, only the chosen bundle's parents are searched, never the default locale's bundles.",
  "check": [
   [
    "Requested locale is de_CH, default is en_US, and only Messages.properties and Messages_en.properties exist. Which is chosen?",
    "Messages_en. No German bundle exists, so the default locale's candidates are tried and Messages_en matches before the base."
   ],
   [
    "Messages_fr_CA is chosen and lacks the key title, which exists only in Messages_en_US and Messages. Where is it found?",
    "In Messages, the base bundle; key fallback follows the parent chain fr_CA, fr, base, not the default locale."
   ],
   [
    "Which characters can separate a key from its value in a properties file?",
    "= or :, with surrounding whitespace ignored."
   ],
   [
    "Is MissingResourceException checked or unchecked?",
    "Unchecked; it extends RuntimeException."
   ]
  ]
 },
 {
  "t": "Formatting numbers and currency with NumberFormat",
  "hook": "Chloe runs the storefront team at Saltmarsh Outfitters, and on Monday she gets two complaints at once. A customer in Munich says the price on her receipt reads $1,234.57, in dollars, with a decimal point where she expects a comma. Meanwhile finance reports that a total of 2.5 loyalty points was displayed as 2, not 3, and someone wants to know if the rounding code is broken. A junior developer has already proposed building price strings by hand with string concatenation. Before anyone writes that code, Chloe wants to know what Java's formatter is actually doing, and why.",
  "simple": "Numbers look different around the world. Americans write one thousand two hundred thirty-four and a half as 1,234.5, while Germans write 1.234,5, swapping the comma and the dot. Money adds a currency sign and usually exactly two decimal places. Java's NumberFormat is a helper that knows these local habits: you tell it which place (the Locale) and what kind of number (plain, money, percent), and it turns your number into the right text. It can also go the other way, reading text back into a number. Like a cashier, it rounds amounts to a sensible number of digits, using a rule that is fair over many sales.",
  "body": [
   "Different regions write numbers differently, and getting it wrong confuses users or corrupts data. The value one thousand two hundred thirty-four and a half is written `1,234.5` in the United States, `1.234,5` in Germany, and with a space as the grouping separator in France. The class `java.text.NumberFormat` encapsulates these rules. It is abstract, so you never call `new NumberFormat()`; instead you obtain an instance from a static factory method, passing a Locale or relying on the default locale.",
   "Learn the factory methods by purpose. `NumberFormat.getInstance(locale)` and `getNumberInstance(locale)` return a general-purpose number formatter. `getIntegerInstance(locale)` returns one that rounds to whole numbers. `getCurrencyInstance(locale)` adds the locale's currency symbol and uses the currency's usual number of decimal places. `getPercentInstance(locale)` multiplies the value by 100 and adds a percent sign, so you pass 0.25, not 25. `getCompactNumberInstance(locale, style)` produces short forms such as 1K. Each returns a formatter whose `format` method returns a String.",
   "```java\ndouble v = 1234.5678;\nNumberFormat.getInstance(Locale.US).format(v);          // 1,234.568\nNumberFormat.getInstance(Locale.GERMANY).format(v);     // 1.234,568\nNumberFormat.getCurrencyInstance(Locale.US).format(v);  // $1,234.57\nNumberFormat.getPercentInstance(Locale.US).format(0.256); // 26%\nNumberFormat.getIntegerInstance(Locale.US).format(2.5); // 2 (half-even)\n```",
   "Rounding follows each formatter's settings, and the defaults are testable facts. A general number format shows at most three fraction digits by default, which is why 1234.5678 became 1,234.568. Currency uses the currency's standard digits, two for dollars and euros. Percent shows no fraction digits. The default rounding mode is HALF_EVEN, sometimes called banker's rounding: a value exactly halfway between two candidates rounds toward the neighbor whose last digit is even. So 2.5 becomes 2 and 3.5 becomes 4, while 2.6 still becomes 3 because it is not exactly halfway. Over many values, half-even avoids the upward bias of always rounding halves up. You can change the behavior with `setMaximumFractionDigits`, `setMinimumFractionDigits`, `setRoundingMode(RoundingMode.HALF_UP)` and `setGroupingUsed(false)`, which removes the thousands separators.",
   "Parsing goes the other way. `parse(String)` returns a `Number`: a Long if the value is whole and fits, otherwise a Double. It throws the checked `ParseException` if the text does not start with a number, so callers must catch or declare it. Parsing is lenient about the end of the text: it parses as much of the beginning as it can and ignores the rest, so parsing `\"12abc\"` returns 12, and `\"42 apples\"` returns 42. The locale matters when parsing too. The text `\"1.234\"` parsed with a German format is 1234, because the period is a grouping separator there, while with a US format it is 1.234. This is exactly how data files break when servers in different regions parse them with the default locale.",
   "For custom layouts, `DecimalFormat`, the usual concrete subclass of NumberFormat, accepts a pattern. In patterns, `0` means a digit that is always shown, padding with zeros if needed, `#` means a digit shown only if it is significant, `,` marks the grouping position and `.` the decimal separator position. So `new DecimalFormat(\"#,##0.00\").format(1234.5)` gives `1,234.50` in a US default locale, and `new DecimalFormat(\"000\").format(7)` gives `007`. The symbols in the pattern describe positions; the actual separator characters printed still come from the locale, so the same pattern prints a comma decimal separator under a German default.",
   "Two practical cautions round out the topic. NumberFormat instances are not thread-safe, because they keep internal state while formatting, so do not share one formatter across threads without synchronization; create one per use, per thread, or guard it. And for money calculations, keep amounts in `BigDecimal` and use NumberFormat only for display. Binary floating point types such as double cannot represent most decimal fractions exactly, so arithmetic on prices stored as doubles drifts by tiny amounts that eventually show up in totals.",
   "Currency formatting deserves a closer look. getCurrencyInstance chooses both the symbol and the currency from the locale's country, so `Locale.US` gives dollars and `Locale.GERMANY` gives euros, and a language-only locale such as `Locale.ENGLISH` has no country and therefore no specific currency. That means the locale controls the currency shown, not the amount: formatting a price with a German locale does not convert dollars to euros; it simply labels the same number differently. If your store charges in one currency for everyone, you can keep the user's locale for separators while fixing the currency with `setCurrency(Currency.getInstance(\"USD\"))`. The amount itself should always come from your data, stored precisely.",
   "For the exam, know which factory to use for each purpose, that percent multiplies by 100, the default fraction digits for each kind of formatter, that the default rounding is HALF_EVEN, and that parse throws the checked ParseException yet accepts text with trailing characters after a valid number."
  ],
  "analogy": "NumberFormat is like a professional sign painter you hire in each country. You hand over the same number and say \"price\" or \"percent\", and the painter writes it the local way, with the right separators, symbol and number of decimals. When a value sits exactly halfway, this painter follows a strict house rule, round to the even digit, rather than always rounding up. The analogy breaks for parsing: a careful human would reject \"42 apples\" as a price, but NumberFormat happily reads 42 and ignores the rest.",
  "terms": [
   [
    "NumberFormat",
    "An abstract locale-sensitive class for formatting and parsing numbers, obtained through factory methods."
   ],
   [
    "getCurrencyInstance",
    "Returns a NumberFormat that formats values as currency for a locale, with its symbol and standard decimal places."
   ],
   [
    "getPercentInstance",
    "Returns a NumberFormat that multiplies by 100, shows no fraction digits by default and appends a percent sign."
   ],
   [
    "HALF_EVEN",
    "The default rounding mode that rounds exact halves to the nearest even digit."
   ],
   [
    "ParseException",
    "A checked exception thrown when text cannot be parsed as a number or date."
   ],
   [
    "DecimalFormat",
    "A concrete NumberFormat that formats using a pattern of 0, #, comma and period symbols."
   ]
  ],
  "example": "An online store shows prices with NumberFormat.getCurrencyInstance(customerLocale), so the same BigDecimal amount appears as $1,234.50 to a US shopper and with a comma decimal separator and euro sign to a shopper in Germany, while the order is stored as a plain BigDecimal.",
  "mistakes": [
   [
    "Passing 25 to a percent formatter to display 25%.",
    "getPercentInstance multiplies by 100, so pass 0.25; passing 25 prints 2,500%."
   ],
   [
    "Expecting 2.5 to format as 3 with getIntegerInstance.",
    "The default rounding is HALF_EVEN, so 2.5 becomes 2 and 3.5 becomes 4."
   ],
   [
    "Assuming parse(\"12abc\") throws ParseException.",
    "Parsing stops at the first unusable character and returns 12; ParseException is thrown only if the text does not start with a number."
   ],
   [
    "Storing money as double and formatting the result.",
    "Keep monetary values in BigDecimal for exact decimal arithmetic and use NumberFormat only for display."
   ]
  ],
  "tryit": [
   [
    "A dashboard must show a conversion rate of 0.4567 as a percentage with one decimal place for US users. A colleague writes NumberFormat.getPercentInstance(Locale.US).format(0.4567) and gets 46%. What should change?",
    "Call setMaximumFractionDigits(1) (and optionally setMinimumFractionDigits(1)) on the formatter before formatting. Percent formats show no fraction digits by default, so the result becomes 45.7%."
   ],
   [
    "A batch job on a server in Germany parses \"1.250\" from a US supplier's file using NumberFormat.getInstance() and records 1250 units instead of 1.25. What happened and how do you fix it?",
    "getInstance() used the German default locale, where the period is a grouping separator, so 1.250 was read as 1250. Parse supplier data with an explicit locale that matches the file, such as NumberFormat.getInstance(Locale.US)."
   ]
  ],
  "tip": "Know which factory to use, that percent multiplies by 100, that the default rounding is HALF_EVEN, and that parse throws the checked ParseException but accepts text with trailing garbage after a valid number.",
  "check": [
   [
    "What does NumberFormat.getPercentInstance(Locale.US).format(0.5) produce?",
    "50%."
   ],
   [
    "What does NumberFormat.getInstance(Locale.US).parse(\"42 apples\") return?",
    "The number 42 (as a Long); parsing stops at the first character it cannot use."
   ],
   [
    "What does getIntegerInstance(Locale.US).format(3.5) produce?",
    "4, because HALF_EVEN rounds a half to the nearest even digit."
   ],
   [
    "What does new DecimalFormat(\"000\").format(7) produce?",
    "007, because each 0 in the pattern is a digit that is always shown."
   ]
  ]
 },
 {
  "t": "Compact number formatting (CompactNumberFormat)",
  "hook": "Marco is building the stats panel for Riverstone Video, a small streaming site for community theater recordings. The designer's mockup shows view counts like 1.2M and 845, neat and short. Marco's first version prints 1M for a video with 1,234,567 views, and the designer files a bug. Then a tester with a long-form setting sees \"1 million\" spelled out, and a viewer in another country reports that the numbers look completely different from the mockup. Marco wonders whether he should write his own divide-and-suffix function. What does Java already provide, and why is it printing 1M?",
  "simple": "Big numbers are hard to read at a glance, so apps shorten them: 1K instead of 1,000, or 2M instead of 2,000,000. Java can do this for you with compact number formatting. You choose a place, using a Locale, and a style. The short style uses abbreviations like K and M. The long style writes the word out, like \"thousand\" or \"million\". By default it shows only whole numbers, so 1,234,567 becomes 1M, much like a friend saying \"about a million\". If you want more detail, such as 1.2M, you ask for one digit after the decimal point.",
  "body": [
   "Compact number formatting displays large numbers in a short, human-friendly form, such as `1K` for one thousand or `3 million`, the way dashboards and social feeds show counts. Java provides it through `java.text.CompactNumberFormat`, a subclass of NumberFormat. You normally obtain one with the factory method `NumberFormat.getCompactNumberInstance(locale, style)` rather than calling its constructor, which takes a pattern array and is meant for custom cases.",
   "There are two styles, defined in the `NumberFormat.Style` enum. `SHORT` uses abbreviations: in US English, 1,000 becomes `1K`, 2,000,000 becomes `2M` and 3,000,000,000 becomes `3B`. `LONG` spells the unit out: `1 thousand`, `2 million`, `3 billion`. The words and abbreviations come from the locale's data, not from Java code you write, so other locales produce their own forms and may use different magnitudes altogether. For example, some Asian locales group large numbers by ten thousand rather than by thousand, so the same value can be shortened at a different point. This is why you should pass the viewer's Locale rather than assuming English suffixes.",
   "```java\nNumberFormat s = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);\nNumberFormat l = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.LONG);\ns.format(999);        // 999\ns.format(1_000);      // 1K\ns.format(1_234_567);  // 1M\nl.format(1_234_567);  // 1 million\ns.setMaximumFractionDigits(1);\ns.format(1_234_567);  // 1.2M\n```",
   "Several defaults explain most surprising output. Values below the smallest compact pattern, which is one thousand for US English, are formatted as ordinary numbers, so 999 stays 999. By default a compact formatter shows no fraction digits, and it rounds using HALF_EVEN. That is why 1,234,567 becomes `1M` rather than `1.2M`: the value is 1.234567 million, which rounds to the whole number 1. To keep more precision, call `setMaximumFractionDigits(n)` before formatting, and to change the rounding rule call `setRoundingMode`, for example with `RoundingMode.HALF_UP`.",
   "Half-even rounding produces results worth practicing. A value exactly halfway rounds toward the even neighbor. So 1,500 formats as `2K`, because 1.5 rounds up to the even 2, and 2,500 also formats as `2K`, because 2.5 rounds down to the even 2. A value not exactly halfway rounds normally: 5,600,000 is 5.6 million and becomes `6M`. These are classic exam items, because many learners expect 2,500 to become 3K.",
   "CompactNumberFormat also has a few less-visited features. It can parse: with the US SHORT style, `parse(\"1K\")` returns 1000, and like other NumberFormat parsers it throws the checked ParseException when text cannot be read. Grouping separators are off by default and can be turned on with `setGroupingUsed(true)`, which only matters when the compact number itself is large, as in `1,000T` for a value beyond the largest suffix. Negative values keep their sign, so -2,000 formats as `-2K`. Like other java.text formats, instances are not thread-safe, so do not share one across threads without synchronization.",
   "Compared with writing your own function, the built-in formatter handles locale-specific suffixes, magnitudes, plural rules in long forms and rounding consistently, which hand-written divide-and-append code rarely gets right for every language. It is a display tool, though: keep the exact count in your data and use the compact form only where a person reads it.",
   "It also helps to compare compact formatting with the other NumberFormat factories. getInstance would print 1,234,567 in full with grouping separators, getIntegerInstance would print the same whole number, and getCompactNumberInstance trades precision for brevity. All of them share the same rounding and fraction-digit methods because they inherit from NumberFormat, which is why setMaximumFractionDigits and setRoundingMode behave the same way here. One difference is the default: a general number format allows up to three fraction digits, while a compact format allows none. When an exam question shows a compact formatter, assume zero fraction digits and HALF_EVEN rounding unless the code changes them, and check the style constant to choose between an abbreviation and a spelled-out word.",
   "The exam typically asks you to predict output, so use a fixed routine. First, find the magnitude: thousand, million or billion. Second, divide the value by that magnitude. Third, apply the maximum fraction digits, zero unless the code changes it, and round with HALF_EVEN. Finally, attach the suffix for the style: K, M or B for SHORT, the word for LONG. If the question never calls setMaximumFractionDigits, the answer is a whole number followed by the suffix, and if the value is under one thousand in US English it prints unchanged."
  ],
  "analogy": "Compact formatting is like how people talk about crowd sizes. A reporter does not say 1,234,567 people attended; they say about a million, or, if pressed for detail, 1.2 million. Java's default is the casual reporter who rounds to a whole number; setMaximumFractionDigits makes it the precise one. Where the analogy fails: a person might round 2,500 up to 3 thousand, but Java's half-even rule gives 2K.",
  "terms": [
   [
    "CompactNumberFormat",
    "A NumberFormat subclass that formats numbers in short locale-specific forms such as 1K or 1 thousand."
   ],
   [
    "NumberFormat.Style.SHORT",
    "The compact style that uses abbreviated suffixes such as K, M and B in US English."
   ],
   [
    "NumberFormat.Style.LONG",
    "The compact style that spells out the magnitude, such as thousand or million."
   ],
   [
    "getCompactNumberInstance",
    "The NumberFormat factory method that returns a compact formatter for a locale and style."
   ],
   [
    "setMaximumFractionDigits",
    "A NumberFormat method that sets how many digits may appear after the decimal point; compact formats default to zero."
   ]
  ],
  "example": "A video platform displays view counts with NumberFormat.getCompactNumberInstance(viewerLocale, Style.SHORT) and one maximum fraction digit, so a video with 1,234,567 views shows 1.2M to US viewers while viewers in other locales see their own compact form.",
  "mistakes": [
   [
    "Expecting 1,234,567 to format as 1.2M by default.",
    "Compact formats show no fraction digits by default, so it prints 1M. Call setMaximumFractionDigits(1) to get 1.2M."
   ],
   [
    "Expecting 2,500 to format as 3K.",
    "The default HALF_EVEN rounding sends exact halves to the even digit, so 2.5 thousand becomes 2K."
   ],
   [
    "Thinking 999 prints as 1K or 0.999K.",
    "Values below the smallest compact pattern, one thousand in US English, print as ordinary numbers: 999."
   ],
   [
    "Assuming every locale uses K, M and B.",
    "Suffixes and even magnitudes come from locale data; other locales produce their own forms."
   ]
  ],
  "tryit": [
   [
    "A dashboard uses the US SHORT compact format with default settings. Product asks why a page with 1,440 visits shows 1K and one with 1,560 shows 2K, and wants 1.4K and 1.6K instead. What explains the current output, and what one change fixes it?",
    "With zero fraction digits by default, 1.44 thousand rounds to 1 and 1.56 thousand rounds to 2. Calling setMaximumFractionDigits(1) on the formatter keeps one decimal place, so the pages show 1.4K and 1.6K."
   ]
  ],
  "tip": "Without changing fraction digits, compact formats round to a whole number using HALF_EVEN, so 1,234,567 is 1M, 1,500 is 2K and 2,500 is 2K. Numbers under 1,000 print unchanged in US English.",
  "check": [
   [
    "What does the US SHORT compact format produce for 5_600_000 by default?",
    "6M. It shows no fraction digits by default and 5.6 rounds to 6."
   ],
   [
    "What does the US LONG compact format produce for 2_000?",
    "2 thousand."
   ],
   [
    "How do you get 5.6M instead of 6M?",
    "Call setMaximumFractionDigits(1) on the formatter before formatting."
   ],
   [
    "What does the US SHORT compact format produce for 2_500 by default?",
    "2K, because HALF_EVEN rounds the exact half 2.5 to the even digit 2."
   ]
  ]
 },
 {
  "t": "Formatting and parsing dates and times with DateTimeFormatter and locales",
  "hook": "At Bluefin Travel, Omar is paged just after the new year: itinerary emails for trips departing in the last days of December show the following year, and travelers are calling to ask whether their flights moved. The formatting code looks fine at a glance, with a pattern of `YYYY-MM-dd`. A second ticket in the queue says the French version of the app shows month names in English, and a third reports a crash whenever the app formats a departure date with the departure time pattern. Three bugs, one class. What do those pattern letters really mean, and where does the language of a month name come from?",
  "simple": "Computers store a date as numbers, but people want to read it as text, like \"Friday 25 September 2026\" or \"25/09/2026\". DateTimeFormatter is Java's translator between the two. You give it a pattern, a short code where each letter stands for a piece of the date, such as y for year and M for month, and it writes the date in that shape. It also reads text back into a date. Letters are case-sensitive, so M means month while m means minute. Adding a Locale tells it which language to use for names, so September becomes septembre in French.",
  "body": [
   "The class `java.time.format.DateTimeFormatter` converts java.time objects, such as LocalDate, LocalTime, LocalDateTime and ZonedDateTime, to and from text. Unlike the older SimpleDateFormat, it is immutable and thread-safe, so a single formatter can be stored in a static final field and shared across threads without synchronization. You can call `date.format(formatter)` or `formatter.format(date)`; both return the same String, and you will see both forms in exam code.",
   "There are three ways to obtain a formatter. First, predefined constants follow the International Organization for Standardization ISO-8601 format, such as `DateTimeFormatter.ISO_LOCAL_DATE`, which prints 2026-09-25, and `ISO_LOCAL_DATE_TIME`. The `toString()` methods and the one-argument `parse` methods of the java.time classes use these ISO formats. Second, localized styles come from `ofLocalizedDate(FormatStyle.SHORT)`, `ofLocalizedTime` and `ofLocalizedDateTime`, with a FormatStyle of SHORT, MEDIUM, LONG or FULL; they produce whatever the locale considers normal. Third, custom patterns come from `ofPattern(\"dd MMM yyyy\")` or `ofPattern(pattern, locale)`.",
   "Pattern letters are case-sensitive and appear in many questions, so learn them carefully. `y` is year. `M` is month: M gives 9, MM gives 09, MMM gives Sep and MMMM gives September. `d` is day of month. `E` is day of week: EEE gives Fri and EEEE gives Friday. `H` is hour from 0 to 23, while `h` is hour from 1 to 12, usually paired with `a` for the AM or PM marker. `m` is minute and `s` is second. Lowercase `mm` means minutes and uppercase `MM` means month, a classic mistake that produces dates like 2026-05-25 when you meant September. Text inside single quotes is printed literally, and two single quotes produce one apostrophe. An undefined letter, such as an unquoted `b`, makes ofPattern throw IllegalArgumentException, and letters such as `T` must be quoted when you want them printed literally.",
   "```java\nLocalDateTime t = LocalDateTime.of(2026, 9, 25, 14, 5);\nDateTimeFormatter f = DateTimeFormatter.ofPattern(\"EEEE d MMMM yyyy, HH:mm\", Locale.US);\nt.format(f);                                     // Friday 25 September 2026, 14:05\nt.format(f.withLocale(Locale.FRANCE));           // vendredi 25 septembre 2026, 14:05\nLocalDate d = LocalDate.parse(\"25/09/2026\", DateTimeFormatter.ofPattern(\"dd/MM/yyyy\"));\n// LocalDate.of(2026, 9, 25).format(DateTimeFormatter.ofPattern(\"HH:mm\"));\n//   UnsupportedTemporalTypeException: a date has no hours\n```",
   "The locale determines month and day names and the layout of localized styles. `ofPattern(\"MMMM\", Locale.GERMANY)` prints September as `September`, while with `Locale.FRANCE` it prints `septembre`. A formatter created without a locale uses the default formatting locale, which is why an app can show English month names on a French page if nobody passes the user's locale. Because formatters are immutable, `withLocale(locale)` returns a new copy with a different locale rather than changing the original. Localized styles adapt the order of fields too: the SHORT date style for a US locale is month/day/year, while for many European locales it is day/month/year. LONG and FULL time styles typically include a time zone name, so formatting a LocalTime or LocalDateTime with them can throw an exception, because those types carry no zone; use ZonedDateTime for those styles.",
   "Parsing is done through the target type's static `parse` method, as in `LocalDate.parse(text, formatter)`. If the text does not match the pattern, or a field is invalid, such as month 13 or day 32, it throws `DateTimeParseException`, which is unchecked, so the compiler does not force you to catch it. Formatting can fail in a different way: if a value lacks a field the pattern needs, such as hours on a LocalDate, `format` throws `UnsupportedTemporalTypeException`. The reverse direction is fine: formatting a LocalDateTime with a date-only pattern simply ignores the time.",
   "One more subtle trap explains Omar's new-year bug. Uppercase `Y` means week-based year, which follows week numbering rather than the calendar. For a few days around the new year, the week-based year can differ from the calendar year, so `YYYY` prints the wrong year near December 31 or January 1 while looking correct the rest of the year. Use `yyyy`, year of era, or `uuuu`, the proleptic year, for the calendar year.",
   "Choosing among the three kinds of formatter follows from who reads the output. For data that another program will read, such as JSON fields, logs and database exports, use the ISO constants, which never vary by locale and sort correctly as text. For text a person will read in an interface, prefer a localized FormatStyle with the user's locale, so each region gets its familiar order without separate code. Reserve custom patterns for fixed layouts that a specification dictates, such as a file format agreed with a partner, and give such formatters an explicit locale whenever the pattern contains month or day names, so the output does not change with the server's default.",
   "For the exam, read every pattern letter by letter, checking case. Ask whether the value has every field the pattern needs, whether the formatter has a locale, and whether a failure would be a parse problem (DateTimeParseException) or a missing field (UnsupportedTemporalTypeException)."
  ],
  "analogy": "A DateTimeFormatter is like a fill-in-the-blanks form printed in a particular language. Each pattern letter is a labeled box, year here, month there, and the date fills them in. withLocale reprints the same form in another language. If the form has a box for the hour but you hand it a LocalDate, there is nothing to put in the box and the clerk refuses, which is UnsupportedTemporalTypeException. Unlike a paper form, the box labels are case-sensitive: MM and mm are completely different boxes.",
  "terms": [
   [
    "DateTimeFormatter",
    "An immutable, thread-safe class that formats and parses java.time values using ISO constants, localized styles or patterns."
   ],
   [
    "FormatStyle",
    "An enum of SHORT, MEDIUM, LONG and FULL used for locale-specific date and time layouts."
   ],
   [
    "ofPattern",
    "Creates a formatter from pattern letters such as yyyy-MM-dd HH:mm, optionally with a Locale."
   ],
   [
    "withLocale",
    "Returns a copy of a formatter that uses a different Locale, since formatters are immutable."
   ],
   [
    "DateTimeParseException",
    "An unchecked exception thrown when text cannot be parsed into a date or time."
   ],
   [
    "UnsupportedTemporalTypeException",
    "Thrown when formatting requires a field the value does not have, such as hours on a LocalDate."
   ]
  ],
  "example": "A travel app stores departure times as ZonedDateTime and shows them with DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM).withLocale(userLocale), so each traveler sees the date order and month names they expect without separate code per country. Its machine-readable exports use ISO_LOCAL_DATE_TIME so other systems can parse them reliably.",
  "mistakes": [
   [
    "Using mm for the month, as in yyyy-mm-dd.",
    "Lowercase mm is minutes; the month is uppercase MM."
   ],
   [
    "Using YYYY for the calendar year.",
    "YYYY is the week-based year and can be wrong near the new year; use yyyy or uuuu."
   ],
   [
    "Expecting a LocalDate formatted with HH:mm to print 00:00.",
    "A LocalDate has no time fields, so formatting throws UnsupportedTemporalTypeException."
   ],
   [
    "Wrapping LocalDate.parse in a required try-catch because DateTimeParseException is checked.",
    "DateTimeParseException is unchecked; catching it is optional, though often wise for user input."
   ]
  ],
  "tryit": [
   [
    "A scheduling app must show appointment times to users in the US and in France as a full weekday, day, full month and 24-hour time. A developer creates one formatter per request with ofPattern and the user's locale, and worries about performance. What would you recommend?",
    "Create one formatter with ofPattern(\"EEEE d MMMM yyyy, HH:mm\") in a static final field and call withLocale(userLocale) per request. DateTimeFormatter is immutable and thread-safe, so sharing is safe and withLocale returns a localized copy."
   ],
   [
    "A form lets users type a birth date, and one user enters 25/13/2026. The code calls LocalDate.parse(text, ofPattern(\"dd/MM/yyyy\")) with no try-catch, and the compiler did not complain. What happens at run time, and why did it compile?",
    "There is no month 13, so LocalDate.parse throws DateTimeParseException. It compiled because DateTimeParseException is unchecked; the code should still catch it to show a friendly validation message instead of crashing."
   ]
  ],
  "tip": "MM is month and mm is minutes; HH is 24-hour and hh is 12-hour; yyyy is the calendar year and YYYY is week-based. Formatting a LocalDate with time letters throws UnsupportedTemporalTypeException, and a bad parse throws the unchecked DateTimeParseException.",
  "check": [
   [
    "What does LocalDate.of(2026, 1, 5).format(DateTimeFormatter.ofPattern(\"MM/dd\")) produce?",
    "01/05."
   ],
   [
    "What happens when you format a LocalDate with the pattern \"hh:mm\"?",
    "It throws UnsupportedTemporalTypeException because a LocalDate has no time fields."
   ],
   [
    "Is DateTimeFormatter safe to share between threads?",
    "Yes. It is immutable and thread-safe."
   ],
   [
    "What does the pattern EEE print for a Friday in Locale.US?",
    "Fri."
   ]
  ]
 },
 {
  "t": "Message formatting with MessageFormat",
  "hook": "Yuki is localizing the inbox screen for Lighthouse Learning's tutoring app. The English text is built in code as \"Hello \" plus the student's name plus \", you have \" plus a count plus \" new messages\". The German translator, Felix, writes back politely: in German the count belongs earlier in the sentence, and he cannot move it because the order is fixed in the code. Then the French translation arrives with a contraction, and the test screen shows the apostrophe missing and a raw {0} where the name should be. How can each language control its own word order, and what happened to that apostrophe?",
  "simple": "Many app messages mix fixed words with changing values, like a name or a number. If code glues the pieces together in English word order, other languages cannot rearrange them. MessageFormat solves this with templates that contain numbered blanks, such as {0} for the first value and {1} for the second. Each translation puts the blanks wherever its grammar needs, and Java fills them in. It is like a mail-merge letter where each language writes its own letter but uses the same list of names. One quirk: a single apostrophe has a special meaning in these templates, so you type two of them to get one.",
  "body": [
   "Translated messages often need values inserted into them, and the position of those values differs between languages. Concatenating strings in code, such as `\"Hello \" + name + \", you have \" + n + \" messages\"`, fixes the word order inside the program, so it cannot be translated properly; a translator can change the words but not their order around the inserted values. The class `java.text.MessageFormat` solves this with patterns that contain numbered placeholders, so each translation can place the values wherever its grammar requires.",
   "Placeholders are written `{0}`, `{1}` and so on, where the number is the zero-based index of the argument. The static method `MessageFormat.format(pattern, args...)` fills them in using the default locale. Arguments may appear in any order in the pattern and may be used more than once, and not every argument has to be used. A placeholder whose index has no matching argument is left in the output as written, so `{2}` with only two arguments prints the text `{2}` rather than throwing an exception.",
   "```java\nString p = \"{0} has {1} new messages\";\nMessageFormat.format(p, \"Ana\", 3);            // Ana has 3 new messages\nMessageFormat.format(\"{1}, {0}.\", \"World\", \"Hello\"); // Hello, World.\nMessageFormat.format(\"Total: {0}\", 12345);      // Total: 12,345 (US default locale)\nMessageFormat.format(\"It''s {0}\", \"late\");      // It's late\n\nvar mf = new MessageFormat(\"{0,number,percent} done\", Locale.FRANCE);\nmf.format(new Object[] { 0.75 });               // 75 % done (French spacing)\n```",
   "A placeholder can include a format type and an optional style, separated by commas: `{1,number}`, `{1,number,integer}`, `{1,number,percent}`, `{1,number,currency}`, `{0,date,short}` or `{0,time}`. Even without a type, numbers are formatted with the locale's rules, so 12345 appears as `12,345` in a US locale and with a different grouping separator in others. This surprises people who expect plain digits, and it matters when a message embeds an identifier such as an order number; pass such values as Strings if you want them printed exactly. The date and time types format `java.util.Date` objects, not java.time types. For java.time values, format them with DateTimeFormatter first and pass the resulting String as the argument.",
   "The `choice` type handles simple plurals and ranges: `{0,choice,0#no files|1#one file|1<{0} files}` chooses text by numeric range. Each part has a limit, then `#` meaning greater than or equal to that limit, or `<` meaning strictly greater than it, then the text to use. With that pattern, 0 prints \"no files\", 1 prints \"one file\", and 5 prints \"5 files\", because the nested `{0}` inside the chosen text is formatted too. The underlying class is ChoiceFormat.",
   "Apostrophes are the famous trap. In a MessageFormat pattern, a single quote starts a quoted section in which braces are literal, and a second single quote ends it. So `\"It's {0}\"` loses the apostrophe and the placeholder is not replaced, because everything after the quote is treated as literal text: the output is `Its {0}`. Write two single quotes, `It''s {0}`, to produce one apostrophe. Quoting is deliberate when you want literal braces: `'{0}'` prints `{0}`. This matters in practice because translators often write contractions and elisions in languages like English and French, and a single unescaped apostrophe silently breaks the message rather than throwing an error.",
   "In real applications the pattern comes from a resource bundle rather than a string literal: `MessageFormat.format(bundle.getString(\"inbox\"), user, count)`. Each properties file holds its own pattern with placeholders in its own order, and the calling code never changes. To format for a specific locale rather than the default, create an instance with `new MessageFormat(pattern, locale)` and call `format(Object[])` on it, as in the French percent example. MessageFormat instances, like other java.text formats, are not thread-safe, so do not share one instance across threads without synchronization; the static format method creates a fresh instance each time.",
   "It is worth contrasting MessageFormat with `String.format` and the related `formatted` method, which use printf-style specifiers such as `%s` and `%d`. Those are convenient for log lines and developer-facing text, but their placeholders are positional by default and their syntax is unfamiliar to many translators. MessageFormat's numbered braces make reordering obvious and safe, and its format types apply locale rules automatically. A common division of labor is to use String.format for internal messages and MessageFormat with resource bundles for anything a user reads. On the exam, watch which method a question calls: braces belong to MessageFormat, and percent specifiers belong to String.format and printf.",
   "For the exam, check each placeholder index against the argument list, remember that indexes start at zero and may repeat, predict locale-based number formatting even without a format type, and look closely for single apostrophes, which change everything that follows them."
  ],
  "analogy": "A MessageFormat pattern is like a recipe card with numbered ingredient slots: slot 0 is the name, slot 1 is the count. Each language writes its own recipe and may use the slots in any order, or twice. The apostrophe is like a \"do not touch\" sticker: everything after a single one is copied exactly as written until the sticker ends, so the slots stop working. Two apostrophes in a row simply print one, with no sticker.",
  "terms": [
   [
    "MessageFormat",
    "A java.text class that builds locale-aware messages by substituting arguments into indexed placeholders."
   ],
   [
    "Placeholder",
    "A {n} element in a pattern replaced by argument n, optionally with a format type such as number or date."
   ],
   [
    "Format type",
    "The second part of a placeholder, such as number, date, time or choice, controlling how the argument is formatted."
   ],
   [
    "Quoting",
    "In MessageFormat, a single quote starts a literal section; two single quotes produce one apostrophe."
   ],
   [
    "ChoiceFormat",
    "A format used through the choice type that selects text based on numeric ranges, useful for simple plurals."
   ]
  ],
  "example": "A mobile app's English bundle has inbox={0}, you have {1} new messages, and its German bundle puts the count earlier in the sentence. The code calls MessageFormat.format(bundle.getString(\"inbox\"), name, count) in both cases, and each language controls its own word order.",
  "mistakes": [
   [
    "Writing a pattern such as Don't forget {0} with a single apostrophe.",
    "The single quote starts a literal section, producing Dont forget {0}. Write two single quotes: Don''t forget {0}."
   ],
   [
    "Believing placeholders start at {1}.",
    "Indexes are zero-based; {0} is the first argument."
   ],
   [
    "Expecting a missing argument, such as {3} with two arguments, to throw an exception.",
    "The placeholder is left in the output as the literal text {3}."
   ],
   [
    "Passing a LocalDate to a {0,date} placeholder.",
    "The date and time types format java.util.Date. Format java.time values with DateTimeFormatter and pass the String."
   ]
  ],
  "tryit": [
   [
    "An app must say \"no new messages\", \"1 new message\" or \"N new messages\" in English, and translators need to supply their own forms. A developer proposes three separate keys and an if-else in code. What MessageFormat feature offers a cleaner approach, and what would the English pattern look like?",
    "Use the choice format type in a single bundle value: {0,choice,0#no new messages|1#1 new message|1<{0} new messages}. Translators can edit the ranges and texts in their own files without code changes."
   ],
   [
    "A shipping notice pattern is \"Order {0} ships on {1}\" and the order number 1048576 prints as 1,048,576. Why, and how do you fix it?",
    "Numbers passed to a placeholder are formatted with the locale's grouping even without a format type. Pass the order number as a String, for example String.valueOf(orderNumber), so it prints exactly."
   ]
  ],
  "tip": "Placeholders are zero-based and can be reused or reordered. A lone apostrophe breaks the pattern, so write two single quotes. Numbers are formatted with locale grouping even without a format type, and missing arguments leave the placeholder text unchanged.",
  "check": [
   [
    "What does MessageFormat.format(\"{0} and {0} and {1}\", \"A\", \"B\") return?",
    "A and A and B; placeholders can be reused."
   ],
   [
    "What does MessageFormat.format(\"Don't forget {0}\", \"milk\") produce?",
    "Dont forget {0}. The single quote starts a quoted section, so the apostrophe disappears and the placeholder stays literal; use two single quotes."
   ],
   [
    "What is printed for a placeholder {3} when only two arguments are passed?",
    "The text {3} itself; missing arguments are left as the placeholder."
   ],
   [
    "With the pattern {0,choice,0#no files|1#one file|1<{0} files}, what prints for 4?",
    "4 files, because 4 is greater than 1 and the nested {0} is formatted."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
