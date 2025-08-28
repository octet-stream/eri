/** @jsxImportSource @tiptap/core */

import {mergeAttributes} from "@tiptap/core"
import {Blockquote as BlockquoteBase} from "@tiptap/extension-blockquote"

import {cn} from "../../../lib/utils/cn.ts"
import {blockquoteVariants} from "../../common/Blockquote.tsx"

export const Blockquote = BlockquoteBase.extend({
  renderHTML({HTMLAttributes}) {
    return (
      <blockquote
        {...mergeAttributes(HTMLAttributes, {
          class: cn(blockquoteVariants(), HTMLAttributes.class)
        })}
      >
        <slot />
      </blockquote>
    )
  }
})
