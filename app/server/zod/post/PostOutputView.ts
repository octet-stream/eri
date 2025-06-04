import type {z} from "zod"

import {Fragment} from "@tiptap/pm/model"
import {renderToHTMLString} from "@tiptap/static-renderer"

import {extensions} from "../../../components/tiptap/extensions.js"

import {PostOutput} from "./PostOutput.js"

export const PostOutputView = PostOutput.transform(({content, ...post}) => {
  return {
    ...post,

    // TODO: This can backfire badly if ProseMirror or tiptap will do validation here :D
    // TODO: I need to loosen schema for this output, I think
    content: renderToHTMLString({
      extensions,
      content: content
        .copy(Fragment.fromArray(content.children.slice(1))) // Strip post title node from the view
        .toJSON()
    })
  }
})

export type IPostOutputView = z.input<typeof PostOutputView>

export type OPostOutput = z.output<typeof PostOutputView>
