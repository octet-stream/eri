import type {input, output} from "zod"

import {Node} from "server/trpc/type/common/Node"

import {PostCreateInput} from "./PostCreateInput"

export const PostUpdateInput = PostCreateInput.partial().extend(Node.shape)

export type IPostUpdateInput = input<typeof PostUpdateInput>

export type OPostUpdateInput = output<typeof PostUpdateInput>
