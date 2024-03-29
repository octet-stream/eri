import {z} from "zod"

import {createEditorType} from "../utils/createEditorType.js"

import {PostContentEditorDescendant} from "./PostContentEditorDescendant.js"

export const PostContentEditor = createEditorType(
  PostContentEditorDescendant
)

export type IPostContentEditor = z.input<typeof PostContentEditor>

export type OPostContentEditor = z.output<typeof PostContentEditor>
