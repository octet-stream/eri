import {renderToHTMLString} from "@tiptap/static-renderer"
import type {z} from "zod"

import {extensions} from "#app/components/post-editor/extensions.ts"
import {getPostContent} from "#app/server/lib/editor/utils.ts"

import {PostOutput} from "./PostOutput.ts"

export const PostViewOutput = PostOutput.transform(({content, ...post}) => {
  return {
    ...post,

    content: renderToHTMLString({
      extensions,
      content: getPostContent(content).toJSON() // Strip post title node from the view
    })
  }
})

export type IPostViewOutput = z.input<typeof PostViewOutput>

export type OPostOutput = z.output<typeof PostViewOutput>
