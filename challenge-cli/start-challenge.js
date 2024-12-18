const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function validateProjectRoot() {
  const problemsPath = path.join(process.cwd(), "problems");
  if (!fs.existsSync(problemsPath)) {
    console.warn(`
\x1b[38;5;208m⚠️  Warning: You appear to be running the CLI outside the project root.
  Recommended usage: Run this CLI from the root of the project.

  Expected directory structure:
  /frontend-challenges
  ├── problems/
  ├── starter/
  └── challenge-cli/

  Current working directory: ${process.cwd()}\x1b[0m
`);
    // Optionally, you can choose to exit or continue
    process.exit(1);
  }
}
function startChallenge(problemName, projectName) {
  validateProjectRoot();

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
  const finalProjectName = "my-solution";
  // let finalProjectName = projectName;
  // if (!finalProjectName) {
  //   try {
  //     finalProjectName = execSync("git config user.name")
  //       .toString()
  //       .trim()
  //       .split("@")[0];
  //   } catch (error) {
  //     finalProjectName = "my-solution";
  //   }
  // }

  // Create solution directory
  const solutionPath = path.join(problemPath, "solutions", finalProjectName);
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
