import type {ActionFunctionArgs} from "@remix-run/node"
import type {Action} from "../types/Action.js"

// TODO: Replace this with middlewares, once they arrive
// ! Hope this one will not break, because I'm not fure if Remix's compiler relies on defineAction function or route exports to extract actions
export const defineAdminAction =
  <TResult>(action: Action<TResult>) =>
  async (event: ActionFunctionArgs): Promise<TResult> => {
    if (!event.context.auth.isAuthenticated()) {
      throw new Response(null, {
        status: 403
      })
    }

    return action(event)
  }
