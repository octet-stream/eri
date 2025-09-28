/** @jsxImportSource @tiptap/core */

import {mergeAttributes} from "@tiptap/core"
import {Blockquote as BlockquoteBase} from "@tiptap/extension-blockquote"

import {blockquoteVariants} from "../../components/common/Blockquote.tsx"
import {cn} from "../../lib/utils/cn.ts"

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
