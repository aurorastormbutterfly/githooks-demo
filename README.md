# Git Hooks Demo 🪝

Welcome to the interactive demo repository for the Git Hooks session! This project contains a simple React application that we will use to explore how Git hooks can help us shift left and catch issues before they are committed.

> **Note on Participation:** Following along with the code is entirely optional! If you learn best through hands-on practice, we highly encourage you to set up the repository using the steps below. However, if you are a more visual or auditory learner, or if you don't use Git in your day-to-day role, you are more than welcome to simply sit back and enjoy the live demonstration.

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
