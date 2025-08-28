/** @jsxImportSource @tiptap/core */

import {mergeAttributes} from "@tiptap/core"
import {Code} from "@tiptap/extension-code"

import {cn} from "../../../lib/utils/cn.ts"
import {codeVariants} from "../../common/Code.tsx"

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
