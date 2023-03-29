const plugin = require("tailwindcss/plugin")
const postcss = require("postcss")

/**
 * @typedef {[name: string, params: string][]} Variants
 */

/**
 * @type {Variants}
 */
const variants = [
  ["touch", "(pointer: coarse)"],
  ["desktop-touch", "(pointer: fine) and (any-pointer: coarse)"],
  ["desktop", "(pointer: fine)"],
  ["desktop-any", "(pointer: fine), (pointer: fine) and (any-pointer: coarse)"]
]

/**
 * Adds variants to specify input device type and applies `@media` query accordingly to the variant.
 */
const device = plugin(({addVariant}) => {
  variants.forEach(([name, params]) => addVariant(
    `device-${name}`,

    postcss.atRule({name: "media", params}).toString()
  ))
})

module.exports = device
