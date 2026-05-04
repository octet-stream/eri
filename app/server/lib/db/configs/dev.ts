import "../../env.js"

// ! Config is imported asynchronously because of how Vite bundles dependencies (it breaks the order). Maybe I'll find a better solution
export default import("#app/server/lib/db/configs/libsql.ts").then(
  ({createLibsqlConfig}) => createLibsqlConfig({})
)
