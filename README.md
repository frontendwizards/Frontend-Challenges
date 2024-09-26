# Frontend Challenges (WORK IN PROGRESS)

This repo contains frontend challenges to help developers improve problem-solving skills and create performant and accessible UIs.

Each challenge includes:

- Requirements
- Solution in React with TypeScript.
- Live demo (Coming soon)

## Table of Contents

- [Frontend Challenges (WORK IN PROGRESS)](#frontend-challenges-work-in-progress)
  - [Table of Contents](#table-of-contents)
  - [Problems](#problems)
    - [User Interface problems](#user-interface-problems)
    - [Utility functions problems](#utility-functions-problems)
  - [Use Cases](#use-cases)
  - [Getting Started](#getting-started)
  - [How to Check if Your Solution (UI) Is Accessible](#how-to-check-if-your-solution-ui-is-accessible)
  - [How can you help?](#how-can-you-help)
  - [How To Add Your Solution](#how-to-add-your-solution)
  - [How To Add New Problem](#how-to-add-new-problem)
  - [Coding Standards](#coding-standards)

## Problems

### User Interface problems

<p align="center">

| Title                                         | Difficulty | Completed | Accessible | Reviewed |
| --------------------------------------------- | ---------- | --------- | ---------- | -------- |
| [Traffic light](/problems/traffic-light/)     | Easy       | ✅        | ✅         | ✅       |
| [Whack a Mole](/problems/whack-a-mole/)       | Medium     | ✅        | ✅         | ✅       |
| [File Explorer](/problems/file-explorer/)     | Medium     | ✅        | ✅         | ✅       |
| [Wordle Game](/problems/wordle-game/)         | Hard       | ✅        | ✅         | ✅       |
| [Twitter like](/problems/twitter-like/)       | Medium     | ✅        | ✅         | ✅       |
| [Twitter like II](/problems/twitter-like-II/) | Medium     | -         | -          | -        |

</p>

### Utility functions problems

  <p align="center">

| Title | Difficulty | Completed | Tests | Reviewed |
| ----- | ---------- | --------- | ----- | -------- |

## Use Cases

- Employers evaluating frontend developer skills
- Frontend developers seeking practice with coding challenges.

## Getting Started

If you wanna work with React, you can use the starter template.

Just run this command:

```bash

syntax: challenge-cli start $PROBLEM_NAME $PROJECT_NAME
# $PROJECT_PATH default value is your github username or 'my-solution'

# Example 1
challenge-cli start twitter-like

# Example 2
challenge-cli start twitter-like my-solution

```

## How to Check if Your Solution (UI) Is Accessible

You can use automated accessibility checkers like **axe-core** to detect most accessibility issues.

For more information, check out [this article](https://larsmagnus.co/blog/how-to-test-for-accessibility-with-axe-core-in-next-js-and-react).

Also :

- Test your app with a keyboard to ensure full keyboard navigation
- Add ARIA labels to make your app understandable by screen readers
- Use [Claude](https://claude.ai/new) for a final accessibility check

> [!NOTE]  
> axe-core is already included in the starter template.

## How can you help?

- ⭐️ Star this repository to motivate the addition of more challenges
- 🤓 Solved an interesting problem? Feel free to submit it!
- 🐞 If you find a bug, raise an issue or fix it and send a pull request.
- 📚 Improve documentation or add tutorials for solving challenges.

## How To Add Your Solution

To add your solution follow the process for [making a pull request to an open-source project](https://github.com/gabrieldemarmiesse/getting_started_open_source).

In short:

- Fork this repo and clone it.
- Create a branch and make your change.
- Push your branch to your fork.
- Open a PR against this repo.


## How To Add New Problem

If you wanna work with React, you can use the starter template.

if you can create a new problem, use the create command:

```bash

syntax: challenge-cli create $PROBLEM_NAME $PROJECT_NAME
# $PROJECT_PATH default value is 'problems'

# Example 1
challenge-cli create new-problem

# Example 2
challenge-cli create new-problem problems-folder

```

## Coding Standards

Please adhere to the following coding standards when submitting solutions:

- Ensure your app is accessible. Refer to the [Accessibility Guidelines](#how-to-check-if-your-solution-ui-is-accessible) for more details.
- Format your code using Prettier.
