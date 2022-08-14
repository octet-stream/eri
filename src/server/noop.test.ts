import test from "ava"

import {withORM} from "server/__macro__/withORM"
import {setup, cleanup} from "server/__helper__/database"

test.before(setup)

test("Noop test", withORM, async t => {
  t.pass()
})

test.after.always(cleanup)
