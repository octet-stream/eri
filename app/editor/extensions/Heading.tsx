/** @jsxImportSource @tiptap/core */

// Based on https://github.com/ueberdosis/tiptap/blob/4f498944b507d03da967c5d6462f72d02422fcb4/packages/extension-heading/src/heading.ts

import {mergeAttributes} from "@tiptap/core"
import {Heading as HeadingBase} from "@tiptap/extension-heading"

import {headingVariants} from "../../components/common/Heading.tsx"
import {cn} from "../../lib/utils/cn.ts"

export type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6

export const Heading = HeadingBase.extend({
  renderHTML({node, HTMLAttributes}) {
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level: HeadingLevels = hasLevel
      ? node.attrs.level
      : this.options.levels[0]

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
