// Screen sizes
const mobile = "450px"

module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {},
    screens: {
      mobile: {
        max: mobile
      }
    }
  },
  plugins: []
}
