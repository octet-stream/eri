import {NodeEnv} from "../../common/NodeEnv.ts"

export const Debug = NodeEnv.transform(env => env === "development")
