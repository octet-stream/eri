import type {z} from "zod"

import {createEditorType} from "../utils/createEditorType.js"

import {PostContent} from "./PostContent.js"

export const PostContentEditor = createEditorType(PostContent)

export type IPostContentEditor = z.input<typeof PostContentEditor>

export type OPostContentEditor = z.output<typeof PostContentEditor>
