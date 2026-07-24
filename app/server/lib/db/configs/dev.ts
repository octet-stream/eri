import {createLibsqlConfig} from "./libsql.ts"

// ! Config is imported asynchronously because of how Vite bundles dependencies (it breaks the order). Maybe I'll find a better solution
export default import("#app/server/lib/config.ts").then(({default: config}) =>
  createLibsqlConfig(config.orm)
)
