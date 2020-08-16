import {Model} from "sequelize"

import createModel from "server/lib/db/createModel"

import schema from "./schema"

@createModel(schema)
class PostTag extends Model {}

export default PostTag
