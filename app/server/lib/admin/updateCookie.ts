import type {AdminArgs} from "./AdminArgs.js"

import {serverContext} from "../../contexts/server.js"
import type {ActionArgs} from "../types/Action.js"
import type {LoaderArgs} from "../types/Loader.js"

export async function updateCookie<TResult>(
  args: LoaderArgs | ActionArgs,
  response: Response,
  fn: () => Promise<TResult>
): Promise<TResult> {
  try {
    return await fn()
  } finally {
    const cookie = response.headers.get("set-cookie")

    if (cookie) {
      const {resHeaders} = args.context.get(serverContext)

      resHeaders.set("set-cookie", cookie)
    }
  }
}
