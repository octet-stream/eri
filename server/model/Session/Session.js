import {Model} from "sequelize"

import createModel from "server/lib/db/createModel"

import schema from "./schema"

@createModel(schema)
class Session extends Model {}

export default Session
