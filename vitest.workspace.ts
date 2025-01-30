import {defineWorkspace} from "vitest/config"

import react from "@vitejs/plugin-react"

export default defineWorkspace([
  {
    extends: "vitest.config.ts",
    test: {
      name: "Node.js",
      include: ["tests/node/**/*.test.ts?(x)"],
      globalSetup: ["tests/setup/docker.ts"],
      setupFiles: ["tests/setup/dbName.ts", "tests/setup/orm.ts"]
    }
  },
  {
    extends: "vitest.config.ts",
    plugins: [react()],
    test: {
      name: "Desktop browsers",
      setupFiles: ["tests/setup/browser.ts"],
      include: [
        "tests/browser/**/*.test.ts?(x)",
        "tests/browser/**/*.desktop.ts?(x)"
      ],
      browser: {
        enabled: true,
        headless: true,
        provider: "playwright",
        instances: [
          {
            browser: "chromium"
          },
          {
            browser: "firefox"
          },
          {
            browser: "webkit"
          }
        ]
      }
    }
  }
])
