import nc from "next-connect"

import session from "server/middleware/session"

export const config = {
  api: {
    externalResolver: true
  }
}

const handler = nc()
  .use(session)
  .use((req, res) => {
    res.send(JSON.stringify({message: "OK"}))
  })

export default handler
