import session from "server/middleware/session"

/**
 * @param {import("next").GetServerSidePropsContext} ctx
 *
 * @return {Promise<Object.<string, any>>}
 */
const applySession = ({req, res}) => new Promise((resolve, reject) => {
  session(req, res, error => {
    if (error) {
      return reject(error)
    }

    resolve(req.session)
  })
})

export default applySession
