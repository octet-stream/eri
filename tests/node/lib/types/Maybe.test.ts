import {expectTypeOf, test} from "vitest"

import type {Maybe} from "../../../../app/lib/types/Maybe.ts"

test("creates nullish for given type parameter", () => {
  expectTypeOf<Maybe<unknown[]>>().toEqualTypeOf<unknown[] | null | undefined>()
})
