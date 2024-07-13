import {serve} from "@hono/node-server"

import {hono} from "./hono.js"

serve(
  {
    fetch: hono.fetch,
    port: Number.parseInt(process.env.PORT || "", 10) || 3000
  },

  ({port}) => console.log("Listening on http://localhost:%s", port)
)
