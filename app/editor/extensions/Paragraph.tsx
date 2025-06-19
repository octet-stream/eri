/** @jsxImportSource @tiptap/core */

import {mergeAttributes} from "@tiptap/core"
import {Paragraph as ParagraphBase} from "@tiptap/extension-paragraph"

import {paragraphVariants} from "../../components/common/Paragraph.jsx"

export const Paragraph = ParagraphBase.extend({
  renderHTML({HTMLAttributes}) {
    return (
      <p
        {...mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: paragraphVariants()
        })}
      >
        <slot />
      </p>
    )
  }
})
