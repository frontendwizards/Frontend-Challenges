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
| <a href="https://frontendpractice.hmellahi.me/challenge/user-interface/traffic-light" target="_blank">Traffic light</a>     | Easy       | ✅        | ✅         | ✅       | [Solution](/problems/traffic-light/solutions/react-ts)   |
| <a href="https://frontendpractice.hmellahi.me/challenge/user-interface/whack-a-mole" target="_blank">Whack a Mole</a>       | Medium     | ✅        | ✅         | ✅       | [Solution](/problems/whack-a-mole/solutions/react-ts)    |
| <a href="https://frontendpractice.hmellahi.me/challenge/user-interface/file-explorer" target="_blank">File Explorer</a>     | Medium     | ✅        | ✅         | ✅       | [Solution](/problems/file-explorer/solutions/react-ts)   |
| <a href="https://frontendpractice.hmellahi.me/challenge/user-interface/wordle-game" target="_blank">Wordle Game</a>         | Hard       | ✅        | ✅         | ✅       | [Solution](/problems/wordle-game/solutions/react-ts)     |
| <a href="https://frontendpractice.hmellahi.me/challenge/user-interface/twitter-like" target="_blank">Twitter like</a>       | Medium     | ✅        | ✅         | ✅       | [Solution](/problems/twitter-like/solutions/react-ts)    |
| <a href="https://frontendpractice.hmellahi.me/challenge/user-interface/twitter-like-II" target="_blank">Twitter like II</a> | Medium     | -         | -          | -        | [Solution](/problems/twitter-like-II/solutions/react-ts) |

</p>

### Utility functions problems

  <p align="center">

| Title                                                                                                                               | Difficulty | Topic                       |  
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------- |
| <a href="https://leetcode.com/problems/to-be-or-not-to-be/description/" target="_blank">To Be Or Not To Be</a>                                                 | Easy       | Closures                    |
| <a href="https://leetcode.com/problems/array-reduce-transformation/description/" target="_blank">Array Reduce Transformation</a>                               | Easy       | Basic Array Transformations |
| <a href="https://leetcode.com/problems/function-composition/description/" target="_blank">Function Composition</a>                                             | Easy       | Function Transformations    |
| <a href="https://leetcode.com/problems/return-length-of-arguments-passed/description/" target="_blank">Return Length of Arguments Passed</a>                   | Easy       | Function Transformations    |
| <a href="https://leetcode.com/problems/allow-one-function-call/description/" target="_blank">Allow One Function Call</a>                                       | Easy       | Function Transformations    |
| <a href="https://leetcode.com/problems/memoize/description/" target="_blank">Memoize</a>                                                                       | Medium     | Function Transformations    |
| <a href="https://leetcode.com/problems/calculator-with-method-chaining/description/" target="_blank">Calculator with Method Chaining</a>                       | Easy       | Classes                     |
| <a href="https://leetcode.com/problems/add-two-promises/description/" target="_blank">Add Two Promises</a>                                                     | Easy       | Promises and Time           |
| <a href="https://leetcode.com/problems/sleep/description/" target="_blank">Sleep</a>                                                                           | Easy       | Promises and Time           |
| <a href="https://leetcode.com/problems/timeout-cancellation/description/" target="_blank">Timeout Cancellation</a>                                             | Easy       | Promises and Time           |
| <a href="https://leetcode.com/problems/interval-cancellation/description/" target="_blank">Interval Cancellation</a>                                           | Easy       | Promises and Time           |
| <a href="https://leetcode.com/problems/promise-time-limit/description/" target="_blank">Promise Time Limit</a>                                                 | Medium     | Promises and Time           |
| <a href="https://leetcode.com/problems/cache-with-time-limit/description/" target="_blank">Cache With Time Limit</a>                                           | Medium     | Promises and Time           |
| <a href="https://leetcode.com/problems/debounce/description/" target="_blank">Debounce</a>                                                                     | Medium     | Promises and Time           |
| <a href="https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/description/" target="_blank">Execute Asynchronous Functions in Parallel</a> | Medium     | Promises and Time           |
| <a href="https://leetcode.com/problems/is-object-empty/description/" target="_blank">Is Object Empty</a>                                                       | Easy       | JSON                        |
| <a href="https://leetcode.com/problems/chunk-array/description/" target="_blank">Chunk Array</a>                                                               | Easy       | JSON                        |
| <a href="https://leetcode.com/problems/array-prototype-last/description/" target="_blank">Array Prototype Last</a>                                             | Easy       | JSON                        |
| <a href="https://leetcode.com/problems/group-by/description/" target="_blank">Group By</a>                                                                     | Medium     | JSON                        |
| <a href="https://leetcode.com/problems/sort-by/description/" target="_blank">Sort By</a>                                                                       | Easy       | JSON                        |
| <a href="https://leetcode.com/problems/join-two-arrays-by-id/description/" target="_blank">Join Two Arrays by ID</a>                                           | Medium     | JSON                        |
| <a href="https://leetcode.com/problems/flatten-deeply-nested-array/description/" target="_blank">Flatten Deeply Nested Array</a>                               | Medium     | JSON                        |
| <a href="https://leetcode.com/problems/compact-object/description/" target="_blank">Compact Object</a>                                                         | Medium     | JSON                        |

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