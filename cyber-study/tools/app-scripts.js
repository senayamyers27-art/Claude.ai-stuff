/* The app's script files in load order, shared by build.js and build-artifact.js. */
const fs = require("fs"), path = require("path");
const PUB = path.join(__dirname, "..", "public");
// Pages load data/lab-index.js and fetch the full lab files on first use; the single-file build (fullLabs) includes them.
module.exports = function appScripts(certIds, { fullLabs = false } = {}) {
  const labFiles = fs.readdirSync(path.join(PUB, "data")).filter(f => /^labs-.+\.js$/.test(f)).sort();
  return {
    labFiles,
    scripts: ["assets/core.js", "data/site.js", "data/catalog.js", "data/lab-map.js", "data/frameworks.js", "data/news.js", ...certIds.map(id => `data/gen/${id}.js`), ...(fullLabs ? labFiles.map(f => `data/${f}`) : ["data/lab-index.js"]), "assets/engine.js", "assets/labs.js", "assets/pages.js", "assets/frameworks.js", "assets/careers.js", "assets/examday.js", "assets/review.js", "assets/sync.js", "assets/pro.js", "assets/app.js"]
  };
};
