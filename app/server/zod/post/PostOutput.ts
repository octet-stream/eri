import type {z} from "zod"

import {getSchema} from "@tiptap/core"
import {Node} from "@tiptap/pm/model"

import {extensions} from "../../../components/post-editor/extensions.js"

import {AnyObject} from "../common/AnyObject.js"

import {PostBaseOutput} from "./PostBaseOutput.js"

const schema = getSchema(extensions)

export const PostOutput = PostBaseOutput.extend({
  content: AnyObject.transform(value => Node.fromJSON(schema, value))
})

export type IPostOutput = z.input<typeof PostOutput>

export type OPostOutput = z.output<typeof PostOutput>
