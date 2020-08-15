module.exports = {
  presets: ["next/babel"],
  plugins: [
    "@babel/proposal-do-expressions",
    ["@babel/proposal-decorators", {
      legacy: true
    }]
  ]
}
