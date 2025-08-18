/** @jsxImportSource @tiptap/core */

import {mergeAttributes, Node} from "@tiptap/core"

import {cn} from "../../../lib/utils/cn.js"
import {headingVariants} from "../../common/Heading.jsx"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    title: {
      /**
       * Toggle a title node
       *
       * @example editor.commands.toggleTitle()
       */
      toggleTitle: () => ReturnType
    }
  }
}

export const PostTitle = Node.create({
  name: "title",
  content: "inline*",
  group: "block",
  defining: true,

  parseHTML() {
    return [
      {
        tag: "h1"
      }
    ]
  },

  renderHTML({HTMLAttributes}) {
    return (
      <h1
        {...mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: cn(headingVariants({variant: "h1"}), HTMLAttributes.class)
        })}
      >
        <slot />
      </h1>
    )
  },

  addCommands() {
    return {
      toggleTitle:
        () =>
        ({commands}) =>
          commands.toggleNode(this.name, "paragraph")
    }
  }
})
