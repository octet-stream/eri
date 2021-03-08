module.exports = {
  plugins: {
    "postcss-preset-env": {
      features: {
        "nesting-rules": true
      }
    },
    "postcss-font-magician": {},
    "postcss-normalize": {},
    "postcss-use": {
      resolveFromFile: true,
      modules: "*"
    },
  }
}
