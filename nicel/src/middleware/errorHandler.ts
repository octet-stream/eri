import {NextApiRequest, NextApiResponse} from "next"

function errorHandler(error: Error, req: NextApiRequest, res: NextApiResponse) {
  console.error(error)

  // @ts-ignore
  res.status(error.status || 500)
  res.send(error.message ?? "Internal Server Error")
}

export default errorHandler
