import {createTrpcRequestHandlerFactory} from "./utils/createTrpcRequestHandlerFactory.js"
import {router} from "./router.js"

export const withTrpc = createTrpcRequestHandlerFactory({router})
