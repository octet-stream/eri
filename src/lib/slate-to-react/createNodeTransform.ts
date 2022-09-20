import type {Transform, TextTransform, NodeTransform} from "./types"

/**
 * Create transform function for given Slate Node type.
 *
 * @param type
 * @param transform
 * @returns
 */
export const createNodeTransform = <T extends string>(
  type: T,
  transform: T extends "text" ? TextTransform : NodeTransform<T>
): Transform<T> => [type, transform]
