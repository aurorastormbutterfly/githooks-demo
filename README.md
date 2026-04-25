# Git Hooks Demo 🪝

Welcome to the interactive demo repository for the Git Hooks session! This project contains a simple React application that we will use to explore how Git hooks can help us shift left and catch issues before they are committed.

> **Note on Participation:** Following along with the code is entirely optional! If you learn best through hands-on practice, I highly encourage you to set up the repository using the steps below. However, if you are a more visual or auditory learner, or if you don't use Git in your day-to-day role, you are more than welcome to simply sit back and enjoy the live demonstration.

## Prerequisites
If you choose to code along, please ensure you have the following installed:
- **Git**: Check by running `git --version` in your terminal. (Download: git-scm.com)
- **Node.js**: Check by running `node -v` in your terminal. (Download: nodejs.org)
- **An IDE**: Such as VS Code, to write your hook scripts and view the project files.

## Getting Started

To follow along with the hands-on portions and complete the post-session challenge, please set up the project on your local machine:

### 1. Fork and Clone
First, fork [this repository](https://github.com/aurorastormbutterfly/githooks-demo) to your own GitHub account. Then, clone your forked copy to your local machine:
```bash
git clone https://github.com/YOUR-USERNAME/githooks-demo.git
cd githooks-demo
```

### 2. Install Dependencies
Run the following command to install the required Node.js packages (like React, Vite, ESLint, and Vitest):
```bash
npm install
```

### 3. Start the Development Server
Spin up the local web server to view the interactive directory and setup guide:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to see the site!

## Post-Session Challenge (extra credit) 👩‍🎓
*Please note: You do not need to do this before the session! We will cover the basics together live.*

After the demo, once you have the site running, navigate to the **Set-up** page in the navigation bar. Your challenge is to follow the instructions to write your very own local `pre-commit` hook using a bash script to check for unresolved //TODO or //FIXME comments in your code.

## Sharing Hooks Across Your Team 🤝

By default, Git hooks live in the hidden `.git/hooks` directory. Because `.git` is local to your machine and isn't version-controlled, any scripts you write there **won't** be shared with your team when you push your code.

To enforce hooks across an entire team so that everyone is running the same checks, you have a few options:

1. **Tracked "Pointer" Scripts (Native Git / No dependencies):** As demonstrated in this repository, you can store your hook logic in a normal, tracked directory (like the `scripts/` directory in this project). Each team member then creates a tiny `.git/hooks/pre-commit` file on their local machine that simply executes the tracked script.

   For a bash script, their local hook would look like this:
   ```bash
   #!/bin/sh
   ./scripts/pre-commit.sh
   ```
   Or, if your tracked hook is written in Node.js:
   ```bash
   #!/bin/sh
   node ./scripts/pre-commit.js
   ```
2. **Husky (Node.js Ecosystem):** Husky is an incredibly popular npm package that automatically handles the `core.hooksPath` setup for your team as soon as they run `npm install`.
3. **Lefthook or pre-commit (Language Agnostic):** Tools like Lefthook or pre-commit let you define your team's hooks in a simple `.yml` configuration file. These are excellent choices for repositories that use multiple programming languages.
