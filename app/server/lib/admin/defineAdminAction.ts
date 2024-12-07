import {data, type ActionFunctionArgs} from "react-router"

import {User, Session} from "../../db/entities.js"
import type {Action} from "../types/Action.js"

import type {AdminArgs, AdminViewer} from "./AdminArgs.js"

export type AdminActionArgs<TEvent extends ActionFunctionArgs> =
  AdminArgs<TEvent>

// TODO: Replace this with middlewares, once they arrive
// ! Hope this one will not break, because I'm not fure if Remix's compiler relies on defineAction function or route exports to extract actions
export const defineAdminAction =
  <TResult, TEvent extends ActionFunctionArgs>(
    action: Action<TResult, TEvent>
  ) =>
  async (event: TEvent): Promise<TResult> => {
    const {auth, orm} =
      event.context as AdminArgs<ActionFunctionArgs>["context"]

    const response = await auth.api.getSession({
      headers: event.request.headers
    })

    if (!response?.session) {
      throw data(null, {
        status: 401
      })
    }

    const session = await orm.em
      .getReference(Session, response.session.id, {
        wrapped: true
      })
      .loadOrFail()

    const viewer: AdminViewer = {
      session,
      user: session.user,
      rawUser: response.user,
      rawSession: response.session
    }

    return action({...event, context: {...event.context, viewer}})
  }
