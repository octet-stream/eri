/** @jsxImportSource @tiptap/core */

// Based on https://github.com/ueberdosis/tiptap/blob/4f498944b507d03da967c5d6462f72d02422fcb4/packages/extension-heading/src/heading.ts

import {mergeAttributes} from "@tiptap/core"
import {Heading as HeadingBase} from "@tiptap/extension-heading"

import {cn} from "../../../lib/utils/cn.ts"
import {headingVariants} from "../../common/Heading.tsx"

type Levels = 1 | 2 | 3 | 4

export const Heading = HeadingBase.configure({
  levels: [1, 2, 3, 4]
}).extend({
  renderHTML({node, HTMLAttributes}) {
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level: Levels = hasLevel ? node.attrs.level : this.options.levels[0]

    const Element = `h${level}` as const
    const variant = headingVariants({variant: Element})

    return (
      <Element
        {...mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: cn(variant, HTMLAttributes.class)
        })}
      >
        <slot />
      </Element>
    )
  }
})
