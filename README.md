# Frontend Challenges (WORK IN PROGRESS)

This repo contains frontend challenges to help developers improve problem-solving skills and create performant, accessible UIs.

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
  - [How to check if your solution (UI) is accessible](#how-to-check-if-your-solution-ui-is-accessible)
  - [How can you help?](#how-can-you-help)
  - [How To Add Your Solution](#how-to-add-your-solution)

## Problems

### User Interface problems

<p align="center">

| Title                                         | Completed | Accessible | Reviewed | Solution Explained |
| --------------------------------------------- | --------- | ---------- | -------- | ------------------ |
| [Traffic light](/problems/traffic-light/)     | ✅        | ✅         | ✅       | -                  |
| [Whack a Mole](/problems/whack-a-mole/)       | ✅        | ✅         | ✅       | -                  |
| [File Explorer](/problems/file-explorer/)     | ✅        | ✅         | ✅       | -                  |
| [Wordle Game](/problems/wordle-game/)         | -         | -          | -        | -                  |
| [Twitter like](/problems/twitter-like/)       | ✅        | ✅         | ✅       | -                  |
| [Twitter like II](/problems/twitter-like-II/) | -         | -          | -        | -                  |

</p>

### Utility functions problems

<p align="center">

| Title | Completed | Tests | Reviewed |
| ----- | --------- | ----- | -------- |

## Use Cases

- Employers evaluating frontend developer skills
- Frontend developers seeking practice with coding challenges.

## Getting Started

If you wanna work with React, you can use the starter template.

you can create a new project by using the create_project script:

```bash

# Example 1
source scripts/create_project.sh $PROJECT_NAME

# Example 2
source scripts/create_project.sh $PROJECT_NAME $PROJECT_PATH

# $PROJECT_PATH default value is 'problems'
```

## How to check if your solution (UI) is accessible

You can use automated accessibility checkers like **axe-core** to detect most accessibility issues.

For more information, check out [this article](https://larsmagnus.co/blog/how-to-test-for-accessibility-with-axe-core-in-next-js-and-react).

> [!NOTE]  
> It's already included in the starter template

## How can you help?

- ⭐️ Star this repository to motivate the addition of more challenges
- 🤓 Solved an interesting problem? Feel free to submit it!
- 🐞 If you find a bug, raise an issue or fix it and send a pull request.

## How To Add Your Solution

To add your solution follow the process for [making a pull request to an open-source project](https://github.com/gabrieldemarmiesse/getting_started_open_source).

In short:

- Fork this repo and clone it.
- Create a branch and make your change.
- Push your branch to your fork.
- Open a PR against this repo.
