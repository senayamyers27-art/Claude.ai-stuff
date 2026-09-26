#!/usr/bin/env node
// XSS lint: parses every app script (public/assets/*.js) and checks each value interpolated into an HTML
// template literal. A value must be provably safe: escaped (esc(), inline(), ...), a number, a nested template
// (checked on its own), a call to a function that builds HTML, a variable whose every assignment is safe,
// or a conditional/logical expression of those. A raw property such as ${lab.title} fails, because data
// could contain markup.
// Mark a value that is known to be safe with a comment inside the braces and a reason:
// ${/* html: built by cardHtml() */ cards}     ${/* num */ total}
// Usage: node tools/check-xss.js   (run by npm run check)
const fs = require("fs"), path = require("path");
const acorn = require("acorn");
const DIR = path.join(__dirname, "../public/assets");
// Text-changing methods return raw text again, so they're only as safe as what they're called on.
const PASS = new Set(["slice", "substring", "substr", "trim", "trimStart", "trimEnd", "toUpperCase", "toLowerCase", "replace", "replaceAll", "padStart", "padEnd", "concat", "toString", "at", "charAt", "normalize", "repeat"]);
// Calls that give back raw data from their argument.
const RAW = new Set(["String", "decodeURIComponent", "decodeURI", "unescape", "atob"]);
// Array callbacks whose parameter at this position is a number (the index).
const INDEX_PARAM = { map: 1, forEach: 1, filter: 1, some: 1, every: 1, flatMap: 1, find: 1, findIndex: 1, reduce: 2 };
// Properties that hold numbers.
const NUM_PROPS = new Set(["length", "size"]);
// Calls whose string argument is a CSS selector, not HTML.
const SELECTOR = new Set(["querySelector", "querySelectorAll", "closest", "matches", "$", "$$"]);
const HTMLISH = /<[a-zA-Z/!]|="|='/;
let bad = 0, checked = 0;

