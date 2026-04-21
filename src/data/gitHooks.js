export const gitHooks = [
  {
    name: "pre-commit",
    description:
      "Runs before a commit is created. Ideal for linting code, running unit tests, or checking for trailing whitespace.",
  },
  {
    name: "prepare-commit-msg",
    description:
      "Runs before the commit message editor is opened. Useful for auto-generating commit messages or appending branch names.",
  },
  {
    name: "commit-msg",
    description:
      "Runs after the commit message is entered. Often used to enforce commit message standards (like Conventional Commits).",
  },
  {
    name: "post-commit",
    description:
      "Runs immediately after a commit is created. Useful for notifications or triggering post-commit CI builds.",
  },
  {
    name: "pre-push",
    description:
      "Runs right before code is pushed to a remote repository. Great for running slower integration tests to prevent breaking the remote build.",
  },
  {
    name: "post-merge",
    description:
      "Runs after a successful merge command. Commonly used to automatically run dependencies installation (e.g., `npm install`) if the lockfile changed.",
  },
];
