import isFunction from "lodash/isFunction"

import sequelize from "./connection"

const defaults = {
  underscored: true
}

/**
 * Creates a new model using given schema and options.
 * Implies a Model.init call to simplify models declaration.
 * Also, enhances default options
 *
 * @param {import("sequelize").ModelAttributes | Function} schema
 * @param {import("sequelize").InitOptions} options
 *
 * @return {(model: Function) => Function} Target
 */
const createModel = (schema, options = {}) => Target => (
  Target.init(isFunction(schema) ? schema(Target) : schema, {
    ...defaults,
    ...options,

    hooks: isFunction(options.hooks)
      ? options.hooks(Target, options)
      : options.hooks,

    sequelize: options.sequelize ?? sequelize,
    tableName: options.tableName ?? Target.tableName
  })
)

export default createModel
