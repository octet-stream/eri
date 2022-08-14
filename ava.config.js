module.exports = {
  failFast: true,
  extensions: ["ts", "tsx"],
  files: ["src/**/*.test.{ts,tsx}"],
  require: [
    "ts-node/register/transpile-only",
    "reflect-metadata",
    "./src/server/env.ts"
  ]
}
