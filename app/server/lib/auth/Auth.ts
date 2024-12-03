import type {Context} from "hono"

import type {Maybe} from "../../../lib/types/Maybe.js"
import type {Session, User} from "../../db/entities.js"

declare module "react-router" {
  interface AppLoadContext {
    /**
     * Auth context utilities
     */
    readonly auth: Auth<Context>
  }
}

export interface AuthContext {
  session: Session
  user: User
}

export class Auth<TContext extends Context> {
  #context: TContext

  constructor(context: TContext) {
    this.#context = context
  }

  #getAuthContext(): Maybe<AuthContext> {
    return this.#context.get("auth")
  }

  /**
   * Checks if visitor is authenticated
   */
  isAuthenticated() {
    return !!this.#getAuthContext()
  }

  /**
   * Returns auth context for current Hono request.
   *
   * Throws 401 error if visitor is not authenticated
   */
  getAuthContext(): AuthContext {
    const auth = this.#getAuthContext()

    if (!auth) {
      throw new Response(null, {
        status: 401
      })
    }

    return auth
  }
}
