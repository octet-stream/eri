import {getSchema} from "@tiptap/core"
import {Node} from "@tiptap/pm/model"
import type {z} from "zod"

import {extensions} from "../../../components/post-editor/extensions.ts"

import {AnyObject} from "../common/AnyObject.ts"

import {PostBaseOutput} from "./PostBaseOutput.ts"

const schema = getSchema(extensions)

export const PostOutput = PostBaseOutput.extend({
  content: AnyObject.transform(value => Node.fromJSON(schema, value))
})

export type IPostOutput = z.input<typeof PostOutput>

export type OPostOutput = z.output<typeof PostOutput>
