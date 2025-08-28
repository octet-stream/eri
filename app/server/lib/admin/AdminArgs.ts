import type {
  Session as DatabaseSession,
  User as DatabaseUser
} from "better-auth"
import type {ActionFunctionArgs, LoaderFunctionArgs} from "react-router"

import type {IsAny} from "../../../lib/types/IsAny.ts"
import type {Replace} from "../../../lib/types/Replace.ts"
import type {Variables} from "../../../server.ts"
import type {Session, User} from "../../db/entities.ts"

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
