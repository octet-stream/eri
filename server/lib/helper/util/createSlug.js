import slugify from "@sindresorhus/slugify"
import partial from "lodash/partial"

const createSlug = partial(slugify, partial.placeholder, {
  customReplacements: [
    [":", " colon "],
    [",", " comma "],
    [".", " period "],
    ["@", " at "]
  ]
})

export default createSlug
