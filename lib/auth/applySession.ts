import session from "server/middleware/session"

const applySession = <T>({req, res}: T) => new Promise((resolve, reject) => {
  session(req, res, error => {
    if (error) {
      return reject(error)
    }

    resolve(req.session)
  })
})

export default applySession
