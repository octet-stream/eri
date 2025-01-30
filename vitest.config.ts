import {defineConfig} from "vitest/config"

/**
 * @deprecated The test are separated from the routes now, so this can be removed
 */
export const TESTS_SEARCH_PATTERN = "tests/node/**/*.test.ts?(x)"

export default defineConfig({
  test: {}
})
