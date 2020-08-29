import create from "lib/helper/decorator/createDecorator"

/**
 * @typedef {import("koa")} Koa
 */

/**
 * Applies resolvver's params as a single object for better experience
 *
 * @param {any} [parent = undefined]
 * @param {Object<string, any>} args
 * @param {Koa.Context} ctx
 * @param {Object<string, any>} node
 *
 * @return {(params: Object<string, any>) => any}
 */
const normalizeParams = create(fn => (parent, args, ctx, node) => fn({
  parent, args, ctx, node, root: parent, context: ctx, ast: node
}))

export default normalizeParams
