import test from "ava"

import {render} from "@testing-library/react"
import {
  ELEMENT_PARAGRAPH,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_LINK
} from "@udecode/plate"

import {TEditorData} from "server/trpc/type/common/EditorData"

import {transformNodes} from "./transformNodes"

test("Transforms simple paragraph with text (w/ default transform)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: "Hello, World!"
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [actual] = container.childNodes

  t.true(actual instanceof HTMLParagraphElement)
  t.true(actual.firstChild instanceof HTMLSpanElement)
  t.is(actual.textContent, "Hello, World!")
})

test("Transforms h2 heading (w/ default transform)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_H2,
      children: [
        {
          text: "Heading H2"
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [actual] = container.childNodes

  t.true(actual instanceof HTMLHeadingElement)
  t.is(actual.nodeName, "H2")

  t.true(actual.firstChild instanceof HTMLSpanElement)
  t.is(actual.textContent, "Heading H2")
})

test("Transforms h3 heading (w/ default transform)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_H3,
      children: [
        {
          text: "Heading H3"
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [actual] = container.childNodes

  t.true(actual instanceof HTMLHeadingElement)
  t.is(actual.nodeName, "H3")

  t.true(actual.firstChild instanceof HTMLSpanElement)
  t.is(actual.textContent, "Heading H3")
})

test("Transforms h4 heading (w/ default transform)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_H4,
      children: [
        {
          text: "Heading H4"
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [actual] = container.childNodes as NodeListOf<HTMLHeadingElement>

  t.true(actual instanceof HTMLHeadingElement)
  t.is(actual.nodeName, "H4")

  t.true(actual.firstChild instanceof HTMLSpanElement)
  t.is(actual.textContent, "Heading H4")
})

test("Transforms link (w/ default transform)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          type: ELEMENT_LINK,
          url: "https://example.com",
          children: [
            {
              text: "Some link"
            }
          ]
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [p] = container.childNodes as NodeListOf<HTMLParagraphElement>
  const [actual] = p.childNodes as NodeListOf<HTMLAnchorElement>

  t.true(actual instanceof HTMLAnchorElement)
  t.true(actual.firstChild instanceof HTMLSpanElement)
  t.is(actual.textContent, "Some link")
  t.is(actual.href, "https://example.com/")
  t.is(actual.rel, "noopener noreferrer")
  t.is(actual.target, "_blank")
})

test("Default text transform applies bold text mark", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: "Bold text",
          bold: true
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [p] = container.childNodes as NodeListOf<HTMLParagraphElement>
  const [span] = p.childNodes as NodeListOf<HTMLSpanElement>
  const [actual] = span.childNodes as NodeListOf<HTMLElement>

  t.true(span instanceof HTMLSpanElement)
  t.is(actual.nodeName, "STRONG")
})

test("Default text transform applies italic text mark", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: "Bold text",
          italic: true
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [p] = container.childNodes as NodeListOf<HTMLParagraphElement>
  const [span] = p.childNodes as NodeListOf<HTMLSpanElement>
  const [actual] = span.childNodes as NodeListOf<HTMLElement>

  t.true(span instanceof HTMLSpanElement)
  t.is(actual.nodeName, "I")
})

test("Default text transform applies underlined text mark", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: "Bold text",
          underline: true
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [p] = container.childNodes as NodeListOf<HTMLParagraphElement>
  const [span] = p.childNodes as NodeListOf<HTMLSpanElement>
  const [actual] = span.childNodes as NodeListOf<HTMLElement>

  t.true(span instanceof HTMLSpanElement)
  t.is(actual.nodeName, "U")
})

test("Default text transform applies strikethrough text mark", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: "Bold text",
          strikethrough: true
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [p] = container.childNodes as NodeListOf<HTMLParagraphElement>
  const [span] = p.childNodes as NodeListOf<HTMLSpanElement>
  const [actual] = span.childNodes as NodeListOf<HTMLElement>

  t.true(span instanceof HTMLSpanElement)
  t.is(actual.nodeName, "S")
})

test("Default text transform applies superscript text mark", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: "Bold text",
          superscript: true
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [p] = container.childNodes as NodeListOf<HTMLParagraphElement>
  const [span] = p.childNodes as NodeListOf<HTMLSpanElement>
  const [actual] = span.childNodes as NodeListOf<HTMLElement>

  t.true(span instanceof HTMLSpanElement)
  t.is(actual.nodeName, "SUP")
})

test("Default text transform applies subscript text mark", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: "Bold text",
          subscript: true
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [p] = container.childNodes as NodeListOf<HTMLParagraphElement>
  const [span] = p.childNodes as NodeListOf<HTMLSpanElement>
  const [actual] = span.childNodes as NodeListOf<HTMLElement>

  t.true(span instanceof HTMLSpanElement)
  t.is(actual.nodeName, "SUB")
})

test("Default transform applies alignment to paragraph (left)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      align: "left",
      children: [
        {
          text: "Some text",
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [p] = container.childNodes as NodeListOf<HTMLParagraphElement>

  t.is(p.style.textAlign, "left")
})

test("Default transform applies alignment to paragraph (right)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      align: "right",
      children: [
        {
          text: "Some text",
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [p] = container.childNodes as NodeListOf<HTMLParagraphElement>

  t.is(p.style.textAlign, "right")
})

test("Default transform applies alignment to paragraph (center)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      align: "center",
      children: [
        {
          text: "Some text",
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [p] = container.childNodes as NodeListOf<HTMLParagraphElement>

  t.is(p.style.textAlign, "center")
})

test("Default transform applies alignment to paragraph (justify)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_PARAGRAPH,
      align: "justify",
      children: [
        {
          text: "Some text",
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [p] = container.childNodes as NodeListOf<HTMLParagraphElement>

  t.is(p.style.textAlign, "justify")
})

test("Default transform applies alignment to heading (left)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_H2,
      align: "left",
      children: [
        {
          text: "Some text",
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [h2] = container.childNodes as NodeListOf<HTMLHeadingElement>

  t.is(h2.style.textAlign, "left")
})

test("Default transform applies alignment to heading (right)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_H2,
      align: "right",
      children: [
        {
          text: "Some text",
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [h2] = container.childNodes as NodeListOf<HTMLHeadingElement>

  t.is(h2.style.textAlign, "right")
})

test("Default transform applies alignment to heading (center)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_H2,
      align: "center",
      children: [
        {
          text: "Some text",
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [h2] = container.childNodes as NodeListOf<HTMLHeadingElement>

  t.is(h2.style.textAlign, "center")
})

test("Default transform applies alignment to heading (justify)", t => {
  const [node] = transformNodes([
    {
      type: ELEMENT_H2,
      align: "justify",
      children: [
        {
          text: "Some text",
        }
      ]
    }
  ] as TEditorData)

  const {container} = render(node)
  const [h2] = container.childNodes as NodeListOf<HTMLHeadingElement>

  t.is(h2.style.textAlign, "justify")
})
