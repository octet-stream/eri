/** @jsxImportSource @tiptap/core */

import {mergeAttributes} from "@tiptap/core"
import {Blockquote as BlockquoteBase} from "@tiptap/extension-blockquote"

import {cn} from "../../../lib/utils/cn.js"
import {blockquoteVariants} from "../../common/Blockquote.jsx"

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
