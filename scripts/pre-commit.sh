#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "Running pre-commit hook: Checking for TODO/FIXME comments..."
for file in $(git diff --cached --name-only); do
  # Skip this script to avoid catching our own rule definitions!
  if [ "$file" = "scripts/pre-commit.sh" ]; then
    continue
  fi

  MATCHES=$(git diff --cached "$file" | grep -E '^\+.*(TODO|FIXME)' || true)
  if [ -n "$MATCHES" ]; then
    echo "Error: Found 'TODO' or 'FIXME' in staged changes for file: $file"
    echo "Please resolve them before committing:"
    echo "$MATCHES"
    exit 1
  fi
done

echo "Running pre-commit hook: Checking for console.log statements..."
for file in $(git diff --cached --name-only); do
  # Skip this script to avoid catching our own rule definitions!
  if [ "$file" = "scripts/pre-commit.sh" ]; then
    continue
  fi

  MATCHES=$(git diff --cached "$file" | grep -E '^\+.*console\.log' || true)
  if [ -n "$MATCHES" ]; then
    echo "Error: Found 'console.log' in staged changes for file: $file"
    echo "Please remove it before committing:"
    echo "$MATCHES"
    exit 1
  fi
done

echo "Running pre-commit hook: Executing linter..."
npm run lint

echo "Running pre-commit hook: Executing unit tests..."
npm run test

# Forward the execution to our version-controlled script
#./scripts/pre-commit.sh

# Forward the execution to our tracked Node.js script
# node ./scripts/pre-commit.js