import {data, type ActionFunctionArgs} from "react-router"
import type {
  User as DatabaseUser,
  Session as DatabaseSession
} from "better-auth"

import {Session} from "../../db/entities.js"
import type {Action} from "../types/Action.js"

import type {AdminArgs, AdminViewer} from "./AdminArgs.js"
import {updateCookie} from "./updateCookie.js"

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

    // FIXME: Remove type casting when this fix is releases: https://github.com/better-auth/better-auth/pull/812
    const response = (await auth.api.getSession({
      asResponse: true,
      headers: event.request.headers
    } as any)) as unknown as Response

    // Note: in the actual result all Dates are serialized into string, so make sure to de-serialize them back
    const result = (await response.json()) as {
      user: DatabaseUser
      session: DatabaseSession
    }

    if (!result?.session) {
      throw data(null, {
        status: 401
      })
    }

    const session = await orm.em
      .getReference(Session, result.session.id, {
        wrapped: true
      })
      .loadOrFail()

    const viewer: AdminViewer = {
      session,
      user: session.user,
      rawUser: result.user,
      rawSession: result.session
    }

    return updateCookie(event, response, () =>
      action({...event, context: {...event.context, viewer}})
    )
  }
