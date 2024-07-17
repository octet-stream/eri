import "../../env.js"

// ! Config is imported asynchronously because of how Vite bundles dependencies (it breaks the order). Maybe I'll find a better solution
export default import("./base.js").then(({default: config}) => config)
