const fs = require("fs");
const path = require("path");

function findProjectRoot(currentPath = process.cwd()) {
  if (currentPath === path.parse(currentPath).root) {
    return null;
  }

  const hasProblemsDir = fs.existsSync(path.join(currentPath, "problems"));
  const hasCliDir = fs.existsSync(path.join(currentPath, "challenge-cli"));

  if (hasProblemsDir && hasCliDir) {
    return currentPath;
  }

  return findProjectRoot(path.dirname(currentPath));
}

function validateProjectRoot() {
  const projectRoot = findProjectRoot();
  if (!projectRoot) {
    console.warn(`
\x1b[38;5;208m⚠️  Warning: Could not find project root directory.
  Recommended usage: Run this CLI from within the project directory structure.

  Run this to access the project root:
  cd ${path.dirname(path.dirname(__dirname))}

  Current working directory: ${process.cwd()}
  \x1b[0m
`);
    process.exit(1);
  }
  return projectRoot;
}

module.exports = {
  findProjectRoot,
  validateProjectRoot,
};
