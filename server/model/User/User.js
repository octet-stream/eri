import {Model} from "sequelize"

import createModel from "lib/db/createModel"

import schema from "./schema"

@createModel(schema, {paranoid: true})
class User extends Model {}

export default User
