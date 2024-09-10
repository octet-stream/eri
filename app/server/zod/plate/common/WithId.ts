import {z} from "zod"

import {validate} from "uuid"

import {createNodeId} from "../utils/nodeId.js"

import {NodeId} from "./NodeId.js"

export const WithId = z.object({
  id: NodeId.optional().transform(id => {
    if (!id || validate(id)) {
      return createNodeId()
    }

    return id
  })
})

export type IWithId = z.input<typeof WithId>

export type OWithId = z.output<typeof WithId>
