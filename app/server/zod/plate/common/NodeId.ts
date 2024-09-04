import {z} from "zod"

import {NODE_ID_EXPR, NODE_ID_SIZE} from "../utils/nodeId.js"

export const NodeId = z.string().length(NODE_ID_SIZE).regex(NODE_ID_EXPR)
