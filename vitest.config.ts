import react from "@vitejs/plugin-react"
import {defineConfig} from "vitest/config"

export default defineConfig({
  test: {
    typecheck: {
      enabled: true
    },
    projects: [
      {
        extends: true,
        plugins: [react()],
        test: {
          name: "Node.js",
          include: ["tests/node/**/*.test.ts?(x)"],
          globalSetup: ["tests/setup/docker.ts"],
          setupFiles: ["tests/setup/dbName.ts"]
        }
      },
      {
        extends: true,
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
    ]
  }
})
