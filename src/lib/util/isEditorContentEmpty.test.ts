import test from "ava"

import {ELEMENT_PARAGRAPH} from "@udecode/plate"

import {isEditorContentEmpty} from "./isEditorContentEmpty"

test("Returns true for empty array", t => {
  t.true(isEditorContentEmpty([]))
})

test("Returns true for content with just one empty paragraph", t => {
  t.true(isEditorContentEmpty([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: ""
        }
      ]
    }
  ]))
})

test("Returns true if every node is empty paragraph", t => {
  t.true(isEditorContentEmpty([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: ""
        }
      ]
    },
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: ""
        }
      ]
    },
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: ""
        }
      ]
    }
  ]))
})

test("Returns false for non-empty content", t => {
  t.false(isEditorContentEmpty([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: "Some text"
        }
      ]
    }
  ]))
})
