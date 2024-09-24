import type {z} from "zod"

import {toHtml} from "../../lib/plate/toHtml.js"
import {createPostContentEditor} from "../../../components/post-editor/editor.js"

import {PostOutputBase} from "./PostOutputBase.js"

export const PostOutputView = PostOutputBase.transform(
  ({content, ...post}) => ({
    ...post,

    content: toHtml(createPostContentEditor({value: content}))
  })
)

export type IPostOutputView = z.input<typeof PostOutputView>

export type OPostOutputBase = z.output<typeof PostOutputView>
