import {randomUUID} from "node:crypto"

import test from "ava"

import type {ZodInvalidStringIssue} from "zod"
import {ZodError} from "zod"

import {ID} from "./ID"

test("Validates correct UUIDv4", async t => {
  const expected = randomUUID()

  const actual = await ID.parseAsync(expected)

  t.is(actual, expected)
})

test("Fails to validate invalid UUID", async t => {
  const error = await t.throwsAsync(ID.parseAsync("invalid-uuid-string"), {
    instanceOf: ZodError
  })

  if (!error) {
    return t.fail()
  }

  const [{code, message, validation}] = error.issues as ZodInvalidStringIssue[]

  t.is(code, "invalid_string")
  t.is(message, "Invalid uuid")
  t.is(validation, "uuid")
})
