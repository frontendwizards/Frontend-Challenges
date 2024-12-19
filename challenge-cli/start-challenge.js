const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function getNextSolutionNumber(basePath) {
  let counter = 1;
  while (fs.existsSync(`${basePath}-${counter}`)) {
    counter++;
  }
  return counter;
}

function startChallenge(problemName, projectName) {
  if (!problemName) {
    console.error("Error: $PROBLEM_NAME is not provided");
    process.exit(1);
  }

  const problemPath = path.join("problems", problemName);

  if (!fs.existsSync(problemPath)) {
    console.error(`Error: ${problemPath} does not exist`);
    process.exit(1);
  }

  // Determine which starter to use
  let starterPath;
  const specificStarterPath = path.join(problemPath, "starter");
  const genericStarterPath = path.join("starter/solutions/react-ts");

  if (fs.existsSync(specificStarterPath)) {
    starterPath = specificStarterPath;
  } else if (fs.existsSync(genericStarterPath)) {
    starterPath = genericStarterPath;
  } else {
    console.error("Error: No starter template found");
    process.exit(1);
  }

  // Determine project name
  const finalProjectName = projectName || "my-solution";

  // Create solution directory
  let solutionPath = path.join(problemPath, "solutions", finalProjectName);
  
  // If solution directory exists, add a number suffix
  if (fs.existsSync(solutionPath)) {
    const nextNumber = getNextSolutionNumber(solutionPath);
    solutionPath = `${solutionPath}-${nextNumber}`;
  }
  
  fs.mkdirSync(solutionPath, { recursive: true });

  // Copy starter to solution directory
  fs.cpSync(starterPath, solutionPath, { recursive: true });

  // Change directory
  process.chdir(solutionPath);

  // Run npm install
  try {
    execSync("npm install --loglevel=silent --logs-max=0", {
      stdio: "inherit",
    });
  } catch (error) {
    console.error("Error running npm install:", error.message);
  }

  return solutionPath;
}

module.exports = { startChallenge };
