import test from "ava"

import type {ZodTooSmallIssue, ZodInvalidTypeIssue} from "zod"
import {ELEMENT_PARAGRAPH} from "@udecode/plate"
import {ZodError} from "zod"

import {EditorData} from "./EditorData"
import type {TEditorData} from "./EditorData"

test("Parses valid editor data", async t => {
  const input: TEditorData = [{
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "On Soviet Moon landscape see binoculars through YOU."
    }]
  }]

  await t.notThrowsAsync(EditorData.parseAsync(input))
})

test("Fails to validate empty array", async t => {
  const error = await t.throwsAsync(EditorData.parseAsync([]), {
    instanceOf: ZodError
  })

  if (!error) {
    return t.fail()
  }

  const [{
    code,
    type,
    minimum,
    inclusive,
    message
  }] = error.issues as ZodTooSmallIssue[]

  t.is(code, "too_small")
  t.is(type, "array")
  t.is(minimum, 1)
  t.true(inclusive)
  t.is(message, "EditorData must be at least of one Node element")
})

test("Fails to validate empty paragraph", async t => {
  const error = await t.throwsAsync(
    EditorData.parseAsync([
      {
        type: ELEMENT_PARAGRAPH,
        children: [
          {
            text: ""
          }
        ]
      }
    ]),

    {
      instanceOf: ZodError
    }
  )

  if (!error) {
    return t.fail()
  }

  const [{
    code,
    expected,
    received,
    message
  }] = error.issues as ZodInvalidTypeIssue[]

  t.is(code, "invalid_type")
  t.is(expected, "array")
  t.is(received, "unknown")
  t.is(message, "EditorData must be at least of one non-empty paragraph")
})
