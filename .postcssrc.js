module.exports = {
  plugins: {
    "postcss-preset-env": {},
    "postcss-font-magician": {},
    "postcss-normalize": {},
    "postcss-use": {
      resolveFromFile: true,
      modules: "*"
    },
  }
}
