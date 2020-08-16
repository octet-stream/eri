module.exports = {
  presets: ["next/babel"],
  plugins: [
    "@babel/proposal-do-expressions",
    ["@babel/proposal-pipeline-operator", {
      proposal: "minimal"
    }],
    ["@babel/proposal-decorators", {
      legacy: true
    }]
  ]
}
