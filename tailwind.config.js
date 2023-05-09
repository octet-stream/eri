const typography = require("@tailwindcss/typography")
const device = require("tailwindcss-device")

// Screen sizes
const mobile = "450px"
const laptop = "1024px"
const desktop = "1280px"

module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      width: {
        mobile,
        laptop,
        desktop
      },
      maxWidth: {
        mobile,
        laptop,
        desktop
      }
    },
    screens: {
      mobile,
      laptop,
      desktop
    }
  },
  plugins: [
    typography,
    device
  ]
}
