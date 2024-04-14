import {serve} from "@hono/node-server"

import {hono} from "./hono.js"

serve(
  {
    fetch: hono.fetch,
    port: parseInt(process.env.PORT || "", 10) ?? 3000
  },

  info => console.log("Listening on http://localhost:%s", info.port)
)
