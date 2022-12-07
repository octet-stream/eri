import auth from "server/trpc/middleware/auth"

import procedure from "./server"

const authorized = procedure.use(auth)

export default authorized
