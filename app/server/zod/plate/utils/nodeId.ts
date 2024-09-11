import {nanoid} from "nanoid"

export const NODE_ID_SIZE = 5

export const NODE_ID_EXPR = new RegExp(`^[a-zA-Z0-9-_]{${NODE_ID_SIZE}}$`)

export const createNodeId = () => nanoid(NODE_ID_SIZE)

export const isNodeId = (value: unknown): value is string =>
  typeof value === "string" && NODE_ID_EXPR.test(value)
