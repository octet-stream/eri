import type {GetStaticPaths} from "next"

/**
 * Returns empty paths for `getStaticPaths` function allowing to skip pre-generation for pages with dynamic route.
 */
const getEmptyPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking"
})

export default getEmptyPaths
