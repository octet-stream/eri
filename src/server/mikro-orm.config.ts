// eslint-disable-next-line import/no-extraneous-dependencies
import * as env from "@next/env"

env.loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production")

export default import("./lib/db").then(({getConfig}) => getConfig())
