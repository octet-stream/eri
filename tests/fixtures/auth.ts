import {createAuth} from "#app/server/lib/auth/auth.ts"

import {ormTest} from "./orm.ts"

export const authTest = ormTest.extend("auth", ({orm}) => createAuth(orm))
