import {expectTypeOf, test} from "vitest"

import type {MaybeUndefined} from "../../../../app/lib/types/MaybeUndefined.ts"

test("return T | undefined union for given type parameter", () => {
  expectTypeOf<MaybeUndefined<string>>().toEqualTypeOf<string | undefined>()
})
