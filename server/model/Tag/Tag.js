import {Model} from "sequelize"

import createModel from "server/lib/db/createModel"

import schema from "./schema"

@createModel(schema, {paranoid: true})
class Tag extends Model {}

export default Tag