for (const file of fs.readdirSync(DIR).filter(f => f.endsWith(".js")).sort()) {
  const src = fs.readFileSync(path.join(DIR, file), "utf8");
  let ast;
  try { ast = acorn.parse(src, { ecmaVersion: "latest", sourceType: "script", locations: true }); }
  catch (e) { console.log(`  ✗ ${file}: can't parse (${e.message})`); bad++; continue; }
  const lineOf = pos => src.slice(0, pos).split("\n").length;
  const kids = n => { const out = []; for (const k in n) { if (k === "loc") continue; const v = n[k]; if (Array.isArray(v)) v.forEach(c => c && typeof c.type === "string" && out.push(c)); else if (v && typeof v.type === "string") out.push(v); } return out; };

  // Parent links, and every template literal.
  const parent = new Map(), templates = [];
  (function visit(n, p) { parent.set(n, p); if (n.type === "TemplateLiteral") templates.push(n); kids(n).forEach(c => visit(c, n)); })(ast, null);
  const isFn = n => /Function/.test(n.type);
  const NUM = { type: "UnaryExpression" }; // stands for a value that is always a number

  // Names a pattern binds.
  function names(p) {
    if (!p) return [];
    switch (p.type) {
      case "Identifier": return [p.name];
      case "ObjectPattern": return p.properties.flatMap(q => names(q.type === "RestElement" ? q.argument : q.value));
      case "ArrayPattern": return p.elements.flatMap(names);
      case "AssignmentPattern": return names(p.left);
      case "RestElement": return names(p.argument);
      default: return [];
    }
  }
  // The names a scope node declares, each with the values it starts with (null = unknown data, undefined = none).
  const declCache = new Map();
  function decls(s) {
    if (declCache.has(s)) return declCache.get(s);
    const d = new Map(), add = (name, v) => { if (!d.has(name)) d.set(name, []); d.get(name).push(v); };
    const declare = decl => decl.declarations.forEach(x => {
      if (x.id.type === "Identifier") add(x.id.name, x.init || undefined);
      else names(x.id).forEach(nm => add(nm, null));
    });
    if (isFn(s)) {
      const call = parent.get(s), m = call && call.type === "CallExpression" && call.arguments[0] === s && call.callee.type === "MemberExpression" && !call.callee.computed ? call.callee.property.name : "";
      const idx = m in INDEX_PARAM ? INDEX_PARAM[m] : -1;
      s.params.forEach((p, i) => names(p).forEach(nm => add(nm, i === idx && p.type === "Identifier" ? NUM : null)));
      if (s.type === "FunctionExpression" && s.id) add(s.id.name, null);
      (function vars(n, top) { // var is function-wide
        if (!top && isFn(n)) return;
        if (n.type === "VariableDeclaration" && n.kind === "var") declare(n);
        kids(n).forEach(c => vars(c, false));
      })(s.body, true);
    }
    const body = s.type === "Program" || s.type === "BlockStatement" || s.type === "StaticBlock" ? s.body : s.type === "SwitchStatement" ? s.cases.flatMap(c => c.consequent) : [];
    body.forEach(st => {
      if (st.type === "VariableDeclaration" && (st.kind !== "var" || s.type === "Program")) declare(st);
      if (st.type === "FunctionDeclaration" || st.type === "ClassDeclaration") add(st.id.name, null);
    });
    if (s.type === "ForStatement" && s.init && s.init.type === "VariableDeclaration") declare(s.init);
    if ((s.type === "ForInStatement" || s.type === "ForOfStatement") && s.left.type === "VariableDeclaration") names(s.left.declarations[0].id).forEach(nm => add(nm, null));
    if (s.type === "CatchClause" && s.param) names(s.param).forEach(nm => add(nm, null));
    declCache.set(s, d);
    return d;
  }
  // Is this variable reference safe? Every value the variable is given (declaration and assignments) must be.
  const memo = new Map();
  function safeRef(id) {
    let s = parent.get(id);
    while (s && !decls(s).has(id.name)) s = parent.get(s);
    if (!s) return id.name === "undefined";
    const key = s.start + ":" + s.type + ":" + id.name;
    if (memo.has(key)) return memo.get(key);
    memo.set(key, false); // a variable that depends on itself is unsafe until proven otherwise
    const vals = decls(s).get(id.name).slice();
    (function scan(n) { // assignments anywhere in the scope, inner functions included (shadowing only adds values, so this errs safe)
      if (n.type === "AssignmentExpression" && n.left.type === "Identifier" && n.left.name === id.name) vals.push(["=", "+=", "||=", "??=", "&&="].includes(n.operator) ? n.right : NUM);
      if ((n.type === "ForInStatement" || n.type === "ForOfStatement") && n.left.type === "Identifier" && n.left.name === id.name) vals.push(null);
      kids(n).forEach(scan);
    })(s);
    const ok = vals.every(v => v === undefined || (v !== null && safe(v)));
    memo.set(key, ok);
    return ok;
  }
  // Is this expression safe to drop into HTML?
  function safe(n) {
    switch (n.type) {
      case "Literal": return true; // written in the code, not data
      case "Identifier": return safeRef(n);
      case "MemberExpression": return !n.computed && NUM_PROPS.has(n.property.name);
      case "TemplateLiteral": return n.quasis.some(q => HTMLISH.test(q.value.raw)) || n.expressions.every(safe); // HTML ones are checked on their own
      case "TaggedTemplateExpression": return true;
      case "ConditionalExpression": return safe(n.consequent) && safe(n.alternate);
      case "LogicalExpression": return n.operator === "&&" ? safe(n.right) : safe(n.left) && safe(n.right);
      case "BinaryExpression": return n.operator === "+" ? safe(n.left) && safe(n.right) : true; // other operators give numbers or booleans
      case "UnaryExpression": case "UpdateExpression": return true;
      case "SequenceExpression": return safe(n.expressions[n.expressions.length - 1]);
      case "AssignmentExpression": return safe(n.right);
      case "AwaitExpression": return safe(n.argument);
      case "ArrowFunctionExpression": case "FunctionExpression": case "ObjectExpression": case "ClassExpression": return true; // not text
      case "CallExpression": case "NewExpression": {
        const c = n.callee;
        const name = c.type === "Identifier" ? c.name : c.type === "MemberExpression" && !c.computed ? c.property.name : "";
        if (RAW.has(name) || (c.type === "MemberExpression" && c.object.type === "Identifier" && c.object.name === "JSON")) return false;
        if (c.type === "MemberExpression" && PASS.has(name)) return safe(c.object);
        if (name === "join") return (c.object.type === "CallExpression" && c.object.callee.type === "MemberExpression" && ["map", "flatMap"].includes(c.object.callee.property.name)) || safe(c.object);
        return true; // other calls: escape helpers, number and date formatting, or functions that build HTML (their own templates are checked)
      }
      default: return false; // properties, arrays...: raw data
    }
  }

  for (const node of templates) {
    if (!node.expressions.length || !node.quasis.some(q => HTMLISH.test(q.value.raw))) continue; // not HTML
    const call = parent.get(node);
    if (call && call.type === "CallExpression" && call.arguments[0] === node && call.callee.type === "MemberExpression" && SELECTOR.has(call.callee.property.name)) continue; // a CSS selector
    node.expressions.forEach((ex, i) => {
      checked++;
      const between = src.slice(node.quasis[i].end, ex.start); // "${" plus any comment before the expression
      if (/\/\*\s*(html|num|safe)\b[^*]*\*\//.test(between)) return;
      if (safe(ex)) return;
      bad++;
      console.log(`  ✗ ${file}:${lineOf(ex.start)}: \${${src.slice(ex.start, ex.end).slice(0, 80)}} is not escaped`);
    });
  }
}
if (bad) { console.log(`${bad} unescaped value(s) in HTML templates. Wrap them in esc(), or mark a known-safe value with /* html: why */ or /* num */.`); process.exit(1); }
console.log(`XSS lint passed (${checked} template values checked).`);
