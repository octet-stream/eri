import type {unstable_Action as Action} from "@remix-run/server-runtime"
import {unstable_defineAction as defineAction} from "@remix-run/node"

// TODO: Replace this with middlewares, once they arrive
// ! Hope this one will not break, because I'm not fure if Remix's compiler relies on defineAction function or route exports to extract actions
export const defineAdminAction = <T extends Action>(action: T) =>
  // @ts-ignore I'll fix that later
  defineAction<T>(async event => {
    if (!event.context.auth.isAuthenticated()) {
      throw new Response(null, {
        status: 403
      })
    }

    return action(event)
  })
