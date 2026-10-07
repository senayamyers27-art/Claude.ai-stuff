/* Teacher edition for CompTIA Data+ (DA0-002): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("data-plus", [
 {
  "t": "Structured, semi-structured and unstructured data, with examples of each",
  "objectives": [
   "Students will be able to define structured, semi-structured and unstructured data and give two examples of each.",
   "Students will be able to classify a described data source, including mixed cases such as email, using the presence of a schema or self-describing labels.",
   "Students will be able to explain what preparation (direct query, flattening or feature extraction) each data shape needs before analysis."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up prompt and have students jot answers on sticky notes. Collect a few and sort them on the whiteboard without labeling the groups yet."
   ],
   [
    12,
    "Teach",
    "Name the three shapes and label the warm-up groups. Show a small table, a short JSON snippet with one record missing a key and a nested list, and a paragraph of customer feedback. Ask what you could do with each in SQL right now. Introduce flattening and feature extraction as the bridge to analysis."
   ],
   [
    15,
    "Activity",
    "Run the card sort described below in groups of three. Circulate and ask groups to justify borderline cards out loud."
   ],
   [
    8,
    "Discuss",
    "Groups share their hardest card. Use the discussion questions to draw out the idea that the container does not decide the shape."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or in a form and hand them in."
   ]
  ],
  "warmup": "Think of three kinds of information your phone stores, such as contacts, photos or messages. Which of them could you sort into a neat table in one minute, and which could you not? Why?",
  "activity": {
   "title": "Data shape card sort",
   "materials": "Printed cards (about 16 per group), each describing one data source; whiteboard or table divided into Structured, Semi-structured, Unstructured and Mixed; sticky notes.",
   "steps": [
    "Before class, print cards such as: payroll table, JSON API response with optional keys, recorded sales calls, CSV export of orders, XML configuration file, scanned paper invoices, server log with key=value pairs, product photos, email message, survey with a free-text comment column.",
    "Groups place each card in a column and write on a sticky note one reason for each placement, naming the clue they used (fixed schema, labels or tags, or no model).",
    "For each Mixed card, groups split it into its parts and classify each part.",
    "For three cards of their choice, groups write the preparation step needed before analysis: query directly, flatten, or extract features (and how).",
    "Groups swap tables with a neighbor and challenge any placement they disagree with."
   ]
  },
  "discussion": [
   "Why might a single database table contain both structured and unstructured data, and what does that mean for analysis?",
   "When a tool like an NLP model turns text into a sentiment column, how much should you trust that new column, and how would you check it?"
  ],
  "exit": [
   [
    "Give one example each of structured, semi-structured and unstructured data.",
    "For example: a relational orders table; a JSON API response; a set of product photos or free-text reviews."
   ],
   [
    "A CSV file has the same eight columns on every row. Which shape is it, and why?",
    "Structured, because every record follows the same fixed fields; being a text file does not change that."
   ],
   [
    "What must happen to nested JSON before most tabular analysis?",
    "It must be parsed and flattened into rows and columns, with optional missing keys handled as nulls."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-question flowchart (fixed schema? labels or tags? neither?) to apply to each card, and start them with the clearest examples before mixed cases.",
   "Extend: Ask fast finishers to sketch how they would flatten a JSON order with a nested list of three line items into a table, showing the resulting rows and columns."
  ]
 },
 {
  "t": "Relational databases: tables, primary and foreign keys, normalization and relationships",
  "objectives": [
   "Students will be able to identify the primary key, foreign keys and composite keys in a set of related tables.",
   "Students will be able to describe one-to-one, one-to-many and many-to-many relationships and model many-to-many with a junction table.",
   "Students will be able to normalize a flat table toward 3NF and name the anomaly each step prevents.",
   "Students will be able to explain why transactional systems normalize while reporting systems often denormalize."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a flat order spreadsheet with repeated customer details and one inconsistent email. Ask the warm-up question and take three answers."
   ],
   [
    12,
    "Teach",
    "Draw Customers and Orders on the whiteboard. Mark the primary key and foreign key, then add Products and an OrderLines table with a composite key. Walk through 1NF, 2NF and 3NF using the same example, and name update, insert and delete anomalies."
   ],
   [
    16,
    "Activity",
    "Pairs normalize the printed flat table described below and draw the resulting design with crow's-foot or simple 1-to-many arrows."
   ],
   [
    7,
    "Discuss",
    "Two pairs present their designs. Compare choices of natural versus surrogate keys and discuss when denormalizing for reports is reasonable."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "This spreadsheet lists a customer's email on every order she placed. She changed her email and only some rows were updated. What problems will that cause, and how could the data be stored so it cannot happen?",
  "activity": {
   "title": "Untangle the flat file",
   "materials": "Printed one-page flat table of about 12 rows (OrderID, OrderDate, CustomerName, CustomerEmail, CustomerCity, ProductCode, ProductName, Quantity, UnitPrice), with a 'Colors' column holding lists; blank paper; whiteboard markers.",
   "steps": [
    "Pairs circle every value that is repeated across rows and every cell that holds more than one value.",
    "Pairs fix the 1NF problems first, splitting list cells so each column holds one value.",
    "Pairs split the table into Customers, Products, Orders and OrderLines, choosing a primary key for each and marking foreign keys.",
    "Pairs label each relationship as one-to-many or many-to-many and add a junction table where needed.",
    "Pairs write one sentence for each anomaly (update, insert, delete) explaining how their new design prevents it."
   ]
  },
  "discussion": [
   "When would you pick a surrogate key over a natural key such as an email address, and what could go wrong with each?",
   "If normalization prevents errors, why would a team deliberately copy data into wide reporting tables?"
  ],
  "exit": [
   [
    "In a Customers and Orders design, which table holds the foreign key and what does it reference?",
    "Orders holds CustomerID as a foreign key referencing the Customers table's primary key."
   ],
   [
    "How do you represent students who take many courses, where each course has many students?",
    "With a junction table, such as Enrollments, containing StudentID and CourseID foreign keys."
   ],
   [
    "A table stores CustomerCity on every order row. Which normal form does this violate and how do you fix it?",
    "3NF, because the city depends on the customer, not the order key; move it to the Customers table."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed diagram with the four table names already drawn so students only need to assign columns and mark keys.",
   "Extend: Ask fast finishers to write the SQL JOIN that reassembles the original flat view from their normalized tables and to predict the row count."
  ]
 },
 {
  "t": "Non-relational databases: document, key-value, column-family and graph stores",
  "objectives": [
   "Students will be able to describe the data model of document, key-value, column-family and graph stores.",
   "Students will be able to select the appropriate non-relational store for a described workload and justify the choice.",
   "Students will be able to distinguish a column-family store from columnar analytic storage.",
   "Students will be able to explain what preparation data from each store needs before tabular analysis."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about storing a social network in spreadsheets and collect ideas on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Introduce the four types with one sketch each on the whiteboard: a nested JSON document, a key and opaque value, a row key with varying columns, and nodes joined by labeled edges. Name one typical workload and one weakness for each. Call out the column-family versus columnar confusion."
   ],
   [
    15,
    "Activity",
    "Run the 'Pick the store' scenario matching activity in groups of three or four."
   ],
   [
    8,
    "Discuss",
    "Groups reveal answers for the trickiest scenarios and defend them. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on a half sheet."
   ]
  ],
  "warmup": "Imagine storing a social network, with people, friendships and who follows whom, in a spreadsheet. How would you find all friends of friends of one person? What makes that hard?",
  "activity": {
   "title": "Pick the store",
   "materials": "Printed scenario cards (about 12), four labeled corner signs or table areas (Document, Key-value, Column-family, Graph), sticky notes.",
   "steps": [
    "Before class, write scenario cards such as: shopping cart by session ID, product catalog with varied attributes, smart-meter readings every minute from a million homes, fraud ring detection, user preferences cache, recommendation 'customers who bought this also bought,' blog content with evolving fields, IoT event log.",
    "Groups read each card and place it under one store type, writing the deciding clue on a sticky note.",
    "For each placement, groups also write one thing that store would do poorly for that organization.",
    "Add two curveball cards (for example 'monthly revenue report scanning three columns of a billion rows') and ask whether any NoSQL type fits or whether a columnar warehouse is better.",
    "Groups walk the room, read another group's sticky notes and leave one question or disagreement."
   ]
  },
  "discussion": [
   "If a company keeps data in four different kinds of databases, what challenges does that create for an analyst building one dashboard?",
   "Why might a store that relaxes consistency still be the right choice for a shopping cart or a sensor log?"
  ],
  "exit": [
   [
    "Which store fits looking up a user's session by session ID in milliseconds?",
    "A key-value store."
   ],
   [
    "Which store fits finding accounts linked through shared devices several steps away?",
    "A graph database, since it stores and traverses relationships directly."
   ],
   [
    "How does a column-family store differ from columnar storage in a warehouse?",
    "Column-family is a distributed NoSQL model for heavy writes with varying columns per row; columnar storage keeps each column together on disk to speed analytic scans."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-line keyword cheat sheet (flexible JSON, lookup by key, massive writes, relationships) to use while sorting the cards.",
   "Extend: Ask fast finishers to sketch how they would flatten a customer document with a nested array of three addresses into a table, and how they would export a small graph as node and edge tables."
  ]
 },
 {
  "t": "Data types: strings, integers, decimals, dates and times, Booleans and type conversion",
  "objectives": [
   "Students will be able to choose the appropriate data type (string, integer, decimal, float, date or timestamp, Boolean) for a described column.",
   "Students will be able to explain the errors caused by storing identifiers as numbers, money as float and dates as text.",
   "Students will be able to read a simple CAST or to_numeric expression and describe what happens to values that fail to convert."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a short column of ZIP codes that lost leading zeros and a list of text dates sorted wrongly. Ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Walk through each type family with one 'what goes wrong' example: leading zeros, float drift with 0.1 + 0.2, day-month ambiguity, mixed Boolean values. Show a CAST in SQL and a to_numeric call in pandas on the projector and explain explicit versus implicit conversion."
   ],
   [
    15,
    "Activity",
    "Pairs complete the 'Type detective' worksheet described below."
   ],
   [
    8,
    "Discuss",
    "Review answers as a class, focusing on the columns pairs disagreed about. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A spreadsheet shows the ZIP code for Boston as 2134 and lists '10/01/2025' before '9/30/2025' when sorted. What do you think is causing each problem?",
  "activity": {
   "title": "Type detective",
   "materials": "Printed worksheet showing a 10-row sample with columns (customer_id, zip, phone, signup_date, plan_price, units, is_active, size, notes), each with a few messy values; pens; projector for review. Optionally, student laptops with a browser-based spreadsheet.",
   "steps": [
    "Pairs assign the best data type to each column and write a one-line reason.",
    "Pairs circle values that would fail to convert (such as 'N/A' in units or '31/12/2024' in a US date column) and decide how to handle each.",
    "Pairs mark which columns would be damaged by automatic type detection and describe the damage.",
    "If laptops are available, pairs paste the sample into a spreadsheet, observe what the tool auto-detects, then fix the types.",
    "Pairs write the SQL CAST they would use for plan_price and signup_date."
   ]
  },
  "discussion": [
   "Why might a tool's automatic type detection be convenient but risky for a recurring data load?",
   "When values fail to convert, what is the risk of silently dropping them, and what would you do instead?"
  ],
  "exit": [
   [
    "Which type should a ZIP code column use, and why?",
    "A string, because ZIP codes are identifiers, not quantities, and numeric types drop leading zeros."
   ],
   [
    "Why use decimal instead of float for currency?",
    "Decimal stores exact values; float uses binary approximations that can cause rounding drift in totals."
   ],
   [
    "What does CAST(order_date_text AS DATE) do, and what should you check afterward?",
    "It converts text to a real date type; check how many values failed to convert and whether the day-month order was interpreted correctly."
   ]
  ],
  "differentiation": [
   "Support: Provide a type decision card with three questions (Will I do math on it? Does it need exact precision? Is it a point in time?) to guide each choice.",
   "Extend: Ask fast finishers to explain how storing timestamps in UTC changes a daily sales count for a business with stores in several time zones, and to propose a display approach."
  ]
 },
 {
  "t": "File formats: CSV, TSV, JSON, XML, Parquet, spreadsheets and flat files",
  "objectives": [
   "Students will be able to describe the structure and typical use of CSV, TSV, fixed-width, JSON, XML, Parquet and spreadsheet files.",
   "Students will be able to identify common reading errors (unquoted delimiters, encoding mismatches, lost types) and how to prevent them.",
   "Students will be able to choose an appropriate file format for a described data exchange or analytic workload and justify it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a short CSV snippet where one city name contains a comma and the columns visibly shift. Ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Show the same three orders as CSV, TSV, JSON and XML on the projector. Explain quoting, encoding and headers for flat files, nesting in JSON and XML, and draw row-based versus columnar storage on the whiteboard to explain Parquet. Finish with the tidy-table rules for spreadsheets."
   ],
   [
    15,
    "Activity",
    "Run the 'Format clinic' activity in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share their format recommendations for each scenario card. Use the discussion questions to weigh readability against performance."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "This CSV row was meant to have five columns but shows six. Look at the city value. What happened, and how could the file have been written to prevent it?",
  "activity": {
   "title": "Format clinic",
   "materials": "Printed packet with four short broken file excerpts (an unquoted comma in CSV, garbled accented characters, a spreadsheet with merged headers and subtotal rows, a nested JSON order) and six scenario cards; pens; optional student laptops with a browser text editor.",
   "steps": [
    "Pairs diagnose each broken excerpt and write the cause and fix (for example, quote the field, read as UTF-8, unmerge headers and remove subtotal rows).",
    "Pairs rewrite the nested JSON order as a flat table by hand, one row per line item.",
    "Pairs read six scenario cards (vendor feed to many partners, API data with nested items, two years of clickstream for repeated queries, a mainframe export, a small summary for a manager, a regulated exchange requiring schema validation) and pick a format for each.",
    "Pairs write one sentence justifying each choice using the format's strength.",
    "Pairs compare with another pair and resolve any disagreements."
   ]
  },
  "discussion": [
   "Why is CSV still so widely used even though it loses data types?",
   "When would converting files to Parquet be worth the extra step, and when would it not?"
  ],
  "exit": [
   [
    "How must a CSV value containing a comma be written?",
    "Wrapped in double quotes, with any internal quotes doubled."
   ],
   [
    "Which format is columnar and compressed for analytics?",
    "Parquet."
   ],
   [
    "Name two spreadsheet habits that make a file unreliable as a data source.",
    "Any two of: merged cells, notes or subtotals in the data area, mixed types in a column, color used as data, multiple header rows."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference showing a tiny example of each format side by side, and let them use it during the clinic.",
   "Extend: Ask fast finishers to explain how a reader should handle a CSV field containing both a comma and a double quote, and to write the correctly escaped value."
  ]
 },
 {
  "t": "Data warehouses, data marts, data lakes and lakehouses; OLTP vs OLAP",
  "objectives": [
   "Students will be able to contrast OLTP and OLAP workloads and explain why analysis is moved off transactional systems.",
   "Students will be able to compare data warehouses, data marts, data lakes and lakehouses, including schema on write versus schema on read.",
   "Students will be able to recommend the appropriate store for a described business scenario and justify it.",
   "Students will be able to describe how a data lake becomes a data swamp and name governance practices that prevent it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to vote on what is slowing the system and what they would do."
   ],
   [
    12,
    "Teach",
    "Draw the flow on the whiteboard: OLTP sources on the left, pipelines in the middle, warehouse with marts and a lake on the right, then show where a lakehouse merges the two. Contrast schema on write and schema on read, and list governance practices for lakes."
   ],
   [
    15,
    "Activity",
    "Run the 'Architect's desk' scenario activity in groups."
   ],
   [
    8,
    "Discuss",
    "Groups present one recommendation each and the class challenges it. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "During month-end, a store's checkout system becomes slow whenever the finance team runs its annual sales report. What do you think is going on, and how might you fix it without stopping either job?",
  "activity": {
   "title": "Architect's desk",
   "materials": "Printed scenario cards (8 to 10), a large sheet or whiteboard section per group, markers, sticky notes in two colors.",
   "steps": [
    "Before class, write scenarios such as: hospital needs enterprise reports from billing and admissions; data scientists want to explore raw telemetry and images; finance wants its own simple reporting area; a retailer records thousands of sales per minute; leadership wants one platform for BI and machine learning; a lake nobody trusts anymore.",
    "Groups draw a simple architecture on their sheet covering all scenarios, labeling OLTP sources, pipelines, warehouse, marts, lake or lakehouse.",
    "Groups place one sticky note per scenario on the component that serves it, writing the deciding clue.",
    "Using the second color, groups add two governance controls for any lake they drew.",
    "Groups rotate to another group's sheet and leave one question or suggested improvement."
   ]
  },
  "discussion": [
   "What are the risks if each department builds its own independent data mart?",
   "Is schema on read a strength or a weakness? When would you want each approach?"
  ],
  "exit": [
   [
    "Which kind of system handles many small, concurrent writes such as recording sales?",
    "OLTP (online transaction processing)."
   ],
   [
    "What is the difference between schema on write and schema on read?",
    "Schema on write (warehouse) applies structure as data is loaded; schema on read (lake) stores raw data and applies structure when it is queried."
   ],
   [
    "Name one governance practice that keeps a data lake from becoming a data swamp.",
    "Any of: a data catalog, clear data ownership, quality checks, access controls, documented metadata."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison table template (warehouse versus lake) with row labels such as data type, schema timing, users and cost, for students to fill in before the activity.",
   "Extend: Ask fast finishers to explain the difference between a dependent and an independent data mart and when an organization might accept the risks of an independent one."
  ]
 },
 {
  "t": "Dimensional modeling: fact and dimension tables, star and snowflake schemas, slowly changing dimensions",
  "objectives": [
   "Students will be able to distinguish fact tables from dimension tables and state the grain of a fact table.",
   "Students will be able to compare star, snowflake and galaxy schemas and explain the trade-offs.",
   "Students will be able to choose the correct SCD type (1, 2 or 3) for a described business requirement.",
   "Students will be able to identify additive, semi-additive and non-additive measures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hand out or project a sample store receipt and ask the warm-up question. List student answers in two columns on the whiteboard without naming them yet."
   ],
   [
    12,
    "Teach",
    "Name the two columns as facts and dimensions. Draw a star schema from the receipt, then convert the Product dimension into a snowflake. Define grain and measure additivity. Present the Denver customer story and walk through SCD Types 1, 2 and 3 with a small table on the board."
   ],
   [
    15,
    "Activity",
    "Groups complete the 'Build the star' activity described below."
   ],
   [
    8,
    "Discuss",
    "Groups present their grain choice and SCD decisions. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Look at this receipt. Which pieces of information are numbers you might add up, and which pieces describe the sale?",
  "activity": {
   "title": "Build the star",
   "materials": "Printed business brief for a fictional movie theater chain (ticket sales, concessions, locations, films, show dates), sticky notes in two colors, large paper or whiteboard space per group, markers.",
   "steps": [
    "Groups read the brief and agree on the grain of a ticket sales fact table, writing it in one sentence at the center of their paper.",
    "Using one color of sticky note, groups list measures for the fact table; using the other color, they list dimensions and their attributes.",
    "Groups arrange the notes into a star schema, then show how the Film dimension would look if snowflaked into Film and Genre.",
    "Groups mark each measure as additive, semi-additive or non-additive.",
    "Groups receive two change cards (a theater is renamed after a renovation; a film's rating was entered incorrectly) and decide which SCD type to apply to each, with a reason."
   ]
  },
  "discussion": [
   "Why might a business choose a star schema even though it stores the same category name many times?",
   "Can you think of an attribute where losing history with Type 1 would be acceptable, and one where it would cause real reporting problems?"
  ],
  "exit": [
   [
    "In a sales model, where do quantity and product category belong?",
    "Quantity is a measure in the fact table; product category is an attribute in the Product dimension."
   ],
   [
    "Which SCD type keeps full history by adding a new row with effective dates?",
    "Type 2."
   ],
   [
    "Why should account balances not be summed across months?",
    "Balance is semi-additive; summing it over time double-counts the same money. Use the period-end or average balance instead."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially drawn star with the fact table and two dimensions labeled, and a word bank of candidate measures and attributes to place.",
   "Extend: Ask fast finishers to add a Concessions fact table that shares dimensions with Ticket Sales, forming a galaxy schema, and to explain which dimensions must be shared for the two to be compared."
  ]
 },
 {
  "t": "Data environments: on-premises vs cloud, and tools such as spreadsheets, SQL clients, notebooks and BI platforms",
  "objectives": [
   "Students will be able to compare on-premises, cloud and hybrid environments in terms of cost model, scalability, control and data residency.",
   "Students will be able to describe the strengths and weaknesses of spreadsheets, SQL clients and IDEs, notebooks and BI platforms.",
   "Students will be able to recommend an environment and tool for a described analytics task and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record student answers on the whiteboard under 'tools we already use.'"
   ],
   [
    12,
    "Teach",
    "Contrast on-premises, cloud and hybrid with a simple two-column table on the whiteboard (cost model, scaling, control, responsibility, residency). Then walk through the four tool categories, showing a screenshot or quick projector demo of a spreadsheet pivot, a SQL query, a notebook cell with a chart, and a dashboard."
   ],
   [
    15,
    "Activity",
    "Run the 'Right tool, right job' role-play described below."
   ],
   [
    8,
    "Discuss",
    "Groups share where they disagreed and the class settles each case. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Think about the last time you analyzed any data, even a budget or a sports stat. What tool did you use, and what would have happened if the data had been a thousand times bigger?",
  "activity": {
   "title": "Right tool, right job",
   "materials": "Printed request cards written as stakeholder emails (8 cards), role cards (CFO, store manager, data scientist, IT manager), whiteboard, sticky notes. Optional student laptops with a browser to try a free online notebook.",
   "steps": [
    "Split the class into groups of four and give each student a role card; the stakeholder roles take turns reading request cards aloud.",
    "For each request, the group agrees on an environment (on-premises, cloud or hybrid) if relevant and a tool (spreadsheet, SQL client, notebook or BI platform), and writes the choice and one reason on a sticky note.",
    "The IT manager role must raise one concern per request, such as cost, security or data residency, and the group must respond to it.",
    "Groups post their sticky notes on a class grid on the whiteboard, organized by request.",
    "Optional: pairs open a free browser notebook, run a two-cell example, edit the first cell, and observe how running cells out of order produces a stale result."
   ]
  },
  "discussion": [
   "Why do so many organizations keep spreadsheets in the workflow even when they own powerful BI tools?",
   "What questions would you ask before moving a reporting database from on-premises to the cloud?"
  ],
  "exit": [
   [
    "Which tool best delivers a daily refreshed, filterable report to many managers?",
    "A BI platform with scheduled refresh and interactive dashboards."
   ],
   [
    "Give one advantage and one risk of cloud environments.",
    "Advantage: elastic, pay-as-you-go scaling or managed services. Risk: ongoing costs that must be monitored, connectivity dependence, or data residency concerns."
   ],
   [
    "Why are notebooks useful for sharing an analysis, and what must you do before sharing?",
    "They combine code, output and explanation so others can reproduce the work; restart and run all cells from the top first."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page tool chooser with a short 'best for' and 'avoid when' line for each tool category to consult during the role-play.",
   "Extend: Ask fast finishers to design a hybrid architecture for the furniture retailer in the lesson, naming which data stays on premises, what moves to the cloud, how often it is copied, and one cost control."
  ]
 },
 {
  "t": "Languages for analysis: SQL, Python and R, and when to use each",
  "objectives": [
   "Students will be able to describe the primary purpose and strengths of SQL, Python and R in data analysis.",
   "Students will be able to read a simple SQL aggregate query and explain its result, including the role of WHERE, GROUP BY and HAVING.",
   "Students will be able to recommend a language or combination of languages for a described analytics task.",
   "Students will be able to name practices that make analysis code repeatable, such as version control and parameters."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about ordering at a restaurant and connect 'what you want' versus 'how to cook it' to declarative languages."
   ],
   [
    12,
    "Teach",
    "Project the sample SQL query and read it line by line, then show the logical processing order. Show the equivalent pandas groupby line and a short tidyverse pipeline side by side. Summarize when to use each language and the 'aggregate in SQL, analyze in Python or R' pattern."
   ],
   [
    15,
    "Activity",
    "Pairs complete the 'Read it, pick it' worksheet described below."
   ],
   [
    8,
    "Discuss",
    "Review the snippets and scenarios as a class, focusing on the HAVING question and any language choices pairs debated."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "When you order at a restaurant, you say what dish you want, not how to cook it. What is good about that arrangement, and when might you want to cook it yourself instead?",
  "activity": {
   "title": "Read it, pick it",
   "materials": "Printed worksheet with four short code snippets (two SQL queries, one pandas line, one R tidyverse pipeline) and six task scenario cards; pens. Optional student laptops with a browser-based SQL playground or notebook.",
   "steps": [
    "Pairs read each code snippet and write, in plain English, what result it produces.",
    "Pairs identify the error in a deliberately broken query that uses WHERE SUM(amount) > 1000 and rewrite it with HAVING.",
    "Pairs read six task cards (aggregate a billion-row table, automate an API download, run a statistical test for a research paper, schedule a weekly pipeline, build a quick churn model, explore a dataset with a teammate who knows only R) and choose a language or combination for each.",
    "For two tasks, pairs sketch the workflow as steps, marking which step uses SQL and which uses Python or R.",
    "Optional: pairs run one provided SQL query in a browser SQL playground and confirm their predicted result."
   ]
  },
  "discussion": [
   "If SQL can do grouping and aggregation, why do analysts still need Python or R?",
   "How do team skills and existing code influence which language you should choose for a new project?"
  ],
  "exit": [
   [
    "Which language should you use to aggregate a very large warehouse table before analysis, and why?",
    "SQL, because it processes data where it is stored and avoids moving huge volumes to a local tool."
   ],
   [
    "What is the difference between WHERE and HAVING?",
    "WHERE filters rows before grouping; HAVING filters groups after aggregation."
   ],
   [
    "Give one typical task for Python and one for R.",
    "Python: automation such as calling an API or scheduling a pipeline, or machine learning with scikit-learn. R: rigorous statistical testing or ggplot2 graphics."
   ]
  ],
  "differentiation": [
   "Support: Provide a SQL reading guide that lists the clauses in logical processing order with a one-line meaning for each, to use while reading snippets.",
   "Extend: Ask fast finishers to write the pandas and SQL versions of 'average order amount by customer segment, only for segments with more than 100 orders,' and compare them."
  ]
 },
 {
  "t": "AI and automation concepts for analysts: machine learning, generative AI, large language models, NLP and RPA",
  "objectives": [
   "Students will be able to distinguish machine learning, generative AI, LLMs, NLP and RPA and match each to a suitable business problem.",
   "Students will be able to compare supervised (classification and regression) and unsupervised (clustering) learning.",
   "Students will be able to explain hallucination and overfitting and describe how an analyst validates AI outputs.",
   "Students will be able to identify responsible-use practices, including protecting sensitive data and documenting AI use."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and have students list on sticky notes every 'AI' they used this week. Collect and cluster them on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw a simple concept map: AI at the top, machine learning beneath it with supervised (classification, regression) and unsupervised (clustering), generative AI with LLMs, NLP overlapping with LLMs, and RPA off to the side labeled 'rules, no learning.' Discuss hallucination, overfitting and data-handling rules."
   ],
   [
    15,
    "Activity",
    "Run the 'Which tool fits?' consulting activity described below."
   ],
   [
    8,
    "Discuss",
    "Groups share their recommendations and any risks they flagged. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "List every tool you used this week that someone might call 'AI,' such as autocomplete, a recommendation feed or a chatbot. Which ones do you think learned from data, and which just follow rules?",
  "activity": {
   "title": "Which tool fits?",
   "materials": "Printed client request cards (8), a printed sample of 10 short fictional customer comments, a printed short LLM-written summary of those comments that contains one invented statistic, sticky notes, whiteboard.",
   "steps": [
    "Groups act as a small analytics consultancy and read client request cards such as: predict which customers will cancel, group shoppers into segments, tag survey comments by topic, copy totals from a portal with no API every morning, draft a plain-language explanation of a chart, forecast monthly demand.",
    "For each card, groups choose the technique (supervised classification, regression, clustering, NLP, LLM, RPA or a combination) and write one reason on a sticky note.",
    "Groups manually tag the 10 sample comments by sentiment and topic, acting as a human NLP step, and compare their tags with another group to see where judgment differs.",
    "Groups read the LLM-written summary, check every claim against the 10 comments and circle the invented statistic.",
    "Groups write two rules their consultancy will follow when using AI tools with client data."
   ]
  },
  "discussion": [
   "If an AI tool saves hours but is sometimes wrong, how should an analyst decide how much checking is enough?",
   "What could go wrong if a model is trained mostly on data from one group of customers and used for everyone?"
  ],
  "exit": [
   [
    "A bot copies values from one application screen into another using fixed steps. What is this, and does it learn?",
    "Robotic process automation (RPA); it follows rules and does not learn."
   ],
   [
    "Name the type of learning used to group customers without predefined labels.",
    "Unsupervised learning, specifically clustering."
   ],
   [
    "What is hallucination, and how should an analyst guard against it?",
    "Confident but false output from a generative model; guard against it by verifying claims and code against source data and known figures."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page decision tree (Does it learn from data? Is there a known label? Is the output a category or a number? Is it about language? Is it fixed clicks and typing?) to use with the request cards.",
   "Extend: Ask fast finishers to describe how they would test a churn classification model before deployment, including what held-out data they would use and how they would check for bias across regions."
  ]
 },
 {
  "t": "Data acquisition methods: database extracts, APIs, web scraping, file exports, surveys and sampling",
  "objectives": [
   "Students will be able to match a data acquisition method (database extract, API, web scraping, file export or survey) to a business scenario and justify the choice.",
   "Students will be able to explain authentication, rate limits and pagination as practical requirements of API collection.",
   "Students will be able to compare simple random, stratified, systematic, cluster and convenience sampling and identify which risks sampling bias.",
   "Students will be able to describe the legal and ethical checks required before web scraping."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard, grouping them as 'from our systems', 'from someone else's systems' and 'new data we create'."
   ],
   [
    12,
    "Teach",
    "Walk through the five acquisition methods with one strength and one weakness each. Draw an API request loop on the board showing key, request, page of results and next-page token. Then introduce the five sampling methods using the class itself as the population."
   ],
   [
    15,
    "Activity",
    "Run the Method Match card sort described below in groups of three or four."
   ],
   [
    8,
    "Discuss",
    "Each group defends one tricky card. Use the discussion questions to probe scraping ethics and sampling bias."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on sticky notes and post them by the door."
   ]
  ],
  "warmup": "Your manager wants competitor prices, last month's sales and customer opinions by Friday. Where would you get each one, and what could go wrong with each source?",
  "activity": {
   "title": "Method Match card sort",
   "materials": "Printed scenario cards (about 12 per group), five header cards labeled Database extract, API, Web scraping, File export, Survey, and a second set of five sampling header cards; whiteboard for results.",
   "steps": [
    "Give each group a deck of scenario cards, such as 'nightly copy of orders from our order system', 'partner emails a monthly CSV', 'vendor offers documented JSON access with a key' and 'competitor site with no API whose terms forbid bots'.",
    "Groups place each card under the best acquisition header and write one risk on a sticky note attached to the card.",
    "Hand out the sampling scenarios, such as 'every 25th invoice', 'three randomly chosen stores, all staff surveyed' and 'people at the mall entrance', and have groups sort them under the sampling headers.",
    "Groups mark any sampling card they think risks bias with a red dot and explain why.",
    "Reveal the answer key on the projector; groups score themselves and note any card they disagree with for discussion."
   ]
  },
  "discussion": [
   "If a website's data is visible to anyone, why might scraping it still be the wrong choice?",
   "A survey gets 20,000 responses, all from customers who opted in to email. Is it more trustworthy than 800 responses from a stratified sample? Why?",
   "When would a file export be a better choice than building an API integration?"
  ],
  "exit": [
   [
    "A vendor offers a documented API and also has a public web page with the same data. Which should you use and why?",
    "The API, because it is documented, stable and permitted, while scraping is fragile and may violate terms of use."
   ],
   [
    "Name two things API code must handle when retrieving a large dataset.",
    "Pagination (requesting each page until done) and rate limits (pacing requests), plus authentication with a key or token."
   ],
   [
    "Which sampling method guarantees every region appears in the sample?",
    "Stratified sampling, which samples randomly within each region."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference table with each method, a clue word that signals it and one risk, and let them use it during the card sort.",
   "Extend: Ask fast finishers to design a sampling plan for a 5,000-member organization with uneven subgroups, stating the method, sample size per group and one remaining source of bias."
  ]
 },
 {
  "t": "ETL vs ELT and data pipelines: batch vs streaming, full vs incremental loads",
  "objectives": [
   "Students will be able to distinguish ETL from ELT by where the transformation occurs and give a scenario suited to each.",
   "Students will be able to choose between batch and streaming processing based on how quickly the business must act.",
   "Students will be able to compare full and incremental loads and explain how timestamps and change data capture identify changed rows.",
   "Students will be able to use pipeline monitoring signals to troubleshoot a stale or incorrect report."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student answers. Point out that most answers are about either timing or completeness, the two themes of the lesson."
   ],
   [
    13,
    "Teach",
    "Draw two pipelines side by side on the whiteboard, labeling where the T sits in ETL and ELT. Add a clock icon for batch versus streaming, then sketch a table with an updated_at column to show how an incremental load picks rows, and cross out a deleted row to show the gap."
   ],
   [
    15,
    "Activity",
    "Run the Pipeline Doctor activity below in pairs."
   ],
   [
    7,
    "Discuss",
    "Pairs share their diagnoses for two of the cases; use the discussion questions to compare choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A dashboard shows yesterday's sales at 9 a.m. but not today's. Is that a bug? What would you need to know to decide?",
  "activity": {
   "title": "Pipeline Doctor",
   "materials": "Projector or printed handouts with four short pipeline cases, each including a requirement and a run log excerpt; whiteboard.",
   "steps": [
    "Give each pair four cases, for example: a nightly full load now taking seven hours; a requirement that patient names never reach the warehouse; a fraud team needing alerts within seconds; and a target table that still shows customers who were deleted from the source.",
    "Each case includes a run log line such as 'read 61,204,880 rows, wrote 61,204,880, duration 6h 52m'. Pairs read the log and identify the symptom.",
    "For each case, pairs write a recommendation using the lesson vocabulary: ETL or ELT, batch or streaming, full or incremental, CDC, or periodic full reload.",
    "Pairs list one trade-off their recommendation introduces, such as more complexity or raw data in the warehouse.",
    "Review the cases together on the projector, asking a different pair to present each one."
   ]
  },
  "discussion": [
   "Why might a company keep a weekly full reload even after switching to incremental loads?",
   "What risks does ELT introduce for sensitive data, and how could a team manage them?",
   "Can you think of a report in your own life or job that truly needs streaming data rather than batch?"
  ],
  "exit": [
   [
    "In which pattern is data transformed inside the target system after loading?",
    "ELT (extract, load, transform)."
   ],
   [
    "An incremental load uses updated_at to find changes. Name one kind of change it can miss.",
    "Deleted rows, or rows changed without updating the timestamp; CDC or a periodic full reload addresses this."
   ],
   [
    "A warehouse alert must fire within seconds of a sensor reading. Batch or streaming?",
    "Streaming, because batch runs on a schedule and would be too slow."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison chart (ETL vs ELT, batch vs streaming, full vs incremental) with one keyword per cell, and let students fill in an example for each.",
   "Extend: Ask fast finishers to design monitoring for an incremental pipeline, naming at least four metrics and the threshold that should trigger an alert for each."
  ]
 },
 {
  "t": "Writing SQL queries: SELECT, WHERE, ORDER BY, GROUP BY and HAVING",
  "objectives": [
   "Students will be able to write a query using SELECT, FROM, WHERE, GROUP BY, HAVING and ORDER BY to answer a business question.",
   "Students will be able to explain the logical processing order of SQL clauses and use it to predict a query's result.",
   "Students will be able to distinguish row-level filters (WHERE) from group-level filters (HAVING).",
   "Students will be able to handle NULL correctly with IS NULL and explain the difference between COUNT(*) and COUNT(column)."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up and have students sort the paper receipts mentally, then discuss in pairs which step must happen first."
   ],
   [
    12,
    "Teach",
    "Write the sample query on the board. Number each clause by processing order in a different color, then walk a tiny six-row table through each step, crossing out rows and circling groups so students see what survives."
   ],
   [
    15,
    "Activity",
    "Run the Human Query activity below."
   ],
   [
    8,
    "Discuss",
    "Debrief the activity and walk through the discussion questions, especially why the alias fails in WHERE."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "You have a shoebox of store receipts and need each store's total for this year, only for stores over 1,000 dollars, biggest first. List the steps in the order you would actually do them.",
  "activity": {
   "title": "Human Query",
   "materials": "Printed 'row cards' (about 20, each showing an order with region, date, amount and status, some with a blank email), clause cards labeled FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY; whiteboard; optionally a free browser-based SQL sandbox on student laptops.",
   "steps": [
    "Hand one row card to each student (or a small stack to each group). Six volunteers hold the clause cards.",
    "Write a query on the board, such as regions with more than 300 in revenue in 2025, excluding cancelled orders, sorted by revenue.",
    "Clause holders call out their step in processing order. WHERE: students holding non-matching rows sit down. GROUP BY: remaining students gather by region. HAVING: groups sum their amounts and groups at or below 300 sit down. SELECT and ORDER BY: groups line up from largest total to smallest.",
    "Repeat with a deliberately broken query (an aggregate in WHERE, or = NULL) and ask the class to explain what goes wrong at which step.",
    "If laptops are available, students run the same query in a browser SQL sandbox and confirm the result matches the human version."
   ]
  },
  "discussion": [
   "Why does it make sense that WHERE cannot use SUM or COUNT?",
   "When would COUNT(DISTINCT customer_id) give a more useful answer than COUNT(*)?",
   "What questions would you ask yourself when a query's totals look too high?"
  ],
  "exit": [
   [
    "List the logical processing order of FROM, WHERE, GROUP BY, HAVING, SELECT and ORDER BY.",
    "FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY."
   ],
   [
    "You want departments with an average salary above 70,000. Which clause holds that condition?",
    "HAVING, because it tests an aggregate (AVG) after GROUP BY department."
   ],
   [
    "How do you find customers with no phone number recorded?",
    "WHERE phone IS NULL, because = NULL never matches."
   ]
  ],
  "differentiation": [
   "Support: Give students a fill-in-the-blank query template with the clauses already in written order and a separate strip showing processing order, so they focus on choosing conditions rather than syntax.",
   "Extend: Ask fast finishers to add a CASE expression that labels orders as Large or Small and then count Large orders per region using SUM(CASE ...) in a single query."
  ]
 },
 {
  "t": "Combining data: inner, left, right and full joins, unions and appending",
  "objectives": [
   "Students will be able to predict which rows an inner, left, right and full outer join return for two small tables.",
   "Students will be able to choose between a join and a union or append for a given combining task.",
   "Students will be able to explain fan-out from duplicate keys and verify a join with row counts.",
   "Students will be able to write an anti-join to find unmatched records."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show two short lists on the projector and pose the warm-up question; take quick answers."
   ],
   [
    12,
    "Teach",
    "Draw two small tables on the whiteboard (five customers, six orders, with one orphan order and one customer with no orders). Shade the result of each join type in turn, then show a union as stacking two lists with identical headers."
   ],
   [
    15,
    "Activity",
    "Run the Join Line-up activity below."
   ],
   [
    8,
    "Discuss",
    "Discuss fan-out using the duplicate customer card, then the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "One list has club members and another has event sign-ups by member ID. How would you produce a list of members who never signed up for anything?",
  "activity": {
   "title": "Join Line-up",
   "materials": "Printed cards in two colors: blue customer cards (ID and name) and yellow order cards (order ID, customer ID, amount), including one duplicate blue card with a repeated ID; masking tape to mark a 'result' area; whiteboard.",
   "steps": [
    "Split the class into a blue group and a yellow group, each student holding one card.",
    "Call out INNER JOIN on customer ID. Only students whose card has a match on the other side step into the result area, pairing up. Count the result rows on the board.",
    "Repeat for LEFT JOIN (all blue students enter, unmatched ones stand alone holding a 'NULL' sign), RIGHT JOIN and FULL OUTER JOIN, recording row counts each time.",
    "Introduce the duplicate blue card and repeat the inner join. Students see the matching yellow order pair twice and the total amount rise; record the inflated sum.",
    "Finish with UNION ALL by having a second set of yellow cards (next month's orders) line up behind the first, then ask what UNION would remove."
   ]
  },
  "discussion": [
   "Why might a join silently produce wrong totals without any error message?",
   "When would you deliberately use a full outer join instead of a left join?",
   "What checks would you build into a monthly process that appends twelve files?"
  ],
  "exit": [
   [
    "Customers has 500 rows, 50 of whom have no orders. Which join returns all 500 customers with their orders if any?",
    "Customers LEFT JOIN Orders on customer ID."
   ],
   [
    "A join of 2,000 orders to a product table returns 2,150 rows. What is the likely cause?",
    "Duplicate product keys in the product table causing fan-out."
   ],
   [
    "What is the difference between UNION and UNION ALL?",
    "UNION removes duplicate rows; UNION ALL keeps all rows and is faster."
   ]
  ],
  "differentiation": [
   "Support: Provide Venn-style diagrams for each join with the shaded area pre-drawn, and have students match each diagram to a scenario card before the activity.",
   "Extend: Ask fast finishers to write SQL for a reconciliation between two systems using a FULL OUTER JOIN that labels each row as 'Both', 'Billing only' or 'CRM only' with a CASE expression."
  ]
 },
 {
  "t": "Data quality problems: duplicates, missing values, invalid values, outliers, inconsistent formats and redundancy",
  "objectives": [
   "Students will be able to identify duplicates, missing values, invalid values, outliers, inconsistent formats and redundancy in a sample dataset.",
   "Students will be able to match each data quality problem to its usual remediation.",
   "Students will be able to explain why outliers and placeholder values require investigation rather than automatic deletion.",
   "Students will be able to describe profiling checks that reveal quality problems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a 12-row customer table with planted problems and ask students to count how many things look wrong."
   ],
   [
    10,
    "Teach",
    "Name the six problem types, writing each on the whiteboard with one example and its fix. Emphasize placeholders as hidden missing values and the 'investigate first' rule for outliers."
   ],
   [
    18,
    "Activity",
    "Run the Data Detective activity below in groups of three."
   ],
   [
    7,
    "Discuss",
    "Groups compare findings; resolve disagreements about which category a problem belongs in, then use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Look at this customer list for one minute. How many problems can you spot, and which one would hurt a sales total the most?",
  "activity": {
   "title": "Data Detective",
   "materials": "Printed 30-row order dataset (or a shared spreadsheet on student laptops) containing planted duplicates, 9999 quantities, a February 30 date, mixed state spellings, one huge order, and an address that differs between two 'systems'; highlighters in six colors; a printed fix menu.",
   "steps": [
    "Assign each of the six problem types a highlighter color and post the legend on the board.",
    "Groups scan the dataset and highlight every problem they find, writing the row number and problem type on a tally sheet.",
    "For each problem, groups choose the fix from the printed menu (deduplicate, convert to NULL or flag, validate and correct at source, investigate, standardize with lookup, designate master source).",
    "Groups recompute the total order quantity and order count after their fixes and compare with the 'source system' totals the teacher reveals.",
    "Each group names the single problem that would have caused the biggest error in the report and explains why."
   ]
  },
  "discussion": [
   "The huge order turned out to be real. What would have happened to the analysis if it had been deleted automatically?",
   "Which of these problems are best fixed at the source system rather than during analysis, and why?",
   "How would you explain to a manager why two reports built from different systems disagree?"
  ],
  "exit": [
   [
    "A column of ages contains several values of 0 for adult customers. What is the problem and the fix?",
    "Placeholder values standing in for missing data; convert them to NULL or flag them, then handle them as missing."
   ],
   [
    "'NY', 'N.Y.' and 'New York' appear in the state column. Which problem is this?",
    "Inconsistent formats; standardize with a lookup table."
   ],
   [
    "What should you do first when a box plot shows an extreme value?",
    "Investigate whether it is an error or a real value before correcting, excluding or keeping it."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a version of the dataset with each problematic row already marked, so they only need to classify the problem and choose the fix.",
   "Extend: Ask fast finishers to write validation rules (type, range, allowed list, format) for five columns that would have prevented the problems at entry."
  ]
 },
 {
  "t": "Handling missing data: deletion, imputation and flagging",
  "objectives": [
   "Students will be able to explain why the reason values are missing affects which handling method is appropriate.",
   "Students will be able to compare listwise deletion, pairwise deletion, and mean, median, mode and group imputation.",
   "Students will be able to choose and justify a missing-data strategy for a given scenario, including flagging.",
   "Students will be able to describe a sensitivity check that tests whether missing-data choices change a conclusion."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the quiz-score warm-up and have students calculate the class average three ways on mini whiteboards or paper."
   ],
   [
    12,
    "Teach",
    "Explain why missingness matters using two examples (random sensor drop versus high earners skipping income). Then cover deletion, imputation and flagging, demonstrating on the board how mean imputation shrinks spread compared with the original data."
   ],
   [
    15,
    "Activity",
    "Run the Fill the Gaps activity below in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs report how their averages changed under each method; lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Ten students took a quiz; two were absent. Scores for the eight are 55, 60, 62, 65, 70, 72, 75 and 98. What is the class average if you skip the absent students, give them the mean, or give them zero? Which feels fair?",
  "activity": {
   "title": "Fill the Gaps",
   "materials": "Printed or shared spreadsheet of 20 customer records with income and region columns, some incomes blank (more blanks in one region), and one very high income; student laptops with a browser spreadsheet tool or calculators.",
   "steps": [
    "Pairs first count missing incomes overall and by region and write down whether the gaps look random or clustered.",
    "Pairs compute average income four ways: listwise deletion, mean imputation, median imputation, and median imputation within region.",
    "Pairs add a flag column marking which incomes were imputed.",
    "Pairs record how the average and the spread (highest minus lowest, or standard deviation if the tool supports it) change under each method.",
    "Each pair writes a two-sentence recommendation for which method to use and why, referring to the clustering and the outlier."
   ]
  },
  "discussion": [
   "Why did imputing the overall mean change the average differently from imputing the median?",
   "If one region had most of the blanks, what could go wrong with listwise deletion?",
   "How would you explain your missing-data choice to a manager who just wants the number?"
  ],
  "exit": [
   [
    "Income data is skewed by a few very high earners. Which imputation is more robust, mean or median?",
    "Median, because it is not pulled by extreme values."
   ],
   [
    "What is the purpose of an imputation flag column?",
    "To mark which values were filled in so they can be identified, tested and excluded if needed."
   ],
   [
    "What is the main risk of listwise deletion when data is not missing at random?",
    "The remaining rows no longer represent the population, biasing results, and the sample shrinks."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart (How much is missing? Is it random? Numeric or categorical? Skewed?) that leads to a recommended method, and let students follow it during the activity.",
   "Extend: Ask fast finishers to design a sensitivity check for the activity data and write how they would report the result if the conclusion changed between methods."
  ]
 },
 {
  "t": "Data transformation: parsing, splitting and concatenating fields, type conversion, recoding and derived variables",
  "objectives": [
   "Students will be able to identify parsing, concatenation, type conversion, recoding and derived variables from a description of a data task.",
   "Students will be able to apply string functions to split and join fields in a spreadsheet or SQL.",
   "Students will be able to explain why identifiers should be stored as text and why conversion failures must be counted.",
   "Students will be able to sequence several transformations correctly to produce a required output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the messy shipment row on the projector and run the warm-up; collect student ideas on sticky notes."
   ],
   [
    12,
    "Teach",
    "Name each transformation on the whiteboard with a before-and-after example. Demonstrate splitting 'Smith, John' with a position function and concatenating it back, and show a postal code losing its leading zero when treated as a number."
   ],
   [
    15,
    "Activity",
    "Run the Transformation Relay activity below."
   ],
   [
    8,
    "Discuss",
    "Review the relay results and the discussion questions, focusing on order of operations."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "This row says 'Tulsa, OK 74103 | 2025-03-14 | 2025-03-18 | ups ground'. What would you need to do to it before you could report average delivery days by state and carrier?",
  "activity": {
   "title": "Transformation Relay",
   "materials": "Student laptops with a browser-based spreadsheet tool and a shared 15-row shipment dataset (combined location field, text dates, inconsistent carrier names); printed task cards; whiteboard for a scoreboard.",
   "steps": [
    "Form teams of four. Each team member takes one task card: parse the location into city, state and ZIP; convert date text to dates; recode carrier names with a small mapping table; derive days_in_transit and a Late flag.",
    "Before starting, the team decides the order of tasks and writes it on the board, explaining any dependencies (for example, dates must be converted before days can be derived).",
    "Team members complete their tasks in order, passing the sheet along, and record any rows that failed or looked odd.",
    "The team builds a small summary of average days in transit by state and carrier.",
    "Teams compare results; any differences are traced back to a transformation step and discussed."
   ]
  },
  "discussion": [
   "Which tasks depended on others, and what would have happened if you did them out of order?",
   "Why is a mapping table easier to maintain than a long nested formula for recoding?",
   "What signs would tell you that a split or conversion did not work on every row?"
  ],
  "exit": [
   [
    "You combine first_name and last_name into full_name. What is this transformation called?",
    "Concatenation."
   ],
   [
    "A text column holds '04/15/2025'. What must you do before grouping by month?",
    "Convert it from text to a date type (type conversion)."
   ],
   [
    "You calculate profit_margin as profit divided by revenue in a new column. What is that column called?",
    "A derived variable (calculated field)."
   ]
  ],
  "differentiation": [
   "Support: Provide a function cheat sheet with LEFT, RIGHT, MID or SUBSTRING, FIND or position, TRIM, CONCAT and a worked example for each, and pair struggling students with a partner for the parsing task.",
   "Extend: Ask fast finishers to handle irregular rows, such as city names containing commas or missing ZIP codes, and write a validation count showing how many rows parsed cleanly."
  ]
 },
 {
  "t": "Scaling and grouping: normalization, standardization, binning and aggregation",
  "objectives": [
   "Students will be able to calculate a min-max normalized value and a z-score from given figures.",
   "Students will be able to explain when to use normalization versus standardization, including the effect of outliers.",
   "Students will be able to compare equal-width and equal-frequency binning and describe the trade-off of losing detail.",
   "Students will be able to correctly compute an overall average from grouped data instead of averaging averages."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up comparison and take a quick vote, then reveal that you need scaling to answer fairly."
   ],
   [
    12,
    "Teach",
    "Work both formulas on the whiteboard with simple numbers. Show how adding one extreme value changes min-max results more than z-scores. Then draw equal-width and quantile bins on a number line and finish with the two-store averaging example."
   ],
   [
    15,
    "Activity",
    "Run the Scale, Bin and Roll Up stations below."
   ],
   [
    8,
    "Discuss",
    "Groups share their results from each station; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Jordan scored 82 on a test where the class average was 70. Sam scored 90 on a different test where the class average was 88. Who did better compared with their class? What else would you need to know?",
  "activity": {
   "title": "Scale, Bin and Roll Up stations",
   "materials": "Three printed station sheets with small datasets (10 to 15 values each), calculators or student laptops with a browser spreadsheet tool, sticky notes; whiteboard for answers.",
   "steps": [
    "Station 1 (Scale): groups normalize five values with min-max and compute z-scores for the same values given the mean and standard deviation, then add an outlier and recompute both to see which changes more.",
    "Station 2 (Bin): groups bin 15 customer ages into equal-width bands of 10 years and into quartiles, then sketch both as simple bar charts on sticky notes.",
    "Station 3 (Roll Up): groups receive three branches' average sale values and transaction counts, compute the overall average both the wrong way (average of averages) and the right way (from totals), and explain the difference.",
    "Groups rotate every five minutes, posting their answers on the whiteboard under each station.",
    "The teacher reviews the posted answers, correcting any errors and highlighting the outlier and averaging lessons."
   ]
  },
  "discussion": [
   "Why did the outlier change min-max normalized values more than z-scores?",
   "When would equal-width bins be easier to explain to a business audience than quantile bins, even if less balanced?",
   "Where else in daily life do people average averages and get misleading results?"
  ],
  "exit": [
   [
    "Normalize 30 in a range from 10 to 50.",
    "(30 − 10) ÷ (50 − 10) = 0.5."
   ],
   [
    "Which technique produces values with mean 0 and standard deviation 1?",
    "Standardization (z-scores)."
   ],
   [
    "Branch A averages 100 over 10 sales; Branch B averages 200 over 30 sales. What is the overall average?",
    "(1,000 + 6,000) ÷ 40 = 175, not 150."
   ]
  ],
  "differentiation": [
   "Support: Provide formula cards with the steps written out and one fully worked example for each formula, and let students use calculators at every station.",
   "Extend: Ask fast finishers to explain how a cloud dashboard should store data so users can see both monthly averages and correct overall averages, naming which columns (totals and counts) must be kept."
  ]
 },
 {
  "t": "Reshaping data: pivoting and unpivoting, wide vs long format, filtering and sorting",
  "objectives": [
   "Students will be able to identify whether a dataset is in wide or long format and explain which format BI tools prefer.",
   "Students will be able to reshape data using pivot and unpivot and distinguish these from transposing.",
   "Students will be able to verify a reshape by reconciling totals and row counts.",
   "Students will be able to explain how filters and sorting affect what a report shows, including common mistakes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the same small dataset in wide and long form side by side and pose the warm-up question."
   ],
   [
    10,
    "Teach",
    "Label the parts of each layout on the whiteboard. Draw arrows labeled Pivot and Unpivot between them, then show a transposed version to contrast. Briefly cover filtering early, leftover filters and sorting whole records."
   ],
   [
    18,
    "Activity",
    "Run the Reshape It activity below in pairs."
   ],
   [
    7,
    "Discuss",
    "Pairs share their reconciliation checks; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here is the same sales data laid out two ways. Which would you rather read? Which would you rather add next month's data to? Why might those answers differ?",
  "activity": {
   "title": "Reshape It",
   "materials": "Student laptops with a browser-based spreadsheet tool; a shared wide budget table (5 departments by 6 months) and a long actuals table (department, month, amount, about 40 rows); printed instructions; whiteboard.",
   "steps": [
    "Pairs unpivot the wide budget into department, month and budget columns, using a built-in unpivot feature if available or by copying and stacking columns manually.",
    "Pairs reconcile: the sum of the new budget column must equal the sum of the original grid, and the row count must be 30.",
    "Pairs build a pivot table from the long actuals with department as rows, month as columns and a sum of amount as values, and compare the totals with the budget.",
    "The teacher announces that one actuals row is a test transaction; pairs apply a filter to exclude it and note how the totals change.",
    "Pairs sort the combined result by variance (actual minus budget) descending and report the department most over budget."
   ]
  },
  "discussion": [
   "Why would a finance team keep sending budgets in wide format even if analysts prefer long?",
   "What could go wrong if someone forgot to remove the test-transaction filter, or left an old filter in place, months later?",
   "When, if ever, would transposing be the right tool?"
  ],
  "exit": [
   [
    "A table has columns Store, Q1, Q2, Q3 and Q4. Is it wide or long, and what operation makes it long?",
    "Wide; unpivot (melt) the quarter columns into Quarter and Value columns."
   ],
   [
    "What is the difference between pivoting and transposing?",
    "Pivoting turns row values into column headers and aggregates cells; transposing simply swaps rows and columns without aggregating."
   ],
   [
    "A report's total is lower than the source system's. Name one reshaping-related cause to check first.",
    "An active filter that excludes rows, such as a leftover date or region filter."
   ]
  ],
  "differentiation": [
   "Support: Provide a step-by-step screenshot guide for the spreadsheet's unpivot and pivot features, and let students work with a smaller three-month version first.",
   "Extend: Ask fast finishers to write the SQL conditional-aggregation query that pivots the long actuals table into month columns, and explain how it would need to change when a new month arrives."
  ]
 },
 {
  "t": "Query optimization: indexing, filtering early, avoiding SELECT *, subsets and temporary tables",
  "objectives": [
   "Students will be able to explain how an index speeds up reads and why it slows writes.",
   "Students will be able to rewrite a query to filter early, avoid SELECT * and use an index-friendly date range instead of a function on an indexed column.",
   "Students will be able to describe when to use subsets, temporary tables and CTEs during query development.",
   "Students will be able to use an execution plan to identify a full table scan."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up phone book challenge with two volunteers and time them."
   ],
   [
    12,
    "Teach",
    "Connect the warm-up to indexes and full table scans. On the whiteboard, show a slow query and annotate each problem: function on an indexed column, SELECT *, filtering after a join, repeated subquery. Show a simple execution plan excerpt with a full scan highlighted."
   ],
   [
    15,
    "Activity",
    "Run the Query Makeover activity below in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs present one fix each; lead the discussion questions on trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "One volunteer must find every name starting with 'Mor' in an unsorted printed list of 200 names; another uses an alphabetized list. Who finishes first, and what did the second volunteer have that the first did not?",
  "activity": {
   "title": "Query Makeover",
   "materials": "Printed handout with four slow queries, each with a short execution plan excerpt and a note about table size and column count; whiteboard; optionally a free browser-based SQL sandbox on student laptops.",
   "steps": [
    "Pairs read each slow query and its plan excerpt, circling the problem (for example, WHERE YEAR(order_date) = 2025, SELECT * on a 120-column table, a join before a filter, or the same subquery written three times).",
    "Pairs rewrite each query on the handout, applying the matching technique: a date range, an explicit column list, filtering before the join, or a temporary table or CTE.",
    "For each rewrite, pairs predict what will change in the execution plan or cost (index seek instead of full scan, fewer columns scanned, fewer rows joined).",
    "Pairs identify one query where adding an index would help and one situation where an index might hurt, such as a table with very heavy inserts.",
    "If laptops are available, pairs run a before-and-after version in the sandbox and compare row counts to confirm the results did not change."
   ]
  },
  "discussion": [
   "Why is it important that an optimized query returns exactly the same results as the original?",
   "How would you decide whether to add an index to a busy order-entry table?",
   "Who pays the price when an analyst pulls all rows into a BI tool and filters there?"
  ],
  "exit": [
   [
    "Rewrite WHERE YEAR(order_date) = 2025 so it can use an index on order_date.",
    "WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01'."
   ],
   [
    "Give one benefit of listing columns instead of using SELECT *.",
    "Less data read and transferred (especially in columnar warehouses, lowering cost), and protection from schema changes."
   ],
   [
    "What is the main cost of adding an index?",
    "Extra storage and slower inserts, updates and deletes because the index must be maintained."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist of the five optimization techniques with a 'look for' clue next to each (function on column, SELECT *, filter after join, repeated logic, full scan in plan) to use while reviewing the queries.",
   "Extend: Ask fast finishers to design an indexing and partitioning plan for a reporting table, explaining which columns to index or partition on and the expected effect on both reads and loads."
  ]
 },
 {
  "t": "Measures of central tendency: mean, median and mode, and how skew affects them",
  "objectives": [
   "Students will be able to calculate the mean, median and mode of a small dataset, including a median for an even number of values.",
   "Students will be able to explain why outliers affect the mean more than the median.",
   "Students will be able to infer the direction of skew from the relationship between mean and median.",
   "Students will be able to choose the appropriate measure of central tendency for numeric, skewed and categorical data scenarios."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt about a coffee shop's average spend. Ask students to write a quick answer, then take three or four responses without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Define mean, median and mode with the list 3, 5, 5, 8, 9. Then replace 9 with 900 and recompute live to show the mean jump while the median stays at 5. Sketch right-skewed and left-skewed curves and mark where the mean, median and mode sit, repeating 'the mean follows the tail.'"
   ],
   [
    15,
    "Activity",
    "Run the human number line activity described below in small groups, then have each group report which measure they would put in a headline and why."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to connect the activity to real reporting, focusing on when reporting both mean and median is the honest choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a slip of paper and hand it in at the door."
   ]
  ],
  "warmup": "A coffee shop says its customers spend 'on average' 14 per visit. Most customers buy one drink, but a few offices place large catering orders. Do you think a typical customer spends more or less than 14? Why?",
  "activity": {
   "title": "Human number line: moving the mean",
   "materials": "Sticky notes or index cards, markers, a whiteboard, and a calculator or student laptops with a browser-based spreadsheet.",
   "steps": [
    "Give each group of five to seven students a set of cards showing fictional weekly commute times in minutes, for example 12, 15, 18, 20, 22, 25 and 28.",
    "Students sort the cards into a line on the desk and calculate the mean, median and mode, recording all three on a sticky note.",
    "Hand each group one extra card showing 240 minutes, described as a commuter caught in a rare road closure. They add it, re-sort, and recalculate all three measures.",
    "Groups write one sentence explaining which measure changed the most and why, and label the new distribution as right-skewed or left-skewed.",
    "Finally, give each group a short categorical list, such as favorite transport mode for each commuter, and ask which measure of central tendency is even possible for it."
   ]
  },
  "discussion": [
   "When might a news story or a company report choose the mean on purpose because it makes a number look larger or smaller?",
   "If you could only put one number on a dashboard tile for typical delivery time, which would you choose, and what would you write in the tooltip?",
   "Can you think of data in your own life that is left-skewed?"
  ],
  "exit": [
   [
    "Find the median of 9, 2, 6, 4.",
    "Sort to 2, 4, 6, 9; the median is (4 + 6) ÷ 2 = 5."
   ],
   [
    "A dataset has mean 52 and median 70. What kind of skew is likely?",
    "Left skew, because a tail of low values pulls the mean below the median."
   ],
   [
    "Which measure would you use to report the most common complaint category in a help-desk system?",
    "The mode, because complaint category is categorical data."
   ]
  ],
  "differentiation": [
   "Support: Provide pre-sorted cards and a step-by-step checklist (sort, find middle, add and divide, count repeats) so students can focus on comparing results rather than on arithmetic.",
   "Extend: Ask students to construct their own dataset of seven values in which the mean is greater than 50, the median is less than 30 and the mode is 20, then explain what shape the distribution has."
  ]
 },
 {
  "t": "Measures of dispersion: range, variance, standard deviation, interquartile range and percentiles",
  "objectives": [
   "Students will be able to explain why two datasets with the same mean can differ in usefulness because of their spread.",
   "Students will be able to compute the range, quartiles and IQR of a small dataset and apply the 1.5 × IQR outlier fences.",
   "Students will be able to distinguish population and sample standard deviation and select the correct spreadsheet function.",
   "Students will be able to interpret a percentile statement and pair each measure of center with an appropriate measure of spread."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the two-bus warm-up question and let students vote by show of hands for which bus they would rely on. Ask what number would capture the difference."
   ],
   [
    12,
    "Teach",
    "Introduce range, variance and standard deviation using delivery times. Explain why squaring is used and why the square root brings the result back to days. Then define percentiles, quartiles and IQR, and work through the fences example with Q1 = 20 and Q3 = 50 on the whiteboard."
   ],
   [
    15,
    "Activity",
    "Run the box plot build activity in pairs. Circulate and check that students sort the data first and compute the fences correctly."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, drawing out why service-level targets often use percentiles and when a flagged outlier should be kept."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "Two buses both arrive at your stop at 8:00 on average. Bus A is never more than two minutes early or late. Bus B can be twenty minutes early or late. Which bus do you trust for an important appointment, and what single number would show the difference?",
  "activity": {
   "title": "Build a box plot by hand",
   "materials": "Printed cards with twelve fictional ticket resolution times each (one set per pair), graph paper or the whiteboard, and student laptops with a browser-based spreadsheet for checking.",
   "steps": [
    "Each pair receives twelve ticket resolution times in hours, including one very large value such as 48 hours.",
    "Pairs sort the values, find the median, Q1 and Q3, and compute the IQR.",
    "They calculate the lower and upper fences with 1.5 × IQR and decide which values, if any, are potential outliers.",
    "Pairs draw a box plot on graph paper with the box from Q1 to Q3, the median line, whiskers to the most extreme values inside the fences, and individual dots for flagged values.",
    "Pairs check their range, standard deviation and IQR using spreadsheet functions such as STDEV.S and QUARTILE, and note which measure changed most when the large value is removed."
   ]
  },
  "discussion": [
   "Why might a cloud service promise a 95th percentile response time rather than an average response time?",
   "If you discovered a flagged outlier was a genuine, very large customer order, should it stay in the dataset? What would you report?",
   "When would you want to know the standard deviation of something in your own life, such as a commute or monthly spending?"
  ],
  "exit": [
   [
    "Q1 is 12 and Q3 is 20. What are the outlier fences?",
    "IQR is 8, 1.5 × IQR is 12, so the fences are 0 and 32."
   ],
   [
    "You have a sample of 200 customers from a population of 50,000. Which spreadsheet function gives the standard deviation?",
    "STDEV.S, because the data is a sample and the sample formula divides by n − 1."
   ],
   [
    "What does it mean if the 75th percentile of order value is 90?",
    "75% of orders were worth 90 or less, and 25% were worth more."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed worked example with the sorted list and Q1 already marked, plus a fill-in template for the fence calculation.",
   "Extend: Ask students to compare two datasets with very different means using the coefficient of variation and explain which one is relatively more variable."
  ]
 },
 {
  "t": "Distributions: normal distribution, skewness, the empirical rule and z-scores",
  "objectives": [
   "Students will be able to describe the shape and properties of a normal distribution and identify right skew, left skew, uniform and bimodal shapes from a histogram.",
   "Students will be able to apply the 68-95-99.7 rule to estimate the share of values in a range.",
   "Students will be able to calculate and interpret a z-score and use it to compare values on different scales.",
   "Students will be able to choose between z-score and IQR outlier rules based on the shape of the data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question about comparing two test scores. Collect quick answers and note that most students compare raw scores."
   ],
   [
    13,
    "Teach",
    "Draw a normal curve and mark the mean and one, two and three SDs on each side, labeling 68%, 95% and 99.7%. Work through the exam score example with mean 70 and SD 5. Introduce the z-score formula and solve the warm-up properly. Sketch right-skewed, left-skewed, uniform and bimodal histograms and explain why rules based on the normal curve weaken for skewed data."
   ],
   [
    15,
    "Activity",
    "Run the histogram shape sort and z-score challenge in groups of three or four."
   ],
   [
    7,
    "Discuss",
    "Lead the discussion questions, especially the bimodal delivery-time scenario."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Sam scored 85 on a math test where the class average was 80. Jordan scored 70 on a science test where the class average was 60. Who did better compared with their class? What extra information would you want before deciding?",
  "activity": {
   "title": "Shape sort and z-score challenge",
   "materials": "Printed cards showing eight simple histograms (normal, right-skewed, left-skewed, uniform, bimodal) with a short scenario on the back, a whiteboard, and calculators or student laptops.",
   "steps": [
    "Groups sort the histogram cards into shape categories and write the name of each shape on a sticky note attached to the card.",
    "For each card, groups decide whether the mean would be above, below or roughly equal to the median, and whether the z-score outlier rule is appropriate.",
    "Hand out a short sheet of fictional measurements with a stated mean and SD, such as call durations with mean 6 minutes and SD 1.5 minutes. Groups compute z-scores for five calls and flag any with an absolute z above 3.",
    "Each group picks one bimodal card and proposes what two groups might be mixed together and how they would split the data.",
    "Groups share one finding with the class while the teacher records them on the whiteboard."
   ]
  },
  "discussion": [
   "If a delivery-time histogram has peaks at two days and seven days, what might explain it, and what would you report instead of one average?",
   "Why do you think analysts say 'plot first' before computing statistics?",
   "Can you think of a quantity that is unlikely to be normally distributed? Why?"
  ],
  "exit": [
   [
    "Scores are normal with mean 50 and SD 8. About what percentage fall between 42 and 58?",
    "About 68%, because 42 and 58 are one SD below and above the mean."
   ],
   [
    "A value of 148 comes from roughly normal data with mean 100 and SD 15. What is its z-score, and is it flagged by the absolute z greater than 3 rule?",
    "z = (148 − 100) ÷ 15 = 3.2. It is greater than 3, so it is flagged as a potential outlier worth investigating."
   ],
   [
    "What does a histogram with two clear peaks usually suggest?",
    "Two different groups are mixed in the data and should be analyzed separately."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled normal curve template with the 68, 95 and 99.7 regions pre-shaded, and a z-score fill-in frame: (value − mean) ÷ SD.",
   "Extend: Ask students to estimate the share of values above two SDs from the mean using the empirical rule, and explain why the z-score outlier rule could mislead on a strongly right-skewed dataset."
  ]
 },
 {
  "t": "Descriptive statistics in practice: counts, frequencies, percentages, percent change and ratios",
  "objectives": [
   "Students will be able to calculate percent change correctly and distinguish it from percentage-point change.",
   "Students will be able to build frequency, relative frequency and cumulative frequency tables from raw counts.",
   "Students will be able to explain why counts of rows and counts of distinct entities differ.",
   "Students will be able to normalize totals with ratios or rates to compare groups of different sizes fairly."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up headline about a price change and ask students to decide whether the statement is accurate. Take a quick vote."
   ],
   [
    12,
    "Teach",
    "Work through percent change with 80,000 to 92,000, showing the wrong denominator result next to the right one. Explain percentage points with a 4% to 5% conversion rate. Demonstrate the 50% drop and 50% rise example. Then introduce frequency tables and normalization with the North and West store example."
   ],
   [
    15,
    "Activity",
    "Run the 'fix the headline' card activity in pairs."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore how these numbers are used, and sometimes misused, in news and business reports."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "A store advertises: 'Prices were cut 50% last month and raised 50% this month, so they're back to normal.' Is that true? Try it with a price of 100.",
  "activity": {
   "title": "Fix the headline",
   "materials": "Printed cards, each with a short fictional business headline and its underlying numbers, plus a whiteboard and calculators or student laptops.",
   "steps": [
    "Give each pair four to six headline cards, such as 'Conversion up 2%' when the rate moved from 2% to 4%, or 'East region is our worst' based only on raw complaint counts.",
    "Pairs recalculate the numbers on each card, checking the denominator, the direction of percent change and whether percentage points or percent are meant.",
    "For any comparison between groups of different sizes, pairs compute a ratio or rate, such as complaints per 1,000 orders.",
    "Pairs rewrite each headline so it is accurate and labels the period, population and base.",
    "Two or three pairs present their most surprising correction to the class."
   ]
  },
  "discussion": [
   "Why might someone choose to report a change in percentage points rather than percent, or the other way around?",
   "When could reporting only a percentage, without the count, mislead a reader?",
   "What base would you choose to compare safety incidents across warehouses of very different sizes?"
  ],
  "exit": [
   [
    "Monthly users grow from 2,000 to 2,500. What is the percent change?",
    "(2,500 − 2,000) ÷ 2,000 = 25% increase."
   ],
   [
    "A click-through rate moves from 3% to 6%. State the change in percentage points and in percent.",
    "A 3 percentage-point increase, which is a 100% relative increase."
   ],
   [
    "Region A has 10 stores and 2 million in sales; Region B has 4 stores and 1.2 million. Which has higher sales per store?",
    "B, with 300,000 per store, versus A's 200,000 per store."
   ]
  ],
  "differentiation": [
   "Support: Provide a formula card showing (new − old) ÷ old × 100 with labeled boxes, and pair struggling students with headlines that involve only one calculation each.",
   "Extend: Ask students to calculate a compound annual growth rate for a value that doubles over several years using a spreadsheet, and explain why it differs from simply dividing total growth by the number of years."
  ]
 },
 {
  "t": "Inferential statistics: samples vs populations, confidence intervals, hypothesis testing and p-values",
  "objectives": [
   "Students will be able to distinguish a population from a sample and a parameter from a statistic.",
   "Students will be able to interpret a confidence interval and explain how sample size and confidence level affect its width.",
   "Students will be able to state null and alternative hypotheses for a business scenario and reach the correct conclusion from a p-value and alpha.",
   "Students will be able to explain why statistical significance does not equal practical importance."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the soup-tasting warm-up question and collect answers about what makes one spoonful trustworthy, steering toward random, representative sampling."
   ],
   [
    13,
    "Teach",
    "Define population, sample, parameter and statistic with a customer-spend example. Explain confidence intervals with a 48 to 52 example and show how sample size and confidence level change the width. Walk through hypothesis testing for an A/B test: H0, H1, alpha, test, p-value, conclusion. Stress the wording 'fail to reject.'"
   ],
   [
    15,
    "Activity",
    "Run the courtroom verdict card activity in small groups."
   ],
   [
    7,
    "Discuss",
    "Lead the discussion questions on misinterpretations and effect size."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A chef tastes one spoonful from a large pot of soup to decide if it needs more salt. When is that one spoonful a good guide to the whole pot, and when could it mislead?",
  "activity": {
   "title": "Courtroom verdicts for A/B tests",
   "materials": "Printed scenario cards describing fictional A/B tests with results (rates, sample sizes, p-values and alpha), a whiteboard, and sticky notes in two colors.",
   "steps": [
    "Each group of three or four receives six scenario cards. For each, they write the null and alternative hypotheses on a sticky note.",
    "Groups compare the p-value with alpha and record a verdict using the exact phrase 'reject H0' or 'fail to reject H0.'",
    "For each significant result, groups judge whether the effect size is large enough to matter, writing 'practically important' or 'probably not worth acting on' with a reason.",
    "Include at least one card with a biased sample, such as survey respondents recruited only from a loyalty program, and ask groups to identify the flaw.",
    "Groups post their sticky notes on the whiteboard under each scenario, and the class compares verdicts and resolves disagreements."
   ]
  },
  "discussion": [
   "Why do statisticians insist on 'fail to reject' rather than 'accept' the null hypothesis?",
   "If an A/B test shows a statistically significant but very small improvement, what other information would you want before deciding to roll it out?",
   "Can you think of a survey you have seen that might have used a biased sample?"
  ],
  "exit": [
   [
    "A test of a new feature gives p = 0.01 with alpha 0.05. What do you conclude?",
    "Reject the null hypothesis; the result is statistically significant at the 5% level."
   ],
   [
    "What happens to a confidence interval's width if you raise the confidence level from 95% to 99% with the same data?",
    "It becomes wider, because covering the true value more often requires a broader range."
   ],
   [
    "A company surveys 300 randomly chosen customers to estimate average satisfaction for all 40,000 customers. Name the population and the sample.",
    "The population is all 40,000 customers; the sample is the 300 surveyed customers."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart: compare p with alpha, then choose 'reject H0' or 'fail to reject H0,' then check the effect size. Let students use it during the activity.",
   "Extend: Ask students to explain, in their own words, why the statement 'there is a 95% probability the true mean is in this interval' is a simplification of what a confidence interval means, and write a more precise version."
  ]
 },
 {
  "t": "Type I and Type II errors, statistical significance and sample size",
  "objectives": [
   "Students will be able to define Type I and Type II errors and identify each in business and security scenarios.",
   "Students will be able to explain the relationship among alpha, beta and statistical power.",
   "Students will be able to describe how sample size affects power and why it does not change the Type I error rate set by alpha.",
   "Students will be able to evaluate whether a significant result is practically important and recognize the multiple comparisons problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the smoke alarm warm-up question and list student answers in two columns on the board: false alarms and missed fires."
   ],
   [
    12,
    "Teach",
    "Draw the two-by-two grid of truth versus decision and label Type I and Type II. Connect alpha to Type I and beta to Type II, then define power as 1 − beta. Explain the trade-off when alpha is lowered and show how a larger sample improves power. Close with practical significance and the twenty-metrics example."
   ],
   [
    15,
    "Activity",
    "Run the error grid card sort in pairs, followed by the sample-size debate."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to examine which error matters more in different settings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A smoke alarm can go off when there is no fire, or stay silent when there is one. Which mistake is worse in a home? Would your answer change for a factory alarm that shuts down production every time it sounds?",
  "activity": {
   "title": "Error grid card sort",
   "materials": "A large two-by-two grid drawn on the whiteboard or on chart paper for each pair, printed scenario cards, and sticky notes.",
   "steps": [
    "Give each pair ten scenario cards, such as 'A medical screening test says a healthy patient is sick' or 'An A/B test finds no difference when the new design really is better.' Each card states what the null hypothesis is.",
    "Pairs place each card in the correct cell of the grid: correct decision, Type I error or Type II error.",
    "For each error card, pairs write on a sticky note whether that error is the more costly one in context and why.",
    "Hand each pair a short card describing a failed small A/B test, and ask them to propose a change to the test design, such as a power analysis or a larger sample, that would reduce the chance of a Type II error.",
    "Pairs compare grids with a neighboring pair and resolve any disagreements before the class discussion."
   ]
  },
  "discussion": [
   "In airport security screening, which error do you think authorities try hardest to avoid, and what is the cost of that choice?",
   "Why might a company keep running small tests even though they are often underpowered?",
   "If an analyst presents one significant result out of thirty metrics, what questions would you ask?"
  ],
  "exit": [
   [
    "A test concludes a new ad works when it actually has no effect. Which error type is this?",
    "A Type I error, a false positive."
   ],
   [
    "Name one way to reduce the chance of a Type II error without raising alpha.",
    "Increase the sample size, which raises statistical power."
   ],
   [
    "A huge test finds a statistically significant 0.02% lift. Is it automatically worth rolling out? Why?",
    "Not automatically; statistical significance is not practical significance, and the effect may be too small to justify the cost."
   ]
  ],
  "differentiation": [
   "Support: Provide the two-by-two grid pre-labeled with 'no effect in reality' and 'real effect' columns, and a memory card linking false positive to Type I and false negative to Type II.",
   "Extend: Ask students to explain, with a simple example, why checking an A/B test every day and stopping at the first p below 0.05 increases the chance of a Type I error."
  ]
 },
 {
  "t": "Correlation vs causation, and simple linear regression",
  "objectives": [
   "Students will be able to interpret the sign and magnitude of a Pearson correlation coefficient.",
   "Students will be able to explain three reasons a correlation may not reflect causation: confounding, reverse causation and coincidence.",
   "Students will be able to use a simple linear regression equation to make a prediction and interpret the slope and intercept.",
   "Students will be able to interpret R² and identify when a prediction is an unreliable extrapolation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up claim about ice cream and sunburns and ask students to explain the pattern in one sentence."
   ],
   [
    12,
    "Teach",
    "Sketch scatter plots for r near +1, −1, 0 and a U-shape with r near 0. Explain confounders, reverse causation and coincidence with examples. Write sales = 200 + 15 × ad_spend on the board, interpret the slope and intercept, and predict for ad spend of 10. Define residuals, least squares and R², noting R² = r² for simple regression."
   ],
   [
    16,
    "Activity",
    "Run the 'cause or coincidence' analysis in small groups, followed by quick regression predictions."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions to explore how causal claims appear in news and business reports."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A newspaper reports that towns that sell more ice cream also have more sunburn cases. Does ice cream cause sunburn? What else could explain the pattern?",
  "activity": {
   "title": "Cause or coincidence",
   "materials": "Printed cards with fictional correlation claims and small data tables, graph paper, a whiteboard, and student laptops with a browser-based spreadsheet.",
   "steps": [
    "Each group receives five claim cards, for example 'Stores with more parking spaces have higher sales (r = 0.7)' or 'Employees who take more training courses get promoted faster (r = 0.5).'",
    "For each card, groups write the most likely explanation: causation, confounding variable (name it), reverse causation or coincidence.",
    "Groups design a simple controlled test that could check one of the claims, describing what would be randomized and what would be measured.",
    "Using a short data table on one card, groups enter the data into a spreadsheet, plot a scatter chart, and use CORREL and a trendline to find r and the regression equation.",
    "Groups make one prediction inside the data range and one outside it, then explain which prediction they trust more and why."
   ]
  },
  "discussion": [
   "Why do you think causal claims based only on correlation are so common in headlines?",
   "If you could not run an experiment, what could you do to make a causal claim more convincing?",
   "Can you think of a case where reverse causation might fool a business decision?"
  ],
  "exit": [
   [
    "With the model price = 120 − 3 × age_years, what is the predicted price for a 10-year-old item?",
    "120 − 3 × 10 = 90."
   ],
   [
    "A correlation of 0.9 is found between two variables. Can you conclude one causes the other?",
    "No; correlation alone does not prove causation, because a confounder, reverse causation or coincidence could explain it."
   ],
   [
    "What does R² = 0.49 mean in simple linear regression, and what is the correlation's magnitude?",
    "The model explains 49% of the variation in y, and the magnitude of r is 0.7."
   ]
  ],
  "differentiation": [
   "Support: Provide a template for regression predictions (slope × x, then add the intercept) and a reference card with example scatter plots labeled with their r values.",
   "Extend: Ask students to create a small dataset with a clear U-shaped relationship, compute r with CORREL, and explain why r is near 0 even though the variables are strongly related."
  ]
 },
 {
  "t": "Types of analysis: exploratory, descriptive, diagnostic, predictive, prescriptive and trend analysis",
  "objectives": [
   "Students will be able to define exploratory, descriptive, diagnostic, predictive, prescriptive and trend analysis.",
   "Students will be able to classify a stakeholder request by its analysis type based on the question being asked.",
   "Students will be able to explain why prescriptive analysis depends on the other types.",
   "Students will be able to justify the use of year-over-year comparisons for seasonal data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the doctor's visit warm-up and have students list the steps a doctor takes, then reveal how each maps to an analysis type."
   ],
   [
    12,
    "Teach",
    "Introduce each analysis type with its question word and a business example. Draw the sequence explore, describe, diagnose, predict, prescribe as arrows on the board. Explain trend analysis with a seasonal sales chart, comparing month over month with year over year."
   ],
   [
    15,
    "Activity",
    "Run the request card sort in small groups."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, focusing on which types are hardest and why prescriptive analysis needs the others."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you visit a doctor because you feel unwell, what steps does the doctor go through from the moment you walk in to the moment you leave with a plan? List them in order.",
  "activity": {
   "title": "Request card sort",
   "materials": "Printed cards, each containing a fictional stakeholder request; six header cards labeled Exploratory, Descriptive, Diagnostic, Predictive, Prescriptive and Trend; tape or sticky putty; and a whiteboard.",
   "steps": [
    "Post the six header cards across the whiteboard.",
    "Give each group twelve request cards, such as 'Which warehouse should receive extra stock next week to minimize shipping cost?' or 'How did website visits change compared with the same month last year?'",
    "Groups sort the cards under the headers and underline the words in each request that gave away the type.",
    "Each group chooses one prescriptive card and lists the descriptive, diagnostic and predictive work it would require first.",
    "Groups tape their sorted cards to the board, and the class reviews any cards placed under different headers by different groups."
   ]
  },
  "discussion": [
   "Which type of analysis do you think organizations do most often, and which do they find hardest? Why?",
   "Why should a prediction be monitored after it is made?",
   "How could a month-over-month comparison mislead a business with strong seasonal patterns?"
  ],
  "exit": [
   [
    "A stakeholder asks, 'What were our top five products by revenue last quarter?' Which analysis type is this?",
    "Descriptive, because it summarizes what happened."
   ],
   [
    "A model recommends the price for each product that maximizes profit. Which analysis type is this?",
    "Prescriptive, because it recommends an action."
   ],
   [
    "Why does exploratory analysis usually come first with a new dataset?",
    "It reveals the data's structure and quality problems, such as missing values or duplicates, before they affect later analysis and reports."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card that pairs each analysis type with its key question word, and start them with request cards that use those exact words.",
   "Extend: Ask students to write their own request card for each type in a business area of their choice, including one that is deliberately ambiguous, and explain how they would clarify it with the stakeholder."
  ]
 },
 {
  "t": "Performance analysis: KPIs, metrics, targets and variance to plan",
  "objectives": [
   "Students will be able to distinguish metrics from KPIs and rewrite a vague goal as a SMART KPI.",
   "Students will be able to classify indicators as leading or lagging and identify vanity metrics.",
   "Students will be able to calculate variance to plan in absolute and percentage terms and label it favorable or unfavorable.",
   "Students will be able to design a clear performance summary that shows actual, target, variance and trend."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the personal budget warm-up and have students calculate the overspend as an amount and a percentage. Ask what they divided by."
   ],
   [
    12,
    "Teach",
    "Contrast metrics and KPIs, introduce SMART with a before-and-after example, explain leading versus lagging indicators and vanity metrics, then work through variance to plan with the 50,000 budget example. Emphasize dividing by the plan and labeling favorable versus unfavorable."
   ],
   [
    16,
    "Activity",
    "Run the 'trim the dashboard' group activity."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions to connect KPIs to behavior and incentives."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You budgeted 300 for groceries this month and spent 330. How much over budget are you, in money and as a percentage? Would spending 270 be good news or bad news?",
  "activity": {
   "title": "Trim the dashboard",
   "materials": "A printed sheet listing twenty fictional metrics for a small online store, each with an actual value and some with targets; sticky notes; a whiteboard; and calculators or student laptops.",
   "steps": [
    "Give each group the twenty-metric sheet and a short description of the store's two strategic objectives, such as growing repeat purchases and improving delivery reliability.",
    "Groups choose no more than five KPIs that best reflect those objectives, crossing out vanity metrics and noting why.",
    "For each chosen KPI, groups write a SMART definition on a sticky note, including formula, target and time frame, and label it leading or lagging.",
    "Groups calculate variance to plan for each KPI that has a target, as an amount and a percentage of plan, and label it favorable or unfavorable.",
    "Each group sketches a one-row-per-KPI summary on the whiteboard showing actual, target, variance and a trend arrow, then presents its choices in one minute."
   ]
  },
  "discussion": [
   "How might choosing a particular KPI change the way employees behave, for better or worse?",
   "Why is it important that every team calculates a KPI using the same written definition?",
   "Can you think of a leading indicator for your own goals, such as an exam result or a fitness target?"
  ],
  "exit": [
   [
    "Actual costs are 72,000 against a budget of 80,000. State the variance and whether it is favorable.",
    "8,000 under budget, or 10% below plan (8,000 ÷ 80,000), which is favorable for costs."
   ],
   [
    "Rewrite 'make deliveries faster' as a SMART KPI.",
    "For example: 'Deliver 95% of orders within two business days each month,' measured from order and delivery timestamps."
   ],
   [
    "Give one example of a lagging indicator for a subscription business.",
    "Quarterly revenue, annual churn rate or year-end profit."
   ]
  ],
  "differentiation": [
   "Support: Provide a SMART checklist and a variance template with labeled boxes for actual, plan, difference, percentage of plan and favorable or unfavorable.",
   "Extend: Ask students to define documented thresholds for on track, at risk and off track for two KPIs, and explain how they would handle a KPI where lower values are better."
  ]
 },
 {
  "t": "Choosing analysis tools and functions: spreadsheet formulas, SQL aggregates and window functions, Python and R libraries",
  "objectives": [
   "Students will be able to identify the purpose of common spreadsheet functions, including conditional aggregates, lookups and statistical functions.",
   "Students will be able to explain the difference between SQL aggregate functions with GROUP BY and window functions with OVER.",
   "Students will be able to read a simple window function query and predict its output, including the effect of PARTITION BY and LAG.",
   "Students will be able to select an appropriate tool, spreadsheet, SQL, or Python or R, based on data size, repeatability and audience."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about tool choice and collect a few answers, noting the reasons students give."
   ],
   [
    12,
    "Teach",
    "Review key spreadsheet functions with a projected sample sheet. Then contrast GROUP BY and window functions using the test-paper analogy. Walk through the running total and LAG query line by line on the projector, and introduce pandas, NumPy, SciPy, dplyr and ggplot2 by purpose. Finish with the size, repeatability and audience decision rule."
   ],
   [
    16,
    "Activity",
    "Run the 'predict the output' paper exercise in pairs, followed by tool-choice scenario cards."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions about habits that keep analysis trustworthy."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "You need to find the total sales for each of five regions. Would you use a calculator, a spreadsheet or a database query? Would your answer change if there were fifty million sales records and the report was needed every Monday?",
  "activity": {
   "title": "Predict the output",
   "materials": "A printed small table of eight rows (date, region, amount), printed SQL snippets using GROUP BY, SUM OVER, RANK OVER with PARTITION BY, and LAG; scenario cards for tool choice; and a projector for reviewing answers.",
   "steps": [
    "Give each pair the eight-row table and four SQL snippets. For each snippet, pairs write by hand the result table they expect, including how many rows it returns.",
    "Pairs mark which snippets collapse the rows and which keep all eight, and circle the clause that makes the difference.",
    "For the LAG snippet, pairs explain why the first row's change is null.",
    "Pairs then sort six tool-choice scenario cards into spreadsheet, SQL, or Python or R, writing one reason for each decision.",
    "The teacher projects the correct outputs, and pairs check their work and correct any mistakes."
   ]
  },
  "discussion": [
   "Why is a hard-coded number buried in many formulas risky? How would you avoid it?",
   "What are the advantages of keeping analysis logic in a saved query or script rather than in manual steps?",
   "When might a team use all three tool families in a single project?"
  ],
  "exit": [
   [
    "Which spreadsheet function returns a value from another table by matching a key, and can look in either direction?",
    "XLOOKUP."
   ],
   [
    "How many rows does SELECT region, SUM(amount) FROM sales GROUP BY region return for data from four regions?",
    "Four rows, one per region, because GROUP BY collapses rows into groups."
   ],
   [
    "A weekly report must process tens of millions of database rows. Which tool family fits best and why?",
    "SQL, because it handles large data close to the source and the query can be rerun each week reproducibly."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page reference sheet listing each function with a one-line purpose and a tiny example, and let students annotate the SQL snippets before predicting output.",
   "Extend: Ask students to write a window function query that calculates a seven-day moving average using a ROWS BETWEEN frame, and to explain what happens on the first six days."
  ]
 },
 {
  "t": "Checking and troubleshooting results: sanity checks, reconciliation, and common calculation errors",
  "objectives": [
   "Students will be able to distinguish a sanity check from reconciliation and explain why reconciliation needs an independent source.",
   "Students will be able to identify the likely cause of a described symptom, such as a doubled total after a join or rows lost after a join.",
   "Students will be able to apply a step-by-step troubleshooting process, using row counts and control totals, to locate where a figure diverges.",
   "Students will be able to name at least five common calculation errors, including averaging averages, wrong percent-change base and integer division."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up prompt. Give students one minute to write a gut reaction, then take three or four answers. Say: today we learn how to tell a breakthrough from a bug."
   ],
   [
    12,
    "Teach",
    "Present the three layers: sanity checks, reconciliation and common errors. Write the symptom-to-cause table on the whiteboard: doubled total means fan-out, missing rows means inner join or leftover filter, zero rates means integer division, odd averages means averaging averages or nulls versus zeros. Walk through the margin example from 64% back to 41%."
   ],
   [
    18,
    "Activity",
    "Run the 'Find the bug' pipeline trace in pairs. Circulate and ask each pair which step the number first diverged at and how they know."
   ],
   [
    5,
    "Discuss",
    "Pairs share the bug they found and the automated check they would add. Use the discussion questions to connect to peer review and stating assumptions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet and hand it in at the door."
   ]
  ],
  "warmup": "Your dashboard says revenue doubled this month, but the sales team says it was an ordinary month. Before you tell anyone, what are the first three things you would check?",
  "activity": {
   "title": "Find the bug: tracing a pipeline with control totals",
   "materials": "Printed handout per pair showing a five-step pipeline (load orders, join products, join costs, filter, aggregate) with the row count and revenue total after each step, plus a one-line finance ledger figure; whiteboard for the class debrief.",
   "steps": [
    "Give each pair a handout. The source load shows 10,000 rows and 1.2 million revenue, matching finance. One later step contains a planted error.",
    "Pairs compare the counts and totals step by step and circle the first step where the numbers diverge from expectation.",
    "For that step, pairs write the most likely cause (for example duplicate product IDs causing fan-out, or an inner join dropping unmatched costs) and one query or check that would confirm it.",
    "Hand out a second version with a different planted error (a leftover test filter, or averaging averages in the aggregate step) and repeat.",
    "Each pair writes one automated check they would add to the pipeline so the error could not recur silently."
   ]
  },
  "discussion": [
   "Why is a number that looks normal more dangerous than one that is obviously wrong?",
   "What should an analyst write in the assumptions and limitations note when publishing a result, and who benefits from it?",
   "How would you ask a colleague for a peer review without it feeling like a burden?"
  ],
  "exit": [
   [
    "What makes a source suitable for reconciliation?",
    "It must be independent of your own logic and trusted, such as the general ledger or the source system's own report."
   ],
   [
    "Row counts rise from 5,000 to 5,400 after joining to a lookup table. What is the likely cause?",
    "Join fan-out from duplicate keys in the lookup table."
   ],
   [
    "Three stores have average order values of 20, 30 and 40. Why can't you report 30 as the company average?",
    "The stores may have different numbers of orders; averaging averages ignores weights. Divide total revenue by total orders."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a symptom-to-cause cheat card with four rows (doubled, dropped, zero, skewed average) and let them match the handout's numbers to a row before writing an explanation.",
   "Extend: ask fast finishers to write the SQL they would use to test a key for uniqueness and a query that compares the staging row count with the fact-table row count, then explain how they would automate it to alert on mismatch."
  ]
 },
 {
  "t": "Choosing a chart: bar, line, pie, scatter, histogram, box plot, heat map, map and table",
  "objectives": [
   "Students will be able to classify a business question as comparison, trend, composition, distribution or relationship.",
   "Students will be able to select the most appropriate chart type for a described question and justify the choice.",
   "Students will be able to explain the difference between a histogram and a bar chart, and when a box plot is preferred.",
   "Students will be able to identify when a pie chart or unnormalized map would mislead and propose a better alternative."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a cluttered 3D pie chart with many slices (draw one on the whiteboard if no image is available). Ask the warm-up question and take quick answers."
   ],
   [
    13,
    "Teach",
    "Introduce the five chart jobs and write them as column headers on the whiteboard. Under each, list the matching charts. Spend extra time on histogram versus bar chart and on reading a box plot by sketching one with labeled median, quartiles, whiskers and an outlier."
   ],
   [
    17,
    "Activity",
    "Run the chart-matching card sort in groups of three, then have groups sketch one chosen chart on the whiteboard."
   ],
   [
    5,
    "Discuss",
    "Groups explain one card they disagreed about. Use the discussion questions to surface trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Look at this chart. In five seconds, can you tell which category is largest? What would you change to make that obvious?",
  "activity": {
   "title": "Question-to-chart card sort",
   "materials": "Printed question cards (about 15, each a business question such as 'How did weekly sign-ups change this year?' or 'Do longer calls get lower satisfaction scores?'), printed chart-type cards (bar, line, pie, scatter, histogram, box plot, heat map, map, table, waterfall, KPI card), whiteboard and markers.",
   "steps": [
    "Groups first sort the question cards into the five jobs: comparison, trend, composition, distribution, relationship.",
    "Groups then place a chart-type card on each question card, and write a one-line reason on a sticky note.",
    "The teacher reveals three trick cards (for example a question about route on-time rates that tempts a pie chart, and a sales-by-state question that needs normalizing) and groups revisit their choices.",
    "Each group picks one question and sketches the chart on the whiteboard with a title that states the takeaway.",
    "The class votes on which sketches answer their question within five seconds and discusses why."
   ]
  },
  "discussion": [
   "When is a table a better choice than any chart?",
   "Why do so many people still choose pie charts, and how would you persuade a stakeholder to accept a bar chart instead?",
   "How does the audience change which chart you choose for the same data?"
  ],
  "exit": [
   [
    "Which chart shows whether customer age relates to annual spend?",
    "A scatter plot, because it shows the relationship between two numeric variables."
   ],
   [
    "What does the box in a box plot represent?",
    "The middle 50% of values, from the first quartile to the third quartile, with a line at the median."
   ],
   [
    "Why normalize a choropleth map of sales by state?",
    "So large or populous states do not look strongest simply because of their size; per-capita or per-area values compare fairly."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a one-page decision guide that maps each of the five chart jobs to two chart types, and let them use it during the card sort.",
   "Extend: ask fast finishers to take one dataset described on a card and sketch two different honest charts that tell different stories, then write which question each one answers."
  ]
 },
 {
  "t": "Dashboard design: layout, audience, KPIs, filters, drill-down and interactivity",
  "objectives": [
   "Students will be able to match strategic, tactical and operational dashboards to their audiences and refresh needs.",
   "Students will be able to design a dashboard layout that places key KPIs at the top left and moves from summary to detail.",
   "Students will be able to distinguish drill-down from drill-through and explain the role of filters, cross-filtering and tooltips.",
   "Students will be able to explain how row-level security lets one dashboard serve users with different data permissions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the whiteboard as 'things that make dashboards fail'."
   ],
   [
    12,
    "Teach",
    "Cover audience types (strategic, tactical, operational), reading order and KPI cards, filters and visible filter state, drill-down versus drill-through, and row-level security. Draw a quick five-box wireframe on the board as a model."
   ],
   [
    18,
    "Activity",
    "Groups run a stakeholder interview role-play and produce a wireframe on chart paper or the whiteboard."
   ],
   [
    5,
    "Discuss",
    "Gallery walk: groups view each other's wireframes and leave one sticky-note suggestion. Close with the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of an app or website screen you check every day, such as weather or a bank balance. Why do you open it, and what do you look at first?",
  "activity": {
   "title": "Interview, then wireframe",
   "materials": "Printed role cards (a hospital chief nursing officer, a ward manager, a front-desk coordinator), sticky notes, chart paper or whiteboard space, markers.",
   "steps": [
    "In groups of three, one student plays the stakeholder using a role card that lists their decisions and frustrations; the other two are analysts.",
    "Analysts have five minutes to interview the stakeholder about the decisions they make and the questions they ask, writing each question on a sticky note.",
    "The group classifies the dashboard as strategic, tactical or operational and agrees on a refresh frequency.",
    "The group sketches a wireframe: KPI cards at the top left, supporting charts below, filter placement, one drill-down and one drill-through path, labeled with arrows.",
    "The group adds a note on who sees what data and how row-level security would be applied."
   ]
  },
  "discussion": [
   "How would you decide which metrics to leave off a dashboard when a stakeholder insists everything is important?",
   "When can cross-filtering confuse users more than it helps?",
   "What signs would tell you, a few months after launch, that a dashboard is not meeting its audience's needs?"
  ],
  "exit": [
   [
    "Which type of dashboard suits warehouse staff tracking orders waiting to ship right now?",
    "An operational dashboard, refreshed in near real time."
   ],
   [
    "A user clicks a customer name and lands on a separate page with that customer's orders. What is this called?",
    "Drill-through."
   ],
   [
    "How can one dashboard show each regional manager only their own region?",
    "Row-level security that filters rows based on the signed-in user."
   ]
  ],
  "differentiation": [
   "Support: give students a pre-drawn wireframe template with labeled empty boxes (KPI area, trend area, detail area, filter bar) to fill in rather than starting from a blank page.",
   "Extend: ask fast finishers to write definitions, targets and owners for three KPIs on their wireframe and to describe how they would measure whether the dashboard is used after launch."
  ]
 },
 {
  "t": "Design principles: color, labels, titles, scales and axes, accessibility and avoiding misleading charts",
  "objectives": [
   "Students will be able to choose between sequential, diverging and categorical palettes for a described dataset.",
   "Students will be able to rewrite a descriptive chart title as an informative title and identify missing labels or chart junk.",
   "Students will be able to identify misleading axis and scale choices, including truncated bar axes, inconsistent scales and dual axes.",
   "Students will be able to apply at least three accessibility practices to a chart, including not relying on color alone."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Draw two bars on the whiteboard, 92 and 94, with the axis starting at 91. Ask the warm-up question and let students react."
   ],
   [
    13,
    "Teach",
    "Cover color with purpose and the three palette types, informative titles and direct labels, honest axes (zero baseline for bars, labeled baselines for lines, consistent and log scales, dual axes), other misleading techniques, and accessibility. Redraw the warm-up bars from zero to show the difference."
   ],
   [
    17,
    "Activity",
    "Pairs run the 'chart makeover' exercise on printed flawed charts."
   ],
   [
    5,
    "Discuss",
    "Pairs present one before-and-after fix. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Based only on this drawing, how much better is the second value than the first? Now read the actual numbers. Why might those two answers differ?",
  "activity": {
   "title": "Chart makeover",
   "materials": "Printed sheets with four deliberately flawed charts the teacher draws or prints (a truncated bar chart, a red-green status table, a 3D pie with a vague title, a dual-axis chart), colored pencils or markers, sticky notes.",
   "steps": [
    "Pairs list every design problem they see on each chart, writing one problem per sticky note.",
    "Pairs label each problem as distracting (chart junk), unclear (labels, titles) or misleading (axes, scales, cherry-picking) and stick it on the chart.",
    "Pairs choose one chart and redraw it by hand: honest axis, informative title, direct labels, a purposeful palette and a non-color cue such as icons or text.",
    "Pairs write a one-sentence alternative text for their redrawn chart.",
    "Pairs swap with another pair, who checks the makeover against a short checklist (zero baseline for bars, title states takeaway, color not the only cue, units labeled)."
   ]
  },
  "discussion": [
   "Where is the line between emphasizing a point and misleading the reader?",
   "If a manager asks you to start a bar axis at 90% 'so the improvement shows', how would you respond?",
   "Why does accessible design tend to make charts clearer for everyone?"
  ],
  "exit": [
   [
    "Which palette suits budget variance that can be positive or negative?",
    "A diverging palette with a neutral midpoint at zero."
   ],
   [
    "Rewrite the title 'Revenue by quarter' as an informative title, given revenue grew each quarter.",
    "For example: 'Revenue grew every quarter this year'."
   ],
   [
    "Why must bar charts start at zero?",
    "Bar length represents the value, so a truncated axis exaggerates differences."
   ]
  ],
  "differentiation": [
   "Support: provide a printed checklist of seven design rules with a simple example of each, so students can tick through the flawed charts one rule at a time.",
   "Extend: ask fast finishers to design an honest chart and a misleading chart from the same small dataset, then explain exactly which technique creates the false impression and how a reader could detect it."
  ]
 },
 {
  "t": "Report types: static vs dynamic, ad hoc vs recurring, self-service and executive summaries",
  "objectives": [
   "Students will be able to compare static and dynamic reports and choose the right one for a described need.",
   "Students will be able to distinguish ad hoc from recurring reports and explain when a repeated ad hoc request should be converted.",
   "Students will be able to explain the governance conditions that make self-service reporting succeed.",
   "Students will be able to write a short executive summary that states findings, impact and a recommendation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect examples on the whiteboard in two columns the teacher does not label yet (fixed versus changing)."
   ],
   [
    12,
    "Teach",
    "Label the warm-up columns static and dynamic. Introduce the frequency dimension (ad hoc versus recurring), self-service and its governance needs, and the executive summary structure. Draw a two-by-two grid of static/dynamic against ad hoc/recurring and place an example in each cell."
   ],
   [
    18,
    "Activity",
    "Groups sort request cards into the grid, then write an executive summary for one scenario."
   ],
   [
    5,
    "Discuss",
    "Groups share placements they argued about. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name one document or screen you use that never changes once you get it, and one that keeps changing. Why does each one work the way it does?",
  "activity": {
   "title": "Request triage and the one-paragraph summary",
   "materials": "Printed request cards (about 12, such as a board pack, a recall customer list, a daily ticket queue, a quarterly regulator filing, a repeated weekly ask), a large two-by-two grid drawn on the whiteboard or chart paper, a printed short analysis scenario with a few numbers, sticky notes.",
   "steps": [
    "Groups read each request card and place it in the grid cell (static or dynamic, ad hoc or recurring) that fits best, writing their reason on a sticky note.",
    "Groups flag any card that should become self-service and list what governance it would need (certified dataset, definitions, training, security).",
    "Each group reads the printed analysis scenario and writes a three-to-four sentence executive summary: finding, impact, recommendation, one supporting number.",
    "Groups swap summaries and check whether a busy reader could act on the summary alone.",
    "The teacher reviews two summaries with the class, highlighting what was moved to an appendix."
   ]
  },
  "discussion": [
   "What risks appear when a dynamic dashboard is used as if it were an official record?",
   "How would you persuade a manager who keeps asking for the same ad hoc report to try a self-service view?",
   "What makes an executive summary fail, even when the analysis behind it is sound?"
  ],
  "exit": [
   [
    "Which report type suits a month-end board pack?",
    "A static report, because the board needs a fixed record that will not change after distribution."
   ],
   [
    "The same ad hoc request arrives every week. What should you do?",
    "Turn it into a recurring report or a self-service view, ideally automated."
   ],
   [
    "Why can self-service reporting produce conflicting numbers?",
    "Without governed data and agreed definitions, each user may calculate metrics differently."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a two-question flowchart (Must the numbers stay fixed? Is this a one-time question?) to place each card.",
   "Extend: ask fast finishers to design the governance plan for a self-service rollout: which dataset to certify, which three metric definitions to publish, who approves changes and how users are trained."
  ]
 },
 {
  "t": "Communicating findings: knowing the audience, storytelling with data and stating limitations",
  "objectives": [
   "Students will be able to tailor the same finding for an executive, a manager and a technical peer.",
   "Students will be able to structure a data presentation using a context, insight and resolution arc with the conclusion first.",
   "Students will be able to write an actionable recommendation that names who, what, when and the expected impact.",
   "Students will be able to state limitations and assumptions, including presenting correlation as association and uncertainty as a range."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Take two or three stories from students about explanations that worked or failed."
   ],
   [
    12,
    "Teach",
    "Present audience types and what each wants, the three-part story arc with bottom line up front, actionable recommendations, and limitations versus assumptions. Model by reading the churn example aloud in two versions, buried conclusion versus conclusion first."
   ],
   [
    18,
    "Activity",
    "Groups prepare and deliver a one-minute 'elevator brief' to a role-played audience."
   ],
   [
    5,
    "Discuss",
    "Debrief what each audience asked and how briefs changed. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a time someone explained something important to you and you understood it immediately, or a time you got completely lost. What made the difference?",
  "activity": {
   "title": "One finding, three audiences",
   "materials": "Printed finding cards (each with a short analysis result, two supporting numbers, one limitation and one assumption), printed audience cards (chief executive, department manager, data engineer), index cards, a timer on the projector or a phone.",
   "steps": [
    "Each group of three draws one finding card and one audience card.",
    "Groups have six minutes to write a one-minute brief on index cards: the main point first, one supporting number, a concrete recommendation (who, what, when, expected impact), and the key limitation in plain words.",
    "One student delivers the brief while another plays the drawn audience and asks one realistic question; the third times and notes whether the conclusion came in the first 15 seconds.",
    "Groups draw a different audience card for the same finding and spend three minutes rewriting the brief for that audience.",
    "Groups record what they added or removed for the second audience on a sticky note and post it on the whiteboard."
   ]
  },
  "discussion": [
   "Is it ever right to leave a limitation out of a presentation? Why or why not?",
   "How do you handle a stakeholder who wants your finding stated as certain when the data only shows an association?",
   "What changes when you deliver findings by email instead of in a meeting?"
  ],
  "exit": [
   [
    "What should come first when presenting to executives?",
    "The conclusion and recommendation, followed by supporting evidence."
   ],
   [
    "Rewrite 'We should improve onboarding' as an actionable recommendation.",
    "For example: 'Customer success should add a day-three check-in call for new accounts starting next quarter, which we estimate could retain about 50 accounts.'"
   ],
   [
    "Give one example of a limitation and explain why you would state it.",
    "For example, data from only six months, or a correlation that cannot prove cause; stating it prevents overconfidence and builds trust."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a fill-in template for the brief with four labeled lines (Main point, Evidence, Recommendation, Limitation).",
   "Extend: ask fast finishers to design how they would test whether the correlation in their finding is causal, for example an A/B test, and add a sentence about it to the brief."
  ]
 },
 {
  "t": "Report elements: cover information, methodology, data sources, refresh dates, disclaimers and appendices",
  "objectives": [
   "Students will be able to list the standard elements of a professional report and explain the purpose of each.",
   "Students will be able to distinguish methodology, data sources and the data as-of date.",
   "Students will be able to write an appropriate disclaimer and confidentiality label for a described report.",
   "Students will be able to decide whether a given piece of content belongs in the main body or an appendix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hold up (or project) any food package or medicine box and ask the warm-up question. List the labels students name on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Map each package label to a report element: cover, executive summary, methodology, data sources, as-of date, disclaimers, definitions, appendices, navigation. Tell the stale-report story from the example and ask which element would have prevented it."
   ],
   [
    18,
    "Activity",
    "Groups audit a printed report that is missing elements, then draft the missing pieces."
   ],
   [
    5,
    "Discuss",
    "Groups share which missing element they judged most dangerous. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What information is printed on this package besides the product itself, and what would go wrong if each piece were missing?",
  "activity": {
   "title": "Report audit: what is missing?",
   "materials": "A printed two-to-three page mock report the teacher creates with charts and findings but no as-of date, no version, no methodology, no sources, no disclaimer and a cluttered body table; a printed checklist of report elements; sticky notes and pens.",
   "steps": [
    "Groups read the mock report and tick off which elements on the checklist are present or missing.",
    "For each missing element, groups write on a sticky note what a reader could misunderstand because it is missing.",
    "Groups draft the missing cover block (title, period, owner, date prepared, version, audience) and a 'Data as of' line.",
    "Groups write a disclaimer and confidentiality label suited to the report's preliminary internal figures, and a two-sentence methodology summary.",
    "Groups identify one item in the body that should move to an appendix and explain why."
   ]
  },
  "discussion": [
   "Which report element do you think is most often forgotten, and why?",
   "How should a dashboard display its refresh date so users actually notice it?",
   "When does a definition belong on the chart itself rather than in a glossary?"
  ],
  "exit": [
   [
    "What tells a reader how current a report's data is?",
    "The data as-of or last-refreshed date."
   ],
   [
    "What is the difference between methodology and data sources?",
    "Data sources say where the data came from; methodology explains how it was cleaned, filtered and calculated."
   ],
   [
    "Where would you place a 40-row detail table supporting a summary chart?",
    "In an appendix, with the summary chart in the main body."
   ]
  ],
  "differentiation": [
   "Support: give struggling students the element checklist with a one-line example next to each item so they can match by example.",
   "Extend: ask fast finishers to design a reusable report template that automates the as-of date and version fields and includes a change-log section, then explain how it prevents the stale-data incident."
  ]
 },
 {
  "t": "Delivery and refresh: scheduled refresh, real-time vs snapshot data, subscriptions and distribution",
  "objectives": [
   "Students will be able to compare imported (scheduled refresh) and live connections in terms of freshness, performance and source load.",
   "Students will be able to diagnose a stale-data symptom by checking refresh timing against upstream loads and common failure causes.",
   "Students will be able to decide when real-time data or snapshot data is the right choice for a described need.",
   "Students will be able to recommend secure distribution methods, preferring governed links, subscriptions and alerts over attachments."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about stale information and take a few answers."
   ],
   [
    12,
    "Teach",
    "Draw a timeline on the whiteboard: pipeline runs 2:00 to 5:30, refresh at 5:00, users open at 7:15. Ask what users see. Then cover imported versus live connections, refresh failure causes, incremental refresh, real-time versus snapshot, and distribution methods with security controls."
   ],
   [
    18,
    "Activity",
    "Groups solve delivery scenario cards and design a delivery plan on the whiteboard."
   ],
   [
    5,
    "Discuss",
    "Groups present one plan. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever acted on information that turned out to be out of date, such as an old bus schedule or a store's posted hours? How could you have known it was old?",
  "activity": {
   "title": "Delivery desk: scenario cards",
   "materials": "Printed scenario cards (for example: dashboard shows yesterday's data though refresh succeeded; finance cannot reproduce last quarter's inventory; a call center needs queue lengths now; sensitive margins found in a forwarded email; a refresh fails after a column was renamed), whiteboard, markers, sticky notes.",
   "steps": [
    "Each group draws three scenario cards.",
    "For each card, the group writes the root cause or need on a sticky note, using the lesson's vocabulary (refresh timing, credentials, schema change, snapshot, real-time, attachment risk).",
    "For each card, the group writes a fix or design choice and one monitoring step that would catch the problem earlier.",
    "The group combines their answers into a short delivery plan for one fictional report: connection type, refresh schedule, failure alerting, distribution method and access controls.",
    "Groups post their plans and the class checks each against the rule 'links, not attachments; snapshots for history; real-time only when someone must react now'."
   ]
  },
  "discussion": [
   "How would you decide whether a request for real-time data is truly needed?",
   "Who should be responsible for noticing a failed refresh: the analyst, the data engineer or the report owner?",
   "What are the risks of allowing everyone to export reports to Excel?"
  ],
  "exit": [
   [
    "A dashboard refresh succeeded at 5:00 but shows yesterday's data. What is a likely cause?",
    "The refresh ran before the upstream pipeline finished loading today's data."
   ],
   [
    "Which data approach preserves month-end balances for later reporting?",
    "Snapshots taken at month-end and stored."
   ],
   [
    "Why prefer sending a link over an attachment?",
    "A link points to a secured, current report with access controls; attachments are uncontrolled copies that can be forwarded, go stale and leak data."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a two-column cheat sheet (symptom, likely cause) covering stale data, refresh failure and missing history to use during the scenario cards.",
   "Extend: ask fast finishers to design a monitoring and alerting setup for a critical dashboard, including what is checked after each refresh (row counts, latest date loaded) and who is notified when a check fails."
  ]
 },
 {
  "t": "Report versioning, style guides and corporate branding",
  "objectives": [
   "Students will be able to describe versioning practices, including version numbers, change logs and a single authoritative copy.",
   "Students will be able to explain why metric definition changes must be documented and flagged prominently.",
   "Students will be able to list the main contents of a report style guide and explain the benefits of consistency.",
   "Students will be able to balance corporate branding with accessibility when choosing colors for data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write example bad file names from students on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Cover versioning (numbers, dates, change log, authoritative location, version control, dev/test/prod, retiring reports), definition changes, style guide contents, branding versus accessibility, and templates and themes. Use the board-meeting story as the running example."
   ],
   [
    18,
    "Activity",
    "Groups write a mini style guide and a change log entry, then apply them to two inconsistent printed charts."
   ],
   [
    5,
    "Discuss",
    "Groups share one rule they found hard to agree on. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever had several copies of the same document and not known which one was the latest? What file names did they have?",
  "activity": {
   "title": "Write the rules, then fix the charts",
   "materials": "Two printed charts of the same metric made deliberately inconsistent (different colors per region, different number formats, different metric names, one truncated axis), a blank one-page style guide form, a blank change log form, markers and sticky notes.",
   "steps": [
    "Groups list every inconsistency between the two printed charts on sticky notes.",
    "Groups fill in a one-page style guide: font, region colors (checked for color-blind safety), status colors, number and date formats, official metric name, title style and one chart convention.",
    "Groups annotate one chart with the changes needed to meet their style guide.",
    "Groups imagine the metric's definition changed in the new version and write a change log entry (version, date, what changed, why, by whom) plus the note they would display on the report.",
    "Groups trade style guides with another group and check whether the rules are specific enough for a new analyst to follow."
   ]
  },
  "discussion": [
   "What would you do if a senior leader insists on a brand color for data that fails accessibility checks?",
   "How strict should a style guide be before it stops authors from communicating clearly?",
   "Why is leaving an old report accessible after it is replaced risky?"
  ],
  "exit": [
   [
    "Name three things a change log entry should record.",
    "What changed, when, why and by whom (any three)."
   ],
   [
    "Two dashboards show different number formats and metric names. Which practice fixes this?",
    "A style guide, ideally enforced through a shared template or theme."
   ],
   [
    "How should brand colors be used if they fail contrast checks for data?",
    "Use them for accents such as headers and the logo, and use accessible colors for the data."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a partly completed style guide with examples in each section, leaving three sections for them to fill in.",
   "Extend: ask fast finishers to outline a promotion process from development to test to production for a dashboard change, including who approves and how users are notified of a definition change."
  ]
 },
 {
  "t": "Troubleshooting reports and dashboards: stale data, broken filters, wrong totals and slow performance",
  "objectives": [
   "Students will be able to apply a systematic troubleshooting method that confirms the symptom and follows the data path from source to visual.",
   "Students will be able to identify likely causes of stale data and broken filters, including refresh timing, credentials, relationships and key mismatches.",
   "Students will be able to diagnose wrong totals, distinguishing real errors from correct non-additive totals such as distinct counts.",
   "Students will be able to recommend fixes for slow dashboards, such as pre-aggregation, removing unused columns and reducing visuals."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student troubleshooting habits on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw the data path on the whiteboard: source, pipeline, refresh, model, visual. For each of the four symptoms, place the most likely causes on the path. Explain the distinct count total case with a small example of customers buying in two regions."
   ],
   [
    18,
    "Activity",
    "Pairs work through help-desk ticket cards in a role-play, one as user and one as analyst."
   ],
   [
    5,
    "Discuss",
    "Pairs share the hardest ticket and how they communicated the fix. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When something at home stops working, such as Wi-Fi or a TV, what do you check first, and in what order? Why does the order matter?",
  "activity": {
   "title": "Dashboard help desk",
   "materials": "Printed ticket cards with symptoms (old data despite a successful refresh, a slicer that ignores one chart, a (Blank) filter value, doubled units, a total margin that does not match finance, a 40-second page load), printed clue cards the 'user' reveals only when asked the right question (refresh times, relationship diagram sketch, key formats, row counts), a simple data path diagram on the whiteboard.",
   "steps": [
    "In pairs, one student is the user holding a ticket and its clue cards; the other is the analyst.",
    "The analyst asks diagnostic questions, following the data path from source to visual; the user reveals a clue card only when the matching question is asked.",
    "The analyst states the likely cause and a fix, and names one check or alert that would prevent recurrence.",
    "The analyst writes a two-sentence user message explaining what was wrong, what was affected and what was done.",
    "Pairs swap roles with a new ticket and repeat, aiming for fewer questions to reach the cause."
   ]
  },
  "discussion": [
   "Why is changing one thing at a time important when troubleshooting?",
   "How would you explain to a user that a total lower than the sum of its rows is correct?",
   "What should you tell users after a period of wrong numbers, and why does it matter?"
  ],
  "exit": [
   [
    "A slicer filters every visual except one. Name two likely causes.",
    "The visual's table has no active relationship to the slicer's table, the relationship direction is wrong, interactions are turned off, or a visual-level filter overrides it (any two)."
   ],
   [
    "Units sold appear roughly doubled after adding a new lookup table. What should you suspect?",
    "Duplicate keys or a many-to-many relationship causing double-counting."
   ],
   [
    "A dashboard page scans a 400-million-row table to draw a monthly trend. What fix would speed it up?",
    "Pre-aggregate the data into a monthly or daily summary table for that visual."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a symptom flowchart that lists the first two checks for each of the four symptoms, so they can follow it during the role-play.",
   "Extend: ask fast finishers to design a set of automated post-refresh checks (latest date loaded, row counts versus source, control totals, count of unmatched keys) and describe who gets alerted for each."
  ]
 },
 {
  "t": "Data governance roles: data owner, data steward, data custodian and data consumer",
  "objectives": [
   "Students will be able to define the data owner, steward, custodian and consumer roles and the core responsibility of each.",
   "Students will be able to identify the correct role from a short workplace scenario based on the actions described.",
   "Students will be able to explain why custodians implement but do not approve access decisions.",
   "Students will be able to complete a simple RACI chart for a data governance activity."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the DBA granting access. Take three or four answers and write the roles students name on the board without correcting yet."
   ],
   [
    12,
    "Teach",
    "Walk through the four roles using the library analogy, then add the CDO, governance council, DPO and data subject. Emphasize the verbs: decides, defines, implements, uses. Show a blank RACI chart and fill one row for an access request together."
   ],
   [
    18,
    "Activity",
    "Run the role card sort described below in groups of three or four. Circulate and ask groups to justify any card they hesitated over."
   ],
   [
    5,
    "Discuss",
    "Bring the class together to compare the hardest cards and work through the discussion questions, focusing on cases where one person holds two roles."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a sticky note or paper and hand them in at the door."
   ]
  ],
  "warmup": "A database administrator receives an email from a manager asking for access to the payroll table for a new hire. The DBA has the technical ability to grant it right now. Should they? Who else, if anyone, needs to be involved?",
  "activity": {
   "title": "Who does what: governance role card sort",
   "materials": "Printed scenario cards (about 16 per group), four header cards labeled Owner, Steward, Custodian and Consumer, a whiteboard, and markers.",
   "steps": [
    "Before class, write about 16 short action cards such as 'Approves read access to sales data', 'Restores the database from last night's backup', 'Updates the definition of churn in the glossary', 'Builds a dashboard from the certified sales dataset', 'Sets the classification of employee records to confidential' and 'Encrypts the customer table'.",
    "Groups place each card under the role header that performs that action, discussing the key verb on each card.",
    "Each group then picks one activity, such as granting access to a new analyst, and draws a RACI row for it on the whiteboard showing who is responsible, accountable, consulted and informed.",
    "Groups swap boards with a neighbor and mark any placement they disagree with, then resolve disagreements together with the teacher."
   ]
  },
  "discussion": [
   "What goes wrong in an organization where the most technical person ends up approving all access requests?",
   "An analyst often knows a dataset better than anyone else. Should analysts be formally named as stewards? What are the risks either way?",
   "Why might a company need a governance council if every domain already has an owner?"
  ],
  "exit": [
   [
    "A VP signs off on who may view customer payment data. Which role is this?",
    "Data owner, because deciding and approving access is the owner's accountability."
   ],
   [
    "A sales operations specialist maintains the glossary definition of a closed deal and monitors quality rules. Which role?",
    "Data steward."
   ],
   [
    "Why should a custodian not grant access on request without approval?",
    "Custodians implement controls but do not decide access; that decision belongs to the data owner, so granting without approval bypasses accountability."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-line verb list (decides, defines, implements, uses) mapped to each role, and start them with four very clear cards before adding ambiguous ones.",
   "Extend: Ask fast finishers to write two scenario cards where one person holds two roles at once and explain how the organization should keep those duties clear."
  ]
 },
 {
  "t": "Metadata, data dictionaries, data catalogs and data lineage",
  "objectives": [
   "Students will be able to classify examples of metadata as technical, business or operational.",
   "Students will be able to distinguish a data dictionary, business glossary and data catalog by purpose.",
   "Students will be able to use a lineage diagram to perform backward tracing and forward impact analysis.",
   "Students will be able to write a complete data dictionary entry for a field."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up photo metadata prompt on the projector and collect answers on the board, grouping them into structure, meaning and processing without naming the categories yet."
   ],
   [
    12,
    "Teach",
    "Name the three kinds of metadata, then introduce the dictionary, glossary, catalog and lineage with one sentence and one example each. Draw a five-box lineage diagram on the board from source to dashboard and trace it backward and forward."
   ],
   [
    18,
    "Activity",
    "Run the lineage and dictionary detective activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect metadata to trust and audits."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Open any photo on your phone and look at its details. What information is stored about the photo that is not the picture itself? How could that information be useful, or risky?",
  "activity": {
   "title": "Lineage and dictionary detective",
   "materials": "A projected or printed lineage diagram with about eight boxes (two source systems, three pipeline steps, two warehouse tables, one dashboard), printed blank data dictionary templates, and student laptops or paper.",
   "steps": [
    "Give each pair the lineage diagram and a short scenario: a dashboard KPI suddenly dropped by 10%. Pairs trace backward and list which boxes they would inspect, in order.",
    "Next, pose a change: a column in one source system will be renamed. Pairs trace forward and list every affected table and report.",
    "Each pair then fills in a full dictionary entry for one field on the diagram, including name, definition, type, format, allowed values, nullability, source and sensitivity.",
    "Pairs swap entries with another pair, who must try to misinterpret the field; any ambiguity found is rewritten."
   ]
  },
  "discussion": [
   "Why might an outdated data dictionary be more dangerous than having none?",
   "Who should be responsible for keeping metadata current, and how can organizations make that happen without slowing every change?",
   "How does lineage help an organization answer an auditor's question?"
  ],
  "exit": [
   [
    "Classify this: a column's data type is DECIMAL(10,2).",
    "Technical metadata."
   ],
   [
    "You need to know every report affected by dropping a source column. What do you use?",
    "Forward lineage, also called impact analysis."
   ],
   [
    "What is the main difference between a data dictionary and a data catalog?",
    "A dictionary documents fields within a dataset; a catalog is a searchable inventory of many data assets across the organization."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed dictionary entry and a lineage diagram with the first backward step already highlighted, and pair the student with a confident partner.",
   "Extend: Ask fast finishers to design a simple catalog search results page on paper listing which metadata fields should appear for each dataset and why."
  ]
 },
 {
  "t": "Data quality dimensions: accuracy, completeness, consistency, validity, timeliness and uniqueness",
  "objectives": [
   "Students will be able to define the six core data quality dimensions.",
   "Students will be able to identify which dimension a described data problem affects.",
   "Students will be able to explain the difference between validity and accuracy with an example.",
   "Students will be able to propose a measurable metric for each dimension."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up attendance list and ask students to point out everything wrong with it. List the problems on the board."
   ],
   [
    12,
    "Teach",
    "Name each dimension and map the warm-up problems to them. Spend extra time on validity versus accuracy and consistency versus uniqueness. Show how each becomes a percentage metric."
   ],
   [
    18,
    "Activity",
    "Run the data quality triage activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Here is a ten-row class list with deliberate errors: a blank email, a birth date of 31 April, one student listed twice, an age of 4 for a college student, and a phone number in a different format. Which problems can you spot, and are they all the same kind of problem?",
  "activity": {
   "title": "Data quality triage",
   "materials": "A printed or projected customer table of about 20 rows seeded with errors for each dimension, six labeled sticky-note colors or column headers on the whiteboard, and markers.",
   "steps": [
    "Groups examine the table and mark each problem they find with a sticky note naming the dimension it affects.",
    "For each dimension, the group writes one metric they could track, such as percentage of rows with a valid postal code.",
    "Groups place their notes on the whiteboard under the matching dimension header; the class reviews any note placed under two headers and agrees on the best fit.",
    "Finally, each group identifies which problem they could not detect from the table alone and explains what external reference they would need, which leads to accuracy."
   ]
  },
  "discussion": [
   "Why is accuracy the hardest dimension to measure automatically?",
   "How might the same delay in data be acceptable for one team and a serious timeliness problem for another?",
   "Which dimension do you think causes the most visible business damage, and why?"
  ],
  "exit": [
   [
    "A ZIP code field contains 'ABCDE'. Which dimension?",
    "Validity, because the value breaks the format rule."
   ],
   [
    "CRM shows a customer as active but billing shows the account closed. Which dimension?",
    "Consistency."
   ],
   [
    "Give one example of data that is valid but not accurate.",
    "A correctly formatted phone number that belongs to a different person, or a properly formatted address the customer moved away from."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a diagnostic question card (missing, rule broken, disagrees, twice, out of date, not real) and let them use it during the triage.",
   "Extend: Ask fast finishers to identify a problem that affects two dimensions at once and argue which should be fixed first."
  ]
 },
 {
  "t": "Data quality control: validation rules, profiling, quality metrics and monitoring",
  "objectives": [
   "Students will be able to describe what data profiling measures and why it comes before writing rules.",
   "Students will be able to match validation rule types to the errors they catch.",
   "Students will be able to define a quality metric with a threshold for a given business rule.",
   "Students will be able to explain how monitoring, quarantine and root-cause fixes work together."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas on the board about how the negative revenue could have been caught."
   ],
   [
    12,
    "Teach",
    "Introduce profiling with a projected example of column statistics, then the validation rule types, metrics with thresholds, and monitoring with quarantine. Stress validating early and fixing root causes."
   ],
   [
    18,
    "Activity",
    "Run the rule-writing workshop in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare where groups placed their checks."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "An overnight load put negative sales into a revenue dashboard and nobody noticed until a VP saw it. List every point between the cash register and the dashboard where this could have been caught.",
  "activity": {
   "title": "Rule-writing workshop",
   "materials": "Printed profiling summary for a 'shipments' table (column names, null percentages, min, max, distinct counts, top values) seeded with oddities, rule-type reference cards, and student laptops or paper.",
   "steps": [
    "Pairs read the profiling summary and circle at least five surprises, such as negative weights, future ship dates or a status column with unexpected values.",
    "For each surprise, pairs write a validation rule and label its type: type, range, format, allowed value, required, uniqueness, referential integrity or cross-field.",
    "Pairs turn two of their rules into metrics with thresholds, for example 'at least 99.5% of rows have weight greater than 0'.",
    "Pairs decide for each rule whether a failure should quarantine the row, stop the load, or just raise a warning, and justify the choice to another pair."
   ]
  },
  "discussion": [
   "When should a failing rule stop an entire load instead of just quarantining the bad rows?",
   "Why is it tempting to fix data in the warehouse instead of at the source, and what does that cost later?",
   "How would you choose a sensible threshold for a quality metric?"
  ],
  "exit": [
   [
    "What is the purpose of data profiling?",
    "To understand a dataset's structure and content, such as nulls, ranges, distinct values and patterns, before cleaning or writing rules."
   ],
   [
    "Every order must reference an existing customer. Which rule type enforces this?",
    "A referential integrity check."
   ],
   [
    "A metric has drifted slowly from 1% nulls to 9% nulls. What does monitoring help you do here?",
    "Detect the trend through thresholds and alerts so the upstream cause can be investigated and fixed before reports are badly affected."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching sheet pairing each rule type with one example error before students write their own rules.",
   "Extend: Ask fast finishers to sketch a small scorecard layout showing four metrics, their thresholds and a trend line, and decide who receives each alert."
  ]
 },
 {
  "t": "Master data management and a single source of truth",
  "objectives": [
   "Students will be able to distinguish master data from transactional data with examples.",
   "Students will be able to describe the MDM activities of matching, merging with survivorship rules, standardizing and distributing.",
   "Students will be able to apply survivorship rules to build a golden record from conflicting sources.",
   "Students will be able to explain the single source of truth principle and why governance is needed to sustain it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about how many customers the company has and list three conflicting answers on the board."
   ],
   [
    12,
    "Teach",
    "Define master versus transactional data, then walk through the MDM steps with one projected example of three conflicting customer records. Introduce golden records, survivorship rules and the single source of truth."
   ],
   [
    18,
    "Activity",
    "Run the golden record build activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect MDM to governance roles."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Three systems report three different customer counts: 18,400, 15,900 and 22,000. Give at least three reasons why they might disagree even if no system is broken.",
  "activity": {
   "title": "Build the golden record",
   "materials": "Printed cards each showing one customer record from a different system (CRM, billing, e-commerce, support) with deliberate variations in name, address, phone, email and last-updated date; a printed set of survivorship rules; whiteboard and markers.",
   "steps": [
    "Give each group about 12 record cards representing four real customers. Groups first sort the cards into piles they believe are the same customer, noting which matches were obvious and which were uncertain.",
    "Groups standardize values on their cards, such as street abbreviations and phone formats, and see whether any uncertain matches become clear.",
    "Using the printed survivorship rules (for example legal name from billing, most recent address, email from CRM), groups write one golden record per customer on the whiteboard.",
    "Groups present one uncertain match and explain whether they would merge it automatically or send it to a steward for review."
   ]
  },
  "discussion": [
   "What happens to a golden record if employees can still create customers directly in any local system?",
   "Who should own the customer master domain, and why might sales and finance both want that role?",
   "How does a single source of truth for metrics differ from a single source of truth for master data?"
  ],
  "exit": [
   [
    "Classify each as master or transactional: a product record, a payment, a supplier.",
    "Product and supplier are master data; a payment is transactional data."
   ],
   [
    "What is a golden record?",
    "The single trusted, consolidated version of an entity created by MDM from matched source records."
   ],
   [
    "Two sources have different addresses for the same customer. What decides which one is kept?",
    "A survivorship rule, such as keeping the most recently updated or verified address."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups record cards with only two fields varying and a completed example golden record to model their work on.",
   "Extend: Ask fast finishers to write a survivorship rule set for a product master and explain one case where their rule would choose the wrong value."
  ]
 },
 {
  "t": "Sensitive data: PII, PHI and payment card data; data classification levels",
  "objectives": [
   "Students will be able to identify PII, including direct and quasi-identifiers, in a sample dataset.",
   "Students will be able to determine when health information is PHI under HIPAA.",
   "Students will be able to distinguish cardholder data from sensitive authentication data under PCI DSS.",
   "Students will be able to assign a classification level to a dataset and state the handling it requires."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the anonymous table and take a quick show of hands, then ask a few students to explain."
   ],
   [
    12,
    "Teach",
    "Explain PII with direct and quasi-identifiers, PHI and who it applies to, cardholder data versus sensitive authentication data, and the four classification levels with example handling rules."
   ],
   [
    18,
    "Activity",
    "Run the classify-the-columns activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore re-identification and combined datasets."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A dataset lists ZIP code, full date of birth and gender for every customer, with no names. Could anyone figure out who a specific row belongs to? How?",
  "activity": {
   "title": "Classify the columns",
   "materials": "Printed sheets with four fictional dataset headers and three sample rows each (an HR file, a clinic visit file, a card transaction file and a product price list), colored markers for each classification level, and a whiteboard.",
   "steps": [
    "Groups go column by column, labeling each as a direct identifier, quasi-identifier, PHI element, cardholder data, sensitive authentication data or non-sensitive.",
    "Groups flag any column that should not exist at all, such as a stored card verification code, and explain why.",
    "Groups assign each dataset an overall classification level and write two handling rules for it, such as encryption or sharing limits.",
    "Each group presents one dataset and proposes how to make a safer version for an analyst, such as removing identifiers or using the last four digits of the card."
   ]
  },
  "discussion": [
   "Why can combining two individually harmless datasets create something sensitive?",
   "If you are unsure how sensitive a dataset is, what should you do before sharing it?",
   "Who benefits and who is put at risk when an organization over-classifies or under-classifies its data?"
  ],
  "exit": [
   [
    "Name one direct identifier and one quasi-identifier.",
    "Direct: full name, Social Security number or passport number. Quasi: date of birth, ZIP code, gender or job title."
   ],
   [
    "A hospital's report shows patient names next to lab results. What type of data is it?",
    "PHI, because it is individually identifiable health information held by a covered entity."
   ],
   [
    "Under PCI DSS, may a merchant store the card verification code after authorization?",
    "No. It is sensitive authentication data and must not be stored after authorization."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing example direct identifiers, quasi-identifiers and card data elements for students to match against the sample columns.",
   "Extend: Ask fast finishers to design a de-identified version of the clinic dataset that keeps it useful for analysis and explain which re-identification risks remain."
  ]
 },
 {
  "t": "Privacy and compliance: GDPR, HIPAA, PCI DSS, data sovereignty and retention policies",
  "objectives": [
   "Students will be able to identify which framework (GDPR, HIPAA or PCI DSS) applies to a described dataset and organization.",
   "Students will be able to explain GDPR principles such as purpose limitation, data minimization and storage limitation, and list data subject rights.",
   "Students will be able to describe data sovereignty and residency and their effect on storage location choices.",
   "Students will be able to explain how a retention schedule and a legal hold interact."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the three Silverline Travel requests from the warm-up aloud and ask students to vote on which seems most risky and why."
   ],
   [
    13,
    "Teach",
    "Cover GDPR scope, principles and rights; HIPAA covered entities and minimum necessary; PCI DSS as a contractual standard and scope reduction; sovereignty and residency; retention schedules and legal holds. Use one quick example per framework."
   ],
   [
    17,
    "Activity",
    "Run the compliance desk role-play in groups of three."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions with the whole class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Three requests land at once: a European customer asks for her data to be deleted, legal asks whether EU data can be stored in a US cloud region, and a manager wants to keep card details for five years just in case. Which request worries you most, and why?",
  "activity": {
   "title": "Compliance desk role-play",
   "materials": "Printed request cards (about nine), a one-page framework reference sheet the teacher prepares from the lesson, sticky notes and a whiteboard.",
   "steps": [
    "In each group of three, one student plays the requester, one the analyst and one the compliance reviewer. The requester reads a card, such as 'Share patient visit data with a marketing agency' or 'Move EU customer tables to a cheaper overseas region'.",
    "The analyst names the framework or concept that applies and proposes a response; the reviewer checks it against the reference sheet and notes any principle missed.",
    "Rotate roles after each card so every student plays each role at least once.",
    "Each group posts its trickiest card and agreed answer on the whiteboard for the class to review."
   ]
  },
  "discussion": [
   "Why might a law require keeping a record while a privacy principle says delete it? How should an organization resolve that tension?",
   "What changes for an analytics team when a company starts selling to customers in another country?",
   "Why does reducing where card data exists make PCI DSS compliance easier?"
  ],
  "exit": [
   [
    "A US clinic stores patient diagnoses. Which framework primarily applies?",
    "HIPAA, because the clinic is a covered entity holding PHI."
   ],
   [
    "Is PCI DSS a law? Explain.",
    "No. It is an industry standard enforced through contracts with card brands and banks."
   ],
   [
    "A retention schedule says delete records after five years, but those records are subject to a legal hold. What happens?",
    "They must be preserved; the legal hold suspends deletion until it is lifted."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart (Is it EU personal data? Health data at a provider or insurer? Card data? Location requirement?) to use during the role-play.",
   "Extend: Ask fast finishers to draft a three-row retention schedule for a fictional company, including record type, retention period, basis and disposal method, and note where a legal hold could apply."
  ]
 },
 {
  "t": "Protecting data: access control and least privilege, masking, anonymization, pseudonymization and encryption",
  "objectives": [
   "Students will be able to explain least privilege and how RBAC, row-level and column-level security implement it.",
   "Students will be able to distinguish static masking, dynamic masking, anonymization, pseudonymization and tokenization.",
   "Students will be able to describe encryption at rest and in transit and why key management matters.",
   "Students will be able to choose and justify the appropriate protection technique for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the fraud team's request and collect proposed safeguards on the board."
   ],
   [
    13,
    "Teach",
    "Explain least privilege and RBAC with row- and column-level security, then masking (static versus dynamic), anonymization versus pseudonymization and tokenization, encryption at rest and in transit, key management and hashing. Use the coat check analogy."
   ],
   [
    17,
    "Activity",
    "Run the protection prescription activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to examine trade-offs between privacy and usefulness."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A data science team wants a full copy of customer transactions, including names and account numbers, in a shared sandbox. List three things you could do to give them useful data while reducing risk.",
  "activity": {
   "title": "Protection prescription",
   "materials": "Printed scenario cards (about ten), a technique menu card listing each control from the lesson, a projector to show a short sample table before and after each technique, and paper.",
   "steps": [
    "Project a five-row sample customer table and show what it looks like after static masking, dynamic masking, pseudonymization and anonymization, so students see the differences.",
    "Pairs draw scenario cards, such as 'Developers need realistic data for testing', 'Regional managers should see only their region' or 'A partner needs counts by age band', and write a prescription naming the best technique and one supporting control.",
    "Pairs must state for each prescription whether the result can be re-identified and who holds any key.",
    "Pairs compare prescriptions with another pair and resolve any disagreement, then share one with the class."
   ]
  },
  "discussion": [
   "Why is true anonymization so hard to achieve, and what do organizations give up when they anonymize?",
   "If data is encrypted, why do we still need access control?",
   "When might pseudonymization be a better choice than anonymization for analytics?"
  ],
  "exit": [
   [
    "A dataset replaces customer names with codes, and a separate table can map codes back. What technique is this?",
    "Pseudonymization."
   ],
   [
    "Developers need realistic but fake customer data in a test environment. Which technique fits?",
    "Static data masking."
   ],
   [
    "What does least privilege mean?",
    "Giving each user or system only the minimum access needed to do their work."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-question decision aid: Can it be reversed? Is the stored data changed? Use it to sort the techniques before tackling scenarios.",
   "Extend: Ask fast finishers to design a layered protection plan for a fraud modeling environment, naming at least four controls and explaining what each one defends against."
  ]
 },
 {
  "t": "Data life cycle: collection, storage, use, sharing, archiving and secure disposal",
  "objectives": [
   "Students will be able to list the six data life-cycle stages in order and describe good practice at each.",
   "Students will be able to identify which stage a described failure belongs to.",
   "Students will be able to distinguish archiving from secure disposal and select an appropriate disposal method for a medium.",
   "Students will be able to explain why disposal must cover every copy of data."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about where copies of a customer list might live and list answers on the board."
   ],
   [
    12,
    "Teach",
    "Walk through the six stages with the library book comparison, giving one good practice and one common failure for each. Highlight classification at collection and disposal of every copy, and compare disposal methods."
   ],
   [
    18,
    "Activity",
    "Run the life-cycle timeline activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the life cycle to privacy and retention."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your company emails a customer list to three teams and one vendor. A year later, the list must be deleted. Name every place a copy might still exist.",
  "activity": {
   "title": "Life-cycle timeline",
   "materials": "Six large header cards for the stages taped across the whiteboard, printed event cards (about 18), sticky notes and markers.",
   "steps": [
    "Give each group a stack of event cards describing good or bad practices, such as 'Sign-up form asks for full birth date when only age over 18 is needed', 'Old project data moved to restricted cold storage', 'Vendor never confirms deletion' or 'Drives shredded with a certificate of destruction'.",
    "Groups place each card under the correct stage on the whiteboard and mark it with a green sticky note for good practice or a red one for a failure.",
    "For every red card, the group writes a one-line fix on a sticky note and attaches it.",
    "The class reviews any card placed under two stages and agrees where it best belongs and why."
   ]
  },
  "discussion": [
   "Why do so many data problems happen at the start and the end of the life cycle rather than in the middle?",
   "How could a company make sure vendors actually delete shared data when a contract ends?",
   "When would cryptographic erasure be more practical than physically destroying media?"
  ],
  "exit": [
   [
    "List the six life-cycle stages in order.",
    "Collection, storage, use, sharing, archiving and secure disposal."
   ],
   [
    "Old customer files are found in an analyst's export folder years after the retention period ended. Which stage failed?",
    "Disposal, because not every copy was destroyed when retention ended."
   ],
   [
    "What is the main difference between archiving and disposal?",
    "Archiving keeps data that must be retained in restricted long-term storage; disposal permanently destroys data no longer required."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the six stages with a one-sentence description each and start them with six clearly worded event cards before adding mixed ones.",
   "Extend: Ask fast finishers to map the life cycle of one dataset at a fictional company, naming the system, owner, protection and disposal method at each stage."
  ]
 }
]);
