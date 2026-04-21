import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
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
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
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
