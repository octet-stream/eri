const plugin = require("tailwindcss/plugin")

const values = {
  touch: 1,
  "desktop-touch": 2,
  "desktop": 3,
}

/**
 * Adds variants to specify input device type and applies `@media` query accordingly to the variant.
 */
const device = plugin(({matchVariant}) => {
  matchVariant(
    "device",

    value => {
      let variant = ""
      switch (value) {
        case values.desktop:
          variant = "(pointer: fine), (pointer: none)"
          break
        case values["desktop-touch"]:
          variant = "(pointer: fine) and (any-pointer: coarse)"
          break
        default:
          variant = "(pointer: coarse)"
      }

      return `@media ${variant}`
    },

    {
      values
    }
  )
})

module.exports = device
