import type {z} from "zod"

import {Node} from "server/trpc/type/common/Node"

import {PostCreateInput} from "./PostCreateInput"

export const PostUpdateInput = PostCreateInput.partial().extend(Node.shape)

export type IPostUpdateInput = z.input<typeof PostUpdateInput>

export type OPostUpdateInput = z.output<typeof PostUpdateInput>
