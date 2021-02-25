import {NextApiRequest, NextApiResponse} from "next"
import {Session} from "express-session"

interface ApiContextRequest extends NextApiRequest {
  sessionId: string
  session: Session & {
    userId: number
  }
}

interface ApiContext {
  req: ApiContextRequest
  res: NextApiResponse
}

export default ApiContext
