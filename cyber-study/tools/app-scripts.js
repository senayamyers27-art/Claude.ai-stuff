/* The app's script files in load order, shared by build.js and build-artifact.js. */
const fs = require("fs"), path = require("path");
const PUB = path.join(__dirname, "..", "public");
module.exports = function appScripts(certIds) {
  const labFiles = fs.readdirSync(path.join(PUB, "data")).filter(f => /^labs-.+\.js$/.test(f)).sort();
  return {
    labFiles,
    scripts: ["assets/core.js", "data/site.js", "data/catalog.js", "data/lab-map.js", ...certIds.map(id => `data/${id}.js`), ...labFiles.map(f => `data/${f}`), "assets/engine.js", "assets/labs.js", "assets/pages.js", "assets/sync.js", "assets/pro.js", "assets/app.js"]
  };
};
