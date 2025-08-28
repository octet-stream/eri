import {expectTypeOf, test} from "vitest"

import type {MaybeNull} from "../../../../app/lib/types/MaybeNull.ts"

test("creates nullable for given type parameter", () => {
  expectTypeOf<MaybeNull<number>>().toEqualTypeOf<number | null>()
})
