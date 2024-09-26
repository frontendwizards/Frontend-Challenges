// utils.js

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function capitalizeProjectName(projectName) {
  return projectName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function createFullPath(projectPath, projectName) {
  return path.join(projectPath, projectName);
}

function copyStarterProject(sourcePath, destinationPath) {
  execSync(
    `rsync -av --progress ${sourcePath}/ ${destinationPath} --exclude node_modules`
  );
}

function replaceInFiles(directory, oldValue, newValue, filePattern) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      replaceInFiles(filePath, oldValue, newValue, filePattern);
    } else if (file === filePattern) {
      let content = fs.readFileSync(filePath, "utf8");
      content = content.replace(new RegExp(oldValue, "g"), newValue);
      fs.writeFileSync(filePath, content);
    }
  });
}

function createProject(projectName, projectPath = "problems") {
  const challengeName = capitalizeProjectName(projectName);
  const fullPath = createFullPath(projectPath, projectName);

  copyStarterProject("starter", fullPath);
  replaceInFiles(
    `${fullPath}/solutions/react-ts`,
    "starter",
    projectName,
    "package.json"
  );
  replaceInFiles(fullPath, "Example Challenge", challengeName, "README.md");

  process.chdir(`${fullPath}/solutions/react-ts`);
  execSync("npm install");

  console.log(
    `Project '${projectName}' created successfully at '${fullPath}'.`
  );
}

module.exports = { createProject };
