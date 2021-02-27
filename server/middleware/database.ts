import {IncomingMessage, ServerResponse} from "http"

import connect from "server/lib/db/connection"

async function database(req: IncomingMessage, res: ServerResponse, next: Function) {
  await connect()

  return next()
}

export default database
