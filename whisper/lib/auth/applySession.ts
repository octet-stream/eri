import {IncomingMessage, ServerResponse} from "http"

import session from "server/middleware/session"

const applySession = <
  T extends {req: IncomingMessage, res: ServerResponse}
>({req, res}: T) => new Promise((resolve, reject) => {
  session(req, res, (error: Error) => {
    if (error) {
      return reject(error)
    }

    // @ts-ignore
    resolve(req.session)
  })
})

export default applySession
