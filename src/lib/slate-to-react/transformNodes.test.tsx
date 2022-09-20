import test from "ava"

import {render} from "@testing-library/react"
import {ELEMENT_PARAGRAPH} from "@udecode/plate"

import {transformNodes} from "./transformNodes"

test("Transforms simple paragraph with text", async t => {
  const [paragraph] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: "Hello, World!"
        }
      ]
    }
  ])

  const {container} = render(paragraph)

  t.is(container.innerHTML, "<p class=\"m-0 py-1\"><span>Hello, World!</span></p>")
})
