#!/usr/bin/env node

const { program } = require("commander");
const { setupProblem } = require("./setup-problem");
const { createProblem } = require("./create-problem");

program
  .version("1.0.0")
  .description("CLI for managing coding challenges and solutions");

program
  .command("create <projectName> [projectPath]")
  .description("Create a new problem")
  .action((projectName, projectPath) => {
    console.log(`Creating new problem: ${projectName}`);
    createProblem(projectName, projectPath);
  });

program
  .command("setup <challenge> [projectName]")
  .description("Create a new solution for a challenge")
  .action((challenge, projectName) => {
    console.log(`Creating new solution for challenge: ${challenge}`);
    // Add logic to create a new solution
    const solutionPath = setupProblem(challenge, projectName);
    console.log(`Solution created at: ${solutionPath}`);
    console.log(`To navigate to the solution, run: cd "${solutionPath}"`);
  });

program
  .command("list-challenges")
  .description("List all available challenges")
  .action(() => {
    console.log("Available challenges:");
    // Add logic to list challenges
  });

program.parse(process.argv);
