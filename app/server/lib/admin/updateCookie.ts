import type {LoaderFunctionArgs, ActionFunctionArgs} from "react-router"

import type {AdminArgs} from "./AdminArgs.js"

export async function updateCookie<TResult>(
  event: AdminArgs<LoaderFunctionArgs | ActionFunctionArgs>,
  response: Response,
  fn: () => Promise<TResult>
): Promise<TResult> {
  try {
    return await fn()
  } finally {
    const cookie = response.headers.get("set-cookie")

    if (cookie) {
      event.context.resHeaders.set("set-cookie", cookie)
    }
  }
}
