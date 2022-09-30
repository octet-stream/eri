import test from "ava"

import {render} from "@testing-library/react"
import {
  ELEMENT_PARAGRAPH,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_LINK
} from "@udecode/plate"

import {transformNodes} from "./transformNodes"

test("Transforms simple paragraph with text (w/ default transform)", t => {
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
  const [actual] = container.childNodes

  t.true(actual instanceof HTMLParagraphElement)
  t.true(actual.firstChild instanceof HTMLSpanElement)
  t.is(actual.textContent, "Hello, World!")
})

test("Transforms h2 heading (w/ default transform)", t => {
  const [h2] = transformNodes([
    {
      type: ELEMENT_H2,
      children: [
        {
          text: "Heading H2"
        }
      ]
    }
  ])

  const {container} = render(h2)
  const [actual] = container.childNodes

  t.true(actual instanceof HTMLHeadingElement)
  t.is(actual.nodeName, "H2")

  t.true(actual.firstChild instanceof HTMLSpanElement)
  t.is(actual.textContent, "Heading H2")
})

test("Transforms h3 heading (w/ default transform)", t => {
  const [h3] = transformNodes([
    {
      type: ELEMENT_H3,
      children: [
        {
          text: "Heading H3"
        }
      ]
    }
  ])

  const {container} = render(h3)
  const [actual] = container.childNodes

  t.true(actual instanceof HTMLHeadingElement)
  t.is(actual.nodeName, "H3")

  t.true(actual.firstChild instanceof HTMLSpanElement)
  t.is(actual.textContent, "Heading H3")
})

test("Transforms h4 heading (w/ default transform)", t => {
  const [h4] = transformNodes([
    {
      type: ELEMENT_H4,
      children: [
        {
          text: "Heading H4"
        }
      ]
    }
  ])

  const {container} = render(h4)
  const [actual] = container.childNodes as NodeListOf<HTMLHeadingElement>

  t.true(actual instanceof HTMLHeadingElement)
  t.is(actual.nodeName, "H4")

  t.true(actual.firstChild instanceof HTMLSpanElement)
  t.is(actual.textContent, "Heading H4")
})

test("Transforms link (w/ default transform)", t => {
  const [link] = transformNodes([
    {
      type: ELEMENT_LINK,
      url: "https://example.com",
      children: [
        {
          text: "Some link"
        }
      ]
    }
  ])

  const {container} = render(link)
  const [actual] = container.childNodes as NodeListOf<HTMLAnchorElement>

  t.true(actual instanceof HTMLAnchorElement)
  t.true(actual.firstChild instanceof HTMLSpanElement)
  t.is(actual.textContent, "Some link")
  t.is(actual.href, "https://example.com/")
  t.is(actual.rel, "noopener noreferrer")
  t.is(actual.target, "_blank")
})
