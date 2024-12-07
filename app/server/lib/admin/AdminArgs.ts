import type {LoaderFunctionArgs, ActionFunctionArgs} from "react-router"
import type {
  User as DatabaseUser,
  Session as DatabaseSession
} from "better-auth"

import type {IsAny} from "../../../lib/types/IsAny.js"
import type {Replace} from "../../../lib/types/Replace.js"
import type {User, Session} from "../../db/entities.js"
import type {Variables} from "../../../server.js"

export interface AdminViewer {
  /**
   * A **reference** to the current user.
   *
   * This will only have an `id` field if user is not loaded yet.
   */
  user: User

  /**
   * A **reference** to the current session.
   *
   * This will only have an `id` field if session is not loaded yet.
   */
  session: Session

  /**
   * Raw user returned by Better Auth.
   *
   * This object does not include relations.
   */
  rawUser: DatabaseUser

  /**
   * Raw user returned by Better Auth.
   *
   * This object does not include relations.
   */
  rawSession: DatabaseSession
}

export interface AdminViewerContext {
  viewer: AdminViewer
}

export type AdminArgs<TEvent extends LoaderFunctionArgs | ActionFunctionArgs> =
  Replace<
    TEvent,
    {
      context: Variables &
        (IsAny<TEvent["context"]> extends true
          ? AdminViewerContext
          : NonNullable<TEvent["context"]> & AdminViewerContext)
    }
  >
