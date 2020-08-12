import {Model} from "sequelize"

import createModel from "lib/db/createModel"

import schema from "./schema"

@createModel(schema, {paranoid: true})
class Post extends Model {}

export default Post
