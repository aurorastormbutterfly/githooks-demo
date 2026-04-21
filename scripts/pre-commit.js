import { execSync } from "child_process";

try {
  console.log("Running pre-commit hook: Checking for TODO/FIXME comments...");

  // Get a list of staged files
  const stagedFiles = execSync("git diff --cached --name-only", {
    encoding: "utf8",
  })
    .split("\n")
    .filter(Boolean); // Remove any empty strings

  for (const file of stagedFiles) {
    // Skip this script to avoid catching our own rule definitions!
    if (file === "scripts/pre-commit.js") continue;

    // Get the diff for the specific file
    const diff = execSync(`git diff --cached "${file}"`, { encoding: "utf8" });
    // Filter for lines that were added (start with +) but aren't file headers (+++)
    const addedLines = diff
      .split("\n")
      .filter((line) => line.startsWith("+") && !line.startsWith("+++"));

    const todoMatches = addedLines.filter((line) => /(TODO|FIXME)/.test(line));
    if (todoMatches.length > 0) {
      console.error(
        `Error: Found 'TODO' or 'FIXME' in staged changes for file: ${file}`,
      );
      console.error("Please resolve them before committing:");
      console.error(todoMatches.join("\n"));
      process.exit(1); // Abort the commit
    }

    const consoleMatches = addedLines.filter((line) =>
      /console\.log/.test(line),
    );
    if (consoleMatches.length > 0) {
      console.error(
        `Error: Found 'console.log' in staged changes for file: ${file}`,
      );
      console.error("Please remove it before committing:");
      console.error(consoleMatches.join("\n"));
      process.exit(1); // Abort the commit
    }
  }

  console.log("Running pre-commit hook: Executing linter...");
  execSync("npm run lint", { stdio: "inherit" });

  console.log("Running pre-commit hook: Executing unit tests...");
  execSync("npm run test", { stdio: "inherit" });
} catch {
  // If any command fails (like the linter or tests), execSync throws an error.
  process.exit(1); // Abort the commit
}
