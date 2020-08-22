module.exports = {
  presets: ["next/babel"],
  plugins: [
    "@babel/proposal-do-expressions",
    "@babel/proposal-nullish-coalescing-operator",
    "@babel/proposal-optional-chaining",
    "@babel/proposal-logical-assignment-operators",
    ["@babel/proposal-pipeline-operator", {
      proposal: "minimal"
    }],
    ["@babel/proposal-decorators", {
      legacy: true
    }]
  ]
}
