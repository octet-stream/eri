import {Adapter, DatabaseSession, DatabaseUser} from "lucia"

import {getOrm} from "../db/orm.js"
import {User, Session} from "../../db/entities.js"
import type {MaybeNull} from "../../../lib/types/MaybeNull.js"

/**
 * Mikro ORM adapter for [lucia](https://lucia-auth.com)
 */
export class MikroORMAdapter implements Adapter {
  /**
   * Removes expired sessions whose `expiresAt` value is greater, or equals to `Date.now()`
   */
  async deleteExpiredSessions(): Promise<void> {
    const orm = await getOrm()

    await orm.em.nativeDelete(Session, {
      expiresAt: {
        $gte: new Date()
      }
    })
  }

  /**
   * Removes a session with given `sessionId`
   *
   * @param sessionId - ID of the session to remove
   */
  async deleteSession(sessionId: string): Promise<void> {
    const orm = await getOrm()

    await orm.em.nativeDelete(Session, sessionId)
  }

  /**
   * Removes all sessions associated with given `userId`
   *
   * @param userId - ID of the user associated with sessions
   */
  async deleteUserSessions(userId: string): Promise<void> {
    const orm = await getOrm()

    await orm.em.nativeDelete(Session, {
      user: {
        id: userId
      }
    })
  }

  /**
   * Returns a session by given `sessionId` and associated user
   *
   * @param sessionId - ID of the session to get
   */
  async getSessionAndUser(sessionId: string): Promise<[
    session: MaybeNull<DatabaseSession>,
    user: MaybeNull<DatabaseUser>
  ]> {
    const orm = await getOrm()

    // TODO: Add proper error handling
    const session = await orm.em.findOne(Session, sessionId)

    return [session || null, session?.user || null]
  }

  /**
   * Returns all sessions associated with given `userId`
   *
   * @param userId - A user ID associated with sessions
   */
  async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const orm = await getOrm()

    return orm.em.find(Session, {
      user: {
        id: userId
      }
    })
  }

  /**
   * Creates a new session with given params
   *
   * @param session - Session params
   */
  async setSession(session: DatabaseSession): Promise<void> {
    const orm = await getOrm()

    const {userId, ...fields} = session

    const user = orm.em.getReference(User, userId)

    orm.em.create(Session, {...fields, user}, {persist: true})

    await orm.em.flush()
  }

  /**
   * Updates session expiration date and time
   *
   * @param sessionId - The ID of the session to update
   * @param expiresAt - The new expiration date and time
   */
  async updateSessionExpiration(
    sessionId: string,
    expiresAt: Date
  ): Promise<void> {
    const orm = await getOrm()

    await orm.em.nativeUpdate(Session, sessionId, {
      expiresAt
    })
  }
}
