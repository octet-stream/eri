import {expectTypeOf, test} from "vitest"

import type {IsAny} from "../../../../app/lib/types/IsAny.js"

test("returns true for type 'any'", () => {
  expectTypeOf<IsAny<any>>().toEqualTypeOf<true>()
})

test("returns false for other types", () => {
  expectTypeOf<IsAny<never>>().toEqualTypeOf<false>()
  expectTypeOf<IsAny<unknown>>().toEqualTypeOf<false>()
  expectTypeOf<IsAny<any[]>>().toEqualTypeOf<false>()
  expectTypeOf<IsAny<unknown[]>>().toEqualTypeOf<false>()
  expectTypeOf<IsAny<never[]>>().toEqualTypeOf<false>()
})
