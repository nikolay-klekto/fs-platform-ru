<h1 align="center">FunscrutRU Next app</h1>

<p align="center">
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" >

<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" >

</p>

## Project structure

-   components
    -   layout
    -   shared
    -   ui
-   constants
-   hooks
-   services
-   utils

## Installation and Running

`npm install` <br/>
`npm ci` <br/>
`npm run dev` <br/>

---

## Stack

-   [TS](https://www.typescriptlang.org/)
-   [Next](https://nextjs.org/) ([App router](https://nextjs.org/docs/app))
-   [Tailwind CSS](https://tailwindcss.com/)
-   Eslint, Prettier

## Project workflow

1. Decompose tasks into subtasks
2. Task distribution
3. We discuss, ask questions, keep each other informed about problems and successes
4. When the task is ready:
    1. Pull changes from the main branch (currently is _dev-front-react_) to your task branch
    2. Do a local merge
    3. Check functionality
    4. Create a PR (pull request), this PR should not have conflicts with the working branch
    5. According to PR template describe the content of the task at PR test part
    6. To check PR, attach the teamlead to conduct a code review, without their approval we do not merge this PR (except for emergency cases, which are discussed separately in the chat)
    7. After approval, merge the feature branch into the working one, select **Squash and merge**
    8. Delete the feature branch

**All correspondence in the repository, names of commits, PR, etc. provided in English.**

## Project structure

### GIT:

-   The **main** branch - for sending code to product
-   The **dev-front-react** branch is a working branch, from which we create branches to perform our tasks
-   Feature branches are called like **FF-12-feat/task-name**
-   Other branches in the same style - **FF-12-fix/issue-name** (docs, refactor etc.)
-   PR name - **FF-12-feat Task name** e.g. **FF-12-feat Header button colors**
    **Where number e.g. FF-12 or FF-30 is the same as task number at Jira.**

Commit names - follow [commit convention](https://www.conventionalcommits.org/en/v1.0.0/) ([Russian transation](https://gist.github.com/Voloshin-Sergei/ffbec67c6d9fcb32b0df014ababba0e9) of this convention), e.g. `FF-12-feat: add submit button` or `FF-12-fix: some error`

p.s. We try to stick to this style. The main point is to have meaningful names.

<br/>

# Style Guide
