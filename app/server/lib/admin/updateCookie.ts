import type {ActionFunctionArgs, LoaderFunctionArgs} from "react-router"

import type {AdminArgs} from "./AdminArgs.js"

export async function updateCookie<TResult>(
  event: LoaderFunctionArgs | ActionFunctionArgs,
  response: Response,
  fn: () => Promise<TResult>
): Promise<TResult> {
  try {
    return await fn()
  } finally {
    const cookie = response.headers.get("set-cookie")

    if (cookie) {
      const {resHeaders} = event.context as AdminArgs<
        ActionFunctionArgs | LoaderFunctionArgs
      >["context"]

      resHeaders.set("set-cookie", cookie)
    }
  }
}
