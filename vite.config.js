import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    coverage: {
      all: true,
      include: ["src/**/*.{js,jsx}"],
      thresholds: {
        lines: 70,
      },
    },
  },
});
