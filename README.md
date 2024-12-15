# Frontend Challenges

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

| Title                                                                                            | Difficulty | Completed | Accessible | Reviewed | Solution                                                 |
| ------------------------------------------------------------------------------------------------ | ---------- | --------- | ---------- | -------- | -------------------------------------------------------- |
| [Traffic light](https://frontendpractice.hmellahi.me/challenge/user-interface/traffic-light)     | Easy       | ✅        | ✅         | ✅       | [Solution](/problems/traffic-light/solutions/react-ts)   |
| [Whack a Mole](https://frontendpractice.hmellahi.me/challenge/user-interface/whack-a-mole)       | Medium     | ✅        | ✅         | ✅       | [Solution](/problems/whack-a-mole/solutions/react-ts)    |
| [File Explorer](https://frontendpractice.hmellahi.me/challenge/user-interface/file-explorer)     | Medium     | ✅        | ✅         | ✅       | [Solution](/problems/file-explorer/solutions/react-ts)   |
| [Wordle Game](https://frontendpractice.hmellahi.me/challenge/user-interface/wordle-game)         | Hard       | ✅        | ✅         | ✅       | [Solution](/problems/wordle-game/solutions/react-ts)     |
| [Twitter like](https://frontendpractice.hmellahi.me/challenge/user-interface/twitter-like)       | Medium     | ✅        | ✅         | ✅       | [Solution](/problems/twitter-like/solutions/react-ts)    |
| [Twitter like II](https://frontendpractice.hmellahi.me/challenge/user-interface/twitter-like-II) | Medium     | -         | -          | -        | [Solution](/problems/twitter-like-II/solutions/react-ts) |

</p>

### Utility functions problems

  <p align="center">

| Title                                                                                                                               | Difficulty | Topic                       | 
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------- |
| [To Be Or Not To Be](https://leetcode.com/problems/to-be-or-not-to-be/description/)                                                 | Easy       | Closures                    |
| [Array Reduce Transformation](https://leetcode.com/problems/array-reduce-transformation/description/)                               | Easy       | Basic Array Transformations |
| [Function Composition](https://leetcode.com/problems/function-composition/description/)                                             | Easy       | Function Transformations    |
| [Return Length of Arguments Passed](https://leetcode.com/problems/return-length-of-arguments-passed/description/)                   | Easy       | Function Transformations    |
| [Allow One Function Call](https://leetcode.com/problems/allow-one-function-call/description/)                                       | Easy       | Function Transformations    |
| [Memoize](https://leetcode.com/problems/memoize/description/)                                                                       | Medium     | Function Transformations    |
| [Calculator with Method Chaining](https://leetcode.com/problems/calculator-with-method-chaining/description/)                       | Easy       | Classes                     |
| [Add Two Promises](https://leetcode.com/problems/add-two-promises/description/)                                                     | Easy       | Promises and Time           |
| [Sleep](https://leetcode.com/problems/sleep/description/)                                                                           | Easy       | Promises and Time           |
| [Timeout Cancellation](https://leetcode.com/problems/timeout-cancellation/description/)                                             | Easy       | Promises and Time           |
| [Interval Cancellation](https://leetcode.com/problems/interval-cancellation/description/)                                           | Easy       | Promises and Time           |
| [Promise Time Limit](https://leetcode.com/problems/promise-time-limit/description/)                                                 | Medium     | Promises and Time           |
| [Cache With Time Limit](https://leetcode.com/problems/cache-with-time-limit/description/)                                           | Medium     | Promises and Time           |
| [Debounce](https://leetcode.com/problems/debounce/description/)                                                                     | Medium     | Promises and Time           |
| [Execute Asynchronous Functions in Parallel](https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/description/) | Medium     | Promises and Time           |
| [Is Object Empty](https://leetcode.com/problems/is-object-empty/description/)                                                       | Easy       | JSON                        |
| [Chunk Array](https://leetcode.com/problems/chunk-array/description/)                                                               | Easy       | JSON                        |
| [Array Prototype Last](https://leetcode.com/problems/array-prototype-last/description/)                                             | Easy       | JSON                        |
| [Group By](https://leetcode.com/problems/group-by/description/)                                                                     | Medium     | JSON                        |
| [Sort By](https://leetcode.com/problems/sort-by/description/)                                                                       | Easy       | JSON                        |
| [Join Two Arrays by ID](https://leetcode.com/problems/join-two-arrays-by-id/description/)                                           | Medium     | JSON                        |
| [Flatten Deeply Nested Array](https://leetcode.com/problems/flatten-deeply-nested-array/description/)                               | Medium     | JSON                        |
| [Compact Object](https://leetcode.com/problems/compact-object/description/)                                                         | Medium     | JSON                        |

</p>

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
