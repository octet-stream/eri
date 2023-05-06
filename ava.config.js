module.exports = {
  failFast: true,
  extensions: ["ts", "tsx"],
  files: ["src/**/*.test.{ts,tsx}"],
  nodeArguments: [
    "--no-warnings",
    "--experimental-fetch"
  ],
  require: [
    "global-jsdom/register",
    "ts-node/register/transpile-only",
    "reflect-metadata",
    "./src/server/lib/env.ts",
    "./src/server/__helper__/polyfills.ts"
  ],
  environmentVariables: {
    "TS_NODE_PROJECT": "tsconfig.ava.json",
    "TEST_RUNNER": "ava"
  }
}
