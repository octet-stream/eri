import {test} from "vitest"

import config from "#app/server/lib/config.ts"

export const baseTest = test.extend("config", {scope: "file"}, config)

export {baseTest as test}
