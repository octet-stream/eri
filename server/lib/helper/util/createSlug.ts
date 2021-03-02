import create from "@sindresorhus/slugify"

/**
 * @param string String to slugify
 */
const createSlug = (string: string) => create(string, {
  customReplacements: [
    [":", " colon "],
    [",", " comma "],
    [".", " period "],
    ["@", " at "]
  ]
})

export default createSlug
