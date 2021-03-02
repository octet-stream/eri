import {IncomingMessage, ServerResponse} from "http"
import {Session} from "express-session"

export interface ApiContextRequest extends IncomingMessage {
  sessionId: string
  session: Session & {
    userId: number
  }
}

export interface ApiContext {
  req: ApiContextRequest
  res: ServerResponse
}

export default ApiContext
