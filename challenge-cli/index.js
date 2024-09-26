#!/usr/bin/env node

const { program } = require("commander");
const { startChallenge } = require("./start-challenge");
const { createChallenge } = require("./create-challenge");
const { execSync } = require("child_process");
const path = require("path");

program
  .version("1.0.0")
  .description("CLI for managing coding challenges and solutions");

program
  .command("create <challengeName> [challengePath]")
  .description("Create a new challenge")
  .action((challengeName, challengePath) => {
    console.log(`Creating new challenge: ${challengeName}`);
    const solutionPath = createChallenge(challengeName, challengePath);
    changeDirectory(solutionPath);
  });

program
  .command("start <challengeName> [solutionName]")
  .description("Start working on a challenge")
  .action((challengeName, solutionName) => {
    console.log(`Starting challenge: ${challengeName}`);
    const solutionPath = startChallenge(challengeName, solutionName);
    changeDirectory(solutionPath);
  });

program
  .command("list")
  .description("List all available challenges")
  .action(() => {
    console.log("Available challenges:");
    // listChallenges();
  });

function changeDirectory(dirPath) {
  // Ensure we're working with an absolute path
  const absolutePath = dirPath

  // Create the directory and any necessary parent directories
  // fs.mkdirSync(absolutePath, { recursive: true });
  console.log(`abs directory to: ${absolutePath}`);

  try {
    process.chdir(absolutePath);
    console.log(`Changed directory to: ${process.cwd()}`);
  } catch (err) {
    console.error(`Error changing directory: ${err}`);
  }
}

program.parse(process.argv);
