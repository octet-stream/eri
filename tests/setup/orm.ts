import {afterAll, beforeAll, beforeEach} from "vitest"

import {orm} from "../../app/server/lib/db/orm.js"

beforeAll(async () => {
  orm.config.set("allowGlobalContext", true)
  await orm.connect()
})

afterAll(async () => {
  await orm.getSchemaGenerator().dropDatabase()
  await orm.close()
})

beforeEach(async () => {
  await orm.getSchemaGenerator().refreshDatabase()
})
