import {Model} from "sequelize"

import createModel from "server/lib/db/createModel"

import schema from "./schema"

@createModel(schema, {timestamps: false})
class PostsTags extends Model {}

export default PostsTags
