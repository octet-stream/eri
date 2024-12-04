import {defineConfig} from "vitest/config"

export const TESTS_SEARCH_PATTERN = "**/*.test.ts?(x)"

export default defineConfig({
  test: {
    include: [TESTS_SEARCH_PATTERN],
    exclude: ["e2e", "node_modules", "src"],
    pool: "threads",
    globalSetup: ["scripts/vitest/global-setup/db.ts"]
  }
})
