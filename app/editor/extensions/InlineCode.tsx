/** @jsxImportSource @tiptap/core */

import {mergeAttributes} from "@tiptap/core"
import {Code} from "@tiptap/extension-code"

import {codeVariants} from "../../components/common/Code.jsx"
import {cn} from "../../lib/utils/cn.js"

export const InlineCode = Code.extend({
  renderHTML({HTMLAttributes}) {
    return (
      <code
        {...mergeAttributes(HTMLAttributes, {
          class: cn(codeVariants(), HTMLAttributes.class)
        })}
      >
        <slot />
      </code>
    )
  }
})
