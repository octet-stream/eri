import type {ActionFunctionArgs} from "react-router"
import type {Action} from "../types/Action.js"

// TODO: Replace this with middlewares, once they arrive
// ! Hope this one will not break, because I'm not fure if Remix's compiler relies on defineAction function or route exports to extract actions
export const defineAdminAction =
  <TResult, TEvent extends ActionFunctionArgs>(
    action: Action<TResult, TEvent>
  ) =>
  async (event: TEvent): Promise<TResult> => {
    if (!event.context.auth.isAuthenticated()) {
      throw new Response(null, {
        status: 403
      })
    }

    return action(event)
  }
