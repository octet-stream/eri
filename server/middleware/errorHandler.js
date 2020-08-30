/**
 * @param {Error} error
 * @param {import("http").IncomingMessage} req
 * @param {import("http").OutgoingMessage} res
 */
function errorHandler(error, req, res) {
  console.error(error)

  res.status(error.status ?? 500)
  res.send(error.message ?? "Internal Server Error")
}

export default errorHandler
