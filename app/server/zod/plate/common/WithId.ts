import {z} from "zod"

import {createNodeId} from "../utils/nodeId.js"
import {ID} from "../../common/ID.js"

import {NodeId} from "./NodeId.js"

export const WithId = z.object({
  id: z.union([
    NodeId.default(createNodeId),
    ID.default(() => crypto.randomUUID()) // For backward compatibility
  ])
})

export type IWithId = z.input<typeof WithId>

export type OWithId = z.output<typeof WithId>
