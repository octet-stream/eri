import {IncomingMessage, ServerResponse} from "http"

import applySession from "./applySession"

const isAuthenticated = <
  T extends {req: IncomingMessage, res: ServerResponse}
>(ctx: T) => (
  applySession<T>(ctx).then(({user, cookie}) => (
    Boolean(user && user.id && cookie)
  ))
)

export default isAuthenticated
