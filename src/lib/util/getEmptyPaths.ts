import type {GetStaticPaths} from "next"

const getEmptyPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking"
})

export default getEmptyPaths
