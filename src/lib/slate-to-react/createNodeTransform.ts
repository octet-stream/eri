import type {
  Transform,
  Node,
  GetNodeType,
  NodeTransform
} from "./types"

/**
 * Create transform function for given Slate Node type.
 *
 * @param type Node transform type
 * @param transform A function that transfroms node to React Element
 */
export const createNodeTransform = <N extends Node>(
  type: GetNodeType<N>,
  transform: NodeTransform<N>
): Transform<N> => [type, transform]
