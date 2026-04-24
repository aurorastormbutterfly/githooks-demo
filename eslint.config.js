import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  js.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "react/jsx-uses-vars": "error", // Tells ESLint that <Component /> counts as using the variable
      "no-unused-vars": ["error", { varsIgnorePattern: "^_" }],

      // Explicit rules added for the live demo:
      "no-unreachable": "error", // Prevents code after a return statement
      eqeqeq: "error", // Enforces using === instead of ==
    },
  },
  {
    // This section applies only to test files
    files: ["**/*.test.{js,jsx}"],
    languageOptions: {
      globals: globals.vitest, // It adds Vitest's global variables
    },
  },
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      globals: globals.node, // Tells ESLint this is a Node environment, fixing 'process'
    },
  },
]);
