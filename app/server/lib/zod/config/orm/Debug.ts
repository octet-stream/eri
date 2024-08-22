import {NodeEnv} from "../../common/NodeEnv.js"

export const Debug = NodeEnv.transform(env => env === "development")
